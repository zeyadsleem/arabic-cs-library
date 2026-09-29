---
title: "Exercises SQL on database for a cooking club"
lang: en
---

> All I ever wanted to do was to make food accessible to everyone; to show that you can make mistakes &ndash; I do all the time &ndash; but it doesn't matter. &mdash;Jamie Oliver

## Presentation model

In this last chapter we want to give you an idea of the difficulty of the exercises on the exam. For this we recycle a model used on a previous exam for a cooking club.

You can find this model (‘cooking_club’) in the database ‘df’. You only have `SELECT` permissions and thus cannot test `INSERT`, `CREATE` etc.

For this exam, we will use a simple model of an organization that sets up cooking workshops. This is the physical model:

![](/images/database-foundations/sql-kookclub-0-ERD_kookclub.webp)

We would like to automate the organization of cooking workshops. A cooking workshop is always about a certain theme within which there are certain dishes. Members can register to participate in a workshop and can also give a score and some feedback. Both attributes are not mandatory.

At the time a cooking workshop is organized, as mentioned above the theme is determined. Within each theme, a number of dishes are known. For a cooking workshop dishes can be chosen from the offerings within that theme, but it is also possible to add a new dish. Of course this new dish will be linked to that theme. For every dish the ingredients and in what quantity they are used for each dish are marked in the database.

Note for ingredients: the unit indicates whether that ingredient is used per g, per ml, per tablespoon, per piece or other. The energy level displays the number of kcal. Note that if the unit is expressed in g or ml, then the energy is always given per 100 g or 100 ml. In the other cases it is per unit indicated.

For example, check in the database that strawberries have 32 kcal of energy per 100 g and that one apricot has an energy content of 27 kcal.

#### الحل

```sql
SELECT *
FROM cooking_club.ingredient -- or use the search_path …
WHERE name IN ('Strawberry','Apricot');
```

Don't forget to set your `search_path` properly or use the name of the schema before the name of a table ...

Tip: Now study the model before looking at the questions. Review the contents of all the tables so you get an idea of where you can find information and how extensive some tables are. A part of the database is automatically generated (e.g. ‘member’ and ‘participation’), but many tables are still manually populated so the data looks fairly realistic.

Below you will find many exercises as they were once asked on an exam. There are a lot of different types:

- Give the answer to a question, no SQL code requested.
- Give the SQL code that answers a question.
- Modify the database: add data, change things (you can't test this, though because you don't have the proper privileges to do so).
- What does the following SQL code do?
- Expand the model with a new functionality.

## Questions where you just have to give the answer

For these exercises you only have to give a short answer (name, ingredient, municipality, ... ). So you do not have to give the query with which you found this answer. In the solutions you will usually find the query so you can check what you did wrong.

The schema includes a comprehensive list of ingredients. Some of these are per gram, others per milliliter, per tablespoon, still others per piece etc. Suppose you eat one of each ingredient counted *by piece*, how much energy (kcal) have you ingested?

#### الحل

Answer: 7071 kcal. A possible query for this is:

```sql
SELECT sum(energy)
FROM ingredient
WHERE unit = 'piece';
```

This schema has been filled in part by automatic data generation. This has not been done too cleverly. For example, it is obviously not possible for a registration date to fall *after* the cooking workshop itself. So this error has to be be corrected manually. How many such erroneous registrations are there?

#### الحل

Answer: 57, possible query:

```sql
SELECT COUNT(*)
FROM participation D INNER JOIN cooking_workshop K ON D.workshop = K.workshop_id
WHERE D.registration_date > K.start_time;
```

Check out all the *main* dishes ever made in a cooking workshop. This required a lot of ingredients. If you delete them from the long list of all ingredients and you organize the remaining list alphabetically, which ingredient, that was not used for any main course, is in row 81?

#### الحل

Answer: Meatball, solution found e.g. via:

```sql
SELECT name, IG.dish
FROM dish_in_workshop GW
  INNER JOIN ingredient_in_dish IG on GW.dish = IG.dish AND role_in_menu = 'Main Dish'
  RIGHT OUTER JOIN ingredient I ON IG.ingredient = I.name
WHERE IG.dish is NULL
ORDER BY 1;
```

