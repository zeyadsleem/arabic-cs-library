const s="kinney",a="react-performance",n="أداء React",l="derived-vs-stored-state",t="الحالة المشتقّة مقابل الحالة المخزّنة (Derived vs Stored State)",p=[{depth:2,id:"مشكلة-الإفراط-في-تخزين-الحالة",text:"مشكلة الإفراط في تخزين الحالة"},{depth:2,id:"الحل-الحالة-المشتقة",text:"الحل: الحالة المشتقّة"},{depth:2,id:"متى-تخزن-ومتى-تشتق",text:"متى تخزّن ومتى تشتقّ"},{depth:3,id:"خزن-الحالة-عندما",text:"خزّن الحالة عندما:"},{depth:3,id:"اشتق-الحالة-عندما",text:"اشتقّ الحالة عندما:"},{depth:2,id:"مثال-من-الواقع-إدارة-المستخدمين",text:"مثال من الواقع: إدارة المستخدمين"},{depth:2,id:"اعتبارات-الأداء-مع-usememo",text:"اعتبارات الأداء مع useMemo"},{depth:2,id:"أنماط-ومزالق-شائعة",text:"أنماط ومزالق شائعة"},{depth:3,id:"نمط-التحقق-من-النموذج",text:"نمط: التحقّق من النموذج"},{depth:3,id:"نمط-مضاد-تخزين-القيم-المحسوبة",text:"نمط مضاد: تخزين القيم المحسوبة"},{depth:3,id:"نمط-التصيير-الشرطي",text:"نمط: التصيير الشرطي"},{depth:2,id:"متقدم-خطافات-مخصصة-للحالة-المشتقة",text:"متقدّم: خُطّافات مخصّصة للحالة المشتقّة"},{depth:2,id:"مقايضات-الأداء",text:"مقايضات الأداء"},{depth:3,id:"اشتقاق-الحالة-المزايا-والعيوب",text:"اشتقاق الحالة (المزايا والعيوب)"},{depth:3,id:"تخزين-الحالة-المحسوبة-المزايا-والعيوب",text:"تخزين الحالة المحسوبة (المزايا والعيوب)"},{depth:2,id:"إرشادات-للتطبيقات-الواقعية",text:"إرشادات للتطبيقات الواقعية"}],e=`<p>غالبًا ما تبدو إدارة الحالة في React كموازنة بين «خزّن كل شيء» و«احسب كل شيء». لكن إليك الحقيقة — يميل معظم المطوّرين أكثر مما ينبغي إلى تخزين الحالة حين ينبغي لهم اشتقاقها. فعندما تخزّن حالة زائدة يمكن حسابها من قيم أخرى، فأنت تسجّل نفسك في أخطاء المزامنة، واستهلاك ذاكرة إضافي، وإعادات تصيير غير ضرورية. لنستكشف متى تخزّن الحالة ومتى تشتقّها، وكيف يمكن للاختيار الصحيح أن يحسّن أداء تطبيقك وموثوقيته جذريًا.</p>
<p>والقاعدة الذهبية؟ <strong>خزّن الحد الأدنى من الحالة اللازمة، ثم اشتقّ كل ما عداها.</strong> فكّر في الأمر كمخطط قاعدة بيانات محكم التصميم — تُطبّع بياناتك لإزالة التكرار، ثم تستخدم الاستعلامات (أو الحسابات في حالة React) للحصول على العروض التي تحتاجها.</p>
<h2 id="مشكلة-الإفراط-في-تخزين-الحالة">مشكلة الإفراط في تخزين الحالة</h2>
<p>لنبدأ بنمط مضاد شائع. تخيّل أنك تبني مكوّن سلة تسوّق يحتاج إلى عرض العناصر والسعر الإجمالي وعدد العناصر:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Storing too much state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ShoppingCart</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">CartItem</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [total, setTotal] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [itemCount, setItemCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addItem</span> = (<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-title class_">CartItem</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> newItems = [...items, item];
    <span class="hljs-title function_">setItems</span>(newItems);
    <span class="hljs-title function_">setTotal</span>(newItems.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, i</span>) =&gt;</span> sum + i.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>));
    <span class="hljs-title function_">setItemCount</span>(newItems.<span class="hljs-property">length</span>);
  };

  <span class="hljs-comment">// ... more methods that need to keep everything in sync</span>
}
</code></pre>
<p>لهذا النهج مشكلات عدة:</p>
<ol>
<li><strong>أخطاء المزامنة</strong>: إذا نسيت تحديث <code>total</code> أو <code>itemCount</code> في أي تابع، تصبح واجهتك غير متسقة</li>
<li><strong>إعادات تصيير إضافية</strong>: كل نداء <code>setState</code> يُطلق إعادة تصيير، فإضافة عنصر واحد تسبّب ثلاث إعادات تصيير</li>
<li><strong>حمل ذاكرة إضافي</strong>: تخزّن بيانات كان يمكن حسابها عند الطلب</li>
<li><strong>شيفرة هشّة</strong>: كلما أضفت قيمة محسوبة جديدة، تحتاج إلى تذكّر تحديثها في كل مكان</li>
</ol>
<h2 id="الحل-الحالة-المشتقة">الحل: الحالة المشتقّة</h2>
<p>إليك المكوّن نفسه باستخدام الحالة المشتقّة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Store minimal state, derive the rest</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ShoppingCart</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">CartItem</span>[]&gt;([]);

  <span class="hljs-comment">// Derive everything else from the single source of truth</span>
  <span class="hljs-keyword">const</span> total = items.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> itemCount = items.<span class="hljs-property">length</span>;

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addItem</span> = (<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-title class_">CartItem</span></span>) =&gt; {
    <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, item]);
    <span class="hljs-comment">// That&#x27;s it! No need to manually update derived values</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Items: {itemCount}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Total: \${total.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      {items.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">CartItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{item}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>الآن لديك مصدر حقيقة واحد (<code>items</code>)، وكل ما عداه يُحسب منه. لا أخطاء مزامنة، وإعادات تصيير أقل، وشيفرة أبسط بكثير في الصيانة.</p>
<h2 id="متى-تخزن-ومتى-تشتق">متى تخزّن ومتى تشتقّ</h2>
<p>إليك إطارًا عمليًا لاتخاذ القرار:</p>
<h3 id="خزن-الحالة-عندما">خزّن الحالة عندما:</h3>
<ul>
<li><strong>تكون مدخلًا من المستخدم</strong>: حقول النموذج، والمفاتيح، والاختيارات</li>
<li><strong>تُجلب من مصادر خارجية</strong>: استجابات API، وبيانات التخزين المحلي</li>
<li><strong>تمثّل قطعة مميزة من حالة التطبيق</strong>: المستخدم الحالي، والتبويب النشط، وفتح النافذة المنبثقة أو إغلاقها</li>
<li><strong>يكون حسابها مكلفًا</strong>: حسابات معقّدة تضرّ بالأداء لو نُفّذت في كل تصيير</li>
</ul>
<h3 id="اشتق-الحالة-عندما">اشتقّ الحالة عندما:</h3>
<ul>
<li><strong>يمكن حسابها من حالة موجودة</strong>: المجاميع، والأعداد، والقوائم المفلترة</li>
<li><strong>تكون تحويلًا لبيانات موجودة</strong>: تواريخ منسّقة، ونصوص بأحرف كبيرة، ونتائج تحقّق</li>
<li><strong>تكون شرطًا منطقيًا</strong>: «هل النموذج صالح؟»، «هل كل العناصر محدّدة؟»</li>
<li><strong>يكون الحساب رخيصًا</strong>: رياضيات بسيطة، وعمليات مصفوفات، ومعالجة نصوص</li>
</ul>
<h2 id="مثال-من-الواقع-إدارة-المستخدمين">مثال من الواقع: إدارة المستخدمين</h2>
<p>لننظر إلى مثال أكثر واقعية — واجهة إدارة مستخدمين تعرض المستخدمين مع الفلترة والترتيب:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span> | <span class="hljs-string">&#x27;guest&#x27;</span>;
  <span class="hljs-attr">lastLogin</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">isActive</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// ✅ Storing only what we need, deriving the rest</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserManagement</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Stored state - the minimal set we need</span>
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [searchQuery, setSearchQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [selectedRole, setSelectedRole] = useState&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;all&#x27;</span>);
  <span class="hljs-keyword">const</span> [sortBy, setSortBy] = useState&lt;keyof <span class="hljs-title class_">User</span>&gt;(<span class="hljs-string">&#x27;name&#x27;</span>);

  <span class="hljs-comment">// Derived state - computed from the stored state</span>
  <span class="hljs-keyword">const</span> filteredUsers = users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> matchesSearch =
      user.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchQuery.<span class="hljs-title function_">toLowerCase</span>()) ||
      user.<span class="hljs-property">email</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchQuery.<span class="hljs-title function_">toLowerCase</span>());
    <span class="hljs-keyword">const</span> matchesRole = selectedRole === <span class="hljs-string">&#x27;all&#x27;</span> || user.<span class="hljs-property">role</span> === selectedRole;
    <span class="hljs-keyword">return</span> matchesSearch &amp;&amp; matchesRole;
  });

  <span class="hljs-keyword">const</span> sortedUsers = [...filteredUsers].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> aValue = a[sortBy];
    <span class="hljs-keyword">const</span> bValue = b[sortBy];
    <span class="hljs-keyword">return</span> aValue &lt; bValue ? -<span class="hljs-number">1</span> : aValue &gt; bValue ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;
  });

  <span class="hljs-keyword">const</span> activeUserCount = users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">isActive</span>).<span class="hljs-property">length</span>;
  <span class="hljs-keyword">const</span> adminCount = users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">role</span> === <span class="hljs-string">&#x27;admin&#x27;</span>).<span class="hljs-property">length</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;stats&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Total Users: {users.length}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Active: {activeUserCount}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Admins: {adminCount}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Showing: {sortedUsers.length}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">SearchAndFilters</span>
        <span class="hljs-attr">searchQuery</span>=<span class="hljs-string">{searchQuery}</span>
        <span class="hljs-attr">onSearchChange</span>=<span class="hljs-string">{setSearchQuery}</span>
        <span class="hljs-attr">selectedRole</span>=<span class="hljs-string">{selectedRole}</span>
        <span class="hljs-attr">onRoleChange</span>=<span class="hljs-string">{setSelectedRole}</span>
        <span class="hljs-attr">sortBy</span>=<span class="hljs-string">{sortBy}</span>
        <span class="hljs-attr">onSortChange</span>=<span class="hljs-string">{setSortBy}</span>
      /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">UserList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{sortedUsers}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ أننا لا نخزّن إلا الحالة الجوهرية:</p>
<ul>
<li><code>users</code>: البيانات المصدر</li>
<li><code>searchQuery</code>: مدخل المستخدم للفلترة</li>
<li><code>selectedRole</code>: اختيار المستخدم للفلترة</li>
<li><code>sortBy</code>: تفضيل المستخدم للترتيب</li>
</ul>
<p>وكل ما عدا ذلك يُشتقّ في كل تصيير. وهذا يبقي مكوّننا بسيطًا ويزيل مشكلات المزامنة.</p>
<h2 id="اعتبارات-الأداء-مع-usememo">اعتبارات الأداء مع <code>useMemo</code></h2>
<p>قد تكون حسابات الحالة المشتقّة مكلفة أحيانًا. وهنا يأتي دور <code>useMemo</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserManagement</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [searchQuery, setSearchQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [selectedRole, setSelectedRole] = useState&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;all&#x27;</span>);

  <span class="hljs-comment">// Expensive filtering operation - memoize it</span>
  <span class="hljs-keyword">const</span> filteredUsers = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> {
      <span class="hljs-comment">// Imagine this involves complex logic or API calls</span>
      <span class="hljs-keyword">const</span> matchesSearch = <span class="hljs-title function_">performExpensiveSearchMatch</span>(user, searchQuery);
      <span class="hljs-keyword">const</span> matchesRole = selectedRole === <span class="hljs-string">&#x27;all&#x27;</span> || user.<span class="hljs-property">role</span> === selectedRole;
      <span class="hljs-keyword">return</span> matchesSearch &amp;&amp; matchesRole;
    });
  }, [users, searchQuery, selectedRole]);

  <span class="hljs-comment">// Cheap computation - no need to memoize</span>
  <span class="hljs-keyword">const</span> userCount = users.<span class="hljs-property">length</span>;
  <span class="hljs-keyword">const</span> activeCount = users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">isActive</span>).<span class="hljs-property">length</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        Filtered: {filteredUsers.length} of {userCount}
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Active: {activeCount}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      {/* ... */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لا تسارع إلى <code>useMemo</code>. قِس الأداء أولًا ثم حسّن. فمعظم الحسابات في تطبيقات React النموذجية سريعة بما يكفي للتنفيذ في كل تصيير.</p>
</blockquote>
<h2 id="أنماط-ومزالق-شائعة">أنماط ومزالق شائعة</h2>
<h3 id="نمط-التحقق-من-النموذج">نمط: التحقّق من النموذج</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Derive validation state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ContactForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [email, setEmail] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [message, setMessage] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// Derived validation state</span>
  <span class="hljs-keyword">const</span> isNameValid = name.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> isEmailValid = <span class="hljs-regexp">/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/</span>.<span class="hljs-title function_">test</span>(email);
  <span class="hljs-keyword">const</span> isMessageValid = message.<span class="hljs-property">length</span> &gt;= <span class="hljs-number">10</span>;
  <span class="hljs-keyword">const</span> isFormValid = isNameValid &amp;&amp; isEmailValid &amp;&amp; isMessageValid;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{name}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setName(e.target.value)}
        className={isNameValid ? &#x27;&#x27; : &#x27;error&#x27;}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{email}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setEmail(e.target.value)}
        className={isEmailValid ? &#x27;&#x27; : &#x27;error&#x27;}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{message}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setMessage(e.target.value)}
        className={isMessageValid ? &#x27;&#x27; : &#x27;error&#x27;}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!isFormValid}</span>&gt;</span>
        Send Message
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="نمط-مضاد-تخزين-القيم-المحسوبة">نمط مضاد: تخزين القيم المحسوبة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Storing what should be derived</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [products, setProducts] = useState&lt;<span class="hljs-title class_">Product</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [discountedProducts, setDiscountedProducts] = useState&lt;<span class="hljs-title class_">Product</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [totalValue, setTotalValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addProduct</span> = (<span class="hljs-params"><span class="hljs-attr">product</span>: <span class="hljs-title class_">Product</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> newProducts = [...products, product];
    <span class="hljs-title function_">setProducts</span>(newProducts);

    <span class="hljs-comment">// Now you have to remember to update these derived values!</span>
    <span class="hljs-title function_">setDiscountedProducts</span>(newProducts.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> p.<span class="hljs-property">discount</span> &gt; <span class="hljs-number">0</span>));
    <span class="hljs-title function_">setTotalValue</span>(newProducts.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, p</span>) =&gt;</span> sum + p.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>));
  };

  <span class="hljs-comment">// What happens if you forget to update derived state in removeProduct?</span>
  <span class="hljs-comment">// Your UI becomes inconsistent!</span>
}
</code></pre>
<h3 id="نمط-التصيير-الشرطي">نمط: التصيير الشرطي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Derive UI state</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">const</span> [notifications, setNotifications] = useState&lt;<span class="hljs-title class_">Notification</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [tasks, setTasks] = useState&lt;<span class="hljs-title class_">Task</span>[]&gt;([]);

  <span class="hljs-comment">// Derive UI state from stored data</span>
  <span class="hljs-keyword">const</span> hasUnreadNotifications = notifications.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">n</span>) =&gt;</span> !n.<span class="hljs-property">read</span>);
  <span class="hljs-keyword">const</span> overdueTasks = tasks.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">task</span>) =&gt;</span> task.<span class="hljs-property">dueDate</span> &lt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>() &amp;&amp; !task.<span class="hljs-property">completed</span>);
  <span class="hljs-keyword">const</span> showUrgentAlert = overdueTasks.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> greetingMessage = <span class="hljs-string">\`Good <span class="hljs-subst">\${getTimeOfDay()}</span>, <span class="hljs-subst">\${user.name}</span>!\`</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{greetingMessage}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">NotificationBell</span> <span class="hljs-attr">hasUnread</span>=<span class="hljs-string">{hasUnreadNotifications}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

      {showUrgentAlert &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Alert</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;warning&quot;</span>&gt;</span>You have {overdueTasks.length} overdue tasks!<span class="hljs-tag">&lt;/<span class="hljs-name">Alert</span>&gt;</span>
      )}

      {/* ... */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="متقدم-خطافات-مخصصة-للحالة-المشتقة">متقدّم: خُطّافات مخصّصة للحالة المشتقّة</h2>
<p>لمنطق الحالة المشتقّة المعقّد، فكّر في استخراجه إلى خُطّافات مخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useFilteredAndSortedData&lt;T&gt;(<span class="hljs-attr">data</span>: T[], <span class="hljs-attr">filterFn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">boolean</span>, <span class="hljs-attr">sortKey</span>: keyof T) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> filtered = data.<span class="hljs-title function_">filter</span>(filterFn);
    <span class="hljs-keyword">return</span> [...filtered].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> aVal = a[sortKey];
      <span class="hljs-keyword">const</span> bVal = b[sortKey];
      <span class="hljs-keyword">return</span> aVal &lt; bVal ? -<span class="hljs-number">1</span> : aVal &gt; bVal ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;
    });
  }, [data, filterFn, sortKey]);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCatalog</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [products, setProducts] = useState&lt;<span class="hljs-title class_">Product</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [category, setCategory] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;all&#x27;</span>);
  <span class="hljs-keyword">const</span> [sortBy, setSortBy] = useState&lt;keyof <span class="hljs-title class_">Product</span>&gt;(<span class="hljs-string">&#x27;name&#x27;</span>);

  <span class="hljs-keyword">const</span> filteredProducts = <span class="hljs-title function_">useFilteredAndSortedData</span>(
    products,
    <span class="hljs-function">(<span class="hljs-params">product</span>) =&gt;</span> category === <span class="hljs-string">&#x27;all&#x27;</span> || product.<span class="hljs-property">category</span> === category,
    sortBy,
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">CategoryFilter</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{category}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setCategory}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SortControls</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{sortBy}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSortBy}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{filteredProducts}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مقايضات-الأداء">مقايضات الأداء</h2>
<h3 id="اشتقاق-الحالة-المزايا-والعيوب">اشتقاق الحالة (المزايا والعيوب)</h3>
<p><strong>المزايا:</strong></p>
<ul>
<li>مصدر حقيقة واحد يزيل أخطاء المزامنة</li>
<li>تحديثات حالة أقل تعني إعادات تصيير أقل</li>
<li>استهلاك ذاكرة أقل</li>
<li>شيفرة أبسط وأكثر قابلية للصيانة</li>
</ul>
<p><strong>العيوب:</strong></p>
<ul>
<li>الحساب يحدث في كل تصيير</li>
<li>قد يكون مكلفًا في الحسابات المعقّدة</li>
<li>لا تحكّم في توقيت حدوث الحساب</li>
</ul>
<h3 id="تخزين-الحالة-المحسوبة-المزايا-والعيوب">تخزين الحالة المحسوبة (المزايا والعيوب)</h3>
<p><strong>المزايا:</strong></p>
<ul>
<li>تحكّم في توقيت تشغيل الحسابات المكلفة</li>
<li>يمكن تحسينه بتقنيات مثل تهدئة التكرار (debouncing)</li>
<li>وصول فوري إلى القيم المحسوبة</li>
</ul>
<p><strong>العيوب:</strong></p>
<ul>
<li>خطر أخطاء المزامنة</li>
<li>شيفرة أكثر تعقيدًا في الصيانة</li>
<li>استهلاك ذاكرة أعلى</li>
<li>إعادات تصيير أكثر بسبب تحديثات حالة متعددة</li>
</ul>
<h2 id="إرشادات-للتطبيقات-الواقعية">إرشادات للتطبيقات الواقعية</h2>
<ol>
<li><strong>ابدأ بالحالة المشتقّة افتراضيًا</strong>. ولا تنتقل إلى الحالة المخزّنة إلا عندما تواجه مشكلة أداء.</li>
<li><strong>قِس الأداء قبل التحسين</strong>. فمعظم الحسابات سريعة بما يكفي للتنفيذ في كل تصيير.</li>
<li><strong>استخدم <code>useMemo</code> للحسابات المكلفة</strong>، لكن لا تُكثر من استخدامه — فله حمل خاص به.</li>
<li><strong>ضع تجربة المستخدم في الحسبان</strong>. فقد يكون تأخّر حساب طفيف أفضل من خطأ مزامنة يعرض بيانات خاطئة.</li>
<li><strong>اختبر إدارة حالتك</strong>. اكتب اختبارات تتحقّق من بقاء قيمك المحسوبة متزامنة مع حالتك المخزّنة.</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
