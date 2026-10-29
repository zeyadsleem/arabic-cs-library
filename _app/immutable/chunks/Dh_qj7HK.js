const a="mathematics-for-cs",s="ch15-cardinality-rules",i="قواعد العدّ",t="index",c="قواعد العدّ",n=[{depth:2,id:"محتوى-الفصل",text:"محتوى الفصل"}],e=`<h1>قواعد العدّ</h1>
<p>كيف تعدّ عدد الأشخاص في غرفة مزدحمة؟ يمكنك أن تعدّ الرؤوس، فلكلّ شخص رأس واحد بالضبط. أو يمكنك أن تعدّ الآذان وتقسم على اثنين. بالطبع، قد تضطرّ إلى تعديل الحساب إن فقد أحدهم أذنًا في غارة قراصنة، أو وُلد أحدهم بثلاث آذان. والمقصود أنك تستطيع في كثير من الأحيان أن تعدّ شيئًا بعدّ شيء آخر، مع شيء من التساهل أحيانًا. وهذه فكرة محورية في العدّ، من أسهل المسائل إلى أصعبها.</p>
<p>بل إننا سبق أن رأينا هذه التقنية تُستعمل في المبرهنة ٤.٥.٥، حيث بُرهن على أن عدد المجموعات الجزئية لمجموعة ذات <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> عنصر يساوي عدد المتتاليات الثنائية ذات الطول <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، بوصف تقابل بين المجموعات الجزئية والمتتاليات الثنائية. وأبسط طريقة للعدّ بهذا الأسلوب هي إيجاد تقابل بين المجموعتين؛ فإذا وُجد تقابل بين مجموعتين فإن لهما الحجم نفسه. وتُعرف هذه الحقيقة المهمة بقاعدة التقابل.</p>
<p>ويتناول هذا الفصل ترسانة من قواعد العدّ التي تُبنى بعضها على بعض: قاعدة التقابل، وقاعدة الجداء، وقاعدة الجمع، وقاعدة الجداء المعمَّمة، وقاعدة القسمة، وقاعدة المجموعات الجزئية، وقاعدة المحاسب، ثم مبدأ برج الحمام ومبدأ الشمول والاستبعاد. ويُختم الفصل بالبراهين التوافقية، وهي براهين تُثبت حقائق جبرية بالاعتماد على مبادئ العدّ وحدها.</p>
<h2 id="محتوى-الفصل">محتوى الفصل</h2>
<ul>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-one-thing-by-counting-another">عدّ شيء بعدّ شيء آخر</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-sequences">عدّ المتتاليات</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-the-generalized-product-rule">قاعدة الجداء المعمَّمة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-the-division-rule">قاعدة القسمة</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-subsets">عدّ المجموعات الجزئية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-sequences-with-repetitions">المتتاليات مع التكرار</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-practice-poker-hands">تدريب على العدّ: أيدي البوكر</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-the-pigeonhole-principle">مبدأ برج الحمام</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-inclusion-exclusion">مبدأ الشمول والاستبعاد</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-combinatorial-proofs">البراهين التوافقية</a></li>
<li><a href="/arabic-cs-library/book/mathematics-for-cs/ch15-cardinality-rules/sec-references">المراجع</a></li>
</ul>
`,r={book:a,chapter:s,chapterTitle:i,slug:t,title:c,headings:n,html:e};export{a as book,s as chapter,i as chapterTitle,r as default,n as headings,e as html,t as slug,c as title};
