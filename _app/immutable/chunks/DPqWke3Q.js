const s="kinney",n="react-typescript",a="React مع TypeScript",l="typescript-type-inference-mastery",p="استنتاج الأنواع",t=[{depth:2,id:"القاعدة-الذهبية",text:"القاعدة الذهبية"},{depth:2,id:"عندما-يكون-typescript-على-علم",text:"عندما يكون TypeScript على علم"},{depth:3,id:"تهيئة-المتغيرات",text:"تهيئة المتغيّرات"},{depth:3,id:"أنواع-إرجاع-الدوال-في-بعض-الأحيان",text:"أنواع إرجاع الدوال (في بعض الأحيان)"},{depth:3,id:"توابع-المصفوفات-والدوال-التمريرية",text:"توابع المصفوفات والدوال التمريرية"},{depth:2,id:"متى-تكون-صريحا",text:"متى تكون صريحًا"},{depth:3,id:"معاملات-الدوال",text:"معاملات الدوال"},{depth:3,id:"خصائص-المكونات",text:"خصائص المكوّنات"},{depth:3,id:"المصفوفات-والكائنات-الفارغة",text:"المصفوفات والكائنات الفارغة"},{depth:3,id:"عندما-تريد-تقييد-الأنواع",text:"عندما تريد تقييد الأنواع"},{depth:2,id:"أنماط-الاستنتاج-المتقدمة",text:"أنماط الاستنتاج المتقدّمة"},{depth:3,id:"تأكيدات-const",text:"تأكيدات const"},{depth:3,id:"الكتابة-السياقية-contextual-typing",text:"الكتابة السياقية (contextual typing)"},{depth:3,id:"استنتاج-الأنواع-العامة",text:"استنتاج الأنواع العامة"},{depth:2,id:"الاستنتاج-الخاص-بـ-react",text:"الاستنتاج الخاص بـ React"},{depth:3,id:"استنتاج-usestate",text:"استنتاج useState"},{depth:3,id:"استنتاج-usereducer",text:"استنتاج useReducer"},{depth:3,id:"استنتاج-معالج-الأحداث",text:"استنتاج معالِج الأحداث"},{depth:2,id:"الاستنتاج-عبر-تدفق-التحكم",text:"الاستنتاج عبر تدفّق التحكم"},{depth:2,id:"التفكيك-والاستنتاج",text:"التفكيك والاستنتاج"},{depth:2,id:"معامل-satisfies",text:"معامل satisfies"},{depth:2,id:"أخطاء-الاستنتاج-الشائعة",text:"أخطاء الاستنتاج الشائعة"},{depth:3,id:"التوسيع-widening",text:"التوسيع (widening)"},{depth:3,id:"استنتاج-خصائص-الكائنات",text:"استنتاج خصائص الكائنات"},{depth:3,id:"مشكلات-أنواع-إرجاع-الدوال",text:"مشكلات أنواع إرجاع الدوال"},{depth:2,id:"أفضل-الممارسات-في-react",text:"أفضل الممارسات في React"},{depth:3,id:"دع-الخطافات-تستنتج-متى-أمكن",text:"دع الخُطّافات تستنتج متى أمكن"},{depth:3,id:"كن-صريحا-عند-حدود-المكونات",text:"كن صريحًا عند حدود المكوّنات"},{depth:3,id:"استخدم-الاستنتاج-لمعالجات-الأحداث",text:"استخدم الاستنتاج لمعالِجات الأحداث"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"مثال-من-العالم-الحقيقي",text:"مثال من العالم الحقيقي"},{depth:2,id:"خلاصة-الإرشادات",text:"خلاصة الإرشادات"},{depth:3,id:"متى-تدع-typescript-يستنتج",text:"متى تدع TypeScript يستنتج:"},{depth:3,id:"متى-تكون-صريحا",text:"متى تكون صريحًا:"},{depth:2,id:"التوازن",text:"التوازن"}],e=`<p>لعلّك لاحظت أن TypeScript ذكي إلى حدّ كبير في استنتاج الأنواع من تلقاء نفسه. لكن متى تتركه يعمل سحره، ومتى تكون صريحًا؟ فلنتقن فنّ استنتاج الأنواع لنكتب شيفرة React أنظف وأقلّ تكرارًا.</p>
<h2 id="القاعدة-الذهبية">القاعدة الذهبية</h2>
<p>الأمر المهمّ في استنتاج الأنواع هو: <strong>كن صريحًا عند الحدود، ضمنيًّا في التنفيذ</strong>. وماذا يعني ذلك؟ لنرَ ذلك في العمل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Over-annotating everything</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">MyComponent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [count, setCount]: [<span class="hljs-built_in">number</span>, <span class="hljs-title class_">React</span>.<span class="hljs-property">Dispatch</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SetStateAction</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">doubled</span>: <span class="hljs-built_in">number</span> = count * <span class="hljs-number">2</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">\`Count is <span class="hljs-subst">\${count}</span>\`</span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Let inference do its job</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">MyComponent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// TypeScript knows it&#x27;s number</span>
  <span class="hljs-keyword">const</span> doubled = count * <span class="hljs-number">2</span>;              <span class="hljs-comment">// Inferred as number</span>
  <span class="hljs-keyword">const</span> message = <span class="hljs-string">\`Count is <span class="hljs-subst">\${count}</span>\`</span>;    <span class="hljs-comment">// Inferred as string</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h2 id="عندما-يكون-typescript-على-علم">عندما يكون TypeScript على علم</h2>
<p>يتفاجأ TypeScript بمدى قدرته على استنتاع الأمور من السياق. وإليك المواقف التي يمكنك الوثوق بالاستنتاج فيها:</p>
<h3 id="تهيئة-المتغيرات">تهيئة المتغيّرات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript infers these perfectly</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">&#x27;Alice&#x27;</span>; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">const</span> age = <span class="hljs-number">30</span>; <span class="hljs-comment">// number</span>
<span class="hljs-keyword">const</span> isActive = <span class="hljs-literal">true</span>; <span class="hljs-comment">// boolean</span>
<span class="hljs-keyword">const</span> items = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]; <span class="hljs-comment">// number[]</span>
<span class="hljs-keyword">const</span> user = { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, name }; <span class="hljs-comment">// { id: number; name: string }</span>

<span class="hljs-comment">// Even complex expressions</span>
<span class="hljs-keyword">const</span> doubled = items.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> x * <span class="hljs-number">2</span>); <span class="hljs-comment">// number[]</span>
<span class="hljs-keyword">const</span> names = users.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">name</span>); <span class="hljs-comment">// string[]</span>
</code></pre>
<h3 id="أنواع-إرجاع-الدوال-في-بعض-الأحيان">أنواع إرجاع الدوال (في بعض الأحيان)</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Return type is inferred from implementation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">calculateTotal</span>(<span class="hljs-params"><span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[]</span>) {
  <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>);
  <span class="hljs-comment">// TypeScript knows this returns number</span>
}

<span class="hljs-comment">// React components have inferred return types</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">{ onClick, children }: <span class="hljs-title class_">ButtonProps</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
  <span class="hljs-comment">// TypeScript knows this returns JSX.Element</span>
};
</code></pre>
<h3 id="توابع-المصفوفات-والدوال-التمريرية">توابع المصفوفات والدوال التمريرية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];

<span class="hljs-comment">// TypeScript infers all the callback parameters and return types</span>
<span class="hljs-keyword">const</span> doubled = numbers.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n * <span class="hljs-number">2</span>);
<span class="hljs-keyword">const</span> evens = numbers.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>);
<span class="hljs-keyword">const</span> sum = numbers.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">acc, n</span>) =&gt;</span> acc + n, <span class="hljs-number">0</span>);

<span class="hljs-comment">// Even with objects</span>
<span class="hljs-keyword">const</span> users = [
  { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span> },
  { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bob&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">25</span> },
];

<span class="hljs-keyword">const</span> names = users.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">name</span>); <span class="hljs-comment">// string[]</span>
<span class="hljs-keyword">const</span> adults = users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">age</span> &gt;= <span class="hljs-number">18</span>); <span class="hljs-comment">// same type as users</span>
</code></pre>
<h2 id="متى-تكون-صريحا">متى تكون صريحًا</h2>
<p>الآن لنتحدّث عن المواقف التي ينبغي أن تكتب فيها الأنواع صراحةً:</p>
<h3 id="معاملات-الدوال">معاملات الدوال</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This won&#x27;t work - parameters need types</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">name</span>) {
  <span class="hljs-comment">// Error: Parameter &#x27;name&#x27; implicitly has an &#x27;any&#x27; type</span>
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hello, <span class="hljs-subst">\${name}</span>\`</span>;
}

<span class="hljs-comment">// ✅ Always type parameters</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hello, <span class="hljs-subst">\${name}</span>\`</span>; <span class="hljs-comment">// Return type is inferred as string</span>
}
</code></pre>
<h3 id="خصائص-المكونات">خصائص المكوّنات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t rely on inference for props</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">{ onClick, children }</span>) =&gt; {  <span class="hljs-comment">// Any types!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Always type your props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">{ onClick, children }: <span class="hljs-title class_">ButtonProps</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};
</code></pre>
<h3 id="المصفوفات-والكائنات-الفارغة">المصفوفات والكائنات الفارغة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ TypeScript can&#x27;t know what you&#x27;ll put in here</span>
<span class="hljs-keyword">const</span> items = []; <span class="hljs-comment">// any[]</span>
items.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;string&#x27;</span>);
items.<span class="hljs-title function_">push</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// No error!</span>

<span class="hljs-comment">// ✅ Be explicit about empty collections</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">items</span>: <span class="hljs-built_in">string</span>[] = [];
items.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;string&#x27;</span>); <span class="hljs-comment">// OK</span>
items.<span class="hljs-title function_">push</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// Error!</span>

<span class="hljs-comment">// Same with objects</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">cache</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">User</span>&gt; = {};
</code></pre>
<h3 id="عندما-تريد-تقييد-الأنواع">عندما تريد تقييد الأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// You want to ensure this can only be specific values</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;pending&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;

<span class="hljs-comment">// ❌ Without annotation, it&#x27;s just string</span>
<span class="hljs-keyword">const</span> status = <span class="hljs-string">&#x27;pending&#x27;</span>; <span class="hljs-comment">// string</span>

<span class="hljs-comment">// ✅ With annotation, it&#x27;s constrained</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">status</span>: <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;pending&#x27;</span>; <span class="hljs-comment">// Status</span>

<span class="hljs-comment">// This prevents mistakes</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">status2</span>: <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;complete&#x27;</span>; <span class="hljs-comment">// Error!</span>
</code></pre>
<h2 id="أنماط-الاستنتاج-المتقدمة">أنماط الاستنتاج المتقدّمة</h2>
<h3 id="تأكيدات-const">تأكيدات const</h3>
<p>أحيانًا تريد من TypeScript أن يكون أكثر تحديدًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Without const assertion</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">endpoint</span>: <span class="hljs-string">&#x27;/api/users&#x27;</span>,
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
};
<span class="hljs-comment">// Type: { endpoint: string; method: string }</span>

<span class="hljs-comment">// With const assertion</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">endpoint</span>: <span class="hljs-string">&#x27;/api/users&#x27;</span>,
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;GET&#x27;</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
<span class="hljs-comment">// Type: { readonly endpoint: &#x27;/api/users&#x27;; readonly method: &#x27;GET&#x27; }</span>

<span class="hljs-comment">// Useful for arrays too</span>
<span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&#x27;red&#x27;</span>, <span class="hljs-string">&#x27;green&#x27;</span>, <span class="hljs-string">&#x27;blue&#x27;</span>] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
<span class="hljs-comment">// Type: readonly [&#x27;red&#x27;, &#x27;green&#x27;, &#x27;blue&#x27;]</span>
</code></pre>
<h3 id="الكتابة-السياقية-contextual-typing">الكتابة السياقية (contextual typing)</h3>
<p>يستخدم TypeScript السياق لاستنتاج الأنواع في مواقف كثيرة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Event handlers in React</span>
&lt;button onClick={<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-comment">// TypeScript knows e is MouseEvent&lt;HTMLButtonElement&gt;</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">disabled</span>);
}}&gt;
  <span class="hljs-title class_">Click</span> me
&lt;/button&gt;

<span class="hljs-comment">// Array.forEach callbacks</span>
[<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-string">&#x27;c&#x27;</span>].<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">letter, index</span>) =&gt;</span> {
  <span class="hljs-comment">// TypeScript knows letter is string, index is number</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${index}</span>: <span class="hljs-subst">\${letter.toUpperCase()}</span>\`</span>);
});
</code></pre>
<h3 id="استنتاج-الأنواع-العامة">استنتاج الأنواع العامة</h3>
<p>TypeScript متفوق في استنتاج الأنواع العامة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic function</span>
<span class="hljs-keyword">function</span> identity&lt;T&gt;(<span class="hljs-attr">value</span>: T): T {
  <span class="hljs-keyword">return</span> value;
}

<span class="hljs-comment">// You don&#x27;t need to specify T</span>
<span class="hljs-keyword">const</span> num = <span class="hljs-title function_">identity</span>(<span class="hljs-number">42</span>); <span class="hljs-comment">// T is inferred as number</span>
<span class="hljs-keyword">const</span> str = <span class="hljs-title function_">identity</span>(<span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// T is inferred as string</span>

<span class="hljs-comment">// With React hooks</span>
<span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
<span class="hljs-comment">// But if you have an initial value:</span>
<span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// Generic inferred as number</span>
</code></pre>
<h2 id="الاستنتاج-الخاص-بـ-react">الاستنتاج الخاص بـ React</h2>
<h3 id="استنتاج-usestate">استنتاج <code>useState</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript infers from initial value</span>
<span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// number</span>
<span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>); <span class="hljs-comment">// string</span>
<span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]); <span class="hljs-comment">// Need explicit type for empty array</span>

<span class="hljs-comment">// Complex state</span>
<span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>({
  <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>,
}); <span class="hljs-comment">// { id: number; name: string }</span>
</code></pre>
<h3 id="استنتاج-usereducer">استنتاج <code>useReducer</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript infers a lot from your reducer</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">reducer</span> = (<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">State</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">Action</span></span>) =&gt; {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;increment&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> + <span class="hljs-number">1</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;decrement&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> - <span class="hljs-number">1</span> };
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">return</span> state;
  }
};

<span class="hljs-comment">// TypeScript knows the state type and dispatch signature</span>
<span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(reducer, { <span class="hljs-attr">count</span>: <span class="hljs-number">0</span> });
</code></pre>
<h3 id="استنتاج-معالج-الأحداث">استنتاج معالِج الأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Form</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-comment">// TypeScript infers the event type from usage</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-comment">// Process form</span>
  };

  <span class="hljs-comment">// Or let inference handle it in JSX</span>
  <span class="hljs-keyword">return</span> (
    &lt;form onSubmit={e =&gt; {
      // e is inferred as React.FormEvent&lt;HTMLFormElement&gt;
      e.preventDefault();
    }}&gt;
      &lt;input onChange={e =&gt; {
        // e is inferred as React.ChangeEvent&lt;HTMLInputElement&gt;
        console.log(e.target.value);
      }} /&gt;
    &lt;/form&gt;
  );
};
</code></pre>
<h2 id="الاستنتاج-عبر-تدفق-التحكم">الاستنتاج عبر تدفّق التحكم</h2>
<p>يصبح TypeScript أذكى كلّما ضيّقَت أنماطك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processValue</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span></span>) {
  <span class="hljs-keyword">if</span> (value === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;No value&#x27;</span>;
  }
  <span class="hljs-comment">// TypeScript knows value is string | number here</span>

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-comment">// TypeScript knows value is string here</span>
    <span class="hljs-keyword">return</span> value.<span class="hljs-title function_">toUpperCase</span>();
  }

  <span class="hljs-comment">// TypeScript knows value is number here</span>
  <span class="hljs-keyword">return</span> value.<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>);
}
</code></pre>
<h2 id="التفكيك-والاستنتاج">التفكيك والاستنتاج</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript infers through destructuring</span>
<span class="hljs-keyword">const</span> { name, age } = user; <span class="hljs-comment">// Types inferred from user</span>

<span class="hljs-comment">// In function parameters</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">greet</span>(<span class="hljs-params">{ name, age }: <span class="hljs-title class_">User</span></span>) {
  <span class="hljs-comment">// name is string, age is number</span>
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${name}</span> is <span class="hljs-subst">\${age}</span> years old\`</span>;
}

<span class="hljs-comment">// With arrays</span>
<span class="hljs-keyword">const</span> [first, second] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]; <span class="hljs-comment">// both are number</span>
<span class="hljs-keyword">const</span> [str, num] = [<span class="hljs-string">&#x27;hello&#x27;</span>, <span class="hljs-number">42</span>]; <span class="hljs-comment">// str is string, num is number</span>
</code></pre>
<h2 id="معامل-satisfies">معامل satisfies</h2>
<p>قدّم TypeScript 4.9 المعامل <code>satisfies</code> لتحسين الاستنتاج مع القيود:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Without satisfies - loses specific types</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt; = {
  <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-string">&#x27;localhost&#x27;</span>,
};
config.<span class="hljs-property">port</span>.<span class="hljs-title function_">toFixed</span>(); <span class="hljs-comment">// Error! port is string | number</span>

<span class="hljs-comment">// With satisfies - keeps specific types</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-string">&#x27;localhost&#x27;</span>,
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;;
config.<span class="hljs-property">port</span>.<span class="hljs-title function_">toFixed</span>(); <span class="hljs-comment">// Works! port is number</span>
</code></pre>
<h2 id="أخطاء-الاستنتاج-الشائعة">أخطاء الاستنتاج الشائعة</h2>
<h3 id="التوسيع-widening">التوسيع (widening)</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript widens types by default</span>
<span class="hljs-keyword">let</span> status = <span class="hljs-string">&#x27;pending&#x27;</span>; <span class="hljs-comment">// string, not &#x27;pending&#x27;</span>
status = <span class="hljs-string">&#x27;complete&#x27;</span>; <span class="hljs-comment">// Allowed</span>

<span class="hljs-comment">// Prevent widening with const</span>
<span class="hljs-keyword">const</span> status = <span class="hljs-string">&#x27;pending&#x27;</span>; <span class="hljs-comment">// &#x27;pending&#x27;</span>

<span class="hljs-comment">// Or with type annotation</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span> | <span class="hljs-string">&#x27;complete&#x27;</span> = <span class="hljs-string">&#x27;pending&#x27;</span>;
</code></pre>
<h3 id="استنتاج-خصائص-الكائنات">استنتاج خصائص الكائنات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Properties are widened</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">retries</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">1000</span>,
};
<span class="hljs-comment">// Type: { retries: number; timeout: number }</span>

<span class="hljs-comment">// Use as const for literal types</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">retries</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">1000</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
<span class="hljs-comment">// Type: { readonly retries: 3; readonly timeout: 1000 }</span>
</code></pre>
<h3 id="مشكلات-أنواع-إرجاع-الدوال">مشكلات أنواع إرجاع الدوال</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Sometimes you need explicit return types</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createUser</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">if</span> (!name) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">// Oops, now return type is User | null</span>
  }
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">id</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), name };
}

<span class="hljs-comment">// Be explicit when the return type matters</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createUser</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">if</span> (!name) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Name required&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">id</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), name };
}
</code></pre>
<h2 id="أفضل-الممارسات-في-react">أفضل الممارسات في React</h2>
<h3 id="دع-الخطافات-تستنتج-متى-أمكن">دع الخُطّافات تستنتج متى أمكن</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - let TypeScript infer</span>
<span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
<span class="hljs-keyword">const</span> mounted = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">false</span>);
<span class="hljs-keyword">const</span> id = <span class="hljs-title function_">useId</span>();

<span class="hljs-comment">// ❌ Unnecessary - TypeScript already knows</span>
<span class="hljs-keyword">const</span> [count, setCount] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);
<span class="hljs-keyword">const</span> mounted = useRef&lt;<span class="hljs-built_in">boolean</span>&gt;(<span class="hljs-literal">false</span>);
<span class="hljs-keyword">const</span> <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> = <span class="hljs-title function_">useId</span>();
</code></pre>
<h3 id="كن-صريحا-عند-حدود-المكونات">كن صريحًا عند حدود المكوّنات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Always type props</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CardProps</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">description</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Card</span> = (<span class="hljs-params">{ title, description }: <span class="hljs-title class_">CardProps</span></span>) =&gt; {
  <span class="hljs-comment">// Let inference handle the rest</span>
  <span class="hljs-keyword">const</span> hasDescription = !!description;
  <span class="hljs-keyword">const</span> charCount = title.<span class="hljs-property">length</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      {hasDescription &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{description}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="استخدم-الاستنتاج-لمعالجات-الأحداث">استخدم الاستنتاج لمعالِجات الأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">SearchForm</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    &lt;form
      onSubmit={e =&gt; {
        // Let TypeScript infer e as React.FormEvent&lt;HTMLFormElement&gt;
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // Process form
      }}
    &gt;
      &lt;input
        onChange={e =&gt; {
          // Let TypeScript infer e as React.ChangeEvent&lt;HTMLInputElement&gt;
          console.log(e.target.value);
        }}
      /&gt;
    &lt;/form&gt;
  );
};
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>لا يؤثّر استنتاج الأنواع في أداء وقت التشغيل، لكنه قد يؤثّر في سرعة تصريف TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Faster - explicit types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserListProps</span> {
  <span class="hljs-attr">users</span>: <span class="hljs-title class_">User</span>[];
  <span class="hljs-attr">onSelect</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">UserList</span> = (<span class="hljs-params">{ users, onSelect }: <span class="hljs-title class_">UserListProps</span></span>) =&gt; {
  <span class="hljs-comment">// Implementation</span>
};

<span class="hljs-comment">// Slower - complex inference</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">UserList</span> = (<span class="hljs-params">{
  users,
  onSelect,
}: {
  users: <span class="hljs-built_in">Array</span>&lt;{
    id: <span class="hljs-built_in">number</span>;
    name: <span class="hljs-built_in">string</span>;
    email: <span class="hljs-built_in">string</span>;
    profile: {
      avatar: <span class="hljs-built_in">string</span>;
      bio: <span class="hljs-built_in">string</span>;
    };
  }&gt;;
  onSelect: (user: {
    id: <span class="hljs-built_in">number</span>;
    name: <span class="hljs-built_in">string</span>;
    email: <span class="hljs-built_in">string</span>;
    profile: {
      avatar: <span class="hljs-built_in">string</span>;
      bio: <span class="hljs-built_in">string</span>;
    };
  }) =&gt; <span class="hljs-built_in">void</span>;
}</span>) =&gt; {
  <span class="hljs-comment">// Implementation</span>
};
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي">مثال من العالم الحقيقي</h2>
<p>لنجمع كل ذلك معًا في مكوّن حقيقي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define types at boundaries</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Task</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TaskListProps</span> {
  <span class="hljs-attr">initialTasks</span>?: <span class="hljs-title class_">Task</span>[];
  <span class="hljs-attr">onTaskComplete</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">taskId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">TaskList</span> = (<span class="hljs-params">{ initialTasks = [], onTaskComplete }: <span class="hljs-title class_">TaskListProps</span></span>) =&gt; {
  <span class="hljs-comment">// Let inference handle internal state</span>
  <span class="hljs-keyword">const</span> [tasks, setTasks] = <span class="hljs-title function_">useState</span>(initialTasks);
  <span class="hljs-keyword">const</span> [filter, setFilter] = useState&lt;<span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>&gt;(<span class="hljs-string">&#x27;all&#x27;</span>);

  <span class="hljs-comment">// Inference for computed values</span>
  <span class="hljs-keyword">const</span> filteredTasks = tasks.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">task</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;all&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-keyword">return</span> !task.<span class="hljs-property">completed</span>;
    <span class="hljs-keyword">return</span> task.<span class="hljs-property">completed</span>;
  });

  <span class="hljs-keyword">const</span> stats = {
    <span class="hljs-attr">total</span>: tasks.<span class="hljs-property">length</span>,
    <span class="hljs-attr">completed</span>: tasks.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">completed</span>).<span class="hljs-property">length</span>,
    <span class="hljs-attr">active</span>: tasks.<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> !t.<span class="hljs-property">completed</span>).<span class="hljs-property">length</span>
  };

  <span class="hljs-comment">// Event handlers with inferred types</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleToggle</span> = (<span class="hljs-params"><span class="hljs-attr">taskId</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setTasks</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> prev.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">task</span> =&gt;</span>
      task.<span class="hljs-property">id</span> === taskId
        ? { ...task, <span class="hljs-attr">completed</span>: !task.<span class="hljs-property">completed</span> }
        : task
    ));

    <span class="hljs-keyword">const</span> task = tasks.<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">id</span> === taskId);
    <span class="hljs-keyword">if</span> (task &amp;&amp; !task.<span class="hljs-property">completed</span>) {
      onTaskComplete?.(taskId);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {/* Let TypeScript infer event types */}
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{e</span> =&gt;</span> setFilter(e.target.value as typeof filter)}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;all&quot;</span>&gt;</span>All ({stats.total})<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span>Active ({stats.active})<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;completed&quot;</span>&gt;</span>Completed ({stats.completed})<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {filteredTasks.map(task =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{task.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span>
                <span class="hljs-attr">checked</span>=<span class="hljs-string">{task.completed}</span>
                <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> handleToggle(task.id)}
              /&gt;
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{task.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="خلاصة-الإرشادات">خلاصة الإرشادات</h2>
<h3 id="متى-تدع-typescript-يستنتج">متى تدع TypeScript يستنتج:</h3>
<ol>
<li>تهيئة المتغيّرات بقيم</li>
<li>أنواع إرجاع الدوال البسيطة</li>
<li>معاملات الدوال التمريرية في توابع المصفوفات</li>
<li>معالِجات الأحداث في JSX</li>
<li>معاملات الأنواع العامة ذات السياق الواضح</li>
<li>القيم المحسوبة والتحويلات</li>
</ol>
<h3 id="متى-تكون-صريحا">متى تكون صريحًا:</h3>
<ol>
<li>معاملات الدوال</li>
<li>خصائص المكوّنات</li>
<li>المصفوفات والكائنات الفارغة</li>
<li>أنواع الاتحادات والقيود</li>
<li>حدود واجهة API العامة</li>
<li>أنواع الإرجاع المعقّدة</li>
<li>حين يكون الاستنتاج <code>any</code></li>
</ol>
<h2 id="التوازن">التوازن</h2>
<p>المفتاح هو إيجاد التوازن الصحيح. فالإفراط في شروح الأنواع يجعل شيفرتك مطوّلة وأصعب في القراءة، والإفراط في نقصها يفقدك سلامة الأنواع. فاتّبع هذه المبادئ:</p>
<ol>
<li><strong>كن صريحًا عند الحدود</strong> — معاملات الدوال، وخصائص المكوّنات، وتصديرات الوحدات</li>
<li><strong>دع الاستنتاج يعمل في الداخل</strong> — المتغيّرات المحلية، والقيم المحسوبة، والتحويلات البسيطة</li>
<li><strong>أضف الأنواع حين تضيف قيمة</strong> — القيود، والتوثيق، ومنع الأخطاء</li>
<li><strong>احذف الأنواع التي لا تضيف شيئًا</strong> — الشروح المكرّرة والاستنتاجات البديهية</li>
</ol>
<p>تذكّر: استنتاج TypeScript موجود ليساعدك على كتابة شيفرة أنظف وأسهل في الصيانة. واستخدمه بحكمة، وستكون مكوّنات React لديك آمنةً من حيث الأنواع ومقروءةً في آنٍ واحد.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
