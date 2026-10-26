const s="kinney",a="react-typescript",n="React مع TypeScript",l="utility-types-in-practice",t="أنواع الأدوات في التطبيق العملي",p=[{depth:2,id:"المشكلة-مع-الأنواع-الجامدة",text:"المشكلة مع الأنواع الجامدة"},{depth:2,id:"ولأنواع-الأدوات-موضعها",text:"ولأنواع الأدوات موضعها"},{depth:2,id:"partial-جعل-كل-شيء-اختياريا",text:"Partial: جعل كل شيء اختياريًا"},{depth:3,id:"تحديثات-الحالة-بتصميم-بسيط",text:"تحديثات الحالة بتصميم بسيط"},{depth:3,id:"كائنات-الإعداد",text:"كائنات الإعداد"},{depth:2,id:"pick-اختيار-ما-تحتاجه",text:"Pick: اختيار ما تحتاجه"},{depth:3,id:"مكونات-البطاقات-ببيانات-مرنة",text:"مكوّنات البطاقات ببيانات مرنة"},{depth:3,id:"مكونات-حقول-النماذج",text:"مكوّنات حقول النماذج"},{depth:2,id:"omit-استبعاد-ما-لا-تريده",text:"Omit: استبعاد ما لا تريده"},{depth:3,id:"خصائص-المكونات-العامة-مقابل-الخاصة",text:"خصائص المكوّنات العامة مقابل الخاصة"},{depth:3,id:"إزالة-الخصائص-المتعارضة",text:"إزالة الخصائص المتعارضة"},{depth:2,id:"record-إنشاء-أنواع-الفهرسة",text:"Record: إنشاء أنواع الفهرسة"},{depth:3,id:"حالة-نموذج-ديناميكية",text:"حالة نموذج ديناميكية"},{depth:3,id:"حالة-المكونات-حسب-المعرف",text:"حالة المكوّنات حسب المعرّف"},{depth:2,id:"دمج-أنواع-الأدوات",text:"دمج أنواع الأدوات"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"لا-تبالغ",text:"لا تبالغ"},{depth:3,id:"فكر-في-الأسماء-المستعارة-type-aliases",text:"فكّر في الأسماء المستعارة (type aliases)"},{depth:2,id:"متى-لا-تستخدم-أنواع-الأدوات",text:"متى لا تستخدم أنواع الأدوات"},{depth:2,id:"أنماط-شائعة-ومطبات",text:"أنماط شائعة ومَطبّات"},{depth:3,id:"الدمج-مع-الأنواع-العامة",text:"الدمج مع الأنواع العامة"},{depth:3,id:"انتبه-لتسرب-any",text:"انتبه لتسرّب any"},{depth:2,id:"خلاصة",text:"خلاصة"}],e=`<p>أنواع أدوات TypeScript ليست مجرّد بنيات أكاديميّة فاخرة — إنها أدوات عملية لبناء مكوّنات React أنظف وأسهل في الصيانة. فاستخدامها بعناية يُمكِّن <code>Partial</code> و<code>Pick</code> و<code>Omit</code> و<code>Record</code> من تحويل واجهات خصائص فوضوية وإدارة حالة معقّدة إلى واجهات أنيقة آمنة من حيث الأنواع تجعل العمل مع مكوّناتك متعةً.</p>
<p>لنستكشف كيف تحلّ أنواع الأدوات هذه مشكلات العالم الحقيقي™ في تطبيقات React، من تبسيط تحديثات الحالة إلى إنشاء واجهات مكوّنات مرنة دون شيفرة متكرّرة.</p>
<h2 id="المشكلة-مع-الأنواع-الجامدة">المشكلة مع الأنواع الجامدة</h2>
<p>تأمّل هذا المشهد الشائع: أنت تبني نموذج ملف تعريف مستخدم يحتاج إلى التعامل مع تحديثات جزئية. ودون أنواع الأدوات، قد تنتهي إلى فوضى كهذه:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Brittle and verbose</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">avatar</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserUpdateProps</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">role</span>?: <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span>;
  <span class="hljs-comment">// createdAt intentionally omitted - shouldn&#x27;t be updatable</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfileForm</span>(<span class="hljs-params">{
  user,
  onUpdate,
}: {
  user: User;
  onUpdate: (updates: UserUpdateProps) =&gt; <span class="hljs-built_in">void</span>;
}</span>) {
  <span class="hljs-comment">// Component implementation...</span>
}
</code></pre>
<p>ولهذا النهج عدّة مشكلات:</p>
<ul>
<li><strong>التكرار</strong>: أنت تحافظ على الحقول نفسها في مواضع متعدّدة</li>
<li><strong>خطر الانحراف</strong>: حين يتغيّر <code>User</code>، قد تنسى تحديث <code>UserUpdateProps</code></li>
<li><strong>الاستثناءات اليدوية</strong>: عليك أن تتذكّر أيّ الحقول لا يجوز تحديثها</li>
</ul>
<h2 id="ولأنواع-الأدوات-موضعها">ولأنواع الأدوات موضعها</h2>
<p>تحلّ أنواع الأدوات هذه المشكلات عبر تحويل الأنواع القائمة بدلًا من تكرارها. وإليك المثال نفسه بعد التنظيف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Clean and maintainable</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">avatar</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-comment">// Derive types instead of duplicating them</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserUpdate</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;avatar&#x27;</span> | <span class="hljs-string">&#x27;role&#x27;</span>&gt;&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfileForm</span>(<span class="hljs-params">{ user, onUpdate }: { user: User; onUpdate: (updates: UserUpdate) =&gt; <span class="hljs-built_in">void</span> }</span>) {
  <span class="hljs-comment">// Component implementation...</span>
}
</code></pre>
<p>أصبح لديك الآن مصدر واحد موثوق لشكل المستخدم، ويبقى نوع التحديث لديك متزامنًا معه تلقائيًا.</p>
<h2 id="partial-جعل-كل-شيء-اختياريا">Partial: جعل كل شيء اختياريًا</h2>
<p>يجعل <code>Partial&lt;T&gt;</code> جميع الخصائص في <code>T</code> اختيارية، وهو مثالي لتحديثات الحالة وكائنات الإعداد.</p>
<h3 id="تحديثات-الحالة-بتصميم-بسيط">تحديثات الحالة بتصميم بسيط</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormState</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">confirmPassword</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useFormState</span>(<span class="hljs-params"><span class="hljs-attr">initialState</span>: <span class="hljs-title class_">FormState</span></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">FormState</span>&gt;(initialState);

  <span class="hljs-comment">// ✅ Accept partial updates without defining a separate interface</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateState</span> = (<span class="hljs-params"><span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">FormState</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">current</span>) =&gt;</span> ({ ...current, ...updates }));
  };

  <span class="hljs-keyword">return</span> { state, updateState };
}

<span class="hljs-comment">// Usage is clean and type-safe</span>
<span class="hljs-keyword">const</span> { state, updateState } = <span class="hljs-title function_">useFormState</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  <span class="hljs-attr">confirmPassword</span>: <span class="hljs-string">&#x27;&#x27;</span>,
});

<span class="hljs-comment">// All of these work:</span>
<span class="hljs-title function_">updateState</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> });
<span class="hljs-title function_">updateState</span>({ <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;secret&#x27;</span> });
<span class="hljs-title function_">updateState</span>({ <span class="hljs-attr">confirmPassword</span>: <span class="hljs-string">&#x27;secret&#x27;</span> });
</code></pre>
<h3 id="كائنات-الإعداد">كائنات الإعداد</h3>
<p>يتألّق <code>Partial</code> عند بناء واجهات إعدادات مرنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ChartConfig</span> {
  <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">backgroundColor</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">showLegend</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">animationDuration</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">defaultConfig</span>: <span class="hljs-title class_">ChartConfig</span> = {
  <span class="hljs-attr">width</span>: <span class="hljs-number">800</span>,
  <span class="hljs-attr">height</span>: <span class="hljs-number">400</span>,
  <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;#ffffff&#x27;</span>,
  <span class="hljs-attr">showLegend</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">animationDuration</span>: <span class="hljs-number">300</span>
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Chart</span>(<span class="hljs-params">{ config = {} }: { config?: Partial&lt;ChartConfig&gt; }</span>) {
  <span class="hljs-keyword">const</span> finalConfig = { ...defaultConfig, ...config };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">width:</span> <span class="hljs-attr">finalConfig.width</span>,
        <span class="hljs-attr">height:</span> <span class="hljs-attr">finalConfig.height</span>,
        <span class="hljs-attr">backgroundColor:</span> <span class="hljs-attr">finalConfig.backgroundColor</span>
      }}
    &gt;</span>
      {/* Chart implementation */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage is flexible and self-documenting</span>
&lt;<span class="hljs-title class_">Chart</span> config={{ <span class="hljs-attr">width</span>: <span class="hljs-number">600</span>, <span class="hljs-attr">showLegend</span>: <span class="hljs-literal">false</span> }} /&gt;
</code></pre>
<h2 id="pick-اختيار-ما-تحتاجه">Pick: اختيار ما تحتاجه</h2>
<p>ينشئ <code>Pick&lt;T, K&gt;</code> نوعًا جديدًا عبر انتقاء الخصائص المحدّدة فقط من <code>T</code>. وهو مثالي لخصائص المكوّنات التي تحتاج مجرّد مجموعة جزئية من واجهة أكبر.</p>
<h3 id="مكونات-البطاقات-ببيانات-مرنة">مكوّنات البطاقات ببيانات مرنة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Article</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">excerpt</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">author</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">avatar</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">publishedAt</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">tags</span>: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">readTime</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// ✅ Different components need different slices of the same data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ArticleCard</span>(<span class="hljs-params">{ article }: {
  article: Pick&lt;Article, <span class="hljs-string">&#x27;title&#x27;</span> | <span class="hljs-string">&#x27;excerpt&#x27;</span> | <span class="hljs-string">&#x27;author&#x27;</span> | <span class="hljs-string">&#x27;publishedAt&#x27;</span>&gt;
}</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;article-card&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{article.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{article.excerpt}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;meta&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{article.author.name}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">time</span>&gt;</span>{article.publishedAt.toLocaleDateString()}<span class="hljs-tag">&lt;/<span class="hljs-name">time</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ArticlePreview</span>(<span class="hljs-params">{ article }: {
  article: Pick&lt;Article, <span class="hljs-string">&#x27;title&#x27;</span> | <span class="hljs-string">&#x27;readTime&#x27;</span> | <span class="hljs-string">&#x27;tags&#x27;</span>&gt;
}</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;article-preview&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>{article.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;tags&quot;</span>&gt;</span>
        {article.tags.map(tag =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{tag}</span>&gt;</span>{tag}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;read-time&quot;</span>&gt;</span>{article.readTime} min read<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="مكونات-حقول-النماذج">مكوّنات حقول النماذج</h3>
<p>ممتاز <code>Pick</code> لإنشاء مكوّنات نماذج قابلة لإعادة الاستخدام تعمل مع أشكال بيانات مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">role</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">department</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">startDate</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Product</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">description</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">category</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// ✅ Generic name field that works with any object that has a name</span>
<span class="hljs-keyword">function</span> <span class="hljs-title class_">NameField</span>&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> }&gt;({
  item,
  onChange
}: {
  <span class="hljs-attr">item</span>: <span class="hljs-title class_">Pick</span>&lt;T, <span class="hljs-string">&#x27;name&#x27;</span>&gt;;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{item.name}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(e.target.value)}
      placeholder=&quot;Enter name&quot;
    /&gt;</span>
  );
}

<span class="hljs-comment">// Works with both User and Product</span>
&lt;<span class="hljs-title class_">NameField</span> item={user} onChange={<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> <span class="hljs-title function_">updateUser</span>({ name })} /&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">NameField</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{product}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(name)</span> =&gt;</span> updateProduct({ name })} /&gt;</span>
</code></pre>
<h2 id="omit-استبعاد-ما-لا-تريده">Omit: استبعاد ما لا تريده</h2>
<p>ينشئ <code>Omit&lt;T, K&gt;</code> نوعًا جديدًا عبر استبعاد الخصائص المحدّدة من <code>T</code>. وهو عكس <code>Pick</code> ومثالي لإنشاء واجهات عامة انطلاقًا من أنواع داخلية.</p>
<h3 id="خصائص-المكونات-العامة-مقابل-الخاصة">خصائص المكوّنات العامة مقابل الخاصة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">InternalButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">// Internal props that consumers shouldn&#x27;t set</span>
  <span class="hljs-attr">_testId</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">_analyticsEvent</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// ✅ Clean public API that hides internal concerns</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">InternalButtonProps</span>, <span class="hljs-string">&#x27;_testId&#x27;</span> | <span class="hljs-string">&#x27;_analyticsEvent&#x27;</span>&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">internalProps</span>: <span class="hljs-title class_">InternalButtonProps</span> = {
    ...props,
    <span class="hljs-attr">_testId</span>: <span class="hljs-string">\`button-<span class="hljs-subst">\${props.variant}</span>\`</span>,
    <span class="hljs-attr">_analyticsEvent</span>: <span class="hljs-string">\`button_click_<span class="hljs-subst">\${props.variant}</span>\`</span>
  };

  <span class="hljs-comment">// Implementation uses internal props</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...internalProps</span>} /&gt;</span></span>;
}
</code></pre>
<h3 id="إزالة-الخصائص-المتعارضة">إزالة الخصائص المتعارضة</h3>
<p>أحيانًا تحتاج إلى تغليف عنصر أصلي لكن مع التحكّم في سلوكيات معيّنة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Input that manages its own value but accepts all other input props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ControlledInputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;
  <span class="hljs-title class_">React</span>.<span class="hljs-title class_">InputHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;,
  &#x27;value&#x27; | &#x27;onChange&#x27;
&gt; {
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ControlledInput</span>(<span class="hljs-params">{ value, onChange, ...inputProps }: <span class="hljs-title class_">ControlledInputProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      {<span class="hljs-attr">...inputProps</span>}
      <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(e.target.value)}
    /&gt;</span>
  );
}

<span class="hljs-comment">// TypeScript prevents you from passing conflicting props</span>
&lt;<span class="hljs-title class_">ControlledInput</span>
  value={inputValue}
  onChange={setInputValue}
  placeholder=<span class="hljs-string">&quot;Type here...&quot;</span>
  <span class="hljs-comment">// value={someOtherValue}  // ❌ TypeScript error - good!</span>
/&gt;
</code></pre>
<h2 id="record-إنشاء-أنواع-الفهرسة">Record: إنشاء أنواع الفهرسة</h2>
<p>ينشئ <code>Record&lt;K, T&gt;</code> نوع كائن بمفاتيح من النوع <code>K</code> وقيم من النوع <code>T</code>. وهو مثالي للقاموس وجداول البحث والحالة التي تُفهرَس بقيم ديناميكية.</p>
<h3 id="حالة-نموذج-ديناميكية">حالة نموذج ديناميكية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Type-safe form state for dynamic fields</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormField</span> {
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">touched</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DynamicForm</span>(<span class="hljs-params">{ fieldNames }: { fieldNames: <span class="hljs-built_in">string</span>[] }</span>) {
  <span class="hljs-keyword">const</span> [fields, setFields] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">FormField</span>&gt;&gt;(<span class="hljs-function">() =&gt;</span>
    fieldNames.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">acc, name</span>) =&gt;</span> ({
      ...acc,
      [name]: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">touched</span>: <span class="hljs-literal">false</span> }
    }), {})
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateField</span> = (<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">FormField</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">setFields</span>(<span class="hljs-function"><span class="hljs-params">current</span> =&gt;</span> ({
      ...current,
      [name]: { ...current[name], ...updates }
    }));
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      {fieldNames.map(name =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{name}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">value</span>=<span class="hljs-string">{fields[name]?.value</span> || &#x27;&#x27;}
            <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateField(name, {
              value: e.target.value,
              touched: true
            })}
          /&gt;
          {fields[name]?.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{fields[name].error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="حالة-المكونات-حسب-المعرف">حالة المكوّنات حسب المعرّف</h3>
<p>إدارة المجموعات التي تحتاج فيها إلى عمليات بحث سريعة بالمعرّف:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserListState</span> {
  <span class="hljs-attr">users</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">User</span>&gt;;
  <span class="hljs-attr">loading</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">boolean</span>&gt;;
  <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useUserList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">UserListState</span>&gt;({
    <span class="hljs-attr">users</span>: {},
    <span class="hljs-attr">loading</span>: {},
    <span class="hljs-attr">errors</span>: {},
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadUser</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">current</span>) =&gt;</span> ({
      ...current,
      <span class="hljs-attr">loading</span>: { ...current.<span class="hljs-property">loading</span>, [id]: <span class="hljs-literal">true</span> },
      <span class="hljs-attr">errors</span>: { ...current.<span class="hljs-property">errors</span>, [id]: <span class="hljs-literal">null</span> },
    }));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>(id);
      <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">current</span>) =&gt;</span> ({
        ...current,
        <span class="hljs-attr">users</span>: { ...current.<span class="hljs-property">users</span>, [id]: user },
        <span class="hljs-attr">loading</span>: { ...current.<span class="hljs-property">loading</span>, [id]: <span class="hljs-literal">false</span> },
      }));
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">current</span>) =&gt;</span> ({
        ...current,
        <span class="hljs-attr">loading</span>: { ...current.<span class="hljs-property">loading</span>, [id]: <span class="hljs-literal">false</span> },
        <span class="hljs-attr">errors</span>: { ...current.<span class="hljs-property">errors</span>, [id]: error.<span class="hljs-property">message</span> },
      }));
    }
  };

  <span class="hljs-keyword">return</span> { state, loadUser };
}
</code></pre>
<h2 id="دمج-أنواع-الأدوات">دمج أنواع الأدوات</h2>
<p>القوة الحقيقية تكمن في دمج أنواع الأدوات لإنشاء الواجهات التي تحتاجها بالضبط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">updatedAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-comment">// ✅ Compose utility types for different use cases</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserCreateRequest</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;createdAt&#x27;</span> | <span class="hljs-string">&#x27;updatedAt&#x27;</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserUpdateRequest</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;role&#x27;</span>&gt;&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserResponse</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;password&#x27;</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserSummary</span> = <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;role&#x27;</span>&gt;;

<span class="hljs-comment">// Clean, expressive component APIs</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CreateUserForm</span>(<span class="hljs-params">{ onSubmit }: { onSubmit: (user: UserCreateRequest) =&gt; <span class="hljs-built_in">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; }</span>) {
  <span class="hljs-comment">// Form implementation</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">EditUserForm</span>(<span class="hljs-params">{
  user,
  onUpdate,
}: {
  user: UserResponse;
  onUpdate: (updates: UserUpdateRequest) =&gt; <span class="hljs-built_in">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
}</span>) {
  <span class="hljs-comment">// Edit form implementation</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params">{ users }: { users: UserSummary[] }</span>) {
  <span class="hljs-comment">// List implementation</span>
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>تحدث أنواع الأدوات وقت التصريف — فهي لا تضيف أي عبء في وقت التشغيل. لكن هناك أمور ينبغي إبقاءها في الحسبان:</p>
<h3 id="لا-تبالغ">لا تبالغ</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Overly complex - hard to understand and debug</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ComplexType</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;password&#x27;</span>&gt;, <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span>&gt;&gt; &amp;
  <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;;

<span class="hljs-comment">// ✅ Break it down into named intermediate types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PublicUser</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;password&#x27;</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">EditableFields</span> = <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">PublicUser</span>, <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserUpdate</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">EditableFields</span>&gt;;
</code></pre>
<h3 id="فكر-في-الأسماء-المستعارة-type-aliases">فكّر في الأسماء المستعارة (type aliases)</h3>
<p>للتوليفات المستخدَمة كثيرًا، أنشئ أسماءً مستعارة مسمّاة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Clear, reusable type aliases</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CreateRequest</span>&lt;T&gt; = <span class="hljs-title class_">Omit</span>&lt;T, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;createdAt&#x27;</span> | <span class="hljs-string">&#x27;updatedAt&#x27;</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UpdateRequest</span>&lt;T&gt; = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;T, keyof <span class="hljs-title class_">Omit</span>&lt;T, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;createdAt&#x27;</span> | <span class="hljs-string">&#x27;updatedAt&#x27;</span>&gt;&gt;&gt;;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserCreate</span> = <span class="hljs-title class_">CreateRequest</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserUpdate</span> = <span class="hljs-title class_">UpdateRequest</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ProductCreate</span> = <span class="hljs-title class_">CreateRequest</span>&lt;<span class="hljs-title class_">Product</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ProductUpdate</span> = <span class="hljs-title class_">UpdateRequest</span>&lt;<span class="hljs-title class_">Product</span>&gt;;
</code></pre>
<h2 id="متى-لا-تستخدم-أنواع-الأدوات">متى لا تستخدم أنواع الأدوات</h2>
<p>ليست أنواع الأدوات هي الحلّ دائمًا. أحيانًا تكون الواجهات الصريحة أوضح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Over-engineered for a simple case</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">HTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;, <span class="hljs-string">&#x27;onClick&#x27;</span> | <span class="hljs-string">&#x27;disabled&#x27;</span>&gt; &amp; {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
};

<span class="hljs-comment">// ✅ Just be explicit when it&#x27;s simple</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
}
</code></pre>
<p>استخدم أنواع الأدوات حين تقضي على التكرار أو تعبّر عن علاقات بين الأنواع. واستخدم الواجهات الصريحة حين يكون النوع بسيطًا أو حين يتفوّق الوضوح على الذكاء.</p>
<h2 id="أنماط-شائعة-ومطبات">أنماط شائعة ومَطبّات</h2>
<h3 id="الدمج-مع-الأنواع-العامة">الدمج مع الأنواع العامة</h3>
<p>تعمل أنواع الأدوات بسلاسة مع المكوّنات ذات الأنواع العامة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResource</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">updatedAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ApiResource</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Product</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ApiResource</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// ✅ Generic CRUD component that works with any resource</span>
<span class="hljs-keyword">function</span> <span class="hljs-title class_">ResourceForm</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ApiResource</span>&gt;({
  resource,
  onUpdate,
}: {
  <span class="hljs-attr">resource</span>?: T;
  <span class="hljs-attr">onUpdate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Omit</span>&lt;T, keyof <span class="hljs-title class_">ApiResource</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}) {
  <span class="hljs-comment">// Form handles any resource type safely</span>
}
</code></pre>
<h3 id="انتبه-لتسرب-any">انتبه لتسرّب <code>any</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Record with any loses type safety</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt; = {};

<span class="hljs-comment">// ✅ Be specific about what you&#x27;re storing</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">state</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, { <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span> }&gt; = {};
</code></pre>
<h2 id="خلاصة">خلاصة</h2>
<p>تغيّر أنواع الأدوات طريقة تفكيرك في واجهات المكوّنات في React. فبدلًا من تكرار الواجهات أو إنشاء أنواع خصائص متساهلة أكثر من اللازم، يمكنك اشتقاق ما تحتاجه بالضبط من أشكال بياناتك الأساسية.</p>
<p>المفتاح هو استخدامها بوعي استراتيجي:</p>
<ul>
<li><strong><code>Partial</code></strong> للتحديثات الاختيارية والإعدادات المرنة</li>
<li><strong><code>Pick</code></strong> حين تحتاج المكوّنات أجزاء محدّدة من أنواع أكبر</li>
<li><strong><code>Omit</code></strong> لإنشاء واجهات عامة نظيفة انطلاقًا من الأنواع الداخلية</li>
<li><strong><code>Record</code></strong> لبنية البيانات الديناميكية المُفهرَسة</li>
</ul>
<p>ابدأ ببساطة، وركّب بعناية، وأعطِ الأولوية دائمًا للوضوح على الذكاء. وسيشكرك نفسك في المستقبل (وزملاؤك) على واجهات تعبّر عن النية بوضوح وتبقى متزامنة تلقائيًا.</p>
<p><strong>التالي</strong>: <a href="https://stevekinney.com/courses/react-typescript/advanced-type-tricks-for-react">حِيَل الأنواع المتقدّمة في React</a></p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
