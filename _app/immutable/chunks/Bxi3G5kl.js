const s="kinney",n="testing",a="مدخل إلى الاختبارات",e="mock-spy-secret-input-example",t="محاكاة الطرق المدمجة والتجسس عليها (Mocking and Spying on Built-in Methods)",l=[{depth:2,id:"دورك-الآن",text:"دورك الآن"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p>لنلقِ نظرة على <code>examples/element-factory/src/secret-input.test.js</code> مرة أخرى. لدينا بعض الوظائف حيث يمكن تعبئة حقل الإدخال مسبقًا بأي شيء موجود حاليًا في <code>localStorage</code>. لنفترض أننا نريد في الوقت نفسه تثبيت قيمة <code>localStorage</code> وأن نكون قادرين على فحص المعاملات التي استُدعي بها <code>localStorage.getItem</code>.</p>
<p>لنبدأ بتعديل تهيئتنا:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">localStorage</span>, <span class="hljs-string">&#x27;getItem&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>(<span class="hljs-string">&#x27;test secret&#x27;</span>);
  vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">localStorage</span>, <span class="hljs-string">&#x27;setItem&#x27;</span>);

  <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">innerHTML</span> = <span class="hljs-string">&#x27;&#x27;</span>;
  <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(<span class="hljs-title function_">createSecretInput</span>());
});
</code></pre>
<p>الآن، لنفترض أننا نريد أن نلقي نظرة على ما إذا كان حقل الإدخال يحمل القيمة الصحيحة <em>و</em> ما إذا كان يجلب تلك القيمة من <code>localStorage</code>.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should have loaded the secret from localStorage&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByLabelText</span>(<span class="hljs-string">&#x27;Secret&#x27;</span>)).<span class="hljs-title function_">toHaveValue</span>(<span class="hljs-string">&#x27;test secret&#x27;</span>);
  <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-property">getItem</span>).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;secret&#x27;</span>);
});
</code></pre>
<blockquote>
<p><strong>هل يمكننا ببساطة تعيين التخزين المحلي (local storage) ومسحه باستخدام JSDOM أو Happy DOM؟</strong></p>
<p>غالبًا، نعم. يمكننا ذلك. وربما ينبغي لنا. الميزة الوحيدة الإضافية هنا هي أننا نستطيع النظر في القيم التي استُدعي بها <code>localStorage.getItem</code> و<code>localStorage.setItem</code>.</p>
<p>ولكي أكون صريحًا تمامًا، أفعل هذا غالبًا لأنني سأكلفك بأمثلة عملية أكثر بعد قليل.</p>
</blockquote>
<p>يمكننا فعل الشيء نفسه لتعيين القيمة. تذكّر أنه بما أن السر يُحمَّل من <code>localStorage</code>، فستحتاج إلى مسح حقل الإدخال قبل الكتابة فيه.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should save the secret to localStorage&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> input = screen.<span class="hljs-title function_">getByLabelText</span>(<span class="hljs-string">&#x27;Secret&#x27;</span>);
  <span class="hljs-keyword">const</span> button = screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Store Secret&#x27;</span>);

  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">clear</span>(input);
  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">type</span>(input, <span class="hljs-string">&#x27;new secret&#x27;</span>);
  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">click</span>(button);

  <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-property">setItem</span>).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;secret&#x27;</span>, <span class="hljs-string">&#x27;new secret&#x27;</span>);
});
</code></pre>
<h2 id="دورك-الآن">دورك الآن</h2>
<blockquote>
<p><strong>هل يمكنك محاكاة الأرقام العشوائية؟</strong></p>
<p>انتقل إلى <code>examples/guessing-game</code>. تستخدم هذه اللعبة <code>Math.random</code> لتوليد رقم عشوائي — وهو ما قد يجعل اختبارها صعبًا. هل يمكنك استخدام الاستراتيجيات أعلاه لإبقاء <code>Math.random()</code> في مكان ثابت؟ <strong>تلميح</strong>: <code>0.5</code> خيار جيد.</p>
</blockquote>
<p>يمكنك رؤية حل نموذجي <a href="https://stevekinney.com/courses/testing/guessing-game-solution">هنا</a>.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<p>يمكنك مراجعة المزيد من الأمثلة <a href="https://stevekinney.com/courses/testing/overriding-object-properties">هنا</a>.</p>
<ul>
<li><a href="https://stevekinney.com/courses/testing/overriding-object-properties">تجاوز خصائص الكائنات</a></li>
<li><a href="https://stevekinney.com/courses/testing/mocking-dom-methods">محاكاة طرق DOM</a></li>
</ul>
`,p={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,p as default,l as headings,c as html,e as slug,t as title};
