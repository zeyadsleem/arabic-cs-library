const s="kinney",n="react-typescript",a="React مع TypeScript",l="strictness-options-for-react",p="خيارات الصرامة في React",t=[{depth:2,id:"النقطة-المثلى-خيارات-الصرامة-الأساسية",text:"النقطة المثلى: خيارات الصرامة الأساسية"},{depth:3,id:"strict-true-الأساس",text:"strict: true - الأساس"},{depth:3,id:"noimplicitany-true-توقف-عن-تخمين-الأنواع",text:"noImplicitAny: true - توقّف عن تخمين الأنواع"},{depth:3,id:"strictnullchecks-true-تبن-حالة-الـ-null",text:"strictNullChecks: true - تبنَّ حالة الـ null"},{depth:3,id:"noimplicitreturns-true-كل-مسار-يجب-أن-يعيد-قيمة",text:"noImplicitReturns: true - كل مسار يجب أن يُعيد قيمة"},{depth:3,id:"strictfunctiontypes-true-أمان-المعاملات",text:"strictFunctionTypes: true - أمان المعاملات"},{depth:2,id:"استراتيجية-التبني-التدريجي",text:"استراتيجية التبنّي التدريجي"},{depth:3,id:"الخطوة-1-ابدأ-بـ-noimplicitany",text:"الخطوة 1: ابدأ بـ noImplicitAny"},{depth:3,id:"الخطوة-2-أضف-strictnullchecks",text:"الخطوة 2: أضف strictNullChecks"},{depth:3,id:"الخطوة-3-أضف-الباقي-طبقة-فوق-طبقة",text:"الخطوة 3: أضف الباقي طبقة فوق طبقة"},{depth:2,id:"العقود-والحلول-في-العالم-الحقيقي",text:"العقود والحلول في العالم الحقيقي"},{depth:3,id:"فخ-الخاصية-الاختيارية",text:"فخّ الخاصية الاختيارية"},{depth:3,id:"رقصة-توقيع-معالج-الحدث",text:"رقصة توقيع معالِج الحدث"},{depth:3,id:"أنماط-تحميل-البيانات-غير-المتزامنة",text:"أنماط تحميل البيانات غير المتزامنة"},{depth:2,id:"ما-وراء-الأساسيات-خيارات-الصرامة-المتقدمة",text:"ما وراء الأساسيات: خيارات الصرامة المتقدّمة"},{depth:3,id:"exactoptionalpropertytypes-true",text:"exactOptionalPropertyTypes: true"},{depth:3,id:"nouncheckedindexedaccess-true",text:"noUncheckedIndexedAccess: true"},{depth:2,id:"تقييم-المقايضة",text:"تقييم المقايضة"},{depth:2,id:"اتخاذ-القرار",text:"اتخاذ القرار"}],e=`<p>الوضع الصارم في TypeScript لا يقتصر على إرضاء آلهة فحص الأنواع — إنه عن التقاط الأخطاء الدقيقة التي كانت ستبيد يوم ثلاثاء في الساعة الثالثة بعد الظهر لولاها. وحين تبني تطبيقات React، تتصرّف بعض خيارات الصرامة كأنها نظام إنذار مبكر من نوع أخطاء وقت التشغيل التي تجعل المستخدمين ينقرون بعيدًا ويجعل المهندسين يتساءلون عن خياراتهم في الحياة.</p>
<p>سنستكشف خيارات مُصرِّف TypeScript المحدّدة التي تمنحك أكبر عائد في مستودعات React، ونفهم لماذا تهمّ لثبات المكوّنات، ونرى أمثلة عملية على الأخطاء التي تمنعها. وفي النهاية، ستعرف أي الخيارات ينبغي تفعيلها أولًا وكيف تتبنّى إعدادات أكثر صرامة تدريجيًا من دون أن يتحوّل مستودعك إلى بحر من الخطوط المتعرّجة الحمراء الغاضبة.</p>
<h2 id="النقطة-المثلى-خيارات-الصرامة-الأساسية">النقطة المثلى: خيارات الصرامة الأساسية</h2>
<p>ليست جميع خيارات صرامة TypeScript متساوية. بعضها يلتقط أخطاء حرجة، وبعضها الآخر يبدو عملاً مملًا وإصرارًا على التفاصيل. وبالنسبة لتطبيقات React، تقدّم هذه الخيارات الأربعة أكبر قيمة:</p>
<h3 id="strict-true-الأساس"><code>strict: true</code> - الأساس</h3>
<p>الخيار النووي الذي يفعّل معظم فحوص الصرامة دفعة واحدة. لكن إليك المسألة — من المرجّح أنك ترغب في تفعيل الخيارات الفردية تدريجيًا بدلًا من قلب هذا المفتاح في مستودع قائم (ما لم تكن تستمتع بتصحيح 400 خطأ في TypeScript).</p>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا يفعّل عدة خيارات فرعية سنناقشها كلًا على حدة. للمشاريع الجديدة، ابدأ من هنا. أما القائمة منها، فواصل القراءة.</p>
<h3 id="noimplicitany-true-توقف-عن-تخمين-الأنواع"><code>noImplicitAny: true</code> - توقّف عن تخمين الأنواع</h3>
<p>هذا يمنع TypeScript من الرجوع إلى نوع <code>any</code> المرعب عندما لا يستطيع استنتاج ما قصدته. في عالم React، يلتقط هذا الخصائص التي ينبغي كتابتها بأنواع، ومعالِج الأحداث بلا توقيعات سليمة، وتلك الاستدعاءات الغامضة لـ <code>useState()</code>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Without noImplicitAny - compiles but risky</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }</span>) {
  <span class="hljs-comment">// user is implicitly &#x27;any&#x27; - no type safety</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ With noImplicitAny - forced to be explicit</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>العائد: ستلتقط الأخطاء الإملائية في أسماء الخصائص والخصائص الناقصة وتعارضات بنى البيانات قبل أن تصل إلى الإنتاج.</p>
<h3 id="strictnullchecks-true-تبن-حالة-الـ-null"><code>strictNullChecks: true</code> - تبنَّ حالة الـ null</h3>
<p>هذا الخيار يغيّر قواعد اللعبة في تطبيقات React. فهو يجعل TypeScript يميّز بين <code>T</code> و<code>T | null | undefined</code>، ويجبرك على التعامل مع حقيقة أن البيانات قد لا توجد.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Without strictNullChecks - runtime error waiting to happen</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">user</span>?: <span class="hljs-title class_">User</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// TypeScript thinks user.name is always safe</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ With strictNullChecks - forced to handle missing data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// Or use optional chaining</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome, {user?.name ?? &#x27;Guest&#x27;}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>يلتقط هذا الخيار أخطاء React أكثر من أي خيار آخر. فالخصائص الاختيارية واستجابات API التي قد تكون null والحالة غير المتزامنة — كلها تصبح أكثر أمانًا بكثير.</p>
</blockquote>
<h3 id="noimplicitreturns-true-كل-مسار-يجب-أن-يعيد-قيمة"><code>noImplicitReturns: true</code> - كل مسار يجب أن يُعيد قيمة</h3>
<p>ينبغي لمكوّنات React أن تُعيد JSX (أو <code>null</code>) دائمًا. يضمن هذا الخيار أن كل مسار شيفري في دوالك يُعيد شيئًا ما، ما يمنع أخطاء «undefined is not valid JSX» المحيّرة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Without noImplicitReturns - missing return in some branches</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalComponent</span>(<span class="hljs-params">{ shouldShow, data }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">if</span> (shouldShow) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
  <span class="hljs-comment">// Oops - no return here! Returns undefined at runtime</span>
}

<span class="hljs-comment">// ✅ With noImplicitReturns - all paths covered</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ConditionalComponent</span>(<span class="hljs-params">{ shouldShow, data }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">if</span> (shouldShow) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>; <span class="hljs-comment">// Explicit early return</span>
}
</code></pre>
<h3 id="strictfunctiontypes-true-أمان-المعاملات"><code>strictFunctionTypes: true</code> - أمان المعاملات</h3>
<p>يضمن هذا أن معاملات الدوال تُفحص بصرامة أكبر. وهو مفيد خصوصًا لمعالِج الأحداث وخصائص الاستدعاء (callback props) في React.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">onUserClick</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// ❌ Less strict - might accept incompatible functions</span>
<span class="hljs-comment">// Could accidentally pass a function expecting different params</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params">{ onUserClick }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MouseEvent</span></span>) =&gt; {
    <span class="hljs-comment">// Wrong signature but might compile without strictFunctionTypes</span>
    <span class="hljs-title function_">onUserClick</span>(event); <span class="hljs-comment">// Runtime error!</span>
  };
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// ✅ With strictFunctionTypes - catches parameter mismatches</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params">{ onUserClick }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>) =&gt; {
    <span class="hljs-title function_">onUserClick</span>(user); <span class="hljs-comment">// Type-safe</span>
  };
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<h2 id="استراتيجية-التبني-التدريجي">استراتيجية التبنّي التدريجي</h2>
<p>لا يلزم أن يكون تفعيل خيارات الصرامة في مستودع React قائم بالأمر المؤلم. إليك نهجًا مجرَّبًا:</p>
<h3 id="الخطوة-1-ابدأ-بـ-noimplicitany">الخطوة 1: ابدأ بـ <code>noImplicitAny</code></h3>
<p>عادةً ما يكون لهذا الخيار أعلى نسبة أخطاء إلى قيمة. معظم الأخطاء تتعلق بإضافة تعليقات أنواع صريحة — مملّة لكن مباشرة.</p>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;noImplicitAny&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أصلح الأخطاء بإضافة واجهات خصائص مناسبة، وكتابة أنواع استدعاءات <code>useState</code>، ووضع تعليقات على معالِج الأحداث:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before</span>
<span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>();

<span class="hljs-comment">// After</span>
<span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
</code></pre>
<h3 id="الخطوة-2-أضف-strictnullchecks">الخطوة 2: أضف <code>strictNullChecks</code></h3>
<p>هذا الخيار يتطلّب تفكيرًا أكثر لكنه يلتقط أكثر أخطاء وقت التشغيل. تعامل مع المكوّنات واحدًا تلو الآخر:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Common pattern: optional props become explicit</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">user</span>?: <span class="hljs-title class_">User</span>; <span class="hljs-comment">// Already nullable in the type</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ user }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-comment">// Now you must handle the undefined case</span>
  <span class="hljs-keyword">return</span> user ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserDetails</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span></span> : <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoginPrompt</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="الخطوة-3-أضف-الباقي-طبقة-فوق-طبقة">الخطوة 3: أضف الباقي طبقة فوق طبقة</h3>
<p>بعد أن يتصفّن الخياران، أضف <code>noImplicitReturns</code> و<code>strictFunctionTypes</code>. فهما يُنتجان عادةً أخطاء أقل لكنهما يلتقطان حالات حدّية دقيقة.</p>
<h2 id="العقود-والحلول-في-العالم-الحقيقي">العقود والحلول في العالم الحقيقي</h2>
<h3 id="فخ-الخاصية-الاختيارية">فخّ الخاصية الاختيارية</h3>
<p>أحد أكثر أخطاء <code>strictNullChecks</code> شيوعًا في React:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// ❌ Error: title might be undefined</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Header</span>(<span class="hljs-params">{ title }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title.toUpperCase()}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Handle the optional case</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Header</span>(<span class="hljs-params">{ title }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title?.toUpperCase() ?? &#x27;Untitled&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Or provide a default</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Header</span>(<span class="hljs-params">{ title = <span class="hljs-string">&#x27;Untitled&#x27;</span> }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{title.toUpperCase()}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}
</code></pre>
<h3 id="رقصة-توقيع-معالج-الحدث">رقصة توقيع معالِج الحدث</h3>
<p>قد تكون أنواع الدوال الصارمة عنيدة مع معالِج الأحداث:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">onChange</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// ❌ Might not match if function types aren&#x27;t strict</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Input</span>(<span class="hljs-params">{ onChange }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-comment">// onChange expects string, but we might pass the whole event</span>
    <span class="hljs-title function_">onChange</span>(e); <span class="hljs-comment">// Type error with strictFunctionTypes</span>
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Extract the value explicitly</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Input</span>(<span class="hljs-params">{ onChange }: <span class="hljs-title class_">Props</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChange</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ChangeEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-title function_">onChange</span>(e.<span class="hljs-property">target</span>.<span class="hljs-property">value</span>); <span class="hljs-comment">// Now matches the expected signature</span>
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="أنماط-تحميل-البيانات-غير-المتزامنة">أنماط تحميل البيانات غير المتزامنة</h3>
<p>يتألق <code>strictNullChecks</code> مع الحالة غير المتزامنة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useUser</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setUser)
      .<span class="hljs-title function_">catch</span>(setError)
      .<span class="hljs-title function_">finally</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>));
  }, [id]);

  <span class="hljs-keyword">return</span> { user, loading, error };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> { user, loading, error } = <span class="hljs-title function_">useUser</span>(userId);

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>; <span class="hljs-comment">// Required with strictNullChecks</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Welcome, {user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>; <span class="hljs-comment">// TypeScript knows user exists here</span>
}
</code></pre>
<h2 id="ما-وراء-الأساسيات-خيارات-الصرامة-المتقدمة">ما وراء الأساسيات: خيارات الصرامة المتقدّمة</h2>
<p>بعد أن ترتاح لإتقان الأساسيات، فكّر في خيارات المستخدم المتقدّم هذه:</p>
<h3 id="exactoptionalpropertytypes-true"><code>exactOptionalPropertyTypes: true</code></h3>
<p>يجعل الخصائص الاختيارية اختيارية حقًا — فلا يمكنك تعيينها صراحةً إلى <code>undefined</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// ❌ With exactOptionalPropertyTypes</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">props</span>: <span class="hljs-title class_">Props</span> = { <span class="hljs-attr">title</span>: <span class="hljs-literal">undefined</span> }; <span class="hljs-comment">// Error!</span>

<span class="hljs-comment">// ✅ Either include it or don&#x27;t</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">props</span>: <span class="hljs-title class_">Props</span> = { <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Hello&#x27;</span> }; <span class="hljs-comment">// OK</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">props</span>: <span class="hljs-title class_">Props</span> = {}; <span class="hljs-comment">// Also OK</span>
</code></pre>
<h3 id="nouncheckedindexedaccess-true"><code>noUncheckedIndexedAccess: true</code></h3>
<p>يجعل الوصول إلى عناصر المصفوفات والكائنات بمفاتيح أأمن:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> items = [<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-string">&#x27;c&#x27;</span>];

<span class="hljs-comment">// ❌ Without the option - assumes items[10] exists</span>
<span class="hljs-keyword">const</span> item = items[<span class="hljs-number">10</span>]; <span class="hljs-comment">// Type: string (but actually undefined!)</span>

<span class="hljs-comment">// ✅ With the option - acknowledges it might not exist</span>
<span class="hljs-keyword">const</span> item = items[<span class="hljs-number">10</span>]; <span class="hljs-comment">// Type: string | undefined</span>
<span class="hljs-keyword">if</span> (item) {
  <span class="hljs-comment">// Now you must check before using</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(item.<span class="hljs-title function_">toUpperCase</span>());
}
</code></pre>
<h2 id="تقييم-المقايضة">تقييم المقايضة</h2>
<p><strong>مزايا خيارات الصرامة:</strong></p>
<ul>
<li>التقاط أخطاء وقت التشغيل وقت التجميع</li>
<li>فرض التعامل الصريح مع الحالات الحدّية</li>
<li>دعم أفضل لمحرّرات الشيفرة وأمان إعادة الهيكلة</li>
<li>شيفرة توثّق نفسها (الأنواع تكشف النية)</li>
<li>تصحيح أسهل (أخطاء «undefined is not a function» أقلّ)</li>
</ul>
<p><strong>العيوب التي ينبغي قارنها:</strong></p>
<ul>
<li>جهد أولي للترحيل في المستودعات القائمة</li>
<li>شيفرة أكثر إسهابًا (في بعض الأحيان)</li>
<li>منحنى تعلّم لأعضاء الفريق الجدد على TypeScript الصارم</li>
<li>إيجابيات كاذبة عرضية في مواضع تعرف فيها أكثر من المُصرِّف</li>
</ul>
<p><strong>الأثر على الأداء:</strong> ضئيل وقت التشغيل — معظم الصرامة تخصّ وقت التجميع فقط. والتكلفة الأساسية هي سرعة التطوير أثناء التبنّي.</p>
<h2 id="اتخاذ-القرار">اتخاذ القرار</h2>
<p>ابدأ بـ <code>noImplicitAny</code> و<code>strictNullChecks</code> في أي مستودع React. فهاتان الخياران يلتقطان أكبر عدد من الأخطاء بجهد معقول. أضف الباقي تدريجيًا مع راحة فريقك.</p>
<p>للمشاريع الجديدة، فعّل <code>strict: true</code> من اليوم الأول. فعبء التطوير يسدّد نفسه خلال أسابيع.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم تعليقات <code>// @ts-expect-error</code> في الحالات النادرة التي تعرف فيها أنت أكثر من TypeScript، لكن أضف تعليقًا يشرح السبب.</p>
</blockquote>
<p>الهدف ليس صفاء الأنواع لذاته — بل هو تسليم تطبيقات React لا تنكسر عندما يتفاعل المستخدمون معها بطرق لم تتوقّعها. وخيارات TypeScript الصارمة هي خط دفاعك الأول أمام فوضى عالم وقت التشغيل.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
