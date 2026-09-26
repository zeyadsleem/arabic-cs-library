const s="500-lines",t="ocr",n="Optical Character Recognition (OCR)",a="index",l="التعرّف الضوئي على الحروف (OCR)",p=[{depth:2,id:"مقدمة",text:"مقدّمة"},{depth:2,id:"ما-هو-الذكاء-الاصطناعي",text:"ما هو الذكاء الاصطناعي؟"},{depth:2,id:"الشبكات-العصبية-الاصطناعية",text:"الشبكات العصبية الاصطناعية"},{depth:3,id:"ما-هي-الشبكات-العصبية-الاصطناعية",text:"ما هي الشبكات العصبية الاصطناعية؟"},{depth:3,id:"كيف-نستخدم-الشبكات-العصبية-الاصطناعية",text:"كيف نستخدم الشبكات العصبية الاصطناعية؟"},{depth:2,id:"قرارات-التصميم-في-نظام-تعرف-ضوئي-بسيط",text:"قرارات التصميم في نظام تعرّف ضوئي بسيط"},{depth:3,id:"واجهة-بسيطة-ocrhtml",text:"واجهة بسيطة (ocr.html)"},{depth:3,id:"عميل-التعرف-الضوئي-على-الحروف-ocrjs",text:"عميل التعرّف الضوئي على الحروف (ocr.js)"},{depth:3,id:"خادم-serverpy",text:"خادم (server.py)"},{depth:3,id:"تصميم-شبكة-عصبية-أمامية-التقدم-neuralnetworkdesignpy",text:"تصميم شبكة عصبية أمامية التقدّم (neural_network_design.py)"},{depth:3,id:"الوظائف-الأساسية-لنظام-التعرف-الضوئي-على-الحروف",text:"الوظائف الأساسية لنظام التعرّف الضوئي على الحروف"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],e=`<h2 id="مقدمة">مقدّمة</h2>
<p>ماذا لو كان حاسوبك قادرًا على غسل صحونك، وغسل ملابسك، وطهي العشاء لك،
وتنظيف منزلك؟ وأعتقد أن معظم الناس سيكونون سعداء
بالحصول على يدٍ تساعدهم! لكن ما الذي يلزم كي يصبح الحاسوب قادرًا على
أداء هذه المهام بالطريقة نفسها التي يؤديها بها البشر؟</p>
<p>اقترح عالم الحاسوب الشهير آلان تورينغ اختبار تورينغ بوصفه وسيلة
لتحديد ما إذا كانت الآلة يمكن أن تملك ذكاءً لا يمكن تمييزه عن ذكاء
الإنسان. ويعني الاختبار أن يطرح إنسان أسئلة على كائنين مخفيين،
أحدهما إنسان والآخر آلة، فيحاول تحديد أيّهما هو الآخر.
فإذا عجز المحاوِر عن تحديد الآلة، فإن الآلة تُعدّ
متمتعّة الذكاء البشري.</p>
<p>ولرغم أن هنالك جدلًا كثيرًا حول ما إذا كان اختبار تورينغ تقييمًا
صالحًا للذكاء، وحول ما إذا كان بإمكاننا بناء آلات ذكية
كهذه، فلا شكّ في وجود آلات تمتلك قدرًا من الذكاء
أصلًا. وهناك حاليًا برمجيات تساعد الروبوتات على التنقّل في مكتب
وأداء مهام صغيرة، أو تساعد من يعانون من الزهايمر. ومن الأمثلة
الأكثر شيوعًا على الذكاء الاصطناعي (A.I.) طريقة Google في تقدير
ما تبحث عنه حين تبحث عن كلمات مفتاحية، أو طريقة
Facebook في تحديد ما تضعه في موجز الأخبار لديك.</p>
<p>من التطبيقات المعروفة جيدًا للذكاء الاصطناعي هو التعرّف الضوئي على الحروف
(optical character recognition، OCR). ونظام التعرّف الضوئي على الحروف
هو قطعة برمجية تستطيع تلقّي صور للحروف المكتوبة
بخط اليد كمدخلات وتفسّرها إلى نص قابل للقراءة آليًا. ورغم أنك
قد لا تفكر مرتين حين تُودِع شيكًا مكتوبًا بخط اليد في آلة صرّاف مصرفية،
فهناك عمل مثير للاهتمام يجري في الخلفية. وسيفحص هذا الفصل
مثالًا عمليًا لنظام تعرّف ضوئي بسيط يتعرّف على الأرقام العشرية
باستخدام شبكة عصبية اصطناعية (Artificial Neural Network، ANN). لكن لنضبط أولًا سياقًا أكبر.</p>
<h2 id="ما-هو-الذكاء-الاصطناعي">ما هو الذكاء الاصطناعي؟</h2>
<p>\\label{sec.ocr.ai}
بينما يبدو تعريف تورينغ للذكاء معقولًا، فإن ما يُعدّ ذكاءً هو في
الأساس جدلٌ فلسفي.
غير أن علماء الحاسوب صنّفوا بعض أنواع الأنظمة
والخوارزميات في فروع من الذكاء الاصطناعي. ويُستخدم كل فرع لحلّ مجموعة
معيّنة من المسائل. وهذه الفروع تشمل الأمثلة التالية، فضلًا عن <a href="http://www-formal.stanford.edu/jmc/whatisai/node2.html">الكثير
منها</a>:</p>
<ul>
<li>الاستدلال المنطقي والاستدلال الاحتمالي بالاستناد إلى معرفة
مسبقة المعرَّفة عن عالم ما. فمثلًا، يمكن لـ<a href="http://www.cs.princeton.edu/courses/archive/fall07/cos436/HIDDEN/Knapp/fuzzy004.htm">الاستدلال
الغامض</a>
أن يساعد جهازَ تحكّم في الحرارة على معرفة متى يشغّل المكيّف
حين يكتشف أن الحرارة مرتفعة والجو رطبًا</li>
<li>البحث الاستدلالي. فمثلًا يمكن استخدام البحث للعثور على أفضل
حركة تالية ممكنة في لعبة شطرنج، عبر البحث في جميع الحركات
الممكنة واختيار الحركة التي تحسّن مركزك إلى أقصى حدّ</li>
<li>تعلّم الآلة (machine learning، ML) مع نماذج تغذية راجعة. فمثلًا: مسائل التعرّف على الأنماط
مثل التعرّف الضوئي على الحروف.</li>
</ul>
<p>بوجه عام، ينطوي تعلّم الآلة على استخدام مجموعات بيانات كبيرة لتدريب نظام على
التعرّف على الأنماط. وقد تكون مجموعات بيانات التدريب موسومة، أي أن مُخرجات النظام
المتوقعة محدّدة لمُدخلات معيّنة، أو غير موسومة أي أن المُخرجات المتوقعة
غير محدّدة. وتُسمّى الخوارزميات التي تدرّب الأنظمة ببيانات غير موسومة
خوارزميات <em>بلا إشراف</em>، وتُسمّى التي تدرّب ببيانات موسومة
خوارزميات <em>بإشراف</em>. وهناك خوارزميات وتقنيات تعلّم آلة كثيرة
لإنشاء أنظمة تعرّف ضوئي على الحروف، ومنها الشبكات العصبية الاصطناعية إحدى المقاربات.</p>
<h2 id="الشبكات-العصبية-الاصطناعية">الشبكات العصبية الاصطناعية</h2>
<h3 id="ما-هي-الشبكات-العصبية-الاصطناعية">ما هي الشبكات العصبية الاصطناعية؟</h3>
<p>\\label{sec.ocr.ann}
الشبكة العصبية الاصطناعية هي بنية تتألّف من عقد مترابطة تتواصل
مع بعضها. وهي مستوحاة بنيتها ووظائفها من الشبكات العصبية
الموجودة في دماغ حيوي. و<a href="http://www.nbb.cornell.edu/neurobio/linster/BioNB420/hebb.pdf">نظرية
هب</a>
تشرح كيف يمكن لهذه الشبكات أن تتعلّم التعرّف على الأنماط عبر تغيير بنيتها
وقوة روابطها ماديًا. وعلى نحو مماثل، فإن الشبكة العصبية الاصطناعية النموذجية
(المبيَّنة في \\aosafigref{500l.ocr.ann}) تحتوي روابط بين العقد لها أوزان
تُحدَّث مع تعلّم الشبكة. أما العقد الموسومة بـ«+1» فتُسمّى
<em>انحيازات</em>. أما العمود الأزرق الأيسر من العقد فهو <em>عقد دخل</em>، والعمود
الأوسط يحتوي <em>عقدًا مخفية</em>، والعمود الأيمن يحتوي <em>عقد
خرج</em>. وقد يكون هناك أعمدة كثيرة من العقد المخفية، تُعرَف بـ_الطبقات المخفية_.</p>
<p>\\aosafigure[360pt]/images/500-lines/ocr-0-ann.webp{شبكة عصبية اصطناعية}{500l.ocr.ann}</p>
<p>تمثّل القيم داخل جميع العقد الدائرية في \\aosafigref{500l.ocr.ann}
مُخرجات العقد. فإذا سمّينا مُخرج العقد رقم $n$ من أعلى
الطبقة $L$ بـ$n(L)$، وسمّينا الربط بين العقد رقم $i$ في
الطبقة $L$ والعقدة رقم $j$ في الطبقة $L+1$ بـ$w^{(L)}_ji$، فإن مُخرج
العقدة $a^{(2)}_2$ هو:</p>
<p>$$
a^{(2)}<em>2 = f(w^{(1)}</em>{21}x_1 + w^{(1)}<em>{22}x_2 + b^{(1)}</em>{2})
$$</p>
<p>حيث تُعرَف $f(.)$ بأنها <em>دالة التفعيل</em> (activation function) و$b$ هي <em>الانحياز</em>. ودالة
التفعيل هي صانعة القرار بشأن نوع المُخرج الذي تملكه العقدة.
والانحياز عقدة إضافية ذات مُخرج ثابت يساوي 1 يمكن إضافتها إلى
شبكة عصبية اصطناعية لتحسين دقّتها. وسنرى مزيدًا من التفاصيل حول كليهما في
\\aosasecref{sec.ocr.feedforward}.</p>
<p>يُسمّى هذا النوع من بنية الشبكة <em>شبكة عصبية أمامية التقدّم</em> (feedforward) لأن
لا توجد دورات في الشبكة. أما الشبكات العصبية الاصطناعية التي تتغذّى مخارج عقدها
على مداخلها فتُسمّى الشبكات العصبية الدورية. وهناك خوارزميات كثيرة
يمكن تطبيقها لتدريب الشبكات العصبية الاصطناعية الأمامية؛ وإحدى الخوارزميات الشائعة
تُسمّى <em>الانتشار العكسي</em> (backpropagation). وسيستخدم نظام التعرّف الضوئي على الحروف الذي
سننفّذه في هذا الفصل الانتشار العكسي.</p>
<h3 id="كيف-نستخدم-الشبكات-العصبية-الاصطناعية">كيف نستخدم الشبكات العصبية الاصطناعية؟</h3>
<p>كما في معظم مقاربات تعلّم الآلة الأخرى، تتمثل الخطوة الأولى لاستخدام الانتشار العكسي في
تحديد كيفية تحويل مشكلتنا أو تقليصها إلى مشكلة يمكن أن تحلّها
شبكة عصبية اصطناعية. وبعبارة أخرى، كيف يمكننا التلاعب ببيانات مُدخلاتنا حتى نتمكّن من إدخالها
في الشبكة العصبية الاصطناعية؟ وفي حالة نظام التعرّف الضوئي على الحروف، يمكننا استخدام مواضع
البكسلات الخاصة برقم معيّن كمدخلات. ومن المفيد الإشارة إلى أن اختيار صيغة
المُدخلات غالبًا ما ليس بهذه البساطة. فلو كنّا نحلل صورًا كبيرة
للتعرّف على الأشكال فيها، مثلًا، لربما احتجنا إلى معالجة الصورة مسبقًا
للتعرّف على محيطاتها. وتكون تلك المحيطات هي المُدخلات.</p>
<p>ومتى اتّخذنا قرار بشأن صيغة مُدخلاتنا، فما التالي؟ وبما أن الانتشار العكسي
خوارزمية بإشراف، فستحتاج إلى التدريب ببيانات موسومة، كما
ذُكر في \\aosasecref{sec.ocr.ai}. وعليه، حين نمرّر مواضع البكسلات كمُدخلات تدريب،
فيجب أن نمرّر الرقم المرتبط بها أيضًا. وهذا يعني أننا علينا أن نبحث عن
مجموعة بيانات كبيرة من الأرقام المرسومة وقيمها المرتبطة.</p>
<p>الخطوة التالية هي تقسيم مجموعة البيانات إلى مجموعة تدريب ومجموعة تحقّق.
تُستخدم بيانات التدريب لتشغيل خوارزمية الانتشار العكسي وضبط
أوزان الشبكة العصبية الاصطناعية. وتُستخدم بيانات التحقّق لإجراء التنبؤات باستخدام
الشبكة المدرَّبة وحساب دقّتها. ولو كنا نقارن أداء الانتشار العكسي
بخوارزمية أخرى على بياناتنا، لسنا <a href="http://www-group.slac.stanford.edu/sluo/Lectures/stat_lecture_files/sluo2006lec7.pdf">نقسم
البيانات</a>
إلى 50% للتدريب و25% لمقارنة أداء الخوارزميتين
(مجموعة التحقّق) و25% الأخيرة لاختبار دقّة الخوارزمية المختارة
(مجموعة الاختبار). ولأننا لا نقارن خوارزميات، يمكننا تجميع إحدى مجموعتَي
الـ25% كجزء من مجموعة التدريب واستخدام 75% من البيانات لتدريب
الشبكة و25% للتحقّق من أنها دُرِّبت جيدًا.</p>
<p>الغرض من تحديد دقّة الشبكة العصبية الاصطناعية twofold. أولًا، هو
تجنّب مشكلة <em>فرط التخصيص</em> (overfitting). ويحدث فرط التخصيص عندما تكون دقّة الشبكة
في التنبؤ بمجموعة التدريب أعلى بكثير من دقّتها في مجموعة التحقّق.
ويخبرنا فرط التخصيص بأن بيانات التدريب المختارة لا تعمّم جيدًا
بما يكفي وتحتاج إلى تحسين. ثانيًا، واختبار دقّة عدة أعداد مختلفة
من الطبقات المخفية والعقد المخفية يساعد في تصميم الحجم
الأمثل للشبكة العصبية الاصطناعية. وسيكون الحجم الأمثل للشبكة العصبية الاصطناعية
كافيًا من العقد والطبقات المخفية لإجراء تنبؤات دقيقة، وفي الوقت نفسه
أقل عدد ممكن من العقد والروابط لتقليل العبء الحسابي الذي قد يُبطئ التدريب والتنبؤ. وبعد
أن يتقرّر الحجم الأمثل وتُدرَّب الشبكة، تكون جاهزة
لإجراء التنبؤات!</p>
<h2 id="قرارات-التصميم-في-نظام-تعرف-ضوئي-بسيط">قرارات التصميم في نظام تعرّف ضوئي بسيط</h2>
<p>\\label{sec.ocr.decisions}
في الفقرات الماضية راجعنا بعض أساسيات الشبكات العصبية الاصطناعية
الأمامية التقدّم وكيفية استخدامها. والآن حان الوقت نتحدث عن كيفية
بناء نظام تعرّف ضوئي على الحروف.</p>
<p>أولًا، علينا أن نقرّر ما نريد أن يكون نظامنا قادرًا على فعله. ولإبقاء
الأمور بسيطة، لنسمح للمستخدمين برسم رقم واحد فقط وأن يتمكّنوا من تدريب
نظام التعرّف الضوئي على الحروف بهذا الرقم المرسوم أو أن يطلبوا من النظام التنبؤ
بما هو عليه الرقم المرسوم. وبينما يمكن أن يعمل نظام تعرّف ضوئي محليًا على جهاز واحد،
فإن إعدادًا من بنية عميل-خادم يمنح مرونة أكبر بكثير. فهو يجعل
التدريب التشاركي للشبكة العصبية الاصطناعية ممكنًا ويسمح للخوادم القوية بالتعامل مع
الحسابات المكثّفة.</p>
<p>سيتكوّن نظام التعرّف الضوئي على الحروف لدينا من خمسة مكونات رئيسية، موزّعة
على خمسة ملفات. وستكون:</p>
<ul>
<li>عميل (<code>ocr.js</code>)</li>
<li>خادم (<code>server.py</code>)</li>
<li>واجهة مستخدم بسيطة (<code>ocr.html</code>)</li>
<li>شبكة عصبية اصطناعية تُدرَّب بالانتشار العكسي (<code>ocr.py</code>)</li>
<li>نصّ تصميم الشبكة العصبية الاصطناعية (<code>neural_network_design.py</code>)</li>
</ul>
<p>ستكون واجهة المستخدم بسيطة: لوحة رسم لرسوم الأرقام عليها، وأزرار
لإمّا تدريب الشبكة العصبية الاصطناعية أو طلب تنبؤ. وسيجمع العميل الرقم
المرسوم، ويحوّله إلى مصفوفة، ويمرّره إلى الخادم ليُعالَج
إمّا كعينة تدريب أو كطلب تنبؤ. وسيكتفي الخادم بتوجيه
طلب التدريب أو التنبؤ عبر إجراء استدعاءات واجهة برمجية إلى وحدة الشبكة العصبية الاصطناعية.
وستدرّب وحدة الشبكة العصبية الاصطناعية الشبكة بمجموعة بيانات قائمة عند تهيئتها
الأولى. ثم ستحفظ أوزان الشبكة العصبية الاصطناعية في ملف وتعيد تحميلها عند
الإقلاع اللاحق. وهذه الوحدة هي موضع منطق التدريب والتنبؤ الأساسي.
وأخيرًا، نصّ التصميم مخصّص لتجريب أعداد مختلفة من العقد المخفية
واتخاذ قرار بشأن أفضل ما يعمل. وتُعطينا هذه القطع معًا
نظام تعرّف ضوئي على الحروف شديد البساطة لكنه عملي.</p>
<p>الآن بعد أن فكّرنا في كيفية عمل النظام على المستوى العام، حان
الوقت لنحوّل المفاهيم إلى شيفرة!</p>
<h3 id="واجهة-بسيطة-ocrhtml">واجهة بسيطة (<code>ocr.html</code>)</h3>
<p>كما ذُكر في وقت سابق، تتمثل الخطوة الأولى في جمع بيانات لتدريب
الشبكة. يمكننا رفع سلسلة من الأرقام المكتوبة بخط اليد إلى الخادم، لكن
ذلك سيكون غير مريح. وبدلًا من ذلك، يمكننا أن نطلب من المستخدمين كتابة
الأرقام فعليًا على الصفحة باستخدام لوحة HTML. ثم يمكننا أن نمنحهم بضعة
خيارات لإمّا تدريب الشبكة أو اختبارها، حيث ينطوي تدريب الشبكة أيضًا
على تحديد ما هو الرقم الذي رُسم. وهكذا يصبح من الممكن بسهولة
تفويض جمع البيانات إلى الخارج، بتوجيه الناس إلى موقع لتلقّي مُدخلاتهم.
وهنا بعض شيفرة HTML لنبدأ منها.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;ocr.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;ocr.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">&quot;ocrDemo.onLoadFunction()&quot;</span>&gt;</span>
	<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;main-container&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;text-align: center;&quot;</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>OCR Demo<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;canvas&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;200&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;200&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
		<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;input&quot;</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Digit: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;digit&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Train&quot;</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;ocrDemo.train()&quot;</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Test&quot;</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;ocrDemo.test()&quot;</span>&gt;</span>
			<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;Reset&quot;</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;ocrDemo.resetCanvas();&quot;</span>/&gt;</span>
		<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span> 
	<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h3 id="عميل-التعرف-الضوئي-على-الحروف-ocrjs">عميل التعرّف الضوئي على الحروف (<code>ocr.js</code>)</h3>
<p>لأن بكسلًا واحدًا على لوحة HTML قد يكون صعب الرؤية، يمكننا أن نمثّل
البكسل الواحد الذي يُدخل إلى الشبكة العصبية الاصطناعية بمربّع من 10×10 بكسلًا حقيقيًا. إذًا،
فلوحة HTML الحقيقية هي 200×200 بكسل، ويُعبَّر عنها من
منظور الشبكة العصبية الاصطناعية بلوحة 20×20. وستساعدنا المتغيّرات أدناه
على تتبّع هذه القياسات.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">var</span> ocrDemo = {
    <span class="hljs-attr">CANVAS_WIDTH</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">TRANSLATED_WIDTH</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">PIXEL_WIDTH</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// TRANSLATED_WIDTH = CANVAS_WIDTH / PIXEL_WIDTH</span>
</code></pre>
<p>يمكن بعدئذٍ أن نبرز البكسلات في التمثيل الجديد حتى يسهل رؤيتها.
وهنا لدينا شبكة زرقاء مولَّدة بواسطة <code>drawGrid()</code>.</p>
<pre><code class="language-javascript">    <span class="hljs-attr">drawGrid</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">ctx</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> x = <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>, y = <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>; 
                 x &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">CANVAS_WIDTH</span>; x += <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>, 
                 y += <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>) {
            ctx.<span class="hljs-property">strokeStyle</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">BLUE</span>;
            ctx.<span class="hljs-title function_">beginPath</span>();
            ctx.<span class="hljs-title function_">moveTo</span>(x, <span class="hljs-number">0</span>);
            ctx.<span class="hljs-title function_">lineTo</span>(x, <span class="hljs-variable language_">this</span>.<span class="hljs-property">CANVAS_WIDTH</span>);
            ctx.<span class="hljs-title function_">stroke</span>();

            ctx.<span class="hljs-title function_">beginPath</span>();
            ctx.<span class="hljs-title function_">moveTo</span>(<span class="hljs-number">0</span>, y);
            ctx.<span class="hljs-title function_">lineTo</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">CANVAS_WIDTH</span>, y);
            ctx.<span class="hljs-title function_">stroke</span>();
        }
    },
</code></pre>
<p>كما نحتاج إلى تخزين البيانات المرسومة على الشبكة بشكل يمكن إرساله إلى
الخادم. ولتبسيط الأمور، يمكننا إنشاء مصفوفة تُسمّى <code>data</code> تُشير إلى البكسل
السوداء غير الملوّنة بالقيمة <code>0</code> وإلى البكسل البيضاء الملوّنة بالقيمة <code>1</code>. ونحتاج أيضًا
إلى بعض مستمعي الفأرة على اللوحة حتى نعرف متى نستدعي <code>fillSquare()</code> لتلوين
بكسل بالأبيض بينما يرسم المستخدم رقمًا. وينبغي لهذه المستمعات أن
تتتبّع ما إذا كنا في حالة رسم ثم تستدعي <code>fillSquare()</code> لإجراء
بعض الحسابات البسيطة وتقرير أي البكسلات تحتاج إلى تعبئة.</p>
<pre><code class="language-javascript">    <span class="hljs-attr">onMouseMove</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">e, ctx, canvas</span>) {
        <span class="hljs-keyword">if</span> (!canvas.<span class="hljs-property">isDrawing</span>) {
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">fillSquare</span>(ctx, 
            e.<span class="hljs-property">clientX</span> - canvas.<span class="hljs-property">offsetLeft</span>, e.<span class="hljs-property">clientY</span> - canvas.<span class="hljs-property">offsetTop</span>);
    },

    <span class="hljs-attr">onMouseDown</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">e, ctx, canvas</span>) {
        canvas.<span class="hljs-property">isDrawing</span> = <span class="hljs-literal">true</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">fillSquare</span>(ctx, 
            e.<span class="hljs-property">clientX</span> - canvas.<span class="hljs-property">offsetLeft</span>, e.<span class="hljs-property">clientY</span> - canvas.<span class="hljs-property">offsetTop</span>);
    },

    <span class="hljs-attr">onMouseUp</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) {
        canvas.<span class="hljs-property">isDrawing</span> = <span class="hljs-literal">false</span>;
    },

    <span class="hljs-attr">fillSquare</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">ctx, x, y</span>) {
        <span class="hljs-keyword">var</span> xPixel = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(x / <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>);
        <span class="hljs-keyword">var</span> yPixel = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(y / <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>[((xPixel - <span class="hljs-number">1</span>)  * <span class="hljs-variable language_">this</span>.<span class="hljs-property">TRANSLATED_WIDTH</span> + yPixel) - <span class="hljs-number">1</span>] = <span class="hljs-number">1</span>;

        ctx.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">&#x27;#ffffff&#x27;</span>;
        ctx.<span class="hljs-title function_">fillRect</span>(xPixel * <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>, yPixel * <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>, 
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">PIXEL_WIDTH</span>);
    },
</code></pre>
<p>الآن نحن أقرب إلى الجزء اللذيذ! نحتاج إلى دالة تُهيّئ
بيانات التدريب لإرسالها إلى الخادم. وهنا لدينا دالة <code>train()</code> نسبيًا
بسيطة تُجري بعض فحوص الأخطاء على البيانات المراد إرسالها،
وتضيفها إلى <code>trainArray</code> وترسلها عبر استدعاء <code>sendData()</code>.</p>
<pre><code class="language-javascript">    <span class="hljs-attr">train</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">var</span> digitVal = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&quot;digit&quot;</span>).<span class="hljs-property">value</span>;
        <span class="hljs-keyword">if</span> (!digitVal || <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>.<span class="hljs-title function_">indexOf</span>(<span class="hljs-number">1</span>) &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-title function_">alert</span>(<span class="hljs-string">&quot;Please type and draw a digit value in order to train the network&quot;</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">trainArray</span>.<span class="hljs-title function_">push</span>({<span class="hljs-string">&quot;y0&quot;</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>, <span class="hljs-string">&quot;label&quot;</span>: <span class="hljs-built_in">parseInt</span>(digitVal)});
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">trainingRequestCount</span>++;

        <span class="hljs-comment">// Time to send a training batch to the server.</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">trainingRequestCount</span> == <span class="hljs-variable language_">this</span>.<span class="hljs-property">BATCH_SIZE</span>) {
            <span class="hljs-title function_">alert</span>(<span class="hljs-string">&quot;Sending training data to server...&quot;</span>);
            <span class="hljs-keyword">var</span> json = {
                <span class="hljs-attr">trainArray</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">trainArray</span>,
                <span class="hljs-attr">train</span>: <span class="hljs-literal">true</span>
            };

            <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendData</span>(json);
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">trainingRequestCount</span> = <span class="hljs-number">0</span>;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">trainArray</span> = [];
        }
    },
</code></pre>
<p>هناك قرار تصميمي مثير للاهتمام يستحقّ الذكر هنا، وهو استخدام <code>trainingRequestCount</code>،
و<code>trainArray</code>، و<code>BATCH_SIZE</code>. فما يحدث هنا هو أن <code>BATCH_SIZE</code> هو
ثابت معرَّف مسبقًا يحدّد مقدار بيانات التدريب التي يحتفظ بها العميل
قبل أن يرسل طلبًا مجمّعًا إلى الخادم ليُعالَج بواسطة نظام التعرّف الضوئي.
والسبب الرئيسي لتجميع الطلبات هو تجنّب إرهاق الخادم بكثرة الطلبات دفعة واحدة.
وإذا وُجد عملاء كثيرون (مثلًا كثير من المستخدمين على صفحة <code>ocr.html</code>
يدرّبون النظام)، أو إذا وُجدت في العميل طبقة أخرى تلتقط
الأرقام المرسومة الممسوحة ضوئيًا وتحوّلها إلى بكسلات لتدريب الشبكة، فإن
قيمة <code>BATCH_SIZE</code> بقيمة 1 ستنتج طلبات كثيرة لا حاجة إليها. وهذا النهج
جيّد لأنه يمنح العميل مرونة أكبر، غير أنه عمليًا
ينبغي أن يتم التجميع في الخادم أيضًا عند الحاجة. وقد يحدث هجوم حجب خدمة
(DoS) يعمد فيه عميل خبيث إلى إرسال طلبات كثيرة
إلى الخادم حتى يرهقه فيتعطّل.</p>
<p>سنحتاج أيضًا إلى دالة <code>test()</code>. ومثل <code>train()</code>، ينبغي أن تجري
فحصًا بسيطًا على صحّة البيانات وترسلها. أما في حالة <code>test()</code>
فلا يقع أي تجميع، إذ ينبغي أن يستطيع المستخدم طلب تنبؤ
والحصول على نتائج فورًا.</p>
<pre><code class="language-javascript">    <span class="hljs-attr">test</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>.<span class="hljs-title function_">indexOf</span>(<span class="hljs-number">1</span>) &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-title function_">alert</span>(<span class="hljs-string">&quot;Please draw a digit in order to test the network&quot;</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">var</span> json = {
            <span class="hljs-attr">image</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>,
            <span class="hljs-attr">predict</span>: <span class="hljs-literal">true</span>
        };
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendData</span>(json);
    },
</code></pre>
<p>وأخيرًا، سنحتاج إلى بعض الدوال لإجراء طلب HTTP POST، وتلقّي
استجابة، ومعالجة أي أخطاء محتملة في أثناء ذلك.</p>
<pre><code class="language-javascript">    <span class="hljs-attr">receiveResponse</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">xmlHttp</span>) {
        <span class="hljs-keyword">if</span> (xmlHttp.<span class="hljs-property">status</span> != <span class="hljs-number">200</span>) {
            <span class="hljs-title function_">alert</span>(<span class="hljs-string">&quot;Server returned status &quot;</span> + xmlHttp.<span class="hljs-property">status</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">var</span> responseJSON = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(xmlHttp.<span class="hljs-property">responseText</span>);
        <span class="hljs-keyword">if</span> (xmlHttp.<span class="hljs-property">responseText</span> &amp;&amp; responseJSON.<span class="hljs-property">type</span> == <span class="hljs-string">&quot;test&quot;</span>) {
            <span class="hljs-title function_">alert</span>(<span class="hljs-string">&quot;The neural network predicts you wrote a \\&#x27;&quot;</span> 
                   + responseJSON.<span class="hljs-property">result</span> + <span class="hljs-string">&#x27;\\&#x27;&#x27;</span>);
        }
    },

    <span class="hljs-attr">onError</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) {
        <span class="hljs-title function_">alert</span>(<span class="hljs-string">&quot;Error occurred while connecting to server: &quot;</span> + e.<span class="hljs-property">target</span>.<span class="hljs-property">statusText</span>);
    },

    <span class="hljs-attr">sendData</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">json</span>) {
        <span class="hljs-keyword">var</span> xmlHttp = <span class="hljs-keyword">new</span> <span class="hljs-title class_">XMLHttpRequest</span>();
        xmlHttp.<span class="hljs-title function_">open</span>(<span class="hljs-string">&#x27;POST&#x27;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">HOST</span> + <span class="hljs-string">&quot;:&quot;</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">PORT</span>, <span class="hljs-literal">false</span>);
        xmlHttp.<span class="hljs-property">onload</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) { <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">receiveResponse</span>(xmlHttp); }.<span class="hljs-title function_">bind</span>(<span class="hljs-variable language_">this</span>);
        xmlHttp.<span class="hljs-property">onerror</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) { <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">onError</span>(xmlHttp) }.<span class="hljs-title function_">bind</span>(<span class="hljs-variable language_">this</span>);
        <span class="hljs-keyword">var</span> msg = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(json);
        xmlHttp.<span class="hljs-title function_">setRequestHeader</span>(<span class="hljs-string">&#x27;Content-length&#x27;</span>, msg.<span class="hljs-property">length</span>);
        xmlHttp.<span class="hljs-title function_">setRequestHeader</span>(<span class="hljs-string">&quot;Connection&quot;</span>, <span class="hljs-string">&quot;close&quot;</span>);
        xmlHttp.<span class="hljs-title function_">send</span>(msg);
    }
</code></pre>
<h3 id="خادم-serverpy">خادم (<code>server.py</code>)</h3>
<p>ولرغم أنه خادم صغير لا سوى أن يمرّر المعلومات، إلا أننا نحتاج
كذلك إلى التفكير في كيفية تلقّي طلبات HTTP ومعالجتها. 먼저 نحتاج إلى تحديد
نوع طلب HTTP الذي سنستخدمه. وفي القسم الأخير، يستخدم العميل
POST، لكن لماذا اخترنا ذلك؟ ولأن البيانات تُرسَل إلى الخادم، فإن
طلب PUT أو POST هو الأنسب. فنحن بحاجة إلى إرسال جسم بصيغة json
دون وسائط في العنوان. إذًا من الناحية النظرية كان يكفي طلب GET، لكنه
لا يجتمع مع المعنى الدلالي. غير أن الاختيار بين PUT وPOST، يظلّ
جدلًا طويلًا مستمرًّا بين المبرمجين؛ وقد لخّص KNPLabs المسألة <a href="https://knpuniversity.com/screencast/rest/put-versus-post">بأسلوب
طريف</a>.</p>
<p>وثمة اعتبار آخر وهو ما إذا كان ينبغي إرسال طلبات «train» مقابل «predict» إلى
نقاط طرفية مختلفة (مثل <code>http://localhost/train</code> و<code>http://localhost/predict</code>)
أم إلى نقطة طرفية واحدة تعالج البيانات بعد ذلك. وفي حالتنا،
يمكننا الاعتماد على المقاربة الأخيرة، إذ إن الفرق بين ما يُجرى
مع البيانات في كل حالة طفيف بما يكفي ليدخل في جملة <code>if</code> قصيرة. ومن
الناحية العملية، يكون من الأفضل جعل هذه نقاطًا طرفية منفصلة إذا كان الخادم
سيجري معالجة أكثر تفصيلًا لكل نوع من الطلبات. وهذا القرار بدوره
أثّر في رموز أخطاء الخادم المستخدمة. فمثلًا، يُرسَل خطأ 400
«Bad Request» حين لا يُحدَّد أيٌّ من «train» أو «predict» في
الحمل (payload). ولو استُخدمت نقاط طرفية منفصلة بدلًا من ذلك، لما كانت
هذه مشكلة. المعالجة التي يجريها نظام التعرّف الضوئي في الخلفية قد تفشل لأي
سبب، وإذا لم تُعالَج على نحو صحيح داخل الخادم، يُرسَل خطأ 500 «Internal
Server Error». وبدوره، لو كانت نقاط النهاية منفصلة، لاتّسع المجال
للتوسّع في إرسال أخطاء أكثر ملاءمة. فمثلًا، تحديد أن خطأ داخلي في الخادم
كان في الواقع بسبب طلب سيّئ.</p>
<p>وأخيرًا، نحتاج إلى تحديد متى وأين نُهيّئ نظام التعرّف الضوئي. وستكون
مقاربة جيّدة هي تهيئته داخل <code>server.py</code> لكن قبل بدء تشغيل الخادم.
وذلك لأن نظام التعرّف الضوئي يحتاج عند أول تشغيل إلى تدريب
الشبكة على بعض البيانات الموجودة مسبقًا في المرة الأولى التي يبدأ فيها، وقد يستغرق ذلك
بضع دقائق. فإذا بدأ الخادم قبل اكتمال هذه المعالجة، لأى أي طلب
تدريب أو تنبؤ إلى إطلاق استثناء، إذ لن يكون كائن التعرّف الضوئي
قد تهيّأ بعد، بالنظر إلى التنفيذ الحالي. ويجوز تنفيذ بديل آخر
أن ينشئ شبكة عصبية اصطناعية غير دقيقة أولية تُستخدم
لأول استعلامات قليلة ريثما تُدرَّب الشبكة الجديدة على نحو غير متزامن في
الخلفية. ويتيح هذا المقاربة البديلة استخدام الشبكة العصبية الاصطناعية
فورًا، لكن التنفيذ أكثر تعقيدًا، ولن يوفّر وقتًا إلا عند بدء التشغيل
للخوادم إن كانت تُعاد تهيئتها. وسيكون هذا النوع من التنفيذ
أكثر نفعًا لخدمة تعرّف ضوئي تتطلّب توافرية عالية.</p>
<p>وهنا لدينا معظم شيفرة الخادم في دالة قصيرة واحدة تتعامل مع
طلبات POST.</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">do_POST</span>(<span class="hljs-params">s</span>):
        response_code = <span class="hljs-number">200</span>
        response = <span class="hljs-string">&quot;&quot;</span>
        var_len = <span class="hljs-built_in">int</span>(s.headers.get(<span class="hljs-string">&#x27;Content-Length&#x27;</span>))
        content = s.rfile.read(var_len);
        payload = json.loads(content);

        <span class="hljs-keyword">if</span> payload.get(<span class="hljs-string">&#x27;train&#x27;</span>):
            nn.train(payload[<span class="hljs-string">&#x27;trainArray&#x27;</span>])
            nn.save()
        <span class="hljs-keyword">elif</span> payload.get(<span class="hljs-string">&#x27;predict&#x27;</span>):
            <span class="hljs-keyword">try</span>:
                response = {
                    <span class="hljs-string">&quot;type&quot;</span>:<span class="hljs-string">&quot;test&quot;</span>, 
                    <span class="hljs-string">&quot;result&quot;</span>:nn.predict(<span class="hljs-built_in">str</span>(payload[<span class="hljs-string">&#x27;image&#x27;</span>]))
                }
            <span class="hljs-keyword">except</span>:
                response_code = <span class="hljs-number">500</span>
        <span class="hljs-keyword">else</span>:
            response_code = <span class="hljs-number">400</span>

        s.send_response(response_code)
        s.send_header(<span class="hljs-string">&quot;Content-type&quot;</span>, <span class="hljs-string">&quot;application/json&quot;</span>)
        s.send_header(<span class="hljs-string">&quot;Access-Control-Allow-Origin&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>)
        s.end_headers()
        <span class="hljs-keyword">if</span> response:
            s.wfile.write(json.dumps(response))
        <span class="hljs-keyword">return</span>
</code></pre>
<h3 id="تصميم-شبكة-عصبية-أمامية-التقدم-neuralnetworkdesignpy">تصميم شبكة عصبية أمامية التقدّم (<code>neural_network_design.py</code>)</h3>
<p>\\label{sec.ocr.feedforward}
عند تصميم شبكة عصبية أمامية التقدّم، هناك بعض العوامل التي علينا مراعاتها. وأولها
ما هي دالة التفعيل التي سنستخدمها. وقد ذكرنا دوال التفعيل
في وقت سابق بوصفها صانعة القرار في مُخرج العقدة. وسيساعدنا نوع القرار الذي
تتّخذه دالة التفعيل في تحديد أيّها نستخدم. وفي حالتنا، سنصمّم
شبكة عصبية اصطناعية تُخرج قيمة بين 0 و1 لكل رقم
(من 0 إلى 9). وتعني القيم الأقرب إلى 1 أن الشبكة العصبية الاصطناعية تتنبّأ بأن هذا هو الرقم المرسوم،
وتعني القيم الأقرب إلى 0 أنها تتنبّأ بأنه ليس الرقم المرسوم.
لذلك نريد دالة تفعيل تكون مُخرجاتها قريبة من 0
أو قريبة من 1. ونحتاج أيضًا إلى دالة قابلة للاشتقاق لأننا سنحتاج
إلى المشتقة في حساب الانتشار العكسي. والدالة الشائعة
في هذه الحالة هي الدالة اللوغاريتمية (sigmoid) لأنها تستوفي كلتا
القيدين. وتوفّر StatSoft <a href="http://www.fmi.uni-sofia.bg/fmi/statist/education/textbook/eng/glosa.html">قائمة
جيدة</a>
لدوال التفعيل الشائعة وخصائصها.</p>
<p>العامل الثاني الذي يجب مراعاته هو ما إذا كنا نريد تضمين انحيازات. وقد
ذكرنا الانحيازات بضع مرات من قبل لكننا لم نتحدّث فعليًا عمّا هي
أو لماذا نستخدمها. ولنفهم ذلك فلنعد إلى كيفية
حساب مُخرج العقدة في \\aosafigref{500l.ocr.ann}. فلنفترض لدينا عقدة دخل
واحدة وعقدة خرج واحدة، ستكون صيغة مُخرجنا $y = f(wx)$، حيث $y$
هو المُخرج، و$f()$ هي دالة التفعيل، و$w$ هو وزن الرابط
بين العقدتين، و$x$ هو مُدخل المتغيّر للعقدة. أما الانحياز فهو
في جوهرها عقدة يكون مُخرجها دائمًا $1$. وسيؤدي ذلك إلى تغيير صيغة المُخرج
إلى $y = f(wx + b)$ حيث $b$ هو وزن الربط بين عقدة الانحياز والعقدة التالية.
فإذا اعتبرنا $w$ و$b$ ثابتين و$x$ متغيّرًا، فإن إضافة انحياز
تضيف ثابتًا إلى المُدخل
الخطي المُدخَل إلى $f(.)$.</p>
<p>لذلك تسمح إضافة الانحياز بإزاحة في <em>$y$-مقطع</em>، وهي تمنح إجمالًا
مرونة أكبر في مُخرج العقدة. ومن الممارسات الجيدة عادةً
تضمين الانحيازات، وبخاصة في الشبكات العصبية الاصطناعية ذات عدد صغير من المداخل والمخارج.
تتيح الانحيازات مرونة أكبر في مُخرج الشبكة العصبية الاصطناعية، ومن ثمّ
تمنح الشبكة مساحة أكبر للدقّة. وبدون انحيازات، يقلّ احتمال أن
نحصل على تنبؤات صحيحة عبر شبكتنا، أو سنحتاج إلى عدد أكبر من العقد المخفية
لإجراء تنبؤات أدقّ.</p>
<p>العوامل الأخرى التي يجب مراعاتها هي عدد الطبقات المخفية وعدد
العقد المخفية في كل طبقة. أما الشبكات العصبية الاصطناعية الكبيرة ذات المداخل والمخارج الكثيرة،
فتُقرَّر هذه الأعداد بتجريب قيم مختلفة واختبار أداء الشبكة.
وهنا يُقاس الأداء بتدريب شبكة عصبية اصطناعية بحجم
معين ومعرفة النسبة المئوية من مجموعة التحقّق التي صُنِّفت
بصورة صحيحة. وفي معظم الحالات، تكفي طبقة مخفية واحدة لأداء
جيّد، لذا لا نجرّب هنا سوى عدد العقد المخفية.</p>
<pre><code class="language-python"><span class="hljs-comment"># Try various number of hidden nodes and see what performs best</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> xrange(<span class="hljs-number">5</span>, <span class="hljs-number">50</span>, <span class="hljs-number">5</span>):
    nn = OCRNeuralNetwork(i, data_matrix, data_labels, train_indices, <span class="hljs-literal">False</span>)
    performance = <span class="hljs-built_in">str</span>(test(data_matrix, data_labels, test_indices, nn))
    <span class="hljs-built_in">print</span> <span class="hljs-string">&quot;{i} Hidden Nodes: {val}&quot;</span>.<span class="hljs-built_in">format</span>(i=i, val=performance)
</code></pre>
<p>هنا نُهيّئ شبكة عصبية اصطناعية بعدد عقد مخفية يتراوح بين 5 و50 بزيادة مقدارها 5.
ثم نستدعي الدالة <code>test()</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">test</span>(<span class="hljs-params">data_matrix, data_labels, test_indices, nn</span>):
    avg_sum = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> xrange(<span class="hljs-number">100</span>):
        correct_guess_count = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> test_indices:
            test = data_matrix[i]
            prediction = nn.predict(test)
            <span class="hljs-keyword">if</span> data_labels[i] == prediction:
                correct_guess_count += <span class="hljs-number">1</span>

        avg_sum += (correct_guess_count / <span class="hljs-built_in">float</span>(<span class="hljs-built_in">len</span>(test_indices)))
    <span class="hljs-keyword">return</span> avg_sum / <span class="hljs-number">100</span>
</code></pre>
<p>الحلقة الداخلية تعدّ عمليات التصنيف الصحيحة التي تُقسَم بدورها
في النهاية على عدد عمليات التصنيف التي جرت محاولتها. ويعطي هذا
نسبةً أو نسبة مئوية من الدقّة للشبكة العصبية الاصطناعية. ولأن أوزان الشبكة قد
تختلف قليلًا في كل مرة تُدرَّب فيها الشبكة، فإننا نكرّر هذه العملية 100 مرة في
الحلقة الخارجية حتى نتمكّن من أخذ متوسط دقّة إعداد الشبكة العصبية الاصطناعية
هذا. وفي حالتنا، تبدو إحدى تشغيلات <code>neural_network_design.py</code> على النحو
التالي:</p>
<pre><code>PERFORMANCE
-----------
5 Hidden Nodes: 0.7792
10 Hidden Nodes: 0.8704
15 Hidden Nodes: 0.8808
20 Hidden Nodes: 0.8864
25 Hidden Nodes: 0.8808
30 Hidden Nodes: 0.888
35 Hidden Nodes: 0.8904
40 Hidden Nodes: 0.8896
45 Hidden Nodes: 0.8928
</code></pre>
<p>من هذا المُخرَج يمكننا أن نستنتج أن 15 عقدة مخفية هي الأكثر أمثلية.
فإضافة 5 عقد من 10 إلى 15 تمنحنا نحو 1% من الدقّة إضافية، في حين أن رفع
الدقّة بنسبة 1% أخرى يتطلب إضافة 20 عقدة. كما أن زيادة
عدد العقد المخفية تزيد العبء الحسابي. لذا يستغرق تدريب
الشبكات ذات العقد المخفية الأكثر ولإجراء التنبؤات وقتًا أطول.
لذلك نختار استخدام آخر عدد للعقد المخفية نتج عنه ارتفاع
كبير في الدقّة. وبالطبع، من الممكن عند تصميم شبكة عصبية اصطناعية
ألا يكون العبء الحسابي مشكلة وأن يكون الأولوية القصوى هي الحصول على أكثر
الشبكات العصبية الاصطناعية دقّة. وفي تلك الحالة يكون من الأفضل اختيار 45 عقدة
مخفية بدلًا من 15.</p>
<h3 id="الوظائف-الأساسية-لنظام-التعرف-الضوئي-على-الحروف">الوظائف الأساسية لنظام التعرّف الضوئي على الحروف</h3>
<p>في هذا القسم سنتحدث عن كيفية حدوث التدريب الفعلي عبر الانتشار العكسي،
وكيف يمكننا استخدام الشبكة لإجراء التنبؤات، وكذلك قرارات التصميم
الأخرى الخاصة بالوظائف الأساسية.</p>
<h4>التدريب عبر الانتشار العكسي (<code>ocr.py</code>)</h4>
<p>نستخدم خوارزمية الانتشار العكسي لتدريب شبكتنا العصبية الاصطناعية. وهي تتألّف من 4 خطوات
رئيسية تُكرَّر لكل عيّنة في مجموعة التدريب، مع تحديث أوزان الشبكة العصبية الاصطناعية
في كل مرة.</p>
<p>أولًا، نُهيّئ الأوزان بقيم عشوائية صغيرة (بين -1 و1). وفي
حالتنا، نُهيّئها إلى قيم بين -0.06 و0.06 ونخزّنها في
المصفوفات <code>theta1</code> و<code>theta2</code> و<code>input_layer_bias</code> و<code>hidden_layer_bias</code>. وبما أن
كل عقدة في طبقة ترتبط بكل عقدة في الطبقة التالية، يمكننا إنشاء
مصفوفة ذات m صف و n عمود، حيث n هو عدد العقد في إحدى
الطبقات وm هو عدد العقد في الطبقة المجاورة. وهذه المصفوفة تمثّل
جميع أوزان الروابط بين هاتين الطبقتين. وهنا تملك theta1
400 عمود لمدخلاتنا البالغة 20×20 بكسل، وصفوفًا بعدد <code>num_hidden_nodes</code>.
وعلى نحو مماثل، تمثّل <code>theta2</code> الروابط بين الطبقة المخفية وطبقة
الخرج. ولديها أعمدة بعدد <code>num_hidden_nodes</code> وصفوف بعدد <code>NUM_DIGITS</code> (<code>10</code>). أما
المتجهان الآخران (ذوا صف واحد)، <code>input_layer_bias</code> و<code>hidden_layer_bias</code>، فيمثّلان
الانحيازات.</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_rand_initialize_weights</span>(<span class="hljs-params">self, size_in, size_out</span>):
        <span class="hljs-keyword">return</span> [((x * <span class="hljs-number">0.12</span>) - <span class="hljs-number">0.06</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> np.random.rand(size_out, size_in)]
</code></pre>
<pre><code class="language-python">            <span class="hljs-variable language_">self</span>.theta1 = <span class="hljs-variable language_">self</span>._rand_initialize_weights(<span class="hljs-number">400</span>, num_hidden_nodes)
            <span class="hljs-variable language_">self</span>.theta2 = <span class="hljs-variable language_">self</span>._rand_initialize_weights(num_hidden_nodes, <span class="hljs-number">10</span>)
            <span class="hljs-variable language_">self</span>.input_layer_bias = <span class="hljs-variable language_">self</span>._rand_initialize_weights(<span class="hljs-number">1</span>, 
                                                                  num_hidden_nodes)
            <span class="hljs-variable language_">self</span>.hidden_layer_bias = <span class="hljs-variable language_">self</span>._rand_initialize_weights(<span class="hljs-number">1</span>, <span class="hljs-number">10</span>)

</code></pre>
<p>الخطوة الثانية هي <em>الانتشار الأمامي</em> (forward propagation)، وهي في جوهرها حساب
مُخرجات العقد على النحو الموصوف في \\aosasecref{sec.ocr.ann}، طبقةً طبقة بدءًا من
عقد الدخل. وهنا، <code>y0</code> هي مصفوفة من الحجم 400 تحمل المُدخلات التي نرغب في
استخدامها لتدريب الشبكة العصبية الاصطناعية. فنضرب <code>theta1</code> في <code>y0</code> بعد تبديل
موضعها، بحيث نحصل على مصفوفتين بالأحجام <code>(num_hidden_nodes x 400) * (400 x 1)</code>،
فيكون لدينا متجّه من مُخرجات الطبقة المخفية بحجم num_hidden_nodes. ثم نضيف
متجّه الانحياز ونطبّق دالة التفعيل اللوغاريتمية بصيغة متجّهية على هذا
متجّه المُخرج، فنحصل على <code>y1</code>. و<code>y1</code> هو متجّه مُخرجات طبقتنا المخفية. كما يتم
تكرار العملية نفسها مرة أخرى لحساب <code>y2</code> لعقد الخرج. و<code>y2</code> هو الآن
متجّه طبقة الخرج لدينا وقيمه تمثّل احتمال أن يكون فهرسُه هو الرقم المرسوم.
فمثلًا، إذا رسم أحدهم الرقم 8، تكون قيمة <code>y2</code> عند الفهرس الثامن
هي الأكبر إذا كانت الشبكة العصبية الاصطناعية قد أتت بالتوقع الصحيح.
غير أن احتمال أن يكون الرقم 6 هو الرقم المرسوم قد يكون أعلى من احتمال الرقم 1،
لأنه يبدو أكثر شبهًا بالرقم 8 ومن المرجّح أن يستهلك البكسلات نفسها
المرسومة التي يستهلكها الرقم 8. ويصبح <code>y2</code> أدقّ مع كل رقم مرسوم إضافي
تُدرَّب عليه الشبكة العصبية الاصطناعية.</p>
<pre><code class="language-python">    <span class="hljs-comment"># The sigmoid activation function. Operates on scalars.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_sigmoid_scalar</span>(<span class="hljs-params">self, z</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> / (<span class="hljs-number">1</span> + math.e ** -z)
</code></pre>
<pre><code class="language-python">            y1 = np.dot(np.mat(<span class="hljs-variable language_">self</span>.theta1), np.mat(data[<span class="hljs-string">&#x27;y0&#x27;</span>]).T)
            sum1 =  y1 + np.mat(<span class="hljs-variable language_">self</span>.input_layer_bias) <span class="hljs-comment"># Add the bias</span>
            y1 = <span class="hljs-variable language_">self</span>.sigmoid(sum1)

            y2 = np.dot(np.array(<span class="hljs-variable language_">self</span>.theta2), y1)
            y2 = np.add(y2, <span class="hljs-variable language_">self</span>.hidden_layer_bias) <span class="hljs-comment"># Add the bias</span>
            y2 = <span class="hljs-variable language_">self</span>.sigmoid(y2)
</code></pre>
<p>الخطوة الثالثة هي <em>الانتشار العكسي</em> (back propagation)، وتنطوي على حساب الأخطاء عند
عقد الخرج ثم عند كل طبقة وسيطة رجوعًا نحو الدخل. وهنا
نبدأ بإنشاء متجّه مُخرَج متوقَّع، <code>actual_vals</code>، بالقيمة <code>1</code> عند فهرس
الرقم الذي يمثّل قيمة الرقم المرسوم وبأصفار <code>0</code> في غير ذلك. ويُحسب
متجّه الأخطاء عند عقد الخرج، <code>output_errors</code>، بطرح
متجّه المُخرج الفعلي <code>y2</code> من <code>actual_vals</code>. ولكل طبقة مخفية
بعدها، نحسب مكوّنين. أولًا، لدينا مصفوفة أوزان الطبقة التالية
بعد تبديل موضعها مضروبة في أخطاء مُخرجاتها. ثم لدينا
مشتقة دالة التفعيل مطبَّقة على الطبقة السابقة. ثم نُجري
ضربًا على مستوى العناصر بين هذين المكوّنين، فينتج
متجّه أخطاء الطبقة المخفية. وهنا نسمّيه <code>hidden_errors</code>.</p>
<pre><code class="language-python">            actual_vals = [<span class="hljs-number">0</span>] * <span class="hljs-number">10</span> 
            actual_vals[data[<span class="hljs-string">&#x27;label&#x27;</span>]] = <span class="hljs-number">1</span>
            output_errors = np.mat(actual_vals).T - np.mat(y2)
            hidden_errors = np.multiply(np.dot(np.mat(<span class="hljs-variable language_">self</span>.theta2).T, output_errors), 
                                        <span class="hljs-variable language_">self</span>.sigmoid_prime(sum1))
</code></pre>
<p>تحديثات الأوزان هي ما يضبط أوزان الشبكة العصبية الاصطناعية بناءً على الأخطاء المحسوبة
سابقًا. وتُحدَّث الأوزان في كل طبقة عبر ضرب المصفوفات. فمصفوفة الخطأ
في كل طبقة تُضرب في مصفوفة مُخرجات الطبقة السابقة.
ثم يُضرب هذا الناتج في عدد نسبي يُسمّى معدّل التعلّم (learning rate) ويُضاف
إلى مصفوفة الأوزان. ومعدّل التعلّم هو قيمة بين 0 و1
تؤثّر في سرعة ودقّة التعلّم في الشبكة العصبية الاصطناعية. أما قيم معدّل التعلّم
الأكبر فتنتج شبكة عصبية اصطناعية تتعلّم بسرعة لكنها أقل دقّة، في حين أن
القيم الأصغر تنتج شبكة عصبية اصطناعية تتعلّم ببطء لكنها أكثر
دقّة. وفي حالتنا، لدينا قيمة صغيرة نسبيًا لمعدّل التعلّم، وهي 0.1.
وهذا يعمل جيدًا لأننا لا نحتاج إلى أن تكون الشبكة العصبية الاصطناعية مدرَّبة فورًا كي
يستطيع المستخدم مواصلة إرسال طلبات التدريب أو التنبؤ. وتُحدَّث الانحيازات بمجرد
ضرب معدّل التعلّم في متجّه أخطاء الطبقة.</p>
<pre><code class="language-python">            <span class="hljs-variable language_">self</span>.theta1 += <span class="hljs-variable language_">self</span>.LEARNING_RATE * np.dot(np.mat(hidden_errors), 
                                                       np.mat(data[<span class="hljs-string">&#x27;y0&#x27;</span>]))
            <span class="hljs-variable language_">self</span>.theta2 += <span class="hljs-variable language_">self</span>.LEARNING_RATE * np.dot(np.mat(output_errors), 
                                                       np.mat(y1).T)
            <span class="hljs-variable language_">self</span>.hidden_layer_bias += <span class="hljs-variable language_">self</span>.LEARNING_RATE * output_errors
            <span class="hljs-variable language_">self</span>.input_layer_bias += <span class="hljs-variable language_">self</span>.LEARNING_RATE * hidden_errors
</code></pre>
<h4>اختبار شبكة مدرَّبة (<code>ocr.py</code>)</h4>
<p>بمجرد أن تُدرَّب الشبكة العصبية الاصطناعية عبر الانتشار العكسي، يصبح استخدامها
لإجراء التنبؤات أمرًا مباشرًا إلى حدٍّ كبير. وكما نرى هنا، فإننا نبدأ بحساب
مُخرج الشبكة العصبية الاصطناعية، <code>y2</code>، بالطريقة نفسها التي فعلناها في الخطوة الثانية من الانتشار العكسي.
ثم نبحث عن الفهرس الذي يحمل القيمة الكبرى في المتجّه. وهذا الفهرس هو
الرقم الذي تنبّأت به الشبكة العصبية الاصطناعية.</p>
<pre><code>    def predict(self, test):
        y1 = np.dot(np.mat(self.theta1), np.mat(test).T)
        y1 =  y1 + np.mat(self.input_layer_bias) # Add the bias
        y1 = self.sigmoid(y1)

        y2 = np.dot(np.array(self.theta2), y1)
        y2 = np.add(y2, self.hidden_layer_bias) # Add the bias
        y2 = self.sigmoid(y2)

        results = y2.T.tolist()[0]
        return results.index(max(results))
</code></pre>
<h4>قرارات تصميم أخرى (<code>ocr.py</code>)</h4>
<p>تتوفّر عبر الإنترنت موارد كثيرة تتناول تنفيذ الانتشار العكسي
بتفصيل أكبر. ومن الموارد الجيدة <a href="http://www.willamette.edu/~gorr/classes/cs449/backprop.html">دورة من
جامعة ويلاميت</a>. فهي
تستعرض خطوات الانتشار العكسي ثم تشرح كيف يمكن ترجمتها إلى صيغة مصفوفات.
وبينما تظل كمية الحساب باستعمال المصفوفات هي نفسها المستعملة
مع الحلقات، فإن الفائدة هي أن الشيفرة تصبح أبسط وأسهل في القراءة
مع حلقات متداخلة أقل. وكما نرى، فإن عملية التدريب
كاملة مكتوبة في أقل من 25 سطرًا من الشيفرة
باستخدام الجبر بالمصفوفات.</p>
<p>كما ذُكر في مقدّمة \\aosasecref{sec.ocr.decisions}، فإن تخزين
أوزان الشبكة العصبية الاصطناعية يعني أننا لا نفقد التقدم الذي أحرزناه في تدريبها
عند إيقاف الخادم أو انهياره المفاجئ لأي سبب. ونخزّن
الأوزان بكتابتها بصيغة JSON في ملف. وعند الإقلاع، يحمّل نظام التعرّف الضوئي
أوزان الشبكة العصبية الاصطناعية المحفوظة في الذاكرة. ولا تُستدعى دالة الحفظ داخليًا
من نظام التعرّف الضوئي، بل يترك للخادم قرار موعد تنفيذ الحفظ. وفي حالتنا،
يحفظ الخادم الأوزان بعد كل تحديث. وهذا حل سريع وبسيط
لكنه ليس مثاليًا لأن الكتابة إلى القرص تستهلك وقتًا. كما أن هذا
يمنعنا من التعامل مع طلبات متزامنة متعددة لعدم وجود
آلية تمنع الكتابات المتزامنة في الملف نفسه. وفي خادم
أكثر تعقيدًا، يمكن أن يتم الحفظ عند الإيقاف أو مرة كل بضع
دقائق مع شكل ما من الأقفال أو بروتوكول ختم زمني لضمان عدم فقدان
أي بيانات.</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">save</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-variable language_">self</span>._use_file:
            <span class="hljs-keyword">return</span>

        json_neural_network = {
            <span class="hljs-string">&quot;theta1&quot;</span>:[np_mat.tolist()[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> np_mat <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.theta1],
            <span class="hljs-string">&quot;theta2&quot;</span>:[np_mat.tolist()[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> np_mat <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.theta2],
            <span class="hljs-string">&quot;b1&quot;</span>:<span class="hljs-variable language_">self</span>.input_layer_bias[<span class="hljs-number">0</span>].tolist()[<span class="hljs-number">0</span>],
            <span class="hljs-string">&quot;b2&quot;</span>:<span class="hljs-variable language_">self</span>.hidden_layer_bias[<span class="hljs-number">0</span>].tolist()[<span class="hljs-number">0</span>]
        };
        <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(OCRNeuralNetwork.NN_FILE_PATH,<span class="hljs-string">&#x27;w&#x27;</span>) <span class="hljs-keyword">as</span> nnFile:
            json.dump(json_neural_network, nnFile)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_load</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-variable language_">self</span>._use_file:
            <span class="hljs-keyword">return</span>

        <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(OCRNeuralNetwork.NN_FILE_PATH) <span class="hljs-keyword">as</span> nnFile:
            nn = json.load(nnFile)
        <span class="hljs-variable language_">self</span>.theta1 = [np.array(li) <span class="hljs-keyword">for</span> li <span class="hljs-keyword">in</span> nn[<span class="hljs-string">&#x27;theta1&#x27;</span>]]
        <span class="hljs-variable language_">self</span>.theta2 = [np.array(li) <span class="hljs-keyword">for</span> li <span class="hljs-keyword">in</span> nn[<span class="hljs-string">&#x27;theta2&#x27;</span>]]
        <span class="hljs-variable language_">self</span>.input_layer_bias = [np.array(nn[<span class="hljs-string">&#x27;b1&#x27;</span>][<span class="hljs-number">0</span>])]
        <span class="hljs-variable language_">self</span>.hidden_layer_bias = [np.array(nn[<span class="hljs-string">&#x27;b2&#x27;</span>][<span class="hljs-number">0</span>])]
</code></pre>
<h2 id="الخاتمة">الخاتمة</h2>
<p>الآن بعد أن تعلّمنا عن الذكاء الاصطناعي والشبكات العصبية الاصطناعية
والانتشار العكسي، وبناء نظام تعرّف ضوئي على الحروف من الطرف إلى الطرف، فلنُراجع
أبرز ما في هذا الفصل والصورة الكبرى.</p>
<p>بدأنا الفصل بإعطاء خلفية عن الذكاء الاصطناعي والشبكات العصبية الاصطناعية، وما سننفّذه تقريبًا.
ناقشنا ما هو الذكاء الاصطناعي وأمثلة على استخداماته.
ورأينا أن الذكاء الاصطناعي هو في جوهره مجموعة من الخوارزميات أو مقاربات حلّ المشكلات
التي يمكنها أن تعطي إجابة عن سؤال بطريقة مشابهة لما يفعله الإنسان.
ثم نظرنا في بنية الشبكة العصبية الاصطناعية الأمامية التقدّم. وتعلّمنا أن
حساب المُخرج عند عقدة معيّنة كان ببساطة جمعًا لجداء مُخرجات العقد السابقة
مع أوزانها الموصّلة. وتحدّثنا عن كيفية استخدام الشبكة العصبية الاصطناعية
بصياغة المُدخلات أولًا وتقسيم البيانات إلى مجموعتَي تدريب وتحقّق.</p>
<p>ومتى توفّر لنا بعض الخلفية، بدأنا نتحدث عن إنشاء نظام قائم على الويب
من بنية عميل-خادم يتعامل مع طلبات المستخدم لتدريب نظام التعرّف الضوئي على الحروف أو اختباره.
ثم ناقشنا كيف سيفسّر العميل البكسلات المرسومة في مصفوفة
وينفّذ طلب HTTP إلى خادم التعرّف الضوئي على الحروف لإجراء التدريب أو
الاختبار. وناقشنا كيف يقرأ خادمنا البسيط الطلبات وكيف نصمّم
شبكة عصبية اصطناعية باختبار أداء عدة أعداد للعقد المخفية. وانتهينا إلى
مراجعة شيفرة التدريب والاختبار الأساسية للانتشار العكسي.</p>
<p>ولرغم أننا بنينا نظام تعرّف ضوئي على الحروف يبدو عمليًا، فإن هذا الفصل لا يفعل
سوى أن يلامس سطح كيفية عمل نظام تعرّف ضوئي حقيقي. ويمكن لأنظمة
التعرّف الضوئي على الحروف الأكثر تعقيدًا أن تعالج مُدخلاتها مسبقًا، أو تستخدم خوارزميات
تعلّم آلة هجينة، أو تمرّ بمراحل تصميم أكثر شمولًا، أو تحتوي على تحسينات أخرى لاحقة.</p>
`,c={book:s,chapter:"ocr",chapterTitle:n,slug:a,title:l,headings:p,html:e};export{s as book,t as chapter,n as chapterTitle,c as default,p as headings,e as html,a as slug,l as title};
