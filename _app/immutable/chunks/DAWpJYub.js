const s="kinney",n="react-typescript",a="React مع TypeScript",p="module-resolution-and-paths",t="حلّ الوحدات ومساراتها",l=[{depth:2,id:"المشكلة-مع-الاستيراد-النسبي",text:"المشكلة مع الاستيراد النسبي"},{depth:2,id:"ضبط-مسارات-الاختصار-في-typescript",text:"ضبط مسارات الاختصار في TypeScript"},{depth:3,id:"أنماط-مسارات-الاختصار-الشائعة",text:"أنماط مسارات الاختصار الشائعة"},{depth:2,id:"ضبط-مجمع-الملفات",text:"ضبط مُجمِّع الملفات"},{depth:3,id:"ضبط-vite",text:"ضبط Vite"}],c=`<p>تحوّل هياكل المجلدات العميقة عمليات الاستيراد إلى كابوس. أنت تعرف الطريقة تمامًا: <code>../../../components/ui/Button</code> في كل مكان، ومسارات هشّة تنكسر متى أعدتَ الهيكلة، وعبارات استيراد تبدو وكأنها تحاول الهروب من قاعدتك البرمجية كليًا. و<strong>حلّ الوحدات</strong> و<strong>مسارات الاختصار</strong> يحلّان هذه المشكلة بأن يتيحا لك كتابة استيرادات مطلقة نظيفة مثل <code>@/components/Button</code> أو <code>~/utils/helpers</code> — لكن ذلك لا يتحقّق إلا إن ضبطتَ TypeScript ومُجمِّع الملفات على نحو صحيح.</p>
<p>حلّ الوحدات هو الطريقة التي يعثر بها TypeScript (ومُجمِّع ملفاتك) على الملفات التي تستوردها. أمّا مسارات الاختصار فتتيح لك إنشاء اختصارات — فكّر فيها كأنها إشارات مرجعية للمجلدات التي تستوردها كثيرًا. أمّا الحيلة فهي التأكّد من أن مسارات <code>tsconfig.json</code> لديك تطابق ما يتوقّعه مُجمِّع الملفات، ليعمل كودك في بيئة التطوير وفي الإنتاج على حدّ سواء.</p>
<h2 id="المشكلة-مع-الاستيراد-النسبي">المشكلة مع الاستيراد النسبي</h2>
<p>قبل أن نغوص في الحلول، لنُعترف أولًا بأن الاستيراد النسبي يصبح فوضويًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Fragile and hard to read</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Button</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../../components/ui/Button&#x27;</span>;
<span class="hljs-keyword">import</span> { formatDate } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../../../utils/date&#x27;</span>;
<span class="hljs-keyword">import</span> { useAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../../hooks/useAuth&#x27;</span>;

<span class="hljs-comment">// What happens when you move this file?</span>
<span class="hljs-comment">// What happens when you refactor the folder structure?</span>
</code></pre>
<p>في كل مرة تنقل فيها ملفًا أو تُعيد تنظيم المجلدات، تجد نفسك تطارد المسارات النسبية. ولا تُعطِني بداية الحديث عن الحمل المعرفي الناتج عن عدّ أجزاء <code>../</code> لتعرف أين تقف فعلًا داخل مشروعك.</p>
<h2 id="ضبط-مسارات-الاختصار-في-typescript">ضبط مسارات الاختصار في TypeScript</h2>
<p>يتيح لك ملف <code>tsconfig.json</code> في TypeScript تعريف تعيينات مسارات تنشئ اختصارات إلى المجلدات المستخدَمة كثيرًا. إليك إعدادًا نموذجيًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;baseUrl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;paths&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;@/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@/components/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/components/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@/utils/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/utils/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@/hooks/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/hooks/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@/types/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/types/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;~/assets/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;public/assets/*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تصبح استيراداتك الآن نظيفة ويمكن التنبؤ بها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Clear, absolute, and refactor-safe</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Button</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/components/ui/Button&#x27;</span>;
<span class="hljs-keyword">import</span> { formatDate } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/utils/date&#x27;</span>;
<span class="hljs-keyword">import</span> { useAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/hooks/useAuth&#x27;</span>;
</code></pre>
<h3 id="أنماط-مسارات-الاختصار-الشائعة">أنماط مسارات الاختصار الشائعة</h3>
<p>تفضّل كل فريق اصطلاحاته الخاصة. إليك أكثر الأساليب شيوعًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;baseUrl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;paths&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-comment">// Option 1: @ prefix (popular with Vue/Nuxt)</span>
      <span class="hljs-attr">&quot;@/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@/components/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/components/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>

      <span class="hljs-comment">// Option 2: ~ prefix (popular with Next.js)</span>
      <span class="hljs-attr">&quot;~/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;~/components/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/components/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>

      <span class="hljs-comment">// Option 3: No prefix, just descriptive names</span>
      <span class="hljs-attr">&quot;components/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/components/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;utils/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/utils/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>

      <span class="hljs-comment">// Option 4: Mix and match based on usage</span>
      <span class="hljs-attr">&quot;@/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;assets/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;public/assets/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;styles/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/styles/*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>التزم باصطلاح واحد في كل مشروع. فخلطُ بادئتَي <code>@/</code> و<code>~/</code> سيُربك فريقك ويُربك نفسك في المستقبل.</p>
</blockquote>
<h2 id="ضبط-مجمع-الملفات">ضبط مُجمِّع الملفات</h2>
<p>هنا تصبح الأمور معقّدة: يتولّى TypeScript فحص الأنواع، لكن مُجمِّع الملفات (Vite وWebpack وغيرها) يتولّى حلّ الملفات فعليًا أثناء التشغيل. ولا بدّ أن يتّفق الاثنان على معنى مسارات الاختصار لديك.</p>
<h3 id="ضبط-vite">ضبط Vite</h3>
<p>إذا كنت تستخدم Vite، فعليك ضبط آليّة حلّ مسارات الاختصار فيه:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// vite.config.ts</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">react</span>()],
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">&#x27;@&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./src&#x27;</span>),
      <span class="hljs-string">&#x27;@/components&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./src/components&#x27;</span>),
      <span class="hljs-string">&#x27;@/utils&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./src/utils&#x27;</span>),
      <span class="hljs-string">&#x27;@/hooks&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./src/hooks&#x27;</span>),
      <span class="hljs-string">&#x27;@/types&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./src/types&#x27;</span>),
    },
  },
});
</code></pre>
<p><strong>بدلًا من ذلك</strong>: يمكنك استخدام <a href="https://npm.im/vite-tsconfig-paths">vite-tsconfig-paths</a> لتجعل Vite يستخدم مسارات <code>tsconfig.json</code> لديك.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,c as html,p as slug,t as title};
