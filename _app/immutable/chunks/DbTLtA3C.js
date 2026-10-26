const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="cross-browser-testing-with-playwright",p="الاختبارات عبر المتصفحات مع Playwright (Cross-Browser Tests with Playwright)",l=[{depth:2,id:"تثبيت-vitest-مع-playwright",text:"تثبيت Vitest مع Playwright"},{depth:2,id:"تهيئة-vitest-لـ-playwright",text:"تهيئة Vitest لـ Playwright"},{depth:2,id:"كتابة-اختبار-عبر-المتصفحات",text:"كتابة اختبار عبر المتصفحات"},{depth:2,id:"تشغيل-الاختبارات",text:"تشغيل الاختبارات"},{depth:2,id:"اختبر-في-متصفحات-متعددة-في-الوقت-نفسه",text:"اختبر في متصفحات متعددة في الوقت نفسه"},{depth:2,id:"خاتمة",text:"خاتمة"}],e=`<p>لنتحدث عن الاختبار عبر المتصفحات، لأننا لنكن صادقين، احتمال أن يستخدم تطبيقك نسخة Chrome الأحدث فقط طوال الوقت يقارب احتمال إنهاء يوم جمعة دون الاصطدام بـ<em>تعارض دمج</em> واحد على الأقل. لديك مستخدمون بإعدادات مختلفة — Safari وFirefox وEdge، وربما حتى IE11 (مقرف).</p>
<p>لنستكشف طريقة سريعة وعملية لإعداد الاختبار عبر المتصفحات حتى تتعامل مع غرائب المتصفحات دون النقر بغضب إلى النسيان.</p>
<h2 id="تثبيت-vitest-مع-playwright">تثبيت Vitest مع Playwright</h2>
<p>لاختبار تطبيق عبر متصفحات متعددة، نحتاج إلى أداة أتمتة متصفح بلا واجهة (headless) لمحاكاتها. سنستخدم <strong>Playwright</strong> لأنه يتيح تشغيل الاختبارات في متصفحات مختلفة مثل Chrome (أو شقيقه الخجول Chromium) وFirefox وWebKit (يغطي Safari). أفضل جزء؟ يتصل مباشرة بإعداد Vitest لديك.</p>
<p>أولًا، تحتاج إلى جعل Vitest وPlaywright يعملان في وئام كوني:</p>
<pre><code class="language-bash">npm install vitest @playwright/test
</code></pre>
<p>يمنحك ذلك وصولًا إلى متصفحات Playwright المؤتمتة داخل Vitest. مثل زبدة الفول السوداني والمربى، لكن لاختبار JavaScript.</p>
<h2 id="تهيئة-vitest-لـ-playwright">تهيئة Vitest لـ Playwright</h2>
<p>التالي: إدارة بيئات المتصفح مع Vitest. ومع ذلك، قبل أن نقفز، لنعدّ تهيئة Playwright. أنشئ ملف <code>playwright.config.ts</code> في الدليل الجذري:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">webServer</span>: {
    <span class="hljs-attr">command</span>: <span class="hljs-string">&#x27;npm run dev&#x27;</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>,
  },
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">browserName</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>, <span class="hljs-comment">// default browser, we&#x27;ll override this in our tests</span>
    <span class="hljs-attr">headless</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// no need to pop open an actual browser tab</span>
  },
});
</code></pre>
<p>تأكد من أن خادمك المحلي يعمل على المنفذ 3000. يمكنك تغيير ذلك حسب إعدادك. تهيئة Playwright المدمجة مفيدة جدًا هنا لأنها تعرف كيفية التحكم في إعدادات المتصفح.</p>
<h2 id="كتابة-اختبار-عبر-المتصفحات">كتابة اختبار عبر المتصفحات</h2>
<p>الآن، لنكتب اختبار ميزة ونشغّله عبر مجموعة متصفحات.</p>
<p>أولًا، في ملف اختبارك، استورد ما نحتاجه للاختبار المؤتمت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Cross-browser button test&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should render a button in Chromium&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>);
    <span class="hljs-keyword">const</span> button = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;button&#x27;</span>);
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(button).<span class="hljs-title function_">toHaveText</span>(<span class="hljs-string">&#x27;Submit&#x27;</span>);
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should render a button in Firefox&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>);
    <span class="hljs-keyword">const</span> button = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;button&#x27;</span>);
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(button).<span class="hljs-title function_">toHaveText</span>(<span class="hljs-string">&#x27;Submit&#x27;</span>);
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should render a button in WebKit&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>);
    <span class="hljs-keyword">const</span> button = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">locator</span>(<span class="hljs-string">&#x27;button&#x27;</span>);
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(button).<span class="hljs-title function_">toHaveText</span>(<span class="hljs-string">&#x27;Submit&#x27;</span>);
  });
});
</code></pre>
<p>يمكنك أن تتفنن أكثر في هذا، لكننا نحاول إبقاءه بسيطًا الآن. هنا، يجبر Vitest كروم (عبر <code>chromium</code>) وFirefox وWebKit (مرحبًا Safari!) على الذهاب إلى <code>localhost:3000</code> والتحقق من وجود زر مكتوب عليه «Submit». إنه مثل تسجيل حضور لكل المتصفحات الرئيسية.</p>
<h2 id="تشغيل-الاختبارات">تشغيل الاختبارات <span class="content-anchor" id="running-the-tests"></span></h2>
<p>لبدء اختباراتك، أنشئ سكربتًا بسيطًا في <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;test:e2e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vitest run&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم شغّل السكربت بـ:</p>
<pre><code class="language-bash">npm run <span class="hljs-built_in">test</span>:e2e
</code></pre>
<p>سيطلق Vitest سكربتات Playwright، ويحضر متصفحات افتراضية، ويشغّل الاختبارات. لا تنبثق المتصفحات فعليًا على شاشتك لأننا في وضع <code>headless</code>، لكن ثق بي — إنها تقوم بالعمل الشاق في الخلفية.</p>
<h2 id="اختبر-في-متصفحات-متعددة-في-الوقت-نفسه">اختبر في متصفحات متعددة في الوقت نفسه</h2>
<p>إذا كنت تفضّل <strong>اختبار متصفحات متعددة على التوازي</strong>، يمكنك تعديل الصياغة بحلقات أو ميزة <code>projects</code> في Playwright. يستطيع Playwright تشغيل الاختبارات عبر متصفحات متعددة مثل ساحر متعدد المهام، دون أن يجعلك تحرق دورات دماغية إضافية:</p>
<pre><code class="language-typescript">test.<span class="hljs-title function_">use</span>({ <span class="hljs-attr">browserName</span>: <span class="hljs-string">&#x27;webkit&#x27;</span> });
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;webkit test&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;https://example.com&#x27;</span>);
  <span class="hljs-comment">// Your test here for WebKit</span>
});
test.<span class="hljs-title function_">use</span>({ <span class="hljs-attr">browserName</span>: <span class="hljs-string">&#x27;firefox&#x27;</span> });
<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;firefox test&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;https://example.com&#x27;</span>);
  <span class="hljs-comment">// Your test here for Firefox</span>
});
</code></pre>
<p>هذا يتنقل بكفاءة عبر اختبارات المتصفحات فلا تزدحم <code>test.describe</code> لديك.</p>
<h2 id="خاتمة">خاتمة</h2>
<p>الشيء الرائع هو أن Vitest يتيح لـ Playwright القيام بمعظم العمل الشاق، بتشغيل تطبيقك داخل المتصفحات المحاكاة بأقل إعداد. لا تحصل على تغذية راجعة أسرع فحسب، بل لديك أيضًا تغطية جدية عبر المتصفحات الرئيسية دون تثبيت نصف دستة من الأجهزة الافتراضية أو الاحتفاظ بنسخة قديمة من IE.</p>
<p>هل ما زال الاختبار عبر المتصفحات مؤلمًا؟ آه، قليلًا. لكن على الأقل لدينا الأدوات التي تساعد في جعله مؤلمًا <em>بالقدر الكافي</em>.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,t as slug,p as title};
