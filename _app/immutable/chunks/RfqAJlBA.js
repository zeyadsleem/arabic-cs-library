const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="keybindings-for-snippets-vscode",p="إسناد اختصارات لوحة المفاتيح للمقتطفات",o=[],c=`<p>لا تقتصر اختصارات لوحة المفاتيح المخصّصة على الأوامر المدمجة، إذ يمكنك أيضًا ربط المقتطفات أو المهام المخصّصة أو الميزات الخاصة بإضافة معيّنة.</p>
<p>فمثلًا، إن أردت مقتطفًا سريعًا لمكوّن React:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ctrl+alt+r&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;editor.action.insertSnippet&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;when&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;editorTextFocus &amp;&amp; editorLangId == &#x27;typescriptreact&#x27;&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;langId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;typescriptreact&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ReactFunctionalComponent&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يشغّل هذا المقتطف مقتطفًا معرّفًا مسبقًا اسمه <code>ReactFunctionalComponent</code> كلما ضغطت <code>Ctrl+Alt+R</code> في ملف TypeScript React. وهي طريقة أنيقة لتعزيز إيقاع برمجتك، خصوصًا إن كنت تُنشئ كثيرًا من الشيفرة الجاهزة المتكرّرة.</p>
<blockquote>
<p><strong>لا أستخدم هذه الميزة كثيرًا.</strong></p>
<p>يجب أن أستخدمها، لكني قلق جدًا من أن تنفد اختصارات لوحة المفاتيح المخصّصة لأشياء أخرى™.</p>
</blockquote>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:o,html:c};export{s as book,n as chapter,a as chapterTitle,l as default,o as headings,c as html,t as slug,p as title};
