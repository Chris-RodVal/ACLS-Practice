const http = require('http');
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const PORT = 8080;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.md':   'text/markdown',
};

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'baggage, sentry-trace');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  const file = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const filePath = path.join(DIR, file);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.writeHead(200);
    res.end(data);
  });
}).listen(PORT, () => console.log(`Plugin server running on http://localhost:${PORT}`));
