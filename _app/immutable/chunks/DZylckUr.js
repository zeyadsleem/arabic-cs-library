const s="kinney",a="react-performance",n="أداء React",l="the-use-hook",p="خُطّاف use",t=[{depth:2,id:"لماذا-يهم-use",text:"لماذا يهم use()"},{depth:2,id:"الاستخدام-الأساسي-للوعود",text:"الاستخدام الأساسي للوعود"},{depth:2,id:"العمل-مع-السياق",text:"العمل مع السياق"},{depth:2,id:"التخزين-المؤقت-والأداء",text:"التخزين المؤقت والأداء"},{depth:3,id:"تخزين-الوعود-مؤقتا-memoization",text:"تخزين الوعود مؤقتًا (memoization)"},{depth:3,id:"إدارة-الوعود-خارج-المكون",text:"إدارة الوعود خارج المكوّن"},{depth:3,id:"الاستخدام-مع-مكتبات-جلب-البيانات",text:"الاستخدام مع مكتبات جلب البيانات"},{depth:2,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"},{depth:2,id:"أنماط-من-الواقع-العملي",text:"أنماط من الواقع العملي"},{depth:3,id:"تركيب-موارد-غير-متزامنة-متعددة",text:"تركيب موارد غير متزامنة متعددة"},{depth:3,id:"التحميل-المتتالي-مقابل-التحميل-المتوازي",text:"التحميل المتتالي مقابل التحميل المتوازي"},{depth:3,id:"التحسين-التدريجي",text:"التحسين التدريجي"},{depth:2,id:"استراتيجيات-الترحيل",text:"استراتيجيات الترحيل"},{depth:3,id:"من-useeffect-usestate",text:"من useEffect + useState"},{depth:3,id:"من-مكتبات-جلب-البيانات",text:"من مكتبات جلب البيانات"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"متى-تستخدم-use-مقابل-الخطافات-التقليدية",text:"متى تستخدم use() مقابل الخُطّافات التقليدية"},{depth:3,id:"حجم-الحزمة-واهتزاز-الشجرة",text:"حجم الحزمة واهتزاز الشجرة"},{depth:2,id:"نظرة-إلى-الأمام",text:"نظرة إلى الأمام"},{depth:2,id:"المتطلبات-السابقة",text:"المتطلبات السابقة"},{depth:2,id:"أمثلة-عملية",text:"أمثلة عملية"}],e=`<p>يغيّر خُطّاف <code>use()</code> في React 19 جذريًا طريقة تعاملك مع البيانات غير المتزامنة والسياق في مكوّناتك. فبدلًا من إدارة حالات التحميل وحدود الأخطاء وحلّ الوعود بنفسك، يتيح لك <code>use()</code> أن «تفكّ» الوعود وقيم السياق مباشرة في متن مكوّنك — بينما يتولّى Suspense التنسيق. الأمر أشبه بامتلاك <code>await</code> لمكوّنات React، لكن بتركيب أفضل ومعالجة أخطاء أنظف.</p>
<p>يعمل خُطّاف <code>use()</code> مع نوعين من الموارد: <strong>الوعود</strong> (promises) للبيانات غير المتزامنة، و<strong>السياق</strong> للحالة المشتركة. فعند تمرير وعد إلى <code>use()</code>، يُعلّق React المكوّن حتى يتحلّل الوعد، ثم يصيّر بالقيمة المتحلّلة. وعند تمرير سياق، فهو فعليًا نسخة أكثر مرونة من <code>useContext</code> يمكن نداؤها شرطيًا.</p>
<p>لنستكشف كيف يبسّط <code>use()</code> جلب البيانات، ويحسّن الأداء، وينشئ معماريات مكوّنات أسهل صيانة.</p>
<h2 id="لماذا-يهم-use">لماذا يهم use()</h2>
<p>قبل <code>use()</code>، كان التعامل مع البيانات غير المتزامنة يعني التلاعب بحالات التحميل وحدود الأخطاء وحلّ الوعود عبر خُطّافات متعددة. وكنت ترى عادةً شيئًا كهذا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ The old way: lots of ceremony</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchUser</span>(userId)
      .<span class="hljs-title function_">then</span>(setUser)
      .<span class="hljs-title function_">catch</span>(setError)
      .<span class="hljs-title function_">finally</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>));
  }, [userId]);

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">throw</span> error;
  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>مع <code>use()</code> وSuspense، يصبح هذا أبسط بكثير:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ The new way: direct resource consumption</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUser</span>(userId));
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>تُعالَج حالات التحميل ومعالجة الأخطاء الآن عبر حدود Suspense الأعلى في شجرة مكوّناتك، ما يفضي إلى فصل أفضل للمسؤوليات وشيفرة أكثر تصريحية.</p>
<h2 id="الاستخدام-الأساسي-للوعود">الاستخدام الأساسي للوعود</h2>
<p>أكثر حالات استخدام <code>use()</code> شيوعًا هو استهلاك الوعود. وإليك كيف يعمل ذلك عمليًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { use, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Your existing async functions work as-is</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserData</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch user&#x27;</span>);
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserCard</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// use() unwraps the promise and gives you the resolved value</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUserData</span>(userId));

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-card&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Wrap with Suspense to handle the loading state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading user…<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<p>عندما يُصيّر <code>UserCard</code>، فإن <code>use(fetchUserData(userId))</code> سيقوم بما يلي:</p>
<ol>
<li>يُعلّق المكوّن في أول تصيير ما دام الوعد معلّقًا</li>
<li>يعرض بديل Suspense حتى يتحلّل الوعد</li>
<li>يُعيد التصيير بالبيانات المتحلّلة بمجرد توفّرها</li>
<li>يرمي الخطأ إلى أقرب حد أخطاء إذا رُفض الوعد</li>
</ol>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>لا يمكن نداء <code>use()</code> إلا أثناء التصيير — لا في معالجات الأحداث ولا في التأثيرات ولا في سياقات أخرى خارج التصيير. والسبب أنه يحتاج إلى التكامل مع دورة تصيير React لتنسيق التعليق.</p>
</blockquote>
<h2 id="العمل-مع-السياق">العمل مع السياق</h2>
<p>يعمل خُطّاف <code>use()</code> أيضًا مع سياق React، فيوفّر بديلًا أكثر مرونة من <code>useContext</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { use, createContext } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ThemeContext</span> = createContext&lt;<span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ThemedButton</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// This is equivalent to useContext(ThemeContext)</span>
  <span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">use</span>(<span class="hljs-title class_">ThemeContext</span>);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn-</span>\${<span class="hljs-attr">theme</span>}\`}&gt;</span>Themed Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<p>الفرق الجوهري أن <code>use()</code> يمكن نداؤه شرطيًا، بينما يجب نداء <code>useContext</code> دائمًا في المستوى الأعلى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalTheme</span>(<span class="hljs-params">{ showThemed }: { showThemed: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-comment">// ✅ This works with use()</span>
  <span class="hljs-keyword">const</span> theme = showThemed ? <span class="hljs-title function_">use</span>(<span class="hljs-title class_">ThemeContext</span>) : <span class="hljs-string">&#x27;default&#x27;</span>;

  <span class="hljs-comment">// ❌ This wouldn&#x27;t work with useContext</span>
  <span class="hljs-comment">// const theme = showThemed ? useContext(ThemeContext) : &#x27;default&#x27;;</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">theme-</span>\${<span class="hljs-attr">theme</span>}\`}&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>هذه المرونة مفيدة خصوصًا للمكوّنات التي قد لا تحتاج دائمًا إلى قيم السياق، أو عند بناء مكوّنات قابلة لإعادة الاستخدام تعمل مع مزوّدي سياق اختياريين.</p>
<h2 id="التخزين-المؤقت-والأداء">التخزين المؤقت والأداء</h2>
<p>من الجوانب الحاسمة في <code>use()</code> فهم كيفية تعامل React مع تخزين الوعود مؤقتًا. لا يخزّن React الوعود تلقائيًا — فإذا مرّرت نسخة وعد جديدة في كل تصيير، دخلت في حلقة لا نهائية من التعليق وإعادة التصيير:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Creates a new promise on every render - infinite loop!</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>()));
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>بدلًا من ذلك، عليك ضمان استقرار الوعد. وإليك عدة مقاربات:</p>
<h3 id="تخزين-الوعود-مؤقتا-memoization">تخزين الوعود مؤقتًا (memoization)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { use, useMemo, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// Memoize the promise to prevent recreation on every render</span>
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId), [userId]);

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="إدارة-الوعود-خارج-المكون">إدارة الوعود خارج المكوّن</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Create promises outside of components or in a cache</span>
<span class="hljs-keyword">const</span> userPromiseCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt;&gt;();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getCachedUserPromise</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">if</span> (!userPromiseCache.<span class="hljs-title function_">has</span>(userId)) {
    userPromiseCache.<span class="hljs-title function_">set</span>(userId, <span class="hljs-title function_">fetchUser</span>(userId));
  }
  <span class="hljs-keyword">return</span> userPromiseCache.<span class="hljs-title function_">get</span>(userId)!;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">getCachedUserPromise</span>(userId));
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="الاستخدام-مع-مكتبات-جلب-البيانات">الاستخدام مع مكتبات جلب البيانات</h3>
<p>مكتبات مثل SWR وReact Query وRelay تتولّى تخزين الوعود مؤقتًا نيابةً عنك بالفعل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { use } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> useSWR <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;swr&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> { data } = <span class="hljs-title function_">useSWR</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>, fetcher, {
    <span class="hljs-attr">suspense</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable Suspense mode</span>
  });

  <span class="hljs-comment">// No need for use() here - SWR handles it</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// Or if you want to use use() directly with a cached promise:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfileWithUse</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">mutate</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>), <span class="hljs-comment">// Returns the cached promise</span>
    [userId],
  );

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="معالجة-الأخطاء">معالجة الأخطاء</h2>
<p>تتبع معالجة الأخطاء مع <code>use()</code> نمط حدود الأخطاء القياسي في React. فعند رفض وعد، يُرمى الخطأ أثناء التصيير ويلتقطه أقرب حد أخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { use, <span class="hljs-title class_">Suspense</span>, <span class="hljs-title class_">ErrorBoundary</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUser</span>(userId)); <span class="hljs-comment">// Throws if promise rejects</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Something went wrong!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<p>لمعالجة أخطاء أكثر تفصيلًا، يمكنك التقاط الأخطاء داخل دوال جلب البيانات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserSafely</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>(userId);
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to fetch user:&#x27;</span>, error);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">// Return fallback instead of throwing</span>
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUserSafely</span>(userId));

  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="أنماط-من-الواقع-العملي">أنماط من الواقع العملي</h2>
