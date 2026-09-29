const s="hello-algo",a="chapter_sorting",n="الترتيب",p="sorting_algorithm",t="خوارزمية الترتيب",l=[{depth:2,id:"أبعاد-التقييم",text:"أبعاد التقييم"},{depth:2,id:"خوارزمية-الترتيب-المثالية",text:"خوارزمية الترتيب المثالية"}],e=`<p><u>خوارزمية الترتيب</u> (sorting algorithm) ترتّب مجموعة من البيانات وفق ترتيب محدد. ولخوارزميات الترتيب تطبيقات واسعة، لأن البيانات المرتّبة يمكن عادةً بحثها وتحليلها ومعالجتها بكفاءة أعلى.</p>
<p>وكما يوضح الشكل أدناه، قد تكون البيانات المراد ترتيبها أعداداً صحيحة أو أعداداً عشرية عائمة أو محارف أو سلاسل نصية وغيرها. ويمكن تحديد قاعدة الترتيب حسب الحاجة، مثل الترتيب العددي أو ترتيب ASCII أو قاعدة مخصصة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_sorting--sorting_examples.png" alt="مثال على أنواع البيانات ومعايير الترتيب"></p>
<h2 id="أبعاد-التقييم">أبعاد التقييم</h2>
<p><strong>كفاءة التنفيذ</strong>: نتوقع أن يكون التعقيد الزمني لخوارزميات الترتيب منخفضاً قدر الإمكان، مع عدد إجمالي أقل من العمليات (تقليل المعامل الثابت في التعقيد الزمني). وبالنسبة إلى أحجام البيانات الكبيرة، تكتسب كفاءة التنفيذ أهمية خاصة.</p>
<p><strong>الترتيب في المكان</strong>: كما يوحي الاسم، يحقق <u>الترتيب في المكان</u> (in-place sorting) الترتيب عبر العمل مباشرةً على المصفوفة الأصلية دون الحاجة إلى مصفوفات مساعدة إضافية، مما يوفّر الذاكرة. وعادةً ما يتضمن الترتيب في المكان عمليات أقل لنقل البيانات ويعمل بسرعة أكبر.</p>
<p><strong>الاستقرار</strong>: يضمن <u>الترتيب المستقر</u> (stable sorting) عدم تغيّر الترتيب النسبي للعناصر المتساوية في المصفوفة بعد اكتمال الترتيب.</p>
<p>يُعدّ الترتيب المستقر شرطاً ضرورياً لسيناريوهات الترتيب متعدد المستويات. لنفترض أن لدينا جدولاً يخزّن معلومات الطلاب، حيث العمود الأول الاسم والعمود الثاني العمر. في هذه الحالة، قد يؤدي <u>الترتيب غير المستقر</u> (unstable sorting) إلى فقدان الطبيعة المرتّبة لبيانات الإدخال:</p>
<pre><code class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">بيانات الإدخال مرتّبة حسب الاسم</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">(الاسم، العمر)</span>
  (&#x27;A&#x27;, 19)
  (&#x27;B&#x27;, 18)
  (&#x27;C&#x27;, 21)
  (&#x27;D&#x27;, 19)
  (&#x27;E&#x27;, 23)
<span class="hljs-meta prompt_">
# </span><span class="language-bash">لنفترض أننا نستخدم خوارزمية ترتيب غير مستقرة لترتيب القائمة حسب العمر.</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">في النتيجة، يتغيّر الموضع النسبي للعنصرين (<span class="hljs-string">&#x27;D&#x27;</span>, 19) و(<span class="hljs-string">&#x27;A&#x27;</span>, 19)،</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">وبذلك تُفقد خاصية كون بيانات الإدخال مرتّبة حسب الاسم.</span>
  (&#x27;B&#x27;, 18)
  (&#x27;D&#x27;, 19)
  (&#x27;A&#x27;, 19)
  (&#x27;C&#x27;, 21)
  (&#x27;E&#x27;, 23)
</code></pre>
<p><strong>القدرة على التكيّف</strong>: يستطيع <u>الترتيب التكيّفي</u> (adaptive sorting) الاستفادة من معلومات الترتيب القائمة في بيانات الإدخال لتقليل مقدار الحساب، محققاً كفاءة زمنية أفضل. وعادةً ما يكون التعقيد الزمني في أفضل حالة لخوارزميات الترتيب التكيّفية أفضل من التعقيد الزمني المتوسط.</p>
<p><strong>الترتيب القائم على المقارنة أو غير القائم عليها</strong>: يعتمد <u>الترتيب القائم على المقارنة</u> (comparison-based sorting) على معاملات المقارنة ($&lt;$, <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">=</span></span></span></span>, $&gt;$) لتحديد الترتيب النسبي للعناصر، وبذلك يرتّب المصفوفة كاملة. وحدّه الأدنى للتعقيد الزمني في أسوأ الحالات هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Ω</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. أما <u>الترتيب غير القائم على المقارنة</u> (non-comparison sorting) فلا يستخدم معاملات المقارنة، ويمكنه تحقيق تعقيد زمني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، لكن عموميته محدودة نسبياً.</p>
<h2 id="خوارزمية-الترتيب-المثالية">خوارزمية الترتيب المثالية</h2>
<p><strong>سريعة، وفي المكان، ومستقرة، وتكيّفية، وعامة التطبيق</strong>. من الواضح أنه لم تُكتشف حتى اليوم خوارزمية ترتيب تجمع كل هذه الخصائص. لذلك، عند اختيار خوارزمية ترتيب، يلزم البتّ بناءً على الخصائص المحددة للبيانات ومتطلبات المسألة.</p>
<p>سنستعرض لاحقاً خوارزميات ترتيب متنوعة، ونحلّل مزاياها وعيوبها استناداً إلى أبعاد التقييم المذكورة أعلاه.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:p,title:t,headings:l,html:e};export{s as book,a as chapter,n as chapterTitle,r as default,l as headings,e as html,p as slug,t as title};
