---
title: "Conceptual data model: exercises"
lang: en
---

> May the Force be with you. &mdash;Star Wars

The exercises below allow you to practice creating conceptual data models. For every exercise a model solution is provided. It is possible that you have a different solution that is equally correct. If you have questions about your own solution, feel free to contact us!

## Exercise 1: youth club: entity types

Below you get the description of how a youth club could potentially work. This story will be used for the following exercises. You will successively look for entity types, attributes and relationships. In this section, we will first restrict ourselves to entity types.

![](/images/database-foundations/model-conceptueel-oefeningen-0-chiro.webp)

Read the description below thoroughly and try to identify the entity types.

A youth club wants to set up a database to support its membership administration and activity planning. At initial registration, each member is given a unique member number. Information such as name, first name, address, email address, gender and date of birth are recorded.

Our members must re-register every year, a registration is thus valid for one year. Membership fees are also paid annually to cover insurance costs, for example. This is a different amount every year, the important thing to know is which members have paid their registration fee, and which have not yet done so. At the moment a registration happens, the member is placed in a certain age group, for example ‘6 to 9 year olds’, ‘10 to 12 year olds’, ... The age class is determined on the basis of the age of the member at the start of the new year.

After registration, members are added to a group. With a lot of registrations within a particular age group, it is possible that for a given age group multiple groups are created. The groups themselves choose a name that they will use throughout the year. Just like the registration, this is revisited every year and the division remade.

Each group will have one designated member who will take on the role of ‘leader’ of the group. In addition, each group may have additional ‘co-leaders’, which will be one or more members who will support the ‘main’ leader. The age of the leaders should obviously not match the age range of the group, that would be somewhat inappropriate. Leadership is redefined every year, and therefore applies for the lifetime of a group. Members can take charge of a maximum of one group, this applies to both ‘leaders’ and ‘co-leaders’.

Leaders organise certain activities for their groups which together form the group's annual schedule. Each activity is scheduled on a certain date and location. The same activity can be scheduled for several groups at the same time.

We use a list of possible activities that are are described in a long list. This list contains for each activity, for example ‘Swimming’, what members should bring, how long it takes and certain other things to take into account. The list of possible activities is used to plan activities. The list is then also used to communicate to members and their parents.

The responsibility for coordinating these activities lies with the ‘leader’. The email address of the leader will be communicated so that members and parents can ask questions.

The purpose of the system is to keep track of membership records where we want to be able to answer the following questions:

- What groups do we have?
- What members do we have this year?
- What members did we have last year?
- What members do we have from a certain age group?
- What members have paid registration fees?
- Which members are in which group?
- What leadership do we have?
- Who leads which group?
- What activities are planned for a particular group?
- Who is responsible for coordinating the planned activities?
- When are the different activities planned?
- Where will the activities take place?

#### الحل

The nouns eligible for an entity type are: Member, Registration, Age Group, Group, Activity and Activity Type.

![Solution exercise Conceptual.1](/images/database-foundations/model-conceptueel-oefeningen-1-model_conceptueel_oefening1_oplossing_afb01.webp)

## Exercise 2: youth club: attributes

Go back to conceptual.1 and determine for each of the entity types which attributes you find in the text. The attributes should allow you to describe the entities. Ask yourself the following questions:

- What properties should I track for each of the entity types?
- What information is necessary for my application? Can I find this information in the attributes?
- Are certain entity types missing to structure the necessary data? Is it difficult to place certain attributes with the entity types you have identified?
- Are there certain entity types that only have one attribute? Are we sure that this is an entity type with one attribute, or an attribute of another entity type? For example, if we want to keep track of a person's age, then we could identify an entity type ‘Age’ with the attribute ‘Age’. On the other hand, this could also simply be an attribute of the entity type ‘Person’, without making our data model unnecessarily complex.

Expand your ERD in draw.io with your attributes. (TIP: you can duplicate a tab in diagrams.net. You can then build on the answer of a previous question, without losing the answer to the first question).

#### الحل

Below is an overview of the different attributes that were identified for each of the entity types:

![Solution exercise Conceptual.2](/images/database-foundations/model-conceptueel-oefeningen-2-model_conceptueel_oefening2_oplossing_afb01.webp)

## Exercise 3: youth club: relationships

Build on the results of exercise conceptual.2 and explore the various relationships that exist between the entity types. Describe the relationships with a clear name and specify the cardinality for each of the relationship's entity types. Ask the following questions when doing so:

- Do the relationships allow all the links and information to be incorporated?
- Are all entity types connected?

Expand your ERD in diagrams.net with your relationships.

#### الحل

