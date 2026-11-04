const e="ocaml-manual",o="ch29",n="المكتبة الأساسية",c="index",t="المكتبة الأساسية",p=[{depth:2,id:"291-الأنواع-المدمجة-والاستثناءات-المعرفة-مسبقا",text:"29.1 الأنواع المدمجة والاستثناءات المعرَّفة مسبقًا"},{depth:3,id:"الأنواع-المدمجة",text:"الأنواع المدمجة"},{depth:3,id:"الاستثناءات-المعرفة-مسبقا",text:"الاستثناءات المعرَّفة مسبقًا"},{depth:2,id:"292-الوحدة-stdlib-الوحدة-المفتوحة-ابتداء",text:"29.2 الوحدة Stdlib: الوحدة المفتوحة ابتداءً"}],l=`<h1>الفصل 29: المكتبة الأساسية</h1>
<p>يصف هذا الفصل المكتبة الأساسية في OCaml، وهي مؤلَّفة من تصريحات للأنواع والاستثناءات المدمجة، إضافةً إلى الوحدة <code>Stdlib</code> التي توفّر عمليات أساسية على هذه الأنواع المدمجة. وتتّسم وحدة <code>Stdlib</code> بخصيصتين:</p>
<ul>
<li>
<p>تُربط تلقائيًا بملفات الشيفرة الهدف للمستخدم باستعمال الأمر <code>ocamlc</code> (الفصل 13).</p>
</li>
<li>
<p>تُفتح تلقائيًا عند بدء أي ترجمة، أو عند إطلاق النظام التفاعلي. لذلك يمكن استعمال معرّفات غير مؤهَّلة للإشارة إلى الدوال التي توفّرها وحدة <code>Stdlib</code>، من دون إضافة التوجيه <code>open Stdlib</code>.</p>
</li>
</ul>
<h2 id="291-الأنواع-المدمجة-والاستثناءات-المعرفة-مسبقا">29.1 الأنواع المدمجة والاستثناءات المعرَّفة مسبقًا</h2>
<p>الأنواع المدمجة والاستثناءات المعرَّفة مسبقًا التالية معرَّفة دائمًا في بيئة الترجمة، لكنها ليست جزءًا من أي وحدة. وبالتالي لا يمكن الإشارة إليها إلا بأسمائها القصيرة.</p>
<h3 id="الأنواع-المدمجة">الأنواع المدمجة</h3>
<pre><code class="language-text">type int
</code></pre>
<blockquote>
<p>نوع الأعداد الصحيحة.</p>
</blockquote>
<pre><code class="language-text">type char
</code></pre>
<blockquote>
<p>نوع المحارف.</p>
</blockquote>
<pre><code class="language-text">type bytes
</code></pre>
<blockquote>
<p>نوع متتاليات البايتات (القابلة للكتابة).</p>
</blockquote>
<pre><code class="language-text">type string
</code></pre>
<blockquote>
<p>نوع سلاسل المحارف (التي لا يمكن تعديلها).</p>
</blockquote>
<pre><code class="language-text">type float
</code></pre>
<blockquote>
<p>نوع أعداد الفاصلة العائمة.</p>
</blockquote>
<pre><code class="language-text">type bool = false | true
</code></pre>
<blockquote>
<p>نوع القيم المنطقية (قيم الصدق).</p>
</blockquote>
<pre><code class="language-text">type unit = ()
</code></pre>
<blockquote>
<p>نوع قيمة الوحدة.</p>
</blockquote>
<pre><code class="language-text">type exn
</code></pre>
<blockquote>
<p>نوع قيم الاستثناءات.</p>
</blockquote>
<pre><code class="language-text">type &#x27;a array
</code></pre>
<blockquote>
<p>نوع المصفوفات التي تكون عناصرها من النوع <code>'a</code>.</p>
</blockquote>
<pre><code class="language-text">type &#x27;a iarray
</code></pre>
<blockquote>
<p>نوع المصفوفات غير القابلة للتغيير التي تكون عناصرها من النوع <code>'a</code>.</p>
</blockquote>
<pre><code class="language-text">type floatarray
</code></pre>
<blockquote>
<p>نوع المصفوفات القابلة للتغيير من أعداد الفاصلة العائمة ذات التمثيل المحزوم.</p>
</blockquote>
<pre><code class="language-text">type &#x27;a list = [] | :: of &#x27;a * &#x27;a list
</code></pre>
<blockquote>
<p>نوع القوائم التي تكون عناصرها من النوع <code>'a</code>.</p>
</blockquote>
<pre><code class="language-text">type &#x27;a option = None | Some of &#x27;a
</code></pre>
<blockquote>
<p>نوع القيم الاختيارية من النوع <code>'a</code>.</p>
</blockquote>
<pre><code class="language-text">type int32
</code></pre>
<blockquote>
<p>نوع الأعداد الصحيحة المؤشَّرة ذات 32 بت. تُلحَق المكوّنات الحرفية للأعداد الصحيحة ذات 32 بت باللاحقة l. انظر الوحدة <code>Int32</code>.</p>
</blockquote>
<pre><code class="language-text">type int64
</code></pre>
<blockquote>
<p>نوع الأعداد الصحيحة المؤشَّرة ذات 64 بت. تُلحَق المكوّنات الحرفية للأعداد الصحيحة ذات 64 بت باللاحقة L. انظر الوحدة <code>Int64</code>.</p>
</blockquote>
<pre><code class="language-text">type nativeint
</code></pre>
<blockquote>
<p>نوع الأعداد الصحيحة المؤشَّرة الأصلية للمنصّة (32 بت على المعالجات ذات 32 بت، و64 بت على المعالجات ذات 64 بت). تُلحَق المكوّنات الحرفية للأعداد الصحيحة الأصلية باللاحقة n. انظر الوحدة <code>Nativeint</code>.</p>
</blockquote>
<pre><code class="language-text">type (&#x27;a, &#x27;b, &#x27;c, &#x27;d, &#x27;e, &#x27;f) format6
</code></pre>
<blockquote>
<p>نوع سلاسل الصيغ. <code>'a</code> هو نوع معاملات الصيغة، و<code>'f</code> هو نوع النتيجة لدوال نمط <code>printf</code>، و<code>'b</code> هو نوع الوسيطة الأولى المعطاة لدوال الطباعة <code>%a</code> و<code>%t</code> (انظر الوحدة <code>Printf</code>)، و<code>'c</code> هو نوع نتيجة تلك الدوال، وهو أيضًا نوع الوسيطة التي تُمرَّر إلى الوسيطة الأولى لدوال نمط <code>kprintf</code>، و<code>'d</code> هو نوع النتيجة لدوال نمط <code>scanf</code> (انظر الوحدة <code>Scanf</code>)، و<code>'e</code> هو نوع دالة الاستقبال لدوال نمط <code>scanf</code>.</p>
</blockquote>
<pre><code class="language-text">type &#x27;a lazy_t
</code></pre>
<blockquote>
<p>يُستعمل هذا النوع لتنفيذ الوحدة <code>Lazy</code>. ولا ينبغي استعماله مباشرةً.</p>
</blockquote>
<h3 id="الاستثناءات-المعرفة-مسبقا">الاستثناءات المعرَّفة مسبقًا</h3>
<pre><code class="language-text">exception Match_failure of (string * int * int)
</code></pre>
<blockquote>
<p>استثناء يُرفَع عندما لا ينطبق أي من حالات مطابقة الأنماط. الوسائط هي موضع الكلمة المفتاحية <code>match</code> في الشيفرة المصدرية (اسم الملف، ورقم السطر، ورقم العمود).</p>
</blockquote>
<pre><code class="language-text">exception Assert_failure of (string * int * int)
</code></pre>
<blockquote>
<p>استثناء يُرفَع عندما يفشل تأكيد. الوسائط هي موضع الكلمة المفتاحية <code>assert</code> في الشيفرة المصدرية (اسم الملف، ورقم السطر، ورقم العمود).</p>
</blockquote>
<pre><code class="language-text">exception Invalid_argument of string
</code></pre>
<blockquote>
<p>استثناء ترفعه دوال المكتبة للإشارة إلى أن الوسائط المعطاة لا معنى لها. وتوفّر السلسلة بعض المعلومات للمبرمج. وكقاعدة عامة، لا ينبغي التقاط هذا الاستثناء، لأنه يدلّ على خطأ برمجي، وينبغي تعديل الشيفرة بحيث لا تؤدي إلى رفعه.</p>
</blockquote>
<pre><code class="language-text">exception Failure of string
</code></pre>
<blockquote>
<p>استثناء ترفعه دوال المكتبة للإشارة إلى أنها غير معرَّفة على الوسائط المعطاة. والغرض من السلسلة إعطاء بعض المعلومات للمبرمج؛ ولا يجوز <em>إطلاقًا</em> إجراء مطابقة أنماط على المكوّن الحرفي للسلسلة لأنه قد يتغيّر في إصدارات لاحقة (استعمل <code>Failure _</code> بدلًا من ذلك).</p>
</blockquote>
<pre><code class="language-text">exception Not_found
</code></pre>
<blockquote>
<p>استثناء ترفعه دوال البحث عندما يتعذّر العثور على الكائن المطلوب.</p>
</blockquote>
<pre><code class="language-text">exception Out_of_memory
</code></pre>
<blockquote>
<p>استثناء يرفعه جامع القمامة عندما لا تكفي الذاكرة لإكمال الحساب. (وهو غير موثوق بالنسبة إلى التخصيصات في الكومة الصغرى.)</p>
</blockquote>
<pre><code class="language-text">exception Stack_overflow
</code></pre>
<blockquote>
<p>استثناء يرفعه مفسّر الشيفرة البايتية عندما يبلغ مكدّس التقييم حجمه الأقصى. وهذا يدلّ غالبًا على عودية لا نهائية أو شديدة العمق في برنامج المستخدم. وقبل الإصدار 4.10، لم يكن مترجم الشيفرة الأصلية ينفّذه تنفيذًا كاملًا.</p>
</blockquote>
<pre><code class="language-text">exception Sys_error of string
</code></pre>
<blockquote>
<p>استثناء ترفعه دوال الإدخال/الإخراج للإبلاغ عن خطأ في نظام التشغيل. والغرض من السلسلة إعطاء بعض المعلومات للمبرمج؛ ولا يجوز <em>إطلاقًا</em> إجراء مطابقة أنماط على المكوّن الحرفي للسلسلة لأنه قد يتغيّر في إصدارات لاحقة (استعمل <code>Sys_error _</code> بدلًا من ذلك).</p>
</blockquote>
<pre><code class="language-text">exception End_of_file
</code></pre>
<blockquote>
<p>استثناء ترفعه دوال الإدخال للإشارة إلى الوصول إلى نهاية الملف.</p>
</blockquote>
<pre><code class="language-text">exception Division_by_zero
</code></pre>
<blockquote>
<p>استثناء ترفعه عمليات القسمة الصحيحة وحساب الباقي عندما تكون وسيطتها الثانية صفرًا.</p>
</blockquote>
<pre><code class="language-text">exception Sys_blocked_io
</code></pre>
<blockquote>
<p>حالة خاصة من <code>Sys_error</code> تُرفَع عندما لا يكون أي إدخال/إخراج ممكنًا على قناة إدخال/إخراج غير حاجبة.</p>
</blockquote>
<pre><code class="language-text">exception Undefined_recursive_module of (string * int * int)
</code></pre>
<blockquote>
<p>استثناء يُرفَع عندما يُقيَّم تعريف وحدة عودية غير مؤسَّس جيدًا. (انظر القسم 12.2.) الوسائط هي موضع التعريف في الشيفرة المصدرية (اسم الملف، ورقم السطر، ورقم العمود).</p>
</blockquote>
<h2 id="292-الوحدة-stdlib-الوحدة-المفتوحة-ابتداء">29.2 الوحدة Stdlib: الوحدة المفتوحة ابتداءً</h2>
<ul>
<li>الوحدة <code>Stdlib</code>: الوحدة المفتوحة ابتداءً</li>
</ul>
`,d={book:e,chapter:o,chapterTitle:n,slug:c,title:t,headings:p,html:l};export{e as book,o as chapter,n as chapterTitle,d as default,p as headings,l as html,c as slug,t as title};
