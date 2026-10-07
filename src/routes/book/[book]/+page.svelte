<script>
  import { books, bookPath, sectionPath } from '$lib/content.js';
  import { readPosition } from '$lib/reading.js';

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
  const sectionCount = $derived(
    (book.chapters || []).reduce(
      (sum, chapter) => sum + chapter.sections.length,
      0
    )
  );
  const related = $derived(
    books
      .filter(
        (item) =>
          item.stage === book.stage && item.id !== book.id && item.status === 'translated'
      )
      .slice(0, 5)
  );

  const cloth = {
    foundations: '#31405a',
    tools: '#3c4148',
    math: '#42553f',
    datastructures: '#5b4130',
    systems: '#1f4049',
    go: '#1d4f57',
    javascript: '#4b4526',
    web: '#3d3352',
    networks: '#24405a',
    databases: '#4c3a2b',
    languages: '#5a3039',
    architecture: '#333a4c',
    security: '#4d2724',
  };

  let lastRead = $state(null);
  $effect(() => {
    const position = readPosition();
    lastRead = position && position.book === book.id ? position : null;
  });

  const statusLabel = (value) =>
    ({
      translated: 'مترجم بالكامل',
      planned: 'قيد الترجمة',
      blocked: 'غير قابل للترجمة',
      reference: 'مرجع للقراءة',
    })[value] || value;
</script>

<svelte:head>
  <title>{book.title} | {book.titleEn}</title>
  <meta name="description" content={book.description} />
</svelte:head>

<section class="book-head">
  <div class="container book-head__layout">
    <div
      class="book-cover"
      style={`--book-cloth:${cloth[book.stage] || '#3a3f46'}`}
      aria-hidden="true"
    >
      <span class="book-cover__title">{book.title}</span>
      {#if book.pages}
        <span class="book-cover__pages">{book.pages} pp</span>
      {/if}
    </div>

    <div>
      <p class="book-head__meta">
        {book.titleEn}{book.author ? ` · ${book.author}` : ''}
      </p>
      <h1 class="book-head__title">{book.title}</h1>
      <p class="book-head__lead">{book.description}</p>

      <div class="book-facts">
        <div>
          <span class="book-fact__label">الحالة</span>
          <span class="book-fact__value">{book.statusText || statusLabel(book.status)}</span>
        </div>
        {#if book.pages}
          <div>
            <span class="book-fact__label">الصفحات</span>
            <span class="book-fact__value">{book.pages}</span>
          </div>
        {/if}
        {#if sectionCount}
          <div>
            <span class="book-fact__label">الأقسام</span>
            <span class="book-fact__value">{sectionCount}</span>
          </div>
        {/if}
        {#if stage}
          <div>
            <span class="book-fact__label">من خارطة التعلّم</span>
            <span class="book-fact__value">{stage.title}</span>
          </div>
        {/if}
        {#if book.license}
          <div>
            <span class="book-fact__label">الترخيص</span>
            <span class="book-fact__value">{book.license}</span>
          </div>
        {/if}
        {#if book.languages?.length}
          <div>
            <span class="book-fact__label">لغات الشيفرة</span>
            <span class="book-fact__value">{book.languages.join(' + ')}</span>
          </div>
        {/if}
      </div>

      {#if prerequisites.length}
        <p class="book-head__author">
          يُقرأ بعد: {prerequisites.map((item) => item.title).join('، ')}
        </p>
      {/if}

      <div class="book-actions">
        {#if firstSection && book.status === 'translated'}
          {#if lastRead?.path}
            <a class="button" href={lastRead.path}>
              تابع من حيث توقّفت — {lastRead.title}
            </a>
            <a
              class="button button--quiet"
              href={sectionPath(
                book.id,
                book.chapters[0].key,
                firstSection.slug
              )}
            >
              ابدأ من الأول
            </a>
          {:else}
            <a
              class="button"
              href={sectionPath(
                book.id,
                book.chapters[0].key,
                firstSection.slug
              )}
            >
              ابدأ القراءة
            </a>
          {/if}
        {/if}
        {#if book.siteUrl}
          <a
            class="button button--quiet"
            href={book.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            الموقع المستقل
          </a>
        {/if}
        {#if book.sourceUrl}
          <a
            class="button button--quiet"
            href={book.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            المصدر الأصلي
          </a>
        {/if}
      </div>

      {#if book.note}
        <p class="sheet-note">{book.note}</p>
      {/if}

      {#if replacement}
        <p class="sheet-note">
          البديل المتاح للترجمة:
          <a href={bookPath(replacement.id)}>{replacement.title}</a>
        </p>
      {/if}
    </div>
  </div>
</section>

{#if book.chapters}
  <div class="container book-body">
    <div>
      <ul class="toc-list">
        {#each book.chapters as chapter}
          <li class="toc-chapter">
            <div class="toc-chapter__head">
              <h2 class="toc-chapter__title">{chapter.title}</h2>
              <span class="toc-chapter__count"
                >{String(chapter.sections.length).padStart(2, '0')}</span
              >
            </div>
            <ul class="toc-sections">
              {#each chapter.sections as section, index}
                <li>
                  <a href={sectionPath(book.id, chapter.key, section.slug)}>
                    <span class="toc-sections__num"
                      >{String(index + 1).padStart(2, '0')}</span
                    >
                    <span>{section.title}</span>
                  </a>
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </div>

    <aside class="book-aside">
      {#if related.length}
        <section class="aside-card">
          <h2>من المرحلة نفسها</h2>
          <ul>
            {#each related as item}
              <li><a href={bookPath(item.id)}>{item.title}</a></li>
            {/each}
          </ul>
        </section>
      {/if}
      {#if prerequisites.length || replacement}
        <section class="aside-card">
          <h2>المسار</h2>
          <ul>
            {#each prerequisites as item}
              <li>
                قبله: <a href={bookPath(item.id)}>{item.title}</a>
              </li>
            {/each}
            {#if replacement}
              <li>
                بديل: <a href={bookPath(replacement.id)}>{replacement.title}</a>
              </li>
            {/if}
          </ul>
        </section>
      {/if}
      <section class="aside-card">
        <h2>الإسناد</h2>
        <ul>
          <li>{book.author}</li>
          {#if book.license}<li>{book.license}</li>{/if}
          <li>ترجمة عربية غير رسمية وغير تجارية.</li>
        </ul>
      </section>
    </aside>
  </div>
{/if}
