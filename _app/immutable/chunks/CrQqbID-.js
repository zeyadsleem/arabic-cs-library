const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="structure-of-a-unit-test",p="نمط الترتيب والتنفيذ والتحقق (AAA)",t=[{depth:2,id:"نمط-الترتيب-والتنفيذ-والتحقق-aaa",text:"نمط الترتيب والتنفيذ والتحقق (AAA)"},{depth:3,id:"لماذا-يعد-أفضل-ممارسة",text:"لماذا يُعدّ أفضل ممارسة"},{depth:3,id:"أمثلة-في-الممارسة",text:"أمثلة في الممارسة"},{depth:3,id:"الخلاصات-الرئيسية",text:"الخلاصات الرئيسية"}],e=`<h2 id="نمط-الترتيب-والتنفيذ-والتحقق-aaa">نمط الترتيب والتنفيذ والتحقق (AAA)</h2>
<p>نمط Arrange-Act-Assert (AAA) مقاربة منظّمة لكتابة اختبارات الوحدات تعزّز القابلية للقراءة والصيانة. وهو يقسّم كل اختبار إلى ثلاثة أقسام متمايزة:</p>
<ol>
<li><strong>الترتيب (Arrange)</strong>: جهّز الشروط والمُدخلات المطلوبة للاختبار.</li>
<li><strong>التنفيذ (Act)</strong>: نفّذ الشيفرة أو الدالة قيد الاختبار.</li>
<li><strong>التحقق (Assert)</strong>: تحقّق من أن النتيجة تطابق بالنتيجة المتوقعة.</li>
</ol>
<h3 id="لماذا-يعد-أفضل-ممارسة">لماذا يُعدّ أفضل ممارسة</h3>
<ul>
<li><strong>الوضوح</strong>: الفصل الواضح بين التجهيز والتنفيذ والتحقق يجعل الاختبارات أسهل في القراءة والفهم.</li>
<li><strong>الاتساق</strong>: البنية الموحّدة بين الاختبارات تبسّط كتابتها وصيانتها.</li>
<li><strong>القابلية للصيانة</strong>: الاختبارات المنظّمة جيدًا أسهل في التحديث مع تطوّر قاعدة الشيفرة.</li>
<li><strong>كفاءة التنقيح</strong>: يصبح تحديد موضع فشل الاختبار مباشرًا.</li>
<li><strong>المسؤولية الواحدة</strong>: يشجّع على اختبار وظيفة واحدة في كل مرة، ما يؤدي إلى اختبارات أكثر دقة.</li>
</ul>
<h3 id="أمثلة-في-الممارسة">أمثلة في الممارسة</h3>
<h4>المثال 1: اختبار دالة بسيطة</h4>
<p>تأمّل دالة تحسب مضروب عدد:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n</span>) {
  <span class="hljs-keyword">if</span> (n &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Negative input not allowed&#x27;</span>);
  <span class="hljs-keyword">return</span> n === <span class="hljs-number">0</span> ? <span class="hljs-number">1</span> : n * <span class="hljs-title function_">factorial</span>(n - <span class="hljs-number">1</span>);
}
</code></pre>
<p><strong>اختبار باستخدام نمط AAA:</strong></p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;calculates factorial of a positive integer&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> input = <span class="hljs-number">5</span>;
  <span class="hljs-keyword">const</span> expectedOutput = <span class="hljs-number">120</span>;

  <span class="hljs-comment">// Act</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">factorial</span>(input);

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(expectedOutput);
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><em>الترتيب</em>: جهّز قيمة المُدخل والمخرج المتوقع.</li>
<li><em>التنفيذ</em>: نادِ دالة <code>factorial</code> بالمُدخل.</li>
<li><em>التحقق</em>: تأكد من أن النتيجة تطابق المخرج المتوقع.</li>
</ul>
<h4>المثال 2: اختبار معالجة الأخطاء</h4>
<p>اختبار كيفية تعامل دالة مع مُدخل غير صالح:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">divide</span>(<span class="hljs-params">a, b</span>) {
  <span class="hljs-keyword">if</span> (b === <span class="hljs-number">0</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Cannot divide by zero&#x27;</span>);
  <span class="hljs-keyword">return</span> a / b;
}
</code></pre>
<p><strong>اختبار باستخدام نمط AAA:</strong></p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;throws an error when dividing by zero&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> numerator = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">const</span> denominator = <span class="hljs-number">0</span>;

  <span class="hljs-comment">// Act and Assert</span>
  <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">divide</span>(numerator, denominator);
  }).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Cannot divide by zero&#x27;</span>);
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><em>الترتيب</em>: هيّئ البسط واضبط المقام على صفر.</li>
<li><em>التنفيذ والتحقق</em>: نفّذ الدالة داخل تحقّق للبحث عن الخطأ المتوقع.</li>
</ul>
<h4>المثال 3: اختبار الشيفرة غير المتزامنة</h4>
<p>افترض وجود دالة غير متزامنة تجلب بيانات من واجهة برمجة تطبيقات:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchData</span>(<span class="hljs-params">url</span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}
</code></pre>
<p><strong>اختبار باستخدام نمط AAA:</strong></p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;fetches data successfully from an API&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> url = <span class="hljs-string">&#x27;https://api.example.com/data&#x27;</span>;
  <span class="hljs-keyword">const</span> mockData = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Test Data&#x27;</span> };
  <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span> = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({
      <span class="hljs-attr">json</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(mockData),
    }),
  );

  <span class="hljs-comment">// Act</span>
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchData</span>(url);

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(data).<span class="hljs-title function_">toEqual</span>(mockData);
  <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span>).<span class="hljs-title function_">toHaveBeenCalledWith</span>(url);

  <span class="hljs-comment">// Cleanup</span>
  <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span>.<span class="hljs-title function_">mockClear</span>();
  <span class="hljs-keyword">delete</span> <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span>;
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><em>الترتيب</em>: استبدل دالة <code>fetch</code> ببديل مُحاكى يعيد بيانات محدّدة مسبقًا.</li>
<li><em>التنفيذ</em>: نادِ دالة <code>fetchData</code>.</li>
<li><em>التحقق</em>: تأكد من أن البيانات المُعادة تطابق البيانات المُحاكاة وأن <code>fetch</code> نُوديت بعنوان URL الصحيح.</li>
</ul>
<h4>المثال 4: اختبار تابع في صنف</h4>
<p>تأمّل صنف <code>Calculator</code> بسيطًا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Calculator</span> {
  <span class="hljs-title function_">add</span>(<span class="hljs-params">a, b</span>) {
    <span class="hljs-keyword">return</span> a + b;
  }
}
</code></pre>
<p><strong>اختبار باستخدام نمط AAA:</strong></p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds two numbers correctly using Calculator class&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> calculator = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Calculator</span>();
  <span class="hljs-keyword">const</span> num1 = <span class="hljs-number">7</span>;
  <span class="hljs-keyword">const</span> num2 = <span class="hljs-number">3</span>;
  <span class="hljs-keyword">const</span> expected = <span class="hljs-number">10</span>;

  <span class="hljs-comment">// Act</span>
  <span class="hljs-keyword">const</span> result = calculator.<span class="hljs-title function_">add</span>(num1, num2);

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(expected);
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><em>الترتيب</em>: أنشئ نسخة من <code>Calculator</code> وجهّز الأعداد.</li>
<li><em>التنفيذ</em>: استدعِ التابع <code>add</code> بالأعداد.</li>
<li><em>التحقق</em>: تأكد من أن النتيجة تساوي المجموع المتوقع.</li>
</ul>
<h4>المثال 5: اختبار دالة ذات تأثيرات جانبية</h4>
<p>افترض أن دالة تسجّل رسالة في الطرفية:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">logMessage</span>(<span class="hljs-params">message</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(message);
}
</code></pre>
<p><strong>اختبار باستخدام نمط AAA:</strong></p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;logs the correct message to the console&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> consoleSpy = vi.<span class="hljs-title function_">spyOn</span>(<span class="hljs-variable language_">console</span>, <span class="hljs-string">&#x27;log&#x27;</span>);
  <span class="hljs-keyword">const</span> message = <span class="hljs-string">&#x27;Hello, World!&#x27;</span>;

  <span class="hljs-comment">// Act</span>
  <span class="hljs-title function_">logMessage</span>(message);

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(consoleSpy).<span class="hljs-title function_">toHaveBeenCalledWith</span>(message);

  <span class="hljs-comment">// Cleanup</span>
  consoleSpy.<span class="hljs-title function_">mockRestore</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><em>الترتيب</em>: راقب التابع <code>console.log</code>.</li>
<li><em>التنفيذ</em>: نادِ <code>logMessage</code> برسالة اختبار.</li>
<li><em>التحقق</em>: تأكد من أن <code>console.log</code> نُوديت بالرسالة الصحيحة.</li>
<li><em>التنظيف</em>: استعد التابع الأصلي <code>console.log</code>.</li>
</ul>
<h4>المثال 6: اختبار الحالات الحدّية</h4>
<p>اختبار دالة تعالج مصفوفة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">getFirstElement</span>(<span class="hljs-params">array</span>) {
  <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(array)) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Input must be an array&#x27;</span>);
  <span class="hljs-keyword">return</span> array[<span class="hljs-number">0</span>];
}
</code></pre>
<p><strong>اختبار باستخدام نمط AAA:</strong></p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;returns undefined for an empty array&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> inputArray = [];
  <span class="hljs-keyword">const</span> expectedOutput = <span class="hljs-literal">undefined</span>;

  <span class="hljs-comment">// Act</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">getFirstElement</span>(inputArray);

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(expectedOutput);
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><em>الترتيب</em>: جهّز مصفوفة فارغة.</li>
<li><em>التنفيذ</em>: نادِ <code>getFirstElement</code> بالمصفوفة الفارغة.</li>
<li><em>التحقق</em>: تأكد من أن النتيجة هي <code>undefined</code>.</li>
</ul>
<h4>المثال 7: الاختبار باستخدام Mock Service Worker (MSW)</h4>
<p>اختبار دالة تُجري طلبًا إلى واجهة برمجة تطبيقات، باستخدام MSW لمحاكاة طلب الشبكة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Function to fetch user data</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getUser</span>(<span class="hljs-params">id</span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}
</code></pre>
<p><strong>اختبار باستخدام نمط AAA مع MSW:</strong></p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { rest } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw&#x27;</span>;
<span class="hljs-keyword">import</span> { setupServer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw/node&#x27;</span>;

<span class="hljs-keyword">const</span> server = <span class="hljs-title function_">setupServer</span>(
  rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/users/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { id } = req.<span class="hljs-property">params</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">json</span>({ id, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span> }));
  }),
);

<span class="hljs-title function_">beforeAll</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">listen</span>());
<span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">resetHandlers</span>());
<span class="hljs-title function_">afterAll</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">close</span>());

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;fetches user data successfully&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-comment">// Arrange</span>
  <span class="hljs-keyword">const</span> userId = <span class="hljs-string">&#x27;123&#x27;</span>;

  <span class="hljs-comment">// Act</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUser</span>(userId);

  <span class="hljs-comment">// Assert</span>
  <span class="hljs-title function_">expect</span>(user).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span> });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><em>الترتيب</em>: جهّز MSW لاعتراض طلبات الشبكة وإعادة بيانات مُحاكاة.</li>
<li><em>التنفيذ</em>: نادِ دالة <code>getUser</code> بمعرّف مستخدم للاختبار.</li>
<li><em>التحقق</em>: تأكد من أن بيانات المستخدم المُعادة تطابق البيانات المُحاكاة.</li>
</ul>
<h3 id="الخلاصات-الرئيسية">الخلاصات الرئيسية</h3>
<p>بعد كل ما سبق، هذا هو جوهر الأمر:</p>
<ul>
<li><strong>فصل الاهتمامات</strong>: يفرض نمط AAA فصلًا واضحًا بين التجهيز والتنفيذ والتحقق.</li>
<li><strong>القابلية للقراءة</strong>: تصبح الاختبارات مفسّرة لنفسها، وتعمل توثيقًا للسلوك المتوقع للشيفرة.</li>
<li><strong>الاتساق</strong>: اتباع نمط قياسي يقلل الحمل المعرفي عند الانتقال بين اختبارات أو مشاريع مختلفة.</li>
<li><strong>القابلية للصيانة</strong>: يصبح تحديث الاختبارات أسهل عند حدوث تغييرات في قاعدة الشيفرة.</li>
<li><strong>كفاءة التنقيح</strong>: يبسّط تحديد موضع فشل الاختبار المحتمل.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
