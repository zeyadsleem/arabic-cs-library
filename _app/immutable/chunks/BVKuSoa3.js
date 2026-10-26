const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="vscode-tasks",o="مهام Visual Studio Code",p=[{depth:2,id:"لماذا-تستخدم-المهام-في-visual-studio-code",text:"لماذا تستخدم المهام في Visual Studio Code؟"},{depth:2,id:"البنية-الأساسية",text:"البنية الأساسية"},{depth:3,id:"ملاحظات-توضيحية",text:"ملاحظات توضيحية"},{depth:2,id:"أنواع-المهام-الشائعة",text:"أنواع المهام الشائعة"},{depth:3,id:"مهام-الصدفة",text:"مهام الصدفة"},{depth:3,id:"مهام-العمليات",text:"مهام العمليات"},{depth:3,id:"مهام-gulp-و-grunt-و-msbuild-و-make",text:"مهام Gulp و Grunt و MSBuild و Make"}],l=`<p><code>tasks.json</code> ملف تهيئة في Visual Studio Code يعرّف مهامًا مؤتمتة يمكنك تشغيلها من المحرّر. فبدلًا من كتابة أوامر البناء أو الاختبار نفسها يدويًا في الطرفية (أواه، من يريد إجهادًا متكرّرًا؟)، يمكنك النقر على زر، أو الضغط على اختصار، أو ترك Visual Studio Code يشغّل هذه المهام تلقائيًا.</p>
<p>ويقع داخل مجلد <code>.vscode</code>، عادةً في:</p>
<pre><code class="language-bash">.vscode/tasks.json
</code></pre>
<p>وفي <a href="https://stevekinney.com/courses/visual-studio-code/multi-root-workspaces">مساحات العمل متعددة الجذور</a>، يمكن لكل مجلد أن يحتفظ بملف <code>tasks.json</code> الخاص به، أو يمكنك ضبط ملف مهام شامل واحد لمساحة عملك.</p>
<h2 id="لماذا-تستخدم-المهام-في-visual-studio-code">لماذا تستخدم المهام في Visual Studio Code؟</h2>
<ol>
<li><strong>الاتساق</strong>: يمكن لكل أعضاء الفريق مشاركة الأوامر والمعاملات نفسها، فلا يستطيع أحد أن يقول: «لكنها تعمل على جهازي…»</li>
<li><strong>السرعة</strong>: مع المهام، ما عليك إلا الضغط على مجموعة مفاتيح (<code>Ctrl+Shift+B</code> على Windows/Linux أو <code>Cmd+Shift+B</code> على macOS افتراضيًا) أو اختيار مهمة من لوحة الأوامر لتشغيل كل شيء من سكربتات البناء إلى أوامر Docker.</li>
<li><strong>الأتمتة</strong>: اربط المهام لتبني وتختبر وتفحص وتنشر دفعة واحدة.</li>
<li><strong>التكامل</strong>: تنسجم المهام جيدًا مع التصحيح ومطابِقات المشكلات في Visual Studio Code (كشف الأخطاء المدمج في شيفرتك).</li>
</ol>
<h2 id="البنية-الأساسية">البنية الأساسية</h2>
<p>وإليك مثالًا مبسّطًا لملف <code>tasks.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-comment">// See https://code.visualstudio.com/docs/editor/tasks</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Build the project&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;$tsc&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;kind&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;build&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;isDefault&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="ملاحظات-توضيحية">ملاحظات توضيحية</h3>
<ul>
<li><strong>version</strong>: يجب أن يكون <code>&quot;2.0.0&quot;</code> في كل الاستخدامات الحديثة.</li>
<li><strong>tasks</strong>: مصفوفة من الكائنات، يصف كل منها مهمة محدّدة.</li>
<li><strong>label</strong>: اسم مقروء يظهر عند تشغيل المهام في Visual Studio Code.</li>
<li><strong>type</strong>: غالبًا <code>shell</code> (ينفّذ في صدفة نظام تشغيلك) أو <code>process</code> (يشغّل عملية فرعية).</li>
<li><strong>command</strong>: الأمر الفعلي الذي سيُنفَّذ (<code>npm run build</code> و <code>gulp</code> و <code>make</code> وغيرها).</li>
<li><strong>problemMatcher</strong>: يخبر Visual Studio Code كيف يحلّل أخطاء المصرّف أو الاختبارات أو أداة فحص الشيفرة وتحذيراتها. ويطابق <code>$tsc</code> مخرجات مصرّف TypeScript، و <code>$eslint-stylish</code> مخرجات ESLint، وهكذا.</li>
<li><strong>group</strong>: يمكن تجميع المهام تحت <code>&quot;build&quot;</code> أو <code>&quot;test&quot;</code> أو مجموعات مخصّصة.</li>
</ul>
<h2 id="أنواع-المهام-الشائعة">أنواع المهام الشائعة</h2>
<h3 id="مهام-الصدفة">مهام الصدفة</h3>
<p>السيناريو الأكثر شيوعًا: تشغيل سكربت أو أمر في صدفة نظامك. وهو ممتاز للبناءات والاختبارات السريعة.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Shell Task Example&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;echo Hello from the shell!&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="مهام-العمليات">مهام العمليات</h3>
<p>يشغّل الأمر كعملية فرعية دون توسّعات الصدفة المعتادة. وقد تحتاج إلى تحديد <code>command</code> و <code>args</code> بشكل أكثر صراحةً:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Process Task Example&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;process&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;app.js&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="مهام-gulp-و-grunt-و-msbuild-و-make">مهام Gulp و Grunt و MSBuild و Make</h3>
<p>يستطيع Visual Studio Code اكتشاف بعض المهام تلقائيًا من تعريفات مشروع gulp أو grunt أو MSBuild. ومع ذلك، يمكنك تعريفها يدويًا في tasks.json إن أردت تحكّمًا أكبر أو أسلوبًا مخصّصًا.</p>
<blockquote>
<p><strong>لا أستطيع الإجابة عن أي أسئلة حول Gulp أو Grunt أو MSBuild أو Make</strong></p>
<p>لا أستخدم أيًا من هذه الأدوات، على الأقل في هذه الأيام، ولا أستطيع الحديث عنها.</p>
</blockquote>
`,u={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,u as default,p as headings,l as html,t as slug,o as title};
