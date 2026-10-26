const s="kinney",a="react-typescript",n="React مع TypeScript",l="component-props-complete-guide",t="خصائص مكوّنات React",p=[{depth:2,id:"الأساس-الخصائص-المطلوبة-مقابل-الاختيارية",text:"الأساس: الخصائص المطلوبة مقابل الاختيارية"},{depth:2,id:"توفير-قيم-افتراضية-مناسبة",text:"توفير قيم افتراضية مناسبة"},{depth:2,id:"خصائص-الأنواع-الأولية-لبنات-البناء",text:"خصائص الأنواع الأولية: لبنات البناء"},{depth:2,id:"خصائص-المصفوفات-المجموعات-والقوائم",text:"خصائص المصفوفات: المجموعات والقوائم"},{depth:2,id:"خصائص-الكائنات-بنى-بيانات-معقدة",text:"خصائص الكائنات: بنى بيانات معقّدة"},{depth:2,id:"خصائص-الدوال-الاستدعاءات-ومعالجات-الأحداث",text:"خصائص الدوال: الاستدعاءات ومعالِجات الأحداث"},{depth:2,id:"خصائص-شرطية-مع-الأنواع-الاتحادية-المميزة",text:"خصائص شرطية مع الأنواع الاتحادية المُميَّزة"},{depth:2,id:"الخصائص-العامة-للمكونات-القابلة-لإعادة-الاستخدام",text:"الخصائص العامة للمكوّنات القابلة لإعادة الاستخدام"},{depth:2,id:"توسيع-خصائص-عناصر-html",text:"توسيع خصائص عناصر HTML"},{depth:2,id:"أنواع-المساعدات-المدمجة-في-react",text:"أنواع المساعدات المدمجة في React"},{depth:3,id:"propswithchildren-مساعد-العناصر-الفرعية",text:"PropsWithChildren: مساعد العناصر الفرعية"},{depth:3,id:"propswithoutchildren-الورقة-الصريحة",text:"PropsWithoutChildren: الورقة الصريحة"},{depth:3,id:"refattributes-مراجع-آمنة-من-ناحية-الأنواع",text:"RefAttributes: مراجع آمنة من ناحية الأنواع"},{depth:3,id:"دمج-أنواع-المساعدين-أنماط-من-العالم-الحقيقي",text:"دمج أنواع المساعدين: أنماط من العالم الحقيقي"},{depth:3,id:"أنواع-المساعدين-مقابل-التعريفات-اليدوية",text:"أنواع المساعدين مقابل التعريفات اليدوية"},{depth:2,id:"توثيق-الخصائص-عبر-jsdoc",text:"توثيق الخصائص عبر JSDoc"},{depth:2,id:"الأنماط-الشائعة-والأنماط-المضادة",text:"الأنماط الشائعة والأنماط المضادة"},{depth:3,id:"الأنماط-الجيدة",text:"✅ الأنماط الجيدة"},{depth:3,id:"الأنماط-المضادة-التي-ينبغي-تجنبها",text:"❌ الأنماط المضادة التي ينبغي تجنّبها"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],e=`<p>الخصائص هي واجهة البرمجة (API) لمكوّنات React — فهي الطريقة التي سيتفاعل بها المطوّرون الآخرون (ومنهم أنت في المستقبل) مع ما بنيته. والحصول على الأنواع الصحيحة ليس مجرد تجنّب أخطاء وقت التشغيل، بل هو إنشاء مكوّنات سهلة الاستخدام، تشرح نفسها، ولا يمكن إساءة استخدامها.</p>
<p>أنواع الخصائص الجيدة تحكي قصة عن كيفية استخدام المكوّن. فهي تجعل المسار السعيد واضحًا والمسار الخاطئ مستحيلًا. ويغطي هذا الدليل كل شيء من أنماط الخصائص الأساسية إلى تقنيات الأنواع المتقدمة التي تصنع تجارب مطوّرين ممتعة.</p>
<h2 id="الأساس-الخصائص-المطلوبة-مقابل-الاختيارية">الأساس: الخصائص المطلوبة مقابل الاختيارية</h2>
<p>أهم قرار يخص أي خاصية هو: هل هي مطلوبة أم اختيارية؟ يجعل TypeScript هذا التمييز صريحًا، ويستحق التفكير الجاد في ضرورة كل خاصية.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-comment">// Required props - must be provided</span>
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-comment">// Optional props - can be omitted</span>
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;
}

<span class="hljs-comment">// ✅ Good - required props are provided</span>
&lt;<span class="hljs-title class_">Button</span> onClick={<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">alert</span>(<span class="hljs-string">&#x27;clicked&#x27;</span>)}&gt;
  <span class="hljs-title class_">Click</span> me
&lt;/<span class="hljs-title class_">Button</span>&gt;

<span class="hljs-comment">// ❌ Bad - TypeScript error: missing required &#x27;onClick&#x27;</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>
  Click me
<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
</code></pre>
<p>قاعدة الإبهام: اجعل الخصائص مطلوبة حين لا يستطيع المكوّن أن يعمل بدونها فعلًا. وكل ما عدا ذلك ينبغي أن يكون اختياريًا مع قيم افتراضية مناسبة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا وجدت نفسك أمام كثير من الخصائص المطلوبة، فكّر فيما إذا كان مكوّنك يحاول أن يفعل أكثر مما ينبغي. أحيانًا يقسّم المكوّن إلى مكوّنات أصغر محدّدة الغرض يخلق واجهة برمجية أفضل.</p>
</blockquote>
<h2 id="توفير-قيم-افتراضية-مناسبة">توفير قيم افتراضية مناسبة</h2>
<p>يجري سحب <code>defaultProps</code> من React لصالح معاملات ES6 الافتراضية وقيم التفكيك الافتراضية. وهذا الأسلوب أكثر ملاءمة لـ TypeScript ويُبقي قيمك الافتراضية قريبة من مواضع استخدامها.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{
  children,
  onClick,
  variant = <span class="hljs-string">&#x27;primary&#x27;</span>,
  disabled = <span class="hljs-literal">false</span>,
  size = <span class="hljs-string">&#x27;medium&#x27;</span>,
}: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn</span> <span class="hljs-attr">btn--</span>\${<span class="hljs-attr">variant</span>} <span class="hljs-attr">btn--</span>\${<span class="hljs-attr">size</span>}\`}
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>لهذا النمط عدة مزايا:</p>
<ul>
<li><strong>أمان الأنواع</strong>: يعرف TypeScript قيمك الافتراضية وقت الترجمة (compilation)</li>
<li><strong>القرب</strong>: تظهر القيم الافتراضية في المكان نفسه الذي يُعرَّف فيه المكوّن</li>
<li><strong>الأداء</strong>: لا دمج إضافي للخصائص وقت التشغيل</li>
<li><strong>المستقبلية</strong>: تعمل مع مُجمِّع React (React's Compiler) والتحسينات الأخرى</li>
</ul>
<h2 id="خصائص-الأنواع-الأولية-لبنات-البناء">خصائص الأنواع الأولية: لبنات البناء</h2>
<p>يبدأ كل مكوّن React بخصائص من الأنواع الأولية — نصوصًا وأرقامًا وقيمًا منطقية. هذه هي خبزك وخيرك، لكن حتى الأنواع الأولية البسيطة تستفيد من كتابة أنواع بعناية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AlertProps</span> {
  <span class="hljs-comment">// String literals are often better than plain strings</span>
  <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;warning&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span> | <span class="hljs-string">&#x27;info&#x27;</span>;

  <span class="hljs-comment">// Numbers with constraints tell a story</span>
  <span class="hljs-attr">timeout</span>?: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// milliseconds</span>

  <span class="hljs-comment">// Booleans for toggles and states</span>
  <span class="hljs-attr">dismissible</span>?: <span class="hljs-built_in">boolean</span>;

  <span class="hljs-comment">// Sometimes strings need constraints too</span>
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Alert</span>(<span class="hljs-params">{
  variant,
  timeout = <span class="hljs-number">5000</span>,
  dismissible = <span class="hljs-literal">true</span>,
  title
}: <span class="hljs-title class_">AlertProps</span></span>) {
  <span class="hljs-comment">// TypeScript knows variant is one of four specific strings</span>
  <span class="hljs-keyword">const</span> iconName = variant === <span class="hljs-string">&#x27;success&#x27;</span> ? <span class="hljs-string">&#x27;check&#x27;</span> : <span class="hljs-string">&#x27;alert&#x27;</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">alert</span> <span class="hljs-attr">alert--</span>\${<span class="hljs-attr">variant</span>}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      {dismissible &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>×<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="خصائص-المصفوفات-المجموعات-والقوائم">خصائص المصفوفات: المجموعات والقوائم</h2>
<p>المصفوفات في كل مكان في React — قوائم عناصر ومجموعات خيارات ومجموعات بيانات. والمفتاح هو كتابة نوع بنية المصفوفة ومحتوياتها بدقّة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Simple array of primitives</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TagListProps</span> {
  <span class="hljs-attr">tags</span>: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-comment">// Array of objects with consistent shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserListProps</span> {
  <span class="hljs-attr">users</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
  }[];
}

<span class="hljs-comment">// Array with discriminated unions</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">NotificationProps</span> {
  <span class="hljs-attr">notifications</span>: <span class="hljs-title class_">Array</span>&lt;
    | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;message&#x27;</span>; <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">sender</span>: <span class="hljs-built_in">string</span> }
    | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;system&#x27;</span>; <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">level</span>: <span class="hljs-string">&#x27;info&#x27;</span> | <span class="hljs-string">&#x27;warning&#x27;</span> }
    | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">code</span>?: <span class="hljs-built_in">string</span> }
  &gt;;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">NotificationList</span>(<span class="hljs-params">{ notifications }: <span class="hljs-title class_">NotificationProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {notifications.map((notification, index) =&gt; {
        // TypeScript knows the shape based on the type discriminant
        if (notification.type === &#x27;message&#x27;) {
          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;notification--message&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>{notification.sender}:<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span> {notification.content}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          );
        }

        if (notification.type === &#x27;system&#x27;) {
          return (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">notification--</span>\${<span class="hljs-attr">notification.level</span>}\`}&gt;</span>
              {notification.content}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          );
        }

        // Must be error type
        return (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;notification--error&quot;</span>&gt;</span>
            Error {notification.code}: {notification.content}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="خصائص-الكائنات-بنى-بيانات-معقدة">خصائص الكائنات: بنى بيانات معقّدة</h2>
<p>تتطلب خصائص الكائنات تفكيرًا دقيقًا. أحيانًا تحتاج إلى بنى صارمة، وأحيانًا أخرى تكون المرونة هي المفتاح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Strict object shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ConfigProps</span> {
  <span class="hljs-attr">settings</span>: {
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span> | <span class="hljs-string">&#x27;auto&#x27;</span>;
    <span class="hljs-attr">language</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">notifications</span>: {
      <span class="hljs-attr">email</span>: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">push</span>: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">sms</span>: <span class="hljs-built_in">boolean</span>;
    };
  };
}

<span class="hljs-comment">// Flexible with index signatures</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataTableProps</span> {
  <span class="hljs-attr">columns</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">width</span>?: <span class="hljs-built_in">number</span>;
  }&gt;;
  <span class="hljs-comment">// Flexible row data</span>
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>;
    [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">any</span>; <span class="hljs-comment">// Allow any additional properties</span>
  }&gt;;
}

<span class="hljs-comment">// Nested with optional properties</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormProps</span> {
  <span class="hljs-attr">initialValues</span>: {
    <span class="hljs-attr">user</span>: {
      <span class="hljs-attr">firstName</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">lastName</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">address</span>?: {
        <span class="hljs-attr">street</span>: <span class="hljs-built_in">string</span>;
        <span class="hljs-attr">city</span>: <span class="hljs-built_in">string</span>;
        <span class="hljs-attr">country</span>: <span class="hljs-built_in">string</span>;
        <span class="hljs-attr">postalCode</span>?: <span class="hljs-built_in">string</span>;
      };
    };
  };
}
</code></pre>
<h2 id="خصائص-الدوال-الاستدعاءات-ومعالجات-الأحداث">خصائص الدوال: الاستدعاءات ومعالِجات الأحداث</h2>
<p>الدوال المستخدَمة كخصائص تحتاج إلى كتابة أنواع دقيقة لضمان أمان الأنواع لكل من المعاملات وقيم العائد:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SearchProps</span> {
  <span class="hljs-comment">// Simple callback</span>
  <span class="hljs-attr">onSearch</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-comment">// Async callback with error handling</span>
  <span class="hljs-attr">onSubmit</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;

  <span class="hljs-comment">// Callback with multiple parameters</span>
  <span class="hljs-attr">onFilter</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">category</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">tags</span>: <span class="hljs-built_in">string</span>[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-comment">// Optional callback with event</span>
  <span class="hljs-attr">onChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-comment">// Callback that returns a value</span>
  <span class="hljs-attr">validator</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// Returns error message</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Search</span>(<span class="hljs-params">{ onSearch, onSubmit, onChange }: <span class="hljs-title class_">SearchProps</span></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">onSubmit</span>(query);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Search failed:&#x27;</span>, error);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
          setQuery(e.target.value);
          onChange?.(e); // Optional chaining for optional callback
        }}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Search<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="خصائص-شرطية-مع-الأنواع-الاتحادية-المميزة">خصائص شرطية مع الأنواع الاتحادية المُميَّزة</h2>
<p>أحيانًا تعتمد الخصائص على بعضها — فحين تكون خاصية موجودة تصبح أخرى مطلوبة أو ممنوعة. وتساعد الأنواع الاتحادية المُميَّزة (discriminated unions) على نمذجة هذه العلاقات بدقّة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
} &amp; (
  | {
      <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;button&#x27;</span>;
      <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
      <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
    }
  | {
      <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;link&#x27;</span>;
      <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">target</span>?: <span class="hljs-string">&#x27;_blank&#x27;</span> | <span class="hljs-string">&#x27;_self&#x27;</span>;
    }
  | {
      <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;submit&#x27;</span>;
      <span class="hljs-attr">form</span>?: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
    }
);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">const</span> { children } = props;

  <span class="hljs-keyword">switch</span> (props.<span class="hljs-property">variant</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;button&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{props.disabled}</span>&gt;</span>
          {children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;link&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{props.href}</span> <span class="hljs-attr">target</span>=<span class="hljs-string">{props.target}</span>&gt;</span>
          {children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;submit&#x27;</span>:
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">form</span>=<span class="hljs-string">{props.form}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{props.disabled}</span>&gt;</span>
          {children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
      );
  }
}

<span class="hljs-comment">// TypeScript ensures correct prop combinations</span>
&lt;<span class="hljs-title class_">Button</span> variant=<span class="hljs-string">&quot;button&quot;</span> onClick={<span class="hljs-function">() =&gt;</span> {}}&gt;<span class="hljs-title class_">Click</span>&lt;/<span class="hljs-title class_">Button</span>&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;link&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/home&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">form</span>=<span class="hljs-string">&quot;myForm&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
</code></pre>
<h2 id="الخصائص-العامة-للمكونات-القابلة-لإعادة-الاستخدام">الخصائص العامة للمكوّنات القابلة لإعادة الاستخدام</h2>
<p>تجعل الأنواع العامة المكوّنات قابلة لإعادة الاستخدام حقًا مع الحفاظ على أمان الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SelectProps</span>&lt;T&gt; {
  <span class="hljs-attr">options</span>: T[];
  <span class="hljs-attr">value</span>?: T;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">getLabel</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">option</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">getValue</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">option</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
}

## <span class="hljs-title class_">Generic</span> <span class="hljs-title class_">TextField</span> <span class="hljs-keyword">with</span> <span class="hljs-title class_">Typed</span> onChange

<span class="hljs-title class_">Create</span> a <span class="hljs-string">\`TextField\`</span> that accepts <span class="hljs-string">\`value\`</span>/<span class="hljs-string">\`defaultValue\`</span> generically and narrows <span class="hljs-string">\`onChange\`</span> to the right event based on the underlying element.

<span class="hljs-string">\`\`</span><span class="hljs-string">\`tsx
type TextFieldAs = &#x27;input&#x27; | &#x27;textarea&#x27;;

type TextFieldCommon = {
  label: string;
  error?: string;
  as?: TextFieldAs;
};

type InputFieldProps = TextFieldCommon &amp; Omit&lt;JSX.IntrinsicElements[&#x27;input&#x27;], &#x27;onChange&#x27;&gt; &amp; {
  as?: &#x27;input&#x27;;
  onChange?: (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void;
};

type TextareaFieldProps = TextFieldCommon &amp; Omit&lt;JSX.IntrinsicElements[&#x27;textarea&#x27;], &#x27;onChange&#x27;&gt; &amp; {
  as: &#x27;textarea&#x27;;
  onChange?: (e: React.ChangeEvent&lt;HTMLTextAreaElement&gt;) =&gt; void;
};

type TextFieldProps = InputFieldProps | TextareaFieldProps;

export function TextField(props: TextFieldProps) {
  const { label, error, as = &#x27;input&#x27;, ...rest } = props as TextFieldProps &amp; { as: TextFieldAs };

  return (
    &lt;label className={\`</span>text-field \${error ? <span class="hljs-string">&#x27;has-error&#x27;</span> : <span class="hljs-string">&#x27;&#x27;</span>}<span class="hljs-string">\`}&gt;
      &lt;span className=&quot;label&quot;&gt;{label}&lt;/span&gt;
      {as === &#x27;textarea&#x27; ? (
        &lt;textarea {...(rest as TextareaFieldProps)} /&gt;
      ) : (
        &lt;input {...(rest as InputFieldProps)} /&gt;
      )}
      {error &amp;&amp; &lt;span className=&quot;error&quot;&gt;{error}&lt;/span&gt;}
    &lt;/label&gt;
  );
}

// Usage with correct event narrowing
&lt;TextField label=&quot;Name&quot; value={name} onChange={(e) =&gt; setName(e.target.value)} /&gt;
&lt;TextField as=&quot;textarea&quot; label=&quot;Bio&quot; defaultValue={bio} onChange={(e) =&gt; setBio(e.target.value)} /&gt;

function Select&lt;T&gt;({
options,
value,
onChange,
getLabel,
getValue,
placeholder = &#x27;Select an option&#x27;
}: SelectProps&lt;T&gt;) {
return (
&lt;select
value={value ? getValue(value) : &#x27;&#x27;}
onChange={(e) =&gt; {
const selected = options.find(
opt =&gt; String(getValue(opt)) === e.target.value
);
if (selected) onChange(selected);
}} &gt;
&lt;option value=&quot;&quot;&gt;{placeholder}&lt;/option&gt;
{options.map((option, index) =&gt; (
&lt;option key={index} value={getValue(option)}&gt;
{getLabel(option)}
&lt;/option&gt;
))}
&lt;/select&gt;
);
}

// Type-safe usage with different types
interface User {
id: number;
name: string;
email: string;
}

&lt;Select&lt;User&gt;
options={users}
value={selectedUser}
onChange={setSelectedUser}
getLabel={(user) =&gt; user.name}
getValue={(user) =&gt; user.id}
/&gt;

&lt;Select&lt;string&gt;
options={[&#x27;Red&#x27;, &#x27;Green&#x27;, &#x27;Blue&#x27;]}
value={color}
onChange={setColor}
getLabel={(c) =&gt; c}
getValue={(c) =&gt; c}
/&gt;
</span></code></pre>
<h2 id="توسيع-خصائص-عناصر-html">توسيع خصائص عناصر HTML</h2>
<p>كثيرًا ما تريد لمكوّناتك أن تقبل كل سمات HTML القياسية إضافة إلى خصائصك المخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Extending button props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CustomButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ButtonHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt; {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-attr">loading</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CustomButton</span>(<span class="hljs-params">{
  variant = <span class="hljs-string">&#x27;primary&#x27;</span>,
  loading,
  children,
  disabled,
  ...rest
}: <span class="hljs-title class_">CustomButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn</span> <span class="hljs-attr">btn--</span>\${<span class="hljs-attr">variant</span>}\`}
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled</span> || <span class="hljs-attr">loading</span>}
      {<span class="hljs-attr">...rest</span>}
    &gt;</span>
      {loading ? &#x27;Loading...&#x27; : children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Omitting specific HTML props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;
  <span class="hljs-title class_">React</span>.<span class="hljs-title class_">InputHTMLAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;,
  &#x27;type&#x27; | &#x27;onChange&#x27;
&gt; {
  <span class="hljs-attr">type</span>?: <span class="hljs-string">&#x27;text&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;password&#x27;</span>; <span class="hljs-comment">// Restrict to specific types</span>
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>; <span class="hljs-comment">// Simplify onChange signature</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Input</span>(<span class="hljs-params">{ onChange, ...props }: <span class="hljs-title class_">InputProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      {<span class="hljs-attr">...props</span>}
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(e.target.value)}
    /&gt;</span>
  );
}
</code></pre>
<h2 id="أنواع-المساعدات-المدمجة-في-react">أنواع المساعدات المدمجة في React</h2>
<p>يوفّر React عدة أنواع مساعِدة تزيل التكرار وتجعّل خصائص مكوّناتك أكثر تعبيرًا. وتتعامل هذه المساعدات مع أنماط شائعة يمرّ بها كل مطوّر React، من إضافة خاصية العناصر الفرعية إلى إدارة المراجع (refs).</p>
<h3 id="propswithchildren-مساعد-العناصر-الفرعية">PropsWithChildren: مساعد العناصر الفرعية</h3>
<p>هل مللت من إضافة <code>children</code> يدويًا إلى كل مكوّن حاوٍ؟ فـ <code>PropsWithChildren</code> يغطّي ظهرك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PropsWithChildren</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ❌ The old way: manually adding children</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;default&#x27;</span> | <span class="hljs-string">&#x27;highlighted&#x27;</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-comment">// ✅ The clean way: using PropsWithChildren</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;default&#x27;</span> | <span class="hljs-string">&#x27;highlighted&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Card</span>(<span class="hljs-params">{ title, variant = <span class="hljs-string">&#x27;default&#x27;</span>, children }: <span class="hljs-title class_">PropsWithChildren</span>&lt;<span class="hljs-title class_">CardProps</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">card</span> <span class="hljs-attr">card--</span>\${<span class="hljs-attr">variant</span>}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;card-content&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>«PropsWithChildren» مطابق تمامًا لإضافة <code>children?: ReactNode</code> إلى خصائصك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// These are identical:</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WithChildrenManual</span> = <span class="hljs-title class_">CardProps</span> &amp; { <span class="hljs-attr">children</span>?: <span class="hljs-title class_">ReactNode</span> };
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WithChildrenHelper</span> = <span class="hljs-title class_">PropsWithChildren</span>&lt;<span class="hljs-title class_">CardProps</span>&gt;;

<span class="hljs-comment">// The actual implementation is simple:</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PropsWithChildren</span>&lt;P&gt; = P &amp; { <span class="hljs-attr">children</span>?: <span class="hljs-title class_">ReactNode</span> };
</code></pre>
<p>استخدم <code>PropsWithChildren</code> حين:</p>
<ul>
<li>كان مكوّنك حاوية تلفّ محتوى آخر</li>
<li>أردت كتابة نوع موحّد للعناصر الفرعية في كامل شيفرتك</li>
<li>كنت تبني مكوّنات تخطيط أو التفاف</li>
</ul>
<h3 id="propswithoutchildren-الورقة-الصريحة">PropsWithoutChildren: الورقة الصريحة</h3>
<p>أحيانًا تحتاج إلى أن تكون صريحًا بأنه لا ينبغي أن يكون لمكوّنك عناصر فرعية. ورغم ندرة استخدامها مباشرة، فإن <code>PropsWithoutChildren</code> يجعل نيتك واضحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PropsWithoutChildren</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Components that should never have children</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InputProps</span> = <span class="hljs-title class_">PropsWithoutChildren</span>&lt;{
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
}&gt;;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Input</span>(<span class="hljs-params">{ value, onChange, placeholder }: <span class="hljs-title class_">InputProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(e.target.value)}
      placeholder={placeholder}
    /&gt;</span>
  );
}

<span class="hljs-comment">// ❌ TypeScript error if someone tries to add children</span>
&lt;<span class="hljs-title class_">Input</span> value=<span class="hljs-string">&quot;test&quot;</span> onChange={setValue}&gt;
  <span class="hljs-title class_">This</span> will cause a <span class="hljs-keyword">type</span> error!
&lt;/<span class="hljs-title class_">Input</span>&gt;
</code></pre>
<p>القوة الحقيقية لـ <code>PropsWithoutChildren</code> تظهر عند بناء أدوات الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Creating a type helper that strips children from any props</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LeafComponent</span>&lt;P&gt; = <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">PropsWithoutChildren</span>&lt;P&gt;&gt;;

<span class="hljs-comment">// Now you can create leaf components with guaranteed no children</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">StatusBadge</span>: <span class="hljs-title class_">LeafComponent</span>&lt;{ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;online&#x27;</span> | <span class="hljs-string">&#x27;offline&#x27;</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ status }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">badge</span> <span class="hljs-attr">badge--</span>\${<span class="hljs-attr">status</span>}\`}&gt;</span>{status}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;
};
</code></pre>
<h3 id="refattributes-مراجع-آمنة-من-ناحية-الأنواع">RefAttributes: مراجع آمنة من ناحية الأنواع</h3>
<p>حين تحتاج إلى إتاحة المراجع من مكوّناتك، توفّر <code>RefAttributes</code> الكتابة الصحيحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, <span class="hljs-title class_">RefAttributes</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// RefAttributes adds the optional ref prop with proper typing</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonPropsWithRef</span> = <span class="hljs-title class_">ButtonProps</span> &amp; <span class="hljs-title class_">RefAttributes</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;;

<span class="hljs-comment">// Using with forwardRef</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span> = forwardRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>, <span class="hljs-title class_">ButtonProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ variant = <span class="hljs-string">&#x27;primary&#x27;</span>, onClick, children }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn</span> <span class="hljs-attr">btn--</span>\${<span class="hljs-attr">variant</span>}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
);

<span class="hljs-comment">// The ref is properly typed</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> buttonRef = useRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{buttonRef}</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> buttonRef.current?.focus()}
    &gt;
      Focus me!
    <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
  );
}
</code></pre>
<p>«RefAttributes» مفيدة بشكل خاص عند تركيب أنواع خصائص معقّدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Combining multiple type helpers</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CompleteButtonProps</span> = <span class="hljs-title class_">PropsWithChildren</span>&lt;
  <span class="hljs-title class_">ButtonProps</span> &amp; <span class="hljs-title class_">RefAttributes</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;
&gt;;

<span class="hljs-comment">// For function components that accept refs</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FancyInputProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">RefAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt; {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">FancyInput</span> = forwardRef&lt;<span class="hljs-title class_">HTMLInputElement</span>, <span class="hljs-title class_">FancyInputProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ label, error }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{error</span> ? &#x27;<span class="hljs-attr">error</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;} /&gt;</span>
        {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
);
</code></pre>
<h3 id="دمج-أنواع-المساعدين-أنماط-من-العالم-الحقيقي">دمج أنواع المساعدين: أنماط من العالم الحقيقي</h3>
<p>تتألق أنواع المساعدين عند دمجها لإنشاء أنماط خصائص تعبيرية وقابلة لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// A card component that needs children and refs</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardBaseProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">footer</span>?: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CardProps</span> = <span class="hljs-title class_">PropsWithChildren</span>&lt;<span class="hljs-title class_">CardBaseProps</span>&gt; &amp; <span class="hljs-title class_">RefAttributes</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Card</span> = forwardRef&lt;<span class="hljs-title class_">HTMLDivElement</span>, <span class="hljs-title class_">CardProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ title, footer, children }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;card&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        {footer &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>{footer}<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
);

<span class="hljs-comment">// A form field that explicitly has no children</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FieldProps</span> = <span class="hljs-title class_">PropsWithoutChildren</span>&lt;{
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}&gt; &amp; <span class="hljs-title class_">RefAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;;

<span class="hljs-comment">// A layout component with optional children</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LayoutProps</span> {
  <span class="hljs-attr">sidebar</span>?: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">header</span>?: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Layout</span>(<span class="hljs-params">{ sidebar, header, children }: <span class="hljs-title class_">PropsWithChildren</span>&lt;<span class="hljs-title class_">LayoutProps</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;layout&quot;</span>&gt;</span>
      {header &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{header}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;layout-body&quot;</span>&gt;</span>
        {sidebar &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>{sidebar}<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>}
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="أنواع-المساعدين-مقابل-التعريفات-اليدوية">أنواع المساعدين مقابل التعريفات اليدوية</h3>
<p>متى ينبغي أن تستخدم هذه المساعدات بدلًا من تعريف الخصائص يدويًا؟</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Use PropsWithChildren for consistency</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContainerProps</span> {
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
}
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Container</span>(<span class="hljs-params">{ className, children }: <span class="hljs-title class_">PropsWithChildren</span>&lt;<span class="hljs-title class_">ContainerProps</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Define manually when children need special typing</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-title class_">ItemProps</span>&gt;[] | <span class="hljs-title class_">ReactElement</span>&lt;<span class="hljs-title class_">ItemProps</span>&gt;;
  <span class="hljs-attr">ordered</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// ✅ Use RefAttributes for standard ref forwarding</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Input</span> = forwardRef&lt;<span class="hljs-title class_">HTMLInputElement</span>, <span class="hljs-title class_">InputProps</span> &amp; <span class="hljs-title class_">RefAttributes</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;&gt;(
  <span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>
);

<span class="hljs-comment">// ✅ Define manually for custom ref-like props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">VideoPlayerProps</span> {
  <span class="hljs-attr">videoRef</span>?: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLVideoElement</span>&gt;;
  <span class="hljs-attr">controlsRef</span>?: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">VideoControls</span>&gt;;
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>هذه الأنواع المساعدة تتعلق بالوضوح والاتساق. فهي تجعل شيفرتك أكثر قابلية للقراءة عبر التعبير الصريح عن النية — فالمكوّن إما أن يتوقّع عناصر فرعية أو لا يتوقّعها، وإما أن يمرّر المراجع أو لا يمرّرها. استخدمها لجعل واجهات مكوّناتك أكثر قابلية للتنبّؤ.</p>
</blockquote>
<h2 id="توثيق-الخصائص-عبر-jsdoc">توثيق الخصائص عبر JSDoc</h2>
<p>أنواع TypeScript هي توثيق بحد ذاتها، لكنك أحيانًا تحتاج إلى سياق أكثر:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ChartProps</span> {
  <span class="hljs-comment">/**
   * Data points to display in the chart
   * <span class="hljs-doctag">@example</span>
   * [
   *   { x: 0, y: 10 },
   *   { x: 1, y: 20 }
   * ]
   */</span>
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span> }&gt;;

  <span class="hljs-comment">/**
   * Chart dimensions in pixels
   * <span class="hljs-doctag">@default</span> {<span class="hljs-type"> width: 600, height: 400 </span>}
   */</span>
  <span class="hljs-attr">size</span>?: {
    <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
  };

  <span class="hljs-comment">/**
   * Enable interactive tooltips
   * <span class="hljs-doctag">@default</span> <span class="hljs-variable">true</span>
   */</span>
  <span class="hljs-attr">interactive</span>?: <span class="hljs-built_in">boolean</span>;

  <span class="hljs-comment">/**
   * Callback fired when a data point is clicked
   * <span class="hljs-doctag">@param</span> <span class="hljs-variable">point</span> - The clicked data point
   * <span class="hljs-doctag">@param</span> <span class="hljs-variable">index</span> - Index of the point in the data array
   */</span>
  <span class="hljs-attr">onPointClick</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">point</span>: { x: <span class="hljs-built_in">number</span>; y: <span class="hljs-built_in">number</span> }, <span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}
</code></pre>
<h2 id="الأنماط-الشائعة-والأنماط-المضادة">الأنماط الشائعة والأنماط المضادة</h2>
<h3 id="الأنماط-الجيدة">✅ الأنماط الجيدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Use string literals for known values</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Size</span> = <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;

<span class="hljs-comment">// Make impossible states impossible</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoadingState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-comment">// Group related props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldProps</span> {
  <span class="hljs-attr">field</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
}
</code></pre>
<h3 id="الأنماط-المضادة-التي-ينبغي-تجنبها">❌ الأنماط المضادة التي ينبغي تجنّبها</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Don&#x27;t use &#x27;any&#x27; for props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BadProps</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>; <span class="hljs-comment">// ❌ No type safety</span>
}

<span class="hljs-comment">// Don&#x27;t make everything optional</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TooFlexible</span> {
  <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-comment">// Component can&#x27;t function without any props!</span>
}

<span class="hljs-comment">// Don&#x27;t use boolean flags for multiple states</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ConfusingStates</span> {
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isSuccess</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">// These can conflict!</span>
}
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li><strong>ابدأ صارمًا، وارخِ متى لزم</strong>: ابدأ بأنواع صارمة ولا تليّنها إلا حين تكون المرونة مطلوبة فعلًا</li>
<li><strong>استخدم الأنواع الاتحادية المُميَّزة للخصائص المتبادلة الحصرية</strong>: نمذج مجال عملك بدقّة</li>
<li><strong>وفّر قيمًا افتراضية للخصائص الاختيارية</strong>: اجعل الحالة الشائعة سهلة</li>
<li><strong>وثّق الخصائص المعقّدة</strong>: استخدم تعليقات JSDoc لتوفير سياق إضافي</li>
<li><strong>أبقِ الخصائص مسطّحة قدر الإمكان</strong>: الخصائص المتداخلة بعمق أصعب في الاستخدام</li>
<li><strong>استخدم الأنواع العامة للمكوّنات القابلة لإعادة الاستخدام حقًا</strong>: لكن لا تُفرط في تعقيد التصميم</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
