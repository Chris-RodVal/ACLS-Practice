import React, { useState } from 'react';
import { X, Stethoscope, Activity, TestTube, FileText, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ClinicalExamModal({
  isOpen,
  onClose,
  currentCase,
  dynamicExam = null
}) {
  const [activeTab, setActiveTab] = useState('physical'); // 'physical' | 'pocus' | 'labs' | 'history'

  if (!isOpen || !currentCase) return null;

  const baseExam = currentCase.clinicalExam || {
    physical: {
      pulmonary: 'Murmullo pulmonar presente y simétrico bilateralmente. Sin ruidos agregados.',
      cardiovascular: 'Ruidos cardíacos presentes, sin soplos audibles. Sin ingurgitación yugular.',
      perfusion: 'Piel pálida y fría. Llenado capilar de 3 segundos.',
      temperature: '36.5 °C axilar'
    },
    pocus: {
      cardiac: 'Eje subxifoideo: Sin derrame pericárdico significativo. Contractilidad deprimida difusa.',
      lung: 'Deslizamiento pleural (lung sliding) presente y bilateral. Líneas A normales.',
      vci: 'Vena Cava Inferior de 16 mm con colapso respiratorio del 40%.'
    },
    labs: {
      gsa: 'pH 7.32 | pCO2 38 | pO2 85 | HCO3 19 | EB -5 | Lactato 3.1 mmol/L',
      electrolytes: 'K+ 4.2 mEq/L | Na+ 138 mEq/L | Ca2+ iónico 1.18 mmol/L',
      glucose: 'HGT: 124 mg/dL',
      others: 'Troponina I: 0.12 ng/mL (en ascenso) | Dímero D: Normal'
    },
    history: {
      witness: 'Acompañante refiere que el cuadro inició súbitamente hoy. Sin vómitos ni diarrea previos.',
      allergies: 'Sin alergias conocidas.',
      medications: currentCase.patient?.history || ''
    }
  };

  const exam = dynamicExam ? {
    physical: { ...baseExam.physical, ...(dynamicExam.physical || {}) },
    pocus: { ...baseExam.pocus, ...(dynamicExam.pocus || {}) },
    labs: { ...baseExam.labs, ...(dynamicExam.labs || {}) },
    history: { ...baseExam.history, ...(dynamicExam.history || {}) }
  } : baseExam;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-cyan-500/40 rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-[#0E1524] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                DIAGNÓSTICO ETIOLÓGICO Y CAUSAS REVERSIBLES (5 H Y 5 T)
              </div>
              <h2 className="text-sm font-bold text-white font-mono">
                Exploración Clínica Dirigida, POCUS y Laboratorio
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex bg-[#0A101D] border-b border-slate-800 px-4 pt-2 gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('physical')}
            className={`pb-2 px-3 font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'physical'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Examen Físico
          </button>
          <button
            onClick={() => setActiveTab('pocus')}
            className={`pb-2 px-3 font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'pocus'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            POCUS (Ecografía en Paro)
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`pb-2 px-3 font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'labs'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TestTube className="w-3.5 h-3.5" />
            GSA y Laboratorio
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 px-3 font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Anamnesis / Testigos
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto max-h-[60vh] space-y-4 font-mono text-xs">
          
          {/* TAB 1: Examen Físico */}
          {activeTab === 'physical' && (
            <div className="space-y-3">
              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-400 font-bold">🫁 Auscultación y Examen Pulmonar:</span>
                  {exam.physical?.pulmonaryUpdated && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      ✨ Actualizado post-Descompresión
                    </span>
                  )}
                </div>
                <p className="text-slate-200 leading-relaxed">{exam.physical?.pulmonary}</p>
              </div>

              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <span className="text-cyan-400 font-bold block mb-1">❤️ Ruidos Cardíacos y Yugulares:</span>
                <p className="text-slate-200 leading-relaxed">{exam.physical?.cardiovascular}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#091120] border border-slate-800 p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-400 font-bold">Piel y Perfusión:</span>
                    {exam.physical?.perfusionUpdated && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-full font-bold">
                        ✨ Post-Fluidos
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200">{exam.physical?.perfusion}</p>
                </div>
                <div className="bg-[#091120] border border-slate-800 p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-400 font-bold">Temperatura Central:</span>
                    {exam.physical?.temperatureUpdated && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-full font-bold">
                        ✨ Recalentado
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200">{exam.physical?.temperature}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POCUS */}
          {activeTab === 'pocus' && (
            <div className="space-y-3">
              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-400 font-bold">🎯 Ventana Cardíaca Subxifoidea / 4 Cámaras:</span>
                  {exam.pocus?.cardiacUpdated && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      ✨ Post-Pericardiocentesis
                    </span>
                  )}
                </div>
                <p className="text-slate-200 leading-relaxed">{exam.pocus?.cardiac}</p>
              </div>

              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-400 font-bold">🫁 Ultrasonido Pulmonar (Lung Sliding):</span>
                  {exam.pocus?.lungUpdated && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      ✨ Deslizamiento Recuperado
                    </span>
                  )}
                </div>
                <p className="text-slate-200 leading-relaxed">{exam.pocus?.lung}</p>
              </div>

              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-400 font-bold">🩸 Vena Cava Inferior (VCI):</span>
                  {exam.pocus?.vciUpdated && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      ✨ Normovolemia Restaurada
                    </span>
                  )}
                </div>
                <p className="text-slate-200 leading-relaxed">{exam.pocus?.vci}</p>
              </div>
            </div>
          )}

          {/* TAB 3: Labs */}
          {activeTab === 'labs' && (
            <div className="space-y-3">
              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-400 font-bold">🧪 Gases en Sangre Arterial (GSA):</span>
                  {exam.labs?.gsaUpdated && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      ✨ Control Post-Bicarbonato
                    </span>
                  )}
                </div>
                <p className="text-emerald-300 font-bold text-[13px]">{exam.labs?.gsa}</p>
              </div>

              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-400 font-bold">⚡ Electrolitos Plasmáticos (ELP):</span>
                  {exam.labs?.electrolytesUpdated && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      ✨ Control Post-Calcio
                    </span>
                  )}
                </div>
                <p className="text-amber-300 font-bold text-[13px]">{exam.labs?.electrolytes}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#091120] border border-slate-800 p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan-400 font-bold">Glicemia Capilar (HGT):</span>
                    {exam.labs?.glucoseUpdated && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded-full font-bold">
                        ✨ Normalizada
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200 font-bold">{exam.labs?.glucose}</p>
                </div>
                <div className="bg-[#091120] border border-slate-800 p-3 rounded-xl">
                  <span className="text-cyan-400 font-bold block mb-1">Otros Marcadores de Urgencia:</span>
                  <p className="text-slate-200">{exam.labs?.others}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: History */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <span className="text-cyan-400 font-bold block mb-1">🗣️ Relato de Testigos y Acompañantes:</span>
                <p className="text-slate-200 leading-relaxed">{exam.history?.witness}</p>
              </div>

              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <span className="text-cyan-400 font-bold block mb-1">💊 Medicamentos Habituales / Tóxicos:</span>
                <p className="text-slate-200 leading-relaxed">{exam.history?.medications}</p>
              </div>

              <div className="bg-[#091120] border border-slate-800 p-3.5 rounded-xl space-y-1">
                <span className="text-cyan-400 font-bold block mb-1">🚫 Alergias Conocidas:</span>
                <p className="text-slate-200 leading-relaxed">{exam.history?.allergies}</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#0E1524] flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">
            Utiliza estos hallazgos para orientar el tratamiento de las <strong>5 H y 5 T</strong> del algoritmo ACLS.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg transition"
          >
            Cerrar Exploración
          </button>
        </div>

      </div>
    </div>
  );
}
