const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-conditional-mapped-types",p="الأنواع الشرطية (Conditional) والمنسوخة (Mapped)",t=[{depth:2,id:"الأنواع-الشرطية-conditional-types-if-then-else-للأنواع",text:"الأنواع الشرطية (Conditional Types): If-Then-Else للأنواع"},{depth:2,id:"الكلمة-المفتاحية-infer",text:"الكلمة المفتاحية infer"},{depth:2,id:"استخراج-خصائص-مكون-react",text:"استخراج خصائص مكوّن React"},{depth:2,id:"الأنواع-المنسوخة-mapped-types-تحويل-أنواع-الكائنات",text:"الأنواع المنسوخة (Mapped Types): تحويل أنواع الكائنات"},{depth:2,id:"إعادة-تسمية-المفاتيح-key-remapping-مع-قوالب-النصوص-template-literals",text:"إعادة تسمية المفاتيح (Key Remapping) مع قوالب النصوص (Template Literals)"},{depth:2,id:"تصفية-الخصائص-filtering-properties",text:"تصفية الخصائص (Filtering Properties)"},{depth:2,id:"الأنواع-الشرطية-مع-الأنواع-المنسوخة",text:"الأنواع الشرطية مع الأنواع المنسوخة"},{depth:2,id:"أنواع-نماذج-react-forms",text:"أنواع نماذج React (Forms)"},{depth:2,id:"أنواع-شرطية-متقدمة-advanced-conditional-types",text:"أنواع شرطية متقدمة (Advanced Conditional Types)"},{depth:2,id:"الأنواع-الشرطية-التكرارية-recursive-conditional-types",text:"الأنواع الشرطية التكرارية (Recursive Conditional Types)"},{depth:2,id:"قالب-template-لأنواع-استجابة-api",text:"قالب (Template) لأنواع استجابة API"},{depth:2,id:"معالجة-خصائص-مكون-react",text:"معالجة خصائص مكوّن React"},{depth:2,id:"الوصول-الآمن-type-safe-إلى-مسارات-الكائنات",text:"الوصول الآمن (Type-Safe) إلى مسارات الكائنات"},{depth:2,id:"الأنواع-المعلمة-branded-مع-الشرطية",text:"الأنواع المُعلَّمة (Branded) مع الشرطية"},{depth:2,id:"تحويلات-أنواع-مكون-react",text:"تحويلات أنواع مكوّن React"},{depth:2,id:"تركيب-أنواع-الأدوات-utility-type-combinations",text:"تركيب أنواع الأدوات (Utility Type Combinations)"},{depth:2,id:"مثال-واقعي-عميل-api-آمن-الأنواع",text:"مثال واقعي: عميل API آمن الأنواع"},{depth:2,id:"نصائح-الأداء-performance",text:"نصائح الأداء (Performance)"},{depth:3,id:"تجنب-التكرار-recursion-العميق",text:"تجنّب التكرار (Recursion) العميق"},{depth:3,id:"استخدم-aliases-للأنواع-المعقدة",text:"استخدم aliases للأنواع المعقدة"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"ابدأ-ببساطة",text:"ابدأ ببساطة"},{depth:3,id:"وثق-الأنواع-المعقدة",text:"وثّق الأنواع المعقدة"},{depth:3,id:"اختبر-أنواعك",text:"اختبر أنواعك"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>إذا كان نظام أنواع TypeScript لغة برمجة، فإن الأنواع الشرطية والمنسوخة هي تدفق التحكم (control flow) والحلقات (loops) فيها. تتيح لك تحويل الأنواع، وإنشاء أنواع جديدة بناءً على موجودة، وبناء منطق على مستوى الأنواع (type-level) متطور بشكل لا يصدق. هذه الأدوات التي تجعل مكتبات مثل React Hook Form وtRPC ممكنة. لنتقنها.</p>
<h2 id="الأنواع-الشرطية-conditional-types-if-then-else-للأنواع">الأنواع الشرطية (Conditional Types): <code>If-Then-Else</code> للأنواع</h2>
<p>الأنواع الشرطية تتبع النمط <code>T extends U ? X : Y</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">IsString</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> A = <span class="hljs-title class_">IsString</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// true</span>
<span class="hljs-keyword">type</span> B = <span class="hljs-title class_">IsString</span>&lt;<span class="hljs-built_in">number</span>&gt;; <span class="hljs-comment">// false</span>
<span class="hljs-keyword">type</span> C = <span class="hljs-title class_">IsString</span>&lt;<span class="hljs-string">&#x27;hello&#x27;</span>&gt;; <span class="hljs-comment">// true (string literal extends string)</span>

