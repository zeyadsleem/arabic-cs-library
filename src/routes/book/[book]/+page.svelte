<script>
  import { sectionPath } from '$lib/content.js';

  let { data } = $props();
  const { book } = $derived(data);
  const firstSection = $derived(book.chapters?.[0]?.sections?.[0]);
</script>

<svelte:head>
  <title>{book.title} | المكتبة العربية</title>
  <meta name="description" content={book.description} />
</svelte:head>

<section class="book-hero">
  <div class="container">
    <h1>{book.title}</h1>
    <p class="book-card__meta">{book.titleEn} — {book.author}</p>
    <p class="page__lead">{book.description}</p>

    <p>
      {#if book.sourceUrl}
        <a target="_blank" rel="noopener noreferrer" href={book.sourceUrl}
          >المصدر الأصلي</a
        >
      {/if}
      {#if book.repoUrl}
        · <a target="_blank" rel="noopener noreferrer" href={book.repoUrl}
          >المستودع</a
        >
      {/if}
      {#if book.license}
        · الترخيص: {book.license}
      {/if}
    </p>

    {#if firstSection && book.status === 'translated'}
      <a
        class="button"
        href={sectionPath(book.id, book.chapters[0].key, firstSection.slug)}
        >ابدأ القراءة</a
      >
    {:else}
      <span class="badge badge--planned"
        >هذا الكتاب قيد الإعداد وسيُنشر تباعاً</span
      >
    {/if}
  </div>
</section>

{#if book.chapters}
  <div class="container">
    <h2 class="section-title">المحتويات</h2>
    {#each book.chapters as chapter}
      <div class="chapter-block">
        <h3>{chapter.title}</h3>
        <ul class="chapter-list">
          {#each chapter.sections as section}
            <li>
              <a href={sectionPath(book.id, chapter.key, section.slug)}>
                <span>{section.title}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
{/if}
