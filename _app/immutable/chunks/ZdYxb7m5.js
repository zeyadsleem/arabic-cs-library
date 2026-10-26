const s="kinney",n="react-typescript",a="React مع TypeScript",t="building-development-scripts",p="سكربتات البناء والتطوير",l=[{depth:2,id:"سكربتات-البناء-والتطوير",text:"سكربتات البناء والتطوير"}],c=`<h2 id="سكربتات-البناء-والتطوير">سكربتات البناء والتطوير</h2>
<p>أضف هذه السكربتات إلى ملف <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc &amp;&amp; vite build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;preview&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite preview&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lint:fix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eslint src --ext ts,tsx --fix&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;format&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;prettier --write src/**/*.{ts,tsx,js,jsx,json,css,md}&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ ملف <code>vite.config.ts</code> بسيطًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">react</span>()],
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">&#x27;@&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./src&#x27;</span>),
    },
  },
  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>,
  },
});
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,c as html,t as slug,p as title};
