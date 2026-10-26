const s="kinney",n="tailwind",i="Tailwind CSS",a="build-process-and-tooling",t="عملية البناء وتكامل الأدوات",l=[{depth:2,id:"تكامل-vite",text:"تكامل Vite"},{depth:3,id:"إضافة-tailwind-إلى-css",text:"إضافة Tailwind إلى CSS"}],p=`<p>إن إعداد Tailwind CSS على النحو الصحيح في بيئة تطويرك أمر بسيط جدًا — إن اتبعت المسار السهل، على الأقل.</p>
<p>يوفّر Tailwind CSS طرق تثبيت متعدّدة تناسب إعدادات المشاريع ومتطلباتها المختلفة. سنغطّي الأكثر شيوعًا: استخدام Vite لسير عمل البناء الحديث، وTailwind CLI للإعدادات الأبسط.</p>
<h2 id="تكامل-vite">تكامل Vite</h2>
<blockquote>
<p><strong>هذه هي الطريقة التي أستخدمها في الغالب.</strong></p>
<p>وهي الوحيدة التي سنعمل بها اليوم.</p>
</blockquote>
<p>أصبح Vite واحدًا من أشهر أدوات البناء في تطوير الويب الحديث، وهو يعمل على نحو استثنائي مع Tailwind CSS. يمكنك الاطّلاع على التعليمات الرسمية لـ<a href="https://tailwindcss.com/docs/installation/using-vite">استخدام Tailwind مع Vite</a>.</p>
<p>لكن، باختصار، هذا هو كل شيء:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> tailwindcss <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tailwindcss/vite&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">tailwindcss</span>()],
});
</code></pre>
<h3 id="إضافة-tailwind-إلى-css">إضافة Tailwind إلى CSS</h3>
<p>ما عليك سوى استيراد Tailwind في ملف CSS:</p>
<pre><code class="language-css"><span class="hljs-keyword">@import</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
</code></pre>
<p>يحلّ هذا الاستيراد الواحد محل التوجيهات الثلاثة التقليدية ويوفّر أداءً أفضل وبناءً أسرع.</p>
`,e={book:s,chapter:n,chapterTitle:i,slug:a,title:t,headings:l,html:p};export{s as book,n as chapter,i as chapterTitle,e as default,l as headings,p as html,a as slug,t as title};
