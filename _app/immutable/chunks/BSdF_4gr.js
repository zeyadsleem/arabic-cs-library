const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="custom-matchers",p="مطابِقات مخصّصة في Vitest",e=[{depth:2,id:"مثال-أكثر-تشويقا",text:"مثال أكثر تشويقًا"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],l=`<p>لنفترض أنك لا تجد تابع <code>expect</code> الذي يُسعدك. يمكنك <em>بالفعل</em> أن توسّع المطابِقات في Vitest.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// vitest.setup.js</span>
<span class="hljs-keyword">import</span> { expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

expect.<span class="hljs-title function_">extend</span>({
  <span class="hljs-title function_">toBeWithinRange</span>(<span class="hljs-params">received, min, max</span>) {
    <span class="hljs-keyword">const</span> pass = received &gt;= min &amp;&amp; received &lt;= max;
    <span class="hljs-keyword">if</span> (pass) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`expected <span class="hljs-subst">\${received}</span> not to be within range <span class="hljs-subst">\${min}</span> - <span class="hljs-subst">\${max}</span>\`</span>,
        <span class="hljs-attr">pass</span>: <span class="hljs-literal">true</span>,
      };
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`expected <span class="hljs-subst">\${received}</span> to be within range <span class="hljs-subst">\${min}</span> - <span class="hljs-subst">\${max}</span>\`</span>,
        <span class="hljs-attr">pass</span>: <span class="hljs-literal">false</span>,
      };
    }
  },
});
</code></pre>
<p>لنرَ ذلك أثناء العمل.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;number is within range&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-number">10</span>).<span class="hljs-title function_">toBeWithinRange</span>(<span class="hljs-number">5</span>, <span class="hljs-number">15</span>);
});
</code></pre>
<h2 id="مثال-أكثر-تشويقا">مثال أكثر تشويقًا</h2>
<p>لنفترض أنك تعمل على <strong>التواريخ</strong>. قد يكون اختبار سؤال «هل هذا التاريخ بعد ذلك التاريخ؟» مزعجًا قليلًا باستخدام المطابِقات التقليدية.</p>
<p>إليك مطابِقًا مخصّصًا للتحقق من أن تاريخًا متأخر عن تاريخ آخر:</p>
<pre><code class="language-javascript">expect.<span class="hljs-title function_">extend</span>({
  <span class="hljs-title function_">toBeLaterThan</span>(<span class="hljs-params">received, comparedDate</span>) {
    <span class="hljs-keyword">const</span> pass = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(received) &gt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(comparedDate);
    <span class="hljs-keyword">if</span> (pass) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`expected <span class="hljs-subst">\${received}</span> not to be later than <span class="hljs-subst">\${comparedDate}</span>\`</span>,
        <span class="hljs-attr">pass</span>: <span class="hljs-literal">true</span>,
      };
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`expected <span class="hljs-subst">\${received}</span> to be later than <span class="hljs-subst">\${comparedDate}</span>\`</span>,
        <span class="hljs-attr">pass</span>: <span class="hljs-literal">false</span>,
      };
    }
  },
});
</code></pre>
<p>هذا رائع! الآن يمكنك كتابة مقارنات تواريخ واضحة وموجزة:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;date comparison&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;2023-10-10&#x27;</span>).<span class="hljs-title function_">toBeLaterThan</span>(<span class="hljs-string">&#x27;2023-09-01&#x27;</span>); <span class="hljs-comment">// ✅ True.</span>
  <span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;2023-05-15&#x27;</span>).<span class="hljs-title function_">toBeLaterThan</span>(<span class="hljs-string">&#x27;2023-07-01&#x27;</span>); <span class="hljs-comment">// 💣 False.</span>
});
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>أبقِ المطابِق بسيطًا</strong>. لا تريد أن تكتب رواية لكل مطابِق. تذكّر أن الشيفرة تُقرأ أكثر مما تُكتب، لذا احرص على أن يكون مطابِقك المخصّص سهل الفهم من نظرة واحدة.</li>
<li><strong>رسائل خطأ مفصّلة</strong>. عندما يفشل اختبار، يحتاج المطوّر (والمفاجأة: أنت في المستقبل) إلى فهم <em>سبب</em> الانفجار. الرسالة الجيدة تجعل تنقيح الأخطاء أقل إيلامًا بكثير.</li>
<li><strong>استفد من سياق تطبيقك</strong>. وسّع المطابِقات عندما تجد نفسك تكرّر فحوصًا بعينها. في عالم الاختبارات، لا تعني <strong>DRY</strong> «لا تكرّر نفسك» (Don’t Repeat Yourself) فحسب، بل تعني أيضًا «<strong>لا تغضب بعد</strong>» (Don’t Rage Yet)، لأن الاختبارات مُفترض أن تبقى هادئة وموجزة.</li>
</ol>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:e,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,l as html,t as slug,p as title};
