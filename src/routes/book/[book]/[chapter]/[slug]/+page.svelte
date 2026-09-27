<script>
  import { bookPath, sectionPath } from '$lib/content.js';
  import { withBase } from '$lib/html.js';
  import { savePosition } from '$lib/reading.js';

  let { data } = $props();
  const { book, chapter, section, content, prev, next } = $derived(data);

  let activeId = $state('');
  let progress = $state(0);
  let bookmarks = $state([]);

  /** @type {{ id: string, text: string, depth: number }[]} */
  const headings = $derived(content?.headings || []);

  const chapterIndex = $derived(
    book.chapters.findIndex((item) => item.key === chapter.key) + 1
  );

  const bookmarkKey = $derived(`${book.id}:${chapter.key}:${section.slug}`);
  const isBookmarked = $derived(bookmarks.includes(bookmarkKey));

  $effect(() => {
    if (!headings.length) return;
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element) => element !== null);

    const onScroll = () => {
      let current = elements[0]?.id || '';
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= 150) {
          current = element.id;
        }
      }
      activeId = current;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  $effect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progress = height > 0 ? Math.min(1, window.scrollY / height) : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  $effect(() => {
    savePosition({
      book: book.id,
      title: `${section.title} — ${book.title}`,
      chapter: chapter.key,
      slug: section.slug,
      path: sectionPath(book.id, chapter.key, section.slug),
    });
    if (typeof localStorage === 'undefined') return;
    bookmarks = JSON.parse(
      localStorage.getItem('arabic-cs-library:bookmarks') || '[]'
    );
  });

  const toggleBookmark = () => {
    bookmarks = isBookmarked
      ? bookmarks.filter((item) => item !== bookmarkKey)
      : [...bookmarks, bookmarkKey];
    try {
      localStorage.setItem(
        'arabic-cs-library:bookmarks',
        JSON.stringify(bookmarks)
      );
    } catch (error) {
      return;
    }
  };
</script>

<svelte:head>
  <title>{section.title} | {book.title}</title>
  <meta name="description" content={`${section.title} — ${chapter.title}`} />
</svelte:head>

<div class="reader-bar">
  <div class="container reader-bar__inner">
    <a class="reader-bar__book" href={bookPath(book.id)}>{book.title}</a>
    <span class="reader-bar__chapter">› {chapter.title}</span>
    <span class="reader-bar__spacer"></span>
    <span class="reader-tool" aria-label={`الفصل ${chapterIndex} من ${book.chapters.length}`}
      >{chapterIndex} / {book.chapters.length}</span
    >
    <button
      class="reader-tool"
      class:reader-tool--on={isBookmarked}
      onclick={toggleBookmark}
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4h10v16l-5-4-5 4z" />
      </svg>
      {isBookmarked ? 'محفوظ' : 'احفظ'}
    </button>
    {#if prev}
      <a class="reader-tool" href={sectionPath(book.id, prev.chapter, prev.slug)}
        >السابق</a
      >
    {/if}
    {#if next}
      <a class="reader-tool" href={sectionPath(book.id, next.chapter, next.slug)}
        >التالي</a
      >
    {/if}
  </div>
  <div class="reader-progress" style={`--progress:${progress}`}></div>
</div>

<div class="container reader-layout">
  <aside class="reader-aside" aria-label="فهرس الكتاب">
    <p class="reader-aside__title">فهرس الكتاب</p>
    {#each book.chapters as item}
      <h3 class:active-chapter={item.key === chapter.key}>{item.title}</h3>
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

  <article class="reader-sheet">
    <h1>{section.title}</h1>

    {#if headings.length > 2 && headings.length <= 12}
      <nav class="toc-inline" aria-label="في هذا القسم">
        <p>في هذا القسم</p>
        <ul>
          {#each headings as heading}
            <li><a href={`#${heading.id}`}>{heading.text}</a></li>
          {/each}
        </ul>
      </nav>
    {/if}

    <div class="reader-content">
      {@html withBase(content?.html) || ''}
    </div>

    <div class="prev-next">
      {#if prev}
        <a href={sectionPath(book.id, prev.chapter, prev.slug)}>
          <span class="prev-next__label">السابق</span>
          <span class="prev-next__title">{prev.title}</span>
        </a>
      {:else}
        <a href={bookPath(book.id)}>
          <span class="prev-next__label">العودة</span>
          <span class="prev-next__title">فهرس الكتاب</span>
        </a>
      {/if}
      {#if next}
        <a href={sectionPath(book.id, next.chapter, next.slug)}>
          <span class="prev-next__label">التالي</span>
          <span class="prev-next__title">{next.title}</span>
        </a>
      {/if}
    </div>
  </article>
</div>
