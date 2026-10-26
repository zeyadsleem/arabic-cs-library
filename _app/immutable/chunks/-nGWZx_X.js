const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-structural-typing",p="الأنواع البنيوية (Structural Typing)",t=[{depth:2,id:"النموذج-الذهني-البنية-قبل-الأسماء",text:"النموذج الذهني: البنية قبل الأسماء"},{depth:3,id:"أول-نوع-بنيوي-لك",text:"أول نوع بنيوي لك"},{depth:3,id:"توافق-البنية-في-التطبيق-العملي",text:"توافق البنية في التطبيق العملي"},{depth:2,id:"لماذا-تهم-الأنواع-البنيوية-مع-react",text:"لماذا تهم الأنواع البنيوية مع React"},{depth:3,id:"الخصائص-ليست-سوى-بنى",text:"الخصائص ليست سوى بنى"},{depth:3,id:"تركيب-المكونات-عبر-البنى",text:"تركيب المكوّنات عبر البنى"},{depth:2,id:"فحص-الخصائص-الزائدة-الاستثناء",text:"فحص الخصائص الزائدة: الاستثناء"},{depth:3,id:"الكائنات-الحرفية-صارمة",text:"الكائنات الحرفية صارمة"},{depth:3,id:"لماذا-يهم-هذا-في-react",text:"لماذا يهم هذا في React"},{depth:3,id:"التملص-من-فحص-الخصائص-الزائدة",text:"التملّص من فحص الخصائص الزائدة"},{depth:2,id:"الأصناف-والأنواع-البنيوية",text:"الأصناف والأنواع البنيوية"},{depth:3,id:"الأصناف-بنى-أيضا",text:"الأصناف بنى أيضًا"},{depth:3,id:"الأعضاء-الخاصة-تكسر-التوافق",text:"الأعضاء الخاصة تكسر التوافق"},{depth:2,id:"توافق-الدوال",text:"توافق الدوال"},{depth:3,id:"توافق-نوعي-المعامل-والعائد",text:"توافق نوعَي المعامل والعائد"},{depth:3,id:"لماذا-يهم-هذا-في-أحداث-react",text:"لماذا يهم هذا في أحداث React"},{depth:2,id:"علاقات-النوع-الفرعي",text:"علاقات النوع الفرعي"},{depth:3,id:"النمذجة-الفرعية-بالعرض",text:"النمذجة الفرعية بالعرض"},{depth:3,id:"النمذجة-الفرعية-بالعمق",text:"النمذجة الفرعية بالعمق"},{depth:2,id:"الأنواع-البنيوية-مع-الأنواع-العامة",text:"الأنواع البنيوية مع الأنواع العامة"},{depth:3,id:"التوافق-البنيوي-العام",text:"التوافق البنيوي العام"},{depth:3,id:"الأنواع-العامة-في-مكونات-react",text:"الأنواع العامة في مكوّنات React"},{depth:2,id:"تواقيع-الفهرس-والأنواع-البنيوية",text:"تواقيع الفهرس والأنواع البنيوية"},{depth:3,id:"أسماء-الخصائص-الديناميكية",text:"أسماء الخصائص الديناميكية"},{depth:3,id:"خصائص-react-مع-تواقيع-الفهرس",text:"خصائص React مع تواقيع الفهرس"},{depth:2,id:"الأنماط-الشائعة-وحالات-الاستخدام",text:"الأنماط الشائعة وحالات الاستخدام"},{depth:3,id:"نمط-نشر-الخصائص",text:"نمط نشر الخصائص"},{depth:3,id:"أنماط-المكونات-ذات-الرتبة-العليا",text:"أنماط المكوّنات ذات الرتبة العليا"},{depth:3,id:"التعامل-مع-استجابات-api",text:"التعامل مع استجابات API"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"استثمر-الأنواع-البنيوية-في-المرونة",text:"استثمر الأنواع البنيوية في المرونة"},{depth:3,id:"استخدم-الكتابة-الاسمية-عند-الحاجة",text:"استخدم الكتابة الاسمية عند الحاجة"},{depth:3,id:"صمم-الواجهات-لتوافق-بنيوي",text:"صمّم الواجهات لتوافق بنيوي"},{depth:2,id:"الأخطاء-الشائعة-والحلول",text:"الأخطاء الشائعة والحلول"},{depth:3,id:"الأنواع-الفارغة",text:"الأنواع الفارغة"},{depth:3,id:"مقارنة-الدوال",text:"مقارنة الدوال"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>لا يهم TypeScript ما تسمّي به أنواعك — كل ما يهمه هو بنيتها. هذه هي الكتابة البنيوية (structural typing)، وهي المفهوم الأكثر أساسية الذي يميّز TypeScript عن اللغات ذات الكتابة الاسمية مثل Java أو C#. وما إن تفهم الكتابة البنيوية فهمًا حقيقيًا حتى تصير خصائص React وتركيب المكوّنات وتوافق الأنواع مفهومةً فجأة.</p>
<p>فكّر في الأمر هكذا: إن طلبت مني بطة، فلا يهمني إن أعطيتني بطةً حقيقية أو بطةً مطاطية أو حتى إنسانًا يرتدي زي البطة — ما دام يستطيع السباحة والصفير، فإن TypeScript يكون راضيًا. وهذه المرونة هي ما يجعل TypeScript قويًّا جدًا في عالم JavaScript، ولا سيما مع React.</p>
<h2 id="النموذج-الذهني-البنية-قبل-الأسماء">النموذج الذهني: البنية قبل الأسماء</h2>
<p>في TypeScript، يتوافق نوعان إذا كان لهما البنية نفسها، بغضّ النظر عن اسميهما أو عن مكان تعريفهما.</p>
<h3 id="أول-نوع-بنيوي-لك">أول نوع بنيوي لك</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// These two interfaces have different names</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Person</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Employee</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// But TypeScript treats them as the same type!</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">person</span>: <span class="hljs-title class_">Person</span> = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> };
<span class="hljs-keyword">let</span> <span class="hljs-attr">employee</span>: <span class="hljs-title class_">Employee</span> = person; <span class="hljs-comment">// ✅ No error!</span>
person = employee; <span class="hljs-comment">// ✅ Also works!</span>

