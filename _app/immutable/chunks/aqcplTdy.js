const s="kinney",a="react-performance",n="أداء React",p="resource-preloading-apis",l="واجهات التحميل المسبق للموارد",t=[{depth:2,id:"عائلة-التحميل-المسبق-للموارد",text:"عائلة التحميل المسبق للموارد"},{depth:3,id:"نظرة-سريعة",text:"نظرة سريعة"},{depth:2,id:"فهم-preload",text:"فهم preload"},{depth:3,id:"التحميل-المسبق-لبيانات-api",text:"التحميل المسبق لبيانات API"},{depth:2,id:"التحميل-المسبق-لـ-dns-باستخدام-prefetchdns",text:"التحميل المسبق لـ DNS باستخدام prefetchDNS"},{depth:2,id:"التهيئة-المسبقة-للموارد-باستخدام-preinit",text:"التهيئة المسبقة للموارد باستخدام preinit"},{depth:3,id:"التهيئة-المسبقة-لأوراق-الأنماط",text:"التهيئة المسبقة لأوراق الأنماط"},{depth:3,id:"التهيئة-المسبقة-للسكربتات",text:"التهيئة المسبقة للسكربتات"},{depth:2,id:"حالات-استخدام-من-العالم-الحقيقي",text:"حالات استخدام من العالم الحقيقي™"},{depth:3,id:"صفحات-منتجات-التجارة-الإلكترونية",text:"صفحات منتجات التجارة الإلكترونية"},{depth:3,id:"النماذج-متعددة-الخطوات",text:"النماذج متعددة الخطوات"},{depth:3,id:"تطبيقات-لوحات-المعلومات",text:"تطبيقات لوحات المعلومات"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"لا-تحمل-كل-شيء-مسبقا",text:"لا تحمّل كل شيء مسبقًا"},{depth:3,id:"اعتبارات-الهاتف-المحمول",text:"اعتبارات الهاتف المحمول"},{depth:3,id:"تجنب-التحميل-المزدوج",text:"تجنّب التحميل المزدوج"},{depth:2,id:"المزالق-الشائعة-وكيفية-تجنبها",text:"المزالق الشائعة وكيفية تجنّبها"},{depth:3,id:"تحميل-الموارد-مسبقا-في-وقت-مبكر-جدا",text:"تحميل الموارد مسبقًا في وقت مبكر جدًا"},{depth:3,id:"نسيان-cors-للموارد-عبر-النطاقات",text:"نسيان CORS للموارد عبر النطاقات"},{depth:3,id:"عدم-مراعاة-ترويسات-التخزين-المؤقت",text:"عدم مراعاة ترويسات التخزين المؤقت"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>إن انتظار تحميل الموارد من الأمور التي تجعل تطبيقات الويب تبدو متثاقلة، حتى وهي سريعة فعلًا. ينقر المستخدم زرًا، ويحدّق في مؤشّر تحميل دوّار، ويتساءل إن كان عليه تحديث الصفحة (حرق الأحداث: سيفعل ذلك على الأرجح). وهنا تأتي واجهات التحميل المسبق للموارد (resource preloading APIs) في React 19 — مجموعة من الدوال تتيح لك تهيئة ذاكرة المتصفح المؤقتة بالموارد التي سيحتاجها المستخدمون بعد قليل، قبل أن يحتاجوها فعلًا.</p>
<p>تخيّل الأمر كأن تكون قهوتك جاهزة قبل أن تستيقظ تمامًا، أو كأن تجهّز الحلقة التالية بينما لا تزال تشاهد الحالية. بحلول الوقت الذي تحتاج فيه هذه الموارد فعلًا، تكون هناك بالفعل، ما يجعل تطبيقك أسرع استجابةً وأكثر سلاسة.</p>
<h2 id="عائلة-التحميل-المسبق-للموارد">عائلة التحميل المسبق للموارد</h2>
<p>يمنحك React 19 ثلاث دوال رئيسية للتحميل المسبق للموارد: <code>preload</code> و<code>prefetchDNS</code> و<code>preinit</code>. لكل منها غرض مختلف، ومعرفة متى تستخدم أيّها قد تصنع الفرق بين تجربة مستخدم سلسة وأخرى متعثّرة.</p>
<h3 id="نظرة-سريعة">نظرة سريعة</h3>
<ul>
<li><strong><code>preload</code></strong>: ينزّل موردًا ويخزّنه مؤقتًا، لكنه لا ينفّذه</li>
<li><strong><code>prefetchDNS</code></strong>: يحلّ استعلامات DNS مسبقًا للنطاقات الخارجية</li>
<li><strong><code>preinit</code></strong>: ينزّل الموارد ويخزّنها مؤقتًا ويهيّئها (مثل أوراق الأنماط والسكربتات)</li>
</ul>
<p>صُمّمت كل هذه الدوال لتكون آمنة — فهي لا تنزّل الموارد مرتين إن نُوديت عدة مرات، ولا تعيق الخيط الرئيسي ولا تضرّ بمؤشرات الويب الأساسية (Core Web Vitals).</p>
<h2 id="فهم-preload">فهم <code>preload</code></h2>
<p>دالة <code>preload</code> هي خيارك المفضّل لتنزيل الموارد التي سيحتاجها المستخدمون قريبًا على الأرجح، لكن لا يجب تنفيذها فورًا. هذا مثالي لأشياء مثل صور الصفحة التالية، أو الخطوط التي قد تُحتاج، أو بيانات API التي قد تُطلب.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preload } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleProductHover</span> = (<span class="hljs-params"><span class="hljs-attr">productId</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// When user hovers over a product, preload its detailed image</span>
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">\`/api/products/<span class="hljs-subst">\${productId}</span>/image-hd.jpg\`</span>, {
      <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span>,
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;grid grid-cols-3 gap-4&quot;</span>&gt;</span>
      {products.map((product) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span>
          <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{()</span> =&gt;</span> handleProductHover(product.id)}
          className=&quot;cursor-pointer&quot;
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.thumbnail}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>تخبر معلمة <code>as</code> المتصفح بنوع المورد، ما يساعد في التخزين المؤقت وتحديد الأولوية. من القيم الشائعة:</p>
<ul>
<li><code>'image'</code> - للصور</li>
<li><code>'font'</code> - لخطوط الويب (أضف <code>crossOrigin: 'anonymous'</code> للخطوط عبر النطاقات)</li>
<li><code>'script'</code> - لملفات JavaScript</li>
<li><code>'style'</code> - لملفات CSS</li>
<li><code>'fetch'</code> - لاستدعاءات API أو طلبات fetch الأخرى</li>
</ul>
<h3 id="التحميل-المسبق-لبيانات-api">التحميل المسبق لبيانات API</h3>
<p>يمكنك أيضًا تحميل استجابات API مسبقًا، وهذا مفيد خاصةً عندما تعلم أن المستخدمين مرجّحون للانتقال إلى مكان يتطلب بيانات محدّدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preload } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">NavigationMenu</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleDashboardHover</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// Preload the user&#x27;s dashboard data when they hover over the nav link</span>
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/dashboard/summary&#x27;</span>, {
      <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span>,
      <span class="hljs-attr">crossOrigin</span>: <span class="hljs-string">&#x27;anonymous&#x27;</span>,
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/dashboard&quot;</span> <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{handleDashboardHover}</span>&gt;</span>
        Dashboard
      <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يمنحك التحميل المسبق عند المرور بالمؤشر توازنًا جميلًا — فالمستخدمون الذين يتصفحون فقط لن يطلقوا طلبات غير ضرورية، أما المهتمون فعلًا فيحصلون على شروع مبكر.</p>
</blockquote>
<h2 id="التحميل-المسبق-لـ-dns-باستخدام-prefetchdns">التحميل المسبق لـ DNS باستخدام <code>prefetchDNS</code></h2>
<p>قبل أن يستطيع متصفحك تنزيل أي مورد من نطاق خارجي، عليه أن يحلّ ذلك النطاق إلى عنوان IP. قد يضيف استعلام DNS هذا مئات الأجزاء من الثانية إلى زمن طلبك، خصوصًا للمستخدمين على شبكات أبطأ أو البعيدين جغرافيًا عن خوادم DNS.</p>
<p>تخبر <code>prefetchDNS</code> المتصفح بحلّ هذه الاستعلامات مسبقًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { prefetchDNS } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Prefetch DNS for external services we&#x27;ll likely use</span>
    <span class="hljs-title function_">prefetchDNS</span>(<span class="hljs-string">&#x27;https://api.stripe.com&#x27;</span>);
    <span class="hljs-title function_">prefetchDNS</span>(<span class="hljs-string">&#x27;https://fonts.googleapis.com&#x27;</span>);
    <span class="hljs-title function_">prefetchDNS</span>(<span class="hljs-string">&#x27;https://cdn.jsdelivr.net&#x27;</span>);
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span>;
}
</code></pre>
<p>يكون هذا ذا قيمة خاصة عندما:</p>
<ul>
<li>تحمّل موارد من شبكات CDN</li>
<li>تجري استدعاءات API إلى خدمات خارجية</li>
<li>تحمّل خطوطًا من Google Fonts أو خدمات مشابهة</li>
<li>لديك سكربتات تحليلات أو تتبّع من نطاقات طرف ثالث</li>
</ul>
<p>جمال <code>prefetchDNS</code> أنه مجاني تقريبًا — فهو لا ينزّل أي محتوى فعلي، بل يحلّ اسم النطاق فقط. حتى إن لم يحتج المستخدم تلك الموارد إطلاقًا، كانت التكلفة ضئيلة.</p>
<h2 id="التهيئة-المسبقة-للموارد-باستخدام-preinit">التهيئة المسبقة للموارد باستخدام <code>preinit</code></h2>
<p>بينما تنزّل <code>preload</code> الموارد دون تنفيذها، تذهب <code>preinit</code> أبعد من ذلك بتنزيلها <em>وتهيئتها</em>. يعني هذا أن المورد يصبح متاحًا للاستخدام الفوري.</p>
<h3 id="التهيئة-المسبقة-لأوراق-الأنماط">التهيئة المسبقة لأوراق الأنماط</h3>
<p>هذا مفيد خاصةً لأوراق الأنماط التي تعلم أنك ستحتاجها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preinit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SettingsPage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Preinit the theme switcher styles since users often toggle themes</span>
    <span class="hljs-title function_">preinit</span>(<span class="hljs-string">&#x27;/styles/themes/dark-mode.css&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;style&#x27;</span> });
    <span class="hljs-title function_">preinit</span>(<span class="hljs-string">&#x27;/styles/themes/light-mode.css&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;style&#x27;</span> });
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;settings-page&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ThemeSelector</span> /&gt;</span>
      {/* rest of your settings */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="التهيئة-المسبقة-للسكربتات">التهيئة المسبقة للسكربتات</h3>
<p>يمكنك أيضًا تهيئة ملفات JavaScript مسبقًا تحتوي على شيفرة ستحتاجها قريبًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preinit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">PaymentForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Preinit payment processing scripts when the form loads</span>
    <span class="hljs-title function_">preinit</span>(<span class="hljs-string">&#x27;https://js.stripe.com/v3/&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;script&#x27;</span> });
  }, []);

  <span class="hljs-keyword">const</span> [showPayment, setShowPayment] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setShowPayment(true)}&gt;Proceed to Payment<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {showPayment &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">StripePaymentForm</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>توخَّ الحذر مع <code>preinit</code> للسكربتات — فهي تُنفَّذ فورًا عند تنزيلها. لا تهيّئ مسبقًا إلا السكربتات التي تثق بأنك ستحتاجها والتي يكون تشغيلها مبكرًا آمنًا.</p>
</blockquote>
<h2 id="حالات-استخدام-من-العالم-الحقيقي">حالات استخدام من العالم الحقيقي™</h2>
<p>لنلقِ نظرة على بعض السيناريوهات العملية التي يمكن أن يُحدث فيها التحميل المسبق للموارد فرقًا ملموسًا في تجربة المستخدم.</p>
<h3 id="صفحات-منتجات-التجارة-الإلكترونية">صفحات منتجات التجارة الإلكترونية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preload, prefetchDNS } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCard</span>(<span class="hljs-params">{ product }: { product: Product }</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMouseEnter</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// Preload high-res images for the product detail page</span>
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">\`/images/products/<span class="hljs-subst">\${product.id}</span>/hero.jpg\`</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span> });
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">\`/images/products/<span class="hljs-subst">\${product.id}</span>/gallery.jpg\`</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span> });

    <span class="hljs-comment">// Preload the product details API call</span>
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">\`/api/products/<span class="hljs-subst">\${product.id}</span>\`</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{</span>\`/<span class="hljs-attr">products</span>/\${<span class="hljs-attr">product.id</span>}\`} <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{handleMouseEnter}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.thumbnail}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>\${product.price}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="النماذج-متعددة-الخطوات">النماذج متعددة الخطوات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preload, preinit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">OnboardingFlow</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [step, setStep] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">1</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Always prefetch DNS for services we&#x27;ll use</span>
    <span class="hljs-title function_">prefetchDNS</span>(<span class="hljs-string">&#x27;https://api.stripe.com&#x27;</span>);
    <span class="hljs-title function_">prefetchDNS</span>(<span class="hljs-string">&#x27;https://maps.googleapis.com&#x27;</span>);

    <span class="hljs-comment">// Preload resources for likely next steps</span>
    <span class="hljs-keyword">if</span> (step === <span class="hljs-number">1</span>) {
      <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/validate-business&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (step === <span class="hljs-number">2</span>) {
      <span class="hljs-title function_">preinit</span>(<span class="hljs-string">&#x27;https://js.stripe.com/v3/&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;script&#x27;</span> });
      <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/payment-methods&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });
    }
  }, [step]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {step === 1 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">BusinessInfoStep</span> <span class="hljs-attr">onNext</span>=<span class="hljs-string">{()</span> =&gt;</span> setStep(2)} /&gt;}
      {step === 2 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">PaymentStep</span> <span class="hljs-attr">onNext</span>=<span class="hljs-string">{()</span> =&gt;</span> setStep(3)} /&gt;}
      {step === 3 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">ConfirmationStep</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="تطبيقات-لوحات-المعلومات">تطبيقات لوحات المعلومات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preload, prefetchDNS } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Preload common dashboard resources</span>
    <span class="hljs-title function_">prefetchDNS</span>(<span class="hljs-string">&#x27;https://api.analytics.com&#x27;</span>);

    <span class="hljs-comment">// Preload data for tabs users commonly switch between</span>
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/dashboard/analytics&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/dashboard/reports&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });

    <span class="hljs-comment">// Preload chart rendering library (but don&#x27;t preinit it)</span>
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/scripts/chart-library.js&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;script&#x27;</span> });
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;dashboard&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TabNav</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>قد يحسّن التحميل المسبق للموارد الأداء المدرَك تحسينًا جذريًا، لكن من المهم استخدامه بتفكير. إليك الأمور الرئيسية التي ينبغي وضعها في الاعتبار:</p>
<h3 id="لا-تحمل-كل-شيء-مسبقا">لا تحمّل كل شيء مسبقًا</h3>
<p>الإغراء هو تحميل كل الأشياء مسبقًا، لكن هذا قد ينعكس سلبًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This will hurt more than it helps</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Don&#x27;t do this - you&#x27;re wasting bandwidth and potentially blocking more important resources</span>
  <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/images/gallery/image1.jpg&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span> });
  <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/images/gallery/image2.jpg&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span> });
  <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/images/gallery/image3.jpg&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span> });
  <span class="hljs-comment">// ... 50 more images</span>
}, []);

<span class="hljs-comment">// ✅ Better - preload strategically</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleGalleryEnter</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-comment">// Only preload the first few images when user shows intent</span>
  <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/images/gallery/image1.jpg&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span> });
  <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/images/gallery/image2.jpg&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;image&#x27;</span> });
};
</code></pre>
<h3 id="اعتبارات-الهاتف-المحمول">اعتبارات الهاتف المحمول</h3>
<p>كن حذرًا بشكل خاص على شبكات الهاتف المحمول حيث النطاق الترددي محدود والبيانات مكلّفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { preload } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePreloadStrategy</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [connection] = <span class="hljs-title function_">useState</span>(
    <span class="hljs-function">() =&gt;</span>
      <span class="hljs-comment">// @ts-ignore - not all browsers support this yet</span>
      navigator.<span class="hljs-property">connection</span> || navigator.<span class="hljs-property">mozConnection</span> || navigator.<span class="hljs-property">webkitConnection</span>,
  );

  <span class="hljs-keyword">const</span> shouldPreload = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Don&#x27;t preload on slow connections or when user has data saver enabled</span>
    <span class="hljs-keyword">if</span> (connection?.<span class="hljs-property">saveData</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span> (connection?.<span class="hljs-property">effectiveType</span> === <span class="hljs-string">&#x27;slow-2g&#x27;</span> || connection?.<span class="hljs-property">effectiveType</span> === <span class="hljs-string">&#x27;2g&#x27;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }, [connection]);

  <span class="hljs-keyword">return</span> { shouldPreload };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductGrid</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { shouldPreload } = <span class="hljs-title function_">usePreloadStrategy</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleProductHover</span> = (<span class="hljs-params"><span class="hljs-attr">productId</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">if</span> (shouldPreload) {
      <span class="hljs-title function_">preload</span>(<span class="hljs-string">\`/api/products/<span class="hljs-subst">\${productId}</span>\`</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });
    }
  };

  <span class="hljs-comment">// ... rest of component</span>
}
</code></pre>
<h3 id="تجنب-التحميل-المزدوج">تجنّب التحميل المزدوج</h3>
<p>من الأمور الرائعة في دوال التحميل المسبق في React أنها ذكية في عدم تحميل الموارد مرتين:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ComponentA</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/user-data&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Component A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ComponentB</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This won&#x27;t trigger another download - React knows this resource is already preloaded</span>
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/user-data&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Component B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="المزالق-الشائعة-وكيفية-تجنبها">المزالق الشائعة وكيفية تجنّبها</h2>
<h3 id="تحميل-الموارد-مسبقا-في-وقت-مبكر-جدا">تحميل الموارد مسبقًا في وقت مبكر جدًا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This preloads immediately when the app starts, potentially wasting bandwidth</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/premium-features&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> }); <span class="hljs-comment">// Most users might never need this</span>
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Better - preload when there&#x27;s user intent</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">PricingPage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUpgradeHover</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;/api/premium-features&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> }); <span class="hljs-comment">// Now we know they&#x27;re interested</span>
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onMouseEnter</span>=<span class="hljs-string">{handleUpgradeHover}</span>&gt;</span>Upgrade to Premium<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h3 id="نسيان-cors-للموارد-عبر-النطاقات">نسيان CORS للموارد عبر النطاقات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This might fail for cross-origin requests</span>
<span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;https://api.external.com/data&#x27;</span>, { <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span> });

<span class="hljs-comment">// ✅ Include CORS headers when needed</span>
<span class="hljs-title function_">preload</span>(<span class="hljs-string">&#x27;https://api.external.com/data&#x27;</span>, {
  <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;fetch&#x27;</span>,
  <span class="hljs-attr">crossOrigin</span>: <span class="hljs-string">&#x27;anonymous&#x27;</span>,
});
</code></pre>
<h3 id="عدم-مراعاة-ترويسات-التخزين-المؤقت">عدم مراعاة ترويسات التخزين المؤقت</h3>
<p>تأكّد من أن خادمك يضبط ترويسات تخزين مؤقت مناسبة للموارد المحمّلة مسبقًا. إن كانت استجابات API لديك تحمل <code>Cache-Control: no-cache</code>، فلن يفيد تحميلها مسبقًا كثيرًا لأنها لا يمكن تخزينها مؤقتًا.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Your API endpoint should include proper cache headers</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/products/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Cache-Control&#x27;</span>, <span class="hljs-string">&#x27;public, max-age=300&#x27;</span>); <span class="hljs-comment">// 5 minutes</span>
  res.<span class="hljs-title function_">json</span>(productData);
});
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>إليك قائمة سريعة لاستخدام التحميل المسبق للموارد بفاعلية:</p>
<ul>
<li>✅ حمّل الموارد مسبقًا بناءً على نية المستخدم (المرور، التركيز، القرب من التمرير)</li>
<li>✅ استخدم <code>prefetchDNS</code> للنطاقات الخارجية التي ستحتاجها على الأرجح</li>
<li>✅ راعِ ظروف الشبكة وتفضيلات موفّر البيانات</li>
<li>✅ حمّل الموارد عالية الأثر أولًا (الصور الحرجة، استدعاءات API الأولية)</li>
<li>✅ اختبر على شبكات بطيئة للتأكد من أنك تحسّن الأداء فعلًا</li>
<li>✅ راقب مقاييس التحميل لديك للتحقق من أن التحميل المسبق يساعد</li>
<li>❌ لا تحمّل الموارد مسبقًا «تحسّبًا» — كن استراتيجيًا</li>
<li>❌ لا تنسَ ترويسات CORS للموارد عبر النطاقات</li>
<li>❌ لا تحمّل الموارد الكبيرة مسبقًا إلا إذا كنت واثقًا من الحاجة إليها</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
