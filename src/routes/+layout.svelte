<script>
  import 'highlight.js/styles/atom-one-dark.css';
  import '../app.css';
  import '../lib/library.css';
  import { page } from '$app/state';
  import { library } from '$lib/content.js';
  import { withBasePath } from '$lib/html.js';

  let { children } = $props();
  let menuOpen = $state(false);

  const navItems = [
    { href: withBasePath('/'), label: 'المكتبة' },
    { href: withBasePath('/path'), label: 'خارطة التعلم' },
    { href: withBasePath('/book/hello-algo'), label: 'مرحباً بالخوارزميات' },
    { href: withBasePath('/about'), label: 'عن المكتبة' },
    { href: withBasePath('/search'), label: 'البحث' },
  ];

  let theme = $state('light');

  $effect(() => {
    if (typeof document === 'undefined') return;
    theme =
      document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    if (theme === 'dark') {
      document.documentElement.dataset.theme = 'dark';
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  };

  const currentPath = $derived(page.url.pathname);
</script>

<svelte:head>
  <title>{library.library} - نسخة عربية</title>
  <meta
    name="description"
    content="ترجمات عربية مفتوحة لكتب ومصادر علوم الحاسوب: الخوارزميات وبنى البيانات وأنظمة التشغيل والشبكات والمترجمات وغيرها."
  />
</svelte:head>

<a class="skip-link" href="#main">الانتقال إلى المحتوى</a>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="logo" href={withBasePath('/')}>
      <span class="logo__title">المكتبة العربية</span>
      <span class="logo__subtitle">لعلوم الحاسوب</span>
    </a>

    <button
      class="menu-toggle"
      aria-label="قائمة التنقل"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span></span><span></span><span></span>
    </button>

    <nav class="site-nav" class:site-nav--open={menuOpen}>
      {#each navItems as item}
        <a
          href={item.href}
          class:active={currentPath === item.href}
          onclick={() => (menuOpen = false)}>{item.label}</a
        >
      {/each}
      <button class="theme-toggle" onclick={toggleTheme} aria-label="تبديل السمة">
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </nav>
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="site-footer">
  <div class="container site-footer__inner">
    <div>
      <p class="site-footer__text">
        {library.library} — مشروع ترجمة عربية غير رسمي وغير تجاري. جميع الحقوق
        الفكرية للمؤلفين الأصليين، وكل كتاب يحتفظ بترخيصه الأصلي المذكور في
        صفحته.
      </p>
      <p class="site-footer__text">
        المحتوى الأصلي متاح على المواقع والمستودعات المذكورة في كل صفحة كتاب.
      </p>
    </div>
    <nav class="site-footer__links">
      <a href={withBasePath('/')}>الكتب</a>
      <a href={withBasePath('/path')}>خارطة التعلم</a>
      <a href={withBasePath('/about')}>عن المكتبة</a>
      <a href={withBasePath('/search')}>البحث</a>
    </nav>
  </div>
</footer>
