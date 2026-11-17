/**
 * E-Sword Bible Popup Widget
 * 
 * Popup flotante principal con 3 pestañas:
 * 1. Versiones comparativas - muestra el pasaje en todas las Biblias disponibles
 * 2. Comentarios - muestra comentarios de todos los módulos de comentarios
 * 3. Diccionario multiléxico - búsqueda en diccionarios y léxicos
 * 
 * Cada sección tiene un botón "Pegar en RemNote" que inserta el texto seleccionado.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { renderWidget, usePlugin, useSessionStorageState } from '@remnote/plugin-sdk';
import bridgeClient, {
  CompareResult,
  CommentaryResult,
  DictionaryResult,
} from '../lib/bridge-client';
import '../styles.css';

type TabId = 'versions' | 'commentary' | 'dictionary';

function BiblePopup() {
  const plugin = usePlugin();

  // Estado del popup
  const [activeTab, setActiveTab] = useState<TabId>('versions');
  const [referenceInput, setReferenceInput] = useState('');
  const [dictSearchInput, setDictSearchInput] = useState('');
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Datos cargados
  const [compareData, setCompareData] = useState<CompareResult | null>(null);
  const [commentaryData, setCommentaryData] = useState<CommentaryResult | null>(null);
  const [dictionaryData, setDictionaryData] = useState<DictionaryResult | null>(null);

  // Session storage triggers desde el command
  const [pendingRef] = useSessionStorageState<string>('pendingReference', '');
  const [popupTab] = useSessionStorageState<string>('popupTab', '');
  const [popupTrigger] = useSessionStorageState<number>('popupTrigger', 0);

  // Parsear referencia y coordenadas
  const [parsedRef, setParsedRef] = useState<{
    book: number; chapter: number; verseStart: number; verseEnd: number; bookName: string;
  } | null>(null);

  // Configurar bridge URL desde settings
  useEffect(() => {
    (async () => {
      try {
        const url = await plugin.settings.getSetting<string>('bridge-url');
        if (url) bridgeClient.setBaseUrl(url);
      } catch {}
    })();
  }, [plugin]);

  // Verificar conexión con el bridge
  useEffect(() => {
    bridgeClient.healthCheck().then(setIsConnected);
  }, []);

  // Cuando el command envía una referencia pendiente
  useEffect(() => {
    if (popupTrigger && pendingRef) {
      setReferenceInput(pendingRef);
      if (popupTab === 'dictionary') {
        setActiveTab('dictionary');
        setDictSearchInput(pendingRef);
        handleDictionarySearch(pendingRef);
      } else if (popupTab === 'commentary') {
        setActiveTab('commentary');
        handleLookup(pendingRef);
      } else {
        setActiveTab('versions');
        handleLookup(pendingRef);
      }
    }
  }, [popupTrigger]);

  // Buscar referencia bíblica
  const handleLookup = useCallback(async (ref?: string) => {
    const refToUse = ref || referenceInput;
    if (!refToUse.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Parsear la referencia
      const parsed = await bridgeClient.parseReference(refToUse);
      setParsedRef(parsed);

      // Cargar datos comparativos y comentarios en paralelo
      const [compare, commentary] = await Promise.all([
        bridgeClient.compare(parsed.book, parsed.chapter, parsed.verseStart, parsed.verseEnd),
        bridgeClient.getCommentary(parsed.book, parsed.chapter, parsed.verseStart),
      ]);

      setCompareData(compare);
      setCommentaryData(commentary);
    } catch (err: any) {
      setError(err.message || 'Error al buscar la referencia');
    } finally {
      setIsLoading(false);
    }
  }, [referenceInput]);

  // Buscar en diccionario
  const handleDictionarySearch = useCallback(async (query?: string) => {
    const q = query || dictSearchInput;
    if (!q.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Intentar primero como Strong number, luego como texto
      let result: DictionaryResult;
      if (/^[HG]\d+$/i.test(q.trim())) {
        const strongResult = await bridgeClient.getStrongs(q.trim());
        result = {
          query: q,
          dictionaries: strongResult.entries?.length > 0
            ? [{
                source: strongResult.entries[0].source,
                abbreviation: '',
                filename: '',
                entries: strongResult.entries.map((e: any) => ({
                  word: e.word,
                  definition: e.definition,
                  html: e.html,
                })),
              }]
            : [],
        };
      } else {
        result = await bridgeClient.searchDictionary(q);
      }
      setDictionaryData(result);
    } catch (err: any) {
      setError(err.message || 'Error al buscar en diccionario');
    } finally {
      setIsLoading(false);
    }
  }, [dictSearchInput]);

  // Pegar texto en RemNote
  const handlePaste = useCallback(async (text: string, label: string) => {
    try {
      const focusedRemId = await plugin.focus.getFocusedRem();
      if (focusedRemId) {
        // Insertar como nuevo Rem hijo
        const newRem = await plugin.rem.createRem();
        if (newRem) {
          await newRem.setText([text]);
          await newRem.setParent(focusedRemId);
        }
      } else {
        // Si no hay Rem enfocado, crear uno nuevo
        await plugin.rem.createSingleRemWithMarkdown(text);
      }

      setSuccessMsg(`✅ ${label} pegado en RemNote`);
      setTimeout(() => setSuccessMsg(null), 2500);
      await plugin.app.toast(`📖 ${label} pegado exitosamente`);
    } catch (err: any) {
      await plugin.app.toast(`❌ Error al pegar: ${err.message}`);
    }
  }, [plugin]);

  // Manejar Enter en inputs
  const handleRefKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLookup();
  };
  const handleDictKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleDictionarySearch();
  };

  // ---- Render ----

  if (isConnected === false) {
    return (
      <div className="popup-container">
        <div className="error-container">
          <div className="error-icon">🔌</div>
          <h3>Bridge Server no conectado</h3>
          <p style={{ marginTop: 8, fontSize: 13, color: 'var(--esword-text-secondary)' }}>
            Asegúrate de que el servidor bridge esté corriendo.<br />
            Ejecuta: <code style={{ background: 'var(--esword-bg-hover)', padding: '2px 6px', borderRadius: 4 }}>
              cd bridge && npm start
            </code>
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => bridgeClient.healthCheck().then(setIsConnected)}
          >
            🔄 Reintentar conexión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-container">
      {/* Header */}
      <div className="popup-header">
        <h2>
          📖 E-Sword
          {parsedRef && (
            <span className="reference-badge">{compareData?.reference || referenceInput}</span>
          )}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="status-dot online" title="Conectado al bridge" />
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '12px 16px 0' }}>
        {activeTab === 'dictionary' ? (
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Buscar palabra, Strong (H0001, G3056)..."
              value={dictSearchInput}
              onChange={(e) => setDictSearchInput(e.target.value)}
              onKeyDown={handleDictKeyDown}
              autoFocus
            />
            <button className="btn btn-primary" onClick={() => handleDictionarySearch()}>
              🔍 Buscar
            </button>
          </div>
        ) : (
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Referencia: Juan 3:16, Gn 1:1-5, Sal 23:1..."
              value={referenceInput}
              onChange={(e) => setReferenceInput(e.target.value)}
              onKeyDown={handleRefKeyDown}
              autoFocus
            />
            <button className="btn btn-primary" onClick={() => handleLookup()}>
              🔍 Buscar
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs-bar">
        <button
          className={`tab-btn ${activeTab === 'versions' ? 'active' : ''}`}
          onClick={() => setActiveTab('versions')}
        >
          <span className="tab-icon">📚</span>
          Versiones
          {compareData && (
            <span className="tab-count">{compareData.versions.length}</span>
          )}
        </button>
        <button
          className={`tab-btn ${activeTab === 'commentary' ? 'active' : ''}`}
          onClick={() => setActiveTab('commentary')}
        >
          <span className="tab-icon">📝</span>
          Comentarios
          {commentaryData && (
            <span className="tab-count">{commentaryData.commentaries.length}</span>
          )}
        </button>
        <button
          className={`tab-btn ${activeTab === 'dictionary' ? 'active' : ''}`}
          onClick={() => setActiveTab('dictionary')}
        >
          <span className="tab-icon">📖</span>
          Diccionario
          {dictionaryData && (
            <span className="tab-count">{dictionaryData.dictionaries.length}</span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="popup-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner" />
            <span>Buscando en módulos de E-Sword...</span>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
            <button className="btn btn-secondary" style={{ marginTop: 12 }} onClick={() => setError(null)}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {/* Tab: Versiones comparativas */}
            {activeTab === 'versions' && (
              <VersionsTab
                data={compareData}
                onPaste={handlePaste}
              />
            )}

            {/* Tab: Comentarios */}
            {activeTab === 'commentary' && (
              <CommentaryTab
                data={commentaryData}
                onPaste={handlePaste}
              />
            )}

            {/* Tab: Diccionario */}
            {activeTab === 'dictionary' && (
              <DictionaryTab
                data={dictionaryData}
                onPaste={handlePaste}
              />
            )}
          </>
        )}
      </div>

      {/* Success Toast */}
      {successMsg && <div className="paste-success">{successMsg}</div>}
    </div>
  );
}

