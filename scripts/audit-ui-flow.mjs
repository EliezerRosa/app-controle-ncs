import { createServer } from 'http';
import { promises as fs } from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { setTimeout as delay } from 'timers/promises';

const HOST = '127.0.0.1';
const PORT = 4173;
const BASE_PREFIX = '/app-controle-ncs/';
const DOCS_DIR = path.resolve('docs');

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
]);

function resolveAssetPath(urlPath) {
  if (urlPath === '/' || urlPath === '') {
    return { type: 'redirect' };
  }
  if (urlPath.startsWith(BASE_PREFIX)) {
    const slice = urlPath.slice(BASE_PREFIX.length);
    const relative = slice === '' || slice === '/' ? 'index.html' : slice.replace(/^\/+/g, '');
    return { type: 'file', filePath: path.join(DOCS_DIR, relative) };
  }
  const fallback = urlPath.replace(/^\/+/g, '');
  const target = fallback === '' ? 'index.html' : fallback;
  return { type: 'file', filePath: path.join(DOCS_DIR, target) };
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${HOST}:${PORT}`);
  const decision = resolveAssetPath(url.pathname);

  if (decision.type === 'redirect') {
    response.writeHead(302, { Location: BASE_PREFIX });
    response.end();
    return;
  }

  try {
    const data = await fs.readFile(decision.filePath);
    const extension = path.extname(decision.filePath);
    const contentType = mimeTypes.get(extension) ?? 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  } catch (error) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
  }
});

await new Promise((resolve) => server.listen(PORT, HOST, resolve));

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const consoleLog = [];
const networkLog = [];

page.on('console', (message) => {
  consoleLog.push({ type: message.type(), text: message.text() });
});

page.on('response', (response) => {
  networkLog.push({
    url: response.url(),
    method: response.request().method(),
    status: response.status(),
  });
});

await page.goto(`http://${HOST}:${PORT}${BASE_PREFIX}`, { waitUntil: 'networkidle' });
await delay(1000);

const masking = (token) => {
  if (!token) return null;
  if (token.length <= 8) return `${token.slice(0, 2)}***${token.slice(-2)}`;
  return `${token.slice(0, 4)}***${token.slice(-4)}`;
};

const uiState = await page.evaluate(async () => {
  const pat = window.localStorage.getItem('territoryAppPat');
  const workflow = window.localStorage.getItem('territoryAppWorkflowDispatched');
  const status = document.querySelector('main')?.textContent ?? '';
  return { pat, workflow, statusText: status.slice(0, 120) };
});

const maskedToken = masking(uiState.pat);

const githubCheck = await page.evaluate(async () => {
  const token = window.localStorage.getItem('territoryAppPat');
  if (!token) {
    return { ok: false, status: 'no-token' };
  }
  try {
    const response = await fetch('https://api.github.com/repos/EliezerRosa/app-controle-ncs/contents/data/db.yml', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });
    const rateLimit = response.headers.get('x-ratelimit-remaining');
    if (!response.ok) {
      return { ok: false, status: response.status, rateLimit };
    }
    const payload = await response.json();
    return {
      ok: true,
      status: response.status,
      rateLimit,
      sha: payload.sha,
      contentLength: payload.content?.length ?? 0,
    };
  } catch (error) {
    return { ok: false, status: 'network-error', message: String(error) };
  }
});

const modalCount = await page.locator('text=Configurar Personal Access Token').count();

await browser.close();
server.close();

const report = {
  consoleLog,
  networkLog,
  modalCount,
  patStoredMasked: maskedToken,
  workflowFlag: uiState.workflow,
  githubCheck,
};

console.log(JSON.stringify(report, null, 2));
