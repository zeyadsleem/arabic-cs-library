const s="use-the-index-luke",e="sql-where-clause-null-not-null-constraint",a="قيود NOT NULL",n="index",p="قيود `NOT NULL`",o=[],l=`<p>لفهرسة شرط <code>IS NULL</code> في قاعدة بيانات Oracle، يجب أن يحتوي الفهرس على عمود لا يمكن أن يكون <code>NULL</code> أبداً.</p>
<p>ومع ذلك، لا يكفي ألا توجد مدخلات <code>NULL</code>؛ إذ يجب أن تتأكد قاعدة البيانات من أنه لا يمكن أن يوجد مدخل <code>NULL</code> أبداً، وإلا وجب عليها أن تفترض أن الجدول يحتوي صفوفاً غير موجودة في الفهرس.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-knowingnotnull&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>يدعم الفهرس التالي الاستعلام فقط إذا كان العمود <code>LAST_NAME</code> يحمل قيد <code>NOT NULL</code>:</p>
<pre><code>DROP INDEX emp_dob
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_dob_name
          <span class="hljs-keyword">ON</span> employees (date_of_birth, last_name)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
</code></pre>
<p>وتؤدي إزالة قيد <code>NOT NULL</code> إلى جعل الفهرس غير قابل للاستخدام في هذا الاستعلام:</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees MODIFY last_name <span class="hljs-keyword">NULL</span>
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
</code></pre>
<h4>نصيحة</h4>
<p>قد يمنع غياب قيد <code>NOT NULL</code> استخدام الفهرس في قاعدة بيانات Oracle — وبخاصة في استعلامات <code>count(*)</code>.</p>
<p>وإلى جانب قيود <code>NOT NULL</code>، تعلم قاعدة البيانات أيضاً أن التعبيرات الثابتة، كما في <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null-index/index">القسم السابق</a>، لا يمكن أن تصبح <code>NULL</code>.</p>
<p>غير أن الفهرس على دالة معرّفة من المستخدم لا يفرض قيد <code>NOT NULL</code> على تعبير الفهرس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE <span class="hljs-keyword">FUNCTION</span> blackbox(id <span class="hljs-keyword">IN</span> NUMBER) <span class="hljs-keyword">RETURN</span> NUMBER
<span class="hljs-keyword">DETERMINISTIC</span>
<span class="hljs-keyword">IS</span> <span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">RETURN</span> id;
<span class="hljs-keyword">END</span>
</code></pre>
<pre><code>DROP INDEX emp_dob_name
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_dob_bb 
    <span class="hljs-keyword">ON</span> employees (date_of_birth, blackbox(employee_id))
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
</code></pre>
<pre><code>----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    1 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    1 |  477 |
----------------------------------------------------
</code></pre>
<p>ويؤكد اسم الدالة <code>BLACKBOX</code> أن المُحسِّن لا يعرف شيئاً عما تفعله الدالة (انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">«<em>البحث غير الحسّاس لحالة الأحرف باستخدام <code>UPPER</code> أو <code>LOWER</code></em>»</a>). ويمكننا أن نرى أن الدالة تمرّر قيمة الإدخال كما هي، لكنها بالنسبة إلى قاعدة البيانات مجرد دالة تعيد عدداً؛ وقد فُقدت خاصية <code>NOT NULL</code> الخاصة بالمعامل. ومع أن الفهرس يجب أن يحتوي جميع الصفوف، فقاعدة البيانات لا تعلم ذلك، ولذلك لا تستطيع استخدام الفهرس في الاستعلام.</p>
<p>وإذا <em>كنت تعلم</em> أن الدالة لا تعيد <code>NULL</code> أبداً، كما في هذا المثال، فيمكنك تغيير الاستعلام ليعكس ذلك:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
   <span class="hljs-keyword">AND</span> blackbox(employee_id) <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
</code></pre>
<pre><code>-------------------------------------------------------------
|Id |Operation                   | Name       | Rows | Cost |
-------------------------------------------------------------
| 0 |SELECT STATEMENT            |            |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES  |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_BB |    1 |    2 |
-------------------------------------------------------------
</code></pre>
<p>الشرط الإضافي في جملة <code>where</code> صحيح دائماً، ولذلك لا يغيّر النتيجة. ومع ذلك تدرك قاعدة بيانات Oracle أنك تستعلم فقط عن صفوف يجب أن تكون في الفهرس بحكم التعريف.</p>
<p>لا توجد، للأسف، طريقة لوسم دالة لا تعيد <code>NULL</code> أبداً، لكن يمكنك نقل استدعاء الدالة إلى <a href="https://modern-sql.com/caniuse/generated-always-as">عمود محسوب</a> (منذ 11<em>g</em>) ووضع قيد <code>NOT NULL</code> على هذا العمود.</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> bb_expression
      GENERATED ALWAYS <span class="hljs-keyword">AS</span> (blackbox(employee_id)) <span class="hljs-keyword">NOT NULL</span>
</code></pre>
<pre><code>DROP   INDEX emp_dob_bb
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_dob_bb 
    <span class="hljs-keyword">ON</span> employees (date_of_birth, bb_expression)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
   <span class="hljs-keyword">AND</span> blackbox(employee_id) <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
</code></pre>
<pre><code>-------------------------------------------------------------
|Id |Operation                   | Name       | Rows | Cost |
-------------------------------------------------------------
| 0 |SELECT STATEMENT            |            |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES  |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_BB |    1 |    2 |
-------------------------------------------------------------
</code></pre>
<p>وتعلم قاعدة بيانات Oracle أن بعض الدوال الداخلية لا تعيد <code>NULL</code> إلا إذا مُرِّرت <code>NULL</code> كإدخال.</p>
<pre><code>DROP INDEX emp_dob_bb
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_dob_upname 
    <span class="hljs-keyword">ON</span> employees (date_of_birth, <span class="hljs-built_in">upper</span>(last_name))
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
</code></pre>
<pre><code>----------------------------------------------------------
|Id |Operation                   | Name           | Cost |
----------------------------------------------------------
| 0 |SELECT STATEMENT            |                |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES      |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_UPNAME |    2 |
----------------------------------------------------------
</code></pre>
<p>وتحافظ دالة <code>UPPER</code> على خاصية <code>NOT NULL</code> الخاصة بالعمود <code>LAST_NAME</code>. غير أن إزالة القيد تجعل الفهرس غير قابل للاستخدام:</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees MODIFY last_name <span class="hljs-keyword">NULL</span>
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
</code></pre>
<pre><code>----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    1 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    1 |  477 |
----------------------------------------------------
</code></pre>
`,c={book:s,chapter:e,chapterTitle:a,slug:n,title:p,headings:o,html:l};export{s as book,e as chapter,a as chapterTitle,c as default,o as headings,l as html,n as slug,p as title};
