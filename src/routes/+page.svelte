<script>
  import { books, bookPath, library } from '$lib/content.js';
  import { withBasePath } from '$lib/html.js';
  import { readPosition } from '$lib/reading.js';

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

  const stageOrder = new Map(
    library.path.stages.map((stage, index) => [stage.id, index])
  );

  const translated = books.filter((book) => book.status === 'translated');
  const queued = books.filter((book) => book.status !== 'translated');
  const totalPages = translated.reduce(
    (sum, book) => sum + (book.pages || 0),
    0
  );

  let filter = $state('all');
  let sort = $state('stage');
  let view = $state('grid');
  let lastRead = $state(null);

  $effect(() => {
    lastRead = readPosition();
  });

  const visible = $derived.by(() => {
    const list = filter === 'all' ? books : books.filter((book) => filter === 'done' ? book.status === 'translated' : book.status !== 'translated');
    return [...list].sort((a, b) => {
      if (sort === 'pages') return (b.pages || 0) - (a.pages || 0);
      if (sort === 'title') return a.title.localeCompare(b.title, 'ar');
      return (
        (stageOrder.get(a.stage) ?? 99) - (stageOrder.get(b.stage) ?? 99) ||
        (a.order ?? 99) - (b.order ?? 99)
      );
    });
  });

  const statusLabel = (book) =>
    ({
      translated: 'مترجم',
      planned: 'قيد الترجمة',
      blocked: 'غير قابل للترجمة',
      reference: 'مرجع للقراءة',
    })[book.status] || book.status;

  const statusClass = (book) =>
    ({
      translated: 'badge--done',
      planned: 'badge--planned',
      blocked: 'badge--blocked',
      reference: 'badge--reference',
    })[book.status] || 'badge--planned';
</script>

<svelte:head>
  <title>{library.library} — مكتبة عربية لعلوم الحاسوب</title>
</svelte:head>

<section class="intro">
  <div class="container">
    <h1 class="intro__title">{library.title}</h1>
    <p class="intro__lead">
      {library.subtitle}: كل كتاب يُترجم كاملاً من مصدره المفتوح ويُنشر هنا
      للقراءة من المتصفّح مباشرة، بلا حساب ولا إعلانات.
    </p>
    <div class="intro__stats">
      <span class="stat"
        ><b>{translated.length}</b><span>كتاباً مكتملاً</span></span
      >
      <span class="stat"
        ><b>{totalPages.toLocaleString('en-US')}</b
        ><span>صفحة مترجمة</span></span
      >
      <span class="stat"
        ><b>{library.sections.length}</b><span>قسماً للقراءة</span></span
      >
      <span class="stat"
        ><b>{queued.length}</b><span>مصدراً في الطابور</span></span
      >
    </div>

    {#if lastRead?.path}
      <div class="continue-card">
        <p>
          <span class="continue-card__label">تابع القراءة</span>
          {lastRead.title}
        </p>
        <a class="button" href={withBasePath(lastRead.path)}>افتح الموضع</a>
      </div>
    {/if}
  </div>
</section>

<div class="container catalogue">
  <div class="catalogue__bar">
    <button
      class="chip"
      class:chip--on={filter === 'all'}
      onclick={() => (filter = 'all')}>الكل ({books.length})</button
    >
    <button
      class="chip"
      class:chip--on={filter === 'done'}
      onclick={() => (filter = 'done')}
      >مترجم ({translated.length})</button
    >
    <button
      class="chip"
      class:chip--on={filter === 'queued'}
      onclick={() => (filter = 'queued')}
      >قيد الترجمة ({queued.length})</button
    >
    <select class="catalogue__sort" bind:value={sort} aria-label="الترتيب">
      <option value="stage">ترتيب خارطة التعلّم</option>
      <option value="pages">الأكثر صفحات</option>
      <option value="title">أبجدياً</option>
    </select>
    <button
      class="chip"
      onclick={() => (view = view === 'grid' ? 'list' : 'grid')}
      aria-label="تبديل طريقة العرض"
      >{view === 'grid' ? 'عرض قائمة' : 'عرض شبكة'}</button
    >
    <span class="catalogue__count">{visible.length} كتاباً</span>
  </div>

  {#if view === 'grid'}
    <ul class="book-grid">
      {#each visible as book}
        <li>
          <a
            class="book-card"
            style={`--book-cloth:${cloth[book.stage] || '#3a3f46'}`}
            href={bookPath(book.id)}
          >
            <span class="book-card__en">{book.titleEn}</span>
            <h2 class="book-card__title">{book.title}</h2>
            <p class="book-card__author">{book.author}</p>
            <p class="book-card__description">{book.description}</p>
            <span class="book-card__foot">
              {#if book.pages}<span>{book.pages} صفحة</span>{/if}
              <span class="badge {statusClass(book)}">{statusLabel(book)}</span>
              <span class="book-card__cta">
                {book.status === 'translated' ? 'اقرأ ←' : 'التفاصيل ←'}
              </span>
            </span>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <ul class="book-row-list">
      {#each visible as book}
        <li>
          <a
            class="book-list-row"
            style={`--book-cloth:${cloth[book.stage] || '#3a3f46'}`}
            href={bookPath(book.id)}
          >
            <span class="book-list-row__title">{book.title}</span>
            <span class="book-list-row__author">{book.author}</span>
            <span class="book-list-row__meta"
              >{book.pages ? `${book.pages} صفحة` : '—'}</span
            >
            <span class="badge {statusClass(book)}">{statusLabel(book)}</span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>
