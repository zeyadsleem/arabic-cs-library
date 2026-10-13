const s="better-auth",a="concepts",n="المفاهيم",e="index",l="API",t=[{depth:2,id:"استدعاء-نقاط-نهاية-api-على-الخادم",text:"استدعاء نقاط نهاية API على الخادم"},{depth:3,id:"body-وheaders-وquery",text:"Body وHeaders وQuery"},{depth:3,id:"الحصول-على-كائن-headers-وresponse",text:"الحصول على كائن headers وResponse"},{depth:3,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"}],p=`<h1>API (/docs/concepts/api)</h1>
<p>تعرّف على كيفية استدعاء نقاط نهاية Better Auth API على الخادم، وتمرير body وheaders ومعاملات الاستعلام، واسترجاع ترويسات الاستجابة، ومعالجة الأخطاء.</p>
<p>عند إنشاء مثيل Better Auth جديد، فإنه يوفّر لك كائن <code>api</code>. يعرض هذا الكائن كل نقطة نهاية موجودة في مثيل Better Auth لديك. ويمكنك استخدامه للتفاعل مع Better Auth من جهة الخادم.</p>
<p>أي نقطة نهاية تُضاف إلى Better Auth، سواء من الإضافات أو النواة، ستكون متاحة عبر الكائن <code>api</code>.</p>
<h2 id="استدعاء-نقاط-نهاية-api-على-الخادم">استدعاء نقاط نهاية API على الخادم</h2>
<p>لاستدعاء نقطة نهاية API على الخادم، استورد مثيل <code>auth</code> لديك واستدعِ نقطة النهاية باستخدام الكائن <code>api</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;
<span class="hljs-keyword">import</span> { headers } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;next/headers&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...</span>
})

<span class="hljs-comment">// calling get session on the server</span>
<span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">getSession</span>({
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>() <span class="hljs-comment">// some endpoints might require headers</span>
})
</code></pre>
<h3 id="body-وheaders-وquery">Body وHeaders وQuery</h3>
<p>على عكس العميل، يحتاج الخادم إلى تمرير القيم ككائن بالمفتاح <code>body</code> للمتن، و<code>headers</code> للترويسات، و<code>query</code> لمعاملات الاستعلام.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { auth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth&quot;</span>

<span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">getSession</span>({
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>() <span class="hljs-comment">// headers containing the user&#x27;s session token</span>
})

<span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">signInEmail</span>({
    <span class="hljs-attr">body</span>: {
        <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;john@doe.com&quot;</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;password&quot;</span>
    },
    <span class="hljs-attr">headers</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">headers</span>() <span class="hljs-comment">// optional but would be useful to get the user IP, user agent, etc.</span>
})

<span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">verifyEmail</span>({
    <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;my_token&quot;</span>
    }
})
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>بُنيت نقاط نهاية Better Auth API فوق <a href="https://github.com/bekacru/better-call">better-call</a>، وهو إطار ويب صغير يتيح لك استدعاء نقاط نهاية REST API كأنها دوال عادية ويسمح لنا باستنتاج أنواع العميل من الخادم بسهولة.</p>
</div>
<h3 id="الحصول-على-كائن-headers-وresponse">الحصول على كائن <code>headers</code> و<code>Response</code></h3>
<p>عند استدعاء نقطة نهاية API على الخادم، فإنها سترجع كائن JavaScript قياسيًا أو مصفوفة مباشرةً لأنها مجرد استدعاء دالة عادي.</p>
<p>لكن هناك أوقات قد ترغب فيها بدلًا من ذلك في الحصول على الكائن <code>headers</code> أو <code>Response</code>. على سبيل المثال، إذا احتجت إلى الحصول على ملفات تعريف الارتباط (cookies) أو الترويسات.</p>
<h4>الحصول على <code>headers</code></h4>
<p>للحصول على <code>headers</code>، يمكنك تمرير الخيار <code>returnHeaders</code> إلى نقطة النهاية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { auth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth&quot;</span>

<span class="hljs-keyword">const</span> { headers, response } = <span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">signUpEmail</span>({
	<span class="hljs-attr">returnHeaders</span>: <span class="hljs-literal">true</span>,
	<span class="hljs-attr">body</span>: {
		<span class="hljs-attr">email</span>: <span class="hljs-string">&quot;john@doe.com&quot;</span>,
		<span class="hljs-attr">password</span>: <span class="hljs-string">&quot;password&quot;</span>,
		<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;John Doe&quot;</span>,
	},
});
</code></pre>
<p>سيكون <code>headers</code> كائن <code>Headers</code>، وهو ما يمكنك استخدامه للحصول على ملفات تعريف الارتباط أو الترويسات.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> cookies = headers.<span class="hljs-title function_">getSetCookie</span>();
<span class="hljs-keyword">const</span> customHeader = headers.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;x-custom-header&quot;</span>);
</code></pre>
<h4>الحصول على كائن <code>Response</code></h4>
<p>للحصول على كائن <code>Response</code>، يمكنك تمرير الخيار <code>asResponse</code> إلى نقطة النهاية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { auth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth&quot;</span>

<span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">signInEmail</span>({
    <span class="hljs-attr">body</span>: {
        <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;&quot;</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;&quot;</span>
    },
    <span class="hljs-attr">asResponse</span>: <span class="hljs-literal">true</span>
})
</code></pre>
<h3 id="معالجة-الأخطاء">معالجة الأخطاء</h3>
<p>عند استدعاء نقطة نهاية API على الخادم، فإنها ستطرح خطأً إذا فشل الطلب. يمكنك التقاط الخطأ ومعالجته كما تراه مناسبًا. مثيل الخطأ هو مثيل من <code>APIError</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { auth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth&quot;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">APIError</span>, isAPIError } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/api&quot;</span>;

<span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> auth.<span class="hljs-property">api</span>.<span class="hljs-title function_">signInEmail</span>({
        <span class="hljs-attr">body</span>: {
            <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;&quot;</span>,
            <span class="hljs-attr">password</span>: <span class="hljs-string">&quot;&quot;</span>
        }
    })
} <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isAPIError</span>(error)) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(error.<span class="hljs-property">message</span>, error.<span class="hljs-property">status</span>)
    }
}
</code></pre>
`,o={book:s,chapter:a,chapterTitle:n,slug:e,title:"API",headings:t,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,t as headings,p as html,e as slug,l as title};
