const s="kinney",a="react-typescript",n="React مع TypeScript",l="the-use-hook-and-suspense-typing",p="الخُطّاف use وحدود Suspense: تحديد الأنواع",t=[{depth:2,id:"أساسيات-use",text:"أساسيات use()"},{depth:2,id:"تحديد-أنواع-البيانات-المبنية-على-الوعود",text:"تحديد أنواع البيانات المبنيّة على الوعود"},{depth:2,id:"إنشاء-مصانع-موارد-منمطة",text:"إنشاء مصانع موارد مُنمَّطة"},{depth:2,id:"الاستدعاءات-الشرطية-لـ-use-وأمان-الأنواع",text:"الاستدعاءات الشرطية لـ use() وأمان الأنواع"},{depth:2,id:"تحديد-أنواع-حدود-suspense",text:"تحديد أنواع حدود Suspense"},{depth:2,id:"معالجة-الأخطاء-بأمان-الأنواع",text:"معالجة الأخطاء بأمان الأنواع"},{depth:2,id:"حالات-الاستخدام-من-العالم-الحقيقي",text:"حالات الاستخدام من العالم الحقيقي™"},{depth:3,id:"نتائج-بحث-منمطة",text:"نتائج بحث مُنمَّطة"},{depth:3,id:"التحميل-المتوازي-للبيانات",text:"التحميل المتوازي للبيانات"},{depth:2,id:"المآخذ-الشائعة-وكيف-تتجنبها",text:"المآخذ الشائعة وكيف تتجنّبها"},{depth:3,id:"لا-تنشئ-وعودا-أثناء-التصيير",text:"لا تنشئ وعودًا أثناء التصيير"},{depth:3,id:"تعامل-مع-توقيت-حل-الوعد",text:"تعامل مع توقيت حلّ الوعد"},{depth:3,id:"حدد-أنواع-مصانع-الوعود-على-نحو-صحيح",text:"حدّد أنواع مصانع الوعود على نحو صحيح"},{depth:2,id:"الأنماط-المتقدمة",text:"الأنماط المتقدّمة"},{depth:3,id:"تركيب-موارد-منمط",text:"تركيب موارد مُنمَّط"},{depth:3,id:"مورد-مع-حالات-تحميل",text:"مورد مع حالات تحميل"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>الخُطّاف <code>use()</code> في React هو تغييرٌ جذري في التعامل مع البيانات غير المتزامنة — فهو يتيح لك استهلاك الوعود (promises) والمصادر مباشرةً من دون مراسم <code>useEffect</code> المعتادة. ومع حدود Suspense، يمكنك بناء مكوّنات تتعامل مع حالات التحميل والأخطاء بأناقة. والجزء الصعب؟ أن تتأكّد من أن TypeScript يفهم ما يجري حين تبدأ مكوّناتك في رمي الوعود حولها (حرفيًا).</p>
<p>سنستكشف كيفية تحديد أنواع الخُطّاف <code>use()</code> على نحو صحيح، والتعامل مع حدود Suspense بثقة، وتجنّب الفخاخ التي تنشأ عن مزج البيانات غير المتزامنة مع TypeScript. وفي نهايتك، ستكتب مكوّنات تبدو سحرية في الاستخدام لكنها تبقى آمنة الأنواع تمامًا في العمق.</p>
<h2 id="أساسيات-use">أساسيات use()</h2>
<p>الخُطّاف <code>use()</code> هو أحدث طريقة في React لفكّ تغليف الوعود وقيم السياق. وبخلاف الخُطّافات التقليدية، يمكن استدعاؤه بشكل شرطي بل وحتى داخل الحلقات — وهو ما يجعله مرنًا للغاية في سيناريوهات جلب البيانات الديناميكية.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { use } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Basic promise consumption</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userPromise }: { userPromise: <span class="hljs-built_in">Promise</span>&lt;User&gt; }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}
</code></pre>
<p>وتحدث السحر عندما يصطدم مكوّنك بوعدٍ لم يُحلّ بعد. سيعلّق React المكوّن (برمي الوعد)، ويلتقط أقرب حدّ Suspense له، ويعرض بديلًا (fallback) إلى أن يُحلّ الوعد. وبعد الحلّ، يعيد React تصيير المكوّن بالبيانات الفعلية.</p>
<p>وهنا تصبح TypeScript مثيرة للاهتمام. يحتاج الخُطّاف <code>use()</code> إلى فهم النوع الذي يُحلّ إليه وعدك، ويحتاج مكوّنك إلى تحديد دقيق للحالتين: المعلَّقة والمحلولة.</p>
<h2 id="تحديد-أنواع-البيانات-المبنية-على-الوعود">تحديد أنواع البيانات المبنيّة على الوعود</h2>
<p>لنبدأ بالسيناريو الأكثر شيوعًا — جلب البيانات من واجهة برمجية واستهلاكها عبر <code>use()</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileProps</span> {
  <span class="hljs-attr">userPromise</span>: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt;;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userPromise }: <span class="hljs-title class_">UserProfileProps</span></span>) {
  <span class="hljs-comment">// TypeScript infers that \`user\` is of type \`User\`</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>الخُطّاف <code>use()</code> ذكيّ بما يكفي لاستنتاج النوع المحلول من وعدك. فإن مرّرت <code>Promise&lt;User&gt;</code> ستحصل على <code>User</code> في المقابل. وإن مرّرت <code>Promise&lt;string[]&gt;</code> ستحصل على <code>string[]</code>. ولا حاجة إلى أي تعليقات نوعية إضافية.</p>
<p>لكن ماذا يحدث إذا كان وعدك قد يُرفض؟ هنا يأتي دور حدود الأخطاء (error boundaries).</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ErrorBoundary</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-error-boundary&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">fetchUser</span>(<span class="hljs-number">123</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Something went wrong!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userPromise</span>=<span class="hljs-string">{userPromise}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>تلتقط حدود الأخطاء رفض الوعود الصادرة عن <code>use()</code>، بينما تلتقط حدود Suspense الوعود نفسها أثناء حالة الانتظار.</p>
</blockquote>
<h2 id="إنشاء-مصانع-موارد-منمطة">إنشاء مصانع موارد مُنمَّطة</h2>
<p>في السيناريوهات الأكثر تعقيدًا، ستحتاج غالبًا إلى إنشاء مصانع موارد تُعيد وعودًا مُحكمة الأنواع. وإليك نمطًا يعمل جيدًا مع TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T;
  <span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">headers</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
}

