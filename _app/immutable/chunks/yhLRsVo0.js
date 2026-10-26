const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="task-list-example",t="بناء قائمة مهام باستخدام Vitest",p=[{depth:2,id:"بناء-تطبيق-قائمة-مهام-في-react-بالتطوير-المدفوع-بالاختبارات-مع-vitest",text:"بناء تطبيق قائمة مهام في React بالتطوير المدفوع بالاختبارات مع Vitest"},{depth:3,id:"المقدمة",text:"المقدمة"},{depth:3,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:3,id:"تهيئة-المشروع",text:"تهيئة المشروع"},{depth:3,id:"فهم-التطوير-المدفوع-بالاختبارات",text:"فهم التطوير المدفوع بالاختبارات"},{depth:3,id:"تهيئة-react-مع-vitest",text:"تهيئة React مع Vitest"},{depth:3,id:"تصميم-تطبيق-قائمة-المهام",text:"تصميم تطبيق قائمة المهام"},{depth:3,id:"تنفيذ-التطبيق-بالتطوير-المدفوع-بالاختبارات",text:"تنفيذ التطبيق بالتطوير المدفوع بالاختبارات"},{depth:3,id:"محاكاة-واجهة-برمجة-التطبيقات-باستخدام-msw",text:"محاكاة واجهة برمجة التطبيقات باستخدام MSW"},{depth:3,id:"تشغيل-الاختبارات",text:"تشغيل الاختبارات"},{depth:3,id:"الخلاصة",text:"الخلاصة"},{depth:3,id:"تمارين-إضافية",text:"تمارين إضافية"}],e=`<h2 id="بناء-تطبيق-قائمة-مهام-في-react-بالتطوير-المدفوع-بالاختبارات-مع-vitest">بناء تطبيق قائمة مهام في React بالتطوير المدفوع بالاختبارات مع Vitest</h2>
<p><strong>جدول المحتويات</strong></p>
<ol>
<li><a href="#introduction">المقدمة</a></li>
<li><a href="#prerequisites">المتطلبات المسبقة</a></li>
<li><a href="#project-setup">تهيئة المشروع</a></li>
<li><a href="#understanding-test-driven-development">فهم التطوير المدفوع بالاختبارات</a></li>
<li><a href="#setting-up-react-with-vitest">تهيئة React مع Vitest</a></li>
<li><a href="#designing-the-to-do-list-application">تصميم تطبيق قائمة المهام</a></li>
<li><a href="#implementing-the-application-with-tdd">تنفيذ التطبيق بالتطوير المدفوع بالاختبارات</a> <a href="#creating-the-todolist-component">1. إنشاء مكوّن <code>ToDoList</code></a> <a href="#fetching-to-dos-from-an-api">2. جلب المهام من واجهة برمجة تطبيقات</a> <a href="#adding-a-new-to-do">3. إضافة مهمة جديدة</a> <a href="#marking-a-to-do-as-completed">4. تعليم مهمة كمكتملة</a> <a href="#deleting-a-to-do">5. حذف مهمة</a></li>
</ol>
<ul>
<li><a href="#creating-the-todolist-component">1. إنشاء مكوّن <code>ToDoList</code></a></li>
<li><a href="#fetching-to-dos-from-an-api">2. جلب المهام من واجهة برمجة تطبيقات</a></li>
<li><a href="#adding-a-new-to-do">3. إضافة مهمة جديدة</a></li>
<li><a href="#marking-a-to-do-as-completed">4. تعليم مهمة كمكتملة</a></li>
<li><a href="#deleting-a-to-do">5. حذف مهمة</a></li>
</ul>
<ol start="8">
<li><a href="#mocking-the-api-with-msw">محاكاة واجهة برمجة التطبيقات باستخدام MSW</a></li>
<li><a href="#running-the-tests">تشغيل الاختبارات</a></li>
<li><a href="#conclusion">الخلاصة</a></li>
<li><a href="#additional-exercises">تمارين إضافية</a></li>
</ol>
<hr>
<h3 id="المقدمة">المقدمة <span class="content-anchor" id="introduction"></span></h3>
<p>في هذا الدليل سنبني تطبيق <strong>قائمة مهام</strong> باستخدام <strong>التطوير المدفوع بالاختبارات (TDD)</strong> مع <strong>React</strong> و<strong>Vitest</strong>، إطار اختبار JavaScript حديث. سيتفاعل التطبيق مع واجهة برمجة تطبيقات لجلب عناصر المهام وإضافتها وتحديثها وحذفها. سنحاكي واجهة برمجة التطبيقات باستخدام <strong>Mock Service Worker (MSW)</strong> لمحاكاة استجابات الخادم أثناء الاختبار.</p>
<p><strong>الأهداف:</strong></p>
<ul>
<li>تعلّم كيفية تطبيق التطوير المدفوع بالاختبارات في تطبيق React.</li>
<li>فهم كيفية كتابة اختبارات الوحدات واختبارات التكامل باستخدام Vitest وReact Testing Library.</li>
<li>استخدام MSW لمحاكاة تفاعلات واجهة برمجة التطبيقات في الاختبارات.</li>
<li>تطوير تطبيق قائمة مهام بمزايا مثل جلب المهام وإضافة مهام جديدة وتعليم المهام كمكتملة وحذف المهام.</li>
</ul>
<h3 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h3>
<ul>
<li>معرفة أساسية بـ JavaScript (صيغة ES6+) وReact.</li>
<li>إلمام بـ Node.js وnpm.</li>
<li>فهم مفاهيم اختبار الوحدات.</li>
<li>Node.js وnpm مثبّتان على جهازك.</li>
</ul>
<h3 id="تهيئة-المشروع">تهيئة المشروع <span class="content-anchor" id="project-setup"></span></h3>
<ol>
<li><strong>أنشئ تطبيق React جديدًا باستخدام Vite</strong> سنستخدم <strong>Vite</strong> لتهيئة تطبيق React بسرعة. <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> create</span><span style="color:#ECC48D"> vite@latest</span><span style="color:#ECC48D"> todo-app-tdd</span><span style="color:#82AAFF"> --</span><span style="color:#82AAFF"> --template</span><span style="color:#ECC48D"> react</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> todo-app-tdd</span></span></code></li>
<li><strong>ثبّت الاعتمادات</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span></span></code></li>
<li><strong>ثبّت Vitest والحزم ذات الصلة</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span><span style="color:#ECC48D"> @testing-library/react</span><span style="color:#ECC48D"> @testing-library/jest-dom</span><span style="color:#ECC48D"> jsdom</span><span style="color:#ECC48D"> msw</span></span></code> <code>vitest</code>: إطار الاختبار. <code>@testing-library/react</code>: أدوات مساعدة لاختبار مكوّنات React. <code>@testing-library/jest-dom</code>: مطابقات Jest مخصصة لـ DOM. <code>jsdom</code>: يحاكي بيئة متصفح لـ Node.js. <code>msw</code>: Mock Service Worker لمحاكاة واجهة برمجة التطبيقات.</li>
</ol>
<ul>
<li><code>vitest</code>: إطار الاختبار.</li>
<li><code>@testing-library/react</code>: أدوات مساعدة لاختبار مكوّنات React.</li>
<li><code>@testing-library/jest-dom</code>: مطابقات Jest مخصصة لـ DOM.</li>
<li><code>jsdom</code>: يحاكي بيئة متصفح لـ Node.js.</li>
<li><code>msw</code>: Mock Service Worker لمحاكاة واجهة برمجة التطبيقات.</li>
</ul>
<ol start="4">
<li><strong>بنية المشروع</strong> <code><span class="line"><span style="color:#D6DEEB">todo</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">app</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── node_modules</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── public</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── components</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── App</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">jsx</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── main</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">jsx</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── index</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">css</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── mocks</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vite</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">└── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code></li>
</ol>
<h3 id="فهم-التطوير-المدفوع-بالاختبارات">فهم التطوير المدفوع بالاختبارات <span class="content-anchor" id="understanding-test-driven-development"></span></h3>
<p><strong>التطوير المدفوع بالاختبارات (TDD)</strong> مقاربة لتطوير البرمجيات تقوم فيها بما يلي:</p>
<ol>
<li><strong>اكتب اختبارًا</strong>: اكتب اختبارًا للجزء التالي من الوظائف الذي تريد إضافته.</li>
<li><strong>شغّل الاختبار وشاهده يفشل</strong>: يضمن أن الاختبار يكتشف غياب الوظيفة.</li>
<li><strong>اكتب أقل شيفرة تجعل الاختبار ينجح</strong>: نفّذ شيفرة كافية فقط لجعل الاختبار ينجح.</li>
<li><strong>أعد الهيكلة</strong>: حسّن الشيفرة مع إبقاء الاختبارات ناجحة.</li>
<li><strong>كرّر</strong>: تابع مع الوظيفة التالية.</li>
</ol>
<p>غالبًا ما تُسمّى هذه الدورة <strong>الأحمر-الأخضر-إعادة الهيكلة</strong> (Red-Green-Refactor).</p>
<h3 id="تهيئة-react-مع-vitest">تهيئة React مع Vitest <span class="content-anchor" id="setting-up-react-with-vitest"></span></h3>
<ol>
<li><strong>هيّئ Vitest</strong> أنشئ ملف <code>vitest.config.js</code> في الدليل الجذر: <code><span class="line"><span style="color:#637777;font-style:italic">// vitest.config.js</span></span>
<span class="line"><span style="color:#C792EA;font-style:italic">import</span><span style="color:#D6DEEB"> { defineConfig } </span><span style="color:#C792EA;font-style:italic">from</span><span style="color:#D9F5DD"> '</span><span style="color:#ECC48D">vitest/config</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">;</span></span>
<span class="line"><span style="color:#C792EA;font-style:italic">import</span><span style="color:#D6DEEB"> react </span><span style="color:#C792EA;font-style:italic">from</span><span style="color:#D9F5DD"> '</span><span style="color:#ECC48D">@vitejs/plugin-react</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;font-style:italic">export</span><span style="color:#C792EA;font-style:italic"> default</span><span style="color:#82AAFF;font-style:italic"> defineConfig</span><span style="color:#D6DEEB">({</span></span>
<span class="line"><span style="color:#D6DEEB"> plugins: [</span><span style="color:#82AAFF;font-style:italic">react</span><span style="color:#D6DEEB">()],</span></span>
<span class="line"><span style="color:#D6DEEB"> test: {</span></span>
<span class="line"><span style="color:#D6DEEB"> globals: </span><span style="color:#FF5874">true</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#D6DEEB"> environment: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">jsdom</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#D6DEEB"> setupFiles: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">./tests/setupTests.js</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB">});</span></span></code></li>
<li><strong>أنشئ ملف تهيئة للاختبارات</strong> أنشئ <code>tests/setupTests.js</code> لإعداد أدوات الاختبار: <code><span class="line"><span style="color:#637777;font-style:italic">// tests/setupTests.js</span></span>
<span class="line"><span style="color:#C792EA;font-style:italic">import</span><span style="color:#D9F5DD"> '</span><span style="color:#ECC48D">@testing-library/jest-dom</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">;</span></span></code></li>
<li><strong>حدّث سكربتات <code>package.json</code></strong> <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;scripts&quot;</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;dev&quot;</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">vite</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;build&quot;</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">vite build</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;preview&quot;</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">vite preview</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;test&quot;</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">vitest</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;test:watch&quot;</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">vitest --watch</span><span style="color:#D9F5DD">&quot;</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> &quot;coverage&quot;</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">&quot;</span><span style="color:#C789D6">vitest run --coverage</span><span style="color:#D9F5DD">&quot;</span></span>
<span class="line"><span style="color:#D6DEEB"> }</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code></li>
</ol>
<h3 id="تصميم-تطبيق-قائمة-المهام">تصميم تطبيق قائمة المهام <span class="content-anchor" id="designing-the-to-do-list-application"></span></h3>
<p><strong>المزايا:</strong></p>
<ul>
<li>عرض قائمة من عناصر المهام المجلوبة من واجهة برمجة تطبيقات.</li>
<li>إضافة عنصر مهمة جديد.</li>
<li>تعليم عنصر مهمة كمكتمل.</li>
<li>حذف عنصر مهمة.</li>
</ul>
<p><strong>نقاط نهاية واجهة برمجة التطبيقات:</strong></p>
<ul>
<li><code>GET /api/todos</code>: جلب كل المهام.</li>
<li><code>POST /api/todos</code>: إضافة مهمة جديدة.</li>
<li><code>PUT /api/todos/:id</code>: تحديث مهمة.</li>
<li><code>DELETE /api/todos/:id</code>: حذف مهمة.</li>
</ul>
<h3 id="تنفيذ-التطبيق-بالتطوير-المدفوع-بالاختبارات">تنفيذ التطبيق بالتطوير المدفوع بالاختبارات <span class="content-anchor" id="implementing-the-application-with-tdd"></span></h3>
<h4>إنشاء مكوّن <code>ToDoList</code></h4>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>أنشئ <code>src/tests/ToDoList.test.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-comment">// src/tests/ToDoList.test.jsx</span>
<span class="hljs-keyword">import</span> { render, screen, waitFor } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { rest } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw&#x27;</span>;
<span class="hljs-keyword">import</span> { setupServer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw/node&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ToDoList</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../components/ToDoList&#x27;</span>;

<span class="hljs-keyword">const</span> mockTodos = [
  { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Buy groceries&#x27;</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Walk the dog&#x27;</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span> },
];

<span class="hljs-keyword">const</span> server = <span class="hljs-title function_">setupServer</span>(
  rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">json</span>(mockTodos));
  }),
);

<span class="hljs-title function_">beforeAll</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">listen</span>());
<span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">resetHandlers</span>());
<span class="hljs-title function_">afterAll</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">close</span>());

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;renders to-do items fetched from API&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ToDoList</span> /&gt;</span></span>);

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-regexp">/loading/i</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

  <span class="hljs-keyword">const</span> items = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findAllByRole</span>(<span class="hljs-string">&#x27;listitem&#x27;</span>);
  <span class="hljs-title function_">expect</span>(items).<span class="hljs-title function_">toHaveLength</span>(<span class="hljs-number">2</span>);
  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Buy groceries&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Walk the dog&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نُهيّئ خادم MSW لمحاكاة استجابة واجهة برمجة التطبيقات.</li>
<li>يتحقق الاختبار من ظهور مؤشر التحميل.</li>
<li>ينتظر تصيير عناصر المهام.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>يفشل الاختبار لأن مكوّن <code>ToDoList</code> غير موجود.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>أنشئ <code>src/components/ToDoList.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-comment">// src/components/ToDoList.jsx</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ToDoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-title function_">setTodos</span>(data);
        <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
      });
  }, []);

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading…<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
          {todo.title} {todo.completed ? &#x27;(Completed)&#x27; : &#x27;&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن ينجح الاختبار.</p>
<h5>الخطوة 5: أعد الهيكلة (إن لزم)</h5>
<p>لا حاجة إلى إعادة هيكلة فورية.</p>
<h4>جلب المهام من واجهة برمجة تطبيقات <span class="content-anchor" id="fetching-to-dos-from-an-api"></span></h4>
<p>سبق أن نفّذنا جلب المهام في الخطوة السابقة.</p>
<h4>إضافة مهمة جديدة <span class="content-anchor" id="adding-a-new-to-do"></span></h4>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>حدّث <code>src/tests/ToDoList.test.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-keyword">import</span> userEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/user-event&#x27;</span>;

<span class="hljs-comment">// … previous imports and setup …</span>

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds a new to-do item&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ToDoList</span> /&gt;</span></span>);

  <span class="hljs-keyword">const</span> input = screen.<span class="hljs-title function_">getByPlaceholderText</span>(<span class="hljs-string">&#x27;Add new to-do&#x27;</span>);
  <span class="hljs-keyword">const</span> addButton = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/add/i</span> });

  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">type</span>(input, <span class="hljs-string">&#x27;Learn TDD&#x27;</span>);
  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">click</span>(addButton);

  <span class="hljs-comment">// Mock the POST request</span>
  server.<span class="hljs-title function_">use</span>(
    rest.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>), ctx.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Learn TDD&#x27;</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span> }));
    })
  );

  <span class="hljs-comment">// Mock the updated GET request</span>
  server.<span class="hljs-title function_">use</span>(
    rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">json</span>([…mockTodos, { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Learn TDD&#x27;</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span> }]));
    })
  );

  <span class="hljs-keyword">const</span> newItem = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findByText</span>(<span class="hljs-string">&#x27;Learn TDD&#x27;</span>);
  <span class="hljs-title function_">expect</span>(newItem).<span class="hljs-title function_">toBeInTheDocument</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نحاكي الكتابة في المُدخل والنقر على زر الإضافة.</li>
<li>نحاكي طلب POST وطلب GET التالي ليشمل العنصر الجديد.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>يفشل الاختبار لأن المُدخل والزر غير موجودين.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>حدّث <code>src/components/ToDoList.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ToDoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [newTodo, setNewTodo] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchTodos</span>();
  }, []);

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchTodos</span>(<span class="hljs-params"></span>) {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
        <span class="hljs-title function_">setTodos</span>(data);
        <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
      });
  }

  <span class="hljs-keyword">function</span> <span class="hljs-title function_">addTodo</span>(<span class="hljs-params"></span>) {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ <span class="hljs-attr">title</span>: newTodo }),
    }).<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setNewTodo</span>(<span class="hljs-string">&#x27;&#x27;</span>);
      <span class="hljs-title function_">fetchTodos</span>();
    });
  }

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading…<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Add new to-do&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{newTodo}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setNewTodo(e.target.value)}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{addTodo}</span>&gt;</span>Add<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            {todo.title} {todo.completed ? &#x27;(Completed)&#x27; : &#x27;&#x27;}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن ينجح الاختبار.</p>
<h5>الخطوة 5: أعد الهيكلة (إن لزم)</h5>
<p>فكّر في معالجة الأخطاء وتحسين تحديثات الحالة.</p>
<h4>تعليم مهمة كمكتملة <span class="content-anchor" id="marking-a-to-do-as-completed"></span></h4>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>حدّث <code>src/tests/ToDoList.test.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;marks a to-do item as completed&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ToDoList</span> /&gt;</span></span>);

  <span class="hljs-keyword">const</span> itemCheckbox = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findByRole</span>(<span class="hljs-string">&#x27;checkbox&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Buy groceries&#x27;</span> });
  <span class="hljs-title function_">expect</span>(itemCheckbox).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBeChecked</span>();

  <span class="hljs-comment">// Mock the PUT request</span>
  server.<span class="hljs-title function_">use</span>(
    rest.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;/api/todos/1&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Buy groceries&#x27;</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span> }));
    }),
  );

  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">click</span>(itemCheckbox);

  <span class="hljs-title function_">expect</span>(itemCheckbox).<span class="hljs-title function_">toBeChecked</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نجد مربع الاختيار المرتبط بعنصر المهمة.</li>
<li>نحاكي طلب PUT لتحديث عنصر المهمة.</li>
<li>نحاكي النقر على مربع الاختيار ونتحقق من أنه محدّد.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>يفشل الاختبار لأن مربع الاختيار غير موجود.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>حدّث <code>src/components/ToDoList.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">toggleComplete</span>(<span class="hljs-params">todo</span>) {
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/todos/<span class="hljs-subst">\${todo.id}</span>\`</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PUT&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ …todo, <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> }),
  }).<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchTodos</span>();
  });
}

<span class="hljs-comment">// … in the return statement …</span>

&lt;ul&gt;
  {todos.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
          <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleComplete(todo)}
          aria-label={todo.title}
        /&gt;
        {todo.title}
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  ))}
&lt;/ul&gt;
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن ينجح الاختبار.</p>
<h5>الخطوة 5: أعد الهيكلة (إن لزم)</h5>
<p>حسّن <code>fetchTodos</code> لتجنّب طلبات الشبكة غير الضرورية.</p>
<h4>حذف مهمة <span class="content-anchor" id="deleting-a-to-do"></span></h4>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>حدّث <code>src/tests/ToDoList.test.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;deletes a to-do item&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ToDoList</span> /&gt;</span></span>);

  <span class="hljs-keyword">const</span> deleteButton = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Delete Buy groceries&#x27;</span> });

  <span class="hljs-comment">// Mock the DELETE request</span>
  server.<span class="hljs-title function_">use</span>(
    rest.<span class="hljs-title function_">delete</span>(<span class="hljs-string">&#x27;/api/todos/1&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>));
    })
  );

  <span class="hljs-comment">// Mock the updated GET request</span>
  server.<span class="hljs-title function_">use</span>(
    rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/todos&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">json</span>(mockTodos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">id</span> !== <span class="hljs-number">1</span>)));
    })
  );

  <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">click</span>(deleteButton);

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">queryByText</span>(<span class="hljs-string">&#x27;Buy groceries&#x27;</span>)).<span class="hljs-property">not</span> <span class="hljs-title function_">toBeInTheDocument</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نحدّد زر الحذف لعنصر مهمة معيّن.</li>
<li>نحاكي طلب <code>DELETE</code> وطلب <code>GET</code> التالي.</li>
<li>بعد النقر على الحذف، نتحقق من أن العنصر المحذوف لم يعد مُصيَّرًا.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>يفشل الاختبار لأن المكوّن لا يصيّر زر حذف بعد.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>حدّث <code>src/components/ToDoList.jsx</code>:</p>
<pre><code class="language-jsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">deleteTodo</span>(<span class="hljs-params">id</span>) {
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/todos/<span class="hljs-subst">\${id}</span>\`</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;DELETE&#x27;</span>,
  }).<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchTodos</span>();
  });
}

<span class="hljs-comment">// … in the return statement …</span>

&lt;ul&gt;
  {todos.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
          <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleComplete(todo)}
          aria-label={todo.title}
        /&gt;
        {todo.title}
      <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> deleteTodo(todo.id)} aria-label={\`Delete \${todo.title}\`}&gt;
        Delete
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  ))}
&lt;/ul&gt;;
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن ينجح الاختبار.</p>
<h5>الخطوة 5: أعد الهيكلة (إن لزم)</h5>
<p>فكّر في استخراج استدعاءات واجهة برمجة التطبيقات إلى وحدة خدمة صغيرة إن بدأ المكوّن يتولّى مسؤوليات كثيرة.</p>
<h3 id="محاكاة-واجهة-برمجة-التطبيقات-باستخدام-msw">محاكاة واجهة برمجة التطبيقات باستخدام MSW <span class="content-anchor" id="mocking-the-api-with-msw"></span></h3>
<p>يتيح لك <strong>Mock Service Worker (MSW)</strong> اختبار المكوّن في مواجهة سلوك شبكي واقعي دون تغيير شيفرة الإنتاج. استخدمنا في هذا الدليل:</p>
<ul>
<li><code>setupServer</code> من <code>msw/node</code> لاعتراض الطلبات في بيئة الاختبار.</li>
<li><code>server.use(...)</code> لتجاوز المعالجات في حالة اختبار واحدة.</li>
<li>معالجات <code>GET</code> و<code>POST</code> و<code>PUT</code> و<code>DELETE</code> مُحاكاة لمحاكاة سير عمل المهام الكامل.</li>
</ul>
<p>يمنحك ذلك ثقة بأن واجهة المستخدم تتصرف بشكل صحيح عبر حالات التحميل والإنشاء والتحديث والحذف مع إبقاء الاختبارات حتمية.</p>
<h3 id="تشغيل-الاختبارات">تشغيل الاختبارات <span class="content-anchor" id="running-the-tests"></span></h3>
<p>شغّل كل الاختبارات بالأمر:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>سينفّذ Vitest مجموعة الاختبارات، ويمكنك استخدام <code>npm run test -- --watch</code> أثناء التكرار خلال التطوير.</p>
<h3 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h3>
<p>باتباع مبادئ التطوير المدفوع بالاختبارات، بنينا تطبيق مهام React كاملًا سلوكًا واحدًا في كل مرة. قاد كل اختبار جزءًا محدّدًا من الوظائف، من تحميل البيانات الأولية إلى إضافة المهام وتحديثها وحذفها.</p>
<p><strong>الخلاصات الرئيسية:</strong></p>
<ul>
<li><strong>TDD يبقي النطاق مركّزًا:</strong> منحنا كل اختبار فاشل سلوكًا واحدًا ملموسًا لتنفيذه.</li>
<li><strong>Vitest يعمل جيدًا مع تطبيقات React:</strong> يوفر تغذية راجعة سريعة ويتكامل بنظافة مع Testing Library.</li>
<li><strong>MSW يجعل اختبارات واجهة المستخدم الشبكية عملية:</strong> يمكنك اختبار تدفقات طلبات واقعية دون الاعتماد على واجهة برمجة تطبيقات حيّة.</li>
</ul>
<div class="exercises"><h3 id="تمارين-إضافية">تمارين إضافية <span class="content-anchor" id="additional-exercises"></span></h3>
<p>لتوسيع هذا المشروع والاستمرار في تدريب مهاراتك في الاختبار، جرّب إضافة:</p>
<ol>
<li><strong>التصفية</strong> أضف مرشّحات لكل المهام والنشطة والمكتملة. اكتب اختبارات للتحقق من ظهور المهام الصحيحة في كل عرض.</li>
</ol>
<ul>
<li>أضف مرشّحات لكل المهام والنشطة والمكتملة.</li>
<li>اكتب اختبارات للتحقق من ظهور المهام الصحيحة في كل عرض.</li>
</ul>
<ol start="2">
<li><strong>تحرير المهام الموجودة</strong> اسمح للمستخدمين بإعادة تسمية مهمة في مكانها. اكتب اختبارات لسلوك الحفظ والإلغاء.</li>
</ol>
<ul>
<li>اسمح للمستخدمين بإعادة تسمية مهمة في مكانها.</li>
<li>اكتب اختبارات لسلوك الحفظ والإلغاء.</li>
</ul>
<ol start="3">
<li><strong>معالجة الأخطاء</strong> اعرض رسالة خطأ عندما يفشل طلب إلى واجهة برمجة التطبيقات. اكتب اختبارات لطلبات <code>GET</code> و<code>POST</code> و<code>PUT</code> و<code>DELETE</code> الفاشلة.</li>
</ol>
<ul>
<li>اعرض رسالة خطأ عندما يفشل طلب إلى واجهة برمجة التطبيقات.</li>
<li>اكتب اختبارات لطلبات <code>GET</code> و<code>POST</code> و<code>PUT</code> و<code>DELETE</code> الفاشلة.</li>
</ul>
<ol start="4">
<li><strong>التحديثات المتفائلة</strong> حدّث واجهة المستخدم قبل اكتمال رحلة الشبكة. اكتب اختبارات تؤكد أن واجهة المستخدم تتراجع بشكل صحيح عند الفشل.</li>
</ol>
<ul>
<li>حدّث واجهة المستخدم قبل اكتمال رحلة الشبكة.</li>
<li>اكتب اختبارات تؤكد أن واجهة المستخدم تتراجع بشكل صحيح عند الفشل.</li>
</ul>
<ol start="5">
<li><strong>الاستمرارية</strong> احفظ القائمة محليًا باستخدام <code>localStorage</code> أو اربطها بخادم حقيقي. اكتب اختبارات تتحقق من استعادة المهام بشكل صحيح.</li>
</ol>
<ul>
<li>احفظ القائمة محليًا باستخدام <code>localStorage</code> أو اربطها بخادم حقيقي.</li>
<li>اكتب اختبارات تتحقق من استعادة المهام بشكل صحيح.</li>
</ul>
<ol start="6">
<li><strong>تحسينات إمكانية الوصول</strong> حسّن دعم لوحة المفاتيح وتغذية قارئ الشاشة الراجعة. أضف اختبارات تتحقق من الأسماء والحالات المتاحة.</li>
</ol>
<ul>
<li>حسّن دعم لوحة المفاتيح وتغذية قارئ الشاشة الراجعة.</li>
<li>أضف اختبارات تتحقق من الأسماء والحالات المتاحة.</li>
</ul>
<ol start="7">
<li><strong>البحث</strong> أضف حقل بحث لتصفية المهام حسب النص. اكتب اختبارات تؤكد أن المطابقات الجزئية تتصرف بشكل صحيح.</li>
</ol>
<ul>
<li>أضف حقل بحث لتصفية المهام حسب النص.</li>
<li>اكتب اختبارات تؤكد أن المطابقات الجزئية تتصرف بشكل صحيح.</li>
</ul>
<ol start="8">
<li><strong>الإجراءات الجماعية</strong> أضف عناصر تحكم لإكمال أو حذف عدة مهام دفعة واحدة. اكتب اختبارات لحالات الاختيار المختلطة والتحديثات الدفعية.</li>
</ol>
<ul>
<li>أضف عناصر تحكم لإكمال أو حذف عدة مهام دفعة واحدة.</li>
<li>اكتب اختبارات لحالات الاختيار المختلطة والتحديثات الدفعية.</li>
</ul>
</div>`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,e as html,l as slug,t as title};
