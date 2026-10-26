const s="kinney",a="react-performance",n="أداء React",l="understanding-reconciliation-react-19",p="فهم المطابقة (Reconciliation) في React 19",t=[{depth:2,id:"ما-هي-المطابقة",text:"ما هي المطابقة؟"},{depth:2,id:"خوارزمية-المطابقة",text:"خوارزمية المطابقة"},{depth:3,id:"القاعدة-1-أنواع-العناصر-المختلفة-استبدال-كامل",text:"القاعدة 1: أنواع العناصر المختلفة = استبدال كامل"},{depth:3,id:"القاعدة-2-تقارن-العناصر-ذات-المفاتيح-بمفاتيحها",text:"القاعدة 2: تُقارَن العناصر ذات المفاتيح بمفاتيحها"},{depth:3,id:"القاعدة-3-نوع-المكون-نفسه-مطابقة-الخصائص-والحالة",text:"القاعدة 3: نوع المكوّن نفسه = مطابقة الخصائص والحالة"},{depth:2,id:"تحسينات-المطابقة-في-react-19",text:"تحسينات المطابقة في React 19"},{depth:3,id:"التجميع-التلقائي-في-كل-مكان",text:"التجميع التلقائي في كل مكان"},{depth:3,id:"ميزات-التزامن-المحسنة",text:"ميزات التزامن المحسّنة"},{depth:2,id:"مزالق-الأداء-الشائعة-في-المطابقة",text:"مزالق الأداء الشائعة في المطابقة"},{depth:3,id:"المزلق-1-إنشاء-كائنات-أثناء-التصيير",text:"المزلق 1: إنشاء كائنات أثناء التصيير"},{depth:3,id:"المزلق-2-دوال-كخصائص",text:"المزلق 2: دوال كخصائص"},{depth:3,id:"المزلق-3-تغير-الموضع-عند-التصيير-الشرطي",text:"المزلق 3: تغيّر الموضع عند التصيير الشرطي"},{depth:2,id:"التحسين-من-أجل-المطابقة",text:"التحسين من أجل المطابقة"},{depth:3,id:"استخدم-reactmemo-بحكمة",text:"استخدم React.memo() بحكمة"},{depth:3,id:"أنزل-الحالة-إلى-الأسفل",text:"أنزل الحالة إلى الأسفل"},{depth:3,id:"افصل-الحالة-سريعة-التغير",text:"افصل الحالة سريعة التغيّر"},{depth:2,id:"تنقيح-مشكلات-المطابقة",text:"تنقيح مشكلات المطابقة"},{depth:3,id:"تبويب-profiler",text:"تبويب Profiler"},{depth:3,id:"مكتبة-why-did-you-render",text:"مكتبة Why Did You Render"},{depth:2,id:"أنماط-أداء-من-الواقع-العملي",text:"أنماط أداء من الواقع العملي"},{depth:3,id:"التمرير-الافتراضي-للقوائم-الكبيرة",text:"التمرير الافتراضي للقوائم الكبيرة"},{depth:3,id:"المكونات-المركبة-لواجهات-معقدة",text:"المكوّنات المركّبة لواجهات معقّدة"}],e=`<p>عملية المطابقة (reconciliation) في React هي السحر الكامن وراء تحديث مكوّناتك بكفاءة — لكنها أيضًا الموضع الذي تختبئ فيه معظم مشكلات الأداء. إن تساءلت يومًا لماذا يبدو تطبيق React لديك بطيئًا، أو لماذا يؤدي تغيير مكوّن واحد إلى عمليات إعادة تصيير غير متوقّعة في مكان آخر، فأنت في المكان الصحيح. لنُزل الغموض عن كيفية مقارنة React لأشجار المكوّنات، وتحديد ما يحتاج إلى تحديث، وجدولة هذا العمل في React 19.</p>
<p>بنهاية هذا الدرس، ستفهم خوارزمية المطابقة فهمًا يكفي لكتابة مكوّنات تعمل <em>مع</em> React بدل مصارعتها (وتنقّح مشكلات الأداء كما يفعل المهندس المتمرّس الذي تصير إليه).</p>
<h2 id="ما-هي-المطابقة">ما هي المطابقة؟</h2>
<p>المطابقة هي عملية React لمعرفة ما تغيّر بين عمليات التصيير وتحديث DOM وفقًا لذلك. تخيّلها كخوارزمية فرق (diff) بالغة الذكاء — تقارن React شجرة المكوّنات الجديدة (ما تريد تصييره) بالشجرة السابقة (ما يظهر حاليًا على الشاشة) وتحسب أصغر مجموعة من التغييرات اللازمة.</p>
<p>إليك الرؤية الجوهرية: <strong>لا تتعامل React مع DOM مباشرة أبدًا أثناء التصيير</strong>. بل تبني تمثيلًا افتراضيًا لما ينبغي أن تبدو عليه واجهة المستخدم، وتقارنه بالإصدار السابق، ثم تطبّق التغييرات الضرورية فقط. تحدث هذه العملية على مرحلتين:</p>
<ol>
<li><strong>مرحلة التصيير</strong>: تستدعي React مكوّناتك وتبني الشجرة الافتراضية الجديدة</li>
<li><strong>مرحلة الإيداع (commit)</strong>: تطبّق React التغييرات المحسوبة على DOM الفعلي</li>
</ol>
<p>خوارزمية المطابقة هي ما يجعل React سريعة — فبدل إعادة إنشاء DOM بالكامل عند كل تغيّر في الحالة، تحدّث بدقة جراحية ما يحتاج إلى تغيير فقط.</p>
<h2 id="خوارزمية-المطابقة">خوارزمية المطابقة</h2>
<p>تتبع مطابقة React مجموعة من القواعد المتوقّعة. فهم هذه القواعد جوهري لأنها تحدّد متى تُعاد مكوّناتك للتصيير ومدى كفاءة أداء تطبيقك.</p>
<h3 id="القاعدة-1-أنواع-العناصر-المختلفة-استبدال-كامل">القاعدة 1: أنواع العناصر المختلفة = استبدال كامل</h3>
<p>عندما تصادف React عناصر من أنواع مختلفة في الموضع نفسه، فإنها تهدم الشجرة الفرعية بالكامل وتبني واحدة جديدة من الصفر.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This will destroy and recreate the entire subtree</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Application</span>(<span class="hljs-params">{ isLoggedIn }: { isLoggedIn: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">if</span> (isLoggedIn) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome back!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Please log in<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>; <span class="hljs-comment">// Different element type!</span>
}

<span class="hljs-comment">// ✅ Better: Same element type, different content</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Application</span>(<span class="hljs-params">{ isLoggedIn }: { isLoggedIn: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{isLoggedIn ? &#x27;Welcome back!&#x27; : &#x27;Please log in&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>في المثال الأول، يؤدي التبديل بين <code>div</code> و<code>span</code> إلى أن تقوم React بما يلي:</p>
<ol>
<li>تُلغي تحميل <code>div</code> القديم وتستدعي تأثيرات التنظيف</li>
<li>تُنشئ <code>span</code> جديدًا من الصفر</li>
<li>تُشغّل جميع تأثيرات التهيئة</li>
</ol>
<p>هذا مكلف ويفقد حالة المكوّن. أما النهج الثاني فيُبقي <code>div</code> نفسه ويحدّث محتواه النصي فقط.</p>
<h3 id="القاعدة-2-تقارن-العناصر-ذات-المفاتيح-بمفاتيحها">القاعدة 2: تُقارَن العناصر ذات المفاتيح بمفاتيحها</h3>
<p>تساعد المفاتيح React على تحديد العناصر التي تغيّرت أو أُضيفت أو حُذفت. بدون مفاتيح، تستخدم React المطابقة القائمة على الموضع، وقد يُسبّب ذلك مشكلات في الأداء وأخطاء.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Without keys, React matches by position</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos }: { todos: Todo[] }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span> // No key!
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ With keys, React matches by identity</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos }: { todos: Todo[] }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>{todo.text}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}
</code></pre>
<p>إليك ما يحدث عندما تضيف عنصرًا إلى بداية القائمة:</p>
<p><strong>بدون مفاتيح</strong>: تظنّ React أنك عدّلت كل عنصر موجود وأضفت عنصرًا في النهاية. فتُعاد كل عناصر <code>&lt;li&gt;</code> للتصيير بلا داعٍ.</p>
<p><strong>مع مفاتيح</strong>: تتعرّف React على العناصر الموجودة من خلال مفاتيحها وتنشئ العنصر الجديد فقط. كفاءة أعلى بكثير!</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تستخدم فهارس المصفوفة مفاتيح إن كانت قائمتك قابلة لتغيّر الترتيب. عندما تتغيّر مواضع العناصر، سترى React مفاتيح مختلفة في مواضع مختلفة وتظنّ أن العناصر تغيّرت.</p>
</blockquote>
<h3 id="القاعدة-3-نوع-المكون-نفسه-مطابقة-الخصائص-والحالة">القاعدة 3: نوع المكوّن نفسه = مطابقة الخصائص والحالة</h3>
<p>عندما تصادف React نوع المكوّن نفسه في الموضع نفسه، تُبقي نسخة المكوّن حيّة وتحدّث الخصائص المتغيّرة فقط.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId, theme }: { userId: <span class="hljs-built_in">string</span>; theme: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchUser</span>(userId).<span class="hljs-title function_">then</span>(setUser);
  }, [userId]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{theme}</span>&gt;</span>{user ? <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// When parent re-renders with same userId but different theme:</span>
<span class="hljs-comment">// - Component instance stays the same</span>
<span class="hljs-comment">// - State (user) is preserved</span>
<span class="hljs-comment">// - Only the className updates</span>
<span class="hljs-comment">// - useEffect doesn&#x27;t re-run because userId didn&#x27;t change</span>
</code></pre>
<p>لهذا السبب يمكن لمكوّنات React الحفاظ على الحالة عبر عمليات إعادة التصيير — فما دامت في الموضع نفسه وبالنوع نفسه، تحتفظ React بنسخة المكوّن.</p>
<h2 id="تحسينات-المطابقة-في-react-19">تحسينات المطابقة في React 19</h2>
<p>يقدّم React 19 عدة تحسينات تجعل المطابقة أكثر كفاءة وقابلية للتنبّؤ.</p>
<h3 id="التجميع-التلقائي-في-كل-مكان">التجميع التلقائي في كل مكان</h3>
<p>يوسّع React 19 التجميع التلقائي ليعمل باطراد في جميع السياقات — بما في ذلك setTimeout والوعود (promises) ومعالجات الأحداث الأصلية.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ In React 19, these are automatically batched</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleClick</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">setCount</span>(count + <span class="hljs-number">1</span>);
  <span class="hljs-title function_">setName</span>(<span class="hljs-string">&#x27;Alice&#x27;</span>);
  <span class="hljs-title function_">setActive</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-comment">// Only one re-render happens, not three!</span>
}

<span class="hljs-comment">// ✅ Even in async contexts</span>
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">setCount</span>(count + <span class="hljs-number">1</span>);
  <span class="hljs-title function_">setName</span>(<span class="hljs-string">&#x27;Bob&#x27;</span>);
  <span class="hljs-comment">// Still batched in React 19!</span>
}, <span class="hljs-number">1000</span>);
</code></pre>
<p>يعني هذا عمليات إعادة تصيير غير ضرورية أقل وأداءً أفضل دون أي إعداد.</p>
<h3 id="ميزات-التزامن-المحسنة">ميزات التزامن المحسّنة</h3>
<p>يمكن لمُصيّر React 19 المتزامن مقاطعة العمل منخفض الأولوية لمعالجة التحديثات عالية الأولوية (مثل إدخال المستخدم) فورًا.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// High-priority update (user typing)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchInput</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)} // High priority
    /&gt;</span>
  );
}

<span class="hljs-comment">// Low-priority update (expensive search results)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params">{ query }: { query: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [results, setResults] = <span class="hljs-title function_">useState</span>([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This work can be interrupted for high-priority updates</span>
    <span class="hljs-title function_">searchExpensively</span>(query).<span class="hljs-title function_">then</span>(setResults);
  }, [query]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {results.map((result) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ResultItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{result.id}</span> <span class="hljs-attr">result</span>=<span class="hljs-string">{result}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يضمن React 19 أن تظلّ الكتابة في مربّع البحث سريعة الاستجابة حتى أثناء تشغيل عمليات بحث مكلفة في الخلفية.</p>
<h2 id="مزالق-الأداء-الشائعة-في-المطابقة">مزالق الأداء الشائعة في المطابقة</h2>
<p>يساعدك فهم المطابقة على تجنّب هذه الفخاخ الشائعة في الأداء:</p>
<h3 id="المزلق-1-إنشاء-كائنات-أثناء-التصيير">المزلق 1: إنشاء كائنات أثناء التصيير</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Creates a new object every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserCard</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserAvatar</span>
      <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">50</span>%&#x27;, <span class="hljs-attr">width:</span> <span class="hljs-attr">40</span> }} // <span class="hljs-attr">New</span> <span class="hljs-attr">object</span>!
    /&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Stable reference</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">AVATAR_STYLE</span> = { <span class="hljs-attr">borderRadius</span>: <span class="hljs-string">&#x27;50%&#x27;</span>, <span class="hljs-attr">width</span>: <span class="hljs-number">40</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserCard</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserAvatar</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{AVATAR_STYLE}</span> /&gt;</span></span>;
}
</code></pre>
<p>يُنشئ الإصدار الأول كائن <code>style</code> جديدًا عند كل عملية تصيير، فيظنّ <code>UserAvatar</code> أن خصائصه تغيّرت ويُعاد تصييره بلا داعٍ.</p>
<h3 id="المزلق-2-دوال-كخصائص">المزلق 2: دوال كخصائص</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ New function every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos }: { todos: Todo[] }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
          <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span>
          <span class="hljs-attr">onToggle</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleTodo(todo.id)} // New function!
        /&gt;
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Stable callback with useCallback</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos }: { todos: Todo[] }</span>) {
  <span class="hljs-keyword">const</span> handleToggle = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">todoId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-title function_">toggleTodo</span>(todoId);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span> <span class="hljs-attr">onToggle</span>=<span class="hljs-string">{()</span> =&gt;</span> handleToggle(todo.id)} /&gt;
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>في React 19، قد لا تحتاج إلى <code>useCallback</code> بالقدر نفسه بفضل React Compiler، الذي يستطيع حفظ الدوال تلقائيًا في الذاكرة (memoize) عندما يكون ذلك مفيدًا.</p>
</blockquote>
<h3 id="المزلق-3-تغير-الموضع-عند-التصيير-الشرطي">المزلق 3: تغيّر الموضع عند التصيير الشرطي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Component position changes based on condition</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ showSidebar }: { showSidebar: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {showSidebar &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Consistent component positions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ showSidebar }: { showSidebar: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> <span class="hljs-attr">visible</span>=<span class="hljs-string">{showSidebar}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>في المثال الأول، يتغيّر موضع <code>MainContent</code> في الشجرة عند تبديل <code>showSidebar</code>، وقد يُسبّب ذلك عمليات إعادة تصيير غير ضرورية. أما النهج الثاني فيُبقي المواضع ثابتة.</p>
<h2 id="التحسين-من-أجل-المطابقة">التحسين من أجل المطابقة</h2>
<p>إليك بعض الاستراتيجيات العملية لكتابة مكوّنات صديقة للمطابقة:</p>
<h3 id="استخدم-reactmemo-بحكمة">استخدم <code>React.memo()</code> بحكمة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Memo prevents re-renders when props haven&#x27;t changed</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveComponent</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params">{
  data,
  onUpdate,
}: {
  data: ComplexData;
  onUpdate: (id: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span>;
}</span>) {
  <span class="hljs-comment">// Expensive rendering logic here</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Complex UI */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
});
</code></pre>
<p>يُجري <code>React.memo()</code> مقارنة سطحية للخصائص ويتخطّى إعادة التصيير إن لم يتغيّر شيء. وهو مفيد بوجه خاص للمكوّنات التي تتلقّى خصائص ثابتة لكن منطق تصييرها مكلف.</p>
<h3 id="أنزل-الحالة-إلى-الأسفل">أنزل الحالة إلى الأسفل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ High-level state causes unnecessary re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span> {/* Re-renders when count changes */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{count}</span> <span class="hljs-attr">onIncrement</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount((c) =&gt; c + 1)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ State lives closer to where it&#x27;s needed</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span> {/* Stable now */}
      <span class="hljs-tag">&lt;<span class="hljs-name">CounterSection</span> /&gt;</span> {/* Count state lives here */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">CounterSection</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{count}</span> <span class="hljs-attr">onIncrement</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount((c) =&gt; c + 1)} /&gt;</span>;
}
</code></pre>
<p>نقل الحالة إلى موضع أقرب إلى استخدامها يقلّل عدد المكوّنات التي تحتاج إلى إعادة التصيير عند تغيّر تلك الحالة.</p>
<h3 id="افصل-الحالة-سريعة-التغير">افصل الحالة سريعة التغيّر</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Mouse position causes everything to re-render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [mousePos, setMousePos] = <span class="hljs-title function_">useState</span>({ <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> });
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMouseMove</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">MouseEvent</span></span>) =&gt; {
      <span class="hljs-title function_">setMousePos</span>({ <span class="hljs-attr">x</span>: e.<span class="hljs-property">clientX</span>, <span class="hljs-attr">y</span>: e.<span class="hljs-property">clientY</span> });
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;mousemove&#x27;</span>, handleMouseMove);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;mousemove&#x27;</span>, handleMouseMove);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span> {/* Re-renders constantly! */}
      <span class="hljs-tag">&lt;<span class="hljs-name">MouseTracker</span> <span class="hljs-attr">position</span>=<span class="hljs-string">{mousePos}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Isolate frequently-changing state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span> {/* Stable */}
      <span class="hljs-tag">&lt;<span class="hljs-name">MouseTrackerWrapper</span> /&gt;</span> {/* Mouse state isolated here */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>عزل الحالة سريعة التغيّر يمنعها من إحداث عمليات إعادة تصيير غير ضرورية في مكوّنات لا علاقة لها بها.</p>
<h2 id="تنقيح-مشكلات-المطابقة">تنقيح مشكلات المطابقة</h2>
<p>تقدّم React DevTools رؤى ممتازة في أداء المطابقة:</p>
<h3 id="تبويب-profiler">تبويب Profiler</h3>
<ol>
<li>افتح React DevTools</li>
<li>انتقل إلى تبويب «Profiler»</li>
<li>انقر «Record» وتفاعل مع تطبيقك</li>
<li>أوقف التسجيل لترى أيّ المكوّنات أُعيد تصييرها ولماذا</li>
</ol>
<p>ابحث عن:</p>
<ul>
<li><strong>عمليات إعادة تصيير غير متوقّعة</strong>: مكوّنات ما كان ينبغي أن تتحدّث</li>
<li><strong>عمليات تصيير مكلفة</strong>: مكوّنات تستغرق وقتًا طويلًا في التصيير</li>
<li><strong>تحديثات متسلسلة</strong>: تغيير واحد يُحدث تغييرات كثيرة أخرى</li>
</ul>
<h3 id="مكتبة-why-did-you-render">مكتبة Why Did You Render</h3>
<p>تستطيع مكتبة <a href="https://www.npmjs.com/package/@welldone-software/why-did-you-render"><code>@welldone-software/why-did-you-render</code></a> اكتشاف عمليات إعادة التصيير غير الضرورية تلقائيًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In development only</span>
<span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
  <span class="hljs-keyword">const</span> whyDidYouRender = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@welldone-software/why-did-you-render&#x27;</span>);
  <span class="hljs-title function_">whyDidYouRender</span>(<span class="hljs-title class_">React</span>);
}

<span class="hljs-comment">// Mark components to track</span>
<span class="hljs-title class_">MyComponent</span>.<span class="hljs-property">whyDidYouRender</span> = <span class="hljs-literal">true</span>;
</code></pre>
<p>سيسجّل هذا في الطرفية كلما أُعيد تصيير <code>MyComponent</code> بالخصائص نفسها، ما يساعدك على تحديد مواضع عدم الكفاءة في المطابقة.</p>
<h2 id="أنماط-أداء-من-الواقع-العملي">أنماط أداء من الواقع العملي</h2>
<p>إليك بعض الأنماط التي وجدتها فعّالة في تطبيقات React الإنتاجية:</p>
<h3 id="التمرير-الافتراضي-للقوائم-الكبيرة">التمرير الافتراضي للقوائم الكبيرة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Only render visible items</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeList</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">List</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">VirtualizedList</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, style }: { index: <span class="hljs-built_in">number</span>; style: React.CSSProperties }</span>) =&gt; (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ItemComponent</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{items[index]}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{600}</span> <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{items.length}</span> <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{50}</span>&gt;</span>
      {Row}
    <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span></span>
  );
}
</code></pre>
<p>يصيّر التمرير الافتراضي العناصر الظاهرة حاليًا فقط، فيبقى عمل المطابقة ثابتًا مهما كان حجم القائمة.</p>
<h3 id="المكونات-المركبة-لواجهات-معقدة">المكوّنات المركّبة لواجهات معقّدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Stable structure, flexible content</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataTable</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></span>;
}

<span class="hljs-title class_">DataTable</span>.<span class="hljs-property">Header</span> = <span class="hljs-keyword">function</span> <span class="hljs-title function_">TableHeader</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span></span>;
};

<span class="hljs-title class_">DataTable</span>.<span class="hljs-property">Body</span> = <span class="hljs-keyword">function</span> <span class="hljs-title function_">TableBody</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span></span>;
};

<span class="hljs-comment">// Usage maintains consistent tree structure</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserTable</span>(<span class="hljs-params">{ users }: { users: User[] }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DataTable</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DataTable.Header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Name<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>Email<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">DataTable.Header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DataTable.Body</span>&gt;</span>
        {users.map((user) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">DataTable.Body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">DataTable</span>&gt;</span></span>
  );
}
</code></pre>
<p>توفّر المكوّنات المركّبة بنية شجرة متّسقة مع إبقاء الواجهة البرمجية مرنة وصديقة للمطابقة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
