const s="kinney",a="react-typescript",n="React مع TypeScript",l="react-server-components-types",p="أنواع مكوّنات خادم React",t=[{depth:2,id:"فهم-حدود-المكونات",text:"فهم حدود المكوّنات"},{depth:2,id:"إنشاء-عقود-أنواع-قابلة-للتسلسل",text:"إنشاء عقود أنواع قابلة للتسلسل"},{depth:2,id:"حراس-الأنواع-الخاصة-بالخادم-والعميل",text:"حرّاس الأنواع الخاصة بالخادم والعميل"},{depth:2,id:"فرض-حدود-المكونات-عبر-الخصائص-props",text:"فرض حدود المكوّنات عبر الخصائص (props)"},{depth:2,id:"التحقق-في-وقت-التشغيل-باستخدام-zod",text:"التحقق في وقت التشغيل باستخدام Zod"},{depth:2,id:"التعامل-مع-أنماط-التسلسل-المعقدة",text:"التعامل مع أنماط التسلسل المعقّدة"},{depth:3,id:"الاتحاديات-المميزة-discriminated-unions",text:"الاتحاديات المُميَّزة (Discriminated Unions)"},{depth:3,id:"هياكل-البيانات-المتداخلة",text:"هياكل البيانات المتداخلة"},{depth:2,id:"الأخطاء-الشائعة-وحلولها",text:"الأخطاء الشائعة وحلولها"},{depth:3,id:"تمرير-بيانات-الخادم-بالخطأ",text:"تمرير بيانات الخادم بالخطأ"},{depth:3,id:"استيرادات-خاصة-ببيئة-معينة",text:"استيرادات خاصة ببيئة معيّنة"},{depth:2,id:"نمط-تطبيق-واقعي",text:"نمط تطبيق واقعي"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>تغيّر مكوّنات خادم React (React Server Components) جوهريًا الطريقة التي نفكّر بها في حدود العميل والخادم داخل تطبيقات React. بدلًا من تصيير كل شيء في جهة العميل وجلب البيانات عبر واجهات برمجية، تعمل بعض المكوّنات على الخادم، وبعضها في العميل، وبعضها يستطيع العمل في الاثنين حسب مكان استيرادها. هذه المرونة قوية، لكنها تأتي مع شرط: عليك أن تكون مقصودًا فيما يعبر الشبكة من بيانات، وكيف تفرض هذه الحدود باستخدام TypeScript.</p>
<p>سنستكشف كيف تنشئ عقودًا آمنة النوع بين مكوّنات الخادم والعميل، وتضمن أن يعمل التسلسل (serialization) للبيانات بشكل صحيح، وتلتقط مخالفات الحدود في وقت التصريف (compile time) بدلًا من وقت التشغيل. وفي النهاية، ستملك أنماطًا لبناء مكوّنات خادم React تكون سريعة ومتينة في آن واحد.</p>
<h2 id="فهم-حدود-المكونات">فهم حدود المكوّنات</h2>
<p>تقدّم مكوّنات خادم React ثلاثة أنواع من المكوّنات:</p>
<ul>
<li><strong>مكوّنات الخادم</strong>: تعمل على الخادم فقط أثناء التصيير</li>
<li><strong>مكوّنات العميل</strong>: تعمل في المتصفح (تُوسَم بـ <code>&quot;use client&quot;</code>)</li>
<li><strong>المكوّنات المشتركة</strong>: يمكن أن تعمل في أي من البيئتين حسب مكان استيرادها</li>
</ul>
<p>النقطة الصعبة أن البيانات المتدفقة بين هذه البيئات يجب أن تكون قابلة للتسلسل — لا دوال ولا نسخ أصناف ولا قيم أخرى غير قابلة لـ JSON. يمكن لـ TypeScript أن يساعد في فرض هذه القواعد، لكن عليك إعداد القيود المناسبة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Server Component - runs on server</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> products = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchProducts</span>(); <span class="hljs-comment">// Direct database access</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {products.map((product) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Client Component - runs in browser</span>
(<span class="hljs-string">&#x27;use client&#x27;</span>);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AddToCartButton</span>(<span class="hljs-params">{ productId }: { productId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-comment">// ... interactive logic</span>
}
</code></pre>
<p>يظهر التحدي عند تمرير البيانات بين هذه الحدود. لنجعل ذلك آمنًا النوع.</p>
<h2 id="إنشاء-عقود-أنواع-قابلة-للتسلسل">إنشاء عقود أنواع قابلة للتسلسل</h2>
<p>أولًا، نحتاج إلى أنواع تمثّل البيانات القابلة للتسلسل فقط. إليك نوعًا مساعدًا يُزيل القيم غير القابلة للتسلسل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Utility type for serializable data</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Serializable</span> =
  <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span> | <span class="hljs-title class_">SerializableObject</span> | <span class="hljs-title class_">SerializableArray</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SerializableObject</span> = { [<span class="hljs-title class_">Key</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">string</span>]: <span class="hljs-title class_">Serializable</span> };
<span class="hljs-keyword">type</span> <span class="hljs-title class_">SerializableArray</span> = <span class="hljs-title class_">ReadonlyArray</span>&lt;<span class="hljs-title class_">Serializable</span>&gt;;

<span class="hljs-comment">// Helper to ensure a type is serializable</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">EnsureSerializable</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Serializable</span> ? T : <span class="hljs-built_in">never</span>;
</code></pre>
<p>الآن لنعرّف عقود بياناتنا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Raw database/API types (server-only)</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ProductEntity</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>; <span class="hljs-comment">// ❌ Not serializable</span>
  <span class="hljs-attr">updateInventory</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;; <span class="hljs-comment">// ❌ Not serializable</span>
}

<span class="hljs-comment">// Serializable contract for client</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">SerializableProduct</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// ✅ Serialized as ISO string</span>
  <span class="hljs-comment">// Functions are excluded</span>
}

<span class="hljs-comment">// Ensure our contract is actually serializable</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidProduct</span> = <span class="hljs-title class_">EnsureSerializable</span>&lt;<span class="hljs-title class_">SerializableProduct</span>&gt;; <span class="hljs-comment">// ✅ Compiles</span>
</code></pre>
<p>هذا النمط يلتقط مشكلات التسلسل في وقت التصريف بدلًا من وقت التشغيل.</p>
<h2 id="حراس-الأنواع-الخاصة-بالخادم-والعميل">حرّاس الأنواع الخاصة بالخادم والعميل</h2>
<p>يمكننا إنشاء حدود أقوى باستخدام حلّ الوحدات (module resolution) في TypeScript والأنواع الموسومة (branded types):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// server-only-types.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">SERVER_ONLY</span>: unique <span class="hljs-built_in">symbol</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ServerOnlyData</span> {
  <span class="hljs-keyword">readonly</span> [<span class="hljs-variable constant_">SERVER_ONLY</span>]: <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">DatabaseProduct</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ServerOnlyData</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">inventory</span>: {
    <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-title function_">updateCount</span>(<span class="hljs-attr">delta</span>: <span class="hljs-built_in">number</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  };
}
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// client-safe-types.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ClientSafeProduct</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Always serialized</span>
  <span class="hljs-attr">inventoryCount</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Flattened, no methods</span>
}
</code></pre>
<p>الآن أنشئ دوال تحويل بحدود أنواع صريحة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// server/transforms.ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">DatabaseProduct</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./server-only-types&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ClientSafeProduct</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./client-safe-types&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">toClientSafeProduct</span>(<span class="hljs-params"><span class="hljs-attr">serverProduct</span>: <span class="hljs-title class_">DatabaseProduct</span></span>): <span class="hljs-title class_">ClientSafeProduct</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">id</span>: serverProduct.<span class="hljs-property">id</span>,
    <span class="hljs-attr">name</span>: serverProduct.<span class="hljs-property">name</span>,
    <span class="hljs-attr">price</span>: serverProduct.<span class="hljs-property">price</span>,
    <span class="hljs-attr">createdAt</span>: serverProduct.<span class="hljs-property">createdAt</span>.<span class="hljs-title function_">toISOString</span>(),
    <span class="hljs-attr">inventoryCount</span>: serverProduct.<span class="hljs-property">inventory</span>.<span class="hljs-property">count</span>,
    <span class="hljs-comment">// ✅ Methods and complex objects are stripped</span>
  };
}

