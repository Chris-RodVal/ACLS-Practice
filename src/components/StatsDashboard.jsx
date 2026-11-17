import React from 'react';
import { BarChart3, BookOpen, Trash2, Play } from './Icons';
import { storageService } from '../services/storageService';

export const StatsDashboard = ({ onStartExam, onDeleteExam }) => {
  const stats = storageService.getStats();
  const exams = storageService.getSavedExams();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <span>Estadísticas & Rendimiento EUNACOM Chile</span>
          </h2>
          <p className="text-xs text-slate-400">
            Seguimiento continuo de tu tasa de aciertos por área médica y casos EUNACOM resueltos.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono text-slate-400 block">EXÁMENES COMPLETADOS</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats.totalExamsTaken || 0}
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono text-slate-400 block">PREGUNTAS RESPONDIDAS</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
            {stats.totalQuestionsAnswered || 0}
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono text-slate-400 block">ACIERTOS TOTALES</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
            {stats.totalCorrect || 0}
          </span>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono text-slate-400 block">PROMEDIO DE APROBACIÓN</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
            {stats.averagePercentage || 0}%
          </span>
        </div>

      </div>

      {/* Specialty Breakdown */}
      {stats.specialtyStats && Object.keys(stats.specialtyStats).length > 0 && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Desglose por Área Médica EUNACOM</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(stats.specialtyStats).map(([spec, data]) => {
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              return (
                <div key={spec} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-200">{spec}</span>
                    <span className="font-mono text-cyan-400 font-bold">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 flex justify-between font-mono">
                    <span>{data.correct} correctas de {data.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Library of saved exams */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Biblioteca de Exámenes Guardados ({exams.length})</span>
        </h3>

        {exams.length === 0 ? (
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
            No tienes exámenes guardados aún. Genera uno nuevo con la IA.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exams.map((ex) => (
              <div
                key={ex.id}
                className="bg-[#0F172A] border border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl space-y-3 transition-all group"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                    {ex.specialty}
                  </span>
                  <button
                    onClick={() => onDeleteExam(ex.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                    title="Eliminar examen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {ex.title}
                </h4>

                <div className="text-xs text-slate-400 font-mono">
                  {ex.questions?.length || 0} Preguntas EUNACOM
                </div>

                <button
                  onClick={() => onStartExam(ex)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700 text-cyan-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Iniciar Examen</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
