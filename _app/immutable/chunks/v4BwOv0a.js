const s="kinney",a="react-typescript",n="React مع TypeScript",p="type-level-testing-in-practice",l="اختبار الأنواع (Type-Level Testing) في الممارسة",t=[{depth:2,id:"tsd-أو-expecttypeof",text:"tsd أو expectTypeOf"},{depth:2,id:"التكامل-المستمر-ci-وتغطية-الأنواع",text:"التكامل المستمر (CI) وتغطية الأنواع"},{depth:2,id:"اختبار-المكونات-متعددة-الأشكال-polymorphic",text:"اختبار المكوّنات متعدّدة الأشكال (Polymorphic)"},{depth:2,id:"الحفاظ-على-خصائص-مكونات-higher-order-hoc",text:"الحفاظ على خصائص مكوّنات higher-order (HOC)"},{depth:2,id:"إعداد-tsd-بديل",text:"إعداد tsd (بديل)"},{depth:2,id:"حماية-الواجهات-البرمجية-العامة-public-apis-في-المكتبات",text:"حماية الواجهات البرمجية العامة (Public APIs) في المكتبات"},{depth:2,id:"لقطات-snapshots-لأنواع-مكونات-public",text:"لقطات (Snapshots) لأنواع مكوّنات public"}],e=`<p>يمكن للأنواع أن تتدحرج (regress) بصمت. أضف اختبارات على مستوى الأنواع (type-level tests) للكشف عن الأعطال عند إعادة تشكيل الأنواع العامة (generics)، والتحميلات الزائدة (overloads)، والواجهات البرمجية العامة (public APIs).</p>
<h2 id="tsd-أو-expecttypeof"><code>tsd</code> أو <code>expectTypeOf</code></h2>
<pre><code class="language-typescript"><span class="hljs-comment">// vitest + expectTypeOf</span>
<span class="hljs-keyword">import</span> { expectTypeOf, describe, it } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Foo</span>&lt;T&gt; = { <span class="hljs-attr">value</span>: T };

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Foo&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;preserves generic&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">x</span>: <span class="hljs-title class_">Foo</span>&lt;<span class="hljs-built_in">number</span>&gt; = { <span class="hljs-attr">value</span>: <span class="hljs-number">42</span> };
    <span class="hljs-title function_">expectTypeOf</span>(x.<span class="hljs-property">value</span>).<span class="hljs-property">toEqualTypeOf</span>&lt;<span class="hljs-built_in">number</span>&gt;();
  });
});
</code></pre>
<h2 id="التكامل-المستمر-ci-وتغطية-الأنواع">التكامل المستمر (CI) وتغطية الأنواع</h2>
<ul>
<li>شغّل اختبارات الأنواع في CI تمامًا كما تفعل مع اختبارات الوحدة.</li>
<li>تتبّع ميزانيات «تغطية الأنواع»: امنع <code>any</code>، وفرض <code>noUncheckedIndexedAccess</code>.</li>
<li>اجعل إصدارات مكتبات المكوّنات مشروطة باجتياز تحقّقات الأنواع.</li>
</ul>
<h2 id="اختبار-المكونات-متعددة-الأشكال-polymorphic">اختبار المكوّنات متعدّدة الأشكال (Polymorphic)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { expectTypeOf, it } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-comment">// Polymorphic Button with \`as\` prop</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">Button</span>&lt;C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ElementType</span> = <span class="hljs-string">&#x27;button&#x27;</span>&gt;(<span class="hljs-attr">props</span>: {
  <span class="hljs-attr">as</span>?: C;
} &amp; <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentPropsWithoutRef</span>&lt;C&gt;): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;infers correct props for anchor&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> el = <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">as</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/&quot;</span> /&gt;</span></span>;
  <span class="hljs-title function_">expectTypeOf</span>(el.<span class="hljs-property">props</span>.<span class="hljs-property">href</span>).<span class="hljs-title function_">toBeString</span>(); <span class="hljs-comment">// href must exist on anchor</span>
});
</code></pre>
<h2 id="الحفاظ-على-خصائص-مكونات-higher-order-hoc">الحفاظ على خصائص مكوّنات higher-order (HOC)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> withLogging&lt;P&gt;(<span class="hljs-title class_">Comp</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;) {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: P</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Comp</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">InputProps</span> = { <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">v</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span> };
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Input</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">InputProps</span>&gt; = <span class="hljs-function">() =&gt;</span> <span class="hljs-literal">null</span>;
<span class="hljs-keyword">const</span> <span class="hljs-title class_">LoggedInput</span> = <span class="hljs-title function_">withLogging</span>(<span class="hljs-title class_">Input</span>);

<span class="hljs-comment">// ensure HOC preserves prop types</span>
expectTypeOf&lt;<span class="hljs-title class_">Parameters</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">LoggedInput</span>&gt;[<span class="hljs-number">0</span>]&gt;().<span class="hljs-property">toEqualTypeOf</span>&lt;<span class="hljs-title class_">InputProps</span>&gt;();
</code></pre>
<h2 id="إعداد-tsd-بديل">إعداد <code>tsd</code> (بديل)</h2>
<pre><code class="language-json"><span class="hljs-comment">// package.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;test:types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsd&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// tsd.config.json</span>
{
  <span class="hljs-string">&quot;entry&quot;</span>: <span class="hljs-string">&quot;./types/**/*.test-d.ts&quot;</span>
}
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// types/button.test-d.ts</span>
<span class="hljs-keyword">import</span> { expectType } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tsd&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../dist&#x27;</span>;

expectType&lt;<span class="hljs-variable constant_">JSX</span>.<span class="hljs-property">Element</span>&gt;(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> /&gt;</span></span>);
</code></pre>
<h2 id="حماية-الواجهات-البرمجية-العامة-public-apis-في-المكتبات">حماية الواجهات البرمجية العامة (Public APIs) في المكتبات</h2>
<ul>
<li>صدّر الأنواع (<code>export type { ButtonProps }</code>) وتحقّق منها في <code>test:types</code>.</li>
<li>ثبّت overloads والقيم الافتراضية (defaults) للـ generics بتحقّقات موجّهة.</li>
</ul>
<h2 id="لقطات-snapshots-لأنواع-مكونات-public">لقطات (Snapshots) لأنواع مكوّنات public</h2>
<p>ثبّت واجهتك البرمجية public بأنواع type snapshots باستخدام <code>tsd</code> أو <code>expectTypeOf</code>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// tsd: Button and TextField public types</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { expectType } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;tsd&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../dist&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">TextField</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../dist&#x27;</span>;

<span class="hljs-comment">// Button supports as=&quot;a&quot; | &quot;button&quot; and mirrors intrinsic attrs</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt;;
expectType&lt;<span class="hljs-title class_">ButtonProps</span>&gt;({ <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;button&#x27;</span>, <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> {} });
expectType&lt;<span class="hljs-title class_">ButtonProps</span>&gt;({ <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">&#x27;/home&#x27;</span> });
<span class="hljs-comment">// @ts-expect-error - anchors need href</span>
expectType&lt;<span class="hljs-title class_">ButtonProps</span>&gt;({ <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;a&#x27;</span> });

<span class="hljs-comment">// TextField narrows onChange to the correct event type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TextFieldProps</span> = <span class="hljs-title class_">ComponentProps</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">TextField</span>&gt;;
expectType&lt;<span class="hljs-title class_">TextFieldProps</span>&gt;({ <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Name&#x27;</span>, <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span> });
expectType&lt;<span class="hljs-title class_">TextFieldProps</span>&gt;({
  <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;textarea&#x27;</span>,
  <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Bio&#x27;</span>,
  <span class="hljs-attr">defaultValue</span>: <span class="hljs-string">&#x27;&#x27;</span>,
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>,
});
<span class="hljs-comment">// @ts-expect-error - wrong event type for textarea</span>
expectType&lt;<span class="hljs-title class_">TextFieldProps</span>&gt;({
  <span class="hljs-attr">as</span>: <span class="hljs-string">&#x27;textarea&#x27;</span>,
  <span class="hljs-attr">label</span>: <span class="hljs-string">&#x27;Bio&#x27;</span>,
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt;</span> {},
});
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
