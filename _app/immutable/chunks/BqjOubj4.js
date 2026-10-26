const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="snippets-regex",o="المقتطفات والتعبيرات النمطية",p=[{depth:2,id:"استبدالات-شرطية-بالتعبيرات-النمطية",text:"استبدالات شرطية بالتعبيرات النمطية"}],c=`<p>افترض أنك تريد توليد اسم ثابت في TypeScript بناءً على اسم الملف، بتحويل <code>hello-world.ts</code> إلى <code>HELLO_WORLD</code>. ومجموعات الالتقاط واستبدالات التعبيرات النمطية هما حليفاك هنا:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Uppercase Constant from Filename&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;constfile&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;const \${TM_FILENAME_BASE/(.*)/\${1:/upcase}/} = &#x27;$1&#x27;;&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Creates an uppercase constant from filename&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لكن انتظر، هذا المقتطف حاليًا يجعل اسم الملف كاملًا بأحرف كبيرة فقط دون التعامل مع الشرطات. ولمعالجة ذلك، جرّب تحويل التعبير النمطي المحسّن هذا:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Snake Case Constant from Filename&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;snakeconst&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;const \${TM_FILENAME_BASE/([a-zA-Z0-9]+)([-_]*)/\${1:/upcase}\${2:+_}/g} = &#x27;$1&#x27;;&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Transforms filename (e.g., hello-world) into UPPER_SNAKE_CASE constant&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>الآن يتحوّل <code>hello-world.ts</code> كالسحر إلى:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">HELLO_WORLD</span> = <span class="hljs-string">&#x27;hello-world&#x27;</span>;
</code></pre>
<p>ويضيف الشرط <code>+_</code> (<code>\${2:+_}</code>) شُرَطًا سفلية فقط إذا كانت هناك شرطات أو شُرَط سفلية بين المقاطع، فيضمن ألا تنتهي أبدًا بشرطات سفلية زائدة.</p>
<h2 id="استبدالات-شرطية-بالتعبيرات-النمطية">استبدالات شرطية بالتعبيرات النمطية</h2>
<p>تحتاج أحيانًا إلى شروط في مقتطفاتك. فمثلًا، تحويل نص محدّد إلى صيغة المفرد أو الجمع:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Pluralize selected word&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pluralize&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${TM_SELECTED_TEXT/(.*?)(y|s)?$/\${2:?\${2/(y|s)/\${2:/downcase}/}es:\${1}s}/}&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Pluralizes the selected English word&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وإليك كيف يعمل:</p>
<ul>
<li>إذا انتهى النص المحدّد بـ <code>y</code> أو <code>s</code>، جمّعه جمعًا صحيحًا: <code>city</code> → <code>cities</code> <code>class</code> → <code>classes</code>
<ul>
<li><code>city</code> → <code>cities</code></li>
<li><code>class</code> → <code>classes</code></li>
</ul>
</li>
<li>وإلا، أضاف ببساطة <code>s</code>: <code>dog</code> → <code>dogs</code>
<ul>
<li><code>dog</code> → <code>dogs</code></li>
</ul>
</li>
</ul>
<p>والتقاطات التعبير النمطي (<code>(.*?)</code> و <code>(y|s)?</code>) والشروط (<code>\${2:?…:…}</code>) هي السرّ الذي يجعل ذلك ممكنًا.</p>
<blockquote>
<p><strong>هذا هو التحذير المعتاد بشأن التعبيرات النمطية</strong></p>
<p>أنماط التعبيرات النمطية المعقّدة قوية لكنها قد تتشعّب بسرعة. فاختبر مقتطفاتك دائمًا بمدخلات متنوّعة لتضمن سلوكًا متّسقًا. فلا أحد يحبّ أخطاء التعبيرات النمطية في الثانية صباحًا.</p>
</blockquote>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,l as default,p as headings,c as html,t as slug,o as title};
