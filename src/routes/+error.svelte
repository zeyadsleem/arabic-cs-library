<script>
  import { withBasePath } from '$lib/html.js';
</script>

<svelte:head>
  <title>الصفحة غير موجودة | المكتبة العربية</title>
</svelte:head>

<div class="container page">
  <h1>404 - الصفحة غير موجودة</h1>
  <p>عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
  <p><a class="button" href={withBasePath('/')}>العودة إلى المكتبة</a></p>
</div>
