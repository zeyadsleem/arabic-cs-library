const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="mocking-dom-methods",l="محاكاة توابع DOM",p=[{depth:2,id:"محاكاة-توابع-dom",text:"محاكاة توابع DOM"}],e=`<p>في <a href="https://stevekinney.com/courses/testing/the-basics">البداية</a> منذ زمن، جعلنا <code>add</code> يعمل، لكن لنرفع مستوى لعبتنا. لنفترض أن لدينا زرًا يزيد عدّادًا عند النقر عليه. نريد أن نختبر أن المستخدم يرى العدّاد يزداد.</p>
<p>سنحتاج إلى تعديل إعدادنا قليلًا من أجل DOM:</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Counter<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;counter&quot;</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;increment&quot;</span>&gt;</span>Increment<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
      <span class="hljs-keyword">const</span> counterElement = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;counter&#x27;</span>);
      <span class="hljs-keyword">const</span> buttonElement = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;increment&#x27;</span>);
      <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;

      buttonElement.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        count += <span class="hljs-number">1</span>;
        counterElement.<span class="hljs-property">textContent</span> = count;
      });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

</code></pre>
<p>إليك اختبار ذلك السلوك:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Counter app&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should increment the count when the button is clicked&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Set up DOM</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">innerHTML</span> = <span class="hljs-string">\`
      &lt;p id=&quot;counter&quot;&gt;0&lt;/p&gt;
      &lt;button id=&quot;increment&quot;&gt;Increment&lt;/button&gt;
    \`</span>;

    <span class="hljs-keyword">const</span> button = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;increment&#x27;</span>);
    <span class="hljs-keyword">const</span> counter = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;counter&#x27;</span>);

    <span class="hljs-comment">// Fake our state</span>
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
    button.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      count += <span class="hljs-number">1</span>;
      counter.<span class="hljs-property">textContent</span> = count;
    });

    <span class="hljs-comment">// Simulate the button click</span>
    button.<span class="hljs-title function_">click</span>();

    <span class="hljs-comment">// Check if the behavior is what we expect</span>
    <span class="hljs-title function_">expect</span>(counter.<span class="hljs-property">textContent</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;1&#x27;</span>);
  });
});
</code></pre>
<p>فبدلًا من اختبار الحالة الداخلية مباشرةً، نتحقق من <strong>الشيء الذي يهمّنا أكثر</strong>: ما يراه المستخدم، أي أن الرقم يزداد عند النقر على الزر. وهكذا عندما يعتني شخص مسكين بتطبيقك في المستقبل، يستطيع <em>أن يعرف فورًا</em> ما يجري: آه، النقر على الزر يعني تغيّر العدّاد، رائع. ليس عليه أن يحفر في كيفية عمل الحالة الداخلية لـ <code>count</code>.</p>
<h2 id="محاكاة-توابع-dom">محاكاة توابع DOM</h2>
<p>أحيانًا تحتاج إلى محاكاة توابع DOM أو خدمات خارجية، وهي أمور تصبح أعقد قليلًا في الاختبارات. لنُحاكِ الدالة <code>getElementById</code> لنرى مدى سهولة ذلك في Vitest:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;DOM tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should call getElementById&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> spy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">global</span>.<span class="hljs-property">document</span>, <span class="hljs-string">&#x27;getElementById&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>({
      <span class="hljs-attr">textContent</span>: <span class="hljs-string">&#x27;0&#x27;</span>,
    });

    <span class="hljs-keyword">const</span> element = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;counter&#x27;</span>);

    <span class="hljs-title function_">expect</span>(spy).<span class="hljs-title function_">toHaveBeenCalled</span>();
    <span class="hljs-title function_">expect</span>(element.<span class="hljs-property">textContent</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;0&#x27;</span>);

    spy.<span class="hljs-title function_">mockRestore</span>();
  });
});
</code></pre>
<p>لقد حاكيت للتوّ <code>getElementById</code> وتحقّقت من أنه نُودي عليه. يأتي Vitest بمكتبة محاكاة مدمجة، لذا لا تحتاج إلى جلب اعتمادات إضافية لمجرد الأساسيات مثل الجواسيس والبدائل المُحاكاة والبدائل.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
