const e="use-the-index-luke",s="sql-where-clause-functions-user-defined-functions",n="دوال معرَّفة من المستخدم",a="index",o="الدوال المعرّفة من المستخدم",p=[],c=`<p>الفهرسة القائمة على الدوال نهج عام جداً. فإلى جانب دوال مثل <code>UPPER</code>، يمكنك أيضاً فهرسة تعبيرات مثل <code>A + B</code>، بل واستخدام دوال معرّفة من المستخدم في تعريف الفهرس.</p>
<p>وهناك استثناء مهم واحد. فمثلاً، لا يمكن الإشارة إلى الوقت الحالي في تعريف فهرس، لا مباشرةً ولا غير مباشرة، كما في المثال التالي.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> get_age(date_of_birth <span class="hljs-type">DATE</span>) 
<span class="hljs-keyword">RETURN</span> NUMBER
<span class="hljs-keyword">AS</span>
<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">RETURN</span> 
    TRUNC(MONTHS_BETWEEN(SYSDATE, date_of_birth)<span class="hljs-operator">/</span><span class="hljs-number">12</span>);
<span class="hljs-keyword">END</span>
</code></pre>
<p>تستخدم دالة <code>GET_AGE</code> التاريخ الحالي (<code>SYSDATE</code>) لحساب العمر بناءً على تاريخ الميلاد المقدَّم. ويمكنك استخدام هذه الدالة في جميع أجزاء استعلام SQL، مثلاً في <code>select</code> وعبارة <code>where</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, get_age(date_of_birth)
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> get_age(date_of_birth) <span class="hljs-operator">=</span> <span class="hljs-number">42</span>
</code></pre>
<p>يسرد الاستعلام جميع الموظفين الذين عمرهم 42 سنة. واستخدام فهرس قائم على دالة فكرة بديهية لتحسين هذا الاستعلام، لكنك لا تستطيع استخدام الدالة <code>GET_AGE</code> في تعريف الفهرس لأنها ليست <em>حتمية</em> (deterministic). ويعني ذلك أن نتيجة نداء الدالة لا تحدّدها معاملاتها تحدّداً كاملاً. ولا يمكن فهرسة إلا الدوال التي تعيد النتيجة نفسها دائماً للمعاملات نفسها—أي الدوال الحتمية.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-user-defined&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>والسبب وراء هذا القيد بسيط. عند إدراج صف جديد، تنادي قاعدة البيانات (database) الدالة وتخزّن النتيجة في الفهرس، وتبقى هناك دون تغيير. فلا توجد عملية دورية تحدّث الفهرس. ولا تحدّث قاعدة البيانات العمر المفهرس إلا عندما يتغير تاريخ الميلاد بعبارة <code>update</code>. وبعد عيد الميلاد التالي، يصبح العمر المخزّن في الفهرس خاطئاً.</p>
<p>وإلى جانب <em>كونها</em> حتمية، تشترط قاعدتا بيانات PostgreSQL وOracle أن تُعلَن الدوال <em>حتمية</em> عند استخدامها في فهرس، لذا عليك استخدام الكلمة المفتاحية <code>DETERMINISTIC</code> (في Oracle) أو <code>IMMUTABLE</code> (في PostgreSQL).</p>
<h4>تنبيه</h4>
<p>تثق قاعدتا بيانات PostgreSQL وOracle بإعلانَي <code>DETERMINISTIC</code> أو <code>IMMUTABLE</code>—أي أنها تثق بالمطوّر.</p>
<p>ويمكنك إعلان الدالة <code>GET_AGE</code> حتمية واستخدامها في تعريف فهرس. وأياً كان الإعلان، فإنها <em>لن</em> تعمل كما هو مقصود لأن العمر المخزّن في الفهرس لن يزداد بمرور السنين؛ فلن يتقدم الموظفون في العمر—على الأقل ليس في الفهرس.</p>
<p>ومن الأمثلة الأخرى على الدوال التي لا يمكن «فهرستها» مولّدات الأرقام العشوائية والدوال التي تعتمد على متغيّرات البيئة.</p>
<h4>ملاحظة</h4>
<p>لا تستطيع Db2 (LUW) استخدام الدوال المعرّفة من المستخدم في الفهارس (ولا حتى إذا كانت حتمية).</p>
<h4>فكّر في الأمر</h4>
<p>كيف يمكنك مع ذلك استخدام فهرس لتحسين استعلام عن جميع الموظفين الذين عمرهم 42 سنة؟</p>
`,t={book:e,chapter:s,chapterTitle:n,slug:a,title:o,headings:p,html:c};export{e as book,s as chapter,n as chapterTitle,t as default,p as headings,c as html,a as slug,o as title};
