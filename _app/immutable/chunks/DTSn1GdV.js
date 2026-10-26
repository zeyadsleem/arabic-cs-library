const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="testing-library",e="استخدام Testing Library",l=[{depth:2,id:"لماذا-تستخدم-testing-library",text:"لماذا تستخدم Testing Library؟"},{depth:2,id:"مكونات-testing-library",text:"مكوّنات Testing Library"},{depth:2,id:"إعادة-هيكلة-حقل-الإدخال-السري",text:"إعادة هيكلة حقل الإدخال السرّي"},{depth:3,id:"جلب-اعتمادياتنا",text:"جلب اعتمادياتنا"},{depth:3,id:"تهيئة-dom",text:"تهيئة DOM"},{depth:3,id:"التفاعل-مع-dom",text:"التفاعل مع DOM"},{depth:2,id:"متى-تستخدم-testing-library",text:"متى تستخدم Testing Library"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],c=`<p><a href="https://testing-library.com/">Testing Library</a> مصمّمة لمساعدتك في كتابة اختبارات تركّز على سلوك المستخدم بدلًا من تفاصيل التنفيذ. وهي توفّر أدوات للاستعلام عن DOM والتفاعل معه بطريقة تشبه ما يفعله المستخدمون.</p>
<p>لنراجع المثال من <a href="https://stevekinney.com/courses/testing/testing-local-storage">القسم السابق</a>.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should store the value in localStorage&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> secretInput = <span class="hljs-title function_">createSecretInput</span>();
  <span class="hljs-keyword">const</span> input = secretInput.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;input&#x27;</span>);
  <span class="hljs-keyword">const</span> button = secretInput.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;button&#x27;</span>);

  input.<span class="hljs-property">value</span> = <span class="hljs-string">&#x27;my secret&#x27;</span>;
  button.<span class="hljs-title function_">click</span>();

  <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;secret&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;my secret&#x27;</span>);
});
</code></pre>
<p>هذا الاختبار ينجح. لذا فهو يعمل من الناحية التقنية. لكن هناك بعض التحفّظات التي تجعله غير رائع جدًا لاختبار سلوك العالم الحقيقي:</p>
<ol>
<li>نضبط قيمة عنصر <code>input</code> يدويًا بدلًا من محاكاة كتابة المستخدم فيه.</li>
<li>نستدعي تابعًا على الزر بدلًا من النقر عليه فعليًا.</li>
</ol>
<p>أحد أهداف Testing Library هو مساعدتنا في محاكاة تفاعلات المستخدم الفعلية.</p>
<h2 id="لماذا-تستخدم-testing-library">لماذا تستخدم Testing Library؟</h2>
<ul>
<li><strong>اختبار محوره المستخدم</strong>: تركّز على اختبار المكوّنات من منظور المستخدم.</li>
<li><strong>تجنّب تفاصيل التنفيذ</strong>: تقلّل الاقتران بين الاختبارات ودواخل المكوّنات.</li>
<li><strong>تحسين موثوقية الاختبارات</strong>: تؤدي إلى اختبارات أكثر متانة وأقل عرضة للانكسار بسبب إعادة الهيكلة.</li>
<li><strong>استعلامات سهلة الوصول</strong>: تشجّع على الاختبار باستعلامات تعكس أفضل ممارسات إمكانية الوصول.</li>
</ul>
<h2 id="مكونات-testing-library">مكوّنات Testing Library</h2>
<p>بوجه عام، يمكنك أن تنظر إلى Testing Library على أنها جزآن:</p>
<ol>
<li><strong>نسخة خاصة بإطار معيّن من التوابع المساعدة</strong>: على سبيل المثال، هناك الحزمة الأساسية <a href="https://npm.im/@testing-library/dom"><code>@testing-library/dom</code></a>. لكن هناك أيضًا: <a href="https://npm.im/@testing-library/react"><code>@testing-library/react</code></a>، و<a href="https://npm.im/@testing-library/vue"><code>@testing-library/vue</code></a>، و<a href="https://npm.im/@testing-library/svelte"><code>@testing-library/svelte</code></a>، وغيرها.</li>
<li><strong>User Event</strong> (<code>@testing-library/user-event</code>): مكتبة مساعدة مستقلة عن الإطار لمحاكاة أحداث المستخدم.</li>
</ol>
<h2 id="إعادة-هيكلة-حقل-الإدخال-السري">إعادة هيكلة حقل الإدخال السرّي</h2>
<blockquote>
<p><strong>User Event غير متزامن</strong></p>
<p>التوابع التي يوفّرها <code>userEvent</code> غير متزامنة، وهذا يعني أن اختباراتك ستحتاج إلى استخدام <code>async</code>/<code>await</code>.</p>
</blockquote>
<p>لننظر إلى هذا الاختبار وقد أُعيد تصوّره باستخدام Testing Library. سننظر إلى الأمر كله ثم نفكّكه قطعة قطعة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;createSecretInput&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">innerHTML</span> = <span class="hljs-string">&#x27;&#x27;</span>;
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(<span class="hljs-title function_">createSecretInput</span>());
    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">clear</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should store the value in localStorage&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> input = screen.<span class="hljs-title function_">getByLabelText</span>(<span class="hljs-string">&#x27;Secret&#x27;</span>);
    <span class="hljs-keyword">const</span> button = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Store Secret&#x27;</span> });

    <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">type</span>(input, <span class="hljs-string">&#x27;my secret&#x27;</span>);
    <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">click</span>(button);

    <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;secret&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;my secret&#x27;</span>);
  });
});
</code></pre>
<h3 id="جلب-اعتمادياتنا">جلب اعتمادياتنا</h3>
<p>إذن، أولًا أحتاج إلى جلب تلك المكتبة المساعدة—تلك التي قلت سابقًا إن لها «نكهة إطار». في هذه الحالة، نستخدم JavaScript العادية فحسب. لذا نختار <code>@testing-library/dom</code>. وسنجلب أيضًا <code>@testing-library/user-event</code> للتفاعل مع DOM كما قد يفعل المستخدم.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/dom&#x27;</span>;
<span class="hljs-keyword">import</span> userEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/user-event&#x27;</span>;
</code></pre>
<h3 id="تهيئة-dom">تهيئة DOM</h3>
<p>في التكرار السابق، كنت أعبث بالعناصر في الذاكرة فحسب. لم تُصيَّر قط إلى الصفحة. هذه المرة، لنُصيّرها في المستند. وسأحرص أيضًا على تفريغ <code>document</code> قبل كل اختبار.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Clear out the DOM.</span>
  <span class="hljs-variable language_">document</span>.<span class="hljs-property">innerHTML</span> = <span class="hljs-string">&#x27;&#x27;</span>;

  <span class="hljs-comment">// Clear out \`localStorage\`.</span>
  <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">clear</span>();

  <span class="hljs-comment">// Render our little component.</span>
  <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(<span class="hljs-title function_">createSecretInput</span>());
});
</code></pre>
<h3 id="التفاعل-مع-dom">التفاعل مع DOM</h3>
<p>الآن، سنستخدم بعض محدّدات إمكانية الوصول. <code>screen</code> هي في الأساس نافذة المتصفح. وهذا يعني أن <code>id</code> الخاص بك قد يتغيّر أو يُولَّد عشوائيًا أو أيًا كان. نحن نستخدم الوظيفة نفسها التي قد يستخدمها قارئ الشاشة للعثور على العناصر.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should store the value in localStorage&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> input = screen.<span class="hljs-title function_">getByLabelText</span>(<span class="hljs-string">&#x27;Secret&#x27;</span>);
  <span class="hljs-keyword">const</span> button = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Store Secret&#x27;</span> });

  <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">type</span>(input, <span class="hljs-string">&#x27;my secret&#x27;</span>);
  <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(button);

  <span class="hljs-title function_">expect</span>(<span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;secret&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;my secret&#x27;</span>);
});
</code></pre>
<blockquote>
<p><strong>تأكّد من أنك تنتظر أحداث المستخدم</strong></p>
<p>على سبيل التجربة—امضِ قدمًا واحذف كلمات <code>await</code> تلك وانظر ما يحدث. <strong>حرق المفاجأة</strong>: إنه ليس جيدًا.</p>
</blockquote>
<h2 id="متى-تستخدم-testing-library">متى تستخدم Testing Library</h2>
<ul>
<li><strong>اختبار تفاعل المكوّنات</strong>: عندما تحتاج إلى اختبار كيف تستجيب المكوّنات لأفعال المستخدم.</li>
<li><strong>الالتزام بإمكانية الوصول</strong>: ضمان أن المكوّنات سهلة الوصول وتتفاعل كما هو متوقّع.</li>
<li><strong>التحقّق من السلوك</strong>: التأكّد من أن المكوّنات تُصيَّر وتتحدّث بشكل صحيح بناءً على الخصائص والحالة.</li>
</ul>
<blockquote>
<p><strong>تمرين</strong></p>
<p>هل يمكنك إعادة هيكلة زرّنا من <a href="https://stevekinney.com/courses/testing/testing-the-dom-example">هذا القسم</a> (الموجود في <code>examples/element-factory/src/button.js</code>) لاستخدام Testing Library وUser Event؟ يمكنك رؤية حل محتمل <a href="https://stevekinney.com/courses/testing/testing-library-solution">هنا</a>.</p>
</blockquote>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<p>لدى <code>@testing-library/dom</code> دالة تُسمّى <code>fireEvent</code> تُطلق أحداثًا خامًا على عُقد DOM. هذا مفيد عند الحاجة إليه، لكن—بوجه عام—ينبغي أن تهدف إلى استخدام <code>user-event</code> بدلًا منه لأنه يحاكي تفاعل المستخدم بشكل أفضل. على سبيل المثال، قد يتكوّن حدث مستخدم بسيط من أحداث DOM متعددة.</p>
<ul>
<li>قد ينقر المستخدم ليركّز على الحقل (<code>click</code>، <code>focus</code>).</li>
<li>وقد يضغط مفتاحًا (<code>keydown</code>، <code>keypress</code>).</li>
<li>وعلى الأرجح سيُفلت ذلك المفتاح (<code>keyup</code>).</li>
<li>وسيؤدي ذلك إلى إطلاق حدث <code>change</code> على حقل الإدخال.</li>
</ul>
<p>كتبت المزيد عن <a href="https://stevekinney.com/courses/testing/user-event"><code>user-event</code> هنا</a>.</p>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,p as default,l as headings,c as html,t as slug,e as title};
