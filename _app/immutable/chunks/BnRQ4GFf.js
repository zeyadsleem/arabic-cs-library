const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="creating-a-multi-root-workspace",o="إنشاء مساحات عمل متعدّدة الجذور",p=[{depth:2,id:"تشريح-ملف-code-workspace",text:"تشريح ملف .code-workspace"}],l=`<ol>
<li><strong>افتح Visual Studio Code:</strong> شغّل Visual Studio Code.</li>
<li><strong>أغلق أي مجلد أو مساحة عمل مفتوحة:</strong> إن كانت لديك مساحة عمل أو مجلد مفتوح، فأغلقه بالانتقال إلى <strong>File &gt; Close Folder</strong> أو <strong>File &gt; Close Workspace</strong>.</li>
<li><strong>أنشئ مساحة عمل فارغة:</strong> انتقل إلى <strong>File &gt; Save Workspace As…</strong>. وسيفتح ذلك نافذة حفظ.</li>
<li><strong>اختر الموضع والاسم:</strong> اختر موضعًا في نظام ملفاتك تريد حفظ ملف مساحة العمل فيه. وأعطِ مساحة عملك اسمًا وصفيًا (مثل <code>my-complex-project.code-workspace</code>). وسيحفظ Visual Studio Code ملفًا بامتداد <code>.code-workspace</code>.</li>
<li><strong>أضف مجلدات إلى مساحة العمل:</strong> بعد إنشاء مساحة العمل الفارغة، سترى لوحة Explorer فارغة. ولإضافة مجلدات، انقر على <strong>File &gt; Add Folder to Workspace…</strong>.</li>
<li><strong>اختر المجلدات:</strong> في نافذة الملفات، انتقل إلى المجلدات التي تريد ضمّها إلى مساحة العمل متعدّدة الجذور واخترها. ويمكنك اختيار عدّة مجلدات من مواضع مختلفة. وانقر <strong>Add</strong>.</li>
<li><strong>احفظ مساحة العمل (إن لم تكن محفوظة بالفعل):</strong> إن لم تكن قد حفظت مساحة العمل بعد، أو إن كنت قد أجريت تغييرات، فانتقل إلى <strong>File &gt; Save Workspace</strong> لحفظ إعداد مساحة العمل الحالي.</li>
</ol>
<h2 id="تشريح-ملف-code-workspace">تشريح ملف <code>.code-workspace</code></h2>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;folders&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;path/to/folder1&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;path/to/folder2&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Custom Folder Name&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;uri&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;git://repo-url?ref#folder-in-repo&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Remote Repository Folder&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;settings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;editor.tabSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;files.autoSave&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;afterDelay&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;extensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;recommendations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ms-vscode.vscode-typescript&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dbaeumer.vscode-eslint&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>حين ننتقل إلى المهام والتنقيح، سنرى أنه يمكنك تعريفها أيضًا في ملف <code>.code-workspace</code>.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,l as html,t as slug,o as title};
