const e="use-the-index-luke",n="sql-explain-plan-postgresql-getting-an-execution-plan",o="Getting an Execution Plan",t="index",c="الحصول على خطة تنفيذ",p=[],s=`<p>تُسترجَع خطة تنفيذ PostgreSQL بوضع أمر <code>explain</code> قبل عبارة SQL. غير أن هناك قيداً مهماً واحداً: عبارات SQL التي تستخدم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">وسائط ربط</a> (مثل <code>$1</code> و<code>$2</code> وما إلى ذلك) لا يمكن شرحها بهذه الطريقة — بل يجب تحضيرها أولاً:</p>
<pre><code>PREPARE stmt(int) AS SELECT $1
</code></pre>
<p>لاحظ أن PostgreSQL يستخدم «<code>$n</code>» لوسائط الربط. وقد تخفي طبقة تجريد قاعدة البيانات لديك ذلك فتستطيع استخدام علامات الاستفهام كما يعرّفها معيار SQL.</p>
<p>ويمكن شرح تنفيذ العبارة المحضَّرة:</p>
<pre><code>EXPLAIN EXECUTE stmt(1)
</code></pre>
<p>منذ PostgreSQL 9.2، تأجّل إنشاء خطة التنفيذ إلى وقت التنفيذ، فيأخذ القيم الفعلية لوسائط الربط في الحسبان. وللحصول على خطة تنفيذ لا تراعي القيم الفعلية لوسائط الربط، أدخل PostgreSQL 16 <a href="https://www.postgresql.org/docs/current/sql-explain.html#id-1.9.3.148.8">خيار <code>generic_plan</code> في <code>explain</code></a>.</p>
<h4>ملاحظة</h4>
<p>يمكن شرح العبارات بلا وسائط ربط مباشرةً:</p>
<pre><code>EXPLAIN SELECT 1
</code></pre>
<p>وفي هذه الحالة كان المُحسِّن يراعي دائماً القيم الفعلية أثناء تخطيط الاستعلام.</p>
<p>وخرج خطة الشرح كما يلي:</p>
<pre><code>                QUERY PLAN                
------------------------------------------
 Result  (cost=0.00..0.01 rows=1 width=0)
</code></pre>
<p>ويحمل الخرج معلومات مشابهة لخطط تنفيذ Oracle المعروضة في الكتاب: اسم العملية («Result»)، والتكلفة المتصلة، وتقدير عدد الصفوف، وعرض الصف المتوقع.</p>
<p>لاحظ أن PostgreSQL يعرض قيمتَي تكلفة: الأولى تكلفة بدء التشغيل، والثانية التكلفة الكلية للتنفيذ إذا استُرجعت جميع الصفوف. أما خطة تنفيذ قاعدة بيانات Oracle فتعرض القيمة الثانية فقط.</p>
<p>ولأمر <code>explain</code> في PostgreSQL خيارات كثيرة، وأنفعها <code>analyze</code> و<code>buffers</code> و<code>settings</code>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-plan-pg-get&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وتفعيل خيار <code>analyze</code> يعني أن خطة التنفيذ لا تُنشأ فحسب بل تُنفَّذ أيضاً. ويستلزم ذلك حدوث الآثار الجانبية لتشغيل العبارة المشروحة، مثل حذف الصفوف عند شرح عبارة <code>delete</code>. ويمكنك إحاطة <code>explain</code> بمعاملة والتراجع عنها بعد ذلك إن لم ترد أن تبقى تلك الآثار الجانبية.</p>
<h4>تحذير</h4>
<p>ينفّذ <code>explain analyze</code> العبارة المشروحة، حتى إذا كانت عبارة <code>insert</code> أو <code>update</code> أو <code>delete</code>.</p>
<p>ويتيح تشغيل العبارة جمع معايير زمن التشغيل مثل الزمن والعدد الفعلي للصفوف التي تنتجها كل عملية. ويحصي الخيار <code>buffers</code> أيضاً عدد كتل قاعدة البيانات التي يُوصَل إليها.</p>
<p>وأخيراً، يعرض الخيار <code>settings</code> الإعدادات المختلفة عن قيمها الافتراضية.</p>
<pre><code>BEGIN
</code></pre>
<pre><code>EXPLAIN (ANALYZE, BUFFERS, SETTINGS)
EXECUTE stmt(1)
</code></pre>
<pre><code>                   QUERY PLAN
--------------------------------------------------
 Result  (cost=0.00..0.01 rows=1 width=4)
         (actual time=0.001..0.002 rows=1 loops=1)
 Settings: random_page_cost = '1.1'
 Planning Time: 0.032 ms
 Execution Time: 0.078 ms
</code></pre>
<pre><code>ROLLBACK
</code></pre>
<p>لاحظ أن الخطة نُسِّقت لتلائم الصفحة على نحو أفضل. ويعرض PostgreSQL القيم «الفعلية» على السطر نفسه الذي تظهر فيه القيم المقدَّرة.</p>
<p>وعدد الصفوف هو القيمة الوحيدة المعروضة في الجزأين — في الأرقام المقدَّرة والفعلية — ما يتيح لك العثور سريعاً على تقديرات العددية الخاطئة.</p>
<p>وأخيراً وليس آخراً، يجب إغلاق العبارات المحضَّرة مرة أخرى:</p>
<pre><code>DEALLOCATE stmt
</code></pre>
<h4>نصيحة</h4>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">وسائط الربط</a></p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index">تجنّب المنطق الذكي لجمل <code>WHERE</code> الشرطية</a></p>
<p>مقال «<a href="https://use-the-index-luke.com/blog/2011-07-16/planning-for-reuse">التخطيط لإعادة الاستخدام</a>»</p>
`,d={book:e,chapter:n,chapterTitle:o,slug:t,title:c,headings:p,html:s};export{e as book,n as chapter,o as chapterTitle,d as default,p as headings,s as html,t as slug,c as title};
