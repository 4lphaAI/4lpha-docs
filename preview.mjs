import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const page = new URL('./index.html', import.meta.url);
const favicon = new URL('./favicon.png', import.meta.url);
const server = createServer(async (request, response) => {
  const asset = request.url === '/favicon.png' ? favicon : request.url === '/' || request.url === '/index.html' ? page : null;
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
    response.end(body);
  } catch {
    response.writeHead(500).end('Preview unavailable');
  }
});
const port = Number(process.env.PORT ?? 4318);
server.listen(port, '0.0.0.0', () => console.log(`4lpha Docs: http://127.0.0.1:${port}`));
