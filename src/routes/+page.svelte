<script>
  import { books, bookPath, library } from '$lib/content.js';
</script>

<svelte:head>
  <title>{library.library} - ترجمات عربية لكتب علوم الحاسوب</title>
</svelte:head>

<section class="hero">
  <div class="container">
    <h1 class="hero__title">{library.library}</h1>
    <p class="hero__subtitle">
      {library.subtitle}. نبدأ بكتاب «مرحباً بالخوارزميات» بلغتي Go وTypeScript،
      ثم تتوالى بقية الكتب تباعاً.
    </p>
  </div>
</section>

<div class="container">
  <h2 class="section-title">الكتب والمصادر</h2>
  <div class="books-grid">
    {#each books as book}
      <a class="book-card" href={bookPath(book.id)}>
        <h3 class="book-card__title">{book.title}</h3>
        <p class="book-card__meta">
          {book.titleEn} — {book.author}
        </p>
        <p class="book-card__description">{book.description}</p>
        {#if book.status === 'translated'}
          <span class="badge badge--done">
            مترجم بالكامل{book.languages
              ? ` — ${book.languages.join(' + ')}`
              : ''}
          </span>
        {:else}
          <span class="badge badge--planned">قيد الإعداد</span>
        {/if}
      </a>
    {/each}
  </div>
</div>
