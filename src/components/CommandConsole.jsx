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
    <div className="bg-[#0A101D] border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-xl">
      
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

      {/* Banner de Simulación Completada (Todos los pasos del algoritmo ACLS realizados) */}
      {isSimulationCompleted && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-3 flex flex-wrap items-center justify-between text-white font-mono shadow-xl border-b border-emerald-400/50 animate-pulse">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-yellow-300 fill-current shrink-0" />
            <div>
              <div className="text-sm font-bold flex items-center gap-1.5">
                🎉 ¡SIMULACIÓN ACLS COMPLETADA CON ÉXITO!
              </div>
              <div className="text-[11px] text-emerald-100">
                Has cumplido todos los pasos del algoritmo (Arritmia Inicial ➔ PCR ➔ RCE ➔ Cuidados Posparo: PA, ECG 12D, MET y Derivación).
              </div>
            </div>
          </div>
          <button
            onClick={onOpenAiEvaluation}
            className="mt-2 sm:mt-0 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold rounded-lg border border-emerald-400 shadow transition flex items-center gap-2 text-xs"
          >
            <Award className="w-4 h-4 text-emerald-400" />
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

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Acciones Críticas ACLS — Control Clínico Directo
          </span>
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

        {/* Fila 2: Terapéutica (Fluidos ATLS, Oxígeno, Fármacos con dosis ACLS, Desfibrilador, POCUS, Causas 5H/5T, IA Evaluadora) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-1.5 pt-1">
          
          {/* 1. Fluidos IV ATLS con selector de tipo (Ringer Lactato vs SF) y volumen */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFluidPicker(!showFluidPicker);
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

            {/* Menú desplegable de Fluidos */}
            {showFluidPicker && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0F172A] border border-sky-600/70 rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1.5 text-xs font-mono">
                <div className="text-[10px] text-sky-400 font-bold px-1 py-0.5 border-b border-slate-700 flex items-center justify-between">
                  <span>TIPO DE CRISTALOIDE:</span>
                  <span className="text-[9px] text-slate-400">ATLS / ACLS</span>
                </div>
                
                {/* Selector Ringer vs SF */}
                <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedFluidType('ringer')}
                    className={`py-1 text-[10px] rounded font-bold transition ${
                      selectedFluidType === 'ringer'
                        ? 'bg-sky-600 text-slate-950'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Ringer Lactato
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFluidType('saline')}
                    className={`py-1 text-[10px] rounded font-bold transition ${
                      selectedFluidType === 'saline'
                        ? 'bg-sky-600 text-slate-950'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    SF 0.9%
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 px-1">
                  {selectedFluidType === 'ringer' 
                    ? '💡 Balanceado (ATLS 1ª línea para shock y trauma)' 
                    : '💡 Mayor osmolaridad (preferido en TEC / neuro)'}
                </div>

                <div className="text-[10px] text-sky-300 font-bold px-1 pt-1 border-t border-slate-800">
                  SELECCIONAR VOLUMEN BOLO:
                </div>
                {[250, 500, 1000, 2000].map((ml) => (
                  <button
                    key={ml}
                    onClick={() => {
                      onAdministerFluids(ml, selectedFluidType);
                      setShowFluidPicker(false);
                    }}
                    className="p-1.5 rounded hover:bg-sky-900/60 text-left text-slate-200 flex items-center justify-between"
                  >
                    <span>💧 {ml} ml {selectedFluidType === 'ringer' ? 'RL' : 'SF'}</span>
                    <span className="text-[10px] text-sky-400 font-bold">Infundir</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Administrar Oxígeno con Selector de Dispositivo */}
          <div className="relative">
            <button
              onClick={() => {
                setShowO2Picker(!showO2Picker);
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

            {/* Menú de dispositivos de oxígeno */}
            {showO2Picker && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-[#0F172A] border border-cyan-500/60 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 text-xs font-mono">
                <div className="text-[10px] text-cyan-400 font-bold px-1 py-0.5 border-b border-slate-700">
                  Seleccionar Oxigenoterapia:
                </div>
                {[
                  { id: 'none', label: 'Aire Ambiental', sub: 'FiO2 21%' },
                  { id: 'nasal_cannula', label: 'Cánula Nasal 3L', sub: 'FiO2 32%' },
                  { id: 'venturi', label: 'Masc. Venturi 50%', sub: 'FiO2 50%' },
                  { id: 'reservoir', label: 'Reservorio 15 L/min', sub: 'FiO2 100% (ACLS)' },
                  { id: 'bvm', label: 'Bolsa-Mascarilla (Ambu)', sub: 'FiO2 100%' }
                ].map((dev) => (
                  <button
                    key={dev.id}
                    onClick={() => {
                      onChangeOxygenDevice(dev.id);
                      setShowO2Picker(false);
                    }}
                    className={`p-1.5 rounded text-left flex items-center justify-between transition ${
                      oxygenDevice === dev.id ? 'bg-cyan-900/60 text-cyan-200 font-bold' : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{dev.label}</span>
                    <span className="text-[10px] text-slate-400">{dev.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Adrenalina con Selector de Dosis e Infusión */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAdrenalineMenu(!showAdrenalineMenu);
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

            {/* Menú de Dosis de Adrenalina */}
            {showAdrenalineMenu && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0F172A] border border-amber-500/70 rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-xs font-mono">
                <div className="text-[10px] text-amber-400 font-bold px-1 py-0.5 border-b border-slate-700">
                  DOSIS ADRENALINA ACLS:
                </div>
                <button
                  onClick={() => {
                    onAdministerAdrenaline('1mg', false);
                    setShowAdrenalineMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-amber-950/80 text-left text-slate-200 flex flex-col border border-amber-600/40"
                >
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>⚡ 1 mg IV Bolo</span>
                    <span className="text-[9px] bg-amber-900/60 px-1 rounded text-amber-200">ACLS Paro</span>
                  </div>
                  <span className="text-[9px] text-slate-400">Estándar c/3-5 min + flush 20ml</span>
                </button>
                <button
                  onClick={() => {
                    onAdministerAdrenaline('0.5mg', false);
                    setShowAdrenalineMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-slate-800 text-left text-slate-300 flex flex-col"
                >
                  <span className="font-semibold">⚠️ 0.5 mg IV Bolo</span>
                  <span className="text-[9px] text-slate-400">Subterapéutico en paro adulto</span>
                </button>
                <button
                  onClick={() => {
                    onAdministerAdrenaline('2mg', false);
                    setShowAdrenalineMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-slate-800 text-left text-slate-300 flex flex-col"
                >
                  <span className="font-semibold">⚠️ 2 mg IV Bolo</span>
                  <span className="text-[9px] text-slate-400">Dosis alta (desaconsejada)</span>
                </button>
                <div className="text-[10px] text-amber-400 font-bold px-1 pt-1 border-t border-slate-800">
                  INFUSIÓN CONTINUA:
                </div>
                <button
                  onClick={() => {
                    onAdministerAdrenaline(null, true, '2-10 mcg/min');
                    setShowAdrenalineMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-amber-950/80 text-left text-slate-200 flex flex-col border border-amber-500/30"
                >
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>💧 Infusión 2-10 mcg/min</span>
                  </div>
                  <span className="text-[9px] text-slate-400">Bradicardia refractaria / Pos-RCE</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. Atropina con Selector de Dosis AHA 2020 */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAtropineMenu(!showAtropineMenu);
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

            {/* Menú de Dosis de Atropina */}
            {showAtropineMenu && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0F172A] border border-teal-500/70 rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-xs font-mono">
                <div className="text-[10px] text-teal-400 font-bold px-1 py-0.5 border-b border-slate-700">
                  DOSIS ATROPINA (AHA 2020):
                </div>
                <button
                  onClick={() => {
                    onAdministerAtropine('1mg');
                    setShowAtropineMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-teal-950/80 text-left text-slate-200 flex flex-col border border-teal-500/40"
                >
                  <div className="flex items-center justify-between text-teal-300 font-bold">
                    <span>🌟 1 mg IV Bolo</span>
                    <span className="text-[9px] bg-teal-900/60 px-1 rounded text-teal-200">AHA 2020</span>
                  </div>
                  <span className="text-[9px] text-slate-400">Dosis inicial de 1ª línea para bradicardia</span>
                </button>
                <button
                  onClick={() => {
                    onAdministerAtropine('0.5mg');
                    setShowAtropineMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-slate-800 text-left text-slate-300 flex flex-col"
                >
                  <span className="font-semibold">⚠️ 0.5 mg IV Bolo</span>
                  <span className="text-[9px] text-slate-400">Dosis previa (riesgo bradicardia paradójica)</span>
                </button>
                <button
                  onClick={() => {
                    onAdministerAtropine('3mg');
                    setShowAtropineMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-slate-800 text-left text-slate-300 flex flex-col"
                >
                  <span className="font-semibold">🛑 3 mg IV Bolo</span>
                  <span className="text-[9px] text-slate-400">Dosis máxima acumulada (bloqueo total)</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. Amiodarona con Selector de Dosis ACLS */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAmiodaroneMenu(!showAmiodaroneMenu);
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

            {/* Menú de Dosis de Amiodarona */}
            {showAmiodaroneMenu && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0F172A] border border-purple-500/70 rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-xs font-mono">
                <div className="text-[10px] text-purple-400 font-bold px-1 py-0.5 border-b border-slate-700">
                  DOSIS AMIODARONA ACLS:
                </div>
                <button
                  onClick={() => {
                    onAdministerAmiodarone('300mg');
                    setShowAmiodaroneMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-purple-950/80 text-left text-slate-200 flex flex-col border border-purple-500/40"
                >
                  <div className="flex items-center justify-between text-purple-300 font-bold">
                    <span>⚡ 300 mg IV Bolo</span>
                    <span className="text-[9px] bg-purple-900/60 px-1 rounded text-purple-200">1ª Dosis Paro</span>
                  </div>
                  <span className="text-[9px] text-slate-400">FV / TV sin pulso tras 3er choque</span>
                </button>
                <button
                  onClick={() => {
                    onAdministerAmiodarone('150mg');
                    setShowAmiodaroneMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-purple-950/80 text-left text-slate-200 flex flex-col border border-purple-600/30"
                >
                  <div className="flex items-center justify-between text-purple-300 font-bold">
                    <span>⚡ 150 mg IV Bolo</span>
                    <span className="text-[9px] bg-purple-900/60 px-1 rounded text-purple-200">2ª Dosis Paro</span>
                  </div>
                  <span className="text-[9px] text-slate-400">FV / TV refractaria tras 5° choque</span>
                </button>
                <button
                  onClick={() => {
                    onAdministerAmiodarone('150mg-infusion');
                    setShowAmiodaroneMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-slate-800 text-left text-slate-300 flex flex-col"
                >
                  <span className="font-semibold">💧 150 mg en 10 min</span>
                  <span className="text-[9px] text-slate-400">TV con pulso / taquicardia estable</span>
                </button>
              </div>
            )}
          </div>

          {/* 6. Otros Fármacos ACLS (Adenosina, Magnesio, Noradrenalina, Calcio, Bicarbonato) */}
          <div className="relative">
            <button
              onClick={() => {
                setShowOtherDrugsMenu(!showOtherDrugsMenu);
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

            {/* Menú de Otros Fármacos */}
            {showOtherDrugsMenu && (
              <div className="absolute top-full right-0 sm:left-0 mt-1 w-64 bg-[#0F172A] border border-indigo-500/70 rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1 text-xs font-mono">
                <div className="text-[10px] text-indigo-400 font-bold px-1 py-0.5 border-b border-slate-700">
                  FÁRMACOS ESPECÍFICOS ACLS / 5H y 5T:
                </div>
                <button
                  onClick={() => {
                    handleAction('Administrar Adenosina 6 mg IV en bolo ultra rápido con flush de 20 ml SF');
                    setShowOtherDrugsMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-indigo-950 text-left text-slate-200 flex flex-col"
                >
                  <span className="font-bold text-indigo-300">⚡ Adenosina 6 mg IV Bolo Rápido</span>
                  <span className="text-[9px] text-slate-400">1ª dosis TSV paroxística + flush 20ml</span>
                </button>
                <button
                  onClick={() => {
                    handleAction('Administrar Adenosina 12 mg IV en bolo ultra rápido con flush de 20 ml SF');
                    setShowOtherDrugsMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-indigo-950 text-left text-slate-200 flex flex-col"
                >
                  <span className="font-bold text-indigo-300">⚡ Adenosina 12 mg IV Bolo Rápido</span>
                  <span className="text-[9px] text-slate-400">2ª dosis TSV si no revierte en 1-2 min</span>
                </button>
                <button
                  onClick={() => {
                    handleAction('Administrar Sulfato de Magnesio 2 g IV en bolo lento');
                    setShowOtherDrugsMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-indigo-950 text-left text-slate-200 flex flex-col"
                >
                  <span className="font-bold text-indigo-300">⚡ Sulfato de Magnesio 2 g IV</span>
                  <span className="text-[9px] text-slate-400">Torsades de Pointes / QT prolongado / Hipomagnesemia</span>
                </button>
                <button
                  onClick={() => {
                    handleAction('Iniciar infusión continua de Noradrenalina a 0.2 mcg/kg/min');
                    setShowOtherDrugsMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-indigo-950 text-left text-slate-200 flex flex-col"
                >
                  <span className="font-bold text-indigo-300">💧 Noradrenalina 0.1-0.5 mcg/kg/min</span>
                  <span className="text-[9px] text-slate-400">Vasopresor de elección en shock Pos-RCE</span>
                </button>
                <button
                  onClick={() => {
                    handleAction('Administrar Gluconato de Calcio 1 g IV al 10% lento en 3 minutos');
                    setShowOtherDrugsMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-indigo-950 text-left text-slate-200 flex flex-col"
                >
                  <span className="font-bold text-indigo-300">🛡️ Gluconato de Calcio 1 g IV</span>
                  <span className="text-[9px] text-slate-400">Estabilizador de membrana en Hiperpotasemia</span>
                </button>
                <button
                  onClick={() => {
                    handleAction('Administrar Bicarbonato de Sodio 1 mEq/kg IV');
                    setShowOtherDrugsMenu(false);
                  }}
                  className="p-1.5 rounded hover:bg-indigo-950 text-left text-slate-200 flex flex-col"
                >
                  <span className="font-bold text-indigo-300">🧪 Bicarbonato de Sodio 1 mEq/kg IV</span>
                  <span className="text-[9px] text-slate-400">Acidosis metabólica severa / Intoxicación ADT</span>
                </button>
              </div>
            )}
          </div>

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

          {/* 10. Botón IA Evaluadora de la Pauta */}
          <button
            onClick={onOpenAiEvaluation}
            className="p-2 rounded-lg bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 hover:from-emerald-900 hover:to-cyan-900 border border-cyan-500/70 text-cyan-200 active:scale-95 transition flex flex-col items-center justify-center text-center gap-0.5 shadow-sm"
            title="Evaluar todo el desempeño del equipo con Inteligencia Artificial y rellenar la pauta oficial"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-mono">Evaluar con IA</span>
            <span className="text-[9px] text-emerald-400 font-bold font-mono">
              {aiScorePreview ? `Nota: ${aiScorePreview}` : 'Pauta ACLS'}
            </span>
          </button>

        </div>
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

    </div>
  );
}
