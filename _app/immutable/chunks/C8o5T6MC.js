const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="building-a-simple-vscode-extension",p="بناء إضافة بسيطة",c=[{depth:2,id:"ربط-ملف-packagejson",text:"ربط ملف package.json"}],l=`<p>لنبنِ إضافة بسيطة تعثر على جميع عبارات <code>FIXME</code> في ملف JavaScript ثم تُزيّنها بحيث يمكننا رؤيتها بسهولة.</p>
<p>في <code>extension.js</code>، لنجعل نضيف ما يلي:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> vscode = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;vscode&#x27;</span>);

<span class="hljs-comment">// Step A: Define a decoration type</span>
<span class="hljs-keyword">const</span> decorationType = vscode.<span class="hljs-property">window</span>.<span class="hljs-title function_">createTextEditorDecorationType</span>({
  <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">&#x27;rgba(255, 0, 0, 0.3)&#x27;</span>, <span class="hljs-comment">// semi-transparent red</span>
});

<span class="hljs-comment">// Step B: Function to find and decorate words</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">decorateWords</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> editor = vscode.<span class="hljs-property">window</span>.<span class="hljs-property">activeTextEditor</span>;
  <span class="hljs-keyword">if</span> (!editor) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">const</span> text = editor.<span class="hljs-property">document</span>.<span class="hljs-title function_">getText</span>();
  <span class="hljs-keyword">const</span> regex = <span class="hljs-regexp">/\\bFIXME\\b/g</span>;

  <span class="hljs-keyword">const</span> ranges = [...text.<span class="hljs-title function_">matchAll</span>(regex)].<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">match</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> startPos = editor.<span class="hljs-property">document</span>.<span class="hljs-title function_">positionAt</span>(match.<span class="hljs-property">index</span>);
    <span class="hljs-keyword">const</span> endPos = editor.<span class="hljs-property">document</span>.<span class="hljs-title function_">positionAt</span>(match.<span class="hljs-property">index</span> + match[<span class="hljs-number">0</span>].<span class="hljs-property">length</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> vscode.<span class="hljs-title class_">Range</span>(startPos, endPos);
  });

  editor.<span class="hljs-title function_">setDecorations</span>(decorationType, ranges);
}

<span class="hljs-comment">// Step C: Hook the function into editor/document change events</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">subscribeToDocumentChanges</span>(<span class="hljs-params">context</span>) {
  <span class="hljs-comment">// Re-run whenever text changes</span>
  vscode.<span class="hljs-property">workspace</span>.<span class="hljs-title function_">onDidChangeTextDocument</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">decorateWords</span>(), <span class="hljs-literal">null</span>, context.<span class="hljs-property">subscriptions</span>);
  <span class="hljs-comment">// Re-run whenever the active editor changes (switch tabs, etc.)</span>
  vscode.<span class="hljs-property">window</span>.<span class="hljs-title function_">onDidChangeActiveTextEditor</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">decorateWords</span>(), <span class="hljs-literal">null</span>, context.<span class="hljs-property">subscriptions</span>);

  <span class="hljs-comment">// Run at least once on activation</span>
  <span class="hljs-title function_">decorateWords</span>();
}

<span class="hljs-comment">// This is your extension&#x27;s main activation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">activate</span>(<span class="hljs-params">context</span>) {
  <span class="hljs-comment">// Register the decorator logic with events</span>
  <span class="hljs-title function_">subscribeToDocumentChanges</span>(context);
}

<span class="hljs-comment">// export (so VS Code recognizes these functions)</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  activate,
  <span class="hljs-attr">deactivate</span>: <span class="hljs-function">() =&gt;</span> {},
};
</code></pre>
<p>هذه الشيفرة:</p>
<ul>
<li>تُنشئ نمط تزيين (خلفية ضاربة إلى الحمرة).</li>
<li>تبحث عن <code>FIXME</code> في المستند الحالي.</li>
<li>تستدعي <code>setDecorations</code> لتُضاء كل حالة كشجرة الأعياد.</li>
<li>تشترك في الأحداث ذات الصلة لإبقاء التزيينات محدَّثة.</li>
</ul>
<h2 id="ربط-ملف-packagejson">ربط ملف <code>package.json</code></h2>
<p>ينبغي أن يحتوي <code>package.json</code> على شيء مثل هذا في قسم <code>contributes</code> أو على هذه الحقول على الأقل، ليقرّر VS Code <em>متى</em> يُفعّل إضافتك:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;comment-highlighter&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;displayName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;comment-highlighter&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;It highlights comments.&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.0.1&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;engines&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;vscode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^1.98.0&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;activationEvents&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;onLanguage:javascript&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;onLanguage:typescript&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./extension.js&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;contributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;commands&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;extension.decorateWords&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Decorate Words&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
  <span class="hljs-comment">// …More stuff…</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>يشير <code>main</code> إلى <code>extension.js</code>.</li>
<li><code>activationEvents</code>: تخبر Visual Studio Code بتشغيل إضافتك عند محفّزات معيّنة، مثل ما بعد بدء التشغيل أو عند تغيّر المحرّر النشط.</li>
</ul>
<p>أتريد تزيين كلمات أخرى (مثل <code>BUG</code> أو <code>TODO</code> أو <code>WTF</code> أو «الشيفرة مشتعلة»)؟ أضف فحوصات regex إضافية أو ادمجها في تعبير regex واحد أنيق. فمثلًا:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Catch FIXME, BUG, or TODO</span>
<span class="hljs-keyword">const</span> regex = <span class="hljs-regexp">/\\b(FIXME|BUG|TODO)\\b/g</span>;
</code></pre>
<p>ومن الواضح أنك تستطيع أيضًا إضافة مزيد من أنماط التزيين لأنواع مختلفة من الأشياء التي تريد تزيينها.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:c,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,c as headings,l as html,t as slug,p as title};