<span class="hljs-comment">// This function signature prevents accidental server data leakage</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getProductsForClient</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ClientSafeProduct</span>[]&gt; {
  <span class="hljs-keyword">const</span> serverProducts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchProductsFromDatabase</span>();
  <span class="hljs-keyword">return</span> serverProducts.<span class="hljs-title function_">map</span>(toClientSafeProduct);
}
</code></pre>
<h2 id="فرض-حدود-المكونات-عبر-الخصائص-props">فرض حدود المكوّنات عبر الخصائص (props)</h2>
<p>لننشئ أنواع غلاف تفرض الاستخدام الصحيح للخصائص:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Component boundary types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ServerComponentProps</span>&lt;T = {}&gt; = T &amp; {
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ClientComponentProps</span>&lt;T = {}&gt; = <span class="hljs-title class_">EnsureSerializable</span>&lt;T&gt; &amp; {
  <span class="hljs-attr">children</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
};

<span class="hljs-comment">// Usage in components</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductListServer</span>(<span class="hljs-params">
  <span class="hljs-attr">props</span>: <span class="hljs-title class_">ServerComponentProps</span>&lt;{ category?: <span class="hljs-built_in">string</span> }&gt;
</span>) {
  <span class="hljs-keyword">const</span> { category } = props;
  <span class="hljs-keyword">const</span> products = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getProductsForClient</span>(); <span class="hljs-comment">// Already serialized</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {products.map(product =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductClientCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{product}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-string">&quot;use client&quot;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductClientCard</span>(<span class="hljs-params">
  <span class="hljs-attr">props</span>: <span class="hljs-title class_">ClientComponentProps</span>&lt;{ product: ClientSafeProduct }&gt;
</span>) {
  <span class="hljs-keyword">const</span> { product } = props;
  <span class="hljs-comment">// ✅ TypeScript ensures product is serializable</span>
}
</code></pre>
<p>يكشف هذا الأسلوب مخالفات الخصائص في وقت التصريف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ TypeScript error - Date is not serializable</span>
&lt;<span class="hljs-title class_">ProductClientCard</span> product={{
  <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;1&quot;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Widget&quot;</span>,
  <span class="hljs-attr">createdAt</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() <span class="hljs-comment">// Error!</span>
}} /&gt;

