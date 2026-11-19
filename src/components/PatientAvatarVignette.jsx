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

          {/* SVG Human Realistic Avatar */}
          <svg
            viewBox="0 0 160 180"
            className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md select-none transition-all duration-300"
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

              {/* Penlight beam */}
              <linearGradient id="penlightRay" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Neck & Clavicle base */}
            <path
              d="M 58 122 L 54 175 L 106 175 L 102 122 Z"
              fill={skinShadow}
            />
            {/* Sternocleidomastoid muscle shadows */}
            <path d="M 64 135 Q 76 160 76 175" stroke={isArrest ? '#475569' : '#B07850'} strokeWidth="1.2" fill="none" opacity="0.5" />
            <path d="M 96 135 Q 84 160 84 175" stroke={isArrest ? '#475569' : '#B07850'} strokeWidth="1.2" fill="none" opacity="0.5" />

            {/* Realistic Ears (Left & Right with tragus and concha) */}
            <g fill={skinShadow} stroke={isArrest ? '#475569' : '#9E653F'} strokeWidth="0.8">
              {/* Left Ear */}
              <path d="M 40 68 C 30 68 28 85 34 100 C 37 106 42 104 42 98 C 36 92 36 78 40 72 Z" />
              <path d="M 36 78 Q 33 88 38 92" fill="none" strokeWidth="0.7" />
              {/* Right Ear */}
              <path d="M 120 68 C 130 68 132 85 126 100 C 123 106 118 104 118 98 C 124 92 124 78 120 72 Z" />
              <path d="M 124 78 Q 127 88 122 92" fill="none" strokeWidth="0.7" />
            </g>

            {/* Realistic Human Face Contour */}
            <path
              d="M 80 18 C 42 18 38 46 38 78 C 38 114 54 138 80 138 C 106 138 122 114 122 78 C 122 46 118 18 80 18 Z"
              fill="url(#realisticSkin)"
              stroke={isArrest ? '#475569' : '#A76D45'}
              strokeWidth="1.2"
            />

            {/* Realistic Hair with volume and age styling */}
            {isFemale ? (
              <g fill={hairColor}>
                {/* Female Hair Volume framing face */}
                <path d="M 36 85 C 32 35 48 12 80 12 C 112 12 128 35 124 85 C 130 115 128 140 122 150 C 118 120 118 42 108 30 C 94 20 66 20 52 30 C 42 42 42 120 38 150 C 32 140 30 115 36 85 Z" />
                {/* Highlights / Streaks */}
                {isElderly && (
                  <path d="M 55 24 Q 80 16 105 24 M 44 48 Q 50 28 65 24 M 116 48 Q 110 28 95 24" stroke="#CBD5E1" strokeWidth="1" fill="none" opacity="0.6" />
                )}
              </g>
            ) : (
              <g fill={hairColor}>
                {/* Male Hair - Receding temples if elderly, realistic sideburns */}
                {isElderly ? (
                  /* Older male with receding hairline */
                  <path d="M 38 72 C 37 45 44 32 58 32 C 68 32 72 40 80 40 C 88 40 92 32 102 32 C 116 32 123 45 122 72 C 118 48 112 24 80 24 C 48 24 42 48 38 72 Z" />
                ) : (
                  /* Fuller hair for younger/middle-aged */
                  <path d="M 38 72 C 36 28 48 14 80 14 C 112 14 124 28 122 72 C 116 28 106 20 80 20 C 54 20 44 28 38 72 Z" />
                )}
                {/* Grey / silver hair texture strands */}
                {(isElderly || isMiddleAged) && (
                  <g stroke="#E2E8F0" strokeWidth="0.8" opacity="0.5" fill="none">
                    <path d="M 40 68 Q 42 50 50 42" />
                    <path d="M 120 68 Q 118 50 110 42" />
                    <path d="M 52 36 Q 80 28 108 36" />
                  </g>
                )}
              </g>
            )}

            {/* Subtle 5 o'clock stubble shadow for male patients */}
            {!isFemale && !isArrest && (
              <path
                d="M 52 98 C 52 125 64 135 80 135 C 96 135 108 125 108 98 C 104 112 96 122 80 122 C 64 122 56 112 52 98 Z"
                fill="#3A2822"
                opacity="0.12"
              />
            )}

            {/* AGE WRINKLES & ANATOMICAL EXPRESSION LINES */}
            <g stroke={isArrest ? '#475569' : '#8A5A38'} strokeWidth="0.8" fill="none" opacity={isElderly ? 0.75 : (isMiddleAged ? 0.45 : 0.2)}>
              {/* Forehead worry lines (3 curved parallel lines) */}
              <path d="M 56 38 Q 80 34 104 38" />
              <path d="M 54 44 Q 80 40 106 44" />
              {isElderly && <path d="M 58 50 Q 80 46 102 50" />}

              {/* Glabellar vertical frown lines (between brows) */}
              <path d="M 77 56 L 77 62" strokeWidth="1" />
              <path d="M 83 56 L 83 62" strokeWidth="1" />

              {/* Crow's feet ("Patas de gallo" at eye corners) */}
              {isElderly && (
                <>
                  <path d="M 48 68 L 42 66" />
                  <path d="M 47 71 L 40 71" />
                  <path d="M 48 74 L 42 76" />
                  <path d="M 112 68 L 118 66" />
                  <path d="M 113 71 L 120 71" />
                  <path d="M 112 74 L 118 76" />
                </>
              )}

              {/* Under-eye bags / Tear troughs (Ojeras) */}
              <path d="M 54 77 Q 63 82 72 78" />
              <path d="M 88 78 Q 97 82 106 77" />

              {/* Nasolabial folds (Surcos nasogenianos from nose to mouth corners) */}
              <path d="M 69 90 Q 64 102 67 114" strokeWidth="1" />
              <path d="M 91 90 Q 96 102 93 114" strokeWidth="1" />

              {/* Marionette lines & Chin groove */}
              {isElderly && (
                <>
                  <path d="M 68 116 Q 67 125 70 128" />
                  <path d="M 92 116 Q 93 125 90 128" />
                  <path d="M 74 130 Q 80 132 86 130" />
                </>
              )}
            </g>

            {/* Eyebrows (Realistic feathered brows) */}
            <g stroke={hairColor} strokeWidth="2.2" strokeLinecap="round">
              {isArrest ? (
                /* Flat relaxed in cardiac arrest */
                <>
                  <path d="M 52 59 Q 63 60 72 61" fill="none" opacity="0.7" />
                  <path d="M 88 61 Q 97 60 108 59" fill="none" opacity="0.7" />
                </>
              ) : (
                /* Angled worried / acute pain brows */
                <>
                  <path d="M 52 62 Q 62 55 72 58" fill="none" />
                  <path d="M 88 58 Q 98 55 108 62" fill="none" />
                </>
              )}
            </g>

            {/* EYES */}
            {eyeLidsClosed ? (
              /* Sunken closed eyelids with lashes */
              <g stroke="#4A342B" strokeWidth="1.8" strokeLinecap="round" fill="none">
                <path d="M 53 71 Q 63 76 73 71" />
                <path d="M 87 71 Q 97 76 107 71" />
                {/* Subtle eyelashes */}
                <path d="M 57 73 L 56 75 M 63 74 L 63 76 M 69 73 L 70 75" strokeWidth="0.8" />
                <path d="M 91 73 L 90 75 M 97 74 L 97 76 M 103 73 L 104 75" strokeWidth="0.8" />
              </g>
            ) : (
              /* High-fidelity open eyes (Sclera + Iris radial + Pupil + Reflection) */
              <g>
                {/* Upper eyelid crease */}
                <path d="M 52 66 Q 63 63 73 66" stroke="#6B442A" strokeWidth="0.8" fill="none" />
                <path d="M 87 66 Q 97 63 108 66" stroke="#6B442A" strokeWidth="0.8" fill="none" />

                {/* Sclera with soft anatomical shading */}
                <ellipse cx="63" cy="71" rx="9.5" ry="5.8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.5" />
                <ellipse cx="97" cy="71" rx="9.5" ry="5.8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="0.5" />

                {/* Caruncle (inner tear duct corner) */}
                <circle cx="53.5" cy="71.5" r="1.1" fill="#FDA4AF" />
                <circle cx="106.5" cy="71.5" r="1.1" fill="#FDA4AF" />

                {/* Iris (Hazel/Brown with limbal ring) */}
                <circle cx="63" cy="71" r="4.3" fill="#3D291A" stroke="#1C120C" strokeWidth="0.8" />
                <circle cx="97" cy="71" r="4.3" fill="#3D291A" stroke="#1C120C" strokeWidth="0.8" />

                {/* Pupil (Constricts with penlight: 3.5mm -> 1.5mm) */}
                <circle
                  cx="63"
                  cy="71"
                  r={isPenlightActive ? 1.3 : 2.5}
                  fill="#020617"
                  className="transition-all duration-200"
                />
                <circle
                  cx="97"
                  cy="71"
                  r={isPenlightActive ? 1.3 : 2.5}
                  fill="#020617"
                  className="transition-all duration-200"
                />

                {/* Corneal specular reflection shine */}
                <circle cx="64.5" cy="69.5" r="1" fill="#FFFFFF" />
                <circle cx="98.5" cy="69.5" r="1" fill="#FFFFFF" />

                {/* Upper lashes */}
                <path d="M 53 70 Q 63 65 73 70" stroke="#2C1A14" strokeWidth="1.2" fill="none" />
                <path d="M 87 70 Q 97 65 107 70" stroke="#2C1A14" strokeWidth="1.2" fill="none" />
              </g>
            )}

            {/* Penlight Light Beam Overlay */}
            {isPenlightActive && (
              <polygon
                points="60 0, 100 0, 116 90, 44 90"
                fill="url(#penlightRay)"
                pointerEvents="none"
              />
            )}

            {/* Nose (Detailed 3D bridge and nostrils) */}
            <path
              d="M 80 68 L 78 90 C 76 92 73 93 73 95 C 73 97 87 97 87 95 C 87 93 84 92 82 90 Z"
              fill="url(#noseShade)"
            />
            {/* Nostrils */}
            <ellipse cx="76.5" cy="94" rx="2" ry="1.2" fill="#3A2218" opacity="0.6" />
            <ellipse cx="83.5" cy="94" rx="2" ry="1.2" fill="#3A2218" opacity="0.6" />

            {/* Philtrum groove */}
            <path d="M 78.5 96 L 78.5 103 M 81.5 96 L 81.5 103" stroke={skinShadow} strokeWidth="0.6" fill="none" opacity="0.5" />

            {/* Mouth & Lips */}
            {isIntubated ? (
              /* Endotracheal Tube #8.0 with bite block & fixation tape */
              <g>
                <ellipse cx="80" cy="111" rx="8" ry="4.5" fill="#2E1B15" />
                <rect x="76" y="103" width="8" height="26" rx="2" fill="#F1F5F9" stroke="#0284C7" strokeWidth="1" />
                <rect x="68" y="109" width="24" height="4" fill="#FEF08A" opacity="0.9" rx="1" />
              </g>
            ) : (
              /* Natural lips with Cupid's bow and lip shading */
              <g>
                {/* Upper lip */}
                <path
                  d="M 72 108 C 76 106 78 107 80 108 C 82 107 84 106 88 108 C 85 110 75 110 72 108 Z"
                  fill={lipColor}
                />
                {/* Mouth opening line */}
                <path
                  d={isArrest ? "M 72 108 Q 80 112 88 108" : "M 72 108 Q 80 106 88 108"}
                  stroke="#381E15"
                  strokeWidth="1.2"
                  fill="none"
                />
                {/* Lower lip */}
                <path
                  d="M 73 109 Q 80 114 87 109 Z"
                  fill={lipColor}
                  opacity="0.9"
                />
              </g>
            )}

            {/* Forehead Diaphoresis / Sweat Beads (Clinical ACS marker) */}
            {!isArrest && (currentCase?.type === 'taquicardia' || age >= 50) && (
              <g fill="#BAE6FD" opacity="0.75">
                <circle cx="68" cy="46" r="1.1" />
                <circle cx="73" cy="40" r="0.9" />
                <circle cx="88" cy="42" r="1.1" />
                <circle cx="94" cy="48" r="0.9" />
                <circle cx="60" cy="54" r="0.8" />
                <circle cx="101" cy="53" r="0.8" />
              </g>
            )}

            {/* Oxygen Gear if active */}
            {hasO2Mask && (
              <g>
                <polygon
                  points="65 80, 95 80, 98 122, 62 122"
                  fill="#38BDF8"
                  opacity="0.32"
                  stroke="#0284C7"
                  strokeWidth="1"
                  rx="4"
                />
                <path d="M 40 92 L 65 98 M 95 98 L 120 92" stroke="#10B981" strokeWidth="1.2" />
              </g>
            )}

            {hasCannula && (
              <g stroke="#38BDF8" strokeWidth="1.4" fill="none">
                <path d="M 40 93 L 75 93" />
                <path d="M 85 93 L 120 93" />
                <circle cx="76.5" cy="92" r="1.3" fill="#38BDF8" />
                <circle cx="83.5" cy="92" r="1.3" fill="#38BDF8" />
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
