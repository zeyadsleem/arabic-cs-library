---
title: "الملحق D: مختبر SQL مع الحلول"
lang: ar
source: https://opentextbc.ca/dbdesign01/back-matter/appendix-d-sql-lab-with-solution/
---
نزّل السكربت التالي: [OrdersAndData.sql](http://opentextbc.ca/dbdesign01/wp-content/uploads/sites/11/2014/06/ordersanddata.txt).

```sql
CREATE DATABASE Orders

Go

Use Orders

Go
```

# الجزء الأول – DDL

```sql
Use Orders

Go

CREATE TABLE [dbo].[tblCustomers]

[CustomerID]       nvarchar(5) NOT NULL,

[CompanyName]      nvarchar(40) NOT NULL,

[ContactName]      nvarchar(30) NULL,

[ContactTitle]     nvarchar(30) NULL,

[Address]          nvarchar(60) NULL,

[City]             nvarchar(15) NULL,

[Region]           nvarchar(15) NULL,

[PostalCode]       nvarchar(10) NULL,

[Country]          nvarchar(15) NULL

Constraint     df_country DEFAULT ‘Canada’,

[Phone]            nvarchar(24) NULL,

[Fax]              nvarchar(24) NULL,

Primary Key (CustomerID)

);
```

![صورة توضيحية من الكتاب: Figure C.1. ERD](/images/db-design/appendix-d-0-DD_OrdersandData.webp)

```sql
CREATE TABLE [dbo].[tblSupplier] (

[SupplierID]     int NOT NULL,

[Name]           nvarchar(50) NULL,

[Address]        nvarchar(50) NULL,

[City]           nvarchar(50) NULL,

[Province]       nvarchar(50) NULL,

Primary Key (SupplierID)

);
```

- استخدم السكربت OrdersAndData.sql الذي ينشئ الجداول ويضيف البيانات لمخطط الكيانات والعلاقات (ERD) الخاص بالطلبات والبيانات في الشكل C.1.
- أنشئ قاعدة بيانات اسمها Orders. وعدّل السكربت حتى يتضمّن المفتاح الأساسي (PK) والسلامة المرجعية (referential integrity). واعرض عبارات CREATE TABLE مع التعديلات بما فيها القيود المذكورة في الخطوة 3.
- أضف القيود التالية:

```sql
CREATE TABLE [dbo].[tblShippers] (

[ShipperID]       int NOT NULL,

[CompanyName]     nvarchar(40) NOT NULL,

Primary Key (ShipperID),<

CONSTRAINT uc_CompanyName UNIQUE (CompanyName)

);
```

- جدول tblCustomers: Country – القيمة الافتراضية Canada
- tblOrderDetails: Quantity – > 0
- tblShippers: يجب أن تكون CompanyName فريدة.
- tblOrders: يجب أن يكون ShippedDate أكبر من تاريخ الطلب.

```sql
CREATE TABLE [dbo].[tblProducts] (

[ProductID]           int NOT NULL,

[SupplierID]          int NULL,

[CategoryID]          int NULL,

[ProductName]         nvarchar(40) NOT NULL,

[EnglishName]         nvarchar(40) NULL,

[QuantityPerUnit]     nvarchar(20) NULL,

[UnitPrice]           money NULL,

[UnitsInStock]        smallint NULL,

[UnitsOnOrder]        smallint NULL,

[ReorderLevel]        smallint NULL,

[Discontinued]        bit NOT NULL,

Primary Key (ProductID),

Foreign Key (SupplierID) References tblSupplier

);
```

CREATE DATABASE Orders Go Use Orders Go Use Orders Go CREATE TABLE [dbo].[tblCustomers] [CustomerID] nvarchar(5) NOT NULL, [CompanyName] nvarchar(40) NOT NULL, [ContactName] nvarchar(30) NULL, [ContactTitle] nvarchar(30) NULL, [Address] nvarchar(60) NULL, [City] nvarchar(15) NULL, [Region] nvarchar(15) NULL, [PostalCode] nvarchar(10) NULL, [Country] nvarchar(15) NULL Constraint df_country DEFAULT ‘Canada’, [Phone] nvarchar(24) NULL, [Fax] nvarchar(24) NULL, Primary Key (CustomerID) ); CREATE TABLE [dbo].[tblSupplier] ( [SupplierID] int NOT NULL, [Name] nvarchar(50) NULL, [Address] nvarchar(50) NULL, [City] nvarchar(50) NULL, [Province] nvarchar(50) NULL, Primary Key (SupplierID) ); CREATE TABLE [dbo].[tblShippers] ( [ShipperID] int NOT NULL, [CompanyName] nvarchar(40) NOT NULL, Primary Key (ShipperID),< CONSTRAINT uc_CompanyName UNIQUE (CompanyName) ); CREATE TABLE [dbo].[tblProducts] ( [ProductID] int NOT NULL, [SupplierID] int NULL, [CategoryID] int NULL, [ProductName] nvarchar(40) NOT NULL, [EnglishName] nvarchar(40) NULL, [QuantityPerUnit] nvarchar(20) NULL, [UnitPrice] money NULL, [UnitsInStock] smallint NULL, [UnitsOnOrder] smallint NULL, [ReorderLevel] smallint NULL, [Discontinued] bit NOT NULL, Primary Key (ProductID), Foreign Key (SupplierID) References tblSupplier ); CREATE TABLE [dbo].[tblOrders] ( [OrderID] int NOT NULL, [CustomerID] nvarchar(5) NOT NULL, [EmployeeID] int NULL, [ShipName] nvarchar(40) NULL, [ShipAddress] nvarchar(60) NULL, [ShipCity] nvarchar(15) NULL, [ShipRegion] nvarchar(15) NULL, [ShipPostalCode] nvarchar(10) NULL, [ShipCountry] nvarchar(15) NULL, [ShipVia] int NULL, [OrderDate] smalldatetime NULL, [RequiredDate] smalldatetime NULL, [ShippedDate] smalldatetime NULL, [Freight] money NULL Primary Key (OrderID), Foreign Key (CustomerID) References tblCustomers, Foreign Key (ShipVia) References tblShippers, Constraint valid_ShipDate CHECK (ShippedDate > OrderDate) ); CREATE TABLE [dbo].[tblOrderDetails] ( [OrderID] int NOT NULL, [ProductID] int NOT NULL, [UnitPrice] money NOT NULL, [Quantity] smallint NOT NULL, [Discount] real NOT NULL, Primary Key (OrderID, ProductID), Foreign Key (OrderID) References tblOrders, Foreign Key (ProductID) References tblProducts, Constraint Valid_Qty Check (Quantity > 0) ); Go