<span class="hljs-comment">// ✅ Compiles correctly</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductClientCard</span> <span class="hljs-attr">product</span>=<span class="hljs-string">{{</span>
  <span class="hljs-attr">id:</span> &quot;<span class="hljs-attr">1</span>&quot;,
  <span class="hljs-attr">name:</span> &quot;<span class="hljs-attr">Widget</span>&quot;,
  <span class="hljs-attr">createdAt:</span> <span class="hljs-attr">new</span> <span class="hljs-attr">Date</span>()<span class="hljs-attr">.toISOString</span>()
}} /&gt;</span></span>
</code></pre>
<h2 id="التحقق-في-وقت-التشغيل-باستخدام-zod">التحقق في وقت التشغيل باستخدام Zod</h2>
<p>للتطبيقات الإنتاج، ادمج TypeScript مع التحقق في وقت التشغيل باستخدام Zod:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Zod schema for serializable data</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SerializableProductSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">price</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">positive</span>(),
  <span class="hljs-attr">createdAt</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">datetime</span>(), <span class="hljs-comment">// ISO string</span>
  <span class="hljs-attr">inventoryCount</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">0</span>),
});

<span class="hljs-comment">// Infer TypeScript type from schema</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">SerializableProduct</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">SerializableProductSchema</span>&gt;;

<span class="hljs-comment">// Server-to-client boundary with validation</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> validateForClient&lt;T&gt;(
  <span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span>,
  <span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;T&gt;
): T {
  <span class="hljs-keyword">const</span> result = schema.<span class="hljs-title function_">safeParse</span>(data);

  <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Serialization validation failed:&#x27;</span>, result.<span class="hljs-property">error</span>);
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid data passed to client component&#x27;</span>);
  }

  <span class="hljs-keyword">return</span> result.<span class="hljs-property">data</span>;
}

