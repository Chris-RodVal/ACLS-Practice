import React from 'react';
import { Trophy, RotateCcw, Sparkles, BookOpen, Clock } from './Icons';

export const QuizResultCard = ({ result, onRetake, onNewExam, onViewLibrary }) => {
  const { percentage, score, totalQuestions, timeSeconds, title, specialty } = result;

  const getEvaluation = (pct) => {
    if (pct >= 80) return { title: '🏆 ¡Rendimiento Sobresaliente EUNACOM!', subtitle: 'Aprobación holgada en la sección teórica del EUNACOM (Chile).', color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-950/30' };
    if (pct >= 60) return { title: '🎖️ Calificación de Aprobación Segura', subtitle: 'Superas holgadamente el corte oficial EUNACOM (51%).', color: 'text-cyan-400', border: 'border-cyan-500/50', bg: 'bg-cyan-950/30' };
    if (pct >= 51) return { title: '📈 Aprobado EUNACOM (Límite)', subtitle: 'Puntaje sobre el corte legal (51%). Refuerza las Guías GES MINSAL.', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/30' };
    return { title: '⚡ Bajo el Corte EUNACOM (< 51%)', subtitle: 'Te recomendamos repasar las normas técnicas y Guías GES MINSAL.', color: 'text-rose-400', border: 'border-rose-500/50', bg: 'bg-rose-950/30' };
  };

  const evalInfo = getEvaluation(percentage);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Result Card Container */}
      <div className={`rounded-3xl border ${evalInfo.border} ${evalInfo.bg} p-8 text-center space-y-6 relative overflow-hidden shadow-2xl`}>
        
        <div className="inline-flex p-4 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-inner">
          <Trophy className={`w-12 h-12 ${evalInfo.color}`} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
            {specialty} • RESULTADO SIMULACIÓN EUNACOM CHILE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {title}
          </h2>
        </div>

        {/* Big Score Gauge */}
        <div className="py-4">
          <div className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full bg-slate-950 border-4 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <span className="text-4xl font-extrabold font-mono text-white">
              {percentage}%
            </span>
            <span className="text-xs text-slate-400 font-semibold mt-1">
              {score} de {totalQuestions} Aciertos
            </span>
          </div>
        </div>

        {/* Evaluation Banner */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <h3 className={`text-base font-extrabold ${evalInfo.color}`}>
            {evalInfo.title}
          </h3>
          <p className="text-xs text-slate-300">
            {evalInfo.subtitle}
          </p>
        </div>

        {/* Stat metrics */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Tiempo Total:</span>
            <span className="text-cyan-300 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatTime(timeSeconds)}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Preguntas:</span>
            <span className="text-emerald-300 font-bold">
              {totalQuestions} Seriadas
            </span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Repetir Examen</span>
        </button>

        <button
          onClick={onNewExam}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Generar Nuevo Caso Clínico</span>
        </button>

        <button
          onClick={onViewLibrary}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-slate-400" />
          <span>Ver Biblioteca</span>
        </button>
      </div>

    </div>
  );
};
