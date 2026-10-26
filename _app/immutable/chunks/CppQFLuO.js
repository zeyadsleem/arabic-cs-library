const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="vscode-task-examples",p="المهام: أمثلة",l=[{depth:2,id:"مهام-لمشروع-vite",text:"مهام لمشروع Vite"},{depth:3,id:"إضافة-خادم-خلفي",text:"إضافة خادم خلفي"},{depth:2,id:"أمثلة-أخرى",text:"أمثلة أخرى"},{depth:3,id:"ترجمة-typescript-ثم-تشغيل-اختبارات-الوحدة",text:"ترجمة TypeScript ثم تشغيل اختبارات الوحدة"},{depth:3,id:"بناء-docker-ودفعه",text:"بناء Docker ودفعه"},{depth:2,id:"استخدام-المتغيرات-والمدخلات",text:"استخدام المتغيّرات والمدخلات"}],u=`<h2 id="مهام-لمشروع-vite">مهام لمشروع Vite</h2>
<p>في المثال أدناه، لدينا مهام منفصلة لفحص الشيفرة والاختبار والبناء وتشغيل تطبيق Vite.</p>
<p>توسم خاصية <code>&quot;group&quot;</code> مهمة الفحص كمهمة متعلّقة بالبناء ومهمة الاختبار كمهمة في مجموعة الاختبار، ما يتيح وصولًا سريعًا عبر أمري <strong>Run Build Task</strong> و <strong>Run Test Task</strong>. وتشغّل مهمة البناء بناء مشروعك للإنتاج (باستخدام Vite أو <code>tsc</code>) وتربط مطابِق مشكلات TypeScript لالتقاط أخطاء الترجمة.</p>
<p>وتعمل مهمة خادم التطوير في الخلفية لتستمر في العمل بينما تراقب تغييرات الملفات. ووسمها بـ <code>&quot;isBackground&quot;: true</code> يمنع Visual Studio Code من اعتبارها منتهية، فتبقى عاملة حتى توقفها يدويًا.</p>
<pre><code class="language-json"><span class="hljs-comment">// .vscode/tasks.json (excerpt)</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Lint&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;script&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;lint&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Allows Run Build Task to trigger lint</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;$eslint-stylish&quot;</span><span class="hljs-punctuation">]</span> <span class="hljs-comment">// Highlights ESLint errors in Problems pane</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Test&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run test&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Or a direct test runner command</span>
      <span class="hljs-attr">&quot;group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;test&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Allows Run Test Task to trigger tests</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span> <span class="hljs-comment">// (Attach a matcher if test output can be parsed for errors)</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Build (Frontend)&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Runs Vite or tsc build for frontend</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;$tsc&quot;</span><span class="hljs-punctuation">]</span> <span class="hljs-comment">// Use TypeScript matcher to catch type errors</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Dev Server (Frontend)&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;script&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dev&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Launches Vite dev server</span>
      <span class="hljs-attr">&quot;isBackground&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Mark as long-running background task</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$tsc-watch&quot;</span> <span class="hljs-comment">// Treat TS compile errors during dev</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إضافة-خادم-خلفي">إضافة خادم خلفي</h3>
<p>فلنفترض الآن أننا أردنا <em>أيضًا</em> تشغيل واجهة API الخلفية. فيمكننا إضافة بعض المهام الإضافية.</p>
<pre><code class="language-json"><span class="hljs-comment">// Compound task to run frontend and backend concurrently</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Dev: Full Stack&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Dev Server (Frontend)&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Dev Server (API)&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-comment">// By default, dependsOn tasks run in parallel in separate terminals ([Integrate with External Tools via Tasks](https://code.visualstudio.com/docs/editor/tasks#:~:text=You%20can%20also%20compose%20tasks,executed%20in%20parallel%20by%20default))</span>
<span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-comment">// The backend API server task might be defined as:</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Dev Server (API)&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;nodemon src/server.ts&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;isBackground&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>  <span class="hljs-comment">// (Use a matcher if you want to capture errors in Problems)</span>
<span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-comment">// Sequential compound task: lint -&gt; test -&gt; build</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Check &amp; Build All&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Lint&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Test&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Build (Frontend)&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOrder&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sequence&quot;</span>               <span class="hljs-comment">// Run tasks one by one in the given order ([Integrate with External Tools via Tasks](https://code.visualstudio.com/docs/editor/tasks#:~:text=))</span>
  <span class="hljs-comment">// &quot;Check &amp; Build All&quot; will run Lint, then Test, then Build (Frontend) sequentially</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="أمثلة-أخرى">أمثلة أخرى</h2>
<h3 id="ترجمة-typescript-ثم-تشغيل-اختبارات-الوحدة">ترجمة TypeScript ثم تشغيل اختبارات الوحدة</h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Compile TypeScript&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc -p tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$tsc&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Run Tests&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run test&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;test&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Compile TypeScript&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// runs compile first, then test</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>يضمن <code>dependsOn</code> اكتمال <code>Compile TypeScript</code> قبل <code>Run Tests</code>.</li>
<li>ضُبط <code>problemMatcher</code> على <code>$tsc</code>، ما يتيح لـ Visual Studio Code إبراز أخطاء TS في المحرّر.</li>
</ul>
<h3 id="بناء-docker-ودفعه">بناء Docker ودفعه</h3>
<p>افترض أن لديك ملف Dockerfile وتريد البناء والدفع إلى سجل حاويات في خطوة واحدة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Docker Build&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;docker build -t myrepo/myimage:latest .&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Docker Push&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;docker push myrepo/myimage:latest&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Docker Build&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>لا توجد مطابِقات مشكلات مهمة هنا، لكن المهام تمنحك مع ذلك حلًا مريحًا بنقرة واحدة.</li>
<li>ونربط المهام بـ <code>dependsOn</code>.</li>
</ul>
<h2 id="استخدام-المتغيرات-والمدخلات">استخدام المتغيّرات والمدخلات</h2>
<p>يدعم Visual Studio Code <a href="https://code.visualstudio.com/docs/editor/variables-reference">استبدال المتغيّرات</a> ومدخلات المستخدم. ولنسمح للمستخدم بإدخال بيئة مخصّصة، مثل <code>production</code> أو <code>staging</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Deploy&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run deploy -- --env \${input:whichEnv}&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;inputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;whichEnv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pickString&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Select environment to deploy to&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;options&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;development&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;staging&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;production&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;default&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;development&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>عند تشغيل <code>Deploy</code>، سيعرض Visual Studio Code منتقيًا لاختيار البيئة، ويستبدل اختيارك في الأمر.</li>
<li>وهو مثالي للسكربتات التي تختلف حسب البيئة أو حسب معاملات أخرى.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:u};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,u as html,t as slug,p as title};
