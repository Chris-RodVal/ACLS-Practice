// Clinical Monitor & Defibrillator Web Audio API Sound Engine + High-Fidelity Natural Voice System
// Realistic synthesized audio for clinical simulation + Natural Human Spanish voice announcements

class ClinicalSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.voiceMuted = false;
    this.chargeOsc = null;
    this.chargeGain = null;
    this.readyInterval = null;
    this.metronomeInterval = null;
    this.voices = [];
    this.activeUtterance = null;
    this.selectedSystemVoice = null;
    this.selectedMaleVoice = null;
    this.selectedFemaleVoice = null;

    // ElevenLabs Hyperrealistic Cloud Voice Settings
    const DEFAULT_KEY = 'sk_8e98981a58c62ea16e33b6a54aa126503a0b62a6d431c679';
    this.elevenLabsKey = DEFAULT_KEY;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('acls_elevenlabs_key', DEFAULT_KEY);
    }
    this.elevenLabsVoiceIds = {
      male: 'ErXwobaYiN019PkySvjV',   // Antoni - Natural, warm, realistic Spanish/multilingual male
      female: 'EXAVITQu4vr4xnSDxMaL', // Sarah - Expressive, human Spanish/multilingual female
      system: 'JBFqnCBsd6RMkjVDRZzb'  // George - Warm, authoritative proctor
    };
    this.audioCache = new Map();
    this.currentAudio = null;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices() || [];
    this.categorizeVoices();
  }

  categorizeVoices() {
    if (!this.voices || this.voices.length === 0) return;

    // Filter Spanish voices
    const esVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('es'));
    const allVoices = esVoices.length > 0 ? esVoices : this.voices;

    // Scoring to prioritize ultra-realistic neural / natural / enhanced voices
    const scoreVoice = (v) => {
      let score = 0;
      const name = (v.name || '').toLowerCase();
      const lang = (v.lang || '').toLowerCase();

      // Penalize low-quality / robotic compact voices
      if (name.includes('compact') || name.includes('sintetizador') || name.includes('espeak')) score -= 150;

      // Highest tier: Natural / Neural / Enhanced / Premium voices
      if (name.includes('natural') || name.includes('neural')) score += 120;
      if (name.includes('google')) score += 110; // Google español in Chrome is fluid and human
      if (name.includes('enhanced') || name.includes('premium')) score += 90;
      if (name.includes('online')) score += 80;
      if (name.includes('siri')) score += 70;
      if (name.includes('alvaro') || name.includes('álvaro') || name.includes('elvira') || name.includes('jorge') || name.includes('paulina')) score += 40;

      // Regional preferences (Latin America, Chile, Mexico, Spain)
      if (lang.includes('cl') || lang.includes('419') || lang.includes('mx') || lang.includes('es')) score += 20;
      return score;
    };

    const sorted = [...allVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a));

    // Best system/proctor voice (calm, authoritative, clear)
    this.selectedSystemVoice = sorted[0];

    // Male voice candidates
    const maleNames = ['jorge', 'juan', 'diego', 'alvaro', 'álvaro', 'carlos', 'miguel', 'david', 'male', 'hombre', 'enrique', 'pablo', 'manuel'];
    const femaleNames = ['monica', 'mónica', 'paulina', 'francisca', 'soledad', 'elvira', 'dalia', 'helena', 'rosa', 'lucia', 'lucía', 'maría', 'maria', 'sofia', 'sofía', 'female', 'mujer', 'carmen', 'laura'];

    this.selectedMaleVoice = sorted.find(v => maleNames.some(m => (v.name || '').toLowerCase().includes(m))) 
      || sorted.find(v => !femaleNames.some(f => (v.name || '').toLowerCase().includes(f))) 
      || sorted[0];

    this.selectedFemaleVoice = sorted.find(v => femaleNames.some(f => (v.name || '').toLowerCase().includes(f))) 
      || sorted[0];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopCharge();
      this.stopReadyTone();
      this.stopMetronome();
    }
    return this.muted;
  }

  toggleVoice() {
    this.voiceMuted = !this.voiceMuted;
    if (this.voiceMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.voiceMuted;
  }

  // Pre-process and normalize clinical abbreviations into natural spoken Spanish words
  normalizeMedicalSpokenText(text) {
    if (!text) return '';
    return text
      .replace(/\bSF\s*0\.?9%?\b/gi, 'suero fisiológico')
      .replace(/\bSF\b/g, 'suero fisiológico')
      .replace(/\bTET\b/g, 'tubo endotraqueal')
      .replace(/\bIV\b/g, 'intravenoso')
      .replace(/\bIO\b/g, 'intraóseo')
      .replace(/\blpm\b/gi, 'latidos por minuto')
      .replace(/\bcpm\b/gi, 'compresiones por minuto')
      .replace(/\bmg\b/gi, 'miligramos')
      .replace(/\bmcg\b/gi, 'microgramos')
      .replace(/\bml\b/gi, 'mililitros')
      .replace(/\bPA\b/g, 'presión arterial')
      .replace(/\bFC\b/g, 'frecuencia cardíaca')
      .replace(/\bFR\b/g, 'frecuencia respiratoria')
      .replace(/\bPAM\b/g, 'presión arterial media')
      .replace(/\bSpO2\b/gi, 'saturación de oxígeno')
      .replace(/\bEtCO2\b/gi, 'capnografía')
      .replace(/\bGSA\b/g, 'gases arteriales')
      .replace(/\bPCR\b/g, 'paro cardiorrespiratorio')
      .replace(/\bRCE\b/g, 'retorno de circulación espontánea')
      .replace(/\bECG\b/g, 'electrocardiograma')
      .replace(/\bTTM\b/g, 'manejo específico de temperatura')
      .replace(/\bMET\b/g, 'manejo específico de temperatura')
      .replace(/\bFV\b/g, 'fibrilación ventricular')
      .replace(/\bTVSP\b/g, 'taquicardia ventricular sin pulso')
      .replace(/\bAESP\b/g, 'actividad eléctrica sin pulso')
      .replace(/\bTSVP\b/g, 'taquicardia supraventricular paroxística')
      .replace(/\bFA\b/g, 'fibrilación auricular')
      .replace(/[✅⏱️🎯⚠️❌💧💉🩺❄️🎉🗣️▶️⏹️⏩👁️🤝⚡🔦]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  setElevenLabsKey(key) {
    this.elevenLabsKey = (key || '').trim();
    if (typeof localStorage !== 'undefined') {
      if (this.elevenLabsKey) {
        localStorage.setItem('acls_elevenlabs_key', this.elevenLabsKey);
      } else {
        localStorage.removeItem('acls_elevenlabs_key');
      }
    }
  }

  getElevenLabsKey() {
    return this.elevenLabsKey;
  }

  // Play audio stream from ElevenLabs or audio blob
  playAudioStream(audioUrl) {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
    }
    const audio = new Audio(audioUrl);
    this.currentAudio = audio;
    audio.play().catch(e => {
      console.warn('Audio play prevented or interrupted:', e);
    });
  }

  // Synthesis via ElevenLabs API (returns true if handled, false to fallback)
  async speakViaElevenLabs(cleanText, role = 'system', gender = 'M') {
    if (!this.elevenLabsKey || !cleanText) return false;

    // ElevenLabs requires keys beginning with 'sk_'
    if (!this.elevenLabsKey.startsWith('sk_')) {
      console.warn('ElevenLabs API Key no válida: las claves de ElevenLabs deben comenzar con "sk_". La clave actual parece ser un Key ID.');
      return false;
    }

    const isFemale = gender === 'F' || gender === 'femenino' || gender === 'Mujer';
    const voiceId = role === 'system'
      ? this.elevenLabsVoiceIds.system
      : (isFemale ? this.elevenLabsVoiceIds.female : this.elevenLabsVoiceIds.male);

    const cacheKey = `${voiceId}_${cleanText}`;
    if (this.audioCache.has(cacheKey)) {
      this.playAudioStream(this.audioCache.get(cacheKey));
      return true;
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.elevenLabsKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: role === 'patient' ? 0.4 : 0.65,
            similarity_boost: 0.82,
            style: role === 'patient' ? 0.35 : 0.1,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        console.warn('ElevenLabs API response status:', response.status);
        return false;
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      this.audioCache.set(cacheKey, audioUrl);
      this.playAudioStream(audioUrl);
      return true;
    } catch (err) {
      console.warn('ElevenLabs API network error, falling back to neural browser voice:', err);
      return false;
    }
  }

  // High-Fidelity Speech Synthesis in Spanish for patient speech & clinical proctor
  async speak(text, role = 'system', gender = 'M') {
    if (this.voiceMuted || !text) return;

    const cleanText = this.normalizeMedicalSpokenText(text);
    if (!cleanText) return;

    // 1. Try ElevenLabs Hyperrealistic Cloud Voice if API key configured (must start with sk_)
    if (this.elevenLabsKey && this.elevenLabsKey.startsWith('sk_')) {
      const success = await this.speakViaElevenLabs(cleanText, role, gender);
      if (success) return;
    }

    // 2. High-Quality Local Neural / Web Speech API (Zero-setup, 100% free fallback)
    if (!('speechSynthesis' in window)) return;

    try {
      // Re-query voices to avoid Chrome empty array on cold start
      const freshVoices = window.speechSynthesis.getVoices();
      if (freshVoices && freshVoices.length > 0) {
        this.voices = freshVoices;
        this.categorizeVoices();
      } else if (!this.voices || this.voices.length === 0) {
        this.initVoices();
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';

      if (role === 'patient') {
        const isFemale = gender === 'F' || gender === 'femenino' || gender === 'Mujer';
        const chosenVoice = isFemale ? this.selectedFemaleVoice : this.selectedMaleVoice;
        if (chosenVoice) {
          utterance.voice = chosenVoice;
          if (chosenVoice.lang) utterance.lang = chosenVoice.lang;
        }
        // Human expressive cadence for patient in clinical distress
        utterance.rate = 0.93;
        utterance.pitch = isFemale ? 1.08 : 0.94;
      } else {
        // System proctor / clinical monitor: professional, calm, authoritative
        if (this.selectedSystemVoice) {
          utterance.voice = this.selectedSystemVoice;
          if (this.selectedSystemVoice.lang) utterance.lang = this.selectedSystemVoice.lang;
        }
        utterance.rate = 0.98;
        utterance.pitch = 1.0;
      }

      // Prevent garbage collection in Chrome mid-speech
      this.activeUtterance = utterance;
      utterance.onend = () => { this.activeUtterance = null; };
      utterance.onerror = () => { this.activeUtterance = null; };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  // Realistic QRS Beep: pitch drops as SpO2 decreases (600Hz down to 250Hz)
  playQRSBeep(spo2 = 98) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const clampedSpo2 = Math.max(50, Math.min(100, spo2));
      const freq = 250 + ((clampedSpo2 - 50) / 50) * 550;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch (e) {}
  }

  // Defibrillator Capacitor Charging Whine (Potente sonido ascendente realista de carga)
  startCharge(durationSec = 2.5) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    this.stopCharge();
    this.stopReadyTone();

    try {
      const now = this.ctx.currentTime;
      this.chargeOsc = this.ctx.createOscillator();
      this.chargeGain = this.ctx.createGain();

      this.chargeOsc.type = 'sawtooth';
      this.chargeOsc.frequency.setValueAtTime(220, now);
      this.chargeOsc.frequency.exponentialRampToValueAtTime(1150, now + durationSec);

      this.chargeGain.gain.setValueAtTime(0.12, now);
      this.chargeGain.gain.linearRampToValueAtTime(0.32, now + durationSec);

      this.chargeOsc.connect(this.chargeGain);
      this.chargeGain.connect(this.ctx.destination);

      this.chargeOsc.start(now);
      this.chargeOsc.stop(now + durationSec);
    } catch (e) {}
  }

  // Tono de Alerta Defibrilador Armado / Listo ("BEEP-BEEP-BEEP" a 1050 Hz continuo mientras está cargado)
  startReadyTone() {
    this.stopReadyTone();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const beep = () => {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1050, now);

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.085);
      } catch (e) {}
    };

    beep();
    this.readyInterval = setInterval(beep, 180);
  }

  stopReadyTone() {
    if (this.readyInterval) {
      clearInterval(this.readyInterval);
      this.readyInterval = null;
    }
  }

  stopCharge() {
    this.stopReadyTone();
    if (this.chargeOsc) {
      try {
        this.chargeOsc.stop();
        this.chargeOsc.disconnect();
      } catch (e) {}
      this.chargeOsc = null;
    }
    if (this.chargeGain) {
      try {
        this.chargeGain.disconnect();
      } catch (e) {}
      this.chargeGain = null;
    }
  }

  // Defibrillator Discharge Shock Thump ("¡PUM! ⚡" - Impacto visceral de descarga eléctrica de alto voltaje)
  playShock() {
    this.stopCharge();
    this.stopReadyTone();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Visceral Sub-bass Impact / Shock Thump ("PUM")
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(26, now + 0.42);

      gain.gain.setValueAtTime(1.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.50);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);

      // 2. High-Voltage Electric Arc Transient ("KZZT")
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.16);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.025));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1600, now);
      noiseFilter.Q.setValueAtTime(1.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.85, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.18);

      // 3. Mechanical Capacitor Relay Clack (t=0)
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(800, now);
      clickOsc.frequency.exponentialRampToValueAtTime(100, now + 0.04);
      clickGain.gain.setValueAtTime(0.75, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.045);

      // Spoken confirmation
      this.speak('Descarga administrada. Reanudar compresiones inmediatamente.', 'system');
    } catch (e) {
      console.warn('Audio playShock error:', e);
    }
  }

  // Metronome for CPR at 110 cpm (AHA standard 100-120 cpm)
  startMetronome() {
    if (this.metronomeInterval) return;
    const intervalMs = (60 / 110) * 1000; // ~545ms
    this.metronomeInterval = setInterval(() => {
      this.playMetronomeClick();
    }, intervalMs);
  }

  stopMetronome() {
    if (this.metronomeInterval) {
      clearInterval(this.metronomeInterval);
      this.metronomeInterval = null;
    }
  }

  playMetronomeClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  playPacerClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {}
  }

  playNibpStart() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(75, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.3);
      gain.gain.linearRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.25);
    } catch (e) {}
  }

  playAlarm(critical = false) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const tones = critical ? [950, 950, 950] : [600, 600];
      const spacing = 0.14;

      tones.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * spacing;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.14, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.11);
      });
    } catch (e) {}
  }

  // Glucometer Measurement Sound (Doble tono agudo característico de lectura de tira reactiva HGT)
  playGlucometerBeep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Primer tono: 1600 Hz por 70ms
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1600, now);
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.18, now + 0.01);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.075);

      // Segundo tono confirmatorio más agudo: 2100 Hz a los 110ms
      const t2 = now + 0.11;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(2100, t2);
      gain2.gain.setValueAtTime(0.001, t2);
      gain2.gain.linearRampToValueAtTime(0.22, t2 + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.14);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.15);
    } catch (e) {}
  }

  // Cardioversion Sync Marker Beep (Tono agudo sincronizado con la onda R)
  playSyncBeep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1550, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // Tactile Equipment Button Click
  playButtonClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {}
  }
}

export const soundEngine = new ClinicalSoundEngine();
