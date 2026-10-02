/* Runs user code in a disposable worker. Infinite loops cannot freeze the UI. */
importScripts('./wasm_exec.js');

let ready;
async function initialize() {
  const go = new Go();
  const useCompression = typeof DecompressionStream !== 'undefined';
  const response = await fetch(useCompression ? './interpreter.wasm.gz' : './interpreter.wasm');
  if (!response.ok) throw new Error(`Cannot load Go runtime (${response.status})`);
  // Some servers send .gz with Content-Encoding:gzip, in which case fetch
  // has already decompressed the response. Static hosts may serve it as a file.
  const decodedByBrowser = /gzip/i.test(response.headers.get('content-encoding') || '');
  const bytes = useCompression && !decodedByBrowser
    ? new Response(response.body.pipeThrough(new DecompressionStream('gzip')))
    : response;
  const result = await WebAssembly.instantiate(await bytes.arrayBuffer(), go.importObject);
  void go.run(result.instance).catch((error) => postMessage({ error: error.message }));
  if (!self.tourGo) throw new Error('Go runtime failed to initialize');
}
self.onmessage = async ({ data }) => {
  try {
    ready ||= initialize();
    await ready;
    postMessage({ ready: true });
    if (!data || !['run', 'format'].includes(data.action) || typeof data.body !== 'string') throw new Error('Invalid Go request');
    if (new TextEncoder().encode(data.body).length > 100_000) throw new Error('Program exceeds 100 KB');
    const body = data.body.replace(/"golang\.org\/x\/tour\/(pic|wc|reader)"/g, '"$1"');
    const result = data.action === 'format' ? self.tourGo.format(data.body) : self.tourGo.run(body);
    postMessage({ result });
  } catch (error) {
    postMessage({ error: error instanceof Error ? error.message : String(error) });
  }
};
