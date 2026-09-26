const s="db-design",a="appendix-d",n="Appendix D: SQL lab with solutions",e="index",r="الملحق D: مختبر SQL مع الحلول",l=[],p=`<p>نزّل السكربت التالي: <a href="http://opentextbc.ca/dbdesign01/wp-content/uploads/sites/11/2014/06/ordersanddata.txt">OrdersAndData.sql</a>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> DATABASE Orders

Go

Use Orders

Go
</code></pre>
<h1>الجزء الأول – DDL</h1>
<pre><code class="language-sql">Use Orders

Go

<span class="hljs-keyword">CREATE TABLE</span> [dbo].[tblCustomers]

[CustomerID]       nvarchar(<span class="hljs-number">5</span>) <span class="hljs-keyword">NOT NULL</span>,

[CompanyName]      nvarchar(<span class="hljs-number">40</span>) <span class="hljs-keyword">NOT NULL</span>,

[ContactName]      nvarchar(<span class="hljs-number">30</span>) <span class="hljs-keyword">NULL</span>,

[ContactTitle]     nvarchar(<span class="hljs-number">30</span>) <span class="hljs-keyword">NULL</span>,

[Address]          nvarchar(<span class="hljs-number">60</span>) <span class="hljs-keyword">NULL</span>,

[City]             nvarchar(<span class="hljs-number">15</span>) <span class="hljs-keyword">NULL</span>,

[Region]           nvarchar(<span class="hljs-number">15</span>) <span class="hljs-keyword">NULL</span>,

[PostalCode]       nvarchar(<span class="hljs-number">10</span>) <span class="hljs-keyword">NULL</span>,

[Country]          nvarchar(<span class="hljs-number">15</span>) <span class="hljs-keyword">NULL</span>

<span class="hljs-keyword">Constraint</span>     df_country <span class="hljs-keyword">DEFAULT</span> ‘Canada’,

[Phone]            nvarchar(<span class="hljs-number">24</span>) <span class="hljs-keyword">NULL</span>,

[Fax]              nvarchar(<span class="hljs-number">24</span>) <span class="hljs-keyword">NULL</span>,

<span class="hljs-keyword">Primary Key</span> (CustomerID)

);
</code></pre>
<p><img src="/images/db-design/appendix-d-0-DD_OrdersandData.webp" alt="صورة توضيحية من الكتاب: Figure C.1. ERD"></p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> [dbo].[tblSupplier] (

[SupplierID]     <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>,

[Name]           nvarchar(<span class="hljs-number">50</span>) <span class="hljs-keyword">NULL</span>,

[Address]        nvarchar(<span class="hljs-number">50</span>) <span class="hljs-keyword">NULL</span>,

[City]           nvarchar(<span class="hljs-number">50</span>) <span class="hljs-keyword">NULL</span>,

[Province]       nvarchar(<span class="hljs-number">50</span>) <span class="hljs-keyword">NULL</span>,

<span class="hljs-keyword">Primary Key</span> (SupplierID)

);
</code></pre>
<ul>
<li>استخدم السكربت OrdersAndData.sql الذي ينشئ الجداول ويضيف البيانات لمخطط الكيانات والعلاقات (ERD) الخاص بالطلبات والبيانات في الشكل C.1.</li>
<li>أنشئ قاعدة بيانات اسمها Orders. وعدّل السكربت حتى يتضمّن المفتاح الأساسي (PK) والسلامة المرجعية (referential integrity). واعرض عبارات CREATE TABLE مع التعديلات بما فيها القيود المذكورة في الخطوة 3.</li>
<li>أضف القيود التالية:</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> [dbo].[tblShippers] (

[ShipperID]       <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>,

[CompanyName]     nvarchar(<span class="hljs-number">40</span>) <span class="hljs-keyword">NOT NULL</span>,

<span class="hljs-keyword">Primary Key</span> (ShipperID),<span class="hljs-operator">&lt;</span>

<span class="hljs-keyword">CONSTRAINT</span> uc_CompanyName <span class="hljs-keyword">UNIQUE</span> (CompanyName)

);
</code></pre>
<ul>
<li>جدول tblCustomers: Country – القيمة الافتراضية Canada</li>
<li>tblOrderDetails: Quantity – &gt; 0</li>
<li>tblShippers: يجب أن تكون CompanyName فريدة.</li>
<li>tblOrders: يجب أن يكون ShippedDate أكبر من تاريخ الطلب.</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> [dbo].[tblProducts] (

[ProductID]           <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>,

[SupplierID]          <span class="hljs-type">int</span> <span class="hljs-keyword">NULL</span>,

[CategoryID]          <span class="hljs-type">int</span> <span class="hljs-keyword">NULL</span>,

[ProductName]         nvarchar(<span class="hljs-number">40</span>) <span class="hljs-keyword">NOT NULL</span>,

[EnglishName]         nvarchar(<span class="hljs-number">40</span>) <span class="hljs-keyword">NULL</span>,

[QuantityPerUnit]     nvarchar(<span class="hljs-number">20</span>) <span class="hljs-keyword">NULL</span>,

[UnitPrice]           money <span class="hljs-keyword">NULL</span>,

[UnitsInStock]        <span class="hljs-type">smallint</span> <span class="hljs-keyword">NULL</span>,

[UnitsOnOrder]        <span class="hljs-type">smallint</span> <span class="hljs-keyword">NULL</span>,

[ReorderLevel]        <span class="hljs-type">smallint</span> <span class="hljs-keyword">NULL</span>,

[Discontinued]        bit <span class="hljs-keyword">NOT NULL</span>,

<span class="hljs-keyword">Primary Key</span> (ProductID),

<span class="hljs-keyword">Foreign Key</span> (SupplierID) <span class="hljs-keyword">References</span> tblSupplier

);
</code></pre>
<p>CREATE DATABASE Orders Go Use Orders Go Use Orders Go CREATE TABLE [dbo].[tblCustomers] [CustomerID] nvarchar(5) NOT NULL, [CompanyName] nvarchar(40) NOT NULL, [ContactName] nvarchar(30) NULL, [ContactTitle] nvarchar(30) NULL, [Address] nvarchar(60) NULL, [City] nvarchar(15) NULL, [Region] nvarchar(15) NULL, [PostalCode] nvarchar(10) NULL, [Country] nvarchar(15) NULL Constraint df_country DEFAULT ‘Canada’, [Phone] nvarchar(24) NULL, [Fax] nvarchar(24) NULL, Primary Key (CustomerID) ); CREATE TABLE [dbo].[tblSupplier] ( [SupplierID] int NOT NULL, [Name] nvarchar(50) NULL, [Address] nvarchar(50) NULL, [City] nvarchar(50) NULL, [Province] nvarchar(50) NULL, Primary Key (SupplierID) ); CREATE TABLE [dbo].[tblShippers] ( [ShipperID] int NOT NULL, [CompanyName] nvarchar(40) NOT NULL, Primary Key (ShipperID),&lt; CONSTRAINT uc_CompanyName UNIQUE (CompanyName) ); CREATE TABLE [dbo].[tblProducts] ( [ProductID] int NOT NULL, [SupplierID] int NULL, [CategoryID] int NULL, [ProductName] nvarchar(40) NOT NULL, [EnglishName] nvarchar(40) NULL, [QuantityPerUnit] nvarchar(20) NULL, [UnitPrice] money NULL, [UnitsInStock] smallint NULL, [UnitsOnOrder] smallint NULL, [ReorderLevel] smallint NULL, [Discontinued] bit NOT NULL, Primary Key (ProductID), Foreign Key (SupplierID) References tblSupplier ); CREATE TABLE [dbo].[tblOrders] ( [OrderID] int NOT NULL, [CustomerID] nvarchar(5) NOT NULL, [EmployeeID] int NULL, [ShipName] nvarchar(40) NULL, [ShipAddress] nvarchar(60) NULL, [ShipCity] nvarchar(15) NULL, [ShipRegion] nvarchar(15) NULL, [ShipPostalCode] nvarchar(10) NULL, [ShipCountry] nvarchar(15) NULL, [ShipVia] int NULL, [OrderDate] smalldatetime NULL, [RequiredDate] smalldatetime NULL, [ShippedDate] smalldatetime NULL, [Freight] money NULL Primary Key (OrderID), Foreign Key (CustomerID) References tblCustomers, Foreign Key (ShipVia) References tblShippers, Constraint valid_ShipDate CHECK (ShippedDate &gt; OrderDate) ); CREATE TABLE [dbo].[tblOrderDetails] ( [OrderID] int NOT NULL, [ProductID] int NOT NULL, [UnitPrice] money NOT NULL, [Quantity] smallint NOT NULL, [Discount] real NOT NULL, Primary Key (OrderID, ProductID), Foreign Key (OrderID) References tblOrders, Foreign Key (ProductID) References tblProducts, Constraint Valid_Qty Check (Quantity &gt; 0) ); Go</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> [dbo].[tblOrders] (

[OrderID]            <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>,

[CustomerID]         nvarchar(<span class="hljs-number">5</span>) <span class="hljs-keyword">NOT NULL</span>,

[EmployeeID]         <span class="hljs-type">int</span> <span class="hljs-keyword">NULL</span>,

[ShipName]           nvarchar(<span class="hljs-number">40</span>) <span class="hljs-keyword">NULL</span>,

[ShipAddress]        nvarchar(<span class="hljs-number">60</span>) <span class="hljs-keyword">NULL</span>,

[ShipCity]           nvarchar(<span class="hljs-number">15</span>) <span class="hljs-keyword">NULL</span>,

[ShipRegion]         nvarchar(<span class="hljs-number">15</span>) <span class="hljs-keyword">NULL</span>,

[ShipPostalCode]     nvarchar(<span class="hljs-number">10</span>) <span class="hljs-keyword">NULL</span>,

[ShipCountry]        nvarchar(<span class="hljs-number">15</span>) <span class="hljs-keyword">NULL</span>,

[ShipVia]            <span class="hljs-type">int</span> <span class="hljs-keyword">NULL</span>,

[OrderDate]          smalldatetime <span class="hljs-keyword">NULL</span>,

[RequiredDate]       smalldatetime <span class="hljs-keyword">NULL</span>,

[ShippedDate]        smalldatetime <span class="hljs-keyword">NULL</span>,

[Freight]            money <span class="hljs-keyword">NULL</span>

<span class="hljs-keyword">Primary Key</span> (OrderID),

<span class="hljs-keyword">Foreign Key</span> (CustomerID) <span class="hljs-keyword">References</span> tblCustomers,

<span class="hljs-keyword">Foreign Key</span> (ShipVia) <span class="hljs-keyword">References</span> tblShippers,

<span class="hljs-keyword">Constraint</span> valid_ShipDate <span class="hljs-keyword">CHECK</span> (ShippedDate <span class="hljs-operator">&gt;</span> OrderDate)

);
</code></pre>
<h1>الجزء الثاني – أنشئ عبارات SQL التالية</h1>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> [dbo].[tblOrderDetails] (

[OrderID]       <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>,

[ProductID]     <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>,

[UnitPrice]     money <span class="hljs-keyword">NOT NULL</span>,

[Quantity]      <span class="hljs-type">smallint</span> <span class="hljs-keyword">NOT NULL</span>,

[Discount]      <span class="hljs-type">real</span> <span class="hljs-keyword">NOT NULL</span>,

<span class="hljs-keyword">Primary Key</span> (OrderID, ProductID),

<span class="hljs-keyword">Foreign Key</span> (OrderID) <span class="hljs-keyword">References</span> tblOrders,

<span class="hljs-keyword">Foreign Key</span> (ProductID) <span class="hljs-keyword">References</span> tblProducts,

<span class="hljs-keyword">Constraint</span> Valid_Qty <span class="hljs-keyword">Check</span> (Quantity <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>)

);

Go
</code></pre>
<ol>
<li>اعرض قائمة بالعملاء والطلبات التي أنشأوها خلال عام 2014. واعرض معرّف العميل ومعرّف الطلب وتاريخ الطلب المطلوب وتاريخ إتمام الطلب.</li>
</ol>
<pre><code class="language-sql">Use Orders

Go

<span class="hljs-keyword">SELECT</span> CompanyName, OrderID, RequiredDate <span class="hljs-keyword">as</span> ‘<span class="hljs-keyword">order</span> <span class="hljs-type">date</span>’, OrderDate <span class="hljs-keyword">as</span> ‘<span class="hljs-type">date</span> ordered’

<span class="hljs-keyword">FROM</span> tblcustomers  <span class="hljs-keyword">JOIN</span> tblOrders <span class="hljs-keyword">on</span> tblOrders.CustomerID <span class="hljs-operator">=</span> tblCustomers.CustomerID

<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">Year</span>(OrderDate) <span class="hljs-operator">=</span> <span class="hljs-number">2014</span>
</code></pre>
<p>Use Orders Go SELECT CompanyName, OrderID, RequiredDate as ‘order date’, OrderDate as ‘date ordered’ FROM tblcustomers JOIN tblOrders on tblOrders.CustomerID = tblCustomers.CustomerID WHERE Year(OrderDate) = 2014</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> tblCustomers

<span class="hljs-keyword">ADD</span> Active bit <span class="hljs-keyword">DEFAULT</span> (‘<span class="hljs-literal">True</span>’)
</code></pre>
<ol start="2">
<li>باستخدام عبارة ALTER TABLE، أضف حقلًا جديدًا (Active) في الجدول tblcustomer. واجعل قيمته الافتراضية True.</li>
</ol>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> tblOrders.OrderID, OrderDate <span class="hljs-keyword">as</span> ‘<span class="hljs-type">Date</span> Ordered’, <span class="hljs-built_in">sum</span>(unitprice<span class="hljs-operator">*</span>quantity<span class="hljs-operator">*</span>(<span class="hljs-number">1</span><span class="hljs-operator">-</span>discount))<span class="hljs-operator">+</span> freight <span class="hljs-keyword">as</span> ‘Total Cost’

<span class="hljs-keyword">FROM</span> tblOrderDetails <span class="hljs-keyword">join</span> tblOrders <span class="hljs-keyword">on</span> tblOrders.orderID <span class="hljs-operator">=</span> tblOrderDetails.OrderID

<span class="hljs-keyword">WHERE</span> OrderDate <span class="hljs-operator">&lt;</span> ‘September <span class="hljs-number">1</span>, <span class="hljs-number">2012</span>’

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> tblOrders.OrderID, freight, OrderDate
</code></pre>
<p>ALTER TABLE tblCustomers ADD Active bit DEFAULT (‘True’)</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> OrderID, ShipName, ShipAddress, CustomerID

<span class="hljs-keyword">FROM</span> tblOrders <span class="hljs-keyword">join</span> tblShippers <span class="hljs-keyword">on</span> tblOrders.ShipVia <span class="hljs-operator">=</span> tblShippers.ShipperID

<span class="hljs-keyword">WHERE</span> CompanyName<span class="hljs-operator">=</span> ‘Federal Shipping’
</code></pre>
<ol start="3">
<li>اعرض جميع الطلبات التي شُريت قبل 1 سبتمبر 2012. واعرض اسم الشركة وتاريخ إتمام الطلب وإجمالي قيمة الطلب (مع أجور الشحن).</li>
</ol>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> CompanyName

<span class="hljs-keyword">FROM</span> tblCustomers

<span class="hljs-keyword">WHERE</span> CustomerID <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span>

(  <span class="hljs-keyword">SELECT</span> CustomerID

<span class="hljs-keyword">FROM</span>  tblOrders

<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">Year</span>(OrderDate) <span class="hljs-operator">=</span> <span class="hljs-number">2011</span>

)
</code></pre>
<p>SELECT tblOrders.OrderID, OrderDate as ‘Date Ordered’, sum(unitprice<em>quantity</em>(1-discount))+ freight as ‘Total Cost’ FROM tblOrderDetails join tblOrders on tblOrders.orderID = tblOrderDetails.OrderID WHERE OrderDate &lt; ‘September 1, 2012’ GROUP BY tblOrders.OrderID, freight, OrderDate</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ProductID <span class="hljs-keyword">from</span> tblProducts

<span class="hljs-keyword">Except</span>

<span class="hljs-keyword">SELECT</span> ProductID <span class="hljs-keyword">from</span> tblOrderDetails
</code></pre>
<ol start="4">
<li>اعرض جميع الطلبات التي شُحنت عبر Federal Shipping. واعرض OrderID وShipName وShipAddress وCustomerID.</li>
</ol>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> Products.ProductID,Products.ProductName

<span class="hljs-keyword">FROM</span> Products <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> [<span class="hljs-keyword">Order</span> Details]

<span class="hljs-keyword">ON</span> Products.ProductID <span class="hljs-operator">=</span> [<span class="hljs-keyword">Order</span> Details].ProductID

<span class="hljs-keyword">WHERE</span> [<span class="hljs-keyword">Order</span> Details].OrderID <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
</code></pre>
<p>SELECT OrderID, ShipName, ShipAddress, CustomerID FROM tblOrders join tblShippers on tblOrders.ShipVia = tblShippers.ShipperID WHERE CompanyName= ‘Federal Shipping’</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> Customers.CompanyName,Customers.CustomerID,OrderID

<span class="hljs-keyword">FROM</span> Orders

<span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> Customers <span class="hljs-keyword">ON</span> Orders.CustomerID <span class="hljs-operator">=</span> Customers.CustomerID

<span class="hljs-keyword">WHERE</span> Customers.CompanyName <span class="hljs-keyword">IN</span>

(<span class="hljs-keyword">SELECT</span> CompanyName

<span class="hljs-keyword">FROM</span> Customers

<span class="hljs-keyword">WHERE</span> City <span class="hljs-operator">=</span> ‘London’)
</code></pre>
<ol start="5">
<li>اعرض جميع العملاء الذين لم يشتروا شيثًا في عام 2011.</li>
</ol>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ProductName, Name

<span class="hljs-keyword">FROM</span> tblProducts <span class="hljs-keyword">JOIN</span> tblSupplier <span class="hljs-keyword">on</span> tblProducts.SupplierID <span class="hljs-operator">=</span> tblSupplier.SupplierID

<span class="hljs-keyword">WHERE</span> Name <span class="hljs-keyword">Like</span> ‘Supplier A’ <span class="hljs-keyword">or</span> Name <span class="hljs-keyword">Like</span> ‘Supplier B’
</code></pre>
<p>SELECT CompanyName FROM tblCustomers WHERE CustomerID not in ( SELECT CustomerID FROM tblOrders WHERE Year(OrderDate) = 2011 )</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> EnglishName, ProductName,  QuantityPerUnit

<span class="hljs-keyword">FROM</span> tblProducts

<span class="hljs-keyword">WHERE</span> QuantityPerUnit <span class="hljs-keyword">like</span> ‘<span class="hljs-operator">%</span>box<span class="hljs-operator">%</span>’

<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> EnglishName
</code></pre>
<ol start="6">
<li>اعرض جميع المنتجات التي لم تُطلبت قط.</li>
</ol>
<pre><code class="language-sql">Use Orders

<span class="hljs-keyword">CREATE TABLE</span> [dbo].[tblEmployee](

EmployeeID <span class="hljs-type">Int</span> <span class="hljs-keyword">IDENTITY</span> <span class="hljs-keyword">NOT NULL</span> ,

FirstName <span class="hljs-type">varchar</span> (<span class="hljs-number">20</span>) <span class="hljs-keyword">NOT NULL</span>,

LastName <span class="hljs-type">varchar</span> (<span class="hljs-number">20</span>) <span class="hljs-keyword">NOT NULL</span>,

Address <span class="hljs-type">varchar</span> (<span class="hljs-number">50</span>),

City <span class="hljs-type">varchar</span>(<span class="hljs-number">20</span>), Province <span class="hljs-type">varchar</span> (<span class="hljs-number">50</span>),

PostalCode <span class="hljs-type">char</span>(<span class="hljs-number">6</span>),

Phone <span class="hljs-type">char</span> (<span class="hljs-number">10</span>),

Salary Money <span class="hljs-keyword">NOT NULL</span>,

<span class="hljs-keyword">Primary Key</span> (EmployeeID)
</code></pre>
<p>SELECT ProductID from tblProducts Except SELECT ProductID from tblOrderDetails</p>
<pre><code class="language-sql">Go

<span class="hljs-keyword">INSERT into</span> tblEmployees

<span class="hljs-keyword">Values</span> (‘Jim’, ‘Smith’, ‘<span class="hljs-number">123</span> Fake’, ‘Terrace’, ‘BC’, ‘V8G5J6’, ‘<span class="hljs-number">2506155989</span>’, ‘<span class="hljs-number">20.12</span>’),

(‘Jimmy’, ‘Smithy’, ‘<span class="hljs-number">124</span> Fake’, ‘Terrace’, ‘BC’, ‘V8G5J7’, ‘<span class="hljs-number">2506155984</span>’, ‘<span class="hljs-number">21.12</span>’),

(‘John’, ‘Smore’, ’<span class="hljs-number">13</span> Fake’, ‘Terrace’, ‘BC’, ‘V4G5J6’, ‘<span class="hljs-number">2506115989</span>’, ‘<span class="hljs-number">19.12</span>’),

(‘Jay’, ‘Sith’, ’<span class="hljs-number">12</span> Fake’, ‘Terrace’, ‘BC’, ‘V8G4J6’, ‘<span class="hljs-number">2506155939</span>’, ‘<span class="hljs-number">25.12</span>’),

(‘Jig’, ‘Mith’, ’<span class="hljs-number">23</span> Fake’, ‘Terrace’, ‘BC’, ‘V8G5J5’, ‘<span class="hljs-number">2506455989</span>’, ‘<span class="hljs-number">18.12</span>’);

Go
</code></pre>
<p>أو</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> tblOrders

<span class="hljs-keyword">ADD</span> <span class="hljs-keyword">Foreign Key</span> (EmployeeID) <span class="hljs-keyword">references</span> tblEmployees (EmployeeID)
</code></pre>
<p>SELECT Products.ProductID,Products.ProductName FROM Products LEFT JOIN [Order Details] ON Products.ProductID = [Order Details].ProductID WHERE [Order Details].OrderID IS NULL</p>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> tblOrders

<span class="hljs-keyword">Set</span> TotalSales <span class="hljs-operator">=</span> (<span class="hljs-keyword">select</span> <span class="hljs-built_in">sum</span>(unitprice<span class="hljs-operator">*</span>quantity<span class="hljs-operator">*</span>(<span class="hljs-number">1</span><span class="hljs-operator">-</span>discount))

<span class="hljs-keyword">FROM</span> tblOrderDetails

<span class="hljs-keyword">WHERE</span> tblOrderDetails.OrderID<span class="hljs-operator">=</span> tblOrders.OrderID

<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> OrderID
</code></pre>
<ol start="7">
<li>اعرض معرّفات الطلبات (OrderIDs) الخاصة بالعملاء المقيمين في London. واستخدم استعلامًا فرعيًا (subquery). واعرض CustomerID وCustomerName وOrderID.</li>
</ol>
<p>SELECT Customers.CompanyName,Customers.CustomerID,OrderID FROM Orders LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID WHERE Customers.CompanyName IN (SELECT CompanyName FROM Customers WHERE City = ‘London’)</p>
<ol start="8">
<li>اعرض المنتجات التي يوفّرها المورّد A والمورّد B. واعرض اسم المنتج واسم المورّد.</li>
</ol>
<p>SELECT ProductName, Name FROM tblProducts JOIN tblSupplier on tblProducts.SupplierID = tblSupplier.SupplierID WHERE Name Like ‘Supplier A’ or Name Like ‘Supplier B’</p>
<ol start="9">
<li>اعرض جميع المنتجات التي تأتي في علب. واعرض اسم المنتج وQuantityPerUnit.</li>
</ol>
<p>SELECT EnglishName, ProductName, QuantityPerUnit FROM tblProducts WHERE QuantityPerUnit like ‘%box%’ ORDER BY EnglishName</p>
<h1>الجزء الثالث – الإدراج والتحديث والحذف والفهارس</h1>
<ol>
<li>أنشئ جدول الموظفين (Employee). وينبغي أن يكون المفتاح الأساسي (primary key) هو EmployeeID (ترقيم تلقائي). وأضف الحقول التالية: LastName وFirstName وAddress وCity وProvince وPostalcode وPhone وSalary. واعرض عبارة CREATE TABLE وعبارات INSERT الخاصة بالخمسة موظفين. واربط جدول الموظفين بالجدول tblOrders. واعرض السكربت اللازم لإنشاء الجدول وضبط القيود (constraints) وإضافة الموظفين.</li>
</ol>
<p>Use Orders CREATE TABLE [dbo].[tblEmployee](https:// EmployeeID Int IDENTITY NOT NULL , FirstName varchar (20) NOT NULL, LastName varchar (20) NOT NULL, Address varchar (50), City varchar(20), Province varchar (50), PostalCode char(6), Phone char (10), Salary Money NOT NULL, Primary Key (EmployeeID) Go INSERT into tblEmployees Values (‘Jim’, ‘Smith’, ‘123 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J6’, ‘2506155989’, ‘20.12’), (‘Jimmy’, ‘Smithy’, ‘124 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J7’, ‘2506155984’, ‘21.12’), (‘John’, ‘Smore’, ’13 Fake’, ‘Terrace’, ‘BC’, ‘V4G5J6’, ‘2506115989’, ‘19.12’), (‘Jay’, ‘Sith’, ’12 Fake’, ‘Terrace’, ‘BC’, ‘V8G4J6’, ‘2506155939’, ‘25.12’), (‘Jig’, ‘Mith’, ’23 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J5’, ‘2506455989’, ‘18.12’); Go</p>
<ol start="2">
<li>أضف حقلاً إلى الجدول tblOrders اسمه TotalSales. واعرض عبارة DDL – ALTER TABLE.</li>
</ol>
<p>ALTER TABLE tblOrders ADD Foreign Key (EmployeeID) references tblEmployees (EmployeeID)</p>
<ol start="3">
<li>باستخدام عبارة UPDATE، أضف إجمالي المبيعات لكل طلب بالاستناد إلى جدول تفاصيل الطلبات.</li>
</ol>
<p>UPDATE tblOrders Set TotalSales = (select sum(unitprice<em>quantity</em>(1-discount)) FROM tblOrderDetails WHERE tblOrderDetails.OrderID= tblOrders.OrderID GROUP BY OrderID</p>
`,o={book:s,chapter:a,chapterTitle:n,slug:e,title:r,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,l as headings,p as html,e as slug,r as title};
