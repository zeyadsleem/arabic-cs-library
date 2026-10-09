const e="select-star-sql",s="hiatuses",a="انقطاعات التنفيذ",n="index",o="انقطاعات التنفيذ",c=[{depth:2,id:"الانقطاعات",text:"الانقطاعات"},{depth:2,id:"التفكير-في-join",text:"التفكير في JOIN"},{depth:3,id:"إزالة-اللبس-عن-الأعمدة",text:"إزالة اللبس عن الأعمدة"},{depth:2,id:"أنواع-join",text:"أنواع JOIN"},{depth:2,id:"التواريخ",text:"التواريخ"},{depth:2,id:"الربط-الذاتي-self-join",text:"الربط الذاتي (Self Join)"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],t=`<h2 id="الانقطاعات">الانقطاعات</h2>
<p>يوضح هذا الرسم البياني حالات التنفيذ عبر الزمن. <img src="/arabic-cs-library/images/select-star-sql/hiatuses-0-exno_time.webp" alt=""> لاحظ أنه كانت هناك فترات ممتدة عدة لم تحدث فيها أي عمليات تنفيذ. وهدفنا هو تحديد متى كانت بالضبط والبحث في أسبابها.</p>
<p>استراتيجيتنا هي إيصال الجدول إلى حالة يحتوي فيها كل صف (row) أيضًا على تاريخ (date) التنفيذ الذي سبقه. ويمكننا بعد ذلك إيجاد الفارق الزمني بين التاريخين، وترتيب الفوارق ترتيبًا تنازليًا، وقراءة أطول الانقطاعات.</p>
<h2 id="التفكير-في-join">التفكير في JOIN</h2>
<p>لا تكفي أي من التقنيات التي تعلمناها حتى الآن هنا. فالجدول الذي نريده بالحجم نفسه الذي لجدول <code>executions</code> الأصلي، لذا يمكننا استبعاد الدوال التجميعية لأنها تنتج جدولًا أصغر. وقد علّمنا فصل <a href="https://selectstarsql.com/book/select-star-sql/beazley/index">Beazley</a> عمليات على مستوى الصف فقط، وهي تحصرنا في العمل بمعلومات موجودة أصلًا في الصفوف. لكن تاريخ التنفيذ السابق يقع خارج الصف، لذا علينا استخدام <code>JOIN</code> لجلب المعلومات الإضافية.</p>
<p>لنفترض أن المعلومات الإضافية التي نريدها موجودة في جدول (table) يُسمى <code>previous</code> وله عمودان (columns) هما <code>(ex_number, last_ex_date)</code>. عندئذ سنتمكن من تشغيل الاستعلام (query) التالي لإكمال مهمتنا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span>
  last_ex_date <span class="hljs-keyword">AS</span> <span class="hljs-keyword">start</span>,
  ex_date <span class="hljs-keyword">AS</span> <span class="hljs-keyword">end</span>,
  ex_date <span class="hljs-operator">-</span> last_ex_date <span class="hljs-keyword">AS</span> day_difference
<span class="hljs-keyword">FROM</span> executions
<span class="hljs-keyword">JOIN</span> previous
  <span class="hljs-keyword">ON</span> executions.ex_number <span class="hljs-operator">=</span> previous.ex_number
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> day_difference <span class="hljs-keyword">DESC</span>
LIMIT <span class="hljs-number">10</span>
</code></pre>
<p>كتلة <code>JOIN</code> هي محور هذا القسم. وبدلًا من النظر إليها كسطر قائم بذاته، يكون من المفيد غالبًا النظر إليها هكذا: <img src="/arabic-cs-library/images/select-star-sql/hiatuses-1-join_correctview.webp" alt=""> وهذا يبرز كيف ينشئ <code>JOIN</code> جدولًا مدموجًا كبيرًا يُغذّى بعد ذلك إلى كتلة <code>FROM</code> كأي جدول آخر.</p>
<h3 id="إزالة-اللبس-عن-الأعمدة">إزالة اللبس عن الأعمدة</h3>
<p>الاستعلام أعلاه جدير بالملاحظة أيضًا لأن العبارة الشرطية <code>executions.ex_number = previous.ex_number</code> تستخدم الصيغة <code>&lt;table&gt;.&lt;column&gt;</code> لتحديد الأعمدة. وهذا لا يلزم إلا هنا لأن كلا الجدولين يحتوي على عمود باسم <code>ex_number</code>.</p>
<h2 id="أنواع-join">أنواع JOIN</h2>
<p>تأخذ كتلة <code>JOIN</code> الصيغة <code>&lt;table1&gt; JOIN &lt;table2&gt; ON &lt;clause&gt;</code> . وتعمل العبارة الشرطية بالطريقة نفسها كما في <code>WHERE &lt;clause&gt;</code> . أي أنها عبارة تُقيَّم إلى صواب أو خطأ، وكلما اصطف صف من الجدول الأول وآخر من الثاني بحيث تكون العبارة صحيحة، جرى التناظر بينهما: <img src="/arabic-cs-library/images/select-star-sql/hiatuses-2-join_base.webp" alt=""></p>
<p>لكن ماذا يحدث للصفوف التي لا نظير لها؟ في هذه الحالة، لم يكن في جدول <code>previous</code> صف للتنفيذ رقم 1 لأنه لا توجد أي عمليات تنفيذ قبله. <img src="/arabic-cs-library/images/select-star-sql/hiatuses-3-join_unmatched.webp" alt=""></p>
<p>يُجري أمر <code>JOIN</code> افتراضيًا ما يُسمى &quot;ربطًا داخليًا&quot; (inner join) تُسقَط فيه الصفوف غير المتطابقة. <img src="/arabic-cs-library/images/select-star-sql/hiatuses-4-join_inner.webp" alt=""></p>
<p>وللحفاظ على كل صفوف الجدول الأيسر، نستخدم <code>LEFT JOIN</code> بدلًا من <code>JOIN</code> المجرّد. وتُترك الأجزاء الفارغة من الصف كما هي، أي أنها تُقيَّم إلى <code>NULL</code>. <img src="/arabic-cs-library/images/select-star-sql/hiatuses-5-join_left.webp" alt=""></p>
<p>ويمكن استخدام <code>RIGHT JOIN</code> للحفاظ على الصفوف غير المتطابقة في الجدول الأيمن، و<code>OUTER JOIN</code> للحفاظ على الصفوف غير المتطابقة في كليهما.</p>
<p>وآخر دقيقة لطيفة هي التعامل مع حالات التناظر المتعددة. لنقل إن لدينا جدولًا اسمه <code>duplicated_previous</code> يحتوي على نسختين من كل صف في جدول <code>previous</code>. عندئذ يتطابق كل صف من <code>executions</code> مع صفين في <code>duplicated_previous</code>. <img src="/arabic-cs-library/images/select-star-sql/hiatuses-6-join_dup_pre.webp" alt=""> وينشئ الربط عددًا كافيًا من صفوف <code>executions</code> بحيث يحصل كل صف متناظر من <code>duplicated_previous</code> على شريك خاص به. وبهذه الطريقة، يمكن أن تنشئ عمليات الربط جداول أكبر من مكوناتها. <img src="/arabic-cs-library/images/select-star-sql/hiatuses-7-join_dup_post.webp" alt=""></p>
<h2 id="التواريخ">التواريخ</h2>
<p>لنأخذ استراحة من عمليات الربط قليلًا وننظر إلى هذا السطر في الاستعلام القالبي:</p>
<pre><code>  ex_date - last_ex_date AS day_difference
</code></pre>
<p>لقد افترضنا افتراضًا كبيرًا هو أنه يمكننا طرح التواريخ من بعضها. لكن تخيّل أنك الحاسوب الذي يستقبل سطرًا كهذا. هل تُعيد عدد الأيام بين التاريخين؟ ولِمَ لا الساعات أو الثواني؟ ولزيادة الطين بلة، لا تملك SQLite في الواقع أنواعًا للتاريخ أو الوقت (بخلاف معظم لهجات SQL الأخرى)، لذا يبدو العمودان <code>ex_date</code> و<code>last_ex_date</code> لك كنصوص عادية. وأنت مطالب فعليًا بتنفيذ <code>'hello' - 'world'</code>. فماذا يعني ذلك حتى؟</p>
<p>لحسن الحظ، تحتوي SQLite على مجموعة من الدوال تخبر الحاسوب: &quot;انتبه، هذه النصوص التي أمرّرها إليك تحتوي في الحقيقة على تواريخ أو أوقات. فتعامل معها كما تتعامل مع تاريخ.&quot;</p>
<h2 id="الربط-الذاتي-self-join">الربط الذاتي (Self Join)</h2>
<p>بما تعلمناه عن التواريخ، يمكننا تصحيح استعلامنا القالبي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span>
  last_ex_date <span class="hljs-keyword">AS</span> <span class="hljs-keyword">start</span>,
  ex_date <span class="hljs-keyword">AS</span> <span class="hljs-keyword">end</span>,
  JULIANDAY(ex_date) <span class="hljs-operator">-</span> JULIANDAY(last_ex_date)
    <span class="hljs-keyword">AS</span> day_difference
<span class="hljs-keyword">FROM</span> executions
<span class="hljs-keyword">JOIN</span> previous
  <span class="hljs-keyword">ON</span> executions.ex_number <span class="hljs-operator">=</span> previous.ex_number
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> day_difference <span class="hljs-keyword">DESC</span>
LIMIT <span class="hljs-number">5</span>
</code></pre>
<p>والخطوة التالية هي بناء جدول <code>previous</code>.</p>
<p>ويمكننا الآن تضمين هذا الاستعلام داخل قالبنا أعلاه:</p>
<p><code>previous</code> مشتق من <code>executions</code>، لذا نحن فعليًا نربط <code>executions</code> بنفسه. وهذا ما يسمى &quot;ربطًا ذاتيًا&quot; (self join)، وهو تقنية قوية تتيح للصفوف الحصول على معلومات من أجزاء أخرى من الجدول نفسه.</p>
<p>أنشأنا جدول <code>previous</code> لتوضيح الغرض الذي يخدمه. لكن يمكننا في الحقيقة كتابة الاستعلام بأناقة أكبر بربط جدول <code>executions</code> بنفسه مباشرة.</p>
<p>يمكننا الآن استخدام التواريخ الدقيقة للانقطاعات للبحث في ما حدث خلال كل فترة. في السنوات التي تلت رفع الحظر على عقوبة الإعدام مباشرة، كانت هناك فترات طويلة بلا تنفيذ بسبب قلة عدد أحكام الإعدام، إلى جانب الطعون القانونية في الحكم الجديد. ولذلك نستبعد فترات التوقف قبل عام 1993 ونركّز على انقطاعين رئيسيين بعده. <img src="/arabic-cs-library/images/select-star-sql/hiatuses-8-exno_time_annotated.webp" alt=""></p>
<p>وكان الانقطاع الأول بسبب الطعون القانونية في <a href="https://en.wikipedia.org/wiki/Antiterrorism_and_Effective_Death_Penalty_Act_of_1996">قانون مكافحة الإرهاب وعقوبة الإعدام الفعّالة لعام 1996</a> الذي سُنّ ردًا على تفجير مركز التجارة العالمي عام 1993 وتفجير أوكلاهوما سيتي عام 1995. وقد حدّ القانون من عملية الطعون لجعل عقوبة الإعدام أكثر فعالية، خصوصًا في قضايا الإرهاب (<a href="https://deathpenaltyinfo.org/documents/1996YearEndRpt.pdf">المصدر</a>).</p>
<p>أما الانقطاع الثاني فسببه وقف نفّذته المحكمة العليا أثناء نظرها في <a href="https://en.wikipedia.org/wiki/Baze_v._Rees">Baze v. Rees</a> الذي فحص ما إذا كانت الحقنة القاتلة تنتهك التعديل الثامن الذي يحظر &quot;العقوبة القاسية وغير المعتادة&quot;. وقد أثّر ذلك في التنفيذ في أنحاء أمريكا لأن معظم الولايات كانت تستخدم المزيج الدوائي نفسه الذي تستخدمه كنتاكي. ووافقت المحكمة العليا في النهاية على قرار محكمة كنتاكي، واستُؤنف التنفيذ في تكساس بعد أشهر قليلة.</p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>الفكرة الكبرى وراء <code>JOIN</code> هي إنشاء جدول موسّع لأن الجدول الأصلي لم يكن يحتوي المعلومات التي نحتاجها. وهذا مفهوم قوي لأنه يحرّرنا من قيود الجدول الواحد ويتيح لنا دمج جداول متعددة بطرق قد تكون معقّدة. وقد رأينا أيضًا أنه مع هذه التعقيدات الإضافية يصبح التنظيم الدقيق مهمًا. فإعطاء الجداول أسماء مستعارة (aliasing)، وإعادة تسمية الأعمدة، وتعريف عبارات <code>JOIN ON</code> جيدة، كلها تقنيات تساعدنا في الحفاظ على النظام.</p>
`,d={book:e,chapter:s,chapterTitle:a,slug:n,title:o,headings:c,html:t};export{e as book,s as chapter,a as chapterTitle,d as default,c as headings,t as html,n as slug,o as title};
