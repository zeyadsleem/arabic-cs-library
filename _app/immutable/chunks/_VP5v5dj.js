const s="500-lines",n="modeller",a="A 3D Modeller",e="index",l="مصمّم ثلاثي الأبعاد",p=[{depth:2,id:"مقدمة",text:"مقدّمة"},{depth:2,id:"العرض-بوصفه-التوجيها",text:"العرض بوصفه التوجيهاً"},{depth:3,id:"إدارة-الواجهات-والحلقة-الرئيسة",text:"إدارة الواجهات والحلقة الرئيسة"},{depth:3,id:"فضاء-الإحداثيات",text:"فضاء الإحداثيات"},{depth:3,id:"النقطة",text:"النقطة"},{depth:3,id:"المتجه",text:"المتجّه"},{depth:3,id:"مصفوفة-التحويل",text:"مصفوفة التحويل"},{depth:3,id:"فضاءات-إحداثيات-النموذج-والعالم-والمنظور-والإسقاط",text:"فضاءات إحداثيات النموذج والعالَم والمنظور والإسقاط"},{depth:3,id:"العرض-بالعارض",text:"العرض بالعارض"},{depth:3,id:"ماذا-نعرض-المشهد",text:"ماذا نعرض: المشهد"},{depth:3,id:"العقد",text:"العُقد"},{depth:3,id:"تفاعل-المستخدم",text:"تفاعل المستخدم"},{depth:3,id:"التواصل-مع-المشهد",text:"التواصل مع المشهد"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"استكشاف-إضافي",text:"استكشاف إضافي"}],c=`<p><em>إريك مطوّر برمجيات ومهووس بالرسوميات الحاسوبية ثنائية وثلاثية الأبعاد. عمل على ألعاب الفيديو وبرمجيات المؤثرات البصرية ثلاثية الأبعاد وأدوات التصميم بمساعدة الحاسوب. فإذا كان الأمر يتعلق بمحاكاة الواقع، فرُهن أنه يودّ معرفة المزيد عنه. يمكنك العثور عليه على الإنترنت في <a href="http://erickdransch.com">erickdransch.com</a>.</em></p>
<h2 id="مقدمة">مقدّمة</h2>
<p>البشر مبدعون بطبعهم. فنحن نصمّم ونبني باستمرار أشياء جديدة ومفيدة ومثيرة للاهتمام. وفي العصر الحديث، نكتب برمجيات تساعدنا في عمليتي التصميم والإنشاء.
تتيح برمجيات التصميم بمساعدة الحاسوب (CAD) للمصمّين تصميم المباني والجسور وأعمال ألعاب الفيديو،
ووحشيات الأفلام والأجسام القابلة للطباعة ثلاثية الأبعاد وكل ما عداها قبل بناء نسخة مادية من التصميم.</p>
<p>جوهر أدوات CAD هو طريقة لتجريد التصميم ثلاثي الأبعاد في شيء يمكن عرضه وتحريره على شاشة ثنائية الأبعاد.
ولكي تفي بهذا التعريف، يجب أن تقدّم أدوات CAD ثلاث قطع أساسية من الوظائف.
أولًا، يجب أن تملك بنية بيانات تمثّل الجسم الجاري تصميمه: وهذا هو فهم الحاسوب للعالم ثلاثي الأبعاد الذي يبنيه المستخدم.
ثانيًا، يجب أن تقدّم أداة CAD بعض الوسيلة لعرض التصميم على شاشة المستخدم. فالمستخدم يصمّم جسمًا ماديًا بثلاثة أبعاد، بينما شاشة الحاسوب ببعدين فقط.
يجب أن تُنمذج أداة CAD كيف ندرك الأجسام، وأن ترسمها على الشاشة بطريقة يستطيع بها المستخدم فهم أبعاد الجسم الثلاثة كلها.
ثالثًا، يجب أن تقدّم أداة CAD وسيلة للتفاعل مع الجسم الجاري تصميمه. ويجب أن يستطيع المستخدم الإضافة إلى التصميم وتعديله لينتج النتيجة المرغوبة.
وإضافةً إلى ذلك، ستحتاج كل الأدوات إلى وسيلة لحفظ التصاميم وتحميلها من القرص حتى يتمكن المستخدمون من التعاون والمشاركة وحفظ عملهم.</p>
<p>تقدّم أداة CAD الخاصة بمجال معيّن ميزات إضافية كثيرة تلبّي متطلبات ذلك المجال. فمثلًا، ستحتاج أداة CAD معمارية إلى محاكاة فيزيائية لاختبار الإجهادات المناخية على المبنى،
وستحتاج أداة الطباعة ثلاثية الأبعاد إلى ميزات تتحقّق مما إذا كان الجسم صالحًا للطباعة فعلًا، وستحاكي أداة CAD كهربائية فيزياء الكهرباء التي تجري في النحاس، وستطوي حزمة المؤثرات البصرية السينمائية
ميزات تحاكي الديناميكا الحرارية بدقّة.</p>
<p>غير أن كل أدوات CAD يجب أن تتضمّن على الأقل الميزات الثلاث التي ناقشناها أعلاه: بنية بيانات تمثّل التصميم، والقدرة على عرضه على الشاشة، وطريقة للتفاعل معه.</p>
<p>وفي هذا السياق، لنستكشف كيف يمكننا تمثيل تصميم ثلاثي الأبعاد، وعرضه على الشاشة، والتفاعل معه، في خمسمئة سطر من بايثون.</p>
<h2 id="العرض-بوصفه-التوجيها">العرض بوصفه التوجيهاً</h2>
<p>القوة الكامنة وراء كثير من قرارات التصميم في المصمّم ثلاثي الأبعاد هي عملية العرض (rendering).
نريد أن نتمكّن من تخزين أجسام معقّدة في تصميمنا وعرضها، لكننا نريد أن نبقي تعقيد شيفرة العرض منخفضًا.
لنفحص عملية العرض، ونستكشف بنية بيانات التصميم التي تتيح لنا تخزين أجسام معقّدة إلى أي حدّ ورسمها بمنطق عرض بسيط.</p>
<h3 id="إدارة-الواجهات-والحلقة-الرئيسة">إدارة الواجهات والحلقة الرئيسة</h3>
<p>قبل أن نبدأ العرض، هناك أمور قليلة علينا أن نجهّزها. أولًا، نحتاج إلى إنشاء نافذة لعرض تصميمنا فيها.
ثانيًا، نريد أن نتواصل مع مشغّلات الرسوميات من أجل العرض على الشاشة.
لا نفضّل التواصل مباشرةً مع مشغّلات الرسوميات، لذا نستخدم طبقة تجريد عابرة للمنصّات تُسمّى OpenGL، و
مكتبة تُسمّى GLUT (حزمة أدوات OpenGL) لإدارة نافذتنا.</p>
<h4>ملاحظة عن OpenGL</h4>
<!-- @mikedebo: Are we going to have actual sidebars in the book? If so we can make this into a sidebar (together with the paragraph on GLUT). Keep in mind sidebars can be hard (but not impossible) to do in ebooks. I wouldn't do sidebars unless there are at least three chapters which use them. -->
<p>OpenGL هي واجهة برمجية لتطبيقات الرسوميات من أجل التطوير العابر للمنصّات. وهي الواجهة البرمجية القياسية لتطوير تطبيقات الرسوميات عبر المنصّات.
ولـ OpenGL نوعان رئيسيان: OpenGL القديم (Legacy) وOpenGL الحديث (Modern).</p>
<p>يقوم العرض في OpenGL على مضلّعات معرَّفة بالرؤوس والعموميات (normals). فمثلًا، لعرض ضلع واحد من مكعّب، نحدّد الرؤوس الأربعة وعمومية ذلك الضلع.</p>
<p>يوفّر OpenGL القديم «خط أنابيب بدوال ثابتة» (fixed function pipeline). فبتضبط متغيّرات عامة، يستطيع المبرمج تفعيل تنفيذات آلية لميزات مثل
الإضاءة والتلوين وإخفاء الأوجه (face culling) وغيرها. ثم يعرض OpenGL المشهد تلقائيًا بالميزات المفعّلة. وهذه الوظائف مهجورة.</p>
<p>أما OpenGL الحديث، من ناحية أخرى، فيتميّز بخط أنابيب عرض قابل للبرمجة يكتب فيه المبرمج برامج صغيرة تُسمّى «مُظلِّمات الظل» (shaders)
تعمل على عتاد رسومي مخصّص (وحدات معالجة الرسوميات، GPUs). وقد حلّ خط الأنابيب القابل للبرمجة في OpenGL الحديث محلّ OpenGL القديم.</p>
<p>في هذا المشروع، سنستخدم OpenGL القديم رغم أنه مهجور. فالوظائف الثابتة التي يوفّرها OpenGL القديم مفيدة جدًا
في الحفاظ على حجم الشيفرة صغيرًا. فهي تقلّل مقدار الجبر الخطي المطلوب معرفته، وتبسّط الشيفرة التي سنكتبها.</p>
<h4>عن GLUT</h4>
<p>تتيح لنا GLUT، المضمّنة مع OpenGL، إنشاء نوافذ نظام التشغيل وتسجيل دوال استدعاء (callbacks) لواجهة المستخدم. وهذه الوظيفة الأساسية
كافية لأغراضنا. ولو أردنا مكتبة أغنى ميزات لإدارة النوافذ والتفاعل مع المستخدم، لفكّرنا في استخدام طقم نوافذ كامل مثل GTK أو Qt.</p>
<h4>العارض</h4>
<p>لإدارة إعداد GLUT وOpenGL وقيادة بقية أجزاء المصمّم، ننشئ صنفًا يُسمّى <code>Viewer</code>.
نستخدم نسخة واحدة من <code>Viewer</code> تدير إنشاء النافذة والعرض، وتحتوي الحلقة الرئيسة لبرنامجنا.
وفي عملية التهيئة الخاصة بـ<code>Viewer</code>، ننشئ نافذة الواجهة الرسومية ونهيّئ OpenGL.</p>
<p>تنشئ الدالة <code>init_interface</code> النافذة التي سيُعرض فيها المصمّم، وتحدّد الدالة التي ستُستدعى حين يحتاج التصميم إلى العرض.
تضبط الدالة <code>init_opengl</code> حالة OpenGL التي يحتاجها المشروع. فهي تضبط المصفوفات، وتفعّل إخفاء الأوجه الخلفية،
وتسجّل مصدرًا ضوئيًا لإضاءة المشهد، وتخبر OpenGL أننا نودّ تلوين الأجسام.
تنشئ الدالة <code>init_scene</code> كائن <code>Scene</code> وتضع بعض العُقد الأولية ليبدأ المستخدم. وسنرى المزيد عن بنية بيانات <code>Scene</code> بعد قليل.
وأخيرًا، تسجّل <code>init_interaction</code> دوال الاستدعاء الخاصة بتفاعل المستخدم، كما سنناقش لاحقًا.</p>
<p>بعد تهيئة <code>Viewer</code>، نستدعي <code>glutMainLoop</code> لتسليم تنفيذ البرنامج إلى GLUT. وهذه الدالة لا تعود أبدًا. وستُستدعى دوال الاستدعاء التي سجّلناها
على أحداث GLUT عند وقوع تلك الأحداث.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Viewer</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; Initialize the viewer. &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.init_interface()
        <span class="hljs-variable language_">self</span>.init_opengl()
        <span class="hljs-variable language_">self</span>.init_scene()
        <span class="hljs-variable language_">self</span>.init_interaction()
        init_primitives()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">init_interface</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; initialize the window and register the render function &quot;&quot;&quot;</span>
        glutInit()
        glutInitWindowSize(<span class="hljs-number">640</span>, <span class="hljs-number">480</span>)
        glutCreateWindow(<span class="hljs-string">&quot;3D Modeller&quot;</span>)
        glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB)
        glutDisplayFunc(<span class="hljs-variable language_">self</span>.render)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">init_opengl</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; initialize the opengl settings to render the scene &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.inverseModelView = numpy.identity(<span class="hljs-number">4</span>)
        <span class="hljs-variable language_">self</span>.modelView = numpy.identity(<span class="hljs-number">4</span>)

        glEnable(GL_CULL_FACE)
        glCullFace(GL_BACK)
        glEnable(GL_DEPTH_TEST)
        glDepthFunc(GL_LESS)

        glEnable(GL_LIGHT0)
        glLightfv(GL_LIGHT0, GL_POSITION, GLfloat_4(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>))
        glLightfv(GL_LIGHT0, GL_SPOT_DIRECTION, GLfloat_3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, -<span class="hljs-number">1</span>))

        glColorMaterial(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE)
        glEnable(GL_COLOR_MATERIAL)
        glClearColor(<span class="hljs-number">0.4</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.0</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">init_scene</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; initialize the scene object and initial scene &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.scene = Scene()
        <span class="hljs-variable language_">self</span>.create_sample_scene()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_sample_scene</span>(<span class="hljs-params">self</span>):
        cube_node = Cube()
        cube_node.translate(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
        cube_node.color_index = <span class="hljs-number">2</span>
        <span class="hljs-variable language_">self</span>.scene.add_node(cube_node)

        sphere_node = Sphere()
        sphere_node.translate(-<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
        sphere_node.color_index = <span class="hljs-number">3</span>
        <span class="hljs-variable language_">self</span>.scene.add_node(sphere_node)

        hierarchical_node = SnowFigure()
        hierarchical_node.translate(-<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, -<span class="hljs-number">2</span>)
        <span class="hljs-variable language_">self</span>.scene.add_node(hierarchical_node)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">init_interaction</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; init user interaction and callbacks &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.interaction = Interaction()
        <span class="hljs-variable language_">self</span>.interaction.register_callback(<span class="hljs-string">&#x27;pick&#x27;</span>, <span class="hljs-variable language_">self</span>.pick)
        <span class="hljs-variable language_">self</span>.interaction.register_callback(<span class="hljs-string">&#x27;move&#x27;</span>, <span class="hljs-variable language_">self</span>.move)
        <span class="hljs-variable language_">self</span>.interaction.register_callback(<span class="hljs-string">&#x27;place&#x27;</span>, <span class="hljs-variable language_">self</span>.place)
        <span class="hljs-variable language_">self</span>.interaction.register_callback(<span class="hljs-string">&#x27;rotate_color&#x27;</span>, <span class="hljs-variable language_">self</span>.rotate_color)
        <span class="hljs-variable language_">self</span>.interaction.register_callback(<span class="hljs-string">&#x27;scale&#x27;</span>, <span class="hljs-variable language_">self</span>.scale)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">main_loop</span>(<span class="hljs-params">self</span>):
        glutMainLoop()

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    viewer = Viewer()
    viewer.main_loop()
</code></pre>
<p>قبل أن نتوغّل في دالة <code>render</code>، علينا أن نتناقش قليلًا في الجبر الخطي.</p>
<h3 id="فضاء-الإحداثيات">فضاء الإحداثيات</h3>
<p>في أغراضنا، فضاء الإحداثيات (Coordinate Space) هو نقطة أصل ومجموعة من ثلاثة متجهات أساس، وهي عادةً محاور $x$ و$y$ و$z$.</p>
<h3 id="النقطة">النقطة</h3>
<p>يمكن تمثيل أي نقطة في ثلاثة أبعاد كإزاحة في اتجاهات $x$ و$y$ و$z$ عن نقطة الأصل. وتمثيل النقطة نسبي إلى فضاء الإحداثيات الذي توجد فيه. والنقطة نفسها
لها تمثيلات مختلفة في فضاءات إحداثيات مختلفة. ويمكن تمثيل أي نقطة في ثلاثة أبعاد في أي فضاء إحداثيات ثلاثي الأبعاد.</p>
<h3 id="المتجه">المتجّه</h3>
<p>المتجّه هو قيمة $x$ و$y$ و$z$ تمثّل الفرق بين نقطتين في محوري $x$ و$y$ و$z$ على التوالي.</p>
<h3 id="مصفوفة-التحويل">مصفوفة التحويل</h3>
<p>في الرسوميات الحاسوبية، من الملائم استخدام فضاءات إحداثيات مختلفة متعددة لأنواع مختلفة من النقاط. تحوّل مصفوفات التحويل النقاط من فضاء إحداثيات إلى فضاء إحداثيات آخر.
لتحويل متجّه $v$ من فضاء إحداثيات إلى آخر، نضربه في مصفوفة تحويل $M$: $v' = M v$.
ومن مصفوفات التحويل الشائعة الإزاحة (translations) والتحجيم (scaling) والدوران (rotations).</p>
<h3 id="فضاءات-إحداثيات-النموذج-والعالم-والمنظور-والإسقاط">فضاءات إحداثيات النموذج والعالَم والمنظور والإسقاط</h3>
<p>\\aosafigure[250pt]/images/500-lines/modeller-0-newtranspipe.webp{خط أنابيب التحويل}{500l.modeller.newtranspipe}</p>
<p>لرسم عنصر على الشاشة، نحتاج إلى التحويل بين بضعة فضاءات إحداثيات مختلفة.</p>
<p>يتولّى OpenGL نيابةً عنا كل ما على يمين \\aosafigref{500l.modeller.newtranspipe}[^transimage]، بما في ذلك كل التحويلات من فضاء العين إلى فضاء إطار العرض.</p>
<p>[^transimage]: أشكر الدكتور أنطون جيرديلان على الصورة. وكتابه التعليمي عن OpenGL متاح على <a href="http://antongerdelan.net/opengl/">http://antongerdelan.net/opengl/</a>.</p>
<p>يتولّى <code>gluPerspective</code> التحويل من فضاء العين إلى فضاء القصّ المتجانس (homogeneous clip space)، ويتولّى <code>glViewport</code> التحويل إلى فضاء الجهاز المُطبَّع (normalized device space) وإطار العرض.
تُضرب هاتان المصفوفتان معًا وتُخزَّنان بوصفهما مصفوفة GL_PROJECTION.
لا نحتاج في هذا المشروع إلى معرفة المصطلحات ولا إلى تفاصيل كيفية عمل هاتين المصفوفتين.</p>
<p>غير أن علينا أن نتولّى بأنفسنا ما على يسار المخطط. فنعرّف مصفوفة تحوّل نقاط النموذج (ويسمّى أيضًا شبكةً، mesh) من فضاءات النموذج إلى فضاء العالم، وتُسمّى مصفوفة النموذج. ونعرّف كذلك مصفوفة المنظور (view matrix)، التي تحوّل من فضاء العالم إلى فضاء العين.
في هذا المشروع، ندمج هاتين المصفوفتين معًا للحصول على مصفوفة ModelView.</p>
<p>لمعرفة المزيد عن خط أنابيب العرض الرسومي الكامل، وعن فضاءات الإحداثيات المتدخّلة فيه، راجع الفصل الثاني من <a href="http://www.realtimerendering.com/"><em>Real Time Rendering</em></a>، أو كتابًا تمهيديًا آخر في الرسوميات الحاسوبية.</p>
<h3 id="العرض-بالعارض">العرض بالعارض</h3>
<p>تبدأ دالة <code>render</code> بضبط أيّ حالة من حالة OpenGL ينبغي ضبطها في وقت العرض. فهي تهيّئ مصفوفة الإسقاط عبر <code>init_view</code>، وتستخدم بيانات العضو <code>interaction</code> لتهيئة مصفوفة ModelView بمصفوفة التحويل التي تحوّل من فضاء المشهد إلى فضاء العالم. وسنرى المزيد عن صنف Interaction أدناه. ثم تمسح الشاشة بـ<code>glClear</code> وتطلب من المشهد أن يعرض نفسه، ثم تعرض شبكة الوحدات.</p>
<p>نعطّل إضاءة OpenGL قبل عرض الشبكة. ومع تعطيل الإضاءة، يعرض OpenGL العناصر بألوان صلبة بدلًا من محاكاة مصدر ضوئي. وبهذه الطريقة تتميّز الشبكة بصريًا عن المشهد.
وأخيرًا، تُرسل <code>glFlush</code> إشارةً إلى مشغّل الرسوميات بأننا مستعدّون لتفريغ المخزن المؤقّت وعرضه على الشاشة.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Viewer</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; The render pass for the scene &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.init_view()

        glEnable(GL_LIGHTING)
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

        <span class="hljs-comment"># Load the modelview matrix from the current state of the trackball</span>
        glMatrixMode(GL_MODELVIEW)
        glPushMatrix()
        glLoadIdentity()
        loc = <span class="hljs-variable language_">self</span>.interaction.translation
        glTranslated(loc[<span class="hljs-number">0</span>], loc[<span class="hljs-number">1</span>], loc[<span class="hljs-number">2</span>])
        glMultMatrixf(<span class="hljs-variable language_">self</span>.interaction.trackball.matrix)

        <span class="hljs-comment"># store the inverse of the current modelview.</span>
        currentModelView = numpy.array(glGetFloatv(GL_MODELVIEW_MATRIX))
        <span class="hljs-variable language_">self</span>.modelView = numpy.transpose(currentModelView)
        <span class="hljs-variable language_">self</span>.inverseModelView = inv(numpy.transpose(currentModelView))

        <span class="hljs-comment"># render the scene. This will call the render function for each object</span>
        <span class="hljs-comment"># in the scene</span>
        <span class="hljs-variable language_">self</span>.scene.render()

        <span class="hljs-comment"># draw the grid</span>
        glDisable(GL_LIGHTING)
        glCallList(G_OBJ_PLANE)
        glPopMatrix()

        <span class="hljs-comment"># flush the buffers so that the scene can be drawn</span>
        glFlush()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">init_view</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; initialize the projection matrix &quot;&quot;&quot;</span>
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        aspect_ratio = <span class="hljs-built_in">float</span>(xSize) / <span class="hljs-built_in">float</span>(ySize)

        <span class="hljs-comment"># load the projection matrix. Always the same</span>
        glMatrixMode(GL_PROJECTION)
        glLoadIdentity()

        glViewport(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, xSize, ySize)
        gluPerspective(<span class="hljs-number">70</span>, aspect_ratio, <span class="hljs-number">0.1</span>, <span class="hljs-number">1000.0</span>)
        glTranslated(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, -<span class="hljs-number">15</span>)

</code></pre>
<h3 id="ماذا-نعرض-المشهد">ماذا نعرض: المشهد</h3>
<p>الآن وقد هيّأنا خط أنابيب العرض ليتعامل مع الرسم في فضاء الإحداثيات العالمي، فما الذي سنعرضه؟ تذكّر أن هدفنا هو
الحصول على تصميم يتألّف من نماذج ثلاثية الأبعاد. فنحن بحاجة إلى بنية بيانات تحتوي التصميم، ونحتاج إلى استخدام هذه البنية لعرض التصميم.
لاحظ أعلاه أننا نستدعي <code>self.scene.render()</code> من حلقة العرض في العارض. فما هو المشهد؟</p>
<p>صنف <code>Scene</code> هو الواجهة التي نستخدمها للتعامل مع بنية البيانات التي نمثّل بها التصميم. فهو يحجب تفاصيل بنية البيانات ويوفّر
دوال الواجهة اللازمة للتفاعل مع التصميم، بما في ذلك دوال العرض وإضافة العناصر والتلاعب بها. وهناك كائن <code>Scene</code> واحد، يملكه العارض.
تحتفظ نسخة <code>Scene</code> بقائمة بكل عناصر المشهد، وتُسمّى <code>node_list</code>. كما أنها تتتبّع العنصر المحدَّد.
وتستدعي دالة <code>render</code> في المشهد ببساطة دالة <code>render</code> على كل عنصر من عناصر <code>node_list</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Scene</span>(<span class="hljs-title class_ inherited__">object</span>):

    <span class="hljs-comment"># the default depth from the camera to place an object at</span>
    PLACE_DEPTH = <span class="hljs-number">15.0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># The scene keeps a list of nodes that are displayed</span>
        <span class="hljs-variable language_">self</span>.node_list = <span class="hljs-built_in">list</span>()
        <span class="hljs-comment"># Keep track of the currently selected node.</span>
        <span class="hljs-comment"># Actions may depend on whether or not something is selected</span>
        <span class="hljs-variable language_">self</span>.selected_node = <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_node</span>(<span class="hljs-params">self, node</span>):
        <span class="hljs-string">&quot;&quot;&quot; Add a new node to the scene &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.node_list.append(node)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; Render the scene. &quot;&quot;&quot;</span>
        <span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.node_list:
            node.render()
</code></pre>
<h3 id="العقد">العُقد</h3>
<p>في دالة <code>render</code> الخاصة بالمشهد، نستدعي <code>render</code> على كل عنصر في <code>node_list</code> الخاصة بالمشهد. لكن ما هي عناصر
تلك القائمة؟ نسمّيها <em>عُقدًا</em> (nodes).
من المفهوم، العقدة هي أي شيء يمكن وضعه في المشهد.
في البرمجيات الموجّهة نحو الكائنات، نكتب <code>Node</code> بوصفها صنفًا أساسيًا تجريديًا. وأي أصناف تمثّل أجسامًا ستوضع في <code>Scene</code> سترث من <code>Node</code>.
يسمح لنا هذا الصنف الأساسي بأن نستنتج أمور المشهد بشكل مجرّد.
ولا يحتاج بقية قاعدة الشيفرة إلى معرفة تفاصيل الأجسام التي تعرضها؛ ولا يحتاج سوى أن يعرف أنها من صنف <code>Node</code>.</p>
<p>يعرّف كل نوع من أنواع <code>Node</code> سلوكه الخاص في عرض نفسه وفي أي تفاعلات أخرى.
يتتبّع <code>Node</code> بيانات مهمة عن نفسه: مصفوفة الإزاحة، ومصفوفة التحجيم، واللون، وما إلى ذلك. فضرب مصفوفة إزاحة العقدة في
مصفوفة تحجيمها يعطي مصفوفة التحويل من فضاء الإحداثيات النمذجي للعقدة إلى فضاء الإحداثيات العالمي.
وتخزّن العقدة أيضًا صندوق حدود محاذٍ للمحاور (AABB). وسنرى المزيد عن صناديق AABB حين نتحدّث عن التحديد أدناه.</p>
<p>أبسط تنفيذ ملموس لـ<code>Node</code> هو <em>شكل أوّلي</em> (primitive). والشكل الأوّلي هو شكل صلب واحد يمكن إضافته إلى المشهد. وفي هذا المشروع، الأشكال الأوّلية هي <code>Cube</code> و<code>Sphere</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Node</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-string">&quot;&quot;&quot; Base class for scene elements &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.color_index = random.randint(color.MIN_COLOR, color.MAX_COLOR)
        <span class="hljs-variable language_">self</span>.aabb = AABB([<span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>], [<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>])
        <span class="hljs-variable language_">self</span>.translation_matrix = numpy.identity(<span class="hljs-number">4</span>)
        <span class="hljs-variable language_">self</span>.scaling_matrix = numpy.identity(<span class="hljs-number">4</span>)
        <span class="hljs-variable language_">self</span>.selected = <span class="hljs-literal">False</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; renders the item to the screen &quot;&quot;&quot;</span>
        glPushMatrix()
        glMultMatrixf(numpy.transpose(<span class="hljs-variable language_">self</span>.translation_matrix))
        glMultMatrixf(<span class="hljs-variable language_">self</span>.scaling_matrix)
        cur_color = color.COLORS[<span class="hljs-variable language_">self</span>.color_index]
        glColor3f(cur_color[<span class="hljs-number">0</span>], cur_color[<span class="hljs-number">1</span>], cur_color[<span class="hljs-number">2</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.selected:  <span class="hljs-comment"># emit light if the node is selected</span>
            glMaterialfv(GL_FRONT, GL_EMISSION, [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.3</span>])
        
        <span class="hljs-variable language_">self</span>.render_self()

        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.selected:
            glMaterialfv(GL_FRONT, GL_EMISSION, [<span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>])
        glPopMatrix()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render_self</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">raise</span> NotImplementedError(
            <span class="hljs-string">&quot;The Abstract Node Class doesn&#x27;t define &#x27;render_self&#x27;&quot;</span>)

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Primitive</span>(<span class="hljs-title class_ inherited__">Node</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">super</span>(Primitive, <span class="hljs-variable language_">self</span>).__init__()
        <span class="hljs-variable language_">self</span>.call_list = <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render_self</span>(<span class="hljs-params">self</span>):
        glCallList(<span class="hljs-variable language_">self</span>.call_list)


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Sphere</span>(<span class="hljs-title class_ inherited__">Primitive</span>):
    <span class="hljs-string">&quot;&quot;&quot; Sphere primitive &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">super</span>(Sphere, <span class="hljs-variable language_">self</span>).__init__()
        <span class="hljs-variable language_">self</span>.call_list = G_OBJ_SPHERE


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Cube</span>(<span class="hljs-title class_ inherited__">Primitive</span>):
    <span class="hljs-string">&quot;&quot;&quot; Cube primitive &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">super</span>(Cube, <span class="hljs-variable language_">self</span>).__init__()
        <span class="hljs-variable language_">self</span>.call_list = G_OBJ_CUBE
</code></pre>
<p>يقوم عرض العُقد على مصفوفات التحويل التي تخزّنها كل عقدة. ومصفوفة التحويل لعقدة هي دمج لمصفوفة تحجيمها ومصفوفة إزاحتها. وبغضّ النظر عن نوع العقدة، فالخطوة الأولى في العرض هي ضبط
مصفوفة ModelView في OpenGL على مصفوفة التحويل التي تحوّل من فضاء الإحداثيات النمذجي إلى فضاء الإحداثيات الخاص بالمنظور.
وحين تصير مصفوفات OpenGL محدَّثة، نستدعي <code>render_self</code> لنطلب من العقدة أن تُجري استدعاءات OpenGL اللازمة لرسم نفسها. وأخيرًا،
نتراجع عن أي تغييرات أجريناها على حالة OpenGL الخاصة بهذه العقدة بعينها. فنستخدم دالتَي <code>glPushMatrix</code> و<code>glPopMatrix</code> في OpenGL لحفظ
حالة مصفوفة ModelView واستعادتها قبل عرض العقدة وبعده.
لاحظ أن العقدة تخزّن لونها وموضعها ومقياسها، وتطبّقها على حالة OpenGL قبل العرض.</p>
<p>إذا كانت العقدة محدَّدة حاليًا، نجعلها تُصدر ضوءًا. وبهذه الطريقة يحصل المستخدم على إشارة بصرية إلى العقدة التي حدّدها.</p>
<p>لعرض الأشكال الأوّلية، نستخدم ميزة قوائم الاستدعاء (call lists) في OpenGL.
قائمة استدعاء OpenGL هي سلسلة من استدعاءات OpenGL تُعرَّف مرة واحدة وتُحزَّم معًا تحت اسم واحد.
يمكن إطلاق هذه الاستدعاءات عبر <code>glCallList(LIST_NAME)</code>. ويعرّف كل شكل أوّلي (<code>Sphere</code> و<code>Cube</code>) قائمة الاستدعاء اللازمة لعرضه (غير مبيّنة هنا).</p>
<p>فمثلًا، ترسم قائمة الاستدعاء الخاصة بمكعّب أوجهه الستة، مع مركز عند الأصل وأضلاع طولها وحدة واحدة بالضبط. \\newpage</p>
<pre><code class="language-python"><span class="hljs-comment"># Pseudocode Cube definition</span>
<span class="hljs-comment"># Left face</span>
((-<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (-<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (-<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (-<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>)),
<span class="hljs-comment"># Back face</span>
((-<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (-<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>)),
<span class="hljs-comment"># Right face</span>
((<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>)),
<span class="hljs-comment"># Front face</span>
((-<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (-<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>)),
<span class="hljs-comment"># Bottom face</span>
((-<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (-<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>)),
<span class="hljs-comment"># Top face</span>
((-<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>), (-<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>), (<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>, -<span class="hljs-number">0.5</span>))
</code></pre>
<p>ولو اقتصرنا على الأشكال الأوّلية وحدها لكان ذلك محدودًا جدًا لتطبيقات النمذجة. فالنماذج ثلاثية الأبعاد تتألّف عمومًا من عدة أشكال أوّلية
(أو من شبكات مثلثية، وهي خارج نطاق هذا المشروع).
ولحسن الحظ، يتيح لنا تصميمنا لصنف <code>Node</code> عُقد <code>Scene</code> المكوّنة من عدة أشكال أوّلية. وفي الواقع، يمكننا دعم تجميعات اعتباطية
للعُقد من دون أي تعقيد إضافي.</p>
<p>وكحافز على ذلك، لنفكّر في شكل بسيط جدًا: رجل ثلج نموذجي، أو شكل ثلج، مكوّن من ثلاث كرات. ورغم أن هذا الشكل يتألّف من ثلاثة أشكال أوّلية منفصلة، نودّ أن نتمكّن من معاملته ككائن واحد.</p>
<p>ننشئ صنفًا يُسمّى <code>HierarchicalNode</code>، وهو عقدة <code>Node</code> تحتوي على عقد أخرى. وهو يدير قائمة من «الأبناء».
وتستدعي دالة <code>render_self</code> الخاصة بالعُقد الهرمية ببساطة دالة <code>render_self</code> على كل عقدة من العقد الأبناء.
ومع صنف <code>HierarchicalNode</code>، يصبح من السهل جدًا إضافة الأشكال إلى المشهد.
والآن، يصبح تعريف شكل الثلج بسيطًا مثل تحديد الأشكال التي يتألّف منها، ومواضعها النسبية وأحجامها.</p>
<p>\\aosafigure[240pt]/images/500-lines/modeller-1-nodes.webp{تسلسل هرمي لأصناف <code>Node</code> الفرعية}{500l.modeller.hierarchy}</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">HierarchicalNode</span>(<span class="hljs-title class_ inherited__">Node</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">super</span>(HierarchicalNode, <span class="hljs-variable language_">self</span>).__init__()
        <span class="hljs-variable language_">self</span>.child_nodes = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render_self</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">for</span> child <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.child_nodes:
            child.render()
</code></pre>
<p>\\newpage</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">SnowFigure</span>(<span class="hljs-title class_ inherited__">HierarchicalNode</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">super</span>(SnowFigure, <span class="hljs-variable language_">self</span>).__init__()
        <span class="hljs-variable language_">self</span>.child_nodes = [Sphere(), Sphere(), Sphere()]
        <span class="hljs-variable language_">self</span>.child_nodes[<span class="hljs-number">0</span>].translate(<span class="hljs-number">0</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0</span>) <span class="hljs-comment"># scale 1.0</span>
        <span class="hljs-variable language_">self</span>.child_nodes[<span class="hljs-number">1</span>].translate(<span class="hljs-number">0</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0</span>)
        <span class="hljs-variable language_">self</span>.child_nodes[<span class="hljs-number">1</span>].scaling_matrix = numpy.dot(
            <span class="hljs-variable language_">self</span>.scaling_matrix, scaling([<span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.8</span>]))
        <span class="hljs-variable language_">self</span>.child_nodes[<span class="hljs-number">2</span>].translate(<span class="hljs-number">0</span>, <span class="hljs-number">0.75</span>, <span class="hljs-number">0</span>)
        <span class="hljs-variable language_">self</span>.child_nodes[<span class="hljs-number">2</span>].scaling_matrix = numpy.dot(
            <span class="hljs-variable language_">self</span>.scaling_matrix, scaling([<span class="hljs-number">0.7</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.7</span>]))
        <span class="hljs-keyword">for</span> child_node <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.child_nodes:
            child_node.color_index = color.MIN_COLOR
        <span class="hljs-variable language_">self</span>.aabb = AABB([<span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>, <span class="hljs-number">0.0</span>], [<span class="hljs-number">0.5</span>, <span class="hljs-number">1.1</span>, <span class="hljs-number">0.5</span>])
</code></pre>
<p>قد تلاحظ أن كائنات <code>Node</code> تشكّل بنية بيانات شجرية. فدالة <code>render</code>، عبر العُقد الهرمية، تنفّذ اجتيازًا بعمق أول على
الشجرة. وأثناء اجتيازها، تحتفظ بمكدّس من مصفوفات <code>ModelView</code>، المستخدَمة للتحويل إلى فضاء العالم.
وفي كل خطوة، تدفع مصفوفة <code>ModelView</code> الحالية على المكدّس، وحين تكتمل عملية عرض جميع العقد الأبناء،
تُسقط المصفوفة من المكدّس، تاركةً مصفوفة <code>ModelView</code> الخاصة بالعقدة الأم في قمة المكدّس.</p>
<p>وبجعل صنف <code>Node</code> قابلًا للتوسيع بهذه الطريقة، يمكننا إضافة أنواع جديدة من الأشكال إلى المشهد دون تغيير أيّ من بقية شيفرة
التلاعب بالمشهد وعرضه. واستخدام فكرة العقدة لتجريد واقع أن كائن <code>Scene</code> واحدًا قد يملك أبناءً كثيرين يُعرَف بنمط التصميم المركّب (Composite design pattern).</p>
<h3 id="تفاعل-المستخدم">تفاعل المستخدم</h3>
<p>الآن وبعد أن أصبح مصمّمنا قادرًا على تخزين المشهد وعرضه، نحتاج إلى وسيلة للتفاعل معه.
وهناك نوعان من التفاعلات علينا تيسيرهما.
أولًا، نحتاج إلى القدرة على تغيير زاوية النظر إلى المشهد. فنريد أن نتمكّن من تحريك العين، أو الكاميرا، حول المشهد.
ثانيًا، نحتاج إلى أن نتمكّن من إضافة عُقد جديدة وتعديل عُقد في المشهد.</p>
<p>ولتفعيل تفاعل المستخدم، نحتاج إلى معرفة متى يضغط المستخدم على المفاتيح أو يحرّك الفأرة. ولحسن الحظ، يعرف نظام التشغيل بالفعل متى تقع هذه الأحداث. وتتيح لنا GLUT تسجيل دالة تُستدعى كلما وقع حدث معيّن.
نكتب دوال لتفسير ضغطات المفاتيح وحركة الفأرة، ونخبر GLUT بأن تستدعي تلك الدوال حين تُضغط المفاتيح المقابلة.
ومتى عرفنا المفاتيح التي يضغطها المستخدم، نحتاج إلى تفسير المُدخلات وتطبيق الإجراءات المقصودة على المشهد.</p>
<p>المنطق الخاص بالاستماع إلى أحداث نظام التشغيل وتفسير معناها موجود في صنف <code>Interaction</code>.
وصنف <code>Viewer</code> الذي كتبناه في وقت سابق يملك النسخة الوحيدة من <code>Interaction</code>.
سنستخدم آلية الاستدعاء في GLUT لتسجيل دوال تُستدعى عند ضغط زر الفأرة (<code>glutMouseFunc</code>)، وعند تحريك الفأرة (<code>glutMotionFunc</code>)، وعند ضغط زر على لوحة المفاتيح (<code>glutKeyboardFunc</code>)، وعند ضغط مفاتيح الأسهم (<code>glutSpecialFunc</code>).
وسنرى قريبًا الدوال التي تعالج أحداث المُدخلات.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Interaction</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; Handles user interaction &quot;&quot;&quot;</span>
        <span class="hljs-comment"># currently pressed mouse button</span>
        <span class="hljs-variable language_">self</span>.pressed = <span class="hljs-literal">None</span>
        <span class="hljs-comment"># the current location of the camera</span>
        <span class="hljs-variable language_">self</span>.translation = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>]
        <span class="hljs-comment"># the trackball to calculate rotation</span>
        <span class="hljs-variable language_">self</span>.trackball = trackball.Trackball(theta = -<span class="hljs-number">25</span>, distance=<span class="hljs-number">15</span>)
        <span class="hljs-comment"># the current mouse location</span>
        <span class="hljs-variable language_">self</span>.mouse_loc = <span class="hljs-literal">None</span>
        <span class="hljs-comment"># Unsophisticated callback mechanism</span>
        <span class="hljs-variable language_">self</span>.callbacks = defaultdict(<span class="hljs-built_in">list</span>)
        
        <span class="hljs-variable language_">self</span>.register()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">register</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; register callbacks with glut &quot;&quot;&quot;</span>
        glutMouseFunc(<span class="hljs-variable language_">self</span>.handle_mouse_button)
        glutMotionFunc(<span class="hljs-variable language_">self</span>.handle_mouse_move)
        glutKeyboardFunc(<span class="hljs-variable language_">self</span>.handle_keystroke)
        glutSpecialFunc(<span class="hljs-variable language_">self</span>.handle_keystroke)

</code></pre>
<h4>استدعاءات نظام التشغيل</h4>
<p>حتى نتمكّن من تفسير مُدخلات المستخدم على نحو ذي معنى،
نحتاج إلى الجمع بين معرفة بموضع الفأرة وأزرارها ولوحة المفاتيح. ولأن ترجمة مُدخلات المستخدم إلى إجراءات ذات معنى تتطلّب كثيرًا من أسطر الشيفرة، فإننا نغلّفها في صنف منفصل، بعيدًا عن مسار الشيفرة الرئيس.
ويُخفي صنف <code>Interaction</code> التعقيدَ غير ذي الصلة عن بقية قاعدة الشيفرة، ويترجم أحداث نظام التشغيل إلى أحداث على مستوى التطبيق.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Interaction </span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">translate</span>(<span class="hljs-params">self, x, y, z</span>):
        <span class="hljs-string">&quot;&quot;&quot; translate the camera &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.translation[<span class="hljs-number">0</span>] += x
        <span class="hljs-variable language_">self</span>.translation[<span class="hljs-number">1</span>] += y
        <span class="hljs-variable language_">self</span>.translation[<span class="hljs-number">2</span>] += z

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">handle_mouse_button</span>(<span class="hljs-params">self, button, mode, x, y</span>):
        <span class="hljs-string">&quot;&quot;&quot; Called when the mouse button is pressed or released &quot;&quot;&quot;</span>
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        y = ySize - y  <span class="hljs-comment"># invert the y coordinate because OpenGL is inverted</span>
        <span class="hljs-variable language_">self</span>.mouse_loc = (x, y)

        <span class="hljs-keyword">if</span> mode == GLUT_DOWN:
            <span class="hljs-variable language_">self</span>.pressed = button
            <span class="hljs-keyword">if</span> button == GLUT_RIGHT_BUTTON:
                <span class="hljs-keyword">pass</span>
            <span class="hljs-keyword">elif</span> button == GLUT_LEFT_BUTTON:  <span class="hljs-comment"># pick</span>
                <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;pick&#x27;</span>, x, y)
            <span class="hljs-keyword">elif</span> button == <span class="hljs-number">3</span>:  <span class="hljs-comment"># scroll up</span>
                <span class="hljs-variable language_">self</span>.translate(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1.0</span>)
            <span class="hljs-keyword">elif</span> button == <span class="hljs-number">4</span>:  <span class="hljs-comment"># scroll up</span>
                <span class="hljs-variable language_">self</span>.translate(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, -<span class="hljs-number">1.0</span>)
        <span class="hljs-keyword">else</span>:  <span class="hljs-comment"># mouse button release</span>
            <span class="hljs-variable language_">self</span>.pressed = <span class="hljs-literal">None</span>
        glutPostRedisplay()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">handle_mouse_move</span>(<span class="hljs-params">self, x, screen_y</span>):
        <span class="hljs-string">&quot;&quot;&quot; Called when the mouse is moved &quot;&quot;&quot;</span>
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        y = ySize - screen_y  <span class="hljs-comment"># invert the y coordinate because OpenGL is inverted</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.pressed <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
            dx = x - <span class="hljs-variable language_">self</span>.mouse_loc[<span class="hljs-number">0</span>]
            dy = y - <span class="hljs-variable language_">self</span>.mouse_loc[<span class="hljs-number">1</span>]
            <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.pressed == GLUT_RIGHT_BUTTON <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.trackball <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
                <span class="hljs-comment"># ignore the updated camera loc because we want to always</span>
                <span class="hljs-comment"># rotate around the origin</span>
                <span class="hljs-variable language_">self</span>.trackball.drag_to(<span class="hljs-variable language_">self</span>.mouse_loc[<span class="hljs-number">0</span>], <span class="hljs-variable language_">self</span>.mouse_loc[<span class="hljs-number">1</span>], dx, dy)
            <span class="hljs-keyword">elif</span> <span class="hljs-variable language_">self</span>.pressed == GLUT_LEFT_BUTTON:
                <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;move&#x27;</span>, x, y)
            <span class="hljs-keyword">elif</span> <span class="hljs-variable language_">self</span>.pressed == GLUT_MIDDLE_BUTTON:
                <span class="hljs-variable language_">self</span>.translate(dx/<span class="hljs-number">60.0</span>, dy/<span class="hljs-number">60.0</span>, <span class="hljs-number">0</span>)
            <span class="hljs-keyword">else</span>:
                <span class="hljs-keyword">pass</span>
            glutPostRedisplay()
        <span class="hljs-variable language_">self</span>.mouse_loc = (x, y)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">handle_keystroke</span>(<span class="hljs-params">self, key, x, screen_y</span>):
        <span class="hljs-string">&quot;&quot;&quot; Called on keyboard input from the user &quot;&quot;&quot;</span>
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        y = ySize - screen_y
        <span class="hljs-keyword">if</span> key == <span class="hljs-string">&#x27;s&#x27;</span>:
            <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;place&#x27;</span>, <span class="hljs-string">&#x27;sphere&#x27;</span>, x, y)
        <span class="hljs-keyword">elif</span> key == <span class="hljs-string">&#x27;c&#x27;</span>:
            <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;place&#x27;</span>, <span class="hljs-string">&#x27;cube&#x27;</span>, x, y)
        <span class="hljs-keyword">elif</span> key == GLUT_KEY_UP:
            <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;scale&#x27;</span>, up=<span class="hljs-literal">True</span>)
        <span class="hljs-keyword">elif</span> key == GLUT_KEY_DOWN:
            <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;scale&#x27;</span>, up=<span class="hljs-literal">False</span>)
        <span class="hljs-keyword">elif</span> key == GLUT_KEY_LEFT:
            <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;rotate_color&#x27;</span>, forward=<span class="hljs-literal">True</span>)
        <span class="hljs-keyword">elif</span> key == GLUT_KEY_RIGHT:
            <span class="hljs-variable language_">self</span>.trigger(<span class="hljs-string">&#x27;rotate_color&#x27;</span>, forward=<span class="hljs-literal">False</span>)
        glutPostRedisplay()
</code></pre>
<h4>الاستدعاءات الداخلية</h4>
<p>في مقتطف الشيفرة أعلاه، ستلاحظ أن نسخة <code>Interaction</code> حين تفسّر إجراءً من إجراءات المستخدم تستدعي <code>self.trigger</code> مع سلسلة تصف
نوع الإجراء. ودالة <code>trigger</code> في صنف <code>Interaction</code> هي جزء من نظام استدعاءات بسيط سنستخدمه للتعامل مع الأحداث على مستوى
التطبيق.
وتذكّر أن دالة <code>init_interaction</code> في صنف <code>Viewer</code> تسجّل دوال الاستدعاء على نسخة <code>Interaction</code> عبر استدعاء <code>register_callback</code>.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Interaction</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">register_callback</span>(<span class="hljs-params">self, name, func</span>):
        <span class="hljs-variable language_">self</span>.callbacks[name].append(func)
</code></pre>
<p>وحين تحتاج شيفرة واجهة المستخدم إلى إطلاق حدث على المشهد، يستدعي صنف <code>Interaction</code> كل دوال الاستدعاء التي حفظها لذلك الحدث بعينه:</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Interaction</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">trigger</span>(<span class="hljs-params">self, name, *args, **kwargs</span>):
        <span class="hljs-keyword">for</span> func <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.callbacks[name]:
            func(*args, **kwargs)
</code></pre>
<p>يحجب نظام الاستدعاءات على مستوى التطبيق الحاجة إلى أن يعرف بقية النظام شيئًا عن مُدخلات نظام التشغيل. ويمثّل كل استدعاء على مستوى التطبيق طلبًا ذا معنى داخل التطبيق.
ويعمل صنف <code>Interaction</code> بوصفه مترجمًا بين أحداث نظام التشغيل والأحداث على مستوى التطبيق.
وهذا يعني أن لو قرّرنا نقل المصمّم إلى طقم أدوات آخر إلى جانب GLUT، لما احتجنا سوى استبدال صنف <code>Interaction</code>
بصنف يحوّل المُدخلات من الطقم الجديد إلى المجموعة نفسها من استدعاءات التطبيق ذات المعنى. ونستخدم دوال الاستدعاء ووسائطها في \\aosatblref{500l.tbl.callbacks}.</p>
<table>
<thead>
<tr>
<th style="text-align:left">دالة الاستدعاء</th>
<th style="text-align:left">الوسائط</th>
<th style="text-align:left">الغرض</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>pick</code></td>
<td style="text-align:left">x:number, y:number</td>
<td style="text-align:left">تحدّد العقدة الموجودة عند موضع مؤشر الفأرة.</td>
</tr>
<tr>
<td style="text-align:left"><code>move</code></td>
<td style="text-align:left">x:number, y:number</td>
<td style="text-align:left">تنقل العقدة المحدَّدة حاليًا إلى موضع مؤشر الفأرة.</td>
</tr>
<tr>
<td style="text-align:left"><code>place</code></td>
<td style="text-align:left">shape:string, x:number, y:number</td>
<td style="text-align:left">تضع شكلًا من النوع المحدَّد عند موضع مؤشر الفأرة.</td>
</tr>
<tr>
<td style="text-align:left"><code>rotate_color</code></td>
<td style="text-align:left">forward:boolean</td>
<td style="text-align:left">تدوّر لون العقدة المحدَّدة حاليًا عبر قائمة الألوان، إلى الأمام أو إلى الخلف.</td>
</tr>
<tr>
<td style="text-align:left"><code>scale</code></td>
<td style="text-align:left">up:boolean</td>
<td style="text-align:left">تكبّر أو تصغّر العقدة المحدَّدة حاليًا، وفقًا للوسيط.</td>
</tr>
</tbody>
</table>
<p>: \\label{500l.tbl.callbacks} دوال الاستدعاء ووسائطها الخاصة بتفاعل المستخدم</p>
<latex>
\\begin{table}
\\centering
{\\footnotesize
\\rowcolors{2}{TableOdd}{TableEven}
\\begin{tabular}{lll}
\\hline
\\textbf{Callback}
& \\textbf{Arguments}
& \\textbf{Purpose}
\\\\
\\hline
pick    
& x:number, y:number 
& Selects the node at the mouse pointer location
\\\\
place & 
shape:string, x:number, y:number & 
Places a shape of the specified type at the mouse pointer location.
\\\\
rotate\\_color & 
forward:boolean & 
Rotates the color of the currently selected node.
\\\\
scale & 
up:boolean & 
Scales the currently selected node up or down.
\\\\
\\hline
\\end{tabular}
}
\\caption{Interaction callbacks and arguments}
\\label{500l.tbl.callbacks}
\\end{table}
</latex>
<p>يوفّر نظام الاستدعاءات البسيط هذا كل الوظائف التي نحتاجها في هذا المشروع. غير أن مصمّمًا ثلاثي الأبعاد في بيئة الإنتاج يحتاج عادةً إلى إنشاء كائنات واجهة المستخدم وإتلافها ديناميكيًا.
وفي تلك الحالة، ستحتاج إلى نظام أكثر تعقيدًا لمراقبة الأحداث، بحيث تستطيع الكائنات أن تسجّل دوال استدعاء للأحداث وأن تلغي تسجيلها.</p>
<h3 id="التواصل-مع-المشهد">التواصل مع المشهد</h3>
<p>بآلية الاستدعاء التي لدينا، يمكننا تلقّي معلومات ذات معنى عن أحداث مُدخلات المستخدم من صنف <code>Interaction</code>. فنحن مستعدّون لتطبيق هذه الإجراءات على <code>Scene</code>.</p>
<h4>تحريك المشهد</h4>
<p>في هذا المشروع، نحقق حركة الكاميرا بتحويل المشهد. بمعنى آخر، تكون
الكاميرا في موقع ثابت، ويحرّك مُدخل المستخدم المشهد بدل تحريك الكاميرا. وتُوضَع الكاميرا عند <code>[0, 0, -15]</code> وتواجه
أصل فضاء العالم. (وبدلًا من ذلك، يمكننا تغيير مصفوفة المنظور لتحريك الكاميرا بدل المشهد.
ولهذا القرار التصميمي أثر ضئيل جدًا على بقية المشروع.)
والعودة إلى دالة <code>render</code> في <code>Viewer</code>، نرى أن حالة <code>Interaction</code> تُستخدم لتحويل حالة مصفوفات OpenGL قبل عرض <code>Scene</code>.
وهناك نوعان من التفاعل مع المشهد: الدوران والإزاحة.</p>
<h4>تدوير المشهد بواسطة كرة التتبّع</h4>
<p>نحقق دوران المشهد باستخدام خوارزمية <em>كرة التتبّع</em> (trackball). وكرة التتبّع واجهة بديهية للتلاعب بالمشهد في ثلاثة أبعاد.
ومن المفهوم، تعمل واجهة كرة التتبّع وكأن المشهد موضوع داخل كرة شفافة. فوضع اليد على سطح الكرة ودفعها يُدير الكرة. وبالمثل، فإن الضغط بالزر الأيمن للفأرة وتحريكها على الشاشة يُدير المشهد.
يمكنك معرفة المزيد عن نظريّة كرة التتبّع في <a href="http://www.opengl.org/wiki/Object_Mouse_Trackball">OpenGL Wiki</a>.
وفي هذا المشروع، نستخدم تنفيذًا لكرة التتبّع موفَّرًا كجزء من <a href="https://code.google.com/p/glumpy/source/browse/glumpy/trackball.py">Glumpy</a>.</p>
<p>نتفاعل مع كرة التتبّع باستخدام دالة <code>drag_to</code>، مع موضع الفأرة الحالي كموضع بداية وتغيّر موضع الفأرة كوسائط.</p>
<pre><code class="language-python"><span class="hljs-variable language_">self</span>.trackball.drag_to(<span class="hljs-variable language_">self</span>.mouse_loc[<span class="hljs-number">0</span>], <span class="hljs-variable language_">self</span>.mouse_loc[<span class="hljs-number">1</span>], dx, dy)
</code></pre>
<p>مصفوفة الدوران الناتجة هي <code>trackball.matrix</code> في العارض حين يُعرض المشهد.</p>
<h4>استطراد: الكواتيرونات</h4>
<p>تُمثَّل الدورانات تقليديًا بإحدى طريقتين. الأولى هي قيمة دوران حول كل محور؛ ويمكنك تخزينها كثلاثية من الأعداد العشرية.
والتمثيل الشائع الآخر للدورانات هو الكواتيرون، وهو عنصر يتألّف من متجّه بإحداثيات $x$ و$y$ و$z$، ومن دوران $w$. لاستخدام الكواتيرونات فوائد عديدة مقارنة بالدوران لكل محور على حدة؛ وعلى الخصوص، فهي أكثر استقرارًا عدديًا. واستخدام الكواتيرونات يتجنّب مشكلات مثل قفل الجيمبال (gimbal lock).
الجانب السلبي للكواتيرونات أنها أقل حدسية في العمل وأصعب في الفهم. وإن كنت شجاعًا وتودّ معرفة المزيد عن الكواتيرونات، فيمكنك الرجوع إلى <a href="http://3dgep.com/?p=1815">هذا الشرح</a>.</p>
<p>يتجنّب تنفيذ كرة التتبّع قفل الجيمبال باستخدام الكواتيرونات داخليًا لتخزين دوران المشهد. ولحسن الحظ، لا نحتاج إلى التعامل مع الكواتيرونات مباشرةً، لأن العضو matrix في كرة التتبّع
يحوّل الدوران إلى مصفوفة.</p>
<h4>إزاحة المشهد</h4>
<p>إزاحة المشهد (أي انزلاقه) أبسط بكثير من تدويره. وتتوفّر إزاحات المشهد عبر عجلة الفأرة والزر الأيسر. فيحرّك الزر الأيسر
المشهد في إحداثيتي $x$ و$y$. وتدوير عجلة الفأرة يزيح المشهد في إحداثي z
(نحو الكاميرا أو بعيدًا عنها). ويخزّن صنف <code>Interaction</code> إزاحة المشهد الحالية ويعدّلها بالدالة <code>translate</code>.
ويسترد العارض موقع الكاميرا لدى <code>Interaction</code> أثناء العرض لاستخدامه في استدعاء <code>glTranslated</code>.</p>
<h4>تحديد عناصر المشهد</h4>
<p>الآن وبعد أن استطاع المستخدم تحريك المشهد كليّةً وتدويره للحصول على زاوية النظر التي يريدها، تتمثّل الخطوة التالية في السماح له بتعديل الكائنات التي يتألّف منها المشهد والتلاعب بها.</p>
<p>ولكي يتمكّن المستخدم من التلاعب بالأجسام في المشهد، عليه أن يستطيع تحديد العناصر.</p>
<p>لتحديد عنصر، نستخدم مصفوفة الإسقاط الحالية لتوليد شعاع يمثّل ضغطة الفأرة، كأنّ مؤشر الفأرة يطلق شعاعًا
داخل المشهد. والعقدة المحدَّدة هي أقرب عقدة إلى الكاميرا يتقاطع معها الشعاع.
وعليه، فإن مسألة الالتقاط (picking) تختزل إلى مسألة إيجاد تقاطعات بين شعاع وعُقد في المشهد. فالسؤال هو: كيف نعرف أن الشعاع أصاب عقدة؟</p>
<p>فحساب ما إذا كان الشعاع يتقاطع مع عقدة بدقّة مسألة صعبة من حيث تعقيد الشيفرة ومن حيث الأداء معًا. فلنحتج إلى كتابة فحص تقاطع شعاع-جسم لكل نوع من أنواع الأشكال الأوّلية.
أمّا عقد المشهد ذات الهندسات الشبكية المعقّدة ذات الأوجه كثيرة، فحساب تقاطع الشعاع-الجسم بدقّة يتطلّب اختبار الشعاع مع كل وجه
ويكون مكلفًا حسابيًا.</p>
<p>ولأغراض إبقاء الشيفرة مختصرة والأداء معقولًا، نستخدم تقريبًا بسيطًا وسريعًا لاختبار تقاطع الشعاع-الجسم.
وفي تنفيذنا، تخزّن كل عقدة صندوق حدود محاذٍ للمحاور (AABB)، وهو تقريبٌ للمكان الذي تشغله.
ولاختبار ما إذا كان الشعاع يتقاطع مع عقدة، نختبر ما إذا كان الشعاع يتقاطع مع صندوق AABB الخاص بتلك العقدة. ويعني هذا التنفيذ أن جميع العقد تتشارك
الشيفرة نفسها لاختبارات التقاطع، ويعني أيضًا أن تكلفة الأداء ثابتة وصغيرة لجميع أنواع العقد.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Viewer</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_ray</span>(<span class="hljs-params">self, x, y</span>):
        <span class="hljs-string">&quot;&quot;&quot; 
        Generate a ray beginning at the near plane, in the direction that
        the x, y coordinates are facing 

        Consumes: x, y coordinates of mouse on screen 
        Return: start, direction of the ray 
        &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.init_view()
    
        glMatrixMode(GL_MODELVIEW)
        glLoadIdentity()
    
        <span class="hljs-comment"># get two points on the line.</span>
        start = numpy.array(gluUnProject(x, y, <span class="hljs-number">0.001</span>))
        end = numpy.array(gluUnProject(x, y, <span class="hljs-number">0.999</span>))
    
        <span class="hljs-comment"># convert those points into a ray</span>
        direction = end - start
        direction = direction / norm(direction)
    
        <span class="hljs-keyword">return</span> (start, direction)
    
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pick</span>(<span class="hljs-params">self, x, y</span>):
        <span class="hljs-string">&quot;&quot;&quot; Execute pick of an object. Selects an object in the scene. &quot;&quot;&quot;</span>
        start, direction = <span class="hljs-variable language_">self</span>.get_ray(x, y)
        <span class="hljs-variable language_">self</span>.scene.pick(start, direction, <span class="hljs-variable language_">self</span>.modelView)
</code></pre>
<p>لتحديد العقدة التي جرى النقر عليها، نتجوّل في المشهد لنختبر ما إذا كان الشعاع يصيب أيّ عقد. ونلغي تحديد العقدة المحدَّدة حاليًا، ثم نختار العقدة التي يقطعها الشعاع عند أقرب نقطة إلى منشأ الشعاع.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Scene</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pick</span>(<span class="hljs-params">self, start, direction, mat</span>):
        <span class="hljs-string">&quot;&quot;&quot; 
        Execute selection.
            
        start, direction describe a Ray. 
        mat is the inverse of the current modelview matrix for the scene.
        &quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.selected_node <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
            <span class="hljs-variable language_">self</span>.selected_node.select(<span class="hljs-literal">False</span>)
            <span class="hljs-variable language_">self</span>.selected_node = <span class="hljs-literal">None</span>
    
        <span class="hljs-comment"># Keep track of the closest hit.</span>
        mindist = sys.maxint
        closest_node = <span class="hljs-literal">None</span>
        <span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.node_list:
            hit, distance = node.pick(start, direction, mat)
            <span class="hljs-keyword">if</span> hit <span class="hljs-keyword">and</span> distance &lt; mindist:
                mindist, closest_node = distance, node
    
        <span class="hljs-comment"># If we hit something, keep track of it.</span>
        <span class="hljs-keyword">if</span> closest_node <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
            closest_node.select()
            closest_node.depth = mindist
            closest_node.selected_loc = start + direction * mindist
            <span class="hljs-variable language_">self</span>.selected_node = closest_node
</code></pre>
<p>داخل صنف <code>Node</code>، تختبر دالة <code>pick</code> ما إذا كان الشعاع يتقاطع مع صندوق الحدود المحاذٍ للمحاور الخاص بـ<code>Node</code>.
وإذا كانت عقدة محدَّدة، فإن دالة <code>select</code> تقلب حالة التحديد للعقدة.
لاحظ أن دالة <code>ray_hit</code> الخاصة بـAABB تقبل مصفوفة التحويل بين فضاء إحداثيات الصندوق وفضاء إحداثيات
الشعاع كوسيط ثالث. وتطبّق كل عقدة تحويلها الخاص على المصفوفة قبل استدعاء الدالة <code>ray_hit</code>.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Node</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pick</span>(<span class="hljs-params">self, start, direction, mat</span>):
        <span class="hljs-string">&quot;&quot;&quot; 
        Return whether or not the ray hits the object

        Consume:  
        start, direction form the ray to check
        mat is the modelview matrix to transform the ray by 
        &quot;&quot;&quot;</span>

        <span class="hljs-comment"># transform the modelview matrix by the current translation</span>
        newmat = numpy.dot(
            numpy.dot(mat, <span class="hljs-variable language_">self</span>.translation_matrix), 
            numpy.linalg.inv(<span class="hljs-variable language_">self</span>.scaling_matrix)
        )
        results = <span class="hljs-variable language_">self</span>.aabb.ray_hit(start, direction, newmat)
        <span class="hljs-keyword">return</span> results

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">select</span>(<span class="hljs-params">self, select=<span class="hljs-literal">None</span></span>):
       <span class="hljs-string">&quot;&quot;&quot; Toggles or sets selected state &quot;&quot;&quot;</span>
       <span class="hljs-keyword">if</span> select <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
           <span class="hljs-variable language_">self</span>.selected = select
       <span class="hljs-keyword">else</span>:
           <span class="hljs-variable language_">self</span>.selected = <span class="hljs-keyword">not</span> <span class="hljs-variable language_">self</span>.selected
    
</code></pre>
<p>مقاربة التحديد بالشعاع-صندوق-الحدود بسيطة جدًا في الفهم والتنفيذ. غير أن النتائج تكون خاطئة في ظروف معيّنة.</p>
<p>\\aosafigure[240pt]/images/500-lines/modeller-2-AABBError.webp{خطأ صندوق الحدود}{500l.modeller.aabberror}</p>
<p>فمثلًا، في حالة الشكل الأوّلي <code>Sphere</code>، لا تلامس الكرة نفسها صندوق الحدود إلا في مركز كل وجه من أوجه الصندوق.
غير أن المستخدم إذا نقر على إحدى زوايا صندوق حدود الكرة، سيُكتشف التصادم مع الكرة، حتى لو كان المقصود النقر
خلف الكرة على شيء خلفها (\\aosafigref{500l.modeller.aabberror}).</p>
<p>هذا المفاضلة بين التعقيد والأداء والدقّة شائعة في الرسوميات الحاسوبية وفي مجالات كثيرة من هندسة البرمجيات.</p>
<h4>تعديل عناصر المشهد</h4>
<p>التالي، نودّ السماح للمستخدم بالتلاعب بالعُقد المحدَّدة. فقد يريد تحريكها أو تغيير حجمها أو تغيير لونها.
وحين يُدخل المستخدم أمرًا للتلاعب بعقدة، يحوّل صنف <code>Interaction</code> المُدخل إلى الإجراء الذي قصده المستخدم، ثم يستدعي دالة الاستدعاء المقابلة.</p>
<p>وحين يتلقّى <code>Viewer</code> استدعاء لأحد هذه الأحداث، فإنه يستدعي الدالة المناسبة على <code>Scene</code>، التي تطبّق بدورها التحويل على <code>Node</code> المحدَّدة حاليًا.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Viewer</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">move</span>(<span class="hljs-params">self, x, y</span>):
        <span class="hljs-string">&quot;&quot;&quot; Execute a move command on the scene. &quot;&quot;&quot;</span>
        start, direction = <span class="hljs-variable language_">self</span>.get_ray(x, y)
        <span class="hljs-variable language_">self</span>.scene.move_selected(start, direction, <span class="hljs-variable language_">self</span>.inverseModelView)
    
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">rotate_color</span>(<span class="hljs-params">self, forward</span>):
        <span class="hljs-string">&quot;&quot;&quot; 
        Rotate the color of the selected Node. 
        Boolean &#x27;forward&#x27; indicates direction of rotation. 
        &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.scene.rotate_selected_color(forward)
    
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">scale</span>(<span class="hljs-params">self, up</span>):
        <span class="hljs-string">&quot;&quot;&quot; Scale the selected Node. Boolean up indicates scaling larger.&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.scene.scale_selected(up)
</code></pre>
<h4>تغيير اللون</h4>
<p>يتم التلاعب باللون عبر قائمة بألوان ممكنة. ويمكن للمستخدم التنقّل في هذه القائمة بمفاتيح الأسهم. ويوجّه المشهد أمر تغيير اللون إلى
العقدة المحدَّدة حاليًا.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Scene</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">rotate_selected_color</span>(<span class="hljs-params">self, forwards</span>):
        <span class="hljs-string">&quot;&quot;&quot; Rotate the color of the currently selected node &quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.selected_node <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>: <span class="hljs-keyword">return</span>
        <span class="hljs-variable language_">self</span>.selected_node.rotate_color(forwards)
</code></pre>
<p>تخزّن كل عقدة لونها الحالي. وتكتفي دالة <code>rotate_color</code> بتعديل اللون الحالي للعقدة. ويُمرَّر اللون إلى OpenGL عبر <code>glColor</code> حين تُعرض العقدة.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Node</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">rotate_color</span>(<span class="hljs-params">self, forwards</span>):
        <span class="hljs-variable language_">self</span>.color_index += <span class="hljs-number">1</span> <span class="hljs-keyword">if</span> forwards <span class="hljs-keyword">else</span> -<span class="hljs-number">1</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.color_index &gt; color.MAX_COLOR:
            <span class="hljs-variable language_">self</span>.color_index = color.MIN_COLOR
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.color_index &lt; color.MIN_COLOR:
            <span class="hljs-variable language_">self</span>.color_index = color.MAX_COLOR
</code></pre>
<h4>تحجيم العُقد</h4>
<p>وكما في اللون، يوجّه المشهد أي تعديلات تحجيم إلى العقدة المحدَّدة إن وُجدت.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Scene</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_selected</span>(<span class="hljs-params">self, up</span>):
        <span class="hljs-string">&quot;&quot;&quot; Scale the current selection &quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.selected_node <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>: <span class="hljs-keyword">return</span>
        <span class="hljs-variable language_">self</span>.selected_node.scale(up)
    
</code></pre>
<p>تخزّن كل عقدة مصفوفة حالية تمثّل مقياسها. والمصفوفة التي تُحجِّم بمعاملات $x$ و$y$ و$z$ في كلٍّ من اتجاهاتها هي:</p>
<latex>
$$
   \\begin{bmatrix}
   x & 0 & 0 & 0 \\\\
   0 & y & 0 & 0 \\\\
   0 & 0 & z & 0 \\\\
   0 & 0 & 0 & 1 \\\\
   \\end{bmatrix}
$$
</latex>
<p>$$
\\begin{bmatrix}
x &amp; 0 &amp; 0 &amp; 0 \\
0 &amp; y &amp; 0 &amp; 0 \\
0 &amp; 0 &amp; z &amp; 0 \\
0 &amp; 0 &amp; 0 &amp; 1 \\
\\end{bmatrix}
$$</p>
<p>حين يعدّل المستخدم مقياس عقدة، تُضرب مصفوفة التحجيم الناتجة في مصفوفة التحجيم الحالية للعقدة.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Node</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">scale</span>(<span class="hljs-params">self, up</span>):
        s =  <span class="hljs-number">1.1</span> <span class="hljs-keyword">if</span> up <span class="hljs-keyword">else</span> <span class="hljs-number">0.9</span>
        <span class="hljs-variable language_">self</span>.scaling_matrix = numpy.dot(<span class="hljs-variable language_">self</span>.scaling_matrix, scaling([s, s, s]))
        <span class="hljs-variable language_">self</span>.aabb.scale(s)
</code></pre>
<p>تُعيد الدالة <code>scaling</code> مصفوفة من هذا النوع، انطلاقًا من قائمة عوامل التحجيم في $x$ و$y$ و$z$.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">scaling</span>(<span class="hljs-params">scale</span>):
    s = numpy.identity(<span class="hljs-number">4</span>)
    s[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>] = scale[<span class="hljs-number">0</span>]
    s[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>] = scale[<span class="hljs-number">1</span>]
    s[<span class="hljs-number">2</span>, <span class="hljs-number">2</span>] = scale[<span class="hljs-number">2</span>]
    s[<span class="hljs-number">3</span>, <span class="hljs-number">3</span>] = <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> s
</code></pre>
<h4>تحريك العُقد</h4>
<p>لإزاحة عقدة، نستخدم حساب الشعاع نفسه الذي استخدمناه في الالتقاط. ونمرّر الشعاع الذي يمثّل موضع الفأرة الحالي إلى دالة <code>move</code>
في المشهد. وينبغي أن يكون الموضع الجديد للعقدة على الشعاع.
ولتحديد أين على الشعاع نضع العقدة، نحتاج إلى معرفة مسافة العقدة عن الكاميرا. وبما أننا خزّنّا موضع العقدة ومسافتها
عن الكاميرا وقت تحديدها (في دالة <code>pick</code>)، يمكننا استخدام تلك البيانات هنا.
نجد النقطة التي تكون على الشعاع الهدف على المسافة نفسها من الكاميرا، ونحسب فرق المتجّه بين الموضعين الجديد والقديم.
ثم نزيح العقدة بالمتجّه الناتج.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Scene</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">move_selected</span>(<span class="hljs-params">self, start, direction, inv_modelview</span>):
        <span class="hljs-string">&quot;&quot;&quot; 
        Move the selected node, if there is one.
            
        Consume: 
        start, direction describes the Ray to move to
        mat is the modelview matrix for the scene 
        &quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.selected_node <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>: <span class="hljs-keyword">return</span>
    
        <span class="hljs-comment"># Find the current depth and location of the selected node</span>
        node = <span class="hljs-variable language_">self</span>.selected_node
        depth = node.depth
        oldloc = node.selected_loc
    
        <span class="hljs-comment"># The new location of the node is the same depth along the new ray</span>
        newloc = (start + direction * depth)
    
        <span class="hljs-comment"># transform the translation with the modelview matrix</span>
        translation = newloc - oldloc
        pre_tran = numpy.array([translation[<span class="hljs-number">0</span>], translation[<span class="hljs-number">1</span>], translation[<span class="hljs-number">2</span>], <span class="hljs-number">0</span>])
        translation = inv_modelview.dot(pre_tran)
    
        <span class="hljs-comment"># translate the node and track its location</span>
        node.translate(translation[<span class="hljs-number">0</span>], translation[<span class="hljs-number">1</span>], translation[<span class="hljs-number">2</span>])
        node.selected_loc = newloc
</code></pre>
<p>لاحظ أن الموضعين الجديد والقديم مُعرَّفان في فضاء إحداثيات الكاميرا. ونحن بحاجة إلى أن تكون إزاحتنا مُعرَّفة في فضاء الإحداثيات العالمي.
وعليه، نحوّل إزاحة فضاء الكاميرا إلى إزاحة في فضاء العالم عبر الضرب في مقلوب مصفوفة modelview.</p>
<p>وكما في التحجيم، تخزّن كل عقدة مصفوفة تمثّل إزاحتها. وتبدو مصفوفة الإزاحة هكذا:</p>
<p>$$
\\begin{bmatrix}
1 &amp; 0 &amp; 0 &amp; x \\
0 &amp; 1 &amp; 0 &amp; y \\
0 &amp; 0 &amp; 1 &amp; z \\
0 &amp; 0 &amp; 0 &amp; 1 \\
\\end{bmatrix}
$$</p>
<p>حين تُزاح العقدة، نبني مصفوفة إزاحة جديدة للإزاحة الحالية، ونضربها في مصفوفة
إزاحة العقدة لاستخدامها أثناء العرض.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Node</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">translate</span>(<span class="hljs-params">self, x, y, z</span>):
        <span class="hljs-variable language_">self</span>.translation_matrix = numpy.dot(
            <span class="hljs-variable language_">self</span>.translation_matrix, 
            translation([x, y, z]))
</code></pre>
<p>تُعيد الدالة <code>translation</code> مصفوفة إزاحة انطلاقًا من قائمة تمثّل مسافات الإزاحة في $x$ و$y$ و$z$.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">translation</span>(<span class="hljs-params">displacement</span>):
    t = numpy.identity(<span class="hljs-number">4</span>)
    t[<span class="hljs-number">0</span>, <span class="hljs-number">3</span>] = displacement[<span class="hljs-number">0</span>]
    t[<span class="hljs-number">1</span>, <span class="hljs-number">3</span>] = displacement[<span class="hljs-number">1</span>]
    t[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>] = displacement[<span class="hljs-number">2</span>]
    <span class="hljs-keyword">return</span> t
</code></pre>
<h4>وضع العُقد</h4>
<p>يستخدم وضع العقد تقنيات من الالتقاط ومن الإزاحة معًا. ونستخدم حساب الشعاع نفسه لموضع الفأرة الحالي لتحديد أين نضع العقدة.</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Viewer</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">place</span>(<span class="hljs-params">self, shape, x, y</span>):
        <span class="hljs-string">&quot;&quot;&quot; Execute a placement of a new primitive into the scene. &quot;&quot;&quot;</span>
        start, direction = <span class="hljs-variable language_">self</span>.get_ray(x, y)
        <span class="hljs-variable language_">self</span>.scene.place(shape, start, direction, <span class="hljs-variable language_">self</span>.inverseModelView)
</code></pre>
<p>لوضع عقدة جديدة، ننشئ أولًا نسخة جديدة من نوع العقدة المقابل ونضيفها إلى المشهد.
ونريد أن نضع العقدة تحت مؤشّر المستخدم، فنجد نقطة على الشعاع على مسافة ثابتة من الكاميرا.
ومرة أخرى، يُمثَّل الشعاع في فضاء الكاميرا، لذا نحوّل متجّه الإزاحة الناتج إلى فضاء الإحداثيات العالمي بضربه في مقلوب مصفوفة modelview.
وأخيرًا، نزيح العقدة الجديدة بالمتجّه المحسوب. \\newpage</p>
<pre><code class="language-python">    <span class="hljs-comment"># class Scene</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">place</span>(<span class="hljs-params">self, shape, start, direction, inv_modelview</span>):
        <span class="hljs-string">&quot;&quot;&quot; 
        Place a new node.
            
        Consume:  
        shape the shape to add
        start, direction describes the Ray to move to
        inv_modelview is the inverse modelview matrix for the scene 
        &quot;&quot;&quot;</span>
        new_node = <span class="hljs-literal">None</span>
        <span class="hljs-keyword">if</span> shape == <span class="hljs-string">&#x27;sphere&#x27;</span>: new_node = Sphere()
        <span class="hljs-keyword">elif</span> shape == <span class="hljs-string">&#x27;cube&#x27;</span>: new_node = Cube()
        <span class="hljs-keyword">elif</span> shape == <span class="hljs-string">&#x27;figure&#x27;</span>: new_node = SnowFigure()
    
        <span class="hljs-variable language_">self</span>.add_node(new_node)
    
        <span class="hljs-comment"># place the node at the cursor in camera-space</span>
        translation = (start + direction * <span class="hljs-variable language_">self</span>.PLACE_DEPTH)
    
        <span class="hljs-comment"># convert the translation to world-space</span>
        pre_tran = numpy.array([translation[<span class="hljs-number">0</span>], translation[<span class="hljs-number">1</span>], translation[<span class="hljs-number">2</span>], <span class="hljs-number">1</span>])
        translation = inv_modelview.dot(pre_tran)
    
        new_node.translate(translation[<span class="hljs-number">0</span>], translation[<span class="hljs-number">1</span>], translation[<span class="hljs-number">2</span>])
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تهانينا! لقد نجحنا في تنفيذ مصمّم ثلاثي الأبعاد صغير الحجم!</p>
<p>\\aosafigure[240pt]/images/500-lines/modeller-3-StartScene.webp{مشهد نموذجي}{500l.modeller.samplescene}</p>
<p>لقد رأينا كيف نطوّر بنية بيانات قابلة للتوسيع لتمثيل الأجسام في
المشهد. ولاحظنا أن استخدام نمط التصميم المركّب وبنية بيانات قائمة على شجرة
يجعل اجتياز المشهد لأغراض العرض سهلًا، ويسمح لنا
بإضافة أنواع جديدة من العُقد من دون أي تعقيد إضافي. وقد استعنّا بهذه البنية
من البيانات لعرض التصميم على الشاشة، وتلاعبنا بمصفوفات OpenGL
أثناء اجتياز رسم المشهد البياني. وقد بنينا نظام استدعاءات بسيطًا جدًا
للأحداث على مستوى التطبيق، واستعملناه لتغليف معالجة أحداث نظام
التشغيل. وقد ناقشنا تنفيذيّات ممكنة لكشف تصادم الشعاع والجسم،
والمفاضلة بين الصحّة والتعقيد والأداء.
وأخيرًا، نفّذنا دوال للتلاعب بمحتويات المشهد.</p>
<p>يمكنك أن تتوقّع العثور على لبنات البناء الأساسية نفسها في برمجيات ثلاثية الأبعاد جاهزة للإنتاج. فبنية رسم المشهد البياني وفضاءات الإحداثيات النسبية موجودة في
أنواع كثيرة من تطبيقات الرسوميات ثلاثية الأبعاد، من أدوات CAD إلى محرّكات الألعاب.
أحد التخفيفات الجوهرية في هذا المشروع يكمن في واجهة المستخدم. فالمصمّم ثلاثي الأبعاد في بيئة الإنتاج من المتوقّع أن له
واجهة مستخدم كاملة، ما يستلزم نظام أحداث أكثر تعقيدًا بكثير بدلًا من نظام الاستدعاءات البسيط الذي لدينا.</p>
<p>يمكننا أن نجري تجارب إضافية لإضافة ميزات جديدة إلى هذا المشروع. جرّب واحدة من هذه:</p>
<ul>
<li>أضف نوع <code>Node</code> يدعم الشبكات المثلثية من أجل الأشكال العشوائية.</li>
<li>أضف مكدّس تراجع (undo stack) يسمح بالتراجع عن إجراءات المصمّم وإعادة تنفيذها.</li>
<li>احفظ التصميم وحمّله باستخدام صيغة ملفات ثلاثية الأبعاد مثل DXF.</li>
<li>ادمج محرّك عرض: صدّر التصميم لاستخدامه في عارض ذو واقعية فوتوغرافية.</li>
<li>حسّن كشف التصادم بتقاطع دقيق بين الشعاع والجسم.</li>
</ul>
<h2 id="استكشاف-إضافي">استكشاف إضافي</h2>
<p>للاطّلاع على رؤى أعمق حول برمجيات النمذجة ثلاثية الأبعاد في العالم الحقيقي، تتّسم بعض المشاريع مفتوحة المصدر بالاهتمام.</p>
<p><a href="http://www.blender.org/">Blender</a> حزمة رسوميات متحركة ثلاثية الأبعاد مفتوحة المصدر وغنية الميزات. فهي تقدّر خط أنابيب ثلاثي الأبعاد كاملًا لبناء المؤثرات البصرية في الفيديو، أو لإنشاء الألعاب. والمصمّم جزء صغير من هذا
المشروع، وهو مثال جيّد على دمج مصمّم داخل حزمة برمجية كبيرة.</p>
<p><a href="http://www.openscad.org/">OpenSCAD</a> أداة نمذجة ثلاثية الأبعاد مفتوحة المصدر. وهي ليست تفاعلية؛ بل تقرأ ملفًا نصيًا يحدّد كيفية توليد المشهد. وهذا يمنح المصمّم «تحكّمًا كاملًا في عملية النمذجة».</p>
<p>ولمزيد من المعلومات عن الخوارزميات والتقنيات في الرسوميات الحاسوبية، فإن <a href="http://tog.acm.org/resources/GraphicsGems/">Graphics Gems</a> مصدر رائع.</p>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,p as headings,c as html,e as slug,l as title};
