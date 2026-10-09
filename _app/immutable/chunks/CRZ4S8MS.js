const e="use-the-index-luke",a="sql-where-clause",i="بَند WHERE",r="index",l="عبارة where",s=[{depth:2,id:"المحتويات",text:"المحتويات"}],n=`<p>وصف <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">الفصل السابق</a> بنية الفهارس وشرح سبب ضعف أداء الفهارس. وفي الخطوة التالية نتعلّم كيف نكتشف هذه المشكلات ونتجنبها في عبارات SQL. نبدأ بالنظر إلى عبارة <code>where</code>.</p>
<p>تحدّد عبارة <code>where</code> شرط البحث في عبارة SQL، وبذلك تقع في المجال الوظيفي الأساسي للفهرس: العثور على البيانات بسرعة. ورغم أن لعبارة <code>where</code> تأثيراً هائلاً في الأداء، فإنها غالباً ما تُصاغ بإهمال بحيث تضطر قاعدة البيانات (database) إلى مسح جزء كبير من الفهرس. والنتيجة: عبارة <code>where</code> سيئة الصياغة هي المكوّن الأول لاستعلام بطيء.</p>
<p>يشرح هذا الفصل كيف تؤثر مختلف المعاملات في استخدام الفهرس، وكيف نضمن أن يكون الفهرس صالحاً لأكبر عدد ممكن من الاستعلامات. ويعرض القسم الأخير أنماطاً مضادة شائعة (anti-patterns) ويقدّم بدائل تحقق أداءً أفضل.</p>
<h2 id="المحتويات">المحتويات</h2>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator/index">معامل التساوي</a></em> — بحث دقيق بالمفتاح*<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-primary-keys/index">المفاتيح الأساسية</a>* — التحقق من استخدام الفهرس</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index">المفاتيح المُسلسلة</a></em> — فهارس متعددة الأعمدة</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index">الفهارس البطيئة، الجزء الثاني</a></em> — المكوّن الأول، مرة أخرى</li>
</ol>
<p><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions/index">الدوال</a></em> — استخدام الدوال في عبارة <code>where</code></p>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">بحث غير حساس لحالة الأحرف</a></em> — <code>UPPER</code> و<code>LOWER</code></li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index">الدوال المعرّفة من المستخدم</a></em> — قيود الفهارس القائمة على الدوال</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-over-indexing/index">الإفراط في الفهرسة</a></em> — تجنّب التكرار</li>
</ol>
<p><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">متغيّرات الربط</a></em> — للأمان والأداء</p>
<p><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges/index">البحث عن النطاقات</a></em> — ما بعد التساوي</p>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">أكبر وأصغر و<code>BETWEEN</code></a></em> — ترتيب الأعمدة مرة أخرى</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index">فهرسة مرشّحات <code>LIKE</code> في SQL</a></em> — <code>LIKE</code> ليس للبحث النصي الكامل</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-index-merge-performance/index">دمج الفهارس</a></em> — لماذا لا نستخدم فهرساً لكل عمود؟</li>
</ol>
<p><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-partial-and-filtered-indexes/index">الفهارس الجزئية</a></em> — فهرسة صفوف مختارة</p>
<p><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null/index"><code>NULL</code> في قاعدة بيانات Oracle</a></em> — خصوصية مهمة</p>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null-index/index"><code>NULL</code> في الفهارس</a></em> — كل فهرس هو فهرس جزئي</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null-not-null-constraint/index">قيود <code>NOT NULL</code></a></em> — تؤثر في استخدام الفهارس</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null-partial-index/index">محاكاة الفهارس الجزئية</a></em> — باستخدام الفهرسة القائمة على الدوال</li>
</ol>
<p><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation/index">الشروط المُعتَّمة</a></em> — أنماط مضادة شائعة</p>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-dates/index">التواريخ</a></em> — انتبه انتباهاً خاصاً لأنواع <code>DATE</code></li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-numeric-strings/index">السلاسل الرقمية</a></em> — لا تخلط الأنواع</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-concatenation/index">دمج الأعمدة</a></em> — استخدم عبارات <code>where</code> زائدة</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index">المنطق الذكي</a></em> — أذكى طريقة لإبطاء SQL</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-math/index">الرياضيات</a></em> — قواعد البيانات لا تحل المعادلات</li>
</ol>
`,c={book:e,chapter:a,chapterTitle:i,slug:r,title:l,headings:s,html:n};export{e as book,a as chapter,i as chapterTitle,c as default,s as headings,n as html,r as slug,l as title};
