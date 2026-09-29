---
title: "SQL Exercises on tennis club database"
lang: en
---

> Experience is a great advantage. The problem is that when you get the experience, you're too damned old to do anything about it. &mdash;Jimmy Connors

We move to a larger schema, with five linked tables. This schema is the basis of the book ‘The SQL Textbook’, 7th edition, Rick van der Lans, Academic Service.

## The tennis database

### Relational physical model

The figure below shows the ERD for this schema. Study this diagram thoroughly and read the explanations in the following sections carefully. Many exercises on this schema follow.

![](/images/database-foundations/sql-tennis-0-tennis.webp)

### Important information about the club/database

The tennis club was founded in 1970 and from the beginning a number of administrative records have been stored in a database. This database consists of the following tables: players, teams, matches, fines and board members.

The player table contains data on *players* who are members of the tennis club, such as names, addresses and dates of birth. Joining the association always takes place on January 1 of a given year. Thus, players cannot become members in the middle of a year. The player table does not contain historical data. If a player cancels his or her membership, he or she disappears from the table. Also, when a player relocates to another address, the old address is overwritten with the new address, so the old address is not stored anywhere.

The tennis club has two types of members: recreational players and competition players. The first group only plays matches among themselves, so no matches against players of other clubs. The results of these mutual matches are not registered. Competition players play in teams against players of other clubs. The results of these games are tracked. Each player has a unique number , regardless of whether they are a competition player or not.

The league, which is a national institution, gives each competitive player a unique number. This association number usually consists of numbers, but may also contain letters. If a competitive player no longer plays matches and becomes a recreational player, the association number expires. Note that recreational players do not have an association number, but they do have a player number.

![](/images/database-foundations/sql-tennis-1-tennisclub.webp)

The tennis club has a number of *teams* competing in leagues. For each team, the captain and the division in which the team currently competes in are recorded. The captain does not need to have played for the team. It could be that a particular player may at one time be captain of two or more teams. Also in this table, no history is kept. When a team is promoted or relegated to another division the registered division is simply overwritten. The same applies for the captain of a team: when changing, the number of the old captain is overwritten.

A team consists of a number of players. If a team plays against a team from another association, each player on that team plays a match against a player of the other team (we assume for convenience that matches in which pairs play against each other do not occur). The team whose players win the most matches is the winner.

A team does not always consist of the same group of players. In case of illness or vacations, substitutes are sometimes needed. A player can therefore be a part of several teams. When we talk about ‘the players of a team’, this means ‘the players who have played at least one game for the team’. Again, only players with an association number may play official matches.

A tennis match is made up of a number of sets. The person who has won the most sets is the winner. For each match it is determined in advance with how many sets the match is won. In general the match is stopped when one of the two players has won two or three sets. Possible end positions of a tennis match are thus 2-1 or 2-0 if played until one of the players has won two sets (best of three), or 3-2, 3-1 or 3-0 if played to three sets won (best of five). A player can win his or her match or lose, a draw is not possible. The match table records each player who has played the match and for which team. It also records how many sets the player has won and lost. From this we can deduce whether he or she has won the match.

For misconduct of players (late attendance, aggressive behavior or failure to appear), the league will impose fines. Fines will be paid by the tennis club. Once paid, the amount and date are recorded in the fines table. As long as a player plays matches, all fines are kept on file for him or her.

When a player leaves the club, all of his or her data in the five tables is destroyed. If the club withdraws a team, all data on that team is deleted from the teams and matches table. If a match player stops playing matches and he or she thus becomes a recreational player again, all match and penalty data are deleted from the respective tables.

Since Jan. 1, 1990, the board membership table has kept track of who is on the board. Four positions are distinguished: chairman, treasurer, secretary and general member. A new board is elected every year on January 1. When a player holds a board position, the start and end dates of this position are recorded. If someone is still active, no end date is entered.

### CREATE statements

You don't have to build this schema yourself. *It can be accessed through the pooling connection, df database, schema ‘tennis_en’.*

Below we provide the SQL code we used to create the five tables. *We do expect that you understand all the lines in this code.* The `CHECK` restrictions (`CONSTRAINTS`) are new, but presumably these are not that difficult to decipher. It is really important to study the schema carefully.

