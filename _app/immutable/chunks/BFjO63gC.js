const n="learn-ocaml",e="working-environment",a="بيئة العمل",l="index",o="بيئة العمل",s=[{depth:2,id:"1-بيئة-العمل",text:"1. بيئة العمل"},{depth:3,id:"11-المصرف-والمفسر",text:"1.1 المصرِّف والمفسّر"},{depth:3,id:"12-برنامج-ocaml-أول",text:"1.2 برنامج OCaml أول"},{depth:3,id:"13-بيئات-البرمجة",text:"1.3 بيئات البرمجة"},{depth:3,id:"14-تثبيت-مكتبات-ocaml",text:"1.4 تثبيت مكتبات OCaml"}],p=`<h2 id="1-بيئة-العمل">1. بيئة العمل</h2>
<p>لغة OCaml متاحة للاستخدام مع أنظمة التشغيل الرئيسية (Linux،
macOS، Windows). يمكن الحصول عليها على العنوان التالي:</p>
<p><code>https://ocaml.org/</code></p>
<p>يحتوي الموقع على تعليمات تثبيت لهذه الأنظمة. بعد تثبيت
OCaml، ستتمكن من الوصول إلى الأدوات التالية: مفسّر (interpreter)، <code>ocaml</code>؛ ومصرِّفان (compilers)،
<code>ocamlc</code> و <code>ocamlopt</code>؛ ومدير حزم (package manager)، <code>opam</code>. سنقدّم باختصار
هذه الأدوات الأربعة أدناه.</p>
<h3 id="11-المصرف-والمفسر">1.1 المصرِّف والمفسّر</h3>
<p>يتضمن نظام OCaml مصرِّفين: <code>ocamlc</code> و <code>ocamlopt</code>. يُنشئ الأول
كودًا قابلاً للنقل (portable)، مستقلاً عن بنية الأجهزة؛ ويُنشئ الثاني
كودًا أصليًا (native) أكثر كفاءة (X86، ARM، etc.). يمكنك استخدام أي من هذين الأداتين لـ
ترجمة (compile) البرامج المعطاة في هذا الكتاب. يتضمن النظام أيضًا نسخة تفاعلية،
وهي البرنامج <code>ocaml</code>. هذا مفسّر (interpreter) أو <em>toplevel</em> (البيئة التفاعلية) ينفّذ
حلقة قراءة-تقييم-طباعة (REPL).</p>
<h3 id="12-برنامج-ocaml-أول">1.2 برنامج OCaml أول</h3>
<p>نوضّح استخدام هذه الأدوات على مثال برنامج بسيط يعرض رسالة
<code>Hello world!</code> على الشاشة. يمكن كتابته على النحو التالي:</p>
<pre><code class="language-ocaml">  <span class="hljs-keyword">let</span> <span class="hljs-literal">()</span> = print_string <span class="hljs-string">&quot;Hello world!\\n&quot;</span>
</code></pre>
<p>هذا بحدّ ذاته برنامج كامل. سنتناول تفاصيل مثل هذه البرامج في
الفصل التالي. إذا خُزّن البرنامج في ملف <code>hello.ml</code>، يمكن ترجمته (compile) من داخل
الطرفية[^1]
باستخدام <code>ocamlc</code>، على النحو التالي:</p>
<pre><code class="language-console"><span class="hljs-meta prompt_">  &gt;</span><span class="language-bash"> ocamlc hello.ml</span>
</code></pre>
<p>يمكننا ثم تنفيذ الملف (binary) الناتج، <code>a.out</code>، مع النتيجة المتوقعة:</p>
<pre><code class="language-text">  &gt; ./a.out
  Hello world!
</code></pre>
<p>يمكن إعطاء الملف (binary) اسمًا مختلفًا باستخدام خيار <code>-o</code> للمصرِّف:</p>
<pre><code class="language-console"><span class="hljs-meta prompt_">  &gt;</span><span class="language-bash"> ocamlc -o hello hello.ml</span>
<span class="hljs-meta prompt_">  &gt;</span><span class="language-bash"> ./hello</span>
  Hello world!
</code></pre>
<p>لاستخدام المفسّر، يكفي كتابة الأمر <code>ocaml</code> في الطرفية. يعرض
البرنامج آنذاك مؤشرًا (prompt) على شكل الحرف <code>#</code>، موجِّهًا المستخدم
لإدخال تعبير.</p>
<pre><code class="language-console"><span class="hljs-meta prompt_">  &gt;</span><span class="language-bash"> ocaml</span>
  OCaml version 4.14.0
<span class="hljs-meta prompt_">  #</span><span class="language-bash">
</span></code></pre>
<p>لتقييم التعبير، يجب أن ينتهي بفاصلتين منقوطتين <code>;;</code> تتبعهما
عودة carriage return. تتحقق البيئة التفاعلية (toplevel) من صحة التعبير نحويًا (syntactically) وكونه
مُحدَّد الأنواع (well-typed). ثم تُقيّم التعبير وتعرض النتيجة. لذا،
لعرض رسالة <code>Hello world!</code> على الشاشة، يكفي
كتابة:</p>
<pre><code class="language-console"><span class="hljs-meta prompt_">  &gt;</span><span class="language-bash"> ocaml</span>
  OCaml version 4.14.0
<span class="hljs-meta prompt_">
  #</span><span class="language-bash"> <span class="hljs-built_in">let</span> () = print_string <span class="hljs-string">&quot;Hello world!\\n&quot;</span>;;</span>
  Hello world!
<span class="hljs-meta prompt_">  #</span><span class="language-bash">
</span></code></pre>
<p>بالإضافة إلى النتيجة، تعرض البيئة التفاعلية (toplevel) أيضًا النوع (type)
المستنتج (inferred) بواسطة OCaml للتعبير المُدخل. على سبيل المثال، إذا أدخلت
التعبير الرياضي 1 + 4 × 2، يُرجع المفسّر الاستجابة
التالية:</p>
<pre><code class="language-text">  # 1 + 4 * 2;;
  - : int = 9
  #
</code></pre>
<p>يُظهر هذا أن التعبير من نوع <code>int</code> (نوع الأعداد الصحيحة)، وأن
نتيجته هي 9. من الآن فصاعدًا، سنقدّم التعبير المُدخل من قبل المستخدم
واستجابة المفسّر على خلفية رمادية. لذا، تقييم
التعبير السابق سيُقدَّم على النحو التالي:</p>
<pre><code class="language-ocaml">  # <span class="hljs-number">1</span> + <span class="hljs-number">4</span> * <span class="hljs-number">2</span> ;;
  - : <span class="hljs-built_in">int</span> = <span class="hljs-number">9</span>
</code></pre>
<p>للخروج من البيئة التفاعلية (toplevel)، اكتب الأمر <code>#quit</code>، على النحو التالي:</p>
<pre><code class="language-text">  # #quit;;
  &gt;
</code></pre>
<p>طريقة أبسط هي الضغط على المفتاحين <code>ctrl</code> و <code>D</code> في آن واحد.</p>
<h3 id="13-بيئات-البرمجة">1.3 بيئات البرمجة</h3>
<p>كما هو الحال مع العديد من لغات البرمجة الأخرى، يمكنك العمل مع OCaml باستخدام محرر النصوص المفضّل لديك (Emacs، Visual Studio Code، etc.). يمكن تهيئة محرر النصوص لاستخدام تلوين نحو (syntax coloring) خاص بـ OCaml، وإبراز الأخطاء (error highlighting)، وما إلى ذلك.</p>
<p>في هذا النص، سنستخدم الأداة <code>dune</code> لأتمتة عملية الترجمة (compilation). يمكن الحصول على هذه الأداة عبر مدير الحزم <code>opam</code>، ويمكن تثبيتها بكتابة الأمر التالي في الطرفية:</p>
<pre><code class="language-text">  &gt; opam install dune
</code></pre>
<p>حل آخر هو استخدام الأداة <code>make</code>. هذا يتطلب كتابة ملف تهيئة (<code>Makefile</code>) خاص بـ OCaml.</p>
<h4>بيئات عبر الإنترنت</h4>
<p>هناك أيضًا حلول عبر الإنترنت لاستخدام OCaml دون تثبيته على جهازك. مثال واحد هو المفسّر عبر الإنترنت TryOCaml، المتوفر على العنوان التالي:</p>
<p><code>https://try.ocamlpro.com/</code></p>
<p>مثال آخر هو موقع الويب</p>
<p><code>https://replit.com/</code></p>
<p>الذي يوفر بيئات عبر الإنترنت لعدد من اللغات، ومن بينها OCaml.</p>
<h3 id="14-تثبيت-مكتبات-ocaml">1.4 تثبيت مكتبات OCaml</h3>
<p>طوّرت مجتمع مستخدمي OCaml عددًا من مكتبات OCaml. أسهل طريقة لتثبيتها هي استخدام مدير الحزم <code>opam</code>. في الفصل التالي، سنستخدم مكتبة رسوميات (graphics)، يمكن تثبيتها على النحو التالي:</p>
<pre><code class="language-text">  &gt; opam install graphics
</code></pre>
<p>سنوضح لاحقًا كيفية استخدام هذه المكتبة، وبشكل عام، أي مكتبة تم تثبيتها باستخدام <code>opam</code>.</p>
`,c={book:n,chapter:e,chapterTitle:a,slug:l,title:o,headings:s,html:p};export{n as book,e as chapter,a as chapterTitle,c as default,s as headings,p as html,l as slug,o as title};
