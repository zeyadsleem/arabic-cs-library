const s="kinney",e="enterprise-ui",t="واجهات المؤسسات",n="runtime-composition-exercise",a="تمرين 1: التركيب وقت التشغيل",o=[{depth:2,id:"لماذا-يهم",text:"لماذا يهم"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"الإعداد",text:"الإعداد"},{depth:2,id:"استكشف-إعداد-الاتحاد",text:"استكشف إعداد الاتحاد"},{depth:3,id:"استكشف-في-المتصفح",text:"استكشف في المتصفح"},{depth:3,id:"ما-الذي-تنظر-إليه",text:"ما الذي تنظر إليه"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"تفاوض-الاعتمادات-المشتركة",text:"تفاوض الاعتمادات المشتركة"},{depth:3,id:"ما-الذي-تنظر-إليه-1",text:"ما الذي تنظر إليه"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقق"},{depth:2,id:"مشكلة-سياق-المصادقة",text:"مشكلة سياق المصادقة"},{depth:3,id:"اكتشف-العطل",text:"اكتشف العطل"},{depth:3,id:"لماذا-يحدث-هذا",text:"لماذا يحدث هذا"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقق"},{depth:2,id:"التواصل-العابر-للحدود",text:"التواصل العابر للحدود"},{depth:3,id:"أنشئ-مخزن-المصادقة",text:"أنشئ مخزن المصادقة"},{depth:3,id:"اكتب-إلى-المخزن-من-المضيف",text:"اكتب إلى المخزن من المضيف"},{depth:3,id:"اقرأ-من-المخزن-في-الوحدة-البعيدة",text:"اقرأ من المخزن في الوحدة البعيدة"},{depth:3,id:"لماذا-ينجح-هذا",text:"لماذا ينجح هذا"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقق"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"التركيب-وقت-التشغيل-مقابل-وقت-البناء",text:"التركيب وقت التشغيل مقابل وقت البناء"},{depth:3,id:"أين-يتفوق-التركيب-وقت-التشغيل",text:"أين يتفوق التركيب وقت التشغيل"},{depth:3,id:"أين-تكلفك",text:"أين تكلّفك"},{depth:3,id:"القرار",text:"القرار"},{depth:2,id:"ما-التالي",text:"ما التالي"}],c=`<p>لنلقِ نظرة على إعداد واجهة مصغّرة وقت التشغيل. سنربط قشرة مضيف ووحدة تحليلات بعيدة باستخدام <a href="https://stevekinney.com/courses/enterprise-ui/module-federation">اتحاد الوحدات</a>. فحمّل تطبيق المضيف (المنفذ <code>3000</code>) لوحة التحليلات من وحدة بعيدة تُبنى وتُقدَّم بشكل منفصل (المنفذ <code>3001</code>) وقت التشغيل. وعلى الطريق ستهيّئ تفاوض الاعتمادات المشتركة، وتكتشف أن <a href="https://react.dev/reference/react/createContext">سياق React</a> لا يستطيع عبور حدود الاتحاد، وتحلّ مشكلة التواصل العابر للحدود باستخدام <a href="https://github.com/nanostores/nanostores">nanostores</a>.</p>
<h2 id="لماذا-يهم">لماذا يهم</h2>
<p>تمنح الواجهات المصغّرة وقت التشغيل الفرق عمليات بناء ونشرًا مستقلة—لكنها تأتي بكلف تشغيلية حقيقية. خادما تطوير، وبيانات مدخل الوحدة البعيدة، وتفاوض الاعتمادات المشتركة، وإدارة حالة عابرة للحدود. وفي رأيي المتواضع، تحتاج إلى أن تعيش تلك الكلف بنفسك كي تتخذ قرارًا معماريًا مستنيرًا بشأن ما إذا كنت تحتاج فعلًا التركيب وقت التشغيل أم أن التركيب وقت البناء (<a href="https://stevekinney.com/courses/enterprise-ui/build-time-composition-exercise">التمرين 2</a>) هو الأنسب.</p>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<p>تستطيع <em>على الأرجح</em> أن تكتفي بإصدارات أقدم قليلًا من كليهما. لكن، من أجل سلامة عقلك، لنفترض أن لديك الإصدارات التالية من المتطلبات المسبقة.</p>
<p>في هذا التمرين، نعمل عبر مستودع <a href="https://github.com/stevekinney/enterprise-ui-federation">enterprise-ui-federation</a>.</p>
<ul>
<li><a href="https://nodejs.org/">Node</a> 24+</li>
<li><a href="https://pnpm.io/">pnpm</a> 10+</li>
</ul>
<h2 id="الإعداد">الإعداد</h2>
<pre><code class="language-bash">pnpm install
pnpm dev
</code></pre>
<p>افتح <a href="http://localhost:3000/">http://localhost:3000</a> (<strong>تطبيق المضيف</strong>) و<a href="http://localhost:3001/">http://localhost:3001</a> (<strong>الوحدة البعيدة المستقلة</strong>).</p>
<h2 id="استكشف-إعداد-الاتحاد">استكشف إعداد الاتحاد</h2>
<p>لنبدأ بمشاهدة التطبيق العامل، ثم نفهم كيف يربط <a href="https://stevekinney.com/courses/enterprise-ui/module-federation">اتحاد الوحدات</a> القطع معًا.</p>
<h3 id="استكشف-في-المتصفح">استكشف في المتصفح</h3>
<ol>
<li>افتح <a href="http://localhost:3000/">http://localhost:3000</a></li>
<li>افتح <strong>DevTools</strong> → تبويب <strong>الشبكة (Network)</strong></li>
<li>ابحث عن <code>mf-manifest.json</code> وهو يُحمَّل من المنفذ 3001</li>
<li>سترى أيضًا ملفات الحزم محمَّلة من الوحدة البعيدة—وهي شيفرة لوحة التحليلات، مُقدَّمة من خادم تطوير الوحدة البعيدة.</li>
</ol>
<p><a href="https://gist.github.com/stevekinney/47acdccfd1a3e3a7230d4d8f28b16023">وإليك مثال</a> عمّا يمكن أن تتوقعه من <code>mf-manifest.json</code>.</p>
<p>على أي حال، <em>ينبغي</em> أن ترى لوحة التحليلات تُحمَّل داخل قشرة المضيف. ويعرض الشريط الجانبي <strong>Grace Hopper</strong> وتحته <strong>admin</strong> بنص رمادي، وتعرض المساحة الرئيسية شاشة التحليلات مع بطاقات إحصاءات ومخطط. وفي تبويب الشبكة، يمكنك رؤية <code>mf-manifest.json</code> وملفات الحزم قادمة من <code>localhost:3001</code>.</p>
<p><img src="/arabic-cs-library/images/kinney/f645da17213f4c60.webp" alt="قشرة المضيف تعرض شارة «Not authenticated»"></p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>ستلاحظ أيضًا شارة كهرمانية «Not authenticated» في ترويسة لوحة التحليلات—رغم أن الشريط الجانبي يعرض مستخدمًا مسجّل الدخول. وهذا مقصود. إنه العطل الذي ستحقّق فيه في الخطوة 3 وتصلحه في الخطوة 4.</p>
</blockquote>
<p>والآن لننظر إلى التهيئة التي تجعل هذا يعمل.</p>
<h3 id="ما-الذي-تنظر-إليه">ما الذي تنظر إليه</h3>
<p>افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/rsbuild.config.ts"><code>host/rsbuild.config.ts</code></a> وابحث عن تهيئة <code>remotes</code>:</p>
<p><em>host/rsbuild.config.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-attr">remotes</span>: {
  <span class="hljs-attr">remoteAnalytics</span>:
    <span class="hljs-string">&quot;remoteAnalytics@http://localhost:3001/mf-manifest.json&quot;</span>,
},
</code></pre>
<p>يخبر هذا المضيف بمكان إيجاد بيان وحدات الوحدة البعيدة وقت التشغيل. والبيان (<code>mf-manifest.json</code>) هو العقد بين المضيف والوحدة البعيدة: فهو يسرد كل وحدة تكشفها الوحدة البعيدة، وأي حزم JavaScript تنفّذها، وأي اعتمادات مشتركة تعلنها الوحدة البعيدة. ويجلب المضيف ملف JSON هذا في <strong>وقت التشغيل</strong>، <em>قبل</em> تحميل أي شيفرة من الوحدة البعيدة، فيعرف ما هو متاح ويستطيع التفاوض على الاعتمادات المشتركة. ولهذا يجب أن يعمل خادما التطوير <em>كليهما</em> في الوقت نفسه: فالمضيف يُجري طلب شبكة إلى المنفذ <code>3001</code> عند كل تحميل صفحة.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>رأيت <code>mf-manifest.json</code> بالفعل في تبويب الشبكة. ذلك الطلب هو تفاوض اتحاد الوحدات وقت التشغيل في أبهى صوره: يتفق المضيف والوحدة البعيدة على الاعتمادات المشتركة والوحدات المتاحة قبل تنفيذ أي شيفرة من الوحدة البعيدة.</p>
</blockquote>
<p>افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/rsbuild.config.ts"><code>remote-analytics/rsbuild.config.ts</code></a> وابحث عن تهيئة <code>exposes</code>:</p>
<p><em>remote-analytics/rsbuild.config.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-attr">exposes</span>: {
  <span class="hljs-string">&quot;./analytics-dashboard&quot;</span>: <span class="hljs-string">&quot;./src/analytics-dashboard&quot;</span>,
},
</code></pre>
<p>يعلن هذا الوحدات التي تتيحها الوحدة البعيدة للمستهلكين. فكّر في <code>exposes</code> كسطح الواجهة البرمجية العام للوحدة البعيدة: فالمسارات المدرجة هنا وحدها قابلة للاستيراد من المستهلكين. ويصير المفتاح على اليسار (<code>&quot;./analytics-dashboard&quot;</code>) مسار الاستيراد الذي يستخدمه المستهلكون (مثل <code>import(&quot;remoteAnalytics/analytics-dashboard&quot;)</code>)، أما القيمة على اليمين فهي ملف المصدر الفعلي.</p>
<p>افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/app.tsx"><code>host/src/app.tsx</code></a> لترى الاستيراد الديناميكي:</p>
<p><em>host/src/app.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">AnalyticsDashboard</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;remoteAnalytics/analytics-dashboard&#x27;</span>));
</code></pre>
<p>يحمّل المضيف مكوّن الوحدة البعيدة تحميلًا متأخرًا وقت التشغيل. فهو غير محزَّم في بناء المضيف. أما <a href="https://react.dev/reference/react/lazy"><code>React.lazy</code></a> مقترنًا بـ<code>import()</code> الديناميكي فيعني أن المتصفح لا ينزّل حزم JavaScript الخاصة بالوحدة البعيدة إلا عندما يُصيَّر <code>&lt;AnalyticsDashboard /&gt;</code> أول مرة، لا عند تحميل الصفحة الأولى.</p>
<blockquote>
<p><strong>ماذا لو تجاهلت <code>React.lazy</code> واستخدمت استيرادًا ساكنًا؟</strong></p>
<p>قد تجرّب <code>import AnalyticsDashboard from 'remoteAnalytics/analytics-dashboard'</code>—وهو استيراد عادي في المستوى الأعلى. سيفشل هذا وقت البناء. فوحدة <code>remoteAnalytics</code> غير موجودة في <code>node_modules</code> لدى المضيف: فحلّها يحدث <em>وقت التشغيل</em> من وقت تشغيل اتحاد الوحدات، لا وقت البناء من المُجمِّع. فالاستيراد الساكن يخبر المُجمِّع أن يحلّ الوحدة ويحزمها أثناء خطوة البناء، والمُجمِّع لا يعرف ما هو <code>remoteAnalytics</code>. أما <code>import()</code> الديناميكي فيعمل لأن اتحاد الوحدات يعترضه وقت التشغيل ويوجّهه عبر حلّ الوحدات الخاص به، فيجلب شيفرة الوحدة البعيدة عبر الشبكة. و<code>React.lazy</code> مجرد غلاف مريح يحوّل ذلك <code>import()</code> الديناميكي إلى مكوّن يعرف React كيف يصيّره مع حدّ <code>&lt;Suspense&gt;</code>.</p>
</blockquote>
<p>افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/index.tsx"><code>host/src/index.tsx</code></a>—وستلاحظ أنه مجرد <code>import(&quot;./bootstrap&quot;)</code>. فهذا الحدّ غير المتزامن مطلوب كي يعمل تفاوض الوحدات المشتركة في اتحاد الوحدات. وبدونه، تفشل الوحدات المشتركة المتلهّفة في الحلّ.</p>
<blockquote>
<p><strong>لماذا يحتوي <code>index.tsx</code> على استيراد ديناميكي فحسب</strong></p>
<p>تفاوض الوحدات المشتركة في اتحاد الوحدات غير متزامن: فعلى وقت التشغيل أن يتصل بكل الوحدات البعيدة المسجَّلة ويحلّ أي إصدار من كل اعتماد مشترك سيُستخدم قبل أن تعمل أي شيفرة تطبيق. ولو استورد <code>index.tsx</code> شيفرة تطبيق بشكل تزامني، لنُفّذت تلك الشيفرة قبل اكتمال التفاوض وحصلت على خطأ وقت تشغيل: <code>Uncaught Error: Shared module is not available for eager consumption</code>. أما <code>import(&quot;./bootstrap&quot;)</code> الديناميكي فيؤجّل كل شيء حتى يصير وقت تشغيل الاتحاد جاهزًا.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>رأيت التطبيق العامل في المتصفح وفهمت التهيئة التي تشغّله: <code>remotes</code> لدى المضيف وهي تشير إلى عنوان البيان، و<code>exposes</code> لدى الوحدة البعيدة وهي تعلن وحداتها العامة، والاستيراد الديناميكي المتأخر في المضيف، والحدّ غير المتزامن في <code>index.tsx</code>.</p>
<h2 id="تفاوض-الاعتمادات-المشتركة">تفاوض الاعتمادات المشتركة</h2>
<p>يستخدم كل من المضيف والوحدة البعيدة React. وبلا تهيئة الاعتمادات المشتركة، سيحزم كل منهما نسخته الخاصة—وهو ما يكسر الخطافات والسياق وكل ما يعتمد على نسخة React واحدة.</p>
<h3 id="ما-الذي-تنظر-إليه-1">ما الذي تنظر إليه</h3>
<p>في ملفي تهيئة rsbuild (<a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/rsbuild.config.ts"><code>host/rsbuild.config.ts</code></a> و<a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/rsbuild.config.ts"><code>remote-analytics/rsbuild.config.ts</code></a>)، ابحث عن تهيئة <code>shared</code>. ويضبط الملفان <code>singleton: true</code> و<code>eager: true</code> على كل الاعتمادات المشتركة:</p>
<p><em>rsbuild.config.ts (shared)</em></p>
<pre><code class="language-typescript"><span class="hljs-attr">shared</span>: {
  <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-string">&quot;react-dom&quot;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-attr">nanostores</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-string">&quot;@nanostores/react&quot;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
  <span class="hljs-string">&quot;@pulse/shared&quot;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
},
</code></pre>
<ul>
<li><strong><code>singleton: true</code></strong>: لا تُحمَّل إلا نسخة واحدة من React، حتى لو أعلن المضيف والوحدة البعيدة إصدارين مختلفين. ويختار وقت تشغيل اتحاد الوحدات أعلى إصدار متوافق متاح ويفرض استخدام نسخة واحدة بالضبط. وبدون ذلك، يحمّل كل مشارك نسخته الخاصة، وهو ما يكسر كل ما يعتمد على نسخة وحدة واحدة: فخطافات React والسياق والمخازن كلها تقع في هذه الفئة. وهذا القيد عام: فإن أعلن <em>أي</em> مشارك وحدة كأحادية النسخة، فرضها وقت التشغيل على الجميع، فيستطيع المضيف حماية سلامته حتى إن نسيَت وحدة بعيدة ضبطها.</li>
<li><strong><code>eager: true</code></strong>: يحمّل الجانبان الوحدات المشتركة فورًا. وبدون <code>eager: true</code>، تتوقع الوحدة البعيدة أن يوفّر <em>المضيف</em> وحدات مشتركة مثل React وقت التشغيل. وهذا يعمل عند التحميل عبر مضيف، لكنه يعني أن الوحدة البعيدة لا تستطيع الإقلاع وحدها: فليس لديها من أين تحصل على React. أما <code>eager: true</code> فتحزم React مباشرةً في مخرجات الوحدة البعيدة كبديل احتياطي مكتفٍ بذاته. وما زال وقت تشغيل الاتحاد يزيل التكرار وقت التشغيل عند وجود المضيف، فلن تنتهي بنسختين من React في الإنتاج؛ و<code>eager</code> تضمن فقط أن يبقى النمط المستقل (<code>localhost:3001</code>) عاملًا.</li>
</ul>
<blockquote>
<p><strong>عن Nanostores</strong></p>
<p>يظهر <a href="https://npm.im/@nanostores/react"><code>@nanostores/react</code></a> في تهيئة المشاركة لدى الوحدة البعيدة رغم أنه ليس في <code>package.json</code> الخاصة بها بعد—وهذا مقصود. فقد هُيّئ مسبقًا كي تكون إزالة التكرار في الاتحاد جاهزة عندما تثبّت الحزمة في <strong>الخطوة 4c</strong>. ولن تحتاج إلى لمس التهيئة لاحقًا.</p>
</blockquote>
<p><strong>تجربة:</strong> أضف <code>requiredVersion</code> و<code>strictVersion</code> إلى مدخل React القائم لديك في <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/rsbuild.config.ts"><code>rsbuild.config.ts</code></a> الخاص بالوحدة البعيدة. أبقِ <code>singleton: true</code> و<code>eager: true</code> في مكانهما، وأضف الحقلين الجديدين فقط:</p>
<p><em>rsbuild.config.ts (shared)</em></p>
<pre><code class="language-typescript"><span class="hljs-attr">shared</span>: {
  <span class="hljs-attr">react</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&quot;^19.0.0&quot;</span>,
    <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-comment">// ... other shared entries unchanged</span>
},
</code></pre>
<p>مع <code>strictVersion: true</code>، يرمي اتحاد الوحدات خطأً إن لم يلبِّ الإصدار الموفَّر شرط <code>requiredVersion</code>. واستخدام <code>&quot;^19.0.0&quot;</code> هنا سيُشغّل الخطأ لأن هذا المشروع يستخدم React 18. أوقف خوادم التطوير (<code>Ctrl+C</code>)، وشغّل <code>pnpm dev</code> مرة أخرى، ثم افتح <code>http://localhost:3001</code>. وستصير الصفحة <strong>فارغة</strong> (فلا يبدأ React أبدًا)، وسترى عدم توافق الإصدار في <strong>DevTools → Console</strong>:</p>
<pre><code>Error: [ Federation Runtime ]: Version 18.3.1 from remoteAnalytics of shared singleton module react does not satisfy the requirement of remoteAnalytics which needs ^19.0.0)
</code></pre>
<p>وهذا مقصود: فقد رفضت الوحدة البعيدة إصدار React المتاح قبل أن تُصيَّر أي واجهة. وهكذا تلتقط انحراف الإصدارات بين وحدات بعيدة تُنشر باستقلال.</p>
<p><img src="/arabic-cs-library/images/kinney/e30f5dd1ded90d7d.webp" alt="صفحة فارغة بعد خطأ عدم توافق الإصدار"></p>
<p><strong>أزل الحقلين وأعد التهيئة الأصلية قبل المتابعة.</strong> أوقف خوادم التطوير وشغّل <code>pnpm dev</code> مرة أخرى لالتقاط التهيئة المُرجَعة.</p>
<h3 id="نقطة-تحقق-1">نقطة تحقق</h3>
<p>ينبغي أن تكون الطرفية نظيفة: بلا أخطاء وحدات مشتركة. ولا تُحمَّل إلا نسخة واحدة من React. وإن كانت React DevTools مثبَّتة لديك، فسترى شجرة React واحدة تمتد عبر مكونات المضيف والوحدة البعيدة معًا.</p>
<blockquote>
<p><strong>رسائل <code>[Federation Runtime] Warn</code></strong></p>
<p>قد ترى هذه في الطرفية طوال التمرين. وتظهر كلما هُيّئ اعتماد مشترك بلا <code>requiredVersion</code> صريحة (وهو حال معظم المدخلات في تهيئة المشاركة لدينا). وليست أخطاء، بل رسائل إعلامية فحسب من وقت تشغيل اتحاد الوحدات عن تفاوض الإصدارات. ويمكنك تجاهلها بأمان.</p>
</blockquote>
<h2 id="مشكلة-سياق-المصادقة">مشكلة سياق المصادقة</h2>
<p>والآن انظر إلى لوحة التحليلات بعناية أكبر. ثمة شيء خطأ.</p>
<h3 id="اكتشف-العطل">اكتشف العطل</h3>
<ol>
<li>انظر إلى <strong>التنقل في الشريط الجانبي</strong>: فهو يعرض «Grace Hopper» بدور «admin». ولدى المضيف بيانات المصادقة.</li>
<li>انظر إلى ترويسة <strong>لوحة التحليلات</strong>: فهي تعرض شارة كهرمانية <strong>«Not authenticated»</strong>. أما الوحدة البعيدة فـ<em>لا</em> تملك بيانات المصادقة.</li>
</ol>
<h3 id="لماذا-يحدث-هذا">لماذا يحدث هذا</h3>
<p>يعتمد سياق React على هوية الكائن: فيجب أن يُنتج استدعاء <code>createContext()</code> نفسه الكائن نفسه على الجانبين. وفي إعداد اتحادي، تنشئ الحزم المبنية منفصلةً كائنات سياق منفصلة، فلا يتطابق الموفّر والمستهلك أبدًا.</p>
<pre><code>sequenceDiagram
    participant Host as Host Bundle
    participant Context as React Context Registry
    participant Remote as Remote Bundle

    Host-&gt;&gt;Context: createContext() → ContextA
    Host-&gt;&gt;Context: Provide value via ContextA
    Remote-&gt;&gt;Context: createContext() → ContextB
    Remote-&gt;&gt;Context: useContext(ContextB)
    Context--&gt;&gt;Remote: Default value (no match)
    Note over Host,Remote: ContextA !== ContextB—different object identity
