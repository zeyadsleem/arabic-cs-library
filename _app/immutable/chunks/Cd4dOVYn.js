const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-utility-types-complete",t="دليل أنواع الأدوات (Utility Types)",p=[{depth:2,id:"أدوات-التعامل-مع-الكائنات",text:"أدوات التعامل مع الكائنات"},{depth:3,id:"partiallttgt",text:"Partial&lt;T&gt;"},{depth:3,id:"requiredlttgt",text:"Required&lt;T&gt;"},{depth:3,id:"readonlylttgt",text:"Readonly&lt;T&gt;"},{depth:3,id:"recordltk-tgt",text:"Record&lt;K, T&gt;"},{depth:2,id:"أدوات-اختيار-الخصائص",text:"أدوات اختيار الخصائص"},{depth:3,id:"pickltt-kgt",text:"Pick&lt;T, K&gt;"},{depth:3,id:"omitltt-kgt",text:"Omit&lt;T, K&gt;"},{depth:2,id:"أدوات-التعامل-مع-الاتحادات",text:"أدوات التعامل مع الاتحادات"},{depth:3,id:"excludeltt-ugt",text:"Exclude&lt;T, U&gt;"},{depth:3,id:"extractltt-ugt",text:"Extract&lt;T, U&gt;"},{depth:3,id:"nonnullablelttgt",text:"NonNullable&lt;T&gt;"},{depth:2,id:"أدوات-الدوال",text:"أدوات الدوال"},{depth:3,id:"parameterslttgt",text:"Parameters&lt;T&gt;"},{depth:3,id:"returntypelttgt",text:"ReturnType&lt;T&gt;"},{depth:3,id:"constructorparameterslttgt",text:"ConstructorParameters&lt;T&gt;"},{depth:3,id:"instancetypelttgt",text:"InstanceType&lt;T&gt;"},{depth:2,id:"أدوات-التعامل-مع-السلاسل",text:"أدوات التعامل مع السلاسل"},{depth:3,id:"uppercaselttgt",text:"Uppercase&lt;T&gt;"},{depth:3,id:"lowercaselttgt",text:"Lowercase&lt;T&gt;"},{depth:3,id:"capitalizelttgt",text:"Capitalize&lt;T&gt;"},{depth:3,id:"uncapitalizelttgt",text:"Uncapitalize&lt;T&gt;"},{depth:2,id:"أدوات-promise",text:"أدوات Promise"},{depth:3,id:"awaitedlttgt",text:"Awaited&lt;T&gt;"},{depth:2,id:"أنماط-الأدوات-الخاصة-بـ-react",text:"أنماط الأدوات الخاصة بـ React"},{depth:3,id:"أدوات-خصائص-المكون",text:"أدوات خصائص المكوّن"},{depth:3,id:"أنواع-معالجات-الأحداث",text:"أنواع معالجات الأحداث"},{depth:2,id:"أنواع-الأدوات-المخصصة",text:"أنواع الأدوات المخصصة"},{depth:3,id:"deeppartial",text:"DeepPartial"},{depth:3,id:"deepreadonly",text:"DeepReadonly"},{depth:3,id:"mutable",text:"Mutable"},{depth:3,id:"pickbyvalue",text:"PickByValue"},{depth:3,id:"omitbyvalue",text:"OmitByValue"},{depth:3,id:"nullable",text:"Nullable"},{depth:3,id:"valueof",text:"ValueOf"},{depth:2,id:"توليفات-متقدمة",text:"توليفات متقدمة"},{depth:3,id:"api-response-types",text:"API Response Types"},{depth:3,id:"form-state-management",text:"Form State Management"},{depth:3,id:"react-hoc-types",text:"React HOC Types"},{depth:2,id:"حارسات-الأنواع-مع-الأدوات",text:"حارسات الأنواع مع الأدوات"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"تجنب-التداخل-العميق",text:"تجنّب التداخل العميق"},{depth:3,id:"استخدم-أسماء-الأنواع-aliases",text:"استخدم أسماء الأنواع (Aliases)"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"اجمع-من-أجل-الوضوح",text:"اجمع من أجل الوضوح"},{depth:3,id:"أنشئ-أدوات-خاصة-بالمجال",text:"أنشئ أدوات خاصة بالمجال"},{depth:3,id:"وثق-الأدوات-المعقدة",text:"وثّق الأدوات المعقدة"},{depth:2,id:"ملخص",text:"ملخص"}],e=`<p>يوفر TypeScript كنزًا من أنواع الأدوات المدمجة التي تجنبك كتابة تحويلات الأنواع (type transformations). اعتبرها المكتبة القياسية على مستوى الأنواع — أدوات جاهزة للتعاملات الشائعة. لنتعرف على كل نوع أداة ونتعلم كيفية إنشاء أنواعنا الخاصة.</p>
<h2 id="أدوات-التعامل-مع-الكائنات">أدوات التعامل مع الكائنات</h2>
<h3 id="partiallttgt">Partial&lt;T&gt;</h3>
<p>يجعل جميع الخصائص اختيارية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialUser</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   id?: string;</span>
<span class="hljs-comment">//   name?: string;</span>
<span class="hljs-comment">//   email?: string;</span>
<span class="hljs-comment">//   age?: number;</span>
<span class="hljs-comment">// }</span>