<span class="hljs-comment">// Generic resource factory with proper typing</span>
<span class="hljs-keyword">function</span> createResource&lt;T&gt;(<span class="hljs-attr">fetcher</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetcher</span>();
}

<span class="hljs-comment">// Usage with automatic type inference</span>
<span class="hljs-keyword">const</span> userResource = <span class="hljs-title function_">createResource</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/users/123&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt;),
);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// TypeScript knows this is User</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userResource);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}
</code></pre>
<p>ولإدارة موارد أكثر تطوّرًا، قد ترغب في إنشاء مورد يتعامل مع التخزين المؤقت ومنع التكرار:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ResourceState</span>&lt;T&gt; {
  <span class="hljs-attr">promise</span>: <span class="hljs-title class_">Promise</span>&lt;T&gt;;
  <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span> | <span class="hljs-string">&#x27;resolved&#x27;</span> | <span class="hljs-string">&#x27;rejected&#x27;</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
}

<span class="hljs-keyword">function</span> createCachedResource&lt;T&gt;(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fetcher</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
  <span class="hljs-comment">// Implementation would include caching logic</span>
  <span class="hljs-comment">// For now, simplified version:</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetcher</span>();
}

<span class="hljs-comment">// Type-safe resource creation</span>
<span class="hljs-keyword">const</span> postsResource = <span class="hljs-title function_">createCachedResource</span>(<span class="hljs-string">&#x27;posts&#x27;</span>, (): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Post</span>[]&gt; =&gt;
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/posts&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>()),
);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">PostsList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> posts = <span class="hljs-title function_">use</span>(postsResource); <span class="hljs-comment">// TypeScript knows this is Post[]</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {posts.map((post) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الاستدعاءات-الشرطية-لـ-use-وأمان-الأنواع">الاستدعاءات الشرطية لـ use() وأمان الأنواع</h2>
<p>من المزايا الفريدة لـ <code>use()</code> أنّه يمكن استدعاؤه بشكل شرطي. وهذا يولّد سيناريوهات أنواع مثيرة للاهتمام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ConditionalDataProps</span> {
  <span class="hljs-attr">shouldLoad</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">dataPromise</span>?: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt;;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalData</span>(<span class="hljs-params">{ shouldLoad, dataPromise }: <span class="hljs-title class_">ConditionalDataProps</span></span>) {
  <span class="hljs-comment">// TypeScript needs to understand this conditional usage</span>
  <span class="hljs-keyword">const</span> user = shouldLoad &amp;&amp; dataPromise ? <span class="hljs-title function_">use</span>(dataPromise) : <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No data to display<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-comment">// TypeScript knows \`user\` is definitely of type \`User\` here</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}
</code></pre>
<p>ولمنطق شرطي أكثر تعقيدًا، قد تحتاج إلى مساعدة TypeScript على فهم مجرى التنفيذ:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">MultiResourceProps</span> {
  <span class="hljs-attr">userPromise</span>?: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt;;
  <span class="hljs-attr">profilePromise</span>?: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">UserProfile</span>&gt;;
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;user&#x27;</span> | <span class="hljs-string">&#x27;profile&#x27;</span> | <span class="hljs-string">&#x27;none&#x27;</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MultiResource</span>(<span class="hljs-params">{ userPromise, profilePromise, mode }: <span class="hljs-title class_">MultiResourceProps</span></span>) {
  <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">&#x27;user&#x27;</span> &amp;&amp; userPromise) {
    <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">&#x27;profile&#x27;</span> &amp;&amp; profilePromise) {
    <span class="hljs-keyword">const</span> profile = <span class="hljs-title function_">use</span>(profilePromise);
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProfileCard</span> <span class="hljs-attr">profile</span>=<span class="hljs-string">{profile}</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Nothing to show<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h2 id="تحديد-أنواع-حدود-suspense">تحديد أنواع حدود <code>Suspense</code></h2>
<p>حدود Suspense نفسها لا تحتاج إلى تحديد أنواع خاصّ، لكنّ المكوّنات التي تغلّفها تحتاج إلى ذلك. وإليك كيفية إنشاء بنية مكوّنات غير متزامنة مُحكمة الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AsyncPageProps</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// The async component that uses \`use()\`</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">AsyncUserPage</span>(<span class="hljs-params">{ userId }: <span class="hljs-title class_">AsyncPageProps</span></span>) {
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId), [userId]);

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>User ID: {user.id}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// The wrapper that handles Suspense</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserPage</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">AsyncPageProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">UserPageSkeleton</span> /&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">AsyncUserPage</span> {<span class="hljs-attr">...props</span>} /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<p>وللمكوّنات التي تحتاج إلى التعامل مع عدّة موارد غير متزامنة، يمكنك تركيبها بأناقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ComplexAsyncPage</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId), [userId]);
  <span class="hljs-keyword">const</span> postsPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUserPosts</span>(userId), [userId]);

  <span class="hljs-comment">// Both promises are consumed independently</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">const</span> posts = <span class="hljs-title function_">use</span>(postsPromise);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserHeader</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PostsList</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{posts}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="معالجة-الأخطاء-بأمان-الأنواع">معالجة الأخطاء بأمان الأنواع</h2>
