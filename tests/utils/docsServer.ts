import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const HOST = '127.0.0.1';
const PORT = 4173;
const DOCS_DIR = path.resolve(process.cwd(), 'docs');

const mimeTypes = new Map<string, string>([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
]);

type Resolution =
  | { type: 'redirect' }
  | { type: 'file'; filePath: string };

const resolveAssetPath = (urlPath: string): Resolution => {
  if (urlPath === '/' || urlPath === '') {
    return { type: 'redirect' };
  }

  if (urlPath.startsWith('/app-controle-ncs/')) {
    const slice = urlPath.slice('/app-controle-ncs/'.length);
    const relative = slice === '' || slice === '/' ? 'index.html' : slice.replace(/^\/+/u, '');
    return { type: 'file', filePath: path.join(DOCS_DIR, relative) };
  }

  const fallback = urlPath.replace(/^\/+/u, '');
  const target = fallback === '' ? 'index.html' : fallback;
  return { type: 'file', filePath: path.join(DOCS_DIR, target) };
};

const serveRequest = async (request: IncomingMessage, response: ServerResponse) => {
  const url = new URL(request.url ?? '/', `http://${HOST}:${PORT}`);
  const decision = resolveAssetPath(url.pathname);

  if (decision.type === 'redirect') {
    response.writeHead(302, { Location: '/app-controle-ncs/' });
    response.end();
    return;
  }

  try {
    const data = await readFile(decision.filePath);
    const extension = path.extname(decision.filePath);
    const contentType = mimeTypes.get(extension) ?? 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
  } catch (error) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
  }
};

export const startDocsServer = async () => {
  const server = createServer((request, response) => {
    void serveRequest(request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(PORT, HOST, () => resolve());
  });

  return async () =>
    new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
};

export { HOST, PORT };
