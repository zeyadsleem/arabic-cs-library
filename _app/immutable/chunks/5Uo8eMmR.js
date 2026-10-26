const s="kinney",a="visual-studio-code",n="Visual Studio Code",t="vscode-settings-for-managing-files",l="إعدادات إدارة الملفات",e=[{depth:2,id:"filesassociations",text:"files.associations"},{depth:2,id:"filesexclude",text:"files.exclude"},{depth:2,id:"ضبط-لغة-افتراضية-للملفات-الفارغة-filesdefaultlanguage",text:"ضبط لغة افتراضية للملفات الفارغة: files.defaultLanguage"},{depth:2,id:"الحفظ-التلقائي-filesautosave",text:"الحفظ التلقائي (files.autoSave)"},{depth:2,id:"قص-المسافات-البيضاء-في-نهاية-الأسطر-filestrimtrailingwhitespace",text:"قصّ المسافات البيضاء في نهاية الأسطر : files.trimTrailingWhitespace"},{depth:2,id:"إدراج-سطر-جديد-نهائي-filesinsertfinalnewline",text:"إدراج سطر جديد نهائي: files.insertFinalNewline"}],p=`<p>تتيح لك فئة الإعدادات <strong>Files and Workspaces</strong> ضبط طريقة تعامل Visual Studio Code مع الملفات والمجلدات ومساحات العمل، ما يبسّط إدارة المشاريع وربط أنواع الملفات.</p>
<h2 id="filesassociations"><code>files.associations</code></h2>
<p>يمكنك ربط امتدادات الملفات بأوضاع لغات محدّدة. وهذا بالغ الأهمية في تلوين الصياغة وIntelliSense والميزات الخاصة بكل لغة.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;files.associations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
	<span class="hljs-attr">&quot;*.module.css&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;css&quot;</span><span class="hljs-punctuation">,</span>
	<span class="hljs-attr">&quot;*.component.ts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;typescriptreact&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ويمكنك أيضًا تجاوز اكتشاف اللغة لملفات محدّدة باستخدام أنماط glob:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;files.associations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
	<span class="hljs-attr">&quot;**/*.conf&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ini&quot;</span> <span class="hljs-comment">// Treat all .conf files as INI files</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="filesexclude"><code>files.exclude</code></h2>
<p>حدّد أنماط الملفات التي تريد استثناءها من مستكشف الملفات والبحث وأمر «Go to File». ويفيد ذلك في إخفاء مخلفات البناء ومجلدات الاعتمادات (مثل <code>node_modules</code>) والملفات المؤقتة.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;files.exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;**/.git&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/node_modules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;**/dist&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>من المنطقي أكثر على الأرجح أن يكون هذا إعدادًا لمساحة العمل، لأن معظم المتّهمين المعتادين مُدرجون افتراضيًا بالفعل.</p>
<h2 id="ضبط-لغة-افتراضية-للملفات-الفارغة-filesdefaultlanguage">ضبط لغة افتراضية للملفات الفارغة: <code>files.defaultLanguage</code></h2>
<p>يتيح لك <code>files.defaultLanguage</code> ضبط وضع اللغة الافتراضي للملفات الجديدة أو الملفات التي ليس لها امتداد معروف.</p>
<p>وحسب المشروع، أضبط هذا عادةً على <code>markdown</code> أو <code>typescript</code>.</p>
<h2 id="الحفظ-التلقائي-filesautosave">الحفظ التلقائي (<code>files.autoSave</code>)</h2>
<p>للحفاظ على سير عمل سلس دون قلق دائم على حفظ عملك، فكّر في تمكين <code>files.autoSave</code>. يحفظ هذا الإعداد تغييراتك تلقائيًا إما بعد مهلة محدّدة، وإما عند انتقال التركيز بعيدًا عن المحرّر. وهذا يضمن أن عملك محدّث دائمًا، ويساعد على منع فقدان البيانات دون قصد.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;files.autoSave&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;afterDelay&quot;</span><span class="hljs-punctuation">,</span>
<span class="hljs-attr">&quot;files.autoSaveDelay&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1000</span>
</code></pre>
<blockquote>
<p><strong>يفيد الحفظ التلقائي بوجه خاص في جلسات البرمجة الطويلة، إذ يبقي تغييراتك آمنة دون مقاطعة تركيزك.</strong></p>
</blockquote>
<h2 id="قص-المسافات-البيضاء-في-نهاية-الأسطر-filestrimtrailingwhitespace">قصّ المسافات البيضاء في نهاية الأسطر : <code>files.trimTrailingWhitespace</code></h2>
<p>الشيفرة النظيفة أسهل صيانةً ومراجعة. وبتمكين <code>files.trimTrailingWhitespace</code>، يزيل Visual Studio Code تلقائيًا أي مسافات زائدة في نهاية الأسطر كلما حفظت ملفًا. ولا يحسّن ذلك جمال شيفرتك فحسب، بل يساعد أيضًا على منع فروق غير ضرورية في التحكّم في الإصدارات.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;files.trimTrailingWhitespace&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
</code></pre>
<blockquote>
<p><strong>الملف الأنظف لا يبدو أفضل فحسب، بل يقلّل أيضًا الضوضاء في سجل الإيداعات، فيصبح مراجعة الشيفرة أكثر سلاسة.</strong></p>
</blockquote>
<h2 id="إدراج-سطر-جديد-نهائي-filesinsertfinalnewline">إدراج سطر جديد نهائي: <code>files.insertFinalNewline</code></h2>
<p>تشترط بعض معايير البرمجة أن تنتهي الملفات بمحرف سطر جديد. ومع إعداد <code>files.insertFinalNewline</code>، يضيف VS Code تلقائيًا سطرًا جديدًا في نهاية الملف عند الحفظ. ويساعد هذا التعديل الصغير على تفادي تحذيرات أدوات فحص الشيفرة، ويضمن الاتساق في قاعدتك البرمجية.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;files.insertFinalNewline&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
</code></pre>
<blockquote>
<p><strong>إضافة سطر جديد نهائي ممارسة بسيطة تسهم في تنسيق شيفرة أنظف وتعاون أفضل بين بيئات تطوير متنوعة.</strong></p>
</blockquote>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,p as html,t as slug,l as title};
