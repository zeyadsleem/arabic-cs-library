<script>
import { onMount } from 'svelte';
import { runInBrowser, formatInBrowser } from './browser-go.js';
import { base } from '$app/paths';
import CodeEditor from './CodeEditor.svelte';
import { compile, format, programBody, outputParts } from './playground.js';

let { examples = [], storageId, sourceUrl, onPrevious, onNext } = $props();

let files = $state([]);
let fileIndex = $state(0);
let status = $state('عدّل الشيفرة ثم اضغط تشغيل.');
let error = $state('');
let events = $state([]);
let busy = $state(false);
let storageAvailable = $state(true);
let engine = $state('browser');
let controller;
let timeout;
let generation = 0;
let mounted = false;

const playgroundService = import.meta.env.VITE_GO_PLAYGROUND_URL || `${base}/api/go`;
const storageKey = () => `go-tour-ar:v1:${storageId}`;

function cancel() {
  generation += 1;
  controller?.abort();
  clearTimeout(timeout);
  controller = undefined;
  busy = false;
}

function loadFiles() {
  files = examples.map((file) => ({ ...file }));
  fileIndex = 0;
  events = [];
  error = '';
  status = 'عدّل الشيفرة ثم اضغط تشغيل.';
  try {
    const stored = localStorage.getItem(storageKey());
    if (!stored) return;
    const saved = JSON.parse(stored);
    if (
      Array.isArray(saved) &&
      saved.length === files.length &&
      saved.every(
        (file, index) =>
          file && file.Name === files[index].Name &&
          typeof file.Content === 'string' && file.Content.length <= 100_000
      )
    ) {
      files = saved;
    }
  } catch (cause) {
    console.warn('Could not restore Go Tour edits', cause);
    storageAvailable = false;
  }
}

function save() {
  try {
    localStorage.setItem(storageKey(), JSON.stringify(files));
  } catch (cause) {
    console.warn('Could not save Go Tour edits', cause);
    storageAvailable = false;
  }
}

function edit(value) {
  files = files.map((file, index) =>
    index === fileIndex ? { ...file, Content: value } : file
  );
  if (mounted) save();
}

function reset() {
  if (!confirm('هل تريد استعادة المثال الأصلي لهذا الدرس؟ ستُحذف تعديلاتك عليه.')) return;
  cancel();
  files = examples.map((file) => ({ ...file }));
  events = [];
  error = '';
  status = 'تمت استعادة المثال الأصلي.';
  save();
}

async function execute(action) {
  if (busy || !files.length) return;
  const source = action === 'run' ? programBody(files) : files[fileIndex].Content;
  const selected = fileIndex;
  const snapshot = files[selected].Content;
  const token = ++generation;
  const request = new AbortController();
  controller = request;
  let expired = false;
  if (action === 'run' && engine === 'official') {
    timeout = setTimeout(() => {
      expired = true;
      request.abort();
    }, 30_000);
  }
  busy = true;
  error = '';
  if (action === 'run') events = [];
  status = action === 'run' ? 'جارٍ تجميع البرنامج وتشغيله…' : 'جارٍ تنسيق الشيفرة…';
  const phase = (value) => {
    if (generation !== token) return;
    status = value === 'loading'
      ? 'جارٍ تحميل محرك Go المحلي…'
      : action === 'run' ? 'جارٍ تشغيل البرنامج داخل المتصفح…' : 'جارٍ تنسيق الشيفرة…';
  };
  try {
    if (action === 'run') {
      const result = engine === 'browser'
        ? await runInBrowser(source, request.signal, phase)
        : await compile(source, request.signal, playgroundService);
      if (generation !== token) return;
      events = result.events;
      error = result.errors;
      status = result.errors
        ? 'تعذّر تجميع البرنامج. راجع الأخطاء أدناه.'
        : result.exitCode !== 0
          ? `انتهى البرنامج برمز خروج ${result.exitCode}.`
          : 'اكتمل التشغيل.';
      if (programBody(files) !== source) status += ' النتائج تخص الشيفرة قبل آخر تعديل.';
    } else {
      const formatted = await formatInBrowser(source, request.signal, phase);
      if (generation !== token) return;
      if (files[selected].Content !== snapshot) {
        status = 'تغيّرت الشيفرة أثناء التنسيق؛ أعد المحاولة للحفاظ على تعديلاتك.';
        return;
      }
      files = files.map((file, index) =>
        index === selected ? { ...file, Content: formatted } : file
      );
      save();
      status = 'تم التنسيق باستخدام gofmt.';
    }
  } catch (cause) {
    if (generation !== token) return;
    error =
      expired
        ? 'انتهت مهلة الاتصال. حاول مجدداً.'
        : cause instanceof Error && cause.name !== 'AbortError'
          ? cause.message
          : 'أُلغي الطلب.';
    status = 'لم تكتمل العملية.';
  } finally {
    if (generation === token) {
      busy = false;
      controller = undefined;
      clearTimeout(timeout);
    }
  }
}

function adoptTranslationActions(event) {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest('.reader-content a[data-tour-action]');
  if (!link) return;
  const action = link.getAttribute('data-tour-action');
  if (action === 'modules') return;
  event.preventDefault();
  if (action === 'run') execute('run');
  else if (action === 'format') execute('format');
  else if (action === 'syntax') document.querySelector('.editor-host .cm-content')?.focus();
  else if (action === 'editor') document.querySelector('.editor-host .cm-content')?.focus();
  else if (action === 'previous' || action === 'next') {
    const target = action === 'next' ? onNext : onPrevious;
    if (target) target();
  }
}

