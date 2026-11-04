const a="ocaml-manual",c="ch37",o="المكتبات المُزالة أو المنقولة حديثًا (Graphics وBigarray وNum وLablTk)",e="index",r="المكتبات المُزالة أو المنقولة حديثًا (Graphics وBigarray وNum وLablTk)",t=[{depth:2,id:"371-مكتبة-graphics",text:"37.1 مكتبة Graphics"},{depth:2,id:"372-مكتبة-bigarray",text:"37.2 مكتبة Bigarray"},{depth:2,id:"373-مكتبة-num",text:"37.3 مكتبة Num"},{depth:2,id:"374-مكتبة-labltk-وocamlbrowser",text:"37.4 مكتبة Labltk وOCamlBrowser"}],p=`<h1>الفصل 37: المكتبات المُزالة أو المنقولة حديثًا (Graphics وBigarray وNum وLablTk)</h1>
<p>يصف هذا الفصل ثلاث مكتبات كانت في السابق جزءًا من توزيعة OCaml (Graphics وNum وLablTk)، ومكتبة أصبحت الآن جزءًا من المكتبة القياسية لـ OCaml وتُوثَّق فيها (Bigarray).</p>
<h2 id="371-مكتبة-graphics">37.1 مكتبة Graphics</h2>
<p>منذ OCaml 4.09، تُوزَّع مكتبة <code>graphics</code> على هيئة حزمة خارجية. وموطنها الجديد هو:</p>
<p><a href="https://github.com/ocaml/graphics"><code>https://github.com/ocaml/graphics</code></a></p>
<p>وإذا كنت تستعمل مدير الحزم opam، فينبغي أن تثبّت حزمة <code>graphics</code> المقابلة:</p>
<pre><code class="language-text">        opam install graphics
</code></pre>
<p>وقبل OCaml 4.09، كانت هذه الحزمة تكفل فقط أن مكتبة <code>graphics</code> مثبَّتة مع المترجم؛ أما بدءًا من OCaml 4.09 فإن هذه الحزمة توفّر مكتبة <code>graphics</code> فعليًا.</p>
<h2 id="372-مكتبة-bigarray">37.2 مكتبة Bigarray</h2>
<p>بدءًا من OCaml 4.07، أُدمجت مكتبة <code>bigarray</code> في المكتبة القياسية لـ OCaml.</p>
<p>ويمكن الآن العثور على وظائف <code>bigarray</code> في وحدة <code>Bigarray</code> من المكتبة القياسية، باستثناء الدالة <code>map_file</code> التي أصبحت الآن جزءًا من مكتبة Unix. وقد أُدمج التوثيق في توثيق المكتبة القياسية.</p>
<p>أما مكتبة <code>bigarray</code> القديمة المرفقة بالمترجم فهي مكتبة توافق لها الواجهة نفسها تمامًا كما كانت من قبل، أي بما فيها <code>map_file</code>.</p>
<p>ونوصي بشدّة بأن تنقل شيفرتك لتستعمل نسخة المكتبة القياسية بدلًا من ذلك، لأن التغييرات المطلوبة ضئيلة.</p>
<p>وإذا اخترت استعمال مكتبة التوافق، فيجب أن تربط برامجك على النحو التالي:</p>
<pre><code class="language-text">        ocamlc other options bigarray.cma other files
        ocamlopt other options bigarray.cmxa other files
</code></pre>
<p>ولااستعمال مكتبة التوافق <code>bigarray</code> استعمالًا تفاعليًا، افعل ما يلي:</p>
<pre><code class="language-text">        ocamlmktop -o mytop bigarray.cma
        ./mytop
</code></pre>
<p>أو (إذا كان الربط الدينامي لمكتبات C مدعومًا على منصّتك) ابدأ <code>ocaml</code> واكتب <code>#load &quot;bigarray.cma&quot;;;</code>.</p>
<h2 id="373-مكتبة-num">37.3 مكتبة Num</h2>
<p>تنفّذ مكتبة <code>num</code> حساب الأعداد الصحيحة وحساب الأعداد الكسرية بدقّة اعتباطية. وقد فُصلت عن التوزيعة الأساسية لـ OCaml بدءًا من الإصدار 4.06.0، ويمكن الآن العثور عليها في <a href="https://github.com/ocaml/num"><code>https://github.com/ocaml/num</code></a>.</p>
<p>وينبغي للتطبيقات الجديدة التي تحتاج إلى حساب بدقّة اعتباطية أن تستعمل مكتبة <code>Zarith</code> (<a href="https://github.com/ocaml/Zarith"><code>https://github.com/ocaml/Zarith</code></a>) بدلًا من مكتبة <code>Num</code>، ويُشجَّع التطبيقات القديمة التي تستعمل <code>Num</code> بالفعل على الانتقال إلى <code>Zarith</code>. فمكتبة <code>Zarith</code> توفّر أداءً أفضل بكثير من <code>Num</code> ولها واجهة برمجية أجمل.</p>
<h2 id="374-مكتبة-labltk-وocamlbrowser">37.4 مكتبة Labltk وOCamlBrowser</h2>
<p>منذ الإصدار 4.02 من OCaml، تُوزَّع أداة OCamlBrowser ومكتبة Labltk منفصلتين عن مترجم OCaml. ويُستضاف المشروع الآن في <a href="https://github.com/garrigue/labltk"><code>https://github.com/garrigue/labltk</code></a>.</p>
`,d={book:a,chapter:c,chapterTitle:o,slug:e,title:r,headings:t,html:p};export{a as book,c as chapter,o as chapterTitle,d as default,t as headings,p as html,e as slug,r as title};
