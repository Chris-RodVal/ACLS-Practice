import React, { useState, useEffect, useRef } from 'react';
import { ACLS_CASES, getRandomCase } from './data/cases';
import { parseClinicalCommand, evaluateSession } from './services/clinicalEngine';
import { evaluateAclsSessionWithAI } from './services/aiService';
import { soundEngine } from './audio/soundEngine';
import MonitorCanvas from './components/MonitorCanvas';
import VitalSignsSidebar from './components/VitalSignsSidebar';
import DefibrillatorPanel from './components/DefibrillatorPanel';
import PatientStatusPanel from './components/PatientStatusPanel';
import CommandConsole from './components/CommandConsole';
import TwelveLeadModal from './components/TwelveLeadModal';
import EvaluationModal from './components/EvaluationModal';
import CaseSelectorModal from './components/CaseSelectorModal';
import HytModal from './components/HytModal';
import RhythmDiagnosisModal from './components/RhythmDiagnosisModal';
import ClinicalExamModal from './components/ClinicalExamModal';
import { BookOpen, Stethoscope, RefreshCw, Award, Volume2, VolumeX, ShieldAlert, HeartPulse, Dices, Key, Bot, Menu, ChevronDown, ChevronUp, X as CloseIcon } from 'lucide-react';

export default function App() {
  // 1. Case & Phase state
  const [currentCase, setCurrentCase] = useState(ACLS_CASES[0]);
  const [phase, setPhase] = useState('initial'); // 'initial' | 'arrest' | 'rce' | 'post_rce' | 'dead'

  // 2. Vital signs state
  const [hr, setHr] = useState(currentCase.initialVitals.hr);
  const [spo2, setSpo2] = useState(currentCase.initialVitals.spo2);
  const [bp, setBp] = useState(currentCase.initialVitals.bp);
  const [etco2, setEtco2] = useState(currentCase.initialVitals.etco2);
  const [rr, setRr] = useState(currentCase.initialVitals.rr);
  const [temp, setTemp] = useState(currentCase.initialVitals.temp);
  const [rhythm, setRhythm] = useState(currentCase.initialVitals.rhythm);
  const [rhythmName, setRhythmName] = useState(currentCase.initialVitals.rhythmName);
  const [pulsePresent, setPulsePresent] = useState(true);

  // 3. Physical status
  const [consciousness, setConsciousness] = useState(currentCase.initialVitals.consciousness);
  const [airwayStatus, setAirwayStatus] = useState(currentCase.initialVitals.airway);
  const [ivStatus, setIvStatus] = useState(currentCase.initialVitals.ivAccess);
  const [announcement, setAnnouncement] = useState(currentCase.patient.presentation);
  const [patientDialogue, setPatientDialogue] = useState('¡Doctor, siento un aleteo muy fuerte en el pecho y me falta el aire!');

  // 4. Defibrillator & Pacer state
  const [joules, setJoules] = useState(200);
  const [isSync, setIsSync] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [isCharged, setIsCharged] = useState(false);
  const [isPacingActive, setIsPacingActive] = useState(false);
  const [pacerRate, setPacerRate] = useState(70);
  const [pacerMa, setPacerMa] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);

  // 5. Timers & CPR tracking
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [cprCycleSeconds, setCprCycleSeconds] = useState(0);
  const [isCprActive, setIsCprActive] = useState(false);
  const [isNibpMeasuring, setIsNibpMeasuring] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [initialTimeLimit, setInitialTimeLimit] = useState(270); // 4:30 min para dar tiempo suficiente en simulaciones en vivo

  // 6. Resuscitation counters & Clinical trackers
  const [shockCount, setShockCount] = useState(0);
  const [adrenalineCount, setAdrenalineCount] = useState(0);
  const [amiodaroneCount, setAmiodaroneCount] = useState(0);
  const [cprCyclesCompleted, setCprCyclesCompleted] = useState(0);
  const [actionsTaken, setActionsTaken] = useState([]);
  const [criticalErrors, setCriticalErrors] = useState([]);
  const [eventLogs, setEventLogs] = useState([]);
  const [hasGivenAtropine, setHasGivenAtropine] = useState(false);
  const [hasGivenVolume, setHasGivenVolume] = useState(false);
  const [hasIdentifiedHyt, setHasIdentifiedHyt] = useState(false);
  const [has12Lead, setHas12Lead] = useState(false);
  const [hasTtm, setHasTtm] = useState(false);
  const [hasCheckedBp, setHasCheckedBp] = useState(false);
  const [hasSecuredAirway, setHasSecuredAirway] = useState(false);
  const [hasAssignedRoles, setHasAssignedRoles] = useState(false);
  const [hasConnectedMonitor, setHasConnectedMonitor] = useState(true);
  const [hasIvAccess, setHasIvAccess] = useState(true);
  const [hasGivenOxygen, setHasGivenOxygen] = useState(false);
  const [oxygenDevice, setOxygenDevice] = useState('none'); // 'none' | 'nasal_cannula' | 'venturi' | 'reservoir' | 'bvm'
  const isOxygenAdministered = oxygenDevice !== 'none';
  const [hasAchievedRce, setHasAchievedRce] = useState(false);
  const [treatedCauses, setTreatedCauses] = useState([]);
  const [studentDiagnosedRhythm, setStudentDiagnosedRhythm] = useState(null);
  const [hasDeclaredArrestRhythm, setHasDeclaredArrestRhythm] = useState(false);
  const [dynamicExam, setDynamicExam] = useState(null);
  const [hasReferred, setHasReferred] = useState(false);
  const [referralDestination, setReferralDestination] = useState(null);
  const [isSimulationCompleted, setIsSimulationCompleted] = useState(false);

  // New Clinical Trackers (Intubation, Saline IV, AI Rubric, API Key)
  const [isIntubating, setIsIntubating] = useState(false);
  const [intubationTimer, setIntubationTimer] = useState(0);
  const [infusedVolumeMl, setInfusedVolumeMl] = useState(0);
  const [aiScorePreview, setAiScorePreview] = useState(null);
  const DEFAULT_GEMINI_KEY = 'AIzaSyDnALQuCp-KxRsiVpjyPReGXTwDNroh8Go';
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('acls_gemini_api_key') || DEFAULT_GEMINI_KEY);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(() => soundEngine.getElevenLabsKey() || '');
  const [isApiKeyPromptOpen, setIsApiKeyPromptOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Barra de menú superior colapsable para optimizar espacio vertical

  // 7. Modals
  const [is12LeadOpen, setIs12LeadOpen] = useState(false);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [isCaseSelectorOpen, setIsCaseSelectorOpen] = useState(false);
  const [isHytOpen, setIsHytOpen] = useState(false);
  const [isClinicalExamOpen, setIsClinicalExamOpen] = useState(false);
  const [isRhythmDiagnosisOpen, setIsRhythmDiagnosisOpen] = useState(false);
  const [evaluationData, setEvaluationData] = useState(null);

  // Helper to append logs
  const addLog = (actor, message, type = 'info') => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    setEventLogs((prev) => [...prev, { time: timeStr, actor, message, type }]);
  };

  // Main 1-second simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      // If the phase-1 timer is manually paused by the instructor, don't increment elapsed
      if (phase === 'initial' && isTimerPaused) return;

      setElapsedSeconds((prev) => prev + 1);

      // Intubation countdown timer (30 seconds of CPR pause)
      if (isIntubating) {
        setIntubationTimer((prev) => {
          if (prev <= 1) {
            setIsIntubating(false);
            setHasSecuredAirway(true);
            setAirwayStatus('Tubo Endotraqueal #8.0 a 22 cm fijado + Capnografía');
            addLog('Vía Aérea', '✅ ¡Intubación endotraqueal exitosa! Tubo #8.0 fijado a 22 cm. Murmullo pulmonar bilateral simétrico confirmado, capnografía conectada. Reanudar compresiones torácicas continuas a 110 cpm (1 ventilación cada 6 seg sin pausas).', 'success');
            soundEngine.speak('Intubación exitosa. Tubo fijado. Reanudar compresiones continuas.', 'system');
            return 0;
          }
          return prev - 1;
        });
      }

      // Physiological impact of Oxygen administration based on device
      if (phase === 'initial' && pulsePresent) {
        if (oxygenDevice === 'reservoir' || oxygenDevice === 'bvm') {
          setSpo2((prev) => Math.min(99, prev + 1));
        } else if (oxygenDevice === 'venturi') {
          setSpo2((prev) => Math.min(96, Math.max(92, prev + 1)));
        } else if (oxygenDevice === 'nasal_cannula') {
          setSpo2((prev) => Math.min(94, prev + 1));
        } else {
          // If room air and initial was hypoxemic or severe arrhythmia: slowly desaturates
          if (elapsedSeconds > 0 && elapsedSeconds % 6 === 0) {
            setSpo2((prev) => Math.max(76, prev - 1));
          }
        }
      }

      if (phase === 'arrest') {
        setCprCycleSeconds((prev) => {
          const next = prev + 1;
          // Prompt every 2 minutes (120 seconds) for rhythm & pulse check
          if (next === 120) {
            soundEngine.playAlarm(true);
            soundEngine.speak('Dos minutos de RCP completados. Evaluar pulso carotídeo y cambiar de compresor.', 'system');
            addLog('Monitor', '⏱️ ¡2 MINUTOS DE RCP COMPLETADOS! Evaluar pulso carotídeo (<10s) y cambiar de reanimador compresor.', 'warning');
          }
          return next;
        });

        // EtCO2 dynamics in arrest:
        if (isCprActive) {
          const targetEtco2 = isOxygenAdministered ? 15 : 9;
          setEtco2((prev) => (prev < targetEtco2 ? prev + 1 : targetEtco2));
        } else {
          setEtco2((prev) => Math.max(0, prev - 1));
        }
      }

      // Natural deterioration trigger:
      // Uses initialTimeLimit (default 270s = 4:30 min) for live simulation comfort.
      // Hypoxic without O2: earlier deterioration threshold (120s = 2 min)
      const deteriorationThreshold = !isOxygenAdministered && currentCase.initialVitals.spo2 < 93 ? 120 : initialTimeLimit;
      if (phase === 'initial' && elapsedSeconds >= deteriorationThreshold) {
        triggerCardiacArrest();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, elapsedSeconds, isOxygenAdministered, isCprActive, pulsePresent, currentCase, isIntubating, isTimerPaused, initialTimeLimit]);

  // Metronome for CPR at 110 cpm
  useEffect(() => {
    if (isCprActive) {
      soundEngine.startMetronome();
    } else {
      soundEngine.stopMetronome();
    }
    return () => soundEngine.stopMetronome();
  }, [isCprActive]);

  // Audio QRS beat callback — beep for ANY organized rhythm (pulse or not)
  // Only silent rhythms: FV, FV_FINA, FV_GRUESA, ASISTOLIA (no organized QRS)
  const handleQRSBeat = (currentSpo2) => {
    const silentRhythms = ['FV', 'FV_FINA', 'FV_GRUESA', 'ASISTOLIA'];
    if (!silentRhythms.includes(rhythm)) {
      soundEngine.playQRSBeep(currentSpo2);
    }
  };

  // Ensure audio context is initialized on ANY user interaction (required by browsers)
  useEffect(() => {
    const initAudio = () => { soundEngine.init(); };
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  // Switch Case
  const handleSelectCase = (newCase) => {
    soundEngine.init();
    setCurrentCase(newCase);
    resetSimulationState(newCase);
  };

  const resetSimulationState = (caseObj = currentCase) => {
    soundEngine.stopCharge();
    soundEngine.stopReadyTone();
    soundEngine.stopMetronome();
    setPhase('initial');
    setHr(caseObj.initialVitals.hr);
    setSpo2(caseObj.initialVitals.spo2);
    setBp(caseObj.initialVitals.bp);
    setEtco2(caseObj.initialVitals.etco2);
    setRr(caseObj.initialVitals.rr);
    setTemp(caseObj.initialVitals.temp);
    setRhythm(caseObj.initialVitals.rhythm);
    setRhythmName(caseObj.initialVitals.rhythmName);
    setPulsePresent(true);

    setConsciousness(caseObj.initialVitals.consciousness);
    setAirwayStatus(caseObj.initialVitals.airway);
    setIvStatus(caseObj.initialVitals.ivAccess);
    setAnnouncement(caseObj.patient.presentation);
    setPatientDialogue(caseObj.type === 'taquicardia' ? '¡Doctor, me palpita el pecho muy rápido y me siento mareado!' : 'Me siento muy débil, todo me da vueltas...');

    setJoules(200);
    setIsSync(false);
    setIsCharging(false);
    setIsCharged(false);
    setIsPacingActive(false);

    setElapsedSeconds(0);
    setCprCycleSeconds(0);
    setIsCprActive(false);
    setIsNibpMeasuring(false);

    setShockCount(0);
    setAdrenalineCount(0);
    setAmiodaroneCount(0);
    setCprCyclesCompleted(0);
    setActionsTaken([]);
    setCriticalErrors([]);
    setEventLogs([]);
    setHasGivenAtropine(false);
    setHasGivenVolume(false);
    setHasIdentifiedHyt(false);
    setHas12Lead(false);
    setHasTtm(false);
    setHasCheckedBp(false);
    setHasSecuredAirway(false);
    setHasAssignedRoles(false);
    setHasConnectedMonitor(true);
    setHasIvAccess(true);
    setHasGivenOxygen(false);
    setOxygenDevice('none');
    setTreatedCauses([]);
    setStudentDiagnosedRhythm(null);
    setHasDeclaredArrestRhythm(false);
    setDynamicExam(null);
    setHasReferred(false);
    setReferralDestination(null);
    setIsSimulationCompleted(false);
    setHasAchievedRce(false);
    setEvaluationData(null);
    setIsIntubating(false);
    setIntubationTimer(0);
    setInfusedVolumeMl(0);
    setAiScorePreview(null);
    setIsTimerPaused(false);
    setInitialTimeLimit(270); // Reset to 4:30 min for each new case

    addLog('Sistema', `Caso iniciado: ${caseObj.title}. Paciente en box de atención.`, 'info');
  };

  // Deterioration into Cardiac Arrest (PCR)
  const triggerCardiacArrest = () => {
    if (phase === 'arrest' || phase === 'post_rce') return;

    soundEngine.playAlarm(true);
    soundEngine.speak('¡Atención médica! El paciente no responde y entra en apnea. Comprueben pulso carotídeo y evalúen el ritmo en el osciloscopio.', 'system');
    setPhase('arrest');
    setPulsePresent(false);
    setHasDeclaredArrestRhythm(false);
    setStudentDiagnosedRhythm(null);

    const isAesp = currentCase.arrestVitals.rhythm === 'AESP' || 
                   (typeof currentCase.arrestVitals.rhythm === 'string' && currentCase.arrestVitals.rhythm.includes('AESP')) ||
                   currentCase.arrestType === 'AESP';
    const arrestHr = isAesp ? (currentCase.arrestVitals.hr || 48) : 0;
    setHr(arrestHr);
    setSpo2(0);
    setBp('0/0');
    setEtco2(currentCase.arrestVitals.etco2);
    setRr(0);
    setRhythm(currentCase.arrestVitals.rhythm);
    setRhythmName(currentCase.arrestVitals.rhythmName);
    setConsciousness('Inconsciente, sin respuesta a estímulos (SIN PULSO)');
    setPatientDialogue('');
    
    // Blind arrest rhythm: simulator NEVER reveals rhythm diagnosis to the student beforehand!
    const genericArrestAlert = '🚨 ¡COLAPSO HEMODINÁMICO SÚBITO! El paciente pierde bruscamente el conocimiento y entra en apnea. Compruebe pulso carotídeo en <10s, evalúe el ritmo en el monitor y declare el ritmo.';
    setAnnouncement(genericArrestAlert);
    setCprCycleSeconds(0);

    addLog('Alerta Médica', '🚨 ¡COLAPSO HEMODINÁMICO SÚBITO! El paciente no responde y entra en apnea.', 'error');
    addLog('Monitor', '🚨 Ausencia de pulso comprobada. Observe el trazado en el osciloscopio y declare el ritmo con el botón "Declarar Ritmo".', 'error');
  };

  // Return of Spontaneous Circulation (RCE / ROSC)
  const triggerRCE = () => {
    if (hasAchievedRce) return;

    setPhase('post_rce');
    setHasAchievedRce(true);
    setIsCprActive(false);
    setPulsePresent(true);

    const rce = currentCase.rceVitals;
    setHr(rce.hr);
    setSpo2(rce.spo2);
    setBp(rce.bp);
    setEtco2(rce.etco2);
    setRr(rce.rr);
    setTemp(rce.temp);
    setRhythm(rce.rhythm);
    setRhythmName(rce.rhythmName);
    setConsciousness(rce.consciousness);

    soundEngine.playAlarm(false);
    soundEngine.speak('¡Retorno de circulación espontánea confirmado! Pulso carotídeo palpable. Iniciar cuidados posparo.', 'system');
    setAnnouncement(`🎉 ¡RETORNO DE CIRCULACIÓN ESPONTÁNEA (RCE)! Pulso carotídeo palpable. Salto súbito de EtCO2 a ${rce.etco2} mmHg. PA: ${rce.bp}. Iniciar inmediatamente cuidados posparo según algoritmo ACLS.`);
    addLog('Monitor', `✨ ¡RCE CONFIRMADO! Pulso palpable, EtCO2 se eleva bruscamente a ${rce.etco2} mmHg. Detener compresiones e iniciar protocolo posparo.`, 'success');
  };

  // Check if complete ACLS algorithm is finalized (Post-ROSC bundle: BP + 12Lead + TTM + Referral)
  const checkSimulationCompletion = (ttm = hasTtm, referred = hasReferred, bpChecked = hasCheckedBp, ecgDone = has12Lead) => {
    if (phase === 'post_rce' || hasAchievedRce) {
      if (ttm && referred && bpChecked && ecgDone) {
        setIsSimulationCompleted(true);
        soundEngine.playAlarm(false);
        soundEngine.speak('¡Simulación completada con éxito! Todos los pasos del algoritmo ACLS han sido cumplidos.', 'system');
        addLog('Docente Evaluador', '🏆 ¡SIMULACIÓN CLÍNICA ACLS COMPLETADA CON ÉXITO! Has ejecutado el algoritmo ACLS en su totalidad: Manejo de Arritmia Inicial ➔ Reanimación en Paro Cardíaco ➔ RCE ➔ Cuidados Posparo Completos (PA, ECG 12D, MET y Derivación). Procediendo a la Pauta de Evaluación Oficial.', 'success');
        setAnnouncement('🏆 ¡CASO Y ALGORITMO ACLS COMPLETADOS CON ÉXITO! Has estabilizado al paciente y completado todos los cuidados posparo según pauta (PA, ECG 12D, MET y Derivación).');
        setTimeout(() => {
          handleOpenEvaluation();
        }, 2200);
      }
    }
  };

  // Disparar Fallecimiento del Paciente por errores críticos reiterados o medicación incorrecta
  const triggerPatientDeath = (reason = 'Errores críticos reiterados y daño miocárdico irreversible') => {
    soundEngine.stopCharge();
    soundEngine.stopReadyTone();
    soundEngine.stopMetronome();
    setPhase('dead');
    setPulsePresent(false);
    setHr(0);
    setBp('0/0');
    setSpo2(0);
    setEtco2(0);
    setRr(0);
    setRhythm('ASISTOLIA');
    setRhythmName('Asistolia Irreversible (Línea Plana)');
    setConsciousness('Fallecido — Paro irreversible');
    setIsSimulationCompleted(true);
    soundEngine.playAlarm(true);
    soundEngine.speak('El paciente ha fallecido. Paro irreversible. Procediendo a la pauta de evaluación.', 'system');
    addLog('Docente Evaluador', `💀 ¡EL PACIENTE HA FALLECIDO! Razón: ${reason}. La reanimación ha fracasado. Desplegando Pauta de Cotejo y Nota final.`, 'error');
    setAnnouncement(`💀 PACIENTE FALLECIDO: ${reason}. Simulación finalizada.`);
    setTimeout(() => {
      handleOpenEvaluation();
    }, 2500);
  };

  // Helper para acumular errores críticos y detonar muerte tras errores reiterados (>=3)
  const addCriticalError = (err) => {
    setCriticalErrors((prev) => {
      const next = [...prev, err];
      if (next.length >= 3 && phase !== 'dead') {
        setTimeout(() => {
          triggerPatientDeath('Acumulación de 3 o más errores críticos fatales durante la reanimación (medicación incorrecta o violaciones graves del algoritmo ACLS).');
        }, 800);
      }
      return next;
    });
    addLog('Docente Evaluador', `❌ ${err}`, 'error');
  };

  const handleInitiateTtm = (targetTemp = 33) => {
    setHasTtm(true);
    setTemp(targetTemp);
    addLog('Cuidados Posparo', `❄️ Protocolo MET activado: Manejo Específico de la Temperatura iniciado (Meta objetivo ${targetTemp} °C durante 24 horas con dispositivo de retroalimentación continuo). Paciente comatoso, neuroprotección cerebral iniciada según algoritmo ACLS.`, 'success');
    soundEngine.speak(`Manejo específico de la temperatura iniciado a ${targetTemp} grados Celsius.`, 'system');
    checkSimulationCompletion(true, hasReferred, hasCheckedBp, has12Lead);
  };

  const handleReferPatient = (dest = 'hemodinamia') => {
    setHasReferred(true);
    setReferralDestination(dest);
    const destNames = {
      hemodinamia: 'Laboratorio de Hemodinamia (Coronariografía inmediata / ICP de emergencia por sospecha de STEMI o shock cardiogénico)',
      uci: 'Unidad de Paciente Crítico (UCI) para soporte multiorgánico avanzado y monitoreo continuo',
      quirofano: 'Pabellón Quirúrgico de Urgencia'
    };
    addLog('Derivación', `🏥 Derivación coordinada: Paciente transferido a ${destNames[dest] || dest}. Traslado con monitorización continua, soporte hemodinámico y vía aérea garantizada.`, 'success');
    soundEngine.speak(`Derivación coordinada a ${dest === 'hemodinamia' ? 'Hemodinamia' : 'UCI'}.`, 'system');
    checkSimulationCompletion(hasTtm, true, hasCheckedBp, has12Lead);
  };

  // NIBP Manual measurement trigger
  const handleTriggerNibp = () => {
    if (isNibpMeasuring) return;
    setIsNibpMeasuring(true);
    soundEngine.playNibpStart();
    addLog('Enfermería', 'Iniciando toma de Presión Arterial no invasiva (inflado de manguito)...', 'info');

    setTimeout(() => {
      setIsNibpMeasuring(false);
      setHasCheckedBp(true);
      const measuredBp = pulsePresent ? bp : '0/0';
      addLog('Monitor', `PA registrada: ${measuredBp} mmHg.`, 'info');
      checkSimulationCompletion(hasTtm, hasReferred, true, has12Lead);
    }, 3500);
  };

  // Defibrillator Capacitor Charging
  const handleStartCharge = () => {
    if (isCharging || isCharged) return;
    setIsCharging(true);
    soundEngine.startCharge(2.5);
    addLog('Desfibrilador', `Cargando condensador a ${joules} Joules...`, 'warning');

    setTimeout(() => {
      setIsCharging(false);
      setIsCharged(true);
      soundEngine.startReadyTone();
      addLog('Desfibrilador', `¡CONDENSADOR CARGADO A ${joules} JOULES! Listo para descargar. Despejar al equipo.`, 'warning');
      soundEngine.speak(`Condensador cargado a ${joules} Joules. Despejar al paciente.`, 'system');
    }, 2500);
  };

  // Deliver Shock (Defibrillation or Cardioversion)
  const handleDeliverShock = () => {
    if (!isCharged) return;
    soundEngine.playShock();
    setIsCharged(false);
    setIsCharging(false);

    // Case A: Patient in Initial Phase (Tachycardia with pulse)
    if (phase === 'initial') {
      if (!isSync) {
        // Critical Error: Unsynchronized shock with pulse -> induces VF
        const err = 'Error Crítico: Descarga NO sincronizada aplicada en taquicardia con pulso. Riesgo inminente de inducir FV por fenómeno R-sobre-T.';
        addCriticalError(err);
        triggerCardiacArrest();
        return;
      } else {
        // Correct Synchronized Cardioversion
        addLog('Equipo', `Cardioversión sincronizada de ${joules}J aplicada exitosamente sobre la onda R.`, 'success');
        // If case is designed to degenerate, it moves forward, else cardioverts
        setTimeout(() => {
          triggerCardiacArrest();
        }, 3000);
        return;
      }
    }

    // Case B: Patient in Cardiac Arrest
    if (phase === 'arrest') {
      setShockCount((prev) => prev + 1);

      if (!currentCase.isShockable) {
        // Critical Error: Shocking Non-shockable rhythm (AESP or Asystole)
        const err = `Error Crítico: Descargó en ritmo NO desfibrilable (${currentCase.arrestType}). En AESP y Asistolia NO se desfibrila.`;
        addCriticalError(err);
        return;
      }

      // Correct Shock on FV / pVT: Immediate CPR resumption & 2-min cycle timer begins at 0:00
      addLog('Equipo', `¡Descarga de ${joules}J administrada! Despeje confirmado ("Fuera todos").`, 'success');
      setCprCycleSeconds(0);
      setIsCprActive(true);
      soundEngine.startMetronome();
      addLog('Líder ACLS', '⏱️ ¡REANUDAR RCP DE INMEDIATO! El ciclo de 2 minutos se reinicia a partir de esta descarga.', 'warning');

      // Check if conditions for RCE are met (e.g. after shocks + CPR + drugs)
      if (shockCount >= 1 && (adrenalineCount >= 1 || amiodaroneCount >= 1)) {
        setTimeout(() => {
          triggerRCE();
        }, 6000);
      }
    }
  };

  // Toggle Pacing
  const handleTogglePacing = () => {
    const next = !isPacingActive;
    setIsPacingActive(next);
    if (next) {
      soundEngine.playPacerClick();
      addLog('Equipo', `Marcapasos transcutáneo activado a FC: ${pacerRate} lpm, Corriente: ${pacerMa} mA.`, 'info');
      if (currentCase.type === 'bradicardia' && pacerMa >= 60) {
        setHr(pacerRate);
        setBp('98/60');
        setPulsePresent(true);
        addLog('Monitor', 'Captura eléctrica y mecánica 100% con marcapasos transcutáneo.', 'success');
      }
    } else {
      addLog('Equipo', 'Marcapasos transcutáneo apagado.', 'info');
    }
  };

  // Dedicated Oxygen device selection
  const handleChangeOxygenDevice = (deviceId) => {
    setOxygenDevice(deviceId);
    if (deviceId !== 'none') {
      setHasGivenOxygen(true);
      const labels = {
        nasal_cannula: 'Cánula nasal a 3 L/min (FiO2 ~32%)',
        venturi: 'Mascarilla Venturi al 50% (10 L/min)',
        reservoir: 'Mascarilla con reservorio de no reinhalación a 15 L/min (FiO2 100%)',
        bvm: 'Ventilación con bolsa-mascarilla (Ambu) y reservorio a 15 L/min'
      };
      addLog('Vía Aérea', `💨 Oxigenoterapia instalada: ${labels[deviceId] || deviceId}.`, 'success');
      soundEngine.speak(`Oxígeno administrado con ${labels[deviceId]?.split('(')[0] || 'reservorio'}.`, 'system');
    } else {
      addLog('Vía Aérea', 'Oxígeno retirado. Paciente respirando a aire ambiental (FiO2 21%).', 'warning');
      soundEngine.speak('Oxígeno retirado. Paciente a aire ambiental.', 'system');
    }
  };

  const handleToggleOxygen = () => {
    if (oxygenDevice === 'none') {
      handleChangeOxygenDevice('reservoir');
    } else {
      handleChangeOxygenDevice('none');
    }
  };

  // Dedicated Start CPR
  const handleStartCpr = () => {
    if (phase === 'arrest') {
      setIsCprActive(true);
      soundEngine.startMetronome();
      addLog('Compresor', '▶️ Compresiones torácicas iniciadas (110 cpm, profundidad 5 cm, reexpansión torácica completa). Metrónomo activo.', 'success');
      soundEngine.speak('Iniciando compresiones torácicas a 110 por minuto.', 'system');
    } else {
      addLog('Líder', 'Paciente presenta pulso carotídeo palpable. No requiere compresiones torácicas.', 'warning');
    }
  };

  // Dedicated Stop CPR
  const handleStopCpr = () => {
    setIsCprActive(false);
    soundEngine.stopMetronome();
    addLog('Líder', '⏹️ Compresiones torácicas pausadas / detenidas.', 'info');
    soundEngine.speak('Compresiones torácicas pausadas.', 'system');
  };

  // Dedicated Check Pulse Only (Does NOT reveal rhythm!)
  const handleCheckPulseOnly = () => {
    if (phase === 'arrest') {
      if (cprCycleSeconds < 110 && isCprActive) {
        const err = 'Observación crítica: Interrumpió la RCP antes de completar los 2 minutos para chequear pulso. En ACLS las pausas deben ser mínimas (<10s) y sólo al término del ciclo de 2 min.';
        setCriticalErrors((prev) => [...prev, err]);
        addLog('Docente Evaluador', `⚠️ ${err}`, 'warning');
      }

      if (pulsePresent) {
        soundEngine.speak('Pulso carotídeo palpable presente.', 'system');
        addLog('Líder', '🩺 Examen de pulso: ¡PULSO CAROTÍDEO PALPABLE PRESENTE! Concordante.', 'success');
      } else {
        soundEngine.speak('No se palpa pulso carotídeo. Sin pulso.', 'system');
        addLog('Líder', '⚠️ Examen de pulso: NO SE PALPA PULSO CAROTÍDEO (Paciente sin pulso).', 'error');
      }

      // 2-min cycle reset
      if (cprCycleSeconds >= 115) {
        setCprCyclesCompleted((prev) => prev + 1);
        setCprCycleSeconds(0);
      }

      // Check RCE prerequisites:
      if (!isOxygenAdministered) {
        addLog('Docente Evaluador', '⚠️ Paciente sin oxigenoterapia ni ventilación adecuada. La hipoxia severa impide el Retorno de Circulación Espontánea.', 'warning');
        return;
      }

      if (currentCase.isShockable) {
        if (shockCount >= 2 && (adrenalineCount >= 1 || amiodaroneCount >= 1)) {
          triggerRCE();
        }
      } else {
        // STRICT REVERSIBLE CAUSE ENFORCEMENT: ONLY the true correct cause allows RCE!
        const isHypovolemiaCase = currentCase.hytCategory.toLowerCase().includes('hipovolemia');
        const correctTreated = treatedCauses.some((id) => {
          if (isHypovolemiaCase && id === 'hipovolemia') return true;
          if (currentCase.hytCategory.toLowerCase().includes('hiperkalemia') && id === 'hiperkalemia') return true;
          if (currentCase.hytCategory.toLowerCase().includes('neumot') && id === 'neumotorax') return true;
          if (currentCase.hytCategory.toLowerCase().includes('taponamiento') && id === 'taponamiento') return true;
          if (currentCase.hytCategory.toLowerCase().includes('tóxic') && id === 'toxicos') return true;
          if (currentCase.hytCategory.toLowerCase().includes('acidosis') && id === 'hidrogeniones') return true;
          if (currentCase.hytCategory.toLowerCase().includes('hipotermia') && id === 'hipotermia') return true;
          if (currentCase.hytCategory.toLowerCase().includes('trombosis pulmonar') && id === 'tep') return true;
          if (currentCase.hytCategory.toLowerCase().includes('trombosis coronaria') && id === 'iam') return true;
          return false;
        }) || (isHypovolemiaCase && hasGivenVolume && infusedVolumeMl >= 500);

        if (adrenalineCount >= 1 && correctTreated) {
          triggerRCE();
        } else if (!correctTreated) {
          addLog('Docente Evaluador', `⚠️ Ritmo no desfibrilable (${currentCase.arrestType}): La causa reversible tratada NO es la etiología primaria del paro (${currentCase.hytCategory}). Paciente continúa en paro cardiorrespiratorio. Revisa POCUS y Laboratorio.`, 'warning');
        } else if (adrenalineCount === 0) {
          addLog('Docente Evaluador', `⚠️ Causa reversible tratada, pero se requiere Adrenalina 1 mg IV precoz según algoritmo ACLS para lograr RCE en ritmo no desfibrilable (${currentCase.arrestType}).`, 'warning');
        }
      }
    } else {
      soundEngine.speak('Pulso carotídeo palpable presente.', 'system');
      addLog('Líder', '🩺 Examen de pulso: Pulso carotídeo PALPABLE presente.', 'info');
    }
  };

  // Treat 5 H and 5 T Cause
  const handleTreatHytCause = (cause) => {
    if (!treatedCauses.includes(cause.id)) {
      setTreatedCauses((prev) => [...prev, cause.id]);
    }
    setHasIdentifiedHyt(true);
    addLog('Equipo', `🔍 Tratamiento de causa reversible: ${cause.name} -> "${cause.actionText}" administrado.`, 'success');
    soundEngine.speak(`Causa tratada: ${cause.name}.`, 'system');

    // Dynamic Clinical Exam and Lab updates based on cause:
    const causeId = (cause.id || '').toLowerCase();
    if (causeId.includes('neumotorax') || causeId.includes('tension_pneumo')) {
      setDynamicExam((prev) => {
        const base = prev || currentCase.clinicalExam || {};
        return {
          ...base,
          physical: {
            ...(base.physical || {}),
            pulmonary: 'Murmullo pulmonar simétrico bilateral presente tras descompresión torácica con aguja / toracostomía.',
            pulmonaryUpdated: true
          },
          pocus: {
            ...(base.pocus || {}),
            lung: 'Deslizamiento pleural (lung sliding) presente y simétrico bilateral.',
            lungUpdated: true
          }
        };
      });
      addLog('Examen Clínico', '🩺 Murmullo pulmonar simétrico bilateral recuperado tras descompresión con aguja en 2° espacio intercostal.', 'success');
    } else if (causeId.includes('taponamiento') || causeId.includes('tamponade')) {
      setDynamicExam((prev) => {
        const base = prev || currentCase.clinicalExam || {};
        return {
          ...base,
          pocus: {
            ...(base.pocus || {}),
            cardiac: 'Eje subxifoideo: Resolución completa de derrame pericárdico tras pericardiocentesis evacuadora.',
            cardiacUpdated: true
          }
        };
      });
      addLog('POCUS', '🩺 Resolución completa de derrame pericárdico y colapso diastólico post-pericardiocentesis.', 'success');
    } else if (causeId.includes('hipoglicemia') || causeId.includes('glucose')) {
      setDynamicExam((prev) => {
        const base = prev || currentCase.clinicalExam || {};
        return {
          ...base,
          labs: {
            ...(base.labs || {}),
            glucose: 'HGT: 142 mg/dL (Normoglicemia alcanzada post-bolo glucosa al 50%).',
            glucoseUpdated: true
          }
        };
      });
      addLog('Laboratorio', '🧪 HGT de control: 142 mg/dL. Glucemia normalizada tras administración de dextrosa.', 'success');
    } else if (causeId.includes('hipotermia') || causeId.includes('hypothermia')) {
      setDynamicExam((prev) => {
        const base = prev || currentCase.clinicalExam || {};
        return {
          ...base,
          physical: {
            ...(base.physical || {}),
            temperature: '36.2 °C (Recalentamiento activo exitoso con mantas térmicas y fluidos calientes).',
            temperatureUpdated: true
          }
        };
      });
      setTemp(36.2);
      addLog('Control Vital', '🌡️ Temperatura central se eleva a 36.2 °C post-recalentamiento activo.', 'success');
    } else if (causeId.includes('hidrogeniones') || causeId.includes('acidosis')) {
      handleAdministerBicarbonate();
    } else if (causeId.includes('hiperkalemia')) {
      handleAdministerCalcium();
    }

    if (cause.isCorrectForCase) {
      addLog('ACLS', `🎯 ¡Causa causal del paro (${currentCase.hytCategory}) identificada y tratada correctamente!`, 'success');
    }
  };

  // Student Declares Rhythm Diagnosis
  const handleSelectRhythmDiagnosis = (opt) => {
    setStudentDiagnosedRhythm(opt);
    setHasDeclaredArrestRhythm(true);
    const isExact = opt.id === rhythm || opt.id === currentCase.arrestType || (currentCase.isShockable && opt.isShockable);

    if (isExact) {
      addLog('Estudiante', `🎯 Diagnóstico declarado: ${opt.name} — ¡CORRECTO! Reconocimiento certero del ritmo de paro.`, 'success');
      soundEngine.speak(`Diagnóstico correcto: ${opt.name}.`, 'system');
    } else {
      addLog('Estudiante', `🎯 Diagnóstico declarado: ${opt.name} — ⚠️ INCORRECTO. El monitor muestra ${rhythmName}. Clasifique adecuadamente si es ritmo desfibrilable o no desfibrilable.`, 'error');
      soundEngine.speak('Diagnóstico incorrecto. Revisa el osciloscopio.', 'system');
    }
  };

  // 1. Asignar Funciones del Líder en 1 Clic
  const handleAssignLeaderRoles = () => {
    setHasAssignedRoles(true);
    addLog('Líder del Equipo', '🎯 Asignación de roles completada: Reanimador 1 (Compresor principal a 110 cpm), Reanimador 2 (Vía aérea y ventilación con reservorio), Reanimador 3 (Desfibrilador/Monitor), Reanimador 4 (Acceso IV / Fármacos ACLS), Reanimador 5 (Registro de tiempos y ciclos). Circuito cerrado activo.', 'success');
    soundEngine.speak('Funciones del equipo asignadas. Iniciando comunicación en circuito cerrado.', 'system');
  };

  // 2. Adelantar +30s de RCP
  const handleAdvanceCprTime = () => {
    setCprCycleSeconds((prev) => {
      const next = prev + 30;
      if (next >= 120) {
        soundEngine.playAlarm(true);
        soundEngine.speak('Dos minutos de RCP completados. Evaluar pulso carotídeo y cambiar de compresor.', 'system');
        addLog('Monitor', '⏱️ ¡2 MINUTOS DE RCP COMPLETADOS! Evaluar pulso carotídeo (<10s) y cambiar de reanimador compresor.', 'warning');
      }
      return next;
    });
    setElapsedSeconds((prev) => prev + 30);
    if (isIntubating) {
      setIsIntubating(false);
      setIntubationTimer(0);
      setHasSecuredAirway(true);
      setAirwayStatus('Tubo Endotraqueal #8.0 a 22 cm fijado + Capnografía');
      addLog('Vía Aérea', '✅ ¡Intubación endotraqueal completada! Tubo #8.0 fijado a 22 cm. Capnografía conectada. Reanudar compresiones continuas.', 'success');
      soundEngine.speak('Intubación completada.', 'system');
    }
    addLog('Sistema', '⏩ Tiempo de reanimación avanzado en +30 segundos.', 'info');
  };

  // 3. Intubación Endotraqueal (Pausa realista de 30 segundos si está en PCR)
  const handleStartIntubation = () => {
    if (hasSecuredAirway) {
      addLog('Vía Aérea', 'El paciente ya cuenta con Tubo Endotraqueal fijado y capnografía conectada.', 'info');
      return;
    }
    if (isIntubating) return;
    setIsIntubating(true);
    setIntubationTimer(30);

    const isArrestOrCpr = phase === 'arrest' || isCprActive;
    if (isCprActive) {
      setIsCprActive(false);
      soundEngine.stopMetronome();
    }

    if (isArrestOrCpr) {
      addLog('Vía Aérea', '🩺 Procedimiento de Intubación Endotraqueal en paro: PAUSA DE COMPRESIONES (máximo 30 segundos permitidos según ACLS). Alineando ejes orofaríngeos, laringoscopía y paso de tubo endotraqueal #8.0 con fiador.', 'warning');
      soundEngine.speak('Pausa de compresiones para intubación orotraqueal.', 'system');
    } else {
      addLog('Vía Aérea', '🩺 Procedimiento de Intubación Endotraqueal en secuencia rápida: Paciente con pulso, preoxigenación adecuada, laringoscopía y paso de tubo #8.0 con fiador sin pausa de masaje.', 'info');
      soundEngine.speak('Iniciando intubación orotraqueal en secuencia rápida.', 'system');
    }
  };

  // 4. Administrar Fluidos IV (Ringer Lactato vs Suero Fisiológico con impacto hemodinámico y ATLS)
  const handleAdministerFluids = (volume = 500, fluidType = 'ringer') => {
    const newTotal = infusedVolumeMl + volume;
    setInfusedVolumeMl(newTotal);
    setHasGivenVolume(true);

    const fluidLabel = fluidType === 'ringer' ? 'Ringer Lactato' : 'Suero Fisiológico 0.9%';
    const caseText = (currentCase.title + ' ' + currentCase.hytCategory + ' ' + (currentCase.patient?.presentation || '')).toLowerCase();
    const isTraumaOrHypovolemic = caseText.includes('shock') ||
      caseText.includes('hemorragia') ||
      caseText.includes('trauma') ||
      caseText.includes('deshidratacion') ||
      caseText.includes('hipovolemia');
    const isNeuro = caseText.includes('neuro') || caseText.includes('tec') || caseText.includes('raquimedular');

    let outcomeLog = '';
    let efficacyBonus = 1.0;

    if (fluidType === 'ringer') {
      if (isTraumaOrHypovolemic) {
        efficacyBonus = 1.25;
        outcomeLog = '🌟 ¡Excelente elección ATLS!: Ringer Lactato es el cristaloide balanceado de 1ª línea para resucitación en shock/trauma. Previene acidosis hiperclorémica y protege la función renal.';
      } else if (isNeuro) {
        outcomeLog = 'Nota neurocrítica: Ringer Lactato administrado. En TEC/edema cerebral severo se prefiere SF 0.9% por mayor osmolaridad (308 mOsm/L vs 273 mOsm/L).';
      } else {
        outcomeLog = 'Cristaloide balanceado infundido con excelente tolerancia fisiológica.';
      }
    } else { // Suero Fisiológico 0.9%
      if (isTraumaOrHypovolemic && newTotal >= 1000) {
        efficacyBonus = 0.85;
        outcomeLog = '⚠️ Alerta ATLS: Grandes volúmenes de SF 0.9% (>1L) inducen acidosis metabólica hiperclorémica y vasoconstricción renal. En trauma y hemorragia la guía ATLS prioriza Ringer Lactato.';
      } else if (isNeuro) {
        efficacyBonus = 1.25;
        outcomeLog = '🌟 ¡Excelente elección en neurotrauma/TEC!: Suero Fisiológico 0.9% aporta 308 mOsm/L, previniendo el edema cerebral secundario.';
      } else {
        outcomeLog = 'Expansión de volumen con SF 0.9% completada.';
      }
    }

    let hemodynamicNote = '';
    if (pulsePresent) {
      const parts = bp.split('/');
      let sys = parseInt(parts[0], 10) || 80;
      let dia = parseInt(parts[1], 10) || 50;

      const isHypotensive = sys < 95;
      if (isHypotensive) {
        const sysRise = Math.round(Math.min(40, (volume / 500) * 16 * efficacyBonus));
        const diaRise = Math.round(Math.min(24, (volume / 500) * 10 * efficacyBonus));
        sys += sysRise;
        dia += diaRise;
        setBp(`${sys}/${dia}`);

        if (hr > 105) {
          const hrDrop = Math.round(Math.min(25, (volume / 500) * 12 * efficacyBonus));
          setHr((prev) => Math.max(75, prev - hrDrop));
        }
        setSpo2((prev) => Math.min(99, prev + 2));
        hemodynamicNote = `Respuesta hemodinámica: PA se eleva a ${sys}/${dia} mmHg (PAM ${Math.round((sys + 2*dia)/3)} mmHg).`;
      } else {
        hemodynamicNote = `PA estable en ${sys}/${dia} mmHg con adecuada volemia.`;
      }
    } else {
      hemodynamicNote = 'Aumento de precarga intravascular para optimizar presión de perfusión coronaria (PPC) durante compresiones.';
    }

    if (currentCase.hytCategory.toLowerCase().includes('hipovolemia')) {
      if (!treatedCauses.includes('hipovolemia')) {
        setTreatedCauses((prev) => [...prev, 'hipovolemia']);
      }
      setHasIdentifiedHyt(true);
      hemodynamicNote += ' ¡Causa reversible primaria (Hipovolemia) tratada!';
    }

    // Dynamic Clinical Exam response:
    setDynamicExam((prev) => {
      const base = prev || currentCase.clinicalExam || {};
      return {
        ...base,
        physical: {
          ...(base.physical || {}),
          perfusion: 'Llenado capilar < 2 segundos. Piel templada, pulsos periféricos palpables.',
          perfusionUpdated: true
        },
        pocus: {
          ...(base.pocus || {}),
          vci: 'Vena Cava Inferior de 18 mm con colapso respiratorio < 30% (Normovolemia restaurada post-fluidos).',
          vciUpdated: true
        }
      };
    });

    addLog('Fármacos y Fluidos', `💧 Infundido bolo de ${volume} ml de ${fluidLabel} IV. Total infundido: ${newTotal} ml. ${outcomeLog} ${hemodynamicNote}`, 'success');
    soundEngine.speak(`Bolo de ${volume} mililitros de ${fluidType === 'ringer' ? 'Ringer Lactato' : 'suero fisiológico'} administrado.`, 'system');
  };

  // 4b. Administrar Adrenalina con selección de dosis e infusión
  const handleAdministerAdrenaline = (dose = '1mg', isInfusion = false, rate = '2-10 mcg/min') => {
    if (isInfusion) {
      if (phase === 'arrest') {
        const err = 'Alerta de Dosis: En PCR la Adrenalina debe administrarse en BOLO IV rápido de 1 mg cada 3-5 minutos, no en infusión continua.';
        addLog('Docente Evaluador', `⚠️ ${err}`, 'warning');
        soundEngine.speak('En paro cardiorrespiratorio la adrenalina se administra en bolo, no en infusión.', 'system');
      } else if (phase === 'initial' && currentCase.type === 'bradicardia') {
        addLog('Fármacos', `💉 Iniciada infusión continua de Adrenalina a ${rate} IV (segunda línea según algoritmo AHA 2020 para bradicardia refractaria).`, 'success');
        setHr((prev) => Math.min(64, prev + 18));
        setBp('96/60');
        soundEngine.speak('Infusión continua de adrenalina iniciada a dos a diez microgramos por minuto.', 'system');
      } else if (phase === 'post_rce') {
        addLog('Fármacos', `💉 Iniciada infusión continua de Adrenalina a ${rate} IV para optimización hemodinámica posparo (soporte inotrópico/vasopresor).`, 'success');
        setBp('108/68');
        soundEngine.speak('Infusión de adrenalina iniciada para soporte posparo.', 'system');
      } else {
        addLog('Fármacos', `💉 Infusión continua de Adrenalina a ${rate} administrada.`, 'info');
      }
      return;
    }

    // Bolo IV
    if (phase === 'arrest') {
      setAdrenalineCount((prev) => prev + 1);
      if (dose === '1mg') {
        addLog('Fármacos', '💉 ¡Dosis Correcta ACLS!: Administrado Adrenalina 1 mg IV en bolo rápido con flush de 20 ml SF y elevación de extremidad.', 'success');
        soundEngine.speak('Adrenalina un miligramo intravenoso administrado en bolo.', 'system');
        if (currentCase.arrestType === 'AESP' || currentCase.arrestType === 'ASISTOLIA') {
          addLog('ACLS', 'Excelente: Adrenalina administrada de forma temprana en ritmo no desfibrilable (primeros minutos).', 'success');
        }
      } else if (dose === '0.5mg') {
        addLog('Docente Evaluador', '⚠️ Dosis Subóptima: Administró Adrenalina 0.5 mg. En PCR de adulto la dosis estándar según guías AHA es 1 mg IV cada 3-5 min.', 'warning');
        soundEngine.speak('Advertencia: Dosis subóptima de adrenalina administrada.', 'system');
      } else if (dose === '2mg') {
        addLog('Docente Evaluador', '⚠️ Dosis Excesiva: Administró Adrenalina 2 mg. Las dosis altas no están recomendadas de rutina por mayor toxicidad miocárdica y vasoconstricción cerebral.', 'warning');
        soundEngine.speak('Advertencia: Dosis alta de adrenalina administrada.', 'system');
      }
    } else {
      const err = 'Error Crítico: Administró bolo rápido de Adrenalina en paciente con pulso (riesgo severo de crisis hipertensiva, hemorragia o inducción de FV).';
      addCriticalError(err);
      soundEngine.speak('Error crítico: Adrenalina en bolo contraindicada con pulso.', 'system');
    }
  };

  // 4c. Administrar Atropina con selección de dosis
  const handleAdministerAtropine = (dose = '1mg') => {
    setHasGivenAtropine(true);
    if (phase === 'initial' && currentCase.type === 'bradicardia') {
      if (dose === '1mg') {
        addLog('Fármacos', '💉 ¡Dosis Correcta AHA 2020!: Administrado Atropina 1 mg IV en bolo rápido de primera línea.', 'success');
        setHr(48);
        setBp('84/52');
        addLog('Monitor', 'Frecuencia cardíaca aumenta a 48 lpm. Persiste bradicardia sintomática; preparar marcapasos o infusión si no mejora.', 'info');
        soundEngine.speak('Atropina un miligramo administrada. Respuesta parcial observada.', 'system');
      } else if (dose === '0.5mg') {
        addLog('Docente Evaluador', '⚠️ Advertencia de Dosis: Administró Atropina 0.5 mg. Las guías AHA 2020 actualizaron la dosis inicial de Atropina a 1 mg IV (dosis menores a 0.5 mg pueden provocar bradicardia paradójica por estimulación vagal central).', 'warning');
        setHr(42);
        soundEngine.speak('Dosis subóptima de atropina. Puede inducir bradicardia paradójica.', 'system');
      } else if (dose === '3mg') {
        addLog('Fármacos', '💉 Atropina 3 mg IV bolo administrada (dosis acumulada máxima permitida por algoritmo). Bloqueo vagal completo alcanzado.', 'info');
        setHr(50);
        soundEngine.speak('Dosis máxima acumulada de atropina administrada.', 'system');
      }
    } else if (phase === 'arrest') {
      const err = 'Error: La Atropina ya NO forma parte del algoritmo de PCR (AESP / Asistolia) según las guías ACLS de la AHA.';
      addCriticalError(err);
      soundEngine.speak('Error: Atropina no forma parte del algoritmo de paro.', 'system');
    } else {
      addLog('Docente Evaluador', '⚠️ Atropina no indicada: el paciente no presenta bradicardia sintomática.', 'warning');
    }
  };

  // 4d. Administrar Amiodarona con selección de dosis
  const handleAdministerAmiodarone = (dose = '300mg') => {
    if (phase === 'arrest' && currentCase.isShockable) {
      setAmiodaroneCount((prev) => prev + 1);
      if (dose === '300mg') {
        addLog('Fármacos', '💉 ¡Dosis Correcta ACLS!: Administrado Amiodarona 300 mg IV en bolo rápido para FV/TV refractaria (tras 3er choque).', 'success');
        soundEngine.speak('Amiodarona trescientos miligramos en bolo administrada.', 'system');
      } else if (dose === '150mg') {
        addLog('Fármacos', '💉 Administrado Amiodarona 150 mg IV en bolo rápido (segunda dosis ACLS tras 5° choque).', 'success');
        soundEngine.speak('Amiodarona ciento cincuenta miligramos administrada.', 'system');
      } else {
        addLog('Fármacos', `💉 Amiodarona ${dose} administrada.`, 'info');
      }
    } else if (phase === 'initial' && currentCase.type === 'taquicardia') {
      addLog('Fármacos', '💉 Infusión de Amiodarona 150 mg en 100 ml SG 5% a pasar en 10 minutos para taquiarritmia de complejo ancho estable.', 'success');
      soundEngine.speak('Infusión de amiodarona iniciada.', 'system');
    } else {
      addLog('Docente Evaluador', '⚠️ Amiodarona indicada principalmente en FV/TV sin pulso refractaria a descargas o taquicardia ventricular con pulso.', 'warning');
    }
  };

  // 4d2. Administrar Lidocaína (Alternativa oficial a Amiodarona en PCR según guías AHA)
  const handleAdministerLidocaine = (dose = '1.5 mg/kg') => {
    if (phase === 'arrest' && currentCase.isShockable) {
      setAmiodaroneCount((prev) => prev + 1); // Contabiliza como antiarrítmico válido para RCE en paro desfibrilable
      addLog('Fármacos', `💉 ¡Dosis Correcta ACLS!: Administrado Lidocaína ${dose} IV en bolo rápido (alternativa oficial a Amiodarona para FV/TV refractaria).`, 'success');
      soundEngine.speak('Lidocaína bolo intravenoso administrado.', 'system');
    } else if (phase === 'initial' && currentCase.type === 'taquicardia') {
      addLog('Fármacos', '💉 Bolo de Lidocaína 1 mg/kg IV administrado para taquicardia ventricular con pulso.', 'success');
      soundEngine.speak('Lidocaína administrada.', 'system');
    } else {
      addLog('Docente Evaluador', '⚠️ Lidocaína indicada como antiarrítmico en FV/TV sin pulso refractaria o TV con pulso.', 'warning');
    }
  };

  // 4e. Administrar Bicarbonato de Sodio 1 mEq/kg IV
  const handleAdministerBicarbonate = (dose = '1 mEq/kg') => {
    addLog('Fármacos', `🧪 Administrado Bicarbonato de Sodio (${dose} IV en bolo lento) con elevación de la extremidad.`, 'success');

    const isAcidosis = currentCase.hytCategory.toLowerCase().includes('hidrogeniones') ||
                       currentCase.hytCategory.toLowerCase().includes('acidosis') ||
                       (currentCase.clinicalExam?.labs?.gsa || '').includes('7.1') ||
                       (currentCase.clinicalExam?.labs?.gsa || '').includes('7.2');

    if (isAcidosis) {
      if (!treatedCauses.includes('hidrogeniones')) {
        setTreatedCauses((prev) => [...prev, 'hidrogeniones']);
      }
      setHasIdentifiedHyt(true);
      addLog('ACLS', '🎯 ¡Causa reversible primaria (Hidrogeniones / Acidosis metabólica severa) tratada exitosamente!', 'success');
    }

    setDynamicExam((prev) => {
      const base = prev || currentCase.clinicalExam || {};
      return {
        ...base,
        labs: {
          ...(base.labs || {}),
          gsa: 'pH 7.35 | pCO2 36 mmHg | pO2 88 mmHg | HCO3 22 mEq/L | EB -2 mEq/L | Lactato 2.1 mmol/L',
          gsaUpdated: true
        }
      };
    });

    addLog('Laboratorio', '🧪 [CONTROL GSA POST-BICARBONATO]: pH 7.35 | pCO2 36 | pO2 88 | HCO3 22 mEq/L | EB -2 | Lactato 2.1 mmol/L. ¡Corrección de acidosis metabólica!', 'success');
    soundEngine.speak('Bicarbonato de sodio administrado. Gasometría de control muestra resolución de la acidosis.', 'system');
  };

  // 4f. Administrar Gluconato de Calcio
  const handleAdministerCalcium = (dose = '1 g IV') => {
    addLog('Fármacos', `🛡️ Administrado Gluconato de Calcio 10% (${dose} IV en 2-5 min) para estabilización de membrana miocárdica.`, 'success');

    const isHyperkalemia = currentCase.hytCategory.toLowerCase().includes('hiperkalemia') ||
                          currentCase.hytCategory.toLowerCase().includes('potasio') ||
                          (currentCase.clinicalExam?.labs?.electrolytes || '').includes('K+ 6') ||
                          (currentCase.clinicalExam?.labs?.electrolytes || '').includes('K+ 7');

    if (isHyperkalemia) {
      if (!treatedCauses.includes('hiperkalemia')) {
        setTreatedCauses((prev) => [...prev, 'hiperkalemia']);
      }
      setHasIdentifiedHyt(true);
      addLog('ACLS', '🎯 ¡Causa reversible (Hiperkalemia) tratada!: Membrana miocárdica estabilizada.', 'success');
    }

    setDynamicExam((prev) => {
      const base = prev || currentCase.clinicalExam || {};
      return {
        ...base,
        labs: {
          ...(base.labs || {}),
          electrolytes: 'K+ 4.6 mEq/L | Na+ 139 mEq/L | Ca2+ iónico 1.22 mmol/L',
          electrolytesUpdated: true
        }
      };
    });

    addLog('Laboratorio', '🧪 [CONTROL ELECTROLITOS POST-CALCIO]: K+ 4.6 mEq/L | Ca2+ iónico 1.22 mmol/L | Na+ 139 mEq/L. Estabilización de membrana miocárdica exitosa.', 'success');
    soundEngine.speak('Gluconato de calcio administrado. Membrana miocárdica estabilizada.', 'system');
  };

  // 5. Evaluación Inteligente con IA
  const handleOpenAiEvaluation = async () => {
    addLog('Sistema', '🤖 Analizando desempeño del líder y equipo de reanimación con Inteligencia Artificial...', 'info');
    soundEngine.speak('Generando evaluación con Inteligencia Artificial de la pauta ACLS.', 'system');

    const baseEval = evaluateSession({
      actionsTaken,
      criticalErrors,
      phase,
      elapsedSeconds,
      cprCyclesCompleted,
      shockCount,
      adrenalineCount,
      amiodaroneCount,
      hasGivenAtropine,
      hasGivenVolume: hasGivenVolume || infusedVolumeMl > 0,
      hasIdentifiedHyt,
      has12Lead,
      hasTtm,
      hasCheckedBp,
      hasSecuredAirway,
      hasAssignedRoles,
      hasConnectedMonitor,
      hasIvAccess,
      hasGivenOxygen,
      hasAchievedRce,
      hasReferred,
      isShockable: currentCase.isShockable
    }, currentCase);

    try {
      const aiResult = await evaluateAclsSessionWithAI({
        apiKey: geminiApiKey,
        currentCase,
        eventLogs,
        actionsTaken,
        criticalErrors,
        simulationState: {
          hasAssignedRoles,
          hasSecuredAirway,
          has12Lead,
          isOxygenAdministered,
          hasGivenOxygen,
          hasGivenVolume: hasGivenVolume || infusedVolumeMl > 0,
          infusedVolumeMl,
          hasAchievedRce,
          cprCyclesCompleted,
          shockCount,
          adrenalineCount,
          amiodaroneCount,
          hasIdentifiedHyt,
          hasTtm,
          hasReferred
        }
      });

      if (aiResult) {
        setAiScorePreview(aiResult.grade ? `${aiResult.grade.toFixed(1)}/7.0` : null);
        baseEval.aiEvaluation = aiResult;
        if (aiResult.grade) baseEval.grade = aiResult.grade;
        if (aiResult.scorePercent) baseEval.scorePercent = aiResult.scorePercent;
        if (typeof aiResult.isPassed === 'boolean') baseEval.isPassed = aiResult.isPassed;
      }
    } catch (e) {
      console.warn('Error en evaluador AI:', e);
    }

    setEvaluationData(baseEval);
    setIsEvaluationOpen(true);
  };

  // Main Command Execution Handler
  const handleExecuteCommand = (rawCommand) => {
    const parsed = parseClinicalCommand(rawCommand);
    setActionsTaken((prev) => [...prev, { type: parsed.action, raw: rawCommand, timestamp: elapsedSeconds }]);

    switch (parsed.action) {
      case 'ASSIGN_ROLES':
        handleAssignLeaderRoles();
        break;

      case 'ADVANCE_CPR_TIME':
        handleAdvanceCprTime();
        break;

      case 'START_INTUBATION':
      case 'SECURE_AIRWAY':
        handleStartIntubation();
        break;

      case 'STOP_CPR':
        handleStopCpr();
        break;

      case 'GIVE_FLUIDS':
        handleAdministerFluids(parsed.volume || 500, parsed.fluidType || 'ringer');
        break;

      case 'START_CPR':
      case 'RESUME_CPR':
        handleStartCpr();
        break;

      case 'CHECK_PULSE_RHYTHM':
        handleCheckPulseOnly();
        break;

      case 'CHECK_CONSCIOUSNESS':
        if (phase === 'arrest' || !pulsePresent) {
          addLog('Líder', '🗣️ Estímulo verbal: "¡Hola! ¿Me escucha?" ➔ Paciente sin respuesta a estímulos verbales ni dolorosos (Inconsciente, Glasgow 3). ¡SIN PULSO!', 'error');
          soundEngine.speak('El paciente no responde. Sin pulso.', 'system');
        } else if (phase === 'post_rce' || phase === 'rce') {
          addLog('Líder', `🗣️ Evaluación neurológica post-paro: ${consciousness}`, 'info');
          soundEngine.speak(`Evaluación de conciencia: ${consciousness}`, 'system');
        } else {
          const resp = patientDialogue || 'Doctor, me siento muy mal y me falta el aire.';
          addLog('Líder', `🗣️ Interrogatorio clínico: "¡Hola! ¿Me escucha?" ➔ Paciente responde: "${resp}" (Consciente, orientado).`, 'success');
          soundEngine.speak(resp, 'patient', currentCase?.patient?.gender);
        }
        break;

      case 'CHECK_BLINK':
        if (phase === 'arrest' || !pulsePresent) {
          addLog('Líder', '👁️ Orden motora ocular: "Parpadee si me escucha" ➔ Párpados inmóviles, sin respuesta en paro.', 'error');
        } else {
          addLog('Líder', '👁️ Orden motora ocular: El paciente obedece y parpadea dos veces.', 'success');
          soundEngine.speak('El paciente obedece y parpadea dos veces.', 'system');
        }
        break;

      case 'CHECK_HAND_GRIP':
        if (phase === 'arrest' || !pulsePresent) {
          addLog('Líder', '🤝 Toma de mano: Mano flácida, tono muscular abolido, sin respuesta motora voluntaria (Glasgow M1).', 'error');
          soundEngine.speak('Mano flácida. Sin respuesta motora.', 'system');
        } else if (phase === 'post_rce') {
          addLog('Líder', '🤝 Maniobra de prensión: Paciente comatoso post-paro no obedece órdenes de prensión.', 'warning');
          soundEngine.speak('No obedece órdenes motoras.', 'system');
        } else {
          addLog('Líder', '🤝 Maniobra de prensión: Paciente aprieta la mano firmemente con fuerza simétrica 5/5 bilateral (Obedece órdenes motoras, Glasgow M6).', 'success');
          soundEngine.speak('El paciente aprieta tu mano firmemente.', 'system');
        }
        break;

      case 'CHECK_PUPILS':
        if (phase === 'arrest' || !pulsePresent) {
          addLog('Líder', '🔦 Exploración pupilar: MIDRIASIS BILATERAL ARREACTIVA (6.5 mm). Sin reflejo fotomotor.', 'error');
          soundEngine.speak('Midriasis bilateral arreactiva.', 'system');
        } else {
          addLog('Líder', '🔦 Exploración pupilar: Pupilas isocóricas y reactivas a la luz (3.5 mm a 1.5 mm). Reflejo fotomotor directo y consensual presente bilateral.', 'success');
          soundEngine.speak('Pupilas isocóricas y reactivas a la luz.', 'system');
        }
        break;

      case 'CHECK_PAIN_STIMULUS':
        if (phase === 'arrest' || !pulsePresent) {
          addLog('Líder', '⚡ Estímulo doloroso: Sin respuesta motora ni ocular (Glasgow 3).', 'error');
          soundEngine.speak('Sin respuesta al dolor.', 'system');
        } else if (phase === 'post_rce') {
          addLog('Líder', '⚡ Estímulo doloroso: Paciente emite quejido inespecífico y realiza retirada flexora al dolor.', 'warning');
          soundEngine.speak('Retirada inespecífica al dolor.', 'system');
        } else {
          addLog('Líder', '⚡ Estímulo doloroso: Paciente localiza inmediatamente y retira con molestia: "¡Ay doctor, me duele!".', 'info');
          soundEngine.speak('¡Ay doctor! Me duele.', 'patient', currentCase?.patient?.gender);
        }
        break;

      case 'START_PACER':
        handleTogglePacing();
        break;

      case 'GIVE_LIDOCAINE':
        handleAdministerLidocaine();
        break;

      case 'SYNC_CARDIOVERSION':
        setIsSync(true);
        setJoules(currentCase.type === 'taquicardia' ? 100 : 200);
        addLog('Líder', 'Indicada Cardioversión Sincronizada. Modo SYNC activado en monitor, sincronizando con espigas en la onda R. Seleccionando 100J.', 'info');
        handleStartCharge();
        break;

      case 'DEFIB_SHOCK':
        setIsSync(false);
        if (isCharged) {
          handleDeliverShock();
        } else {
          handleStartCharge();
        }
        break;

      case 'GIVE_ADRENALINE':
        handleAdministerAdrenaline(parsed.dose || '1mg', parsed.isInfusion || false, parsed.rate || '2-10 mcg/min');
        break;

      case 'GIVE_AMIODARONE':
        handleAdministerAmiodarone(parsed.dose || '300mg');
        break;

      case 'GIVE_ATROPINE':
        handleAdministerAtropine(parsed.dose || '1mg');
        break;

      case 'GIVE_ADENOSINA':
      case 'GIVE_ADENOSINE':
        if (phase === 'arrest') {
          const err = 'Error Crítico: Administró Adenosina a un paciente en Paro Cardiorrespiratorio.';
          addCriticalError(err);
        } else if (phase === 'initial' && currentCase.initialVitals.rhythm === 'TSVP') {
          addLog('Fármacos', 'Administrado Adenosina 6 mg IV en bolo rápido por acceso proximal con llave de tres pasos + 20 ml SF.', 'success');
          addLog('Monitor', 'Pausa transitoria en el trazado ECG...', 'info');
        } else {
          addLog('Fármacos', 'Adenosina no indicada para este ritmo.', 'warning');
        }
        break;

      case 'GIVE_CALCIUM':
        handleAdministerCalcium();
        break;

      case 'GIVE_BICARBONATE':
        handleAdministerBicarbonate();
        break;

      case 'GIVE_MAGNESIUM':
        addLog('Fármacos', 'Administrado Sulfato de Magnesio 2 g IV en infusión rápida.', 'success');
        if (currentCase.initialVitals.rhythm === 'TORSADES') {
          setHasIdentifiedHyt(true);
          addLog('ACLS', 'Sulfato de Magnesio administrado correctamente para Torsades de Pointes.', 'success');
        }
        break;

      case 'CONNECT_CAPNO':
        addLog('Monitor', 'Capnografía continua conectada. Curva alveolar visible en monitor.', 'info');
        break;

      case 'GIVE_OXYGEN':
        setHasGivenOxygen(true);
        addLog('Vía Aérea', 'Oxígeno administrado con mascarilla de no reinhalación con reservorio a 15 L/min (FiO2 ~100%).', 'success');
        break;

      case 'TAKE_BP':
        handleTriggerNibp();
        break;

      case 'ORDER_12_LEAD':
        setHas12Lead(true);
        setIs12LeadOpen(true);
        addLog('Equipo', 'ECG de 12 derivaciones adquirido y desplegado en pantalla.', 'info');
        checkSimulationCompletion(hasTtm, hasReferred, hasCheckedBp, true);
        break;

      case 'CONNECT_MONITOR':
        setHasConnectedMonitor(true);
        addLog('Equipo', 'Electrodos de monitorización y parches multifunción colocados en posición antero-lateral adecuada.', 'info');
        break;

      case 'PLACE_IV':
        setHasIvAccess(true);
        setIvStatus('Vía venosa periférica 18G en fosa antecubital permeable');
        addLog('Enfermería', 'Acceso vascular 18G comprobado permeable con solución fisiológica.', 'success');
        break;

      case 'TREAT_HYT':
        setHasIdentifiedHyt(true);
        addLog('Líder', `Líder verbaliza y busca activamente causas reversibles de paro (5 H y 5 T): ${currentCase.hytCategory}. Medidas correctivas en curso.`, 'success');
        break;

      case 'INITIATE_TTM':
        handleInitiateTtm(33);
        break;

      case 'REFER_PATIENT':
        handleReferPatient(parsed.destination || 'hemodinamia');
        break;

      case 'GIVE_VASOPRESSOR':
        addLog('Fármacos', 'Infusión de Noradrenalina iniciada para optimización hemodinámica con meta de PAM > 65 mmHg.', 'success');
        if (phase === 'post_rce') {
          setBp('108/65');
        }
        break;

      case 'REQUEST_LABS':
        addLog('Equipo', 'Muestras enviadas a laboratorio: Gases Arteriales (GSA), Troponinas ultrasensibles, Perfil bioquímico, Electrolitos plasmáticos y Lactato.', 'info');
        break;

      default:
        addLog('Líder', `Indicación verbalizada: "${rawCommand}". Equipo ejecuta la orden.`, 'info');
        break;
    }
  };

  // Open Full ACLS Evaluation Sheet
  const handleOpenEvaluation = () => {
    const evalResult = evaluateSession({
      actionsTaken,
      criticalErrors,
      phase,
      elapsedSeconds,
      cprCyclesCompleted,
      shockCount,
      adrenalineCount,
      amiodaroneCount,
      hasGivenAtropine,
      hasGivenVolume: hasGivenVolume || infusedVolumeMl > 0,
      hasIdentifiedHyt,
      has12Lead,
      hasTtm,
      hasCheckedBp,
      hasSecuredAirway,
      hasAssignedRoles,
      hasConnectedMonitor,
      hasIvAccess,
      hasGivenOxygen,
      hasAchievedRce,
      hasReferred,
      isShockable: currentCase.isShockable
    }, currentCase);

    setEvaluationData(evalResult);
    setIsEvaluationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* Top Navbar Colapsable */}
      <header className="bg-[#0A101E] border-b border-slate-800/90 select-none transition-all">
        {/* Barra Superior Compacta (Siempre Visible, ahorro máximo de espacio vertical) */}
        <div className="px-3 py-1.5 flex items-center justify-between gap-2 min-h-[36px]">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-cyan-600 to-blue-600 text-white p-1 rounded-lg shadow-sm flex items-center justify-center">
              <HeartPulse className="w-3.5 h-3.5 text-white animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                VITALS ACLS
              </span>
              <span className="hidden sm:inline bg-cyan-950/70 text-cyan-300 border border-cyan-800/50 text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold">
                SIMULADOR
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden md:inline truncate max-w-[200px]">
                | {currentCase.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Pauta de Cotejo y Nota EXCLUSIVAMENTE al final del caso */}
            {(isSimulationCompleted || phase === 'dead') && (
              <button
                onClick={handleOpenAiEvaluation}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md transition border animate-pulse ${
                  phase === 'dead'
                    ? 'bg-rose-900 hover:bg-rose-800 text-rose-100 border-rose-500'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-emerald-400/30'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{phase === 'dead' ? '💀 Ver Pauta' : '🏆 Pauta & Nota'}</span>
                {aiScorePreview && (
                  <span className="bg-slate-900/80 px-1 py-0.2 rounded text-[9px] text-yellow-300">
                    {aiScorePreview}
                  </span>
                )}
              </button>
            )}

            {/* Botón para desplegar / colapsar el menú de navegación */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold flex items-center gap-1.5 border transition ${
                isMenuOpen
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-600 shadow-sm'
                  : 'bg-[#131D31] hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Mostrar/Ocultar barra de herramientas y biblioteca de casos"
            >
              <Menu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px]">{isMenuOpen ? 'Ocultar Menú' : 'Menú Opciones'}</span>
              {isMenuOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Panel Colapsable de Herramientas y Casos (Sólo visible si el usuario lo selecciona) */}
        {isMenuOpen && (
          <div className="bg-[#0D1527] border-t border-slate-800/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2 animate-in slide-in-from-top-1 duration-150">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  const randomized = getRandomCase();
                  handleSelectCase(randomized);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-600/30 transition border border-amber-400/40"
                title="Sortear un caso ACLS aleatorio con variaciones fisiológicas"
              >
                <Dices className="w-3.5 h-3.5 animate-spin-hover" />
                Caso Aleatorio
              </button>

              <button
                onClick={() => setIsCaseSelectorOpen(true)}
                className="bg-[#131D31] hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition shadow"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Biblioteca ({ACLS_CASES.length})
              </button>

              <button
                onClick={() => resetSimulationState(currentCase)}
                className="bg-[#131D31] hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition shadow"
                title="Reiniciar el caso actual"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                Reiniciar
              </button>

              <button
                onClick={() => setIsApiKeyPromptOpen(true)}
                className="bg-[#131D31] hover:bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition shadow"
                title="Configurar clave API de Google Gemini (Opcional, incluye evaluador local 100% gratis)"
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="inline">Voz & IA</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                Taqui/Bradiarritmias &gt; PCR &gt; RCE &gt; Cuidados Posparo
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
                title="Ocultar menú para mayor espacio"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Patient Information & Clinical Situation Banner */}
      <PatientStatusPanel
        currentCase={currentCase}
        phase={phase}
        elapsedSeconds={elapsedSeconds}
        cprCycleSeconds={cprCycleSeconds}
        initialPhaseRemaining={Math.max(0, initialTimeLimit - elapsedSeconds)}
        isTimerPaused={isTimerPaused}
        announcement={announcement}
        patientDialogue={patientDialogue}
        consciousness={consciousness}
        airwayStatus={airwayStatus}
        ivStatus={ivStatus}
        oxygenDevice={oxygenDevice}
        isCprActive={isCprActive}
        pulsePresent={pulsePresent}
        onOpenEvaluation={handleOpenEvaluation}
        onForceArrest={triggerCardiacArrest}
        onTogglePauseTimer={() => setIsTimerPaused(p => !p)}
        onAddInitialTime={() => setInitialTimeLimit(p => p + 60)}
        onLogInteraction={addLog}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-3 flex flex-col gap-3">
        
        {/* Oscilloscope Monitor & Vital Signs Sidebar (SimCore Layout) */}
        <div className="bg-[#05080F] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[520px] md:h-[550px]">
          {/* Left: Dynamic 4-channel Canvas Oscilloscope */}
          <div className="flex-1 h-full min-h-[300px]">
            <MonitorCanvas
              rhythm={rhythm}
              hr={hr}
              spo2={spo2}
              etco2={etco2}
              isCprActive={isCprActive}
              isPacingActive={isPacingActive}
              pacerRate={pacerRate}
              isSync={isSync}
              isShockable={currentCase.isShockable}
              pulsePresent={pulsePresent}
              isAirwaySecured={hasSecuredAirway}
              onQRSBeat={handleQRSBeat}
            />
          </div>

          {/* Right: Numerical Vitals Panel */}
          <VitalSignsSidebar
            hr={hr}
            spo2={spo2}
            bp={bp}
            etco2={etco2}
            rr={rr}
            temp={temp}
            pulsePresent={pulsePresent}
            isCprActive={isCprActive}
            isNibpMeasuring={isNibpMeasuring}
            onTriggerNibp={handleTriggerNibp}
            rhythmName={rhythmName}
            oxygenDevice={oxygenDevice}
            onChangeOxygenDevice={handleChangeOxygenDevice}
            isAirwaySecured={hasSecuredAirway}
            phase={phase}
            hasDeclaredArrestRhythm={hasDeclaredArrestRhythm}
            studentDiagnosedRhythm={studentDiagnosedRhythm}
          />
        </div>

        {/* Defibrillator, Pacer & Monitor Controls Bar */}
        <DefibrillatorPanel
          joules={joules}
          onSelectJoules={setJoules}
          isSync={isSync}
          onToggleSync={() => setIsSync(!isSync)}
          isCharged={isCharged}
          isCharging={isCharging}
          onStartCharge={handleStartCharge}
          onDeliverShock={handleDeliverShock}
          isPacingActive={isPacingActive}
          pacerRate={pacerRate}
          pacerMa={pacerMa}
          onTogglePacing={handleTogglePacing}
          onChangePacerRate={setPacerRate}
          onChangePacerMa={setPacerMa}
          onOpen12Lead={() => setIs12LeadOpen(true)}
          isMuted={isMuted}
          onToggleMute={() => {
            const next = soundEngine.toggleMute();
            setIsMuted(next);
          }}
          isVoiceMuted={isVoiceMuted}
          onToggleVoice={() => {
            const next = soundEngine.toggleVoice();
            setIsVoiceMuted(next);
          }}
        />

        {/* Interactive Clinical Command Console & Event Timeline */}
        <CommandConsole
          onExecuteCommand={handleExecuteCommand}
          eventLogs={eventLogs}
          phase={phase}
          isCprActive={isCprActive}
          onStartCpr={handleStartCpr}
          onStopCpr={handleStopCpr}
          onAdvanceCprTime={handleAdvanceCprTime}
          onCheckPulseOnly={handleCheckPulseOnly}
          onOpenRhythmDiagnosis={() => setIsRhythmDiagnosisOpen(true)}
          onOpenHyt={() => setIsHytOpen(true)}
          onOpenClinicalExam={() => setIsClinicalExamOpen(true)}
          oxygenDevice={oxygenDevice}
          onChangeOxygenDevice={handleChangeOxygenDevice}
          onToggleOxygen={handleToggleOxygen}
          onAssignLeaderRoles={handleAssignLeaderRoles}
          hasAssignedRoles={hasAssignedRoles}
          onStartIntubation={handleStartIntubation}
          isIntubating={isIntubating}
          intubationTimer={intubationTimer}
          onAdministerFluids={handleAdministerFluids}
          infusedVolumeMl={infusedVolumeMl}
          onAdministerAdrenaline={handleAdministerAdrenaline}
          onAdministerAtropine={handleAdministerAtropine}
          onAdministerAmiodarone={handleAdministerAmiodarone}
          onOpenAiEvaluation={handleOpenAiEvaluation}
          aiScorePreview={aiScorePreview}
          hasTtm={hasTtm}
          onInitiateTtm={handleInitiateTtm}
          hasReferred={hasReferred}
          referralDestination={referralDestination}
          onReferPatient={handleReferPatient}
          hasCheckedBp={hasCheckedBp}
          onTriggerNibp={handleTriggerNibp}
          has12Lead={has12Lead}
          onOpen12Lead={() => {
            setIs12LeadOpen(true);
            setHas12Lead(true);
            checkSimulationCompletion(hasTtm, hasReferred, hasCheckedBp, true);
          }}
          isSimulationCompleted={isSimulationCompleted}
        />

      </main>

      {/* Modals */}
      <TwelveLeadModal
        isOpen={is12LeadOpen}
        onClose={() => setIs12LeadOpen(false)}
        currentCase={currentCase}
        phase={phase}
        rhythm={rhythm}
      />

      <EvaluationModal
        isOpen={isEvaluationOpen}
        onClose={() => setIsEvaluationOpen(false)}
        evaluationData={evaluationData}
        currentCase={currentCase}
        onRestartCase={() => resetSimulationState(currentCase)}
        onSelectNewCase={() => setIsCaseSelectorOpen(true)}
      />

      <CaseSelectorModal
        isOpen={isCaseSelectorOpen}
        onClose={() => setIsCaseSelectorOpen(false)}
        selectedCaseId={currentCase.id}
        onSelectCase={handleSelectCase}
      />

      <HytModal
        isOpen={isHytOpen}
        onClose={() => setIsHytOpen(false)}
        currentCase={currentCase}
        treatedCauses={treatedCauses}
        onTreatCause={handleTreatHytCause}
      />

      <RhythmDiagnosisModal
        isOpen={isRhythmDiagnosisOpen}
        onClose={() => setIsRhythmDiagnosisOpen(false)}
        currentRhythm={rhythm}
        rhythmName={rhythmName}
        onSelectDiagnosis={handleSelectRhythmDiagnosis}
      />

      <ClinicalExamModal
        isOpen={isClinicalExamOpen}
        onClose={() => setIsClinicalExamOpen(false)}
        currentCase={currentCase}
        dynamicExam={dynamicExam}
      />

      {/* Modal Configuración Voz Hiperrealista & API Key Gemini */}
      {isApiKeyPromptOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-cyan-500/50 rounded-2xl shadow-2xl max-w-lg w-full p-5 text-slate-100 font-mono space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Voz Hiperrealista & Configuración IA</h3>
              </div>
              <button
                onClick={() => setIsApiKeyPromptOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* SECCIÓN 1: MOTOR DE VOZ */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                  🔊 1. Motor de Voz del Paciente y Sistema
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/60 px-1.5 py-0.5 rounded font-bold">
                  {elevenLabsApiKey ? 'ElevenLabs AI' : 'Voz Neuronal Local'}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                El simulador incluye por defecto <strong>voces neuronales naturales en español</strong> integradas en tu sistema operativo (Edge Natural, Chrome Google, Apple Siri).
              </p>

              {/* Botones de Prueba Inmediata de Voz */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.speak(
                      currentCase?.patient?.gender === 'F'
                        ? '¡Doctor! Siento que el corazón se me sale del pecho y me falta el aire.'
                        : '¡Doctor! Siento una presión enorme en el pecho y me cuesta respirar.',
                      'patient',
                      currentCase?.patient?.gender
                    );
                  }}
                  className="p-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-600/70 text-cyan-200 text-xs flex items-center justify-center gap-1.5 font-bold transition shadow"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>▶ Probar Paciente</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.speak(
                      'Frecuencia cardíaca ciento sesenta por minuto. Presión arterial noventa sobre cincuenta.',
                      'system'
                    );
                  }}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs flex items-center justify-center gap-1.5 font-bold transition shadow"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>▶ Probar Monitor</span>
                </button>
              </div>

              {/* Opción ElevenLabs (Hiperrealismo Máximo) */}
              <div className="bg-[#070D18] p-3 rounded-xl border border-slate-800 text-[11px] space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-semibold">¿Quieres voces hiperrealistas con ElevenLabs?</span>
                  <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">10.000 car./mes gratis</span>
                </div>
                <p className="text-slate-400 leading-snug">
                  ElevenLabs genera inflexiones humanas, gemidos y respiraciones de angustia. Si tienes una API Key gratuita de ElevenLabs, ingrésala aquí:
                </p>
                <div>
                  <input
                    type="password"
                    value={elevenLabsApiKey}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      setElevenLabsApiKey(val);
                      soundEngine.setElevenLabsKey(val);
                    }}
                    placeholder="sk_... (ElevenLabs API Key)"
                    className="w-full bg-[#060A13] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* SECCIÓN 2: IA EVALUADORA (GEMINI) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                🤖 2. IA Evaluadora y Feedback
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                El motor local calcula tu nota automáticamente. Opcionalmente puedes conectar tu clave gratuita de Google AI Studio para un análisis clínico exhaustivo en lenguaje natural:
              </p>
              <div>
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => {
                    setGeminiApiKey(e.target.value);
                    localStorage.setItem('acls_gemini_api_key', e.target.value.trim());
                  }}
                  placeholder="AIzaSy... (Gemini API Key)"
                  className="w-full bg-[#060A13] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* BOTONES DE CIERRE */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setGeminiApiKey('');
                  setElevenLabsApiKey('');
                  soundEngine.setElevenLabsKey('');
                  localStorage.removeItem('acls_gemini_api_key');
                  setIsApiKeyPromptOpen(false);
                }}
                className="text-[11px] text-rose-400 hover:underline"
              >
                Restablecer a valores por defecto
              </button>
              <button
                onClick={() => setIsApiKeyPromptOpen(false)}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg transition"
              >
                Guardar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