<span class="hljs-comment">// Perfect for update operations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">updateUser</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">updates</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;</span>) {
  <span class="hljs-comment">// Only update provided fields</span>
  <span class="hljs-keyword">return</span> database.<span class="hljs-title function_">update</span>(id, updates);
}

<span class="hljs-title function_">updateUser</span>(<span class="hljs-string">&#x27;123&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> }); <span class="hljs-comment">// ✅ Only updating name</span>
<span class="hljs-title function_">updateUser</span>(<span class="hljs-string">&#x27;123&#x27;</span>, {}); <span class="hljs-comment">// ✅ No updates</span>
</code></pre>
<h3 id="requiredlttgt">Required&lt;T&gt;</h3>
<p>يجعل جميع الخصائص مطلوبة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Config</span> {
  <span class="hljs-attr">apiUrl</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timeout</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">retries</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">RequiredConfig</span> = <span class="hljs-title class_">Required</span>&lt;<span class="hljs-title class_">Config</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   apiUrl: string;</span>
<span class="hljs-comment">//   timeout: number;</span>
<span class="hljs-comment">//   retries: number;</span>
<span class="hljs-comment">// }</span>

<span class="hljs-comment">// Ensure all config is provided</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">initialize</span>(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-title class_">Required</span>&lt;<span class="hljs-title class_">Config</span>&gt;</span>) {
  <span class="hljs-comment">// All properties guaranteed to exist</span>
  <span class="hljs-title function_">connect</span>(config.<span class="hljs-property">apiUrl</span>, config.<span class="hljs-property">timeout</span>);
}
</code></pre>
<h3 id="readonlylttgt">Readonly&lt;T&gt;</h3>
<p>يجعل جميع الخصائص للقراءة فقط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">State</span> {
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReadonlyState</span> = <span class="hljs-title class_">Readonly</span>&lt;<span class="hljs-title class_">State</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   readonly count: number;</span>
<span class="hljs-comment">//   readonly user: User;</span>
<span class="hljs-comment">// }</span>

<span class="hljs-comment">// Prevent accidental mutations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processState</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">Readonly</span>&lt;<span class="hljs-title class_">State</span>&gt;</span>) {
  <span class="hljs-comment">// state.count = 5;  // ❌ Error: Cannot assign to &#x27;count&#x27;</span>
  <span class="hljs-keyword">return</span> { ...state, <span class="hljs-attr">count</span>: state.<span class="hljs-property">count</span> + <span class="hljs-number">1</span> }; <span class="hljs-comment">// ✅ Create new object</span>
}
</code></pre>
<h3 id="recordltk-tgt">Record&lt;K, T&gt;</h3>
<p>ينشئ نوع كائن بمفاتيح K وقيم T:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Role</span> = <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span> | <span class="hljs-string">&#x27;guest&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Permissions</span> = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">Role</span>, <span class="hljs-built_in">string</span>[]&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   admin: string[];</span>
<span class="hljs-comment">//   user: string[];</span>
<span class="hljs-comment">//   guest: string[];</span>
<span class="hljs-comment">// }</span>

<span class="hljs-keyword">const</span> <span class="hljs-attr">permissions</span>: <span class="hljs-title class_">Permissions</span> = {
  <span class="hljs-attr">admin</span>: [<span class="hljs-string">&#x27;read&#x27;</span>, <span class="hljs-string">&#x27;write&#x27;</span>, <span class="hljs-string">&#x27;delete&#x27;</span>],
  <span class="hljs-attr">user</span>: [<span class="hljs-string">&#x27;read&#x27;</span>, <span class="hljs-string">&#x27;write&#x27;</span>],
  <span class="hljs-attr">guest</span>: [<span class="hljs-string">&#x27;read&#x27;</span>],
};

<span class="hljs-comment">// Dynamic keys</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Cache</span>&lt;T&gt; = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, T&gt;;

<span class="hljs-keyword">const</span> <span class="hljs-attr">userCache</span>: <span class="hljs-title class_">Cache</span>&lt;<span class="hljs-title class_">User</span>&gt; = {
  <span class="hljs-string">&#x27;user-1&#x27;</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> },
  <span class="hljs-string">&#x27;user-2&#x27;</span>: { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Bob&#x27;</span> },
};
</code></pre>
<h2 id="أدوات-اختيار-الخصائص">أدوات اختيار الخصائص</h2>
<h3 id="pickltt-kgt">Pick&lt;T, K&gt;</h3>
<p>يختار خصائص محددة من نوع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserPreview</span> = <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;name&#x27;</span>&gt;;
<span class="hljs-comment">// { id: string; name: string; }</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PublicUser</span> = <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span>&gt;;
<span class="hljs-comment">// { id: string; name: string; email: string; }</span>

<span class="hljs-comment">// Use in function parameters</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">displayUser</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span>&gt;</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${user.name}</span> (<span class="hljs-subst">\${user.email}</span>)\`</span>;
}
</code></pre>
<h3 id="omitltt-kgt">Omit&lt;T, K&gt;</h3>
<p>يحذف خصائص محددة من نوع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">UserWithoutPassword</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;password&#x27;</span>&gt;;
<span class="hljs-comment">// { id: string; name: string; email: string; createdAt: Date; }</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserUpdate</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;createdAt&#x27;</span>&gt;;
<span class="hljs-comment">// { name: string; email: string; password: string; }</span>

<span class="hljs-comment">// Remove sensitive data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">sanitizeUser</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>): <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;password&#x27;</span>&gt; {
  <span class="hljs-keyword">const</span> { password, ...sanitized } = user;
  <span class="hljs-keyword">return</span> sanitized;
}
</code></pre>
<h2 id="أدوات-التعامل-مع-الاتحادات">أدوات التعامل مع الاتحادات</h2>
<h3 id="excludeltt-ugt">Exclude&lt;T, U&gt;</h3>
<p>يستبعد أنواعًا من اتحاد:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ActiveStatus</span> = <span class="hljs-title class_">Exclude</span>&lt;<span class="hljs-title class_">Status</span>, <span class="hljs-string">&#x27;idle&#x27;</span>&gt;;
<span class="hljs-comment">// &#x27;loading&#x27; | &#x27;success&#x27; | &#x27;error&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Primitive</span> = <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NonNullablePrimitive</span> = <span class="hljs-title class_">Exclude</span>&lt;<span class="hljs-title class_">Primitive</span>, <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>&gt;;
<span class="hljs-comment">// string | number | boolean</span>

<span class="hljs-comment">// Filter union members</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Events</span> = <span class="hljs-string">&#x27;click&#x27;</span> | <span class="hljs-string">&#x27;focus&#x27;</span> | <span class="hljs-string">&#x27;blur&#x27;</span> | <span class="hljs-string">&#x27;change&#x27;</span> | <span class="hljs-string">&#x27;submit&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NonFormEvents</span> = <span class="hljs-title class_">Exclude</span>&lt;<span class="hljs-title class_">Events</span>, <span class="hljs-string">&#x27;change&#x27;</span> | <span class="hljs-string">&#x27;submit&#x27;</span>&gt;;
<span class="hljs-comment">// &#x27;click&#x27; | &#x27;focus&#x27; | &#x27;blur&#x27;</span>
</code></pre>
<h3 id="extractltt-ugt">Extract&lt;T, U&gt;</h3>
<p>يستخرج أنواعًا من اتحاد:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Status</span> = <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DoneStatus</span> = <span class="hljs-title class_">Extract</span>&lt;<span class="hljs-title class_">Status</span>, <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>&gt;;
<span class="hljs-comment">// &#x27;success&#x27; | &#x27;error&#x27;</span>

<span class="hljs-comment">// Extract specific shapes from union</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Shape</span> =
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;circle&#x27;</span>; <span class="hljs-attr">radius</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;square&#x27;</span>; <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;triangle&#x27;</span>; <span class="hljs-attr">base</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">RoundShape</span> = <span class="hljs-title class_">Extract</span>&lt;<span class="hljs-title class_">Shape</span>, { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;circle&#x27;</span> }&gt;;
<span class="hljs-comment">// { kind: &#x27;circle&#x27;; radius: number }</span>

<span class="hljs-comment">// Extract functions from union</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Mixed</span> = <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | (<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>) | (<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">string</span>);
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Functions</span> = <span class="hljs-title class_">Extract</span>&lt;<span class="hljs-title class_">Mixed</span>, <span class="hljs-title class_">Function</span>&gt;;
<span class="hljs-comment">// (() =&gt; void) | (() =&gt; string)</span>
</code></pre>
<h3 id="nonnullablelttgt">NonNullable&lt;T&gt;</h3>
<p>يزيل null و undefined:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">MaybeString</span> = <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DefiniteString</span> = <span class="hljs-title class_">NonNullable</span>&lt;<span class="hljs-title class_">MaybeString</span>&gt;;
<span class="hljs-comment">// string</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">MaybeUser</span> = <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DefiniteUser</span> = <span class="hljs-title class_">NonNullable</span>&lt;<span class="hljs-title class_">MaybeUser</span>&gt;;
<span class="hljs-comment">// User</span>

<span class="hljs-comment">// Clean up optional values</span>
<span class="hljs-keyword">function</span> processValue&lt;T&gt;(<span class="hljs-attr">value</span>: T | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>): <span class="hljs-title class_">NonNullable</span>&lt;T&gt; {
  <span class="hljs-keyword">if</span> (value === <span class="hljs-literal">null</span> || value === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Value is required&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> value; <span class="hljs-comment">// Type is NonNullable&lt;T&gt;</span>
}
</code></pre>
<h2 id="أدوات-الدوال">أدوات الدوال</h2>
<h3 id="parameterslttgt">Parameters&lt;T&gt;</h3>
<p>يستخرج معاملات الدالة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">createUser</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, name, age, <span class="hljs-attr">email</span>: email || <span class="hljs-string">&#x27;&#x27;</span> };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CreateUserParams</span> = <span class="hljs-title class_">Parameters</span>&lt;<span class="hljs-keyword">typeof</span> createUser&gt;;
<span class="hljs-comment">// [name: string, age: number, email?: string]</span>

<span class="hljs-comment">// Use with rest parameters</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">log</span>(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-built_in">string</span>[]</span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(...args);
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LogParams</span> = <span class="hljs-title class_">Parameters</span>&lt;<span class="hljs-keyword">typeof</span> log&gt;;
<span class="hljs-comment">// string[]</span>

<span class="hljs-comment">// Apply to other functions</span>
<span class="hljs-keyword">function</span> applyFunction&lt;F <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]) =&gt; <span class="hljs-built_in">any</span>&gt;(
  <span class="hljs-attr">fn</span>: F,
  <span class="hljs-attr">args</span>: <span class="hljs-title class_">Parameters</span>&lt;F&gt;,
): <span class="hljs-title class_">ReturnType</span>&lt;F&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">fn</span>(...args);
}
</code></pre>
<h3 id="returntypelttgt">ReturnType&lt;T&gt;</h3>
<p>يستخرج نوع إرجاع الدالة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">getUser</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserReturn</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> getUser&gt;;
<span class="hljs-comment">// User</span>

