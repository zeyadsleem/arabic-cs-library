const s="better-auth",a="concepts",n="المفاهيم",t="typescript",p="TypeScript",e=[{depth:2,id:"تكوين-typescript",text:"تكوين TypeScript"},{depth:3,id:"الوضع-الصارم",text:"الوضع الصارم"},{depth:2,id:"استنتاج-الأنواع",text:"استنتاج الأنواع"},{depth:2,id:"الحقول-الإضافية",text:"الحقول الإضافية"},{depth:3,id:"الخاصية-input",text:"الخاصية input"},{depth:3,id:"استنتاج-الحقول-الإضافية-في-العميل",text:"استنتاج الحقول الإضافية في العميل"}],l=`<h1>TypeScript (/docs/concepts/typescript)</h1>
<p>تعرّف على تكوين TypeScript من أجل Better Auth، بما في ذلك الوضع الصارم، واستنتاج الأنواع للجلسات والمستخدمين، وتعريف حقول إضافية، واستنتاج الحقول الإضافية في العميل.</p>
<p>صُمّم Better Auth ليكون آمنًا من حيث الأنواع. بُني كلٌّ من العميل والخادم باستخدام TypeScript، ما يتيح لك استنتاج الأنواع بسهولة.</p>
<h2 id="تكوين-typescript">تكوين TypeScript</h2>
<h3 id="الوضع-الصارم">الوضع الصارم</h3>
<p>صُمّم Better Auth ليعمل مع الوضع الصارم في TypeScript. نوصي بتمكين الوضع الصارم في ملف تكوين TypeScript لديك:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>إذا لم تتمكّن من ضبط <code>strict</code> على <code>true</code>، فيمكنك تمكين <code>strictNullChecks</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;strictNullChecks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>عندما يكون <code>strict</code> مساويًا لـ <code>true</code>، يُفعَّل <code>strictNullChecks</code> أيضًا. إذا ضبطت <code>strictNullChecks</code> صراحةً على <code>false</code>، فقد تحدث مشكلات في استنتاج الأنواع.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>إذا واجهت مشكلات مع تجاوز استنتاج TypeScript الحد الأقصى للطول الذي سيسلسله المترجم، فيُرجى التأكد من اتباع التعليمات أعلاه، وكذلك التأكد من أن كلا <code>declaration</code> و<code>composite</code> غير مُمكَّنين.</p>
</div>
<h2 id="استنتاج-الأنواع">استنتاج الأنواع</h2>
<p>يقدّم كلٌّ من SDK العميل والخادم أنواعًا يمكن استنتاجها باستخدام الخاصية <code>$Infer</code>. يمكن للإضافات توسيع الأنواع الأساسية مثل <code>User</code> و<code>Session</code>، ويمكنك استخدام <code>$Infer</code> لاستنتاج هذه الأنواع. علاوةً على ذلك، يمكن للإضافات توفير أنواع إضافية يمكن استنتاجها أيضًا عبر <code>$Infer</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/client&quot;</span>

<span class="hljs-keyword">const</span> authClient = <span class="hljs-title function_">createAuthClient</span>()

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Session</span> = <span class="hljs-keyword">typeof</span> authClient.<span class="hljs-property">$Infer</span>.<span class="hljs-property">Session</span>
</code></pre>
<p>يتضمّن النوع <code>Session</code> كلا الخاصيتين <code>session</code> و<code>user</code>. تمثّل الخاصية user نوع كائن المستخدم، وتمثّل الخاصة <code>session</code> نوع كائن <code>session</code>.</p>
<p>يمكنك أيضًا استنتاج الأنواع من جهة الخادم.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Database</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-sqlite3&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">database</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Database</span>(<span class="hljs-string">&quot;database.db&quot;</span>)
})

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Session</span> = <span class="hljs-keyword">typeof</span> auth.<span class="hljs-property">$Infer</span>.<span class="hljs-property">Session</span>
</code></pre>
<h2 id="الحقول-الإضافية">الحقول الإضافية</h2>
<p>يتيح لك Better Auth إضافة حقول إضافية إلى كائنَي المستخدم والجلسة. تُستنتَج جميع الحقول الإضافية بشكل صحيح وتكون متاحة من جهتي الخادم والعميل.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Database</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-sqlite3&quot;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">database</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Database</span>(<span class="hljs-string">&quot;database.db&quot;</span>),
    <span class="hljs-attr">user</span>: {
       <span class="hljs-attr">additionalFields</span>: {
          <span class="hljs-attr">role</span>: {
              <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;string&quot;</span>,
              <span class="hljs-attr">input</span>: <span class="hljs-literal">false</span>
            } 
        }
    }
   
})

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Session</span> = <span class="hljs-keyword">typeof</span> auth.<span class="hljs-property">$Infer</span>.<span class="hljs-property">Session</span>
</code></pre>
<p>في المثال أعلاه، أضفنا حقل <code>role</code> إلى كائن المستخدم. أصبح هذا الحقل متاحًا الآن على النوع <code>Session</code>.</p>
<h3 id="الخاصية-input">الخاصية <code>input</code></h3>
<p>تحدّد الخاصية <code>input</code> في تكوين حقل إضافي ما إذا كان ينبغي تضمين الحقل في مُدخل المستخدم. تكون هذه الخاصية افتراضيًا <code>true</code>، أي أن الحقل سيكون جزءًا من مُدخل المستخدم أثناء عمليات مثل التسجيل.</p>
<p>لمنع حقل من أن يكون جزءًا من مُدخل المستخدم، يجب ضبط <code>input: false</code> صراحةً:</p>
<pre><code class="language-ts"><span class="hljs-attr">additionalFields</span>: {
    <span class="hljs-attr">role</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;string&quot;</span>,
        <span class="hljs-attr">input</span>: <span class="hljs-literal">false</span>
    }
}
</code></pre>
<p>عندما يُضبط <code>input</code> على <code>false</code>، يُستبعد الحقل من مُدخل المستخدم، ما يمنع المستخدمين من تمرير قيمة له.</p>
<p>افتراضيًا، تُضمَّن الحقول الإضافية في مُدخل المستخدم، وهو ما قد يؤدي إلى ثغرات أمنية إن لم تُعالَج بعناية. بالنسبة إلى الحقول التي لا ينبغي أن يضبطها المستخدم، مثل <code>role</code>، من الضروري ضبط <code>input: false</code> في التكوين.</p>
<h3 id="استنتاج-الحقول-الإضافية-في-العميل">استنتاج الحقول الإضافية في العميل</h3>
<p>لضمان استنتاج الأنواع الصحيح للحقول الإضافية من جهة العميل، تحتاج إلى إعلام العميل بهذه الحقول. هناك طريقتان لتحقيق ذلك، اعتمادًا على بنية مشروعك:</p>
<ol>
<li>لإعدادات المستودع الأحادي أو المشروع الواحد</li>
</ol>
<p>إذا كان كود الخادم والعميل لديك في المشروع نفسه، فيمكنك استخدام إضافة <code>inferAdditionalFields</code> لاستنتاج الحقول الإضافية تلقائيًا من تكوين الخادم لديك.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { inferAdditionalFields } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/client/plugins&quot;</span>;
<span class="hljs-keyword">import</span> { createAuthClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/client&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { auth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@/lib/auth&quot;</span>; <span class="hljs-comment">// Import the auth instance as a type</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> authClient = <span class="hljs-title function_">createAuthClient</span>({
  <span class="hljs-attr">plugins</span>: [inferAdditionalFields&lt;<span class="hljs-keyword">typeof</span> auth&gt;()],
});
</code></pre>
<ol start="2">
<li>لمشاريع العميل والخادم المنفصلة</li>
</ol>
<p>إذا كان العميل والخادم لديك في مشروعين منفصلين، فستحتاج إلى تحديد الحقول الإضافية يدويًا عند إنشاء عميل المصادقة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createAuthClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/client&quot;</span>;
<span class="hljs-keyword">import</span> { inferAdditionalFields } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth/client/plugins&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> authClient = <span class="hljs-title function_">createAuthClient</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">inferAdditionalFields</span>({
      <span class="hljs-attr">user</span>: {
        <span class="hljs-attr">role</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;string&quot;</span>
        }
      }
  })],
});
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,l as html,t as slug,p as title};
