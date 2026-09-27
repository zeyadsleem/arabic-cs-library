<script>
  import searchIndex from '$lib/generated/search-index.json';
  import { sectionPath } from '$lib/content.js';
  import { page } from '$app/state';
  import { browser } from '$app/environment';

  let query = $state('');

  $effect(() => {
    if (!browser) return;
    const incoming = page.url.searchParams.get('q');
    if (incoming && incoming !== query) query = incoming;
  });

  const normalize = (text) =>
    text
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .toLowerCase()
      .trim();

  const results = $derived.by(() => {
    const q = normalize(query);
    if (q.length < 2) return [];

    const terms = q.split(/\s+/).filter(Boolean);
    const scored = [];

    for (const section of searchIndex.sections) {
      if (!section.text || section.text.length < 40) continue;
      const haystack = `${normalize(section.title)} ${section.text}`;
      let score = 0;
      for (const term of terms) {
        const occurrences = haystack.split(term).length - 1;
        if (occurrences === 0) {
          score = 0;
          break;
        }
        score += occurrences;
        if (normalize(section.title).includes(term)) score += 12;
      }
      if (score > 0) scored.push({ section, score });
    }

    return scored.sort((a, b) => b.score - a.score).slice(0, 30);
  });

  const snippet = (section) => {
    const term = normalize(query).split(/\s+/)[0];
    const text = section.text;
    const index = normalize(text).indexOf(term);
    if (index < 0) return text.slice(0, 200);
    const start = Math.max(0, index - 70);
    return `${start > 0 ? '…' : ''}${text.slice(start, start + 240)}…`;
  };
</script>

<svelte:head>
  <title>البحث في المكتبة | المكتبة العربية</title>
</svelte:head>

<div class="container search-hero">
  <h1>البحث في الكتب</h1>
  <p class="page__lead">
    ابحث في {searchIndex.sections.length} قسماً داخل كل الكتب المترجمة.
  </p>
</div>

<div class="container page">
  <form class="search-field" onsubmit={(event) => event.preventDefault()}>
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </svg>
    <input
      type="search"
      placeholder="اكتب كلمة أو عبارة…"
      bind:value={query}
      aria-label="البحث في المكتبة"
    />
  </form>

  {#if query.length >= 2}
    <p class="search-count">
      {results.length > 0
        ? `أقرب ${results.length} نتيجة`
        : 'لا توجد نتائج مطابقة — جرّب كلمةً أقصر أو مرادفاً آخر.'}
    </p>

    <div class="search-results">
      {#each results as result}
        <a
          class="search-result"
          href={sectionPath(
            result.section.book,
            result.section.chapter,
            result.section.slug
          )}
        >
          <span class="search-result__book"
            >{result.section.bookTitle} · {result.section.chapterTitle}</span
          >
          <strong class="search-result__title">{result.section.title}</strong>
          <p class="search-result__snippet">{snippet(result.section)}</p>
        </a>
      {/each}
    </div>
  {:else if query.length === 1}
    <p class="search-count">اكتب حرفين على الأقل للبحث.</p>
  {:else}
    <p class="search-count">
      جرّب: «شجرة»، «التعقيد»، «الفهارس»، «الالتزام»، «TLS».
    </p>
  {/if}
</div>
