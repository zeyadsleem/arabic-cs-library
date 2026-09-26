---
title: "Types of Database Models"
lang: en
---

Main Body

## High-level Conceptual Data Models

High-level conceptual data models provide concepts for presenting data in ways that are close to the way people perceive data. A typical example is the entity relationship model, which uses main concepts like entities, attributes and relationships. An entity represents a real-world object such as an employee or a project. The entity has attributes that represent properties such as an employee’s name, address and birthdate. A relationship represents an association among entities; for example, an employee works on many projects. A relationship exists between the employee and each project.

## Record-based Logical Data Models

Record-based logical data models provide concepts users can understand but are not too far from the way data is stored in the computer. Three well-known data models of this type are relational data models, network data models and hierarchical data models.

- The relational model represents data as relations, or tables. For example, in the membership system at Science World, each membership has many members (see Figure 2.2 in Chapter 2). The membership identifier, expiry date and address information are fields in the membership. The members are individuals such as Mickey, Minnie, Mighty, Door, Tom, King, Man and Moose. Each record is said to be an instance of the membership table.

- The network model represents data as record types. This model also represents a limited type of one to many relationship called a set type, as shown in Figure 4.1.

- The hierarchical model represents data as a hierarchical tree structure. Each branch of the hierarchy represents a number of related records. Figure 4.2 shows this schema in hierarchical model notation.

```sql
Key Terms

hierarchical model: represents data as a hierarchical tree structure

instance: a record within a table

network model: represents data as record types

relation: another term for table

relational model: represents data as relations or tables

set type: a limited type of one to many relationship 
``` ```sql
Exercises

What is a data model?
What is a high-level conceptual data model?
What is an entity? An attribute? A relationship?
List and briefly describe the common record-based logical data models.
```

## Attribution

This chapter of Database Design is a derivative copy of [Database System Concepts](http://cnx.org/contents/b57b8760-6898-469d-a0f7-06e0537f6817@1) by Nguyen Kim Anh licensed under [Creative Commons Attribution License 3.0 license](http://creativecommons.org/licenses/by/3.0/)

The following material was written by Adrienne Watt:

- Key Terms
- Exercises
