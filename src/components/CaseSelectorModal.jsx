import React, { useState } from 'react';
import { X, HeartCrack, Activity, Zap, ShieldCheck, ChevronRight, Filter, Dices } from 'lucide-react';
import { ACLS_CASES, getRandomCase } from '../data/cases';

export default function CaseSelectorModal({
  isOpen,
  onClose,
  selectedCaseId,
  onSelectCase = () => {}
}) {
  const [filterType, setFilterType] = useState('all');

  if (!isOpen) return null;

  const handleRandomize = () => {
    const randomCase = getRandomCase();
    onSelectCase(randomCase);
    onClose();
  };

  const filteredCases = ACLS_CASES.filter((c) => {
    if (filterType === 'all') return true;
    if (filterType === 'taqui') return c.type === 'taquicardia';
    if (filterType === 'bradi') return c.type === 'bradicardia';
    if (filterType === 'shockable') return c.isShockable;
    if (filterType === 'nonshockable') return !c.isShockable;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-[#0E1524] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono">
                BIBLIOTECA DE CASOS CLÍNICOS DE SIMULACIÓN ACLS
              </h2>
              <p className="text-xs text-slate-400">
                Casos completos: Arritmia inicial &gt; Caída en Paro Cardíaco &gt; Resucitación &gt; RCE &gt; Cuidados Posparo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomize}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-600/30 transition"
              title="Seleccionar un caso clínico al azar con variaciones fisiológicas"
            >
              <Dices className="w-4 h-4" />
              Sortear Caso Aleatorio
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-4 py-2.5 bg-[#0C121E] border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>
          {[
            { id: 'all', label: 'Todos los casos' },
            { id: 'taqui', label: 'Taquiarritmias' },
            { id: 'bradi', label: 'Bradiarritmias' },
            { id: 'shockable', label: 'Paro Desfibrilable (FV/TVSP)' },
            { id: 'nonshockable', label: 'Paro No Desfibrilable (AESP/Asistolia)' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                filterType === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
          {filteredCases.map((c) => {
            const isCurrent = c.id === selectedCaseId;
            return (
              <div
                key={c.id}
                onClick={() => {
                  onSelectCase(c);
                  onClose();
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/50'
                    : 'bg-[#0B1322] hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      c.type === 'taquicardia'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                    }`}>
                      {c.type === 'taquicardia' ? 'TAQUIARRITMIA' : 'BRADIARRITMIA'}
                    </span>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      c.isShockable
                        ? 'bg-red-500/10 text-red-300 border-red-500/30'
                        : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                    }`}>
                      {c.isShockable ? 'PARO: DESFIBRILABLE' : 'PARO: NO DESFIBRILABLE'}
                    </span>

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {c.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-100 leading-snug">
                    {c.title}
                  </h3>

                  <div className="text-xs font-mono text-cyan-400/90 mt-1">
                    {c.patient.name} ({c.patient.age}a, {c.patient.gender}) — {c.patient.location}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {c.patient.presentation}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    Causa: <span className="text-slate-200">{c.hytCategory}</span>
                  </span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    Iniciar Simulación <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#0E1524] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-xs font-mono"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