```sql
CREATE TABLE [dbo].[tblOrders] (

[OrderID]            int NOT NULL,

[CustomerID]         nvarchar(5) NOT NULL,

[EmployeeID]         int NULL,

[ShipName]           nvarchar(40) NULL,

[ShipAddress]        nvarchar(60) NULL,

[ShipCity]           nvarchar(15) NULL,

[ShipRegion]         nvarchar(15) NULL,

[ShipPostalCode]     nvarchar(10) NULL,

[ShipCountry]        nvarchar(15) NULL,

[ShipVia]            int NULL,

[OrderDate]          smalldatetime NULL,

[RequiredDate]       smalldatetime NULL,

[ShippedDate]        smalldatetime NULL,

[Freight]            money NULL

Primary Key (OrderID),

Foreign Key (CustomerID) References tblCustomers,

Foreign Key (ShipVia) References tblShippers,

Constraint valid_ShipDate CHECK (ShippedDate > OrderDate)

);
```

# الجزء الثاني – أنشئ عبارات SQL التالية

```sql
CREATE TABLE [dbo].[tblOrderDetails] (

[OrderID]       int NOT NULL,

[ProductID]     int NOT NULL,

[UnitPrice]     money NOT NULL,

[Quantity]      smallint NOT NULL,

[Discount]      real NOT NULL,

Primary Key (OrderID, ProductID),

Foreign Key (OrderID) References tblOrders,

Foreign Key (ProductID) References tblProducts,

Constraint Valid_Qty Check (Quantity > 0)

);

Go
```

1. اعرض قائمة بالعملاء والطلبات التي أنشأوها خلال عام 2014. واعرض معرّف العميل ومعرّف الطلب وتاريخ الطلب المطلوب وتاريخ إتمام الطلب.

```sql
Use Orders

Go

SELECT CompanyName, OrderID, RequiredDate as ‘order date’, OrderDate as ‘date ordered’

FROM tblcustomers  JOIN tblOrders on tblOrders.CustomerID = tblCustomers.CustomerID

WHERE Year(OrderDate) = 2014
```

Use Orders Go SELECT CompanyName, OrderID, RequiredDate as ‘order date’, OrderDate as ‘date ordered’ FROM tblcustomers JOIN tblOrders on tblOrders.CustomerID = tblCustomers.CustomerID WHERE Year(OrderDate) = 2014

