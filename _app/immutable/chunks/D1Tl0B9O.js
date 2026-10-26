const s="kinney",n="testing",t="مدخل إلى الاختبارات",e="running-tests",a="تشغيل الاختبارات باستخدام Vitest",c=[{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],o=`<p>من داخل <a href="https://github.com/stevekinney/introduction-to-testing">المستودع المرافق</a>، سننتقل إلى <code>examples/basic-math</code>. ستجد أن لدينا ملفين في <code>src</code>:</p>
<ul>
<li><code>calculator.js</code></li>
<li><code>calculator.test.js</code></li>
</ul>
<p>يمكنك استخدام <code>vitest</code> لتشغيل اختباراتك.</p>
<pre><code class="language-bash">npx vitest

<span class="hljs-comment"># Or, if you wanted to run your tests with Vitest UI.</span>
npx vitest --ui
</code></pre>
<p>في حالتنا هذه، لدينا الأمر معرّفًا في <code>package.json</code>. على سبيل المثال، قد يكون لديك السكربت التالي في <code>package.json</code>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-comment">// … other stuff</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vitest&quot;</span>
  <span class="hljs-punctuation">}</span>
  <span class="hljs-comment">// more stuff …</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وكما لاحظت على الأرجح، فقد فعلت هذا نيابةً عنك مسبقًا.</p>
<p>هذا يعني أنه يمكنك تنفيذ <code>npm test</code> لتشغيل اختباراتنا. وإن أردت تشغيلها مع الواجهة، يمكنك تنفيذ <code>npm test -- --ui</code> لتمرير العلم إلى سكربت <code>npm</code>.</p>
<p>بشكل افتراضي، يشغّل معظم مشغّلات الاختبارات <em>كل</em> اختبار يوافق أي اصطلاح لتسمية الملفات صُمّمت عليه. لكن يمكنك التحكّم في ذلك بعض الشيء عبر <a href="https://stevekinney.com/courses/testing/filtering-tests">تزويد مرشّح للاختبارات التي تريد تشغيلها</a>.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/testing/filtering-tests">ترشيح الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/testing/organizing-and-annotating-tests">تنظيم الاختبارات والتعليق عليها</a></li>
<li><a href="https://stevekinney.com/courses/testing/running-tests-for-related-files">تشغيل اختبارات الملفات ذات الصلة</a></li>
</ul>
`,p={book:s,chapter:n,chapterTitle:t,slug:e,title:a,headings:c,html:o};export{s as book,n as chapter,t as chapterTitle,p as default,c as headings,o as html,e as slug,a as title};
