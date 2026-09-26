const s="500-lines",a="functionalDB",n="An Archaeology-Inspired Database",l="index",e="قاعدة بيانات مستوحاة من علم الآثار",p=[{depth:2,id:"مقدمة",text:"مقدمة"},{depth:3,id:"تصميم-قاعدة-بيانات-كمثل-عالم-الآثار",text:"تصميم قاعدة بيانات كمثل عالم الآثار"},{depth:2,id:"وضع-الأساس",text:"وضع الأساس"},{depth:3,id:"الكيانات",text:"الكيانات"},{depth:3,id:"التخزين",text:"التخزين"},{depth:3,id:"فهرسة-البيانات",text:"فهرسة البيانات"},{depth:3,id:"قاعدة-البيانات",text:"قاعدة البيانات"},{depth:3,id:"المحددات-الأساسية",text:"المحددات الأساسية"},{depth:2,id:"سلوك-البيانات-ودورة-حياتها",text:"سلوك البيانات ودورة حياتها"},{depth:3,id:"الضروريات-المجردة",text:"الضروريات المجردة"},{depth:3,id:"المعاملات",text:"المعاملات"},{depth:2,id:"استخراج-الرؤى-في-هيئة-مكتبات",text:"استخراج الرؤى في هيئة مكتبات"},{depth:3,id:"اجتياز-الرسوم-البيانية",text:"اجتياز الرسوم البيانية"},{depth:2,id:"الاستعلام-عن-قاعدة-البيانات",text:"الاستعلام عن قاعدة البيانات"},{depth:3,id:"لغة-الاستعلام",text:"لغة الاستعلام"},{depth:3,id:"تصميم-محرك-الاستعلام",text:"تصميم محرّك الاستعلام"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],t=`<p>title: قاعدة بيانات مستوحاة من علم الآثار
author: Yoav Rubin</p>
<p><em>يوآف روبين مهندس برمجيات أول في مايكروسوفت، وقبل ذلك كان عضوًا في هيئة الباحثين ومخترعًا رئيسيًا في أبحاث IBM. وهو يعمل الآن في مجال أمن البيانات في السحابة، وفي الماضي تركّز عمله على تطوير بيئات تطوير قائمة على السحابة أو الويب. يحمل يوآف ماجستير في البحث الطبي في مجال علم الأعصاب وبكالوريوس في هندسة نظم المعلومات. يتعامل على تويتر باسم <a href="https://twitter.com/yoavrubin">@yoavrubin</a>، ويكتب مدونة من حين لآخر على <a href="http://yoavrubin.blogspot.com">http://yoavrubin.blogspot.com</a>.</em></p>
<h2 id="مقدمة">مقدمة</h2>
<p>يُنظر إلى تطوير البرمجيات غالبًا على أنه عملية صارمة، تكون فيها المدخلات متطلبات والمخرجات منتجًا عاملًا. لكن مطوّري البرمجيات بشر، لهم وجهات نظرهم وتحيّزاتهم الخاصة التي تلوّن نواتج عملهم.</p>
<p>في هذا الفصل، سنستكشف كيف يؤثر تغيّر في منظور شائع في تصميم وتنفيذ نوع مدروس جيدًا من البرمجيات: قاعدة البيانات (database).</p>
<p>صُممت أنظمة قواعد البيانات لتخزين البيانات والاستعلام عنها. وهذا ما يفعله كلعامل في مجال المعلومات؛ لكن الأنظمة نفسها صمّمها علماء حاسوب. ونتيجة لذلك، تتأثر أنظمة قواعد البيانات الحديثة تأثيرًا كبيرًا بتعريف علماء الحاسوب لما هو البيانات، وما يمكن فعله بها.</p>
<p>على سبيل المثال، تنفّذ معظم قواعد البيانات الحديثة التحديثات بأن تدهس البيانات القديمة في مكانها (in place) بدلًا من إلحاق البيانات الجديدة بالاحتفاظ بالقديمة. وهذه الآلية، التي أسماها <a href="http://www.infoq.com/presentations/Value-Values">Rich Hickey</a> اسمها «البرمجة الموجَّهة بالمواضع» (place-oriented programming)، توفّر مساحة تخزين لكنها تجعل استرجاع التاريخ الكامل لسجل بعينه مستحيلًا. وهذا القرار في التصميم يعكس منظور عالم الحاسوب بأن «التاريخ» أقل أهمية من ثمن تخزينه.</p>
<p>ولو سألت عالم آثار بدلًا من ذلك أين يمكن العثور على البيانات القديمة، فسيكون الجواب «إن شاء الله، إنها مدفونة في الأسفل فحسب».</p>
<p>(تنويه: فهمي لآراء عالم الآثار النموذجي مبني على زيارة بضعة متاحف، وقراءة عدة مقالات في ويكيبيديا، ومشاهدة سلسلة Indiana Jones كاملة.)</p>
<h3 id="تصميم-قاعدة-بيانات-كمثل-عالم-الآثار">تصميم قاعدة بيانات كمثل عالم الآثار</h3>
<p>لو سألنا عالم الآثار الودود لدينا أن يصمّم قاعدة بيانات، فمن المتوقع أن تعكس المتطلبات ما يمكن العثور عليه في موقع تنقيب:</p>
<ul>
<li>كل البيانات موجودة في الموقع ومُفهرسة.</li>
<li>الحفر أعمق يكشف عن حالة الأمور في أزمنة ماضية.</li>
<li>القطع الأثرية الموجودة في الطبقة نفسها تنتمي إلى الحقبة نفسها.</li>
<li>كل قطعة أثرية تتكوّن من الحالة التي تراكمت فيها في حقترات مختلفة.</li>
</ul>
<p>فمثلًا قد يحمل جدار رموزًا رومانية في طبقة ما، وفي طبقة أدنى قد تكون هناك رموز يونانية. وكلا الملاحظتين يُسجَّلان كجزء من حالة الجدار.</p>
<p>ويمكن تخيّل هذا التشبيه مرسومًا في \\aosafigref{500l.functionaldb.exc}:</p>
<ul>
<li>الدائرة كاملة هي موقع التنقيب.</li>
<li>كل حلقة هي <em>طبقة</em> (هنا مرقّمة من 0 إلى 4).</li>
<li>كل شريحة قطعة أثرية موسومة (من «A» إلى «E»).</li>
<li>لكل قطعة أثرية صفة «رمز» (حيث تعني الفراغ أنه لم يجرِ أي تحديث).</li>
<li>الأسهم المتصلة تدل على تغيّر في الرمز بين الطبقات</li>
<li>الأسهم المتقطعة علاقات اعتباطية محلّية بين القطع الأثرية (مثلًا من «E» إلى «A»).</li>
</ul>
<p>\\aosafigure[240pt]/images/500-lines/functionalDB-0-image_0.webp{The Excavation Site}{500l.functionaldb.exc}</p>
<p>ولو ترجمنا لغة عالم الآثار إلى مصطلحات يستخدمها مصمّم قواعد البيانات لَما استعملها:</p>
<ul>
<li>موقع التنقيب هو <em>قاعدة بيانات</em>.</li>
<li>كل قطعة أثرية هي <em>كيان</em> (entity) له <em>معرِّف</em> (ID) مقابل.</li>
<li>لكل كيان مجموعة من <em>الخصائص</em> (attributes)، قد تتغير مع الزمن.</li>
<li>لكل خاصية <em>قيمة</em> (value) بعينها عند زمن بعينه.</li>
</ul>
<p>قد يبدو هذا مختلفًا جدًا عن أنواع قواعد البيانات التي اعتدت العمل معها. ويُشار إلى هذا التصميم أحيانًا بأنه «قاعدة بيانات وظيفية» (functional database)، لأنه يستخدم أفكارًا من مجال البرمجة الوظيفية. ويصف بقية الفصل كيفية تنفيذ قاعدة بيانات من هذا النوع.</p>
<p>وبما أننا نبني قاعدة بيانات وظيفية، فسنستخدم لغة برمجة وظيفية اسمها Clojure.</p>
<p>تتمتع Clojure بعدة صفات تجعلها لغة تنفيذ جيدة لقاعدة بيانات وظيفية، مثل الثبات (immutability) المدمج، والدوال العليا (higher order functions)، ووسائل البرمجة الميتا (metaprogramming). لكن السبب النهائي لاختيار Clojure هو تأكيدها على التصميم النظيف الصارم، وهي صفة قلّة من لغات البرمجة تمتلكها.</p>
<h2 id="وضع-الأساس">وضع الأساس</h2>
<p>لنبدأ بإعلان البنى الأساسية التي تتكوّن منها قاعدة بياناتنا.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defrecord</span> <span class="hljs-title">Database</span> [layers top-id curr-time])
</code></pre>
<p>تتألف قاعدة البيانات من:</p>
<ol>
<li>طبقات من الكيانات، لكل منها ختم زمني فريد خاص بها (الحلقات في الشكل 1).</li>
<li>قيمة top-id وهي المعرِّف الفريد المتاح التالي.</li>
<li>الزمن الذي حُدِّثت فيه قاعدة البيانات آخر مرة.</li>
</ol>
<pre><code class="language-clojure">(<span class="hljs-keyword">defrecord</span> <span class="hljs-title">Layer</span> [storage VAET AVET VEAT EAVT])
</code></pre>
<p>تتألف كل طبقة من:</p>
<ol>
<li>مخزن بيانات للكيانات.</li>
<li>فهارس تُستخدم لتسريع الاستعلامات على قاعدة البيانات. (وستُشرح هذه الفهارس ومعنى أسمائها لاحقًا.)</li>
</ol>
<p>في تصميمنا، قد تتألف «قاعدة بيانات» مفهومية واحدة من عدة نسخ <code>Database</code>، كل منها يمثل لقطة من قاعدة البيانات عند <code>curr-time</code>. وقد تتشارك <code>Layer</code> الكيانَ نفسه بالضبط مع <code>Layer</code> أخرى إذا لم تتغير حالة الكيان بين الوقتين اللذين تمثلهما.</p>
<h3 id="الكيانات">الكيانات</h3>
<p>لن تكن قاعدة بياناتنا ذات فائدة دون كيانات نخزّن فيها، لذا نعرّفها تاليًا. وكما ناقشنا من قبل، للكيان معرِّف وقائمة من الخصائص؛ وننشئها باستخدام الدالة <code>make-entity</code>.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defrecord</span> <span class="hljs-title">Entity</span> [id attrs])

(<span class="hljs-keyword">defn</span> <span class="hljs-title">make-entity</span>
   ([] (<span class="hljs-name">make-entity</span> <span class="hljs-symbol">:db/no-id-yet</span>))
   ([id] (<span class="hljs-name">Entity.</span>  id {})))
</code></pre>
<p>ولاحظ أن المعرِّف إذا لم يُعطى، فيضبط معرِّف الكيان على <code>:db/no-id-yet</code>، أي أن شيئًا آخر مسؤول عن منحه معرِّفًا. وسنرى لاحقًا كيف يعمل هذا.</p>
<h4>الخصائص</h4>
<p>تتألف كل خاصية من اسمها وقيمتها وختمَي زمن آخر تحديث لها والتحديث الذي قبله. ولكل خاصية أيضًا حقلان يصفان <code>type</code> و<code>cardinality</code> الخاصين بها.</p>
<p>وفي الحالة التي تُستخدم فيها الخاصية لتمثيل علاقة بكيان آخر، فإن <code>type</code> سيكون <code>:db/ref</code> وستكون قيمتها معرِّف الكيان المرتبط. وهذا نظام أنواع بسيط يكون أيضًا نقطة امتداد. فالمستخدمون أحرار في تعريف أنواعهم والاستفادة منها لتوفير دلالات إضافية لبياناتهم.</p>
<p>وتحدّد <code>cardinality</code> الخاصية ما إذا كانت الخاصية تمثل قيمة واحدة أم مجموعة قيم. ونستخدم هذا الحقل لتحديد مجموعة العمليات المسموح بها على هذه الخاصية.</p>
<p>ويتم إنشاء الخاصية باستخدام الدالة <code>make-attr</code>.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defrecord</span> <span class="hljs-title">Attr</span> [name value ts prev-ts])

(<span class="hljs-keyword">defn</span> <span class="hljs-title">make-attr</span>
   ([name value type <span class="hljs-comment">; these ones are required</span>
       &amp; {<span class="hljs-symbol">:keys</span> [cardinality] <span class="hljs-symbol">:or</span> {cardinality <span class="hljs-symbol">:db/single</span>}} ]
     {<span class="hljs-symbol">:pre</span> [(<span class="hljs-name"><span class="hljs-built_in">contains?</span></span> #{<span class="hljs-symbol">:db/single</span> <span class="hljs-symbol">:db/multiple</span>} cardinality)]}
    (<span class="hljs-name"><span class="hljs-built_in">with-meta</span></span> (<span class="hljs-name">Attr.</span> name value <span class="hljs-number">-1</span> <span class="hljs-number">-1</span>) {<span class="hljs-symbol">:type</span> type <span class="hljs-symbol">:cardinality</span> cardinality})))
</code></pre>
<p>هناك نمطان مثيران للاهتمام مستخدَمان في دالة الإنشاء هذه:</p>
<ul>
<li>نستخدم نمط «التصميم بالعقد» (<em>Design by Contract</em>) في Clojure للتحقق من أن معامل cardinality قيمة مسموح بها.</li>
<li>نستخدم آلية تفكيك البنى (destructuring) في Clojure لتوفير قيمة افتراضية وهي <code>:db/single</code> إذا لم تُعطى قيمة.</li>
<li>نستخدم إمكانات البيانات الوصفية (metadata) في Clojure للتمييز بين بيانات الخاصية (الاسم والقيمة والأختام الزمنية) وبين بياناتها الوصفية (النوع والcardinality). وفي Clojure، تتم معالجة البيانات الوصفية باستخدام الدالتين <code>with-meta</code> (للضبط) و<code>meta</code> (للقراءة).</li>
</ul>
<p>لا تكون الخصائص ذات معنى إلا إذا كانت جزءًا من كيان. ونُنشئ هذا الاتصال بالدالة <code>add-attr</code>، التي تضيف خاصية معطاة إلى خريطة خصائص الكيان (المسماة <code>:attrs</code>).</p>
<p>ولاحظ أننا بدلًا من استخدام اسم الخاصية مباشرة، نحوّله أولًا إلى كلمة مفتاحية التزامًا بالاستخدام الاصطلابي لخرائط Clojure.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">add-attr</span> [ent attr]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [attr-id (<span class="hljs-name"><span class="hljs-built_in">keyword</span></span> (<span class="hljs-symbol">:name</span> attr))]
      (<span class="hljs-name">assoc-in</span> ent [<span class="hljs-symbol">:attrs</span> attr-id] attr)))
</code></pre>
<h3 id="التخزين">التخزين</h3>
<p>حتى الآن تحدثنا كثيرًا عن <em>ماذا</em> سنخزّن، دون التفكير في <em>أين</em> سنخزّنه. في هذا الفصل، نلجأ إلى أبسط آلية تخزين: تخزين البيانات في الذاكرة. وهذا ليس موثوقًا بالضرورة، لكنه يبسّط التطوير وتصحيح الأخطاء ويتيح لنا التركيز على أجزاء أكثر إثارة في البرنامج.</p>
<p>وسنصل إلى التخزين عبر <em>بروتوكول</em> (<em>protocol</em>) بسيط، مما يجعل من الممكن تعريف مزوّدين إضافيين للتخزين ليختار منهم مالك قاعدة البيانات.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defprotocol</span> <span class="hljs-title">Storage</span>
   (<span class="hljs-name">get-entity</span> [storage e-id] )
   (<span class="hljs-name">write-entity</span> [storage entity])
   (<span class="hljs-name">drop-entity</span> [storage entity]))
</code></pre>
<p>\\noindent وهذا هو تنقيذنا في الذاكرة للبروتوكول، الذي يستخدم خريطة بوصفها المخزن:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defrecord</span> <span class="hljs-title">InMemory</span> [] Storage
   (<span class="hljs-name">get-entity</span> [storage e-id] (<span class="hljs-name">e-id</span> storage))
   (<span class="hljs-name">write-entity</span> [storage entity] (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> storage (<span class="hljs-symbol">:id</span> entity) entity))
   (<span class="hljs-name">drop-entity</span> [storage entity] (<span class="hljs-name"><span class="hljs-built_in">dissoc</span></span> storage (<span class="hljs-symbol">:id</span> entity))))
</code></pre>
<h3 id="فهرسة-البيانات">فهرسة البيانات</h3>
<p>الآن بعد أن عرّفنا العناصر الأساسية لقاعدة بياناتنا، يمكننا أن نبدأ في التفكير كيف سنستعلمها. وبفضل الطريقة التي هيكلنا بها بياناتنا، فإن أي استعلام من المحتمَل أن يهتم، على الأقل، بمعرّف كيان واحد وباسم وقيمة بعض خصائصه. وهذه الثلاثية <code>(entity-id, attribute-name, attribute-value)</code> مهمة إلى حدٍّ كبير في عملية الاستعلام لدرجة أن نعطيها اسمًا صريحًا: وهي <em>datom</em>.</p>
<p>والـdatoms مهمة لأنها تمثل حقائق، وقاعدة بياناتنا تتراكم فيها الحقائق.</p>
<p>ولن أكون قد استخدمت نظام قاعدة بيانات من قبل، فأنت على الأرجح على اطلاع بالفعل بمفهوم <em>الفهرس</em> (_index)، وهو بنية بيانات داعمة تستهلك مسافة إضافية بهدف تقليل متوسط زمن الاستعلام. وفي قاعدة بياناتنا، الفهرس بنية من ثلاثة مستويات تخزّن مكونات الـdatom بترتيب محدد. ويشتق كل فهرس اسمه من الترتيب الذي يخزّن به مكونات الـdatom.</p>
<p>على سبيل المثال، لننظر في الفهرس المرسوم في \\aosafigref{500l.functionaldb.eavt}:</p>
<ul>
<li>المستوى الأول يخزّن معرّفات الكيانات</li>
<li>المستوى الثاني يخزّن أسماء الخصائص المرتبطة</li>
<li>المستوى الثالث يخزّن القيمة المرتبطة</li>
</ul>
<p>ويُسمى هذا الفهرس EAVT، لأن الخريطة في المستوى الأعلى تحمل معرّفات الكيانات (Entity IDs)، والمستوى الثاني يحمل أسماء الخصائص (Attribute names)، والأوراق تحمل القيم (Values). أما حرف «T» فيأتي من أن كل طبقة في قاعدة البيانات لها فهارسها الخاصة، لذا فإن الفهرس نفسه ذو صلة بزمن محدد (Time).</p>
<p>\\aosafigure[240pt]/images/500-lines/functionalDB-1-image_1.webp{EAVT}{500l.functionaldb.eavt}</p>
<p>ويُظهر \\aosafigref{500l.functionaldb.avet} فهرسًا سيُسمى AVET لأن:</p>
<ul>
<li>خريطة المستوى الأول تحمل اسم الخاصية.</li>
<li>خريطة المستوى الثاني تحمل القيم (للخصائص).</li>
<li>مجموعة المستوى الثالث تحمل معرّفات الكيانات (للكيانات التي خاصيتها في المستوى الأول).</li>
</ul>
<p>\\aosafigure[240pt]/images/500-lines/functionalDB-2-image_2.webp{AVET}{500l.functionaldb.avet}</p>
<p>تُنفَّذ فهارسنا على هيئة خريطة من خرائط، حيث مفاتيح الخريطة الجذرية تؤدّي دور المستوى الأول، ويشير كل مفتاح من هذه المفاتيح إلى خريطة مفاتيحها تؤدّي دور المستوى الثاني للفهرس، بينما القيم هي المستوى الثالث. وكل عنصر في المستوى الثالث مجموعة (set) تحمل أوراق الفهرس.</p>
<p>ويخزّن كل فهرس مكونات الـdatom بوصفها تبادلًا ما (permutation) لترتيبه المعياري «EAV» (entity_id, attribute-name, attribute-value). غير أن العمل مع الـdatoms <em>خارج</em> الفهرس يجري بمنتظرنا منها الصيغة المعيارية. ومن ثم نوفّر لكل فهرس الدالتين <code>from-eav</code> و<code>to-eav</code> للتحويل من وإلى هذه الترتيبات.</p>
<p>وفي معظم أنظمة قواعد البيانات، تكون الفهارس مكوّنًا اختياريًا؛ فمثلًا في RDBMS (نظام إدارة قواعد البيانات العلائقية) مثل PostgreSQL أو MySQL، ستختار إضافة فهارس إلى أعمدة بعينها في جدول فقط. ونوفّر لكل فهرس الدالة <code>usage-pred</code> التي تحدد، بالنسبة لخاصية، ما إذا كان ينبغي تضمينها في هذا الفهرس أم لا.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">make-index</span> [from-eav to-eav usage-pred]
    (<span class="hljs-name"><span class="hljs-built_in">with-meta</span></span> {} {<span class="hljs-symbol">:from-eav</span> from-eav <span class="hljs-symbol">:to-eav</span> to-eav <span class="hljs-symbol">:usage-pred</span> usage-pred}))
 
 (<span class="hljs-keyword">defn</span> <span class="hljs-title">from-eav</span> [index] (<span class="hljs-symbol">:from-eav</span> (<span class="hljs-name"><span class="hljs-built_in">meta</span></span> index)))
 (<span class="hljs-keyword">defn</span> <span class="hljs-title">to-eav</span> [index] (<span class="hljs-symbol">:to-eav</span> (<span class="hljs-name"><span class="hljs-built_in">meta</span></span> index)))
 (<span class="hljs-keyword">defn</span> <span class="hljs-title">usage-pred</span> [index] (<span class="hljs-symbol">:usage-pred</span> (<span class="hljs-name"><span class="hljs-built_in">meta</span></span> index)))
</code></pre>
<p>في قاعدة بياناتنا هناك أربعة فهارس: EAVT (انظر \\aosafigref{500l.functionaldb.eavt})، وAVET (انظر \\aosafigref{500l.functionaldb.avet})، وVEAT وVAET. يمكننا الوصول إليها بوصفها متجهًا من القيم التي تعيدها الدالة <code>indexes</code>.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">indexes</span>[] [<span class="hljs-symbol">:VAET</span> <span class="hljs-symbol">:AVET</span> <span class="hljs-symbol">:VEAT</span> <span class="hljs-symbol">:EAVT</span>])
</code></pre>
<p>ولكي نبيّن كيف يجتمع كل هذا معًا، فإن نتيجة فهرسة الكيانات الخمسة التالية موصّرة في \\aosatblref{500l.functionaldb.indextable}.</p>
<ol>
<li>يوليوس قيصر (المعروف أيضًا JC) يعيش في روما</li>
<li>بروتوس (المعروف أيضًا B) يعيش في روما</li>
<li>كليوباترا (المعروفة أيضًا Cleo) تعيش في مصر</li>
<li>نهر روما هو النهر Tiber</li>
<li>نهر مصر هو نهر النيل</li>
</ol>
<table>
  <tr>
    <td>فهرس EAVT</td>
    <td>فهرس AVET</td>
  </tr>
  <tr>
    <td><ul>
<li>
<span style="background-color:lightblue">JC</span> ⇒ {<span style="background-color:lightgreen">lives-in</span> ⇒ {<span style="background-color:pink">Rome</span>}}
</li>
<li>
<span style="background-color:lightblue">B</span>  ⇒ {<span style="background-color:lightgreen">lives-in</span> ⇒ {<span style="background-color:pink">Rome</span>}}
</li>
<li>
<span style="background-color:lightblue">Cleo</span> ⇒ {<span style="background-color:lightgreen">lives-in</span> ⇒ {<span style="background-color:pink">Egypt</span>}}
</li>
<li>
<span style="background-color:lightblue">Rome</span> ⇒ {<span style="background-color:lightgreen">river</span> ⇒ {<span style="background-color:pink">Tiber</span>}}
</li>
<li>
<span style="background-color:lightblue">Egypt</span> ⇒ {<span style="background-color:lightgreen">river</span> ⇒ {<span style="background-color:pink">Nile</span>}}
</li>
</ul></td>
<td><ul>
<li>
<span style="background-color:lightgreen">lives-in</span> ⇒ {<span style="background-color:pink">Rome</span> ⇒ {<span style="background-color:lightblue">JC, B</span>}}</br>
                         {<span style="background-color:pink">Egypt</span> ⇒ {<span style="background-color:lightblue">Cleo</span>}}
</li>
<li>
<span style="background-color:lightgreen">river</span> ⇒ {<span style="background-color:pink">Rome</span> ⇒ {<span style="background-color:lightblue">Tiber</span>}}</br>
{<span style="background-color:pink">Egypt</span> ⇒ {<span style="background-color:lightblue">Nile</span>}}
</li>
</ul></td>
  </tr>
  <tr>
    <td>فهرس VEAT</td>
    <td>فهرس VAET</td>
  </tr>
  <tr>
    <td><ul>
<li>
<span style="background-color:pink">Rome</span> ⇒ {<span style="background-color:lightblue">JC</span> ⇒ {<span style="background-color:lightgreen">lives-in</span>}}<br/>
{<span style="background-color:lightblue">B</span> ⇒ {<span style="background-color:lightgreen">lives-in</span>}}
</li>
<li>
<span style="background-color:pink">Egypt</span> ⇒ {<span style="background-color:lightblue">Cleo</span> ⇒ {<span style="background-color:lightgreen">lives-in</span>}}
</li>
<li>
<span style="background-color:pink">Tiber</span> ⇒ {<span style="background-color:lightblue">Rome</span> ⇒ {<span style="background-color:lightgreen">river</span>}}
</li>
<li>
<span style="background-color:pink">Nile</span> ⇒ {<span style="background-color:lightblue">Egypt</span> ⇒ {<span style="background-color:lightgreen">river</span>}}
</li></ul></td>
<td><ul>
<li>
<span style="background-color:pink">Rome</span> ⇒ {<span style="background-color:lightgreen">lives-in</span> ⇒ {<span style="background-color:lightblue">JC, B</span>}}
</li>
<li>
<span style="background-color:pink">Egypt</span> ⇒ {<span style="background-color:lightgreen">lives-in</span> ⇒ {<span style="background-color:lightblue">Cleo</span>}}</li>
<li>
<span style="background-color:pink">Tiber</span> ⇒ {<span style="background-color:lightgreen">river</span> ⇒ {<span style="background-color:lightblue">Rome</span>}}
</li>
<li>
<span style="background-color:pink">Nile</span> ⇒ {<span style="background-color:lightgreen">river</span> ⇒ {<span style="background-color:lightblue">Egypt</span>}}
</li></ul></td>
  </tr>
</table>
: \\label{500l.functionaldb.indextable} الفهارس
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{ll}
\\hline
\\textbf{EAVT index}
& \\textbf{AVET index}
\\\\
\\hline
JC $\\Rightarrow$ \\{lives-in $\\Rightarrow$ \\{Rome\\}\\} & lives-in $\\Rightarrow$ \\{Rome $\\Rightarrow$ \\{JC, B\\}\\}, \\{Egypt $\\Rightarrow$ \\{Cleo\\}\\} \\\\
B $\\Rightarrow$ \\{lives-in $\\Rightarrow$ \\{Rome\\}\\}  & river $\\Rightarrow$ \\{Rome $\\Rightarrow$ \\{Tiber\\}\\}, \\{Egypt $\\Rightarrow$ \\{Nile\\}\\} \\\\
Cleo $\\Rightarrow$ \\{lives-in $\\Rightarrow$ \\{Egypt\\}\\} & \\\\ 
Rome $\\Rightarrow$ \\{river $\\Rightarrow$ \\{Tiber\\}\\}  & \\\\ 
Egypt $\\Rightarrow$ \\{river $\\Rightarrow$ \\{Nile\\}\\}  & \\\\
\\hline
\\textbf{VEAT index}
& \\textbf{VAET index}
\\\\
\\hline
Rome $\\Rightarrow$ \\{JC $\\Rightarrow$ \\{lives-in\\}\\}, \\{B $\\Rightarrow$ \\{lives-in\\}\\} & Rome $\\Rightarrow$ \\{lives-in $\\Rightarrow$ \\{JC, B\\}\\} \\\\
Egypt $\\Rightarrow$ \\{Cleo $\\Rightarrow$ \\{lives-in\\}\\}                                & Egypt $\\Rightarrow$ \\{lives-in $\\Rightarrow$ \\{Cleo\\}\\} \\\\ 
Tiber $\\Rightarrow$ \\{Rome $\\Rightarrow$ \\{river\\}\\}                                   & Tiber $\\Rightarrow$ \\{river $\\Rightarrow$ \\{Rome\\}\\} \\\\
Nile $\\Rightarrow$ \\{Egypt $\\Rightarrow$ \\{river\\}\\}                                   & Nile $\\Rightarrow$ \\{river $\\Rightarrow$ \\{Egypt\\}\\} \\\\
\\hline
\\end{tabular}
}
\\caption{Indexes}
\\label{500l.functionaldb.indextable}
\\end{table}
</latex>
<p>\\newpage</p>
<h3 id="قاعدة-البيانات">قاعدة البيانات</h3>
<p>لدينا الآن جميع المكوّنات التي نحتاجها لبناء قاعدة بياناتنا. ويعني تهيئة قاعدة بياناتنا:</p>
<ul>
<li>إنشاء طبقة فارغة أولى لا تحتوي على بيانات</li>
<li>إنشاء مجموعة من الفهارس الفارغة</li>
<li>ضبط <code>top-id</code> و<code>curr-time</code> على 0</li>
</ul>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">ref?</span> [attr] (<span class="hljs-name"><span class="hljs-built_in">=</span></span> <span class="hljs-symbol">:db/ref</span> (<span class="hljs-symbol">:type</span> (<span class="hljs-name"><span class="hljs-built_in">meta</span></span> attr))))

(<span class="hljs-keyword">defn</span> <span class="hljs-title">always</span>[&amp; more] <span class="hljs-literal">true</span>)

(<span class="hljs-keyword">defn</span> <span class="hljs-title">make-db</span> []
   (<span class="hljs-name"><span class="hljs-built_in">atom</span></span> 
       (<span class="hljs-name">Database.</span> [(<span class="hljs-name">Layer.</span>
                   (<span class="hljs-name">fdb.storage.InMemory.</span>) <span class="hljs-comment">; storage</span>
                   (<span class="hljs-name">make-index</span> #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">3</span> %<span class="hljs-number">2</span> %<span class="hljs-number">1</span>) #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">3</span> %<span class="hljs-number">2</span> %<span class="hljs-number">1</span>) #(<span class="hljs-name">ref?</span> %))<span class="hljs-comment">;VAET                     </span>
                   (<span class="hljs-name">make-index</span> #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">2</span> %<span class="hljs-number">3</span> %<span class="hljs-number">1</span>) #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">3</span> %<span class="hljs-number">1</span> %<span class="hljs-number">2</span>) always)<span class="hljs-comment">;AVET                        </span>
                   (<span class="hljs-name">make-index</span> #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">3</span> %<span class="hljs-number">1</span> %<span class="hljs-number">2</span>) #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">2</span> %<span class="hljs-number">3</span> %<span class="hljs-number">1</span>) always)<span class="hljs-comment">;VEAT                       </span>
                   (<span class="hljs-name">make-index</span> #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">1</span> %<span class="hljs-number">2</span> %<span class="hljs-number">3</span>) #(<span class="hljs-name"><span class="hljs-built_in">vector</span></span> %<span class="hljs-number">1</span> %<span class="hljs-number">2</span> %<span class="hljs-number">3</span>) always)<span class="hljs-comment">;EAVT</span>
                  )] <span class="hljs-number">0</span> <span class="hljs-number">0</span>)))
</code></pre>
<p>هناك عقبة واحدة رغم ذلك: جميع المجموعات في Clojure غير قابلة للتغيير. ولأن عمليات الكتابة جوهرية في قاعدة البيانات، فإننا نعرّف بنية البيانات لتكون <em>Atom</em>، وهو نوع مرجعي في Clojure يوفّر إمكانية الكتابة الذرّية.</p>
<p>قد تتساءل لماذا نستخدم الدالة <code>always</code> لفهارس AVET وVEAT وEAVT، والمنبِّه <code>ref?</code> لفهرس VAET. السبب هو أن هذه الفهارس تُستخدم في سيناريوهات مختلفة، وهو ما سنراه لاحقًا عندما نستكشف الاستعلامات بعمق.</p>
<h3 id="المحددات-الأساسية">المحددات الأساسية</h3>
<p>قبل أن نتمكن من بناء مرافق استعلام معقدة لقاعدة بياناتنا، نحتاج إلى تقديم واجهة برمجية (API) منخفضة المستوى يمكن لأجزاء مختلفة من النظام استخدامها لجلب المكوّنات التي بنيناها حسب مُعرِّفات المرتبطة من أي لحظة زمنية. ويمكن لمستهلكي قاعدة البيانات أيضًا استخدام هذه الواجهة؛ غير أن من المرجح أكثر أن يستخدموا المكوّنات الأثقل مزايا المبنية فوقها.</p>
<p>تتألف هذه الواجهة منخفضة المستوى من دوال المحدد (accessor) الأربع التالية:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">entity-at</span>
   ([db ent-id] (<span class="hljs-name">entity-at</span> db (<span class="hljs-symbol">:curr-time</span> db) ent-id))
   ([db ts ent-id] (<span class="hljs-name">get-entity</span> (<span class="hljs-name"><span class="hljs-built_in">get-in</span></span> db [<span class="hljs-symbol">:layers</span> ts <span class="hljs-symbol">:storage</span>]) ent-id)))

(<span class="hljs-keyword">defn</span> <span class="hljs-title">attr-at</span>
   ([db ent-id attr-name] (<span class="hljs-name">attr-at</span> db ent-id attr-name (<span class="hljs-symbol">:curr-time</span> db)))
   ([db ent-id attr-name ts] (<span class="hljs-name"><span class="hljs-built_in">get-in</span></span> (<span class="hljs-name">entity-at</span> db ts ent-id) [<span class="hljs-symbol">:attrs</span> attr-name])))

(<span class="hljs-keyword">defn</span> <span class="hljs-title">value-of-at</span>
   ([db ent-id attr-name]  (<span class="hljs-symbol">:value</span> (<span class="hljs-name">attr-at</span> db ent-id attr-name)))
   ([db ent-id attr-name ts] (<span class="hljs-symbol">:value</span> (<span class="hljs-name">attr-at</span> db ent-id attr-name ts))))

(<span class="hljs-keyword">defn</span> <span class="hljs-title">indx-at</span>
   ([db kind] (<span class="hljs-name">indx-at</span> db kind (<span class="hljs-symbol">:curr-time</span> db)))
   ([db kind ts] (<span class="hljs-name">kind</span> ((<span class="hljs-symbol">:layers</span> db) ts))))
</code></pre>
<p>وبما أننا نتعامل مع قاعدة بياناتنا كما نتعامل مع أي قيمة أخرى، فإن كل واحدة من هذه الدوال تأخذ قاعدة البيانات كوسيط. ويُسترجع كل عنصر حسب مُعرِّفه المرتبط، وباختيار الطابع الزمني محل الاهتمام. ويُستخدم هذا الطابع الزمني للعثور على الطبقة المقابلة التي ينبغي أن يُطبَّق عليها بحثنا.</p>
<h4>التطوّر</h4>
<p>أولى استخدامات المحددات الأساسية هي توفير واجهة برمجية «تقرأ في الماضي». وهذا ممكن لأن عملية التحديث في قاعدة بياناتنا تتم بإلحاق طبقة جديدة (بدلًا من الدهس). ومن ثم يمكننا استخدام الخاصية <code>prev-ts</code> للنظر إلى الخاصية عند تلك الطبقة، ومتابعة النظر إلى عمق التاريخ لرصد كيفية تطوّر قيمة الخاصية عبر الزمن.</p>
<p>وهذا بالضبط ما تفعله الدالة <code>evolution-of</code>. فهي تُعيد تسلسلًا من الأزواج، كل زوج مكوّن من الطابع الزمني وقيمة تحديث خاصية ما.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">evolution-of</span> [db ent-id attr-name]
   (<span class="hljs-name"><span class="hljs-built_in">loop</span></span> [res [] ts (<span class="hljs-symbol">:curr-time</span> db)]
     (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> <span class="hljs-number">-1</span> ts) (<span class="hljs-name"><span class="hljs-built_in">reverse</span></span> res)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [attr (<span class="hljs-name">attr-at</span> db ent-id attr-name ts)]
           (<span class="hljs-name"><span class="hljs-built_in">recur</span></span> (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> res {(<span class="hljs-symbol">:ts</span> attr) (<span class="hljs-symbol">:value</span> attr)})  (<span class="hljs-symbol">:prev-ts</span> attr))))))
</code></pre>
<h2 id="سلوك-البيانات-ودورة-حياتها">سلوك البيانات ودورة حياتها</h2>
<p>حتى الآن، ركّزت مناقشتنا على بنية بياناتنا: ما المكوّنات الأساسية وكيف تُجمَع معًا. حان وقت استكشاف ديناميكيات نظامنا: كيف تتغير البيانات مع الزمن عبر دورة حياة البيانات: إضافة--تحديث--إزالة.</p>
<p>وكما ناقشنا من قبل، فإن البيانات في عالم الآثار لا تتغير حقًا. فبمجرد إنشائها تبقى موجودة إلى الأبد، ولا يمكن إخفاؤها عن العالم إلا ببيانات في طبقة أحدث. ومفهوم «الإخفاء» هو الأهم هنا. فالبيانات القديمة لا «تختفي»— بل تُدفن، ويمكن كشفها من جديد بإظهار طبقة أقدم. وبالمقابل، فإن تحديث البيانات يعني إخفاء القديمة بإضافة طبقة جديدة فوقها تحوي شيئًا آخر. ومن ثم يمكننا «حذف» البيانات بإضافة طبقة من «لا شيء» فوقها.</p>
<p>وهذا يعني أن ما نتحدث عنه حين نتحدث عن دورة حياة البيانات هو في الحقيقة إضافة طبقات إلى بياناتنا عبر الزمن.</p>
<h3 id="الضروريات-المجردة">الضروريات المجردة</h3>
<p>تتألف دورة حياة البيانات من ثلاث عمليات أساسية:</p>
<ul>
<li>إضافة كيان بالدالة <code>add-entity</code></li>
<li>إزالة كيان بالدالة <code>remove-entity</code></li>
<li>تحديث كيان بالدالة <code>update-entity</code></li>
</ul>
<p>وتذكّر أن هذه الدوال، رغم أنها توفّر وهم التغيير (mutation)، لا تفعل في كل حالة سوى إضافة طبقة أخرى إلى البيانات. وأيضًا، بما أننا نستخدم بنى بيانات دائمة (persistent) في Clojure، فإننا من منظور المستدعي ندفع الثمن نفسه مقابل هذه العمليات الذي ندفعه مقابل تغيير «في المكان» (أي عبء أداء مهمل)، مع الحفاظ على الثبات بالنسبة إلى جميع المستخدمين الآخرين لبنية البيانات.</p>
<h4>إضافة كيان</h4>
<p>تتطلب إضافة كيان أن نؤدي ثلاثة أمور:</p>
<ul>
<li>تحضير الكيان للإضافة (بمنحه معرِّفًا وطابعًا زمنيًا)</li>
<li>وضع الكيان في التخزين</li>
<li>تحديث الفهارس حسب الحاجة</li>
</ul>
<p>وتُنفَّذ هذه الخطوات في الدالة <code>add-entity</code>.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">add-entity</span> [db ent]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [[fixed-ent next-top-id] (<span class="hljs-name">fix-new-entity</span> db ent)
         layer-with-updated-storage (<span class="hljs-name"><span class="hljs-built_in">update-in</span></span> 
                            (<span class="hljs-name"><span class="hljs-built_in">last</span></span> (<span class="hljs-symbol">:layers</span> db)) [<span class="hljs-symbol">:storage</span>] write-entity fixed-ent)
         add-fn (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> add-entity-to-index fixed-ent)
         new-layer (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> add-fn layer-with-updated-storage (<span class="hljs-name">indexes</span>))]
    (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> db <span class="hljs-symbol">:layers</span> (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> (<span class="hljs-symbol">:layers</span> db) new-layer) <span class="hljs-symbol">:top-id</span> next-top-id)))
</code></pre>
<p>يتم تحضير الكيان باستدعاء الدالة <code>fix-new-entity</code> ودوالها المساعدة <code>next-id</code> و<code>next-ts</code> و<code>update-creation-ts</code>.
وتُعد دالتا المساعدة الأخيرتان مسؤولتين عن العثور على الطابع الزمني التالي لقاعدة البيانات (بواسطة <code>next-ts</code>)، وتحديث طابع الإنشاء للكيان المعطى (بواسطة <code>update-creation-ts</code>). وتحديث طابع إنشاء الكيان يعني المرور على خصائص الكيان وتحديث حقول <code>:ts</code> فيها.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">next-ts</span> [db] (<span class="hljs-name"><span class="hljs-built_in">inc</span></span> (<span class="hljs-symbol">:curr-time</span> db)))

(<span class="hljs-keyword">defn-</span> <span class="hljs-title">update-creation-ts</span> [ent ts-val]
   (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> #(<span class="hljs-name">assoc-in</span> %<span class="hljs-number">1</span> [<span class="hljs-symbol">:attrs</span> %<span class="hljs-number">2</span> <span class="hljs-symbol">:ts</span> ] ts-val) ent (<span class="hljs-name"><span class="hljs-built_in">keys</span></span> (<span class="hljs-symbol">:attrs</span> ent))))

(<span class="hljs-keyword">defn-</span> <span class="hljs-title">next-id</span> [db ent]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [top-id (<span class="hljs-symbol">:top-id</span> db)
         ent-id (<span class="hljs-symbol">:id</span> ent)
         increased-id (<span class="hljs-name"><span class="hljs-built_in">inc</span></span> top-id)]
         (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> ent-id <span class="hljs-symbol">:db/no-id-yet</span>)
             [(<span class="hljs-name"><span class="hljs-built_in">keyword</span></span> (<span class="hljs-name"><span class="hljs-built_in">str</span></span> increased-id)) increased-id]
             [ent-id top-id])))

(<span class="hljs-keyword">defn-</span> <span class="hljs-title">fix-new-entity</span> [db ent]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [[ent-id next-top-id] (<span class="hljs-name">next-id</span> db ent)
         new-ts               (<span class="hljs-name">next-ts</span> db)]
       [(<span class="hljs-name">update-creation-ts</span> (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> ent <span class="hljs-symbol">:id</span> ent-id) new-ts) next-top-id]))
</code></pre>
<p>ولإضافة الكيان إلى التخزين، فإننا نحدد أحدث طبقة في قاعدة البيانات ونحدّث التخزين في تلك الطبقة بطبقة جديدة، تُحفظ نتائجها في <code>layer-with-updated-storage</code>.</p>
<p>وأخيرًا، علينا تحديث الفهارس. أي، لكل فهرس (بواسطة التركيبة بين <code>reduce</code> و<code>add-entity-to-index</code> المُمرَّرة جزئيًا عبر <code>partial</code> في الدالة <code>add-entity</code>):</p>
<ul>
<li>إيجاد الخصائص التي ينبغي فهرستها (انظر التركيبة بين <code>filter</code> و<code>usage-pred</code> الخاص بالفهرس الذي يعمل على الخصائص في <code>add-entity-to-index</code>)</li>
<li>بناء مسار فهرس من معرّف الكيان (انظر التركيبة بين <code>update-entry-in-index</code> المُمرَّرة جزئيًا عبر \\newline <code>partial</code> مع <code>from-eav</code> في الدالة <code>update-attr-in-index</code>)</li>
<li>إضافة ذلك المسار إلى الفهرس (انظر الدالة <code>update-entry-in-index</code>)</li>
</ul>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">add-entity-to-index</span> [ent layer ind-name]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [ent-id (<span class="hljs-symbol">:id</span> ent)
         index (<span class="hljs-name">ind-name</span> layer)
         all-attrs  (<span class="hljs-name"><span class="hljs-built_in">vals</span></span> (<span class="hljs-symbol">:attrs</span> ent))
         relevant-attrs (<span class="hljs-name"><span class="hljs-built_in">filter</span></span> #((<span class="hljs-name">usage-pred</span> index) %) all-attrs)
         add-in-index-fn (<span class="hljs-name"><span class="hljs-built_in">fn</span></span> [ind attr] 
                                 (<span class="hljs-name">update-attr-in-index</span> ind ent-id (<span class="hljs-symbol">:name</span> attr) 
                                                                  (<span class="hljs-symbol">:value</span> attr) 
                                                                  <span class="hljs-symbol">:db/add</span>))]
        (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> layer ind-name  (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> add-in-index-fn index relevant-attrs))))

(<span class="hljs-keyword">defn-</span> <span class="hljs-title">update-attr-in-index</span> [index ent-id attr-name target-val operation]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [colled-target-val (<span class="hljs-name">collify</span> target-val)
         update-entry-fn (<span class="hljs-name"><span class="hljs-built_in">fn</span></span> [ind vl] 
                             (<span class="hljs-name">update-entry-in-index</span> 
                                ind 
                                ((<span class="hljs-name">from-eav</span> index) ent-id attr-name vl) 
                                operation))]
     (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> update-entry-fn index colled-target-val)))
     
(<span class="hljs-keyword">defn-</span> <span class="hljs-title">update-entry-in-index</span> [index path operation]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [update-path (<span class="hljs-name"><span class="hljs-built_in">butlast</span></span> path)
         update-value (<span class="hljs-name"><span class="hljs-built_in">last</span></span> path)
         to-be-updated-set (<span class="hljs-name"><span class="hljs-built_in">get-in</span></span> index update-path #{})]
     (<span class="hljs-name">assoc-in</span> index update-path (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> to-be-updated-set update-value))))
</code></pre>
<p>تُضاف جميع هذه المكوّنات بوصفها طبقة جديدة إلى قاعدة البيانات المعطاة. ولم يبقَ سوى تحديث حقول الطابع الزمني و<code>top-id</code> في قاعدة البيانات. وتحدث هذه الخطوة الأخيرة في السطر الأخير من <code>add-entity</code>، الذي يُعيد أيضًا قاعدة البيانات المحدَّثة.</p>
<p>كما نوفّر دالة راحة <code>add-entities</code> تضيف كيانات متعددة إلى قاعدة البيانات باستدعاء واحد، عبر تطبيق <code>add-entity</code> بشكل متكرر.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">add-entities</span> [db ents-seq] (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> add-entity db ents-seq))
</code></pre>
<h4>إزالة كيان</h4>
<p>تعني إزالة كيان من قاعدة بياناتنا إضافة طبقة لا يوجد فيها. وللقيام بذلك، نحتاج إلى:</p>
<ul>
<li>إزالة الكيان نفسه</li>
<li>تحديث أي خصائص لكيانات أخرى تشير إليه</li>
<li>مسح الكيان من فهارسنا</li>
</ul>
<p>وتُنفَّذ هذه العملية المعروفة بـ«البناء بدون» (construct-without) في الدالة <code>remove-entity</code>، التي تبدو مشابهة جدًا لـ<code>add-entity</code>:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">remove-entity</span> [db ent-id]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [ent (<span class="hljs-name">entity-at</span> db ent-id)
         layer (<span class="hljs-name">remove-back-refs</span> db ent-id (<span class="hljs-name"><span class="hljs-built_in">last</span></span> (<span class="hljs-symbol">:layers</span> db)))
         no-ref-layer (<span class="hljs-name"><span class="hljs-built_in">update-in</span></span> layer [<span class="hljs-symbol">:VAET</span>] dissoc ent-id)
         no-ent-layer (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> no-ref-layer <span class="hljs-symbol">:storage</span> 
                                   (<span class="hljs-name">drop-entity</span>  
                                          (<span class="hljs-symbol">:storage</span> no-ref-layer) ent))
         new-layer (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> remove-entity-from-index ent) 
                                 no-ent-layer (<span class="hljs-name">indexes</span>))]
     (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> db <span class="hljs-symbol">:layers</span> (<span class="hljs-name"><span class="hljs-built_in">conj</span></span>  (<span class="hljs-symbol">:layers</span> db) new-layer))))
</code></pre>
<p>ويتم إزالة المراجع بالدالة <code>remove-back-refs</code>:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">remove-back-refs</span> [db e-id layer]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [reffing-datoms (<span class="hljs-name">reffing-to</span> e-id layer)
         remove-fn (<span class="hljs-name"><span class="hljs-built_in">fn</span></span>[d [e a]] (<span class="hljs-name">update-entity</span> db e a e-id <span class="hljs-symbol">:db/remove</span>))
         clean-db (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> remove-fn db reffing-datoms)]
     (<span class="hljs-name"><span class="hljs-built_in">last</span></span> (<span class="hljs-symbol">:layers</span> clean-db))))
</code></pre>
<p>نبدأ باستخدام <code>reffing-datoms-to</code> للعثور على جميع الكيانات التي تشير إلينا في الطبقة المعطاة؛ وهي تُعيد تسلسلًا من الثلاثيات التي تحتوي معرّف الكيان المُشير، فضلًا عن اسم الخاصية ومعرّف الكيان المُزال.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">reffing-to</span> [e-id layer]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [vaet (<span class="hljs-symbol">:VAET</span> layer)]
         (<span class="hljs-name"><span class="hljs-built_in">for</span></span> [[attr-name reffing-set] (<span class="hljs-name">e-id</span> vaet)
               reffing reffing-set]
              [reffing attr-name])))

</code></pre>
<p>ثم نطبّق <code>update-entity</code> على كل ثلاثية لتحديث الخصائص التي تشير إلى كياننا المُزال. (وسنستكشف كيف تعمل <code>update-entity</code> في القسم التالي.)</p>
<p>والخطوة الأخيرة في <code>remove-back-refs</code> هي مسح المرجع نفسه من فهارسنا، وتحديدًا من فهرس VAET، لأنه الفهرس الوحيد الذي يخزّن معلومات المراجع.</p>
<h4>تحديث كيان</h4>
<p>جوهر التحديث هو تعديل قيمة خاصية كيان. وعملية التعديل نفسها تعتمد على cardinality الخاصية: فالخاصية التي cardinality لها هو <code>:db/multiple</code> تحمل مجموعة قيم، لذا يجب أن نسمح بإضافة عناصر إلى هذه المجموعة أو إزالتها منها أو استبدال المجموعة بالكامل. أما الخاصية التي cardinality لها هو <code>:db/single</code> فتحمل قيمة واحدة، ولا تسمح إلا بالاستبدال.</p>
<p>وبما لدينا أيضًا فهارس توفّر عمليات بحث مباشرة على الخصائص وقيمها، فإن هذه الفهارس يتعيّن تحديثها هي أيضًا.</p>
<p>وكما في <code>add-entity</code> و<code>remove-entity</code>، فنحن لن نعدّل كياننا في مكانه في الواقع، بل سنضيف طبقة جديدة تحتوي على الكيان المحدَّث.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">update-entity</span>
   ([db ent-id attr-name new-val]
    (<span class="hljs-name">update-entity</span> db ent-id attr-name new-val <span class="hljs-symbol">:db/reset-to</span>))
   ([db ent-id attr-name new-val operation]
      (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [update-ts (<span class="hljs-name">next-ts</span> db)
            layer (<span class="hljs-name"><span class="hljs-built_in">last</span></span> (<span class="hljs-symbol">:layers</span> db))
            attr (<span class="hljs-name">attr-at</span> db ent-id attr-name)
            updated-attr (<span class="hljs-name">update-attr</span> attr new-val update-ts operation)
            fully-updated-layer (<span class="hljs-name">update-layer</span> layer ent-id 
                                              attr updated-attr 
                                              new-val operation)]
        (<span class="hljs-name"><span class="hljs-built_in">update-in</span></span> db [<span class="hljs-symbol">:layers</span>] conj fully-updated-layer))))
</code></pre>
<p>ولتحديث خاصية، فإننا نحدّدها بـ<code>attr-at</code> ثم نستخدم <code>update-attr</code> لإجراء التحديث الفعلي.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">update-attr</span> [attr new-val new-ts operation]
    {<span class="hljs-symbol">:pre</span>  [(<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">single?</span> attr)
            (<span class="hljs-name"><span class="hljs-built_in">contains?</span></span> #{<span class="hljs-symbol">:db/reset-to</span> <span class="hljs-symbol">:db/remove</span>} operation)
            (<span class="hljs-name"><span class="hljs-built_in">contains?</span></span> #{<span class="hljs-symbol">:db/reset-to</span> <span class="hljs-symbol">:db/add</span> <span class="hljs-symbol">:db/remove</span>} operation))]}
    (<span class="hljs-name"><span class="hljs-built_in">-&gt;</span></span> attr
       (<span class="hljs-name">update-attr-modification-time</span> new-ts)
       (<span class="hljs-name">update-attr-value</span> new-val operation)))
</code></pre>
<p>ونستخدم دالتي مساعدة لإجراء التحديث. فالدالة <code>update-attr-modification-time</code> تحدّث الأختام الزمنية لتعكس نشأة الأسهم السوداء في الشكل 1:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">update-attr-modification-time</span>  
  [attr new-ts]
       (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> attr <span class="hljs-symbol">:ts</span> new-ts <span class="hljs-symbol">:prev-ts</span> (<span class="hljs-symbol">:ts</span> attr)))
</code></pre>
<p>والدالة <code>update-attr-value</code> تحدّث القيمة فعليًا:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">update-attr-value</span> [attr value operation]
   (<span class="hljs-name"><span class="hljs-built_in">cond</span></span>
      (<span class="hljs-name">single?</span> attr)    (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> attr <span class="hljs-symbol">:value</span> #{value})
      <span class="hljs-comment">; now we&#x27;re talking about an attribute of multiple values</span>
      (<span class="hljs-name"><span class="hljs-built_in">=</span></span> <span class="hljs-symbol">:db/reset-to</span> operation) 
        (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> attr <span class="hljs-symbol">:value</span> value)
      (<span class="hljs-name"><span class="hljs-built_in">=</span></span> <span class="hljs-symbol">:db/add</span> operation) 
        (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> attr <span class="hljs-symbol">:value</span> (<span class="hljs-name">CS/union</span> (<span class="hljs-symbol">:value</span> attr) value))
      (<span class="hljs-name"><span class="hljs-built_in">=</span></span> <span class="hljs-symbol">:db/remove</span> operation)
        (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> attr <span class="hljs-symbol">:value</span> (<span class="hljs-name">CS/difference</span> (<span class="hljs-symbol">:value</span> attr) value))))
</code></pre>
<p>ولم يبقَ سوى إزالة القيمة القديمة من الفهارس وإضافة القيمة الجديدة إليها، ثم بناء الطبقة الجديدة بجميع مكوّناتنا المحدَّثة. ولحسن الحظ، يمكننا الاستفادة من الشيفرة التي كتبناها لإضافة الكيانات وإزالتها للقيام بذلك.</p>
<h3 id="المعاملات">المعاملات</h3>
<p>كل عملية في واجهتنا البرمجية منخفضة المستوى تعمل على كيان واحد. غير أن كل قاعدة بيانات تقريبًا توفّر للمستخدمين وسيلة لتنفيذ عمليات متعددة بوصفها <em>معاملة واحدة</em> (<em>transaction</em>). وهذا يعني:</p>
<ul>
<li>تُنظر حزمة العمليات على أنها عملية ذرّية واحدة، بحيث تنجح جميع العمليات معًا أو تفشل جميعها معًا.</li>
<li>تكون قاعدة البيانات في حالة صالحة قبل المعاملة وبعدها.</li>
<li>تبدو حزمة التحديثات معزولة (<em>isolated</em>)؛ فلا ينبغي أن يرى أي استعلام آخر حالة قاعدة بيانات لم تُطبَّق فيها سوى بعض العمليات.</li>
</ul>
<p>يمكننا استيفاء هذه المتطلبات عبر واجهة تستهلك قاعدة بيانات ومجموعة عمليات يُنظر إليها، وتُنتج قاعدة بيانات تعكس التغييرات المعطاة. وينبغي تطبيق جميع التغييرات المقدَّمة في الحزمة عبر إضافة طبقة <em>واحدة</em>. لكن لدينا مشكلة: جميع الدوال التي كتبناها في واجهتنا البرمجية منخفضة المستوى تضيف طبقة جديدة إلى قاعدة البيانات. فلو نفّذنا حزمة بـ$n$ عمليات، ل رأينا $n$ طبقة جديدة تُضاف، بينما ما نريده حقًا هو طبقة جديدة واحدة بالضبط.</p>
<p>المفتاح هنا هو أن الطبقة التي نريدها هي الطبقة <em>العليا</em> (<em>top</em>) التي كان سينتجها تنفيذ تلك التحديثات بالتسلسل. وعليه، فإن الحل هو تنفيذ عمليات المستخدم واحدة تلو الأخرى، كل منها تُنشئ طبقة جديدة. وحين تُنشأ الطبقة الأخيرة، نأخذ تلك الطبقة العليا فحسب ونضعها على قاعدة البيانات الأولية (مع ترك كل الطبقات الوسيطة تشتاق إلى الفيوردات). ولن نحدّث الطابع الزمني لقاعدة البيانات إلا بعد أن نكون قد أنهينا كل هذا.</p>
<p>ويجري كل هذا في الدالة <code>transact-on-db</code>، التي تتلقّى القيمة الأولية لقاعدة البيانات وحزمة العمليات المراد تنفيذها، وتُعيد قيمتها المحدَّثة.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">transact-on-db</span> [initial-db ops]
    (<span class="hljs-name"><span class="hljs-built_in">loop</span></span> [[op &amp; rst-ops] ops transacted initial-db]
      (<span class="hljs-name"><span class="hljs-built_in">if</span></span> op
          (<span class="hljs-name"><span class="hljs-built_in">recur</span></span> rst-ops (<span class="hljs-name"><span class="hljs-built_in">apply</span></span> (<span class="hljs-name"><span class="hljs-built_in">first</span></span> op) transacted (<span class="hljs-name"><span class="hljs-built_in">rest</span></span> op)))
          (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [initial-layer  (<span class="hljs-symbol">:layers</span> initial-db)
                new-layer (<span class="hljs-name"><span class="hljs-built_in">last</span></span> (<span class="hljs-symbol">:layers</span> transacted))]
            (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> initial-db <span class="hljs-symbol">:layers</span> (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> initial-layer new-layer) 
                              <span class="hljs-symbol">:curr-time</span> (<span class="hljs-name">next-ts</span> initial-db) 
                              <span class="hljs-symbol">:top-id</span> (<span class="hljs-symbol">:top-id</span> transacted))))))
</code></pre>
<p>ولاحظ أننا استخدمنا هنا مصطلح <em>القيمة</em>، ما يعني أن المُطالِع على هذه الدالة وحده هو من يرى الحالة المحدَّثة؛ أما جميع المستخدمين الآخرين لقاعدة البيانات فلا يعلمون بهذا التغيير (لأن قاعدة البيانات قيمة، وبالتالي لا يمكن أن تتغير).
ولكي نحصل على نظام يستطيع فيه المستخدمون رؤية تغييرات الحالة التي أجراها الآخرون، لا يتفاعل المستخدمون مع قاعدة البيانات مباشرة، بل يشيران إليها عبر مستوى آخر من التوجيه (indirection). وهذا المستوى الإضافي مُنفَّذ باستخدام <code>Atom</code> في Clojure، وهو نوع مرجعي. وهنا نستفيد من ثلاث صفات رئيسية لـ<code>Atom</code>، وهي:</p>
<ol>
<li>إنه يشير إلى قيمة.</li>
<li>من الممكن تحديث الإشارة التي يشير إليها <code>Atom</code> إلى قيمة أخرى بتنفيذ معاملة (باستخدام قدرات الذاكرة المعاملات البرمجية في Clojure). تقبل المعاملة <code>Atom</code> ودالة. وتعمل هذه الدالة على قيمة <code>Atom</code> وتُعيد قيمة جديدة. وبعد تنفيذ المعاملة، يشير <code>Atom</code> إلى القيمة التي أُعيدت من الدالة.</li>
<li>والوصول إلى القيمة التي يشير إليها <code>Atom</code> يتم عبر فكّ الإشارة إليها (dereferencing)، وهو ما يُعيد حالة ذلك <code>Atom</code> في ذلك الوقت.</li>
</ol>
<p>وبين <code>Atom</code> في Clojure والعمل المنفَّذ في <code>transact-on-db</code>، ما زال ثمة فجوة يتعيّب ردمها؛ وتحديدًا استدعاء المعاملة بالمدخلات الصحيحة.</p>
<p>ولكي نحصل على أبسط ووضوح واجهات برمجية، نودّ أن يقدّم المستخدمون ببساطة <code>Atom</code> وقائمة العمليات، وتقوم قاعدة البيانات بتحويل مُدخَل المستخدم إلى معاملة سليمة.</p>
<p>ويحدث هذا التحويل في سلسلة استدعاءات المعاملة التالية:</p>
<pre><code>transact →  _transact → swap! → transact-on-db
</code></pre>
<p>يستدعي المستخدمون <code>transact</code> مع <code>Atom</code> (أي الاتصال) والعمليات المراد تنفيذها، وهي تبدّل مُدخلها إلى <code>_transact</code>، مُضافةً إليها اسم الدالة التي تحدّث <code>Atom</code> وهي <code>swap!</code>.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span> <span class="hljs-title">transact</span> [db-conn &amp; txs]  \`(<span class="hljs-name">_transact</span> ~db-conn swap! ~@txs))
</code></pre>
<p>وتُهيّئ <code>_transact</code> الاستدعاء إلى <code>swap!</code>. وتفعل ذلك بإنشاء قائمة تبدأ بـ<code>swap!</code>، يليها <code>Atom</code>، ثم الرمز <code>transact-on-db</code> وحزمة العمليات.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span>  <span class="hljs-title">_transact</span> [db op &amp; txs]
   (<span class="hljs-name"><span class="hljs-built_in">when</span></span> txs
     (<span class="hljs-name"><span class="hljs-built_in">loop</span></span> [[frst-tx# &amp; rst-tx#] txs  res#  [op db \`transact-on-db]  accum-txs# []]
       (<span class="hljs-name"><span class="hljs-built_in">if</span></span> frst-tx#
           (<span class="hljs-name"><span class="hljs-built_in">recur</span></span> rst-tx# res#  (<span class="hljs-name"><span class="hljs-built_in">conj</span></span>  accum-txs#  (<span class="hljs-name"><span class="hljs-built_in">vec</span></span> frst-tx#)))
           (<span class="hljs-name"><span class="hljs-built_in">list*</span></span> (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> res#  accum-txs#))))))
</code></pre>
<p>يستدعي <code>swap!</code> الدالة <code>transact-on-db</code> داخل معاملة (بالمدخلات المُهيّأة سابقًا)، وتُنشئ <code>transact-on-db</code> الحالة الجديدة لقاعدة البيانات وتُعيدها.</p>
<p>وفي هذه المرحلة يمكننا أن نرى أنه بتعديلات طفيفة قليلة يمكننا أيضًا توفير وسيلة لطرح أسئلة «ماذا لو». ويمكن أن يتم ذلك باستبدال <code>swap!</code> بدالة لا تُحدث أي تغيير في النظام. وهذا السيناريو مُنفَّذ بسلسلة استدعاءات <code>what-if</code>:</p>
<p><code>what-if</code> $\\to$ <code>_transact</code> $\\to$ <code>_what-if</code> $\\to$ <code>transact-on-db</code></p>
<p>يستدعي المستخدم <code>what-if</code> مع قيمة قاعدة البيانات والعمليات المراد تنفيذها. ثم يبدّل هذه المدخلات إلى <code>_transact</code>، مُضيفًا إليها دالة تحاكي واجهات <code>swap!</code> دون أثرها (المسماة <code>_what-if</code>).</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span> <span class="hljs-title">what-if</span> [db &amp; ops]  \`(<span class="hljs-name">_transact</span> ~db _what-if  ~@ops))
</code></pre>
<p>وتُهيّئ <code>_transact</code> الاستدعاء إلى <code>_what-if</code>. وتفعل ذلك بإنشاء قائمة تبدأ بـ<code>_what-if</code>، يليها قاعدة البيانات، ثم الرمز <code>transact-on-db</code> وحزمة العمليات. وتستدعي <code>_what-if</code> الدالة <code>transact-on-db</code>، تمامًا كما يفعل <code>swap!</code> في سيناريو المعاملة، لكنها لا تُلحق أي تغيير بالنظام.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn-</span> <span class="hljs-title">_what-if</span> [db f txs]  (<span class="hljs-name">f</span> db txs))
</code></pre>
<p>ولاحظ أننا لا نستخدم دوال بل ماكروهات. وسبب استخدامنا للماكروهات هنا هو أن وسائط الماكرو لا تُقيَّم عندحدوث الاستدعاء؛ وهذا يتيح لنا تقديم تصميم واجهة أنظف يقدّم فيه المستخدم العمليات مُنظَّمة بالطريقة نفسها التي يُنظَّم بها أي استدعاء دالة في Clojure.</p>
<p>ويمكن رؤية العملية أعلاه في الأمثلة التالية. بالنسبة إلى المعاملة، يكون استدعاء المستخدم:</p>
<pre><code class="language-clojure">(<span class="hljs-name">transact</span> db-conn  (<span class="hljs-name">add-entity</span> e1) (<span class="hljs-name">update-entity</span> e2 atr2 val2 <span class="hljs-symbol">:db/add</span>))  
</code></pre>
<p>يتحوّل إلى:</p>
<pre><code class="language-clojure">(<span class="hljs-name">_transact</span> db-conn swap! (<span class="hljs-name">add-entity</span> e1) (<span class="hljs-name">update-entity</span> e2 atr2 val2 <span class="hljs-symbol">:db/add</span>))
</code></pre>
<p>والذي يصبح:</p>
<pre><code class="language-clojure">(<span class="hljs-name"><span class="hljs-built_in">swap!</span></span> db-conn transact-on-db [[add-entity e1][update-entity e2 atr2 val2 <span class="hljs-symbol">:db/add</span>]])
</code></pre>
<p>وبالنسبة إلى what-if، يكون استدعاء المستخدم:</p>
<pre><code class="language-clojure">(<span class="hljs-name">what-if</span> my-db (<span class="hljs-name">add-entity</span> e3) (<span class="hljs-name">remove-entity</span> e4))
</code></pre>
<p>يتحوّل إلى:</p>
<pre><code class="language-clojure">(<span class="hljs-name">_transact</span> my-db _what-if (<span class="hljs-name">add-entity</span> e3) (<span class="hljs-name">remove-entity</span> e4))
</code></pre>
<p>ثم:</p>
<pre><code class="language-clojure">(<span class="hljs-name">_what-if</span> my-db transact-on-db [[add-entity e3] [remove-entity e4]])
</code></pre>
<p>وفي النهاية:</p>
<pre><code class="language-clojure">(<span class="hljs-name">transact-on-db</span> my-db  [[add-entity e3] [remove-entity e4]])
</code></pre>
<h2 id="استخراج-الرؤى-في-هيئة-مكتبات">استخراج الرؤى في هيئة مكتبات</h2>
<p>أصبح لدينا الآن الوظيفة الأساسية لقاعدة البيانات في مكانها، وحان الوقت لإضافة سبب وجودها (<em>raison d’être</em>): استخراج الرؤى. والمقاربة المعمارية التي استخدمناها هنا هي السماح بإضافة هذه القدرات بوصفها مكتبات، لأن مختلف استعمالات قاعدة البيانات ستحتاج آليات مختلفة من هذا النوع.</p>
<h3 id="اجتياز-الرسوم-البيانية">اجتياز الرسوم البيانية</h3>
<p>يُنشأ اتصال مرجعي بين الكيانات عندما يكون نوع خاصية كيان ما هو <code>:db/ref</code>، أي أن قيمة تلك الخاصية هي معرّف كيان آخر. وحين يُضاف كيان مُشير إلى قاعدة البيانات، تُفهرس المرجع في فهرس VAET.
ويمكن الاستفادة من المعلومات الموجودة في فهرس VAET لاستخراج جميع الروابط الداخلة إلى كيان. ويتم ذلك في الدالة <code>incoming-refs</code>، التي تجمع كل الأوراق التي يمكن بلوغها من الكيان عند ذلك الفهرس:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">incoming-refs</span> [db ts ent-id &amp; ref-names]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [vaet (<span class="hljs-name">indx-at</span> db <span class="hljs-symbol">:VAET</span> ts)
         all-attr-map (<span class="hljs-name">vaet</span> ent-id)
         filtered-map (<span class="hljs-name"><span class="hljs-built_in">if</span></span> ref-names 
                          (<span class="hljs-name"><span class="hljs-built_in">select-keys</span></span> ref-names all-attr-map) 
                          all-attr-map)]
      (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> into #{} (<span class="hljs-name"><span class="hljs-built_in">vals</span></span> filtered-map))))
</code></pre>
<p>ويمكننا أيضًا المرور على جميع خصائص كيان معطى وجمع كل قيم الخصائص من نوع <code>:db/ref</code>، وبذلك نستخرج كل المراجع الخارجة من ذلك الكيان. ويقوم بذلك الدالة <code>outgoing-refs</code>.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">outgoing-refs</span> [db ts ent-id &amp; ref-names]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [val-filter-fn (<span class="hljs-name"><span class="hljs-built_in">if</span></span> ref-names #(<span class="hljs-name"><span class="hljs-built_in">vals</span></span> (<span class="hljs-name"><span class="hljs-built_in">select-keys</span></span> ref-names %)) vals)]
   (<span class="hljs-name"><span class="hljs-built_in">if-not</span></span> ent-id []
     (<span class="hljs-name"><span class="hljs-built_in">-&gt;&gt;</span></span> (<span class="hljs-name">entity-at</span> db ts ent-id)
          (<span class="hljs-symbol">:attrs</span>) (<span class="hljs-name">val-filter-fn</span>) (<span class="hljs-name"><span class="hljs-built_in">filter</span></span> ref?) (<span class="hljs-name"><span class="hljs-built_in">mapcat</span></span> <span class="hljs-symbol">:value</span>)))))
</code></pre>
<p>تعمل هاتان الدالتان بوصفهما اللبنتين الأساسيتين لأي عملية اجتياز في الرسوم البيانية، لأنهما اللتان ترفعان مستوى التجريد من الكيانات والخصائص إلى العقد والوصلات في رسم بياني. وبمجرد أن نتمكّن من النظر إلى قاعدة بياناتنا بوصفها رسمًا بيانيًا، يمكننا أن نقدّم واجهات برمجية متنوّعة لاجتياز الرسوم البيانية والاستعلام عنها. ونترك هذا تمرينًا محلولًا للقارئ؛ ويمكن العثور على أحد الحلول في شيفرة مصدر الفصل (انظر <code>graph.clj</code>).</p>
<h2 id="الاستعلام-عن-قاعدة-البيانات">الاستعلام عن قاعدة البيانات</h2>
<p>توفّر المكتبة الثانية التي نقدّمها قدرات الاستعلام، وهي الرئيسي اهتمام هذا القسم.
ولا تقل قاعدة البيانات نفعًا لمستخدميها كثيرًا من دون آلية استعلام قوية. وعادة ما تُتاح هذه الميزة للمستخدمين عبر <em>لغة استعلام</em> (<em>query language</em>) تُستخدم لتحديد مجموعة البيانات محل الاهتمام تصريحيًا.</p>
<p>يعتمد نموذج بياناتنا على تراكم الحقائق (أي الـdatoms) عبر الزمن. وبالنسبة لهذا النموذج، فإن المكان الطبيعي للبحث عن لغة الاستعلام الملائمة هو <em>البرمجة المنطقية</em> (<em>logic programming</em>). ومن لغات الاستعلام الشائعة التي تأثرت بالبرمجة المنطقية لغة <em>Datalog</em> التي، إضافة إلى ملاءمتها لنموذج بياناتنا، لديها تكيف أنيق جدًا مع صياغة Clojure. وستنفّذ محرّك الاستعلام لدينا مجموعة فرعية من لغة Datalog من <a href="http://docs.datomic.com/query.html">قاعدة بيانات Datomic</a>.</p>
<h3 id="لغة-الاستعلام">لغة الاستعلام</h3>
<p>لننظر في مثال استعلام بلغتنا المقترحة. هذا الاستعلام يسأل: «ما أسماء الكيانات وتواريخ ميلادها التي تحب البيتزا وتتحدث الإنجليزية ولديها عيد ميلاد في هذا الشهر؟»</p>
<pre><code class="language-clojure">{  <span class="hljs-symbol">:find</span> [?nm ?bd ]
   <span class="hljs-symbol">:where</span> [
      [?e  <span class="hljs-symbol">:likes</span> <span class="hljs-string">&quot;pizza&quot;</span>]
      [?e  <span class="hljs-symbol">:name</span>  ?nm]
      [?e  <span class="hljs-symbol">:speak</span> <span class="hljs-string">&quot;English&quot;</span>]
      [?e  <span class="hljs-symbol">:bday</span> (<span class="hljs-name">bday-mo?</span> ?bd)]]}
</code></pre>
<h4>الصياغة</h4>
<p>نستخدم صياغة البيانات الحرفية في Clojure مباشرة لتوفير الصياغة الأساسية لاستعلاماتنا. وهذا يتيح لنا تفادي الحاجة إلى كتابة محلّل (parser) متخصص، مع الاستمرار في توفير صورة مألوفة وسهلة القراءة للمبرمجين المعتادين على Clojure.</p>
<p>والاستعلام خريطة بعنصرين:</p>
<ul>
<li>عنصر المفتاح فيه <code>:where</code> والقيمة <em>قاعدة</em> (<em>rule</em>). والقاعدة متجه من <em>جُمل</em> (<em>clauses</em>)، والجملة متجه مكوّن من ثلاثة <em>مسندات</em> (<em>predicates</em>)، كل مسند يعمل على مكوّن مختلف من الـdatom. وفي المثال أعلاه، <code>[?e  :likes &quot;pizza&quot;]</code> هي جملة. ويعرّف عنصر <code>:where</code> هذه قاعدة تؤدّي دور مُرشِّح على الـdatoms في قاعدة بياناتنا (مثل بند <code>WHERE</code> في SQL.)</li>
<li>عنصر المفتاح فيه <code>:find</code> والقيمة متجه. ويحدّد المتجه مكوّنات الـdatom المختار التي ينبغي إسقاطها (project) في النتائج (مثل بند <code>SELECT</code> في SQL.)</li>
</ul>
<p>ويُغفل الوصف أعلاه متطلبًا بالغ الأهمية: كيفية جعل الجمل المختلفة متزامنة على قيمة (أي تنفيذ عملية دمج join بينها)، وكيفية تنظيم القيم الموجودة في المخرجات (المحدَّد في جزء <code>:find</code>).</p>
<p>ونستوفي كلا المتطلبين باستخدام <em>المتغيرات</em> (<em>variables</em>) التي تُدوَّن بعلامة <code>?</code> في بدايتها. والاستثناء الوحيد لهذا التعريف هو المتغير «لا يهم» <code>_</code> (شرطة سفلية).</p>
<p>والجملة في الاستعلام مكوَّنة من ثلاثة مسندات؛ ويحدّد \\aosatblref{500l.functionaldb.predicates} ما يمكن أن يكون مسندًا في لغتنا للاستعلام.</p>
<table>
  <tr>
    <td>الاسم</td>
    <td>المعنى</td>
    <td>مثال</td>
  </tr>
  <tr>
    <td>ثابت</td>
    <td>هل قيمة العنصر في الـdatom مساوية للثابت؟</td>
    <td>:likes</td>
  </tr>
  <tr>
    <td>متغير</td>
    <td>اربط قيمة العنصر في الـdatom بالمتغير وأعد true.</td>
    <td>?e</td>
  </tr>
  <tr>
    <td>لا يهم</td>
    <td>يُعيد true دائمًا.</td>
    <td>_</td>
  </tr>
  <tr>
    <td>عامل أحادي</td>
    <td>عملية أحادية تأخذ متغيرًا كoperand لها.<br/>
        اربط قيمة عنصر الـdatom بالمتغير (ما لم يكن '_').<br/>
        استبدل المتغير بقيمة العنصر في الـdatom.<br/>
        أعد نتيجة تطبيق العملية.</td>
    <td>(bday-mo? _)</td>
  </tr>
  <tr>
    <td>عامل ثنائي</td>
    <td>عملية ثنائية يجب أن يكون أحد operands لها متغيرًا.<br/>
        اربط قيمة عنصر الـdatom بالمتغير (ما لم يكن '_').<br/>        
        استبدل المتغير بقيمة العنصر في الـdatom.<br/>
        أعد نتيجة العملية.</td>
    <td>(&gt; ?age 20)</td>
  </tr>
</table>
: \\label{500l.functionaldb.predicates} المسندات
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{lll}
\\hline
\\textbf{Name} & \\textbf{Meaning} & \\textbf{Example} \\\\
\\hline
Constant & Is the value of the datom item equal to the constant? & \\verb|:likes| \\\\
Variable & Bind the value of the datom item to the variable and return true. & \\verb|?e| \\\\
Don't-care & Always returns true. & \\verb|_| \\\\
Unary operator & \\begin{tabular}{@{}l@{}} Unary operation that takes a variable as its operand. \\\\ Bind the datom's item's value to the variable (unless it's an \\verb|_|). \\\\  Replace the variable with the value of the item in the datom. \\\\ Return the application of the operation. \\end{tabular} & \\verb|(bday-mo? _)| \\\\
Binary operator & \\begin{tabular}{@{}l@{}} A binary operation that requires a variable as an operand. \\\\ Bind the datom's item's value to the variable (unless it's an \\verb|_|). \\\\ Replace the variable with the value of the item in the datom. \\\\ Return the result of the operation. \\end{tabular} & \\verb|(&gt; ?age 20)| \\\\
\\hline
\\end{tabular}
}
\\caption{Predicates}
\\label{500l.functionaldb.predicates}
\\end{table}
</latex>
<h4>قيود لغتنا للاستعلام</h4>
<p>الهندسة كلها تدور حول إدارة المفاضلات، وتصميم محرّك الاستعلام لدينا لا استثناء. وفي حالتنا، المفاضلة الرئيسة التي يجب أن نعالجها هي غنى الميزات مقابل التعقيد. ويقتضي حسم هذه المفاضلة النظر في حالات الاستخدام الشائعة للنظام، ومن ثم تقرير ما إذا كانت القيود مقبولة.</p>
<p>وفي قاعدة بياناتنا، قررنا بناء محرّك استعلام القيود التالية:</p>
<ul>
<li>لا يستطيع المستخدمون تعريف عمليات منطقية بين الجمل؛ فهي تُدمج دائمًا معًا بـ«AND». (ويمكن تجاوز ذلك باستخدام مسندات أحادية أو ثنائية.)</li>
<li>إذا كان في الاستعلام أكثر من جملة، فيجب أن يوجد متغير واحد يوجد في كل جمل ذلك الاستعلام. وهذا المتغير يؤدّي دور متغير الدمج. وهذا القيد يُبسّط محسّن الاستعلام.</li>
<li>لا يُنفَّذ الاستعلام إلا على قاعدة بيانات واحدة.</li>
</ul>
<p>ولرغم أن قرارات التصميم هذه تُنتج لغة استعلام أقل ثراءً من Datalog، إلا أننا ما زلنا قادرين على دعم أنواع كثيرة من الاستعلامات البسيطة والمفيدة.</p>
<h3 id="تصميم-محرك-الاستعلام">تصميم محرّك الاستعلام</h3>
<p>بينما تتيح لغتنا للمستخدم تحديد <em>ماذا</em> يريد الوصول إليه، فإنها تخفي تفاصيل <em>كيف</em> سيتحقق ذلك. ومحرّك الاستعلام هو مكوّن قاعدة البيانات المسؤول عن تقديم البيانات لاستعلام معطى.</p>
<p>وهذا ينطوي على أربع خطوات:</p>
<ol>
<li>التحويل إلى تمثيل داخلي: تحويل الاستعلام من صيغته النصية إلى بنية بيانات يستهلكها مخطّط الاستعلام.</li>
<li>بناء خطة استعلام: تحديد <em>خطة</em> (<em>plan</em>) فعّالة لتقديم نتائج الاستعلام المعطى. وفي حالتنا، خطة الاستعلام هي دالة يُستدعى تنفيذها.</li>
<li>تنفيذ الخطة: تنفيذ الخطة وإرسال نتائجها إلى المرحلة التالية.</li>
<li>التوحيد والإبلاغ: استخراج النتائج التي يلزم الإبلاغ عنها فقط وتنسيقها على النحو المحدَّد.</li>
</ol>
<h4>المرحلة 1: التحويل</h4>
<p>في هذه المرحلة، نحوّل الاستعلام المعطى من تمثيل يسهل على المستخدم فهمه إلى تمثيل يمكن لمخطّط الاستعلام استهلاكه بكفاءة.</p>
<p>ويُحوَّل جزء <code>:find</code> من الاستعلام إلى مجموعة من أسماء المتغيرات المعطاة:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span> <span class="hljs-title">symbol-col-to-set</span> [coll] (<span class="hljs-name">set</span> (<span class="hljs-name"><span class="hljs-built_in">map</span></span> str coll)))
</code></pre>
<p>ويحتفظ جزء <code>:where</code> من الاستعلام ببنيته المتداخلة من المتجهات. غير أن كل حد من حدود كل جملة يُستبدل بمسند وفقًا لـ\\aosatblref{500l.functionaldb.predicates}.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span> <span class="hljs-title">clause-term-expr</span> [clause-term]
   (<span class="hljs-name"><span class="hljs-built_in">cond</span></span>
    (<span class="hljs-name">variable?</span> (<span class="hljs-name"><span class="hljs-built_in">str</span></span> clause-term)) <span class="hljs-comment">;variable</span>
      #(<span class="hljs-name"><span class="hljs-built_in">=</span></span> % %) 
    (<span class="hljs-name"><span class="hljs-built_in">not</span></span> (<span class="hljs-name"><span class="hljs-built_in">coll?</span></span> clause-term)) <span class="hljs-comment">;constant </span>
      \`#(<span class="hljs-name"><span class="hljs-built_in">=</span></span> % ~clause-term) 
    (<span class="hljs-name"><span class="hljs-built_in">=</span></span> <span class="hljs-number">2</span> (<span class="hljs-name"><span class="hljs-built_in">count</span></span> clause-term)) <span class="hljs-comment">;unary operator</span>
      \`#(~(<span class="hljs-name"><span class="hljs-built_in">first</span></span> clause-term) %) 
    (<span class="hljs-name">variable?</span> (<span class="hljs-name"><span class="hljs-built_in">str</span></span> (<span class="hljs-name"><span class="hljs-built_in">second</span></span> clause-term)))<span class="hljs-comment">;binary operator, 1st operand is variable</span>
      \`#(~(<span class="hljs-name"><span class="hljs-built_in">first</span></span> clause-term) % ~(<span class="hljs-name"><span class="hljs-built_in">last</span></span> clause-term))
    (<span class="hljs-name">variable?</span> (<span class="hljs-name"><span class="hljs-built_in">str</span></span> (<span class="hljs-name"><span class="hljs-built_in">last</span></span> clause-term)))<span class="hljs-comment">;binary operator, 2nd operand is variable</span>
      \`#(~(<span class="hljs-name"><span class="hljs-built_in">first</span></span> clause-term) ~(<span class="hljs-name"><span class="hljs-built_in">second</span></span> clause-term) %)))
</code></pre>
<p>ولكل جملة، يُضبط متجه بأسماء المتغيرات المستخدمة في تلك الجملة كبيانات وصفية له.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span> <span class="hljs-title">clause-term-meta</span> [clause-term]
   (<span class="hljs-name"><span class="hljs-built_in">cond</span></span>
   (<span class="hljs-name"><span class="hljs-built_in">coll?</span></span> clause-term)  (<span class="hljs-name"><span class="hljs-built_in">first</span></span> (<span class="hljs-name"><span class="hljs-built_in">filter</span></span> #(<span class="hljs-name">variable?</span> % <span class="hljs-literal">false</span>) (<span class="hljs-name"><span class="hljs-built_in">map</span></span> str clause-term))) 
   (<span class="hljs-name">variable?</span> (<span class="hljs-name"><span class="hljs-built_in">str</span></span> clause-term) <span class="hljs-literal">false</span>) (<span class="hljs-name"><span class="hljs-built_in">str</span></span> clause-term) 
   <span class="hljs-symbol">:no-variable-in-clause</span> <span class="hljs-literal">nil</span>))
</code></pre>
<p>ونستخدم <code>pred-clause</code> للتمرير على الحدود في كل جملة:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span> <span class="hljs-title">pred-clause</span> [clause]
   (<span class="hljs-name"><span class="hljs-built_in">loop</span></span> [[trm# &amp; rst-trm#] clause exprs# [] metas# []]
     (<span class="hljs-name"><span class="hljs-built_in">if</span></span>  trm#
          (<span class="hljs-name"><span class="hljs-built_in">recur</span></span> rst-trm# (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> exprs# \`(<span class="hljs-name">clause-term-expr</span> ~ trm#)) 
                       (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> metas#\`(<span class="hljs-name">clause-term-meta</span> ~ trm#)))
          (<span class="hljs-name"><span class="hljs-built_in">with-meta</span></span> exprs# {<span class="hljs-symbol">:db/variable</span> metas#}))))
</code></pre>
<p>أما التمرير على الجمل نفسها فيتم في <code>q-clauses-to-pred-clauses</code>:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span>  <span class="hljs-title">q-clauses-to-pred-clauses</span> [clauses]
     (<span class="hljs-name"><span class="hljs-built_in">loop</span></span> [[frst# &amp; rst#] clauses preds-vecs# []]
       (<span class="hljs-name"><span class="hljs-built_in">if-not</span></span> frst#  preds-vecs#
         (<span class="hljs-name"><span class="hljs-built_in">recur</span></span> rst# \`(<span class="hljs-name"><span class="hljs-built_in">conj</span></span> ~preds-vecs# (<span class="hljs-name">pred-clause</span> ~frst#))))))
</code></pre>
<p>ونحن نعتمد مرة أخرى على حقيقة أن الماكروهات لا تقيّم وسائطها بدفّة. وهذا يتيح لنا تعريف واجهة أبسط يقدّم فيها المستخدمون أسماء المتغيرات كرموز (مثل <code>?name</code>) بدلاً من مطالبة المستخدم بفهم تفاصيل المحرّك عبر تقديم أسماء المتغيرات كنصوص (مثل <code>&quot;?name&quot;</code>)، أو الأسوأ من ذلك، اقتباس اسم المتغير (مثل <code>'?name</code>).</p>
<p>وفي نهاية هذه المرحلة، يُنتج مثالنا المجموعة التالية لجزء <code>:find</code>:</p>
<pre><code class="language-clojure">#{<span class="hljs-string">&quot;?nm&quot;</span> <span class="hljs-string">&quot;?bd&quot;</span>} 
</code></pre>
<p>والبنية التالية في \\aosatblref{500l.functionaldb.clauses} لجزء <code>:where</code>. (كل خلية في عمود <em>Predicate Clause</em> تحمل البيانات الوصفية الموجودة في جارتها في عمود <em>Meta Clause</em>.)</p>
<table>
<tr>
	<td>جملة الاستعلام</td>
	<td>جملة المسند</td>
	<td>جملة البيانات الوصفية</td>
</tr>
<tr>
	<td>[?e  :likes "pizza"]</td>
	<td>[#(= % %)  #(= % :likes)  #(= % "pizza")]</td>
	<td>["?e" nil nil]</td>
</tr>
<tr>
	<td>[?e  :name  ?nm]</td>
	<td>[#(= % %)  #(= % :name) #(= % %)]</td>
	<td>["?e" nil "?nm"]</td>
</tr>
<tr>
	<td>[?e  :speak "English"]</td>
	<td>[#(= % %) #(= % :speak) #(= % "English")]</td>
	<td>["?e" nil nil]</td>
</tr>
<tr>
	<td>[?e  :bday (bday-mo? ?bd)]</td>
	<td>[#(= % %) #(= % :bday) #(bday-mo? %)]</td>
	<td>["?e" nil "?bd"]
</td>
</tr>
</table>
: \\label{500l.functionaldb.clauses} الجمل
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{lll}
\\hline
\\textbf{Query Clause} & \\textbf{Predicate Clause} & \\textbf{Meta Clause} \\\\
\\hline
\\verb|[?e  :likes "pizza"]| & \\verb|[#(= % %)  #(= % :likes)  #(= % "pizza")]| & \\verb|["?e" nil nil]| \\\\
\\verb|[?e  :name  ?nm]| & \\verb|[#(= % %)  #(= % :name) #(= % %)]| & \\verb|["?e" nil "?nm"]| \\\\
\\verb|[?e  :speak "English"]| & \\verb|[#(= % %) #(= % :speak) #(= % "English")]| & \\verb|["?e" nil nil]| \\\\
\\verb|[?e  :bday (bday-mo? ?bd)]| & \\verb|[#(= % %) #(= % :bday) #(bday-mo? %)]| & \\verb|["?e" nil "?bd"]| \\\\
\\hline
\\end{tabular}
}
\\caption{Clauses}
\\label{500l.functionaldb.clauses}
\\end{table}
</latex>
<p>وتعمل هذه البنية بوصفها الاستعلام الذي يُنفَّذ في مرحلة لاحقة، بمجرد أن يقرر المحرّك خطة التنفيذ المناسبة.</p>
<h4>المرحلة 2: وضع الخطة</h4>
<p>في هذه المرحلة، نفحص الاستعلام من أجل بناء خطة جيدة تنتج النتيجة التي يصفها.</p>
<p>عمومًا، سيتضمن هذا اختيار الفهرس المناسب (\\aosatblref{500l.functionaldb.indexselection}) وبناء خطة على هيئة دالة. ونختار الفهرس استنادًا إلى متغير الدمج <em>الوحيد</em> (الذي يمكن أن يعمل على نوع واحد فقط من العناصر).</p>
<table>
	<tr>
		<td>متغير الدمج يعمل على</td><td>الفهرس الذي يُستخدم</td>
	</tr>
	<tr>
		<td>معرّفات الكيانات</td><td>AVET</td>
	</tr>
	<tr>
		<td>أسماء الخصائص</td><td>VEAT</td>
	</tr>
	<tr>
		<td>قيم الخصائص</td><td>EAVT</td>
	</tr>
</table>
: \\label{500l.functionaldb.indexselection} اختيار الفهرس
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{ll}
\\hline
\\textbf{Joining variable operates on} & \\textbf{Index to use} \\\\
\\hline
Entity IDs & AVET \\\\
Attribute names & VEAT \\\\
Attribute values & EAVT \\\\
\\hline
\\end{tabular}
}
\\caption{Index Selection}
\\label{500l.functionaldb.indexselection}
\\end{table}
</latex>
<p>وسيصبح الاستدلال وراء هذه المطابقة أوضح في القسم التالي، حين ننفّذ بالفعل الخطةَ التي تنتجها. أما الآن فملاحظة فقط أن المفتاح هنا هو اختيار فهرس تحمل أوراقه العناصر التي يعمل عليها متغير الدمج.</p>
<p>ويتم تحديد فهرس متغير الدمج بالدالة <code>index-of-joining-variable</code>:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">index-of-joining-variable</span> [query-clauses]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [metas-seq  (<span class="hljs-name"><span class="hljs-built_in">map</span></span> #(<span class="hljs-symbol">:db/variable</span> (<span class="hljs-name"><span class="hljs-built_in">meta</span></span> %)) query-clauses) 
         collapsing-fn (<span class="hljs-name"><span class="hljs-built_in">fn</span></span> [accV v] (<span class="hljs-name"><span class="hljs-built_in">map</span></span> #(<span class="hljs-name"><span class="hljs-built_in">when</span></span> (<span class="hljs-name"><span class="hljs-built_in">=</span></span> %<span class="hljs-number">1</span> %<span class="hljs-number">2</span>) %<span class="hljs-number">1</span>)  accV v))
         collapsed (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> collapsing-fn metas-seq)] 
     (<span class="hljs-name"><span class="hljs-built_in">first</span></span> (<span class="hljs-name">keep-indexed</span> #(<span class="hljs-name"><span class="hljs-built_in">when</span></span> (<span class="hljs-name">variable?</span> %<span class="hljs-number">2</span> <span class="hljs-literal">false</span>) %<span class="hljs-number">1</span>)  collapsed)))) 
</code></pre>
<p>نبدأ باستخراج البيانات الوصفية لكل جملة في الاستعلام. وهذه البيانات الوصفية المستخرجة متجه من ثلاثة عناصر؛ كل عنصر إما اسم متغير أو nil. (ولاحظ أنه لا يوجد أكثر من اسم متغير واحد في ذلك المتجه.) وبمجرد استخراج المتجه، ننتج منه (بتطبيق reduce عليه) قيمة واحدة، تكون إما اسم متغير أو nil. فإذا أُنتج اسم متغير، فإنه كان موجودًا في جميع متجهات البيانات الوصفية عند الفهرس نفسه؛ أي أن هذا هو متغير الدمج. ومن ثم يمكننا أن نختار استخدام الفهرس ذي الصلة بهذا متغير الدمج بناءً على المطابقة الموصوفة أعلاه.</p>
<p>وبمجرد اختيار الفهرس، نبني خطتنا، وهي دالة تُغلق على الاستعلام واسم الفهرس وتنفّذ العمليات اللازمة لإعادة نتائج الاستعلام.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">build-query-plan</span> [query]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [term-ind (<span class="hljs-name">index-of-joining-variable</span> query)
         ind-to-use (<span class="hljs-name"><span class="hljs-built_in">case</span></span> term-ind <span class="hljs-number">0</span> <span class="hljs-symbol">:AVET</span> <span class="hljs-number">1</span> <span class="hljs-symbol">:VEAT</span> <span class="hljs-number">2</span> <span class="hljs-symbol">:EAVT</span>)]
      (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> single-index-query-plan query ind-to-use)))
</code></pre>
<p>وفي مثالنا فإن الفهرس المختار هو فهرس <code>AVET</code>، لأن متغير الدمج يعمل على معرّفات الكيانات.</p>
<h4>المرحلة 3: تنفيذ الخطة</h4>
<p>رأينا في المرحلة السابقة أن خطة الاستعلام لدينا تنتهي باستدعاء <code>single-index-query-plan</code>. وهذه الدالة ستقوم بـ:</p>
<ol>
<li>تطبيق كل جملة مسند على فهرس (كل مسند على مستوى الفهرس المناسب له).</li>
<li>تنفيذ عملية AND على النتائج.</li>
<li>دمج النتائج في بنية بيانات أبسط.</li>
</ol>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">single-index-query-plan</span> [query indx db]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [q-res (<span class="hljs-name">query-index</span> (<span class="hljs-name">indx-at</span> db indx) query)]
     (<span class="hljs-name">bind-variables-to-query</span> q-res (<span class="hljs-name">indx-at</span> db indx))))
</code></pre>
<p>ولشرح هذه العملية على نحو أفضل، سنعرضها باستخدام استعلامنا النموذجي، مع افتراض أن قاعدة بياناتنا تحتوي على الكيانات الواردة في \\aosatblref{500l.functionaldb.exampleentities}.</p>
<table>
<tr>
	<td>معرّف الكيان</td>
	<td>اسم الخاصية</td>
	<td>قيمة الخاصية</td>
</tr>
<tr>
	<td>1</td>
	<td>:name </br>
		:likes</br>
		:speak</br>
		:bday 
	</td>
	<td>USA</br>
		Pizza</br>
		English</br>
		July 4, 1776
	</td>
</tr>
<tr>
	<td>2</td>
	<td>:name </br>
		:likes</br>
		:speak</br>
		:bday 
	</td>
	<td>France</br>
		Red wine</br>
		French</br>
		July 14, 1789
	</td>
</tr>
<tr>
	<td>3</td>
	<td>:name </br>
		:likes</br>
		:speak</br>
		:bday 
	</td>
	<td>Canada</br>
		Snow</br>
		English</br>
		July 1, 1867
	</td>
</tr>
</table> 
: \\label{500l.functionaldb.exampleentities} كيانات نموذجية
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{lll}
\\hline
\\textbf{Entity ID} & \\textbf{Attribute Name} & \\textbf{Attribute Value} \\\\
\\hline
1 & \\begin{tabular}{@{}l@{}} \\verb|:name| \\\\ \\verb|:likes| \\\\ \\verb|:speak| \\\\ \\verb|:bday| \\end{tabular} & \\begin{tabular}{@{}l@{}} USA \\\\ Pizza \\\\ English \\\\ July 4, 1776 \\end{tabular} \\\\
2 & \\begin{tabular}{@{}l@{}} \\verb|:name| \\\\ \\verb|:likes| \\\\ \\verb|:speak| \\\\ \\verb|:bday| \\end{tabular} & \\begin{tabular}{@{}l@{}} France \\\\ Red wine \\\\ French \\\\ July 14, 1789 \\end{tabular} \\\\
3 & \\begin{tabular}{@{}l@{}} \\verb|:name| \\\\ \\verb|:likes| \\\\ \\verb|:speak| \\\\ \\verb|:bday| \\end{tabular} & \\begin{tabular}{@{}l@{}} Canada \\\\ Snow \\\\ English \\\\ July 1, 1867 \\end{tabular} \\\\
\\hline
\\end{tabular}
}
\\caption{Example entities}
\\label{500l.functionaldb.exampleentities}
\\end{table}
</latex>
<p>والآن حان وقت التعمق في ثقب الأرنب والنظر إلى الدالة <code>query-index</code>، حيث يبدأ استعلامنا أخيرًا فيإbibsr بعض النتائج:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">query-index</span> [index pred-clauses]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [result-clauses (<span class="hljs-name">filter-index</span> index pred-clauses)
         relevant-items (<span class="hljs-name">items-that-answer-all-conditions</span> (<span class="hljs-name"><span class="hljs-built_in">map</span></span> last result-clauses) 
                                                          (<span class="hljs-name"><span class="hljs-built_in">count</span></span> pred-clauses))
         cleaned-result-clauses (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> mask-path-leaf-with-items 
                                              relevant-items)
                                     result-clauses)] 
     (<span class="hljs-name"><span class="hljs-built_in">filter</span></span> #(<span class="hljs-name">not-empty</span> (<span class="hljs-name"><span class="hljs-built_in">last</span></span> %)) cleaned-result-clauses)))
</code></pre>
<p>تبدأ هذه الدالة بتطبيق جمل المسندات على الفهرس المختار سابقًا. وكل تطبيق لجملة مسند على فهرس يُعيد <em>جملة نتيجة</em> (<em>result clause</em>).</p>
<p>أما الخصائص الرئيسية للنتيجة فهي:</p>
<ol>
<li>إنها مبنية من ثلاثة عناصر، كل عنصر من مستوى مختلف من الفهرس، وقد اجتاز كلٌّ منها مسنده المقابل.</li>
<li>يطابق ترتيب العناصر بنية مستويات الفهرس. (جمل المسندات دائمًا بترتيب EAV.) ويجري إعادة الترتيب عند تطبيق <code>from-eav</code> الخاص بالفهرس على جملة المسند.</li>
<li>البيانات الوصفية لجملة المسند مُرفقة بها.</li>
</ol>
<p>ويجري كل هذا في الدالة <code>filter-index</code>.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">filter-index</span> [index predicate-clauses]
   (<span class="hljs-name"><span class="hljs-built_in">for</span></span> [pred-clause predicate-clauses
         <span class="hljs-symbol">:let</span> [[lvl1-prd lvl2-prd lvl3-prd] (<span class="hljs-name"><span class="hljs-built_in">apply</span></span> (<span class="hljs-name">from-eav</span> index) pred-clause)] 
         [k1 l2map] index  <span class="hljs-comment">; keys and values of the first level</span>
         <span class="hljs-symbol">:when</span> (<span class="hljs-name"><span class="hljs-built_in">try</span></span> (<span class="hljs-name">lvl1-prd</span> k1) (<span class="hljs-name">catch</span> Exception e <span class="hljs-literal">false</span>))  
         [k2  l3-set] l2map  <span class="hljs-comment">; keys and values of the second level</span>
         <span class="hljs-symbol">:when</span> (<span class="hljs-name"><span class="hljs-built_in">try</span></span> (<span class="hljs-name">lvl2-prd</span> k2) (<span class="hljs-name">catch</span> Exception e <span class="hljs-literal">false</span>))
         <span class="hljs-symbol">:let</span> [res (<span class="hljs-name">set</span> (<span class="hljs-name"><span class="hljs-built_in">filter</span></span> lvl3-prd l3-set))] ]
     (<span class="hljs-name"><span class="hljs-built_in">with-meta</span></span> [k1 k2 res] (<span class="hljs-name"><span class="hljs-built_in">meta</span></span> pred-clause))))
</code></pre>
<p>وبافتراض أن الاستعلام نُفِّذ في الرابع من يوليو، فإن نتائج تنفيذه على البيانات أعلاه مبيَّنة في \\aosatblref{500l.functionaldb.queryresults}.</p>
<table>
<tr>
<td>جملة النتيجة</td><td>بيانات النتيجة الوصفية</td>
</tr>
<tr>
<td>[:likes Pizza #{1}]</td><td>["?e" nil nil]</td>
</tr>
<tr>
<td>[:name USA #{1}]</td><td>["?e" nil "?nm"]</td>
</tr>
<tr>
<td>[:speak "English" #{1, 3}]</td><td>["?e" nil nil]</td>
</tr>
<tr>
<td>[:bday "July 4, 1776" #{1}]</td><td>["?e" nil "?bd"]</td>
</tr>
<tr>
<td>[:name France #{2}]</td><td>["?e" nil "?nm"]</td>
</tr>
<tr>
<td>[:bday "July 14, 1789" #{2}]</td><td>["?e" nil "?bd"]</td>
</tr>
<tr>
<td>[:name Canada #{3}]</td><td>["?e" nil "?nm"]</td>
</tr>
<tr>
<td>[:bday "July 1, 1867" {3}]</td><td>["?e" nil "?bd"]</td>
</tr>
</table>
: \\label{500l.functionaldb.queryresults} نتائج الاستعلام
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{ll}
\\hline
\\textbf{Result Clause} & \\textbf{Result Meta} \\\\
\\hline
\\verb|[:likes Pizza #{1}]| & \\verb|["?e" nil nil]| \\\\
\\verb|[:name USA #{1}]| & \\verb|["?e" nil "?nm"]| \\\\
\\verb|[:speak "English" #{1, 3}]| & \\verb|["?e" nil nil]| \\\\
\\verb|[:bday "July 4, 1776" #{1}]| & \\verb|["?e" nil "?bd"]| \\\\
\\verb|[:name France #{2}]| & \\verb|["?e" nil "?nm"]| \\\\
\\verb|[:bday "July 14, 1789" #{2}]| & \\verb|["?e" nil "?bd"]| \\\\
\\verb|[:name Canada #{3}]| & \\verb|["?e" nil "?nm"]| \\\\
\\verb|[:bday "July 1, 1867" {3}]| & \\verb|["?e" nil "?bd"]| \\\\
\\hline
\\end{tabular}
}
\\caption{Query results}
\\label{500l.functionaldb.queryresults}
\\end{table}
</latex>
<p>وبمجرد أن ننتج جميع جمل النتائج، نحتاج إلى تنفيذ عملية <code>AND</code> بينها. ويتم ذلك بالعثور على جميع العناصر التي اجتازت كل جمل المسندات:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">items-that-answer-all-conditions</span> [items-seq num-of-conditions]
   (<span class="hljs-name"><span class="hljs-built_in">-&gt;&gt;</span></span> items-seq <span class="hljs-comment">; take the items-seq</span>
         (<span class="hljs-name"><span class="hljs-built_in">map</span></span> vec) <span class="hljs-comment">; make each collection (actually a set) into a vector</span>
         (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> into []) <span class="hljs-comment">;reduce all the vectors into one vector</span>
         (<span class="hljs-name">frequencies</span>) <span class="hljs-comment">;count for each item in how many collections (sets) it was in</span>
         (<span class="hljs-name"><span class="hljs-built_in">filter</span></span> #(<span class="hljs-name"><span class="hljs-built_in">&lt;=</span></span> num-of-conditions (<span class="hljs-name"><span class="hljs-built_in">last</span></span> %))) <span class="hljs-comment">;items that answered all conditions</span>
         (<span class="hljs-name"><span class="hljs-built_in">map</span></span> first) <span class="hljs-comment">; take from the duos the items themselves</span>
         (<span class="hljs-name">set</span>))) <span class="hljs-comment">; return it as set</span>
</code></pre>
<p>وفي مثالنا، تكون نتيجة هذه الخطوة مجموعةً تحمل القيمة <em>1</em> (وهي معرّف الكيان USA).</p>
<p>والآن علينا إزالة العناصر التي لم تجتز كل الشروط:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">mask-path-leaf-with-items</span> [relevant-items path]
     (<span class="hljs-name"><span class="hljs-built_in">update-in</span></span> path [<span class="hljs-number">2</span>] CS/intersection relevant-items))
</code></pre>
<p>وأخيرًا، نزيل جميع جمل النتائج التي «فارغة» (أي أن عنصرها الأخير فارغ). ونفعل ذلك في السطر الأخير من الدالة <code>query-index</code>. ويترك لنا مثالنا بالعناصر الواردة في \\aosatblref{500l.functionaldb.filteredqueryresults}.</p>
<table>
<tr>
<td>جملة النتيجة</td><td>بيانات النتيجة الوصفية</td>
</tr>
<tr>
<td>[:likes Pizza #{1}]</td><td>["?e" nil nil]</td>
</tr>
<tr>
<td>[:name USA #{1}]</td><td>["?e" nil "?nm"]</td>
</tr>
<tr>
<td>[:bday "July 4, 1776" #{1}]</td><td>["?e" nil "?bd"]</td>
</tr>
<tr>
<td>[:speak "English" #{1}]</td><td>["?e" nil nil]</td>
</tr>
</table>
: \\label{500l.functionaldb.filteredqueryresults} نتائج الاستعلام المُصفّاة
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{ll}
\\hline
\\textbf{Result Clause} & \\textbf{Result Meta} \\\\
\\hline
\\verb|[:likes Pizza #{1}]| & \\verb|["?e" nil nil]| \\\\
\\verb|[:name USA #{1}]| & \\verb|["?e" nil "?nm"]| \\\\ 
\\verb|[:bday "July 4, 1776" #{1}]| & \\verb|["?e" nil "?bd"]| \\\\
\\verb|[:speak "English" #{1}]| & \\verb|["?e" nil nil]| \\\\
\\hline
\\end{tabular}
}
\\caption{Filtered query results}
\\label{500l.functionaldb.filteredqueryresults}
\\end{table}
</latex>
<p>ونحن الآن مستعدون للإبلاغ عن النتائج. وبنية جملة النتيجة مرهقة لهذا الغرض، لذا سنحوّلها إلى بنية شبيهة بالفهرس (خريطة من خرائط)—مع فرق جوهري.</p>
<p>لفهم هذا الفرق، علينا أولًا تقديم فكرة <em>زوج الربط</em> (<em>binding pair</em>)، وهو زوج يطابق اسم متغير بقيمته. واسم المتغير هو الاسم المستخدم في جمل المسندات، والقيمة هي القيمة الموجودة في جمل النتائج.</p>
<p>ويتمثل الفرق في بنية الفهرس في أننا الآن نحمل زوج ربط من معرّف الكيان / اسم الخاصية / القيمة في الموضع الذي كنا نحمل فيه معرّف كيان / اسم خاصية / قيمة في فهرس:</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">bind-variables-to-query</span> [q-res index]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [seq-res-path (<span class="hljs-name"><span class="hljs-built_in">mapcat</span></span> (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> combine-path-and-meta (<span class="hljs-name">from-eav</span> index)) 
                               q-res)         
         res-path (<span class="hljs-name"><span class="hljs-built_in">map</span></span> #(<span class="hljs-name"><span class="hljs-built_in">-&gt;&gt;</span></span> %<span class="hljs-number">1</span> (<span class="hljs-name"><span class="hljs-built_in">partition</span></span> <span class="hljs-number">2</span>)(<span class="hljs-name"><span class="hljs-built_in">apply</span></span> (<span class="hljs-name">to-eav</span> index))) seq-res-path)] 
     (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> #(<span class="hljs-name">assoc-in</span> %<span class="hljs-number">1</span>  (<span class="hljs-name"><span class="hljs-built_in">butlast</span></span> %<span class="hljs-number">2</span>) (<span class="hljs-name"><span class="hljs-built_in">last</span></span> %<span class="hljs-number">2</span>)) {} res-path)))
     
(<span class="hljs-keyword">defn</span> <span class="hljs-title">combine-path-and-meta</span> [from-eav-fn path]
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [expanded-path [(<span class="hljs-name"><span class="hljs-built_in">repeat</span></span> (<span class="hljs-name"><span class="hljs-built_in">first</span></span> path)) (<span class="hljs-name"><span class="hljs-built_in">repeat</span></span> (<span class="hljs-name"><span class="hljs-built_in">second</span></span> path)) (<span class="hljs-name"><span class="hljs-built_in">last</span></span> path)] 
          meta-of-path (<span class="hljs-name"><span class="hljs-built_in">apply</span></span> from-eav-fn (<span class="hljs-name"><span class="hljs-built_in">map</span></span> repeat (<span class="hljs-symbol">:db/variable</span> (<span class="hljs-name"><span class="hljs-built_in">meta</span></span> path))))
          combined-data-and-meta-path (<span class="hljs-name">interleave</span> meta-of-path expanded-path)]
       (<span class="hljs-name"><span class="hljs-built_in">apply</span></span> (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> map vector) combined-data-and-meta-path)))
</code></pre>
<p>وفي نهاية المرحلة 3 من مثالنا التنفيذي، لدينا البنية التالية في المتناول:</p>
<pre><code class="language-clojure">{[<span class="hljs-number">1</span> <span class="hljs-string">&quot;?e&quot;</span>]{ 
	{[<span class="hljs-symbol">:likes</span> <span class="hljs-literal">nil</span>]    [<span class="hljs-string">&quot;Pizza&quot;</span> <span class="hljs-literal">nil</span>]}
	{[<span class="hljs-symbol">:name</span> <span class="hljs-literal">nil</span>]     [<span class="hljs-string">&quot;USA&quot;</span> <span class="hljs-string">&quot;?nm&quot;</span>]}
	{[<span class="hljs-symbol">:speaks</span> <span class="hljs-literal">nil</span>]   [<span class="hljs-string">&quot;English&quot;</span> <span class="hljs-literal">nil</span>]} 
	{[<span class="hljs-symbol">:bday</span> <span class="hljs-literal">nil</span>] [<span class="hljs-string">&quot;July 4, 1776&quot;</span> <span class="hljs-string">&quot;?bd&quot;</span>]} 
}}
</code></pre>
<h4>المرحلة 4: التوحيد والإبلاغ</h4>
<p>في هذه النقطة، أنتجنا مجموعةً فوقية من النتائج التي طلبها المستخدم في الأصل. وفي هذه المرحلة سنستخرج القيم التي يريدها المستخدم. وتُسمى هذه العملية <em>التوحيد</em> (<em>unification</em>): وهنا سنوحّد بنية أزواج الربط مع متجه أسماء المتغيرات التي عرّفها المستخدم في بند <code>:find</code> من الاستعلام.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">unify</span> [binded-res-col needed-vars]
   (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> locate-vars-in-query-res needed-vars) binded-res-col))
</code></pre>
<p>وتُعالَج كل خطوة توحيد بواسطة الدالة <code>locate-vars-in-query-result</code>، التي تمر على نتيجة استعلام (مُنظَّمة كمدخل فهرس، لكن بأزواج ربط) لكشف جميع المتغيرات والقيم التي طلبها المستخدم.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defn</span> <span class="hljs-title">locate-vars-in-query-res</span> [vars-set q-res]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [[e-pair av-map]  q-res
         e-res (<span class="hljs-name">resultify-bind-pair</span> vars-set [] e-pair)]
     (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> resultify-av-pair vars-set e-res)  av-map)))

(<span class="hljs-keyword">defn</span> <span class="hljs-title">resultify-bind-pair</span> [vars-set accum pair]
   (<span class="hljs-name"><span class="hljs-built_in">let</span></span> [[ var-name _] pair]
      (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">contains?</span></span> vars-set var-name) (<span class="hljs-name"><span class="hljs-built_in">conj</span></span> accum pair) accum)))

(<span class="hljs-keyword">defn</span> <span class="hljs-title">resultify-av-pair</span> [vars-set accum-res av-pair]
   (<span class="hljs-name"><span class="hljs-built_in">reduce</span></span> (<span class="hljs-name"><span class="hljs-built_in">partial</span></span> resultify-bind-pair vars-set) accum-res av-pair))
</code></pre>
<p>وفي نهاية هذه المرحلة، تكون نتائج مثالنا هي:</p>
<pre><code>[(&quot;?nm&quot; &quot;USA&quot;) (&quot;?bd&quot; &quot;July 4, 1776&quot;)]
</code></pre>
<h4>تشغيل العرض</h4>
<p>لقد بنينا أخيرًا جميع المكوّنات التي نحتاجها لآلية الاستعلام التي تواجه المستخدم، وهي الماكرو <code>q</code> التي تتلقّى كوسيطين قاعدة بيانات واستعلام.</p>
<pre><code class="language-clojure">(<span class="hljs-keyword">defmacro</span> <span class="hljs-title">q</span>
  [db query]
  \`(<span class="hljs-name"><span class="hljs-built_in">let</span></span> [pred-clauses#  (<span class="hljs-name">q-clauses-to-pred-clauses</span> ~(<span class="hljs-symbol">:where</span> query)) 
         needed-vars# (<span class="hljs-name">symbol-col-to-set</span>  ~(<span class="hljs-symbol">:find</span> query))
         query-plan# (<span class="hljs-name">build-query-plan</span> pred-clauses#)
         query-internal-res# (<span class="hljs-name">query-plan#</span> ~db)]
     (<span class="hljs-name">unify</span> query-internal-res# needed-vars#)))
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>بدأت رحلتنا بتصور نوع مختلف من قواعد البيانات، وانتهت بقاعدة بيانات:</p>
<ul>
<li>تدعم معاملات ACI (فقد ضاعت الديمومة حين قررنا تخزين البيانات في الذاكرة).</li>
<li>تدعم تفاعلات «ماذا لو».</li>
<li>تجيب عن الأسئلة المتعلقة بالزمن.</li>
<li>تتعامل مع استعلامات datalog بسيطة مُحسَّنة بالفهارس.</li>
<li>تقدّم واجهات برمجية لاستعلامات الرسوم البيانية.</li>
<li>تقدّم وتنفّذ فكرة الاستعلامات التطورية.</li>
</ul>
<p>ولا يزال هناك الكثير مما يمكننا تحسينه: يمكننا إضافة تخزين مؤقت (caching) إلى عدة مكوّنات لتحسين الأداء؛ ودعم استعلامات أغنى؛ وإضافة دعم تخزين حقيقي لتوفير ديمومة البيانات، لتذكر بعض الأمور.</p>
<p>غير أن منتجنا النهائي يستطيع أن يفعل أشياء كثيرة جدًا، وقد نُفِّذ في 488 سطرًا من شيفرة Clojure المصدرية، منها 73 سطرًا فارغًا و55 سطرًا سلاسل توثيق.</p>
<p>وأخيرًا، هناك أمر واحد لا يزال مفقودًا: اسم.
والخيار المعقول الوحيد لقاعدة بيانات وظيفية مخزَّنة في الذاكرة، مُحسَّنة بالفهارس، داعمة للاستعلامات، صديقة لمطوّري المكتبات، واعية بالزمن، منفَّذة في 360 سطرًا من شيفرة Clojure هو CircleDB.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,t as html,l as slug,e as title};
