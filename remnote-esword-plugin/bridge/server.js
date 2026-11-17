/**
 * E-Sword Bridge Server
 * 
 * Servidor local que lee los archivos SQLite de E-Sword (.bbli, .bblx, .cmti, .cmtx, .dcti, .dctx)
 * y los expone a través de una API HTTP para que el plugin de RemNote los consuma.
 * 
 * Puerto predeterminado: 52914
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.ESWORD_BRIDGE_PORT || 52914;
const PLUGIN_PORT = process.env.REMNOTE_PLUGIN_PORT || 8095;

// Carpetas predeterminadas donde se buscan módulos E-Sword
const CANDIDATE_PATHS = [
  process.env.ESWORD_MODULES_PATH,
  path.join(os.homedir(), 'Desktop', 'Escuela Discipulado', 'E-Sword-New'),
  path.join(os.homedir(), 'Desktop', 'Escuela Discipulado', 'E-Sword'),
  path.join(os.homedir(), 'Desktop', 'Escuela Discipulado'),
  path.join(os.homedir(), 'Desktop', 'E-Sword-New'),
  path.join(os.homedir(), 'Desktop', 'e-Sword')
].filter(Boolean);

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// ---------- Mapeo de libros bíblicos (1 a 66) ----------
const BOOK_NAMES = {
  1: 'Génesis', 2: 'Éxodo', 3: 'Levítico', 4: 'Números', 5: 'Deuteronomio',
  6: 'Josué', 7: 'Jueces', 8: 'Rut', 9: '1 Samuel', 10: '2 Samuel',
  11: '1 Reyes', 12: '2 Reyes', 13: '1 Crónicas', 14: '2 Crónicas',
  15: 'Esdras', 16: 'Nehemías', 17: 'Ester', 18: 'Job', 19: 'Salmos',
  20: 'Proverbios', 21: 'Eclesiastés', 22: 'Cantares', 23: 'Isaías',
  24: 'Jeremías', 25: 'Lamentaciones', 26: 'Ezequiel', 27: 'Daniel',
  28: 'Oseas', 29: 'Joel', 30: 'Amós', 31: 'Abdías', 32: 'Jonás',
  33: 'Miqueas', 34: 'Nahúm', 35: 'Habacuc', 36: 'Sofonías',
  37: 'Hageo', 38: 'Zacarías', 39: 'Malaquías',
  40: 'Mateo', 41: 'Marcos', 42: 'Lucas', 43: 'Juan', 44: 'Hechos',
  45: 'Romanos', 46: '1 Corintios', 47: '2 Corintios', 48: 'Gálatas',
  49: 'Efesios', 50: 'Filipenses', 51: 'Colosenses',
  52: '1 Tesalonicenses', 53: '2 Tesalonicenses',
  54: '1 Timoteo', 55: '2 Timoteo', 56: 'Tito', 57: 'Filemón',
  58: 'Hebreos', 59: 'Santiago', 60: '1 Pedro', 61: '2 Pedro',
  62: '1 Juan', 63: '2 Juan', 64: '3 Juan', 65: 'Judas', 66: 'Apocalipsis',
};

// Diccionario de abreviaturas normalizadas
const BOOK_ABBREVS = {
  'gn': 1, 'gen': 1, 'genesis': 1,
  'ex': 2, 'exo': 2, 'exodo': 2,
  'lv': 3, 'lev': 3, 'levitico': 3,
  'nm': 4, 'num': 4, 'numeros': 4,
  'dt': 5, 'deu': 5, 'deut': 5, 'deuteronomio': 5,
  'jos': 6, 'josue': 6,
  'jue': 7, 'jueces': 7, 'jdg': 7,
  'rt': 8, 'rut': 8, 'ruth': 8,
  '1sa': 9, '1sam': 9, '1 samuel': 9, '1samuel': 9,
  '2sa': 10, '2sam': 10, '2 samuel': 10, '2samuel': 10,
  '1re': 11, '1rey': 11, '1 reyes': 11, '1reyes': 11, '1ki': 11, '1 kings': 11,
  '2re': 12, '2rey': 12, '2 reyes': 12, '2reyes': 12, '2ki': 12, '2 kings': 12,
  '1cr': 13, '1cro': 13, '1 cronicas': 13, '1cronicas': 13, '1ch': 13,
  '2cr': 14, '2cro': 14, '2 cronicas': 14, '2cronicas': 14, '2ch': 14,
  'esd': 15, 'esdras': 15, 'ezr': 15,
  'neh': 16, 'nehemias': 16,
  'est': 17, 'ester': 17, 'esther': 17,
  'job': 18,
  'sal': 19, 'salmo': 19, 'salmos': 19, 'psa': 19, 'ps': 19,
  'pr': 20, 'pro': 20, 'prov': 20, 'proverbios': 20,
  'ec': 21, 'ecl': 21, 'eclesiastes': 21, 'ecc': 21,
  'cnt': 22, 'cantar': 22, 'cantares': 22, 'sol': 22, 'song': 22,
  'is': 23, 'isa': 23, 'isaias': 23,
  'jer': 24, 'jeremias': 24,
  'lm': 25, 'lam': 25, 'lamentaciones': 25,
  'ez': 26, 'eze': 26, 'ezequiel': 26,
  'dn': 27, 'dan': 27, 'daniel': 27,
  'os': 28, 'ose': 28, 'oseas': 28, 'hos': 28,
  'jl': 29, 'joe': 29, 'joel': 29,
  'am': 30, 'amos': 30,
  'abd': 31, 'abdias': 31, 'oba': 31,
  'jon': 32, 'jonas': 32,
  'mi': 33, 'miq': 33, 'mic': 33, 'miqueas': 33,
  'nah': 34, 'nahum': 34,
  'hab': 35, 'habacuc': 35,
  'sof': 36, 'sofonias': 36, 'zep': 36,
  'hag': 37, 'hageo': 37,
  'zac': 38, 'zacarias': 38, 'zec': 38,
  'mal': 39, 'malaquias': 39,
  'mt': 40, 'mat': 40, 'mateo': 40, 'matthew': 40,
  'mr': 41, 'mar': 41, 'marcos': 41, 'mark': 41,
  'lc': 42, 'luc': 42, 'lucas': 42, 'luke': 42, 'luk': 42,
  'jn': 43, 'juan': 43, 'joh': 43, 'john': 43,
  'hch': 44, 'hec': 44, 'hechos': 44, 'act': 44, 'acts': 44,
  'ro': 45, 'rom': 45, 'romanos': 45, 'romans': 45,
  '1co': 46, '1cor': 46, '1 corintios': 46, '1corintios': 46,
  '2co': 47, '2cor': 47, '2 corintios': 47, '2corintios': 47,
  'ga': 48, 'gal': 48, 'galatas': 48,
  'ef': 49, 'efe': 49, 'efesios': 49, 'eph': 49,
  'fil': 50, 'flp': 50, 'filipenses': 50, 'php': 50,
  'col': 51, 'colosenses': 51,
  '1ts': 52, '1tes': 52, '1 tesalonicenses': 52, '1th': 52,
  '2ts': 53, '2tes': 53, '2 tesalonicenses': 53, '2th': 53,
  '1ti': 54, '1tim': 54, '1 timoteo': 54, '1timoteo': 54,
  '2ti': 55, '2tim': 55, '2 timoteo': 55, '2timoteo': 55,
  'tit': 56, 'tito': 56,
  'flm': 57, 'filemon': 57, 'phm': 57,
  'he': 58, 'heb': 58, 'hebreos': 58,
  'stg': 59, 'santiago': 59, 'jas': 59, 'james': 59,
  '1pe': 60, '1ped': 60, '1 pedro': 60, '1pedro': 60,
  '2pe': 61, '2ped': 61, '2 pedro': 61, '2pedro': 61,
  '1jn': 62, '1juan': 62, '1 juan': 62, '1jo': 62,
  '2jn': 63, '2juan': 63, '2 juan': 63, '2jo': 63,
  '3jn': 64, '3juan': 64, '3 juan': 64, '3jo': 64,
  'jud': 65, 'judas': 65,
  'ap': 66, 'apo': 66, 'apoc': 66, 'apocalipsis': 66, 'rev': 66, 'revelation': 66,
};

function normalizeString(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Limpiador robusto para texto de E-Sword (RTF, HTML, caracteres de escape).
 */
