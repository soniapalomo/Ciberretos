const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = Number(process.env.PORT || 8080);
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const METRICS_FILE = path.join(DATA_DIR, 'metrics.json');
const PUBLIC_DIR = __dirname;
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || '';

function ensureDataFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(METRICS_FILE)) {
    fs.writeFileSync(METRICS_FILE, '{}', 'utf8');
  }
}

function readMetrics() {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(METRICS_FILE, 'utf8') || '{}');
  } catch (error) {
    return {};
  }
}

function writeMetrics(metrics) {
  ensureDataFile();
  fs.writeFileSync(METRICS_FILE, JSON.stringify(metrics, null, 2), 'utf8');
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error('Payload demasiado grande'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function serveStatic(req, res) {
  const parsed = url.parse(req.url);
  const pathname = decodeURIComponent(parsed.pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, requested));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const types = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8'
    };
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(content);
  });
}

async function handleApi(req, res) {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }
if (req.url.startsWith('/api/teacher-login') && req.method === 'POST') {
  try {
    const body = await readBody(req);
    const payload = JSON.parse(body);

    if (payload.password && payload.password === TEACHER_PASSWORD) {
      sendJson(res, 200, { ok: true });
    } else {
      sendJson(res, 401, { ok: false });
    }
  } catch (error) {
    sendJson(res, 400, { ok: false });
  }
  return;
}
  if (req.url.startsWith('/api/metrics') && req.method === 'GET') {
    const metrics = readMetrics();
    const sessions = Object.values(metrics).sort((a, b) => (b.inicio || 0) - (a.inicio || 0));
    sendJson(res, 200, { sessions });
    return;
  }

  if (req.url.startsWith('/api/metrics') && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const payload = JSON.parse(body);
      if (!payload || !payload.session) {
        sendJson(res, 400, { error: 'Falta session' });
        return;
      }
      const metrics = readMetrics();
      metrics[payload.session] = {
        ...payload,
        ultima_actividad: Date.now()
      };
      writeMetrics(metrics);
      sendJson(res, 200, { ok: true });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return;
  }

  if (req.url.startsWith('/api/metrics') && req.method === 'DELETE') {
    writeMetrics({});
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { error: 'API no encontrada' });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    handleApi(req, res);
    return;
  }
  serveStatic(req, res);
});

ensureDataFile();
server.listen(PORT, '0.0.0.0', () => {
  console.log(`CiberRetos disponible en http://localhost:${PORT}`);
});
