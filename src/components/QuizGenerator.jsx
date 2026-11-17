import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Stethoscope, Flame, FileText, AlertCircle, Loader2, ArrowRight, Activity, Clock } from './Icons';
import { generateENARMExam } from '../services/aiService';
import { storageService } from '../services/storageService';

const SPECIALTIES = [
  { id: 'Medicina Interna', label: 'Medicina Interna', color: 'from-blue-600 to-indigo-700', icon: '🫀' },
  { id: 'Pediatría', label: 'Pediatría', color: 'from-emerald-600 to-teal-700', icon: '👶' },
  { id: 'Ginecología y Obstetricia', label: 'Ginecología y Obstetricia', color: 'from-rose-600 to-pink-700', icon: '🤰' },
  { id: 'Cirugía General', label: 'Cirugía General', color: 'from-amber-600 to-orange-700', icon: '🩺' },
  { id: 'Salud Pública y Med. Familiar', label: 'Salud Pública / Med. Familiar', color: 'from-cyan-600 to-blue-700', icon: '🏥' },
  { id: 'Urgencias y Trauma', label: 'Urgencias y Trauma', color: 'from-red-600 to-rose-700', icon: '🚨' }
];

const EXTENSION_OPTIONS = [
  {
    count: 7,
    label: 'Corto',
    sublabel: '7 preguntas',
    time: '~10 min',
    badge: '⚡ Repaso Rápido',
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50'
  },
  {
    count: 14,
    label: 'Estándar',
    sublabel: '14 preguntas',
    time: '~20 min',
    badge: '📋 Recomendado',
    color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/50'
  },
  {
    count: 21,
    label: 'Extenso',
    sublabel: '21 preguntas',
    time: '~35 min',
    badge: '🔥 Simulacro Completo',
    color: 'from-purple-500/20 to-rose-500/20 border-purple-500/50'
  }
];

const POPULAR_TOPICS = [
  'IAMCEST y Protocolo Código Infarto GES (MINSAL)',
  'Síndrome Bronquial Obstructivo (SBO) y Guía ERA (MINSAL)',
  'Garantías Explícitas en Salud (Ley GES / AUGE N° 19.966)',
  'Síndrome Hipertensivo del Embarazo (SHE) y Preeclampsia',
  'Abdomen Agudo: Apendicitis vs Peritonitis en Servicio Urgencia',
  'Diabetes Mellitus Tipo 2 y Control en APS / CESFAM',
  'Cáncer de Mama y Cérvicouterino (Guías GES MINSAL)',
  'Manejo del Trauma Grave y Protocolo ATLS / MINSAL'
];

