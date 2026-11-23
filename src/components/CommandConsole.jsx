import React, { useState, useRef, useEffect } from 'react';
import { Send, Activity, Zap, Radio, Syringe, Wind, ShieldAlert, Heart, CheckCircle2, Search, Play, Square, Sparkles, FastForward, UserCheck, Droplets, Stethoscope, Bot, Thermometer, Building2, Award } from 'lucide-react';

export default function CommandConsole({
  onExecuteCommand = () => {},
  eventLogs = [],
  phase = 'initial',
  isCprActive = false,
  onStartCpr = () => {},
  onStopCpr = () => {},
  onAdvanceCprTime = () => {},
  onCheckPulseOnly = () => {},
  onOpenRhythmDiagnosis = () => {},
  onOpenHyt = () => {},
  onOpenClinicalExam = () => {},
  oxygenDevice = 'none',
  onChangeOxygenDevice = () => {},
  onToggleOxygen = () => {},
  onAssignLeaderRoles = () => {},
  hasAssignedRoles = false,
  onStartIntubation = () => {},
  isIntubating = false,
  intubationTimer = 0,
  onAdministerFluids = () => {},
  infusedVolumeMl = 0,
  onAdministerAdrenaline = () => {},
  onAdministerAtropine = () => {},
  onAdministerAmiodarone = () => {},
  onOpenAiEvaluation = () => {},
  aiScorePreview = null,
  hasTtm = false,
  onInitiateTtm = () => {},
  hasReferred = false,
  referralDestination = null,
  onReferPatient = () => {},
  hasCheckedBp = false,
  onTriggerNibp = () => {},
  has12Lead = false,
  onOpen12Lead = () => {},
  isSimulationCompleted = false
}) {
  const [inputVal, setInputVal] = useState('');
  const [showFluidPicker, setShowFluidPicker] = useState(false);
  const [selectedFluidType, setSelectedFluidType] = useState('ringer'); // 'ringer' | 'saline'
  const [showO2Picker, setShowO2Picker] = useState(false);
  const [showReferMenu, setShowReferMenu] = useState(false);
  const [showTtmMenu, setShowTtmMenu] = useState(false);
  const [showAdrenalineMenu, setShowAdrenalineMenu] = useState(false);
  const [showAtropineMenu, setShowAtropineMenu] = useState(false);
  const [showAmiodaroneMenu, setShowAmiodaroneMenu] = useState(false);
  const [showOtherDrugsMenu, setShowOtherDrugsMenu] = useState(false);
  const [actionTab, setActionTab] = useState('all'); // 'all' | 'cpr' | 'drugs' | 'exam'
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [eventLogs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onExecuteCommand(trimmed);
    setInputVal('');
  };

  const handleAction = (cmd) => {
    onExecuteCommand(cmd);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="bg-[#0A101D] border border-slate-800 rounded-xl flex flex-col shadow-xl relative">
      

      
      {/* Intubation in progress countdown banner */}
      {isIntubating && (
        <div className="bg-amber-500/20 border-b border-amber-500/40 p-2.5 flex items-center justify-between text-amber-300 font-mono text-xs animate-pulse">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-amber-400" />
            <span className="font-bold">
              🩺 INTUBACIÓN OROTRAQUEAL EN PROCESO (
              {(isCprActive || phase === 'arrest')
                ? `Pausa de compresiones: ${intubationTimer}s restantes`
                : `Secuencia rápida: ${intubationTimer}s restantes`}
              )
            </span>
          </div>
          <span className="text-[11px] text-amber-200 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
            Alineando ejes y pasando tubo #8.0
          </span>
        </div>
      )}

      {/* Banner de Caso Finalizado (Completado con Éxito o Paciente Fallecido) */}
      {(isSimulationCompleted || phase === 'dead') && (
        <div className={`p-3 flex flex-wrap items-center justify-between text-white font-mono shadow-xl border-b animate-pulse ${
          phase === 'dead'
            ? 'bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 border-rose-500/60'
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 border-emerald-400/50'
        }`}>
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-yellow-300 fill-current shrink-0" />
            <div>
              <div className="text-sm font-bold flex items-center gap-1.5">
                {phase === 'dead' ? '💀 SIMULACIÓN FINALIZADA — PACIENTE FALLECIDO' : '🎉 ¡SIMULACIÓN ACLS COMPLETADA CON ÉXITO!'}
              </div>
              <div className="text-[11px] text-slate-200">
                {phase === 'dead'
                  ? 'La reanimación no tuvo éxito debido a errores críticos o paro irreversible. Revisa la pauta de cotejo para retroalimentación.'
                  : 'Has cumplido todos los pasos del algoritmo (Arritmia Inicial ➔ PCR ➔ RCE ➔ Cuidados Posparo: PA, ECG 12D, MET y Derivación).'}
              </div>
            </div>
          </div>
          <button
            onClick={onOpenAiEvaluation}
            className="mt-2 sm:mt-0 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-yellow-300 font-bold rounded-lg border border-yellow-400 shadow transition flex items-center gap-2 text-xs"
          >
            <Award className="w-4 h-4 text-yellow-400" />
            <span>VER PAUTA OFICIAL Y CALIFICACIÓN (1.0 - 7.0)</span>
          </button>
        </div>
      )}

      {/* 1. Barra de Acciones Críticas Rápidas (Organizada en módulos claros) */}
      <div className="bg-[#0E1626] p-2.5 border-b border-slate-800 space-y-2">
        
        {/* MÓDULO EXCLUSIVO CUIDADOS POSPARO (RCE) según Algoritmo ACLS 2020 */}
        {phase === 'post_rce' && (
          <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border border-emerald-500/60 rounded-xl p-2.5 flex flex-col gap-2 shadow-lg">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                CUIDADOS POSPARO ACLS 2020 (RCE CONFIRMADO):
              </span>
              <span className="text-slate-400 text-[10px]">
                {isSimulationCompleted ? '✅ ALGORITMO COMPLETO' : 'Completa los 4 pasos para finalizar'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {/* 1. Toma de PA */}
              <button
                onClick={onTriggerNibp}
                className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-0.5 transition ${
                  hasCheckedBp
                    ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
                title="Monitorear presión arterial cada 2-3 min (Meta PAS >90, PAM >65)"
              >
                <span className="font-bold">{hasCheckedBp ? '1. PA Tomada ✓' : '1. Tomar PA (NIBP)'}</span>
                <span className="text-[10px] text-slate-400">Meta PAM &gt; 65</span>
              </button>

              {/* 2. ECG 12 Derivaciones */}
              <button
                onClick={onOpen12Lead}
                className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-0.5 transition ${
                  has12Lead
                    ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
                title="ECG de 12 derivaciones para identificar STEMI o shock cardiogénico"
              >
                <span className="font-bold">{has12Lead ? '2. ECG 12D Listo ✓' : '2. ECG 12 Derivaciones'}</span>
                <span className="text-[10px] text-slate-400">Descartar STEMI</span>
              </button>

              {/* 3. Manejo Específico de la Temperatura (MET / TTM 32-36°C) */}
              <div className="relative">
                <button
                  onClick={() => setShowTtmMenu(!showTtmMenu)}
                  className={`w-full p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-0.5 transition ${
                    hasTtm
                      ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-sm shadow-cyan-500/30'
                      : 'bg-cyan-950/40 border-cyan-700 hover:bg-cyan-900/60 text-cyan-200'
                  }`}
                  title="Manejo Específico de la Temperatura (MET 32-36 °C x 24h) en paciente comatoso"
                >
                  <span className="font-bold flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                    {hasTtm ? '3. MET Activo: 33°C ✓' : '3. Iniciar MET (32-36°C)'}
                  </span>
                  <span className="text-[10px] text-cyan-300">Neuroprotección 24h</span>
                </button>

                {showTtmMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" 
                      onClick={() => setShowTtmMenu(false)}
                    />
                    <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#0F172A] border-2 border-cyan-400 rounded-xl shadow-2xl p-2.5 z-50 flex flex-col gap-1.5 text-xs font-mono animate-in fade-in duration-150">
                      <div className="text-[11px] text-cyan-300 font-bold px-1 py-1 border-b border-slate-700 flex items-center justify-between">
                        <span>❄️ Meta Térmica MET / TTM:</span>
                        <span className="text-[10px] text-slate-400 font-normal">24h continuo</span>
                      </div>
                      {[
                        { temp: 33, desc: 'Neuroprotección estándar (32-34 °C)' },
                        { temp: 34, desc: 'Rango intermedio neuroprotector' },
                        { temp: 36, desc: 'Prevención estricta de fiebre (36 °C)' }
                      ].map((item) => (
                        <button
                          key={item.temp}
                          onClick={() => {
                            onInitiateTtm(item.temp);
                            setShowTtmMenu(false);
                          }}
                          className="p-2 rounded-lg text-left hover:bg-cyan-900/60 bg-slate-900/80 border border-slate-700 hover:border-cyan-500 text-slate-200 flex flex-col transition"
                        >
                          <span className="font-bold text-cyan-300">❄️ Enfriamiento activo a {item.temp} °C</span>
                          <span className="text-[10px] text-slate-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* 4. Derivación a Hemodinamia o UCI */}
              <div className="relative">
                <button
                  onClick={() => setShowReferMenu(!showReferMenu)}
                  className={`w-full p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-0.5 transition ${
                    hasReferred
                      ? 'bg-indigo-950/90 border-indigo-400 text-indigo-200 shadow-sm shadow-indigo-500/30'
                      : 'bg-indigo-950/40 border-indigo-700 hover:bg-indigo-900/60 text-indigo-200'
                  }`}
                  title="Derivación definitiva según hallazgos: Hemodinamia para ICP inmediata o UCI"
                >
                  <span className="font-bold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    {hasReferred ? `4. Derivado: ${referralDestination === 'hemodinamia' ? 'Hemodinamia' : 'UCI'} ✓` : '4. Derivación a... ▼'}
                  </span>
                  <span className="text-[10px] text-indigo-300">ICP / UCI Cuidados Críticos</span>
                </button>

                {showReferMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" 
                      onClick={() => setShowReferMenu(false)}
                    />
                    <div className="absolute top-full right-0 mt-1.5 w-72 bg-[#0F172A] border-2 border-indigo-400 rounded-xl shadow-2xl p-2.5 z-50 flex flex-col gap-1.5 text-xs font-mono animate-in fade-in duration-150">
                      <div className="text-[11px] text-indigo-300 font-bold px-1 py-1 border-b border-slate-700">
                        🏥 Seleccionar Destino de Derivación:
                      </div>
                      <button
                        onClick={() => {
                          onReferPatient('hemodinamia');
                          setShowReferMenu(false);
                        }}
                        className="p-2 rounded-lg text-left hover:bg-indigo-950/80 bg-slate-900/80 border border-slate-700 hover:border-indigo-400 text-slate-200 flex flex-col transition"
                      >
                        <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-cyan-400" />
                          Hemodinamia (ICP de emergencia)
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          Indicado si ECG muestra STEMI o alta sospecha de oclusión coronaria
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          onReferPatient('uci');
                          setShowReferMenu(false);
                        }}
                        className="p-2 rounded-lg text-left hover:bg-indigo-950/80 bg-slate-900/80 border border-slate-700 hover:border-indigo-400 text-slate-200 flex flex-col transition"
                      >
                        <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                          UCI / Unidad de Paciente Crítico
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          Monitorización invasiva, soporte multiorgánico y neuroprotección
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Acciones Clínicas ACLS
            </span>
            {/* Filtro de Categorías sin quitar botones */}
            <div className="flex items-center gap-1 bg-[#070C16] p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
              <button
                onClick={() => setActionTab('all')}
                className={`px-2 py-0.5 rounded transition ${
                  actionTab === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Todas (15)
              </button>
              <button
                onClick={() => setActionTab('cpr')}
                className={`px-2 py-0.5 rounded transition ${
                  actionTab === 'cpr'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🫀 RCP & Vía Aérea (6)
              </button>
              <button
                onClick={() => setActionTab('drugs')}
                className={`px-2 py-0.5 rounded transition ${
                  actionTab === 'drugs'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                💉 Fármacos (6)
              </button>
              <button
                onClick={() => setActionTab('exam')}
                className={`px-2 py-0.5 rounded transition ${
                  actionTab === 'exam'
                    ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⚡ Diagnóstico & Causas (3)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {infusedVolumeMl > 0 && (
              <span className="text-[10px] text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-700/50 font-mono">
                💧 SF: {infusedVolumeMl} ml infundidos
              </span>
            )}
            <span className="text-[10px] text-slate-400 font-mono">
              {phase === 'arrest' ? '🔴 PARO ACTIVO' : phase === 'post_rce' ? '🟢 POSPARO (RCE)' : '🟡 ARRITMIA INICIAL'}
            </span>
          </div>
        </div>

        {/* Fila 1: Liderazgo, Evaluación de Pulso, RCP, Avance rápido y Vía Aérea */}
        {(actionTab === 'all' || actionTab === 'cpr') && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
            
            {/* 1. Asignar Funciones del Líder (1 solo botón) */}
            <button
              onClick={onAssignLeaderRoles}
              className={`p-2 rounded-lg active:scale-95 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm border ${
                hasAssignedRoles
                  ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
                  : 'bg-indigo-950/70 hover:bg-indigo-900 border-indigo-700/60 text-indigo-200'
              }`}
              title="1-clic: Asignar todas las funciones del equipo de reanimación (Compresor, Vía aérea, Monitor, Fármacos)"
            >
              <UserCheck className={`w-4 h-4 ${hasAssignedRoles ? 'text-emerald-400' : 'text-indigo-400'}`} />
              <span className="text-xs font-bold font-mono">
                {hasAssignedRoles ? 'Roles Asignados ✓' : 'Asignar Funciones'}
              </span>
              <span className="text-[9px] text-indigo-300/80 font-mono">Líder del Equipo</span>
            </button>

            {/* 2. Evaluar SOLO PULSO */}
            <button
              onClick={onCheckPulseOnly}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 transition flex flex-col items-center justify-center text-center gap-0.5 group shadow-sm"
              title="Evaluar presencia de pulso carotídeo en <10s sin revelar ritmo"
            >
              <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
              <span className="text-xs font-bold font-mono">Chequear Pulso</span>
              <span className="text-[9px] text-emerald-400/90 font-mono">Solo Pulso (&lt;10s)</span>
            </button>

            {/* 3. Iniciar o Detener Compresiones */}
            {!isCprActive ? (
              <button
                onClick={onStartCpr}
                className="p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500 text-emerald-200 active:scale-95 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                title="Iniciar compresiones torácicas a 110 cpm"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-current" />
                <span className="text-xs font-bold font-mono">Iniciar RCP</span>
                <span className="text-[9px] text-emerald-400/90 font-mono">110 cpm (Metrónomo)</span>
              </button>
            ) : (
              <button
                onClick={onStopCpr}
                className="p-2 rounded-lg bg-rose-950/90 hover:bg-rose-900 border border-rose-500 text-rose-200 active:scale-95 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm animate-pulse"
                title="Pausar compresiones torácicas"
              >
                <Square className="w-4 h-4 text-rose-400 fill-current" />
                <span className="text-xs font-bold font-mono">Pausar RCP</span>
                <span className="text-[9px] text-rose-300 font-mono">Detener Masaje</span>
              </button>
            )}

            {/* 4. Adelantar 30s de RCP (Botón directo) */}
            <button
              onClick={onAdvanceCprTime}
              className="p-2 rounded-lg bg-blue-950/70 hover:bg-blue-900/90 active:scale-95 text-blue-200 border border-blue-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
              title="Avanzar 30 segundos del ciclo de RCP para no esperar en tiempo real"
            >
              <FastForward className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold font-mono">Adelantar +30s</span>
              <span className="text-[9px] text-blue-300/90 font-mono">Avanzar Ciclo RCP</span>
            </button>

            {/* 5. Intubación Endotraqueal (TET) - 30s de pausa realista solo en paro */}
            <button
              onClick={onStartIntubation}
              disabled={isIntubating}
              className="p-2 rounded-lg bg-teal-950/70 hover:bg-teal-900/90 disabled:opacity-50 active:scale-95 text-teal-200 border border-teal-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
              title={(isCprActive || phase === 'arrest') ? "Intubación orotraqueal: pausa de compresiones de 30 segundos" : "Intubación orotraqueal en secuencia rápida (paciente con pulso, sin pausa de compresiones)"}
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold font-mono">Intubar TET</span>
              <span className="text-[9px] text-teal-300/90 font-mono">
                {(isCprActive || phase === 'arrest') ? 'Pausa 30s RCP' : 'Secuencia Rápida'}
              </span>
            </button>

            {/* 6. Declarar Ritmo */}
            <button
              onClick={onOpenRhythmDiagnosis}
              className="p-2 rounded-lg bg-purple-950/70 hover:bg-purple-900/90 active:scale-95 text-purple-200 border border-purple-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
              title="Declarar el ritmo que estás viendo en el monitor"
            >
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold font-mono">Declarar Ritmo</span>
              <span className="text-[9px] text-purple-300/90 font-mono">Diagnóstico</span>
            </button>

          </div>
        )}

        {/* Fila 2: Terapéutica y Diagnóstico */}
        {(actionTab === 'all' || actionTab === 'drugs' || actionTab === 'exam') && (
          <div className={
            actionTab === 'drugs'
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 pt-1"
              : actionTab === 'exam'
              ? "grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1"
              : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1.5 pt-1"
          }>
            
            {/* BLOQUE FÁRMACOS (1 a 6) */}
            {(actionTab === 'all' || actionTab === 'drugs') && (
              <>
                {/* 1. Fluidos IV ATLS con selector de tipo (Ringer Lactato vs SF) y volumen */}
                <div>
                  <button
                    onClick={() => {
                      setShowFluidPicker(true);
                      setShowO2Picker(false);
                      setShowAdrenalineMenu(false);
                      setShowAtropineMenu(false);
                      setShowAmiodaroneMenu(false);
                      setShowOtherDrugsMenu(false);
                    }}
                    className="w-full p-2 rounded-lg bg-sky-950/70 hover:bg-sky-900/90 active:scale-95 text-sky-200 border border-sky-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                    title="Administrar cristaloides IV: Selección entre Ringer Lactato (ATLS) y Suero Fisiológico 0.9%"
                  >
                    <Droplets className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold font-mono">Fluidos IV</span>
                    <span className="text-[9px] text-sky-300/80 font-mono">
                      {selectedFluidType === 'ringer' ? 'Ringer (ATLS)' : 'SF 0.9%'} ▼
                    </span>
                  </button>
                </div>

                {/* 2. Administrar Oxígeno con Selector de Dispositivo */}
                <div>
                  <button
                    onClick={() => {
                      setShowO2Picker(true);
                      setShowFluidPicker(false);
                      setShowAdrenalineMenu(false);
                      setShowAtropineMenu(false);
                      setShowAmiodaroneMenu(false);
                      setShowOtherDrugsMenu(false);
                    }}
                    className={`w-full p-2 rounded-lg active:scale-95 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm border ${
                      oxygenDevice !== 'none'
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                    title="Cambiar dispositivo de oxigenoterapia (Cánula, Venturi, Reservorio 15L, BVM)"
                  >
                    <Wind className={`w-4 h-4 ${oxygenDevice !== 'none' ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold font-mono">
                      {oxygenDevice === 'none' ? 'Oxígeno (OFF)' : 'Oxígeno (ON)'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">Dispositivo ▼</span>
                  </button>
                </div>

                {/* 3. Adrenalina con Selector de Dosis e Infusión */}
                <div>
                  <button
                    onClick={() => {
                      setShowAdrenalineMenu(true);
                      setShowFluidPicker(false);
                      setShowO2Picker(false);
                      setShowAtropineMenu(false);
                      setShowAmiodaroneMenu(false);
                      setShowOtherDrugsMenu(false);
                    }}
                    className="w-full p-2 rounded-lg bg-amber-950/70 hover:bg-amber-900/90 active:scale-95 text-amber-200 border border-amber-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                    title="Adrenalina: Seleccionar bolo (1mg estándar, 0.5mg, 2mg) o infusión continua (2-10 mcg/min)"
                  >
                    <Syringe className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold font-mono">Adrenalina</span>
                    <span className="text-[9px] text-amber-400/80 font-mono">Dosis ▼</span>
                  </button>
                </div>

                {/* 4. Atropina con Selector de Dosis AHA 2020 */}
                <div>
                  <button
                    onClick={() => {
                      setShowAtropineMenu(true);
                      setShowFluidPicker(false);
                      setShowO2Picker(false);
                      setShowAdrenalineMenu(false);
                      setShowAmiodaroneMenu(false);
                      setShowOtherDrugsMenu(false);
                    }}
                    className="w-full p-2 rounded-lg bg-teal-950/70 hover:bg-teal-900/90 active:scale-95 text-teal-200 border border-teal-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                    title="Atropina: Primera línea en bradicardia sintomática (AHA 2020 recomienda dosis inicial de 1mg)"
                  >
                    <Syringe className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold font-mono">Atropina</span>
                    <span className="text-[9px] text-teal-400/80 font-mono">Dosis AHA ▼</span>
                  </button>
                </div>

                {/* 5. Amiodarona con Selector de Dosis ACLS */}
                <div>
                  <button
                    onClick={() => {
                      setShowAmiodaroneMenu(true);
                      setShowFluidPicker(false);
                      setShowO2Picker(false);
                      setShowAdrenalineMenu(false);
                      setShowAtropineMenu(false);
                      setShowOtherDrugsMenu(false);
                    }}
                    className="w-full p-2 rounded-lg bg-purple-950/70 hover:bg-purple-900/90 active:scale-95 text-purple-200 border border-purple-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                    title="Amiodarona: 300mg tras 3er choque, 150mg tras 5° choque, o infusión"
                  >
                    <Syringe className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold font-mono">Amiodarona</span>
                    <span className="text-[9px] text-purple-400/80 font-mono">Dosis ▼</span>
                  </button>
                </div>

                {/* 6. Otros Fármacos ACLS (Adenosina, Magnesio, Noradrenalina, Calcio, Bicarbonato) */}
                <div>
                  <button
                    onClick={() => {
                      setShowOtherDrugsMenu(true);
                      setShowFluidPicker(false);
                      setShowO2Picker(false);
                      setShowAdrenalineMenu(false);
                      setShowAtropineMenu(false);
                      setShowAmiodaroneMenu(false);
                    }}
                    className="w-full p-2 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/90 active:scale-95 text-indigo-200 border border-indigo-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                    title="Otros fármacos: Adenosina (TSV), Sulfato de Magnesio (Torsades), Noradrenalina, Calcio, Bicarbonato"
                  >
                    <Syringe className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold font-mono">Otros Fármacos</span>
                    <span className="text-[9px] text-indigo-400/80 font-mono">ACLS / H y T ▼</span>
                  </button>
                </div>
              </>
            )}

            {/* BLOQUE DIAGNÓSTICO Y EXAMEN (7 a 10) */}
            {(actionTab === 'all' || actionTab === 'exam') && (
              <>
                {/* 7. Desfibrilar 200J */}
                <button
                  onClick={() => handleAction('Despejar área y aplicar descarga de desfibrilación 200J')}
                  className="p-2 rounded-lg bg-red-950/70 hover:bg-red-900/90 active:scale-95 text-red-200 border border-red-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                  title="Para FV o TV sin pulso: Descarga de 200J bifásica sincronizada o asincrónica"
                >
                  <Zap className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold font-mono">Desfibrilar</span>
                  <span className="text-[9px] text-red-400/80 font-mono">200J (FV/TVSP)</span>
                </button>

                {/* 8. Examen Físico, POCUS y Laboratorio (Claves 5H y 5T) */}
                <button
                  onClick={onOpenClinicalExam}
                  className="p-2 rounded-lg bg-teal-950/70 hover:bg-teal-900/90 active:scale-95 text-teal-200 border border-teal-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                  title="Ver examen físico, ultrasonido POCUS en paro y gases/laboratorio para identificar causas reversibles"
                >
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-bold font-mono">POCUS y Labs</span>
                  <span className="text-[9px] text-teal-300/80 font-mono">Hallazgos Clave</span>
                </button>

                {/* 9. Investigar y Tratar Causas 5H y 5T */}
                <button
                  onClick={onOpenHyt}
                  className="p-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 active:scale-95 text-amber-200 border border-amber-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                  title="Investigar y tratar causas reversibles (las 5 H y 5 T)"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold font-mono">Tratar 5H/5T</span>
                  <span className="text-[9px] text-amber-400/90 font-mono">Tratamientos</span>
                </button>

                {/* 10. Hemoglucotest (HGT) */}
                <button
                  onClick={() => handleAction('Medir hemoglucotest capilar rápido (HGT)')}
                  className="p-2 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/90 active:scale-95 text-cyan-200 border border-cyan-700/60 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
                  title="Punción capilar para medición inmediata de glicemia (descarta hipoglicemia como causa reversible)"
                >
                  <span className="text-sm">🩸</span>
                  <span className="text-xs font-bold font-mono">Medir HGT</span>
                  <span className="text-[9px] text-cyan-400/80 font-mono">Glucemia</span>
                </button>
              </>
            )}

          </div>
        )}
      </div>

      {/* 2. Bitácora de Eventos (Limpia y legible) */}
      <div ref={scrollRef} className="h-44 p-3 overflow-y-auto space-y-1.5 font-mono text-xs bg-[#070C16] border-b border-slate-800/80">
        {eventLogs.length === 0 ? (
          <div className="text-slate-500 text-center py-6 text-xs italic">
            El caso está en marcha. Pulsa una acción rápida superior o escribe cualquier orden abajo.
          </div>
        ) : (
          eventLogs.map((log, idx) => (
            <div
              key={idx}
              className={`py-1 px-2.5 rounded flex items-start gap-2 border text-[11px] ${
                log.type === 'error'
                  ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                  : log.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : log.type === 'warning'
                  ? 'bg-amber-950/40 border-amber-800 text-amber-300'
                  : 'bg-[#0E1626]/60 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-slate-500 font-bold shrink-0">
                [{log.time}]
              </span>
              <div className="flex-1">
                <span className="font-semibold mr-1.5 text-cyan-400">
                  {log.actor}:
                </span>
                <span>{log.message}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 3. Formulario de escritura libre */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-[#0A101E] flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Escribe libremente cualquier indicación médica (ej: 'atropina 1mg', 'cardioversión sincronizada', 'intubar tet 7.5', 'ttm 36 grados')..."
          className="flex-1 bg-[#060A13] border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 font-mono font-bold text-xs rounded-lg transition flex items-center gap-1.5 shadow"
        >
          <Send className="w-3.5 h-3.5" />
          Enviar
        </button>
      </form>

      {/* =========================================================================
          MODALES CENTRADOS ACCESIBLES (Fluidos, O2, Adrenalina, Atropina, Amiodarona, Otros)
          100% accesibles en cualquier pantalla sin corte inferior ni superior
          ========================================================================= */}

      {/* 1. Modal Fluidos IV (ATLS) */}
      {showFluidPicker && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowFluidPicker(false)}
        >
          <div 
            className="bg-[#0F172A] border-2 border-sky-500 rounded-2xl shadow-2xl max-w-md w-full flex flex-col max-h-[85vh] overflow-hidden text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-sky-950/80 border-b border-sky-800/60 flex items-center justify-between text-sky-200">
              <span className="font-bold flex items-center gap-2 text-sm">
                <Droplets className="w-4 h-4 text-sky-400" />
                Fluidos Intravenosos (ATLS)
              </span>
              <button
                onClick={() => setShowFluidPicker(false)}
                className="w-7 h-7 rounded-lg hover:bg-sky-900 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3.5 overflow-y-auto">
              <div>
                <label className="text-[11px] text-sky-300 font-bold block mb-1.5">
                  1. SELECCIONAR TIPO DE CRISTALOIDE:
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedFluidType('ringer')}
                    className={`py-2 px-3 text-xs rounded-lg font-bold transition text-center ${
                      selectedFluidType === 'ringer'
                        ? 'bg-sky-600 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    Ringer Lactato
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFluidType('saline')}
                    className={`py-2 px-3 text-xs rounded-lg font-bold transition text-center ${
                      selectedFluidType === 'saline'
                        ? 'bg-sky-600 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    SF 0.9%
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 px-1">
                  {selectedFluidType === 'ringer'
                    ? '💡 Ringer Lactato: Solución balanceada de 1ª elección en trauma/shock según ATLS (menor acidosis hiperclorémica).'
                    : '💡 Suero Fisiológico 0.9%: Solución isotónica de uso general (preferida en TEC o hiperpotasemia).'}
                </p>
              </div>

              <div>
                <label className="text-[11px] text-sky-300 font-bold block mb-1.5">
                  2. SELECCIONAR VOLUMEN DEL BOLO:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[250, 500, 1000, 2000].map((ml) => (
                    <button
                      key={ml}
                      onClick={() => {
                        onAdministerFluids(ml, selectedFluidType);
                        setShowFluidPicker(false);
                      }}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-sky-950 border border-slate-700 hover:border-sky-500 text-slate-200 flex flex-col justify-between transition group active:scale-95"
                    >
                      <span className="font-bold text-sm text-sky-300 group-hover:text-sky-200">
                        💧 {ml} ml
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {selectedFluidType === 'ringer' ? 'Ringer Lactato' : 'Suero Fisiológico'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowFluidPicker(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Oxigenoterapia */}
      {showO2Picker && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowO2Picker(false)}
        >
          <div 
            className="bg-[#0F172A] border-2 border-cyan-500 rounded-2xl shadow-2xl max-w-md w-full flex flex-col max-h-[85vh] overflow-hidden text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-cyan-950/80 border-b border-cyan-800/60 flex items-center justify-between text-cyan-200">
              <span className="font-bold flex items-center gap-2 text-sm">
                <Wind className="w-4 h-4 text-cyan-400" />
                Oxigenoterapia y Dispositivos de Vía Aérea
              </span>
              <button
                onClick={() => setShowO2Picker(false)}
                className="w-7 h-7 rounded-lg hover:bg-cyan-900 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto">
              {[
                { id: 'none', label: 'Aire Ambiental', sub: 'FiO2 21% (Sin oxígeno suplementario)' },
                { id: 'nasal_cannula', label: 'Cánula Nasal 3 L/min', sub: 'FiO2 ~32% (Hipoxemia leve)' },
                { id: 'venturi', label: 'Mascarilla Venturi 50%', sub: 'FiO2 fija 50% con flujo alto' },
                { id: 'reservoir', label: 'Mascarilla con Reservorio 15 L/min', sub: 'FiO2 ~100% (Estándar ACLS para paciente inestable)' },
                { id: 'bvm', label: 'Bolsa-Mascarilla con Reservorio (BVM)', sub: 'FiO2 100% (Ventilación a presión positiva en paro)' }
              ].map((dev) => (
                <button
                  key={dev.id}
                  onClick={() => {
                    onChangeOxygenDevice(dev.id);
                    setShowO2Picker(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                    oxygenDevice === dev.id
                      ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-md'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-cyan-300">{dev.label}</span>
                    <span className="text-[10px] text-slate-400">{dev.sub}</span>
                  </div>
                  {oxygenDevice === dev.id && (
                    <span className="text-cyan-400 font-bold text-xs bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500">
                      Activo ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowO2Picker(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Adrenalina */}
      {showAdrenalineMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowAdrenalineMenu(false)}
        >
          <div 
            className="bg-[#0F172A] border-2 border-amber-500 rounded-2xl shadow-2xl max-w-lg w-full flex flex-col max-h-[85vh] overflow-hidden text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-amber-950/80 border-b border-amber-800/60 flex items-center justify-between text-amber-200">
              <span className="font-bold flex items-center gap-2 text-sm">
                <Syringe className="w-4 h-4 text-amber-400" />
                Adrenalina — Selección de Dosis ACLS
              </span>
              <button
                onClick={() => setShowAdrenalineMenu(false)}
                className="w-7 h-7 rounded-lg hover:bg-amber-900 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2.5 overflow-y-auto">
              <div className="text-[11px] text-amber-300 font-bold px-1">
                DOSIS EN BOLO INTRAVENOSO (PCR):
              </div>
              <button
                onClick={() => {
                  onAdministerAdrenaline('1mg', false);
                  setShowAdrenalineMenu(false);
                }}
                className="w-full p-3 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border-2 border-amber-500 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                    ⚡ Adrenalina 1 mg IV Bolo
                    <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                      ESTÁNDAR ACLS
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    Indicada en PCR cada 3-5 minutos con flush de 20 ml SF y elevación de extremidad.
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  onAdministerAdrenaline('0.5mg', false);
                  setShowAdrenalineMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-left transition flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-300">⚠️ Adrenalina 0.5 mg IV Bolo</span>
                  <span className="text-[10px] text-slate-400 block">Dosis subterapéutica para paro cardíaco en adulto.</span>
                </div>
              </button>

              <button
                onClick={() => {
                  onAdministerAdrenaline('2mg', false);
                  setShowAdrenalineMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-left transition flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-300">⚠️ Adrenalina 2 mg IV Bolo</span>
                  <span className="text-[10px] text-slate-400 block">Dosis alta (desaconsejada por toxicidad miocárdica).</span>
                </div>
              </button>

              <div className="text-[11px] text-amber-300 font-bold px-1 pt-2 border-t border-slate-800">
                INFUSIÓN CONTINUA (BRADICARDIA / POS-RCE):
              </div>
              <button
                onClick={() => {
                  onAdministerAdrenaline(null, true, '2-10 mcg/min');
                  setShowAdrenalineMenu(false);
                }}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-amber-950/60 border border-amber-600/50 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                    💧 Infusión Continua: 2-10 mcg/min IV
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    2ª línea en bradicardia sintomática refractaria a atropina o soporte vasopresor posparo.
                  </span>
                </div>
              </button>
            </div>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowAdrenalineMenu(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Atropina */}
      {showAtropineMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowAtropineMenu(false)}
        >
          <div 
            className="bg-[#0F172A] border-2 border-teal-500 rounded-2xl shadow-2xl max-w-lg w-full flex flex-col max-h-[85vh] overflow-hidden text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-teal-950/80 border-b border-teal-800/60 flex items-center justify-between text-teal-200">
              <span className="font-bold flex items-center gap-2 text-sm">
                <Syringe className="w-4 h-4 text-teal-400" />
                Atropina — Dosis Guías AHA 2020
              </span>
              <button
                onClick={() => setShowAtropineMenu(false)}
                className="w-7 h-7 rounded-lg hover:bg-teal-900 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2.5 overflow-y-auto">
              <div className="text-[11px] text-teal-300 font-bold px-1">
                SELECCIÓN DE DOSIS PARA BRADICARDIA SINTOMÁTICA:
              </div>
              <button
                onClick={() => {
                  onAdministerAtropine('1mg');
                  setShowAtropineMenu(false);
                }}
                className="w-full p-3 rounded-xl bg-teal-950/60 hover:bg-teal-900/80 border-2 border-teal-400 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm text-teal-300 flex items-center gap-1.5">
                    🌟 Atropina 1 mg IV Bolo
                    <span className="text-[10px] bg-teal-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                      RECOMENDADA AHA 2020
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    Dosis inicial de 1ª línea para bradicardia sintomática. Puede repetirse cada 3-5 min hasta máx 3 mg.
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  onAdministerAtropine('0.5mg');
                  setShowAtropineMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-left transition flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-300">⚠️ Atropina 0.5 mg IV Bolo</span>
                  <span className="text-[10px] text-slate-400 block">
                    Dosis antigua (actualizada en 2020 a 1 mg; dosis &lt;0.5 mg arriesgan bradicardia paradójica).
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  onAdministerAtropine('3mg');
                  setShowAtropineMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-left transition flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-300">🛑 Atropina 3 mg IV Bolo</span>
                  <span className="text-[10px] text-slate-400 block">
                    Dosis máxima acumulada (produce bloqueo vagal total).
                  </span>
                </div>
              </button>
            </div>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowAtropineMenu(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Amiodarona */}
      {showAmiodaroneMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowAmiodaroneMenu(false)}
        >
          <div 
            className="bg-[#0F172A] border-2 border-purple-500 rounded-2xl shadow-2xl max-w-lg w-full flex flex-col max-h-[85vh] overflow-hidden text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-purple-950/80 border-b border-purple-800/60 flex items-center justify-between text-purple-200">
              <span className="font-bold flex items-center gap-2 text-sm">
                <Syringe className="w-4 h-4 text-purple-400" />
                Amiodarona — Selección de Dosis ACLS
              </span>
              <button
                onClick={() => setShowAmiodaroneMenu(false)}
                className="w-7 h-7 rounded-lg hover:bg-purple-900 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2.5 overflow-y-auto">
              <div className="text-[11px] text-purple-300 font-bold px-1">
                DOSIS EN PARO CARDIORRESPIRATORIO (FV / TVSP REFRACTARIA):
              </div>
              <button
                onClick={() => {
                  onAdministerAmiodarone('300mg');
                  setShowAmiodaroneMenu(false);
                }}
                className="w-full p-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border-2 border-purple-400 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
                    ⚡ Amiodarona 300 mg IV Bolo
                    <span className="text-[10px] bg-purple-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                      1ª DOSIS PCR
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    Indicada tras el 3er choque de desfibrilación en FV / TV sin pulso refractaria.
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  onAdministerAmiodarone('150mg');
                  setShowAmiodaroneMenu(false);
                }}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-purple-950/60 border border-purple-500/60 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
                    ⚡ Amiodarona 150 mg IV Bolo
                    <span className="text-[10px] bg-purple-700 text-purple-100 px-2 py-0.5 rounded-full font-bold">
                      2ª DOSIS PCR
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    Indicada tras el 5° choque de desfibrilación si persiste FV / TVSP.
                  </span>
                </div>
              </button>

              <div className="text-[11px] text-purple-300 font-bold px-1 pt-2 border-t border-slate-800">
                INFUSIÓN EN PACIENTE CON PULSO (TV MONOMORFA ESTABLE):
              </div>
              <button
                onClick={() => {
                  onAdministerAmiodarone('150mg-infusion');
                  setShowAmiodaroneMenu(false);
                }}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-purple-950/60 border border-slate-700 hover:border-purple-500 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
                    💧 Amiodarona 150 mg IV en 10 min
                  </div>
                  <span className="text-[11px] text-slate-300 block mt-0.5">
                    Diluida en 100 ml SG 5% para taquicardia ventricular con pulso estable.
                  </span>
                </div>
              </button>
            </div>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowAmiodaroneMenu(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Otros Fármacos ACLS (Adenosina, Magnesio, Noradrenalina, Calcio, Bicarbonato) */}
      {showOtherDrugsMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowOtherDrugsMenu(false)}
        >
          <div 
            className="bg-[#0F172A] border-2 border-indigo-500 rounded-2xl shadow-2xl max-w-lg w-full flex flex-col max-h-[85vh] overflow-hidden text-xs font-mono animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-indigo-950/80 border-b border-indigo-800/60 flex items-center justify-between text-indigo-200">
              <span className="font-bold flex items-center gap-2 text-sm">
                <Syringe className="w-4 h-4 text-indigo-400" />
                Fármacos Específicos ACLS / Causas 5H y 5T
              </span>
              <button
                onClick={() => setShowOtherDrugsMenu(false)}
                className="w-7 h-7 rounded-lg hover:bg-indigo-900 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2.5 overflow-y-auto">
              <button
                onClick={() => {
                  handleAction('Administrar Adenosina 6 mg IV en bolo ultra rápido con flush de 20 ml SF');
                  setShowOtherDrugsMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-400 text-left transition flex flex-col"
              >
                <div className="flex items-center justify-between text-indigo-300 font-bold text-sm">
                  <span>⚡ Adenosina 6 mg IV Bolo Rápido</span>
                  <span className="text-[10px] text-slate-400 font-normal">1ª Dosis TSV</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-0.5">
                  Taquicardia Supraventricular paroxística + flush 20 ml SF inmediato y elevación de brazo.
                </span>
              </button>

              <button
                onClick={() => {
                  handleAction('Administrar Adenosina 12 mg IV en bolo ultra rápido con flush de 20 ml SF');
                  setShowOtherDrugsMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-400 text-left transition flex flex-col"
              >
                <div className="flex items-center justify-between text-indigo-300 font-bold text-sm">
                  <span>⚡ Adenosina 12 mg IV Bolo Rápido</span>
                  <span className="text-[10px] text-slate-400 font-normal">2ª Dosis TSV</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-0.5">
                  Segunda dosis si la TSV no revierte tras 1-2 minutos de la primera dosis.
                </span>
              </button>

              <button
                onClick={() => {
                  handleAction('Administrar Sulfato de Magnesio 2 g IV en bolo lento');
                  setShowOtherDrugsMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-400 text-left transition flex flex-col"
              >
                <div className="flex items-center justify-between text-indigo-300 font-bold text-sm">
                  <span>⚡ Sulfato de Magnesio 2 g IV</span>
                  <span className="text-[10px] text-amber-400 font-normal">Torsades</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-0.5">
                  Tratamiento de elección para Torsades de Pointes, intervalo QT prolongado o Hipomagnesemia.
                </span>
              </button>

              <button
                onClick={() => {
                  handleAction('Iniciar infusión continua de Noradrenalina a 0.2 mcg/kg/min');
                  setShowOtherDrugsMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-400 text-left transition flex flex-col"
              >
                <div className="flex items-center justify-between text-indigo-300 font-bold text-sm">
                  <span>💧 Noradrenalina 0.1 - 0.5 mcg/kg/min</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Shock Pos-RCE</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-0.5">
                  Vasopresor de 1ª elección en hipotensión / shock posparo para mantener PAM &gt; 65 mmHg.
                </span>
              </button>

              <button
                onClick={() => {
                  handleAction('Administrar Gluconato de Calcio 1 g IV al 10% lento en 3 minutos');
                  setShowOtherDrugsMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-400 text-left transition flex flex-col"
              >
                <div className="flex items-center justify-between text-indigo-300 font-bold text-sm">
                  <span>🛡️ Gluconato de Calcio 1 g IV (10%)</span>
                  <span className="text-[10px] text-rose-400 font-normal">Hiperpotasemia</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-0.5">
                  Estabilizador inmediato de la membrana miocárdica en hiperpotasemia severa o toxicidad por calcioantagonistas.
                </span>
              </button>

              <button
                onClick={() => {
                  handleAction('Administrar Bicarbonato de Sodio 1 mEq/kg IV');
                  setShowOtherDrugsMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-400 text-left transition flex flex-col"
              >
                <div className="flex items-center justify-between text-indigo-300 font-bold text-sm">
                  <span>🧪 Bicarbonato de Sodio 1 mEq/kg IV</span>
                  <span className="text-[10px] text-cyan-400 font-normal">Acidosis / 5H</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-0.5">
                  Acidosis metabólica severa preexistente, hiperpotasemia o intoxicación por antidepresivos tricíclicos.
                </span>
              </button>

              <button
                onClick={() => {
                  handleAction('Administrar Suero Glucosado al 50% IV en bolo (25 g Dextrosa)');
                  setShowOtherDrugsMenu(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-400 text-left transition flex flex-col"
              >
                <div className="flex items-center justify-between text-indigo-300 font-bold text-sm">
                  <span>🩸 Glucosa al 50% IV (25 g Dextrosa Bolo)</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Hipoglicemia / 5H</span>
                </div>
                <span className="text-[10px] text-slate-300 mt-0.5">
                  Corrección rápida de hipoglicemia aguda severa (&lt; 70 mg/dL) o coma hipoglicémico.
                </span>
              </button>
            </div>
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowOtherDrugsMenu(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
