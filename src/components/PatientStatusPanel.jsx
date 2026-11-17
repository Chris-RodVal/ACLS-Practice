import React from 'react';
import { User, Activity, AlertCircle, Clock, Volume2, VolumeX, ShieldAlert, CheckCircle, HeartCrack, Sparkles } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export default function PatientStatusPanel({
  currentCase,
  phase, // 'initial' | 'arrest' | 'rce' | 'post_rce' | 'dead'
  elapsedSeconds = 0,
  cprCycleSeconds = 0,
  initialPhaseRemaining = 270,
  isTimerPaused = false,
  announcement = '',
  patientDialogue = '',
  consciousness = 'Consciente',
  airwayStatus = 'Espontánea',
  ivStatus = 'Vía periférica 18G',
  isCprActive = false,
  pulsePresent = true,
  onOpenEvaluation = () => {},
  onForceArrest = () => {},
  onTogglePauseTimer = () => {},
  onAddInitialTime = () => {}
}) {
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSpeakPatient = () => {
    if (patientDialogue) {
      soundEngine.speak(patientDialogue, 'patient');
    }
  };

  return (
    <div className="bg-[#090F1C] border-b border-slate-800 p-3 flex flex-col gap-2.5">
      {/* Fila Superior: Datos Clave del Paciente, Fase Actual y Tiempos */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Paciente y Entorno */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold shadow">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                {currentCase?.patient.name}
              </span>
              <span className="text-xs font-mono text-slate-400">
                ({currentCase?.patient.age} años, {currentCase?.patient.gender})
              </span>
              
              {/* Badge de fase actual */}
              {phase === 'initial' && (
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 animate-pulse">
                  <Activity className="w-3 h-3" />
                  FASE 1: {currentCase?.type.toUpperCase()} (Evolución Lenta)
                </span>
              )}
              {phase === 'arrest' && (
                <span className="bg-rose-600/30 text-rose-300 border border-rose-500 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black flex items-center gap-1.5 animate-bounce">
                  <HeartCrack className="w-3.5 h-3.5 text-rose-400" />
                  FASE 2: ¡PARO CARDÍACO!
                </span>
              )}
              {(phase === 'rce' || phase === 'post_rce') && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  FASE 3 & 4: RCE LOGRADO
                </span>
              )}
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              <span className="text-cyan-400 font-semibold">{currentCase?.patient.location}</span> — {currentCase?.patient.history}
            </div>
          </div>
        </div>

        {/* Tiempos y Botón de Pauta */}
        <div className="flex items-center gap-2.5">
          {/* Reloj general */}
          <div className="bg-[#0C1424] border border-slate-700/80 px-2.5 py-1 rounded-lg flex items-center gap-2 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <div>
              <div className="text-[8px] text-slate-400 uppercase">Tiempo</div>
              <div className="text-xs font-bold text-slate-200">{formatTime(elapsedSeconds)}</div>
            </div>
          </div>

          {/* Temporizador de Fase 1 (Arritmia Inicial con tiempo configurable) */}
          {phase === 'initial' && (
            <div className="bg-amber-950/40 border border-amber-600/60 px-2.5 py-1 rounded-lg flex items-center gap-2.5 font-mono">
              <div>
                <div className="text-[8px] text-amber-300 uppercase flex items-center gap-1">
                  <span>Hacia el Paro</span>
                  {isTimerPaused && <span className="text-amber-400 font-bold animate-pulse">[PAUSADO]</span>}
                </div>
                <div className="text-xs font-bold text-amber-200">{formatTime(initialPhaseRemaining)}</div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={onTogglePauseTimer}
                  className="text-[9px] bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/50 px-1.5 py-0.5 rounded transition font-bold"
                  title={isTimerPaused ? 'Reanudar evolución hacia el paro' : 'Pausar evolución para dar tiempo de hablar a los alumnos'}
                >
                  {isTimerPaused ? '▶️ Seguir' : '⏸️ Pausar'}
                </button>
                <button
                  onClick={onAddInitialTime}
                  className="text-[9px] bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/50 px-1.5 py-0.5 rounded transition font-bold"
                  title="Sumar 60 segundos más de tiempo antes del paro"
                >
                  +60s
                </button>
                <button
                  onClick={onForceArrest}
                  className="text-[9px] bg-rose-700/80 hover:bg-rose-600 text-rose-100 px-1.5 py-0.5 rounded transition font-bold"
                  title="Avanzar inmediatamente a la fase de Paro Cardíaco"
                >
                  Colapsar Ya
                </button>
              </div>
            </div>
          )}

          {/* Ciclo de RCP (2 min) */}
          {phase === 'arrest' && (
            <div className={`px-2.5 py-1 rounded-lg border flex items-center gap-2 font-mono ${
              cprCycleSeconds >= 120
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-[#0C1424] border-amber-600/60 text-amber-300'
            }`}>
              <div>
                <div className="text-[8px] uppercase">Ciclo RCP</div>
                <div className="text-xs font-bold">{formatTime(cprCycleSeconds)} / 02:00</div>
              </div>
            </div>
          )}

          {/* Botón Ver Pauta Oficial */}
          <button
            onClick={onOpenEvaluation}
            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold rounded-lg shadow-sm transition border border-emerald-400/30"
          >
            Pauta & Nota
          </button>
        </div>

      </div>

      {/* Recuadro de Anuncios Clínicos y Voz del Paciente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        
        {/* 1. Anuncio Clínico Principal (2 Cols) */}
        <div className={`md:col-span-2 p-2.5 rounded-lg border text-xs font-mono flex flex-col justify-between ${
          phase === 'arrest'
            ? 'bg-rose-950/30 border-rose-800 text-rose-200'
            : phase === 'rce' || phase === 'post_rce'
            ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
            : 'bg-[#0E1626] border-slate-800 text-slate-300'
        }`}>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
                Situación Clínica Actual
              </span>
              <span className="text-cyan-400">Objetivo Activo</span>
            </div>
            <p className="leading-relaxed">
              {announcement || currentCase?.patient.presentation}
            </p>
          </div>

          {/* Diálogo del Paciente con botón de voz interactivo */}
          {patientDialogue && phase === 'initial' && (
            <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-amber-300 text-xs italic">
              <span className="truncate pr-2">
                🗣️ Paciente: "{patientDialogue}"
              </span>
              <button
                onClick={handleSpeakPatient}
                className="shrink-0 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition"
                title="Reproducir audio de la voz del paciente"
              >
                <Volume2 className="w-3 h-3" /> Escuchar
              </button>
            </div>
          )}
        </div>

        {/* 2. Estado Físico Rápido (1 Col) */}
        <div className="bg-[#080D18] border border-slate-800 rounded-lg p-2.5 text-xs font-mono flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Evaluación Física
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Conciencia:</span>
              <span className={`font-semibold ${pulsePresent ? 'text-slate-200' : 'text-rose-400 font-bold'}`}>
                {consciousness}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vía Aérea:</span>
              <span className="text-cyan-300 font-semibold">{airwayStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pulso:</span>
              <span className={`font-bold ${pulsePresent ? 'text-emerald-400' : 'text-rose-500 animate-pulse'}`}>
                {pulsePresent ? 'PALPABLE' : '¡SIN PULSO!'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