export const QuizGenerator = ({ apiKey, onExamGenerated, onOpenApiKeyModal }) => {
  const [specialty, setSpecialty] = useState('Medicina Interna');
  const [topic, setTopic] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [numQuestions, setNumQuestions] = useState(7);
  const [difficulty, setDifficulty] = useState('EUNACOM Oficial (Máxima Dificultad MINSAL)');
  const [loading, setLoading] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [error, setError] = useState('');

  // Live timer during generation
  useEffect(() => {
    let interval;
    if (loading) {
      setSecondsElapsed(0);
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    } else {
      setSecondsElapsed(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleQuickTopic = (top) => {
    setTopic(top);
  };

  const getLoadingStage = () => {
    if (secondsElapsed < 4) return { stage: 1, text: `🩺 Estructurando viñetas clínicas de mini-casos (${numQuestions} preguntas)...` };
    if (secondsElapsed < 9) return { stage: 2, text: '🔬 Formulando 5 alternativas (A-E) y distractores verosímiles...' };
    return { stage: 3, text: '📖 Verificando solucionario docente y justificaciones GES / MINSAL...' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!apiKey) {
      onOpenApiKeyModal();
      return;
    }

    if (!topic.trim()) {
      setError('Por favor escribe un tema médico o selecciona uno de los sugeridos para el EUNACOM.');
      return;
    }

    setLoading(true);
    try {
      const exam = await generateENARMExam({
        topic: topic.trim(),
        specialty,
        numQuestions: parseInt(numQuestions),
        customNotes: customNotes.trim(),
        apiKey
      });

      storageService.saveExam(exam);
      onExamGenerated(exam);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al generar el simulacro EUNACOM. Revisa tu conexión y API Key.');
    } finally {
      setLoading(false);
    }
  };

  const currentStage = getLoadingStage();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0F172A] to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulador EUNACOM Chile (Perfil Oficial MINSAL)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Generador de Simulacros EUNACOM
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Cada pregunta es un mini-caso clínico real (4-6 líneas) con 5 alternativas (A, B, C, D, E) y solucionario docente con descarte de diagnósticos diferenciales.
            </p>
          </div>

          {!apiKey && (
            <button
              onClick={onOpenApiKeyModal}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30 font-semibold text-xs transition-all flex items-center gap-2 shrink-0 animate-bounce"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Requiere API Key</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Generator Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Specialty Selector Grid */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>1. Especialidad o Área EUNACOM</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SPECIALTIES.map((sp) => (
              <button
                key={sp.id}
                type="button"
                onClick={() => setSpecialty(sp.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                  specialty === sp.id
                    ? 'bg-slate-800/90 border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="text-2xl">{sp.icon}</span>
                <div>
                  <div className="text-xs sm:text-sm font-bold">{sp.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Topic Input & Quick Suggestions */}
        <div className="space-y-3 bg-[#0F172A] p-5 rounded-2xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>2. Tema Específico o Patología a Evaluar (GPC / GES MINSAL)</span>
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: SBO Lactante, GES Cáncer de Mama, Preeclampsia, IAMCEST, DM2..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
          />

          {/* Quick topic pills */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Sugerencias de Alto Rendimiento EUNACOM:</span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOPICS.map((top, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickTopic(top)}
                  className="px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-950 hover:border-cyan-500/50 border border-slate-700/80 text-xs text-slate-300 hover:text-cyan-300 transition-all"
                >
                  + {top}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Extensión del Simulacro (Corto: 7, Estándar: 14, Extenso: 21) */}
        <div className="space-y-3 bg-[#0F172A] p-5 rounded-2xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>3. Extensión del Simulacro</span>
            </span>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              {numQuestions} preguntas seleccionadas
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {EXTENSION_OPTIONS.map((opt) => {
              const isSelected = numQuestions === opt.count;
              return (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => setNumQuestions(opt.count)}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? `bg-gradient-to-b ${opt.color} border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] text-white`
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-cyan-300">
                      {opt.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {opt.time}
                    </span>
                  </div>

                  <div>
                    <div className="text-lg font-extrabold text-white">
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {opt.sublabel} (mini-casos)
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. NotebookLM Context / Custom Notes Input (Opcional) */}
        <div className="space-y-3 bg-[#0F172A] p-5 rounded-2xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>4. Apuntes de Estudio o Guías MINSAL (Opcional - Estilo NotebookLM)</span>
            </span>
            <span className="text-xs text-slate-400 font-normal">Pega resúmenes o normas técnicas</span>
          </label>
          <textarea
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            rows={3}
            placeholder="Pega aquí tus apuntes de estudio EUNACOM, resúmenes de Guías GES o fragmentos para que la IA genere el examen basado en este material..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Live Progress Stage Feedback during loading */}
        {loading && (
          <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 space-y-3 animate-fade-in shadow-xl">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-mono font-bold">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 animate-pulse text-cyan-400" />
                <span>Generando {numQuestions} preguntas EUNACOM con Claude AI...</span>
              </span>
              <span>{secondsElapsed}s transcurridos</span>
            </div>

            {/* Dynamic Stage Banner */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white font-medium flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400 shrink-0" />
              <span>{currentStage.text}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(95, 15 + secondsElapsed * 8)}%` }}
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:via-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-base transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
              <span>Generando {numQuestions} Preguntas EUNACOM ({secondsElapsed}s)...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Generar Simulacro EUNACOM ({numQuestions} preguntas)</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </>
          )}
        </button>

      </form>

    </div>
  );
};
