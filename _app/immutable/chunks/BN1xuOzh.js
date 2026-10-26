const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",t="dependency-management",p="إدارة الاعتماد في المستودعات الأحادية",e=[{depth:2,id:"مشكلة-الاعتماد",text:"مشكلة الاعتماد"},{depth:3,id:"انحراف-الإصدارات",text:"انحراف الإصدارات"},{depth:3,id:"الاعتمادات-الماسية",text:"الاعتمادات الماسية"},{depth:3,id:"الاعتمادات-الشبحية",text:"الاعتمادات الشبحية"},{depth:3,id:"إجهاد-التحديث",text:"إجهاد التحديث"},{depth:2,id:"فرض-سياسة-إصدار-افتراضية",text:"فرض سياسة إصدار افتراضية"},{depth:3,id:"الكتالوجات-والتجاوزات",text:"الكتالوجات والتجاوزات"},{depth:3,id:"الكتالوجات-المسماة-للترحيلات-المتدرجة",text:"الكتالوجات المُسمّاة للترحيلات المتدرّجة"},{depth:3,id:"بروتوكول-workspace",text:"بروتوكول workspace:"},{depth:2,id:"اجعل-الاعتمادات-غير-المعلنة-تفشل-مبكرا",text:"اجعل الاعتمادات غير المعلَنة تفشل مبكرًا"},{depth:2,id:"أتمتة-الترقيات-دون-الضجيج",text:"أتمتة الترقيات دون الضجيج"},{depth:3,id:"dependabot",text:"Dependabot"},{depth:3,id:"renovate",text:"Renovate"},{depth:3,id:"قاعدة-التشغيل",text:"قاعدة التشغيل"},{depth:2,id:"التنقيح-وإدارة-الإصدار",text:"التنقيح وإدارة الإصدار"},{depth:3,id:"نموذج-الـ-changeset",text:"نموذج الـ changeset"},{depth:3,id:"المجموعات-الثابتة",text:"المجموعات الثابتة"},{depth:3,id:"أتمتة-تدفق-الإصدار",text:"أتمتة تدفّق الإصدار"},{depth:3,id:"الإصدارات-الأولية-واللقطات",text:"الإصدارات الأولية واللقطات"},{depth:2,id:"نموذج-تشغيل-عملي",text:"نموذج تشغيل عملي"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"كتالوجات-pnpm",text:"كتالوجات pnpm"}],l=`<p>الاعتمادات هي حيث يتوقف المعمار عن كونه سبورة ويبدأ في أن يصبح مشكلة تشغيلية. ففي كتلة واحدة، يمكن لملف قفل واحد ومخرَج نشر واحد أن يخفيا كثيرًا من العادات السيئة. أما في مستودع متعدد الحزم أو أي منظومة واجهة أمامية موزّعة، فتتحوّل تلك العادات نفسها إلى انحراف الإصدارات، وأشجار اعتماد مكرّرة، واستيرادات شبحية من الرفع (hoisting)، وسيل من طلبات السحب للترقية لا يريد أحد مراجعتها.</p>
<p>ليس الحل «كن أكثر انضباطًا»، بل الحل هو جعل سياسة الاعتماد قابلة للتنفيذ في الأدوات وأتمتة الإصدار.</p>
<h2 id="مشكلة-الاعتماد">مشكلة الاعتماد</h2>
<p>يغطّي قسم <a href="https://stevekinney.com/courses/enterprise-ui/workspace-package-managers">مديري حزم مساحة العمل</a> <em>أي</em> أداة تستخدم وكيف تتفاضل. أما هذا القسم فيغطّي مشكلات <em>إدارة</em> الاعتماد التي تظهر بصرف النظر عن الأداة التي اخترتها.</p>
<h3 id="انحراف-الإصدارات">انحراف الإصدارات</h3>
<p>بلحظة أن تتحرّك حزم أو فرق مختلفة في الاعتمادات المشتركة باستقلالية، تكفّ «حزمتك المشتركة» عن كونها مشتركة. فالحزمة A على React 18.2، والحزمة B على 18.3، والقشرة على 18.3.1، ولا أحد متأكد أي إصدار ثانوي أدخل تغيير السلوك الذي كسر لوحة المعلومات الثلاثاء الماضي.</p>
<p>الجواب النظيف هو جعل إصدار واحد هو السياسة الافتراضية للاعتمادات المشتركة على نطاق واسع، وإجبار الانحرافات على أن تكون صريحة. ويمنحك <a href="https://pnpm.io/catalogs">pnpm</a> أداتين أوليتين قويتين لذلك: <strong>الكتالوجات (catalogs)</strong>، التي تعرّف نطاقات إصدارات قابلة لإعادة الاستخدام مركزيًا في <code>pnpm-workspace.yaml</code>، و<strong>التجاوزات (overrides)</strong> على مستوى الجذر، التي تفرض إصدارًا واحدًا لاعتماد ما عبر مخطط الحلّ بأكمله.</p>
<h3 id="الاعتمادات-الماسية">الاعتمادات الماسية</h3>
<p>تعتمد الحزمة A على <code>lib@^1.0.0</code> عبر مسار، وتعتمد الحزمة B على <code>lib@^2.0.0</code> عبر مسار آخر، ويعتمد الجذر على كلتيهما A وB. وأحيانًا يستطيع مدير الحزم طيّ ذلك في نسخة واحدة. وتُظهر <a href="https://docs.npmjs.com/cli/v8/commands/npm-dedupe">وثائق npm للإزالة المكرّرة (dedupe)</a> حالات يمكن فيها تقليص التكرارات المتداخلة إلى إصدار واحد متوافق. وأحيانًا لا يستطيع، فتحتفظ بنسخ متعددة.</p>
<pre><code>graph TD
    Root[&quot;Root&quot;]
    A[&quot;Package A&quot;]
    B[&quot;Package B&quot;]
    Lib1[&quot;lib@1.4.0&quot;]
    Lib2[&quot;lib@2.1.0&quot;]

    Root --&gt; A
    Root --&gt; B
    A --&gt; Lib1
    B --&gt; Lib2

    style Lib1 fill:#d4a373,color:#000
    style Lib2 fill:#d4a373,color:#000