<span class="hljs-comment">// Why? Because they have the same shape</span>
<span class="hljs-comment">// TypeScript doesn&#x27;t care about the names &#x27;Person&#x27; or &#x27;Employee&#x27;</span>
</code></pre>
<h3 id="توافق-البنية-في-التطبيق-العملي">توافق البنية في التطبيق العملي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript only requires the minimum shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Greetable</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params"><span class="hljs-attr">obj</span>: <span class="hljs-title class_">Greetable</span></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Hello, <span class="hljs-subst">\${obj.name}</span>!\`</span>);
}

<span class="hljs-comment">// All of these work because they have AT LEAST a name property</span>
<span class="hljs-title function_">greet</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> }); <span class="hljs-comment">// ✅ Exact match</span>
<span class="hljs-title function_">greet</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bob&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> }); <span class="hljs-comment">// ✅ Has extra properties</span>
<span class="hljs-title function_">greet</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Charlie&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: <span class="hljs-string">&#x27;NYC&#x27;</span> }); <span class="hljs-comment">// ✅ Even more properties</span>

<span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Diana&#x27;</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;diana@example.com&#x27;</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
};
<span class="hljs-title function_">greet</span>(user); <span class="hljs-comment">// ✅ Has the required shape plus more</span>
</code></pre>
<h2 id="لماذا-تهم-الأنواع-البنيوية-مع-react">لماذا تهم الأنواع البنيوية مع React</h2>
<p>كل ما في مكوّنات React هو تمرير الخصائص، والكتابة البنيوية تجعل ذلك شديد المرونة.</p>
<h3 id="الخصائص-ليست-سوى-بنى">الخصائص ليست سوى بنى</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// A component asks for a certain shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ label, onClick }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// Any object with the right shape works</span>
<span class="hljs-keyword">const</span> submitProps = {
  <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Submit&#x27;</span>,
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Submit&#x27;</span>),
  <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;blue&#x27;</span>, <span class="hljs-comment">// Extra property</span>
  <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;large&#x27;</span>  <span class="hljs-comment">// Another extra</span>
};

<span class="hljs-comment">// This works! TypeScript only checks for required properties</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> {<span class="hljs-attr">...submitProps</span>} /&gt;</span></span>

