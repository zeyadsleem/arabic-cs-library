const s="kinney",a="react-performance",n="أداء React",l="useactionstate-performance",t="أداء useActionState",p=[{depth:2,id:"الأسلوب-التقليدي-ولماذا-هو-مؤلم",text:"الأسلوب التقليدي (ولماذا هو مؤلم)"},{depth:2,id:"ظهور-useactionstate",text:"ظهور useActionState"},{depth:2,id:"مكاسب-الأداء",text:"مكاسب الأداء"},{depth:3,id:"تصيير-أقل-وتجربة-مستخدم-أفضل",text:"تصيير أقل وتجربة مستخدم أفضل"},{depth:3,id:"منع-حالات-التسابق-المدمج",text:"منع حالات التسابق المدمج"},{depth:3,id:"إمكانية-وصول-تلقائية",text:"إمكانية وصول تلقائية"},{depth:2,id:"أنماط-من-الواقع-العملي",text:"أنماط من الواقع العملي"},{depth:3,id:"التحسين-التدريجي-مع-إجراءات-الخادم",text:"التحسين التدريجي مع إجراءات الخادم"},{depth:3,id:"التحديثات-المتفائلة",text:"التحديثات المتفائلة"},{depth:3,id:"انتقالات-حالة-معقدة",text:"انتقالات حالة معقدة"},{depth:2,id:"أنماط-شائعة-وأفضل-الممارسات",text:"أنماط شائعة وأفضل الممارسات"},{depth:3,id:"أمان-الأنواع-مع-الاتحادات-المتمايزة",text:"أمان الأنواع مع الاتحادات المتمايزة"},{depth:3,id:"الدمج-مع-usetransition",text:"الدمج مع useTransition"},{depth:3,id:"اختبار-الإجراءات",text:"اختبار الإجراءات"},{depth:2,id:"استراتيجية-الترحيل",text:"استراتيجية الترحيل"},{depth:3,id:"الخطوة-1-تحديد-مكونات-الإجراءات",text:"الخطوة 1: تحديد مكوّنات الإجراءات"},{depth:3,id:"الخطوة-2-استخلاص-دوال-الإجراءات",text:"الخطوة 2: استخلاص دوال الإجراءات"},{depth:3,id:"الخطوة-3-استبدال-إدارة-الحالة",text:"الخطوة 3: استبدال إدارة الحالة"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"متى-تستخدم-useactionstate",text:"متى تستخدم useActionState"},{depth:3,id:"متى-تلتزم-بـ-usestate",text:"متى تلتزم بـ useState"},{depth:3,id:"الذاكرة-وحجم-الحزمة",text:"الذاكرة وحجم الحزمة"}],e=`<p>النماذج والطفرات (mutations) هي الموضع الذي تصبح فيه تطبيقات React تقليديًا بطيئة ومربكة. يحلّ خُطّاف <code>useActionState</code> في React 19 بأناقة مشكلة تنسيق إدارة حالات الانتظار والنجاح والخطأ مع الحفاظ على أداء مكوّناتك. فبدلًا من نداءات <code>useState</code> المتناثرة وأعلام التحميل اليدوية، تحصل على خُطّاف واحد يتولّى دورة حياة الطفرة كاملة — مع تحسينات مدمجة تمنع عمليات التصيير غير الضرورية وتقدّم تغذية راجعة واضحة لتجربة المستخدم.</p>
<p><code>useActionState</code> هو جواب React 19 على النمط الشائع لتغليف العمليات غير المتزامنة بحالات التحميل ومعالجة الأخطاء والتحديثات المتفائلة. فهو يستبدل الرقصة المطوّلة لخُطّافات <code>useState</code> المتعددة بواجهة برمجية ميسّرة تنسّق إجراءات الخادم وإرسالات النماذج والطفرات غير المتزامنة. اعتبره <code>useState</code> بقوى خارقة مصمَّمة خصيصًا للإجراءات التي تغيّر البيانات.</p>
<h2 id="الأسلوب-التقليدي-ولماذا-هو-مؤلم">الأسلوب التقليدي (ولماذا هو مؤلم)</h2>
<p>قبل الغوص في <code>useActionState</code>، لننظر إلى ما كنّا نفعله سابقًا. إليك النمط النموذجي لمعالجة إرسال نموذج مع حالتي التحميل والخطأ:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ The old way: verbose and error-prone</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span></span>) =&gt; {
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUser</span>(formData);
      <span class="hljs-title function_">setUser</span>(result);
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? err.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Something went wrong&#x27;</span>);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      {/* Form fields... */}
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isLoading}</span>&gt;</span>{isLoading ? &#x27;Creating...&#x27; : &#x27;Create User&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>لهذا الأسلوب عدة مشكلات:</p>
<ol>
<li><strong>تحديثات حالة متعددة</strong>: كل طفرة تُطلق 3-4 عمليات تصيير منفصلة</li>
<li><strong>كود متكرر في كل مكان</strong>: النمط نفسه للتحميل والخطأ مكرّر عبر المكوّنات</li>
<li><strong>حالات تسابق</strong>: يمكن للمستخدمين السريعين إطلاق إرسالات متعددة</li>
<li><strong>تجربة مستخدم غير متسقة</strong>: حالات تحميل مختلفة في أنحاء تطبيقك</li>
</ol>
<h2 id="ظهور-useactionstate">ظهور <code>useActionState</code></h2>
<p>يجمع <code>useActionState</code> هذا النمط كله في خُطّاف واحد يدير دورة حياة الإجراء كاملة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ The new way: clean and performant</span>
<span class="hljs-keyword">import</span> { useActionState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, formAction] = <span class="hljs-title function_">useActionState</span>(createUserAction, {
    <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Name&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Email&quot;</span> /&gt;</span>

      {state.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{state.pending}</span>&gt;</span>{state.pending ? &#x27;Creating...&#x27; : &#x27;Create User&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      {state.user &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome, {state.user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>والسحر يحدث في دالة الإجراء نفسها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createUserAction</span>(<span class="hljs-params">
  <span class="hljs-attr">prevState</span>: { user: User | <span class="hljs-literal">null</span>; error: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> },
  <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
</span>): <span class="hljs-title class_">Promise</span>&lt;{ <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> }&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUser</span>(formData);
    <span class="hljs-keyword">return</span> { user, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Failed to create user&#x27;</span>,
    };
  }
}
</code></pre>
<h2 id="مكاسب-الأداء">مكاسب الأداء</h2>
<h3 id="تصيير-أقل-وتجربة-مستخدم-أفضل">تصيير أقل وتجربة مستخدم أفضل</h3>
<p>يُطلق الأسلوب التقليدي عمليات تصيير متعددة لكل طفرة:</p>
<ol>
<li>ضبط التحميل على <code>true</code></li>
<li>مسح الأخطاء السابقة</li>
<li>التحديث بالنجاح أو الخطأ</li>
<li>ضبط التحميل على <code>false</code></li>
</ol>
<p>يجمع <code>useActionState</code> هذه التحديثات في دورة تصيير واحدة. يعرف React أن <code>state.pending</code> مُدارة تلقائيًا، فيستطيع تحسين متى وكم مرة يُعيد تصيير مكوّنك.</p>
<h3 id="منع-حالات-التسابق-المدمج">منع حالات التسابق المدمج</h3>
<p>عندما ينقر المستخدمون أزرار الإرسال بسرعة (فقد مرّ بها جميعًا)، يمنع <code>useActionState</code> تلقائيًا التنفيذ المتزامن للإجراء نفسه. لا مزيد من الشيفرة الدفاعية أو التهدئة المخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// This just works—no extra race condition handling needed</span>
<span class="hljs-keyword">const</span> [state, formAction] = <span class="hljs-title function_">useActionState</span>(slowNetworkAction, initialState);
</code></pre>
<h3 id="إمكانية-وصول-تلقائية">إمكانية وصول تلقائية</h3>
<p>يوفّر الخُطّاف ميزات إمكانية وصول مدمجة عبر حالة <code>pending</code>. يمكن لقارئات الشاشة الإعلان عن حالات التحميل، وتحصل عناصر التحكم في النماذج تلقائيًا على خصائص <code>aria-*</code> المناسبة:</p>
<pre><code class="language-typescript">&lt;button disabled={state.<span class="hljs-property">pending</span>} aria-busy={state.<span class="hljs-property">pending</span>}&gt;
  {state.<span class="hljs-property">pending</span> ? <span class="hljs-string">&#x27;Saving...&#x27;</span> : <span class="hljs-string">&#x27;Save Changes&#x27;</span>}
&lt;/button&gt;
</code></pre>
<h2 id="أنماط-من-الواقع-العملي">أنماط من الواقع العملي</h2>
<h3 id="التحسين-التدريجي-مع-إجراءات-الخادم">التحسين التدريجي مع إجراءات الخادم</h3>
<p>يعمل <code>useActionState</code> بشكل رائع مع مكوّنات خادم React وإجراءات الخادم، فيوفّر التحسين التدريجي جاهزًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server Action</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">updateProfileAction</span>(<span class="hljs-params">
  <span class="hljs-attr">prevState</span>: <span class="hljs-title class_">ProfileState</span>,
  <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ProfileState</span>&gt; {
  <span class="hljs-keyword">const</span> name = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;name&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">const</span> email = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;email&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;

  <span class="hljs-comment">// Server-side validation</span>
  <span class="hljs-keyword">if</span> (!name || !email) {
    <span class="hljs-keyword">return</span> {
      ...prevState,
      <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Name and email are required&#x27;</span>,
    };
  }

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> profile = <span class="hljs-keyword">await</span> <span class="hljs-title function_">updateProfile</span>({ name, email });
    <span class="hljs-title function_">revalidatePath</span>(<span class="hljs-string">&#x27;/profile&#x27;</span>); <span class="hljs-comment">// Update the cache</span>
    <span class="hljs-keyword">return</span> {
      profile,
      <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">success</span>: <span class="hljs-string">&#x27;Profile updated successfully!&#x27;</span>,
    };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> {
      ...prevState,
      <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Failed to update profile&#x27;</span>,
    };
  }
}

<span class="hljs-comment">// Client Component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfileForm</span>(<span class="hljs-params">{ initialProfile }: { initialProfile: Profile }</span>) {
  <span class="hljs-keyword">const</span> [state, formAction] = <span class="hljs-title function_">useActionState</span>(updateProfileAction, {
    <span class="hljs-attr">profile</span>: initialProfile,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">success</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span> <span class="hljs-attr">defaultValue</span>=<span class="hljs-string">{state.profile.name}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your name&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">defaultValue</span>=<span class="hljs-string">{state.profile.email}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;your.email@example.com&quot;</span> /&gt;</span>

      {state.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">ErrorMessage</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">ErrorMessage</span>&gt;</span>}
      {state.success &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">SuccessMessage</span>&gt;</span>{state.success}<span class="hljs-tag">&lt;/<span class="hljs-name">SuccessMessage</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{state.pending}</span>&gt;</span>{state.pending ? &#x27;Updating...&#x27; : &#x27;Update Profile&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تعمل إجراءات الخادم تلقائيًا دون JavaScript — وتظل نماذجك صالحة للعمل حتى لو فشل تحميل حزمة العميل.</p>
</blockquote>
<h3 id="التحديثات-المتفائلة">التحديثات المتفائلة</h3>
<p>بالنسبة إلى الإجراءات التي يُرجَّح نجاحها (مثل تبديل مفضَّلة أو زيادة عدّاد)، يمكنك تنفيذ التحديثات المتفائلة بتحديث حالتك المحلية فورًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">toggleFavoriteAction</span>(<span class="hljs-params">
  <span class="hljs-attr">prevState</span>: <span class="hljs-title class_">FavoriteState</span>,
  <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">FavoriteState</span>&gt; {
  <span class="hljs-keyword">const</span> postId = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;postId&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">const</span> currentlyFavorited = prevState.<span class="hljs-property">favorited</span>;

  <span class="hljs-comment">// Optimistic update - assume success</span>
  <span class="hljs-keyword">const</span> optimisticState = {
    ...prevState,
    <span class="hljs-attr">favorited</span>: !currentlyFavorited,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  };

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">toggleFavorite</span>(postId);
    <span class="hljs-keyword">return</span> optimisticState;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-comment">// Revert on failure</span>
    <span class="hljs-keyword">return</span> {
      ...prevState,
      <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Failed to update favorite&#x27;</span>,
    };
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">FavoriteButton</span>(<span class="hljs-params">{ postId, initialFavorited }: <span class="hljs-title class_">FavoriteProps</span></span>) {
  <span class="hljs-keyword">const</span> [state, formAction] = <span class="hljs-title function_">useActionState</span>(toggleFavoriteAction, {
    <span class="hljs-attr">favorited</span>: initialFavorited,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;postId&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{postId}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{state.pending}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{state.favorited</span> ? &#x27;<span class="hljs-attr">favorited</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">not-favorited</span>&#x27;}&gt;</span>
        {state.favorited ? &#x27;❤️&#x27; : &#x27;🤍&#x27;}
        {state.pending &amp;&amp; &#x27; (updating...)&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {state.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;error&quot;</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="انتقالات-حالة-معقدة">انتقالات حالة معقدة</h3>
<p>لسير عمل أكثر تطورًا، يمكن لإجرائك أن يُعيد حالة مفصّلة تقود حالات واجهة مختلفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">CheckoutState</span> = {
  <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;validating&#x27;</span> | <span class="hljs-string">&#x27;processing&#x27;</span> | <span class="hljs-string">&#x27;complete&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
  <span class="hljs-attr">order</span>: <span class="hljs-title class_">Order</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">validationErrors</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
};

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">processCheckoutAction</span>(<span class="hljs-params">
  <span class="hljs-attr">prevState</span>: <span class="hljs-title class_">CheckoutState</span>,
  <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span>,
</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">CheckoutState</span>&gt; {
  <span class="hljs-comment">// Validation step</span>
  <span class="hljs-keyword">const</span> validation = <span class="hljs-title function_">validateCheckoutForm</span>(formData);
  <span class="hljs-keyword">if</span> (!validation.<span class="hljs-property">success</span>) {
    <span class="hljs-keyword">return</span> {
      ...prevState,
      <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      <span class="hljs-attr">validationErrors</span>: validation.<span class="hljs-property">errors</span>,
    };
  }

  <span class="hljs-comment">// Processing step</span>
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> order = <span class="hljs-keyword">await</span> <span class="hljs-title function_">processPayment</span>(formData);
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;complete&#x27;</span>,
      order,
      <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">validationErrors</span>: {},
    };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> {
      ...prevState,
      <span class="hljs-attr">step</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Payment failed. Please try again.&#x27;</span>,
    };
  }
}
</code></pre>
<h2 id="أنماط-شائعة-وأفضل-الممارسات">أنماط شائعة وأفضل الممارسات</h2>
<h3 id="أمان-الأنواع-مع-الاتحادات-المتمايزة">أمان الأنواع مع الاتحادات المتمايزة</h3>
<p>هيكل حالة إجرائك كاتحاد متمايز (discriminated union) لأمان أنواع أفضل وانتقالات حالة أوضح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ActionState</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">User</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createUserAction</span>(<span class="hljs-params"><span class="hljs-attr">prevState</span>: <span class="hljs-title class_">ActionState</span>, <span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">ActionState</span>&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUser</span>(formData);
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, <span class="hljs-attr">data</span>: user };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>,
    };
  }
}
</code></pre>
<h3 id="الدمج-مع-usetransition">الدمج مع <code>useTransition</code></h3>
<p>للإجراءات التي لا تتضمن نماذج، ادمج <code>useActionState</code> مع <code>useTransition</code> لمزيد من التحكم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useActionState</span>(fetchUsersAction, {
    <span class="hljs-attr">users</span>: [],
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">refreshUsers</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">dispatch</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>()); <span class="hljs-comment">// Trigger the action</span>
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{refreshUsers}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending</span> || <span class="hljs-attr">state.pending</span>}&gt;</span>
        {isPending || state.pending ? &#x27;Refreshing...&#x27; : &#x27;Refresh Users&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      {state.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">ErrorMessage</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">ErrorMessage</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">UserTable</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{state.users}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تفرط في استخدام <code>useActionState</code> لتحديثات الحالة التزامنية البسيطة. التزم بـ <code>useState</code> العادي للحالة الخاصة بالعميل وحدها التي لا تتضمن عمليات غير متزامنة.</p>
</blockquote>
<h3 id="اختبار-الإجراءات">اختبار الإجراءات</h3>
<p>اختبار <code>useActionState</code> مباشر، لأن الإجراءات مجرّد دوال غير متزامنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { describe, it, expect, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;createUserAction&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return success state on valid input&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> mockCreateUser = vi.<span class="hljs-title function_">fn</span>().<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John&#x27;</span> });

    <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>();
    formData.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;John&#x27;</span>);
    formData.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-string">&#x27;john@example.com&#x27;</span>);

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUserAction</span>({ <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> }, formData);

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">user</span>).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John&#x27;</span> });
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">error</span>).<span class="hljs-title function_">toBeNull</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return error state on failure&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> mockCreateUser = vi.<span class="hljs-title function_">fn</span>().<span class="hljs-title function_">mockRejectedValue</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Network error&#x27;</span>));

    <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>();
    formData.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-string">&#x27;John&#x27;</span>);

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">createUserAction</span>({ <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> }, formData);

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">user</span>).<span class="hljs-title function_">toBeNull</span>();
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">error</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Network error&#x27;</span>);
  });
});
</code></pre>
<h2 id="استراتيجية-الترحيل">استراتيجية الترحيل</h2>
<p>يمكن الانتقال من الأنماط التقليدية إلى <code>useActionState</code> تدريجيًا:</p>
<h3 id="الخطوة-1-تحديد-مكونات-الإجراءات">الخطوة 1: تحديد مكوّنات الإجراءات</h3>
<p>ابحث عن المكوّنات ذات هذا النمط:</p>
<ul>
<li>نداءات <code>useState</code> متعددة للتحميل والخطأ والبيانات</li>
<li>دوال غير متزامنة تحدّث متغيّرات حالة متعددة</li>
<li>إرسالات نماذج مع حالات تحميل</li>
</ul>
<h3 id="الخطوة-2-استخلاص-دوال-الإجراءات">الخطوة 2: استخلاص دوال الإجراءات</h3>
<p>انقل منطقك غير المتزامن إلى دوال إجراءات مستقلة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params">data</span>) =&gt; {
  <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">createUser</span>(data);
    <span class="hljs-title function_">setUser</span>(result);
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-title function_">setError</span>(err.<span class="hljs-property">message</span>);
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
  }
};

<span class="hljs-comment">// After</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createUserAction</span>(<span class="hljs-params">prevState, formData</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">createUser</span>(formData);
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">user</span>: result, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> };
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span> };
  }
}
</code></pre>
<h3 id="الخطوة-3-استبدال-إدارة-الحالة">الخطوة 3: استبدال إدارة الحالة</h3>
<p>استبدل خُطّافات <code>useState</code> المتعددة بخُطّاف <code>useActionState</code> واحد:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before</span>
<span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
<span class="hljs-keyword">const</span> [error, setError] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// After</span>
<span class="hljs-keyword">const</span> [state, formAction] = <span class="hljs-title function_">useActionState</span>(createUserAction, {
  <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
});
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="متى-تستخدم-useactionstate">متى تستخدم <code>useActionState</code></h3>
<p>يبدع <code>useActionState</code> في:</p>
<ul>
<li><strong>إرسالات النماذج</strong> مع التحقق ومعالجة الأخطاء</li>
<li><strong>إجراءات الخادم</strong> التي تحتاج تحسينًا تدريجيًا</li>
<li><strong>الطفرات</strong> التي تؤثر في حالة الخادم</li>
<li><strong>الإجراءات</strong> ذات انتقالات الحالة المعقدة</li>
</ul>
<h3 id="متى-تلتزم-بـ-usestate">متى تلتزم بـ <code>useState</code></h3>
<p>أبقِ على استخدام <code>useState</code> من أجل:</p>
<ul>
<li><strong>التحديثات التزامنية البسيطة</strong> (تبديل عناصر الواجهة، تحديث حقول النماذج)</li>
<li><strong>الحالة الخاصة بالعميل</strong> التي لا تتضمن طلبات شبكة</li>
<li><strong>التحديثات عالية التكرار</strong> التي لا تستحق فيها كلفة الإجراء الزائدة</li>
</ul>
<h3 id="الذاكرة-وحجم-الحزمة">الذاكرة وحجم الحزمة</h3>
<p>يضيف <code>useActionState</code> كلفة زائدة ضئيلة — فهو في جوهره <code>useReducer</code> متخصص مع معالجة غير متزامنة مدمجة. وعادةً تفوق مكاسب الأداء الناتجة عن تقليل عمليات التصيير الزيادة الصغيرة في حجم الحزمة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
