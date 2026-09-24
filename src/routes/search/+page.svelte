<script>
  import searchIndex from '$lib/generated/search-index.json';
  import { sectionPath } from '$lib/content.js';

  let query = $state('');

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
      const haystack = `${normalize(section.title)} ${section.text}`;
      let score = 0;
      for (const term of terms) {
        const occurrences = haystack.split(term).length - 1;
        if (occurrences === 0) {
          score = 0;
          break;
        }
        score += occurrences;
        if (normalize(section.title).includes(term)) score += 10;
      }
      if (score > 0) scored.push({ section, score });
    }

    return scored.sort((a, b) => b.score - a.score).slice(0, 30);
  });

  const snippet = (section) => {
    const term = normalize(query).split(/\s+/)[0];
    const text = section.text;
    const index = normalize(text).indexOf(term);
    if (index < 0) return text.slice(0, 220);
    const start = Math.max(0, index - 80);
    return text.slice(start, start + 260);
  };
</script>

<svelte:head>
  <title>البحث | المكتبة العربية</title>
</svelte:head>

<div class="container page">
  <h1>البحث في المكتبة</h1>

  <form class="search-form" onsubmit={(event) => event.preventDefault()}>
    <input
      type="search"
      placeholder="اكتب كلمة للبحث..."
      bind:value={query}
      aria-label="البحث"
    />
  </form>

  {#if query.length >= 2}
    <p>
      {results.length > 0
        ? `تم العثور على ${results.length} نتيجة`
        : 'لا توجد نتائج مطابقة'}
    </p>

    <div class="search-results">
      {#each results as result}
        <a
          class="search-result"
          href={sectionPath(
            'hello-algo',
            result.section.chapter,
            result.section.slug
          )}
        >
          <strong
            >{result.section.chapterTitle} — {result.section.title}</strong
          >
          <p>{snippet(result.section)}</p>
        </a>
      {/each}
    </div>
  {/if}
</div>
