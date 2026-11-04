const s="ocaml-manual",a="ch27",n="تحويل البرنامج «ذَيلِي مع الباني»",l="index",p="تحويل البرنامج «ذَيلِي مع الباني»",e=[{depth:2,id:"271-إزالة-الالتباس",text:"27.1 إزالة الالتباس"},{depth:2,id:"272-خطر-الخروج-من-ذيلي-مع-الباني",text:"27.2 خطر: الخروج من «ذَيلِي مع الباني»"},{depth:2,id:"273-تفاصيل-التحويل",text:"27.3 تفاصيل التحويل"},{depth:2,id:"274-القيود-الحالية",text:"27.4 القيود الحالية"}],c=`<h1>الفصل 27: تحويل البرنامج «ذَيلِي مع الباني»</h1>
<p><em>(أُضيف في OCaml 4.14)</em></p>
<p>ملاحظة: تُعدّ هذه الميزة تجريبية، وقد تتطوّر واجهتها، بناءً على ملاحظات المستخدمين، في الإصدارات القليلة القادمة من اللغة.</p>
<p>لنتأمّل هذا التعريف الطبيعي للدالة <code>List.map</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map f l =
  <span class="hljs-keyword">match</span> l <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | x :: xs -&gt;
    <span class="hljs-keyword">let</span> y = f x <span class="hljs-keyword">in</span>
    y :: map f xs
</code></pre>
<p>من القيود المعروفة لهذا التعريف أن النداء العودي <code>map f xs</code> ليس في موضع <em>ذَيلِي</em>. يحتاج زمن التشغيل إلى أن يتذكّر متابعة التنفيذ بـ <code>y :: r</code> بعد أن يعيد النداء قيمة <code>r</code>، ولذلك تستهلك هذه الدالة قدرًا من مساحة مكدّس الاستدعاءات عند كل نداء عودي. استهلاك المكدّس في <code>map f li</code> يتناسب طرديًا مع طول <code>li</code>. وهذا مسألة صحّة في القوائم الكبيرة على الأنظمة المضبوطة بمساحة مكدّس محدودة، وينتهي بالأستثناء المخيف <code>Stack_overflow</code>.</p>
<pre><code class="language-ocaml"># <span class="hljs-keyword">let</span> with_stack_limit stack_limit f =
     <span class="hljs-keyword">let</span> old_gc_settings = <span class="hljs-type">Gc</span>.get <span class="hljs-literal">()</span> <span class="hljs-keyword">in</span>
     <span class="hljs-type">Gc</span>.set { old_gc_settings <span class="hljs-keyword">with</span> stack_limit };
     <span class="hljs-type">Fun</span>.protect ~finally:(<span class="hljs-keyword">fun</span> <span class="hljs-literal">()</span> -&gt; <span class="hljs-type">Gc</span>.set old_gc_settings) f
   ;;

<span class="hljs-keyword">val</span> with_stack_limit : <span class="hljs-built_in">int</span> -&gt; (<span class="hljs-built_in">unit</span> -&gt; <span class="hljs-symbol">&#x27;a</span>) -&gt; <span class="hljs-symbol">&#x27;a</span> = &lt;<span class="hljs-keyword">fun</span>&gt;

# with_stack_limit <span class="hljs-number">20_000</span> (<span class="hljs-keyword">fun</span> <span class="hljs-literal">()</span> -&gt;
    <span class="hljs-type">List</span>.length (map <span class="hljs-type">Fun</span>.id (<span class="hljs-type">List</span>.init <span class="hljs-number">1_000_000</span> <span class="hljs-type">Fun</span>.id))
  );;

<span class="hljs-type">Stack</span> overflow during evaluation (looping recursion?).
</code></pre>
<p>في هذا التعريف من <code>map</code>، يقع النداء العودي في موضع ليس موضعًا <em>ذَيلِيًّا</em> في البرنامج، بل داخل تطبيق باني نوع بيانات هو نفسه في موضع <em>ذَيلِي</em>. نقول إن تلك المواضع، المكوّنة من مواضع ذَيلية وتطبيقات بواني، مواضع <em>ذَيلِيَة مع الباني</em> (TMC)، ونكتب أحيانًا <em>ذَيلِي مع الباني</em> اختصارًا.</p>
<p>يمكن إعادة كتابة البرامج بحيث تصير مواضع «ذَيلِي مع الباني» مواضع ذَيلية؛ وبعد هذا التحويل يصبح تعريف <code>map</code> أعلاه <em>عوديًا ذَيلِيًّا</em>، بمعنى أنه لا يستهلك إلا قدرًا ثابتًا من مساحة المكدّس. ينفّذ مترجم OCaml هذا التحويل عند الطلب، باستعمال السمة <code>[@tail_mod_cons]</code> أو <code>[@ocaml.tail_mod_cons]</code> على الدالة المطلوب تحويلها.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map f l =
  <span class="hljs-keyword">match</span> l <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | x :: xs -&gt;
    <span class="hljs-keyword">let</span> y = f x <span class="hljs-keyword">in</span>
    y :: map f xs
</code></pre>
<pre><code class="language-ocaml"># <span class="hljs-type">List</span>.length (map <span class="hljs-type">Fun</span>.id (<span class="hljs-type">List</span>.init <span class="hljs-number">1_000_000</span> <span class="hljs-type">Fun</span>.id));;

- : <span class="hljs-built_in">int</span> = <span class="hljs-number">1000000</span>
</code></pre>
<p>لا يحسّن هذا التحويل إلا النداءات الواقعة في موضع «ذَيلِي مع الباني»، ولا يحسّن النداءات العودية التي لا تنتمي إلى هذه الشريحة:</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* does *not* work: addition is not a data constructor *)</span>
<span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> length l =
  <span class="hljs-keyword">match</span> l <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-number">0</span>
  | _ :: xs -&gt; <span class="hljs-number">1</span> + length xs

<span class="hljs-type">Warning</span> <span class="hljs-number">71</span> [unused-tmc-attribute]: <span class="hljs-type">This</span> <span class="hljs-keyword">function</span> is marked @tail_mod_cons
  but is never applied <span class="hljs-keyword">in</span> <span class="hljs-type">TMC</span> position.
</code></pre>
<p>من الممكن طبعًا استعمال تحويل <code>[@tail_mod_cons]</code> على دوال تحتوي بعض النداءات العودية في موضع «ذَيلِي مع الباني» وبعضها في مواضع أخرى اعتباطية. النداءات الذَيلية ونداءات «ذَيلِي مع الباني» وحدها هي التي ستحدث في مساحة مكدّس ثابتة.</p>
<h5>التصميم العام</h5>
<p>تُقدّم هذه الميزة بوصفها تحويلًا صريحًا للبرنامج، لا تحسينًا ضمنيًا. وهي موجَّهة بالتعليقات: يُتوقَّع من المستخدم أن يعبّر عن قصده بإضافة تعليقات في البرنامج باستعمال السمات، وسيُطلب منه ذلك في كل حالة ملتبسة.</p>
<p>نتوقّع أن يستعملها أساسًا مستخدمو OCaml المتقدّمون ممن يحتاجون إلى ضمانات بشأن سلوك استهلاك المكدّس في برامجهم. وتوصيتنا أن تُستعمل السمة <code>[@tailcall]</code> على كل مواضع الاستدعاء التي يجب ألا تستهلك أي مساحة مكدّس. وتوسّع <code>[@tail_mod_cons]</code> مجموعة الدوال التي يمكن تعليق نداءاتها لتكون نداءات ذَيلية، ف تساعد على إرساء ضمانات استهلاك المكدّس في حالات أكثر.</p>
<h5>الأداء</h5>
<p>من الطرق المعيارية للحصول على نسخة عودية ذَيلِيَّة من <code>List.map</code> استعمال مركم لتجميع عناصر الخرج ثم قلبه في نهاية العبور.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map f l = map_aux f <span class="hljs-literal">[]</span> l
<span class="hljs-keyword">and</span> map_aux f acc l =
  <span class="hljs-keyword">match</span> l <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-type">List</span>.rev acc
  | x :: xs -&gt;
    <span class="hljs-keyword">let</span> y = f x <span class="hljs-keyword">in</span>
    map_aux f (y :: acc) xs
</code></pre>
<p>هذه النسخة عودية ذَيلِيَّة، لكنها أبطأ بدرجة قابلة للقياس من النسخة البسيطة غير الذَيلِيَّة. في المقابل، يوفّر تحويل «ذَيلِي مع الباني» تنفيذًا أداؤه مقارب لأداء النسخة الأصلية، حتى في المدخلات الصغيرة.</p>
<h5>ترتيب التقييم</h5>
<p>احذر أن لتحويل «ذَيلِي مع الباني» أثرًا على ترتيب التقييم: فوسيطة الباني التي تُحوَّل إلى موضع ذَيلِي ستُقيَّم دائمًا في الآخر. تأمّل المثال التالي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> two_headed_list =
  | <span class="hljs-type">Nil</span>
  | <span class="hljs-type">Consnoc</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> * <span class="hljs-symbol">&#x27;a</span> two_headed_list * <span class="hljs-symbol">&#x27;a</span>

<span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map f = <span class="hljs-keyword">function</span>
  | <span class="hljs-type">Nil</span> -&gt; <span class="hljs-type">Nil</span>
  | <span class="hljs-type">Consnoc</span> (front, body, rear) -&gt;
    <span class="hljs-type">Consnoc</span> (f front, map f body, f rear)
</code></pre>
<p>بسبب تحويل <code>[@tail_mod_cons]</code>، سيُقيَّم النداءان <code>f front</code> و<code>f rear</code> قبل <code>map f body</code>. وهذا على الأرجح مختلف عن ترتيب التقييم في النسخة غير المعلَّقة. (ترتيب تقييم وسائط البواني غير محدَّد في OCaml، لكن كثيرًا من التنفيذات تستعمل عادةً الترتيب من اليسار إلى اليمين أو من اليمين إلى اليسار.)</p>
<p>هذا الأثر على ترتيب التقييم أحد أسباب وجوب أن يطلب المستخدم تحويل «ذَيلِي مع الباني» صراحةً، بدلًا من تطبيقه بوصفه تحسينًا تلقائيًا.</p>
<h5>لماذا «ذَيلِي مع الباني»؟</h5>
<p>يمكن لتحويلات أخرى للبرامج، ولا سيّما التحويل إلى نمط تمرير الاستمرارات (CPS)، أن تجعل جميع الدوال عودية ذَيلِيَّة، بدلًا من استهداف شريحة صغيرة فقط. وفيما يلي بعض أسباب توفير دعم مدمج للتحويل الأقل عمومية «ذَيلِي مع الباني»:</p>
<ul>
<li>
<p>يحافظ تحويل «ذَيلِي مع الباني» على أداء النسخة الأصلية غير الذَيلِيَّة، أما التحويل إلى نمط تمرير الاستمرارات فيكلّف قدرًا ثابتًا قابلاً للقياس.</p>
</li>
<li>
<p>لا يمكن التعبير عن تحويل «ذَيلِي مع الباني» بوصفه تحويلاً من المصدر إلى المصدر في برامج OCaml، لأنه يعتمد على حالة قابلة للتغيير بطريقة غير آمنة من حيث الأنواع. في المقابل، يمكن كتابة نسخ نمط تمرير الاستمرارات يدويًا، ربما بترميز مونادي مناسب.</p>
</li>
</ul>
<h5>ملاحظة: حجم مكدّس الاستدعاءات في OCaml</h5>
<p>في OCaml 4.x وما قبلها، تحترم برامج الشيفرة البايتية إعداد المعامل <code>stack_limit</code> في زمن التشغيل (كما يُضبط بـ <code>Gc.set</code> في المثال أعلاه)، أو الإعداد <code>l</code> في المتغيّر <code>OCAMLRUNPARAM</code>. أما البرامج الأصلية فتتجاهل هذه الإعدادات ولا تحترم إلا حدّ المكدّس الأصلي في نظام التشغيل، كما يُضبط بـ <code>ulimit</code> في أنظمة Unix. ويعمل معظم أنظمة التشغيل افتراضيًا بحدّ حجم مكدّس منخفض نسبيًا، لذا فإن تجاوز المكدّس في الدوال غير الذَيلِيَّة خلل برمجي شائع.</p>
<p>وابتداءً من OCaml 5.0، لم تعد الشيفرة الأصلية تستعمل مكدّس النظام الأصلي لنداءات دوال OCaml، فهي لم تعد تتأثّر بحجم مكدّس نظام التشغيل الأصلي؛ ويحترم كل من البرامج الأصلية والشيفرة البايتية حدّ زمن تشغيل OCaml نفسه. وهذا الحدّ مضبوط افتراضيًا على قيمة أعلى بكثير من مكدّسات معظم أنظمة التشغيل الأصلية، بحدّ لا يقلّ عن 512 ميبيبايت، لذا ينبغي أن يصير تجاوز المكدّس أقلّ شيوعًا بكثير في الممارسة. ومع ذلك، يبقى هناك حدّ للمكدّس افتراضيًا، لأنه مفيد في اكتشاف أخطاء الدوال العودية غير الذَيلِيَّة الحلقية سريعًا. فبلا حدّ للمكدّس، على المرء أن ينتظر استهلاك المكدّس للذاكرة كلها حتى ينهار البرنامج، وقد يستغرق ذلك وقتًا طويلًا ويجعل النظام غير متجاوب.</p>
<p>ومعنى ذلك أن تحويل «ذَيلِي مع الباني» أقل أهمية في OCaml 5: فهو يحسّن الأداء بشكل ملحوظ في بعض الحالات، لكنه ليس ضروريًا للصحّة الأساسية في معظم حالات الاستعمال.</p>
<h2 id="271-إزالة-الالتباس">27.1 إزالة الالتباس</h2>
<p>قد يحدث أن تكون عدّة وسائط من وسائط باني ما نداءات عودية لدالة «ذَيلِي مع الباني». ولا يمكن للتحويل أن يحوّل إلا واحدًا من هذه النداءات إلى نداء ذَيلِي. ولن يتّخذ المترجم خيارًا ضمنيًا، بل سيطلب من المستخدم إزالة الالتباس صراحةً.</p>
<p>تأمّل هذا النوع من التعابير النحوية (بافتراض وجود نوع سابق <code>var</code> لمتغيّرات التعابير):</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> var <span class="hljs-comment">(* some pre-existing type of variables *)</span>

<span class="hljs-keyword">type</span> exp =
  | <span class="hljs-type">Var</span> <span class="hljs-keyword">of</span> var
  | <span class="hljs-type">Let</span> <span class="hljs-keyword">of</span> binding * exp
<span class="hljs-keyword">and</span> binding = var * exp
</code></pre>
<p>تأمّل دالة <code>map</code> على المتغيّرات. التعريف المباشر يحتوي نداءين عوديين داخل وسائط الباني <code>Let</code>، فيُرفض بوصفه ملتبسًا.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map_vars f exp =
  <span class="hljs-keyword">match</span> exp <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Var</span> v -&gt; <span class="hljs-type">Var</span> (f v)
  | <span class="hljs-type">Let</span> ((v, def), body) -&gt;
    <span class="hljs-type">Let</span> ((f v, map_vars f def), map_vars f body)

<span class="hljs-type">Error</span>: [@tail_mod_cons]: this constructor application may be <span class="hljs-type">TMC</span>-transformed
       <span class="hljs-keyword">in</span> several different ways. <span class="hljs-type">Please</span> disambiguate by adding an explicit
       [@tailcall] attribute <span class="hljs-keyword">to</span> the call that should be made tail-recursive,
       <span class="hljs-keyword">or</span> a [@tailcall <span class="hljs-literal">false</span>] attribute on calls that should not be
       transformed.
  <span class="hljs-type">This</span> call could be annotated.
  <span class="hljs-type">This</span> call could be annotated.
</code></pre>
<p>لإزالة الالتباس، ينبغي للمستخدم أن يضيف السمة <code>[@tailcall]</code> إلى النداء العودي الذي يجب تحويله إلى موضع ذَيلِي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map_vars f exp =
  <span class="hljs-keyword">match</span> exp <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Var</span> v -&gt; <span class="hljs-type">Var</span> (f v)
  | <span class="hljs-type">Let</span> ((v, def), body) -&gt;
    <span class="hljs-type">Let</span> ((f v, map_vars f def), (map_vars[@tailcall]) f body)
</code></pre>
<p>اعلم أن الدالة الناتجة <em>ليست</em> عودية ذَيلِيَّة، فالنداء العودي على <code>def</code> سيستهلك مساحة مكدّس. غير أن أشجار التعابير تميل إلى الانحدار يمينًا (كثير من <code>Let</code> متتالية، لا متداخلة بعضها في بعض)، لذا فإن وضع النداء على <code>body</code> في موضع ذَيلِي تحسين مثير للاهتمام على التعريف الساذج: فهو يعطي استهلاكًا محدودًا لمساحة المكدّس إن افترضنا حدًّا لعمق تداخل بنى <code>Let</code>.</p>
<p>وسيظهر خطأ أيضًا عند استعمال تعليقات متعارضة، تطلب وضع وسيطتين من وسائط الباني في موضع ذَيلِي:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map_vars f exp =
  <span class="hljs-keyword">match</span> exp <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Var</span> v -&gt; <span class="hljs-type">Var</span> (f v)
  | <span class="hljs-type">Let</span> ((v, def), body) -&gt;
    <span class="hljs-type">Let</span> ((f v, (map_vars[@tailcall]) f def), (map_vars[@tailcall]) f body)

<span class="hljs-type">Error</span>: [@tail_mod_cons]: this constructor application may be <span class="hljs-type">TMC</span>-transformed
       <span class="hljs-keyword">in</span> several different ways. <span class="hljs-type">Only</span> one <span class="hljs-keyword">of</span> the arguments may become a <span class="hljs-type">TMC</span>
       call, but several arguments contain calls that are explicitly marked
       <span class="hljs-keyword">as</span> tail-recursive. <span class="hljs-type">Please</span> fix the conflict by reviewing <span class="hljs-keyword">and</span> fixing the
       conflicting annotations.
  <span class="hljs-type">This</span> call is explicitly annotated.
  <span class="hljs-type">This</span> call is explicitly annotated.
</code></pre>
<h2 id="272-خطر-الخروج-من-ذيلي-مع-الباني">27.2 خطر: الخروج من «ذَيلِي مع الباني»</h2>
<p>بسبب طبيعة تحويل «ذَيلِي مع الباني» (انظر القسم 27.3 لعرض التحويل):</p>
<ul>
<li>
<p>النداءات من دالة «ذَيلِي مع الباني» إلى دالة أخرى «ذَيلِي مع الباني» مصرَّحة في مجموعة الربط العودية نفسها تُحوَّل إلى نداءات ذَيلية، بمجرّد أن تقع في موضع ذَيلِي أو موضع «ذَيلِي مع الباني» في الدالة المصدرية.</p>
</li>
<li>
<p>النداءات من دالة <em>غير</em> معلَّقة بـ «ذَيلِي مع الباني» إلى دالة «ذَيلِي مع الباني»، أو على العكس من دالة «ذَيلِي مع الباني» إلى دالة غير «ذَيلِي مع الباني»، تُحوَّل إلى نداءات <em>غير</em> ذَيلية، حتى وإن ظهرت نحويًا في موضع ذَيلِي في البرنامج المصدري.</p>
</li>
</ul>
<p>كون النداءات الواقعة في موضع ذَيلِي في البرنامج المصدر قد تصير نداءات غير ذَيلية إذا انتقلت من دالة «ذَيلِي مع الباني» إلى دالة غير «ذَيلِي مع الباني» أمر مفاجئ، وسينبّه التحويل إليها.</p>
<p>مثال:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> flatten = <span class="hljs-keyword">function</span>
| <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
| xs :: xss -&gt;
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> append_flatten xs xss =
      <span class="hljs-keyword">match</span> xs <span class="hljs-keyword">with</span>
      | <span class="hljs-literal">[]</span> -&gt; flatten xss
      | x :: xs -&gt; x :: append_flatten xs xss
    <span class="hljs-keyword">in</span> append_flatten xs xss

<span class="hljs-type">Warning</span> <span class="hljs-number">71</span> [unused-tmc-attribute]: <span class="hljs-type">This</span> <span class="hljs-keyword">function</span> is marked @tail_mod_cons
  but is never applied <span class="hljs-keyword">in</span> <span class="hljs-type">TMC</span> position.
<span class="hljs-type">Warning</span> <span class="hljs-number">72</span> [tmc-breaks-tailcall]: <span class="hljs-type">This</span> call is <span class="hljs-keyword">in</span> tail-modulo-cons position
  <span class="hljs-keyword">in</span> a <span class="hljs-type">TMC</span> <span class="hljs-keyword">function</span>, but the <span class="hljs-keyword">function</span> called is not itself specialized <span class="hljs-keyword">for</span>
  <span class="hljs-type">TMC</span>, so the call will not be transformed into a tail call.
  <span class="hljs-type">Please</span> either mark the called <span class="hljs-keyword">function</span> <span class="hljs-keyword">with</span> the [@tail_mod_cons] attribute,
  <span class="hljs-keyword">or</span> mark this call <span class="hljs-keyword">with</span> the [@tailcall <span class="hljs-literal">false</span>] attribute <span class="hljs-keyword">to</span> make its
  non-tailness explicit.
</code></pre>
<p>هنا المساعدة <code>append_flatten</code> غير معلَّقة بـ <code>[@tail_mod_cons]</code>، فالنداءان <code>append_flatten xs xss</code> و<code>flatten xss</code> <em>لن</em> يكونا نداءين ذَيلِيين. والإصلاح الصحيح هنا تعليق <code>append_flatten</code> لتكون «ذَيلِي مع الباني».</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> flatten = <span class="hljs-keyword">function</span>
| <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
| xs :: xss -&gt;
    <span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> append_flatten xs xss =
      <span class="hljs-keyword">match</span> xs <span class="hljs-keyword">with</span>
      | <span class="hljs-literal">[]</span> -&gt; flatten xss
      | x :: xs -&gt; x :: append_flatten xs xss
    <span class="hljs-keyword">in</span> append_flatten xs xss
</code></pre>
<p>ويحدث التحذير نفسه عندما تكون <code>append_flatten</code> دالة غير «ذَيلِي مع الباني» في مجموعة التتبّع العودي نفسها؛ فاستعمال تحويل «ذَيلِي مع الباني» خاصية دوال مفردة، لا مجموعات عودية كاملة.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> flatten = <span class="hljs-keyword">function</span>
| <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
| xs :: xss -&gt; append_flatten xs xss

<span class="hljs-keyword">and</span> append_flatten xs xss =
  <span class="hljs-keyword">match</span> xs <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; flatten xss
  | x :: xs -&gt; x :: append_flatten xs xss

<span class="hljs-type">Warning</span> <span class="hljs-number">71</span> [unused-tmc-attribute]: <span class="hljs-type">This</span> <span class="hljs-keyword">function</span> is marked @tail_mod_cons
  but is never applied <span class="hljs-keyword">in</span> <span class="hljs-type">TMC</span> position.
<span class="hljs-type">Warning</span> <span class="hljs-number">72</span> [tmc-breaks-tailcall]: <span class="hljs-type">This</span> call is <span class="hljs-keyword">in</span> tail-modulo-cons position
  <span class="hljs-keyword">in</span> a <span class="hljs-type">TMC</span> <span class="hljs-keyword">function</span>, but the <span class="hljs-keyword">function</span> called is not itself specialized <span class="hljs-keyword">for</span>
  <span class="hljs-type">TMC</span>, so the call will not be transformed into a tail call.
  <span class="hljs-type">Please</span> either mark the called <span class="hljs-keyword">function</span> <span class="hljs-keyword">with</span> the [@tail_mod_cons] attribute,
  <span class="hljs-keyword">or</span> mark this call <span class="hljs-keyword">with</span> the [@tailcall <span class="hljs-literal">false</span>] attribute <span class="hljs-keyword">to</span> make its
  non-tailness explicit.
</code></pre>
<p>ومرة أخرى، الإصلاح هو تخصيص <code>append_flatten</code> أيضًا:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> flatten = <span class="hljs-keyword">function</span>
| <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
| xs :: xss -&gt; append_flatten xs xss

<span class="hljs-keyword">and</span>[@tail_mod_cons] append_flatten xs xss =
  <span class="hljs-keyword">match</span> xs <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; flatten xss
  | x :: xs -&gt; x :: append_flatten xs xss
</code></pre>
<p>يمكن أيضًا تعليق الدوال غير العودية بـ <code>[@tail_mod_cons]</code>؛ وهذا مفيد عادةً لعمليات الربط المحلية بالدوال العودية.</p>
<p>النسخة غير الصحيحة:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map_vars f exp =
  <span class="hljs-keyword">let</span> self exp = map_vars f exp <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">match</span> exp <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Var</span> v -&gt; <span class="hljs-type">Var</span> (f v)
  | <span class="hljs-type">Let</span> ((v, def), body) -&gt;
    <span class="hljs-type">Let</span> ((f v, self def), (self[@tailcall]) body)

<span class="hljs-type">Warning</span> <span class="hljs-number">51</span> [wrong-tailcall-expectation]: expected tailcall

<span class="hljs-type">Warning</span> <span class="hljs-number">51</span> [wrong-tailcall-expectation]: expected tailcall
<span class="hljs-type">Warning</span> <span class="hljs-number">71</span> [unused-tmc-attribute]: <span class="hljs-type">This</span> <span class="hljs-keyword">function</span> is marked @tail_mod_cons
  but is never applied <span class="hljs-keyword">in</span> <span class="hljs-type">TMC</span> position.
</code></pre>
<p>الإصلاح الموصى به:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map_vars f exp =
  <span class="hljs-keyword">let</span>[@tail_mod_cons] self exp = map_vars f exp <span class="hljs-keyword">in</span>
  <span class="hljs-keyword">match</span> exp <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Var</span> v -&gt; <span class="hljs-type">Var</span> (f v)
  | <span class="hljs-type">Let</span> ((v, def), body) -&gt;
    <span class="hljs-type">Let</span> ((f v, self def), (self[@tailcall]) body)
</code></pre>
<p>وفي حالات أخرى، لا منفعة في جعل الدالة المدعوّة «ذَيلِي مع الباني»، أو لا يمكن ذلك: مثلًا إذا كانت معاملًا داليًا (فالتحويل لا يعمل إلا مع النداءات المباشرة إلى دوال معروفة).</p>
<p>تأمّل، مثلًا، دالة إحلال على أشجار ثنائية:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> tree = <span class="hljs-type">Leaf</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> | <span class="hljs-type">Node</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> tree * <span class="hljs-symbol">&#x27;a</span> tree

<span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> bind (f : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> tree) (t : <span class="hljs-symbol">&#x27;a</span> tree) : <span class="hljs-symbol">&#x27;a</span> tree =
  <span class="hljs-keyword">match</span> t <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Leaf</span> v -&gt; f v
  | <span class="hljs-type">Node</span> (left, right) -&gt;
    <span class="hljs-type">Node</span> (bind f left, (bind[@tailcall]) f right)

<span class="hljs-type">Warning</span> <span class="hljs-number">72</span> [tmc-breaks-tailcall]: <span class="hljs-type">This</span> call is <span class="hljs-keyword">in</span> tail-modulo-cons position
  <span class="hljs-keyword">in</span> a <span class="hljs-type">TMC</span> <span class="hljs-keyword">function</span>, but the <span class="hljs-keyword">function</span> called is not itself specialized <span class="hljs-keyword">for</span>
  <span class="hljs-type">TMC</span>, so the call will not be transformed into a tail call.
  <span class="hljs-type">Please</span> either mark the called <span class="hljs-keyword">function</span> <span class="hljs-keyword">with</span> the [@tail_mod_cons] attribute,
  <span class="hljs-keyword">or</span> mark this call <span class="hljs-keyword">with</span> the [@tailcall <span class="hljs-literal">false</span>] attribute <span class="hljs-keyword">to</span> make its
  non-tailness explicit.
</code></pre>
<p>هنا <code>f</code> معامل دالي، لا نداء مباشر، والتنفيذ الحالي من الرتبة الأولى بصرامة، فهو لا يدعم وسائط «ذَيلِي مع الباني». في هذه الحالة، ينبغي للمستخدم أن يشير إلى إدراكه أن النداء <code>f v</code> ليس، في الحقيقة، في موضع ذَيلِي، باستعمال <code>(f[@tailcall false]) v</code>.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">type</span> <span class="hljs-symbol">&#x27;a</span> tree = <span class="hljs-type">Leaf</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> | <span class="hljs-type">Node</span> <span class="hljs-keyword">of</span> <span class="hljs-symbol">&#x27;a</span> tree * <span class="hljs-symbol">&#x27;a</span> tree

<span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> bind (f : <span class="hljs-symbol">&#x27;a</span> -&gt; <span class="hljs-symbol">&#x27;a</span> tree) (t : <span class="hljs-symbol">&#x27;a</span> tree) : <span class="hljs-symbol">&#x27;a</span> tree =
  <span class="hljs-keyword">match</span> t <span class="hljs-keyword">with</span>
  | <span class="hljs-type">Leaf</span> v -&gt; (f[@tailcall <span class="hljs-literal">false</span>]) v
  | <span class="hljs-type">Node</span> (left, right) -&gt;
    <span class="hljs-type">Node</span> (bind f left, (bind[@tailcall]) f right)
</code></pre>
<h2 id="273-تفاصيل-التحويل">27.3 تفاصيل التحويل</h2>
<p>لاستعمال هذه الميزة المتقدّمة، من المفيد أن تعرف أن تحويل الدالة يُنتج دالة مخصَّصة بنمط تمرير الوجهة.</p>
<p>لنتذكّر مثال <code>map</code>:</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map f l =
  <span class="hljs-keyword">match</span> l <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | x :: xs -&gt;
    <span class="hljs-keyword">let</span> y = f x <span class="hljs-keyword">in</span>
    y :: map f xs
</code></pre>
<p>فيما يلي وصف البرنامج المحوَّل بترميز شبه-OCaml: بعض العمليات لا يمكن التعبير عنها في شيفرة OCaml المصدرية. (يحدث التحويل في الواقع على التمثيل الوسيط Lambda في مترجم OCaml.)</p>
<pre><code class="language-text">let rec map f l =
  match l with
  | [] -&gt; []
  | x :: xs -&gt;
    let y = f x in
    let dst = y ::{mutable} Hole in
    map_dps f xs dst 1;
    dst

and map_dps f l dst idx =
  match l with
  | [] -&gt; dst.idx &lt;- []
  | x :: xs -&gt;
    let y = f x in
    let dst&#x27; = y ::{mutable} Hole in
    dst.idx &lt;- dst&#x27;;
    map_dps f xs dst&#x27; 1
</code></pre>
<p>تتحوّل نسخة <code>map</code> المصدرية إلى دالتين: نسخة <em>بالنمط المباشر</em> تُسمّى هي أيضًا <code>map</code>، ونسخة <em>بنمط تمرير الوجهة</em> (DPS) تُسمّى <code>map_dps</code>. ولا تعيد نسخة تمرير الوجهة نتيجة مباشرة، بل تكتبها في موضع ذاكرة يحدّده معاملان إضافيان للدالة: <code>dst</code> (كتلة ذاكرة) و<code>i</code> (موضع داخل كتلة الذاكرة).</p>
<p>ويتحوّل النداء المصدري <code>y :: map f xs</code> إلى إنشاء كتلة قابلة للتغيير <code>y ::{mutable} Hole</code>، وسيطها الثاني <em>ثقب</em> غير مهيّأ. ثم تُمرَّر الكتلة إلى <code>map_dps</code> معاملًا للوجهة (بإزاحة <code>1</code>).</p>
<p>لاحظ أن <code>map</code> لا تنادي نفسها عوديًا، بل تنادي <code>map_dps</code>. ثم تنادي <code>map_dps</code> نفسها عوديًا، بطريقة عودية ذَيلِيَّة.</p>
<p>والنداء من <code>map</code> إلى <code>map_dps</code> <em>ليس</em> نداء ذَيلِيًّا (وهذا شيء يمكن أن نحسّنه في المستقبل)؛ لكن هذا النداء يحدث مرة واحدة فقط عند استدعاء <code>map f l</code>، وتُعالَج كل عناصر القائمة بعد العنصر الأول في مكدّس ثابت بواسطة <code>map_dps</code>.</p>
<p>وهذا يفسّر دقائق «الخروج من ذَيلِي مع الباني». تأمّل مثالنا السابق المتعلّق بالتعاود المتبادل بين <code>flatten</code> و<code>append_flatten</code>.</p>
<pre><code class="language-text">let[@tail_mod_cons] rec flatten l =
  match l with
  | [] -&gt; []
  | xs :: xss -&gt;
    append_flatten xs xss
</code></pre>
<p>يتحوّل النداء إلى <code>append_flatten</code>، الذي يظهر نحويًا في موضع ذَيلِي، بطرق مختلفة بحسب توفّر نسخة بنمط تمرير الوجهة للدالة، أي بحسب ما إذا كانت هي نفسها معلَّقة بـ <code>[@tail_mod_cons]</code>:</p>
<pre><code class="language-text">(* if append_flatten_dps exists *)
and flatten_dps l dst i =
  match l with
  | [] -&gt; dst.i &lt;- []
  | xs :: xss -&gt;
    append_flatten_dps xs xss dst i

(* if append_flatten_dps does not exist *)
and rec flatten_dps l dst i =
  match l with
  | [] -&gt; dst.i &lt;- []
  | xs :: xss -&gt;
    dst.i &lt;- append_flatten xs xss
</code></pre>
<p>إذا لم تكن لـ <code>append_flatten</code> نسخة بنمط تمرير الوجهة، يتحوّل النداء إلى نداء غير ذَيلِي.</p>
<h2 id="274-القيود-الحالية">27.4 القيود الحالية</h2>
<h5>معيار نحوي محض</h5>
<p>كما هو حال النداءات الذَيلية عمومًا، فإن مفهوم موضع «ذَيلِي مع الباني» نحوي محض؛ وبعض عمليات إعادة الهيكلة البسيطة ستُخرج النداءات من موضع «ذَيلِي مع الباني».</p>
<pre><code class="language-ocaml"><span class="hljs-comment">(* works as expected *)</span>
<span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map f li =
  <span class="hljs-keyword">match</span> li <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | x :: xs -&gt;
    <span class="hljs-keyword">let</span> y = f x <span class="hljs-keyword">in</span>
    y ::
      <span class="hljs-comment">(* this call is in TMC position *)</span>
      map f xs
</code></pre>
<pre><code class="language-ocaml"><span class="hljs-comment">(* not optimizable anymore *)</span>
<span class="hljs-keyword">let</span>[@tail_mod_cons] <span class="hljs-keyword">rec</span> map f li =
  <span class="hljs-keyword">match</span> li <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | x :: xs -&gt;
    <span class="hljs-keyword">let</span> y = f x <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">let</span> ys =
      <span class="hljs-comment">(* this call is not in TMC position anymore *)</span>
      map f xs <span class="hljs-keyword">in</span>
    y :: ys

<span class="hljs-type">Warning</span> <span class="hljs-number">71</span> [unused-tmc-attribute]: <span class="hljs-type">This</span> <span class="hljs-keyword">function</span> is marked @tail_mod_cons
  but is never applied <span class="hljs-keyword">in</span> <span class="hljs-type">TMC</span> position.
</code></pre>
<h5>تحويل محلي من الرتبة الأولى</h5>
<p>عندما تُحوَّل دالة بـ «ذَيلِي مع الباني»، يُولَّد تعريفان: أحدهما يوفّر واجهة بالنمط المباشر والآخر يوفّر نسخة بنمط تمرير الوجهة. ومع ذلك، لن تستعمل كل النداءات إلى هذه الدالة في موضع «ذَيلِي مع الباني» نسخة تمرير الوجهة وتصير نداءات ذَيلية:</p>
<ul>
<li>
<p>التحويل محلي: لا تصير نداءات «ذَيلِي مع الباني» إلى <code>foo</code> نداءات ذَيلية إلا إذا كانت في وحدة الترجمة نفسها التي فيها <code>foo</code>.</p>
</li>
<li>
<p>التحويل من الرتبة الأولى: لا تصير نداءات «ذَيلِي مع الباني» نداءات ذَيلية إلا إذا كانت نداءات مباشرة إلى دوال معروفة «ذَيلِي مع الباني»، ولا تصير كذلك أبدًا النداءات إلى معاملات دالية.</p>
</li>
</ul>
<p>تأمّل النداء <code>Option.map foo x</code> مثلًا: حتى لو كان <code>foo</code> مدعوًّا في موضع «ذَيلِي مع الباني» داخل تعريف <code>Option.map</code>، فلن يصير ذلك النداء أبدًا نداءً ذَيلِيًّا. (وهذا سيكون الحال حتى لو كان النداء إلى <code>Option.map</code> داخل الوحدة <code>Option</code>.)</p>
<p>وبوجه عام، هذا القيد ليس مشكلة في الدوال العودية: فالنداء الأول من وحدة خارجية أو من دالة عالية الرتبة سيستهلك مساحة مكدّس، لكن النداءات العودية اللاحقة في موضع «ذَيلِي مع الباني» ستُحسَّن. فمثلًا، إذا عُرِّفت <code>List.map</code> دالةً «ذَيلِي مع الباني»، فلن تصير النداءات من خارج الوحدة <code>List</code> نداءات ذَيلية إذا وقعت في مواضع ذَيلية، أما النداءات العودية داخل تعريف <code>List.map</code> فهي في مواضع «ذَيلِي مع الباني» وتصير بالفعل نداءات ذَيلية: معالجة العنصر الأول من القائمة ستستهلك مساحة مكدّس، أما كل العناصر اللاحقة فتُعالَج في مساحة ثابتة.</p>
<p>وقد تكون هذه القيود مشكلة في حالات أعقد يحدث فيها تعاود متبادل بين دوال، بعضها غير معلَّق بـ «ذَيلِي مع الباني»، أو معرَّفة في وحدات مختلفة، أو مدعوّة على نحو غير مباشر، مثلًا عبر معاملات دالية.</p>
<h5>النداءات غير المطابقة للدوال الصفوفية</h5>
<p>يجري OCaml تحسينًا ضمنيًا للدوال «الصفوفية»، التي تأخذ معاملًا واحدًا هو صفّ: <code>let f (x, y, z) = ...</code>. فالنداءات المباشرة إلى هذه الدوال بوسيط صفّ حرفي (مثل <code>f (a, b, c)</code>) تنادي الدالة «الصفوفية» بتمرير المعاملات مباشرة، بدلًا من بناء صفّ منها. أما النداءات الأخرى، سواء كانت غير مباشرة أو تمرّر قيمة صفّ أعقد (مثل <code>let t = (a, b, c) in f t</code>)، فتُترجَم نداءات «غير مطابقة» تمرّ عبر غلاف.</p>
<p>يدعم تحويل <code>[@tail_mod_cons]</code> الدوال الصفوفية، لكنه لا يحسّن إلا النداءات «المطابقة» في موضع ذَيلِي؛ فالنداءات المباشرة إلى شيء غير صفّ حرفي لن تصير نداءات ذَيلية. ويمكن للمستخدم أن يفكّ الصفّ يدويًا ليفرض على النداء أن يكون «مطابقًا»: <code>let (x, y, z) = t in f (x, y, z)</code>. وإذا كان ثمة شكّ في إمكان تحسين نداء ما بـ «ذَيلِي مع الباني»، فيمكن استعمال السمة <code>[@tailcall]</code> على الدالة المدعوّة، وهي ستنبّه إذا تعذّر التحويل.</p>
<pre><code class="language-ocaml"><span class="hljs-keyword">let</span> <span class="hljs-keyword">rec</span> map (f, l) =
  <span class="hljs-keyword">match</span> l <span class="hljs-keyword">with</span>
  | <span class="hljs-literal">[]</span> -&gt; <span class="hljs-literal">[]</span>
  | x :: xs -&gt;
    <span class="hljs-keyword">let</span> y = f x <span class="hljs-keyword">in</span>
    <span class="hljs-keyword">let</span> args = (f, xs) <span class="hljs-keyword">in</span>
    <span class="hljs-comment">(* this inexact call cannot be tail-optimized, so a warning will be raised *)</span>
    y :: (map[@tailcall]) args

<span class="hljs-type">Warning</span> <span class="hljs-number">51</span> [wrong-tailcall-expectation]: expected tailcall
</code></pre>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,l as slug,p as title};
