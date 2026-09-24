<script>
  import { books, library } from '$lib/content.js';
  import { withBasePath } from '$lib/html.js';

  const translated = books.filter((book) => book.status === 'translated');
  const planned = books.filter((book) => book.status !== 'translated');
</script>

<svelte:head>
  <title>عن المكتبة | {library.library}</title>
</svelte:head>

<div class="container page">
  <h1>عن المكتبة</h1>
  <p class="page__lead">
    {library.subtitle}: مشروع غير ربحي يهدف إلى إتاحة مصادر علوم الحاسوب
    الأساسية بالعربية بشكل منظم ومهيكل.
  </p>

  <p>
    تُترجم الكتب من مصادرها الأصلية المفتوحة، ويُحتفظ لكل كتاب بترخيصه
    الأصلي والإسناد الكامل لمؤلفيه، مع روابط مباشرة إلى المصدر الأصلي. المكتبة
    تعرض الكتب المكتملة والكتب قيد الإعداد في مكان واحد، ويُنشر كل كتاب فور
    اكتماله.
  </p>

  <h2>الكتب المترجمة</h2>
  <ul class="chapter-list">
    {#each translated as book}
      <li>
        <a href={withBasePath(`/book/${book.id}`)}>
          <span>{book.title}</span>
        </a>
      </li>
    {/each}
  </ul>

  <h2>كتب قيد الإعداد ({planned.length})</h2>
  <ul class="chapter-list">
    {#each planned as book}
      <li>
        <a href={withBasePath(`/book/${book.id}`)}>
          <span>{book.title}</span>
        </a>
      </li>
    {/each}
  </ul>

  <p>
    <a class="button" href={withBasePath('/')}>تصفّح المكتبة</a>
  </p>
</div>
