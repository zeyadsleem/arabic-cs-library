---
title: "Conceptual data model"
lang: en
---

> Before anything else, preparation is the key to success. &mdash;Alexander Graham Bell

In this chapter, we explore the different building blocks of a conceptual data model and the proces of how these are designed. To this end, we will explain some important concepts and we will also take the first steps towards designing simple conceptual models. We look at the following questions:

- What are the building blocks of a conceptual diagram? What is the role of entities, relationships and attributes as building blocks of a conceptual data model?
- What steps should be taken to translate a problem statement into a conceptual diagram?

Having completed this chapter, you should be able to explain:

- conceptual data model;
- ERD diagram;
- entity and entity type (weak entity types, strong (or ordinary) entity types)
- attribute (key attribute, derived attribute, composite attribute, single-valued attribute, multi-valued attribute, attribute of a relation);
- relation (degree of a relation, cardinality, 1-1 relation, 1-N relation, N-M relation);
- redundancy;
- subtypes, supertypes, specialisation and generalisation.

After finishing this chapter, you should be able to understand the notation used in an ERD (where relevant) and explain it using an example.

You should additionally be able to create an ERD for a given problem statement.

## Entity Relationship Diagram

A conceptual data model answers the question ‘What information is relevant to the intended IT application?’ This data model provides a view on the reality of the users and the information contained therein, without taking technical details into account.

A conceptual data model is a *schematic representation* of the relevant information. We aim for a representation that is easy to set up and can be read by a wide audience. To achieve that, we use a standardised notation, namely * Entity Relationship Modelling.* The diagrams using this notation are called * Entity Relationship Diagrams* (abbreviated to ERD).

ERD uses three main concepts that form the basis of the models: *entities*, *relationships* and *attributes*. We are going to explain each of these concepts in detail and show how they fit into the process of arriving at a conceptual data model.

