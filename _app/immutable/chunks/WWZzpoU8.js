const s="kinney",n="storybook",a="بناء أنظمة التصميم في Storybook",l="customizing-tailwind-colors",e="تخصيص ألوان Tailwind",p=[{depth:2,id:"دمج-سمتنا",text:"دمج سمتنا"},{depth:3,id:"استخدام-دالة-theme",text:"استخدام دالة theme"},{depth:3,id:"استخدام-apply",text:"استخدام Apply"}],o=`<p>لنظام التصميم لدينا نظام ألوانه الخاص. ولحسن الحظ، يمكننا استبدال النظام المضمّن في Tailwind بسهولة لا بأس بها. ولأوفّر عليك عناء تجميعه بنفسك، أدرجت تنفيذًا في <code>src/tokens/colors.ts</code> يمكنك استخدامه.</p>
<p>أمامك خياران هنا:</p>
<ol>
<li>توسيع سمة الألوان المضمّنة في Tailwind.</li>
<li>استبدالها كليًا.</li>
</ol>
<p>وسأحتجّ بأننا ينبغي أن نستبدلها حتى لا يستخدم زملاؤنا المطوّرون الألوان المدمجة فعليًا.</p>
<p>الآن، سنستبدل ببساطة الألوان المدمجة في السمة بلوحة ألواننا المخصّصة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Config</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;
<span class="hljs-keyword">import</span> { colors, white, black, transparent, currentColor } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./src/tokens/colors&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">content</span>: [<span class="hljs-string">&#x27;./src/**/*.{js,jsx,ts,tsx,mdx,html}&#x27;</span>],
  <span class="hljs-attr">darkMode</span>: [<span class="hljs-string">&#x27;class&#x27;</span>, <span class="hljs-string">&#x27;[data-mode=&quot;dark&quot;]&#x27;</span>],
  <span class="hljs-attr">theme</span>: {
    <span class="hljs-attr">colors</span>: {
      ...colors,
      white,
      black,
      transparent,
      currentColor,
    },
  },
  <span class="hljs-attr">plugins</span>: [],
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Config</span>;
</code></pre>
<h2 id="دمج-سمتنا">دمج سمتنا</h2>
<p>هناك ثلاث طرق لاستخدام سمة Tailwind الجديدة في مكوّننا:</p>
<ol>
<li>استخدام دالة <code>theme()</code> الخاصة بـ CSS التي توفّرها Tailwind عبر PostCSS.</li>
<li>استخدام توجيه <code>@apply</code> الذي توفّره Tailwind عبر PostCSS.</li>
<li>إعادة كتابة المكوّن باستخدام أصناف Tailwind المساعدة.</li>
</ol>
<p>والخيار الثالث هو أفضل رهان لدينا على الأرجح—وسنفعله بعد قليل، لكنه قد يكون أسهل قولًا من فعل في قاعدة شيفرة قديمة. فلننظر في الأولين.</p>
<h3 id="استخدام-دالة-theme">استخدام دالة theme</h3>
<p>باستخدام الأسلوب الأول، يمكننا المرور على القيم واستبدالها بإشارات إلى سمتنا.</p>
<pre><code class="language-diff"> .button {
   align-items: center;
<span class="hljs-deletion">-  background-color: #8a55c8;</span>
<span class="hljs-addition">+  background-color: theme(&#x27;colors.primary.600&#x27;, #8a55c8);</span>
   border-color: transparent;
   border-radius: 0.25rem;
   border-width: 1px;
</code></pre>
<h3 id="استخدام-apply">استخدام Apply</h3>
<p>بدلًا من ذلك، يمكننا تطبيق أصناف Tailwind المساعدة على أصنافنا الموجودة.</p>
<pre><code class="language-diff"> .button {
<span class="hljs-deletion">-  align-items: center;</span>
<span class="hljs-deletion">-  background-color: #8a55c8;</span>
<span class="hljs-deletion">-  border-color: transparent;</span>
<span class="hljs-deletion">-  border-radius: 0.25rem;</span>
<span class="hljs-deletion">-  border-width: 1px;</span>
<span class="hljs-deletion">-  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);</span>
<span class="hljs-deletion">-  color: white;</span>
<span class="hljs-deletion">-  cursor: pointer;</span>
<span class="hljs-deletion">-  display: inline-flex;</span>
<span class="hljs-deletion">-  font-weight: 600;</span>
<span class="hljs-deletion">-  gap: 0.375rem;</span>
<span class="hljs-deletion">-  padding: 0.375rem 0.625rem;</span>
<span class="hljs-deletion">-  transition: background-color 0.2s;</span>
<span class="hljs-addition">+  @apply bg-primary-600 inline-flex cursor-pointer items-center gap-1.5 rounded border border-transparent px-2.5 py-1.5 text-white shadow-sm transition-colors;</span>
 }
</code></pre>
`,t={book:s,chapter:n,chapterTitle:a,slug:l,title:e,headings:p,html:o};export{s as book,n as chapter,a as chapterTitle,t as default,p as headings,o as html,l as slug,e as title};
