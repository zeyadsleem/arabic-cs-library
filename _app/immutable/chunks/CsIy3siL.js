const o="ocaml-manual",c="ch33",e="مكتبة str: التعابير النمطية ومعالجة السلاسل",t="index",s="مكتبة str: التعابير النمطية ومعالجة السلاسل",n=[],a=`<h1>الفصل 33: مكتبة str: التعابير النمطية ومعالجة السلاسل</h1>
<p>توفّر مكتبة <code>str</code> دوال عالية المستوى لمعالجة السلاسل، بعضها قائم على التعابير النمطية. والغرض منها دعم نوع معالجة الملفات الذي يُجرى عادةً بلغات البرمجة النصية مثل <code>awk</code> أو <code>perl</code> أو <code>sed</code>.</p>
<p>ويجب ربط البرامج التي تستعمل مكتبة <code>str</code> على النحو التالي:</p>
<pre><code class="language-text">        ocamlc other options -I +str str.cma other files
        ocamlopt other options  -I +str str.cmxa other files
</code></pre>
<p>ولااستعمال مكتبة <code>str</code> استعمالًا تفاعليًا، افعل ما يلي:</p>
<pre><code class="language-text">        ocamlmktop -o mytop str.cma
        ./mytop
</code></pre>
<p>أو (إذا كان الربط الدينامي لمكتبات C مدعومًا على منصّتك) ابدأ <code>ocaml</code> واكتب</p>
<pre><code class="language-ocaml"># #directory <span class="hljs-string">&quot;+str&quot;</span>;;

# #load  <span class="hljs-string">&quot;str.cma&quot;</span>;;
</code></pre>
<ul>
<li>الوحدة <code>Str</code>: التعابير النمطية ومعالجة السلاسل</li>
</ul>
`,l={book:o,chapter:c,chapterTitle:e,slug:t,title:s,headings:n,html:a};export{o as book,c as chapter,e as chapterTitle,l as default,n as headings,a as html,t as slug,s as title};
