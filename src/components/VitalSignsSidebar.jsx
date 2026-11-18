import React from 'react';
import { Heart, Activity, Wind, Gauge, Thermometer, Play, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function VitalSignsSidebar({
  hr = 80,
  spo2 = 98,
  bp = '120/80',
  etco2 = 38,
  rr = 16,
  temp = 36.5,
  pulsePresent = true,
  isCprActive = false,
  isNibpMeasuring = false,
  onTriggerNibp = () => {},
  rhythmName = 'Ritmo Sinusal',
  oxygenDevice = 'none',
  onChangeOxygenDevice = () => {},
  isAirwaySecured = false
}) {
  const [showO2Menu, setShowO2Menu] = React.useState(false);

  // Compute MAP (Presión Arterial Media) from BP string
  const calculateMAP = (bpString) => {
    if (!bpString || bpString === '0/0' || bpString === '--/--') return '--';
    const parts = bpString.split('/');
    if (parts.length === 2) {
      const sys = parseInt(parts[0], 10);
      const dia = parseInt(parts[1], 10);
      if (!isNaN(sys) && !isNaN(dia)) {
        return Math.round((sys + 2 * dia) / 3);
      }
    }
    return '--';
  };

  const mapVal = calculateMAP(bp);

  const O2_DEVICES = [
    { id: 'none', label: 'Aire Ambiental', fio2: 'FiO2 21%', flow: '0 L/min' },
    { id: 'nasal_cannula', label: 'Cánula Nasal', fio2: 'FiO2 32%', flow: '3 L/min' },
    { id: 'venturi', label: 'Mascarilla Venturi', fio2: 'FiO2 50%', flow: '10 L/min' },
    { id: 'reservoir', label: 'Masc. Reservorio', fio2: 'FiO2 100%', flow: '15 L/min' },
    { id: 'bvm', label: 'Bolsa-Mascarilla (BVM)', fio2: 'FiO2 100%', flow: '15 L/min' }
  ];

  const currentO2 = O2_DEVICES.find(d => d.id === oxygenDevice) || O2_DEVICES[0];

  return (
    <div className="w-64 sm:w-72 bg-[#0A101D] border-l border-slate-800 flex flex-col justify-between p-2.5 select-none overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
      {/* Parameters list */}
      <div className="flex flex-col gap-2">

        {/* 1. Heart Rate (HR / FC) */}
        <div className="bg-[#0C1524] border border-emerald-900/50 rounded-lg p-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-mono font-semibold">
            <span className="flex items-center gap-1.5">
              <Heart className={`w-3.5 h-3.5 text-emerald-400 ${hr > 0 && pulsePresent && !isCprActive ? 'animate-ping' : ''}`} />
              FC / HR
            </span>
            <span className="text-[10px] text-emerald-500/70">lpm</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black font-mono tracking-tight text-emerald-400">
              {isCprActive ? 'RCP' : (hr > 0 ? hr : (rhythmName && rhythmName.includes('AESP') ? 48 : '0'))}
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
              !pulsePresent && (hr > 0 || (rhythmName && rhythmName.includes('AESP')))
                ? 'bg-purple-950/90 border-purple-600 text-purple-300 font-bold animate-pulse shadow-sm shadow-purple-900/50'
                : isCprActive
                ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
                : hr > 100
                ? 'bg-amber-950/80 border-amber-800 text-amber-300'
                : hr < 50 && hr > 0
                ? 'bg-sky-950/80 border-sky-800 text-sky-300'
                : hr === 0
                ? 'bg-rose-950/80 border-rose-800 text-rose-300'
                : 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
            }`}>
              {!pulsePresent && (hr > 0 || (rhythmName && rhythmName.includes('AESP')))
                ? 'AESP (SIN PULSO)'
                : isCprActive
                ? 'COMPRESIÓN'
                : hr > 100
                ? 'TAQUI'
                : hr < 50 && hr > 0
                ? 'BRADI'
                : hr === 0
                ? 'ASISTOLIA'
                : 'NORMAL'}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
            {rhythmName}
          </div>
        </div>

        {/* 2. SpO2 (Saturación de Oxígeno) */}
        <div className="bg-[#081726] border border-cyan-900/50 rounded-lg p-2 shadow-sm relative">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-mono font-semibold">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              SpO2 %
            </span>
            <span className="text-[10px] text-cyan-500/70">PLET</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black font-mono tracking-tight text-cyan-400">
              {isCprActive || !pulsePresent || spo2 <= 0 ? '--' : spo2}
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
              isCprActive
                ? 'bg-amber-950/80 border-amber-800 text-amber-300'
                : !pulsePresent
                ? 'bg-rose-950/80 border-rose-800 text-rose-300'
                : spo2 < 92
                ? 'bg-red-950/80 border-red-800 text-red-300'
                : 'bg-cyan-950/80 border-cyan-800 text-cyan-400'
            }`}>
              {isCprActive ? 'ARTEFACTO RCP' : !pulsePresent ? 'SIN PULSO' : spo2 < 92 ? 'HIPOXIA' : 'NORMAL'}
            </span>
          </div>

          {/* Control y Selector de Dispositivo de Oxígeno */}
          <div className="mt-1.5 pt-1.5 border-t border-cyan-950 flex flex-col gap-1 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[10px]">Dispositivo O2:</span>
              <button
                onClick={() => setShowO2Menu(!showO2Menu)}
                className={`px-2 py-0.5 rounded font-bold transition flex items-center gap-1 text-[10px] border ${
                  oxygenDevice !== 'none'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title="Cambiar dispositivo y flujo de oxígeno"
              >
                <Wind className="w-2.5 h-2.5" />
                <span>{currentO2.label} ▼</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-cyan-400/80">
              <span>{currentO2.flow}</span>
              <span className="font-bold">{currentO2.fio2}</span>
            </div>

            {/* Menú flotante de dispositivos de O2 */}
            {showO2Menu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0F172A] border border-cyan-500/60 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 text-xs font-mono">
                <div className="text-[10px] text-cyan-400 font-bold px-1 py-0.5 border-b border-slate-700">
                  Seleccionar Oxigenoterapia:
                </div>
                {O2_DEVICES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      onChangeOxygenDevice(d.id);
                      setShowO2Menu(false);
                    }}
                    className={`p-1.5 rounded text-left flex items-center justify-between transition ${
                      oxygenDevice === d.id
                        ? 'bg-cyan-900/60 text-cyan-200 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className="text-[10px] text-slate-400">{d.fio2}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. NIBP / Presión Arterial */}
        <div className="bg-[#181120] border border-rose-950/50 rounded-lg p-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-rose-300 font-mono font-semibold">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-rose-400" />
              PA / NIBP
            </span>
            <button
              onClick={onTriggerNibp}
              disabled={isNibpMeasuring}
              className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold transition flex items-center gap-1 ${
                isNibpMeasuring
                  ? 'bg-rose-500/30 text-rose-300 animate-pulse border border-rose-400/50'
                  : 'bg-rose-900/50 hover:bg-rose-800 text-rose-200 border border-rose-700/60'
              }`}
              title="Iniciar toma manual de presión arterial"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              {isNibpMeasuring ? 'INFLANDO...' : 'TOMA PA'}
            </button>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono tracking-tight text-rose-300">
                {isNibpMeasuring ? '---/---' : pulsePresent ? bp : '0/0'}
              </span>
              <span className="text-[10px] text-rose-400 font-mono">mmHg</span>
            </div>
            <span className="text-[11px] font-mono text-rose-400/90 font-bold">
              PAM: {isNibpMeasuring ? '--' : mapVal}
            </span>
          </div>
        </div>

        {/* 4. EtCO2 / Capnografía (Solo se muestra valor cuantitativo si el paciente está intubado) */}
        <div className="bg-[#1C1808] border border-amber-900/50 rounded-lg p-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-400 font-mono font-semibold">
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-amber-400" />
              EtCO2
            </span>
            <span className="text-[10px] text-amber-500/70">{isAirwaySecured ? 'mmHg' : 'Desconectado'}</span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black font-mono tracking-tight text-amber-400">
              {isAirwaySecured && etco2 > 0 ? etco2 : '--'}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-400 font-bold">
              {isAirwaySecured
                ? (etco2 >= 40 && pulsePresent ? '¡RCE!' : isCprActive ? 'RCP >10' : 'META 35-40')
                : 'NO INTUBADO'}
            </span>
          </div>
        </div>

        {/* 5. FR & Temp */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="bg-[#0C121E] border border-slate-800 rounded p-2">
            <div className="text-slate-400 text-[10px]">FR (rpm)</div>
            <div className="text-lg font-bold text-slate-200 mt-0.5">{pulsePresent ? rr : 0}</div>
          </div>
          <div className="bg-[#0C121E] border border-slate-800 rounded p-2">
            <div className="text-slate-400 text-[10px] flex items-center gap-0.5">
              <Thermometer className="w-2.5 h-2.5" /> Temp °C
            </div>
            <div className="text-lg font-bold text-slate-200 mt-0.5">{temp.toFixed(1)}°</div>
          </div>
        </div>

      </div>

      {/* Target Metas ACLS */}
      <div className="text-[9px] font-mono text-slate-500 border-t border-slate-800 pt-2 flex flex-col gap-0.5">
        <div>PAM Meta: &gt; 65 mmHg</div>
        <div>SaO2 Meta: 92 - 98% (Normoxia)</div>
        <div>EtCO2 Meta: 35 - 40 mmHg</div>
      </div>
    </div>
  );
}