function navigationKey(event) {
  if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (event.key === 'PageDown') { event.preventDefault(); onNext?.(); }
  else if (event.key === 'PageUp') { event.preventDefault(); onPrevious?.(); }
}

onMount(() => {
  mounted = true;
  loadFiles();
  window.addEventListener('click', adoptTranslationActions);
  window.addEventListener('keydown', navigationKey);
  return () => {
    mounted = false;
    window.removeEventListener('click', adoptTranslationActions);
    window.removeEventListener('keydown', navigationKey);
    cancel();
  };
});

</script>

{#if files.length}
  <div class="lab">
    <div class="lab-toolbar">
      <label class="engine-label">التشغيل
        <select aria-label="محرك تشغيل Go" bind:value={engine} disabled={busy}>
          <option value="browser">داخل المتصفح</option>
          <option value="official">المترجم الرسمي</option>
        </select>
      </label>
      <button class="run" disabled={busy} title="Shift+Enter" onclick={() => execute('run')}>
        ▶ تشغيل
      </button>
      <button disabled={busy} title="Ctrl+Enter أو Cmd+Enter" onclick={() => execute('format')}>
        تنسيق
      </button>
      <button onclick={reset}>استعادة الأصل</button>
      {#if busy}
        <button onclick={() => {
          cancel();
            status = 'أُلغي التنفيذ.';
        }}>إلغاء</button>
      {/if}
      {#if !storageAvailable}<span class="lab-warning">التخزين المحلي غير متاح.</span>{/if}
    </div>

    {#if files.length > 1}
      <div class="file-tabs" role="group" aria-label="ملفات البرنامج">
        {#each files as file, index}
          <button
            class:chosen={fileIndex === index}
            aria-pressed={fileIndex === index}
            onclick={() => (fileIndex = index)}>{file.Name}</button
          >
        {/each}
      </div>
    {/if}

    {#key `${storageId}:${fileIndex}`}
      <CodeEditor
        value={files[fileIndex].Content}
        onChange={edit}
        onRun={() => execute('run')}
        onFormat={() => execute('format')}
      />
    {/key}

    <div class="output-panel" aria-label="نتائج التنفيذ">
      <p class="output-status" role="status">{status}</p>
      {#if error}<pre class="error" dir="ltr">{error}</pre>{/if}
      {#each events as event}
        {#each outputParts(event.message) as part}
          {#if part.type === 'image'}
            <img class="program-image" src={part.value} alt="الصورة التي أنتجها برنامج Go" />
          {:else}
            <pre class:error={event.kind === 'stderr'} dir="ltr">{part.value}</pre>
          {/if}
        {/each}
      {/each}
    </div>

    {#if sourceUrl}
      <p class="lab-source"><a href={sourceUrl} target="_blank" rel="noopener noreferrer">مصدر هذا الدرس في الجولة الأصلية</a></p>
    {/if}
  </div>
{:else}
  <p class="lab-empty">هذا الدرس للقراءة فقط؛ جرّب المثال في الدرس التالي.</p>
{/if}

<style>
  .lab { display: flex; flex-direction: column; height: 100%; min-height: 0; min-width: 0; max-width: 100%; border: 1px solid #69727e; border-radius: 6px; overflow: hidden; }
  .engine-label { font-size: .8rem; display: flex; gap: .4rem; align-items: center; }
  .engine-label select { background: #202731; color: #f4f6f8; font: inherit; min-height: 36px; border: 1px solid #858b92; border-radius: 4px; }
  .lab-toolbar { padding: .55rem .7rem; display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; background: #202731; color: #f4f6f8; }
  .lab-toolbar button { min-height: 40px; border: 1px solid #858b92; border-radius: 4px; padding: .35rem .7rem; background: transparent; color: inherit; cursor: pointer; font: inherit; font-size: .85rem; }
  .lab-toolbar button:disabled { opacity: .45; cursor: not-allowed; }
  .lab-toolbar .run { background: #007f98; border-color: #007f98; color: white; }
  .lab-toolbar button:focus-visible { outline: 3px solid #00a9cb; outline-offset: 2px; }
  .lab-warning { margin-inline-start: auto; font-size: .8rem; color: #ffd7a8; }
  .file-tabs { display: flex; gap: .25rem; padding: .3rem .6rem; background: #282c34; color: #f4f6f8; direction: ltr; overflow: auto; }
  .file-tabs button { min-height: 34px; border: 1px solid transparent; border-radius: 3px; background: transparent; color: inherit; cursor: pointer; font: .8rem monospace; }
  .file-tabs .chosen { border-bottom-color: #56cce5; }
  .output-panel { background: #151b22; color: #e7edf4; padding: .8rem; flex: 0 1 26%; min-height: 80px; overflow: auto; }
  .output-status { margin: 0 0 .6rem; font-size: .82rem; }
  .output-panel pre { margin: 0; padding: 0; background: transparent; color: inherit; white-space: pre-wrap; overflow-wrap: anywhere; font: .82rem/1.7 'IBM Plex Mono', monospace; text-align: left; }
  .output-panel .error { color: #ffafae; }
  .program-image { max-width: 100%; image-rendering: pixelated; }
  .lab-source { margin: 0; padding: .5rem .8rem; font-size: .8rem; background: #202731; color: #cfd8e3; }
  .lab-empty { margin: 0; padding: 1.5rem 1rem; border: 1px dashed var(--rule-strong, #858585); border-radius: 6px; font-size: .9rem; }
</style>
