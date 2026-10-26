const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-type-level-programming",p="البرمجة على مستوى الأنواع (Type-Level Programming)",t=[{depth:2,id:"نظام-الأنواع-كلغة-برمجة",text:"نظام الأنواع كلغة برمجة"},{depth:2,id:"معالجة-السلاسل-strings-على-مستوى-الأنواع",text:"معالجة السلاسل (Strings) على مستوى الأنواع"},{depth:2,id:"آلات-الحالة-state-machines-على-مستوى-الأنواع",text:"آلات الحالة (State Machines) على مستوى الأنواع"},{depth:2,id:"التحقق-validation-على-مستوى-الأنواع",text:"التحقق (Validation) على مستوى الأنواع"},{depth:2,id:"الرياضيات-math-على-مستوى-الأنواع",text:"الرياضيات (Math) على مستوى الأنواع"},{depth:2,id:"هياكل-البيانات-data-structures-على-مستوى-الأنواع",text:"هياكل البيانات (Data Structures) على مستوى الأنواع"},{depth:2,id:"بناة-خصائص-props-المكونات-components-في-react",text:"بناة خصائص (Props) المكوّنات (Components) في React"},{depth:2,id:"محلل-json-json-parser-على-مستوى-الأنواع",text:"محلّل JSON (JSON Parser) على مستوى الأنواع"},{depth:2,id:"مطابقة-المسارات-route-matching-على-مستوى-الأنواع",text:"مطابقة المسارات (Route Matching) على مستوى الأنواع"},{depth:2,id:"باني-استعلامات-sql-sql-query-builder-على-مستوى-الأنواع",text:"باني استعلامات SQL (SQL Query Builder) على مستوى الأنواع"},{depth:2,id:"التحقق-من-النماذج-form-validation-على-مستوى-الأنواع",text:"التحقق من النماذج (Form Validation) على مستوى الأنواع"},{depth:2,id:"نظام-الأحداث-event-system-على-مستوى-الأنواع",text:"نظام الأحداث (Event System) على مستوى الأنواع"},{depth:2,id:"اختبار-testing-على-مستوى-الأنواع",text:"اختبار (Testing) على مستوى الأنواع"},{depth:2,id:"تحسينات-الأداء-performance-optimizations",text:"تحسينات الأداء (Performance Optimizations)"},{depth:2,id:"تطبيق-واقعي-graphql-آمن-الأنواع-type-safe",text:"تطبيق واقعي: GraphQL آمن الأنواع (Type-Safe)"},{depth:2,id:"أنماط-تصميم-design-patterns-على-مستوى-الأنواع",text:"أنماط تصميم (Design Patterns) على مستوى الأنواع"},{depth:3,id:"نمط-builder-builder-pattern",text:"نمط Builder (Builder Pattern)"},{depth:3,id:"نمط-visitor-visitor-pattern",text:"نمط Visitor (Visitor Pattern)"},{depth:2,id:"أفضل-الممارسات-best-practices",text:"أفضل الممارسات (Best Practices)"},{depth:3,id:"استخدم-أسماء-الأنواع-type-aliases-للحسابات-المعقدة",text:"استخدم أسماء الأنواع (Type Aliases) للحسابات المعقدة"},{depth:3,id:"وفر-مخرجات-بديلة-escape-hatches",text:"وفّر مخرجات بديلة (Escape Hatches)"},{depth:3,id:"وثق-الأنواع-المعقدة",text:"وثّق الأنواع المعقدة"},{depth:2,id:"الخلاصة-summary",text:"الخلاصة (Summary)"}],e=`<p>مرحبًا بك في العمق (deep end) of TypeScript. إذا جعلك أي شيء في هذا الدرس ترغب في البكاء، فذلك على الأرجح ردّ فعل طبيعي. هذه أشياء مهووسة (nerdy). البرمجة على مستوى الأنواع (type-level programming) تعني كتابة «شيفرة» تعمل في وقت الترجمة (compile time) باستخدام نظام أنواع TypeScript. إنها كأنك تملك لغة برمجة داخل لغة برمجة. هنا يتحوّل TypeScript من مُتحقق من الأنواع (type checker) إلى أداة meta-programming قوية. لنتعرّف كيف نحسب الأنواع ونتحقّق منها ونحوّلها في وقت الترجمة.</p>
<h2 id="نظام-الأنواع-كلغة-برمجة">نظام الأنواع كلغة برمجة</h2>
<p>نظام أنواع TypeScript كامل (Turing complete)، مما يعني أنه يمكنك نظريًا حساب أي شيء على مستوى الأنواع — ضمن حدود التكرار (recursion limits)، بالطبع.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Type-level addition</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Add</span>&lt;A <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>, B <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>&gt; = [...<span class="hljs-title class_">BuildTuple</span>&lt;A&gt;, ...<span class="hljs-title class_">BuildTuple</span>&lt;B&gt;][<span class="hljs-string">&#x27;length&#x27;</span>];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">BuildTuple</span>&lt;N <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>, T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">unknown</span>[] = []&gt; = T[<span class="hljs-string">&#x27;length&#x27;</span>] <span class="hljs-keyword">extends</span> N
  ? T
  : <span class="hljs-title class_">BuildTuple</span>&lt;N, [...T, <span class="hljs-built_in">unknown</span>]&gt;;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Sum</span> = <span class="hljs-title class_">Add</span>&lt;<span class="hljs-number">3</span>, <span class="hljs-number">4</span>&gt;; <span class="hljs-comment">// 7</span>

<span class="hljs-comment">// Type-level boolean logic</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">And</span>&lt;A <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span>, B <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span>&gt; = A <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>
  ? B <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>
    ? <span class="hljs-literal">true</span>
    : <span class="hljs-literal">false</span>
  : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Or</span>&lt;A <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span>, B <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span>&gt; = A <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>
  ? <span class="hljs-literal">true</span>
  : B <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>
    ? <span class="hljs-literal">true</span>
    : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Not</span>&lt;A <span class="hljs-keyword">extends</span> <span class="hljs-built_in">boolean</span>&gt; = A <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? <span class="hljs-literal">false</span> : <span class="hljs-literal">true</span>;
</code></pre>
<h2 id="معالجة-السلاسل-strings-على-مستوى-الأنواع">معالجة السلاسل (Strings) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Split string into characters</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Split</span>&lt;S <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = S <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Head}</span><span class="hljs-subst">\${infer Tail}</span>\`</span> ? [<span class="hljs-title class_">Head</span>, ...<span class="hljs-title class_">Split</span>&lt;<span class="hljs-title class_">Tail</span>&gt;] : [];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Letters</span> = <span class="hljs-title class_">Split</span>&lt;<span class="hljs-string">&#x27;hello&#x27;</span>&gt;; <span class="hljs-comment">// [&#x27;h&#x27;, &#x27;e&#x27;, &#x27;l&#x27;, &#x27;l&#x27;, &#x27;o&#x27;]</span>

<span class="hljs-comment">// Join array into string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Join</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>[], D <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> = <span class="hljs-string">&#x27;&#x27;</span>&gt; = T <span class="hljs-keyword">extends</span> []
  ? <span class="hljs-string">&#x27;&#x27;</span>
  : T <span class="hljs-keyword">extends</span> [infer <span class="hljs-title class_">Head</span>]
    ? <span class="hljs-title class_">Head</span>
    : T <span class="hljs-keyword">extends</span> [infer <span class="hljs-title class_">Head</span>, ...infer <span class="hljs-title class_">Tail</span>]
      ? <span class="hljs-title class_">Head</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>
        ? <span class="hljs-title class_">Tail</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>[]
          ? <span class="hljs-string">\`<span class="hljs-subst">\${Head}</span><span class="hljs-subst">\${D}</span><span class="hljs-subst">\${Join&lt;Tail, D&gt;}</span>\`</span>
          : <span class="hljs-built_in">never</span>
        : <span class="hljs-built_in">never</span>
      : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Joined</span> = <span class="hljs-title class_">Join</span>&lt;[<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-string">&#x27;c&#x27;</span>], <span class="hljs-string">&#x27;-&#x27;</span>&gt;; <span class="hljs-comment">// &#x27;a-b-c&#x27;</span>

<span class="hljs-comment">// Reverse a string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Reverse</span>&lt;S <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = S <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Head}</span><span class="hljs-subst">\${infer Tail}</span>\`</span>
  ? <span class="hljs-string">\`<span class="hljs-subst">\${Reverse&lt;Tail&gt;}</span><span class="hljs-subst">\${Head}</span>\`</span>
  : <span class="hljs-string">&#x27;&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Reversed</span> = <span class="hljs-title class_">Reverse</span>&lt;<span class="hljs-string">&#x27;hello&#x27;</span>&gt;; <span class="hljs-comment">// &#x27;olleh&#x27;</span>
</code></pre>
<h2 id="آلات-الحالة-state-machines-على-مستوى-الأنواع">آلات الحالة (State Machines) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Traffic light state machine</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TrafficLight</span> = {
  <span class="hljs-attr">red</span>: { <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;green&#x27;</span>; <span class="hljs-attr">wait</span>: <span class="hljs-number">60</span> };
  <span class="hljs-attr">green</span>: { <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;yellow&#x27;</span>; <span class="hljs-attr">wait</span>: <span class="hljs-number">45</span> };
  <span class="hljs-attr">yellow</span>: { <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;red&#x27;</span>; <span class="hljs-attr">wait</span>: <span class="hljs-number">5</span> };
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NextState</span>&lt;<span class="hljs-title class_">Current</span> <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">TrafficLight</span>&gt; = <span class="hljs-title class_">TrafficLight</span>[<span class="hljs-title class_">Current</span>][<span class="hljs-string">&#x27;next&#x27;</span>];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">State1</span> = <span class="hljs-title class_">NextState</span>&lt;<span class="hljs-string">&#x27;red&#x27;</span>&gt;; <span class="hljs-comment">// &#x27;green&#x27;</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">State2</span> = <span class="hljs-title class_">NextState</span>&lt;<span class="hljs-title class_">State1</span>&gt;; <span class="hljs-comment">// &#x27;yellow&#x27;</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">State3</span> = <span class="hljs-title class_">NextState</span>&lt;<span class="hljs-title class_">State2</span>&gt;; <span class="hljs-comment">// &#x27;red&#x27;</span>

<span class="hljs-comment">// Wizard flow state machine</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">WizardFlow</span> = {
  <span class="hljs-attr">start</span>: { <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;personal&#x27;</span>; <span class="hljs-attr">canGoBack</span>: <span class="hljs-literal">false</span> };
  <span class="hljs-attr">personal</span>: { <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;contact&#x27;</span>; <span class="hljs-attr">canGoBack</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">required</span>: [<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;age&#x27;</span>] };
  <span class="hljs-attr">contact</span>: { <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;review&#x27;</span>; <span class="hljs-attr">canGoBack</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">required</span>: [<span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-string">&#x27;phone&#x27;</span>] };
  <span class="hljs-attr">review</span>: { <span class="hljs-attr">next</span>: <span class="hljs-string">&#x27;complete&#x27;</span>; <span class="hljs-attr">canGoBack</span>: <span class="hljs-literal">true</span> };
  <span class="hljs-attr">complete</span>: { <span class="hljs-attr">next</span>: <span class="hljs-built_in">never</span>; <span class="hljs-attr">canGoBack</span>: <span class="hljs-literal">false</span> };
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CurrentStep</span>&lt;T <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">WizardFlow</span>&gt; = {
  <span class="hljs-attr">step</span>: T;
  <span class="hljs-attr">next</span>: <span class="hljs-title class_">WizardFlow</span>[T][<span class="hljs-string">&#x27;next&#x27;</span>];
  <span class="hljs-attr">canGoBack</span>: <span class="hljs-title class_">WizardFlow</span>[T][<span class="hljs-string">&#x27;canGoBack&#x27;</span>];
  <span class="hljs-attr">required</span>: T <span class="hljs-keyword">extends</span> keyof {
    [K <span class="hljs-keyword">in</span> keyof <span class="hljs-title class_">WizardFlow</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">WizardFlow</span>[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">required</span>: <span class="hljs-built_in">any</span> } ? K : <span class="hljs-built_in">never</span>]: <span class="hljs-built_in">any</span>;
  }
    ? <span class="hljs-title class_">WizardFlow</span>[T][<span class="hljs-string">&#x27;required&#x27;</span>]
    : <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">PersonalStep</span> = <span class="hljs-title class_">CurrentStep</span>&lt;<span class="hljs-string">&#x27;personal&#x27;</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   step: &#x27;personal&#x27;;</span>
<span class="hljs-comment">//   next: &#x27;contact&#x27;;</span>
<span class="hljs-comment">//   canGoBack: true;</span>
<span class="hljs-comment">//   required: [&#x27;name&#x27;, &#x27;age&#x27;];</span>
<span class="hljs-comment">// }</span>
</code></pre>
<h2 id="التحقق-validation-على-مستوى-الأنواع">التحقق (Validation) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Email validation at type level</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsEmail</span>&lt;S <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = S <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer User}</span>@<span class="hljs-subst">\${infer Domain}</span>\`</span>
  ? <span class="hljs-title class_">Domain</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Sub}</span>.<span class="hljs-subst">\${infer Tld}</span>\`</span>
    ? <span class="hljs-title class_">Sub</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;&#x27;</span>
      ? <span class="hljs-literal">false</span>
      : <span class="hljs-title class_">Tld</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;&#x27;</span>
        ? <span class="hljs-literal">false</span>
        : <span class="hljs-literal">true</span>
    : <span class="hljs-literal">false</span>
  : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidEmail</span> = <span class="hljs-title class_">IsEmail</span>&lt;<span class="hljs-string">&#x27;user@example.com&#x27;</span>&gt;; <span class="hljs-comment">// true</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InvalidEmail</span> = <span class="hljs-title class_">IsEmail</span>&lt;<span class="hljs-string">&#x27;not-an-email&#x27;</span>&gt;; <span class="hljs-comment">// false</span>

<span class="hljs-comment">// URL validation</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsHttpUrl</span>&lt;S <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = S <span class="hljs-keyword">extends</span> <span class="hljs-string">\`http<span class="hljs-subst">\${<span class="hljs-string">&#x27;s&#x27;</span> | <span class="hljs-string">&#x27;&#x27;</span>}</span>://<span class="hljs-subst">\${infer Rest}</span>\`</span>
  ? <span class="hljs-title class_">Rest</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Domain}</span>/<span class="hljs-subst">\${infer Path}</span>\`</span>
    ? <span class="hljs-literal">true</span>
    : <span class="hljs-title class_">Rest</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Domain}</span>\`</span>
      ? <span class="hljs-literal">true</span>
      : <span class="hljs-literal">false</span>
  : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidUrl</span> = <span class="hljs-title class_">IsHttpUrl</span>&lt;<span class="hljs-string">&#x27;https://example.com/path&#x27;</span>&gt;; <span class="hljs-comment">// true</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InvalidUrl</span> = <span class="hljs-title class_">IsHttpUrl</span>&lt;<span class="hljs-string">&#x27;ftp://example.com&#x27;</span>&gt;; <span class="hljs-comment">// false</span>
</code></pre>
<h2 id="الرياضيات-math-على-مستوى-الأنواع">الرياضيات (Math) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Compare numbers</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GreaterThan</span>&lt;A <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>, B <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>&gt; =
  <span class="hljs-title class_">CompareLength</span>&lt;<span class="hljs-title class_">BuildTuple</span>&lt;A&gt;, <span class="hljs-title class_">BuildTuple</span>&lt;B&gt;&gt; <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CompareLength</span>&lt;A <span class="hljs-keyword">extends</span> <span class="hljs-built_in">unknown</span>[], B <span class="hljs-keyword">extends</span> <span class="hljs-built_in">unknown</span>[]&gt; = A <span class="hljs-keyword">extends</span> [...B, ...infer <span class="hljs-title class_">Rest</span>]
  ? <span class="hljs-title class_">Rest</span> <span class="hljs-keyword">extends</span> []
    ? <span class="hljs-literal">false</span>
    : <span class="hljs-literal">true</span>
  : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsGreater</span> = <span class="hljs-title class_">GreaterThan</span>&lt;<span class="hljs-number">5</span>, <span class="hljs-number">3</span>&gt;; <span class="hljs-comment">// true</span>

<span class="hljs-comment">// Range type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Range</span>&lt;
  <span class="hljs-title class_">Start</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>,
  <span class="hljs-title class_">End</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>,
  <span class="hljs-title class_">Acc</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>[] = [],
&gt; = <span class="hljs-title class_">Acc</span>[<span class="hljs-string">&#x27;length&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-title class_">End</span>
  ? []
  : <span class="hljs-title class_">Acc</span>[<span class="hljs-string">&#x27;length&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Start</span>
    ? [<span class="hljs-title class_">Acc</span>[<span class="hljs-string">&#x27;length&#x27;</span>], ...<span class="hljs-title class_">Range</span>&lt;[...<span class="hljs-title class_">Acc</span>, <span class="hljs-built_in">unknown</span>][<span class="hljs-string">&#x27;length&#x27;</span>], <span class="hljs-title class_">End</span>, [...<span class="hljs-title class_">Acc</span>, <span class="hljs-built_in">unknown</span>]&gt;]
    : <span class="hljs-title class_">Range</span>&lt;<span class="hljs-title class_">Start</span>, <span class="hljs-title class_">End</span>, [...<span class="hljs-title class_">Acc</span>, <span class="hljs-built_in">unknown</span>]&gt;;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NumberRange</span> = <span class="hljs-title class_">Range</span>&lt;<span class="hljs-number">3</span>, <span class="hljs-number">7</span>&gt;; <span class="hljs-comment">// [3, 4, 5, 6]</span>

<span class="hljs-comment">// Fibonacci sequence</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Fibonacci</span>&lt;
  N <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>,
  <span class="hljs-title class_">Current</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">1</span>,
  <span class="hljs-title class_">Previous</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>,
  <span class="hljs-title class_">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>,
&gt; = <span class="hljs-title class_">Index</span> <span class="hljs-keyword">extends</span> N ? <span class="hljs-title class_">Current</span> : <span class="hljs-title class_">Fibonacci</span>&lt;N, <span class="hljs-title class_">Add</span>&lt;<span class="hljs-title class_">Current</span>, <span class="hljs-title class_">Previous</span>&gt;, <span class="hljs-title class_">Current</span>, <span class="hljs-title class_">Add</span>&lt;<span class="hljs-title class_">Index</span>, <span class="hljs-number">1</span>&gt;&gt;;

<span class="hljs-comment">// Note: Add implementation needed from earlier</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Fib5</span> = <span class="hljs-title class_">Fibonacci</span>&lt;<span class="hljs-number">5</span>&gt;; <span class="hljs-comment">// 8</span>
</code></pre>
<h2 id="هياكل-البيانات-data-structures-على-مستوى-الأنواع">هياكل البيانات (Data Structures) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Type-level linked list</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LinkedList</span>&lt;T&gt; = <span class="hljs-literal">null</span> | { <span class="hljs-attr">value</span>: T; <span class="hljs-attr">next</span>: <span class="hljs-title class_">LinkedList</span>&lt;T&gt; };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">MyList</span> = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attr">next</span>: {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attr">next</span>: {
      <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>;
      <span class="hljs-attr">next</span>: <span class="hljs-literal">null</span>;
    };
  };
};

<span class="hljs-comment">// Operations on linked list</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Head</span>&lt;L <span class="hljs-keyword">extends</span> <span class="hljs-title class_">LinkedList</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; = L <span class="hljs-keyword">extends</span> { <span class="hljs-attr">value</span>: infer V } ? V : <span class="hljs-built_in">never</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Tail</span>&lt;L <span class="hljs-keyword">extends</span> <span class="hljs-title class_">LinkedList</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; = L <span class="hljs-keyword">extends</span> { <span class="hljs-attr">next</span>: infer N } ? N : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">First</span> = <span class="hljs-title class_">Head</span>&lt;<span class="hljs-title class_">MyList</span>&gt;; <span class="hljs-comment">// 1</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Rest</span> = <span class="hljs-title class_">Tail</span>&lt;<span class="hljs-title class_">MyList</span>&gt;; <span class="hljs-comment">// { value: 2; next: { value: 3; next: null } }</span>

<span class="hljs-comment">// Type-level tree</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Tree</span>&lt;T&gt; = {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">left</span>?: <span class="hljs-title class_">Tree</span>&lt;T&gt;;
  <span class="hljs-attr">right</span>?: <span class="hljs-title class_">Tree</span>&lt;T&gt;;
};

<span class="hljs-comment">// Tree traversal</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">InOrder</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Tree</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt; =
  T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Tree</span>&lt;infer V&gt;
    ? [
        ...(T[<span class="hljs-string">&#x27;left&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Tree</span>&lt;<span class="hljs-built_in">any</span>&gt; ? <span class="hljs-title class_">InOrder</span>&lt;T[<span class="hljs-string">&#x27;left&#x27;</span>]&gt; : []),
        V,
        ...(T[<span class="hljs-string">&#x27;right&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Tree</span>&lt;<span class="hljs-built_in">any</span>&gt; ? <span class="hljs-title class_">InOrder</span>&lt;T[<span class="hljs-string">&#x27;right&#x27;</span>]&gt; : []),
      ]
    : [];
</code></pre>
<h2 id="بناة-خصائص-props-المكونات-components-في-react">بناة خصائص (Props) المكوّنات (Components) في React</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Build component props from a schema</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PropSchema</span> = {
  <span class="hljs-attr">name</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span>; <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span> };
  <span class="hljs-attr">age</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;number&#x27;</span>; <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span> };
  <span class="hljs-attr">onClick</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;function&#x27;</span>; <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span> };
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SchemaToProps</span>&lt;S&gt; = {
  [K <span class="hljs-keyword">in</span> keyof S <span class="hljs-keyword">as</span> S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span> } ? K : <span class="hljs-built_in">never</span>]: S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> }
    ? <span class="hljs-built_in">string</span>
    : S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;number&#x27;</span> }
      ? <span class="hljs-built_in">number</span>
      : S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;function&#x27;</span> }
        ? <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>
        : <span class="hljs-built_in">never</span>;
} &amp; {
  [K <span class="hljs-keyword">in</span> keyof S <span class="hljs-keyword">as</span> S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span> } ? K : <span class="hljs-built_in">never</span>]?: S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> }
    ? <span class="hljs-built_in">string</span>
    : S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;number&#x27;</span> }
      ? <span class="hljs-built_in">number</span>
      : S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;function&#x27;</span> }
        ? <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>
        : <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">GeneratedProps</span> = <span class="hljs-title class_">SchemaToProps</span>&lt;<span class="hljs-title class_">PropSchema</span>&gt;;
<span class="hljs-comment">// { name: string; onClick: () =&gt; void; age?: number; }</span>
</code></pre>
<h2 id="محلل-json-json-parser-على-مستوى-الأنواع">محلّل JSON (JSON Parser) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Parse JSON string types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ParseJSON</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`&quot;<span class="hljs-subst">\${infer Value}</span>&quot;\`</span>
  ? <span class="hljs-title class_">Value</span>
  : T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Num}</span>\`</span>
    ? <span class="hljs-title class_">Num</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-built_in">number</span>}</span>\`</span>
      ? <span class="hljs-built_in">number</span>
      : <span class="hljs-built_in">never</span>
    : T <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;true&#x27;</span>
      ? <span class="hljs-literal">true</span>
      : T <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;false&#x27;</span>
        ? <span class="hljs-literal">false</span>
        : T <span class="hljs-keyword">extends</span> <span class="hljs-string">&#x27;null&#x27;</span>
          ? <span class="hljs-literal">null</span>
          : T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`[<span class="hljs-subst">\${infer Items}</span>]\`</span>
            ? <span class="hljs-title class_">ParseArray</span>&lt;<span class="hljs-title class_">Items</span>&gt;
            : T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`{<span class="hljs-subst">\${infer Props}</span>}\`</span>
              ? <span class="hljs-title class_">ParseObject</span>&lt;<span class="hljs-title class_">Props</span>&gt;
              : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ParseArray</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`\`</span>
  ? []
  : T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Item}</span>,<span class="hljs-subst">\${infer Rest}</span>\`</span>
    ? [<span class="hljs-title class_">ParseJSON</span>&lt;<span class="hljs-title class_">Trim</span>&lt;<span class="hljs-title class_">Item</span>&gt;&gt;, ...<span class="hljs-title class_">ParseArray</span>&lt;<span class="hljs-title class_">Rest</span>&gt;]
    : [<span class="hljs-title class_">ParseJSON</span>&lt;<span class="hljs-title class_">Trim</span>&lt;T&gt;&gt;];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Trim</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-string">\` <span class="hljs-subst">\${infer R}</span>\`</span>
  ? <span class="hljs-title class_">Trim</span>&lt;R&gt;
  : T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer L}</span> \`</span>
    ? <span class="hljs-title class_">Trim</span>&lt;L&gt;
    : T;

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Parsed</span> = <span class="hljs-title class_">ParseJSON</span>&lt;<span class="hljs-string">&#x27;{&quot;name&quot;: &quot;Alice&quot;, &quot;age&quot;: 30}&#x27;</span>&gt;;
<span class="hljs-comment">// { name: &quot;Alice&quot;; age: number }</span>
</code></pre>
<h2 id="مطابقة-المسارات-route-matching-على-مستوى-الأنواع">مطابقة المسارات (Route Matching) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Express-style route pattern matching</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ExtractRouteParams</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Start}</span>:<span class="hljs-subst">\${infer Param}</span>/<span class="hljs-subst">\${infer Rest}</span>\`</span>
  ? <span class="hljs-title class_">ExtractRouteParams</span>&lt;<span class="hljs-title class_">Start</span>&gt; &amp; { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_">Param</span>]: <span class="hljs-built_in">string</span> } &amp; <span class="hljs-title class_">ExtractRouteParams</span>&lt;<span class="hljs-title class_">Rest</span>&gt;
  : T <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer Start}</span>:<span class="hljs-subst">\${infer Param}</span>\`</span>
    ? { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_">Param</span>]: <span class="hljs-built_in">string</span> }
    : {};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">UserRoute</span> = <span class="hljs-title class_">ExtractRouteParams</span>&lt;<span class="hljs-string">&#x27;/users/:userId/posts/:postId&#x27;</span>&gt;;
<span class="hljs-comment">// { userId: string; postId: string }</span>

<span class="hljs-comment">// Match URL to route</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">MatchRoute</span>&lt;
  <span class="hljs-title class_">Pattern</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>,
  <span class="hljs-variable constant_">URL</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>,
&gt; = <span class="hljs-title class_">Pattern</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer P1}</span>/:<span class="hljs-subst">\${infer Param}</span>/<span class="hljs-subst">\${infer P2}</span>\`</span>
  ? <span class="hljs-variable constant_">URL</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${P1}</span>/<span class="hljs-subst">\${infer Value}</span>/<span class="hljs-subst">\${infer Rest}</span>\`</span>
    ? { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_">Param</span>]: <span class="hljs-title class_">Value</span> } &amp; <span class="hljs-title class_">MatchRoute</span>&lt;<span class="hljs-variable constant_">P2</span>, <span class="hljs-title class_">Rest</span>&gt;
    : <span class="hljs-built_in">never</span>
  : <span class="hljs-title class_">Pattern</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${infer P1}</span>/:<span class="hljs-subst">\${infer Param}</span>\`</span>
    ? <span class="hljs-variable constant_">URL</span> <span class="hljs-keyword">extends</span> <span class="hljs-string">\`<span class="hljs-subst">\${P1}</span>/<span class="hljs-subst">\${infer Value}</span>\`</span>
      ? { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_">Param</span>]: <span class="hljs-title class_">Value</span> }
      : <span class="hljs-built_in">never</span>
    : <span class="hljs-variable constant_">URL</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Pattern</span>
      ? {}
      : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Matched</span> = <span class="hljs-title class_">MatchRoute</span>&lt;<span class="hljs-string">&#x27;/users/:id&#x27;</span>, <span class="hljs-string">&#x27;/users/123&#x27;</span>&gt;;
<span class="hljs-comment">// { id: &#x27;123&#x27; }</span>
</code></pre>
<h2 id="باني-استعلامات-sql-sql-query-builder-على-مستوى-الأنواع">باني استعلامات SQL (SQL Query Builder) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// SQL query type builder</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Query</span>&lt;T&gt; = {
  <span class="hljs-attr">select</span>: &lt;K <span class="hljs-keyword">extends</span> keyof T&gt;<span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">fields</span>: K[]</span>) =&gt;</span> <span class="hljs-title class_">QueryWith</span>&lt;<span class="hljs-title class_">Pick</span>&lt;T, K&gt;&gt;;
  <span class="hljs-attr">where</span>: &lt;K <span class="hljs-keyword">extends</span> keyof T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">field</span>: K, <span class="hljs-attr">value</span>: T[K]</span>) =&gt;</span> <span class="hljs-title class_">Query</span>&lt;T&gt;;
  <span class="hljs-attr">orderBy</span>: &lt;K <span class="hljs-keyword">extends</span> keyof T&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">field</span>: K, <span class="hljs-attr">dir</span>?: <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span></span>) =&gt;</span> <span class="hljs-title class_">Query</span>&lt;T&gt;;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">QueryWith</span>&lt;T&gt; = {
  <span class="hljs-attr">from</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">table</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">QueryResult</span>&lt;T&gt;;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">QueryResult</span>&lt;T&gt; = {
  <span class="hljs-attr">execute</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T[]&gt;;
  <span class="hljs-attr">first</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T | <span class="hljs-literal">null</span>&gt;;
};

<span class="hljs-comment">// Type-safe query building</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">query</span>: <span class="hljs-title class_">Query</span>&lt;<span class="hljs-title class_">User</span>&gt;;

<span class="hljs-keyword">const</span> result = query
  .<span class="hljs-title function_">select</span>(<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;name&#x27;</span>) <span class="hljs-comment">// Only id and name available</span>
  .<span class="hljs-title function_">from</span>(<span class="hljs-string">&#x27;users&#x27;</span>)
  .<span class="hljs-title function_">execute</span>(); <span class="hljs-comment">// Promise&lt;{ id: number; name: string }[]&gt;</span>
</code></pre>
<h2 id="التحقق-من-النماذج-form-validation-على-مستوى-الأنواع">التحقق من النماذج (Form Validation) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Validation rule types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidationRules</span> = {
  <span class="hljs-attr">required</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">minLength</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">maxLength</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">pattern</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">min</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">max</span>?: <span class="hljs-built_in">number</span>;
};

<span class="hljs-comment">// Generate validator from rules</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Validator</span>&lt;<span class="hljs-title class_">Rules</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ValidationRules</span>&gt; = <span class="hljs-title class_">Rules</span>[<span class="hljs-string">&#x27;required&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>
  ? <span class="hljs-title class_">Rules</span>[<span class="hljs-string">&#x27;email&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>
    ? <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> value is <span class="hljs-title class_">Email</span>
    : <span class="hljs-title class_">Rules</span>[<span class="hljs-string">&#x27;minLength&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>
      ? <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> value is <span class="hljs-title class_">MinLength</span>&lt;<span class="hljs-title class_">Rules</span>[<span class="hljs-string">&#x27;minLength&#x27;</span>]&gt;
      : <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>) =&gt;</span> value is <span class="hljs-title class_">NonNullable</span>&lt;<span class="hljs-built_in">unknown</span>&gt;
  : <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>;

<span class="hljs-comment">// Field with validation</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Field</span>&lt;T, <span class="hljs-title class_">Rules</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ValidationRules</span> = {}&gt; = {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">rules</span>: <span class="hljs-title class_">Rules</span>;
  <span class="hljs-attr">validate</span>: <span class="hljs-title class_">Validator</span>&lt;<span class="hljs-title class_">Rules</span>&gt;;
  <span class="hljs-attr">errors</span>: <span class="hljs-built_in">string</span>[];
};

<span class="hljs-comment">// Form from schema</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormSchema</span> = {
  <span class="hljs-attr">email</span>: { <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">rules</span>: { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">email</span>: <span class="hljs-literal">true</span> } };
  <span class="hljs-attr">password</span>: { <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">rules</span>: { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">minLength</span>: <span class="hljs-number">8</span> } };
  <span class="hljs-attr">age</span>: { <span class="hljs-attr">type</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">rules</span>: { <span class="hljs-attr">min</span>: <span class="hljs-number">18</span>; <span class="hljs-attr">max</span>: <span class="hljs-number">100</span> } };
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FormFields</span>&lt;S&gt; = {
  [K <span class="hljs-keyword">in</span> keyof S]: S[K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">type</span>: infer T; <span class="hljs-attr">rules</span>: infer R }
    ? R <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ValidationRules</span>
      ? <span class="hljs-title class_">Field</span>&lt;T, R&gt;
      : <span class="hljs-built_in">never</span>
    : <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">LoginForm</span> = <span class="hljs-title class_">FormFields</span>&lt;<span class="hljs-title class_">FormSchema</span>&gt;;
</code></pre>
<h2 id="نظام-الأحداث-event-system-على-مستوى-الأنواع">نظام الأحداث (Event System) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Event emitter with type-safe events</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">EventMap</span> = {
  <span class="hljs-string">&#x27;user:login&#x27;</span>: { <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span> };
  <span class="hljs-string">&#x27;user:logout&#x27;</span>: { <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span> };
  <span class="hljs-string">&#x27;data:update&#x27;</span>: { <span class="hljs-attr">table</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">changes</span>: <span class="hljs-built_in">object</span> };
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">TypedEventEmitter</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;&gt; = {
  on&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">event</span>: K, <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span>;
  off&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">event</span>: K, <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span>;
  emit&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">event</span>: K, <span class="hljs-attr">data</span>: T[K]): <span class="hljs-built_in">void</span>;
  once&lt;K <span class="hljs-keyword">extends</span> keyof T&gt;(<span class="hljs-attr">event</span>: K, <span class="hljs-attr">handler</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: T[K]</span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span>;
};

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">emitter</span>: <span class="hljs-title class_">TypedEventEmitter</span>&lt;<span class="hljs-title class_">EventMap</span>&gt;;

emitter.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;user:login&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">{ userId, timestamp }</span>) =&gt;</span> {
  <span class="hljs-comment">// userId is string, timestamp is Date</span>
});

emitter.<span class="hljs-title function_">emit</span>(<span class="hljs-string">&#x27;user:login&#x27;</span>, { <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() }); <span class="hljs-comment">// ✅</span>
<span class="hljs-comment">// emitter.emit(&#x27;user:login&#x27;, { userId: 123 });  // ❌ Error: userId must be string</span>
</code></pre>
<h2 id="اختبار-testing-على-مستوى-الأنواع">اختبار (Testing) على مستوى الأنواع</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Type-level test framework</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Expect</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span>&gt; = T;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Equal</span>&lt;X, Y&gt; =
  (&lt;T&gt;<span class="hljs-function">() =&gt;</span> T <span class="hljs-keyword">extends</span> X ? <span class="hljs-number">1</span> : <span class="hljs-number">2</span>) <span class="hljs-keyword">extends</span> &lt;T&gt;<span class="hljs-function">() =&gt;</span> T <span class="hljs-keyword">extends</span> Y ? <span class="hljs-number">1</span> : <span class="hljs-number">2</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NotEqual</span>&lt;X, Y&gt; = <span class="hljs-title class_">Equal</span>&lt;X, Y&gt; <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? <span class="hljs-literal">false</span> : <span class="hljs-literal">true</span>;

<span class="hljs-comment">// Write type-level tests</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">TestStringUtilities</span> = [
  <span class="hljs-title class_">Expect</span>&lt;<span class="hljs-title class_">Equal</span>&lt;<span class="hljs-title class_">Uppercase</span>&lt;<span class="hljs-string">&#x27;hello&#x27;</span>&gt;, <span class="hljs-string">&#x27;HELLO&#x27;</span>&gt;&gt;,
  <span class="hljs-title class_">Expect</span>&lt;<span class="hljs-title class_">Equal</span>&lt;<span class="hljs-title class_">Lowercase</span>&lt;<span class="hljs-string">&#x27;HELLO&#x27;</span>&gt;, <span class="hljs-string">&#x27;hello&#x27;</span>&gt;&gt;,
  <span class="hljs-title class_">Expect</span>&lt;<span class="hljs-title class_">Equal</span>&lt;<span class="hljs-title class_">Capitalize</span>&lt;<span class="hljs-string">&#x27;hello&#x27;</span>&gt;, <span class="hljs-string">&#x27;Hello&#x27;</span>&gt;&gt;,
];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">TestNumberComparison</span> = [
  <span class="hljs-title class_">Expect</span>&lt;<span class="hljs-title class_">Equal</span>&lt;<span class="hljs-title class_">GreaterThan</span>&lt;<span class="hljs-number">5</span>, <span class="hljs-number">3</span>&gt;, <span class="hljs-literal">true</span>&gt;&gt;,
  <span class="hljs-title class_">Expect</span>&lt;<span class="hljs-title class_">Equal</span>&lt;<span class="hljs-title class_">GreaterThan</span>&lt;<span class="hljs-number">3</span>, <span class="hljs-number">5</span>&gt;, <span class="hljs-literal">false</span>&gt;&gt;,
  <span class="hljs-title class_">Expect</span>&lt;<span class="hljs-title class_">Equal</span>&lt;<span class="hljs-title class_">GreaterThan</span>&lt;<span class="hljs-number">3</span>, <span class="hljs-number">3</span>&gt;, <span class="hljs-literal">false</span>&gt;&gt;,
];

<span class="hljs-comment">// Test will fail at compile time if any assertion is false</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">RunTests</span> = [...<span class="hljs-title class_">TestStringUtilities</span>, ...<span class="hljs-title class_">TestNumberComparison</span>];
</code></pre>
<h2 id="تحسينات-الأداء-performance-optimizations">تحسينات الأداء (Performance Optimizations)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Tail recursion optimization pattern</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Reverse</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[], <span class="hljs-title class_">Acc</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[] = []&gt; = T <span class="hljs-keyword">extends</span> []
  ? <span class="hljs-title class_">Acc</span>
  : T <span class="hljs-keyword">extends</span> [...infer <span class="hljs-title class_">Rest</span>, infer <span class="hljs-title class_">Last</span>]
  ? <span class="hljs-title class_">Reverse</span>&lt;<span class="hljs-title class_">Rest</span>, [<span class="hljs-title class_">Last</span>, ...<span class="hljs-title class_">Acc</span>]&gt;
  : <span class="hljs-built_in">never</span>;

<span class="hljs-comment">// Cache computed types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Cache</span>&lt;K, V&gt; = { [P <span class="hljs-keyword">in</span> K &amp; <span class="hljs-built_in">string</span>]: V };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Fibonacci</span>&lt;N <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span>, C <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Cache</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>&gt; = {}&gt; =
  N <span class="hljs-keyword">extends</span> keyof C
    ? C[N]
    : N <span class="hljs-keyword">extends</span> <span class="hljs-number">0</span> | <span class="hljs-number">1</span>
    ? <span class="hljs-number">1</span>
    : <span class="hljs-title class_">Add</span>&lt;<span class="hljs-title class_">Fibonacci</span>&lt;<span class="hljs-title class_">Subtract</span>&lt;N, <span class="hljs-number">1</span>&gt;, C&gt;, <span class="hljs-title class_">Fibonacci</span>&lt;<span class="hljs-title class_">Subtract</span>&lt;N, <span class="hljs-number">2</span>&gt;, C&gt;&gt;;

<span class="hljs-comment">// Limit recursion depth</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">MaxDepth</span> = <span class="hljs-number">50</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DepthCounter</span> = [
  <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>,
  <span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>, <span class="hljs-number">17</span>, <span class="hljs-number">18</span>, <span class="hljs-number">19</span>,
  <span class="hljs-number">20</span>, <span class="hljs-number">21</span>, <span class="hljs-number">22</span>, <span class="hljs-number">23</span>, <span class="hljs-number">24</span>, <span class="hljs-number">25</span>, <span class="hljs-number">26</span>, <span class="hljs-number">27</span>, <span class="hljs-number">28</span>, <span class="hljs-number">29</span>,
  <span class="hljs-number">30</span>, <span class="hljs-number">31</span>, <span class="hljs-number">32</span>, <span class="hljs-number">33</span>, <span class="hljs-number">34</span>, <span class="hljs-number">35</span>, <span class="hljs-number">36</span>, <span class="hljs-number">37</span>, <span class="hljs-number">38</span>, <span class="hljs-number">39</span>,
  <span class="hljs-number">40</span>, <span class="hljs-number">41</span>, <span class="hljs-number">42</span>, <span class="hljs-number">43</span>, <span class="hljs-number">44</span>, <span class="hljs-number">45</span>, <span class="hljs-number">46</span>, <span class="hljs-number">47</span>, <span class="hljs-number">48</span>, <span class="hljs-number">49</span>,
  <span class="hljs-number">50</span>
];

<span class="hljs-keyword">type</span> <span class="hljs-title class_">SafeRecursive</span>&lt;T, <span class="hljs-title class_">Depth</span> <span class="hljs-keyword">extends</span> <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>&gt; = <span class="hljs-title class_">Depth</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">MaxDepth</span>
  ? <span class="hljs-built_in">never</span>
  : <span class="hljs-comment">/* recursive logic here */</span>;
</code></pre>
<h2 id="تطبيق-واقعي-graphql-آمن-الأنواع-type-safe">تطبيق واقعي: GraphQL آمن الأنواع (Type-Safe)</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// GraphQL schema to TypeScript types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GraphQLSchema</span> = {
  <span class="hljs-title class_">Query</span>: {
    <span class="hljs-attr">user</span>: { <span class="hljs-attr">args</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }; <span class="hljs-attr">returns</span>: <span class="hljs-title class_">User</span> };
    <span class="hljs-attr">users</span>: { <span class="hljs-attr">args</span>: { <span class="hljs-attr">limit</span>?: <span class="hljs-built_in">number</span> }; <span class="hljs-attr">returns</span>: <span class="hljs-title class_">User</span>[] };
  };
  <span class="hljs-title class_">Mutation</span>: {
    <span class="hljs-attr">createUser</span>: { <span class="hljs-attr">args</span>: { <span class="hljs-attr">input</span>: <span class="hljs-title class_">CreateUserInput</span> }; <span class="hljs-attr">returns</span>: <span class="hljs-title class_">User</span> };
    <span class="hljs-attr">updateUser</span>: { <span class="hljs-attr">args</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">input</span>: <span class="hljs-title class_">UpdateUserInput</span> }; <span class="hljs-attr">returns</span>: <span class="hljs-title class_">User</span> };
  };
};

<span class="hljs-comment">// Generate client from schema</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">GraphQLClient</span>&lt;S&gt; = {
  <span class="hljs-attr">query</span>: {
    [K <span class="hljs-keyword">in</span> keyof S[<span class="hljs-string">&#x27;Query&#x27;</span>]]: S[<span class="hljs-string">&#x27;Query&#x27;</span>][K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">args</span>: infer A; <span class="hljs-attr">returns</span>: infer R }
      ? <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">args</span>: A</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;R&gt;
      : <span class="hljs-built_in">never</span>;
  };
  <span class="hljs-attr">mutation</span>: {
    [K <span class="hljs-keyword">in</span> keyof S[<span class="hljs-string">&#x27;Mutation&#x27;</span>]]: S[<span class="hljs-string">&#x27;Mutation&#x27;</span>][K] <span class="hljs-keyword">extends</span> { <span class="hljs-attr">args</span>: infer A; <span class="hljs-attr">returns</span>: infer R }
      ? <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">args</span>: A</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;R&gt;
      : <span class="hljs-built_in">never</span>;
  };
};

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">client</span>: <span class="hljs-title class_">GraphQLClient</span>&lt;<span class="hljs-title class_">GraphQLSchema</span>&gt;;

<span class="hljs-comment">// Fully typed!</span>
<span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> client.<span class="hljs-property">query</span>.<span class="hljs-title function_">user</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span> }); <span class="hljs-comment">// Promise&lt;User&gt;</span>
<span class="hljs-keyword">const</span> users = <span class="hljs-keyword">await</span> client.<span class="hljs-property">query</span>.<span class="hljs-title function_">users</span>({ <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span> }); <span class="hljs-comment">// Promise&lt;User[]&gt;</span>
</code></pre>
<h2 id="أنماط-تصميم-design-patterns-على-مستوى-الأنواع">أنماط تصميم (Design Patterns) على مستوى الأنواع</h2>
<h3 id="نمط-builder-builder-pattern">نمط Builder (Builder Pattern)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Builder</span>&lt;T, <span class="hljs-title class_">Built</span> = {}&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]-?: K <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">Built</span>
    ? <span class="hljs-title class_">Builder</span>&lt;T, <span class="hljs-title class_">Built</span>&gt;
    : <span class="hljs-title class_">Builder</span>&lt;T, <span class="hljs-title class_">Built</span> &amp; { [P <span class="hljs-keyword">in</span> K]: T[K] }&gt; &amp; {
        [P <span class="hljs-keyword">in</span> K <span class="hljs-keyword">as</span> <span class="hljs-string">\`with<span class="hljs-subst">\${Capitalize&lt;<span class="hljs-built_in">string</span> &amp; P&gt;}</span>\`</span>]: <span class="hljs-function">(<span class="hljs-params">
          <span class="hljs-attr">value</span>: T[P],
        </span>) =&gt;</span> <span class="hljs-title class_">Builder</span>&lt;T, <span class="hljs-title class_">Built</span> &amp; { [Q <span class="hljs-keyword">in</span> K]: T[K] }&gt;;
      };
} &amp; {
  <span class="hljs-attr">build</span>: <span class="hljs-title class_">Built</span> <span class="hljs-keyword">extends</span> T ? <span class="hljs-function">() =&gt;</span> T : <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">age</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">function</span> createBuilder&lt;T&gt;(): <span class="hljs-title class_">Builder</span>&lt;T&gt;;

<span class="hljs-keyword">const</span> user = createBuilder&lt;<span class="hljs-title class_">User</span>&gt;()
  .<span class="hljs-title function_">withName</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>)
  .<span class="hljs-title function_">withEmail</span>(<span class="hljs-string">&#x27;alice@example.com&#x27;</span>)
  .<span class="hljs-title function_">withAge</span>(<span class="hljs-number">30</span>)
  .<span class="hljs-title function_">build</span>(); <span class="hljs-comment">// Only available when all required fields are set</span>
</code></pre>
<h3 id="نمط-visitor-visitor-pattern">نمط Visitor (Visitor Pattern)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Visitor</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> { <span class="hljs-attr">kind</span>: infer K }
  ? K <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>
    ? { [P <span class="hljs-keyword">in</span> K <span class="hljs-keyword">as</span> <span class="hljs-string">\`visit<span class="hljs-subst">\${Capitalize&lt;P&gt;}</span>\`</span>]: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">node</span>: <span class="hljs-title class_">Extract</span>&lt;T, { kind: P }&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span> }
    : <span class="hljs-built_in">never</span>
  : <span class="hljs-built_in">never</span>;

<span class="hljs-keyword">type</span> <span class="hljs-variable constant_">AST</span> =
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;number&#x27;</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;string&#x27;</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;binary&#x27;</span>; <span class="hljs-attr">op</span>: <span class="hljs-string">&#x27;+&#x27;</span> | <span class="hljs-string">&#x27;-&#x27;</span>; <span class="hljs-attr">left</span>: <span class="hljs-variable constant_">AST</span>; <span class="hljs-attr">right</span>: <span class="hljs-variable constant_">AST</span> };

<span class="hljs-keyword">type</span> <span class="hljs-title class_">ASTVisitor</span> = <span class="hljs-title class_">Visitor</span>&lt;<span class="hljs-variable constant_">AST</span>&gt;;
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   visitNumber: (node: { kind: &#x27;number&#x27;; value: number }) =&gt; void;</span>
<span class="hljs-comment">//   visitString: (node: { kind: &#x27;string&#x27;; value: string }) =&gt; void;</span>
<span class="hljs-comment">//   visitBinary: (node: { kind: &#x27;binary&#x27;; op: &#x27;+&#x27; | &#x27;-&#x27;; left: AST; right: AST }) =&gt; void;</span>
<span class="hljs-comment">// }</span>
</code></pre>
<h2 id="أفضل-الممارسات-best-practices">أفضل الممارسات (Best Practices) <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="استخدم-أسماء-الأنواع-type-aliases-للحسابات-المعقدة">استخدم أسماء الأنواع (Type Aliases) للحسابات المعقدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Break down complex types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">IsArray</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[] ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ElementType</span>&lt;T&gt; = T <span class="hljs-title function_">extends</span> (infer E)[] ? E : <span class="hljs-built_in">never</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ArrayLength</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[]&gt; = T[<span class="hljs-string">&#x27;length&#x27;</span>];

<span class="hljs-comment">// ❌ Bad: Everything inline</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ComplexType</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[]
  ? T[<span class="hljs-string">&#x27;length&#x27;</span>] <span class="hljs-keyword">extends</span> <span class="hljs-number">0</span>
    ? <span class="hljs-built_in">never</span>
    : T <span class="hljs-title function_">extends</span> (infer E)[]
      ? E
      : <span class="hljs-built_in">never</span>
  : <span class="hljs-literal">false</span>;
</code></pre>
<h3 id="وفر-مخرجات-بديلة-escape-hatches">وفّر مخرجات بديلة (Escape Hatches)</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Allow opting out of type-level validation</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">StrictEmail</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt; = <span class="hljs-title class_">IsEmail</span>&lt;T&gt; <span class="hljs-keyword">extends</span> <span class="hljs-literal">true</span> ? T : <span class="hljs-built_in">never</span>;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Email</span> = <span class="hljs-title class_">StrictEmail</span>&lt;<span class="hljs-built_in">string</span>&gt; | (<span class="hljs-built_in">string</span> &amp; { <span class="hljs-attr">__brand</span>: <span class="hljs-string">&#x27;Email&#x27;</span> });

<span class="hljs-comment">// Runtime validation for when type-level isn&#x27;t enough</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">validateEmail</span>(<span class="hljs-params"><span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span></span>): email is <span class="hljs-title class_">Email</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</span>.<span class="hljs-title function_">test</span>(email);
}
</code></pre>
<h3 id="وثق-الأنواع-المعقدة">وثّق الأنواع المعقدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">/**
 * Deeply flattens nested array types
 * <span class="hljs-doctag">@example</span>
 * type Result = DeepFlatten&lt;number[][][]&gt;  // number
 */</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepFlatten</span>&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-title function_">readonly</span> (infer U)[] ? <span class="hljs-title class_">DeepFlatten</span>&lt;U&gt; : T;
</code></pre>
<h2 id="الخلاصة-summary">الخلاصة (Summary)</h2>
<p>البرمجة على مستوى الأنواع (type-level programming) في TypeScript تتيح:</p>
<ol>
<li><strong>التحقق في وقت الترجمة (Compile-time validation)</strong> - اكتشاف الأخطاء قبل التشغيل</li>
<li><strong>تحويل الأنواع (Type transformations)</strong> - إنشاء أنواع جديدة من existing ones</li>
<li><strong>واجهات برمجة آمنة الأنواع (Type-safe APIs)</strong> - بناء واجهات برمجة لا يمكن إساءة استخدامها</li>
<li><strong>meta-programming</strong> - توليد شيفرة من الأنواع</li>
<li>** costo صفر في وقت التشغيل (Zero runtime cost)** - جميع الحسابات تحدث في وقت الترجمة</li>
</ol>
<p>مع قوتها، استخدم البرمجة على مستوى الأنواع بحكمة. الشيفرة المعقدة على مستوى الأنواع يمكن أن تبطئ الترجمة (compilation) وتجعل الشيفرة أصعب في الفهم. احتفظ بها لشيفرة المكتبات (library code)، والسلامة الحرجة للأنواع (critical type safety)، والحالات التي تبرر فيها ضمانات وقت الترجمة التعقيد!</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
