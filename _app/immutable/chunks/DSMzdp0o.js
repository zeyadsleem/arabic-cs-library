const s="kinney",n="visual-studio-code",a="Visual Studio Code",p="compound-tasks-vscode",t="المهام المركّبة",l=[{depth:2,id:"فهم-اعتماديات-المهام-dependson-و-dependsorder",text:"فهم اعتماديات المهام: dependsOn و dependsOrder"},{depth:3,id:"sequence-الافتراضي",text:"sequence (الافتراضي)"},{depth:3,id:"parallel",text:"parallel"},{depth:3,id:"any",text:"any"},{depth:3,id:"دمج-الاعتماديات",text:"دمج الاعتماديات"}],u=`<p>تتيح لك المهام المركّبة تشغيل مهام متعددة بالتتابع. ويفيد ذلك في تنسيق مسارات عمل معقّدة.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Task A&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;echo Task A&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Task B&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;echo Task B&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Run A and B&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Task A&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Task B&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOrder&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sequence&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><code>&quot;dependsOn&quot;: [&quot;Task A&quot;, &quot;Task B&quot;]</code> : ستشغّل مهمة <code>Run A and B</code> المهام ذات الوسمين <code>Task A</code> و <code>Task B</code>.</li>
<li><code>&quot;dependsOrder&quot;: &quot;sequence&quot;</code>: ستُشغَّل المهام بالترتيب المعرّف في مصفوفة <code>dependsOn</code>.</li>
</ul>
<h2 id="فهم-اعتماديات-المهام-dependson-و-dependsorder">فهم اعتماديات المهام: <code>dependsOn</code> و <code>dependsOrder</code></h2>
<p>عند تنسيق مهام متعددة، تحتاج إلى التحكّم في المهام التي تُشغَّل (<code>dependsOn</code>) وفي طريقة تشغيلها بالنسبة إلى بعضها (<code>dependsOrder</code>). وتقبل خاصية <code>dependsOrder</code> ثلاث قيم، لكل منها سلوك مختلف:</p>
<h3 id="sequence-الافتراضي"><code>sequence</code> (الافتراضي)</h3>
<p>تعمل المهام تسلسليًا بالترتيب المذكور تمامًا في مصفوفة <code>dependsOn</code>. ويجب أن تكتمل كل مهمة قبل أن تبدأ التالية.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Sequential Build and Test&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Clean&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Build&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Test&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOrder&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sequence&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وهذا يضمن انتهاء “Clean” قبل بدء “Build”، وانتهاء “Build” قبل بدء “Test”. وإذا فشلت أي مهمة، فلا تعمل المهام اللاحقة.</p>
<h3 id="parallel"><code>parallel</code></h3>
<p>تبدأ كل المهام التابعة في الوقت نفسه وتعمل بالتوازي.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Parallel Assets Build&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Compile CSS&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Compile JavaScript&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Optimize Images&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOrder&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;parallel&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وهذا يطلق مهام ترجمة الأصول الثلاث كلها دفعة واحدة، ما يمكن أن يسرّع أوقات البناء بدرجة كبيرة للعمليات المستقلة.</p>
<h3 id="any"><code>any</code></h3>
<p>يبدأ Visual Studio Code المهام بالتوازي، لكن المهمة الرئيسية تكتمل بمجرد انتهاء أي مهمة تابعة. ويفيد ذلك في سيناريوهات «حالة التسابق».</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Development Server&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Start API Server&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Start Frontend Server&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOrder&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;any&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وفي هذا المثال، تُعدّ مهمة “Development Server” مكتملة عندما يبدأ خادم الـ API أو خادم الواجهة الأمامية بنجاح.</p>
<h3 id="دمج-الاعتماديات">دمج الاعتماديات</h3>
<p>يمكنك إنشاء أشجار مهام معقّدة بدمج الاعتماديات. مثلًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Clean&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rm -rf dist&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Build Frontend&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build:frontend&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Clean&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Build Backend&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build:backend&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Clean&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Run Tests&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm test&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Build Frontend&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Build Backend&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOrder&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;sequence&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Full Pipeline&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Run Tests&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>في هذا المثال:</p>
<ol>
<li>تعمل مهمة “Clean” أولًا</li>
<li>ثم تعمل “Build Frontend” و “Build Backend” (وكلتاهما تعتمد على “Clean”)</li>
<li>وبعد اكتمال البناءين، تُنفَّذ “Run Tests” (وهي تعتمد على البناءين)</li>
<li>وأخيرًا تكتمل “Full Pipeline” بعد انتهاء “Run Tests”</li>
</ol>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>انتبه إلى حالات التسابق المحتملة عند استخدام <code>parallel</code> مع مهام قد تتعارض (مثل مهام تكتب في الملفات نفسها). وفي هذه الحالات، يكون <code>sequence</code> أكثر أمانًا.</p>
</blockquote>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:l,html:u};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,u as html,p as slug,t as title};
