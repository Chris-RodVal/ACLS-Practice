import React, { useState } from 'react';
import { Key, ShieldCheck, ExternalLink, X, Check, Cpu } from './Icons';
import { storageService } from '../services/storageService';

export const ApiKeyModal = ({ isOpen, onClose, apiKey, onSaveApiKey }) => {
  const [provider, setProvider] = useState(apiKey && apiKey.startsWith('sk-ant') ? 'anthropic' : 'gemini');
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Conexión de Inteligencia Artificial EUNACOM</h3>
            <p className="text-xs text-slate-400">Elige el proveedor y pega tu API Key para generar exámenes</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Proveedor de IA
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProvider('gemini')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  provider === 'gemini'
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-sm font-bold text-white">Google Gemini</div>
                <div className="text-[11px] text-cyan-400 font-mono">gemini-3.8-flash (Gratis)</div>
              </button>

              <button
                type="button"
                onClick={() => setProvider('anthropic')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  provider === 'anthropic'
                    ? 'bg-purple-950 border-purple-500 text-purple-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-sm font-bold text-white">Anthropic Claude</div>
                <div className="text-[11px] text-purple-400 font-mono">claude-3-5-sonnet</div>
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              {provider === 'gemini' ? 'Google Gemini API Key (AIzaSy...)' : 'Anthropic Claude API Key (sk-ant-api03-...)'}
            </label>
            <div className="relative">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-ant-api03-...'}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
              {keyInput && (
                <div className="absolute right-3 top-2.5 text-emerald-400 flex items-center gap-1 text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>
            
            {provider === 'gemini' ? (
              <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                <span>¿No tienes una API key?</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-0.5"
                >
                  Obtén tu API Key gratis en Google AI Studio <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1.5">
                Obtenla en <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">console.anthropic.com</a> (debe comenzar con <code className="text-white">sk-ant-api03-</code>).
              </p>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-xs text-slate-400">
            🔒 <strong className="text-slate-300">Privacidad local:</strong> Tu clave se guarda en tu navegador y no se comparte con terceros.
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>¡Guardado!</span>
                </>
              ) : (
                <span>Guardar Clave</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