<span class="hljs-comment">// Usage in server component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> rawProducts = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchProductsFromDatabase</span>();
  <span class="hljs-keyword">const</span> safeProducts = rawProducts.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">product</span> =&gt;</span>
    <span class="hljs-title function_">validateForClient</span>(<span class="hljs-title function_">toClientSafeProduct</span>(product), <span class="hljs-title class_">SerializableProductSchema</span>)
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{safeProducts}</span> /&gt;</span></span>;
}
</code></pre>
<p>يمنحك هذا أمانًا في وقت التصريف وفي وقت_runtime معًا لحدود المكوّنات لديك.</p>
<h2 id="التعامل-مع-أنماط-التسلسل-المعقدة">التعامل مع أنماط التسلسل المعقّدة</h2>
<h3 id="الاتحاديات-المميزة-discriminated-unions">الاتحاديات المُميَّزة (Discriminated Unions)</h3>
<p>عند تمرير حالة معقّدة، استخدم الاتحاديات المُميَّزة للحفاظ على أمان النوع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ClientSafeState</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">products</span>: <span class="hljs-title class_">SerializableProduct</span>[] };

<span class="hljs-string">&quot;use client&quot;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductDisplay</span>(<span class="hljs-params">{
  state
}: <span class="hljs-title class_">ClientComponentProps</span>&lt;{ state: ClientSafeState }&gt;</span>) {
  <span class="hljs-keyword">switch</span> (state.<span class="hljs-property">status</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;loading&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Spinner</span> /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;error&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorMessage</span> <span class="hljs-attr">message</span>=<span class="hljs-string">{state.message}</span> /&gt;</span></span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;success&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProductList</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{state.products}</span> /&gt;</span></span>;
  }
}
</code></pre>
<h3 id="هياكل-البيانات-المتداخلة">هياكل البيانات المتداخلة</h3>
<p>للكائنات المتداخلة بعمق، أنشئ أدوات تسلسل تكرارية (recursive):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepSerializable</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (infer U)[]
  ? <span class="hljs-title class_">DeepSerializable</span>&lt;U&gt;[]
  : T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;
    ? { [K <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-title class_">DeepSerializable</span>&lt;T[K]&gt; }
    : T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Date</span>
      ? <span class="hljs-built_in">string</span>
      : T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Function</span>
        ? <span class="hljs-built_in">never</span>
        : T;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComplexServerData</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">profile</span>: {
      <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
      <span class="hljs-attr">preferences</span>: {
        <span class="hljs-attr">theme</span>: <span class="hljs-built_in">string</span>;
        <span class="hljs-attr">notifications</span>: <span class="hljs-built_in">boolean</span>;
      };
    };
  };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SafeComplexData</span> = <span class="hljs-title class_">DeepSerializable</span>&lt;<span class="hljs-title class_">ComplexServerData</span>&gt;;
<span class="hljs-comment">// Result: { user: { profile: { createdAt: string; preferences: { theme: string; notifications: boolean } } } }</span>
</code></pre>
<h2 id="الأخطاء-الشائعة-وحلولها">الأخطاء الشائعة وحلولها</h2>
<h3 id="تمرير-بيانات-الخادم-بالخطأ">تمرير بيانات الخادم بالخطأ</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Common mistake - passing server objects directly</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>(); <span class="hljs-comment">// Returns Date objects, methods</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ClientProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>; <span class="hljs-comment">// Runtime serialization error</span>
}

<span class="hljs-comment">// ✅ Explicit transformation</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> serverUser = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>();
  <span class="hljs-keyword">const</span> <span class="hljs-attr">clientSafeUser</span>: <span class="hljs-title class_">ClientSafeUser</span> = {
    <span class="hljs-attr">id</span>: serverUser.<span class="hljs-property">id</span>,
    <span class="hljs-attr">name</span>: serverUser.<span class="hljs-property">name</span>,
    <span class="hljs-attr">joinedAt</span>: serverUser.<span class="hljs-property">createdAt</span>.<span class="hljs-title function_">toISOString</span>(),
  };
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ClientProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{clientSafeUser}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="استيرادات-خاصة-ببيئة-معينة">استيرادات خاصة ببيئة معيّنة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// server-utils.ts - mark as server-only</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;server-only&#x27;</span>; <span class="hljs-comment">// Prevents client bundling</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserFromDatabase</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-comment">// Database logic here</span>
}