<span class="hljs-comment">// This is why spread operators are so common in React</span>
<span class="hljs-keyword">const</span> enhancedProps = {
  ...submitProps,
  <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;submit&#x27;</span>
};

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> {<span class="hljs-attr">...enhancedProps</span>} /&gt;</span></span> <span class="hljs-comment">// Still works!</span>
</code></pre>
<h3 id="تركيب-المكونات-عبر-البنى">تركيب المكوّنات عبر البنى</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ClickableProps</span> {
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DisableableProps</span> {
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LabeledProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Components can require combinations of shapes</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ClickableProps</span> &amp; <span class="hljs-title class_">DisableableProps</span> &amp; <span class="hljs-title class_">LabeledProps</span>;

<span class="hljs-comment">// Any component that needs clicking can accept ClickableProps</span>
<span class="hljs-keyword">function</span> makeClickable&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ClickableProps</span>&gt;(<span class="hljs-attr">props</span>: T) {
  <span class="hljs-keyword">return</span> {
    ...props,
    <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Clicked!&#x27;</span>);
      props.<span class="hljs-title function_">onClick</span>();
    }
  };
}

<span class="hljs-comment">// Structural typing enables powerful composition patterns</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ClickableProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Card</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">CardProps</span></span>) {
  <span class="hljs-comment">// Card has onClick because it extends ClickableProps</span>
  <span class="hljs-comment">// Any function expecting ClickableProps can process Card</span>
  <span class="hljs-keyword">const</span> enhanced = <span class="hljs-title function_">makeClickable</span>(props); <span class="hljs-comment">// ✅ Works!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{enhanced.onClick}</span>&gt;</span>{props.title}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="فحص-الخصائص-الزائدة-الاستثناء">فحص الخصائص الزائدة: الاستثناء</h2>
<p>هناك استثناء مهم واحد للكتابة البنيوية: فحص الخصائص الزائدة في الكائنات الحرفية (object literals).</p>
<h3 id="الكائنات-الحرفية-صارمة">الكائنات الحرفية صارمة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Config</span> {
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timeout</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// ❌ Error: Object literal may only specify known properties</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">config1</span>: <span class="hljs-title class_">Config</span> = {
  <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;api.example.com&#x27;</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">5000</span>,
  <span class="hljs-attr">typo</span>: <span class="hljs-string">&#x27;oops&#x27;</span>, <span class="hljs-comment">// Error! &#x27;typo&#x27; does not exist in type &#x27;Config&#x27;</span>
};

<span class="hljs-comment">// ✅ But this works (not an object literal)</span>
<span class="hljs-keyword">const</span> settings = {
  <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;api.example.com&#x27;</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">5000</span>,
  <span class="hljs-attr">typo</span>: <span class="hljs-string">&#x27;oops&#x27;</span>, <span class="hljs-comment">// No error here</span>
};
<span class="hljs-keyword">const</span> <span class="hljs-attr">config2</span>: <span class="hljs-title class_">Config</span> = settings; <span class="hljs-comment">// No error - structural typing applies</span>
</code></pre>
<h3 id="لماذا-يهم-هذا-في-react">لماذا يهم هذا في React</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// ❌ Direct JSX props are like object literals - strict checking</span>
&lt;<span class="hljs-title class_">Button</span>
  label=<span class="hljs-string">&quot;Click me&quot;</span>
  onClick={<span class="hljs-function">() =&gt;</span> {}}
  colour=<span class="hljs-string">&quot;blue&quot;</span> <span class="hljs-comment">// Error! Did you mean &#x27;color&#x27;?</span>
/&gt;

<span class="hljs-comment">// ✅ But spreading objects bypasses excess property checking</span>
<span class="hljs-keyword">const</span> props = {
  <span class="hljs-attr">label</span>: <span class="hljs-string">&quot;Click me&quot;</span>,
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {},
  <span class="hljs-attr">colour</span>: <span class="hljs-string">&quot;blue&quot;</span> <span class="hljs-comment">// No error in object creation</span>
};
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span> <span class="hljs-comment">// No error when spreading!</span>

<span class="hljs-comment">// This is why you might see this pattern</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">buttonProps</span>: <span class="hljs-title class_">ButtonProps</span> = {
  <span class="hljs-attr">label</span>: <span class="hljs-string">&quot;Click me&quot;</span>,
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {},
  <span class="hljs-comment">// colour: &quot;blue&quot; // ❌ Would error here</span>
};
</code></pre>
<h3 id="التملص-من-فحص-الخصائص-الزائدة">التملّص من فحص الخصائص الزائدة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Options</span> {
  <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Method 1: Type assertion</span>
<span class="hljs-keyword">const</span> options1 = {
  <span class="hljs-attr">width</span>: <span class="hljs-number">100</span>,
  <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>,
  <span class="hljs-attr">extra</span>: <span class="hljs-string">&#x27;data&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Options</span>; <span class="hljs-comment">// ✅ Assertion bypasses checking</span>

<span class="hljs-comment">// Method 2: Index signature</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FlexibleOptions</span> {
  <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">any</span>; <span class="hljs-comment">// Allow any additional properties</span>
}

<span class="hljs-comment">// Method 3: Intermediate variable</span>
<span class="hljs-keyword">const</span> allSettings = {
  <span class="hljs-attr">width</span>: <span class="hljs-number">100</span>,
  <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>,
  <span class="hljs-attr">extra</span>: <span class="hljs-string">&#x27;data&#x27;</span>,
};
<span class="hljs-keyword">const</span> <span class="hljs-attr">options2</span>: <span class="hljs-title class_">Options</span> = allSettings; <span class="hljs-comment">// ✅ Not a literal</span>

<span class="hljs-comment">// Method 4: Spread to satisfy interface</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">options3</span>: <span class="hljs-title class_">Options</span> = {
  ...allSettings,
  <span class="hljs-attr">width</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// Override to ensure correct type</span>
  <span class="hljs-attr">height</span>: <span class="hljs-number">200</span>,
};
</code></pre>
<h2 id="الأصناف-والأنواع-البنيوية">الأصناف والأنواع البنيوية</h2>
<p>حتى الأصناف تتبع الكتابة البنيوية في TypeScript، بخلاف معظم لغات البرمجة كائنية التوجه.</p>
<h3 id="الأصناف-بنى-أيضا">الأصناف بنى أيضًا</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">public</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-keyword">public</span> <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>,
  </span>) {}

  <span class="hljs-title function_">greet</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hi, I&#x27;m <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.name}</span>\`</span>;
  }
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Employee</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">public</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-keyword">public</span> <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>,
  </span>) {}

  <span class="hljs-title function_">greet</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hi, I&#x27;m <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.name}</span>\`</span>;
  }
}

