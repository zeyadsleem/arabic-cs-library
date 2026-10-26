const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="testing-with-mock-service-worker",t="عامل الخدمة المُحاكى (Mock Service Worker)",p=[{depth:2,id:"ما-هو-mock-service-worker-msw",text:"ما هو Mock Service Worker (MSW)؟"},{depth:2,id:"لماذا-تستخدم-msw-مع-vitest",text:"لماذا تستخدم MSW مع Vitest؟"},{depth:2,id:"إعداد-msw-مع-vitest",text:"إعداد MSW مع Vitest"},{depth:3,id:"تثبيت-msw",text:"تثبيت MSW"},{depth:3,id:"تهيئة-msw-في-مشروعك",text:"تهيئة MSW في مشروعك"},{depth:3,id:"إعداد-الخادم-للاختبار",text:"إعداد الخادم للاختبار"},{depth:3,id:"تهيئة-vitest-لاستخدام-msw",text:"تهيئة Vitest لاستخدام MSW"},{depth:2,id:"كتابة-الاختبارات-باستخدام-msw-وvitest",text:"كتابة الاختبارات باستخدام MSW وVitest"},{depth:3,id:"مثال-اختبار-مكون-يجلب-البيانات",text:"مثال: اختبار مكوّن يجلب البيانات"},{depth:3,id:"مثال-اختبار-معالجة-الأخطاء",text:"مثال: اختبار معالجة الأخطاء"},{depth:2,id:"أفضل-الممارسات-مع-msw",text:"أفضل الممارسات مع MSW"},{depth:3,id:"تمركز-معالجات-الطلبات",text:"تمركز معالجات الطلبات"},{depth:3,id:"استخدم-معالجات-طلبات-سياقية-لاختبارات-محددة",text:"استخدم معالجات طلبات سياقية لاختبارات محددة"},{depth:3,id:"تحقق-من-الطلبات-في-الاختبارات",text:"تحقق من الطلبات في الاختبارات"},{depth:3,id:"تعامل-مع-الطلبات-غير-المعالجة",text:"تعامل مع الطلبات غير المعالجة"},{depth:3,id:"استخدم-typescript-لأمان-أنواع-أفضل-اختياري",text:"استخدم TypeScript لأمان أنواع أفضل (اختياري)"},{depth:2,id:"المزالق-المحتملة-وكيفية-تجنبها",text:"المزالق المحتملة وكيفية تجنبها"},{depth:3,id:"نسيان-إعادة-تعيين-المعالجات",text:"نسيان إعادة تعيين المعالجات"},{depth:3,id:"محاكاة-استجابات-منسقة-بشكل-خاطئ",text:"محاكاة استجابات منسّقة بشكل خاطئ"},{depth:3,id:"تجاهل-الطلبات-غير-المعالجة",text:"تجاهل الطلبات غير المعالجة"},{depth:3,id:"الإفراط-في-المحاكاة",text:"الإفراط في المحاكاة"},{depth:2,id:"أمثلة-عملية",text:"أمثلة عملية"},{depth:3,id:"اختبار-مكون-بنداءات-متعددة-لواجهة-برمجة-التطبيقات",text:"اختبار مكوّن بنداءات متعددة لواجهة برمجة التطبيقات"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:3,id:"النقاط-الرئيسية",text:"النقاط الرئيسية"},{depth:3,id:"متى-تستخدم-msw",text:"متى تستخدم MSW"},{depth:3,id:"القيود-المحتملة",text:"القيود المحتملة"}],e=`<p>محاكاة طلبات الشبكة الخارجية جزء حاسم من اختبار التطبيقات التي تعتمد على واجهات برمجة التطبيقات. <strong>Mock Service Worker (MSW)</strong> أداة قوية تتيح لك اعتراض طلبات الشبكة ومحاكاتها على مستوى الشبكة. عند دمجها مع <strong>Vitest</strong>، إطار اختبار JavaScript سريع وحديث، يمكنك إنشاء اختبارات متينة وموثوقة لتطبيقاتك.</p>
<p>يستكشف هذا المقال كيفية استخدام MSW مع Vitest لمحاكاة نداءات واجهات برمجة التطبيقات بفعالية. سنغطي الإعداد والتنفيذ وأفضل الممارسات والمزالق المحتملة، بما يساعدك على فهم كيفية دمج MSW في استراتيجية الاختبار لديك.</p>
<h2 id="ما-هو-mock-service-worker-msw">ما هو Mock Service Worker (MSW)؟</h2>
<p>MSW مكتبة JavaScript تتيح لك محاكاة طلبات واجهات برمجة التطبيقات باعتراضها على مستوى الشبكة. تعمل في بيئتي المتصفح وNode.js معًا، ما يتيح لك:</p>
<ul>
<li>محاكاة واجهات REST وGraphQL.</li>
<li>محاكاة استجابات خادم مختلفة، بما في ذلك الأخطاء.</li>
<li>إبقاء اختباراتك قريبة من السيناريوهات الواقعية عبر عدم تغيير الشيفرة الفعلية التي تجري الطلبات.</li>
</ul>
<h2 id="لماذا-تستخدم-msw-مع-vitest">لماذا تستخدم MSW مع Vitest؟</h2>
<ul>
<li><strong>المحاكاة على مستوى الشبكة</strong>: تعترض MSW طلبات الشبكة الفعلية، ما يوفر ظروف اختبار أكثر واقعية.</li>
<li><strong>المرونة</strong>: محاكاة استجابات مختلفة بسهولة دون تغيير الشيفرة قيد الاختبار.</li>
<li><strong>قابلية الصيانة</strong>: أبقِ اختباراتك نظيفة بتجنب البدائل المُحاكاة المضمّنة في الشيفرة أو إعدادات المحاكاة المعقدة.</li>
<li><strong>الاتساق</strong>: استخدم نهج المحاكاة نفسه لبيئتي التطوير والاختبار.</li>
</ul>
<h2 id="إعداد-msw-مع-vitest">إعداد MSW مع Vitest</h2>
<h3 id="تثبيت-msw">تثبيت MSW</h3>
<pre><code class="language-bash">npm install --save-dev msw
</code></pre>
<h3 id="تهيئة-msw-في-مشروعك">تهيئة MSW في مشروعك</h3>
<p>أنشئ دليل <code>src/mocks</code> وأعدّ المعالجات (handlers) لنقاط نهاية واجهة برمجة التطبيقات لديك.</p>
<p><strong>مثال: تعريف المعالجات</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/mocks/handlers.js</span>
<span class="hljs-keyword">import</span> { rest } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handlers = [
  <span class="hljs-comment">// Mock a GET request to /api/user</span>
  rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/user&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>), ctx.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span> }));
  }),
  <span class="hljs-comment">// Mock a POST request to /api/login</span>
  rest.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/login&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { username } = req.<span class="hljs-property">body</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>), ctx.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">\`Welcome, <span class="hljs-subst">\${username}</span>!\`</span> }));
  }),
];
</code></pre>
<h3 id="إعداد-الخادم-للاختبار">إعداد الخادم للاختبار</h3>
<p>أنشئ ملفًا لتهيئة خادم MSW للاختبار.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// src/mocks/server.js</span>
<span class="hljs-keyword">import</span> { setupServer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw/node&#x27;</span>;
<span class="hljs-keyword">import</span> { handlers } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./handlers&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> server = <span class="hljs-title function_">setupServer</span>(…handlers);
</code></pre>
<h3 id="تهيئة-vitest-لاستخدام-msw">تهيئة Vitest لاستخدام MSW</h3>
<p>في ملف إعداد اختباراتك (مثل <code>setupTests.js</code>)، ابدأ الخادم قبل تشغيل الاختبارات ونظّف بعده.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// setupTests.js</span>
<span class="hljs-keyword">import</span> { beforeAll, afterEach, afterAll } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { server } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./src/mocks/server&#x27;</span>;

<span class="hljs-comment">// Start the server before all tests</span>
<span class="hljs-title function_">beforeAll</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">listen</span>({ <span class="hljs-attr">onUnhandledRequest</span>: <span class="hljs-string">&#x27;error&#x27;</span> }));

<span class="hljs-comment">// Reset any request handlers that are declared as a part of our tests</span>
<span class="hljs-comment">// (i.e. for testing one-time error scenarios)</span>
<span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">resetHandlers</span>());

<span class="hljs-comment">// Clean up after the tests are finished</span>
<span class="hljs-title function_">afterAll</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">close</span>());
</code></pre>
<p>حدّث <code>vitest.config.js</code> لتضمين ملف الإعداد:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// vitest.config.js</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest/config&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">test</span>: {
    <span class="hljs-attr">environment</span>: <span class="hljs-string">&#x27;jsdom&#x27;</span>,
    <span class="hljs-attr">setupFiles</span>: <span class="hljs-string">&#x27;./setupTests.js&#x27;</span>,
  },
});
</code></pre>
<h2 id="كتابة-الاختبارات-باستخدام-msw-وvitest">كتابة الاختبارات باستخدام MSW وVitest</h2>
<h3 id="مثال-اختبار-مكون-يجلب-البيانات">مثال: اختبار مكوّن يجلب البيانات</h3>
<p>افترض أن لديك مكوّن React يجلب بيانات المستخدم:</p>
<pre><code class="language-jsx"><span class="hljs-comment">// UserProfile.jsx</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/user&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setUser);
  }, []);

  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading…<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><strong>ملف الاختبار:</strong></p>
<pre><code class="language-jsx"><span class="hljs-comment">// UserProfile.test.jsx</span>
<span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserProfile</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./UserProfile&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;renders user profile after fetching data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-comment">// Render the component</span>
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> /&gt;</span></span>);

  <span class="hljs-comment">// Verify loading state</span>
  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-regexp">/loading/i</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

  <span class="hljs-comment">// Wait for the user data to be displayed</span>
  <span class="hljs-keyword">const</span> userName = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findByText</span>(<span class="hljs-string">&#x27;John Doe&#x27;</span>);
  <span class="hljs-title function_">expect</span>(userName).<span class="hljs-title function_">toBeInTheDocument</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>يُصيّر الاختبار مكوّن <code>UserProfile</code>.</li>
<li>يتحقق من حالة التحميل.</li>
<li>يستخدم <code>findByText</code> للانتظار حتى التحديث غير المتزامن.</li>
<li>تعترض MSW طلب <code>/api/user</code> وتعيد الاستجابة المُحاكاة المعرّفة في <code>handlers.js</code>.</li>
</ul>
<h3 id="مثال-اختبار-معالجة-الأخطاء">مثال: اختبار معالجة الأخطاء</h3>
<p>يمكنك محاكاة استجابات الأخطاء لاختبار كيفية تعامل مكوّنك مع الإخفاقات.</p>
<p><strong>عدّل الاختبار:</strong></p>
<pre><code class="language-jsx"><span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { rest } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw&#x27;</span>;
<span class="hljs-keyword">import</span> { server } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../mocks/server&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserProfile</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./UserProfile&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;handles server error&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-comment">// Override the default handler for this test</span>
  server.<span class="hljs-title function_">use</span>(
    rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/user&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">500</span>));
    }),
  );

  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> /&gt;</span></span>);

  <span class="hljs-comment">// Wait for error message</span>
  <span class="hljs-keyword">const</span> errorMessage = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findByText</span>(<span class="hljs-regexp">/failed to load user/i</span>);
  <span class="hljs-title function_">expect</span>(errorMessage).<span class="hljs-title function_">toBeInTheDocument</span>();
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li><strong><code>server.use(…)</code></strong>: يتجاوز معالج <code>/api/user</code> لهذا الاختبار، محاكيًا خطأ خادم.</li>
<li>ينبغي أن يتعامل المكوّن مع الخطأ ويعرض رسالة مناسبة.</li>
<li>يتحقق الاختبار من عرض رسالة الخطأ.</li>
</ul>
<h2 id="أفضل-الممارسات-مع-msw">أفضل الممارسات مع MSW</h2>
<h3 id="تمركز-معالجات-الطلبات">تمركز معالجات الطلبات</h3>
<p>عرّف كل معالجات طلباتك في مكان واحد (<code>handlers.js</code>) للحفاظ على تنظيم بدائلك المُحاكاة.</p>
<p><strong>الفوائد:</strong></p>
<ul>
<li><strong>قابلية الصيانة</strong>: تحديث استجابات المحاكاة وإدارتها أسهل.</li>
<li><strong>قابلية إعادة الاستخدام</strong>: يمكن إعادة استخدام المعالجات عبر اختبارات متعددة.</li>
</ul>
<h3 id="استخدم-معالجات-طلبات-سياقية-لاختبارات-محددة">استخدم معالجات طلبات سياقية لاختبارات محددة</h3>
<p>تجاوز المعالجات داخل الاختبارات لمحاكاة سيناريوهات مختلفة.</p>
<pre><code class="language-javascript">server.<span class="hljs-title function_">use</span>(
  rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/user&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">404</span>), ctx.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;User not found&#x27;</span> }));
  }),
);
</code></pre>
<p><strong>الفوائد:</strong></p>
<ul>
<li><strong>المرونة</strong>: اختبر الحالات الطرفية وظروف الأخطاء دون التأثير في الاختبارات الأخرى.</li>
<li><strong>العزل</strong>: لا تؤثر التغييرات في المعالجات داخل اختبار واحد على الآخرين.</li>
</ul>
<h3 id="تحقق-من-الطلبات-في-الاختبارات">تحقق من الطلبات في الاختبارات</h3>
<p>يمكنك التحقق من أن طلبات معينة جرى إرسالها بمعاملات متوقعة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { rest } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw&#x27;</span>;
<span class="hljs-keyword">import</span> { server } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../mocks/server&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;submits form data correctly&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">let</span> requestBody;

  server.<span class="hljs-title function_">use</span>(
    rest.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/submit&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
      requestBody = req.<span class="hljs-property">body</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>));
    }),
  );

  <span class="hljs-comment">// … render component and trigger form submission …</span>

  <span class="hljs-title function_">expect</span>(requestBody).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> });
});
</code></pre>
<h3 id="تعامل-مع-الطلبات-غير-المعالجة">تعامل مع الطلبات غير المعالجة</h3>
<p>هيّئ MSW لتنبيهك إلى الطلبات غير المعالجة، بما يساعد في اكتشاف المعالجات المفقودة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">beforeAll</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">listen</span>({ <span class="hljs-attr">onUnhandledRequest</span>: <span class="hljs-string">&#x27;warn&#x27;</span> }));
</code></pre>
<p>خيارات <code>onUnhandledRequest</code>:</p>
<ul>
<li><code>'bypass'</code>: السلوك الافتراضي، تمضي الطلبات غير المعالجة كما هي.</li>
<li><code>'warn'</code>: يسجّل تحذيرًا للطلبات غير المعالجة.</li>
<li><code>'error'</code>: يرفع خطأ للطلبات غير المعالجة.</li>
</ul>
<h3 id="استخدم-typescript-لأمان-أنواع-أفضل-اختياري">استخدم TypeScript لأمان أنواع أفضل (اختياري)</h3>
<p>إذا كنت تستخدم TypeScript، توفر MSW تعريفات أنواع لتحسين تجربة التطوير لديك.</p>
<h2 id="المزالق-المحتملة-وكيفية-تجنبها">المزالق المحتملة وكيفية تجنبها</h2>
<h3 id="نسيان-إعادة-تعيين-المعالجات">نسيان إعادة تعيين المعالجات</h3>
<p><strong>المشكلة</strong>: تستمر المعالجات المتجاوَزة عبر الاختبارات، ما يسبب سلوكًا غير متوقع.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>استخدم <code>server.resetHandlers()</code> في <code>afterEach</code> لإعادة تعيين المعالجات بعد كل اختبار.</li>
</ul>
<pre><code class="language-javascript"><span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> server.<span class="hljs-title function_">resetHandlers</span>());
</code></pre>
<h3 id="محاكاة-استجابات-منسقة-بشكل-خاطئ">محاكاة استجابات منسّقة بشكل خاطئ</h3>
<p><strong>المشكلة</strong>: إرجاع استجابات لا تطابق التنسيق المتوقع قد يسبب فشل الاختبارات.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>تأكد من أن الاستجابات المُحاكاة تطابق الشكل والبنية المتوقعين من الشيفرة قيد الاختبار.</li>
</ul>
<h3 id="تجاهل-الطلبات-غير-المعالجة">تجاهل الطلبات غير المعالجة</h3>
<p><strong>المشكلة</strong>: يمكن أن تؤدي المعالجات المفقودة لنداءات واجهة برمجة التطبيقات إلى طلبات غير معالجة، ما يجعل الاختبارات تنجح حين ينبغي أن تفشل.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>اضبط <code>onUnhandledRequest</code> على <code>'error'</code> أثناء الاختبار لاكتشاف الطلبات غير المعالجة.</li>
</ul>
<h3 id="الإفراط-في-المحاكاة">الإفراط في المحاكاة</h3>
<p><strong>المشكلة</strong>: قد يؤدي الإفراط في المحاكاة إلى اختبارات لا تعكس السلوك الواقعي.</p>
<p><strong>الحل</strong>:</p>
<ul>
<li>حاكِ طلبات الشبكة الخارجية فقط.</li>
<li>تجنب محاكاة الدوال أو الوحدات الداخلية دون داعٍ.</li>
</ul>
<h2 id="أمثلة-عملية">أمثلة عملية</h2>
<h3 id="اختبار-مكون-بنداءات-متعددة-لواجهة-برمجة-التطبيقات">اختبار مكوّن بنداءات متعددة لواجهة برمجة التطبيقات</h3>
<pre><code class="language-jsx"><span class="hljs-comment">// Dashboard.jsx</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [notifications, setNotifications] = <span class="hljs-title function_">useState</span>([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/user&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setUser);

    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/notifications&#x27;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setNotifications);
  }, []);

  <span class="hljs-keyword">if</span> (!user || notifications.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading…<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome, {user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {notifications.map((n) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{n.id}</span>&gt;</span>{n.message}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><strong>المعالجات:</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// handlers.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handlers = [
  rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/user&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>), ctx.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> }));
  }),
  rest.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/notifications&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res, ctx</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">res</span>(
      ctx.<span class="hljs-title function_">status</span>(<span class="hljs-number">200</span>),
      ctx.<span class="hljs-title function_">json</span>([
        { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Notification 1&#x27;</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Notification 2&#x27;</span> },
      ]),
    );
  }),
];
</code></pre>
<p><strong>الاختبار:</strong></p>
<pre><code class="language-jsx"><span class="hljs-comment">// Dashboard.test.jsx</span>
<span class="hljs-keyword">import</span> { render, screen } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { expect, test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Dashboard</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./Dashboard&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;renders user and notifications&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span> /&gt;</span></span>);

  <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-regexp">/loading/i</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

  <span class="hljs-keyword">const</span> welcomeMessage = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findByText</span>(<span class="hljs-regexp">/welcome, alice/i</span>);
  <span class="hljs-title function_">expect</span>(welcomeMessage).<span class="hljs-title function_">toBeInTheDocument</span>();

  <span class="hljs-keyword">const</span> notificationItems = <span class="hljs-keyword">await</span> screen.<span class="hljs-title function_">findAllByRole</span>(<span class="hljs-string">&#x27;listitem&#x27;</span>);
  <span class="hljs-title function_">expect</span>(notificationItems).<span class="hljs-title function_">toHaveLength</span>(<span class="hljs-number">2</span>);
});
</code></pre>
<p><strong>الشرح:</strong></p>
<ul>
<li>تتعامل MSW مع طلبي <code>/api/user</code> و<code>/api/notifications</code> معًا.</li>
<li>يتحقق الاختبار من تصيير بيانات المستخدم والإشعارات معًا بشكل صحيح.</li>
</ul>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>استخدام Mock Service Worker مع Vitest يوفر طريقة قوية ومرنة لمحاكاة طلبات الشبكة في اختباراتك. باعتراض الطلبات على مستوى الشبكة، تتيح لك MSW إنشاء اختبارات واقعية وقابلة للصيانة تحاكي سلوك التطبيق الفعلي عن كثب.</p>
<h3 id="النقاط-الرئيسية">النقاط الرئيسية</h3>
<h4>فوائد MSW</h4>
<ul>
<li>تحاكي طلبات الشبكة على مستوى الشبكة.</li>
<li>تعمل بسلاسة في بيئتي المتصفح وNode.js معًا.</li>
<li>تبسّط اختبار المكوّنات التي تعتمد على واجهات برمجة تطبيقات خارجية.</li>
</ul>
<h4>أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h4>
<ul>
<li>مركّز معالجات الطلبات من أجل قابلية الصيانة.</li>
<li>استخدم معالجات سياقية لمحاكاة سيناريوهات مختلفة.</li>
<li>تحقق من الطلبات والاستجابات داخل الاختبارات.</li>
<li>تعامل مع الطلبات غير المعالجة لاكتشاف المعالجات المفقودة.</li>
</ul>
<h4>تجنب المزالق</h4>
<ul>
<li>أعد تعيين المعالجات بين الاختبارات لمنع التلوث بينها.</li>
<li>تأكد من أن الاستجابات المُحاكاة تطابق التنسيقات المتوقعة.</li>
<li>كن حذرًا من الإفراط في المحاكاة.</li>
</ul>
<p>بدمج MSW في سير عمل الاختبار لديك مع Vitest، يمكنك تحسين موثوقية اختباراتك ومتانتها، بما يؤدي في النهاية إلى تطبيقات أعلى جودة.</p>
<h3 id="متى-تستخدم-msw">متى تستخدم MSW</h3>
<ul>
<li><strong>المكوّنات المعتمدة على واجهات برمجة التطبيقات</strong>: عند اختبار مكوّنات تجري طلبات HTTP إلى واجهات خارجية.</li>
<li><strong>سيناريوهات معالجة الأخطاء</strong>: لمحاكاة أخطاء الخادم واختبار كيفية استجابة تطبيقك.</li>
<li><strong>بنى استجابات معقدة</strong>: عند التعامل مع استجابات واجهة برمجة تطبيقات معقدة أو كبيرة يكون محاكاتها يدويًا مرهقًا.</li>
</ul>
<h3 id="القيود-المحتملة">القيود المحتملة</h3>
<ul>
<li><strong>منحنى التعلم</strong>: يتطلب فهم كيفية اعتراض MSW للطلبات وكيفية تهيئة المعالجات.</li>
<li><strong>عبء الإعداد</strong>: قد يكون الإعداد الأولي أكثر تعقيدًا مقارنة بالمحاكاة البسيطة، لكنه يثمر على المدى الطويل.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
