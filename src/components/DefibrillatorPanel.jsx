import React, { useState, useEffect } from 'react';
import { Zap, Volume2, VolumeX, FileText, Radio, CheckCircle2, AlertTriangle } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export default function DefibrillatorPanel({
  joules = 200,
  onSelectJoules = () => {},
  isSync = false,
  onToggleSync = () => {},
  isCharged = false,
  isCharging = false,
  onStartCharge = () => {},
  onDeliverShock = () => {},
  isPacingActive = false,
  pacerRate = 70,
  pacerMa = 60,
  onTogglePacing = () => {},
  onChangePacerRate = () => {},
  onChangePacerMa = () => {},
  onOpen12Lead = () => {},
  isMuted = false,
  onToggleMute = () => {},
  isVoiceMuted = false,
  onToggleVoice = () => {}
}) {
  const energyOptions = [50, 100, 150, 200, 300, 360];

  return (
    <div className="bg-[#0C1425] border-t border-slate-800 p-3 flex flex-wrap items-center justify-between gap-4">
      {/* 1. Defibrillation Controls */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase tracking-wider">
            ENERGÍA DESFIBRILADOR (BIFÁSICO)
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            {energyOptions.map((j) => (
              <button
                key={j}
                onClick={() => {
                  soundEngine.init();
                  soundEngine.playButtonClick();
                  onSelectJoules(j);
                }}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded transition ${
                  joules === j
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {j}J
              </button>
            ))}
          </div>
        </div>

        {/* SYNC Button */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">
            CARDIOVERSIÓN
          </span>
          <button
            onClick={() => {
              soundEngine.init();
              soundEngine.playButtonClick();
              onToggleSync();
            }}
            className={`mt-1 px-3 py-1.5 rounded font-mono text-xs font-bold transition flex items-center gap-1.5 border ${
              isSync
                ? 'bg-sky-500 text-slate-950 border-sky-300 shadow-md shadow-sky-500/40'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Activa el modo sincronizado en la onda R para cardioversión de taquicardias con pulso"
          >
            <Radio className="w-3.5 h-3.5" />
            SYNC {isSync ? 'ACTIVO' : 'OFF'}
          </button>
        </div>

        {/* CARGAR Button */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">
            CONDENSADOR
          </span>
          <button
            onClick={onStartCharge}
            disabled={isCharging || isCharged}
            className={`mt-1 px-4 py-1.5 rounded font-mono text-xs font-bold transition border ${
              isCharged
                ? 'bg-emerald-900/60 text-emerald-300 border-emerald-600 cursor-default'
                : isCharging
                ? 'bg-amber-600 text-white animate-pulse border-amber-400'
                : 'bg-amber-600 hover:bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-md shadow-amber-600/30'
            }`}
          >
            {isCharging ? 'CARGANDO...' : isCharged ? `CARGADO (${joules}J)` : `CARGAR (${joules}J)`}
          </button>
        </div>

        {/* DESCARGA Button (High Voltage Shock) */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">
            DESCARGAR
          </span>
          <button
            onClick={onDeliverShock}
            disabled={!isCharged}
            className={`mt-1 px-5 py-2 rounded-lg font-mono text-sm font-black tracking-wider transition border-2 flex items-center gap-2 ${
              isCharged
                ? 'bg-red-600 hover:bg-red-500 text-white border-red-300 shadow-xl shadow-red-600/50 animate-bounce'
                : 'bg-slate-800/60 text-slate-600 border-slate-800 cursor-not-allowed'
            }`}
            title="Aplica la descarga eléctrica sobre el tórax"
          >
            <Zap className="w-4 h-4 fill-current" />
            DESCARGA
          </button>
        </div>
      </div>

      {/* 2. Transcutaneous Pacer Controls (Marcapasos) */}
      <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-mono font-semibold uppercase">
            MARCAPASOS TRANSCUTÁNEO
          </span>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={onTogglePacing}
              className={`px-3 py-1 rounded font-mono text-xs font-bold border transition ${
                isPacingActive
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
              }`}
            >
              {isPacingActive ? 'PACING ON' : 'PACING OFF'}
            </button>

            {/* Rate */}
            <div className="flex items-center bg-slate-900 rounded border border-slate-700 px-1.5 py-0.5">
              <span className="text-[10px] text-slate-400 font-mono mr-1.5">FC:</span>
              <button
                disabled={!isPacingActive}
                onClick={() => onChangePacerRate(Math.max(40, pacerRate - 10))}
                className="text-xs px-1 hover:text-purple-300 text-slate-300 font-mono font-bold"
              >-</button>
              <span className="text-xs font-mono font-bold text-purple-300 px-1">{pacerRate}</span>
              <button
                disabled={!isPacingActive}
                onClick={() => onChangePacerRate(Math.min(120, pacerRate + 10))}
                className="text-xs px-1 hover:text-purple-300 text-slate-300 font-mono font-bold"
              >+</button>
              <span className="text-[9px] text-slate-500 font-mono ml-0.5">lpm</span>
            </div>

            {/* Output mA */}
            <div className="flex items-center bg-slate-900 rounded border border-slate-700 px-1.5 py-0.5">
              <span className="text-[10px] text-slate-400 font-mono mr-1.5">mA:</span>
              <button
                disabled={!isPacingActive}
                onClick={() => onChangePacerMa(Math.max(10, pacerMa - 10))}
                className="text-xs px-1 hover:text-purple-300 text-slate-300 font-mono font-bold"
              >-</button>
              <span className="text-xs font-mono font-bold text-purple-300 px-1">{pacerMa}</span>
              <button
                disabled={!isPacingActive}
                onClick={() => onChangePacerMa(Math.min(180, pacerMa + 10))}
                className="text-xs px-1 hover:text-purple-300 text-slate-300 font-mono font-bold"
              >+</button>
              <span className="text-[9px] text-slate-500 font-mono ml-0.5">mA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Utility buttons (12 Leads & Audio) */}
      <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
        <button
          onClick={onOpen12Lead}
          className="bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-300 border border-indigo-700/60 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow"
          title="Ver registro electrocardiográfico completo de 12 derivaciones"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          ECG 12 DERIVACIONES
        </button>

        <button
          onClick={onToggleVoice}
          className={`px-2 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 transition ${
            isVoiceMuted
              ? 'bg-slate-900 border-slate-700 text-slate-500'
              : 'bg-cyan-950/80 border-cyan-700/60 text-cyan-300'
          }`}
          title={isVoiceMuted ? 'Activar voz del paciente y narrador' : 'Silenciar voz del paciente y narrador'}
        >
          🗣️ {isVoiceMuted ? 'Voz OFF' : 'Voz ON'}
        </button>

        <button
          onClick={onToggleMute}
          className={`p-1.5 rounded-lg border transition ${
            isMuted
              ? 'bg-rose-950/70 border-rose-800 text-rose-400'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
          }`}
          title={isMuted ? 'Activar beeps y alarmas del monitor' : 'Silenciar beeps y alarmas'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
