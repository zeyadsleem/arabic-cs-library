---
title: "معالجة البيانات في SQL"
lang: ar
source: https://opentextbc.ca/dbdesign01/chapter/chapter-sql-dml/
---
المتن الرئيسي

```sql
SELECT  FirstName, LastName, phone

FROM Employees

ORDER BY LastName
```

تُستخدم لغة معالجة البيانات (data manipulation language)‏ (DML) في SQL للاستعلام عن بيانات قاعدة البيانات وتعديلها. وفي هذا الفصل، سنشرح كيفية استخدام عبارات أوامر DML في SQL وهي SELECT وINSERT وUPDATE وDELETE، والمعرَّفة أدناه.

```sql
SELECT PubName, city

FROM Publishers
```

- SELECT – للاستعلام عن البيانات في قاعدة البيانات
- INSERT – لإدراج البيانات في جدول
- UPDATE – لتحديث البيانات في جدول
- DELETE – لحذف البيانات من جدول

```sql
SELECT PubName city

FROM Publishers
```

في عبارة DML الخاصة بـ SQL:

```sql
SELECT StorID, qty, TitleID

FROM Sales

WHERE qty BETWEEN 20 and 50  (includes the 20 and 50)
```

- يجب أن تبدأ كل جملة (clause) في العبارة على سطر جديد.
- يجب أن تصطف بداية كل جملة عند المحاذاة نفسها مع بداية الجمل الأخرى.
- إذا كانت لأحد الجمل عدة أجزاء، فيجب أن تظهر في أسطر منفصلة وتُزاح إلى الداخل تحت بداية الجملة لإظهار العلاقة بينها.
- تُستخدم الأحرف الكبيرة لتمثيل الكلمات المحجوزة (reserved words).
- تُستخدم الأحرف الصغيرة لتمثيل الكلمات التي عرّفها المستخدم.

```sql
SELECT StorID, qty, TitleID

FROM Sales

WHERE qty >= 20 and qty  <= 50
```

# عبارة SELECT

```sql
SELECT StorID, qty, TitleID

FROM Sales

WHERE qty NOT BETWEEN 20 and 50
```

تتيح عبارة SELECT، أو الأمر، للمستخدم استخراج البيانات من الجداول (tables) وفق معايير محدَّدة. وتُنفَّذ وفق التسلسل التالي:

```sql
SELECT *

FROM Publishers

WHERE province = ‘BC’ OR province = ‘AB’ OR province = ‘ON’
```

SELECT DISTINCT item(s) FROM table(s) WHERE predicate GROUP BY field(s) ORDER BY fields

```sql
SELECT *

FROM Publishers

WHERE province IN (‘BC’, ‘AB’, ‘ON’)
```

ويمكننا استخدام عبارة SELECT لإنشاء قائمة بأرقام هواتف الموظفين من جدول Employees على النحو التالي:

```sql
SELECT price, title

FROM Books

WHERE price IS NULL
```

SELECT FirstName, LastName, phone FROM Employees ORDER BY LastName

```sql
SELECT price, title

FROM Books

WHERE price IS NOT NULL
```

سيؤدي هذا الإجراء إلى عرض اسم عائلة الموظف واسمه الأول ورقم هاتفه من جدول Employees، كما هو مبين في الجدول 16.1.

```sql
SELECT LastName

FROM Employees

WHERE LastName LIKE ‘Mc%’
```

| اسم العائلة | الاسم الأول | رقم الهاتف |
| --- | --- | --- |
| Hagans | Jim | 604-232-3232 |
| Wong | Bruce | 604-244-2322 |

```sql
SELECT LastName

FROM Employees

WHERE LastName LIKE ‘%inger’
```

الجدول 16.1. جدول Employees.

```sql
SELECT LastName

FROM Employees

WHERE LastName LIKE ‘%en%’
```

في المثال التالي، سنستخدم جدول الناشرين (Publishers) (الجدول 16.2). (ولاحِظ أن كلمة Canada مكتوبة خطأً في حقل بلد الناشر لكل من Example Publishing وABC Publishing. ولتصحيح الخطأ، استخدم عبارة UPDATE لتوحيد حقل البلد على Canada – انظر عبارة UPDATE لاحقًا في هذا الفصل.)

```sql
SELECT *

FROM Employees

ORDER BY HireDate ASC
```

| اسم الناشر | مدينة الناشر | مقاطعة الناشر | بلد الناشر |
| --- | --- | --- | --- |
| Acme Publishing | Vancouver | BC | Canada |
| Example Publishing | Edmonton | AB | Cnada |
| ABC Publishing | Toronto | ON | Canda |

```sql
SELECT *

FROM Books

ORDER BY type, price DESC
```

الجدول 16.2. جدول Publishers.

```sql
SELECT type

FROM Books

GROUP BY type
```

إذا أردت إضافة اسم الناشر ومدينته، فستستخدم عبارة SELECT تليها أسماء الحقول مفصولة بفاصلة:

```sql
SELECT type AS ‘Type’, MIN(price) AS ‘Minimum Price’

FROM Books

WHERE royalty > 10

GROUP BY type
```

SELECT PubName, city FROM Publishers

```sql
SELECT type, price

FROM Books

WHERE price is not null
```

سيؤدي هذا الإجراء إلى عرض اسم الناشر ومدينة الناشر من جدول Publishers.

```sql
SELECT type AS ‘Type’, MIN(price) AS ‘Minimum Price’

FROM Books

WHERE price is not null

GROUP BY type
```

وإذا كنت تريد اسم الناشر فقط تحت عنوان العرض city، فستستخدم عبارة SELECT من دون فاصلة تفصل بين pub_name وcity:

```sql
SELECT COUNT(*)

FROM Books

GROUP BY type
```

SELECT PubName city FROM Publishers

```sql
SELECT AVG(qty)

FROM Books

GROUP BY type
```

سيؤدي تنفيذ هذا الإجراء إلى عرض قيمة pub_name فقط من جدول Publishers مع عنوان “city”. وإذا لم تُدرج الفاصلة، فسيفترض SQL Server أنك تريد اسم عمود جديدًا للقيمة pub_name.

```sql
SELECT SUM(qty)

FROM Books

GROUP BY type
```

## عبارة SELECT مع معيار WHERE

```sql
SELECT ‘Total Sales’ = SUM(qty), ‘Average Sales’ = AVG(qty), stor_id

FROM Sales

GROUP BY StorID ORDER BY  ‘Total Sales’
```

قد ترغب أحيانًا في التركيز على جزء من جدول الناشرين، مثل الناشرين الموجودين في Vancouver وحدهم. وفي هذه الحالة، ستستخدم عبارة SELECT مع معيار WHERE، أي WHERE city = ‘Vancouver’.