</code></pre>
<p>النسخ المتعددة مقبولة عادةً لشيفرة الأدوات بلا حالة. لكنها أقل قبولًا بكثير لبيئات تشغيل الأطر، أو المكتبات ذات الحالة، أو أي شيء يكون فيه «نسخة واحدة» جزءًا من الافتراض التصميمي. فوجود نسختين من React في الصفحة نفسها ليس «مشكلة إدارة اعتماد»، بل حادثة إنتاج تنتظر أن يكتشفها عميل.</p>
<h3 id="الاعتمادات-الشبحية">الاعتمادات الشبحية</h3>
<p><strong>الاعتماد الشبحي</strong> حزمة تستوردها شيفرتك لكنها لا تعلنها في ملف <code>package.json</code> الخاص بها. وهو «يعمل» لأن حزمة أخرى في المستودع تسبّبت في رفعه إلى موضع يمكن الوصول إليه. ثم يغيّر أحدهم حزمة غير ذات صلة، فيتغيّر تخطيط الرفع، فينكسر الاستيراد في CI أو الإنتاج دون أي تغيير في شيفرة حزمتك.</p>
<p>ينشئ الرابط المعزول الافتراضي في pnpm تخطيطًا لا تستطيع فيه شيفرة التطبيق خارج <code>node_modules</code> الوصول إلى الاعتمادات غير المعلَنة. وتصف <a href="https://pnpm.io/settings">وثائق الرفع في pnpm</a> هذا السلوك شبه الصارم: قد ترى الحزم داخل <code>node_modules</code> اعتمادات غير معلَنة بسبب الرفع داخل المخزن الافتراضي، لكن شيفرة تطبيقك تحصل على افتراضي أكثر صرامة من عمليات التثبيت المرفوعة مسطّحة.</p>
<p>وتلك الصرامة لا تصمد إلا إن لم تنقضها. فتعيين <code>shamefullyHoist</code> أو تهيئة <code>publicHoistPattern</code> على نطاق واسع يعيد إدخال مخاطر الاعتماد الشبحية نفسها التي صُمّم pnpm لمنعها. فالخيار موجود للتوافق مع الشيفرة القديمة، لا كنمط تشغيل دائم.</p>
<h3 id="إجهاد-التحديث">إجهاد التحديث</h3>
<p>السلوك الافتراضي لـ <a href="https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference">Dependabot</a> هو فتح طلب سحب منفصل لكل اعتماد قديم. ويتصرّف Renovate بالمثل ما لم تهيّئ التجميع. وذلك الافتراضي جيد للمستودعات الصغيرة وسيئ للمستودعات الكبيرة. والنتيجة كومة من طلبات السحب الصحيحة فرديًا وفريق يتعلّم ببطء تجاهلها كلها—وهو عكس الأثر المقصود تمامًا.</p>
<h2 id="فرض-سياسة-إصدار-افتراضية">فرض سياسة إصدار افتراضية</h2>
<h3 id="الكتالوجات-والتجاوزات">الكتالوجات والتجاوزات</h3>
<p>بالنسبة إلى مساحة عمل pnpm، أنظف تهيئة هي كتالوج جذري مع تجاوزات جذرية. فـ<a href="https://pnpm.io/catalogs">الكتالوجات</a> تركّز نطاقات الإصدارات المسموح بها. وتعيين <code>catalogMode: strict</code> يجعل <code>pnpm add</code> يرفض الإصدارات خارج الكتالوج. وتفرض التجاوزات إصدارًا واحدًا على مخطط الاعتماد حيث تكون تلك السياسة منطقية.</p>
<pre><code class="language-yaml"><span class="hljs-comment"># pnpm-workspace.yaml</span>
<span class="hljs-attr">packages:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">apps/*</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">packages/*</span>

<span class="hljs-attr">catalog:</span>
  <span class="hljs-attr">react:</span> <span class="hljs-string">^18.3.1</span>
  <span class="hljs-attr">react-dom:</span> <span class="hljs-string">^18.3.1</span>
  <span class="hljs-attr">typescript:</span> <span class="hljs-string">^5.8.0</span>

<span class="hljs-attr">catalogMode:</span> <span class="hljs-string">strict</span>

<span class="hljs-attr">overrides:</span>
  <span class="hljs-attr">react:</span> <span class="hljs-string">&#x27;catalog:&#x27;</span>
  <span class="hljs-attr">react-dom:</span> <span class="hljs-string">&#x27;catalog:&#x27;</span>
  <span class="hljs-attr">typescript:</span> <span class="hljs-string">&#x27;catalog:&#x27;</span>
</code></pre>
<p><em>ملاحظة:</em> هذه هي الإصدارات المعتمدة. وتستخدمها كل حزمة في المستودع إلا إن كان لديها سبب وجيه جدًا.</p>
<p>يمكن استخدام بروتوكول <code>catalog:</code> في <code>dependencies</code> و<code>devDependencies</code> و<code>peerDependencies</code> و<code>overrides</code>، فتقود سياسة الإصدار المركزية نفسها الإعلانات المباشرة والفرض على مستوى المخطط معًا.</p>
<h3 id="الكتالوجات-المسماة-للترحيلات-المتدرجة">الكتالوجات المُسمّاة للترحيلات المتدرّجة</h3>
<p>إن احتجت فعلًا إلى ترحيل متدرّج—مثلًا الانتقال من React 18 إلى React 19 حزمةً حزمة—فـ<a href="https://pnpm.io/catalogs">الكتالوجات المُسمّاة</a> هي مسار الاستثناء المعقول. كتالوج افتراضي واحد، وعدة كتالوجات مُسمّاة للترحيل الجاري:</p>
<pre><code class="language-yaml"><span class="hljs-attr">catalog:</span>
  <span class="hljs-attr">react:</span> <span class="hljs-string">^18.2.0</span>
  <span class="hljs-attr">react-dom:</span> <span class="hljs-string">^18.2.0</span>

<span class="hljs-attr">catalogs:</span>
  <span class="hljs-attr">react19:</span>
    <span class="hljs-attr">react:</span> <span class="hljs-string">^19.0.0</span>
    <span class="hljs-attr">react-dom:</span> <span class="hljs-string">^19.0.0</span>
</code></pre>
<p><em>ملاحظة:</em> الحزم التي رُحّلت تستخدم catalog:react19 بدلًا من الافتراضي.</p>
<p>وهذا يتيح لك جعل «إصدار واحد افتراضيًا» هو القاعدة دون التظاهر بأنه لن توجد استثناءات مضبوطة أبدًا.</p>
<h3 id="بروتوكول-workspace">بروتوكول <code>workspace:</code></h3>
<p>بالنسبة إلى حزم مساحة العمل الداخلية، استخدم بروتوكول <code>workspace:</code> ليصبح حلّ الحزمة المحلية صريحًا لا انتهازيًا. وتحذّر <a href="https://pnpm.io/workspaces">وثائق مساحات العمل في pnpm</a> من أن نطاقات semver العادية قد تُحلّ من السجلّ إذا لم يطابق الإصدار المحلي المتوقّع، ما يُدخل عدم يقين. أما مع <code>workspace:</code> فيفشل التثبيت بدلًا من استبدال حزمة من السجلّ بصمت.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;@acme/design-system&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:^&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@acme/api-client&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workspace:^&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وعند النشر، يعيد pnpm كتابة مواصفات <code>workspace:</code> إلى نطاقات semver عادية، فيحصل المستهلكون خارج المستودع الأحادي على حزم عادية.</p>
<h2 id="اجعل-الاعتمادات-غير-المعلنة-تفشل-مبكرا">اجعل الاعتمادات غير المعلَنة تفشل مبكرًا</h2>
<p>أبسط سياسة اعتماد ما زالت أفضلها: يجب أن يسند كل استيراد مباشر إعلان اعتماد صريح. ويساعد نموذج مساحة العمل في pnpm افتراضيًا، إذ لا تحصل الحزم إلا على الوصول إلى الاعتمادات المعلَنة في ملف <code>package.json</code> الخاص بها، حتى مع وجود ملف قفل جذري مشترك و<code>node_modules</code> جذرية.</p>
<p>وينبغي أن تنطبق قاعدة «العقد الصريح» نفسها على الحزم الداخلية. وتوصي <a href="https://nodejs.org/api/packages.html">وثائق حزم Node</a> بحقل <code>exports</code> للحزم الجديدة، وهي صريحة بشأن التغليف: بمجرد تعريف <code>exports</code>، تُغلَّف المسارات الفرعية غير المدرجة، وتفشل الاستيرادات إلى مسارات فرعية غير معلَنة بالخطأ <code>ERR_PACKAGE_PATH_NOT_EXPORTED</code>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@acme/design-system&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.4.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;.&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/index.js&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;./tokens&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/tokens.js&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;./react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist/react.js&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><em>ملاحظة:</em> نقاط الدخول الثلاث هذه فقط هي العامة. وكل ما عداها مُغلَّف.</p>
<p>هذا بالضبط السلوك الذي تريده للحزم الداخلية المشتركة. لا استيرادات عميقة إلى ملفات خاصة. ولا واجهات برمجية عرَضية. ولا «عمل لأنه نفذ أحدهم إلى <code>dist/internal.js</code>» والآن لا تستطيع إعادة الهيكلة دون كسر ثلاثة فرق.</p>
<h2 id="أتمتة-الترقيات-دون-الضجيج">أتمتة الترقيات دون الضجيج</h2>
<h3 id="dependabot">Dependabot</h3>
<p>Dependabot هو نقطة البداية الواضحة لأتمتة GitHub الأصلية. وتصف <a href="https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configuring-dependabot-version-updates">وثائق تهيئة GitHub</a> كيف تمكّن تحديثات الإصدارات بملف <code>dependabot.yml</code>، وتتيح لك ميزة <code>groups</code> دمج ما قد يكون طلب سحب واحدًا لكل اعتماد في طلبات سحب موجَّهة أقل عددًا.</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/dependabot.yml</span>
<span class="hljs-attr">version:</span> <span class="hljs-number">2</span>

<span class="hljs-attr">updates:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">package-ecosystem:</span> <span class="hljs-string">&#x27;npm&#x27;</span>
    <span class="hljs-attr">directory:</span> <span class="hljs-string">&#x27;/&#x27;</span>
    <span class="hljs-attr">schedule:</span>
      <span class="hljs-attr">interval:</span> <span class="hljs-string">&#x27;weekly&#x27;</span>
    <span class="hljs-attr">groups:</span>
      <span class="hljs-attr">framework:</span>
        <span class="hljs-attr">applies-to:</span> <span class="hljs-string">version-updates</span>
        <span class="hljs-attr">patterns:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;react&#x27;</span>
          <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>
          <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;@types/react*&#x27;</span>
      <span class="hljs-attr">tooling:</span>
        <span class="hljs-attr">applies-to:</span> <span class="hljs-string">version-updates</span>
        <span class="hljs-attr">dependency-type:</span> <span class="hljs-string">&#x27;development&#x27;</span>
        <span class="hljs-attr">patterns:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;eslint*&#x27;</span>
          <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;@typescript-eslint/*&#x27;</span>
          <span class="hljs-bullet">-</span> <span class="hljs-string">&#x27;prettier&#x27;</span>
</code></pre>
<p><em>ملاحظة:</em> جمّع تحديثات أدوات التطوير معًا. فلا أحد يحتاج ستة طلبات سحب منفصلة لإضافات ESLint.</p>
<h3 id="renovate">Renovate</h3>
<p>Renovate هو عادةً الخيار الأفضل عندما تريد مزيدًا من التحكّم. وتصف <a href="https://docs.renovatebot.com/configuration-options/">وثائق تهيئته</a> كيف يتم التجميع عبر <code>groupName</code> على <code>packageRules</code>، وكيف يستطيع <code>automerge</code> دمج التحديثات الناجحة تلقائيًا. والقوة في تحديد نطاق كل ذلك حسب نوع الاعتماد ونوع التحديث:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;packageRules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;matchDepTypes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;devDependencies&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;matchUpdateTypes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;patch&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;minor&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;groupName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;devDependencies (non-major)&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;automerge&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;matchPackageNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;react&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;react-dom&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;groupName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react stack&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;automerge&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><em>ملاحظة:</em> ترقيات الأطر الرئيسية لا تُدمج تلقائيًا أبدًا. يراجعها البشر.</p>
<p>وهذا يتيح لك فعل شيء عقلاني مثل «جمّع اعتمادات التطوير غير الرئيسية وادمجها تلقائيًا بعد نجاح CI» دون دمج الإصدارات الرئيسية تلقائيًا في الإنتاج لأن أحدهم كان متفائلًا.</p>
<h3 id="قاعدة-التشغيل">قاعدة التشغيل</h3>
<p>دع الروبوتات تؤدي العمل الممل، لكن شكّل سيل طلبات السحب بحيث لا يضطر البشر إلى التفكير إلا عندما يكون التفكير مطلوبًا فعلًا. جمّع حسب النطاق. وادمج التحديثات منخفضة المخاطر تلقائيًا بعد نجاح الاختبارات. وأبقِ الترقيات الرئيسية أو الحساسة معماريًا مراجَعة بشريًا صراحةً. وتدعم <a href="https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/optimizing-pr-creation-version-updates">وثائق تحسين طلبات السحب في GitHub</a> وتهيئة Renovate معًا ذلك النمط.</p>
<h2 id="التنقيح-وإدارة-الإصدار">التنقيح وإدارة الإصدار</h2>
<p>يغطّي قسم <a href="https://stevekinney.com/courses/enterprise-ui/versioning-and-release-management">التنقيح وإدارة الإصدار</a> عقود semver، وتنقيح نظام تصميم قائم على الرموز (tokens)، وأساسيات Changesets بالتفصيل. أما هذا القسم فيركّز على آليات <em>أتمتة</em> الإصدار التي تجعل Changesets يعمل في CI.</p>
<h3 id="نموذج-الـ-changeset">نموذج الـ changeset</h3>
<p>يقسّم <a href="https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md">Changesets</a> إدارة الإصدار إلى مرحلتين: التقاط النية وقت طلب السحب، وتنفيذ الإصدار لاحقًا. والـ changeset ملف Markdown صغير في <code>.changeset/</code> يسجّل أي الحزم تغيّرت، وأي نوع من رفع semver تحتاج، وملخّصًا مقروءًا للبشر:</p>
<pre><code class="language-markdown">---
&#x27;@acme/design-system&#x27;: minor
<span class="hljs-section">&#x27;@acme/button&#x27;: patch
---</span>

Add density tokens and expose the new compact button size.
</code></pre>
<p>وهذا يلتقط نية التنقيح بجوار مراجعة الشيفرة التي أدخلت التغيير، بدلًا من ترك اختيار الإصدار لمهندس إصدار بعد ثلاثة أسابيع يحاول إعادة بناء التاريخ من عناوين الإيداعات.</p>
<h3 id="المجموعات-الثابتة">المجموعات الثابتة</h3>
<p>عندما يجب أن تتحرّك الحزم معًا، يدعم <a href="https://github.com/changesets/changesets/blob/main/docs/fixed-packages.md">Changesets المجموعات الثابتة</a>. فالحزم الثابتة تُنَسَّق وتُنشر معًا حتى إن لم يتغيّر بعض أعضائها:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;fixed&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-string">&quot;@acme/design-tokens&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;@acme/design-system&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استخدم هذا للأزواج المقترنة ارتباطًا وثيقًا مثل الرموز (tokens) وحزمة نظام التصميم الأساسية، حيث يكون الإصدار الجزئي أكثر إرباكًا من كونه مفيدًا. ولا تطبّقه على كل شيء—فهذا يعيد اختراع الإصدار المتزامن بصياغة إضافية.</p>
<h3 id="أتمتة-تدفق-الإصدار">أتمتة تدفّق الإصدار</h3>
<p>تستخدم الأتمتة القياسية <a href="https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md">إجراء GitHub الخاص بـ Changesets</a> لإنشاء طلب سحب «Version Packages» يبقى محدَّثًا مع تراكم الـ changesets، وينشر عند دمج ذلك الطلب:</p>
<pre><code class="language-yaml"><span class="hljs-comment"># .github/workflows/changesets.yml</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">Release</span>

<span class="hljs-attr">on:</span>
  <span class="hljs-attr">push:</span>
    <span class="hljs-attr">branches:</span> [<span class="hljs-string">main</span>]

<span class="hljs-attr">jobs:</span>
  <span class="hljs-attr">release:</span>
    <span class="hljs-attr">runs-on:</span> <span class="hljs-string">ubuntu-latest</span>
    <span class="hljs-attr">permissions:</span>
      <span class="hljs-attr">contents:</span> <span class="hljs-string">write</span>
      <span class="hljs-attr">pull-requests:</span> <span class="hljs-string">write</span>

    <span class="hljs-attr">steps:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/checkout@v5</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">pnpm/action-setup@v4</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">actions/setup-node@v4</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">node-version:</span> <span class="hljs-number">22</span>
          <span class="hljs-attr">cache:</span> <span class="hljs-string">pnpm</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">install</span> <span class="hljs-string">--frozen-lockfile</span>

      <span class="hljs-bullet">-</span> <span class="hljs-attr">uses:</span> <span class="hljs-string">changesets/action@v1</span>
        <span class="hljs-attr">with:</span>
          <span class="hljs-attr">version:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">changeset</span> <span class="hljs-string">version</span>
          <span class="hljs-attr">publish:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">publish</span> <span class="hljs-string">-r</span>
        <span class="hljs-attr">env:</span>
          <span class="hljs-attr">GITHUB_TOKEN:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.GITHUB_TOKEN</span> <span class="hljs-string">}}</span>
          <span class="hljs-attr">NPM_TOKEN:</span> <span class="hljs-string">\${{</span> <span class="hljs-string">secrets.NPM_TOKEN</span> <span class="hljs-string">}}</span>
</code></pre>
<p><em>ملاحظة:</em> يُنشئ الإجراء طلب سحب لرفع الإصدارات. وعند دمجه، ينشر إلى npm.</p>
<p>استخدم <code>changeset status --since=main</code> كفحص CI مانع إن أردت أن تفشل عمليات الدمج عند غياب أي changeset. فهذا يفرض انضباط تسجيل النية وقت طلب السحب بدلًا من اكتشاف تغييرات غير منسّقة وقت الإصدار.</p>
<h3 id="الإصدارات-الأولية-واللقطات">الإصدارات الأولية واللقطات</h3>
<p>يوفّر Changesets آليتين متمايزتين لاختبار الحزم غير المنشورة، وتخدمان غرضين مختلفين.</p>
<p><strong>نمط الإصدار الأولي</strong> مخصّص لقناة إصدار أولي حقيقية في semver. وتصف <a href="https://github.com/changesets/changesets/blob/main/docs/prereleases.md">وثائق الإصدارات الأولية عند Changesets</a> كيف يُدخل <code>changeset pre enter &lt;tag&gt;</code> نمط الإصدار الأولي، وكيف يضيف <code>changeset version</code> وسومًا مثل <code>-next.0</code>، وكيف يستخدم <code>changeset publish</code> الوسم كوسم توزيع npm. ولا تفي معظم نطاقات semver العادية بالإصدارات الأولية، لذا تحتاج الحزم التابعة غالبًا إلى رفعات لا تحتاجها في إصدار مستقر. وهذه هي الأداة الصحيحة لمسار تجريبي أو كناري فعلي.</p>
<pre><code class="language-bash">pnpm changeset pre enter canary
pnpm changeset version
pnpm changeset publish --tag canary
</code></pre>
<p><strong>إصدارات اللقطات (snapshots)</strong> مختلفة. وتصف <a href="https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md">وثائق اللقطات عند Changesets</a> اللقطات كبنيات اختبارية لا تحدّث الإصدارات الحقيقية، فتنتج إصدارات مثل <code>0.0.0-canary-DATETIMESTAMP</code>. وتشغّل <code>changeset version --snapshot &lt;tag&gt;</code> ثم <code>changeset publish --tag &lt;tag&gt;</code>.</p>
<pre><code class="language-bash">pnpm changeset version --snapshot canary
pnpm changeset publish --tag canary
</code></pre>
<p>اللقطات أنسب عندما تريد بناءً قابلًا للتخلّص منه لاختبار التكامل—«ابنِ هذا الفرع ودع الناس يجرّبونه»—دون إدخال المستودع في تسلسل إصدار أولي مستمر.</p>
<p>الفصل مباشر: استخدم نمط الإصدار الأولي لقناة تجريبية فعلية تتصرّف كتيّار إصدار حقيقي. واستخدم اللقطات عندما تريد بناءً للاستعمال مرة واحدة دون إعادة كتابة تاريخ الحزمة.</p>
<h2 id="نموذج-تشغيل-عملي">نموذج تشغيل عملي</h2>
<pre><code>graph TD
    subgraph &quot;Version Policy&quot;
        Cat[&quot;Catalog&lt;br/&gt;(blessed versions)&quot;]
        Over[&quot;Overrides&lt;br/&gt;(graph-wide enforcement)&quot;]
        WS[&quot;workspace: protocol&lt;br/&gt;(explicit local resolution)&quot;]
    end

    subgraph &quot;Upgrade Automation&quot;
        Bot[&quot;Renovate / Dependabot&lt;br/&gt;(grouped PRs)&quot;]
        CI[&quot;CI gate&lt;br/&gt;(tests + audit)&quot;]
        Auto[&quot;Auto-merge&lt;br/&gt;(low-risk only)&quot;]
    end

    subgraph &quot;Release Mechanics&quot;
        CS[&quot;Changesets&lt;br/&gt;(intent capture)&quot;]
        Action[&quot;GitHub Action&lt;br/&gt;(version PR + publish)&quot;]
        Snap[&quot;Snapshots&lt;br/&gt;(throwaway builds)&quot;]
    end

    Cat --&gt; Over
    Over --&gt; WS
    Bot --&gt; CI
    CI --&gt; Auto
    CS --&gt; Action
    Action --&gt; Snap
</code></pre>
<p>أكثر تهيئة مستقرة مملّة بأفضل معنى. استخدم مدير حزم واحدًا للمستودع. واحتفظ بملف قفل مشترك واحد. واعمل كتالوجًا افتراضيًا للاعتمادات المشتركة. واستخدم التجاوزات الجذرية باعتدال لتثبيت الإصدارات على مستوى المخطط التي يجب توحيدها فعلًا. واستخدم <code>workspace:</code> للحزم الداخلية ليصبح الحلّ المحلي صريحًا. وأبقِ الرفع متحفّظًا لتبقى الاعتمادات غير المعلَنة مكسورة بدلًا من أن تعمل صدفةً.</p>
<p>ثم أزِل الضجيج بالأتمتة. وينبغي أن يفتح Dependabot أو Renovate طلبات سحب أقل وأفضل تشكيلًا—لا عاصفة اعتماد. وجمّع التحديثات حسب النطاق. وأبقِ تحديثات الأمان مُفعَّلة. ولا تدمج تلقائيًا إلا أصناف التحديثات التي ترتاح فعلًا لتفويضها إلى CI.</p>
<p>عامل الحزم المشتركة كمنتجات. وامنحها <code>exports</code> صريحة. ونَسّقها بـ semver. واطلب changeset عند تغيّرها. وانشر عبر الأتمتة. واستخدم الإصدارات الأولية أو اللقطات عندما تحتاج كناري. فهكذا تصبح إدارة الاعتماد قابلة للتنبؤ بدلًا من أن تكون مسرحية. والقابلية للتنبؤ، للأسف، هي ما يُبقي المستودع حيًّا مدة كافية ليواصل الجميع الجدال حول المعمار من الأصل.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="كتالوجات-pnpm">كتالوجات pnpm</h3>
<blockquote>
<p>مكان واحد لتعريف إصدارات الاعتماد للمستودع الأحادي بأكمله.</p>
</blockquote>
<pre><code class="language-yaml"><span class="hljs-comment"># pnpm-workspace.yaml</span>
<span class="hljs-attr">catalog:</span>
  <span class="hljs-attr">react:</span> <span class="hljs-string">^18.3.0</span>
  <span class="hljs-attr">react-dom:</span> <span class="hljs-string">^18.3.0</span>
  <span class="hljs-attr">typescript:</span> <span class="hljs-string">^5.5.0</span>
  <span class="hljs-attr">vitest:</span> <span class="hljs-string">^2.0.0</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// packages/app-a/package.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;dependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;catalog:&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;react-dom&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;catalog:&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>حدّث React مرة → تحصل عليه كل حزمة.</li>
<li>لا مزيد من انحراف الإصدارات عبر المستودع الأحادي.</li>
<li><code>pnpm.overrides</code> لفرض إصدارات الاعتمادات العابرة (transitive).</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:e,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,l as html,t as slug,p as title};
