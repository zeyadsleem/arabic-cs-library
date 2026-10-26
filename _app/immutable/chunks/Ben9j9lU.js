const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",l="loaders",t="استخدام المحمّلات (Loaders) لجلب البيانات",p=[{depth:2,id:"المحملات-العالمية",text:"المحمّلات العالمية"},{depth:2,id:"المحملات-المحلية",text:"المحمّلات المحلية"},{depth:2,id:"استخدام-المحملات-مع-المزينات",text:"استخدام المحمّلات مع المزيّنات"},{depth:3,id:"مثال-تغليف-قصة-ببيانات-محملة",text:"مثال: تغليف قصة ببيانات محمَّلة"}],e=`<p>تقدّم المحمّلات (loaders) في Storybook طريقة لتحميل البيانات أو تنفيذ إجراءات <em>قبل</em> تصيير القصة بشكل غير متزامن. ويمكن أن يكون هذا مفيدًا بشكل خاص عندما تحتاج إلى جلب بيانات مُحاكاة من API، أو تنفيذ مهام تهيئة، أو التلاعب بالخصائص أو القيم العامة (globals) ديناميكيًا بناءً على عوامل خارجية قبل عرض القصة. وكما في <a href="https://stevekinney.com/courses/storybook/parameters">المعاملات</a>، يمكن تطبيق المحمّلات عالميًا لتؤثر في كل القصص أو محليًا لتؤثر في قصص بعينها.</p>
<h2 id="المحملات-العالمية">المحمّلات العالمية</h2>
<p>تُعرَّف المحمّلات العالمية في <code>.storybook/preview.ts</code> وتُنفَّذ لكل قصة في Storybook لديك. وهي مفيدة بشكل خاص لإعداد سياقات على مستوى التطبيق أو جلب بيانات ذات صلة بكل المكوّنات.</p>
<p>لنقل إنك تريد جلب بيانات المستخدم وإتاحتها لكل القصص. قد نضيف شيئًا كهذا إلى <code>.storybook/preview.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> loaders = [
	<span class="hljs-title function_">async</span> () =&gt; ({
		<span class="hljs-attr">userData</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/user&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>()),
	}),
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> decorators = [
	<span class="hljs-function">(<span class="hljs-params"><span class="hljs-title class_">Story</span>, context</span>) =&gt;</span> (
		<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{context.loaded.userData}</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">Story</span> /&gt;</span>
		<span class="hljs-tag">&lt;/<span class="hljs-name">UserContext.Provider</span>&gt;</span></span>
	),
];
</code></pre>
<p>يجلب هذا المحمّل بيانات المستخدم بشكل غير متزامن ويمنحها لكل القصص عبر <code>UserContext.Provider</code>. وتُوصَل البيانات التي يجلبها المحمّل عبر <code>context.loaded</code> في المزيّنات أو دوال القصة.</p>
<h2 id="المحملات-المحلية">المحمّلات المحلية</h2>
<p>تُعرَّف المحمّلات المحلية داخل القصص الفردية أو ملفات القصص. وتُستخدم لتحميل بيانات أو تنفيذ إجراءات خاصة بقصة واحدة أو بمجموعة قصص في الملف نفسه.</p>
<p>لنقل إن لديك مكوّن <code>ProfileCard</code> يحتاج إلى بيانات المستخدم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Example/ProfileCard&#x27;</span>,
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">DefaultProfileCard</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProfileCard</span> /&gt;</span></span>;

<span class="hljs-title class_">DefaultProfileCard</span>.<span class="hljs-property">loaders</span> = [
  <span class="hljs-title function_">async</span> () =&gt; ({
    <span class="hljs-attr">profileData</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/profile&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>()),
  }),
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">DefaultProfileCardStory</span> = (<span class="hljs-params">args, { loaded: { profileData } }</span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProfileCard</span> {<span class="hljs-attr">...profileData</span>} /&gt;</span></span>
);
</code></pre>
<p>يجلب هذا المحمّل بيانات الملف الشخصي لقصة <code>DefaultProfileCard</code> وحدها، وتستخدم دالة القصة البيانات المحمَّلة لتصيير مكوّن <code>ProfileCard</code> بالبيانات المجلوبة.</p>
<h2 id="استخدام-المحملات-مع-المزينات">استخدام المحمّلات مع المزيّنات</h2>
<p>يمكنك استخدام المحمّلات بالاشتراك مع المزيّنات لتغليف القصص ببيانات أو سياق إضافي يعتمد على تحميل بيانات غير متزامن.</p>
<h3 id="مثال-تغليف-قصة-ببيانات-محملة">مثال: تغليف قصة ببيانات محمَّلة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> meta = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Components/TaskList&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">TaskList</span>,
  <span class="hljs-attr">loaders</span>: [
    <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> tasks = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span>
        res.<span class="hljs-title function_">json</span>(),
      );
      <span class="hljs-keyword">return</span> { tasks };
    },
  ],
  <span class="hljs-attr">decorators</span>: [
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-title class_">Story</span>, { loaded }</span>) =&gt;</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TaskListProvider</span> <span class="hljs-attr">tasks</span>=<span class="hljs-string">{loaded.tasks}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Story</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">TaskListProvider</span>&gt;</span></span>
    ),
  ],
} <span class="hljs-keyword">as</span> <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">TaskList</span>&gt;;
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
