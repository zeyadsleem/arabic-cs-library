const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="guess-the-number-example",t="بناء لعبة «خمّن الرقم» باستخدام Vitest",e=[{depth:2,id:"بناء-لعبة-خمن-الرقم-باستخدام-التطوير-الموجه-بالاختبارات-مع-vitest",text:"بناء لعبة «خمّن الرقم» باستخدام التطوير الموجّه بالاختبارات مع Vitest"},{depth:3,id:"المقدمة",text:"المقدمة"},{depth:3,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:3,id:"إعداد-المشروع",text:"إعداد المشروع"},{depth:3,id:"فهم-التطوير-الموجه-بالاختبارات",text:"فهم التطوير الموجّه بالاختبارات"},{depth:3,id:"تهيئة-vitest",text:"تهيئة Vitest"},{depth:3,id:"تصميم-منطق-اللعبة",text:"تصميم منطق اللعبة"},{depth:3,id:"تنفيذ-منطق-اللعبة-باستخدام-tdd",text:"تنفيذ منطق اللعبة باستخدام TDD"},{depth:3,id:"تشغيل-الاختبارات",text:"تشغيل الاختبارات"},{depth:3,id:"الخاتمة",text:"الخاتمة"},{depth:3,id:"تمارين-إضافية",text:"تمارين إضافية"}],p=`<h2 id="بناء-لعبة-خمن-الرقم-باستخدام-التطوير-الموجه-بالاختبارات-مع-vitest">بناء لعبة «خمّن الرقم» باستخدام التطوير الموجّه بالاختبارات مع Vitest</h2>
<p><strong>جدول المحتويات</strong></p>
<ol>
<li><a href="#introduction">المقدمة</a></li>
<li><a href="#prerequisites">المتطلبات المسبقة</a></li>
<li><a href="#project-setup">إعداد المشروع</a></li>
<li><a href="#understanding-test-driven-development">فهم التطوير الموجّه بالاختبارات</a></li>
<li><a href="#setting-up-vitest">تهيئة Vitest</a></li>
<li><a href="#designing-the-game-logic">تصميم منطق اللعبة</a></li>
<li><a href="#implementing-the-game-logic-with-tdd">تنفيذ منطق اللعبة باستخدام TDD</a> <a href="#generating-a-random-number">1. توليد رقم عشوائي</a> <a href="#making-a-guess">2. إجراء تخمين</a> <a href="#providing-feedback">3. تقديم التغذية الراجعة</a> <a href="#tracking-attempts">4. تتبّع المحاولات</a> <a href="#handling-invalid-inputs">5. التعامل مع المدخلات غير الصالحة</a></li>
</ol>
<ul>
<li><a href="#generating-a-random-number">1. توليد رقم عشوائي</a></li>
<li><a href="#making-a-guess">2. إجراء تخمين</a></li>
<li><a href="#providing-feedback">3. تقديم التغذية الراجعة</a></li>
<li><a href="#tracking-attempts">4. تتبّع المحاولات</a></li>
<li><a href="#handling-invalid-inputs">5. التعامل مع المدخلات غير الصالحة</a></li>
</ul>
<ol start="8">
<li><a href="#running-the-tests">تشغيل الاختبارات</a></li>
<li><a href="#conclusion">الخاتمة</a></li>
<li><a href="#additional-exercises">تمارين إضافية</a></li>
</ol>
<hr>
<h3 id="المقدمة">المقدمة <span class="content-anchor" id="introduction"></span></h3>
<p>في هذا الدليل، سنبني لعبة بسيطة هي <strong>«خمّن الرقم»</strong> باستخدام <strong>التطوير الموجّه بالاختبارات (TDD)</strong> مع <strong>Vitest</strong>، إطار اختبارات JavaScript حديث. سيُطوَّر منطق اللعبة عبر اختبارات الوحدات دون أي واجهة مستخدم. سيساعدك هذا الأسلوب على التركيز على كتابة شيفرة نظيفة قابلة للاختبار وعلى فهم مبادئ TDD.</p>
<p><strong>الأهداف:</strong></p>
<ul>
<li>تعلّم كيفية تطبيق TDD لبناء لعبة.</li>
<li>فهم كيفية كتابة اختبارات الوحدات باستخدام Vitest.</li>
<li>تطوير منطق لعبة «خمّن الرقم».</li>
<li>كتابة اختبارات لوظائف متنوّعة، منها توليد الأرقام العشوائية والتعامل مع مدخلات المستخدم.</li>
</ul>
<h3 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h3>
<ul>
<li>معرفة أساسية بـ JavaScript (صياغة ES6+).</li>
<li>إلمام بـ Node.js وnpm.</li>
<li>فهم مفاهيم اختبار الوحدات.</li>
<li>تثبيت Node.js وnpm على جهازك.</li>
</ul>
<h3 id="إعداد-المشروع">إعداد المشروع <span class="content-anchor" id="project-setup"></span></h3>
<ol>
<li><strong>أنشئ دليلًا جديدًا</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">mkdir</span><span style="color:#ECC48D"> guess-the-number-tdd</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> guess-the-number-tdd</span></span></code></li>
<li><strong>هيّئ npm</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> init</span><span style="color:#82AAFF"> -y</span></span></code></li>
<li><strong>ثبّت Vitest</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span></span></code></li>
<li><strong>أعدّ بنية المشروع</strong> <code><span class="line"><span style="color:#D6DEEB">guess</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">the</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">number</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">└── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> └── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code> <code>src/</code>: يحتوي على الشيفرة المصدرية لمنطق اللعبة. <code>tests/</code>: يحتوي على ملفات الاختبار.</li>
</ol>
<ul>
<li><code>src/</code>: يحتوي على الشيفرة المصدرية لمنطق اللعبة.</li>
<li><code>tests/</code>: يحتوي على ملفات الاختبار.</li>
</ul>
<h3 id="فهم-التطوير-الموجه-بالاختبارات">فهم التطوير الموجّه بالاختبارات <span class="content-anchor" id="understanding-test-driven-development"></span></h3>
<p><strong>التطوير الموجّه بالاختبارات (TDD)</strong> أسلوب لتطوير البرمجيات يقوم فيه المطوّر بما يلي:</p>
<ol>
<li><strong>كتابة اختبار</strong>: اكتب اختبارًا للجزء التالي من الوظيفة.</li>
<li><strong>تشغيل الاختبار ورؤيته يفشل</strong>: يضمن أن الاختبار يكتشف غياب الوظيفة.</li>
<li><strong>كتابة أقل شيفرة تجعل الاختبار ينجح</strong>: نفّذ ما يكفي فقط من الشيفرة لجعل الاختبار ينجح.</li>
<li><strong>إعادة الهيكلة</strong>: حسّن الشيفرة مع إبقاء الاختبارات ناجحة.</li>
<li><strong>التكرار</strong>: تابع مع الوظيفة التالية.</li>
</ol>
<p>غالبًا ما تُسمّى هذه الدورة <strong>أحمر-أخضر-إعادة هيكلة</strong>.</p>
<h3 id="تهيئة-vitest">تهيئة Vitest <span class="content-anchor" id="setting-up-vitest"></span></h3>
<p>أضف سكربت اختبار إلى <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vitest&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ ملف <code>vitest.config.js</code> (اختياري في الإعدادات البسيطة):</p>
<pre><code class="language-javascript"><span class="hljs-comment">// vitest.config.js</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">globals</span>: <span class="hljs-literal">true</span>,
  },
});
</code></pre>
<h3 id="تصميم-منطق-اللعبة">تصميم منطق اللعبة <span class="content-anchor" id="designing-the-game-logic"></span></h3>
<p>قبل أن نبدأ بالبرمجة، لنحدّد منطق اللعبة بإيجاز:</p>
<ul>
<li>تولّد اللعبة رقمًا عشوائيًا داخل نطاق محدّد (مثلًا من 1 إلى 100).</li>
<li>يقوم اللاعب بتخمينات للعثور على الرقم.</li>
<li>بعد كل تخمين، تقدّم اللعبة تغذية راجعة: إن كان التخمين مرتفعًا جدًا، أو منخفضًا جدًا، أو صحيحًا.
<ul>
<li>إن كان التخمين مرتفعًا جدًا.</li>
<li>إن كان التخمين منخفضًا جدًا.</li>
<li>إن كان التخمين صحيحًا.</li>
</ul>
</li>
<li>تتتبّع اللعبة عدد المحاولات.</li>
<li>تنتهي اللعبة عندما يخمّن اللاعب الرقم الصحيح.</li>
<li>يضمن التحقق من المدخلات أن التخمينات أرقام صالحة داخل النطاق.</li>
</ul>
<h3 id="تنفيذ-منطق-اللعبة-باستخدام-tdd">تنفيذ منطق اللعبة باستخدام TDD <span class="content-anchor" id="implementing-the-game-logic-with-tdd"></span></h3>
<h4>توليد رقم عشوائي <span class="content-anchor" id="generating-a-random-number"></span></h4>
<h5>الخطوة 1: اكتب الاختبار (أحمر)</h5>
<p>أنشئ <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// tests/game.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { createGame } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/game&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Guess the Number Game&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;generates a random number between 1 and 100 by default&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBeGreaterThanOrEqual</span>(<span class="hljs-number">1</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBeLessThanOrEqual</span>(<span class="hljs-number">100</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;allows setting a custom range&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>(<span class="hljs-number">1</span>, <span class="hljs-number">50</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBeGreaterThanOrEqual</span>(<span class="hljs-number">1</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">secretNumber</span>).<span class="hljs-title function_">toBeLessThanOrEqual</span>(<span class="hljs-number">50</span>);
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر أن <code>createGame</code> تولّد رقمًا عشوائيًا داخل النطاق الافتراضي (من 1 إلى 100).</li>
<li>نختبر أنه يمكن تحديد نطاق مخصّص.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ستحصل على خطأ: <code>createGame</code> غير معرّفة.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h5>
<p>نفّذ <code>createGame</code> في <code>src/game.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/game.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createGame</span>(<span class="hljs-params">min = <span class="hljs-number">1</span>, max = <span class="hljs-number">100</span></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">secretNumber</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * (max - min + <span class="hljs-number">1</span>)) + min,
    min,
    max,
    <span class="hljs-attr">attempts</span>: <span class="hljs-number">0</span>,
  };
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح الاختبارات الآن.</p>
<h5>الخطوة 5: أعد الهيكلة (إن لزم)</h5>
<p>شيفرتنا مقبولة كما هي.</p>
<h4>إجراء تخمين <span class="content-anchor" id="making-a-guess"></span></h4>
<p>نحتاج إلى تنفيذ دالة لإجراء تخمين.</p>
<h5>الخطوة 1: اكتب الاختبار (أحمر)</h5>
<p>أضف إلى <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;makeGuess&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;increments the number of attempts&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">50</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">attempts</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">1</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns &quot;correct&quot; when the guess is equal to the secret number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">secretNumber</span> = <span class="hljs-number">42</span>;
    <span class="hljs-keyword">const</span> result = game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">42</span>);
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;correct&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns &quot;too high&quot; when the guess is greater than the secret number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">secretNumber</span> = <span class="hljs-number">42</span>;
    <span class="hljs-keyword">const</span> result = game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">50</span>);
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;too high&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns &quot;too low&quot; when the guess is less than the secret number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">secretNumber</span> = <span class="hljs-number">42</span>;
    <span class="hljs-keyword">const</span> result = game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">30</span>);
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;too low&#x27;</span>);
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر أن <code>makeGuess</code> تزيد عدد المحاولات.</li>
<li>نختبر التغذية الراجعة للتخمينات الصحيحة والمرتفعة جدًا والمنخفضة جدًا.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>تحدث أخطاء لأن <code>makeGuess</code> غير معرّفة.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h5>
<p>حدّث <code>src/game.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createGame</span>(<span class="hljs-params">min = <span class="hljs-number">1</span>, max = <span class="hljs-number">100</span></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">secretNumber</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * (max - min + <span class="hljs-number">1</span>)) + min,
    min,
    max,
    <span class="hljs-attr">attempts</span>: <span class="hljs-number">0</span>,
    <span class="hljs-title function_">makeGuess</span>(<span class="hljs-params">guess</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">attempts</span>++;
      <span class="hljs-keyword">if</span> (guess === <span class="hljs-variable language_">this</span>.<span class="hljs-property">secretNumber</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;correct&#x27;</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (guess &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">secretNumber</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;too high&#x27;</span>;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;too low&#x27;</span>;
      }
    },
  };
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل الاختبارات.</p>
<h5>الخطوة 5: أعد الهيكلة</h5>
<p>لا حاجة إلى إعادة هيكلة فورية.</p>
<h4>تقديم التغذية الراجعة <span class="content-anchor" id="providing-feedback"></span></h4>
<p>نفّذنا التغذية الراجعة بالفعل في الخطوة السابقة، لكن لنضف اختبارات للحالات الحدّية.</p>
<h5>الخطوة 1: اكتب اختبارات إضافية (أحمر)</h5>
<p>أضف إلى <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;makeGuess&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// … previous tests …</span>

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;handles negative numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>(-<span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
    game.<span class="hljs-property">secretNumber</span> = -<span class="hljs-number">10</span>;
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">makeGuess</span>(-<span class="hljs-number">20</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;too low&#x27;</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">0</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;too high&#x27;</span>);
  });
});
</code></pre>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن ينجح الاختبار إن كان التنفيذ السابق يتعامل مع الأرقام السالبة.</p>
<h5>الخطوة 3: تحقّق من التنفيذ</h5>
<p>دالتنا <code>makeGuess</code> تقارن الأرقام بشكل صحيح بالفعل، بما في ذلك الأرقام السالبة.</p>
<h5>الخطوة 4: أعد الهيكلة</h5>
<p>تأكد من أن المقارنات تتعامل مع الحالات الحدّية بشكل صحيح.</p>
<h4>تتبّع المحاولات <span class="content-anchor" id="tracking-attempts"></span></h4>
<p>نحتاج إلى التأكد من أن اللعبة تتبّع عدد المحاولات بدقة.</p>
<h5>الخطوة 1: اكتب اختبارات إضافية (أحمر)</h5>
<p>أضف إلى <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;attempts tracking&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;counts the number of attempts made&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">10</span>);
    game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">20</span>);
    game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">30</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">attempts</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">3</span>);
  });
});
</code></pre>
<h5>الخطوة 2: شغّل الاختبار</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن ينجح الاختبار، مؤكدًا تتبّع المحاولات.</p>
<h4>التعامل مع المدخلات غير الصالحة <span class="content-anchor" id="handling-invalid-inputs"></span></h4>
<p>نحتاج إلى التعامل مع الحالات التي لا يكون فيها التخمين رقمًا صالحًا أو يكون خارج النطاق.</p>
<h5>الخطوة 1: اكتب الاختبار (أحمر)</h5>
<p>أضف إلى <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;input validation&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error when the guess is not a number&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-string">&#x27;a&#x27;</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Invalid guess&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;throws an error when the guess is out of range&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>(<span class="hljs-number">1</span>, <span class="hljs-number">50</span>);
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">0</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Guess must be between 1 and 50&#x27;</span>);
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> game.<span class="hljs-title function_">makeGuess</span>(<span class="hljs-number">51</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Guess must be between 1 and 50&#x27;</span>);
  });
});
</code></pre>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>تحدث أخطاء لأننا لم ننفّذ التحقق من المدخلات.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h5>
<p>حدّث <code>src/game.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createGame</span>(<span class="hljs-params">min = <span class="hljs-number">1</span>, max = <span class="hljs-number">100</span></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">secretNumber</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * (max - min + <span class="hljs-number">1</span>)) + min,
    min,
    max,
    <span class="hljs-attr">attempts</span>: <span class="hljs-number">0</span>,
    <span class="hljs-title function_">makeGuess</span>(<span class="hljs-params">guess</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> guess !== <span class="hljs-string">&#x27;number&#x27;</span> || <span class="hljs-built_in">isNaN</span>(guess)) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid guess&#x27;</span>);
      }
      <span class="hljs-keyword">if</span> (guess &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">min</span> || guess &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">max</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Guess must be between <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.min}</span> and <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.max}</span>\`</span>);
      }
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">attempts</span>++;
      <span class="hljs-keyword">if</span> (guess === <span class="hljs-variable language_">this</span>.<span class="hljs-property">secretNumber</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;correct&#x27;</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (guess &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">secretNumber</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;too high&#x27;</span>;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;too low&#x27;</span>;
      }
    },
  };
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل الاختبارات.</p>
<h5>الخطوة 5: أعد الهيكلة</h5>
<p>فكّر في نقل منطق التحقق إلى دوال منفصلة إن لزم.</p>
<hr>
<p>في هذه المرحلة، نفّذنا منطق اللعبة الأساسي باستخدام TDD.</p>
<h3 id="تشغيل-الاختبارات">تشغيل الاختبارات <span class="content-anchor" id="running-the-tests"></span></h3>
<p>يمكنك في أي وقت تشغيل كل الاختبارات باستخدام:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>سينفّذ Vitest كل الاختبارات في دليل <code>tests/</code> ويبلّغ بالنتائج.</p>
<h3 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h3>
<p>باتّباع مبادئ التطوير الموجّه بالاختبارات، بنينا لعبة «خمّن الرقم» عاملة دون واجهة مستخدم. كتبنا اختبارات وحدات لمنطق اللعبة، ضامنين أن شيفرتنا موثوقة وتتصرّف كما هو متوقع.</p>
<p><strong>الخلاصات الأساسية:</strong></p>
<ul>
<li><strong>سير عمل TDD:</strong> كتابة الاختبارات أولًا تساعد في تحديد السلوك المتوقع وتؤدي إلى شيفرة أفضل تصميمًا.</li>
<li><strong>Vitest للاختبار:</strong> يوفّر Vitest تجربة اختبار سريعة وحديثة لتطبيقات JavaScript.</li>
<li><strong>التركيز على اختبار الوحدات:</strong> يتيح لنا التركيز على اختبارات الوحدات ضمان أن كل جزء من شيفرتنا يعمل بشكل صحيح في عزلة.</li>
</ul>
<div class="exercises"><h3 id="تمارين-إضافية">تمارين إضافية <span class="content-anchor" id="additional-exercises"></span></h3>
<p>لتعزيز لعبة «خمّن الرقم» ومهاراتك في الاختبار أكثر، فكّر في تنفيذ الميزات التالية:</p>
<ol>
<li><strong>تحديد الحد الأقصى للمحاولات</strong> عدّل اللعبة لتسمح بعدد أقصى من المحاولات. اكتب اختبارات لضمان انتهاء اللعبة بعد بلوغ الحد الأقصى من المحاولات.</li>
</ol>
<ul>
<li>عدّل اللعبة لتسمح بعدد أقصى من المحاولات.</li>
<li>اكتب اختبارات لضمان انتهاء اللعبة بعد بلوغ الحد الأقصى من المحاولات.</li>
</ul>
<ol start="2">
<li><strong>نظام تلميحات</strong> نفّذ نظام تلميحات يقدّم قرائن إضافية. اكتب اختبارات للتحقق من دقة التلميحات وتقديمها بشكل صحيح.</li>
</ol>
<ul>
<li>نفّذ نظام تلميحات يقدّم قرائن إضافية.</li>
<li>اكتب اختبارات للتحقق من دقة التلميحات وتقديمها بشكل صحيح.</li>
</ul>
<ol start="3">
<li><strong>وظيفة إعادة اللعب</strong> أضف تابعًا لإعادة ضبط اللعبة والبدء من جديد. اكتب اختبارات لضمان إعادة ضبط اللعبة بشكل صحيح.</li>
</ol>
<ul>
<li>أضف تابعًا لإعادة ضبط اللعبة والبدء من جديد.</li>
<li>اكتب اختبارات لضمان إعادة ضبط اللعبة بشكل صحيح.</li>
</ul>
<ol start="4">
<li><strong>مستويات الصعوبة</strong> أدخل مستويات صعوبة تعدّل النطاق أو عدد المحاولات. اكتب اختبارات للتحقق من تصرّف اللعبة بشكل صحيح عند مستويات صعوبة مختلفة.</li>
</ol>
<ul>
<li>أدخل مستويات صعوبة تعدّل النطاق أو عدد المحاولات.</li>
<li>اكتب اختبارات للتحقق من تصرّف اللعبة بشكل صحيح عند مستويات صعوبة مختلفة.</li>
</ul>
<ol start="5">
<li><strong>تتبّع إحصائي</strong> تتبّع إحصاءات مثل إجمالي الألعاب الملعوبة، والفوزات، ومتوسط المحاولات. اكتب اختبارات لضمان تسجيل الإحصاءات بدقة.</li>
</ol>
<ul>
<li>تتبّع إحصاءات مثل إجمالي الألعاب الملعوبة، والفوزات، ومتوسط المحاولات.</li>
<li>اكتب اختبارات لضمان تسجيل الإحصاءات بدقة.</li>
</ul>
<ol start="6">
<li><strong>تحليل المدخلات</strong> حسّن التعامل مع المدخلات لقبول النصوص وتحويلها إلى أرقام. اكتب اختبارات لضمان تفسير مدخلات مثل <code>'42'</code> بشكل صحيح.</li>
</ol>
<ul>
<li>حسّن التعامل مع المدخلات لقبول النصوص وتحويلها إلى أرقام.</li>
<li>اكتب اختبارات لضمان تفسير مدخلات مثل <code>'42'</code> بشكل صحيح.</li>
</ul>
<ol start="7">
<li><strong>وضع اللاعبين المتعددين</strong> اسمح لعدة لاعبين بالتخمين بالتناوب. اكتب اختبارات لضمان إدارة أدوار اللاعبين ونتائجهم بشكل صحيح.</li>
</ol>
<ul>
<li>اسمح لعدة لاعبين بالتخمين بالتناوب.</li>
<li>اكتب اختبارات لضمان إدارة أدوار اللاعبين ونتائجهم بشكل صحيح.</li>
</ul>
<ol start="8">
<li><strong>قائمة أفضل النتائج</strong> نفّذ نظام أفضل النتائج الذي يسجّل أفضل الدرجات. اكتب اختبارات لضمان تحديث أفضل النتائج واسترجاعها بشكل صحيح.</li>
</ol>
<ul>
<li>نفّذ نظام أفضل النتائج الذي يسجّل أفضل الدرجات.</li>
<li>اكتب اختبارات لضمان تحديث أفضل النتائج واسترجاعها بشكل صحيح.</li>
</ul>
<hr>
<p>بتوسيع اللعبة وكتابة اختبارات لميزات جديدة، ستعمّق فهمك لـ TDD وتحسّن كفاءتك في الاختبار.</p>
</div>`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,l as slug,t as title};