```sql
SELECT au_fname AS ‘Author”s First Name’, province as ‘Province’

FROM Authors

GROUP BY au_fname, province

HAVING province <> ‘BC’
```

يوضح المثالان الأولان كيفية تقييد اختيار السجلات بمعيار WHERE باستخدام BETWEEN. ويعطي كل من هذين المثالين النتيجة نفسها لعناصر المتجر التي يتراوح عددها بين 20 و50 في المخزون.

```sql
INSERT [INTO] Table_name | view name [column_list]

DEFAULT VALUES | values_list | select statement
```

يستخدم المثال رقم 1 الكمية qty BETWEEN 20 and 50.

```sql
INSERT INTO Authors

VALUES(‘555-093-467’, ‘Martin’, ‘April’, ‘281 555-5673’, ‘816 Market St.,’ , ‘Vancouver’, ‘BC’, ‘V7G3P4’, 0)
```

SELECT StorID, qty, TitleID FROM Sales WHERE qty BETWEEN 20 and 50 (يشمل 20 و50)

```sql
INSERT INTO Publishers (PubID, PubName, city, province)

VALUES (‘9900’, ‘Acme Publishing’, ‘Vancouver’, ‘BC’)
```

أما المثال رقم 2، من ناحية أخرى، فيستخدم qty >=20 وqty <=50 .

```sql
INSERT INTO jobs

VALUES (‘DBA’, 100, 175)
```

SELECT StorID, qty, TitleID FROM Sales WHERE qty >= 20 and qty <= 50

```sql
IDENTITY_INSERT option
```

يوضح المثال رقم 3 كيفية تقييد اختيار السجلات بمعيار WHERE باستخدام NOT BETWEEN.

```sql
SET IDENTITY_INSERT jobs ON

INSERT INTO jobs  (job_id, job_desc, min_lvl, max_lvl)

VALUES (19, ’DBA2’, 100, 175)

SET IDENTITY_INSERT jobs OFF
```

SELECT StorID, qty, TitleID FROM Sales WHERE qty NOT BETWEEN 20 and 50

```sql
CREATE TABLE dbo.tmpPublishers (

PubID char (4) NOT NULL ,

PubName varchar (40) NULL ,

city varchar (20) NULL ,

province char (2) NULL ,

country varchar (30) NULL  DEFAULT (‘Canada’)

)

INSERT  tmpPublishers

SELECT * FROM Publishers
```

يوضح المثالان التاليان طريقتين مختلفتين لتقييد اختيار السجلات بمعيار WHERE باستخدام IN، معطي كل منهما النتيجة نفسها.

```sql
INSERT tmpPublishers (pub_id, pub_name)

SELECT PubID, PubName

FROM Publishers
```

يوضح المثال رقم 4 كيفية اختيار السجلات باستخدام province= كجزء من عبارة WHERE.

```sql
INSERT tmpPublishers (PubID, PubName, city, province, country)

SELECT PubID, PubName, city, province, ‘Canada’

FROM Publishers
```

SELECT * FROM Publishers WHERE province = ‘BC’ OR province = ‘AB’ OR province = ‘ON’

```sql
UPDATE Publishers

SET country = ‘Canada’
```

ويُختار المثال رقم 5 السجلات باستخدام province IN كجزء من عبارة WHERE.

```sql
UPDATE roysched

SET royalty = royalty + (royalty * .10)

WHERE royalty BETWEEN 10 and 20
```

SELECT * FROM Publishers WHERE province IN (‘BC’, ‘AB’, ‘ON’)

```sql
UPDATE Employees

SET job_lvl =

(SELECT max_lvl FROM jobs

WHERE employee.job_id = jobs.job_id)

WHERE DATEPART(year, employee.hire_date) = 2010
```

يوضح المثالان الأخيران كيفية استخدام NULL وNOT NULL لاختيار السجلات. وفي هذين المثالين، يُستخدم جدول الكتب (Books) (غير المبيَّن) الذي يحوي حقولًا اسمها Title وQuantity وPrice (سعر الكتاب). ولكل ناشر جدول Books يسرد جميع كتبه.

```sql
DELETE [FROM] {table_name | view_name }

[WHERE clause]
```

يستخدم المثال رقم 6 القيمة NULL.

```sql
DELETE

FROM Discounts
```

SELECT price, title FROM Books WHERE price IS NULL

```sql
DELETE

FROM Sales

WHERE stor_id = ‘6380’
```

ويستخدم المثال رقم 7 القيمة NOT NULL.

```sql
DELETE FROM Sales

WHERE title_id IN

(SELECT title_id FROM Books WHERE type = ‘mod_cook’)
```

SELECT price, title FROM Books WHERE price IS NOT NULL

```sql
SELECT AVG (price) AS ‘Average Title Price’

FROM Books
```

## استخدام المحارف البديلة (wildcards) في جملة LIKE

```sql
SELECT COUNT(PubID) AS ‘Number of Publishers’

FROM Publishers
```

تختار الكلمة المفتاحية LIKE الصفوف التي تحوي حقولًا تطابق أجزاء محدَّدة من سلاسل المحارف. وتُستخدم LIKE مع بيانات char وvarchar وtext وdatetime وsmalldatetime. ويسمح المحرف البديل (wildcard) للمستخدم بمطابقة الحقول التي تحوي حروفًا معيَّنة. فمثلًا، يعطي المحرف البديل province = ‘N%’ جميع المقاطعات التي تبدأ بالحرف ‘N’. ويعرض الجدول 16.3 أربع طرق لتحديد المحارف البديلة في عبارة SELECT بصيغة التعابير النمطية (regular express format).

```sql
SELECT COUNT(province) AS ‘Number of Publishers’

FROM Publishers
```

| % | أي سلسلة من صفر أو أكثر من المحارف |
| --- | --- |
| _ | أي محرف مفرد |
| [ ] | أي محرف مفرد ضمن النطاق المحدَّد (مثل [a-f]) أو ضمن المجموعة (مثل [abcdef]) |
| [^] | أي محرف مفرد لا يقع ضمن النطاق المحدَّد (مثل [^a – f]) أو ضمن المجموعة (مثل [^abcdef]) |

```sql
SELECT COUNT(*)

FROM Employees

WHERE job_lvl = 35
```

الجدول 16.3. كيفية تحديد المحارف البديلة في عبارة SELECT.

```sql
SELECT MAX (HireDate)

FROM Employees
```

في المثال رقم 1، تبحث LIKE ‘Mc%’ عن جميع أسماء العائلة التي تبدأ بالحرفين “Mc” (مثل McBadden).

```sql
SELECT MIN (price)

FROM Books
```

SELECT LastName FROM Employees WHERE LastName LIKE ‘Mc%’

```sql
SELECT SUM(discount) AS ‘Total Discounts’

FROM Discounts
```