Who is the youngest cooking workshop participant who used the word ‘awesome’ or ‘fantastic’ in his feedback? Please provide first name followed by name.

#### الحل

Answer: Ramiro Bell, with e.g. the following query:

```sql
SELECT first_name, name, birth_date, feedback
FROM participation D INNER JOIN member L ON D.member = L.member_number
WHERE feedback LIKE '%awesome%' OR feedback LIKE '%fantastic%'
ORDER BY 3 DESC;
```

## Model question

In this question, you have to add something to the model. You cannot test this because you only have `SELECT` permissions on the schema. You draw something on paper for this query on the ERD (physical data model) of the schema and issue the necessary SQL queries.

We want to keep track of how many ingredients we need to order for a particular workshop. To do this, we need to keep track the amount of each ingredient ordered on a specific date.

1. Draw the necessary extension to the diagram.
2. Write the changes needed in the `CREATE` script. Also be sure that the numbers ordered are always strictly positive. Include all integrity rules.
3. For cooking workshop 7, the following ingredients should be ordered: 600 g ginger (80 kcal per 100 g), 180 g wasabi (241 kcal per 100 g), 6 kg salmon (137 kcal per 100 g) and 7 pieces of broccoli (35 kcal each). Write the necessary `INSERT` statements for this.

#### الحل

You need to create a table:

```sql
CREATE  TABLE cooking_club.order (
  ingredient_name          varchar(30)  NOT NULL ,
  workshop_id              smallint  NOT NULL ,
  order_date               date NOT NULL ,
  number                   smallint  NOT NULL ,
  CONSTRAINT pk_order PRIMARY KEY ( ingredient_name, workshop_id, order_date ),
  CONSTRAINT fk_order_ingredient FOREIGN KEY ( ingredient_name )
      REFERENCES cooking_club.ingredient( name )   ,
  CONSTRAINT fk_order_cooking_workshop FOREIGN KEY ( workshop_id )
       REFERENCES cooking_club.cooking_workshop( workshop_id )   ,
  CONSTRAINT cns_order CHECK ( number > 0 )
);
```

Adding the additional information goes as follows: order for 0.6 kg of ginger (80 kcal per 100 g), 180 g of wasabi (241 kcal per 100 g), 6 kg of salmon (137 kcal per 100 g) and 7 broccoli (35 kcal each) to be will be used in cooking workshop 7 because there we will prepare fish in an oriental way. Ginger, Salmon and Broccoli are already in the ingredient table. Wasabi is not in there yet, so first you need to add that ingredient:

```sql
INSERT INTO ingredient VALUES ('Wasabi', 'g', 241);
```

Now we can put the order in order:

```sql
INSERT INTO order VALUES ('Ginger', 7, '2020-08-18', 600);
INSERT INTO order VALUES ('Wasabi', 7, '2020-08-18', 180);
INSERT INTO order VALUES ('Salmon', 7, '2020-08-18', 6000);
INSERT INTO order VALUES ('Broccoli', 7, '2020-08-18', 7);
```

## Given the SQL query, what was the question?

For this exercise, you are given a query that is the answer to a particular question. What was the question? Give your answer as completely as possible. Feel free to use several sentences.

```sql
SELECT distinct municipality
FROM municipality LEFT OUTER JOIN member using(postal_code)
  INNER JOIN participation ON member.member_number = participation.member
  INNER JOIN dish_in_workshop using(workshop)
  INNER JOIN ingredient_in_dish using(dish)
GROUP BY municipality, participation.member
HAVING COUNT(distinct ingredient) > 30
ORDER BY 1 ASC;
```

#### الحل

Provide an alphabetical list of all municipalities where residents participated in one or more cooking workshops with a total of more than 30 different ingredients (across all cooking workshops of this member). If there are several such residents, the municipality should be listed only once. The `OUTER JOIN` has no effect and is not translated to the question.

