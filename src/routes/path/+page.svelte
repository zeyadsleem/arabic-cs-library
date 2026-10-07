<script>
  import { books, bookPath, library as manifest } from '$lib/content.js';

  const stages = $derived(manifest.path.stages);
  const booksById = new Map(books.map((book) => [book.id, book]));

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

  const booksByStage = (stageId) =>
    books
      .filter((book) => book.stage === stageId)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const statusLabel = (book) =>
    book.statusText ||
    ({
      translated: 'مترجم',
      blocked: 'غير قابل للترجمة',
      reference: 'مرجع للقراءة',
      planned: 'قيد الترجمة',
    })[book.status] || book.status;

  const statusClass = (book) =>
    ({
      translated: 'badge--done',
      blocked: 'badge--blocked',
      reference: 'badge--reference',
      planned: 'badge--planned',
    })[book.status] || 'badge--planned';
</script>

<svelte:head>
  <title>{manifest.path.title} | {manifest.library}</title>
  <meta name="description" content={manifest.path.intro} />
</svelte:head>

<section class="intro">
  <div class="container">
    <h1 class="intro__title">{manifest.path.title}</h1>
    <p class="intro__lead">{manifest.path.intro}</p>
  </div>
</section>

<div class="container path">
  {#each stages as stage, index}
    <section class="stage" id={stage.id}>
      <span class="stage__num">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h2 class="stage__title">{stage.title}</h2>
        <p class="stage__description">{stage.description}</p>

        <ol class="stage__books">
          {#each booksByStage(stage.id) as book}
            <li
              class="stage-book"
              style={`--book-cloth:${cloth[book.stage] || '#3a3f46'}`}
            >
              <div>
                <a class="stage-book__title" href={bookPath(book.id)}
                  >{book.title}</a
                >
                <span class="stage-book__en">{book.titleEn}</span>
                <p class="stage-book__description">{book.description}</p>
                <p class="stage-book__facts">
                  {#if book.pages}<span>{book.pages} صفحة</span>{/if}
                  {#if book.completeCourse}<span>كورس كامل</span>{/if}
                  <span>{book.author}</span>
                </p>
                <div class="stage-book__badges">
                  <span class="badge {statusClass(book)}"
                    >{statusLabel(book)}</span
                  >
                  {#if book.prerequisites?.length}
                    <span class="badge badge--reference">
                      يُقرأ بعد: {book.prerequisites
                        .map((id) => booksById.get(id)?.title || id)
                        .join('، ')}
                    </span>
                  {/if}
                  {#if book.replacement && booksById.get(book.replacement)}
                    <span class="badge badge--reference">
                      البديل: {booksById.get(book.replacement).title}
                    </span>
                  {/if}
                </div>
                {#if book.note}
                  <p class="sheet-note">{book.note}</p>
                {/if}
              </div>
              <div class="stage-book__action">
                <a class="button button--quiet" href={bookPath(book.id)}>
                  {book.status === 'translated' ? 'اقرأ' : 'التفاصيل'}
                </a>
              </div>
            </li>
          {/each}
        </ol>
      </div>
    </section>
  {/each}
</div>
