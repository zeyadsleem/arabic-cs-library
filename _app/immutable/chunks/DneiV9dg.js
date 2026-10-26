const s="kinney",n="testing",a="مدخل إلى الاختبارات",e="organizing-and-annotating-tests",t="تنظيم الاختبارات والتعليق عليها",c=[{depth:2,id:"describe",text:"describe"},{depth:3,id:"فوائد-استخدام-describe",text:"فوائد استخدام describe"},{depth:2,id:"الخطافات",text:"الخُطّافات"},{depth:2,id:"التعليقات-التوضيحية",text:"التعليقات التوضيحية"},{depth:3,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"الخلاصات-الأساسية",text:"الخلاصات الأساسية"}],l=`<p>ثمّة طريقتان أساسيتان لتنظيم اختباراتنا:</p>
<ol>
<li>يمكننا توزيعها على ملفات مختلفة.</li>
<li>يمكننا استخدام <code>describe</code> لإنشاء نوع من التجميع المنطقي.</li>
</ol>
<p>أحترمك أكثر من أن أشرح لك كيف تعمل الملفات، فلنركّز انتباهنا على البند الثاني.</p>
<h2 id="describe"><code>describe</code></h2>
<p>يمكنك تجميع مجموعة من الاختبارات في مجموعة واحدة باستخدام <code>describe</code>. وإن لم تستخدم <code>describe</code>، فكل الاختبارات في ملف معيّن تُجمع تلقائيًا في مجموعة واحدة.</p>
<p>يُستخدم هذا أساسًا لتنظيم اختباراتك. وهو مفيد لأنه يتيح لك تجاوز مجموعة اختبارات معيّنة أو عزلها.</p>
<pre><code class="language-typescript">✓ arithmetic.<span class="hljs-property">ts</span> (<span class="hljs-number">8</span>)
  ✓ <span class="hljs-title function_">add</span> (<span class="hljs-number">2</span>)
    ✓ should add two numbers correctly
    ✓ should not add two numbers incorrectly
  ✓ <span class="hljs-title function_">subtract</span> (<span class="hljs-number">2</span>)
    ✓ should subtract the subtrahend <span class="hljs-keyword">from</span> the minuend
    ✓ should not subtract two numbers incorrectly
  ✓ <span class="hljs-title function_">multiply</span> (<span class="hljs-number">2</span>)
    ✓ should multiply the multiplicand by the multiplier
    ✓ should not multiply two numbers incorrectly
  ✓ <span class="hljs-title function_">divide</span> (<span class="hljs-number">2</span>)
    ✓ should multiply the multiplicand by the multiplier
    ✓ should not multiply two numbers incorrectly
</code></pre>
<h3 id="فوائد-استخدام-describe">فوائد استخدام <code>describe</code></h3>
<ul>
<li><strong>قراءة أفضل</strong>: التجميع المنطقي يسهّل فهم ما يُختبر.</li>
<li><strong>تهيئة وتنظيف مشتركان</strong>: استخدم خُطّافات مثل <code>beforeEach</code> و<code>afterEach</code> داخل كتلة <code>describe</code> للتهيئة المشتركة.</li>
<li><strong>تنفيذ انتقائي</strong>: شغّل مجموعات اختبارات كاملة أو تجاوزها أثناء التطوير.</li>
<li><strong>تنظيم هرمي</strong>: اعكس بنية تطبيقك في اختباراتك.</li>
</ul>
<h2 id="الخطافات">الخُطّافات</h2>
<p>يتيح لك استخدام <code>describe</code> تمرير اسم إلى مجموعتك، وهذا مفيد عندما تُنقّح الأخطاء. كما يمنحك الوصول إلى بعض الخُطّافات المفيدة:</p>
<ul>
<li><code>beforeEach</code>: يعمل قبل كل اختبار من الاختبارات.</li>
<li><code>afterEach</code>: يعمل بعد كل اختبار من الاختبارات.</li>
<li><code>beforeAll</code>: يعمل في البداية تمامًا عند بدء المجموعة.</li>
<li><code>afterAll</code>: يعمل بعد اكتمال كل اختبارات المجموعة.</li>
</ul>
<p>سنتناول هذا أكثر قليلًا عندما نصل إلى <a href="https://stevekinney.com/courses/testing/setting-up-and-tearing-down-with-hooks">التهيئة والتنظيف باستخدام الخُطّافات</a>.</p>
<h2 id="التعليقات-التوضيحية">التعليقات التوضيحية</h2>
<p>هذه مشابهة تمامًا لما رأيناه مع اختباراتنا الفردية.</p>
<p>لدى <code>describe</code> أيضًا بعض التعليقات التوضيحية التي تضيف منطقًا حول متى ينبغي أن تعمل المجموعة:</p>
<ul>
<li><code>describe.skip</code>: تجاوز هذه المجموعة.</li>
<li><code>describe.skipIf</code>: تجاوز هذه المجموعة إن كانت القيمة المقدّمة صادقة.</li>
<li><code>describe.only</code>: شغّل هذه المجموعة فقط (وأي مجموعات أخرى تستخدم <code>.only</code> أيضًا بالطبع). على الأرجح <em>لا</em> تريد إيداع هذا سهوًا. ثق بي. إنه محرج.</li>
<li><code>describe.todo</code>: يضع علامة على مجموعة بأنها شيء ستنفّذه لاحقًا. هذا مفيد عندما تعرف أنواع الاختبارات التي ستحتاجها وتريد تتبّع كم بقي لديك.</li>
<li><code>describe.each</code>: يُستخدم لتوليد مجموعات متعددة بناءً على مجموعة من البيانات. يُغطى هذا أكثر في <a href="https://stevekinney.com/courses/testing/parameterizing-tests">توليد الاختبارات</a>.</li>
<li><code>describe.concurrent</code>: شغّل كل اختبارات هذه المجموعة بالتزامن. يُغطى هذا أكثر في <a href="https://stevekinney.com/courses/testing/parallelizing-tests">تشغيل الاختبارات بالتوازي</a>.</li>
<li><code>describe.shuffle</code>: شغّل هذه الاختبارات بترتيب عشوائي.</li>
</ul>
<p>يُغطى هذا أيضًا قليلًا في <a href="https://stevekinney.com/courses/testing/filtering-tests">ترشيح الاختبارات</a>.</p>
<h3 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h3>
<h4>جمّع الاختبارات حسب الوظيفة</h4>
<p>نظّم الاختبارات حول وظائف أو ميزات محددة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Math Utilities&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;multiplies numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });
});
</code></pre>
<h4>استخدم كتل <code>describe</code> المتداخلة للبنى المعقّدة</h4>
<p>بالنسبة للوحدات المعقّدة، يمكن للتداخل أن يعكس بنية التطبيق.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;User Module&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Authentication&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;successfully logs in with valid credentials&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Test code</span>
    });

    <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;fails to log in with invalid credentials&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Test code</span>
    });
  });

  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Profile Management&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;updates user profile&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Test code</span>
    });
  });
});
</code></pre>
<h4>اكتب أسماء واضحة ووصفية</h4>
<p>ينبغي أن تنصّ الأسماء بوضوح على ما يُختبر.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Array&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;push&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds an element to the end of the array&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Test code</span>
    });
  });
});
</code></pre>
<h4>استخدم الخُطّافات داخل كتل <code>describe</code></h4>
<p>استخدم <code>beforeEach</code> و<code>afterEach</code> و<code>beforeAll</code> و<code>afterAll</code> لإدارة التهيئة والتنظيف الخاصين بمجموعة اختبارات معيّنة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Database Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeAll</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Connect to database</span>
  });

  <span class="hljs-title function_">afterAll</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Disconnect from database</span>
  });

  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Seed database</span>
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;fetches a record successfully&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });
});
</code></pre>
<h4>أبقِ الاختبارات مركّزة ومستقلة</h4>
<p>ينبغي أن يركّز كل اختبار على جانب واحد، وأن تكون الاختبارات داخل كتلة <code>describe</code> مترابطة لكن مستقلة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;String Manipulation&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;converts string to uppercase&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;trims whitespace from string&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });
});
</code></pre>
<h4>تجنّب التداخل المفرط</h4>
<p>التداخل المفرط قد يجعل الاختبارات صعبة القراءة. أبقِ البنية مسطّحة قدر الإمكان مع الحفاظ على الوضوح. لا تندفع بعيدًا.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Instead of deeply nested describes</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Module A&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Component B&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Function C&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;performs action X&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// Test code</span>
      });
    });
  });
});

<span class="hljs-comment">// Prefer a flatter structure</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Component B - Function C&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;performs action X&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });
});
</code></pre>
<h4>استخدم <code>describe</code> للسياق المشترك</h4>
<p>جمّع الاختبارات التي تشترك في التهيئة نفسها أو السياق نفسه.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;When user is authenticated&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Mock authentication</span>
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;accesses protected route&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;sees personalized content&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });
});
</code></pre>
<h4>استخدم <code>describe.only</code> و<code>describe.skip</code> أثناء التطوير</h4>
<p>ركّز على مجموعات اختبارات محددة دون تشغيل مجموعة الاختبارات بأكملها.</p>
<ul>
<li><code>describe.only</code>: يشغّل المجموعة المحددة فقط.</li>
<li><code>describe.skip</code>: يتجاوز المجموعة المحددة.</li>
</ul>
<pre><code class="language-javascript">describe.<span class="hljs-title function_">only</span>(<span class="hljs-string">&#x27;Critical Functionality Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Tests to focus on</span>
});

describe.<span class="hljs-title function_">skip</span>(<span class="hljs-string">&#x27;Deprecated Functionality Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Tests to skip</span>
});
</code></pre>
<p>تذكّر إزالة <code>.only</code> و<code>.skip</code> قبل إنهاء شيفرتك لضمان تنفيذ كل الاختبارات.</p>
<h4>وثّق حالات الاختبار المعقّدة</h4>
<p>أضف تعليقات لشرح الاختبارات أو الإعدادات غير الواضحة داخل كتل <code>describe</code>.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Edge Cases for Date Parsing&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Tests for leap years and time zones</span>
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;correctly parses leap day&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test code</span>
  });
});
</code></pre>
<h3 id="الخلاصات-الأساسية">الخلاصات الأساسية</h3>
<ul>
<li><strong>التجميع المنطقي</strong>: استخدم <code>describe</code> لتجميع الاختبارات المترابطة، مما يعزّز الوضوح.</li>
<li><strong>تهيئة مشتركة</strong>: استخدم الخُطّافات داخل كتل <code>describe</code> للتهيئة والتنظيف الخاصين بمجموعة معيّنة.</li>
<li><strong>تسمية وصفية</strong>: الأسماء الواضحة لـ <code>describe</code> و<code>test</code> تحسّن القراءة.</li>
<li><strong>عزل الاختبارات</strong>: أبقِ الاختبارات مستقلة لتجنّب التفاعلات غير المقصودة.</li>
<li><strong>تجنّب الإفراط في التداخل</strong>: أبقِ البنية بسيطة للحفاظ على القراءة.</li>
<li><strong>اعكس بنية المشروع</strong>: نظّم ملفات الاختبار لتطابق تخطيط الشيفرة المصدرية.</li>
<li><strong>التركيز أثناء التطوير</strong>: استخدم <code>.only</code> و<code>.skip</code> لتبسيط عملية الاختبار.</li>
<li><strong>التوثيق</strong>: علّق على الاختبارات أو الإعدادات المعقّدة للرجوع إليها مستقبلًا.</li>
</ul>
`,p={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:c,html:l};export{s as book,n as chapter,a as chapterTitle,p as default,c as headings,l as html,e as slug,t as title};