## SQL queries

The following type of exercises requires *the full SQL* query to be returned as your answer.

Provide an overview that shows by ingredient in which themes that ingredient is used. There is an additional column that shows the energy of an ingredient in one word: lower than 100 (kcal) is ‘low’ , between 100 and 300 is ‘medium’ and higher than 300 is ‘high’. Avoid repetition of rows. Put ingredients in alphabetical order. Write the query.

![](/images/database-foundations/sql-kookclub-1-kcal.webp)

#### الحل

```sql
SELECT distinct I.name AS ingredient, GT.theme AS "name theme", 
  CASE
    WHEN energy < 100 THEN 'low'
    WHEN energy > 300 THEN 'high'
    ELSE 'medium'
  END AS energy
FROM ingredient I
    INNER JOIN ingredient_in_dish IG ON (I.name = IG.ingredient)
    INNER JOIN dish_fits_in_theme GT using(dish)
ORDER BY 1;
```

For each theme, please list (see figure) by municipality how many participants are from that municipality. Rank alphabetically by theme and within one theme according to decreasing number of members. Write the query.

![](/images/database-foundations/sql-kookclub-2-ledenperthema.webp)

#### الحل

```sql
SELECT theme, municipality, COUNT (member_number) AS "number of members per municipality"
FROM member
  INNER JOIN municipality USING (postal_code)
  INNER JOIN participation ON (member = member_number)
  INNER JOIN cooking_workshop ON (workshop = workshop_id)
GROUP BY theme, postal_code, municipality
ORDER BY theme, COUNT(member_number) DESC;
```

An alternative where municipality in the `GROUP BY` may be omitted because of not using `USING`:

```sql
SELECT theme, municipality, COUNT (member_number) AS "number of members per municipality"
FROM member
  INNER JOIN municipality ON municipality.postal_code = member.postal_code
  INNER JOIN participation ON (member = member_number)
  INNER JOIN cooking_workshop ON (workshop = workshop_id)
GROUP BY theme, municipality.postal_code
ORDER BY theme, COUNT(member_number) DESC;
```

How many kcal are in the dish ‘Tiramisu with chocolate and banana’ per ingredient? Please note that where the unit is ‘g’ or ‘ml’, the energy content is the number of kcal per 100 g or 100 ml. For all other units, the number in kcal is simply the energy per unit (piece, tablespoon, etc.). So keep in mind the units. The ingredient that makes the largest energy contribution to this dish is at the top, then the second, etc. See figure. Write the query.

![](/images/database-foundations/sql-kookclub-3-tiramisu-energie.webp)

#### الحل

```sql
SELECT IG.ingredient, quantity, unit,energy,
  CASE
    WHEN unit in ('g','ml') THEN energy * quantity / 100
    ELSE energy * quantity
  END AS titak
FROM ingredient_in_dish IG INNER JOIN ingredient I ON IG.ingredient = I.name
WHERE dish = 'Tiramisu with chocolate and banana'
ORDER BY 5 DESC;
```

## Questions where you just have to give the answer, part 2

List alphabetically all ingredients that are *not yet* used in a dish. Which ingredient is in position 100 and what is the energy value of this ingredient? So your answer contains two parts as e.g., ‘Cauliflower with 25 kcal’.

#### الحل

Answer: ‘Red Whine’ with 82 kcal. Possible query:

```sql
SELECT ingredient.name, ingredient.energy
FROM ingredient LEFT OUTER JOIN ingredient_in_dish ON (ingredient.name = ingredient_in_dish.ingredient)
WHERE ingredient_in_dish.dish IS NULL
ORDER BY ingredient.name;
```

View all participations in cooking workshops by people from a community that begins with an ‘N’ or ends with an ‘n’. How many participants from these communities gave a score of at least 7?

#### الحل

Answer: 10. Possible query:

```sql
SELECT score, member_number, municipality, postal_code
FROM participation D
    INNER JOIN member L ON D.member = L.member_number
    INNER JOIN municipality using(postal_code)
WHERE (municipality LIKE 'N%' OR municipality LIKE '%n') AND score >= 7;
```

