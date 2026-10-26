const s="kinney",n="testing",t="مدخل إلى الاختبارات",a="testing-the-dom-example",l="مثال أساسي",e=[{depth:2,id:"كتابة-الاختبار",text:"كتابة الاختبار"}],p=`<p>تخيّل أن لديك زرًا، وعندما تنقر عليه يحدث شيء ما. حالة كلاسيكية، أليس كذلك؟ لنُعِدّ اختبارًا أساسيًا لذلك التفاعل. إليك دالة بسيطة، موجودة في <code>examples/element-factory/src/button.js</code>، تُنشئ بنية DOM لدينا وتضيف بعض السلوك:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// examples/element-factory/src/button.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> button = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;button&#x27;</span>);
  button.<span class="hljs-property">textContent</span> = <span class="hljs-string">&#x27;Click Me&#x27;</span>;

  button.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    button.<span class="hljs-property">textContent</span> = <span class="hljs-string">&#x27;Clicked!&#x27;</span>;
  });

  <span class="hljs-keyword">return</span> button;
}
</code></pre>
<p>لا شيء مبهر—مجرد زر يقول «Click Me»، وعندما تنقر عليه يتغيّر إلى «Clicked!». إنه أشبه بمستوى تعليمي في لعبة عن الميكروويف بالنسبة لاختبار DOM.</p>
<h2 id="كتابة-الاختبار">كتابة الاختبار</h2>
<p>الآن لنختبر هذا الشيء ونتأكّد من أنه لا يكذب علينا. سنضيف حالة اختبار جديدة لضمان أن الزر يغيّر النص بنجاح عند النقر.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { it, expect, describe } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { createButton } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./button.js&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;createButton&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should create a button element&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> button = <span class="hljs-title function_">createButton</span>();
    <span class="hljs-title function_">expect</span>(button.<span class="hljs-property">tagName</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;BUTTON&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should have the text &quot;Click Me&quot;&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> button = <span class="hljs-title function_">createButton</span>();
    <span class="hljs-title function_">expect</span>(button.<span class="hljs-property">textContent</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Click Me&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should change the text to &quot;Clicked!&quot; when clicked&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> button = <span class="hljs-title function_">createButton</span>();
    button.<span class="hljs-title function_">click</span>();
    <span class="hljs-title function_">expect</span>(button.<span class="hljs-property">textContent</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Clicked!&#x27;</span>);
  });
});
</code></pre>
<p>سواء كنت تستخدم <code>jsdom</code> أو <code>happy-dom</code>، فقد تمّت تعبئة كل توابع DOM نيابةً عنك. ما زالت الشيفرة تعمل في Node من الناحية التقنية—لكنها تستطيع الوصول إلى كل التوابع التي قد تجدها عادةً في المتصفح فقط.</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:l,headings:e,html:p};export{s as book,n as chapter,t as chapterTitle,c as default,e as headings,p as html,a as slug,l as title};