<span class="hljs-comment">// Different classes, same shape = compatible</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">person</span>: <span class="hljs-title class_">Person</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Employee</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-number">30</span>); <span class="hljs-comment">// ✅ Works!</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">employee</span>: <span class="hljs-title class_">Employee</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Bob&#x27;</span>, <span class="hljs-number">25</span>); <span class="hljs-comment">// ✅ Works!</span>

<span class="hljs-comment">// Even plain objects work if they match the shape</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">notAClass</span>: <span class="hljs-title class_">Person</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Charlie&#x27;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">35</span>,
  <span class="hljs-title function_">greet</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hi, I&#x27;m <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.name}</span>\`</span>;
  },
}; <span class="hljs-comment">// ✅ Works!</span>
</code></pre>
<h3 id="الأعضاء-الخاصة-تكسر-التوافق">الأعضاء الخاصة تكسر التوافق</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Car</span> {
  <span class="hljs-keyword">private</span> engineStatus = <span class="hljs-string">&#x27;off&#x27;</span>;

  <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">engineStatus</span> = <span class="hljs-string">&#x27;on&#x27;</span>;
  }
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Motorcycle</span> {
  <span class="hljs-keyword">private</span> engineStatus = <span class="hljs-string">&#x27;off&#x27;</span>;

  <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">engineStatus</span> = <span class="hljs-string">&#x27;on&#x27;</span>;
  }
}

<span class="hljs-comment">// ❌ Error! Private members must originate from the same declaration</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">vehicle</span>: <span class="hljs-title class_">Car</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Motorcycle</span>(); <span class="hljs-comment">// Error!</span>

<span class="hljs-comment">// But without private members...</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">PublicCar</span> {
  engineStatus = <span class="hljs-string">&#x27;off&#x27;</span>;

  <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">engineStatus</span> = <span class="hljs-string">&#x27;on&#x27;</span>;
  }
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PublicMotorcycle</span> {
  engineStatus = <span class="hljs-string">&#x27;off&#x27;</span>;

  <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">engineStatus</span> = <span class="hljs-string">&#x27;on&#x27;</span>;
  }
}

<span class="hljs-comment">// ✅ Now they&#x27;re compatible</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">publicVehicle</span>: <span class="hljs-title class_">PublicCar</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PublicMotorcycle</span>(); <span class="hljs-comment">// Works!</span>
</code></pre>
<h2 id="توافق-الدوال">توافق الدوال</h2>
<p>للدوال قواعدها الخاصة في الكتابة البنيوية، وهي حاسمة في معالِجات أحداث React.</p>
<h3 id="توافق-نوعي-المعامل-والعائد">توافق نوعَي المعامل والعائد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Functions are compatible if parameters and returns are compatible</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NumberOperation</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">number</span>;

<span class="hljs-keyword">const</span> <span class="hljs-attr">add</span>: <span class="hljs-title class_">NumberOperation</span> = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b;
<span class="hljs-keyword">const</span> <span class="hljs-attr">multiply</span>: <span class="hljs-title class_">NumberOperation</span> = <span class="hljs-function">(<span class="hljs-params">x, y</span>) =&gt;</span> x * y;

<span class="hljs-comment">// Can assign one to the other - same shape</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">operation</span>: <span class="hljs-title class_">NumberOperation</span> = add;
operation = multiply; <span class="hljs-comment">// ✅ Works!</span>

<span class="hljs-comment">// Fewer parameters is okay (common in React!)</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Handler</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span>, <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;

<span class="hljs-keyword">const</span> <span class="hljs-attr">simpleHandler</span>: <span class="hljs-title class_">Handler</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-comment">// Ignoring the id parameter is fine</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Clicked!&#x27;</span>);
}; <span class="hljs-comment">// ✅ Works!</span>