// ============================================
// Sub-components
// ============================================

interface VersionsTabProps {
  data: CompareResult | null;
  onPaste: (text: string, label: string) => void;
}

function VersionsTab({ data, onPaste }: VersionsTabProps) {
  if (!data) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <p>Escribe una referencia bíblica arriba para ver la comparación entre versiones.</p>
        <p style={{ fontSize: 12, marginTop: 4 }}>Ejemplo: Juan 3:16, Gn 1:1-5, Sal 23:1</p>
      </div>
    );
  }

  if (data.versions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>No se encontraron versiones para {data.reference}</p>
      </div>
    );
  }

  return (
    <>
      {/* Botón para pegar TODAS las versiones */}
      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            const allText = data.versions
              .map(v => `**${v.abbreviation || v.version}** — ${v.fullText}`)
              .join('\n\n');
            const header = `### ${data.reference}\n\n`;
            onPaste(header + allText, 'Todas las versiones');
          }}
        >
          📋 Pegar todas las versiones
        </button>
      </div>

      {data.versions.map((version, idx) => (
        <div className="version-card" key={idx}>
          <div className="version-card-header">
            <span className="version-name">{version.version}</span>
            <span className="version-abbrev">{version.abbreviation}</span>
          </div>
          <div className="version-card-body">
            <div className="verse-text">
              {version.verses.map((v, vi) => (
                <span key={vi}>
                  <sup className="verse-number">{v.verse}</sup>
                  {v.text}{' '}
                </span>
              ))}
            </div>
          </div>
          <div className="version-card-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                const text = `**${data.reference}** (${version.abbreviation || version.version})\n${version.fullText}`;
                onPaste(text, version.abbreviation || version.version);
              }}
            >
              📋 Pegar esta versión
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                const text = version.fullText;
                onPaste(text, `${version.abbreviation} (solo texto)`);
              }}
            >
              📝 Solo texto
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