<span class="hljs-comment">// More practical example</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Flatten</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Array</span>&lt;infer <span class="hljs-title class_">Item</span>&gt; ? <span class="hljs-title class_">Item</span> : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Str</span> = <span class="hljs-title class_">Flatten</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Num</span> = <span class="hljs-title class_">Flatten</span>&lt;<span class="hljs-built_in">number</span>[]&gt;; <span class="hljs-comment">// number</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Mixed</span> = <span class="hljs-title class_">Flatten</span>&lt;(<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>)[]&gt;; <span class="hljs-comment">// string | number</span>
</code></pre>
<h2 id="الكلمة-المفتاحية-infer">الكلمة المفتاحية <code>infer</code></h2>
<p><code>infer</code> تتيح لك استخراج الأنواع من أنواع أخرى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Extract return type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReturnType</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]) =&gt; infer R ? R : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getString</span>(<span class="hljs-params"></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;hello&#x27;</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringReturn</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> getString&gt;; <span class="hljs-comment">// string</span>

<span class="hljs-comment">// Extract promise type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UnwrapPromise</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Promise</span>&lt;infer U&gt; ? U : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PromiseString</span> = <span class="hljs-title class_">UnwrapPromise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">JustString</span> = <span class="hljs-title class_">UnwrapPromise</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// string</span>

<span class="hljs-comment">// Extract array element type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ElementType</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (infer E)[] ? E : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringElement</span> = <span class="hljs-title class_">ElementType</span>&lt;<span class="hljs-built_in">string</span>[]&gt;; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NumberElement</span> = <span class="hljs-title class_">ElementType</span>&lt;<span class="hljs-built_in">number</span>[]&gt;; <span class="hljs-comment">// number</span>
</code></pre>
<h2 id="استخراج-خصائص-مكون-react">استخراج خصائص مكوّن React</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Extract props type from a component</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ComponentProps</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;infer P&gt; ? P : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: { label: <span class="hljs-built_in">string</span>; onClick: () =&gt; <span class="hljs-built_in">void</span> }</span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>&gt;</span>{props.label}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt;;
<span class="hljs-comment">// { label: string; onClick: () =&gt; void }</span>

<span class="hljs-comment">// Extract props from different component types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PropsOf</span>&lt;C&gt; = C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;infer P&gt;
  ? P
  : C <span class="hljs-keyword">extends</span> keyof <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>
  ? <span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">IntrinsicElements</span>[C]
  : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">DivProps</span> = <span class="hljs-title class_">PropsOf</span>&lt;<span class="hljs-string">&#x27;div&#x27;</span>&gt;;  <span class="hljs-comment">// React.HTMLAttributes&lt;HTMLDivElement&gt;</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CustomProps</span> = <span class="hljs-title class_">PropsOf</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt;;  <span class="hljs-comment">// Button&#x27;s props</span>
</code></pre>
<h2 id="الأنواع-المنسوخة-mapped-types-تحويل-أنواع-الكائنات">الأنواع المنسوخة (Mapped Types): تحويل أنواع الكائنات</h2>
<p>الأنواع المنسوخة تتيح لك إنشاء أنواع جديدة بتحويل خصائص أنواع موجودة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Basic mapped type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Readonly</span>&lt;T&gt; = {
  <span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReadonlyUser</span> = <span class="hljs-title class_">Readonly</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-comment">// { readonly name: string; readonly age: number; }</span>

<span class="hljs-comment">// Make all properties optional</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Partial</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]?: T[P];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialUser</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-comment">// { name?: string; age?: number; }</span>

<span class="hljs-comment">// Make all properties required</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Required</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]-?: T[P]; <span class="hljs-comment">// -? removes optional</span>
};
</code></pre>
<h2 id="إعادة-تسمية-المفاتيح-key-remapping-مع-قوالب-النصوص-template-literals">إعادة تسمية المفاتيح (Key Remapping) مع قوالب النصوص (Template Literals)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Getters and setters</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Getters</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> <span class="hljs-string">\`get<span class="hljs-subst">\${Capitalize&lt;<span class="hljs-built_in">string</span> &amp; K&gt;}</span>\`</span>]: <span class="hljs-function">() =&gt;</span> T[K];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Setters</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> <span class="hljs-string">\`set<span class="hljs-subst">\${Capitalize&lt;<span class="hljs-built_in">string</span> &amp; K&gt;}</span>\`</span>]: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">State</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">isActive</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StateGetters</span> = <span class="hljs-title class_">Getters</span>&lt;<span class="hljs-title class_">State</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   getName: () =&gt; string;</span>
<span class="hljs-comment">//   getAge: () =&gt; number;</span>
<span class="hljs-comment">//   getIsActive: () =&gt; boolean;</span>
<span class="hljs-comment">// }</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StateSetters</span> = <span class="hljs-title class_">Setters</span>&lt;<span class="hljs-title class_">State</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   setName: (value: string) =&gt; void;</span>
<span class="hljs-comment">//   setAge: (value: number) =&gt; void;</span>
<span class="hljs-comment">//   setIsActive: (value: boolean) =&gt; void;</span>
<span class="hljs-comment">// }</span>
</code></pre>
<h2 id="تصفية-الخصائص-filtering-properties">تصفية الخصائص (Filtering Properties)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Pick only string properties</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringProperties</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> T[K] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> ? K : <span class="hljs-built_in">never</span>]: T[K];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Mixed</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">isActive</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">OnlyStrings</span> = <span class="hljs-title class_">StringProperties</span>&lt;<span class="hljs-title class_">Mixed</span>&gt;;
<span class="hljs-comment">// { name: string; email: string; }</span>

<span class="hljs-comment">// Pick methods only</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Methods</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> T[K] <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Function</span> ? K : <span class="hljs-built_in">never</span>]: T[K];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Service</span> {
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timeout</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-title function_">get</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;;
  <span class="hljs-title function_">post</span>(<span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ServiceMethods</span> = <span class="hljs-title class_">Methods</span>&lt;<span class="hljs-title class_">Service</span>&gt;;
<span class="hljs-comment">// { get(): Promise&lt;any&gt;; post(data: any): Promise&lt;any&gt;; }</span>
</code></pre>
<h2 id="الأنواع-الشرطية-مع-الأنواع-المنسوخة">الأنواع الشرطية مع الأنواع المنسوخة</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Make specific properties optional</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialBy</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; = <span class="hljs-title class_">Omit</span>&lt;T, K&gt; &amp; <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;T, K&gt;&gt;;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserUpdate</span> = <span class="hljs-title class_">PartialBy</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;password&#x27;</span>&gt;;
<span class="hljs-comment">// { id: string; name: string; email?: string; password?: string; }</span>

<span class="hljs-comment">// Nullable properties</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Nullable</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]: T[P] | <span class="hljs-literal">null</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NullableUser</span> = <span class="hljs-title class_">Nullable</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-comment">// All properties can be null</span>

<span class="hljs-comment">// Deep partial</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepPartial</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]?: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepPartial</span>&lt;T[P]&gt; : T[P];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Config</span> {
  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">host</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">port</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">ssl</span>: {
      <span class="hljs-attr">enabled</span>: <span class="hljs-built_in">boolean</span>;
      <span class="hljs-attr">cert</span>: <span class="hljs-built_in">string</span>;
    };
  };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialConfig</span> = <span class="hljs-title class_">DeepPartial</span>&lt;<span class="hljs-title class_">Config</span>&gt;;
<span class="hljs-comment">// Everything is optional, including nested properties</span>
</code></pre>
<h2 id="أنواع-نماذج-react-forms">أنواع نماذج React (Forms)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Form field state</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FieldState</span>&lt;T&gt; = {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">touched</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-comment">// Convert model to form state</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormState</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-title class_">FieldState</span>&lt;T[K]&gt;;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoginModel</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">remember</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoginFormState</span> = <span class="hljs-title class_">FormState</span>&lt;<span class="hljs-title class_">LoginModel</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   email: FieldState&lt;string&gt;;</span>
<span class="hljs-comment">//   password: FieldState&lt;string&gt;;</span>
<span class="hljs-comment">//   remember: FieldState&lt;boolean&gt;;</span>
<span class="hljs-comment">// }</span>

<span class="hljs-comment">// Form change handlers</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormHandlers</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> <span class="hljs-string">\`onChange<span class="hljs-subst">\${Capitalize&lt;<span class="hljs-built_in">string</span> &amp; K&gt;}</span>\`</span>]: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoginHandlers</span> = <span class="hljs-title class_">FormHandlers</span>&lt;<span class="hljs-title class_">LoginModel</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   onChangeEmail: (value: string) =&gt; void;</span>
<span class="hljs-comment">//   onChangePassword: (value: string) =&gt; void;</span>
<span class="hljs-comment">//   onChangeRemember: (value: boolean) =&gt; void;</span>
<span class="hljs-comment">// }</span>
</code></pre>
<h2 id="أنواع-شرطية-متقدمة-advanced-conditional-types">أنواع شرطية متقدمة (Advanced Conditional Types)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Distribute over unions</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsStringType</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">TestUnion</span> = <span class="hljs-title class_">IsStringType</span>&lt;<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;; <span class="hljs-comment">// boolean (true | false)</span>

<span class="hljs-comment">// Non-distributive (wrapped in tuple)</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsStringTypeNonDist</span>&lt;T&gt; = [T] <span class="hljs-keyword">extends</span> [<span class="hljs-built_in">string</span>] ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">TestUnionNonDist</span> = <span class="hljs-title class_">IsStringTypeNonDist</span>&lt;<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;; <span class="hljs-comment">// false</span>

<span class="hljs-comment">// Extract non-nullable</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NonNullable</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span> ? <span class="hljs-built_in">never</span> : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">MaybeString</span> = <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DefiniteString</span> = <span class="hljs-title class_">NonNullable</span>&lt;<span class="hljs-title class_">MaybeString</span>&gt;; <span class="hljs-comment">// string</span>

<span class="hljs-comment">// Function overloads</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Parameters</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: infer P) =&gt; <span class="hljs-built_in">any</span> ? P : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params"><span class="hljs-attr">first</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">last</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span>;
<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-built_in">string</span>[]</span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hello <span class="hljs-subst">\${args.join(<span class="hljs-string">&#x27; &#x27;</span>)}</span>\`</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">GreetParams</span> = <span class="hljs-title class_">Parameters</span>&lt;<span class="hljs-keyword">typeof</span> greet&gt;;
<span class="hljs-comment">// [name: string] | [first: string, last: string]</span>
</code></pre>
<h2 id="الأنواع-الشرطية-التكرارية-recursive-conditional-types">الأنواع الشرطية التكرارية (Recursive Conditional Types)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Deeply nested promise unwrapping</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepAwait</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Promise</span>&lt;infer U&gt; ? <span class="hljs-title class_">DeepAwait</span>&lt;U&gt; : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Nested</span> = <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Unwrapped</span> = <span class="hljs-title class_">DeepAwait</span>&lt;<span class="hljs-title class_">Nested</span>&gt;; <span class="hljs-comment">// string</span>

<span class="hljs-comment">// Flatten nested arrays</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Flatten</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title function_">readonly</span> (infer U)[] ? <span class="hljs-title class_">Flatten</span>&lt;U&gt; : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NestedArray</span> = <span class="hljs-built_in">number</span>[][][];
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Flat</span> = <span class="hljs-title class_">Flatten</span>&lt;<span class="hljs-title class_">NestedArray</span>&gt;; <span class="hljs-comment">// number</span>

<span class="hljs-comment">// Path types for nested objects</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Path</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T = keyof T&gt; = K <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>
  ? T[K] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>
    ? <span class="hljs-string">\`<span class="hljs-subst">\${K}</span>\`</span> | <span class="hljs-string">\`<span class="hljs-subst">\${K}</span>.<span class="hljs-subst">\${Path&lt;T[K]&gt;}</span>\`</span>
    : <span class="hljs-string">\`<span class="hljs-subst">\${K}</span>\`</span>
  : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Person</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">address</span>: {
    <span class="hljs-attr">street</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">city</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">country</span>: {
      <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    };
  };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PersonPaths</span> = <span class="hljs-title class_">Path</span>&lt;<span class="hljs-title class_">Person</span>&gt;;
<span class="hljs-comment">// &quot;name&quot; | &quot;address&quot; | &quot;address.street&quot; | &quot;address.city&quot; |</span>
<span class="hljs-comment">// &quot;address.country&quot; | &quot;address.country.code&quot; | &quot;address.country.name&quot;</span>
</code></pre>
<h2 id="قالب-template-لأنواع-استجابة-api">قالب (Template) لأنواع استجابة API</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// API response wrapper</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ApiResponse</span>&lt;T, E = <span class="hljs-title class_">Error</span>&gt; = { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">error</span>: E };

<span class="hljs-comment">// Transform all methods to return API responses</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncApi</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: T[K] <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: infer A) =&gt; infer R
    ? <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: A</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-title class_">Awaited</span>&lt;R&gt;&gt;&gt;
    : <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserService</span> {
  <span class="hljs-title function_">getUser</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">User</span>;
  <span class="hljs-title function_">updateUser</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;): <span class="hljs-title class_">User</span>;
  <span class="hljs-title function_">deleteUser</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncUserService</span> = <span class="hljs-title class_">AsyncApi</span>&lt;<span class="hljs-title class_">UserService</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   getUser(id: string): Promise&lt;ApiResponse&lt;User&gt;&gt;;</span>
<span class="hljs-comment">//   updateUser(id: string, data: Partial&lt;User&gt;): Promise&lt;ApiResponse&lt;User&gt;&gt;;</span>
<span class="hljs-comment">//   deleteUser(id: string): Promise&lt;ApiResponse&lt;void&gt;&gt;;</span>
<span class="hljs-comment">// }</span>
</code></pre>
<h2 id="معالجة-خصائص-مكون-react">معالجة خصائص مكوّن React</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Remove event handlers</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DataProps</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> K <span class="hljs-keyword">extends</span> <span class="hljs-string">\`on<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span> ? <span class="hljs-built_in">never</span> : K]: T[K];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onHover</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonDataProps</span> = <span class="hljs-title class_">DataProps</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt;;
<span class="hljs-comment">// { label: string; disabled: boolean; }</span>

<span class="hljs-comment">// Make event handlers optional</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">OptionalEvents</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> K <span class="hljs-keyword">extends</span> <span class="hljs-string">\`on<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span> ? K : <span class="hljs-built_in">never</span>]?: T[K];
} &amp; {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> K <span class="hljs-keyword">extends</span> <span class="hljs-string">\`on<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span> ? <span class="hljs-built_in">never</span> : K]: T[K];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FlexibleButton</span> = <span class="hljs-title class_">OptionalEvents</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt;;
<span class="hljs-comment">// { label: string; disabled: boolean; onClick?: () =&gt; void; onHover?: () =&gt; void; }</span>
</code></pre>
<h2 id="الوصول-الآمن-type-safe-إلى-مسارات-الكائنات">الوصول الآمن (Type-Safe) إلى مسارات الكائنات</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Get type at path</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GetPath</span>&lt;T, <span class="hljs-title class_">Path</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = <span class="hljs-title class_">Path</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Key}</span>.<span class="hljs-subst">\${infer Rest}</span>\`</span>
  ? <span class="hljs-title class_">Key</span> <span class="hljs-keyword">extends</span> keyof T
    ? <span class="hljs-title class_">GetPath</span>&lt;T[<span class="hljs-title class_">Key</span>], <span class="hljs-title class_">Rest</span>&gt;
    : <span class="hljs-built_in">never</span>
  : <span class="hljs-title class_">Path</span> <span class="hljs-keyword">extends</span> keyof T
    ? T[<span class="hljs-title class_">Path</span>]
    : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Data</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">profile</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
    };
    <span class="hljs-attr">settings</span>: {
      <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
    };
  };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserName</span> = <span class="hljs-title class_">GetPath</span>&lt;<span class="hljs-title class_">Data</span>, <span class="hljs-string">&#x27;user.profile.name&#x27;</span>&gt;; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Theme</span> = <span class="hljs-title class_">GetPath</span>&lt;<span class="hljs-title class_">Data</span>, <span class="hljs-string">&#x27;user.settings.theme&#x27;</span>&gt;; <span class="hljs-comment">// &#x27;light&#x27; | &#x27;dark&#x27;</span>

<span class="hljs-comment">// Safe get function</span>
<span class="hljs-keyword">function</span> get&lt;T, P <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Path</span>&lt;T&gt;&gt;(<span class="hljs-attr">obj</span>: T, <span class="hljs-attr">path</span>: P): <span class="hljs-title class_">GetPath</span>&lt;T, P&gt; {
  <span class="hljs-keyword">const</span> keys = path.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;.&#x27;</span>);
  <span class="hljs-keyword">let</span> <span class="hljs-attr">result</span>: <span class="hljs-built_in">any</span> = obj;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">of</span> keys) {
    result = result[key];
  }

  <span class="hljs-keyword">return</span> result;
}
</code></pre>
<h2 id="الأنواع-المعلمة-branded-مع-الشرطية">الأنواع المُعلَّمة (Branded) مع الشرطية</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Create branded types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Brand</span>&lt;T, B&gt; = T &amp; { <span class="hljs-attr">__brand</span>: B };

<span class="hljs-comment">// Validation with conditional types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidEmail</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>@<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>.<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span> ? <span class="hljs-title class_">Brand</span>&lt;T, <span class="hljs-string">&#x27;Email&#x27;</span>&gt; : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Email1</span> = <span class="hljs-title class_">ValidEmail</span>&lt;<span class="hljs-string">&#x27;user@example.com&#x27;</span>&gt;; <span class="hljs-comment">// Branded as Email</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Email2</span> = <span class="hljs-title class_">ValidEmail</span>&lt;<span class="hljs-string">&#x27;invalid&#x27;</span>&gt;; <span class="hljs-comment">// never</span>

<span class="hljs-comment">// Runtime validation that matches</span>
<span class="hljs-keyword">function</span> isValidEmail&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr">email</span>: T): email is <span class="hljs-title class_">ValidEmail</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</span>.<span class="hljs-title function_">test</span>(email);
}

<span class="hljs-keyword">const</span> email = <span class="hljs-string">&#x27;user@example.com&#x27;</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-title function_">isValidEmail</span>(email)) {
  <span class="hljs-comment">// email is branded as ValidEmail</span>
  <span class="hljs-title function_">sendEmail</span>(email);
}
</code></pre>
<h2 id="تحويلات-أنواع-مكون-react">تحويلات أنواع مكوّن React</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// HOC type transformation</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WithLoading</span>&lt;P&gt; = P &amp; {
  <span class="hljs-attr">loading</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
};

<span class="hljs-comment">// Transform component type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WithLoadingComponent</span>&lt;C&gt; =
  C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;infer P&gt; ? <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-title class_">WithLoading</span>&lt;P&gt;&gt; : <span class="hljs-built_in">never</span>;

<span class="hljs-comment">// Inject props</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InjectProps</span>&lt;P, I&gt; = <span class="hljs-title class_">Omit</span>&lt;P, keyof I&gt; &amp; <span class="hljs-title class_">Partial</span>&lt;I&gt;;

<span class="hljs-comment">// HOC that injects theme</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ThemeProps</span> {
  <span class="hljs-attr">theme</span>: {
    <span class="hljs-attr">primaryColor</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">secondaryColor</span>: <span class="hljs-built_in">string</span>;
  };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ThemedComponent</span>&lt;C&gt; =
  C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;infer P&gt; ? <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-title class_">InjectProps</span>&lt;P, <span class="hljs-title class_">ThemeProps</span>&gt;&gt; : <span class="hljs-built_in">never</span>;
</code></pre>
<h2 id="تركيب-أنواع-الأدوات-utility-type-combinations">تركيب أنواع الأدوات (Utility Type Combinations)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Mutable (remove readonly)</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Mutable</span>&lt;T&gt; = {
  -<span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P];
};

<span class="hljs-comment">// Deep readonly</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepReadonly</span>&lt;T&gt; = {
  <span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepReadonly</span>&lt;T[P]&gt; : T[P];
};

<span class="hljs-comment">// Pick and make partial</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PickPartial</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;T, K&gt;&gt;;

<span class="hljs-comment">// Omit and make required</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">OmitRequired</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; = <span class="hljs-title class_">Required</span>&lt;<span class="hljs-title class_">Omit</span>&lt;T, K&gt;&gt;;

<span class="hljs-comment">// Exclusive OR (XOR)</span>
<span class="hljs-keyword">type</span> <span class="hljs-variable constant_">XOR</span>&lt;T, U&gt; =
  | (T &amp; { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_">Exclude</span>&lt;keyof U, keyof T&gt;]?: <span class="hljs-built_in">never</span> })
  | (U &amp; { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_">Exclude</span>&lt;keyof T, keyof U&gt;]?: <span class="hljs-built_in">never</span> });

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Name</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Id</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Can have name OR id, but not both</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Identifier</span> = <span class="hljs-variable constant_">XOR</span>&lt;<span class="hljs-title class_">Name</span>, <span class="hljs-title class_">Id</span>&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-attr">id1</span>: <span class="hljs-title class_">Identifier</span> = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> }; <span class="hljs-comment">// ✅</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">id2</span>: <span class="hljs-title class_">Identifier</span> = { <span class="hljs-attr">id</span>: <span class="hljs-number">123</span> }; <span class="hljs-comment">// ✅</span>
<span class="hljs-comment">// const id3: Identifier = { name: &#x27;Alice&#x27;, id: 123 };  // ❌ Error</span>
</code></pre>
<h2 id="مثال-واقعي-عميل-api-آمن-الأنواع">مثال واقعي: عميل API آمن الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// API definition</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">APIEndpoints</span> {
  <span class="hljs-string">&#x27;/users&#x27;</span>: {
    <span class="hljs-attr">GET</span>: { <span class="hljs-attr">response</span>: <span class="hljs-title class_">User</span>[]; <span class="hljs-attr">params</span>: { <span class="hljs-attr">page</span>?: <span class="hljs-built_in">number</span> } };
    <span class="hljs-attr">POST</span>: { <span class="hljs-attr">response</span>: <span class="hljs-title class_">User</span>; <span class="hljs-attr">body</span>: <span class="hljs-title class_">CreateUserDTO</span> };
  };
  <span class="hljs-string">&#x27;/users/:id&#x27;</span>: {
    <span class="hljs-attr">GET</span>: { <span class="hljs-attr">response</span>: <span class="hljs-title class_">User</span> };
    <span class="hljs-attr">PUT</span>: { <span class="hljs-attr">response</span>: <span class="hljs-title class_">User</span>; <span class="hljs-attr">body</span>: <span class="hljs-title class_">UpdateUserDTO</span> };
    <span class="hljs-attr">DELETE</span>: { <span class="hljs-attr">response</span>: <span class="hljs-built_in">void</span> };
  };
}

<span class="hljs-comment">// Extract method types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">HTTPMethod</span> = <span class="hljs-string">&#x27;GET&#x27;</span> | <span class="hljs-string">&#x27;POST&#x27;</span> | <span class="hljs-string">&#x27;PUT&#x27;</span> | <span class="hljs-string">&#x27;DELETE&#x27;</span>;

<span class="hljs-comment">// Type-safe client</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">APIClient</span> = {
  [<span class="hljs-title class_">Path</span> <span class="hljs-keyword">in</span> keyof <span class="hljs-title class_">APIEndpoints</span>]: {
    [<span class="hljs-title class_">Method</span> <span class="hljs-keyword">in</span> <span class="hljs-title class_">HTTPMethod</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Lowercase</span>&lt;<span class="hljs-title class_">Method</span>&gt;]: <span class="hljs-title class_">Method</span> <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">APIEndpoints</span>[<span class="hljs-title class_">Path</span>]
      ? <span class="hljs-title class_">APIEndpoints</span>[<span class="hljs-title class_">Path</span>][<span class="hljs-title class_">Method</span>] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">body</span>: infer B; <span class="hljs-attr">response</span>: infer R }
        ? <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">body</span>: B</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;R&gt;
        : <span class="hljs-title class_">APIEndpoints</span>[<span class="hljs-title class_">Path</span>][<span class="hljs-title class_">Method</span>] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">params</span>: infer P; <span class="hljs-attr">response</span>: infer R }
          ? <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">params</span>?: P</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;R&gt;
          : <span class="hljs-title class_">APIEndpoints</span>[<span class="hljs-title class_">Path</span>][<span class="hljs-title class_">Method</span>] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">response</span>: infer R }
            ? <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;R&gt;
            : <span class="hljs-built_in">never</span>
      : <span class="hljs-built_in">never</span>;
  };
};

<span class="hljs-comment">// Usage would be fully typed:</span>
<span class="hljs-comment">// client[&#x27;/users&#x27;].get({ page: 1 })</span>
<span class="hljs-comment">// client[&#x27;/users&#x27;].post({ name: &#x27;Alice&#x27;, email: &#x27;alice@example.com&#x27; })</span>
<span class="hljs-comment">// client[&#x27;/users/:id&#x27;].delete()</span>
</code></pre>
<h2 id="نصائح-الأداء-performance">نصائح الأداء (Performance)</h2>
<h3 id="تجنب-التكرار-recursion-العميق">تجنّب التكرار (Recursion) العميق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Can hit recursion limit</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepKeys</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? { [K <span class="hljs-keyword">in</span> keyof T]: K | <span class="hljs-title class_">DeepKeys</span>&lt;T[K]&gt; }[keyof T] : <span class="hljs-built_in">never</span>;

<span class="hljs-comment">// ✅ Limit recursion depth</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Keys</span>&lt;T, <span class="hljs-title class_">Depth</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">5</span>&gt; = [<span class="hljs-title class_">Depth</span>] <span class="hljs-keyword">extends</span> [<span class="hljs-number">0</span>]
  ? <span class="hljs-built_in">never</span>
  : T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>
    ? { [K <span class="hljs-keyword">in</span> keyof T]: K | <span class="hljs-title class_">Keys</span>&lt;T[K], <span class="hljs-title class_">Prev</span>[<span class="hljs-title class_">Depth</span>]&gt; }[keyof T]
    : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Prev</span> = [<span class="hljs-built_in">never</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
</code></pre>
<h3 id="استخدم-aliases-للأنواع-المعقدة">استخدم aliases للأنواع المعقدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Break down complex types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsFunction</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Function</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FunctionKeys</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-title class_">IsFunction</span>&lt;T[K]&gt; <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? K : <span class="hljs-built_in">never</span>;
}[keyof T];

<span class="hljs-comment">// ❌ Bad: Everything inline</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FunctionKeys</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: T[K] <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Function</span> ? K : <span class="hljs-built_in">never</span>;
}[keyof T];
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="ابدأ-ببساطة">ابدأ ببساطة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Build up complexity gradually</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Simple</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Medium</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Prefix}</span>_<span class="hljs-subst">\${infer Suffix}</span>\`</span> ? [<span class="hljs-title class_">Prefix</span>, <span class="hljs-title class_">Suffix</span>] : <span class="hljs-built_in">never</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Complex</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;infer K, infer V&gt; ? <span class="hljs-comment">/* ... */</span> : <span class="hljs-built_in">never</span>;
</code></pre>
<h3 id="وثق-الأنواع-المعقدة">وثّق الأنواع المعقدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">/**
 * Recursively makes all properties optional
 * <span class="hljs-doctag">@example</span>
 * type Result = DeepPartial&lt;{ a: { b: string } }&gt;
 * // { a?: { b?: string } }
 */</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepPartial</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]?: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepPartial</span>&lt;T[P]&gt; : T[P];
};
</code></pre>
<h3 id="اختبر-أنواعك">اختبر أنواعك</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Use type assertions to test</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Assert</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>&gt; = T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Test1</span> = <span class="hljs-title class_">Assert</span>&lt;<span class="hljs-title class_">IsString</span>&lt;<span class="hljs-built_in">string</span>&gt; <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>&gt;; <span class="hljs-comment">// ✅</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Test2</span> = <span class="hljs-title class_">Assert</span>&lt;<span class="hljs-title class_">IsString</span>&lt;<span class="hljs-built_in">number</span>&gt; <span class="hljs-keyword">extends</span> <span class="hljs-literal">false</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>&gt;; <span class="hljs-comment">// ✅</span>
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>الأنواع الشرطية والمنسوخة هي أدوات Power في TypeScript:</p>
<ol>
<li><strong>الأنواع الشرطية (Conditional Types)</strong> - منطق if-then-else على مستوى الأنواع</li>
<li><strong>الأنواع المنسوخة (Mapped Types)</strong> - تحويل أنواع الكائنات بشكل منهجي</li>
<li><strong>الكلمة المفتاحية <code>infer</code></strong> - استخراج الأنواع من structures معقدة</li>
<li><strong>إعادة تسمية المفاتيح (Key Remapping)</strong> - إنشاء أسماء خصائص جديدة باستخدام template literals</li>
<li><strong>الأنواع التكرارية (Recursive Types)</strong> - معالجة structures متداخلة deeply</li>
</ol>
<p>أتقنها، وستتمكن من إنشاء تجريدات (abstractions) آمنة الأنواع (type-safe) بدت مستحيلة من قبل!</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