<span class="hljs-keyword">const</span> <span class="hljs-attr">noParamHandler</span>: <span class="hljs-title class_">Handler</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Ignoring all parameters is fine too</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Clicked!&#x27;</span>);
}; <span class="hljs-comment">// ✅ Works!</span>
</code></pre>
<h3 id="لماذا-يهم-هذا-في-أحداث-react">لماذا يهم هذا في أحداث React</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// React expects specific event handler signatures</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ onClick }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}

<span class="hljs-comment">// All of these handlers are structurally compatible</span>
&lt;<span class="hljs-title class_">Button</span> onClick={<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">clientX</span>)} /&gt; <span class="hljs-comment">// ✅ Uses event</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> console.log(&#x27;Clicked&#x27;)} /&gt;</span>  <span class="hljs-comment">// ✅ Ignores event</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{function()</span> { <span class="hljs-attr">alert</span>(&#x27;!&#x27;) }} /&gt;</span></span>     <span class="hljs-comment">// ✅ Named function</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{console.log}</span> /&gt;</span></span>                   <span class="hljs-comment">// ✅ Even console.log!</span>

<span class="hljs-comment">// This is why you can pass simpler functions to complex handlers</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">complexHandler</span> = (<span class="hljs-params">
  <span class="hljs-attr">event</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">MouseEvent</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>
</span>) =&gt; <span class="hljs-built_in">void</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">simpleUsage</span> = (<span class="hljs-params"><span class="hljs-attr">handler</span>: <span class="hljs-keyword">typeof</span> complexHandler</span>) =&gt; {
  <span class="hljs-comment">// Can pass a simpler function</span>
  handler = <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Simple!&#x27;</span>); <span class="hljs-comment">// ✅ Works!</span>
};
</code></pre>
<h2 id="علاقات-النوع-الفرعي">علاقات النوع الفرعي</h2>
<p>تنشئ الكتابة البنيوية علاقات نوع فرعي ضمنية استنادًا إلى البنية.</p>
<h3 id="النمذجة-الفرعية-بالعرض">النمذجة الفرعية بالعرض</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// A type with more properties is a subtype of one with fewer</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BasicUser</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DetailedUser</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// DetailedUser is a subtype of BasicUser</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">basic</span>: <span class="hljs-title class_">BasicUser</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">detailed</span>: <span class="hljs-title class_">DetailedUser</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>,
};

basic = detailed; <span class="hljs-comment">// ✅ Subtype can be assigned to supertype</span>
<span class="hljs-comment">// detailed = basic; // ❌ Error! Supertype can&#x27;t be assigned to subtype</span>

<span class="hljs-comment">// This enables powerful patterns</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processUser</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">BasicUser</span></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(user.<span class="hljs-property">name</span>);
}