<h3 id="تركيب-موارد-غير-متزامنة-متعددة">تركيب موارد غير متزامنة متعددة</h3>
<p>من نقاط قوة <code>use()</code> تركيب موارد غير متزامنة متعددة بنظافة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDashboard</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// These can resolve in parallel or in sequence</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUser</span>(userId));
  <span class="hljs-keyword">const</span> posts = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUserPosts</span>(userId));
  <span class="hljs-keyword">const</span> stats = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUserStats</span>(userId));

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserHeader</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserStats</span> <span class="hljs-attr">stats</span>=<span class="hljs-string">{stats}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PostsList</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{posts}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Wrap in Suspense to handle loading states collectively</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">DashboardSkeleton</span> /&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">UserDashboard</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="التحميل-المتتالي-مقابل-التحميل-المتوازي">التحميل المتتالي مقابل التحميل المتوازي</h3>
<p>انتبه إلى طريقة هيكلة نداءاتك غير المتزامنة. فنداءات <code>use()</code> المتتابعة تُنشئ شلالات تحميل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Waterfall: second request waits for first</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserWithPosts</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUser</span>(userId));
  <span class="hljs-keyword">const</span> posts = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUserPosts</span>(user.<span class="hljs-property">id</span>)); <span class="hljs-comment">// Waits for user to resolve</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserPostsList</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{posts}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Parallel: both requests start immediately</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserWithPosts</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId), [userId]);
  <span class="hljs-keyword">const</span> postsPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUserPosts</span>(userId), [userId]);

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">const</span> posts = <span class="hljs-title function_">use</span>(postsPromise);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserPostsList</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{posts}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="التحسين-التدريجي">التحسين التدريجي</h3>
<p>يعمل <code>use()</code> بامتياز في التحسين التدريجي حيث تريد عرض بيانات جزئية فورًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ArticlePage</span>(<span class="hljs-params">{ articleId }: { articleId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ArticleSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ArticleContent</span> <span class="hljs-attr">articleId</span>=<span class="hljs-string">{articleId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">CommentsSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">ArticleComments</span> <span class="hljs-attr">articleId</span>=<span class="hljs-string">{articleId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">RelatedSkeleton</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">RelatedArticles</span> <span class="hljs-attr">articleId</span>=<span class="hljs-string">{articleId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يمكن لكل قسم أن يُحمَّل باستقلال، ما يوفّر تجربة مستخدم أفضل من انتظار تحميل كل شيء دفعة واحدة.</p>
<h2 id="استراتيجيات-الترحيل">استراتيجيات الترحيل</h2>
<h3 id="من-useeffect-usestate">من <code>useEffect</code> + <code>useState</code></h3>
<p>إذا كنت تُرحّل من أنماط <code>useEffect</code> + <code>useState</code> التقليدية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before: manual state management</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchUser</span>(userId).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> {
      <span class="hljs-title function_">setUser</span>(user);
      <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
    });
  }, [userId]);

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user?.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// After: use() + Suspense</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId), [userId]);
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="من-مكتبات-جلب-البيانات">من مكتبات جلب البيانات</h3>
<p>تدعم مكتبات جلب البيانات كثيرة بالفعل وضع Suspense، ما يجعل الترحيل مباشرًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// With React Query</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: user } = <span class="hljs-title function_">useQuery</span>({
    <span class="hljs-attr">queryKey</span>: [<span class="hljs-string">&#x27;user&#x27;</span>, userId],
    <span class="hljs-attr">queryFn</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId),
    <span class="hljs-attr">suspense</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Enable Suspense integration</span>
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// Or using use() directly with React Query&#x27;s promise</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> queryClient = <span class="hljs-title function_">useQueryClient</span>();
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> queryClient.<span class="hljs-title function_">fetchQuery</span>([<span class="hljs-string">&#x27;user&#x27;</span>, userId], <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId)),
    [userId, queryClient],
  );

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="متى-تستخدم-use-مقابل-الخطافات-التقليدية">متى تستخدم use() مقابل الخُطّافات التقليدية</h3>
<p>يبدع <code>use()</code> عندما تريد:</p>
<ul>
<li><strong>شيفرة غير متزامنة تصريحية</strong>: بلا حالات تحميل يدوية</li>
<li><strong>تركيبًا أفضل</strong>: موارد غير متزامنة متعددة في مكوّن واحد</li>
<li><strong>معالجة أخطاء مبسّطة</strong>: دع حدود الأخطاء تتولّى الإخفاقات</li>
<li><strong>التصيير على الخادم</strong>: يعمل أفضل مع RSC وSSR</li>
</ul>
<p>والتزم بالخُطّافات التقليدية عندما تحتاج إلى:</p>
<ul>
<li><strong>تحكم أمرّي</strong>: حالات تحميل يدوية أو جلب شرطي</li>
<li><strong>توافق مع الشيفرة القديمة</strong>: العمل مع إصدارات React الأقدم</li>
<li><strong>تجربة تحميل دقيقة التفصيل</strong>: حالات تحميل مختلفة لأجزاء مختلفة من واجهتك</li>
</ul>
<h3 id="حجم-الحزمة-واهتزاز-الشجرة">حجم الحزمة واهتزاز الشجرة</h3>
<p><code>use()</code> جزء من حزمة React الأساسية، فلا وزن إضافي. لكن انتبه إلى كيفية هيكلة جلب بياناتك لتجنّب تضمين شيفرة غير ضرورية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: conditional imports</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId, includeAnalytics }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUser</span>(userId));

  <span class="hljs-keyword">const</span> analytics = includeAnalytics
    ? <span class="hljs-title function_">use</span>(<span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;./analytics&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-title function_">fetchAnalytics</span>(userId)))
    : <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      {analytics &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">AnalyticsPanel</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{analytics}</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="نظرة-إلى-الأمام">نظرة إلى الأمام</h2>
<p>يجسّد خُطّاف <code>use()</code> رؤية React لبرمجة غير متزامنة أبسط وأكثر تصريحية. ومع مكوّنات خادم React وواجهات التخزين المؤقت القادمة، فهو يمكّن أنماطًا مثل:</p>
<ul>
<li><strong>إزالة التكرار التلقائية</strong>: الوعد نفسه المستخدم في مكوّنات متعددة يتحلّل مرة واحدة</li>
<li><strong>SSR متدفق</strong>: يمكن للمحتوى المصيَّر على الخادم أن يتدفّق تدريجيًا</li>
<li><strong>تجربة تطوير أفضل</strong>: كود متكرر أقل، ونية أوضح، وتنقيح أسهل</li>
</ul>
<p>ومع تطوّر المنظومة، توقّع أن تتبنّى مكتبات وأطر أكثر <code>use()</code> لأنماط غير متزامنة أنظف. والمفتاح هو فهم متى وكيف تطبّقه بفعالية — وهو ما يعني غالبًا إعادة التفكير في تدفّق بياناتك من إدارة حالة أمرّية إلى استهلاك تصريحي للموارد.</p>
<h2 id="المتطلبات-السابقة">المتطلبات السابقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>فهم React Suspense وحدود الأخطاء</li>
<li>خبرة بالوعود وasync/await في JavaScript</li>
<li>معرفة أساسية بسياق React</li>
<li>إلمام بأنماط جلب البيانات</li>
</ul>
<h2 id="أمثلة-عملية">أمثلة عملية</h2>
<p>سيناريوهات من الواقع العملي يتألق فيها use():</p>
<ul>
<li><strong>تطبيقات لوحات المعلومات</strong> - مصادر بيانات متعددة تُحمَّل بالتوازي</li>
<li><strong>أنظمة إدارة المحتوى</strong> - تحميل تدريجي للمحتوى</li>
<li><strong>مواقع التجارة الإلكترونية</strong> - تفاصيل المنتج مع العناصر المرتبطة</li>
<li><strong>أخبار وسائل التواصل الاجتماعي</strong> - تركيب المنشورات والتعليقات وبيانات المستخدم</li>
</ul>
<p>ابدأ صغيرًا بترحيل بضعة مكوّنات غير متزامنة بسيطة إلى <code>use()</code>، وتآلف مع أنماط حدود Suspense، ثم طبّقها تدريجيًا على سيناريوهات جلب بيانات أكثر تعقيدًا. وسيشكرك مستقبلك (وزملاؤك) على الشيفرة الأنظف والأسهل صيانة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
