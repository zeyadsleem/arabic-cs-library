const s="kinney",a="react-typescript",n="React مع TypeScript",l="render-props-and-hoc-alternatives",p="خصائص التصيير وبدائل المكوّنات ذات الرتبة العليا",t=[{depth:2,id:"مشكلة-المكونات-ذات-الرتبة-العليا",text:"مشكلة المكوّنات ذات الرتبة العليا"},{depth:2,id:"خصائص-التصيير-البديل-الصديق-لـ-typescript",text:"خصائص التصيير: البديل الصديق لـ TypeScript"},{depth:2,id:"خصائص-تصيير-عامة-لأقصى-حد-من-المرونة",text:"خصائص تصيير عامة لأقصى حدّ من المرونة"},{depth:2,id:"الخطافات-المخصصة-البديل-الحديث",text:"الخُطّافات المخصّصة: البديل الحديث"},{depth:2,id:"المكونات-المركبة-مع-خصائص-التصيير",text:"المكوّنات المركّبة مع خصائص التصيير"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"متى-تستخدم-كل-نمط",text:"متى تستخدم كل نمط"},{depth:2,id:"حالات-استخدام-من-العالم-الحقيقي",text:"حالات استخدام من العالم الحقيقي™"},{depth:3,id:"إدارة-حقول-النماذج",text:"إدارة حقول النماذج"},{depth:3,id:"إدارة-حالة-واجهة-البرمجة-api",text:"إدارة حالة واجهة البرمجة (API)"},{depth:2,id:"الانتقال-من-المكونات-ذات-الرتبة-العليا",text:"الانتقال من المكوّنات ذات الرتبة العليا"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>كان يومًا ما المكوّنات ذات الرتبة العليا (Higher-Order Components) هي النمط المفضّل في React لمشاركة المنطق بين المكوّنات. لكن مع TypeScript قد تتحوّل إلى كابوس في التعامل مع الأنواع، وخصوصًا حين تحتاج إلى تمرير الخصائص عبر عدّة طبقات. هنا يأتي دور خصائص التصيير (render props) — وهو نمط يمنحك القدرة نفسها مع أمانٍ أفضل في الأنواع ودعمٍ أفضل بكثير لـ IntelliSense. سنستكشف لماذا تتفوّق خصائص التصيير غالبًا في عالم React + TypeScript الحديث، ونعرض لك بدائل عملية تُبقي شيفرتك مرنة وآمنة الأنواع في الوقت نفسه.</p>
<h2 id="مشكلة-المكونات-ذات-الرتبة-العليا">مشكلة المكوّنات ذات الرتبة العليا</h2>
<p>قبل أن نغوص في الحلول، لنفهم ما الذي نحاول حله. تغلّف المكوّنات ذات الرتبة العليا مكوّناتك لحقن الخصائص أو السلوك فيها، لكنها تأتي مع بعض نقاط الألم في TypeScript:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Classic HOC - typing gets messy fast</span>
<span class="hljs-keyword">function</span> withAuth&lt;P <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>&gt;(<span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P &amp; { <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> }&gt;) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AuthenticatedComponent</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">Omit</span>&lt;P, <span class="hljs-string">&#x27;user&#x27;</span>&gt;</span>) {
    <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useAuth</span>();
    <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoginForm</span> /&gt;</span></span>;
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span>;
  };
}