The ERD below contains the relationships with their cardinalities.

![Solution exercise Conceptual.3](/images/database-foundations/model-conceptueel-oefeningen-3-model_conceptueel_oefening3_oplossing_afb01.webp)

## Exercise 4: youth club: types of attributes

Go back to the result of exercise conceptual.3 and refine your result with the correct types of attributes. Does the notation of your attributes match the type? Are there certain relationships that have an attribute?

Expand your ERD in diagrams.net with your relationships.

#### الحل

![Solution exercise Conceptual.4](/images/database-foundations/model-conceptueel-oefeningen-4-model_conceptueel_oefening4_oplossing_afb01.webp)

## Exercise 5: car rental company

In the next exercises, we are going to draw out a full ERD in a number of steps. Each step adds a piece of logic and/or complexity (blue text in italics). Clearly describe the entities, attributes and relationships. For each of the relationships, clearly state the cardinality of each of the participating entity types. As the different tasks build on each other, you can duplicate a tab in diagrams.net. This allows you to keep an overview of your work and distinguish the different steps.

![](/images/database-foundations/model-conceptueel-oefeningen-5-autoverhuur.webp)

#### Step 1

A car rental company rents cars to customers. At the first rental, customers are assigned a customer number. For each customer we also store the name, first name, address, e-mail address and mobile phone number. For each car, we keep a record of its brand, model, license plate and chassis number. Our system should generate a record of:

- the customers currently renting a car
- the cars and which customers they are currently with
- the cars and if they are available for a next rental

#### الحل

![Solution exercise Conceptual.5.1](/images/database-foundations/model-conceptueel-oefeningen-6-model_conceptueel_oefening5_oplossing_afb01.webp)

#### Step 2

Text in blue and italics is an extension of the previous exercise. Additional requirements are added each time.

A car rental company rents cars to customers. Customers can reserve a type of car in advance, indicating when they would like to pick it up and when they would like to return it. At the first rental, customers are assigned a customer number. For each customer we also store the name, first name, address, e-mail address and mobile phone number. For each car, we keep a record of its brand, model, license plate and chassis number. Our system should generate a record of:

- the reservations made by customers
- the customers currently renting a car
- the cars and which customers they are currently with
- the cars and if they are available for a next rental

TIP: For those who have never rented a car before, pay a visit to one of the online car rental companies. Ask yourself the question, what am I actually booking?

#### الحل

![Solution exercise Conceptual.5.2](/images/database-foundations/model-conceptueel-oefeningen-7-model_conceptueel_oefening5_oplossing_afb02.webp)

#### Step 3

A car rental company rents cars to customers. Customers can reserve a type of car in advance, indicating when they would like to pick it up and when they would like to return it. At the first rental, customers are assigned a customer number. For each customer we also store the name, first name, address, e-mail address and mobile phone number. For each car, we keep a record of its brand, model, license plate and chassis number. Our system should generate a record of:

- the reservations made by customers
- the customers currently renting a car
- the cars and which customers they are currently with
- the cars and when they are available for a next rental
- all cars rented by a particular customer in the past
- all customers who have rented a particular car in the past

#### الحل

![Solution exercise Conceptual.5.3](/images/database-foundations/model-conceptueel-oefeningen-8-model_conceptueel_oefening5_oplossing_afb03.webp)

## Exercise 6: student administration

In the next exercises, we are going to draw out a full ERD in a number of steps. Each step adds a piece of logic and/or complexity (blue text in italics). Clearly describe the entities, attributes and relationships. For each of the relationships, clearly state the cardinality of each of the participating entity types. As the different tasks build on each other, you can duplicate a tab in diagrams.net. This allows you to keep an overview of your work and distinguish the different steps.

![](/images/database-foundations/model-conceptueel-oefeningen-9-kuloket.webp)

#### Step 1

A student can take one or more courses, each course is taught by one lecturer. Lecturers teach to students. A student's name, first name, address, and age are stored. A lecturer's name, first name, field of expertise and number of years in service are also stored. For each course we store the code and name of the course. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.1](/images/database-foundations/model-conceptueel-oefeningen-10-model_conceptueel_oefening6_oplossing_afb01.webp)

#### Step 2

A student can take one or more courses, each course is taught by one lecturer. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, field of expertise and number of years in service are also stored. For each course we store the code and name of the course. We must be able to give the overview for the current academic year.

#### الحل

We can generate the list based on the previous result. Nothing needs to be added.

#### Step 3

A student can take one or more courses, each course is taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, field of expertise and number of years in service are also stored. For each course we store the code and name of the course. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.3](/images/database-foundations/model-conceptueel-oefeningen-11-model_conceptueel_oefening6_oplossing_afb03.webp)

