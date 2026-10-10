const s="sicp",a="c5-computing-with-register-machines",n="الحوسبة بآلات المسجّلات",e="index",l="الاحتساب بآلات المسجّلات",p=[{depth:3,id:"51-تصميم-آلات-المسجلات",text:"5.1 تصميم آلات المسجّلات"},{depth:3,id:"52-محاكي-آلة-مسجلات",text:"5.2 محاكي آلة مسجّلات"},{depth:3,id:"53-تخصيص-التخزين-وجمع-القمامة",text:"5.3 تخصيص التخزين وجمع القمامة"},{depth:3,id:"54-المقيم-ذو-التحكم-الصريح",text:"5.4 المقيّم ذو التحكّم الصريح"},{depth:3,id:"55-التصريف",text:"5.5 التصريف"}],c=`<blockquote>
<p>هدفي أن أبيّن أنّ الآلة السماويّة ليست نوعًا من الكائن الإلهيّ الحيّ، بل نوعٌ من عمل الساعة (ومن يظنّ أنّ للساعة روحًا ينسب مجدَ صانعها إلى العمل)، إذ إن جميع الحركات المتعدّدة الأوجه - أو جميعها تقريبًا - ناجمةٌ عن قوّةٍ مادّيّةٍ في غاية البساطة، تمامًا كما أنّ جميع حركات الساعة ناجمةٌ عن ثقلٍ واحد. —يوهانس كيبلر (رسالة إلى هيروارت فون هوهنبورغ، 1605)</p>
</blockquote>
<p>بدأنا هذا الكتاب بدراسة العمليّات وبوصفها من حيث إجراءاتٍ مكتوبةٍ بلغة Lisp. ولشرح معاني هذه الإجراءات، استخدمنا سلسلةً من نماذج التقييم: نموذج الاستبدال الوارد في <a href="https://sarabander.github.io/sicp/html/Chapter-1.xhtml#Chapter-1">الفصل 1</a>، ونموذج البيئة الوارد في <a href="https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3">الفصل 3</a>، والمُقيّم التعاكسيّ الوارد في <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a>. لقد أزاح فحصنا للمُقيّم التعاكسيّ - على وجه الخصوص - كثيرًا من غموض كيفيّة تفسير اللغات الشبيهة بـLisp. لكن حتّى المُقيّم التعاكسيّ يترك أسئلةً مهمّةً بلا جواب، إذ إنه لا يزيح الستر عن آليّات التحكّم في نظام Lisp. فإنّ المُقيّم لا يشرح - مثلًا - كيف ينجح تقييم تعبيرٍ جزئيّ في إعادة قيمةٍ إلى التعبير الذي يستخدم هذه القيمة، كما لا يشرح كيف تُنتج بعض الإجراءات التعاوديّة عمليّاتٍ تكراريّة (أي إنها مُقيَّمةٌ باستخدام فضاءٍ ثابت) بينما تُنتج إجراءاتٌ تعاوديّةٌ أخرى عمليّاتٍ تعاوديّة. وهذه الأسئلة تبقى بلا جواب لأنّ المُقيّم التعاكسيّ هو في ذاته برنامج Lisp، ومن ثمّ فهو يرث بنية التحكّم في نظام Lisp الكامن. ولكي نوفّر وصفًا أكثر اكتمالًا لبنية التحكّم في مُقيّم Lisp، يتحتّم علينا العمل على مستوى أكثر أوّليّةً من Lisp نفسها.</p>
<p>سنصف في هذا الفصل العمليّات من حيث تشغيل حاسوبٍ تقليديّ خطوةً بخطوة. وحاسوبٌ كهذا، أو <em>آلة مسجّلات (register machine)</em>، ينفّذ تتابعيًّا <em>تعليمات (instructions)</em> تتلاعب بمحتويات مجموعةٍ ثابتةٍ من عناصر التخزين تُسمّى <em>مسجّلات (registers)</em>. فإنّ تعليمةً نموذجيّةً لآلة المسجّلات لتطبّق عمليّةً أوّليّةً على محتويات بعض المسجّلات وتُحيل النتيجة إلى مسجّلٍ آخر. وأوصافنا للعمليّات التي تنفّذها آلات المسجّلات ستبدو شديدة الشبه ببرامج «اللغة الآليّة» للحواسيب التقليديّة. غير أنّنا، بدلًا من التركيز على اللغة الآليّة لأيّ حاسوبٍ معيّن، سنفحص عدّة إجراءات Lisp ونُصمّم آلة مسجّلاتٍ خاصّةً لتنفيذ كلّ إجراءٍ منها. وبذلك، سنقترب من مهمّتنا من منظور مهندس عتادٍ لا من منظور مبرمجٍ بلغة آليّةٍ لحاسوب. وبتصميمنا آلات المسجّلات، سنطوّر آليّاتٍ لتنفيذ بنيات برمجةٍ مهمّةٍ كالتعاوب. وسنُقدّم أيضًا لغةً لوصف تصاميم آلات المسجّلات. وفي <a href="https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2">5.2</a> سنُنفّذ برنامج Lisp يستخدم هذه الأوصاف لمحاكاة الآلات التي نصمّمها.</p>
<p>معظم العمليّات الأوّليّة لآلات المسجّلات لدينا بسيطةٌ للغاية. فإنّ عمليّةً ما قد تجمع الأعداد المقروءة من مسجّلين، وتُنتج نتيجةً تُخزَّن في مسجّلٍ ثالث. ومثل هذه العمليّة يمكن أداؤها بعتادٍ سهل الوصف. غير أنّنا، لكي نتعامل مع بنية القوائم، سنستخدم أيضًا عمليّات الذاكرة <code>car</code> و<code>cdr</code> و<code>cons</code>، التي تتطلّب آليّةً بالغة التعقيد لتخصيص التخزين. ونحن ندرس في <a href="https://sarabander.github.io/sicp/html/5_002e3.xhtml#g_t5_002e3">5.3</a> تنفيذها من حيث عمليّاتٍ أكثر أوّليّةً.</p>
<p>وفي <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4">5.4</a>، بعد أن نكون قد راكمنا خبرةً في صياغة الإجراءات البسيطة كآلات مسجّلات، سنُصمّم آلةً تُنجز الخوارزميّة التي وصفها المُقيّم التعاكسيّ الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1">4.1</a>. وسدُّ هذه الفجوة في فهمنا لكيفيّة تفسير تعابير Scheme سيتمّ بتوفير نموذجٍ صريحٍ لآليّات التحكّم في المُقيّم. وسندرس في <a href="https://sarabander.github.io/sicp/html/5_002e5.xhtml#g_t5_002e5">5.5</a> مصرِّفًا بسيطًا يترجم برامج Scheme إلى تتابعاتٍ من التعليمات التي يمكن تنفيذها مباشرةً بمسجّلات آلة المُقيّم وعمليّاتها.</p>
<h3 id="51-تصميم-آلات-المسجلات">5.1 تصميم آلات المسجّلات</h3>
<p>لتصميم آلة مسجّلات، يتحتّم أن نُصمّم <em>مسارات بياناتها (data paths)</em> (أي مسجّلاتها وعمليّاتها) و<em>متحكّمها (controller)</em> الذي يرتّب هذه العمليّات. ولتوضيح تصميم آلة مسجّلاتٍ بسيطة، دعنا نفحص خوارزميّة إقليد، التي تُستخدم لاحتساب القاسم المشترك الأكبر لعددين صحيحين. فكما رأينا في <a href="https://sarabander.github.io/sicp/html/1_002e2.xhtml#g_t1_002e2_002e5">1.2.5</a>، فإنّ خوارزميّة إقليد يمكن أداؤها بعمليّةٍ تكراريّةٍ، كما يحدّده الإجراء التالي:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name"><span class="hljs-built_in">gcd</span></span> a b)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> b <span class="hljs-number">0</span>)
      a
      (<span class="hljs-name"><span class="hljs-built_in">gcd</span></span> b (<span class="hljs-name"><span class="hljs-built_in">remainder</span></span> a b))))
</code></pre>
<p>فالآلة التي تُنجز هذه الخوارزميّة يتحتّم عليها تتبّع عددين، <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>b</mi></mrow><annotation encoding="application/x-tex">b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span>، فلْنفترض أنّ هذين العددين مخزَّنان في مسجّلين يحملان هذين الاسمين. والعمليّات الأساس المطلوبة هي اختبار ما إذا كانت محتويات المسجّل <code>b</code> صفرًا، واحتساب باقي قسمة محتويات المسجّل <code>a</code> على محتويات المسجّل <code>b</code>. وعمليّة الباقي عمليّةٌ معقّدة، لكن لنفترض للحظةٍ أنّ لدينا جهازًا أوّليًّا يحتسب البواقي. وفي كلّ دورةٍ من خوارزميّة القاسم المشترك الأكبر، يتحتّم استبدال محتويات المسجّل <code>a</code> بمحتويات المسجّل <code>b</code>، كما يتحتّم استبدال محتويات <code>b</code> بباقي قسمة محتويات <code>a</code> القديمة على محتويات <code>b</code> القديمة. ولَكان الأمر مريحًا لو أُمكن أداء هذين الاستبدالين معًا، لكنّنا في نموذجنا لآلات المسجّلات سنفترض أنّ مسجّلًا واحدًا فقط يمكن أن تُحال إليه قيمةٌ جديدة في كلّ خطوة. ولأداء الاستبدالين، ستستخدم آلتنا مسجّلًا ثالثًا «مؤقّتًا»، نُسمّيه <code>t</code>. (فأوّلًا يُوضَع الباقي في <code>t</code>، ثم تُوضَع محتويات <code>b</code> في <code>a</code>، وأخيرًا يُوضَع الباقي المخزَّن في <code>t</code> في <code>b</code>.)</p>
<p>يمكننا توضيح المسجّلات والعمليّات المطلوبة لهذه الآلة باستخدام مخطّط مسار البيانات الموضّح في <a href="#Figure-5_002e1">الشكل 5.1</a>. وفي هذا المخطّط، تُمثَّل المسجّلات (<code>a</code> و<code>b</code> و<code>t</code>) بمستطيلات. وكلّ طريقٍ لإحلال قيمةٍ في مسجّلٍ يُشار إليه بسهمٍ ذي <code>X</code> خلف رأس السهم، مشيرًا من مصدر البيانات إلى المسجّل. وبوسعنا أن نفكّر في <code>X</code> بوصفه زرًّا، إذ إنّ ضغطه يسمح للقيمة عند المصدر بأن «تتدفّق» إلى المسجّل المعيَّن. والملصق المجاور لكلّ زرّ هو الاسم الذي سنستخدمه للإشارة إلى الزرّ. والأسماء اعتراضيّة، ويمكن اختيارها لتكون ذات قيمة تذكيريّة (فمثلًا، يُشار بـ<code>a&lt;-b</code> إلى ضغط الزرّ الذي يُحيل محتويات المسجّل <code>b</code> إلى المسجّل <code>a</code>). ومصدر البيانات لمسجّلٍ ما قد يكون مسجّلًا آخر (كما في الإحلال <code>a&lt;-b</code>)، أو نتيجة عمليّة (كما في الإحلال <code>t&lt;-r</code>)، أو ثابتًا (أي قيمةٌ مدمجةٌ لا يمكن تغييرها، وتُمثَّل في مخطّط مسار البيانات بمثلّثٍ يحتوي الثابت).</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-0-Fig5.1a.std.webp" alt=""></p>
<p><strong>الشكل 5.1:</strong> مسارات البيانات لآلة القاسم المشترك الأكبر.</p>
<p>العمليّة التي تحتسب قيمةً من الثوابت ومحتويات المسجّلات تُمثَّل في مخطّط مسار البيانات بشبه منحرفٍ يحتوي اسم العمليّة. فمثلًا، يُمثّل الصندوق الموسوم بـ<code>rem</code> في <a href="#Figure-5_002e1">الشكل 5.1</a> عمليّةً تحتسب باقي قسمة محتويات المسجّلين <code>a</code> و<code>b</code> المرفَقين به. والأسهم (بلا أزرار) تتّجه من مسجّلات المداخل والثوابت إلى الصندوق، والأسهم تصل قيمة مخرج العمليّة بالمسجّلات. والاختبار يُمثَّل بدائرةٍ تحتوي اسم الاختبار. فمثلًا، تحتوي آلة القاسم المشترك الأكبر لدينا على عمليّةٍ تختبر ما إذا كانت محتويات المسجّل <code>b</code> صفرًا. وللاختبار أسهمٌ أيضًا من مسجّلات مداخله وثوابته، لكنّه لا يملك أسهم مخرجات؛ فقيمته يستخدمها المتحكّم لا مسارات البيانات. وبصورةٍ عامّة، يُظهر مخطّط مسار البيانات المسجّلات والعمليّات المطلوبة للآلة وكيف يتحتّم وصلها. فإذا نظرنا إلى الأسهم بوصفها أسلاكًا وإلى أزرار <code>X</code> بوصفها مفاتيح، فإنّ مخطّط مسار البيانات يشبه إلى حدٍّ بعيدٍ مخطّط الأسلاك لآلةٍ يمكن بناؤها من مكوّنات كهربائيّة.</p>
<p>ولكي تحتسب مسارات البيانات القواسم المشتركة الكبرى فعلًا، يتحتّم ضغط الأزرار في التتابع الصحيح. وسنصف هذا التتابع من حيث مخطّط متحكّم، كما هو موضّح في <a href="#Figure-5_002e2">الشكل 5.2</a>. وتُبيّن عناصر مخطّط المتحكّم كيف ينبغي تشغيل مكوّنات مسار البيانات. فالصناديق المستطيلة في مخطّط المتحكّم تُحدّد أزرار مسار البيانات التي يتحتّم ضغطها، والأسهم تصف التتابع من خطوةٍ إلى التي تليها. والمعيّن في المخطّط يُمثّل قرارًا. وسيتبع أحد سهمي التتابع، بحسب قيمة اختبار مسار البيانات المحدَّد في المعيّن. وبوسعنا تفسير المتحكّم بالاستعانة بمجادلةٍ فيزيائيّة: فتخيّل المخطّط متاهةً تتدحرج فيها كرة رخاميّة. فحين تتدحرج الكرة إلى صندوقٍ ما، تضغط زرّ مسار البيانات الذي يسمّيه الصندوق. وحين تتدحرج الكرة إلى عقدة قرار (كالاختبار الخاصّ بـ<code>b</code> = 0)، فإنّها تترك العقدة على المسار الذي تحدّده نتيجة الاختبار المُشار إليه. ومجتمعةً، تصف مسارات البيانات والمتحكّم وصفًا كاملًا آلةً لاحتساب القواسم المشتركة الكبرى. ونبدأ المتحكّم (كرة الرخام المتدحرجة) من الموضع الموسوم بـ<code>start</code>، بعد وضع الأعداد في المسجّلين <code>a</code> و<code>b</code>. وحين يصل المتحكّم إلى <code>done</code>، سنجد قيمة القاسم المشترك الأكبر في المسجّل <code>a</code>.</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-1-Fig5.2.std.webp" alt=""></p>
<p><strong>الشكل 5.2:</strong> متحكّم آلة القاسم المشترك الأكبر.</p>
<p><strong>التمرين 5.1:</strong> صمّم آلة مسجّلاتٍ لاحتساب العامليّات باستخدام الخوارزميّة التكراريّة التي يحدّدها الإجراء التالي. وارسم مخطّطات مسار البيانات والمتحكّم لهذه الآلة.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">factorial</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">iter</span> product counter)
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">&gt;</span></span> counter n)
        product
        (<span class="hljs-name">iter</span> (<span class="hljs-name"><span class="hljs-built_in">*</span></span> counter product)
              (<span class="hljs-name"><span class="hljs-built_in">+</span></span> counter <span class="hljs-number">1</span>))))
  (<span class="hljs-name">iter</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span>))
</code></pre>
<h4>5.1.1 لغةٌ لوصف آلات المسجّلات</h4>
<p>مخطّطات مسار البيانات والمتحكّم كافيةٌ لتمثيل الآلات البسيطة كآلة القاسم المشترك الأكبر، لكنّها عسيرة التناول لوصف الآلات الكبيرة كمفسّر Lisp. ولكي يصبح ممكنًا التعامل مع الآلات المعقّدة، سنُنشئ لغةً تعرض، في صيغةٍ نصّيّة، جميع المعلومات التي تُعطيها مخطّطات مسار البيانات والمتحكّم. وسنبدأ بترميزٍ يعكس المخطّطات عكسًا مباشرًا.</p>
<p>نُعرّف مسارات بيانات آلةٍ بوصف مسجّلاتها وعمليّاتها. ولوصف مسجّلٍ، نُعطيه اسمًا ونُحدّد الأزرار التي تتحكّم في الإحلال إليه. ونُعطي كلًّا من هذه الأزرار اسمًا ونُحدّد مصدر البيانات التي تدخل المسجّل تحت تحكّم الزرّ. (والمصدر هو مسجّلٌ أو ثابتٌ أو عمليّة.) ولوصف عمليّةٍ، نُعطيها اسمًا ونُحدّد مداخلها (مسجّلات أو ثوابت).</p>
<p>نُعرّف متحكّم آلةٍ بوصفه تتابعًا من <em>التعليمات (instructions)</em> مع <em>ملصقات (labels)</em> تُحدّد <em>نقاط الدخول (entry points)</em> في التتابع. والتعليمة هي إحدى ما يلي:</p>
<ul>
<li>اسم زرّ مسار بياناتٍ يتحتّم ضغطه لإحلال قيمةٍ إلى مسجّل. (وهذا يقابل صندوقًا في مخطّط المتحكّم.)</li>
<li>تعليمة <code>test</code>، تُؤدّي اختبارًا محدَّدًا.</li>
<li>تفرّعٌ شرطيّ (تعليمة <code>branch</code>) إلى موضعٍ يُشار إليه بملصق متحكّم، بناءً على نتيجة الاختبار السابق. (والاختبار والتفرّع معًا يقابلان معيّنًا في مخطّط المتحكّم.) فإن كان الاختبار خاطئًا، فعلى المتحكّم أن يواصل التعليمة التالية في التتابع. وإلّا، فعلى المتحكّم أن يواصل التعليمة التي تلي الملصق.</li>
<li>تفرّعٌ غير شرطيّ (تعليمة <code>goto</code>) يُسمّي ملصق متحكّمٍ يتحتّم مواصلة التنفيذ عنده.</li>
</ul>
<p>تبدأ الآلة من بداية تتابع تعليمات المتحكّم وتتوقّف حين يصل التنفيذ إلى نهاية التتابع. وإلّا حين يُغيّر تفرّعٌ مجرى التحكّم، فإنّ التعليمات تُنفَّذ بالترتيب الذي ذُكرت به.</p>
<p>يُظهر <a href="#Figure-5_002e3">الشكل 5.3</a> آلة القاسم المشترك الأكبر موصوفةً بهذه الطريقة. وهذا المثال لا يُلمّح إلّا إلماحًا إلى عموميّة هذه الأوصاف، إذ إنّ آلة القاسم المشترك الأكبر حالةٌ بسيطةٌ جدًّا: فلكلّ مسجّلٍ زرٌّ واحدٌ فقط، ولكلّ زرٍّ واختبارٍ استخدامٌ واحدٌ فقط في المتحكّم.</p>
<p><strong>الشكل 5.3:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> توصيف آلة القاسم المشترك الأكبر.</p>
<pre><code class="language-scheme">(<span class="hljs-name">data-paths</span>
 (<span class="hljs-name">registers</span>
  ((<span class="hljs-name">name</span> a)
   (<span class="hljs-name">buttons</span> ((<span class="hljs-name">name</span> a&lt;-b) 
             (<span class="hljs-name">source</span> (<span class="hljs-name">register</span> b)))))
  ((<span class="hljs-name">name</span> b)
   (<span class="hljs-name">buttons</span> ((<span class="hljs-name">name</span> b&lt;-t)
             (<span class="hljs-name">source</span> (<span class="hljs-name">register</span> t)))))
  ((<span class="hljs-name">name</span> t)
   (<span class="hljs-name">buttons</span> ((<span class="hljs-name">name</span> t&lt;-r)
             (<span class="hljs-name">source</span> (<span class="hljs-name">operation</span> rem))))))
 (<span class="hljs-name">operations</span>
  ((<span class="hljs-name">name</span> rem)
   (<span class="hljs-name">inputs</span> (<span class="hljs-name">register</span> a) (<span class="hljs-name">register</span> b)))
  ((<span class="hljs-name">name</span> =)
   (<span class="hljs-name">inputs</span> (<span class="hljs-name">register</span> b) (<span class="hljs-name">constant</span> <span class="hljs-number">0</span>)))))

(<span class="hljs-name">controller</span>
 test-b                <span class="hljs-comment">; label</span>
   (<span class="hljs-name">test</span> =)            <span class="hljs-comment">; test</span>
   (<span class="hljs-name">branch</span> 
    (<span class="hljs-name">label</span> gcd-done))  <span class="hljs-comment">; conditional branch</span>
   (<span class="hljs-name">t&lt;-r</span>)              <span class="hljs-comment">; button push</span>
   (<span class="hljs-name">a&lt;-b</span>)              <span class="hljs-comment">; button push</span>
   (<span class="hljs-name">b&lt;-t</span>)              <span class="hljs-comment">; button push</span>
   (<span class="hljs-name">goto</span> 
    (<span class="hljs-name">label</span> test-b))    <span class="hljs-comment">; unconditional branch</span>
 gcd-done)             <span class="hljs-comment">; label</span>
</code></pre>
<p>للأسف، من العسر قراءة وصفٍ كهذا. ولكي نفهم تعليمات المتحكّم، يتحتّم علينا أن نرجع باستمرارٍ إلى تعاريف أسماء الأزرار وأسماء العمليّات، ولكي نفهم ما تفعله الأزرار قد يلزمنا الرجوع إلى تعاريف أسماء العمليّات. وبالتالي، سنُحوّل ترميزنا ليجمع المعلومات من وصفَي مسار البيانات والمتحكّم بحيث نراها جميعها معًا.</p>
<p>وللحصول على هذه الصيغة من الوصف، سنستبدل أسماء الأزرار والعمليّات الاعتراضيّة بتعريفات سلوكها. أي إنّه، بدلًا من القول (في المتحكّم) «اضغط الزرّ tGCD machine is described as follows:</p>
<pre><code class="language-scheme">(<span class="hljs-name">controller</span>
 test-b
   (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> b) (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
   (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> gcd-done))
   (<span class="hljs-name">assign</span> t (<span class="hljs-name">op</span> rem) (<span class="hljs-name">reg</span> a) (<span class="hljs-name">reg</span> b))
   (<span class="hljs-name">assign</span> a (<span class="hljs-name">reg</span> b))
   (<span class="hljs-name">assign</span> b (<span class="hljs-name">reg</span> t))
   (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> test-b))
 gcd-done)
</code></pre>
<p>هذه الصيغة من الوصف أيسرُ قراءةً من الصيغة الموضّحة في <a href="#Figure-5_002e3">الشكل 5.3</a>، لكنّها تحمل أيضًا عيوبًا:</p>
<ul>
<li>إنّها أكثر إطنابًا في الآلات الكبيرة، لأنّ الأوصاف الكاملة لعناصر مسار البيانات تُكرَّر كلّما ذُكرت العناصر في تتابع تعليمات المتحكّم. (وهذه ليست مشكلةً في مثال القاسم المشترك الأكبر، لأنّ كلّ عمليّةٍ وزرٍّ تُستخدم مرّةً واحدةً فقط.) فضلًا عن ذلك، فإنّ تكرار أوصاف مسار البيانات يحجب بنية مسار البيانات الفعليّة للآلة؛ فليس من الواضح في آلةٍ كبيرةٍ كم عدد المسجّلات والعمليّات والأزرار وكيف تترابط.</li>
<li>ولأنّ تعليمات المتحكّم في تعريف آلةٍ تبدو كتعبيرات Lisp، فمن السهل نسيان أنّها ليست تعابير Lisp اعتراضيّة. فإنّها لا تستطيع أن ترمّز إلّا عمليّات آلةٍ مشروعة. فإنّ العمليّات - مثلًا - لا تستطيع أن تعمل مباشرةً إلّا على الثوابت ومحتويات المسجّلات، لا على نتائج عمليّاتٍ أخرى.</li>
</ul>
<p>رغم هذه العيوب، سنستخدم لغة آلات المسجّلات هذه في جميع أنحاء هذا الفصل، لأنّنا سنكون أكثر اهتمامًا بفهم المتحكّمات من اهتمامنا بفهم العناصر والوصلات في مسارات البيانات. غير أنّنا ينبغي أن نضع في أذهاننا أنّ تصميم مسار البيانات حاسمٌ في تصميم الآلات الحقيقيّة.</p>
<blockquote>
<p><strong>التمرين 5.2:</strong> استخدم لغة آلات المسجّلات لوصف آلة العامليّات التكراريّة الواردة في <a href="#Exercise-5_002e1">التمرين 5.1</a>.</p>
</blockquote>
<h4>الأفعال</h4>
<p>لِنُعدّل آلة القاسم المشترك الأكبر بحيث نستطيع إدخال الأعداد التي نريد قاسمها المشترك الأكبر والحصول على الجواب مطبوعًا على طرفيّتنا. ولن نناقش كيف نصنع آلةً تستطيع القراءة والطباعة، بل سنفترض (كما نفعل حين نستخدم <code>read</code> و<code>display</code> في Scheme) أنّ هاتين العمليّتين متاحتان كعمليّتين أوّليّتين.<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup></p>
<p>فـ<code>Read</code> تشبه العمليّات التي كنا نستخدمها في أنّها تُنتج قيمةً يمكن تخزينها في مسجّل. لكنّ <code>read</code> لا تأخذ مداخلها من أيّ مسجّل؛ فقيمتها تعتمد على شيءٍ يحدث خارج الأجزاء من الآلة التي نصمّمها. وسنسمح لعمليّات آلتنا بأن يكون لها سلوكٌ كهذا، وبذلك سنرسم ونُرمّز استخدام <code>read</code> كما نفعل مع أيّ عمليّةٍ أخرى تحتسب قيمةً.</p>
<p>أمّا <code>Print</code>، من جهةٍ أخرى، فتختلف عن العمليّات التي كنا نستخدمها اختلافًا أساسيًّا: فإنّها لا تُنتج قيمة مخرجةً تُخزَّن في مسجّل. وإن كان لها أثر، فهذا الأثر ليس على جزءٍ من الآلة التي نصمّمها. وسنُشير إلى هذا النوع من العمليّات بوصفه <em>فعلًا (action)</em>. وسنمثّل الفعلَ في مخطّط مسار البيانات تمامًا كما نمثّل عمليّةً تحتسب قيمةً، أي بشكل منحرفٍ يحتوي اسم الفعل. والأسهم تتّجه إلى صندوق الفعل من أيّ مداخلات (مسجّلات أو ثوابت). ونربط أيضًا زرًّا بالفعل. وضغط الزرّ يجعل الفعل يقع. ولكي نجعل متحكّمًا يضغط زرّ فعل، نستخدم نوعًا جديدًا من التعليمات يُسمّى <code>perform</code>. وبذلك، فإنّ فعل طباعة محتويات المسجّل <code>a</code> يُمثَّل في تتابع متحكّمٍ بالتعليمة</p>
<pre><code class="language-scheme">(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> print) (<span class="hljs-name">reg</span> a))
</code></pre>
<p>يُظهر <a href="#Figure-5_002e4">الشكل 5.4</a> مسارات البيانات والمتحكّم لآلة القاسم المشترك الأكبر الجديدة. وبدلًا من أن نجعل الآلة تتوقّف بعد طباعة الجواب، فقد جعلناها تبدأ من جديد، بحيث تقرأ زوجًا من الأعداد مرّةً بعد مرّة، وتحتسب قاسمهما المشترك الأكبر، وتطبع النتيجة. وهذه البنية تشبه حلقات المُشغّل التي استخدمناها في مفسّرات <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a>.</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-2-Fig5.4c.std.webp" alt=""></p>
<p><strong>الشكل 5.4:</strong> آلة قاسمٍ مشترك أكبر تقرأ المداخل وتطبع النتائج.</p>
<h4>5.1.2 التجريد في تصميم الآلات</h4>
<p>سنُعرّف غالبًا آلةً تتضمّن عمليّاتٍ «أوّليّة» هي في الواقع بالغة التعقيد. فإنّا - مثلًا - سنعامل في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4">5.4</a> و<a href="https://sarabander.github.io/sicp/html/5_002e5.xhtml#g_t5_002e5">5.5</a> عمليّات التلاعب ببيئة Scheme بوصفها أوّليّة. ومثل هذا التجريد قيّمٌ لأنّه يسمح لنا بتجاهل تفاصيل أجزاءٍ من آلةٍ حتّى نتمكّن من التركيز على جوانب أخرى من التصميم. غير أنّ كوننا قد كنسنا قدرًا كثيرًا من التعقيد تحت البساط لا يعني أنّ تصميم آلةٍ غير واقعيّ. فنستطيع دائمًا أن نستبدل «الأوّليّات» المعقّدة بعمليّاتٍ أوّليّةٍ أبسط منها.</p>
<p>تأمّل آلة القاسم المشترك الأكبر. ففي الآلة تعليمةٌ تحتسب باقي قسمة محتويات المسجّلين <code>a</code> و<code>b</code> وتحيل النتيجة إلى المسجّل <code>t</code>. فإذا أردنا بناء آلة القاسم المشترك الأكبر دون استخدام عمليّة باقٍ أوّليّة، يتحتّم علينا أن نُحدّد كيف تُحتسب البواقي من حيث عمليّاتٍ أبسط، كالطرح. وفي الواقع، نستطيع كتابة إجراء Scheme يجد البواقي بهذه الطريقة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name"><span class="hljs-built_in">remainder</span></span> n d)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">&lt;</span></span> n d) n (<span class="hljs-name"><span class="hljs-built_in">remainder</span></span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n d) d)))
</code></pre>
<p>وبوسعنا بذلك أن نستبدل عمليّة الباقي في مسارات بيانات آلة القاسم المشترك الأكبر بعمليّة طرحٍ واختبار مقارنة. يُظهر <a href="#Figure-5_002e5">الشكل 5.5</a> مسارات البيانات والمتحكّم للآلة المطوّرة. والتعليمة</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> t (<span class="hljs-name">op</span> rem) (<span class="hljs-name">reg</span> a) (<span class="hljs-name">reg</span> b))
</code></pre>
<p>الواردة في تعريف متحكّم القاسم المشترك الأكبر تُستبدل بتتابعٍ من التعليمات يحتوي حلقة، كما هو موضّح في <a href="#Figure-5_002e6">الشكل 5.6</a>.</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-3-Fig5.5b.std.webp" alt=""></p>
<p><strong>الشكل 5.5:</strong> مسارات البيانات والمتحكّم لآلة القاسم المشترك الأكبر المطوّرة.</p>
<p><strong>الشكل 5.6:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> تتابع تعليمات المتحكّم الخاصّ بآلة القاسم المشترك الأكبر الواردة في <a href="#Figure-5_002e5">الشكل 5.5</a>.</p>
<pre><code class="language-scheme">(<span class="hljs-name">controller</span>
 test-b
   (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> b) (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
   (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> gcd-done))
   (<span class="hljs-name">assign</span> t (<span class="hljs-name">reg</span> a))
 rem-loop
   (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> &lt;) (<span class="hljs-name">reg</span> t) (<span class="hljs-name">reg</span> b))
   (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> rem-done))
   (<span class="hljs-name">assign</span> t (<span class="hljs-name">op</span> -) (<span class="hljs-name">reg</span> t) (<span class="hljs-name">reg</span> b))
   (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> rem-loop))
 rem-done
   (<span class="hljs-name">assign</span> a (<span class="hljs-name">reg</span> b))
   (<span class="hljs-name">assign</span> b (<span class="hljs-name">reg</span> t))
   (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> test-b))
 gcd-done)
</code></pre>
<p><strong>التمرين 5.3:</strong> صمّم آلةً لاحتساب الجذور التربيعيّة باستخدام طريقة نيوتن، كما هي موصوفةٌ في <a href="https://sarabander.github.io/sicp/html/1_002e1.xhtml#Sec_002e1_002e1_002e7">1.1.7</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name"><span class="hljs-built_in">sqrt</span></span> x)
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">good-enough?</span> guess)
    (<span class="hljs-name"><span class="hljs-built_in">&lt;</span></span> (<span class="hljs-name"><span class="hljs-built_in">abs</span></span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> (<span class="hljs-name">square</span> guess) x)) <span class="hljs-number">0.001</span>))
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">improve</span> guess)
    (<span class="hljs-name">average</span> guess (<span class="hljs-name"><span class="hljs-built_in">/</span></span> x guess)))
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">sqrt-iter</span> guess)
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">good-enough?</span> guess)
        guess
        (<span class="hljs-name">sqrt-iter</span> (<span class="hljs-name">improve</span> guess))))
  (<span class="hljs-name">sqrt-iter</span> <span class="hljs-number">1.0</span>))
</code></pre>
<p>ابدأ بافتراض أنّ عمليّتَي <code>good-enough?</code> و<code>improve</code> متاحتان كأوّليّتين. ثم أظهر كيف يُمكن توسيع هاتين من حيث العمليّات الحسابيّة. واصف كلّ نسخةٍ من تصميم آلة <code>sqrt</code> برسم مخطّط مسار بياناتٍ وكتابة تعريف متحكّمٍ بلغة آلات المسجّلات.</p>
<h4>5.1.3 الروتينات الفرعيّة</h4>
<p>عند تصميم آلةٍ تؤدّي احتسابًا ما، كثيرًا ما نُفضّل أن نُرتّب أن تتقاسم أجزاءٌ مختلفةٌ من الاحتساب المكوّنات بدلًا من مضاعفتها. تأمّل آلةً تتضمّن احتسابين للقاسم المشترك الأكبر، أحدهما يجد القاسم المشترك الأكبر لمحتويات المسجّلين <code>a</code> و<code>b</code>، والآخر يجد القاسم المشترك الأكبر لمحتويات المسجّلين <code>c</code> و<code>d</code>. وقد نبدأ بافتراض أنّ لدينا عمليّة <code>gcd</code> أوّليّة، ثم نُوسّع نسختَي <code>gcd</code> من حيث عمليّاتٍ أكثر أوّليّةً. يُظهر <a href="#Figure-5_002e7">الشكل 5.7</a> أجزاء القاسم المشترك الأكبر وحدها من مسارات بيانات الآلة الناتجة، دون أن يُظهر كيف تتّصل ببقيّة الآلة. ويُظهر الشكل أيضًا الأجزاء المقابلة من تتابع متحكّم الآلة.</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-4-Fig5.7b.std.webp" alt=""></p>
<p><strong>الشكل 5.7:</strong> أجزاء من مسارات البيانات وتتابع المتحكّم لآلةٍ ذات احتسابين للقاسم المشترك الأكبر.</p>
<p>لهذه الآلة صندوقا عمليّة باقٍ وصندوقا اختبار تساو. فإن كانت المكوّنات المضاعفة معقّدة، كما هو حال صندوق الباقي، فلن تكون هذه طريقةً اقتصاديّةً لبناء الآلة. ونستطيع تجنّب مضاعفة مكوّنات مسار البيانات باستخدام المكوّنات ذاتها لاحتسابَي القاسم المشترك الأكبر، بشرط ألّا يؤثّر ذلك في بقيّة احتساب الآلة الكبرى. فإذا لم تكن القيم في المسجّلين <code>a</code> و<code>b</code> مطلوبةً بحلول الوقت الذي يصل فيه المتحكّم إلى <code>gcd-2</code> (أو إذا أُمكن نقل هذه القيم إلى مسجّلاتٍ أخرى لحفظها)، فنستطيع تغيير الآلة بحيث تستخدم المسجّلين <code>a</code> و<code>b</code>، بدلًا من المسجّلين <code>c</code> و<code>d</code>، في احتساب القاسم المشترك الأكبر الثاني كما الأوّل. فإن فعلنا ذلك، حصلنا على تتابع المتحكّم الموضّح في <a href="#Figure-5_002e8">الشكل 5.8</a>.</p>
<p><strong>الشكل 5.8:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> أجزاء من تتابع المتحكّم لآلةٍ تستخدم مكوّنات مسار البيانات ذاتها لاحتسابَي قاسمٍ مشترك أكبر مختلفين.</p>
<pre><code class="language-scheme">gcd<span class="hljs-number">-1</span>
 (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> b) (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
 (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> after-gcd-1))
 (<span class="hljs-name">assign</span> t (<span class="hljs-name">op</span> rem) (<span class="hljs-name">reg</span> a) (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> a (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> b (<span class="hljs-name">reg</span> t))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd-1))
after-gcd<span class="hljs-number">-1</span>
  …
gcd<span class="hljs-number">-2</span>
 (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> b) (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
 (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> after-gcd-2))
 (<span class="hljs-name">assign</span> t (<span class="hljs-name">op</span> rem) (<span class="hljs-name">reg</span> a) (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> a (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> b (<span class="hljs-name">reg</span> t))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd-2))
after-gcd<span class="hljs-number">-2</span>
</code></pre>
<p>لقد أزلنا مكوّنات مسار البيانات المضاعفة (بحيث صارت مسارات البيانات كما في <a href="#Figure-5_002e1">الشكل 5.1</a> من جديد)، لكنّ المتحكّم يملك الآن تتابعَي قاسمٍ مشترك أكبر يختلفان في ملصقي نقطة دخولهما فقط. وكان الأفضل أن نستبدل هذين التتابعين بتفرّعاتٍ إلى تتابعٍ واحدٍ - وهو <em>روتين فرعيّ (subroutine)</em> باسم <code>gcd</code> - وفي نهايته نتفرّع عائدين إلى الموضع الصحيح في تتابع التعليمات الرئيس. ونستطيع إنجاز هذا على النحو الآتي: قبل التفرّع إلى <code>gcd</code>، نضع قيمةً مميّزة (مثل 0 أو 1) في مسجّلٍ خاصّ، هو <code>continue</code>. وعند نهاية الروتين الفرعيّ <code>gcd</code> نعود إمّا إلى <code>after-gcd-1</code> وإمّا إلى <code>after-gcd-2</code>، بحسب قيمة المسجّل <code>continue</code>. ويُظهر <a href="#Figure-5_002e9">الشكل 5.9</a> الجزء المعنيّ من تتابع المتحكّم الناتج، الذي يتضمّن نسخةً واحدةً فقط من تعليمات <code>gcd</code>.</p>
<p><strong>الشكل 5.9:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> استخدام مسجّل <code>continue</code> لتجنّب تتابع المتحكّم المضاعف الوارد في <a href="#Figure-5_002e8">الشكل 5.8</a>.</p>
<pre><code class="language-scheme">gcd
 (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> b) (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
 (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> gcd-done))
 (<span class="hljs-name">assign</span> t (<span class="hljs-name">op</span> rem) (<span class="hljs-name">reg</span> a) (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> a (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> b (<span class="hljs-name">reg</span> t))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd))
gcd-done
 (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> continue) (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
 (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> after-gcd-1))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> after-gcd-2))
  …
<span class="hljs-comment">;; Before branching to gcd from</span>
<span class="hljs-comment">;; the first place where it is needed,</span>
<span class="hljs-comment">;; we place 0 in the continue register</span>
 (<span class="hljs-name">assign</span> continue (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd))
after-gcd<span class="hljs-number">-1</span>
  …
<span class="hljs-comment">;; Before the second use of gcd, </span>
<span class="hljs-comment">;; we place 1 in the continue register</span>
 (<span class="hljs-name">assign</span> continue (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd))
after-gcd<span class="hljs-number">-2</span>
</code></pre>
<p>هذا منهجٌ معقولٌ لمعالجة المسائل الصغيرة، لكنّه سيكون عسيرًا لو كانت هناك نسخٌ كثيرةٌ من احتسابات القاسم المشترك الأكبر في تتابع المتحكّم. فلكي نقرّر أين نواصل التنفيذ بعد الروتين الفرعيّ <code>gcd</code>، كنّا سنحتاج إلى اختباراتٍ في مسار البيانات وتعليمات تفرّعٍ في المتحكّم لجميع المواضع التي تستخدم <code>gcd</code>. وأقوى منهجٍ لتنفيذ الروتينات الفرعيّة هو أن نُجعل المسجّل <code>continue</code> يحمل ملصق نقطة الدخول في تتابع المتحكّم التي ينبغي مواصلة التنفيذ عندها حين ينتهي الروتين الفرعيّ. وإنّ تنفيذ هذه الاستراتيجيّة يتطلّب نوعًا جديدًا من الوصل بين مسار البيانات ومتحكّم آلة المسجّلات: فيتحتّم أن تكون هناك طريقةٌ لإحلال ملصقٍ من تتابع المتحكّم في مسجّلٍ، بحيث يمكن جلب هذه القيمة من المسجّل واستخدامها لمواصلة التنفيذ عند نقطة الدخول المعيّنة.</p>
<p>ولتعكس هذه القدرة، سنُوسّع تعليمة <code>assign</code> في لغة آلات المسجّلات لتسمح بأن يُحال إلى مسجّلٍ قيمةُ ملصقٍ من تتابع المتحكّم (كنوعٍ خاصٍّ من الثوابت). وسنُوسّع أيضًا تعليمة <code>goto</code> لتسمح بأن يواصل التنفيذ عند نقطة الدخول التي تصفها محتويات مسجّلٍ، لا عند نقطة الدخول التي يصفها ملصقٌ ثابتٌ فقط. وباستخدام هذين البناءين الجديدين نستطيع إنهاء الروتين الفرعيّ <code>gcd</code> بتفرّعٍ إلى الموضع المخزَّن في المسجّل <code>continue</code>. وهذا يؤدّي إلى تتابع المتحكّم الموضّح في <a href="#Figure-5_002e10">الشكل 5.10</a>.</p>
<p><strong>الشكل 5.10:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> إنّ إحلال الملصقات إلى المسجّل <code>continue</code> يُبسّط الاستراتيجيّة الموضّحة في <a href="#Figure-5_002e9">الشكل 5.9</a> ويُعمّمها.</p>
<pre><code class="language-scheme">gcd
 (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> b) (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
 (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> gcd-done))
 (<span class="hljs-name">assign</span> t (<span class="hljs-name">op</span> rem) (<span class="hljs-name">reg</span> a) (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> a (<span class="hljs-name">reg</span> b))
 (<span class="hljs-name">assign</span> b (<span class="hljs-name">reg</span> t))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd))
gcd-done
 (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
  …
<span class="hljs-comment">;; Before calling gcd, </span>
<span class="hljs-comment">;; we assign to continue the label</span>
<span class="hljs-comment">;; to which gcd should return.</span>
 (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-gcd-1))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd))
after-gcd<span class="hljs-number">-1</span>
  …
<span class="hljs-comment">;; Here is the second call to gcd,</span>
<span class="hljs-comment">;; with a different continuation.</span>
 (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-gcd-2))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gcd))
after-gcd<span class="hljs-number">-2</span>
</code></pre>
<p>والآلة التي لها أكثر من روتينٍ فرعيٍّ قد تستخدم مسجّلات استمرارٍ متعدّدة (مثلًا <code>gcd-continue</code> و<code>factorial-continue</code>)، أو يمكننا أن نجعل جميع الروتينات الفرعيّة تتقاسم مسجّل <code>continue</code> واحدًا. والتقاسم أكثر اقتصاديّة، لكن يتحتّم علينا أن نكون حذرين إذا كان لدينا روتين فرعيّ (<code>sub1</code>) ينادي روتينًا فرعيًّا آخر (<code>sub2</code>). فما لم يحفظ <code>sub1</code> محتويات <code>continue</code> في مسجّلٍ آخر قبل تهيئة <code>continue</code> للنداء إلى <code>sub2</code>، فلن يعرف <code>sub1</code> إلى أين يذهب حين ينتهي. والآليّة التي نُطوّرها في القسم التالي لمعالجة التعاوب تُوفّر أيضًا حلًّا أفضل لهذه مسألة نداءات الروتينات الفرعيّة المتداخلة.</p>
<h4>5.1.4 استخدام مكدسٍ لتنفيذ التعاوب</h4>
<p>بالأفكار التي شُرِّحت حتّى الآن، نستطيع تنفيذ أيّ عمليّةٍ تكراريّةٍ بتحديد آلة مسجّلاتٍ لها مسجّلٌ يقابل كلّ متغيّر حالةٍ في العمليّة. فإنّ الآلة تُنفّذ مرّةً بعد مرّةٍ حلقة متحكّم، غالبةً محتويات المسجّلات، حتّى يتحقّق شرطٌ ما للإنهاء. وفي كلّ نقطةٍ في تتابع المتحكّم، تكون حالة الآلة (الممثّلة لحالة العمليّة التكراريّة) محدّدةً تمامًا بمحتويات المسجّلات (أي قيم متغيّرات الحالة).</p>
<p>أمّا تنفيذ العمليّات التعاوديّة فيتطلّب آليّةً إضافيّة. تأمّل الطريقة التعاوديّة التالية لاحتساب العامليّات، التي فحصناها أوّل مرّةٍ في <a href="https://sarabander.github.io/sicp/html/1_002e2.xhtml#g_t1_002e2_002e1">1.2.1</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">factorial</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> n <span class="hljs-number">1</span>) 
      <span class="hljs-number">1</span>
      (<span class="hljs-name"><span class="hljs-built_in">*</span></span> (<span class="hljs-name">factorial</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)) n)))
</code></pre>
<p>فكما نرى من الإجراء، فإنّ احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> يتطلّب احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">( n − 1 ) !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)!</span></span></span></span> . وأمّا آلة القاسم المشترك الأكبر لدينا، المأخوذة نموذجها من الإجراء</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name"><span class="hljs-built_in">gcd</span></span> a b)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> b <span class="hljs-number">0</span>) 
      a
      (<span class="hljs-name"><span class="hljs-built_in">gcd</span></span> b (<span class="hljs-name"><span class="hljs-built_in">remainder</span></span> a b))))
</code></pre>
<p>فكان عليها بالمثل أن تحتسب قاسمًا مشتركًا أكبر آخر. لكن هناك فرقًا مهمًّا بين إجراء <code>gcd</code>، الذي يُختزل به الاحتساب الأصليّ إلى احتساب قاسمٍ مشترك أكبر جديد، و<code>factorial</code>، الذي يتطلّب احتساب عامليّاتٍ أخرى كمسألةٍ جزئيّة. أمّا في القاسم المشترك الأكبر فجواب احتساب القاسم المشترك الأكبر الجديد هو جواب المسألة الأصليّة. فلاحتساب القاسم المشترك الأكبر التالي، نضع ببساطة المعطيات الجديدة في مسجّلات مداخل آلة القاسم المشترك الأكبر ونعيد استخدام مسارات بيانات الآلة بتنفيذ تتابع المتحكّم ذاته. وحين تنتهي الآلة من حلّ مسألة القاسم المشترك الأكبر النهائيّة، تكون قد أكملت الاحتساب كلّه.</p>
<p>أمّا في حالة العامليّات (أو أيّ عمليّةٍ تعاوديّة) فجواب مسألة العامليّات الجزئيّة الجديدة ليس جواب المسألة الأصليّة. فإنّ القيمة المتحصّلة لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">( n − 1 ) !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)!</span></span></span></span> يتحتّم ضربها في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> للحصول على الجواب النهائيّ. فإذا حاولنا محاكاة تصميم القاسم المشترك الأكبر، وحلّلنا مسألة العامليّات الجزئيّة بإنقاص المسجّل <code>n</code> وإعادة تشغيل آلة العامليّات، فلن تعود لدينا القيمة القديمة للمسجّل <code>n</code> التي تضرب النتيجة فيها. وبذلك، نحتاج إلى آلة عامليّاتٍ ثانيةٍ تعمل على المسألة الجزئيّة. وهذه الآلة الثانية للعامليّات يتحتّم لها هي ذاتها مسألة عامليّاتٍ جزئيّة، تتطلّب آلة عامليّاتٍ ثالثة، وهكذا. وبما أنّ كلّ آلة عامليّاتٍ تحتوي آلة عامليّاتٍ أخرى داخلها، فإنّ الآلة الكلّيّة تحتوي عشًّا لانهائيًّا من آلاتٍ ممائلة، ومن ثمّ فلا يمكن بناؤها من عددٍ ثابتٍ محدودٍ من الأجزاء.</p>
<p>ومع ذلك، نستطيع تنفيذ عمليّة العامليّات كآلة مسجّلاتٍ إذا أمكننا أن نُرتّب استخدام المكوّنات ذاتها لكلّ نسخةٍ متداخلةٍ من الآلة. وتحديدًا، فإنّ الآلة التي تحتسب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> ينبغي أن تستخدم المكوّنات ذاتها للعمل على مسألة احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">( n − 1 ) !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)!</span></span></span></span> الجزئيّة، وعلى مسألة احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>2</mn><mo stretchy="false">)</mo><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">( n − 2 ) !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">2</span><span class="mclose">)!</span></span></span></span> الجزئيّة، وهكذا. وهذا أمرٌ معقول، لأنّ عمليّة العامليّات وإن كانت تقتضي أنّ عددًا غير محدودٍ من نسخ الآلة ذاتها لازمٌ لأداء احتسابٍ ما، فإنّ واحدةً فقط من هذه النسخ يلزم أن تكون نشطةً في أيّ لحظةٍ معيّنة. فحين تواجه الآلة مسألةً تعاوديّةً جزئيّة، فيمكنها أن تُعلّق العمل على المسألة الرئيسة، وأن تعيد استخدام الأجزاء المادّيّة ذاتها للعمل على المسألة الجزئيّة، ثم تواصل الاحتساب المعلّق.</p>
<p>وفي المسألة الجزئيّة، ستكون محتويات المسجّلات مختلفةً عمّا كانت عليه في المسألة الرئيسة. (وفي هذه الحالة، يُنقَص المسجّل <code>n</code>.) ولكي يصبح ممكنًا مواصلة الاحتساب المعلّق، يتحتّم على الآلة أن تحفظ محتويات أيّ مسجّلاتٍ ستكون مطلوبةً بعد حلّ المسألة الجزئيّة، بحيث يمكن استعادتها لمواصلة الاحتساب المعلّق. وفي حالة العامليّات، سنحفظ القيمة القديمة للمسجّل <code>n</code>، لتُستعاد حين ننتهي من احتساب عامليّات المسجّل <code>n</code> المنقوص.<sup class="footnote-ref"><a href="#fn2" id="fnref2">[2]</a></sup></p>
<p>وبما أنّ ليس هناك حدٌّ <em>أوّليّ (a priori)</em> لعمق نداءات التعاوب المتداخلة، فقد نحتاج إلى حفظ عددٍ اعتباطيٍّ من قيم المسجّلات. وهذه القيم يتحتّم استعادتها بالعكس من الترتيب الذي حُفظت به، إذ في عشّ التعاوبات تكون المسألة الجزئيّة الأخيرة دخولًا أوّلها انتهاءً. وهذا يمليّ استخدام <em>مكدس (stack)</em>، أو بنية بيانات «آخر داخل، أوّل خارج»، لحفظ قيم المسجّلات. ونستطيع توسيع لغة آلات المسجّلات لتتضمّن مكدسًا بإضافة نوعين من التعليمات: فالقيم تُوضَع على المكدس باستخدام تعليمة <code>save</code> وتُستعاد من المكدس باستخدام تعليمة <code>restore</code>. وبعد أن يكون تتابعٌ من القيم قد حُفظ بـ<code>save</code> على المكدس، فإنّ تتابعًا من تعليمات <code>restore</code> سيسترجع هذه القيم بالترتيب العكسيّ.<sup class="footnote-ref"><a href="#fn3" id="fnref3">[3]</a></sup></p>
<p>وبمعونة المكدس، نستطيع إعادة استخدام نسخةٍ واحدةٍ من مسارات بيانات آلة العامليّات لكلّ مسألة عامليّاتٍ جزئيّة. وهناك مسألة تصميمٍ ممائلة في إعادة استخدام تتابع المتحكّم الذي يُشغّل مسارات البيانات. فلإعادة تنفيذ احتساب العامليّات، لا يستطيع المتحكّم أن يعود إلى البداية بمجرّد حلقةٍ، كما في العمليّة التكراريّة، لأنّه بعد حلّ مسألة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">( n − 1 ) !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)!</span></span></span></span> الجزئيّة ينبغي أن تضرب الآلة النتيجة في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> بعد. ويتحتّم على المتحكّم أن يُعلّق احتسابه لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> ، وأن يحلّ مسألة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">( n − 1 ) !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)!</span></span></span></span> الجزئيّة، ثم يواصل احتسابه لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> . وهذه النظرة إلى احتساب العامليّات تُشير إلى استخدام آليّة الروتينات الفرعيّة الموصوفة في <a href="#g_t5_002e1_002e3">5.1.3</a>، التي تجعل المتحكّم يستخدم مسجّل <code>continue</code> للانتقال إلى الجزء من التتابع الذي يحلّ مسألةً جزئيّة ثم يواصل من حيث توقّف عن المسألة الرئيسة. ونستطيع بذلك أن نصنع روتينًا فرعيًّا للعامليّات يعود إلى نقطة الدخول المخزَّنة في المسجّل <code>continue</code>. وفي حوالي كلّ نداءٍ للروتين الفرعيّ، نحفظ <code>continue</code> ونستعيده كما نفعل مع المسجّل <code>n</code>، إذ إنّ كلّ «مستوى» من احتساب العامليّات سيستخدم المسجّل <code>continue</code> ذاته. أي إنّ الروتين الفرعيّ للعامليّات يتحتّم أن يضع قيمةً جديدة في <code>continue</code> حين ينادي ذاته من أجل مسألةٍ جزئيّة، لكنّه سيحتاج إلى القيمة القديمة لكي يعود إلى الموضع الذي ناداه لحلّ مسألةٍ جزئيّة.</p>
<p>يُظهر <a href="#Figure-5_002e11">الشكل 5.11</a> مسارات البيانات والمتحكّم لآلةٍ تُنفّذ إجراء <code>factorial</code> التعاوديّ. وللآلة مكدسٌ وثلاثة مسجّلات، تُسمّى <code>n</code> و<code>val</code> و<code>continue</code>. ولكي نبسّط مخطّط مسار البيانات، لم نُسمِّ أزرار إحلال المسجّلات، بل أزرار عمليّات المكدس وحدها (<code>sc</code> و<code>sn</code> لحفظ المسجّلات، <code>rc</code> و<code>rn</code> لاستعادتها). ولتشغيل الآلة، نضع في المسجّل <code>n</code> العدد الذي نريد احتساب عامليّاته ونُشغّل الآلة. وحين تصل الآلة إلى <code>fact-done</code>، يكون الاحتساب قد انتهى وسيوجد الجواب في المسجّل <code>val</code>. وفي تتابع المتحكّم، يُحفظ المسجّلان <code>n</code> و<code>continue</code> قبل كلّ نداءٍ تعاوديّ ويُستعادان عند العودة من النداء. وتتمّ العودة من نداءٍ بالتفرّع إلى الموضع المخزَّن في <code>continue</code>. ويُهيَّأ المسجّل <code>Continue</code> عند بدء تشغيل الآلة بحيث تكون العودة الأخيرة إلى <code>fact-done</code>. وأمّا المسجّل <code>val</code>، الذي يحمل نتيجة احتساب العامليّات، فلا يُحفظ قبل النداء التعاوديّ، لأنّ المحتويات القديمة للمسجّل <code>val</code> غير مفيدةٍ بعد عودة الروتين الفرعيّ. والقيمة الجديدة وحدها، وهي القيمة التي يُنتجها الاحتساب الجزئيّ، هي المطلوبة.</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-5-Fig5.11b.std.webp" alt=""></p>
<p><strong>الشكل 5.11:</strong> آلة عامليّاتٍ تعاوديّة.</p>
<p>ومع أنّ احتساب العامليّات يتطلّب من حيث المبدأ آلةً لانهائيّة، فإنّ الآلة الواردة في <a href="#Figure-5_002e11">الشكل 5.11</a> محدودةٌ فعلًا ما عدا المكدس، الذي هو غير محدودٍ على نحوٍ محتمل. غير أنّ أيّ تنفيذٍ مادّيٍّ معيّنٍ للمكدس سيكون محدود الحجم، وهذا سيحدّ من عمق نداءات التعاوب التي تستطيع الآلة معالجتها. وهذا التنفيذ للعامليّات يوضّح الاستراتيجيّة العامّة لتحقيق الخوارزميّات التعاوديّة كآلات مسجّلاتٍ عاديّةٍ معزَّزةٍ بمكادس. فحين تُواجَه مسألةٌ تعاوديّةٌ جزئيّة، نحفظ على المكدس المسجّلات التي ستكون قيمُها الحالية مطلوبةً بعد حلّ المسألة الجزئيّة، ونحلّ المسألة التعاوديّة الجزئيّة، ثم نستعيد المسجّلات المحفوظة ونواصل التنفيذ على المسألة الرئيسة. ومسجّل <code>continue</code> يتحتّم حفظه دائمًا. وأمّا ما إذا كانت هناك مسجّلاتٌ أخرى يلزم حفظها فيعتمد على الآلة المعيّنة، إذ إنّ ليست جميع الاحتسابات التعاوبيّة تحتاج القيم الأصليّة للمسجّلات التي تُغيَّر أثناء حلّ المسألة الجزئيّة (انظر <a href="#Exercise-5_002e4">التمرين 5.4</a>).</p>
<h4>تعاوبٌ مزدوج</h4>
<p>لِنفحص عمليّةً تعاوديّةً أكثر تعقيدًا، وهي الاحتساب التعاوديّ الشجريّ لأعداد فيبوناتشي، الذي عرّفناه في <a href="https://sarabander.github.io/sicp/html/1_002e2.xhtml#g_t1_002e2_002e2">1.2.2</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">fib</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">&lt;</span></span> n <span class="hljs-number">2</span>) 
      n 
      (<span class="hljs-name"><span class="hljs-built_in">+</span></span> (<span class="hljs-name">fib</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)) (<span class="hljs-name">fib</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">2</span>)))))
</code></pre>
<p>تمامًا كما هو الحال مع العامليّات، نستطيع تنفيذ الاحتساب التعاوديّ لفيبوناتشي كآلة مسجّلاتٍ ذات مسجّلات <code>n</code> و<code>val</code> و<code>continue</code>. والآلة أكثر تعقيدًا من آلة العامليّات، لأنّه هناك موضعان في تتابع المتحكّم نحتاج فيهما إلى أداء نداءات تعاوديّة - مرّةً لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>F</mi><mi>i</mi><mi>b</mi><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">Fib ( n − 1 )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal">ib</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span> ومرّةً لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>F</mi><mi>i</mi><mi>b</mi><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>2</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">Fib ( n − 2 )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal">ib</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">2</span><span class="mclose">)</span></span></span></span> . ولكي نتهيّأ لكلّ نداءٍ من هذين النداءين، نحفظ المسجّلات التي ستكون قيمُها مطلوبةً لاحقًا، ونضع المسجّل <code>n</code> على العدد الذي نحتاج إلى احتساب Fib له تعاوديًّا ( <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n − 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> أو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>−</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">n − 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> )، ونُحيل إلى <code>continue</code> نقطة الدخول في التتابع الرئيس التي نعود إليها (<code>afterfib-n-1</code> أو <code>afterfib-n-2</code>، على الترتيب). ثم نذهب إلى <code>fib-loop</code>. وحين نعود من النداء التعاوديّ، يكون الجواب في <code>val</code>. ويُظهر <a href="#Figure-5_002e12">الشكل 5.12</a> تتابع المتحكّم لهذه الآلة.</p>
<p><strong>الشكل 5.12:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> متحكّم آلةٍ لاحتساب أعداد فيبوناتشي.</p>
<pre><code class="language-scheme">(<span class="hljs-name">controller</span>
   (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> fib-done))
 fib-loop
   (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> &lt;) (<span class="hljs-name">reg</span> n) (<span class="hljs-name">const</span> <span class="hljs-number">2</span>))
   (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> immediate-answer))
   <span class="hljs-comment">;; set up to compute Fib(n − 1)</span>
   (<span class="hljs-name">save</span> continue)
   (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> afterfib-n-1))
   (<span class="hljs-name">save</span> n)           <span class="hljs-comment">; save old value of n</span>
   (<span class="hljs-name">assign</span> n 
           (<span class="hljs-name">op</span> -)
           (<span class="hljs-name">reg</span> n)
           (<span class="hljs-name">const</span> <span class="hljs-number">1</span>)) <span class="hljs-comment">; clobber n to n-1</span>
   (<span class="hljs-name">goto</span> 
    (<span class="hljs-name">label</span> fib-loop)) <span class="hljs-comment">; perform recursive call</span>
 afterfib-n-1 <span class="hljs-comment">; upon return, val contains Fib(n − 1)</span>
   (<span class="hljs-name">restore</span> n)
   (<span class="hljs-name">restore</span> continue)
   <span class="hljs-comment">;; set up to compute Fib(n − 2)</span>
   (<span class="hljs-name">assign</span> n (<span class="hljs-name">op</span> -) (<span class="hljs-name">reg</span> n) (<span class="hljs-name">const</span> <span class="hljs-number">2</span>))
   (<span class="hljs-name">save</span> continue)
   (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> afterfib-n-2))
   (<span class="hljs-name">save</span> val)         <span class="hljs-comment">; save Fib(n − 1)</span>
   (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> fib-loop))
 afterfib-n-2 <span class="hljs-comment">; upon return, val contains Fib(n − 2)</span>
   (<span class="hljs-name">assign</span> n 
           (<span class="hljs-name">reg</span> val)) <span class="hljs-comment">; n now contains Fib(n − 2)</span>
   (<span class="hljs-name">restore</span> val)      <span class="hljs-comment">; val now contains Fib(n − 1)</span>
   (<span class="hljs-name">restore</span> continue)
   (<span class="hljs-name">assign</span> val        <span class="hljs-comment">; Fib(n − 1) + Fib(n − 2)</span>
           (<span class="hljs-name">op</span> +) 
           (<span class="hljs-name">reg</span> val)
           (<span class="hljs-name">reg</span> n))
   (<span class="hljs-name">goto</span>              <span class="hljs-comment">; return to caller,</span>
    (<span class="hljs-name">reg</span> continue))   <span class="hljs-comment">; answer is in val</span>
 immediate-answer
   (<span class="hljs-name">assign</span> val 
           (<span class="hljs-name">reg</span> n))   <span class="hljs-comment">; base case: Fib(n) = n</span>
   (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
 fib-done)
</code></pre>
<p><strong>التمرين 5.4:</strong> حدّد آلات مسجّلاتٍ تُنفّذ كلّ إجراءٍ من الإجراءات التالية. ولكلّ آلةٍ، اكتب تتابع تعليمات متحكّمٍ وارسم مخطّطًا يُظهر مسارات البيانات.</p>
<p>الرفع التعاوديّ إلى قوّة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name"><span class="hljs-built_in">expt</span></span> b n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> n <span class="hljs-number">0</span>)
      <span class="hljs-number">1</span>
      (<span class="hljs-name"><span class="hljs-built_in">*</span></span> b (<span class="hljs-name"><span class="hljs-built_in">expt</span></span> b (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)))))
</code></pre>
<p>الرفع التكراريّ إلى قوّة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name"><span class="hljs-built_in">expt</span></span> b n)
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">expt-iter</span> counter product)
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> counter <span class="hljs-number">0</span>)
        product
        (<span class="hljs-name">expt-iter</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> counter <span class="hljs-number">1</span>)
                   (<span class="hljs-name"><span class="hljs-built_in">*</span></span> b product))))
  (<span class="hljs-name">expt-iter</span> n <span class="hljs-number">1</span>))
</code></pre>
<blockquote>
<p><strong>التمرين 5.5:</strong> حاكِ آلة العامليّات وآلة فيبوناتشي يدويًّا، مستخدِمًا مدخلًا غير تافه (يتطلّب تنفيذ نداءٍ تعاوديّ واحدٍ على الأقلّ). وأظهر محتويات المكدس عند كلّ نقطةٍ هامّةٍ في التنفيذ.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.6:</strong> يلاحظ بن بِتدل أنّ تتابع متحكّم آلة فيبوناتشي يملك <code>save</code> زائدةً و<code>restore</code> زائدة، يمكن إزالتهما لجعل الآلة أسرع. فأين هاتان التعليمتان؟</p>
</blockquote>
<h4>5.1.5 ملخّص التعليمات</h4>
<p>التعليمة المتحكِّمة في لغة آلات المسجّلات لدينا تأخذ إحدى الصيغ التالية، حيث كلّ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>i</mi><mi>n</mi><mi>p</mi><mi>u</mi><msub><mi>t</mi><mi>i</mi></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ i n p u t_{i} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal">in</span><span class="mord mathnormal">p</span><span class="mord mathnormal">u</span><span class="mord"><span class="mord mathnormal">t</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span> هو إمّا <code>(reg ⟨register-name⟩)</code> وإمّا <code>(const ⟨constant-value⟩)</code>. وقد طُرحت هذه التعليمات في <a href="#g_t5_002e1_002e1">5.1.1</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> ⟨register-name⟩ (<span class="hljs-name">reg</span> ⟨register-name⟩))
(<span class="hljs-name">assign</span> ⟨register-name⟩ 
        (<span class="hljs-name">const</span> ⟨constant-value⟩))
(<span class="hljs-name">assign</span> ⟨register-name⟩ 
        (<span class="hljs-name">op</span> ⟨operation-name⟩) 
        ⟨input₁⟩ … ⟨inputₙ⟩)
(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> ⟨operation-name⟩) 
         ⟨input₁⟩ 
         … 
         ⟨inputₙ⟩)
(<span class="hljs-name">test</span> (<span class="hljs-name">op</span> ⟨operation-name⟩) 
      ⟨input₁⟩ 
      … 
      ⟨inputₙ⟩)
(<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ⟨label-name⟩))
(<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> ⟨label-name⟩))
</code></pre>
<p>وقد طُرح استخدام المسجّلات لحفظ الملصقات في <a href="#g_t5_002e1_002e3">5.1.3</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> ⟨register-name⟩ (<span class="hljs-name">label</span> ⟨label-name⟩))
(<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> ⟨register-name⟩))
</code></pre>
<p>وقد طُرحت تعليمات استخدام المكدس في <a href="#g_t5_002e1_002e4">5.1.4</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name">save</span> ⟨register-name⟩)
(<span class="hljs-name">restore</span> ⟨register-name⟩)
</code></pre>
<p>أمّا النوع الوحيد من <code>⟨</code>constant-value<code>⟩</code> الذي رأيناه حتّى الآن فهو العدد، لكنّنا سنستخدم لاحقًا السلاسل والرموز والقوائم. فمثلًا، <code>(const &quot;abc&quot;)</code> هو السلسلة <code>&quot;abc&quot;</code>، و<code>(const abc)</code> هو الرمز <code>abc</code>، و<code>(const (a b c))</code> هو القائمة <code>(a b c)</code>، و<code>(const ())</code> هو القائمة الخالية.</p>
<h3 id="52-محاكي-آلة-مسجلات">5.2 محاكي آلة مسجّلات</h3>
<p>ولنكتسب فهمًا حسنًا لتصميم آلات المسجّلات، يتحتّم علينا أن نختبر الآلات التي نصمّمها لنرى ما إذا كانت تؤدّي كما هو متوقّع. وإحدى طرق اختبار تصميمٍ هي محاكاة تشغيل المتحكّم يدويًّا، كما في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Exercise-5_002e5">التمرين 5.5</a>. لكنّ هذا أمرٌ بالغ المملّة في جميع الآلات ما عدا أبسطها. ونبني في هذا القسم محاكيًا للآلات الموصوفة بلغة آلات المسجّلات. والمحاكي برنامج Scheme فيه أربعة إجراءات واجهة. فالأوّل يستخدم وصف آلة مسجّلاتٍ لبناء نموذج للآلة (بنية بياناتٍ أجزاؤها تقابل أجزاء الآلة التي تُحاكى)، والثلاثة الأخرى تسمح لنا بمحاكاة الآلة بالتلاعب بالنموذج:</p>
<pre><code class="language-scheme">(<span class="hljs-name">make-machine</span> ⟨register-names⟩
              ⟨operations⟩
              ⟨controller⟩)
</code></pre>
<p>يبني نموذجًا للآلة ذات المسجّلات والعمليّات والمتحكّم المعطاة، ويُعيده.</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-register-contents!</span> ⟨machine-model⟩ 
                        ⟨register-name⟩ 
                        ⟨value⟩)
</code></pre>
<p>يُخزّن قيمةً في مسجّلٍ محاكىً في الآلة المعطاة.</p>
<pre><code class="language-scheme">(<span class="hljs-name">get-register-contents</span> ⟨machine-model⟩
                       ⟨register-name⟩)
</code></pre>
<p>يُعيد محتويات مسجّلٍ محاكىً في الآلة المعطاة.</p>
<pre><code class="language-scheme">(<span class="hljs-name">start</span> ⟨machine-model⟩)
</code></pre>
<p>يحاكي تنفيذ الآلة المعطاة، بدءًا من بداية تسلسل المتحكّم وتوقّفًا حين يبلغ نهاية التسلسل.</p>
<p>ومثالٌ على كيفيّة استخدام هذه الإجراءات، يمكننا تعريف <code>gcd-machine</code> ليكون نموذجًا لآلة GCD الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e1">5.1.1</a> كما يلي:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> gcd-machine
  (<span class="hljs-name">make-machine</span>
   &#x27;(a b t)
   (<span class="hljs-name"><span class="hljs-built_in">list</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;rem</span> remainder) (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;=</span> =))
   &#x27;(test-b
       (test (op =) (reg b) (const <span class="hljs-number">0</span>))
       (branch (label gcd-done))
       (assign t (op rem) (reg a) (reg b))
       (assign a (reg b))
       (assign b (reg t))
       (goto (label test-b))
     gcd-done)))
</code></pre>
<p>المَعطى الأوّل إلى <code>make-machine</code> هو قائمةٌ بأسماء المسجّلات. والمَعطى التالي هو جدول (قائمةٌ من قوائمٍ ثنائيّة العناصر) يُقرن كلّ اسم عمليّةٍ فيه بإجراءٍ من Scheme يُنفّذ تلك العمليّة (أي يُنتج قيمة الخرج ذاتها عند إعطائه قيم الدخل ذاتها). وأمّا المَعطى الأخير فيحدّد المتحكّم على هيئة قائمةٍ من اللصائق وتعليمات الآلة، كما في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1">5.1</a>.</p>
<p>ولحساب القواسم المشتركة الكبرى بهذه الآلة، نُعيّن محتويات مسجّلات الدخل، ونُشغّل الآلة، وندرس النتيجة حين تنتهي المحاكاة:</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-register-contents!</span> gcd-machine <span class="hljs-symbol">&#x27;a</span> <span class="hljs-number">206</span>)
done

(<span class="hljs-name">set-register-contents!</span> gcd-machine <span class="hljs-symbol">&#x27;b</span> <span class="hljs-number">40</span>)
done

(<span class="hljs-name">start</span> gcd-machine)
done

(<span class="hljs-name">get-register-contents</span> gcd-machine <span class="hljs-symbol">&#x27;a</span>)
<span class="hljs-number">2</span>
</code></pre>
<p>وسيجرى هذا الاحتساب أبطأَ بكثيرٍ من إجراء <code>gcd</code> مكتوبٍ بـScheme، لأنّنا سنحاكي تعليمات آلةٍ منخفضة المستوى، مثل <code>assign</code>، بعمليّاتٍ أعقدَ بكثيرٍ.</p>
<blockquote>
<p><strong>التمرين 5.7:</strong> استخدم المُحاكي لاختبار الآلات التي صمّمتها في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Exercise-5_002e4">التمرين 5.4</a>.</p>
</blockquote>
<h4>5.2.1 نموذج الآلة</h4>
<p>نموذج الآلة الذي يولّده <code>make-machine</code> مُمثَّلٌ بإجراءٍ ذي حالة محلّيّة، باستخدام تقنيّات تمرير الرسائل المطوّرة في <a href="https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3">الفصل 3</a>. فلبناء هذا النموذج، يبدأ <code>make-machine</code> بنداء الإجراء <code>make-new-machine</code> لبناء أجزاء نموذج الآلة المشتركة بين جميع آلات المسجّلات. وهذا النموذج الأساسيّ للآلة الذي يبنيه <code>make-new-machine</code> هو في جوهره حاوٍ لبعض المسجّلات ومكدس، إلى جانب آليّة تنفيذٍ تعالج تعليمات المتحكّم واحدةً واحدة.</p>
<p>ثم يمدّ <code>Make-machine</code> هذا النموذج الأساسيّ (بإرسال رسائل إليه) ليشمل مسجّلات الآلة المعيّنة وعمليّاتها ومتحكّمها. فأوّلًا يُخصِّص مسجّلًا في الآلة الجديدة لكلّ اسمٍ من أسماء المسجّلات المعطاة ويثبّت العمليّات المعيّنة في الآلة. ثم يستخدم <em>مُجمِّعًا (assembler)</em> (موصوفًا أدناه في <a href="#g_t5_002e2_002e2">5.2.2</a>) لتحويل قائمة المتحكّم إلى تعليماتٍ للآلة الجديدة ويثبّتها بوصفها تسلسل تعليمات الآلة. ويُعيد <code>Make-machine</code> نموذج الآلة المعدَّل قيمةً له.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-machine</span> register-names 
                      ops 
                      controller-text)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">machine</span> (<span class="hljs-name">make-new-machine</span>)))
    (<span class="hljs-name"><span class="hljs-built_in">for-each</span></span> (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (register-name)
                ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;allocate-register</span>) 
                 register-name))
              register-names)
    ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;install-operations</span>) ops)
    ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;install-instruction-sequence</span>)
     (<span class="hljs-name">assemble</span> controller-text machine))
    machine))
</code></pre>
<h4>المسجّلات</h4>
<p>وسنمثّل المسجّل بإجراءٍ ذي حالة محلّيّة، كما في <a href="https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3">الفصل 3</a>. فالإجراء <code>make-register</code> يُنشئ مسجّلًا يحتفظ بقيمةٍ يمكن الاطلاع عليها أو تغييرها:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-register</span> name)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">contents</span> <span class="hljs-symbol">&#x27;*unassigned*</span>))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
      (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;get</span>) contents)
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;set</span>)
             (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (value) 
               (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> contents value)))
            (<span class="hljs-name"><span class="hljs-built_in">else</span></span>
             (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: 
                     REGISTER&quot;</span>
                    message))))
    dispatch))
</code></pre>
<p>والإجراءات التالية تُستخدم للوصول إلى المسجّلات:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">get-contents</span> register)
  (<span class="hljs-name">register</span> <span class="hljs-symbol">&#x27;get</span>))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">set-contents!</span> register value)
  ((<span class="hljs-name">register</span> <span class="hljs-symbol">&#x27;set</span>) value))
</code></pre>
<h4>المكدس</h4>
<p>ويمكننا أيضًا تمثيل المكدس بإجراءٍ ذي حالة محلّيّة. فالإجراء <code>make-stack</code> يُنشئ مكدسًا تتألّف حالته المحليّة من قائمةٍ بالعناصر الموجودة في المكدس. ويقبل المكدس طلبات <code>push</code> عنصرًا إلى المكدس، و<code>pop</code> العنصر الأعلى من المكدس وإعادته، و<code>initialize</code> المكدس ليصبح فارغًا.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-stack</span>)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">s</span> &#x27;()))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">push</span> x)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> x s)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">pop</span>)
      (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> s)
          (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Empty stack: POP&quot;</span>)
          (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">top</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s)))
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s))
            top)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">initialize</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s &#x27;())
      <span class="hljs-symbol">&#x27;done</span>)
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
      (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;push</span>) push)
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;pop</span>) (<span class="hljs-name">pop</span>))
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;initialize</span>) 
             (<span class="hljs-name">initialize</span>))
            (<span class="hljs-name"><span class="hljs-built_in">else</span></span> 
             (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: STACK&quot;</span>
                    message))))
    dispatch))
</code></pre>
<p>والإجراءات التالية تُستخدم للوصول إلى الأكداس:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">pop</span> stack) (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;pop</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">push</span> stack value)
  ((<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;push</span>) value))
</code></pre>
<h4>الآلة الأساسيّة</h4>
<p>يبني الإجراء <code>make-new-machine</code>، المبيَّن في <a href="#Figure-5_002e13">الشكل 5.13</a>، كائنًا تتألّف حالته المحليّة من مكدس، وتسلسل تعليماتٍ فارغٍ في بادئ الأمر، وقائمةٍ من العمليّات تحتوي في بادئ الأمر على عمليّةٍ لتهيئة المكدس، و<em>جدول مسجّلات</em> يحتوي في بادئ الأمر على مسجّلين، يُسمّيان <code>flag</code> و<code>pc</code> (اختصارًا لـ«عدّاد البرنامج»). ويُضيف الإجراء الداخليّ <code>allocate-register</code> مُدخلاتٍ جديدة إلى جدول المسجّلات، ويَبحَث الإجراء الداخليّ <code>lookup-register</code> عن المسجّلات في الجدول.</p>
<p><strong>الشكل 5.13:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> الإجراء <code>make-new-machine</code>، الذي يُنفّذ نموذج الآلة الأساسيّ.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-new-machine</span>)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">pc</span> (<span class="hljs-name">make-register</span> <span class="hljs-symbol">&#x27;pc</span>))
        (<span class="hljs-name">flag</span> (<span class="hljs-name">make-register</span> <span class="hljs-symbol">&#x27;flag</span>))
        (<span class="hljs-name">stack</span> (<span class="hljs-name">make-stack</span>))
        (<span class="hljs-name">the-instruction-sequence</span> &#x27;()))
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">the-ops</span>
           (<span class="hljs-name"><span class="hljs-built_in">list</span></span> 
            (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;initialize-stack</span>
                  (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
                    (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;initialize</span>)))))
          (<span class="hljs-name">register-table</span>
           (<span class="hljs-name"><span class="hljs-built_in">list</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;pc</span> pc) 
                 (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;flag</span> flag))))
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">allocate-register</span> name)
        (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> name register-table)
            (<span class="hljs-name">error</span> 
             <span class="hljs-string">&quot;Multiply defined register: &quot;</span> 
             name)
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> register-table
                  (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> 
                   (<span class="hljs-name"><span class="hljs-built_in">list</span></span> name 
                         (<span class="hljs-name">make-register</span> name))
                   register-table)))
        <span class="hljs-symbol">&#x27;register-allocated</span>)
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">lookup-register</span> name)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">val</span> 
               (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> name register-table)))
          (<span class="hljs-name"><span class="hljs-built_in">if</span></span> val
              (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> val)
              (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown register:&quot;</span> 
                     name))))
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">execute</span>)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span> (<span class="hljs-name">get-contents</span> pc)))
          (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> insts)
              <span class="hljs-symbol">&#x27;done</span>
              (<span class="hljs-name"><span class="hljs-built_in">begin</span></span>
                ((<span class="hljs-name">instruction-execution-proc</span> 
                  (<span class="hljs-name"><span class="hljs-built_in">car</span></span> insts)))
                (<span class="hljs-name">execute</span>)))))
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
        (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;start</span>)
               (<span class="hljs-name">set-contents!</span> 
                pc
                the-instruction-sequence)
               (<span class="hljs-name">execute</span>))
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> 
                message 
                <span class="hljs-symbol">&#x27;install-instruction-sequence</span>)
               (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (seq) 
                 (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> 
                  the-instruction-sequence 
                  seq)))
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message 
                    <span class="hljs-symbol">&#x27;allocate-register</span>) 
               allocate-register)
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;get-register</span>) 
               lookup-register)
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message 
                    <span class="hljs-symbol">&#x27;install-operations</span>)
               (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (ops) 
                 (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> the-ops 
                       (<span class="hljs-name"><span class="hljs-built_in">append</span></span> the-ops ops))))
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;stack</span>) stack)
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;operations</span>) 
               the-ops)
              (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: 
                            MACHINE&quot;</span>
                           message))))
      dispatch)))
</code></pre>
<p>يُستخدم المسجّل <code>flag</code> للتحكّم في التفرّع في الآلة المحاكاة. فتعليمات <code>Test</code> تضبط محتويات <code>flag</code> بنتيجة الاختبار (صحيحة أو خاطئة). وتقرّر تعليمات <code>Branch</code> ما إذا كانت ستتفرّع أم لا بفحص محتويات <code>flag</code>.</p>
<p>يحدّد المسجّل <code>pc</code> تتابع التعليمات أثناء جريان الآلة. وهذا التتابع مُنفَّذٌ بالإجراء الداخليّ <code>execute</code>. ففي نموذج المحاكاة، كلّ تعليمة آلةٍ هي بنية بيانات تتضمّن إجراءً بلا معطيات، يُسمّى <em>إجراء تنفيذ التعليمة (instruction execution procedure)</em>، بحيث إنّ نداء هذا الإجراء يحاكي تنفيذ التعليمة. وأثناء جريان المحاكاة، يُشير <code>pc</code> إلى المكان في تسلسل التعليمات الذي تبدأ فيه التعليمة التالية المراد تنفيذها. و<code>Execute</code> يجلب تلك التعليمة، ويَنفّذها بنداء إجراء تنفيذ التعليمة، ويكرّر هذه الدورة حتّى لا تبقى تعليماتٌ لتنفيذها (أي حتّى يُشير <code>pc</code> إلى نهاية تسلسل التعليمات).</p>
<p>كجزءٍ من عمليّته، يُعدّل كلّ إجراءٍ لتنفيذ تعليمةٍ المسجّل <code>pc</code> للإشارة إلى التعليمة التالية المراد تنفيذها. فتعليمات <code>Branch</code> و<code>goto</code> تُغيّران <code>pc</code> ليُشير إلى الوجهة الجديدة. وجميع التعليمات الأخرى تُقدّم <code>pc</code> تقدّمًا بسيطًا، فتجعلُه يُشير إلى التعليمة التالية في التسلسل. ولاحِظ أنّ كلّ نداءٍ لـ<code>execute</code> يَنداء <code>execute</code> مرّةً أخرى، لكنّ هذا لا يُنتج حلقةً لا نهائيّةً لأنّ تشغيل إجراء تنفيذ التعليمة يُغيّر محتويات <code>pc</code>.</p>
<p>يُعيد <code>Make-new-machine</code> إجراء <code>dispatch</code> يُنفّذ وصولاً بتمرير الرسائل إلى الحالة الداخليّة. ولاحِظ أنّ تشغيل الآلة يُنجَز بتعيين <code>pc</code> إلى بداية تسلسل التعليمات ونداء <code>execute</code>.</p>
<p>وللتيسير، نوفّر واجهةً إجراءيّةً بديلةً لعمليّة <code>start</code> في الآلة، وكذلك إجراءاتٍ لتعيين محتويات المسجّلات وفحصها، كما هو محدَّدٌ في بداية <a href="#g_t5_002e2">5.2</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">start</span> machine)
  (<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;start</span>))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">get-register-contents</span> 
         machine register-name)
  (<span class="hljs-name">get-contents</span> 
   (<span class="hljs-name">get-register</span> machine register-name)))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">set-register-contents!</span> 
         machine register-name value)
  (<span class="hljs-name">set-contents!</span> 
   (<span class="hljs-name">get-register</span> machine register-name) 
   value)
  <span class="hljs-symbol">&#x27;done</span>)
</code></pre>
<p>وهذه الإجراءات (والعديد من الإجراءات في <a href="#g_t5_002e2_002e2">5.2.2</a> و<a href="#g_t5_002e2_002e3">5.2.3</a>) تستخدم ما يلي للبحث عن المسجّل ذي الاسم المعطى في آلةٍ معطاة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">get-register</span> machine reg-name)
  ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;get-register</span>) reg-name))
</code></pre>
<h4>5.2.2 المُجمِّع</h4>
<p>يحوّل المُجمِّع تسلسل تعابير المتحكّم لآلةٍ إلى قائمةٍ مقابلةٍ من تعليمات الآلة، كلٌّ منها بإجراء تنفيذه. وبصورةٍ عامّة، فإنّ المُجمِّع يشبه إلى حدٍّ كبيرٍ المقيّمات التي درسناها في <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a> — فهناك لغة دخل (في هذه الحالة، لغة آلات المسجّلات) وينبغي أن نؤدّي فعلًا مناسبًا لكلّ نوعٍ من التعابير في اللغة.</p>
<p>وتقنيّة إنتاج إجراء تنفيذٍ لكلّ تعليمةٍ هي ذاتها التي استخدمناها في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a> لتسريع المقيّم بفصل التحليل عن التنفيذ وقت التشغيل. فكما رأينا في <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a>، فإنّ جزءًا كبيرًا من التحليل المفيد لتعبيرات Scheme يمكن أداؤه دون معرفة قيم المتغيّرات الفعليّة. وهنا، بالتماثل، فإنّ جزءًا كبيرًا من التحليل المفيد لتعبيرات لغة آلات المسجّلات يمكن أداؤه دون معرفة محتويات مسجّلات الآلة الفعليّة. فمثلًا، نستطيع استبدال الإشارات إلى المسجّلات بمؤشّراتٍ إلى كائنات المسجّل، ونستطيع استبدال الإشارات إلى اللصائق بمؤشّراتٍ إلى المكان في تسلسل التعليمات الذي تُعيّّنه اللصيقة.</p>
<p>وقبل أن يتمكّن من توليد إجراءات تنفيذ التعليمات، ينبغي أن يعرف المُجمِّع ما تشير إليه جميع اللصائق، فيبدأ بمسح نصّ المتحكّم لفصل اللصائق عن التعليمات. وأثناء مسحه النصّ، يبني قائمةً بالتعليمات وجدولًا يُقرن كلّ لصيقةٍ بمؤشّرٍ إلى داخل تلك القائمة. ثم يُنمّي المُجمِّع قائمة التعليمات بإدراج إجراء التنفيذ لكلّ تعليمة.</p>
<p>الإجراء <code>assemble</code> هو المدخل الرئيسيّ إلى المُجمِّع. وهو يأخذ نصّ المتحكّم ونموذج الآلة مَعطيين ويُعيد تسلسل التعليمات الذي سيُخزَّن في النموذج. ويَنداء <code>Assemble</code> الإجراء <code>extract-labels</code> لبناء قائمة التعليمات الأوّلية وجدول اللصائق من نصّ المتحكّم المعطى. والمَعطى الثاني إلى <code>extract-labels</code> هو إجراءٌ سيُنداء لمعالجة هذه النتائج: وهذا الإجراء يستخدم <code>update-insts!</code> لتوليد إجراءات تنفيذ التعليمات وإدراجها في قائمة التعليمات، ويُعيد القائمة المعدَّلة.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">assemble</span> controller-text machine)
  (<span class="hljs-name">extract-labels</span> controller-text
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (insts labels)
      (<span class="hljs-name">update-insts!</span> insts labels machine)
      insts)))
</code></pre>
<p>يأخذ <code>Extract-labels</code> مَعطيين: قائمةً <code>text</code> (تسلسل تعابير تعليمات المتحكّم) وإجراء <code>receive</code>. وسيُنداء <code>Receive</code> بقيمتين: (1) قائمةً <code>insts</code> من بنيات بيانات التعليمات، كلٌّ منها يحتوي تعليمةً من <code>text</code>؛ و(2) جدولًا يُسمّى <code>labels</code>، يُقرن كلّ لصيقةٍ من <code>text</code> بالموضع في القائمة <code>insts</code> الذي تُعيّّنه اللصيقة.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">extract-labels</span> text receive)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> text)
      (<span class="hljs-name">receive</span> &#x27;() &#x27;())
      (<span class="hljs-name">extract-labels</span> 
       (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> text)
       (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (insts labels)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">next-inst</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> text)))
           (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">symbol?</span></span> next-inst)
               (<span class="hljs-name">receive</span> 
                   insts
                   (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> 
                    (<span class="hljs-name">make-label-entry</span> 
                     next-inst
                     insts)
                    labels))
               (<span class="hljs-name">receive</span> 
                   (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> (<span class="hljs-name">make-instruction</span> 
                          next-inst)
                         insts)
                   labels)))))))
</code></pre>
<p>يعمل <code>Extract-labels</code> بمسح عناصر <code>text</code> تتابعيّ ليُراكِم <code>insts</code> و<code>labels</code>. فإن كان العنصر رمزًا (وهو إذن لصيقة) أُضيف مُدخلٌ مناسبٌ إلى جدول <code>labels</code>. وإلّا فالعنصر يُراكَم على قائمة <code>insts</code>.<sup class="footnote-ref"><a href="#fn4" id="fnref4">[4]</a></sup></p>
<p>يُعدّل <code>Update-insts!</code> قائمة التعليمات، التي تحتوي في بادئ الأمر على نصّ التعليمات فقط، لتتضمّن إجراءات التنفيذ المقابلة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">update-insts!</span> insts labels machine)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">pc</span> (<span class="hljs-name">get-register</span> machine <span class="hljs-symbol">&#x27;pc</span>))
        (<span class="hljs-name">flag</span> (<span class="hljs-name">get-register</span> machine <span class="hljs-symbol">&#x27;flag</span>))
        (<span class="hljs-name">stack</span> (<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;stack</span>))
        (<span class="hljs-name">ops</span> (<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;operations</span>)))
    (<span class="hljs-name"><span class="hljs-built_in">for-each</span></span>
     (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (inst)
       (<span class="hljs-name">set-instruction-execution-proc!</span>
        inst
        (<span class="hljs-name">make-execution-procedure</span>
         (<span class="hljs-name">instruction-text</span> inst) 
         labels
         machine
         pc
         flag
         stack
         ops)))
     insts)))
</code></pre>
<p>وبنية بيانات تعليمة الآلة تُقرن ببساطةٍ نصّ التعليمة بإجراء التنفيذ المقابل. وإجراء التنفيذ غير متوفّرٍ بعد حين يبني <code>extract-labels</code> التعليمة، ويُدرَج لاحقًا بـ<code>update-insts!</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-instruction</span> text)
  (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> text &#x27;()))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">instruction-text</span> inst) (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">instruction-execution-proc</span> inst)
  (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> inst))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">set-instruction-execution-proc!</span>
         inst
         proc)
  (<span class="hljs-name"><span class="hljs-built_in">set-cdr!</span></span> inst proc))
</code></pre>
<p>نصّ التعليمة لا يستخدمه مُحاكينا، لكنّ من المفيد الاحتفاظ به للتّنقيح (انظر <a href="#Exercise-5_002e16">التمرين 5.16</a>).</p>
<p>وعناصر جدول اللصائق هي أزواج:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-label-entry</span> label-name insts)
  (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> label-name insts))
</code></pre>
<p>وسيُبحَث عن المُدخلات في الجدول بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">lookup-label</span> labels label-name)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">val</span> (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> label-name labels)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> val
        (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> val)
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Undefined label: ASSEMBLE&quot;</span> 
               label-name))))
</code></pre>
<p><strong>التمرين 5.8:</strong> إنّ شيفرة آلة المسجّلات التالية غامضة، لأنّ اللصيقة <code>here</code> مُعرَّفةٌ أكثر من مرّة:</p>
<pre><code class="language-scheme">start
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> here))
here
  (<span class="hljs-name">assign</span> a (<span class="hljs-name">const</span> <span class="hljs-number">3</span>))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> there))
here
  (<span class="hljs-name">assign</span> a (<span class="hljs-name">const</span> <span class="hljs-number">4</span>))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> there))
there
</code></pre>
<p>بالمُحاكي كما هو مكتوب، فماذا ستكون محتويات المسجّل <code>a</code> حين يبلغ التحكّم <code>there</code>؟ عدّل الإجراء <code>extract-labels</code> بحيث يُشير المُجمِّع إلى خطأٍ إذا استُخدم اسم اللصيقة ذاته للإشارة إلى موضعين مختلفين.</p>
<h4>5.2.3 توليد إجراءات تنفيذ التعليمات</h4>
<p>يَنداء المُجمِّع <code>make-execution-procedure</code> لتوليد إجراء تنفيذ تعليمةٍ. فمثل الإجراء <code>analyze</code> في مقيّم <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>، فإنّه يُوزّع على نوع التعليمة لتوليد إجراء التنفيذ المناسب.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-execution-procedure</span> 
         inst labels machine pc flag stack ops)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;assign</span>)
         (<span class="hljs-name">make-assign</span> 
          inst machine labels ops pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;test</span>)
         (<span class="hljs-name">make-test</span> 
          inst machine labels ops flag pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;branch</span>)
         (<span class="hljs-name">make-branch</span> 
          inst machine labels flag pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;goto</span>)
         (<span class="hljs-name">make-goto</span> inst machine labels pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;save</span>)
         (<span class="hljs-name">make-save</span> inst machine stack pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;restore</span>)
         (<span class="hljs-name">make-restore</span> inst machine stack pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;perform</span>)
         (<span class="hljs-name">make-perform</span>
          inst machine labels ops pc))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown instruction 
                      type: ASSEMBLE&quot;</span>
                     inst))))
</code></pre>
<p>فلكلّ نوعٍ من التعليمات في لغة آلات المسجّلات، هناك مُولِّدٌ يبني إجراء تنفيذٍ مناسبًا. وتفاصيل هذه الإجراءات تحدّد صياغة تعليمات لغة آلات المسجّلات الفرديّة ومعناها جميعًا. ونحن نستخدم تجريد البيانات لعزل الصياغة المفصّلة لتعبيرات آلات المسجّلات عن آليّة التنفيذ العامّة، كما فعلنا مع المقيّمات في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2">4.1.2</a>، وذلك باستخدام إجراءات الصياغة لاستخراج أجزاء التعليمة وتصنيفها.</p>
<h4>تعليمات <code>Assign</code></h4>
<p>إنّ الإجراء <code>make-assign</code> يتعامل مع تعليمات <code>assign</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-assign</span> 
         inst machine labels operations pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">target</span> 
         (<span class="hljs-name">get-register</span> 
          machine 
          (<span class="hljs-name">assign-reg-name</span> inst)))
        (<span class="hljs-name">value-exp</span> (<span class="hljs-name">assign-value-exp</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">value-proc</span>
           (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">operation-exp?</span> value-exp)
               (<span class="hljs-name">make-operation-exp</span>
                value-exp 
                machine
                labels
                operations)
               (<span class="hljs-name">make-primitive-exp</span>
                (<span class="hljs-name"><span class="hljs-built_in">car</span></span> value-exp)
                machine
                labels))))
      (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()   <span class="hljs-comment">; execution procedure</span>
                   <span class="hljs-comment">; for assign</span>
        (<span class="hljs-name">set-contents!</span> target (<span class="hljs-name">value-proc</span>))
        (<span class="hljs-name">advance-pc</span> pc)))))
</code></pre>
<p>يستخرج <code>Make-assign</code> اسم المسجّل الهدف (العنصر الثاني من التعليمة) وتعبير القيمة (بقيّة القائمة التي تشكّل التعليمة) من تعليمة <code>assign</code> باستخدام المحدِّدات</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">assign-reg-name</span> assign-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> assign-instruction))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">assign-value-exp</span> assign-instruction)
  (<span class="hljs-name">cddr</span> assign-instruction))
</code></pre>
<p>يُبحَث عن اسم المسجّل بـ<code>get-register</code> لإنتاج كائن المسجّل الهدف. وتعبير القيمة يُمرَّر إلى <code>make-operation-exp</code> إذا كانت القيمة نتيجة عمليّة، وإلى <code>make-primitive-exp</code> وإلّا. وهذه الإجراءات (المبيَّنة أدناه) تُحلّل تعبير القيمة وتُنتج إجراء تنفيذٍ للقيمة. وهذا إجراءٌ بلا معطيات، يُسمّى <code>value-proc</code>، سيُقيَّم أثناء المحاكاة لإنتاج القيمة الفعليّة التي ستُحلَّ في المسجّل. ولاحِظ أنّ عمل البحث عن اسم المسجّل وتحليل تعبير القيمة يُؤدّى مرّةً واحدةً فقط، في وقت التجميع، لا في كلّ مرّةٍ تُحاكى فيها التعليمة. وهذا الاقتصاد في العمل هو سبب استخدامنا إجراءات التنفيذ، ويقابل مباشرةً الاقتصاد في العمل الذي حصلنا عليه بفصل تحليل البرنامج عن تنفيذه في مقيّم <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>.</p>
<p>والنتيجة التي يُعيدها <code>make-assign</code> هي إجراء تنفيذ تعليمة <code>assign</code>. وحين يُنداء هذا الإجراء (بإجراء <code>execute</code> الخاصّ بنموذج الآلة)، فإنّه يضبط محتويات المسجّل الهدف بالقيمة المتحصّلة من تنفيذ <code>value-proc</code>. ثم يُقدّم <code>pc</code> إلى التعليمة التالية بتشغيل الإجراء</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">advance-pc</span> pc)
  (<span class="hljs-name">set-contents!</span> pc (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> (<span class="hljs-name">get-contents</span> pc))))
</code></pre>
<p>إنّ <code>Advance-pc</code> هي النهاية الطبيعيّة لجميع التعليمات ما عدا <code>branch</code> و<code>goto</code>.</p>
<h4>تعليمات <code>Test</code> و<code>branch</code> و<code>goto</code></h4>
<p>يتعامل <code>Make-test</code> مع تعليمات <code>test</code> على نحوٍ مماثل. فإنّه يستخرج التعبير الذي يحدّد الشرط المراد اختباره ويولّد إجراء تنفيذٍ له. في وقت المحاكاة، يُنداء إجراء الشرط، وتُحلّ النتيجة في المسجّل <code>flag</code>، ويُقدَّم <code>pc</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> 
  (<span class="hljs-name">make-test</span> 
   inst machine labels operations flag pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">condition</span> (<span class="hljs-name">test-condition</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">operation-exp?</span> condition)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">condition-proc</span>
               (<span class="hljs-name">make-operation-exp</span>
                condition 
                machine
                labels
                operations)))
          (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
            (<span class="hljs-name">set-contents!</span> 
             flag (<span class="hljs-name">condition-proc</span>))
            (<span class="hljs-name">advance-pc</span> pc)))
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad TEST instruction: 
                ASSEMBLE&quot;</span> inst))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">test-condition</span> test-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> test-instruction))
</code></pre>
<p>يفحص إجراء التنفيذ الخاص بتعليمة <code>branch</code> محتويات مسجّل <code>flag</code> وإمّا أن يضبط محتويات <code>pc</code> على مقصد التفريع (إذا أُخذ التفريع) وإمّا أن يُقدّم <code>pc</code> فقط (إذا لم يُؤخذ التفريع). لاحِظ أنّ المقصد المُشار إليه في تعليمة <code>branch</code> يجب أن يكون لافتة، وإجراء <code>make-branch</code> يفرض ذلك. لاحِظ أيضًا أنّ اللافتة تُبحَث عند التجميع، لا في كلّ مرّةٍ تُحاكى فيها تعليمة <code>branch</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> 
  (<span class="hljs-name">make-branch</span> 
   inst machine labels flag pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">dest</span> (<span class="hljs-name">branch-dest</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">label-exp?</span> dest)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span>
               (<span class="hljs-name">lookup-label</span> 
                labels 
                (<span class="hljs-name">label-exp-label</span> dest))))
          (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
            (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">get-contents</span> flag)
                (<span class="hljs-name">set-contents!</span> pc insts)
                (<span class="hljs-name">advance-pc</span> pc))))
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad BRANCH instruction: 
                ASSEMBLE&quot;</span>
               inst))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">branch-dest</span> branch-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> branch-instruction))
</code></pre>
<p>تشبه تعليمة <code>goto</code> التفريع، إلّا أنّ المقصد يمكن أن يُحدَّد إمّا كلافتةٍ وإمّا كمسجّل، ولا يوجد شرطٌ يُفحص — فـ<code>pc</code> يُضبَط دائمًا على المقصد الجديد.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-goto</span> inst machine labels pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">dest</span> (<span class="hljs-name">goto-dest</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name">label-exp?</span> dest)
           (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span>
                  (<span class="hljs-name">lookup-label</span> 
                   labels
                   (<span class="hljs-name">label-exp-label</span> dest))))
             (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
               (<span class="hljs-name">set-contents!</span> pc insts))))
          ((<span class="hljs-name">register-exp?</span> dest)
           (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">reg</span>
                  (<span class="hljs-name">get-register</span> 
                   machine
                   (<span class="hljs-name">register-exp-reg</span> dest))))
             (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
               (<span class="hljs-name">set-contents!</span> 
                pc
                (<span class="hljs-name">get-contents</span> reg)))))
          (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad GOTO instruction: 
                        ASSEMBLE&quot;</span>
                       inst)))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">goto-dest</span> goto-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> goto-instruction))
</code></pre>
<h4>تعليمات أخرى</h4>
<p>تستخدم تعليمتا المكدس <code>save</code> و<code>restore</code> المكدس مع المسجّل المُعيَّن ببساطةٍ وتُقدّمان <code>pc</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-save</span> inst machine stack pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">reg</span> (<span class="hljs-name">get-register</span> 
              machine
              (<span class="hljs-name">stack-inst-reg-name</span> inst))))
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
      (<span class="hljs-name">push</span> stack (<span class="hljs-name">get-contents</span> reg))
      (<span class="hljs-name">advance-pc</span> pc))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-restore</span> inst machine stack pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">reg</span> (<span class="hljs-name">get-register</span>
              machine
              (<span class="hljs-name">stack-inst-reg-name</span> inst))))
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
      (<span class="hljs-name">set-contents!</span> reg (<span class="hljs-name">pop</span> stack))
      (<span class="hljs-name">advance-pc</span> pc))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">stack-inst-reg-name</span> 
         stack-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> stack-instruction))
</code></pre>
<p>إنّ نوع التعليمة الأخير، الذي يتعامل معه <code>make-perform</code>، يُنشئ إجراء تنفيذٍ للفعل الذي ينبغي أداؤه. وفي وقت المحاكاة، يُنفَّذ إجراء الفعل ويُقدَّم <code>pc</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-perform</span> 
         inst machine labels operations pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">action</span> (<span class="hljs-name">perform-action</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">operation-exp?</span> action)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">action-proc</span>
               (<span class="hljs-name">make-operation-exp</span>
                action
                machine
                labels
                operations)))
          (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
            (<span class="hljs-name">action-proc</span>)
            (<span class="hljs-name">advance-pc</span> pc)))
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad PERFORM instruction: 
                ASSEMBLE&quot;</span>
               inst))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">perform-action</span> inst) (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> inst))
</code></pre>
<h4>إجراءات تنفيذ التعابير الجزئيّة</h4>
<p>قد تكون قيمة تعبير <code>reg</code> أو <code>label</code> أو <code>const</code> لازمةً للإحلال إلى مسجّل (<code>make-assign</code>) أو كمدخلٍ لعمليّة (<code>make-operation-exp</code>، أدناه). والإجراء الآتي يُنشئ إجراءات تنفيذٍ لإنتاج قيم هذه التعابير أثناء المحاكاة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-primitive-exp</span> exp machine labels)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name">constant-exp?</span> exp)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">c</span> (<span class="hljs-name">constant-exp-value</span> exp)))
           (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () c)))
        ((<span class="hljs-name">label-exp?</span> exp)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span>
                (<span class="hljs-name">lookup-label</span> 
                 labels
                 (<span class="hljs-name">label-exp-label</span> exp))))
           (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () insts)))
        ((<span class="hljs-name">register-exp?</span> exp)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">r</span> (<span class="hljs-name">get-register</span>
                   machine
                   (<span class="hljs-name">register-exp-reg</span> exp))))
           (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () (<span class="hljs-name">get-contents</span> r))))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown expression type: 
                      ASSEMBLE&quot;</span>
                     exp))))
</code></pre>
<p>تُحدَّد صياغة تعابير <code>reg</code> و<code>label</code> و<code>const</code> بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">register-exp?</span> exp)
  (<span class="hljs-name">tagged-list?</span> exp <span class="hljs-symbol">&#x27;reg</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">register-exp-reg</span> exp)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> exp))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">constant-exp?</span> exp)
  (<span class="hljs-name">tagged-list?</span> exp <span class="hljs-symbol">&#x27;const</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">constant-exp-value</span> exp)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> exp))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">label-exp?</span> exp)
  (<span class="hljs-name">tagged-list?</span> exp <span class="hljs-symbol">&#x27;label</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">label-exp-label</span> exp) 
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> exp))
</code></pre>
<p>قد تتضمّن تعليمات <code>assign</code> و<code>perform</code> و<code>test</code> تطبيق عمليّة آلةٍ (مُحدَّدةً بتعبير <code>op</code>) على بعض العوامل (مُحدَّدةً بتعبيرات <code>reg</code> و<code>const</code>). والإجراء الآتي يُنتج إجراء تنفيذٍ «لتعبير عمليّة» — وهو قائمةٌ تحتوي تعبير العمليّة وتعبيرات العوامل الآتية من التعليمة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-operation-exp</span>
         exp machine labels operations)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">op</span> (<span class="hljs-name">lookup-prim</span> 
             (<span class="hljs-name">operation-exp-op</span> exp)
             operations))
        (<span class="hljs-name">aprocs</span>
         (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (e)
                (<span class="hljs-name">make-primitive-exp</span> 
                 e machine labels))
              (<span class="hljs-name">operation-exp-operands</span> exp))))
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () (<span class="hljs-name"><span class="hljs-built_in">apply</span></span> op (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (p) (<span class="hljs-name">p</span>))
                              aprocs)))))
</code></pre>
<p>تُحدَّد صياغة تعابير العمليّات بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">operation-exp?</span> exp)
  (<span class="hljs-name"><span class="hljs-built_in">and</span></span> (<span class="hljs-name"><span class="hljs-built_in">pair?</span></span> exp)
       (<span class="hljs-name">tagged-list?</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> exp) <span class="hljs-symbol">&#x27;op</span>)))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">operation-exp-op</span> operation-exp)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> operation-exp)))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">operation-exp-operands</span> operation-exp)
  (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> operation-exp))
</code></pre>
<p>لاحِظ أنّ معالجة تعابير العمليّات تشبه إلى حدٍّ بعيدٍ معالجة تطبيقات الإجراءات التي يجريها الإجراء <code>analyze-application</code> في المقيّم الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>، من حيث أنّنا نُنشئ إجراء تنفيذٍ لكلّ عامل. وفي وقت المحاكاة، نستدعي إجراءات العوامل ونطبّق إجراء Scheme الذي يحاكي العمليّة على القيم الناتجة. ويُوجَد إجراء المحاكاة بالبحث عن اسم العمليّة في جدول عمليّات الآلة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">lookup-prim</span> symbol operations)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">val</span> (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> symbol operations)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> val
        (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> val)
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown operation: ASSEMBLE&quot;</span>
               symbol))))
</code></pre>
<blockquote>
<p><strong>التمرين 5.9:</strong> إنّ معالجة عمليّات الآلة أعلاه تسمح لها بالعمل على اللافتات إضافةً إلى الثوابت ومحتويات المسجّلات. عدّل إجراءات معالجة التعابير لفرض الشرط القائل إنّ العمليّات لا يمكن استخدامها إلّا مع المسجّلات والثوابت.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.10:</strong> صمِّم صياغةً جديدةً لتعليمات آلة المسجّلات وعدّل المحاكي ليستخدم صياغتك الجديدة. فهل تستطيع تنفيذ صياغتك الجديدة دون تغيير أيّ جزءٍ من المحاكي ما عدا إجراءات الصياغة في هذا القسم؟</p>
</blockquote>
<p><strong>التمرين 5.11:</strong> حين استحدثنا <code>save</code> و<code>restore</code> في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e4">5.1.4</a>، لم نُحدّد ما يحدث إذا حاولت استعادة مسجّلٍ ليس آخر ما حُفظ، كما في التسلسل</p>
<pre><code class="language-scheme">(<span class="hljs-name">save</span> y)
(<span class="hljs-name">save</span> x)
(<span class="hljs-name">restore</span> y)
</code></pre>
<p>ثمّة عدّة احتمالاتٍ معقولةٍ لمعنى <code>restore</code>:</p>
<ol>
<li><code>(restore y)</code> يضع في <code>y</code> آخر قيمةٍ حُفظت في المكدس، أياً يكن المسجّل الذي جاءت منه تلك القيمة. وهذا هو سلوك محاكينا. أظهر كيف يمكن استثمار هذا السلوك لإلغاء تعليمةٍ واحدةٍ من آلة فيبوناتشي الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e4">5.1.4</a> (<a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12">الشكل 5.12</a>).</li>
<li><code>(restore y)</code> يضع في <code>y</code> آخر قيمةٍ حُفظت في المكدس، لكن فقط إذا كانت تلك القيمة قد حُفظت من <code>y</code>؛ وإلّا فإنّه يُشير إلى خطأٍ. عدّل المحاكي ليسلوك هذا السلوك. سيتعيّن عليك تغيير <code>save</code> ليضع اسم المسجّل في المكدس إلى جانب القيمة.</li>
<li><code>(restore y)</code> يضع في <code>y</code> آخر قيمةٍ حُفظت من <code>y</code> أياً تكن المسجّلات الأخرى التي حُفظت بعد <code>y</code> ولم تُستعَد. عدّل المحاكي ليسلوك هذا السلوك. سيتعيّن عليك ربط مكدسٍ منفصلٍ بكلّ مسجّلٍ. وينبغي أن تجعل عمليّة <code>initialize-stack</code> تُهيّئ جميع مكدسات المسجّلات.</li>
</ol>
<blockquote>
<p><strong>التمرين 5.12:</strong> يمكن استخدام المحاكي للمساعدة في تحديد مسار البيانات المطلوب لتنفيذ آلةٍ بمتحكّمٍ معطى. وسّع المُجمِّع ليخزّن المعلومات الآتية في نموذج الآلة: قائمةٌ بجميع التعليمات، بعد إزالة المكرّر منها، مرتّبةً بحسب نوع التعليمة (<code>assign</code> و<code>goto</code> وما شابه)؛</p>
<blockquote>
<p>قائمةٌ (دون مكرّراتٍ) بالمسجّلات المستخدمة لحفظ نقاط الدخول (وهي المسجّلات التي تشير إليها تعليمات <code>goto</code>)؛
قائمةٌ (دون مكرّراتٍ) بالمسجّلات التي تُحفَظ بـ<code>save</code> أو تُستعَد بـ<code>restore</code>؛
وبالنسبة لكلّ مسجّلٍ، قائمةٌ (دون مكرّراتٍ) بالمصادر التي يُحلَّل منها (فمثلًا، مصادر المسجّل <code>val</code> في آلة العامليّة الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11">الشكل 5.11</a> هي <code>(const 1)</code> و<code>((op *) (reg n) (reg val))</code>).</p>
<p>وسّع واجهة تمرير الرسائل إلى الآلة لتوفير النفاذ إلى هذه المعلومات الجديدة. ولاختبار مُحلِّلك، عرّف آلة فيبوناتشي من <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12">الشكل 5.12</a> وافحص القوائم التي بنيتها.</p>
</blockquote>
</blockquote>
<blockquote>
<p><strong>التمرين 5.13:</strong> عدّل المحاكي كي يستخدم تسلسل المتحكّم لتحديد المسجّلات التي تمتلكها الآلة بدلًا من اشتراط قائمةٍ بالمسجّلات كمعطىً لـ<code>make-machine</code>. فبدلًا من تخصيص المسجّلات مُسبقًا في <code>make-machine</code>، يمكنك تخصيصها واحدةً تلو الأخرى حين تُشاهَد أوّلَ مرّةٍ أثناء تجميع التعليمات.</p>
</blockquote>
<h4>5.2.4 مراقبة أداء الآلة</h4>
<p>المحاكاة مفيدةٌ لا للتحقّق من صحّة تصميم آلةٍ مقترحةٍ فحسب، بل أيضًا لقياس أداء الآلة. فإنّا نستطيع، مثلًا، تثبيت «مقياس» في برنامج المحاكاة لدينا يقيس عدد عمليّات المكدس المستخدمة في احتسابٍ ما. ولفعل ذلك، نعدّل مكدسنا المحاكى كي يُتابع عدد المرّات التي تُحفَظ فيها المسجّلات في المكدس وأقصى عمقٍ يبلغه المكدس، ونُضيف رسالةً إلى واجهة المكدس تطبع الإحصائيّات، كما هو موضّح أدناه. ونُضيف أيضًا عمليّةً إلى نموذج الآلة الأساسيّ لطبع إحصائيّات المكدس، بتهيئة <code>the-ops</code> في <code>make-new-machine</code> إلى</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">list</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;initialize-stack</span>
            (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
              (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;initialize</span>)))
      (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;print-stack-statistics</span>
            (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
              (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;print-statistics</span>))))
</code></pre>
<p>وها هو الإصدار الجديد من <code>make-stack</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-stack</span>)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">s</span> &#x27;())
        (<span class="hljs-name">number-pushes</span> <span class="hljs-number">0</span>)
        (<span class="hljs-name">max-depth</span> <span class="hljs-number">0</span>)
        (<span class="hljs-name">current-depth</span> <span class="hljs-number">0</span>))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">push</span> x)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> x s))
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> number-pushes (<span class="hljs-name"><span class="hljs-built_in">+</span></span> <span class="hljs-number">1</span> number-pushes))
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> current-depth (<span class="hljs-name"><span class="hljs-built_in">+</span></span> <span class="hljs-number">1</span> current-depth))
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> max-depth 
            (<span class="hljs-name"><span class="hljs-built_in">max</span></span> current-depth max-depth)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">pop</span>)
      (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> s)
          (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Empty stack: POP&quot;</span>)
          (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">top</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s)))
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s))
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> current-depth
                  (<span class="hljs-name"><span class="hljs-built_in">-</span></span> current-depth <span class="hljs-number">1</span>))
            top)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">initialize</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s &#x27;())
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> number-pushes <span class="hljs-number">0</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> max-depth <span class="hljs-number">0</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> current-depth <span class="hljs-number">0</span>)
      <span class="hljs-symbol">&#x27;done</span>)

    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">print-statistics</span>)
      (<span class="hljs-name"><span class="hljs-built_in">newline</span></span>)
      (<span class="hljs-name"><span class="hljs-built_in">display</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;total-pushes</span> 
                     <span class="hljs-symbol">&#x27;=</span> 
                     number-pushes
                     <span class="hljs-symbol">&#x27;maximum-depth</span>
                     <span class="hljs-symbol">&#x27;=</span>
                     max-depth)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
      (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;push</span>) push)
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;pop</span>) (<span class="hljs-name">pop</span>))
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;initialize</span>)
             (<span class="hljs-name">initialize</span>))
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;print-statistics</span>)
             (<span class="hljs-name">print-statistics</span>))
            (<span class="hljs-name"><span class="hljs-built_in">else</span></span>
             (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: STACK&quot;</span>
                    message))))
    dispatch))
</code></pre>
<p>يصف <a href="#Exercise-5_002e15">التمرين 5.15</a> إلى <a href="#Exercise-5_002e19">التمرين 5.19</a> ميزات مراقبةٍ وتنقيحٍ مفيدةً أخرى يمكن إضافتها إلى محاكي آلة المسجّلات.</p>
<blockquote>
<p><strong>التمرين 5.14:</strong> قِس عدد الدفعات وأقصى عمقٍ للمكدس اللازمين لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> لقيمٍ صغيرةٍ متنوّعةٍ لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> باستخدام آلة العامليّة الموضّحة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11">الشكل 5.11</a>. واستنبط من بياناتك صيغًا بدلالة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> للعدد الكلّي لعمليّات الدفع ولأقصى عمقٍ للمكدس يُستخدم في احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> لأيّ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>&gt;</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n &gt; 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> . ولاحِظ أنّ كُلًّا من هذين دالّةٌ خطّيّةٌ في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> وبالتالي تُحدَّد بثابتين. ولكي تُطبع الإحصائيّات، سيتعيّن عليك توسيع آلة العامليّة بتعليماتِ تهيئة المكدس وطبع الإحصائيّات. وقد ترغب أيضًا في تعديل الآلة كي تقرأ قيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> مرارًا، وتحسب العامليّة، وتطبع النتيجة (كما فعلنا لآلة القاسم المشترك الأكبر في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e4">الشكل 5.4</a>)، بحيث لا يضطرّك الأمر إلى استدعاء <code>get-register-contents</code> و<code>set-register-contents!</code> و<code>start</code> مرارًا.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.15:</strong> أضِف <em>عدّ التعليمات</em> إلى محاكاة آلة المسجّلات. أي اجعل نموذج الآلة يُتابع عدد التعليمات المُنفَّذة. وسّع واجهة نموذج الآلة لتقبل رسالةً جديدةً تطبع قيمة عدّاد التعليمات وتُصفّر العدّاد.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.16:</strong> وسّع المحاكي ليتيح <em>تتبّع التعليمات</em>. أي قبل تنفيذ كلّ تعليمةٍ، ينبغي أن يطبع المحاكي نصّ التعليمة. واجعل نموذج الآلة يقبل رسالتي <code>trace-on</code> و<code>trace-off</code> لتشغيل التتبّع وإيقافه.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.17:</strong> وسّع تتبّع التعليمات الوارد في <a href="#Exercise-5_002e16">التمرين 5.16</a> بحيث يطبع المحاكي، قبل طبع تعليمةٍ ما، أيّ لافتاتٍ تسبق تلك التعليمة مباشرةً في تسلسل المتحكّم. واحرص على فعل ذلك بطريقةٍ لا تتداخل مع عدّ التعليمات (<a href="#Exercise-5_002e15">التمرين 5.15</a>). وسيتعيّن عليك أن تجعل المحاكي يحتفظ بمعلومات اللافتات اللازمة.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.18:</strong> عدّل إجراء <code>make-register</code> الوارد في <a href="#g_t5_002e2_002e1">5.2.1</a> بحيث يمكن تتبّع المسجّلات. وينبغي أن تقبل المسجّلات رسائل تُشغّل التتبّع وتُوقفه. وحين يُتْبَع مسجّلٌ ما، ينبغي أن يطبع إحلال قيمةٍ إلى المسجّل اسم المسجّل والمحتويات القديمة للمسجّل والمحتويات الجديدة التي تُحلَّل إليها. وسّع الواجهة إلى نموذج الآلة لتسمح لك بتشغيل التتبّع وإيقافه لمسجّلات آلةٍ معيَّنةٍ منها.</p>
</blockquote>
<p><strong>التمرين 5.19:</strong> تُريد أليسا ب. هاكر ميزة <em>نقطة توقّف</em> في المحاكي تساعدها على تنقيح تصاميم آلاتها. وقد عُهد إليك بتثبيت هذه الميزة لها. وهي تُريد أن تكون قادرةً على تحديد موضعٍ في تسلسل المتحكّم يتوقّف عنده المحاكي ويتيح لها فحص حالة الآلة. ومهمّتك تنفيذ الإجراء</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-breakpoint</span> ⟨machine⟩ ⟨label⟩ ⟨n⟩)
</code></pre>
<p>الذي يضع نقطة توقّفٍ قبل التعليمة رقم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>n</mi><mrow><mi>t</mi><mi>h</mi></mrow></msup></mrow><annotation encoding="application/x-tex">n^{th}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight">h</span></span></span></span></span></span></span></span></span></span></span></span> بعد اللافتة المعطاة. مثلًا،</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-breakpoint</span> gcd-machine <span class="hljs-symbol">&#x27;test-b</span> <span class="hljs-number">4</span>)
</code></pre>
<p>يثبّت نقطة توقّفٍ في <code>gcd-machine</code> قبل الإحلال إلى المسجّل <code>a</code>. وحين يبلغ المحاكي نقطة التوقّف، ينبغي أن يطبع اللافتة وإزاحة نقطة التوقّف وأن يتوقّف عن تنفيذ التعليمات. وبوسع أليسا حينها استخدام <code>get-register-contents</code> و<code>set-register-contents!</code> للتلاعب بحالة الآلة المحاكاة. وينبغي أن تقدر بعد ذلك على متابعة التنفيذ بقولها</p>
<pre><code class="language-scheme">(<span class="hljs-name">proceed-machine</span> ⟨machine⟩)
</code></pre>
<p>وينبغي أن تقدر أيضًا على إزالة نقطة توقّفٍ معيّنةٍ بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">cancel-breakpoint</span> ⟨machine⟩ ⟨label⟩ ⟨n⟩)
</code></pre>
<p>أو على إزالة جميع نقاط التوقّف بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">cancel-all-breakpoints</span> ⟨machine⟩)
</code></pre>
<h3 id="53-تخصيص-التخزين-وجمع-القمامة">5.3 تخصيص التخزين وجمع القمامة</h3>
<p>في القسم <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4">5.4</a>، سنُظهر كيف نُنفّذ مقيّم Scheme بوصفه آلة مسجّلات. ولتبسيط المناقشة، سنفترض أنّ آلات المسجّلات لدينا يمكن تجهيزها بـ<em>ذاكرةٍ مبنيّةٍ على القوائم (list-structured memory)</em>، تكون فيها العمليّات الأساسيّة للتلاعب ببياناتٍ مبنيّةٍ على القوائم أوّليّةً. وافتراض وجود مثل هذه الذاكرة تجريدٌ مفيدٌ حين يكون المرء مُركّزًا على آليّات التحكّم في مفسّر Scheme، لكنّه لا يعكس نظرةً واقعيّةً عن عمليّات البيانات الأوّليّة الفعليّة للحاسبات المعاصرة. ولكي نحصل على صورةٍ أكملَ عن كيف يعمل نظام Lisp، ينبغي أن نبحث كيف يمكن تمثيل بنية القائمة بطريقةٍ متوافقةٍ مع ذاكرات الحاسوب التقليديّة.</p>
<p>ثمّة اعتباران في تنفيذ بنية القائمة. أمّا الأوّل فمسألة تمثيلٍ بحتة: كيف نُمثّل بنية «الصندوق والمؤشّر» (box-and-pointer) لأزواج Lisp، باستخدام قدرات التخزين والمعننة وحدها في ذاكرات الحاسوب النموذجيّة. وأمّا الاعتبار الثاني فيتعلّق بإدارة الذاكرة بينما يمضي الاحتساب. ويعتمد عمل نظام Lisp بشكلٍ حرجيٍّ على القدرة على إنشاء كائنات بياناتٍ جديدةٍ باستمرار. وتشمل هذه كائناتٍ تُنشَأ صراحةً بواسطة إجراءات Lisp التي يجري تفسيرها، فضلًا عن بنى يُنشئها المفسّر نفسه، كالبيئات وقوائم المعطيات. وعلى الرغم من أنّ إنشاء كائنات بياناتٍ جديدةٍ باستمرارٍ لن يُشكّل مشكلةً على حاسوبٍ يمتلك مقدارًا غير محدودٍ من الذاكرة سريعة العنونة، فإنّ ذاكرات الحاسوب متوفّرةٌ بأحجامٍ محدودةٍ فقط (للأسف الشديد). ولهذا تُوفّر أنظمة Lisp تسهيلًا لـ<em>التخصيص التلقائيّ للتخزين (automatic storage allocation)</em> دعّمًا لوهم الذاكرة غير المحدودة. وحين لم يَعد كائن بياناتٍ لازماً، تُعاد الذاكرة المُخصَّصة له تلقائيًّا وتُستخدم لبناء كائنات بياناتٍ جديدة. ثمّة تقنيّاتٌ متنوّعةٌ لتوفير مثل هذا التخصيص التلقائيّ للتخزين. وأمّا الطريقة التي سنناقشها في هذا القسم فتُسمّى <em>جمع القمامة (garbage collection)</em>.</p>
<h4>5.3.1 الذاكرة كمتجهات</h4>
<p>يمكن النظر إلى ذاكرة الحاسوب التقليديّة بوصفها مصفوفةً من الخزائن الصغيرة، كلٌّ منها يمكن أن يحتوي قطعةً من المعلومات. ولكلّ خزانةٍ صغيرةٍ اسمٌ فريد، يُسمّى <em>عنوانها</em> أو <em>موقعها</em>. وتوفّر نظم الذاكرة النموذجيّة عمليّتَين أوّليّتَين: إحداهما تجلب البيانات المخزّنة في موقعٍ محدَّدٍ، والأخرى تُحلّل بيانات جديدة إلى موقعٍ محدَّدٍ. ويمكن زيادة عناوين الذاكرة لدعم النفاذ المتسلسل إلى مجموعةٍ ما من الخزائن الصغيرة. وبصورةٍ أعمّ، فإنّ عمليّات بياناتٍ مهمّةً كثيرةً تتطلّب أن تُعامَل عناوين الذاكرة كبياناتٍ، يمكن تخزينها في مواقع الذاكرة والتلاعب بها في مسجّلات الآلة. وتمثيل بنية القائمة أحد تطبيقات ما يُعرف بـ<em>حساب العناوين (address arithmetic)</em>.</p>
<p>ولنمذجة ذاكرة الحاسوب، نستخدم نوعًا جديدًا من بنى البيانات يُسمّى <em>متجهًا (vector)</em>. وتجرّديًّا، المتجه كائن بياناتٍ مركّبٌ يمكن النفاذ إلى عناصره الفرديّة بواسطة فهرس (index) صحيحٍ في مقدارٍ من الزمن مستقلٌّ عن الفهرس.<sup class="footnote-ref"><a href="#fn5" id="fnref5">[5]</a></sup> ولكي نوصف عمليّات الذاكرة، نستخدم إجراءَي Scheme أوّليّين للتلاعب بالمتجهات:</p>
<ul>
<li>يُعيد <code>(vector-ref ⟨vector⟩ ⟨n⟩)</code> العنصر رقم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>n</mi><mrow><mi>t</mi><mi>h</mi></mrow></msup></mrow><annotation encoding="application/x-tex">n^{th}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight">h</span></span></span></span></span></span></span></span></span></span></span></span> من المتجه.</li>
<li>يضبط <code>(vector-set! ⟨vector⟩ ⟨n⟩ ⟨value⟩)</code> العنصر رقم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>n</mi><mrow><mi>t</mi><mi>h</mi></mrow></msup></mrow><annotation encoding="application/x-tex">n^{th}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight">h</span></span></span></span></span></span></span></span></span></span></span></span> من المتجه على القيمة المعيَّنة.</li>
</ul>
<p>فمثلًا، إذا كان <code>v</code> متجهًا، فإنّ <code>(vector-ref v 5)</code> يُحضِر المدخل الخامس في المتجه <code>v</code> و<code>(vector-set! v 5 7)</code> يُغيّر قيمة المدخل الخامس في المتجه <code>v</code> إلى 7.<sup class="footnote-ref"><a href="#fn6" id="fnref6">[6]</a></sup> أمّا في ذاكرة الحاسوب، فيمكن تنفيذ هذا النفاذ باستخدام حساب العناوين لدمج <em>عنوانٍ أساس (base address)</em> يُحدّد موقع البداية لمتجهٍ في الذاكرة مع فهرس يُحدّد إزاحة عنصرٍ معيّنٍ من المتجه.</p>
<h4>تمثيل بيانات Lisp</h4>
<p>نستطيع استخدام المتجهات لتنفيذ بنى الأزواج الأساسيّة المطلوبة لذاكرةٍ مبنيّةٍ على القوائم (list-structured memory). فلنتخيّل أنّ ذاكرة الحاسوب مقسومةٌ إلى متجهين: <code>the-cars</code> و<code>the-cdrs</code>. وسنمثّل بنية القائمة على النحو الآتي: المؤشّر إلى زوجٍ هو فهرسٌ في المتجهين. و<code>car</code> الزوج هو المدخل في <code>the-cars</code> بالفهرس المعيَّن، و<code>cdr</code> الزوج هو المدخل في <code>the-cdrs</code> بالفهرس المعيَّن. ونحتاج أيضًا إلى تمثيلٍ لكائناتٍ غير الأزواج (كالأعداد والرموز) وإلى طريقةٍ لتمييز نوع بياناتٍ عن آخر. ثمّة طرائق كثيرةٌ لإنجاز ذلك، لكنّها جميعًا تُختزل إلى استخدام <em>مؤشّراتٍ معمَّمة النوع (typed pointers)</em>، أي توسيع مفهوم «المؤشّر» ليشمل معلومات عن نوع البيانات.<sup class="footnote-ref"><a href="#fn7" id="fnref7">[7]</a></sup> ويمكّن نوع البيانات النظام من تمييز مؤشّرٍ إلى زوجٍ (وهو يتألّف من نوع البيانات «زوج» وفهرسٍ في متجهي الذاكرة) عن المؤشّرات إلى أنواع البيانات الأخرى (والتي تتألّف من نوع بياناتٍ آخر وممّا يُستخدم لتمثيل بيانات ذلك النوع). ويُعتبر كائنا بياناتٍ متطابقين (<code>eq?</code>) إذا كانت مؤشّراتهما متطابقة.<sup class="footnote-ref"><a href="#fn8" id="fnref8">[8]</a></sup> ويُوضيّح <a href="#Figure-5_002e14">الشكل 5.14</a> استخدام هذه الطريقة لتمثيل القائمة <code>((1 2) 3 4)</code>، التي يُعرَض مخطّط الصندوق والمؤشّر لها أيضًا. ونستخدم بادئاتٍ حرفيّةً للدلالة على معلومات نوع البيانات. وهكذا، يُرمز إلى المؤشّر إلى الزوج ذي الفهرس 5 بـ<code>p5</code>، وتُرمَّز القائمة الخالية بمؤشّر <code>e0</code>، ويُرمز إلى المؤشّر إلى العدد 4 بـ<code>n4</code>. وفي مخطّط الصندوق والمؤشّر، أشرنا أسفل يسار كلّ زوجٍ إلى فهرس المتجه الذي يُحدّد أين تُخزَّن <code>car</code> الزوج و<code>cdr</code> الزوج. والمواقع الخالية في <code>the-cars</code> و<code>the-cdrs</code> قد تحتوي أجزاءً من بنى قوائمَ أخرى (غير ذات أهمّيّةٍ هنا).</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-0-Fig5.14b.std.webp" alt=""></p>
<p><strong>الشكل 5.14:</strong> تمثيل القائمة <code>((1 2) 3 4)</code> بمخطّط الصندوق والمؤشّر وبمتجهي الذاكرة.</p>
<p>وقد يتألّف المؤشّر إلى عددٍ، مثل <code>n4</code>، من نوعٍ يدلّ على بيانات عدديّةٍ إلى جانب التمثيل الفعليّ للعدد 4.<sup class="footnote-ref"><a href="#fn9" id="fnref9">[9]</a></sup> ولكي نتعامل مع الأعداد التي هي كبيرةٌ بحيث لا يمكن تمثيلها في المقدار الثابت من المساحة المُخصَّصة لمؤشّرٍ واحدٍ، فبوسعنا استخدام نوع بياناتٍ مستقلٍّ هو <em>الأعداد الضخمة (bignum)</em>، يكون فيه المؤشّر مُعيِّنًا لقائمةٍ تُخزَّن فيها أجزاء العدد.<sup class="footnote-ref"><a href="#fn10" id="fnref10">[10]</a></sup></p>
<p>وقد يُمثَّل الرمز بمؤشّرٍ معمَّم النوع يُعيِّن تسلسلًا من المحارف التي تشكّل التمثيل المطبوع للرمز. ويُنشَأ هذا التسلسل بواسطة قارئ Lisp حين تُواجَه سلسلة المحارف أوّلَ ما تُواجَه في المُدخَل. وحيث إنّا نُريد أن يُتعرَّف على نسختين من رمزٍ بوصفهما «الرمز ذاته» بواسطة <code>eq?</code>، ونُريد أن يكون <code>eq?</code> اختبارًا بسيطًا لتساوي المؤشّرات، ينبغي أن نضمن أنّ قارئ الرموز، إذا رأى سلسلة المحارف ذاتها مرّتين، سيستخدم المؤشّر ذاته (إلى تسلسل المحارف ذاته) لتمثيل الحدثين. ولكي يُنجز ذلك، يُمسك القارئ جدولًا، يُسمّى تقليديًّا <em>مصفوفة الرموز (obarray)</em>، بجميع الرموز التي واجهها قطّ. وحين يواجه القارئ سلسلة محارفٍ ويكاد يبني رمزًا، يفحص مصفوفة الرموز ليرى هل واجه سلسلة المحارف ذاتها من قبل. فإن لم يكن قد واجهها، يستخدم المحارف لبناء رمزٍ جديد (مؤشّرٌ معمَّم النوع إلى تسلسل محارفٍ جديد) ويُدخل هذا المؤشّر في مصفوفة الرموز. وإن يكون القارئ قد واجه السلسلة من قبل، يُعيد مؤشّر الرمز المخزّون في مصفوفة الرموز. وتُسمّى عمليّة استبدال سلاسل المحارف بمؤشّراتٍ فريدةٍ <em>إدخال الرموز (interning)</em>.</p>
<h4>تنفيذ عمليّات القائمة الأوّليّة</h4>
<p>وبالنظر إلى مخطّط التمثيل أعلاه، نستطيع استبدال كلّ عمليّة قائمةٍ «أوّليّة» في آلة المسجّلات بعمليّة متجهٍ أوّليّةٍ أو أكثر. وسنستخدم مسجّلين، <code>the-cars</code> و<code>the-cdrs</code>، لتعيين متجهي الذاكرة، وسنفترض أنّ <code>vector-ref</code> و<code>vector-set!</code> متوفّرتان بوصفهما عمليّتَين أوّليّتَين. ونفترض أيضًا أنّ العمليّات العدديّة على المؤشّرات (كتزييد مؤشّرٍ، أو استخدام مؤشّر زوجٍ لفهرسة متجهٍ، أو جمع عددين) لا تستخدم إلّا جزء الفهرس من المؤشّر المعمَّم النوع.</p>
<p>فمثلًا، نستطيع جعل آلة مسجّلاتٍ تدعم التعليمات</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> ⟨reg₁⟩ (<span class="hljs-name">op</span> car) (<span class="hljs-name">reg</span> ⟨reg₂⟩))
(<span class="hljs-name">assign</span> ⟨reg₁⟩ (<span class="hljs-name">op</span> cdr) (<span class="hljs-name">reg</span> ⟨reg₂⟩))
</code></pre>
<p>إذا نفّذناها، على الترتيب، كـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> ⟨reg₁⟩ 
        (<span class="hljs-name">op</span> vector-ref)
        (<span class="hljs-name">reg</span> the-cars)
        (<span class="hljs-name">reg</span> ⟨reg₂⟩))
(<span class="hljs-name">assign</span> ⟨reg₁⟩
        (<span class="hljs-name">op</span> vector-ref)
        (<span class="hljs-name">reg</span> the-cdrs)
        (<span class="hljs-name">reg</span> ⟨reg₂⟩))
</code></pre>
<p>أمّا التعليمات</p>
<pre><code class="language-scheme">(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> set-car!) (<span class="hljs-name">reg</span> ⟨reg₁⟩) (<span class="hljs-name">reg</span> ⟨reg₂⟩))
(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> set-cdr!) (<span class="hljs-name">reg</span> ⟨reg₁⟩) (<span class="hljs-name">reg</span> ⟨reg₂⟩))
</code></pre>
<p>فمنفَّذةٌ كـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
         (<span class="hljs-name">reg</span> the-cars)
         (<span class="hljs-name">reg</span> ⟨reg₁⟩)
         (<span class="hljs-name">reg</span> ⟨reg₂⟩))
(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
         (<span class="hljs-name">reg</span> the-cdrs)
         (<span class="hljs-name">reg</span> ⟨reg₁⟩)
         (<span class="hljs-name">reg</span> ⟨reg₂⟩))
</code></pre>
<p>أمّا <code>cons</code> فيُؤدّى بتخصيص فهرسٍ غير مستخدمٍ وتخزين معطيّ <code>cons</code> في <code>the-cars</code> و<code>the-cdrs</code> في موضع المتجه المُفهرَس بذلك الفهرس. ونفترض وجود مسجّلٍ خاصٍّ، <code>free</code>، يحمل دائمًا مؤشّر زوجٍ يحتوي الفهرس المتوفّر التالي، وأنّه يمكننا تزييد جزء الفهرس من ذلك المؤشّر لإيجاد الموقع الحرّ التالي.<sup class="footnote-ref"><a href="#fn11" id="fnref11">[11]</a></sup> فمثلًا، التعليمة</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> ⟨reg₁⟩
        (<span class="hljs-name">op</span> cons)
        (<span class="hljs-name">reg</span> ⟨reg₂⟩)
        (<span class="hljs-name">reg</span> ⟨reg₃⟩))
</code></pre>
<p>منفَّذةٌ كتسلسل عمليّات المتجه الآتي:<sup class="footnote-ref"><a href="#fn12" id="fnref12">[12]</a></sup></p>
<pre><code class="language-scheme">(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
         (<span class="hljs-name">reg</span> the-cars)
         (<span class="hljs-name">reg</span> free)
         (<span class="hljs-name">reg</span> ⟨reg₂⟩))
(<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
         (<span class="hljs-name">reg</span> the-cdrs)
         (<span class="hljs-name">reg</span> free)
         (<span class="hljs-name">reg</span> ⟨reg₃⟩))
(<span class="hljs-name">assign</span> ⟨reg₁⟩ (<span class="hljs-name">reg</span> free))
(<span class="hljs-name">assign</span> free (<span class="hljs-name">op</span> +) (<span class="hljs-name">reg</span> free) (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
</code></pre>
<p>أمّا عمليّة <code>eq?</code></p>
<pre><code class="language-scheme">(<span class="hljs-name">op</span> eq?) (<span class="hljs-name">reg</span> ⟨reg₁⟩) (<span class="hljs-name">reg</span> ⟨reg₂⟩)
</code></pre>
<p>فتختبر ببساطةٍ تساوي جميع الحقول في المسجّلين، والمسيّمات مثل <code>pair?</code> و<code>null?</code> و<code>symbol?</code> و<code>number?</code> لا تحتاج إلّا إلى فحص حقل النوع.</p>
<h4>تنفيذ المكدسات</h4>
<p>وعلى الرغم من أنّ آلات المسجّلات لدينا تستخدم المكدسات، فليس علينا أن نفعل شيئًا خاصًّا هنا، إذ يمكن نمذجة المكدسات من حيث القوائم. فيمكن أن يكون المكدس قائمةً بالقيم المحفوظة، يُشير إليها مسجّلٌ خاصٌّ هو <code>the-stack</code>. وهكذا، يمكن تنفيذ <code>(save ⟨reg⟩)</code> كـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> the-stack 
        (<span class="hljs-name">op</span> cons)
        (<span class="hljs-name">reg</span> ⟨reg⟩)
        (<span class="hljs-name">reg</span> the-stack))
</code></pre>
<p>وبالمثل، يمكن تنفيذ <code>(restore ⟨reg⟩)</code> كـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> ⟨reg⟩ (<span class="hljs-name">op</span> car) (<span class="hljs-name">reg</span> the-stack))
(<span class="hljs-name">assign</span> the-stack (<span class="hljs-name">op</span> cdr) (<span class="hljs-name">reg</span> the-stack))
</code></pre>
<p>و<code>(perform (op initialize-stack))</code> يمكن تنفيذه كـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> the-stack (<span class="hljs-name">const</span> ()))
</code></pre>
<p>يمكن توسيع هذه العمليّات أكثر بواسطة عمليّات المتجه (vector) المعطاة أعلاه. أمّا في البُنى الحاسوبيّة التقليديّة، فمن المفيدّ عادةً تخصيص المكدّس (stack) متجهًا (vector) منفصلًا. وعندئذٍ يمكن أداء الدفع إلى المكدّس وإخراج القيم منه بزيادة فهرسٍ داخل ذلك المتجه أو إنقاصه.</p>
<p><strong>التمرين 5.20:</strong> ارسم تمثيل الصناديق والمؤشّرات (box-and-pointer) وتمثيل متجه الذاكرة (memory-vector) (كما في <a href="#Figure-5_002e14">الشكل 5.14</a>) لبنية القائمة (list structure) الناتجة عن</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> x (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> <span class="hljs-number">1</span> <span class="hljs-number">2</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> y (<span class="hljs-name"><span class="hljs-built_in">list</span></span> x x))
</code></pre>
<p>حيث يكون مؤشّر <code>free</code> في البدء عند <code>p1</code>. فما القيمة النهائيّة لـ<code>free</code>؟ وأيّ مؤشّرات تمثّل قيمتَي <code>x</code> و<code>y</code>؟</p>
<p><strong>التمرين 5.21:</strong> نفّذ آلات مسجّلاتٍ للإجراءات الآتية. وافترض أنّ عمليّات ذاكرة بنية القوائم متاحة كأوّليّاتٍ آليّة.</p>
<p>نسخة تعاوديّة من <code>count-leaves</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">count-leaves</span> tree)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">null?</span></span> tree) <span class="hljs-number">0</span>)
        ((<span class="hljs-name"><span class="hljs-built_in">not</span></span> (<span class="hljs-name"><span class="hljs-built_in">pair?</span></span> tree)) <span class="hljs-number">1</span>)
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span> 
         (<span class="hljs-name"><span class="hljs-built_in">+</span></span> (<span class="hljs-name">count-leaves</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> tree))
            (<span class="hljs-name">count-leaves</span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> tree))))))
</code></pre>
<p>نسخة تعاوديّة من <code>count-leaves</code> بعدّاد صريح:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">count-leaves</span> tree)
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">count-iter</span> tree n)
    (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">null?</span></span> tree) n)
          ((<span class="hljs-name"><span class="hljs-built_in">not</span></span> (<span class="hljs-name"><span class="hljs-built_in">pair?</span></span> tree)) (<span class="hljs-name"><span class="hljs-built_in">+</span></span> n <span class="hljs-number">1</span>))
          (<span class="hljs-name"><span class="hljs-built_in">else</span></span> 
           (<span class="hljs-name">count-iter</span> 
            (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> tree)
            (<span class="hljs-name">count-iter</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> tree) 
                        n)))))
  (<span class="hljs-name">count-iter</span> tree <span class="hljs-number">0</span>))
</code></pre>
<blockquote>
<p><strong>التمرين 5.22:</strong> عرض <a href="https://sarabander.github.io/sicp/html/3_002e3.xhtml#Exercise-3_002e12">التمرين 3.12</a> الوارد في <a href="https://sarabander.github.io/sicp/html/3_002e3.xhtml#g_t3_002e3_002e1">3.3.1</a> إجراءَ <code>append</code> الذي يلحق قائمتين لتكوين قائمةٍ جديدة، وإجراءَ <code>append!</code> الذي يدمج قائمتين وصْلهما معًا. صمّم آلة مسجّلاتٍ لتنفيذ كلٍّ من هذين الإجراءين. وافترض أنّ عمليّات ذاكرة بنية القوائم متاحة كعمليّاتٍ أوّليّة.</p>
</blockquote>
<h4>5.3.2 الحفاظ على وهم الذاكرة غير المحدودة</h4>
<p>طريقة التمثيل المُوجَزة في <a href="#g_t5_002e3_002e1">5.3.1</a> تحلّ مسألة تنفيذ بنية القوائم، شريطةَ أن تكون لدينا ذاكرةٌ غير محدودة. أمّا مع حاسوبٍ حقيقيّ، فسينفدنا في النهاية المكان الحُرّ الذي نُبنى فيه أزواجٌ جديدة.<sup class="footnote-ref"><a href="#fn13" id="fnref13">[13]</a></sup> غير أنّ معظم الأزواج المُولَّدة في احتسابٍ نموذجيٍّ لا تُستخدم إلّا للاحتفاظ بنتائج وسيطة. وبعد الاستفادة من هذه النتائج، لم تعُد الأزواج لازمةً — إنّها <em>قمامة</em> (garbage). فإنّ الاحتساب</p>
<pre><code class="language-scheme">(<span class="hljs-name">accumulate</span> 
 + 
 <span class="hljs-number">0</span>
 (<span class="hljs-name">filter</span> odd? (<span class="hljs-name">enumerate-interval</span> <span class="hljs-number">0</span> n)))
</code></pre>
<p>يبني قائمتين: التعداد ونتيجة ترشيح التعداد. وحين يكتمل التجميع، لم تعُد هاتان القائمتان لازمتين، ويمكن استعادة الذاكرة المخصَّصة. فإن تمكّنّا من جمع كلّ القمامة دوريًّا، وتمخّض ذلك عن إعادة تدوير الذاكرة بالسرعة ذاتها تقريبًا التي نُبنى بها أزواجٌ جديدة، فإنّنا نكون قد حافظنا على وهم وجود ذاكرةٍ غير محدودة.</p>
<p>وحتى نُعيد تدوير الأزواج، ينبغي أن تكون لدينا طريقةٌ لتحديد الأزواج المخصَّصة غير اللازمة (بمعنى أنّ محتوياتها لم تعُد قادرةً على التأثير في مستقبل الاحتساب). والطريقة التي سنفحصها لإنجاز ذلك تُعرف بـ<em>جمع القمامة</em> (garbage collection). ويقوم جمع القمامة على الملاحظة أنّ الكائنات الوحيدة التي يمكنها التأثير في مستقبل الاحتساب، في أيّ لحظةٍ من تأويل Lisp، هي تلك التي يمكن الوصول إليها بسلسلةٍ من عمليّات <code>car</code> و<code>cdr</code> تبدأ من المؤشّرات الموجودة حاليًّا في مسجّلات الآلة.<sup class="footnote-ref"><a href="#fn14" id="fnref14">[14]</a></sup> ويمكن إعادة تدوير أيّ خليّة ذاكرةٍ غير متاحةٍ على هذا النحو.</p>
<p>ثمّة طرائق كثيرةٌ لأداء جمع القمامة. والطريقة التي سنفحصها هنا تُسمّى <em>التوقّف والنسخ</em> (stop-and-copy). والفكرة الأساسيّة هي تقسيم الذاكرة إلى نصفين: «ذاكرة العمل» و«الذاكرة الحُرّة». وعندما يبني <code>cons</code> أزواجًا، فإنّه يخصّصها في ذاكرة العمل. وحين تمتلئ ذاكرة العمل، نؤدّي جمع القمامة بتحديد موقع جميع الأزواج المفيدة في ذاكرة العمل ونسخها في مواضعَ متتاليةٍ في الذاكرة الحُرّة. (وتُحدَّد مواقع الأزواج المفيدة بتتبّع جميع مؤشّري <code>car</code> و<code>cdr</code>، بدءًا من مسجّلات الآلة.) وبما أنّنا لا ننسخ القمامة، فسيكون هناك - على الأرجح - ذاكرةٌ حُرّةٌ إضافيّةٌ نستطيع استخدامها لتخصيص أزواجٍ جديدة. فضلًا عن ذلك، لا شيء في ذاكرة العمل لازَمٌ، إذ إنّ جميع الأزواج المفيدة فيها قد نُسخت. وبذلك، فإنّ تبادلنا أدوار ذاكرة العمل والذاكرة الحُرّة يمكنّنا من مواصلة المعالجة؛ وسيُخصَّص الأزواج الجديدة في ذاكرة العمل الجديدة (وهي الذاكرة الحُرّة القديمة). وحين تمتلئ تلك، نستطيع نسخ الأزواج المفيدة إلى الذاكرة الحُرّة الجديدة (وهي ذاكرة العمل القديمة).<sup class="footnote-ref"><a href="#fn15" id="fnref15">[15]</a></sup></p>
<h4>تنفيذ جامع قمامةٍ بطريقة التوقّف والنسخ</h4>
<p>نستخدم الآن لغة آلات المسجّلات لوصف خوارزميّة التوقّف والنسخ بتفصيلٍ أكثر. وسنفترض وجود مسجّلٍ يُسمّى <code>root</code> يحتوي مؤشّرًا إلى بنيةٍ تُشير في النهاية إلى جميع البيانات المتاحة. ويمكن ترتيب ذلك بتخزين محتويات جميع مسجّلات الآلة في قائمةٍ مخصَّصةٍ مسبقًا يُشير إليها <code>root</code> قبيل البدء في جمع القمامة.<sup class="footnote-ref"><a href="#fn16" id="fnref16">[16]</a></sup> ونفترض أيضًا أنّه - بالإضافة إلى ذاكرة العمل الحاليّة - ثمّة ذاكرةٌ حُرّةٌ متاحةٌ نستطيع نسخ البيانات المفيدة إليها. وتتألّف ذاكرة العمل الحاليّة من متجهاتٍ عناوينها الأساسيّة في مسجّلين يُسمّيان <code>the-cars</code> و<code>the-cdrs</code>، والذاكرة الحُرّة في مسجّلين يُسمّيان <code>new-cars</code> و<code>new-cdrs</code>.</p>
<p>يُطلَق جمع القمامة حين نستنفد الخلايا الحُرّة في ذاكرة العمل الحاليّة، أي حين تحاول عمليّة <code>cons</code> زيادة المؤشّر <code>free</code> بما يتجاوز نهاية متجه الذاكرة. وحين يكتمل عمليّة جمع القمامة، سيُشير المؤشّر <code>root</code> إلى داخل الذاكرة الجديدة، وستكون جميع الكائنات المتاحة من <code>root</code> قد نُقلت إلى الذاكرة الجديدة، وسيُحدّد المؤشّر <code>free</code> الموضع التالي في الذاكرة الجديدة حيث يمكن تخصيص زوجٍ جديد. وبالإضافة إلى ذلك، تكون أدوار ذاكرة العمل والذاكرة الجديدة قد تبادلت — وسيُبنى الأزواج الجديدة في الذاكرة الجديدة، بدءًا من الموضع الذي يُحدّده <code>free</code>، وستكون ذاكرة العمل (السابقة) متاحةً بوصفها الذاكرة الجديدة لجمع القمامة التالي. ويُظهر <a href="#Figure-5_002e15">الشكل 5.15</a> ترتيب الذاكرة قبيل جمع القمامة وبعده بلحظة.</p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-1-Fig5.15c.std.webp" alt=""></p>
<p><strong>الشكل 5.15:</strong> إعادة تشكيل الذاكرة بواسطة عمليّة جمع القمامة.</p>
<p>تُضبَط حالة عمليّة جمع القمامة بالإبقاء على مؤشّرين: <code>free</code> و<code>scan</code>. ويُهيَّأ هذان المؤشّران ليُشيرا إلى بداية الذاكرة الجديدة. وتبدأ الخوارزميّة بنقل الزوج الذي يُشير إليه <code>root</code> إلى بداية الذاكرة الجديدة. فيُنسخ الزوج، ويُعدَّل المؤشّر <code>root</code> ليُشير إلى الموقع الجديد، وتُزاد قيمة المؤشّر <code>free</code>. وبالإضافة إلى ذلك، يُؤشَّر الموقع القديم للزوج لإظهار أنّ محتوياته قد نُقلت. ويُنجز هذا التأشير على النحو الآتي: في موضع <code>car</code>، نضع وسمًا خاصًّا يُشير إلى أنّ هذا كائنٌ قد نُقل بالفعل. (ويُسمّى مثل هذا الكائن تقليديًّا <em>القلب المكسور</em> (broken heart).)<sup class="footnote-ref"><a href="#fn17" id="fnref17">[17]</a></sup> وفي موضع <code>cdr</code> نضع <em>عنوان إعادة التوجيه</em> (forwarding address) الذي يُشير إلى الموقع الذي نُقل إليه الكائن.</p>
<p>وبعد نقل الجذر، يدخل جامع القمامة دورته الأساسيّة. وفي كلّ خطوةٍ من الخوارزميّة، يُشير المؤشّر <code>scan</code> (الذي يُشير في البدء إلى الجذر المنقول) إلى زوجٍ نُقل إلى الذاكرة الجديدة لكنّ مؤشّريه <code>car</code> و<code>cdr</code> ما زالا يُشيران إلى كائناتٍ في الذاكرة القديمة. وتُنقل هذه الكائنات كلٌّ منها، وتُزاد قيمة المؤشّر <code>scan</code>. ولنقل كائنٍ (مثلًا الكائن الذي يُحدّده مؤشّر <code>car</code> للزوج الذي نمسحه) نتحقّق مما إذا كان الكائن قد نُقل بالفعل (كما يُبيّنه وجود وسم القلب المكسور في موضع <code>car</code> للكائن). فإن لم يكن الكائن قد نُقل بالفعل، ننسخه إلى الموضع الذي يُحدّده <code>free</code>، ونُحدّث <code>free</code>، ونُنشئ قلبًا مكسورًا في الموقع القديم للكائن، ونُحدّث المؤشّر إلى الكائن (في هذا المثال، مؤشّر <code>car</code> للزوج الذي نمسحه) ليُشير إلى الموقع الجديد. وإن كان الكائن قد نُقل بالفعل، فتُستبدل قيمة عنوان إعادة التوجيه الخاص به (الموجود في موضع <code>cdr</code> من القلب المكسور) بالمؤشّر في الزوج الذي يُمسح. وفي النهاية، ستكون جميع الكائنات المتاحة قد نُقلت ومُسحت، وعندئذٍ يفوق المؤشّر <code>scan</code> المؤشّر <code>free</code> وتنتهي العمليّة.</p>
<p>يمكننا تحديد خوارزميّة التوقّف والنسخ كسلسلةٍ من التعليمات لآلة مسجّلات. أمّا الخطوة الأساسيّة في نقل كائنٍ فتتمّ بروتينٍ فرعيٍّ يُسمّى <code>relocate-old-result-in-new</code>. ويحصل هذا الروتين الفرعيّ على معطاه، وهو مؤشّرٌ إلى الكائن المطلوب نقله، من مسجّلٍ يُسمّى <code>old</code>. وهو ينقل الكائن المعيَّن (بزيادة <code>free</code> أثناء ذلك)، ويضع مؤشّرًا إلى الكائن المنقول في مسجّلٍ يُسمّى <code>new</code>، ويعود بالتفرّع إلى نقطة الدخول المخزّنة في المسجّل <code>relocate-continue</code>. وللبدء في جمع القمامة، نستدعي هذا الروتين الفرعيّ لنقل مؤشّر <code>root</code>، بعد تهيئة <code>free</code> و<code>scan</code>. وحين يُنجز نقل <code>root</code>، نُنصّب المؤشّر الجديد بوصفه <code>root</code> الجديد وندخل الحلقة الرئيسيّة لجامع القمامة.</p>
<pre><code class="language-scheme">begin-garbage-collection
  (<span class="hljs-name">assign</span> free (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
  (<span class="hljs-name">assign</span> scan (<span class="hljs-name">const</span> <span class="hljs-number">0</span>))
  (<span class="hljs-name">assign</span> old (<span class="hljs-name">reg</span> root))
  (<span class="hljs-name">assign</span> relocate-continue 
          (<span class="hljs-name">label</span> reassign-root))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> relocate-old-result-in-new))
reassign-root
  (<span class="hljs-name">assign</span> root (<span class="hljs-name">reg</span> new))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gc-loop))
</code></pre>
<p>في الحلقة الرئيسيّة لجامع القمامة، ينبغي أن نُحدّد فيما إذا كانت ثمّة كائناتٌ أخرى تبقّى مسحها. ونفعل ذلك باختبار تطابق المؤشّر <code>scan</code> مع المؤشّر <code>free</code>. فإن كان المؤشّران متساويين، فقد نُقلت جميع الكائنات المتاحة، ونتفرّع إلى <code>gc-flip</code> الذي يُرتّب الأمور حتّى نستطيع مواصلة الاحتساب المُقاطَع. وإن كان ثمّة أزواجٌ تبقّى مسحها، نستدعي روتين النقل لنقل <code>car</code> الزوج التالي (بوضع مؤشّر <code>car</code> في <code>old</code>). ويُهيَّأ المسجّل <code>relocate-continue</code> بحيث يعود الروتين الفرعيّ لتحديث مؤشّر <code>car</code>.</p>
<pre><code class="language-scheme">gc-loop
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> =) (<span class="hljs-name">reg</span> scan) (<span class="hljs-name">reg</span> free))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> gc-flip))
  (<span class="hljs-name">assign</span> old 
          (<span class="hljs-name">op</span> vector-ref)
          (<span class="hljs-name">reg</span> new-cars)
          (<span class="hljs-name">reg</span> scan))
  (<span class="hljs-name">assign</span> relocate-continue 
          (<span class="hljs-name">label</span> update-car))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> relocate-old-result-in-new))
</code></pre>
<p>عند <code>update-car</code>، نُعدّل مؤشّر <code>car</code> للزوج الذي يُمسح، ثم نمضي إلى نقل <code>cdr</code> الزوج. ونعود إلى <code>update-cdr</code> حين يُنجز ذلك النقل. وبعد نقل <code>cdr</code> وتحديثه، نكون قد أنينا من مسح ذلك الزوج، فنواصل في الحلقة الرئيسيّة.</p>
<pre><code class="language-scheme">update-car
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
           (<span class="hljs-name">reg</span> new-cars)
           (<span class="hljs-name">reg</span> scan)
           (<span class="hljs-name">reg</span> new))
  (<span class="hljs-name">assign</span>  old 
           (<span class="hljs-name">op</span> vector-ref)
           (<span class="hljs-name">reg</span> new-cdrs)
           (<span class="hljs-name">reg</span> scan))
  (<span class="hljs-name">assign</span>  relocate-continue
           (<span class="hljs-name">label</span> update-cdr))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> relocate-old-result-in-new))
update-cdr
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
           (<span class="hljs-name">reg</span> new-cdrs)
           (<span class="hljs-name">reg</span> scan)
           (<span class="hljs-name">reg</span> new))
  (<span class="hljs-name">assign</span>  scan (<span class="hljs-name">op</span> +) (<span class="hljs-name">reg</span> scan) (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> gc-loop))
</code></pre>
<p>يُنقل الروتين الفرعيّ <code>relocate-old-result-in-new</code> الكائنات على النحو الآتي: فإن كان الكائن المطلوب نقله (الذي يُشير إليه <code>old</code>) ليس زوجًا، نُعيد المؤشّر ذاته إلى الكائن دون تغيير (في <code>new</code>). (فقد نكون مثلًا نمسح زوجًا <code>car</code> هو العدد 4. فإن مثّلنا <code>car</code> بـ<code>n4</code>، كما هو موصوف في <a href="#g_t5_002e3_002e1">5.3.1</a>، فنريد أن يبقى مؤشّر <code>car</code> «المنقول» هو <code>n4</code>.) وإلّا، ينبغي أن نُجري النقل. فإن احتوى موضع <code>car</code> للزوج المطلوب نقله على وسم القلب المكسور، فالزوج قد نُقل في الحقيقة بالفعل، فنستعيد عنوان إعادة التوجيه (من موضع <code>cdr</code> في القلب المكسور) ونُعيده في <code>new</code>. وإن كان المؤشّر في <code>old</code> يُشير إلى زوجٍ لم يُنقل بعد، ننقل الزوج إلى أوّل خليّة حُرّةٍ في الذاكرة الجديدة (التي يُشير إليها <code>free</code>) ونُنشئ قلبًا مكسورًا بتخزين وسم القلب المكسور وعنوان إعادة التوجيه في الموقع القديم. ويستخدم <code>relocate-old-result-in-new</code> مسجّلًا يُسمّى <code>oldcr</code> للاحتفاظ بـ<code>car</code> أو <code>cdr</code> للكائن الذي يُشير إليه <code>old</code>.<sup class="footnote-ref"><a href="#fn18" id="fnref18">[18]</a></sup></p>
<pre><code class="language-scheme">relocate-old-result-in-new
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> pointer-to-pair?) (<span class="hljs-name">reg</span> old))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> pair))
  (<span class="hljs-name">assign</span> new (<span class="hljs-name">reg</span> old))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> relocate-continue))
pair
  (<span class="hljs-name">assign</span>  oldcr 
           (<span class="hljs-name">op</span> vector-ref)
           (<span class="hljs-name">reg</span> the-cars)
           (<span class="hljs-name">reg</span> old))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> broken-heart?) (<span class="hljs-name">reg</span> oldcr))
  (<span class="hljs-name">branch</span>  (<span class="hljs-name">label</span> already-moved))
  (<span class="hljs-name">assign</span>  new (<span class="hljs-name">reg</span> free)) <span class="hljs-comment">; new location for pair</span>
  <span class="hljs-comment">;; Update free pointer.</span>
  (<span class="hljs-name">assign</span> free (<span class="hljs-name">op</span> +) (<span class="hljs-name">reg</span> free) (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
  <span class="hljs-comment">;; Copy the car and cdr to new memory.</span>
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
           (<span class="hljs-name">reg</span> new-cars)
           (<span class="hljs-name">reg</span> new)
           (<span class="hljs-name">reg</span> oldcr))
  (<span class="hljs-name">assign</span>  oldcr 
           (<span class="hljs-name">op</span> vector-ref)
           (<span class="hljs-name">reg</span> the-cdrs)
           (<span class="hljs-name">reg</span> old))
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
           (<span class="hljs-name">reg</span> new-cdrs)
           (<span class="hljs-name">reg</span> new)
           (<span class="hljs-name">reg</span> oldcr))
  <span class="hljs-comment">;; Construct the broken heart.</span>
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
           (<span class="hljs-name">reg</span> the-cars)
           (<span class="hljs-name">reg</span> old)
           (<span class="hljs-name">const</span> broken-heart))
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> vector-set!)
           (<span class="hljs-name">reg</span> the-cdrs)
           (<span class="hljs-name">reg</span> old)
           (<span class="hljs-name">reg</span> new))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> relocate-continue))
already-moved
  (<span class="hljs-name">assign</span>  new
           (<span class="hljs-name">op</span> vector-ref)
           (<span class="hljs-name">reg</span> the-cdrs)
           (<span class="hljs-name">reg</span> old))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> relocate-continue))
</code></pre>
<p>وفي نهاية عمليّة جمع القمامة تمامًا، نبادل دور الذاكرتين القديمة والجديدة بتبادل المؤشّرات: تبادل <code>the-cars</code> مع <code>new-cars</code>، و<code>the-cdrs</code> مع <code>new-cdrs</code>. وسنكون عندئذٍ على استعدادٍ لأداء جمع قمامةٍ آخر في المرّة التالية التي تنفد فيها الذاكرة.</p>
<pre><code class="language-scheme">gc-flip
  (<span class="hljs-name">assign</span> temp (<span class="hljs-name">reg</span> the-cdrs))
  (<span class="hljs-name">assign</span> the-cdrs (<span class="hljs-name">reg</span> new-cdrs))
  (<span class="hljs-name">assign</span> new-cdrs (<span class="hljs-name">reg</span> temp))
  (<span class="hljs-name">assign</span> temp (<span class="hljs-name">reg</span> the-cars))
  (<span class="hljs-name">assign</span> the-cars (<span class="hljs-name">reg</span> new-cars))
  (<span class="hljs-name">assign</span> new-cars (<span class="hljs-name">reg</span> temp))
</code></pre>
<h3 id="54-المقيم-ذو-التحكم-الصريح">5.4 المقيّم ذو التحكّم الصريح</h3>
<p>رأينا في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1">5.1</a> كيف نحوّل برامج Scheme بسيطةً إلى أوصاف آلات مسجّلات. وسنُجري هذا التحويل الآن على برنامجٍ أكثر تعقيدًا، وهو المقيّم الاستعادي الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e1">4.1.1</a>–<a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e4">4.1.4</a>، الذي يُظهر كيف يمكن وصف سلوك مفسّر Scheme من حيث الإجراءين <code>eval</code> و<code>apply</code>. أمّا <em>المقيّم ذو التحكّم الصريح</em> (explicit-control evaluator) الذي نُطوّره في هذا القسم فيُظهر كيف يمكن وصف آليّات نداء الإجراءات وتمرير المعطيات الأساسيّة المستخدمة في عمليّة التقييم من حيث عمليّاتٍ على المسجّلات والمكدّس. وبالإضافة إلى ذلك، يمكن للمقيّم ذي التحكّم الصريح أن يخدم بوصفه تنفيذًا لمفسّر Scheme، مكتوبًا بلغةٍ تشبه تشابهًا شديدًا لغة الآلة الأصليّة للحواسيب التقليديّة. ويمكن تنفيذ المقيّم بواسطة محاكي آلة المسجّلات الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2">5.2</a>. وبديلًا عن ذلك، يمكن استخدامه نقطةَ بدءٍ لبناء تنفيذٍ بلغة الآلة لمقيّم Scheme، أو حتّى آلةٍ خاصّةٍ الغرض لتقييم تعابير Scheme. ويُظهر <a href="#Figure-5_002e16">الشكل 5.16</a> تنفيذًا ماديًّا من هذا القبيل: رقاقة سيليكونيّة تعمل بوصفها مقيّمًا لـScheme. وقد بدأ مصمّمو الرقاقة بمواصفات مسار البيانات والمتحكّم لآلة مسجّلاتٍ تشبه المقيّم الموصوف في هذا القسم، واستخدموا برامج أتمتة التصميم لبناء تخطيط الدارة المتكاملة.<sup class="footnote-ref"><a href="#fn19" id="fnref19">[19]</a></sup></p>
<p><img src="/arabic-cs-library/images/sicp/c5-computing-with-register-machines-0-chip.std.webp" alt=""></p>
<p><strong>الشكل 5.16:</strong> تنفيذ لمقيّم Scheme برقاقة سيليكونيّة.</p>
<h4>المسجّلات والعمليّات</h4>
<p>عند تصميم المقيّم ذي التحكّم الصريح، ينبغي أن نُحدّد العمليّات التي ستُستخدم في آلة المسجّلات خاصّتنا. وقد وصفنا المقيّم الاستعادي من حيث صياغة مجرّدة، باستخدام إجراءاتٍ مثل <code>quoted?</code> و<code>make-procedure</code>. وعند تنفيذ آلة المسجّلات، كان بوسعنا توسيع هذه الإجراءات إلى سلاسلَ من عمليّات ذاكرة بنية القوائم الأوّليّة، وتنفيذ هذه العمليّات على آلة المسجّلات خاصّتنا. غير أنّ ذلك كان سيجعل مقيّمنا طويلًا جدًّا، بحيث تُحجب البنية الأساسيّة بالتفاصيل. ولإيضاح العرض، سنُدرج كعمليّاتٍ أوّليّةٍ لآلة المسجّلات إجراءات الصياغة المعطاة في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2">4.1.2</a> وإجراءات تمثيل البيئات وغيرها من بيانات وقت التشغيل المعطاة في القسمين <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e3">4.1.3</a> و<a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e4">4.1.4</a>. وحتى نُحدّد تحديدًا تامًّا مقيّمًا يُمكن برمجته بلغة آليّةٍ منخفضة المستوى أو تنفيذه عتاديًّا، كنا سنستبدل هذه العمليّات بعمليّاتٍ أكثر أوّليّة، باستخدام تنفيذ بنية القوائم الذي وصفناه في <a href="https://sarabander.github.io/sicp/html/5_002e3.xhtml#g_t5_002e3">5.3</a>.</p>
<p>تتألّف آلة مسجّلات مقيّم Scheme خاصّتنا من مكدّس وسبعة مسجّلات: <code>exp</code> و<code>env</code> و<code>val</code> و<code>continue</code> و<code>proc</code> و<code>argl</code> و<code>unev</code>. ويُستخدم <code>exp</code> في الاحتفاظ بالتعبير المطلوب تقييمه، ويحتوي <code>env</code> على البيئة التي ستُجرى فيها عمليّة التقييم. وعند نهاية تقييمٍ، يحتوي <code>val</code> على القيمة المتحصّلة من تقييم التعبير في البيئة المعيَّنة. ويُستخدم المسجّل <code>continue</code> لاستيفاء التعاود، كما هو موضّح في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e4">5.1.4</a>. (يحتاج المقيّم إلى نداء نفسه تعاوديًّا، إذ إنّ تقييم تعبيرٍ يتطلّب تقييم تعابيره الجزئيّة.) وتُستخدم المسجّلات <code>proc</code> و<code>argl</code> و<code>unev</code> في تقييم التركيبات.</p>
<p>لن نُقدّم مخطّط مسار بياناتٍ يُظهر كيف تُوصَل مسجّلات المقيّم وعمليّاته، كما أنّنا لن نُعطي القائمة التامّة لعمليّات الآلة. فهذه مستبطَنةٌ في متحكّم المقيّم، الذي سيُعرَض بتفصيلٍ.</p>
<h4>5.4.1 قلب المقيّم ذي التحكّم الصريح</h4>
<p>العنصر المركزيّ في المقيّم هو سلسلة التعليمات التي تبدأ عند <code>eval-dispatch</code>. وهي تقابل الإجراء <code>eval</code> في المقيّم الاستعادي الموصوف في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e1">4.1.1</a>. وحين يبدأ المتحكّم عند <code>eval-dispatch</code>، فهو يقيّم التعبير الذي يُحدّده <code>exp</code> في البيئة التي يُحدّدها <code>env</code>. وحين يكتمل التقييم، يذهب المتحكّم إلى نقطة الدخول المخزّنة في <code>continue</code>، ويحتفظ المسجّل <code>val</code> بقيمة التعبير. ومثلما في <code>eval</code> الاستعادي، فإنّ بنية <code>eval-dispatch</code> هي تحليل حالاتٍ على النوع الصياغيّ للتعبير المطلوب تقييمه.<sup class="footnote-ref"><a href="#fn20" id="fnref20">[20]</a></sup></p>
<pre><code class="language-scheme">eval-dispatch
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> self-evaluating?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-self-eval))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> variable?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-variable))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> quoted?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-quoted))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> assignment?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-assignment))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> definition?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-definition))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> if?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-if))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> lambda?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-lambda))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> begin?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-begin))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> application?) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-application))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> unknown-expression-type))
</code></pre>
<h4>تقييم التعابير البسيطة</h4>
<p>الأعداد والمقاطع النصّيّة (وهي ذاتيّة التقييم)، والمتغيّرات، والاقتباسات، وتعبيرات <code>lambda</code> ليس لها تعابير جزئيّةٌ يُراد تقييمها. وبالنسبة لها، يضع المقيّم القيمة الصحيحة في المسجّل <code>val</code> ببساطة ويواصل التنفيذ عند نقطة الدخول التي يُحدّدها <code>continue</code>. ويُؤدّى تقييم التعابير البسيطة بشيفرة المتحكّم الآتية:</p>
<pre><code class="language-scheme">ev-self-eval
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
ev-variable
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> lookup-variable-value)
          (<span class="hljs-name">reg</span> exp)
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
ev-quoted
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> text-of-quotation)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
ev-lambda
  (<span class="hljs-name">assign</span> unev
          (<span class="hljs-name">op</span> lambda-parameters)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">assign</span> exp 
          (<span class="hljs-name">op</span> lambda-body)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> make-procedure)
          (<span class="hljs-name">reg</span> unev)
          (<span class="hljs-name">reg</span> exp)
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
</code></pre>
<p>لاحِظ كيف يستخدم <code>ev-lambda</code> المسجّلين <code>unev</code> و<code>exp</code> للاحتفاظ بوسائط تعبير lambda وجسمه، حتّى يمكن تمريرهما إلى العمليّة <code>make-procedure</code>، إلى جانب البيئة الموجودة في <code>env</code>.</p>
<h4>تقييم تطبيقات الإجراءات</h4>
<p>يُحدَّد تطبيق الإجراء بتركيبةٍ تحتوي على مشغّلٍ وعوامل. والمشغّل تعبيرٌ جزئيّ قيمته إجراء، والعوامل تعابير جزئيّةٌ قيمُها هي المعطيات التي ينبغي تطبيق الإجراء عليها. ويعالج <code>eval</code> الاستعادي التطبيقات بنداء نفسه تعاوديًّا لتقييم كلّ عنصرٍ من التركيبة، ثم بتمرير النتائج إلى <code>apply</code> الذي يؤدّي تطبيق الإجراء الفعليّ. ويفعل المقيّم ذو التحكّم الصريح الأمر ذاته؛ وهذه النداءات التعاوديّة تُنفَّذ بتعليمات <code>goto</code>، إلى جانب استخدام المكدّس لحفظ المسجّلات التي ستُستعاد بعد عودة النداء التعاوديّ. وقبل كلّ نداءٍ، سنحرص على تحديد المسجّلات التي ينبغي حفظها (لأنّ قيمها ستكون لازمةً لاحقًا).<sup class="footnote-ref"><a href="#fn21" id="fnref21">[21]</a></sup></p>
<p>نبدأ تقييم تطبيقٍ بتقييم المشغّل لإنتاج إجراءٍ سيُطبَّق لاحقًا على العوامل المقيَّمة. ولتقييم المشغّل، ننقله إلى المسجّل <code>exp</code> ونذهب إلى <code>eval-dispatch</code>. والبيئة الموجودة في المسجّل <code>env</code> هي البيئة الصحيحة لتقييم المشغّل بالفعل. غير أنّنا نحفظ <code>env</code> لأنّنا سنحتاجها لاحقًا لتقييم العوامل. ونستخرج العوامل أيضًا في <code>unev</code> ونحفظ ذلك على المكدّس. ونُعِدّ <code>continue</code> بحيث يستأنف <code>eval-dispatch</code> عند <code>ev-appl-did-operator</code> بعد تقييم المشغّل. ومع ذلك، نحفظ أوّلًا القيمة القديمة لـ<code>continue</code>، التي تُبيّن للمتحكّم أين يواصل بعد التطبيق.</p>
<pre><code class="language-scheme">ev-application
  (<span class="hljs-name">save</span> continue)
  (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">assign</span> unev (<span class="hljs-name">op</span> operands) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">save</span> unev)
  (<span class="hljs-name">assign</span> exp (<span class="hljs-name">op</span> operator) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">assign</span>
   continue (<span class="hljs-name">label</span> ev-appl-did-operator))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
</code></pre>
<p>وعند العودة من تقييم التعبير الجزئيّ المشغّل، نمضي إلى تقييم عوامل التركيبة وإلى تجميع المعطيات الناتجة في قائمةٍ محفوظةٍ في <code>argl</code>. ونُعيد أوّلًا العوامل غير المقيَّمة والبيئة. ونهيّئ <code>argl</code> إلى قائمةٍ خالية. ثم نُسنِد إلى المسجّل <code>proc</code> الإجراء الذي أنتجه تقييم المشغّل. فإن لم تكن ثمّة عوامل، ننتقل مباشرةً إلى <code>apply-dispatch</code>. وإلّا نحفظ <code>proc</code> على المكدّس ونبدأ حلقة تقييم المعطيات:<sup class="footnote-ref"><a href="#fn22" id="fnref22">[22]</a></sup></p>
<pre><code class="language-scheme">ev-appl-did-operator
  (<span class="hljs-name">restore</span> unev)             <span class="hljs-comment">; the operands</span>
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> empty-arglist))
  (<span class="hljs-name">assign</span> proc (<span class="hljs-name">reg</span> val))    <span class="hljs-comment">; the operator</span>
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> no-operands?) (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> apply-dispatch))
  (<span class="hljs-name">save</span> proc)
</code></pre>
<p>تقيّم كلّ دورةٍ من حلقة تقييم المعطيات عاملًا من القائمة الموجودة في <code>unev</code> وتُجمّع النتيجة في <code>argl</code>. ولتقييم عاملٍ، نضعه في المسجّل <code>exp</code> ونذهب إلى <code>eval-dispatch</code>، بعد إعداد <code>continue</code> حتّى يستأنف التنفيذ في مرحلة تجميع المعطيات. لكنّنا نحفظ أوّلًا المعطيات المُجمَّعة حتّى الآن (المحفوظة في <code>argl</code>)، والبيئة (المحفوظة في <code>env</code>)، والعوامل الباقية المطلوب تقييمها (المحفوظة في <code>unev</code>). وتُعالَج حالةٌ خاصّةٌ لتقييم العامل الأخير، وذلك عند <code>ev-appl-last-arg</code>.</p>
<pre><code class="language-scheme">ev-appl-operand-loop
  (<span class="hljs-name">save</span> argl)
  (<span class="hljs-name">assign</span> exp
          (<span class="hljs-name">op</span> first-operand)
          (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> last-operand?) (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-appl-last-arg))
  (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">save</span> unev)
  (<span class="hljs-name">assign</span> continue 
          (<span class="hljs-name">label</span> ev-appl-accumulate-arg))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
</code></pre>
<p>وحين يُقيَّم عاملٌ، تُجمّع القيمة في القائمة المحفوظة في <code>argl</code>. ثم يُحذَف العامل من قائمة العوامل غير المقيَّمة في <code>unev</code>، ويستمرّ تقييم المعطيات.</p>
<pre><code class="language-scheme">ev-appl-accumulate-arg
  (<span class="hljs-name">restore</span> unev)
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">restore</span> argl)
  (<span class="hljs-name">assign</span> argl 
          (<span class="hljs-name">op</span> adjoin-arg)
          (<span class="hljs-name">reg</span> val)
          (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">assign</span> unev
          (<span class="hljs-name">op</span> rest-operands)
          (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> ev-appl-operand-loop))
</code></pre>
<p>يُعالَج تقييم المعطى الأخير معالجةً مختلفة. فلا حاجةَ إلى حفظ البيئة أو قائمة العوامل غير المقيَّمة قبل الانتقال إلى <code>eval-dispatch</code>، إذ لن تكونا مطلوبتين بعد تقييم العامل الأخير. وبناءً عليه، نعود من التقييم إلى نقطة دخولٍ خاصّةٍ هي <code>ev-appl-accum-last-arg</code>، التي تستعيد قائمة المعطيات، وتُجمّع المعطى الجديد، وتستعيد الإجراء المحفوظ، وتنطلق لأداء التطبيق.<sup class="footnote-ref"><a href="#fn23" id="fnref23">[23]</a></sup></p>
<pre><code class="language-scheme">ev-appl-last-arg
  (<span class="hljs-name">assign</span> continue 
          (<span class="hljs-name">label</span> ev-appl-accum-last-arg))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
ev-appl-accum-last-arg
  (<span class="hljs-name">restore</span> argl)
  (<span class="hljs-name">assign</span> argl 
          (<span class="hljs-name">op</span> adjoin-arg)
          (<span class="hljs-name">reg</span> val)
          (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">restore</span> proc)
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> apply-dispatch))
</code></pre>
<p>تُحدّد تفاصيل حلقة تقييم المعطيات الترتيب الذي يقيّم به المفسّر عوامل التركيبة (مثلًا، من اليسار إلى اليمين أو من اليمين إلى اليسار — انظر <a href="https://sarabander.github.io/sicp/html/3_002e1.xhtml#Exercise-3_002e8">التمرين 3.8</a>). وهذا الترتيب غير محدَّدٍ في المقيّم الاستعادي، الذي يرث بنية تحكّمه من Scheme الأساس الذي نُفّذ فيه.<sup class="footnote-ref"><a href="#fn24" id="fnref24">[24]</a></sup> وبما أنّ المحدِّد <code>first-operand</code> (المستخدم في <code>ev-appl-operand-loop</code> لاستخراج العوامل المتعاقبة من <code>unev</code>) مُنفَّذ بـ<code>car</code> وأنّ المحدِّد <code>rest-operands</code> مُنفَّذ بـ<code>cdr</code>، فإنّ المقيّم ذا التحكّم الصريح سيقيّم عوامل التركيبة بترتيبٍ من اليسار إلى اليمين.</p>
<h4>تطبيق الإجراءات</h4>
<p>تقابل نقطة الدخول <code>apply-dispatch</code> الإجراء <code>apply</code> في المقيّم الاستعادي. وحين نصل إلى <code>apply-dispatch</code>، يحتوي المسجّل <code>proc</code> على الإجراء المطلوب تطبيقه، ويحتوي <code>argl</code> على قائمة المعطيات المقيَّمة التي ينبغي تطبيقه عليها. وقيمة <code>continue</code> المحفوظة (المُمرَّرة أصلًا إلى <code>eval-dispatch</code> والمحفوظة عند <code>ev-application</code>)، وهي التي تُبيّن أين نعود بنتيجة تطبيق الإجراء، موجودةٌ على المكدّس. وحين يكتمل التطبيق، يُحوِّل المتحكّم إلى نقطة الدخول التي تُحدّدها <code>continue</code> المحفوظة، مع نتيجة التطبيق في <code>val</code>. ومثلما في <code>apply</code> الاستعادي، ثمّة حالتان ينبغي النظر فيهما. فالإجراء المطلوب تطبيقه إمّا أن يكون أوّليًّا وإمّا أن يكون إجراءً مركّبًا.</p>
<pre><code class="language-scheme">apply-dispatch
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-apply))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> compound-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> compound-apply))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> unknown-procedure-type))
</code></pre>
<p>نفترض أنّ كلّ أوّليّةٍ مُنفَّذةٌ بحيث تحصل على معطياتها من <code>argl</code> وتضع نتيجتها في <code>val</code>. وحتى نُحدّد كيف تتناول الآلة الأوّليّات، سيتعيّن علينا أن نُقدّم سلسلةً من تعليمات المتحكّم لتنفيذ كلّ أوّليّةٍ وأن نُرتّب لـ<code>primitive-apply</code> أن يُوزّع إلى تعليمات الأوّليّة التي يُحدّدها محتوى <code>proc</code>. وبما أنّنا مهتمّون ببنية عمليّة التقييم أكثر من اهتمامنا بتفاصيل الأوّليّات، فسنستخدم بدلًا من ذلك عمليّة <code>apply-primitive-procedure</code> التي تُطبّق الإجراء الموجود في <code>proc</code> على المعطيات في <code>argl</code>. وبغرض محاكاة المقيّم بواسطة المحاكي الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2">5.2</a>، نستخدم الإجراء <code>apply-primitive-procedure</code> الذي يستدعي نظام Scheme الأساس لأداء التطبيق، تمامًا كما فعلنا مع المقيّم الاستعادي في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e4">4.1.4</a>. وبعد احتساب قيمة التطبيق الأوّليّ، نستعيد <code>continue</code> ونذهب إلى نقطة الدخول المعيَّنة.</p>
<pre><code class="language-scheme">primitive-apply
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> apply-primitive-procedure)
              (<span class="hljs-name">reg</span> proc)
              (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
</code></pre>
<p>ولتطبيق إجراءٍ مركّب، نمضي تمامًا كما فعلنا مع المقيّم الاستعادي. فنبني إطارًا يربط وسائط الإجراء بالمعطيات، ونستخدم هذا الإطار لتوسيع البيئة التي يحملها الإجراء، ونُقيّم في هذه البيئة المُوسَّعة سلسلة التعابير التي تكوّن جسم الإجراء. ويتولّى <code>ev-sequence</code>، الموصوف أدناه في <a href="#g_t5_002e4_002e2">5.4.2</a>، تقييم السلسلة.</p>
<pre><code class="language-scheme">compound-apply
  (<span class="hljs-name">assign</span> unev 
          (<span class="hljs-name">op</span> procedure-parameters)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">assign</span> env
          (<span class="hljs-name">op</span> procedure-environment)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">assign</span> env
          (<span class="hljs-name">op</span> extend-environment)
          (<span class="hljs-name">reg</span> unev)
          (<span class="hljs-name">reg</span> argl)
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> unev
          (<span class="hljs-name">op</span> procedure-body)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> ev-sequence))
</code></pre>
<p>إنّ <code>compound-apply</code> هو الموضع الوحيد في المفسّر الذي يُسنَد فيه إلى المسجّل <code>env</code> قيمةٌ جديدةٌ إطلاقًا. ومثلما في المقيّم الاستعادي، تُبنى البيئة الجديدة من البيئة التي يحملها الإجراء، إلى جانب قائمة المعطيات وقائمة المتغيّرات المقابلة لها التي ستُربط.</p>
<h4>5.4.2 تقييم التسلسل والتعاود الذيلي</h4>
<p>الجزء من المقيّم ذي التحكّم الصريح عند <code>ev-sequence</code> يقابل إجراء <code>eval-sequence</code> في المقيّم الاستعادي. وهو يعالج سلاسل التعابير في أجساد الإجراءات أو في تعابير <code>begin</code> الصريحة.</p>
<p>تُقيَّم تعابير <code>begin</code> الصريحة بوضع سلسلة التعابير المطلوب تقييمها في <code>unev</code>، وحفظ <code>continue</code> على المكدّس، والقفز إلى <code>ev-sequence</code>.</p>
<pre><code class="language-scheme">ev-begin
  (<span class="hljs-name">assign</span> unev
          (<span class="hljs-name">op</span> begin-actions)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">save</span> continue)
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> ev-sequence))
</code></pre>
<p>وتُعالَج السلاسل الضمنيّة في أجساد الإجراءات بالقفز إلى <code>ev-sequence</code> من <code>compound-apply</code>، وعندها يكون <code>continue</code> موجودًا بالفعل على المكدّس، بعد أن حُفظ عند <code>ev-application</code>.</p>
<p>تُشكّل المدخلان عند <code>ev-sequence</code> و<code>ev-sequence-continue</code> حلقةً تُقيّم كلّ تعبيرٍ في السلسلة تباعًا. وتُحفظ قائمة التعابير غير المقيَّمة في <code>unev</code>. وقبل تقييم كلّ تعبيرٍ، نتحقّق مما إذا كانت ثمّة تعابيرُ إضافيّةٌ تبقّى تقييمها في السلسلة. فإن كان الأمر كذلك، نحفظ بقيّة التعابير غير المقيَّمة (المحفوظة في <code>unev</code>) والبيئة التي ينبغي تقييمها فيها (المحفوظة في <code>env</code>) ونستدعي <code>eval-dispatch</code> لتقييم التعبير. وتُستعاد المسجّلان المحفوظان عند العودة من هذا التقييم، عند <code>ev-sequence-continue</code>.</p>
<p>أمّا التعبير الأخير في السلسلة فيُعالَج معالجةً مختلفة، عند نقطة الدخول <code>ev-sequence-last-exp</code>. وبما أنّ لا تعابيرَ أخرى تبقّى تقييمها بعد هذا التعبير، فلا حاجةَ إلى حفظ <code>unev</code> أو <code>env</code> قبل الانتقال إلى <code>eval-dispatch</code>. وقيمة السلسلة كلّها هي قيمة التعبير الأخير، فإنّه بعد تقييم التعبير الأخير لا يبقى شيءٌ يُفعَل إلّا المواصلة عند نقطة الدخول المحفوظة حاليًّا على المكدّس (والتي حفظها <code>ev-application</code> أو <code>ev-begin</code>.) وبدلًا من إعداد <code>continue</code> بحيث يعود <code>eval-dispatch</code> إلى هنا ثمّ استعادة <code>continue</code> من المكدّس والمواصلة عند نقطة الدخول تلك، نستعيد <code>continue</code> من المكدّس قبل الانتقال إلى <code>eval-dispatch</code>، حتّى يواصل <code>eval-dispatch</code> عند نقطة الدخول تلك بعد تقييم التعبير.</p>
<pre><code class="language-scheme">ev-sequence
  (<span class="hljs-name">assign</span> exp (<span class="hljs-name">op</span> first-exp) (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> last-exp?) (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-sequence-last-exp))
  (<span class="hljs-name">save</span> unev)
  (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">assign</span> continue
          (<span class="hljs-name">label</span> ev-sequence-continue))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
ev-sequence-continue
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">restore</span> unev)
  (<span class="hljs-name">assign</span> unev
          (<span class="hljs-name">op</span> rest-exps)
          (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> ev-sequence))
ev-sequence-last-exp
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
</code></pre>
<h4>التعاوب الذيلي</h4>
<p>قلنا في <a href="https://sarabander.github.io/sicp/html/Chapter-1.xhtml#Chapter-1">الفصل 1</a> إنّ العمليّة التي يصفها إجراءٌ مثل</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">sqrt-iter</span> guess x)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">good-enough?</span> guess x)
      guess
      (<span class="hljs-name">sqrt-iter</span> (<span class="hljs-name">improve</span> guess x) x)))
</code></pre>
<p>عمليّةٌ تكراريّة. فرغم أنّ الإجراء تعاوديّ صياغيًّا (معرَّفٌ من حيث ذاته)، فإنّه ليس ضروريًّا منطقيًّا أن يحفظ المُقيّم معلوماتٍ عند الانتقال من نداءٍ إلى <code>sqrt-iter</code> إلى النداء التالي.<sup class="footnote-ref"><a href="#fn25" id="fnref25">[25]</a></sup> ويُسمّى المُقيّم القادر على تنفيذ إجراءٍ مثل <code>sqrt-iter</code> دون أن يتطلّب مساحةً متزايدةً مع استمرار الإجراء في نداء ذاته <em>مُقيّمًا تعاوديًّا ذيليًّا (tail-recursive)</em>. أمّا تنفيذ المقيّم البعديّ الوارد في <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a> فلا يحدّد ما إذا كان المقيّم تعاوديًّا ذيليًّا، لأنّ ذلك المقيّم يرث آليّة حفظ الحالة من Scheme الأساس. غير أنّنا مع مقيّم ذي المتحكّم الصريح نستطيع تتبّع عمليّة التقييم لنرى متى تُسبّب نداءات الإجراءات تراكمًا صافيًّا للمعلومات على المكدّس.</p>
<p>إنّ مقيّمنا تعاوديّ الذيلي، لأنّه لتقييم التعبير الأخير في تسلسلٍ ننتقل انتقالًا مباشرًا إلى <code>eval-dispatch</code> دون حفظ أيّ معلومات على المكدّس. وبذلك، فإنّ تقييم التعبير الأخير في تسلسلٍ - حتى لو كان نداء إجراءٍ (كما في <code>sqrt-iter</code>، حيث ينتهي تعبير <code>if</code>، وهو التعبير الأخير في جسم الإجراء، إلى نداءٍ لـ<code>sqrt-iter</code>) - لن يُسبّب تراكم أيّ معلومات على المكدّس.<sup class="footnote-ref"><a href="#fn26" id="fnref26">[26]</a></sup></p>
<p>لو أنّنا لم نفكّر في الاستفادة من كون حفظ المعلومات غير ضروريّ في هذه الحالة، لكان ممكناً أن ننفّذ <code>eval-sequence</code> بمعاملة جميع تعابير التسلسل معاملةً واحدة - حفظ المسجّلات، وتقييم التعبير، والعودة لاستعادة المسجّلات، وتكرار ذلك حتّى يُقيَّم جميع التعبيرات:<sup class="footnote-ref"><a href="#fn27" id="fnref27">[27]</a></sup></p>
<pre><code class="language-scheme">ev-sequence
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> no-more-exps?) (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-sequence-end))
  (<span class="hljs-name">assign</span> exp (<span class="hljs-name">op</span> first-exp) (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">save</span> unev)
  (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">assign</span> continue
          (<span class="hljs-name">label</span> ev-sequence-continue))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
ev-sequence-continue
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">restore</span> unev)
  (<span class="hljs-name">assign</span> unev (<span class="hljs-name">op</span> rest-exps) (<span class="hljs-name">reg</span> unev))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> ev-sequence))
ev-sequence-end
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
</code></pre>
<p>قد يبدو هذا تغييرًا طفيفًا في شيفرتنا السابقة لتقييم التسلسل: الفرق الوحيد هو أنّنا نمرّ بدورة الحفظ والاستعادة للتعبير الأخير في تسلسلٍ كما نمرّ بها لسواه. وسيظلّ المفسّر يُعطي القيمة نفسها لأيّ تعبير. لكنّ هذا التغيير قاتل بالنسبة للتنفيذ التعاوديّ الذيلي، لأنّنا نضطرّ الآن إلى العودة بعد تقييم التعبير الأخير في تسلسلٍ لكي نتراجع عن عمليّات حفظ المسجّلات (العقيمة). وهذه الحفظات الإضافيّة ستتراكم في عُشّ نداءات الإجراءات. ونتيجةً لذلك، فإنّ عمليّاتٍ مثل <code>sqrt-iter</code> ستتطلّب مساحةً متناسبةً مع عدد التكرارات بدلًا من مساحةٍ ثابتة. وهذا فرقٌ قد تكون أهمّيته كبيرة. فإنّه، مع التعاوب الذيلي، يمكن التعبير عن حلقةٍ لا نهائيّة باستخدام آليّة نداء الإجراءات وحدها:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">count</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">newline</span></span>)
  (<span class="hljs-name"><span class="hljs-built_in">display</span></span> n)
  (<span class="hljs-name">count</span> (<span class="hljs-name"><span class="hljs-built_in">+</span></span> n <span class="hljs-number">1</span>)))
</code></pre>
<p>وبدون التعاوب الذيلي، فإنّ إجراءً كهذا سيستنفد مكدّسه في النهاية، ولو أردنا التعبير عن تكرارٍ حقيقيّ لتطلّب ذلك آليّة تحكّمٍ أخرى غير نداء الإجراءات.</p>
<h4>5.4.3 التعابير الشرطيّة، والإحلالات، والتعريفات</h4>
<p>كما هو الحال في المقيّم البعديّ، فإنّ الصيغ الخاصّة تُعالَج بتقييم مقاطع من التعبير انتخابًا. فبالنسبة لتعبير <code>if</code>، يجب أن نُقيّم مُسَيِّمه ونقرّر، بالاستناد إلى قيمة المسيّم، هل نُقيّم التالي أم البديل.</p>
<p>وقبل تقييم المسيّم، نحفظ تعبير <code>if</code> ذاته حتّى نتمكّن لاحقًا من استخراج التالي أو البديل. ونحفظ أيضًا البيئة، التي سنحتاج إليها لاحقًا لتقييم التالي أو البديل، ونحفظ <code>continue</code>، التي سنحتاج إليها لاحقًا للعودة إلى تقييم التعبير المنتظر لقيمة <code>if</code>.</p>
<pre><code class="language-scheme">ev-if
  (<span class="hljs-name">save</span> exp)   <span class="hljs-comment">; save expression for later</span>
  (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">save</span> continue)
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> ev-if-decide))
  (<span class="hljs-name">assign</span> exp (<span class="hljs-name">op</span> if-predicate) (<span class="hljs-name">reg</span> exp))
  <span class="hljs-comment">; evaluate the predicate:</span>
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
</code></pre>
<p>حين نعود من تقييم المسيّم، نختبر ما إذا كانت قيمته صحيحة أم خاطئة، ووِفقًا للنتيجة نضع التالي أو البديل في <code>exp</code> قبل الانتقال إلى <code>eval-dispatch</code>. ولاحِظ أنّ استعادة <code>env</code> و<code>continue</code> هنا تُهيّئ <code>eval-dispatch</code> ليكون البيئة الصحيحة وأن يواصل في الموضع الصائب لاستلام قيمة تعبير <code>if</code>.</p>
<pre><code class="language-scheme">ev-if-decide
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">restore</span> exp)
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> true?) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> ev-if-consequent))
ev-if-alternative
  (<span class="hljs-name">assign</span> exp (<span class="hljs-name">op</span> if-alternative) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
ev-if-consequent
  (<span class="hljs-name">assign</span> exp (<span class="hljs-name">op</span> if-consequent) (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
</code></pre>
<h4>الإحلالات والتعريفات</h4>
<p>تُعالَج الإحلالات بـ<code>ev-assignment</code>، الذي يُبلَغ من <code>eval-dispatch</code> وتعبير الإحلال موضوعٌ في <code>exp</code>. والشيفرة عند <code>ev-assignment</code> تُقيّم أوّلًا جزء القيمة من التعبير ثم تُثبّت القيمة الجديدة في البيئة. وتُفترض إتاحة <code>set-variable-value!</code> كعمليّة آلة.</p>
<pre><code class="language-scheme">ev-assignment
  (<span class="hljs-name">assign</span> unev 
          (<span class="hljs-name">op</span> assignment-variable)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">save</span> unev)   <span class="hljs-comment">; save variable for later</span>
  (<span class="hljs-name">assign</span> exp
          (<span class="hljs-name">op</span> assignment-value)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">save</span> continue)
  (<span class="hljs-name">assign</span> continue
          (<span class="hljs-name">label</span> ev-assignment-1))
  <span class="hljs-comment">; evaluate the assignment value:</span>
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))  
ev-assignment<span class="hljs-number">-1</span>
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">restore</span> unev)
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> set-variable-value!)
           (<span class="hljs-name">reg</span> unev)
           (<span class="hljs-name">reg</span> val)
           (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">const</span> ok))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
</code></pre>
<p>أمّا التعريفات فتُعالَج بطريقةٍ مماثلة:</p>
<pre><code class="language-scheme">ev-definition
  (<span class="hljs-name">assign</span> unev 
          (<span class="hljs-name">op</span> definition-variable)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">save</span> unev)   <span class="hljs-comment">; save variable for later</span>
  (<span class="hljs-name">assign</span> exp 
          (<span class="hljs-name">op</span> definition-value)
          (<span class="hljs-name">reg</span> exp))
  (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">save</span> continue)
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> ev-definition-1))
  <span class="hljs-comment">; evaluate the definition value:</span>
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))  
ev-definition<span class="hljs-number">-1</span>
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">restore</span> unev)
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> define-variable!)
           (<span class="hljs-name">reg</span> unev)
           (<span class="hljs-name">reg</span> val)
           (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> ok))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
</code></pre>
<blockquote>
<p><strong>التمرين 5.23:</strong> وسّع المقيّم ليعامل التعابير المشتقّة مثل <code>cond</code> و<code>let</code> وما أشبه ذلك (<a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2">4.1.2</a>). ويجوز لك «الغشّ» والافتراض أنّ محوّلات الصياغة مثل <code>cond-&gt;if</code> متاحةٌ كعمليّات آلة.<sup class="footnote-ref"><a href="#fn28" id="fnref28">[28]</a></sup></p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.24:</strong> نفّذ <code>cond</code> كصيغةٍ خاصّةٍ أوّليّةٍ جديدة دون اختزالها إلى <code>if</code>. وسيتعيّن عليك بناء حلقةٍ تختبر مسيّمات بنود <code>cond</code> المتتالية حتّى تجد صحيحًا منها، ثم استخدام <code>ev-sequence</code> لتقييم أفعال البند.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.25:</strong> عدّل المقيّم بحيث يستخدم التقييم بالترتيب الاعتيادي، استنادًا إلى المقيّم المتأخّر الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e2.xhtml#g_t4_002e2">4.2</a>.</p>
</blockquote>
<h4>5.4.4 تشغيل المقيّم</h4>
<p>مع تنفيذ المقيّم ذي المتحكّم الصريح نصل إلى نهاية تطوّرٍ بدأ في <a href="https://sarabander.github.io/sicp/html/Chapter-1.xhtml#Chapter-1">الفصل 1</a>، استكشفنا فيه نماذج متعاقبةً في الدقّة لعمليّة التقييم. فقد بدأنا بنموذج الاستبدال غير الرسميّ نسبيًّا، ثم وسّعنا هذا في <a href="https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3">الفصل 3</a> إلى نموذج البيئة، الذي مكّننا من التعامل مع الحالة والتغيير. وفي المقيّم البعديّ الوارد في <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a>، استخدمنا Scheme ذاتها لغةً نجعل بها بنية البيئة المبنية أثناء تقييم تعبيرٍ أكثر وضوحًا. والآن، ومع آلات المسجّلات، ألقينا نظرةً قريبةً على آليّات المقيّم في إدارة التخزين، وتمرير المعطيات، والتحكّم. وعند كلّ مستوى جديد من الوصف، اضطررنا إلى إثارة قضايا وحلّ غموضٍ لم يكن ظاهرًا في المعاملة السابقة الأقلّ دقّة للتقييم. ولكي نفهم سلوك المقيّم ذي المتحكّم الصريح، نستطيع محاكاته ومراقبة أدائه.</p>
<p>وسنُثبّت حلقة قيادةٍ في آلة المقيّم لدينا. وهذه تؤدّي دور الإجراء <code>driver-loop</code> الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e4">4.1.4</a>. وسيطبع المقيّم - تكراريًّا - حافزًا، ويقرأ تعبيرًا، ويُقيّمه بالانتقال إلى <code>eval-dispatch</code>، ويطبع النتيجة. والتعليمات الآتية تُشكّل بداية تسلسل متحكّم المقيّم ذي المتحكّم الصريح:<sup class="footnote-ref"><a href="#fn29" id="fnref29">[29]</a></sup></p>
<pre><code class="language-scheme">read-eval-print-loop
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> initialize-stack))
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> prompt-for-input)
           (<span class="hljs-name">const</span> <span class="hljs-string">&quot;;;; EC-Eval input:&quot;</span>))
  (<span class="hljs-name">assign</span> exp (<span class="hljs-name">op</span> read))
  (<span class="hljs-name">assign</span> env (<span class="hljs-name">op</span> get-global-environment))
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> print-result))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> eval-dispatch))
print-result
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> announce-output)
           (<span class="hljs-name">const</span> <span class="hljs-string">&quot;;;; EC-Eval value:&quot;</span>))
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> user-print) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> read-eval-print-loop))
</code></pre>
<p>حين نصادف خطأً في إجراءٍ (كـ«خطأ نوع إجراء غير معروف» المُشار إليه عند <code>apply-dispatch</code>)، نطبع رسالة خطأٍ ونعود إلى حلقة القيادة.<sup class="footnote-ref"><a href="#fn30" id="fnref30">[30]</a></sup></p>
<pre><code class="language-scheme">unknown-expression-type
  (<span class="hljs-name">assign</span> 
   val
   (<span class="hljs-name">const</span> unknown-expression-type-error))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> signal-error))
unknown-procedure-type
  <span class="hljs-comment">; clean up stack (from apply-dispatch):</span>
  (<span class="hljs-name">restore</span> continue)    
  (<span class="hljs-name">assign</span> 
   val
   (<span class="hljs-name">const</span> unknown-procedure-type-error))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> signal-error))
signal-error
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> user-print) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> read-eval-print-loop))
</code></pre>
<p>ولأغراض المحاكاة، نُهيّئ المكدّس في كلّ مرورٍ بحلقة القيادة، إذ قد لا يكون فارغًا بعد أن يقاطع خطأٌ (كمتغيّرٍ غير معرَّف) تقييمًا.<sup class="footnote-ref"><a href="#fn31" id="fnref31">[31]</a></sup></p>
<p>إذا جمعنا جميع مقاطع الشيفرة المقدَّمة في <a href="#g_t5_002e4_002e1">5.4.1</a>–<a href="#g_t5_002e4_002e4">5.4.4</a>، نستطيع إنشاء نموذج آلة مقيّمٍ نستطيع تشغيله باستخدام محاكي آلات المسجّلات الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2">5.2</a>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> eceval
  (<span class="hljs-name">make-machine</span>
   &#x27;(exp env val proc argl continue unev)
   eceval-operations
   &#x27;(read-eval-print-loop
     ⟨entire machine controller 
      as given above⟩)))
</code></pre>
<p>ينبغي أن نُعرّف إجراءات Scheme لمحاكاة العمليّات التي يستخدمها المقيّم كأوّليّات. وهذه هي الإجراءات ذاتها التي استخدمناها للمقيّم البعديّ في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1">4.1</a>، مع الإجراءات الإضافيّة القليلة المعرَّفة في الحواشي على امتداد <a href="#g_t5_002e4">5.4</a>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> eceval-operations
  (<span class="hljs-name"><span class="hljs-built_in">list</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;self-evaluating?</span> 
              self-evaluating)
        ⟨complete list of operations 
         for eceval machine⟩))
</code></pre>
<p>وأخيرًا، نستطيع تهيئة البيئة العامّة وتشغيل المقيّم:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> the-global-environment
  (<span class="hljs-name">setup-environment</span>))

(<span class="hljs-name">start</span> eceval)

<span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name"><span class="hljs-built_in">append</span></span> x y)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> x)
      y
      (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> x) (<span class="hljs-name"><span class="hljs-built_in">append</span></span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> x) y))))

<span class="hljs-comment">;;; EC-Eval value:</span>
ok

<span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name"><span class="hljs-built_in">append</span></span> &#x27;(a b c) &#x27;(d e f))

<span class="hljs-comment">;;; EC-Eval value:</span>
(<span class="hljs-name">a</span> b c d e f)
</code></pre>
<p>وبالطبع، فإنّ تقييم التعابير بهذه الطريقة سيستغرق وقتًا أطول بكثيرٍ ممّا لو كنا قد كتبناها مباشرةً في Scheme، وذلك بسبب مستويات المحاكاة المتعدّدة المتداخلة. فإنّ تعابيرنا تُقيَّم بآلة المقيّم ذي المتحكّم الصريح، وهي بدورها محاكاةٌ ببرنامج Scheme، وهو ذاته مُقيَّمٌ بمفسّر Scheme.</p>
<h4>مراقبة أداء المقيّم</h4>
<p>قد تكون المحاكاة أداةً قويّةً لتوجيه تنفيذ المقيّمات. فالمحاكاة تُسهّل - لا استكشاف متغيّرات تصميم آلة المسجّلات فحسب، بل وأيضًا مراقبة أداء المقيّم المحاكى. فإنّ أحد العوامل المهمّة في الأداء هو مدى كفاءة المقيّم في استخدامه المكدّس. ونستطيع ملاحظة عدد عمليّات المكدّس اللازمة لتقييم تعابير مختلفة بتعريف آلة مسجّلات المقيّم باستخدام نسخة المحاكي التي تجمع إحصائيّات حول استخدام المكدّس (<a href="https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2_002e4">5.2.4</a>)، وبإضافة تعليمةٍ عند نقطة دخول <code>print-result</code> في المقيّم لطباعة الإحصائيّات:</p>
<pre><code class="language-scheme">print-result
  <span class="hljs-comment">; added instruction:</span>
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> print-stack-statistics))
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> announce-output)
           (<span class="hljs-name">const</span> <span class="hljs-string">&quot;;;; EC-Eval value:&quot;</span>))
  … <span class="hljs-comment">; same as before</span>
</code></pre>
<p>أمّا تفاعلاتنا مع المقيّم الآن فتصير على النحو الآتي:</p>
<pre><code class="language-scheme"><span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">factorial</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> n <span class="hljs-number">1</span>) <span class="hljs-number">1</span> (<span class="hljs-name"><span class="hljs-built_in">*</span></span> (<span class="hljs-name">factorial</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)) n)))
(<span class="hljs-name">total-pushes</span> = <span class="hljs-number">3</span>, maximum-depth = <span class="hljs-number">3</span>)

<span class="hljs-comment">;;; EC-Eval value:</span>
ok

<span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name">factorial</span> <span class="hljs-number">5</span>)
(<span class="hljs-name">total-pushes</span> = <span class="hljs-number">144</span>, maximum-depth = <span class="hljs-number">28</span>)

<span class="hljs-comment">;;; EC-Eval value:</span>
<span class="hljs-number">120</span>
</code></pre>
<p>لاحِظ أنّ حلقة القيادة في المقيّم تُعيد تهيئة المكدّس في بداية كلّ تفاعل، حتّى تكون الإحصائيّات المطبوعة مُحيلةً فقط على عمليّات المكدّس المستخدمة في تقييم التعبير السابق.</p>
<p><strong>التمرين 5.26:</strong> استخدم المكدّس المراقَب لاستكشاف خاصّيّة التعاوب الذيليّ في المقيّم (<a href="#g_t5_002e4_002e2">5.4.2</a>). شغّل المقيّم وعرّف إجراء <code>factorial</code> التكراريّ الوارد في <a href="https://sarabander.github.io/sicp/html/1_002e2.xhtml#g_t1_002e2_002e1">1.2.1</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">factorial</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">iter</span> product counter)
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">&gt;</span></span> counter n)
        product
        (<span class="hljs-name">iter</span> (<span class="hljs-name"><span class="hljs-built_in">*</span></span> counter product)
              (<span class="hljs-name"><span class="hljs-built_in">+</span></span> counter <span class="hljs-number">1</span>))))
  (<span class="hljs-name">iter</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span>))
</code></pre>
<p>شغّل الإجراء ببعض القيم الصغيرة لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> . وسجّل أقصى عمقٍ للمكدّس وعدد الدفعات اللازمة لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> لكلّ واحدةٍ من هذه القيم.</p>
<ol>
<li>ستجد أنّ أقصى عمقٍ لازمٍ لتقييم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> مستقلٌّ عن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> . فما هو ذلك العمق؟</li>
<li>استخرج من بياناتك صيغةً بدلالة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> للعدد الإجماليّ لعمليّات الدفع المستخدمة في تقييم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> لأيّ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>≥</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n ≥ 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> . ولاحِظ أنّ عدد العمليّات المستخدمة دالّةٌ خطّيّةٌ في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> وهو محدَّدٌ بالتالي بثابتين.</li>
</ol>
<p><strong>التمرين 5.27:</strong> للمقارنة مع <a href="#Exercise-5_002e26">التمرين 5.26</a>، استكشف سلوك الإجراء الآتي في احتساب العوامل المضروب تعاوديًّا:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">factorial</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> n <span class="hljs-number">1</span>)
      <span class="hljs-number">1</span>
      (<span class="hljs-name"><span class="hljs-built_in">*</span></span> (<span class="hljs-name">factorial</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)) n)))
</code></pre>
<p>وبتشغيل هذا الإجراء بالمكدّس المراقَب، حدّد - كدالّةٍ في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> - أقصى عمقٍ للمكدّس والعدد الإجماليّ للدفعات المستخدمة في تقييم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>≥</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n ≥ 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> . (وهاتان الدالّتان خطّيّتان أيضًا.) ولخّص تجاربك بملء الجدول الآتي بالتعابير الملائمة بدلالة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> : <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>M</mi><mi>a</mi><mi>x</mi><mi>i</mi><mi>m</mi><mi>u</mi><mi>m</mi><mi>N</mi><mi>u</mi><mi>m</mi><mi>b</mi><mi>e</mi><mi>r</mi><mi>o</mi><mi>f</mi><mi>d</mi><mi>e</mi><mi>p</mi><mi>t</mi><mi>h</mi><mi>p</mi><mi>u</mi><mi>s</mi><mi>h</mi><mi>e</mi><mi>s</mi><mi>R</mi><mi>e</mi><mi>c</mi><mi>u</mi><mi>r</mi><mi>s</mi><mi>i</mi><mi>v</mi><mi>e</mi><mi>f</mi><mi>a</mi><mi>c</mi><mi>t</mi><mi>o</mi><mi>r</mi><mi>i</mi><mi>a</mi><mi>l</mi><mi>I</mi><mi>t</mi><mi>e</mi><mi>r</mi><mi>a</mi><mi>t</mi><mi>i</mi><mi>v</mi><mi>e</mi><mi>f</mi><mi>a</mi><mi>c</mi><mi>t</mi><mi>o</mi><mi>r</mi><mi>i</mi><mi>a</mi><mi>l</mi></mrow><annotation encoding="application/x-tex">Maximum Number of depth pushes Recursive factorial Iterative factorial</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">M</span><span class="mord mathnormal">a</span><span class="mord mathnormal">x</span><span class="mord mathnormal">im</span><span class="mord mathnormal">u</span><span class="mord mathnormal">m</span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mord mathnormal">u</span><span class="mord mathnormal">mb</span><span class="mord mathnormal" style="margin-right:0.0278em;">er</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">d</span><span class="mord mathnormal">e</span><span class="mord mathnormal">pt</span><span class="mord mathnormal">h</span><span class="mord mathnormal">p</span><span class="mord mathnormal">u</span><span class="mord mathnormal">s</span><span class="mord mathnormal">h</span><span class="mord mathnormal">es</span><span class="mord mathnormal" style="margin-right:0.0077em;">R</span><span class="mord mathnormal">ec</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">s</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">a</span><span class="mord mathnormal">c</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">ia</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal" style="margin-right:0.0785em;">I</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.0278em;">er</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mord mathnormal">i</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">a</span><span class="mord mathnormal">c</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">ia</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span></span></span></span> أمّا أقصى عمقٍ فهو مقياسٌ لمقدار المساحة التي يستخدمها المقيّم في إجراء الاحتساب، أمّا عدد الدفعات فيقارن جيّدًا بالوقت اللازم.</p>
<blockquote>
<p><strong>التمرين 5.28:</strong> عدّل تعريف المقيّم بتغيير <code>eval-sequence</code> كما هو موصوفٌ في <a href="#g_t5_002e4_002e2">5.4.2</a> بحيث لا يعود المقيّم تعاوديًّا ذيليًّا. وأعد تشغيل تجاربك من <a href="#Exercise-5_002e26">التمرين 5.26</a> و<a href="#Exercise-5_002e27">التمرين 5.27</a> لتُظهر أنّ كلا النسختين من إجراء <code>factorial</code> تتطلّبان الآن مساحةً تنمو خطّيًّا مع معطاهما.</p>
</blockquote>
<p><strong>التمرين 5.29:</strong> راقب عمليّات المكدّس في احتساب فيبوناتشي التعاوديّ الشجريّ:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">fib</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">&lt;</span></span> n <span class="hljs-number">2</span>)
      n
      (<span class="hljs-name"><span class="hljs-built_in">+</span></span> (<span class="hljs-name">fib</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)) (<span class="hljs-name">fib</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">2</span>)))))
</code></pre>
<ol>
<li>أعطِ صيغةً بدلالة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> لأقصى عمقٍ للمكدّس لازمٍ لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>F</mi><mi>i</mi><mi>b</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">Fib ( n )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal">ib</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>≥</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">n ≥ 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> . تلميح: لقد قلنا في <a href="https://sarabander.github.io/sicp/html/1_002e2.xhtml#g_t1_002e2_002e2">1.2.2</a> إنّ المساحة التي تستخدمها هذه العمليّة تنمو خطّيًّا مع <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> .</li>
<li>أعطِ صيغةً للعدد الإجماليّ للدفعات المستخدمة في احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>F</mi><mi>i</mi><mi>b</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">Fib ( n )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal">ib</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>≥</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">n ≥ 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> . ومن المفترض أن تجد أنّ عدد الدفعات (الذي يقارن جيّدًا بالوقت المستخدم) ينمو أسّيًّا مع <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> . تلميح: لِنفترض أنّ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">S ( n )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> هو عدد الدفعات المستخدمة في احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>F</mi><mi>i</mi><mi>b</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">Fib ( n )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal">ib</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> . ومن المفترض أن تتمكّن من إثبات وجود صيغةٍ تُعبِّر عن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">S ( n )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> بدلالة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">S ( n − 1 )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>2</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">S ( n − 2 )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">2</span><span class="mclose">)</span></span></span></span> وثابت «عبء» ثابتٍ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> مستقلٍّ عن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> . أعطِ تلك الصيغة، وقل ما هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> . ثم أظهر أنّ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>S</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">S ( n )</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0576em;">S</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> يمكن التعبير عنه بـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi><mo>⋅</mo><mi>F</mi><mi>i</mi><mi>b</mi><mo stretchy="false">(</mo><mi>n</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mo>+</mo><mi>b</mi></mrow><annotation encoding="application/x-tex">a ⋅ Fib ( n + 1 ) + b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4445em;"></span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mord mathnormal">ib</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span> وأعطِ قيمتَي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>b</mi></mrow><annotation encoding="application/x-tex">b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span> .</li>
</ol>
<blockquote>
<p><strong>التمرين 5.30:</strong> إنّ مقيّمنا يلتقط ويُشير حاليًّا إلى نوعين فقط من الأخطاء - أنواع التعابير غير المعروفة وأنواع الإجراءات غير المعروفة. أمّا الأخطاء الأخرى فتخرج بنا من حلقة القراءة والتقييم والطباعة للمقيّم. وحين نشغّل المقيّم باستخدام محاكي آلات المسجّلات، فإنّ هذه الأخطاء تُلتقط بنظام Scheme الأساس. وهذا يقابل انهيار الحاسوب حين يرتكب برنامج المستخدم خطأً.<sup class="footnote-ref"><a href="#fn32" id="fnref32">[32]</a></sup> وإنّ جعل نظام أخطاءٍ حقيقيّ يعمل مشروعٌ كبير، لكنّ الجهد المبذول لفهم ما يقتضيه الأمر هنا جديرٌ به حقًّا. فالأخطاء التي تقع في عمليّة التقييم، كمحاولة الوصول إلى متغيّرٍ غير مربوط، يمكن التقاطها بتغيير عمليّة البحث بحيث تُعيد شيفرة شرطٍ مميّزة، لا يمكن أن تكون قيمةً ممكنةً لأيّ متغيّر مستخدم. ويستطيع المقيّم اختبار شيفرة الشرط هذه ثم فعل ما يلزم للانتقال إلى <code>signal-error</code>. اعثر على جميع الأماكن في المقيّم حيث يكون مثل هذا التغيير ضروريًّا وأصلحها. وهذا عملٌ كثير.</p>
<blockquote>
<p>والأسوأ من ذلك مشكلة معالجة الأخطاء التي تُشير إليها تطبيقات الإجراءات الأوّليّة، كمحاولة القسمة على صفر أو محاولة استخراج <code>car</code> لرمز. ففي نظامٍ مكتوبٍ باحترافٍ وذو جودةٍ عالية، يُفحص كلّ تطبيقٍ أوّليّ من حيث السلامة كجزء من الأوّليّة ذاتها. فإنّ كلّ نداءٍ لـ<code>car</code> مثلًا قد يفحص أوّلًا أنّ المعطى زوج. وإذا لم يكن المعطى زوجًا، فإنّ التطبيق يُعيد شيفرة شرطٍ مميّزةً إلى المقيّم، والذي يُبلّغ عن الفشل بدوره. ونستطيع ترتيب هذا في محاكي آلات المسجّلات بجعل كلّ إجراءٍ أوّليّ يفحص قابليّة التطبيق ويُعيد شيفرة شرطٍ مميّزةً مناسبةً عند الفشل. وحينئذٍ تستطيع الشيفرة <code>primitive-apply</code> في المقيّم فحص شيفرة الشرط والانتقال إلى <code>signal-error</code> إذا لزم الأمر. ابنِ هذه البنية واجعلها تعمل. وهذا مشروعٌ كبير.</p>
</blockquote>
</blockquote>
<h3 id="55-التصريف">5.5 التصريف</h3>
<p>إنّ المقيّم ذا المتحكّم الصريح الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4">5.4</a> آلةُ مسجّلاتٍ متحكّمها يفسّر برامج Scheme. وفي هذا القسم سنرى كيف نشغّل برامج Scheme على آلة مسجّلاتٍ متحكّمها ليس مفسّر Scheme.</p>
<p>إنّ آلة المقيّم ذي المتحكّم الصريح عامّة - فهي قادرة على أداء أيّ عمليّةٍ حسابيّةٍ يمكن وصفها بـScheme. ومتحكّم المقيّم ينسّق استخدام مسارات بياناته لأداء الاحتساب المطلوب. وبذلك، فإنّ مسارات بيانات المقيّم عامّة: فهي كافيّة لأداء أيّ احتسابٍ نرغبه، بمتحكّمٍ مناسب.<sup class="footnote-ref"><a href="#fn33" id="fnref33">[33]</a></sup></p>
<p>إنّ الحواسيب التجاريّة العامّة الغرض آلاتُ مسجّلاتٍ منظّمةٌ حول مجموعةٍ من المسجّلات والعمليّات التي تُشكّل مجموعةً عامّةً كفوءةً ومريحةً من مسارات البيانات. أمّا متحكّم آلةٍ عامّة الغرض فهو مفسّرٌ للغةٍ من لغات آلات المسجّلات شبيهة بتلك التي كنّا نستخدمها. وهذه اللغة تُسمّى <em>اللغة الأصليّة (native language)</em> للآلة، أو باختصار <em>لغة الآلة (machine language)</em>. والبرامج المكتوبة بلغة الآلة تسلسلاتٌ من التعليمات التي تستخدم مسارات بيانات الآلة. فإنّ تسلسل تعليمات المقيّم ذي المتحكّم الصريح مثلًا يمكن النظر إليه كبرنامجٍ بلغة الآلة لحاسوبٍ عامّ الغرض بدلًا من اعتباره متحكّمًا لآلة مفسّرٍ متخصّصة.</p>
<p>ثمّة استراتيجيّتان شائعتان لردم الفجوة بين اللغات العالية المستوى ولغات آلات المسجّلات. ويُمثّل المقيّم ذو المتحكّم الصريح استراتيجيّة التفسير. فالمفسّر المكتوب باللغة الأصليّة لآلةٍ يُهيّئ الآلة لتنفيذ برامجٍ مكتوبةٍ بلغةٍ (تُسمّى <em>لغة المصدر (source language)</em>) قد تختلف عن اللغة الأصليّة للآلة التي تُجري التقييم. وتُنفَّذ الإجراءات الأوّليّة للغة المصدر كمكتبةٍ من الإجراءات الفرعيّة المكتوبة باللغة الأصليّة للآلة المعطاة. أمّا البرنامج المراد تفسيره (ويُسمّى <em>البرنامج المصدريّ (source program)</em>) فيُمثَّل كبنية بيانات. والمفسّر يجتاز بنية البيانات هذه، محلّلًا البرنامج المصدريّ. وبينما يفعل ذلك، فإنّه يحاكي السلوك المقصود من البرنامج المصدريّ بنداء الإجراءات الفرعيّة الأوّليّة الملائمة من المكتبة.</p>
<p>وفي هذا القسم نستكشف الاستراتيجيّة البديلة، وهي <em>التصريف (compilation)</em>. فإنّ المصرِّف الخاصّ بلغة مصدرٍ وآلةٍ معيّنتين يُترجم برنامجًا مصدريًّا إلى برنامجٍ مكافئٍ (يُسمّى <em>البرنامج الهدف (object program)</em>) مكتوبٍ بلغة الآلة الأصليّة. أمّا المصرِّف الذي ننفّذه في هذا القسم فيُترجم البرامج المكتوبة بـScheme إلى تسلسلاتٍ من التعليمات التي يُنفَّذ باستخدام مسارات بيانات آلة المقيّم ذي المتحكّم الصريح.<sup class="footnote-ref"><a href="#fn34" id="fnref34">[34]</a></sup></p>
<p>وبالمقارنة مع التفسير، فإنّ التصريف قادرٌ على توفير زيادةٍ كبيرةٍ في كفاءة تنفيذ البرامج، كما سنشرح أدناه في استعراضنا للمصرِّف. ومن جهةٍ أخرى، فإنّ المفسّر يوفّر بيئةً أكثر قوّةٍ لتطوير البرامج التفاعليّ وتصحيحها، لأنّ البرنامج المصدريّ قيد التنفيذ متاحٌ في زمن التشغيل للفحص والتعديل. وبالإضافة إلى ذلك، وبسبب حضور مكتبة الأوّليّات بتمامها، يمكن بناء برامج جديدة وإضافتها إلى النظم أثناء التصحيح.</p>
<p>وإذ نُلاحِظ المزايا المكمّلة للتصريف والتفسير، فإنّ بيئات تطوير البرامج الحديثة تنتهج استراتيجيّة مختلطة. فإنّ مفسّرات Lisp منظّمةٌ عمومًا بحيث تستطيع الإجراءات المفسَّرة والإجراءات المصرَّفة أن تنداي بعضها بعضًا. وهذا يمكّن المبرمجَ من تصريف الأجزاء من البرنامج التي يُفترض أنّها صُحِّحت، فيحصُل بذلك على ميزة كفاءة التصريف، مع الاحتفاظ بنمط التنفيذ التفسيريّ للأجزاء التي هي في تطوّرٍ تفاعليٍّ وتصحيح. وفي <a href="#g_t5_002e5_002e7">5.5.7</a>، بعد أن نكون قد نفّذنا المصرِّف، سنُظهر كيف نوفّق بينه وبين مفسّرنا لإنتاج نظام تطويرٍ متكاملٍ يجمع المفسّر والمصرِّف.</p>
<h4>استعراض المصرِّف</h4>
<p>إنّ مصرّفنا يشبه مفسّرنا إلى حدٍّ كبير، في بنيته وفي الوظيفة التي يؤدّيها. ووفقًا لذلك، فإنّ الآليّات التي يستخدمها المصرِّف لتحليل التعابير ستشبه تلك التي يستخدمها المفسّر. وبالإضافة إلى ذلك، ولتسهيل التوفيق بين الشيفرة المصرَّفة والشيفرة المفسَّرة، سنُصمّم المصرِّف ليُنتج شيفرةً تلتزم بالأعراف ذاتها في استخدام المسجّلات التي يلتزم بها المفسّر: فتُحفظ البيئة في المسجّل <code>env</code>، وتُتراكم قوائم المعطيات في <code>argl</code>، ويكون الإجراء المطلوب تطبيقه في <code>proc</code>، وتُعيد الإجراءات أجوبتها في <code>val</code>، ويُحفظ الموضع الذي ينبغي أن يعود إليه الإجراء في <code>continue</code>. وبصورةٍ عامّة، يُترجم المصرِّف برنامجًا مصدريًّا إلى برنامجٍ هدفٍ يؤدّي - في الجوهري - عمليّات المسجّل ذاتها التي كان المفسّر سيؤدّيها في تقييم البرنامج المصدريّ ذاته.</p>
<p>وهذا الوصف يقترح استراتيجيّة لتنفيذ مصرِّفٍ أوّليّ: نجتاز التعبير بالطريقة ذاتها التي يجتازها المفسّر. وحين نصادف تعليمة مسجّلٍ كان المفسّر سيؤدّيها في تقييم التعبير، فإنّنا لا ننفّذ التعليمة بل نُراكمها في تسلسلٍ بدلًا من ذلك. وتسلسل التعليمات الناتج سيكون شيفرة الهدف. وتأمّل ميزة كفاءة التصريف على التفسير. ففي كلّ مرّةٍ يُقيّم فيها المفسّر تعبيرًا - <code>(f 84 96)</code> مثلًا - فإنّه يؤدّي عمل تصنيف التعبير (باكتشاف أنّ هذا تطبيق إجراء) واختبار نهاية قائمة العوامل (باكتشاف أنّ هناك عاملين). أمّا مع مصرِّف، فإنّ التعبير يُحلَّل مرّةً واحدةً فقط، حين يُنتَج تسلسل التعليمات في زمن التصريف. وشيفرة الهدف التي يُنتجها المصرِّف تحتوي فقط على التعليمات التي تُقيّم المشغّل والعاملين، وتبني قائمة المعطيات، وتُطبّق الإجراء (في <code>proc</code>) على المعطيات (في <code>argl</code>).</p>
<p>وهذا هو النوع ذاته من التحسين الذي نفّذناه في المقيّم المحلِّل الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>. لكن ثمّة فرصًا أخرى لاكتساب الكفاءة في الشيفرة المصرَّفة. فبينما يعمل المفسّر، فإنّه يتبع عمليّةً يجب أن تكون قابلة للتطبيق على أيّ تعبيرٍ في اللغة. وبالمقابل، فإنّ مقطعًا معيّنًا من الشيفرة المصرَّفة يُقصد به تنفيذ تعبيرٍ خاصّ بعينه. وهذا قد يُحدث فرقًا كبيرًا، في استخدام المكدّس لحفظ المسجّلات مثلًا. فحين يُقيّم المفسّر تعبيرًا، ينبغي أن يكون مستعدًّا لأيّ طارئ. وقبل تقييم تعبيرٍ جزئيّ، يحفظ المفسّر جميع المسجّلات التي ستكون لازمةً لاحقًا، لأنّ التعبير الجزئيّ قد يتطلّب تقييمًا اعتباطيًّا. أمّا المصرِّف، من جهةٍ أخرى، فيستطيع استثمار بنية التعبير الخاصّ الذي يعالجه ليُنتج شيفرةً تتجنّب عمليّات المكدّس غير الضروريّة.</p>
<p>وبوصفه مثالًا على ذلك، تأمّل التركيب <code>(f 84 96)</code>. فقبل أن يُقيّم المفسّر مشغّل التركيب، فإنّه يتهيّأ لهذا التقييم بحفظ المسجّلات التي تحتوي العوامل والبيئة، والتي ستكون قيمُها لازمةً لاحقًا. ثم يُقيّم المفسّر المشغّل ليحصل على النتيجة في <code>val</code>، ويستعيد المسجّلات المحفوظة، وأخيرًا ينقل النتيجة من <code>val</code> إلى <code>proc</code>. لكنّنا في التعبير الخاصّ الذي نتعامل معه، المشغّل هو الرمز <code>f</code>، الذي يُنجَز تقييمه بعمليّة الآلة <code>lookup-variable-value</code>، وهي لا تُغيّر أيّ مسجّل. والمصرِّف الذي ننفّذه في هذا القسم سيستفيد من هذه الحقيقة ويُنتج شيفرةً تُقيّم المشغّل باستخدام التعليمة</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> proc 
        (<span class="hljs-name">op</span> lookup-variable-value)
        (<span class="hljs-name">const</span> f)
        (<span class="hljs-name">reg</span> env))
</code></pre>
<p>وهذه الشيفرة لا تتجنّب الحفظ والاستعادة غير الضروريّين فحسب، بل تُسند أيضًا نتيجة البحث مباشرةً إلى <code>proc</code>، بخلاف المفسّر الذي كان سيستخرج النتيجة في <code>val</code> ثم ينقلها إلى <code>proc</code>.</p>
<p>ويستطيع المصرِّف أيضًا تحسين الوصول إلى البيئة. فإنّه بعد تحليل الشيفرة، يستطيع المصرِّف - في حالاتٍ كثيرةٍ - أن يعرف في أيّ إطارٍ سيقع متغيّرٌ خاصّ، وأن يصل إلى ذلك الإطار مباشرةً، بدلًا من إجراء بحث <code>lookup-variable-value</code>. وسنناقش كيف ننفّذ وصول المتغيّرات هذا في <a href="#g_t5_002e5_002e6">5.5.6</a>. لكنّنا، حتّى ذلك الحين، سنركّز على نوع تحسينات المسجّلات والمكدّس الموصوف أعلاه. ثمّة تحسيناتٌ أخرى كثيرةٌ يستطيع المصرِّف أداءها، كترميز العمليّات الأوّليّة «سطرًا» بدلًا من استخدام آليّة <code>apply</code> عامّة (انظر <a href="#Exercise-5_002e38">التمرين 5.38</a>)؛ لكنّنا لن نُشدّد على هذه هنا. أمّا هدفنا الرئيسيّ في هذا القسم فهو توضيح عمليّة التصريف في سياقٍ مبسّطٍ (لكنه لا يزال مثيرًا للاهتمام).</p>
<h4>5.5.1 بنية المصرِّف</h4>
<p>لقد عدّلنا في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a> مفسّرنا البعديّ الأصليّ لفصل التحليل عن التنفيذ. فقد حلّلنا كلّ تعبيرٍ لنُنتج إجراء تنفيذٍ يأخذ بيئةً كمعطىً ويؤدّي العمليّات المطلوبة. وفي مصرّفنا، سنجري التحليل ذاته في الجوهري. لكنّنا، بدلًا من إنتاج إجراءات تنفيذٍ، سنُنتج تسلسلاتٍ من التعليمات التي ستُشغَّل بآلة مسجّلاتنا.</p>
<p>والإجراء <code>compile</code> هو التوزيع الأعلى مستوىً في المصرِّف. وهو يقابل الإجراء <code>eval</code> الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e1">4.1.1</a>، والإجراء <code>analyze</code> الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>، ونقطة دخول <code>eval-dispatch</code> في المقيّم ذي المتحكّم الصريح الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1">5.4.1</a>. وإنّ المصرِّف - كالمفسّرات - يستخدم إجراءات صياغة التعبير المعرَّفة في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2">4.1.2</a>.<sup class="footnote-ref"><a href="#fn35" id="fnref35">[35]</a></sup> ويُجري <code>compile</code> تحليل حالاتٍ على النوع الصياغيّ للتعبير المطلوب تصريفه. فلكلّ نوعٍ من التعابير، يوزّع إلى <em>مولّد شيفرةٍ (code generator)</em> متخصّص:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile</span> exp target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name">self-evaluating?</span> exp)
         (<span class="hljs-name">compile-self-evaluating</span> 
          exp target linkage))
        ((<span class="hljs-name">quoted?</span> exp) 
         (<span class="hljs-name">compile-quoted</span> exp target linkage))
        ((<span class="hljs-name">variable?</span> exp)
         (<span class="hljs-name">compile-variable</span> 
          exp target linkage))
        ((<span class="hljs-name">assignment?</span> exp)
         (<span class="hljs-name">compile-assignment</span>
          exp target linkage))
        ((<span class="hljs-name">definition?</span> exp)
         (<span class="hljs-name">compile-definition</span>
          exp target linkage))
        ((<span class="hljs-name">if?</span> exp)
         (<span class="hljs-name">compile-if</span> exp target linkage))
        ((<span class="hljs-name">lambda?</span> <span class="hljs-name"><span class="hljs-built_in">exp</span></span>)
         (<span class="hljs-name">compile-lambda</span> exp target linkage))
        ((<span class="hljs-name">begin?</span> exp)
         (<span class="hljs-name">compile-sequence</span> 
          (<span class="hljs-name">begin-actions</span> exp) target linkage))
        ((<span class="hljs-name">cond?</span> exp) 
         (<span class="hljs-name">compile</span> 
          (<span class="hljs-name">cond-&gt;if</span> exp) target linkage))
        ((<span class="hljs-name">application?</span> exp)
         (<span class="hljs-name">compile-application</span> 
          exp target linkage))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span>
         (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown expression type: 
                 COMPILE&quot;</span> 
                exp))))
</code></pre>
<h4>الأهداف والروابط</h4>
<p>إنّ <code>compile</code> ومولّدات الشيفرة التي ينديها يأخذان - بالإضافة إلى التعبير المطلوب تصريفه - معطيين. هناك <em>هدف (target)</em>، يُحدّد المسجّل الذي ينبغي أن تُعيد فيه الشيفرة المصرَّفة قيمة التعبير. وهناك أيضًا <em>واصف ربط (linkage descriptor)</em>، يصف كيف ينبغي أن تسير الشيفرة الناتجة عن تصريف التعبير بعد أن تُتمّ تنفيذها. ويستطيع واصف الربط أن يُلزم الشيفرة بأداء واحدةٍ من الأمور الثلاثة الآتية:</p>
<ul>
<li>المواصلة عند التعليمة التالية في التسلسل (وهذا ما يُحدّده واصف الربط <code>next</code>)،</li>
<li>العودة من الإجراء قيد التصريف (وهذا ما يُحدّده واصف الربط <code>return</code>)، أو</li>
<li>القفز إلى نقطة دخولٍ مُسمّاة (وهذا ما يُحدّده استخدام التسمية المُعيّنة واصفًا للربط).</li>
</ul>
<p>فمثلًا، ينبغي لتصريف التعبير <code>5</code> (الذي يُقيّم ذاتيًّا) بهدفٍ هو المسجّل <code>val</code> وبربطٍ هو <code>next</code> أن يُنتج التعليمة</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">5</span>))
</code></pre>
<p>وينبغي لتصريف التعبير ذاته بربطٍ هو <code>return</code> أن يُنتج التعليمات</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">5</span>))
(<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
</code></pre>
<p>في الحالة الأولى، سيستمرّ التنفيذ بالتعليمة التالية في التسلسل. وفي الحالة الثانية، سنعود من نداء إجراء. وفي كلتي الحالتين، ستُوضع قيمة التعبير في مسجّل الهدف <code>val</code>.</p>
<h4>تسلسلات التعليمات واستخدام المكدّس</h4>
<p>يُعيد كلّ مولّد شيفرةٍ <em>تسلسل تعليمات (instruction sequence)</em> يحتوي شيفرة الهدف التي ولّدها للتعبير. أمّا توليد الشيفرة لتعبيرٍ مركّبٍ فيُنجَز بدمج مُخرَج مولّدات شيفرةٍ أبسط للتعابير المكوّنة، تمامًا كما يُنجَز تقييم تعبيرٍ مركّبٍ بتقييم التعابير المكوّنة له.</p>
<p>إنّ أبسط طريقةٍ لدمج تسلسلات التعليمات هو إجراءٌ يُسمّى <code>append-instruction-sequences</code>. وهو يأخذ كمعطيات أيّ عددٍ من تسلسلات التعليمات التي يُنفَّذ بالتعاقب؛ فإنّه يُلحق بعضها ببعض ويُعيد التسلسل المدمَج. أي أنّّه، إذا كان <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ s e q_{1} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ s e q_{2} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span> تسلسلَي تعليمات، فإنّ تقييم</p>
<pre><code class="language-scheme">(<span class="hljs-name">append-instruction-sequences</span> ⟨seq₁⟩ ⟨seq₂⟩)
</code></pre>
<p>يُنتج التسلسل</p>
<pre><code class="language-scheme">⟨seq₁⟩
⟨seq₂⟩
</code></pre>
<p>كلّما قد تحتاج المسجّلات إلى الحفظ، تستخدم مولّدات الشيفرة في المصرِّف <code>preserving</code>، وهي طريقة أكثر دقّةً لدمج تسلسلات التعليمات. و<code>preserving</code> تأخذ ثلاثة معطيات: مجموعةً من المسجّلات وتسلسلي تعليمات يُنفَّذان بالتعاقب. وهي تُلحق التسلسلين بعضهما ببعض بحيث تُحفظ محتويات كلّ مسجّلٍ في المجموعة على امتداد تنفيذ التسلسل الأوّل، إذا كان ذلك لازمًا لتنفيذ التسلسل الثاني. أي أنّّه، إذا عدّل التسلسل الأوّل المسجّل وكان التسلسل الثاني يحتاج فعلًا إلى محتويات المسجّل الأصليّة، فإنّ <code>preserving</code> تلفّ <code>save</code> و<code>restore</code> للمسجّل حول التسلسل الأوّل قبل إلحاق التسلسلين. وإلّا، فإنّ <code>preserving</code> تُعيد تسلسلات التعليمات الملحوقة فحسب. وبذلك، فإنّ <code>(preserving (list ⟨reg₁⟩ ⟨reg₂⟩) ⟨seg₁⟩ ⟨seg₂⟩)</code> مثلًا يُنتج واحدًا من تسلسلات التعليمات الأربعة الآتية، بحسب كيفيّة استخدام <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ s e q_{1} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ s e q_{2} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span> لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ r e g_{1} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span> و<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ r e g_{2} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span> : <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">(</mo><mi>s</mi><mi>a</mi><mi>v</mi><mi>e</mi><mo stretchy="false">(</mo><mi>s</mi><mi>a</mi><mi>v</mi><mi>e</mi><mo stretchy="false">(</mo><mi>s</mi><mi>a</mi><mi>v</mi><mi>e</mi><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>s</mi><mi>a</mi><mi>v</mi><mi>e</mi><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">(</mo><mi>r</mi><mi>e</mi><mi>s</mi><mi>t</mi><mi>o</mi><mi>r</mi><mi>e</mi><mo stretchy="false">(</mo><mi>r</mi><mi>e</mi><mi>s</mi><mi>t</mi><mi>o</mi><mi>r</mi><mi>e</mi><mo stretchy="false">(</mo><mi>r</mi><mi>e</mi><mi>s</mi><mi>t</mi><mi>o</mi><mi>r</mi><mi>e</mi><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>1</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mi>r</mi><mi>e</mi><mi>s</mi><mi>t</mi><mi>o</mi><mi>r</mi><mi>e</mi><mo stretchy="false">⟨</mo><mi>r</mi><mi>e</mi><msub><mi>g</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">)</mo><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo><mo stretchy="false">⟨</mo><mi>s</mi><mi>e</mi><msub><mi>q</mi><mn>2</mn></msub><mo stretchy="false">⟩</mo></mrow><annotation encoding="application/x-tex">⟨ s e q_{1} ⟩ (save (save (save ⟨ r e g_{2} ⟩ ) ⟨ s e q_{2} ⟩ ⟨ r e g_{1} ⟩ ) ⟨ r e g_{2} ⟩ ) (save ⟨ r e g_{1} ⟩ ) ⟨ s e q_{1} ⟩ ⟨ s e q_{1} ⟩ ⟨ s e q_{1} ⟩ (restore (restore (restore ⟨ r e g_{1} ⟩ ) ⟨ r e g_{1} ⟩ ) ⟨ r e g_{2} ⟩ ) (restore ⟨ r e g_{2} ⟩ ) ⟨ s e q_{2} ⟩ ⟨ s e q_{2} ⟩ ⟨ s e q_{2} ⟩</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mopen">(</span><span class="mord mathnormal">s</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">e</span><span class="mopen">(</span><span class="mord mathnormal">s</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">e</span><span class="mopen">(</span><span class="mord mathnormal">s</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">e</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">(</span><span class="mord mathnormal">s</span><span class="mord mathnormal">a</span><span class="mord mathnormal" style="margin-right:0.0359em;">v</span><span class="mord mathnormal">e</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">es</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">e</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">es</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">e</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">es</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">e</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">es</span><span class="mord mathnormal">t</span><span class="mord mathnormal" style="margin-right:0.0278em;">or</span><span class="mord mathnormal">e</span><span class="mopen">⟨</span><span class="mord mathnormal" style="margin-right:0.0278em;">r</span><span class="mord mathnormal">e</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩)</span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span><span class="mopen">⟨</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">q</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0359em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">⟩</span></span></span></span></p>
<p>إنّ استخدام <code>preserving</code> لدمج تسلسلات التعليمات يجعل المصرِّف يتجنّب عمليّات المكدّس غير الضروريّة. وهذا يعزل أيضًا تفاصيل ما إذا كان توليد تعليمات <code>save</code> و<code>restore</code> لازمًا أم لا داخل الإجراء <code>preserving</code>، فاصلًا إيّاها عن الهموم الناشئة عن كتابة كلّ مولّد شيفرةٍ فرديّ. فإنّه لا تُنتج فعليًّا أيّ تعليمة <code>save</code> أو <code>restore</code> صراحةً من قِبَل مولّدات الشيفرة.</p>
<p>من حيث المبدأ، كان بإمكاننا تمثيل تسلسل تعليماتٍ كقائمةٍ من التعليمات. وعندئذٍ يستطيع <code>append-instruction-sequences</code> دمج تسلسلات التعليمات بأداء <code>append</code> عاديّ على القوائم. لكنّ <code>preserving</code> سيصير عندئذٍ عمليّةً معقّدة، لأنّه سيتعيّن عليها تحليل كلّ تسلسل تعليماتٍ لتحديد كيفيّة استخدام التسلسل لمسجّلاته. و<code>preserving</code> سيكون غير كفؤٍ فضلًا عن كونه معقّدًا، لأنّه سيتعيّن عليه تحليل كلّ واحدٍ من معطياته التي هي تسلسلات تعليمات، حتّى وإن كانت هذه التسلسلات قد بُنيت بدورها بنداءاتٍ إلى <code>preserving</code>، وفي هذه الحالة تكون أجزاؤها قد حُلِّلت سابقًا. ولكي نتجنّب مثل هذا التحليل المتكرّر، سنربط بكلّ تسلسل تعليماتٍ بعض المعلومات حول استخدامه للمسجّلات. وحين نبني تسلسل تعليماتٍ أساسيًّا، سنُوفّر هذه المعلومات صراحةً، والإجراءات التي تدمج تسلسلات التعليمات ستستخرج معلومات استخدام المسجّلات للتسلسل المدمَج من المعلومات المرتبطة بالتسلسلات المكوّنة.</p>
<p>سيحتوي تسلسل التعليمات على ثلاثة أجزاء من المعلومات:</p>
<ul>
<li>مجموعة المسجّلات التي يجب تهيئتها قبل تنفيذ التعليمات في التسلسل (يُقال عن هذه المسجّلات أنّ التسلسل <em>يحتاج</em> إليها)،</li>
<li>مجموعة المسجّلات التي تُعدّل قيمها التعليمات في التسلسل، و</li>
<li>التعليمات الفعليّة (المسمّاة أيضًا <em>العبارات</em>) في التسلسل.</li>
</ul>
<p>وسنمثّل تسلسل التعليمات كقائمةٍ من أجزائه الثلاثة. وباني تسلسلات التعليمات هو إذن</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-instruction-sequence</span> 
         needs modifies statements)
  (<span class="hljs-name"><span class="hljs-built_in">list</span></span> needs modifies statements))
</code></pre>
<p>فمثلًا، تسلسل التعليمتين الذي يبحث عن قيمة المتغيّر <code>x</code> في البيئة الحاليّة، ويسند النتيجة إلى <code>val</code>، ثم يرجع، يتطلّب أن يكون المسجّلان <code>env</code> و<code>continue</code> قد هُيّئا، ويعدّل المسجّل <code>val</code>. وبذلك، سيُبنى هذا التسلسل على النحو الآتي</p>
<pre><code class="language-scheme">(<span class="hljs-name">make-instruction-sequence</span>
 &#x27;(env continue)
 &#x27;(val)
 &#x27;((assign val
           (op lookup-variable-value)
           (const x)
           (reg env))
   (goto (reg continue))))
</code></pre>
<p>ونحتاج أحيانًا إلى بناء تسلسل تعليماتٍ بلا عبارات:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">empty-instruction-sequence</span>)
  (<span class="hljs-name">make-instruction-sequence</span> &#x27;() &#x27;() &#x27;()))
</code></pre>
<p>الإجراءات الخاصة بدمج تسلسلات التعليمات موضّحة في <a href="#g_t5_002e5_002e4">5.5.4</a>.</p>
<p><strong>التمرين 5.31:</strong> في تقييم تطبيق إجراءٍ، يحفظ مُقيِّم التحكّم الصريح دائمًا المسجّل <code>env</code> ويعيده حول تقييم المشغّل، ويحفظ <code>env</code> ويعيده حول تقييم كلّ عاملٍ باستثناء الأخير، ويحفظ <code>argl</code> ويعيده حول تقييم كلّ عامل، ويحفظ <code>proc</code> ويعيده حول تقييم تسلسل العوامل. فبالنسبة لكلّ تركيبةٍ من التركيبات الآتية، قُل أيّ عمليّات <code>save</code> و<code>restore</code> هذه زائدةٌ عن الحاجة وبإمكانها بالتالي أن تُحذف بواسطة آليّة <code>preserving</code> في المصرِّف:</p>
<pre><code class="language-scheme">(<span class="hljs-name">f</span> <span class="hljs-symbol">&#x27;x</span> <span class="hljs-symbol">&#x27;y</span>)
((<span class="hljs-name">f</span>) <span class="hljs-symbol">&#x27;x</span> <span class="hljs-symbol">&#x27;y</span>)
(<span class="hljs-name">f</span> (<span class="hljs-name">g</span> <span class="hljs-symbol">&#x27;x</span>) y)
(<span class="hljs-name">f</span> (<span class="hljs-name">g</span> <span class="hljs-symbol">&#x27;x</span>) <span class="hljs-symbol">&#x27;y</span>)
</code></pre>
<blockquote>
<p><strong>التمرين 5.32:</strong> باستخدام آليّة <code>preserving</code>، سيتجنّب المصرِّف حفظ <code>env</code> وإعادته حول تقييم مشغّل تركيبةٍ في الحالة التي يكون فيها المشغّل رمزًا. وبإمكاننا أيضًا أن نُدمج تحسيناتٍ كهذه في المُقيِّم. ففي الحقيقة، إنّ مُقيِّم التحكّم الصريح الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4">5.4</a> يؤدّي تحسينًا مشابهًا بالفعل، وذلك بمعاملة التركيبات التي لا عوامل لها كحالةٍ خاصّة. وسّع مُقيِّم التحكّم الصريح ليتعرّف على التركيبات التي مشغّلها رمز كصنفٍ منفصلٍ من التعابير، وليستثمر هذه الحقيقة في تقييم مثل هذه التعابير.</p>
<blockquote>
<p>تقترح أليسا پي. هاكر أنه بتوسيع المُقيِّم ليتعرّف على المزيد من الحالات الخاصّة فأكثر، فبوسعنا أن نُدرج جميع تحسينات المصرِّف، وأنّ هذا من شأنه أن يُزيل مزيّة التصريف برمّتها. فما رأيك في هذه الفكرة؟</p>
</blockquote>
</blockquote>
<h4>5.5.2 تصريف التعابير</h4>
<p>في هذا القسم والقسم التالي نُنفّذ مولّدات الشيفرة التي يُوزّع إليها الإجراء <code>compile</code>.</p>
<h4>تصريف شيفرة الوصل</h4>
<p>بصورةٍ عامّة، ستنتهي مخرجات كلّ مولّد شيفرةٍ بتعليماتٍ - تُولَّدها الإجراء <code>compile-linkage</code> - تُنفّذ الوصل المطلوب. فإن كان الوصل هو <code>return</code> فيجب أن نُولّد التعليمة <code>(goto (reg continue))</code>. وهذا يحتاج المسجّل <code>continue</code> ولا يعدّل أيّ مسجّلات. فإن كان الوصل هو <code>next</code>، فنحن لا نحتاج إلى إضافة أيّ تعليمات. وإلّا، فالوصل عنوانٌ (label)، ونُولّد <code>goto</code> إلى ذلك العنوان، وهو تعليمةٌ لا تحتاج ولا تعدّل أيّ مسجّلات.<sup class="footnote-ref"><a href="#fn36" id="fnref36">[36]</a></sup></p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-linkage</span> linkage)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;return</span>)
         (<span class="hljs-name">make-instruction-sequence</span> 
          &#x27;(continue)
          &#x27;()
          &#x27;((goto (reg continue)))))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;next</span>)
         (<span class="hljs-name">empty-instruction-sequence</span>))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span>
         (<span class="hljs-name">make-instruction-sequence</span> &#x27;() &#x27;()
          \`((goto (label ,linkage)))))))
</code></pre>
<p>تُلحَق شيفرة الوصل بتسلسل تعليماتٍ بواسطة <code>preserving</code> للمسجّل <code>continue</code>، إذ إنّ وصل <code>return</code> سيحتاج المسجّل <code>continue</code>: فإن كان تسلسل التعليمات المعطى يُعدّل <code>continue</code> وشيفرة الوصل تحتاجه، فسيُحفظ <code>continue</code> ويُستعاد.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">end-with-linkage</span> 
         linkage instruction-sequence)
  (<span class="hljs-name">preserving</span> &#x27;(continue)
   instruction-sequence
   (<span class="hljs-name">compile-linkage</span> linkage)))
</code></pre>
<h4>تصريف التعابير البسيطة</h4>
<p>مولّدات الشيفرة الخاصّة بالتعابير التي تُقيّم ذاتيًّا والاقتباسات والمتغيّرات تبني تسلسلات تعليماتٍ تُسنِد القيمة المطلوبة إلى المسجّل الهدف ثم تواصل بالطريقة التي يُحدّدها واصف الوصل.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-self-evaluating</span> 
         exp target linkage)
  (<span class="hljs-name">end-with-linkage</span>
   linkage (<span class="hljs-name">make-instruction-sequence</span> 
            &#x27;()
            (<span class="hljs-name"><span class="hljs-built_in">list</span></span> target)
            \`((assign ,target (const ,exp))))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-quoted</span> exp target linkage)
  (<span class="hljs-name">end-with-linkage</span>
   linkage
   (<span class="hljs-name">make-instruction-sequence</span>
    &#x27;()
    (<span class="hljs-name"><span class="hljs-built_in">list</span></span> target)
    \`((assign 
       ,target
       (const ,(text-of-quotation exp)))))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-variable</span>
         exp target linkage)
  (<span class="hljs-name">end-with-linkage</span> 
   linkage
   (<span class="hljs-name">make-instruction-sequence</span> 
    &#x27;(env)
    (<span class="hljs-name"><span class="hljs-built_in">list</span></span> target)
    \`((assign ,target
              (op lookup-variable-value)
              (const ,exp)
              (reg env))))))
</code></pre>
<p>جميع تعليمات الإسناد هذه تُعدّل المسجّل الهدف، وتلك التي تبحث عن قيمة متغيّر تحتاج المسجّل <code>env</code>.</p>
<p>وتُعالَج الإحلالات والتعريفات إلى حدٍّ كبيرٍ كما تُعالَج في المفسّر. فنحن نُولّد تعاوديًّا شيفرةً تحتسب القيمة التي ستُسنَد إلى المتغيّر، ونُلحق بها تسلسلًا من تعليمتين يُعيّن المتغيّر فعلًا أو يُعرّفه ويُسنِد قيمة التعبير كلّه (الرمز <code>ok</code>) إلى المسجّل الهدف. والتصريف التعاوديّ له هدفٌ هو <code>val</code> ووصلٌ هو <code>next</code> حتّى تضع الشيفرة نتيجتها في <code>val</code> وتواصل بالشيفرة المُلحَقة بعدها. أمّا الإلحاق فيُجرى مع حفظ <code>env</code>، إذ إنّ البيئة لازمة لتعيين المتغيّر أو تعريفه، وقد تكون شيفرة قيمة المتغيّر تصريفَ تعبيرٍ مركّب قد يُعدّل المسجّلات بطرائق اعتباطيّة.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-assignment</span> 
         exp target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">var</span> (<span class="hljs-name">assignment-variable</span> exp))
        (<span class="hljs-name">get-value-code</span>
         (<span class="hljs-name">compile</span> (<span class="hljs-name">assignment-value</span> exp) 
                  <span class="hljs-symbol">&#x27;val</span>
                  <span class="hljs-symbol">&#x27;next</span>)))
    (<span class="hljs-name">end-with-linkage</span> 
     linkage
     (<span class="hljs-name">preserving</span> 
      &#x27;(env)
      get-value-code
      (<span class="hljs-name">make-instruction-sequence</span>
       &#x27;(env val)
       (<span class="hljs-name"><span class="hljs-built_in">list</span></span> target)
       \`((perform (op set-variable-value!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))))))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-definition</span> 
         exp target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">var</span> (<span class="hljs-name">definition-variable</span> exp))
        (<span class="hljs-name">get-value-code</span>
         (<span class="hljs-name">compile</span> (<span class="hljs-name">definition-value</span> exp)
                  <span class="hljs-symbol">&#x27;val</span>
                  <span class="hljs-symbol">&#x27;next</span>)))
    (<span class="hljs-name">end-with-linkage</span>
     linkage
     (<span class="hljs-name">preserving</span> 
      &#x27;(env)
      get-value-code
      (<span class="hljs-name">make-instruction-sequence</span>
       &#x27;(env val)
       (<span class="hljs-name"><span class="hljs-built_in">list</span></span> target)
       \`((perform (op define-variable!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))))))))
</code></pre>
<p>التسلسل المُلحَق المكوّن من تعليمتين يحتاج <code>env</code> و<code>val</code> ويُعدّل الهدف. ولاحِظ أنّنا مع أنّنا نحفظ <code>env</code> من أجل هذا التسلسل، فإنّا لا نحفظ <code>val</code>، لأنّ <code>get-value-code</code> مُصمَّمٌ لوضع نتيجته في <code>val</code> صراحةً لاستخدام هذا التسلسل لها. (في الحقيقة، لو حفظنا <code>val</code>، لكان لدينا عِلّة، لأنّ هذا من شأنه أن يُسبّب استعادة المحتويات السابقة لـ<code>val</code> مباشرةً بعد تشغيل <code>get-value-code</code>.)</p>
<h4>تصريف التعابير الشرطيّة</h4>
<p>شيفرة تعبير <code>if</code> المُصَرَّف بهدفٍ ووصلٍ معطيين لها الصيغة الآتية</p>
<pre><code class="language-scheme">⟨compilation of predicate, 
 target val, linkage next⟩
 (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> false?) (<span class="hljs-name">reg</span> val))
 (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> false-branch))
true-branch
 ⟨compilation of consequent with given 
  target and given linkage or after-if⟩
false-branch
 ⟨compilation of alternative 
  with given target and linkage⟩
after-if
</code></pre>
<p>ولتوليد هذه الشيفرة، نُصَرِّف المسيّم والنتيجة والبديل، وندمج الشيفرة الناتجة مع تعليماتٍ لاختبار نتيجة المسيّم ومع عناوينَ حديثةِ التوليد لوسم الفرع الصحيح والفرع الخاطئ ونهاية التعبير الشرطيّ.<sup class="footnote-ref"><a href="#fn37" id="fnref37">[37]</a></sup> وفي هذا الترتيب للشيفرة، يجب أن نتفرّع متجاوزين الفرع الصحيح إذا كان الاختبار خاطئًا. والتعقيد الطفيف الوحيد هو في كيفيّة التعامل مع وصلة الفرع الصحيح. فإن كان وصلة التعبير الشرطيّ هو <code>return</code> أو عنوانًا، فإنّ الفرعين الصحيح والخاطئ سيستخدمان الوصل عينه. فإن كان الوصل هو <code>next</code>، فإنّ الفرع الصحيح ينتهي بقفزةٍ متجاوزةً شيفرة الفرع الخاطئ إلى العنوان عند نهاية التعبير الشرطيّ.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-if</span> exp target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">t-branch</span> (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;true-branch</span>))
        (<span class="hljs-name">f-branch</span> (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;false-branch</span>))
        (<span class="hljs-name">after-if</span> (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;after-if</span>)))
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">consequent-linkage</span>
           (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;next</span>) 
               after-if
               linkage)))
      (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">p-code</span> 
             (<span class="hljs-name">compile</span> (<span class="hljs-name">if-predicate</span> exp)
                      <span class="hljs-symbol">&#x27;val</span>
                      <span class="hljs-symbol">&#x27;next</span>))
            (<span class="hljs-name">c-code</span>
             (<span class="hljs-name">compile</span> (<span class="hljs-name">if-consequent</span> exp) 
                      target 
                      consequent-linkage))
            (<span class="hljs-name">a-code</span>
             (<span class="hljs-name">compile</span> (<span class="hljs-name">if-alternative</span> exp)
                      target
                      linkage)))
        (<span class="hljs-name">preserving</span> 
         &#x27;(env continue)
         p-code
         (<span class="hljs-name">append-instruction-sequences</span>
          (<span class="hljs-name">make-instruction-sequence</span> 
           &#x27;(val) 
           &#x27;()
           \`((test (op false?) (reg val))
             (branch (label ,f-branch))))
          (<span class="hljs-name">parallel-instruction-sequences</span>
           (<span class="hljs-name">append-instruction-sequences</span> 
            t-branch c-code)
           (<span class="hljs-name">append-instruction-sequences</span>
            f-branch a-code))
          after-if))))))
</code></pre>
<p>يُحفظ <code>env</code> حول شيفرة المسيّم لأنّ الفرعين الصحيح والخاطئ قد يحتاجانه، ويُحفظ <code>continue</code> لأنّ شيفرة الوصل في هذين الفرعين قد تحتاجه. وشيفرة الفرعين الصحيح والخاطئ (اللذين لا يُنفّذان تسلسليًّا) تُلحَق باستخدام مُدَمِّجٍ خاصّ هو <code>parallel-instruction-sequences</code> الموصوف في <a href="#g_t5_002e5_002e4">5.5.4</a>.</p>
<p>ولاحِظ أنّ <code>cond</code> تعبيرٌ مشتقّ، فكلّ ما يلزم المصرِّف ليتعامل معه هو أن يُطبّق المحوّل <code>cond-&gt;if</code> (من <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2">4.1.2</a>) ثم يُصَرِّف تعبير <code>if</code> الناتج.</p>
<h4>تصريف التسلسلات</h4>
<p>إنّ تصريف التسلسلات (الواردة في أجسام الإجراءات أو في تعابير <code>begin</code> الصريحة) يوازي تقييمها. فيُصَرَّف كلّ تعبيرٍ من التسلسل - التعبير الأخير بالوصل المحدَّد للتسلسل، والتعبيرات الأخرى بوصل <code>next</code> (لتنفيذ بقيّة التسلسل). وتُلحَق تسلسلات التعليمات الخاصّة بالتعابير المنفردة لتكوين تسلسل تعليماتٍ واحد، بحيث يُحفظ <code>env</code> (اللازم لبقيّة التسلسل) و<code>continue</code> (الذي قد يكون لازما للوصل عند نهاية التسلسل).</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-sequence</span> seq target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">last-exp?</span> seq)
      (<span class="hljs-name">compile</span> (<span class="hljs-name">first-exp</span> seq) target linkage)
      (<span class="hljs-name">preserving</span> &#x27;(env continue)
       (<span class="hljs-name">compile</span> (<span class="hljs-name">first-exp</span> seq) target <span class="hljs-symbol">&#x27;next</span>)
       (<span class="hljs-name">compile-sequence</span> (<span class="hljs-name">rest-exps</span> seq)
                         target
                         linkage))))
</code></pre>
<h4>تصريف تعابير <code>lambda</code></h4>
<p>إنّ تعابير <code>lambda</code> تُنشئ الإجراءات. ويجب أن تكون الشيفرة الهدف لتعبير <code>lambda</code> على الصيغة الآتية</p>
<pre><code class="language-scheme">⟨construct procedure object 
 and assign it to target register⟩
⟨linkage⟩
</code></pre>
<p>وحين نُصَرِّف تعبير <code>lambda</code>، نُولّد أيضًا الشيفرة الخاصّة بجسم الإجراء. فعلى الرغم من أنّ الجسم لن يُنفَّذ وقت بناء الإجراء، فمن الملائم إدراجه في الشيفرة الهدف مباشرةً بعد شيفرة <code>lambda</code>. فإن كان وصلة تعبير <code>lambda</code> عنوانًا أو <code>return</code>، فهذا حسن. لكن إن كان الوصل هو <code>next</code>، فسنحتاج إلى التجاوز حول شيفرة جسم الإجراء باستخدام وصلةٍ تقفز إلى عنوانٍ يُدرج بعد الجسم. وبذلك، تكون الشيفرة الهدف على الصيغة الآتية</p>
<pre><code class="language-scheme">⟨construct procedure object 
 and assign it to target register⟩
 ⟨code for given linkage⟩ or 
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> after-lambda))
 ⟨compilation of procedure body⟩
after-lambda
</code></pre>
<p>يُولّد <code>compile-lambda</code> شيفرة بناء كائن الإجراء متبوعةً بشيفرة جسم الإجراء. وسيُبنى كائن الإجراء في وقت التشغيل بدمج البيئة الحاليّة (البيئة عند نقطة التعريف) مع نقطة الدخول إلى جسم الإجراء المُصَرَّف (وهو عنوانٌ حديث التوليد).<sup class="footnote-ref"><a href="#fn38" id="fnref38">[38]</a></sup></p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-lambda</span> exp target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">proc-entry</span> 
         (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;entry</span>))
        (<span class="hljs-name">after-lambda</span> 
         (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;after-lambda</span>)))
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">lambda-linkage</span>
           (if (eq? linkage &#x27;next)
               after-lambda
               linkage)))
      (<span class="hljs-name">append-instruction-sequences</span>
       (<span class="hljs-name">tack-on-instruction-sequence</span>
        (<span class="hljs-name">end-with-linkage</span> 
         lambda-linkage
         (<span class="hljs-name">make-instruction-sequence</span> 
          &#x27;(env)
          (<span class="hljs-name"><span class="hljs-built_in">list</span></span> target)
          \`((assign 
             ,target
             (op make-compiled-procedure)
             (label ,proc-entry)
             (reg env)))))
        (<span class="hljs-name">compile-lambda-body</span> exp proc-entry))
       after-lambda))))
</code></pre>
<p>يستخدم <code>compile-lambda</code> المُدَمِّج الخاصّ <code>tack-on-instruction-sequence</code> بدلًا من <code>append-instruction-sequences</code> (<a href="#g_t5_002e5_002e4">5.5.4</a>) لإلحاق جسم الإجراء بشيفرة تعبير <code>lambda</code>، لأنّ الجسم ليس جزءًا من تسلسل التعليمات الذي سيُنفَّذ عند الدخول إلى التسلسل المدمج؛ بل هو في التسلسل فقط لأنّ ذلك كان موضعًا ملائمًا لوضع الجسم فيه.</p>
<p>يُعمّر <code>compile-lambda-body</code> شيفرة جسم الإجراء. فتبدأ هذه الشيفرة بعنوانٍ لنقطة الدخول. ثمّ تأتي تعليماتٌ ستُسبّب انتقال بيئة التقييم في وقت التشغيل إلى البيئة الصحيحة لتقييم جسم الإجراء - أي بيئةُ تعريف الإجراء، ممدودةً لتشمل ربط الوسائط الشكليّة بالمعطيات التي يُدعى بها الإجراء. وبعد هذا تأتي شيفرة تسلسل التعابير الذي يؤلّف جسم الإجراء. ويُصَرَّف التسلسل بوصل <code>return</code> وهدف <code>val</code> حتّى ينتهي بالرجوع من الإجراء ونتيجة الإجراء في <code>val</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-lambda-body</span> exp proc-entry)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">formals</span> (<span class="hljs-name">lambda-parameters</span> <span class="hljs-name"><span class="hljs-built_in">exp</span></span>)))
    (<span class="hljs-name">append-instruction-sequences</span>
     (<span class="hljs-name">make-instruction-sequence</span> 
      &#x27;(env proc argl)
      &#x27;(env)
      \`(,proc-entry
        (assign env 
                (op compiled-procedure-env)
                (reg proc))
        (assign env
                (op extend-environment)
                (const ,formals)
                (reg argl)
                (reg env))))
     (<span class="hljs-name">compile-sequence</span> (<span class="hljs-name">lambda-body</span> <span class="hljs-name"><span class="hljs-built_in">exp</span></span>)
                       <span class="hljs-symbol">&#x27;val</span>
                       <span class="hljs-symbol">&#x27;return</span>))))
</code></pre>
<h4>5.5.3 تصريف التركيبات</h4>
<p>إنّ جوهر عمليّة التصريف هو تصريف تطبيقات الإجراءات. وشيفرة تركيبةٍ مُصَرَّفة بهدفٍ ووصلٍ معطيين لها الصيغة الآتية</p>
<pre><code class="language-scheme">⟨compilation of operator, 
 target proc, linkage next⟩
⟨evaluate operands and construct 
 argument list in argl⟩
⟨compilation of procedure call 
 with given target and linkage⟩
</code></pre>
<p>قد يلزم حفظ المسجّلات <code>env</code> و<code>proc</code> و<code>argl</code> وإعادتها خلال تقييم المشغّل والعوامل. ولاحِظ أنّ هذا هو الموضع الوحيد في المصرِّف الذي يُحدَّد فيه هدفٌ غير <code>val</code>.</p>
<p>تُولَّد الشيفرة المطلوبة بواسطة <code>compile-application</code>. فهذا يُصَرِّف تعاوديًّا المشغّل، لإنتاج شيفرةٍ تضع الإجراء المطلوب تطبيقه في <code>proc</code>، ويُصَرِّف العوامل، لإنتاج شيفرةٍ تُقيّم عوامل التطبيق المنفردة. وتُدمَج تسلسلات التعليمات الخاصّة بالعوامل (بواسطة <code>construct-arglist</code>) مع شيفرةٍ تبني قائمة المعطيات في <code>argl</code>، وتُدمَج شيفرة قائمة المعطيات الناتجة مع شيفرة الإجراء ومع الشيفرة التي تؤدّي نداء الإجراء (والتي يُنتجها <code>compile-procedure-call</code>). وعند إلحاق تسلسلات الشيفرة، يجب حفظ المسجّل <code>env</code> حول تقييم المشغّل (إذ إنّ تقييم المشغّل قد يُعدّل <code>env</code>، الذي سيكون لازمًا لتقييم العوامل)، ويجب حفظ المسجّل <code>proc</code> حول بناء قائمة المعطيات (إذ إنّ تقييم العوامل قد يُعدّل <code>proc</code>، الذي سيكون لازمًا لتطبيق الإجراء الفعليّ). ويجب حفظ <code>continue</code> على مدى ذلك كلّه أيضًا، إذ إنّه لازم للوصل في نداء الإجراء.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-application</span> 
         exp target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">proc-code</span> 
         (<span class="hljs-name">compile</span> (<span class="hljs-name">operator</span> exp) <span class="hljs-symbol">&#x27;proc</span> <span class="hljs-symbol">&#x27;next</span>))
        (<span class="hljs-name">operand-codes</span>
         (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (operand)
                (<span class="hljs-name">compile</span> operand <span class="hljs-symbol">&#x27;val</span> <span class="hljs-symbol">&#x27;next</span>))
              (<span class="hljs-name">operands</span> exp))))
    (<span class="hljs-name">preserving</span> 
     &#x27;(env continue)
     proc-code
     (<span class="hljs-name">preserving</span> 
      &#x27;(proc continue)
      (<span class="hljs-name">construct-arglist</span> operand-codes)
      (<span class="hljs-name">compile-procedure-call</span> 
       target
       linkage)))))
</code></pre>
<p>ستُقيّم شيفرة بناء قائمة المعطيات كلّ عاملٍ إلى <code>val</code> ثم تعمل <code>cons</code> لتلك القيمة على قائمة المعطيات المتراكمة في <code>argl</code>. وبما أنّنا نعمل <code>cons</code> للمعطيات على <code>argl</code> تسلسليًّا، فيجب أن نبدأ بالمعطى الأخير وننتهي بالأوّل، حتّى تظهر المعطيات في القائمة الناتجة مرتّبةً من الأوّل إلى الأخير. وبدلًا من إهدار تعليمةٍ بتهيئة <code>argl</code> إلى القائمة الخالية للإعداد لهذا التسلسل من التقييمات، نجعل أوّل تسلسل شيفرةٍ يبني <code>argl</code> الأوّليّة. وبذلك، فإنّ الصيغة العامّة لبناء قائمة المعطيات هي كالآتي:</p>
<pre><code class="language-scheme">⟨compilation of last operand, targeted to val⟩
(<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
⟨compilation of next operand, targeted to val⟩
(<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> cons) (<span class="hljs-name">reg</span> val) (<span class="hljs-name">reg</span> argl))
…
⟨compilation of first operand, targeted to val⟩
(<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> cons) (<span class="hljs-name">reg</span> val) (<span class="hljs-name">reg</span> argl))
</code></pre>
<p>يجب حفظ <code>argl</code> حول تقييم كلّ عاملٍ باستثناء الأوّل (حتّى لا تُفقد المعطيات المتراكمة حتّى الآن)، ويجب حفظ <code>env</code> حول تقييم كلّ عاملٍ باستثناء الأخير (لاستخدامه في تقييمات العوامل التالية).</p>
<p>إنّ تصريف شيفرة المعطيات هذه شاقٌّ بعض الشيء، بسبب المعاملة الخاصّة لأوّل عاملٍ يُقيَّم والحاجة إلى حفظ <code>argl</code> و<code>env</code> في مواضع مختلفة. ويأخذ الإجراء <code>construct-arglist</code> كمعطياتٍ الشيفرة التي تُقيّم العوامل المنفردة. فإن لم تكن هناك عواملٌ إطلاقًا، فهو يُخرج التعليمة الآتية ببساطةٍ</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> argl (<span class="hljs-name">const</span> ()))
</code></pre>
<p>وإلّا، فإنّ <code>construct-arglist</code> يُنشئ شيفرةً تُهيّئ <code>argl</code> بالمعطى الأخير، ويلحق بها شيفرةً تُقيّم بقيّة المعطيات وتُضمّها إلى <code>argl</code> تتابعًا. ولكي نعالج المعطيات من الأخير إلى الأوّل، يجب أن نعكس قائمة تسلسلات شيفرة العوامل عن الترتيب الذي يُوفّره <code>compile-application</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">construct-arglist</span> operand-codes)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">operand-codes</span> 
         (<span class="hljs-name"><span class="hljs-built_in">reverse</span></span> operand-codes)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> operand-codes)
        (<span class="hljs-name">make-instruction-sequence</span> 
         &#x27;() 
         &#x27;(argl)
         &#x27;((assign argl (const ()))))
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">code-to-get-last-arg</span>
               (<span class="hljs-name">append-instruction-sequences</span>
                (<span class="hljs-name"><span class="hljs-built_in">car</span></span> operand-codes)
                (<span class="hljs-name">make-instruction-sequence</span> 
                 &#x27;(val)
                 &#x27;(argl)
                 &#x27;((assign argl
                           (op list)
                           (reg val)))))))
          (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> operand-codes))
              code-to-get-last-arg
              (<span class="hljs-name">preserving</span> 
               &#x27;(env)
               code-to-get-last-arg
               (<span class="hljs-name">code-to-get-rest-args</span>
                (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> operand-codes))))))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">code-to-get-rest-args</span> operand-codes)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">code-for-next-arg</span>
         (<span class="hljs-name">preserving</span> 
          &#x27;(argl)
          (<span class="hljs-name"><span class="hljs-built_in">car</span></span> operand-codes)
          (<span class="hljs-name">make-instruction-sequence</span> 
           &#x27;(val argl)
           &#x27;(argl)
           &#x27;((assign argl
                     (op cons)
                     (reg val)
                     (reg argl)))))))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> operand-codes))
        code-for-next-arg
        (<span class="hljs-name">preserving</span> 
         &#x27;(env)
         code-for-next-arg
         (<span class="hljs-name">code-to-get-rest-args</span> 
          (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> operand-codes))))))
</code></pre>
<h4>تطبيق الإجراءات</h4>
<p>وبعد تقييم عناصر تركيبةٍ، يجب أن تُطبّق الشيفرة المُصَرَّفة الإجراءَ الموجود في <code>proc</code> على المعطيات الموجودة في <code>argl</code>. وإنّ الشيفرة تُجري التوزيع عينه أساسًا كما يُجريه الإجراء <code>apply</code> في المُقيِّم الحلقيّ الوسيط (metacircular evaluator) الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e1">4.1.1</a> أو نقطة الدخول <code>apply-dispatch</code> في مُقيِّم التحكّم الصريح الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1">5.4.1</a>. فهي تفحص ما إذا كان الإجراء المطلوب تطبيقه إجراءً أوّليًّا أم إجراءً مُصَرَّفًا. فبالنسبة للإجراء الأوّليّ، فهي تستخدم <code>apply-primitive-procedure</code>؛ وسنرى قريبًا كيف تتعامل مع الإجراءات المُصَرَّفة. وشيفرة تطبيق الإجراء لها الصيغة الآتية:</p>
<pre><code class="language-scheme">(<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
 (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch))
compiled-branch
 ⟨code to apply compiled procedure 
  with given target and appropriate linkage⟩
primitive-branch
 (<span class="hljs-name">assign</span> ⟨target⟩
         (<span class="hljs-name">op</span> apply-primitive-procedure)
         (<span class="hljs-name">reg</span> proc)
         (<span class="hljs-name">reg</span> argl))
 ⟨linkage⟩
after-call
</code></pre>
<p>لاحِظ أنّ الفرع المُصَرَّف يجب أن يتجاوز الفرع الأوّليّ. وبناءً على ذلك، فإن كان وصلة نداء الإجراء الأصليّ هو <code>next</code>، فيجب أن يستخدم الفرع المركّب وصلةً تقفز إلى عنوانٍ يُدرج بعد الفرع الأوّليّ. (وهذا شبيه بالوصل المستخدم للفرع الصحيح في <code>compile-if</code>.)</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-procedure-call</span>
         target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">primitive-branch</span> 
         (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;primitive-branch</span>))
        (<span class="hljs-name">compiled-branch</span> 
         (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;compiled-branch</span>))
        (<span class="hljs-name">after-call</span>
         (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;after-call</span>)))
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">compiled-linkage</span>
           (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;next</span>)
               after-call
               linkage)))
      (<span class="hljs-name">append-instruction-sequences</span>
       (<span class="hljs-name">make-instruction-sequence</span> 
        &#x27;(proc)
        &#x27;()
        \`((test 
           (op primitive-procedure?)
           (reg proc))
          (branch 
           (label ,primitive-branch))))
       (<span class="hljs-name">parallel-instruction-sequences</span>
        (<span class="hljs-name">append-instruction-sequences</span>
         compiled-branch
         (<span class="hljs-name">compile-proc-appl</span> 
          target
          compiled-linkage))
        (<span class="hljs-name">append-instruction-sequences</span>
         primitive-branch
         (<span class="hljs-name">end-with-linkage</span>
          linkage
          (<span class="hljs-name">make-instruction-sequence</span>
           &#x27;(proc argl)
           (<span class="hljs-name"><span class="hljs-built_in">list</span></span> target)
           \`((assign 
              ,target
              (op apply-primitive-procedure)
              (reg proc)
              (reg argl)))))))
       after-call))))
</code></pre>
<p>الفرعان الأوّليّ والمركّب، كالفرعين الصحيح والخاطئ في <code>compile-if</code>، يُلحَقان باستخدام <code>parallel-instruction-sequences</code> بدلًا من <code>append-instruction-sequences</code> الاعتياديّ، لأنّهما لن يُنفَّذا تسلسليًّا.</p>
<h4>تطبيق الإجراءات المصرَّفة</h4>
<p>الشيفرة التي تتولّى تطبيق الإجراءات هي أدقّ أجزاء المصرِّف، مع أنّ متسلسلات التعليمات التي تُنتجها قصيرةٌ جدًّا. فالإجراء المصرَّف (كما يبنيه <code>compile-lambda</code>) له نقطةُ دخولٍ، وهي عنوانٌ يُعرّف موضع بداية شيفرة الإجراء. والشيفرة عند نقطة الدخول هذه تحسب نتيجةً في <code>val</code> وتعود بتنفيذ التعليمة <code>(goto (reg continue))</code>. وهكذا، فقد نتوقّع أن تكون الشيفرة الخاصّة بتطبيق إجراءٍ مصرَّفٍ (التي سيُنتجها <code>compile-proc-appl</code>) بهدفٍ ووصلةٍ معطيّين على هذه الصورة إذا كانت الوصلة عنوانًا</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> continue 
        (<span class="hljs-name">label</span> proc-return))
 (<span class="hljs-name">assign</span> val
         (<span class="hljs-name">op</span> compiled-procedure-entry)
         (<span class="hljs-name">reg</span> proc))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
proc-return
 (<span class="hljs-name">assign</span> ⟨target⟩ 
         (<span class="hljs-name">reg</span> val))   <span class="hljs-comment">; included if target is not val</span>
 (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> ⟨linkage⟩))   <span class="hljs-comment">; linkage code</span>
</code></pre>
<p>أو على هذه الصورة إذا كانت الوصلة هي <code>return</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name">save</span> continue)
 (<span class="hljs-name">assign</span> continue 
         (<span class="hljs-name">label</span> proc-return))
 (<span class="hljs-name">assign</span> val 
         (<span class="hljs-name">op</span> compiled-procedure-entry)
         (<span class="hljs-name">reg</span> proc))
 (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
proc-return
 (<span class="hljs-name">assign</span> ⟨target⟩
         (<span class="hljs-name">reg</span> val))   <span class="hljs-comment">; included if target is not val</span>
 (<span class="hljs-name">restore</span> continue)
 (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))   <span class="hljs-comment">; linkage code</span>
</code></pre>
<p>تُهيِّئ هذه الشيفرة <code>continue</code> بحيث يعود الإجراء إلى عنوانٍ اسمه <code>proc-return</code> وتقفز إلى نقطة دخول الإجراء. والشيفرة عند <code>proc-return</code> تنقل نتيجة الإجراء من <code>val</code> إلى المسجّل الهدف (إن لزم الأمر) ثم تقفز إلى الموضع الذي تُحدّده الوصلة. (فالوصلة تكون دائمًا <code>return</code> أو عنوانًا، لأنّ <code>compile-procedure-call</code> يستبدل وصلة <code>next</code> المخصّصة للفرع المركّب بعنوانٍ اسمه <code>after-call</code>.)</p>
<p>في الحقيقة، إذا لم يكن الهدف هو <code>val</code>، فهذه هي بالضبط الشيفرة التي سيُنتجها مصرّفنا.<sup class="footnote-ref"><a href="#fn39" id="fnref39">[39]</a></sup> غير أنّ الهدف عادةً هو <code>val</code> (والمرّة الوحيدة التي يُحدّد فيها المصرِّف مسجّلًا مختلفًا هي عندما يكون الهدف تقييمَ مشغّلٍ في <code>proc</code>)، ولذلك تُوضع نتيجة الإجراء مباشرةً في المسجّل الهدف ولا حاجة إلى العودة إلى موضعٍ خاصٍّ ينسخها. وبدلًا من ذلك، نبسّط الشيفرة بتهيئة <code>continue</code> بحيث «يعود» الإجراء مباشرةً إلى الموضع الذي تُحدّده وصلة المُنادِي:</p>
<pre><code class="language-scheme">⟨set up continue for linkage⟩
(<span class="hljs-name">assign</span> val 
        (<span class="hljs-name">op</span> compiled-procedure-entry)
        (<span class="hljs-name">reg</span> proc))
(<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
</code></pre>
<p>إذا كانت الوصلة عنوانًا، نُهيِّئ <code>continue</code> بحيث يعود الإجراء إلى ذلك العنوان. (أي أنّ <code>(goto (reg continue))</code> الذي يُنهي به الإجراء عمله يصبح مكافئًا للـ<code>(goto (label ⟨linkage⟩))</code> عند <code>proc-return</code> أعلاه.)</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> continue 
        (<span class="hljs-name">label</span> ⟨linkage⟩))
(<span class="hljs-name">assign</span> val
        (<span class="hljs-name">op</span> compiled-procedure-entry)
        (<span class="hljs-name">reg</span> proc))
(<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
</code></pre>
<p>إذا كانت الوصلة هي <code>return</code>، فلا نحتاج إلى تهيئة <code>continue</code> إطلاقًا: فهو يحمل الموضع المطلوب أصلًا. (أي أنّ <code>(goto (reg continue))</code> الذي يُنهي به الإجراء عمله ينتقل مباشرةً إلى الموضع الذي كان <code>(goto (reg continue))</code> عند <code>proc-return</code> سينتقل إليه.)</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> val
        (<span class="hljs-name">op</span> compiled-procedure-entry)
        (<span class="hljs-name">reg</span> proc))
(<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
</code></pre>
<p>وبهذا التنفيذ للوصلة <code>return</code>، يُنتج المصرِّف شيفرةً تعاوديّةً ذيليّةً. فإنّ نداء إجراءٍ كخطوةٍ أخيرةٍ في جسم الإجراء يؤدّي نقلًا مباشرًا، دون حفظ أيّ معلوماتٍ في المكدس.</p>
<p>أمّا لو كنّا قد تعاملنا مع حالة نداء إجراءٍ بوصلةٍ <code>return</code> وهدفٍ هو <code>val</code> كما عُرض أعلاه لهدفٍ ليس <code>val</code>، لدمّرنا التعاود الذيليّ. فسيظلّ نظامنا يُعطي القيمة ذاتها لأيّ تعبيرٍ. لكنّنا كنّا، في كلّ مرّةٍ ننادي فيها إجراءً، سنحفظ <code>continue</code> ونعود بعد النداء للتراجع عن الحفظ (عديم الفائدة). وهذه الحفظات الإضافيّة ستتراكم أثناء عشٍّ من نداءات الإجراءات.<sup class="footnote-ref"><a href="#fn40" id="fnref40">[40]</a></sup></p>
<p>يُنتج <code>compile-proc-appl</code> شيفرة تطبيق الإجراءات أعلاه بدرس أربع حالات، تبعًا لما إذا كان الهدف للنداء هو <code>val</code> ولما إذا كانت الوصلة هي <code>return</code>. ولاحِظ أنّ متسلسلات التعليمات مُعلَنةٌ بأنّها تعدّل جميع المسجّلات، إذ إنّ تنفيذ جسم الإجراء قد يغيّر المسجّلات بطرائق اعتباطيّة.<sup class="footnote-ref"><a href="#fn41" id="fnref41">[41]</a></sup> ولاحِظ أيضًا أنّ متسلسلة الشيفرة للحالة ذات الهدف <code>val</code> والوصلة <code>return</code> مُعلَنةٌ باحتياجها إلى <code>continue</code>: فعلى الرغم من أنّ <code>continue</code> غير مستخدمٍ صراحةً في متسلسلة التعليمتين، ينبغي أن نتيقّن من أنّ <code>continue</code> سيحمل القيمة الصحيحة عندما ندخل الإجراء المصرَّف.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-proc-appl</span> target linkage)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">and</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> target <span class="hljs-symbol">&#x27;val</span>)
              (<span class="hljs-name"><span class="hljs-built_in">not</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;return</span>)))
         (<span class="hljs-name">make-instruction-sequence</span> 
          &#x27;(proc)
          all-regs
          \`((assign continue (label ,linkage))
            (assign 
             val 
             (op compiled-procedure-entry)
             (reg proc))
            (goto (reg val)))))
        ((<span class="hljs-name"><span class="hljs-built_in">and</span></span> (<span class="hljs-name"><span class="hljs-built_in">not</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> target <span class="hljs-symbol">&#x27;val</span>))
              (<span class="hljs-name"><span class="hljs-built_in">not</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;return</span>)))
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">proc-return</span> 
                (<span class="hljs-name">make-label</span> <span class="hljs-symbol">&#x27;proc-return</span>)))
           (<span class="hljs-name">make-instruction-sequence</span> 
            &#x27;(proc)
            all-regs
            \`((assign continue 
                      (label ,proc-return))
              (assign 
               val 
               (op compiled-procedure-entry)
               (reg proc))
              (goto (reg val))
              ,proc-return
              (assign ,target (reg val))
              (goto (label ,linkage))))))
        ((<span class="hljs-name"><span class="hljs-built_in">and</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> target <span class="hljs-symbol">&#x27;val</span>)
              (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;return</span>))
         (<span class="hljs-name">make-instruction-sequence</span> 
          &#x27;(proc continue) 
          all-regs
          &#x27;((assign 
             val 
             (op compiled-procedure-entry)
             (reg proc))
            (goto (reg val)))))
        ((<span class="hljs-name"><span class="hljs-built_in">and</span></span> (<span class="hljs-name"><span class="hljs-built_in">not</span></span> (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> target <span class="hljs-symbol">&#x27;val</span>))
              (<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> linkage <span class="hljs-symbol">&#x27;return</span>))
         (<span class="hljs-name">error</span> <span class="hljs-string">&quot;return linkage, 
                 target not val: COMPILE&quot;</span>
                target))))
</code></pre>
<h4>5.5.4 دمج متسلسلات التعليمات</h4>
<p>يصف هذا القسم تفاصيل كيفيّة تمثيل متسلسلات التعليمات ودمجها. فتذكّر من <a href="#g_t5_002e5_002e1">5.5.1</a> أنّ متسلسلة التعليمات تُمثَّل بقائمةٍ من المسجّلات المطلوبة، والمسجّلات المعدَّلة، والتعليمات الفعليّة. وسنعتبر أيضًا العنوان (رمز) حالةً منحطّةً من متسلسلة التعليمات، لا تحتاج ولا تعدّل أيّ مسجّلات. ولتحديد المسجّلات المطلوبة والمعدَّلة بواسطة متسلسلات التعليمات نستخدم المحدِّدات</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">registers-needed</span> s)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">symbol?</span></span> s) &#x27;() (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s)))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">registers-modified</span> s)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">symbol?</span></span> s) &#x27;() (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> s)))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">statements</span> s)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">symbol?</span></span> s) (<span class="hljs-name"><span class="hljs-built_in">list</span></span> s) (<span class="hljs-name">caddr</span> s)))
</code></pre>
<p>ولتحديد ما إذا كانت متسلسلةٌ معطاةٌ تحتاج مسجّلًا معطىً أو تعدّله نستخدم المُسَيِّمات</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">needs-register?</span> seq reg)
  (<span class="hljs-name"><span class="hljs-built_in">memq</span></span> reg (<span class="hljs-name">registers-needed</span> seq)))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">modifies-register?</span> seq reg)
  (<span class="hljs-name"><span class="hljs-built_in">memq</span></span> reg (<span class="hljs-name">registers-modified</span> seq)))
</code></pre>
<p>بدلالة هذه المُسَيِّمات والمحدِّدات، نستطيع تنفيذ مُجمِّعات متسلسلات التعليمات المتنوّعة المستخدمة في أرجاء المصرِّف.</p>
<p>المُجمِّع الأساسيّ هو <code>append-instruction-sequences</code>. فهو يأخذ كمعطياتٍ عددًا اعتباطيًّا من متسلسلات التعليمات التي ستُنفَّذ متسلسلةً ويُعيد متسلسلة تعليماتٍ بياناتُها هي بيانات جميع المتسلسلات ملحقةً بعضها ببعض. والنقطة الدقيقة هي تحديد المسجّلات التي تحتاجها المتسلسلة الناتجة وتعدّلها. فإنّها تعدّل تلك المسجّلات التي تعدّلها أيٌّ من المتسلسلات؛ وتحتاج تلك المسجّلات التي يجب تهيئتها قبل أن تُشغَّل المتسلسلة الأولى (المسجّلات التي تحتاجها المتسلسلة الأولى)، مع تلك المسجّلات التي تحتاجها أيٌّ من المتسلسلات الأخرى والتي لا تُهيَّأ (تُعدَّل) بواسطة المتسلسلات السابقة لها.</p>
<p>تُلحَق المتسلسلات اثنتين في كلّ مرّةٍ بواسطة <code>append-2-sequences</code>. فهذا يأخذ متسلسلتي تعليماتٍ <code>seq1</code> و<code>seq2</code> ويُعيد متسلسلة التعليمات التي بياناتُها هي بيانات <code>seq1</code> متبوعةً ببيانات <code>seq2</code>، ومسجّلاتها المعدَّلة هي تلك المسجّلات التي تعدّلها إمّا <code>seq1</code> وإمّا <code>seq2</code>، ومسجّلاتها المطلوبة هي المسجّلات التي تحتاجها <code>seq1</code> مع تلك المسجّلات التي تحتاجها <code>seq2</code> والتي لا تعدّلها <code>seq1</code>. (وبدلالة عمليّات المجموعات، مجموعة المسجّلات المطلوبة الجديدة هي اتحاد مجموعة المسجّلات التي تحتاجها <code>seq1</code> مع الفرق بين مجموعة المسجّلات التي تحتاجها <code>seq2</code> والمسجّلات التي تعدّلها <code>seq1</code>.) وهكذا، يُنفَّذ <code>append-instruction-sequences</code> كما يلي:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">append-instruction-sequences</span> . seqs)
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">append-2-sequences</span> seq1 seq2)
    (<span class="hljs-name">make-instruction-sequence</span>
     (<span class="hljs-name">list-union</span> 
      (<span class="hljs-name">registers-needed</span> seq1)
      (<span class="hljs-name">list-difference</span> 
       (<span class="hljs-name">registers-needed</span> seq2)
       (<span class="hljs-name">registers-modified</span> seq1)))
     (<span class="hljs-name">list-union</span>
      (<span class="hljs-name">registers-modified</span> seq1)
      (<span class="hljs-name">registers-modified</span> seq2))
     (<span class="hljs-name"><span class="hljs-built_in">append</span></span> (<span class="hljs-name">statements</span> seq1)
             (<span class="hljs-name">statements</span> seq2))))
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">append-seq-list</span> seqs)
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> seqs)
        (<span class="hljs-name">empty-instruction-sequence</span>)
        (<span class="hljs-name">append-2-sequences</span> 
         (<span class="hljs-name"><span class="hljs-built_in">car</span></span> seqs)
         (<span class="hljs-name">append-seq-list</span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> seqs)))))
  (<span class="hljs-name">append-seq-list</span> seqs))
</code></pre>
<p>ويستخدم هذا الإجراء بعض العمليّات البسيطة للتلاعب بمجموعاتٍ ممثَّلةٍ كقوائم، شبيهةً بتمثيل المجموعات (غير المرتّب) الموصوف في <a href="https://sarabander.github.io/sicp/html/2_002e3.xhtml#g_t2_002e3_002e3">2.3.3</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">list-union</span> s1 s2)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">null?</span></span> s1) s2)
        ((<span class="hljs-name"><span class="hljs-built_in">memq</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s1) s2)
         (<span class="hljs-name">list-union</span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s1) s2))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span>
         (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s1)
               (<span class="hljs-name">list-union</span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s1) s2)))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">list-difference</span> s1 s2)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">null?</span></span> s1) &#x27;())
        ((<span class="hljs-name"><span class="hljs-built_in">memq</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s1) s2)
         (<span class="hljs-name">list-difference</span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s1) s2))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span> 
         (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s1)
               (<span class="hljs-name">list-difference</span> (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s1)
                                s2)))))
</code></pre>
<p>يأخذ <code>preserving</code>، مُجمِّع متسلسلات التعليمات الرئيسيّ الثاني، قائمةً من المسجّلات <code>regs</code> ومتسلسلتي تعليماتٍ <code>seq1</code> و<code>seq2</code> ستُنفَّذان متسلسلةً. وهو يُعيد متسلسلة تعليماتٍ بياناتُها هي بيانات <code>seq1</code> متبوعةً ببيانات <code>seq2</code>، مع تعليمات <code>save</code> و<code>restore</code> مناسقتين حول <code>seq1</code> لحماية المسجّلات في <code>regs</code> التي تعدّلها <code>seq1</code> لكنّها يحتاجها <code>seq2</code>. ولتحقيق ذلك، ينشئ <code>preserving</code> أوّلًا متسلسلةً تحتوي تعليمات <code>save</code> المطلوبة متبوعةً ببيانات <code>seq1</code> متبوعةً بتعليمات <code>restore</code> المطلوبة. وتحتاج هذه المتسلسلة المسجّلات التي تُحفظ وتُستعاد إضافةً إلى المسجّلات التي تحتاجها <code>seq1</code>، وتعدّل المسجّلات التي تعدّلها <code>seq1</code> عدا تلك التي تُحفظ وتُستعاد. ثُمّ تُلحَق هذه المتسلسلة المُعزَّزة و<code>seq2</code> بالطريقة المعتادة. وينفّذ الإجراء التالي هذه الاستراتيجيّة تعاوديًّا، نازلًا في قائمة المسجّلات الواجب حمايتها:<sup class="footnote-ref"><a href="#fn42" id="fnref42">[42]</a></sup></p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">preserving</span> regs seq1 seq2)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> regs)
      (<span class="hljs-name">append-instruction-sequences</span> seq1 seq2)
      (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">first-reg</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> regs)))
        (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">and</span></span> 
             (<span class="hljs-name">needs-register?</span> seq2 first-reg)
             (<span class="hljs-name">modifies-register?</span> seq1 
                                 first-reg))
            (<span class="hljs-name">preserving</span> 
             (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> regs)
             (<span class="hljs-name">make-instruction-sequence</span>
              (<span class="hljs-name">list-union</span> 
               (<span class="hljs-name"><span class="hljs-built_in">list</span></span> first-reg)
               (<span class="hljs-name">registers-needed</span> seq1))
              (<span class="hljs-name">list-difference</span>
               (<span class="hljs-name">registers-modified</span> seq1)
               (<span class="hljs-name"><span class="hljs-built_in">list</span></span> first-reg))
              (<span class="hljs-name"><span class="hljs-built_in">append</span></span> \`((save ,first-reg))
                      (<span class="hljs-name">statements</span> seq1)
                      \`((restore ,first-reg))))
             seq2)
            (<span class="hljs-name">preserving</span> 
             (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> regs)
             seq1
             seq2)))))
</code></pre>
<p>وهناك مُجمِّع متسلسلاتٍ آخر، هو <code>tack-on-instruction-sequence</code>، تستخدمه <code>compile-lambda</code> لإلحاق جسم إجراءٍ بمتسلسلةٍ أخرى. ولأنّ جسم الإجراء ليس «على الخطّ» ليُنفَّذ كجزءٍ من المتسلسلة المدمجة، فإنّ استخدامه للمسجّلات لا يؤثّر في استخدام المتسلسلة المضيفة له للمسجّلات. ولذلك نتجاهل مجموعتي المسجّلات المطلوبة والمعدَّلة الخاصّتين بجسم الإجراء حين نُلحقه بالمتسلسلة الأخرى.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">tack-on-instruction-sequence</span> 
         seq body-seq)
  (<span class="hljs-name">make-instruction-sequence</span>
   (<span class="hljs-name">registers-needed</span> seq)
   (<span class="hljs-name">registers-modified</span> seq)
   (<span class="hljs-name"><span class="hljs-built_in">append</span></span> (<span class="hljs-name">statements</span> seq)
           (<span class="hljs-name">statements</span> body-seq))))
</code></pre>
<p>يستخدم <code>compile-if</code> و<code>compile-procedure-call</code> مُجمِّعًا خاصًّا يُسمّى <code>parallel-instruction-sequences</code> لإلحاق الفرعين البديلين اللذين يليان اختبارًا. فلن يُنفَّذ الفرعان متسلسلين أبدًا؛ ففي أيّ تقييمٍ معيّنٍ للاختبار، يُدخل أحد الفرعين أو الآخر. ولهذا السبب، تظلّ المسجّلات التي يحتاجها الفرع الثاني مطلوبةً بواسطة المتسلسلة المدمجة، حتّى لو عدّلها الفرع الأوّل.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">parallel-instruction-sequences</span> 
         seq1 seq2)
  (<span class="hljs-name">make-instruction-sequence</span>
   (<span class="hljs-name">list-union</span> (<span class="hljs-name">registers-needed</span> seq1)
               (<span class="hljs-name">registers-needed</span> seq2))
   (<span class="hljs-name">list-union</span> (<span class="hljs-name">registers-modified</span> seq1)
               (<span class="hljs-name">registers-modified</span> seq2))
   (<span class="hljs-name"><span class="hljs-built_in">append</span></span> (<span class="hljs-name">statements</span> seq1)
           (<span class="hljs-name">statements</span> seq2))))
</code></pre>
<h4>5.5.5 مثال على شيفرة مصرَّفة</h4>
<p>والآن بعد أن رأينا جميع عناصر المصرِّف، دعنا نفحص مثالًا على شيفرةٍ مصرَّفةٍ لنرى كيف تتناسب الأجزاء معًا. فسنُصرّف تعريف إجراء <code>factorial</code> تعاوديٍّ بنداء <code>compile</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name">compile</span>
 &#x27;(define (factorial n)
    (if (= n <span class="hljs-number">1</span>)
        <span class="hljs-number">1</span>
        (* (factorial (- n <span class="hljs-number">1</span>)) n)))
 <span class="hljs-symbol">&#x27;val</span>
 <span class="hljs-symbol">&#x27;next</span>)
</code></pre>
<p>لقد حدّدنا أنّ قيمة تعبير <code>define</code> ينبغي أن تُوضع في المسجّل <code>val</code>. ولا يهمّنا ما تفعله الشيفرة المصرَّفة بعد تنفيذ <code>define</code>، فاختيارنا <code>next</code> كواصف الوصلة اعتباطيّ.</p>
<p>يحدّد <code>compile</code> أنّ التعبير تعريفٌ، فينادي <code>compile-definition</code> ليُصرّف شيفرةً تحسب القيمة التي ستُسَنَّد (موجّهةً إلى <code>val</code>)، تليها شيفرةٌ لتنصيب التعريف، تليها شيفرةٌ لوضع قيمة <code>define</code> (وهي الرمز <code>ok</code>) في المسجّل الهدف، تليها أخيرًا شيفرة الوصلة. ويُحتفظ بـ<code>env</code> أثناء احتساب القيمة، لأنّها لازمة لتنصيب التعريف. ولأنّ الوصلة هي <code>next</code>، فلا وجود لشيفرة الوصلة في هذه الحالة. وهكذا يكون الهيكل العظميّ للشيفرة المصرَّفة</p>
<pre><code class="language-scheme">⟨save env if modified by code to compute value⟩
  ⟨compilation of definition value, 
   target val, linkage next⟩
  ⟨restore env if saved above⟩
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> define-variable!)
           (<span class="hljs-name">const</span> factorial)
           (<span class="hljs-name">reg</span> val)
           (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> ok))
</code></pre>
<p>التعبير الذي سيُصرَّف لإنتاج قيمة المتغيّر <code>factorial</code> هو تعبير <code>lambda</code> قيمتُه هي الإجراء الذي يحسب العامليّات. ويتعامل <code>compile</code> مع هذا بنداء <code>compile-lambda</code>، الذي يُصرّف جسم الإجراء، ووسمه كنقطة دخولٍ جديدة، ويُنتج التعليمة التي ستدمج جسم الإجراء عند نقطة الدخول الجديدة مع بيئة وقت التشغيل وتُسند النتيجة إلى <code>val</code>. ثم تقفز المتسلسلة فوق شيفرة الإجراء المصرَّفة، التي تُدرَج عند هذه النقطة. وتبدأ شيفرة الإجراء ذاتها بتمديد بيئة تعريف الإجراء بإطارٍ يربط الوسيط الشكليّ <code>n</code> بمعطى الإجراء. ثم يأتي جسم الإجراء الفعليّ. وبما أنّ هذه الشيفرة الخاصّة بقيمة المتغيّر لا تعدّل المسجّل <code>env</code>، فإنّ تعليمتَي <code>save</code> و<code>restore</code> الاختياريّتين المعروضتين أعلاه لا تُنتَجان. (فشيفرة الإجراء عند <code>entry2</code> لا تُنفَّذ في هذه المرحلة، فاستخدامها لـ<code>env</code> غير ذي صلة.) ولذلك، يصبح الهيكل العظميّ للشيفرة المصرَّفة</p>
<pre><code class="language-scheme">  (<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> make-compiled-procedure)
              (<span class="hljs-name">label</span> entry2)
              (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> after-lambda1))
entry<span class="hljs-number">2</span>
  (<span class="hljs-name">assign</span> env (<span class="hljs-name">op</span> compiled-procedure-env)
              (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">assign</span> env (<span class="hljs-name">op</span> extend-environment)
              (<span class="hljs-name">const</span> (<span class="hljs-name">n</span>))
              (<span class="hljs-name">reg</span> argl)
              (<span class="hljs-name">reg</span> env))
  ⟨compilation of procedure body⟩
after-lambda<span class="hljs-number">1</span>
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> define-variable!)
           (<span class="hljs-name">const</span> factorial)
           (<span class="hljs-name">reg</span> val) (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> ok))
</code></pre>
<p>يُصرَّف جسم الإجراء دائمًا (بواسطة <code>compile-lambda-body</code>) كمتسلسلةٍ هدفُها <code>val</code> ووصلتُها <code>return</code>. والمتسلسلة في هذه الحالة تتألّف من تعبير <code>if</code> واحد:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> n <span class="hljs-number">1</span>)
    <span class="hljs-number">1</span>
    (<span class="hljs-name"><span class="hljs-built_in">*</span></span> (<span class="hljs-name">factorial</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)) n))
</code></pre>
<p>يُنتج <code>compile-if</code> شيفرةً تحسب المُسَيِّم أوّلًا (موجّهةً إلى <code>val</code>)، ثم تفحص النتيجة وتتفرّع حول الفرع الصحيح إذا كان المُسَيِّم خاطئًا. ويُحتفظ بـ<code>env</code> و<code>continue</code> حول شيفرة المُسَيِّم، إذ قد تكونان لازمين لبقية تعبير <code>if</code>. وبما أنّ تعبير <code>if</code> هو التعبير الأخير (والوحيد) في المتسلسلة المكوّنة لجسم الإجراء، فهدفُه <code>val</code> ووصلتُه <code>return</code>، ولذلك يُصرَّف الفرعان الصحيح والخاطئ كلاهما بهدف <code>val</code> ووصلة <code>return</code>. (أي أنّ قيمة التعبير الشرطيّ، وهي القيمة التي يحسبها أيٌّ من فرعيه، هي قيمة الإجراء.)</p>
<pre><code class="language-scheme">⟨save continue, env if modified by 
 predicate and needed by branches⟩
  ⟨compilation of predicate, 
   target val, linkage next⟩
  ⟨restore continue, env if saved above⟩
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> false?) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> false-branch4))
true-branch<span class="hljs-number">5</span>
  ⟨compilation of true branch, 
   target val, linkage return⟩
false-branch<span class="hljs-number">4</span>
  ⟨compilation of false branch, 
   target val, linkage return⟩
after-if<span class="hljs-number">3</span>
</code></pre>
<p>المُسَيِّم <code>(= n 1)</code> هو نداءُ إجراءٍ. وهو يبحث عن المشغّل (الرمز <code>=</code>) ويضع قيمتَه في <code>proc</code>. ثم يجمّع المعطيات <code>1</code> وقيمة <code>n</code> في <code>argl</code>. ثم يختبر ما إذا كان <code>proc</code> يحتوي إجراءً أوّليًّا أو إجراءً مركّبًا، ويُوجّه إلى فرعٍ أوّليٍّ أو فرعٍ مركّبٍ تبعًا لذلك. ويستأنف الفرعان عند العنوان <code>after-call</code>. ومتطلّبات صون المسجّلات حول تقييم المشغّل والعوامل لا تؤدّي إلى حفظ أيّ مسجّلات، لأنّ تلك التقييمات لا تعدّل المسجّلات المعنيّة في هذه الحالة.</p>
<pre><code class="language-scheme">  (<span class="hljs-name">assign</span> proc (<span class="hljs-name">op</span> lookup-variable-value)
               (<span class="hljs-name">const</span> =) 
               (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> lookup-variable-value)
              (<span class="hljs-name">const</span> n)
              (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> cons) (<span class="hljs-name">reg</span> val) (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch17))
compiled-branch<span class="hljs-number">16</span>
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-call15))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> compiled-procedure-entry)
              (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">17</span>
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> apply-primitive-procedure)
              (<span class="hljs-name">reg</span> proc)
              (<span class="hljs-name">reg</span> argl))
after-call<span class="hljs-number">15</span>
</code></pre>
<p>يُصرَّف الفرع الصحيح، وهو الثابت 1، (بهدف <code>val</code> ووصلة <code>return</code>) إلى</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
(<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
</code></pre>
<p>شيفرة الفرع الخاطئ هي نداء إجراءٍ آخر، الإجراء فيه هو قيمة الرمز <code>*</code>، والمعطيات هي <code>n</code> ونتيجة نداء إجراءٍ آخر (نداء لـ<code>factorial</code>). وكلٌّ من هذه النداءات يُهيِّئ <code>proc</code> و<code>argl</code> وفرعيه الأوّليّ والمركّب الخاصّين به. ويُظهر <a href="#Figure-5_002e17">الشكل 5.17</a> التصريف الكامل لتعريف إجراء <code>factorial</code>. ولاحِظ أنّ تعليمتَي <code>save</code> و<code>restore</code> المحتملتين لـ<code>continue</code> و<code>env</code> حول المُسَيِّم، والمبيَّنتين أعلاه، تُنتَجان فعلًا، لأنّ هذين المسجّلين يعدّلهما نداء الإجراء في المُسَيِّم ويحتاجهما نداء الإجراء والوصلة <code>return</code> في الفرعين.</p>
<p><strong>الشكل 5.17:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> تصريف تعريف إجراء <code>factorial</code>.</p>
<pre><code class="language-scheme"><span class="hljs-comment">;; construct the procedure and skip over code</span>
<span class="hljs-comment">;; for the procedure body</span>
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> make-compiled-procedure) 
          (<span class="hljs-name">label</span> entry2) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> after-lambda1))
entry<span class="hljs-number">2</span>     <span class="hljs-comment">; calls to factorial will enter here</span>
  (<span class="hljs-name">assign</span> env 
          (<span class="hljs-name">op</span> compiled-procedure-env)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">assign</span> env
          (<span class="hljs-name">op</span> extend-environment) 
          (<span class="hljs-name">const</span> (<span class="hljs-name">n</span>)) 
          (<span class="hljs-name">reg</span> argl) 
          (<span class="hljs-name">reg</span> env))
<span class="hljs-comment">;; begin actual procedure body</span>
  (<span class="hljs-name">save</span> continue)
  (<span class="hljs-name">save</span> env)
<span class="hljs-comment">;; compute (= n 1)</span>
  (<span class="hljs-name">assign</span> proc 
          (<span class="hljs-name">op</span> lookup-variable-value) 
          (<span class="hljs-name">const</span> =) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> lookup-variable-value) 
          (<span class="hljs-name">const</span> n) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> cons) (<span class="hljs-name">reg</span> val) (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch17))
compiled-branch<span class="hljs-number">16</span>
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-call15))
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> compiled-procedure-entry)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">17</span>
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> apply-primitive-procedure) 
          (<span class="hljs-name">reg</span> proc) 
          (<span class="hljs-name">reg</span> argl))
after-call<span class="hljs-number">15</span>   <span class="hljs-comment">; val now contains result of (= n 1)</span>
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> false?) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> false-branch4))
true-branch<span class="hljs-number">5</span>  <span class="hljs-comment">; return 1</span>
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))

false-branch<span class="hljs-number">4</span>
<span class="hljs-comment">;; compute and return (* (factorial (- n 1)) n)</span>
  (<span class="hljs-name">assign</span> proc 
          (<span class="hljs-name">op</span> lookup-variable-value) 
          (<span class="hljs-name">const</span> *) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">save</span> continue)
  (<span class="hljs-name">save</span> proc)   <span class="hljs-comment">; save * procedure</span>
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> lookup-variable-value) 
          (<span class="hljs-name">const</span> n) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">save</span> argl)   <span class="hljs-comment">; save partial argument list for *</span>
<span class="hljs-comment">;; compute (factorial (- n 1)), </span>
<span class="hljs-comment">;; which is the other argument for *</span>
  (<span class="hljs-name">assign</span> proc
          (<span class="hljs-name">op</span> lookup-variable-value) 
          (<span class="hljs-name">const</span> factorial) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">save</span> proc)  <span class="hljs-comment">; save factorial procedure</span>
<span class="hljs-comment">;; compute (- n 1), which is the argument for factorial</span>
  (<span class="hljs-name">assign</span> proc 
          (<span class="hljs-name">op</span> lookup-variable-value)
          (<span class="hljs-name">const</span> -) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> lookup-variable-value) 
          (<span class="hljs-name">const</span> n) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> cons) (<span class="hljs-name">reg</span> val) (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch8))
compiled-branch<span class="hljs-number">7</span>
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-call6))
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> compiled-procedure-entry)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">8</span>
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> apply-primitive-procedure) 
          (<span class="hljs-name">reg</span> proc) 
          (<span class="hljs-name">reg</span> argl))

after-call<span class="hljs-number">6</span>   <span class="hljs-comment">; val now contains result of (- n 1)</span>
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">restore</span> proc) <span class="hljs-comment">; restore factorial</span>
<span class="hljs-comment">;; apply factorial</span>
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch11))
compiled-branch<span class="hljs-number">10</span>
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-call9))
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> compiled-procedure-entry)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">11</span>
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> apply-primitive-procedure) 
          (<span class="hljs-name">reg</span> proc) 
          (<span class="hljs-name">reg</span> argl))
after-call<span class="hljs-number">9</span>      <span class="hljs-comment">; val now contains result </span>
                 <span class="hljs-comment">; of (factorial (- n 1))</span>
  (<span class="hljs-name">restore</span> argl) <span class="hljs-comment">; restore partial argument list for *</span>
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> cons) (<span class="hljs-name">reg</span> val) (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">restore</span> proc) <span class="hljs-comment">; restore *</span>
  (<span class="hljs-name">restore</span> continue)
<span class="hljs-comment">;; apply * and return its value</span>
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch14))
compiled-branch<span class="hljs-number">13</span>
<span class="hljs-comment">;; note that a compound procedure here</span>
<span class="hljs-comment">;; is called tail-recursively</span>
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> compiled-procedure-entry)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">14</span>
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> apply-primitive-procedure) 
          (<span class="hljs-name">reg</span> proc) 
          (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
after-call<span class="hljs-number">12</span>
after-if<span class="hljs-number">3</span>
after-lambda<span class="hljs-number">1</span>
<span class="hljs-comment">;; assign the procedure to the variable factorial</span>
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> define-variable!) 
           (<span class="hljs-name">const</span> factorial) 
           (<span class="hljs-name">reg</span> val) 
           (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> ok))
</code></pre>
<p><strong>التمرين 5.33:</strong> تأمّل التعريف الآتي لإجراءٍ لحساب العامليّ، وهو يختلف اختلافًا طفيفًا عن المعطى أعلاه:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">factorial-alt</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> n <span class="hljs-number">1</span>)
      <span class="hljs-number">1</span>
      (<span class="hljs-name"><span class="hljs-built_in">*</span></span> n (<span class="hljs-name">factorial-alt</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)))))
</code></pre>
<p>صرّف هذا الإجراء وقارِن الشيفرة الناتجة بتلك التي أُنتجت للإجراء <code>factorial</code>. اشرح أيّ فروقٍ تجدها. فهل ينفّذ أحد البرنامجين بكفاءةٍ أعلى من الآخر؟</p>
<p><strong>التمرين 5.34:</strong> صرّف إجراء العامليّ التكراريّ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">factorial</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">iter</span> product counter)
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">&gt;</span></span> counter n)
        product
        (<span class="hljs-name">iter</span> (<span class="hljs-name"><span class="hljs-built_in">*</span></span> counter product)
              (<span class="hljs-name"><span class="hljs-built_in">+</span></span> counter <span class="hljs-number">1</span>))))
  (<span class="hljs-name">iter</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span>))
</code></pre>
<p>علّم الشيفرة الناتجة، مُبيّنًا الفرق الجوهريّ بين شيفرة النسختين التكراريّة والتعاوديّة من <code>factorial</code>، وهو الفرق الذي يجعل إحدى العمليّتين تبني مساحةً في المكدّس بينما تعمل الأخرى في مساحة مكدّسٍ ثابتة.</p>
<blockquote>
<p><strong>التمرين 5.35:</strong> ما التعبير الذي صُرّف لإنتاج الشيفرة الموضّحة في <a href="#Figure-5_002e18">الشكل 5.18</a>؟</p>
</blockquote>
<p><strong>الشكل 5.18:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> مثالٌ على ناتج المصرِّف. انظر <a href="#Exercise-5_002e35">التمرين 5.35</a>.</p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> make-compiled-procedure) 
            (<span class="hljs-name">label</span> entry16) 
            (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> after-lambda15))
entry<span class="hljs-number">16</span>
  (<span class="hljs-name">assign</span> env (<span class="hljs-name">op</span> compiled-procedure-env)
              (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">assign</span> env (<span class="hljs-name">op</span> extend-environment) 
              (<span class="hljs-name">const</span> (<span class="hljs-name">x</span>)) 
              (<span class="hljs-name">reg</span> argl) 
              (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> proc (<span class="hljs-name">op</span> lookup-variable-value) 
               (<span class="hljs-name">const</span> +) 
               (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">save</span> continue) (<span class="hljs-name">save</span> proc) (<span class="hljs-name">save</span> env)
  (<span class="hljs-name">assign</span> proc (<span class="hljs-name">op</span> lookup-variable-value) 
               (<span class="hljs-name">const</span> g) 
               (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">save</span> proc)
  (<span class="hljs-name">assign</span> proc (<span class="hljs-name">op</span> lookup-variable-value) 
               (<span class="hljs-name">const</span> +) 
               (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> <span class="hljs-number">2</span>))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> lookup-variable-value)
              (<span class="hljs-name">const</span> x) 
              (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> cons)
               (<span class="hljs-name">reg</span> val)
               (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?)
        (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch19))
compiled-branch<span class="hljs-number">18</span>
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-call17))
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> compiled-procedure-entry)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">19</span>
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> apply-primitive-procedure)
          (<span class="hljs-name">reg</span> proc) 
          (<span class="hljs-name">reg</span> argl))
after-call<span class="hljs-number">17</span>
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">restore</span> proc)
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?)
        (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch22))
compiled-branch<span class="hljs-number">21</span>
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> after-call20))
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> compiled-procedure-entry)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">22</span>
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> apply-primitive-procedure) 
          (<span class="hljs-name">reg</span> proc) 
          (<span class="hljs-name">reg</span> argl))
after-call<span class="hljs-number">20</span>
  (<span class="hljs-name">assign</span> argl (<span class="hljs-name">op</span> list) (<span class="hljs-name">reg</span> val))
  (<span class="hljs-name">restore</span> env)
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> lookup-variable-value) 
          (<span class="hljs-name">const</span> x) 
          (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> argl
          (<span class="hljs-name">op</span> cons)
          (<span class="hljs-name">reg</span> val)
          (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">restore</span> proc)
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?)
        (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-branch25))
compiled-branch<span class="hljs-number">24</span>
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> compiled-procedure-entry)
              (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
primitive-branch<span class="hljs-number">25</span>
  (<span class="hljs-name">assign</span> val 
          (<span class="hljs-name">op</span> apply-primitive-procedure)
          (<span class="hljs-name">reg</span> proc) 
          (<span class="hljs-name">reg</span> argl))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> continue))
after-call<span class="hljs-number">23</span>
after-lambda<span class="hljs-number">15</span>
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> define-variable!) 
           (<span class="hljs-name">const</span> f) 
           (<span class="hljs-name">reg</span> val) 
           (<span class="hljs-name">reg</span> env))
  (<span class="hljs-name">assign</span> val (<span class="hljs-name">const</span> ok))
</code></pre>
<blockquote>
<p><strong>التمرين 5.36:</strong> ما ترتيب التقييم الذي يُنتجه مصرِّفنا لعوامل التركيب؟ أهو من اليسار إلى اليمين، أم من اليمين إلى اليسار، أم ترتيبٌ آخر؟ وأين يُحدَّد هذا الترتيب في المصرِّف؟ عدّل المصرّف بحيث يُنتج ترتيب تقييمٍ آخر. (انظر مناقشة ترتيب التقييم للمُقيِّم صريح التحكّم الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1">5.4.1</a>.) فكيف يؤثّر تغيير ترتيب تقييم العوامل في كفاءة الشيفرة التي تبني قائمة المعطيات؟</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.37:</strong> إحدى طرائق فهم آليّة <code>preserving</code> في المصرِّف - المستخدمة لتحسين استغلال المكدّس - هي رؤية العمليّات الإضافيّة التي كانت ستُولَّد لو لم نستخدم هذه الفكرة. عدّل <code>preserving</code> بحيث تُولَّد عمليّتا <code>save</code> و<code>restore</code> دائمًا. صرّف بعض التعابير البسيطة وحدّد عمليّات المكدّس غير الضروريّة التي تُولَّد. قارِن الشيفرة بتلك التي تُولَّد مع بقاء آليّة <code>preserving</code> على حالها.</p>
</blockquote>
<p>مصرِّفنا بارعٌ في تجنّب عمليّات المكدّس غير الضروريّة، لكنّه ليس بارعًا على الإطلاق حين يُصرّف نداءات الإجراءات الأوّليّة للغة من حيث العمليّات الأوّليّة التي تزوّدها الآلة. فتأمّل، مثلًا، كم الشيفرة التي تُصرَّف لاحتساب <code>(+ a 1)</code>: فالشيفرة تُنشئ قائمةَ معطياتٍ في <code>argl</code>، وتضع إجراء الجمع الأوّليّ (الذي تجده بالبحث عن الرمز <code>+</code> في البيئة) في <code>proc</code>، وتختبر ما إذا كان الإجراء أوّليًّا أم مركّبًا. والمصرِّف يُولّد دائمًا شيفرةً لأداء الاختبار، وكذلك شيفرةً للفرعين الأوّليّ والمركّب (ولن يُنفَّذ إلّا أحدهما). ونحن لم نُظهر الجزء من المتحكّم الذي يُنفّذ الأوّليّات، لكنّنا نفترض أنّ هذه التعليمات تستخدم العمليّات الحسابيّة الأوّليّة في مسارات بيانات الآلة. وتأمّل كم الشيفرة الأقلّ التي كانت ستُولَّد لو كان المصرِّف قادرًا على <em>الترميز المباشر (open-coding)</em> للأوّليّات - أي لو كان قادرًا على توليد شيفرةٍ تستخدم عمليّات الآلة الأوّليّة هذه مباشرةً. فقد يُصرَّف التعبير <code>(+ a 1)</code> إلى شيءٍ بسيطٍ كالآتي:<sup class="footnote-ref"><a href="#fn43" id="fnref43">[43]</a></sup></p>
<pre><code class="language-scheme">(<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> lookup-variable-value) 
            (<span class="hljs-name">const</span> a) 
            (<span class="hljs-name">reg</span> env))
(<span class="hljs-name">assign</span> val (<span class="hljs-name">op</span> +)
            (<span class="hljs-name">reg</span> val)
            (<span class="hljs-name">const</span> <span class="hljs-number">1</span>))
</code></pre>
<p>سنُوسّع في هذا التمرين مصرِّفنا ليدعم الترميز المباشر لأوّليّاتٍ منتقاة. وستُولَّد شيفرةٌ خاصّةٌ لنداءات هذه الإجراءات الأوّليّة بدلًا من شيفرة تطبيق الإجراءات العامّة. ولكي نُسند هذا، سنُعزّز آلتنا بمسجّلي معطياتٍ خاصّين، <code>arg1</code> و<code>arg2</code>. وستأخذ عمليّات الآلة الحسابيّة الأوّليّة معطياتها من <code>arg1</code> و<code>arg2</code>. وقد توضع النتائج في <code>val</code> أو <code>arg1</code> أو <code>arg2</code>.</p>
<p>ينبغي أن يكون المصرِّف قادرًا على التعرّف على تطبيق أوّليٍّ مُرمَّزٍ مباشرةً في البرنامج المصدريّ. وسنُعزّز التوزيع في الإجراء <code>compile</code> ليُتعرّف على أسماء هذه الأوّليّات بالإضافة إلى الكلمات المحجوزة (الصيغ الخاصّة) التي يتعرّف عليها حاليًّا.<sup class="footnote-ref"><a href="#fn44" id="fnref44">[44]</a></sup> ولكلّ صيغةٍ خاصّةٍ في مصرِّفنا مولّدُ شيفرة. وسنبني في هذا التمرين عائلةً من مولّدات الشيفرة للأوّليّات المُرمَّزة مباشرةً.</p>
<ol>
<li>تحتاج الأوّليّات المُرمَّزة مباشرةً - بخلاف الصيغ الخاصّة - جميعًا إلى تقييم عواملها. اكتب مولّد شيفرةٍ <code>spread-arguments</code> لاستخدامه من جميع مولّدات الشيفرة التي تُرمّز مباشرةً. وينبغي لـ<code>spread-arguments</code> أن تأخذ قائمة عواملٍ وتُصرّف العوامل المعطاة موجَّهةً إلى مسجّلات المعطيات المتتالية. ولاحِظ أنّ العامل قد يحتوي نداءً لأوّليٍّ مُرمَّزٍ مباشرةً، ومن ثمّ يتعيّن الحفاظ على مسجّلات المعطيات أثناء تقييم العامل.</li>
<li>لكلّ من الإجراءات الأوّليّة <code>=</code> و<code>*</code> و<code>-</code> و<code>+</code>، اكتب مولّد شيفرةٍ يأخذ تركيبًا ذي المشغّل المذكور، مع هدفٍ وواصف ربط، ويُنتج شيفرةً تنشر المعطيات في المسجّلات ثم تُداء العمليّة موجَّهةً إلى الهدف المعطى بالربط المعطى. وليس عليك إلّا التعامل مع التعابير ذات العاملين. واجعل <code>compile</code> يُوزّع إلى مولّدات الشيفرة هذه.</li>
<li>جرّب مصرِّفك الجديد على مثال <code>factorial</code>. قارِن الشيفرة الناتجة بالناتج المُنتَج دون الترميز المباشر.</li>
<li>وسّع مولّدي الشيفرة الخاصّين بـ<code>+</code> و<code>*</code> بحيث يتمكّنان من التعامل مع تعابيرَ ذات أعدادٍ اعتباطيّةٍ من العوامل. وسيتعيّن تصريف التعبير ذي أكثر من عاملين إلى تسلسلٍ من العمليّات، لكلٍّ منها مدخلان فقط.</li>
</ol>
<h4>5.5.6 العنونة المعجميّة</h4>
<p>إحدى أكثر التحسينات شيوعًا التي تُجريها المصرّفات هي تحسين البحث عن المتغيّرات. فمصرِّفنا، كما نفّذناه حتّى الآن، يُولّد شيفرةً تستخدم عمليّة <code>lookup-variable-value</code> الخاصّة بآلة المُقيِّم. وتبحث هذه العمليّة عن متغيّرٍ بمقارنته بكلّ متغيّرٍ مربوطٍ حاليًّا، مُنتقلةً إطارًا بعد إطارٍ إلى الخارج عبر بيئة وقت التشغيل. وقد يكون هذا البحث مكلفًا إذا كانت الأطر متداخلةً بعمقٍ أو إذا كان المتغيّرات كثيرة. فتأمّل، مثلًا، مسألة البحث عن قيمة <code>x</code> أثناء تقييم التعبير <code>(* x y z)</code> في تطبيق الإجراء الذي يُعيده</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">x</span> <span class="hljs-number">3</span>) (<span class="hljs-name">y</span> <span class="hljs-number">4</span>))
  (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (a b c d e)
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">y</span> (<span class="hljs-name"><span class="hljs-built_in">*</span></span> a b x))
          (<span class="hljs-name">z</span> (<span class="hljs-name"><span class="hljs-built_in">+</span></span> c d x)))
      (<span class="hljs-name"><span class="hljs-built_in">*</span></span> x y z))))
</code></pre>
<p>وحيث إنّ تعبير <code>let</code> ليس إلّا سُكّرًا نحويًّا لتركيب <code>lambda</code>، فإنّ هذا التعبير مكافئٌ لـ</p>
<pre><code class="language-scheme">((<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (x y)
   (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (a b c d e)
     ((<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (y z) (<span class="hljs-name"><span class="hljs-built_in">*</span></span> x y z))
      (<span class="hljs-name"><span class="hljs-built_in">*</span></span> a b x)
      (<span class="hljs-name"><span class="hljs-built_in">+</span></span> c d x))))
 <span class="hljs-number">3</span>
 <span class="hljs-number">4</span>)
</code></pre>
<p>في كلّ مرّةٍ تبحث فيها <code>lookup-variable-value</code> عن <code>x</code>، ينبغي أن تُحدّد أنّ الرمز <code>x</code> ليس <code>eq?</code> بالنسبة إلى <code>y</code> أو <code>z</code> (في الإطار الأوّل)، ولا بالنسبة إلى <code>a</code> أو <code>b</code> أو <code>c</code> أو <code>d</code> أو <code>e</code> (في الإطار الثاني). وسنفترض، في الوقت الحاضر، أنّ برامجنا لا تستخدم <code>define</code> - أي أنّ المتغيّرات لا تُربط إلّا بـ<code>lambda</code>. ولأنّ لغتنا محدودة النطاق معجميًّا، فإنّ بيئة وقت التشغيل لأيّ تعبيرٍ ستكون ذات بنيةٍ تُوازي البنية المعجميّة للبرنامج الذي يظهر فيه التعبير.<sup class="footnote-ref"><a href="#fn45" id="fnref45">[45]</a></sup> وبالتالي، فيستطيع المصرِّف أن يعرف، حين يُحلّل التعبير أعلاه، أنّ المتغيّر <code>x</code> في <code>(* x y z)</code> سيوجد، في كلّ مرّةٍ يُطبَّق فيها الإجراء، على مسافة إطارين من الإطار الحاليّ وسيكون أوّل متغيّرٍ في ذلك الإطار.</p>
<p>ويمكننا استثمار هذه الحقيقة باختراع نوعٍ جديدٍ من عمليّات البحث عن المتغيّرات، هو <code>lexical-address-lookup</code>، الذي يأخذ بيئةً و<em>عنوانًا معجميًّا</em> يتألّف من عددين: <em>رقم إطار</em>، يُحدّد كم إطارًا ينبغي تجاوزه، و<em>رقم إزاحة</em>، يُحدّد كم متغيّرًا ينبغي تجاوزه في ذلك الإطار. وستُنتج <code>Lexical-address-lookup</code> قيمة المتغيّر المخزّن عند ذلك العنوان المعجميّ نسبةً إلى البيئة الحاليّة. فإذا أضفنا عمليّة <code>lexical-address-lookup</code> إلى آلتنا، أمكننا أن نجعل المصرِّف يُولّد شيفرةً تشير إلى المتغيّرات باستخدام هذه العمليّة بدلًا من <code>lookup-variable-value</code>. وبالمثل، فيمكن لشيفرتنا المصرّفة أن تستخدم عمليّةً جديدةً هي <code>lexical-address-set!</code> بدلًا من <code>set-variable-value!</code>.</p>
<p>ولتوليد شيفرةٍ كهذه، ينبغي أن يكون المصرِّف قادرًا على تحديد العنوان المعجميّ لمتغيّرٍ يُوشك أن يُصرّف إشارةً إليه. ويعتمد العنوان المعجميّ لمتغيّرٍ في برنامجٍ على موضع المرء في الشيفرة. فتأمّل، مثلًا، في البرنامج الآتي، عنوان <code>x</code> في التعبير <code>⟨</code>e1<code>⟩</code> هو (2, 0) - أي إطاران إلى الخلف وأوّل متغيّرٍ في الإطار. وعند تلك النقطة يكون <code>y</code> عند العنوان (0, 0) و<code>c</code> عند العنوان (1, 2). وفي التعبير <code>⟨</code>e2<code>⟩</code>، يكون <code>x</code> عند (1, 0)، و<code>y</code> عند (1, 1)، و<code>c</code> عند (0, 2).</p>
<pre><code class="language-scheme">((<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (x y)
   (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (a b c d e)
     ((<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (y z) ⟨e1⟩)
      ⟨e2⟩
      (<span class="hljs-name"><span class="hljs-built_in">+</span></span> c d x))))
 <span class="hljs-number">3</span>
 <span class="hljs-number">4</span>)
</code></pre>
<p>إحدى طرائق جعل المصرِّف يُنتج شيفرةً تستخدم العنونة المعجميّة هي المحافظة على بنية بياناتٍ تُسمّى <em>بيئة وقت التصريف</em>. وهي تتابع أيّ المتغيّرات ستكون في أيّ المواضع وفي أيّ الأطر في بيئة وقت التشغيل حين تُنفَّذ عمليّة وصولٍ معيّنةٍ إلى متغيّر. وبيئة وقت التصريف قائمةٌ من الأطر، يحتوي كلٌّ منها على قائمةٍ من المتغيّرات. (ولن تكون هناك بالطبع أيّ قيمٍ مربوطةٍ بالمتغيّرات، إذ إنّ القيم لا تُحتسب في وقت التصريف.) وتصير بيئة وقت التصريف معطىً إضافيًّا لـ<code>compile</code> وتُمرَّر إلى كلّ مولّد شيفرة. ويستخدم نداء <code>compile</code> في المستوى الأعلى بيئةَ وقت تصريفٍ فارغة. وحين يُصرَّف جسم <code>lambda</code>، تُوسّع <code>compile-lambda-body</code> بيئةَ وقت التصريف بإطارٍ يحتوي وسائط الإجراء، بحيث يُصرَّف التسلسل المكوِّن للجسم بتلك البيئة المُوسَّعة. وعند كلّ نقطةٍ في التصريف، تستخدم <code>compile-variable</code> و<code>compile-assignment</code> بيئةَ وقت التصريف لتوليد العناوين المعجميّة المناسبة.</p>
<p>يصف <a href="#Exercise-5_002e39">التمرين 5.39</a> إلى <a href="#Exercise-5_002e43">التمرين 5.43</a> كيف يُتْم هذه المخططات لاستراتيجيّة العنونة المعجميّة بغية إدماج البحث المعجميّ في المصرِّف. ويصف <a href="#Exercise-5_002e44">التمرين 5.44</a> استخدامًا آخر لبيئة وقت التصريف.</p>
<blockquote>
<p><strong>التمرين 5.39:</strong> اكتب إجراءً <code>lexical-address-lookup</code> يُنفّذ عمليّة البحث الجديدة. وينبغي أن يأخذ معطيين - عنوانًا معجميًّا وبيئةَ وقت تشغيل - ويُعيد قيمة المتغيّر المخزّن عند العنوان المعجميّ المحدَّد. وينبغي لـ<code>Lexical-address-lookup</code> أن يُشير إلى خطأٍ إذا كانت قيمة المتغيّر هي الرمز <code>*unassigned*</code>.<sup class="footnote-ref"><a href="#fn46" id="fnref46">[46]</a></sup> واكتب أيضًا إجراءً <code>lexical-address-set!</code> يُنفّذ العمليّة التي تُغيّر قيمة المتغيّر عند عنوانٍ معجميٍّ محدَّد.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.40:</strong> عدّل المصرِّف ليحافظ على بيئة وقت التصريف كما وُصِف أعلاه. أي أضِف معطى بيئةِ وقت تصريفٍ إلى <code>compile</code> وإلى مولّدات الشيفرة المختلفة، ووسّعه في <code>compile-lambda-body</code>.</p>
</blockquote>
<p><strong>التمرين 5.41:</strong> اكتب إجراءً <code>find-variable</code> يأخذ متغيّرًا وبيئةَ وقت تصريفٍ كمعطيين ويُعيد العنوان المعجميّ للمتغيّر نسبةً إلى تلك البيئة. فمثلًا، في المقطع البرمجيّ الموضّح أعلاه، تكون بيئة وقت التصريف أثناء تصريف التعبير <code>⟨</code>e1<code>⟩</code> هي <code>((y z) (a b c d e) (x y))</code>. وينبغي لـ<code>Find-variable</code> أن يُنتج</p>
<pre><code class="language-scheme">(<span class="hljs-name">find-variable</span> 
 <span class="hljs-symbol">&#x27;c</span> &#x27;((y z) (a b c d e) (x y)))
(<span class="hljs-name">1</span> <span class="hljs-number">2</span>)

(<span class="hljs-name">find-variable</span> 
 <span class="hljs-symbol">&#x27;x</span> &#x27;((y z) (a b c d e) (x y)))
(<span class="hljs-name">2</span> <span class="hljs-number">0</span>)

(<span class="hljs-name">find-variable</span> 
 <span class="hljs-symbol">&#x27;w</span> &#x27;((y z) (a b c d e) (x y)))
not-found
</code></pre>
<blockquote>
<p><strong>التمرين 5.42:</strong> باستخدام <code>find-variable</code> من <a href="#Exercise-5_002e41">التمرين 5.41</a>، أعد كتابة <code>compile-variable</code> و<code>compile-assignment</code> ليُخرِجا تعليمات العنوان المعجميّ. وفي الحالات التي تُعيد فيها <code>find-variable</code> القيمة <code>not-found</code> (أي حيث لا يكون المتغيّر في بيئة وقت التصريف)، ينبغي أن تجعل مولّدات الشيفرة تستخدم عمليّات المُقيِّم، كما سبق، للبحث عن الربط. (والمكان الوحيد الذي يمكن أن يكون فيه متغيّرٌ لا يُعثَر عليه في وقت التصريف هو البيئة العامّة، وهي جزءٌ من بيئة وقت التشغيل لكنّها ليست جزءًا من بيئة وقت التصريف.<sup class="footnote-ref"><a href="#fn47" id="fnref47">[47]</a></sup> وبالتالي، فإن شئتَ، أمكنك أن تجعل عمليّات المُقيِّم تنظر مباشرةً في البيئة العامّة، التي يمكن الحصول عليها بالعمليّة <code>(op get-global-environment)</code>، بدلًا من أن تجعلها تبحث في بيئة وقت التشغيل كلّها الموجودة في <code>env</code>.) واختبر المصرِّف المُعدَّل على بعض الحالات البسيطة، كتركيب <code>lambda</code> المتداخل في بداية هذا القسم.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.43:</strong> لقد حاججنا في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e6">4.1.6</a> بأنّ التعريفات الداخليّة لبنية الكتل لا ينبغي اعتبارها <code>define</code>s «حقيقيّة». فالأولى أن يُفسَّر جسم الإجراء كما لو كانت المتغيّرات الداخليّة المُعرَّفة تُثبَّت متغيّرات <code>lambda</code> اعتياديّةً تُهيَّأ بقيمها الصحيحة باستخدام <code>set!</code>. وأظهر <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e6">4.1.6</a> و<a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#Exercise-4_002e16">التمرين 4.16</a> كيف يُعدَّل المُقيِّم التحاكميّ (metacircular evaluator) لإنجاز هذا بمسح التعريفات الداخليّة وإخراجها. عدّل المصرِّف ليؤدّي التحويل ذاته قبل أن يُصرّف جسم إجراء.</p>
</blockquote>
<p><strong>التمرين 5.44:</strong> لقد تركّزنا في هذا القسم على استخدام بيئة وقت التصريف لإنتاج العناوين المعجميّة. لكن ثمّة استخدامات أخرى لبيئات وقت التصريف. فمثلًا، زدنا في <a href="#Exercise-5_002e38">التمرين 5.38</a> كفاءة الشيفرة المصرّفة بترميز الإجراءات الأوّليّة مباشرةً. وقد عامل تنفيذنا أسماء الإجراءات المُرمَّزة مباشرةً معاملة الكلمات المحجوزة. فلو أعاد برنامجٌ ربط اسمٍ كهذا، لظلّت الآليّة الموصوفة في <a href="#Exercise-5_002e38">التمرين 5.38</a> تُرمّزه مباشرةً كأوّليٍّ، متجاهلةً الربط الجديد. فتأمّل، مثلًا، الإجراء</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (+ * a b x y)
  (<span class="hljs-name"><span class="hljs-built_in">+</span></span> (<span class="hljs-name"><span class="hljs-built_in">*</span></span> a x) (<span class="hljs-name"><span class="hljs-built_in">*</span></span> b y)))
</code></pre>
<p>الذي يحسب تركيبةً خطّيّةً من <code>x</code> و<code>y</code>. فقد ندعوه بمعطيات <code>+matrix</code> و<code>*matrix</code> وأربع مصفوفات، لكن المصرِّف المُرمِّز مباشرةً كان سيظلّ يُرمّز الـ<code>+</code> والـ<code>*</code> في <code>(+ (* a x) (* b y))</code> مباشرةً كأوّليَّي <code>+</code> و<code>*</code>. عدّل المصرِّف المُرمِّز مباشرةً ليستشير بيئة وقت التصريف بغية تصريف الشيفرة الصحيحة للتعابير التي تشمل أسماء الإجراءات الأوّليّة. (وستعمل الشيفرة صحيحةً ما دام البرنامج لا يُعرّف هذه الأسماء بـ<code>define</code> أو <code>set!</code>.)</p>
<h4>5.5.7 ربط الشيفرة المصرّفة بالمُقيِّم</h4>
<p>لم نشرح بعد كيف تُحمَّل الشيفرة المصرّفة في آلة المُقيِّم ولا كيف تُشغَّل. وسنفترض أنّ آلة المُقيِّم صريحة التحكّم قد عُرِّفت كما في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e4">5.4.4</a>، مع العمليّات الإضافيّة المحدَّدة في <a href="#Footnote-323">الحاشية 323</a>. وسنُنفّذ إجراءً <code>compile-and-go</code> يُصرّف تعبير Scheme، ويُحمّل الشيفرة الهدفيّة الناتجة في آلة المُقيِّم، ويجعل الآلة تُشغّل الشيفرة في البيئة العامّة للمُقيِّم، وتطبع النتيجة، وتدخل حلقة المقود (driver loop) الخاصّة بالمُقيِّم. وسنُعدّل المُقيِّم أيضًا حتّى تستطيع التعابير المُفسَّرة أن تنادي الإجراءات المصرّفة كما تنادي المُفسَّرة. وبوسعنا حينئذٍ أن نضع إجراءً مصرّفًا في الآلة وأن نستخدم المُقيِّم لندائه:</p>
<pre><code class="language-scheme">(<span class="hljs-name">compile-and-go</span>
 &#x27;(define (factorial n)
    (if (= n <span class="hljs-number">1</span>)
        <span class="hljs-number">1</span>
        (* (factorial (- n <span class="hljs-number">1</span>)) n))))

<span class="hljs-comment">;;; EC-Eval value:</span>
ok

<span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name">factorial</span> <span class="hljs-number">5</span>)

<span class="hljs-comment">;;; EC-Eval value:</span>
<span class="hljs-number">120</span>
</code></pre>
<p>وليتمكّن المُقيِّم من التعامل مع الإجراءات المصرّفة (لتقييم نداء <code>factorial</code> أعلاه، مثلًا)، يتعيّن علينا تغيير الشيفرة عند <code>apply-dispatch</code> (<a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e1">5.4.1</a>) بحيث تتعرّف على الإجراءات المصرّفة (بوصفها متميّزةً عن الإجراءات المركّبة أو الأوّليّة) وتنقل التحكّم مباشرةً إلى نقطة دخول الشيفرة المصرّفة:<sup class="footnote-ref"><a href="#fn48" id="fnref48">[48]</a></sup></p>
<pre><code class="language-scheme">apply-dispatch
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> primitive-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> primitive-apply))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> compound-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> compound-apply))
  (<span class="hljs-name">test</span> (<span class="hljs-name">op</span> compiled-procedure?) (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> compiled-apply))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> unknown-procedure-type))

compiled-apply
  (<span class="hljs-name">restore</span> continue)
  (<span class="hljs-name">assign</span> val
          (<span class="hljs-name">op</span> compiled-procedure-entry)
          (<span class="hljs-name">reg</span> proc))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
</code></pre>
<p>لاحِظ استعادة <code>continue</code> عند <code>compiled-apply</code>. وتذكّر أنّ المُقيِّم رُتّب بحيث تكون الاستمراريّة في قمّة المكدّس عند <code>apply-dispatch</code>. أمّا نقطة دخول الشيفرة المصرّفة، من جهةٍ أخرى، فتتوقّع أن تكون الاستمراريّة في <code>continue</code>، ومن ثمّ يتعيّن استعادة <code>continue</code> قبل تنفيذ الشيفرة المصرّفة.</p>
<p>وليُتاح لنا تشغيل بعض الشيفرة المصرّفة حين نُشغّل آلة المُقيِّم، نُضيف تعليمة <code>branch</code> في بداية آلة المُقيِّم، تجعل الآلة تنتقل إلى نقطة دخولٍ جديدة إذا كان مسجّل <code>flag</code> مضبوطًا.<sup class="footnote-ref"><a href="#fn49" id="fnref49">[49]</a></sup></p>
<pre><code class="language-scheme"><span class="hljs-comment">;; branches if flag is set:</span>
(<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> external-entry)) 
read-eval-print-loop
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> initialize-stack))
  …
</code></pre>
<p>تفترض <code>External-entry</code> أنّ الآلة تُشغَّل و<code>val</code> يحتوي موقع تسلسل تعليماتٍ يضع نتيجةً في <code>val</code> وينتهي بـ<code>(goto (reg continue))</code>. فالانطلاق من نقطة الدخول هذه يقفز إلى الموقع الذي يُعيّنه <code>val</code>، لكنّه يُسند أوّلًا <code>continue</code> بحيث يعود التنفيذ إلى <code>print-result</code>، الذي يطبع القيمة في <code>val</code> ثم يذهب إلى بداية حلقة القراءة والتقييم والطباعة الخاصّة بالمُقيِّم.<sup class="footnote-ref"><a href="#fn50" id="fnref50">[50]</a></sup></p>
<pre><code class="language-scheme">external-entry
  (<span class="hljs-name">perform</span> (<span class="hljs-name">op</span> initialize-stack))
  (<span class="hljs-name">assign</span> env (<span class="hljs-name">op</span> get-global-environment))
  (<span class="hljs-name">assign</span> continue (<span class="hljs-name">label</span> print-result))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">reg</span> val))
</code></pre>
<p>والآن يمكننا استخدام الإجراء الآتي لتصريف تعريف إجراءٍ وتنفيذ الشيفرة المصرّفة وتشغيل حلقة القراءة والتقييم والطباعة حتّى نتمكّن من تجربة الإجراء. ولأنّنا نريد للشيفرة المصرّفة أن تعود إلى الموقع في <code>continue</code> بنتيجتها في <code>val</code>، فإنّنا نُصرّف التعبير بهدفٍ هو <code>val</code> وربطٍ هو <code>return</code>. وَلِكي نحوّل الشيفرة الهدفيّة التي يُنتجها المصرِّف إلى تعليماتٍ قابلةٍ للتنفيذ على آلة مسجّلات المُقيِّم، فإنّنا نستخدم الإجراء <code>assemble</code> من محاكي آلة المسجّلات (<a href="https://sarabander.github.io/sicp/html/5_002e2.xhtml#g_t5_002e2_002e2">5.2.2</a>). ثم نُهيّئ مسجّل <code>val</code> ليشير إلى قائمة التعليمات، ونضبط <code>flag</code> بحيث يذهب المُقيِّم إلى <code>external-entry</code>، ونُشغّل المُقيِّم.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">compile-and-go</span> expression)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">instructions</span>
         (<span class="hljs-name">assemble</span> 
          (<span class="hljs-name">statements</span>
           (<span class="hljs-name">compile</span> 
            expression <span class="hljs-symbol">&#x27;val</span> <span class="hljs-symbol">&#x27;return</span>))
          eceval)))
    (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> the-global-environment
          (<span class="hljs-name">setup-environment</span>))
    (<span class="hljs-name">set-register-contents!</span> 
     eceval <span class="hljs-symbol">&#x27;val</span> instructions)
    (<span class="hljs-name">set-register-contents!</span> 
     eceval <span class="hljs-symbol">&#x27;flag</span> true)
    (<span class="hljs-name">start</span> eceval)))
</code></pre>
<p>وإذا كنّا قد أعددنا مراقبة المكدّس، كما في نهاية <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e4">5.4.4</a>، فأمكننا فحص استغلال المكدّس في الشيفرة المصرّفة:</p>
<pre><code class="language-scheme">(<span class="hljs-name">compile-and-go</span>
 &#x27;(define (factorial n)
    (if (= n <span class="hljs-number">1</span>)
        <span class="hljs-number">1</span>
        (* (factorial (- n <span class="hljs-number">1</span>)) n))))
(<span class="hljs-name">total-pushes</span> = <span class="hljs-number">0</span>, maximum-depth = <span class="hljs-number">0</span>)

<span class="hljs-comment">;;; EC-Eval value:</span>
ok

<span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name">factorial</span> <span class="hljs-number">5</span>)
(<span class="hljs-name">total-pushes</span> = <span class="hljs-number">31</span>, maximum-depth = <span class="hljs-number">14</span>)

<span class="hljs-comment">;;; EC-Eval value:</span>
<span class="hljs-number">120</span>
</code></pre>
<p>قارِن هذا المثال بتقييم <code>(factorial 5)</code> باستخدام النسخة المُفسَّرة من الإجراء ذاته، الموضّحة في نهاية <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4_002e4">5.4.4</a>. فقد احتاجت النسخة المُفسَّرة 144 مدفعةً وعمقَ مكدّسٍ أقصاه 28. وهذا يُبيّن التحسين الناتج عن استراتيجيّة التصريف لدينا.</p>
<h4>التفسير والتصريف</h4>
<p>بالبرامج الواردة في هذا القسم، يمكننا الآن أن نُجرّب استراتيجيّي التنفيذ البديلتين المتمثّلتين في التفسير والتصريف.<sup class="footnote-ref"><a href="#fn51" id="fnref51">[51]</a></sup> فالمفسّر يرفع الآلة إلى مستوى برنامج المستخدم؛ أمّا المصرِّف فيخفض برنامج المستخدم إلى مستوى لغة الآلة. ويمكننا اعتبار لغة Scheme (أو أيّ لغة برمجةٍ) عائلةً متماسكةً من التجريدات القائمة على لغة الآلة. والمفسّرات حسنةٌ للتطوير التفاعليّ للبرامج ولتنقيحها، لأنّ خطوات تنفيذ البرنامج مُنظَّمةٌ من حيث هذه التجريدات، ومن ثمّ فهي أكثر وضوحًا للمبرمج. والشيفرة المصرّفة قادرةٌ على التنفيذ أسرعَ، لأنّ خطوات تنفيذ البرنامج مُنظَّمةٌ من حيث لغة الآلة، ولأنّ المصرِّف حرٌّ في إجراء تحسيناتٍ تتجاوز التجريدات ذات المستوى الأعلى.<sup class="footnote-ref"><a href="#fn52" id="fnref52">[52]</a></sup></p>
<p>وتؤدّي بديلتا التفسير والتصريف أيضًا إلى استراتيجيّاتٍ مختلفةٍ لنقل اللغات إلى حواسيب جديدة. فافترض أنّنا نرغب في تنفيذ Lisp على آلةٍ جديدة. فإحدى الاستراتيجيّات هي الانطلاق بالمُقيِّم صريح التحكّم الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4">5.4</a> وترجمة تعليماته إلى تعليماتٍ للآلة الجديدة. واستراتيجيّةٌ مختلفة هي الانطلاق بالمصرِّف وتغيير مولّدات الشيفرة بحيث تُولّد شيفرةً للآلة الجديدة. والاستراتيجيّة الثانية تسمح لنا بتشغيل أيّ برنامج Lisp على الآلة الجديدة بتصريفه أوّلًا بالمصرِّف العامل على نظام Lisp الأصليّ لدينا، وربطه بنسخةٍ مصرّفةٍ من مكتبة وقت التشغيل.<sup class="footnote-ref"><a href="#fn53" id="fnref53">[53]</a></sup> والأفضل من ذلك، أنّنا نستطيع تصريف المصرِّف نفسه، وتشغيل هذا الأخير على الآلة الجديدة لتصريف برامج Lisp أخرى.<sup class="footnote-ref"><a href="#fn54" id="fnref54">[54]</a></sup> أو نستطيع تصريف أحد مفسّري <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1">4.1</a> لإنتاج مفسّرٍ يعمل على الآلة الجديدة.</p>
<blockquote>
<p><strong>التمرين 5.45:</strong> بمقارنة عمليّات المكدّس التي تستخدمها الشيفرة المصرّفة بتلك التي يستخدمها المُقيِّم للاحتساب ذاته، نستطيع تحديد المدى الذي يُحسّن به المصرِّف استغلال المكدّس، سواءً في السرعة (بتقليل العدد الكلّيّ لعمليّات المكدّس) أو في المكان (بتقليل عمق المكدّس الأقصى). ومقارنة هذا الاستغلال المُحسَّن بأداء آلةٍ خاصّةٍ للاحتساب ذاته تُعطي إشارةً ما عن جودة المصرِّف. فقد طُلب منك في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#Exercise-5_002e27">التمرين 5.27</a> أن تُحدّد، كدالّةٍ في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> ، عدد المدفعات وعمق المكدّس الأقصى اللذين يحتاجهما المُقيِّم لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> باستخدام إجراء العامليّ التعاوديّ المعطى أعلاه. وطُلب منك في <a href="https://sarabander.github.io/sicp/html/5_002e2.xhtml#Exercise-5_002e14">التمرين 5.14</a> أن تُجري القياسات ذاتها لآلة العامليّ الخاصّة الموضّحة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11">الشكل 5.11</a>. وأدِر الآن التحليل ذاته باستخدام إجراء <code>factorial</code> المصرّف.</p>
<blockquote>
<p>خُذ نسبة عدد المدفعات في النسخة المصرّفة إلى عدد المدفعات في النسخة المُفسَّرة، وافعل المثل لعمق المكدّس الأقصى. وحيث إنّ عدد العمليّات وعمق المكدّس المستخدمين لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> خطّيان في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> ، فينبغي أن تقترب هذه النسب من ثوابتَ كلّما كَبُرَت <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> . فما هذه الثوابت؟ وبالمثل، أوجد نسب استغلال المكدّس في الآلة الخاصّة إلى الاستغلال في النسخة المُفسَّرة. وقارِن نسب الخاصّة مقابل المُفسَّرة بنسب المصرّفة مقابل المُفسَّرة. وستجد أنّ الآلة الخاصّة أفضلُ أداءً بكثيرٍ من الشيفرة المصرّفة، إذ ينبغي أن تكون شيفرة المتحكّم المصمّمة يدويًّا أفضلَ بكثيرٍ مما يُنتجه مصرِّفنا العامّ البدائيّ. فهل تستطيع اقتراح تحسيناتٍ على المصرِّف تُعينه على توليد شيفرةٍ تُقارِب في أدائها النسخة المصمّمة يدويًّا؟</p>
</blockquote>
</blockquote>
<p><strong>التمرين 5.46:</strong> أدِر تحليلًا مثل التحليل الوارد في <a href="#Exercise-5_002e45">التمرين 5.45</a> لتحديد فعّاليّة تصريف إجراء فيبوناتشي التعاوديّ الشجريّ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">fib</span> n)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">&lt;</span></span> n <span class="hljs-number">2</span>)
      n
      (<span class="hljs-name"><span class="hljs-built_in">+</span></span> (<span class="hljs-name">fib</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">1</span>)) (<span class="hljs-name">fib</span> (<span class="hljs-name"><span class="hljs-built_in">-</span></span> n <span class="hljs-number">2</span>)))))
</code></pre>
<p>مقابل فعّاليّة استخدام آلة فيبوناتشي الخاصّة الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12">الشكل 5.12</a>. (ولقياس الأداء المُفسَّر، انظر <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#Exercise-5_002e29">التمرين 5.29</a>.) فبالنسبة إلى فيبوناتشي، فإنّ المورد الزمنيّ المستخدم ليس خطّيًّا في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo separator="true">;</mo></mrow><annotation encoding="application/x-tex">n ;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">n</span><span class="mpunct">;</span></span></span></span> ومن ثمّ فلن تقترب نسب عمليّات المكدّس من قيمةٍ حدّيّةٍ مستقلّةٍ عن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> .</p>
<p><strong>التمرين 5.47:</strong> وصف هذا القسم كيف يُعدَّل المُقيِّم صريح التحكّم حتّى تستطيع الشيفرة المُفسَّرة أن تنادي إجراءاتٍ مصرّفة. أُظهر كيف يُعدَّل المصرِّف حتّى تستطيع الإجراءات المصرّفة أن تنادي، ليس الإجراءات الأوّليّة والمصرّفة فحسب، بل الإجراءات المُفسَّرة أيضًا. وهذا يتطلّب تعديل <code>compile-procedure-call</code> لمعالجة حالة الإجراءات المركّبة (المُفسَّرة). وتأكّد من معالجة جميع توليفات <code>target</code> و<code>linkage</code> ذاتها كما في <code>compile-proc-appl</code>. ولأداء تطبيق الإجراء فعليًّا، تحتاج الشيفرة إلى القفز إلى نقطة دخول <code>compound-apply</code> في المُقيِّم. ولا يمكن الإشارة إلى هذا العنوان مباشرةً في الشيفرة الهدفيّة (إذ إنّ المُجمِّع يشترط أن تكون جميع العناوين التي تشير إليها الشيفرة التي يُجمّعها معرَّفةً هناك)، ومن ثمّ سنُضيف مسجّلًا يُسمّى <code>compapp</code> إلى آلة المُقيِّم لحفظ نقطة الدخول هذه، ونُضيف تعليمةً لتهيئته:</p>
<pre><code class="language-scheme">  (<span class="hljs-name">assign</span> compapp (<span class="hljs-name">label</span> compound-apply))
  <span class="hljs-comment">;; branches if flag is set:</span>
  (<span class="hljs-name">branch</span> (<span class="hljs-name">label</span> external-entry))
read-eval-print-loop …
</code></pre>
<p>ولاختبار شيفرتك، ابدأ بتعريف إجراءٍ <code>f</code> ينادي إجراءً <code>g</code>. واستخدم <code>compile-and-go</code> لتصريف تعريف <code>f</code> وتشغيل المُقيِّم. ثم، بالكتابة على المُقيِّم، عرّف <code>g</code> وحاول نداء <code>f</code>.</p>
<p><strong>التمرين 5.48:</strong> إنّ واجهة <code>compile-and-go</code> المُنفَّذة في هذا القسم حرجةُ التعامل، إذ لا يمكن نداء المصرِّف إلّا مرّةً واحدةً (عند تشغيل آلة المُقيِّم). عزّز واجهة المصرِّف-المفسّر بتوفير أوّليٍّ <code>compile-and-run</code> يمكن نداؤه من داخل المُقيِّم صريح التحكّم على النحو الآتي:</p>
<pre><code class="language-scheme"><span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name">compile-and-run</span>
 &#x27;(define (factorial n)
    (if (= n <span class="hljs-number">1</span>)
        <span class="hljs-number">1</span>
        (* (factorial (- n <span class="hljs-number">1</span>)) n))))

<span class="hljs-comment">;;; EC-Eval value:</span>
ok

<span class="hljs-comment">;;; EC-Eval input:</span>
(<span class="hljs-name">factorial</span> <span class="hljs-number">5</span>)

<span class="hljs-comment">;;; EC-Eval value:</span>
<span class="hljs-number">120</span>
</code></pre>
<blockquote>
<p><strong>التمرين 5.49:</strong> كبديلٍ عن استخدام حلقة القراءة والتقييم والطباعة الخاصّة بالمُقيِّم صريح التحكّم، صمّم آلة مسجّلاتٍ تُداء حلقة قراءة-تصريف-تنفيذ-طباعة. أي أنّ الآلة ينبغي أن تُشغّل حلقةً تقرأ تعبيرًا، وتُصرّفه، وتُجمّع الشيفرة الناتجة وتنفّذها، وتطبع النتيجة. وهذا سهلُ التشغيل في تهيئتنا المُحاكاة، إذ يمكننا ترتيب أمر نداء الإجراءين <code>compile</code> و<code>assemble</code> بوصفهما «عمليّتَي آلة مسجّلات».</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.50:</strong> استخدم المصرِّف لتصريف المُقيِّم التحاكميّ (metacircular evaluator) الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1">4.1</a> وتشغيل هذا البرنامج باستخدام محاكي آلة المسجّلات. (ولتصريف أكثر من تعريفٍ في المرّة الواحدة، يمكنك حزم التعريفات في <code>begin</code>.) وسيعمل المفسّر الناتج ببطءٍ شديدٍ بسبب مستويات التفسير المتعدّدة، لكنّ جعل جميع التفاصيل تعمل تمرينٌ مفيدٌ للغاية.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.51:</strong> طوّر تنفيذًا بدائيًّا لـScheme في لغة C (أو لغة أخرى منخفضة المستوى من اختيارك) بترجمة المُقيِّم صريح التحكّم الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e4.xhtml#g_t5_002e4">5.4</a> إلى C. ولكي تُشغّل هذه الشيفرة، ستحتاج أيضًا إلى تزويد روتينات تخصيص تخزينٍ مناسبةٍ ودعمٍ آخر لوقت التشغيل.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.52:</strong> كنقيضٍ لـ<a href="#Exercise-5_002e51">التمرين 5.51</a>، عدّل المصرّف ليُصرِّف إجراءات Scheme إلى سلاسل من تعليمات C. صرِّف المُقيِّم الحلقيّ الوسيط (metacircular evaluator) الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1">4.1</a> لتُنتج مفسّرًا لـ Scheme مكتوبًا بلغة C.</p>
</blockquote>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>هذا الافتراض يُخفي جانبًا كبيرًا من التعقيد. فعادةً ما يُخصَّص جزءٌ كبيرٌ من تنفيذ نظام Lisp لجعل عمليّتي القراءة والطباعة تعملان. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn2" class="footnote-item"><p>قد يُقال إنّنا لسنا بحاجةٍ إلى حفظ <code>n</code> القديمة؛ إذ يمكننا، بعد إنقاصها وحلّ المسألة الفرعيّة، أن نزيدها ببساطةٍ فنستعيد القيمة القديمة. ومع أنّ هذه الاستراتيجيّة تنجح مع المضروب (factorial)، فإنّها لا تنجح عمومًا، لأنّ القيمة القديمة لمسجّلٍ لا يمكن دائمًا استخلاصها من القيمة الجديدة. <a href="#fnref2" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn3" class="footnote-item"><p>سنرى في <a href="https://sarabander.github.io/sicp/html/5_002e3.xhtml#g_t5_002e3">5.3</a> كيف نُنفّذ المكدس باستخدام عمليّاتٍ أوّليّةٍ أكثر. <a href="#fnref3" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn4" class="footnote-item"><p>استخدام إجراء <code>receive</code> هنا طريقةٌ لجعل <code>extract-labels</code> يُعيد فعليًّا قيمتين—<code>labels</code> و<code>insts</code>—دون أن نُشكّل صراحةً بنية بيانات مركّبةٍ للاحتفاظ بهما. ثمّة تنفيذٌ بديل يُعيد زوجًا صريحًا من القيم، وهو <code>scheme (define (extract-labels text) (if (null? text) (cons '() '()) (let ((result (extract-labels (cdr text)))) (let ((insts (car result)) (labels (cdr result))) (let ((next-inst (car text))) (if (symbol? next-inst) (cons insts (cons (make-label-entry next-inst insts) labels)) (cons (cons (make-instruction next-inst) insts) labels))))))) </code> <a href="#fnref4" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn5" class="footnote-item"><p>كان بوسعنا تمثيل الذاكرة كقوائمَ من العناصر. لكن زمن الوصول لم يكن ليكون حينها مستقلًّا عن الفهرس، إذ إنّ الوصول إلى العنصر رقم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>n</mi><mi>d</mi><mi>e</mi><mi>f</mi><mi>i</mi><mi>n</mi><mi>e</mi><mi>d</mi></mrow><annotation encoding="application/x-tex">undefined</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal">n</span><span class="mord mathnormal">d</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">in</span><span class="mord mathnormal">e</span><span class="mord mathnormal">d</span></span></span></span> في قائمةٍ يتطلّب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>n</mi><mi>d</mi><mi>e</mi><mi>f</mi><mi>i</mi><mi>n</mi><mi>e</mi><mi>d</mi></mrow><annotation encoding="application/x-tex">undefined</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal">n</span><span class="mord mathnormal">d</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">in</span><span class="mord mathnormal">e</span><span class="mord mathnormal">d</span></span></span></span> عمليّة <code>cdr</code>. <a href="#fnref5" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn6" class="footnote-item"><p>تكاملًا، ينبغي أن نُحدّد عمليّة <code>make-vector</code> تبني المتجهات. لكن في التطبيق الحاضر سنستخدم المتجهات فقط لنمذجة تقسيماتٍ ثابتةٍ من ذاكرة الحاسوب. <a href="#fnref6" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn7" class="footnote-item"><p>هذه هي الفكرة عينها الخاصةّ بـ«البيانات الموسومة (tagged data)» التي أوردناها في <a href="https://sarabander.github.io/sicp/html/Chapter-2.xhtml#Chapter-2">الفصل 2</a> للتعامل مع العمليّات العامّة. لكن هنا تُدرَج أنواع البيانات في مستوى الآلة الأوّليّ بدلًا من بنائها باستخدام القوائم. <a href="#fnref7" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn8" class="footnote-item"><p>يمكن ترميز معلومات النوع بطرائق متنوّعة، حسب تفاصيل الآلة التي سيُنفّذ عليها نظام Lisp. وستعتمد كفاءة تنفيذ برامج Lisp بقوةٍ على مدى حكمة هذا الخيار، لكن من الصعب صياغة قواعد تصميمٍ عامّةٍ للخيارات الجيّدة. وأبسط طريقةٍ لتنفيذ المؤشّرات الموسومة بالنوع هي تخصيص مجموعةٍ ثابتةٍ من البتّات في كلّ مؤشّرٍ لتكون <em>حقل النوع</em> الذي يُرمز نوع البيانات. وتشمل الأسئلة المهمّة الواجب تناولها عند تصميم مثل هذا التمثيل ما يلي: كم بتّةٍ للنوع تلزم؟ وما الحجم الذي يجب أن تبلغه مؤشرات المتجهات؟ ومدى كفاءة استخدام تعليمات الآلة الأوّليّة في التلاعب بحقول نوع المؤشرات؟ وتُوصف الآلات التي تتضمّن عتادًا خاصًّا للتعامل الفعّال مع حقول النوع بأنّها <em>ذات بنيةٍ موسومة (tagged architectures)</em>. <a href="#fnref8" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn9" class="footnote-item"><p>يحدّد هذا القصد في تمثيل الأعداد ما إذا كان يمكن استخدام <code>eq?</code>، الذي يختبر تساوي المؤشرات، لاختبار تساوي الأعداد. فإذا احتوى المؤشّر على العدد نفسه، كانت للأعداد المتساوية المؤشّر نفسه. أمّا إذا احتوى المؤشّر على فهرس موضعٍ يُخزَّن فيه العدد، فلن يكون مضمونًا أن تكون للمتساوي من الأعداد مؤشرات متساوية إلّا إذا حرصنا على ألّا نخزّن العدد نفسه في أكثر من موضعٍ واحد. <a href="#fnref9" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn10" class="footnote-item"><p>هذا أشبه بكتابة عددٍ كتسلسلٍ من الأرقام، إلّا أنّ كلّ «رقم» هنا عددٌ يتراوح بين الصفر وأكبر عددٍ يمكن تخزينه في مؤشّرٍ واحد. <a href="#fnref10" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn11" class="footnote-item"><p>ثمّة طرق أخرى لإيجاد مواضع تخزينٍ حرّة. فيمكننا مثلًا ربط كلّ الأزواج غير المستخدمة بعضها ببعض في <em>قائمةٍ حرّة (free list)</em>. إنّ مواضعنا الحرّة متتالية (وبالتالي يمكن الوصول إليها بزيادة مؤشّرٍ) لأنّنا نستخدم جامع قمامةٍ ضاغطًا، كما سنرى في <a href="#g_t5_002e3_002e2">5.3.2</a>. <a href="#fnref11" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn12" class="footnote-item"><p>هذا هو في الجوهر تنفيذ <code>cons</code> بدلالة <code>set-car!</code> و<code>set-cdr!</code>، على النحو الموصوف في <a href="https://sarabander.github.io/sicp/html/3_002e3.xhtml#g_t3_002e3_002e1">3.3.1</a>. والعمليّة <code>get-new-pair</code> المستخدمة في ذلك التنفيذ تُنجَز هنا بواسطة المؤشّر <code>free</code>. <a href="#fnref12" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn13" class="footnote-item"><p>قد لا يبقى هذا صحيحًا في المستقبل، لأنّ الذاكرات قد تكبر حدًّا يستحيل معه نفاد الذاكرة الحرّة في عمر الحاسوب. ففي السنة نحو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>n</mi><mi>d</mi><mi>e</mi><mi>f</mi><mi>i</mi><mi>n</mi><mi>e</mi><mi>d</mi></mrow><annotation encoding="application/x-tex">undefined</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal">n</span><span class="mord mathnormal">d</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">in</span><span class="mord mathnormal">e</span><span class="mord mathnormal">d</span></span></span></span> ميكروثانية، فلو أنّنا نُنشئ <code>cons</code> مرّةً كلّ ميكروثانية، لأضحى يلزمنا نحو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>n</mi><mi>d</mi><mi>e</mi><mi>f</mi><mi>i</mi><mi>n</mi><mi>e</mi><mi>d</mi></mrow><annotation encoding="application/x-tex">undefined</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal">n</span><span class="mord mathnormal">d</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mord mathnormal">in</span><span class="mord mathnormal">e</span><span class="mord mathnormal">d</span></span></span></span> خليّةٍ من الذاكرة لبناء آلةٍ تعمل ثلاثين سنةً دون أن تنفد ذاكرتها. وتبدو هذه الكميّة من الذاكرة سخيفةً بمعايير اليوم، لكنّها ليست مستحيلةً فيزيائيًّا. ومن جهةٍ أخرى، تصبح المعالجات أسرع فأسرع، وقد يضمّ حاسوب المستقبل أعدادًا كبيرةً من المعالجات تعمل على التوازي على ذاكرةٍ واحدة، فقد يصبح ممكنًا استهلاك الذاكرة أسرع بكثيرٍ ممّا افترضناه. <a href="#fnref13" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn14" class="footnote-item"><p>نفترض هنا أنّ المكدس ممثَّلٌ كقائمةٍ على النحو الموضح في <a href="#g_t5_002e3_002e1">5.3.1</a>، بحيث تكون عناصر المكدس قابلةً للوصول عبر المؤشّر الكائن في مسجّل المكدس. <a href="#fnref14" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn15" class="footnote-item"><p>ابتكر هذه الفكرة مينسكي ونفّذها أوّل مرّة، كجزءٍ من تنفيذ Lisp على آلة PDP-1 في مختبر أبحاث الإلكترونيات في MIT. وطوّرها <a href="https://sarabander.github.io/sicp/html/References.xhtml#Fenichel-and-Yochelson-_00281969_0029">فينيتشيل ويوكيلسون (1969)</a> لاستخدامها في تنفيذ Lisp الخاصّ بنظام المشاركة الزمنيّة Multics. ثمّ طور <a href="https://sarabander.github.io/sicp/html/References.xhtml#Baker-_00281978_0029">بايكر (1978)</a> نسخةً «في الزمن الحقيقي» من الطريقة، لا تتطلّب وقوف الاحتساب أثناء جمع القمامة. وامتدّت فكرة بايكر على يد هيويت وليبرمان ومون (انظر <a href="https://sarabander.github.io/sicp/html/References.xhtml#Lieberman-and-Hewitt-1983">ليبرمان وهيويت 1983</a>) لتستفيد من أنّ بعض البنى أكثر تقلّبًا وبعضها الآخر أكثر ديمومة. وثمّة تقنيّة أخرى شائعة لجمع القمامة هي طريقة <em>الكي والمسح (mark-sweep)</em>. وتتمثّل في تقفّي كلّ البنى القابلة للوصول من مسجّلات الآلة ووسم كلّ زوجٍ نصل إليه. ثمّ نمسح الذاكرة كلّها، وكلّ موضعٍ غير موسومٍ «يُكنس» كانقالًا للقمامة ويُتاح لإعادة الاستخدام. ويمكن العثور على مناقشةٍ كاملةٍ لطريقة الكي والمسح في <a href="https://sarabander.github.io/sicp/html/References.xhtml#Allen-1978">ألين 1978</a>. أمّا خوارزميّة مينسكي-فينيتشيل-يوكيلسون فهي الخوارزميّة السائدة في الأنظمة كبيرة الذاكرة، لأنّها لا تفحص إلّا الجزء المفيد من الذاكرة. وهذا بخلاف الكي والمسح، حيث ينبغي لمرحلة الكنس أن تفحص الذاكرة كلّها. وميزةٌ ثانية لطريقة التوقّف والنسخ أنّها جامع قمامةٍ <em>ضاغط (compacting)</em>. أي أنّ البيانات المفيدة ستنُقل في نهاية مرحلة جمع القمامة إلى مواضع ذاكرةٍ متتالية، مع ضغط كلّ الأزواج النفاية خارجها. وقد يكون هذا اعتبارًا بالغ الأهميّة للأداء في الآلات ذات الذاكرة الافتراضيّة، حيث قد يتطلّب الوصول إلى عناوين ذاكرةٍ متباعدةٍ بعيدًا عمليّاتِ تبديل صفحاتٍ إضافيّة. <a href="#fnref15" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn16" class="footnote-item"><p>لا تتضمّن قائمة المسجّلات هذه المسجّلات التي يستخدمها نظام تخصيص التخزين—<code>root</code> و<code>the-cars</code> و<code>the-cdrs</code> وغيرها من المسجّلات التي ستُعرَّف في هذا القسم. <a href="#fnref16" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn17" class="footnote-item"><p>اصطلح على مصطلح <em>القلب المكسور (broken heart)</em> ديفيد كريسي، الذي كتب جامع قمامةٍ للغة MDL، وهي لهجةٌ من Lisp طُوّرت في MIT في أوائل سبعينيّات القرن العشرين. <a href="#fnref17" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn18" class="footnote-item"><p>يستخدم جامع القمامة المُسَيِّم منخفض المستوى <code>pointer-to-pair?</code> بدلًا من عمليّة بنية القوائم <code>pair?</code>، لأنّه قد توجد في نظامٍ حقيقيّ أمورٌ شتّى تُعامَل معاملة الأزواج لأغراض جمع القمامة. ففي نظامٍ من أنظمة Scheme مطابق لمعيار IEEE، مثلًا، قد يُنفّذ كائن الإجراء كنوعٍ خاصّ من «الزوج» لا يحقّقه المسيّم <code>pair?</code>. ولأغراض المحاكاة، يمكن تنفيذ <code>pointer-to-pair?</code> بدلالة <code>pair?</code>. <a href="#fnref18" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn19" class="footnote-item"><p>انظر <a href="https://sarabander.github.io/sicp/html/References.xhtml#Batali-et-al_002e-1982">باتالي وآخرون 1982</a> لمزيدٍ من المعلومات عن الرقاقة وعن الطريقة التي صُمّمت بها. <a href="#fnref19" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn20" class="footnote-item"><p>في متحكّمنا، يُكتب التوزيع كسلسلةٍ من تعليمتَي <code>test</code> و<code>branch</code>. وبدلًا من ذلك، كان في الإمكان كتابته بأسلوبٍ موجَّهٍ بالبيانات (وكذلك سيكون الأمر في نظامٍ حقيقيّ على الأرجح) لتجنّب الحاجة إلى إجراء اختباراتٍ متسلسلةٍ وتسهيل تعريف أنواع تعبيراتٍ جديدة. ومن المرجّح أنّ آلةً مصمّمةً لتشغيل Lisp تتضمّن تعليمة <code>dispatch-on-type</code> تُنفّذ مثل هذه التوزيعات الموجَّهة بالبيانات بكفاءة. <a href="#fnref20" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn21" class="footnote-item"><p>هذه نقطة مهمّةٌ وإنّما خفيّةٌ في ترجمة الخوارزميّات من لغةٍ إجرائيّة، مثل Lisp، إلى لغة آلات المسجّلات. فبدلًا من حفظ ما يلزم فقط، كان بوسعنا حفظ كلّ المسجّلات (عدا <code>val</code>) قبل كلّ نداءٍ تعاوديّ. ويُسمّى هذا نظامَ المكدس المؤطَّر. وهذا ينجح، لكنّه قد يحفظ مسجّلاتٍ أكثر من اللازم؛ وقد يكون هذا اعتبارًا مهمًّا في نظامٍ تكون فيه عمليّات المكدس مكلفة. كما أنّ حفظ مسجّلاتٍ لن تُحتاج محتوياتها لاحقًا قد يُبقي بياناتٍ لا فائدة منها كان يمكن جمعها كانقالًا، فتتفرّغ مساحتها لإعادة الاستخدام. <a href="#fnref21" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn22" class="footnote-item"><p>نضيف إلى إجراءات بنية البيانات الخاصّة بالمُقيّم الواردة في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e3">4.1.3</a> الإجراءَين التاليين للتلاعب بقوائم المعطيات: <code>scheme (define (empty-arglist) '()) (define (adjoin-arg arg arglist) (append arglist (list arg))) </code> <a href="#fnref22" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn23" class="footnote-item"><p>يُعرَف تحسين معاملة المُعامل الأخير معاملةً خاصّةً باسم <em>التعاوب الذيلي في evlis</em> (انظر <a href="https://sarabander.github.io/sicp/html/References.xhtml#Wand-1980">واند 1980</a>). وكان بوسعنا أن نكون أكفأ قليلًا في حلقة تقييم المعطيات لو جعلنا تقييم المُعامل الأوّل حالةً خاصّةً أيضًا. وهو ما كان سيسمح لنا بتأجيل تهيئة <code>argl</code> حتّى بعد تقييم المُعامل الأوّل، تفاديًا لحفظ <code>argl</code> في هذه الحالة. والمصرّف الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e5.xhtml#g_t5_002e5">5.5</a> يُجري هذا التحسين. (قارن بإجراء <code>construct-arglist</code> الوارد في <a href="https://sarabander.github.io/sicp/html/5_002e5.xhtml#g_t5_002e5_002e3">5.5.3</a>.) <a href="#fnref23" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn24" class="footnote-item"><p>يحدّد ترتيب تقييم المُعاملات في المُقيّم الحلقيّ الوسيط بترتيب تقييم معطيات <code>cons</code> في الإجراء <code>list-of-values</code> الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e1">4.1.1</a> (انظر <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#Exercise-4_002e1">التمرين 4.1</a>). <a href="#fnref24" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn25" class="footnote-item"><p>رأينا في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1">5.1</a> كيف نُنفّذ عمليّةً كهذه بآلة مسجّلاتٍ لا مكدس لها؛ إذ كانت حالة العمليّة تُخزَّن في مجموعةٍ ثابتةٍ من المسجّلات. <a href="#fnref25" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn26" class="footnote-item"><p>هذا التنفيذ للتعاوب الذيلي في <code>ev-sequence</code> نوعٌ من تقنيّة تحسينٍ معروفةٍ يستخدمها كثيرٌ من المصرّفات. فعند تصريف إجراءٍ ينتهي بنداء إجراء، يمكن استبدال النداء بقفزةٍ إلى نقطة دخول الإجراء المندىّ. وبناء هذه الاستراتيجيّة في المفسّر، كما فعلنا في هذا القسم، يُوفّر التحسين بصورةٍ موحّدةٍ في اللغة كلّها. <a href="#fnref26" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn27" class="footnote-item"><p>يمكننا تعريف <code>no-more-exps?</code> كما يلي: <code>scheme (define (no-more-exps? seq) (null? seq)) </code> <a href="#fnref27" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn28" class="footnote-item"><p>هذا ليس غشًّا حقًّا. ففي تنفيذٍ فعليٍّ مبنيٍّ من الصفر، كنّا سنستخدم مُقيّمنا ذا المتحكّم الصريح لتفسير برنامج Scheme يُجري تحويلاتٍ على مستوى المصدر، مثل <code>cond-&gt;if</code>، في مرحلة صياغةٍ تجري قبل التنفيذ. <a href="#fnref28" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn29" class="footnote-item"><p>نفترض هنا أنّ <code>read</code> ومختلف عمليّات الطباعة متاحةٌ كعمليّات آلةٍ أوّليّة، وهذا مفيدٌ لمحاكاتنا، لكنّه غير واقعيّ إطلاقًا في الممارسة. فهذه في الحقيقة عمليّات شديدة التعقيد. وفي الممارسة، كانت ستُنفّذ باستخدام عمليّات إدخالٍ وإخراجٍ منخفضة المستوى، مثل نقل محارف مفردةٍ إلى جهازٍ ومنه. ولدعم عمليّة <code>get-global-environment</code> نُعرّف <code>scheme (define the-global-environment (setup-environment)) (define (get-global-environment) the-global-environment) </code> <a href="#fnref29" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn30" class="footnote-item"><p>ثمّة أخطاء أخرى نودّ أن يتعامل معها المفسّر، لكنّها ليست بهذه البساطة. انظر <a href="#Exercise-5_002e30">التمرين 5.30</a>. <a href="#fnref30" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn31" class="footnote-item"><p>كان بوسعنا إجراء تهيئة المكدس بعد الأخطاء فقط، لكنّ إجراءها في حلقة المُشغّل سيكون مريحًا لمراقبة أداء المُقيّم، كما سنُبيّن أدناه. <a href="#fnref31" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn32" class="footnote-item"><p>للأسفّ، هذا هو الحال الطبيعيّ في أنظمة اللغات التقليديّة المبنيّة على المصرّفات، مثل C. ففي UNIX(tm) «يفرغ النظام لبَّه»، وفي DOS/Windows(tm) يصير كسولًا. أمّا Macintosh(tm) فيعرض صورة قنبلةٍ منفجرةٍ ويعرض عليك فرصة إعادة تشغيل الحاسوب—إن كنت محظوظًا. <a href="#fnref32" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn33" class="footnote-item"><p>هذا بيانٌ نظريّ. فنحن لا ندّعي أنّ مسارات البيانات الخاصّة بالمُقيّم مجموعةٌ مناسبةٌ أو فعّالةٌ بشكلٍ خاصّ لتكون مسارات حاسوبٍ عامّ الغرض. فهي مثلًا غير جيّدةٍ لتنفيذ حسابات النقاط العائمة عالية الأداء أو الحسابات التي تتلاعب بكثافةٍ بمتجهات البتّات. <a href="#fnref33" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn34" class="footnote-item"><p>في الواقع، بوسع الآلة التي تُشغّل الشيفرة المصرّفة أن تكون أبسط من آلة المفسّر، لأنّنا لن نستخدم المسجّلين <code>exp</code> و<code>unev</code>. فقد كان المفسّر يستخدمهما للاحتفاظ بقطعٍ من التعابير غير المُقيَّمة. أمّا مع المصرّف، فهذه التعابير تُبنى في الشيفرة المصرّفة التي ستُشغّلها آلة المسجّلات. ولغير هذا السبب، لا نحتاج إلى عمليّات الآلة التي تتعامل مع صياغة التعابير. لكنّ الشيفرة المصرّفة ستستخدم بعض عمليّات آلةٍ إضافيّة (لتمثيل كائنات الإجراءات المصرّفة) لم تظهر في آلة المُقيّم ذي المتحكّم الصريح. <a href="#fnref34" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn35" class="footnote-item"><p>لكن لاحظ أنّ مصرّفنا برنامج Scheme، وأنّ إجراءات الصياغة التي يستخدمها للتلاعب بالتعابير هي إجراءات Scheme الفعليّة المستخدمة مع المُقيّم الحلقيّ الوسيط. أمّا في المُقيّم ذي المتحكّم الصريح، فقد افترضنا أنّ عمليّات صياغةٍ مكافئةً متاحةٌ كعمليّاتٍ لآلة المسجّلات. (وبالطبع، عندما حاكينا آلة المسجّلات في Scheme، استخدمنا إجراءات Scheme الفعليّة في محاكاة آلة المسجّلات خاصّتنا.) <a href="#fnref35" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn36" class="footnote-item"><p>يستخدم هذا الإجراء ميزةً من Lisp تُسمّى <em>الاقتباس الخلفيّ (backquote)</em> (أو <em>شبه الاقتباس (quasiquote)</em>) وهي مفيدةٌ لبناء القوائم. فتسبيق قائمةٍ برمز الاقتباس الخلفيّ أشبه باقتباسها، إلّا أنّ أيّ شيءٍ في القائمة يُعلَّم بفاصلةٍ يُقيَّم. فمثلًا، إذا كانت قيمة <code>linkage</code> هي الرمز <code>branch25</code>، فإنّ التعبير <code>scheme \`((goto (label ,linkage))) </code> <a href="#fnref36" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn37" class="footnote-item"><p>لا يمكننا ببساطةٍ استخدام الأسماء <code>true-branch</code> و<code>false-branch</code> و<code>after-if</code> كما وردت أعلاه، لأنّ البرنامج قد يحوي أكثر من <code>if</code> واحد. فالمصرّف يستخدم الإجراء <code>make-label</code> لتوليد الأسماء. و<code>Make-label</code> يأخذ رمزًا كمعطىً ويُعيد رمزًا جديدًا يبدأ بالرمز المعطى. فمثلًا، كانت نداءات <code>(make-label 'a)</code> المتتالية تُعيد <code>a1</code> و<code>a2</code> وهكذا. ويمكن تنفيذ <code>Make-label</code> على نحوٍ يشبه توليد أسماء المتغيّرات الفريدة في لغة الاستعلام، كما يلي: <code>scheme (define label-counter 0) (define (new-label-number) (set! label-counter (+ 1 label-counter)) label-counter) (define (make-label name) (string-&gt;symbol (string-append (symbol-&gt;string name) (number-&gt;string (new-label-number))))) </code> <a href="#fnref37" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn38" class="footnote-item"><p>نحتاج إلى عمليّات آلةٍ لتنفيذ بنية بياناتٍ لتمثيل الإجراءات المصرّفة، تقابل البنيّة الخاصّة بالإجراءات المركّبة الموصوفة في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e3">4.1.3</a>: <code>scheme (define (make-compiled-procedure entry env) (list 'compiled-procedure entry env)) (define (compiled-procedure? proc) (tagged-list? proc 'compiled-procedure)) (define (compiled-procedure-entry c-proc) (cadr c-proc)) (define (compiled-procedure-env c-proc) (caddr c-proc)) </code> <a href="#fnref38" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn39" class="footnote-item"><p>في الحقيقة، نُشير إلى خطأٍ عندما لا يكون الهدف <code>val</code> والوصلة <code>return</code>، إذ إنّ المكان الوحيد الذي نطلب فيه وصلات <code>return</code> هو تصريف الإجراءات، واصطلاحنا أنّ الإجراءات تُعيد قيمها في <code>val</code>. <a href="#fnref39" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn40" class="footnote-item"><p>قد يبدو جعلُ مصرّفٍ يُنتج شيفرةً تعاوديّةً ذيليًّا فكرةً مباشرة. لكنّ معظم مصرّفات اللغات الشائعة، ومنها C وPascal، لا تفعل ذلك، ولذلك لا تستطيع هذه اللغات تمثيل العمليّات التكراريّة بالنداء الإجرائيّ وحده. وتكمُن صعوبة التعاوب الذيلي في هذه اللغات في أنّ تنفيذها تستخدم المكدس لتخزين معطيات الإجراءات ومتغيّراتها المحليّة فضلًا عن عناوين العودة. أمّا تنفيذات Scheme الموضحة في هذا الكتاب فتخزّن المعطيات والمتغيّرات في ذاكرةٍ تُجمَّع كانقالًا. والسبب في استخدام المكدس للمتغيّرات والمعطيات هو تفادي الحاجة إلى جمع القمامة في لغاتٍ لما كانت تتطلّبه لولا ذلك، ويُعتقد عمومًا أنّه أكفّ. وتستطيع مصرّفات Lisp المتطوّرة، في الواقع، استخدام المكدس للمعطيات دون أن تُفسد التعاوب الذيليّ. (انظر <a href="https://sarabander.github.io/sicp/html/References.xhtml#Hanson-1990">هانسون 1990</a> لوصفٍ له.) ثمّة جدلٌ أيضًا حول ما إذا كان تخصيص المكدس أكفّ فعلًا من جمع القمامة في المقام الأوّل، لكنّ التفاصيل يبدو أنّها مرتهنةٌ بدقائق دقيقة في بنية الحاسوب. (انظر <a href="https://sarabander.github.io/sicp/html/References.xhtml#Appel-1987">آبل 1987</a> و<a href="https://sarabander.github.io/sicp/html/References.xhtml#Miller-and-Rozas-1994">ميلر وروزاس 1994</a> لرأيين متعارضين في هذه المسألة.) <a href="#fnref40" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn41" class="footnote-item"><p>المتغيّر <code>all-regs</code> مربوطٌ بأسماء كلّ المسجّلات: <code>scheme (define all-regs '(env proc val argl continue)) </code> <a href="#fnref41" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn42" class="footnote-item"><p>لاحظ أنّ <code>preserving</code> ينادي <code>append</code> بثلاثة معطيات. ومع أنّ تعريف <code>append</code> المعروض في هذا الكتاب لا يقبل إلّا معطيين، فإنّ Scheme يوفّر قياسيًّا إجراء <code>append</code> يأخذ عددًا اعتباطيًّا من المعطيات. <a href="#fnref42" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn43" class="footnote-item"><p>لقد استخدمنا الرمز <code>+</code> نفسه هنا للدلالة على كلٍّ من إجراء لغة المصدر وعمليّة الآلة. وبشكلٍ عام، لن توجد مقابلةٌ واحدٌ بواحدٍ بين أوّليّات لغة المصدر وأوّليّات الآلة. <a href="#fnref43" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn44" class="footnote-item"><p>جعل الأوّليّات كلماتٍ محجوزة هو فكرةٌ سيّئةٌ عمومًا، إذ لا يستطيع المستخدم حينها إعادة ربط هذه الأسماء بإجراءاتٍ مختلفة. والأسوأ من ذلك، أنّ إضافة كلماتٍ محجوزةً إلى مصرّفٍ قيد الاستخدام ستجعل البرامج الموجودة التي تُعرِّف إجراءاتٍ بهذه الأسماء تتوقّف عن العمل. انظر <a href="#Exercise-5_002e44">التمرين 5.44</a> لأفكارٍ عن كيفيّة تجنّب هذه المشكلة. <a href="#fnref44" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn45" class="footnote-item"><p>لا يصحّ هذا إذا سمحنا بتعريفاتٍ داخليّة، إلّا إذا استخرجناه بالمسح. انظر <a href="#Exercise-5_002e43">التمرين 5.43</a>. <a href="#fnref45" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn46" class="footnote-item"><p>هذا هو التعديل المطلوب على البحث عن المتغيّرات إذا نُفّذت طريقة الاستخراج لإزالة التعريفات الداخليّة (<a href="#Exercise-5_002e43">التمرين 5.43</a>). وسنحتاج إلى إزالة هذه التعريفات لكي تعمل العنونة المعجميّة. <a href="#fnref46" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn47" class="footnote-item"><p>لا يمكن استخدام العناوين المعجميّة للوصول إلى المتغيّرات في البيئة العامّة، لأنّ هذه الأسماء يمكن تعريفها وإعادة تعريفها تفاعليًّا في أيّ وقت. فمع استخراج التعريفات الداخليّة، كما في <a href="#Exercise-5_002e43">التمرين 5.43</a>، تكون التعريفات الوحيدة التي يراها المصرّف هي التعريفات على المستوى الأعلى، وهي التي تعمل على البيئة العامّة. ولا يتسبّب تصريف تعريفٍ في إدخال الاسم المعرَّف في بيئة وقت التصريف. <a href="#fnref47" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn48" class="footnote-item"><p>وبالطبع، الإجراءات المصرّفة كالإجراءات المُفسَّرة مركّبةٌ (غير أوّليّة). واتّفاقًا مع المصطلحات المستخدمة في المُقيّم ذي المتحكّم الصريح، سنستخدم في هذا القسم «مركّب» بمعنى مُفسَّر (مقابلًا لمصرَّف). <a href="#fnref48" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn49" class="footnote-item"><p>وحيث إنّ آلة المُقيّم تبدأ الآن بـ<code>branch</code>، ينبغي لنا دائمًا تهيئة المسجّل <code>flag</code> قبل تشغيل آلة المُقيّم. ولتشغيل الآلة على حلقة القراءة-التقييم-الطباعة المعتادة، كان بوسعنا استخدام <code>scheme (define (start-eceval) (set! the-global-environment (setup-environment)) (set-register-contents! eceval 'flag false) (start eceval)) </code> <a href="#fnref49" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn50" class="footnote-item"><p>وبما أنّ الإجراء المصرّف كائنٌ قد يحاول النظام طباعته، نُعدّل أيضًا عمليّة طباعة النظام <code>user-print</code> (الواردة في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e4">4.1.4</a>) حتّى لا تحاول طباعة مكوّنات الإجراء المصرّف: <code>scheme (define (user-print object) (cond ((compound-procedure? object) (display (list 'compound-procedure (procedure-parameters object) (procedure-body object) '))) ((compiled-procedure? object) (display ')) (else (display object)))) </code> <a href="#fnref50" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn51" class="footnote-item"><p>وبوسعنا أن نفعل أفضل من ذلك بتمديد المصرّف للسماح للشيفرة المصرّفة بنداء الإجراءات المُفسَّرة. انظر <a href="#Exercise-5_002e47">التمرين 5.47</a>. <a href="#fnref51" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn52" class="footnote-item"><p>مستقلًّا عن استراتيجيّة التنفيذ، نتحمّل عبئًا إضافيًّا كبيرًا إذا أصرَرنا على كشف الأخطاء التي تقع أثناء تنفيذ برنامج المستخدم والإشارة إليها، بدلًا من السّماح لها بإسقاط النظام أو إنتاج إجابات خاطئة. فمثلًا، يمكن كشف مرجع مصفوفةٍ خارج الحدود بالتحقّق من صلاحيّة المرجع قبل إجرائه. غير أنّ عبء التحقّق قد يبلغ أضعاف كلفة مرجع المصفوفة نفسه، وعلى المبرمج أن يوزن بين السرعة والأمان في تحديد مدى رغبته في مثل هذا التحقّق. وينبغي لمصرّفٍ جيّدٍ أن يكون قادرًا على إنتاج شيفرةٍ تتضمّن مثل هذه التحقّقات، وأن يتجنّب التحقّقات الزائدة، وأن يسمح للمبرمجين بالتحكّم في مدى فحوص الأخطاء ونوعها في الشيفرة المصرّفة. أمّا مصرّفات اللغات الشائعة، مثل C وC++، فلا تُدخل إلّا القليل جدًّا من عمليّات التحقّق من الأخطاء في الشيفرة العاملة، حتّى تجري الأمور بأسرع ما يمكن. ونتيجةً لذلك، يقع على عاتق المبرمجين تدبير التحقّق من الأخطاء صراحةً. ومؤسفٌ أنّ الناس يغفلون عن ذلك كثيرًا، حتّى في التطبيقات الحرجة حيث لا يكون هناك قيدٌ على السرعة. فبرامجهم تعيش حياةً سريعةً وخطرة. فمثلًا، استغلّت «الدودة» (Worm) الشهيرة التي شلّت الإنترنت عام 1988 فشل نظام التشغيل UNIX(tm) في التحقّق من أنّ مخزَن الإدخال قد فاض في عفريت finger. (انظر <a href="https://sarabander.github.io/sicp/html/References.xhtml#Spafford-1989">سبافورد 1989</a>.) <a href="#fnref52" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn53" class="footnote-item"><p>وبالطبع، مع كلٍّ من استراتيجيّة التفسير واستراتيجيّة التصريف، يتحتّم علينا أيضًا أن نُنفّذ للآلة الجديدة تخصيص التخزين، والإدخال والإخراج، وكلّ العمليّات المتنوّعة التي أخذناها كـ«أوّليّات» في مناقشتنا للمُقيّم والمصرّف. وإحدى استراتيجيّات تقليل العمل هنا هي كتابة أكبر عددٍ ممكن من هذه العمليّات في Lisp ثمّ تصريفها للآلة الجديدة. وفي النهاية، يندرج كلّ شيءٍ في نواةٍ صغيرة (مثل جمع القمامة وآليّة تطبيق أوّليّات الآلة الفعليّة) تُكتب يدويًّا للآلة الجديدة. <a href="#fnref53" class="footnote-backref">↩︎</a></p>
</li>
<li id="fn54" class="footnote-item"><p>تؤدّي هذه الاستراتيجيّة إلى اختباراتٍ ممتعةٍ لصحّة المصرّف، مثل التحقّق ممّا إذا كان تصريف برنامجٍ على الآلة الجديدة، باستخدام المصرّف المصرَّف، مطابقًا لتصريف البرنامج على نظام Lisp الأصليّ. وتتبّع مصدر الفروقات أمرٌ ممتعٌ لكنّه مُحبطٌ غالبًا، لأنّ النتائج حسّاسةٌ للغاية حتّى لأدقّ التفاصيل. <a href="#fnref54" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
`,t={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,p as headings,c as html,e as slug,l as title};
