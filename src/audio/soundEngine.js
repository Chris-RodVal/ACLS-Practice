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

      // Highest tier: Natural / Neural / Enhanced / Premium voices
      if (name.includes('natural') || name.includes('neural')) score += 100;
      if (name.includes('enhanced') || name.includes('premium')) score += 80;
      if (name.includes('google')) score += 70; // Google español is exceptionally fluid and clear
      if (name.includes('online')) score += 60;
      if (name.includes('siri')) score += 50;
      if (name.includes('alvaro') || name.includes('álvaro') || name.includes('elvira') || name.includes('jorge') || name.includes('monica') || name.includes('paulina')) score += 40;

      // Regional preferences (Chile, Latin America, Spain)
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
      this.ctx.resume();
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

  // Native Speech Synthesis in Spanish for patient speech & clinical proctor
  speak(text, role = 'system', gender = 'M') {
    if (this.voiceMuted || !text) return;
    if (!('speechSynthesis' in window)) return;

    try {
      if (!this.voices || this.voices.length === 0) {
        this.initVoices();
      }

      window.speechSynthesis.cancel();
      const cleanText = this.normalizeMedicalSpokenText(text);
      if (!cleanText) return;

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
        utterance.rate = 0.94;
        utterance.pitch = isFemale ? 1.06 : 0.96;
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
}

export const soundEngine = new ClinicalSoundEngine();