وفي المثال رقم 2: تبحث LIKE ‘%inger’ عن جميع أسماء العائلة التي تنتهي بالحروف “inger” (مثل Ringer وStringer).

```sql
SELECT CONVERT(int, 10.6496)

SELECT title_id, price

FROM Books

WHERE CONVERT(char(5), price) LIKE ‘%99%’
```

SELECT LastName FROM Employees WHERE LastName LIKE ‘%inger’

```sql
SELECT title_id, CONVERT(char(4), ytd_sales) as ‘Sales’

FROM Books

WHERE type LIKE ‘%cook’
```

وفي المثال رقم 3: تبحث LIKE ‘%en%’ عن جميع أسماء العائلة التي تحوي الحرفين “en” (مثل Bennett وGreen وMcBadden).

```sql
SELECT DATEADD(day, 3, hire_date)

FROM Employees
```

SELECT LastName FROM Employees WHERE LastName LIKE ‘%en%’

```sql
SELECT DATEDIFF(day, HireDate, ‘Nov 30 1995’)

FROM Employees
```

## عبارة SELECT مع جملة ORDER BY (ترتيب حسب)

```sql
SELECT Price, (price * 1.1) AS ‘New Price’, title

FROM Books

SELECT ‘Square Root’ = SQRT(81)

SELECT ‘Rounded‘ = ROUND(4567.9876,2)

SELECT FLOOR (123.45)
```

تستخدم جملة ORDER BY لترتيب السجلات في القائمة الناتجة. واستخدم ASC لترتيب النتائج تصاعديًا وDESC لترتيبها تنازليًا.

```sql
SELECT jobs.job_id, job_desc

FROM jobs

INNER JOIN Employees ON employee.job_id = jobs.job_id

WHERE jobs.job_id < 7
```

على سبيل المثال، مع ASC:

```sql
SELECT authors.au_fname, authors.au_lname, books.royalty, title

FROM authorsINNER JOIN titleauthor ON authors.au_id=titleauthor.au_id

INNER JOIN books ON titleauthor.title_id=books.title_id

GROUP BY authors.au_lname, authors.au_fname, title, title.royalty

ORDER BY authors.au_lname
```

SELECT * FROM Employees ORDER BY HireDate ASC

```sql
SELECT publishers.pub_name, books.title

FROM Publishers

LEFT OUTER JOIN Books On publishers.pub_id = books.pub_id
```

ومع DESC:

```sql
SELECT publishers.pub_name, books.title

FROM Publishers, Books

WHERE publishers.pub_id *= books.pub_id
```

SELECT * FROM Books ORDER BY type, price DESC

```sql
SELECT titleauthor.title_id, authors.au_lname, authors.au_fname

FROM titleauthor

RIGHT OUTER JOIN authors ON titleauthor.au_id = authors.au_id

ORDERY BY au_lname
```

## عبارة SELECT مع جملة GROUP BY (تجميع حسب)

```sql
SELECT titleauthor.title_id, authors.au_lname, authors.au_fname

FROM titleauthor, authors

WHERE titleauthor.au_id =* authors.au_id

ORDERY BY au_lname
```

تُستخدم جملة GROUP BY لإنشاء صف ناتج واحد لكل مجموعة، وتنتج قيمًا ملخَّصة للأعمدة المحدَّدة، كما هو موضح أدناه.

```sql
SELECT books.title, publishers.pub_name, publishers.province

FROM Publishers

FULL OUTER JOIN Books ON books.pub_id = publishers.pub_id

WHERE (publishers.province <> “BC” and publishers.province <> “ON”)

ORDER BY books.title_id
```

SELECT type FROM Books GROUP BY type

```sql
SELECT au_lname, pub_name,

FROM Authors CROSS JOIN Publishers
```

وفيما يلي مثال يستخدم العبارة أعلاه.

```sql
Key Terms

aggregate function: returns summary valuesASC: ascending order

conversion function: transforms one data type to another

cross join: a product combining two tables

date function: displays information about dates and times

DELETE statement: removes rows from a record set

DESC: descending order

full outer join: specifies that if a row from either table does not match the selection criteria

GROUP BY: used to create one output row per each group and produces summary values for the selected columns

inner join: connects two tables on a column with the same data type

INSERT statement: adds rows to a table

left outer join: specifies that all left outer rows be returned

mathematical function: performs operations on numeric data

right outer join: includes all rows from the right table that did not meet the condition specified

SELECT statement: used to query data in the database

string function: performs operations on character strings, binary data or expressions

system function: returns a special piece of information from the database

text and image functions: performs operations on text and image data

UPDATE statement: changes data in existing rows either by adding new data or modifying existing data

wildcard:  allows the user to match fields that contain certain letters.
```

SELECT type AS ‘Type’, MIN(price) AS ‘Minimum Price’ FROM Books WHERE royalty > 10 GROUP BY type

```sql
Exercises

For questions 1 to 18 use the PUBS sample database created by Microsoft. To download the script to generate this database please go to the following site: http://www.microsoft.com/en-ca/download/details.aspx?id=23654.

Display a list of publication dates and titles (books) that were published in 2011.
Display a list of titles that have been categorized as either traditional or modern cooking. Use the Books table.
Display all authors whose first names are five letters long.
Display from the Books table: type, price, pub_id, title about the books put out by each publisher. Rename the column type with ”Book Category.” Sort by type (descending) and then price (ascending).
Display title_id, pubdate and pubdate plus three days, using the Books table.
Using the datediff and getdate function determine how much time has elapsed in months since the books in the Books table were published.
List the title IDs and quantity of all books that sold more than 30 copies.
Display a list of all last names of the authors who live in Ontario (ON) and the cities where they live.
Display all rows that contain a 60 in the payterms field. Use the Sales table.
Display all authors whose first names are five letters long , end in O or A, and start with M or P.
Display all titles that cost more than $30 and either begin with T or have a publisher ID of  0877.
Display from the Employees table the first name (fname), last name (lname), employe ID(emp_id) and job level (job_lvl) columns for those employees with a job level greater than 200; and rename the column headings to:  “First Name,” “Last Name,” “IDENTIFICATION#” and “Job Level.”
Display the royalty, royalty plus 50% as “royalty plus 50” and title_id. Use the Roysched table.
Using the STUFF function create a string “12xxxx567” from the string “1234567.”
Display the first 40 characters of each title, along with the average monthly sales for that title to date (ytd_sales/12). Use the Title table.
Show how many books have assigned prices.
Display a list of cookbooks with the average cost for all of the books of each type. Use the GROUP BY.
```

وإذا كانت عبارة SELECT تتضمن معيار WHERE يكون فيه price ليس فارغًا (not null)،

