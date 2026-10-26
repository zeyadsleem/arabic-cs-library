const s="kinney",a="react-typescript",n="React مع TypeScript",l="react-performance-with-typescript",p="أداء React مع TypeScript",t=[{depth:2,id:"المشكلة-الأداء-بالأمل",text:"المشكلة: الأداء بالأمل"},{depth:2,id:"الحل-1-حدود-memo-المبنية-على-الهوية",text:"الحلّ 1: حدود memo المبنيّة على الهوية"},{depth:2,id:"الحل-2-أنواع-المراجع-الثابتة",text:"الحلّ 2: أنواع المراجع الثابتة"},{depth:2,id:"الحل-3-عقود-البيانات-للقراءة-فقط",text:"الحلّ 3: عقود البيانات للقراءة فقط"},{depth:2,id:"الحل-4-أنواع-القيم-المحسوبة",text:"الحلّ 4: أنواع القيم المحسوبة"},{depth:2,id:"مراقبة-أداء-آمنة-الأنواع",text:"مراقبة أداء آمنة الأنواع"},{depth:2,id:"إنشاء-مراجع-ثابتة-بالأنواع",text:"إنشاء مراجع ثابتة بالأنواع"},{depth:3,id:"ثوابت-ومصانع-منمطة",text:"ثوابت ومصانع مُنمَّطة"},{depth:3,id:"أنماط-الاستدعاء-الآمنة-الأنواع",text:"أنماط الاستدعاء الآمنة الأنواع"},{depth:2,id:"محددات-منمطة-لإعادة-تصيير-دقيقة",text:"مُحدِّدات مُنمَّطة لإعادة تصيير دقيقة"},{depth:2,id:"مثال-من-العالم-الحقيقي-شبكة-بيانات-منمطة-للأداء",text:"مثال من العالم الحقيقي: شبكة بيانات مُنمَّطة للأداء"},{depth:2,id:"مفاضلات-الأداء-ومتى-تستخدم-هذه-الأنماط",text:"مفاضلات الأداء ومتى تستخدم هذه الأنماط"},{depth:2,id:"الأنماط-المضادة-الشائعة-وكيفية-إصلاحها",text:"الأنماط المضادة الشائعة (وكيفية إصلاحها)"},{depth:3,id:"النمط-المضاد-1-كائنات-الخصائص-المضمنة",text:"النمط المضاد 1: كائنات الخصائص المضمّنة"},{depth:3,id:"النمط-المضاد-2-اعتماديات-غير-ثابتة-في-التأثيرات",text:"النمط المضاد 2: اعتماديات غير ثابتة في التأثيرات"},{depth:3,id:"النمط-المضاد-3-التحسين-المبكر",text:"النمط المضاد 3: التحسين المبكّر"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>TypeScript ليس أداةً لالتقاط الأخطاء في وقت التجميع فحسب — بل هو أيضًا أداة قوية بشكل مفاجئ لترميز عقود الأداء في تطبيقات React لديك. وحين تستخدم الأنواع لجعل حدود الأداء صريحة، فإنّك تحوّل الأداء من تخمينٍ في وقت التشغيل إلى قرارٍ في وقت التصميم. وسنستكشف كيف يمكن للتحديد المدروس للأنواع أن يوجّه حدود memo ويمنع إعادة التصيير غير الضرورية، ويساعدك على بناء مكوّنات سريعة وقابلة للصيانة في آنٍ واحد، ويوفّر مراقبة أداء آمنة الأنواع.</p>
<p>والسرّ في هذا كلّه هو استخدام نظام أنواع TypeScript لجعل نوايا الأداء صريحة بدل أن تكون ضمنيّة. فبدلًا من تضييق أصابعك ورجاء أن يعمل React.memo كما هو متوقّع، يمكنك تصميم أنواع تجعل كسر تحسينات أداءك عن طريق الخطأ أمرًا مستحيلًا.</p>
<h2 id="المشكلة-الأداء-بالأمل">المشكلة: الأداء بالأمل</h2>
<p>لنبدأ بسيناريو شائع يبدو بريئًا لكنّه يخفي ألغامًا في الأداء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This looks fine but has hidden performance issues</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileProps</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">avatar</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">preferences</span>: {
      <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
      <span class="hljs-attr">notifications</span>: <span class="hljs-built_in">boolean</span>;
    };
  };
  <span class="hljs-attr">onUpdate</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserProfile</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ user, onUpdate }: <span class="hljs-title class_">UserProfileProps</span></span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{user.avatar}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{user.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onUpdate({ ...user, lastSeen: Date.now() })}&gt;Update Last Seen<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});
