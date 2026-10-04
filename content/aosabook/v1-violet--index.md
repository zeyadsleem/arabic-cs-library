---
title: "Violet"
lang: ar
source: https://aosabook.org/en/v1/violet.html
---

معمارية تطبيقات المصادر المفتوحة (المجلد الأول)Violet

# معمارية تطبيقات المصادر المفتوحة (المجلد الأول) Violet

Cay Horstmann

إذا استمتعت بهذه الكتب، فقد يعجبك أيضًا [التصميم البرمجي بالأمثلة في بايثون (Software Design by Example in Python)](https://third-bit.com/sdxpy/) و[التصميم البرمجي بالأمثلة في جافاسكربت (Software Design by Example in JavaScript)](https://third-bit.com/sdxjs/).

في عام 2002 كتبتُ كتابًا جامعيًّا عن التصميم الكائنيّ (object-oriented) وأنماط التصميم [Hor05](https://aosabook.org/en/v1/bib1.html#bib:horstmann:oodp). وكما حال كثيرٍ من الكتب، فإنّ هذا الكتاب جاء بدافعٍ من الإحباط إزاء المنهج الكلاسيكي. فكثيرًا ما يتعلّم طلبةُ علوم الحاسوب في مقرّهم الأول في البرمجة كيف يصمّمون صنفًا واحدًا، ثمّ لا يتلقّون أيّ تدريبٍ إضافي على التصميم الكائنيّ حتى مقرّهم في هندسة البرمجيات لمرحلة التخرّج. وفي ذلك المقرّ يمرّ الطلبة على بضعة أسابيع من UML وأنماط التصميم على عجل، فلا يمنحهم ذلك أكثر من وهمٍ بالمعرفة. ويدعم كتابي مقررًا مدّة فصلٍ دراسيٍّ كاملًا لطلبةٍ لديهم خلفيةٌ في البرمجة بلغة Java وفي بنى البيانات الأساسية (وهي عادةً ما تأتي من تسلسل CS1/CS2 القائم على Java). ويغطّي الكتاب مبادئ التصميم الكائنيّ وأنماط التصميم في سياق مواقف مألوفة. فمثلًا يُقدَّم نمطُ التصميم Decorator من خلال `JScrollPane` الخاص بـ Swing، على أمل أن يكون هذا المثال أسهلَ حفظًا من المثال الكلاسيكي الخاص بتدفّقات Java.

![مخطط كائنات مرسوم بـ Violet](/images/aosabook/v1-violet-object-sample.webp){#fig.vio.diagram}

الشكل 22.1: مخطط كائنات مرسوم بـ Violet

احتجتُ إلى مجموعةٍ خفيفة من مخطّطات UML في الكتاب: مخطّطات الأصناف، ومخطّطات التسلسل، وصنفًا من مخطّطات الكائنات يُظهر مراجع كائنات Java ([الشكل 22.1](#fig.vio.diagram)). كما أردتُ للطلبة أن يرسموا مخطّطاتهم بأنفسهم. غير أنّ العروض التجارية مثل Rational Rose لم تكن باهظة الثمن فحسب، بل كانت أيضًا مرهقةً في التعلّم والاستعمال [Shu05](https://aosabook.org/en/v1/bib1.html#bib:shumba:ratrose)، وكانت البدائل مفتوحة المصدر المتاحة في تلك الحقبة محدودةً إلى حدّ لا ينفع أو مليئةً بالأخطاء بحيث لا تصلح للاستخدام[1](#footnote-1)، كما أنّ المخطّطات فيها تُحدَّد بإعلاناتٍ نصّية بدلًا من واجهة النقر والاختيار الأكثر شيوعًا.}. ولا سيّما أنّ مخطّطات التسلسل في ArgoUML كانت معطوبةً إلى حدّ خطير.

قرّرتُ أن أخوض محاولةً في تنفيذ أبسط محرِّرٍ يكون (أ) نافعًا للطلبة و(ب) مثالًا على إطار عمل قابل للتوسيع يستطيع الطلبة فهمَه وتعديلَه. وهكذا وُلد Violet.

## 22.1. مقدّمة إلى Violet

‏Violet محرِّر UML خفيف الوزن، مُعدّ للطلبة والمعلّمين والمؤلّفين الذين يحتاجون إلى إنتاج مخطّطات UML بسيطة بسرعة. تعلُّمه واستعمالُه سهلان إلى حدٍّ بعيد. فهو يرسم مخطّطات الأصناف والتسلسل والحالات والكائنات وحالات الاستخدام. (وقد أُضيفت منذ ذلك الحين أنواعٌ أخرى من المخطّطات.) وهو برمجيةٌ مفتوحة المصدر وقابلةٌ للعمل على عدّة منصّات. وفي جوهره يستعمل Violet إطار رسمٍ بيانيٍّ بسيطٍ ومرنٍّ ينتفع إلى أقصى حدٍّ من واجهة Java 2D الرسومية.

واجهةُ المستخدم في Violet بسيطةٌ بقصد. فأنت لا تضطرّ إلى اجتياز سلسلةٍ مملّة من نوافذ الحوار لإدخال السمات (attributes) والدوالّ (methods). بل تكتفي بكتابتها مباشرةً في حقل نصّي. وبضعة نقراتٍ بالفأرة تستطيع أن تنشئ بسرعة مخطّطاتٍ جذّابة ومفيدة.

لا يحاول Violet أن يكون برنامج UML بمستوى الإنتاجيةّ الكامل (industrial-strength). وهذه بعض المزايا التي لا يوفّرها Violet:

- لا يولّد Violet شيفرة مصدرية من مخطّطات UML، ولا مخطّطات UML من الشيفرة المصدرية.
- لا يُجري Violet أيّ فحصٍ دلاليٍّ (semantic checking) للنماذج؛ فبإمكانك استعمال Violet لرسم مخطّطاتٍ متناقضة.
- لا يولّد Violet ملفاتٍ يمكن استيرادها في أدوات UML أخرى، كما أنّه لا يستطيع قراءة ملفات النماذج القادمة من أدواتٍ أخرى.
- لا يحاول Violet توزيع المخطّطات تلقائيًّا (lay out)، باستثناء آليةٍ بسيطة تتمثّل في «المحاذاة مع الشبكة» (snap to grid).

(محاولة معالجة بعض هذه القيود مشاريعٌ طلابيةٌ جيّدة.)

حين نشأ حول Violet جمهورٌ متعصّب من المصمّمين أرادوا شيئًا أكثر من منديلٍ في المقهى وأقلّ من أداة UML بمستوى الإنتاجيةّ الكامل (industrial-strength)، نشرتُ الشيفرة على SourceForge بموجب رخصة GNU General Public License. وابتداءً من عام 2005 انضمّ Alexandre de Pellegrin إلى المشروع بقيَمته إضافةً لـ Eclipse وواجهة مستخدمٍ أكثر أناقة. وهو منذ ذلك الحين أجرى تغييراتٍ معماريةً كثيرة، وصار اليوم هو الصيانةَ الرئيسة للمشروع.

في هذا الفصل، أناقش بعض الخيارات المعمارية الأصلية في Violet، وكذلك تطوّره. فجزءٌ من الفصل يركّز على تحرير الرسوم البيانية، أمّا أجزاءٌ أخرى&mdash;مثل استعمال خصائص JavaBeans وآليّة الحفظ (persistence)، وJava WebStart، ومعمارية الإضافات&mdash;فينبغي أن تهمّ القارئ العامّ.

## 22.2. إطار الرسم البياني

يعتمد Violet على إطارٍ عامّ لتحرير الرسوم البيانية قادرٍ على عرض وتحرير عقدٍ (nodes) وحوافّ (edges) بأشكالٍ اعتباطية. فمحرِّر UML في Violet عُقدٌ للأصناف (classes)، والكائنات، وأشرطة التنشيط (activation bars) في مخطّطات التسلسل، وهكذا، إضافةً إلى حوافّ لأشكال الحوافّ المختلفة في مخطّطات UML. وقد يعرض نموذجٌ آخر (instance) من إطار الرسم البياني مخطّطات الكيانات والعلاقات (entity-relationship) أو مخطّطات سكك الحديد.

![مثال بسيط على إطار المحرِّر](/images/aosabook/v1-violet-Ch8-06.webp){#fig.vio.editor}

الشكل 22.2: مثال بسيط على إطار المحرِّر

لأغراض توضيح الإطار، لنفرض محرِّرًا للرسوم البيانية شديدة البساطة، بعُقدٍ دائرية سوداء وبيضاء وبحوافَّ مستقيمة ([الشكل 22.2](#fig.vio.editor)). يحدّد الصنف `SimpleGraph` كائناتٍ نمطيّة (prototype) لأنواع العقد والحوافّ، ممّا يوضّح نمطَ النموذج الأولي (prototype pattern):

```
public class SimpleGraph extends AbstractGraph
{
  public Node[] getNodePrototypes()
  {
    return new Node[]
    {
      new CircleNode(Color.BLACK),
      new CircleNode(Color.WHITE)
    };
  }
  public Edge[] getEdgePrototypes()
  {
    return new Edge[]
    {
      new LineEdge()
    };
  }
}
```

تُستعمل الكائناتُ النموذجية لرسم أزرار العقد والحوافّ في أعلى [الشكل 22.2](#fig.vio.editor)، وتُنسَخ (cloned) كلّما أضاف المستخدم عقدةً أو حافّةً جديدةً إلى الرسم البياني. أمّا `Node` و`Edge` فواجهتان لهما الدوالّ الرئيسة التالية:

- لكلٍّ من الواجهتين دالّةُ `getShape` التي تُعيد كائن `Shape` من Java2D يمثّل شكلَ العقدة أو الحافّة.
- وللواجهة `Edge` دوالّ تُعطي العقدتين في بداية الحافّة ونهايتها.
- دالّةُ `getConnectionPoint` الموجودة في نوع الواجهة Node تحسب نقطة ارتباطٍ مثلى على حدود العقدة (انظر [الشكل 22.3](#fig.vio.connection)).
- ودالّةُ `getConnectionPoints` في الواجهة `Edge` تعطي نقطتَي نهاية الحافّة. وتحتاج هذه الدالّة لرسم «المُمسِكات» (grabbers) التي تميّز الحافّة المحدَّدة حاليًّا.
- قد تكون للعقدة أبناءُ يتحرّكون معها مع الأب، وتتوفّر عدّةُ دوالّ لتعداد الأبناء وإدارتهم.

![إيجاد نقطة ارتباط على حدود شكل العقدة](/images/aosabook/v1-violet-Ch8-07.webp){#fig.vio.connection}

الشكل 22.3: إيجاد نقطة ارتباط على حدود شكل العقدة

تنفّذ الأصنافُ المساعدة `AbstractNode` و`AbstractEdge` عددًا من هذه الدوالّ، كما تقدّم الأصنافُ `RectangularNode` و`SegmentedLineEdge` تنفيذًا كاملًا للعُقد المستطيلة ذات سلسلة العنوان، وللحوافّ المكوَّنة من مقاطعَ خطوط.

في حالة محرِّر الرسوم البيانية البسيط خاصّتنا، سنحتاج إلى تزويده بصنفين فرعيّين هما `CircleNode` و`LineEdge` يوفّران دالّةَ `draw` ودالّةَ `contains` ودالّةَ `getConnectionPoint` التي تصف شكل حدود العقدة. وفيما يلي الشيفرة، ويعرض [الشكل 22.4](#fig.vio.classdiag) مخطط أصنافٍ لهذه الأصناف (مرسومًا بالطبع بـ Violet).

```
public class CircleNode extends AbstractNode
{
  public CircleNode(Color aColor)
  {
    size = DEFAULT_SIZE;
    x = 0;
    y = 0;
    color = aColor;
  }

  public void draw(Graphics2D g2)
  {
    Ellipse2D circle = new Ellipse2D.Double(x, y, size, size);
    Color oldColor = g2.getColor();
    g2.setColor(color);
    g2.fill(circle);
    g2.setColor(oldColor);
    g2.draw(circle);
  }

  public boolean contains(Point2D p)
  {
    Ellipse2D circle = new Ellipse2D.Double(x, y, size, size);
    return circle.contains(p);
  }

  public Point2D getConnectionPoint(Point2D other)
  {
    double centerX = x + size / 2;
    double centerY = y + size / 2;
    double dx = other.getX() - centerX;
    double dy = other.getY() - centerY;
    double distance = Math.sqrt(dx * dx + dy * dy);
    if (distance == 0) return other;
    else return new Point2D.Double(
      centerX + dx * (size / 2) / distance,
      centerY + dy * (size / 2) / distance);
  }

  private double x, y, size, color;
  private static final int DEFAULT_SIZE = 20;
}

public class LineEdge extends AbstractEdge
{
  public void draw(Graphics2D g2)
  { g2.draw(getConnectionPoints()); }

  public boolean contains(Point2D aPoint)
  {
    final double MAX_DIST = 2;
    return getConnectionPoints().ptSegDist(aPoint) < MAX_DIST;
  }
}
```

![مخطط أصناف لرسم بياني بسيط](/images/aosabook/v1-violet-SimpleGraph-in-Violet.webp){#fig.vio.classdiag}

الشكل 22.4: مخطط أصناف لرسم بياني بسيط

باختصار، يوفّر Violet إطارًا بسيطًا لإنتاج محرِّرات الرسوم البيانية. وللحصول على نسخة من المحرِّر، عرِّف أصنافَ العقد والحوافّ، وقدِّم في صنف الرسم دوالّ تُعطي كائناتِ عقدٍ وحوافّ نموذجية.

بالطبع، تتوفّر أطرُ رسمٍ بيانيٍّ أخرى، مثل JGraph [Ald02](https://aosabook.org/en/v1/bib1.html#bib:alder:jgraph) وJUNG[2](#footnote-2). غير أنّ تلك الأطر أعقدُ بكثير، فهي تقدّم أطرًا لرسم الرسوم البيانية لا تطبيقات ترسم رسومًا بيانية.

## 22.3. استعمال خصائص JavaBeans

في أيّام Java على جانب العميل المزدهرة، طُوِّرت مواصفةُ JavaBeans لتوفير آليّاتٍ محمولةٍ لتحرير مكوّنات واجهة المستخدم الرسومية (GUI) في بيئات بناء الواجهات المرئيّة. وكانت الرؤية أنّه يمكن إسقاط مكوّن GUI من طرفٍ ثالث في أيّ باني واجهات، حيث تُضبط خصائصُه بالطريقة نفسها التي تُضبط بها الأزرار القياسية ومكوّنات النصّ وما شابه.

لا تمتلك Java خصائص أصلية (native properties). بل يمكن اكتشاف خصائص JavaBeans بوصفها أزواجًا من دوالّ getter وsetter، أو تحديدَها بمرافقة أصناف BeanInfo. وزيادةً على ذلك، يمكن تحديد *محرِّرات الخصائص* (property editors) لتحرير قيم الخصائص بصريًّا. وحتى حزمة JDK تضمّ بضع محرِّرات خصائص أساسية، مثلًا للنوع `java.awt.Color`.

ينتفع إطار Violet انتفاعًا كاملًا من مواصفة JavaBeans. فمثلًا، يستطيع الصنف `CircleNode` أن يكشف عن خاصية لونٍ (color property) بمجرّد توفير دالّتين:

```
public void setColor(Color newValue)
public Color getColor()
```

ولا يلزم أيّ عملٍ إضافي. فأصبح محرِّر الرسوم البيانية قادرًا الآن على تحرير ألوان العقد الدائرية ([الشكل 22.5](#fig.vio.circlecolors)).

![تحرير ألوان الدوائر بواسطة محرِّر ألوان JavaBeans الافتراضي](/images/aosabook/v1-violet-Ch8-11.webp){#fig.vio.circlecolors}

الشكل 22.5: تحرير ألوان الدوائر بواسطة محرِّر ألوان JavaBeans الافتراضي

## 22.4. الحفظ الدائم (Long-Term Persistence)

مثل أيّ برنامج تحرير، يجب على Violet أن تحفظ إبداعات المستخدم في ملف ثمّ تعيد تحميلها لاحقًا. وقد أطلعتُ على مواصفة XMI[3](#footnote-3) التي صُمِّمت بوصفها صيغةَ تبادلٍ مشتركةً لنماذج UML. فوجدتها مرهقةً ومُربكةً وعسيرةَ الاستهلاك. ولا أظنّني كنت الوحيد الذي يرى ذلك&mdash;فقد كانت XMI ذات سمعةٍ سيّئةٍ من حيث التوافق البينيّ (interoperability) حتى مع أبسط النماذج [PGL+05](https://aosabook.org/en/v1/bib1.html#bib:persson:osstools).

فكّرتُ ببساطة في استعمال التسلسل (serialization) الخاص بـ Java، لكنّ قراءة الإصدارات القديمة لكائنٍ مُسلسَلٍ قد تغيّر تنفيذُه مع الزمن أمرٌ صعب. وقد توقّع مهندسو JavaBeans هذه المشكلة أيضًا، فطوّروا صيغة XML قياسيةً للحفظ الدائم[4](#footnote-4). ويُسلسَل كائنُ Java&mdash;وفي حالة Violet هو مخططُ UML&mdash;في صورة سلسلةٍ من البيانات المُنشِّئة والمعدِّلة له. وإليك مثالًا:

```html
<?xml version="1.0" encoding="UTF-8"?>
<java version="1.0" class="java.beans.XMLDecoder">
 <object class="com.horstmann.violet.ClassDiagramGraph">
  <void method="addNode">
   <object id="ClassNode0" class="com.horstmann.violet.ClassNode">
    <void property="name">&hellip;</void>
   </object>
   <object class="java.awt.geom.Point2D$Double">
    <double>200.0</double>
    <double>60.0</double>
   </object>
  </void>
  <void method="addNode">
   <object id="ClassNode1" class="com.horstmann.violet.ClassNode">
    <void property="name">&hellip;</void>
   </object>
   <object class="java.awt.geom.Point2D$Double">
    <double>200.0</double>
    <double>210.0</double>
   </object>
  </void>
  <void method="connect">
   <object class="com.horstmann.violet.ClassRelationshipEdge">
    <void property="endArrowHead">
     <object class="com.horstmann.violet.ArrowHead" field="TRIANGLE"/>
    </void>
   </object>
   <object idref="ClassNode0"/>
   <object idref="ClassNode1"/>
  </void>
 </object>
</java>
```

وحين يقرأ الصنفُ `XMLDecoder` هذا الملف، ينفّذ هذه البيانات (مع حذف أسماء الحزم للتبسيط).

```
ClassDiagramGraph obj1 = new ClassDiagramGraph();
ClassNode ClassNode0 = new ClassNode();
ClassNode0.setName(&hellip;);
obj1.addNode(ClassNode0, new Point2D.Double(200, 60));
ClassNode ClassNode1 = new ClassNode();
ClassNode1.setName(&hellip;);
obj1.addNode(ClassNode1, new Point2D.Double(200, 60));
ClassRelationShipEdge obj2 = new ClassRelationShipEdge();
obj2.setEndArrowHead(ArrowHead.TRIANGLE);
obj1.connect(obj2, ClassNode0, ClassNode1);
```

ما دام دلالةُ المُنشئات والخصائص والدوالّ لم تتغيّر، أمكن لإصدارٍ أحدث من البرنامج أن يقرأ ملفًا أنتجه إصدارٌ أقدم.

وتوليدُ هذه الملفات سهلٌ إلى حدٍّ كبير. فالمُرمِّز (encoder) يعدّ خصائصَ كل كائن آليًّا ويكتب بيانات setterٍ لتلك القيم التي تختلف عن القيمة الافتراضية. وتتولّى منصّةُ Java معظم أنواع البيانات الأساسية؛ غير أنّني اضطررتُ إلى توفير معالجاتٍ خاصةٍ لـ `Point2D` و`Line2D` و`Rectangle2D`. والأهمّ من ذلك أنّ المُرمِّز يجب أن يعرف أنّ الرسم البياني يمكن تسلسلُه في صورة سلسلةٍ من نداءات الدوالّ `addNode` و`connect`:

```
encoder.setPersistenceDelegate(Graph.class, new DefaultPersistenceDelegate()
{
  protected void initialize(Class<?> type, Object oldInstance,
    Object newInstance, Encoder out)
  {
    super.initialize(type, oldInstance, newInstance, out);
    AbstractGraph g = (AbstractGraph) oldInstance;
    for (Node n : g.getNodes())
      out.writeStatement(new Statement(oldInstance, "addNode", new Object[]
      {
        n,
        n.getLocation()
      }));
    for (Edge e : g.getEdges())
      out.writeStatement(new Statement(oldInstance, "connect", new Object[]
      {
        e, e.getStart(), e.getEnd()
      }));
   }
 });
```

وبعد ضبط المُرمِّز، يصبح حفظُ رسمٍ بياني بسيطًا مثل الآتي:

```
encoder.writeObject(graph);
```

ولأنّ فاكّ الترميز (decoder) ينفّذ البيانات كما هي، فهو لا يحتاج إلى أيّ ضبط. وتُقرأ الرسومُ البيانية ببساطة هكذا:

```
Graph graph = (Graph) decoder.readObject();
```

وقد نجح هذا المنهج على امتداد عدّةٍ من إصدارات Violet على نحوٍ ممتاز، باستثناءٍ واحد. فقد أدخلت إعادةُ هيكلةٍ (refactoring) حديثةٌ تغييرَ أسماء بعض الحزم، فضاع بالتالي التوافقُ الخلفي (backwards compatibility). وكان أحد الخيارات هو الإبقاءُ على الأصناف في الحزم الأصلية، وإن كانت لم تعد توافق بنيةَ الحزم الجديدة. وبدلًا من ذلك، قدّم الصيانةُ محوِّل XML لإعادة كتابة أسماء الحزم عند قراءة ملفٍ قديم.

## 22.5. Java WebStart

‏Java WebStart تقنيةٌ لتشغيل تطبيقٍ من متصفّح ويب. ينشر الناشرُ ملف JNLP يُطلق تطبيقًا مساعدًا (helper application) داخل المتصفّح، المسؤول عن تنزيل برنامج Java وتشغيله. وقد يكون التطبيق موقَّعًا رقميًّا، وعندئذٍ يجب أن يقبل المستخدمُ الشهادة، أو قد يكون غيرَ موقَّع، وعندئذٍ يعمل البرنامج في صندوقٍ معزول (sandbox) أقلّ تقييدًا بدرجةٍ يسيرة من صندوق الـ applet المعزول.

لا أظنّ أنّ المستخدمين النهائيين يمكنهم أو ينبغي لهم الموثوقُ بهم لتقييم صلاحية شهادةٍ رقميةٍ وآثارِها الأمنية. ومن نقاط القوة في منصّة Java أمنُها، وأرى أنّ من المهمّ أن نستثمر هذه القوة.

صندوقُ Java WebStart المعزول قويٌّ بما يكفي ليتيح للمستخدمين إنجاز عملٍ مفيد، بما في ذلك تحميلُ الملفات وحفظُها والطباعة. وتُعالَج هذه العمليات بأمانٍ وسهولةٍ من منظور المستخدم. فيُنبَّه المستخدم على أنّ التطبيق يريد الوصول إلى نظام الملفات المحلية، ثمّ يختار الملف المطلوب قراءته أو كتابته. ولا يتلقّى التطبيق سوى كائنِ تدفّق (stream object)، دون أن تتاح له فرصةُ التصفّح في نظام الملفات أثناء عمليّة اختيار الملف.

من المُزعج أنّ المطوّر مضطرٌّ إلى كتابة شيفرةٍ مخصّصةٍ للتفاعل مع `FileOpenService` و`FileSaveService` حين يعمل التطبيق تحت WebStart، وهو أمرٌ أكثر إزعاجًا أنّه لا يوجد أيّ نداءٍ في واجهة WebStart البرمجية لمعرفة ما إذا كان التطبيق قد أُطلق بواسطة WebStart أم لا.

وبالمثل، يجب تنفيذُ حفظ تفضيلات المستخدم بأسلوبين: استعمال واجهة Java preferences البرمجية حين يعمل التطبيق بصورة طبيعية، أو استعمال خدمة تفضيلات WebStart حين يكون التطبيق تحت WebStart. أمّا الطباعة، من جهةٍ أخرى، فشفّافةٌ تمامًا أمام مطوّر التطبيق.

يوفّر Violet طبقاتِ تجريدٍ بسيطةً فوق هذه الخدمات لتسهيل حياة مطوّر التطبيق. فمثلًا، إليك كيفية فتح ملف:

```
FileService service = FileService.getInstance(initialDirectory);
  // detects whether we run under WebStart
FileService.Open open = fileService.open(defaultDirectory, defaultName,
  extensionFilter);
InputStream in = open.getInputStream();
String title = open.getName();
```

وتُنفِّذ واجهةُ `FileService.Open` صنفان: صنفًا لفّافًا (wrapper) حول `JFileChooser` أو صنفَ `FileOpenService` الخاص بـ JNLP.

لا شيءٌ من هذه الراحة جزءٌ من واجهة JNLP البرمجية نفسها، غير أنّ تلك الواجهة لم تنل نصيبَها من الاهتمام طوال عمرها وقد أُهملت إلى حدٍّ واسع. فمعظم المشاريع تستعمل مجرّدًا شهادةً موقَّعة ذاتيًا (self-signed) لتطبيق WebStart الخاص بها، ممّا لا يمنح المستخدمين أيّ أمنٍ حقيقي. وهذا أمرٌ يُأسف عليه&mdash;ينبغي لمطوّري المصادر المفتوحة أن يتبنّوا صندوقَ JNLP المعزول بوصفه طريقةً خاليةٍ من المخاطر لتجربة مشروعٍ ما.

## 22.6. Java 2D

يستعمل Violet بكثافة مكتبةَ Java2D، وهي إحدى الجواهر الأقلّ شهرةً في واجهة Java البرمجية. ولكلّ عقدةٍ وحافّةٍ دالّةُ `getShape` تُعطي كائن `java.awt.Shape`، وهو الواجهةَ المشتركة لجميع أشكال Java2D. وهذه الواجهة مُنفَّذةٌ في المستطيلات والدوائر والمسارات، وفي اتّحادها وتقاطعاتها وفروقها. والصنفُ `GeneralPath` مفيدٌ لصناعة الأشكال المكوَّنة من مقاطعَ خطوطٍ ومنحنيات تربيعية/تكعيبيّة اعتباطية، مثل الأسهم المستقيمة والمنحنية.

ولكي تُدرك مرونة واجهة Java2D البرمجية، تأمّل الشيفرة التالية لرسم ظلٍّ في دالّة `AbstractNode.draw`:

```
Shape shape = getShape();
if (shape == null) return;
g2.translate(SHADOW_GAP, SHADOW_GAP);
g2.setColor(SHADOW_COLOR);
g2.fill(shape);
g2.translate(-SHADOW_GAP, -SHADOW_GAP);
g2.setColor(BACKGROUND_COLOR);
g2.fill(shape);
```

بضعةُ أسطرٍ من الشيفرة تُنتج ظلًّا لأيّ شكل، حتى للأشكال التي قد يضيفها المطوّر لاحقًا.

بالطبع، يحفظ Violet صورًا نقطية (bitmap) بأيّ صيغةٍ تدعمها حزمةُ `javax.imageio`؛ أي GIF وPNG وJPEG وهكذا. وحين طلب منّي ناشرُ الكتاب صورًا متجهيّة (vector images)، لاحظتُ ميزةً أخرى لمكتبة Java 2D. فحين تطبع إلى طابعة PostScript، تُترجَم عملياتُ Java2D إلى عمليات رسمٍ متجهيّة بلغة PostScript. أمّا إن طبعتَ إلى ملف، فيمكن استهلاكُ النتيجة بواسطة برنامجٍ مثل `ps2eps` ثمّ استيرادُها إلى Adobe Illustrator أوInkscape. وإليك الشيفرة، حيث يكون `comp` مكوّن Swing الذي ترسم دالّةُ `paintComponent` فيه الرسمَ البيانيّ:

```python
DocFlavor flavor = DocFlavor.SERVICE_FORMATTED.PRINTABLE;
String mimeType = "application/postscript";
StreamPrintServiceFactory[] factories;
StreamPrintServiceFactory.lookupStreamPrintServiceFactories(flavor, mimeType);
FileOutputStream out = new FileOutputStream(fileName);
PrintService service = factories[0].getPrintService(out);
SimpleDoc doc = new SimpleDoc(new Printable() {
  public int print(Graphics g, PageFormat pf, int page) {
      if (page >= 1) return Printable.NO_SUCH_PAGE;
      else {
        double sf1 = pf.getImageableWidth() / (comp.getWidth() + 1);
        double sf2 = pf.getImageableHeight() / (comp.getHeight() + 1);
        double s = Math.min(sf1, sf2);
        Graphics2D g2 = (Graphics2D) g;
        g2.translate((pf.getWidth() - pf.getImageableWidth()) / 2,
            (pf.getHeight() - pf.getImageableHeight()) / 2);
        g2.scale(s, s);

        comp.paint(g);
        return Printable.PAGE_EXISTS;
      }
  }
}, flavor, null);
DocPrintJob job = service.createPrintJob();
PrintRequestAttributeSet attributes = new HashPrintRequestAttributeSet();
job.print(doc, attributes);
```

في البداية، كنتُ قلقًا من احتمال وجود عقوبةٍ في الأداء عند استعمال الأشكال العامة، لكنّ ذلك تبيّن خلافَ ذلك. فالقصّ (clipping) يعمل جيّدًا إلى حدٍّ إنّه لا تُنفَّذ فعليًّا إلّا تلك العمليات على الأشكال المطلوبة لتحديث إطار العرض الحاليّ.

## 22.7. غياب إطار لتطبيقات Swing

معظمُ أطر واجهات المستخدم الرسومية تحمل تصوّرًا لتطبيقٍ يدير مجموعةً من المستندات ويتعامل مع القوائم وأشرطة الأدوات وأشرطة الحالة وهكذا. غير أنّ ذلك لم يكن يومًا جزءًا من واجهة Java البرمجية. وكان من المفترض أن توفّر JSR 296[5](#footnote-5) إطارًا أساسيًّا لتطبيقات Swing، لكنّها خاملةٌ حاليًّا. ومن ثمّ فإنّ مطوّر تطبيق Swing أمامه خياران: أن يعيد اختراع عجلةٍ تلو الأخرى، أو أن يستند إلى إطارٍ من طرفٍ ثالث. وفي الوقت الذي كُتب فيه Violet، كانت الخياراتُ الرئيسة لإطار التطبيق هي منصّتَي Eclipse وNetBeans، وكلتاهما بدت ثقيلةً في تلك الحقبة. (وفي اليوم تتوفّر خياراتٌ أكثر، ومنها تشتقّاتُ JSR 296 مثل GUTS[6](#footnote-6).) ومن ثمّ اضطرّ Violet إلى إعادة اختراع آليّاتٍ للتعامل مع القوائم والإطارات الداخلية.

في Violet، تُحدَّد عناصرُ القوائم في ملفات الخصائص، على النحو التالي:

```
file.save.text=Save
file.save.mnemonic=S
file.save.accelerator=ctrl S
file.save.icon=/icons/16x16/save.png
```

وتنشئ دالّةٌ مساعدة عنصرَ القائمة انطلاقًا من البادئة (وهي هنا `file.save`). أمّا اللواحق `.text` و`.mnemonic` وغيرها فما هو مسمّى اليوم بـ«الاتّفاقية على حساب الإعداد» (convention over configuration). واستعمالُ ملفات الموارد لوصف هذه الإعدادات أفضلُ بوضوحٍ من ضبط القوائم عبر نداءات الواجهة البرمجية، لأنّه يتيح الترجمةَ المحلية بسهولة. وقد أعدتُ استعمال هذه الآليّة في مشروعٍ آخر مفتوح المصدر، وهو بيئة GridWorld لتعليم علوم الحاسوب في المرحلة الثانوية[7](#footnote-7).

يسمح تطبيقٌ مثل Violet للمستخدمين بفتح عدّة «مستندات»، كلٌّ منها يحوي رسمًا بيانيًّا. وحين كُتب Violet للمرّة الأولى، كانت الواجهةُ متعددة المستندات (MDI) ما زالت مستعملةً على نطاقٍ واسع. وفي MDI، يكون للإطار الرئيس شريطُ قوائم، وتُعرض كلُّ طريقة عرضٍ لمستندٍ في إطارٍ داخليٍّ له عنوانٌ لكن بلا شريط قوائم. ويحتوي كلُّ إطارٍ داخليٍّ الإطارَ الرئيسَ، ويستطيع المستخدم تكبيرَه أو تصغيرَه (تصغيره إلى أيقونة). وهناك عملياتُ تتابع النوافذ (cascading) وبلطِرها (tiling).

لم يُعجب كثيرٌ من المطوّرين واجهة MDI، ومن ثمّ خرج هذا الأسلوب عن الموضة. ولمدةٍ من الزمن، اعتُبرت واجهةُ المستند الواحد (SDI)، التي يعرض فيها التطبيق عدّةَ إطاراتِ عليا، أفضلَ على الأرجح لأنّ تلك الإطارات يمكن معالجتها بأدوات إدارة النوافذ القياسية في نظام التشغيل المُضيف. وحين اتّضح أنّ امتلاك أعدادٍ كبيرة من النوافذ العليا ليس بالأمر جيّدٍ في النهاية، بدأت تظهر واجهاتُ ذاتِ علاماتٍ تبويب (tabbed interfaces)، تُحوى فيها المستنداتُ المتعدّدة من جديد في إطارٍ واحد، لكنّها تُعرض جميعًا بالحجم الكامل ويُنتقى بينها بعلامات التبويب. ولا يتيح ذلك للمستخدمين مقارنة مستندين جنبًا إلى جنب، لكنّه يبدو أنّه انتصر في النهاية.

استخدمت النسخةُ الأصلية من Violet واجهةَ MDI. وللواجهةُ البرمجية في Java ميزةُ الإطارات الداخلية (internal frames)، لكنّني اضطررتُ إلى إضافة دعمٍ للتبليط والتتابع. وبدلًا من ذلك تحوّل Alexandre إلى واجهةٍ ذاتِ علاماتِ تبويب، وهي مدعومةٌ إلى حدٍّ أفضل بالواجهة البرمجية في Java. ومن المرغوب فيه وجودُ إطارِ تطبيقاتٍ تكون فيه سياسةُ عرض المستندات شفّالةً أمام المطوّر وقابلةً للاختيار من المستخدم.

كما أضاف Alexandre دعمًا للأشرطة الجانبية (sidebars)، وشريط الحالة، ولوحة ترحيب، وشاشة بدء (splash screen). ولعلّه من المفيد لكلّ هذا أن يكون جزءًا من إطار تطبيقات Swing.

## 22.8. التراجع/الإعادة

قد يبدو تنفيذُ تراجعٍ متعدّد/إعادةٍ متعدّدة مهمةً شاقة، لكنّ حزمةَ التراجع في Swing ([Top00](https://aosabook.org/en/v1/bib1.html#bib:topley:coreswing)، الفصل 9) توفّر إرشاداتٍ معماريةً جيّدة. فمديرُ `UndoManager` يدير مكدّسًا من كائنات `UndoableEdit`. ولكلٍّ منها دالّةُ `undo` تلغي أثرَ عملية التحرير، ودالّةُ `redo` تلغي التراجعَ (أي أنّها تنفّذ عمليةَ التحرير الأصلية). أمّا `CompoundEdit` فهو سلسلةُ عمليات `UndoableEdit` ينبغي التراجعُ عنها أو إعادُها بالكامل. ويُشجَّعك على تحديد عملياتِ تحريرٍ صغيرةٍ ذرّية (مثل إضافة حافّةٍ واحدة أو عقدةٍ واحدة أو إزالتهما في حالة الرسم البياني) تُجمَّع في تحريرٍ مركَّب (compound edits) عند الحاجة.

التحدّي هو تحديد مجموعةٍ صغيرة من العمليات الذرّية، كلٌّ منها يمكن التراجعُ عنه بسهولة. وفي Violet هي:

- إضافة عقدةٍ أو حافّة أو إزالتهما
- إرفاق ابنِ عقدةٍ بعقدة أو فصله عنها
- تحريك عقدة
- تغيير خاصيةٍ من خصائص عقدةٍ أو حافّة

ولكلٍّ من هذه العمليات تراجعٌ بديهي. فمثلًا، التراجعُ عن إضافة عقدةٍ هو إزالةُ تلك العقدة، والتراجعُ عن تحريك عقدةٍ هو تحريكُها بالمتجه المعاكس.

![يجب أن يتراجع التراجع عن التغييرات البنيوية في النموذج](/images/aosabook/v1-violet-undo.webp){#fig.vio.undo}

الشكل 22.6: يجب أن يتراجع التراجع عن التغييرات البنيوية في النموذج

لاحظ أنّ هذه العمليات الذرّية *ليست* هي نفسها إجراءاتِ واجهة المستخدم ولا دوالّ واجهة `Graph` التي تستدعيها إجراءاتُ واجهة المستخدم. فمثلًا، تأمّل مخططَ التسلسل في [الشكل 22.6](#fig.vio.undo)، وافترض أنّ المستخدم يسحب الفأرة من شريط التنشيط إلى خطّ الحياة (lifeline) الموجود يمينًا. وحين يُفلَتُ زرُّ الفأرة، تُستدعى الدالّة:

```
public boolean addEdgeAtPoints(Edge e, Point2D p1, Point2D p2)
```

تضيفُ هذه الدالّة حافّةً، غير أنّها قد تنفّذ أيضًا عملياتٍ أخرى بحسب ما تحدّده الصنفان الفرعيّان المشاركان من `Edge` و`Node`. وفي هذه الحالة سيُضاف شريطُ تنشيطٍ إلى خطّ الحياة الموجود يمينًا. ويلزم التراجعُ عن العملية إزالةَ ذلك الشريط أيضًا. ومن ثمّ فإنّ *النموذج* (في حالتنا هو الرسم البياني) يحتاج إلى تسجيل التغييرات البنيوية التي يلزم التراجعُ عنها. وليس كافيًا جمعُ عمليات المتحكّم (controller).

وكما تصوّرتها حزمةُ التراجع في Swing، ينبغي أن تُرسل أصنافُ الرسم البياني والعقد والحوافّ إشعاراتِ `UndoableEditEvent` إلى `UndoManager` كلّما وقع تغييرٌ بنيويّ. أمّا Violet فله تصميمٌ أكثر عموميةً، إذ يتولّى الرسمُ البياني نفسه إدارةَ المستمِعين (listeners) للواجهة التالية:

```
public interface GraphModificationListener
{
  void nodeAdded(Graph g, Node n);
  void nodeRemoved(Graph g, Node n);
  void nodeMoved(Graph g, Node n, double dx, double dy);
  void childAttached(Graph g, int index, Node p, Node c);
  void childDetached(Graph g, int index, Node p, Node c);
  void edgeAdded(Graph g, Edge e);
  void edgeRemoved(Graph g, Edge e);
  void propertyChangedOnNodeOrEdge(Graph g, PropertyChangeEvent event);
}
```

يثبّت الإطارُ مستمعًا في كلّ رسمٍ بياني يكون جسرًا إلى مدير التراجع. ولأغراض دعم التراجع، فإنّ إضافة دعمٍ عامٍّ للمستمِعين إلى النموذج هي تصميمٌ زائدٌ (overdesigned)&mdash;فيمكن لعمليات الرسم البياني أن تتفاعل مباشرةً مع مدير التراجع. غير أنّني أردتُ أيضًا دعمَ ميزةٍ تجريبيةٍ للتحرير التعاونيّ.

إن أردتَ دعمَ التراجع/الإعادة في تطبيقك، فكّر بعنايةٍ في العمليات الذرّية في نموذجك (لا في واجهة المستخدم). وفي النموذج، أطلق الأحداث (fire events) حين يقع تغييرٌ بنيويّ، ودعْ مديرَ التراجع في Swing يجمع هذه الأحداث ويجمّعها في مجموعات.

## 22.9. معمارية الإضافات (Plugins)

بالنسبة إلى مبرمجٍ متمرّسٍ في الرسوميات ثنائية الأبعاد (2D graphics)، ليس من الصعب إضافة نوعٍ جديدٍ من المخطّطات إلى Violet. فمخطّطاتُ الأنشطة مثلًا تبرّع بها طرفٌ ثالث. وحين احتجتُ إلى إنشاء مخطّطات سكك الحديد ومخطّطات الكيانات والعلاقات (ER)، وجدتُ كتابةَ إضافاتِ Violet أسرعَ من الانشغال بـ Visio أو Dia. (وكلُّ نوعٍ من المخطّطات استغرق يومًا لتنفيذه.)

لا تتطلّب هذه التنفيذاتُ معرفةً بإطار Violet كاملًا، بل كلُّ ما يلزم هو واجهاتُ الرسم البياني والعقد والحوافّ وتنفيذاتها المساعدة. ومن أجل تسهيل الأمر على المساهمين أن ينفصلوا عن تطوّر الإطار، صمّمتُ معماريةَ إضافاتٍ بسيطة.

بالطبع، تملك برامجٌ كثيرة معماريةَ إضافات، بعضها في غاية الإتقان. وحين اقترح أحدهم أن يدعم Violet معيار OSGi، ارتجفتُ وبدلًا من ذلك نفّذتُ أبسط شيءٍ يعمل.

يكفي أن يُنتج المساهمون ملفَّ JAR يحتوي تنفيذاتهم للرسم البياني والعقد والحوافّ ثمّ يضعونه في دليل `plugins`. وحين يبدأ Violet، يحمّل تلك الإضافات باستعمال صنف `ServiceLoader` في Java. وقد صُمِّم هذا الصنف لتحميل خدماتٍ مثل محرّكات JDBC. ويحمّل `ServiceLoader` ملفات JAR التي تَعِد بتقديم صنفٍ يُنفِّذ واجهةً معيّنة (وفي حالتنا الواجهةُ `Graph`).

يجب أن يحتوي كلُّ ملف JAR على دليلٍ فرعيٍّ اسمه `META-INF/services` يحوي ملفًّا اسمُه الاسمُ المؤهَّل تمامًا (fully qualified) لصنف الواجهة (مثل `com.horstmann.violet.Graph`)، ويحتوي هذا الملف على أسماء جميع الأصناف المنفِّذة، اسمًا واحدًا في كلّ سطر. ويُنشئ `ServiceLoader` محمِّلَ أصنافٍ لدليل الإضافات، ثمّ يحمّل جميع الإضافات:

```
ServiceLoader<Graph> graphLoader = ServiceLoader.load(Graph.class, classLoader);
for (Graph g : graphLoader) // ServiceLoader<Graph> implements Iterable<Graph>
  registerGraph(g);
```

وهذه ميزةٌ بسيطةٌ ونافعةٌ في Java القياسية قد تجدها قيّمةً لمشاريعك الخاصّة.

## 22.10. الخاتمة

مثل كثيرٍ من مشاريع المصادر المفتوحة، وُلد Violet من حاجةٍ لم تكن ملبَّاةً&mdash;وهي رسمُ مخطّطات UML بسيطةٍ بأقلّ قدرٍ من المتاعب. وقد جعل Violet ممكنًا لاتّساع منصّة Java SE الهائل، وهو يستمدّ من مجموعةٍ متنوّعةٍ من التقنيات التي تشكّل جزءًا من تلك المنصّة. وقد وصفتُ في هذا الفصل كيف يستعمل Violet تقنياتِ Java Beans، والحفظِ الدائم، وJava Web Start، وJava 2D، والتراجعِ والإعادة في Swing، وآليّةِ تحميل الخدمات. وهذه التقنيات ليست مفهومةً دائمًا بقدر أساسيات Java وSwing، لكنّها تستطيع أن تبسّط إلى حدٍّ كبير معماريةَ تطبيقٍ مكتبيّ. وقد أتاحت لي، بوصفي المطوّرَ الوحيد في البداية، أن أُنتج تطبيقًا ناجحًا في بضعة أشهرٍ من العمل بدوامٍ جزئي. كما جعل الاعتمادُ على هذه الآليّات القياسية الأمرَ أيسر على الآخرين في تحسين Violet واستخراج أجزاءٍ منه إلى مشاريعهم الخاصّة.

## الحواشي

1. في ذلك الحين، لم يكن لي علمٌ ببرنامج UMLGraph المحمود لـ Diomidis Spinellis [Spi03](https://aosabook.org/en/v1/bib1.html#bib:spinellis:umlgraph)
2. `http://jung.sourceforge.net`
3. `http://www.omg.org/technology/documents/formal/xmi.htm`
4. `http://jcp.org/en/jsr/detail?id=57`
5. `http://jcp.org/en/jsr/detail?id=296`
6. `http://kenai.com/projects/guts`
7. `http://horstmann.com/gridworld`
