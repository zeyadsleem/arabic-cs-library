const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="authentication-example",t="اختبار المصادقة باستخدام Vitest",p=[{depth:2,id:"بناء-نظام-مصادقة-باستخدام-التطوير-الموجه-بالاختبارات-مع-express-وvitest",text:"بناء نظام مصادقة باستخدام التطوير الموجّه بالاختبارات مع Express وVitest"},{depth:3,id:"المقدمة",text:"المقدمة"},{depth:3,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:3,id:"إعداد-المشروع",text:"إعداد المشروع"},{depth:3,id:"فهم-التطوير-الموجه-بالاختبارات",text:"فهم التطوير الموجّه بالاختبارات"},{depth:3,id:"تصميم-نظام-المصادقة",text:"تصميم نظام المصادقة"},{depth:3,id:"تنفيذ-النظام-باستخدام-tdd",text:"تنفيذ النظام باستخدام TDD"},{depth:3,id:"مجالات-التركيز-في-الاختبار",text:"مجالات التركيز في الاختبار"},{depth:3,id:"تشغيل-الاختبارات",text:"تشغيل الاختبارات"},{depth:3,id:"الخلاصة",text:"الخلاصة"},{depth:3,id:"تمارين-إضافية",text:"تمارين إضافية"}],e=`<h2 id="بناء-نظام-مصادقة-باستخدام-التطوير-الموجه-بالاختبارات-مع-express-وvitest">بناء نظام مصادقة باستخدام التطوير الموجّه بالاختبارات مع Express وVitest</h2>
<p><strong>جدول المحتويات</strong></p>
<ol>
<li><a href="#introduction">المقدمة</a></li>
<li><a href="#prerequisites">المتطلبات المسبقة</a></li>
<li><a href="#project-setup">إعداد المشروع</a></li>
<li><a href="#understanding-test-driven-development">فهم التطوير الموجّه بالاختبارات</a></li>
<li><a href="#designing-the-authentication-system">تصميم نظام المصادقة</a></li>
<li><a href="#implementing-the-system-with-tdd">تنفيذ النظام باستخدام TDD</a> <a href="#user-registration">1. تسجيل المستخدم</a> <a href="#user-login">2. تسجيل دخول المستخدم</a> <a href="#user-logout">3. تسجيل خروج المستخدم</a></li>
</ol>
<ul>
<li><a href="#user-registration">1. تسجيل المستخدم</a></li>
<li><a href="#user-login">2. تسجيل دخول المستخدم</a></li>
<li><a href="#user-logout">3. تسجيل خروج المستخدم</a></li>
</ul>
<ol start="7">
<li><a href="#testing-focus-areas">مجالات التركيز في الاختبار</a> <a href="#unit-tests-form-validation-and-encryption-methods">اختبارات الوحدات: التحقق من النماذج وطرق التشفير</a> <a href="#integration-tests-api-endpoints-for-authentication">اختبارات التكامل: نقاط نهاية API للمصادقة</a> <a href="#security-tests-handling-authentication-tokens">اختبارات الأمان: التعامل مع رموز المصادقة</a></li>
</ol>
<ul>
<li><a href="#unit-tests-form-validation-and-encryption-methods">اختبارات الوحدات: التحقق من النماذج وطرق التشفير</a></li>
<li><a href="#integration-tests-api-endpoints-for-authentication">اختبارات التكامل: نقاط نهاية API للمصادقة</a></li>
<li><a href="#security-tests-handling-authentication-tokens">اختبارات الأمان: التعامل مع رموز المصادقة</a></li>
</ul>
<ol start="8">
<li><a href="#running-the-tests">تشغيل الاختبارات</a></li>
<li><a href="#conclusion">الخلاصة</a></li>
<li><a href="#additional-exercises">تمارين إضافية</a></li>
</ol>
<h3 id="المقدمة">المقدمة <span class="content-anchor" id="introduction"></span></h3>
<p>بناء نظام مصادقة آمن جانبًا بالغ الأهمية في كثير من تطبيقات الويب. في هذا الدليل، سنطوّر نظام مصادقة بسيطًا باستخدام <strong>التطوير الموجّه بالاختبارات (TDD)</strong> مع <strong>Express</strong> (إطار تطبيقات ويب لـ Node.js) و<strong>Vitest</strong>، إطار اختبارات JavaScript حديث.</p>
<p><strong>الأهداف:</strong></p>
<ul>
<li>تعلّم كيفية تطبيق TDD في بناء نظام مصادقة.</li>
<li>فهم كيفية كتابة اختبارات الوحدات والتكامل والأمان باستخدام Vitest.</li>
<li>تنفيذ وظائف تسجيل المستخدم وتسجيل الدخول وتسجيل الخروج.</li>
<li>ضمان التعامل الصحيح مع رموز المصادقة.</li>
</ul>
<h3 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h3>
<ul>
<li>معرفة أساسية بـ JavaScript (صياغة ES6+) وNode.js.</li>
<li>إلمام بـ Express.js.</li>
<li>فهم مفاهيم اختبار الوحدات وTDD.</li>
<li>تثبيت Node.js وnpm على جهازك.</li>
</ul>
<h3 id="إعداد-المشروع">إعداد المشروع <span class="content-anchor" id="project-setup"></span></h3>
<ol>
<li><strong>أنشئ دليل مشروع جديدًا</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">mkdir</span><span style="color:#ECC48D"> auth-system-tdd</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> auth-system-tdd</span></span></code></li>
<li><strong>هيّئ npm</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> init</span><span style="color:#82AAFF"> -y</span></span></code></li>
<li><strong>ثبّت الاعتمادات</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#ECC48D"> express</span><span style="color:#ECC48D"> bcrypt</span><span style="color:#ECC48D"> jsonwebtoken</span></span></code> <code>express</code>: إطار تطبيقات ويب. <code>bcrypt</code>: لتجزئة كلمات المرور. <code>jsonwebtoken</code>: لتوليد رموز JWT والتحقق منها.</li>
</ol>
<ul>
<li><code>express</code>: إطار تطبيقات ويب.</li>
<li><code>bcrypt</code>: لتجزئة كلمات المرور.</li>
<li><code>jsonwebtoken</code>: لتوليد رموز JWT والتحقق منها.</li>
</ul>
<ol start="4">
<li><strong>ثبّت اعتمادات التطوير</strong> <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span><span style="color:#ECC48D"> supertest</span></span></code> <code>vitest</code>: إطار اختبارات. <code>supertest</code>: لاختبار نقاط نهاية HTTP.</li>
</ol>
<ul>
<li><code>vitest</code>: إطار اختبارات.</li>
<li><code>supertest</code>: لاختبار نقاط نهاية HTTP.</li>
</ul>
<ol start="5">
<li><strong>بنية المشروع</strong> <code><span class="line"><span style="color:#D6DEEB">auth</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">system</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── app</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── routes</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ │ └── auth</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── controllers</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ │ └── authController</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── models</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── user</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">└── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> ├── unit</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> │ └── auth</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB"> └── integration</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> └── auth</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">integration</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code> <code>src/</code>: يحتوي على شيفرة التطبيق. <code>tests/</code>: يحتوي على ملفات الاختبار.</li>
</ol>
<ul>
<li><code>src/</code>: يحتوي على شيفرة التطبيق.</li>
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
<h3 id="تصميم-نظام-المصادقة">تصميم نظام المصادقة <span class="content-anchor" id="designing-the-authentication-system"></span></h3>
<p><strong>الميزات:</strong></p>
<ul>
<li><strong>تسجيل المستخدم</strong>: يتيح للمستخدمين إنشاء حساب باسم مستخدم وكلمة مرور.</li>
<li><strong>تسجيل دخول المستخدم</strong>: يصادق على المستخدمين ويوفّر رمز JWT.</li>
<li><strong>تسجيل خروج المستخدم</strong>: يُبطل جلسة المستخدم (بالنسبة لـ JWT عديم الحالة، يمكن التعامل مع ذلك في جهة العميل).</li>
</ul>
<p><strong>المكوّنات:</strong></p>
<ul>
<li><strong>التحقق من النموذج</strong>: ضمان أن مدخلات المستخدم تستوفي المعايير.</li>
<li><strong>تشفير كلمة المرور</strong>: تخزين كلمات مرور المستخدمين بشكل آمن باستخدام التجزئة.</li>
<li><strong>التعامل مع رمز JWT</strong>: توليد رموز JSON Web Tokens والتحقق منها لأغراض المصادقة.</li>
</ul>
<h3 id="تنفيذ-النظام-باستخدام-tdd">تنفيذ النظام باستخدام TDD <span class="content-anchor" id="implementing-the-system-with-tdd"></span></h3>
<h4>تسجيل المستخدم <span class="content-anchor" id="user-registration"></span></h4>
<h5>الخطوة 1: اكتب الاختبار (أحمر)</h5>
<p>أنشئ <code>tests/unit/auth.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// tests/unit/auth.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { validateRegistrationData, hashPassword } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../src/controllers/authController&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Auth Controller - Unit Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;validateRegistrationData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should validate correct data&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> data = { <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span> };
      <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">validateRegistrationData</span>(data);
      <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
    });

    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should invalidate data with missing fields&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> data = { <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span> };
      <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">validateRegistrationData</span>(data)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Password is required&#x27;</span>);
    });

    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should invalidate data with weak password&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> data = { <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;pass&#x27;</span> };
      <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">validateRegistrationData</span>(data)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Password is too weak&#x27;</span>);
    });
  });

  <span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;hashPassword&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should hash the password&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> password = <span class="hljs-string">&#x27;Password123&#x27;</span>;
      <span class="hljs-keyword">const</span> hash = <span class="hljs-keyword">await</span> <span class="hljs-title function_">hashPassword</span>(password);
      <span class="hljs-title function_">expect</span>(hash).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBe</span>(password);
      <span class="hljs-title function_">expect</span>(hash).<span class="hljs-title function_">toMatch</span>(<span class="hljs-regexp">/^\\$2[aby]\\$.{56}$/</span>); <span class="hljs-comment">// Regex for bcrypt hash</span>
    });
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر <code>validateRegistrationData</code> بمدخلات صالحة وأخرى غير صالحة.</li>
<li>نختبر <code>hashPassword</code> للتأكد من أنها تجزّئ كلمة المرور بشكل صحيح.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>تفشل الاختبارات لأن <code>validateRegistrationData</code> و<code>hashPassword</code> غير معرّفتين.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h5>
<p>أنشئ <code>src/controllers/authController.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/controllers/authController.js</span>
<span class="hljs-keyword">import</span> bcrypt <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;bcrypt&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">validateRegistrationData</span>(<span class="hljs-params">data</span>) {
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">username</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Username is required&#x27;</span>);
  }
  <span class="hljs-keyword">if</span> (!data.<span class="hljs-property">password</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Password is required&#x27;</span>);
  }
  <span class="hljs-keyword">if</span> (data.<span class="hljs-property">password</span>.<span class="hljs-property">length</span> &lt; <span class="hljs-number">6</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Password is too weak&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">hashPassword</span>(<span class="hljs-params">password</span>) {
  <span class="hljs-keyword">const</span> saltRounds = <span class="hljs-number">10</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> bcrypt.<span class="hljs-title function_">hash</span>(password, saltRounds);
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح الاختبارات.</p>
<h5>الخطوة 5: أعد الهيكلة (إن لزم)</h5>
<p>تأكد من اتساق رسائل الخطأ ومن نظافة الشيفرة.</p>
<h4>تسجيل دخول المستخدم <span class="content-anchor" id="user-login"></span></h4>
<h5>الخطوة 1: اكتب الاختبار (أحمر)</h5>
<p>أضف إلى <code>tests/unit/auth.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { verifyPassword, generateToken } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../src/controllers/authController&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;verifyPassword&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return true for correct password&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> password = <span class="hljs-string">&#x27;Password123&#x27;</span>;
    <span class="hljs-keyword">const</span> hash = <span class="hljs-keyword">await</span> <span class="hljs-title function_">hashPassword</span>(password);
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">verifyPassword</span>(password, hash);
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return false for incorrect password&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> password = <span class="hljs-string">&#x27;Password123&#x27;</span>;
    <span class="hljs-keyword">const</span> hash = <span class="hljs-keyword">await</span> <span class="hljs-title function_">hashPassword</span>(password);
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">verifyPassword</span>(<span class="hljs-string">&#x27;WrongPassword&#x27;</span>, hash);
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
  });
});

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;generateToken&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should generate a JWT token&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> user = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span> };
    <span class="hljs-keyword">const</span> token = <span class="hljs-title function_">generateToken</span>(user);
    <span class="hljs-title function_">expect</span>(token).<span class="hljs-title function_">toBeDefined</span>();
    <span class="hljs-title function_">expect</span>(<span class="hljs-keyword">typeof</span> token).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;string&#x27;</span>);
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر <code>verifyPassword</code> بكلمات مرور صحيحة وأخرى غير صحيحة.</li>
<li>نختبر <code>generateToken</code> للتأكد من أنها تُنشئ رمز JWT.</li>
</ul>
<h5>الخطوة 2: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>تفشل الاختبارات لأن <code>verifyPassword</code> و<code>generateToken</code> غير معرّفتين.</p>
<h5>الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h5>
<p>حدّث <code>src/controllers/authController.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> bcrypt <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;bcrypt&#x27;</span>;
<span class="hljs-keyword">import</span> jwt <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsonwebtoken&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">SECRET_KEY</span> = <span class="hljs-string">&#x27;your_secret_key&#x27;</span>; <span class="hljs-comment">// In production, store this securely</span>

<span class="hljs-comment">// … previous code …</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">verifyPassword</span>(<span class="hljs-params">password, hash</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> bcrypt.<span class="hljs-title function_">compare</span>(password, hash);
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">generateToken</span>(<span class="hljs-params">user</span>) {
  <span class="hljs-keyword">return</span> jwt.<span class="hljs-title function_">sign</span>({ <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span>, <span class="hljs-attr">username</span>: user.<span class="hljs-property">username</span> }, <span class="hljs-variable constant_">SECRET_KEY</span>, { <span class="hljs-attr">expiresIn</span>: <span class="hljs-string">&#x27;1h&#x27;</span> });
}
</code></pre>
<h5>الخطوة 4: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح الاختبارات.</p>
<h5>الخطوة 5: أعد الهيكلة</h5>
<p>تأكد من إدارة المفتاح السري بشكل آمن (مثلًا باستخدام متغيّرات البيئة).</p>
<h4>تسجيل خروج المستخدم <span class="content-anchor" id="user-logout"></span></h4>
<p>بما أننا نستخدم رموز JWT، يمكن التعامل مع تسجيل الخروج في جهة العميل بحذف الرمز. لكن تسجيل الخروج في جهة الخادم (مثلًا بإدراج الرموز في قائمة سوداء) يتطلب بنية تحتية إضافية. للتبسيط، سنفترض أن JWT عديم الحالة ونركّز على تسجيل الخروج في جهة العميل.</p>
<h3 id="مجالات-التركيز-في-الاختبار">مجالات التركيز في الاختبار <span class="content-anchor" id="testing-focus-areas"></span></h3>
<h4>اختبارات الوحدات: التحقق من النماذج وطرق التشفير <span class="content-anchor" id="unit-tests-form-validation-and-encryption-methods"></span></h4>
<p>كتبنا بالفعل اختبارات وحدات لـ:</p>
<ul>
<li><strong>التحقق من النموذج</strong>: ضمان أن بيانات التسجيل تستوفي المعايير.</li>
<li><strong>طرق التشفير</strong>: اختبار تجزئة كلمة المرور والتحقق منها.</li>
</ul>
<h4>اختبارات التكامل: نقاط نهاية API للمصادقة <span class="content-anchor" id="integration-tests-api-endpoints-for-authentication"></span></h4>
<p>سنكتب اختبارات تكامل لاختبار نقاط نهاية API.</p>
<h5>الخطوة 1: أعدّ تطبيق Express</h5>
<p>أنشئ <code>src/app.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/app.js</span>
<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> bodyParser <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;body-parser&#x27;</span>;
<span class="hljs-keyword">import</span> authRoutes <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./routes/auth.js&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();

app.<span class="hljs-title function_">use</span>(bodyParser.<span class="hljs-title function_">json</span>());
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api/auth&#x27;</span>, authRoutes);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app;
</code></pre>
<p>أنشئ <code>src/routes/auth.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/routes/auth.js</span>
<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { register, login } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../controllers/authController.js&#x27;</span>;

<span class="hljs-keyword">const</span> router = express.<span class="hljs-title class_">Router</span>();

router.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/register&#x27;</span>, register);
router.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/login&#x27;</span>, login);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router;
</code></pre>
<p>حدّث <code>src/controllers/authController.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// … previous imports and functions …</span>

<span class="hljs-keyword">const</span> users = []; <span class="hljs-comment">// In-memory user store (replace with a database in production)</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">register</span>(<span class="hljs-params">req, res</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-title function_">validateRegistrationData</span>(req.<span class="hljs-property">body</span>);
    <span class="hljs-keyword">const</span> hashedPassword = <span class="hljs-keyword">await</span> <span class="hljs-title function_">hashPassword</span>(req.<span class="hljs-property">body</span>.<span class="hljs-property">password</span>);
    <span class="hljs-keyword">const</span> user = { <span class="hljs-attr">id</span>: users.<span class="hljs-property">length</span> + <span class="hljs-number">1</span>, <span class="hljs-attr">username</span>: req.<span class="hljs-property">body</span>.<span class="hljs-property">username</span>, <span class="hljs-attr">password</span>: hashedPassword };
    users.<span class="hljs-title function_">push</span>(user);
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;User registered successfully&#x27;</span> });
  } <span class="hljs-keyword">catch</span> (error) {
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span> });
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">login</span>(<span class="hljs-params">req, res</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> user = users.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">username</span> === req.<span class="hljs-property">body</span>.<span class="hljs-property">username</span>);
    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid username or password&#x27;</span>);
    }
    <span class="hljs-keyword">const</span> isValid = <span class="hljs-keyword">await</span> <span class="hljs-title function_">verifyPassword</span>(req.<span class="hljs-property">body</span>.<span class="hljs-property">password</span>, user.<span class="hljs-property">password</span>);
    <span class="hljs-keyword">if</span> (!isValid) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid username or password&#x27;</span>);
    }
    <span class="hljs-keyword">const</span> token = <span class="hljs-title function_">generateToken</span>(user);
    res.<span class="hljs-title function_">json</span>({ token });
  } <span class="hljs-keyword">catch</span> (error) {
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span> });
  }
}
</code></pre>
<h5>الخطوة 2: اكتب اختبارات التكامل (أحمر)</h5>
<p>أنشئ <code>tests/integration/auth.integration.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// tests/integration/auth.integration.test.js</span>
<span class="hljs-keyword">import</span> { describe, it, expect, beforeAll, afterAll } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;supertest&#x27;</span>;
<span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../src/app.js&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Auth Routes - Integration Tests&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should register a new user&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/register&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">201</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>.<span class="hljs-property">message</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;User registered successfully&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should not register a user with existing username&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Register the user first</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/register&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-comment">// Try registering again</span>
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/register&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">400</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>.<span class="hljs-property">error</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Username already exists&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should login a registered user&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Register the user</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/register&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-comment">// Login</span>
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/login&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>.<span class="hljs-property">token</span>).<span class="hljs-title function_">toBeDefined</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should not login with incorrect password&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Register the user</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/register&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-comment">// Attempt to login with wrong password</span>
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/login&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;WrongPassword&#x27;</span>,
    });
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">400</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>.<span class="hljs-property">error</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Invalid username or password&#x27;</span>);
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر نقطتي النهاية <code>/register</code> و<code>/login</code>.</li>
<li>نضمن أن التسجيل وتسجيل الدخول يعملان كما هو متوقع.</li>
</ul>
<h5>الخطوة 3: شغّل الاختبار وشاهده يفشل</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>قد تفشل الاختبارات لأن <code>Username already exists</code> غير معالَج.</p>
<h5>الخطوة 4: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)</h5>
<p>حدّث دالة <code>register</code> في <code>authController.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">register</span>(<span class="hljs-params">req, res</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-title function_">validateRegistrationData</span>(req.<span class="hljs-property">body</span>);
    <span class="hljs-keyword">const</span> existingUser = users.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">username</span> === req.<span class="hljs-property">body</span>.<span class="hljs-property">username</span>);
    <span class="hljs-keyword">if</span> (existingUser) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Username already exists&#x27;</span>);
    }
    <span class="hljs-keyword">const</span> hashedPassword = <span class="hljs-keyword">await</span> <span class="hljs-title function_">hashPassword</span>(req.<span class="hljs-property">body</span>.<span class="hljs-property">password</span>);
    <span class="hljs-keyword">const</span> user = { <span class="hljs-attr">id</span>: users.<span class="hljs-property">length</span> + <span class="hljs-number">1</span>, <span class="hljs-attr">username</span>: req.<span class="hljs-property">body</span>.<span class="hljs-property">username</span>, <span class="hljs-attr">password</span>: hashedPassword };
    users.<span class="hljs-title function_">push</span>(user);
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;User registered successfully&#x27;</span> });
  } <span class="hljs-keyword">catch</span> (error) {
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">400</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span> });
  }
}
</code></pre>
<h5>الخطوة 5: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل الاختبارات.</p>
<h5>الخطوة 6: أعد الهيكلة</h5>
<p>فكّر في نقل مخزن المستخدمين إلى وحدة منفصلة أو في استخدام قاعدة بيانات.</p>
<h4>اختبارات الأمان: التعامل مع رموز المصادقة <span class="content-anchor" id="security-tests-handling-authentication-tokens"></span></h4>
<p>نحتاج إلى ضمان التعامل مع الرموز بشكل آمن.</p>
<h5>الخطوة 1: اكتب الاختبار (أحمر)</h5>
<p>أضف إلى <code>tests/integration/auth.integration.test.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Protected Routes&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should access protected route with valid token&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Register and login the user</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/register&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-keyword">const</span> loginResponse = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/auth/login&#x27;</span>).<span class="hljs-title function_">send</span>({
      <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;testuser&#x27;</span>,
      <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Password123&#x27;</span>,
    });
    <span class="hljs-keyword">const</span> token = loginResponse.<span class="hljs-property">body</span>.<span class="hljs-property">token</span>;

    <span class="hljs-comment">// Access protected route</span>
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app)
      .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/protected&#x27;</span>)
      .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;Authorization&#x27;</span>, <span class="hljs-string">\`Bearer <span class="hljs-subst">\${token}</span>\`</span>);

    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">200</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>.<span class="hljs-property">message</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Protected content&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should not access protected route without token&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app).<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/protected&#x27;</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">401</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>.<span class="hljs-property">error</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Unauthorized&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should not access protected route with invalid token&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">request</span>(app)
      .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/protected&#x27;</span>)
      .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;Authorization&#x27;</span>, <span class="hljs-string">&#x27;Bearer invalidtoken&#x27;</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">401</span>);
    <span class="hljs-title function_">expect</span>(response.<span class="hljs-property">body</span>.<span class="hljs-property">error</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Invalid token&#x27;</span>);
  });
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>نختبر إمكانية الوصول إلى مسار محمي برمز صالح.</li>
<li>نختبر رفض الوصول دون رمز أو برمز غير صالح.</li>
</ul>
<h5>الخطوة 2: نفّذ المسار المحمي</h5>
<p>حدّث <code>src/app.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// … previous code …</span>
<span class="hljs-keyword">import</span> { authenticateToken } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./middleware/authMiddleware.js&#x27;</span>;

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/protected&#x27;</span>, authenticateToken, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  res.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Protected content&#x27;</span> });
});
</code></pre>
<p>أنشئ <code>src/middleware/authMiddleware.js</code>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/middleware/authMiddleware.js</span>
<span class="hljs-keyword">import</span> jwt <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsonwebtoken&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">SECRET_KEY</span> = <span class="hljs-string">&#x27;your_secret_key&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">authenticateToken</span>(<span class="hljs-params">req, res, next</span>) {
  <span class="hljs-keyword">const</span> authHeader = req.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;authorization&#x27;</span>];
  <span class="hljs-keyword">const</span> token = authHeader &amp;&amp; authHeader.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27; &#x27;</span>)[<span class="hljs-number">1</span>];
  <span class="hljs-keyword">if</span> (!token) <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">401</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Unauthorized&#x27;</span> });

  jwt.<span class="hljs-title function_">verify</span>(token, <span class="hljs-variable constant_">SECRET_KEY</span>, <span class="hljs-function">(<span class="hljs-params">err, user</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> res.<span class="hljs-title function_">status</span>(<span class="hljs-number">401</span>).<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid token&#x27;</span> });
    req.<span class="hljs-property">user</span> = user;
    <span class="hljs-title function_">next</span>();
  });
}
</code></pre>
<h5>الخطوة 3: شغّل الاختبار مرة أخرى</h5>
<p>شغّل الاختبار:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>ينبغي أن تنجح كل الاختبارات.</p>
<h5>الخطوة 4: أعد الهيكلة</h5>
<ul>
<li>خزّن <code>SECRET_KEY</code> في متغيّرات البيئة.</li>
<li>تعامل مع انتهاء صلاحية الرمز وتحديثه إن لزم.</li>
</ul>
<h3 id="تشغيل-الاختبارات">تشغيل الاختبارات <span class="content-anchor" id="running-the-tests"></span></h3>
<p>شغّل كل الاختبارات باستخدام:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>
</code></pre>
<p>سينفّذ Vitest كل الاختبارات في دليل <code>tests/</code> ويبلّغ بالنتائج.</p>
<h3 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h3>
<p>باتّباع مبادئ التطوير الموجّه بالاختبارات، بنينا نظام مصادقة أساسيًا باستخدام Express. كتبنا اختبارات وحدات للتحقق من النماذج وطرق التشفير، واختبارات تكامل لنقاط نهاية API، واختبارات أمان للتعامل مع رموز المصادقة. يضمن هذا الأسلوب أن يكون تطبيقنا موثوقًا وآمنًا ويتصرّف كما هو متوقع.</p>
<p><strong>الخلاصات الأساسية:</strong></p>
<ul>
<li><strong>سير عمل TDD:</strong> كتابة الاختبارات أولًا تساعد في تحديد السلوك المتوقع وتؤدي إلى شيفرة أفضل تصميمًا.</li>
<li><strong>Vitest للاختبار:</strong> يوفّر Vitest تجربة اختبار سريعة وحديثة لتطبيقات JavaScript.</li>
<li><strong>اختبار شامل:</strong> الجمع بين اختبارات الوحدات والتكامل والأمان يضمن تطبيقًا متينًا.</li>
</ul>
<div class="exercises"><h3 id="تمارين-إضافية">تمارين إضافية <span class="content-anchor" id="additional-exercises"></span></h3>
<p>لتعزيز نظام المصادقة ومهاراتك في الاختبار أكثر، فكّر في تنفيذ الميزات التالية:</p>
<ol>
<li><strong>وظيفة إعادة تعيين كلمة المرور</strong> نفّذ إعادة تعيين كلمة المرور عبر البريد الإلكتروني. اكتب اختبارات لضمان أمان عملية إعادة التعيين.</li>
</ol>
<ul>
<li>نفّذ إعادة تعيين كلمة المرور عبر البريد الإلكتروني.</li>
<li>اكتب اختبارات لضمان أمان عملية إعادة التعيين.</li>
</ul>
<ol start="2">
<li><strong>التحقق من الحساب</strong> أرسل بريدًا إلكترونيًا للتحقق عند التسجيل. اكتب اختبارات للتحقق من أن الحسابات غير المؤكدة لا تستطيع تسجيل الدخول.</li>
</ol>
<ul>
<li>أرسل بريدًا إلكترونيًا للتحقق عند التسجيل.</li>
<li>اكتب اختبارات للتحقق من أن الحسابات غير المؤكدة لا تستطيع تسجيل الدخول.</li>
</ul>
<ol start="3">
<li><strong>التحكم في الوصول القائم على الأدوار</strong> نفّذ أدوارًا (مثل مستخدم، مدير) وأذونات. اكتب اختبارات لضمان فرض التحكم في الوصول بشكل صحيح.</li>
</ol>
<ul>
<li>نفّذ أدوارًا (مثل مستخدم، مدير) وأذونات.</li>
<li>اكتب اختبارات لضمان فرض التحكم في الوصول بشكل صحيح.</li>
</ul>
<ol start="4">
<li><strong>استخدام قاعدة بيانات</strong> استبدل مخزن المستخدمين في الذاكرة بقاعدة بيانات (مثل MongoDB أو PostgreSQL). اكتب اختبارات تتفاعل مع قاعدة البيانات، ربما باستخدام قاعدة بيانات اختبار.</li>
</ol>
<ul>
<li>استبدل مخزن المستخدمين في الذاكرة بقاعدة بيانات (مثل MongoDB أو PostgreSQL).</li>
<li>اكتب اختبارات تتفاعل مع قاعدة البيانات، ربما باستخدام قاعدة بيانات اختبار.</li>
</ul>
<ol start="5">
<li><strong>إدارة الجلسات</strong> نفّذ إدارة الجلسات لإبطال الرموز (مثل إدراجها في قائمة سوداء). اكتب اختبارات لضمان التعامل مع الجلسات بشكل صحيح.</li>
</ol>
<ul>
<li>نفّذ إدارة الجلسات لإبطال الرموز (مثل إدراجها في قائمة سوداء).</li>
<li>اكتب اختبارات لضمان التعامل مع الجلسات بشكل صحيح.</li>
</ul>
<ol start="6">
<li><strong>تعقيم المدخلات</strong> تأكد من تعقيم كل المدخلات لمنع هجمات الحقن. اكتب اختبارات للتحقق من أن النظام آمن ضد مثل هذه الهجمات.</li>
</ol>
<ul>
<li>تأكد من تعقيم كل المدخلات لمنع هجمات الحقن.</li>
<li>اكتب اختبارات للتحقق من أن النظام آمن ضد مثل هذه الهجمات.</li>
</ul>
<ol start="7">
<li><strong>تحديد معدّل الطلبات</strong> نفّذ تحديد معدّل الطلبات للحماية من هجمات القوة الغاشمة. اكتب اختبارات لضمان عمل تحديد معدّل الطلبات كما هو متوقع.</li>
</ol>
<ul>
<li>نفّذ تحديد معدّل الطلبات للحماية من هجمات القوة الغاشمة.</li>
<li>اكتب اختبارات لضمان عمل تحديد معدّل الطلبات كما هو متوقع.</li>
</ul>
<ol start="8">
<li><strong>تدقيق الأمان</strong> استخدم أدوات لتدقيق شيفرتك بحثًا عن ثغرات أمنية. عالج أي مشكلات تجدها واكتب اختبارات لمنع التراجعات.</li>
</ol>
<ul>
<li>استخدم أدوات لتدقيق شيفرتك بحثًا عن ثغرات أمنية.</li>
<li>عالج أي مشكلات تجدها واكتب اختبارات لمنع التراجعات.</li>
</ul>
</div>`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,e as html,l as slug,t as title};
