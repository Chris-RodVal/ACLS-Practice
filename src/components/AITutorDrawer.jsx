import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2 } from './Icons';
import { askAITutor } from '../services/aiService';
import { storageService } from '../services/storageService';

export const AITutorDrawer = ({ isOpen, onClose, contextData, apiKey }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu Tutor Médico IA para el EUNACOM (Chile). ¿Tienes alguna duda sobre la conducta clínica, diagnóstico o tratamiento según las Guías Clínicas MINSAL / GES de este caso?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuery = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);

    setLoading(true);
    try {
      const model = storageService.getModel();
      const reply = await askAITutor({
        question: userQuery,
        clinicalCase: contextData?.clinicalCase,
        currentQuestion: contextData?.question,
        apiKey,
        modelName: model
      });

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `⚠️ Error: ${err.message || 'No se pudo obtener respuesta de la IA. Verifica tu API Key.'}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#0D1322] border-l border-slate-800 shadow-2xl flex flex-col animate-slide-left">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Tutor Especialista IA EUNACOM</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </h3>
            <p className="text-[11px] text-slate-400">Resolución de dudas clínicas MINSAL Chile</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400 border border-slate-700'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-100 rounded-tr-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 bg-slate-900 p-3 rounded-xl border border-slate-800 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>El especialista IA está analizando las Guías Clínicas MINSAL...</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-900/90 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu duda clínica sobre este caso EUNACOM..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-40 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
