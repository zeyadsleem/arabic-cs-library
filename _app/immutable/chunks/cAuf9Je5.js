const s="kinney",a="testing",n="مدخل إلى الاختبارات",l="asymmetric-matchers-exercise",e="تمرين",p=[],c=`<p>لننتقل إلى <code>examples/characters</code> ونقضي لحظة في التأمل في صنف <code>Character</code> هذا، وهو مجموعة فرعية من صنف <code>Person</code> الذي نظرنا إليه للتو.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Person</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./person.js&#x27;</span>;
<span class="hljs-keyword">import</span> { rollDice } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./roll-dice.js&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">Character</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Person</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">firstName, lastName, role</span>) {
    <span class="hljs-variable language_">super</span>(firstName, lastName);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">role</span> = role;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">level</span> = <span class="hljs-number">1</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">createdAt</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastModified</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">createdAt</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">strength</span> = <span class="hljs-title function_">rollDice</span>(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">dexterity</span> = <span class="hljs-title function_">rollDice</span>(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">intelligence</span> = <span class="hljs-title function_">rollDice</span>(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">wisdom</span> = <span class="hljs-title function_">rollDice</span>(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">charisma</span> = <span class="hljs-title function_">rollDice</span>(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">constitution</span> = <span class="hljs-title function_">rollDice</span>(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>);
  }

  <span class="hljs-title function_">levelUp</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">level</span>++;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastModified</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>();
  }
}
</code></pre>
<p>يمكنك إلقاء نظرة على <code>roll-dice.js</code>، لكنني سأحرق المفاجأة: إنه <em>في الأساس</em> مولّد أرقام عشوائية. وله أيضًا تاريخان — <code>createdAt</code> و<code>lastModified</code> — سيكونان صعبَي التثبيت نوعًا ما. هل يمكنك كتابة بعض الاختبارات التي تختبر الأجزاء التي يمكننا تثبيتها؟</p>
<ul>
<li>نعلم أن الاسم الأول والأخير يجب أن يكونا ما نمرره.</li>
<li>الاسم الكامل يجب أن يكون على الأرجح الاسم الأول والأخير مجتمعين.</li>
<li>نعلم أن الدور يجب أن يكون ما أُعطي للمنشئ.</li>
<li>نعلم أن مستوى الشخصية سيكون دائمًا افتراضيًا <code>1</code>.</li>
<li><strong>إضافة</strong>: هل يمكنك إيجاد طريقة ذكية لمعرفة ما إذا كان التاريخ قد عُدّل بنجاح؟</li>
</ul>
<p>يمكنك إلقاء نظرة على <a href="https://stevekinney.com/courses/testing/asymmetric-matchers-solution">حل محتمل هنا</a>.</p>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,p as headings,c as html,l as slug,e as title};
