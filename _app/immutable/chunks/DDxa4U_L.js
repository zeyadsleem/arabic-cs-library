const e="ocaml-manual",a="ch21",n="التنقيح الأصلي (gdb, lldb)",t="index",l="التنقيح الأصلي (gdb, lldb)",o=[{depth:2,id:"211-نظرة-عامة",text:"21.1 نظرة عامة"},{depth:3,id:"2111-صيغة-dwarf",text:"21.1.1 صيغة DWARF"},{depth:3,id:"2112-تشويه-الأسماء",text:"21.1.2 تشويه الأسماء"},{depth:3,id:"2113-مؤشرات-الإطار",text:"21.1.3 مؤشرات الإطار"},{depth:2,id:"212-الترجمة-من-أجل-التنقيح",text:"21.2 الترجمة من أجل التنقيح"},{depth:2,id:"213-استعمال-gdb",text:"21.3 استعمال GDB"},{depth:3,id:"2131-أوامر-gdb",text:"21.3.1 أوامر GDB"},{depth:2,id:"214-استعمال-lldb",text:"21.4 استعمال LLDB"},{depth:3,id:"2141-أوامر-lldb",text:"21.4.1 أوامر LLDB"}],s=`<h1>الفصل 21: التنقيح الأصلي (gdb, lldb)</h1>
<h2 id="211-نظرة-عامة">21.1 نظرة عامة</h2>
<p>يصف هذا الفصل الدعم الخاص بتنقيح الملفات التنفيذية لـ OCaml المبنية بالمترجم إلى الشيفرة الأصلية <code>ocamlopt</code>، باستخدام المنقّحات الأصلية القياسية مثل GDB أو LLDB. وسنسمّي هذا <em>التنقيح الأصلي</em>، تمييزًا له عن تنقيح الشيفرة البايتية المدعوم عبر <code>ocamldebug</code> (الفصل 20).</p>
<p>التنقيح الأصلي مدعوم على منصّات Linux وmacOS وFreeBSD. أما الدعم على Windows فغير متاح حاليًا.</p>
<h3 id="2111-صيغة-dwarf">21.1.1 صيغة DWARF</h3>
<p>يستعمل OCaml صيغة التنقيح <a href="http://dwarfstd.org/">DWARF</a> لوصف معلومات التنقيح التي يولّدها. وDWARF صيغة لمعلومات التنقيح تستعملها مترجمات ومنقّحات كثيرة لدعم التنقيح على مستوى المصدر. وهي مستعملة في صيغ الملفات التنفيذية ELF وMach-O.</p>
<p>تضمّ معلومات التنقيح مكوّنين أساسيين:</p>
<p><strong>معلومات إطار الاستدعاء (CFI):</strong> تصف كيفية فكّ مكدّس الاستدعاءات لتوليد الآثار العكسية. وتمتدّ معلومات CFI في OCaml عبر حدود اللغات، من شيفرة OCaml إلى دوال زمن التشغيل المكتوبة بلغة C، وعبر نداءات واجهة الدوال الأجنبية (FFI) عندما توفّر اللغة الأجنبية بيانات CFI أيضًا.</p>
<p><strong>تعيين أسطر المصدر:</strong> يعيد ربط كل تعليمة آلة بموضع المصدر الذي أتت منه، ما يمكّن المنقّحات من عرض شيفرة OCaml المصدرية ودعم التدرّج على مستوى المصدر. مثلًا، قد تُربط التعليمة الموجودة عند عنوان الذاكرة <code>0xdeadbeef</code> بالموضع <code>myprogram.ml:42</code>.</p>
<p>يعرّف OCaml اصطلاح نداء خاصًا به يبيّن كيفية تمرير الوسائط إلى الدوال، وكيفية إرجاع القيم منها، وكيفية استعمال السجلات. وهذه المعلومات خاصة بكل معمارية، وهي موثّقة في ملفات المصدر <em>asmcomp/<ARCH>/proc.ml</em> لكل معمارية.</p>
<h3 id="2112-تشويه-الأسماء">21.1.2 تشويه الأسماء</h3>
<p>عندما يترجم OCaml شيفرة مصدرية، يحوّل بنى اللغة مثل أسماء الدوال والوحدات إلى <em>أسماء مشوَّهة</em> تظهر في الملف التنفيذي النهائي. وتخدم هذه الأسماء المشوَّهة أغراضًا عدّة:</p>
<ul>
<li>
<p>تضمن تفرّد الرموز في الملف التنفيذي المُترجَم</p>
</li>
<li>
<p>ترمّز بنية الوحدات ومعلومات فضاء الأسماء</p>
</li>
<li>
<p>تظهر في خَرْج المنقّح مثل الآثار العكسية وقوائم الرموز</p>
</li>
<li>
<p>يمكن استعمالها لضبط نقاط التوقّف عند غياب معلومات ملف المصدر</p>
</li>
</ul>
<p>مخطّط التشويه الحالي ابتداءً من OCaml 5.3:</p>
<ul>
<li>
<p>Linux: <code>caml&lt;MODULE_NAME&gt;.&lt;FUNCTION_NAME&gt;_&lt;NNN&gt;</code></p>
</li>
<li>
<p>macOS وWindows MSVC: <code>caml&lt;MODULE_NAME&gt;$&lt;FUNCTION_NAME&gt;_&lt;NNN&gt;</code></p>
</li>
</ul>
<p>حيث <code>NNN</code> عدد مولَّد يضمن التفرّد.</p>
<p><strong>مثال:</strong> قد تصير الدالة <code>fib</code> في الوحدة <code>MyMath</code> إلى <code>camlMyMath.fib_271</code> على Linux أو إلى <code>camlMyMath$fib_271</code> على macOS.</p>
<p><strong>ملاحظة:</strong> استعملت إصدارات OCaml السابقة لـ 5.1.1 شرطتين سفليتين متتاليتين: <code>caml&lt;MODULE_NAME&gt;__&lt;FUNCTION_NAME&gt;_&lt;NNN&gt;</code>.</p>
<h3 id="2113-مؤشرات-الإطار">21.1.3 مؤشرات الإطار</h3>
<p>توفّر مؤشرات الإطار طريقة بديلة للمنقّحات لاجتياز مكدّس الاستدعاءات. ويدعم OCaml مؤشرات الإطار على منصّتي AMD64 وARM64.</p>
<p>باستعمال مؤشرات الإطار، تحتفظ كل دالة بـ<em>مؤشر إطار</em> يشير إلى قاعدة إطار مكدّسها (منطقة الذاكرة المخصّصة لمتغيّرات تلك الدالة المحلية ومعلومات ندائها، وتُعرف أيضًا باسم إطار التنشيط أو سجل التنشيط). وبربط هذه المؤشرات بعضها ببعض مع عناوين العودة، تستطيع المنقّحات إعادة بناء مكدّس الاستدعاءات كاملًا.</p>
<p>مؤشرات الإطار اختيارية (وليست لازمة للتنقيح)، ويجب تمكينها صراحةً أثناء إعداد المترجم (انظر قسم قياس الأداء 22.2.2 للتفاصيل).</p>
<h2 id="212-الترجمة-من-أجل-التنقيح">21.2 الترجمة من أجل التنقيح</h2>
<p>قبل تنقيح برامج OCaml، يجب أن يكون المترجم الأصلي <code>ocamlopt</code> مثبَّتًا مع دعم CFI، وهو كذلك افتراضيًا. ويمكنك أيضًا التحكّم في ذلك صراحةً بخيار الإعداد <code>--enable-cfi</code> عند بناء المترجم.</p>
<p>للقيام بالتنقيح على مستوى المصدر، ترجم كل الشيفرة بالخيار <code>-g</code>؛ فهو يسجّل معلومات DWARF الخاصة بالآثار العكسية للاستثناءات، ويولّد معلومات الأسطر اللازمة للربط بين مواضع التجميع ومواضع المصدر في OCaml. ولا تترتّب على الترجمة بـ<code>-g</code> أي كلفة وقت تشغيل، لكنها تولّد ملفات تنفيذية أكبر لأنها تضمّ أقسامًا لمعلومات التنقيح. لاحظ أن مكتبات OCaml وسائر التبعيات ينبغي أن تكون مترجمة بمعلومات تنقيح DWARF، وإلا فقدت ميزات التنقيح على مستوى المصدر في تلك الأجزاء من الشيفرة.</p>
<p>تحتاج المنقّحات إلى الوصول إلى ملفات المصدر المشار إليها في معلومات DWARF. وبالنسبة إلى التبعيات، فكّر في استعمال حفظ دليل البناء الذي يوفّره opam:</p>
<pre><code class="language-text"># First tell opam to keep the source code
$ export OPAMKEEPBUILDDIR=1

# Then, reinstall the packages to force redownloading the sources
$ opam switch reinstall

# Source code for packages will appear inside the opam switch
# in a build directory. e.g. _opam/.opam-switch/build/ for a
# local switch or ~/.opam/&lt;switch_name&gt;/.opam-switch/build
</code></pre>
<p>توضّح الأقسام التالية تنقيح برامج OCaml باستعمال GDB وLLDB، وتعرض سيرورات العمل الشائعة والمخرجات المتوقّعة.</p>
<h2 id="213-استعمال-gdb">21.3 استعمال GDB</h2>
<p>هنا نمضي في تنقيح برنامج OCaml بسيط باستعمال GDB على Linux، عارضين الأوامر المستعملة والمخرجات المتوقّعة. لاحظ أن هذه الجلسة تستعمل Ubuntu 24.04 LTS على AMD64 مع OCaml 5.4.</p>
<p>تأمّل البرنامج التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* fib.ml *)</span>
<span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> fib n =
  <span class="hljs-keyword">if</span> n = <span class="hljs-number">0</span> <span class="hljs-keyword">then</span> <span class="hljs-number">0</span>
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> n = <span class="hljs-number">1</span> <span class="hljs-keyword">then</span> <span class="hljs-number">1</span>
  <span class="hljs-keyword">else</span> fib (n-<span class="hljs-number">1</span>) + fib (n-<span class="hljs-number">2</span>)

<span class="hljs-keyword">let</span> main <span class="hljs-literal">()</span> =
  <span class="hljs-keyword">let</span> r = fib <span class="hljs-number">20</span> <span class="hljs-keyword">in</span>
  <span class="hljs-type">Printf</span>.printf <span class="hljs-string">&quot;fib(20) = %d&quot;</span> r

<span class="hljs-keyword">let</span> _ = main <span class="hljs-literal">()</span>
</code></pre>
<p>ترجم هذا البرنامج بـ<code>ocamlopt</code> هكذا:</p>
<pre><code class="language-text">$ ocamlopt -g -o fib.exe fib.ml
$ ./fib.exe 20
fib(20) = 6765
</code></pre>
<p>عند تشغيله يطبع هذا البرنامج عدد فيبوناتشي العشرين. واستعمال العودية هنا ذريعة لفحص مكدّس الاستدعاءات. ابدأ جلسة GDB لهذا البرنامج:</p>
<pre><code class="language-text">$ gdb ./fib.exe
</code></pre>
<p>يمكن ضبط نقاط التوقّف إمّا بالأسماء المشوَّهة التي يولّدها المترجم أو بمزيج من اسم الملف ورقم السطر. مثلًا:</p>
<pre><code class="language-text">(gdb) break camlFib.fib_     # press tab
(gdb) break camlFib.fib_271  # 271 happens to be the unique number generated
Breakpoint 1 at 0x3cd50: file fib.ml, line 2.

(gdb) break fib.ml:7         # breakpoint for main function
Breakpoint 2 at 0x3cdc0: file fib.ml, line 7.
</code></pre>
<p>الآن يمكننا تشغيل البرنامج وطباعة أثر عكسي.</p>
<pre><code class="language-text">(gdb) run
Starting program: fib.exe
[Thread debugging using libthread_db enabled]
Using host libthread_db library &quot;/lib/x86_64-linux-gnu/libthread_db.so.1&quot;.

Breakpoint 2, camlFib.main_273 () at fib.ml:7
7  let main () =
(gdb) continue
Continuing.

Breakpoint 1, camlFib.fib_271 () at fib.ml:2
2  let rec fib n =
(gdb) backtrace
#0  camlFib.fib_270 () at fib.ml:2
#1  0x0000555555590de1 in camlFib.main_273 () at fib.ml:7
#2  0x0000555555590e86 in camlFib.entry () at fib.ml:11
#3  0x000055555558eaa7 in caml_program ()
#4  &lt;signal handler called&gt;
#5  0x00005555555de126 in caml_startup_common (pooling=&lt;optimised out&gt;, argv=0x7fffffffe3f8)
    at runtime/startup_nat.c:132
#6  caml_startup_common (argv=0x7fffffffe3f8, pooling=&lt;optimised out&gt;) at runtime/startup_nat.c:88
#7  0x00005555555de19f in caml_startup_exn (argv=&lt;optimised out&gt;) at runtime/startup_nat.c:139
#8  caml_startup (argv=&lt;optimised out&gt;) at runtime/startup_nat.c:144
#9  caml_main (argv=&lt;optimised out&gt;) at runtime/startup_nat.c:151
#10 0x000055555558e892 in main (argc=&lt;optimised out&gt;, argv=&lt;optimised out&gt;) at runtime/main.c:37
</code></pre>
<p>هناك أيضًا دعم أساسي لطباعة قيم OCaml باستعمال برمجة Python المدمجة في GDB وملف <a href="https://github.com/ocaml/ocaml/blob/trunk/tools/gdb.py">tools/gdb.py</a>. فإمّا أن تجد ذلك الملف في تبديل opam الخاص بك، مثل <code>/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0/tools/gdb.py</code>، أو تنزّله من GitHub. ثم حمّله في GDB باستعمال ‘source‘.</p>
<pre><code class="language-text">(gdb) source ~/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0/tools/gdb.py
OCaml support module loaded. Values of type &#x27;value&#x27; will now
print as OCaml values, there is a $Array() convenience function,
and an &#x27;ocaml&#x27; command is available for heap exploration
(see &#x27;help ocaml&#x27; for more information).

(gdb) p (value)$rax
$1 = caml:14
</code></pre>
<p>يمكننا أيضًا طباعة أنواع أخرى من قيم OCaml. ولتوضيح ذلك، تأمّل البرنامج التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* test_blocks.ml *)</span>
<span class="hljs-keyword">type</span> t = {s : <span class="hljs-built_in">string</span>; i : <span class="hljs-built_in">int</span>}

<span class="hljs-keyword">let</span> main a b =
  print_endline <span class="hljs-string">&quot;Hello, world!&quot;</span>;
  print_endline a;
  print_endline b.s

<span class="hljs-keyword">let</span> _ = main <span class="hljs-string">&quot;foo&quot;</span> {s = <span class="hljs-string">&quot;bar&quot;</span>; i = <span class="hljs-number">42</span>}
</code></pre>
<p>ترجم هذا البرنامج بـ<code>ocamlopt</code> وحمّله في GDB:</p>
<pre><code class="language-text">$ ocamlopt -g -o test_blocks.exe test_blocks.ml
$ gdb ./test_blocks.exe
(gdb) source ~/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0/tools/gdb.py
...
(gdb) break camlTest_blocks.main_273
Breakpoint 1 at 0x16db0: file test_blocks.ml, line 4.
(gdb) run
...
Breakpoint 1, camlTest_blocks.main_273 () at test_blocks.ml:4
4  let main a b =
(gdb) p (value)$rax      # Print out the first argument to main
$1 = caml(-):&#x27;foo&#x27;&lt;3&gt;
(gdb) p (value)$rbx      # Then print the second argument
$2 = caml(-):(&#x27;bar&#x27;, 42) = {caml(-):&#x27;bar&#x27;&lt;3&gt;, caml:42}
</code></pre>
<p>لاحظ استعمال أسماء سجلات AMD64: <code>$rax</code>
و<code>$rbx</code> للوصول إلى الوسيط الأول والوسيط الثاني للدالة.
وهذا يتبع اصطلاح النداء في OCaml على AMD64: تحمل السجلات
من <code>$rax</code>
إلى <code>$r13</code> وسائط دوال OCaml،
ويحمل <code>$rax</code> نتائج الدوال.
راجع ملف <code>asmcomp/&lt;ARCH&gt;/proc.ml</code> الخاص بمعمارية معيّنة لمزيد من المعلومات عن اصطلاحات نداء OCaml.</p>
<p>قد لا تضمّ الملفات التنفيذية معلومات دقيقة عن موضع الشيفرة المصدرية المستعملة في بنائها لأسباب متنوّعة. ويظهر ذلك في GDB كغياب لقوائم المصدر مع رسالة تحذير ‘No such file or directory‘. وفي هذه الحالة يدعم GDB طرقًا مختلفة لإخباره أين يجد المصادر. راجع وثائق <a href="https://sourceware.org/gdb/current/onlinedocs/gdb.html/Source-Path.html">Source Path</a> في GDB للتفاصيل الكاملة.</p>
<p>عائدين إلى <code>fib.exe</code> من قبل، نجد أن ملف المصدر قد نُسخ إلى <code>/tmp/fib.ml</code> حيث لن يجده GDB. وهنا نستعمل أمر GDB المسمّى <code>directory</code> لنخبر GDB أين يجد ملفات مصدر <code>fib.ml</code> ومكتبة OCaml القياسية.</p>
<pre><code class="language-text">$ gdb ./fib.exe
...
(gdb) break camlFib.main_276
(gdb) break camlStdlib__Printf.fprintf_431
(gdb) run
...
Breakpoint 1, 0x00005555555921b0 in camlFib.main () at fib.ml:7
warning: 9  fib.ml: No such file or directory
# Update directories to search for source files for fib.ml and OCaml
(gdb) directory /tmp ~/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0/
Source directories searched: /tmp:/home/user/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0:$cdir:$cwd
(gdb) list
4    else if n = 1 then 1
5    else fib (n-1) + fib (n-2)
6
7  let main () =
8    let r = fib 20 in
9    Printf.printf &quot;fib(20) = %d&quot; r
10
11  let _ = main ()
</code></pre>
<h3 id="2131-أوامر-gdb">21.3.1 أوامر GDB</h3>
<p>ملخّص أوامر GDB المهمة الخاصة بـ OCaml:</p>
<p><strong><code>break</code></strong> <em>locspec</em></p>
<p>يضبط نقطة توقّف عند جميع مواضع الشيفرة المطابقة لـ<em>locspec</em>، مثلًا باستعمال الأسماء المشوَّهة لـ OCaml أو بتحديد رقم السطر في ملف المصدر بصيغة <code>filename:linenum</code>.</p>
<p><strong><code>backtrace</code></strong></p>
<p>يطبع الأثر العكسي للمكدّس كاملًا. ويضمّ ذلك إشارات إلى مصادر OCaml تحدّد أيّ إطار مكدّس يقابل أيّ موضع مصدر، مثل <code>fib.ml:4</code>.</p>
<p><strong><code>disassemble</code></strong> <em>addresses</em></p>
<p>يعرض مجالًا من <em>العناوين</em> على هيئة تعليمات آلة. ويُستعمل عادةً مع الأسماء المشوَّهة لـ OCaml لعرض التجميع الخاص بدالة.</p>
<p><strong><code>info</code></strong> <em>frame</em></p>
<p>يطبع هذا الأمر وصفًا مفصّلًا لإطار المكدّس المحدَّد.</p>
<p><strong><code>list</code></strong> <em>linenum</em></p>
<p>يطبع أسطرًا حول رقم السطر <em>linenum</em> في ملف المصدر الحالي. ويطبع ذلك الشيفرة المصدرية لـ OCaml وزمن تشغيل OCaml المكتوب بلغة C.</p>
<p><strong><code>directory</code></strong> <em>dirname</em></p>
<p>يضيف الدليل <em>dirname</em> إلى مقدّمة مسار المصادر؛ ويمكن تقديم عدّة أسماء أدلّة مفصولة بـ<code>:</code> . وهذا مفيد عندما تتغيّر الأدلّة بين الترجمة وجلسة التنقيح.</p>
<p>انظر وثائق <a href="https://sourceware.org/gdb/current/onlinedocs/gdb.html/">Debugging with GDB</a> لمزيد من التفاصيل. وبوجه عام تعمل الميزات الموصوفة أعلاه مع OCaml، وإذا فشلت يرتدّ GDB إلى تنقيح لغة التجميع. ويُتوقَّع أن يعمل GDB على جميع معماريات Linux المدعومة.</p>
<h2 id="214-استعمال-lldb">21.4 استعمال LLDB</h2>
<p>هنا سنمضي في تنقيح مثال fib السابق باستعمال LLDB على Linux. ابدأ جلسة LLDB باستعمال <code>fib.exe</code> من قبل. لاحظ أن هذه الجلسة تستعمل Ubuntu 24.04 LTS على ARM64 مع OCaml 5.4.</p>
<pre><code class="language-text">$ lldb ./fib.exe
Current executable set to &#x27;fib.exe&#x27; (aarch64).
(lldb)
</code></pre>
<p>يمكن ضبط نقاط التوقّف بالأسماء المشوَّهة لـ OCaml أو بمزيج من اسم الملف ورقم السطر. مثلًا:</p>
<pre><code class="language-text">(lldb) breakpoint set -n camlFib.fib        # press tab for autocomplete
(lldb) breakpoint set -n camlFib.fib_271
Breakpoint 2: where = fib.exe\`camlFib.fib_271 + 80, address = 0x0000000000052360
(lldb) breakpoint set -f fib.ml -l 7         # breakpoint for line 7 in fib.ml
Breakpoint 2: where = fib.exe\`camlFib.main_272, address = 0x0000000000051088
(lldb)
</code></pre>
<p>الآن يمكننا تشغيل البرنامج.</p>
<pre><code class="language-text">(lldb) run
...
Process 11391 stopped
* thread #1, name = &#x27;fib.exe&#x27;, stop reason = breakpoint 2.1
    frame #0: 0x0000aaaaaaaf1088 fib.exe\`camlFib.main_272 at fib.ml:7
   4       else if n = 1 then 1
   5       else fib (n-1) + fib (n-2)
   6
-&gt; 7     let main () =
   8       let r = fib 20 in
   9       Printf.printf &quot;fib(20) = %d&quot; r
   10
...
(lldb) continue
Process 28032 resuming
Process 28032 stopped
* thread #1, name = &#x27;fib.exe&#x27;, stop reason = breakpoint 2.1
    frame #0: 0x0000aaaaaaaf2360 fib.exe\`camlFib.fib_271 at fib.ml:5
   2     let rec fib n =
   3       if n = 0 then 0
   4       else if n = 1 then 1
-&gt; 5       else fib (n-1) + fib (n-2)
   6
   7     let main () =
   8       let r = fib 20 in

(lldb) bt               # Print a backtrace
* thread #1, name = &#x27;fib.exe&#x27;, stop reason = breakpoint 2.1
  * frame #0: 0x0000aaaaaaaf2360 fib.exe\`camlFib.fib_271 at fib.ml:5
    frame #1: 0x0000aaaaaaaf23d0 fib.exe\`camlFib.main_273 at fib.ml:8
    frame #2: 0x0000aaaaaaaf2490 fib.exe\`camlFib.entry at fib.ml:11
    frame #3: 0x0000aaaaaaaef748 fib.exe\`caml_program + 480
    frame #4: 0x0000aaaaaab4ab90 fib.exe\`caml_start_program + 132
    frame #5: 0x0000aaaaaab4a5f8 fib.exe\`caml_startup_common [inlined] caml_startup_common(pooling=-1430712272, argv=0x0000000000000010) at startup_nat.c:127:9
    frame #6: 0x0000aaaaaab4a528 fib.exe\`caml_startup_common(argv=0x0000000000000010, pooling=-1430712272) at startup_nat.c:86:7
    frame #7: 0x0000aaaaaab4a670 fib.exe\`caml_main [inlined] caml_startup_exn(argv=&lt;unavailable&gt;) at startup_nat.c:134:10
    frame #8: 0x0000aaaaaab4a66c fib.exe\`caml_main [inlined] caml_startup(argv=&lt;unavailable&gt;) at startup_nat.c:139:15
    frame #9: 0x0000aaaaaab4a66c fib.exe\`caml_main(argv=&lt;unavailable&gt;) at startup_nat.c:146:3
    frame #10: 0x0000aaaaaaaef3d0 fib.exe\`main(argc=&lt;unavailable&gt;, argv=&lt;unavailable&gt;) at main.c:37:3
    frame #11: 0x0000fffff7d784c4 libc.so.6\`__libc_start_call_main(main=(fib.exe\`main at main.c:31:1), argc=1, argv=0x0000fffffffffc98) at libc_start_call_main.h:58:16
    frame #12: 0x0000fffff7d78598 libc.so.6\`__libc_start_main_impl(main=0x0000aaaaaaba0e68, argc=1, argv=0x0000fffffffffc98, init=&lt;unavailable&gt;, fini=&lt;unavailable&gt;, rtld_fini=&lt;unavailable&gt;, stack_end=&lt;unavailable&gt;) at libc-start.c:360:3
    frame #13: 0x0000aaaaaaaef470 fib.exe\`_start + 48
</code></pre>
<p>هناك دعم أساسي لطباعة قيم OCaml باستعمال برمجة Python المدمجة في LLDB وملف <a href="https://github.com/ocaml/ocaml/blob/trunk/tools/lldb.py">tools/lldb.py</a>. فإمّا أن تجد ذلك الملف في تبديل opam الخاص بك، مثل <code>/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0/tools/lldb.py</code>، أو تنزّله من GitHub. ثم حمّله في LLDB باستعمال <code>command</code>.</p>
<pre><code class="language-text">(lldb) command script import ~/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0/tools/lldb.py
OCaml support module loaded. Values of type &#x27;value&#x27; will now
print as OCaml values, and an &#x27;ocaml&#x27; command is available for
heap exploration (see &#x27;help ocaml&#x27; for more information).
(lldb)  p (value)$x0
(value) 41 caml:20
(lldb)
</code></pre>
<p>ملاحظة: نستعمل أعلاه جهاز Linux بمعمارية ARM64، لذا يُمرَّر وسيطنا الأول في السجل الأول <code>x0</code>.</p>
<p>يمكننا أيضًا طباعة كل أنواع قيم OCaml. وبإعادة استعمال برنامج <code>test_blocks.exe</code>، ابدأ جلسة LLDB جديدة:</p>
<pre><code class="language-text">$ lldb ./test_blocks.exe
...
(lldb) command script import ~/.opam/5.4.0/.opam-switch/sources/ocaml-compiler.5.4.0/tools/gdb.py
OCaml support module loaded. Values of type &#x27;value&#x27; will now
print as OCaml values, and an &#x27;ocaml&#x27; command is available for
heap exploration (see &#x27;help ocaml&#x27; for more information).
(lldb) breakpoint set -n camlTest_blocks.main_274
Breakpoint 1: where = test_blocks.exe\`camlTest_blocks.main_274 + 44, address = 0x000000000001a6fc
(lldb) run
...
Process 15536 stopped
* thread #1, name = &#x27;test_blocks.exe&#x27;, stop reason = breakpoint 1.1
    frame #0: 0x0000aaaaaaaba6fc test_blocks.exe\`camlTest_blocks.main_274 at test_blocks.ml:5
   2     type t = {s : string; i : int}
   3
   4     let main a b =
-&gt; 5       print_endline &quot;Hello, world!&quot;;
   6       print_endline a;
   7       print_endline b.s
   8
...
(lldb) p (value)$x0
(value) 187649984957416 caml(-):&#x27;Hello, world!&#x27;&lt;13&gt;
(lldb) p (value)$x1
(value) 187649984957360 caml(-):(&#x27;bar&#x27;, 42)
</code></pre>
<p>هنا نستعمل سجلات ARM64 المسمّاة <code>$x0</code>
و<code>$x1</code> للوصول إلى الوسيط الأول والوسيط الثاني للدالة.
وهذا يتبع اصطلاح النداء في OCaml على ARM64: تحمل السجلات
من <code>$x0</code>
إلى <code>$x15</code> وسائط دوال OCaml.
راجع ملف <code>asmcomp/&lt;ARCH&gt;/proc.ml</code> الخاص بمعمارية معيّنة لمزيد من المعلومات عن اصطلاحات نداء OCaml.</p>
<p>يدعم LLDB ميزة لتحديد كيفية إيجاد المصادر. ففي جلسة LLDB، يعيد الأمر <code>settings set target.source-map /tmp/build /my/src/path</code> ربط دليل البناء بدليل مصادر، ويدعم عدّة أزواج من <code>from to</code>.</p>
<p>مثلًا، بنسخ ملف المصدر <code>fib.ml</code> إلى <code>/tmp/fib.ml</code> واستعمال تبديل opam لـ OCaml 5.4.</p>
<pre><code class="language-text">$ lldb ./fib.exe
(lldb) target create &quot;./fib.exe&quot;
Current executable set to &#x27;/home/user/fib.exe&#x27; (x86_64).
(lldb) br s -n camlStdlib__Printf.fprintf_431
Breakpoint 1: where = fib.exe\`camlStdlib__Printf.fprintf_431 + 16, address = 0x000000000007ddb0
(lldb) br s -f fib.ml -l 9
Breakpoint 2: where = fib.exe\`camlFib.main_276 + 66, address = 0x00000000000482c2
(lldb) run
Process 95112 launched: &#x27;/home/user/fib.exe&#x27; (x86_64)
Process 95112 stopped
* thread #1, name = &#x27;fib.exe&#x27;, stop reason = breakpoint 1.1
    frame #0: 0x00005555555d1db0 fib.exe\`camlStdlib__Printf.fprintf_431 at printf.ml:27:21
# No source listing displayed for printf.ml file.
$ settings set target.source-map /home/user/ /tmp /home/user/.opam/5.4.0/.opam-switch/build/ocaml-variants.5.4.0/ /home/user/.opam/5.4.0/.opam-switch/sources/ocaml-variants.5.4.0/
</code></pre>
<h3 id="2141-أوامر-lldb">21.4.1 أوامر LLDB</h3>
<p>ملخّص أوامر LLDB المهمة الخاصة بـ OCaml:</p>
<p><strong><code>breakpoint set -n</code></strong> <em>symbol</em></p>
<p>يضبط نقطة توقّف عند موضع الشيفرة المطابق لـ<em>symbol</em>، مثلًا باستعمال الاسم المشوَّه لـ OCaml.</p>
<p><strong><code>breakpoint set -f</code></strong> <em>filename</em> <strong><code>-l</code></strong> <em>linenum</em></p>
<p>يضبط نقطة توقّف عند السطر <em>linenum</em> في <em>filename</em>، مثل <code>fib.ml:7</code>.</p>
<p><strong><code>breakpoint set -a</code></strong> <em>address</em></p>
<p>يضبط نقطة توقّف عند <em>عنوان</em> ذاكرة معيّن.</p>
<p><strong><code>backtrace</code></strong></p>
<p>يطبع الأثر العكسي للمكدّس كاملًا. ويضمّ ذلك إشارات إلى مصادر OCaml تحدّد أيّ إطار مكدّس يقابل أيّ موضع مصدر.</p>
<p><strong><code>disassemble</code></strong></p>
<p>يفكّ تجميع التعليمات المحدَّدة في الهدف الحالي. ومن خياراته المفيدة <code>-n</code> مع الاسم المشوَّه لـ OCaml لفكّ تجميع دالة معيّنة، و<code>-a</code> مع عنوان لفكّ تجميع الدالة التي تضمّ ذلك العنوان.</p>
<p><strong><code>frame info</code></strong></p>
<p>يسرد معلومات عن إطار المكدّس الحالي في الخيط الحالي.</p>
<p><strong><code>source</code></strong></p>
<p>أوامر لفحص الشيفرة المصدرية التي تصفها معلومات التنقيح لعملية الهدف الحالي.</p>
<p><strong><code>settings set target.source-map</code></strong> <em>from to</em></p>
<p>يعيد ربط مسارات المصدر <em>from</em> بمسار مصدر جديد يُستعمل عند تحديد موقع الشيفرة المصدرية لعرضها إلى جانب البرنامج المنقَّح. وتُدعم عدّة أزواج من تعيينات <em>from</em> <em>to</em>.</p>
<p>وبوجه عام تعمل الميزات الموصوفة أعلاه مع OCaml، وإذا فشلت يرتدّ LLDB إلى تنقيح لغة التجميع. ويُتوقَّع أن يعمل LLDB على جميع معماريات Linux المدعومة.</p>
`,c={book:e,chapter:a,chapterTitle:n,slug:t,title:l,headings:o,html:s};export{e as book,a as chapter,n as chapterTitle,c as default,o as headings,s as html,t as slug,l as title};
