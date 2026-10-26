const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="tic-tac-toe-example",p="بناء لعبة Tic Tac Toe باستخدام Vitest",t=[{depth:2,id:"بناء-لعبة-tic-tac-toe-باستخدام-التطوير-المدفوع-بالاختبارات-مع-vitest",text:"بناء لعبة Tic Tac Toe باستخدام التطوير المدفوع بالاختبارات مع Vitest"},{depth:3,id:"المقدمة",text:"المقدمة"},{depth:3,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:3,id:"تهيئة-المشروع",text:"تهيئة المشروع"},{depth:3,id:"فهم-التطوير-المدفوع-بالاختبارات",text:"فهم التطوير المدفوع بالاختبارات"},{depth:3,id:"تهيئة-vitest",text:"تهيئة Vitest"},{depth:3,id:"تصميم-منطق-اللعبة",text:"تصميم منطق اللعبة"},{depth:3,id:"تنفيذ-منطق-اللعبة-بالتطوير-المدفوع-بالاختبارات",text:"تنفيذ منطق اللعبة بالتطوير المدفوع بالاختبارات"},{depth:3,id:"بناء-واجهة-المستخدم",text:"بناء واجهة المستخدم"},{depth:3,id:"اختبار-واجهة-المستخدم",text:"اختبار واجهة المستخدم"},{depth:3,id:"الخلاصة",text:"الخلاصة"},{depth:3,id:"تمارين-إضافية",text:"تمارين إضافية"}],e=`<h2 id="بناء-لعبة-tic-tac-toe-باستخدام-التطوير-المدفوع-بالاختبارات-مع-vitest">بناء لعبة Tic Tac Toe باستخدام التطوير المدفوع بالاختبارات مع Vitest</h2>
<p><strong>جدول المحتويات</strong></p>
<ol>
<li><a href="#introduction">المقدمة</a></li>
<li><a href="#prerequisites">المتطلبات المسبقة</a></li>
<li><a href="#project-setup">تهيئة المشروع</a></li>
<li><a href="#understanding-test-driven-development">فهم التطوير المدفوع بالاختبارات</a></li>
<li><a href="#setting-up-vitest">تهيئة Vitest</a></li>
<li><a href="#designing-the-game-logic">تصميم منطق اللعبة</a></li>
<li><a href="#implementing-the-game-logic-with-tdd">تنفيذ منطق اللعبة بالتطوير المدفوع بالاختبارات</a> <a href="#creating-the-game-board">1. إنشاء لوحة اللعبة</a> <a href="#placing-a-move">2. وضع نقلة</a> <a href="#checking-for-a-winner">3. التحقق من فائز</a> <a href="#checking-for-a-draw">4. التحقق من التعادل</a></li>
</ol>
<ul>
<li><a href="#creating-the-game-board">1. إنشاء لوحة اللعبة</a></li>
<li><a href="#placing-a-move">2. وضع نقلة</a></li>
<li><a href="#checking-for-a-winner">3. التحقق من فائز</a></li>
<li><a href="#checking-for-a-draw">4. التحقق من التعادل</a></li>
</ul>
<ol start="8">
<li><a href="#building-the-user-interface">بناء واجهة المستخدم</a></li>
<li><a href="#testing-the-user-interface">اختبار واجهة المستخدم</a></li>
<li><a href="#conclusion">الخلاصة</a></li>
<li><a href="#additional-exercises">تمارين إضافية</a></li>
</ol>
<hr>
<h3 id="المقدمة">المقدمة <span class="content-anchor" id="introduction"></span></h3>
<p>في هذا الدليل سنبني لعبة <strong>Tic Tac Toe</strong> الكلاسيكية باستخدام <strong>التطوير المدفوع بالاختبارات (TDD)</strong> مع <strong>Vitest</strong>، إطار اختبار JavaScript سريع وحديث. سنبدأ بتطوير منطق اللعبة عبر اختبارات الوحدات ثم ننشئ واجهة مستخدم بسيطة باستخدام JavaScript العادية، بما يضمن اختبار واجهتنا وعملها بشكل صحيح.</p>
<p><strong>الأهداف:</strong></p>
<ul>
<li>تعلّم كيفية تطبيق مبادئ التطوير المدفوع بالاختبارات لبناء لعبة.</li>
<li>فهم كيفية كتابة اختبارات الوحدات باستخدام Vitest.</li>
<li>تطوير منطق لعبة Tic Tac Toe وواجهة المستخدم.</li>
<li>كتابة اختبارات لمنطق اللعبة ولتفاعلات واجهة المستخدم معًا.</li>
</ul>
<h3 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h3>
<ul>
<li>معرفة أساسية بـ JavaScript (صيغة ES6+).</li>
<li>إلمام بـ Node.js وnpm.</li>
<li>فهم مفاهيم اختبار الوحدات.</li>
<li>Node.js وnpm مثبّتان على جهازك.</li>
</ul>
<h3 id="تهيئة-المشروع">تهيئة المشروع <span class="content-anchor" id="project-setup"></span></h3>
<ol>
<li><strong>أنشئ دليلًا جديدًا</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">mkdir</span><span style="color:#ECC48D"> tic-tac-toe-tdd</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> tic-tac-toe-tdd</span></span></code></li>
<li><strong>هيّئ npm</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> init</span><span style="color:#82AAFF"> -y</span></span></code></li>
<li><strong>ثبّت Vitest</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span></span></code></li>
<li><strong>جهّز بنية المشروع</strong> <code><span class="line"><span style="color:#D6DEEB">tic</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tac</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">toe</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── ui</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── index</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">html</span></span>
<span class="line"><span style="color:#D6DEEB">└── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> ├── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB"> └── ui</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code> <code>src/</code>: يحتوي على الشيفرة المصدرية لمنطق اللعبة وواجهة المستخدم. <code>tests/</code>: يحتوي على ملفات الاختبار.</li>
</ol>
<ul>
<li><code>src/</code>: يحتوي على الشيفرة المصدرية لمنطق اللعبة وواجهة المستخدم.</li>
<li><code>tests/</code>: يحتوي على ملفات الاختبار.</li>
</ul>
<h3 id="فهم-التطوير-المدفوع-بالاختبارات">فهم التطوير المدفوع بالاختبارات <span class="content-anchor" id="understanding-test-driven-development"></span></h3>
<p><strong>التطوير المدفوع بالاختبارات (TDD)</strong> مقاربة لتطوير البرمجيات تقوم فيها بما يلي:</p>
<ol>
<li><strong>اكتب اختبارًا</strong>: اكتب اختبارًا للجزء التالي من الوظائف.</li>
<li><strong>شغّل الاختبار وشاهده يفشل</strong>: يضمن أن الاختبار يكتشف غياب الوظيفة.</li>
<li><strong>اكتب أقل شيفرة تجعل الاختبار ينجح</strong>: نفّذ شيفرة كافية فقط لجعل الاختبار ينجح.</li>
<li><strong>أعد الهيكلة</strong>: حسّن الشيفرة مع إبقاء الاختبارات ناجحة.</li>
<li><strong>كرّر</strong>: تابع مع الوظيفة التالية.</li>
</ol>
<p>غالبًا ما تُسمّى هذه الدورة <strong>الأحمر-الأخضر-إعادة الهيكلة</strong> (Red-Green-Refactor).</p>
<h3 id="تهيئة-vitest">تهيئة Vitest <span class="content-anchor" id="setting-up-vitest"></span></h3>
<p>أضف سكربت اختبار إلى <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vitest&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ ملف <code>vitest.config.js</code> (اختياري للتهيئات البسيطة):</p>
<pre><code class="language-javascript"><span class="hljs-comment">// vitest.config.js</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">globals</span>: <span class="hljs-literal">true</span>,
  },
});
</code></pre>
<h3 id="تصميم-منطق-اللعبة">تصميم منطق اللعبة <span class="content-anchor" id="designing-the-game-logic"></span></h3>
<p>قبل أن نبدأ البرمجة، لنرسم منطق اللعبة:</p>
<ul>
<li>لوحة اللعبة شبكة 3x3.</li>
<li>يتناوب اللاعبون وضع علامتهم (X أو O) على اللوحة.</li>
<li>تتحقق اللعبة من وجود فائز بعد كل نقلة.</li>
<li>يفوز اللاعب إذا كانت لديه ثلاث من علاماته في صف أو عمود أو قطر.</li>
<li>تنتهي اللعبة بالتعادل إذا امتلأت كل الخانات دون فائز.</li>
</ul>
<h3 id="تنفيذ-منطق-اللعبة-بالتطوير-المدفوع-بالاختبارات">تنفيذ منطق اللعبة بالتطوير المدفوع بالاختبارات <span class="content-anchor" id="implementing-the-game-logic-with-tdd"></span></h3>
<h4>إنشاء لوحة اللعبة <span class="content-anchor" id="creating-the-game-board"></span></h4>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>أنشئ <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// tests/game.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { createGame } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../src/game&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Tic Tac Toe Game Logic&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;initializes a 3x3 game board&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">board</span>).<span class="hljs-title function_">toEqual</span>([
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    ]);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;starts with player X&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">currentPlayer</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;X&#x27;</span>);
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر أن <code>createGame</code> تهيّئ لوحة 3x3 فارغة.</li>
<li>نختبر أن اللعبة تبدأ باللاعب «X».</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ستحصل على خطأ: <code>createGame</code> غير معرّفة.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>نفّذ <code>createGame</code> في <code>src/game.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/game.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createGame</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">board</span>: [
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    ],
    <span class="hljs-attr">currentPlayer</span>: <span class="hljs-string">&#x27;X&#x27;</span>,
  };
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح الاختبارات الآن.</p>
<h5>الخطوة 5: أعد الهيكلة (إن لزم)</h5>
<p>شيفرتنا بسيطة؛ لا حاجة إلى إعادة هيكلة.</p>
<h4>وضع نقلة <span class="content-anchor" id="placing-a-move"></span></h4>
<p>نحتاج إلى تنفيذ دالة تضع نقلة على اللوحة.</p>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>أضف إلى <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;placeMove&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&quot;places the current player&#x27;s mark on the board&quot;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-title function_">placeMove</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>); <span class="hljs-comment">// Top-left corner</span>
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">board</span>[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>]).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;X&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;switches to the next player after a move&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-title function_">placeMove</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-property">currentPlayer</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;O&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;does not allow placing a move on an occupied spot&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-title function_">placeMove</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> game.<span class="hljs-title function_">placeMove</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Spot already taken&#x27;</span>);
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر أن علامة اللاعب الحالي تُوضع على اللوحة.</li>
<li>نختبر أن اللاعب يتبدّل بعد النقلة.</li>
<li>نختبر أن وضع نقلة على خانة مشغولة يرمي خطأً.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>تحدث أخطاء لأن <code>placeMove</code> غير معرّفة.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>حدّث <code>src/game.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createGame</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">board</span>: [
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    ],
    <span class="hljs-attr">currentPlayer</span>: <span class="hljs-string">&#x27;X&#x27;</span>,
    <span class="hljs-title function_">placeMove</span>(<span class="hljs-params">row, col</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[row][col] !== <span class="hljs-string">&#x27;&#x27;</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Spot already taken&#x27;</span>);
      }
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[row][col] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentPlayer</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentPlayer</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentPlayer</span> === <span class="hljs-string">&#x27;X&#x27;</span> ? <span class="hljs-string">&#x27;O&#x27;</span> : <span class="hljs-string">&#x27;X&#x27;</span>;
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
<p>فكّر في فصل منطق تبديل اللاعب.</p>
<h4>التحقق من فائز <span class="content-anchor" id="checking-for-a-winner"></span></h4>
<p>نحتاج إلى تنفيذ تابع للتحقق من وجود فائز.</p>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>أضف إلى <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;checkWinner&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;detects a winning row&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">board</span> = [
      [<span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    ];
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">checkWinner</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;X&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;detects a winning column&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">board</span> = [
      [<span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    ];
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">checkWinner</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;O&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;detects a winning diagonal&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">board</span> = [
      [<span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>],
    ];
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">checkWinner</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;X&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns null if there is no winner&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">checkWinner</span>()).<span class="hljs-title function_">toBeNull</span>();
  });
});
</code></pre>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>خطأ: <code>checkWinner</code> غير معرّفة.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>حدّث <code>src/game.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createGame</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">board</span>: [
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    ],
    <span class="hljs-attr">currentPlayer</span>: <span class="hljs-string">&#x27;X&#x27;</span>,
    <span class="hljs-title function_">placeMove</span>(<span class="hljs-params">row, col</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[row][col] !== <span class="hljs-string">&#x27;&#x27;</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Spot already taken&#x27;</span>);
      }
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>[row][col] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentPlayer</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentPlayer</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentPlayer</span> === <span class="hljs-string">&#x27;X&#x27;</span> ? <span class="hljs-string">&#x27;O&#x27;</span> : <span class="hljs-string">&#x27;X&#x27;</span>;
    },
    <span class="hljs-title function_">checkWinner</span>(<span class="hljs-params"></span>) {
      <span class="hljs-keyword">const</span> b = <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>;
      <span class="hljs-keyword">const</span> lines = [
        <span class="hljs-comment">// Rows</span>
        [b[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>], b[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>], b[<span class="hljs-number">0</span>][<span class="hljs-number">2</span>]],
        [b[<span class="hljs-number">1</span>][<span class="hljs-number">0</span>], b[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>], b[<span class="hljs-number">1</span>][<span class="hljs-number">2</span>]],
        [b[<span class="hljs-number">2</span>][<span class="hljs-number">0</span>], b[<span class="hljs-number">2</span>][<span class="hljs-number">1</span>], b[<span class="hljs-number">2</span>][<span class="hljs-number">2</span>]],
        <span class="hljs-comment">// Columns</span>
        [b[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>], b[<span class="hljs-number">1</span>][<span class="hljs-number">0</span>], b[<span class="hljs-number">2</span>][<span class="hljs-number">0</span>]],
        [b[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>], b[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>], b[<span class="hljs-number">2</span>][<span class="hljs-number">1</span>]],
        [b[<span class="hljs-number">0</span>][<span class="hljs-number">2</span>], b[<span class="hljs-number">1</span>][<span class="hljs-number">2</span>], b[<span class="hljs-number">2</span>][<span class="hljs-number">2</span>]],
        <span class="hljs-comment">// Diagonals</span>
        [b[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>], b[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>], b[<span class="hljs-number">2</span>][<span class="hljs-number">2</span>]],
        [b[<span class="hljs-number">0</span>][<span class="hljs-number">2</span>], b[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>], b[<span class="hljs-number">2</span>][<span class="hljs-number">0</span>]],
      ];

      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> line <span class="hljs-keyword">of</span> lines) {
        <span class="hljs-keyword">if</span> (line[<span class="hljs-number">0</span>] &amp;&amp; line[<span class="hljs-number">0</span>] === line[<span class="hljs-number">1</span>] &amp;&amp; line[<span class="hljs-number">1</span>] === line[<span class="hljs-number">2</span>]) {
          <span class="hljs-keyword">return</span> line[<span class="hljs-number">0</span>];
        }
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
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
<p>فكّر في نقل مصفوفة <code>lines</code> خارج الدالة إن لزم.</p>
<h4>التحقق من التعادل <span class="content-anchor" id="checking-for-a-draw"></span></h4>
<p>نحتاج إلى التحقق من انتهاء اللعبة بالتعادل.</p>
<h5>الخطوة 1: اكتب الاختبار (الأحمر)</h5>
<p>أضف إلى <code>tests/game.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;isDraw&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns true when the board is full and there is no winner&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">board</span> = [
      [<span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>],
      [<span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;O&#x27;</span>],
      [<span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>],
    ];
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">isDraw</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns false when the board is not full&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">board</span> = [
      [<span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;O&#x27;</span>],
      [<span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>],
    ];
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">isDraw</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns false when there is a winner&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
    game.<span class="hljs-property">board</span> = [
      [<span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>, <span class="hljs-string">&#x27;X&#x27;</span>],
      [<span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;O&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
      [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    ];
    <span class="hljs-title function_">expect</span>(game.<span class="hljs-title function_">isDraw</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
  });
});
</code></pre>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>خطأ: <code>isDraw</code> غير معرّفة.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)</h5>
<p>حدّث <code>src/game.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createGame</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-comment">// … previous code …</span>
    <span class="hljs-title function_">isDraw</span>(<span class="hljs-params"></span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">checkWinner</span>()) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> row <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">board</span>) {
        <span class="hljs-keyword">if</span> (row.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;&#x27;</span>)) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
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
<hr>
<p>في هذه المرحلة، نكون قد نفّذنا منطق اللعبة الأساسي باستخدام التطوير المدفوع بالاختبارات.</p>
<h3 id="بناء-واجهة-المستخدم">بناء واجهة المستخدم <span class="content-anchor" id="building-the-user-interface"></span></h3>
<p>الآن سننشئ واجهة مستخدم بسيطة باستخدام HTML وJavaScript.</p>
<h4>إنشاء <code>index.html</code></h4>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- src/index.html --&gt;</span>
<span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Tic Tac Toe<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css">
      <span class="hljs-selector-class">.board</span> {
        <span class="hljs-attribute">display</span>: grid;
        <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-built_in">repeat</span>(<span class="hljs-number">3</span>, <span class="hljs-number">100px</span>);
        <span class="hljs-attribute">grid-gap</span>: <span class="hljs-number">5px</span>;
      }
      <span class="hljs-selector-class">.cell</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
      }
      <span class="hljs-selector-class">.disabled</span> {
        <span class="hljs-attribute">pointer-events</span>: none;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f0f0f0</span>;
      }
      <span class="hljs-selector-id">#message</span> {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.2em</span>;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Tic Tac Toe<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;board&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;board&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;reset&quot;</span>&gt;</span>Reset Game<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;ui.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

</code></pre>
<h4>إنشاء <code>ui.js</code></h4>
<p>سنكتب شيفرة واجهة المستخدم بينما نكتب اختباراتها.</p>
<h3 id="اختبار-واجهة-المستخدم">اختبار واجهة المستخدم <span class="content-anchor" id="testing-the-user-interface"></span></h3>
<p>سنستخدم <strong>Vitest</strong> مع <strong>Testing Library</strong> لاختبار واجهتنا.</p>
<h4>تهيئة Testing Library</h4>
<p>ثبّت الاعتمادات:</p>
<pre><code class="language-bash">npm install --save-dev jsdom @testing-library/dom @testing-library/user-event @testing-library/jest-dom
</code></pre>
<p>حدّث <code>vitest.config.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// vitest.config.js</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">environment</span>: <span class="hljs-string">&#x27;jsdom&#x27;</span>,
    <span class="hljs-attr">setupFiles</span>: <span class="hljs-string">&#x27;./tests/setupTests.js&#x27;</span>,
  },
});
</code></pre>
<p>أنشئ <code>tests/setupTests.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@testing-library/jest-dom&#x27;</span>;
</code></pre>
<h4>كتابة اختبارات واجهة المستخدم</h4>
<p>أنشئ <code>tests/ui.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// tests/ui.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect, beforeEach } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/dom&#x27;</span>;
<span class="hljs-keyword">import</span> userEvent <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/user-event&#x27;</span>;
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;

<span class="hljs-keyword">const</span> html = fs.<span class="hljs-title function_">readFileSync</span>(path.<span class="hljs-title function_">resolve</span>(__dirname, <span class="hljs-string">&#x27;../src/index.html&#x27;</span>), <span class="hljs-string">&#x27;utf8&#x27;</span>);

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Tic Tac Toe UI&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">innerHTML</span> = html;
    <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;../src/ui.js&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;renders a 3x3 grid&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> cells = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.cell&#x27;</span>);
    <span class="hljs-title function_">expect</span>(cells.<span class="hljs-property">length</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">9</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;allows players to take turns placing marks&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> user = userEvent.<span class="hljs-title function_">setup</span>();
    <span class="hljs-keyword">const</span> cells = screen.<span class="hljs-title function_">getAllByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>);

    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">0</span>]); <span class="hljs-comment">// Player X</span>
    <span class="hljs-title function_">expect</span>(cells[<span class="hljs-number">0</span>]).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;X&#x27;</span>);

    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">1</span>]); <span class="hljs-comment">// Player O</span>
    <span class="hljs-title function_">expect</span>(cells[<span class="hljs-number">1</span>]).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;O&#x27;</span>);

    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">2</span>]); <span class="hljs-comment">// Player X</span>
    <span class="hljs-title function_">expect</span>(cells[<span class="hljs-number">2</span>]).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;X&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;declares a winner when a player wins&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> user = userEvent.<span class="hljs-title function_">setup</span>();
    <span class="hljs-keyword">const</span> cells = screen.<span class="hljs-title function_">getAllByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>);
    <span class="hljs-keyword">const</span> message = screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;&#x27;</span>, { <span class="hljs-attr">selector</span>: <span class="hljs-string">&#x27;#message&#x27;</span> });

    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">0</span>]); <span class="hljs-comment">// X</span>
    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">3</span>]); <span class="hljs-comment">// O</span>
    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">1</span>]); <span class="hljs-comment">// X</span>
    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">4</span>]); <span class="hljs-comment">// O</span>
    <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[<span class="hljs-number">2</span>]); <span class="hljs-comment">// X wins</span>

    <span class="hljs-title function_">expect</span>(message).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&#x27;Player X wins!&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;declares a draw when the game ends without a winner&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> user = userEvent.<span class="hljs-title function_">setup</span>();
    <span class="hljs-keyword">const</span> cells = screen.<span class="hljs-title function_">getAllByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>);
    <span class="hljs-keyword">const</span> message = screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;&#x27;</span>, { <span class="hljs-attr">selector</span>: <span class="hljs-string">&#x27;#message&#x27;</span> });

    <span class="hljs-comment">// Fill the board to a draw</span>
    <span class="hljs-keyword">const</span> moves = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index <span class="hljs-keyword">of</span> moves) {
      <span class="hljs-keyword">await</span> user.<span class="hljs-title function_">click</span>(cells[index]);
    }

    <span class="hljs-title function_">expect</span>(message).<span class="hljs-title function_">toHaveTextContent</span>(<span class="hljs-string">&quot;It&#x27;s a draw!&quot;</span>);
  });
});
</code></pre>
<h4>تنفيذ شيفرة واجهة المستخدم لنجاح الاختبارات</h4>
<p>حدّث <code>src/ui.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { createGame } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./game.js&#x27;</span>;

<span class="hljs-keyword">const</span> game = <span class="hljs-title function_">createGame</span>();
<span class="hljs-keyword">const</span> boardElement = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;board&#x27;</span>);
<span class="hljs-keyword">const</span> messageElement = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;message&#x27;</span>);
<span class="hljs-keyword">const</span> resetButton = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;reset&#x27;</span>);

<span class="hljs-comment">// Create cells</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> row = <span class="hljs-number">0</span>; row &lt; <span class="hljs-number">3</span>; row++) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> col = <span class="hljs-number">0</span>; col &lt; <span class="hljs-number">3</span>; col++) {
    <span class="hljs-keyword">const</span> cell = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;button&#x27;</span>);
    cell.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;cell&#x27;</span>);
    cell.<span class="hljs-property">dataset</span>.<span class="hljs-property">row</span> = row;
    cell.<span class="hljs-property">dataset</span>.<span class="hljs-property">col</span> = col;
    cell.<span class="hljs-title function_">setAttribute</span>(<span class="hljs-string">&#x27;aria-label&#x27;</span>, <span class="hljs-string">\`Cell <span class="hljs-subst">\${row}</span>,<span class="hljs-subst">\${col}</span>\`</span>);
    boardElement.<span class="hljs-title function_">appendChild</span>(cell);
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">updateBoard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> cells = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.cell&#x27;</span>);
  cells.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">cell</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> row = cell.<span class="hljs-property">dataset</span>.<span class="hljs-property">row</span>;
    <span class="hljs-keyword">const</span> col = cell.<span class="hljs-property">dataset</span>.<span class="hljs-property">col</span>;
    cell.<span class="hljs-property">textContent</span> = game.<span class="hljs-property">board</span>[row][col];
  });
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleClick</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">const</span> cell = event.<span class="hljs-property">target</span>;
  <span class="hljs-keyword">const</span> row = cell.<span class="hljs-property">dataset</span>.<span class="hljs-property">row</span>;
  <span class="hljs-keyword">const</span> col = cell.<span class="hljs-property">dataset</span>.<span class="hljs-property">col</span>;
  <span class="hljs-keyword">try</span> {
    game.<span class="hljs-title function_">placeMove</span>(row, col);
    <span class="hljs-title function_">updateBoard</span>();
    <span class="hljs-keyword">const</span> winner = game.<span class="hljs-title function_">checkWinner</span>();
    <span class="hljs-keyword">if</span> (winner) {
      messageElement.<span class="hljs-property">textContent</span> = <span class="hljs-string">\`Player <span class="hljs-subst">\${winner}</span> wins!\`</span>;
      <span class="hljs-title function_">disableBoard</span>();
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (game.<span class="hljs-title function_">isDraw</span>()) {
      messageElement.<span class="hljs-property">textContent</span> = <span class="hljs-string">&quot;It&#x27;s a draw!&quot;</span>;
      <span class="hljs-title function_">disableBoard</span>();
    }
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-comment">// Ignore errors for occupied spots</span>
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">disableBoard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> cells = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.cell&#x27;</span>);
  cells.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">cell</span>) =&gt;</span> {
    cell.<span class="hljs-property">disabled</span> = <span class="hljs-literal">true</span>;
    cell.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;disabled&#x27;</span>);
  });
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">resetGame</span>(<span class="hljs-params"></span>) {
  game.<span class="hljs-property">board</span> = [
    [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
    [<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>],
  ];
  game.<span class="hljs-property">currentPlayer</span> = <span class="hljs-string">&#x27;X&#x27;</span>;
  messageElement.<span class="hljs-property">textContent</span> = <span class="hljs-string">&#x27;&#x27;</span>;
  <span class="hljs-keyword">const</span> cells = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.cell&#x27;</span>);
  cells.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">cell</span>) =&gt;</span> {
    cell.<span class="hljs-property">disabled</span> = <span class="hljs-literal">false</span>;
    cell.<span class="hljs-property">classList</span>.<span class="hljs-title function_">remove</span>(<span class="hljs-string">&#x27;disabled&#x27;</span>);
    cell.<span class="hljs-property">textContent</span> = <span class="hljs-string">&#x27;&#x27;</span>;
  });
}

<span class="hljs-keyword">const</span> cells = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.cell&#x27;</span>);
cells.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">cell</span>) =&gt;</span> {
  cell.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;click&#x27;</span>, handleClick);
});

resetButton.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;click&#x27;</span>, resetGame);
</code></pre>
<h4>تشغيل الاختبارات</h4>
<p>شغّل الاختبارات:</p>
<pre><code class="language-bash">npm <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل الاختبارات إن كانت شيفرة واجهة المستخدم تنفّذ منطق اللعبة بشكل صحيح.</p>
<hr>
<h3 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h3>
<p>باتباع مبادئ التطوير المدفوع بالاختبارات، بنينا لعبة Tic Tac Toe فعّالة بمنطق لعبة وواجهة مستخدم معًا. كتبنا اختبارات وحدات لمنطق اللعبة واستخدمنا Testing Library لاختبار تفاعلات واجهة المستخدم، بما يضمن أن تطبيقنا موثوق ويتصرف كما هو متوقع.</p>
<p><strong>الخلاصات الرئيسية:</strong></p>
<ul>
<li><strong>سير عمل TDD:</strong> كتابة الاختبارات أولًا تساعد في تعريف السلوك المتوقع وتؤدي إلى شيفرة أفضل تصميمًا.</li>
<li><strong>Vitest للاختبار:</strong> يوفر Vitest تجربة اختبار سريعة وحديثة لتطبيقات JavaScript.</li>
<li><strong>Testing Library:</strong> يتيح لنا استخدام Testing Library كتابة اختبارات تشبه طريقة تفاعل المستخدمين مع تطبيقنا.</li>
</ul>
<div class="exercises"><h3 id="تمارين-إضافية">تمارين إضافية <span class="content-anchor" id="additional-exercises"></span></h3>
<p>لتعزيز لعبتك Tic Tac Toe ومهاراتك في الاختبار أكثر، فكّر في تنفيذ المزايا التالية:</p>
<ol>
<li><strong>خصم ذكي</strong> نفّذ لاعبًا آليًا يضع نقلات ضد اللاعب البشري. اكتب اختبارات لضمان أن الذكاء الاصطناعي يضع نقلات صحيحة.</li>
</ol>
<ul>
<li>نفّذ لاعبًا آليًا يضع نقلات ضد اللاعب البشري.</li>
<li>اكتب اختبارات لضمان أن الذكاء الاصطناعي يضع نقلات صحيحة.</li>
</ul>
<ol start="2">
<li><strong>تتبّع النقاط</strong> احتفظ بعدد الانتصارات لكل لاعب. اكتب اختبارات للتحقق من تحديث النقاط بشكل صحيح.</li>
</ol>
<ul>
<li>احتفظ بعدد الانتصارات لكل لاعب.</li>
<li>اكتب اختبارات للتحقق من تحديث النقاط بشكل صحيح.</li>
</ul>
<ol start="3">
<li><strong>واجهة محسّنة</strong> حسّن واجهة المستخدم بتنسيقات ورسوم متحركة أفضل. اضمن إمكانية الوصول باستخدام أدوار ARIA وتسميات مناسبة.</li>
</ol>
<ul>
<li>حسّن واجهة المستخدم بتنسيقات ورسوم متحركة أفضل.</li>
<li>اضمن إمكانية الوصول باستخدام أدوار ARIA وتسميات مناسبة.</li>
</ul>
<ol start="4">
<li><strong>وظيفة التراجع</strong> اسمح للاعبين بالتراجع عن نقلتهم الأخيرة. اكتب اختبارات لضمان إعادة حالة اللعبة بشكل صحيح.</li>
</ol>
<ul>
<li>اسمح للاعبين بالتراجع عن نقلتهم الأخيرة.</li>
<li>اكتب اختبارات لضمان إعادة حالة اللعبة بشكل صحيح.</li>
</ul>
<ol start="5">
<li><strong>لعب جماعي عبر الإنترنت</strong> نفّذ وظيفة لعب جماعي شبكية. اكتب اختبارات تكامل لمحاكاة عدة لاعبين.</li>
</ol>
<ul>
<li>نفّذ وظيفة لعب جماعي شبكية.</li>
<li>اكتب اختبارات تكامل لمحاكاة عدة لاعبين.</li>
</ul>
<ol start="6">
<li><strong>تصميم متجاوب</strong> اجعل اللعبة متجاوبة وقابلة للعب على أجهزة مختلفة. اختبر عناصر واجهة المستخدم على أحجام شاشات متنوعة.</li>
</ol>
<ul>
<li>اجعل اللعبة متجاوبة وقابلة للعب على أجهزة مختلفة.</li>
<li>اختبر عناصر واجهة المستخدم على أحجام شاشات متنوعة.</li>
</ul>
<ol start="7">
<li><strong>لوحة المتصدرين</strong> أضف لوحة متصدرين لعرض نقاط أفضل اللاعبين. اكتب اختبارات لضمان تخزين النقاط واسترجاعها بشكل صحيح.</li>
</ol>
<ul>
<li>أضف لوحة متصدرين لعرض نقاط أفضل اللاعبين.</li>
<li>اكتب اختبارات لضمان تخزين النقاط واسترجاعها بشكل صحيح.</li>
</ul>
<ol start="8">
<li><strong>تحليل تغطية الاختبارات</strong> ادمج تقارير تغطية الشيفرة مع Vitest. حلّل تقرير التغطية لتحديد مسارات الشيفرة غير المختبَرة.</li>
</ol>
<ul>
<li>ادمج تقارير تغطية الشيفرة مع Vitest.</li>
<li>حلّل تقرير التغطية لتحديد مسارات الشيفرة غير المختبَرة.</li>
</ul>
</div>`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
