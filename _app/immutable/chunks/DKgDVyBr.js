const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="vscode-debugging-basics",p="أساسيات التصحيح",o=[{depth:2,id:"معا",text:"معًا"},{depth:2,id:"تمرين-تصحيح-تطبيق-express",text:"تمرين: تصحيح تطبيق Express"}],l=`<blockquote>
<p><strong>مستودع المثال</strong></p>
<p>سنعبث ببعض الأمثلة في <a href="https://github.com/stevekinney/vscode-examples">هذا المستودع</a>.</p>
</blockquote>
<p>يوفّر Visual Studio Code بضع طرق لتصحيح شيفرتك.</p>
<ul>
<li>يمكنك ضبط <strong>نقاط التوقّف</strong> على أسطر الشيفرة التي تريد أن يتوقّف التنفيذ عندها.</li>
<li>وأثناء التوقّف، يمكنك فحص <strong>المتغيّرات</strong> و<strong>مكدّسات الاستدعاء</strong> و<strong>تقييم التعبيرات</strong> لترى ما يجري.</li>
<li>ويمكنك <strong>التنقّل في الشيفرة</strong> سطرًا بسطر (<strong>Step Over</strong> و<strong>Step Into</strong> الدوال و<strong>Step Out</strong>) لتتابع مسار المنطق.</li>
<li>ويمكنك حتى تغيير المتغيّرات أثناء التشغيل لاختبار سيناريوهات مختلفة.</li>
</ul>
<p>وهناك مجموعة من القوالب التي يوفّرها Visual Studio Code لتبدأ العمل سريعًا.</p>
<p><img src="/arabic-cs-library/images/kinney/642f8d223e160b1d.webp" alt="إعداد تهيئة التشغيل"></p>
<h2 id="معا">معًا</h2>
<p>سنتنقّل في مثال <code>maths</code> في [هذا المستودع].</p>
<h2 id="تمرين-تصحيح-تطبيق-express">تمرين: تصحيح تطبيق Express</h2>
<p>أعدّ ملف <code>launch.json</code>. وإليك مثالًا لملف <code>launch.json</code> <em>بالغ البساطة</em>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0.2.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;configurations&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;request&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;launch&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Launch Program&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;skipFiles&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;&lt;node_internals&gt;/**&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;\${workspaceFolder}/index.js&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
`,u={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:o,html:l};export{s as book,n as chapter,a as chapterTitle,u as default,o as headings,l as html,t as slug,p as title};