```sql
Advanced Questions (Union, Intersect, and Minus)

The relational set operators UNION, INTERSECT and MINUS work properly only if the relations are union-compatible. What does union-compatible mean, and how would you check for this condition?
What is the difference between UNION and UNION ALL? Write the syntax for each.
Suppose that you have two tables, Employees and Employees_1. The Employees table contains the records for three employees: Alice Cordoza, John Cretchakov, and Anne McDonald. The Employees_1 table contains the records for employees: John Cretchakov and Mary Chen. Given that information, what is the query output for the UNION query? List the query output.
Given the employee information in question 3, what is the query output for the UNION ALL query? List the query output.
Given the employee information in question 3, what is the query output for the INTERSECT query? List the query output.
Given the employee information in question 3, what is the query output for the EXCEPT query? List the query output.
What is a cross join? Give an example of its syntax.
Explain these three join types:

left outer join
right outer join
full outer join

What is a subquery, and what are its basic characteristics?
What is a correlated subquery? Give an example.
Suppose that a Product table contains two attributes, PROD_CODE and VEND_CODE. The values for the PROD_CODE are: ABC, DEF, GHI and JKL. These are matched by the following values for the VEND_CODE:  125, 124, 124 and 123, respectively (e.g., PROD_CODE value ABC corresponds to VEND_CODE value 125). The Vendor table contains a single attribute, VEND_CODE, with values 123, 124, 125 and 126. (The VEND_CODE attribute in the Product table is a foreign key to the VEND_CODE in the Vendor table.)
Given the information in question 11, what would be the query output for the following? Show values.

A UNION query based on these two tables
A UNION ALL query based on these two tables
An INTERSECT query based on these two tables
A MINUS query based on these two tables
```

SELECT type, price FROM Books WHERE price is not null

```sql
Advanced Questions (Using Joins)

Display a list of all titles and sales numbers in the Books and Sales tables, including titles that have no sales. Use a join.
Display a list of authors’ last names and all associated titles that each author has published sorted by the author’s last name. Use a join.  Save it as a view named: Published Authors.
Using a subquery, display all the authors (show last and first name, postal code) who receive a royalty of 100% and live in Alberta. Save it as a view titled: AuthorsView. When creating the view, rename the author’s last name and first name as ‘Last Name’ and ‘First Name’.
Display the stores that did not sell the title Is Anger the Enemy?
Display a list of store names for sales after 2013 (Order Date is greater than 2013).  Display store name and order date.
Display a list of titles for books sold in store name “News & Brews.”  Display store name, titles and order dates.
List total sales (qty) by title. Display total quantity and title columns.
List total sales (qty) by type. Display total quantity and type columns.
List total sales (qty*price) by type. Display total dollar value and type columns.
Calculate the total number of types of books by publisher. Show publisher name and total count of types of books for each publisher.
Show publisher names that do not have any type of book.  Display publisher name only.
```

فإن العبارة التي تحوي جملة GROUP BY ستبدو هكذا:

SELECT type AS ‘Type’, MIN(price) AS ‘Minimum Price’ FROM Books WHERE price is not null GROUP BY type

### استخدام COUNT مع GROUP BY

يمكننا استخدام COUNT لمعرفة عدد العناصر الموجودة في حاوية. لكن إذا أردنا عد عناصر مختلفة في مجموعات منفصلة، مثل كرات ملونة بألوان مختلفة، فسنستخدم الدالة COUNT مع الأمر GROUP BY.

تُوضّح عبارة SELECT التالية كيفية عد مجموعات البيانات باستخدام الدالة COUNT مع جملة GROUP BY.

SELECT COUNT(*) FROM Books GROUP BY type

### استخدام AVG وSUM مع GROUP BY

يمكننا استخدام الدالة AVG للحصول على متوسط أي مجموعة، وSUM للحصول على المجموع.

يستخدم المثال رقم 1 الدالة AVG مع GROUP BY type.

SELECT AVG(qty) FROM Books GROUP BY type

ويستخدم المثال رقم 2 الدالة SUM مع GROUP BY type.

SELECT SUM(qty) FROM Books GROUP BY type

ويستخدم المثال رقم 3 الدالتين AVG وSUM معًا مع GROUP BY type في عبارة SELECT.

SELECT ‘Total Sales’ = SUM(qty), ‘Average Sales’ = AVG(qty), stor_id FROM Sales GROUP BY StorID ORDER BY ‘Total Sales’

## تقييد الصفوف باستخدام HAVING

يمكن استخدام جملة HAVING لتقييد الصفوف. وهي مشابهة لشرط WHERE، غير أن HAVING يمكن أن تتضمّن الدالة التجميعية (aggregate function)، بينما لا يستطيع WHERE ذلك.

تعمل جملة HAVING مثل جملة WHERE، لكنها تنطبق على المجموعات. وفي هذا المثال، نستخدم جملة HAVING لاستبعاد المجموعات التي مقاطعتُها ‘BC’.

SELECT au_fname AS ‘Author”s First Name’, province as ‘Province’ FROM Authors GROUP BY au_fname, province HAVING province <> ‘BC’

## عبارة INSERT

تضيف عبارة INSERT صفوفًا إلى جدول. وإضافة إلى ذلك:

- تحدد INSERT الجدول أو العرض (view) الذي ستُدرَج البيانات فيه.
- تسرد Column_list الأعمدة التي ستتأثر بعبارة INSERT.
- إذا أُغفل عمود، فيجب تزويد كل قيمة.
- إذا أدرجت أعمدة، فيمكن سردها بأي ترتيب.
- تحدد VALUES البيانات التي تريد إدراجها في الجدول. وVALUES إلزامية.
- يجب ألا تسرد الأعمدة التي تحمل خاصية IDENTITY صراحةً في column_list أو values_clause.

الصيغة لعبارة INSERT هي:

INSERT [INTO] Table_name | view name [column_list] DEFAULT VALUES | values_list | select statement

وعند إدراج صفوف بعبارة INSERT، تنطبق القواعد التالية:

- إدراج سلسلة فارغة (‘ ‘) في عمود varchar أو text يُدرِج مسافة واحدة.
- تُحشو جميع أعمدة char من اليمين حتى الطول المحدَّد.
- تُزال جميع المسافات الزائدة من البيانات المُدرَجة في أعمدة varchar، باستثناء السلاسل التي لا تحوي سوى مسافات. وتُقتطع هذه السلاسل إلى مسافة واحدة.
- إذا خالفت عبارة INSERT قيدًا أو قيمة افتراضية أو قاعدة، أو إذا كان نوع البيانات خاطئًا، تفشل العبارة ويعرض SQL Server رسالة خطأ.

عند تحديد قيم لبعض الأعمدة في column_list فقط، يمكن أن يحدث لأعمدة لا قيم لها واحد من ثلاثة أمور:

