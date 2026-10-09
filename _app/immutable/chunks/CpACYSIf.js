const e="use-the-index-luke",n="sql-explain-plan-mysql-getting-an-execution-plan",t="الحصول على خطة تنفيذ",s="index",o="الحصول على خطة تنفيذ",a=[],p=`<p>ضع <code>explain</code> قبل عبارة SQL لاسترجاع خطة التنفيذ.</p>
<pre><code>EXPLAIN SELECT 1
</code></pre>
<p>وتُعرض الخطة في صورة جدولية (مع حذف بعض الأعمدة الأقل أهمية):</p>
<pre><code>~+-------+------+---------------+------+~+------+------------~
~| table | type | possible_keys | key  |~| rows | Extra
~+-------+------+---------------+------+~+------+------------~
~| NULL  | NULL | NULL          | NULL |~| NULL | No tables...
~+-------+------+---------------+------+~+------+------------~
</code></pre>
<p>وأهم المعلومات في عمود <code>TYPE</code>. ومع أن وثائق MySQL تسميه «نوع الربط»، أفضّل وصفه بأنه «نوع الوصول» لأنه يحدد فعلاً كيفية الوصول إلى البيانات. ويُشرح معنى قيمة النوع في القسم التالي.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-plan-mysql-get&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
`,l={book:e,chapter:n,chapterTitle:t,slug:s,title:o,headings:a,html:p};export{e as book,n as chapter,t as chapterTitle,l as default,a as headings,p as html,s as slug,o as title};
