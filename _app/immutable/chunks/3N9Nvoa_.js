const s="kinney",e="testing",n="مدخل إلى الاختبارات",t="testing-library-matchers",a="مُطابِقات Testing Library",l=[{depth:2,id:"تهيئة-مطابقات-testing-library",text:"تهيئة مُطابِقات Testing Library"},{depth:2,id:"تصيير-العداد",text:"تصيير العدّاد"},{depth:2,id:"اختبار-العداد",text:"اختبار العدّاد"},{depth:2,id:"دورك",text:"دورك"}],c=`<p>تضمّن Testing Library أيضًا بعض المُطابِقات المفيدة لإصدار توقّعات على عناصر DOM. وكإضافة ممتعة، سنستخدم React أيضًا—فقط لنُظهر لك كم الفرق ضئيل عندما يتعلّق الأمر باختبار واجهتك في DOM.</p>
<p>لننتقل إلى <code>examples/accident-counter</code>.</p>
<h2 id="تهيئة-مطابقات-testing-library">تهيئة مُطابِقات Testing Library</h2>
<p>في <code>examples/accident-counter/src/counter.test.jsx</code>، يمكننا توسيع التوابع التي يوفّرها <code>expect</code> بجلب <code>@testing-library/jest-dom/vitest</code>.</p>
<pre><code class="language-jsx"><span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> userEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/user-event&#x27;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Counter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./counter&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@testing-library/jest-dom/vitest&#x27;</span>;
</code></pre>
<p>سيستدعي هذا <code>expect.extend()</code>، مما يتيح لنا إعداد <a href="https://stevekinney.com/courses/testing/custom-matchers">مُطابِقات مخصّصة</a>. وسيمنحنا التوابع الجديدة التالية على <code>expect</code>.</p>
<ul>
<li><code>toBeDisabled</code></li>
<li><code>toBeEnabled</code></li>
<li><code>toBeEmptyDOMElement</code></li>
<li><code>toBeInTheDocument</code></li>
<li><code>toBeInvalid</code></li>
<li><code>toBeRequired</code></li>
<li><code>toBeValid</code></li>
<li><code>toBeVisible</code></li>
<li><code>toContainElement</code></li>
<li><code>toContainHTML</code></li>
<li><code>toHaveAccessibleDescription</code></li>
<li><code>toHaveAccessibleErrorMessage</code></li>
<li><code>toHaveAccessibleName</code></li>
<li><code>toHaveAttribute</code></li>
<li><code>toHaveClass</code></li>
<li><code>toHaveFocus</code></li>
<li><code>toHaveFormValues</code></li>
<li><code>toHaveStyle</code></li>
<li><code>toHaveTextContent</code></li>
<li><code>toHaveValue</code></li>
<li><code>toHaveDisplayValue</code></li>
<li><code>toBeChecked</code></li>
<li><code>toBePartiallyChecked</code></li>
<li><code>toHaveRole</code></li>
<li><code>toHaveErrorMessage</code></li>
</ul>
<p>يمكنك القراءة أكثر عن <code>@testing-library/jest-dom</code> <a href="https://github.com/testing-library/jest-dom">هنا</a>.</p>
<h2 id="تصيير-العداد">تصيير العدّاد</h2>
<p>نريد تصيير مكوّن <code>Counter</code> قبل كل اختبار. وهذا سيعيده إلى حالته الأصلية.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Counter&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> /&gt;</span></span>);
  });
});
</code></pre>
<h2 id="اختبار-العداد">اختبار العدّاد</h2>
<p>الآن، لنكتب اختبارًا سريعًا لنرى ما إذا كان يُصيَّر كما هو متوقّع.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;renders with an initial count of 0&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> countElement = screen.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;counter-count&#x27;</span>);
  <span class="hljs-title function_">expect</span>(countElement).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;0&#x27;</span>);
});
</code></pre>
<p>لاحظ التابع الجديد <code>toHaveTextContent</code>.</p>
<p>يمكننا أيضًا التحقّق من أن زرّي <code>decrement</code> و<code>reset</code> معطّلان عندما يكون العدّاد عند الصفر.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;disables the &quot;Decrement&quot; and &quot;Reset&quot; buttons when the count is 0&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> decrementButton = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Decrement&#x27;</span> });
  <span class="hljs-keyword">const</span> resetButton = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Reset&#x27;</span> });

  <span class="hljs-title function_">expect</span>(decrementButton).<span class="hljs-title function_">toBeDisabled</span>();
  <span class="hljs-title function_">expect</span>(resetButton).<span class="hljs-title function_">toBeDisabled</span>();
});
</code></pre>
<h2 id="دورك">دورك</h2>
<blockquote>
<p><strong>تمرين</strong></p>
</blockquote>
<p>نفّذ أكبر عدد تستطيعه من الاختبارات التالية:</p>
<ul>
<li>يعرض «days» عندما يكون العدّاد 0.</li>
<li>يزيد العدّاد عند النقر على زر «Increment».</li>
<li>يعرض «day» عندما يكون العدّاد 1.</li>
<li>ينقص العدّاد عند النقر على زر «Decrement».</li>
<li>لا يسمح بالإنقاص إلى ما دون 0.</li>
<li>يعيد ضبط العدّاد عند النقر على زر «Reset».</li>
<li>يعطّل زرّي «Decrement» و«Reset» عندما يكون العدّاد 0.</li>
<li>يحدّث عنوان المستند بناءً على العدّاد.</li>
</ul>
<p>يمكنك رؤية حل محتمل <a href="https://stevekinney.com/courses/testing/accident-counter-solution">هنا</a>.</p>
`,o={book:s,chapter:e,chapterTitle:n,slug:t,title:a,headings:l,html:c};export{s as book,e as chapter,n as chapterTitle,o as default,l as headings,c as html,t as slug,a as title};