<span class="hljs-comment">// With async functions</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchData</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>[]&gt; {
  <span class="hljs-keyword">return</span> [<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-string">&#x27;c&#x27;</span>];
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">DataReturn</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> fetchData&gt;;
<span class="hljs-comment">// Promise&lt;string[]&gt;</span>

<span class="hljs-comment">// Generic return type</span>
<span class="hljs-keyword">function</span> identity&lt;T&gt;(<span class="hljs-attr">value</span>: T): T {
  <span class="hljs-keyword">return</span> value;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringIdentity</span> = <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> identity&lt;<span class="hljs-built_in">string</span>&gt;&gt;;
<span class="hljs-comment">// string</span>
</code></pre>
<h3 id="constructorparameterslttgt">ConstructorParameters&lt;T&gt;</h3>
<p>يستخرج معاملات المُنشئ:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">public</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-keyword">public</span> <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>,
    <span class="hljs-keyword">private</span> <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>,
  </span>) {}
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserConstructorParams</span> = <span class="hljs-title class_">ConstructorParameters</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">User</span>&gt;;
<span class="hljs-comment">// [name: string, age: number, id: string]</span>

<span class="hljs-comment">// Use with factory functions</span>
<span class="hljs-keyword">function</span> createInstance&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title function_">new</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]) =&gt; <span class="hljs-built_in">any</span>&gt;(
  <span class="hljs-title class_">Constructor</span>: T,
  ...<span class="hljs-attr">args</span>: <span class="hljs-title class_">ConstructorParameters</span>&lt;T&gt;
): <span class="hljs-title class_">InstanceType</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Constructor</span>(...args);
}
</code></pre>
<h3 id="instancetypelttgt">InstanceType&lt;T&gt;</h3>
<p>يحصل على نوع المثيل للمُنشئ:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">UserInstance</span> = <span class="hljs-title class_">InstanceType</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">User</span>&gt;;
<span class="hljs-comment">// User</span>