- تُدخَل قيمة افتراضية إذا كان للعمود قيد DEFAULT، أو إذا كانت القيمة الافتراضية مرتبطة بالعمود، أو إذا كانت القيمة الافتراضية مرتبطة بنوع البيانات المعرَّف من المستخدم الأساسي.
- تُدخَل القيمة NULL إذا كان العمود يسمح بقيم NULL ولم تكن هناك قيمة افتراضية للعمود.
- تُعرض رسالة خطأ ويُرفض الصف إذا كان العمود معرَّفًا بأنه NOT NULL ولم تكن هناك قيمة افتراضية.

يستخدم هذا المثال INSERT لإضافة سجل إلى جدول الناشرين Authors.

INSERT INTO Authors VALUES(‘555-093-467’, ‘Martin’, ‘April’, ‘281 555-5673’, ‘816 Market St.,’ , ‘Vancouver’, ‘BC’, ‘V7G3P4’, 0)

ويوضح المثال التالي كيفية إدراج صف جزئي في جدول الناشرين Publishers مع سرد الأعمدة. وكان لعمود البلد قيمة افتراضية هي Canada، لذا لا يلزم تضمينه في قيمك.

INSERT INTO Publishers (PubID, PubName, city, province) VALUES (‘9900’, ‘Acme Publishing’, ‘Vancouver’, ‘BC’)

ولإدراج صفوف في جدول يحوي عمود IDENTITY، اتبع المثال أدناه. ولا توفّر قيمة عمود IDENTITY ولا اسم العمود في قائمة الأعمدة.

INSERT INTO jobs VALUES (‘DBA’, 100, 175)

### إدراج قيم محدَّدة في عمود IDENTITY

لا يمكن افتراضيًا إدراج البيانات مباشرة في عمود IDENTITY؛ لكن إذا حُذف صف بالخطأ، أو إذا كانت هناك فجوات في قيم عمود IDENTITY، فيمكنك إدراج صف مع تحديد قيمة عمود IDENTITY.

خيار IDENTITY_INSERT

للإسمح بالإدراج بقيمة هوية محدَّدة، يمكن استخدام خيار IDENTITY_INSERT على النحو التالي.

SET IDENTITY_INSERT jobs ON INSERT INTO jobs (job_id, job_desc, min_lvl, max_lvl) VALUES (19, ’DBA2’, 100, 175) SET IDENTITY_INSERT jobs OFF

### إدراج الصفوف بعبارة SELECT

نحتاج أحيانًا إلى إنشاء جدول مؤقت صغير من جدول كبير. ولهذا، يمكننا إدراج صفوف بعبارة SELECT. وعند استخدام هذا الأمر، لا يوجد تحقق من التفرّد. ونتيجة لذلك، قد توجد صفوف كثيرة لها القيمة pub_id نفسها في المثال أدناه.

ينشئ هذا المثال جدول ناشرين مؤقتًا أصغر باستخدام عبارة CREATE TABLE. ثم تُستخدم INSERT مع عبارة SELECT لإضافة سجلات إلى جدول الناشرين المؤقت هذا من جدول publis.

CREATE TABLE dbo.tmpPublishers ( PubID char (4) NOT NULL , PubName varchar (40) NULL , city varchar (20) NULL , province char (2) NULL , country varchar (30) NULL DEFAULT (‘Canada’) ) INSERT tmpPublishers SELECT * FROM Publishers

وفي هذا المثال، ننسخ مجموعة جزئية من البيانات.

INSERT tmpPublishers (pub_id, pub_name) SELECT PubID, PubName FROM Publishers

وفي هذا المثال، تُنسخ بيانات الناشرين إلى الجدول tmpPublishers وتُضبط قيمة عمود البلد على Canada.

INSERT tmpPublishers (PubID, PubName, city, province, country) SELECT PubID, PubName, city, province, ‘Canada’ FROM Publishers

## عبارة UPDATE

تغيّر عبارة UPDATE البيانات في الصفوف القائمة، سواء بإضافة بيانات جديدة أو بتعديل بيانات قائمة.

يستخدم هذا المثال عبارة UPDATE لتوحيد حقل البلد على Canada لكل السجلات في جدول الناشرين Publishers.

UPDATE Publishers SET country = ‘Canada’

ويزيد هذا المثال مبالغ رسوم الإتاوات (royalty) التي تتراوح بين 10 and 20 بنسبة 10%.

UPDATE roysched SET royalty = royalty + (royalty * .10) WHERE royalty BETWEEN 10 and 20

### تضمين استعلامات فرعية (subqueries) في عبارة UPDATE

يُرقّى الموظفون من جدول Employees الذين وظّفهم الناشر عام 2010 إلى أعلى مستوى وظيفي لنوع وظيفتهم. وهذا هو ما ستبدو عليه عبارة UPDATE.

UPDATE Employees SET job_lvl = (SELECT max_lvl FROM jobs WHERE employee.job_id = jobs.job_id) WHERE DATEPART(year, employee.hire_date) = 2010

## عبارة DELETE

تزيل عبارة DELETE الصفوف من مجموعة سجلات. وتُسمّي DELETE الجدول أو العرض الذي يحوي الصفوف التي ستُحذف، ولا يمكن سرد أكثر من جدول أو صف واحد في الوقت نفسه. وWHERE هي عبارة WHERE اعتيادية تحدّ من الحذف إلى السجلات المحدَّدة.

تبدو صيغة DELETE على النحو التالي.

DELETE [FROM] {table_name | view_name } [WHERE clause]

وقواعد عبارة DELETE هي:

- إذا أغفلت جملة WHERE، فستُزال جميع الصفوف في الجدول (باستثناء الفهارس (indexes) والجدول والقيود).
- لا يمكن استخدام DELETE مع عرض (view) يحوي جملة FROM تسمّي أكثر من جدول واحد. (يمكن أن يؤثر الحذف على جدول أساسي واحد فقط في الوقت نفسه.)

وفيما يلي ثلاث عبارات DELETE مختلفة يمكن استخدامها.

1. حذف جميع الصفوف من جدول.

DELETE FROM Discounts

2. حذف صفوف محدَّدة:

DELETE FROM Sales WHERE stor_id = ‘6380’

3. حذف الصفوف استنادًا إلى قيمة في استعلام فرعي (subquery):

DELETE FROM Sales WHERE title_id IN (SELECT title_id FROM Books WHERE type = ‘mod_cook’)

# الدوال المدمجة (built-in functions)

توجد في SQL Server دوال مدمجة (built-in functions) كثيرة، مثل:

- التجميعية (Aggregate): تُعيد قيمًا ملخَّصة
- التحويل (Conversion): تحوّل نوع بيانات إلى نوع آخر
- التاريخ (Date): تعرض معلومات عن التواريخ والأوقات
- الرياضية (Mathematical): تنفّذ عمليات على البيانات الرقمية
- النصوص (String): تنفّذ عمليات على سلاسل المحارف أو البيانات الثنائية أو التعابير
- النظام (System): تُعيد معلومة خاصة من قاعدة البيانات
- النصوص والصور (Text and image): تنفّذ عمليات على بيانات النصوص والصور

