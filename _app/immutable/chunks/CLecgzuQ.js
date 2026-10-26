const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="beyond-strict-equality",t="مساواة المراجع",p=[{depth:2,id:"tobe",text:"toBe"},{depth:2,id:"toequal",text:"toEqual"},{depth:2,id:"toequal-مقابل-tostrictequal",text:"toEqual مقابل toStrictEqual"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],e=`<p>عاش معظمنا في عالم «يجب أن يكون كل شيء غير قابل للتغيير» بما يكفي لنعرف أن هناك فرقًا بين مقارنة الكائنات بالمرجع ومقارنتها بكائن <em>يبدو</em> مماثلًا من حيث قيمته، لكن له مرجع مختلف في الذاكرة.</p>
<h2 id="tobe">toBe <span class="content-anchor" id="tobe"></span></h2>
<p>حتى الآن، استخدمنا فقط <code>.toBe</code>، الذي يتحقّق من المساواة الصارمة (أي <code>===</code> أو <code>Object.is</code>).</p>
<p>هذا يعمل كما نتوقّع للأنواع البسيطة:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;strings should be strictly equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;string&#x27;</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;string&#x27;</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;numbers should be strictly equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-number">2</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;booleans should be strictly equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">false</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;undefined should be strictly equal to itself&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">undefined</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">undefined</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;null should be strictly equal to itself&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">null</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">null</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;BigInts should be strickly equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title class_">BigInt</span>(<span class="hljs-title class_">Number</span>.<span class="hljs-property">MAX_SAFE_INTEGER</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-title class_">BigInt</span>(<span class="hljs-title class_">Number</span>.<span class="hljs-property">MAX_SAFE_INTEGER</span>));
});
</code></pre>
<p>لكن الأمور تصير أكثر تعقيدًا قليلًا عند مقارنة الكائنات (المصفوفات <em>والدوال</em> كائنات في JavaScript).</p>
<pre><code class="language-typescript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;toBe&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  test.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;objects should not be strictly equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }).<span class="hljs-title function_">toBe</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> });
  });

  test.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;arrays should be strictly equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]).<span class="hljs-title function_">toBe</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
  });

  test.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;functions should to be strictly equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> {}).<span class="hljs-title function_">toBe</span>(<span class="hljs-function">() =&gt;</span> {});
  });
});
</code></pre>
<h2 id="toequal">toEqual <span class="content-anchor" id="toequal"></span></h2>
<p>انظر إلى هذه الدالة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">generateFibonacci</span> = (<span class="hljs-params">n</span>) =&gt; {
  <span class="hljs-keyword">const</span> sequence = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>];

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>; i &lt; n; i++) {
    sequence[i] = sequence[i - <span class="hljs-number">1</span>] + sequence[i - <span class="hljs-number">2</span>];
  }

  <span class="hljs-keyword">return</span> sequence;
};
</code></pre>
<p>يبدو هذا شيئًا أود اختباره، أليس كذلك؟ المشكلة هنا أن هذا الاختبار الرائع في ما عدا ذلك سينفجر في وجهي.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should generate fibonacci sequence&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> fibonacci = <span class="hljs-title function_">generateFibonacci</span>(<span class="hljs-number">10</span>);
  <span class="hljs-title function_">expect</span>(fibonacci).<span class="hljs-title function_">toBe</span>([<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">13</span>, <span class="hljs-number">21</span>, <span class="hljs-number">34</span>]);
});
</code></pre>
<p>وVitest يعرف أنهما يُسلسَلان إلى الشيء نفسه. لكنه يجبرنا على أن نكون أكثر تحديدًا. بدلًا من ذلك، حين نقارن كائنين غير متساويين بالمرجع، يمكننا استخدام <code>toEqual</code>. سأقتبس <a href="https://vitest.dev/api/expect.html#toequal">من التوثيق</a> لدقيقة سريعة:</p>
<blockquote>
<p><strong>تسمية الأشياء صعبة</strong></p>
<p>يؤكّد <code>toEqual</code> ما إذا كانت القيمة الفعلية مساوية للقيمة المستلمة أو لها البنية نفسها، إن كانت كائنًا (يقارنهما تكراريًا).</p>
</blockquote>
<p>لننظر إلى مثال آخر:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;toEqual&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;similar objects should pass with #toEqual&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> });
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;similar nested objects should pass with #toEqual&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: { <span class="hljs-attr">c</span>: <span class="hljs-number">2</span> } }).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: { <span class="hljs-attr">c</span>: <span class="hljs-number">2</span> } });
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;similar arrays should pass with #toEqual&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]).<span class="hljs-title function_">toEqual</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;similar multi-dimensional arrays should pass with #toEqual&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>([<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]]).<span class="hljs-title function_">toEqual</span>([<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>]]);
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;functions should to be strictly equal if compared by reference&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fn</span> = (<span class="hljs-params"></span>) =&gt; {};
    <span class="hljs-title function_">expect</span>(fn).<span class="hljs-title function_">toBe</span>(fn);
  });
});
</code></pre>
<h2 id="toequal-مقابل-tostrictequal">toEqual مقابل toStrictEqual</h2>
<p><code>toStrictEqual</code> أكثر… صرامة بقليل.</p>
<ul>
<li><code>{ a: 1, b: undefined }</code> و<code>{ a: 1 }</code> متساويان لكنهما غير متساويين <em>تمامًا</em>.</li>
<li>كائن حرفي (object literal) ونسخة صنف (class instance) لهما الخصائص نفسها تمامًا غير متساويين صرامةً أيضًا.</li>
</ul>
<p>إليك بعض الاختبارات التي يمكنك مراجعتها وقد تساعد في توضيح الفرق. يمكنك أيضًا أن تجرّب هذه الاختبارات في <code>examples/strictly-speaking/strictly-speaking.test.js</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">name</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = name;
  }
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;objects with the same properties are equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> }).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> });
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;objects with different properties are not equal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> }).<span class="hljs-property">not</span>.<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">3</span> });
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;objects with undefined properties are equal to objects without those properties&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-literal">undefined</span> });
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;objects with undefined properties are *not* strictly equal to objects without those properties&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }).<span class="hljs-property">not</span>.<span class="hljs-title function_">toStrictEqual</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-literal">undefined</span> });
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;instances are equal to object literals with the same properties&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>)).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> });
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;instances are not strictly equal to object literals with the same properties&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>)).<span class="hljs-property">not</span>.<span class="hljs-title function_">toStrictEqual</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> });
});
</code></pre>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<p>إليك بعض التحقّقات التي <em>قد</em> ترغب في أخذها بعين الاعتبار:</p>
<ul>
<li><a href="https://vitest.dev/api/expect.html#tobe"><code>toBe</code></a></li>
<li><a href="https://vitest.dev/api/expect.html#tobecloseto"><code>toBeCloseTo</code></a></li>
<li><a href="https://vitest.dev/api/expect.html#tobeinstanceof"><code>toBeInstanceOf</code></a></li>
<li><a href="https://vitest.dev/api/expect.html#tobeundefined"><code>toBeUndefined</code></a></li>
<li><a href="https://vitest.dev/api/expect.html#tocontain"><code>toContain</code></a></li>
<li><a href="https://vitest.dev/api/expect.html#tothrow"><code>toThrow</code></a></li>
<li><a href="https://vitest.dev/api/expect.html#tothrowerror"><code>toThrowError</code></a></li>
</ul>
<p>يمكنك رؤية واجهة <code>expect</code> الكاملة هنا:</p>
<ul>
<li><a href="https://vitest.dev/api/expect.html">واجهة Expect في Vitest</a>.</li>
<li><a href="https://jestjs.io/docs/expect">واجهة Expect في Jest</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
