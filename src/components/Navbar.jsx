import React from 'react';
import { Activity, Key, Sparkles, BookOpen, BarChart3, PlusCircle } from './Icons';

export const Navbar = ({ apiKey, onOpenApiKeyModal, activeTab, setActiveTab, onNewExam }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0D1322]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with ECG Animation */}
        <div 
          onClick={() => setActiveTab('generator')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                MED<span className="text-cyan-400">PULSE</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                EUNACOM AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Simulador EUNACOM Chile & Guías Clínicas MINSAL
            </p>
          </div>
        </div>

        {/* Navigation items for desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'generator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Generar Caso</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'library'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Biblioteca</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'stats'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Rendimiento</span>
          </button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewExam}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-semibold text-sm hover:from-cyan-400 hover:to-teal-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nuevo Examen</span>
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              apiKey
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 hover:border-emerald-400'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:border-amber-400 animate-pulse'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {apiKey ? 'API Key Conectada' : 'Configurar API Key'}
            </span>
            <span className="sm:hidden">
              {apiKey ? 'API OK' : 'Key'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
