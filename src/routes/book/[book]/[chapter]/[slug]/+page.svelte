<script>
  import { bookPath, sectionPath } from '$lib/content.js';
  import { withBase } from '$lib/html.js';
  import { savePosition } from '$lib/reading.js';
  import { goto } from '$app/navigation';
  import GoLab from '$lib/tour/GoLab.svelte';

  let { data } = $props();
  const { book, chapter, section, content, prev, next } = $derived(data);

  let activeId = $state('');
  let progress = $state(0);
  let bookmarks = $state([]);
  let editorWidth = $state(50);
  let resizing = $state(false);
  let workspace = $state();
  let tocOpen = $state(false);

  /** @type {{ id: string, text: string, depth: number }[]} */
  const headings = $derived(content?.headings || []);
  const examples = $derived(content?.examples || []);
  const isTour = $derived(book.id === 'go-tour');
  const isInteractive = $derived(isTour && examples.length > 0);

  const chapterIndex = $derived(
    book.chapters.findIndex((item) => item.key === chapter.key) + 1
  );

  const bookmarkKey = $derived(`${book.id}:${chapter.key}:${section.slug}`);
  const isBookmarked = $derived(bookmarks.includes(bookmarkKey));

  const sourceUrl = $derived(
    book.id === 'go-tour'
      ? `https://go.dev/tour/${chapter.key}/${section.slug === 'index' ? 1 : Number(section.slug.replace(/^p/, ''))}`
      : ''
  );
  const goToSection = (target) => {
    if (target) goto(sectionPath(book.id, target.chapter, target.slug));
  };

  $effect(() => {
    if (!headings.length) return;
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element) => element !== null);

    const onScroll = () => {
      let current = elements[0]?.id || '';
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= 150) {
          current = element.id;
        }
      }
      activeId = current;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  $effect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progress = height > 0 ? Math.min(1, window.scrollY / height) : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  $effect(() => {
    savePosition({
      book: book.id,
      title: `${section.title} — ${book.title}`,
      chapter: chapter.key,
      slug: section.slug,
      path: sectionPath(book.id, chapter.key, section.slug),
    });
    if (typeof localStorage === 'undefined') return;
    bookmarks = JSON.parse(
      localStorage.getItem('arabic-cs-library:bookmarks') || '[]'
    );
  });

  const toggleBookmark = () => {
    bookmarks = isBookmarked
      ? bookmarks.filter((item) => item !== bookmarkKey)
      : [...bookmarks, bookmarkKey];
    try {
      localStorage.setItem(
        'arabic-cs-library:bookmarks',
        JSON.stringify(bookmarks)
      );
    } catch (error) {
      return;
    }
  };

  function resizeEditor(event) {
    if (!resizing || !workspace) return;
    const bounds = workspace.getBoundingClientRect();
    // RTL: code occupies the left track. Exclude the handle and both gaps so
    // 50% means genuinely equal content widths and the handle follows the pointer.
    const gap = Number.parseFloat(getComputedStyle(workspace).columnGap) || 0;
    const handle = event.currentTarget.getBoundingClientRect().width;
    const available = bounds.width - gap * 2 - handle;
    if (available <= 0) return;
    const ratio = (event.clientX - bounds.left - gap - handle / 2) / available;
    editorWidth = Math.max(20, Math.min(80, ratio * 100));
  }

  function resizeKey(event) {
    if (event.key === 'ArrowRight') editorWidth = Math.min(80, editorWidth + 2);
    else if (event.key === 'ArrowLeft') editorWidth = Math.max(20, editorWidth - 2);
    else if (event.key === 'Home') editorWidth = 20;
    else if (event.key === 'End') editorWidth = 80;
    else return;
    event.preventDefault();
  }
</script>

<svelte:window onkeydown={(event) => {
  if (event.key === 'Escape' && tocOpen) {
    tocOpen = false;
    document.querySelector('.contents-toggle')?.focus();
  }
}} />

<svelte:head>
  <title>{section.title} | {book.title}</title>
  <meta name="description" content={`${section.title} — ${chapter.title}`} />
</svelte:head>

