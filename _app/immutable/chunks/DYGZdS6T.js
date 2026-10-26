const s="kinney",a="enterprise-ui",n="واجهات المؤسسات",l="design-system-governance",p="حوكمة نظام التصميم",t=[{depth:2,id:"لماذا-هذا-أصعب-مما-يبدو",text:"لماذا هذا أصعب مما يبدو"},{depth:2,id:"رموز-التصميم-كأساس-مشترك",text:"رموز التصميم كأساس مشترك"},{depth:3,id:"إخراج-الرموز-بصيغ-متعددة",text:"إخراج الرموز بصيغ متعددة"},{depth:3,id:"التعامل-مع-الرموز-كواجهة-برمجة",text:"التعامل مع الرموز كواجهة برمجة"},{depth:2,id:"مكونات-مشتركة",text:"مكوّنات مشتركة"},{depth:3,id:"مكونات-الويب-web-components-لقابلية-النقل",text:"مكوّنات الويب (Web Components) لقابلية النقل"},{depth:3,id:"قوالب-tailwind-المسبقة-لمستودعات-التصميم-بالأدوات-المساعدة",text:"قوالب Tailwind المسبقة لمستودعات التصميم بالأدوات المساعدة"},{depth:2,id:"عزل-css",text:"عزل CSS"},{depth:2,id:"اختبارات-الانحدار-البصري-في-ci",text:"اختبارات الانحدار البصري في CI"},{depth:2,id:"فرض-الاتساق-وقت-البناء",text:"فرض الاتساق وقت البناء"},{depth:3,id:"فرض-الرموز-باستخدام-stylelint",text:"فرض الرموز باستخدام Stylelint"},{depth:3,id:"سياسة-المكونات-باستخدام-eslint",text:"سياسة المكوّنات باستخدام ESLint"},{depth:2,id:"نموذج-الحوكمة",text:"نموذج الحوكمة"},{depth:2,id:"الإصدارات-والترحيل",text:"الإصدارات والترحيل"},{depth:2,id:"الجودة-على-المستوى-المركب",text:"الجودة على المستوى المُركّب"},{depth:2,id:"ما-ينبغي-قياسه",text:"ما ينبغي قياسه"},{depth:2,id:"دليل-الاستثمار",text:"دليل الاستثمار"},{depth:2,id:"متى-يناسب-هذا-النمط",text:"متى يناسب هذا النمط"},{depth:2,id:"متى-نتجنبه",text:"متى نتجنبه"},{depth:2,id:"دروس-من-الميدان",text:"دروس من الميدان"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"حوكمة-تتوسع",text:"حوكمة تتوسّع"}],e=`<p>عندما تكون لديك تطبيق واحد، يصبح نظام التصميم لديك ببساطة… شفرتك. مكوّن <code>Button</code> مشترك، وبعض متغيرات الألوان، وربما إعداد Tailwind. لا يحتاج أحد إلى استراتيجية حوكمة لذلك.</p>
<p>لكن بمجرد أن تصبح لديك تطبيقات متعددة — مستودعات منفصلة، وفرق منفصلة، وخطوط نشر منفصلة — يتوقف الاتساق عن كونه تلقائيًا. كل فريق يتخذ قرارات معقولة محليًا لكنها تتباعد بمرور الوقت. وبعد ستة أشهر تجد نفسك بثلاث درجات مختلفة من الأزرق، وواجهتَي برمجة لزر واحد، وقناة Slack تُسمى <code>#design-system-help</code> لا يقرأها أحد.</p>
<p>النمط الذي ننظر إليه هنا هو <strong>تعدد المستودعات مع نظام تصميم مشترك</strong>: يقطن كل تطبيق في مستودعه الخاص بخط أنابيب وعملية إصدار خاصة به، ويتحقق الاتساق عبر مشاركة عناصر مُصدّرة بإصدارات — مكوّنات ورموز تصميم وإرشادات — لا عبر التركيب وقت التشغيل. يناسب هذا النمط المؤسسات التي تكون منتجاتها مترابطة لكنها مستقلة تشغيليًا، والتي تُفضّل فيها عقود semver على بنية تحتية مشتركة وقت التشغيل.</p>
<h2 id="لماذا-هذا-أصعب-مما-يبدو">لماذا هذا أصعب مما يبدو</h2>
<p>شكل المعمارية واضح ومباشر:</p>
<pre><code>graph TD
  DS[Design System Repo] --&gt; Reg[Package Registry]
  Reg --&gt; AppA[Repo A]
  Reg --&gt; AppB[Repo B]
  Reg --&gt; AppC[Repo C]
  AppA --&gt; DeployA[Deploy A]
  AppB --&gt; DeployB[Deploy B]
  AppC --&gt; DeployC[Deploy C]
</code></pre>
<p>تنشر نظام التصميم إلى سجل حزم. وتستهلكه التطبيقات كتبعية. أنيق، أليس كذلك؟</p>
<p>عمليًا، الجزء الصعب ليس مخطط المعمارية. بل كل ما يحدث <em>بعد</em> رسمه:</p>
<ul>
<li>إعادة الهيكلة عبر المستودعات مكلفة وبطيئة في الطرح.</li>
<li>تأخّر تحديث التبعيات يؤدي إلى تشظّي الإصدارات — تطبيق على v3 وآخر ما زال على v1.</li>
<li>من الأصعب فرض معايير موحدة لجودة الشفرة والمعمارية على مستودعات لا تملكها.</li>
<li>تتراكم الأدوات والنماذج المتكررة لأن كل فريق يبني هيكله بشكل مستقل.</li>
<li>تصبح الشفرة القابلة لإعادة الاستخدام غير مرئية دون دعم منصّي متعمد.</li>
</ul>
<p>لكن الجانب الإيجابي حقيقي: استقلالية قوية على مستوى المستودع، وخطوط تسليم مستقلة، واقتران منخفض وقت التشغيل، وحدود ملكية واضحة، واتساق تصميمي يتوسّع عبر عناصر مشتركة لا عبر بنية تحتية مشتركة.</p>
<h2 id="رموز-التصميم-كأساس-مشترك">رموز التصميم كأساس مشترك</h2>
<p>نقطة البداية الأقل احتكاكًا هي الرموز. رمز التصميم هو قيمة مُسمّاة — لون، أو وحدة تباعد، أو مجموعة خطوط — تمثّل قرارًا تصميميًا. انشرها كحزمة مخصصة وستستهلك كل التطبيقات المصدر نفسه للحقيقة.</p>
<pre><code class="language-css"><span class="hljs-comment">/* @acme/design-tokens/tokens.css */</span>
<span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--acme-color-primary</span>: <span class="hljs-number">#2563eb</span>;
  <span class="hljs-attr">--acme-color-primary-hover</span>: <span class="hljs-number">#1d4ed8</span>;
  <span class="hljs-attr">--acme-color-danger</span>: <span class="hljs-number">#dc2626</span>;
  <span class="hljs-attr">--acme-color-surface</span>: <span class="hljs-number">#ffffff</span>;
  <span class="hljs-attr">--acme-color-text</span>: <span class="hljs-number">#0f172a</span>;
  <span class="hljs-attr">--acme-color-border</span>: <span class="hljs-number">#e2e8f0</span>;

  <span class="hljs-attr">--acme-space-1</span>: <span class="hljs-number">0.25rem</span>;
  <span class="hljs-attr">--acme-space-2</span>: <span class="hljs-number">0.5rem</span>;
  <span class="hljs-attr">--acme-space-4</span>: <span class="hljs-number">1rem</span>;
  <span class="hljs-attr">--acme-space-6</span>: <span class="hljs-number">1.5rem</span>;

  <span class="hljs-attr">--acme-font-sans</span>: <span class="hljs-string">&#x27;Inter&#x27;</span>, system-ui, sans-serif;
  <span class="hljs-attr">--acme-text-sm</span>: <span class="hljs-number">0.875rem</span>;
  <span class="hljs-attr">--acme-text-base</span>: <span class="hljs-number">1rem</span>;

  <span class="hljs-attr">--acme-radius-sm</span>: <span class="hljs-number">0.25rem</span>;
  <span class="hljs-attr">--acme-radius-md</span>: <span class="hljs-number">0.375rem</span>;
  <span class="hljs-attr">--acme-shadow-sm</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.05</span>);
}

<span class="hljs-selector-attr">[data-theme=<span class="hljs-string">&#x27;dark&#x27;</span>]</span> {
  <span class="hljs-attr">--acme-color-primary</span>: <span class="hljs-number">#60a5fa</span>;
  <span class="hljs-attr">--acme-color-surface</span>: <span class="hljs-number">#0f172a</span>;
  <span class="hljs-attr">--acme-color-text</span>: <span class="hljs-number">#f1f5f9</span>;
  <span class="hljs-attr">--acme-color-border</span>: <span class="hljs-number">#334155</span>;
}
</code></pre>
<p>الخصائص المخصصة في CSS هي آلية التسليم الصحيحة هنا لأنها مستقلة عن أي إطار عمل. يستطيع تطبيق React، وتطبيق Svelte، وصفحة HTML ساكنة أن تستهلك ملف الرموز نفسه. ولا حاجة إلى خطوة بناء في جهة الاستهلاك.</p>
<h3 id="إخراج-الرموز-بصيغ-متعددة">إخراج الرموز بصيغ متعددة</h3>
<p>إذا كانت مستودعاتك تحتاج إلى الرموز بصيغتي CSS وJavaScript/TypeScript معًا، فولّد كل المخرجات من مصدر واحد باستخدام <strong>Style Dictionary</strong>:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// style-dictionary.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">source</span>: [<span class="hljs-string">&#x27;tokens/**/*.json&#x27;</span>],
  <span class="hljs-attr">platforms</span>: {
    <span class="hljs-attr">css</span>: {
      <span class="hljs-attr">transformGroup</span>: <span class="hljs-string">&#x27;css&#x27;</span>,
      <span class="hljs-attr">buildPath</span>: <span class="hljs-string">&#x27;dist/&#x27;</span>,
      <span class="hljs-attr">files</span>: [{ <span class="hljs-attr">destination</span>: <span class="hljs-string">&#x27;tokens.css&#x27;</span>, <span class="hljs-attr">format</span>: <span class="hljs-string">&#x27;css/variables&#x27;</span> }],
    },
    <span class="hljs-attr">js</span>: {
      <span class="hljs-attr">transformGroup</span>: <span class="hljs-string">&#x27;js&#x27;</span>,
      <span class="hljs-attr">buildPath</span>: <span class="hljs-string">&#x27;dist/&#x27;</span>,
      <span class="hljs-attr">files</span>: [{ <span class="hljs-attr">destination</span>: <span class="hljs-string">&#x27;tokens.js&#x27;</span>, <span class="hljs-attr">format</span>: <span class="hljs-string">&#x27;javascript/es6&#x27;</span> }],
    },
    <span class="hljs-attr">ts</span>: {
      <span class="hljs-attr">transformGroup</span>: <span class="hljs-string">&#x27;js&#x27;</span>,
      <span class="hljs-attr">buildPath</span>: <span class="hljs-string">&#x27;dist/&#x27;</span>,
      <span class="hljs-attr">files</span>: [{ <span class="hljs-attr">destination</span>: <span class="hljs-string">&#x27;tokens.d.ts&#x27;</span>, <span class="hljs-attr">format</span>: <span class="hljs-string">&#x27;typescript/es6-declarations&#x27;</span> }],
    },
  },
};
</code></pre>
<p>مصدر JSON واحد وثلاثة مخرجات. بلا مزامنة يدوية. وتستقرّ <a href="https://www.designtokens.org/TR/2025.10/format/">صيغة مجموعة Design Tokens المجتمعية (DTCG)</a> كمعيار للتبادل، لذا إذا بدأت من الصفر ففكّر في التأليف بهذه الصيغة منذ البداية.</p>
<h3 id="التعامل-مع-الرموز-كواجهة-برمجة">التعامل مع الرموز كواجهة برمجة</h3>
<p>هذا هو التحوّل الذهني المهم: <em>أسماء</em> الرموز و<em>أدوارها الدلالية</em> هي سطح واجهة برمجة التطبيقات لديك. <code>--acme-color-primary</code> عقد. وإعادة تسميته أو تغيير معناه تغيير كاسر، تمامًا كإعادة تسمية معامل دالة. انشر بيانات وصفية للحالة قابلة للقراءة آليًا (<code>active</code>, <code>deprecated</code>, <code>deleted</code>) إلى جانب رموزك حتى تستطيع الفرق المستهلكة فحص الإهمالات قبل أن تصبح أعطالًا.</p>
<h2 id="مكونات-مشتركة">مكوّنات مشتركة</h2>
<p>تمنحك الرموز اتساقًا في الألوان والتباعد. وتمنحك المكوّنات اتساقًا في التفاعل والتخطيط. والسؤال هو كيف توصل هذه المكوّنات إلى مستودعات قد تستخدم أطر عمل مختلفة.</p>
<h3 id="مكونات-الويب-web-components-لقابلية-النقل">مكوّنات الويب (Web Components) لقابلية النقل</h3>
<p>في بيئة متعددة المستودعات تتمتع فيها الفرق باستقلالية في اختيار إطار العمل، تقلّل <strong>مكوّنات الويب</strong> الارتباط القسري بإطار واحد. فمكوّن مبني على Lit يعمل في React وVue وSvelte وHTML العادي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// @acme/ui/src/acme-button.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LitElement</span>, html, css } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lit&#x27;</span>;
<span class="hljs-keyword">import</span> { customElement, property } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;lit/decorators.js&#x27;</span>;

<span class="hljs-meta">@customElement</span>(<span class="hljs-string">&#x27;acme-button&#x27;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">AcmeButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">LitElement</span> {
  <span class="hljs-meta">@property</span>() <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span> = <span class="hljs-string">&#x27;primary&#x27;</span>;
  <span class="hljs-meta">@property</span>({ <span class="hljs-attr">type</span>: <span class="hljs-title class_">Boolean</span> }) disabled = <span class="hljs-literal">false</span>;

  <span class="hljs-keyword">static</span> styles = css\`<span class="language-css">
    <span class="hljs-selector-tag">button</span> {
      <span class="hljs-attribute">font-family</span>: <span class="hljs-built_in">var</span>(--acme-font-sans);
      <span class="hljs-attribute">border-radius</span>: <span class="hljs-built_in">var</span>(--acme-radius-md);
      <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;
      <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">var</span>(--acme-space-<span class="hljs-number">2</span>) <span class="hljs-built_in">var</span>(--acme-space-<span class="hljs-number">4</span>);
      <span class="hljs-attribute">background</span>: <span class="hljs-built_in">var</span>(--acme-color-primary);
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:disabled</span> {
      <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.5</span>;
      <span class="hljs-attribute">cursor</span>: not-allowed;
    }
    <span class="hljs-selector-tag">button</span><span class="hljs-selector-class">.secondary</span> {
      <span class="hljs-attribute">background</span>: <span class="hljs-built_in">var</span>(--acme-color-surface);
      <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--acme-color-text);
      <span class="hljs-attribute">border-color</span>: <span class="hljs-built_in">var</span>(--acme-color-border);
    }
    <span class="hljs-selector-tag">button</span><span class="hljs-selector-class">.danger</span> {
      <span class="hljs-attribute">background</span>: <span class="hljs-built_in">var</span>(--acme-color-danger);
    }
  \`</span>;

  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> html\`<span class="language-xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.variant}</span><span class="language-xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span> ?<span class="hljs-attr">disabled</span>=</span></span><span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.disabled}</span><span class="language-xml"><span class="hljs-tag">&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    \`</span>;
  }
}
</code></pre>
<p>الاستهلاك مجرد HTML:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">acme-button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>Save<span class="hljs-tag">&lt;/<span class="hljs-name">acme-button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">acme-button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;danger&quot;</span> <span class="hljs-attr">disabled</span>&gt;</span>Delete<span class="hljs-tag">&lt;/<span class="hljs-name">acme-button</span>&gt;</span>
</code></pre>
<p>لاحظ كيف يستهلك المكوّن الرموز عبر الخصائص المخصصة في CSS. يعبر عقد السمة <em>عبر</em> حدود Shadow DOM دون أي ربط خاص بإطار عمل. ويمكن لفرق React استخدام مغلّفات <code>@lit/react</code> لتجنّب احتكاك التوافق مع العناصر المخصصة.</p>
<p>لكن المقايضة في مكوّنات الويب حقيقية: تغليف Shadow DOM يعني أن المستهلكين لا يستطيعون إعادة تصميم الأجزاء الداخلية ما لم تُعرّضها صراحةً عبر <code>::part()</code>. وهذه ميزة عندما تريد اتساقًا صارمًا، ومصدر إحباط عندما تحتاج الفرق إلى تخصيص مشروع. اعرض أسطح تنسيق محدودة ومُعتمدة ووثّقها كواجهة برمجة.</p>
<h3 id="قوالب-tailwind-المسبقة-لمستودعات-التصميم-بالأدوات-المساعدة">قوالب Tailwind المسبقة لمستودعات التصميم بالأدوات المساعدة</h3>
<p>إذا كانت مستودعاتك تستخدم Tailwind، فإن إعدادًا مسبقًا مشتركًا يحافظ على اتساق لوحة فئات الأدوات المساعدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// @acme/tailwind-preset/index.ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Config</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">acmePreset</span>: <span class="hljs-title class_">Config</span> = {
  <span class="hljs-attr">theme</span>: {
    <span class="hljs-attr">extend</span>: {
      <span class="hljs-attr">colors</span>: {
        <span class="hljs-attr">primary</span>: { <span class="hljs-attr">DEFAULT</span>: <span class="hljs-string">&#x27;#2563eb&#x27;</span>, <span class="hljs-attr">hover</span>: <span class="hljs-string">&#x27;#1d4ed8&#x27;</span> },
        <span class="hljs-attr">danger</span>: <span class="hljs-string">&#x27;#dc2626&#x27;</span>,
        <span class="hljs-attr">surface</span>: { <span class="hljs-attr">DEFAULT</span>: <span class="hljs-string">&#x27;#ffffff&#x27;</span>, <span class="hljs-attr">raised</span>: <span class="hljs-string">&#x27;#f8fafc&#x27;</span> },
      },
    },
  },
};
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// tailwind.config.ts in each repo</span>
<span class="hljs-keyword">import</span> { acmePreset } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@acme/tailwind-preset&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Config</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tailwindcss&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">presets</span>: [acmePreset],
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;cart-&#x27;</span>,
  <span class="hljs-attr">content</span>: [<span class="hljs-string">&#x27;./src/**/*.{ts,tsx,svelte,html}&#x27;</span>],
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Config</span>;
</code></pre>
<p>استخدم بادئة لكل تطبيق (<code>cart-</code>, <code>settings-</code>, <code>admin-</code>) لتفادي تعارض الفئات إذا جُمعت هذه الواجهات معًا يومًا ما.</p>
<h2 id="عزل-css">عزل CSS</h2>
<p>تعارض الأنماط عبر حدود الفرق أحد أكثر مصادر الأخطاء البصرية شيوعًا في البيئات متعددة التطبيقات. وتتعامل معه استراتيجية عزل طبقية:</p>
<p><strong>وحدات CSS (CSS Modules)</strong> للنطاق الافتراضي على مستوى التطبيق — يحصل كل مكوّن على أسماء فئات محلية النطاق دون أي كلفة وقت تشغيل:</p>
<pre><code class="language-css"><span class="hljs-comment">/* CartItem.module.css */</span>
<span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">gap</span>: <span class="hljs-built_in">var</span>(--acme-space-<span class="hljs-number">4</span>);
  <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">var</span>(--acme-space-<span class="hljs-number">4</span>);
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">var</span>(--acme-color-surface);
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-built_in">var</span>(--acme-radius-md);
}
</code></pre>
<p><strong>طبقات التتالي في CSS (cascade layers)</strong> لترتيب حتمي — عندما توجد مصادر متعددة للأنماط (الرموز، وإعادة التصفير، وشفرة التطبيق)، تُلغي الطبقات التخمين في الأولوية:</p>
<pre><code class="language-css"><span class="hljs-keyword">@layer</span> tokens, reset, app;

<span class="hljs-keyword">@layer</span> tokens {
  <span class="hljs-selector-pseudo">:root</span> {
    <span class="hljs-attr">--acme-color-primary</span>: <span class="hljs-number">#2563eb</span>;
  }
}

<span class="hljs-keyword">@layer</span> reset {
  *,
  *<span class="hljs-selector-pseudo">::before</span>,
  *<span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  }
}
</code></pre>
<p><strong>Shadow DOM</strong> للمكوّنات المشتركة عالية العزل — عندما يجب ألا يتأثر مكوّن إطلاقًا بالأنماط المحيطة. وهذا هو نهج مكوّنات الويب المذكور أعلاه.</p>
<p>يمنحك الجمع بينها نطاقًا على مستوى التطبيق، وترتيب تتالٍ متوقعًا عبر الطبقات، وتغليفًا صارمًا حيث تحتاج إليه.</p>
<h2 id="اختبارات-الانحدار-البصري-في-ci">اختبارات الانحدار البصري في CI</h2>
<p>ينبغي أن يشغّل كل مستودع اختبارات بصرية على مكوّناته. كما ينبغي أن تشغّل مستودعات المنصة <em>أيضًا</em> اختبارات للعرض المُركّب تتحقق مما يراه المستخدمون فعلًا عندما تظهر تطبيقات متعددة معًا.</p>
<p>تتولى <strong>Chromatic</strong> حالة المكوّن المعزول:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chromatic&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;chromatic --project-token=CHROMATIC_PROJECT_TOKEN&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بالنسبة للعروض المُركّبة، تحتاج إلى قصة Storybook أو صفحة اختبار تُركّب شرائح تطبيق متعددة معًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { mountCart } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cart-mfe/mount&#x27;</span>;
<span class="hljs-keyword">import</span> { mountHeader } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;header-mfe/mount&#x27;</span>;
<span class="hljs-keyword">import</span> { useEffect, useRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">ComposedDashboard</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> headerRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> cartRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> headerCleanup = <span class="hljs-title function_">mountHeader</span>(headerRef.<span class="hljs-property">current</span>!, {
      <span class="hljs-attr">user</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Demo User&#x27;</span> },
    });
    <span class="hljs-keyword">const</span> cartCleanup = <span class="hljs-title function_">mountCart</span>(cartRef.<span class="hljs-property">current</span>!, {
      <span class="hljs-attr">items</span>: [{ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Item&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">25</span> }],
    });
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      headerCleanup.<span class="hljs-title function_">unmount</span>();
      cartCleanup.<span class="hljs-title function_">unmount</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{headerRef}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{cartRef}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>و<strong>Playwright</strong> لاختبار اللقطات (snapshot) للنتيجة المُركّبة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;composed view matches snapshot&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/dashboard&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForSelector</span>(<span class="hljs-string">&#x27;[data-mfe=&quot;header&quot;]&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForSelector</span>(<span class="hljs-string">&#x27;[data-mfe=&quot;sidebar&quot;]&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveScreenshot</span>(<span class="hljs-string">&#x27;dashboard-composed.png&#x27;</span>, {
    <span class="hljs-attr">maxDiffPixelRatio</span>: <span class="hljs-number">0.01</span>,
  });
});
</code></pre>
<h2 id="فرض-الاتساق-وقت-البناء">فرض الاتساق وقت البناء</h2>
<p>التوثيق يُتجاهل. أما قواعد الفحص (lint) فلا.</p>
<h3 id="فرض-الرموز-باستخدام-stylelint">فرض الرموز باستخدام Stylelint</h3>
<p>امنع قيم الألوان المكتوبة مباشرة بفرض استخدام الرموز:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// .stylelintrc.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">plugins</span>: [<span class="hljs-string">&#x27;stylelint-declaration-strict-value&#x27;</span>],
  <span class="hljs-attr">rules</span>: {
    <span class="hljs-string">&#x27;scale-unlimited/declaration-strict-value&#x27;</span>: [
      [<span class="hljs-string">&#x27;/color/&#x27;</span>, <span class="hljs-string">&#x27;background-color&#x27;</span>, <span class="hljs-string">&#x27;border-color&#x27;</span>],
      {
        <span class="hljs-attr">ignoreValues</span>: [<span class="hljs-string">&#x27;transparent&#x27;</span>, <span class="hljs-string">&#x27;inherit&#x27;</span>, <span class="hljs-string">&#x27;currentColor&#x27;</span>, <span class="hljs-string">&#x27;none&#x27;</span>],
        <span class="hljs-attr">disableFix</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Use var(--acme-color-*) token values.&#x27;</span>,
      },
    ],
  },
};
</code></pre>
<h3 id="سياسة-المكونات-باستخدام-eslint">سياسة المكوّنات باستخدام ESLint</h3>
<p>امنع عناصر HTML الخام عند وجود مكوّن في نظام التصميم:</p>
<pre><code class="language-javascript"><span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-title function_">create</span>(<span class="hljs-params">context</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-title class_">JSXOpeningElement</span>(node) {
        <span class="hljs-keyword">if</span> (node.<span class="hljs-property">name</span>.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;button&#x27;</span>) {
          context.<span class="hljs-title function_">report</span>({
            node,
            <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Use shared DS Button component instead of raw &lt;button&gt;.&#x27;</span>,
          });
        }
      },
    };
  },
};
</code></pre>
<p>تعيش هذه القواعد في حزم إعدادات فحص مشتركة يثبّتها كل مستودع. ويفرضها CI. ولا يحتاج أحد إلى تذكّر السياسة — يفشل البناء إذا خالفتها.</p>
<h2 id="نموذج-الحوكمة">نموذج الحوكمة</h2>
<p>لا تنجح الأدوات التقنية إلا إذا دعمها النموذج التنظيمي. وهذا هو النمط الذي رأيته ينجح:</p>
<p>يملك <strong>فريق منصة مركزي</strong> العقود الشاملة: الرموز، ومخطط السمة والسياق، وسياسة التبعيات المشتركة، وخط أساس إمكانية الوصول، وأدوات الفرض (إعدادات الفحص، وقوالب CI، وبنية الاختبار). ويتعاملون مع نظام التصميم كمنتج له خارطة طريق واتفاقيات مستوى خدمة، لا كمشروع جانبي يصونه أحدهم حين يتوفر لديه وقت.</p>
<p>وتملك <strong>فرق المنتجات الاتحادية</strong> تنفيذ ميزاتها ضمن تلك العقود. ولديها استقلالية كاملة في مستودعاتها وأطر عملها وجداول نشرها. والقيود هي أن تستهلك الرموز المشتركة، وتستخدم المكوّنات المشتركة حيث توجد، وتجتاز فحوصات CI التي تفرض الحدود.</p>
<p>ويحلّ <strong>مجلس حوكمة</strong> الخلافات حول القرارات على مستوى العقود واستثناءات سياسة الإصدارات. يبدو هذا بيروقراطيًا، لكنه عمليًا اجتماع شهري يسأل فيه أحدهم «هل يمكننا كسر اسم هذا الرمز؟» فتقرر المجموعة ما إذا كانت كلفة الترحيل تستحق ذلك.</p>
<p>عناصر الحوكمة الجوهرية:</p>
<ul>
<li><strong>عقد سياق المنصة</strong>: السمة، واللغة، والاتجاه، والكثافة، وتفضيلات إمكانية الوصول.</li>
<li><strong>عقد أولوية التنسيق</strong>: ترتيب الطبقات وسياسة التجاوز.</li>
<li><strong>عقد مشاركة التبعيات</strong>: ما هو مشترك، وكيف، وبأي ضمانات توافق.</li>
<li><strong>سياسة الاستثناءات</strong>: المالك، وتاريخ الانتهاء، ومسار المعالجة لكل استثناء.</li>
</ul>
<p>المبدأ: لامركزية تسليم الميزات، ومركزية العقود وأدوات الفرض. وفرضها عبر CI، لا عبر وثائق السياسات وحدها.</p>
<h2 id="الإصدارات-والترحيل">الإصدارات والترحيل</h2>
<p>ضع إصدارات <em>للعقود</em>، لا للحزم فقط. وتشمل أسطح عقودك:</p>
<ul>
<li>مخطط الرموز ومعناها الدلالي.</li>
<li>واجهات برمجة المكوّنات وأسطح التنسيق المعتمدة (أسماء <code>::part()</code>، وخُطّافات الخصائص المخصصة في CSS).</li>
<li>واجهات برمجة السمة والسياق.</li>
<li>مخططات الأحداث والقياس عن بُعد المستخدمة عبر التطبيقات.</li>
</ul>
<p>استخدم semver مع إعلان واجهة برمجة عامة. واحتفظ بنوافذ توافق طويلة لعقود المنصة — ادعم الإصدار N و N-1 على الأقل حيثما أمكن. وانشر جداول زمنية للإهمال بتواريخ ومسارات ترقية، لا مجرد «هذا مهمَل، حظًا سعيدًا».</p>
<p>أما خط أساس أدوات الترحيل:</p>
<ul>
<li><strong>أدوات التحويل البرمجي (Codemods)</strong> للترحيلات الميكانيكية لواجهات البرمجة والرموز (jscodeshift لـ JS/TS، وإضافات PostCSS لـ CSS).</li>
<li><strong>قواعد الفحص</strong> التي تُعلّم الرموز المهمَلة والأنماط المضادة مع مسارات إصلاح تلقائي.</li>
<li><strong>أدلة ترحيل لكل معمارية</strong>، لا مجرد سجلات تغييرات للحزم.</li>
</ul>
<p>فريق نظام التصميم في Atlassian مرجع جيد هنا — فقد استثمروا بكثافة في حوكمة الرموز القائمة على دورة الحياة مع أدوات الترحيل والفحص والتحويل البرمجي. والدرس: تنجح ترحيلات المؤسسات بالأتمتة، لا بالتوثيق وحده.</p>
<h2 id="الجودة-على-المستوى-المركب">الجودة على المستوى المُركّب</h2>
<p>تتطلب جودة تجربة المستخدم الموزعة تحققًا طبقًا:</p>
<ul>
<li><strong>اختبارات العقود</strong>: توفر الرموز، وشكل السياق، وفحوصات سياسة التبعيات.</li>
<li><strong>اختبارات الشرائح</strong>: سلوك المكوّن وإمكانية الوصول بمعزل عن غيره.</li>
<li><strong>اختبارات التكامل المُركّبة</strong>: التوجيه بين الشرائح، وترتيب التركيز، وانتشار السمة.</li>
<li><strong>الانحدار البصري</strong>: السمة الأساسية، والكثافة، ومتغيرات التباين.</li>
</ul>
<p>فيما يخص إمكانية الوصول، توافق مع WCAG 2.2 وWAI-ARIA 1.2. وتعامل مع مصائد لوحة المفاتيح وعيوب فقدان التركيز كمانعات إصدار. و — وهذا الجزء الذي يغفله الناس — تحقق من إمكانية الوصول في بيئات <em>مُركّبة</em>، لا في قصص Storybook المعزولة فقط. فقد يكون مكوّن سليمًا تمامًا في إمكانية الوصول بمعزل عن غيره ومعطلًا كليًا عند تركيبه إلى جانب ثلاثة تطبيقات أخرى تتصارع كلها على التركيز.</p>
<p>لسلامة الإصدار، أطلق كل الإصدارات المؤثرة في العقود على أساس كناري. وقيّمها في مقابل ميزانيات صريحة للأخطاء والأداء وإمكانية الوصول. واحتفظ بأدلة تشغيل للحوادث تعطي الأولوية للتخفيف وبمسارات تراجع مُختبرة (إرجاع خريطة الاستيراد، وتعطيل الريموت، ومفتاح إيقاف علم الميزة).</p>
<h2 id="ما-ينبغي-قياسه">ما ينبغي قياسه</h2>
<ul>
<li><strong>توزيع إصدارات نظام التصميم</strong> عبر التطبيقات — إلى أي حد أنت مشظّى؟</li>
<li><strong>الزمن الوسيط للتبني</strong> لإصدار رئيسي أو ثانوي من نظام التصميم.</li>
<li><strong>معدل العيوب عبر المستودعات</strong> المرتبط بالتنفيذات المتباعدة.</li>
<li><strong>الجهد الهندسي</strong> المصروف على عمل منصّي مكرر.</li>
<li><strong>وتيرة النشر ومعدل فشل التغييرات</strong> (مقاييس DORA المعيارية).</li>
<li><strong>الأداء على مستوى المسار</strong> (TTFB، FCP، INP) لرحلات المستخدم الحرجة.</li>
</ul>
<h2 id="دليل-الاستثمار">دليل الاستثمار</h2>
<table>
<thead>
<tr>
<th>الاستراتيجية</th>
<th>الدور</th>
<th>الاستثمار</th>
</tr>
</thead>
<tbody>
<tr>
<td>الرموز (خصائص CSS المخصصة)</td>
<td>عقد بصري مطلوب</td>
<td>منخفض</td>
</tr>
<tr>
<td>Style Dictionary</td>
<td>إخراج الرموز لعدة أهداف</td>
<td>متوسط</td>
</tr>
<tr>
<td>مكوّنات مشتركة (Lit/Web Components)</td>
<td>اتساق واجهة المستخدم عبر المستودعات</td>
<td>متوسط–مرتفع</td>
</tr>
<tr>
<td>إعداد Tailwind مسبق ببادئة التطبيق</td>
<td>توحيد المنهج القائم على الأدوات المساعدة</td>
<td>منخفض</td>
</tr>
<tr>
<td>وحدات CSS + طبقات التتالي</td>
<td>عزل الأنماط والتحكم في التتالي</td>
<td>منخفض</td>
</tr>
<tr>
<td>Chromatic وPlaywright</td>
<td>سلامة الانحدار البصري</td>
<td>متوسط</td>
</tr>
<tr>
<td>فرض الفحص (Stylelint + ESLint)</td>
<td>الامتثال للعقود في CI</td>
<td>متوسط</td>
</tr>
</tbody>
</table>
<h2 id="متى-يناسب-هذا-النمط">متى يناسب هذا النمط</h2>
<ul>
<li>التطبيقات مستقلة تشغيليًا لكن ينبغي أن تبدو وتُحَسّ متماسكة.</li>
<li>تحتاج الفرق استقلالية كاملة في المستودع والإصدار.</li>
<li>التركيب وقت التشغيل غير ضروري أو غير مرغوب.</li>
<li>تستطيع المؤسسة إدامة فريق منتج لنظام التصميم.</li>
</ul>
<h2 id="متى-نتجنبه">متى نتجنبه</h2>
<ul>
<li>تحتاج إلى تغييرات سلوكية منسّقة ومتكررة عبر التطبيقات.</li>
<li>لا تستطيع المؤسسة صيانة فريق مخصص لنظام التصميم. (وبدونه تتعفن العناصر المشتركة وتلتف الفرق حولها.)</li>
</ul>
<h2 id="دروس-من-الميدان">دروس من الميدان</h2>
<p><strong>IBM Carbon</strong>: قوي في التواصل الصريح حول الترحيل والإهمال. والدرس القابل للنقل هو أن إعادة تشكيل الحزم تحتاج تواريخ ومسارات بديلة وإرشادات خاصة بكل مستهلك — لا مجرد مدخل في سجل التغييرات.</p>
<p><strong>Shopify Polaris</strong>: خطوة استراتيجية نحو حدود مستقلة عن إطار العمل باستخدام مكوّنات الويب. والدرس هو أن حدود مكوّنات الويب قد تحسّن التبني في المؤسسات متعددة التقنيات، لكن فترات الانتقال تشظّي مصدر الحقيقة ما لم تُمركز عقود الرموز أولًا.</p>
<p><strong>نظام تصميم Atlassian</strong>: حوكمة رموز قائمة على دورة الحياة مع أدوات ترحيل وفحص وتحويل برمجي على نطاق واسع. والدرس هو أن التحكم المركزي في المساهمات قد يخنق الإنتاجية دون مسارات توسعة واضحة لفرق المنتجات.</p>
<p><strong>GitHub Primer</strong>: معايير عالية الجودة للمساهمات والتوثيق. والدرس هو أن الأسس المستقرة مع عمليات مراجعة صارمة تحسّن الاتساق على المدى الطويل، حتى وإن أبطأت دورة المساهمة الأولية.</p>
<p>النمط المشترك بين الحالات: وضوح العقود مع أدوات الترحيل مع انضباط النشر التشغيلي هي الصيغة المتينة. ولا يغني أي قدر من تلميع Figma عن هذه الأمور الثلاثة.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<p><em>ملاحظة: تحتوي مجموعة الشرائح الحالية بالفعل على شريحة «حوكمة نظام التصميم». وتوفّر الشرائح أدناه عمقًا إضافيًا لهذا القسم.</em></p>
<h3 id="حوكمة-تتوسع">حوكمة تتوسّع</h3>
<blockquote>
<p>القواعد بلا أدوات مجرد اقتراحات.</p>
</blockquote>
<ul>
<li><strong>قواعد الفحص</strong> تفرض استخدام الرموز واصطلاحات واجهة برمجة المكوّنات وقت البناء.</li>
<li><strong>اختبارات الانحدار البصري</strong> (Chromatic، Percy) تلتقط التغييرات البصرية غير المقصودة في CI.</li>
<li><strong>سير عمل الإهمال</strong> — علّم الأنماط القديمة، ووفّر أدوات تحويل، وحدّد جداول الإزالة.</li>
<li><strong>لوحات التبني</strong> — تتبّع أي التطبيقات تستخدم أي الإصدارات. واعرف أين يتراكم الدين.</li>
</ul>
<p><strong>مكدّس الحوكمة:</strong></p>
<ol>
<li>الرموز ← تفرضها قواعد الفحص</li>
<li>المكوّنات ← يفرضها الانحدار البصري + اختبارات إمكانية الوصول</li>
<li>الأنماط ← تفرضها قواعد فحص معمارية + مراجعة الشفرة</li>
<li>المساهمة ← تفرضها عملية RFC + اتفاقية مستوى خدمة على المراجعات</li>
</ol>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,r as default,t as headings,e as html,l as slug,p as title};