#### Step 4

A student can take one or more courses, each course is coordinated by at most one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, field of expertise and number of years in service are also stored. For each course we store the code and name of the course. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.4](/images/database-foundations/model-conceptueel-oefeningen-12-model_conceptueel_oefening6_oplossing_afb04.webp)

#### Step 5

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. We must be able to give the overview for the current academic year.

#### الحل

You can solve this in two ways, on the one hand with an entity type ‘Field of Expertise’, on the other hand with a multi-valued attribute ‘Field of Expertise’. Both solutions are correct.

![Solution exercise Conceptual.6.5.a](/images/database-foundations/model-conceptueel-oefeningen-13-model_conceptueel_oefening6_oplossing_afb05a.webp) ![Solution exercise Conceptual.6.5.b](/images/database-foundations/model-conceptueel-oefeningen-14-model_conceptueel_oefening6_oplossing_afb05b.webp)

#### Step 6

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. For each course taken by a student, we keep track of the points the student has earned on this course. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.6](/images/database-foundations/model-conceptueel-oefeningen-15-model_conceptueel_oefening6_oplossing_afb06.webp)

#### Step 7

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. For each course taken by a student, we keep track of the points the student has earned on this course. The students picks an internship within a field of expertise. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.7](/images/database-foundations/model-conceptueel-oefeningen-16-model_conceptueel_oefening6_oplossing_afb07.webp)

#### Step 8

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. For each course taken by a student, we keep track of the points the student has earned on this course. The students picks an internship within a field of expertise for which a lecturer is appointed as mentor. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.8](/images/database-foundations/model-conceptueel-oefeningen-17-model_conceptueel_oefening6_oplossing_afb08.webp)

#### Step 9

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. For each course taken by a student, we keep track of the points the student has earned on this course. The students picks an internship within a field of expertise for which a lecturer is appointed as mentor. The field of expertise of the internship should match the field of expertise of the mentor. (Is it possible to add constraints to an ERD?) We must be able to give the overview for the current academic year.

#### الحل

It is not possible to add conditions to an ERD. The result therefore remains unchanged.

#### Step 10

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. A course unit can be given on different campuses. Each campus has a name and an address. For each course taken by a student, we keep track of the points the student has earned on this course. The students picks an internship within a field of expertise for which a lecturer is appointed as mentor. The field of expertise of the internship should match the field of expertise of the mentor. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.10](/images/database-foundations/model-conceptueel-oefeningen-18-model_conceptueel_oefening6_oplossing_afb010.webp)

#### Step 11

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. Some courses build on existing courses and can only be taken if the student has taken that course first. A course may give access to several courses. A course may also require several other courses to have been taken previously. A course unit can be given on different campuses. Each campus has a name and an address. For each course taken by a student, we keep track of the points the student has earned on this course. The students picks an internship within a field of expertise for which a lecturer is appointed as mentor. The field of expertise of the internship should match the field of expertise of the mentor. We must be able to give the overview for the current academic year.

#### الحل

![Solution exercise Conceptual.6.11](/images/database-foundations/model-conceptueel-oefeningen-19-model_conceptueel_oefening6_oplossing_afb011.webp)

#### Step 12

A student can take one or more courses, each course is coordinated by one lecturer but taught by one or more lecturers. Lecturers teach to students. We want to be able to generate a list where we get an overview of which students are taught by which lecturers. A student's name, first name, address, and age are stored. A lecturer's name, first name, fields of expertise he or she contributes to and number of years in service are also stored. For each course we store the code and name of the course. Some courses build on existing courses and can only be taken if the student has taken that course first. A course may give access to several courses. A course may also require several other courses to have been taken previously. A course unit can be given on different campuses. Each campus has a name and an address. For each course taken by a student, we keep track of the points the student has earned on this course. The students picks an internship within a field of expertise for which a lecturer is appointed as mentor. The field of expertise of the internship should match the field of expertise of the mentor. We must be able to give the overview for the current and all previous academic years.

#### الحل

![Solution exercise Conceptual.6.12](/images/database-foundations/model-conceptueel-oefeningen-20-model_conceptueel_oefening6_oplossing_afb012.webp)

## Exercise 7: library

In the next exercises, we are going to draw out a full ERD in a number of steps. Each step adds a piece of logic and/or complexity (blue text in italics). Clearly describe the entities, attributes and relationships. For each of the relationships, clearly state the cardinality of each of the participating entity types. As the different tasks build on each other, you can duplicate a tab in diagrams.net. This allows you to keep an overview of your work and distinguish the different steps.