فيما يلي أوصاف تفصيلية وأمثلة للدوال الأربع الأولى.

## الدوال التجميعية (aggregate functions)

تنفّذ الدوال التجميعية حسابًا على مجموعة من القيم وتُعيد قيمة واحدة، أي قيمة ملخَّصة. ويسرد الجدول 16.4 هذه الدوال.

| الدالة | الوصف |
| --- | --- |
| AVG | تُعيد متوسط جميع قيم التعبير، أو قيم DISTINCT منها فقط. |
| COUNT | تُعيد عدد القيم غير الفارغة (non-null) في التعبير. وإذا حُدِّدت DISTINCT، فتُعدّ COUNT عدد القيم الفريدة غير الفارغة. |
| COUNT(*) | تُعيد عدد الصفوف. ولا تأخذ COUNT(*) أي وسائط ولا يمكن استخدامها مع DISTINCT. |
| MAX | تُعيد أكبر قيمة في التعبير. ويمكن استخدام MAX مع الأعمدة الرقمية والمحرفية وأعمدة datetime، لكن ليس مع أعمدة bit. ومع الأعمدة المحرفية، تجد MAX أعلى قيمة في تسلسل الفرز. وتتجاهل MAX أي قيم فارغة (null). |
| MIN | تُعيد أصغر قيمة في التعبير. ويمكن استخدام MIN مع الأعمدة الرقمية والمحرفية وأعمدة datetime، لكن ليس مع أعمدة bit. ومع الأعمدة المحرفية، تجد MIN القيمة الأدنى في تسلسل الفرز. وتتجاهل MIN أي قيم فارغة. |
| SUM | تُعيد مجموع جميع قيم التعبير، أو قيم DISTINCT منها فقط. ولا يمكن استخدام SUM إلا مع الأعمدة الرقمية. |

الجدول 16.4 قائمة بالدوال التجميعية وأوصافها.

فيما يلي أمثلة لكل دالة تجميعية مدرجة في الجدول 16.4.

المثال رقم 1: AVG

SELECT AVG (price) AS ‘Average Title Price’ FROM Books

المثال رقم 2: COUNT

SELECT COUNT(PubID) AS ‘Number of Publishers’ FROM Publishers

المثال رقم 3: COUNT

SELECT COUNT(province) AS ‘Number of Publishers’ FROM Publishers

المثال رقم 3: COUNT (*)

SELECT COUNT(*) FROM Employees WHERE job_lvl = 35

المثال رقم 4: MAX

SELECT MAX (HireDate) FROM Employees

المثال رقم 5: MIN

SELECT MIN (price) FROM Books

المثال رقم 6: SUM

SELECT SUM(discount) AS ‘Total Discounts’ FROM Discounts

## دالة التحويل (conversion function)

تحوّل دالة التحويل نوع بيانات إلى نوع آخر.

في المثال أدناه، يُحوَّل سعر يحوي الرقم 9 مرتين إلى خمسة محارف. وصيغة هذه العبارة هي SELECT ‘The date is ‘ + CONVERT(varchar(12), getdate()).

SELECT CONVERT(int, 10.6496) SELECT title_id, price FROM Books WHERE CONVERT(char(5), price) LIKE ‘%99%’

وفي هذا المثال الثاني، تغيّر دالة التحويل البيانات إلى نوع بيانات بحجم مختلف.

SELECT title_id, CONVERT(char(4), ytd_sales) as ‘Sales’ FROM Books WHERE type LIKE ‘%cook’

## دالة التاريخ (date function)

تُنتج دالة التاريخ تاريخًا بإضافة فاصل زمني (interval) إلى تاريخ محدَّد. والنتيجة هي قيمة datetime تساوي التاريخ زائد عدد أجزاء التاريخ. وإذا كانت معامل التاريخ من نوع smalldatetime، فستكون النتيجة أيضًا من نوع smalldatetime.

تُستخدم الدالة DATEADD لإضافة قيم التاريخ وزيادتها. وصيغة هذه الدالة هي DATEADD(datepart, number, date).

SELECT DATEADD(day, 3, hire_date) FROM Employees

وفي هذا المثال، تُستخدم الدالة DATEDIFF(datepart, date1, date2).

ويُعيد هذا الأمر عدد “حدود” أجزاء التاريخ (datepart) التي تم عبورها بين تاريخين محدّدين.

SELECT DATEDIFF(day, HireDate, ‘Nov 30 1995’) FROM Employees

ولأي تاريخ بعينه، يمكننا فحص أي جزء من ذلك التاريخ من السنة إلى جزء الألف من الثانية.

وأجزاء التاريخ (DATEPART) واختصاراتها التي يتعرف عليها SQL Server، والقيم المقبولة مدرجة في الجدول 16.5.

| جزء التاريخ | الاختصار | القيم |
| --- | --- | --- |
| السنة | yy | 1753-9999 |
| ربع السنة | qq | 1-4 |
| الشهر | mm | 1-12 |
| يوم من السنة | dy | 1-366 |
| اليوم | dd | 1-31 |
| الأسبوع | wk | 1-53 |
| يوم الأسبوع | dw | 1-7 (Sun.-Sat.) |
| الساعة | hh | 0-23 |
| الدقيقة | mi | 0-59 |
| الثانية | ss | 0-59 |
| جزء الألف من الثانية | ms | 0-999 |

الجدول 16.5. اختصارات أجزاء التاريخ وقيمها.

## الدوال الرياضية (mathematical functions)

تنفّذ الدوال الرياضية عمليات على البيانات الرقمية. ويعرض المثال التالي السعر الحالي لكل كتاب باعته الناشر، وكيف سيكون السعر لو زادت جميع الأسعار بنسبة 10%.

SELECT Price, (price * 1.1) AS ‘New Price’, title FROM Books SELECT ‘Square Root’ = SQRT(81) SELECT ‘Rounded‘ = ROUND(4567.9876,2) SELECT FLOOR (123.45)

# ضمّ الجداول (joining tables)

ضمّ جدولين أو أكثر هو عملية مقارنة البيانات في الأعمدة المحدَّدة واستخدام نتائج المقارنة لتكوين جدول جديد من الصفوف المؤهلة. وعبارة الضمّ (join):

- تحدد عمودًا من كل جدول
- تقارن القيم في تلك الأعمدة صفًا بصف
- تدمج الصفوف ذات القيم المؤهلة في صف جديد

وعلى رغم أن المقارنة تكون عادةً بالتساوي – أي بقيم متطابقة تماماً – فإنه يمكن أيضاً تحديد أنواع أخرى من عمليات الضمّ. وفيما يلي وصف لجميع عمليات الضمّ المختلفة، مثل الضمّ الخارجي الأيسر (left outer join) والأيمن (right outer join) والمتقاطع (cross join).