```sql
CREATE  TABLE tennis_en.players (
  player_number         integer  NOT NULL ,
  name                  char(15)  NOT NULL ,
  initials              char(3)  NOT NULL ,
  birth_date            date   ,
  sex                   char(1)  NOT NULL ,
  year_of_entry         smallint  NOT NULL ,
  street                varchar(30)  NOT NULL ,
  house_number          char(4)   ,
  postal_code           char(6)   ,
  municipality          varchar(30)  NOT NULL ,
  telephone             char(13)   ,
  association_number    char(4)   ,
  CONSTRAINT players_pkey PRIMARY KEY ( player_number ) ,
  CONSTRAINT players_postal_code_check CHECK ( (postal_code LIKE '______' ) ) ,
  CONSTRAINT players_year_of_entry_check CHECK ( (year_of_entry > 1969) ) ,
  CONSTRAINT players_sex_check CHECK ( (sex IN ('M', 'F')) )
);

CREATE  TABLE tennis_en.teams (
  team_number           integer  NOT NULL ,
  player_number         integer  NOT NULL ,
  division              char(6)  NOT NULL ,
  CONSTRAINT teams_pkey PRIMARY KEY ( team_number ) ,
  CONSTRAINT teams_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES tennis_en.players( player_number ) ,
  CONSTRAINT teams_division_check CHECK ( (division IN ('first', 'second')) )
);

CREATE  TABLE tennis_en.matches(
  match_number          integer  NOT NULL ,
  team_number           integer  NOT NULL ,
  player_number         integer  NOT NULL ,
  won                   smallint  NOT NULL ,
  lost                  smallint  NOT NULL ,
  CONSTRAINT matches_pkey PRIMARY KEY ( match_number ),
  CONSTRAINT matches_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES
       tennis_en.players( player_number )   ,
  CONSTRAINT matches_team_number_fkey FOREIGN KEY ( team_number ) REFERENCES tennis_en.teams( team_number )  ,
  CONSTRAINT matches_lost_check CHECK ( ((lost >= 0) AND (lost <= 3)) ) ,
  CONSTRAINT matches_won_check CHECK ( ((won >= 0) AND (won <= 3)) )
);

CREATE  TABLE tennis_en.board_members(
  player_number         integer  NOT NULL ,
  start_date            date  NOT NULL ,
  end_date              date   ,
  function              char(20)   ,
  CONSTRAINT board_members_pkey PRIMARY KEY ( player_number, start_date ),
  CONSTRAINT board_members_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES
      tennis_en.players( player_number ) ,
  CONSTRAINT board_members_check CHECK ( (start_date < end_date) ) ,
  CONSTRAINT board_members_start_date_check CHECK ( (start_date >= '1990-01-01'::date) )
);

CREATE  TABLE tennis_en.fines (
  payment_number        integer  NOT NULL ,
  player_number         integer  NOT NULL ,
  date                  date  NOT NULL ,
  amount                numeric(7,2)  NOT NULL ,
  CONSTRAINT fines_pkey PRIMARY KEY ( payment_number ),
  CONSTRAINT fines_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES	tennis_en.players( player_number ) ,
  CONSTRAINT fines_date_check CHECK ( (date >= '1969-12-31'::date) ) ,
  CONSTRAINT fines_amount_check CHECK ( (amount > (0)::numeric) )
);
```

### Some points of interest

In the ERD (and the `CREATE` code) we just want to point out a few things:

- Note that ‘player number’ has a central role in the diagram. It is the primary key in one table and in the four other tables the foreign key.
- The board member table has a compound primary key. In the figure you can see that by the two key icons, in the code there are two columns in the `PRIMARY KEY`.
- A common mistake is not taking into account the fact *that the player number in the team table is the number of the captain of that team*. To know who has played matches effectively, you need to look into the *matches* table and use the player number.

## Simple exercises

We begin with some simple exercises, mainly designed to get to know this schema a little better. As always: make them yourself and only then look at the solution.

Show all players from Zoetermeer who joined the club before 1984. You must obtain the column contents and headings of the figure.

![](/images/database-foundations/sql-tennis-2-oef1_4.webp)

#### الحل