<span class="hljs-comment">// Can pass any subtype</span>
<span class="hljs-title function_">processUser</span>(detailed); <span class="hljs-comment">// ✅ Works!</span>
<span class="hljs-title function_">processUser</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bob&#x27;</span>, <span class="hljs-attr">extra</span>: <span class="hljs-string">&#x27;data&#x27;</span> }); <span class="hljs-comment">// ✅ Works!</span>
</code></pre>
<h3 id="النمذجة-الفرعية-بالعمق">النمذجة الفرعية بالعمق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Nested structures follow the same rules</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SimpleConfig</span> {
  <span class="hljs-attr">api</span>: {
    <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  };
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DetailedConfig</span> {
  <span class="hljs-attr">api</span>: {
    <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">timeout</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">retries</span>: <span class="hljs-built_in">number</span>;
  };
  <span class="hljs-attr">logging</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">let</span> <span class="hljs-attr">simple</span>: <span class="hljs-title class_">SimpleConfig</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">detailed</span>: <span class="hljs-title class_">DetailedConfig</span> = {
  <span class="hljs-attr">api</span>: {
    <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
    <span class="hljs-attr">timeout</span>: <span class="hljs-number">5000</span>,
    <span class="hljs-attr">retries</span>: <span class="hljs-number">3</span>,
  },
  <span class="hljs-attr">logging</span>: <span class="hljs-literal">true</span>,
};

simple = detailed; <span class="hljs-comment">// ✅ Works - detailed has all required properties</span>
</code></pre>
<h2 id="الأنواع-البنيوية-مع-الأنواع-العامة">الأنواع البنيوية مع الأنواع العامة</h2>
<p>تحافظ الأنواع العامة على العلاقات البنيوية.</p>
<h3 id="التوافق-البنيوي-العام">التوافق البنيوي العام</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Container</span>&lt;T&gt; {
  <span class="hljs-attr">value</span>: T;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Box</span>&lt;T&gt; {
  <span class="hljs-attr">value</span>: T;
}

<span class="hljs-comment">// Same structure, different names - still compatible!</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">container</span>: <span class="hljs-title class_">Container</span>&lt;<span class="hljs-built_in">string</span>&gt; = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;hello&#x27;</span> };
<span class="hljs-keyword">let</span> <span class="hljs-attr">box</span>: <span class="hljs-title class_">Box</span>&lt;<span class="hljs-built_in">string</span>&gt; = container; <span class="hljs-comment">// ✅ Works!</span>

<span class="hljs-comment">// Generic functions maintain structural typing</span>
<span class="hljs-keyword">function</span> processContainer&lt;T&gt;(<span class="hljs-attr">c</span>: <span class="hljs-title class_">Container</span>&lt;T&gt;): T {
  <span class="hljs-keyword">return</span> c.<span class="hljs-property">value</span>;
}

<span class="hljs-keyword">function</span> processBox&lt;T&gt;(<span class="hljs-attr">b</span>: <span class="hljs-title class_">Box</span>&lt;T&gt;): T {
  <span class="hljs-keyword">return</span> b.<span class="hljs-property">value</span>;
}

<span class="hljs-comment">// Can use interchangeably</span>
<span class="hljs-keyword">const</span> result1 = <span class="hljs-title function_">processContainer</span>(box); <span class="hljs-comment">// ✅ Works!</span>
<span class="hljs-keyword">const</span> result2 = <span class="hljs-title function_">processBox</span>(container); <span class="hljs-comment">// ✅ Works!</span>
</code></pre>
<h3 id="الأنواع-العامة-في-مكونات-react">الأنواع العامة في مكوّنات React</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic props follow structural typing</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CollectionProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-comment">// Components with same shape are interchangeable</span>
<span class="hljs-keyword">function</span> <span class="hljs-title class_">List</span>&lt;T&gt;(<span class="hljs-attr">props</span>: <span class="hljs-title class_">ListProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{props.items.map(props.renderItem)}<span class="hljs-tag">&lt;/&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">Collection</span>&lt;T&gt;(<span class="hljs-attr">props</span>: <span class="hljs-title class_">CollectionProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{props.items.map(props.renderItem)}<span class="hljs-tag">&lt;/&gt;</span></span>;
}

<span class="hljs-comment">// Can use the same props for both</span>
<span class="hljs-keyword">const</span> props = {
  <span class="hljs-attr">items</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{n}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
};

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>      <span class="hljs-comment">// ✅ Works!</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Collection</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span> <span class="hljs-comment">// ✅ Works!</span>
</code></pre>
<h2 id="تواقيع-الفهرس-والأنواع-البنيوية">تواقيع الفهرس والأنواع البنيوية</h2>
<p>تضيف تواقيع الفهرس مرونةً إلى الكتابة البنيوية.</p>
<h3 id="أسماء-الخصائص-الديناميكية">أسماء الخصائص الديناميكية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">StringDictionary</span> {
  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SpecificDictionary</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// SpecificDictionary is assignable to StringDictionary</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">generic</span>: <span class="hljs-title class_">StringDictionary</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">specific</span>: <span class="hljs-title class_">SpecificDictionary</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>,
  <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>,
};

generic = specific; <span class="hljs-comment">// ✅ Works!</span>

<span class="hljs-comment">// But not vice versa</span>
<span class="hljs-comment">// specific = generic; // ❌ Error - generic might not have name/email</span>
</code></pre>
<h3 id="خصائص-react-مع-تواقيع-الفهرس">خصائص React مع تواقيع الفهرس</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Common pattern for accepting arbitrary HTML attributes</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FlexibleProps</span> {
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">any</span>; <span class="hljs-comment">// Accept any additional props</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FlexibleComponent</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">FlexibleProps</span></span>) {
  <span class="hljs-keyword">const</span> { className, children, ...rest } = props;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span> {<span class="hljs-attr">...rest</span>}&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Can pass any props</span>
&lt;<span class="hljs-title class_">FlexibleComponent</span>
  className=<span class="hljs-string">&quot;container&quot;</span>
  id=<span class="hljs-string">&quot;main&quot;</span>
  data-testid=<span class="hljs-string">&quot;component&quot;</span>
  aria-label=<span class="hljs-string">&quot;Flexible&quot;</span>
  customProp=<span class="hljs-string">&quot;anything&quot;</span>
/&gt;
</code></pre>
<h2 id="الأنماط-الشائعة-وحالات-الاستخدام">الأنماط الشائعة وحالات الاستخدام</h2>
<h3 id="نمط-نشر-الخصائص">نمط نشر الخصائص</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">BaseProps</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LinkProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">BaseProps</span> {
  <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Structural typing enables prop spreading</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ id, className, label, onClick }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">baseProps</span>: <span class="hljs-title class_">BaseProps</span> = { id, className };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> {<span class="hljs-attr">...baseProps</span>} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>
      {label}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Can share props between components</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">sharedProps</span>: <span class="hljs-title class_">BaseProps</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;shared&#x27;</span>,
  <span class="hljs-attr">className</span>: <span class="hljs-string">&#x27;primary&#x27;</span>
};

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> {<span class="hljs-attr">...sharedProps</span>} <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Click&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {}} /&gt;</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> {<span class="hljs-attr">...sharedProps</span>} <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/home&quot;</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Home&quot;</span> /&gt;</span></span>
</code></pre>
<h3 id="أنماط-المكونات-ذات-الرتبة-العليا">أنماط المكوّنات ذات الرتبة العليا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// HOCs rely heavily on structural typing</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">WithLoadingProps</span> {
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> withLoading&lt;P <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>&gt;(
  <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;
): <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P &amp; <span class="hljs-title class_">WithLoadingProps</span>&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: P &amp; <span class="hljs-title class_">WithLoadingProps</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (props.<span class="hljs-property">loading</span>) {
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }

    <span class="hljs-comment">// Structural typing ensures P is preserved</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span> <span class="hljs-attr">as</span> <span class="hljs-attr">P</span>} /&gt;</span></span>;
  };
}