</code></pre>
<p>سينعاد تصيير هذا المكوّن في كل مرّة يُعاد فيها تصيير المكوّن الأب، رغم أنّنا لففناه بـ <code>React.memo</code>. ولماذا؟ لأنّ دالة <code>onUpdate</code> يُرجَّح أنّها تُنشأ من جديد في كل تصيير، ونوع <code>any</code> ذاك لا يساعدنا البتّة في فهم أي البيانات تهمّ هذا المكوّن فعلًا.</p>
<h2 id="الحل-1-حدود-memo-المبنية-على-الهوية">الحلّ 1: حدود memo المبنيّة على الهوية</h2>
<p>النمط الأول هو استخدام الأنواع لترميز الخصائص التي تهمّ التصيير فعلًا. فبدلًا من رجاء أن يكتشف <code>React.memo</code> ذلك بنفسه، نجعل عقد الأداء صريحًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Types that encode memo boundaries</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileData</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">avatar</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileActions</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">onUpdateLastSeen</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">UserProfileData</span>, <span class="hljs-title class_">UserProfileActions</span> {}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserProfile</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ id, name, avatar, onUpdateLastSeen }: <span class="hljs-title class_">UserProfileProps</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{avatar}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{name}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onUpdateLastSeen(id)}&gt;Update Last Seen<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// Only the data props matter for rendering</span>
    <span class="hljs-keyword">return</span> (
      prevProps.<span class="hljs-property">id</span> === nextProps.<span class="hljs-property">id</span> &amp;&amp;
      prevProps.<span class="hljs-property">name</span> === nextProps.<span class="hljs-property">name</span> &amp;&amp;
      prevProps.<span class="hljs-property">avatar</span> === nextProps.<span class="hljs-property">avatar</span>
    );
  },
);
</code></pre>
<p>لقد فصلنا الآن بياناتنا عن أفعالنا، وجعلنا واضحًا الخصائص التي تؤثّر فعليًا في التصيير. وتشير مُعدِّلات <code>readonly</code> إلى أنّ هذه القيم لا ينبغي أن تتغيّر بصورة غير متوقّعة، ودالة المقارنة المخصّصة لدينا لا تفحص إلّا الخصائص المهمة للتصيير.</p>
<blockquote>
<p><strong>تلميح</strong></p>
<p>استخدم واجهات منفصلة للبيانات والأفعال. خصائص البيانات تؤثّر في التصيير؛ أمّا خصائص الأفعال فعادةً لا تؤثّر (بافتراض أنّها مراجع ثابتة).</p>
</blockquote>
<h2 id="الحل-2-أنواع-المراجع-الثابتة">الحلّ 2: أنواع المراجع الثابتة</h2>
<p>إليك نمطًا وجدتُه بالغ الفائدة: ترميز ثبات المرجع مباشرةً في نظام الأنواع.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Types that enforce stable references</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">StableCallback</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[], R&gt; = {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">_brand</span>: <span class="hljs-string">&#x27;stable&#x27;</span>;
} &amp; (<span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: T</span>) =&gt;</span> R);

<span class="hljs-comment">// Type-level function to mark callbacks as stable</span>
<span class="hljs-keyword">function</span> useStableCallback&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">any</span>[], R&gt;(
  <span class="hljs-attr">callback</span>: <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: T</span>) =&gt;</span> R,
  <span class="hljs-attr">deps</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">DependencyList</span>,
): <span class="hljs-title class_">StableCallback</span>&lt;T, R&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useCallback</span>(callback, deps) <span class="hljs-keyword">as</span> <span class="hljs-title class_">StableCallback</span>&lt;T, R&gt;;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserListProps</span> {
  <span class="hljs-attr">users</span>: <span class="hljs-keyword">readonly</span> <span class="hljs-title class_">UserProfileData</span>[];
  <span class="hljs-attr">onUserUpdate</span>: <span class="hljs-title class_">StableCallback</span>&lt;[<span class="hljs-built_in">string</span>], <span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">onUserDelete</span>: <span class="hljs-title class_">StableCallback</span>&lt;[<span class="hljs-built_in">string</span>], <span class="hljs-built_in">void</span>&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserList</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ users, onUserUpdate, onUserDelete }: <span class="hljs-title class_">UserListProps</span></span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {users.map((user) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span> {<span class="hljs-attr">...user</span>} <span class="hljs-attr">onUpdateLastSeen</span>=<span class="hljs-string">{onUserUpdate}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});

<span class="hljs-comment">// Usage in parent component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">UserProfileData</span>[]&gt;([]);

  <span class="hljs-comment">// TypeScript enforces that we use useStableCallback</span>
  <span class="hljs-keyword">const</span> handleUserUpdate = <span class="hljs-title function_">useStableCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-comment">// Update logic here</span>
    <span class="hljs-title function_">setUsers</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> (user.<span class="hljs-property">id</span> === userId ? { ...user, <span class="hljs-attr">lastSeen</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() } : user)),
    );
  }, []);

  <span class="hljs-keyword">const</span> handleUserDelete = <span class="hljs-title function_">useStableCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setUsers</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">id</span> !== userId));
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{users}</span> <span class="hljs-attr">onUserUpdate</span>=<span class="hljs-string">{handleUserUpdate}</span> <span class="hljs-attr">onUserDelete</span>=<span class="hljs-string">{handleUserDelete}</span> /&gt;</span></span>;
}
</code></pre>
<p>نوع <code>StableCallback</code> يعمل كعقدٍ في وقت التجميع: أي دالة موسومة بهذا النوع تَعِد بمرجع ثابت. ولا يمكنك تمرير دالة غير ثابتة عن طريق الخطأ من دون أن يشتكي TypeScript.</p>
<h2 id="الحل-3-عقود-البيانات-للقراءة-فقط">الحلّ 3: عقود البيانات للقراءة فقط</h2>
<p>من أكبر مصادر مشكلات الأداء هو التعديل العَرَضي على بيانات ينبغي أن تكون غير قابلة للتغيير. يمكن لمُعدِّلات <code>readonly</code> في TypeScript أن تساعد، لكنّنا يمكننا أن نذهب أبعد من ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Deep readonly types for performance contracts</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">DeepReadonly</span>&lt;T&gt; = {
  <span class="hljs-keyword">readonly</span> [P <span class="hljs-keyword">in</span> keyof T]: T[P] <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span> ? <span class="hljs-title class_">DeepReadonly</span>&lt;T[P]&gt; : T[P];
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserState</span> {
  <span class="hljs-attr">users</span>: <span class="hljs-title class_">User</span>[];
  <span class="hljs-attr">filters</span>: {
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;inactive&#x27;</span>;
    <span class="hljs-attr">department</span>: <span class="hljs-built_in">string</span>[];
  };
}

