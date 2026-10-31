const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",e="standalone-remotes",l="الوحدات البعيدة المستقلة",t=[{depth:2,id:"لماذا-يهم-النمط-المستقل",text:"لماذا يهم النمط المستقل"},{depth:2,id:"كيف-يعمل",text:"كيف يعمل"},{depth:2,id:"بيانات-محاكاة-مع-msw",text:"بيانات مُحاكاة مع MSW"},{depth:2,id:"فجوة-المصادقة",text:"فجوة المصادقة"},{depth:2,id:"انحراف-النمط-المستقل",text:"انحراف النمط المستقل"},{depth:2,id:"الوحدة-البعيدة-المستقلة-الدنيا",text:"الوحدة البعيدة المستقلة الدنيا"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"الوحدات-البعيدة-المستقلة",text:"الوحدات البعيدة المستقلة"},{depth:3,id:"انحراف-النمط-المستقل-1",text:"انحراف النمط المستقل"}],p=`<p>في <a href="https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise">تمرين التركيب وقت التشغيل</a>، تعمل وحدة التحليلات البعيدة على <code>localhost:3001</code> ويحمّلها المضيف وقت التشغيل. لكن إن زرت <code>localhost:3001</code> مباشرةً، سترى لوحة التحليلات تعمل بذاتها—بلا حاجة إلى مضيف. فلديها هيكل HTML الخاص بها، وبياناتها المُحاكاة عبر <a href="https://mswjs.io/">MSW</a>، ونقطة دخولها الخاصة. فالوحدة البعيدة تطبيق مستقل <em>يكشف أيضًا</em> وحدات للاتحاد.</p>
<p>وهذا ليس مصادفة، بل هو أهم قرار لتجربة المطوّر ستتخذه في معمارية اتحاد الوحدات (Module Federation).</p>
<h2 id="لماذا-يهم-النمط-المستقل">لماذا يهم النمط المستقل</h2>
<p>بلا النمط المستقل، يعني تطوير وحدة بعيدة تشغيل المضيف إلى جانبها. وذلك يعني خادمَي تطوير، وشجرة اعتمادات المضيف كاملة، وكلفة تفاوض وقت تشغيل الاتحاد—كل ذلك فقط لترى مكوّنك يُصيَّر. وإن كان للمضيف وحداته البعيدة الخاصة، فقد تحتاج إلى ثلاثة أو أربعة خوادم تعمل. وتصير حلقة التغذية الراجعة أبطأ مع كل وحدة بعيدة تضيفها.</p>
<p>يكسر النمط المستقل ذلك الاعتماد. فالمطوّر الذي يعمل على لوحة التحليلات يستطيع <code>cd remote-analytics &amp;&amp; pnpm dev</code>، ويفتح <code>localhost:3001</code>، ويكرّر بمعزل عن غيره. ولا يحتاج إلى تشغيل المضيف، ولا إلى تشغيل وحدات بعيدة أخرى، ولا إلى فهم توجيه المضيف أو تدفّق المصادقة أو إدارة الحالة فيه. إنه يحتاج إلى شيفرته وحدها.</p>
<p>وذلك العزل يجعل الاختبار أكثر يُسرًا أيضًا. فتستطيع كتابة اختبارات مكوّنات واختبارات تكامل ضد الوحدة البعيدة المستقلة دون تشغيل النظام الاتحادي بأكمله. وتستطيع تشغيل Playwright ضد <code>localhost:3001</code> والتحقق من سلوك لوحة التحليلات بمعزل عن غيرها. وتستطيع تشغيل lighthouse ضد وحدة بعيدة واحدة بدل الهيكل كامل.</p>
<h2 id="كيف-يعمل">كيف يعمل</h2>
<p>الوحدة البعيدة المستقلة ليست إلا تطبيقًا عاديًا يصادف أنه يضبط أيضًا <code>exposes</code> في إعداد اتحاد الوحدات. والمفتاح هو علم <code>eager: true</code> على الاعتمادات المشتركة.</p>
<p>عندما تُحمَّل وحدة بعيدة عبر مضيف، يتولّى وقت تشغيل اتحاد الوحدات حلّ الاعتمادات المشتركة—فالمضيف يوفّر React و<code>react-dom</code> وكل ما يُعلن <code>shared</code>. ولا تحتاج الوحدة البعيدة إلى حزم نسختها الخاصة. لكن عندما تعمل الوحدة وحدها، لا يوجد مضيف يوفّر شيئًا. وبلا <code>eager: true</code>، ستحاول الوحدة طلب الوحدات المشتركة من مضيف غير موجود، فتحصل على خطأ وقت التشغيل.</p>
<p>يخبر <code>eager: true</code> الوحدة البعيدة أن تحزم الاعتمادات المشتركة مباشرةً في مخرجاتها كخيار احتياطي. وما زال وقت تشغيل الاتحاد يزيل التكرار وقت التشغيل عندما يكون المضيف حاضرًا—فـ<code>eager</code> لا يعني «حمّل نسختك دائمًا»، بل «أبقِ نسختك جاهزة في حال لم يوفّرها أحد غيرك». وهذا ما يجعل النمط المستقل ممكنًا دون تكرار React في الإنتاج.</p>
<p>وتحتاج الوحدة البعيدة أيضًا إلى نقطة دخول HTML خاصة بها. ففي مستودع التمرين، للوحدة البعيدة <code>index.html</code> خاص بها، و<code>index.tsx</code> خاص بها، ومكوّن جذر خاص بها يلفّ لوحة التحليلات. وعند تحميلها عبر المضيف، لا يهم شيء من ذلك—فالمضيف يستورد <code>analytics-dashboard</code> مباشرةً عبر إعداد <code>exposes</code>. لكن عند تحميلها مستقلة، نقطة دخول HTML تلك هي ما يصيّره المتصفح فعلًا.</p>
<h2 id="بيانات-محاكاة-مع-msw">بيانات مُحاكاة مع MSW</h2>
<p>النصف الآخر من النمط المستقل هو البيانات. فلوحة التحليلات تحتاج إلى بيانات المستخدمين، ومقاييس التحليلات، وحالة المصادقة لتُصيّر أي شيء مفيد. وفي التطبيق الكامل، تأتي تلك البيانات من واجهة برمجية في المضيف وتدفّق مصادقة فيه. أما في النمط المستقل فلا يوجد مضيف—لذا تحتاج الوحدة البعيدة إلى مصدر بياناتها الخاص.</p>
<p>و<a href="https://mswjs.io/">Mock Service Worker</a> هو الحل الأنظف هنا لأنه يعترض طلبات <code>fetch</code> على مستوى الشبكة. فشيفرة الوحدة البعيدة تُجري نداءات الواجهة نفسها التي ستُجريها في الإنتاج، ويستجيب MSW ببيانات مُحاكاة. بلا منطق شرطي، وبلا فروع <code>if (isStandalone)</code>، وبلا مصادر بيانات تقودها متغيّرات البيئة. فشيفرة التطبيق متطابقة في النمطين.</p>
<p>وهذا إعداد MSW نموذجي للوضع المستقل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// remote-analytics/src/mocks/handlers.ts</span>
<span class="hljs-keyword">import</span> { http, <span class="hljs-title class_">HttpResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handlers = [
  http.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/analytics/metrics&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">HttpResponse</span>.<span class="hljs-title function_">json</span>({
      <span class="hljs-attr">totalUsers</span>: <span class="hljs-number">12847</span>,
      <span class="hljs-attr">activeUsers</span>: <span class="hljs-number">3291</span>,
      <span class="hljs-attr">revenue</span>: <span class="hljs-number">148920</span>,
      <span class="hljs-attr">conversionRate</span>: <span class="hljs-number">3.2</span>,
    });
  }),
];
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// remote-analytics/src/mocks/browser.ts</span>
<span class="hljs-keyword">import</span> { setupWorker } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;msw/browser&#x27;</span>;
<span class="hljs-keyword">import</span> { handlers } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./handlers&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> worker = <span class="hljs-title function_">setupWorker</span>(...handlers);
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// remote-analytics/src/index.tsx</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
    <span class="hljs-keyword">const</span> { worker } = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./mocks/browser&#x27;</span>);
    <span class="hljs-keyword">await</span> worker.<span class="hljs-title function_">start</span>({ <span class="hljs-attr">onUnhandledRequest</span>: <span class="hljs-string">&#x27;bypass&#x27;</span> });
  }

  <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">createRoot</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;root&#x27;</span>)!);
  root.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span>);
}

