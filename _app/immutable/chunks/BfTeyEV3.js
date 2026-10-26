const s="kinney",t="full-stack-typescript",n="TypeScript للويب الكامل",a="custom-data-transformers-with-trpc",e="مُحوّلات البيانات المخصّصة (Custom Data Transformers) في tRPC",p=[{depth:3,id:"محولات-البيانات-المخصصة",text:"مُحوّلات البيانات المخصّصة"}],c=`<h3 id="محولات-البيانات-المخصصة">مُحوّلات البيانات المخصّصة</h3>
<p>عندما تحتاج إلى تسلسل (serialization) حقول من نوع <code>Date</code> أو <code>Map</code> أو <code>BigInt</code>، فكّر في <a href="https://github.com/blitz-js/superjson">SuperJSON</a>. ثبّت <code>superjson</code> وسجّله على الخادم والعميل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> superjson <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;superjson&#x27;</span>;

<span class="hljs-keyword">const</span> t = initTRPC.<span class="hljs-title function_">create</span>({
  <span class="hljs-attr">transformer</span>: superjson,
});
</code></pre>
<p>وعلى العميل:</p>
<pre><code class="language-typescript">createTRPCClient&lt;<span class="hljs-title class_">AppRouter</span>&gt;({
  <span class="hljs-attr">transformer</span>: superjson,
  <span class="hljs-attr">links</span>: [<span class="hljs-comment">/* ... */</span>],
});
</code></pre>
<p>الآن ستبقى كائنات التاريخ (date) كائنات <code>Date</code> حقيقية على العميل، لا سلاسل نصية عشوائية.</p>
`,o={book:s,chapter:t,chapterTitle:n,slug:a,title:e,headings:p,html:c};export{s as book,t as chapter,n as chapterTitle,o as default,p as headings,c as html,a as slug,e as title};