<span class="hljs-comment">// With built-in constructors</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DateInstance</span> = <span class="hljs-title class_">InstanceType</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Date</span>&gt;;
<span class="hljs-comment">// Date</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ErrorInstance</span> = <span class="hljs-title class_">InstanceType</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Error</span>&gt;;
<span class="hljs-comment">// Error</span>

<span class="hljs-comment">// Generic factory</span>
<span class="hljs-keyword">function</span> factory&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title function_">new</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]) =&gt; <span class="hljs-built_in">any</span>&gt;(<span class="hljs-title class_">Constructor</span>: T): <span class="hljs-title class_">InstanceType</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Constructor</span>();
}
</code></pre>
<h2 id="أدوات-التعامل-مع-السلاسل">أدوات التعامل مع السلاسل</h2>
<h3 id="uppercaselttgt">Uppercase&lt;T&gt;</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Shout</span> = <span class="hljs-title class_">Uppercase</span>&lt;<span class="hljs-string">&#x27;hello&#x27;</span>&gt;;
<span class="hljs-comment">// &#x27;HELLO&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Methods</span> = <span class="hljs-string">&#x27;get&#x27;</span> | <span class="hljs-string">&#x27;post&#x27;</span> | <span class="hljs-string">&#x27;put&#x27;</span> | <span class="hljs-string">&#x27;delete&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UpperMethods</span> = <span class="hljs-title class_">Uppercase</span>&lt;<span class="hljs-title class_">Methods</span>&gt;;
<span class="hljs-comment">// &#x27;GET&#x27; | &#x27;POST&#x27; | &#x27;PUT&#x27; | &#x27;DELETE&#x27;</span>
</code></pre>
<h3 id="lowercaselttgt">Lowercase&lt;T&gt;</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Whisper</span> = <span class="hljs-title class_">Lowercase</span>&lt;<span class="hljs-string">&#x27;HELLO&#x27;</span>&gt;;
<span class="hljs-comment">// &#x27;hello&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">HTTPMethods</span> = <span class="hljs-string">&#x27;GET&#x27;</span> | <span class="hljs-string">&#x27;POST&#x27;</span> | <span class="hljs-string">&#x27;PUT&#x27;</span> | <span class="hljs-string">&#x27;DELETE&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LowerMethods</span> = <span class="hljs-title class_">Lowercase</span>&lt;<span class="hljs-title class_">HTTPMethods</span>&gt;;
<span class="hljs-comment">// &#x27;get&#x27; | &#x27;post&#x27; | &#x27;put&#x27; | &#x27;delete&#x27;</span>
</code></pre>
<h3 id="capitalizelttgt">Capitalize&lt;T&gt;</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Title</span> = <span class="hljs-title class_">Capitalize</span>&lt;<span class="hljs-string">&#x27;hello world&#x27;</span>&gt;;
<span class="hljs-comment">// &#x27;Hello world&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">EventNames</span> = <span class="hljs-string">&#x27;click&#x27;</span> | <span class="hljs-string">&#x27;focus&#x27;</span> | <span class="hljs-string">&#x27;blur&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">HandlerNames</span> = <span class="hljs-string">\`on<span class="hljs-subst">\${Capitalize&lt;EventNames&gt;}</span>\`</span>;
<span class="hljs-comment">// &#x27;onClick&#x27; | &#x27;onFocus&#x27; | &#x27;onBlur&#x27;</span>
</code></pre>
<h3 id="uncapitalizelttgt">Uncapitalize&lt;T&gt;</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Normal</span> = <span class="hljs-title class_">Uncapitalize</span>&lt;<span class="hljs-string">&#x27;Hello World&#x27;</span>&gt;;
<span class="hljs-comment">// &#x27;hello World&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PropertyNames</span> = <span class="hljs-string">&#x27;Name&#x27;</span> | <span class="hljs-string">&#x27;Age&#x27;</span> | <span class="hljs-string">&#x27;Email&#x27;</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LowerPropertyNames</span> = <span class="hljs-title class_">Uncapitalize</span>&lt;<span class="hljs-title class_">PropertyNames</span>&gt;;
<span class="hljs-comment">// &#x27;name&#x27; | &#x27;age&#x27; | &#x27;email&#x27;</span>
</code></pre>
<h2 id="أدوات-promise">أدوات Promise</h2>
<h3 id="awaitedlttgt">Awaited&lt;T&gt;</h3>
<p>يفك أنواع Promise:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PromiseString</span> = <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringType</span> = <span class="hljs-title class_">Awaited</span>&lt;<span class="hljs-title class_">PromiseString</span>&gt;;
<span class="hljs-comment">// string</span>

