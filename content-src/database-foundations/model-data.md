---
title: "Data and information"
lang: en
---

> Data is a precious thing and will last longer than the systems themselves. &mdash; Tim Berners-Lee, inventor of the World Wide Web

In the next chapter, we want to elaborate on the concepts of ‘data’ and ‘information’. What exactly do these concepts mean? Why are these concepts important for you as a (future) it professional?

From this chapter you should remember the following:

- what is the meaning of ‘data’?
- what is the meaning of ‘information’?
- what is the role of ‘data’ and ‘information’ within IT applications?
- why is there a need for ‘persistent data’?
- how does a DBMS contribute to efficiently building and maintaining databases?

## Difference between data and information

Before we get you started in this practically-oriented course, we want to take a moment to reflect on some *important concepts*. First, we want to talk briefly about data, and where the distinction is made with information. The two terms are often used interchangeably, but there is a difference.

**Data** refers to specific facts that can take the form of digits, numbers, words, characters, ... For example, ‘23’, ‘Turing’, ‘1912’, ‘London’, ‘Alan’ and ‘June’ are each in themselves facts that can be considered data.

**Information** refers to the meaning that users come to attach to these facts and the connections made between them. For example, the following information can be assigned to the facts above: "On June 23, 1912, Alan Turing was born in London." * We combine the data to assign context and value to it*.

We are used to filling out paper and digital forms. Most of these forms don't ask for our life story. Instead, we are asked to enter specific facts (data) like name, first name, date of birth, ... These forms are often designed in function of a **process** in which the data is collected, tracked and processed. Once processed, the data can be retrieved and used as input for other processes.

As an example, let's take the process of enrolling at UCLL. Upon your enrollment you will be asked to answer a number of questions. These questions have the purpose of gathering information about you as a prospective student and to know for which program you would like to enroll. For example, you will be asked to provide information about yourself (name, date of birth, ...), your previous education path (program, school, degree, ...) and for which program you would like to enroll (program, ...). The information you give is split up into atomic parts: the data. Each piece of data is entered into a field of the form. As soon as the form is submitted, the data is stored.

![Picture of a student registering with UCLL](/images/database-foundations/model-data-0-inschrijvenUCLL.webp)

The data is stored according to the structure of the registration form. The administration staff uses the data of the registrations to prepare for the coming academic year. The data allows them to put together class groups, create timetables, etc. In other words, the data that was previously collected at enrollment is now reassembled back into information to feed other processes. In translating collected data into useful information, the data is often restructured according to a different logic. For example, class composition does not take into account the date of birth, but does take into account the number of students within a program. In addition, the data can also be combined with other data. For example, the preparation of timetables is done on the basis of enrollments, but also on the availability of lecturers and classrooms.

And herein lies the role of you as future IT professionals. It is your role to think about the need and importance of information for your applications, the translation of information into structured data and how to store this data efficiently. It is up to you to define the logic to create information from structured data and vice versa.

## Data and IT applications

As mentioned above, data is often collected in function of a process. IT applications are often developed for the purpose of digitizing or automating manual processes. The earlier example described enrolling a student online for a program at UCLL. Previously (in the days when your lecturers were enrolling for their studies) this was done entirely on paper, including the manual work of processing the registrations which lead to a greater risk of errors. Currently, this process has been digitized and automated as an IT application.

So an IT application must be able to collect, process, and store data. Also, in the other direction, it must be able to retrieve said data and display it to users. This leads to a need of being able to store data for a longer period of time. Storing data for a longer period of time is called **persistent data storage**.

When designing an application, the team of developers will begin to define an architecture of the application. This involves considering which components are necessary to build a functioning system. An application is thus considered not as a monolithic whole, but as a composition of different components, each of which has a particular function. These components are, for example, an interface for mobile devices (front-end), the ability to communicate with other applications, ... The different components each perform a certain function (this will be covered later in the program). In many cases, some form of persistent data storage will be part of the architecture. Through the various decades, a lot of technology for persistent data storage has been developed. In the context of this course, we focus on relational databases and DBMS since this is the standard solution for persistent data storage, but certainly not the only one.

## Databases and DBMS

As a developer, as part of your applications, you will be collecting data, processing and displaying it to users. All the data you collect, is stored in a database. A **database** is viewed as a collection of "persistent data". In other words, a database includes a set of data that must be kept for a long period of time. For example, UCLL's student records system includes data relating to students, enrollments, courses, ...

Persistent data is stored in the permanent memory of a system. This permanent memory or storage medium can take various forms, for example, hard disks, magnetic tapes, CD-ROM, ... The storage of data comes with a certain cost that strongly depends on the type of storage medium used. Hence, it is very important for a team of developers to consider the value of data being added to a database and to make a trade-off between which data is included in the database and which is not. That said, the cost of data storage has dropped significantly since the 2000s, so keeping some extra data won't be a problem in most cases. As an illustration an image of the decreasing "cost per gigabyte" for hard disks ([source](https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/)).

![Graph showing the decreasing cost per gigabyte](/images/database-foundations/model-data-1-costperGB.webp)

The technology we use to build these databases, and to maintain, manage, secure and query (extract data from the database) them is called a **database management system (DBMS)**. The DBMS is a software package that serves as an interface between the end users and applications on the one hand and the database on the other.

There are a lot of database management systems and in the context of this course, we will be using [PostgreSQL](https://www.postgresql.org/). Other examples include. [MySQL](https://www.mysql.com/), [Oracle](https://www.oracle.com/database/), [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2022), [IBM DB2](https://www.ibm.com/products/db2), [MongoDB](https://www.mongodb.com/atlas/database), [Neo4j](https://neo4j.com/), ...

![](/images/database-foundations/model-data-2-dbms.webp)

Database management systems come in a lot of different forms, some of which are designed for specific purposes. When choosing a database management system, a lot of different factors are considered, ranging from the cost of a license, the way the data is structured, data security, features, ... but this is beyond the scope of this course.
