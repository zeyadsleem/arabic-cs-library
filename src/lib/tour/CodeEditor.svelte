<script>
  import { onMount } from 'svelte';
  let { value, onChange, onRun, onFormat } = $props();
  let host;
  let editor;
  let failed = $state(false);

  onMount(() => {
    let disposed = false;
    async function initialize() {
      try {
        const [{ EditorView, basicSetup }, { keymap }, { go }, { oneDark }] = await Promise.all([
          import('codemirror'), import('@codemirror/view'), import('@codemirror/lang-go'), import('@codemirror/theme-one-dark')
        ]);
        if (disposed) return;
        editor = new EditorView({
          doc: value,
          parent: host,
          extensions: [
            keymap.of([
              { key: 'Shift-Enter', run: () => { onRun(); return true; } },
              { key: 'Mod-Enter', run: () => { onFormat(); return true; } }
            ]),
            basicSetup, go(), oneDark,
            EditorView.contentAttributes.of({ 'aria-label': 'محرر شيفرة Go', dir: 'ltr' }),
            EditorView.theme({
              '&': { height: '100%', maxWidth: '100%', fontSize: '14px' },
              '.cm-scroller': { overflowX: 'auto', fontFamily: '"IBM Plex Mono", monospace' },
              '.cm-content': { maxWidth: '100%' }
            }),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) onChange(update.state.doc.toString());
            })
          ]
        });
      } catch (error) {
        console.error('Could not load Go editor', error);
        failed = true;
      }
    }
    initialize();
    return () => { disposed = true; editor?.destroy(); editor = undefined; };
  });

  $effect(() => {
    const next = value;
    if (editor && editor.state.doc.toString() !== next) {
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: next } });
    }
  });
</script>

<div class="lab-editor">
  <div class="editor-host" bind:this={host} dir="ltr"></div>
</div>
{#if failed}
  <label for="fallback-editor">محرر نصي بديل</label>
  <textarea id="fallback-editor" dir="ltr" value={value} oninput={(event) => onChange(event.currentTarget.value)}></textarea>
{/if}

<style>
  .lab-editor { display: flex; flex: 1 1 60%; flex-direction: column; min-width: 0; min-height: 0; width: 100%; overflow: hidden; }
  .editor-host { flex: 1; min-height: 220px; max-width: 100%; background: #282c34; text-align: left; resize: vertical; overflow: hidden; }
  textarea { min-height: 400px; width: 100%; font-family: monospace; direction: ltr; }
  @media (max-width: 700px) { .editor-host { height: 380px; } }
</style>
