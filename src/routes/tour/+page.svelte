<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getBook, bookPath, sectionPath } from '$lib/content.js';

  // Preserve links to the originally published standalone Tour.
  onMount(() => {
    const match = location.hash.match(/^#([a-z]+)\/(\d+)$/);
    const book = getBook('go-tour');
    const chapter = match ? book?.chapters?.find((item) => item.key === match[1]) : null;
    const number = match ? Number(match[2]) : 0;
    const section = chapter && Number.isSafeInteger(number) ? chapter.sections[number - 1] : null;
    const target = chapter && section
      ? sectionPath('go-tour', chapter.key, section.slug)
      : bookPath('go-tour');
    void goto(target, { replaceState: true });
  });
</script>

<svelte:head><title>جولة Go — الانتقال إلى الكتاب</title></svelte:head>
<div class="container page">
  <p>الجولة أصبحت كتاباً داخل المكتبة.</p>
  <a class="button" href={bookPath('go-tour')}>افتح كتاب جولة Go</a>
</div>
