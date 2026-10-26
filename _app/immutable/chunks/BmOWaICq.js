const s="kinney",n="tailwind",a="Tailwind CSS",l="tailwind-anti-patterns",p="الأنماط المضادة",t=[{depth:2,id:"الإفراط-في-استخدام-توجيه-apply",text:"الإفراط في استخدام توجيه @apply"},{depth:2,id:"توقع-سلوك-المتغيرات-في-مكونات-layer",text:"توقّع سلوك المتغيّرات في مكوّنات @layer"},{depth:2,id:"تجاهل-المعمارية-القائمة-على-المكونات",text:"تجاهل المعمارية القائمة على المكوّنات"},{depth:2,id:"تجاهل-تخصيص-القالب",text:"تجاهل تخصيص القالب"},{depth:2,id:"استهداف-المتصفحات-القديمة-دون-تفكير",text:"استهداف المتصفحات القديمة دون تفكير"},{depth:2,id:"استخدام-معالجات-css-التقليدية",text:"استخدام معالجات CSS التقليدية"},{depth:2,id:"تطبيق-الأدوات-على-مكونات-عالية-المستوى",text:"تطبيق الأدوات على مكوّنات عالية المستوى"},{depth:2,id:"باختصار",text:"باختصار"}],e=`<h2 id="الإفراط-في-استخدام-توجيه-apply">الإفراط في استخدام توجيه <code>@apply</code></h2>
<p>استخدام <code>@apply</code> لتضمين الأصناف المساعدة:</p>
<pre><code class="language-css"><span class="hljs-comment">/* ❌ Anti-pattern */</span>
<span class="hljs-selector-class">.btn</span> {
  <span class="hljs-keyword">@apply</span> bg-blue-<span class="hljs-number">500</span> px-<span class="hljs-number">4</span> py-<span class="hljs-number">2</span> text-white;
}
</code></pre>
<p>هذا ينهار لعدة أسباب:</p>
<ul>
<li>يكسر نموذج الأولوية للأدوات</li>
<li>ينشئ أنماطًا غير مرنة</li>
<li>لا تعمل المتغيّرات كما هو متوقع في Tailwind 4</li>
<li>يزيد حجم حزمة CSS</li>
</ul>
<p><strong>استخدمه <em>فقط</em> من أجل</strong>: تجاوزات مكتبات الطرف الثالث أو احتياجات التوافق.</p>
<h2 id="توقع-سلوك-المتغيرات-في-مكونات-layer">توقّع سلوك المتغيّرات في مكوّنات <code>@layer</code></h2>
<p>تعريف أنماط مخصصة في مكوّنات <code>@layer</code> مع توقّع دعم المتغيّرات:</p>
<pre><code class="language-css"><span class="hljs-comment">/* ❌ Anti-pattern in Tailwind 4 */</span>
<span class="hljs-keyword">@layer</span> components {
  <span class="hljs-selector-class">.my-button</span> {
    <span class="hljs-attribute">background</span>: blue;
  }
}
<span class="hljs-comment">/* hover:my-button won&#x27;t work */</span>
</code></pre>
<p><strong>الإصلاح:</strong> استخدم <code>@utility</code> لدعم المتغيّرات:</p>
<pre><code class="language-css"><span class="hljs-comment">/* ✅ Correct approach */</span>
<span class="hljs-keyword">@utility</span> my-button {
  <span class="hljs-attribute">background</span>: blue;
}
</code></pre>
<h2 id="تجاهل-المعمارية-القائمة-على-المكونات">تجاهل المعمارية القائمة على المكوّنات</h2>
<p>من الواضح أنك تستطيع استخدام Tailwind <em>دون</em> مكوّنات، لكن سرعان ما يتضح كم يمكن أن يصبح هذا صعبًا.</p>
<p><em>تجاهل المعمارية القائمة على المكوّنات — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/e4958d62b8ab1c724f2f6772aef503e9eab7bbdc74d4e28d2b9f8074c5f75c90.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;space-x-2&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700&quot;</span>&gt;</span>
    Button
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700&quot;</span>&gt;</span>
    Button
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700&quot;</span>&gt;</span>
    Button
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>الإصلاح:</strong> استخدم أُطر المكوّنات لتجنب التكرار. لديك خيارات: React وSvelte وAngular وVue وغيرها. أعني أنه يمكنك استخدام مكوّنات الويب. بل يمكنك حتى استخدام jQuery. بل يمكنك حتى استخدام القوالب من جهة الخادم. لكن، أجل، إن كنت تكتب كل هذا يدويًا أو ما شابه، فربما لا تكون Tailwind خيارًا مناسبًا.</p>
<h2 id="تجاهل-تخصيص-القالب">تجاهل تخصيص القالب</h2>
<p>في وقت الضيق، قد يكون مغريًا استخدام قيم اعتباطية بدلًا من رموز التصميم.</p>
<p><em>تجاهل تخصيص القالب — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/62c785664e78eb184df5663fbda8e1db32c8e7344d7d84bd72a4535ead4f6ede.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- ❌ Anti-pattern: Magic values --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-[#ff6b35] p-[123px] text-[14.5px]&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>لكني أظن أنه واضح تمامًا أنك ستندم على هذا الاختيار بعد فترة طويلة بما يكفي.</p>
<p>بدلًا من ذلك، استخدم تهيئة القالب أولًا بـ CSS:</p>
<pre><code class="language-css"><span class="hljs-comment">/* ✅ Define consistent tokens */</span>
<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-brand</span>: <span class="hljs-number">#ff6b35</span>;
  <span class="hljs-attr">--spacing-section</span>: <span class="hljs-number">123px</span>;
}
</code></pre>
<h2 id="استهداف-المتصفحات-القديمة-دون-تفكير">استهداف المتصفحات القديمة دون تفكير</h2>
<p>يفعل Tailwind 4 الكثير مما يفعله بالاستفادة من ميزات المتصفحات الحديثة. وينهار بسرعة إن كنت تحاول دعم متصفحات أقدم من Chrome 111 أو Safari 16.4 أو Firefox 128. في هذه الحالة، استخدم Tailwind 3 مع PostCSS لتوفير بدائل لهذه الميزات. וכן، ابحث عن وظيفة جديدة.</p>
<p>كحد أدنى، تحتاج إلى دعم هذه الميزات.</p>
<ul>
<li>طبقات التسلسل (<code>@layer</code>)</li>
<li>الخصائص المخصصة المسجّلة (<code>@property</code>)</li>
<li>الدالة <code>color-mix()</code></li>
</ul>
<h2 id="استخدام-معالجات-css-التقليدية">استخدام معالجات CSS التقليدية</h2>
<p>بما أنك ستسألني كيف تفعل هذا في مرحلة ما، دعني أعالج الأمر الآن. لا تستخدم Sass أو Less أو Stylus مع Tailwind 4.</p>
<h2 id="تطبيق-الأدوات-على-مكونات-عالية-المستوى">تطبيق الأدوات على مكوّنات عالية المستوى</h2>
<p>استخدام مكوّنات منخفضة المستوى ثم بناء واجهتك الأكبر من تلك المكوّنات يجعل إجراء تغييرات أكبر أسرع.</p>
<pre><code class="language-jsx"><span class="hljs-comment">/* ❌ Anti-pattern */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CheckoutForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mx-auto max-w-md rounded-lg bg-white p-8 shadow-md&quot;</span>&gt;</span>
      {/* Complex checkout logic */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<pre><code class="language-jsx"><span class="hljs-comment">/* ✅ Better approach */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Card</span>(<span class="hljs-params">{ children }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mx-auto max-w-md rounded-lg bg-white p-8 shadow-md&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CheckoutForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Card</span>&gt;</span>{/* Complex checkout logic using pre-styled components */}<span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span></span>;
}
</code></pre>
<h2 id="باختصار">باختصار</h2>
<ul>
<li>تبنَّ نهج الأولوية للأدوات في HTML لديك</li>
<li>استخدم تجريد المكوّنات لإعادة الاستخدام</li>
<li>استفد من <code>@theme</code> لرموز تصميم متسقة</li>
<li>استخدم <code>@utility</code> للأدوات المخصصة التي تحتاج إلى دعم المتغيّرات</li>
<li>افهم متطلبات توافق المتصفحات قبل التبنّي</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
