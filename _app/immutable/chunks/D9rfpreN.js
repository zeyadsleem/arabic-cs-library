const e="ocaml-manual",a="ch28",n="الكشف عن تسابقات البيانات وقت التشغيل باستخدام ThreadSanitizer",s="index",l="الكشف عن تسابقات البيانات وقت التشغيل باستخدام ThreadSanitizer",c=[{depth:2,id:"281-نظرة-عامة-والاستعمال",text:"28.1 نظرة عامة والاستعمال"},{depth:2,id:"282-تداعيات-الأداء",text:"28.2 تداعيات الأداء"},{depth:2,id:"283-السلبيات-الكاذبة-والإيجابيات-الكاذبة",text:"28.3 السلبيات الكاذبة والإيجابيات الكاذبة"},{depth:2,id:"284-خيارات-وقت-التشغيل",text:"28.4 خيارات وقت التشغيل"},{depth:2,id:"285-إرشادات-الربط",text:"28.5 إرشادات الربط"},{depth:2,id:"286-تغيرات-في-تسليم-الإشارات",text:"28.6 تغيّرات في تسليم الإشارات"}],p=`<h1>الفصل 28: الكشف عن تسابقات البيانات وقت التشغيل باستخدام ThreadSanitizer</h1>
<h2 id="281-نظرة-عامة-والاستعمال">28.1 نظرة عامة والاستعمال</h2>
<p>تتيح OCaml، منذ الإصدار 5.0، التوازي بالذاكرة المشتركة، ومن ثمّ تعديل البيانات المشتركة بين عدّة خيوط. وهذا يفتح الباب أمام تسابقات البيانات، أي الوصولات غير المرتّبة إلى الموقع نفسه في الذاكرة مع كون أحدها على الأقل كتابة. ومن السهل إدخال تسابقات البيانات في OCaml، وقد يكون سلوك البرامج التي تشوبها تسابقات غير بديهي: فالأسلوب الذي تُلاحَظ به لا يمكن تفسيره بمجرّد تشابك عمليات صادرة من خيوط متزامنة مختلفة. وتجد مزيدًا من المعلومات عن تسابقات البيانات وعواقبها في القسم 9.4 والفصل 10.</p>
<p>وللمساعدة في كشف تسابقات البيانات، تدعم OCaml أداة ThreadSanitizer (TSan)، وهي كاشف دينامي لتسابقات البيانات استُعمل بنجاح في لغات مثل C وC++ وSwift وغيرها. ودعم TSan في OCaml متوفّر منذ الإصدار 5.2.</p>
<p>لاستعمال TSan، يجب إعداد المترجم بالخيار <code>--enable-tsan</code>. ويمكنك أيضًا تثبيت تبديل <code>opam</code> مع تمكين ميزة TSan كما يلي:</p>
<pre><code class="language-text">opam switch create &lt;YOUR-SWITCH-NAME-HERE&gt; ocaml-option-tsan
</code></pre>
<p>دعم TSan في OCaml متوفّر حاليًا لمعمارية x86_64 على FreeBSD وLinux وmacOS، ولمعمارية arm64 على Linux وmacOS، ولمعماريات POWER وriscv وs390x على Linux.</p>
<p>ويقتضي بناء OCaml مع دعم TSan وجود GCC أو Clang. وأدنى إصدارين مدعومين هما GCC 11 وClang 14. ولاحظ أن تقارير تسابقات البيانات من TSan مع GCC 11 معروفة بسوء إبلاغها عن آثار المكدّس العكسية (بلا أرقام أسطر)، وقد أُصلح ذلك في GCC 12.</p>
<p>ويختلف المترجم الممكَّن فيه TSan عن المترجم العادي على النحو التالي: تُجهَّز جميع البرامج التي يترجمها <code>ocamlopt</code> باستدعاءات إلى زمن تشغيل TSan، فيكشف TSan تسابقات البيانات التي تصادفها أثناء التنفيذ.</p>
<p>لنأخذ، على سبيل المثال، البرنامج التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> a = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> b = <span class="hljs-built_in">ref</span> <span class="hljs-number">0</span>

<span class="hljs-keyword">let</span> d1 <span class="hljs-literal">()</span> =
  a := <span class="hljs-number">1</span>;
  !b

<span class="hljs-keyword">let</span> d2 <span class="hljs-literal">()</span> =
  b := <span class="hljs-number">1</span>;
  !a

<span class="hljs-keyword">let</span> <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> h = <span class="hljs-type">Domain</span>.spawn d2 <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r1 = d1 <span class="hljs-literal">()</span> <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">let</span> r2 = <span class="hljs-type">Domain</span>.join h <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">assert</span> (not (r1 = <span class="hljs-number">0</span> &amp;&amp; r2 = <span class="hljs-number">0</span>))
</code></pre>
<p>هذا البرنامج مشوب بتسابقات بيانات. فالموقعان <code>a</code> و<code>b</code> في الذاكرة يُقرآن ويُكتبان على نحو متزامن من نطاقين <code>d1</code> و<code>d2</code>. والموقعان <code>a</code> و<code>b</code> «غير ذرّيين» وفق نموذج الذاكرة (انظر الفصل 10)، ولا مزامنة بين الوصولات إليهما. ومن ثمّ يوجد تسابقا بيانات هنا، يوافق كلًّا منهما أحد الموقعين <code>a</code> و<code>b</code>.</p>
<p>وعندما تترجم هذا البرنامج وتشغّله بـ <code>ocamlopt</code>، قد تلاحظ تقارير تسابقات البيانات على الخطأ المعياري، مثل:</p>
<pre><code class="language-text">==================
WARNING: ThreadSanitizer: data race (pid=3808831)
  Write of size 8 at 0x8febe0 by thread T1 (mutexes: write M90):
    #0 camlSimple_race.d2_274 simple_race.ml:8 (simple_race.exe+0x420a72)
    #1 camlDomain.body_706 stdlib/domain.ml:211 (simple_race.exe+0x440f2f)
    #2 caml_start_program &lt;null&gt; (simple_race.exe+0x47cf37)
    #3 caml_callback_exn runtime/callback.c:197 (simple_race.exe+0x445f7b)
    #4 domain_thread_func runtime/domain.c:1167 (simple_race.exe+0x44a113)

  Previous read of size 8 at 0x8febe0 by main thread (mutexes: write M86):
    #0 camlSimple_race.d1_271 simple_race.ml:5 (simple_race.exe+0x420a22)
    #1 camlSimple_race.entry simple_race.ml:13 (simple_race.exe+0x420d16)
    #2 caml_program &lt;null&gt; (simple_race.exe+0x41ffb9)
    #3 caml_start_program &lt;null&gt; (simple_race.exe+0x47cf37)
[...]

WARNING: ThreadSanitizer: data race (pid=3808831)
  Read of size 8 at 0x8febf0 by thread T1 (mutexes: write M90):
    #0 camlSimple_race.d2_274 simple_race.ml:9 (simple_race.exe+0x420a92)
    #1 camlDomain.body_706 stdlib/domain.ml:211 (simple_race.exe+0x440f2f)
    #2 caml_start_program &lt;null&gt; (simple_race.exe+0x47cf37)
    #3 caml_callback_exn runtime/callback.c:197 (simple_race.exe+0x445f7b)
    #4 domain_thread_func runtime/domain.c:1167 (simple_race.exe+0x44a113)

  Previous write of size 8 at 0x8febf0 by main thread (mutexes: write M86):
    #0 camlSimple_race.d1_271 simple_race.ml:4 (simple_race.exe+0x420a01)
    #1 camlSimple_race.entry simple_race.ml:13 (simple_race.exe+0x420d16)
    #2 caml_program &lt;null&gt; (simple_race.exe+0x41ffb9)
    #3 caml_start_program &lt;null&gt; (simple_race.exe+0x47cf37)
[...]

==================
ThreadSanitizer: reported 2 warnings
</code></pre>
<p>فلكل تسابق بيانات يُكشف، يبلّغ TSan عن موضع الوصولين المتعارضين، وطبيعتهما (قراءة، كتابة، قراءة ذرّية، إلخ)، وأثر المكدّس المرتبط بهما.</p>
<p>وإذا شغّلت البرنامج السابق عدّة مرات، فقد يتفاوت الخَرْج: فيبلّغ TSan أحيانًا عن تسابقَي بيانات، وأحيانًا عن تسابق واحد، وأحيانًا عن لا شيء. ويعود ذلك إلى اجتماع عاملين:</p>
<ul>
<li>
<p>أولًا، لا يبلّغ TSan إلا عن تسابقات البيانات التي تصادفها أثناء التنفيذ، أي الوصولات المتعارضة غير المرتّبة إلى الذاكرة التي تُنفَّذ فعلًا.</p>
</li>
<li>
<p>إضافة إلى ذلك، قد لا تكون في هذا البرنامج، بحسب التنفيذات، وصولات كهذه: فإن عادت <code>d1</code> قبل أن تنتهي <code>d2</code> من التوليد، فقد تكون جميع وصولات الذاكرة الصادرة من <code>d1</code> سابقةً في الحدوث لتلك الصادرة من <code>d2</code>، لأن توليد نطاق يتضمّن مزامنة بين الخيوط. وفي هذه الحالة تُعدّ الوصولات مرتّبة ولا يُبلَّغ عن أي تسابق بيانات.</p>
</li>
</ul>
<p>ويبيّن هذا المثال أن تسابقات البيانات قد تخفيها أحيانًا عمليات مزامنة غير ذات صلة.</p>
<h2 id="282-تداعيات-الأداء">28.2 تداعيات الأداء</h2>
<p>يفرض تجهيز TSan كلفة غير مهملة في وقت التشغيل. وقد لوحظ تجريبيًا أن هذه الكلفة تُسبّب إبطاءً يتراوح بين مرتين وسبع مرات. ومن أهم أسباب الإبطاء الشديد الوصول المتكرّر إلى البيانات القابلة للتعديل. وفي المقابل، لا تُجهَّز كتابات التهيئة إلى مواقع الذاكرة غير القابلة للتعديل ولا القراءات منها. ويخصّص TSan أيضًا كميات ضخمة جدًّا من الذاكرة الظاهرية، وإن كان لا يستعمل إلا جزءًا صغيرًا منها. وتزداد استهلاك الذاكرة بمعامل يتراوح بين 4 و7.</p>
<h2 id="283-السلبيات-الكاذبة-والإيجابيات-الكاذبة">28.3 السلبيات الكاذبة والإيجابيات الكاذبة</h2>
<p>كما يبيّن المثال السابق، لن يبلّغ TSan إلا عن تسابقات البيانات التي تصادفها أثناء التنفيذ. ومن التحذيرات المهمة الأخرى أن TSan لا يتذكّر إلا عددًا محدودًا من وصولات الذاكرة لكل موقع. وهذا العدد هو 4 في وقت كتابة هذه السطور. ولن تُكشف تسابقات البيانات التي يشملها وصول منسيّ. وأخيرًا، تنصّ <a href="https://github.com/google/sanitizers/wiki/ThreadSanitizerAlgorithm">وثائق TSan</a> على أن احتمال تفويت تسابق إذا وصل خيطان إلى الموقع نفسه في الوقت نفسه احتمال ضئيل جدًّا. ولا يتجاهل TSan تسابقات البيانات إلا في هذه الحالات الثلاث المحدّدة.</p>
<p>وفي ما يخصّ تسابقات البيانات بين وصولين إلى الذاكرة صادرين من شيفرة OCaml، لا يُنتج TSan إيجابيات كاذبة؛ أي إن TSan لن يصدر تقارير زائفة.</p>
<p>وعند خلط شيفرة OCaml بشيفرة C، من خلال استعمال عمليات C أوّلية، يصير مفهوم الإيجابية الكاذبة أقل وضوحًا، لأنه يشمل نموذجَي ذاكرة: OCaml وC11. ومع ذلك، ينبغي أن يتصرّف TSan في الغالب كما يُتوقّع: فالقراءات والكتابات غير الذرّية في C تتسابق مع القراءات والكتابات غير الذرّية في OCaml، والعمليات الذرّية في C لا تتسابق مع العمليات الذرّية في OCaml. وثمّة احتمال نظري واحد لإيجابية كاذبة: إذا هُيّئت قيمة من نوع <code>value</code> من C دون استعمال <code>caml_initialize</code> (وهو مسموح بشرط ألّا يعمل جامع القمامة بين التخصيص والكتابة، انظر الفصل 23)، ثمّ جرى وصول متعارض لاحق من خيط آخر. فهذا لا يشكّل تسابق بيانات، لكن TSan قد يبلّغ عنه على هذا النحو.</p>
<h2 id="284-خيارات-وقت-التشغيل">28.4 خيارات وقت التشغيل</h2>
<p>يدعم TSan عددًا من خيارات الإعداد في وقت التشغيل باستعمال متغيّر البيئة <code>TSAN_OPTIONS</code>. وينبغي أن يحتوي <code>TSAN_OPTIONS</code> على خيار واحد أو أكثر تفصل بينها مسافات. انظر <a href="https://github.com/google/sanitizers/wiki/ThreadSanitizerFlags">وثائق أعلام TSan</a> و<a href="https://github.com/google/sanitizers/wiki/SanitizerCommonFlags">وثائق الأعلام المشتركة بين جميع أدوات التعقيم</a> لمزيد من المعلومات. ومن الجدير بالذكر أن <code>TSAN_OPTIONS</code> يتيح كبت بعض تسابقات البيانات من تقارير TSan. وكبت تقارير تسابقات البيانات مفيد للتسابقات المتعمّدة أو للمكتبات التي يتعذّر إصلاحها.</p>
<p>على سبيل المثال، لكبت التقارير الصادرة من دوال في وحدة OCaml اسمها <code>My_module</code>، يمكنك تشغيل</p>
<pre><code class="language-text">TSAN_OPTIONS=&quot;suppressions=suppr.txt&quot; ./my_instrumented_program
</code></pre>
<p>مع ملف <code>suppr.txt</code> يحتوي على:</p>
<pre><code class="language-text">race_top:^camlMy_module
</code></pre>
<p>(لاحظ أن هذا يعتمد على صيغة رموز OCaml في الملف التنفيذي. فقد تنتج بعض أدوات البناء، مثل Dune، صيغًا مختلفة. وينبغي أن تكيّف هذا المثال مع الرموز الموجودة فعلًا في آثار مكدّسك.)</p>
<p>ويتيح المتغيّر <code>TSAN_OPTIONS</code> أيضًا زيادة «حجم السجل»، مثل:</p>
<pre><code class="language-text">TSAN_OPTIONS=&quot;history_size=7&quot; ./my_instrumented_program
</code></pre>
<p>يسجّل سجل TSan أحداثًا مثل دخول الدوال وخروجها، ويُستعمل لإعادة بناء آثار المكدّس. وقد يكون زيادة حجم السجل ضروريًا أحيانًا للحصول على أثر المكدّس الثاني، لكنه يزيد استهلاك الذاكرة أيضًا. ولا يغيّر هذا الإعداد عدد وصولات الذاكرة المتذكَّرة لكل موقع.</p>
<p>وثمّة خيار آخر مفيد في وقت التشغيل هو <code>exitcode=0</code>، الذي يظلّ يبلّغ عن تسابقات البيانات لكنه لا يغيّر شيفرة الخروج. وقد يكون ذلك مفيدًا إذا كان TSan يشكو من تسابقات بيانات في برامج لا تهمّك، وكانت شيفرة الخروج غير الصفرية تعطّل سير عملك.</p>
<h2 id="285-إرشادات-الربط">28.5 إرشادات الربط</h2>
<p>كقاعدة عامة، ينبغي ألّا تُربط برامج OCaml المجهَّزة بـ TSan إلا بكائنات OCaml أو C مجهَّزة بـ TSan أيضًا. وفعل غير ذلك قد يؤدّي إلى أعطال. والاستثناء الوحيد لهذه القاعدة هو مكتبات C التي لا تستدعي زمن تشغيل OCaml بأي شكل، أي لا تخصّص ولا ترفع استثناءات ولا تستدعي شيفرة OCaml، إلخ. ومن الأمثلة على ذلك libc أو مكتبات النظام. ولن يُبلَّغ عن تسابقات البيانات في المكتبات غير المجهَّزة.</p>
<p>وينبغي دائمًا بناء شيفرة C المتفاعلة مع OCaml من خلال الأمر <code>ocamlopt</code>، الذي يمرّر أعلام التجهيز المطلوبة إلى مترجم C. ويمكن استعمال المؤهّل <code>CAMLno_tsan</code> لمنع تجهيز دوال:</p>
<pre><code class="language-text">CAMLno_tsan void f(int arg)
{
  /* This function will not be instrumented. */
  ...
}
</code></pre>
<p>ولن يُبلَّغ عن التسابقات الصادرة من دوال غير مجهَّزة. ولا ينبغي أن يستعمل <code>CAMLno_tsan</code> إلا الخبراء. ويمكن استعماله لتقليل الكلفة على الأداء في بعض الحالات النادرة، أو لكبت بعض الإنذارات المعروفة. وفي الحالة الأخيرة، يُفضَّل متى أمكن استعمال ملف كبت مع <code>TSAN_OPTIONS</code>، لأنه يتيح تحكّمًا أدقّ، أما تأهيل دالة <code>f</code> بـ <code>CAMLno_tsan</code> فيؤدّي إلى فقدان مدخلات في آثار مكدّس TSan عندما يقع تسابق بيانات في دالة تُستدعى بشكل متعدٍّ من <code>f</code>.</p>
<p>ولا توجد طريقة لتعطيل التجهيز في شيفرة OCaml.</p>
<h2 id="286-تغيرات-في-تسليم-الإشارات">28.6 تغيّرات في تسليم الإشارات</h2>
<p>يعترض TSan جميع الإشارات ويمرّرها إلى البرنامج المجهَّز. وهذه الطبقة من TSan ليست شفّافة دائمًا بالنسبة للبرنامج. فالإشارات المتزامنة مثل <code>SIGSEV</code> و<code>SIGILL</code> و<code>SIGBUS</code> وغيرها تُمرَّر فورًا، أما الإشارات غير المتزامنة مثل <code>SIGINT</code> فتُؤجَّل إلى الاستدعاء التالي لزمن تشغيل TSan (إلى الوصول التالي إلى بيانات قابلة للتعديل مثلًا). وقد يكون لهذا القيد في TSan آثار مفاجئة: فالدوال النقيّة العودية التي لا تخصّص ذاكرة لا يمكن قطعها حتى تنتهي، على سبيل المثال.</p>
`,o={book:e,chapter:a,chapterTitle:n,slug:s,title:l,headings:c,html:p};export{e as book,a as chapter,n as chapterTitle,o as default,c as headings,p as html,s as slug,l as title};
