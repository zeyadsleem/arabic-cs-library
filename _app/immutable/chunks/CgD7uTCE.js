const s="kinney",n="storybook",o="بناء أنظمة التصميم في Storybook",a="setting-up-tailwind",t="استيراد الأنماط واستخدام Tailwind واستخدام السمات",e=[{depth:2,id:"إضافة-أنماطك-إلى-storybook",text:"إضافة أنماطك إلى Storybook"},{depth:2,id:"دعم-الوضع-الداكن",text:"دعم الوضع الداكن"},{depth:2,id:"استخدام-إضافة-السمات-في-storybook",text:"استخدام إضافة السمات في Storybook"},{depth:3,id:"استخدام-خاصية-بيانات",text:"استخدام خاصية بيانات"}],p=`<blockquote>
<p><strong>هذا ليس خاصًّا بـ Tailwind بالضرورة</strong></p>
<p>يمكن تطبيق كل ما في هذا القسم تقريبًا على أي أوراق أنماط تستخدمها في تطبيقك، لكن بما أننا سنستخدم Tailwind في نظام التصميم لدينا، فإن لهذا نكهة خفيفة من Tailwind، أما المحتوى نفسه فينطبق على نطاق أوسع.</p>
<p>هناك أسباب كثيرة تدعوك إلى التفكير في استخدام Tailwind، وأسباب مماثلة تمامًا قد تجعله ليس الخيار الأنسب. وقد بذلت جهدي في عرض تفكيري <a href="https://stevekinney.com/writing/tailwind-and-design-systems">هنا</a>.</p>
</blockquote>
<p>التكامل مع <a href="https://tailwindcss.com/">Tailwind</a> — أو، بصراحة، مع أي أنماط أخرى أعددتها — سهل إلى حدّ كبير مع Storybook.</p>
<blockquote>
<p><strong>هذا مُعدّ بالفعل في المشروع المثال</strong></p>
<p>يمكنك تجاوز هذه الخطوة إن كنت تتابع مع مستودعنا المثال. أُدرج هذا هنا لمجرد الرجوع إليه لاحقًا.</p>
</blockquote>
<p>إن احتجت إلى تثبيت Tailwind، يمكنك تشغيل ما يلي:</p>
<pre><code class="language-bash">npm install -D tailwindcss postcss autoprefixer
npx tailwind init --ts -p
</code></pre>
<h2 id="إضافة-أنماطك-إلى-storybook">إضافة أنماطك إلى Storybook</h2>
<p>في <code>.storybook/preview.ts</code>، ما عليك إلا استيراد أي ورقة أنماط تريد تضمينها في قصصك. وستُطبَّق هذه <em>فقط</em> على اللوحة (canvas) و<em>ليس</em> على واجهة Storybook بأكملها.</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/.storybook/preview.ts b/.storybook/preview.ts</span>
<span class="hljs-comment">index adcda96..6725718 100644</span>
<span class="hljs-comment">--- a/.storybook/preview.ts</span>
<span class="hljs-comment">+++ b/.storybook/preview.ts</span>
<span class="hljs-meta">@@ -1,5 +1,7 @@</span>
 import type { Preview } from &#x27;@storybook/react&#x27;;

<span class="hljs-addition">+import &#x27;../src/index.css&#x27;;</span>
<span class="hljs-addition">+</span>
 const preview: Preview = {
   parameters: {
     controls: {
</code></pre>
<h2 id="دعم-الوضع-الداكن">دعم الوضع الداكن</h2>
<p>يأتي Tailwind بدعم جاهز لـ<a href="https://tailwindcss.com/docs/dark-mode">الوضع الداكن</a>. يستخدم Tailwind افتراضيًا تفضيلات المتصفح (باستخدام <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme">استعلام الوسائط <code>prefers-color-scheme</code></a>) لتحديد ما إذا كان ينبغي تصيير المحتوى في الوضع الداكن، لكنه يتيح لك أيضًا تحديد ما إذا كنت تفضّل تفعيل الوضع الداكن عبر محدِّد CSS.</p>
<p>سنرغب في التبديل بين الوضعين الفاتح والداكن دون الحاجة إلى تعديل إعدادات متصفحنا. لذا، لنُعدّ ذلك.</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/tailwind.config.ts b/tailwind.config.ts</span>
<span class="hljs-comment">index bc8a713..5015364 100644</span>
<span class="hljs-comment">--- a/tailwind.config.ts</span>
<span class="hljs-comment">+++ b/tailwind.config.ts</span>
<span class="hljs-meta">@@ -2,6 +2,7 @@</span> import type { Config } from &#x27;tailwindcss&#x27;;

 export default {
   content: [&#x27;./src/**/*.{js,jsx,ts,tsx,mdx,html}&#x27;],
<span class="hljs-addition">+  darkMode: [&#x27;class&#x27;, &#x27;[data-mode=&quot;dark&quot;]&#x27;],</span>
   theme: {
     extend: {},
   },
</code></pre>
<h2 id="استخدام-إضافة-السمات-في-storybook">استخدام إضافة السمات في Storybook</h2>
<p>تحتوي واجهة Storybook الطرفية على مساعد يثبّت الإضافات كاعتماد ويضيف الإضافة أيضًا إلى <code>.storybook/main.ts</code>.</p>
<pre><code class="language-bash">npx storybook@latest add @storybook/addon-themes
</code></pre>
<blockquote>
<p><strong>إذا ظهرت لك رسالة خطأ مفادها أن Storybook لا يجد إعداد <code>main.js</code> لديك</strong></p>
<p>يمكنك ببساطة تثبيت الاعتماد ثم <a href="https://stevekinney.com/courses/storybook/add-an-addon">إضافته يدويًّا إلى مصفوفة الإضافات</a>.</p>
</blockquote>
<p>سيُطرح عليك السؤال التالي:</p>
<pre><code class="language-typescript">? <span class="hljs-title class_">How</span> <span class="hljs-keyword">do</span> you toggle themes? › - <span class="hljs-title class_">Use</span> arrow-keys. <span class="hljs-title class_">Return</span> to submit.
❯   <span class="hljs-variable constant_">CSS</span> <span class="hljs-keyword">class</span>
    <span class="hljs-title class_">Data</span> attribute
</code></pre>
<p>إن احتجت إلى إعداد ذلك يدويًّا، يمكنك إضافة ما يلي إلى <code>.storybook/main.ts</code>.</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/.storybook/main.ts b/.storybook/main.ts</span>
<span class="hljs-comment">index 098b7b7..63965e0 100644</span>
<span class="hljs-comment">--- a/.storybook/main.ts</span>
<span class="hljs-comment">+++ b/.storybook/main.ts</span>
<span class="hljs-meta">@@ -8,6 +8,7 @@</span> const config: StorybookConfig = {
     &#x27;@storybook/addon-essentials&#x27;,
     &#x27;@chromatic-com/storybook&#x27;,
     &#x27;@storybook/addon-interactions&#x27;,
<span class="hljs-addition">+    &#x27;@storybook/addon-themes&#x27;,</span>
   ],
   framework: {
     name: &#x27;@storybook/react-vite&#x27;,
</code></pre>
<h3 id="استخدام-خاصية-بيانات">استخدام خاصية بيانات</h3>
<p>اخترنا استخدام خاصية بيانات للوضع الداكن، لكن يمكنك أيضًا استخدام صنف (class). وقد تختلف النتيجة لديك، لكن نتيجتي مستمدّة من إضافة الوضع الداكن إلى قاعدة شيفرة قديمة. لذا سأختار استخدام خاصية بيانات.</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/.storybook/preview.ts b/.storybook/preview.ts</span>
<span class="hljs-comment">index 6725718..f68d778 100644</span>
<span class="hljs-comment">--- a/.storybook/preview.ts</span>
<span class="hljs-comment">+++ b/.storybook/preview.ts</span>
<span class="hljs-meta">@@ -1,4 +1,5 @@</span>
 import type { Preview } from &#x27;@storybook/react&#x27;;
<span class="hljs-addition">+import { withThemeByDataAttribute } from &#x27;@storybook/addon-themes&#x27;;</span>

 import &#x27;../src/index.css&#x27;;

<span class="hljs-meta">@@ -11,6 +12,16 @@</span> const preview: Preview = {
       },
     },
   },
<span class="hljs-addition">+  decorators: [</span>
<span class="hljs-addition">+    withThemeByDataAttribute({</span>
<span class="hljs-addition">+      defaultTheme: &#x27;light&#x27;,</span>
<span class="hljs-addition">+      themes: {</span>
<span class="hljs-addition">+        light: &#x27;light&#x27;,</span>
<span class="hljs-addition">+        dark: &#x27;dark&#x27;,</span>
<span class="hljs-addition">+      },</span>
<span class="hljs-addition">+      attributeName: &#x27;data-mode&#x27;,</span>
<span class="hljs-addition">+    }),</span>
<span class="hljs-addition">+  ],</span>
 };

 export default preview;
</code></pre>
<p>كما قلت، كلا الجوابين مقبول حسب إعداداتك. وليس لديّ رأي قوي خارج تجربة ترحيل قاعدة شيفرة قائمة واكتشاف — بالطريقة الصعبة — أن <code>dark</code> كان مستخدمًا بالفعل لأغراض أخرى، لذا سأمضي مع خاصية البيانات.</p>
<p>إن سار كل شيء على ما يرام، فمن المفترض أن ترى شيئًا كهذا:</p>
<p><img src="/arabic-cs-library/images/kinney/664ad2c027c7044f.webp" alt="إشعار من واجهة Storybook الطرفية بأن إضافة السمات ثُبِّتت بنجاح"></p>
<p>إضافةً إلى تثبيت الاعتماد، سيجري هذا التغييرات التالية على إعداد Storybook لديك.</p>
<ul>
<li>سيضيف <a href="https://storybook.js.org/addons/@storybook/addon-themes/"><code>@storybook/addon-themes</code></a> إلى قائمة <code>addons</code> لديك في <code>.storybook/main.ts</code>.</li>
<li>سيُعدّ <a href="https://stevekinney.com/courses/storybook/decorators">مُزيِّنًا (decorator)</a> في <code>.storybook/main.ts</code>.</li>
</ul>
<p><img src="/arabic-cs-library/images/kinney/c7a7aae0dda1bd4d.webp" alt="الوضع الداكن في Storybook بفضل Tailwind"></p>
`,i={book:s,chapter:n,chapterTitle:o,slug:a,title:t,headings:e,html:p};export{s as book,n as chapter,o as chapterTitle,i as default,e as headings,p as html,a as slug,t as title};