```sql
ALTER TABLE tblCustomers

ADD Active bit DEFAULT (‘True’)
```

2. باستخدام عبارة ALTER TABLE، أضف حقلًا جديدًا (Active) في الجدول tblcustomer. واجعل قيمته الافتراضية True.

```sql
SELECT tblOrders.OrderID, OrderDate as ‘Date Ordered’, sum(unitprice*quantity*(1-discount))+ freight as ‘Total Cost’

FROM tblOrderDetails join tblOrders on tblOrders.orderID = tblOrderDetails.OrderID

WHERE OrderDate < ‘September 1, 2012’

GROUP BY tblOrders.OrderID, freight, OrderDate
```

ALTER TABLE tblCustomers ADD Active bit DEFAULT (‘True’)

```sql
SELECT OrderID, ShipName, ShipAddress, CustomerID

FROM tblOrders join tblShippers on tblOrders.ShipVia = tblShippers.ShipperID

WHERE CompanyName= ‘Federal Shipping’
```

3. اعرض جميع الطلبات التي شُريت قبل 1 سبتمبر 2012. واعرض اسم الشركة وتاريخ إتمام الطلب وإجمالي قيمة الطلب (مع أجور الشحن).

```sql
SELECT CompanyName

FROM tblCustomers

WHERE CustomerID not in

(  SELECT CustomerID

FROM  tblOrders

WHERE Year(OrderDate) = 2011

)
```

SELECT tblOrders.OrderID, OrderDate as ‘Date Ordered’, sum(unitprice*quantity*(1-discount))+ freight as ‘Total Cost’ FROM tblOrderDetails join tblOrders on tblOrders.orderID = tblOrderDetails.OrderID WHERE OrderDate < ‘September 1, 2012’ GROUP BY tblOrders.OrderID, freight, OrderDate

```sql
SELECT ProductID from tblProducts

Except

SELECT ProductID from tblOrderDetails
```

4. اعرض جميع الطلبات التي شُحنت عبر Federal Shipping. واعرض OrderID وShipName وShipAddress وCustomerID.

```sql
SELECT Products.ProductID,Products.ProductName

FROM Products LEFT JOIN [Order Details]

ON Products.ProductID = [Order Details].ProductID

WHERE [Order Details].OrderID IS NULL
```

SELECT OrderID, ShipName, ShipAddress, CustomerID FROM tblOrders join tblShippers on tblOrders.ShipVia = tblShippers.ShipperID WHERE CompanyName= ‘Federal Shipping’

```sql
SELECT Customers.CompanyName,Customers.CustomerID,OrderID

FROM Orders

LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID

WHERE Customers.CompanyName IN

(SELECT CompanyName

FROM Customers

WHERE City = ‘London’)
```

5. اعرض جميع العملاء الذين لم يشتروا شيثًا في عام 2011.

```sql
SELECT ProductName, Name

FROM tblProducts JOIN tblSupplier on tblProducts.SupplierID = tblSupplier.SupplierID

WHERE Name Like ‘Supplier A’ or Name Like ‘Supplier B’
```

SELECT CompanyName FROM tblCustomers WHERE CustomerID not in ( SELECT CustomerID FROM tblOrders WHERE Year(OrderDate) = 2011 )

```sql
SELECT EnglishName, ProductName,  QuantityPerUnit

FROM tblProducts

WHERE QuantityPerUnit like ‘%box%’

ORDER BY EnglishName
```

6. اعرض جميع المنتجات التي لم تُطلبت قط.

```sql
Use Orders

CREATE TABLE [dbo].[tblEmployee](

EmployeeID Int IDENTITY NOT NULL ,

FirstName varchar (20) NOT NULL,

LastName varchar (20) NOT NULL,

Address varchar (50),

City varchar(20), Province varchar (50),

PostalCode char(6),

Phone char (10),

Salary Money NOT NULL,

Primary Key (EmployeeID)
```

SELECT ProductID from tblProducts Except SELECT ProductID from tblOrderDetails

