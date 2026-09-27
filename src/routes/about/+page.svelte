<script>
  import { books, library } from '$lib/content.js';
  import { withBasePath } from '$lib/html.js';

  const translated = books.filter((book) => book.status === 'translated');
  const queued = books.filter((book) => book.status !== 'translated');
  const pages = translated.reduce((sum, book) => sum + (book.pages || 0), 0);
</script>

<svelte:head>
  <title>عن المطبعة | {library.library}</title>
</svelte:head>

<section class="press-sheet">
  <div class="container">
    <h1 class="press-sheet__title">عن المطبعة</h1>
    <p class="press-sheet__lead">
      {library.subtitle}: مشروع غير ربحي يترجم مصادر علوم الحاسوب المفتوحة إلى
      العربية كاملةً — بلا اختصار ولا تبسيط، ويحفظ لكل مصدر نصّه الأصلي
      وشيفرته وصوره.
    </p>
  </div>
</section>

<div class="container page">
  <div class="colophon-grid">
    <section class="colophon-card">
      <h3>كيف تُترجم الكتب</h3>
      <p>
        يُستورد كل كتاب من مصدره الرسمي (Markdown أو HTML أو LaTeX)، ثم تُترجم
        فصوله فصلاً فصلاً مع الحفاظ على الشيفرة والصور والروابط كما هي، ثم يمرّ
        الكتاب على فحص آلي: كل صفحة عربية، وكل كتلة شيفرة مطابقة للأصل بايتاً
        ببايت، وكل صورة محلية، وصفر روابط مكسورة. لا يُنشر كتاب لم يجتز الفحص.
      </p>
    </section>
    <section class="colophon-card">
      <h3>الأرقام الآن</h3>
      <p>
        {translated.length} كتاباً مكتملاً، و{pages} صفحة مترجمة، و{queued.length}
        مصدراً في الطابور بين مترجمٍ قيد العمل ومصدرٍ ينتظر إذن الترخيص.
      </p>
    </section>
    <section class="colophon-card">
      <h3>التراخيص</h3>
      <p>
        كل كتاب يحتفظ بترخيصه الأصلي كما ذكره مؤلفه. المصادر التي يمنع ترخيصها
        الأعمال المشتقة تظهر كمراجع للقراءة فقط مع بيان ذلك في صفحتها، ومعها
        بديل متاح للترجمة حيث وُجد.
      </p>
    </section>
    <section class="colophon-card">
      <h3>خارطة التعلّم</h3>
      <p>
        الكتب مرتبة في مسار مقترح من التأسيس إلى التخصص، بقائمة متطلبات سابقة لكل
        كتاب. ابدأ من <a href={withBasePath('/path')}>خارطة التعلّم</a> إن لم
        تعرف من أين تبدأ.
      </p>
    </section>
  </div>

  <h2>الكتب المكتملة</h2>
  <ul class="book-row-list">
    {#each translated as book}
      <li>
        <a
          class="book-list-row"
          href={withBasePath(`/book/${book.id}`)}
        >
          <span class="book-list-row__title">{book.title}</span>
          <span class="book-list-row__author">{book.author}</span>
          <span class="book-list-row__meta">{book.pages ?? '—'}</span>
          <span class="badge badge--done">مترجم</span>
        </a>
      </li>
    {/each}
  </ul>

  <h2>في الطابور ({queued.length})</h2>
  <ul class="book-row-list">
    {#each queued as book}
      <li>
        <a class="book-list-row" href={withBasePath(`/book/${book.id}`)}>
          <span class="book-list-row__title">{book.title}</span>
          <span class="book-list-row__author">{book.author}</span>
          <span class="book-list-row__meta">—</span>
          <span class="badge badge--planned">قيد الترجمة</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
