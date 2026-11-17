/**
 * E-Sword Sidebar Widget
 * 
 * Panel lateral en RemNote que muestra:
 * - Estado de conexión con el bridge
 * - Módulos disponibles (Biblias, Comentarios, Diccionarios)
 * - Búsqueda rápida de referencia bíblica
 */

import React, { useState, useEffect, useCallback } from 'react';
import { renderWidget, usePlugin } from '@remnote/plugin-sdk';
import bridgeClient, { ModulesResult } from '../lib/bridge-client';
import '../styles.css';

function ESwordSidebar() {
  const plugin = usePlugin();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [modules, setModules] = useState<ModulesResult | null>(null);
  const [quickRef, setQuickRef] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Configurar bridge URL
  useEffect(() => {
    (async () => {
      try {
        const url = await plugin.settings.getSetting<string>('bridge-url');
        if (url) bridgeClient.setBaseUrl(url);
      } catch {}
      checkConnection();
    })();
  }, [plugin]);

  const checkConnection = useCallback(async () => {
    const connected = await bridgeClient.healthCheck();
    setIsConnected(connected);
    if (connected) {
      try {
        const mods = await bridgeClient.getModules();
        setModules(mods);
      } catch {}
    }
  }, []);

  // Abrir el popup con una referencia rápida
  const handleQuickLookup = useCallback(async () => {
    if (!quickRef.trim()) return;
    setIsLoading(true);
    try {
      await plugin.storage.setSession('pendingReference', quickRef);
      await plugin.storage.setSession('popupTab', '');
      await plugin.storage.setSession('popupTrigger', Date.now());
      await plugin.window.openFloatingWidget('bible_popup', {
        top: 100,
        left: Math.max(100, (window.innerWidth - 720) / 2),
      });
    } catch (err: any) {
      await plugin.app.toast(`❌ Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [quickRef, plugin]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleQuickLookup();
  };

  return (
    <div className="sidebar-container">
      {/* Título */}
      <div className="sidebar-title">
        📖 E-Sword Bible
        <span
          className={`status-dot ${isConnected ? 'online' : 'offline'}`}
          title={isConnected ? 'Conectado' : 'Desconectado'}
        />
      </div>

      {/* Estado de conexión */}
      {isConnected === false && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 'var(--esword-radius)',
          padding: 10,
          marginBottom: 12,
          fontSize: 12,
        }}>
          <strong style={{ color: '#dc2626' }}>⚠️ Bridge desconectado</strong>
          <p style={{ marginTop: 4, color: '#7f1d1d' }}>
            Ejecuta el servidor bridge:<br />
            <code style={{ background: '#fee2e2', padding: '1px 4px', borderRadius: 3 }}>
              cd bridge && npm start
            </code>
          </p>
          <button
            className="btn btn-sm btn-secondary"
            style={{ marginTop: 6 }}
            onClick={checkConnection}
          >
            🔄 Reintentar
          </button>
        </div>
      )}

      {isConnected === null && (
        <div className="loading-container" style={{ padding: 20 }}>
          <div className="spinner" />
          <span style={{ fontSize: 12 }}>Conectando...</span>
        </div>
      )}

      {/* Búsqueda rápida */}
      {isConnected && (
        <div className="sidebar-section">
          <h3>🔍 Búsqueda rápida</h3>
          <div className="ref-input-container">
            <input
              className="search-input"
              type="text"
              placeholder="Juan 3:16..."
              value={quickRef}
              onChange={(e) => setQuickRef(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ fontSize: 13 }}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleQuickLookup}
              disabled={isLoading}
            >
              {isLoading ? '...' : '📖'}
            </button>
          </div>
        </div>
      )}

      {/* Módulos disponibles */}
      {modules && (
        <>
          {/* Biblias */}
          <div className="sidebar-section">
            <h3>📗 Biblias ({modules.bibles.length})</h3>
            <ul className="module-list">
              {modules.bibles.map((bible, idx) => (
                <li className="module-item" key={idx}>
                  <span className="module-icon">📗</span>
                  <span style={{ flex: 1 }}>{bible.abbreviation || bible.description}</span>
                  {bible.hasStrongs && (
                    <span style={{ fontSize: 10, color: 'var(--esword-primary)', fontWeight: 600 }}>
                      Strong
                    </span>
                  )}
                </li>
              ))}
              {modules.bibles.length === 0 && (
                <li className="module-item" style={{ color: 'var(--esword-text-muted)' }}>
                  No se encontraron Biblias
                </li>
              )}
            </ul>
          </div>

          {/* Comentarios */}
          <div className="sidebar-section">
            <h3>📘 Comentarios ({modules.commentaries.length})</h3>
            <ul className="module-list">
              {modules.commentaries.map((cmt, idx) => (
                <li className="module-item" key={idx}>
                  <span className="module-icon">📘</span>
                  <span>{cmt.abbreviation || cmt.description}</span>
                </li>
              ))}
              {modules.commentaries.length === 0 && (
                <li className="module-item" style={{ color: 'var(--esword-text-muted)' }}>
                  No se encontraron comentarios
                </li>
              )}
            </ul>
          </div>

          {/* Diccionarios */}
          <div className="sidebar-section">
            <h3>📙 Diccionarios ({modules.dictionaries.length})</h3>
            <ul className="module-list">
              {modules.dictionaries.map((dict, idx) => (
                <li className="module-item" key={idx}>
                  <span className="module-icon">📙</span>
                  <span>{dict.abbreviation || dict.description}</span>
                </li>
              ))}
              {modules.dictionaries.length === 0 && (
                <li className="module-item" style={{ color: 'var(--esword-text-muted)' }}>
                  No se encontraron diccionarios
                </li>
              )}
            </ul>
          </div>

          {/* Ruta de módulos */}
          <div className="sidebar-section">
            <h3>📂 Ruta de módulos</h3>
            <p style={{
              fontSize: 11,
              color: 'var(--esword-text-muted)',
              wordBreak: 'break-all',
              background: 'var(--esword-bg-hover)',
              padding: 6,
              borderRadius: 4,
            }}>
              {modules.basePath}
            </p>
          </div>
        </>
      )}

      {/* Atajos */}
      {isConnected && (
        <div className="sidebar-section" style={{ marginTop: 8 }}>
          <h3>⌨️ Comandos</h3>
          <div style={{ fontSize: 12, color: 'var(--esword-text-secondary)' }}>
            <div style={{ marginBottom: 4 }}>
              <code style={{ background: 'var(--esword-bg-hover)', padding: '1px 4px', borderRadius: 3 }}>
                /bible
              </code>{' '}
              — Buscar referencia
            </div>
            <div style={{ marginBottom: 4 }}>
              <code style={{ background: 'var(--esword-bg-hover)', padding: '1px 4px', borderRadius: 3 }}>
                /comm
              </code>{' '}
              — Ver comentarios
            </div>
            <div style={{ marginBottom: 4 }}>
              <code style={{ background: 'var(--esword-bg-hover)', padding: '1px 4px', borderRadius: 3 }}>
                /dict
              </code>{' '}
              — Buscar en diccionario
            </div>
            <div>
              <code style={{ background: 'var(--esword-bg-hover)', padding: '1px 4px', borderRadius: 3 }}>
                /strong
              </code>{' '}
              — Número Strong
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

renderWidget(ESwordSidebar);