Review the long list of ingredients, but limit yourself to those ingredients that are measured in grams (‘g’). Calculate the average energy of these ingredients (which is measured per 100 g, but for this question, this is not important). Which ingredient that is measured per g has an energy content closest to this average?

#### الحل

Answer: Advocaat (240 Kcal per 100 g, is closest to average 226,5). You can obtain this most easily with two small queries, but of course it can be done more elegantly with one query (which contains a subquery).

```sql
SELECT name,energy -- but first you ask avg(energy)
FROM ingredient
WHERE unit = 'g'
ORDER BY 2;
```

Provide first name and name of the member with most participations. If there are multiple members with the same maximum number of participations, give all names (first name followed by last name).

#### الحل

Answer: Benny Nielsenn, Casey Valentine, Shelley Vincent

```sql
SELECT name, first_name, COUNT(*)
FROM participation D INNER JOIN member L ON D.member = L.member_number
GROUP BY member_number
ORDER BY 3 DESC, 1;
```

## Given the SQL query, what was the question, part 2?

For this exercise, you get a query that is the answer to a particular question. What was this question? Give your answer as completely as possible. Feel free to use several sentences to clearly describe that question.

```sql
SELECT G.name
FROM theme T
    INNER JOIN dish_fits_in_theme GT ON T.name = GT.theme
    RIGHT OUTER JOIN dish G ON GT.dish = G.name AND
        T.name IN ('mediterranean','italian','fish')
WHERE T.name is NULL AND G.description NOT LIKE '%summer%'
ORDER BY preparation_time DESC;
```

#### الحل

