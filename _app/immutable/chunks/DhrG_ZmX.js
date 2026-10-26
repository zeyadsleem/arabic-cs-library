const s="kinney",a="testing",n="مدخل إلى الاختبارات",p="parameterizing-tests",l="توليد الاختبارات باستخدام test.each وdescribe.each",e=[{depth:2,id:"استخدام-مصفوفة-من-الكائنات",text:"استخدام مصفوفة من الكائنات"},{depth:2,id:"استخدام-جدول",text:"استخدام جدول"},{depth:2,id:"تمرين",text:"تمرين"},{depth:2,id:"سر",text:"سرّ"}],c=`<p>يمكننا استخدام test.each وdescribe.each لتوليد اختبارات ومجموعات اختبارات برمجيًا نيابةً عنا. تأمّل المثال التالي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Polygon</span> {
  <span class="hljs-attr">sides</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">length</span>: <span class="hljs-built_in">number</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">sides</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">length</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">if</span> (sides &lt; <span class="hljs-number">3</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Polygons must have three or more sides.&#x27;</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> = sides;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">length</span> = length;
  }

  <span class="hljs-keyword">get</span> <span class="hljs-title function_">type</span>(): <span class="hljs-title class_">PolygonType</span> | <span class="hljs-literal">undefined</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">3</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;triangle&#x27;</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">4</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;quadrilateral&#x27;</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">5</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pentagon&#x27;</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">6</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;hexagon&#x27;</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">7</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;heptagon&#x27;</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">8</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;octagon&#x27;</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">9</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;nonagon&#x27;</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">sides</span> === <span class="hljs-number">10</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;decagon&#x27;</span>;
  }

  <span class="hljs-comment">// …</span>
}
</code></pre>
<p>ربما نريد اختبار أننا نحصل على الاسم الصحيح حسب عدد الأضلاع. ليس <em>بالغ</em> الصعوبة كتابة مجموعة من الاختبارات لهذا، لكن يمكنك أن تضع قبّعة الخيال لحظةً وتتخيّل عالمًا لديك فيه حالات أكثر بكثير.</p>
<p>يتيح لنا <code>describe.each</code> و<code>it.each</code> (أو <code>test.each</code>) استخدام مصفوفة أو جدول لتوليد اختبارات لأنفسنا تلقائيًا.</p>
<p>على سبيل المثال، يمكننا استخدام مصفوفة من المصفوفات:</p>
<pre><code class="language-typescript">  it.<span class="hljs-title function_">each</span>([
    [<span class="hljs-number">3</span>, <span class="hljs-string">&#x27;triangle&#x27;</span>],
    [<span class="hljs-number">4</span>, <span class="hljs-string">&#x27;quadrilateral&#x27;</span>],
    [<span class="hljs-number">5</span>, <span class="hljs-string">&#x27;pentagon&#x27;</span>],
    [<span class="hljs-number">6</span>, <span class="hljs-string">&#x27;hexagon&#x27;</span>],
    [<span class="hljs-number">7</span>, <span class="hljs-string">&#x27;heptagon&#x27;</span>],
    [<span class="hljs-number">8</span>, <span class="hljs-string">&#x27;octagon&#x27;</span>],
    [<span class="hljs-number">9</span>, <span class="hljs-string">&#x27;nonagon&#x27;</span>],
    [<span class="hljs-number">10</span>, <span class="hljs-string">&#x27;decagon&#x27;</span>],
  ])(<span class="hljs-string">&#x27;a polygon with %i sides should be considered a %s&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">sides, <span class="hljs-keyword">type</span></span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> polygon = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Polygon</span>(sides, <span class="hljs-number">10</span>);
    <span class="hljs-title function_">expect</span>(polygon.<span class="hljs-property">type</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-keyword">type</span>);
  });
});
</code></pre>
<p>سيولّد هذا عددًا من الاختبارات نيابةً عنا. ستلاحظ أن العنصر الأول في المصفوفة هو الوسيط الأول الممرَّر إلى دالة الاختبار، والعنصر الثاني هو الوسيط الثاني، وهكذا.</p>
<p>ستلاحظ أيضًا أننا نستطيع استخدام نصوص منسّقة لتوليد أسماء الاختبارات.</p>
<h2 id="استخدام-مصفوفة-من-الكائنات">استخدام مصفوفة من الكائنات</h2>
<p>بدلًا من ذلك، يمكنك استخدام مصفوفة من الكائنات لتوليد اختباراتك.</p>
<pre><code class="language-typescript">it.<span class="hljs-title function_">each</span>([
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;triangle&#x27;</span> },
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;quadrilateral&#x27;</span> },
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;pentagon&#x27;</span> },
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;hexagon&#x27;</span> },
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">7</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;heptagon&#x27;</span> },
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;octagon&#x27;</span> },
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">9</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;nonagon&#x27;</span> },
  { <span class="hljs-attr">sides</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;decagon&#x27;</span> },
])(<span class="hljs-string">&#x27;a polygon with $sides sides should be considered a $type&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">{ sides, <span class="hljs-keyword">type</span> }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> polygon = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Polygon</span>(sides, <span class="hljs-number">10</span>);
  <span class="hljs-title function_">expect</span>(polygon.<span class="hljs-property">type</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-keyword">type</span>);
});
</code></pre>
<p>في هذا المثال ستلاحظ أنني أُفكّك كائنًا للحصول على القيم داخل الدالة، وأنني أستطيع استخدام <code>$property</code> في النص الذي يحدّد اسم الاختبار،</p>
<h2 id="استخدام-جدول">استخدام جدول</h2>
<p>ثمّة طريقة أخرى لتوليد الاختبارات، وهي استخدام جدول Markdown.</p>
<p>قد يكون لدينا شيء مثل هذا:</p>
<pre><code class="language-typescript">polygonType        | sides | sumOfAngles | perimeter | area
\${<span class="hljs-string">&#x27;triangle&#x27;</span>}      | \${<span class="hljs-number">3</span>}  | \${<span class="hljs-number">180</span>}      | \${<span class="hljs-number">30</span>}     | \${<span class="hljs-number">43.3012701892219</span>}
\${<span class="hljs-string">&#x27;quadrilateral&#x27;</span>} | \${<span class="hljs-number">4</span>}  | \${<span class="hljs-number">360</span>}      | \${<span class="hljs-number">40</span>}     | \${<span class="hljs-number">100</span>}
\${<span class="hljs-string">&#x27;pentagon&#x27;</span>}      | \${<span class="hljs-number">5</span>}  | \${<span class="hljs-number">540</span>}      | \${<span class="hljs-number">50</span>}     | \${<span class="hljs-number">172.047740058897</span>}
\${<span class="hljs-string">&#x27;hexagon&#x27;</span>}       | \${<span class="hljs-number">6</span>}  | \${<span class="hljs-number">720</span>}      | \${<span class="hljs-number">60</span>}     | \${<span class="hljs-number">259.807621135332</span>}
\${<span class="hljs-string">&#x27;heptagon&#x27;</span>}      | \${<span class="hljs-number">7</span>}  | \${<span class="hljs-number">900</span>}      | \${<span class="hljs-number">70</span>}     | \${<span class="hljs-number">363.391244400159</span>}
\${<span class="hljs-string">&#x27;octagon&#x27;</span>}       | \${<span class="hljs-number">8</span>}  | \${<span class="hljs-number">1080</span>}     | \${<span class="hljs-number">80</span>}     | \${<span class="hljs-number">482.842712474619</span>}
\${<span class="hljs-string">&#x27;nonagon&#x27;</span>}       | \${<span class="hljs-number">9</span>}  | \${<span class="hljs-number">1260</span>}     | \${<span class="hljs-number">90</span>}     | \${<span class="hljs-number">618.18241937729</span>}
\${<span class="hljs-string">&#x27;decagon&#x27;</span>}       | \${<span class="hljs-number">10</span>} | \${<span class="hljs-number">1440</span>}     | \${<span class="hljs-number">100</span>}    | \${<span class="hljs-number">769.420884293813</span>}
</code></pre>
<p>يمكننا توليد سلسلة من الاختبارات بتمرير هذا إلى الدالة كنص قالب:</p>
<pre><code class="language-typescript">describe.<span class="hljs-property">each</span><span class="hljs-string">\`
  polygonType        | sides | sumOfAngles | perimeter | area
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;triangle&#x27;</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">3</span>}</span>  | <span class="hljs-subst">\${<span class="hljs-number">180</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">30</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">43.3012701892219</span>}</span>
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;quadrilateral&#x27;</span>}</span> | <span class="hljs-subst">\${<span class="hljs-number">4</span>}</span>  | <span class="hljs-subst">\${<span class="hljs-number">360</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">40</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">100</span>}</span>
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;pentagon&#x27;</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">5</span>}</span>  | <span class="hljs-subst">\${<span class="hljs-number">540</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">50</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">172.047740058897</span>}</span>
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;hexagon&#x27;</span>}</span>       | <span class="hljs-subst">\${<span class="hljs-number">6</span>}</span>  | <span class="hljs-subst">\${<span class="hljs-number">720</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">60</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">259.807621135332</span>}</span>
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;heptagon&#x27;</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">7</span>}</span>  | <span class="hljs-subst">\${<span class="hljs-number">900</span>}</span>      | <span class="hljs-subst">\${<span class="hljs-number">70</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">363.391244400159</span>}</span>
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;octagon&#x27;</span>}</span>       | <span class="hljs-subst">\${<span class="hljs-number">8</span>}</span>  | <span class="hljs-subst">\${<span class="hljs-number">1080</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">80</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">482.842712474619</span>}</span>
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;nonagon&#x27;</span>}</span>       | <span class="hljs-subst">\${<span class="hljs-number">9</span>}</span>  | <span class="hljs-subst">\${<span class="hljs-number">1260</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">90</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">618.18241937729</span>}</span>
  <span class="hljs-subst">\${<span class="hljs-string">&#x27;decagon&#x27;</span>}</span>       | <span class="hljs-subst">\${<span class="hljs-number">10</span>}</span> | <span class="hljs-subst">\${<span class="hljs-number">1440</span>}</span>     | <span class="hljs-subst">\${<span class="hljs-number">100</span>}</span>    | <span class="hljs-subst">\${<span class="hljs-number">769.420884293813</span>}</span>
\`</span>(<span class="hljs-string">&#x27;$polygonType&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">{ polygonType, sides, lengthOfSide, sumOfAngles, perimeter, area }</span>) =&gt;</span> {
  <span class="hljs-comment">//…</span>
});
</code></pre>
<h2 id="تمرين">تمرين</h2>
<p>ألقِ نظرة على <code>src/examples/parameterizing-tests/polygon.test.ts</code>. هل تستطيع توليد اختبارات بناءً على البيانات؟</p>
<h2 id="سر">سرّ</h2>
<p><strong>ملاحظة مهمة</strong>: هذا جزء من سلسلة نصائح وحيل هي أفكار سيئة بلا شك. ومع ذلك، فهي فعّالة بشكل مفاجئ، وأحيانًا عليك أن تخرق القواعد، أليس كذلك؟</p>
<p>أعرف. لدي TypeScript للتحقق من أن الدالة لن تتلقى سوى الوسائط التي أقول إنها ستتلقاها. لكن TypeScript لا يستطيع تحليل سوى قاعدة شيفرتك. فإن كان لجزء من شيفرتي أي تفاعل مع العالم الخارجي، فقد أختار إضافة بعض الحُرّاس للتأكد من أنها لا تنفجر. وسأستخدم وسائط الاختبار لجعل ذلك سهلًا على نفسي.</p>
`,t={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,p as slug,l as title};
