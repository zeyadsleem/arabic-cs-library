const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-generics-deep-dive",p="غوص عميق في الأنواع العامة (Generics) في TypeScript",t=[{depth:2,id:"فهم-الأنواع-العامة-النموذج-الذهني",text:"فهم الأنواع العامة: النموذج الذهني"},{depth:3,id:"المشكلة-التي-تحلها-الأنواع-العامة",text:"المشكلة التي تحلها الأنواع العامة"},{depth:3,id:"معاملات-النوع-تشبه-معاملات-الدالة",text:"معاملات النوع تشبه معاملات الدالة"},{depth:2,id:"الدوال-العامة",text:"الدوال العامة"},{depth:3,id:"الدوال-العامة-الأساسية",text:"الدوال العامة الأساسية"},{depth:3,id:"قيود-معاملات-النوع",text:"قيود معاملات النوع"},{depth:3,id:"استنتاج-الأنواع-العامة",text:"استنتاج الأنواع العامة"},{depth:2,id:"الواجهات-والأنواع-العامة",text:"الواجهات والأنواع العامة"},{depth:3,id:"الواجهات-العامة",text:"الواجهات العامة"},{depth:3,id:"الأسماء-المستعارة-للأنواع-العامة",text:"الأسماء المستعارة للأنواع العامة"},{depth:2,id:"الأصناف-العامة",text:"الأصناف العامة"},{depth:3,id:"الأصناف-العامة-الأساسية",text:"الأصناف العامة الأساسية"},{depth:3,id:"وراثة-الأصناف-العامة",text:"وراثة الأصناف العامة"},{depth:3,id:"الأعضاء-الساكنة-في-الأصناف-العامة",text:"الأعضاء الساكنة في الأصناف العامة"},{depth:2,id:"أنماط-الأنواع-العامة-المتقدمة",text:"أنماط الأنواع العامة المتقدمة"},{depth:3,id:"الأنواع-الشرطية-مع-الأنواع-العامة",text:"الأنواع الشرطية مع الأنواع العامة"},{depth:3,id:"الأنواع-المعينة-مع-الأنواع-العامة",text:"الأنواع المعيَّنة مع الأنواع العامة"},{depth:3,id:"قيود-الأنواع-العامة-مع-الأنواع-الشرطية",text:"قيود الأنواع العامة مع الأنواع الشرطية"},{depth:2,id:"التباين-في-الأنواع-العامة",text:"التباين في الأنواع العامة"},{depth:3,id:"التباين-المشترك-والتباين-المضاد",text:"التباين المشترك والتباين المضاد"},{depth:3,id:"التباين-الثنائي-في-معاملات-الدوال",text:"التباين الثنائي في معاملات الدوال"},{depth:2,id:"أفضل-ممارسات-الأنواع-العامة",text:"أفضل ممارسات الأنواع العامة"},{depth:3,id:"استخدم-أسماء-وصفية-لمعاملات-النوع",text:"استخدم أسماء وصفية لمعاملات النوع"},{depth:3,id:"ابدأ-ببساطة-وأضف-القيود-عند-الحاجة",text:"ابدأ ببساطة، وأضف القيود عند الحاجة"},{depth:3,id:"تجنب-الإفراط-في-التعميم",text:"تجنّب الإفراط في التعميم"},{depth:2,id:"أنماط-الأنواع-العامة-في-العالم-الحقيقي",text:"أنماط الأنواع العامة في العالم الحقيقي"},{depth:3,id:"نمط-المستودع",text:"نمط المستودع"},{depth:3,id:"نمط-باث-الأحداث",text:"نمط باثّ الأحداث"},{depth:3,id:"نمط-الباني",text:"نمط الباني"},{depth:2,id:"أدوات-الأنواع-العامة",text:"أدوات الأنواع العامة"},{depth:3,id:"إنشاء-أدوات-الأنواع-الخاصة-بك",text:"إنشاء أدوات الأنواع الخاصة بك"},{depth:2,id:"المزالق-الشائعة-والحلول",text:"المزالق الشائعة والحلول"},{depth:3,id:"القيم-الافتراضية-لمعاملات-النوع",text:"القيم الافتراضية لمعاملات النوع"},{depth:3,id:"حراس-الأنواع-العامة",text:"حراس الأنواع العامة"},{depth:2,id:"الأنواع-العامة-في-مكونات-react",text:"الأنواع العامة في مكونات React"},{depth:3,id:"خصائص-المكون-العام",text:"خصائص المكوّن العام"},{depth:3,id:"مكونات-النماذج-العامة",text:"مكونات النماذج العامة"},{depth:3,id:"مكون-القائمة-المنسدلة-العام",text:"مكوّن القائمة المنسدلة العام"},{depth:3,id:"الخطافات-المخصصة-العامة",text:"الخطافات المخصصة العامة"},{depth:3,id:"نمط-السياق-العام",text:"نمط السياق العام"},{depth:3,id:"مكون-النافذة-المنبثقة-العام",text:"مكوّن النافذة المنبثقة العام"},{depth:2,id:"متى-تستخدم-الأنواع-العامة",text:"متى تستخدم الأنواع العامة"},{depth:2,id:"خاتمة",text:"خاتمة"}],e=`<p>الأنواع العامة (Generics) هي القوة الخارقة في TypeScript لكتابة شيفرة قابلة لإعادة الاستخدام وآمنة نوعيًا. إنها تشبه معاملات الدوال، لكنها للأنواع. وحين تفهم الأنواع العامة فهمًا حقيقيًا، ستكتب شيفرة أقل تفعل أكثر، وستكون أكثر أمانًا من أي وقت مضى. لكن الأنواع العامة قد تبدو مخيفة بكل تلك الأقواس الزاوية ومعاملات الأنواع المجردة. دعنا نزيل الغموض عنها تمامًا.</p>
<p>فكّر في الأنواع العامة كقوالب أو مخططات. فكما يمكن لقالب البسكويت أن يصنع بسكويتًا من أي نوع من العجين مع الحفاظ على الشكل نفسه، تتيح لك الأنواع العامة كتابة أنماط شيفرة تعمل مع أي نوع مع الحفاظ على أمان الأنواع.</p>
<h2 id="فهم-الأنواع-العامة-النموذج-الذهني">فهم الأنواع العامة: النموذج الذهني</h2>
<p>قبل الغوص في الصياغة، دعنا نبني النموذج الذهني الصحيح للتفكير في الأنواع العامة.</p>
<h3 id="المشكلة-التي-تحلها-الأنواع-العامة">المشكلة التي تحلها الأنواع العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Without generics, we duplicate code for different types</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getFirstNumber</span>(<span class="hljs-params"><span class="hljs-attr">arr</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span> {
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">0</span>];
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getFirstString</span>(<span class="hljs-params"><span class="hljs-attr">arr</span>: <span class="hljs-built_in">string</span>[]</span>): <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span> {
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">0</span>];
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getFirstBoolean</span>(<span class="hljs-params"><span class="hljs-attr">arr</span>: <span class="hljs-built_in">boolean</span>[]</span>): <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">undefined</span> {
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">0</span>];
}

<span class="hljs-comment">// Or we lose type safety with any</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getFirstAny</span>(<span class="hljs-params"><span class="hljs-attr">arr</span>: <span class="hljs-built_in">any</span>[]</span>): <span class="hljs-built_in">any</span> {
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">0</span>]; <span class="hljs-comment">// No type safety!</span>
}

<span class="hljs-comment">// With generics, we write once and preserve types</span>
<span class="hljs-keyword">function</span> getFirst&lt;T&gt;(<span class="hljs-attr">arr</span>: T[]): T | <span class="hljs-literal">undefined</span> {
  <span class="hljs-keyword">return</span> arr[<span class="hljs-number">0</span>];
}

<span class="hljs-comment">// TypeScript infers the type</span>
<span class="hljs-keyword">const</span> firstNumber = <span class="hljs-title function_">getFirst</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// number | undefined</span>
<span class="hljs-keyword">const</span> firstString = <span class="hljs-title function_">getFirst</span>([<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-string">&#x27;c&#x27;</span>]); <span class="hljs-comment">// string | undefined</span>
<span class="hljs-keyword">const</span> firstUser = <span class="hljs-title function_">getFirst</span>([{ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> }]); <span class="hljs-comment">// { name: string } | undefined</span>
</code></pre>
<h3 id="معاملات-النوع-تشبه-معاملات-الدالة">معاملات النوع تشبه معاملات الدالة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Regular function with value parameters</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">add</span>(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-comment">// Generic function with type parameters</span>
<span class="hljs-keyword">function</span> identity&lt;T&gt;(<span class="hljs-attr">value</span>: T): T {
  <span class="hljs-keyword">return</span> value;
}

<span class="hljs-comment">// Multiple parameters work the same way</span>
<span class="hljs-keyword">function</span> pair&lt;T, U&gt;(<span class="hljs-attr">first</span>: T, <span class="hljs-attr">second</span>: U): [T, U] {
  <span class="hljs-keyword">return</span> [first, second];
}

<span class="hljs-comment">// You can even have default type parameters</span>
<span class="hljs-keyword">function</span> createArray&lt;T = <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr">length</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">value</span>: T): T[] {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>(length).<span class="hljs-title function_">fill</span>(value);
}

<span class="hljs-keyword">const</span> strings = <span class="hljs-title function_">createArray</span>(<span class="hljs-number">3</span>, <span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// string[]</span>
<span class="hljs-keyword">const</span> numbers = <span class="hljs-title function_">createArray</span>(<span class="hljs-number">3</span>, <span class="hljs-number">42</span>); <span class="hljs-comment">// number[]</span>
<span class="hljs-keyword">const</span> defaultStrings = <span class="hljs-title function_">createArray</span>(<span class="hljs-number">3</span>, <span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// string[] (uses default)</span>
</code></pre>
<h2 id="الدوال-العامة">الدوال العامة</h2>
<p>دعنا نستكشف أنماطًا مختلفة للدوال العامة.</p>
<h3 id="الدوال-العامة-الأساسية">الدوال العامة الأساسية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Simple generic function</span>
<span class="hljs-keyword">function</span> clone&lt;T&gt;(<span class="hljs-attr">value</span>: T): T {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(value));
}

<span class="hljs-comment">// Multiple type parameters</span>
<span class="hljs-keyword">function</span> swap&lt;T, U&gt;(<span class="hljs-attr">tuple</span>: [T, U]): [U, T] {
  <span class="hljs-keyword">return</span> [tuple[<span class="hljs-number">1</span>], tuple[<span class="hljs-number">0</span>]];
}

<span class="hljs-keyword">const</span> swapped = <span class="hljs-title function_">swap</span>([<span class="hljs-string">&#x27;hello&#x27;</span>, <span class="hljs-number">42</span>]); <span class="hljs-comment">// [number, string]</span>

<span class="hljs-comment">// Generic arrow functions</span>
<span class="hljs-keyword">const</span> identity = &lt;T&gt;(<span class="hljs-attr">value</span>: T): <span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span> value;

<span class="hljs-comment">// In TSX files, use trailing comma to avoid JSX ambiguity</span>
<span class="hljs-keyword">const</span> identity2 = &lt;T&gt;(<span class="hljs-attr">value</span>: T): <span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span> value;

<span class="hljs-comment">// Generic function expressions</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">processList</span>: &lt;T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">items</span>: T[]</span>) =&gt;</span> T[] = <span class="hljs-function">(<span class="hljs-params">items</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>);
};
</code></pre>
<h3 id="قيود-معاملات-النوع">قيود معاملات النوع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Unconstrained generics accept any type</span>
<span class="hljs-keyword">function</span> logLength&lt;T&gt;(<span class="hljs-attr">value</span>: T) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value.<span class="hljs-property">length</span>); <span class="hljs-comment">// ❌ Error: T might not have length</span>
}

<span class="hljs-comment">// Constrain T to types with a length property</span>
<span class="hljs-keyword">function</span> logLength&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">length</span>: <span class="hljs-built_in">number</span> }&gt;(<span class="hljs-attr">value</span>: T): T {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value.<span class="hljs-property">length</span>); <span class="hljs-comment">// ✅ Works!</span>
  <span class="hljs-keyword">return</span> value;
}

<span class="hljs-title function_">logLength</span>(<span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// Works: string has length</span>
<span class="hljs-title function_">logLength</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// Works: array has length</span>
<span class="hljs-title function_">logLength</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">5</span> }); <span class="hljs-comment">// Works: has length property</span>
<span class="hljs-title function_">logLength</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// ❌ Error: number doesn&#x27;t have length</span>

<span class="hljs-comment">// Multiple constraints</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Timestamped</span> {
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Named</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> processRecord&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Timestamped</span> &amp; <span class="hljs-title class_">Named</span>&gt;(<span class="hljs-attr">record</span>: T): T {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${record.name}</span> at <span class="hljs-subst">\${record.timestamp}</span>\`</span>);
  <span class="hljs-keyword">return</span> record;
}

<span class="hljs-comment">// Using keyof for property constraints</span>
<span class="hljs-keyword">function</span> getProperty&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">obj</span>: T, <span class="hljs-attr">key</span>: K): T[K] {
  <span class="hljs-keyword">return</span> obj[key];
}

<span class="hljs-keyword">const</span> person = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">city</span>: <span class="hljs-string">&#x27;NYC&#x27;</span> };
<span class="hljs-keyword">const</span> name = <span class="hljs-title function_">getProperty</span>(person, <span class="hljs-string">&#x27;name&#x27;</span>); <span class="hljs-comment">// string</span>
<span class="hljs-keyword">const</span> age = <span class="hljs-title function_">getProperty</span>(person, <span class="hljs-string">&#x27;age&#x27;</span>); <span class="hljs-comment">// number</span>
<span class="hljs-keyword">const</span> invalid = <span class="hljs-title function_">getProperty</span>(person, <span class="hljs-string">&#x27;height&#x27;</span>); <span class="hljs-comment">// ❌ Error: &#x27;height&#x27; doesn&#x27;t exist</span>
</code></pre>
<h3 id="استنتاج-الأنواع-العامة">استنتاج الأنواع العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript infers type parameters when possible</span>
<span class="hljs-keyword">function</span> map&lt;T, U&gt;(<span class="hljs-attr">array</span>: T[], <span class="hljs-attr">fn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> U): U[] {
  <span class="hljs-keyword">return</span> array.<span class="hljs-title function_">map</span>(fn);
}

<span class="hljs-comment">// No need to specify types - TypeScript infers them</span>
<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">const</span> strings = <span class="hljs-title function_">map</span>(numbers, <span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n.<span class="hljs-title function_">toString</span>()); <span class="hljs-comment">// string[]</span>
<span class="hljs-keyword">const</span> doubled = <span class="hljs-title function_">map</span>(numbers, <span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> n * <span class="hljs-number">2</span>); <span class="hljs-comment">// number[]</span>

<span class="hljs-comment">// Sometimes you need to help TypeScript</span>
<span class="hljs-keyword">function</span> createPair&lt;T&gt;(<span class="hljs-attr">value</span>: T): [T, T] {
  <span class="hljs-keyword">return</span> [value, value];
}

<span class="hljs-comment">// Explicit type argument</span>
<span class="hljs-keyword">const</span> pair1 = createPair&lt;<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>&gt;(<span class="hljs-string">&#x27;hello&#x27;</span>);
<span class="hljs-comment">// Type: [string | number, string | number]</span>

<span class="hljs-comment">// Inferred type</span>
<span class="hljs-keyword">const</span> pair2 = <span class="hljs-title function_">createPair</span>(<span class="hljs-string">&#x27;hello&#x27;</span>);
<span class="hljs-comment">// Type: [string, string]</span>

<span class="hljs-comment">// Partial type argument inference (coming in future TypeScript)</span>
<span class="hljs-keyword">function</span> partialInfer&lt;T, U = <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr">t</span>: T, <span class="hljs-attr">u</span>: U): [T, U] {
  <span class="hljs-keyword">return</span> [t, u];
}
</code></pre>
<h2 id="الواجهات-والأنواع-العامة">الواجهات والأنواع العامة</h2>
<p>تعمل الأنواع العامة مع الواجهات والأسماء المستعارة للأنواع أيضًا.</p>
<h3 id="الواجهات-العامة">الواجهات العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic interface</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Container</span>&lt;T&gt; {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-title function_">getValue</span>(): T;
  <span class="hljs-title function_">setValue</span>(<span class="hljs-attr">value</span>: T): <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// Implementation specifies the type</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">StringContainer</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">Container</span>&lt;<span class="hljs-built_in">string</span>&gt; {
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">&#x27;&#x27;</span>;

  <span class="hljs-title function_">getValue</span>(): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span>;
  }

  <span class="hljs-title function_">setValue</span>(<span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span> = value;
  }
}

<span class="hljs-comment">// Generic interface with multiple parameters</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">KeyValuePair</span>&lt;K, V&gt; {
  <span class="hljs-attr">key</span>: K;
  <span class="hljs-attr">value</span>: V;
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">pair</span>: <span class="hljs-title class_">KeyValuePair</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt; = {
  <span class="hljs-attr">key</span>: <span class="hljs-string">&#x27;age&#x27;</span>,
  <span class="hljs-attr">value</span>: <span class="hljs-number">30</span>
};

<span class="hljs-comment">// Generic interface with constraints</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Comparable</span>&lt;T&gt; {
  <span class="hljs-title function_">compareTo</span>(<span class="hljs-attr">other</span>: T): <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SortedList</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Comparable</span>&lt;T&gt;&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-title function_">add</span>(<span class="hljs-attr">item</span>: T): <span class="hljs-built_in">void</span>;
  getS <span class="hljs-title function_">orted</span>(): T[];
}
</code></pre>
<h3 id="الأسماء-المستعارة-للأنواع-العامة">الأسماء المستعارة للأنواع العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic type alias</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Result</span>&lt;T&gt; = { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">function</span> processData&lt;T&gt;(<span class="hljs-attr">data</span>: T): <span class="hljs-title class_">Result</span>&lt;T&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// Process data...</span>
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>, data };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span> };
  }
}

<span class="hljs-comment">// Generic union types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Nullable</span>&lt;T&gt; = T | <span class="hljs-literal">null</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Optional</span>&lt;T&gt; = T | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Maybe</span>&lt;T&gt; = T | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;

<span class="hljs-comment">// Generic tuple types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Pair</span>&lt;T&gt; = [T, T];
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Triple</span>&lt;T&gt; = [T, T, T];
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Tuple</span>&lt;T, N <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>&gt; = T[] &amp; { <span class="hljs-attr">length</span>: N };

<span class="hljs-comment">// Generic function types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Predicate</span>&lt;T&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">boolean</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Mapper</span>&lt;T, U&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> U;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Reducer</span>&lt;T, U&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">acc</span>: U, <span class="hljs-attr">value</span>: T</span>) =&gt;</span> U;
</code></pre>
<h2 id="الأصناف-العامة">الأصناف العامة</h2>
<p>يمكن أن تكون الأصناف عامة أيضًا، فتوفّر حاويات وهياكل بيانات آمنة نوعيًا.</p>
<h3 id="الأصناف-العامة-الأساسية">الأصناف العامة الأساسية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic class</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Box</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">value</span>: T;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span> = value;
  }

  <span class="hljs-title function_">getValue</span>(): T {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span>;
  }

  <span class="hljs-title function_">setValue</span>(<span class="hljs-attr">value</span>: T): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span> = value;
  }
}

<span class="hljs-keyword">const</span> stringBox = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Box</span>&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;hello&#x27;</span>);
<span class="hljs-keyword">const</span> numberBox = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Box</span>&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">42</span>);
<span class="hljs-keyword">const</span> inferredBox = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Box</span>(<span class="hljs-string">&#x27;inferred&#x27;</span>); <span class="hljs-comment">// Box&lt;string&gt;</span>

<span class="hljs-comment">// Generic class with multiple type parameters</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Pair</span>&lt;T, U&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">public</span> <span class="hljs-attr">first</span>: T,
    <span class="hljs-keyword">public</span> <span class="hljs-attr">second</span>: U,
  </span>) {}

  <span class="hljs-title function_">swap</span>(): <span class="hljs-title class_">Pair</span>&lt;U, T&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Pair</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">second</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">first</span>);
  }
}

<span class="hljs-keyword">const</span> pair = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Pair</span>(<span class="hljs-string">&#x27;hello&#x27;</span>, <span class="hljs-number">42</span>);
<span class="hljs-keyword">const</span> swapped = pair.<span class="hljs-title function_">swap</span>(); <span class="hljs-comment">// Pair&lt;number, string&gt;</span>
</code></pre>
<h3 id="وراثة-الأصناف-العامة">وراثة الأصناف العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Base generic class</span>
<span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Collection</span>&lt;T&gt; {
  <span class="hljs-keyword">protected</span> <span class="hljs-attr">items</span>: T[] = [];

  <span class="hljs-title function_">add</span>(<span class="hljs-attr">item</span>: T): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">push</span>(item);
  }

  <span class="hljs-keyword">abstract</span> <span class="hljs-title function_">find</span>(<span class="hljs-attr">predicate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">boolean</span>): T | <span class="hljs-literal">undefined</span>;
}

<span class="hljs-comment">// Derived class specifies type</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">NumberCollection</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Collection</span>&lt;<span class="hljs-built_in">number</span>&gt; {
  <span class="hljs-title function_">find</span>(<span class="hljs-attr">predicate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>): <span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">find</span>(predicate);
  }

  <span class="hljs-title function_">sum</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>);
  }
}

<span class="hljs-comment">// Derived class remains generic</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">SearchableCollection</span>&lt;T&gt; <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Collection</span>&lt;T&gt; {
  <span class="hljs-title function_">find</span>(<span class="hljs-attr">predicate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">boolean</span>): T | <span class="hljs-literal">undefined</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">find</span>(predicate);
  }

  <span class="hljs-title function_">findAll</span>(<span class="hljs-attr">predicate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">boolean</span>): T[] {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">filter</span>(predicate);
  }
}
</code></pre>
<h3 id="الأعضاء-الساكنة-في-الأصناف-العامة">الأعضاء الساكنة في الأصناف العامة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GenericClass</span>&lt;T&gt; {
  <span class="hljs-comment">// ❌ Static members cannot reference type parameters</span>
  <span class="hljs-keyword">static</span> <span class="hljs-attr">staticValue</span>: T; <span class="hljs-comment">// Error!</span>

  <span class="hljs-comment">// ✅ Static members can be generic themselves</span>
  <span class="hljs-keyword">static</span> staticMethod&lt;U&gt;(<span class="hljs-attr">value</span>: U): U {
    <span class="hljs-keyword">return</span> value;
  }

  <span class="hljs-comment">// Instance members can use T</span>
  <span class="hljs-attr">instanceValue</span>: T;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">instanceValue</span> = value;
  }
}

<span class="hljs-comment">// Static factory pattern</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Factory</span>&lt;T&gt; {
  <span class="hljs-keyword">static</span> create&lt;U&gt;(<span class="hljs-attr">value</span>: U): <span class="hljs-title class_">Factory</span>&lt;U&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Factory</span>(value);
  }

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">value</span>: T</span>) {}

  <span class="hljs-title function_">getValue</span>(): T {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">value</span>;
  }
}

<span class="hljs-keyword">const</span> factory = <span class="hljs-title class_">Factory</span>.<span class="hljs-title function_">create</span>(<span class="hljs-string">&#x27;hello&#x27;</span>); <span class="hljs-comment">// Factory&lt;string&gt;</span>
</code></pre>
<h2 id="أنماط-الأنواع-العامة-المتقدمة">أنماط الأنواع العامة المتقدمة</h2>
<p>دعنا نستكشف أنماطًا أكثر تطورًا للأنواع العامة.</p>
<h3 id="الأنواع-الشرطية-مع-الأنواع-العامة">الأنواع الشرطية مع الأنواع العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Basic conditional type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsArray</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[] ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Test1</span> = <span class="hljs-title class_">IsArray</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// false</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Test2</span> = <span class="hljs-title class_">IsArray</span>&lt;<span class="hljs-built_in">string</span>[]&gt;; <span class="hljs-comment">// true</span>

<span class="hljs-comment">// Extract array element type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ElementType</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (infer E)[] ? E : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringElement</span> = <span class="hljs-title class_">ElementType</span>&lt;<span class="hljs-built_in">string</span>[]&gt;; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NumberElement</span> = <span class="hljs-title class_">ElementType</span>&lt;<span class="hljs-built_in">number</span>[]&gt;; <span class="hljs-comment">// number</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NotArray</span> = <span class="hljs-title class_">ElementType</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// never</span>

<span class="hljs-comment">// Conditional type with multiple conditions</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TypeName</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>
  ? <span class="hljs-string">&#x27;string&#x27;</span>
  : T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>
    ? <span class="hljs-string">&#x27;number&#x27;</span>
    : T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span>
      ? <span class="hljs-string">&#x27;boolean&#x27;</span>
      : T <span class="hljs-keyword">extends</span> <span class="hljs-literal">undefined</span>
        ? <span class="hljs-string">&#x27;undefined&#x27;</span>
        : T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Function</span>
          ? <span class="hljs-string">&#x27;function&#x27;</span>
          : <span class="hljs-string">&#x27;object&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-variable constant_">T1</span> = <span class="hljs-title class_">TypeName</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// &quot;string&quot;</span>
<span class="hljs-keyword">type</span> <span class="hljs-variable constant_">T2</span> = <span class="hljs-title class_">TypeName</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>&gt;; <span class="hljs-comment">// &quot;function&quot;</span>
<span class="hljs-keyword">type</span> <span class="hljs-variable constant_">T3</span> = <span class="hljs-title class_">TypeName</span>&lt;<span class="hljs-built_in">string</span>[]&gt;; <span class="hljs-comment">// &quot;object&quot;</span>
</code></pre>
<h3 id="الأنواع-المعينة-مع-الأنواع-العامة">الأنواع المعيَّنة مع الأنواع العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Make all properties optional</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Partial</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]?: T[P];
};

<span class="hljs-comment">// Make all properties readonly</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Readonly</span>&lt;T&gt; = {
  <span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P];
};

<span class="hljs-comment">// Pick specific properties</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Pick</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; = {
  [P <span class="hljs-keyword">in</span> K]: T[P];
};

<span class="hljs-comment">// Omit specific properties</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Omit</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; = <span class="hljs-title class_">Pick</span>&lt;T, <span class="hljs-title class_">Exclude</span>&lt;keyof T, K&gt;&gt;;

<span class="hljs-comment">// Transform property types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Stringify</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Person</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">active</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringPerson</span> = <span class="hljs-title class_">Stringify</span>&lt;<span class="hljs-title class_">Person</span>&gt;;
<span class="hljs-comment">// { name: string; age: string; active: string; }</span>

<span class="hljs-comment">// Conditional mapped types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NullableProperties</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]: T[P] | <span class="hljs-literal">null</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepReadonly</span>&lt;T&gt; = {
  <span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepReadonly</span>&lt;T[P]&gt; : T[P];
};
</code></pre>
<h3 id="قيود-الأنواع-العامة-مع-الأنواع-الشرطية">قيود الأنواع العامة مع الأنواع الشرطية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Constrain based on type structure</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">HasLength</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">length</span>: <span class="hljs-built_in">number</span> } ? T : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">function</span> processWithLength&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HasLength</span>&lt;T&gt;&gt;(<span class="hljs-attr">value</span>: T): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">return</span> value.<span class="hljs-property">length</span>;
}

<span class="hljs-comment">// Extract function return types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReturnType</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]) =&gt; infer R ? R : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringReturn</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NumberReturn</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">number</span>&gt;; <span class="hljs-comment">// number</span>

<span class="hljs-comment">// Extract promise types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UnwrapPromise</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Promise</span>&lt;infer U&gt; ? U : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Unwrapped1</span> = <span class="hljs-title class_">UnwrapPromise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Unwrapped2</span> = <span class="hljs-title class_">UnwrapPromise</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// string (not a promise)</span>

<span class="hljs-comment">// Recursive unwrapping</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepUnwrapPromise</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Promise</span>&lt;infer U&gt; ? <span class="hljs-title class_">DeepUnwrapPromise</span>&lt;U&gt; : T;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Nested</span> = <span class="hljs-title class_">DeepUnwrapPromise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;&gt;; <span class="hljs-comment">// string</span>
</code></pre>
<h2 id="التباين-في-الأنواع-العامة">التباين في الأنواع العامة</h2>
<p>فهم التباين أمر بالغ الأهمية للاستخدام المتقدم للأنواع العامة.</p>
<h3 id="التباين-المشترك-والتباين-المضاد">التباين المشترك والتباين المضاد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Covariance (outputs) - preserves subtype relationship</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Producer</span>&lt;out T&gt; {
  <span class="hljs-title function_">produce</span>(): T;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Animal</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">&#x27;&#x27;</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Animal</span> {
  <span class="hljs-attr">breed</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">&#x27;&#x27;</span>;
}

<span class="hljs-comment">// Dog producer can be used where Animal producer is expected (covariant)</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">dogProducer</span>: <span class="hljs-title class_">Producer</span>&lt;<span class="hljs-title class_">Dog</span>&gt; = {
  <span class="hljs-attr">produce</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Dog</span>(),
};

<span class="hljs-keyword">const</span> <span class="hljs-attr">animalProducer</span>: <span class="hljs-title class_">Producer</span>&lt;<span class="hljs-title class_">Animal</span>&gt; = dogProducer; <span class="hljs-comment">// ✅ OK</span>

<span class="hljs-comment">// Contravariance (inputs) - reverses subtype relationship</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Consumer</span>&lt;in T&gt; {
  <span class="hljs-title function_">consume</span>(<span class="hljs-attr">value</span>: T): <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// Animal consumer can be used where Dog consumer is expected (contravariant)</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">animalConsumer</span>: <span class="hljs-title class_">Consumer</span>&lt;<span class="hljs-title class_">Animal</span>&gt; = {
  <span class="hljs-attr">consume</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">animal</span>: <span class="hljs-title class_">Animal</span></span>) =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(animal.<span class="hljs-property">name</span>),
};

<span class="hljs-keyword">const</span> <span class="hljs-attr">dogConsumer</span>: <span class="hljs-title class_">Consumer</span>&lt;<span class="hljs-title class_">Dog</span>&gt; = animalConsumer; <span class="hljs-comment">// ✅ OK</span>

<span class="hljs-comment">// Invariance (both input and output) - exact type match required</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Processor</span>&lt;T&gt; {
  <span class="hljs-title function_">process</span>(<span class="hljs-attr">value</span>: T): T;
}

<span class="hljs-comment">// Neither direction works</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">animalProcessor</span>: <span class="hljs-title class_">Processor</span>&lt;<span class="hljs-title class_">Animal</span>&gt; = {
  <span class="hljs-attr">process</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">animal</span>: <span class="hljs-title class_">Animal</span></span>) =&gt;</span> animal,
};

<span class="hljs-keyword">const</span> <span class="hljs-attr">dogProcessor</span>: <span class="hljs-title class_">Processor</span>&lt;<span class="hljs-title class_">Dog</span>&gt; = animalProcessor; <span class="hljs-comment">// ❌ Error</span>
</code></pre>
<h3 id="التباين-الثنائي-في-معاملات-الدوال">التباين الثنائي في معاملات الدوال</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// TypeScript is bivariant with method parameters by default</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">EventHandler</span>&lt;T&gt; {
  <span class="hljs-title function_">handleEvent</span>(<span class="hljs-attr">event</span>: T): <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">MouseEvent</span> {
  <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>;
  <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ClickEvent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">MouseEvent</span> {
  <span class="hljs-attr">button</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>;
}

<span class="hljs-comment">// Both directions work (bivariant)</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">mouseHandler</span>: <span class="hljs-title class_">EventHandler</span>&lt;<span class="hljs-title class_">MouseEvent</span>&gt; = {
  <span class="hljs-attr">handleEvent</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span></span>) =&gt;</span> {},
};

<span class="hljs-keyword">const</span> <span class="hljs-attr">clickHandler</span>: <span class="hljs-title class_">EventHandler</span>&lt;<span class="hljs-title class_">ClickEvent</span>&gt; = mouseHandler; <span class="hljs-comment">// OK</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">reverseHandler</span>: <span class="hljs-title class_">EventHandler</span>&lt;<span class="hljs-title class_">MouseEvent</span>&gt; = clickHandler; <span class="hljs-comment">// Also OK</span>

<span class="hljs-comment">// Use strictFunctionTypes for safer variance</span>
</code></pre>
<h2 id="أفضل-ممارسات-الأنواع-العامة">أفضل ممارسات الأنواع العامة</h2>
<h3 id="استخدم-أسماء-وصفية-لمعاملات-النوع">استخدم أسماء وصفية لمعاملات النوع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Poor naming</span>
<span class="hljs-keyword">function</span> process&lt;T, U, V&gt;(<span class="hljs-attr">t</span>: T, <span class="hljs-attr">u</span>: U): V {
  <span class="hljs-comment">// What do T, U, V represent?</span>
}

<span class="hljs-comment">// ✅ Good naming</span>
<span class="hljs-keyword">function</span> convert&lt;<span class="hljs-title class_">TInput</span>, <span class="hljs-title class_">TOutput</span>&gt;(<span class="hljs-attr">input</span>: <span class="hljs-title class_">TInput</span>, <span class="hljs-attr">converter</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-title class_">TInput</span></span>) =&gt;</span> <span class="hljs-title class_">TOutput</span>): <span class="hljs-title class_">TOutput</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">converter</span>(input);
}

<span class="hljs-comment">// ✅ Common conventions</span>
<span class="hljs-comment">// T - Type</span>
<span class="hljs-comment">// K - Key</span>
<span class="hljs-comment">// V - Value</span>
<span class="hljs-comment">// E - Element</span>
<span class="hljs-comment">// P - Property</span>
</code></pre>
<h3 id="ابدأ-ببساطة-وأضف-القيود-عند-الحاجة">ابدأ ببساطة، وأضف القيود عند الحاجة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Start with unconstrained generic</span>
<span class="hljs-keyword">function</span> processItem&lt;T&gt;(<span class="hljs-attr">item</span>: T): T {
  <span class="hljs-comment">// Process...</span>
  <span class="hljs-keyword">return</span> item;
}

<span class="hljs-comment">// Add constraints when needed</span>
<span class="hljs-keyword">function</span> processNamed&lt;T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> }&gt;(<span class="hljs-attr">item</span>: T): T {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(item.<span class="hljs-property">name</span>);
  <span class="hljs-keyword">return</span> item;
}

<span class="hljs-comment">// Add more specific constraints</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Identifiable</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Timestamped</span> {
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> processRecord&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Identifiable</span> &amp; <span class="hljs-title class_">Timestamped</span>&gt;(<span class="hljs-attr">record</span>: T): T {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Processing <span class="hljs-subst">\${record.id}</span> at <span class="hljs-subst">\${record.timestamp}</span>\`</span>);
  <span class="hljs-keyword">return</span> record;
}
</code></pre>
<h3 id="تجنب-الإفراط-في-التعميم">تجنّب الإفراط في التعميم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Too generic - hard to understand</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SuperGeneric</span>&lt;T, U, V, W&gt; = T <span class="hljs-keyword">extends</span> U ? (V <span class="hljs-keyword">extends</span> W ? T &amp; V : <span class="hljs-built_in">never</span>) : U | W;

<span class="hljs-comment">// ✅ Specific and clear</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Result</span>&lt;T&gt; = { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-comment">// ❌ Generic when not needed</span>
<span class="hljs-keyword">function</span> addNumbers&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>&gt;(<span class="hljs-attr">a</span>: T, <span class="hljs-attr">b</span>: T): T {
  <span class="hljs-keyword">return</span> (a + b) <span class="hljs-keyword">as</span> T; <span class="hljs-comment">// Unnecessary generic</span>
}

<span class="hljs-comment">// ✅ Simple and clear</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">addNumbers</span>(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">return</span> a + b;
}
</code></pre>
<h2 id="أنماط-الأنواع-العامة-في-العالم-الحقيقي">أنماط الأنواع العامة في العالم الحقيقي</h2>
<h3 id="نمط-المستودع">نمط المستودع</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Entity</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">updatedAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">abstract</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Repository</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Entity</span>&gt; {
  <span class="hljs-keyword">protected</span> <span class="hljs-attr">items</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, T&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">findById</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;T | <span class="hljs-literal">undefined</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">get</span>(id);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">findAll</span>(): <span class="hljs-title class_">Promise</span>&lt;T[]&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">values</span>());
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">save</span>(<span class="hljs-attr">entity</span>: T): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    entity.<span class="hljs-property">updatedAt</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">set</span>(entity.<span class="hljs-property">id</span>, entity);
    <span class="hljs-keyword">return</span> entity;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">delete</span>(<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">boolean</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">delete</span>(id);
  }

  <span class="hljs-keyword">abstract</span> <span class="hljs-title function_">validate</span>(<span class="hljs-attr">entity</span>: T): <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Entity</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">UserRepository</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Repository</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-title function_">validate</span>(<span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> user.<span class="hljs-property">email</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">findByEmail</span>(<span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">undefined</span>&gt; {
    <span class="hljs-keyword">const</span> users = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findAll</span>();
    <span class="hljs-keyword">return</span> users.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">email</span> === email);
  }
}
</code></pre>
<h3 id="نمط-باث-الأحداث">نمط باثّ الأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">EventMap</span> = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">TypedEventEmitter</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">EventMap</span>&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">listeners</span>: {
    [K <span class="hljs-keyword">in</span> keyof T]?: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>&gt;;
  } = {};

  on&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">event</span>: K, <span class="hljs-attr">listener</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>[event]) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>[event] = [];
    }
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>[event]!.<span class="hljs-title function_">push</span>(listener);
  }

  off&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">event</span>: K, <span class="hljs-attr">listener</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> listeners = <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>[event];
    <span class="hljs-keyword">if</span> (listeners) {
      <span class="hljs-keyword">const</span> index = listeners.<span class="hljs-title function_">indexOf</span>(listener);
      <span class="hljs-keyword">if</span> (index &gt; -<span class="hljs-number">1</span>) {
        listeners.<span class="hljs-title function_">splice</span>(index, <span class="hljs-number">1</span>);
      }
    }
  }

  emit&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">event</span>: K, <span class="hljs-attr">data</span>: T[K]): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> listeners = <span class="hljs-variable language_">this</span>.<span class="hljs-property">listeners</span>[event];
    <span class="hljs-keyword">if</span> (listeners) {
      listeners.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">listener</span>) =&gt;</span> <span class="hljs-title function_">listener</span>(data));
    }
  }
}

<span class="hljs-comment">// Usage with specific event types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppEvents</span> {
  <span class="hljs-attr">login</span>: { <span class="hljs-attr">user</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span> };
  <span class="hljs-attr">logout</span>: { <span class="hljs-attr">user</span>: <span class="hljs-built_in">string</span> };
  <span class="hljs-attr">error</span>: { <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">code</span>: <span class="hljs-built_in">number</span> };
}

<span class="hljs-keyword">const</span> emitter = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TypedEventEmitter</span>&lt;<span class="hljs-title class_">AppEvents</span>&gt;();

emitter.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;login&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${data.user}</span> logged in at <span class="hljs-subst">\${data.timestamp}</span>\`</span>);
});

emitter.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;login&#x27;</span>, { <span class="hljs-attr">user</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>, <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() });
</code></pre>
<h3 id="نمط-الباني">نمط الباني</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Builder</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">object</span>: <span class="hljs-title class_">Partial</span>&lt;T&gt; = {};

  set&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">key</span>: K, <span class="hljs-attr">value</span>: T[K]): <span class="hljs-variable language_">this</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">object</span>[key] = value;
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>;
  }

  <span class="hljs-title function_">build</span>(): T {
    <span class="hljs-comment">// In real code, validate that all required fields are set</span>
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">object</span> <span class="hljs-keyword">as</span> T;
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Config</span> {
  <span class="hljs-attr">host</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">port</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">secure</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">timeout</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> config = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Builder</span>&lt;<span class="hljs-title class_">Config</span>&gt;()
  .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;host&#x27;</span>, <span class="hljs-string">&#x27;localhost&#x27;</span>)
  .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;port&#x27;</span>, <span class="hljs-number">3000</span>)
  .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;secure&#x27;</span>, <span class="hljs-literal">false</span>)
  .<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;timeout&#x27;</span>, <span class="hljs-number">5000</span>)
  .<span class="hljs-title function_">build</span>();
</code></pre>
<h2 id="أدوات-الأنواع-العامة">أدوات الأنواع العامة</h2>
<h3 id="إنشاء-أدوات-الأنواع-الخاصة-بك">إنشاء أدوات الأنواع الخاصة بك</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// DeepPartial - make all properties optional recursively</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepPartial</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]?: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepPartial</span>&lt;T[P]&gt; : T[P];
};

<span class="hljs-comment">// DeepRequired - make all properties required recursively</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepRequired</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]-?: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepRequired</span>&lt;T[P]&gt; : T[P];
};

<span class="hljs-comment">// Mutable - remove readonly from all properties</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Mutable</span>&lt;T&gt; = {
  -<span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P];
};

<span class="hljs-comment">// PromiseType - extract the type from a Promise</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PromiseType</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Promise</span>&lt;infer U&gt; ? U : <span class="hljs-built_in">never</span>;

<span class="hljs-comment">// AsyncReturnType - get return type of async function</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncReturnType</span>&lt;T <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>) =&gt; <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; = T <span class="hljs-title function_">extends</span> (
  ...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>
) =&gt; <span class="hljs-title class_">Promise</span>&lt;infer R&gt;
  ? R
  : <span class="hljs-built_in">never</span>;

<span class="hljs-comment">// Entries - get entries type of object</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Entries</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: [K, T[K]];
}[keyof T][];

<span class="hljs-comment">// ExcludeNull - remove null and undefined</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ExcludeNull</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span> ? <span class="hljs-built_in">never</span> : T;

<span class="hljs-comment">// FunctionKeys - get all function property keys</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FunctionKeys</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: T[K] <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Function</span> ? K : <span class="hljs-built_in">never</span>;
}[keyof T];
</code></pre>
<h2 id="المزالق-الشائعة-والحلول">المزالق الشائعة والحلول</h2>
<h3 id="القيم-الافتراضية-لمعاملات-النوع">القيم الافتراضية لمعاملات النوع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Problem: Forgetting to specify generic type</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Container</span>&lt;T&gt; {
  <span class="hljs-attr">value</span>?: T;
}

<span class="hljs-keyword">const</span> container = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Container</span>(); <span class="hljs-comment">// Container&lt;unknown&gt; - not useful!</span>

<span class="hljs-comment">// ✅ Solution: Provide default type</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">BetterContainer</span>&lt;T = <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-attr">value</span>?: T;
}

<span class="hljs-keyword">const</span> container2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BetterContainer</span>(); <span class="hljs-comment">// Container&lt;any&gt; - more useful</span>

<span class="hljs-comment">// ✅ Even better: Meaningful defaults</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">StringContainer</span>&lt;T = <span class="hljs-built_in">string</span>&gt; {
  <span class="hljs-attr">value</span>?: T;
}
</code></pre>
<h3 id="حراس-الأنواع-العامة">حراس الأنواع العامة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Problem: Type guards don&#x27;t work with generics directly</span>
<span class="hljs-keyword">function</span> isArray&lt;T&gt;(<span class="hljs-attr">value</span>: T | T[]): value is T[] {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(value);
}

<span class="hljs-comment">// ✅ Solution: Use unknown or specific constraints</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isArrayProper</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): value is <span class="hljs-built_in">unknown</span>[] {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(value);
}

<span class="hljs-comment">// Or use overloads</span>
<span class="hljs-keyword">function</span> isArrayOf&lt;T&gt;(<span class="hljs-attr">value</span>: T | T[]): value is T[];
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isArrayOf</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): value is <span class="hljs-built_in">unknown</span>[];
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isArrayOf</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(value);
}
</code></pre>
<h2 id="الأنواع-العامة-في-مكونات-react">الأنواع العامة في مكونات React</h2>
<p>تستفيد مكونات React استفادة هائلة من الأنواع العامة. دعنا نستكشف الأنماط الأساسية.</p>
<h3 id="خصائص-المكون-العام">خصائص المكوّن العام</h3>
<p>يتبع تشريح مكوّن React العام نمطًا بسيطًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">getKey</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">List</span>&lt;T&gt;({ items, renderItem, getKey }: <span class="hljs-title class_">ListProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {items.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{getKey</span> ? <span class="hljs-attr">getKey</span>(<span class="hljs-attr">item</span>) <span class="hljs-attr">:</span> <span class="hljs-attr">index</span>}&gt;</span>
          {renderItem(item)}
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage - TypeScript infers the type</span>
&lt;<span class="hljs-title class_">List</span>
  items={users}
  renderItem={<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>}
  getKey={<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">id</span>}
/&gt;
</code></pre>
<h3 id="مكونات-النماذج-العامة">مكونات النماذج العامة</h3>
<p>ابنِ مكونات نماذج مرنة تعمل مع أي بنية بيانات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldProps</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; {
  <span class="hljs-attr">value</span>: T[K];
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">type</span>?: <span class="hljs-string">&#x27;text&#x27;</span> | <span class="hljs-string">&#x27;number&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">FormField</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt;({
  value,
  onChange,
  label,
  <span class="hljs-keyword">type</span> = <span class="hljs-string">&#x27;text&#x27;</span>
}: <span class="hljs-title class_">FormFieldProps</span>&lt;T, K&gt;) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;field&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>{label}<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">{type}</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{String(value)}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> onChange(e.target.value as T[K])}
      /&gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage with type safety</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

&lt;<span class="hljs-title class_">FormField</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;name&#x27;</span>&gt;
  value={user.<span class="hljs-property">name</span>}
  onChange={<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> <span class="hljs-title function_">setUser</span>({...user, name})}
  label=<span class="hljs-string">&quot;Name&quot;</span>
/&gt;
</code></pre>
<h3 id="مكون-القائمة-المنسدلة-العام">مكوّن القائمة المنسدلة العام</h3>
<p>قائمة منسدلة قابلة لإعادة الاستخدام تعمل مع أي نوع بيانات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DropdownProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">value</span>?: T;
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">getLabel</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">getValue</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">Dropdown</span>&lt;T&gt;({
  items,
  value,
  onChange,
  getLabel = <span class="hljs-title class_">String</span>,
  getValue = <span class="hljs-title class_">String</span>
}: <span class="hljs-title class_">DropdownProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{value</span> ? <span class="hljs-attr">getValue</span>(<span class="hljs-attr">value</span>) <span class="hljs-attr">:</span> &#x27;&#x27;}
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
        const selectedItem = items.find(
          item =&gt; getValue(item) === e.target.value
        );
        if (selectedItem) onChange(selectedItem);
      }}
    &gt;
      {items.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{getValue(item)}</span>&gt;</span>
          {getLabel(item)}
        <span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Works with primitives and objects</span>
&lt;<span class="hljs-title class_">Dropdown</span>&lt;<span class="hljs-built_in">string</span>&gt;
  items={[<span class="hljs-string">&#x27;apple&#x27;</span>, <span class="hljs-string">&#x27;banana&#x27;</span>, <span class="hljs-string">&#x27;cherry&#x27;</span>]}
  onChange={setFruit}
/&gt;

&lt;<span class="hljs-title class_">Dropdown</span>&lt;<span class="hljs-title class_">User</span>&gt;
  items={users}
  getLabel={<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">name</span>}
  getValue={<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">id</span>}
  onChange={setSelectedUser}
/&gt;
</code></pre>
<h3 id="الخطافات-المخصصة-العامة">الخطافات المخصصة العامة</h3>
<p>تستفيد الخطافات المخصصة استفادة كبيرة من الأنواع العامة لجلب البيانات القابل لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useFetch&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): {
  <span class="hljs-attr">data</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
} {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">true</span>);
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);
        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(response.<span class="hljs-property">statusText</span>);
        <span class="hljs-keyword">const</span> json = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-title function_">setData</span>(json);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>));
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">fetchData</span>();
  }, [url]);

  <span class="hljs-keyword">return</span> { data, loading, error };
}

<span class="hljs-comment">// Type-safe usage</span>
<span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: users, loading, error } = useFetch&lt;<span class="hljs-title class_">User</span>[]&gt;(<span class="hljs-string">&#x27;/api/users&#x27;</span>);
</code></pre>
<h3 id="نمط-السياق-العام">نمط السياق العام</h3>
<p>أنشئ مزوّدات سياق قابلة لإعادة الاستخدام باستخدام الأنواع العامة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> createGenericContext&lt;T&gt;() {
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Context</span> = <span class="hljs-title class_">React</span>.<span class="hljs-property">createContext</span>&lt;T | <span class="hljs-literal">undefined</span>&gt;(<span class="hljs-literal">undefined</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">useContext</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> context = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">Context</span>);
    <span class="hljs-keyword">if</span> (!context) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useContext must be used within Provider&#x27;</span>);
    }
    <span class="hljs-keyword">return</span> context;
  };

  <span class="hljs-keyword">return</span> [<span class="hljs-title class_">Context</span>.<span class="hljs-property">Provider</span>, useContext] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}

<span class="hljs-comment">// Create specific contexts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthContextType</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">login</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">credentials</span>: <span class="hljs-title class_">Credentials</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">logout</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> [<span class="hljs-title class_">AuthProvider</span>, useAuth] = createGenericContext&lt;<span class="hljs-title class_">AuthContextType</span>&gt;();
</code></pre>
<h3 id="مكون-النافذة-المنبثقة-العام">مكوّن النافذة المنبثقة العام</h3>
<p>نافذة منبثقة مرنة تعمل مع أي نوع بيانات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span>&lt;T&gt; {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">renderContent</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T, <span class="hljs-attr">onClose</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">renderFooter</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T, <span class="hljs-attr">onClose</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">Modal</span>&lt;T&gt;({
  isOpen,
  onClose,
  title,
  data,
  renderContent,
  renderFooter
}: <span class="hljs-title class_">ModalProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">if</span> (!isOpen || !data) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-overlay&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> e.stopPropagation()}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>{renderContent(data, onClose)}<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        {renderFooter &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>{renderFooter(data, onClose)}<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Type-safe modal usage</span>
&lt;<span class="hljs-title class_">Modal</span>&lt;<span class="hljs-title class_">User</span>&gt;
  isOpen={showUserModal}
  onClose={<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setShowUserModal</span>(<span class="hljs-literal">false</span>)}
  title=<span class="hljs-string">&quot;Edit User&quot;</span>
  data={selectedUser}
  renderContent={<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserForm</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>}
  renderFooter={<span class="hljs-function">(<span class="hljs-params">user, onClose</span>) =&gt;</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span>&gt;</span>Cancel<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> saveUser(user)}&gt;Save<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/&gt;</span></span>
  )}
/&gt;
</code></pre>
<h2 id="متى-تستخدم-الأنواع-العامة">متى تستخدم الأنواع العامة</h2>
<p><strong>استخدم الأنواع العامة عندما لديك:</strong></p>
<ul>
<li>أنماط متكررة عبر أنواع بيانات مختلفة (النماذج، والقوائم، والنوافذ المنبثقة)</li>
<li>علاقات بين الأنواع تحتاج إلى الحفاظ عليها (يجب أن يطابق نوع الإدخال نوع الإخراج)</li>
<li>أدوات مساعدة قابلة لإعادة الاستخدام تعمل مع أنواع متعددة (خطافات واجهات البرمجة، والتحقق، والتخزين)</li>
</ul>
<p><strong>تجنّب الأنواع العامة عندما:</strong></p>
<ul>
<li>يكون المكوّن بسيطًا جدًا (الزر الأساسي لا يحتاج إلى أنواع عامة)</li>
<li>تستخدمه في مكان واحد فقط (تضيف الأنواع العامة تعقيدًا بلا فائدة)</li>
<li>تكون الأنواع غير مترابطة (لا تفرض الأنواع العامة حيث لا تنتمي)</li>
</ul>
<h2 id="خاتمة">خاتمة</h2>
<p>الأنواع العامة هي مفتاح كتابة شيفرة TypeScript قابلة لإعادة الاستخدام حقًا. فهي تتيح لك إنشاء تجريدات مرنة مع الحفاظ على أمان كامل للأنواع. من معاملات النوع البسيطة إلى الأنواع الشرطية والمعيَّنة المعقدة، تمنحك الأنواع العامة القدرة على التعبير عن علاقات نوعية متطورة.</p>
<p>مفتاح إتقان الأنواع العامة هو البدء ببساطة وإضافة التعقيد تدريجيًا حسب الحاجة. استخدم أسماء وصفية، وأضف القيود عندما تكون منطقية، وتذكّر أن الهدف هو جعل شيفرتك قابلة لإعادة الاستخدام وآمنة في آن واحد. بفضل الأنماط والتقنيات الواردة في هذا الدليل، أنت جاهز للاستفادة من الأنواع العامة إلى أقصى إمكاناتها في تطبيقات React وTypeScript.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