```sql
SELECT player_number, name || ' ' || initials AS name, year_of_entry
FROM players
WHERE municipality = 'Zoetermeer' AND year_of_entry < 1984;
```

List all teams for which player number 27 is the captain.

![](/images/database-foundations/sql-tennis-3-oef1_5.webp)

#### الحل

```sql
SELECT *
FROM teams
WHERE player_number = 27;
```

List all won tennis matches.

![](/images/database-foundations/sql-tennis-4-oef1_6.webp)

#### الحل

You win a match if you win more sets than you lose:

```sql
SELECT *
FROM matches
WHERE won > lost;
```

List all the matches played by player 112. For each of these matches, calculate by how many sets this player won or lost.

![](/images/database-foundations/sql-tennis-5-oef1_8.webp)

#### الحل

The figure shows that you need to add a new column that is the result of a simple calculation:

```sql
SELECT match_number, player_number, abs(won - lost) AS difference
FROM matches
WHERE player_number = 112;
```

Make a list of all paid fines.

![](/images/database-foundations/sql-tennis-6-oef1_9.webp)

#### الحل

```sql
SELECT *
FROM fines
```

In the list from the previous exercise, also add the player's name (name and initials in one column).

![](/images/database-foundations/sql-tennis-7-oef1_10.webp)

#### الحل

The information you need is now spread across two tables, so you need a `JOIN`.

```sql
SELECT b.payment_number, b.player_number, s.name || ' ' || s.initials AS name, b.date, b.amount
FROM fines b INNER JOIN players s ON b.player_number = s.player_number;
```

Give the smallest and largest fine amount.

![](/images/database-foundations/sql-tennis-8-oef1_11.webp)

#### الحل

```sql
SELECT min(amount) AS min, max(amount) AS max
FROM fines;
```

List all board members currently in office. Show their function. Also provide their names (name and initials in one column) as shown in the figure.

![](/images/database-foundations/sql-tennis-9-oef2_1.webp)

#### الحل

```sql
SELECT b.player_number, s.name || ' ' || s.initials AS name, b.start_date, b.function
FROM board_members b INNER JOIN players s ON b.player_number = s.player_number
WHERE end_date IS null;
```

Make a list of all female players who do *not* live in Leiden.

![](/images/database-foundations/sql-tennis-10-oef2_2.webp)

#### الحل

```sql
SELECT player_number, name, municipality, sex
FROM players
WHERE sex = 'F' AND municipality != 'Leiden';
```

## Fines

What is the average fine amount? How many fines have already been paid?

![](/images/database-foundations/sql-tennis-11-oef2_3.webp)

#### الحل

```sql
SELECT round(avg(amount)) AS average, count(amount) AS "number of fines"
FROM fines;
```

List all fines greater than € 30. Show the amount in euro cents. Also give the player number and name of the player who received the fine.

![](/images/database-foundations/sql-tennis-12-oef2_4.webp)

#### الحل

```sql
SELECT b.player_number, s.name, round(amount*100) AS "amount in cents"
FROM fines b INNER JOIN players s ON b.player_number = s.player_number AND amount > 30;
```

Start from the previous exercise: a list of all players who received a fine of more than € 30. The difference now is that we only want *a list of players* and not a list of fines. A player who received more more than one fine (e.g. Cools has a fine of both € 75 and € 100) may appear only once in this list.

![](/images/database-foundations/sql-tennis-13-oef2_5.webp)

#### الحل

```sql
SELECT DISTINCT player_number
FROM fines
WHERE amount > 30;
```

## Matches, players, captains, ...

List all games won, played by members of team 2. Show the player number of the winning player and also the player number of the team's captain.

![](/images/database-foundations/sql-tennis-14-oef2_6.webp)

#### الحل

```sql
SELECT w.match_number, w.player_number, w.team_number, t.player_number AS captain
FROM matches w INNER JOIN teams t ON w.team_number = t.team_number
WHERE w.team_number = 2 AND won-lost > 0;
```

Generate a list of all competition players. Not all players from our club play in a league, but those who do play in official competitions must be members of the national association (the figure does not show the complete list).

![](/images/database-foundations/sql-tennis-15-oef2_7.webp)

#### الحل

```sql
SELECT player_number, name
FROM players
WHERE association_number IS NOT null;
```

