import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  Hand, 
  Zap, 
  Flashlight, 
  Sparkles, 
  HelpCircle,
  Activity,
  X
} from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

/**
 * Realistic Interactive Patient Vignette & Consciousness Avatar
 * Dynamic human facial features:
 * - Age-based wrinkles (forehead, crow's feet, nasolabial folds, under-eye bags)
 * - Realistic hair (salt-and-pepper / greying for older patients, styled for gender)
 * - Anatomical details: ears, nostril shading, lips, eyelid creases, lashes
 * - Perfusion skin tint (warm living skin vs ashen cyanotic in arrest)
 * - Diaphoresis / sweat beads when in acute clinical distress
 * - Dynamic accessories: Oxygen Mask / Cannula, Endotracheal Tube
 * - Direct clinical neurological interactions (AVPU / Glasgow)
 */
export default function PatientAvatarVignette({
  currentCase,
  phase = 'initial',
  pulsePresent = true,
  consciousness = 'Consciente',
  airwayStatus = 'Espontánea',
  oxygenDevice = 'none',
  patientDialogue = '',
  onLogInteraction = () => {}
}) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPenlightActive, setIsPenlightActive] = useState(false);
  const [interactionFeedback, setInteractionFeedback] = useState(null);
  const [selectedAvpu, setSelectedAvpu] = useState(null);
  const [showAvpuHelp, setShowAvpuHelp] = useState(false);
  const feedbackTimeoutRef = useRef(null);

  const isArrest = phase === 'arrest' || !pulsePresent;
  const isPostRce = phase === 'rce' || phase === 'post_rce';
  const age = currentCase?.patient?.age || 58;
  const isFemale = currentCase?.patient?.gender === 'F' || currentCase?.patient?.gender === 'femenino';
  const isElderly = age >= 60;
  const isMiddleAged = age >= 45 && age < 60;

  // Determine current true neurological AVPU based on clinical phase
  const trueAvpu = isArrest
    ? 'U'
    : isPostRce
    ? (consciousness.toLowerCase().includes('obedece') ? 'V' : (consciousness.toLowerCase().includes('dolor') ? 'P' : 'U'))
    : (consciousness.toLowerCase().includes('estupor') || consciousness.toLowerCase().includes('somnoliento')
      ? 'V'
      : (consciousness.toLowerCase().includes('inconsciente') ? 'U' : 'A'));

  // Periodic natural blinking when conscious
  useEffect(() => {
    if (isArrest) {
      setIsBlinking(false);
      return;
    }

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 190);
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, [isArrest]);

  const triggerDoubleBlink = () => {
    if (isArrest) return;
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 180);
      }, 130);
    }, 180);
  };

  const showFeedback = (text, type = 'info') => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setInteractionFeedback({ text, type });
    feedbackTimeoutRef.current = setTimeout(() => {
      setInteractionFeedback(null);
    }, 5500);
  };

  // 1. Verbal Stimulus: "¿Me escucha?"
  const handleAskPatient = () => {
    if (isArrest) {
      showFeedback('🔇 Sin respuesta verbal. Ojos cerrados, en apnea total (SIN PULSO).', 'error');
      onLogInteraction('Líder', '🗣️ Estímulo verbal: "¡Hola! ¿Me escucha?" ➔ Sin respuesta (Inconsciente, Glasgow 3).', 'warning');
      soundEngine.speak('El paciente no responde al llamado verbal. Está inconsciente.', 'system');
      return;
    }

    if (isPostRce) {
      if (consciousness.toLowerCase().includes('obedece')) {
        showFeedback('🗣️ Paciente (débil): "...sí doctor... ¿dónde estoy?... me duele el pecho..."', 'success');
        onLogInteraction('Paciente', '🗣️ Paciente responde débilmente tras RCE: "¿dónde estoy?... me duele el pecho".', 'info');
        soundEngine.speak('Sí doctor... ¿dónde estoy?... me duele el pecho.', 'patient', currentCase?.patient?.gender);
      } else {
        showFeedback('🔇 Paciente estuporoso post-paro: Emite quejidos incomprensibles ("...mmmh...").', 'warning');
        onLogInteraction('Líder', '🗣️ Estímulo verbal post-paro ➔ Emite sonidos inespecíficos, no orienta.', 'warning');
        soundEngine.speak('Mmmh... mmm...', 'patient', currentCase?.patient?.gender);
      }
      return;
    }

    triggerDoubleBlink();
    const reply = patientDialogue || (currentCase?.type === 'taquicardia'
      ? '¡Doctor, me palpita el pecho a mil y me falta el aire!'
      : 'Doctor... me siento muy mareado y débil, todo me da vueltas...');

    showFeedback(`🗣️ Paciente: "${reply}"`, 'success');
    onLogInteraction('Líder', `🗣️ Interrogatorio: "¿Hola, me escucha?" ➔ "${reply}" (Consciente).`, 'info');
    soundEngine.speak(reply, 'patient', currentCase?.patient?.gender);
  };

  // 2. Ocular Motor: "Parpadear"
  const handleAskBlink = () => {
    if (isArrest) {
      showFeedback('🔇 Párpados inmóviles. Sin respuesta ocular en paro.', 'error');
      onLogInteraction('Líder', '👁️ Orden motora ocular: "Parpadee" ➔ Sin respuesta en paro.', 'warning');
      return;
    }

    triggerDoubleBlink();
    showFeedback('👁️ ¡El paciente parpadea dos veces en respuesta a su indicación médica!', 'success');
    onLogInteraction('Líder', '👁️ Paciente obedece orden simple y parpadea dos veces.', 'success');
    soundEngine.speak('El paciente obedece y parpadea dos veces.', 'system');
  };

  // 3. Hand Grip: "Tome mi mano"
  const handleGripHand = () => {
    if (isArrest) {
      showFeedback('🤝 Mano flácida. Tono muscular abolido (Glasgow M1 en PCR).', 'error');
      onLogInteraction('Líder', '🤝 Maniobra motora: Mano flácida, sin prensión voluntaria (M1).', 'warning');
      soundEngine.speak('Mano flácida. Sin respuesta motora.', 'system');
      return;
    }

    if (isPostRce) {
      if (consciousness.toLowerCase().includes('obedece')) {
        showFeedback('🤝 Paciente aprieta débilmente su mano con esfuerzo (Fuerza 3/5).', 'success');
        onLogInteraction('Líder', '🤝 Paciente aprieta la mano débilmente (Glasgow M6).', 'success');
        soundEngine.speak('El paciente aprieta la mano débilmente.', 'system');
      } else {
        showFeedback('🤝 Paciente comatoso post-paro: No obedece órdenes de prensión.', 'warning');
        onLogInteraction('Líder', '🤝 Respuesta motora post-paro: No obedece orden de prensión.', 'warning');
        soundEngine.speak('No obedece órdenes motoras.', 'system');
      }
      return;
    }

    showFeedback('🤝 ¡El paciente aprieta tu mano firmemente con fuerza simétrica bilateral 5/5!', 'success');
    onLogInteraction('Líder', '🤝 Fuerza prensión 5/5 bilateral (Obedece órdenes motoras, Glasgow M6).', 'success');
    soundEngine.speak('El paciente aprieta tu mano firmemente.', 'system');
  };

  // 4. Pain Stimulus
  const handlePainStimulus = () => {
    if (isArrest) {
      showFeedback('⚡ Estímulo doloroso: SIN RESPUESTA MOTORA NI FACIAL (Glasgow 3).', 'error');
      onLogInteraction('Líder', '⚡ Estímulo doloroso en trapecio ➔ Arreactivo total en PCR.', 'warning');
      soundEngine.speak('Sin respuesta al estímulo doloroso.', 'system');
      return;
    }

    if (isPostRce) {
      showFeedback('⚡ Estímulo doloroso: Mueca facial y retirada flexora inespecífica (Glasgow M4).', 'warning');
      onLogInteraction('Líder', '⚡ Estímulo doloroso post-paro ➔ Retirada inespecífica (Glasgow E2-V2-M4).', 'warning');
      soundEngine.speak('Mueca y retirada inespecífica al dolor.', 'system');
      return;
    }

    triggerDoubleBlink();
    showFeedback('⚡ Paciente: "¡Ay doctor! ¿Por qué me aprieta? ¡Me duele!"', 'success');
    onLogInteraction('Líder', '⚡ Estímulo doloroso ➔ Paciente localiza y retira de inmediato.', 'info');
    soundEngine.speak('¡Ay doctor! ¡Me duele!', 'patient', currentCase?.patient?.gender);
  };

  // 5. Penlight
  const handleTogglePenlight = () => {
    const next = !isPenlightActive;
    setIsPenlightActive(next);

    if (next) {
      if (isArrest) {
        showFeedback('🔦 Pupilas: MIDRIASIS BILATERAL ARREACTIVA (6.5 mm). Sin reflejo fotomotor.', 'error');
        onLogInteraction('Líder', '🔦 Pupilas: Midriasis bilateral arreactiva (6.5 mm) por anoxia cerebral.', 'warning');
        soundEngine.speak('Midriasis bilateral arreactiva.', 'system');
      } else {
        showFeedback('🔦 Pupilas: ISOCÓRICAS Y REACTIVAS A LA LUZ (3.5 mm ➔ 1.5 mm bilateral).', 'success');
        onLogInteraction('Líder', '🔦 Pupilas: Isocóricas y reactivas a la luz (3.5mm a 1.5mm). Tallo encefálico indemne.', 'success');
        soundEngine.speak('Pupilas isocóricas y reactivas a la luz.', 'system');
      }
    }
  };

  // Skin tones: Warm human skin vs Ashen Cyanotic in arrest
  const skinBase = isArrest ? '#7E8B9B' : '#E8B288';
  const skinShadow = isArrest ? '#5A6777' : '#C58C62';
  const skinHighlight = isArrest ? '#98A5B5' : '#F6CBB0';
  const lipColor = isArrest ? '#6D657A' : (isFemale ? '#C76A68' : '#B57065');
  const hairColor = isElderly 
    ? '#94A3B8' // Salt-and-pepper / Silver grey for elderly
    : (isMiddleAged ? '#57483B' : (isFemale ? '#3D2817' : '#2C1E18'));

  const eyeLidsClosed = isArrest || isBlinking;
  const isIntubated = airwayStatus.toLowerCase().includes('tubo') || airwayStatus.toLowerCase().includes('tet');
  const hasO2Mask = oxygenDevice === 'reservoir' || oxygenDevice === 'venturi' || oxygenDevice === 'bvm';
  const hasCannula = oxygenDevice === 'nasal_cannula';

  return (
    <div className="bg-[#080E1A] border border-cyan-900/50 rounded-xl p-2 flex flex-col gap-1.5 shadow-md relative">
      
      {/* Mini Header: Paciente, Edad y Escala AVPU con Ayuda rápida */}
      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-1.5">
        <div className="flex items-center gap-1.5 truncate">
          <span className="font-bold text-slate-100 truncate">
            {currentCase?.patient?.name}
          </span>
          <span className="text-[10px] text-slate-400 shrink-0">
            ({age}a, {isFemale ? 'Mujer' : 'Hombre'})
          </span>
        </div>

        {/* AVPU Selector con Botón de Ayuda Explicativo */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] text-slate-400 uppercase font-semibold mr-0.5">AVPU:</span>
            {['A', 'V', 'P', 'U'].map((letter) => {
              const isMatch = trueAvpu === letter;
              const isSelected = selectedAvpu === letter;
              return (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedAvpu(letter);
                    const meanings = {
                      A: 'Alerta (Glasgow 15)',
                      V: 'Responde a la Voz (Glasgow 12-14)',
                      P: 'Responde solo al Dolor (Glasgow 6-8)',
                      U: 'Inconsciente / Sin respuesta (PCR)'
                    };
                    onLogInteraction('Estudiante', `🎯 Nivel AVPU registrado: [${letter}] - ${meanings[letter]}.`, isMatch ? 'success' : 'warning');
                  }}
                  className={`w-4 h-4 rounded text-[9px] font-bold font-mono transition flex items-center justify-center border ${
                    isMatch
                      ? letter === 'U'
                        ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse'
                        : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : isSelected
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title={`${letter}: ${letter === 'A' ? 'Alerta' : letter === 'V' ? 'Voz' : letter === 'P' ? 'Dolor' : 'Inconsciente'}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowAvpuHelp(!showAvpuHelp)}
            className="text-slate-400 hover:text-cyan-300 p-0.5 transition"
            title="¿Qué es la Escala AVPU?"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modal / Popover explicativo de AVPU */}
      {showAvpuHelp && (
        <div className="absolute top-8 right-2 z-30 bg-[#0F172A] border border-cyan-500/60 rounded-xl p-2.5 shadow-2xl text-[10px] font-mono text-slate-200 max-w-xs animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-1 border-b border-slate-700 font-bold text-cyan-300">
            <span>ESCALA DE CONCIENCIA AVPU:</span>
            <button onClick={() => setShowAvpuHelp(false)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <ul className="mt-1.5 space-y-1 leading-tight text-slate-300">
            <li><strong className="text-emerald-400">A (Alert / Alerta):</strong> Despierto, orientado, ojos abiertos espontáneamente.</li>
            <li><strong className="text-cyan-400">V (Voice / Voz):</strong> Responde solo al llamado verbal fuerte ("¿Me escucha?").</li>
            <li><strong className="text-amber-400">P (Pain / Dolor):</strong> Responde solo al estímulo doloroso (trapecio / ungueal).</li>
            <li><strong className="text-rose-400">U (Unresponsive / Inconsciente):</strong> Sin respuesta a ningún estímulo (en PCR / Paro).</li>
          </ul>
        </div>
      )}

      {/* Contenido: Cara Realista SVG a la izquierda, Controles Clínicos compactos a la derecha */}
      <div className="grid grid-cols-12 gap-2 items-center">
        
        {/* Columna Izquierda: Cara Humana Realista (4 Cols) */}
        <div className="col-span-5 sm:col-span-4 flex flex-col items-center justify-center p-1 bg-[#050811] rounded-lg border border-slate-800/90 relative">
          
          {/* Badge Ocular */}
          <div className="absolute top-1 left-1 z-10">
            <span className={`text-[8px] font-mono font-bold px-1 py-0.2 rounded border flex items-center gap-0.5 ${
              isArrest
                ? 'bg-rose-950/90 border-rose-600 text-rose-300'
                : 'bg-emerald-950/90 border-emerald-600 text-emerald-300'
            }`}>
              {isArrest ? <EyeOff className="w-2 h-2" /> : <Eye className="w-2 h-2" />}
              {isArrest ? 'CERRADOS' : (isBlinking ? 'PARPADEO' : 'ABIERTOS')}
            </span>
          </div>

          {/* SVG Human Realistic Avatar con Camilla de Hospital, Cables y Entorno Clínico */}
          <svg
            viewBox="0 0 200 200"
            className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-lg select-none transition-all duration-300 rounded-md"
          >
            <defs>
              {/* Radial gradient for human head contour */}
              <radialGradient id="realisticSkin" cx="48%" cy="38%" r="65%">
                <stop offset="0%" stopColor={skinHighlight} />
                <stop offset="60%" stopColor={skinBase} />
                <stop offset="100%" stopColor={skinShadow} />
              </radialGradient>

              {/* Shading for cheekbones and nose */}
              <linearGradient id="noseShade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={skinShadow} stopOpacity="0.4" />
                <stop offset="50%" stopColor={skinHighlight} stopOpacity="0.6" />
                <stop offset="100%" stopColor={skinShadow} stopOpacity="0.4" />
              </linearGradient>

              {/* Camilla / Stretcher mattress gradient */}
              <linearGradient id="mattressGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#172A45" />
                <stop offset="50%" stopColor="#111E33" />
                <stop offset="100%" stopColor="#0B1422" />
              </linearGradient>

              {/* Pillow gradient */}
              <linearGradient id="pillowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#254269" />
                <stop offset="100%" stopColor="#1A2F4C" />
              </linearGradient>

              {/* Hospital wall vignette */}
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0D1B2A" />
                <stop offset="100%" stopColor="#060C16" />
              </linearGradient>

              {/* Penlight beam */}
              <linearGradient id="penlightRay" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* 1. FONDO: Sala de Reanimación & Pared Clínica */}
            <rect x="0" y="0" width="200" height="200" fill="url(#wallGrad)" />
            {/* Línea de junta de azulejo hospitalario */}
            <line x1="0" y1="42" x2="200" y2="42" stroke="#1E293B" strokeWidth="0.8" opacity="0.4" />

            {/* Panel de Gases Medicinales de Pared (Oxígeno Verde, Aspiración Vacío Amarilla) */}
            <g opacity="0.85">
              <rect x="8" y="8" width="48" height="22" rx="2" fill="#132035" stroke="#1E3A5F" strokeWidth="0.8" />
              {/* O2 Terminal (Verde medicinal) */}
              <circle cx="20" cy="19" r="4.5" fill="#16A34A" stroke="#0F172A" strokeWidth="1" />
              <circle cx="20" cy="19" r="1.8" fill="#DCFCE7" />
              <text x="18" y="29" fill="#4ADE80" fontSize="5" fontFamily="monospace" fontWeight="bold">O₂</text>
              {/* VAC Terminal (Amarillo aspiración) */}
              <circle cx="34" cy="19" r="4.5" fill="#EAB308" stroke="#0F172A" strokeWidth="1" />
              <circle cx="34" cy="19" r="1.8" fill="#FEF08A" />
              <text x="30" y="29" fill="#FDE047" fontSize="5" fontFamily="monospace" fontWeight="bold">VAC</text>
              {/* Toma de Corriente Grado Médico Roja */}
              <rect x="46" y="15" width="6" height="8" rx="1" fill="#DC2626" opacity="0.9" />
            </g>

            {/* 2. CAMILLA DE HOSPITAL / REANIMACIÓN (Stretcher) */}
            {/* Cabezal de la camilla con marco tubular cromado */}
            <path
              d="M 22 18 C 22 8 178 8 178 18 L 184 195 L 16 195 Z"
              fill="url(#mattressGrad)"
              stroke="#334155"
              strokeWidth="1.5"
            />
            {/* Brillo tubular del marco de la camilla */}
            <path d="M 26 20 C 35 12 165 12 174 20" stroke="#64748B" strokeWidth="1.2" fill="none" opacity="0.7" />

            {/* Barandas de Seguridad de la Camilla (Izquierda y Derecha) */}
            <g stroke="#475569" strokeWidth="1.2" opacity="0.6">
              {/* Baranda Izquierda */}
              <line x1="16" y1="45" x2="16" y2="175" strokeWidth="2" stroke="#64748B" />
              <line x1="16" y1="75" x2="26" y2="75" />
              <line x1="16" y1="110" x2="26" y2="110" />
              <line x1="16" y1="145" x2="26" y2="145" />
              {/* Baranda Derecha */}
              <line x1="184" y1="45" x2="184" y2="175" strokeWidth="2" stroke="#64748B" />
              <line x1="184" y1="75" x2="174" y2="75" />
              <line x1="184" y1="110" x2="174" y2="110" />
              <line x1="184" y1="145" x2="174" y2="145" />
            </g>

            {/* Almohada de la camilla bajo la cabeza */}
            <rect
              x="52"
              y="22"
              width="96"
              height="80"
              rx="14"
              fill="url(#pillowGrad)"
              stroke="#253D61"
              strokeWidth="1.2"
              opacity="0.95"
            />

            {/* Sábana clínica blanca desechable plegada bajo el cuello y hombros */}
            <path
              d="M 40 102 C 65 96 135 96 160 102 L 168 195 L 32 195 Z"
              fill="#CBD5E1"
              stroke="#94A3B8"
              strokeWidth="0.8"
              opacity="0.85"
            />

            {/* 3. BATA DE PACIENTE HOSPITALARIA (Surgical Blue Gown) */}
            <path
              d="M 46 126 C 72 120 128 120 154 126 L 165 198 L 35 198 Z"
              fill="#0369A1"
              opacity="0.9"
            />
            {/* Cuello en V de la bata */}
            <path
              d="M 82 126 L 100 144 L 118 126"
              stroke="#E0F2FE"
              strokeWidth="1.5"
              fill="none"
              opacity="0.8"
            />

            {/* 4. CABLES DE MONITOREO CLÍNICO & PARCHES DE DESFIBRILACIÓN */}
            {/* Cable y Electrodo Derecho (RA - Blanco) */}
            <path
              d="M 68 136 C 45 145 28 130 8 138"
              stroke="#F8FAFC"
              strokeWidth="1.4"
              fill="none"
              opacity="0.9"
            />
            <circle cx="68" cy="136" r="4.2" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1" />
            <circle cx="68" cy="136" r="1.5" fill="#0284C7" />

            {/* Cable y Electrodo Izquierdo (LA - Negro) */}
            <path
              d="M 132 136 C 155 145 172 130 192 138"
              stroke="#1E293B"
              strokeWidth="1.6"
              fill="none"
            />
            <circle cx="132" cy="136" r="4.2" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />
            <circle cx="132" cy="136" r="1.5" fill="#0F172A" />

            {/* Cable y Electrodo Inferior (LL - Rojo) */}
            <path
              d="M 100 162 C 120 178 150 170 192 175"
              stroke="#EF4444"
              strokeWidth="1.4"
              fill="none"
              opacity="0.9"
            />
            <circle cx="100" cy="162" r="4" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1" />
            <circle cx="100" cy="162" r="1.5" fill="#DC2626" />

            {/* Vía Venosa Periférica (Catéter IV con tubo de infusión transparente) */}
            <path
              d="M 38 185 C 46 168 54 162 62 152"
              stroke="#38BDF8"
              strokeWidth="1.2"
              strokeDasharray="3 1.5"
              fill="none"
              opacity="0.8"
            />

            {/* Sensor y Cable de Oximetría de Pulso SpO2 con destello LED rojo */}
            <path
              d="M 28 165 C 22 172 18 185 10 190"
              stroke="#0F172A"
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="28" cy="165" r="2.2" fill="#EF4444" className="animate-pulse" />

            {/* Parches Grandes de Desfibrilación / DEA (En Paro Cardíaco) */}
            {isArrest && (
              <g>
                {/* Parche Esternal Derecho */}
                <rect x="60" y="128" width="16" height="12" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" opacity="0.95" />
                <path d="M 68 128 C 65 118 55 110 38 112" stroke="#F59E0B" strokeWidth="2" fill="none" />
                {/* Parche Apical Izquierdo */}
                <rect x="126" y="146" width="16" height="12" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" opacity="0.95" />
                <path d="M 134 158 C 145 168 165 170 185 168" stroke="#F59E0B" strokeWidth="2" fill="none" />
              </g>
            )}

            {/* 5. CUELLO Y MÚSCULOS ESTERNOCLEIDOMASTOIDEOS */}
            <path
              d="M 78 108 L 74 135 L 126 135 L 122 108 Z"
              fill={skinShadow}
            />
            {/* Sombras musculares esternocleidomastoideas */}
            <path d="M 84 114 Q 96 128 96 135" stroke={isArrest ? '#475569' : '#B07850'} strokeWidth="1.2" fill="none" opacity="0.5" />
            <path d="M 116 114 Q 104 128 104 135" stroke={isArrest ? '#475569' : '#B07850'} strokeWidth="1.2" fill="none" opacity="0.5" />

            {/* Orejas Anatómicas (Trago y Concha) */}
            <g fill={skinShadow} stroke={isArrest ? '#475569' : '#9E653F'} strokeWidth="0.8">
              {/* Oreja Izquierda */}
              <path d="M 60 58 C 50 58 48 75 54 90 C 57 96 62 94 62 88 C 56 82 56 68 60 62 Z" />
              <path d="M 56 68 Q 53 78 58 82" fill="none" strokeWidth="0.7" />
              {/* Oreja Derecha */}
              <path d="M 140 58 C 150 58 152 75 146 90 C 143 96 138 94 138 88 C 144 82 144 68 140 62 Z" />
              <path d="M 144 68 Q 147 78 142 82" fill="none" strokeWidth="0.7" />
            </g>

            {/* Contorno Facial Humano Realista */}
            <path
              d="M 100 12 C 62 12 58 40 58 72 C 58 106 74 126 100 126 C 126 126 142 106 142 72 C 142 40 138 12 100 12 Z"
              fill="url(#realisticSkin)"
              stroke={isArrest ? '#475569' : '#A76D45'}
              strokeWidth="1.2"
            />

            {/* Cabello Humano Realista con Volumen y Rasgos de Edad */}
            {isFemale ? (
              <g fill={hairColor}>
                {/* Cabello Femenino Natural con Caída sobre Almohada */}
                <path d="M 56 78 C 52 30 68 8 100 8 C 132 8 148 30 144 78 C 150 108 148 130 142 140 C 138 110 138 38 128 26 C 114 16 86 16 72 26 C 62 38 62 110 58 140 C 52 130 50 108 56 78 Z" />
                {/* Mechones y Reflejos para Adulta Mayor */}
                {isElderly && (
                  <path d="M 75 20 Q 100 12 125 20 M 64 42 Q 70 24 85 20 M 136 42 Q 130 24 115 20" stroke="#CBD5E1" strokeWidth="1" fill="none" opacity="0.6" />
                )}
              </g>
            ) : (
              <g fill={hairColor}>
                {/* Cabello Masculino - Entradas si es adulto mayor, patillas definidas */}
                {isElderly ? (
                  /* Hombre mayor con entradas y coronilla rala */
                  <path d="M 58 64 C 57 38 64 24 78 24 C 88 24 92 32 100 32 C 108 32 112 24 122 24 C 136 24 143 38 142 64 C 138 42 132 18 100 18 C 68 18 62 42 58 64 Z" />
                ) : (
                  /* Cabello más poblado para jóvenes y mediana edad */
                  <path d="M 58 64 C 56 22 68 10 100 10 C 132 10 144 22 142 64 C 136 24 126 16 100 16 C 74 16 64 24 58 64 Z" />
                )}
                {/* Canas / Hebras Plateadas Naturales */}
                {(isElderly || isMiddleAged) && (
                  <g stroke="#E2E8F0" strokeWidth="0.8" opacity="0.5" fill="none">
                    <path d="M 60 60 Q 62 42 70 34" />
                    <path d="M 140 60 Q 138 42 130 34" />
                    <path d="M 72 28 Q 100 20 128 28" />
                  </g>
                )}
              </g>
            )}

            {/* Sombra de barba incipiente para hombres */}
            {!isFemale && !isArrest && (
              <path
                d="M 72 88 C 72 115 84 124 100 124 C 116 124 128 115 128 88 C 124 102 116 112 100 112 C 84 112 76 102 72 88 Z"
                fill="#3A2822"
                opacity="0.12"
              />
            )}

            {/* ARRUGAS ANATÓMICAS POR EDAD & LÍNEAS DE EXPRESIÓN */}
            <g stroke={isArrest ? '#475569' : '#8A5A38'} strokeWidth="0.8" fill="none" opacity={isElderly ? 0.75 : (isMiddleAged ? 0.45 : 0.2)}>
              {/* Líneas frontales de preocupación (3 curvas paralelas) */}
              <path d="M 76 30 Q 100 26 124 30" />
              <path d="M 74 36 Q 100 32 126 36" />
              {isElderly && <path d="M 78 42 Q 100 38 122 42" />}

              {/* Ceño fruncido glabelar (entre las cejas) */}
              <path d="M 97 48 L 97 54" strokeWidth="1" />
              <path d="M 103 48 L 103 54" strokeWidth="1" />

              {/* Patas de gallo en comisuras oculares */}
              {isElderly && (
                <>
                  <path d="M 68 60 L 62 58" />
                  <path d="M 67 63 L 60 63" />
                  <path d="M 68 66 L 62 68" />
                  <path d="M 132 60 L 138 58" />
                  <path d="M 133 63 L 140 63" />
                  <path d="M 132 66 L 138 68" />
                </>
              )}

              {/* Ojeras y surcos infraorbitarios */}
              <path d="M 74 69 Q 83 74 92 70" />
              <path d="M 108 70 Q 117 74 126 69" />

              {/* Surcos nasogenianos (de la nariz a comisuras de labios) */}
              <path d="M 89 82 Q 84 94 87 106" strokeWidth="1" />
              <path d="M 111 82 Q 116 94 113 106" strokeWidth="1" />

              {/* Líneas de marioneta y pliegue mentoniano */}
              {isElderly && (
                <>
                  <path d="M 88 108 Q 87 116 90 120" />
                  <path d="M 112 108 Q 113 116 110 120" />
                  <path d="M 94 121 Q 100 123 106 121" />
                </>
              )}
            </g>

            {/* Cejas Humanas con Pelo Feathered */}
            <g stroke={hairColor} strokeWidth="2.2" strokeLinecap="round">
              {isArrest ? (
                /* Relajadas en paro cardiorrespiratorio */
                <>
                  <path d="M 72 51 Q 83 52 92 53" fill="none" opacity="0.7" />
                  <path d="M 108 53 Q 117 52 128 51" fill="none" opacity="0.7" />
                </>
              ) : (
                /* Anguladas por dolor torácico agudo */
                <>
                  <path d="M 72 54 Q 82 47 92 50" fill="none" />
                  <path d="M 108 50 Q 118 47 128 54" fill="none" />
                </>
              )}
            </g>

            {/* OJOS DINÁMICOS & REFLEJO PUPILAR */}
            {eyeLidsClosed ? (
              /* Párpados cerrados hundidos con pestañas (Paro o Parpadeo) */
              <g stroke="#4A342B" strokeWidth="1.8" strokeLinecap="round" fill="none">
                <path d="M 73 63 Q 83 68 93 63" />
                <path d="M 107 63 Q 117 68 127 63" />
                {/* Pestañas sutiles */}
                <path d="M 77 65 L 76 67 M 83 66 L 83 68 M 89 65 L 90 67" strokeWidth="0.8" />
                <path d="M 111 65 L 110 67 M 117 66 L 117 68 M 123 65 L 124 67" strokeWidth="0.8" />
              </g>
            ) : (
              /* Ojos abiertos de alta fidelidad (Esclera + Iris con anillo + Pupila + Brillo corneal) */
              <g>
                {/* Pliegue palpebral superior */}
                <path d="M 72 58 Q 83 55 93 58" stroke="#6B442A" strokeWidth="0.8" fill="none" />
                <path d="M 107 58 Q 117 55 128 58" stroke="#6B442A" strokeWidth="0.8" fill="none" />

                {/* Esclera blanca anatómica */}
                <ellipse cx="83" cy="63" rx="9.5" ry="5.8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.5" />
                <ellipse cx="117" cy="63" rx="9.5" ry="5.8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.5" />

                {/* Lagrimal (Carúncula) */}
                <circle cx="73.5" cy="63.5" r="1.1" fill="#FDA4AF" />
                <circle cx="126.5" cy="63.5" r="1.1" fill="#FDA4AF" />

                {/* Iris (Avellana con anillo limbal) */}
                <circle cx="83" cy="63" r="4.3" fill="#3D291A" stroke="#1C120C" strokeWidth="0.8" />
                <circle cx="117" cy="63" r="4.3" fill="#3D291A" stroke="#1C120C" strokeWidth="0.8" />

                {/* Pupila Dinámica (Se contrae con linterna médica: 3.5mm -> 1.5mm) */}
                <circle
                  cx="83"
                  cy="63"
                  r={isPenlightActive ? 1.3 : 2.5}
                  fill="#020617"
                  className="transition-all duration-200"
                />
                <circle
                  cx="117"
                  cy="63"
                  r={isPenlightActive ? 1.3 : 2.5}
                  fill="#020617"
                  className="transition-all duration-200"
                />

                {/* Reflejo corneal especular brillante */}
                <circle cx="84.5" cy="61.5" r="1" fill="#FFFFFF" />
                <circle cx="118.5" cy="61.5" r="1" fill="#FFFFFF" />

                {/* Pestañas superiores */}
                <path d="M 73 62 Q 83 57 93 62" stroke="#2C1A14" strokeWidth="1.2" fill="none" />
                <path d="M 107 62 Q 117 57 127 62" stroke="#2C1A14" strokeWidth="1.2" fill="none" />
              </g>
            )}

            {/* Haz de Luz de Linterna Médica Pupilar */}
            {isPenlightActive && (
              <polygon
                points="80 0, 120 0, 136 80, 64 80"
                fill="url(#penlightRay)"
                pointerEvents="none"
              />
            )}

            {/* Nariz Humana 3D con Narinas */}
            <path
              d="M 100 60 L 98 82 C 96 84 93 85 93 87 C 93 89 107 89 107 87 C 107 85 104 84 102 82 Z"
              fill="url(#noseShade)"
            />
            {/* Narinas anatómicas sombreadas */}
            <ellipse cx="96.5" cy="86" rx="2" ry="1.2" fill="#3A2218" opacity="0.6" />
            <ellipse cx="103.5" cy="86" rx="2" ry="1.2" fill="#3A2218" opacity="0.6" />

            {/* Filtro Nasolabial (Philtrum) */}
            <path d="M 98.5 88 L 98.5 95 M 101.5 88 L 101.5 95" stroke={skinShadow} strokeWidth="0.6" fill="none" opacity="0.5" />

            {/* Labios y Vía Aérea */}
            {isIntubated ? (
              /* Tubo Endotraqueal #8.0 con bloque de mordida y fijación */
              <g>
                <ellipse cx="100" cy="103" rx="8" ry="4.5" fill="#2E1B15" />
                <rect x="96" y="95" width="8" height="26" rx="2" fill="#F1F5F9" stroke="#0284C7" strokeWidth="1" />
                <rect x="88" y="101" width="24" height="4" fill="#FEF08A" opacity="0.9" rx="1" />
              </g>
            ) : (
              /* Labios naturales con arco de Cupido y cianosis si aplica */
              <g>
                {/* Labio superior */}
                <path
                  d="M 92 100 C 96 98 98 99 100 100 C 102 99 104 98 108 100 C 105 102 95 102 92 100 Z"
                  fill={lipColor}
                />
                {/* Hendidura labial */}
                <path
                  d={isArrest ? "M 92 100 Q 100 104 108 100" : "M 92 100 Q 100 98 108 100"}
                  stroke="#381E15"
                  strokeWidth="1.2"
                  fill="none"
                />
                {/* Labio inferior */}
                <path
                  d="M 93 101 Q 100 106 107 101 Z"
                  fill={lipColor}
                  opacity="0.9"
                />
              </g>
            )}

            {/* Sudoración Frontal (Diaforesis por SCA o Shock) */}
            {!isArrest && (currentCase?.type === 'taquicardia' || age >= 50) && (
              <g fill="#BAE6FD" opacity="0.75">
                <circle cx="88" cy="38" r="1.1" />
                <circle cx="93" cy="32" r="0.9" />
                <circle cx="108" cy="34" r="1.1" />
                <circle cx="114" cy="40" r="0.9" />
                <circle cx="80" cy="46" r="0.8" />
                <circle cx="121" cy="45" r="0.8" />
              </g>
            )}

            {/* Dispositivos de Oxigenoterapia */}
            {hasO2Mask && (
              <g>
                <polygon
                  points="85 72, 115 72, 118 114, 82 114"
                  fill="#38BDF8"
                  opacity="0.32"
                  stroke="#0284C7"
                  strokeWidth="1"
                  rx="4"
                />
                <path d="M 60 84 L 85 90 M 115 90 L 140 84" stroke="#10B981" strokeWidth="1.2" />
              </g>
            )}

            {hasCannula && (
              <g stroke="#38BDF8" strokeWidth="1.4" fill="none">
                <path d="M 60 85 L 95 85" />
                <path d="M 105 85 L 140 85" />
                <circle cx="96.5" cy="84" r="1.3" fill="#38BDF8" />
                <circle cx="103.5" cy="84" r="1.3" fill="#38BDF8" />
              </g>
            )}
          </svg>

          <span className="text-[9px] font-mono text-cyan-400 font-semibold truncate max-w-[100px] mt-0.5">
            {isArrest ? 'Paro Cardíaco' : consciousness}
          </span>
        </div>

        {/* Columna Derecha: Interacciones Neurológicas Compactas (7-8 Cols) */}
        <div className="col-span-7 sm:col-span-8 flex flex-col justify-between gap-1">
          
          {/* Fila de 4 Botones Táctiles en 2x2 ultra-compacto */}
          <div className="grid grid-cols-2 gap-1 font-mono text-[11px]">
            
            {/* 1. Verbal */}
            <button
              onClick={handleAskPatient}
              className="p-1 rounded-md bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition text-left"
              title="Preguntar: '¿Me escucha?'"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold text-[10px]">1. ¿Me escucha?</div>
                <div className="text-[8px] text-slate-400">Voz (AVPU: V)</div>
              </div>
            </button>

            {/* 2. Ocular */}
            <button
              onClick={handleAskBlink}
              className="p-1 rounded-md bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition text-left"
              title="Solicitar parpadeo"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold text-[10px]">2. Parpadear</div>
                <div className="text-[8px] text-slate-400">Orden ocular</div>
              </div>
            </button>

            {/* 3. Prensión */}
            <button
              onClick={handleGripHand}
              className="p-1 rounded-md bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition text-left"
              title="Tome mi mano (Glasgow M6)"
            >
              <Hand className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold text-[10px]">3. Tome mi mano</div>
                <div className="text-[8px] text-slate-400">Prensión (M6)</div>
              </div>
            </button>

            {/* 4. Dolor */}
            <button
              onClick={handlePainStimulus}
              className="p-1 rounded-md bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition text-left"
              title="Estímulo doloroso (AVPU: P)"
            >
              <Zap className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold text-[10px]">4. Dolor (Trapecio)</div>
                <div className="text-[8px] text-slate-400">Dolor (AVPU: P)</div>
              </div>
            </button>

          </div>

          {/* Linterna Pupilar Médica Compacta */}
          <button
            onClick={handleTogglePenlight}
            className={`w-full py-1 px-2 rounded-md border font-mono text-[10px] flex items-center justify-between transition active:scale-95 ${
              isPenlightActive
                ? 'bg-yellow-950/90 border-yellow-500 text-yellow-200'
                : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
            }`}
            title="Linterna pupilar para reflejo fotomotor"
          >
            <span className="flex items-center gap-1.5">
              <Flashlight className={`w-3 h-3 ${isPenlightActive ? 'text-yellow-400 animate-pulse' : 'text-slate-400'}`} />
              <span className="font-semibold">Linterna Pupilar (Reflejo Fotomotor)</span>
            </span>
            <span className="text-[9px] text-slate-400">
              {isPenlightActive ? 'Encendida' : 'Apagada'}
            </span>
          </button>

          {/* Feedback interactivo */}
          {interactionFeedback && (
            <div className={`p-1.5 rounded-md border text-[10px] font-mono leading-tight animate-in fade-in duration-150 ${
              interactionFeedback.type === 'error'
                ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                : interactionFeedback.type === 'warning'
                ? 'bg-amber-950/80 border-amber-600 text-amber-200'
                : 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
            }`}>
              {interactionFeedback.text}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
