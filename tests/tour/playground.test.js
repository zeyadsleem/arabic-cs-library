import { test } from 'node:test';
import assert from 'node:assert/strict';
import { outputParts, programBody, compile, format } from '../../src/lib/tour/playground.js';

test('image markers render safely and text is retained in order', () => {
  assert.deepEqual(outputParts('hello\nIMAGE:aGVsbG8=\nbye'), [
    { type: 'text', value: 'hello\n' },
    { type: 'image', value: 'data:image/png;base64,aGVsbG8=' },
    { type: 'text', value: 'bye' }
  ]);
  assert.deepEqual(outputParts('<script>alert(1)</script>'), [{ type: 'text', value: '<script>alert(1)</script>' }]);
});

test('multi-file examples use the Playground txtar format', () => {
  assert.equal(programBody([{ Name: 'main.go', Content: 'a' }, { Name: 'other.go', Content: 'b' }]), '-- main.go --\na\n-- other.go --\nb\n');
});

test('invalid service responses and formatting errors are surfaced', async (context) => {
  context.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ unexpected: true })));
  await assert.rejects(compile('package main', new AbortController().signal), /استجابة غير متوقعة/);
  context.mock.restoreAll();
  context.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ Error: 'syntax error', Body: '' })));
  await assert.rejects(format('package main', new AbortController().signal), /syntax error/);
});