<span class="hljs-comment">// Using it requires type gymnastics</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProfilePage</span> = withAuth&lt;{ <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span> }&gt;(<span class="hljs-function">(<span class="hljs-params">{ user, title }</span>) =&gt;</span> {
  <span class="hljs-comment">// IntelliSense struggles here - it doesn&#x27;t know about &#x27;user&#x27;</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
      {title}: {user.name}
    <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  );
});
</code></pre>
<p>تصبح المشكلات أكثر وضوحًا حين تبدأ في تركيب المكوّنات ذات الرتبة العليا معًا، أو حين لا يستطيع TypeScript استنتاج الخصائص المحقونة استنتاجًا صحيحًا. يختلط الإكمال التلقائي في محرّرك، وتصبح رسائل الأخطاء ملتبسة، ويصبح إعادةُ الهيكلة عمليةً محفوفة بالمخاطر.</p>
<h2 id="خصائص-التصيير-البديل-الصديق-لـ-typescript">خصائص التصيير: البديل الصديق لـ TypeScript</h2>
<p>تنقلب خصائص التصيير المعادلة رأسًا على عقب. فبدلًا من تغليف مكوّنك، تمرّر دالةً تستقبل البيانات وتعيد JSX. يحبّ TypeScript هذا النمط لأن تدفّق البيانات فيه صريح، ولأن استنتاج الأنواع يعمل فيه بإتقان.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Render prop component with excellent TypeScript support</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthRenderProps</span> {
  <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AuthProviderProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">AuthRenderProps</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AuthProvider</span>(<span class="hljs-params">{ children, fallback }: <span class="hljs-title class_">AuthProviderProps</span></span>) {
  <span class="hljs-keyword">const</span> { user, isLoading, error } = <span class="hljs-title function_">useAuth</span>();

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!user &amp;&amp; fallback) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{fallback}<span class="hljs-tag">&lt;/&gt;</span></span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{children({ user, isLoading, error })}<span class="hljs-tag">&lt;/&gt;</span></span>;
}

<span class="hljs-comment">// Usage is clean and type-safe</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfilePage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AuthProvider</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">LoginForm</span> /&gt;</span>}&gt;
      {({ user }) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome, {user?.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
          {/* Full IntelliSense support - TypeScript knows user exists here */}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">AuthProvider</span>&gt;</span></span>
  );
}
</code></pre>
<p>ويحدث السحر في نوع خاصية <code>children</code>: <code>(props: AuthRenderProps) =&gt; React.ReactNode</code>. يعرف TypeScript تمامًا ما البيانات المتاحة داخل دالة التصيير، فيمنحك إكمالًا تلقائيًا مثاليًا وفحصًا دقيقًا للأخطاء.</p>
<h2 id="خصائص-تصيير-عامة-لأقصى-حد-من-المرونة">خصائص تصيير عامة لأقصى حدّ من المرونة</h2>
<p>عندما تحتاج إلى التعامل مع أنواع بيانات مختلفة، تجعل الأنواع العامة (generics) خصائص التصيير أقوى بكثير:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataFetcher</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">refetch</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FetchDataProps</span>&lt;T&gt; {
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">DataFetcher</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">FetchData</span>&lt;T&gt;({ url, children }: <span class="hljs-title class_">FetchDataProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;T | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> fetchData = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);
      <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch&#x27;</span>);
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-title function_">setData</span>(result);
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
    }
  }, [url]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchData</span>();
  }, [fetchData]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>{children({ data, loading, error, refetch: fetchData })}<span class="hljs-tag">&lt;/&gt;</span></span>;
}

<span class="hljs-comment">// Usage with different data types - TypeScript infers everything</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">return</span> (
    &lt;<span class="hljs-title class_">FetchData</span>&lt;<span class="hljs-title class_">User</span>&gt; url={<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>}&gt;
      {<span class="hljs-function">(<span class="hljs-params">{ data: user, loading, error, refetch }</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
        <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
        <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

        <span class="hljs-keyword">return</span> (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span> {/* TypeScript knows this is a User! */}
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{refetch}</span>&gt;</span>Refresh<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
      }}
    &lt;/<span class="hljs-title class_">FetchData</span>&gt;
  );
}
</code></pre>
<p>لاحظ كيف يستنتج TypeScript تلقائيًا أن <code>user</code> من نوع <code>User</code> داخل دالة التصيير. لا حاجة إلى تأكيدات أنواع يدوية.</p>
<h2 id="الخطافات-المخصصة-البديل-الحديث">الخُطّافات المخصّصة: البديل الحديث</h2>
<p>أحيانًا لا تحتاج إلى غلاف المكوّن أصلًا. تستطيع الخُطّافات المخصّصة أن توفّر مشاركة المنطق نفسها بصياغة أنظف بكثير:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useAuth</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">checkAuth</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/me&#x27;</span>);
        <span class="hljs-keyword">if</span> (response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">const</span> userData = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
          <span class="hljs-title function_">setUser</span>(userData);
        }
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Auth check failed&#x27;</span>);
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">checkAuth</span>();
  }, []);

  <span class="hljs-keyword">const</span> logout = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/logout&#x27;</span>, { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span> });
    <span class="hljs-title function_">setUser</span>(<span class="hljs-literal">null</span>);
  }, []);

  <span class="hljs-keyword">return</span> { user, isLoading, error, logout };
}