</code></pre>
<p>افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/shell/auth-provider.tsx"><code>host/src/shell/auth-provider.tsx</code></a>. فالمضيف يجلب المستخدم الحالي من <code>/api/users/me</code> ويوفّره عبر سياق React:</p>
<p><em>host/src/shell/auth-provider.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">AuthContext</span> = createContext&lt;<span class="hljs-title class_">AuthContextType</span>&gt;({ ... });

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AuthProvider</span>(<span class="hljs-params">{ children }</span>) {
  <span class="hljs-comment">// Fetches user, provides via context</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AuthContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">AuthContext.Provider</span>&gt;</span></span>;
}
</code></pre>
<p>والآن افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/src/analytics-dashboard.tsx"><code>remote-analytics/src/analytics-dashboard.tsx</code></a>. وابحث عن قيم المصادقة المكتوبة مباشرةً قرب أعلى المكوّن:</p>
<p><em>remote-analytics/src/analytics-dashboard.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-comment">// THE <span class="hljs-doctag">BUG:</span> This component has no access to the host&#x27;s auth context.</span>
<span class="hljs-comment">// It cannot read the current user or auth token.</span>
<span class="hljs-comment">// On the main branch, this is intentionally broken.</span>
<span class="hljs-keyword">const</span> isAuthenticated = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">userName</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
</code></pre>
<p><em>ملاحظة:</em> هذه مكتوبة مباشرةً لأن سياق React لا يستطيع عبور حدود الاتحاد</p>
<p>لا سبيل للوحدة البعيدة إلى الوصول إلى سياق React لدى المضيف. فرغم أن <code>&lt;AnalyticsDashboard /&gt;</code> يُصيَّر <em>داخل</em> <code>&lt;AuthProvider&gt;</code> لدى المضيف، فإن شيفرة المكوّن <em>بُنيت منفصلة</em>. ولا يعبر سياق React حدود اتحاد الوحدات: فحلّ وحدة React لدى الوحدة البعيدة يرى كائن سياق مختلفًا عن الذي يراه المضيف.</p>
<blockquote>
<p><strong>يُطابَق سياق React بهوية الكائن، لا بالنوع.</strong></p>
<p>عندما ينادي المضيف <code>createContext(...)</code>، يعود إليه كائن JavaScript محدد—لنسمّه <code>ContextA</code>. وعندما تنادي الحزمة المبنية منفصلةً في الوحدة البعيدة <code>createContext(...)</code> كذلك (أو تستورد ما يبدو أنه السياق نفسه من ملف مشترك)، يعود إليها كائن JavaScript <em>مختلف</em> هو <code>ContextB</code>. ويعمل خُطّاف <a href="https://react.dev/reference/react/useContext"><code>useContext</code></a> في React بالصعود في شجرة المكوّنات للعثور على <code>&lt;Context.Provider&gt;</code> يكون كائن سياقه <code>===</code> للكائن الممرَّر. فـ<code>&lt;AuthContext.Provider&gt;</code> لدى المضيف يوفّر <code>ContextA</code>؛ أما <code>useContext(AuthContext)</code> لدى الوحدة البعيدة فيطلب <code>ContextB</code>. ولا يتطابقان أبدًا—فتقرأ الوحدة البعيدة القيمة الافتراضية دائمًا.</p>
<p>قد تظن: «صدّر السياق من <code>@pulse/shared</code> واستورده في الموضعين». حتى هذا لن يعمل: فهوية سياق React تقوم على <em>نسخة الوحدة</em>، لا على النوع. فأنواع TypeScript تُمحى وقت التصريف؛ وما يهم وقت التشغيل هو هل تلقّى جزءا الشيفرة <em>كائن JavaScript نفسه</em>. ومع اتحاد الوحدات، ما لم تُعلَن حزمة كاعتماد مشترك أحادي النسخة، يقيّمها المضيف والوحدة البعيدة باستقلال—فيُشغَّل <code>createContext()</code> مرتين، منتجًا كائنين متمايزين. ونقل <code>createContext</code> إلى حزمة مشتركة لا يفيد إلا إن كانت تلك الحزمة نفسها وحدة مشتركة أحادية النسخة.</p>
</blockquote>
<h3 id="نقطة-تحقق-2">نقطة تحقق</h3>
<p>فهمت لماذا تعرض لوحة التحليلات <strong>Not authenticated</strong>: فأشجار سياق React لا تمتد عبر حدود الاتحاد. ولدى المضيف بيانات المصادقة، لكن الوحدة البعيدة لا تستطيع الوصول إليها عبر آليات React المدمجة.</p>
<h2 id="التواصل-العابر-للحدود">التواصل العابر للحدود</h2>
<p>الحل هو استخدام مكتبة إدارة حالة مستقلة عن إطار العمل يستطيع المضيف والوحدة البعيدة مشاركتها. و<code>nanostores</code> مثبَّتة بالفعل في <code>@pulse/shared</code>، وكل ما تحتاجه هو إنشاء المخزن وربطه.</p>
<h3 id="أنشئ-مخزن-المصادقة">أنشئ مخزن المصادقة</h3>
<p>أنشئ ملفًا جديدًا <code>shared/src/auth-store.ts</code> (ملاحظة: <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/shared/src/auth.ts"><code>auth.ts</code></a> موجود بالفعل في ذلك المجلد، وهو يحوي أدوات قناة البث ولا علاقة له بما تحتاجه هنا):</p>
<blockquote>
<p><strong>ما هي ذرّة nanostore؟</strong></p>
<p><code>atom</code> أبسط عنصر أولي في nanostores: حاوية تفاعلية لقيمة واحدة. واستدعاء <code>atom(initialValue)</code> يعيد كائن مخزن بثلاث دوال: <code>.get()</code> لقراءة القيمة الحالية، و<code>.set(newValue)</code> لكتابة قيمة جديدة وإخطار كل المشتركين، و<code>.subscribe(callback)</code> للاستماع إلى التغييرات. ويغلّف خُطّاف <code>useStore</code> من <a href="https://github.com/nanostores/react"><code>@nanostores/react</code></a> الدالة <code>.subscribe()</code> في خُطّاف React، فيعيد تصيير المكوّن كلما تغيّرت قيمة الذرّة. والذرّة نفسها بلا أي اعتماد على React: فهي JavaScript صرفة، ولهذا بالضبط تستطيع عبور حدود أطر العمل والاتحاد التي لا تستطيع العناصر الأولية الخاصة بـReact عبورها.</p>
</blockquote>
<p><em>shared/src/auth-store.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { atom } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;nanostores&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AuthContext</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./types&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> authStore = atom&lt;<span class="hljs-title class_">AuthContext</span>&gt;({
  <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-literal">null</span>,
});
</code></pre>
<p>ثم أضف التصدير التالي إلى <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/shared/src/index.ts"><code>shared/src/index.ts</code></a>:</p>
<p><em>shared/src/index.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./auth-store&#x27;</span>;
</code></pre>
<h3 id="اكتب-إلى-المخزن-من-المضيف">اكتب إلى المخزن من المضيف</h3>
<p>افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/host/src/shell/auth-provider.tsx"><code>host/src/shell/auth-provider.tsx</code></a>. واستورد المخزن وحدّثه عند تغيّر حالة المصادقة.</p>
<p>أضف استيرادًا ثانيًا من <code>@pulse/shared</code>—وأبقِه منفصلًا عن الاستيراد الحالي الخاص بالأنواع وحده، لأن هذا استيراد لقيمة وقت تشغيل:</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>تُمحى صيغة <code>import type</code> في TypeScript كليًا وقت التصريف: فهي موجودة لفحص الأنواع فقط ولا تنتج أي مخرجات JavaScript. ولا يمكن تضمين قيمة وقت تشغيل مثل <code>authStore</code> في عبارة <code>import type</code>. وإبقاؤهما في سطري <code>import</code> منفصلين أوضح طريقة للإشارة إلى أي الاستيرادات للأنواع وحدها وأيها يحمل شيفرة وقت تشغيل.</p>
</blockquote>
<p><em>host/src/shell/auth-provider.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">User</span>, <span class="hljs-title class_">AuthContext</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">AuthContextType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>;
<span class="hljs-keyword">import</span> { authStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>;
</code></pre>
<p>داخل <code>useEffect</code>، اكتب إلى مخزن nanostores مباشرةً بعد استدعائي الحالة القائمين في كتلة <code>try</code>:</p>
<p><em>host/src/shell/auth-provider.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/users/me&#x27;</span>);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">User</span> = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-title function_">setUser</span>(data);
  <span class="hljs-title function_">setToken</span>(<span class="hljs-string">&#x27;mock-jwt-token-&#x27;</span> + data.<span class="hljs-property">id</span>);
  authStore.<span class="hljs-title function_">set</span>({
    <span class="hljs-attr">user</span>: data,
    <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;mock-jwt-token-&#x27;</span> + data.<span class="hljs-property">id</span>,
  });
} <span class="hljs-keyword">catch</span> (error) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to fetch current user:&#x27;</span>, error);
}
</code></pre>
<p><em>ملاحظة:</em> يكتب إلى مخزن nanostores المشترك كي تستطيع الوحدة البعيدة قراءته</p>
<h3 id="اقرأ-من-المخزن-في-الوحدة-البعيدة">اقرأ من المخزن في الوحدة البعيدة</h3>
<p>أولًا، أضف <code>@nanostores/react</code> إلى الوحدة البعيدة كي تستطيع استخدام ارتباطات React. وفي طرفية منفصلة (لا التي تشغّل <code>pnpm dev</code>)، شغّل من جذر المستودع:</p>
<pre><code class="language-bash">pnpm --filter @pulse/remote-analytics add @nanostores/react
</code></pre>
<blockquote>
<p><strong>لماذا؟</strong></p>
<p>يستخدم pnpm عزلًا صارمًا للوحدات: فلا تستطيع كل حزمة أن تستورد إلا اعتماداتها المعلنة. فرغم أن <code>@pulse/shared</code> يعتمد بالفعل على <code>@nanostores/react</code>، تحتاج الوحدة البعيدة إلى إعلانها الخاص لحلّ الاستيراد وقت البناء. أما وقت التشغيل، فتهيئة الأحادية النسخة في اتحاد الوحدات تضمن ألا تُحمَّل إلا نسخة واحدة.</p>
</blockquote>
<p>والآن افتح <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/remote-analytics/src/analytics-dashboard.tsx"><code>remote-analytics/src/analytics-dashboard.tsx</code></a>. واستبدل قيم المصادقة المكتوبة مباشرةً بمخزن nanostores.</p>
<p>أضف هذين الاستيرادين:</p>
<p><em>remote-analytics/src/analytics-dashboard.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@nanostores/react&#x27;</span>;
<span class="hljs-keyword">import</span> { authStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/shared&#x27;</span>;
</code></pre>
<p>داخل المكوّن، ابحث عن كتلة التعليق <code>// THE BUG</code> وسطري <code>const</code> المكتوبين مباشرةً تحتها واحذفها، ثم استبدلها بمخزن nanostores:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Delete these five lines:</span>
<span class="hljs-comment">// THE <span class="hljs-doctag">BUG:</span> This component has no access to the host&#x27;s auth context.</span>
<span class="hljs-comment">// It cannot read the current user or auth token.</span>
<span class="hljs-comment">// On the main branch, this is intentionally broken.</span>
<span class="hljs-keyword">const</span> isAuthenticated = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">userName</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
</code></pre>
<p><em>remote-analytics/src/analytics-dashboard.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-comment">// Add these three lines in their place:</span>
<span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">useStore</span>(authStore);
<span class="hljs-keyword">const</span> isAuthenticated = auth.<span class="hljs-property">isAuthenticated</span>;
<span class="hljs-keyword">const</span> userName = auth.<span class="hljs-property">user</span>?.<span class="hljs-property">name</span> ?? <span class="hljs-literal">null</span>;
</code></pre>
<p><em>ملاحظة:</em> يقرأ من نسخة الذرّة نفسها التي يكتب إليها المضيف</p>
<h3 id="لماذا-ينجح-هذا">لماذا ينجح هذا</h3>
<p>ثمة أمران يجعلان هذا ينجح:</p>
<ol>
<li><strong><code>@pulse/shared</code> اعتماد مشترك أحادي النسخة</strong> في ملفي تهيئة rsbuild. هذا يعني أن المضيف والوحدة البعيدة يتشاركان نسخة الوحدة نفسها بالضبط من <code>@pulse/shared</code> وقت التشغيل: فالذرّة <code>authStore</code> التي ينشئها <code>atom(...)</code> في <code>auth-store.ts</code> هي الكائن نفسه في المضيف والوحدة البعيدة معًا.</li>
<li><strong><code>nanostores</code> و<code>@nanostores/react</code> اعتمادان مشتركان أحاديا النسخة أيضًا.</strong> وهذا يضمن أن مكتبة المخزن وارتباطاتها بـReact نسخة واحدة على الجانبين، فيشترك <code>useStore()</code> في الوحدة البعيدة في الذرّة نفسها التي يكتب إليها المضيف.</li>
</ol>
<p>وعندما ينادي المضيف <code>authStore.set(...)</code>، يرى خُطّاف <code>useStore(authStore)</code> في الوحدة البعيدة التحديث فورًا، لأنهما حرفيًا الكائن نفسه في الذاكرة.</p>
<blockquote>
<p><strong>ارتباط الأحادية النسخة حمولة إنشائية.</strong></p>
<p>كل جزء من هذا الحل يعتمد على إعلان <code>@pulse/shared</code> كاعتماد مشترك أحادي النسخة في ملفي تهيئة rsbuild. فلو غاب عن <code>shared</code>، لحزم اتحاد الوحدات نسخة منفصلة من <code>@pulse/shared</code> في المضيف والوحدة البعيدة معًا. وحينها يكتب <code>authStore.set(...)</code> لدى المضيف إلى كائن ذرّة واحد، بينما يشترك <code>useStore(authStore)</code> لدى الوحدة البعيدة في كائن ذرّة مختلف تمامًا لا يتلقى أي تحديثات قط. وسترى «Not authenticated» إلى الأبد، بلا خطأ وبلا سبب ظاهر. وينطبق الأمر نفسه على <code>nanostores</code> نفسها: فلو تكررت المكتبة التي تنفّذ <code>.subscribe()</code> و<code>.set()</code>، لغدت الاشتراكات المُنشأة على إحدى النسختين غير مرئية للأخرى. ويجب أن تكون الحزم الثلاث كلها—<code>@pulse/shared</code> و<code>nanostores</code> و<code>@nanostores/react</code>—أحادية النسخة كي تعمل التفاعلية العابرة للحدود.</p>
</blockquote>
<blockquote>
<p><strong>إن كانت الشارة ما زالت تقول «Not authenticated»</strong></p>
<p>بعد إجراء هذه التغييرات، تحقق من إدراج <code>@pulse/shared</code> في تهيئة <code>shared</code> في ملفي <code>rsbuild.config.ts</code>. فبدون ذلك، تحزم كل جهة نسختها الخاصة من <code>@pulse/shared</code> وتنشئ نسخ ذرّات منفصلة: يكتب المضيف إلى ذرّة وتقرأ الوحدة البعيدة من أخرى مختلفة.</p>
</blockquote>
<p>وهذا هو الإدراك الجوهري: <strong>الحالة المستقلة عن إطار العمل (nanostores، وBroadcastChannel، والأحداث المخصصة) تعبر الحدود التي لا تستطيع الحالة الخاصة بإطار العمل (سياق React) عبورها</strong>—لكن فقط إن كانت الوحدة التي تنشئ الحالة مشتركة بين الجانبين.</p>
<p>أوقف خوادم التطوير (<code>Ctrl+C</code>) وشغّل <code>pnpm dev</code> مرة أخرى لالتقاط الملف الجديد، والتصدير الجديد، والاعتماد المثبَّت حديثًا. ثم افتح <a href="http://localhost:3000/">http://localhost:3000</a>.</p>
<h3 id="نقطة-تحقق-3">نقطة تحقق</h3>
<p>تعرض لوحة التحليلات الآن شارة خضراء <strong>«Viewing as: Grace Hopper»</strong> بدل الشارة الكهرمانية «Not authenticated». فسياق المصادقة يتدفق من المضيف إلى الوحدة البعيدة عبر مخزن nanostores المشترك.</p>
<p><img src="/arabic-cs-library/images/kinney/257dcc36abbba701.webp" alt="التطبيق بعد الإصلاح يعرض Viewing as Grace Hopper"></p>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/enterprise-ui/broadcast-channel">BroadcastChannel للتواصل العابر للحدود</a>: طبّق المصادقة العابرة للحدود نفسها باستخدام واجهة <code>BroadcastChannel</code> في المتصفح بدل nanostores—بلا حاجة إلى اعتمادات مشتركة أحادية النسخة.</li>
<li><a href="https://stevekinney.com/courses/enterprise-ui/error-boundaries-and-federation">حدود الأخطاء واتحاد الوحدات</a>: أوقف خادم تطوير الوحدة البعيدة، وأعد تحميل المضيف، واكتشف لماذا لا تستطيع حدود أخطاء React التقاط أعطال الاتحاد.</li>
<li><a href="https://stevekinney.com/courses/enterprise-ui/standalone-remotes">الوحدات البعيدة المستقلة</a>: زُر <code>localhost:3001</code> مباشرةً وافهم لماذا النمط المستقل أهم قرار لتجربة المطوّر في معمارية اتحادية.</li>
</ul>
<h2 id="التركيب-وقت-التشغيل-مقابل-وقت-البناء">التركيب وقت التشغيل مقابل وقت البناء</h2>
<p>لقد خضت الآن الكلفة التشغيلية الكاملة لاتحاد الوحدات. وقبل المتابعة، يجدر أن نكون صادقين بشأن أين تبرَّر تلك الكلفة وأين لا تبرَّر.</p>
<h3 id="أين-يتفوق-التركيب-وقت-التشغيل">أين يتفوق التركيب وقت التشغيل</h3>
<p><strong>عمليات النشر المستقلة.</strong> هذا هو السبب الوحيد للتوجه إلى اتحاد الوحدات. فعندما تصدر فرقة التحليلات وفرقة القشرة وفق جدولين مختلفين، يتيح لهما التركيب وقت التشغيل النشر باستقلال: فيجلب المضيف ما تقدمه الوحدة البعيدة حاليًا بلا إصدار منسّق. ولا تمنحك أي استراتيجية تركيب أخرى ذلك.</p>
<p><strong>عزل التقنيات.</strong> لأن الحدّ عقد شبكي (البيان ومسارات الوحدات المكشوفة)، تستطيع وحدات بعيدة مختلفة استخدام أطر عمل مختلفة، أو إصدارات React مختلفة، أو حتى أدوات بناء مختلفة—ما دامت تكشف واجهة متوافقة. فيمكن أن يحمّل مضيف React 18 وحدة بعيدة بـReact 19، أو تمزج React وVue، بطرق لا تستطيع حزمة مشتركة استيعابها.</p>
<p><strong>الخنق التدريجي.</strong> تستطيع وحدة بعيدة أن تلفّ شيفرة قديمة وتكشفها كمكوّن حديث. ولا يحتاج المضيف إلى معرفة ذلك أبدًا. وهذا يجعل اتحاد الوحدات أداة عملية لترحيل التطبيقات القديمة الكبيرة بلا إعادة كتابة جذرية—وهو ما ستستكشفه مباشرةً في <a href="https://stevekinney.com/courses/enterprise-ui/strangler-fig-and-codemods-exercise">التمرين 9</a>.</p>
<h3 id="أين-تكلفك">أين تكلّفك</h3>
<p><strong>تجربة المطوّر.</strong> شغّلت خادمَي تطوير، وهيّأت عناوين بيانات، ونقّحت أخطاء إقلاع غير متزامن، وتصارعت مع علمَي <code>singleton</code>/<code>eager</code>. لا شيء من ذلك موجود في مستودع أحادي بمساحة عمل. وضريبة تجربة المطوّر حقيقية ومستمرة: فكل مطوّر جديد في الفريق يحتاج إلى فهم طوبولوجيا الاتحاد قبل أن ينقّح بفعالية.</p>
<p><strong>سلامة الأنواع تتوقف عند الحدّ.</strong> فلا يستطيع TypeScript أن يرى عبر مدخل وحدة بعيدة. ويعيد <code>import('remoteAnalytics/analytics-dashboard')</code> لدى المضيف النوع <code>any</code> إلا إن كنت تحافظ يدويًا على بدائل تعريفات أنواع أو تستخدم إضافة تولّدها. والأخطاء التي كانت ستُلتقط وقت التصريف في مستودع أحادي تصير أعطالًا وقت التشغيل في الإنتاج.</p>
<p><strong>إدارة الحالة تصير قيدًا.</strong> فسياق React، ومخازن Zustand، وRedux، وأي مكتبة حالة أخرى تعتمد على نسخة الوحدة، تنكسر بصمت عبر حدود الاتحاد. وعليك أن تتوجه إلى عناصر أولية مستقلة عن إطار العمل—nanostores، وBroadcastChannel، والأحداث المخصصة—وأن تعلن كل شيء مشترك كأحادي النسخة. وهذا يعمل، لكنه يضيف طبقة تعقيد لا وجود لها في التركيب وقت البناء.</p>
<p><strong>أنماط الفشل غير مرئية.</strong> فعندما يفشل تحميل وحدة بعيدة، لا تستطيع حدود أخطاء React التقاط خطأ وقت تشغيل الاتحاد: فتحصل على قسم فارغ بلا أي إشارة مرئية إلى ما جرى. ويتطلب التنقيح أن تعرف أن تفحص تبويب الشبكة بحثًا عن طلب البيان، ثم الطرفية بحثًا عن تحذيرات وقت تشغيل الاتحاد، ثم عنوان الوحدة البعيدة المستقل للتأكد من أنها تعمل أصلًا.</p>
<h3 id="القرار">القرار</h3>
<table>
<thead>
<tr>
<th></th>
<th>وقت التشغيل (الاتحاد)</th>
<th>وقت البناء (مساحة العمل)</th>
</tr>
</thead>
<tbody>
<tr>
<td>عمليات النشر المستقلة</td>
<td>نعم</td>
<td>لا</td>
</tr>
<tr>
<td>فحص الأنواع وقت التصريف</td>
<td>لا (تعريفات يدوية)</td>
<td>نعم، عبر كل الحزم</td>
</tr>
<tr>
<td>إعادة التحميل الساخن عبر الحدود</td>
<td>لا (أعد بناء الوحدة البعيدة)</td>
<td>نعم</td>
</tr>
<tr>
<td>الحالة العابرة للحدود</td>
<td>nanostores / BroadcastChannel</td>
<td>سياق React</td>
</tr>
<tr>
<td>تهيئة الاعتمادات المشتركة</td>
<td>مطلوبة (<code>singleton</code>, <code>eager</code>)</td>
<td>لا حاجة لأي منها</td>
</tr>
<tr>
<td>خوادم التطوير</td>
<td>واحد لكل وحدة بعيدة + المضيف</td>
<td>واحد</td>
</tr>
<tr>
<td>تعقيد التنقيح</td>
<td>مرتفع</td>
<td>منخفض</td>
</tr>
</tbody>
</table>
<p>الاختيار الصحيح هو التركيب وقت البناء في الغالبية العظمى من الحالات—إلى أن لا يكون. فإن كانت فرقك تنشر وفق جداول مختلفة، أو كان مستودعك يمتد عبر حدود تقنية لا يمكن توحيدها، فاتحاد الوحدات يستحق كلفته. وإلا فأنت تدفع كلفة تشغيلية إضافية لمشكلة لا تملكها.</p>
<h2 id="ما-التالي">ما التالي</h2>
<p>لقد لمست فعلًا ما تكلّفه التركيب وقت التشغيل. والسؤال التالي الطبيعي: ماذا لو استهلكت وحدة التحليلات نفسها كحزمة مساحة عمل عادية—بلا مدخل وحدة بعيدة، ولا بيان، ولا تفاوض اعتمادات مشتركة؟ المنتج نفسه، ومعمار أبسط جذريًا. وهذا ما يستكشفه <a href="https://stevekinney.com/courses/enterprise-ui/build-time-composition-exercise">التركيب وقت البناء</a>.</p>
`,r={book:s,chapter:e,chapterTitle:t,slug:n,title:a,headings:o,html:c};export{s as book,e as chapter,t as chapterTitle,r as default,o as headings,c as html,n as slug,a as title};
