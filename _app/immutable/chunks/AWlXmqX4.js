const s="kinney",n="testing",a="مدخل إلى الاختبارات",p="basic-math-exercise-walkthrough",t="جولة عملية: تمرين الرياضيات الأساسية",l=[{depth:2,id:"دالة-الطرح",text:"دالة الطرح"},{depth:3,id:"الخطوة-1-اكتب-الاختبار-أحمر",text:"الخطوة 1: اكتب الاختبار (أحمر)"},{depth:3,id:"الخطوة-2-شغل-الاختبار-وشاهده-يفشل",text:"الخطوة 2: شغّل الاختبار وشاهده يفشل"},{depth:3,id:"الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-أخضر",text:"الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)"},{depth:3,id:"الخطوة-4-شغل-الاختبار-مرة-أخرى",text:"الخطوة 4: شغّل الاختبار مرة أخرى"},{depth:3,id:"الخطوة-5-أعد-الهيكلة",text:"الخطوة 5: أعد الهيكلة"},{depth:2,id:"دالة-الضرب",text:"دالة الضرب"},{depth:3,id:"الخطوة-1-اكتب-الاختبار-أحمر-1",text:"الخطوة 1: اكتب الاختبار (أحمر)"},{depth:3,id:"الخطوة-2-شغل-الاختبار-وشاهده-يفشل-1",text:"الخطوة 2: شغّل الاختبار وشاهده يفشل"},{depth:3,id:"الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-أخضر-1",text:"الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)"},{depth:3,id:"الخطوة-4-شغل-الاختبار-مرة-أخرى-1",text:"الخطوة 4: شغّل الاختبار مرة أخرى"},{depth:3,id:"الخطوة-5-أعد-الهيكلة-1",text:"الخطوة 5: أعد الهيكلة"},{depth:2,id:"دالة-القسمة",text:"دالة القسمة"},{depth:3,id:"الخطوة-1-اكتب-الاختبار-أحمر-2",text:"الخطوة 1: اكتب الاختبار (أحمر)"},{depth:3,id:"الخطوة-2-شغل-الاختبار-وشاهده-يفشل-2",text:"الخطوة 2: شغّل الاختبار وشاهده يفشل"},{depth:3,id:"الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-أخضر-2",text:"الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)"},{depth:3,id:"الخطوة-4-شغل-الاختبار-مرة-أخرى-2",text:"الخطوة 4: شغّل الاختبار مرة أخرى"},{depth:3,id:"الخطوة-5-أعد-الهيكلة-2",text:"الخطوة 5: أعد الهيكلة"}],e=`<p>إليك جولة عملية لتمرين نهاية القسم الخاص بـ <a href="https://stevekinney.com/courses/testing/basic-math">تنفيذ بعض الاختبارات الأساسية</a>.</p>
<h2 id="دالة-الطرح">دالة الطرح</h2>
<p>من المثالي أنني نفّذت <code>add</code> نيابةً عنك، فلنبدأ بتنفيذ العكس.</p>
<h3 id="الخطوة-1-اكتب-الاختبار-أحمر">الخطوة 1: اكتب الاختبار (أحمر)</h3>
<p>أضف اختبارات للدالة <code>subtract</code> في <code>examples/basic-math/src/arithmetic.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// examples/basic-math/src/arithmetic.test.js</span>
<span class="hljs-keyword">import</span> { subtract } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./calculator&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;subtract&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;subtracts two positive numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">subtract</span>(<span class="hljs-number">5</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;subtracts a larger number from a smaller number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">subtract</span>(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)).<span class="hljs-title function_">toBe</span>(-<span class="hljs-number">2</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;subtracts negative numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">subtract</span>(-<span class="hljs-number">5</span>, -<span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(-<span class="hljs-number">2</span>);
  });
});
</code></pre>
<p><strong>ملاحظة:</strong> تذكّر استيراد <code>subtract</code> من <code>arithmetic.js</code>.</p>
<h3 id="الخطوة-2-شغل-الاختبار-وشاهده-يفشل">الخطوة 2: شغّل الاختبار وشاهده يفشل</h3>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ستحصل على خطأ: <code>subtract</code> غير معرّفة.</p>
<h3 id="الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-أخضر">الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h3>
<p>نفّذ <code>subtract</code> في <code>arithmetic.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// example/basic-math/src/arithmetic.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">add</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a + b;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">subtract</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a - b;
};
</code></pre>
<h3 id="الخطوة-4-شغل-الاختبار-مرة-أخرى">الخطوة 4: شغّل الاختبار مرة أخرى</h3>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل اختبارات الطرح.</p>
<h3 id="الخطوة-5-أعد-الهيكلة">الخطوة 5: أعد الهيكلة</h3>
<p>مجددًا، الشيفرة بسيطة ولا تحتاج إلى إعادة هيكلة.</p>
<h2 id="دالة-الضرب">دالة الضرب</h2>
<h3 id="الخطوة-1-اكتب-الاختبار-أحمر-1">الخطوة 1: اكتب الاختبار (أحمر)</h3>
<p>أضف اختبارات للدالة <code>multiply</code> في <code>examples/basic-math/src/arithmetic.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// examples/basic-math/src/arithmetic.test.js</span>
<span class="hljs-keyword">import</span> { multiply } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./calculator&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;multiply&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;multiplies two positive numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">multiply</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">6</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;multiplies by zero&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">multiply</span>(<span class="hljs-number">5</span>, <span class="hljs-number">0</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;multiplies negative numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">multiply</span>(-<span class="hljs-number">2</span>, -<span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">6</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;multiplies a positive and a negative number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">multiply</span>(-<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(-<span class="hljs-number">6</span>);
  });
});
</code></pre>
<h3 id="الخطوة-2-شغل-الاختبار-وشاهده-يفشل-1">الخطوة 2: شغّل الاختبار وشاهده يفشل</h3>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>خطأ: <code>multiply</code> غير معرّفة.</p>
<h3 id="الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-أخضر-1">الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h3>
<p>نفّذ <code>multiply</code> في <code>arithmetic.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// example/basic-math/src/arithmetic.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">add</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a + b;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">subtract</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a - b;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">multiply</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a * b;
};
</code></pre>
<h3 id="الخطوة-4-شغل-الاختبار-مرة-أخرى-1">الخطوة 4: شغّل الاختبار مرة أخرى</h3>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل اختبارات الضرب.</p>
<h3 id="الخطوة-5-أعد-الهيكلة-1">الخطوة 5: أعد الهيكلة</h3>
<p>لا حاجة إلى إعادة هيكلة. الحياة بسيطة جدًا الآن.</p>
<h2 id="دالة-القسمة">دالة القسمة</h2>
<h3 id="الخطوة-1-اكتب-الاختبار-أحمر-2">الخطوة 1: اكتب الاختبار (أحمر)</h3>
<p>أضف اختبارات للدالة <code>divide</code> في <code>examples/basic-math/src/arithmetic.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// examples/basic-math/src/arithmetic.test.js</span>
<span class="hljs-keyword">import</span> { divide } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./calculator&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;divide&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;divides two positive numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">divide</span>(<span class="hljs-number">6</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;divides a number by one&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">divide</span>(<span class="hljs-number">5</span>, <span class="hljs-number">1</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;divides zero by a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">divide</span>(<span class="hljs-number">0</span>, <span class="hljs-number">5</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">0</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;divides negative numbers&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">divide</span>(-<span class="hljs-number">6</span>, -<span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;divides a positive and a negative number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">divide</span>(-<span class="hljs-number">6</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(-<span class="hljs-number">2</span>);
  });
});
</code></pre>
<h3 id="الخطوة-2-شغل-الاختبار-وشاهده-يفشل-2">الخطوة 2: شغّل الاختبار وشاهده يفشل</h3>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>خطأ: <code>divide</code> غير معرّفة.</p>
<h3 id="الخطوة-3-اكتب-أقل-شيفرة-تجعل-الاختبار-ينجح-أخضر-2">الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h3>
<p>نفّذ <code>divide</code> في <code>arithmetic.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// example/basic-math/src/arithmetic.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">add</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a + b;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">subtract</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a - b;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">multiply</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a * b;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">divide</span> = (<span class="hljs-params">a, b</span>) =&gt; {
  <span class="hljs-keyword">return</span> a / b;
};
</code></pre>
<h3 id="الخطوة-4-شغل-الاختبار-مرة-أخرى-2">الخطوة 4: شغّل الاختبار مرة أخرى</h3>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل اختبارات القسمة.</p>
<h3 id="الخطوة-5-أعد-الهيكلة-2">الخطوة 5: أعد الهيكلة</h3>
<p>مجددًا. لا حاجة إلى إعادة هيكلة. أنا أحاول فقط إثبات نقطة هنا.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,p as slug,t as title};