<span class="hljs-comment">// This prevents any accidental mutations</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">ReadonlyUserState</span> = <span class="hljs-title class_">DeepReadonly</span>&lt;<span class="hljs-title class_">UserState</span>&gt;;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserTableProps</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">ReadonlyUserState</span>;
  <span class="hljs-attr">onDataChange</span>: <span class="hljs-title class_">StableCallback</span>&lt;[<span class="hljs-title class_">ReadonlyUserState</span>], <span class="hljs-built_in">void</span>&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserTable</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ data, onDataChange }: <span class="hljs-title class_">UserTableProps</span></span>) =&gt;</span> {
  <span class="hljs-comment">// TypeScript prevents us from accidentally mutating data</span>
  <span class="hljs-comment">// data.users.push(newUser); // ❌ Compile error!</span>

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleAddUser</span> = (<span class="hljs-params"><span class="hljs-attr">newUser</span>: <span class="hljs-title class_">User</span></span>) =&gt; {
    <span class="hljs-comment">// We&#x27;re forced to create new objects, which is memo-friendly</span>
    <span class="hljs-title function_">onDataChange</span>({
      ...data,
      <span class="hljs-attr">users</span>: [...data.<span class="hljs-property">users</span>, newUser],
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="hljs-comment">// Table implementation</span>
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>{/* Table rows */}<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></span>
  );
});
</code></pre>
<p>باستخدام <code>DeepReadonly</code> نجعل عدم القابلية للتغيير عقدًا في وقت التجميع بدل أن يكون أملًا في وقت التشغيل. وهذا يمنع خلل الأداء الكلاسيكي الذي يغيّر فيه أحدهم خاصية (prop) عن طريق الخطأ فيسبّب إعادة تصيير غير ضرورية.</p>
<h2 id="الحل-4-أنواع-القيم-المحسوبة">الحلّ 4: أنواع القيم المحسوبة</h2>
<p>أحيانًا تريد تمرير بيانات مشتقّة إلى المكوّنات، لكنّك تريد التأكّد من أنّ هذا الاشتقاق مُخزَّن مؤقتًا. وإليك نمطًا لترميز ذلك العقد في الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Types for memoized computations</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">MemoizedValue</span>&lt;T&gt; = {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">_memoized</span>: <span class="hljs-literal">true</span>;
} &amp; T;