<p>حين تُرفض الوعود، تحتاج إلى حدود أخطاء ملائمة. وإليك كيفية إنشاء معالجة أخطاء آمنة الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ErrorBoundary</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-error-boundary&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiError</span> {
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">status</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ErrorFallback</span>(<span class="hljs-params">{ error }: { error: ApiError }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;alert&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Something went wrong:<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Status: {error.status}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TypedErrorBoundary</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">FallbackComponent</span>=<span class="hljs-string">{ErrorFallback}</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>;
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TypedErrorBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Loading</span> /&gt;</span>}&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">AsyncUserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TypedErrorBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="حالات-الاستخدام-من-العالم-الحقيقي">حالات الاستخدام من العالم الحقيقي™</h2>
<p>إليك بعض الأنماط التي من المرجّح أن تصادفها في تطبيقات الإنتاج:</p>
<h3 id="نتائج-بحث-منمطة">نتائج بحث مُنمَّطة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SearchResult</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">total</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">hasMore</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">SearchResults</span>&lt;T&gt;({ searchPromise }: { <span class="hljs-attr">searchPromise</span>: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">SearchResult</span>&lt;T&gt;&gt; }) {
  <span class="hljs-keyword">const</span> results = <span class="hljs-title function_">use</span>(searchPromise);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{results.total} results found<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      {results.items.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">SearchResultItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> /&gt;</span>
      ))}
      {results.hasMore &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">LoadMoreButton</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage with type inference</span>
<span class="hljs-keyword">const</span> userSearchPromise = <span class="hljs-title function_">searchUsers</span>(<span class="hljs-string">&#x27;john&#x27;</span>); <span class="hljs-comment">// Returns Promise&lt;SearchResult&lt;User&gt;&gt;</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SearchResults</span> <span class="hljs-attr">searchPromise</span>=<span class="hljs-string">{userSearchPromise}</span> /&gt;</span></span>;
</code></pre>
<h3 id="التحميل-المتوازي-للبيانات">التحميل المتوازي للبيانات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DashboardData</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>;
  <span class="hljs-attr">notifications</span>: <span class="hljs-title class_">Notification</span>[];
  <span class="hljs-attr">stats</span>: <span class="hljs-title class_">UserStats</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// Create all promises upfront for parallel loading</span>
  <span class="hljs-keyword">const</span> [userPromise, notificationsPromise, statsPromise] = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> [<span class="hljs-title function_">fetchUser</span>(userId), <span class="hljs-title function_">fetchNotifications</span>(userId), <span class="hljs-title function_">fetchUserStats</span>(userId)],
    [userId],
  );

  <span class="hljs-comment">// Consume them all with proper typing</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">const</span> notifications = <span class="hljs-title function_">use</span>(notificationsPromise);
  <span class="hljs-keyword">const</span> stats = <span class="hljs-title function_">use</span>(statsPromise);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserHeader</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatsWidget</span> <span class="hljs-attr">stats</span>=<span class="hljs-string">{stats}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">NotificationList</span> <span class="hljs-attr">notifications</span>=<span class="hljs-string">{notifications}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="المآخذ-الشائعة-وكيف-تتجنبها">المآخذ الشائعة وكيف تتجنّبها</h2>
<h3 id="لا-تنشئ-وعودا-أثناء-التصيير">لا تنشئ وعودًا أثناء التصيير</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Creates new promise on every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUser</span>(userId)); <span class="hljs-comment">// New promise every time!</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Memoize the promise</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userPromise = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">fetchUser</span>(userId), [userId]);
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(userPromise);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}
</code></pre>
<h3 id="تعامل-مع-توقيت-حل-الوعد">تعامل مع توقيت حلّ الوعد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Handle the case where data might not be available</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SafeComponent</span>(<span class="hljs-params">{ dataPromise }: { dataPromise: <span class="hljs-built_in">Promise</span>&lt;Data&gt; | <span class="hljs-literal">null</span> }</span>) {
  <span class="hljs-keyword">if</span> (!dataPromise) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No data requested<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">const</span> data = <span class="hljs-title function_">use</span>(dataPromise);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DataDisplay</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="حدد-أنواع-مصانع-الوعود-على-نحو-صحيح">حدّد أنواع مصانع الوعود على نحو صحيح</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Loses type information</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">createUserFetcher</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>());

