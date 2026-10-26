const s="kinney",a="tailwind",n="Tailwind CSS",l="grid-auto-fit-and-auto-fill-patterns",t="أنماط auto-fit وauto-fill",p=[{depth:2,id:"تحديد-أحجام-المسارات-ديناميكيا-بـauto-fill-وauto-fit",text:"تحديد أحجام المسارات ديناميكيًا بـauto-fill وauto-fit"},{depth:3,id:"فهم-auto-fill-وauto-fit",text:"فهم auto-fill وauto-fit"},{depth:2,id:"تنفيذ-auto-fit-وauto-fill-في-tailwind-css",text:"تنفيذ auto-fit وauto-fill في Tailwind CSS"},{depth:3,id:"استخدام-auto-fill",text:"استخدام auto-fill"},{depth:3,id:"استخدام-auto-fit",text:"استخدام auto-fit"},{depth:3,id:"المرونة-مع-القيم-العشوائية",text:"المرونة مع القيم العشوائية"},{depth:3,id:"القيم-العشوائية-والاختصار-الخاص-بمتغيرات-css",text:"القيم العشوائية والاختصار الخاص بمتغيّرات CSS"},{depth:3,id:"الدعم-في-المحرر",text:"الدعم في المحرّر"}],e=`<p>يتيح Tailwind CSS تحكمًا دقيقًا في تخطيطات الشبكة. ورغم أن أعداد الأعمدة الثابتة (<code>grid-cols-4</code>) والشبكات الفرعية (<code>grid-cols-subgrid</code>) مفيدة، فإن بعض التصاميم تحتاج إلى شبكات تعدّل عدد الأعمدة تلقائيًا بحسب المساحة المتاحة وحجم المحتوى. وهنا تُستخدم نمطا <code>auto-fit</code> و<code>auto-fill</code> في CSS Grid.</p>
<h2 id="تحديد-أحجام-المسارات-ديناميكيا-بـauto-fill-وauto-fit">تحديد أحجام المسارات ديناميكيًا بـ<code>auto-fill</code> و<code>auto-fit</code></h2>
<p>تعرّف دالة <code>repeat()</code> في CSS Grid، مع الكلمتين المفتاحيتين <code>auto-fill</code> و<code>auto-fit</code>، قوائم مسارات ديناميكية. وبخلاف أعداد الأعمدة الثابتة (مثل <code>repeat(4, 1fr)</code>)، تنشئ هاتان الكلمتان بقدر ما يتّسع في الحاوية من أعمدة، انطلاقًا من حجم مسار محدّد.</p>
<h3 id="فهم-auto-fill-وauto-fit">فهم <code>auto-fill</code> و<code>auto-fit</code></h3>
<ul>
<li><strong><code>auto-fill</code></strong>: يملأ الصف بقدر ما يتّسع من أعمدة. تبقى المساحة المتبقّية فارغة، لكن المسارات تُنشأ، وقد ينتج عن ذلك أعمدة فارغة إذا لم تملأها العناصر.</li>
<li><strong><code>auto-fit</code></strong>: يشبه <code>auto-fill</code>، لكنه بعد وضع العناصر يطوي المسارات الفارغة إن تبقّى مساحة. وهذا يسمح للعناصر بالتمدد وملء عرض الحاوية، حتى مع وجود عناصر أقل من الحد الأقصى الممكن للمسارات.</li>
</ul>
<p>يُستخدم كلاهما غالبًا مع <code>minmax(&lt;min&gt;, &lt;max&gt;)</code> لتحديد أحجام المسارات. والنمط الشائع هو <code>minmax(&lt;min-width&gt;, 1fr)</code>، إذ ينشئ مسارات عرضها <code>&lt;min-width&gt;</code> على الأقل، وهي تنمو لتتقاسم المساحة المتبقّية بالتساوي (<code>1fr</code>).</p>
<h2 id="تنفيذ-auto-fit-وauto-fill-في-tailwind-css">تنفيذ auto-fit وauto-fill في Tailwind CSS</h2>
<p>لا توفّر Tailwind أدوات مخصّصة باسم <code>grid-cols-auto-fit</code> أو <code>grid-cols-auto-fill</code>. لكنها تدعم قيم CSS المخصّصة عبر صيغة القيم العشوائية: <code>grid-cols-[&lt;value&gt;]</code> و<code>grid-rows-[&lt;value&gt;]</code>.</p>
<pre><code class="language-css"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--min-col-width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attr">--auto-grid-cols</span>: <span class="hljs-built_in">repeat</span>(auto-fit, <span class="hljs-built_in">minmax</span>(<span class="hljs-number">250px</span>, <span class="hljs-number">1</span>fr));
}
</code></pre>
<p>تتيح هذه الصيغة استخدام <code>repeat()</code> الأصلية في CSS مع <code>auto-fill</code> أو <code>auto-fit</code>.</p>
<h3 id="استخدام-auto-fill">استخدام <code>auto-fill</code></h3>
<p>لإنشاء شبكة تملأ المساحة بالعناصر، مع احتمال ترك مساحة فارغة:</p>
<p><em>استخدام auto-fill — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/ec1556997fec643c62c42dcdb6bd10350dd5b9a63280d7efd68e6beeded64896.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-yellow-200 p-4&quot;</span>&gt;</span>Item 4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-purple-200 p-4&quot;</span>&gt;</span>Item 5<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يصبح <code>grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]</code> هو <code>grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));</code>. ويكون عرض الأعمدة <code>200px</code> على الأقل، وهي تنمو لتملأ المساحة. وقد تترك العناصر الأقل من عدد الأعمدة المتّسع لها فجوات بصرية.</p>
<h3 id="استخدام-auto-fit">استخدام <code>auto-fit</code></h3>
<p>للشبكات التي تتمدّد فيها العناصر لتملأ عرض الحاوية عبر طي المسارات الفارغة:</p>
<p><em>استخدام auto-fit — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/9ffc3c243e73418cc2a55e0e25101abc7aa2ee4c1a541fd7cf093d16dbe70ddf.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- If fewer items, they may span full width --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يصبح <code>grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]</code> هو <code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));</code>. وإذا لم تتّسع عدد أقل من العناصر عند العرض الأدنى، فإن <code>auto-fit</code> يطوي المسارات غير المستخدمة، ما يتيح للعناصر القائمة أن تنمو. وهو مفيد للبطاقات أو المعارض المستجيبة.</p>
<h3 id="المرونة-مع-القيم-العشوائية">المرونة مع القيم العشوائية</h3>
<p>عرّف قيم <code>minmax</code> بأي وحدة في CSS أو متغيّرات CSS.</p>
<p><em>المرونة مع القيم العشوائية — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/b95e3ff4811bb0c88e936daa0f7ec74ac93810346a0d17c3ddd3f1e346d404ac.html">افتح المثال</a><a href="#playground-css-grid-vars">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-[repeat(auto-fit,_minmax(var(--min-col-width),_1fr))] gap-4 rounded-lg bg-gray-100 p-4&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>Dynamic Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>Dynamic Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>Dynamic Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يتيح هذا التحكم الديناميكي في الحد الأدنى لعرض العمود عبر متغيّرات CSS (المضبوطة في CSS أو في <code>@theme</code> الخاص بـTailwind 4+).</p>
<h3 id="القيم-العشوائية-والاختصار-الخاص-بمتغيرات-css">القيم العشوائية والاختصار الخاص بمتغيّرات CSS</h3>
<p>تقدّم Tailwind الاختصار <code>grid-cols-(&lt;custom-property&gt;)</code> للقيم العشوائية التي هي متغيّرات CSS فحسب. فإذا احتوى متغيّر CSS على دالة <code>repeat()</code> كاملة، فيمكن استخدام هذا الاختصار.</p>
<pre><code class="language-css"><span class="hljs-comment">/* In main CSS, potentially within @theme */</span>
<span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--auto-grid-cols</span>: <span class="hljs-built_in">repeat</span>(auto-fit, <span class="hljs-built_in">minmax</span>(<span class="hljs-number">250px</span>, <span class="hljs-number">1</span>fr));
}
</code></pre>
<p><em>القيم العشوائية والاختصار الخاص بمتغيّرات CSS — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/9c81b8417b82f54365c20909b494c5e336d708732f5c989b7df9ac005ab275ab.html">افتح المثال</a><a href="#playground-css-grid-vars">CSS</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;grid grid-cols-(--auto-grid-cols) gap-4 rounded-lg bg-gray-100 p-4&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-blue-200 p-4&quot;</span>&gt;</span>CSS Variable Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-red-200 p-4&quot;</span>&gt;</span>CSS Variable Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;rounded bg-green-200 p-4&quot;</span>&gt;</span>CSS Variable Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>يعتمد هذا على وجود <code>--auto-grid-cols</code> معرَّفًا،ربما في سمة Tailwind لديك عبر <code>@theme</code>. وتصبح متغيّرات السمة متغيّرات CSS عادية.</p>
<h3 id="الدعم-في-المحرر">الدعم في المحرّر</h3>
<p>يساعدك امتداد Tailwind CSS IntelliSense لـVS Code مع تعريفات الشبكات العشوائية المعقّدة، إذ يوفّر الإكمال التلقائي وتلوين الصياغة ومعاينات عند التحويم.</p>
<p>خلاصةً، ورغم أن Tailwind لا يملك أصناف <code>auto-fit</code> أو <code>auto-fill</code> صريحة، فإن صيغة القيم العشوائية في <code>grid-cols</code> و<code>grid-rows</code> تتيح استخدام أنماط CSS Grid الأصلية هذه لتخطيطات ديناميكية ومستجيبة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
