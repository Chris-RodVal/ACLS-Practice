/**
 * Cliente API para comunicarse con el E-Sword Bridge Server local.
 */

const DEFAULT_BRIDGE_URL = 'http://localhost:52914';

export interface VerseData {
  book: number;
  chapter: number;
  verse: number;
  text: string;
  html: string;
}

export interface BibleResult {
  version: string;
  abbreviation: string;
  reference: string;
  verses: VerseData[];
}

export interface CompareVersionEntry {
  version: string;
  abbreviation: string;
  filename: string;
  verses: { verse: number; text: string; html: string }[];
  fullText: string;
}

export interface CompareResult {
  reference: string;
  book: number;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  versions: CompareVersionEntry[];
}

export interface CommentaryEntry {
  source: string;
  abbreviation: string;
  filename: string;
  entries: { text: string; html: string }[];
}

export interface CommentaryResult {
  reference: string;
  commentaries: CommentaryEntry[];
}

export interface DictionaryEntryItem {
  word: string;
  definition: string;
  html: string;
}

export interface DictionaryResult {
  query: string;
  dictionaries: {
    source: string;
    abbreviation: string;
    filename: string;
    entries: DictionaryEntryItem[];
  }[];
}

export interface ModuleInfo {
  path: string;
  filename: string;
  description: string;
  abbreviation: string;
  hasStrongs: boolean;
  rightToLeft: boolean;
}

export interface ModulesResult {
  bibles: ModuleInfo[];
  commentaries: ModuleInfo[];
  dictionaries: ModuleInfo[];
  basePath: string;
}

export interface ParsedReference {
  book: number;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  bookName: string;
  bookNameEn: string;
}

class ESwordBridgeClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || DEFAULT_BRIDGE_URL;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await window.fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `Error HTTP ${response.status}`);
    }

    return response.json();
  }

  /** Verificar si el bridge está corriendo */
  async healthCheck(): Promise<boolean> {
    try {
      await this.fetch('/api/health');
      return true;
    } catch {
      return false;
    }
  }

  /** Obtener todos los módulos disponibles */
  async getModules(): Promise<ModulesResult> {
    return this.fetch('/api/modules');
  }

  /** Obtener un versículo de una Biblia específica */
  async getVerse(filename: string, book: number, chapter: number, verseStart: number, verseEnd?: number): Promise<BibleResult> {
    let url = `/api/bible/${encodeURIComponent(filename)}/${book}/${chapter}/${verseStart}`;
    if (verseEnd && verseEnd !== verseStart) {
      url += `?verseEnd=${verseEnd}`;
    }
    return this.fetch(url);
  }

  /** Vista comparativa: obtener pasaje de TODAS las Biblias */
  async compare(book: number, chapter: number, verseStart: number, verseEnd?: number): Promise<CompareResult> {
    let url = `/api/compare/${book}/${chapter}/${verseStart}`;
    if (verseEnd && verseEnd !== verseStart) {
      url += `?verseEnd=${verseEnd}`;
    }
    return this.fetch(url);
  }

  /** Obtener comentarios para un versículo */
  async getCommentary(book: number, chapter: number, verse: number): Promise<CommentaryResult> {
    return this.fetch(`/api/commentary/${book}/${chapter}/${verse}`);
  }

  /** Buscar en diccionarios */
  async searchDictionary(query: string): Promise<DictionaryResult> {
    return this.fetch(`/api/dictionary/search/${encodeURIComponent(query)}`);
  }

  /** Buscar número Strong */
  async getStrongs(number: string): Promise<any> {
    return this.fetch(`/api/strongs/${encodeURIComponent(number)}`);
  }

  /** Parsear una referencia bíblica de texto */
  async parseReference(reference: string): Promise<ParsedReference> {
    return this.fetch('/api/parse-reference', {
      method: 'POST',
      body: JSON.stringify({ reference }),
    });
  }
}

// Singleton
export const bridgeClient = new ESwordBridgeClient();
export default bridgeClient;