ERD notation was developed in 1976 by Peter Chen, so it has been around for quite a few years. At the same time this computer had [just been developed](https://en.wikipedia.org/wiki/Apple_I) by a small company called ‘Apple Computer’:

![](/images/database-foundations/model-conceptueel-0-Original_1976_Apple_1_Computer_In_A_Briefcase.webp)

ERD has also been extended with some additional concepts to arrive at what is called the *Extended Entity Relationship Model* (EERD). The concepts added are specialisation and generalisation, and subclasses and superclasses. We will also briefly explain these concepts.

ERD is certainly not the only standardised notation; you have UML as well, for example. * In the context of this course, we use ERD notation to describe conceptual and logical data models. * A lot of people with IT training (and beyond) can readily read an ERD, which makes it an excellent form of documentation.

## Entities and entity types

### What are entities and entity types?

The first important concepts within an ERD are entities and entity types. An *entity* corresponds to *something* that exists in the real world.

This can be either something physical or something abstract so we can talk about objects, persons, ... The person named ‘Emma’, the city named name ‘Leuven’, a car with number plate ‘1-AAA-001’, ... are all examples of entities. From the moment it exists and it is relevant, we can we consider it an entity.

Besides entities, we also have *entity types*. We define entity types as *a collection of similar entities.* This collection we then give a name that clearly describes the entities within. Examples of entity types are ‘Person’, ‘City’, ‘Car’, ... You will notice that we name these entity types with a name in *singular* and with a *capital letter*. There is no law or rule for this; we do this for clarity and consistency.

As an example, if you develop a system where we track information about customers, ‘Sam Peters’ would be a customer, and ‘Customer’ would be the entity type describing the set of customers. We say that Sam is a real-world interpretation of a particular type, in this case a customer. In the context of this course section, we are going to make a strict distinction between entity on the one hand and on the other hand entity type. However, we have to admit that in the available literature, this is not always the case. Keep this in mind when researching certain concepts in books or online.

### How to recognise entity types?

To create an ERD, we look for the relevant entity types. Recognising entity types is typically done using the *nouns* that you hear during an interview or when reading through documents or that are used in the description of the solution. Words such as ‘customer’, ‘reservation’, ‘product’, ‘shop’, ‘request’, ‘car’, ... are a good starting point. Often you then want to keep information about these (see attributes) which makes these concepts good candidates.

To evaluate candidates, we can ask the following questions:

- Is the entity type something relevant to our application? Otherwise said, is it crucial that we keep information about the entity type? Does it have a role in how the application works?
- Is the entity type something we want and can describe? How would we describe it? What information can we store about this entity type?
- Can we easily think of entities of the entity type? Do we have examples of entities?
- Can we come up with more than one entity? If we can come up with at most one entity, then it is presumably redundant. A example of a redundant entity type is, for example, ‘College’ in the case of an administration system for UCLL High School. Since we are working with only one college, this would make the data model unnecessarily complex. The situation changes once our application would be deployed for several colleges, because then we have to keep information for each of those colleges.

In a conceptual data model, we include *only entity types*. It is however always useful to include some examples of entities in your documentation, as this makes it easier for the people reading your ERD to imagine exactly what you mean.

### Notation ERD

Entity types are represented in an ERD by a rectangle containing the name of the entity type. We choose to write the name in singular and start with a capital letter. For example, the entity types ‘Customer’, ‘Product’ and ‘Car’ are represented as follows:

![Voorbeelden van de notatie van een entiteittype: ‘Klant’, ‘Product’ en ‘Wagen’.](/images/database-foundations/model-conceptueel-1-model_conceptueel_entiteiten_afb01.webp)

### How to get started?

As indicated, you can typically recognise entity types as nouns used in a particular text. Our advice is to * go over a given description and mark or underline all nouns.* These are the candidates for your entity types.

To evaluate the candidates, we can ask the following questions:

- Does the candidate entity type represent a collection of *different entities*? For example, does the entity type ‘Car’ represents a collection of cars (a car with license plate ‘1-DSY-558’, a car with license plate ‘2-AST-114’, ... ). If we can think of only one entity of a given entity type, then it is presumably redundant.
- Do we want to keep *information* on the different entities of the candidate entity type? For example, of the entity type ‘Car’ do we want to track the number plate, make, model, year of construction, ... We can describe the entities of the entity type ‘Car’ using these data fields (what we will later call *attributes*).
- Is the candidate entity type *relevant* to the IT solution that we are developing? For example, in the context of a fleet-management system for a company it is indicated that we want to keep an overview of all the cars that are in use. The entity type ‘Car’ is then relevant to our solution.

Evaluating the above questions is sometimes difficult or confusing. In the above examples, we use the candidate entity type ‘Car’ to test each question, but what, for example, about the candidate entity type ‘License plate’? There are multiple license plates, we can also describe license plates (number, order date, creation date, ...), and we use it to identify cars so it is also relevant.

To determine whether the entity type ‘License plate’ is relevant, we need to look at the IT solution. For a fleet-management system, the license plate will be part of a description of a vehicle, but will itself be less relevant. In this case, it is a property on a car to describe it, but not an entity type per se. Should you develop a system for the Service for Vehicle Registration, then again, ‘License plate’ would be a good candidate because the distribution of license plates is key in how the organization functions. So it is not always obvious.

### Draw tool: Draw.io (diagrams.net)

Use draw.io as a drawing tool for ERD. We made a separate page about this app. View:

- [General explanation draw.io](/EN/model_drawio/#Draw.io-(diagrams.net)-general-introduction)
- [Conceptual data model with draw.io](/EN/model_drawio/#Draw-a-conceptual-data-model-with-draw.io)

### Exercise youth club: entity types

Create [Exercise 1: youth club: entity types](/EN/model_conceptueel_oefeningen#Exercise-1:-youth-club:-entity-types). Keep track of the outcome of the exercise as we are going to build the result in a number of steps.

## Attributes

### What are attributes?

Entity types describe concepts relevant to our data model, but do not actually contain any data. * To indicate what we specifically want to track about the different entities, we use attributes. * Each attribute of an entity type describes one property that we keep as data for each of the entities. If we want to track multiple properties, then we create multiple attributes.

Examples of these attributes for the entity ‘Sam Peters’ are. ‘Sam’, ‘Peters’, ‘04/09/2001’, ‘21’, ‘Vilvoorde’ and ‘Board games, rugby, travel’ which are respectively values for the attributes ‘First name’, ‘Name’, ‘Date of birth’, ‘Age’, ‘Place of residence’ and ‘Hobbies’.

An attribute is given a generic name describing the property. The possible values the attribute can take are called * the domain of an attribute.* For example, the attribute named ‘Residence’ can take as its domain ‘Vilvoorde’, ‘Leuven’, ‘Tienen’, ‘Landen’, ‘Heverlee’, ...

An attribute *is not shared between multiple entity types.* If for example, you want to keep track of the residence of both a customer and an employee, you need to add the attribute ‘City of residence’ both to entity type ‘Customer’ and to entity type ‘Employee’.

There are different types of attributes so you can put more nuance about the nature of the attribute you want to track, but we'll come back to that at a later point.

### How do you recognise an attribute?

Attributes are properties of entity types. So if you have a candidate entity type, you can * look for the different elements that say something about the entity types * and the data we want to record on them. Often, constructions such as ‘About the customer we want to track the following information ...’ give a very clear hint that we want to track data about entity type ‘Customer’ with then the necessary attributes. Unfortunately, it is not always clearly stated. Sometimes it can be easier to have a particular entity in mind. What do we want to know about our customer ‘Sam Peters’?

Sometimes, for certain elements, you have to make the choice of whether it is an entity type or an attribute of an entity type. Some tips we can give here:

- An entity type *without attribute* is an empty box. We have a concept but we don't keep any information on it. What is the relevance of this entity type?
- An entity type *with only one attribute*, may be an attribute of another entity type. An exception to this exists if this entity type has several relationships with other entity types, which is covered in the next section.

### Notation ERD

In the context of an ERD, an attribute is represented by an ellipsis containing the name of the attribute. This ellipse is then connected with a line to the entity type. An attribute cannot be shared between different entity types!

![Voorbeeld van de notatie van attributen: het entiteittype ‘Klant’ met een aantal attributen ‘Voornaam’, ‘Naam’, ‘Geboortedatum’, ‘Leeftijd’, ‘Hobby's’ en ‘Woonplaats’](/images/database-foundations/model-conceptueel-2-model_conceptueel_attributen_afb01.webp)

The domain of an attribute (= the possible values an attribute can have) is not displayed in an ERD.

### Exercise youth club: attributes

Create [exercise 2: youth club, attributes](/EN/model_conceptueel_oefeningen#Exercise-2:-youth-club:-attributes). Keep track of the result of the exercise as we continue building the model in a follolwing exercise.

## Relationships

### What are relationships?

An entity type with attributes describes concepts we find relevant and the data we want to store about them. * Information is created when data is combined and relationships are made. * To describe these connections that exist between different concepts, we use relationships.

* A relationship connects a number of entity types and gives the connection that exists between these entity types a name. * On top of this, relationships allow the relationship between entity types to be further nuanced by using a maximum and minimum cardinality. We discuss cardinality later.

An example of a relationship arises when Sam Peters goes into a supermarket to buy a bottle of water. After all, our customers will buy our products. We have two entity types here: ‘Customer’ (with as an entity ‘Sam Peters’) and ‘Product’ (with the entity ‘Bottle of water’). Between the two entity types, we create a relationship ‘Buys’. Our data model now allows us to derive information from which customers buy which products.

### How to recognise a relationship?

Relationships are about recognising and naming *connections*. Often, those relationships are described in the form of *‘is the ... of’* or a particular *verb.* You can evaluate for each combination whether a connection exists somewhere, but be careful not to create redundancy. We'll discuss redundancy later.

An entity type that is not connected to any other entity type is usually a sign that *a relationship is missing*, or that the isolated entity type is irrelevant.

### Notation ERD

A relationship is drawn in an ERD as a *diamond* in which we provide a name for the relationship. The diamond is connected to the relevant entity types.

![Een voorbeeld van de notatoe van een relatie: een relatie ‘Koopt’ tussen twee entiteittypes ‘Klant’ en ‘Product’. Elk entiteittype heeft een aantal attributen.](/images/database-foundations/model-conceptueel-3-model_conceptueel_relaties_afb01.webp)

### Redundancy

The purpose of an ERD is to have the simplest possible representation we can have of the necessary information. However, it is possible that in a data model *we add the same information multiple times.* This is called *redundancy*.

Redundancy arises mainly when we add entities, attributes or relationships *that can be derived from other elements* in our database. For example, a customer buys a car from one of the garages. We know which customer buys which car. We also know in which garage a car is sold. If we want to know in which garage a customer buys a car, we can add the relationship ‘Buys car in’ between the entity types ‘Customer’ and ‘Garage’.

But this relationship is redundant. We can always derive this information from the combination of the other relationships. The relationship ‘Buys car in’ should not be included in the ERD.

* To say that we can derive redundancy from any loop in our ERD is short-sighted. * It is true that redundancy often takes the form of a loop. But you should always keep in mind what you want to say specifically.

For example, suppose we want to track that a customer visits a particular garage, then we can define a relationship ‘Visits’ between the entity types ‘Customer’ and ‘Garage’. The visit may not lead to a purchase, so we do want to track that separately.

![Een voorbeeld van een niet-redundante relatie ‘Bezoekt’ tussen de entiteittypes ‘Klant’ en ‘Garage’ die bijkomende informatie aangeeft.](/images/database-foundations/model-conceptueel-4-model_conceptueel_relaties_afb03.webp) We will come back to this later when we talk about the relational database model.

### Degree

In most cases, a relationship will connect *two* entity types to each other, but this is not always the case. It is also possible that an entity type *references* itself, or that a relationship exists between *three or more* entity types. The number of entity types that are linked by a relationship is called the *degree* of a relationship.

In the case of a single entity type, we refer to it as a *unary relationship* or a *relationship of the first degree.* In case of two entity types, we speak of a *binary relationship* or a *relationship of the second degree*. In case of three entity types, we speak of an *ternary relationship *or a *relationship of the third degree*. And so on. Most relationships will be binary, but unary, ternary, ... relationships certainly occur.

An example of a unary relationship is ‘Is married to’ where an entity of the entity type ‘Person’ is married to an entity of the same entity type.

![Voorbeeld van een unaire relatie ‘Is getrouwd met’ die het entiteittypes ‘Persoon’ met zichzelf verbindt.](/images/database-foundations/model-conceptueel-5-model_conceptueel_relaties_afb04.webp)

We assume for this example that the two entities are not the same; but in principle, they could be. For example, * a relationship of an entity that has a relationship with itself * is where we indicate that a minister is succeeded by another minister. We could describe this by using the relation ‘Successor of’ that connects two entities of the entity type ‘Minister’ to each other. It may happen that a minister succeeds himself.

An example of a binary relationship is ‘Is pilot’ where an entity of the entity type ‘Pilot’ is assigned to an entity of the entity type ‘Scheduled flight’. As the example below also shows, it is possible to have *multiple relationships between two entity types* since we have also defined a binary relationship ‘Is co-pilot’. For a scheduled flight, one pilot will be assigned as the (lead) pilot and one other pilot as co-pilot. Based on the model, we keep the information of both roles.

![Voorbeeld van twee binaire relaties: de relatie ‘Is piloot’ en de relatie ‘Is co-piloot’ die het entiteittypes ‘Piloot’ en ‘Geplande vlucht’ verbinden.](/images/database-foundations/model-conceptueel-6-model_conceptueel_relaties_afb05.webp)

An example of a ternary relationship is ‘Prescribes’ where entities of entity type ‘Patient’, ‘Doctor’ and ‘Medication’ are connected to each other.

![](/images/database-foundations/model-conceptueel-7-Doctor-advising-patient-about-medication-pills_Hero_iStock-1169928112_2021-02_1336x614.webp) ![Voorbeeld van een ternaire relatie ‘Schrijft voor’ die de entiteittypes ‘Patiënt’, ‘Dokter’ en ‘Medicatie’ verbindt.](/images/database-foundations/model-conceptueel-8-model_conceptueel_relaties_afb06.webp)

For the relationship to exist between the three, it is essential that all three entity types are involved. * Indeed, should we replace this relation with binary relations, we would lose information. * The figure below does allow us to find out which patient receives which medication, but not by which doctor it is prescribed. It allows us to find out which patient is treated by which doctor but not which medication is prescribed in the process. And finally we also know which doctor prescribes which medication, but not for which patient. If we want to have the full picture in every case, we need to involve the three entity types in the relationship.

![Een voorbeeld hoe drie binaire relaties die geen goed alternatief vormen voor de ternaire relatie.](/images/database-foundations/model-conceptueel-9-model_conceptueel_relaties_afb07.webp)

* Alternatively, the above ternary relationship can be modelled as an entity type ‘Prescription’. * Here, we are going to replace the relationship ‘Prescribes’ connecting the entity types ‘Patient’, ‘Doctor’ and ‘Medication’, by an entity type ‘Prescription’ which is then each time connected with a binary relationship to the entity types ‘Patient’, ‘Doctor’ and ‘Medication’. For each prescription, we then know which patient receives the prescription, which doctor writes the prescription and which medication is prescribed.

![Een nieuw entiteittype ‘Voorschrift’ dat de entiteittypes ‘Patient’, ‘Dokter’ en ‘Medicatie’ verbindt als alternatief op de ternaire relatie ‘Schrijft voor’](/images/database-foundations/model-conceptueel-10-model_conceptueel_relaties_afb08.webp)

The advantage of this approach is that we can attach additional attributes to this entitytype. For example, we can add the attribute ‘Date’. This way, we also know on which date the prescription was written.

You can now ask which solution is best, the one with the ternary relationship ‘Prescribes’, or the one with the entity type ‘Prescription’. The answer is that *both solutions are correct.* At the end of the day, this is going to result in the same thing.

### Cardinality of a relationship

As mentioned earlier, a relationship connects one or more entity types. Entity relationship modelling allows us to further nuance the nature of that relationship by including additional information. For instance, we can specify to *how many* entities of a certain entity type an entity of another entity type should and can be connected. We do this by specifying the *cardinality* of a relationship. Each cardinality consists of two parts, a minimum and a maximum cardinality. This is determined for each entity type within the relationship individually.

The cardinality is important when we convert our data model to a logical and physical data model. An error in determining cardinality leads to a bad design, and eventually problems and errors in using the data.

Within an ERD, there are several notation forms for cardinality. In the context of this course, we use the *(min, max) notation for conceptual data models.* In addition to the (min, max) notation, we'll be using *crow's foot notation* in logical data models, so that you know both.

#### Minimum cardinality (or participation constraint)

Minimum cardinality indicates whether a relationship is *optional* or *mandatory*

for all entities of a specific entity type. There are two possible values: ‘0’ and ‘1’:

- The value ‘0’ indicates that the relationship for the specific entity type is *optional*. Optional means that an entity can exist without having a relationship with entities of the other entity types in the relationship.
- The value ‘1’ indicates the *restriction* that an entity can only exists if it has a relationship. In other words, an entity of this entity type can only exist if it has at least 1 relationship with entities of the other entity types within the relationship.

This may possibly sound a bit abstract, so let's explain this a little with the help of examples. A first example is the relationship ‘Buys’ between the entity types ‘Customer’ and ‘Product’. Now ask the following question: *can a product exist without being bought by a customer?* The answer is ‘yes’, because new products that we have not yet sold , may well already exist in the system. The minimum cardinality of the entity type ‘Product’ in the relationship ‘Buys’ is therefore ‘0’.

![](/images/database-foundations/model-conceptueel-11-klantkoopproduct.webp)

The next question we ask:* Can a customer exist without having bought a product? * This is already more difficult to answer unequivocally, because this is going to depend very much on how the shop is operated. If a customer can pre-register without making a purchase, a customer can exist without having bought a product purchased, and the minimum cardinality is ‘0’. But should a customer only be created as soon as he/she purchases a product, then the value of the minimum cardinality is ‘1’.

We assume for a moment that a customer only becomes a customer as soon as he/she buys something buys something, so with a minimum cardinality of ‘1’.

Within an ERD, we are going to denote the minimum cardinality where the line coming from the diamond representing the relationship touches the square representing the entity type. We write (0, ...) or (1, ...).

![Een voorbeeld van de minimumkardinaliteit in (min,max) notatie voor elk van de entiteittypes in de relatie ‘Koopt’.](/images/database-foundations/model-conceptueel-12-model_conceptueel_relaties_afb09.webp)

In the context of minimum cardinality * the value ‘1’ is the most restrictive one, * because we require that there must be at least one relation. When in doubt, we advise to go for ‘0’, or better still, not to make an assumption and ask specifically whether or not the relationship is optional for the entity type.

#### Maximum cardinality (or cardinality constraint)

The maximum cardinality specifies whether an entity of an entity type can have *multiple relationships* of the same type. We have two possible values: 1 or N.

- The value 1 indicates that an entity of an entity type * can have at most 1 relation * of a given type.
- The value N indicates that an entity of an entity type * can have multiple relations * of a given type.

Let's explain this again using our earlier example where customers buy products. We ask ourselves the following question: can a customer buy more than 1 product? The answer is ‘yes’, which means that we have a maximum cardinality of ‘N’. If we combine this with the minimum cardinality, then we can say that a customer can buy at least ‘1’ and maximum ‘N’ products, summarised as (1, N).

The next question we ask: * Can a product be bought by multiple customers? * Again, this is difficult to define unequivocally and will depend on the type of product we are selling. If we are talking about a supermarket, for example, then we can consider a bottle of water as a product, and multiple people buy a bottle of water. We do not keep a record of which customer bought a specific bottle of water. In that case, the maximum cardinality is ‘N’. But if it concerns something exclusive (e.g. a car, unique artwork, ...) then that unique piece can only be sold to 1 customer. And so then the maximum cardinality is ‘1’.

For this example, we will assume for a moment that a product can only be sold to 1 customer, so with a maximum cardinality of ‘1’.

Within an ERD, we are going to add the maximum cardinality after the minimum cardinality. We write (<minimum cardinality >, 1) or (<minimum cardinality>, N). When within the same type of relation, a maximum cardinality of N occurs multiple times, we differentiate by using M, O, P, ... instead of multiple N's. In doing so, we want to emphasise that these represent different values each time, but each time greater than ‘1’.

![Een voorbeeld van de minimum- en maximumkardinaliteit in (min,max) notatie voor elk van de entiteittypes in de relatie ‘Koopt’.](/images/database-foundations/model-conceptueel-13-model_conceptueel_relaties_afb10.webp)

How should you read the above figure? ‘Product’ in the relationship ‘Buys’ has a minimum cardinality of ‘0’, meaning that a product can exist without having been sold. The maximum cardinality of ‘Product’ in the relationship ‘Buys’ is ‘1’, meaning that a product can only be can be bought by one customer.

‘Customer’ in the relationship ‘Buys’ has a minimum cardinality of ‘1’, which means that a customer cannot exist without having bought a product. A relationship must exist with at least 1 product. The maximum cardinality of ‘Customer’ in the ‘Buys’ relationship is ‘N’, which means that a customer can buy multiple products and thus can be linked to multiple products.

#### Cardinality: example dog school

Perhaps the above was quite a lot of text. The following video tries to explain cardinality with a new example:

### Types of relationships

Of the *binary relationships*, we distinguish three different types.

#### 1-1 relationship

The first type is a 1-1 relationship (*one-to-one relationship*) where the *maximum cardinality of both entity types within the relationship is ‘1’.* Each entity of one entity type can thus have at most 1 relationship with an entity of the other entity type. And this applies in both directions.

An example of a 1-1 relationship is a relationship ‘Has’ where an entity (e.g. ‘Sam Peters’) of the entity type ‘Person’ can be linked to at most 1 entity of the entity type ‘Identity card’, and each entity of the entity type ‘Identity card’ can be linked to at most one entity of the entity type ‘Person’. Each person has at most one identity card, and each identity card belongs to exactly one person.

![Een voorbeeld van een 1-1 relatie.](/images/database-foundations/model-conceptueel-14-model_conceptueel_relaties_afb11.webp) ![](/images/database-foundations/model-conceptueel-15-idkaart.webp)

In the above example, we assume that history is not maintained, but a person may have multiple identity cards over the years. But we can solve that by defining two different relations: ‘Has’ and ‘Had’. A person can have at most 1 identity card, but over time he may have had several.

![Een voorbeeld van een 1-1 relatie.](/images/database-foundations/model-conceptueel-16-model_conceptueel_relaties_afb12.webp)

The *minimum cardinality* does not play a role in this characterisation. We only consider maximum cardinality.

#### 1-N relationship

A second type is a 1-N relationship (*one-to-many relationship*) where the maximum cardinality of one entity type is ‘N’ and that of the other entity type is ‘1’. Each entity of the entity type with maximum cardinality ‘N’ can be linked to multiple entities of the entity type with maximum cardinality ‘1’. Conversely, any entity of the entity type with maximum cardinality ‘1’ can be linked to up to 1 entity of the entity type with maximum cardinality ‘N’.

![](/images/database-foundations/model-conceptueel-17-autodealer.webp)

An example of a 1-N relationship is a relationship ‘Buys’ where an entity (e.g. ‘Sam Peters’) of the entity type ‘Customer’ can buy multiple entities of entity type ‘Car’, but each entity of the entity type ‘Car’ can be sold to at most one entity of the entity type ‘Customer’. A customer can buy multiple cars, but each car can be sold at most once (we won't consider second-hand sales for the moment). What is important in this example is that each car is individually identifiable and it is relevant to know which customer bought which car.

![Een voorbeeld van een 1-N relatie.](/images/database-foundations/model-conceptueel-18-model_conceptueel_relaties_afb13.webp)

Also, *minimum cardinality* plays no role in this characterisation.

#### N-M relationship

A third type is an N-M relationship (*many-to-many relationship*) where the maximum cardinality of both entity types is ‘N’ (or ‘M’, ‘P’, ...). Any entity of one entity type can thus have multiple relationships with an entity of the other entity type. And this applies in both directions.

An example of an N-M relationship is a relationship ‘Buys’ where an entity (e.g. ‘Sam Peters’) of the entity type ‘Customer’ can buy multiple entities of the entity type ‘Product’ can buy, and each entity of the entity type ‘Product’ can be bought by multiple entities of the entity type ‘Customer’. A customer can buy multiple products, each product can be bought by multiple customers. Importantly this example is that it is not relevant to individually identify each sold item. We do want to track that a customer ‘Sam Peters’ bought a bottle of water, but not which exact bottle that is, in contrast to the example with the car, where we do want to track this.

![Een voorbeeld van een N-M relatie.](/images/database-foundations/model-conceptueel-19-model_conceptueel_relaties_afb14.webp)

### Exercise youth association: relationships

Create [Exercise 3: youth club: relationships](/EN/model_conceptueel_oefeningen#Exercise-3:-youth-club:-relationships). Keep the result of the exercise as we will extend a a later moment.

## Types of attributes

### Key attributes

To *uniquely identify* entities, we use *key attributes*. Key attributes of an entity type are attributes that allow each entity of an entity type to be uniquely identified.

An example of a key attribute for the entity type ‘Student’ is the attribute ‘Student number’. Each student is uniquely identifiable by by his or her student number. For a car, you have a choice: you can use chassis number (Vehicule Identification Number or VIN) or license plate. Some research would teach you that chassis number is a better choice, so you use that as the key attribute.

In an ERD, we are going to denote key attributes by underlining the name of the attribute. If we need to combine multiple attributes to identify an entity, we underline each of the necessary attributes. If we have multiple candidates of (single or combined) attributes, we underline only one of the options.

![Een voorbeeld van een entiteittype ‘Student’ met een sleutelattribuut ‘Studentennummer’.](/images/database-foundations/model-conceptueel-20-model_conceptueel_soorten_attributen_afb02.webp)

* Keys are an important components of the relational database model*, so we will come back to this in detail in the context of the logical data model.

### Derived attributes

Attributes can, in some cases, be *derived* from other attributes. We refer to these cases as derived attributes.

An example of a derived attribute is the attribute ‘Age’ when we also have the attribute ‘Date of birth’ available. With using a calculation based on this date, we can also determine the age.

A derived attribute is indicated in an ERD by means of an ellipse drawn with a dotted line in which the name of the attribute is placed.

![Een voorbeeld van een entiteittype ‘Student’ met een afgeleid attribuut ‘Leeftijd’.](/images/database-foundations/model-conceptueel-21-model_conceptueel_soorten_attributen_afb03.webp)

The attribute which is used to derive the value also needs to be present in the data model. So in the case of ‘Age’, ‘Date of birth’ must also be present. It is not possible to indicate in an ERD that ‘Age’ is specifically derived from ‘Date of Birth’, you have to indicate that in the documentation or as a note on the model.

You can ask yourself the question ‘why are we adding these?’ The answer is that we want to be complete when we get certain questions from the users. If we have received an explicit request to add age, then we add age. We can also show that this can be inferred from the model and thereby reassuring users. At the same time, in this way we avoid creating redundancy and all the problems that come with it. In the above example, we also avoid having to continuously adjust the ages every time someone has a birthday.

By the way, a derived attribute can also be derived based on attributes of other entity types. The attribute ‘Number of credits’ of an entity of the entity type ‘Enrolment’ you can derive from the attribute ‘Number of credits’ of entities of the entity type ‘Course unit’ that are included within an enrolment.

### Composite and simple attributes

An attribute can be composite or simple. *Composite* attributes can still be divided into other (composite or simple) attributes. *Simple* attributes can no longer be partitioned.

An example of a composite attribute of the entity type ‘Person’ is ‘Address’. Namely, an address consists of a street, house number, ... In other words, we could also replace the attribute ‘Address’ be replaced by the attributes ‘Street’, ‘House number’, ...

In an ERD, we are *not* going to make the distinction between composite and simple. So there is no difference in notation.

The choice between composite or simple attributes is a *balance* between *simplicity and readability* on the one hand and *correct and complete* on the other. We often prefer correct and complete.

### Single-valued and multi-valued attributes

An attribute will typically contain at most one value for an entity. For example, for the entity type ‘Student’, for the entity ‘Sam Peters’, the attribute ‘First name’ will contain the value ‘Sam’. For each entity, we therefore have at most one value for a given attribute. We are talking about a single-valued attribute in this case.

It is also possible to define multiple attributes where for an attribute of an entity can have multiple values. It is example, it is possible for a student to have multiple email addresses. For the entity type ‘Student’, for the entity ‘Sam Peters’ the attribute ‘Email address’ could contain the values ‘sam.peters@gmail.com’ and ‘huppeldepup@gmail.com’. ‘Email address’ in this case is a multi-valued attribute.

A multi-valued attribute is indicated in an ERD by means of a double outlined ellipse in which the name of the attribute is placed.

![Een voorbeeld van een entiteittype ‘Student’ met een meerwaardig attribuut ‘E-mail’.](/images/database-foundations/model-conceptueel-22-model_conceptueel_soorten_attributen_afb04.webp)

### Attribute of a relation

In certain N-M relationships, you notice that you cannot place certain attributes with any of the entity types.

Let's take a look at the following example. In a company that sells used cars, it is possible for customers to reserve a test drive with one of the available cars. It is even possible for a customer interested in a car to test drive the same car several times. In addition, for one car, several customers can reserves test drives. If we were to convert this to an ERD, we arrive at the following diagram:

![Een voorbeeld van een N-M relatie met een relatie ‘Boekt testrit’ tussen de entiteittypes ‘Klant’ en ‘Wagen’.](/images/database-foundations/model-conceptueel-23-model_conceptueel_soorten_attributen_afb05.webp)

Our client also wants to know on what day and time the test drive is scheduled, so we want to add the attributes ‘Day’ and ‘Time of day’. Should we add these attributes to the entity type ‘Car’, that means that we can set one day and one time for each entity of ‘Car’. But since more than one person can request a test drive, different times may be recorded for one car. We could turn ‘Day’ and ‘Time of day’ into multi-valued attributes of the entity type ‘Car’. But even that is not an option, We would then have multiple days for each entity of ‘Car’ multiple days and multiple times but we would then have no idea which customer these belong to.

Should we add the attributes to the entity type ‘Customer’, then we are faced with a similar problem. A customer can test drive multiple cars, potentially on a different day and time. So should we add this as an attribute to the entity type ‘Customer’, all test drives would have the same date and time. We can conclude that adding attributes ‘Day’ and ‘Time of day’ to the entity type ‘Customer’ is not an option either.

The solution is to consider these attributes as properties of the relationship. As a result, for each combination of customer and car, we are going to specify on which day and time the test drive is scheduled.

![Een voorbeeld van een N-M relatie met een relatie ‘Boekt testrit’ tussen de entiteittypes ‘Klant’ en ‘Wagen’. De relatie is uitgebreid met twee attributen ‘Datum’ en ‘Tijdstip’.](/images/database-foundations/model-conceptueel-24-model_conceptueel_soorten_attributen_afb06.webp)

Attention * An attribute of a relationship can exist in the case of an N-M relationship. * For all other types of relationships, this is not possible as we can always attach the attribute to one of the entity types.

### Exercise youth club: types of attributes

Create [exercise 4: youth club, types-of-attributes](/EN/model_conceptueel_oefeningen#Exercise-4:-youth-club:-types-of-attributes).

### Exercise car rental company

Create [exercise 5: car rental company](/EN/model_conceptueel_oefeningen#Exercise-5:-car-rental-company).

## Weak and strong entities

Within entity types, we can make another distinction between weak entity types and strong entity types (also called ordinary entity types). A *weak entity type* describes a collection of entities that cannot exist on their own. The entities depend on the existence of other entities.

An example of a weak entity type is an ‘Enrolment’ at UCLL College. An enrolment cannot exist if no student exists. In other words, an entity ‘Sam Peters’ of entity type ‘Student’ must already have been created before we can enrol Sam. The entity of entity type ‘Enrolment’ will contain a reference to the entity of entity type ‘Student’. In the ERD, therefore, a relationship between the two entity types is necessary.

To identify the weak entity, we are going to use the key attribute of the strong entity. Based on the above example, we are thus going to use the student number of ‘Sam Peters’ to (partially) identify the enrollment. Since Sam may have multiple enrolments across multiple years, the student number is insufficient to identify the enrolment. We are going to combine it with a sequence number, or academic year, ...

A weak entity type is identified in an ERD as a square with a double outline containing the name of the entity type. The relationship between the weak and strong entity type is shown as a diamond with double outline.

![Een voorbeeld van een zwak entiteittype‘Inschrijving’ met relatietype ‘Schrijft in’.](/images/database-foundations/model-conceptueel-25-model_conceptueel_sterk_zwakke_entiteiten_afb01.webp)

Note that in the ERD, we do not take over the identifying attribute of the entity type ‘Student’ as the identifying attribute of ‘Enrolment’. However, we can infer this from the notation with the double outlined rectangles and diamonds.

In practice, a weak entity may well have its own key attribute be given when creating a logical or physical data model because this provide performance and efficiency gains.

### Exercise student administration

Create [exercise 6: student administration](/EN/model_conceptueel_oefeningen#Exercise-6:-student-administration).

## Extended Entity Relationship Diagram (EERD)

The ERD was extended to include a number of concepts to model more complex versions of reality.

### Subtypes and supertypes

An entity type is a *subtype of another entity type* if the first entity type inherits all attributes and relationships from the second entity type and extends it with its own attributes and relationships. The second entity type is a more generic entity type with some general attributes and relations, and we call it the *supertype*.

For example, an example of subtypes and supertypes is a supertype ‘Employee’, and two subtypes ‘Temporary employee’ and ‘Permanent employee’. Of the entity type ‘Employee’, we keep the typical properties: name, first name, date of birth, employee number, ... In addition, we have the entity type ‘Temporary employee’ that inherits all the attributes and relationships from the entity type ‘Employee’, but extends it with the attributes ‘Contract start date’ and ‘Contract end date’. The entity type ‘Permanent employee’ extends the entity type ‘Employee’ with the attributes ‘Employee start date’ and ‘Number of years service’.

Subtypes can be overlapping or disjoint:

- With *overlap*, an entity of the supertype can also simultaneously be an entity of multiple subtypes.
- With *disjoint*, an entity of the supertype can simultaneously be an entity of at most one subtype.

The above example is disjoint, since an employee is either a temporary worker, or a permanent worker but never both.

The inheritance can be total or optional:

- For *total inheritance*, an entity of the supertype must also be an entity of at least one of the subtypes.
- In *optional inheritance*, an entity of the supertype may be an entity of at least one of the subtypes, but it is not mandatory.

The above example is total, each employee must either be a temporary employee, or be a permanent employee.

Each entity of a subtype, is also an entity of the supertype. The relationship between a subtype and supertype is a 1-1 relationship. The key attribute of the supertype, also becomes the key attribute of the subtypes. This is implied by inheritance, and so should not be be added.

#### Notation ERD

The notation of sub- and supertypes is done using a circle with in it an ‘O’ to indicate overlapping subtypes, or a ‘D’ to indicate disjoint subtypes. From the subtypes, a line goes to the circle on which we draw an arc. From the circle, a line goes to the supertype. The line is drawn double or single. A double line indicates total inheritance, a single line optional inheritance.

![Een voorbeeld van een supertype ‘Werknemer’ met twee subtypes ‘Tijdelijke werknemer’ en ‘Permanente werknemer’.](/images/database-foundations/model-conceptueel-26-model_conceptueel_eerd_afb01.webp)

#### Generalisation and specialisation

The process of defining subtypes and supertypes is also known as generalisation and specialisation:

- *Generalisation* refers to the process by which, for a number of similar entity types, we create a supertype in which we collect the common attributes and relationships, and from which the initial entity types of inherit.
- *Specialisation* starts of an entity type where several subtypes are created, each of which has its own set of attributes or relationships that are different from the other subtypes.

In other words, it is the direction that determines whether you talk about generalisation or specialisation, but the result is the same.

#### When to apply?

Subtypes and supertypes are * useful when there is a large overlap between a number of entity types. * It provides a clear diagram.

### Exercise library

Create [exercise 7: library](/EN/model_conceptueel_oefeningen#Exercise-7:-library).
