const s="kinney",n="enterprise-ui",e="واجهات المؤسسات",t="build-time-composition-exercise",a="التمرين 2: التركيب وقت البناء",o=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"التهيئة",text:"التهيئة"},{depth:2,id:"استكشاف-بنية-مساحة-العمل",text:"استكشاف بنية مساحة العمل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"مخطط-اعتماد-الحزم",text:"مخطط اعتماد الحزم"},{depth:2,id:"المقارنة-مع-التركيب-وقت-التنفيذ",text:"المقارنة مع التركيب وقت التنفيذ"},{depth:3,id:"ما-يمكنك-تجربته",text:"ما يمكنك تجربته"},{depth:2,id:"اختبار-إعادة-التحميل-الفوري-عبر-الحزم",text:"اختبار إعادة التحميل الفوري عبر الحزم"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"فحص-حد-الواجهة-البرمجية-العامة",text:"فحص حد الواجهة البرمجية العامة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"التنقل-في-التطبيق",text:"التنقّل في التطبيق"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"ما-التالي",text:"ما التالي"}],p=`<p>لقد رأيت التركيب وقت التنفيذ (runtime composition) في <a href="https://stevekinney.com/courses/enterprise-ui/module-federation">Module Federation</a> ضمن <a href="https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise">التمرين 1</a>—خادمَي تطوير، وبيانات مدخل الطرف البعيد (remote entry manifests)، والتفاوض على الاعتمادات المشتركة، وإدارة الحالة عبر الحدود. الآن خُذ وحدة التحليلات نفسها واستهلكها كحزمة مساحة عمل عادية. لا مدخل طرف بعيد، ولا تفاوض على اعتمادات مشتركة—مجرد استيراد npm داخل مستودع أحادي (monorepo).</p>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>التركيب وقت البناء هو الخيار الافتراضي للفرق التي لا تحتاج إلى عمليات نشر مستقلة. فتحصل على فحص الأنواع وقت التصريف عبر حدود الحزم، وإعادة تحميل فورية، وبلا أي كلفة وقت تنفيذ. وينبغي لمعظم الفرق أن تبدأ من هنا، وألا تنتقل إلى التركيب وقت التنفيذ إلا عندما يكون لديها سبب تشغيلي ملموس (مثل إيقاع نشر مستقل بين الفرق).</p>
<h2 id="التهيئة">التهيئة</h2>
<p>من هذه النقطة فصاعدًا، سنعمل في مستودع <a href="https://github.com/stevekinney/enterprise-ui-workshop">stevekinney/enterprise-ui-workshop</a>. لنجرِ المراسم التقليدية.</p>
<pre><code class="language-bash">pnpm install
pnpm dev
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>يبدأ هذا التمرين من فرع <code>main</code>. إذا كنت تبدأ الورشة من الصفر فأنت في المكان الصحيح بالفعل، وإذا احتجت إلى إعادة الضبط فشغّل <code>git checkout main</code>.</p>
</blockquote>
<p>افتح <a href="http://localhost:5173/">http://localhost:5173</a>.</p>
<h2 id="استكشاف-بنية-مساحة-العمل">استكشاف بنية مساحة العمل</h2>
<p>إليك التخطيط الكامل لما تعمل عليه:</p>
<pre><code>enterprise-ui-workshop/
├── apps/
│   └── dashboard/              # The Vite + React host application
│       └── src/
│           ├── app.tsx
│           ├── main.tsx
│           ├── routes/
│           │   ├── analytics.tsx
│           │   ├── settings.tsx
│           │   └── users.tsx
│           └── shell/
│               ├── auth-provider.tsx
│               ├── layout.tsx
│               └── nav.tsx
├── packages/
│   ├── analytics/              # @pulse/analytics—analytics feature package
│   │   └── src/
│   │       ├── index.ts        # Public API: exports only AnalyticsDashboard
│   │       ├── analytics-dashboard.tsx
│   │       ├── stats-bar.tsx
│   │       ├── chart.tsx
│   │       └── big-table.tsx
│   ├── ui/                     # @pulse/ui—shared component library
│   │   └── src/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── stat-card.tsx
│   │       ├── loading-skeleton.tsx
│   │       └── ...
│   ├── shared/                 # @pulse/shared—types, hooks, and utilities
│   │   └── src/
│   │       ├── types.ts
│   │       ├── auth.ts
│   │       └── api-client.ts
│   └── users/                  # @pulse/users—user management feature package
├── mocks/                      # MSW mock API handlers (shared across all apps)
│   └── src/
│       └── handlers.ts
└── pnpm-workspace.yaml
</code></pre>
<p>تطبيق لوحة المعلومات (dashboard) هو التطبيق الوحيد القابل للتشغيل. والحزم الأربع تحت <code>packages/</code> هي اعتمادات مساحة العمل—تُستهلك عبر استيرادات npm العادية، وتُحلّ وقت البناء من خلال روابط pnpm الرمزية. أما <code>mocks/</code> فهي حزمة مساحة عمل قائمة بذاتها، يستوردها إعداد Vite الخاص بلوحة المعلومات لاعتراض نداءات API أثناء التطوير.</p>
<p>افتح <code>pnpm-workspace.yaml</code>—فهو يعلن أربع مجموعات لمساحة العمل:</p>
<p><em>pnpm-workspace.yaml</em></p>
<pre><code class="language-yaml"><span class="hljs-attr">packages:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;apps/*&#x27;</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;packages/*&#x27;</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;mocks&#x27;</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;codemods&#x27;</span>
</code></pre>
<p>افتح <code>packages/analytics/package.json</code>—وابحث عن نقطة الدخول:</p>
<p><em>packages/analytics/package.json</em></p>
<pre><code class="language-json"><span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./src/index.ts&quot;</span><span class="hljs-punctuation">,</span>
<span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./src/index.ts&quot;</span>
</code></pre>
<blockquote>
<p><strong>استيرادات المصدر، لا مخرجات البناء</strong></p>
<p>يشير حقل <code>main</code> مباشرةً إلى شيفرة TypeScript المصدرية. ويحلّ Vite حزم مساحة العمل عبر روابط pnpm الرمزية ويعالجها بتحويل TypeScript الخاص به—دون حاجة إلى خطوة بناء منفصلة. هذا هو نمط تجربة المطوّر (DX) المعتاد في المستودعات الأحادية: تُستهلك الحزم كمصدر أثناء التطوير. ولا تحتاج مخرجات <code>dist/</code> إلا لنشرها إلى سجلّ (registry) أو لعمليات بناء الإنتاج.</p>
</blockquote>
<p>افتح <code>packages/analytics/src/index.ts</code>—ولاحظ الواجهة البرمجية العامة الصريحة:</p>
<p><em>packages/analytics/src/index.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> { <span class="hljs-title class_">AnalyticsDashboard</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./analytics-dashboard&#x27;</span>;
</code></pre>
<p>لا يُصدَّر سوى <code>AnalyticsDashboard</code>. أما المكوّنات الداخلية مثل <code>StatsBar</code> و<code>Chart</code> و<code>BigTable</code> فليست جزءًا من الواجهة البرمجية العامة.</p>
<p>افتح <code>apps/dashboard/src/routes/analytics.tsx</code>—فالمسار يستورد من الحزمة:</p>
<p><em>apps/dashboard/src/routes/analytics.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">AnalyticsDashboard</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/analytics&#x27;</span>;
</code></pre>
<p>هذا استيراد عادي—يُحلّ وقت البناء عبر مساحة العمل، ولا يُجلب وقت التنفيذ من خادم بعيد.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>ينبغي أن ترى لوحة المعلومات تعمل على <code>http://localhost:5173</code> مع:</p>
<ul>
<li>شريط جانبي يعرض <strong>“Pulse”</strong> كاسم التطبيق و**“Grace Hopper”** وتحتها <strong>“admin”</strong></li>
<li>عرض التحليلات مع بطاقات إحصائية (12,847 / 3,291 / $284,100 / 3.2%)</li>
<li>مخطط أعمدة مع مفاتيح تبديل النطاق الزمني (7d / 30d / 90d)</li>
<li>جدول <strong>“النشاط الأخير”</strong> أسفل المخطط</li>
<li>شارة خضراء <strong>“العرض بصفة: Grace Hopper”</strong> في الترويسة</li>
</ul>
<p><img src="/arabic-cs-library/images/kinney/81f1a5072b60e7e4.webp" alt="لوحة معلومات التحليلات مع بطاقات إحصائية ومخطط أعمدة وجدول نشاط"></p>
<h2 id="مخطط-اعتماد-الحزم">مخطط اعتماد الحزم</h2>
<p>تشكّل حزم مساحة العمل مخططًا موجّهًا. وتجلس لوحة المعلومات في القمة، فتستهلك حزم الميزات التي تعتمد بدورها على مكتبات مشتركة أدنى مستوى.</p>
<pre><code>graph TD
    Dashboard[&quot;apps/dashboard&quot;]
    Analytics[&quot;packages/analytics&quot;]
    Users[&quot;packages/users&quot;]
    UI[&quot;packages/ui&quot;]
    Shared[&quot;packages/shared&quot;]

    Dashboard --&gt; Analytics
    Dashboard --&gt; Users
    Dashboard --&gt; UI
    Dashboard --&gt; Shared
    Analytics --&gt; UI
    Analytics --&gt; Shared
    Users --&gt; UI
    Users --&gt; Shared
    UI --&gt; Shared
</code></pre>
<h2 id="المقارنة-مع-التركيب-وقت-التنفيذ">المقارنة مع التركيب وقت التنفيذ</h2>
<p>فكّر في الفروق بين هذه التهيئة ونهج الاتحاد (federation) من التمرين 1:</p>
<table>
<thead>
<tr>
<th>الأمر</th>
<th>وقت التنفيذ (الاتحاد)</th>
<th>وقت البناء (مساحة العمل)</th>
</tr>
</thead>
<tbody>
<tr>
<td>خوادم التطوير</td>
<td>2 (مضيف + بعيد)</td>
<td>1</td>
</tr>
<tr>
<td>فحص الأنواع</td>
<td>منفصل لكل طرف بعيد</td>
<td>عبر جميع الحزم</td>
</tr>
<tr>
<td>إعادة التحميل الفوري</td>
<td>داخل الحد فقط</td>
<td>عبر الحدود</td>
</tr>
<tr>
<td>استقلالية النشر</td>
<td>نعم</td>
<td>لا (نشر كتلة واحدة)</td>
</tr>
<tr>
<td>التفاوض على الاعتماد المشترك</td>
<td>وقت التنفيذ (<code>singleton</code>، <code>eager</code>)</td>
<td>لا حاجة له</td>
</tr>
<tr>
<td>الحالة عبر الحدود</td>
<td>Nanostores (مستقل عن الإطار)</td>
<td>React Context (قياسي)</td>
</tr>
<tr>
<td>تعقيد نقطة الدخول</td>
<td>تمهيد غير متزامن + بيان</td>
<td><code>import</code> عادي</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>بروتوكول <code>workspace:*</code> هو طريقة pnpm في إعلان الاعتمادات المحلية</strong></p>
<p>عندما ترى <code>&quot;@pulse/analytics&quot;: &quot;workspace:*&quot;</code> في <code>package.json</code>، فهذا يخبر pnpm بأن يحلّ ذلك الاعتماد إلى الحزمة المطابقة داخل مساحة عمل المستودع الأحادي بدلًا من جلبها من سجلّ npm. وتشير <code>*</code> إلى «اقبل أي إصدار يعلنه الملف المحلي». وينشئ pnpm رابطًا رمزيًا من <code>node_modules/@pulse/analytics</code> إلى الدليل الفعلي <code>packages/analytics/</code>، ولهذا يستطيع Vite حلّ الاستيرادات إلى ملفات مصدر TypeScript دون خطوة بناء. وعندما تنشر الحزم إلى سجلّ، يستبدل pnpm تلقائيًا <code>workspace:*</code> برقم الإصدار الحقيقي عند النشر—لذا هذا البروتوكول مجرد تسهيل يخص وقت التطوير ويختفي من مخرجات الإنتاج.</p>
</blockquote>
<h3 id="ما-يمكنك-تجربته">ما يمكنك تجربته</h3>
<ol>
<li>افتح <code>apps/dashboard/src/shell/auth-provider.tsx</code>—فمزوّد المصادقة يستخدم React Context القياسي. قارن هذا بالتمرين 1 حيث احتجت إلى nanostores لعبور حد الاتحاد.</li>
<li>افتح <code>packages/analytics/src/analytics-dashboard.tsx</code>—فهو يستورد <code>useAuth</code> من <code>@pulse/shared</code> مباشرةً. لا nanostores، ولا اشتراك في مخزن—مجرد <code>useContext</code> في الخلفية.</li>
</ol>
<blockquote>
<p><strong>لماذا يعمل React Context هنا</strong></p>
<p>في التركيب وقت البناء تُجمَّع كل الحزم في تطبيق React واحد. فهناك نسخة React واحدة بالضبط، وشجرة مكوّنات واحدة، وسجلّ سياق واحد. وعندما يوفّر <code>AuthProvider</code> في <code>apps/dashboard</code> قيمةً، يقرأ الخُطّاف <code>useAuth()</code> في <code>packages/analytics</code> من السياق نفسه—لأنهما يتشاركان نسخة الوحدة نفسها من <code>@pulse/shared</code>. وهذا هو الفرق الجوهري عن الاتحاد، حيث تُنشئ عمليات البناء المنفصلة نسخًا منفصلة من الوحدات.</p>
</blockquote>
<h2 id="اختبار-إعادة-التحميل-الفوري-عبر-الحزم">اختبار إعادة التحميل الفوري عبر الحزم</h2>
<p>من أكبر مكاسب تجربة المطوّر في التركيب وقت البناء إعادة التحميل الفوري السلسة عبر حدود الحزم.</p>
<p>افتح <code>packages/analytics/src/chart.tsx</code> وغيّر صنف تعبئة الأعمدة من <code>fill-gray-800</code> إلى <code>fill-blue-600</code>. احفظ الملف—فيتحدّث المتصفح فورًا دون إعادة تحميل كاملة للصفحة.</p>
<p>في تهيئة الاتحاد، كانت التغييرات على الطرف البعيد تتطلّب إعادة بناء الطرف البعيد وتحديث المضيف. أما هنا، فيراقب Vite جميع حزم مساحة العمل ويعالج التغييرات عبر خط تحويله الخاص.</p>
<p>أعِد التغيير إلى <code>fill-gray-800</code>.</p>
<blockquote>
<p><strong>استبدال الوحدات الساخن (HMR)</strong></p>
<p>يستبدل HMR الوحدات المتغيّرة في التطبيق قيد التشغيل دون إعادة تحميل كاملة للصفحة. فعندما تحفظ ملفًا، يكتشف Vite التغيير ويعيد تصريف تلك الوحدة وحدها ويرسل التحديث إلى المتصفح عبر اتصال WebSocket. ويستبدل المتصفح الوحدة القديمة في الذاكرة ويعيد تصيير المكوّنات المتأثرة مع الحفاظ على حالة التطبيق—فمدخلات النماذج وموضع التمرير وحالة مكوّنات React والتنقّل كلها تنجو من التحديث. وهذا مختلف جذريًا عن إعادة التحميل الكاملة للصفحة، التي تهدم التطبيق بأكمله وتعيد جلب كل الموارد وإعادة تحليل كل شيفرة JavaScript والبدء من الحالة الأولية. وفي مستودع أحادي بالتركيب وقت البناء، يعمل HMR عبر حدود الحزم لأن Vite يتعامل مع جميع حزم مساحة العمل كجزء من مخطط وحدات واحد—فالتغيير في <code>packages/analytics/src/chart.tsx</code> يطلق تحديث HMR في <code>apps/dashboard</code> دون أي خطوة إعادة بناء.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>تنعكس التغييرات في أي ملف تحت <code>packages/analytics/</code> في المتصفح فورًا عبر استبدال الوحدات الساخن. لا إعادة بناء، ولا تحديث.</p>
<h2 id="فحص-حد-الواجهة-البرمجية-العامة">فحص حد الواجهة البرمجية العامة</h2>
<p>لا تُصدّر حزمة التحليلات سوى <code>AnalyticsDashboard</code> من ملف <code>index.ts</code> الخاص بها. لكن لا شيء يمنع الآن الحزم الأخرى من النفاذ إلى داخلياتها.</p>
<p>افتح <code>apps/dashboard/src/routes/analytics.tsx</code> وحاول إضافة استيراد مباشر لمكوّن داخلي:</p>
<p><em>apps/dashboard/src/routes/analytics.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">StatsBar</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/analytics/src/stats-bar&#x27;</span>;
</code></pre>
<p>يحلّ TypeScript هذا بلا مشكلة—فالاستيراد يعمل. لكنه يتجاوز الواجهة البرمجية العامة للحزمة. وهذا مصدر شائع للارتباط (coupling) في المستودعات الأحادية.</p>
<blockquote>
<p><strong>لا ينبغي السماح بهذا الاستيراد</strong></p>
<p>في التمرين 6 ستهيّئ <code>eslint-plugin-boundaries</code> ليعرض هذا كخطأ فحص. أما الآن فاكتفِ بملاحظة أن الحدّ المعماري موجود بالعُرف (فصادرات <code>index.ts</code> فقط هي العامة) لكن الأدوات لا تفرضه.</p>
</blockquote>
<p>أزِل الاستيراد عند الانتهاء.</p>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>لقد تأكّدت أن الاستيرادات الداخلية تعمل لكن لا ينبغي لها—فالواجهة البرمجية العامة تُعرَّف بصادرات <code>index.ts</code>، لكن لا شيء يفرضها بعد.</p>
<h2 id="التنقل-في-التطبيق">التنقّل في التطبيق</h2>
<p>تتضمّن لوحة المعلومات توجيهًا (routing)—بخلاف تهيئة الاتحاد التي كان فيها عرض تحليلات واحد فقط.</p>
<ol>
<li>انقر <strong>“الإعدادات”</strong> في تنقّل الشريط الجانبي</li>
<li>تُحمَّل صفحة الإعدادات عارضةً معلومات المؤسسة (Pulse Inc., pro plan)</li>
<li>انقر <strong>“التحليلات”</strong> للعودة—فبيانات التحليلات ما زالت محمّلة</li>
</ol>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>تُحمَّل المسارات تحميلًا كسولًا باستخدام <code>React.lazy()</code> و<code>Suspense</code>. وعندما تنتقل إلى الإعدادات أول مرة، يستورد React وحدة المسار ديناميكيًا. ويظهر مكوّن <code>LoadingSkeleton</code> أثناء الاستيراد. وفي التنقّلات اللاحقة تُخزَّن الوحدة في ذاكرة مؤقتة.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>يعمل التنقّل بين التحليلات والإعدادات. ويُبرز الشريط الجانبي المسار النشط. وتحمّل الصفحتان بياناتهما من معالِجات MSW البديلة المُحاكاة.</p>
<p><img src="/arabic-cs-library/images/kinney/c6b8b7c887d5b50b.webp" alt="صفحة الإعدادات مع بيانات المؤسسة"></p>
<p><img src="/arabic-cs-library/images/kinney/a6230313af9a8515.webp" alt="صفحة المستخدمين مع قائمة المستخدمين"></p>
<h2 id="الحل">الحل</h2>
<p>إن احتجت إلى اللحاق، فالحالة المكتملة لهذا التمرين متاحة على فرع <code>02-streaming-start</code>:</p>
<pre><code class="language-bash">git checkout 02-streaming-start
pnpm install
</code></pre>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>أضف مكوّنًا جديدًا إلى <code>packages/analytics</code>:</strong> أنشئ مكوّن <code>summary-header.tsx</code>، وصدّره من <code>index.ts</code>، واستخدمه في لوحة المعلومات. ولاحظ كيف يعمل تكامل TypeScript عبر الحد.</li>
<li><strong>استكشف واجهة API البديلة المُحاكاة:</strong> افتح <code>mocks/src/handlers.ts</code> وغيّر التأخير على <code>/api/analytics/summary</code> من <code>200</code> إلى <code>3000</code>. ولاحظ كيف تتصرّف حالة التحميل عندما تكون واجهة API بطيئة.</li>
<li><strong>تتبّع مخطط الاعتماد:</strong> بدءًا من <code>apps/dashboard/package.json</code>، تتبّع أي حزم تعتمد على أي. وارسم المخطط. فهذا هو المخطط الذي سيُحسّنه Turborepo في التمرين 4.</li>
</ul>
<h2 id="ما-التالي">ما التالي</h2>
<p>لقد جرّبت التركيب وقت البناء: خادم تطوير واحد، وأنواع وقت التصريف عبر الحدود، وإعادة تحميل فورية. تجلب لوحة معلومات التحليلات ثلاث واجهات API بسرعات مختلفة، لكنها الآن تُحلّ كلها معًا كحالة تحميل واحدة. وفي التمرين التالي ستضيف SSR بالبث وحدود Suspense لتصيير كل قسم تدريجيًا مع وصول بياناته.</p>
`,c={book:s,chapter:n,chapterTitle:e,slug:t,title:a,headings:o,html:p};export{s as book,n as chapter,e as chapterTitle,c as default,o as headings,p as html,t as slug,a as title};
