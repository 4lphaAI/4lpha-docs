import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const page = new URL('./index.html', import.meta.url);
const favicon = new URL('./favicon.png', import.meta.url);

// The docs are one self-contained page with a client-side router, so every
// article also has a clean path (`/status`, `/lending`). Serving the page for
// any extensionless path keeps a shared or typed link working instead of
// answering 404; the router resolves the path segment on load.
const servesPage = (pathname) =>
  pathname === '/' || pathname === '/index.html' || !/\.[a-z0-9]+$/i.test(pathname);

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
    return;
  }
  const { pathname } = new URL(request.url, 'http://localhost');
  const asset = pathname === '/favicon.png' ? favicon : servesPage(pathname) ? page : null;
  if (asset === null) {
    response.writeHead(404).end('Not found');
    return;
  }
  try {
    const body = await readFile(asset);
    response.writeHead(200, {
      'Content-Type': asset === favicon ? 'image/png' : 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500).end('Preview unavailable');
  }
});
const port = Number(process.env.PORT ?? 4318);
server.listen(port, '0.0.0.0', () => console.log(`4lpha Docs: http://127.0.0.1:${port}`));