function cleanEswordText(raw) {
  if (!raw || typeof raw !== 'string') return '';
  let text = raw;

  // RTF hex escapes: \'e1 -> á
  text = text.replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) => {
    try {
      return Buffer.from(hex, 'hex').toString('latin1');
    } catch {
      return '';
    }
  });

  // RTF unicode escapes: \u945?
  text = text.replace(/\\u(-?\d+)\??/g, (_, code) => {
    let c = parseInt(code, 10);
    if (c < 0) c += 65536;
    return String.fromCharCode(c);
  });

  // Descartar grupos de cabecera RTF: fonttbl, colortbl, stylesheet, info
  text = text.replace(/\{\\(fonttbl|colortbl|stylesheet|info)[^{}]*\}/gi, '');

  // Saltos de línea RTF
  text = text.replace(/\\(par|line)\b\s?/gi, '\n');
  text = text.replace(/\\tab\b\s?/gi, '\t');

  // Quitar comandos de control RTF restantes: \b, \cf2, \fs24, \f0, etc.
  text = text.replace(/\\[a-zA-Z]+-?\d*\s?/g, '');

  // Quitar llaves de grupos RTF
  text = text.replace(/[{}]/g, '');

  // Etiquetas HTML
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<p[^>]*>/gi, '\n');
  text = text.replace(/<[^>]+>/g, '');

  // Entidades HTML
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Normalizar espacios en blanco
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s*\n\s*\n+/g, '\n\n');
  return text.trim();
}

