import React, { useState } from 'react';
import { X, Search, CheckCircle2, ShieldAlert, Sparkles, Droplets, Wind, Zap, Thermometer, Syringe, HeartCrack } from 'lucide-react';

export default function HytModal({
  isOpen,
  onClose,
  currentCase,
  treatedCauses = [],
  onTreatCause = () => {}
}) {
  if (!isOpen) return null;

  const hList = [
    {
      id: 'hipovolemia',
      name: 'Hipovolemia',
      desc: 'Pérdida aguda de sangre o fluidos (ej: hemorragia postquirúrgica, deshidratación). Colapso venoso.',
      actionText: 'Pasar Bolo Rápido de Cristaloides (1000 ml SF)',
      icon: Droplets,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('hipovolemia')
    },
    {
      id: 'hipoxia',
      name: 'Hipoxia',
      desc: 'Asfixia, insuficiencia ventilatoria severa, tórax silente o fallo en vía aérea.',
      actionText: 'Oxigenación al 100% y Ventilación con Presión Positiva / TET',
      icon: Wind,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('hipoxia')
    },
    {
      id: 'hidrogeniones',
      name: 'Hidrogeniones (Acidosis severa)',
      desc: 'Acidosis metabólica extrema (pH < 7.10, Cetoacidosis, shock séptico refractario).',
      actionText: 'Administrar Bicarbonato de Sodio 8.4% (1 mEq/kg IV)',
      icon: Syringe,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('hidrogeniones') || currentCase?.hytCategory?.toLowerCase().includes('acidosis')
    },
    {
      id: 'hiperkalemia',
      name: 'Hipo / Hiperkalemia',
      desc: 'ERC en diálisis, ondas T acuminadas picadas y QRS muy ancho aberrante.',
      actionText: 'Administrar Gluconato de Calcio al 10% (10 ml IV en 3 min)',
      icon: Zap,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('hiperkalemia')
    },
    {
      id: 'hipotermia',
      name: 'Hipotermia Accidental',
      desc: 'Temperatura central < 32°C, ondas J de Osborn, rigidez miocárdica.',
      actionText: 'Iniciar Recalentamiento Activo Central y Sueros Tibios',
      icon: Thermometer,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('hipotermia')
    }
  ];

  const tList = [
    {
      id: 'neumotorax',
      name: 'Neumotórax a Tensión',
      desc: 'Asimetría ventilatoria, murmullo pulmonar ausente, ingurgitación yugular y timpanismo.',
      actionText: 'Toracocentesis con Aguja (2do EIC - LMC) / Descompresión',
      icon: Wind,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('neumotórax') || currentCase?.hytCategory?.toLowerCase().includes('neumotorax')
    },
    {
      id: 'taponamiento',
      name: 'Taponamiento Cardíaco',
      desc: 'Tríada de Beck: Ruidos cardíacos velados, hipotensión extrema, ingurgitación yugular.',
      actionText: 'Pericardiocentesis Subxifoidea de Rescate',
      icon: HeartCrack,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('taponamiento')
    },
    {
      id: 'toxicos',
      name: 'Tóxicos / Sobredosis',
      desc: 'Intoxicación por betabloqueadores, calcioantagonistas, antidepresivos tricíclicos, etc.',
      actionText: 'Administrar Antídoto Específico / Glucagón / Calcio / Lavado',
      icon: Syringe,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('tóxicos') || currentCase?.hytCategory?.toLowerCase().includes('toxicos')
    },
    {
      id: 'trombosis_coronaria',
      name: 'Trombosis Coronaria (IAMCEST)',
      desc: 'Síndrome coronario agudo, dolor isquémico opresivo, elevación previa del ST.',
      actionText: 'Activar Angioplastia Coronaria de Emergencia (Hemodinamia / PCI)',
      icon: Zap,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('coronaria')
    },
    {
      id: 'trombosis_pulmonar',
      name: 'Trombosis Pulmonar (TEP Masivo)',
      desc: 'Colapso súbito, shock obstructivo, sobrecarga aguda de ventrículo derecho (S1Q3T3).',
      actionText: 'Administrar Trombolítico Sistémico de Rescate (Alteplasa 50 mg IV)',
      icon: Droplets,
      isCorrectForCase: currentCase?.hytCategory?.toLowerCase().includes('pulmonar')
    }
  ];

  const handleApply = (cause) => {
    onTreatCause(cause);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-[#0E1524] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
                INVESTIGACIÓN DE CAUSAS REVERSIBLES DE PARO: 5 H Y 5 T
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Mandatorio en AESP y Asistolia. Selecciona y administra el tratamiento etiológico específico.
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

        {/* Content Body: 2 Columns (5 H on left, 5 T on right) */}
        <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          
          {/* Column 1: Las 5 H */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>LAS 5 H</span>
              <span className="text-[10px] text-slate-400">Hipovolemia, Hipoxia, H+, Hipo/Hiper K, Hipotermia</span>
            </div>

            {hList.map((c) => {
              const isTreated = treatedCauses.includes(c.id);
              const IconComp = c.icon;
              return (
                <div
                  key={c.id}
                  className={`p-3 rounded-xl border text-xs font-mono transition flex flex-col justify-between ${
                    isTreated
                      ? 'bg-emerald-950/40 border-emerald-500/80'
                      : 'bg-[#091120] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-200 mb-1">
                      <span className="flex items-center gap-1.5 text-cyan-300">
                        <IconComp className="w-4 h-4" />
                        {c.name}
                      </span>
                      {isTreated && (
                        <span className="text-emerald-400 flex items-center gap-1 text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Tratada
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {c.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApply(c)}
                    disabled={isTreated}
                    className={`mt-2.5 px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono transition flex items-center justify-center gap-1.5 ${
                      isTreated
                        ? 'bg-emerald-900/40 text-emerald-300 cursor-default border border-emerald-700/50'
                        : 'bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 border border-cyan-700/60 shadow-sm'
                    }`}
                  >
                    {isTreated ? 'Terapia Administrada' : c.actionText}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Column 2: Las 5 T */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>LAS 5 T</span>
              <span className="text-[10px] text-slate-400">Tensión, Taponamiento, Tóxicos, Trombosis Cor/Pul</span>
            </div>

            {tList.map((c) => {
              const isTreated = treatedCauses.includes(c.id);
              const IconComp = c.icon;
              return (
                <div
                  key={c.id}
                  className={`p-3 rounded-xl border text-xs font-mono transition flex flex-col justify-between ${
                    isTreated
                      ? 'bg-emerald-950/40 border-emerald-500/80'
                      : 'bg-[#091120] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-slate-200 mb-1">
                      <span className="flex items-center gap-1.5 text-amber-300">
                        <IconComp className="w-4 h-4" />
                        {c.name}
                      </span>
                      {isTreated && (
                        <span className="text-emerald-400 flex items-center gap-1 text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Tratada
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {c.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApply(c)}
                    disabled={isTreated}
                    className={`mt-2.5 px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono transition flex items-center justify-center gap-1.5 ${
                      isTreated
                        ? 'bg-emerald-900/40 text-emerald-300 cursor-default border border-emerald-700/50'
                        : 'bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-700/60 shadow-sm'
                    }`}
                  >
                    {isTreated ? 'Terapia Administrada' : c.actionText}
                  </button>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#0E1524] flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">
            Regla de oro ACLS: Un ritmo no desfibrilable (AESP/Asistolia) no saldrá a RCE si no corriges su causa de fondo.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-xs"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
}
