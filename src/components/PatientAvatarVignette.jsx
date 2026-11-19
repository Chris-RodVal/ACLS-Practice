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
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

/**
 * High-Fidelity Interactive Patient Vignette & Consciousness Avatar
 * Real-time dynamic visual face:
 * - Eyes: Open, Spontaneous Blinking, Drowsy, or Closed (Arrest / Coma)
 * - Skin perfusion tint: Warm pink, Pale shock, or Ashen cyanotic in arrest
 * - Dynamic accessories: Oxygen Mask / Cannula, Endotracheal Tube
 * - Direct clinical neurological interactions:
 *   1. "¡Hola! ¿Me escucha?" (Verbal response)
 *   2. "¡Parpadee si me escucha!" (Ocular motor command)
 *   3. "Tome mi mano / Apriete" (Hand grip / Glasgow M6)
 *   4. "Estímulo táctil/doloroso" (Pain response / Glasgow M4-M5)
 *   5. "Linterna pupilar" (Pupillary light reflex)
 * - AVPU scale determination
 */
export default function PatientAvatarVignette({
  currentCase,
  phase = 'initial', // 'initial' | 'arrest' | 'rce' | 'post_rce' | 'dead'
  pulsePresent = true,
  consciousness = 'Consciente',
  airwayStatus = 'Espontánea',
  oxygenDevice = 'none',
  patientDialogue = '',
  onLogInteraction = () => {}
}) {
  const [blinkTrigger, setBlinkTrigger] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPenlightActive, setIsPenlightActive] = useState(false);
  const [interactionFeedback, setInteractionFeedback] = useState(null);
  const [selectedAvpu, setSelectedAvpu] = useState(null);
  const feedbackTimeoutRef = useRef(null);

  const isArrest = phase === 'arrest' || !pulsePresent;
  const isPostRce = phase === 'rce' || phase === 'post_rce';
  const isFemale = currentCase?.patient?.gender === 'F' || currentCase?.patient?.gender === 'femenino';

  // Determine current true neurological AVPU based on clinical phase
  const trueAvpu = isArrest
    ? 'U'
    : isPostRce
    ? (consciousness.toLowerCase().includes('obedece') ? 'V' : (consciousness.toLowerCase().includes('dolor') ? 'P' : 'U'))
    : (consciousness.toLowerCase().includes('estupor') || consciousness.toLowerCase().includes('somnoliento')
      ? 'V'
      : (consciousness.toLowerCase().includes('inconsciente') ? 'U' : 'A'));

  // Periodic natural blinking when conscious and eyes open
  useEffect(() => {
    if (isArrest) {
      setIsBlinking(false);
      return;
    }

    const blinkInterval = setInterval(() => {
      // Natural blink lasts ~180ms
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 190);
    }, 4500 + Math.random() * 2500);

    return () => clearInterval(blinkInterval);
  }, [isArrest]);

  // Handle triggered blinks (e.g., student orders "parpadee")
  const triggerDoubleBlink = () => {
    if (isArrest) return;
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 190);
      }, 140);
    }, 190);
  };

  const showFeedback = (text, type = 'info') => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    setInteractionFeedback({ text, type });
    feedbackTimeoutRef.current = setTimeout(() => {
      setInteractionFeedback(null);
    }, 6000);
  };

  // 1. Verbal Interaction: "¡Hola! ¿Me escucha? ¿Cómo se siente?"
  const handleAskPatient = () => {
    if (isArrest) {
      showFeedback('🔇 El paciente no responde. Ojos cerrados, sin habla, en apnea completa (SIN PULSO).', 'error');
      onLogInteraction('Líder', '🗣️ Estímulo verbal: "¡Hola! ¿Me escucha?" ➔ Paciente NO responde (Inconsciente, Glasgow 3).', 'warning');
      soundEngine.speak('El paciente no responde al llamado verbal. Está inconsciente.', 'system');
      return;
    }

    if (isPostRce) {
      if (consciousness.toLowerCase().includes('obedece')) {
        showFeedback('🗣️ Paciente (débil): "...sí... doctor... ¿dónde estoy?... me duele el pecho..."', 'success');
        onLogInteraction('Paciente', '🗣️ Paciente responde débilmente con habla entrecortada pero orientada tras RCE.', 'info');
        soundEngine.speak('Sí doctor... ¿dónde estoy?... me duele el pecho.', 'patient', currentCase?.patient?.gender);
      } else {
        showFeedback('🔇 Paciente comatoso post-paro: Emite quejidos incomprensibles ("...mmmh..."), no pronuncia palabras claras.', 'warning');
        onLogInteraction('Líder', '🗣️ Estímulo verbal post-paro ➔ Paciente estuporoso/comatoso, emite sonidos incomprensibles.', 'warning');
        soundEngine.speak('Mmmh... mmm...', 'patient', currentCase?.patient?.gender);
      }
      return;
    }

    // Phase 1 (Arhythmia)
    triggerDoubleBlink();
    const reply = patientDialogue || (currentCase?.type === 'taquicardia'
      ? '¡Doctor, me palpita el pecho a mil y me falta el aire!'
      : 'Doctor... me siento muy mareado y débil, todo me da vueltas...');

    showFeedback(`🗣️ Paciente: "${reply}"`, 'success');
    onLogInteraction('Líder', `🗣️ Interrogatorio: "Hola, ¿me escucha?" ➔ Paciente responde: "${reply}" (Consciente, orientado).`, 'info');
    soundEngine.speak(reply, 'patient', currentCase?.patient?.gender);
  };

  // 2. Ocular Command: "¡Parpadee si me escucha!"
  const handleAskBlink = () => {
    if (isArrest) {
      showFeedback('🔇 Sin respuesta ocular. Párpados cerrados inmóviles.', 'error');
      onLogInteraction('Líder', '👁️ Orden motora ocular: "Parpadee si me escucha" ➔ Sin respuesta en paro.', 'warning');
      return;
    }

    triggerDoubleBlink();
    showFeedback('👁️ ¡El paciente parpadea dos veces de forma consciente respondiendo a su indicación!', 'success');
    onLogInteraction('Líder', '👁️ Orden motora: Paciente obedece y parpadea dos veces (Apertura ocular voluntaria confirmada).', 'success');
    soundEngine.speak('El paciente obedece y parpadea dos veces.', 'system');
  };

  // 3. Motor Grip Command: "Tome mi mano / Apriete fuerte"
  const handleGripHand = () => {
    if (isArrest) {
      showFeedback('🤝 Mano completamente flácida. Tono muscular abolido, sin respuesta motora voluntaria (Glasgow M1).', 'error');
      onLogInteraction('Líder', '🤝 Maniobra motora: Toma de mano ➔ Mano flácida, sin prensión (M1 en PCR).', 'warning');
      soundEngine.speak('Mano flácida. Sin respuesta motora.', 'system');
      return;
    }

    if (isPostRce) {
      if (consciousness.toLowerCase().includes('obedece')) {
        showFeedback('🤝 Paciente aprieta débilmente su mano con esfuerzo (Fuerza 3/5 bilateral).', 'success');
        onLogInteraction('Líder', '🤝 Respuesta motora: Paciente obedece orden simple y aprieta la mano débilmente (Glasgow M6).', 'success');
        soundEngine.speak('El paciente aprieta la mano débilmente.', 'system');
      } else {
        showFeedback('🤝 Paciente no obedece la orden motora de prensión. Manos sin prensión voluntaria (Comatoso).', 'warning');
        onLogInteraction('Líder', '🤝 Respuesta motora post-paro: No obedece órdenes de prensión.', 'warning');
        soundEngine.speak('No obedece órdenes motoras.', 'system');
      }
      return;
    }

    // Conscious
    showFeedback('🤝 ¡El paciente aprieta tu mano firmemente con fuerza simétrica bilateral 5/5!', 'success');
    onLogInteraction('Líder', '🤝 Exploración motora: Paciente aprieta la mano con fuerza simétrica 5/5 (Obedece órdenes motoras, Glasgow M6).', 'success');
    soundEngine.speak('El paciente aprieta tu mano firmemente con fuerza normal.', 'system');
  };

  // 4. Painful Stimulus: Presión en trapecio o lecho ungueal
  const handlePainStimulus = () => {
    if (isArrest) {
      showFeedback('⚡ Estímulo doloroso en trapecio: SIN RESPUESTA MOTORA NI GESTO FACIAL (Glasgow 3).', 'error');
      onLogInteraction('Líder', '⚡ Estímulo doloroso ➔ Sin respuesta ni mueca facial (Arreactivo total en PCR).', 'warning');
      soundEngine.speak('Sin respuesta al estímulo doloroso.', 'system');
      return;
    }

    if (isPostRce) {
      showFeedback('⚡ Estímulo doloroso: Paciente realiza mueca de dolor y retirada flexora inespecífica (Glasgow M4-M5).', 'warning');
      onLogInteraction('Líder', '⚡ Estímulo doloroso post-paro ➔ Retirada y quejido al dolor (Glasgow E2-V2-M4).', 'warning');
      soundEngine.speak('Mueca y retirada inespecífica al dolor.', 'system');
      return;
    }

    triggerDoubleBlink();
    showFeedback('⚡ Paciente: "¡Ay doctor! ¿Por qué me aprieta? ¡Me duele!" (Localiza y retira activamente).', 'success');
    onLogInteraction('Líder', '⚡ Estímulo doloroso ➔ Paciente alerta se queja y localiza inmediatamente.', 'info');
    soundEngine.speak('¡Ay doctor! ¡Me duele!', 'patient', currentCase?.patient?.gender);
  };

  // 5. Penlight Pupillary Examination
  const handleTogglePenlight = () => {
    const next = !isPenlightActive;
    setIsPenlightActive(next);

    if (next) {
      if (isArrest) {
        showFeedback('🔦 Pupilas: MIDRIASIS BILATERAL ARREACTIVA (6.5 mm). Sin reflejo fotomotor directo ni consensual.', 'error');
        onLogInteraction('Líder', '🔦 Linterna pupilar: Midriasis bilateral arreactiva (6.5 mm) secundaria a hipoxia cerebral profunda.', 'warning');
        soundEngine.speak('Midriasis bilateral arreactiva.', 'system');
      } else {
        showFeedback('🔦 Pupilas: ISOCÓRICAS Y REACTIVAS A LA LUZ (3.5 mm ➔ 1.5 mm). Reflejo fotomotor directo y consensual presente bilateral.', 'success');
        onLogInteraction('Líder', '🔦 Linterna pupilar: Pupilas isocóricas y reactivas a la luz (3.5mm a 1.5mm bilateral). Tallo encefálico indemne.', 'success');
        soundEngine.speak('Pupilas isocóricas y reactivas a la luz.', 'system');
      }
    }
  };

  // Dynamic eye and face colors
  const skinColor = isArrest 
    ? '#94A3B8' // Cold ashen cyanotic tone in cardiac arrest
    : (pulsePresent ? '#F6C49E' : '#CBD5E1');

  const eyeLidsClosed = isArrest || isBlinking;
  const isIntubated = airwayStatus.toLowerCase().includes('tubo') || airwayStatus.toLowerCase().includes('tet');
  const hasO2Mask = oxygenDevice === 'reservoir' || oxygenDevice === 'venturi' || oxygenDevice === 'bvm';
  const hasCannula = oxygenDevice === 'nasal_cannula';

  return (
    <div className="bg-[#09111E] border border-cyan-900/60 rounded-xl p-3 flex flex-col gap-2.5 shadow-lg relative overflow-hidden">
      
      {/* Header bar: Paciente, Expresión y Estado AVPU */}
      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-slate-200">
              {currentCase?.patient?.name}
            </span>
            <span className="text-[10px] text-slate-400 ml-1.5">
              ({currentCase?.patient?.age}a, {isFemale ? 'Mujer' : 'Hombre'})
            </span>
          </div>
        </div>

        {/* Nivel de Conciencia AVPU */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">AVPU:</span>
          {['A', 'V', 'P', 'U'].map((letter) => {
            const isMatch = trueAvpu === letter;
            const isSelected = selectedAvpu === letter;
            return (
              <button
                key={letter}
                onClick={() => {
                  setSelectedAvpu(letter);
                  onLogInteraction('Estudiante', `🎯 Nivel de Conciencia AVPU determinado por el alumno: [${letter}] (${letter === 'A' ? 'Alerta' : letter === 'V' ? 'Responde a la Voz' : letter === 'P' ? 'Responde al Dolor' : letter === 'U' ? 'Inconsciente / En Paro' : ''}).`, isMatch ? 'success' : 'warning');
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono transition border ${
                  isMatch
                    ? letter === 'U'
                      ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : isSelected
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={`Escala AVPU: ${letter === 'A' ? 'Alerta' : letter === 'V' ? 'Voz' : letter === 'P' ? 'Dolor' : 'Inconsciente'}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Vignette Layout: Avatar on Left, Interactive Clinical Deck on Right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Left Column (5 Cols): SVG Medical Face Avatar */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center p-2 bg-[#060B14] rounded-xl border border-slate-800/90 relative">
          
          {/* Badge: Estado Ocular Directo */}
          <div className="absolute top-2 left-2 z-10">
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border flex items-center gap-1 ${
              isArrest
                ? 'bg-rose-950/90 border-rose-600 text-rose-300'
                : 'bg-emerald-950/90 border-emerald-600 text-emerald-300'
            }`}>
              {isArrest ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
              {isArrest ? 'OJOS CERRADOS' : (isBlinking ? 'PARPADEANDO' : 'OJOS ABIERTOS')}
            </span>
          </div>

          {/* SVG Animated Medical Avatar */}
          <svg
            viewBox="0 0 160 170"
            className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-md select-none transition-all duration-300"
          >
            <defs>
              {/* Radial gradient for realistic skin lighting */}
              <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor={skinColor} />
                <stop offset="85%" stopColor={isArrest ? '#64748B' : '#E0A97E'} />
                <stop offset="100%" stopColor={isArrest ? '#475569' : '#C78C62'} />
              </radialGradient>
              {/* Penlight beam gradient */}
              <linearGradient id="penlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Neck */}
            <path
              d="M 60 120 L 60 160 L 100 160 L 100 120 Z"
              fill={isArrest ? '#64748B' : '#D99B72'}
            />

            {/* Head Contour */}
            <path
              d="M 80 20 C 45 20 40 45 40 75 C 40 110 55 135 80 135 C 105 135 120 110 120 75 C 120 45 115 20 80 20 Z"
              fill="url(#faceGrad)"
              stroke={isArrest ? '#475569' : '#B87E54'}
              strokeWidth="1.5"
            />

            {/* Hair (Male or Female styling) */}
            {isFemale ? (
              <path
                d="M 38 75 C 36 30 50 15 80 15 C 110 15 124 30 122 75 C 128 85 128 115 124 130 C 120 100 120 40 110 32 C 95 24 65 24 50 32 C 40 40 40 100 36 130 C 32 115 32 85 38 75 Z"
                fill="#2C1B18"
              />
            ) : (
              <path
                d="M 40 65 C 38 28 50 18 80 18 C 110 18 122 28 120 65 C 114 30 105 24 80 24 C 55 24 46 30 40 65 Z"
                fill="#372621"
              />
            )}

            {/* Eyebrows (Distressed / Anxious in initial phase, Flat in arrest) */}
            {isArrest ? (
              <g stroke="#3A2822" strokeWidth="2.5" strokeLinecap="round">
                <path d="M 52 56 Q 62 56 70 57" fill="none" />
                <path d="M 90 57 Q 98 56 108 56" fill="none" />
              </g>
            ) : (
              <g stroke="#3A2822" strokeWidth="2.5" strokeLinecap="round">
                {/* Furrowed / Concerned clinical look */}
                <path d="M 52 58 Q 62 53 71 56" fill="none" />
                <path d="M 89 56 Q 98 53 108 58" fill="none" />
              </g>
            )}

            {/* EYES */}
            {eyeLidsClosed ? (
              /* Closed Eyelids (Curved line with fine eyelashes) */
              <g stroke="#4A342B" strokeWidth="2" strokeLinecap="round" fill="none">
                <path d="M 54 67 Q 63 73 72 67" />
                <path d="M 88 67 Q 97 73 106 67" />
              </g>
            ) : (
              /* Open Eyes (Sclera + Iris + Pupil + Light Reflection) */
              <g>
                {/* Left Eye Sclera */}
                <ellipse cx="63" cy="67" rx="9" ry="5.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.5" />
                {/* Right Eye Sclera */}
                <ellipse cx="97" cy="67" rx="9" ry="5.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.5" />

                {/* Left Iris */}
                <circle cx="63" cy="67" r="4.2" fill="#4B3621" />
                {/* Right Iris */}
                <circle cx="97" cy="67" r="4.2" fill="#4B3621" />

                {/* Pupils (Reacts to penlight if active: 3.5mm -> 1.5mm, or 6.5mm in arrest) */}
                <circle
                  cx="63"
                  cy="67"
                  r={isPenlightActive ? 1.4 : 2.5}
                  fill="#020617"
                  className="transition-all duration-200"
                />
                <circle
                  cx="97"
                  cy="67"
                  r={isPenlightActive ? 1.4 : 2.5}
                  fill="#020617"
                  className="transition-all duration-200"
                />

                {/* Corneal light reflection glint */}
                <circle cx="64.5" cy="65.5" r="0.9" fill="#FFFFFF" />
                <circle cx="98.5" cy="65.5" r="0.9" fill="#FFFFFF" />
              </g>
            )}

            {/* Penlight Light Beam Overlay when flashlight active */}
            {isPenlightActive && (
              <polygon
                points="60 0, 100 0, 115 85, 45 85"
                fill="url(#penlightGrad)"
                pointerEvents="none"
              />
            )}

            {/* Nose */}
            <path
              d="M 80 68 L 77 86 L 83 86 Z"
              fill={isArrest ? '#5A6B7E' : '#D4966F'}
            />

            {/* Mouth */}
            {isIntubated ? (
              /* Endotracheal Tube (TET #8.0) in mouth with white bite block */
              <g>
                <ellipse cx="80" cy="105" rx="8" ry="4" fill="#3A2822" />
                {/* Clear endotracheal tube cylinder */}
                <rect x="76" y="98" width="8" height="24" rx="2" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1" />
                {/* White bite-block securing tape */}
                <rect x="68" y="103" width="24" height="4" fill="#FEF08A" opacity="0.85" rx="1" />
              </g>
            ) : (
              /* Natural mouth (Slack/open in arrest, curved down in pain/distress) */
              <path
                d={isArrest ? "M 73 103 Q 80 109 87 103" : "M 74 104 Q 80 100 86 104"}
                stroke="#6B3428"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Oxygen Accessories if active */}
            {hasO2Mask && (
              /* Semi-transparent Oxygen Mask over mouth and nose with green elastic band */
              <g>
                <polygon
                  points="65 74, 95 74, 98 116, 62 116"
                  fill="#38BDF8"
                  opacity="0.35"
                  stroke="#0284C7"
                  strokeWidth="1"
                  rx="4"
                />
                {/* Elastic band */}
                <path d="M 40 85 L 65 92 M 95 92 L 120 85" stroke="#10B981" strokeWidth="1.2" />
              </g>
            )}

            {hasCannula && (
              /* Nasal prongs under nostrils */
              <g stroke="#38BDF8" strokeWidth="1.5" fill="none">
                <path d="M 40 86 L 75 86" />
                <path d="M 85 86 L 120 86" />
                <circle cx="77" cy="85" r="1.5" fill="#38BDF8" />
                <circle cx="83" cy="85" r="1.5" fill="#38BDF8" />
              </g>
            )}
          </svg>

          {/* Subtítulo bajo el avatar */}
          <div className="text-[10px] font-mono text-center text-slate-400 mt-1">
            <span className="text-cyan-400 font-semibold">
              {isArrest ? 'Paro Cardiorrespiratorio' : consciousness}
            </span>
          </div>

        </div>

        {/* Right Column (7 Cols): Direct Neurological Assessment Tools */}
        <div className="sm:col-span-7 flex flex-col justify-between gap-2">
          
          <div className="text-[11px] font-mono font-bold text-cyan-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Interacción Clínica & Nivel de Conciencia
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              1-clic para evaluar
            </span>
          </div>

          {/* Interactive Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            
            {/* 1. Verbal Stimulus */}
            <button
              onClick={handleAskPatient}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition shadow-sm text-left"
              title="Preguntar directamente: 'Hola, ¿me escucha? ¿Cómo se siente?'"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold">1. ¿Me escucha?</div>
                <div className="text-[9px] text-slate-400">Estímulo verbal</div>
              </div>
            </button>

            {/* 2. Ocular Motor Command */}
            <button
              onClick={handleAskBlink}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition shadow-sm text-left"
              title="Solicitar al paciente: '¡Parpadee dos veces si me escucha!'"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold">2. Parpadear</div>
                <div className="text-[9px] text-slate-400">Orden ocular</div>
              </div>
            </button>

            {/* 3. Hand Grip Command */}
            <button
              onClick={handleGripHand}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition shadow-sm text-left"
              title="Evaluar respuesta motora voluntaria: 'Tome mi mano y apriete fuerte'"
            >
              <Hand className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold">3. Tome mi mano</div>
                <div className="text-[9px] text-slate-400">Prensión (M6)</div>
              </div>
            </button>

            {/* 4. Pain Stimulus */}
            <button
              onClick={handlePainStimulus}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition shadow-sm text-left"
              title="Estímulo doloroso controlado en trapecio o lecho ungueal"
            >
              <Zap className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <div className="leading-tight truncate">
                <div className="font-bold">4. Estímulo dolor</div>
                <div className="text-[9px] text-slate-400">Trapecio (P)</div>
              </div>
            </button>

          </div>

          {/* Penlight Pupillary Examination Button */}
          <button
            onClick={handleTogglePenlight}
            className={`w-full p-1.5 rounded-lg border font-mono text-xs flex items-center justify-between px-2.5 transition active:scale-95 ${
              isPenlightActive
                ? 'bg-yellow-950/80 border-yellow-500 text-yellow-200 shadow-md shadow-yellow-500/20'
                : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-300'
            }`}
            title="Activar linterna médica sobre los ojos del paciente para evaluar reflejo fotomotor"
          >
            <span className="flex items-center gap-2">
              <Flashlight className={`w-3.5 h-3.5 ${isPenlightActive ? 'text-yellow-400 animate-pulse' : 'text-slate-400'}`} />
              <span className="font-bold">Linterna Médica (Reflejo Fotomotor)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">
              {isPenlightActive ? 'Encendida' : 'Apagada'}
            </span>
          </button>

          {/* Interaction Feedback Alert Box */}
          {interactionFeedback && (
            <div className={`p-2 rounded-lg border text-[11px] font-mono animate-in fade-in slide-in-from-top-1 duration-200 ${
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