<span class="hljs-comment">// Usage is incredibly clean</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfilePage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { user, isLoading, error, logout } = <span class="hljs-title function_">useAuth</span>();

  <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoginForm</span> /&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{logout}</span>&gt;</span>Sign Out<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>تمنحك الخُطّافات المخصّصة أفضل ما في العالمين: منطقًا مشتركًا دون غلاف مكوّن، ودعمًا من TypeScript لا يُقدَّم له مثيل.</p>
<h2 id="المكونات-المركبة-مع-خصائص-التصيير">المكوّنات المركّبة مع خصائص التصيير</h2>
<p>لأنماط واجهة المستخدم الأكثر تعقيدًا، يمكنك الجمع بين خصائص التصيير والمكوّنات المركّبة لإنشاء واجهات مرنة وقابلة لإعادة الاستخدام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DropdownContextValue</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">toggle</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">close</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">selectedValue</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">select</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">DropdownContext</span> = <span class="hljs-title class_">React</span>.<span class="hljs-property">createContext</span>&lt;<span class="hljs-title class_">DropdownContextValue</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DropdownProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onSelect</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dropdown</span>(<span class="hljs-params">{ children, onSelect }: <span class="hljs-title class_">DropdownProps</span></span>) {
  <span class="hljs-keyword">const</span> [isOpen, setIsOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [selectedValue, setSelectedValue] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> toggle = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setIsOpen</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> !prev), []);
  <span class="hljs-keyword">const</span> close = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setIsOpen</span>(<span class="hljs-literal">false</span>), []);
  <span class="hljs-keyword">const</span> select = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-title function_">setSelectedValue</span>(value);
      onSelect?.(value);
      <span class="hljs-title function_">close</span>();
    },
    [onSelect, close],
  );

  <span class="hljs-keyword">const</span> <span class="hljs-attr">contextValue</span>: <span class="hljs-title class_">DropdownContextValue</span> = {
    isOpen,
    toggle,
    close,
    selectedValue,
    select,
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DropdownContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;relative&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">DropdownContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Render prop child component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DropdownListProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">context</span>: <span class="hljs-title class_">DropdownContextValue</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DropdownList</span>(<span class="hljs-params">{ children }: <span class="hljs-title class_">DropdownListProps</span></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">DropdownContext</span>);
  <span class="hljs-keyword">if</span> (!context) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;DropdownList must be used within Dropdown&#x27;</span>);
  }

  <span class="hljs-keyword">if</span> (!context.<span class="hljs-property">isOpen</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;absolute top-full left-0 rounded border bg-white shadow-lg&quot;</span>&gt;</span>
      {children(context)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage combines the best of both patterns</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserSelector</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dropdown</span> <span class="hljs-attr">onSelect</span>=<span class="hljs-string">{(userId)</span> =&gt;</span> console.log(&#x27;Selected:&#x27;, userId)}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Select User<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DropdownList</span>&gt;</span>
        {({ select, selectedValue }) =&gt; (
          &lt;FetchData&lt;User[]&gt; url=&quot;/api/users&quot;&gt;
            {({ data: users, loading }) =&gt; {
              if (loading) return <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2&quot;</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>;

              return (
                <span class="hljs-tag">&lt;&gt;</span>
                  {users?.map((user) =&gt; (
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                      <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span>
                      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> select(user.id.toString())}
                      className={\`block w-full p-2 text-left hover:bg-gray-100 \${
                        selectedValue === user.id.toString() ? &#x27;bg-blue-50&#x27; : &#x27;&#x27;
                      }\`}
                    &gt;
                      {user.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                  ))}
                <span class="hljs-tag">&lt;/&gt;</span>
              );
            }}
          <span class="hljs-tag">&lt;/<span class="hljs-name">FetchData</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">DropdownList</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Dropdown</span>&gt;</span></span>
  );
}
</code></pre>
<p>يمنحك هذا النمط أقصى قدر من المرونة مع الحفاظ على أمانٍ ممتاز في الأنواع. وتتلقّى خاصية التصيير السياق كاملًا بأنواعه الصحيحة، فتتمكّن من تركيب مصادر بيانات مختلفة بسهولة.</p>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>من المخاوف الشائعة مع خصائص التصيير الأداء. ولأنّك تنشئ دالةً جديدة في كل تصيير، قد يعيد React تصيير المكوّنات الفرعية دون داعٍ. وهذه بعض الاستراتيجيات لتحسين ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Memoize expensive render functions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> renderUsers = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params">{ data: users, loading }: <span class="hljs-title class_">DataFetcher</span>&lt;<span class="hljs-title class_">User</span>[]&gt;</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {users?.map((user) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveUserCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }, []);

  <span class="hljs-keyword">return</span> &lt;<span class="hljs-title class_">FetchData</span>&lt;<span class="hljs-title class_">User</span>[]&gt; url=<span class="hljs-string">&quot;/api/users&quot;</span>&gt;{renderUsers}&lt;/<span class="hljs-title class_">FetchData</span>&gt;;
}

<span class="hljs-comment">// ✅ Or use React.memo for the render prop component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MemoizedFetchData</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-title class_">FetchData</span>) <span class="hljs-keyword">as</span> <span class="hljs-keyword">typeof</span> <span class="hljs-title class_">FetchData</span>;
</code></pre>
<blockquote>
<p><strong>تلميح</strong></p>
<p>في معظم الحالات، يكون الأثر على الأداء ضئيلًا. قِس الأداء قبل أن تحسّنه، وتذكّر أن فوائد أمان الأنواع وتجربة المطوّر غالبًا ما تفوق تكاليف الأداء البسيطة.</p>
</blockquote>
<h2 id="متى-تستخدم-كل-نمط">متى تستخدم كل نمط</h2>
<p>إليك دليلًا عمليًا لاختيار النمط المناسب:</p>
<p><strong>استخدم الخُطّافات المخصّصة عندما:</strong></p>
<ul>
<li>تشارك منطقًا ذا حالة بين المكوّنات</li>
<li>لا يحتاج المنطق إلى التحكّم في التصيير</li>
<li>تريد أنظف صياغة ممكنة</li>
<li>تكون البيانات المشتركة بسيطة نسبيًا</li>
</ul>
<p><strong>استخدم خصائص التصيير عندما:</strong></p>
<ul>
<li>تحتاج إلى التحكّم في متى وكيف تُصيَّر المكوّنات الفرعية</li>
<li>تبني مكوّنات واجهة قابلة لإعادة الاستخدام</li>
<li>يحتاج المكوّن إلى معالجة حالات التحميل والأخطاء وما شابه</li>
<li>تريد تركيب عدة مصادر بيانات</li>
</ul>
<p><strong>استخدم المكوّنات المركّبة عندما:</strong></p>
<ul>
<li>تبني مكوّنات واجهة معقّدة ومتعدّدة الأجزاء</li>
<li>تحتاج إلى مشاركة الحالة بين مكوّنات فرعية متباعدة</li>
<li>تريد مرونة في الواجهة البرمجية (فيستطيع المستخدمون ترتيب الأجزاء بطرق مختلفة)</li>
<li>يتكوّن المكوّن من أجزاء متميّزة تعمل معًا</li>
</ul>
<p><strong>تجنّب المكوّنات ذات الرتبة العليا عندما:</strong></p>
<ul>
<li>تستخدم TypeScript (إلّا إن كنت تعرف حقًّا ما تفعل)</li>
<li>تحتاج إلى تركيب عدّة سلوكيات</li>
<li>يجب أن تكون خصائص المكوّن الملفوف شفافة للمستهلكين</li>
</ul>
<h2 id="حالات-استخدام-من-العالم-الحقيقي">حالات استخدام من العالم الحقيقي™</h2>
<p>إليك بعض السيناريوهات العملية التي تتألّق فيها هذه الأنماط:</p>
<h3 id="إدارة-حقول-النماذج">إدارة حقول النماذج</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FieldState</span>&lt;T&gt; {
  <span class="hljs-attr">value</span>: T;
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">touched</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">setValue</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">setTouched</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">validate</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldProps</span>&lt;T&gt; {
  <span class="hljs-attr">initialValue</span>: T;
  <span class="hljs-attr">validator</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">field</span>: <span class="hljs-title class_">FieldState</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">FormField</span>&lt;T&gt;({ initialValue, validator, children }: <span class="hljs-title class_">FormFieldProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [value, setValue] = useState&lt;T&gt;(initialValue);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [touched, setTouched] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> validate = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (validator) {
      <span class="hljs-keyword">const</span> validationError = <span class="hljs-title function_">validator</span>(value);
      <span class="hljs-title function_">setError</span>(validationError);
      <span class="hljs-keyword">return</span> !validationError;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }, [value, validator]);

  <span class="hljs-keyword">const</span> handleSetValue = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">newValue</span>: T</span>) =&gt;</span> {
      <span class="hljs-title function_">setValue</span>(newValue);
      <span class="hljs-keyword">if</span> (touched &amp;&amp; validator) {
        <span class="hljs-title function_">setError</span>(<span class="hljs-title function_">validator</span>(newValue));
      }
    },
    [touched, validator],
  );

  <span class="hljs-keyword">const</span> handleSetTouched = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setTouched</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">validate</span>();
  }, [validate]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      {children({
        value,
        error,
        touched,
        setValue: handleSetValue,
        setTouched: handleSetTouched,
        validate,
      })}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage with perfect type inference</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SignupForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      &lt;FormField<span class="hljs-tag">&lt;<span class="hljs-name">string</span>&gt;</span>
        initialValue=&quot;&quot;
        validator={(email) =&gt; (email.includes(&#x27;@&#x27;) ? null : &#x27;Please enter a valid email&#x27;)}
      &gt;
        {({ value, error, setValue, setTouched }) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
              <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
              <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
              <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setValue(e.target.value)}
              onBlur={setTouched}
              className={error ? &#x27;border-red-500&#x27; : &#x27;&#x27;}
            /&gt;
            {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-red-500&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">FormField</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
  );
}
</span></code></pre>
<h3 id="إدارة-حالة-واجهة-البرمجة-api">إدارة حالة واجهة البرمجة (API)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiState</span>&lt;T, E = <span class="hljs-built_in">unknown</span>&gt; {
  <span class="hljs-attr">data</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: E | <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">function</span> useApiState&lt;T, E = <span class="hljs-built_in">string</span>&gt;(
  <span class="hljs-attr">apiCall</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;,
): <span class="hljs-title class_">ApiState</span>&lt;T, E&gt; &amp; { <span class="hljs-attr">execute</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; } {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">ApiState</span>&lt;T, E&gt;&gt;({
    <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-keyword">const</span> execute = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-title function_">setState</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> }));

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> <span class="hljs-title function_">apiCall</span>();
      <span class="hljs-title function_">setState</span>({ data, <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-title function_">setState</span>({
        <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">error</span>: error <span class="hljs-keyword">as</span> E,
      });
    }
  }, [apiCall]);

  <span class="hljs-keyword">return</span> { ...state, execute };
}

<span class="hljs-comment">// Clean usage with excellent error handling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDashboard</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> userApi = <span class="hljs-title function_">useApiState</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt;),
  );

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    userApi.<span class="hljs-title function_">execute</span>();
  }, [userId, userApi.<span class="hljs-property">execute</span>]);

  <span class="hljs-keyword">if</span> (userApi.<span class="hljs-property">loading</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (userApi.<span class="hljs-property">error</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error loading user<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!userApi.<span class="hljs-property">data</span>) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{userApi.data}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="الانتقال-من-المكونات-ذات-الرتبة-العليا">الانتقال من المكوّنات ذات الرتبة العليا</h2>
<p>إذا كنت مضطرًا للاحتفاظ بمكوّنات رتبة عليا قائمة، فإليك استراتيجية انتقال تدريجي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Step 1: Create a render prop version alongside your HOC</span>
<span class="hljs-keyword">function</span> withAuthRenderProp&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>&gt;(<span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;T &amp; { <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> }&gt;) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AuthWrapper</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">Omit</span>&lt;T, <span class="hljs-string">&#x27;user&#x27;</span>&gt;</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AuthProvider</span>&gt;</span>
        {({ user }) =&gt; {
          if (!user) return <span class="hljs-tag">&lt;<span class="hljs-name">LoginForm</span> /&gt;</span>;
          return <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...</span>(<span class="hljs-attr">props</span> <span class="hljs-attr">as</span> <span class="hljs-attr">T</span>)} <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>;
        }}
      <span class="hljs-tag">&lt;/<span class="hljs-name">AuthProvider</span>&gt;</span></span>
    );
  };
}

<span class="hljs-comment">// Step 2: Gradually replace HOC usage with direct render props</span>
<span class="hljs-comment">// Old: const ProtectedPage = withAuth(MyPage);</span>
<span class="hljs-comment">// New: Direct usage of AuthProvider with render props</span>

<span class="hljs-comment">// Step 3: Eventually remove the HOC wrapper entirely</span>
</code></pre>
<p>يمكن أن يكون الانتقال تدريجيًا، فيتيح لك تحسين أمان الأنواع خطوةً بخطوة دون كسر الشيفرة القائمة.</p>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>تمثّل خصائص التصيير والخُطّافات المخصّصة الطريقة الحديثة لمشاركة المنطق في تطبيقات React مع TypeScript. فهي توفّر أمانًا أفضل في الأنواع وتدفّق بيانات أوضح وتجربة مطوّر أفضل بكثير مقارنةً بالمكوّنات ذات الرتبة العليا. ابدأ بتحديد المنطق المشترك في قاعدة شيفرتك الذي يمكن أن يستفيد من هذه الأنماط:</p>
<ol>
<li><strong>راجع مكوّنات الرتبة العليا</strong>: ابحث عن المكوّنات الصعبة في الأنواع أو التركيب</li>
<li><strong>استخرج خُطّافات مخصّصة</strong>: حوّل المنطق البسيط ذا الحالة إلى خُطّافات أولًا</li>
<li><strong>ابنِ مكوّنات بخصائص التصيير</strong>: لمنطق واجهة أكثر تعقيدًا يحتاج إلى التحكّم في التصيير</li>
<li><strong>امزج الأنماط</strong>: استخدم المكوّنات المركّبة مع خصائص التصيير لأقصى مرونة</li>
</ol>
<p>الهدف ليس إلغاء كل مكوّن ذي رتبة عليا بين ليلة وضحاها، بل أن تلجأ إلى هذه الأنماط عند بناء ميزات جديدة. وسيشكرك نفسك في المستقبل (وزملاؤك) على أمان الأنواع المحسّن والشيفرة الأنظف.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