<span class="hljs-title function_">main</span>();
</code></pre>
<p>و<code>onUnhandledRequest: 'bypass'</code> مهم—فهو يخبر MSW أن يمرّر الطلبات غير المعالَجة إلى الشبكة بدل التحذير منها. وفي النمط المستقل، تريد أن تُحاكي فقط الواجهات البرمجية التي تستخدمها وحدتك البعيدة فعلًا، لا كل طلب يجريه المتصفح.</p>
<h2 id="فجوة-المصادقة">فجوة المصادقة</h2>
<p>من الأمور التي ستلاحظها في النمط المستقل أن لوحة التحليلات تعرض «Not authenticated». وهذا متوقّع. ففي التطبيق الكامل، يكتب المضيف إلى <code>authStore</code> بعد جلب بيانات المستخدم. أما في النمط المستقل فلا يوجد مضيف يفعل ذلك.</p>
<p>ولديك عدة خيارات للتعامل مع هذا:</p>
<ul>
<li><strong>تقبّل الأمر.</strong> إن لم تكن حالة المصادقة حرجة لواجهة المستخدم التي تطوّرها، فتجاهل شارة «Not authenticated» وركّز على وظائف التحليلات. وهذا كافٍ لمعظم التطوير اليومي.</li>
<li><strong>حاكِ مخزن المصادقة.</strong> في نقطة دخولك المستقلة، اكتب إلى <code>authStore</code> مباشرةً ببيانات مُحاكاة قبل التصيير. ويمنحك هذا حالة مصادقة واقعية دون الحاجة إلى المضيف.</li>
<li><strong>حاكِ واجهة المصادقة البرمجية.</strong> أضف معالج MSW لـ<code>/api/users/me</code> في إعداد المحاكاة المستقل، ثم هيّئ مخزن المصادقة في نقطة دخول الوحدة البعيدة نفسها بالنمط ذاته الذي يستخدمه المضيف: اجلب ثم اضبط.</li>
</ul>
<p>ونمط محاكاة مخزن المصادقة هو الأبسط:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// remote-analytics/src/index.tsx</span>
<span class="hljs-keyword">import</span> { authStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>;

authStore.<span class="hljs-title function_">set</span>({
  <span class="hljs-attr">user</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Grace Hopper&#x27;</span>, <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span> },
  <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;mock-standalone-token&#x27;</span>,
});
</code></pre>
<p>الآن يعرض النمط المستقل «Viewing as: Grace Hopper» تمامًا كما يفعل التطبيق الكامل.</p>
<h2 id="انحراف-النمط-المستقل">انحراف النمط المستقل</h2>
<p>الخطر الحقيقي الوحيد في النمط المستقل هو الانحراف. فمقال Fowler عن <a href="https://martinfowler.com/articles/micro-frontends.html">الواجهات الأمامية الدقيقة</a> يحذّر من هذا بالضبط: فتطوير مستقل مُبسَّط قد يتباعد عن الحاوية الحقيقية، خاصةً في التنسيقات المشتركة، والحالة العامة، والفروق البيئية. فإن تغيّر إعادة الضبط (reset) في CSS المضيف، لن تعكس الوحدة البعيدة المستقلة ذلك. وإن حدّث المضيف شكل حِمل المصادقة، لن تعلم البيانات المُحاكاة المستقلة بذلك.</p>
<p>والتخفيف هو اختبار تكامل منتظم في البيئة الاتحادية الكاملة. فالنمط المستقل للتكرار السريع أثناء التطوير، وليس بديلًا عن تشغيل النظام كامل قبل الشحن. وسير العمل الصحي هو: طوّر واختبر في النمط المستقل، وتحقّق في المضيف الكامل قبل الدمج، وشغّل اختبارات التكامل ضد التطبيق المُركَّب في CI.</p>
<p>فكّر في النمط المستقل كما تفكّر في تشغيل خدمة خلفية محليًا بقاعدة بيانات مُحاكاة. فهو رائع لسرعة التطوير، لكنك ما زلت تشغّل اختبارات تكامل ضد قاعدة بيانات حقيقية قبل النشر. فالمحاكاة راحة، لا ضمان عقد.</p>
<h2 id="الوحدة-البعيدة-المستقلة-الدنيا">الوحدة البعيدة المستقلة الدنيا</h2>
<p>إن كنت تُعدّ وحدة بعيدة جديدة وتريد النمط المستقل من البداية، فقائمة التحقق قصيرة:</p>
<ul>
<li>امنح الوحدة البعيدة <code>index.html</code> خاصًا بها ونقطة دخول جذرية خاصة بها.</li>
<li>اضبط <code>eager: true</code> على كل الاعتمادات المشتركة كي تستطيع الوحدة الإقلاع بذاتها.</li>
<li>أضف معالجات MSW لكل واجهة برمجية تنادي عليها الوحدة البعيدة.</li>
<li>اختياريًا، ازرع المخازن المشتركة (مثل <code>authStore</code>) ببيانات مُحاكاة في نقطة الدخول المستقلة.</li>
<li>تأكد أن إعداد خادم التطوير في الوحدة يخدم نقطة الدخول المستقلة، لا بيان الاتحاد فقط.</li>
</ul>
<p>هذا كل شيء. فالوحدة البعيدة الآن تطبيق حقيقي يصادف أنه قابل للاستهلاك عبر الاتحاد أيضًا. يبقى التطوير سريعًا، ويبقى الاختبار معزولًا، ولا تهم طبقة الاتحاد إلا عند التكامل مع المضيف.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="الوحدات-البعيدة-المستقلة">الوحدات البعيدة المستقلة</h3>
<blockquote>
<p>شغّل أي وحدة بعيدة باستقلال — بلا المضيف.</p>
</blockquote>
<ul>
<li>ينبغي أن تُقلع كل وحدة بعيدة بذاتها للتطوير والاختبار.</li>
<li>اضبط <code>eager: true</code> للاعتمادات المشتركة كي تحمّل الوحدة البعيدة نسخها الخاصة.</li>
<li>حاكِ السياق المشترك (حالة المصادقة، وأعلام الميزات) بـMSW أو مزوّدات محلية.</li>
</ul>
<p><strong>الوحدة البعيدة المستقلة الدنيا:</strong></p>
<ol>
<li>تُقلع بـ<code>npm run dev</code> — بلا حاجة إلى مضيف</li>
<li>لديها بيانات مُحاكاة لاعتمادات الواجهة البرمجية</li>
<li>توفّر سياق مصادقتها الخاص</li>
<li>تشغّل مجموعة اختباراتها الخاصة بمعزل عن غيرها</li>
</ol>
<hr>
<h3 id="انحراف-النمط-المستقل-1">انحراف النمط المستقل</h3>
<blockquote>
<p>الخطر: أن تنحرف وحدتك البعيدة المستقلة عن الواقع.</p>
</blockquote>
<ul>
<li>البيانات المُحاكاة تتقادم — تغيّرت الواجهة الحقيقية، ولم تتغيّر محاكاتك.</li>
<li>سياق المصادقة في النمط المستقل لا يطابق شكل الرمز (token) في المضيف.</li>
<li>إصدارات الاعتمادات المشتركة تنحرف بين النمط المستقل والمضيف.</li>
</ul>
<p><strong>التخفيف:</strong></p>
<ul>
<li>اختبارات تكامل تُقلع التطبيق المُركَّب كامل (في CI فقط).</li>
<li>اختبارات عقد بين الوحدات البعيدة والمضيف.</li>
<li>معالجات MSW مشتركة بين النمطين المستقل والاختباري.</li>
<li>خط أنابيب منتظم لـ«التركيب واختبار الدخان» — لا اختبارات وحدة فقط.</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,p as html,e as slug,l as title};