<span class="hljs-keyword">function</span> useMemoizedValue&lt;T&gt;(<span class="hljs-attr">factory</span>: <span class="hljs-function">() =&gt;</span> T, <span class="hljs-attr">deps</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">DependencyList</span>): <span class="hljs-title class_">MemoizedValue</span>&lt;T&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useMemo</span>(factory, deps) <span class="hljs-keyword">as</span> <span class="hljs-title class_">MemoizedValue</span>&lt;T&gt;;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserStatsProps</span> {
  <span class="hljs-attr">stats</span>: <span class="hljs-title class_">MemoizedValue</span>&lt;{
    <span class="hljs-attr">totalUsers</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">activeUsers</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">inactiveUsers</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">averageAge</span>: <span class="hljs-built_in">number</span>;
  }&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserStats</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ stats }: <span class="hljs-title class_">UserStatsProps</span></span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;stats-grid&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Total: {stats.totalUsers}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Active: {stats.activeUsers}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Inactive: {stats.inactiveUsers}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Avg Age: {Math.round(stats.averageAge)}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDashboard</span>(<span class="hljs-params">{ users }: { users: User[] }</span>) {
  <span class="hljs-keyword">const</span> stats = <span class="hljs-title function_">useMemoizedValue</span>(
    <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">totalUsers</span>: users.<span class="hljs-property">length</span>,
      <span class="hljs-attr">activeUsers</span>: users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;active&#x27;</span>).<span class="hljs-property">length</span>,
      <span class="hljs-attr">inactiveUsers</span>: users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">u</span>) =&gt;</span> u.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;inactive&#x27;</span>).<span class="hljs-property">length</span>,
      <span class="hljs-attr">averageAge</span>: users.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, u</span>) =&gt;</span> sum + u.<span class="hljs-property">age</span>, <span class="hljs-number">0</span>) / users.<span class="hljs-property">length</span> || <span class="hljs-number">0</span>,
    }),
    [users],
  );

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserStats</span> <span class="hljs-attr">stats</span>=<span class="hljs-string">{stats}</span> /&gt;</span></span>;
}
</code></pre>
<p>يضمن نوع <code>MemoizedValue</code> أن تكون أي قيم محسوبة مكلفة قد خُزِّنت مؤقتًا على نحو صحيح قبل تمريرها إلى المكوّنات. وإذا حاول أحدهم تمرير قيمة محسوبة غير مخزَّنة مؤقتًا، فسيكتشف TypeScript ذلك.</p>
<h2 id="مراقبة-أداء-آمنة-الأنواع">مراقبة أداء آمنة الأنواع</h2>
<p>يمكنك إنشاء مراقبة أداء آمنة الأنواع لالتقاط حالات التراجع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Typed performance monitoring hook</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceMetrics</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">updateCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">lastUpdate</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePerformanceMonitor</span>(<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">PerformanceMetrics</span> {
  <span class="hljs-keyword">const</span> renderCountRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> lastRenderTimeRef = <span class="hljs-title function_">useRef</span>(performance.<span class="hljs-title function_">now</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    renderCountRef.<span class="hljs-property">current</span> += <span class="hljs-number">1</span>;
    <span class="hljs-keyword">const</span> now = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> renderTime = now - lastRenderTimeRef.<span class="hljs-property">current</span>;

    <span class="hljs-keyword">if</span> (renderTime &gt; <span class="hljs-number">16</span>) {
      <span class="hljs-comment">// Slower than 60fps</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(
        <span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span> render took <span class="hljs-subst">\${renderTime.toFixed(<span class="hljs-number">2</span>)}</span>ms \`</span> +
          <span class="hljs-string">\`(render #<span class="hljs-subst">\${renderCountRef.current}</span>)\`</span>,
      );
    }

    lastRenderTimeRef.<span class="hljs-property">current</span> = now;
  });

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">renderTime</span>: performance.<span class="hljs-title function_">now</span>() - lastRenderTimeRef.<span class="hljs-property">current</span>,
    <span class="hljs-attr">updateCount</span>: renderCountRef.<span class="hljs-property">current</span>,
    <span class="hljs-attr">lastUpdate</span>: lastRenderTimeRef.<span class="hljs-property">current</span>,
  };
}

<span class="hljs-comment">// ✅ Usage in components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params">{ data }: { data: ComplexData[] }</span>) {
  <span class="hljs-keyword">const</span> metrics = <span class="hljs-title function_">usePerformanceMonitor</span>(<span class="hljs-string">&#x27;ExpensiveComponent&#x27;</span>);

  <span class="hljs-comment">// Your component logic...</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {/* Your UI */}
      {process.env.NODE_ENV === &#x27;development&#x27; &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">fontSize:</span> &#x27;<span class="hljs-attr">10px</span>&#x27;, <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">gray</span>&#x27; }}&gt;</span>
          Renders: {metrics.updateCount}, Last: {metrics.renderTime.toFixed(1)}ms
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="إنشاء-مراجع-ثابتة-بالأنواع">إنشاء مراجع ثابتة بالأنواع</h2>
<p>الخطوة الأولى نحو الأداء هي ضمان استقرار المراجع. ويمكن لـ TypeScript أن يساعدنا في التقاط الأنماط غير المستقرة قبل أن تتحوّل إلى مشكلات أداء.</p>
<h3 id="ثوابت-ومصانع-منمطة">ثوابت ومصانع مُنمَّطة</h3>
<p>بدلًا من إنشاء الكائنات داخل المكوّن، أنشئها خارج المكوّن أو استخدم تخزينًا مؤقتًا (memoization) على نحو صحيح:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Stable reference - created once</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">DEFAULT_SETTINGS</span> = {
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
  <span class="hljs-attr">notifications</span>: <span class="hljs-literal">true</span>,
} <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-comment">// ✅ Or use a factory with proper typing</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">CreateSettingsOptions</span> = {
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  <span class="hljs-attr">notifications</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">createUserSettings</span> = (<span class="hljs-params"><span class="hljs-attr">options</span>: <span class="hljs-title class_">CreateSettingsOptions</span></span>) =&gt; ({
  ...<span class="hljs-variable constant_">DEFAULT_SETTINGS</span>,
  ...options,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);

  <span class="hljs-comment">// ✅ Memoized with proper dependency tracking</span>
  <span class="hljs-keyword">const</span> userSettings = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">createUserSettings</span>({ <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span>, <span class="hljs-attr">notifications</span>: <span class="hljs-literal">true</span> }),
    [], <span class="hljs-comment">// No dependencies = stable reference</span>
  );

  <span class="hljs-comment">// ✅ Stable callback with useCallback</span>
  <span class="hljs-keyword">const</span> handleSettingsChange = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">key</span>: keyof <span class="hljs-title class_">CreateSettingsOptions</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">boolean</span></span>) =&gt;</span> {
    <span class="hljs-comment">// Update settings logic</span>
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span>
      <span class="hljs-attr">user</span>=<span class="hljs-string">{users.find((u)</span> =&gt;</span> u.id === userId)}
      settings={userSettings}
      onSettingsChange={handleSettingsChange}
    /&gt;</span>
  );
}
</code></pre>
<h3 id="أنماط-الاستدعاء-الآمنة-الأنواع">أنماط الاستدعاء الآمنة الأنواع</h3>
<p>أحد الأنماط الشائعة هو إنشاء مصانع استدعاء (callback factories) مُنمَّطة لضمان استقرار المراجع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">CallbackFactory</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;&gt; = {
  [K <span class="hljs-keyword">in</span> keyof T]: T[K] <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: infer <span class="hljs-title class_">Args</span>) =&gt; infer <span class="hljs-title class_">Return</span>
    ? <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-title class_">Args</span></span>) =&gt;</span> <span class="hljs-title class_">Return</span>
    : <span class="hljs-built_in">never</span>;
};

<span class="hljs-keyword">const</span> createStableCallbacks = &lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Function</span>&gt;&gt;(
  <span class="hljs-attr">callbacks</span>: T,
  <span class="hljs-attr">deps</span>: <span class="hljs-keyword">readonly</span> <span class="hljs-built_in">unknown</span>[],
): <span class="hljs-title class_">CallbackFactory</span>&lt;T&gt; =&gt; {
  <span class="hljs-comment">// eslint-disable-next-line react-hooks/exhaustive-deps</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> callbacks, deps) <span class="hljs-keyword">as</span> <span class="hljs-title class_">CallbackFactory</span>&lt;T&gt;;
};

<span class="hljs-comment">// Usage:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params">{ todos }: { todos: Todo[] }</span>) {
  <span class="hljs-keyword">const</span> callbacks = <span class="hljs-title function_">createStableCallbacks</span>(
    {
      <span class="hljs-attr">onToggle</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
        <span class="hljs-comment">// Toggle logic</span>
      },
      <span class="hljs-attr">onDelete</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
        <span class="hljs-comment">// Delete logic</span>
      },
      <span class="hljs-attr">onEdit</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
        <span class="hljs-comment">// Edit logic</span>
      },
    },
    [],
  ); <span class="hljs-comment">// Only recreate if dependencies change</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span> {<span class="hljs-attr">...callbacks</span>} /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="محددات-منمطة-لإعادة-تصيير-دقيقة">مُحدِّدات مُنمَّطة لإعادة تصيير دقيقة</h2>
<p>من أكبر مكاسب الأداء تأتي من استخدام مُحدِّدات لا تسبّب إعادة التصيير إلّا حين تتغيّر البيانات ذات الصلة فعلًا. وإليك كيفية إنشاء مُحدِّدات آمنة الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Generic selector hook with proper typing</span>
<span class="hljs-keyword">function</span> useSelector&lt;<span class="hljs-title class_">TState</span>, <span class="hljs-title class_">TResult</span>&gt;(
  <span class="hljs-attr">selector</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">TState</span></span>) =&gt;</span> <span class="hljs-title class_">TResult</span>,
  <span class="hljs-attr">equalityFn</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-title class_">TResult</span>, <span class="hljs-attr">b</span>: <span class="hljs-title class_">TResult</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>,
) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">TState</span>&gt;(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">getInitialState</span>());

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">selector</span>(state),
    [state, selector], <span class="hljs-comment">// Runs when state or selector changes</span>
  );
}

<span class="hljs-comment">// ✅ Memoized selectors prevent unnecessary recalculations</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">selectUserById</span> = (<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;
  <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">AppState</span></span>) =&gt;</span> state.<span class="hljs-property">users</span>.<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">id</span> === userId), [userId]);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">selectUserProjects</span> = (<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;
  <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">AppState</span></span>) =&gt;</span> state.<span class="hljs-property">projects</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">project</span>) =&gt;</span> project.<span class="hljs-property">ownerId</span> === userId),
    [userId],
  );

<span class="hljs-comment">// Usage in component:</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDashboard</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userSelector = <span class="hljs-title function_">selectUserById</span>(userId);
  <span class="hljs-keyword">const</span> projectsSelector = <span class="hljs-title function_">selectUserProjects</span>(userId);

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useSelector</span>(userSelector);
  <span class="hljs-keyword">const</span> projects = <span class="hljs-title function_">useSelector</span>(projectsSelector);

  <span class="hljs-comment">// Only re-renders when this specific user or their projects change</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProjectsList</span> <span class="hljs-attr">projects</span>=<span class="hljs-string">{projects}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي-شبكة-بيانات-منمطة-للأداء">مثال من العالم الحقيقي: شبكة بيانات مُنمَّطة للأداء</h2>
<p>لنجمع كل ذلك معًا في مثال واقعي — مكوّن شبكة بيانات سريع وآمن الأنواع في آنٍ واحد:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Core data types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GridRow</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">GridColumn</span> {
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">header</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">accessor</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">sortable</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Performance-oriented prop types</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataGridProps</span> {
  <span class="hljs-comment">// Data should be readonly to prevent accidental mutations</span>
  <span class="hljs-attr">rows</span>: <span class="hljs-keyword">readonly</span> <span class="hljs-title class_">GridRow</span>[];
  <span class="hljs-attr">columns</span>: <span class="hljs-keyword">readonly</span> <span class="hljs-title class_">GridColumn</span>[];

  <span class="hljs-comment">// Memoized computed values</span>
  <span class="hljs-attr">sortedRows</span>: <span class="hljs-title class_">MemoizedValue</span>&lt;<span class="hljs-keyword">readonly</span> <span class="hljs-title class_">GridRow</span>[]&gt;;
  <span class="hljs-attr">visibleColumns</span>: <span class="hljs-title class_">MemoizedValue</span>&lt;<span class="hljs-keyword">readonly</span> <span class="hljs-title class_">GridColumn</span>[]&gt;;

  <span class="hljs-comment">// Stable callbacks</span>
  <span class="hljs-attr">onRowClick</span>: <span class="hljs-title class_">StableCallback</span>&lt;[<span class="hljs-built_in">string</span>], <span class="hljs-built_in">void</span>&gt;;
  <span class="hljs-attr">onSort</span>: <span class="hljs-title class_">StableCallback</span>&lt;[<span class="hljs-built_in">string</span>, <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span>], <span class="hljs-built_in">void</span>&gt;;

  <span class="hljs-comment">// Performance hints</span>
  <span class="hljs-attr">virtualizeRows</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">rowHeight</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">DataGrid</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{
    rows,
    columns,
    sortedRows,
    visibleColumns,
    onRowClick,
    onSort,
    virtualizeRows = <span class="hljs-literal">false</span>,
    rowHeight,
  }: <span class="hljs-title class_">DataGridProps</span></span>) =&gt;</span> {
    <span class="hljs-comment">// Component implementation here</span>
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;data-grid&quot;</span>&gt;</span>
        {/* Header */}
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;grid-header&quot;</span>&gt;</span>
          {visibleColumns.map((column) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">GridHeader</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{column.id}</span> <span class="hljs-attr">column</span>=<span class="hljs-string">{column}</span> <span class="hljs-attr">onSort</span>=<span class="hljs-string">{onSort}</span> /&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        {/* Body */}
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;grid-body&quot;</span>&gt;</span>
          {sortedRows.map((row) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">GridRow</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{row.id}</span> <span class="hljs-attr">row</span>=<span class="hljs-string">{row}</span> <span class="hljs-attr">columns</span>=<span class="hljs-string">{visibleColumns}</span> <span class="hljs-attr">onRowClick</span>=<span class="hljs-string">{onRowClick}</span> /&gt;</span>
          ))}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
);

<span class="hljs-comment">// Usage with proper typing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDataGridContainer</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [sortConfig, setSortConfig] = useState&lt;{ <span class="hljs-attr">column</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span> }&gt;({
    <span class="hljs-attr">column</span>: <span class="hljs-string">&#x27;name&#x27;</span>,
    <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;asc&#x27;</span>,
  });

  <span class="hljs-keyword">const</span> <span class="hljs-attr">columns</span>: <span class="hljs-keyword">readonly</span> <span class="hljs-title class_">GridColumn</span>[] = [
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-attr">header</span>: <span class="hljs-string">&#x27;Name&#x27;</span>, <span class="hljs-attr">accessor</span>: <span class="hljs-string">&#x27;name&#x27;</span>, <span class="hljs-attr">sortable</span>: <span class="hljs-literal">true</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-attr">header</span>: <span class="hljs-string">&#x27;Email&#x27;</span>, <span class="hljs-attr">accessor</span>: <span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-attr">sortable</span>: <span class="hljs-literal">true</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;status&#x27;</span>, <span class="hljs-attr">header</span>: <span class="hljs-string">&#x27;Status&#x27;</span>, <span class="hljs-attr">accessor</span>: <span class="hljs-string">&#x27;status&#x27;</span>, <span class="hljs-attr">sortable</span>: <span class="hljs-literal">true</span> },
  ];

  <span class="hljs-keyword">const</span> <span class="hljs-attr">rows</span>: <span class="hljs-keyword">readonly</span> <span class="hljs-title class_">GridRow</span>[] = users.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> ({
    <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span>,
    <span class="hljs-attr">data</span>: user,
  }));

  <span class="hljs-keyword">const</span> sortedRows = <span class="hljs-title function_">useMemoizedValue</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> [...rows].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> aValue = a.<span class="hljs-property">data</span>[sortConfig.<span class="hljs-property">column</span>];
      <span class="hljs-keyword">const</span> bValue = b.<span class="hljs-property">data</span>[sortConfig.<span class="hljs-property">column</span>];

      <span class="hljs-keyword">if</span> (sortConfig.<span class="hljs-property">direction</span> === <span class="hljs-string">&#x27;asc&#x27;</span>) {
        <span class="hljs-keyword">return</span> aValue &lt; bValue ? -<span class="hljs-number">1</span> : aValue &gt; bValue ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> aValue &gt; bValue ? -<span class="hljs-number">1</span> : aValue &lt; bValue ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>;
      }
    });
  }, [rows, sortConfig]);

  <span class="hljs-keyword">const</span> visibleColumns = <span class="hljs-title function_">useMemoizedValue</span>(<span class="hljs-function">() =&gt;</span> columns, [columns]);

  <span class="hljs-keyword">const</span> handleRowClick = <span class="hljs-title function_">useStableCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">rowId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Row clicked:&#x27;</span>, rowId);
  }, []);

  <span class="hljs-keyword">const</span> handleSort = <span class="hljs-title function_">useStableCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">column</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">direction</span>: <span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setSortConfig</span>({ column, direction });
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DataGrid</span>
      <span class="hljs-attr">rows</span>=<span class="hljs-string">{rows}</span>
      <span class="hljs-attr">columns</span>=<span class="hljs-string">{columns}</span>
      <span class="hljs-attr">sortedRows</span>=<span class="hljs-string">{sortedRows}</span>
      <span class="hljs-attr">visibleColumns</span>=<span class="hljs-string">{visibleColumns}</span>
      <span class="hljs-attr">onRowClick</span>=<span class="hljs-string">{handleRowClick}</span>
      <span class="hljs-attr">onSort</span>=<span class="hljs-string">{handleSort}</span>
      <span class="hljs-attr">rowHeight</span>=<span class="hljs-string">{48}</span>
    /&gt;</span></span>
  );
}
</code></pre>
<h2 id="مفاضلات-الأداء-ومتى-تستخدم-هذه-الأنماط">مفاضلات الأداء ومتى تستخدم هذه الأنماط</h2>
<p>هذه الأنماط ليست مجّانية — فهي تضيف تعقيدًا في الأنواع وبعض الحمل الزائد في وقت التشغيل بسبب أدوات فحص الأنواع. وإليك متى يكون كل نمط منطقيًا:</p>
<p><strong>حدود memo المبنيّة على الهوية</strong>: استخدمها عندما تكون لديك مكوّنات يُعاد تصييرها كثيرًا بخصائص متشابهة. ويعود تعقيد الأنواع بالفائدة عندما تكون لديك كائنات خصائص معقّدة لا يؤثّر في التصيير إلّا بعض خصائصها.</p>
<p><strong>أنواع المراجع الثابتة</strong>: ضرورية للمكوّنات التي تُمرَّر كأبناء أو ضمن أنماط خصائص التصيير. ويمنع نمط <code>StableCallback</code> إعادة التصيير العَرَضية في أشجار المكوّنات المتداخلة بعمق.</p>
<p><strong>عقود البيانات للقراءة فقط</strong>: الأكثر قيمة في التطبيقات التي تحتوي على إدارة حالة معقّدة وتكثر فيها التعديلات العَرَضية. ويمنع نوع <code>DeepReadonly</code> فئات كاملة من أخطاء الأداء.</p>
<p><strong>أنواع القيم المحسوبة</strong>: تستحقّ العناء في الحسابات المكلفة التي تُمرَّر إلى عدّة مكوّنات. ويضمن نوع <code>MemoizedValue</code> ألّا تتكرّر الحسابات المكلفة عن طريق الخطأ.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تفرط في هندسة التعقيد. هذه الأنماط أكثرها قيمة في المكوّنات الحرجة للأداء أو عند العمل مع مجموعات بيانات كبيرة. أمّا المكوّنات البسيطة التي نادرًا ما تُصيَّر فقد لا يستحقّ التعقيدُ الإضافي.</p>
</blockquote>
<h2 id="الأنماط-المضادة-الشائعة-وكيفية-إصلاحها">الأنماط المضادة الشائعة (وكيفية إصلاحها)</h2>
<h3 id="النمط-المضاد-1-كائنات-الخصائص-المضمنة">النمط المضاد 1: كائنات الخصائص المضمّنة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: New object on every render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ParentComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">theme:</span> &#x27;<span class="hljs-attr">dark</span>&#x27;, <span class="hljs-attr">size:</span> &#x27;<span class="hljs-attr">large</span>&#x27; }} <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">padding:</span> <span class="hljs-attr">16</span>, <span class="hljs-attr">margin:</span> <span class="hljs-attr">8</span> }} /&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Good: Stable references</span>
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">DEFAULT_CONFIG</span> = { <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;large&#x27;</span> } <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">DEFAULT_STYLE</span> = { <span class="hljs-attr">padding</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">margin</span>: <span class="hljs-number">8</span> } <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ParentComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{DEFAULT_CONFIG}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{DEFAULT_STYLE}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="النمط-المضاد-2-اعتماديات-غير-ثابتة-في-التأثيرات">النمط المضاد 2: اعتماديات غير ثابتة في التأثيرات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Effect runs on every render due to unstable dependency</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserComponent</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchUser</span>(userId).<span class="hljs-title function_">then</span>(setUser);
  }, [userId, setUser]); <span class="hljs-comment">// setUser is unstable!</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user?.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Remove unstable dependencies</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserComponent</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetchUser</span>(userId).<span class="hljs-title function_">then</span>(setUser);
  }, [userId]); <span class="hljs-comment">// Only userId dependency</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user?.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="النمط-المضاد-3-التحسين-المبكر">النمط المضاد 3: التحسين المبكّر</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Memoizing everything without measuring</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SimpleComponent</span>(<span class="hljs-params">{ name }: { name: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> memoizedName = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> name.<span class="hljs-title function_">toUpperCase</span>(), [name]);
  <span class="hljs-keyword">const</span> memoizedStyle = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> ({ <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;blue&#x27;</span> }), []);
  <span class="hljs-keyword">const</span> memoizedCallback = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;clicked&#x27;</span>);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{memoizedStyle}</span>&gt;</span>
      {memoizedName}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{memoizedCallback}</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Good: Only memoize when it provides value</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SimpleComponent</span>(<span class="hljs-params">{ name }: { name: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// Simple transformations don&#x27;t need memoization</span>
  <span class="hljs-keyword">const</span> displayName = name.<span class="hljs-title function_">toUpperCase</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">blue</span>&#x27; }}&gt;</span>
      {displayName}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> console.log(&#x27;clicked&#x27;)}&gt;Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>تلميح</strong></p>
<p>قِس أولًا ثم حسّن ثانيًا. ليس كل مكوّن يحتاج إلى تخزين مؤقت — ركّز على المكوّنات التي يُعاد تصييرها كثيرًا أو التي تنفّذ عمليات مكلفة.</p>
</blockquote>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>أنماط الأداء المستنيرة إلى الأنواع تحوّل TypeScript من أداة لالتقاط الأخطاء إلى دليلٍ لهندسة الأداء. وبترميز عقود الأداء في أنماطك، تجعل مشكلات الأداء ظاهرةً في وقت التجميع بدلًا من اكتشافها عبر التنميط (profiling) والتنقيح.</p>
<p>والفكرة المفتاحية هي أنّ الأداء في تطبيقات React يتعلّق في معظمه بإدارة المساواة بين المراجع وتجنّب العمل غير الضروري. وحين تستخدم TypeScript لجعل هذه الاهتمامات صريحة في نظام الأنواع، تحصل على أداء أفضل وشيفرة قابلة للصيانة في آنٍ واحد.</p>
<p>أنماط الأداء الآمنة الأنواع ليست عن رشّ <code>useMemo()</code> و<code>useCallback()</code> في كل مكان (وهذا قد يضرّ بالأداء في الواقع). بل هي عن استخدام TypeScript لإنشاء أنماط قابلة للتنبؤ وثابتة تمنع العمل غير الضروري:</p>
<ul>
<li><strong>مراجع ثابتة</strong>: أنشئ الكائنات والدوالّ خارج التصيير أو خزّنها مؤقتًا على نحو صحيح</li>
<li><strong>مُحدِّدات دقيقة</strong>: لا تُعِد التصيير إلّا حين تتغيّر البيانات ذات الصلة فعلًا</li>
<li><strong>حدود تخزين ذكية</strong>: استخدم <code>React.memo()</code> مع اعتماديات ثابتة</li>
<li><strong>مراقبة الأداء</strong>: تتبّع التراجعات والتقاطها عبر مقاييس مُنمَّطة</li>
</ul>
<p>أفضل تحسينٍ للأداء هو الذي لم تكن بحاجة إلى إجراءه أصلًا لأنّ شيفرتك كانت مهيّأة على نحو صحيح منذ البداية. يساعدك TypeScript على بناء تلك البنية عبر التقاط الأنماط غير الثابتة والتأكّد من أنّ تحسينات أداءك تعمل فعلًا.</p>
<p>جرّب تطبيق أحد هذه الأنماط في مشروعك الحالي — ابدأ بأنواع المراجع الثابتة إن كانت لديك مكوّنات يُعاد تصييرها كثيرًا، أو بعقود البيانات للقراءة فقط إن كنت تتعامل مع تعديلات حالة معقّدة. وستندهش كم تصبح نوايا الأداء لديك أوضح حين تُرمَّز في نظام الأنواع.</p>
<p>تذكّر: التحسين المبكّر هو أصل كل شرّ، لكنّ الأنماط القابلة للتنبؤ التي تمنع فخاخ الأداء الواضحة؟ هذا ببساطة هندسة جيّدة.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
