<script>
  import { bookPath, sectionPath } from '$lib/content.js';
  import { withBase } from '$lib/html.js';

  let { data } = $props();
  const { book, chapter, section, content, prev, next } = $derived(data);
</script>

<svelte:head>
  <title>{section.title} | {book.title}</title>
  <meta name="description" content={`${section.title} — ${chapter.title}`} />
</svelte:head>

<div class="container">
  <div class="book-layout">
    <aside class="book-sidebar">
      {#each book.chapters as item}
        <h3>{item.title}</h3>
        <ul>
          {#each item.sections as entry}
            <li>
              <a
                href={sectionPath(book.id, item.key, entry.slug)}
                class:active={entry.slug === section.slug &&
                  item.key === chapter.key}>{entry.title}</a
              >
            </li>
          {/each}
        </ul>
      {/each}
    </aside>

    <article class="reader">
      <div class="reader__header">
        <p class="reader__chapter">{chapter.title}</p>
        <h1>{section.title}</h1>
      </div>

      <div class="reader-content">
        {@html withBase(content?.html) || ''}
      </div>

      <div class="prev-next">
        {#if prev}
          <a class="prev" href={sectionPath(book.id, prev.chapter, prev.slug)}>
            <span class="prev-next__label">السابق</span>
            <span class="prev-next__title">{prev.title}</span>
          </a>
        {:else}
          <a class="prev" href={bookPath(book.id)}>
            <span class="prev-next__label">العودة</span>
            <span class="prev-next__title">فهرس الكتاب</span>
          </a>
        {/if}
        {#if next}
          <a class="next" href={sectionPath(book.id, next.chapter, next.slug)}>
            <span class="prev-next__label">التالي</span>
            <span class="prev-next__title">{next.title}</span>
          </a>
        {/if}
      </div>
    </article>
  </div>
</div>
