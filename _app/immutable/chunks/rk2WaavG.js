const s="patterns-dev",n="react",a="أنماط React وNext.js",t="react-server-components",e="مكوّنات React الخادمية",l=[{depth:2,id:"rsc-مقابل-ssr-ليسا-الشيء-نفسه",text:"RSC مقابل SSR: ليسا الشيء نفسه"},{depth:2,id:"التوجيهان",text:"التوجيهان"},{depth:2,id:"ما-الذي-يتغير-داخل-مكون-خادمي",text:"ما الذي يتغير داخل مكوّن خادمي"},{depth:2,id:"server-actions-استدعاء-الخادم-من-مكون-عميل",text:"Server Actions: استدعاء الخادم من مكوّن عميل"},{depth:2,id:"قواعد-التركيب",text:"قواعد التركيب"},{depth:2,id:"حجم-الحزمة-في-الواقع",text:"حجم الحزمة في الواقع"},{depth:2,id:"اصطلاحات-الملفات-في-app-router-الخاص-بـ-nextjs",text:"اصطلاحات الملفات في App Router الخاص بـ Next.js"},{depth:2,id:"متى-تستخدم-كل-خيار",text:"متى تستخدم كل خيار"},{depth:2,id:"ما-لا-يزال-قيد-التطور",text:"ما لا يزال قيد التطور"}],p=`<p>مكوّنات React الخادمية (React Server Components، RSC) هي مكوّنات React تعمل حصريًا على الخادم، ولا ترسل شيفرتها إلى المتصفح أبدًا، وتنتج ناتجًا تستطيع شجرة العميل عرضه ودمجه مع مكوّنات العميل العادية. وهي ليست بديلًا عن العرض في جانب الخادم (server-side rendering، SSR)؛ بل طبقة مختلفة في بنية العرض. يحوّل SSR مخرجات React إلى HTML للعرض الأول، بينما تتيح RSC لبعض أجزاء شجرتك ألا تتحول إلى JavaScript للعميل أصلًا.</p>
<p>إن التغيّر في النموذج الذهني كبير. في تطبيق React كلاسيكي يعمل كل مكوّن في المتصفح. ومع RSC تُقسَّم المكوّنات وفق <em>موضع تشغيلها</em>: خادم، وهو الوضع الافتراضي، أو عميل، ويُفعّل ذلك بـ <code>'use client'</code>. يطبق نظام البناء هذا التقسيم، والحد بين الطرفين واجهة خصائص (props) معتادة؛ إذ يمكن للمكوّن الخادمي أن يمرر خصائص، بما فيها بيانات سبق جلبها، إلى مكوّن عميل، تمامًا كما في تركيب مكوّنات React عادي.</p>
<p>هذا هو النموذج الذي وصل أولًا إلى App Router في Next.js، إذ ظهر في Next.js 13 أواخر عام 2022 وأصبحت إعداداته الافتراضية مستقرة، ثم أُضيف إلى Shopify Hydrogen، ويُعتمد الآن في Remix وTanStack Start وWaku. وهو الاتجاه الذي يسير نحوه React بوصفه الوضع الافتراضي.</p>
<h2 id="rsc-مقابل-ssr-ليسا-الشيء-نفسه">RSC مقابل SSR: ليسا الشيء نفسه</h2>
<p>يسهل الخلط بين الاثنين لأن كليهما يتطلب تشغيل React على الخادم. لكنهما يحلان مشكلتين مختلفتين.</p>
<table>
<thead>
<tr>
<th></th>
<th>SSR</th>
<th>RSC</th>
</tr>
</thead>
<tbody>
<tr>
<td>ما يعمل على الخادم</td>
<td>الشجرة كاملة، مرة لكل طلب</td>
<td>المكوّنات المعلَّمة بأنها خادمية فقط</td>
</tr>
<tr>
<td>ما يُرسَل إلى العميل</td>
<td>HTML + JS للشجرة كاملة</td>
<td>HTML + JS <em>فقط</em> لمكوّنات العميل</td>
</tr>
<tr>
<td>تكلفة الترطيب</td>
<td>الشجرة كاملة</td>
<td>مكوّنات العميل فقط</td>
</tr>
<tr>
<td>جلب البيانات</td>
<td>داخل العرض في الخادم</td>
<td>داخل المكوّنات الخادمية مع <code>await</code></td>
</tr>
<tr>
<td>موعد التشغيل</td>
<td>لكل طلب في SSR أو وقت البناء في SSG</td>
<td>نفسه — ينسجم مع كليهما</td>
</tr>
<tr>
<td>صيغة الإخراج</td>
<td>HTML</td>
<td>شجرة مكوّنات متسلسلة، وهي الحِمل (payload) الخاص بـ RSC، ثم HTML اختياريًا</td>
</tr>
</tbody>
</table>
<p>غالبًا ما تريد الاثنين معًا. تقلل RSC <em>كمية</em> JS الذي ترسله، ويقدم SSR ما ترسله من JS على هيئة HTML من أجل أول رسم سريع. في App Router، عندما تكتب مكوّنًا خادميًا غير متزامن يجلب البيانات، يفعل Next الأمرين: يعرضه على الخادم ويرسل HTML إلى المتصفح، ويرسل أيضًا حِمل RSC مضغوطًا إلى جانبه كي يحدّث العميل الشجرة في عمليات التنقل اللاحقة من دون إعادة تحميل كاملة للصفحة.</p>
<h2 id="التوجيهان">التوجيهان</h2>
<p>يحكم نظام RSC بالكامل توجيهان على مستوى الملف:</p>
<ul>
<li><strong><code>'use client'</code></strong> في أعلى ملف يحدد كل مكوّن يُصدَّر منه على أنه مكوّن عميل. مكوّنات العميل هي React التي تعرفها دائمًا؛ إذ يمكنها استخدام خطافات (hooks) مثل <code>useState</code> و<code>useEffect</code> ومعالجات الأحداث وواجهات المتصفح.</li>
<li><strong><code>'use server'</code></strong> في أعلى ملف يحدد كل دالة تُصدَّر على أنها Server Action، أي دالة آمنة للاستدعاء من مكوّن عميل لكنها تنفذ فعليًا على الخادم.</li>
</ul>
<p>في إطار عمل يفهم المكوّنات الخادمية، يصبح الملف الذي لا يحتوي أيًا من التوجيهين مكوّنًا خادميًا افتراضيًا. يمكن أن يكون <code>async</code>، ويمكنه استخدام <code>await</code> لجلب البيانات، وقراءة قاعدة البيانات مباشرة، واستخدام أسرار مخصصة للخادم، ولا يمكنه استخدام خطافات أو معالجات الأحداث.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/posts/page.tsx  -- Server Component (no directive)</span>

<span class="hljs-keyword">import</span> <span class="hljs-title class_">LikeButton</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./LikeButton&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Posts</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> posts = <span class="hljs-keyword">await</span> db.<span class="hljs-property">posts</span>.<span class="hljs-title function_">findMany</span>({ <span class="hljs-attr">orderBy</span>: { <span class="hljs-attr">createdAt</span>: <span class="hljs-string">&quot;desc&quot;</span> } });\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>

{posts.map((post) =&gt; (

<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{post.excerpt}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">LikeButton</span> <span class="hljs-attr">postId</span>=<span class="hljs-string">{post.id}</span> <span class="hljs-attr">initialCount</span>=<span class="hljs-string">{post.likes}</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

))}

<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>

);

}
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// app/posts/LikeButton.tsx</span>

<span class="hljs-string">&quot;use client&quot;</span>;

<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LikeButton</span>(<span class="hljs-params">{ postId, initialCount }</span>) {

<span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(initialCount);

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount((c) =&gt; c + 1)}&gt;

Likes: {count}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}
</code></pre>
<p>تُعرض القائمة بالكامل على الخادم. لا تظهر شيفرتها — استعلام قاعدة البيانات و<code>map</code> على المنشورات وJSX لكل \`\` — في حزمة العميل أبدًا. الشيفرة JavaScript الوحيدة التي تُرسَل هي <code>LikeButton</code> لأنها محددة بـ <code>'use client'</code>. وإذا كانت القائمة تضم 50 منشورًا، فلا ترسل إلا مقدار شيفرة زر واحد، لا خمسين.</p>
<h2 id="ما-الذي-يتغير-داخل-مكون-خادمي">ما الذي يتغير داخل مكوّن خادمي</h2>
<p>تتمتع المكوّنات الخادمية بإمكانية الوصول إلى بيئة الخادم، ما يعني ما يلي:</p>
<ul>
<li><strong>استعلامات قاعدة بيانات مباشرة.</strong> لا حاجة إلى طبقة API. يمكن للمكوّن نفسه أن يستخدم <code>await db.users.findUnique(...)</code>. ولا توجد رحلة من العميل إلى الخادم في جلب هذه البيانات؛ إذ يجري الجلب في العملية نفسها التي يجري فيها العرض.</li>
<li><strong>أسرار مخصصة للخادم.</strong> من الآمن الإشارة إلى متغيرات البيئة ومفاتيح API وعناوين قواعد البيانات؛ فلن تُضمَّن في حزمة المتصفح أبدًا.</li>
<li><strong>تبعيات كبيرة دون تكلفة.</strong> استيراد <code>marked</code> أو <code>prismjs</code> أو مكتبة تواريخ بحجم 600 KB داخل مكوّن خادمي يكلف صفر بايت في العميل. تعمل المكتبة على الخادم، ولا يصل إلى المستخدم إلا ناتجها المعروض.</li>
<li><strong><code>await</code> في المستوى الأعلى.</strong> دوال المكوّن الخادمي غير متزامنة. يمكنك استخدام <code>await</code> مباشرة في جسم الدالة من دون حيلة <code>useEffect</code> لجلب البيانات الأولية.</li>
</ul>
<p>وهذه أشياء لا يستطيعونها:</p>
<ul>
<li>لا <code>useState</code> ولا <code>useEffect</code> ولا أي hook آخر من React يعتمد على دورة حياة العرض.</li>
<li>لا معالجات أحداث مثل <code>onClick</code> أو <code>onChange</code>. مرر الخصائص <em>إلى الأسفل</em> إلى مكوّن عميل بدلًا من ذلك.</li>
<li>لا واجهات متصفح مثل <code>window</code> أو <code>localStorage</code> أو <code>IntersectionObserver</code>.</li>
</ul>
<h2 id="server-actions-استدعاء-الخادم-من-مكون-عميل">Server Actions: استدعاء الخادم من مكوّن عميل</h2>
<p>مكوّنات الخادم تميل بطبيعتها إلى القراءة أكثر من الكتابة. أما عمليات الكتابة — إرسال نموذج أو حذف صف أو تبديل إعداد — فقد استقرت لها <strong>Server Actions</strong> في React 19: دوال خادم تستوردها مباشرة في مكوّنات العميل وتستدعيها كأي دالة غير متزامنة أخرى.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/posts/actions.ts</span>

<span class="hljs-string">&quot;use server&quot;</span>;

<span class="hljs-keyword">import</span> { revalidateTag } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/cache&quot;</span>;

<span class="hljs-keyword">import</span> { auth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">likePost</span>(<span class="hljs-params">postId: string</span>) {

<span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">auth</span>();

<span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&quot;Not authenticated&quot;</span>);\\n

<span class="hljs-keyword">await</span> db.<span class="hljs-property">likes</span>.<span class="hljs-title function_">create</span>({ <span class="hljs-attr">data</span>: { postId, <span class="hljs-attr">userId</span>: user.<span class="hljs-property">id</span> } });

<span class="hljs-title function_">revalidateTag</span>(\\<span class="hljs-string">\`post:\\\${postId}\\\`);

}
</span></code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// app/posts/LikeButton.tsx</span>

<span class="hljs-string">&quot;use client&quot;</span>;

<span class="hljs-keyword">import</span> { useTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> { likePost } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./actions&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LikeButton</span>(<span class="hljs-params">{ postId }</span>) {

<span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>

<span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>

<span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> startTransition(() =&gt; likePost(postId))}

&gt;

{isPending ? &quot;Liking...&quot; : &quot;Like&quot;}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}
</code></pre>
<p>هناك أمور تحدث هنا تستحق التسمية:</p>
<ul>
<li>تعيش الدالة <code>likePost</code> على الخادم. يستبدل نظام البناء عبارة <code>import</code> في العميل بإشارة، وهي معرف نصي، يستخدمها بيئة التشغيل للاستدعاء إلى الخادم.</li>
<li>لا يحتاج الزر إلى مسار <code>/api/like</code> مكتوب يدويًا. يتولى الإطار ربط الطلب والاستجابة.</li>
<li>بعد نجاح الإجراء، يبطّل <code>revalidateTag</code> كل عمليات الجلب المخزّنة التي تحمل وسم معرّف المنشور، فيعيد العرض التالي بيانات حديثة.</li>
</ul>
<p>تعمل Server Actions أيضًا بوصفها قيمة <code>action</code> في النموذج، وفي هذه الحالة تتراجع بسلاسة؛ إذ يظل النموذج قابلًا للإرسال حتى قبل تحميل JavaScript.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// app/comments/CommentForm.tsx</span>

<span class="hljs-string">&quot;use client&quot;</span>;

<span class="hljs-keyword">import</span> { useActionState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> { postComment } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./actions&quot;</span>;\\n

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">CommentForm</span>(<span class="hljs-params">{ postId }</span>) {

<span class="hljs-keyword">const</span> [state, formAction, isPending] = <span class="hljs-title function_">useActionState</span>(postComment, <span class="hljs-literal">null</span>);\\n

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;postId&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{postId}</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;body&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>&gt;</span>

{isPending ? &quot;Posting...&quot; : &quot;Post comment&quot;}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

{state?.error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}

<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>

);

}
</code></pre>
<p><code>useActionState</code> أحد خطافات React 19 الجديدة، و<code>useFormStatus</code> خطاف آخر، وهو مفيد داخل زر الإرسال لمعرفة ما إذا كان النموذج الأب يرسل بياناته حاليًا.</p>
<h2 id="قواعد-التركيب">قواعد التركيب</h2>
<p>قواعد خلط المكوّنات الخادمية بمكوّنات العميل بسيطة، لكن لها بضع زوايا حادة:</p>
<ul>
<li>يمكن لمكوّن خادمي أن يعرض مكوّن عميل، مع تمرير البيانات بوصفها خصائص.</li>
<li>يمكن لمكوّن عميل أن يعرض مكوّنًا خادميًا <strong>فقط إذا كان المكوّن الخادمي قد مُرر بوصفه <code>children</code> أو خاصية</strong>. لا يستطيع مكوّن العميل استيراد مكوّن خادمي مباشرة؛ فبمجرد أن تعبر شجرة إلى داخل <code>'use client'</code>، يصبح كل ما يُستورد من داخل تلك الشجرة عميليًا أيضًا.</li>
<li>يجب أن يكون كل ما يمر عبر هذا الحد كخصائص قابلًا للتسلسل: الأرقام والسلاسل والقيم المنطقية والمصفوفات والكائنات العادية وDates وMaps وSets والوعود، إذ تسلسل React الوعود المعلّقة، وعناصر JSX. لا دوال ولا نسخ أصناف.</li>
</ul>
<p>النمط رقم 2 هو مصدر التعثر الأكثر شيوعًا. والحل هو قاعدة «الالتفاف، لا الاستيراد»:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Bad: ClientLayout imports a Server Component</span>

<span class="hljs-string">&quot;use client&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ServerSidebar</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ServerSidebar&quot;</span>; <span class="hljs-comment">// ERROR\\n</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ClientLayout</span>(<span class="hljs-params">{ children }</span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">ServerSidebar</span> /&gt;</span>

{children}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

}
</code></pre>
<pre><code class="language-python">// Good: ClientLayout takes the Server Component <span class="hljs-keyword">as</span> a child

<span class="hljs-string">&quot;use client&quot;</span>;

export default function ClientLayout({ sidebar, children }) {

<span class="hljs-keyword">return</span> (

&lt;div&gt;

{sidebar}

{children}

&lt;/div&gt;

);

}\\n

// And the parent (a Server Component) composes them:

// app/layout.tsx

<span class="hljs-keyword">import</span> ClientLayout <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ClientLayout&quot;</span>;

<span class="hljs-keyword">import</span> ServerSidebar <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./ServerSidebar&quot;</span>;\\n

export default function RootLayout({ children }) {

<span class="hljs-keyword">return</span> (

&lt;html&gt;

&lt;body&gt;

&lt;ClientLayout sidebar={&lt;ServerSidebar /&gt;}&gt;{children}&lt;/ClientLayout&gt;

&lt;/body&gt;

&lt;/html&gt;

);

}
</code></pre>
<h2 id="حجم-الحزمة-في-الواقع">حجم الحزمة في الواقع</h2>
<p>قدّرت RFC الأصلية الخاصة بـ RSC انخفاضًا في حجم الحزمة بنسبة 18–29%. وتقع تقارير الفرق التي انتقلت إلى App Router في نطاق مشابه، إذ تسجل عادةً انخفاضًا في JS المرسل إلى العميل يتراوح بين 20% و40%، مع مكاسب أكبر في المسارات الغنية بالمحتوى حيث تمثل معظم الصفحة عرض بيانات بدلًا من تفاعل.</p>
<p>شكل المكسب:</p>
<ul>
<li><strong>الاستيرادات داخل المكوّنات الخادمية لا تساهم بشيء.</strong> عارض Markdown أو مُلوّن بناء جملة أو مكتبة تواريخ ثقيلة — لا شيء من ذلك يُرسَل.</li>
<li><strong>يبقى شيفرة جلب البيانات في الخادم.</strong> فحوص المصادقة وبناة الاستعلام وعملاء ORM تبقى جميعها على الخادم.</li>
<li><strong>تنكمش مكوّنات العميل إلى التفاعل الفعلي.</strong> مكوّن العميل المعتاد زر أو نافذة منبثقة أو حقل إدخال، أي شيء صغير.</li>
</ul>
<p>الأمر ليس مجانيًا. تعمل مكوّنات الخادم على الخادم، ما يكلّف دقائق في الخدمات عديمة الخوادم أو الحاويات، ويضيف حِمل RSC نفسه بايتات إلى كل تنقل. لكن في معظم الصفحات، تتفوق JavaScript الموفَّرة على البايتات المضافة.</p>
<h2 id="اصطلاحات-الملفات-في-app-router-الخاص-بـ-nextjs">اصطلاحات الملفات في App Router الخاص بـ Next.js</h2>
<p>يبني App Router نظام RSC في نظام الملفات. ويملك المسار النموذجي ملفات خاصة كالتالي، كل منها Server Component ما لم يحمل <code>'use client'</code>:</p>
<table>
<thead>
<tr>
<th>الملف</th>
<th>الغرض</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>page.tsx</code></td>
<td>واجهة المسار الرئيسية.</td>
</tr>
<tr>
<td><code>layout.tsx</code></td>
<td>يلف <code>page.tsx</code> وأي مسارات متداخلة. ويبقى ثابتًا أثناء عمليات التنقل ضمن نطاقه.</td>
</tr>
<tr>
<td><code>loading.tsx</code></td>
<td>بديل \`\` للعرض الأولي لـ <code>page.tsx</code>.</td>
</tr>
<tr>
<td><code>error.tsx</code></td>
<td>حد أخطاء محدود بالمسار. ويجب أن يكون مكوّن عميل.</td>
</tr>
<tr>
<td><code>not-found.tsx</code></td>
<td>يُعرض عند استدعاء <code>notFound()</code>.</td>
</tr>
<tr>
<td><code>template.tsx</code></td>
<td>مثل <code>layout.tsx</code> لكنه يُعاد تركيبه عند كل تنقل.</td>
</tr>
<tr>
<td><code>route.ts</code></td>
<td>معالج HTTP، من دون عرض، للواجهات وwebhooks.</td>
</tr>
</tbody>
</table>
<p>تتيح هذه الاصطلاحات للتوجيه أن يبث التخطيطات والمسارات المتوازية والمسارات المعترضة من دون أن تضطر إلى ربط \`\` أو حدود الأخطاء يدويًا. يوجد هيكل الصفحة في <code>layout.tsx</code>، والبيانات البطيئة في <code>page.tsx</code>، و<code>loading.tsx</code> هو البديل الاحتياطي. يركّب الإطار بينها في استجابة بث واحدة.</p>
<h2 id="متى-تستخدم-كل-خيار">متى تستخدم كل خيار</h2>
<p>استخدم القواعد التالية كدليل تقريبي عند تصميم مسار جديد:</p>
<ul>
<li><strong>هيكل على مستوى الصفحة، وتنقل، وتذييل، وعناوين</strong>: Server Components. لا تحتاجها إلى تفاعل أبدًا.</li>
<li><strong>قوائم محتوى من قاعدة بيانات أو CMS</strong>: Server Components، مع جلب بيانات <code>await</code> داخلها.</li>
<li><strong>النماذج</strong>: مكوّن عميل لحقول النموذج وحالة الإرسال، ويستدعي Server Action.</li>
<li><strong>كل ما يستخدم <code>useState</code> أو <code>useEffect</code> أو معالجات الأحداث</strong>: Client Component. أبقِ استيراداته محدودة.</li>
<li><strong>المكتبات الثقيلة المستخدمة لعرض الناتج فقط</strong>، مثل Markdown وتلوين بناء الجملة والرسوم البيانية بصيغة SVG: Server Components، لإبقائها خارج حزمة العميل.</li>
<li><strong>الأجسام التفاعلية فعلًا</strong>، مثل محرر النصوص الغني والخريطة ومحرر الشيفرة: Client Component، ويُحمّل غالبًا عبر <code>next/dynamic</code> لإبقاء تكلفته خارج المسار الأولي.</li>
</ul>
<p>يتطلب التغيير الذهني اعتبار <code>'use client'</code> <em>الاستثناء</em>، الذي تعلنه عند أوراق الشجرة حيث يوجد التفاعل فعليًا. والخيار الافتراضي هو الخادم.</p>
<h2 id="ما-لا-يزال-قيد-التطور">ما لا يزال قيد التطور</h2>
<p>RSC مستقر في React 19 وفي App Router الخاص بـ Next.js، لكن النظام البيئي المحيط به ما يزال يتطور:</p>
<ul>
<li><strong>توجيه <code>use cache</code></strong>، التجريبي في Next.js 15، يتيح لك تحديد دالة أو مكوّن على أنه قابل للتخزين المؤقت بمعزل عن عمليات جلب بياناته. وهذه أنظف طريقة للتعبير عن «اعرض هذا على الخادم، وخزّن الناتج حسب الوسيط» من دون نشر خيارات <code>fetch</code> في كل مكان.</li>
<li><strong>واجهات الطلب غير المتزامنة</strong>: في Next.js 15، أصبحت <code>cookies()</code> و<code>headers()</code> و<code>draftMode()</code> و<code>params</code> الديناميكية و<code>searchParams</code> غير متزامنة ويجب انتظارها. يجعل هذا التغيير الحد بين الديناميكي والساكن أسهل على الإطار في استنتاجه ويفتح الباب أمام العرض الجزئي المسبق.</li>
<li><strong>التبني خارج Next.js</strong>: تعمل Waku وRedwoodJS وTanStack Start وRemix v3 جميعها على دعم RSC. والبروتوكول المقصود أن يكون قابلًا للنقل عبر الأطر، لا خاصًا بـ Next.js.</li>
<li><strong>قصة البث والتخزين المؤقت</strong> تتقارب على إعادة التحقق بالوسوم والمسارات في كل مكان، بحيث أصبح <code>revalidateTag</code> و<code>revalidatePath</code> واجهتي الإبطال الأساسيتين.</li>
</ul>
<p>تنتهي هذه التطورات إلى نموذج تستخدم فيه العرض وجلب البيانات والتغييرات وإبطال الذاكرة المؤقتة 모두 أدوات React نفسها، وهي المكوّنات الخادمية وServer Actions وSuspense وذاكرات الوسوم، بدلًا من أن تكون مفاهيم منفصلة تربطها يدويًا. وRSC هو التغيير البنيوي الذي يجعل هذه النهاية قابلة للوصول.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,p as html,t as slug,e as title};
