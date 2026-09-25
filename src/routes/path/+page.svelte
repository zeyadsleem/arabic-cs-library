<script>
  import { books, bookPath, library as manifest } from '$lib/content.js';

  const stages = $derived(manifest.path.stages);

  const booksByStage = (stageId) =>
    books.filter((book) => book.stage === stageId).sort((a, b) => a.order - b.order);

  const byId = (id) => books.find((book) => book.id === id) || null;

  const statusLabel = (book) => {
    if (book.status === 'translated') return 'مترجم';
    if (book.status === 'blocked') return 'غير قابل للترجمة';
    if (book.status === 'reference') return 'مرجع للقراءة';
    return 'قيد الترجمة';
  };

  const statusClass = (book) => {
    if (book.status === 'translated') return 'badge--done';
    if (book.status === 'blocked') return 'badge--blocked';
    if (book.status === 'reference') return 'badge--reference';
    return 'badge--planned';
  };
</script>

<svelte:head>
  <title>{manifest.path.title} | {manifest.library}</title>
  <meta name="description" content={manifest.path.intro} />
</svelte:head>

<section class="hero">
  <div class="container">
    <h1 class="hero__title">{manifest.path.title}</h1>
    <p class="hero__subtitle">{manifest.path.intro}</p>
  </div>
</section>

<div class="container path">
  {#each stages as stage}
    <section class="path-stage" id={stage.id}>
      <header class="path-stage__header">
        <span class="path-stage__icon" aria-hidden="true">{stage.icon}</span>
        <div>
          <h2 class="path-stage__title">{stage.title}</h2>
          <p class="path-stage__description">{stage.description}</p>
        </div>
      </header>

      <ol class="path-list">
        {#each booksByStage(stage.id) as book}
          <li class="path-item">
            <div class="path-item__main">
              <a class="path-item__title" href={bookPath(book.id)}>{book.title}</a>
              <span class="path-item__meta">
                {book.titleEn} — {book.author}
              </span>
              <p class="path-item__description">{book.description}</p>
              <p class="path-item__facts">
                {#if book.pages}<span>{book.pages} صفحة</span>{/if}
                {#if book.completeCourse}
                  <span>{book.completeCourse ? 'كورس كامل' : 'جزئي'}</span>
                {/if}
                {#if book.license}<span>{book.license}</span>{/if}
              </p>
              <div class="path-item__badges">
                <span class="badge {statusClass(book)}">{statusLabel(book)}</span>
                {#if book.prerequisites?.length}
                  <span class="badge badge--plain">
                    يتطلب: {book.prerequisites
                      .map((id) => byId(id)?.title || id)
                      .join('، ')}
                  </span>
                {/if}
              </div>
              {#if book.note}
                <p class="book-note">{book.note}</p>
              {/if}
              {#if book.siteUrl && book.status === 'translated'}
                <p class="path-item__links">
                  <a href={book.siteUrl} target="_blank" rel="noopener noreferrer"
                    >الموقع المستقل</a
                  >
                </p>
              {/if}
              {#if book.replacement && byId(book.replacement)}
                <p class="book-note">
                  البديل: <a href={bookPath(book.replacement)}
                    >{byId(book.replacement).title}</a
                  >
                </p>
              {/if}
            </div>
          </li>
        {/each}
      </ol>
    </section>
  {/each}
</div>