## الضمّ الداخلي (inner join)

يربط الضمّ الداخلي جدولين على عمود لهما نوع البيانات نفسه. ولا تُعاد إلا الصفوف التي تتطابق فيها قيم العمودين؛ أما الصفوف غير المتطابقة فتُهمَل.

المثال رقم 1

SELECT jobs.job_id, job_desc FROM jobs INNER JOIN Employees ON employee.job_id = jobs.job_id WHERE jobs.job_id < 7

المثال رقم 2

SELECT authors.au_fname, authors.au_lname, books.royalty, title FROM authorsINNER JOIN titleauthor ON authors.au_id=titleauthor.au_id INNER JOIN books ON titleauthor.title_id=books.title_id GROUP BY authors.au_lname, authors.au_fname, title, title.royalty ORDER BY authors.au_lname

## الضمّ الخارجي الأيسر (left outer join)

يحدد الضمّ الخارجي الأيسر أن جميع الصفوف الخارجية اليسرى ستُعاد. وتُدرَج في مجموعة النتائج جميع الصفوف من الجدول الأيسر التي لم تستوفِ الشرط المحدَّد، وتضبط أعمدة الإخراج من الجدول الآخر على NULL.

ويستخدم هذا المثال الأول الصيغة الجديدة للضمّ الخارجي الأيسر.

SELECT publishers.pub_name, books.title FROM Publishers LEFT OUTER JOIN Books On publishers.pub_id = books.pub_id

وهذا مثال على ضمّ خارجي أيسر باستخدام الصيغة القديمة.

SELECT publishers.pub_name, books.title FROM Publishers, Books WHERE publishers.pub_id *= books.pub_id

## الضمّ الخارجي الأيمن (right outer join)

يشمل الضمّ الخارجي الأيمن في مجموعة نتائجه جميع الصفوف من الجدول الأيمن التي لم تستوفِ الشرط المحدّد. وتضبط أعمدة الإخراج المقابلة للجدول الآخر على NULL.

وفيما يلي مثال باستخدام الصيغة الجديدة للضمّ الخارجي الأيمن.

SELECT titleauthor.title_id, authors.au_lname, authors.au_fname FROM titleauthor RIGHT OUTER JOIN authors ON titleauthor.au_id = authors.au_id ORDERY BY au_lname

ويوضح هذا المثال الثاني الصيغة القديمة المستخدمة في الضمّ الخارجي الأيمن.

SELECT titleauthor.title_id, authors.au_lname, authors.au_fname FROM titleauthor, authors WHERE titleauthor.au_id =* authors.au_id ORDERY BY au_lname

## الضمّ الخارجي الكامل (full outer join)

يحدد الضمّ الخارجي الكامل أنه إذا لم يطابق صف من أي من الجدولين معايير الاختيار، فإن الصف يُدرَج في مجموعة النتائج، وتضبط أعمدة الإخراج فيه المقابلة للجدول الآخر على NULL.

وفيما يلي مثال على الضمّ الخارجي الكامل.

SELECT books.title, publishers.pub_name, publishers.province FROM Publishers FULL OUTER JOIN Books ON books.pub_id = publishers.pub_id WHERE (publishers.province <> “BC” and publishers.province <> “ON”) ORDER BY books.title_id

## الضمّ المتقاطع (cross join)

الضمّ المتقاطع هو حاصل ضرب يجمع جدولين. وتعيد هذه العملية الضمّ نفس الصفوف التي لو لم تُحدَّد جملة WHERE. فمثلًا:

SELECT au_lname, pub_name, FROM Authors CROSS JOIN Publishers

دالة تجميعية (aggregate function): تُعيد قيمًا ملخَّصة. ASC: ترتيب تصاعدي

دالة التحويل (conversion function): تحوّل نوع بيانات إلى نوع آخر

ضمّ متقاطع (cross join): حاصل ضرب يجمع جدولين

دالة التاريخ (date function): تعرض معلومات عن التواريخ والأوقات

عبارة DELETE: تزيل الصفوف من مجموعة سجلات

DESC: ترتيب تنازلي

ضمّ خارجي كامل (full outer join): يحدد أنه إذا لم يطابق صف من أي من الجدولين معايير الاختيار

GROUP BY: يُستخدم لإنشاء صف ناتج واحد لكل مجموعة وينتج قيمًا ملخَّصة للأعمدة المحدَّدة

ضمّ داخلي (inner join): يربط جدولين على عمود لهما نوع البيانات نفسه

عبارة INSERT: تضيف صفوفًا إلى جدول

ضمّ خارجي أيسر (left outer join): يحدد أن جميع الصفوف الخارجية اليسرى ستُعاد

دالة رياضية (mathematical function): تنفّذ عمليات على البيانات الرقمية

ضمّ خارجي أيمن (right outer join): يضمّ جميع الصفوف من الجدول الأيمن التي لم تستوفِ الشرط المحدَّد

عبارة SELECT: تُستخدم للاستعلام عن البيانات في قاعدة البيانات

دالة نصوص (string function): تنفّذ عمليات على سلاسل المحارف أو البيانات الثنائية أو التعابير

دالة نظام (system function): تُعيد معلومة خاصة من قاعدة البيانات

دوال النصوص والصور (text and image functions): تنفّذ عمليات على بيانات النصوص والصور

عبارة UPDATE: تغيّر البيانات في الصفوف القائمة، سواء بإضافة بيانات جديدة أو بتعديل بيانات قائمة

المحرف البديل (wildcard): يسمح للمستخدم بمطابقة الحقول التي تحوي حروفًا معيَّنة.