<span class="hljs-comment">// Nested promises</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NestedPromise</span> = <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">number</span>&gt;&gt;&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">NumberType</span> = <span class="hljs-title class_">Awaited</span>&lt;<span class="hljs-title class_">NestedPromise</span>&gt;;
<span class="hljs-comment">// number</span>

<span class="hljs-comment">// With async functions</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUser</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FetchedUser</span> = <span class="hljs-title class_">Awaited</span>&lt;<span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> fetchUser&gt;&gt;;
<span class="hljs-comment">// User</span>
</code></pre>
<h2 id="أنماط-الأدوات-الخاصة-بـ-react">أنماط الأدوات الخاصة بـ React</h2>
<h3 id="أدوات-خصائص-المكون">أدوات خصائص المكوّن</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Extract props from any component</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PropsOf</span>&lt;C&gt; = C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;infer P&gt; ? P : <span class="hljs-built_in">never</span>;

<span class="hljs-comment">// Make specific props optional</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Optional</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; = <span class="hljs-title class_">Omit</span>&lt;T, K&gt; &amp; <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;T, K&gt;&gt;;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">disabled</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FlexibleButton</span> = <span class="hljs-title class_">Optional</span>&lt;<span class="hljs-title class_">ButtonProps</span>, <span class="hljs-string">&#x27;disabled&#x27;</span> | <span class="hljs-string">&#x27;onClick&#x27;</span>&gt;;
<span class="hljs-comment">// { label: string; disabled?: boolean; onClick?: () =&gt; void; }</span>
</code></pre>
<h3 id="أنواع-معالجات-الأحداث">أنواع معالجات الأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Extract event type from handler</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">EventOf</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (<span class="hljs-attr">event</span>: infer E) =&gt; <span class="hljs-built_in">void</span> ? E : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ClickHandler</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">MouseEvent</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ClickEvent</span> = <span class="hljs-title class_">EventOf</span>&lt;<span class="hljs-title class_">ClickHandler</span>&gt;;
<span class="hljs-comment">// React.MouseEvent</span>

