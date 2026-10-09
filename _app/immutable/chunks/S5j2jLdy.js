const e="use-the-index-luke",o="sql-sorting-grouping-indexed-group-by",s="فهرسة التجميع حسب",n="index",a="فهرسة Group By",p=[],c=`<p>تستخدم قواعد بيانات SQL خوارزميتين مختلفتين تماماً لـ<code>group by</code>. الأولى، وهي خوارزمية التجزئة، تجمّع سجلات المدخلات في جدول تجزئة مؤقت، وبعد معالجة جميع سجلات المدخلات يُعاد جدول التجزئة كنتيجة. أما الثانية، وهي خوارزمية الفرز/التجميع، فترتّب بيانات المدخلات أولاً بمفتاح التجميع بحيث تتبع صفوف كل مجموعة بعضها بعضاً مباشرةً، ثم تحتاج قاعدة البيانات بعد ذلك إلى تجميعها فقط. وعموماً تحتاج الخوارزميتان إلى تجسيد حالة وسيطة، فلا تُنفَّذان على نحو متدفق. ومع ذلك تستطيع خوارزمية الفرز/التجميع استخدام فهرس لتجنّب عملية الفرز، فيصبح <code>group by</code> متدفقاً بذلك.</p>
<h4>ملاحظة</h4>
<p>لا تستخدم MySQL 8.0 خوارزمية التجزئة. ومع ذلك فإن <a href="https://dev.mysql.com/doc/refman/8.0/en/group-by-optimization.html">تحسين خوارزمية الفرز/التجميع</a> يعمل كما هو موصوف أدناه.</p>
<p>تأمّل الاستعلام التالي: فهو يعرض إيرادات الأمس مجموعةً حسب <code>PRODUCT_ID</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">sum</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
</code></pre>
<p>وبمعرفة الفهرس على <code>SALE_DATE</code> و<code>PRODUCT_ID</code> من <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-order-by-asc-desc-nulls-last/index">القسم السابق</a>، تكون خوارزمية الفرز/التجميع أنسب لأن <code>INDEX RANGE SCAN</code> يعيد الصفوف تلقائياً بالترتيب المطلوب. ويعني ذلك أن قاعدة البيانات تتجنّب التجسيد لأنها لا تحتاج إلى عملية فرز صريحة — فيُنفَّذ <code>group by</code> على نحو متدفق.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
------------------------------------------------------------
ID | Operation             |                     Rows | Cost
 1 | RETURN                |                          |  675
 2 |  GRPBY (COMPLETE)     |      25 of 387 (  6.46%) |  675
 3 |   FETCH SALES         |     387 of 387 (100.00%) |  675
 4 |    IXSCAN SALES_DT_PR | 387 of 1009326 (   .04%) |   24

Predicate Information
 4 - START (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
      STOP (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
</code></pre>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |   17 |  192 |
| 1 | SORT GROUP BY NOSORT        |             |   17 |  192 |
| 2 |  TABLE ACCESS BY INDEX ROWID| SALES       |  321 |  192 |
|*3 |   INDEX RANGE SCAN          | SALES_DT_PR |  321 |    3 |
---------------------------------------------------------------
</code></pre>
<p>ووسمت خطة تنفيذ قاعدة بيانات Oracle عملية <code>SORT GROUP BY</code> المتدفقة بالإضافة <code>NOSORT</code>. أما خطط تنفيذ قواعد البيانات الأخرى فلا تذكر أي عملية فرز إطلاقاً.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-group&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وللـ<code>group by</code> المتدفق المتطلبات المسبقة نفسها التي لـ<code>order by</code> المتدفق، باستثناء عدم وجود مُعدِّلَي <code>ASC</code> و<code>DESC</code>. ويعني ذلك أن تعريف فهرس بمُعدِّلَي <code>ASC</code>/<code>DESC</code> لا ينبغي أن يؤثر في تنفيذ <code>group by</code> المتدفق. وينطبق الأمر نفسه على <code>NULLS FIRST</code>/<code>LAST</code>. ومع ذلك توجد قواعد بيانات لا تستطيع استخدام فهرس <code>ASC</code>/<code>DESC</code> استخداماً سليماً من أجل <code>group by</code> متدفق.</p>
<h4>تحذير</h4>
<p>لا ينفّذ PostgreSQL تلقائياً <code>group by</code> متدفقاً إذا كان الفهرس يعالج قيمة <code>NULL</code> كأصغر قيمة ممكنة. وإضافة جملة <code>order by</code> بترتيب الفهرس تتجاوز هذه المشكلة.</p>
<p>ولا تستطيع قاعدة بيانات Oracle قراءة فهرس بالاتجاه المعاكس لتنفيذ <code>group by</code> متدفق يتبعه <code>order by</code>.</p>
<p>وتتوفر مزيد من التفاصيل في الملحقين المعنيين: <a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-postgresql-sorting-grouping/index#apc-pg-ord-group">PostgreSQL</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-oracle-sorting-grouping/index#apc-ora-ord-group">Oracle</a>.</p>
<p>وإذا وسّعنا الاستعلام ليشمل جميع المبيعات <em>منذ الأمس</em>، كما فعلنا في مثال <code>order by</code> المتدفق، فسيُمنع <code>group by</code> المتدفق للسبب نفسه السابق: إذ لا يعيد <code>INDEX RANGE SCAN</code> الصفوف مرتَّبة بمفتاح التجميع (قارن <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index#fig-order-concat">الشكل 6.1</a>).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">sum</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
</code></pre>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
--------------------------------------------------------------------
ID | Operation                   |                      Rows |  Cost
 1 | RETURN                      |                           | 12527
 2 |  GRPBY (FINAL)              |        25 of 25 (100.00%) | 12527
 3 |   TBSCAN                    |        25 of 25 (100.00%) | 12527
 4 |    SORT (INTERMEDIATE)      |        25 of 25 (100.00%) | 12527
 5 |     GRPBY (HASHED PARTIAL)  |      25 of 8050 (   .31%) | 12527
 6 |      FETCH SALES            |    8050 of 8050 (100.00%) | 12526
 7 |       RIDSCN                |    8050 of 8050 (100.00%) |   375
 8 |        SORT (UNIQUE)        |    8050 of 8050 (100.00%) |   375
 9 |         IXSCAN SALES_DT_PR  | 8050 of 1009326 (   .80%) |   372
</code></pre>
<p>واستُخدم شرط <code>where</code> التالي للحصول على هذه النتيجة: <code>WHERE sale_date &gt;= CURRENT_DATE - 1 MONTH</code>.</p>
<p>وبالمقارنة مع خطة تنفيذ Oracle، تبدو هذه معقدة أكثر من اللازم. ويرجع ذلك إلى أمرين:</p>
<ul>
<li>تُظهر Db2 صراحةً عملية فرز حسب موقع التخزين الفيزيائي بين الوصول إلى الفهرس والوصول إلى الجدول (العمليتان 7 و8).</li>
<li>تنفّذ Db2 تجميعاً على مرحلتين: فهي تجري أولاً تجميعاً جزئياً لتقليل كمية البيانات المطلوب فرزها في أبكر وقت ممكن (العملية 5)، ثم تنفّذ <code>SORT</code> + <code>GRPBY</code> عاديين.</li>
</ul>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |   24 |  356 |
| 1 | HASH GROUP BY               |             |   24 |  356 |
| 2 |  TABLE ACCESS BY INDEX ROWID| SALES       |  596 |  355 |
|*3 |   INDEX RANGE SCAN          | SALES_DT_PR |  596 |    4 |
---------------------------------------------------------------
</code></pre>
<p>لكن قاعدة بيانات Oracle تستخدم خوارزمية التجزئة بدلاً من ذلك. وميزة خوارزمية التجزئة أنها تحتاج إلى تخزين <em>النتيجة المجمَّعة</em> مؤقتاً فقط، بينما تجسّد خوارزمية الفرز/التجميع <em>مجموعة المدخلات كاملة</em>. وبعبارة أخرى: تحتاج خوارزمية التجزئة ذاكرة أقل.</p>
<p>وكما في <code>order by</code> المتدفق، ليس التنفيذ السريع أهم جانب في تنفيذ <code>group by</code> المتدفق؛ فالأهم أن تنفّذه قاعدة البيانات على نحو متدفق وتسلّم النتيجة الأولى قبل قراءة المدخلات كلها. وهذا شرط مسبق لأساليب التحسين المتقدمة المشروحة في <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results/index">الفصل التالي</a>.</p>
<h4>فكّر في الأمر</h4>
<p>هل يمكنك التفكير في عملية قاعدة بيانات أخرى — غير الفرز والتجميع — قد تستخدم فهرساً لتجنّب الفرز؟</p>
`,d={book:e,chapter:o,chapterTitle:s,slug:n,title:a,headings:p,html:c};export{e as book,o as chapter,s as chapterTitle,d as default,p as headings,c as html,n as slug,a as title};
