<script>
  import 'highlight.js/styles/atom-one-dark.css';
  import 'katex/dist/katex.min.css';
  import '../app.css';
  import '../lib/library.css';
  import { page } from '$app/state';
  import { library } from '$lib/content.js';
  import { withBasePath } from '$lib/html.js';
  import { goto } from '$app/navigation';

  let { children } = $props();
  let menuOpen = $state(false);
  let term = $state('');

  const navItems = [
    { href: withBasePath('/'), label: 'المكتبة' },
    { href: withBasePath('/path'), label: 'خارطة التعلّم' },
    { href: withBasePath('/about'), label: 'عن المكتبة' },
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
    } catch (error) {
      return;
    }
  };

  const submitSearch = (event) => {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    goto(`${withBasePath('/search')}?q=${encodeURIComponent(value)}`);
    menuOpen = false;
  };

  const currentPath = $derived(page.url.pathname);
</script>

<svelte:head>
  <title>{library.library} — مكتبة عربية لعلوم الحاسوب</title>
  <meta
    name="description"
    content="ترجمات عربية كاملة لكتب علوم الحاسوب: الخوارزميات وبنى البيانات والأنظمة والشبكات وقواعد البيانات ولغات البرمجة، تُقرأ من المتصفّح."
  />
</svelte:head>

<a class="skip-link" href="#main">الانتقال إلى المحتوى</a>

<header class="press-header">
  <div class="press-header__rule"></div>
  <div class="container press-header__inner">
    <a class="press-mark" href={withBasePath('/')}>
      <span class="press-mark__name">المكتبة العربية</span>
      <span class="press-mark__desk">لعلوم الحاسوب</span>
    </a>

    <form
      class="header-search"
      method="get"
      action={withBasePath('/search')}
      onsubmit={submitSearch}
      role="search"
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6" />
        <path d="M15 15l5 5" />
      </svg>
      <input
        type="search"
        name="q"
        placeholder="ابحث في الكتب والأقسام…"
        bind:value={term}
        aria-label="البحث في المكتبة"
      />
    </form>

    <nav class="press-nav" class:press-nav--open={menuOpen} aria-label="التنقل">
      {#each navItems as item}
        <a
          href={item.href}
          class:active={currentPath === item.href}
          onclick={() => (menuOpen = false)}>{item.label}</a
        >
      {/each}
      <a
        href={withBasePath('/search')}
        class:active={currentPath === withBasePath('/search')}>البحث</a
      >
    </nav>

    <button
      class="press-nav theme-toggle"
      onclick={toggleTheme}
      aria-label="تبديل السمة"
      title="تبديل السمة"
    >
      {#if theme === 'dark'}
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
          />
        </svg>
      {:else}
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </svg>
      {/if}
    </button>

    <button
      class="press-nav press-menu-toggle"
      aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      {#if menuOpen}
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      {:else}
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      {/if}
    </button>
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="press-footer">
  <div class="container press-footer__inner">
    <div>
      <p>
        {library.library} — مشروع ترجمة عربية غير رسمي وغير تجاري. جميع الحقوق
        الفكرية للمؤلفين الأصليين، وكل كتاب يحتفظ بترخيصه الأصلي المذكور في
        صفحته.
      </p>
      <p>
        المحتوى الأصلي متاح على المواقع والمستودعات المذكورة في كل صفحة كتاب.
      </p>
    </div>
    <nav class="press-footer__links" aria-label="روابط التذييل">
      <a href={withBasePath('/')}>الكتب</a>
      <a href={withBasePath('/path')}>خارطة التعلّم</a>
      <a href={withBasePath('/search')}>البحث</a>
      <a href={withBasePath('/about')}>عن المكتبة</a>
    </nav>
  </div>
</footer>