<span class="hljs-comment">// Create handler type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Handler</span>&lt;E&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: E</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">MouseHandler</span> = <span class="hljs-title class_">Handler</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">MouseEvent</span>&gt;;
</code></pre>
<h2 id="أنواع-الأدوات-المخصصة">أنواع الأدوات المخصصة</h2>
<h3 id="deeppartial">DeepPartial</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepPartial</span>&lt;T&gt; = {
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
<h3 id="deepreadonly">DeepReadonly</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepReadonly</span>&lt;T&gt; = {
  <span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepReadonly</span>&lt;T[P]&gt; : T[P];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ImmutableConfig</span> = <span class="hljs-title class_">DeepReadonly</span>&lt;<span class="hljs-title class_">Config</span>&gt;;
<span class="hljs-comment">// Everything is readonly, including nested properties</span>
</code></pre>
<h3 id="mutable">Mutable</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Mutable</span>&lt;T&gt; = {
  -<span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ReadonlyUser</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">MutableUser</span> = <span class="hljs-title class_">Mutable</span>&lt;<span class="hljs-title class_">ReadonlyUser</span>&gt;;
<span class="hljs-comment">// { id: string; name: string; }</span>
</code></pre>
<h3 id="pickbyvalue">PickByValue</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">PickByValue</span>&lt;T, V&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> T[K] <span class="hljs-keyword">extends</span> V ? K : <span class="hljs-built_in">never</span>]: T[K];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Mixed</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">isActive</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">description</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">StringFields</span> = <span class="hljs-title class_">PickByValue</span>&lt;<span class="hljs-title class_">Mixed</span>, <span class="hljs-built_in">string</span>&gt;;
<span class="hljs-comment">// { name: string; description: string; }</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NumberFields</span> = <span class="hljs-title class_">PickByValue</span>&lt;<span class="hljs-title class_">Mixed</span>, <span class="hljs-built_in">number</span>&gt;;
<span class="hljs-comment">// { id: number; count: number; }</span>
</code></pre>
<h3 id="omitbyvalue">OmitByValue</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">OmitByValue</span>&lt;T, V&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T <span class="hljs-keyword">as</span> T[K] <span class="hljs-keyword">extends</span> V ? <span class="hljs-built_in">never</span> : K]: T[K];
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NonStringFields</span> = <span class="hljs-title class_">OmitByValue</span>&lt;<span class="hljs-title class_">Mixed</span>, <span class="hljs-built_in">string</span>&gt;;
<span class="hljs-comment">// { id: number; isActive: boolean; count: number; }</span>
</code></pre>
<h3 id="nullable">Nullable</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Nullable</span>&lt;T&gt; = T | <span class="hljs-literal">null</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Optional</span>&lt;T&gt; = T | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Maybe</span>&lt;T&gt; = T | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NullableString</span> = <span class="hljs-title class_">Nullable</span>&lt;<span class="hljs-built_in">string</span>&gt;; <span class="hljs-comment">// string | null</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">OptionalNumber</span> = <span class="hljs-title class_">Optional</span>&lt;<span class="hljs-built_in">number</span>&gt;; <span class="hljs-comment">// number | undefined</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">MaybeUser</span> = <span class="hljs-title class_">Maybe</span>&lt;<span class="hljs-title class_">User</span>&gt;; <span class="hljs-comment">// User | null | undefined</span>
</code></pre>
<h3 id="valueof">ValueOf</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ValueOf</span>&lt;T&gt; = T[keyof T];

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Colors</span> {
  <span class="hljs-attr">red</span>: <span class="hljs-string">&#x27;#ff0000&#x27;</span>;
  <span class="hljs-attr">green</span>: <span class="hljs-string">&#x27;#00ff00&#x27;</span>;
  <span class="hljs-attr">blue</span>: <span class="hljs-string">&#x27;#0000ff&#x27;</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ColorValue</span> = <span class="hljs-title class_">ValueOf</span>&lt;<span class="hljs-title class_">Colors</span>&gt;;
<span class="hljs-comment">// &#x27;#ff0000&#x27; | &#x27;#00ff00&#x27; | &#x27;#0000ff&#x27;</span>
</code></pre>
<h2 id="توليفات-متقدمة">توليفات متقدمة</h2>
<h3 id="api-response-types">API Response Types</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Combine multiple utilities</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; = <span class="hljs-title class_">Readonly</span>&lt;{
  <span class="hljs-attr">data</span>: T;
  <span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
}&gt;;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialApiResponse</span>&lt;T&gt; = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">ApiResponse</span>&lt;T&gt;&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ApiResponseData</span>&lt;T&gt; = <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">ApiResponse</span>&lt;T&gt;, <span class="hljs-string">&#x27;data&#x27;</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ApiMetadata</span>&lt;T&gt; = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">ApiResponse</span>&lt;T&gt;, <span class="hljs-string">&#x27;data&#x27;</span>&gt;;

<span class="hljs-comment">// Create variations</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserResponse</span> = <span class="hljs-title class_">ApiResponse</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialUserResponse</span> = <span class="hljs-title class_">PartialApiResponse</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserData</span> = <span class="hljs-title class_">ApiResponseData</span>&lt;<span class="hljs-title class_">User</span>&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserMetadata</span> = <span class="hljs-title class_">ApiMetadata</span>&lt;<span class="hljs-title class_">User</span>&gt;;
</code></pre>
<h3 id="form-state-management">Form State Management</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Form field state</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FieldState</span>&lt;T&gt; = {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">touched</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">dirty</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-comment">// Convert model to form</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormState</span>&lt;T&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-title class_">FieldState</span>&lt;T[K]&gt;;
};

<span class="hljs-comment">// Form with validation</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidatedForm</span>&lt;T&gt; = <span class="hljs-title class_">FormState</span>&lt;T&gt; &amp; {
  <span class="hljs-attr">isValid</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isSubmitting</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">errors</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Record</span>&lt;keyof T, <span class="hljs-built_in">string</span>&gt;&gt;;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoginData</span> {
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">password</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoginForm</span> = <span class="hljs-title class_">ValidatedForm</span>&lt;<span class="hljs-title class_">LoginData</span>&gt;;
</code></pre>
<h3 id="react-hoc-types">React HOC Types</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// HOC that adds loading state</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WithLoading</span>&lt;P&gt; = P &amp; {
  <span class="hljs-attr">loading</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
};

<span class="hljs-comment">// HOC that injects props</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InjectProps</span>&lt;P, I&gt; = <span class="hljs-title class_">Omit</span>&lt;P, keyof I&gt; &amp; <span class="hljs-title class_">Partial</span>&lt;I&gt;;

<span class="hljs-comment">// Theme injection</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ThemeProps</span> {
  <span class="hljs-attr">theme</span>: {
    <span class="hljs-attr">colors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
    <span class="hljs-attr">fonts</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
  };
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">WithTheme</span>&lt;P&gt; = <span class="hljs-title class_">InjectProps</span>&lt;P, <span class="hljs-title class_">ThemeProps</span>&gt;;

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">theme</span>?: <span class="hljs-title class_">ThemeProps</span>[<span class="hljs-string">&#x27;theme&#x27;</span>];
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ThemedButton</span> = <span class="hljs-title class_">WithTheme</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt;;
<span class="hljs-comment">// { label: string; onClick: () =&gt; void; theme?: ThemeProps[&#x27;theme&#x27;]; }</span>
</code></pre>
<h2 id="حارسات-الأنواع-مع-الأدوات">حارسات الأنواع مع الأدوات</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Create type guards for utility types</span>
<span class="hljs-keyword">function</span> isPartial&lt;T&gt;(<span class="hljs-attr">value</span>: T | <span class="hljs-title class_">Partial</span>&lt;T&gt;): value is <span class="hljs-title class_">Partial</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(value).<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> v === <span class="hljs-literal">undefined</span>);
}

<span class="hljs-keyword">function</span> isRequired&lt;T&gt;(<span class="hljs-attr">value</span>: <span class="hljs-title class_">Partial</span>&lt;T&gt;): value is <span class="hljs-title class_">Required</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(value).<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> v !== <span class="hljs-literal">undefined</span>);
}

