# 📖 RemNote × E-Sword Bible Integration

Plugin de RemNote que se conecta con tus módulos de **E-Sword** (Biblias, Comentarios y Diccionarios) para estudio bíblico directamente desde RemNote.

## ✨ Características

- 📚 **Vista comparativa de versiones**: Ve el mismo pasaje en todas tus Biblias de E-Sword simultáneamente
- 📝 **Comentarios**: Accede a los comentarios de todos tus módulos `.cmtx` 
- 📖 **Diccionario multiléxico**: Busca palabras y números Strong (H0001, G3056) en tus diccionarios
- 📋 **Pegar en RemNote**: Un clic para insertar cualquier versión, comentario o definición directamente en tu documento
- 🔍 **Búsqueda rápida**: Desde el sidebar o con comandos slash (`/bible`, `/comm`, `/dict`, `/strong`)
- 🌐 **Soporte bilingüe**: Acepta referencias en español (Juan 3:16, Gn 1:1) e inglés (John 3:16, Gen 1:1)

## 🏗️ Arquitectura

El proyecto tiene dos componentes:

```
remnote-esword-plugin/
├── bridge/          ← Servidor local Node.js (lee los archivos SQLite de E-Sword)
│   ├── server.js
│   └── package.json
└── plugin/          ← Plugin de RemNote (React + TypeScript)
    ├── src/
    │   ├── widgets/
    │   │   ├── index.tsx        ← Registro de comandos y widgets
    │   │   ├── bible_popup.tsx  ← Popup principal (3 pestañas)
    │   │   └── sidebar.tsx      ← Panel lateral con estado y módulos
    │   ├── lib/
    │   │   └── bridge-client.ts ← Cliente API para el bridge
    │   └── styles.css
    └── public/
        └── manifest.json
```

**¿Por qué un bridge?** Los plugins de RemNote corren en un iframe aislado sin acceso al sistema de archivos. El bridge es un pequeño servidor local que lee tus archivos `.bblx`, `.cmtx` y `.dctx` de E-Sword y los expone via HTTP.

## 🚀 Instalación

### Paso 1: Instalar el Bridge Server

```bash
cd bridge
npm install
```

### Paso 2: Configurar la ruta de módulos

Por defecto, el bridge busca módulos en `~/Desktop/Escuela de Discipulado`. Si tus módulos están en otra ubicación:

```bash
# Opción A: Variable de entorno
ESWORD_MODULES_PATH="/ruta/a/tus/modulos" npm start

# Opción B: Editar server.js (línea de DEFAULT_MODULES_PATH)
```

### Paso 3: Iniciar el Bridge

```bash
cd bridge
npm start
```

Deberías ver algo como:
```
═══════════════════════════════════════════════════
  📖 E-Sword Bridge Server
  🌐 http://localhost:52914
  📂 Módulos: /Users/tu-usuario/Desktop/Escuela de Discipulado
═══════════════════════════════════════════════════

📚 Módulos disponibles:
   📗 Biblia: Reina-Valera 1960 (RVR60.bblx)
   📗 Biblia: King James Version (KJV.bblx)
   📘 Comentario: Matthew Henry (MH.cmtx)
   📙 Diccionario: Strong's Hebrew (StrongHebrew.dctx)
```

### Paso 4: Instalar el Plugin en RemNote

```bash
cd plugin
npm install
npm run dev
```

Luego en RemNote:
1. Ve a **Settings** → **Plugins** → **Build** tab
2. Haz clic en **"Develop from localhost"**
3. Ingresa `http://localhost:8095`

## 📖 Uso

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `/bible` | Buscar una referencia bíblica (abre vista comparativa) |
| `/comm` | Ver comentarios para una referencia |
| `/dict` | Buscar en diccionarios multiléxicos |
| `/strong` | Buscar un número Strong (H0001, G3056) |

### Flujo de trabajo

1. **Selecciona texto** con una referencia bíblica en RemNote (ej: "Juan 3:16")
2. Ejecuta el comando `/bible` (o usa Cmd/Ctrl+K → "E-Sword: Buscar referencia")
3. Se abre el **popup comparativo** con todas tus versiones
4. Haz clic en **"📋 Pegar esta versión"** para insertar el texto en tu documento
5. Cambia a la pestaña **Comentarios** o **Diccionario** según necesites

### Formatos de referencia aceptados

```
Juan 3:16          → Juan capítulo 3, versículo 16
Gn 1:1-5           → Génesis 1, versículos 1 al 5
Sal 23:1            → Salmo 23:1
1 Co 13:4           → 1 Corintios 13:4
Apocalipsis 21:1    → Apocalipsis 21:1
John 3:16           → (inglés también funciona)
Gen 1:1             → Genesis 1:1
```

## 🔧 API del Bridge

El bridge expone estos endpoints:

| Endpoint | Descripción |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/modules` | Listar módulos disponibles |
| `GET /api/compare/:book/:chapter/:verse` | Vista comparativa |
| `GET /api/bible/:file/:book/:chapter/:verse` | Versículo de una Biblia |
| `GET /api/commentary/:book/:chapter/:verse` | Comentarios |
| `GET /api/dictionary/search/:query` | Buscar en diccionarios |
| `GET /api/strongs/:number` | Buscar número Strong |
| `POST /api/parse-reference` | Parsear referencia de texto |

## 🛠️ Desarrollo

```bash
# Terminal 1: Bridge server
cd bridge && npm run dev

# Terminal 2: Plugin de RemNote
cd plugin && npm run dev
```

## 📝 Notas

- El bridge debe estar corriendo para que el plugin funcione
- Los archivos de E-Sword (`.bblx`, `.cmtx`, `.dctx`) son bases de datos SQLite estándar
- El bridge los abre en modo lectura, no modifica tus módulos
- Puerto predeterminado del bridge: **52914** (configurable con `ESWORD_BRIDGE_PORT`)
