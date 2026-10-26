const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="code-coverage",t="تغطية الشيفرة (Code Coverage)",p=[{depth:2,id:"ما-هي-تغطية-الشيفرة",text:"ما هي تغطية الشيفرة؟"},{depth:2,id:"لماذا-تستخدم-تغطية-الشيفرة",text:"لماذا تستخدم تغطية الشيفرة؟"},{depth:2,id:"تثبيت-أداة-تغطية-الشيفرة",text:"تثبيت أداة تغطية الشيفرة"},{depth:2,id:"تشغيل-أداة-تغطية-الشيفرة",text:"تشغيل أداة تغطية الشيفرة"},{depth:2,id:"تجاهل-الأسطر",text:"تجاهل الأسطر"},{depth:2,id:"تهيئة-تقرير-تغطيتك",text:"تهيئة تقرير تغطيتك"},{depth:3,id:"تفسير-تقارير-التغطية",text:"تفسير تقارير التغطية"},{depth:3,id:"مزالق-شائعة-وكيفية-تجنبها",text:"مزالق شائعة وكيفية تجنبها"},{depth:3,id:"أمثلة-عملية",text:"أمثلة عملية"},{depth:3,id:"دمج-التغطية-مع-التكامل-المستمر",text:"دمج التغطية مع التكامل المستمر"},{depth:3,id:"الخلاصة",text:"الخلاصة"},{depth:3,id:"موارد-إضافية",text:"موارد إضافية"}],e=`<p>تغطية الشيفرة مفيدة لتحديد مقدار ما تغطيه اختباراتك من شيفرتك (أو <em>لا</em> تغطيه). قد يكون ذلك مفيدًا لتحديد النقاط العمياء والحالات الطرفية المحتملة غير المغطاة بمجموعة اختباراتك.</p>
<p><strong>كلمة تحذير</strong>: <a href="https://stevekinney.com/courses/testing/you-dont-need-perfect-code-coverage">السعي إلى تغطية 100%</a> — أو الأسوأ <em>فرضها</em> — ليس أفضل استخدام لوقتك وانتباهك:</p>
<ol>
<li>فكّر في مبدأ 80/20، فذلك الجزء الأخير الصغير من التغطية عادةً عمل أكثر بكثير من معظمها. وبصراحة، يمكنك الوصول إلى نقطة العوائد المتناقصة بسرعة. ربما تكون أفضل حالًا باختبار تكامل؟</li>
<li>وبالحديث عن اختبارات التكامل: من النادر أن تأخذ أي أداة تغطية شيفرة نظرة شاملة إلى تطبيقك وشيفرته. عادةً، تستطيع إخبارك بالتغطية التي يوفرها نوع واحد من الاختبارات — عادةً اختبارات وحداتك. وهذا يعني أن شيفرتك <em>قد</em> تكون مغطاة جيدًا بنوع آخر من الاختبارات — أو حتى بنظام أنواعك.</li>
</ol>
<p>أتردد في فرض رقم محدد. إن فعلت، فأبقِه منخفضًا. بالتأكيد، سأقول إن أقل من 60% يعني أنه يحسن بك أن تولي بعض الانتباه لاختباراتك. بدلًا من ذلك، يمكنك اختيار مراقبة أن تغييرًا معينًا لا يقلل بشكل جذري من مقدار تغطية الشيفرة.</p>
<p>بالنسبة لي، أكبر ميزة هي المساعدة أثناء عملي على دالة أو ميزة جديدة. تتيح لي تغطية الشيفرة رؤية أين ما زلت بحاجة إلى إضافة اختبارات، وتمنحني نظرة عالية المستوى أثناء عملي على شيء جديد.</p>
<h2 id="ما-هي-تغطية-الشيفرة">ما هي تغطية الشيفرة؟</h2>
<p>تحدد تغطية الشيفرة كميًا مقدار الشيفرة المنفذة أثناء الاختبارات المؤتمتة. توفر رؤى حول:</p>
<ul>
<li><strong>تغطية العبارات</strong>: نسبة العبارات المنفذة.</li>
<li><strong>تغطية الفروع</strong>: نسبة فروع تدفق التحكم المنفذة (مثل كتل <code>if</code>/<code>else</code>).</li>
<li><strong>تغطية الدوال</strong>: نسبة الدوال أو التوابع المنفذة.</li>
<li><strong>تغطية الأسطر</strong>: نسبة الأسطر المنفذة في الشيفرة المصدرية.</li>
</ul>
<h2 id="لماذا-تستخدم-تغطية-الشيفرة">لماذا تستخدم تغطية الشيفرة؟</h2>
<ul>
<li><strong>تحديد الشيفرة غير المختبَرة</strong>: يبرز مناطق قاعدة الشيفرة غير المغطاة بالاختبارات.</li>
<li><strong>تحسين جودة الاختبار</strong>: يشجع على كتابة اختبارات شاملة.</li>
<li><strong>الحفاظ على صحة الشيفرة</strong>: يساعد في منع الانحدارات بضمان اختبار مسارات الشيفرة الحرجة.</li>
<li><strong>مقياس للتقدم</strong>: يعمل كمؤشر قابل للقياس على جهود الاختبار.</li>
</ul>
<h2 id="تثبيت-أداة-تغطية-الشيفرة">تثبيت أداة تغطية الشيفرة</h2>
<p>إذا <em>لم</em> يكن لديك مُبلّغ تغطية مثبّت، فسيطلب منك Vitest تثبيت الاعتمادية.</p>
<pre><code>&gt; vitest exercise.test.ts --coverage

 MISSING DEP  Can not find dependency '@vitest/coverage-c8'

✔ Do you want to install @vitest/coverage-c8? … yes
</code></pre>
<h2 id="تشغيل-أداة-تغطية-الشيفرة">تشغيل أداة تغطية الشيفرة</h2>
<p>يمكنك فعل ذلك عبر:</p>
<pre><code class="language-typescript">npm test -- --coverage
npx vitest --coverage
</code></pre>
<p>من المحتمل أن تحصل على دليل <code>./coverage</code> جديد. اذهب وألقِ نظرة. يمكنك إطلاق خادم ويب سريع باستخدام:</p>
<pre><code class="language-typescript">vite preview  --outDir coverage
</code></pre>
<p>سيتيح لك ذلك رؤية أين <em>لا</em> تُختبَر شيفرتك. (المصدر: <a href="https://github.com/bcoe/c8#ignoring-uncovered-lines-functions-and-blocks">توثيق c8</a>.)</p>
<h2 id="تجاهل-الأسطر">تجاهل الأسطر</h2>
<p>يمكنك استبعاد أسطر من تقرير تغطيتك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> something = <span class="hljs-string">&#x27;lol&#x27;</span>;
<span class="hljs-comment">/* c8 ignore next */</span>
<span class="hljs-keyword">if</span> (process.<span class="hljs-property">platform</span> === <span class="hljs-string">&#x27;win32&#x27;</span>) <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;hello world&#x27;</span>);

<span class="hljs-comment">/* c8 ignore next 3 */</span>
<span class="hljs-keyword">if</span> (process.<span class="hljs-property">platform</span> === <span class="hljs-string">&#x27;darwin&#x27;</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;hello world&#x27;</span>);
}

<span class="hljs-comment">/* c8 ignore start */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">dontMindMe</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ...</span>
}
<span class="hljs-comment">/* c8 ignore stop */</span>
</code></pre>
<h2 id="تهيئة-تقرير-تغطيتك">تهيئة تقرير تغطيتك</h2>
<p>يمكنك إضافة مفتاح <code>coverage</code> إلى تهيئة <code>test</code> في <code>vitest.config.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;
<span class="hljs-keyword">import</span> { defineConfig, defaultExclude } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;
<span class="hljs-keyword">import</span> configuration <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./vite.config&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  ...configuration,
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {
      ...configuration?.<span class="hljs-property">resolve</span>?.<span class="hljs-property">alias</span>,
      <span class="hljs-attr">test</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;./test&#x27;</span>),
    },
  },
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">globals</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">setupFiles</span>: path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;test/setup.ts&#x27;</span>),
    <span class="hljs-attr">exclude</span>: [...defaultExclude, <span class="hljs-string">&#x27;**/*.svelte**&#x27;</span>],
    <span class="hljs-attr">environmentMatchGlobs</span>: [
      [<span class="hljs-string">&#x27;**/*.test.tsx&#x27;</span>, <span class="hljs-string">&#x27;jsdom&#x27;</span>],
      [<span class="hljs-string">&#x27;**/*.component.test.ts&#x27;</span>, <span class="hljs-string">&#x27;jsdom&#x27;</span>],
    ],
    <span class="hljs-attr">coverage</span>: {
      <span class="hljs-attr">include</span>: [<span class="hljs-string">&#x27;src/**/*&#x27;</span>],
      <span class="hljs-attr">exclude</span>: [
        <span class="hljs-string">&#x27;test/**&#x27;</span>,
        <span class="hljs-string">&#x27;vite.*.ts&#x27;</span>,
        <span class="hljs-string">&#x27;**/*.d.ts&#x27;</span>,
        <span class="hljs-string">&#x27;**/*.test.{ts,tsx,js,jsx}&#x27;</span>,
        <span class="hljs-string">&#x27;**/*.config.*&#x27;</span>,
        <span class="hljs-string">&#x27;**/snapshot-tests/**&#x27;</span>,
        <span class="hljs-string">&#x27;**/*.solution.tsx&#x27;</span>,
        <span class="hljs-string">&#x27;**/coverage/**&#x27;</span>,
      ],
      <span class="hljs-attr">all</span>: <span class="hljs-literal">true</span>,
    },
  },
});
</code></pre>
<p>يمكنك رؤية كل الخيارات <a href="https://github.com/bcoe/c8#cli-options--configuration">هنا</a>.</p>
<p>الشيء الرائع هنا هو القدرة على تعيين حدود يفشل عندها بناؤك إذا نزلت تحت مقدار معين.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;statements&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">54.92</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;thresholdAutoUpdate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span> <span class="hljs-punctuation">}</span>
</code></pre>
<p>ستمنعك هذه الخيارات من الانخفاض على الأقل، وإذا ارتفعت، فستعين ذلك كخط الأساس الجديد.</p>
<h3 id="تفسير-تقارير-التغطية">تفسير تقارير التغطية</h3>
<p>يولّد Vitest تقارير تغطية بالتنسيقات المحددة. تشمل المبلّغات الشائعة الاستخدام:</p>
<ul>
<li><strong>نص</strong>: يخرج ملخص التغطية إلى الطرفية.</li>
<li><strong>HTML</strong>: يولّد تقرير HTML تفاعليًا.</li>
<li><strong>LCOV</strong>: ينتج ملف <code>lcov.info</code>، وهو مفيد للتكامل مع خدمات التغطية.</li>
</ul>
<h4>مثال مخرجات الطرفية</h4>
<pre><code class="language-bash">---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line <span class="hljs-comment">#s</span>
---------------|---------|----------|---------|---------|-------------------
All files      |    85.7 |    66.66 |      80 |    85.7 |
 src           |     100 |      100 |     100 |     100 |
  math.js      |     100 |      100 |     100 |     100 |
 src/utils     |   66.66 |       50 |      50 |   66.66 |
  helper.js    |   66.66 |       50 |      50 |   66.66 | 12-14
---------------|---------|----------|---------|---------|-------------------
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><strong>% Stmts</strong>: نسبة العبارات المنفذة.</li>
<li><strong>% Branch</strong>: نسبة الفروع المنفذة.</li>
<li><strong>% Funcs</strong>: نسبة الدوال المنفذة.</li>
<li><strong>% Lines</strong>: نسبة الأسطر المنفذة.</li>
<li><strong>Uncovered Line #s</strong>: الأسطر التي لم تُنفَّذ أثناء الاختبارات.</li>
</ul>
<h5>تقرير HTML</h5>
<p>يُولَّد تقرير HTML في دليل <code>coverage</code> افتراضيًا. افتح <code>coverage/index.html</code> في متصفحك لعرضه.</p>
<p><strong>الميزات:</strong></p>
<ul>
<li><strong>تنقل تفاعلي</strong>: تصفح تفاصيل التغطية لكل ملف.</li>
<li><strong>شيفرة مظللة</strong>: انظر أي الأسطر مغطاة (أخضر) وأيها غير مغطاة (أحمر).</li>
<li><strong>مقاييس مفصلة</strong>: يوفر معلومات تغطية سطرًا بسطر.</li>
</ul>
<h4>أفضل الممارسات لتغطية الشيفرة</h4>
<h5>استهدف تغطية ذات معنى، لا مجرد نسب عالية</h5>
<ul>
<li><strong>الجودة قبل الكمية</strong>: التغطية العالية لا تضمن اختبارات جيدة. ركّز على كتابة اختبارات ذات معنى تغطي مسارات الشيفرة الحرجة.</li>
<li><strong>تجنب التغطية لأجل التغطية</strong>: لا تكتب اختبارات سطحية فقط لزيادة أرقام التغطية.</li>
</ul>
<h5>حدد الشيفرة الحرجة ورتّب أولوياتها</h5>
<ul>
<li><strong>الوظائف الأساسية</strong>: تأكد من اختبار الدوال الأساسية ومنطق العمل اختبارًا شاملًا.</li>
<li><strong>الحالات الطرفية</strong>: اكتب اختبارات لشروط الحدود ومسارات معالجة الأخطاء.</li>
</ul>
<h5>استبعد الشيفرة المولّدة أو الخارجية</h5>
<ul>
<li><strong>ملفات التهيئة</strong>: استبعد ملفات مثل ملفات التهيئة أو الإعداد التي لا تحتاج إلى اختبار.</li>
<li><strong>مكتبات خارجية</strong>: استبعد <code>node_modules</code> أو أي شيفرة خارجية أخرى من التغطية.</li>
</ul>
<p><strong>مثال: الاستبعاد في التهيئة</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// vitest.config.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">coverage</span>: {
      <span class="hljs-attr">exclude</span>: [<span class="hljs-string">&#x27;node_modules&#x27;</span>, <span class="hljs-string">&#x27;src/setupTests.js&#x27;</span>],
    },
  },
});
</code></pre>
<h4>راجع تقارير التغطية بانتظام</h4>
<ul>
<li><strong>حدد الفجوات</strong>: استخدم التقارير للعثور على مناطق الشيفرة غير المختبَرة.</li>
<li><strong>أعد هيكلة الاختبارات</strong>: حسّن الاختبارات الحالية لتغطية الفروع أو العبارات المفقودة.</li>
</ul>
<h4>ادمج التغطية في التكامل المستمر (CI)</h4>
<ul>
<li><strong>أتمتة تقارير التغطية</strong>: شغّل تحليل التغطية كجزء من خط أنابيب CI لديك.</li>
<li><strong>عيّن حدود التغطية</strong>: أفشل البناء إذا انخفضت التغطية تحت نسبة معينة.</li>
</ul>
<p><strong>مثال: تعيين حدود التغطية</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// vitest.config.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">coverage</span>: {
      <span class="hljs-attr">statements</span>: <span class="hljs-number">80</span>,
      <span class="hljs-attr">branches</span>: <span class="hljs-number">75</span>,
      <span class="hljs-attr">functions</span>: <span class="hljs-number">80</span>,
      <span class="hljs-attr">lines</span>: <span class="hljs-number">80</span>,
    },
  },
});
</code></pre>
<h4>استخدم شارات التغطية في التوثيق</h4>
<ul>
<li><strong>الظهور</strong>: اعرض حالة التغطية في ملف README لمشروعك.</li>
<li><strong>التحفيز</strong>: يشجع المساهمين على الحفاظ على التغطية أو تحسينها.</li>
</ul>
<h3 id="مزالق-شائعة-وكيفية-تجنبها">مزالق شائعة وكيفية تجنبها</h3>
<h4>إساءة تفسير مقاييس التغطية</h4>
<p><strong>المشكلة</strong>: افتراض أن تغطية 100% تعني عدم وجود أخطاء.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>افهم أن مقاييس التغطية تشير إلى الشيفرة المنفذة، لا إلى ما إذا كانت الشيفرة تتصرف بشكل صحيح.</li>
<li>ركّز على كتابة اختبارات ذات معنى تتحقق من السلوك الصحيح.</li>
</ul>
<h4>إغفال الفروع غير المغطاة</h4>
<p><strong>المشكلة</strong>: غياب التغطية للفروع الشرطية.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>افحص تغطية الفروع لتحديد شروط <code>if</code>/<code>else</code> غير المختبَرة.</li>
<li>اكتب اختبارات تغطي مسارات منطقية مختلفة.</li>
</ul>
<h4>تجاهل اختبارات التكامل ومن طرف إلى طرف</h4>
<p><strong>المشكلة</strong>: الاعتماد على اختبارات الوحدات وحدها للتغطية.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>ضمّن اختبارات التكامل ومن طرف إلى طرف لتغطية التفاعلات بين المكوّنات.</li>
<li>استخدم أدوات مثل <strong>Playwright</strong> لاختبار من طرف إلى طرف.</li>
</ul>
<h4>تضمين ملفات غير ضرورية</h4>
<p><strong>المشكلة</strong>: تتضمن تقارير التغطية ملفات ينبغي استبعادها، ما يشوّه المقاييس.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>استخدم أنماط <code>include</code> و<code>exclude</code> في تهيئتك للتركيز على الملفات ذات الصلة.</li>
</ul>
<h4>عدم التنظيف قبل تشغيلات التغطية</h4>
<p><strong>المشكلة</strong>: تبقى بيانات تغطية قديمة، ما يسبب تقارير غير دقيقة.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>تأكد من تنظيف دليل التغطية قبل توليد تقارير جديدة.</li>
<li>استخدم سكربتات لأتمتة التنظيف.</li>
</ul>
<h3 id="أمثلة-عملية">أمثلة عملية</h3>
<p>لننظر إلى مثالنا المبكر:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/math.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">a, b</span>) {
  <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">subtract</span>(<span class="hljs-params">a, b</span>) {
  <span class="hljs-keyword">return</span> a - b;
}
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// tests/math.test.js</span>
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { add, subtract } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/math&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;subtracts numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">subtract</span>(<span class="hljs-number">5</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
});
</code></pre>
<p>يمكنك تشغيل الاختبارات مع علم التغطية.</p>
<pre><code class="language-bash">npx vitest --coverage
</code></pre>
<ul>
<li>الدالتان <code>add</code> و<code>subtract</code> مغطاتان معًا.</li>
<li>ينبغي أن تكون التغطية 100% للعبارات والفروع والدوال والأسطر.</li>
</ul>
<h4>تحديد الشيفرة غير المغطاة</h4>
<pre><code class="language-javascript"><span class="hljs-comment">// src/utils/helper.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">name</span>) {
  <span class="hljs-keyword">if</span> (!name) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Hello, Stranger!&#x27;</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hello, <span class="hljs-subst">\${name}</span>!\`</span>;
}
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// tests/helper.test.js</span>
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { greet } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/utils/helper&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;greets a named person&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">greet</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Hello, Alice!&#x27;</span>);
});
</code></pre>
<ul>
<li>الحالة التي لا يُمرَّر فيها <code>name</code> غير مختبَرة.</li>
<li>سيعرض تقرير التغطية تغطية فروع غير كاملة.</li>
</ul>
<p>واصل وأضف اختبارًا للفرع المفقود.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;greets a stranger when no name is provided&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">greet</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Hello, Stranger!&#x27;</span>);
});
</code></pre>
<h3 id="دمج-التغطية-مع-التكامل-المستمر">دمج التغطية مع التكامل المستمر</h3>
<p>سنتحدث أكثر عن <a href="https://stevekinney.com/courses/testing/continuous-integration">التكامل المستمر</a>. لكنني سأترك هذا المثال عن كيفية تشغيل تقرير تغطية شيفرتك في GitHub Actions هنا للرجوع إليه.</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/ci.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">CI</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]
  <span class="hljs-attr">pull_request:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">build:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v2</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">install</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Run</span> <span class="hljs-string">tests</span> <span class="hljs-string">with</span> <span class="hljs-string">coverage</span>
        <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">vitest</span> <span class="hljs-string">--coverage</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">Upload</span> <span class="hljs-string">coverage</span> <span class="hljs-string">report</span>
        <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/upload-artifact@v2</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">name:</span> <span class="hljs-string">coverage-report</span>
          <span class="hljs-attr">path:</span> <span class="hljs-string">coverage</span>
</code></pre>
<ul>
<li>يشغّل سير العمل الاختبارات مع التغطية عند كل دفع أو طلب سحب.</li>
<li>تُرفع تقارير التغطية كعناصر أثرية للمراجعة.</li>
</ul>
<h3 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h3>
<p>أدوات تغطية الشيفرة مفيدة جدًا لمساعدتك على رؤية أين قد تنقصك تغطية الاختبارات، لكن لا ينبغي أن تطارد تغطية 100% لأجل التغطية نفسها. من المهم أن تكون معقولًا بشأن ما هو «جيد بما يكفي».</p>
<ul>
<li><strong>فعّل التغطية</strong>: استخدم علم <code>--coverage</code> أو هيّئها في <code>vitest.config.js</code>.</li>
<li><strong>فسّر التقارير</strong>: افهم تغطية العبارات والفروع والدوال والأسطر.</li>
<li><strong>استهدف تغطية ذات معنى</strong>: ركّز على كتابة اختبارات فعالة بدلًا من تحقيق نسب تغطية اعتباطية.</li>
<li><strong>استخدم أدوات التغطية</strong>: استفد من تقارير التغطية لتحديد الفجوات وتحسين الاختبارات.</li>
<li><strong>ادمج مع CI</strong>: أتمت تحليل التغطية في خط أنابيب التكامل المستمر لديك.</li>
<li><strong>استبعد الملفات غير ذات الصلة</strong>: هيّئ أنماط التضمين والاستبعاد للتركيز على الشيفرة ذات الصلة.</li>
</ul>
<h3 id="موارد-إضافية">موارد إضافية</h3>
<ul>
<li><strong>توثيق Vitest</strong>: <a href="https://vitest.dev/guide/coverage.html">دليل التغطية في Vitest</a></li>
<li><strong>أداة التغطية C8</strong>: <a href="https://www.npmjs.com/package/c8">c8 على npm</a></li>
<li><strong>فهم مقاييس تغطية الشيفرة</strong>: <a href="https://istanbul.js.org/docs/advanced/coverage-object/">توثيق Istanbul.js</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
