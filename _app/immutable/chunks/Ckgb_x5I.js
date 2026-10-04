const s="ahastack",n="example-alpine",t="إضافة Alpine",a="index",e="إضافة Alpine",p=[],l=`<p>في <a href="/arabic-cs-library/book/ahastack/example-first/index">المثال السابق</a> بنينا عدّادًا باستخدام Astro و htmx. لنضِف الآن «A» في نهاية AHA.</p>
<p>سنضيف زرّ إعادة تعيين (Reset). لكن إعادة التعيين إجراء مُتلِف، لذا نريد من المستخدم أن يؤكّد أولًا.</p>
<p>إليك قاعدة الإبهام: كل ما يتحدث إلى الخادم فهو htmx. وكل ما هو حالة واجهة (UI state) فحسب، تعيش في المتصفح وحده، فهو Alpine.</p>
<p>«هل أطلب تأكيدًا الآن؟» هي حالة واجهة. وهذه مهمة Alpine.</p>
<p>«اجعل القيمة صفرًا» يتحدث إلى الخادم. وهذه مهمة htmx.</p>
<p>ثبّت Alpine بإضافة وسم <code>إلى</code>، بجوار htmx:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">defer</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>الآن أضف هذا إلى \`\`، تحت الزرّين:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">x-data</span>=<span class="hljs-string">&quot;{ confirming: false }&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">x-show</span>=<span class="hljs-string">&quot;!confirming&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;confirming = true&quot;</span>&gt;</span>Reset<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">x-show</span>=<span class="hljs-string">&quot;confirming&quot;</span>&gt;</span>
    Sure?
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">hx-post</span>=<span class="hljs-string">&quot;/api/reset&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;confirming = false&quot;</span>&gt;</span>Yes<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;confirming = false&quot;</span>&gt;</span>No<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>Reset    Sure?  Yes  No   &quot;&gt;</p>
<p>لنرَ ما يحدث هنا.</p>
<p><code>x-data</code> ينشئ قطعة صغيرة من الحالة، هي <code>confirming</code>، محصورة في نطاق هذا <code>div</code> تحديدًا. وتبدأ بقيمة <code>false</code>.</p>
<p><code>x-show</code> يُظهر عنصرًا أو يخفيه بحسب شرط. عندما تكون <code>confirming</code> مساوية لـ <code>false</code> نرى زرّ إعادة التعيين. وعندما تكون <code>true</code> نرى السؤال.</p>
<p><code>@click</code> يشغّل بعض شيفرة JavaScript عند نقر العنصر. وهنا نحن نكتفي بعكس قيمة <code>confirming</code>.</p>
<p>زرّ «Yes» هو المكان الذي تلتقي فيه htmx و Alpine. فـ <code>hx-post</code> يُرسل الطلب إلى الخادم، و <code>@click</code> يُغلق نافذة التأكيد. سمتان بمكتبتين، وزرّ واحد.</p>
<p>الآن إلى جهة الخادم. أنشئ <code>src/pages/api/reset.astro</code>:</p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

export const partial = true

await env.DB.prepare('UPDATE counter SET value = 0 WHERE id = 1').run()
---

&lt;span id='count' hx-swap-oob='true'&gt;0&lt;/span&gt;
</code></pre>
<p>0&quot;&gt;</p>
<p>النمط نفسه كما في الزيادة والإنقاص. حدّث قاعدة البيانات، وأعِد القيمة الجديدة كمبادلة oob.</p>
<p>جرّبه على <a href="https://demo.ahastack.dev/counter">https://demo.ahastack.dev/counter</a>.</p>
<p>يوجد في ذلك الموقع <a href="https://demo.ahastack.dev">18 عرضًا توضيحيًا</a>: بحثٌ فوري، وقوائم مهام، وتحقّقٌ فوري من الحقول، وتمريرٌ لا نهائي، واستطلاع (polling)، ونوافذ منبثقة، وواجهة تفاؤلية (optimistic UI)، ومعالجة أخطاء، وتنقّلٌ مُعزَّز (boosted navigation)، وغيرها. ولكلٍّ منها قسم «ما الذي ينبغي الانتباه إليه» ورابطٌ إلى شيفرته المصدرية.</p>
<p>لاحظ ما <em>لم</em> نفعله. لم نكتب مستمع حدث (event listener). لم نُسأل DOM. لم نتتبّع الحالة في متغيّر JavaScript في مكان آخر ونزامنها مع الـ HTML.</p>
<p>الحالة تعيش في مكان استخدامها بالضبط. أنت تقرأ الـ HTML وتعرف ما الذي يحدث.</p>
<p>هذه هي رشة التفاعلية. Alpine ممتاز في هذه الأشياء الصغيرة والمحلية: التبديل، والإظهار والإخفاء، وتتبّع قيمة حقل إدخال، والاستجابة لضغطة مفتاح.</p>
<p>شيفرة الصفحة الكاملة، <code>src/pages/index.astro</code>:</p>
<pre><code class="language-astro">---
import { env } from 'cloudflare:workers'

const count = await env.DB.prepare('SELECT value FROM counter WHERE id = 1')
  .first('value')
---

&lt;html lang='en'&gt;
  &lt;head&gt;
    &lt;meta charset='utf-8' /&gt;
    &lt;meta name='viewport' content='width=device-width' /&gt;
    &lt;title&gt;AHA counter&lt;/title&gt;
    &lt;script src='https://cdn.jsdelivr.net/npm/htmx.org@4.0.0'&gt;&lt;/script&gt;
    &lt;script defer src='https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js'
    &gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Count: &lt;span id='count'&gt;{count}&lt;/span&gt;&lt;/h1&gt;

    &lt;button hx-post='/api/increment'&gt;Increment&lt;/button&gt;
    &lt;button hx-post='/api/decrement'&gt;Decrement&lt;/button&gt;

    &lt;div x-data='{ confirming: false }'&gt;
      &lt;button x-show='!confirming' @click='confirming = true'&gt;Reset&lt;/button&gt;
      &lt;span x-show='confirming'&gt;
        Sure?
        &lt;button hx-post='/api/reset' @click='confirming = false'&gt;Yes&lt;/button&gt;
        &lt;button @click='confirming = false'&gt;No&lt;/button&gt;
      &lt;/span&gt;
    &lt;/div&gt;
  &lt;/body&gt;

</code></pre>
<pre><code>    AHA counter         
</code></pre>
<h1>Count: {count}</h1>
<p>Increment  Decrement     Reset    Sure?  Yes  No       &quot;&gt;</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:l};export{s as book,n as chapter,t as chapterTitle,c as default,p as headings,l as html,a as slug,e as title};
