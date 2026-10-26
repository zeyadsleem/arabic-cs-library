const s="kinney",o="storybook",e="بناء أنظمة التصميم في Storybook",n="mock-service-worker",a="التكامل مع Mock Service Worker",r=[{depth:2,id:"إضافة-الملحق",text:"إضافة الملحق"}],t=`<p>يمكنك أن تجعل قصصك تجلب بيانات من API باستخدام <a href="https://stevekinney.com/courses/storybook/loaders">المحمّلات</a>، لكنك على الأرجح لا تريد أن تتحمّل عناء تشغيل خادم محلي لمجرد عرض مكتبة مكوّناتك. وأيضًا على الأرجح لا تريد أن تتحمّل اعتماد API خارجي قد يسقط فيكسر Storybook لديك.</p>
<p>ومن الحلول الممكنة استخدام <a href="https://mswjs.io/">Mock Server Worker</a> لاعتراض الطلبات على مستوى المتصفح ثم إعادة بيانات مُحاكاة إلى مكوّناتك. وبقدر ما يخص قصصك ومكوّناتك، فهي تتحدث إلى API حقيقي، لكن دون أي من العيوب التي ذكرتها سابقًا.</p>
<p>يمكنك تثبيت Mock Service Worker و<a href="https://storybook.js.org/addons/msw-storybook-addon/">ملحق Storybook</a> كما يلي:</p>
<pre><code class="language-bash">npm -D i msw msw-storybook-addon
</code></pre>
<p>ستحتاج إلى تهيئة نقاط نهاية Mock Service Worker إن لم تكن قد فعلت ذلك. أنا أستخدم Vite، لذا سأفترض أن دليل أصولنا الثابتة يقع في <code>/public</code>.</p>
<pre><code class="language-bash">npx msw init public/
</code></pre>
<h2 id="إضافة-الملحق">إضافة الملحق</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { initialize, mswLoader } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw-storybook-addon&#x27;</span>;
<span class="hljs-title function_">initialize</span>();

<span class="hljs-keyword">const</span> preview = {
  <span class="hljs-comment">//… other stuff</span>
  <span class="hljs-attr">loaders</span>: [mswLoader],
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> preview;
</code></pre>
`,c={book:s,chapter:o,chapterTitle:e,slug:n,title:a,headings:r,html:t};export{s as book,o as chapter,e as chapterTitle,c as default,r as headings,t as html,n as slug,a as title};