<span class="hljs-comment">// client-utils.ts - mark as client-only</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;client-only&#x27;</span>; <span class="hljs-comment">// Prevents server usage</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">trackUserInteraction</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-comment">// Browser-only analytics</span>
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>دائمًا ثبّت حزمتَي <code>server-only</code> و<code>client-only</code> لفرض حدود البيئة في وقت البناء.</p>
</blockquote>
<h2 id="نمط-تطبيق-واقعي">نمط تطبيق واقعي</h2>
<p>إليك نمطًا كاملًا لتطبيق إنتاج:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/contracts.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserContract</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">profile</span>: {
    <span class="hljs-attr">displayName</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">avatarUrl</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">joinedAt</span>: <span class="hljs-built_in">string</span>;
  };
}

<span class="hljs-comment">// server/user-service.ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;server-only&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserContract</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/types/contracts&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getUserForClient</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">UserContract</span>&gt; {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> db.<span class="hljs-property">user</span>.<span class="hljs-title function_">findUnique</span>({ <span class="hljs-attr">where</span>: { id } });

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span>,
    <span class="hljs-attr">email</span>: user.<span class="hljs-property">email</span>,
    <span class="hljs-attr">profile</span>: {
      <span class="hljs-attr">displayName</span>: user.<span class="hljs-property">displayName</span>,
      <span class="hljs-attr">avatarUrl</span>: user.<span class="hljs-property">avatarUrl</span>,
      <span class="hljs-attr">joinedAt</span>: user.<span class="hljs-property">createdAt</span>.<span class="hljs-title function_">toISOString</span>(),
    },
  };
}

<span class="hljs-comment">// components/UserProfile.server.tsx</span>
<span class="hljs-keyword">import</span> { getUserForClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/server/user-service&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserProfileClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./UserProfile.client&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserForClient</span>(userId);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfileClient</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// components/UserProfile.client.tsx</span>
<span class="hljs-string">&quot;use client&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserContract</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/types/contracts&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfileClient</span>(<span class="hljs-params">{
  user
}: {
  user: UserContract
}</span>) {
  <span class="hljs-comment">// Interactive client logic here</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.profile.displayName}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Joined: {new Date(user.profile.joinedAt).toLocaleDateString()}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يمنحك هذا النمط:</p>
<ul>
<li>✅ أمانًا في وقت التصريف لعقود البيانات</li>
<li>✅ فصلًا واضحًا بين شأني الخادم والعميل</li>
<li>✅ حدود تسلسل صريحة</li>
<li>✅ تحققًا في وقت التشغيل عند الحاجة</li>
<li>✅ اختبارًا سهلًا لكل مكوّن على حدة</li>
</ul>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>الآن وقد كانت لديك حدود آمنة النوع بين مكوّنات الخادم والعميل، يمكنك:</p>
<ol>
<li><strong>أضف تحققًا في وقت التشغيل</strong> بمخططات Zod لأمان الإنتاج</li>
<li><strong>أنشئ أدوات تحويل قابلة لإعادة الاستخدام</strong> لأنماط التسلسل الشائعة</li>
<li><strong>اضبط قواعد ESLint</strong> لالتقاط مخالفات الحدود أثناء التطوير</li>
<li><strong>ابنِ أدوات اختبار</strong> تتحقّق من عقود التسلسل لديك</li>
</ol>
<p>المفتاح هو الوضوح الصريح بشأن حدودك بدلًا من الأمل بأن تسلسل React «يعمل كما ينبغي». مع عقود TypeScript صحيحة، ستلتقط المشكلات في وقت التصريف وتُنشر مكوّنات خادم أكثر موثوقية.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