<span class="hljs-comment">// ✅ Good: Explicit return type</span>
<span class="hljs-keyword">const</span> createUserFetcher = (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; =&gt;
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">User</span>);

<span class="hljs-comment">// ✅ Even better: Runtime validation</span>
<span class="hljs-keyword">const</span> createUserFetcher = <span class="hljs-title function_">async</span> (<span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">UserSchema</span>.<span class="hljs-title function_">parse</span>(data); <span class="hljs-comment">// Assuming you&#x27;re using Zod</span>
};
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تحقّق دائمًا من استجابات الواجهة البرمجية وقت التشغيل. أنواع TypeScript لا وجود لها وقت التشغيل، لذا فالبيانات الخارجية تحتاج إلى تحقّق.</p>
</blockquote>
<h2 id="الأنماط-المتقدمة">الأنماط المتقدّمة</h2>
<h3 id="تركيب-موارد-منمط">تركيب موارد مُنمَّط</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">CompositeResource</span>&lt;T, U&gt; {
  <span class="hljs-attr">primary</span>: T;
  <span class="hljs-attr">secondary</span>: U;
}

<span class="hljs-keyword">function</span> createCompositeResource&lt;T, U&gt;(
  <span class="hljs-attr">primaryPromise</span>: <span class="hljs-title class_">Promise</span>&lt;T&gt;,
  <span class="hljs-attr">secondaryPromise</span>: <span class="hljs-title class_">Promise</span>&lt;U&gt;,
): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">CompositeResource</span>&lt;T, U&gt;&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([primaryPromise, secondaryPromise]).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">[primary, secondary]</span>) =&gt;</span> ({
    primary,
    secondary,
  }));
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CompositeView</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> compositePromise = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">createCompositeResource</span>(<span class="hljs-title function_">fetchUser</span>(userId), <span class="hljs-title function_">fetchUserPreferences</span>(userId)),
    [userId],
  );

  <span class="hljs-keyword">const</span> { <span class="hljs-attr">primary</span>: user, <span class="hljs-attr">secondary</span>: preferences } = <span class="hljs-title function_">use</span>(compositePromise);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PreferencesPanel</span> <span class="hljs-attr">preferences</span>=<span class="hljs-string">{preferences}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="مورد-مع-حالات-تحميل">مورد مع حالات تحميل</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ResourceWithMeta</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
}