<span class="hljs-keyword">function</span> isNonNullable&lt;T&gt;(<span class="hljs-attr">value</span>: T): value is <span class="hljs-title class_">NonNullable</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> value !== <span class="hljs-literal">null</span> &amp;&amp; value !== <span class="hljs-literal">undefined</span>;
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processUser</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt; | <span class="hljs-title class_">User</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isRequired</span>(user)) {
    <span class="hljs-comment">// user is Required&lt;User&gt; (all fields present)</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(user.<span class="hljs-property">email</span>); <span class="hljs-comment">// Safe access</span>
  }
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="تجنب-التداخل-العميق">تجنّب التداخل العميق</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Can be slow</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepNested</span>&lt;T&gt; = {
  [P <span class="hljs-keyword">in</span> keyof T]: <span class="hljs-title class_">DeepNested</span>&lt;<span class="hljs-title class_">DeepNested</span>&lt;<span class="hljs-title class_">DeepNested</span>&lt;T[P]&gt;&gt;&gt;;
};

<span class="hljs-comment">// ✅ Limit depth</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LimitedDepth</span>&lt;T, D <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">3</span>&gt; = D <span class="hljs-keyword">extends</span> <span class="hljs-number">0</span>
  ? T
  : { [P <span class="hljs-keyword">in</span> keyof T]: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">LimitedDepth</span>&lt;T[P], <span class="hljs-title class_">Prev</span>[D]&gt; : T[P] };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Prev</span> = [<span class="hljs-built_in">never</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
</code></pre>
<h3 id="استخدم-أسماء-الأنواع-aliases">استخدم أسماء الأنواع (Aliases)</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Reusable and clear</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserUpdate</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span>&gt;&gt;;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PublicUser</span> = <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span>&gt;;

<span class="hljs-comment">// ❌ Bad: Inline everywhere</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">update</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span>&gt;&gt;</span>) {}
<span class="hljs-keyword">function</span> <span class="hljs-title function_">display</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;id&#x27;</span> | <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span>&gt;</span>) {}
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="اجمع-من-أجل-الوضوح">اجمع من أجل الوضوح</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Instead of complex inline types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserFormData</span> = <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;<span class="hljs-title class_">User</span>, <span class="hljs-string">&#x27;name&#x27;</span> | <span class="hljs-string">&#x27;email&#x27;</span> | <span class="hljs-string">&#x27;age&#x27;</span>&gt;&gt;;

<span class="hljs-comment">// Is clearer than</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserFormData2</span> = {
  <span class="hljs-attr">name</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>?: <span class="hljs-built_in">number</span>;
};
</code></pre>
<h3 id="أنشئ-أدوات-خاصة-بالمجال">أنشئ أدوات خاصة بالمجال</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Project-specific utilities</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Loadable</span>&lt;T&gt; = {
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Timestamped</span>&lt;T&gt; = T &amp; {
  <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">updatedAt</span>: <span class="hljs-title class_">Date</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Identifiable</span>&lt;T&gt; = T &amp; {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
};
</code></pre>
<h3 id="وثق-الأدوات-المعقدة">وثّق الأدوات المعقدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">/**
 * Makes specified keys optional while keeping others required
 * <span class="hljs-doctag">@example</span>
 * type Result = PartialBy&lt;User, &#x27;email&#x27; | &#x27;age&#x27;&gt;
 * // { id: string; name: string; email?: string; age?: number; }
 */</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PartialBy</span>&lt;T, K <span class="hljs-keyword">extends</span> keyof T&gt; = <span class="hljs-title class_">Omit</span>&lt;T, K&gt; &amp; <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">Pick</span>&lt;T, K&gt;&gt;;
</code></pre>
<h2 id="ملخص">ملخص</h2>
<p>أنواع الأدوات هي أدوات أساسية في صندوق أدوات TypeScript الخاص بك:</p>
<ol>
<li><strong>أدوات الكائنات</strong> (<code>Partial</code>، <code>Required</code>، <code>Readonly</code>، <code>Record</code>) - تحويل أنواع الكائنات</li>
<li><strong>أدوات الاختيار</strong> (<code>Pick</code>، <code>Omit</code>) - اختيار أو استبعاد الخصائص</li>
<li><strong>أدوات الاتحاد</strong> (<code>Exclude</code>، <code>Extract</code>، <code>NonNullable</code>) - التعامل مع أنواع الاتحاد</li>
<li><strong>أدوات الدوال</strong> (<code>Parameters</code>، <code>ReturnType</code>) - استخراج معلومات نوع الدالة</li>
<li><strong>أدوات السلاسل</strong> (<code>Uppercase</code>، <code>Lowercase</code>، إلخ) - تحويل أنواع السلاسل الحرفيّة</li>
<li><strong>الأدوات المخصصة</strong> - ابنِ أدواتك الخاصة للاحتياجات الخاصة بالمجال</li>
</ol>
<p>أتقن هذه الأدوات، وستكتب شيفرة TypeScript أنظف وأسهل صيانة مع تكرار أقل!</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