This is a difficult exercise, [see also the heading "Selecting rows that do NOT meet a certain condition in the piece about OUTER JOIN](/EN/SQL_outerjoin/index.html#Select-rows-that-do-NOT-meet-a-certain-condition). List all dishes in the database that *do not* have as a theme Mediterranean, Italian or fish and where the description of the dish does not include the word summer, sorted by decreasing duration to prepare the dish.

## SQL query's, part 2

Write a query that, for all dishes that have an ingredient list, calculates the total energy content in kcal. Attention: for ingredients whose unit is ‘g’ or ‘ml’, the energy content per 100 g or 100 ml is given. For all other units the energy content is given per unit (‘piece’, ‘dl’, ‘teaspoon’, ...). We would like to use this overview to get a list of only ‘light’ dishes that in total contain less than 4000 kcal. The dish with the least number of kcal is at the top, then the second etc. The screenshot shows only the first two rows.

![](/images/database-foundations/sql-kookclub-4-weinigkcal.webp)

#### الحل

```sql
SELECT IG.dish,
  sum(CASE
    WHEN unit in ('g','ml') THEN energy * quantity / 100
    ELSE energy * quantity
  END) AS "total kcal"
FROM ingredient_in_dish IG INNER JOIN ingredient I ON IG.ingredient = I.name
GROUP BY IG.dish
HAVING sum(CASE
    WHEN unit in ('g','ml') THEN energy * quantity / 100
    ELSE energy * quantity
  END) < 4000
ORDER BY 2;
```

In signing up, we did not consider the maximum number of participants of each cooking workshop. This is stupid, of course, because the people who registered after the maximum number of participants reached should be notified that the workshop is already fully booked. Write a query that generates the list of all workshops that are are overbooked. The most overbooked workshop is at the top, below that the one with the second largest overbooking and so on. The screenshot in the figure below shows only the first three rows.

![](/images/database-foundations/sql-kookclub-5-overboekt.webp)

#### الحل

```sql
SELECT workshop_id, max_participants, COUNT(*) AS "number of participants"
FROM cooking_workshop KW INNER JOIN participation D ON D.workshop = KW.workshop_id
GROUP BY workshop_id
HAVING COUNT(*) > max_participants
ORDER BY (COUNT(*) - max_participants) DESC;
```

## Questions where you just have to give the answer, part 3 (+ video)

Make a list of all members who have not yet participated in any workshop and live on a street ending in ‘pad’. Rank this list from old to young. What is the first name of the person who is in position 7 in this list?

#### الحل

Answer: Angelica. Possible query:

```sql
SELECT *
FROM member M LEFT OUTER JOIN participation P ON M.member_number = P.member
WHERE street LIKE '%pad' AND workshop IS NULL
ORDER BY birth_date;
```

List by municipality the average score that people from that municipality gave to a cooking workshop. Sort this list so that the highest average scores are at the top. Within the same average score sort alphabetically. Municipalities where no one gave a score are not included in this list. Which municipality (name) is at the top?

#### الحل

Answer: Barvaux-Condrox. Possible query:

```sql
SELECT avg(score), municipality
FROM participation P
  INNER JOIN member M ON P.member = M.member_number
  INNER JOIN municipality G ON G.postal_code = M.postal_code
WHERE score IS NOT NULL
GROUP BY municipality
ORDER BY avg(score) DESC, municipality ASC;
```

Calculate the percentage of participants who received a positive evaluation. By ‘positive’ we mean that the evaluation should contain at least one of the following words: ‘good’, ‘great’ or ‘fantastic’. Tip: you can write two fairly short queries that each return a number and then use your calculator to calculate the percentage yourself. It can of course also be done in one query.

#### الحل

Answer: 23.5%. There are 94 good participations:

```sql
SELECT COUNT(*)
FROM participation
WHERE feedback LIKE '%good%' or feedback LIKE '%great%' or feedback LIKE '%fantastic%';
```

In all, there are 400 participations:

```sql
SELECT COUNT(*)
FROM participation;
```

Make a list of all the ingredients that contain *exactly* twice the letter ‘a’. We don't consider upper/lower case. Sort according to decreasing energy content. Which ingredient is in place 21?

#### الحل

Answer: Low-fat cottage cheese. Possible query:

```sql
SELECT *
FROM ingredient
WHERE (lower(name) LIKE '%a%a%') AND NOT(lower(name) LIKE '%a%a%a%')
ORDER BY 3 DESC;
```

Generate an overview of all registrations for workshops for which the participant wrote feedback and with a registration date before January 1 2019. Sort this list alphabetically by name. Enter the first name and last name of the person listed in position 100.

#### الحل

Answer: Sonya Osborne. Query:

```sql
SELECT name, first_name, member, registration_date, feedback
FROM participation P INNER JOIN member M ON P.member = M.member_number
WHERE feedback IS NOT NULL AND registration_date < '2019-01-01'
ORDER BY 1;
```

Rank all themes by decreasing number of entries so that the theme to which the most people subscribed is at the top. How many entries did the theme that ranks fifth in this list have?

#### الحل

Answer: 41

```sql
SELECT theme, COUNT(*)
FROM participation INNER JOIN cooking_workshop ON workshop = workshop_id
GROUP BY theme
ORDER BY 2 DESC;
```

## Modifying database data (+ video)

The municipalities of ‘Overpelt’ and ‘Neerpelt’ have recently merged. Both together now form the municipality of ‘Pelt’. The site of the municipality of Pelt states: ‘3900 Overpelt becomes 3900 Pelt and 3910 Neerpelt becomes 3910 Pelt’. You, as the database administrator for the cooking club, have to make sure that this information is correctly updated in the database. Write one query that does this. Caution: because you only have `SELECT` privilege to the database, you will not be able to test the query.

#### الحل

```sql
UPDATE cooking_club.municipality
SET municipality = 'Pelt'
WHERE postal_code = '3900' OR postal_code = '3910';
```

## Given the query, what was the question, part 3 (+ video)?

Given the following query. Describe accurately and briefly (one sentence) what the question is to which the query provides the answer. Begin your answer with “List all the ... ”. This exercise is more difficult than you would expect at first glance.

```sql
SELECT name
FROM theme T LEFT OUTER JOIN cooking_workshop CW ON T.name = CW.theme AND max_participants > 35
WHERE theme IS null;
```

#### الحل

“Please list all topics (name will suffice) that *not* are covered in a cooking workshop with a maximum capacity of more than 35 participants.” Alternative: “Please list all themes that have not yet been covered in a cooking workshop or have only been covered in a cooking workshop with at most 35 participants.”

## Adding information to the database (+ video)

Jeroen Meus recently made in [his cooking program ‘dagelijkse kost’](https://dagelijksekost.vrt.be) (english: ‘daily food’) ‘Cheese Croquette with ham and asparagus’. That looked particularly delicious. You so want to add this dish to the database. We give below the full description. You need to add the appropriate lines. *Information that is already in the database should not be added again*, because then the database server responds with an error message. If there is information missing that is needed, then make up something appropriate. Beware: because you only have `SELECT` privilege to the database, you will not be able to test the queries.

We add ‘Cheese Croquette with ham and asparagus’. This dish is described as ‘Asparagus in a croquette, together with ham and Flandrien cheese’. It takes an hour to prepare this dish. You will need the following ingredients:

- 10 asparagus (each one provides an energy of 18 kcal)
- 150 g butter (100 g butter provides 737 kcal)
- one lemon (1 lemon has 35 kcal energy)
- 200 g of ham (100 g of ham provides 335 kcal)
- 0.3 kg of Flandrien Cheese (100 g provides 365 kcal energy)

This dish fits the theme of ‘belgian’. Write all the necessary queries to add all this information to the database.

#### الحل

In terms of ingredients, you just need to add the Flandrien cheese:

```sql
INSERT INTO cooking_club.ingredient VALUES ('Flandrien Cheese', 'g', 365);
```

Then add the new dish:

```sql
INSERT INTO cooking_club.dish VALUES 
  ('Cheese Croquette with ham and asparagus','Asparagus in a croquette, together with ham and Flandrien cheese', 60);
```

Next, the intermediate table between the two:

```sql
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Asparagus',10);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Butter',150);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Lemon',1);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Ham',200);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Flandrien Cheese',300);
```

Finally pair the dish with the belgian theme:

```sql
INSERT INTO cooking_club.dish_fits_in_theme VALUES ('Cheese Croquette with ham and asparagus','belgian');
```

## SQL queries, part 3 (+ video)

Write the SQL query that generates the following summary: a list of all municipalities with a total of three cooking workshop registrations. We want only those municipalities that contain at least three times the lowercase ‘e’ in the name. Arrange the results in reverse alphabetical order.

![](/images/database-foundations/sql-kookclub-6-3deelnames.webp)

#### الحل

Alternative: grouping by municipality and postal code is also allowed, postal code is more specific.

```sql
SELECT G.postal_code, COUNT(*) AS "number of participations", G.municipality
FROM municipality G
  INNER JOIN member M ON G.postal_code = M.postal_code
  INNER JOIN participation P ON M.member_number = P.member
WHERE municipality LIKE '%e%e%e%'
GROUP BY G.postal_code
HAVING COUNT(*) = 3
ORDER BY 3 DESC;
```

Suppose you make all dishes that are themed ‘italian’ or ‘BBQ’ (or both together). Now make an overview per ingredient with per line the name, amount of energy (in kcal per piece, 100 g, 100 ml, ...), the unit in which it is counted, the total amount of this ingredient you need to prepare all of these dishes and the amount of energy in kcal that this represents. Order so that the ingredient with the largest amount of kcal is at the top. Write the query.

#### الحل

```sql
SELECT ingredient, energy, unit, sum(quantity) AS "total quantity",
  CASE
    WHEN unit = 'g' or unit = 'ml' THEN energy*sum(quantity)/100
    ELSE energy*sum(quantity)
  END AS "total energy"
FROM ingredient_in_dish IG
  INNER JOIN dish_fits_in_theme GT ON IG.dish = GT.dish
  INNER JOIN ingredient I ON I.name = IG.ingredient
WHERE theme IN ('italian','BBQ')
GROUP BY ingredient, energy, unit
ORDER BY 5 DESC;
```
