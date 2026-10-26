const s="kinney",n="testing",t="مدخل إلى الاختبارات",a="testing-library-solution",l="إعادة هيكلة اختبار الزر",e=[{depth:2,id:"تصيير-الزر-إلى-dom",text:"تصيير الزر إلى DOM"}],p=`<p>مرة أخرى، سنحتاج على الأرجح إلى جلب مكتباتنا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/dom&#x27;</span>;
<span class="hljs-keyword">import</span> userEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/user-event&#x27;</span>;
</code></pre>
<p>بعد ذلك سنستخدم <code>user-event</code> للنقر على الزر بدلًا من نداء تابع على العنصر.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should change the text to &quot;Clicked!&quot; when clicked&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> button = <span class="hljs-title function_">createButton</span>();

  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">click</span>(button);

  <span class="hljs-title function_">expect</span>(button.<span class="hljs-property">textContent</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Clicked!&#x27;</span>);
});
</code></pre>
<blockquote>
<p><strong>تذكّر أن تجعل دالة الاختبار غير متزامنة.</strong></p>
</blockquote>
<h2 id="تصيير-الزر-إلى-dom">تصيير الزر إلى DOM</h2>
<p>يمكننا أيضًا اختيار تصيير الزر إلى <code>document</code> والعثور عليه بهذه الطريقة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should change the text to &quot;Clicked!&quot; when clicked&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(<span class="hljs-title function_">createButton</span>());
  <span class="hljs-keyword">const</span> button = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Click Me&#x27;</span> });

  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">click</span>(button);

  <span class="hljs-title function_">expect</span>(button.<span class="hljs-property">textContent</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Clicked!&#x27;</span>);
});
</code></pre>
<p>هذا لطيف أيضًا لأنه يجعل اختبارنا الذي نتأكد فيه من أن الزر يحمل التسمية الصحيحة عتيقًا. وبالتفكير في الأمر، فإنه يجعل اختبارنا الأول الذي ننظر فيه إلى نوع العنصر عتيقًا أيضًا.</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:a,title:l,headings:e,html:p};export{s as book,n as chapter,t as chapterTitle,c as default,e as headings,p as html,a as slug,l as title};
