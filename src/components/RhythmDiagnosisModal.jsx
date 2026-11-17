import React from 'react';
import { X, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function RhythmDiagnosisModal({
  isOpen,
  onClose,
  currentRhythm,
  rhythmName,
  onSelectDiagnosis = () => {}
}) {
  if (!isOpen) return null;

  const rhythmOptions = [
    { id: 'FV', name: 'Fibrilación Ventricular (FV Gruesa)', isShockable: true },
    { id: 'FV_FINA', name: 'Fibrilación Ventricular Fina (FV Fina <2mm)', isShockable: true },
    { id: 'TVSP', name: 'Taquicardia Ventricular sin pulso (TVSP)', isShockable: true },
    { id: 'TORSADES', name: 'Torsades de Pointes (TV Polimorfa)', isShockable: true },
    { id: 'AESP', name: 'Actividad Eléctrica Sin Pulso (AESP)', isShockable: false },
    { id: 'ASISTOLIA', name: 'Asistolia (Línea Plana comprobada en 2 derivaciones)', isShockable: false },
    { id: 'TV_MONOMORFA', name: 'Taquicardia Ventricular Monomorfa (con pulso)', isShockable: false },
    { id: 'TSVP', name: 'Taquicardia Supraventricular Paroxística (TSVP)', isShockable: false },
    { id: 'FA_RVR', name: 'Fibrilación Auricular con RVR', isShockable: false },
    { id: 'FLUTTER', name: 'Flutter Auricular (Conducción 2:1 o 3:1)', isShockable: false },
    { id: 'BRADICARDIA_SINUSAL', name: 'Bradicardia Sinusal (<50 lpm)', isShockable: false },
    { id: 'BAV_1', name: 'Bloqueo AV de 1° Grado (PR > 0.20s fijo)', isShockable: false },
    { id: 'BAV_2_WENCKEBACH', name: 'Bloqueo AV de 2° Grado Mobitz I (Wenckebach)', isShockable: false },
    { id: 'BAV_2_MOBITZ_2', name: 'Bloqueo AV de 2° Grado Mobitz II (PR fijo con P bloqueada)', isShockable: false },
    { id: 'BAV_3', name: 'Bloqueo AV de 3er Grado (Completo / Disociación AV)', isShockable: false },
    { id: 'SINUSAL_ST_ELEVATION', name: 'Ritmo Sinusal con Supradesnivel ST (STEMI)', isShockable: false },
    { id: 'SINUSAL', name: 'Ritmo Sinusal Normal', isShockable: false },
  ];

  const handleChoose = (opt) => {
    onSelectDiagnosis(opt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-[#0E1524] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-mono">
                DECLARACIÓN DEL RITMO CARDÍACO
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Observa el osciloscopio y declara qué ritmo estás diagnosticando:
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Rhythms */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
          {rhythmOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleChoose(opt)}
              className="w-full p-2.5 rounded-xl bg-[#091120] hover:bg-cyan-950/60 hover:border-cyan-500/80 border border-slate-800 transition text-left flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-bold font-mono text-slate-200 group-hover:text-cyan-300">
                  {opt.name}
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  {opt.isShockable ? '⚡ Ritmo Desfibrilable' : '🔒 Ritmo No Desfibrilable'}
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition">
                Seleccionar →
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#0E1524] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-xs font-mono"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
