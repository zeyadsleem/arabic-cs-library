const o="ocaml-manual",e="ch31",c="واجهة المترجم الأمامية",n="index",l="واجهة المترجم الأمامية",p=[],i=`<h1>الفصل 31: واجهة المترجم الأمامية</h1>
<p>يصف هذا الفصل الواجهة الأمامية لـ OCaml، وهي تصرّح بشجرة التركيب المجرّد التي يستعملها المترجم، وتوفّر وسيلة لتحليل شيفرة OCaml وطباعتها وطباعتها طباعةً جميلة، وتتيح في النهاية كتابة معالجات سابقة لشجرة التركيب المجرّد تُستدعى بالخيار <code>-ppx</code> (انظر الفصلين 13 و16).</p>
<p>ومن المهم ملاحظة أن واجهة الواجهة الأمامية المصدَّرة تتبع تطوّر لغة OCaml وتنفيذها، ولذلك فهي لا تقدّم <strong>أي</strong> ضمانات للتوافق مع الإصدارات السابقة.</p>
<p>والواجهة الأمامية جزء من مكتبة <code>compiler-libs</code>. وينبغي بناء البرامج التي تستعمل مكتبة <code>compiler-libs</code> على النحو التالي:</p>
<pre><code class="language-text">        ocamlfind ocamlc other options -package compiler-libs.common other files
        ocamlfind ocamlopt other options -package compiler-libs.common other files
</code></pre>
<p>ويُنصَح باستعمال الأداة <code>ocamlfind</code>. أما إذا لم يكن ذلك ممكنًا، فيمكن استعمال طريقة بديلة:</p>
<pre><code class="language-text">        ocamlc other options -I +compiler-libs ocamlcommon.cma other files
        ocamlopt other options -I +compiler-libs ocamlcommon.cmxa other files
</code></pre>
<p>وللاستعمال التفاعلي لمكتبة <code>compiler-libs</code>، ابدأ <code>ocaml</code> واكتب <code>#load &quot;compiler-libs/ocamlcommon.cma&quot;;;</code>.</p>
<ul>
<li>
<p>الوحدة <code>Ast_helper</code>: دوال مساعدة لبناء شجرة التركيب المجرّد</p>
</li>
<li>
<p>الوحدة <code>Ast_mapper</code>: واجهة مُعاد الكتابة <code>-ppx</code></p>
</li>
<li>
<p>الوحدة <code>Asttypes</code>: أنواع مساعدة تستعملها <code>Parsetree</code></p>
</li>
<li>
<p>الوحدة <code>Location</code>: مواضع الشيفرة المصدرية</p>
</li>
<li>
<p>الوحدة <code>Longident</code>: المعرّفات الطويلة</p>
</li>
<li>
<p>الوحدة <code>Parse</code>: تحليل صياغة OCaml</p>
</li>
<li>
<p>الوحدة <code>Parsetree</code>: شجرة صياغة OCaml</p>
</li>
<li>
<p>الوحدة <code>Pprintast</code>: طباعة صياغة OCaml</p>
</li>
</ul>
`,a={book:o,chapter:e,chapterTitle:c,slug:n,title:l,headings:p,html:i};export{o as book,e as chapter,c as chapterTitle,a as default,p as headings,i as html,n as slug,l as title};