```sql
Go

INSERT into tblEmployees

Values (‘Jim’, ‘Smith’, ‘123 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J6’, ‘2506155989’, ‘20.12’),

(‘Jimmy’, ‘Smithy’, ‘124 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J7’, ‘2506155984’, ‘21.12’),

(‘John’, ‘Smore’, ’13 Fake’, ‘Terrace’, ‘BC’, ‘V4G5J6’, ‘2506115989’, ‘19.12’),

(‘Jay’, ‘Sith’, ’12 Fake’, ‘Terrace’, ‘BC’, ‘V8G4J6’, ‘2506155939’, ‘25.12’),

(‘Jig’, ‘Mith’, ’23 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J5’, ‘2506455989’, ‘18.12’);

Go
```

أو

```sql
ALTER TABLE tblOrders

ADD Foreign Key (EmployeeID) references tblEmployees (EmployeeID)
```

SELECT Products.ProductID,Products.ProductName FROM Products LEFT JOIN [Order Details] ON Products.ProductID = [Order Details].ProductID WHERE [Order Details].OrderID IS NULL

```sql
UPDATE tblOrders

Set TotalSales = (select sum(unitprice*quantity*(1-discount))

FROM tblOrderDetails

WHERE tblOrderDetails.OrderID= tblOrders.OrderID

GROUP BY OrderID
```

7. اعرض معرّفات الطلبات (OrderIDs) الخاصة بالعملاء المقيمين في London. واستخدم استعلامًا فرعيًا (subquery). واعرض CustomerID وCustomerName وOrderID.

SELECT Customers.CompanyName,Customers.CustomerID,OrderID FROM Orders LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID WHERE Customers.CompanyName IN (SELECT CompanyName FROM Customers WHERE City = ‘London’)

8. اعرض المنتجات التي يوفّرها المورّد A والمورّد B. واعرض اسم المنتج واسم المورّد.

SELECT ProductName, Name FROM tblProducts JOIN tblSupplier on tblProducts.SupplierID = tblSupplier.SupplierID WHERE Name Like ‘Supplier A’ or Name Like ‘Supplier B’

9. اعرض جميع المنتجات التي تأتي في علب. واعرض اسم المنتج وQuantityPerUnit.

SELECT EnglishName, ProductName, QuantityPerUnit FROM tblProducts WHERE QuantityPerUnit like ‘%box%’ ORDER BY EnglishName

# الجزء الثالث – الإدراج والتحديث والحذف والفهارس

1. أنشئ جدول الموظفين (Employee). وينبغي أن يكون المفتاح الأساسي (primary key) هو EmployeeID (ترقيم تلقائي). وأضف الحقول التالية: LastName وFirstName وAddress وCity وProvince وPostalcode وPhone وSalary. واعرض عبارة CREATE TABLE وعبارات INSERT الخاصة بالخمسة موظفين. واربط جدول الموظفين بالجدول tblOrders. واعرض السكربت اللازم لإنشاء الجدول وضبط القيود (constraints) وإضافة الموظفين.

Use Orders CREATE TABLE [dbo].[tblEmployee](https:// EmployeeID Int IDENTITY NOT NULL , FirstName varchar (20) NOT NULL, LastName varchar (20) NOT NULL, Address varchar (50), City varchar(20), Province varchar (50), PostalCode char(6), Phone char (10), Salary Money NOT NULL, Primary Key (EmployeeID) Go INSERT into tblEmployees Values (‘Jim’, ‘Smith’, ‘123 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J6’, ‘2506155989’, ‘20.12’), (‘Jimmy’, ‘Smithy’, ‘124 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J7’, ‘2506155984’, ‘21.12’), (‘John’, ‘Smore’, ’13 Fake’, ‘Terrace’, ‘BC’, ‘V4G5J6’, ‘2506115989’, ‘19.12’), (‘Jay’, ‘Sith’, ’12 Fake’, ‘Terrace’, ‘BC’, ‘V8G4J6’, ‘2506155939’, ‘25.12’), (‘Jig’, ‘Mith’, ’23 Fake’, ‘Terrace’, ‘BC’, ‘V8G5J5’, ‘2506455989’, ‘18.12’); Go

2. أضف حقلاً إلى الجدول tblOrders اسمه TotalSales. واعرض عبارة DDL – ALTER TABLE.

ALTER TABLE tblOrders ADD Foreign Key (EmployeeID) references tblEmployees (EmployeeID)

3. باستخدام عبارة UPDATE، أضف إجمالي المبيعات لكل طلب بالاستناد إلى جدول تفاصيل الطلبات.

UPDATE tblOrders Set TotalSales = (select sum(unitprice*quantity*(1-discount)) FROM tblOrderDetails WHERE tblOrderDetails.OrderID= tblOrders.OrderID GROUP BY OrderID
