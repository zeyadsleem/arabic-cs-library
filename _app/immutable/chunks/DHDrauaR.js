const s="use-the-index-luke",e="sql-where-clause-obfuscation-concatenation",a="دمج الأعمدة",n="index",p="دمج الأعمدة",l=[],o=`<p>يتناول هذا القسم تعتيماً شائعاً يؤثر في <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index">الفهارس المُسلسلة</a>.</p>
<p>المثال الأول يتعلق مرة أخرى بأنواع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-dates/index">التاريخ والوقت</a> لكن في الاتجاه المعاكس. فاستعلام MySQL التالي يدمج عمودي تاريخ ووقت لتطبيق مرشّح نطاق عليهما معاً.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> ADDTIME(date_column, time_column)
     <span class="hljs-operator">&gt;</span> DATE_ADD(now(), <span class="hljs-type">INTERVAL</span> <span class="hljs-number">-1</span> <span class="hljs-keyword">DAY</span>)
</code></pre>
<p>إنه يختار جميع السجلات من آخر 24 ساعة. ولا يستطيع الاستعلام استخدام فهرس مُسلسل على (<code>DATE_COLUMN</code>، <code>TIME_COLUMN</code>) استخداماً سليماً لأن البحث لا يجري على الأعمدة المفهرسة بل على بيانات مشتقة.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-obf-concat&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>يمكنك تجنّب هذه المشكلة باستخدام نوع بيانات يضم مكوّن تاريخ ووقت معاً (مثل <code>DATETIME</code> في MySQL). وحينها يمكنك استخدام هذا العمود دون نداء دالة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> datetime_column
     <span class="hljs-operator">&gt;</span> DATE_ADD(now(), <span class="hljs-type">INTERVAL</span> <span class="hljs-number">-1</span> <span class="hljs-keyword">DAY</span>)
</code></pre>
<p>للأسف، لا يكون تغيير الجدول ممكناً في كثير من الأحيان عند مواجهة هذه المشكلة.</p>
<p>والخيار التالي هو <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">فهرس قائم على دالة</a> إذا كانت قاعدة البيانات تدعمه—رغم أن له كل العيوب <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-dates/index">التي نوقشت سابقاً</a>. وعند استخدام MySQL، لا تكون الفهارس القائمة على الدوال خياراً على أي حال.</p>
<p>لا يزال ممكناً كتابة الاستعلام بحيث تستطيع قاعدة البيانات استخدام فهرس مُسلسل على <code>DATE_COLUMN</code> و<code>TIME_COLUMN</code> مع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index#imp-index-predicate-types">مُسند وصول</a>—جزئياً على الأقل. ولذلك نضيف شرطاً إضافياً على <code>DATE_COLUMN</code>.</p>
<pre><code> WHERE ADDTIME(date_column, time_column)
     &gt; DATE_ADD(now(), INTERVAL -1 DAY)
   AND date_column
    &gt;= DATE(DATE_ADD(now(), INTERVAL -1 DAY))
</code></pre>
<p>الشرط الجديد زائد تماماً لكنه مرشّح مباشر على <code>DATE_COLUMN</code> يمكن استخدامه كمُسند وصول. ورغم أن هذه التقنية ليست مثالية، فهي تقريب جيد بما يكفي عادةً.</p>
<h4>نصيحة</h4>
<p>استخدم شرطاً زائداً على العمود الأكثر أهمية عندما يجمع شرط نطاق بين عدة أعمدة.</p>
<p>وبالنسبة لـPostgreSQL، يُفضَّل استخدام <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-fetch-next-page/index#ch07-paging-row-values-example">صيغة قيم الصف</a>.</p>
<p>يمكنك أيضاً استخدام هذه التقنية عند تخزين التاريخ والوقت في أعمدة نصية، لكن عليك استخدام تنسيقات تاريخ ووقت تعطي ترتيباً زمنياً عند الفرز معجمياً—مثل ما تقترحه <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> (<code>YYYY-MM-DD HH:MM:SS</code>). ويستخدم المثال التالي دالة <code>TO_CHAR</code> في قاعدة بيانات Oracle لهذا الغرض:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> date_string <span class="hljs-operator">||</span> time_string
     <span class="hljs-operator">&gt;</span> TO_CHAR(sysdate <span class="hljs-operator">-</span> <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;YYYY-MM-DD HH24:MI:SS&#x27;</span>)
   <span class="hljs-keyword">AND</span> date_string
    <span class="hljs-operator">&gt;=</span> TO_CHAR(sysdate <span class="hljs-operator">-</span> <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>)
</code></pre>
<p>سنواجه مشكلة تطبيق شرط نطاق على عدة أعمدة مرة أخرى في القسم المعنون <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-fetch-next-page/index">«<em>الترقيم عبر النتائج</em>»</a>. وسنستخدم أيضاً طريقة التقريب نفسها للتخفيف منها.</p>
<p>أحياناً تكون لدينا الحالة المعاكسة وقد نريد تعتيم شرط عن قصد بحيث لا يمكن استخدامه كمُسند وصول بعد الآن. وقد نظرنا في تلك المشكلة عند مناقشة آثار <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">معاملات الربط</a> على شروط <code>LIKE</code>. تأمّل المثال التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> last_name, first_name, employee_id
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> subsidiary_id <span class="hljs-operator">=</span> ?
   <span class="hljs-keyword">AND</span> last_name <span class="hljs-keyword">LIKE</span> ?
</code></pre>
<p>بافتراض وجود فهرس على <code>SUBSIDIARY_ID</code> وآخر على <code>LAST_NAME</code>، أيهما أفضل لهذا الاستعلام؟</p>
<p>دون معرفة موضع المحرف البديل في مصطلح البحث، يستحيل تقديم جواب دقيق. ولا يملك المُحسِّن (optimizer) خياراً آخر سوى «التخمين». وإذا <em>كنت تعرف</em> أن هناك دائماً محرفاً بديلاً بادئاً، يمكنك تعتيم شرط <code>LIKE</code> عن قصد بحيث لا يستطيع المُحسِّن بعد ذلك اعتبار الفهرس على <code>LAST_NAME</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> last_name, first_name, employee_id
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> subsidiary_id <span class="hljs-operator">=</span> ?
   <span class="hljs-keyword">AND</span> last_name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;&#x27;</span> <span class="hljs-keyword">LIKE</span> ?
</code></pre>
<p>يكفي إلحاق سلسلة فارغة بالعمود <code>LAST_NAME</code>. غير أن هذا خيار الملاذ الأخير. لا تفعله إلا عند الضرورة القصوى.</p>
`,c={book:s,chapter:e,chapterTitle:a,slug:n,title:p,headings:l,html:o};export{s as book,e as chapter,a as chapterTitle,c as default,l as headings,o as html,n as slug,p as title};