<span class="hljs-comment">// Works with any component that matches the shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProps</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">User</span>(<span class="hljs-params">{ name, age }: <span class="hljs-title class_">UserProps</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{name} is {age}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserWithLoading</span> = <span class="hljs-title function_">withLoading</span>(<span class="hljs-title class_">User</span>);

<span class="hljs-comment">// Structural typing ensures both props are required</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserWithLoading</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Alice&quot;</span> <span class="hljs-attr">age</span>=<span class="hljs-string">{30}</span> <span class="hljs-attr">loading</span>=<span class="hljs-string">{false}</span> /&gt;</span></span>
</code></pre>
<h3 id="التعامل-مع-استجابات-api">التعامل مع استجابات API</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Structural typing for flexible API responses</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span>;
  <span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserResponse</span> {
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Extra property</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleResponse</span>(<span class="hljs-params"><span class="hljs-attr">response</span>: <span class="hljs-title class_">ApiResponse</span></span>) {
  <span class="hljs-keyword">if</span> (response.<span class="hljs-property">status</span> === <span class="hljs-number">200</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Success:&#x27;</span>, response.<span class="hljs-property">data</span>);
  }
}

<span class="hljs-comment">// UserResponse is structurally compatible</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">userResponse</span>: <span class="hljs-title class_">UserResponse</span> = {
  <span class="hljs-attr">data</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> },
  <span class="hljs-attr">status</span>: <span class="hljs-number">200</span>,
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
};

<span class="hljs-title function_">handleResponse</span>(userResponse); <span class="hljs-comment">// ✅ Works!</span>
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="استثمر-الأنواع-البنيوية-في-المرونة">استثمر الأنواع البنيوية في المرونة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Accept minimal required shape</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Printable</span> {
  <span class="hljs-title function_">toString</span>(): <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">print</span>(<span class="hljs-params"><span class="hljs-attr">obj</span>: <span class="hljs-title class_">Printable</span></span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(obj.<span class="hljs-title function_">toString</span>());
}

