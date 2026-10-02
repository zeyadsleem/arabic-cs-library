const upstreams = ['https://go.dev/_', 'https://play.golang.org'];
const maxProgramBytes = 100_000;

/** @param {'compile' | 'fmt'} action @param {string} body @param {AbortSignal} signal @returns {Promise<unknown>} */
export async function forwardProgram(action, body, signal) {
  if (!['compile', 'fmt'].includes(action)) throw new Error('Unsupported Go action');
  let lastError;
  for (const origin of upstreams) {
    signal.throwIfAborted();
    try {
      const response = await fetch(`${origin}/${action}`, {
        method: 'POST',
        body: new URLSearchParams({ body, version: '2' }),
        signal: AbortSignal.any([signal, AbortSignal.timeout(12_000)])
      });
      if (!response.ok) throw new Error(`Go upstream returned HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (signal.aborted) throw error;
      lastError = error;
    }
  }
  throw new Error('Go Playground upstreams are unavailable', { cause: lastError });
}

/** Same-origin gateway for Vite development and local production preview.
 * Code is forwarded to Google's sandbox; it is never executed on this server.
 * @param {import('node:http').IncomingMessage} request
 * @param {import('node:http').ServerResponse} response
 * @param {() => void} next
 * @returns {Promise<void>}
 */
export async function goGateway(request, response, next) {
  const url = new URL(request.url || '/', 'http://localhost');
  const match = url.pathname.match(/\/api\/go\/(compile|fmt)$/);
  if (!match) { next(); return; }
  const send = (status, value) => {
    if (response.destroyed) return;
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify(value));
  };
  if (request.method !== 'POST') { response.setHeader('Allow', 'POST'); send(405, { Error: 'يُسمح بطلبات POST فقط.' }); return; }
  if (request.headers.origin) {
    try {
      if (new URL(request.headers.origin).host !== request.headers.host) {
        send(403, { Error: 'يجب إرسال الطلب من الموقع نفسه.' }); return;
      }
    } catch {
      send(403, { Error: 'مصدر الطلب غير صالح.' }); return;
    }
  }
  if (!(request.headers['content-type'] || '').startsWith('application/x-www-form-urlencoded')) {
    send(415, { Error: 'صيغة الطلب غير مدعومة.' }); return;
  }
  const controller = new AbortController();
  response.once('close', () => { if (!response.writableEnded) controller.abort(); });
  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
      size += chunk.length;
      if (size > 400_000) { send(413, { Error: 'حجم الطلب يتجاوز الحد المسموح.' }); return; }
      chunks.push(chunk);
    }
    const parameters = new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
    const body = parameters.get('body');
    if (!body?.trim() || [...parameters.keys()].some((key) => !['body', 'version'].includes(key))) {
      send(400, { Error: 'الشيفرة المطلوبة مفقودة أو حقول الطلب غير صحيحة.' }); return;
    }
    if (Buffer.byteLength(body, 'utf8') > maxProgramBytes) {
      send(413, { Error: 'الشيفرة أكبر من الحد المسموح (100 كيلوبايت).' }); return;
    }
    const result = await forwardProgram(match[1], body, controller.signal);
    send(200, result);
  } catch (error) {
    if (controller.signal.aborted) return;
    console.error('Go gateway could not complete the request:', error.message);
    send(503, { Error: 'خدمة Go غير متاحة مؤقتاً. حاول مرة أخرى بعد قليل.' });
  }
}

/** @returns {import('vite').Plugin} */
export function goPlaygroundGateway() {
  const configure = (server) => {
    server.middlewares.use((request, response, next) => { void goGateway(request, response, next); });
  };
  return { name: 'go-playground-gateway', configureServer: configure, configurePreviewServer: configure };
}