<div class="reader-bar">
  <div class="container reader-bar__inner">
    <a class="reader-bar__book" href={bookPath(book.id)}>{book.title}</a>
    <span class="reader-bar__chapter">› {chapter.title}</span>
    <button class="reader-tool contents-toggle" class:contents-toggle--tour={isTour} aria-expanded={tocOpen} aria-controls="tour-reader-toc" onclick={() => tocOpen = !tocOpen}>فهرس الكتاب</button>
    <span class="reader-bar__spacer"></span>
    <span class="reader-tool" aria-label={`الفصل ${chapterIndex} من ${book.chapters.length}`}
      >{chapterIndex} / {book.chapters.length}</span
    >
    <button
      class="reader-tool"
      class:reader-tool--on={isBookmarked}
      onclick={toggleBookmark}
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4h10v16l-5-4-5 4z" />
      </svg>
      {isBookmarked ? 'محفوظ' : 'احفظ'}
    </button>
    {#if prev}
      <a class="reader-tool" href={sectionPath(book.id, prev.chapter, prev.slug)}
        >السابق</a
      >
    {/if}
    {#if next}
      <a class="reader-tool" href={sectionPath(book.id, next.chapter, next.slug)}
        >التالي</a
      >
    {/if}
  </div>
  <div class="reader-progress" style={`--progress:${progress}`}></div>
</div>

<div
  class:reader-layout--interactive={isTour}
  class="container reader-layout"
  style={isInteractive ? `--text-track: ${100 - editorWidth}fr; --code-track: ${editorWidth}fr` : undefined}
>
  <aside id="tour-reader-toc" class="reader-aside" class:reader-aside--open={tocOpen} class:tour-flyout={isTour} hidden={isTour && !tocOpen} aria-label="فهرس الكتاب">
    <button class="reader-tool contents-close" class:contents-toggle--tour={isTour} onclick={() => tocOpen = false}>إغلاق الفهرس</button>
    <p class="reader-aside__title">فهرس الكتاب</p>
    {#each book.chapters as item}
      <h3 class:active-chapter={item.key === chapter.key}>{item.title}</h3>
      <ul>
        {#each item.sections as entry}
          <li>
            <a
              href={sectionPath(book.id, item.key, entry.slug)}
              onclick={() => tocOpen = false}
              class:active={entry.slug === section.slug &&
                item.key === chapter.key}>{entry.title}</a
            >
          </li>
        {/each}
      </ul>
    {/each}
  </aside>

  <article class="reader-sheet" class:reader-sheet--lab={isInteractive}>
    <h1>{section.title}</h1>

    {#if headings.length > 2 && headings.length <= 12}
      <nav class="toc-inline" aria-label="في هذا القسم">
        <p>في هذا القسم</p>
        <ul>
          {#each headings as heading}
            <li><a href={`#${heading.id}`}>{heading.text}</a></li>
          {/each}
        </ul>
      </nav>
    {/if}

    {#if isInteractive}
      <div class="lesson-split" bind:this={workspace}>
        {#key `${chapter.key}/${section.slug}`}
        <div class="lesson-text reader-content" aria-label="محتوى الدرس" onscroll={(event) => {
          const pane = event.currentTarget;
          const height = pane.scrollHeight - pane.clientHeight;
          progress = height > 0 ? Math.min(1, pane.scrollTop / height) : 1;
        }}>
          {@html withBase(content?.html) || ''}
          {#if content?.original}
            <details class="original-accordion">
              <summary>النص الأصلي بالإنجليزية</summary>
              <div class="original-content" lang="en" dir="ltr">{@html withBase(content.original)}</div>
            </details>
          {/if}
        </div>
        {/key}
        <button
          type="button"
          class="pane-divider"
          class:dragging={resizing}
          role="slider"
          tabindex="0"
          aria-label="تغيير عرض المحرر"
          aria-orientation="horizontal"
          aria-controls="lesson-code-pane"
          aria-valuemin="20"
          aria-valuemax="80"
          aria-valuenow={Math.round(editorWidth)}
          title="اسحب لتغيير العرض، أو استخدم السهمين"
          onpointerdown={(event) => {
            if (event.button !== 0) return;
            resizing = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.preventDefault();
          }}
          onpointermove={resizeEditor}
          onpointerup={() => (resizing = false)}
          onpointercancel={() => (resizing = false)}
          onlostpointercapture={() => (resizing = false)}
          onkeydown={resizeKey}
        ><span aria-hidden="true">⋮</span></button>
        <div id="lesson-code-pane" class="lesson-code">
          {#key `${chapter.key}/${section.slug}`}
            <GoLab examples={examples} storageId={`${chapter.key}/${section.slug}`} {sourceUrl} onPrevious={() => goToSection(prev)} onNext={() => goToSection(next)} />
          {/key}
        </div>
      </div>
    {:else}
      <div class="reader-content">
        {@html withBase(content?.html) || ''}
        {#if isTour && content?.original}
          <details class="original-accordion">
            <summary>النص الأصلي بالإنجليزية</summary>
            <div class="original-content" lang="en" dir="ltr">{@html withBase(content.original)}</div>
          </details>
        {/if}
      </div>
    {/if}

    <div class="prev-next">
      {#if prev}
        <a href={sectionPath(book.id, prev.chapter, prev.slug)}>
          <span class="prev-next__label">السابق</span>
          <span class="prev-next__title">{prev.title}</span>
        </a>
      {:else}
        <a href={bookPath(book.id)}>
          <span class="prev-next__label">العودة</span>
          <span class="prev-next__title">فهرس الكتاب</span>
        </a>
      {/if}
      {#if next}
        <a href={sectionPath(book.id, next.chapter, next.slug)}>
          <span class="prev-next__label">التالي</span>
          <span class="prev-next__title">{next.title}</span>
        </a>
      {/if}
    </div>
  </article>
</div>

<style>
  .contents-toggle, .contents-close { display: none; }
  .contents-toggle--tour { display: inline-flex; }
  .reader-layout--interactive { display: block; position: relative; }
  .reader-aside[hidden] { display: none; }
  .tour-flyout { position: fixed; inset-inline-end: 1rem; top: 9rem; width: min(320px, calc(100vw - 2rem)); height: min(70dvh, 650px); overflow-y: auto; z-index: 50; padding: 1rem; background: var(--surface); border: 1px solid var(--rule-strong); box-shadow: 0 8px 24px #0002; }
  .reader-sheet--lab { max-width: none; }
  .lesson-text :global(> h2:first-child) { display: none; }
  .lesson-split { display: grid; grid-template-columns: minmax(0, var(--text-track, 1fr)) 16px minmax(0, var(--code-track, 1fr)); gap: 1rem; align-items: stretch; min-width: 0; height: max(420px, calc(100dvh - 270px)); }
  .lesson-text { min-width: 0; overflow-y: auto; overscroll-behavior: contain; padding-inline-end: .75rem; font-size: 1.05rem; line-height: 1.9; }
  .lesson-code { min-width: 0; min-height: 0; height: 100%; overflow: hidden; }
  .original-accordion { margin-block: 1.5rem; border-top: 1px solid var(--rule-strong); font-size: 1rem; }
  .original-accordion summary { cursor: pointer; padding-block: .75rem; }
  .original-content { text-align: left; font-family: sans-serif; font-size: .95rem; line-height: 1.7; }
  .pane-divider { padding: 0; background: transparent; border: 0; border-radius: 0; align-self: stretch; min-height: 160px; display: flex; align-items: center; justify-content: center; cursor: col-resize; touch-action: none; border-inline: 1px solid var(--rule-strong, #858585); color: var(--ink-soft); }
  .pane-divider:hover, .pane-divider.dragging { background: var(--paper-deep, #ece2d0); color: var(--ink); }
  .pane-divider:focus-visible { outline: 2px solid #008aa3; outline-offset: 2px; }
  @media (max-width: 1100px) {
    .reader-layout--interactive { grid-template-columns: minmax(0, 1fr); }
  }
  @media (max-width: 64rem) {
    .contents-toggle, .contents-close { display: inline-flex; }
    .reader-aside:not(.reader-aside--open) { display: none; }
    .reader-aside.reader-aside--open {
      position: fixed; inset-inline: 1rem; top: 8rem;
      width: auto; max-width: 420px; height: auto; max-height: calc(100dvh - 10rem);
      overflow-y: auto; z-index: 50; padding: 1rem; background: var(--surface);
      border: 1px solid var(--rule-strong); box-shadow: 0 8px 24px #0002;
    }
  }
  @media (max-width: 850px) {
    .lesson-split { grid-template-columns: minmax(0, 1fr); height: auto; }
    .pane-divider { display: none; }
    .lesson-code { min-width: 0; height: clamp(380px, 65dvh, 560px); }
    .lesson-text { max-height: none; overflow: visible; }
  }
</style>