<span class="hljs-comment">// This is more of a conceptual pattern since use() handles this automatically</span>
<span class="hljs-keyword">function</span> createResourceWithMeta&lt;T&gt;(<span class="hljs-attr">promise</span>: <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ResourceWithMeta</span>&lt;T&gt;&gt; {
  <span class="hljs-keyword">return</span> promise.<span class="hljs-title function_">then</span>(
    <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> ({ data, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span> }),
    <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> ({ <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, error }),
  );
}
</code></pre>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>يوفّر الخُطّاف <code>use()</code> مع Suspense أساسًا قويًا للتعامل مع البيانات غير المتزامنة في تطبيقات React. ومع التكامل السليم مع TypeScript، يمكنك بناء مكوّنات سريعة وآمنة الأنواع في آنٍ واحد.</p>
<p>أهم الخلاصات:</p>
<ul>
<li>خزّن الوعود مؤقتًا دائمًا لتجنّب إعادة الجلب غير الضرورية</li>
<li>استخدم حدود أخطاء ملائمة إلى جانب حدود Suspense</li>
<li>تحقّق من البيانات الخارجية وقت التشغيل لا في وقت التجميع وحده</li>
<li>أنشئ مصانع موارد مُنمَّطة لأنماط غير متزامنة قابلة لإعادة الاستخدام</li>
<li>تذكّر أنّ <code>use()</code> يمكن استدعاؤه بشكل شرطي — فاحتضن هذه المرونة</li>
</ul>
<p>أثناء بناء تطبيقات أكثر تعقيدًا، فكّر في استكشاف مكتبات مثل <a href="https://tanstack.com/query/latest">TanStack Query</a> أو <a href="https://swr.vercel.app/">SWR</a> التي تقدّم ميزات إضافية مثل التخزين المؤقت والتحديثات في الخلفية ومعالجة أخطاء أكثر تطوّرًا — كلّها بدعم ممتاز من TypeScript.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
