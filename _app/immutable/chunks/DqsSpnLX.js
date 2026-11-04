const e="ocaml-manual",o="ch18",n="مولّد التبعيات (ocamldep)",d="index",c="مولّد التبعيات (ocamldep)",p=[{depth:2,id:"181-الخيارات",text:"18.1 الخيارات"},{depth:2,id:"182-ملف-makefile-نمطي",text:"18.2 ملف Makefile نمطي"}],m=`<h1>الفصل 18: مولّد التبعيات (ocamldep)</h1>
<p>يقرأ الأمر <code>ocamldep</code> مجموعة من ملفات المصدر في OCaml (ملفات <code>.ml</code> و<code>.mli</code>)، ويبحث فيها عن الإشارات إلى وحدات ترجمة خارجية، ثم يُخرج أسطر التبعيات في صيغة تناسب أداة <code>make</code>. يضمن ذلك أن يترجم <code>make</code> ملفات المصدر بالترتيب الصحيح، وأن يعيد ترجمة الملفات التي تحتاج إلى ذلك عند تعديل أحد ملفات المصدر.</p>
<p>والاستعمال النمطي هو:</p>
<pre><code class="language-text">        ocamldep options *.mli *.ml &gt; .depend
</code></pre>
<p>حيث يتوسّع <code>*.mli *.ml</code> إلى جميع ملفات المصدر في الدليل الحالي، و<code>.depend</code> هو الملف الذي ينبغي أن يحتوي على التبعيات. (انظر أدناه إلى <code>Makefile</code> نمطي.)</p>
<p>وتُولَّد التبعيات للترجمة بمترجم الشيفرة البايتية <code>ocamlc</code> وبمترجم الشيفرة الأصلية <code>ocamlopt</code> معًا.</p>
<h2 id="181-الخيارات">18.1 الخيارات</h2>
<p>يتعرّف <code>ocamldep</code> على خيارات سطر الأوامر التالية.</p>
<p><strong><code>-absname</code></strong></p>
<p>إظهار أسماء الملفات المطلقة في رسائل الخطأ.</p>
<p><strong><code>-all</code></strong></p>
<p>توليد التبعيات على جميع الملفات المطلوبة، بدلًا من افتراض تبعيات ضمنية.</p>
<p><strong><code>-allow-approx</code></strong></p>
<p>السماح بالرجوع إلى تقريب قائم على المحلّل المعجمي عندما تفشل عملية التحليل النحوي.</p>
<p><strong><code>-args</code> <em>filename</em></strong></p>
<p>قراءة وسائط سطر أوامر إضافية من <em>filename</em>، كل واحد منها منتهٍ بمحرف سطر جديد.</p>
<p><strong><code>-args0</code> <em>filename</em></strong></p>
<p>قراءة وسائط سطر أوامر إضافية من <em>filename</em>، كل واحد منها منتهٍ بمحرف عدم (null).</p>
<p><strong><code>-as-map</code></strong></p>
<p>بالنسبة إلى الملفات التالية، عدم تضمين التبعيات المؤجَّلة الخاصة بأسماء الوحدات المستعارة. يفترض هذا الخيار أن تلك الملفات تُترجم باستعمال الخيارين <code>-no-alias-deps -w -49</code>، وأنها هي أو واجهاتها تُمرَّر مع الخيار <code>-map</code> عند حساب التبعيات لملفات أخرى. لاحظ أيضًا أنه لكي تكون التبعيات صحيحة في تنفيذ ملف خريطة، ينبغي ألّا تجبر واجهته أيًّا من الأسماء المستعارة التي يحتوي عليها على التحويل إلى نوع آخر.</p>
<p><strong><code>-debug-map</code></strong></p>
<p>إخراج خريطة التبعيات المؤجَّلة لكل ملف خريطة.</p>
<p><strong><code>-I</code> <em>directory</em></strong></p>
<p>إضافة الدليل المحدَّد إلى قائمة الأدلة التي يُبحث فيها عن ملفات المصدر. فإذا أشار ملف مصدر <code>foo.ml</code> إلى وحدة ترجمة خارجية <code>Bar</code>، فلا تُولَّد تبعية على واجهة تلك الوحدة <code>bar.cmi</code> إلا إذا وُجد مصدر <code>bar</code> في الدليل الحالي أو في أحد الأدلة المحدَّدة بالخيار <code>-I</code>. وإلّا افتُرض أن <code>Bar</code> وحدة من المكتبة القياسية، فلا تُولَّد أي تبعيات. وبالنسبة إلى البرامج الممتدة على أدلة متعددة، يُستحسن تمرير الخيارات نفسها من نوع <code>-I</code> إلى <code>ocamldep</code> التي تُمرَّر إلى المترجم.</p>
<p><strong><code>-H</code> <em>directory</em></strong></p>
<p>يتصرّف مثل <code>-I</code> تمامًا، إلا أن أدلة <code>-H</code> يُبحث فيها في الآخر. أُضيف هذا الخيار لتسهيل استدعاء <code>ocamldep</code> بالخيارات نفسها التي تُستعمل مع المترجم، حيث يُستعمل <code>-H</code> للتبعيات العابرة التي لا ينبغي أن يذكرها البرنامج مباشرة.</p>
<p><strong><code>-nocwd</code></strong></p>
<p>عدم إضافة دليل العمل الحالي إلى قائمة أدلة التضمين.</p>
<p><strong><code>-impl</code> <em>file</em></strong></p>
<p>معالجة <em>file</em> كملف <code>.ml</code>.</p>
<p><strong><code>-intf</code> <em>file</em></strong></p>
<p>معالجة <em>file</em> كملف <code>.mli</code>.</p>
<p><strong><code>-keywords</code> <em>version+list</em></strong></p>
<p>ضبط الكلمات المحجوزة وفق مواصفة <em>version+list</em>. تبدأ هذه المواصفة برقم إصدار اختياري يحدّد المجموعة الأساسية من الكلمات المحجوزة، ثم قائمة من الكلمات المحجوزة الإضافية التي تُضاف إلى هذه المجموعة الأساسية، مفصولة بـ*+*. ومن دون رقم إصدار صريح، تكون المجموعة الأساسية هي مجموعة الكلمات المحجوزة في الإصدار الحالي من OCaml. والكلمات الإضافية التي لا تطابق أي كلمة محجوزة معروفة في الإصدار الحالي من اللغة تُطلق خطأً كلما وردت في الشيفرة المصدرية.</p>
<p><strong><code>-map</code> <em>file</em></strong></p>
<p>قراءة التبعيات المؤجَّلة لأسماء الوحدات المستعارة في <em>file</em> ونشرها، حتى تعتمد الملفات التالية على الوحدات المستعارة المُصدَّرة إذا استعملتها. انظر المثال أدناه.</p>
<p><strong><code>-ml-synonym</code> <em>.ext</em></strong></p>
<p>اعتبار الامتداد المحدَّد (بنقطة بادئة) مرادفًا للامتداد .ml.</p>
<p><strong><code>-mli-synonym</code> <em>.ext</em></strong></p>
<p>اعتبار الامتداد المحدَّد (بنقطة بادئة) مرادفًا للامتداد .mli.</p>
<p><strong><code>-modules</code></strong></p>
<p>إخراج تبعيات خام على الشكل filename: Module1 Module2 ... ModuleN حيث <code>Module1</code> … <code>ModuleN</code> أسماء وحدات الترجمة المشار إليها داخل الملف <code>filename</code>، من دون حلّ هذه الأسماء إلى أسماء ملفات مصدر. ولا يمكن أن يستعمل <code>make</code> مثل هذه التبعيات الخام، لكن يمكن أن تعالجها أدوات أخرى بعد ذلك، مثل <code>Omake</code>.</p>
<p><strong><code>-native</code></strong></p>
<p>توليد التبعيات لبرنامج أصلي خالص (بلا نسخة شيفرة بايتية). فعندما لا يكون لملف تنفيذ (ملف <code>.ml</code>) ملف واجهة صريح (ملف <code>.mli</code>)، يُولّد <code>ocamldep</code> تبعيات على الملف المترجم إلى شيفرة بايتية (ملف <code>.cmo</code>) لتعكس تغيّرات الواجهة. وقد يسبّب ذلك إعادة ترجمات غير ضرورية إلى شيفرة بايتية في البرامج التي تُترجم إلى الشيفرة الأصلية فقط. ويجعل الخيار <code>-native</code> التبعيات تُولَّد على الملفات المترجمة أصليًا (<code>.cmx</code>) بدلًا من ملفات <code>.cmo</code>. (ولا يُحدث هذا الخيار فرقًا إذا كانت جميع ملفات المصدر لها ملفات واجهة <code>.mli</code> صريحة.)</p>
<p><strong><code>-one-line</code></strong></p>
<p>إخراج سطر واحد لكل ملف، مهما كان طوله.</p>
<p><strong><code>-open</code> <em>module</em></strong></p>
<p>افتراض أن الوحدة <em>module</em> مفتوحة قبل تحليل كل ملف من الملفات التالية.</p>
<p><strong><code>-pp</code> <em>command</em></strong></p>
<p>جعل <code>ocamldep</code> يستدعي الأمر <em>command</em> المحدَّد معالجًا مسبقًا لكل ملف مصدر.</p>
<p><strong><code>-ppx</code> <em>command</em></strong></p>
<p>تمرير أشجار التركيب المجرّدة عبر المعالج المسبق <em>command</em>.</p>
<p><strong><code>-shared</code></strong></p>
<p>توليد التبعيات لملفات الإضافات الأصلية (.cmxs) إضافةً إلى الملفات المترجمة أصليًا (.cmx).</p>
<p><strong><code>-slash</code></strong></p>
<p>تحت Windows، استعمال الشرطة المائلة إلى الأمام (/) فاصلًا للمسارات بدلًا من الشرطة المائلة العكسية المعتادة (). وتحت Unix لا يفعل هذا الخيار شيئًا.</p>
<p><strong><code>-sort</code></strong></p>
<p>ترتيب الملفات وفق تبعياتها.</p>
<p><strong><code>-version</code></strong></p>
<p>طباعة سلسلة الإصدار والخروج.</p>
<p><strong><code>-vnum</code></strong></p>
<p>طباعة رقم الإصدار القصير والخروج.</p>
<p><strong><code>-help</code> أو <code>--help</code></strong></p>
<p>عرض ملخّص قصير لطريقة الاستعمال والخروج.</p>
<h2 id="182-ملف-makefile-نمطي">18.2 ملف Makefile نمطي</h2>
<p>هذا قالب <code>Makefile</code> لبرنامج OCaml.</p>
<pre><code class="language-text">OCAMLC=ocamlc
OCAMLOPT=ocamlopt
OCAMLDEP=ocamldep
INCLUDES=                 # all relevant -I options here
OCAMLFLAGS=$(INCLUDES)    # add other options for ocamlc here
OCAMLOPTFLAGS=$(INCLUDES) # add other options for ocamlopt here

# prog1 should be compiled to bytecode, and is composed of three
# units: mod1, mod2 and mod3.

# The list of object files for prog1
PROG1_OBJS=mod1.cmo mod2.cmo mod3.cmo

prog1: $(PROG1_OBJS)
        $(OCAMLC) -o prog1 $(OCAMLFLAGS) $(PROG1_OBJS)

# prog2 should be compiled to native-code, and is composed of two
# units: mod4 and mod5.

# The list of object files for prog2
PROG2_OBJS=mod4.cmx mod5.cmx

prog2: $(PROG2_OBJS)
        $(OCAMLOPT) -o prog2 $(OCAMLFLAGS) $(PROG2_OBJS)

# Common rules

%.cmo: %.ml
        $(OCAMLC) $(OCAMLFLAGS) -c $&lt;

%.cmi: %.mli
        $(OCAMLC) $(OCAMLFLAGS) -c $&lt;

%.cmx: %.ml
        $(OCAMLOPT) $(OCAMLOPTFLAGS) -c $&lt;

# Clean up
clean:
        rm -f prog1 prog2
        rm -f *.cm[iox]

# Dependencies
depend:
        $(OCAMLDEP) $(INCLUDES) *.mli *.ml &gt; .depend

include .depend
</code></pre>
<p>إذا استعملت أسماء وحدات مستعارة لإعطاء أسماء أقصر للوحدات، فأنت بحاجة إلى تغيير التعريفات أعلاه. وبافتراض أن ملف الخريطة لديك اسمه <code>mylib.mli</code>، فهذه تعديلات دنيا:</p>
<pre><code class="language-text">OCAMLFLAGS=$(INCLUDES) -open Mylib

mylib.cmi: mylib.mli
        $(OCAMLC) $(INCLUDES) -no-alias-deps -w -49 -c $&lt;

depend:
        $(OCAMLDEP) $(INCLUDES) -map mylib.mli $(PROG1_OBJS:.cmo=.ml) &gt; .depend
</code></pre>
<p>لاحظ أنه في هذه الحالة ينبغي ألّا تحسب التبعيات الخاصة بـ<code>mylib.mli</code> مع الملفات الأخرى، ومن هنا الحاجة إلى تمرير قائمة الملفات التي ستُعالَج صراحةً. وإذا كانت لـ<code>mylib.mli</code> نفسها تبعيات، فينبغي أن تحسبها باستعمال <code>-as-map</code>.</p>
`,l={book:e,chapter:o,chapterTitle:n,slug:d,title:c,headings:p,html:m};export{e as book,o as chapter,n as chapterTitle,l as default,p as headings,m as html,d as slug,c as title};
