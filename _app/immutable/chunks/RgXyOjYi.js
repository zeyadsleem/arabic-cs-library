const s="use-the-index-luke",e="sql-explain-plan-mysql-access-filter-predicates",n="Distinguishing Access and Filter-Predicates",a="index",l="التمييز بين مُسندات الوصول والترشيح",p=[],c=`<p>تستخدم قاعدة بيانات MySQL ثلاث طرق مختلفة لتقييم جمل <code>where</code> (المُسندات):</p>
<p>مُسند وصول (عمودا «key_len» و«ref»)</p>
<p>تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index">اجتياز العقد الورقية</a>.</p>
<p>مُسند ترشيح الفهرس («Using index condition»، منذ MySQL 5.6)</p>
<p>تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.</p>
<p>مُسند ترشيح على مستوى الجدول («Using where» في عمود «Extra»)</p>
<p>تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من الجدول أولاً.</p>
<p>لا تُظهر خطط تنفيذ MySQL أنواع المُسندات المستخدمة لكل شرط — بل تسرد أنواع المُسندات المستخدمة فقط.</p>
<p>في المثال التالي، تُستخدم جملة <code>where</code> بأكملها كمُسند وصول:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> demo (
   id1 <span class="hljs-type">NUMERIC</span>
 , id2 <span class="hljs-type">NUMERIC</span>
 , id3 <span class="hljs-type">NUMERIC</span>
 , val <span class="hljs-type">NUMERIC</span>)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> demo <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> demo <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>,<span class="hljs-number">2</span>)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX demo_idx
          <span class="hljs-keyword">ON</span> demo
             (id1, id2, id3)
</code></pre>
<pre><code>EXPLAIN
 SELECT * 
   FROM demo
  WHERE id1=1
    AND id2=1
</code></pre>
<pre><code class="language-javascript">+------+----------+---------+-------------+------+-------+
| type | key      | key_len | ref         | rows | <span class="hljs-title class_">Extra</span> |
+------+----------+---------+-------------+------+-------+
| ref  | demo_idx | <span class="hljs-number">12</span>      | <span class="hljs-keyword">const</span>,<span class="hljs-keyword">const</span> |    <span class="hljs-number">1</span> |       |
+------+----------+---------+-------------+------+-------+
</code></pre>
<p>لا تظهر «Using where» ولا «Using index condition» في عمود «Extra». غير أن الفهرس مستخدم (<code>type=ref, key=demo_idx</code>)، لذا يمكنك افتراض أن جملة <code>where</code> بأكملها مؤهَّلة لتكون مُسند وصول.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-explain-my-filter&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>لاحظ أيضاً أن عمود <code>ref</code> يشير إلى استخدام عمودين من الفهرس (وكلاهما ثابت استعلام في هذا المثال). وثمة طريقة أخرى لتأكيد أي جزء من الفهرس مستخدم وهي قيمة <code>key_len</code>: فهي تُظهر أن الاستعلام يستخدم أول 12 بايت من تعريف الفهرس. ولو رغبت في ربط ذلك بأسماء الأعمدة، فكل ما «عليك» فعله هو معرفة مقدار مساحة التخزين التي يحتاجها كل عمود (انظر «<a href="https://dev.mysql.com/doc/refman/8.0/en/storage-requirements.html">متطلبات تخزين أنواع البيانات</a>» في وثائق MySQL). وفي غياب قيد <code>NOT NULL</code>، تحتاج MySQL بايت إضافياً لكل عمود. وعلى أي حال، يحتاج كل عمود <code>NUMERIC</code> في المثال 6 بايتات؛ ولذلك يؤكد طول المفتاح 12 أن أول عمودين في الفهرس مستخدمان كمُسندات وصول.</p>
<p>وعند الترشيح بالعمود <code>ID3</code> (بدلاً من <code>ID2</code>)، تستخدم MySQL 5.6 وما بعدها مُسند ترشيح فهرس («Using index condition»):</p>
<pre><code>EXPLAIN
 SELECT * 
   FROM demo
  WHERE id1=1
    AND id3=1
</code></pre>
<pre><code class="language-javascript">+------+----------+---------+-------+------+-----------------------+
| type | key      | key_len | ref   | rows | <span class="hljs-title class_">Extra</span>                 |
+------+----------+---------+-------+------+-----------------------+
| ref  | demo_idx | <span class="hljs-number">6</span>       | <span class="hljs-keyword">const</span> |    <span class="hljs-number">1</span> | <span class="hljs-title class_">Using</span> index condition |
+------+----------+---------+-------+------+-----------------------+
</code></pre>
<p>وفي هذه الحالة، يعني <code>ken_len=6</code> ووجود <code>const</code> واحد فقط في عمود <code>ref</code> أن عموداً واحداً فقط في الفهرس مستخدم كمُسند وصول.</p>
<p>وقد استخدمت إصدارات MySQL السابقة مُسند ترشيح على مستوى الجدول لهذا الاستعلام — ويُعرف بـ«Using where» في عمود «Extra»:</p>
<pre><code class="language-javascript">+------+----------+---------+-------+------+-------------+
| type | key      | key_len | ref   | rows | <span class="hljs-title class_">Extra</span>       |
+------+----------+---------+-------+------+-------------+
| ref  | demo_idx | <span class="hljs-number">6</span>       | <span class="hljs-keyword">const</span> |    <span class="hljs-number">1</span> | <span class="hljs-title class_">Using</span> where |
+------+----------+---------+-------+------+-------------+
</code></pre>
<h4>نصيحة</h4>
<ul>
<li>يشرح قسم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">«<em>أكبر من، وأصغر من، و<code>BETWEEN</code></em>»</a> الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.</li>
<li>ويبيّن <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل 3، «<em>الأداء وقابلية التوسع</em>»</a> فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.</li>
</ul>
`,o={book:s,chapter:e,chapterTitle:n,slug:a,title:l,headings:p,html:c};export{s as book,e as chapter,n as chapterTitle,o as default,p as headings,c as html,a as slug,l as title};