interface CommentaryTabProps {
  data: CommentaryResult | null;
  onPaste: (text: string, label: string) => void;
}

function CommentaryTab({ data, onPaste }: CommentaryTabProps) {
  if (!data) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <p>Busca una referencia bíblica para ver los comentarios disponibles.</p>
      </div>
    );
  }

  if (data.commentaries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>No se encontraron comentarios para {data.reference}</p>
      </div>
    );
  }

  return (
    <>
      {data.commentaries.map((cmt, idx) => (
        <div className="commentary-card" key={idx}>
          <div className="commentary-card-header">
            <span className="commentary-source">📝 {cmt.source}</span>
            <span style={{ fontSize: 11, color: '#b45309' }}>{cmt.abbreviation}</span>
          </div>
          <div className="commentary-body">
            {cmt.entries.map((entry, ei) => (
              <div key={ei}>{entry.text}</div>
            ))}
          </div>
          <div className="commentary-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                const text = `**${data.reference} — Comentario (${cmt.source})**\n\n${cmt.entries.map(e => e.text).join('\n\n')}`;
                onPaste(text, `Comentario ${cmt.source}`);
              }}
            >
              📋 Pegar comentario
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

interface DictionaryTabProps {
  data: DictionaryResult | null;
  onPaste: (text: string, label: string) => void;
}

function DictionaryTab({ data, onPaste }: DictionaryTabProps) {
  if (!data) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📖</div>
        <p>Escribe una palabra o número Strong para buscar en los diccionarios multiléxicos.</p>
        <p style={{ fontSize: 12, marginTop: 4 }}>Ejemplo: gracia, H0430, G3056, amor</p>
      </div>
    );
  }

  if (data.dictionaries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>No se encontraron resultados para "{data.query}"</p>
      </div>
    );
  }

  return (
    <>
      {data.dictionaries.map((dict, idx) => (
        <div key={idx}>
          <h4 style={{ fontSize: 13, color: 'var(--esword-text-secondary)', marginBottom: 8, marginTop: idx > 0 ? 16 : 0 }}>
            📖 {dict.source}
          </h4>
          {dict.entries.map((entry, ei) => (
            <div className="dictionary-card" key={ei}>
              <div className="dictionary-card-header">
                <span className="dictionary-word">{entry.word}</span>
                <span className="dictionary-source">{dict.source}</span>
              </div>
              <div className="dictionary-body">
                {entry.definition}
              </div>
              <div className="dictionary-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const text = `**${entry.word}** (${dict.source})\n\n${entry.definition}`;
                    onPaste(text, `Diccionario: ${entry.word}`);
                  }}
                >
                  📋 Pegar definición
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    onPaste(entry.definition, `${entry.word} (solo texto)`);
                  }}
                >
                  📝 Solo texto
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

renderWidget(BiblePopup);
