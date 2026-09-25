<script>
  import { books, bookPath, getBook, sectionPath } from '$lib/content.js';

  let { data } = $props();
  const { book } = $derived(data);
  const firstSection = $derived(book.chapters?.[0]?.sections?.[0]);
  const stage = $derived(
    (data.stages || []).find((item) => item.id === book.stage) || null
  );
  const prerequisites = $derived(
    (book.prerequisites || [])
      .map((id) => books.find((item) => item.id === id))
      .filter(Boolean)
  );
  const replacement = $derived(
    book.replacement
      ? books.find((item) => item.id === book.replacement) || null
      : null
  );
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

    {#if stage}
      <p class="book-card__meta">
        خارطة التعلّم: {stage.icon} {stage.title}
        {#if book.order}— الترتيب {book.order} داخل المرحلة{/if}
        {#if book.pages}— {book.pages} صفحة{/if}
        {#if book.completeCourse}— كورس كامل{/if}
      </p>
    {/if}

    {#if prerequisites.length}
      <p class="book-card__meta">
        يتطلب قبله: {prerequisites
          .map((item) => item.title)
          .join('، ')}
      </p>
    {/if}

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
      {#if book.siteUrl}
        · <a target="_blank" rel="noopener noreferrer" href={book.siteUrl}
          >الموقع المستقل</a
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
    {:else if book.status === 'blocked'}
      <span class="badge badge--blocked"
        >غير قابل للترجمة بسبب الترخيص</span
      >
    {:else if book.status === 'reference'}
      <span class="badge badge--reference">مرجع — للقراءة بلغته الأصلية</span>
    {:else if book.siteUrl}
      <a class="button" target="_blank" rel="noopener noreferrer" href={book.siteUrl}
        >اقرأه على موقعه</a
      >
    {:else}
      <span class="badge badge--planned"
        >هذا الكتاب قيد الإعداد وسيُنشر تباعاً</span
      >
    {/if}

    {#if book.note}
      <p class="book-note">{book.note}</p>
    {/if}

    {#if replacement}
      <p class="book-note">
        البديل المتاح للترجمة: <a href={bookPath(replacement.id)}
          >{replacement.title}</a
        >
      </p>
    {/if}

    {#if book.note}
      <p class="book-note">{book.note}</p>
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