/**
 * Cache de conexiones SQLite
 */
const dbCache = {};

function getDB(filePath) {
  if (!dbCache[filePath]) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`);
    }
    dbCache[filePath] = new Database(filePath, { readonly: true });
  }
  return dbCache[filePath];
}

/**
 * Buscar todos los archivos en carpetas de módulos recursivamente
 */
function scanFolder(dir, exts) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          results.push(...scanFolder(fullPath, exts));
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (exts.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {
    // ignorar carpetas inaccesibles
  }
  return results;
}

/**
 * Descubrir módulos en todas las rutas configuradas
 */
let cachedModules = null;
let lastDiscoveryTime = 0;

async function discoverModules(force = false) {
  const now = Date.now();
  if (!force && cachedModules && now - lastDiscoveryTime < 10000) {
    return cachedModules;
  }

  const existingPaths = CANDIDATE_PATHS.filter(p => fs.existsSync(p));
  const seenPaths = new Set();
  const result = {
    bibles: [],
    commentaries: [],
    dictionaries: [],
    basePaths: existingPaths,
  };

  const bibleFiles = [];
  const commentaryFiles = [];
  const dictFiles = [];

  for (const basePath of existingPaths) {
    bibleFiles.push(...scanFolder(basePath, ['.bbli', '.bblx']));
    commentaryFiles.push(...scanFolder(basePath, ['.cmti', '.cmtx']));
    dictFiles.push(...scanFolder(basePath, ['.dcti', '.dctx']));
  }

  // Procesar Biblias
  for (const file of bibleFiles) {
    if (seenPaths.has(file)) continue;
    seenPaths.add(file);
    try {
      const db = getDB(file);
      const details = db.prepare('SELECT * FROM Details LIMIT 1').get();
      result.bibles.push({
        path: file,
        filename: path.basename(file),
        description: cleanEswordText(details?.Description) || path.basename(file, path.extname(file)),
        abbreviation: cleanEswordText(details?.Abbreviation) || path.basename(file, path.extname(file)),
        hasStrongs: Boolean(details?.Strong),
        rightToLeft: Boolean(details?.RightToLeft),
      });
    } catch {}
  }

  // Procesar Comentarios
  for (const file of commentaryFiles) {
    if (seenPaths.has(file)) continue;
    seenPaths.add(file);
    try {
      const db = getDB(file);
      const details = db.prepare('SELECT * FROM Details LIMIT 1').get();
      result.commentaries.push({
        path: file,
        filename: path.basename(file),
        description: cleanEswordText(details?.Description) || path.basename(file, path.extname(file)),
        abbreviation: cleanEswordText(details?.Abbreviation) || path.basename(file, path.extname(file)),
      });
    } catch {}
  }

  // Procesar Diccionarios
  for (const file of dictFiles) {
    if (seenPaths.has(file)) continue;
    seenPaths.add(file);
    try {
      const db = getDB(file);
      const details = db.prepare('SELECT * FROM Details LIMIT 1').get();
      result.dictionaries.push({
        path: file,
        filename: path.basename(file),
        description: cleanEswordText(details?.Description) || path.basename(file, path.extname(file)),
        abbreviation: cleanEswordText(details?.Abbreviation) || path.basename(file, path.extname(file)),
        hasStrongs: Boolean(details?.Strong),
      });
    } catch {}
  }

  cachedModules = result;
  lastDiscoveryTime = now;
  return result;
}

/**
 * Parsea referencias como "Juan 3:16", "Gn 1:1-5", "1 Cor 13:4"
 */
function parseReference(refString) {
  if (!refString) return null;

  // Regex flexible para libro capítulo:versículo[-versículo]
  const match = refString.trim().match(
    /^(\d?\s*[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s+[A-Za-záéíóúñÁÉÍÓÚÑ]+)*)\s+(\d+)\s*[:.]\s*(\d+)(?:\s*[-–]\s*(\d+))?$/i
  );

  if (!match) return null;

  const rawBook = match[1].trim();
  const normalizedBook = normalizeString(rawBook);
  const chapter = parseInt(match[2], 10);
  const verseStart = parseInt(match[3], 10);
  const verseEnd = match[4] ? parseInt(match[4], 10) : verseStart;

  const bookNum = BOOK_ABBREVS[normalizedBook];
  if (!bookNum) return null;

  return {
    book: bookNum,
    chapter,
    verseStart,
    verseEnd,
    bookName: BOOK_NAMES[bookNum],
  };
}

// ============================================
// ENDPOINTS DE LA API
// ============================================

// Health check
app.get('/api/health', async (req, res) => {
  const modules = await discoverModules();
  res.json({
    status: 'ok',
    paths: modules.basePaths,
    stats: {
      bibles: modules.bibles.length,
      commentaries: modules.commentaries.length,
      dictionaries: modules.dictionaries.length,
    },
  });
});

// Listar módulos
app.get('/api/modules', async (req, res) => {
  try {
    const modules = await discoverModules();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Parsear referencia bíblica
app.post('/api/parse-reference', (req, res) => {
  try {
    const { reference } = req.body;
    const parsed = parseReference(reference);
    if (!parsed) {
      return res.status(400).json({ error: `No se pudo reconocer la referencia: "${reference}"` });
    }
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comparar pasaje bíblico entre TODAS las Biblias instaladas
app.get('/api/compare/:book/:chapter/:verseStart', async (req, res) => {
  try {
    const book = parseInt(req.params.book, 10);
    const chapter = parseInt(req.params.chapter, 10);
    const verseStart = parseInt(req.params.verseStart, 10);
    const verseEnd = req.query.verseEnd ? parseInt(req.query.verseEnd, 10) : verseStart;

    const modules = await discoverModules();
    const results = [];

    for (const bible of modules.bibles) {
      try {
        const db = getDB(bible.path);
        const rows = db.prepare(
          'SELECT Verse, Scripture FROM Bible WHERE Book = ? AND Chapter = ? AND Verse >= ? AND Verse <= ? ORDER BY Verse'
        ).all(book, chapter, verseStart, verseEnd);

        if (rows && rows.length > 0) {
          const verses = rows.map(r => ({
            verse: r.Verse,
            text: cleanEswordText(r.Scripture),
            html: r.Scripture,
          }));

          results.push({
            version: bible.description,
            abbreviation: bible.abbreviation,
            filename: bible.filename,
            verses,
            fullText: verses.map(v => `${v.verse} ${v.text}`).join(' '),
          });
        }
      } catch (e) {
        // Ignorar módulos corruptos o no legibles
      }
    }

    const bookName = BOOK_NAMES[book] || `Libro ${book}`;
    const refString = `${bookName} ${chapter}:${verseStart}${verseEnd !== verseStart ? '-' + verseEnd : ''}`;

    res.json({
      reference: refString,
      book,
      chapter,
      verseStart,
      verseEnd,
      versions: results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comentarios para un versículo
app.get('/api/commentary/:book/:chapter/:verse', async (req, res) => {
  try {
    const book = parseInt(req.params.book, 10);
    const chapter = parseInt(req.params.chapter, 10);
    const verse = parseInt(req.params.verse, 10);

    const modules = await discoverModules();
    const results = [];

    for (const cmt of modules.commentaries) {
      try {
        const db = getDB(cmt.path);
        const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(t => t.name);

        let entries = [];

        // Estructura 1: Formato v11+ / macOS (tablas Verses, Chapters, Books)
        if (tables.includes('Verses')) {
          const rows = db.prepare(
            `SELECT Comments FROM Verses 
             WHERE Book = ? 
               AND ChapterBegin <= ? AND ChapterEnd >= ?
               AND VerseBegin <= ? AND VerseEnd >= ?`
          ).all(book, chapter, chapter, verse, verse);

          for (const row of rows) {
            const cleaned = cleanEswordText(row.Comments);
            if (cleaned) {
              entries.push({ text: cleaned, html: row.Comments });
            }
          }

          // Si no hay específico de versículo, buscar comentario de capítulo
          if (entries.length === 0 && tables.includes('Chapters')) {
            const chRows = db.prepare(
              'SELECT Comments FROM Chapters WHERE Book = ? AND Chapter = ?'
            ).all(book, chapter);
            for (const row of chRows) {
              const cleaned = cleanEswordText(row.Comments);
              if (cleaned) {
                entries.push({ text: `[Capítulo ${chapter}] ${cleaned}`, html: row.Comments });
              }
            }
          }
        }

        // Estructura 2: Formato tradicional (Commentary o Commentaries)
        const legacyTable = tables.find(t => ['Commentary', 'Commentaries'].includes(t));
        if (legacyTable && entries.length === 0) {
          const cols = db.prepare(`PRAGMA table_info("${legacyTable}")`).all().map(c => c.name);
          const textField = cols.includes('Comments') ? 'Comments' : (cols.includes('Comment') ? 'Comment' : null);

          if (textField) {
            let query = '';
            if (cols.includes('VerseBegin')) {
              query = `SELECT "${textField}" as commentText FROM "${legacyTable}"
                       WHERE Book = ? 
                         AND ChapterBegin <= ? AND ChapterEnd >= ?
                         AND VerseBegin <= ? AND VerseEnd >= ?`;
              const rows = db.prepare(query).all(book, chapter, chapter, verse, verse);
              for (const row of rows) {
                const cleaned = cleanEswordText(row.commentText);
                if (cleaned) entries.push({ text: cleaned, html: row.commentText });
              }
            } else if (cols.includes('Verse')) {
              query = `SELECT "${textField}" as commentText FROM "${legacyTable}"
                       WHERE Book = ? AND Chapter = ? AND (Verse = ? OR Verse = 0)`;
              const rows = db.prepare(query).all(book, chapter, verse);
              for (const row of rows) {
                const cleaned = cleanEswordText(row.commentText);
                if (cleaned) entries.push({ text: cleaned, html: row.commentText });
              }
            }
          }
        }

        if (entries.length > 0) {
          results.push({
            source: cmt.description,
            abbreviation: cmt.abbreviation,
            filename: cmt.filename,
            entries,
          });
        }
      } catch (e) {
        // Ignorar módulos corruptos
      }
    }

    const bookName = BOOK_NAMES[book] || `Libro ${book}`;
    res.json({
      reference: `${bookName} ${chapter}:${verse}`,
      commentaries: results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Búsqueda en Diccionarios multiléxicos
app.get('/api/dictionary/search/:query', async (req, res) => {
  try {
    const rawQuery = req.params.query.trim();
    const modules = await discoverModules();
    const results = [];

    for (const dict of modules.dictionaries) {
      try {
        const db = getDB(dict.path);
        const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(t => t.name);
        if (!tables.includes('Dictionary')) continue;

        const cols = db.prepare('PRAGMA table_info(Dictionary)').all().map(c => c.name);
        const topicCol = cols.find(c => ['Topic', 'Word', 'Key'].includes(c)) || 'Topic';
        const defCol = cols.find(c => ['Definition', 'Def', 'Description'].includes(c)) || 'Definition';

        // 1. Coincidencia exacta (NOCASE)
        let rows = db.prepare(
          `SELECT "${topicCol}" as topic, "${defCol}" as def FROM Dictionary 
           WHERE "${topicCol}" = ? COLLATE NOCASE`
        ).all(rawQuery);

        // 2. Si no hay exacta, coincidencia parcial LIKE
        if (rows.length === 0) {
          rows = db.prepare(
            `SELECT "${topicCol}" as topic, "${defCol}" as def FROM Dictionary 
             WHERE "${topicCol}" LIKE ? COLLATE NOCASE 
             LIMIT 15`
          ).all(`%${rawQuery}%`);
        }

        const validEntries = [];
        for (const r of rows) {
          // Si la definición es un buffer binario (cifrado privativo e-sword), se omite
          if (Buffer.isBuffer(r.def)) continue;
          const cleaned = cleanEswordText(r.def);
          if (cleaned) {
            validEntries.push({
              word: r.topic,
              definition: cleaned,
              html: r.def,
            });
          }
        }

        if (validEntries.length > 0) {
          results.push({
            source: dict.description,
            abbreviation: dict.abbreviation,
            filename: dict.filename,
            entries: validEntries,
          });
        }
      } catch (e) {
        // Ignorar módulos corruptos
      }
    }

    res.json({
      query: rawQuery,
      dictionaries: results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar número Strong (H0430, G3056, etc.)
app.get('/api/strongs/:number', async (req, res) => {
  try {
    const rawNum = req.params.number.trim().toUpperCase();
    const modules = await discoverModules();
    const results = [];

    // Variantes del número: "H1", "H0001", "1", etc.
    const numOnly = rawNum.replace(/^[HG]/, '');
    const prefix = rawNum.startsWith('G') ? 'G' : 'H';
    const variants = [
      rawNum,
      `${prefix}${parseInt(numOnly, 10)}`,
      `${prefix}${numOnly.padStart(4, '0')}`,
      parseInt(numOnly, 10).toString(),
    ];

    for (const dict of modules.dictionaries) {
      try {
        const db = getDB(dict.path);
        const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(t => t.name);
        if (!tables.includes('Dictionary')) continue;

        const cols = db.prepare('PRAGMA table_info(Dictionary)').all().map(c => c.name);
        const topicCol = cols.find(c => ['Topic', 'Word', 'Key'].includes(c)) || 'Topic';
        const defCol = cols.find(c => ['Definition', 'Def', 'Description'].includes(c)) || 'Definition';

        for (const variant of variants) {
          const row = db.prepare(
            `SELECT "${topicCol}" as topic, "${defCol}" as def FROM Dictionary 
             WHERE "${topicCol}" = ? COLLATE NOCASE LIMIT 1`
          ).get(variant);

          if (row && !Buffer.isBuffer(row.def)) {
            const cleaned = cleanEswordText(row.def);
            if (cleaned) {
              results.push({
                source: dict.description,
                word: row.topic,
                definition: cleaned,
                html: row.def,
              });
              break;
            }
          }
        }
      } catch (e) {
        // Ignorar
      }
    }

    res.json({
      strongNumber: rawNum,
      entries: results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor API
app.listen(PORT, async () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  📖 E-Sword Bridge Server (macOS / Windows)');
  console.log(`  🌐 API E-Sword: http://localhost:${PORT}`);

  // Iniciar servidor web para el plugin de RemNote
  const pluginDist = path.join(__dirname, '../plugin/dist');
  if (fs.existsSync(pluginDist)) {
    const pluginApp = express();
    pluginApp.use(cors({ origin: '*' }));
    
    // Log de todas las solicitudes de RemNote
    pluginApp.use((req, res, next) => {
      console.log(`[RemNote Plugin] ${req.method} ${req.url}`);
      next();
    });

    // Manejador central para servir el widget adecuado según ?widgetName=
    function handleWidgetRequest(req, res) {
      const widget = req.query.widgetName;
      if (widget === 'bible_popup') {
        return res.sendFile(path.join(pluginDist, 'bible_popup.html'));
      }
      if (widget === 'esword_sidebar' || widget === 'sidebar') {
        return res.sendFile(path.join(pluginDist, 'sidebar.html'));
      }
      return res.sendFile(path.join(pluginDist, 'index.html'));
    }

    pluginApp.get('/', handleWidgetRequest);
    pluginApp.get('/index', handleWidgetRequest);
    pluginApp.get('/index.html', handleWidgetRequest);
    pluginApp.get('/bible_popup', (req, res) => res.sendFile(path.join(pluginDist, 'bible_popup.html')));
    pluginApp.get('/sidebar', (req, res) => res.sendFile(path.join(pluginDist, 'sidebar.html')));
    pluginApp.get('/esword_sidebar', (req, res) => res.sendFile(path.join(pluginDist, 'esword_sidebar.html')));

    // Servir archivos estáticos restantes (.js, .css, .json, assets)
    pluginApp.use(express.static(pluginDist, {
      extensions: ['html', 'js', 'json', 'css']
    }));

    pluginApp.listen(PLUGIN_PORT, () => {
      console.log(`  🔌 Plugin RemNote: http://localhost:${PLUGIN_PORT}`);
    });
  }

  console.log('═══════════════════════════════════════════════════');
  
  const modules = await discoverModules(true);
  console.log(`\n📂 Carpetas examinadas:`);
  modules.basePaths.forEach(p => console.log(`   - ${p}`));
  
  console.log(`\n📚 Módulos detectados:`);
  console.log(`   📗 Biblias: ${modules.bibles.length}`);
  console.log(`   📘 Comentarios: ${modules.commentaries.length}`);
  console.log(`   📙 Diccionarios: ${modules.dictionaries.length}`);
  console.log('═══════════════════════════════════════════════════\n');
});

// Cerrar conexiones al salir
process.on('SIGINT', () => {
  for (const db of Object.values(dbCache)) {
    try { db.close(); } catch {}
  }
  process.exit(0);
});
