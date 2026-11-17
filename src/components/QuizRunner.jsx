import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, Sparkles, MessageSquare, Clock, BookOpen, FileText } from './Icons';
import { storageService } from '../services/storageService';

export const QuizRunner = ({ exam, onExamComplete, onAskTutor, onBackToGenerator }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => setTimeSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  if (!exam || !exam.questions || exam.questions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>No hay preguntas disponibles en este examen.</p>
        <button onClick={onBackToGenerator} className="mt-4 px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl">
          Volver al Generador
        </button>
      </div>
    );
  }

  const currentQ = exam.questions[currentQuestionIndex];
  const isSelected = selectedAnswers[currentQ.id] !== undefined;
  const isRevealed = revealedAnswers[currentQ.id] || isFinished;
  const selectedIndex = selectedAnswers[currentQ.id];

  const handleSelectOption = (index) => {
    if (isRevealed) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: index }));
    setRevealedAnswers(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleFinishExam();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    let score = 0;
    exam.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    const total = exam.questions.length;
    const percentage = Math.round((score / total) * 100);
    const result = {
      id: 'result-' + Date.now(),
      examId: exam.id,
      title: exam.title,
      specialty: exam.specialty,
      score,
      totalQuestions: total,
      percentage,
      timeSeconds,
      date: new Date().toISOString()
    };
    storageService.saveExamResult(result);
    onExamComplete(result);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Count answered so far
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctSoFar = exam.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-[#0F172A] border border-slate-800 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGenerator}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold uppercase">
                {exam.specialty}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">{exam.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Score so far */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-emerald-400 font-bold">{correctSoFar}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{answeredCount}</span>
          </div>
          {/* Timer */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-cyan-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%` }}
        />
        <div className="absolute right-2 -top-5 text-[10px] font-mono text-slate-500">
          {currentQuestionIndex + 1} / {exam.questions.length}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Question number + tutor button */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Pregunta {currentQuestionIndex + 1} de {exam.questions.length}
            </span>
            <div className="text-[11px] text-slate-500 mt-0.5">5 Alternativas (A-E) · Tipo EUNACOM Chile</div>
          </div>

          <button
            onClick={() => onAskTutor({ clinicalCase: exam.clinicalCase, question: currentQ })}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 transition-all text-xs font-semibold shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Tutor IA</span>
          </button>
        </div>

        {/* Clinical Vignette (the mini-case) */}
        {currentQ.clinicalVignette && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#131B2E] border border-slate-700/80 shadow-inner space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Caso Clínico</span>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-100 leading-relaxed">
              {currentQ.clinicalVignette}
            </p>
          </div>
        )}

        {/* Question text */}
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
          {currentQ.text}
        </h3>

        {/* 5 Options (A–E) */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D', 'E'][idx];
            const isThisSelected = selectedIndex === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            let style = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-800/80 cursor-pointer';
            
            if (isRevealed) {
              if (isCorrect) {
                style = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
              } else if (isThisSelected && !isCorrect) {
                style = 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.15)]';
              } else {
                style = 'bg-slate-900/30 border-slate-800/50 text-slate-600 opacity-50';
              }
            } else if (isThisSelected) {
              style = 'bg-cyan-950/80 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isRevealed}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-4 ${style}`}
              >
                <span className={`w-8 h-8 rounded-xl font-bold font-mono text-sm flex items-center justify-center shrink-0 border transition-all ${
                  isRevealed && isCorrect
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : isRevealed && isThisSelected && !isCorrect
                    ? 'bg-rose-500 text-white border-rose-400'
                    : isThisSelected
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}>
                  {letter}
                </span>

                <div className="flex-1 pt-1 text-sm sm:text-[15px] font-medium leading-relaxed">
                  {option}
                </div>

                {isRevealed && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                )}
                {isRevealed && isThisSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Solucionario */}
        {isRevealed && currentQ.explanation && (
          <div className="mt-4 p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4 animate-fade-in text-sm">
            
            <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
              <BookOpen className="w-5 h-5" />
              <span>SOLUCIONARIO EUNACOM</span>
            </div>

            {currentQ.explanation.gpcReference && (
              <div className="inline-block px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
                📖 {currentQ.explanation.gpcReference}
              </div>
            )}

            <p className="text-slate-200 leading-relaxed">
              {currentQ.explanation.rationale}
            </p>

            {currentQ.explanation.distractors && currentQ.explanation.distractors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Descarte de Distractores:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentQ.explanation.distractors.map((dis, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentQ.explanation.pearl && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 to-yellow-950/40 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-amber-300 font-bold text-xs uppercase mb-0.5">PERLA EUNACOM</span>
                  <span>{currentQ.explanation.pearl}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 font-semibold text-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!isSelected && !isFinished}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40"
        >
          <span>
            {currentQuestionIndex === exam.questions.length - 1 ? 'Finalizar Simulacro' : 'Siguiente'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