![](/images/database-foundations/model-conceptueel-oefeningen-21-mechelen_het_predikheren_public_library_be_001.webp)

#### Step 1

A library lends out books. Each book is identified by an ISBN number, a title and one or more authors. Of one particular book we may have several copies, which is why we give each book a copy number. The ISBN and the copy number allow us to uniquely identify each book. To borrow a book, you must be a member of the library. When a member borrows a book for the first time, he or she needs to register. When the member registers, we receive the name, first name, address, e-mail address and mobile phone number. We then also assign a member number. The library wants to know which books are currently borrowed. When a book is not returned on time, a fine is recorded. We want to be able to generate an overview of outstanding fines and the amount due.

#### الحل

We could add 3 binary relationships between Member, Fine and Book.

![Solution exercise Conceptual.7.1.a](/images/database-foundations/model-conceptueel-oefeningen-22-conceptual_7_1_a.webp)

However, this could lead to weird situations in reality. Let say that a user, Emma, borrows Book 1 and Book 2. She could then receive a fine for Book 3, even though she did not borrow it. This is not correct. We will use a ternary relation instead, so the fine is connected to the act of borrowing.

![Solution exercise Conceptual.7.1.b](/images/database-foundations/model-conceptueel-oefeningen-23-conceptual_7_1_b.webp)

#### Step 2

A library lends out books. However, we also have books that are too valuable to lend out. These can only be consulted in the library. Each book is identified by an ISBN number, a title and one or more authors. Of one particular book we may have several copies, which is why we give each book a copy number. The ISBN and the copy number allow us to uniquely identify each book. To borrow a book, you must be a member of the library. When a member borrows a book for the first time, he or she needs to register. When the member registers, we receive the name, first name, address, e-mail address and mobile phone number. We then also assign a member number. The library wants to know which books are currently borrowed. When a book is not returned on time, a fine is recorded. We want to be able to generate an overview of outstanding fines and the amount due.

#### الحل

![Solution exercise Conceptual.7.2](/images/database-foundations/model-conceptueel-oefeningen-24-conceptual_7_2.webp)

#### Step 3

A library lends out books. However, we also have books that are too valuable to lend out. These can only be consulted in the library. Each book is identified by an ISBN number, a title and one or more authors. Of one particular book we may have several copies, which is why we give each book a copy number. The ISBN and the copy number allow us to uniquely identify each book. To borrow a book, you must be a member of the library. When a member borrows a book for the first time, he or she needs to register. When the member registers, we receive the name, first name, address, e-mail address and mobile phone number. We then also assign a member number. The library wants to know which books are currently borrowed. When a book is not returned on time, a fine is recorded. We want to be able to generate an overview of outstanding fines and the amount due. The librarian not only wants an overview of which books are currently borrowed, but also which books have been borrowed most or least, which books are consulted most or least, and which members most often return books late.

#### الحل

![Solution exercise Conceptual.7.3](/images/database-foundations/model-conceptueel-oefeningen-25-conceptual_7_3.webp)

## Exercise 8: board game association

Create an ERD diagram for the following description. Clearly state the cardinality of the relationships and the attributes of the entity types.

![](/images/database-foundations/model-conceptueel-oefeningen-26-IMG_1656.webp)

A board game association wants to develop an application to support their association. The association organises tournaments for their various members. A tournament revolves around one specific board game. Typically they give a funny name to each tournament in order to easily communicate with their members. The aim is to declare a member the winner of the tournament. Members sign up for the tournament. On basis of the entries, matches are organised. Each match is scheduled at a specific date and time. The tournaments take place at the association centre. Each table has a number. For the matches they keep track of which table a match is scheduled on. Each match is played by a number of the members of the association. At each match, one of the members takes the role of game leader. This person is responsible for recording the individual scores of the players. The members are registered in the system so that they can participate in matches and take up the role of game leader. For each member, they want to keep name, e-mail address and date of birth. Members can introduce other members. They have a catalogue of games that they use to organise the tournaments and competitions. For each game, they need to store the name, the number of players and the edition. A board game can either be a base game, or an expansion. If it is an expansion, they want to know for which base game it is an expansion. For each board game, they want a list of members who can lead games of the board game. At any time, we need to be able to create an overview of:

- the schedule of tournaments and matches
- the matches played, which members participated and the scores achieved by the members
- the winners of the various tournaments
- the catalogue of board games, with possible game leaders

#### الحل

![Solution exercise conceptual.8](/images/database-foundations/model-conceptueel-oefeningen-27-model_conceptueel_oefening8_oplossing_afb01.webp)