للأسئلة من 1 إلى 18، استخدم قاعدة بيانات العينة PUBS التي أنشأتها Microsoft. ولتنزيل السكربت اللازم لإنشاء قاعدة البيانات هذه، انتقل إلى الموقع التالي: [http://www.microsoft.com/en-ca/download/details.aspx?id=23654](http://www.microsoft.com/en-ca/download/details.aspx?id=23654).

- اعرض قائمة بتواريخ النشر وعناوين الكتب التي نُشرت في عام 2011.
- اعرض قائمة بعناوين الكتب التي صُنِّفت إما على أنها طبخ تقليدي أو حديث. استخدم جدول Books.
- اعرض جميع المؤلفين الذين تتكوّن أسماؤهم الأولى من خمسة محارف.
- اعرض من جدول Books الحقول type وprice وpub_id وtitle الخاصة بالكتب التي أصدرها كل ناشر. وأعِد تسمية العمود type إلى “Book Category”. ورتّب حسب type (تنازليًا) ثم حسب price (تصاعديًا).
- اعرض title_id وpubdate وpubdate مضافًا إليها ثلاثة أيام، باستخدام جدول Books.
- باستخدام الدالتين datediff وgetdate، حدّد المدة المنقضية بالأشهر منذ نشر الكتب الموجودة في جدول Books.
- سرد معرّفات العناوين (title IDs) وكميات جميع الكتب التي بيعت أكثر من 30 نسخة.
- اعرض قائمة بجميع أسماء العائلة للمؤلفين الذين يعيشون في أونتاريو (ON) والمدن التي يعيشون فيها.
- اعرض جميع الصفوف التي تحوي القيمة 60 في حقل payterms. استخدم جدول Sales.
- اعرض جميع المؤلفين الذين تتكوّن أسماؤهم الأولى من خمسة محارف، وتنتهي بالحرف O أو A، وتبدأ بالحرف M أو P.
- اعرض جميع العناوين التي تكلف أكثر من 30 دولارًا، وتبدأ إمّا بالحرف T أو يكون معرّف الناشر فيها هو 0877.
- اعرض من جدول Employees الأعمدة fname (الاسم الأول) وlname (اسم العائلة) وemp_id (معرّف الموظف) وjob_lvl (المستوى الوظيفي) لهؤلاء الموظفين الذين مستواهم الوظيفي أكبر من 200؛ وأعِد تسمية عناوين الأعمدة إلى: “First Name” و“Last Name” و“IDENTIFICATION#” و“Job Level”.
- اعرض royalty وroyalty مضافًا إليها 50% تحت اسم “royalty plus 50” وtitle_id. استخدم جدول Roysched.
- باستخدام الدالة STUFF، أنشئ السلسلة “12xxxx567” من السلسلة “1234567”.
- اعرض أول 40 محرفًا من كل عنوان، إلى جانب متوسط المبيعات الشهرية لذلك العنوان حتى تاريخه (ytd_sales/12). استخدم جدول Title.
- بيّن كم عدد الكتب التي لها أسعار محدَّدة.
- اعرض قائمة بكتب الطبخ مع متوسط تكلفة جميع كتب كل نوع. استخدم GROUP BY.

- لا تعمل معاملات المجموعات العلائقية (relational set operators) UNION وINTERSECT وMINUS بشكل صحيح إلا إذا كانت العلاقات متوافقة مع الاتحاد (union-compatible). فما الذي يعنيه التوافق مع الاتحاد، وكيف تتحقق من هذا الشرط؟
- ما الفرق بين UNION وUNION ALL؟ اكتب صيغة كل منهما.
- ولنفترض أن لديك جدولين هما Employees وEmployees_1. ويحتوي جدول Employees على سجلات ثلاثة موظفين هم: Alice Cordoza وJohn Cretchakov وAnne McDonald. ويحتوي جدول Employees_1 على سجلات الموظفين: John Cretchakov وMary Chen. وبالنظر إلى هذه المعلومات، ما ناتج استعلام UNION؟ سرد الناتج.
- بالنظر إلى معلومات الموظفين في السؤال 3، ما ناتج استعلام UNION ALL؟ سرد الناتج.
- بالنظر إلى معلومات الموظفين في السؤال 3، ما ناتج استعلام INTERSECT؟ سرد الناتج.
- بالنظر إلى معلومات الموظفين في السؤال 3، ما ناتج استعلام EXCEPT؟ سرد الناتج.
- ما هو الضمّ المتقاطع (cross join)؟ أعطِ مثالًا على صيغته.
- اشرح أنواع الضمّ الثلاثة التالية: الضمّ الخارجي الأيسر
- الضمّ الخارجي الأيمن
- الضمّ الخارجي الكامل

ما هو الاستعلام الفرعي (subquery)، وما خصائصه الأساسية؟ وما هو الاستعلام الفرعي المترابط (correlated subquery)؟ أعطِ مثالًا. ولنفترض أن جدول Product يحوي خاصيتين هما PROD_CODE وVEND_CODE. وقيم PROD_CODE هي: ABC وDEF وGHI وJKL. وتُقابَل بالقيم التالية لـVEND_CODE: 125 و124 و124 و123 على التوالي (مثلًا، قيمة PROD_CODE وهي ABC تقابل قيمة VEND_CODE وهي 125). ويحتوي جدول Vendor على خاصية واحدة هي VEND_CODE بقيمها 123 و124 و125 و126. (وخاصية VEND_CODE في جدول Product هي مفتاح أجنبي (foreign key) يشير إلى VEND_CODE في جدول Vendor.) وبالنظر إلى المعلومات في السؤال 11، ما ناتج الاستعلام لكل مما يلي؟ بيّن القيم.

- استعلام UNION قائم على هذين الجدولين
- استعلام UNION ALL قائم على هذين الجدولين
- استعلام INTERSECT قائم على هذين الجدولين
- استعلام MINUS قائم على هذين الجدولين

- اعرض قائمة بجميع العناوين وأرقام المبيعات في جدولي Books وSales، بما في ذلك العناوين التي لا مبيعات لها. استخدم ضمًّا (join).
- اعرض قائمة بأسماء عائلة المؤلفين والعناوين المرتبطة التي أصدرها كل مؤلف، مرتبة حسب اسم عائلة المؤلف. استخدم ضمًّا. واحفظها كعرض (view) باسم: Published Authors.
- باستخدام استعلام فرعي، اعرض جميع المؤلفين (اعرض اسم العائلة والاسم الأول والرمز البريدي) الذين يحصلون على إتاوات 100% ويعيشون في ألبرتا. واحفظه كعرض بعنوان: AuthorsView. وعند إنشاء العرض، أعِد تسمية اسم عائلة المؤلف واسمه الأول إلى ‘Last Name’ و‘First Name’.
- اعرض المتاجر التي لم تبع العنوان Is Anger the Enemy?
- اعرض قائمة بأسماء المتاجر للمبيعات بعد عام 2013 (أي أن تاريخ الطلب أكبر من 2013). واعرض اسم المتجر وتاريخ الطلب.
- اعرض قائمة بالعناوين للكتب المباعة في المتجر المسمى “News & Brews”. واعرض اسم المتجر والعناوين وتواريخ الطلبات.
- سرد إجمالي المبيعات (qty) حسب العنوان. واعرض عمودَي الكمية الإجمالية والعنوان.
- سرد إجمالي المبيعات (qty) حسب النوع. واعرض عمودَي الكمية الإجمالية والنوع.
- سرد إجمالي المبيعات (qty*price) حسب النوع. واعرض عمودَي القيمة الدولارية الإجمالية والنوع.
- احسب العدد الإجمالي لأنواع الكتب لكل ناشر. وبيّن اسم الناشر والعدد الإجمالي لأنواع الكتب لكل ناشر.
- بيّن أسماء الناشرين الذين ليس لديهم أي نوع من الكتب. واعرض اسم الناشر فقط.
