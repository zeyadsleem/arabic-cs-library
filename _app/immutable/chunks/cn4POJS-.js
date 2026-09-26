const s="db-design",a="chapter-sql-dml",n="SQL Data Manipulation",l="index",p="معالجة البيانات في SQL",e=[{depth:2,id:"عبارة-select-مع-معيار-where",text:"عبارة SELECT مع معيار WHERE"},{depth:2,id:"استخدام-المحارف-البديلة-wildcards-في-جملة-like",text:"استخدام المحارف البديلة (wildcards) في جملة LIKE"},{depth:2,id:"عبارة-select-مع-جملة-order-by-ترتيب-حسب",text:"عبارة SELECT مع جملة ORDER BY (ترتيب حسب)"},{depth:2,id:"عبارة-select-مع-جملة-group-by-تجميع-حسب",text:"عبارة SELECT مع جملة GROUP BY (تجميع حسب)"},{depth:3,id:"استخدام-count-مع-group-by",text:"استخدام COUNT مع GROUP BY"},{depth:3,id:"استخدام-avg-وsum-مع-group-by",text:"استخدام AVG وSUM مع GROUP BY"},{depth:2,id:"تقييد-الصفوف-باستخدام-having",text:"تقييد الصفوف باستخدام HAVING"},{depth:2,id:"عبارة-insert",text:"عبارة INSERT"},{depth:3,id:"إدراج-قيم-محددة-في-عمود-identity",text:"إدراج قيم محدَّدة في عمود IDENTITY"},{depth:3,id:"إدراج-الصفوف-بعبارة-select",text:"إدراج الصفوف بعبارة SELECT"},{depth:2,id:"عبارة-update",text:"عبارة UPDATE"},{depth:3,id:"تضمين-استعلامات-فرعية-subqueries-في-عبارة-update",text:"تضمين استعلامات فرعية (subqueries) في عبارة UPDATE"},{depth:2,id:"عبارة-delete",text:"عبارة DELETE"},{depth:2,id:"الدوال-التجميعية-aggregate-functions",text:"الدوال التجميعية (aggregate functions)"},{depth:2,id:"دالة-التحويل-conversion-function",text:"دالة التحويل (conversion function)"},{depth:2,id:"دالة-التاريخ-date-function",text:"دالة التاريخ (date function)"},{depth:2,id:"الدوال-الرياضية-mathematical-functions",text:"الدوال الرياضية (mathematical functions)"},{depth:2,id:"الضم-الداخلي-inner-join",text:"الضمّ الداخلي (inner join)"},{depth:2,id:"الضم-الخارجي-الأيسر-left-outer-join",text:"الضمّ الخارجي الأيسر (left outer join)"},{depth:2,id:"الضم-الخارجي-الأيمن-right-outer-join",text:"الضمّ الخارجي الأيمن (right outer join)"},{depth:2,id:"الضم-الخارجي-الكامل-full-outer-join",text:"الضمّ الخارجي الكامل (full outer join)"},{depth:2,id:"الضم-المتقاطع-cross-join",text:"الضمّ المتقاطع (cross join)"}],o=`<p>المتن الرئيسي</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span>  FirstName, LastName, phone

<span class="hljs-keyword">FROM</span> Employees

<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> LastName
</code></pre>
<p>تُستخدم لغة معالجة البيانات (data manipulation language)‏ (DML) في SQL للاستعلام عن بيانات قاعدة البيانات وتعديلها. وفي هذا الفصل، سنشرح كيفية استخدام عبارات أوامر DML في SQL وهي SELECT وINSERT وUPDATE وDELETE، والمعرَّفة أدناه.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> PubName, city

<span class="hljs-keyword">FROM</span> Publishers
</code></pre>
<ul>
<li>SELECT – للاستعلام عن البيانات في قاعدة البيانات</li>
<li>INSERT – لإدراج البيانات في جدول</li>
<li>UPDATE – لتحديث البيانات في جدول</li>
<li>DELETE – لحذف البيانات من جدول</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> PubName city

<span class="hljs-keyword">FROM</span> Publishers
</code></pre>
<p>في عبارة DML الخاصة بـ SQL:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> StorID, qty, TitleID

<span class="hljs-keyword">FROM</span> Sales

<span class="hljs-keyword">WHERE</span> qty <span class="hljs-keyword">BETWEEN</span> <span class="hljs-number">20</span> <span class="hljs-keyword">and</span> <span class="hljs-number">50</span>  (includes the <span class="hljs-number">20</span> <span class="hljs-keyword">and</span> <span class="hljs-number">50</span>)
</code></pre>
<ul>
<li>يجب أن تبدأ كل جملة (clause) في العبارة على سطر جديد.</li>
<li>يجب أن تصطف بداية كل جملة عند المحاذاة نفسها مع بداية الجمل الأخرى.</li>
<li>إذا كانت لأحد الجمل عدة أجزاء، فيجب أن تظهر في أسطر منفصلة وتُزاح إلى الداخل تحت بداية الجملة لإظهار العلاقة بينها.</li>
<li>تُستخدم الأحرف الكبيرة لتمثيل الكلمات المحجوزة (reserved words).</li>
<li>تُستخدم الأحرف الصغيرة لتمثيل الكلمات التي عرّفها المستخدم.</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> StorID, qty, TitleID

<span class="hljs-keyword">FROM</span> Sales

<span class="hljs-keyword">WHERE</span> qty <span class="hljs-operator">&gt;=</span> <span class="hljs-number">20</span> <span class="hljs-keyword">and</span> qty  <span class="hljs-operator">&lt;=</span> <span class="hljs-number">50</span>
</code></pre>
<h1>عبارة SELECT</h1>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> StorID, qty, TitleID

<span class="hljs-keyword">FROM</span> Sales

<span class="hljs-keyword">WHERE</span> qty <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">BETWEEN</span> <span class="hljs-number">20</span> <span class="hljs-keyword">and</span> <span class="hljs-number">50</span>
</code></pre>
<p>تتيح عبارة SELECT، أو الأمر، للمستخدم استخراج البيانات من الجداول (tables) وفق معايير محدَّدة. وتُنفَّذ وفق التسلسل التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>

<span class="hljs-keyword">FROM</span> Publishers

<span class="hljs-keyword">WHERE</span> province <span class="hljs-operator">=</span> ‘BC’ <span class="hljs-keyword">OR</span> province <span class="hljs-operator">=</span> ‘AB’ <span class="hljs-keyword">OR</span> province <span class="hljs-operator">=</span> ‘<span class="hljs-keyword">ON</span>’
</code></pre>
<p>SELECT DISTINCT item(s) FROM table(s) WHERE predicate GROUP BY field(s) ORDER BY fields</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>

<span class="hljs-keyword">FROM</span> Publishers

<span class="hljs-keyword">WHERE</span> province <span class="hljs-keyword">IN</span> (‘BC’, ‘AB’, ‘<span class="hljs-keyword">ON</span>’)
</code></pre>
<p>ويمكننا استخدام عبارة SELECT لإنشاء قائمة بأرقام هواتف الموظفين من جدول Employees على النحو التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> price, title

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">WHERE</span> price <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
</code></pre>
<p>SELECT FirstName, LastName, phone FROM Employees ORDER BY LastName</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> price, title

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">WHERE</span> price <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
</code></pre>
<p>سيؤدي هذا الإجراء إلى عرض اسم عائلة الموظف واسمه الأول ورقم هاتفه من جدول Employees، كما هو مبين في الجدول 16.1.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> LastName

<span class="hljs-keyword">FROM</span> Employees

<span class="hljs-keyword">WHERE</span> LastName <span class="hljs-keyword">LIKE</span> ‘Mc<span class="hljs-operator">%</span>’
</code></pre>
<table>
<thead>
<tr>
<th>اسم العائلة</th>
<th>الاسم الأول</th>
<th>رقم الهاتف</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hagans</td>
<td>Jim</td>
<td>604-232-3232</td>
</tr>
<tr>
<td>Wong</td>
<td>Bruce</td>
<td>604-244-2322</td>
</tr>
</tbody>
</table>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> LastName

<span class="hljs-keyword">FROM</span> Employees

<span class="hljs-keyword">WHERE</span> LastName <span class="hljs-keyword">LIKE</span> ‘<span class="hljs-operator">%</span>inger’
</code></pre>
<p>الجدول 16.1. جدول Employees.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> LastName

<span class="hljs-keyword">FROM</span> Employees

<span class="hljs-keyword">WHERE</span> LastName <span class="hljs-keyword">LIKE</span> ‘<span class="hljs-operator">%</span>en<span class="hljs-operator">%</span>’
</code></pre>
<p>في المثال التالي، سنستخدم جدول الناشرين (Publishers) (الجدول 16.2). (ولاحِظ أن كلمة Canada مكتوبة خطأً في حقل بلد الناشر لكل من Example Publishing وABC Publishing. ولتصحيح الخطأ، استخدم عبارة UPDATE لتوحيد حقل البلد على Canada – انظر عبارة UPDATE لاحقًا في هذا الفصل.)</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>

<span class="hljs-keyword">FROM</span> Employees

<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> HireDate <span class="hljs-keyword">ASC</span>
</code></pre>
<table>
<thead>
<tr>
<th>اسم الناشر</th>
<th>مدينة الناشر</th>
<th>مقاطعة الناشر</th>
<th>بلد الناشر</th>
</tr>
</thead>
<tbody>
<tr>
<td>Acme Publishing</td>
<td>Vancouver</td>
<td>BC</td>
<td>Canada</td>
</tr>
<tr>
<td>Example Publishing</td>
<td>Edmonton</td>
<td>AB</td>
<td>Cnada</td>
</tr>
<tr>
<td>ABC Publishing</td>
<td>Toronto</td>
<td>ON</td>
<td>Canda</td>
</tr>
</tbody>
</table>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> type, price <span class="hljs-keyword">DESC</span>
</code></pre>
<p>الجدول 16.2. جدول Publishers.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> type

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> type
</code></pre>
<p>إذا أردت إضافة اسم الناشر ومدينته، فستستخدم عبارة SELECT تليها أسماء الحقول مفصولة بفاصلة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> type <span class="hljs-keyword">AS</span> ‘Type’, <span class="hljs-built_in">MIN</span>(price) <span class="hljs-keyword">AS</span> ‘Minimum Price’

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">WHERE</span> royalty <span class="hljs-operator">&gt;</span> <span class="hljs-number">10</span>

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> type
</code></pre>
<p>SELECT PubName, city FROM Publishers</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> type, price

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">WHERE</span> price <span class="hljs-keyword">is</span> <span class="hljs-keyword">not null</span>
</code></pre>
<p>سيؤدي هذا الإجراء إلى عرض اسم الناشر ومدينة الناشر من جدول Publishers.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> type <span class="hljs-keyword">AS</span> ‘Type’, <span class="hljs-built_in">MIN</span>(price) <span class="hljs-keyword">AS</span> ‘Minimum Price’

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">WHERE</span> price <span class="hljs-keyword">is</span> <span class="hljs-keyword">not null</span>

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> type
</code></pre>
<p>وإذا كنت تريد اسم الناشر فقط تحت عنوان العرض city، فستستخدم عبارة SELECT من دون فاصلة تفصل بين pub_name وcity:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> type
</code></pre>
<p>SELECT PubName city FROM Publishers</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">AVG</span>(qty)

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> type
</code></pre>
<p>سيؤدي تنفيذ هذا الإجراء إلى عرض قيمة pub_name فقط من جدول Publishers مع عنوان “city”. وإذا لم تُدرج الفاصلة، فسيفترض SQL Server أنك تريد اسم عمود جديدًا للقيمة pub_name.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">SUM</span>(qty)

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> type
</code></pre>
<h2 id="عبارة-select-مع-معيار-where">عبارة SELECT مع معيار WHERE</h2>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ‘Total Sales’ <span class="hljs-operator">=</span> <span class="hljs-built_in">SUM</span>(qty), ‘Average Sales’ <span class="hljs-operator">=</span> <span class="hljs-built_in">AVG</span>(qty), stor_id

<span class="hljs-keyword">FROM</span> Sales

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> StorID <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span>  ‘Total Sales’
</code></pre>
<p>قد ترغب أحيانًا في التركيز على جزء من جدول الناشرين، مثل الناشرين الموجودين في Vancouver وحدهم. وفي هذه الحالة، ستستخدم عبارة SELECT مع معيار WHERE، أي WHERE city = ‘Vancouver’.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> au_fname <span class="hljs-keyword">AS</span> ‘Author”s <span class="hljs-keyword">First</span> Name’, province <span class="hljs-keyword">as</span> ‘Province’

<span class="hljs-keyword">FROM</span> Authors

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> au_fname, province

<span class="hljs-keyword">HAVING</span> province <span class="hljs-operator">&lt;&gt;</span> ‘BC’
</code></pre>
<p>يوضح المثالان الأولان كيفية تقييد اختيار السجلات بمعيار WHERE باستخدام BETWEEN. ويعطي كل من هذين المثالين النتيجة نفسها لعناصر المتجر التي يتراوح عددها بين 20 و50 في المخزون.</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT</span> [<span class="hljs-keyword">INTO</span>] Table_name <span class="hljs-operator">|</span> <span class="hljs-keyword">view</span> name [column_list]

<span class="hljs-keyword">DEFAULT</span> <span class="hljs-keyword">VALUES</span> <span class="hljs-operator">|</span> values_list <span class="hljs-operator">|</span> <span class="hljs-keyword">select</span> statement
</code></pre>
<p>يستخدم المثال رقم 1 الكمية qty BETWEEN 20 and 50.</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> Authors

<span class="hljs-keyword">VALUES</span>(‘<span class="hljs-number">555</span><span class="hljs-number">-093</span><span class="hljs-number">-467</span>’, ‘Martin’, ‘April’, ‘<span class="hljs-number">281</span> <span class="hljs-number">555</span><span class="hljs-number">-5673</span>’, ‘<span class="hljs-number">816</span> Market St.,’ , ‘Vancouver’, ‘BC’, ‘V7G3P4’, <span class="hljs-number">0</span>)
</code></pre>
<p>SELECT StorID, qty, TitleID FROM Sales WHERE qty BETWEEN 20 and 50 (يشمل 20 و50)</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> Publishers (PubID, PubName, city, province)

<span class="hljs-keyword">VALUES</span> (‘<span class="hljs-number">9900</span>’, ‘Acme Publishing’, ‘Vancouver’, ‘BC’)
</code></pre>
<p>أما المثال رقم 2، من ناحية أخرى، فيستخدم qty &gt;=20 وqty &lt;=50 .</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> jobs

<span class="hljs-keyword">VALUES</span> (‘DBA’, <span class="hljs-number">100</span>, <span class="hljs-number">175</span>)
</code></pre>
<p>SELECT StorID, qty, TitleID FROM Sales WHERE qty &gt;= 20 and qty &lt;= 50</p>
<pre><code class="language-sql">IDENTITY_INSERT option
</code></pre>
<p>يوضح المثال رقم 3 كيفية تقييد اختيار السجلات بمعيار WHERE باستخدام NOT BETWEEN.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SET</span> IDENTITY_INSERT jobs <span class="hljs-keyword">ON</span>

<span class="hljs-keyword">INSERT INTO</span> jobs  (job_id, job_desc, min_lvl, max_lvl)

<span class="hljs-keyword">VALUES</span> (<span class="hljs-number">19</span>, ’DBA2’, <span class="hljs-number">100</span>, <span class="hljs-number">175</span>)

<span class="hljs-keyword">SET</span> IDENTITY_INSERT jobs OFF
</code></pre>
<p>SELECT StorID, qty, TitleID FROM Sales WHERE qty NOT BETWEEN 20 and 50</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> dbo.tmpPublishers (

PubID <span class="hljs-type">char</span> (<span class="hljs-number">4</span>) <span class="hljs-keyword">NOT NULL</span> ,

PubName <span class="hljs-type">varchar</span> (<span class="hljs-number">40</span>) <span class="hljs-keyword">NULL</span> ,

city <span class="hljs-type">varchar</span> (<span class="hljs-number">20</span>) <span class="hljs-keyword">NULL</span> ,

province <span class="hljs-type">char</span> (<span class="hljs-number">2</span>) <span class="hljs-keyword">NULL</span> ,

country <span class="hljs-type">varchar</span> (<span class="hljs-number">30</span>) <span class="hljs-keyword">NULL</span>  <span class="hljs-keyword">DEFAULT</span> (‘Canada’)

)

<span class="hljs-keyword">INSERT</span>  tmpPublishers

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> Publishers
</code></pre>
<p>يوضح المثالان التاليان طريقتين مختلفتين لتقييد اختيار السجلات بمعيار WHERE باستخدام IN، معطي كل منهما النتيجة نفسها.</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT</span> tmpPublishers (pub_id, pub_name)

<span class="hljs-keyword">SELECT</span> PubID, PubName

<span class="hljs-keyword">FROM</span> Publishers
</code></pre>
<p>يوضح المثال رقم 4 كيفية اختيار السجلات باستخدام province= كجزء من عبارة WHERE.</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT</span> tmpPublishers (PubID, PubName, city, province, country)

<span class="hljs-keyword">SELECT</span> PubID, PubName, city, province, ‘Canada’

<span class="hljs-keyword">FROM</span> Publishers
</code></pre>
<p>SELECT * FROM Publishers WHERE province = ‘BC’ OR province = ‘AB’ OR province = ‘ON’</p>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> Publishers

<span class="hljs-keyword">SET</span> country <span class="hljs-operator">=</span> ‘Canada’
</code></pre>
<p>ويُختار المثال رقم 5 السجلات باستخدام province IN كجزء من عبارة WHERE.</p>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> roysched

<span class="hljs-keyword">SET</span> royalty <span class="hljs-operator">=</span> royalty <span class="hljs-operator">+</span> (royalty <span class="hljs-operator">*</span> <span class="hljs-number">.10</span>)

<span class="hljs-keyword">WHERE</span> royalty <span class="hljs-keyword">BETWEEN</span> <span class="hljs-number">10</span> <span class="hljs-keyword">and</span> <span class="hljs-number">20</span>
</code></pre>
<p>SELECT * FROM Publishers WHERE province IN (‘BC’, ‘AB’, ‘ON’)</p>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> Employees

<span class="hljs-keyword">SET</span> job_lvl <span class="hljs-operator">=</span>

(<span class="hljs-keyword">SELECT</span> max_lvl <span class="hljs-keyword">FROM</span> jobs

<span class="hljs-keyword">WHERE</span> employee.job_id <span class="hljs-operator">=</span> jobs.job_id)

<span class="hljs-keyword">WHERE</span> DATEPART(<span class="hljs-keyword">year</span>, employee.hire_date) <span class="hljs-operator">=</span> <span class="hljs-number">2010</span>
</code></pre>
<p>يوضح المثالان الأخيران كيفية استخدام NULL وNOT NULL لاختيار السجلات. وفي هذين المثالين، يُستخدم جدول الكتب (Books) (غير المبيَّن) الذي يحوي حقولًا اسمها Title وQuantity وPrice (سعر الكتاب). ولكل ناشر جدول Books يسرد جميع كتبه.</p>
<pre><code class="language-sql"><span class="hljs-keyword">DELETE</span> [<span class="hljs-keyword">FROM</span>] {table_name <span class="hljs-operator">|</span> view_name }

[<span class="hljs-keyword">WHERE</span> clause]
</code></pre>
<p>يستخدم المثال رقم 6 القيمة NULL.</p>
<pre><code class="language-sql"><span class="hljs-keyword">DELETE</span>

<span class="hljs-keyword">FROM</span> Discounts
</code></pre>
<p>SELECT price, title FROM Books WHERE price IS NULL</p>
<pre><code class="language-sql"><span class="hljs-keyword">DELETE</span>

<span class="hljs-keyword">FROM</span> Sales

<span class="hljs-keyword">WHERE</span> stor_id <span class="hljs-operator">=</span> ‘<span class="hljs-number">6380</span>’
</code></pre>
<p>ويستخدم المثال رقم 7 القيمة NOT NULL.</p>
<pre><code class="language-sql"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> Sales

<span class="hljs-keyword">WHERE</span> title_id <span class="hljs-keyword">IN</span>

(<span class="hljs-keyword">SELECT</span> title_id <span class="hljs-keyword">FROM</span> Books <span class="hljs-keyword">WHERE</span> type <span class="hljs-operator">=</span> ‘mod_cook’)
</code></pre>
<p>SELECT price, title FROM Books WHERE price IS NOT NULL</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">AVG</span> (price) <span class="hljs-keyword">AS</span> ‘Average Title Price’

<span class="hljs-keyword">FROM</span> Books
</code></pre>
<h2 id="استخدام-المحارف-البديلة-wildcards-في-جملة-like">استخدام المحارف البديلة (wildcards) في جملة LIKE</h2>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(PubID) <span class="hljs-keyword">AS</span> ‘Number <span class="hljs-keyword">of</span> Publishers’

<span class="hljs-keyword">FROM</span> Publishers
</code></pre>
<p>تختار الكلمة المفتاحية LIKE الصفوف التي تحوي حقولًا تطابق أجزاء محدَّدة من سلاسل المحارف. وتُستخدم LIKE مع بيانات char وvarchar وtext وdatetime وsmalldatetime. ويسمح المحرف البديل (wildcard) للمستخدم بمطابقة الحقول التي تحوي حروفًا معيَّنة. فمثلًا، يعطي المحرف البديل province = ‘N%’ جميع المقاطعات التي تبدأ بالحرف ‘N’. ويعرض الجدول 16.3 أربع طرق لتحديد المحارف البديلة في عبارة SELECT بصيغة التعابير النمطية (regular express format).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(province) <span class="hljs-keyword">AS</span> ‘Number <span class="hljs-keyword">of</span> Publishers’

<span class="hljs-keyword">FROM</span> Publishers
</code></pre>
<table>
<thead>
<tr>
<th>%</th>
<th>أي سلسلة من صفر أو أكثر من المحارف</th>
</tr>
</thead>
<tbody>
<tr>
<td>_</td>
<td>أي محرف مفرد</td>
</tr>
<tr>
<td>[ ]</td>
<td>أي محرف مفرد ضمن النطاق المحدَّد (مثل [a-f]) أو ضمن المجموعة (مثل [abcdef])</td>
</tr>
<tr>
<td>[^]</td>
<td>أي محرف مفرد لا يقع ضمن النطاق المحدَّد (مثل [^a – f]) أو ضمن المجموعة (مثل [^abcdef])</td>
</tr>
</tbody>
</table>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)

<span class="hljs-keyword">FROM</span> Employees

<span class="hljs-keyword">WHERE</span> job_lvl <span class="hljs-operator">=</span> <span class="hljs-number">35</span>
</code></pre>
<p>الجدول 16.3. كيفية تحديد المحارف البديلة في عبارة SELECT.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">MAX</span> (HireDate)

<span class="hljs-keyword">FROM</span> Employees
</code></pre>
<p>في المثال رقم 1، تبحث LIKE ‘Mc%’ عن جميع أسماء العائلة التي تبدأ بالحرفين “Mc” (مثل McBadden).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">MIN</span> (price)

<span class="hljs-keyword">FROM</span> Books
</code></pre>
<p>SELECT LastName FROM Employees WHERE LastName LIKE ‘Mc%’</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">SUM</span>(discount) <span class="hljs-keyword">AS</span> ‘Total Discounts’

<span class="hljs-keyword">FROM</span> Discounts
</code></pre>
<p>وفي المثال رقم 2: تبحث LIKE ‘%inger’ عن جميع أسماء العائلة التي تنتهي بالحروف “inger” (مثل Ringer وStringer).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">CONVERT</span>(<span class="hljs-type">int</span>, <span class="hljs-number">10.6496</span>)

<span class="hljs-keyword">SELECT</span> title_id, price

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">CONVERT</span>(<span class="hljs-type">char</span>(<span class="hljs-number">5</span>), price) <span class="hljs-keyword">LIKE</span> ‘<span class="hljs-operator">%</span><span class="hljs-number">99</span><span class="hljs-operator">%</span>’
</code></pre>
<p>SELECT LastName FROM Employees WHERE LastName LIKE ‘%inger’</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> title_id, <span class="hljs-keyword">CONVERT</span>(<span class="hljs-type">char</span>(<span class="hljs-number">4</span>), ytd_sales) <span class="hljs-keyword">as</span> ‘Sales’

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">WHERE</span> type <span class="hljs-keyword">LIKE</span> ‘<span class="hljs-operator">%</span>cook’
</code></pre>
<p>وفي المثال رقم 3: تبحث LIKE ‘%en%’ عن جميع أسماء العائلة التي تحوي الحرفين “en” (مثل Bennett وGreen وMcBadden).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">3</span>, hire_date)

<span class="hljs-keyword">FROM</span> Employees
</code></pre>
<p>SELECT LastName FROM Employees WHERE LastName LIKE ‘%en%’</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> DATEDIFF(<span class="hljs-keyword">day</span>, HireDate, ‘Nov <span class="hljs-number">30</span> <span class="hljs-number">1995</span>’)

<span class="hljs-keyword">FROM</span> Employees
</code></pre>
<h2 id="عبارة-select-مع-جملة-order-by-ترتيب-حسب">عبارة SELECT مع جملة ORDER BY (ترتيب حسب)</h2>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> Price, (price <span class="hljs-operator">*</span> <span class="hljs-number">1.1</span>) <span class="hljs-keyword">AS</span> ‘<span class="hljs-keyword">New</span> Price’, title

<span class="hljs-keyword">FROM</span> Books

<span class="hljs-keyword">SELECT</span> ‘Square Root’ <span class="hljs-operator">=</span> <span class="hljs-built_in">SQRT</span>(<span class="hljs-number">81</span>)

<span class="hljs-keyword">SELECT</span> ‘Rounded‘ <span class="hljs-operator">=</span> ROUND(<span class="hljs-number">4567.9876</span>,<span class="hljs-number">2</span>)

<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">FLOOR</span> (<span class="hljs-number">123.45</span>)
</code></pre>
<p>تستخدم جملة ORDER BY لترتيب السجلات في القائمة الناتجة. واستخدم ASC لترتيب النتائج تصاعديًا وDESC لترتيبها تنازليًا.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> jobs.job_id, job_desc

<span class="hljs-keyword">FROM</span> jobs

<span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> Employees <span class="hljs-keyword">ON</span> employee.job_id <span class="hljs-operator">=</span> jobs.job_id

<span class="hljs-keyword">WHERE</span> jobs.job_id <span class="hljs-operator">&lt;</span> <span class="hljs-number">7</span>
</code></pre>
<p>على سبيل المثال، مع ASC:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> authors.au_fname, authors.au_lname, books.royalty, title

<span class="hljs-keyword">FROM</span> authorsINNER <span class="hljs-keyword">JOIN</span> titleauthor <span class="hljs-keyword">ON</span> authors.au_id<span class="hljs-operator">=</span>titleauthor.au_id

<span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> books <span class="hljs-keyword">ON</span> titleauthor.title_id<span class="hljs-operator">=</span>books.title_id

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> authors.au_lname, authors.au_fname, title, title.royalty

<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> authors.au_lname
</code></pre>
<p>SELECT * FROM Employees ORDER BY HireDate ASC</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> publishers.pub_name, books.title

<span class="hljs-keyword">FROM</span> Publishers

<span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> Books <span class="hljs-keyword">On</span> publishers.pub_id <span class="hljs-operator">=</span> books.pub_id
</code></pre>
<p>ومع DESC:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> publishers.pub_name, books.title

<span class="hljs-keyword">FROM</span> Publishers, Books

<span class="hljs-keyword">WHERE</span> publishers.pub_id <span class="hljs-operator">*</span><span class="hljs-operator">=</span> books.pub_id
</code></pre>
<p>SELECT * FROM Books ORDER BY type, price DESC</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> titleauthor.title_id, authors.au_lname, authors.au_fname

<span class="hljs-keyword">FROM</span> titleauthor

<span class="hljs-keyword">RIGHT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> authors <span class="hljs-keyword">ON</span> titleauthor.au_id <span class="hljs-operator">=</span> authors.au_id

ORDERY <span class="hljs-keyword">BY</span> au_lname
</code></pre>
<h2 id="عبارة-select-مع-جملة-group-by-تجميع-حسب">عبارة SELECT مع جملة GROUP BY (تجميع حسب)</h2>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> titleauthor.title_id, authors.au_lname, authors.au_fname

<span class="hljs-keyword">FROM</span> titleauthor, authors

<span class="hljs-keyword">WHERE</span> titleauthor.au_id <span class="hljs-operator">=</span><span class="hljs-operator">*</span> authors.au_id

ORDERY <span class="hljs-keyword">BY</span> au_lname
</code></pre>
<p>تُستخدم جملة GROUP BY لإنشاء صف ناتج واحد لكل مجموعة، وتنتج قيمًا ملخَّصة للأعمدة المحدَّدة، كما هو موضح أدناه.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> books.title, publishers.pub_name, publishers.province

<span class="hljs-keyword">FROM</span> Publishers

<span class="hljs-keyword">FULL</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> Books <span class="hljs-keyword">ON</span> books.pub_id <span class="hljs-operator">=</span> publishers.pub_id

<span class="hljs-keyword">WHERE</span> (publishers.province <span class="hljs-operator">&lt;&gt;</span> “BC” <span class="hljs-keyword">and</span> publishers.province <span class="hljs-operator">&lt;&gt;</span> “<span class="hljs-keyword">ON</span>”)

<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> books.title_id
</code></pre>
<p>SELECT type FROM Books GROUP BY type</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> au_lname, pub_name,

<span class="hljs-keyword">FROM</span> Authors <span class="hljs-keyword">CROSS</span> <span class="hljs-keyword">JOIN</span> Publishers
</code></pre>
<p>وفيما يلي مثال يستخدم العبارة أعلاه.</p>
<pre><code class="language-sql">Key Terms

aggregate <span class="hljs-keyword">function</span>: <span class="hljs-keyword">returns</span> summary valuesASC: ascending <span class="hljs-keyword">order</span>

conversion <span class="hljs-keyword">function</span>: transforms <span class="hljs-keyword">one</span> data type <span class="hljs-keyword">to</span> another

<span class="hljs-keyword">cross</span> <span class="hljs-keyword">join</span>: a product combining two tables

<span class="hljs-type">date</span> <span class="hljs-keyword">function</span>: displays information about dates <span class="hljs-keyword">and</span> times

<span class="hljs-keyword">DELETE</span> statement: removes <span class="hljs-keyword">rows</span> <span class="hljs-keyword">from</span> a record <span class="hljs-keyword">set</span>

<span class="hljs-keyword">DESC</span>: descending <span class="hljs-keyword">order</span>

<span class="hljs-keyword">full</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>: specifies that if a <span class="hljs-type">row</span> <span class="hljs-keyword">from</span> either <span class="hljs-keyword">table</span> does <span class="hljs-keyword">not</span> <span class="hljs-keyword">match</span> the selection criteria

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span>: used <span class="hljs-keyword">to</span> <span class="hljs-keyword">create</span> <span class="hljs-keyword">one</span> output <span class="hljs-type">row</span> <span class="hljs-keyword">per</span> <span class="hljs-keyword">each</span> <span class="hljs-keyword">group</span> <span class="hljs-keyword">and</span> produces summary <span class="hljs-keyword">values</span> <span class="hljs-keyword">for</span> the selected columns

<span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span>: connects two tables <span class="hljs-keyword">on</span> a <span class="hljs-keyword">column</span> <span class="hljs-keyword">with</span> the same data type

<span class="hljs-keyword">INSERT</span> statement: adds <span class="hljs-keyword">rows</span> <span class="hljs-keyword">to</span> a <span class="hljs-keyword">table</span>

<span class="hljs-keyword">left</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>: specifies that <span class="hljs-keyword">all</span> <span class="hljs-keyword">left</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">rows</span> be returned

mathematical <span class="hljs-keyword">function</span>: performs operations <span class="hljs-keyword">on</span> <span class="hljs-type">numeric</span> data

<span class="hljs-keyword">right</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>: includes <span class="hljs-keyword">all</span> <span class="hljs-keyword">rows</span> <span class="hljs-keyword">from</span> the <span class="hljs-keyword">right</span> <span class="hljs-keyword">table</span> that did <span class="hljs-keyword">not</span> meet the <span class="hljs-keyword">condition</span> specified

<span class="hljs-keyword">SELECT</span> statement: used <span class="hljs-keyword">to</span> query data <span class="hljs-keyword">in</span> the database

string <span class="hljs-keyword">function</span>: performs operations <span class="hljs-keyword">on</span> <span class="hljs-type">character</span> strings, <span class="hljs-type">binary</span> data <span class="hljs-keyword">or</span> expressions

<span class="hljs-keyword">system</span> <span class="hljs-keyword">function</span>: <span class="hljs-keyword">returns</span> a special piece <span class="hljs-keyword">of</span> information <span class="hljs-keyword">from</span> the database

text <span class="hljs-keyword">and</span> image functions: performs operations <span class="hljs-keyword">on</span> text <span class="hljs-keyword">and</span> image data

<span class="hljs-keyword">UPDATE</span> statement: changes data <span class="hljs-keyword">in</span> existing <span class="hljs-keyword">rows</span> either <span class="hljs-keyword">by</span> adding <span class="hljs-keyword">new</span> data <span class="hljs-keyword">or</span> modifying existing data

wildcard:  allows the <span class="hljs-keyword">user</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">match</span> fields that contain certain letters.
</code></pre>
<p>SELECT type AS ‘Type’, MIN(price) AS ‘Minimum Price’ FROM Books WHERE royalty &gt; 10 GROUP BY type</p>
<pre><code class="language-sql">Exercises

<span class="hljs-keyword">For</span> questions <span class="hljs-number">1</span> <span class="hljs-keyword">to</span> <span class="hljs-number">18</span> use the PUBS sample database created <span class="hljs-keyword">by</span> Microsoft. <span class="hljs-keyword">To</span> download the script <span class="hljs-keyword">to</span> generate this database please go <span class="hljs-keyword">to</span> the following site: http:<span class="hljs-operator">/</span><span class="hljs-operator">/</span>www.microsoft.com<span class="hljs-operator">/</span>en<span class="hljs-operator">-</span>ca<span class="hljs-operator">/</span>download<span class="hljs-operator">/</span>details.aspx?id<span class="hljs-operator">=</span><span class="hljs-number">23654.</span>

Display a list <span class="hljs-keyword">of</span> publication dates <span class="hljs-keyword">and</span> titles (books) that were published <span class="hljs-keyword">in</span> <span class="hljs-number">2011.</span>
Display a list <span class="hljs-keyword">of</span> titles that have been categorized <span class="hljs-keyword">as</span> either traditional <span class="hljs-keyword">or</span> modern cooking. Use the Books table.
Display <span class="hljs-keyword">all</span> authors whose <span class="hljs-keyword">first</span> names <span class="hljs-keyword">are</span> five letters long.
Display <span class="hljs-keyword">from</span> the Books <span class="hljs-keyword">table</span>: type, price, pub_id, title about the books put <span class="hljs-keyword">out</span> <span class="hljs-keyword">by</span> <span class="hljs-keyword">each</span> publisher. Rename the <span class="hljs-keyword">column</span> type <span class="hljs-keyword">with</span> ”Book Category.” Sort <span class="hljs-keyword">by</span> type (descending) <span class="hljs-keyword">and</span> <span class="hljs-keyword">then</span> price (ascending).
Display title_id, pubdate <span class="hljs-keyword">and</span> pubdate plus three days, <span class="hljs-keyword">using</span> the Books table.
<span class="hljs-keyword">Using</span> the datediff <span class="hljs-keyword">and</span> getdate <span class="hljs-keyword">function</span> determine how much <span class="hljs-type">time</span> has elapsed <span class="hljs-keyword">in</span> months since the books <span class="hljs-keyword">in</span> the Books <span class="hljs-keyword">table</span> were published.
List the title IDs <span class="hljs-keyword">and</span> quantity <span class="hljs-keyword">of</span> <span class="hljs-keyword">all</span> books that sold more than <span class="hljs-number">30</span> copies.
Display a list <span class="hljs-keyword">of</span> <span class="hljs-keyword">all</span> <span class="hljs-keyword">last</span> names <span class="hljs-keyword">of</span> the authors who live <span class="hljs-keyword">in</span> Ontario (<span class="hljs-keyword">ON</span>) <span class="hljs-keyword">and</span> the cities <span class="hljs-keyword">where</span> they live.
Display <span class="hljs-keyword">all</span> <span class="hljs-keyword">rows</span> that contain a <span class="hljs-number">60</span> <span class="hljs-keyword">in</span> the payterms field. Use the Sales table.
Display <span class="hljs-keyword">all</span> authors whose <span class="hljs-keyword">first</span> names <span class="hljs-keyword">are</span> five letters long , <span class="hljs-keyword">end</span> <span class="hljs-keyword">in</span> O <span class="hljs-keyword">or</span> A, <span class="hljs-keyword">and</span> <span class="hljs-keyword">start</span> <span class="hljs-keyword">with</span> M <span class="hljs-keyword">or</span> P.
Display <span class="hljs-keyword">all</span> titles that cost more than $<span class="hljs-number">30</span> <span class="hljs-keyword">and</span> either <span class="hljs-keyword">begin</span> <span class="hljs-keyword">with</span> T <span class="hljs-keyword">or</span> have a publisher ID <span class="hljs-keyword">of</span>  <span class="hljs-number">0877.</span>
Display <span class="hljs-keyword">from</span> the Employees <span class="hljs-keyword">table</span> the <span class="hljs-keyword">first</span> name (fname), <span class="hljs-keyword">last</span> name (lname), employe ID(emp_id) <span class="hljs-keyword">and</span> job level (job_lvl) columns <span class="hljs-keyword">for</span> those employees <span class="hljs-keyword">with</span> a job level greater than <span class="hljs-number">200</span>; <span class="hljs-keyword">and</span> rename the <span class="hljs-keyword">column</span> headings <span class="hljs-keyword">to</span>:  “<span class="hljs-keyword">First</span> Name,” “<span class="hljs-keyword">Last</span> Name,” “IDENTIFICATION#” <span class="hljs-keyword">and</span> “Job Level.”
Display the royalty, royalty plus <span class="hljs-number">50</span><span class="hljs-operator">%</span> <span class="hljs-keyword">as</span> “royalty plus <span class="hljs-number">50</span>” <span class="hljs-keyword">and</span> title_id. Use the Roysched table.
<span class="hljs-keyword">Using</span> the STUFF <span class="hljs-keyword">function</span> <span class="hljs-keyword">create</span> a string “<span class="hljs-number">12</span>xxxx567” <span class="hljs-keyword">from</span> the string “<span class="hljs-number">1234567.</span>”
Display the <span class="hljs-keyword">first</span> <span class="hljs-number">40</span> characters <span class="hljs-keyword">of</span> <span class="hljs-keyword">each</span> title, along <span class="hljs-keyword">with</span> the average monthly sales <span class="hljs-keyword">for</span> that title <span class="hljs-keyword">to</span> <span class="hljs-type">date</span> (ytd_sales<span class="hljs-operator">/</span><span class="hljs-number">12</span>). Use the Title table.
<span class="hljs-keyword">Show</span> how many books have assigned prices.
Display a list <span class="hljs-keyword">of</span> cookbooks <span class="hljs-keyword">with</span> the average cost <span class="hljs-keyword">for</span> <span class="hljs-keyword">all</span> <span class="hljs-keyword">of</span> the books <span class="hljs-keyword">of</span> <span class="hljs-keyword">each</span> type. Use the <span class="hljs-keyword">GROUP</span> BY.
</code></pre>
<p>وإذا كانت عبارة SELECT تتضمن معيار WHERE يكون فيه price ليس فارغًا (not null)،</p>
<pre><code class="language-sql">Advanced Questions (<span class="hljs-keyword">Union</span>, <span class="hljs-keyword">Intersect</span>, <span class="hljs-keyword">and</span> Minus)

The relational <span class="hljs-keyword">set</span> operators <span class="hljs-keyword">UNION</span>, <span class="hljs-keyword">INTERSECT</span> <span class="hljs-keyword">and</span> MINUS work properly <span class="hljs-keyword">only</span> if the relations <span class="hljs-keyword">are</span> <span class="hljs-keyword">union</span><span class="hljs-operator">-</span>compatible. What does <span class="hljs-keyword">union</span><span class="hljs-operator">-</span>compatible mean, <span class="hljs-keyword">and</span> how would you <span class="hljs-keyword">check</span> <span class="hljs-keyword">for</span> this <span class="hljs-keyword">condition</span>?
What <span class="hljs-keyword">is</span> the difference <span class="hljs-keyword">between</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>? Write the syntax <span class="hljs-keyword">for</span> each.
Suppose that you have two tables, Employees <span class="hljs-keyword">and</span> Employees_1. The Employees <span class="hljs-keyword">table</span> <span class="hljs-keyword">contains</span> the records <span class="hljs-keyword">for</span> three employees: Alice Cordoza, John Cretchakov, <span class="hljs-keyword">and</span> Anne McDonald. The Employees_1 <span class="hljs-keyword">table</span> <span class="hljs-keyword">contains</span> the records <span class="hljs-keyword">for</span> employees: John Cretchakov <span class="hljs-keyword">and</span> Mary Chen. Given that information, what <span class="hljs-keyword">is</span> the query output <span class="hljs-keyword">for</span> the <span class="hljs-keyword">UNION</span> query? List the query output.
Given the employee information <span class="hljs-keyword">in</span> question <span class="hljs-number">3</span>, what <span class="hljs-keyword">is</span> the query output <span class="hljs-keyword">for</span> the <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> query? List the query output.
Given the employee information <span class="hljs-keyword">in</span> question <span class="hljs-number">3</span>, what <span class="hljs-keyword">is</span> the query output <span class="hljs-keyword">for</span> the <span class="hljs-keyword">INTERSECT</span> query? List the query output.
Given the employee information <span class="hljs-keyword">in</span> question <span class="hljs-number">3</span>, what <span class="hljs-keyword">is</span> the query output <span class="hljs-keyword">for</span> the <span class="hljs-keyword">EXCEPT</span> query? List the query output.
What <span class="hljs-keyword">is</span> a <span class="hljs-keyword">cross</span> <span class="hljs-keyword">join</span>? Give an example <span class="hljs-keyword">of</span> its syntax.
Explain these three <span class="hljs-keyword">join</span> types:

<span class="hljs-keyword">left</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>
<span class="hljs-keyword">right</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>
<span class="hljs-keyword">full</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span>

What <span class="hljs-keyword">is</span> a subquery, <span class="hljs-keyword">and</span> what <span class="hljs-keyword">are</span> its basic characteristics?
What <span class="hljs-keyword">is</span> a correlated subquery? Give an example.
Suppose that a Product <span class="hljs-keyword">table</span> <span class="hljs-keyword">contains</span> two attributes, PROD_CODE <span class="hljs-keyword">and</span> VEND_CODE. The <span class="hljs-keyword">values</span> <span class="hljs-keyword">for</span> the PROD_CODE <span class="hljs-keyword">are</span>: ABC, DEF, GHI <span class="hljs-keyword">and</span> JKL. These <span class="hljs-keyword">are</span> matched <span class="hljs-keyword">by</span> the following <span class="hljs-keyword">values</span> <span class="hljs-keyword">for</span> the VEND_CODE:  <span class="hljs-number">125</span>, <span class="hljs-number">124</span>, <span class="hljs-number">124</span> <span class="hljs-keyword">and</span> <span class="hljs-number">123</span>, respectively (e.g., PROD_CODE <span class="hljs-keyword">value</span> ABC corresponds <span class="hljs-keyword">to</span> VEND_CODE <span class="hljs-keyword">value</span> <span class="hljs-number">125</span>). The Vendor <span class="hljs-keyword">table</span> <span class="hljs-keyword">contains</span> a single attribute, VEND_CODE, <span class="hljs-keyword">with</span> <span class="hljs-keyword">values</span> <span class="hljs-number">123</span>, <span class="hljs-number">124</span>, <span class="hljs-number">125</span> <span class="hljs-keyword">and</span> <span class="hljs-number">126.</span> (The VEND_CODE attribute <span class="hljs-keyword">in</span> the Product <span class="hljs-keyword">table</span> <span class="hljs-keyword">is</span> a <span class="hljs-keyword">foreign key</span> <span class="hljs-keyword">to</span> the VEND_CODE <span class="hljs-keyword">in</span> the Vendor table.)
Given the information <span class="hljs-keyword">in</span> question <span class="hljs-number">11</span>, what would be the query output <span class="hljs-keyword">for</span> the following? <span class="hljs-keyword">Show</span> values.

A <span class="hljs-keyword">UNION</span> query based <span class="hljs-keyword">on</span> these two tables
A <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> query based <span class="hljs-keyword">on</span> these two tables
An <span class="hljs-keyword">INTERSECT</span> query based <span class="hljs-keyword">on</span> these two tables
A MINUS query based <span class="hljs-keyword">on</span> these two tables
</code></pre>
<p>SELECT type, price FROM Books WHERE price is not null</p>
<pre><code class="language-sql">Advanced Questions (<span class="hljs-keyword">Using</span> Joins)

Display a list <span class="hljs-keyword">of</span> <span class="hljs-keyword">all</span> titles <span class="hljs-keyword">and</span> sales numbers <span class="hljs-keyword">in</span> the Books <span class="hljs-keyword">and</span> Sales tables, including titles that have <span class="hljs-keyword">no</span> sales. Use a join.
Display a list <span class="hljs-keyword">of</span> authors’ <span class="hljs-keyword">last</span> names <span class="hljs-keyword">and</span> <span class="hljs-keyword">all</span> associated titles that <span class="hljs-keyword">each</span> author has published sorted <span class="hljs-keyword">by</span> the author’s <span class="hljs-keyword">last</span> name. Use a join.  Save it <span class="hljs-keyword">as</span> a <span class="hljs-keyword">view</span> named: Published Authors.
<span class="hljs-keyword">Using</span> a subquery, display <span class="hljs-keyword">all</span> the authors (<span class="hljs-keyword">show</span> <span class="hljs-keyword">last</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">first</span> name, postal code) who receive a royalty <span class="hljs-keyword">of</span> <span class="hljs-number">100</span><span class="hljs-operator">%</span> <span class="hljs-keyword">and</span> live <span class="hljs-keyword">in</span> Alberta. Save it <span class="hljs-keyword">as</span> a <span class="hljs-keyword">view</span> titled: AuthorsView. <span class="hljs-keyword">When</span> creating the <span class="hljs-keyword">view</span>, rename the author’s <span class="hljs-keyword">last</span> name <span class="hljs-keyword">and</span> <span class="hljs-keyword">first</span> name <span class="hljs-keyword">as</span> ‘<span class="hljs-keyword">Last</span> Name’ <span class="hljs-keyword">and</span> ‘<span class="hljs-keyword">First</span> Name’.
Display the stores that did <span class="hljs-keyword">not</span> sell the title <span class="hljs-keyword">Is</span> Anger the Enemy?
Display a list <span class="hljs-keyword">of</span> store names <span class="hljs-keyword">for</span> sales after <span class="hljs-number">2013</span> (<span class="hljs-keyword">Order</span> <span class="hljs-type">Date</span> <span class="hljs-keyword">is</span> greater than <span class="hljs-number">2013</span>).  Display store name <span class="hljs-keyword">and</span> <span class="hljs-keyword">order</span> date.
Display a list <span class="hljs-keyword">of</span> titles <span class="hljs-keyword">for</span> books sold <span class="hljs-keyword">in</span> store name “News <span class="hljs-operator">&amp;</span> Brews.”  Display store name, titles <span class="hljs-keyword">and</span> <span class="hljs-keyword">order</span> dates.
List total sales (qty) <span class="hljs-keyword">by</span> title. Display total quantity <span class="hljs-keyword">and</span> title columns.
List total sales (qty) <span class="hljs-keyword">by</span> type. Display total quantity <span class="hljs-keyword">and</span> type columns.
List total sales (qty<span class="hljs-operator">*</span>price) <span class="hljs-keyword">by</span> type. Display total dollar <span class="hljs-keyword">value</span> <span class="hljs-keyword">and</span> type columns.
Calculate the total number <span class="hljs-keyword">of</span> types <span class="hljs-keyword">of</span> books <span class="hljs-keyword">by</span> publisher. <span class="hljs-keyword">Show</span> publisher name <span class="hljs-keyword">and</span> total count <span class="hljs-keyword">of</span> types <span class="hljs-keyword">of</span> books <span class="hljs-keyword">for</span> <span class="hljs-keyword">each</span> publisher.
<span class="hljs-keyword">Show</span> publisher names that do <span class="hljs-keyword">not</span> have <span class="hljs-keyword">any</span> type <span class="hljs-keyword">of</span> book.  Display publisher name only.
</code></pre>
<p>فإن العبارة التي تحوي جملة GROUP BY ستبدو هكذا:</p>
<p>SELECT type AS ‘Type’, MIN(price) AS ‘Minimum Price’ FROM Books WHERE price is not null GROUP BY type</p>
<h3 id="استخدام-count-مع-group-by">استخدام COUNT مع GROUP BY</h3>
<p>يمكننا استخدام COUNT لمعرفة عدد العناصر الموجودة في حاوية. لكن إذا أردنا عد عناصر مختلفة في مجموعات منفصلة، مثل كرات ملونة بألوان مختلفة، فسنستخدم الدالة COUNT مع الأمر GROUP BY.</p>
<p>تُوضّح عبارة SELECT التالية كيفية عد مجموعات البيانات باستخدام الدالة COUNT مع جملة GROUP BY.</p>
<p>SELECT COUNT(*) FROM Books GROUP BY type</p>
<h3 id="استخدام-avg-وsum-مع-group-by">استخدام AVG وSUM مع GROUP BY</h3>
<p>يمكننا استخدام الدالة AVG للحصول على متوسط أي مجموعة، وSUM للحصول على المجموع.</p>
<p>يستخدم المثال رقم 1 الدالة AVG مع GROUP BY type.</p>
<p>SELECT AVG(qty) FROM Books GROUP BY type</p>
<p>ويستخدم المثال رقم 2 الدالة SUM مع GROUP BY type.</p>
<p>SELECT SUM(qty) FROM Books GROUP BY type</p>
<p>ويستخدم المثال رقم 3 الدالتين AVG وSUM معًا مع GROUP BY type في عبارة SELECT.</p>
<p>SELECT ‘Total Sales’ = SUM(qty), ‘Average Sales’ = AVG(qty), stor_id FROM Sales GROUP BY StorID ORDER BY ‘Total Sales’</p>
<h2 id="تقييد-الصفوف-باستخدام-having">تقييد الصفوف باستخدام HAVING</h2>
<p>يمكن استخدام جملة HAVING لتقييد الصفوف. وهي مشابهة لشرط WHERE، غير أن HAVING يمكن أن تتضمّن الدالة التجميعية (aggregate function)، بينما لا يستطيع WHERE ذلك.</p>
<p>تعمل جملة HAVING مثل جملة WHERE، لكنها تنطبق على المجموعات. وفي هذا المثال، نستخدم جملة HAVING لاستبعاد المجموعات التي مقاطعتُها ‘BC’.</p>
<p>SELECT au_fname AS ‘Author”s First Name’, province as ‘Province’ FROM Authors GROUP BY au_fname, province HAVING province &lt;&gt; ‘BC’</p>
<h2 id="عبارة-insert">عبارة INSERT</h2>
<p>تضيف عبارة INSERT صفوفًا إلى جدول. وإضافة إلى ذلك:</p>
<ul>
<li>تحدد INSERT الجدول أو العرض (view) الذي ستُدرَج البيانات فيه.</li>
<li>تسرد Column_list الأعمدة التي ستتأثر بعبارة INSERT.</li>
<li>إذا أُغفل عمود، فيجب تزويد كل قيمة.</li>
<li>إذا أدرجت أعمدة، فيمكن سردها بأي ترتيب.</li>
<li>تحدد VALUES البيانات التي تريد إدراجها في الجدول. وVALUES إلزامية.</li>
<li>يجب ألا تسرد الأعمدة التي تحمل خاصية IDENTITY صراحةً في column_list أو values_clause.</li>
</ul>
<p>الصيغة لعبارة INSERT هي:</p>
<p>INSERT [INTO] Table_name | view name [column_list] DEFAULT VALUES | values_list | select statement</p>
<p>وعند إدراج صفوف بعبارة INSERT، تنطبق القواعد التالية:</p>
<ul>
<li>إدراج سلسلة فارغة (‘ ‘) في عمود varchar أو text يُدرِج مسافة واحدة.</li>
<li>تُحشو جميع أعمدة char من اليمين حتى الطول المحدَّد.</li>
<li>تُزال جميع المسافات الزائدة من البيانات المُدرَجة في أعمدة varchar، باستثناء السلاسل التي لا تحوي سوى مسافات. وتُقتطع هذه السلاسل إلى مسافة واحدة.</li>
<li>إذا خالفت عبارة INSERT قيدًا أو قيمة افتراضية أو قاعدة، أو إذا كان نوع البيانات خاطئًا، تفشل العبارة ويعرض SQL Server رسالة خطأ.</li>
</ul>
<p>عند تحديد قيم لبعض الأعمدة في column_list فقط، يمكن أن يحدث لأعمدة لا قيم لها واحد من ثلاثة أمور:</p>
<ul>
<li>تُدخَل قيمة افتراضية إذا كان للعمود قيد DEFAULT، أو إذا كانت القيمة الافتراضية مرتبطة بالعمود، أو إذا كانت القيمة الافتراضية مرتبطة بنوع البيانات المعرَّف من المستخدم الأساسي.</li>
<li>تُدخَل القيمة NULL إذا كان العمود يسمح بقيم NULL ولم تكن هناك قيمة افتراضية للعمود.</li>
<li>تُعرض رسالة خطأ ويُرفض الصف إذا كان العمود معرَّفًا بأنه NOT NULL ولم تكن هناك قيمة افتراضية.</li>
</ul>
<p>يستخدم هذا المثال INSERT لإضافة سجل إلى جدول الناشرين Authors.</p>
<p>INSERT INTO Authors VALUES(‘555-093-467’, ‘Martin’, ‘April’, ‘281 555-5673’, ‘816 Market St.,’ , ‘Vancouver’, ‘BC’, ‘V7G3P4’, 0)</p>
<p>ويوضح المثال التالي كيفية إدراج صف جزئي في جدول الناشرين Publishers مع سرد الأعمدة. وكان لعمود البلد قيمة افتراضية هي Canada، لذا لا يلزم تضمينه في قيمك.</p>
<p>INSERT INTO Publishers (PubID, PubName, city, province) VALUES (‘9900’, ‘Acme Publishing’, ‘Vancouver’, ‘BC’)</p>
<p>ولإدراج صفوف في جدول يحوي عمود IDENTITY، اتبع المثال أدناه. ولا توفّر قيمة عمود IDENTITY ولا اسم العمود في قائمة الأعمدة.</p>
<p>INSERT INTO jobs VALUES (‘DBA’, 100, 175)</p>
<h3 id="إدراج-قيم-محددة-في-عمود-identity">إدراج قيم محدَّدة في عمود IDENTITY</h3>
<p>لا يمكن افتراضيًا إدراج البيانات مباشرة في عمود IDENTITY؛ لكن إذا حُذف صف بالخطأ، أو إذا كانت هناك فجوات في قيم عمود IDENTITY، فيمكنك إدراج صف مع تحديد قيمة عمود IDENTITY.</p>
<p>خيار IDENTITY_INSERT</p>
<p>للإسمح بالإدراج بقيمة هوية محدَّدة، يمكن استخدام خيار IDENTITY_INSERT على النحو التالي.</p>
<p>SET IDENTITY_INSERT jobs ON INSERT INTO jobs (job_id, job_desc, min_lvl, max_lvl) VALUES (19, ’DBA2’, 100, 175) SET IDENTITY_INSERT jobs OFF</p>
<h3 id="إدراج-الصفوف-بعبارة-select">إدراج الصفوف بعبارة SELECT</h3>
<p>نحتاج أحيانًا إلى إنشاء جدول مؤقت صغير من جدول كبير. ولهذا، يمكننا إدراج صفوف بعبارة SELECT. وعند استخدام هذا الأمر، لا يوجد تحقق من التفرّد. ونتيجة لذلك، قد توجد صفوف كثيرة لها القيمة pub_id نفسها في المثال أدناه.</p>
<p>ينشئ هذا المثال جدول ناشرين مؤقتًا أصغر باستخدام عبارة CREATE TABLE. ثم تُستخدم INSERT مع عبارة SELECT لإضافة سجلات إلى جدول الناشرين المؤقت هذا من جدول publis.</p>
<p>CREATE TABLE dbo.tmpPublishers ( PubID char (4) NOT NULL , PubName varchar (40) NULL , city varchar (20) NULL , province char (2) NULL , country varchar (30) NULL DEFAULT (‘Canada’) ) INSERT tmpPublishers SELECT * FROM Publishers</p>
<p>وفي هذا المثال، ننسخ مجموعة جزئية من البيانات.</p>
<p>INSERT tmpPublishers (pub_id, pub_name) SELECT PubID, PubName FROM Publishers</p>
<p>وفي هذا المثال، تُنسخ بيانات الناشرين إلى الجدول tmpPublishers وتُضبط قيمة عمود البلد على Canada.</p>
<p>INSERT tmpPublishers (PubID, PubName, city, province, country) SELECT PubID, PubName, city, province, ‘Canada’ FROM Publishers</p>
<h2 id="عبارة-update">عبارة UPDATE</h2>
<p>تغيّر عبارة UPDATE البيانات في الصفوف القائمة، سواء بإضافة بيانات جديدة أو بتعديل بيانات قائمة.</p>
<p>يستخدم هذا المثال عبارة UPDATE لتوحيد حقل البلد على Canada لكل السجلات في جدول الناشرين Publishers.</p>
<p>UPDATE Publishers SET country = ‘Canada’</p>
<p>ويزيد هذا المثال مبالغ رسوم الإتاوات (royalty) التي تتراوح بين 10 and 20 بنسبة 10%.</p>
<p>UPDATE roysched SET royalty = royalty + (royalty * .10) WHERE royalty BETWEEN 10 and 20</p>
<h3 id="تضمين-استعلامات-فرعية-subqueries-في-عبارة-update">تضمين استعلامات فرعية (subqueries) في عبارة UPDATE</h3>
<p>يُرقّى الموظفون من جدول Employees الذين وظّفهم الناشر عام 2010 إلى أعلى مستوى وظيفي لنوع وظيفتهم. وهذا هو ما ستبدو عليه عبارة UPDATE.</p>
<p>UPDATE Employees SET job_lvl = (SELECT max_lvl FROM jobs WHERE employee.job_id = jobs.job_id) WHERE DATEPART(year, employee.hire_date) = 2010</p>
<h2 id="عبارة-delete">عبارة DELETE</h2>
<p>تزيل عبارة DELETE الصفوف من مجموعة سجلات. وتُسمّي DELETE الجدول أو العرض الذي يحوي الصفوف التي ستُحذف، ولا يمكن سرد أكثر من جدول أو صف واحد في الوقت نفسه. وWHERE هي عبارة WHERE اعتيادية تحدّ من الحذف إلى السجلات المحدَّدة.</p>
<p>تبدو صيغة DELETE على النحو التالي.</p>
<p>DELETE [FROM] {table_name | view_name } [WHERE clause]</p>
<p>وقواعد عبارة DELETE هي:</p>
<ul>
<li>إذا أغفلت جملة WHERE، فستُزال جميع الصفوف في الجدول (باستثناء الفهارس (indexes) والجدول والقيود).</li>
<li>لا يمكن استخدام DELETE مع عرض (view) يحوي جملة FROM تسمّي أكثر من جدول واحد. (يمكن أن يؤثر الحذف على جدول أساسي واحد فقط في الوقت نفسه.)</li>
</ul>
<p>وفيما يلي ثلاث عبارات DELETE مختلفة يمكن استخدامها.</p>
<ol>
<li>حذف جميع الصفوف من جدول.</li>
</ol>
<p>DELETE FROM Discounts</p>
<ol start="2">
<li>حذف صفوف محدَّدة:</li>
</ol>
<p>DELETE FROM Sales WHERE stor_id = ‘6380’</p>
<ol start="3">
<li>حذف الصفوف استنادًا إلى قيمة في استعلام فرعي (subquery):</li>
</ol>
<p>DELETE FROM Sales WHERE title_id IN (SELECT title_id FROM Books WHERE type = ‘mod_cook’)</p>
<h1>الدوال المدمجة (built-in functions)</h1>
<p>توجد في SQL Server دوال مدمجة (built-in functions) كثيرة، مثل:</p>
<ul>
<li>التجميعية (Aggregate): تُعيد قيمًا ملخَّصة</li>
<li>التحويل (Conversion): تحوّل نوع بيانات إلى نوع آخر</li>
<li>التاريخ (Date): تعرض معلومات عن التواريخ والأوقات</li>
<li>الرياضية (Mathematical): تنفّذ عمليات على البيانات الرقمية</li>
<li>النصوص (String): تنفّذ عمليات على سلاسل المحارف أو البيانات الثنائية أو التعابير</li>
<li>النظام (System): تُعيد معلومة خاصة من قاعدة البيانات</li>
<li>النصوص والصور (Text and image): تنفّذ عمليات على بيانات النصوص والصور</li>
</ul>
<p>فيما يلي أوصاف تفصيلية وأمثلة للدوال الأربع الأولى.</p>
<h2 id="الدوال-التجميعية-aggregate-functions">الدوال التجميعية (aggregate functions)</h2>
<p>تنفّذ الدوال التجميعية حسابًا على مجموعة من القيم وتُعيد قيمة واحدة، أي قيمة ملخَّصة. ويسرد الجدول 16.4 هذه الدوال.</p>
<table>
<thead>
<tr>
<th>الدالة</th>
<th>الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td>AVG</td>
<td>تُعيد متوسط جميع قيم التعبير، أو قيم DISTINCT منها فقط.</td>
</tr>
<tr>
<td>COUNT</td>
<td>تُعيد عدد القيم غير الفارغة (non-null) في التعبير. وإذا حُدِّدت DISTINCT، فتُعدّ COUNT عدد القيم الفريدة غير الفارغة.</td>
</tr>
<tr>
<td>COUNT(*)</td>
<td>تُعيد عدد الصفوف. ولا تأخذ COUNT(*) أي وسائط ولا يمكن استخدامها مع DISTINCT.</td>
</tr>
<tr>
<td>MAX</td>
<td>تُعيد أكبر قيمة في التعبير. ويمكن استخدام MAX مع الأعمدة الرقمية والمحرفية وأعمدة datetime، لكن ليس مع أعمدة bit. ومع الأعمدة المحرفية، تجد MAX أعلى قيمة في تسلسل الفرز. وتتجاهل MAX أي قيم فارغة (null).</td>
</tr>
<tr>
<td>MIN</td>
<td>تُعيد أصغر قيمة في التعبير. ويمكن استخدام MIN مع الأعمدة الرقمية والمحرفية وأعمدة datetime، لكن ليس مع أعمدة bit. ومع الأعمدة المحرفية، تجد MIN القيمة الأدنى في تسلسل الفرز. وتتجاهل MIN أي قيم فارغة.</td>
</tr>
<tr>
<td>SUM</td>
<td>تُعيد مجموع جميع قيم التعبير، أو قيم DISTINCT منها فقط. ولا يمكن استخدام SUM إلا مع الأعمدة الرقمية.</td>
</tr>
</tbody>
</table>
<p>الجدول 16.4 قائمة بالدوال التجميعية وأوصافها.</p>
<p>فيما يلي أمثلة لكل دالة تجميعية مدرجة في الجدول 16.4.</p>
<p>المثال رقم 1: AVG</p>
<p>SELECT AVG (price) AS ‘Average Title Price’ FROM Books</p>
<p>المثال رقم 2: COUNT</p>
<p>SELECT COUNT(PubID) AS ‘Number of Publishers’ FROM Publishers</p>
<p>المثال رقم 3: COUNT</p>
<p>SELECT COUNT(province) AS ‘Number of Publishers’ FROM Publishers</p>
<p>المثال رقم 3: COUNT (*)</p>
<p>SELECT COUNT(*) FROM Employees WHERE job_lvl = 35</p>
<p>المثال رقم 4: MAX</p>
<p>SELECT MAX (HireDate) FROM Employees</p>
<p>المثال رقم 5: MIN</p>
<p>SELECT MIN (price) FROM Books</p>
<p>المثال رقم 6: SUM</p>
<p>SELECT SUM(discount) AS ‘Total Discounts’ FROM Discounts</p>
<h2 id="دالة-التحويل-conversion-function">دالة التحويل (conversion function)</h2>
<p>تحوّل دالة التحويل نوع بيانات إلى نوع آخر.</p>
<p>في المثال أدناه، يُحوَّل سعر يحوي الرقم 9 مرتين إلى خمسة محارف. وصيغة هذه العبارة هي SELECT ‘The date is ‘ + CONVERT(varchar(12), getdate()).</p>
<p>SELECT CONVERT(int, 10.6496) SELECT title_id, price FROM Books WHERE CONVERT(char(5), price) LIKE ‘%99%’</p>
<p>وفي هذا المثال الثاني، تغيّر دالة التحويل البيانات إلى نوع بيانات بحجم مختلف.</p>
<p>SELECT title_id, CONVERT(char(4), ytd_sales) as ‘Sales’ FROM Books WHERE type LIKE ‘%cook’</p>
<h2 id="دالة-التاريخ-date-function">دالة التاريخ (date function)</h2>
<p>تُنتج دالة التاريخ تاريخًا بإضافة فاصل زمني (interval) إلى تاريخ محدَّد. والنتيجة هي قيمة datetime تساوي التاريخ زائد عدد أجزاء التاريخ. وإذا كانت معامل التاريخ من نوع smalldatetime، فستكون النتيجة أيضًا من نوع smalldatetime.</p>
<p>تُستخدم الدالة DATEADD لإضافة قيم التاريخ وزيادتها. وصيغة هذه الدالة هي DATEADD(datepart, number, date).</p>
<p>SELECT DATEADD(day, 3, hire_date) FROM Employees</p>
<p>وفي هذا المثال، تُستخدم الدالة DATEDIFF(datepart, date1, date2).</p>
<p>ويُعيد هذا الأمر عدد “حدود” أجزاء التاريخ (datepart) التي تم عبورها بين تاريخين محدّدين.</p>
<p>SELECT DATEDIFF(day, HireDate, ‘Nov 30 1995’) FROM Employees</p>
<p>ولأي تاريخ بعينه، يمكننا فحص أي جزء من ذلك التاريخ من السنة إلى جزء الألف من الثانية.</p>
<p>وأجزاء التاريخ (DATEPART) واختصاراتها التي يتعرف عليها SQL Server، والقيم المقبولة مدرجة في الجدول 16.5.</p>
<table>
<thead>
<tr>
<th>جزء التاريخ</th>
<th>الاختصار</th>
<th>القيم</th>
</tr>
</thead>
<tbody>
<tr>
<td>السنة</td>
<td>yy</td>
<td>1753-9999</td>
</tr>
<tr>
<td>ربع السنة</td>
<td>qq</td>
<td>1-4</td>
</tr>
<tr>
<td>الشهر</td>
<td>mm</td>
<td>1-12</td>
</tr>
<tr>
<td>يوم من السنة</td>
<td>dy</td>
<td>1-366</td>
</tr>
<tr>
<td>اليوم</td>
<td>dd</td>
<td>1-31</td>
</tr>
<tr>
<td>الأسبوع</td>
<td>wk</td>
<td>1-53</td>
</tr>
<tr>
<td>يوم الأسبوع</td>
<td>dw</td>
<td>1-7 (Sun.-Sat.)</td>
</tr>
<tr>
<td>الساعة</td>
<td>hh</td>
<td>0-23</td>
</tr>
<tr>
<td>الدقيقة</td>
<td>mi</td>
<td>0-59</td>
</tr>
<tr>
<td>الثانية</td>
<td>ss</td>
<td>0-59</td>
</tr>
<tr>
<td>جزء الألف من الثانية</td>
<td>ms</td>
<td>0-999</td>
</tr>
</tbody>
</table>
<p>الجدول 16.5. اختصارات أجزاء التاريخ وقيمها.</p>
<h2 id="الدوال-الرياضية-mathematical-functions">الدوال الرياضية (mathematical functions)</h2>
<p>تنفّذ الدوال الرياضية عمليات على البيانات الرقمية. ويعرض المثال التالي السعر الحالي لكل كتاب باعته الناشر، وكيف سيكون السعر لو زادت جميع الأسعار بنسبة 10%.</p>
<p>SELECT Price, (price * 1.1) AS ‘New Price’, title FROM Books SELECT ‘Square Root’ = SQRT(81) SELECT ‘Rounded‘ = ROUND(4567.9876,2) SELECT FLOOR (123.45)</p>
<h1>ضمّ الجداول (joining tables)</h1>
<p>ضمّ جدولين أو أكثر هو عملية مقارنة البيانات في الأعمدة المحدَّدة واستخدام نتائج المقارنة لتكوين جدول جديد من الصفوف المؤهلة. وعبارة الضمّ (join):</p>
<ul>
<li>تحدد عمودًا من كل جدول</li>
<li>تقارن القيم في تلك الأعمدة صفًا بصف</li>
<li>تدمج الصفوف ذات القيم المؤهلة في صف جديد</li>
</ul>
<p>وعلى رغم أن المقارنة تكون عادةً بالتساوي – أي بقيم متطابقة تماماً – فإنه يمكن أيضاً تحديد أنواع أخرى من عمليات الضمّ. وفيما يلي وصف لجميع عمليات الضمّ المختلفة، مثل الضمّ الخارجي الأيسر (left outer join) والأيمن (right outer join) والمتقاطع (cross join).</p>
<h2 id="الضم-الداخلي-inner-join">الضمّ الداخلي (inner join)</h2>
<p>يربط الضمّ الداخلي جدولين على عمود لهما نوع البيانات نفسه. ولا تُعاد إلا الصفوف التي تتطابق فيها قيم العمودين؛ أما الصفوف غير المتطابقة فتُهمَل.</p>
<p>المثال رقم 1</p>
<p>SELECT jobs.job_id, job_desc FROM jobs INNER JOIN Employees ON employee.job_id = jobs.job_id WHERE jobs.job_id &lt; 7</p>
<p>المثال رقم 2</p>
<p>SELECT authors.au_fname, authors.au_lname, books.royalty, title FROM authorsINNER JOIN titleauthor ON authors.au_id=titleauthor.au_id INNER JOIN books ON titleauthor.title_id=books.title_id GROUP BY authors.au_lname, authors.au_fname, title, title.royalty ORDER BY authors.au_lname</p>
<h2 id="الضم-الخارجي-الأيسر-left-outer-join">الضمّ الخارجي الأيسر (left outer join)</h2>
<p>يحدد الضمّ الخارجي الأيسر أن جميع الصفوف الخارجية اليسرى ستُعاد. وتُدرَج في مجموعة النتائج جميع الصفوف من الجدول الأيسر التي لم تستوفِ الشرط المحدَّد، وتضبط أعمدة الإخراج من الجدول الآخر على NULL.</p>
<p>ويستخدم هذا المثال الأول الصيغة الجديدة للضمّ الخارجي الأيسر.</p>
<p>SELECT publishers.pub_name, books.title FROM Publishers LEFT OUTER JOIN Books On publishers.pub_id = books.pub_id</p>
<p>وهذا مثال على ضمّ خارجي أيسر باستخدام الصيغة القديمة.</p>
<p>SELECT publishers.pub_name, books.title FROM Publishers, Books WHERE publishers.pub_id *= books.pub_id</p>
<h2 id="الضم-الخارجي-الأيمن-right-outer-join">الضمّ الخارجي الأيمن (right outer join)</h2>
<p>يشمل الضمّ الخارجي الأيمن في مجموعة نتائجه جميع الصفوف من الجدول الأيمن التي لم تستوفِ الشرط المحدّد. وتضبط أعمدة الإخراج المقابلة للجدول الآخر على NULL.</p>
<p>وفيما يلي مثال باستخدام الصيغة الجديدة للضمّ الخارجي الأيمن.</p>
<p>SELECT titleauthor.title_id, authors.au_lname, authors.au_fname FROM titleauthor RIGHT OUTER JOIN authors ON titleauthor.au_id = authors.au_id ORDERY BY au_lname</p>
<p>ويوضح هذا المثال الثاني الصيغة القديمة المستخدمة في الضمّ الخارجي الأيمن.</p>
<p>SELECT titleauthor.title_id, authors.au_lname, authors.au_fname FROM titleauthor, authors WHERE titleauthor.au_id =* authors.au_id ORDERY BY au_lname</p>
<h2 id="الضم-الخارجي-الكامل-full-outer-join">الضمّ الخارجي الكامل (full outer join)</h2>
<p>يحدد الضمّ الخارجي الكامل أنه إذا لم يطابق صف من أي من الجدولين معايير الاختيار، فإن الصف يُدرَج في مجموعة النتائج، وتضبط أعمدة الإخراج فيه المقابلة للجدول الآخر على NULL.</p>
<p>وفيما يلي مثال على الضمّ الخارجي الكامل.</p>
<p>SELECT books.title, publishers.pub_name, publishers.province FROM Publishers FULL OUTER JOIN Books ON books.pub_id = publishers.pub_id WHERE (publishers.province &lt;&gt; “BC” and publishers.province &lt;&gt; “ON”) ORDER BY books.title_id</p>
<h2 id="الضم-المتقاطع-cross-join">الضمّ المتقاطع (cross join)</h2>
<p>الضمّ المتقاطع هو حاصل ضرب يجمع جدولين. وتعيد هذه العملية الضمّ نفس الصفوف التي لو لم تُحدَّد جملة WHERE. فمثلًا:</p>
<p>SELECT au_lname, pub_name, FROM Authors CROSS JOIN Publishers</p>
<p>دالة تجميعية (aggregate function): تُعيد قيمًا ملخَّصة. ASC: ترتيب تصاعدي</p>
<p>دالة التحويل (conversion function): تحوّل نوع بيانات إلى نوع آخر</p>
<p>ضمّ متقاطع (cross join): حاصل ضرب يجمع جدولين</p>
<p>دالة التاريخ (date function): تعرض معلومات عن التواريخ والأوقات</p>
<p>عبارة DELETE: تزيل الصفوف من مجموعة سجلات</p>
<p>DESC: ترتيب تنازلي</p>
<p>ضمّ خارجي كامل (full outer join): يحدد أنه إذا لم يطابق صف من أي من الجدولين معايير الاختيار</p>
<p>GROUP BY: يُستخدم لإنشاء صف ناتج واحد لكل مجموعة وينتج قيمًا ملخَّصة للأعمدة المحدَّدة</p>
<p>ضمّ داخلي (inner join): يربط جدولين على عمود لهما نوع البيانات نفسه</p>
<p>عبارة INSERT: تضيف صفوفًا إلى جدول</p>
<p>ضمّ خارجي أيسر (left outer join): يحدد أن جميع الصفوف الخارجية اليسرى ستُعاد</p>
<p>دالة رياضية (mathematical function): تنفّذ عمليات على البيانات الرقمية</p>
<p>ضمّ خارجي أيمن (right outer join): يضمّ جميع الصفوف من الجدول الأيمن التي لم تستوفِ الشرط المحدَّد</p>
<p>عبارة SELECT: تُستخدم للاستعلام عن البيانات في قاعدة البيانات</p>
<p>دالة نصوص (string function): تنفّذ عمليات على سلاسل المحارف أو البيانات الثنائية أو التعابير</p>
<p>دالة نظام (system function): تُعيد معلومة خاصة من قاعدة البيانات</p>
<p>دوال النصوص والصور (text and image functions): تنفّذ عمليات على بيانات النصوص والصور</p>
<p>عبارة UPDATE: تغيّر البيانات في الصفوف القائمة، سواء بإضافة بيانات جديدة أو بتعديل بيانات قائمة</p>
<p>المحرف البديل (wildcard): يسمح للمستخدم بمطابقة الحقول التي تحوي حروفًا معيَّنة.</p>
<p>للأسئلة من 1 إلى 18، استخدم قاعدة بيانات العينة PUBS التي أنشأتها Microsoft. ولتنزيل السكربت اللازم لإنشاء قاعدة البيانات هذه، انتقل إلى الموقع التالي: <a href="http://www.microsoft.com/en-ca/download/details.aspx?id=23654">http://www.microsoft.com/en-ca/download/details.aspx?id=23654</a>.</p>
<ul>
<li>
<p>اعرض قائمة بتواريخ النشر وعناوين الكتب التي نُشرت في عام 2011.</p>
</li>
<li>
<p>اعرض قائمة بعناوين الكتب التي صُنِّفت إما على أنها طبخ تقليدي أو حديث. استخدم جدول Books.</p>
</li>
<li>
<p>اعرض جميع المؤلفين الذين تتكوّن أسماؤهم الأولى من خمسة محارف.</p>
</li>
<li>
<p>اعرض من جدول Books الحقول type وprice وpub_id وtitle الخاصة بالكتب التي أصدرها كل ناشر. وأعِد تسمية العمود type إلى “Book Category”. ورتّب حسب type (تنازليًا) ثم حسب price (تصاعديًا).</p>
</li>
<li>
<p>اعرض title_id وpubdate وpubdate مضافًا إليها ثلاثة أيام، باستخدام جدول Books.</p>
</li>
<li>
<p>باستخدام الدالتين datediff وgetdate، حدّد المدة المنقضية بالأشهر منذ نشر الكتب الموجودة في جدول Books.</p>
</li>
<li>
<p>سرد معرّفات العناوين (title IDs) وكميات جميع الكتب التي بيعت أكثر من 30 نسخة.</p>
</li>
<li>
<p>اعرض قائمة بجميع أسماء العائلة للمؤلفين الذين يعيشون في أونتاريو (ON) والمدن التي يعيشون فيها.</p>
</li>
<li>
<p>اعرض جميع الصفوف التي تحوي القيمة 60 في حقل payterms. استخدم جدول Sales.</p>
</li>
<li>
<p>اعرض جميع المؤلفين الذين تتكوّن أسماؤهم الأولى من خمسة محارف، وتنتهي بالحرف O أو A، وتبدأ بالحرف M أو P.</p>
</li>
<li>
<p>اعرض جميع العناوين التي تكلف أكثر من 30 دولارًا، وتبدأ إمّا بالحرف T أو يكون معرّف الناشر فيها هو 0877.</p>
</li>
<li>
<p>اعرض من جدول Employees الأعمدة fname (الاسم الأول) وlname (اسم العائلة) وemp_id (معرّف الموظف) وjob_lvl (المستوى الوظيفي) لهؤلاء الموظفين الذين مستواهم الوظيفي أكبر من 200؛ وأعِد تسمية عناوين الأعمدة إلى: “First Name” و“Last Name” و“IDENTIFICATION#” و“Job Level”.</p>
</li>
<li>
<p>اعرض royalty وroyalty مضافًا إليها 50% تحت اسم “royalty plus 50” وtitle_id. استخدم جدول Roysched.</p>
</li>
<li>
<p>باستخدام الدالة STUFF، أنشئ السلسلة “12xxxx567” من السلسلة “1234567”.</p>
</li>
<li>
<p>اعرض أول 40 محرفًا من كل عنوان، إلى جانب متوسط المبيعات الشهرية لذلك العنوان حتى تاريخه (ytd_sales/12). استخدم جدول Title.</p>
</li>
<li>
<p>بيّن كم عدد الكتب التي لها أسعار محدَّدة.</p>
</li>
<li>
<p>اعرض قائمة بكتب الطبخ مع متوسط تكلفة جميع كتب كل نوع. استخدم GROUP BY.</p>
</li>
<li>
<p>لا تعمل معاملات المجموعات العلائقية (relational set operators) UNION وINTERSECT وMINUS بشكل صحيح إلا إذا كانت العلاقات متوافقة مع الاتحاد (union-compatible). فما الذي يعنيه التوافق مع الاتحاد، وكيف تتحقق من هذا الشرط؟</p>
</li>
<li>
<p>ما الفرق بين UNION وUNION ALL؟ اكتب صيغة كل منهما.</p>
</li>
<li>
<p>ولنفترض أن لديك جدولين هما Employees وEmployees_1. ويحتوي جدول Employees على سجلات ثلاثة موظفين هم: Alice Cordoza وJohn Cretchakov وAnne McDonald. ويحتوي جدول Employees_1 على سجلات الموظفين: John Cretchakov وMary Chen. وبالنظر إلى هذه المعلومات، ما ناتج استعلام UNION؟ سرد الناتج.</p>
</li>
<li>
<p>بالنظر إلى معلومات الموظفين في السؤال 3، ما ناتج استعلام UNION ALL؟ سرد الناتج.</p>
</li>
<li>
<p>بالنظر إلى معلومات الموظفين في السؤال 3، ما ناتج استعلام INTERSECT؟ سرد الناتج.</p>
</li>
<li>
<p>بالنظر إلى معلومات الموظفين في السؤال 3، ما ناتج استعلام EXCEPT؟ سرد الناتج.</p>
</li>
<li>
<p>ما هو الضمّ المتقاطع (cross join)؟ أعطِ مثالًا على صيغته.</p>
</li>
<li>
<p>اشرح أنواع الضمّ الثلاثة التالية: الضمّ الخارجي الأيسر</p>
</li>
<li>
<p>الضمّ الخارجي الأيمن</p>
</li>
<li>
<p>الضمّ الخارجي الكامل</p>
</li>
</ul>
<p>ما هو الاستعلام الفرعي (subquery)، وما خصائصه الأساسية؟ وما هو الاستعلام الفرعي المترابط (correlated subquery)؟ أعطِ مثالًا. ولنفترض أن جدول Product يحوي خاصيتين هما PROD_CODE وVEND_CODE. وقيم PROD_CODE هي: ABC وDEF وGHI وJKL. وتُقابَل بالقيم التالية لـVEND_CODE: 125 و124 و124 و123 على التوالي (مثلًا، قيمة PROD_CODE وهي ABC تقابل قيمة VEND_CODE وهي 125). ويحتوي جدول Vendor على خاصية واحدة هي VEND_CODE بقيمها 123 و124 و125 و126. (وخاصية VEND_CODE في جدول Product هي مفتاح أجنبي (foreign key) يشير إلى VEND_CODE في جدول Vendor.) وبالنظر إلى المعلومات في السؤال 11، ما ناتج الاستعلام لكل مما يلي؟ بيّن القيم.</p>
<ul>
<li>
<p>استعلام UNION قائم على هذين الجدولين</p>
</li>
<li>
<p>استعلام UNION ALL قائم على هذين الجدولين</p>
</li>
<li>
<p>استعلام INTERSECT قائم على هذين الجدولين</p>
</li>
<li>
<p>استعلام MINUS قائم على هذين الجدولين</p>
</li>
<li>
<p>اعرض قائمة بجميع العناوين وأرقام المبيعات في جدولي Books وSales، بما في ذلك العناوين التي لا مبيعات لها. استخدم ضمًّا (join).</p>
</li>
<li>
<p>اعرض قائمة بأسماء عائلة المؤلفين والعناوين المرتبطة التي أصدرها كل مؤلف، مرتبة حسب اسم عائلة المؤلف. استخدم ضمًّا. واحفظها كعرض (view) باسم: Published Authors.</p>
</li>
<li>
<p>باستخدام استعلام فرعي، اعرض جميع المؤلفين (اعرض اسم العائلة والاسم الأول والرمز البريدي) الذين يحصلون على إتاوات 100% ويعيشون في ألبرتا. واحفظه كعرض بعنوان: AuthorsView. وعند إنشاء العرض، أعِد تسمية اسم عائلة المؤلف واسمه الأول إلى ‘Last Name’ و‘First Name’.</p>
</li>
<li>
<p>اعرض المتاجر التي لم تبع العنوان Is Anger the Enemy?</p>
</li>
<li>
<p>اعرض قائمة بأسماء المتاجر للمبيعات بعد عام 2013 (أي أن تاريخ الطلب أكبر من 2013). واعرض اسم المتجر وتاريخ الطلب.</p>
</li>
<li>
<p>اعرض قائمة بالعناوين للكتب المباعة في المتجر المسمى “News &amp; Brews”. واعرض اسم المتجر والعناوين وتواريخ الطلبات.</p>
</li>
<li>
<p>سرد إجمالي المبيعات (qty) حسب العنوان. واعرض عمودَي الكمية الإجمالية والعنوان.</p>
</li>
<li>
<p>سرد إجمالي المبيعات (qty) حسب النوع. واعرض عمودَي الكمية الإجمالية والنوع.</p>
</li>
<li>
<p>سرد إجمالي المبيعات (qty*price) حسب النوع. واعرض عمودَي القيمة الدولارية الإجمالية والنوع.</p>
</li>
<li>
<p>احسب العدد الإجمالي لأنواع الكتب لكل ناشر. وبيّن اسم الناشر والعدد الإجمالي لأنواع الكتب لكل ناشر.</p>
</li>
<li>
<p>بيّن أسماء الناشرين الذين ليس لديهم أي نوع من الكتب. واعرض اسم الناشر فقط.</p>
</li>
</ul>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:o};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,o as html,l as slug,p as title};