Show the overview of the previous exercise, but only for the female players.

![](/images/database-foundations/sql-tennis-16-oef2_8.webp)

#### الحل

```sql
SELECT player_number, name, sex
FROM players
WHERE association_number IS NOT null AND sex = 'F';
```

Display name and initials, team and division for the captain of each team.

![](/images/database-foundations/sql-tennis-17-oef2_9.webp)

#### الحل

```sql
SELECT t.team_number,t.player_number, s.name || ' ' || s.initials AS captain, t.division
FROM teams t INNER JOIN players s ON t.player_number = s.player_number;
```

Limit the previous list to female captains.

![](/images/database-foundations/sql-tennis-18-oef2_10.webp)

#### الحل

```sql
SELECT t.team_number,t.player_number, s.name || ' ' || s.initials AS captain, t.division
FROM teams t INNER JOIN players s ON t.player_number = s.player_number
WHERE s.sex = 'F';
```

## More difficult exercises

List the player number, player name, date of the fine and the amount of the fine of all the players who have been fined an amount greater than € 45.50 and live in Rijswijk. Sort by player number and the number of the fine.

![](/images/database-foundations/sql-tennis-19-tennis_opg_1.webp)

#### الحل

```sql
SELECT players.player_number, players.name, fines.date, fines.amount
FROM players INNER JOIN fines ON players.player_number = fines.player_number
WHERE fines.amount > 45.50 AND players.municipality = 'Rijswijk'
ORDER BY players.player_number, fines.payment_number;
```

For each match, provide the match number and the full name of the captain of the team that played the match. Sort your result according to the match number in ascending order. TIP: you will have `JOIN` more than two tables here.

![](/images/database-foundations/sql-tennis-20-tennis_opg_2.webp)

#### الحل

```sql
SELECT W.match_number, T.player_number, name, initials
FROM matches W INNER JOIN teams T on W.team_number = T.team_number
  INNER JOIN players S on T.player_number = S.player_number
ORDER BY 1;
```

Create a table in which you indicate for each municipality that has at least one letter ‘o’ (uppercase or lowercase both OK) how many players live in that municipality. Sort by municipality.

![](/images/database-foundations/sql-tennis-21-tennis_opg_3.webp)

#### الحل

```sql
SELECT municipality, COUNT(*) AS number
FROM players
GROUP BY municipality
HAVING LOWER(municipality) LIKE '%o%'
ORDER BY municipality;
```

Give the average fine amount per player, rounded to two decimal places after the decimal point. Players without fines are given the value ‘no fines’. Sort by player name.

![](/images/database-foundations/sql-tennis-22-tennis_opg_4.webp)

#### الحل

```sql
SELECT players.name,
  CASE
    WHEN AVG(fines.amount) IS NULL THEN 'no fines'
    ELSE CAST(ROUND(AVG(fines.amount), 2) AS varchar(8))
  END AS average
FROM players LEFT OUTER JOIN fines ON players.player_number = fines.player_number
GROUP BY players.player_number, players.name
ORDER BY 1;
```

Give the average number of sets won and lost by year of birth. Round to two decimal places in each case. Sort by year of birth so that the data of the youngest players is at the top.

![](/images/database-foundations/sql-tennis-23-tennis_opg_5.webp)

#### الحل

```sql
SELECT EXTRACT(YEAR FROM birth_date) AS birthyear, ROUND(AVG(won),2) AS won,
  ROUND(AVG(lost),2) AS lost
FROM matches W INNER JOIN players S ON W.player_number = S.player_number
GROUP BY EXTRACT(YEAR FROM birth_date)
ORDER BY birthyear DESC;
```

A difficult exercise ... Give for all active board members *without fine* their last game played (the one with the highest game number). Sort descending by player number.

![](/images/database-foundations/sql-tennis-24-tennis_opg_6.webp)

#### الحل

```sql
SELECT board_members.player_number, MAX(matches.match_number) AS final_match
FROM board_members
  INNER JOIN matches ON board_members.player_number = matches.player_number AND
        board_members.end_date IS NULL
  LEFT OUTER JOIN fines ON board_members.player_number = fines.player_number
WHERE fines.player_number IS NULL
GROUP BY board_members.player_number
ORDER BY player_number DESC;
```
