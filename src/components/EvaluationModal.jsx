import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Award, RefreshCw, Printer, ShieldAlert } from 'lucide-react';

export default function EvaluationModal({
  isOpen,
  onClose,
  evaluationData,
  currentCase,
  onRestartCase = () => {},
  onSelectNewCase = () => {}
}) {
  if (!isOpen || !evaluationData) return null;

  const {
    items = [],
    criticalErrors = [],
    scorePercent = 0,
    grade = 1.0,
    isPassed = false,
    durationSeconds = 0,
    teacherFeedback = []
  } = evaluationData;

  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header with grade badge */}
        <div className={`p-5 border-b border-slate-800 flex items-center justify-between ${
          isPassed ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900' : 'bg-gradient-to-r from-rose-950/80 to-slate-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isPassed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
            }`}>
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono tracking-wider uppercase text-slate-400">
                PAUTA OFICIAL DE EVALUACIÓN ACLS — ACTUACIÓN CRÍTICA
              </div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {currentCase?.title}
              </h2>
            </div>
          </div>

          {/* Grade & Score */}
          <div className="flex items-center gap-4">
            <div className="text-right font-mono">
              <div className="text-xs text-slate-400">Puntaje Obtenido</div>
              <div className="text-lg font-bold text-slate-200">{scorePercent}%</div>
            </div>
            <div className={`px-4 py-2 rounded-xl font-black font-mono text-2xl border flex items-center gap-1 ${
              isPassed
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-lg shadow-emerald-500/20'
                : 'bg-rose-500/20 text-rose-300 border-rose-500 shadow-lg shadow-rose-500/20'
            }`}>
              <span>{grade.toFixed(1)}</span>
              <span className="text-xs font-normal text-slate-400">/ 7.0</span>
            </div>
          </div>
        </div>

        {/* Status banner */}
        <div className={`px-5 py-2.5 text-xs font-mono font-bold flex items-center justify-between border-b ${
          isPassed ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300' : 'bg-rose-950/40 border-rose-800/40 text-rose-300'
        }`}>
          <span className="flex items-center gap-2">
            {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
            ESTADO: {isPassed ? 'COMPETENCIA ACLS DEMOSTRADA (APROBADO)' : 'NO SUPERA ESTÁNDAR ACLS DE ACTUACIÓN CRÍTICA (REPROBADO)'}
          </span>
          <span>Tiempo de simulación: {formatDuration(durationSeconds)}</span>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* AI Tutor Card if available */}
          {evaluationData?.aiEvaluation && (
            <div className="bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold font-mono text-xs uppercase flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Informe Docente de Inteligencia Artificial (Tutor ACLS)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Calificación IA: <strong className="text-cyan-300">{evaluationData.aiEvaluation.grade}</strong>
                </span>
              </div>
              <p className="text-xs text-slate-200 font-mono leading-relaxed bg-[#0A101D]/80 p-3 rounded-lg border border-slate-800">
                {evaluationData.aiEvaluation.aiSummary}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {evaluationData.aiEvaluation.strengths?.length > 0 && (
                  <div className="bg-emerald-950/30 border border-emerald-700/40 p-2.5 rounded-lg text-xs font-mono">
                    <span className="text-emerald-400 font-bold block mb-1">Fortalezas del Equipo:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-emerald-200/90 text-[11px]">
                      {evaluationData.aiEvaluation.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {evaluationData.aiEvaluation.areasForImprovement?.length > 0 && (
                  <div className="bg-amber-950/30 border border-amber-700/40 p-2.5 rounded-lg text-xs font-mono">
                    <span className="text-amber-400 font-bold block mb-1">Puntos a Corregir:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-200/90 text-[11px]">
                      {evaluationData.aiEvaluation.areasForImprovement.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Critical Errors Alert if any */}
          {criticalErrors.length > 0 && (
            <div className="bg-rose-950/40 border border-rose-600/60 rounded-xl p-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-mono mb-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
                ERRORES CRÍTICOS DETECTADOS EN EL EXAMEN (Descuento Severo / Causa de Muerte)
              </div>
              <ul className="space-y-1.5 text-xs text-rose-200 font-mono">
                {criticalErrors.map((err, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-rose-900/30 p-2 rounded border border-rose-800/40">
                    <span className="text-rose-400 font-bold">✖</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Teacher observations & Clinical Notes */}
          {teacherFeedback.length > 0 && (
            <div className="bg-amber-950/30 border border-amber-600/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono uppercase mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Observaciones del Docente Evaluador (Anotaciones de Pauta)
              </div>
              <ul className="space-y-1 text-xs text-amber-200/90 font-mono">
                {teacherFeedback.map((fb, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-amber-400">✍</span>
                    <span>{fb}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Checklist table matching the user's uploaded images */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#0A101D]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#162032] text-slate-300 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-2.5 px-4">Pasos de actuación crítica</th>
                  <th className="py-2.5 px-4 text-center w-36">¿Se realiza correctamente?</th>
                  <th className="py-2.5 px-4 w-64">Detalle / Hallazgo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {items.map((item, idx) => (
                  <tr
                    key={idx}
                    className={item.isCategoryHeader ? 'bg-[#121B2D] font-bold text-slate-200' : 'hover:bg-slate-800/30'}
                  >
                    {item.isCategoryHeader ? (
                      <td colSpan={3} className="py-2 px-4 text-cyan-400 uppercase tracking-wider text-[11px] font-bold bg-[#142036]">
                        {item.title}
                      </td>
                    ) : (
                      <>
                        <td className="py-2.5 px-4 text-slate-300">
                          {item.label}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          {item.isNotApplicable ? (
                            <span className="inline-flex items-center gap-1 text-amber-300 font-bold bg-amber-950/80 border border-amber-600/70 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                              NO APLICABLE
                            </span>
                          ) : item.done ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> SÍ (✔)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/70 border border-rose-800/60 px-2 py-0.5 rounded text-[11px]">
                              <XCircle className="w-3.5 h-3.5 text-rose-400" /> NO (✖)
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-[11px] text-slate-400">
                          {item.isNotApplicable 
                            ? (item.note || 'No aplicable a la simulación virtual — Evaluado en box presencial por el docente')
                            : (item.note || (item.done ? 'Cumplido oportunamente' : 'Omitido o incorrecto'))}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Action buttons footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0A101D] flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            Imprimir Pauta
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onRestartCase();
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-bold flex items-center gap-2 border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reintentar este Caso
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectNewCase();
              }}
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-mono font-black shadow-lg shadow-cyan-600/30"
            >
              Elegir Otro Caso ACLS
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
