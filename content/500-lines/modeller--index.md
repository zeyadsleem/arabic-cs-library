---
title: "مصمّم ثلاثي الأبعاد"
lang: ar
source: https://aosabook.org/en/500L/modeller.html
---

_إريك مطوّر برمجيات ومهووس بالرسوميات الحاسوبية ثنائية وثلاثية الأبعاد. عمل على ألعاب الفيديو وبرمجيات المؤثرات البصرية ثلاثية الأبعاد وأدوات التصميم بمساعدة الحاسوب. فإذا كان الأمر يتعلق بمحاكاة الواقع، فرُهن أنه يودّ معرفة المزيد عنه. يمكنك العثور عليه على الإنترنت في [erickdransch.com](http://erickdransch.com)._

## مقدّمة
البشر مبدعون بطبعهم. فنحن نصمّم ونبني باستمرار أشياء جديدة ومفيدة ومثيرة للاهتمام. وفي العصر الحديث، نكتب برمجيات تساعدنا في عمليتي التصميم والإنشاء.
تتيح برمجيات التصميم بمساعدة الحاسوب (CAD) للمصمّين تصميم المباني والجسور وأعمال ألعاب الفيديو،
ووحشيات الأفلام والأجسام القابلة للطباعة ثلاثية الأبعاد وكل ما عداها قبل بناء نسخة مادية من التصميم.

جوهر أدوات CAD هو طريقة لتجريد التصميم ثلاثي الأبعاد في شيء يمكن عرضه وتحريره على شاشة ثنائية الأبعاد.
ولكي تفي بهذا التعريف، يجب أن تقدّم أدوات CAD ثلاث قطع أساسية من الوظائف.
أولًا، يجب أن تملك بنية بيانات تمثّل الجسم الجاري تصميمه: وهذا هو فهم الحاسوب للعالم ثلاثي الأبعاد الذي يبنيه المستخدم.
ثانيًا، يجب أن تقدّم أداة CAD بعض الوسيلة لعرض التصميم على شاشة المستخدم. فالمستخدم يصمّم جسمًا ماديًا بثلاثة أبعاد، بينما شاشة الحاسوب ببعدين فقط.
يجب أن تُنمذج أداة CAD كيف ندرك الأجسام، وأن ترسمها على الشاشة بطريقة يستطيع بها المستخدم فهم أبعاد الجسم الثلاثة كلها.
ثالثًا، يجب أن تقدّم أداة CAD وسيلة للتفاعل مع الجسم الجاري تصميمه. ويجب أن يستطيع المستخدم الإضافة إلى التصميم وتعديله لينتج النتيجة المرغوبة.
وإضافةً إلى ذلك، ستحتاج كل الأدوات إلى وسيلة لحفظ التصاميم وتحميلها من القرص حتى يتمكن المستخدمون من التعاون والمشاركة وحفظ عملهم.

تقدّم أداة CAD الخاصة بمجال معيّن ميزات إضافية كثيرة تلبّي متطلبات ذلك المجال. فمثلًا، ستحتاج أداة CAD معمارية إلى محاكاة فيزيائية لاختبار الإجهادات المناخية على المبنى،
وستحتاج أداة الطباعة ثلاثية الأبعاد إلى ميزات تتحقّق مما إذا كان الجسم صالحًا للطباعة فعلًا، وستحاكي أداة CAD كهربائية فيزياء الكهرباء التي تجري في النحاس، وستطوي حزمة المؤثرات البصرية السينمائية
ميزات تحاكي الديناميكا الحرارية بدقّة.

غير أن كل أدوات CAD يجب أن تتضمّن على الأقل الميزات الثلاث التي ناقشناها أعلاه: بنية بيانات تمثّل التصميم، والقدرة على عرضه على الشاشة، وطريقة للتفاعل معه.

وفي هذا السياق، لنستكشف كيف يمكننا تمثيل تصميم ثلاثي الأبعاد، وعرضه على الشاشة، والتفاعل معه، في خمسمئة سطر من بايثون.

## العرض بوصفه التوجيهاً
القوة الكامنة وراء كثير من قرارات التصميم في المصمّم ثلاثي الأبعاد هي عملية العرض (rendering).
نريد أن نتمكّن من تخزين أجسام معقّدة في تصميمنا وعرضها، لكننا نريد أن نبقي تعقيد شيفرة العرض منخفضًا.
لنفحص عملية العرض، ونستكشف بنية بيانات التصميم التي تتيح لنا تخزين أجسام معقّدة إلى أي حدّ ورسمها بمنطق عرض بسيط.

### إدارة الواجهات والحلقة الرئيسة
قبل أن نبدأ العرض، هناك أمور قليلة علينا أن نجهّزها. أولًا، نحتاج إلى إنشاء نافذة لعرض تصميمنا فيها.
ثانيًا، نريد أن نتواصل مع مشغّلات الرسوميات من أجل العرض على الشاشة.
لا نفضّل التواصل مباشرةً مع مشغّلات الرسوميات، لذا نستخدم طبقة تجريد عابرة للمنصّات تُسمّى OpenGL، و
مكتبة تُسمّى GLUT (حزمة أدوات OpenGL) لإدارة نافذتنا.

#### ملاحظة عن OpenGL
<!-- @mikedebo: Are we going to have actual sidebars in the book? If so we can make this into a sidebar (together with the paragraph on GLUT). Keep in mind sidebars can be hard (but not impossible) to do in ebooks. I wouldn't do sidebars unless there are at least three chapters which use them. -->
OpenGL هي واجهة برمجية لتطبيقات الرسوميات من أجل التطوير العابر للمنصّات. وهي الواجهة البرمجية القياسية لتطوير تطبيقات الرسوميات عبر المنصّات.
ولـ OpenGL نوعان رئيسيان: OpenGL القديم (Legacy) وOpenGL الحديث (Modern).

يقوم العرض في OpenGL على مضلّعات معرَّفة بالرؤوس والعموميات (normals). فمثلًا، لعرض ضلع واحد من مكعّب، نحدّد الرؤوس الأربعة وعمومية ذلك الضلع.

يوفّر OpenGL القديم «خط أنابيب بدوال ثابتة» (fixed function pipeline). فبتضبط متغيّرات عامة، يستطيع المبرمج تفعيل تنفيذات آلية لميزات مثل
الإضاءة والتلوين وإخفاء الأوجه (face culling) وغيرها. ثم يعرض OpenGL المشهد تلقائيًا بالميزات المفعّلة. وهذه الوظائف مهجورة.

أما OpenGL الحديث، من ناحية أخرى، فيتميّز بخط أنابيب عرض قابل للبرمجة يكتب فيه المبرمج برامج صغيرة تُسمّى «مُظلِّمات الظل» (shaders)
تعمل على عتاد رسومي مخصّص (وحدات معالجة الرسوميات، GPUs). وقد حلّ خط الأنابيب القابل للبرمجة في OpenGL الحديث محلّ OpenGL القديم.

في هذا المشروع، سنستخدم OpenGL القديم رغم أنه مهجور. فالوظائف الثابتة التي يوفّرها OpenGL القديم مفيدة جدًا
في الحفاظ على حجم الشيفرة صغيرًا. فهي تقلّل مقدار الجبر الخطي المطلوب معرفته، وتبسّط الشيفرة التي سنكتبها.

#### عن GLUT
تتيح لنا GLUT، المضمّنة مع OpenGL، إنشاء نوافذ نظام التشغيل وتسجيل دوال استدعاء (callbacks) لواجهة المستخدم. وهذه الوظيفة الأساسية
كافية لأغراضنا. ولو أردنا مكتبة أغنى ميزات لإدارة النوافذ والتفاعل مع المستخدم، لفكّرنا في استخدام طقم نوافذ كامل مثل GTK أو Qt.

#### العارض
لإدارة إعداد GLUT وOpenGL وقيادة بقية أجزاء المصمّم، ننشئ صنفًا يُسمّى `Viewer`.
نستخدم نسخة واحدة من `Viewer` تدير إنشاء النافذة والعرض، وتحتوي الحلقة الرئيسة لبرنامجنا.
وفي عملية التهيئة الخاصة بـ`Viewer`، ننشئ نافذة الواجهة الرسومية ونهيّئ OpenGL.

تنشئ الدالة `init_interface` النافذة التي سيُعرض فيها المصمّم، وتحدّد الدالة التي ستُستدعى حين يحتاج التصميم إلى العرض.
تضبط الدالة `init_opengl` حالة OpenGL التي يحتاجها المشروع. فهي تضبط المصفوفات، وتفعّل إخفاء الأوجه الخلفية،
وتسجّل مصدرًا ضوئيًا لإضاءة المشهد، وتخبر OpenGL أننا نودّ تلوين الأجسام.
تنشئ الدالة `init_scene` كائن `Scene` وتضع بعض العُقد الأولية ليبدأ المستخدم. وسنرى المزيد عن بنية بيانات `Scene` بعد قليل.
وأخيرًا، تسجّل `init_interaction` دوال الاستدعاء الخاصة بتفاعل المستخدم، كما سنناقش لاحقًا.

بعد تهيئة `Viewer`، نستدعي `glutMainLoop` لتسليم تنفيذ البرنامج إلى GLUT. وهذه الدالة لا تعود أبدًا. وستُستدعى دوال الاستدعاء التي سجّلناها
على أحداث GLUT عند وقوع تلك الأحداث.

```python
class Viewer(object):
    def __init__(self):
        """ Initialize the viewer. """
        self.init_interface()
        self.init_opengl()
        self.init_scene()
        self.init_interaction()
        init_primitives()

    def init_interface(self):
        """ initialize the window and register the render function """
        glutInit()
        glutInitWindowSize(640, 480)
        glutCreateWindow("3D Modeller")
        glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB)
        glutDisplayFunc(self.render)

    def init_opengl(self):
        """ initialize the opengl settings to render the scene """
        self.inverseModelView = numpy.identity(4)
        self.modelView = numpy.identity(4)

        glEnable(GL_CULL_FACE)
        glCullFace(GL_BACK)
        glEnable(GL_DEPTH_TEST)
        glDepthFunc(GL_LESS)

        glEnable(GL_LIGHT0)
        glLightfv(GL_LIGHT0, GL_POSITION, GLfloat_4(0, 0, 1, 0))
        glLightfv(GL_LIGHT0, GL_SPOT_DIRECTION, GLfloat_3(0, 0, -1))

        glColorMaterial(GL_FRONT_AND_BACK, GL_AMBIENT_AND_DIFFUSE)
        glEnable(GL_COLOR_MATERIAL)
        glClearColor(0.4, 0.4, 0.4, 0.0)

    def init_scene(self):
        """ initialize the scene object and initial scene """
        self.scene = Scene()
        self.create_sample_scene()

    def create_sample_scene(self):
        cube_node = Cube()
        cube_node.translate(2, 0, 2)
        cube_node.color_index = 2
        self.scene.add_node(cube_node)

        sphere_node = Sphere()
        sphere_node.translate(-2, 0, 2)
        sphere_node.color_index = 3
        self.scene.add_node(sphere_node)

        hierarchical_node = SnowFigure()
        hierarchical_node.translate(-2, 0, -2)
        self.scene.add_node(hierarchical_node)

    def init_interaction(self):
        """ init user interaction and callbacks """
        self.interaction = Interaction()
        self.interaction.register_callback('pick', self.pick)
        self.interaction.register_callback('move', self.move)
        self.interaction.register_callback('place', self.place)
        self.interaction.register_callback('rotate_color', self.rotate_color)
        self.interaction.register_callback('scale', self.scale)

    def main_loop(self):
        glutMainLoop()

if __name__ == "__main__":
    viewer = Viewer()
    viewer.main_loop()
```
قبل أن نتوغّل في دالة `render`، علينا أن نتناقش قليلًا في الجبر الخطي.

### فضاء الإحداثيات
في أغراضنا، فضاء الإحداثيات (Coordinate Space) هو نقطة أصل ومجموعة من ثلاثة متجهات أساس، وهي عادةً محاور $x$ و$y$ و$z$.

### النقطة
يمكن تمثيل أي نقطة في ثلاثة أبعاد كإزاحة في اتجاهات $x$ و$y$ و$z$ عن نقطة الأصل. وتمثيل النقطة نسبي إلى فضاء الإحداثيات الذي توجد فيه. والنقطة نفسها
لها تمثيلات مختلفة في فضاءات إحداثيات مختلفة. ويمكن تمثيل أي نقطة في ثلاثة أبعاد في أي فضاء إحداثيات ثلاثي الأبعاد.

### المتجّه
المتجّه هو قيمة $x$ و$y$ و$z$ تمثّل الفرق بين نقطتين في محوري $x$ و$y$ و$z$ على التوالي.

### مصفوفة التحويل
في الرسوميات الحاسوبية، من الملائم استخدام فضاءات إحداثيات مختلفة متعددة لأنواع مختلفة من النقاط. تحوّل مصفوفات التحويل النقاط من فضاء إحداثيات إلى فضاء إحداثيات آخر.
لتحويل متجّه $v$ من فضاء إحداثيات إلى آخر، نضربه في مصفوفة تحويل $M$: $v' = M v$.
ومن مصفوفات التحويل الشائعة الإزاحة (translations) والتحجيم (scaling) والدوران (rotations).

### فضاءات إحداثيات النموذج والعالَم والمنظور والإسقاط
\aosafigure[250pt]/images/500-lines/modeller-0-newtranspipe.webp{خط أنابيب التحويل}{500l.modeller.newtranspipe}

لرسم عنصر على الشاشة، نحتاج إلى التحويل بين بضعة فضاءات إحداثيات مختلفة.

يتولّى OpenGL نيابةً عنا كل ما على يمين \aosafigref{500l.modeller.newtranspipe}[^transimage]، بما في ذلك كل التحويلات من فضاء العين إلى فضاء إطار العرض.

[^transimage]: أشكر الدكتور أنطون جيرديلان على الصورة. وكتابه التعليمي عن OpenGL متاح على [http://antongerdelan.net/opengl/](http://antongerdelan.net/opengl/).

يتولّى `gluPerspective` التحويل من فضاء العين إلى فضاء القصّ المتجانس (homogeneous clip space)، ويتولّى `glViewport` التحويل إلى فضاء الجهاز المُطبَّع (normalized device space) وإطار العرض.
تُضرب هاتان المصفوفتان معًا وتُخزَّنان بوصفهما مصفوفة GL_PROJECTION.
لا نحتاج في هذا المشروع إلى معرفة المصطلحات ولا إلى تفاصيل كيفية عمل هاتين المصفوفتين.

غير أن علينا أن نتولّى بأنفسنا ما على يسار المخطط. فنعرّف مصفوفة تحوّل نقاط النموذج (ويسمّى أيضًا شبكةً، mesh) من فضاءات النموذج إلى فضاء العالم، وتُسمّى مصفوفة النموذج. ونعرّف كذلك مصفوفة المنظور (view matrix)، التي تحوّل من فضاء العالم إلى فضاء العين.
في هذا المشروع، ندمج هاتين المصفوفتين معًا للحصول على مصفوفة ModelView.

لمعرفة المزيد عن خط أنابيب العرض الرسومي الكامل، وعن فضاءات الإحداثيات المتدخّلة فيه، راجع الفصل الثاني من [*Real Time Rendering*](http://www.realtimerendering.com/)، أو كتابًا تمهيديًا آخر في الرسوميات الحاسوبية.

### العرض بالعارض
تبدأ دالة `render` بضبط أيّ حالة من حالة OpenGL ينبغي ضبطها في وقت العرض. فهي تهيّئ مصفوفة الإسقاط عبر `init_view`، وتستخدم بيانات العضو `interaction` لتهيئة مصفوفة ModelView بمصفوفة التحويل التي تحوّل من فضاء المشهد إلى فضاء العالم. وسنرى المزيد عن صنف Interaction أدناه. ثم تمسح الشاشة بـ`glClear` وتطلب من المشهد أن يعرض نفسه، ثم تعرض شبكة الوحدات.

نعطّل إضاءة OpenGL قبل عرض الشبكة. ومع تعطيل الإضاءة، يعرض OpenGL العناصر بألوان صلبة بدلًا من محاكاة مصدر ضوئي. وبهذه الطريقة تتميّز الشبكة بصريًا عن المشهد.
وأخيرًا، تُرسل `glFlush` إشارةً إلى مشغّل الرسوميات بأننا مستعدّون لتفريغ المخزن المؤقّت وعرضه على الشاشة.

```python
    # class Viewer
    def render(self):
        """ The render pass for the scene """
        self.init_view()

        glEnable(GL_LIGHTING)
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

        # Load the modelview matrix from the current state of the trackball
        glMatrixMode(GL_MODELVIEW)
        glPushMatrix()
        glLoadIdentity()
        loc = self.interaction.translation
        glTranslated(loc[0], loc[1], loc[2])
        glMultMatrixf(self.interaction.trackball.matrix)

        # store the inverse of the current modelview.
        currentModelView = numpy.array(glGetFloatv(GL_MODELVIEW_MATRIX))
        self.modelView = numpy.transpose(currentModelView)
        self.inverseModelView = inv(numpy.transpose(currentModelView))

        # render the scene. This will call the render function for each object
        # in the scene
        self.scene.render()

        # draw the grid
        glDisable(GL_LIGHTING)
        glCallList(G_OBJ_PLANE)
        glPopMatrix()

        # flush the buffers so that the scene can be drawn
        glFlush()

    def init_view(self):
        """ initialize the projection matrix """
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        aspect_ratio = float(xSize) / float(ySize)

        # load the projection matrix. Always the same
        glMatrixMode(GL_PROJECTION)
        glLoadIdentity()

        glViewport(0, 0, xSize, ySize)
        gluPerspective(70, aspect_ratio, 0.1, 1000.0)
        glTranslated(0, 0, -15)

```
### ماذا نعرض: المشهد
الآن وقد هيّأنا خط أنابيب العرض ليتعامل مع الرسم في فضاء الإحداثيات العالمي، فما الذي سنعرضه؟ تذكّر أن هدفنا هو
الحصول على تصميم يتألّف من نماذج ثلاثية الأبعاد. فنحن بحاجة إلى بنية بيانات تحتوي التصميم، ونحتاج إلى استخدام هذه البنية لعرض التصميم.
لاحظ أعلاه أننا نستدعي `self.scene.render()` من حلقة العرض في العارض. فما هو المشهد؟

صنف `Scene` هو الواجهة التي نستخدمها للتعامل مع بنية البيانات التي نمثّل بها التصميم. فهو يحجب تفاصيل بنية البيانات ويوفّر
دوال الواجهة اللازمة للتفاعل مع التصميم، بما في ذلك دوال العرض وإضافة العناصر والتلاعب بها. وهناك كائن `Scene` واحد، يملكه العارض.
تحتفظ نسخة `Scene` بقائمة بكل عناصر المشهد، وتُسمّى `node_list`. كما أنها تتتبّع العنصر المحدَّد.
وتستدعي دالة `render` في المشهد ببساطة دالة `render` على كل عنصر من عناصر `node_list`.

```python
class Scene(object):

    # the default depth from the camera to place an object at
    PLACE_DEPTH = 15.0

    def __init__(self):
        # The scene keeps a list of nodes that are displayed
        self.node_list = list()
        # Keep track of the currently selected node.
        # Actions may depend on whether or not something is selected
        self.selected_node = None

    def add_node(self, node):
        """ Add a new node to the scene """
        self.node_list.append(node)

    def render(self):
        """ Render the scene. """
        for node in self.node_list:
            node.render()
```

### العُقد
في دالة `render` الخاصة بالمشهد، نستدعي `render` على كل عنصر في `node_list` الخاصة بالمشهد. لكن ما هي عناصر
تلك القائمة؟ نسمّيها *عُقدًا* (nodes).
من المفهوم، العقدة هي أي شيء يمكن وضعه في المشهد.
في البرمجيات الموجّهة نحو الكائنات، نكتب `Node` بوصفها صنفًا أساسيًا تجريديًا. وأي أصناف تمثّل أجسامًا ستوضع في `Scene` سترث من `Node`.
يسمح لنا هذا الصنف الأساسي بأن نستنتج أمور المشهد بشكل مجرّد.
ولا يحتاج بقية قاعدة الشيفرة إلى معرفة تفاصيل الأجسام التي تعرضها؛ ولا يحتاج سوى أن يعرف أنها من صنف `Node`.

يعرّف كل نوع من أنواع `Node` سلوكه الخاص في عرض نفسه وفي أي تفاعلات أخرى.
يتتبّع `Node` بيانات مهمة عن نفسه: مصفوفة الإزاحة، ومصفوفة التحجيم، واللون، وما إلى ذلك. فضرب مصفوفة إزاحة العقدة في
مصفوفة تحجيمها يعطي مصفوفة التحويل من فضاء الإحداثيات النمذجي للعقدة إلى فضاء الإحداثيات العالمي.
وتخزّن العقدة أيضًا صندوق حدود محاذٍ للمحاور (AABB). وسنرى المزيد عن صناديق AABB حين نتحدّث عن التحديد أدناه.

أبسط تنفيذ ملموس لـ`Node` هو *شكل أوّلي* (primitive). والشكل الأوّلي هو شكل صلب واحد يمكن إضافته إلى المشهد. وفي هذا المشروع، الأشكال الأوّلية هي `Cube` و`Sphere`.

```python
class Node(object):
    """ Base class for scene elements """
    def __init__(self):
        self.color_index = random.randint(color.MIN_COLOR, color.MAX_COLOR)
        self.aabb = AABB([0.0, 0.0, 0.0], [0.5, 0.5, 0.5])
        self.translation_matrix = numpy.identity(4)
        self.scaling_matrix = numpy.identity(4)
        self.selected = False

    def render(self):
        """ renders the item to the screen """
        glPushMatrix()
        glMultMatrixf(numpy.transpose(self.translation_matrix))
        glMultMatrixf(self.scaling_matrix)
        cur_color = color.COLORS[self.color_index]
        glColor3f(cur_color[0], cur_color[1], cur_color[2])
        if self.selected:  # emit light if the node is selected
            glMaterialfv(GL_FRONT, GL_EMISSION, [0.3, 0.3, 0.3])
        
        self.render_self()

        if self.selected:
            glMaterialfv(GL_FRONT, GL_EMISSION, [0.0, 0.0, 0.0])
        glPopMatrix()

    def render_self(self):
        raise NotImplementedError(
            "The Abstract Node Class doesn't define 'render_self'")

class Primitive(Node):
    def __init__(self):
        super(Primitive, self).__init__()
        self.call_list = None

    def render_self(self):
        glCallList(self.call_list)


class Sphere(Primitive):
    """ Sphere primitive """
    def __init__(self):
        super(Sphere, self).__init__()
        self.call_list = G_OBJ_SPHERE


class Cube(Primitive):
    """ Cube primitive """
    def __init__(self):
        super(Cube, self).__init__()
        self.call_list = G_OBJ_CUBE
```

يقوم عرض العُقد على مصفوفات التحويل التي تخزّنها كل عقدة. ومصفوفة التحويل لعقدة هي دمج لمصفوفة تحجيمها ومصفوفة إزاحتها. وبغضّ النظر عن نوع العقدة، فالخطوة الأولى في العرض هي ضبط
مصفوفة ModelView في OpenGL على مصفوفة التحويل التي تحوّل من فضاء الإحداثيات النمذجي إلى فضاء الإحداثيات الخاص بالمنظور.
وحين تصير مصفوفات OpenGL محدَّثة، نستدعي `render_self` لنطلب من العقدة أن تُجري استدعاءات OpenGL اللازمة لرسم نفسها. وأخيرًا،
نتراجع عن أي تغييرات أجريناها على حالة OpenGL الخاصة بهذه العقدة بعينها. فنستخدم دالتَي `glPushMatrix` و`glPopMatrix` في OpenGL لحفظ
حالة مصفوفة ModelView واستعادتها قبل عرض العقدة وبعده.
لاحظ أن العقدة تخزّن لونها وموضعها ومقياسها، وتطبّقها على حالة OpenGL قبل العرض.

إذا كانت العقدة محدَّدة حاليًا، نجعلها تُصدر ضوءًا. وبهذه الطريقة يحصل المستخدم على إشارة بصرية إلى العقدة التي حدّدها.

لعرض الأشكال الأوّلية، نستخدم ميزة قوائم الاستدعاء (call lists) في OpenGL.
قائمة استدعاء OpenGL هي سلسلة من استدعاءات OpenGL تُعرَّف مرة واحدة وتُحزَّم معًا تحت اسم واحد.
يمكن إطلاق هذه الاستدعاءات عبر `glCallList(LIST_NAME)`. ويعرّف كل شكل أوّلي (`Sphere` و`Cube`) قائمة الاستدعاء اللازمة لعرضه (غير مبيّنة هنا).

فمثلًا، ترسم قائمة الاستدعاء الخاصة بمكعّب أوجهه الستة، مع مركز عند الأصل وأضلاع طولها وحدة واحدة بالضبط. \newpage

```python
# Pseudocode Cube definition
# Left face
((-0.5, -0.5, -0.5), (-0.5, -0.5, 0.5), (-0.5, 0.5, 0.5), (-0.5, 0.5, -0.5)),
# Back face
((-0.5, -0.5, -0.5), (-0.5, 0.5, -0.5), (0.5, 0.5, -0.5), (0.5, -0.5, -0.5)),
# Right face
((0.5, -0.5, -0.5), (0.5, 0.5, -0.5), (0.5, 0.5, 0.5), (0.5, -0.5, 0.5)),
# Front face
((-0.5, -0.5, 0.5), (0.5, -0.5, 0.5), (0.5, 0.5, 0.5), (-0.5, 0.5, 0.5)),
# Bottom face
((-0.5, -0.5, 0.5), (-0.5, -0.5, -0.5), (0.5, -0.5, -0.5), (0.5, -0.5, 0.5)),
# Top face
((-0.5, 0.5, -0.5), (-0.5, 0.5, 0.5), (0.5, 0.5, 0.5), (0.5, 0.5, -0.5))
```

ولو اقتصرنا على الأشكال الأوّلية وحدها لكان ذلك محدودًا جدًا لتطبيقات النمذجة. فالنماذج ثلاثية الأبعاد تتألّف عمومًا من عدة أشكال أوّلية
(أو من شبكات مثلثية، وهي خارج نطاق هذا المشروع).
ولحسن الحظ، يتيح لنا تصميمنا لصنف `Node` عُقد `Scene` المكوّنة من عدة أشكال أوّلية. وفي الواقع، يمكننا دعم تجميعات اعتباطية
للعُقد من دون أي تعقيد إضافي.

وكحافز على ذلك، لنفكّر في شكل بسيط جدًا: رجل ثلج نموذجي، أو شكل ثلج، مكوّن من ثلاث كرات. ورغم أن هذا الشكل يتألّف من ثلاثة أشكال أوّلية منفصلة، نودّ أن نتمكّن من معاملته ككائن واحد.

ننشئ صنفًا يُسمّى `HierarchicalNode`، وهو عقدة `Node` تحتوي على عقد أخرى. وهو يدير قائمة من «الأبناء».
وتستدعي دالة `render_self` الخاصة بالعُقد الهرمية ببساطة دالة `render_self` على كل عقدة من العقد الأبناء.
ومع صنف `HierarchicalNode`، يصبح من السهل جدًا إضافة الأشكال إلى المشهد.
والآن، يصبح تعريف شكل الثلج بسيطًا مثل تحديد الأشكال التي يتألّف منها، ومواضعها النسبية وأحجامها.

\aosafigure[240pt]/images/500-lines/modeller-1-nodes.webp{تسلسل هرمي لأصناف `Node` الفرعية}{500l.modeller.hierarchy}


```python
class HierarchicalNode(Node):
    def __init__(self):
        super(HierarchicalNode, self).__init__()
        self.child_nodes = []

    def render_self(self):
        for child in self.child_nodes:
            child.render()
```

\newpage

```python
class SnowFigure(HierarchicalNode):
    def __init__(self):
        super(SnowFigure, self).__init__()
        self.child_nodes = [Sphere(), Sphere(), Sphere()]
        self.child_nodes[0].translate(0, -0.6, 0) # scale 1.0
        self.child_nodes[1].translate(0, 0.1, 0)
        self.child_nodes[1].scaling_matrix = numpy.dot(
            self.scaling_matrix, scaling([0.8, 0.8, 0.8]))
        self.child_nodes[2].translate(0, 0.75, 0)
        self.child_nodes[2].scaling_matrix = numpy.dot(
            self.scaling_matrix, scaling([0.7, 0.7, 0.7]))
        for child_node in self.child_nodes:
            child_node.color_index = color.MIN_COLOR
        self.aabb = AABB([0.0, 0.0, 0.0], [0.5, 1.1, 0.5])
```
قد تلاحظ أن كائنات `Node` تشكّل بنية بيانات شجرية. فدالة `render`، عبر العُقد الهرمية، تنفّذ اجتيازًا بعمق أول على
الشجرة. وأثناء اجتيازها، تحتفظ بمكدّس من مصفوفات `ModelView`، المستخدَمة للتحويل إلى فضاء العالم.
وفي كل خطوة، تدفع مصفوفة `ModelView` الحالية على المكدّس، وحين تكتمل عملية عرض جميع العقد الأبناء،
تُسقط المصفوفة من المكدّس، تاركةً مصفوفة `ModelView` الخاصة بالعقدة الأم في قمة المكدّس.


وبجعل صنف `Node` قابلًا للتوسيع بهذه الطريقة، يمكننا إضافة أنواع جديدة من الأشكال إلى المشهد دون تغيير أيّ من بقية شيفرة
التلاعب بالمشهد وعرضه. واستخدام فكرة العقدة لتجريد واقع أن كائن `Scene` واحدًا قد يملك أبناءً كثيرين يُعرَف بنمط التصميم المركّب (Composite design pattern).


### تفاعل المستخدم
الآن وبعد أن أصبح مصمّمنا قادرًا على تخزين المشهد وعرضه، نحتاج إلى وسيلة للتفاعل معه.
وهناك نوعان من التفاعلات علينا تيسيرهما.
أولًا، نحتاج إلى القدرة على تغيير زاوية النظر إلى المشهد. فنريد أن نتمكّن من تحريك العين، أو الكاميرا، حول المشهد.
ثانيًا، نحتاج إلى أن نتمكّن من إضافة عُقد جديدة وتعديل عُقد في المشهد.

ولتفعيل تفاعل المستخدم، نحتاج إلى معرفة متى يضغط المستخدم على المفاتيح أو يحرّك الفأرة. ولحسن الحظ، يعرف نظام التشغيل بالفعل متى تقع هذه الأحداث. وتتيح لنا GLUT تسجيل دالة تُستدعى كلما وقع حدث معيّن.
نكتب دوال لتفسير ضغطات المفاتيح وحركة الفأرة، ونخبر GLUT بأن تستدعي تلك الدوال حين تُضغط المفاتيح المقابلة.
ومتى عرفنا المفاتيح التي يضغطها المستخدم، نحتاج إلى تفسير المُدخلات وتطبيق الإجراءات المقصودة على المشهد.

المنطق الخاص بالاستماع إلى أحداث نظام التشغيل وتفسير معناها موجود في صنف `Interaction`.
وصنف `Viewer` الذي كتبناه في وقت سابق يملك النسخة الوحيدة من `Interaction`.
سنستخدم آلية الاستدعاء في GLUT لتسجيل دوال تُستدعى عند ضغط زر الفأرة (`glutMouseFunc`)، وعند تحريك الفأرة (`glutMotionFunc`)، وعند ضغط زر على لوحة المفاتيح (`glutKeyboardFunc`)، وعند ضغط مفاتيح الأسهم (`glutSpecialFunc`).
وسنرى قريبًا الدوال التي تعالج أحداث المُدخلات.

```python
class Interaction(object):
    def __init__(self):
        """ Handles user interaction """
        # currently pressed mouse button
        self.pressed = None
        # the current location of the camera
        self.translation = [0, 0, 0, 0]
        # the trackball to calculate rotation
        self.trackball = trackball.Trackball(theta = -25, distance=15)
        # the current mouse location
        self.mouse_loc = None
        # Unsophisticated callback mechanism
        self.callbacks = defaultdict(list)
        
        self.register()

    def register(self):
        """ register callbacks with glut """
        glutMouseFunc(self.handle_mouse_button)
        glutMotionFunc(self.handle_mouse_move)
        glutKeyboardFunc(self.handle_keystroke)
        glutSpecialFunc(self.handle_keystroke)

```

#### استدعاءات نظام التشغيل
حتى نتمكّن من تفسير مُدخلات المستخدم على نحو ذي معنى،
نحتاج إلى الجمع بين معرفة بموضع الفأرة وأزرارها ولوحة المفاتيح. ولأن ترجمة مُدخلات المستخدم إلى إجراءات ذات معنى تتطلّب كثيرًا من أسطر الشيفرة، فإننا نغلّفها في صنف منفصل، بعيدًا عن مسار الشيفرة الرئيس.
ويُخفي صنف `Interaction` التعقيدَ غير ذي الصلة عن بقية قاعدة الشيفرة، ويترجم أحداث نظام التشغيل إلى أحداث على مستوى التطبيق.

```python
    # class Interaction 
    def translate(self, x, y, z):
        """ translate the camera """
        self.translation[0] += x
        self.translation[1] += y
        self.translation[2] += z

    def handle_mouse_button(self, button, mode, x, y):
        """ Called when the mouse button is pressed or released """
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        y = ySize - y  # invert the y coordinate because OpenGL is inverted
        self.mouse_loc = (x, y)

        if mode == GLUT_DOWN:
            self.pressed = button
            if button == GLUT_RIGHT_BUTTON:
                pass
            elif button == GLUT_LEFT_BUTTON:  # pick
                self.trigger('pick', x, y)
            elif button == 3:  # scroll up
                self.translate(0, 0, 1.0)
            elif button == 4:  # scroll up
                self.translate(0, 0, -1.0)
        else:  # mouse button release
            self.pressed = None
        glutPostRedisplay()

    def handle_mouse_move(self, x, screen_y):
        """ Called when the mouse is moved """
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        y = ySize - screen_y  # invert the y coordinate because OpenGL is inverted
        if self.pressed is not None:
            dx = x - self.mouse_loc[0]
            dy = y - self.mouse_loc[1]
            if self.pressed == GLUT_RIGHT_BUTTON and self.trackball is not None:
                # ignore the updated camera loc because we want to always
                # rotate around the origin
                self.trackball.drag_to(self.mouse_loc[0], self.mouse_loc[1], dx, dy)
            elif self.pressed == GLUT_LEFT_BUTTON:
                self.trigger('move', x, y)
            elif self.pressed == GLUT_MIDDLE_BUTTON:
                self.translate(dx/60.0, dy/60.0, 0)
            else:
                pass
            glutPostRedisplay()
        self.mouse_loc = (x, y)

    def handle_keystroke(self, key, x, screen_y):
        """ Called on keyboard input from the user """
        xSize, ySize = glutGet(GLUT_WINDOW_WIDTH), glutGet(GLUT_WINDOW_HEIGHT)
        y = ySize - screen_y
        if key == 's':
            self.trigger('place', 'sphere', x, y)
        elif key == 'c':
            self.trigger('place', 'cube', x, y)
        elif key == GLUT_KEY_UP:
            self.trigger('scale', up=True)
        elif key == GLUT_KEY_DOWN:
            self.trigger('scale', up=False)
        elif key == GLUT_KEY_LEFT:
            self.trigger('rotate_color', forward=True)
        elif key == GLUT_KEY_RIGHT:
            self.trigger('rotate_color', forward=False)
        glutPostRedisplay()
```

#### الاستدعاءات الداخلية
في مقتطف الشيفرة أعلاه، ستلاحظ أن نسخة `Interaction` حين تفسّر إجراءً من إجراءات المستخدم تستدعي `self.trigger` مع سلسلة تصف
نوع الإجراء. ودالة `trigger` في صنف `Interaction` هي جزء من نظام استدعاءات بسيط سنستخدمه للتعامل مع الأحداث على مستوى
التطبيق.
وتذكّر أن دالة `init_interaction` في صنف `Viewer` تسجّل دوال الاستدعاء على نسخة `Interaction` عبر استدعاء `register_callback`.

```python
    # class Interaction
    def register_callback(self, name, func):
        self.callbacks[name].append(func)
```
وحين تحتاج شيفرة واجهة المستخدم إلى إطلاق حدث على المشهد، يستدعي صنف `Interaction` كل دوال الاستدعاء التي حفظها لذلك الحدث بعينه:

```python
    # class Interaction
    def trigger(self, name, *args, **kwargs):
        for func in self.callbacks[name]:
            func(*args, **kwargs)
```

يحجب نظام الاستدعاءات على مستوى التطبيق الحاجة إلى أن يعرف بقية النظام شيئًا عن مُدخلات نظام التشغيل. ويمثّل كل استدعاء على مستوى التطبيق طلبًا ذا معنى داخل التطبيق.
ويعمل صنف `Interaction` بوصفه مترجمًا بين أحداث نظام التشغيل والأحداث على مستوى التطبيق.
وهذا يعني أن لو قرّرنا نقل المصمّم إلى طقم أدوات آخر إلى جانب GLUT، لما احتجنا سوى استبدال صنف `Interaction`
بصنف يحوّل المُدخلات من الطقم الجديد إلى المجموعة نفسها من استدعاءات التطبيق ذات المعنى. ونستخدم دوال الاستدعاء ووسائطها في \aosatblref{500l.tbl.callbacks}.


|دالة الاستدعاء | الوسائط             | الغرض   |
|:--------------|:--------------------|:--------|
|`pick`         | x:number, y:number | تحدّد العقدة الموجودة عند موضع مؤشر الفأرة. |
|`move`         | x:number, y:number | تنقل العقدة المحدَّدة حاليًا إلى موضع مؤشر الفأرة. |
|`place`        | shape:string, x:number, y:number | تضع شكلًا من النوع المحدَّد عند موضع مؤشر الفأرة. |
|`rotate_color` | forward:boolean | تدوّر لون العقدة المحدَّدة حاليًا عبر قائمة الألوان، إلى الأمام أو إلى الخلف. |
|`scale`        | up:boolean | تكبّر أو تصغّر العقدة المحدَّدة حاليًا، وفقًا للوسيط. |

: \label{500l.tbl.callbacks} دوال الاستدعاء ووسائطها الخاصة بتفاعل المستخدم

<latex>
\begin{table}
\centering
{\footnotesize
\rowcolors{2}{TableOdd}{TableEven}
\begin{tabular}{lll}
\hline
\textbf{Callback}
& \textbf{Arguments}
& \textbf{Purpose}
\\
\hline
pick    
& x:number, y:number 
& Selects the node at the mouse pointer location
\\
place & 
shape:string, x:number, y:number & 
Places a shape of the specified type at the mouse pointer location.
\\
rotate\_color & 
forward:boolean & 
Rotates the color of the currently selected node.
\\
scale & 
up:boolean & 
Scales the currently selected node up or down.
\\
\hline
\end{tabular}
}
\caption{Interaction callbacks and arguments}
\label{500l.tbl.callbacks}
\end{table}
</latex>

يوفّر نظام الاستدعاءات البسيط هذا كل الوظائف التي نحتاجها في هذا المشروع. غير أن مصمّمًا ثلاثي الأبعاد في بيئة الإنتاج يحتاج عادةً إلى إنشاء كائنات واجهة المستخدم وإتلافها ديناميكيًا.
وفي تلك الحالة، ستحتاج إلى نظام أكثر تعقيدًا لمراقبة الأحداث، بحيث تستطيع الكائنات أن تسجّل دوال استدعاء للأحداث وأن تلغي تسجيلها.

### التواصل مع المشهد
بآلية الاستدعاء التي لدينا، يمكننا تلقّي معلومات ذات معنى عن أحداث مُدخلات المستخدم من صنف `Interaction`. فنحن مستعدّون لتطبيق هذه الإجراءات على `Scene`.

#### تحريك المشهد
في هذا المشروع، نحقق حركة الكاميرا بتحويل المشهد. بمعنى آخر، تكون
الكاميرا في موقع ثابت، ويحرّك مُدخل المستخدم المشهد بدل تحريك الكاميرا. وتُوضَع الكاميرا عند `[0, 0, -15]` وتواجه
أصل فضاء العالم. (وبدلًا من ذلك، يمكننا تغيير مصفوفة المنظور لتحريك الكاميرا بدل المشهد.
ولهذا القرار التصميمي أثر ضئيل جدًا على بقية المشروع.)
والعودة إلى دالة `render` في `Viewer`، نرى أن حالة `Interaction` تُستخدم لتحويل حالة مصفوفات OpenGL قبل عرض `Scene`.
وهناك نوعان من التفاعل مع المشهد: الدوران والإزاحة.

#### تدوير المشهد بواسطة كرة التتبّع
نحقق دوران المشهد باستخدام خوارزمية *كرة التتبّع* (trackball). وكرة التتبّع واجهة بديهية للتلاعب بالمشهد في ثلاثة أبعاد.
ومن المفهوم، تعمل واجهة كرة التتبّع وكأن المشهد موضوع داخل كرة شفافة. فوضع اليد على سطح الكرة ودفعها يُدير الكرة. وبالمثل، فإن الضغط بالزر الأيمن للفأرة وتحريكها على الشاشة يُدير المشهد.
يمكنك معرفة المزيد عن نظريّة كرة التتبّع في [OpenGL Wiki](http://www.opengl.org/wiki/Object_Mouse_Trackball).
وفي هذا المشروع، نستخدم تنفيذًا لكرة التتبّع موفَّرًا كجزء من [Glumpy](https://code.google.com/p/glumpy/source/browse/glumpy/trackball.py).

نتفاعل مع كرة التتبّع باستخدام دالة `drag_to`، مع موضع الفأرة الحالي كموضع بداية وتغيّر موضع الفأرة كوسائط.

```python
self.trackball.drag_to(self.mouse_loc[0], self.mouse_loc[1], dx, dy)
```

مصفوفة الدوران الناتجة هي `trackball.matrix` في العارض حين يُعرض المشهد.

#### استطراد: الكواتيرونات
تُمثَّل الدورانات تقليديًا بإحدى طريقتين. الأولى هي قيمة دوران حول كل محور؛ ويمكنك تخزينها كثلاثية من الأعداد العشرية.
والتمثيل الشائع الآخر للدورانات هو الكواتيرون، وهو عنصر يتألّف من متجّه بإحداثيات $x$ و$y$ و$z$، ومن دوران $w$. لاستخدام الكواتيرونات فوائد عديدة مقارنة بالدوران لكل محور على حدة؛ وعلى الخصوص، فهي أكثر استقرارًا عدديًا. واستخدام الكواتيرونات يتجنّب مشكلات مثل قفل الجيمبال (gimbal lock).
الجانب السلبي للكواتيرونات أنها أقل حدسية في العمل وأصعب في الفهم. وإن كنت شجاعًا وتودّ معرفة المزيد عن الكواتيرونات، فيمكنك الرجوع إلى [هذا الشرح](http://3dgep.com/?p=1815).

يتجنّب تنفيذ كرة التتبّع قفل الجيمبال باستخدام الكواتيرونات داخليًا لتخزين دوران المشهد. ولحسن الحظ، لا نحتاج إلى التعامل مع الكواتيرونات مباشرةً، لأن العضو matrix في كرة التتبّع
يحوّل الدوران إلى مصفوفة.

#### إزاحة المشهد
إزاحة المشهد (أي انزلاقه) أبسط بكثير من تدويره. وتتوفّر إزاحات المشهد عبر عجلة الفأرة والزر الأيسر. فيحرّك الزر الأيسر
المشهد في إحداثيتي $x$ و$y$. وتدوير عجلة الفأرة يزيح المشهد في إحداثي z
(نحو الكاميرا أو بعيدًا عنها). ويخزّن صنف `Interaction` إزاحة المشهد الحالية ويعدّلها بالدالة `translate`.
ويسترد العارض موقع الكاميرا لدى `Interaction` أثناء العرض لاستخدامه في استدعاء `glTranslated`.

#### تحديد عناصر المشهد
الآن وبعد أن استطاع المستخدم تحريك المشهد كليّةً وتدويره للحصول على زاوية النظر التي يريدها، تتمثّل الخطوة التالية في السماح له بتعديل الكائنات التي يتألّف منها المشهد والتلاعب بها.

ولكي يتمكّن المستخدم من التلاعب بالأجسام في المشهد، عليه أن يستطيع تحديد العناصر.

لتحديد عنصر، نستخدم مصفوفة الإسقاط الحالية لتوليد شعاع يمثّل ضغطة الفأرة، كأنّ مؤشر الفأرة يطلق شعاعًا
داخل المشهد. والعقدة المحدَّدة هي أقرب عقدة إلى الكاميرا يتقاطع معها الشعاع.
وعليه، فإن مسألة الالتقاط (picking) تختزل إلى مسألة إيجاد تقاطعات بين شعاع وعُقد في المشهد. فالسؤال هو: كيف نعرف أن الشعاع أصاب عقدة؟

فحساب ما إذا كان الشعاع يتقاطع مع عقدة بدقّة مسألة صعبة من حيث تعقيد الشيفرة ومن حيث الأداء معًا. فلنحتج إلى كتابة فحص تقاطع شعاع-جسم لكل نوع من أنواع الأشكال الأوّلية.
أمّا عقد المشهد ذات الهندسات الشبكية المعقّدة ذات الأوجه كثيرة، فحساب تقاطع الشعاع-الجسم بدقّة يتطلّب اختبار الشعاع مع كل وجه
ويكون مكلفًا حسابيًا.

ولأغراض إبقاء الشيفرة مختصرة والأداء معقولًا، نستخدم تقريبًا بسيطًا وسريعًا لاختبار تقاطع الشعاع-الجسم.
وفي تنفيذنا، تخزّن كل عقدة صندوق حدود محاذٍ للمحاور (AABB)، وهو تقريبٌ للمكان الذي تشغله.
ولاختبار ما إذا كان الشعاع يتقاطع مع عقدة، نختبر ما إذا كان الشعاع يتقاطع مع صندوق AABB الخاص بتلك العقدة. ويعني هذا التنفيذ أن جميع العقد تتشارك
الشيفرة نفسها لاختبارات التقاطع، ويعني أيضًا أن تكلفة الأداء ثابتة وصغيرة لجميع أنواع العقد.

```python
    # class Viewer
    def get_ray(self, x, y):
        """ 
        Generate a ray beginning at the near plane, in the direction that
        the x, y coordinates are facing 

        Consumes: x, y coordinates of mouse on screen 
        Return: start, direction of the ray 
        """
        self.init_view()
    
        glMatrixMode(GL_MODELVIEW)
        glLoadIdentity()
    
        # get two points on the line.
        start = numpy.array(gluUnProject(x, y, 0.001))
        end = numpy.array(gluUnProject(x, y, 0.999))
    
        # convert those points into a ray
        direction = end - start
        direction = direction / norm(direction)
    
        return (start, direction)
    
    def pick(self, x, y):
        """ Execute pick of an object. Selects an object in the scene. """
        start, direction = self.get_ray(x, y)
        self.scene.pick(start, direction, self.modelView)
```

لتحديد العقدة التي جرى النقر عليها، نتجوّل في المشهد لنختبر ما إذا كان الشعاع يصيب أيّ عقد. ونلغي تحديد العقدة المحدَّدة حاليًا، ثم نختار العقدة التي يقطعها الشعاع عند أقرب نقطة إلى منشأ الشعاع.

```python
    # class Scene
    def pick(self, start, direction, mat):
        """ 
        Execute selection.
            
        start, direction describe a Ray. 
        mat is the inverse of the current modelview matrix for the scene.
        """
        if self.selected_node is not None:
            self.selected_node.select(False)
            self.selected_node = None
    
        # Keep track of the closest hit.
        mindist = sys.maxint
        closest_node = None
        for node in self.node_list:
            hit, distance = node.pick(start, direction, mat)
            if hit and distance < mindist:
                mindist, closest_node = distance, node
    
        # If we hit something, keep track of it.
        if closest_node is not None:
            closest_node.select()
            closest_node.depth = mindist
            closest_node.selected_loc = start + direction * mindist
            self.selected_node = closest_node
```
داخل صنف `Node`، تختبر دالة `pick` ما إذا كان الشعاع يتقاطع مع صندوق الحدود المحاذٍ للمحاور الخاص بـ`Node`.
وإذا كانت عقدة محدَّدة، فإن دالة `select` تقلب حالة التحديد للعقدة.
لاحظ أن دالة `ray_hit` الخاصة بـAABB تقبل مصفوفة التحويل بين فضاء إحداثيات الصندوق وفضاء إحداثيات
الشعاع كوسيط ثالث. وتطبّق كل عقدة تحويلها الخاص على المصفوفة قبل استدعاء الدالة `ray_hit`.

```python
    # class Node
    def pick(self, start, direction, mat):
        """ 
        Return whether or not the ray hits the object

        Consume:  
        start, direction form the ray to check
        mat is the modelview matrix to transform the ray by 
        """

        # transform the modelview matrix by the current translation
        newmat = numpy.dot(
            numpy.dot(mat, self.translation_matrix), 
            numpy.linalg.inv(self.scaling_matrix)
        )
        results = self.aabb.ray_hit(start, direction, newmat)
        return results

    def select(self, select=None):
       """ Toggles or sets selected state """
       if select is not None:
           self.selected = select
       else:
           self.selected = not self.selected
    
```

مقاربة التحديد بالشعاع-صندوق-الحدود بسيطة جدًا في الفهم والتنفيذ. غير أن النتائج تكون خاطئة في ظروف معيّنة.

\aosafigure[240pt]/images/500-lines/modeller-2-AABBError.webp{خطأ صندوق الحدود}{500l.modeller.aabberror}

فمثلًا، في حالة الشكل الأوّلي `Sphere`، لا تلامس الكرة نفسها صندوق الحدود إلا في مركز كل وجه من أوجه الصندوق.
غير أن المستخدم إذا نقر على إحدى زوايا صندوق حدود الكرة، سيُكتشف التصادم مع الكرة، حتى لو كان المقصود النقر
خلف الكرة على شيء خلفها (\aosafigref{500l.modeller.aabberror}).

هذا المفاضلة بين التعقيد والأداء والدقّة شائعة في الرسوميات الحاسوبية وفي مجالات كثيرة من هندسة البرمجيات.

#### تعديل عناصر المشهد
التالي، نودّ السماح للمستخدم بالتلاعب بالعُقد المحدَّدة. فقد يريد تحريكها أو تغيير حجمها أو تغيير لونها.
وحين يُدخل المستخدم أمرًا للتلاعب بعقدة، يحوّل صنف `Interaction` المُدخل إلى الإجراء الذي قصده المستخدم، ثم يستدعي دالة الاستدعاء المقابلة.

وحين يتلقّى `Viewer` استدعاء لأحد هذه الأحداث، فإنه يستدعي الدالة المناسبة على `Scene`، التي تطبّق بدورها التحويل على `Node` المحدَّدة حاليًا.

```python
    # class Viewer
    def move(self, x, y):
        """ Execute a move command on the scene. """
        start, direction = self.get_ray(x, y)
        self.scene.move_selected(start, direction, self.inverseModelView)
    
    def rotate_color(self, forward):
        """ 
        Rotate the color of the selected Node. 
        Boolean 'forward' indicates direction of rotation. 
        """
        self.scene.rotate_selected_color(forward)
    
    def scale(self, up):
        """ Scale the selected Node. Boolean up indicates scaling larger."""
        self.scene.scale_selected(up)
```

#### تغيير اللون
يتم التلاعب باللون عبر قائمة بألوان ممكنة. ويمكن للمستخدم التنقّل في هذه القائمة بمفاتيح الأسهم. ويوجّه المشهد أمر تغيير اللون إلى
العقدة المحدَّدة حاليًا.

```python
    # class Scene
    def rotate_selected_color(self, forwards):
        """ Rotate the color of the currently selected node """
        if self.selected_node is None: return
        self.selected_node.rotate_color(forwards)
```

تخزّن كل عقدة لونها الحالي. وتكتفي دالة `rotate_color` بتعديل اللون الحالي للعقدة. ويُمرَّر اللون إلى OpenGL عبر `glColor` حين تُعرض العقدة.

```python
    # class Node
    def rotate_color(self, forwards):
        self.color_index += 1 if forwards else -1
        if self.color_index > color.MAX_COLOR:
            self.color_index = color.MIN_COLOR
        if self.color_index < color.MIN_COLOR:
            self.color_index = color.MAX_COLOR
```

#### تحجيم العُقد
وكما في اللون، يوجّه المشهد أي تعديلات تحجيم إلى العقدة المحدَّدة إن وُجدت.

```python
    # class Scene
    def scale_selected(self, up):
        """ Scale the current selection """
        if self.selected_node is None: return
        self.selected_node.scale(up)
    
```

تخزّن كل عقدة مصفوفة حالية تمثّل مقياسها. والمصفوفة التي تُحجِّم بمعاملات $x$ و$y$ و$z$ في كلٍّ من اتجاهاتها هي:

<latex>
$$
   \begin{bmatrix}
   x & 0 & 0 & 0 \\
   0 & y & 0 & 0 \\
   0 & 0 & z & 0 \\
   0 & 0 & 0 & 1 \\
   \end{bmatrix}
$$
</latex>

$$
    \begin{bmatrix}
    x & 0 & 0 & 0 \\
    0 & y & 0 & 0 \\
    0 & 0 & z & 0 \\
    0 & 0 & 0 & 1 \\ 
    \end{bmatrix}
$$


حين يعدّل المستخدم مقياس عقدة، تُضرب مصفوفة التحجيم الناتجة في مصفوفة التحجيم الحالية للعقدة.

```python
    # class Node
    def scale(self, up):
        s =  1.1 if up else 0.9
        self.scaling_matrix = numpy.dot(self.scaling_matrix, scaling([s, s, s]))
        self.aabb.scale(s)
```

تُعيد الدالة `scaling` مصفوفة من هذا النوع، انطلاقًا من قائمة عوامل التحجيم في $x$ و$y$ و$z$.

```python
def scaling(scale):
    s = numpy.identity(4)
    s[0, 0] = scale[0]
    s[1, 1] = scale[1]
    s[2, 2] = scale[2]
    s[3, 3] = 1
    return s
```

#### تحريك العُقد
لإزاحة عقدة، نستخدم حساب الشعاع نفسه الذي استخدمناه في الالتقاط. ونمرّر الشعاع الذي يمثّل موضع الفأرة الحالي إلى دالة `move`
في المشهد. وينبغي أن يكون الموضع الجديد للعقدة على الشعاع.
ولتحديد أين على الشعاع نضع العقدة، نحتاج إلى معرفة مسافة العقدة عن الكاميرا. وبما أننا خزّنّا موضع العقدة ومسافتها
عن الكاميرا وقت تحديدها (في دالة `pick`)، يمكننا استخدام تلك البيانات هنا.
نجد النقطة التي تكون على الشعاع الهدف على المسافة نفسها من الكاميرا، ونحسب فرق المتجّه بين الموضعين الجديد والقديم.
ثم نزيح العقدة بالمتجّه الناتج.

```python
    # class Scene
    def move_selected(self, start, direction, inv_modelview):
        """ 
        Move the selected node, if there is one.
            
        Consume: 
        start, direction describes the Ray to move to
        mat is the modelview matrix for the scene 
        """
        if self.selected_node is None: return
    
        # Find the current depth and location of the selected node
        node = self.selected_node
        depth = node.depth
        oldloc = node.selected_loc
    
        # The new location of the node is the same depth along the new ray
        newloc = (start + direction * depth)
    
        # transform the translation with the modelview matrix
        translation = newloc - oldloc
        pre_tran = numpy.array([translation[0], translation[1], translation[2], 0])
        translation = inv_modelview.dot(pre_tran)
    
        # translate the node and track its location
        node.translate(translation[0], translation[1], translation[2])
        node.selected_loc = newloc
```

لاحظ أن الموضعين الجديد والقديم مُعرَّفان في فضاء إحداثيات الكاميرا. ونحن بحاجة إلى أن تكون إزاحتنا مُعرَّفة في فضاء الإحداثيات العالمي.
وعليه، نحوّل إزاحة فضاء الكاميرا إلى إزاحة في فضاء العالم عبر الضرب في مقلوب مصفوفة modelview.

وكما في التحجيم، تخزّن كل عقدة مصفوفة تمثّل إزاحتها. وتبدو مصفوفة الإزاحة هكذا:

$$
   \begin{bmatrix}
   1 & 0 & 0 & x \\
   0 & 1 & 0 & y \\
   0 & 0 & 1 & z \\
   0 & 0 & 0 & 1 \\
   \end{bmatrix}
$$

حين تُزاح العقدة، نبني مصفوفة إزاحة جديدة للإزاحة الحالية، ونضربها في مصفوفة
إزاحة العقدة لاستخدامها أثناء العرض.

```python
    # class Node
    def translate(self, x, y, z):
        self.translation_matrix = numpy.dot(
            self.translation_matrix, 
            translation([x, y, z]))
```

تُعيد الدالة `translation` مصفوفة إزاحة انطلاقًا من قائمة تمثّل مسافات الإزاحة في $x$ و$y$ و$z$.

```python
def translation(displacement):
    t = numpy.identity(4)
    t[0, 3] = displacement[0]
    t[1, 3] = displacement[1]
    t[2, 3] = displacement[2]
    return t
```

#### وضع العُقد
يستخدم وضع العقد تقنيات من الالتقاط ومن الإزاحة معًا. ونستخدم حساب الشعاع نفسه لموضع الفأرة الحالي لتحديد أين نضع العقدة.

```python
    # class Viewer
    def place(self, shape, x, y):
        """ Execute a placement of a new primitive into the scene. """
        start, direction = self.get_ray(x, y)
        self.scene.place(shape, start, direction, self.inverseModelView)
```

لوضع عقدة جديدة، ننشئ أولًا نسخة جديدة من نوع العقدة المقابل ونضيفها إلى المشهد.
ونريد أن نضع العقدة تحت مؤشّر المستخدم، فنجد نقطة على الشعاع على مسافة ثابتة من الكاميرا.
ومرة أخرى، يُمثَّل الشعاع في فضاء الكاميرا، لذا نحوّل متجّه الإزاحة الناتج إلى فضاء الإحداثيات العالمي بضربه في مقلوب مصفوفة modelview.
وأخيرًا، نزيح العقدة الجديدة بالمتجّه المحسوب. \newpage

```python
    # class Scene
    def place(self, shape, start, direction, inv_modelview):
        """ 
        Place a new node.
            
        Consume:  
        shape the shape to add
        start, direction describes the Ray to move to
        inv_modelview is the inverse modelview matrix for the scene 
        """
        new_node = None
        if shape == 'sphere': new_node = Sphere()
        elif shape == 'cube': new_node = Cube()
        elif shape == 'figure': new_node = SnowFigure()
    
        self.add_node(new_node)
    
        # place the node at the cursor in camera-space
        translation = (start + direction * self.PLACE_DEPTH)
    
        # convert the translation to world-space
        pre_tran = numpy.array([translation[0], translation[1], translation[2], 1])
        translation = inv_modelview.dot(pre_tran)
    
        new_node.translate(translation[0], translation[1], translation[2])
```

## الخلاصة
تهانينا! لقد نجحنا في تنفيذ مصمّم ثلاثي الأبعاد صغير الحجم!

\aosafigure[240pt]/images/500-lines/modeller-3-StartScene.webp{مشهد نموذجي}{500l.modeller.samplescene}

لقد رأينا كيف نطوّر بنية بيانات قابلة للتوسيع لتمثيل الأجسام في
المشهد. ولاحظنا أن استخدام نمط التصميم المركّب وبنية بيانات قائمة على شجرة
يجعل اجتياز المشهد لأغراض العرض سهلًا، ويسمح لنا
بإضافة أنواع جديدة من العُقد من دون أي تعقيد إضافي. وقد استعنّا بهذه البنية
من البيانات لعرض التصميم على الشاشة، وتلاعبنا بمصفوفات OpenGL
أثناء اجتياز رسم المشهد البياني. وقد بنينا نظام استدعاءات بسيطًا جدًا
للأحداث على مستوى التطبيق، واستعملناه لتغليف معالجة أحداث نظام
التشغيل. وقد ناقشنا تنفيذيّات ممكنة لكشف تصادم الشعاع والجسم،
والمفاضلة بين الصحّة والتعقيد والأداء.
وأخيرًا، نفّذنا دوال للتلاعب بمحتويات المشهد.

يمكنك أن تتوقّع العثور على لبنات البناء الأساسية نفسها في برمجيات ثلاثية الأبعاد جاهزة للإنتاج. فبنية رسم المشهد البياني وفضاءات الإحداثيات النسبية موجودة في
أنواع كثيرة من تطبيقات الرسوميات ثلاثية الأبعاد، من أدوات CAD إلى محرّكات الألعاب.
أحد التخفيفات الجوهرية في هذا المشروع يكمن في واجهة المستخدم. فالمصمّم ثلاثي الأبعاد في بيئة الإنتاج من المتوقّع أن له
واجهة مستخدم كاملة، ما يستلزم نظام أحداث أكثر تعقيدًا بكثير بدلًا من نظام الاستدعاءات البسيط الذي لدينا.

يمكننا أن نجري تجارب إضافية لإضافة ميزات جديدة إلى هذا المشروع. جرّب واحدة من هذه:

* أضف نوع `Node` يدعم الشبكات المثلثية من أجل الأشكال العشوائية.
* أضف مكدّس تراجع (undo stack) يسمح بالتراجع عن إجراءات المصمّم وإعادة تنفيذها.
* احفظ التصميم وحمّله باستخدام صيغة ملفات ثلاثية الأبعاد مثل DXF.
* ادمج محرّك عرض: صدّر التصميم لاستخدامه في عارض ذو واقعية فوتوغرافية.
* حسّن كشف التصادم بتقاطع دقيق بين الشعاع والجسم.

## استكشاف إضافي
للاطّلاع على رؤى أعمق حول برمجيات النمذجة ثلاثية الأبعاد في العالم الحقيقي، تتّسم بعض المشاريع مفتوحة المصدر بالاهتمام.

[Blender](http://www.blender.org/) حزمة رسوميات متحركة ثلاثية الأبعاد مفتوحة المصدر وغنية الميزات. فهي تقدّر خط أنابيب ثلاثي الأبعاد كاملًا لبناء المؤثرات البصرية في الفيديو، أو لإنشاء الألعاب. والمصمّم جزء صغير من هذا
المشروع، وهو مثال جيّد على دمج مصمّم داخل حزمة برمجية كبيرة.

[OpenSCAD](http://www.openscad.org/) أداة نمذجة ثلاثية الأبعاد مفتوحة المصدر. وهي ليست تفاعلية؛ بل تقرأ ملفًا نصيًا يحدّد كيفية توليد المشهد. وهذا يمنح المصمّم «تحكّمًا كاملًا في عملية النمذجة».

ولمزيد من المعلومات عن الخوارزميات والتقنيات في الرسوميات الحاسوبية، فإن [Graphics Gems](http://tog.acm.org/resources/GraphicsGems/) مصدر رائع.