<span class="hljs-comment">// Works with many types</span>
<span class="hljs-title function_">print</span>(<span class="hljs-number">42</span>); <span class="hljs-comment">// Numbers have toString</span>
<span class="hljs-title function_">print</span>(<span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// Strings have toString</span>
<span class="hljs-title function_">print</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// Arrays have toString</span>
<span class="hljs-title function_">print</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()); <span class="hljs-comment">// Dates have toString</span>
</code></pre>
<h3 id="استخدم-الكتابة-الاسمية-عند-الحاجة">استخدم الكتابة الاسمية عند الحاجة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Sometimes you want to prevent structural compatibility</span>
<span class="hljs-comment">// Use brands/tags for nominal typing</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserId</span> = <span class="hljs-built_in">string</span> &amp; { <span class="hljs-attr">__brand</span>: <span class="hljs-string">&#x27;UserId&#x27;</span> };
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PostId</span> = <span class="hljs-built_in">string</span> &amp; { <span class="hljs-attr">__brand</span>: <span class="hljs-string">&#x27;PostId&#x27;</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getUserById</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-title class_">UserId</span></span>) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getPostById</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-title class_">PostId</span></span>) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">const</span> userId = <span class="hljs-string">&#x27;user123&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">UserId</span>;
<span class="hljs-keyword">const</span> postId = <span class="hljs-string">&#x27;post456&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">PostId</span>;

<span class="hljs-title function_">getUserById</span>(userId); <span class="hljs-comment">// ✅ Works</span>
<span class="hljs-title function_">getUserById</span>(postId); <span class="hljs-comment">// ❌ Error - different brands</span>

<span class="hljs-comment">// This prevents accidentally passing wrong IDs</span>
<span class="hljs-comment">// even though both are structurally strings</span>
</code></pre>
<h3 id="صمم-الواجهات-لتوافق-بنيوي">صمّم الواجهات لتوافق بنيوي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Small, focused interfaces</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Identifiable</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Timestamped</span> {
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">updatedAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Named</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Combine as needed</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">User</span> = <span class="hljs-title class_">Identifiable</span> &amp; <span class="hljs-title class_">Named</span> &amp; <span class="hljs-title class_">Timestamped</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Product</span> = <span class="hljs-title class_">Identifiable</span> &amp; <span class="hljs-title class_">Named</span> &amp; { <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-comment">// Functions can accept exactly what they need</span>
<span class="hljs-keyword">function</span> getById&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Identifiable</span>&gt;(<span class="hljs-attr">item</span>: T): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> item.<span class="hljs-property">id</span>;
}

<span class="hljs-keyword">function</span> getRecent&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Timestamped</span>&gt;(<span class="hljs-attr">items</span>: T[]): T[] {
  <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">createdAt</span>.<span class="hljs-title function_">getTime</span>() - a.<span class="hljs-property">createdAt</span>.<span class="hljs-title function_">getTime</span>());
}
</code></pre>
<h2 id="الأخطاء-الشائعة-والحلول">الأخطاء الشائعة والحلول</h2>
<h3 id="الأنواع-الفارغة">الأنواع الفارغة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Empty types are compatible with everything!</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Empty</span> {}

<span class="hljs-keyword">let</span> <span class="hljs-attr">empty</span>: <span class="hljs-title class_">Empty</span> = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> }; <span class="hljs-comment">// ✅ Works!</span>
empty = <span class="hljs-number">42</span>; <span class="hljs-comment">// ✅ Works!</span>
empty = <span class="hljs-string">&#x27;hello&#x27;</span>; <span class="hljs-comment">// ✅ Works!</span>
empty = <span class="hljs-literal">null</span>; <span class="hljs-comment">// ❌ Only fails with strictNullChecks</span>

<span class="hljs-comment">// Be careful with empty interfaces</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {} <span class="hljs-comment">// Accepts any object!</span>

<span class="hljs-comment">// Better: Use explicit constraints</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}
</code></pre>
<h3 id="مقارنة-الدوال">مقارنة الدوال</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Functions with fewer parameters can be assigned to those with more</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">OneParam</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TwoParam</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;

<span class="hljs-keyword">let</span> <span class="hljs-attr">one</span>: <span class="hljs-title class_">OneParam</span> = <span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(a);
<span class="hljs-keyword">let</span> <span class="hljs-attr">two</span>: <span class="hljs-title class_">TwoParam</span> = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(a, b);

two = one; <span class="hljs-comment">// ✅ Works! (ignoring second param is safe)</span>
<span class="hljs-comment">// one = two; // ❌ Error! (would lose the second param)</span>

<span class="hljs-comment">// This is why React event handlers are flexible</span>
onClick={<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {}} <span class="hljs-comment">// Can ignore event</span>
onClick={<span class="hljs-function">() =&gt;</span> {}}  <span class="hljs-comment">// Can ignore all params</span>
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>الكتابة البنيوية هي أساس نظام أنواع TypeScript. إنها ما يجعل TypeScript يبدو طبيعيًّا في عالم JavaScript ومثاليًّا مع React. فبتركيزك على البنية بدل الأسماء، يمنحك TypeScript مرونةً هائلة مع الحفاظ على أمان الأنواع.</p>
<p>تذكّر: لا يهم TypeScript ما تسمّي به أنواعك ولا من أين أتت — كل ما يهمه أن تكون لها البنية الصحيحة. وهذا يتيح أنماطًا قوية مثل نشر الخصائص وتركيب المكوّنات والمكوّنات ذات الرتبة العليا، وهي أنماط مستحيلة في اللغات ذات الكتابة الاسمية.</p>
<p>أتقن الكتابة البنيوية، وستكتب TypeScript يعمل مع اللغة بدل أن يقاتلها. ستكون مكوّنات React لديك أكثر مرونة، وواجهاتك البرمجية (API) أكثر قابلية للتكيّف، وشيفرتك أكثر قابلية للصيانة — وكل ذلك لأنك فهمت أن البنية هي كل شيء في TypeScript.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
