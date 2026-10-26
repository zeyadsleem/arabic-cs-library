const s="kinney",a="enterprise-ui",n="واجهات المؤسسات",p="strangler-fig-and-codemods-exercise",t="التمرين 9: شجرة الخنّاق التينيّ وأدوات التحويل البرمجي (Codemods)",l=[{depth:2,id:"ما-الذي-ستفعله",text:"ما الذي ستفعله"},{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"المتطلبات-المسبقة",text:"المتطلبات المسبقة"},{depth:2,id:"التهيئة",text:"التهيئة"},{depth:2,id:"استكشف-التطبيق-القديم",text:"استكشف التطبيق القديم"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"تهيئة-شجرة-الخناق-التيني-للتوجيه",text:"تهيئة شجرة الخنّاق التينيّ للتوجيه"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"هاجر-مسارا-واحدا",text:"هاجر مسارًا واحدًا"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"اكتب-أداة-تحويل-برمجي-بـjscodeshift",text:"اكتب أداة تحويل برمجي بـjscodeshift"},{depth:2,id:"اختبر-أداة-التحويل",text:"اختبر أداة التحويل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"اكتب-اختبارات-لأداة-التحويل",text:"اكتب اختبارات لأداة التحويل"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"أهداف-موسعة",text:"أهداف موسّعة"},{depth:2,id:"ما-التالي",text:"ما التالي"}],e=`<h2 id="ما-الذي-ستفعله">ما الذي ستفعله</h2>
<p>ظهر تطبيق قديم في المستودع الأحادي عند <code>apps/legacy/</code>. وفيه مكوّنات على الطراز القديم، وبنية ملفات مسطّحة، وبلا فصل بين الحزم. وستُنشئ شجرة خنّاق تينيّ على مستوى التوجيه بحيث يتعايش التطبيقان، وتهاجر مسارًا واحدًا من القديم إلى الحديث، وتكتب أداة تحويل برمجي بـjscodeshift تُؤتمت تحويلات الاستيراد اللازمة لنقل بقية قاعدة الشفرة.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>لا أحد يبدأ من الصفر. ففي الواقع العملي ترث شفرة قديمة وتهاجر تدريجيًا. ويمنحك نمط شجرة الخنّاق التينيّ استراتيجية تعايش آمنة: المسارات الجديدة تذهب إلى التطبيق الحديث، والمسارات القديمة تبقى في التطبيق القديم، وتهاجر مسارًا واحدًا في كل مرة حتى يخلو التطبيق القديم. وتُؤتمت أدوات التحويل البرمجي الأجزاء الميكانيكية من الترحيل — إعادة تسمية الاستيرادات، وتحديث نداءات API، وتحويل الأنماط — فيقضي المطوّرون وقتهم في القرارات لا في البحث والاستبدال. والجمع بين شجرة الخنّاق التينيّ وأدوات التحويل البرمجي هو كيف تهاجر الفرق الكبيرة دون تجميد تطوير الميزات.</p>
<h2 id="المتطلبات-المسبقة">المتطلبات المسبقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>Node.js 20+</li>
<li>pnpm 9+</li>
</ul>
<h2 id="التهيئة">التهيئة</h2>
<p>ينبغي أن تكون مكملًا من حيث انتهى التمرين 9 (استراتيجيات الاختبار). وإذا احتجت إلى اللحاق:</p>
<pre><code class="language-bash">git checkout 09-migration-start
pnpm install
</code></pre>
<h2 id="استكشف-التطبيق-القديم">استكشف التطبيق القديم</h2>
<p>ابدأ بفهم ما تهاجر منه.</p>
<p>افتح <code>apps/legacy/src/legacy-app.tsx</code>. ولاحظ الأنماط التي تدل على أن هذه شفرة قديمة:</p>
<p><em>apps/legacy/src/legacy-app.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-comment">// Old-style React — no packages, no separation of concerns</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LegacyAnalytics</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./legacy-analytics&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LegacyApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">fontFamily:</span> &quot;<span class="hljs-attr">sans-serif</span>&quot;, <span class="hljs-attr">padding:</span> &quot;<span class="hljs-attr">20px</span>&quot; }}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &quot;#<span class="hljs-attr">333</span>&quot; }}&gt;</span>Pulse (Legacy)<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginBottom:</span> &quot;<span class="hljs-attr">20px</span>&quot; }}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/legacy/analytics&quot;</span>&gt;</span>Analytics<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        {&quot; | &quot;}
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/legacy/settings&quot;</span>&gt;</span>Settings<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">LegacyAnalytics</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>ما الذي يجعل هذا «قديمًا»</strong></p>
<p>الأمر ليس في عمر الشفرة — بل في الأنماط. أنماط مضمّنة بدل نظام تصميم. واستيرادات ملفات محلية بدل استيرادات حزم. وبلا أنواع TypeScript من <code>@pulse/shared</code>. وبلا فصل بين حزم الميزات. وكل شيء يعيش في مجلد مسطّح. هذا هو التطبيق الشامل قبل المعمارية.</p>
</blockquote>
<p>افتح <code>apps/legacy/src/legacy-analytics.tsx</code>. يفعل هذا المكوّن ما يفعله <code>@pulse/analytics</code>، لكن بلا فصل بين الحزم:</p>
<p><em>apps/legacy/src/legacy-analytics.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">LegacyChart</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./legacy-chart&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LegacyAnalytics</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ... fetches data inline, renders stats and chart</span>
  <span class="hljs-comment">// Uses local components instead of @pulse/ui</span>
  <span class="hljs-comment">// No Suspense, no streaming, no loading skeletons</span>
}
</code></pre>
<p>قارن مع <code>packages/analytics/src/analytics-dashboard.tsx</code>. الميزة نفسها في المنتج، ومعمارية مختلفة تمامًا. فالنسخة الحديثة تستخدم مكوّنات <code>@pulse/ui</code>، وأنواع <code>@pulse/shared</code>، وحدود Suspense، وجلب بيانات في المكان نفسه. أما النسخة القديمة فكل شيء فيها مضمَّن.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>لقد فهمت الفروق البنيوية بين التطبيق القديم والحديث. فالتطبيق القديم بلا حدود حزم، وبلا أنواع مشتركة، وبلا تكامل مع نظام التصميم.</p>
<p><img src="/arabic-cs-library/images/kinney/f8176c130a4cea8c.webp" alt="تطبيق قديم بأنماط مضمّنة وبنية مسطّحة"></p>
<p><img src="/arabic-cs-library/images/kinney/81f1a5072b60e7e4.webp" alt="تطبيق حديث بمعمارية قائمة على الحزم"></p>
<h2 id="تهيئة-شجرة-الخناق-التيني-للتوجيه">تهيئة شجرة الخنّاق التينيّ للتوجيه</h2>
<p>يعمل نمط شجرة الخنّاق التينيّ بوضع طبقة توجيه أمام التطبيقين. فالمسارات الجديدة تذهب إلى التطبيق الحديث، والمسارات القديمة تذهب إلى التطبيق القديم. وبمرور الوقت تنقل المسارات من القديم إلى الحديث حتى لا تبقى للتطبيق القديم أي مسارات.</p>
<pre><code>flowchart TD
    User[&quot;User Browser&quot;]
    Proxy[&quot;Vite Dev Server (Port 5173)&quot;]
    Modern[&quot;Modern Dashboard App&quot;]
    Legacy[&quot;Legacy App (Port 5174)&quot;]

    User --&gt;|&quot;all requests&quot;| Proxy
    Proxy --&gt;|&quot;/legacy/*&quot;| Legacy
    Proxy --&gt;|&quot;everything else&quot;| Modern
</code></pre>
<blockquote>
<p><strong>نمط شجرة الخنّاق التينيّ</strong></p>
<p>سُمّي نمط شجرة الخنّاق التينيّ على اسم شجرة الخنّاق التينيّ، التي تنمو بالتفافها حول شجرة مضيفة. ففي الطبيعة تنبت بذرة الخنّاق التينيّ في ظلّة شجرة قائمة، وترسل جذورًا إلى الأرض، وتغلّف تدريجيًا جذع الشجرة المضيفة ببنيّتها الجذرية. وعلى مدى سنوات، تتكاثف جذور التين وتلتحم حتى تكوّن شبكة قائمة بذاتها، ثم تتحلّل الشجرة المضيفة الأصلية — وقد لم تعد لازمة — وتتلاشى. واستعار مارتن فاولر هذه الاستعارة لترحيل البرمجيات: فبدل إعادة كتابة نظام قديم من الصفر (وهو نهج شديد الخطر)، تبني النظام الجديد حول القديم، موجّهًا الحركة إلى النظام الجديد نقطة نهاية واحدة أو ميزة واحدة في كل مرة. ويستمر النظام القديم في خدمة أي مسارات لم تُهاجر بعد، ويتقلّص تدريجيًا حتى لا يخدم أي حركة على الإطلاق ويمكن إزالته بأمان. والنمط قيّم تحديدًا لأنه يلغي الانتقال «الانفجاري» — ففي كل مرحلة من الترحيل يكون لديك نظام يعمل، وكل خطوة ترحيل منفردة صغيرة بما يكفي لمراجعتها واختبارها والرجوع عنها باستقلال.</p>
</blockquote>
<p>افتح <code>apps/dashboard/vite.config.ts</code> وأضف إعداد وسيط يمرّر المسارات القديمة إلى خادم التطوير في التطبيق القديم:</p>
<p><em>apps/dashboard/vite.config.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;
<span class="hljs-keyword">import</span> tailwindcss <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tailwindcss/vite&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">react</span>(), <span class="hljs-title function_">tailwindcss</span>()],
  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">port</span>: <span class="hljs-number">5173</span>,
    <span class="hljs-attr">proxy</span>: {
      <span class="hljs-string">&#x27;/legacy&#x27;</span>: {
        <span class="hljs-attr">target</span>: <span class="hljs-string">&#x27;http://localhost:5174&#x27;</span>,
        <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
      },
    },
  },
});
</code></pre>
<p>بعد ذلك، أضف مسار الأساس إلى خادم التطوير في التطبيق القديم. افتح <code>apps/legacy/vite.config.ts</code> وأضف <code>base: &quot;/legacy/&quot;</code>:</p>
<p><em>apps/legacy/vite.config.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>;
<span class="hljs-keyword">import</span> react <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@vitejs/plugin-react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">react</span>()],
  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">port</span>: <span class="hljs-number">5174</span>,
  },
  <span class="hljs-attr">base</span>: <span class="hljs-string">&#x27;/legacy/&#x27;</span>,
});
</code></pre>
<p><em>ملاحظة:</em> يقدّم كل الموارد تحت /legacy/ حتى يعمل توجيه الوسيط بشكل صحيح.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>المنفذ <code>port: 5174</code> مضبوط بالفعل في الإعداد الابتدائي. والتغيير الوحيد المطلوب هنا هو إضافة <code>base: &quot;/legacy/&quot;</code> حتى تُقدَّم موارد التطبيق القديم تحت بادئة المسار <code>/legacy/</code>، وهو ما يلزم ليمرّرها الوسيط بشكل صحيح.</p>
</blockquote>
<p>شغّل خادمَي التطوير معًا. وأضف سكربتًا إلى <code>package.json</code> في الجذر أو شغّلهما يدويًا:</p>
<pre><code class="language-bash">pnpm --filter @pulse/dashboard dev &amp;
pnpm --filter @pulse/legacy dev &amp;
</code></pre>
<p>اختبر التوجيه:</p>
<ul>
<li>افتح <a href="http://localhost:5173/">http://localhost:5173</a> — فتُحمَّل لوحة التحكم الحديثة</li>
<li>افتح <a href="http://localhost:5173/legacy/">http://localhost:5173/legacy/</a> — فيُحمَّل التطبيق القديم، ممرَّرًا عبر خادم التطبيق الحديث</li>
</ul>
<blockquote>
<p><strong>الوسيط هو الخنّاق</strong></p>
<p>خادم التطوير في التطبيق الحديث هو نقطة الدخول الوحيدة. وهو يملك قرار التوجيه: الطلبات إلى <code>/legacy/*</code> تُمرَّر إلى الخادم القديم، وكل ما عداها يتولاه التطبيق الحديث. ولتهاجر مسارًا، تتوقف عن تمريره إلى القديم وتضيفه إلى موجّه التطبيق الحديث بدل ذلك. ولا يعرف المستخدم أبدًا أي تطبيق قدّم الصفحة — فبنية URL تبقى كما هي. وفي الإنتاج، سيكون هذا الوسيط وكيلًا عكسيًا (Nginx أو CloudFront أو التوجيه الطرفي في شبكة توصيل المحتوى لديك) لا وسيط Vite للتطوير.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>التطبيقان متاحان عبر نقطة دخول واحدة عند <code>localhost:5173</code>. والمسارات الحديثة تُصيَّر من تطبيق لوحة التحكم. والمسارات القديمة تُمرَّر عبر الوسيط إلى التطبيق القديم على المنفذ 5174.</p>
<h2 id="هاجر-مسارا-واحدا">هاجر مسارًا واحدًا</h2>
<p>خُذ عرض التحليلات القديم واستبدله بحزمة <code>@pulse/analytics</code> الحديثة.</p>
<p>مسار التحليلات القديم عند <code>/legacy/analytics</code>. وتريد نقله بحيث يقدّم <code>/analytics</code> (أو <code>/</code>) النسخة الحديثة. وهذا هو الحال بالفعل — فتوجيه لوحة التحكم الحديثة يتولى <code>/</code> بمسار التحليلات. وتعني شجرة الخنّاق التينيّ أن المستخدمين الذين أضافوا <code>/legacy/analytics</code> إلى مفضلاتهم ينبغي في النهاية أن يُعاد توجيههم إلى <code>/</code>.</p>
<p>أضف إعادة توجيه في التطبيق القديم للمسار المهاجَر. واستبدل مكوّن <code>LegacyApp</code> كاملًا بنسخة تعيد توجيه المسارات المهاجَرة. فالمكوّن كان يصيّر التنقل ومكوّن <code>LegacyAnalytics</code> — أما الآن فيفحص مسار URL ويعيد توجيه <code>/legacy/analytics</code> إلى التطبيق الحديث عند <code>/</code>.</p>
<p>افتح <code>apps/legacy/src/legacy-app.tsx</code> واستبدل المكوّن:</p>
<p><em>apps/legacy/src/legacy-app.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LegacyApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> path = <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">pathname</span>;

  <span class="hljs-keyword">if</span> (path === <span class="hljs-string">&quot;/legacy/analytics&quot;</span>) {
    <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span> = <span class="hljs-string">&quot;/&quot;</span>;
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Redirecting to modern analytics...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">fontFamily:</span> &quot;<span class="hljs-attr">sans-serif</span>&quot;, <span class="hljs-attr">padding:</span> &quot;<span class="hljs-attr">20px</span>&quot; }}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &quot;#<span class="hljs-attr">333</span>&quot; }}&gt;</span>Pulse (Legacy)<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Settings and other legacy routes still live here.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><em>ملاحظة:</em> يعيد توجيه المسار المهاجَر إلى التطبيق الحديث حتى تظل الروابط المحفوظة القديمة تعمل.</p>
<p>تحقق من الترحيل:</p>
<ul>
<li>انتقل إلى <a href="http://localhost:5173/legacy/analytics">http://localhost:5173/legacy/analytics</a> — ينبغي أن يعيد التوجيه إلى <code>/</code> (لوحة التحليلات الحديثة)</li>
<li>انتقل إلى <a href="http://localhost:5173/legacy/settings">http://localhost:5173/legacy/settings</a> — فتُحمَّل صفحة الإعدادات القديمة عادةً</li>
<li>انتقل إلى <a href="http://localhost:5173/">http://localhost:5173/</a> — فتُصيَّر لوحة التحليلات الحديثة بكل معمارية التمارين 2-8</li>
</ul>
<blockquote>
<p><strong>الترحيل عملية مسار واحد في كل مرة</strong></p>
<p>في مشروع حقيقي، ستهاجر أبسط مسار أو أكثره حركة أولًا — للتحقق من النمط وبناء الثقة. وكل ترحيل طلب سحب منفصل: حدّث الوسيط/التوجيه، وتحقّق من عمل النسخة الحديثة، وأضف إعادة التوجيه من القديم. ويتقلّص التطبيق القديم مع كل طلب سحب. وعندما تُهاجر كل المسارات، تحذف <code>apps/legacy/</code> بالكامل. والانتظام الجوهري هو: لا تهاجر مسارين في طلب السحب نفسه أبدًا. وينبغي أن يكون كل ترحيل قابلًا للرجوع عنه باستقلال.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>مسار التحليلات مهاجَر بالكامل. والتحليلات القديمة تعيد التوجيه إلى التطبيق الحديث. وبقية المسارات القديمة ما زالت تعمل عبر الوسيط.</p>
<h2 id="اكتب-أداة-تحويل-برمجي-بـjscodeshift">اكتب أداة تحويل برمجي بـjscodeshift</h2>
<p>في التطبيق القديم أنماط استيراد تحتاج إلى تحويل لأجل المعمارية الحديثة. وستكتب أداة تحويل برمجي تُؤتمت ذلك.</p>
<p>تُحلّل أداة التحويل البرمجي الشفرة المصدرية إلى شجرة صياغة مجرّدة، وتجد العُقد المطابقة لنمط ما، وتستبدلها بعُقد جديدة، وتطبع الشجرة المعدّلة مرة أخرى كشفرة مصدرية.</p>
<pre><code>flowchart LR
    Source[&quot;Source Code&quot;]
    Parse[&quot;Parser (tsx)&quot;]
    AST[&quot;Abstract Syntax Tree&quot;]
    Find[&quot;Find: ImportDeclaration\\nfrom './legacy-*'&quot;]
    Replace[&quot;Replace with:\\n@pulse/analytics\\n@pulse/ui&quot;]
    Print[&quot;Print to Source&quot;]
    Output[&quot;Transformed Code&quot;]

    Source --&gt; Parse --&gt; AST --&gt; Find --&gt; Replace --&gt; Print --&gt; Output
</code></pre>
<p>افتح <code>codemods/src/migrate-legacy-import.ts</code>. فهو يحتوي على بديل فارغ:</p>
<p><em>codemods/src/migrate-legacy-import.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-variable constant_">API</span>, <span class="hljs-title class_">FileInfo</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jscodeshift&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">transform</span>(<span class="hljs-params"><span class="hljs-attr">file</span>: <span class="hljs-title class_">FileInfo</span>, <span class="hljs-attr">api</span>: API</span>) {
  <span class="hljs-keyword">const</span> j = api.<span class="hljs-property">jscodeshift</span>;
  <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">j</span>(file.<span class="hljs-property">source</span>);

  <span class="hljs-comment">// Your transform here</span>

  <span class="hljs-keyword">return</span> root.<span class="hljs-title function_">toSource</span>();
}
</code></pre>
<p>نفّذ التحويل. ينبغي أن تجد الأداة استيرادات مثل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">LegacyChart</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./legacy-chart&#x27;</span>;
</code></pre>
<p>وتحوّلها إلى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Chart</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/analytics&#x27;</span>;
</code></pre>
<p>استبدل البديل الفارغ في <code>codemods/src/migrate-legacy-import.ts</code> بهذا التنفيذ:</p>
<p><em>codemods/src/migrate-legacy-import.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-variable constant_">API</span>, <span class="hljs-title class_">FileInfo</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jscodeshift&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-attr">IMPORT_MAP</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, { <span class="hljs-attr">source</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> }&gt; = {
  <span class="hljs-title class_">LegacyChart</span>: { <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;@pulse/analytics&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Chart&#x27;</span> },
  <span class="hljs-title class_">LegacyStatsBar</span>: { <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;@pulse/analytics&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;StatsBar&#x27;</span> },
  <span class="hljs-title class_">LegacyDataTable</span>: { <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;@pulse/ui&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;DataTable&#x27;</span> },
  <span class="hljs-title class_">LegacyButton</span>: { <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;@pulse/ui&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Button&#x27;</span> },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">transform</span>(<span class="hljs-params"><span class="hljs-attr">file</span>: <span class="hljs-title class_">FileInfo</span>, <span class="hljs-attr">api</span>: API</span>) {
  <span class="hljs-keyword">const</span> j = api.<span class="hljs-property">jscodeshift</span>;
  <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">j</span>(file.<span class="hljs-property">source</span>);

  <span class="hljs-comment">// Find all import declarations from legacy local files</span>
  root
    .<span class="hljs-title function_">find</span>(j.<span class="hljs-property">ImportDeclaration</span>)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> source = path.<span class="hljs-property">node</span>.<span class="hljs-property">source</span>.<span class="hljs-property">value</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> source === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp; source.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;./legacy-&#x27;</span>);
    })
    .<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> specifiers = path.<span class="hljs-property">node</span>.<span class="hljs-property">specifiers</span>;
      <span class="hljs-keyword">if</span> (!specifiers) <span class="hljs-keyword">return</span>;

      <span class="hljs-comment">// Group new imports by their target package</span>
      <span class="hljs-keyword">const</span> newImports = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;();

      specifiers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">specifier</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (specifier.<span class="hljs-property">type</span> !== <span class="hljs-string">&#x27;ImportSpecifier&#x27;</span>) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">const</span> oldName = specifier.<span class="hljs-property">imported</span>.<span class="hljs-property">name</span>;
        <span class="hljs-keyword">const</span> mapping = <span class="hljs-variable constant_">IMPORT_MAP</span>[oldName];

        <span class="hljs-keyword">if</span> (mapping) {
          <span class="hljs-keyword">const</span> existing = newImports.<span class="hljs-title function_">get</span>(mapping.<span class="hljs-property">source</span>) || [];
          existing.<span class="hljs-title function_">push</span>(mapping.<span class="hljs-property">name</span>);
          newImports.<span class="hljs-title function_">set</span>(mapping.<span class="hljs-property">source</span>, existing);
        }
      });

      <span class="hljs-comment">// Replace the old import with new package imports</span>
      <span class="hljs-keyword">const</span> replacements = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(newImports.<span class="hljs-title function_">entries</span>()).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[source, names]</span>) =&gt;</span>
        j.<span class="hljs-title function_">importDeclaration</span>(
          names.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> j.<span class="hljs-title function_">importSpecifier</span>(j.<span class="hljs-title function_">identifier</span>(name), j.<span class="hljs-title function_">identifier</span>(name))),
          j.<span class="hljs-title function_">literal</span>(source),
        ),
      );

      <span class="hljs-keyword">if</span> (replacements.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-title function_">j</span>(path).<span class="hljs-title function_">replaceWith</span>(replacements);
      }
    });

  <span class="hljs-comment">// Replace usage of old component names with new names</span>
  <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(<span class="hljs-variable constant_">IMPORT_MAP</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[oldName, { name: newName }]</span>) =&gt;</span> {
    root.<span class="hljs-title function_">find</span>(j.<span class="hljs-property">JSXIdentifier</span>, { <span class="hljs-attr">name</span>: oldName }).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
      path.<span class="hljs-property">node</span>.<span class="hljs-property">name</span> = newName;
    });

    root
      .<span class="hljs-title function_">find</span>(j.<span class="hljs-property">Identifier</span>, { <span class="hljs-attr">name</span>: oldName })
      .<span class="hljs-title function_">filter</span>(
        <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span>
          path.<span class="hljs-property">parent</span>.<span class="hljs-property">node</span>.<span class="hljs-property">type</span> !== <span class="hljs-string">&#x27;ImportSpecifier&#x27;</span> &amp;&amp;
          path.<span class="hljs-property">parent</span>.<span class="hljs-property">node</span>.<span class="hljs-property">type</span> !== <span class="hljs-string">&#x27;ImportDefaultSpecifier&#x27;</span>,
      )
      .<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
        path.<span class="hljs-property">node</span>.<span class="hljs-property">name</span> = newName;
      });
  });

  <span class="hljs-keyword">return</span> root.<span class="hljs-title function_">toSource</span>();
}
</code></pre>
<p><em>ملاحظة:</em> يربط كل مكوّن قديم بحزمته واسمه الحديثين.</p>
<p><em>ملاحظة:</em> يجد عُقد شجرة الصياغة للاستيرادات من مسارات ./legacy-*.</p>
<p><em>ملاحظة:</em> يستبدل عقدة الاستيراد القديمة باستيراد أو أكثر من استيرادات الحزم الحديثة.</p>
<p><em>ملاحظة:</em> يعيد تسمية عناصر JSX مثل &lt;LegacyChart&gt; إلى &lt;Chart&gt; في الملف كله.</p>
<blockquote>
<p><strong>كيف يعمل jscodeshift</strong></p>
<p>يُحلّل jscodeshift شفرة JavaScript/TypeScript إلى شجرة صياغة مجرّدة (AST)، ويتيح لك البحث في عُقد تلك الشجرة وتحويلها، ثم يطبع الشجرة المعدّلة مرة أخرى كشفرة مصدرية. وخلافًا للبحث والاستبدال بالتعبيرات النمطية، تفهم تحويلات شجرة الصياغة بنية الشفرة — فهي تستطيع التمييز بين <code>LegacyChart</code> في عبارة استيراد و<code>LegacyChart</code> في عنصر JSX. وتبحث الدالة <code>j.find()</code> عن عُقد شجرة الصياغة المطابقة لنمط ما، وتستبدلها الدالة <code>j.replaceWith()</code> بعُقد جديدة. وتتلقى دالة التحويل ملفًا واحدًا في المرة وتُرجع الشفرة المعدّلة.</p>
</blockquote>
<blockquote>
<p><strong>أشجار الصياغة المجرّدة</strong></p>
<p>شجرة الصياغة المجرّدة (AST) بنية بيانات على شكل شجرة تمثّل البنية النحوية للشفرة المصدرية. فحين يقرأ محلّل العبارة <code>import { Chart } from &quot;@pulse/analytics&quot;</code>، فإنه لا يرى سلسلة أحرف مسطّحة — بل ينتج شجرة تكون عقدتها العليا <code>ImportDeclaration</code>، ولها عُقد فرعية لكل محدِّد مستورَد (<code>Chart</code>) وللسلسلة المصدرية (<code>&quot;@pulse/analytics&quot;</code>). وكل تركيب في اللغة — تعريفات المتغيرات، ونداءات الدوال، وعناصر JSX، والتعبيرات الثنائية — يصبح عقدة في هذه الشجرة، وتعبيراته الفرعية أبناء لها. وتعتمد أدوات مثل jscodeshift وESLint وBabel وPrettier كلها على أشجار الصياغة لا على النص الخام، لأن عمليات الأشجار واعية بالبنية: فيمكنك أن تجد «كل عبارات الاستيراد التي يبدأ مصدرها بـ<code>./legacy-</code>» دون القلق بشأن المسافات أو التعليقات أو اختلافات التنسيق التي تُربك تعبيرًا نمطيًا. وكلمة «مجرّدة» في AST تعني أن الشجرة تحذف التفاصيل النحوية التي لا تؤثر في المعنى (مثل الأقواس المستخدمة للتجميع فقط أو الفواصل المنقوطة) وتركّز على البنية المنطقية للبرنامج.</p>
</blockquote>
<h2 id="اختبر-أداة-التحويل">اختبر أداة التحويل</h2>
<p>شغّل أداة التحويل على ملفات مصدر التطبيق القديم:</p>
<pre><code class="language-bash">npx jscodeshift \\
  --parser tsx \\
  --transform codemods/src/migrate-legacy-import.ts \\
  apps/legacy/src/
</code></pre>
<p>افحص الفرق (diff) لترى ما تغيّر:</p>
<pre><code class="language-bash">git diff apps/legacy/src/
</code></pre>
<p>ينبغي أن ترى الاستيرادات محوّلة من المسارات المحلية القديمة إلى مسارات الحزم الحديثة، وأسماء المكوّنات محدّثة من <code>LegacyChart</code> إلى <code>Chart</code>، ومن <code>LegacyButton</code> إلى <code>Button</code>، وهكذا.</p>
<p>تحقق من صحة التحويلات. افتح الملفات المعدّلة وافحص:</p>
<ul>
<li>قديم: <code>import { LegacyChart } from &quot;./legacy-chart&quot;</code></li>
<li>جديد: <code>import { Chart } from &quot;@pulse/analytics&quot;</code></li>
<li>قديم: <code>&lt;LegacyChart data={data} /&gt;</code></li>
<li>جديد: <code>&lt;Chart data={data} /&gt;</code></li>
</ul>
<blockquote>
<p><strong>راجع مخرَج أداة التحويل دائمًا</strong></p>
<p>أدوات التحويل قوية لكنها ليست معصومة. فالحالات الحدية — الاستيرادات المستعارة، وإعادة التصدير، والاستيرادات الديناميكية، والتضمين في سلاسل القوالب — قد تنتج تحويلات غير صحيحة. شغّل الأداة، وراجع الفرق، وشغّل فاحص الأنواع والاختبارات، ثم أودِع. وتعامل مع الأداة كموفّر للوقت، لا كطيّار آلي.</p>
</blockquote>
<p>شغّل فاحص الأنواع على الملفات المعدّلة لالتقاط أي مشكلات:</p>
<pre><code class="language-bash">pnpm turbo typecheck
</code></pre>
<blockquote>
<p><strong>فحص الأنواع سيفشل هنا</strong></p>
<p>تحوّل أداة التحويل <code>import { LegacyChart } from &quot;./legacy-chart&quot;</code> إلى <code>import { Chart } from &quot;@pulse/analytics&quot;</code>، لكن التطبيق القديم لا يملك <code>@pulse/analytics</code> كتبعية. وفي ترحيل حقيقي، ستضيف الحزم الحديثة إلى <code>package.json</code> في التطبيق القديم قبل تشغيل فاحص الأنواع. وفي هذا التمرين، يؤكد خطأ الأنواع أن الأداة تنتج المخرَج الصحيح — فقط أرجع الملفات بـ<code>git checkout apps/legacy/src/</code> وانتقل إلى كتابة الاختبارات.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>تحوّل أداة التحويل الاستيرادات القديمة إلى استيرادات الحزم الحديثة. ويعرض الفرق تغييرات نظيفة ومتوقعة.</p>
<p><img src="/arabic-cs-library/images/kinney/181d4ee2a16088cc.webp" alt="فرق Git يُظهر تحويلات الاستيراد التي أجرتها أداة التحويل"></p>
<h2 id="اكتب-اختبارات-لأداة-التحويل">اكتب اختبارات لأداة التحويل</h2>
<p>افتح <code>codemods/src/__tests__/migrate-legacy-import.test.ts</code> وأضف حالات اختبار:</p>
<p><em>codemods/src/<strong>tests</strong>/migrate-legacy-import.test.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> jscodeshift <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jscodeshift&#x27;</span>;
<span class="hljs-keyword">import</span> transform <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../migrate-legacy-import&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">applyTransform</span>(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">transform</span>(
    { <span class="hljs-attr">source</span>: input, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;test.tsx&#x27;</span> },
    { jscodeshift, <span class="hljs-attr">j</span>: jscodeshift, <span class="hljs-attr">stats</span>: <span class="hljs-function">() =&gt;</span> {}, <span class="hljs-attr">report</span>: <span class="hljs-function">() =&gt;</span> {} },
  );
  <span class="hljs-keyword">return</span> result;
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;migrate-legacy-import&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;transforms a single legacy import&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> input = <span class="hljs-string">\`import { LegacyChart } from &quot;./legacy-chart&quot;;\`</span>;
    <span class="hljs-keyword">const</span> output = <span class="hljs-title function_">applyTransform</span>(input);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-title function_">toContain</span>(<span class="hljs-string">\`import { Chart } from &quot;@pulse/analytics&quot;\`</span>);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;LegacyChart&#x27;</span>);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;./legacy-chart&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;transforms multiple imports from different legacy files&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> input = [
      <span class="hljs-string">\`import { LegacyChart } from &quot;./legacy-chart&quot;;\`</span>,
      <span class="hljs-string">\`import { LegacyButton } from &quot;./legacy-button&quot;;\`</span>,
    ].<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;\\n&#x27;</span>);
    <span class="hljs-keyword">const</span> output = <span class="hljs-title function_">applyTransform</span>(input);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-title function_">toContain</span>(<span class="hljs-string">\`import { Chart } from &quot;@pulse/analytics&quot;\`</span>);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-title function_">toContain</span>(<span class="hljs-string">\`import { Button } from &quot;@pulse/ui&quot;\`</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;leaves non-legacy imports unchanged&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> input = <span class="hljs-string">\`import { useState } from &quot;react&quot;;\`</span>;
    <span class="hljs-keyword">const</span> output = <span class="hljs-title function_">applyTransform</span>(input);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-title function_">toBe</span>(input);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;transforms JSX element names&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> input = [
      <span class="hljs-string">\`import { LegacyChart } from &quot;./legacy-chart&quot;;\`</span>,
      <span class="hljs-string">\`const App = () =&gt; &lt;LegacyChart data={data} /&gt;;\`</span>,
    ].<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;\\n&#x27;</span>);
    <span class="hljs-keyword">const</span> output = <span class="hljs-title function_">applyTransform</span>(input);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;&lt;Chart&#x27;</span>);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;&lt;LegacyChart&#x27;</span>);
  });
});
</code></pre>
<p><em>ملاحظة:</em> يختبر أدوات التحويل كتحويلات من نص إلى نص دون الحاجة إلى نظام ملفات.</p>
<p>شغّل الاختبارات:</p>
<pre><code class="language-bash">pnpm --filter codemods <span class="hljs-built_in">test</span>
</code></pre>
<blockquote>
<p><strong>اختبار أدوات التحويل هو اختبار تحويلات من نص إلى نص</strong></p>
<p>تقدّم سلسلة نصية مصدرية، وتشغّل التحويل، وتتحقق من خصائص السلسلة الناتجة. ولا يحتاج الاختبار إلى نظام ملفات حقيقي ولا إلى تطبيق يعمل. وهذا يجعل اختبارات أدوات التحويل سريعة وسهلة الكتابة — أضف حالة اختبار لكل حالة حدية تصادفها. وعندما تنتج الأداة مخرَجًا غير صحيح على ملف حقيقي، انسخ القسم المشكِل من ذلك الملف إلى حالة اختبار، وأصلح التحويل، وتحقق من نجاح الاختبار.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>تنجح اختبارات أداة التحويل. وكل اختبار يتحقق من سيناريو تحويل محدد. والحالات الحدية مغطاة.</p>
<p><img src="/arabic-cs-library/images/kinney/7b59a6f171e7e252.webp" alt="نتائج اختبارات أداة التحويل تُظهر نجاح كل الاختبارات"></p>
<h2 id="الحل">الحل</h2>
<p>إذا احتجت إلى اللحاق، فالحالة المكتملة لهذا التمرين متاحة في الفرع <code>solution</code>:</p>
<pre><code class="language-bash">git checkout solution
pnpm install
</code></pre>
<h2 id="أهداف-موسعة">أهداف موسّعة</h2>
<ul>
<li><strong>التعامل مع الاستيرادات المستعارة:</strong> وسّع أداة التحويل لتتعامل مع <code>import { LegacyChart as MyChart } from &quot;./legacy-chart&quot;</code> وتحفظ الاسم المستعار: <code>import { Chart as MyChart } from &quot;@pulse/analytics&quot;</code>.</li>
<li><strong>وضع التجربة الجافة:</strong> شغّل أداة التحويل مع <code>--dry</code> لترى الملفات التي ستُعدَّل دون تعديلها فعلًا. واستخدم هذا في CI للتحقق من عدم بقاء أي استيرادات قديمة غير مهاجَرة.</li>
<li><strong>أضف أداة تحويل ثانية:</strong> اكتب أداة تحوّل الأنماط المضمّنة (<code>style={{ color: &quot;#333&quot; }}</code>) إلى أصناف Tailwind CSS (<code>className=&quot;text-gray-700&quot;</code>). وهذا تحويل أصعب لأنه يتطلب خريطة من خصائص CSS إلى أصناف Tailwind.</li>
</ul>
<h2 id="ما-التالي">ما التالي</h2>
<p>لقد أكملت قوس الورشة كاملًا. عبر هذه التمارين، بنيت معمارية مستودع أحادي من الأساس: تركيب وقت البناء، والتصيير التدفقي SSR، وتنسيق Turborepo، ومراجع مشاريع TypeScript، والفحص المعماري، وCI/CD مع ميزانيات الأداء، واختبارات E2E بـPlaywright، والترحيل التدريجي بنمط شجرة الخنّاق التينيّ. وأضاف كل تمرين طبقة من البنية التحتية تجعل المعمارية أكثر قابلية للصيانة والفرض والتوسع. والخطوة التالية هي تطبيق هذه الأنماط على قاعدة شفرتك — ابدأ بالطبقة الأعلى أثرًا وتحرّك منها إلى الخارج.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:t,headings:l,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,e as html,p as slug,t as title};
