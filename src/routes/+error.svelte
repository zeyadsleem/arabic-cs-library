<script>
  import { withBasePath } from '$lib/html.js';
</script>

<svelte:head>
  <title>الصفحة غير موجودة | المكتبة العربية</title>
</svelte:head>

<div class="container page">
  <h1>لم نجد هذه الصفحة</h1>
  <p class="page__lead">
    الرابط الذي فتحته لا يقابل صفحةً في المكتبة. قد يكون الفصل قد نُقل، أو الرابط
    قديماً.
  </p>
  <div class="press-actions">
    <a class="button" href={withBasePath('/')}>تصفّح الرف</a>
    <a class="button button--quiet" href={withBasePath('/search')}>
      ابحث عن الفصل
    </a>
  </div>
</div>
