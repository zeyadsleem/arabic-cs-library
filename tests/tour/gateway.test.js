import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { goGateway, forwardProgram } from '../../scripts/lib/go-playground-gateway.mjs';

test('gateway falls back between official upstreams without executing Go locally', async (context) => {
  const urls = [];
  context.mock.method(globalThis, 'fetch', async (url) => {
    urls.push(url);
    if (urls.length === 1) throw new TypeError('network unavailable');
    return new Response(JSON.stringify({ Errors: '', Events: [{ Message: 'ok', Kind: 'stdout' }] }));
  });
  const result = await forwardProgram('compile', 'package main', new AbortController().signal);
  assert.equal(result.Events[0].Message, 'ok');
  assert.deepEqual(urls, ['https://go.dev/_/compile', 'https://play.golang.org/compile']);
});

test('gateway rejects invalid methods, cross-origin requests and oversized code', async () => {
  const server = createServer((request, response) => {
    void goGateway(request, response, () => { response.writeHead(404); response.end(); });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/go/compile`;
  try {
    assert.equal((await fetch(url)).status, 405);
    assert.equal((await fetch(url, { method: 'POST', headers: { Origin: 'https://other.test' }, body: new URLSearchParams({ body: 'package main' }) })).status, 403);
    assert.equal((await fetch(url, { method: 'POST', headers: { Origin: 'null' }, body: new URLSearchParams({ body: 'package main' }) })).status, 403);
    assert.equal((await fetch(url, { method: 'POST', body: new URLSearchParams({ body: 'x'.repeat(100_001) }) })).status, 413);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
