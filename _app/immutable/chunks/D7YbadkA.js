const s="500-lines",a="dagoba",n="Dagoba: an in-memory graph database",p="index",l="داغوبا: قاعدة بيانات رسومية في الذاكرة",e=[{depth:2,id:"مقدمة",text:"مقدّمة"},{depth:2,id:"لقطة-أولى",text:"لقطة أولى"},{depth:2,id:"ابن-رسما-بيانيا-أفضل",text:"ابنِ رسمًا بيانيًّا أفضل"},{depth:2,id:"إلى-الاستعلام",text:"إلى الاستعلام"},{depth:2,id:"مشكلة-الاستعجال",text:"مشكلة الاستعجال"},{depth:2,id:"آثار-استراتيجية-التنفيذ-في-نموذجنا-الذهني",text:"آثارُ استراتيجية التنفيذ في نموذجنا الذهني"},{depth:2,id:"أنواع-الأنابيب",text:"أنواع الأنابيب"},{depth:2,id:"الدوال-المساعدة",text:"الدوال المساعدة"},{depth:2,id:"طبيعة-المفسر",text:"طبيعة المفسِّر"},{depth:2,id:"المفسر-مكشوفا",text:"المفسِّر، مكشوفًا"},{depth:2,id:"محولات-الاستعلام",text:"محوّلات الاستعلام"},{depth:2,id:"الأسماء-المستعارة",text:"الأسماء المستعارة"},{depth:2,id:"الأداء",text:"الأداء"},{depth:2,id:"التسلسل",text:"التسلسل"},{depth:2,id:"الاستمرارية",text:"الاستمرارية"},{depth:2,id:"التحديثات",text:"التحديثات"},{depth:2,id:"اتجاهات-مستقبلية",text:"اتجاهات مستقبلية"},{depth:2,id:"الخاتمة",text:"الخاتمة"},{depth:3,id:"شكر-وتقدير",text:"شكر وتقدير"}],t=`<p><em><a href="https://twitter.com/dann">Dann</a> يستمتع بالأشياء التي يبنيها، مثل لغات البرمجة، وقواعد البيانات، والأنظمة الموزّعة، ومجتمعات البشر الأذكياء الودودين، وقلاع الخيول المصغّرة مع ابنه الذي يبلغ سنتين.</em></p>
<h2 id="مقدمة">مقدّمة</h2>
<blockquote>
<p>&quot;حين نحاول أن ننتزع أي شيء بمفرده، نجد أن ألف خيطٍ خفيّ لا يمكن كسره تربطه بكل ما في الكون.&quot;
—جون مور</p>
</blockquote>
<blockquote>
<p>&quot;ما الذي ينطلق إلى أطراف العالم ليتجوّل في كل شيء إلا نفسه: الله، والشمس، وشكسبير، وبائع متجوّل؟ فحين يتجوّل في الواقع ذاته يصير هو ذلك الشيء.&quot;
—جيمس جويْس</p>
</blockquote>
<p>\\noindent منذ زمن طويل، حين كان العالم لا يزال فتيًّا، كانت كل البيانات تمشي بسعادة في صفٍّ واحد. إن أردت لبياناتك أن تقفز فوق سور، فأنت تكتفي بوضع السور في طريقها، وتقفز كل قطعة بيانات فوقه بالتناوب. بطاقات مثقوبة تدخل، بطاقات مثقوبة تخرج. كانت الحياة سهلة والبرمجة نسيمًا خفيفًا.</p>
<p>ثم جاءت ثورة الوصول العشوائي، وراحت البيانات ترعى بحرّية فوق سفوح التلال. وصار رعي البيانات مصدرَ قلقٍ جادّ: إن كنت تستطيع الوصول إلى أي قطعة بيانات في أي وقت، فكيف تعرف أيَّها تختار تاليًا؟ طُوّرت تقنيات لحصر البيانات في حظيرة عبر تشكيل روابط بين العناصر[^items]، ورصف مجموعات من الوحدات في تشكيلات من خلال تجمّعات روابطها. أمّا السؤال عن البيانات فكان يعني انتقاء خروف وسحب كل ما يتّصل به.</p>
<p>وفيما بعد، ابتعد المبرمجون عن هذا التقليد، ففرضوا مجموعةً من القواعد على كيفية تجميع البيانات[^relationaltheory]. فبدلًا من وصل البيانات المتفرّقة ببعضها مباشرةً، كانوا يجمّعون بحسب المحتوى، فيفكّون البيانات إلى قطع بحجم لقمة، تُجمع في حظائر وتُوسَم ببطاقات أسماء. وكانت الأسئلة تُطرح تصريحيًّا، مما ينتج تراكم قطع من بيانات متفكّكة جزئيًّا (حالة يسمّيها أصحاب النظرية العلائقية «طبيعية») في مجموعةٍ هجينة تُعاد إلى المبرمج.</p>
<p>طوال معظم التاريخ المسجَّل، ساد هذا النموذج العلائقي بلا منازع. وبقيت هيمنته غير مهدَّدة عبر حروبين لغويين كبيرين وعددٍ لا يُحصى من الاشتباكات. كان يقدّم كل ما يمكنك أن تطلبه في نموذج، مقابل ثمنٍ زهيد: عدمُ الكفاءة، وفقدانُ الرشاقة، وغيابُ قابلية التوسّع. ولفترات طويلة كان ذلك ثمنًا مستعدّين المبرمجون لدفعه. ثم حدث الإنترنت.</p>
<p>غيّرت الثورة الموزّعة كل شيء، مرّة أخرى. تحرّرت البيانات من القيود المكانية وانتشرت من آلة إلى أخرى. وحطّم حَمَلةُ نظريّة CAP الاحتكارَ العلائقي، فانفتح الباب أمام تقنيات رعي جديدة—بعضها يرجع إلى أقدم المحاولات لتدجين الوصول العشوائي. وسننظر في إحداها، وهو نمطٌ يُعرف بقاعدة البيانات الرسومية.</p>
<p>[^items]: كان أحد أوائل تصاميم قواعد البيانات هو النموذج الهرمي (hierarchical model)، الذي كان يجمع العناصر في تدرّجات هرمية على شكل شجرة، ولا يزال مستخدَمًا كأساس لمنتج IBM المسمّى IMS، وهو نظام معالجة معاملات (transaction processing) عالي السرعة. ويمكن كذلك رؤية تأثيره في XML، وأنظمة الملفات، وتخزين المعلومات الجغرافية. أمّا النموذج الشبكي (network model)، الذي اخترعه تشارلز باخمان ومَنَّته معيار CODASYL، فقد عمّم النموذج الهرمي بالسماح بأكثر من أب، فشكّل رسمًا بيانيًا غير دوري (DAG) بدلًا من شجرة. وقد أتت هذه النماذج التنقّلية لقواعد البيانات إلى الشهرة في ستّينيات القرن الماضي، وواصلت هيمنتها حتى جعلت مكاسبُ الأداء قواعدَ البيانات العلائقية قابلةً للاستخدام في الثمانينيات.</p>
<p>[^relationaltheory]: طوّر Edgar F. Codd نظرية قواعد البيانات العلائقية أثناء عمله في IBM، لكن IBM خافت من أن تُهيمن قاعدة بيانات علائقية على مبيعات IMS. ومع أن IBM بنت في النهاية نموذجًا بحثيًّا سمّته System R، إلا أنه كان مبنيًّا حول لغة جديدة غير علائقية اسمها SEQUEL، بدلًا من لغة Alpha الأصلية لكود. وقد نقل Larry Ellison لغة SEQUEL هذه إلى قاعدة بياناته Oracle Database اعتمادًا على أوراق مؤتمّرات سبقت الإطلاق، ثم غُيِّر الاسم إلى SQL تفاديًا لنزاعات العلامات التجارية.</p>
<h2 id="لقطة-أولى">لقطة أولى</h2>
<p>سنبني في هذا الفصل قاعدة بيانات رسومية (graph database)[^dagoba]. وبينما نبنيها، سنستكشف مساحة المشكلة، ونولّد حلولًا متعددة لقراراتنا التصميمية، ونقارن تلك الحلول لنفهم المقايضات بينها، ثم نختار في النهاية الحلّ المناسب لنظامنا. ويُوضع أولويةٌ أعلى من المعتاد على اختصار الشيفرة، لكن هذه العملية، فيما عدا ذلك، ستعاكس العمليةَ التي استخدمها مهنيو البرمجة منذ الأزل. والغرض من هذا الفصل هو تعليم هذه العملية، وبناء قاعدة بيانات رسومية[^purpose].</p>
<p>[^dagoba]: بدأت حياة قاعدة البيانات هذه بوصفها إضافةً لإدارة الرسوم البيانية غير الدورية الموجّهة (Directed Acyclic Graphs)، أو DAGs. وكان اسم «Dagoba» مقصودًا في الأصل أن ينتهي بحرف h صامت، إجلالًا للكوكب الخيالي المستنقع، لكننا حين قرأنا ظهر قطعة شوكولاتة في يومٍ ما اكتشفنا أن النسخة بلا h تشير إلى مكانٍ للتأمّل الصامت في الروابط بين الأشياء، وهو ما يبدو أنسب.</p>
<p>[^purpose]: غايتا هذا الفصل هما تعليم هذه العملية، وبناء قاعدة بيانات رسومية، وأن نتمتع بالأمر.</p>
<p>سيسمح لنا استخدام قاعدة بيانات رسومية بحلّ بعض المسائل المثيرة بأناقة. فالرسوم البيانية بنية بياناتٍ طبيعية جدًا لاستكشاف الروابط بين الأشياء. والرسم البياني بهذا المعنى مجموعةُ رؤوس (vertices) ومجموعةُ حوافّ (edges)؛ بمعنى آخر، هو مجموعة نقاط موصولة بخطوط. وقاعدة البيانات؟ «قاعدة البيانات» مثل حصن للبيانات. تضع البيانات فيها وتستخرج البيانات منها.</p>
<p>فأيّ نوع من المسائل يمكننا حلّه بقاعدة بيانات رسومية؟ لنفترض أنك تستمتع بتتبّع شجرة الأنساب: الآباء، والأجداد، وأبناء العمومة من الدرجة الثانية مُبعدين مرة، وما شابه. وتودّ تطويرَ نظامٍ يتيح لك صياغةَ استعلاماتٍ (queries) طبيعيةً وأنيقة، مثل «مَن هم أبناء عمومة ثور من الدرجة الثانية مُبعدين مرة؟» أو «ما صلةُ فرييا بفالكيريات؟»</p>
<p>قد يكون مخططٌ معقول لهذه البنية هو وجود جدولٍ للكيانات وجدولٍ للعلاقات. وقد يبدو استعلامُ آباء ثور كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> e.<span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> entities <span class="hljs-keyword">as</span> e, relationships <span class="hljs-keyword">as</span> r
<span class="hljs-keyword">WHERE</span> r.out <span class="hljs-operator">=</span> &quot;Thor&quot; <span class="hljs-keyword">AND</span> r.type <span class="hljs-operator">=</span> &quot;parent&quot; <span class="hljs-keyword">AND</span> r.in <span class="hljs-operator">=</span> e.id
</code></pre>
<p>لكن كيف نوسّع ذلك ليشمل الأجداد؟ سنحتاج إلى استعلامٍ فرعيّ (subquery)، أو إلى استخدام نوعٍ آخر من الامتدادات الخاصة بالمورّد في SQL. وحين نصل إلى أبناء العمومة من الدرجة الثانية مُبعدين مرة، سيكون أمامنا <em>الكثير</em> من SQL.</p>
<p>فما الذي نودّ كتابته؟ شيءٌ موجزٌ ومرنٌ معًا؛ شيءٌ يصوغ استعلامنا بصورة طبيعية ويمتد إلى استعلاماتٍ أخرى من نوعه. فـ <code>second_cousins('Thor')</code> موجز، لكنه لا يمنحنا أي مرونة. أمّا SQL أعلاه فهو مرن، لكنه يفتقر إلى الاختصار.</p>
<p>شيءٌ مثل <code>Thor.parents.parents.parents.children.children.children</code> يصيب توازنًا معقولًا إلى حدٍّ لا بأس به. فالأساسيات (primitives) تمنحنا مرونةَ طرح أسئلةَ كثيرةٍ متشابهة، لكن الاستعلام موجزٌ وطبيعي. وهذا التعبير بعينه يعطينا نتائجَ أكثر مما نريد، لأنه يضم أبناء العمومة من الدرجة الأولى والأشقاء، لكننا نستهدف الصورة الكلّية هنا.</p>
<p>ما أبسطُ شيءٍ يمكننا بناؤه ليمنحنا هذا النوع من الواجهة؟ يمكننا إنشاء قائمة رؤوس (vertices) وقائمة حوافّ (edges)، تمامًا كما في المخطط العلائقي، ثم بناء بعض دوال المساعِدة. وقد يبدو شيءٌ من هذا القبيل:</p>
<pre><code class="language-javascript">V = [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span> ]
E = [ [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>], [<span class="hljs-number">1</span>,<span class="hljs-number">3</span>],  [<span class="hljs-number">2</span>,<span class="hljs-number">4</span>],  [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>],  [<span class="hljs-number">3</span>,<span class="hljs-number">6</span>],  [<span class="hljs-number">3</span>,<span class="hljs-number">7</span>],  [<span class="hljs-number">4</span>,<span class="hljs-number">8</span>]
    , [<span class="hljs-number">4</span>,<span class="hljs-number">9</span>], [<span class="hljs-number">5</span>,<span class="hljs-number">10</span>], [<span class="hljs-number">5</span>,<span class="hljs-number">11</span>], [<span class="hljs-number">6</span>,<span class="hljs-number">12</span>], [<span class="hljs-number">6</span>,<span class="hljs-number">13</span>], [<span class="hljs-number">7</span>,<span class="hljs-number">14</span>], [<span class="hljs-number">7</span>,<span class="hljs-number">15</span>] ]

parents = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertices</span>) {
  <span class="hljs-keyword">var</span> accumulator = []
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i &lt; E.<span class="hljs-property">length</span>; i++) {
    <span class="hljs-keyword">var</span> edge = E[i]
    <span class="hljs-keyword">if</span>(vertices.<span class="hljs-title function_">indexOf</span>(edge[<span class="hljs-number">1</span>]) !== -<span class="hljs-number">1</span>)
      accumulator.<span class="hljs-title function_">push</span>(edge[<span class="hljs-number">0</span>])
  }
  <span class="hljs-keyword">return</span> accumulator
}
</code></pre>
<p>جوهرُ الدالة أعلاه هو المرورُ على قائمة، وتقييمُ بعض الشيفرة لكل عنصر، وبناءُ مُراكِم (accumulator) للنتائج. غير أنها ليست واضحةً تمامًا كما يمكن أن تكون، لأن بنيةَ التكرار تُدخل بعض التعقيد غير الضروري.</p>
<p>كان أجمل لو توفّر بناءُ تكرارٍ أكثر تحديدًا مصمَّمٌ لهذا الغرض. وتبيّن أن دالة <code>reduce</code> تفعل ذلك بالضبط: فمعطى قائمةٍ ودالة، فإنها تقيّم الدالة لكل عنصرٍ من عناصر القائمة، مع تمرير المُراكِم عبر كل تمريرة تقييم.</p>
<p>وعند كتابتها بهذا النمط الوظيفي (functional) الأكثر، تصبح استعلاماتنا أقصرَ وأوضح:</p>
<pre><code class="language-javascript">parents  = <span class="hljs-function">(<span class="hljs-params">vertices</span>) =&gt;</span> E.<span class="hljs-title function_">reduce</span>( <span class="hljs-function">(<span class="hljs-params">acc, [parent, child]</span>)
         =&gt;</span> vertices.<span class="hljs-title function_">includes</span>(child)  ? acc.<span class="hljs-title function_">concat</span>(parent) : acc , [] )
children = <span class="hljs-function">(<span class="hljs-params">vertices</span>) =&gt;</span> E.<span class="hljs-title function_">reduce</span>( <span class="hljs-function">(<span class="hljs-params">acc, [parent, child]</span>)
         =&gt;</span> vertices.<span class="hljs-title function_">includes</span>(parent) ? acc.<span class="hljs-title function_">concat</span>(child)  : acc , [] )
</code></pre>
<p>بمعطى قائمة رؤوس، نمرّ على الحوافّ، فنضيف أبَ الحافة إلى المُراكِم إذا كان ابنُ الحافة موجودًا في قائمة إدخالنا. ودالة <code>children</code> مطابقةٌ لها، لكنها تفحص أبَ الحافة لتحدّد هل تضيف ابنَ الحافة أم لا.</p>
<p>هذه الدوال JavaScript صالحة، لكنها تستخدم بعض المزايا التي لم تنفّذها المتصفحات حتى لحظة كتابة هذا الكتاب. وهذه النسخة المترجَمة ستعمل اليوم:</p>
<pre><code class="language-javascript">parents  = <span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) { <span class="hljs-keyword">return</span> E.<span class="hljs-title function_">reduce</span>(
  <span class="hljs-keyword">function</span>(<span class="hljs-params">acc, e</span>) { <span class="hljs-keyword">return</span> ~x.<span class="hljs-title function_">indexOf</span>(e[<span class="hljs-number">1</span>]) ? acc.<span class="hljs-title function_">concat</span>(e[<span class="hljs-number">0</span>]) : acc }, [] )}
children = <span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) { <span class="hljs-keyword">return</span> E.<span class="hljs-title function_">reduce</span>(
  <span class="hljs-keyword">function</span>(<span class="hljs-params">acc, e</span>) { <span class="hljs-keyword">return</span> ~x.<span class="hljs-title function_">indexOf</span>(e[<span class="hljs-number">0</span>]) ? acc.<span class="hljs-title function_">concat</span>(e[<span class="hljs-number">1</span>]) : acc }, [] )}
</code></pre>
<p>الآن يمكننا أن نقول شيئًا كهذا:</p>
<pre><code class="language-javascript">    <span class="hljs-title function_">children</span>(<span class="hljs-title function_">children</span>(<span class="hljs-title function_">children</span>(<span class="hljs-title function_">parents</span>(<span class="hljs-title function_">parents</span>(<span class="hljs-title function_">parents</span>([<span class="hljs-number">8</span>]))))))
</code></pre>
<p>تُقرأ بالمقلوب وتضيعنا بين أقواسٍ سخيفة، لكنها عدا ذلك قريبةٌ جدًا مما أردنا. خُذ لحظةً للنظر في الشيفرة. هل ترى أيَّ طرقٍ لتحسينها؟</p>
<p>نحن نتعامل مع الحوافّ بوصفها متغيّرًا عامًّا (global)، ما يعني أنه لا يمكن أن يكون لدينا سوى قاعدة بياناتٍ واحدة في كل مرة عند استخدام دوال المساعِدة هذه. وهذا محدودٌ نوعًا ما.</p>
<p>كما أننا لا نستخدم الرؤوس إطلاقًا. بماذا يخبرنا ذلك؟ يدلّ على أن كل ما نحتاجه موجودٌ في مصفوفة الحوافّ، وهو صحيحٌ في هذه الحالة: فقيمُ الرؤوس قيمٌ مفردة (scalars)، لذا فهي موجودةٌ بصورة مستقلة في مصفوفة الحوافّ. وإن أردنا الإجابة عن أسئلةٍ مثل «ما صلةُ فرييا بفالكيريات؟» فسنحتاج إلى إضافة مزيدٍ من البيانات إلى الرؤوس، أي جعلُها قيمًا مركّبة، أي ينبغي أن تشير مصفوفةُ الحوافّ إلى الرؤوس بدلًا من نسخ قيمها.</p>
<p>ينطبق الأمرُ نفسه على حوافّنا: فهي تحوي رأس «داخل» (in) ورأس «خارج» (out)[^vertexnote]، لكن دون وسيلةٍ أنيقة لدمج معلوماتٍ إضافية. وسنحتاج إلى ذلك للإجابة عن أسئلةٍ مثل «كم عدد الآباء البدلاء لدى لوكي؟» أو «كم عدد أبناء Odin قبل أن يُولد ثور؟»</p>
<p>لا تحتاج إلى أن تُغمض عينيك بقوةٍ كي تلاحظ أن شيفرةَ المنتقيين (selectors) لدينا متشابهةٌ جدًا، وهو ما يشير إلى أنه قد يوجد تجريد (abstraction) أعمق تنبع منه.</p>
<p>هل ترى مشكلاتٍ أخرى؟</p>
<p>[^vertexnote]: لاحظ أننا نُنمذج الحوافّ كزوجٍ من الرؤوس. ولاحظ أيضًا أن تلك الأزواج مرتّبة، لأننا نستخدم مصفوفات. وهذا يعني أننا نُنمذج <em>رسمًا بيانيًّا موجّهًا</em>، حيث لكل حافة رأسُ بدايةٍ ورأسُ نهاية. فيتحوّل نموذجنا البصري «نقاطٌ وخطوط» إلى نموذج «نقاطٍ وأسهم».
وهذا يضيف تعقيدًا إلى نموذجنا، لأننا علينا تتبّع اتجاه الحوافّ، لكنه يتيح أيضًا أن نطرح أسئلةً أكثر إثارةً للاهتمام، مثل «أيّ الرؤوس تشير إلى الرأس رقم 3؟» أو «أيّ رأس له أكبر عددٍ من الحوافّ الخارجة؟» وإن احتجنا إلى نمذجة رسمٍ بياني غير موجّه، فيمكننا إضافة حافةٍ معكوسة لكل حافةٍ موجودة في رسمنا الموجّه. وقد يكون الذهاب في الاتجاه الآخر مرهقًا: محاكاة رسمٍ موجّه انطلاقًا من رسمٍ غير موجّه. هل يمكنك أن تجد طريقةً لفعل ذلك؟</p>
<h2 id="ابن-رسما-بيانيا-أفضل">ابنِ رسمًا بيانيًّا أفضل</h2>
<p>لنحلّ بعض المشكلات التي اكتشفناها. فكون رؤوسنا وحوافّنا بنىً عامّةً يحدّنا إلى رسمٍ بيانيٍّ واحد في كل مرة، لكننا نودّ أن يكون لدينا أكثر من ذلك. ولحلّ هذا سنحتاج إلى بعض البنية. لنبدأ باسم فضاء (namespace).</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span> = {}                                     <span class="hljs-comment">// the namespace</span>
</code></pre>
<p>سنستخدم كائنًا (object) بوصفه اسم الفضاء. فالكائن في JavaScript هو في معظمه مجردُ مجموعة أزواج مفتاح/قيمة غير مرتّبة. ولا نملك في JavaScript سوى أربع بنى بياناتٍ أساسيةٍ للاختيار من بينها، لذا سنستخدم هذه كثيرًا. (السؤالُ الممتعُ الذي يمكن طرحُه على الناس في الحفلات هو: «ما هي بنى البيانات الأساسية الأربع في JavaScript؟»)</p>
<p>الآن نحتاج إلى بعض الرسوم البيانية. يمكننا بناؤها بنمط OOP كلاسيكيّ، لكن JavaScript تتيح لنا الوراثة النماذُجية (prototypal inheritance)، ما يعني أننا نستطيع أن نبني كائن prototype—سنسميه <code>Dagoba.G</code>—ثم أن ننشئ نسخًا منه باستخدام دالة مصنِع (factory function). ومن مزايا هذه المقاربة أننا يمكننا إعادةُ أنواعٍ مختلفةٍ من الكائنات من المصنع، بدلًا من ربط عملية الإنشاء بباني صنفٍ واحد. فنحصل بذلك على بعض المرونة الإضافية مجانًا.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span> = {}                                   <span class="hljs-comment">// the prototype</span>

<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">graph</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">V, E</span>) {                 <span class="hljs-comment">// the factory</span>
  <span class="hljs-keyword">var</span> graph = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>( <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span> )

  graph.<span class="hljs-property">edges</span>       = []                        <span class="hljs-comment">// fresh copies so they&#x27;re not shared</span>
  graph.<span class="hljs-property">vertices</span>    = []
  graph.<span class="hljs-property">vertexIndex</span> = {}                        <span class="hljs-comment">// a lookup optimization</span>

  graph.<span class="hljs-property">autoid</span> = <span class="hljs-number">1</span>                              <span class="hljs-comment">// an auto-incrementing ID counter</span>

  <span class="hljs-keyword">if</span>(<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(V)) graph.<span class="hljs-title function_">addVertices</span>(V)     <span class="hljs-comment">// arrays only, because you wouldn&#x27;t</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(E)) graph.<span class="hljs-title function_">addEdges</span>(E)        <span class="hljs-comment">//   call this with singular V and E</span>

  <span class="hljs-keyword">return</span> graph
}
</code></pre>
<p>سنقبل وسيطين اختياريَّين: قائمة رؤوس وقائمة حوافّ. وJavaScript متساهلةٌ نوعًا ما بشأن الوسائط، لذا فجميع الوسائط المسمّاة اختياريةٌ وتُعيَّن إلى <code>undefined</code> (غير معرَّف) إن لم تُقدَّم[^optionalparams]. وغالبًا ما سنكون قد يملكنا الرؤوس والحوافّ قبل بناء الرسم البياني وسنستخدم الوسيطَين V وE، لكن من الشائع أيضًا ألّا يكون لدينا هما وقت الإنشاء وأن نبني الرسم البياني برمجيًّا[^graphbuilding].</p>
<p>[^optionalparams]: وهي متساهلةٌ في الاتجاه الآخر أيضًا: جميع الدوال متغيّرةُ العدد (variadic)، وجميع الوسائط متاحةٌ بالموضع عبر الكائن <code>arguments</code>، وهو أشبهُ بمصفوفةٍ دون أن يكون مصفوفةً تمامًا. («متغيّرةُ العدد» طريقةٌ فخمةٌ لقول إن دالةً ذات عددِ آخذٍ غير محدّد. و«الدالة ذات عددِ آخذٍ غير محدّد» طريقةٌ فخمةٌ لقول إنها تأخذ عددًا متغيّرًا من الوسائط.)</p>
<p>[^graphbuilding]: فحوصُ <code>Array.isArray</code> هنا موجودةٌ للتمييز بين حالتَي الاستخدام المختلفتين، لكننا لن نطبّق عمومًا كلَّ التحققات التي يُتوقَّع أن تكون في شيفرة الإنتاج، حتى نركّز على البنية (architecture) بدلًا من سلال المهملات.</p>
<p>ثم ننشئ كائنًا جديدًا يملك كلَّ نقاطِ قوة النموذج الأولي (prototype) ولا شيءَ من نقاط ضعفه. نبني مصفوفةً جديدةً تمامًا (إحدى بنى بيانات JavaScript الأساسية الأخرى) لحوافّنا، وأخرى للرؤوس، وكائنًا جديدًا اسمه <code>vertexIndex</code> وعدّادَ معرّفات—وسنتحدّث عن الأخيرين لاحقًا. (فكّر: لماذا لا يمكن أن نضع هذه في النموذج الأولي؟)</p>
<p>ثم نستدعي <code>addVertices</code> و<code>addEdges</code> من داخل مصنعنا، فلنعرّفهما الآن.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">addVertices</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">vs</span>) { vs.<span class="hljs-title function_">forEach</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">addVertex</span>.<span class="hljs-title function_">bind</span>(<span class="hljs-variable language_">this</span>)) }
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">addEdges</span>    = <span class="hljs-keyword">function</span>(<span class="hljs-params">es</span>) { es.<span class="hljs-title function_">forEach</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">addEdge</span>  .<span class="hljs-title function_">bind</span>(<span class="hljs-variable language_">this</span>)) }
</code></pre>
<p>حسنًا، كان هذا سهلًا أكثر مما ينبغي—فقد اكتفينا بأن سلّمنا العملَ إلى <code>addVertex</code> و<code>addEdge</code>. وينبغي أن نعرّفهما أيضًا الآن.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">addVertex</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) {         <span class="hljs-comment">// accepts a vertex-like object</span>
  <span class="hljs-keyword">if</span>(!vertex.<span class="hljs-property">_id</span>)
    vertex.<span class="hljs-property">_id</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">autoid</span>++
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findVertexById</span>(vertex.<span class="hljs-property">_id</span>))
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;A vertex with that ID already exists&#x27;</span>)

  <span class="hljs-variable language_">this</span>.<span class="hljs-property">vertices</span>.<span class="hljs-title function_">push</span>(vertex)
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">vertexIndex</span>[vertex.<span class="hljs-property">_id</span>] = vertex         <span class="hljs-comment">// a fancy index thing</span>
  vertex.<span class="hljs-property">_out</span> = []; vertex.<span class="hljs-property">_in</span> = []             <span class="hljs-comment">// placeholders for edge pointers</span>
  <span class="hljs-keyword">return</span> vertex.<span class="hljs-property">_id</span>
}
</code></pre>
<p>إذا لم يكن للرأس خاصيةُ <code>_id</code> أصلًا، فنمنحه واحدةً باستخدام معرّفنا التلقائي (autoid)[^autoid]. أمّا إذا كانت <code>_id</code> موجودةً أصلًا على رأسٍ في رسمنا البياني، فإننا نرفض الرأس الجديد. لحظة، متى يحدث ذلك؟ وما هو الرأس بالضبط؟</p>
<p>[^autoid]: لماذا لا يمكننا ببساطةٍ أن نستخدم <code>this.vertices.length</code> هنا؟</p>
<p>في نظامٍ كائنيّ التوجّهٍ تقليدي، يمكننا أن نتوقّع العثورَ على صنفٍ للرؤوس، تكون كلُّ الرؤوس نسخًا منه. لكننا سنتبع مقاربةً مختلفة، ونعتبر رأسًا أيَّ كائنٍ يحوي الخاصيات الثلاث <code>_id</code> و<code>_in</code> و<code>_out</code>. ولماذا ذلك؟ وفي النهاية، الأمرُ يعود إلى منح Dagoba التحكّمَ في البيانات التي تُشارَك مع التطبيق المضيف (host application).</p>
<p>فإذا أنشأنا نسخةً من <code>Dagoba.Vertex</code> داخل دالة <code>addVertex</code>، فلن تُشارَك بياناتُنا الداخلية مع التطبيق المضيف أبدًا. أمّا إذا قبلنا نسخةً من <code>Dagoba.Vertex</code> كوسيطٍ لدالة <code>addVertex</code>، فيمكن للتطبيق المضيف أن يحتفظ بمؤشّرٍ إلى كائن الرأس ذلك ويعدّله أثناء التشغيل، فيكسر ثوابتنا (invariants).</p>
<p>فإذا أنشأنا كائنَ نسخةِ رأس، فنحن مجبرّون على أن نقرّر مقدمًا: هل سننسخُ البيانات المقدَّمة دائمًا إلى كائنٍ جديد—مما قد يضاعف استهلاكَنا للمساحة— أم نسمحُ للتطبيق المضيف بوصولٍ غير مقيَّدٍ إلى كائنات قاعدة البيانات. وهناك توترٌ هنا بين الأداء والحماية، والتوازنُ المناسب يعتمد على حالة استخدامك المحدّدة.</p>
<p>يسمح لنا التوصيفُ الهيكلي (duck typing) على خصائص الرأس بأن نتّخذ هذا القرار وقت التشغيل، إما بالنسخ العميق (deep copying)[^deepcopying] للبيانات الواردة أو باستخدامها مباشرةً كـرأس[^vertexdecision]. ولا نودّ دائمًا وضعَ مسؤولية الموازنة بين الأمان والأداء بيد المستخدم، لكن بما أن مجموعتَي حالات الاستخدام تتباعدان إلى هذا الحدّ، فإن تلك المرونة الإضافية مهمّة.</p>
<p>والآن وقد حصلتَ على رأسنا الجديد، سنضيفه إلى قائمة الرؤوس في رسمنا البياني، ونضيفه إلى <code>vertexIndex</code> ليُبحث عنه بكفاءة بحسب <code>_id</code>، ونضيف إليه خاصيتين إضافيتين: <code>_out</code> و<code>_in</code>، وسيصير كلٌّ منهما قائمةَ حوافّ[^edgelistadt].</p>
<p>[^deepcopying]: كثيرًا ما، حين نواجه تسريبًا في المساحة بسبب النسخ العميق، يكون الحلّ هو استخدام بنية بياناتٍ دائمة بنسخ المسارات (path-copying persistent data structure)، وهي تتيح تغييراتٍ خاليةً من الطفر مقابل $\\log{}N$ فقط من المساحة الإضافية. لكن المشكلة تظلّ قائمة: فإذا احتفظ التطبيق المضيف بمؤشّر إلى بيانات الرأس، أمكنه أن يطفر بتلك البيانات في أي وقت، بغضّ النظر عن القيود التي نفرضها في قاعدة بياناتنا. والحلّ العمليّ الوحيد هو نسخُ الرؤوس نسخًا عميقًا، وهو ما يضاعف استهلاكنا للمساحة. وتتعلّق حالة الاستخدام الأصلية لـDagoba برؤوسٍ يعاملها التطبيق المضيف على أنها غير قابلة للتغيير، وهذا يتيح لنا تفادي هذه المشكلة، لكنه يتطلّب قدرًا معيّنًا من الانضباط من جانب المستخدم.</p>
<p>[^vertexdecision]: يمكننا اتّخاذ هذا القرار بناءً على وسيط تهيئةٍ على مستوى Dagoba، أو تهيئةٍ خاصة بالرسم البياني، أو ربما نوعٍ ما من الاستدلال التقريبي (heuristic).</p>
<p>[^edgelistadt]: نستخدم مصطلح <em>قائمة</em> للإشارة إلى بنية البيانات المجرّدة (abstract data structure) التي تتطلّب عمليات دفع (push) وتكرار (iterate). ونستخدم بنية البيانات الملموسة «مصفوفة» في JavaScript لتلبية واجهة البرمجة (API) التي تتطلّبها تجريديةُ القائمة. ومن الناحية التقنية، كلٌّ من «قائمة الحوافّ» و«مصفوفة الحوافّ» صحيح، لذا أيُّهما نستعمله في لحظةٍ ما يعتمد على السياق: فإن كنا نعتمد على تفاصيل مصفوفات JavaScript، مثل الخاصية <code>.length</code>، قلنا «مصفوفة حوافّ». وإلّا قلنا «قائمة حوافّ» للدلالة على أن أيّ تنفيذٍ للقائمة سيفي بالغرض.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">addEdge</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">edge</span>) {             <span class="hljs-comment">// accepts an edge-like object</span>
  edge.<span class="hljs-property">_in</span>  = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findVertexById</span>(edge.<span class="hljs-property">_in</span>)
  edge.<span class="hljs-property">_out</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findVertexById</span>(edge.<span class="hljs-property">_out</span>)

  <span class="hljs-keyword">if</span>(!(edge.<span class="hljs-property">_in</span> &amp;&amp; edge.<span class="hljs-property">_out</span>))
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;That edge&#x27;s &quot;</span> + (edge.<span class="hljs-property">_in</span> ? <span class="hljs-string">&#x27;out&#x27;</span> : <span class="hljs-string">&#x27;in&#x27;</span>)
                                       + <span class="hljs-string">&quot; vertex wasn&#x27;t found&quot;</span>)

  edge.<span class="hljs-property">_out</span>.<span class="hljs-property">_out</span>.<span class="hljs-title function_">push</span>(edge)                     <span class="hljs-comment">// edge&#x27;s out vertex&#x27;s out edges</span>
  edge.<span class="hljs-property">_in</span>.<span class="hljs-property">_in</span>.<span class="hljs-title function_">push</span>(edge)                       <span class="hljs-comment">// vice versa</span>

  <span class="hljs-variable language_">this</span>.<span class="hljs-property">edges</span>.<span class="hljs-title function_">push</span>(edge)
}
</code></pre>
<p>أولًا نجد الرأسين اللذين تصل بينهما الحافة، ثم نرفض الحافة إذا كان أحدهما مفقودًا. وسنستخدم دالةً مساعدةً لتسجيل خطأ عند الرفض. فكل الأخطاء تمرّ عبر هذه الدالة المساعدة، لذا يمكننا تجاوز سلوكها على أساس كل تطبيق. ويمكننا لاحقًا توسيع ذلك للسماح بتسجيل معالِجات <code>onError</code>، ليتمكّن التطبيق المضيف من ربط استدعاءاته الخاصة دون الكتابة فوق الدالة المساعدة. وقد نسمح بتسجيل هذه المعالجات لكل رسم بياني، أو لكل تطبيق، أو كليهما، بحسب مستوى المرونة المطلوب.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">error</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(msg)
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}
</code></pre>
<p>ثم نضيف حافتنا الجديدة إلى قائمتَي حوافّ الرأسين: قائمة الحوافّ الخارجة لِرأس الحافة الخارج، وقائمة الحوافّ الداخلة للرأس الداخل.</p>
<p>وهذه كل بنية الرسم البياني التي نحتاج إليها الآن!</p>
<h2 id="إلى-الاستعلام">إلى الاستعلام</h2>
<p>لا يتكوّن هذا النظام في الحقيقة إلّا من جزأين: الجزء الذي يحمل الرسم البياني، والجزء الذي يجيب عن الأسئلة المتعلقة بالرسم البياني. أمّا الجزء الذي يحمل الرسم البياني فهو بسيطٌ إلى حدّ ما، كما رأينا. أمّا جزء الاستعلام فهو أعقد قليلًا.</p>
<p>سنبدأ كما في السابق تمامًا، بنموذجٍ أولي ومصنع استعلام.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Q</span> = {}

<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">query</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">graph</span>) {                <span class="hljs-comment">// factory</span>
  <span class="hljs-keyword">var</span> query = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">create</span>( <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Q</span> )

  query.   graph = graph                        <span class="hljs-comment">// the graph itself</span>
  query.   state = []                           <span class="hljs-comment">// state for each step</span>
  query. program = []                           <span class="hljs-comment">// list of steps to take</span>
  query.<span class="hljs-property">gremlins</span> = []                           <span class="hljs-comment">// gremlins for each step</span>

  <span class="hljs-keyword">return</span> query
}
</code></pre>
<p>والآن حان الوقت للتعرّف على بعض الأصدقاء.</p>
<p><em>البرنامج</em> (program) سلسلةٌ من <em>الخطوات</em> (steps). كل خطوة تشبه أنبوبًا في خط أنابيب—تدخل قطعةُ بياناتٍ من أحد طرفيه، فتُحوَّل بطريقةٍ ما، وتخرج من الطرف الآخر. وخطُّ أنابيبنا لا يعمل تمامًا بهذه الطريقة، لكنه تقديرٌ أوّليٌّ جيّد.</p>
<p>يمكن لكل خطوة في برنامجنا أن تكون لها <em>حالة</em> (state)، و<code>query.state</code> قائمةُ حالاتٍ لكل خطوة، يتوافق فهرسُها مع قائمة الخطوات في <code>query.program</code>.</p>
<p><em>الشرشور</em> (gremlin) مخلوقٌ يسافر عبر الرسم البياني منفّذًا أوامرنا. قد يكون وجودُ الشرشور في قاعدة بياناتٍ أمرًا مفاجئًا، لكنّ نسبه ترجع إلى <a href="http://euranova.eu/upl_docs/publications/an-empirical-comparison-of-graph-databases.pdf">Blueprints</a> لـTinkerpop، وإلى <a href="http://edbt.org/Proceedings/2013-Genova/papers/workshops/a29-holzschuher.pdf">لغتَي استعلام Gremlin وPacer</a>. فهو يتذكّر أين كان، ويتيح لنا إيجاد إجاباتٍ لأسئلةٍ مثيرة.</p>
<p>أتذكر ذلك السؤال الذي أردنا الإجابة عنه بشأن أبناء عمومة ثور مُبعدين مرة؟ وقد قرّرنا أن <code>Thor.parents.parents.parents.children.children.children</code> طريقةٌ جيّدة إلى حدٍّ لا بأس بها للتعبير عن ذلك. وكلُّ نسخة <code>parents</code> أو <code>children</code> هي خطوةٌ في برنامجنا. وتحتوي كلٌّ من تلك الخطوات على مرجعٍ إلى <em>نوع الأنبوب</em> (pipetype) الخاص بها، وهو الدالة التي تؤدّي عملية تلك الخطوة.</p>
<p>قد يبدو ذلك الاستعلام في نظامنا الفعلي هكذا:</p>
<pre><code class="language-javascript">    g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>()
</code></pre>
<p>كل خطوة من هذه الخطوات هي استدعاءُ دالة، لذا يمكنها أن تأخذ <em>وسائط</em>. ويمرّر المفسِّر وسائط الخطوة إلى دالة نوع الأنبوب الخاص بها، ففي الاستعلام <code>g.v('Thor').out(2, 3)</code> تتلقّى دالة نوع الأنبوب <code>out</code> القيمة <code>[2, 3]</code> بوصفها وسيطها الأول.</p>
<p>سنحتاج إلى طريقةٍ لإضافة خطواتٍ إلى استعلامنا. وهذه دالةٌ مساعدةٌ لذلك:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Q</span>.<span class="hljs-property">add</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">pipetype, args</span>) { <span class="hljs-comment">// add a new step to the query</span>
  <span class="hljs-keyword">var</span> step = [pipetype, args]
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>.<span class="hljs-title function_">push</span>(step)                 <span class="hljs-comment">// step is a pair of pipetype and its args</span>
  <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>
}
</code></pre>
<p>كل خطوة كيانٌ مركَّب، يجمع بين دالة نوع الأنبوب والوسائط التي تُطبَّق على تلك الدالة. يمكننا أن نجمع الاثنين معًا في دالةٍ مطبَّقة جزئيًّا (partially applied function) في هذه المرحلة بدلًا من استخدام ثنائيّ (tuple)[^tupleadt]، لكننا عندئذٍ نفقد بعض القدرة على التأمّل في 내부 (introspection) التي سيثبت لاحقًا أنها مفيدة.</p>
<p>[^tupleadt]: الثنائيُّ (tuple) بنيةُ بياناتٍ مجرّدة أخرى—أكثر تقييدًا من القائمة. وعلى وجه التحديد، للثنائيّ حجمٌ ثابت: في حالتنا هذه نستخدم ثنائيًّا من الدرجة الثانية (المعروف أيضًا بـ«زوج» في المصطلحات التقنية لباحثي بنى البيانات). واستخدامُ مصطلح أضيق بنية بياناتٍ مجرّدةٍ مطلوبة هو مجاملةٌ للمستنِدين لاحقًا.</p>
<p>سنستخدم مجموعةً صغيرة من مُهيّئات الاستعلام (query initializers) تولّد استعلامًا جديدًا من رسمٍ بياني. وهذه واحدةٌ تبدأ معظمَ أمثلتنا: الدالة <code>v</code>. فهي تبني استعلامًا جديدًا، ثم تستخدم دالتنا المساعدة <code>add</code> لملء برنامج الاستعلام الأوّلي. وهي تستعين بنوع الأنبوب <code>vertex</code>، الذي سننظر إليه قريبًا.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">v</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {                       <span class="hljs-comment">// query initializer: g.v() -&gt; query</span>
  <span class="hljs-keyword">var</span> query = <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">query</span>(<span class="hljs-variable language_">this</span>)
  query.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;vertex&#x27;</span>, [].<span class="hljs-property">slice</span>.<span class="hljs-title function_">call</span>(<span class="hljs-variable language_">arguments</span>)) <span class="hljs-comment">// add a step to our program</span>
  <span class="hljs-keyword">return</span> query
}
</code></pre>
<p>لاحظ أن <code>[].slice.call(arguments)</code> تعني بلغة JavaScript «أعطني من فضلك مصفوفةً من وسائط هذه الدالة». ولأن <code>arguments</code> يتصرّف كمصفوفة في كثيرٍ من الحالات، فإن الاعتقاد بأنه مصفوفةٌ أصلًا ليس ظلمًا، لكنه يفتقد كثيرًا من الوظائف التي نستفيد منها في مصفوفات JavaScript الحديثة.</p>
<h2 id="مشكلة-الاستعجال">مشكلة الاستعجال</h2>
<p>قبل أن ننظر إلى أنواع الأنابيب ذاتها، سنأخذ منعطفًا إلى عالم استراتيجيات التنفيذ المثير. وهناك مذهبان رئيسيان في التفكير: جماعة «الاستدعاء بالقيمة» (Call By Value)، وتُعرف أيضًا باسم «المتسرّعين» (eager beavers)، تشترد في إلزام تقييم كل الوسائط قبل تطبيق الدالة. أمّا الفصيل المقابل، جماعة «الاستدعاء بالحاجة» (Call By Need)، فتصفّح إلى التأجيل حتى آخر لحظةٍ ممكنة قبل أن تفعل أي شيء—بعبارةٍ واحدة، هم كسولون (lazy).</p>
<p>وبما أن JavaScript لغةٌ صارمة، فإنها ستعالج كل خطوة من خطواتنا لحظة استدعائها. وعندئذٍ نتوقّع أن يبدأ تقييم <code>g.v('Thor').out().in()</code> بإيجاد رأس ثور، ثم بإيجاد كل الرؤوس المتّصلة به عبر الحوافّ الخارجة، وأخيرًا أن يُعيد من كلٍّ من تلك الرؤوس كلَّ الرؤوس المتّصلة بها عبر الحوافّ الداخلة.</p>
<p>في لغةٍ غير صارمة سنحصل على النتيجة نفسها—فاستراتيجية التنفيذ لا تصنع فرقًا كبيرًا هنا. لكن ماذا لو أضفنا بضع استدعاءاتٍ إضافية؟ وبالنظر إلى مدى ترابط ثور، فإن استعلامنا <code>g.v('Thor').out().out().out().in().in().in()</code> قد ينتج نتائجَ كثيرة—بل قد ينتج، لأننا لا نحدّ قائمةَ رؤوسنا بالنتائج الفريدة، نتائجَ أكثر بكثير مما لدينا من رؤوسٍ في رسمنا البياني الكلّي.</p>
<p>ربما لا يهمّنا سوى الحصول على بضع نتائجَ فريدة، لذا سنغيّر الاستعلام قليلًا: <code>g.v('Thor').out().out().out().in().in().in().unique().take(10)</code>. صار استعلامنا ينتج 10 نتائجٍ على الأكثر. لكن ماذا يحدث إن قيّمناه باستعجال؟ سنظلّ مضطرين إلى تراكم أسّ من النتائج قبل إعادة العشرة الأولى فقط.</p>
<p>على جميع قواعد البيانات الرسومية أن تدعم آليةً تُبقي العملَ في أقلّ مقدارٍ ممكن، ومعظمها يختار شكلًا من أشكال التقييم غير الصارم لهذا الغرض. وبما أننا نبني مفسرنا الخاص، فإن التقييمَ الكسول (lazy evaluation) لبرنامجنا ممكن، لكننا قد نضطر إلى مواجهة بعض النتائج اللاحقة.</p>
<h2 id="آثار-استراتيجية-التنفيذ-في-نموذجنا-الذهني">آثارُ استراتيجية التنفيذ في نموذجنا الذهني</h2>
<p>حتى الآن كان نموذجنا الذهني للتقييم بسيطًا إلى حدٍّ كبير:</p>
<ul>
<li>طلب مجموعة رؤوس</li>
<li>تمرير المجموعة المُعادة كإدخالٍ إلى أنبوب</li>
<li>التكرار بقدر الحاجة</li>
</ul>
<p>نودّ الإبقاء على ذلك النموذج لمستخدمينا، لأنه أسهل في التفكير والتحليل، لكننا كما رأينا لم نَعُد قادرين على استخدام ذلك النموذج في التنفيذ. فجعلُ المستخدمين يفكّرون في نموذجٍ يختلف عن التنفيذ الفعلي مصدرٌ لكثيرٍ من الألم. والتجريدُ المتسرّب (leaky abstraction) هو نسخةٌ صغيرة النطاق من هذا؛ وعلى النطاق الواسع يمكن أن يقود إلى الإحباط والتضارب المعرفي والانصراف بغضب.</p>
<p>غير أن حالتنا تكاد تكون مثاليةً لهذا الخداع: فالجابةُ عن أي استعلام ستكون واحدةً مهما اختلف نموذجُ التنفيذ. الفرقُ الوحيد هو الأداء. والمقايضةُ تُقابل بين أن يتعلّم جميعُ المستخدمين نموذجًا أعقدَ قبل استخدام النظام، أو أن نُجبر مجموعةً فرعيةً من المستخدمين على الانتقال من النموذج البسيط إلى المعقّد ليتمكّنوا من التفكير بشكل أفضل في أداء الاستعلامات.</p>
<p>ومن العوامل التي ينبغي أن نأخذها في الحسبان عند مواجهة هذا القرار:</p>
<ul>
<li>الصعوبةُ المعرفية النسبية لتعلّم النموذج البسيط مقارنةً بالنموذج الأكثر تعقيدًا؛</li>
<li>العبءُ المعرفي الإضافي الذي يفرضه استخدام النموذج البسيط أولًا ثم التقدّم إلى المعقّد، مقابل تخطّي البسيط وتعلّم المعقّد وحده؛</li>
<li>المجموعةُ الفرعية من المستخدمين الملزَمين بالانتقال، من حيث حجمها النسبي، وتوفّرها الذهني، والوقت المتاح، وهكذا.</li>
</ul>
<p>في حالتنا تكون هذه المقايضةُ معقولةً. ففي معظم الاستخدامات ستعيد الاستعلاماتُ نتائجَها بسرعةٍ كافيةٍ حتى لا يحتاج المستخدمون إلى الانشغال بتحسين بنية استعلاماتهم أو بتعلّم النموذج الأعمق. أمّا الذين سيحتاجون إلى ذلك فهم المستخدمون الذين يكتبون استعلاماتٍ متقدّمةً على مجموعات بياناتٍ ضخمة، وهُم على الأرجح أيضًا المستخدمون الأكثر استعدادًا للانتقال إلى نموذجٍ جديد. وإضافةً إلى ذلك، نأمل ألّا يفرض استخدامُ النموذج البسيط قبل تعلّم النموذج الأكثر تعقيدًا إلّا ًا من الصعوبة الإضافية.</p>
<p>سنتعمّق في هذا النموذج الجديد قريبًا، لكن في هذه الأثناء إليك بعضَ النقاط الممّا يُستحضر في القسم التالي:</p>
<ul>
<li>يعيد كل أنبوب نتيجةً واحدةً في كل مرة، لا مجموعة نتائج. وقد يُفعَّل كل أنبوب مرّاتٍ عديدة أثناء تقييم استعلام.</li>
<li>تتحكّم رأسٌ للقراءة/الكتابة (read/write head) في تحديد الأنبوب الذي يُفعَّل تاليًا. وتبدأ الرأسُ في نهاية خط الأنابيب، ويتوجّه حركتُها بحسب نتيجة الأنبوب النشط حاليًا.</li>
<li>قد تكون تلك النتيجة أحد الشراشير التي ذكرناها آنفًا. ويمثّل كل شرشور نتيجةَ استعلامٍ محتملة، ويحمل معه حالةً أثناء مروره في الأنابيب. وتُجبر الشراشيرُ الرأسَ على التحرّك إلى اليمين.</li>
<li>يمكن للأنبوب أن يُعيد نتيجةً قيمتها 'pull'، وهي إشارةٌ إلى الرأس بأنه يحتاج إلى إدخال، وتحرّكه إلى اليمين.</li>
<li>النتيجةُ ذات القيمة 'done' تُخبر الرأسَ بأن لا شيءَ سابقًا يحتاج إلى إعادة التفعيل، وتحرّك الرأسَ إلى اليسار.</li>
</ul>
<h2 id="أنواع-الأنابيب">أنواع الأنابيب</h2>
<p>تشكّل أنواعُ الأنابيب جوهرَ نظامنا. ومتى فهمنا كيف يعمل كل نوع منها، تتوفّر لنا أساسٌ أفضل لفهم كيفية استدعائها وترتيبها معًا في المفسِّر.</p>
<p>سنبدأ بصنع موضعٍ لوضع أنواع أنابيبنا، وطريقةٍ لإضافة أنواعٍ جديدة.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Pipetypes</span> = {}

<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">addPipetype</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">name, fun</span>) {              <span class="hljs-comment">// adds a chainable method</span>
  <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Pipetypes</span>[name] = fun
  <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Q</span>[name] = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">add</span>(name, [].<span class="hljs-property">slice</span>.<span class="hljs-title function_">apply</span>(<span class="hljs-variable language_">arguments</span>)) }  <span class="hljs-comment">// capture pipetype and args</span>
}
</code></pre>
<p>تُضاف دالةُ نوع الأنبوب إلى قائمة أنواع الأنابيب، ثم تُضاف دالةٌ جديدة إلى كائن الاستعلام. ولكل نوع أنبوب دالةُ استعلامٍ مقابلة. وتضيف تلك الدالة خطوةً جديدة إلى برنامج الاستعلام، مع وسائطها.</p>
<p>حين نقيّم <code>g.v('Thor').out('parent').in('parent')</code> يُعيد الاستدعاءُ <code>v</code> كائنَ استعلام، ويضيف الاستدعاءُ <code>out</code> خطوةً جديدة ويُعيد كائن الاستعلام، ويفعل الاستدعاءُ <code>in</code> الشيء نفسه. وهذا ما يُمكّن واجهةَ تسلسلِ الدوال (method-chaining API) لدينا.</p>
<p>لاحظ أن إضافة نوع أنبوبٍ جديد بالاسم نفسه تستبدل الموجود، مما يسمح بتعديل أنواع الأنابيب القائمة وقت التشغيل. فما ثمن هذا القرار؟ وما البدائل؟</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">getPipetype</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) {
  <span class="hljs-keyword">var</span> pipetype = <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Pipetypes</span>[name]                 <span class="hljs-comment">// a pipetype is a function</span>

  <span class="hljs-keyword">if</span>(!pipetype)
    <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Unrecognized pipetype: &#x27;</span> + name)

  <span class="hljs-keyword">return</span> pipetype || <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">fauxPipetype</span>
}
</code></pre>
<p>إن لم نتمكن من إيجاد نوع أنبوب، فنولّد خطأً ونُعيد نوع الأنبوب الافتراضي، الذي يتصرّف كقناةٍ فارغة: فإن جاءت رسالةٌ من أحد الطرفين، تُمرَّر من الطرف الآخر.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">fauxPipetype</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">_, _, maybe_gremlin</span>) {   <span class="hljs-comment">// pass the result upstream</span>
  <span class="hljs-keyword">return</span> maybe_gremlin || <span class="hljs-string">&#x27;pull&#x27;</span>                        <span class="hljs-comment">// or send a pull downstream</span>
}
</code></pre>
<p>أترى تلك الشرطات السفلية؟ نستخدمها لتسمية الوسائط التي لن تُستخدم في دالتنا. وسأغلبُ أنواع الأنابيب الأخرى ستستخدم الوسائطَ الثلاثةَ كلها، وتحمل أسماءَ الوسائط الثلاثة كلها. وهذا يتيح لنا أن نميّز بنظرةٍ واحدة أيُّ الوسائط يعتمد عليها نوع أنابيبٍ بعينه.</p>
<p>تقنيةُ الشرطات السفلية هذه مهمّةٌ أيضًا لأنها تجعل التعليقاتَ تصطفّ جيّدًا. لا، أقصد جدّيًا. فإذا كانت البرامج <a href="https://mitpress.mit.edu/sicp/front/node3.html">&quot;يجب أن تُكتب ليقرأها الناس، ولا تُنظر إلى كتابتها بوصفها لتنفيذها الآلات إلا بالمصادفة&quot;</a>، فإنّه يتبيّن مباشرةً أن شاغلنا الأوّلي ينبغي أن يكون جعلَ الشيفرة جميلة.</p>
<h4>الرأس</h4>
<p>أغلبُ أنواع الأنابيب التي سنلتقي بها تأخذ شرشورًا وتنتج المزيدَ من الشراشير، لكن نوع الأنابيب هذا يولّد الشراشيرَ من مجرّد نصٍّ (string). فمعطى معرّف رأسٍ يُعيد شرشورًا جديدًا واحدًا. ومعطى استعلامٍ سيجد كلَّ الرؤوس المطابقة، ويطلق شرشورًا جديدًا واحدًا في كل مرة حتى يستنفدها.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;vertex&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!state.<span class="hljs-property">vertices</span>)
    state.<span class="hljs-property">vertices</span> = graph.<span class="hljs-title function_">findVertices</span>(args)       <span class="hljs-comment">// state initialization</span>

  <span class="hljs-keyword">if</span>(!state.<span class="hljs-property">vertices</span>.<span class="hljs-property">length</span>)                        <span class="hljs-comment">// all done</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;done&#x27;</span>

  <span class="hljs-keyword">var</span> vertex = state.<span class="hljs-property">vertices</span>.<span class="hljs-title function_">pop</span>()                 <span class="hljs-comment">// OPT: requires vertex cloning</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">makeGremlin</span>(vertex, gremlin.<span class="hljs-property">state</span>)  <span class="hljs-comment">// gremlins from as/back queries</span>
})
</code></pre>
<p>نتحقّق أولًا ممّا إذا كنا قد جمعنا الرؤوس المطابقة بالفعل، وإلّا حاولنا إيجاد بعضها. وإن وُجدت رؤوس، فسنُسقط واحدًا منها ونُعيد شرشورًا جديدًا يجلس على ذلك الرأس. ويمكن لكل شرشورٍ أن يحمل حالتهُ الخاصة به، كمذكّرةٍ يدوّن فيها أين كان وما الأشياءُ المثيرة التي رآها في رحلته عبر الرسم البياني. فإذا تلقّينا شرشورًا كإدخالٍ لهذه الخطوة، نسخنا ذاكرتَه للشرشور الخرج.</p>
<p>لاحظ أننا نطفرُ مباشرةً بوسيط الحالة هنا، ولا نُعيده. والبديلُ أن نُعيد كائنًا بدلًا من شرشور أو إشارة، ونُعيد الحالةَ تلكَ الطريقة. لكن ذلك يُعقّد قيمة إرجاعنا، وينتج بعضَ المهملات الإضافية[^garbage]. ولو سمحت JavaScript بقيم إرجاعٍ متعدّدةٍ لكان هذا الخيارُ أنيقًا.</p>
<p>[^garbage]: لكنّها مهملاتٌ قصيرةُ العمر جدًّا، وهي نوعيةُ المهملات الثانية الأفضل.</p>
<p>لكننا مع ذلك سنحتاج إلى إيجاد طريقةٍ للتعامل مع الطفرات، لأن موضع الاستدعاء يحتفظ بمرجعٍ إلى المتغيّر الأصلي. وماذا لو أمكننا تحديد ما إذا كان مرجعٌ بعينه «فريدًا»—أي أنّه المرجع الوحيد إلى ذلك الكائن؟</p>
<p>إن علمنا أنّ مرجعًا فريد، أمكننا الاستفادةُ من مزايا الثبات (immutability) مع تجنّب مخطّطات النسخ عند الكتابة (copy-on-write) المكلفة أو بنى البيانات الدائمة المعقّدة. ومع وجود مرجعٍ واحدٍ فقط لا يمكننا تمييز ما إذا كان الكائنُ قد طُفر به أم أُعيد كائنٌ جديدٌ يحمل التغييرات التي طلبناها: أي إنّ «الثبات المرصود» (observed immutability) محفوظ[^obsimmutability].</p>
<p>[^obsimmutability]: مرجعان إلى بنية البيانات القابلة للتغيير نفسها يتصرّفان كزوجٍ من أجهزة اللاسلكي، فيسمحان لكلٍّ من يحملهما بالتواصل مباشرةً. ويمكن تمريرُ أجهزة اللاسلكي هذه من دالةٍ إلى أخرى، واستنساخُها لإنشاء كمٍّ هائلٍ من أجهزة اللاسلكي. وهذا يقلب تمامًا قنوات التواصل الطبيعية التي تمتلكها شيفرتك بالفعل. وفي نظامٍ بلا تزامن قد تستطيع أحيانًا الإفلاتَ من ذلك، لكن أدخِل التزامنَ متعدّدَ الخيوط (multithreading) أو سلوكًا غير متزامن، فيمكن لصفير أجهزة اللاسلكي كلّه أن يصبح عبئًا حقيقيًّا.</p>
<p>وهناك طريقتان شائعتان لتحديد ذلك: في نظامٍ مُنمَّط الأنواع إحصائيًّا (statically typed) يمكننا الاستفادةُ من أنماط التفرّد (uniqueness types)[^uniquenesstypes] لضمان أن لكل كائنٍ مرجعًا واحدًا فقط وقت التصريف. ولو كان لدينا عدّادُ مراجع (reference counter)[^referencecounter]—ولو كان مجرّدًا عدّادًا لاصقًا رخيصًا من بتّين— لاستطعنا أن نعرف وقت التشغيل أنّ للكائن مرجعًا واحدًا فقط، ونستفيد من تلك المعرفة.</p>
<p>[^uniquenesstypes]: أُحييت أنماطُ التفرّد في لغة Clean، ولها علاقةٌ غير خطّية بأنماط الخطّية (linear types)، التي هي بدورها نوعٌ فرعيٌّ من الأنماط البنيوية الفرعية (substructural types).</p>
<p>[^referencecounter]: تعتمدُ معظمُ بيئات تشغيل JS الحديثة جامعاتِ مهملاتٍ أجيالية (generational garbage collectors)، ويُحرص مقصودًا على إبقاء اللغة بعيدةً عن إدارة ذاكرة المحرّك، من أجل الحدّ من مصدرٍ من مصادر عدم الحتمية البرمجية.</p>
<p>لا تمتلك JavaScript أيًّا من هاتين الأداتين، لكن يمكننا أن نحصل على الأثر نفسه تقريبًا إن كنّا منضبطين إلى حدٍّ كبير. وسنكون كذلك. الآن على الأقل.</p>
<h4>الدخول-والخروج</h4>
<p>المشيُ في الرسم البياني سهلٌ كطلب برغر. وهذان السطران يُعِدّان لنا نوعَي الأنابيب <code>in</code> و<code>out</code>.</p>
<p>\\newpage</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;out&#x27;</span>, <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">simpleTraversal</span>(<span class="hljs-string">&#x27;out&#x27;</span>))
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;in&#x27;</span>,  <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">simpleTraversal</span>(<span class="hljs-string">&#x27;in&#x27;</span>))
</code></pre>
<p>تُعيد دالةُ <code>simpleTraversal</code> معالِجَ نوع أنبوبٍ يقبل شرشورًا كإدخالٍ له، ويولّد شرشورًا جديدًا كلما سُئِل. وبعد نفاد تلك الشراشير، يُعيد طلبَ 'pull' للحصول على شرشورٍ جديد من سابقه.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">simpleTraversal</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>) {
  <span class="hljs-keyword">var</span> find_method = dir == <span class="hljs-string">&#x27;out&#x27;</span> ? <span class="hljs-string">&#x27;findOutEdges&#x27;</span> : <span class="hljs-string">&#x27;findInEdges&#x27;</span>
  <span class="hljs-keyword">var</span> edge_list   = dir == <span class="hljs-string">&#x27;out&#x27;</span> ? <span class="hljs-string">&#x27;_in&#x27;</span> : <span class="hljs-string">&#x27;_out&#x27;</span>

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
    <span class="hljs-keyword">if</span>(!gremlin &amp;&amp; (!state.<span class="hljs-property">edges</span> || !state.<span class="hljs-property">edges</span>.<span class="hljs-property">length</span>))     <span class="hljs-comment">// query initialization</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>

    <span class="hljs-keyword">if</span>(!state.<span class="hljs-property">edges</span> || !state.<span class="hljs-property">edges</span>.<span class="hljs-property">length</span>) {                 <span class="hljs-comment">// state initialization</span>
      state.<span class="hljs-property">gremlin</span> = gremlin
      state.<span class="hljs-property">edges</span> = graph[find_method](<span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/aosabook/500lines/blob/master/gremlin.vertex)        // get matching edges</span>
                         .<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">filterEdges</span>(args[<span class="hljs-number">0</span>]))
    }

    <span class="hljs-keyword">if</span>(!state.<span class="hljs-property">edges</span>.<span class="hljs-property">length</span>)                                   <span class="hljs-comment">// nothing more to do</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>

    <span class="hljs-keyword">var</span> vertex = state.<span class="hljs-property">edges</span>.<span class="hljs-title function_">pop</span>()[edge_list]                 <span class="hljs-comment">// use up an edge</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">gotoVertex</span>(state.<span class="hljs-property">gremlin</span>, vertex)
  }
}
</code></pre>
<p>يتولّى السطران الأولان الفروقَ بين نسخة الدخول ونسخة الخروج. ثم نكون مستعدين لإعادة دالة نوع الأنبوب، التي تبدو إلى حدٍّ ما أشبهَ بكثير بنوع أنبوب الرأس الذي رأيناه للتوّ. وهذا مثيرٌ بعض الشيء، لأن هذه تأخذ شرشورًا كإدخال، في حين يُنشئ نوعُ أنبوب الرأس شراشيرَ <em>من العدم</em> (<em>ex nihilo</em>).</p>
<p>ومع ذلك نرى النغماتَ ذاتها تتكرّر هنا، مع إضافة خطوةٍ لتهيئة الاستعلام. فإذا لم يكن هناك شرشورٌ ونفدت الحوافّ المتاحة، فإننا نسحب (pull). وإن كان لدينا شرشورٌ لكننا لم نضبط الحالةَ بعد، فإننا نجد أيَّ حوافّ تسير في الاتجاه المناسب ونضيفها إلى حالتنا. وإن كان هناك شرشورٌ لكن رأسه الحالي لا يملك حوافَّ مناسبة، فإننا نسحب. وأخيرًا نُسقط حافةً ونُعيد شرشورًا مستنسخًا للتوّ على الرأس الذي تشير إليه.</p>
<p>بإلقاءٍ سريعٍ على هذه الشيفرة نرى <code>!state.edges.length</code> مكرَّرًا في كل بندٍ من البنود الثلاثة. ومن المغري إعادةُ هيكلة (refactor) هذا لتقليل تعقيد تلك الجمل الشرطية. لكن مشكلتينِ تمنعاننا من ذلك.</p>
<p>إحداهما ثانويّةٌ إلى حدٍّ ما: فالعبارةُ الثالثة <code>!state.edges.length</code> تعني شيئًا مختلفًا عن الأولى والثانية، لأن <code>state.edges</code> قد تغيّر بين الشرط الثاني والثالث. وهذا في الواقع يدفعنا إلى إعادة الهيكلة، لأن جعلَ التسمية نفسها تعني شيئين مختلفين داخل دالةٍ واحدة ليس مثاليًّا عادةً.</p>
<p>والثانية أكثر خطورة. فهذه ليست دالةَ نوع الأنبوب الوحيدة التي نكتبها، وسنرى أفكارَ تهيئة الاستعلام و/أو تهيئة الحالة هذه تتكرّر مرارًا وتكرارًا. وعند كتابة الشيفرة، هناك دائمًا موازنةٌ بين الصفات المنظَّمة والصفات غير المنظَّمة. والإفراطُ في التنظيم يعني ثمنًا باهظًا في الشيفرة التكرارية (boilerplate) وتعقيد التجريد. والإفراطُ في غياب التنظيم يعني أنك ستضطر إلى أن تحتفظ في ذهنك بكل تفاصيل التوصيلات (plumbing).</p>
<p>في هذه الحالة، ومع وجود نحو اثنتي عشرة من أنواع الأنابيب، يبدو الخيارُ الصحيح هو صياغةُ كل دوال أنواع الأنابيب بأكبر قدرٍ ممكنٍ من التشابه، وتسميةُ الأجزاء المكوّنة لها بتعليقات. فنقاوم دافعَنا لإعادة هيكلة نوع الأنابيب هذا بعينه، لأن ذلك سيقلّل من التجانس، لكننا نقاوم أيضًا الرغبةَ في هندسة تجريدٍ بنيويٍّ رسميٍّ لتهيئة الاستعلام وتهيئة الحالة وما شابه. ولو كانت هناك مئاتُ أنواع الأنابيب، فذلك الخيار الأخير سيكون على الأرجح الخيارَ الصحيح: فثمنُ تعقيد التجريد ثابت، بينما تنمو الفائدةُ خطيًّا مع عدد الوحدات. وحين نتعامل مع هذا العدد الكبير من القطع المتحرّكة، فإن أيَّ شيء تستطيع فعله لفرض الانتظام بينها يكون مفيدًا.</p>
<h4>الخاصية</h4>
<p>لنتوقّف لحظةً لنتأمّل استعلامًا نموذجيًّا مبنيًّا على أنواع الأنابيب الثلاثة التي رأيناها. يمكننا أن نطلب أجدادَ ثور هكذا[^runnote]:</p>
<p>[^runnote]: الاستدعاءُ <code>run()</code> في نهاية الاستعلام يستدعي المفسِّر ويُعيد النتائج.</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">out</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">run</span>()
</code></pre>
<p>لكن ماذا لو أردنا أسماءَهم؟ يمكننا أن نضيف <code>map</code> إلى ذيل ذلك:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">out</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">run</span>()
 .<span class="hljs-title function_">map</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) {<span class="hljs-keyword">return</span> vertex.<span class="hljs-property">name</span>})
</code></pre>
<p>لكن هذه عمليةٌ شائعةٌ إلى حدٍّ كافٍ، لذا نفضّل كتابةَ شيءٍ أقرب إلى:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">out</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">property</span>(<span class="hljs-string">&#x27;name&#x27;</span>).<span class="hljs-title function_">run</span>()
</code></pre>
<p>زد على ذلك أن أنبوب الخاصية يصير جزءًا أصيلًا من الاستعلام، بدلًا من شيءٍ يُلحَق به في ما بعد. ولهذا بعضُ المزايا المثيرة، كما سنرى قريبًا.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;property&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                                  <span class="hljs-comment">// query initialization</span>
  gremlin.<span class="hljs-property">result</span> = gremlin.<span class="hljs-property">vertex</span>[args[<span class="hljs-number">0</span>]]
  <span class="hljs-keyword">return</span> gremlin.<span class="hljs-property">result</span> == <span class="hljs-literal">null</span> ? <span class="hljs-literal">false</span> : gremlin             <span class="hljs-comment">// false for bad props</span>
})
</code></pre>
<p>هيئةُ الاستعلام هنا تافهة: إن لم يكن هناك شرشورٌ فإننا نسحب. وإن كان هناك شرشور، فنضبطُ نتيجتَه لتكون قيمةَ الخاصية. ثم يستطيع الشرشور أن يمضي قادمًا. وإن اجتاز الأنبوب الأخير فإن نتيجتَه ستُجمع وتُعيد من الاستعلام. وليس كلُّ الشراشير تملك الخاصية <code>result</code>؛ فمن لا يملكها يُعيد آخرَ رأسٍ زارَه.</p>
<p>لاحظ أن إن لم تكن الخاصيةُ موجودة، فإننا نُعيد <code>false</code> بدلًا من الشرشور، لذا تعمل أنابيبُ الخاصية أيضًا كنوعٍ من المُرشِّحات (filter). هل يمكنك أن تتخيّل استخدامًا لذلك؟ وما المقايضاتُ في قرار التصميم هذا؟</p>
<h4>التفرّد</h4>
<p>إن أردنا جمعَ كل أحفاد أجداد ثور—أي أبناء عمومته وأشقّائه وهو نفسه—فيمكننا إجراءُ استعلامٍ كهذا: <code>g.v('Thor').in().in().out().out().run()</code>. لكن ذلك سيعطينا كثيرًا من التكرارات. بل سيكون هناك على الأقل أربعُ نسخٍ من ثور نفسه. (هل يمكنك أن تتخيّر حالةً قد يكون فيها ذلك أكثر؟)</p>
<p>ولحلّ ذلك نقدّم نوعَ أنبوبٍ جديد اسمه 'unique'. وينتج استعلامنا الجديد
مُخرَجًا يطابق الأحفادَ واحدًا واحدًا:</p>
<pre><code class="language-javascript">    g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">unique</span>().<span class="hljs-title function_">run</span>()
</code></pre>
<p>وتنفيذُ نوع الأنبوب:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;unique&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                                  <span class="hljs-comment">// query initialization</span>
  <span class="hljs-keyword">if</span>(state[gremlin.<span class="hljs-property">vertex</span>.<span class="hljs-property">_id</span>]) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                 <span class="hljs-comment">// reject repeats</span>
  state[gremlin.<span class="hljs-property">vertex</span>.<span class="hljs-property">_id</span>] = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">return</span> gremlin
})
</code></pre>
<p>أنبوبُ التفرّد مُرشِّحٌ خالص: فهو إمّا يمرّر الشرشورَ دون تغيير، أو يحاول سحبَ شرشورٍ جديد من الأنبوب السابق.</p>
<p>نُهيّئ بأن نحاول جمعَ شرشور. فإن كان رأسُ الشرشور الحالي في ذاكرتنا المؤقتة (cache)، فقد رأيناه من قبل، فنحاول جمعَ واحدٍ جديد. وإلّا نضيف رأسَ الشرشور الحالي إلى ذاكرتنا المؤقتة ونمرّره. أيّها سهلٌ جدًّا.</p>
<h4>الترشيح</h4>
<p>رأينا طريقتين مبسّطتين للترشيح، لكننا نحتاج أحيانًا إلى قيودٍ أعقد. فماذا لو أردنا إيجادَ كل أشقاء ثور الذين وزنُهم أكبر من طولهم[^weight]؟ سيعطينا هذا الاستعلامُ إجابتَنا:</p>
<p>[^weight]: والوزنُ بوحدات skippund والطولُ بوحدات fathom، بالطبع. وبحسب كثافة لحم الآسغارد، قد يُعيد هذا الاستعلامُ نتائجَ كثيرةً أو لا شيءً البتّة. (أو فولستاغ وحده، إن كنا نسمح لشكسبير بأن يكون جزءًا من إلهنتنا عن طريق جاك كيربي.)</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">unique</span>()
 .<span class="hljs-title function_">filter</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">asgardian</span>) { <span class="hljs-keyword">return</span> asgardian.<span class="hljs-property">weight</span> &gt; asgardian.<span class="hljs-property">height</span> })
 .<span class="hljs-title function_">run</span>()
</code></pre>
<p>إن أردنا معرفة أيّ أشقاء ثور ينجون من راغناروك، يمكننا أن نمرّر إلى <code>filter</code> كائنًا:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">unique</span>().<span class="hljs-title function_">filter</span>({<span class="hljs-attr">survives</span>: <span class="hljs-literal">true</span>}).<span class="hljs-title function_">run</span>()
</code></pre>
<p>وهكذا يعمل:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;filter&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                                  <span class="hljs-comment">// query initialization</span>

  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> args[<span class="hljs-number">0</span>] == <span class="hljs-string">&#x27;object&#x27;</span>)                              <span class="hljs-comment">// filter by object</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">objectFilter</span>(gremlin.<span class="hljs-property">vertex</span>, args[<span class="hljs-number">0</span>])
         ? gremlin : <span class="hljs-string">&#x27;pull&#x27;</span>

  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> args[<span class="hljs-number">0</span>] != <span class="hljs-string">&#x27;function&#x27;</span>) {
    <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Filter is not a function: &#x27;</span> + args[<span class="hljs-number">0</span>])
    <span class="hljs-keyword">return</span> gremlin                                            <span class="hljs-comment">// keep things moving</span>
  }

  <span class="hljs-keyword">if</span>(!args[<span class="hljs-number">0</span>](<span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/aosabook/500lines/blob/master/gremlin.vertex, gremlin)) return &#x27;pull&#x27;         // gremlin fails filter</span>
  <span class="hljs-keyword">return</span> gremlin
})
</code></pre>
<p>إن لم يكن الوسيطُ الأول لـ<code>filter</code> كائنًا أو دالة، فإننا نُطلق خطأً ونمرّر الشرشور قادمًا. توقّف لحظةً، وتأمّل البدائل. لماذا نقرّر متابعةَ الاستعلام عند وقوع خطأ؟</p>
<p>وهناك سببان قد يؤديان إلى ظهور هذا الخطأ. والأولُ يتعلّق بمبرمجٍ يكتب استعلامًا، إمّا في REPL أو مباشرةً في الشيفرة. وحين يُنفَّذ ذلك الاستعلام سينتج نتائج، وسيولّد أيضًا خطأً يلاحظه المبرمج. ثم يصحّح المبرمج الخطأ ليُرشّح مجموعة النتائج أكثر. أو بدلًا من ذلك يمكن للنظام أن يعرض الخطأ وحده ولا ينتج أي نتائج، فيصبح إصلاحُ كل الأخطاء شرطًا لعرض النتائج.</p>
<p>والاحتمالُ الثاني هو أن يُطبَّق المُرشِّح ديناميكيًّا وقت التشغيل. وهذه حالةٌ أهمّ بكثير، لأن من يستدعي الاستعلام ليس مؤلّفَ شيفرة الاستعلام بالضرورة. وبما أننا على الويب، فإن قاعدتنا الافتراضية هي أن نعرض النتائج دائمًا، وألّا نُفسد الأمور. وعادةً يكون المواصلةُ في وجه المتاعب أفضلَ من أن نستسلم لجروحنا ونعرض على المستخدم رسالة خطأٍ مُدَمِّرة.</p>
<p>وفي تلك المناسبات التي يكون فيها عرضُ نتائجَ أقلّ أفضلَ من عرض نتائجَ أكثر، يمكن تجاوزُ دالة <code>Dagoba.error</code> لتُلقي خطأً، وبذلك نتفادى تدفّق التحكّم الطبيعي.</p>
<h4>الأخذ</h4>
<p>لا نريد أحيانًا كلَّ النتائج دفعةً واحدة. فأحيانًا لا نحتاج إلّا إلى حفنةٍ من النتائج؛ فلنفترض أننا نريد اثنتي عشرة من معاصري ثور، فنمشي كلَّ الطريق عائدين إلى البقرة البدائية أوذومبلا:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">unique</span>().<span class="hljs-title function_">take</span>(<span class="hljs-number">12</span>).<span class="hljs-title function_">run</span>()
</code></pre>
<p>من دون أنبوب <code>take</code> قد يستغرق ذلك الاستعلام وقتًا طويلًا لينفَّذ، لكن بفضل استراتيجية التقييم الكسول لدينا، فإن الاستعلامَ الذي فيه أنبوب <code>take</code> فعّالٌ جدًّا.</p>
<p>وأحيانًا نريد واحدًا في كل مرة فقط: سنعالِج النتيجة، ونعمل معها، ثم نعود لأخذ غيرها. وهذا النوعُ من الأنابيب يتيح لنا ذلك أيضًا.</p>
<pre><code class="language-javascript">q = g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Auðumbla&#x27;</span>).<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">property</span>(<span class="hljs-string">&#x27;name&#x27;</span>).<span class="hljs-title function_">take</span>(<span class="hljs-number">1</span>)

q.<span class="hljs-title function_">run</span>() <span class="hljs-comment">// [&#x27;Odin&#x27;]</span>
q.<span class="hljs-title function_">run</span>() <span class="hljs-comment">// [&#x27;Vili&#x27;]</span>
q.<span class="hljs-title function_">run</span>() <span class="hljs-comment">// [&#x27;Vé&#x27;]</span>
q.<span class="hljs-title function_">run</span>() <span class="hljs-comment">// []</span>
</code></pre>
<p>يمكن أن يعمل استعلامُنا في بيئةٍ غير متزامنة (asynchronous)، مما يتيح لنا جمعَ نتائجَ أكثر عند الحاجة. وحين ننفد منها، تُعاد مصفوفةٌ فارغة.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;take&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  state.<span class="hljs-property">taken</span> = state.<span class="hljs-property">taken</span> || <span class="hljs-number">0</span>                              <span class="hljs-comment">// state initialization</span>

  <span class="hljs-keyword">if</span>(state.<span class="hljs-property">taken</span> == args[<span class="hljs-number">0</span>]) {
    state.<span class="hljs-property">taken</span> = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;done&#x27;</span>                                             <span class="hljs-comment">// all done</span>
  }

  <span class="hljs-keyword">if</span>(!gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                                  <span class="hljs-comment">// query initialization</span>
  state.<span class="hljs-property">taken</span>++
  <span class="hljs-keyword">return</span> gremlin
})
</code></pre>
<p>نُهيّئ <code>state.taken</code> إلى الصفر إن لم تكن موجودةً أصلًا. وJavaScript فيها الإكراهُ الضمني (implicit coercion)، لكنه يحوّل <code>undefined</code> إلى <code>NaN</code>، لذا علينا أن نكون صريحين هنا[^explicit].</p>
<p>[^explicit]: يقول بعضُهم إن الأفضل أن تكون صريحين في كل وقت. ويقول آخرون إن نظامًا جيّدًا للاستدلال الضمني (implicits) ينتج شيفرةً أكثر إيجازًا ووضوحًا، مع شيفرةٍ تكرارية (boilerplate) أقلّ ومساحة أصغر للأخطاء. أمّا الشيءُ الوحيد الذي يمكننا جميعًا الاتفاقُ عليه هو أن الاستعمالَ الفعّال للإكراه الضمني في JavaScript يتطلّب حفظَ حالاتٍ خاصةٍ كثيرةٍ غير بديهية، ممّا يجعله حقل ألغام لمن لم يبدأ.</p>
<p>وحين يصل <code>state.taken</code> إلى <code>args[0]</code> نُعيد 'done'، فنُغلق الأنابيبَ أمامنا. كما نعيد ضبط عدّاد <code>state.taken</code>، مما يتيح لنا تكرارَ الاستعلام لاحقًا.</p>
<p>ونقوم بهاتين الخطوتين قبل تهيئة الاستعلام للتعامل مع حالتَي <code>take(0)</code> و<code>take()</code>[^takereturn]. ثم نزيد عدّادَنا ونُعيد الشرشور.</p>
<p>[^takereturn]: ما الذي تتوقّع أن يُعيده كلٌّ منهما؟ وما الذي يُعيدانه فعلًا؟</p>
<h4>التسمية</h4>
<p>تعمل أنواعُ الأنابيب الأربعة التالية معًا كمجموعةٍ لتتيح استعلاماتٍ أكثر تقدّمًا. وهذا النوع يتيح لك فقط وسمَ الرأس الحالي. وسنستخدم ذلك الوسم مع نوعَي الأنابيب التاليين.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;as&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                                  <span class="hljs-comment">// query initialization</span>
  gremlin.<span class="hljs-property">state</span>.<span class="hljs-property">as</span> = gremlin.<span class="hljs-property">state</span>.<span class="hljs-property">as</span> || {}                   <span class="hljs-comment">// init the &#x27;as&#x27; state</span>
  gremlin.<span class="hljs-property">state</span>.<span class="hljs-property">as</span>[args[<span class="hljs-number">0</span>]] = gremlin.<span class="hljs-property">vertex</span>                  <span class="hljs-comment">// set label to vertex</span>
  <span class="hljs-keyword">return</span> gremlin
})
</code></pre>
<p>بعد تهيئة الاستعلام، نتأكّد من أن للحالة المحلية للشرشور الوسيطَ <code>as</code>. ثم نضبط خاصيةً من ذلك الوسيط لتكون الرأسَ الحالي للشرشور.</p>
<h4>الدمج</h4>
<p>بعد أن نُسمّي الرؤوس، يمكننا استخراجُها بالدمج. فإذا أردنا آباءَ ثور وأجدادَه وأجدادَ أجداده، يمكننا أن نفعل شيئًا كهذا:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;grandparent&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;great-grandparent&#x27;</span>)
           .<span class="hljs-title function_">merge</span>(<span class="hljs-string">&#x27;parent&#x27;</span>, <span class="hljs-string">&#x27;grandparent&#x27;</span>, <span class="hljs-string">&#x27;great-grandparent&#x27;</span>).<span class="hljs-title function_">run</span>()
</code></pre>
<p>وهذا هو نوع أنبوب الدمج:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;merge&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!state.<span class="hljs-property">vertices</span> &amp;&amp; !gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>               <span class="hljs-comment">// query initialization</span>

  <span class="hljs-keyword">if</span>(!state.<span class="hljs-property">vertices</span> || !state.<span class="hljs-property">vertices</span>.<span class="hljs-property">length</span>) {             <span class="hljs-comment">// state initialization</span>
    <span class="hljs-keyword">var</span> obj = (gremlin.<span class="hljs-property">state</span>||{}).<span class="hljs-property">as</span> || {}
    state.<span class="hljs-property">vertices</span> = args.<span class="hljs-title function_">map</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>) {<span class="hljs-keyword">return</span> obj[id]}).<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>)
  }

  <span class="hljs-keyword">if</span>(!state.<span class="hljs-property">vertices</span>.<span class="hljs-property">length</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                    <span class="hljs-comment">// done with this batch</span>

  <span class="hljs-keyword">var</span> vertex = state.<span class="hljs-property">vertices</span>.<span class="hljs-title function_">pop</span>()
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">makeGremlin</span>(vertex, gremlin.<span class="hljs-property">state</span>)
})
</code></pre>
<p>نمرّ على كلِّ وسيط، نبحث عنه في قائمة الرؤوس الموسومة عند الشرشور. فإذا وجدناه، استنسخنا الشرشورَ إلى ذلك الرأس. ولاحظ أنّ الشراشيرَ التي تصل إلى هذا الأنبوب وحدها هي المُدرجة في الدمج—فإذا لم يكن والدا ثور في الرسم البياني، فلن تكون هي في مجموعة النتائج.</p>
<h4>الاستثناء</h4>
<p>سبق أن رأينا حالاتٍ نودّ فيها أن نقول «أعطني كل أشقاء ثور ما عدا ثور». ويمكننا فعلُ ذلك بمُرشِّح:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">unique</span>()
           .<span class="hljs-title function_">filter</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">asgardian</span>) {<span class="hljs-keyword">return</span> asgardian.<span class="hljs-property">_id</span> != <span class="hljs-string">&#x27;Thor&#x27;</span>}).<span class="hljs-title function_">run</span>()
</code></pre>
<p>أمّا مع <code>as</code> و<code>except</code> فالأمرُ أكثر وضوحًا:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;me&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">except</span>(<span class="hljs-string">&#x27;me&#x27;</span>).<span class="hljs-title function_">unique</span>().<span class="hljs-title function_">run</span>()
</code></pre>
<p>لكن هناك أيضًا استعلاماتٌ يكون ترشيحُها عسيرًا. فماذا لو أردنا أعمامَ ثور وعمّاته؟ وكيف نُرشّح والديه؟ الأمرُ سهلٌ مع <code>as</code> و<code>except</code>[^unexpectedresults]:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">in</span>().<span class="hljs-title function_">except</span>(<span class="hljs-string">&#x27;parent&#x27;</span>).<span class="hljs-title function_">unique</span>().<span class="hljs-title function_">run</span>()
</code></pre>
<p>[^unexpectedresults]: هناك ظروفٌ معيّنة قد يُعطي هذا الاستعلامُ بعينه نتائجَ غير متوقّعة. هل يمكنك أن تتخيّر أيًّا منها؟ وكيف يمكنك تعديلَه للتعامل مع تلك الحالات؟</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;except&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                                  <span class="hljs-comment">// query initialization</span>
  <span class="hljs-keyword">if</span>(gremlin.<span class="hljs-property">vertex</span> == gremlin.<span class="hljs-property">state</span>.<span class="hljs-property">as</span>[args[<span class="hljs-number">0</span>]]) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>
  <span class="hljs-keyword">return</span> gremlin
})
</code></pre>
<p>هنا نتحقّق ممّا إذا كان الرأسُ الحالي مساويًا للرأس الذي خزّناه سابقًا. فإن كان كذلك، نتخطّاه.</p>
<h4>الرجوع</h4>
<p>بعضُ الأسئلة التي قد نطرحها تتطلّب مواصلةَ التعمّق في الرسم البياني، لتعود لاحقًا إلى نقطة انطلاقك إذا كان الجوابُ بنعم. فلنفترض أننا أردنا معرفة أيّ بنات فيورغين أنجبن مع أحد أبناء بستلا؟</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Fjörgynn&#x27;</span>).<span class="hljs-title function_">in</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;me&#x27;</span>)       <span class="hljs-comment">// first gremlin&#x27;s state.as is Frigg</span>
 .<span class="hljs-title function_">in</span>()                              <span class="hljs-comment">// first gremlin&#x27;s vertex is now Baldr</span>
 .<span class="hljs-title function_">out</span>().<span class="hljs-title function_">out</span>()                       <span class="hljs-comment">// clone that gremlin for each grandparent</span>
 .<span class="hljs-title function_">filter</span>({<span class="hljs-attr">_id</span>: <span class="hljs-string">&#x27;Bestla&#x27;</span>})           <span class="hljs-comment">// keep only the gremlin on grandparent Bestla</span>
 .<span class="hljs-title function_">back</span>(<span class="hljs-string">&#x27;me&#x27;</span>).<span class="hljs-title function_">unique</span>().<span class="hljs-title function_">run</span>()         <span class="hljs-comment">// jump gremlin&#x27;s vertex back to Frigg and exit</span>
</code></pre>
<p>وهذا تعريف <code>back</code>:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(<span class="hljs-string">&#x27;back&#x27;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, args, gremlin, state</span>) {
  <span class="hljs-keyword">if</span>(!gremlin) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;pull&#x27;</span>                                  <span class="hljs-comment">// query initialization</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">gotoVertex</span>(gremlin, gremlin.<span class="hljs-property">state</span>.<span class="hljs-property">as</span>[args[<span class="hljs-number">0</span>]])
})
</code></pre>
<p>نستخدم الدالةَ المساعدة <code>Dagoba.gotoVertex</code> للقيام بالعمل الفعلي كلِّه هنا. فلننظر إليها هي ودوالًا مساعدةً أخرى الآن.</p>
<h2 id="الدوال-المساعدة">الدوال المساعدة</h2>
<p>تعتمد أنواعُ الأنابيب أعلاه على بضع دوالَ مساعدةٍ لأداء عملها. فلنُلقِ نظرةً سريعةً عليها قبل أن نغوص في المفسِّر.</p>
<h4>الشراشير</h4>
<p>الشراشيرُ مخلوقاتٌ بسيطة: لديها رأسٌ حالي، وحالةٌ محلية. فلكي نصنع واحدًا جديدًا نحتاج فقط إلى صنع كائنٍ يحوي هذين الأمرين.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">makeGremlin</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex, state</span>) {
  <span class="hljs-keyword">return</span> {<span class="hljs-attr">vertex</span>: vertex, <span class="hljs-attr">state</span>: state || {} }
}
</code></pre>
<p>أيُّ كائنٍ يملك خاصيةَ رأس وخاصيةَ حالة هو شرشورٌ بحسب هذا التعريف، لذا يمكننا ببساطةٍ أن ندمج الباني داخل الشيفرة، لكن تغليفَه في دالةٍ يتيح لنا إضافة خصائصَ جديدة إلى كل الشراشير في موضعٍ واحد.</p>
<p>ويمكننا أيضًا أن نأخذ شرشورًا موجودًا ونرسله إلى رأسٍ جديد، كما رأينا في نوع أنبوب <code>back</code> ودالة <code>simpleTraversal</code>.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">gotoVertex</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">gremlin, vertex</span>) {               <span class="hljs-comment">// clone the gremlin</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">makeGremlin</span>(vertex, gremlin.<span class="hljs-property">state</span>)
}
</code></pre>
<p>لاحظ أن هذه الدالة تُعيد في الواقع شرشورًا جديدًا تمامًا: استنساخًا للقديم أُرسل إلى الوجهة التي نريدها. وهذا يعني أن شرشورًا يمكن أن يجلس على رأسٍ بينما تُرسَل نسخُه إلى رؤوسَ أخرى كثيرةٍ لاستكشافها. وهذا هو بالضبط ما يحدث في <code>simpleTraversal</code>.</p>
<p>وكمثالٍ على تحسيناتٍ ممكنة، يمكننا أن نضيف بعض الحالة لمتابعة كل رأسٍ يزوره الشرشور، ونضيف أنواعَ أنابيب جديدة تستفيد من تلك المسارات.</p>
<h4>الإيجاد</h4>
<p>يستخدم نوعُ الأنبوب <code>vertex</code> دالةَ <code>findVertices</code> لجمع مجموعةٍ من الرؤوس الأوّلية التي نبدأ منها استعلامَنا.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findVertices</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">args</span>) {                      <span class="hljs-comment">// vertex finder helper</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> args[<span class="hljs-number">0</span>] == <span class="hljs-string">&#x27;object&#x27;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">searchVertices</span>(args[<span class="hljs-number">0</span>])
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(args.<span class="hljs-property">length</span> == <span class="hljs-number">0</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">vertices</span>.<span class="hljs-title function_">slice</span>()                              <span class="hljs-comment">// OPT: slice is costly</span>
  <span class="hljs-keyword">else</span>
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findVerticesByIds</span>(args)
}
</code></pre>
<p>تتلقّى هذه الدالة وسائطَها بوصفها قائمةً. فإن كان الأولُ منها كائنًا، فإنها تسلّمه إلى <code>searchVertices</code>، فتتيح استعلاماتٍ مثل:</p>
<pre><code class="language-javascript">  g.<span class="hljs-title function_">v</span>({<span class="hljs-attr">_id</span>:<span class="hljs-string">&#x27;Thor&#x27;</span>}).<span class="hljs-title function_">run</span>()
  g.<span class="hljs-title function_">v</span>({<span class="hljs-attr">species</span>: <span class="hljs-string">&#x27;Aesir&#x27;</span>}).<span class="hljs-title function_">run</span>()
</code></pre>
<p>وإلّا، إن كانت هناك وسائط، فإنها تُسلَّم إلى <code>findVerticesByIds</code>، التي تتعامل مع استعلاماتٍ مثل <code>g.v('Thor', 'Odin').run()</code>.</p>
<p>وإن لم تكن هناك وسائط البتّة، فإن استعلامَنا يبدو هكذا: <code>g.v().run()</code>. وهذا ليس شيئًا ستحبّ فعلَه كثيرًا مع رسومٍ بيانية كبيرة، وبخاصة لأننا ننسخ قائمةَ الرؤوس قبل إعادتها. وننسخها لأن بعض مواضع الاستدعاء تعدّل القائمةَ المُعادة مباشرةً بأن تُسقط عناصرَ منها أثناء العمل عليها. ويمكننا تحسين هذا الاستخدام بالاستنساخ في موضع الاستدعاء، أو بتجنّب تلك التعديلات. (يمكننا الاحتفاظ بعدّادٍ في الحالة بدلًا من الإسقاط.)</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findVerticesByIds</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">ids</span>) {
  <span class="hljs-keyword">if</span>(ids.<span class="hljs-property">length</span> == <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">var</span> maybe_vertex = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findVertexById</span>(ids[<span class="hljs-number">0</span>])            <span class="hljs-comment">// maybe it&#x27;s a vertex</span>
    <span class="hljs-keyword">return</span> maybe_vertex ? [maybe_vertex] : []                 <span class="hljs-comment">// or maybe it isn&#x27;t</span>
  }

  <span class="hljs-keyword">return</span> ids.<span class="hljs-title function_">map</span>( <span class="hljs-variable language_">this</span>.<span class="hljs-property">findVertexById</span>.<span class="hljs-title function_">bind</span>(<span class="hljs-variable language_">this</span>) ).<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>)
}

<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findVertexById</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex_id</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">vertexIndex</span>[vertex_id]
}
</code></pre>
<p>لاحظ استعمالَ <code>vertexIndex</code> هنا. فبدون ذلك الفهرس لانظرنا إلى كل رأسٍ في قائمتنا واحدًا تلو الآخر لنحكم بمطابقته للمعرّف—فنحوّل عمليةً ذات زمن ثابت (constant time) إلى عمليةٍ ذات زمن خطّي (linear time)، وأيَّ عمليات $O(n)$ تعتمد عليها مباشرةً إلى عمليات $O(n^2)$.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">searchVertices</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">filter</span>) {        <span class="hljs-comment">// match on filter&#x27;s properties</span>
  <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">vertices</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">objectFilter</span>(vertex, filter)
  })
}
</code></pre>
<p>تستخدم دالةُ <code>searchVertices</code> الدالةَ المساعدة <code>objectFilter</code> على كل رأسٍ في الرسم البياني. وسننظر إلى <code>objectFilter</code> في القسم التالي، لكن في هذه الأثناء، هل يمكنك أن تتخيّر طريقةً للبحث في الرؤوس بحثًا كسولًا (lazy)؟</p>
<h4>المُرشِّحات</h4>
<p>رأينا أن <code>simpleTraversal</code> تستخدم دالةَ ترشيحٍ على الحوافّ التي تصادفها. إنها دالةٌ بسيطة، لكن قويةٌ بما يكفي لأغراضنا.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">filterEdges</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">filter</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span>(<span class="hljs-params">edge</span>) {
    <span class="hljs-keyword">if</span>(!filter)                                 <span class="hljs-comment">// no filter: everything is valid</span>
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>

    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> filter == <span class="hljs-string">&#x27;string&#x27;</span>)               <span class="hljs-comment">// string filter: label must match</span>
      <span class="hljs-keyword">return</span> edge.<span class="hljs-property">_label</span> == filter

    <span class="hljs-keyword">if</span>(<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">isArray</span>(filter))                   <span class="hljs-comment">// array filter: must contain label</span>
      <span class="hljs-keyword">return</span> !!~filter.<span class="hljs-title function_">indexOf</span>(edge.<span class="hljs-property">_label</span>)

    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">objectFilter</span>(edge, filter)    <span class="hljs-comment">// object filter: check edge keys</span>
  }
}
</code></pre>
<p>الحالةُ الأولى هي انعدام المُرشِّح أصلًا: <code>g.v('Odin').in().run()</code> تعبر كل الحوافّ المؤدّية إلى Odin.</p>
<p>والحالةُ الثانية ترشِّح بحسب وسم الحافة: <code>g.v('Odin').in('parent').run()</code> تعبر الحوافّ ذات الوسم 'parent'.</p>
<p>والحالةُ الثالثة تقبل مصفوفةً من الوسوم: <code>g.v('Odin').in(['parent', 'spouse']).run()</code> تعبر حوافَّ الوالدين والزوج.</p>
<p>والحالةُ الرابعة تستخدم دالةَ <code>objectFilter</code> التي رأيناها من قبل:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">objectFilter</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">thing, filter</span>) {
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> filter)
    <span class="hljs-keyword">if</span>(thing[key] !== filter[key])
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>

  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
}
</code></pre>
<p>يتيح لنا هذا الاستعلامَ عن الحافة باستخدام كائن ترشيح:</p>
<pre><code class="language-javascript"><span class="hljs-string">\`g.v(&#x27;Odin&#x27;).in({_label: &#x27;spouse&#x27;, order: 2}).run()\`</span>    <span class="hljs-comment">// finds Odin&#x27;s second wife</span>
</code></pre>
<h2 id="طبيعة-المفسر">طبيعة المفسِّر</h2>
<p>لقد بلغنا قمةَ جبل السرد، مستعدّين لاستلام جائزتنا: المفسِّر. والشيفرةُ في الواقع مضغوطةٌ نسبيًّا، لكن في النموذج شيءٌ من الدقّة.</p>
<p>قارنّا البرامجَ بخطوط الأنابيب في وقتٍ سابق، وهذا نموذجٌ ذهنيٌّ جيّد لكتابة الاستعلامات. لكن كما رأينا، نحتاج إلى نموذجٍ مختلفٍ للتنفيذ الفعلي. وهذا النموذج أقربُ إلى آلة تورينج (Turing machine) منه إلى خط أنابيب: فهناك رأسٌ للقراءة/الكتابة تجلس فوق خطوةٍ بعينها. فهي «تقرأ» الخطوة، وتغيّر «حالتها»، ثم تتحرّك يمينًا أو يسارًا.</p>
<p>قراءةُ الخطوة تعني تقييمَ دالة نوع الأنبوب. وكما رأينا أعلاه، تقبل كلُّ واحدةٍ من تلك الدوال كإدخالٍ الرسمَ البيانيَّ كاملًا، ووسائطَها الخاصة، وربما شرشورًا، وحالتها المحلية. وكإخراجٍ فهي تقدّم شرشورًا أو false أو إشارةَ 'pull' أو 'done'. وهذا المُخرَج هو ما تقرأه آلتُنا شبهُ الشبيهة بتورينج لتغيّر حالة الآلة.</p>
<p>تتألّف تلك الحالة من متغيّرَين فقط: أحدهما لتسجيل الخطوات التي صارت 'done'، والآخر لتسجيل <code>results</code> الاستعلام. ويتم تحديثُهما، ثم إمّا تتحرّك رأسُ الآلة وإمّا ينتهي الاستعلام وتُعاد النتيجة.</p>
<p>لقد وصفنا الآن كلَّ حالة في آلتنا. ولدينا قائمةُ نتائجٍ تبدأ فارغة:</p>
<pre><code class="language-javascript">  <span class="hljs-keyword">var</span> results = []
</code></pre>
<p>وفهرسٌ لآخر خطوةٍ 'done' يبدأ خلف الخطوة الأولى:</p>
<pre><code class="language-javascript">  <span class="hljs-keyword">var</span> done = -<span class="hljs-number">1</span>
</code></pre>
<p>نحتاج إلى موضعٍ لتخزين مُخرَج آخر خطوة، وقد يكون شرشورًا—أو قد يكون لا شيء— لذا سنسميه <code>maybe_gremlin</code>:</p>
<pre><code class="language-javascript">  <span class="hljs-keyword">var</span> maybe_gremlin = <span class="hljs-literal">false</span>
</code></pre>
<p>وأخيرًا سنحتاج إلى عدّادِ برامج (program counter) يدلّ على موضع رأس القراءة/الكتابة.</p>
<pre><code class="language-javascript">  <span class="hljs-keyword">var</span> pc = <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>
</code></pre>
<p>غير أنّ... لحظة. كيف سنحصل على الكسل[^getlazy]؟ فالطريقة التقليدية لبناء نظامٍ كسولٍ من نظامٍ مستعجل هي تخزينُ وسائط استدعاءات الدوال بوصفها «ثنكوات» (thunks) بدلًا من تقييمها. ويمكنك أن تتخيّل الـ thunk تعبيرًا غير مقيَّم. وفي JavaScript، التي تملك دوالَّ من الطبقة الأولى (first-class functions) وإغلاقاتٍ (closures)، يمكننا إنشاء thunk بلفِّ دالةٍ ووسائطها داخل دالةٍ مجهولةٍ جديدة لا تأخذ أيّ وسائط:</p>
<p>[^getlazy]: تقنيًا، نحتاج إلى تنفيذ مفسِّرٍ بدلالاتٍ غير صارمة (non-strict semantics)، ما يعني أنه لن يقيّم إلّا حين يُجبَر على ذلك. والتقييمُ الكسول (lazy evaluation) تقنيةٌ تُستخدم لتنفيذ عدم الصرامة. ومن المُكِثِر بمزج الأمرين أن نكون كسولين، لذا سنفصل بينهما فقط حين يُجبَرنا على ذلك.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">sum</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> [].<span class="hljs-property">slice</span>.<span class="hljs-title function_">call</span>(<span class="hljs-variable language_">arguments</span>).<span class="hljs-title function_">reduce</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">acc, n</span>) { <span class="hljs-keyword">return</span> acc + (n|<span class="hljs-number">0</span>) }, <span class="hljs-number">0</span>)
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">thunk_of_sum_1_2_3</span>(<span class="hljs-params"></span>) { <span class="hljs-keyword">return</span> <span class="hljs-title function_">sum</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>) }

<span class="hljs-keyword">function</span> <span class="hljs-title function_">thunker</span>(<span class="hljs-params">fun, args</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {<span class="hljs-keyword">return</span> fun.<span class="hljs-title function_">apply</span>(fun, args)}
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">thunk_wrapper</span>(<span class="hljs-params">fun</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> thunker.<span class="hljs-title function_">apply</span>(<span class="hljs-literal">null</span>, [fun].<span class="hljs-title function_">concat</span>([[].<span class="hljs-property">slice</span>.<span class="hljs-title function_">call</span>(<span class="hljs-variable language_">arguments</span>)]))
  }
}

<span class="hljs-title function_">sum</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)              <span class="hljs-comment">// -&gt; 6</span>
<span class="hljs-title function_">thunk_of_sum_1_2_3</span>()      <span class="hljs-comment">// -&gt; 6</span>
<span class="hljs-title function_">thunker</span>(sum, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])() <span class="hljs-comment">// -&gt; 6</span>

<span class="hljs-keyword">var</span> sum2 = <span class="hljs-title function_">thunk_wrapper</span>(sum)
<span class="hljs-keyword">var</span> thunk = <span class="hljs-title function_">sum2</span>(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
<span class="hljs-title function_">thunk</span>()                   <span class="hljs-comment">// -&gt; 6</span>
</code></pre>
<p>لا يُستدعى أيُّ واحدٍ من هذه الثنكوات حتى تُحتاج إحداها فعلًا، وهو ما يعني عادةً أن نوعًا ما من المُخرَج مطلوب: في حالتنا نتيجةُ استعلام. وفي كل مرة يصطدم فيها المفسِّر باستدعاء دالةٍ جديد، نغلّفه في thunk. وتذكّر صياغتَنا الأوّلية للاستعلام: <code>children(children(children(parents(parents(parents([8]))))))</code>. وسيكون كلُّ تلك الطبقات thunk، ملفوفًا كالبصلة.</p>
<p>وهناك مقايضتان في هذا المقاربة: إحداهما أن الأداءَ المكاني (spatial performance) يصعبُ التفكيرُ فيه، بسبب رسوم thunk الهائلة المحتملة التي يمكن إنشاؤها. والأخرى أن برنامجنا صار الآن معبَّرًا عنه في thunkٍ واحد، ولا يمكننا أن نفعل به الكثير عند تلك النقطة.</p>
<p>عادةً ما لا تكون النقطةُ الثانية مشكلةً، بسبب الفصل بين المراحل (phase separation) بين ما تعمل فيه مُصرِّفُنا (compiler) تحسيناتَها، وما تجري فيه كل عمليات تغليف thunk وقت التشغيل. أمّا في حالتنا فلا نملك تلك الميزة: لأننا نستخدم تسلسلَ الدوال لتنفيذ واجهةٍ سلسة (fluent interface)[^fluentinterface]، فإن استخدمنا أيضًا thunks لتحقيق الكسل لأغلفنا كل دالةٍ جديدة لحظة استدعائها، ما يعني أن حين نصل إلى <code>run()</code> لا يكون لدينا سوى thunkٍ كإدخال، ولا سبيل لدينا إلى تحسين استعلامنا.</p>
<p>[^fluentinterface]: يتيح لنا تسلسلُ الدوال كتابةَ <code>g.v('Thor').in().out().run()</code> بدلًا من أسطر JS الستة غير السلسة التي يلزم لإنجاز الشيء نفسه.</p>
<p>ومن اللافت أن واجهتَنا السلسة تخفي فرقًا آخر بين لغة استعلاماتنا ولغات البرمجة الاعتيادية. فالاستعلام <code>g.v('Thor').in().out().run()</code> يمكن إعادةُ كتابته على Shape <code>run(out(in(v(g, 'Thor'))))</code> لو لم نستخدم تسلسل الدوال. وفي JavaScript كنا سنعالج <code>g</code> و<code>'Thor'</code> أولًا، ثم <code>v</code>، ثم <code>in</code> و<code>out</code> و<code>run</code>، من الداخل إلى الخارج. أمّا في لغةٍ بدلالاتٍ غير صارمةٍ لكنا سنعمل من الخارج إلى الداخل، فنعالج كل طبقةٍ متتاليةٍ من الوسائط المتداخلة عند الحاجة فحسب.</p>
<p>فإن بدأنا تقييمَ استعلامنا في نهاية الجملة، عند <code>run</code>، وعدنا بالزحف إلى <code>v('Thor')</code>، أحسبنا النتائج عند الحاجة فحسب، فقد بلغنا بفعاليةٍ عدمَ الصرامة. والسرّ في خطّية استعلاماتنا. فالفروعُ تُعقّد رسمَ العملية، وتُدخل أيضًا فرصًا لاستدعاءاتٍ مكرّرة، ممّا يستلزم الحفظَ المؤقت (memoization) تفاديًا لعملٍ ضائع. وبساطةُ لغة استعلاماتنا تعني أننا نستطيع تنفيذ مفسِّرٍ بساطةٍ مماثلة قائمٍ على نموذجنا الخطّي للقراءة/الكتابة.</p>
<p>إلى جانب السماح بتحسيناتٍ وقت التشغيل، لهذا النمط مزايا كثيرةٌ أخرى تتعلق بسهولة التجهيز (instrumentation): السجلّ، وقابلية التراجع عن التنفيذ، والتنقيح خطوةً خطوة، وإحصاءات الاستعلامات. وكلُّ هذه سهلةُ الإضافة ديناميكيًّا لأننا نتحكّم في المفسِّر ونتركه مُقيِّمَ آلةٍ افتراضية (virtual machine) بدلًا من تصغير البرنامج إلى thunkٍ واحد.</p>
<h2 id="المفسر-مكشوفا">المفسِّر، مكشوفًا</h2>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Q</span>.<span class="hljs-property">run</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {                 <span class="hljs-comment">// a machine for query processing</span>

  <span class="hljs-keyword">var</span> max = <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>         <span class="hljs-comment">// index of the last step in the program</span>
  <span class="hljs-keyword">var</span> maybe_gremlin = <span class="hljs-literal">false</span>                 <span class="hljs-comment">// a gremlin, a signal string, or false</span>
  <span class="hljs-keyword">var</span> results = []                          <span class="hljs-comment">// results for this particular run</span>
  <span class="hljs-keyword">var</span> done = -<span class="hljs-number">1</span>                             <span class="hljs-comment">// behindwhich things have finished</span>
  <span class="hljs-keyword">var</span> pc = max                              <span class="hljs-comment">// our program counter</span>

  <span class="hljs-keyword">var</span> step, state, pipetype

  <span class="hljs-keyword">while</span>(done &lt; max) {
    <span class="hljs-keyword">var</span> ts = <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>
    step = <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>[pc]                 <span class="hljs-comment">// step is a pair of pipetype and args</span>
    state = (ts[pc] = ts[pc] || {})         <span class="hljs-comment">// this step&#x27;s state must be an object</span>
    pipetype = <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">getPipetype</span>(step[<span class="hljs-number">0</span>])  <span class="hljs-comment">// a pipetype is just a function</span>
</code></pre>
<p>هنا <code>max</code> مجردُ ثابت، بينما <code>step</code> و<code>state</code> و<code>pipetype</code> تخزّن مؤقتًا معلوماتٍ عن الخطوة الحالية. وقد دخلنا حلقةَ التشغيل (driver loop)، ولن نتوقّف حتى تُنجَز الخطوة الأخيرة.</p>
<pre><code class="language-javascript">    maybe_gremlin = <span class="hljs-title function_">pipetype</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">graph</span>, step[<span class="hljs-number">1</span>], maybe_gremlin, state)
</code></pre>
<p>استدعاءُ دالة نوع الأنبوب الخاصة بالخطوة مع وسائطها.</p>
<pre><code class="language-javascript">    <span class="hljs-keyword">if</span>(maybe_gremlin == <span class="hljs-string">&#x27;pull&#x27;</span>) {           <span class="hljs-comment">// &#x27;pull&#x27; means the pipe wants more input</span>
      maybe_gremlin = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">if</span>(pc-<span class="hljs-number">1</span> &gt; done) {
        pc--                                <span class="hljs-comment">// try the previous pipe</span>
        <span class="hljs-keyword">continue</span>
      } <span class="hljs-keyword">else</span> {
        done = pc                           <span class="hljs-comment">// previous pipe is done, so we are too</span>
      }
    }
</code></pre>
<p>ولمعالجة حالة 'pull' نضبط أولًا <code>maybe_gremlin</code>[^maybegremlin] على false. فنحن هنا نُحمّل (overload) معنى «ربما» باستخدامه قناةً لتمرير إشارتَي 'pull' و'done'، لكن بمجرّد أن تُنتزع إحدى تلك الإشارتين نعود إلى التفكير في هذا على أنه «ربما» بالمعنى الصحيح.</p>
<p>[^maybegremlin]: نسمّيه <code>maybe_gremlin</code> لنذكّر أنفسنا بأنه قد يكون شرشورًا، وقد يكون شيئًا آخر. وأيضًا لأنه في الأصل كان إمّا شرشورًا أو لا شيء.</p>
<p>إن كانت الخطوةُ التي قبلنا ليست 'done'[^stepnotdone]، فإننا نحرّك الرأسَ إلى الوراء ونحاول مرّةً أخرى. وإلّا فإننا نعلّم أنفسنا بأننا 'done' ونترك الرأسَ يسقط إلى الأمام طبيعيًّا.</p>
<p>[^stepnotdone]: تذكّر أن done يبدأ من -1، فإن سابق الخطوة الأولى يكون دائمًا done.</p>
<pre><code class="language-javascript">    <span class="hljs-keyword">if</span>(maybe_gremlin == <span class="hljs-string">&#x27;done&#x27;</span>) {           <span class="hljs-comment">// &#x27;done&#x27; tells us the pipe is finished</span>
      maybe_gremlin = <span class="hljs-literal">false</span>
      done = pc
    }
</code></pre>
<p>معالجةُ حالة 'done' أسهلُ من ذلك: نضبط <code>maybe_gremlin</code> على false ونعلّم هذه الخطوة بأنها 'done'.</p>
<pre><code class="language-javascript">    pc++                                    <span class="hljs-comment">// move on to the next pipe</span>

    <span class="hljs-keyword">if</span>(pc &gt; max) {
      <span class="hljs-keyword">if</span>(maybe_gremlin)
        results.<span class="hljs-title function_">push</span>(maybe_gremlin)         <span class="hljs-comment">// a gremlin popped out of the pipeline</span>
      maybe_gremlin = <span class="hljs-literal">false</span>
      pc--                                  <span class="hljs-comment">// take a step back</span>
    }
  }
</code></pre>
<p>لقد فرغنا من الخطوة الحالية، وقد حرّكنا الرأسَ إلى التي تليها. فإن كنّا في نهاية البرنامج واحتوى <code>maybe_gremlin</code> على شرشور، فإننا نضيفه إلى النتائج، ونضبط <code>maybe_gremlin</code> على false، ونحرّك الرأسَ إلى الخلف إلى الخطوة الأخيرة في البرنامج.</p>
<p>وهذه هي حالة التهيئة أيضًا، لأن <code>pc</code> يبدأ بوصفه <code>max</code>. فنبدأ من هنا ونُعيد الزحفَ إلى الوراء، ونصل إلى هنا مرّةً أخرى على الأقلّ لكل نتيجةٍ نهائية يُعيدها الاستعلام.</p>
<pre><code class="language-javascript">  results = results.<span class="hljs-title function_">map</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">gremlin</span>) { <span class="hljs-comment">// return projected results, or vertices</span>
    <span class="hljs-keyword">return</span> gremlin.<span class="hljs-property">result</span> != <span class="hljs-literal">null</span>
         ? gremlin.<span class="hljs-property">result</span> : gremlin.<span class="hljs-property">vertex</span> } )

  <span class="hljs-keyword">return</span> results
}
</code></pre>
<p>لقد خرجنا الآن من حلقة التشغيل: انتهى الاستعلام، والنتائج في متناول اليد، ولم يبقَ إلّا معالجتُها وإعادتها. فإذا كان أيُّ شرشورٍ قد ضُبطت نتيجتُه فإننا نُعيد تلك النتيجة، وإلّا فإننا نُعيد آخرَ رأسٍ بلغَه الشرشور. هل هناك أشياءُ أخرى قد نرغب في إعادتها؟ وما المقايضات هنا؟</p>
<h2 id="محولات-الاستعلام">محوّلات الاستعلام</h2>
<p>لدينا الآن مفسِّرٌ مضغوطٌ جيّد لبرامج استعلاماتنا، لكننا ما زلنا نفتقر إلى شيء. فكل نظام إدارة قواعد بيانات حديث (DBMS) يأتي مع مُحسِّن استعلامات (query optimizer) كجزءٍ أساسيّ من النظام. أمّا في قواعد البيانات غير العلائقية، فإن تحسينَ خطة الاستعلام نادرًا ما يُعطي المكاسبَ الأُسّية (exponential speedups) التي نراها في نظيراتها العلائقية[^dboptimize]، لكنه يظلّ جانبًا مهمًّا من تصميم قواعد البيانات.</p>
<p>[^dboptimize]: أو، بتعبيرٍ أدقّ، فالاستعلامُ السيّئ الصياغة أقلُّ احتمالًا في أن يُعطي تباطؤاتٍ أُسّية. وبصفتك مستخدمًا نهائيًا لنظام قواعد بياناتٍ علائقي، فإن جماليات جودة الاستعلام قد تكون غامضةً في كثيرٍ من الأحيان.</p>
<p>فما أبسطُ شيءٍ يمكننا فعله ويمكن أن نسمّيه منصفًا مُحسِّنَ استعلامات؟ حسنًا، يمكننا كتابةُ دوالَّ صغيرة لتحويل برامج استعلاماتنا قبل تشغيلها. سنُدخل برنامجًا كإدخال، ونُخرج برنامجًا مختلفًا كمُخرَج.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">T</span> = []                               <span class="hljs-comment">// transformers (more than meets the eye)</span>

<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">addTransformer</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">fun, priority</span>) {
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> fun != <span class="hljs-string">&#x27;function&#x27;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Invalid transformer function&#x27;</span>)

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">T</span>.<span class="hljs-property">length</span>; i++)  <span class="hljs-comment">// OPT: binary search</span>
    <span class="hljs-keyword">if</span>(priority &gt; <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">T</span>[i].<span class="hljs-property">priority</span>) <span class="hljs-keyword">break</span>

  <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">T</span>.<span class="hljs-title function_">splice</span>(i, <span class="hljs-number">0</span>, {<span class="hljs-attr">priority</span>: priority, <span class="hljs-attr">fun</span>: fun})
}
</code></pre>
<p>الآن يمكننا إضافةَ محوّلات الاستعلام إلى نظامنا. ومحوِّلُ الاستعلام دالةٌ تقبل برنامجًا وتُعيد برنامجًا، إضافةً إلى مستوى أولوية (priority). والمحوِّلاتُ ذات الأولوية الأعلى توضع أقربَ إلى مقدّمة القائمة. ونحن نتأكّد من أن <code>fun</code> دالة، لأننا سنُقيّمها لاحقًا[^paramdomain].</p>
<p>[^paramdomain]: لاحظ أننا نترك مجالَ وسيط الأولوية مفتوحًا، فيمكن أن يكون عددًا صحيحًا، أو نسبةً، أو عددًا سالبًا، أو حتى أشياءَ مثل Infinity أو NaN.</p>
<p>سنفترض ألا تكون هناك إضافاتُ محوّلاتٍ بكميةٍ كبيرة، وسنمرّ على القائمة خطيًا لإضافة محوِّل جديد. وسنترك ملاحظةً احتياطًا لو تبيّن خطأُ هذا الافتراض—فالبحثُ الثنائيّ (binary search) أكثرُ مثليةً زمنيًا للقوائم الطويلة، لكنه يضيف بعض التعقيد ولا يسرّع فعليًّا القوائم القصيرة.</p>
<p>ولتشغيل هذه المحوّلات سنحقن سطرَ شيفرةٍ واحدًا في مقدّمة مفسّرنا:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">Q</span>.<span class="hljs-property">run</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {                     <span class="hljs-comment">// our virtual machine for querying</span>
  <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span> = <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">transform</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>) <span class="hljs-comment">// activate the transformers</span>
</code></pre>
<p>سنستخدم ذلك لاستدعاء هذه الدالة، التي لا تكتفي إلا بتمرير برنامجنا عبر كل محوِّل بالتناوب:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">transform</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">program</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">T</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">acc, transformer</span>) {
    <span class="hljs-keyword">return</span> transformer.<span class="hljs-title function_">fun</span>(acc)
  }, program)
}
</code></pre>
<p>حتى هذه النقطة، كان محرّكُنا يقايض البساطة بالأداء، لكن من مزايا هذه الاستراتيجية أنها تترك الأبوابَ مفتوحةً أمام تحسيناتٍ شاملةٍ كانت قد تكون متاحةً لو اخترنا التحسينَ محلّيًّا عند تصميم النظام.</p>
<p>كثيرًا ما يزيد تحسينُ البرنامج من التعقيد ويقلّل من أناقة النظام، فيجعله أصعبَ في التفكير فيه وصيانته. وكسرُ حواجز التجريد مقابل مكاسبَ أداءٍ إحدى أكثر صور التحسين تعدّيًا للحدود. لكن حتى شيءٌ يبدو بريئًا مثل تضمين شيفرةٍ موجّهةٍ للأداء في منطق الأعمال يجعل الصيانةَ أصعب.</p>
<p>وفي ضوء ذلك، فإن هذا النوع من «التحسين المتعامد» (orthogonal optimization) لافتٌ للاهتمام على وجه الخصوص. يمكننا إضافةَ المُحسِّنين في وحداتٍ مستقلّة أو حتى في شيفرة المستخدم، بدلًا من تشابكهم التامّ مع المحرّك. ويمكننا اختبارَهم بمعزل عن بعضهم أو في مجموعات، ثم بإضافة الاختبارات التوليدية (generative testing) يمكننا حتى أتمتةُ تلك العملية، بما يضمن أن مُحسِّنينا المتاحين يتعايشون معًا بكل ودّ.</p>
<p>ويمكننا أيضًا استعمالُ نظام المحوّلات هذا لإضافة وظائفَ جديدةٍ لا علاقة لها بالتحسين. فلننظر الآن إلى مثالٍ على ذلك.</p>
<h2 id="الأسماء-المستعارة">الأسماء المستعارة</h2>
<p>إنشاءُ استعلامٍ مثل <code>g.v('Thor').out().in()</code> مضغوطٌ إلى حدٍّ لا بأس به، لكن هل هذا أشقاءُ ثور أم زملاؤه؟ ولا التفسيرُ مقنعٌ تمامًا. وكان الأجمل أن تقول ما تعني: إمّا <code>g.v('Thor').parents().children()</code> أو <code>g.v('Thor').children().parents()</code>.</p>
<p>ويمكننا استعمالُ محوّلات الاستعلام لصناعة أسماءٍ مستعارة بمجرّد دالتَي مساعدتين إضافيتين:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">addAlias</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">newname, oldname, defaults</span>) {
  defaults = defaults || []                     <span class="hljs-comment">// default arguments for the alias</span>
  <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addTransformer</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">program</span>) {
    <span class="hljs-keyword">return</span> program.<span class="hljs-title function_">map</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">step</span>) {
      <span class="hljs-keyword">if</span>(step[<span class="hljs-number">0</span>] != newname) <span class="hljs-keyword">return</span> step
      <span class="hljs-keyword">return</span> [oldname, <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">extend</span>(step[<span class="hljs-number">1</span>], defaults)]
    })
    }, <span class="hljs-number">100</span>)                                     <span class="hljs-comment">// 100 because aliases run early</span>

  <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addPipetype</span>(newname, <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {})
}
</code></pre>
<p>نحن نضيف اسمًا جديدًا لخطوةٍ قائمة، لذا سنحتاج إلى إنشاء محوِّل استعلام يحوّل الاسم الجديد إلى القديم كلما ظهر. وسنحتاج أيضًا إلى إضافة الاسم الجديد كدالةٍ على كائن الاستعلام الرئيسي، ليُسحَب إلى برنامج الاستعلام.</p>
<p>لو استطعنا التقاطَ استدعاءات الدوال المفقودة وتوجيهَها إلى دالةِ معالِجٍ لأمكننا تشغيل هذا المحوِّل بأولويةٍ أقلّ، لكن لا توجد حاليًا طريقةٌ لفعل ذلك. وبدلًا من ذلك سنشغّله بأولويةٍ عالية قدرها 100، حتى تُضاف الدوالُ المستعارة قبل استدعائها.</p>
<p>ونستدعي دالةً مساعدةً أخرى لدمج وسائط الخطوة الواردة مع وسائط الاسم المستعار الافتراضية. فإذا كانت الخطوة الواردة تنقصها وسائط، فإننا نستعمل وسيطَ الاسم المستعار في تلك الخانة.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">extend</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">list, defaults</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(defaults).<span class="hljs-title function_">reduce</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">acc, key</span>) {
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> list[key] != <span class="hljs-string">&#x27;undefined&#x27;</span>) <span class="hljs-keyword">return</span> acc
    acc[key] = defaults[key]
    <span class="hljs-keyword">return</span> acc
  }, list)
}
</code></pre>
<p>الآن يمكننا أن نصنع تلك الأسماءَ المستعارة التي أردناها:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;parents&#x27;</span>, <span class="hljs-string">&#x27;out&#x27;</span>)
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;children&#x27;</span>, <span class="hljs-string">&#x27;in&#x27;</span>)
</code></pre>
<p>ويمكننا أيضًا أن نبدأ في تخصيص نموذج بياناتنا أكثر قليلًا، بأن نُوسم كل حافةٍ بين أبٍ وابنه بأنها حافةُ «والد». عندئذٍ ستبدو أسماؤنا المستعارة هكذا:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;parents&#x27;</span>, <span class="hljs-string">&#x27;out&#x27;</span>, [<span class="hljs-string">&#x27;parent&#x27;</span>])
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;children&#x27;</span>, <span class="hljs-string">&#x27;in&#x27;</span>, [<span class="hljs-string">&#x27;parent&#x27;</span>])
</code></pre>
<p>والآن يمكننا إضافةَ حوافّ للأزواج، أو للآباء من الزيجات السابقة، أو حتى للحبّين المخدوعين. وإذا حسّنّا دالةَ <code>addAlias</code> فيمكننا تقديمُ أسماءٍ مستعارة جديدة للأجداد، أو للأشقاء، أو حتى لأبناء العمومة:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;grandparents&#x27;</span>, [ [<span class="hljs-string">&#x27;out&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>], [<span class="hljs-string">&#x27;out&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>]])
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;siblings&#x27;</span>,     [ [<span class="hljs-string">&#x27;as&#x27;</span>, <span class="hljs-string">&#x27;me&#x27;</span>], [<span class="hljs-string">&#x27;out&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>]
                                , [<span class="hljs-string">&#x27;in&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>], [<span class="hljs-string">&#x27;except&#x27;</span>, <span class="hljs-string">&#x27;me&#x27;</span>]])
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;cousins&#x27;</span>,      [ [<span class="hljs-string">&#x27;out&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>], [<span class="hljs-string">&#x27;as&#x27;</span>, <span class="hljs-string">&#x27;folks&#x27;</span>]
                                , [<span class="hljs-string">&#x27;out&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>], [<span class="hljs-string">&#x27;in&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>]
                                , [<span class="hljs-string">&#x27;except&#x27;</span>, <span class="hljs-string">&#x27;folks&#x27;</span>], [<span class="hljs-string">&#x27;in&#x27;</span>, <span class="hljs-string">&#x27;parent&#x27;</span>]
                                , [<span class="hljs-string">&#x27;unique&#x27;</span>]])
</code></pre>
<p>اسمُ <code>cousins</code> المستعار مرهقٌ نوعًا ما. ولعلّنا نستطيع توسيعَ دالة <code>addAlias</code> لتتيح لنا استعمالَ أسماءٍ مستعارة أخرى داخل أسمائنا المستعارة، وأن نستدعيها هكذا:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">addAlias</span>(<span class="hljs-string">&#x27;cousins&#x27;</span>,      [ <span class="hljs-string">&#x27;parents&#x27;</span>, [<span class="hljs-string">&#x27;as&#x27;</span>, <span class="hljs-string">&#x27;folks&#x27;</span>]
                                , <span class="hljs-string">&#x27;parents&#x27;</span>, <span class="hljs-string">&#x27;children&#x27;</span>
                                , [<span class="hljs-string">&#x27;except&#x27;</span>, <span class="hljs-string">&#x27;folks&#x27;</span>], <span class="hljs-string">&#x27;children&#x27;</span>, <span class="hljs-string">&#x27;unique&#x27;</span>])
</code></pre>
<p>الآن، بدلًا من</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Forseti&#x27;</span>).<span class="hljs-title function_">parents</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;parents&#x27;</span>).<span class="hljs-title function_">parents</span>().<span class="hljs-title function_">children</span>()
                        .<span class="hljs-title function_">except</span>(<span class="hljs-string">&#x27;parents&#x27;</span>).<span class="hljs-title function_">children</span>().<span class="hljs-title function_">unique</span>()
</code></pre>
<p>يمكنك ببساطة أن تقول <code>g.v('Forseti').cousins()</code>.</p>
<p>لكننا أدخلنا أنفسنا هنا في موضعٍ شائكٍ نوعًا ما: فبينما تُحلّ دالةُ <code>addAlias</code> اسمًا مستعارًا، عليها أن تحلّ أسماءً مستعارةً أخرى أيضًا. فماذا لو استدعى <code>parents</code> اسمًا مستعارًا آخر، وحين نحلّ <code>cousins</code> اضطررنا إلى التوقّف لحلّ <code>parents</code> ثم لحلّ أسمائه المستعارة وهكذا؟ وماذا لو استدعى أحدُ أسماء <code>parents</code> المستعارة في النهاية <code>cousins</code>؟</p>
<p>وهذا ينقلنا إلى عالم استرجاع التبعيات (dependency resolution)[^dependencyresolution]، وهو مكوّنٌ أساسيٌّ في مديري الحزم الحديثين. وهناك كثيرٌ من الحيل المتقنة لاختيار الإصدارات المثلى، وهزّ الأشجار (tree shaking)، والتحسينات العامة وما شابه، لكن الفكرةَ الأساسية بسيطةٌ إلى حدٍّ ما. سنصنع رسمًا بيانيًا لكل التبعيات وعلاقاتها، ثم نحاول أن نجد طريقةً نحاذي بها الرؤوس مع جعل كل الأسهم تسير من اليسار إلى اليمين. فإن استطعنا، فتُسمّى هذه الترتيبُيةُ تحديدًا للرؤوس «ترتيبًا طوبولوجيًّا» (topological ordering)، وعندئذٍ نكون قد أثبتنا أن رسمَنا البياني للتبعيات خالٍ من الدورات: فهو رسمٌ بياني غير دوري موجّه (Directed Acyclic Graph, DAG). وإن عجزنا عن ذلك، فإن رسمَنا البياني فيه دورةٌ واحدةٌ على الأقل.</p>
<p>[^dependencyresolution]: يمكنك تعلّمُ المزيد عن استرجاع التبعيات في فصل Contingent من هذا الكتاب.</p>
<p>ومن ناحية أخرى، نتوقّع أن استعلاماتنا ستكون عمومًا قصيرةً نوعًا ما (فمئةُ خطوةٍ ستكون استعلامًا طويلًا جدًّا)، وأن عددَ المحوّلات لدينا سيكون منخفضًا إلى حدٍّ معقول. وبدلًا من العبث بالرسوم البيانية غير الدورية وإدارة التبعيات، يمكننا أن نُعيد 'true' من دالة التحويل إذا تغيّر شيء، ثم نشغّلها حتى تتوقّف عن أن تكون مثمرة. وهذا يتطلّب من كل محوِّل أن يكون قابلًا للتكرار (idempotent)، وهي خاصيةٌ مفيدة لأن تملكها المحوّلات. فما مزايا وعيوب هذين المسارين؟</p>
<h2 id="الأداء">الأداء</h2>
<p>تشترك جميعُ قواعد البيانات الرسومية الإنتاجية في خاصية أداءٍ معيّنة: فاستعلاماتُ اجتياز الرسم البياني ذاتُ زمن ثابت (constant time) بالنسبة إلى الحجم الكلّي للرسم البياني[^ifadjacency]. أمّا في قاعدة بياناتٍ غير رسومية، فإن طلبَ قائمة أصدقاء شخصٍ قد يستغرق زمنًا متناسبًا مع عدد المدخلات، لأنك في أسوأ الحالات الساذجة مضطرٌ للنظر في كل مُدخل. وهذا يعني أن استعلامًا على عشرة مدخلات يستغرق ميلي ثانية، فإن استعلامًا على عشرة ملايين مُدخلٍ سيستغرق قرابة أسبوعين. وستصل قائمتُ أصدقائك أسرعَ لو أُرسلت عبر Pony Express[^ponyexpress]!</p>
<p>[^ifadjacency]: المصطلحُ المتقن لهذا هو «الجوار بلا فهرس» (index-free adjacency).</p>
<p>[^ponyexpress]: ورغم أن Pony Express لم يعمل إلّا ثمانيةَ عشرَ شهرًا بسبب ظهور التلغراف العابر للقارات واندلاع الحرب الأهلية الأمريكية، فإن Pony Express لا يزال يُذكر اليوم لأنه كان يوصّل البريد من ساحلٍ إلى ساحلٍ في عشرة أيام فقط.</p>
<p>ولتخفيف هذا الأداء المُكئب، تُنشئ معظمُ قواعد البيانات فهارسَ على الحقول كثيرةِ الاستعلام، ممّا يحوّل بحثًا ذا $O(n)$ إلى بحثٍ ذا $O(log n)$. وهذا يمنح أداءَ بحثٍ أفضلَ بكثير، لكن مقابل ذلك نخسر بعضَ أداء الكتابة ونخسر مساحةً كبيرة—فالفهارسُ يمكن أن تضاعف حجمَ قاعدة البيانات بسهولة. والموازنةُ المتأنّية بين مقايضات المساحة والزمن في الفهارس جزءٌ من عملية الضبط الدائم لمعظم قواعد البيانات.</p>
<p>وتتجاوز قواعدُ البيانات الرسومية هذه المشكلةَ بجعلها تصل بين الرؤوس والحوافّ اتصالاتٍ مباشرة، فتصبح اجتيازاتُ الرسم البياني مجردَ قفزاتِ مؤشّرات؛ لا حاجةَ إلى المسح في كل عنصر، ولا حاجةَ إلى فهارس، ولا عملَ إضافي على الإطلاق. وصار إيجادُ أصدقائك له السعرُ نفسه مهما بلغ العددُ الكلّي للناس في الرسم البياني، من دون تكلفة إضافية في المساحة ولا في زمن الكتابة. وأحدُ عيوب هذا المقاربة أن المؤشّرات تعمل على أفضل وجه حين يكون الرسمُ البياني الكلّي في ذاكرة الآلة نفسها. فتقسيمُ قاعدة بياناتٍ رسومية فعليًّا على عدّة آلات لا يزال مجالَ بحثٍ نشطًا[^graphdbsharding].</p>
<p>[^graphdbsharding]: يتطلّب تقسيمُ قاعدة البيانات الرسومية تقسيمَ الرسم البياني. <a href="http://dl.acm.org/citation.cfm?doid=1007912.1007931">وتقسيمُ الرسم البياني الأمثل مسألةٌ من فئة NP-hard</a>، حتى في الرسوم البيانية البسيطة مثل الأشجار والشبكات، كما أن التقريبات الجيدة تملك <a href="http://arxiv.org/pdf/1311.3144v2.pdf">تعقيدًا قُعديًّا أُسّيًا</a>.</p>
<p>ويمكننا رؤية ذلك عملًا في عالم Dagoba المصغّر إذا استبدلنا دوالّ إيجاد الحوافّ. وهذه نسخةٌ ساذجة تبحث في كل الحوافّ بزمن خطّي. وهي تشبه تنفيذَنا الأوّل جدًّا، لكنها تستعمل كل البنى التي بنيناها منذ ذلك الحين.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findInEdges</span>  = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">edges</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">edge</span>) {<span class="hljs-keyword">return</span> edge.<span class="hljs-property">_in</span>.<span class="hljs-property">_id</span>  == vertex.<span class="hljs-property">_id</span>} )
}
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findOutEdges</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">edges</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-keyword">function</span>(<span class="hljs-params">edge</span>) {<span class="hljs-keyword">return</span> edge.<span class="hljs-property">_out</span>.<span class="hljs-property">_id</span> == vertex.<span class="hljs-property">_id</span>} )
}
</code></pre>
<p>ويمكننا إضافةُ فهرسٍ للحوافّ، وهذا يأخذنا معظمَ الطريق مع الرسوم البيانية الصغيرة، لكنه يحمل كل مشكلات الفهرسة الكلاسيكية مع الكبيرة.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findInEdges</span>  = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) { <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">inEdgeIndex</span> [vertex.<span class="hljs-property">_id</span>] }
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findOutEdges</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) { <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">outEdgeIndex</span>[vertex.<span class="hljs-property">_id</span>] }
</code></pre>
<p>وهنا تعود أصدقاؤنا القدامى من جديد: جوارٌ بلا فهرس، نقيٌّ وحلو.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findInEdges</span>  = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) { <span class="hljs-keyword">return</span> vertex.<span class="hljs-property">_in</span>  }
<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">findOutEdges</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">vertex</span>) { <span class="hljs-keyword">return</span> vertex.<span class="hljs-property">_out</span> }
</code></pre>
<p>نفّذ هذه بنفسك لتختبر الفرقَ الذي تُحدثه قاعدة البيانات الرسومية[^jslistfilter].</p>
<p>[^jslistfilter]: في محرّكات JavaScript الحديثة، يكون ترشيحُ قائمةٍ سريعًا إلى حدٍّ كبير—فمع الرسوم البيانية الصغيرة قد تكون النسخةُ الساذجة أسرعَ فعليًّا من النسخة بلا فهرس، بسبب بنى البيانات الأساسية وطريقة تجميع الشيفرة وقت التشغيل (JIT). جرّبها مع أحجامٍ مختلفةٍ من الرسوم البيانية لترى كيف يتوسّع كلا المقاربتين.</p>
<h2 id="التسلسل">التسلسل</h2>
<p>وجودُ رسمٍ بياني في الذاكرة أمرٌ رائع، لكن كيف نضعه هناك أصلًا؟ رأينا أن باني الرسم البياني لدينا يستطيع أن يأخذ قائمة رؤوس وقائمة حوافّ وينشئ لنا رسمًا بيانيًا، لكن كيف نستخرج الرؤوس والحوافّ بعد انتهاء البناء؟</p>
<p>ميلُنا الطبيعي هو أن نفعل شيئًا كـ <code>JSON.stringify(graph)</code>، وهو يُنتج الخطأ الرهيب «TypeError: Converting circular structure to JSON». وخلال عملية بناء الرسم البياني كانت الرؤوسُ مربوطةً بحوافّها، والحوافّ كلها مربوطةٌ برؤوسها، فصار كل شيءٍ يشير إلى كل شيء. فكيف نستخرج قوائمَنا الجميلةَ المرتّبةَ مرّةً أخرى؟ إلى مُستبدِلات JSON (replacer functions) لإنقاذنا.</p>
<p>تأخذ دالةُ <code>JSON.stringify</code> قيمةً لتُسلسلها، لكنها تأخذ أيضًا وسيطين إضافيين: دالةَ مُستبدِل ورقمَ مسافاتٍ بيضاء[^protip]. ويتيح لك المُستبدِل تخصيصَ كيفية سير التسلسل.</p>
<p>[^protip]: نصيحةُ خبير: إذا كانت لديك شجرةٌ عميقة <code>deep_tree</code>، فإن تشغيل <code>JSON.stringify(deep_tree, 0, 2)</code> في وحدة تحكم JS طريقةٌ سريعةٌ لجعلها مقروءةً للبشر.</p>
<p>نحتاج إلى معاملة الرؤوس والحوافّ معاملةً مختلفة قليلًا، لذا سندمج الجانبين يدويًّا في سلسلة JSON واحدة.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">jsonify</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">graph</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;{&quot;V&quot;:&#x27;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(graph.<span class="hljs-property">vertices</span>, <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">cleanVertex</span>)
       + <span class="hljs-string">&#x27;,&quot;E&quot;:&#x27;</span> + <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(graph.<span class="hljs-property">edges</span>,    <span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">cleanEdge</span>)
       + <span class="hljs-string">&#x27;}&#x27;</span>
}
</code></pre>
<p>وهذه هي مُستبدِلات الرؤوس والحوافّ.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">cleanVertex</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>) {
  <span class="hljs-keyword">return</span> (key == <span class="hljs-string">&#x27;_in&#x27;</span> || key == <span class="hljs-string">&#x27;_out&#x27;</span>) ? <span class="hljs-literal">undefined</span> : value
}

<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">cleanEdge</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>) {
  <span class="hljs-keyword">return</span> (key == <span class="hljs-string">&#x27;_in&#x27;</span> || key == <span class="hljs-string">&#x27;_out&#x27;</span>) ? value.<span class="hljs-property">_id</span> : value
}
</code></pre>
<p>الفرقُ الوحيد بينهما هو ما يفعلانه حين تكون هناك دورةٌ على وشك التكوّن: فأمّا الرؤوس فنتخطّى قائمةَ الحوافّ تمامًا. وأمّا الحوافّ فنستبدل كلَّ رأسٍ بمعرّفه. وبذلك نتخلّص من كل الدورات التي أنشأناها أثناء بناء الرسم البياني.</p>
<p>نحن نتلاعبُ بـ JSON يدويًّا في <code>Dagoba.jsonify</code>، وهو أمرٌ لا يُنصح به عادةً لأن صيغة JSON هشّةٌ إلى حدٍّ ما. فحتى في جرعةٍ بهذا الحجم من السهل أن يفوتك شيءٌ، ويصعب التأكّد من صحّته بالنظر.</p>
<p>و يمكننا أن ندمج دالتي المُستبدِل في دالةٍ واحدة، ونستعمل دالةَ المُستبدِل الجديدة على الرسم البياني كلّه عبر <code>JSON.stringify(graph, my_cool_replacer)</code>. هذا يُعفينا من الحاجة إلى تلاعبٍ يدويّ بمُخرَج JSON، لكن الشيفرة الناتجة قد تكون فوضويّةً إلى حدٍّ كبير. جرّبها بنفسك وانظر إن استطعت أن تصل إلى حلٍّ جيّد التنظيم يتجنّب JSON المكتوب بخط اليد. (ونقاطٌ إضافية إن أمكنك حشره في تغريدة.)</p>
<h2 id="الاستمرارية">الاستمرارية</h2>
<p>الاستمرارية عادةً إحدى الأجزاء العسيرة في قاعدة البيانات: فالأقراص آمنةٌ نسبيًّا لكن بطيئة. وتجميعُ عمليات الكتابة في دفعات، وجعلُها ذرّية (atomic)، واليوميات (journaling)—هذه أمورٌ يصعب جعلُها سريعةً وصحيحةً معًا.</p>
<p>ولحسن الحظ، فنحن نبني قاعدةَ بياناتٍ <em>في الذاكرة</em> (in-memory)، لذا لا نضطر للقلق من أيّ ذلك! لكننا قد نرغب أحيانًا في حفظ نسخةٍ من قاعدة البيانات محليًّا لإعادة تشغيلٍ سريعةٍ عند تحميل الصفحة. يمكننا استعمالُ المُسلسِل (serializer) الذي بنيناه للتوّ لفعل ذلك بالضبط. لنغلّفه أولًا في دالةٍ مساعدة:</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">G</span>.<span class="hljs-property">toString</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) { <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">jsonify</span>(<span class="hljs-variable language_">this</span>) }
</code></pre>
<p>في JavaScript تُستدعى دالةُ <code>toString</code> الخاصة بالكائن كلَّما أُرغِط (coerced) ذلك الكائن في نصّ. فإذا كان <code>g</code> رسمًا بيانيًا، فإن <code>g+''</code> سيكون سلسلةَ JSON المُسلسَلة للرسم البياني.</p>
<p>دالةُ <code>fromString</code> ليست جزءًا من مواصفة اللغة، لكن وجودُها مفيد.</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">fromString</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>) {             <span class="hljs-comment">// another graph constructor</span>
  <span class="hljs-keyword">var</span> obj = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(str)                     <span class="hljs-comment">// this can throw</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">graph</span>(obj.<span class="hljs-property">V</span>, obj.<span class="hljs-property">E</span>)
}
</code></pre>
<p>الآن سنستعملهما في دوالّ الاستمرارية لدينا. أمّا دالةُ <code>toString</code> فتختفي—أتراها؟</p>
<pre><code class="language-javascript"><span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">persist</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">graph, name</span>) {
  name = name || <span class="hljs-string">&#x27;graph&#x27;</span>
  <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;DAGOBA::&#x27;</span>+name, graph)
}

<span class="hljs-title class_">Dagoba</span>.<span class="hljs-property">depersist</span> = <span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) {
  name = <span class="hljs-string">&#x27;DAGOBA::&#x27;</span> + (name || <span class="hljs-string">&#x27;graph&#x27;</span>)
  <span class="hljs-keyword">var</span> flatgraph = <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(name)
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Dagoba</span>.<span class="hljs-title function_">fromString</span>(flatgraph)
}
</code></pre>
<p>نُسند اسمًا مستعارًا إلى الاسم لتفادي تلويث خصائص نطاق <code>localStorage</code>، لأن المساحة هناك يمكن أن تمتلئ حقًّا. وعادةً ما يكون هناك حدٌّ منخفض للتخزين، فمع الرسوم البيانية الأكبر ربما نرغب في استعمال Blobٍ من نوعٍ ما.</p>
<p>وهناك أيضًا مشكلاتٌ محتملة إذا كانت عدّةُ نوافذ متصفّحٍ من النطاق نفسه تُجري عمليات حفظٍ وإلغاء حفظٍ في الوقت نفسه. فمساحةُ <code>localStorage</code> مشتركةٌ بين تلك النوافذ، وقد تكون على حلقاتِ أحداثٍ مختلفة، فثمة احتمالٌ أن يُطمس أحدُها عملَ الآخر إهمالًا. ويقول المواصفة ينبغي أن يكون هناك كائنُ حِصانة (mutex) مطلوبٌ للوصول للقراءة/الكتابة في <code>localStorage</code>، لكن تنفيذَه غيرُ متّسقٍ بين المتصفّحات المختلفة، وحتى معه قد يظلّ تنفيذٌ بسيطٌ مثل تنفيذنا عرضةً للمشكلات.</p>
<p>وإذا أردنا أن يكون تنفيذُ الاستمرارية لدينا واعيًا بتزامن عدّة النوافذ، فبإمكاننا الاستفادةُ من أحداث التخزين (storage events) التي تُطلق عند تغيّر <code>localStorage</code> لتحديث رسمنا البياني المحلي تبعًا لذلك.</p>
<h2 id="التحديثات">التحديثات</h2>
<p>ينسخ نوعُ الأنبوب <code>out</code> الحوافَّ الخارجةَ للرأس ويُسقط واحدةً منها كلّما احتاج إلى واحدة. وبناءُ بنية البيانات الجديدة تلك يكلّف وقتًا ومساحة، ويحمّل عملًا أكبر على مدير الذاكرة. كان بإمكاننا أن نستعمل قائمةَ الحوافّ الخارجة للرأس مباشرةً، مع تتبّع موضعنا بمتغيّرِ عدّاد. هل يمكنك أن تتخيّر مشكلةً في هذا المقاربة؟</p>
<p>إن حذف أحدهم حافةً زرناها بينما نحن في منتصف استعلام، لتغيّر حجمُ قائمة حوافّنا، فنتخطّى حافةً لأن عدّادَنا سيصبح في غير موضعه. ولحلّ ذلك يمكننا قفلَ (lock) الرؤوس المشتركة في استعلامنا، لكننا عندئذٍ نخسر إمّا قدرتَنا على تحديث الرسم البياني بانتظام، وإمّا القدرةَ على امتلاك كائنات استعلامٍ طويلة العمر تستجيب لطلبات نتائجَ إضافية عند الطلب. فرغم أننا في حلقة أحداثٍ أحادية الخيط، يمكن لطلباتنا أن تمتدّ عبر عدّةِ دخولاتٍ غير متزامنة، ما يعني أن مخاوفَ التزامن من هذا النوع مشكلةٌ حقيقيةٌ جدًّا.</p>
<p>فسندفع ثمنَ الأداء لننسخ قائمة الحوافّ. لكن تظلّ هناك مشكلة، إذ قد لا ترى الاستعلاماتُ طويلةُ العمر تسلسلًا زمنيًا متّسقًا تمامًا. سنتجاوز كل حافةٍ تخصّ رأسًا لحظة زيارته، لكننا نزور الرؤوس عند أوقاتٍ مختلفةٍ من الساعة أثناء استعلامنا. فلنفترض أننا حفظنا استعلامًا مثل <code>var q = g.v('Odin').children().children().take(2)</code> ثم استدعينا <code>q.run()</code> لجمع حفيدين من أحفاد Odin. وبعد وقتٍ نحتاج فيه إلى سحب حفيدين آخرين، فنستدعي <code>q.run()</code> مرّةً أخرى. فإذا كان Odin قد أنجب حفيدًا جديدًا في الفترة بين ذلك، فقد نراه أو لا نراه، بحسب ما إذا كان رأسُ الوالدين قد زُر في المرة الأولى التي شغّلنا فيها الاستعلام.</p>
<p>إحدى طرق إصلاح هذا عدم الحتمية هي تغييرُ معالِجات التحديث لتضيف إصدارات (versions) إلى البيانات. سنغيّر بعدها حلقة التشغيل لتُمرِّر الإصدارَ الحالي للرسم البياني إلى الاستعلام، حتّى نرى دائمًا منظرًا متّسقًا للعالم كما كان وقت تهيئة الاستعلام لأول مرّة. وإضافةُ إصداراتٍ إلى قاعدة بياناتنا تفتح الباب أيضًا أمام المعاملات (transactions) الحقيقية، والتراجع/الإعادة الآلية بأسلوبٍ يشبه STM.</p>
<h2 id="اتجاهات-مستقبلية">اتجاهات مستقبلية</h2>
<p>رأينا طريقةً واحدةً لجمع الأسلاف:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;parent&#x27;</span>)
           .<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;grandparent&#x27;</span>)
           .<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;great-grandparent&#x27;</span>)
           .<span class="hljs-title function_">merge</span>([<span class="hljs-string">&#x27;parent&#x27;</span>, <span class="hljs-string">&#x27;grandparent&#x27;</span>, <span class="hljs-string">&#x27;great-grandparent&#x27;</span>])
           .<span class="hljs-title function_">run</span>()
</code></pre>
<p>هذا مرهقٌ نوعًا ما، ولا يتوسّع جيّدًا—فماذا لو أردنا ستَّ طبقاتٍ من الأسلاف؟ أو أردنا النظر عبر عددٍ اعتباطيٍّ من الأسلاف حتى نجد ما نريد؟</p>
<p>كان أجمل لو استطعنا أن نقول شيئًا كهذا بدلًا من ذلك:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">all</span>().<span class="hljs-title function_">times</span>(<span class="hljs-number">3</span>).<span class="hljs-title function_">run</span>()
</code></pre>
<p>ما نودّ استخراجه من هذا هو شيءٌ مثل الاستعلام أعلاه—ربما:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;a&#x27;</span>)
           .<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;b&#x27;</span>)
           .<span class="hljs-title function_">out</span>().<span class="hljs-title function_">as</span>(<span class="hljs-string">&#x27;c&#x27;</span>)
           .<span class="hljs-title function_">merge</span>([<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-string">&#x27;c&#x27;</span>])
           .<span class="hljs-title function_">run</span>()<span class="hljs-string">\`
</span></code></pre>
<p>بعد أن تكون محوّلاتُ الاستعلام قد عملت جميعًا. يمكننا تشغيلَ محوِّل <code>times</code> أولًا لينتج:</p>
<pre><code class="language-javascript">    g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Thor&#x27;</span>).<span class="hljs-title function_">out</span>().<span class="hljs-title function_">all</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">all</span>().<span class="hljs-title function_">out</span>().<span class="hljs-title function_">all</span>().<span class="hljs-title function_">run</span>()
</code></pre>
<p>ثم نشغّل محوِّل <code>all</code> ونجعله يحوّل كل <code>all</code> إلى <code>as</code> موسومٍ بتمييزٍ فريد، ويضع <code>merge</code> بعد آخر <code>as</code>.</p>
<p>لكن هناك بضع مشكلات في ذلك. فأوّلًا، لا تعمل تقنيةُ <code>as</code>/<code>merge</code> هذه إلّا إذا كان كلُّ مسارٍ موجودًا في الرسم البياني: فإذا كان ينقصنا مُدخلٌ لأحد أجداد أجداد ثور، فسنتخطّى مُدخلاتٍ صحيحة. وثانيًا، ماذا يحدث إن أردنا فعلَ هذا لجزءٍ من استعلامٍ فقط لا للاستعلام كله؟ وماذا إن كانت هناك عدّةُ <code>all</code>؟</p>
<p>ولحلّ المشكلة الأولى سنضطر إلى معاملة <code>all</code> بوصفه شيئًا أكثر من مجرّد as/merge. فنحتاج أن يتخطّى كل شرشورٍ أبٍ فعلًا الخطواتَ الواقعة بينهما. يمكننا أن نتخيّل هذا نوعًا من الانتقال الفوريّ (teleportation)—قفزًا من جزءٍ من خط الأنابيب إلى جزءٍ آخر مباشرة—أو أن نتخيّله خطَّ أنابيبٍ متفرّعًا من نوعٍ ما، لكن في كلتا الحالتين يُعقّد ذلك نموذجَنا بعض الشيء. ومنهجٌ آخر أن نتخيّل الشرشورَ يمرّ عبر الأنابيب الواقعة بينهما في حالٍ من التعليق المُجمَّد حتى يستيقظه أنبوبٌ خاص. غير أن تحديدَ نطاق أنابيب التعليق وإلغائه قد يكون عسيرًا.</p>
<p>والمشكلتان التاليتان أسهل. لتعديل جزءٍ من استعلامٍ فقط سنغلّف ذلك الجزء بخطوتي بدايةٍ ونهايةٍ خاصّتين، مثل <code>g.v('Thor').out().start().in().out().end().times(4).run()</code>. وفي الواقع، إن كان المفسِّر يعرف أنواعَ الأنابيب هذه الخاصة، فلن نحتاج إلى خطوة النهاية، لأن نهاية أي تسلسلٍ هي دائمًا نوعُ أنبوبٍ خاص. وسنسمي أنواعَ الأنابيب هذه «ظروفًا» (adverbs)، لأنها تعدّل أنواعَ الأنابيب العادية كما تعدّل الظروفُ الأفعال.</p>
<p>وللتعامل مع عدّة <code>all</code> نحتاج إلى تشغيل كل محوّلات <code>all</code> مرّتين: مرّةً قبل <code>times</code> لوسم كل <code>all</code> بتمييزٍ فريد، ومرّةً أخرى بعد <code>times</code> لإعادة وسم كل <code>all</code> موسومٍ بتمييزٍ فريد.</p>
<p>وتظلّ هناك مسألةُ البحث عبر عددٍ غير محدودٍ من الأسلاف—فمثلًا، كيف نعرف أيّ أبناء يميّر موعودون بالنجاة من راغناروك؟ يمكننا أن نصنع استعلاماتٍ فرديةً مثل <code>g.v('Ymir').in().filter({survives: true})</code> و <latex>\\newline</latex> <code>g.v('Ymir').in().in().in().in().filter({survives: true})</code>، ونجمع النتائج بأنفسنا يدويًّا، لكن هذا فظيعٌ نوعًا ما.</p>
<p>نودّ استعمالَ ظرفٍ كهذا:</p>
<pre><code class="language-javascript">g.<span class="hljs-title function_">v</span>(<span class="hljs-string">&#x27;Ymir&#x27;</span>).<span class="hljs-title function_">in</span>().<span class="hljs-title function_">filter</span>({<span class="hljs-attr">survives</span>: <span class="hljs-literal">true</span>}).<span class="hljs-title function_">every</span>()
</code></pre>
<p>وهو يعمل كما تعمل <code>all</code>+<code>times</code> لكن دون فرض حدٍّ. غير أننا قد نرغب في فرض استراتيجيةٍ بعينها على اجتياز الرسم البياني، مثل بحثٍ عريضٍ (BFS) متثابر أو بحثٍ عميق «يلوغو» (YOLO DFS)، فـ <latex>\\newline</latex> <code>g.v('Ymir').in().filter({survives: true}).bfs()</code> سيكون أكثر مرونة. وصياغتُنا الأمر على هذا النحو تتيح لنا أن نُصوغ استعلاماتٍ معقّدةٌ مثل «تحقّق من ناجيي راغناروك، مع تخطّي كل جيلٍ بالتناوب» صياغةً مباشرة: <code>g.v('Ymir').in().filter({survives: true}).in().bfs()</code>.</p>
<h2 id="الخاتمة">الخاتمة</h2>
<p>فماذا تعلّمنا؟ قواعدُ البيانات الرسومية عظيمةٌ لتخزين بياناتٍ مترابطة[^sortainterconnected] تخطّط للاستعلام عنها عبر اجتيازاتٍ في الرسم البياني. وإضافةُ الدلالات غير الصارمة تتيح واجهةً سلسةً فوق استعلاماتٍ ما كنت لتستطيع التعبيرَ عنها أبدًا في نظامٍ مستعجلٍ لأسبابٍ متعلّقة بالأداء، وتتيح لك أيضًا عبورَ الحدود غير المتزامنة. والزمنُ يعقّد الأمور، والزمنُ من منظوراتٍ متعددة (أي التزامن) يعقّد الأمور كثيرًا، لذا كلما استطعنا تفاديَ إدخال تبعيةٍ زمنية (مثل الحالة، أو الآثار المحسوسة، أو ما شابه) جعلنا التفكيرَ في نظامنا أسهل. والبناءُ بأسلوبٍ بسيطٍ مفكوكٍ وغير مُحسَّنٍ إطلاقًا يترك البابَ مفتوحًا أمام تحسيناتٍ شاملةٍ لاحقًا، واستعمالُ حلقة تشغيلٍ يتيح تحسيناتٍ متعامدة—كلٌّ منها دون أن يُدخل هشاشةَ التعقيد التي هي السمةُ المميِّزة لمعظم تقنيات التحسين.</p>
<p>ولا يمكن المبالغةُ في تأكيد هذه النقطة الأخيرة: أبقِ الأمرَ بسيطًا. وتجنّب التحسينَ مقابل البساطة. واعمل بجدّ لتحقيق البساطة عبر إيجاد النموذج الصحيح. واستكشف إمكاناتٍ كثيرة. وفصولُ هذا الكتاب تقدّم أدلّةً وافرةً على أن التطبيقات شديدةَ التعقيد يمكن أن تكون لها نواةٌ صغيرةٌ محكمة (kernel). فبمجرد أن تجد تلك النواة للتطبيق الذي تبنيه، قاوم كي لا يلوّث التعقيدُ نواتَه. وابنِ خطّافاتٍ (hooks) لإلحاق وظائفَ إضافية، وحافظ على حواجز التجريد بأيّ ثمن. وإن إتقانُ هذه التقنيات ليس سهلًا، لكنه يمكن أن يمنحك المناورةَ على مشكلاتٍ كانت تستعصي لولاها.</p>
<p>[^sortainterconnected]: لكن ليس مترابطًا <em>إلى هذا الحدّ</em>—فأنت تودّ أن ينمو عددُ الحوافّ طرديًّا مع عدد الرؤوس. بمعنى آخر، ينبغي ألّا يتغيّر متوسطُ عدد الحوافّ الموصولة برأسٍ مع حجم الرسم البياني. ومعظمُ الأنظمة التي نفكّر في وضعها في قاعدة بياناتٍ رسومية تملك هذه الخاصية بالفعل: فإذا كان لدى Loki مئةَ ألف حفيدٍ إضافيٍّ فلن يزداد درجةُ رأس Thor.</p>
<h3 id="شكر-وتقدير">شكر وتقدير</h3>
<p>نُقدّر جزيلَ الشكر إلى Amy Brown، وMichael DiBernardo، وColin Lupton، وScott Rostrup، وMichael Russo، وErin Toliver، وLeo Zovic، على مساهماتهم القيّمة في هذا الفصل.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,p as slug,l as title};
