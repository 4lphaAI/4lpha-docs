import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const page = new URL('./index.html', import.meta.url);
const server = createServer(async (request, response) => {
  if (request.url !== '/' && request.url !== '/index.html') {
    response.writeHead(404).end('Not found');
    return;
  }
  try {
    const html = await readFile(page);
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(html);
  } catch {
    response.writeHead(500).end('Preview unavailable');
  }
});
server.listen(4318, '127.0.0.1', () => console.log('4lpha Docs: http://127.0.0.1:4318'));
