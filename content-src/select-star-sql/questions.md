---
title: "Closing Remarks and Challenge Questions"
lang: en
---

## Closing Remarks

Thanks for sticking around to the end! I hope it was an enjoyable and enlightening read.

At this point, we’ve covered most of the important SQL commands and functions, but I hope that the biggest takeaways will be the techniques and heuristics for thinking of queries. Some of the major ones were:

- Comparing the shape of available tables with the desired result to decide what aggregation to do.
- Examining where the information we require resides. Is it in an adjacent row? Or a group? Or the entire dataset?
- Interpreting queries in the right logical structure. For instance, viewing clauses as essentially a true or false; viewing ` <table1> JOIN <table2> ON ... ` as a great big table.

Looking forward, to complete your SQL education, it is probably worth it to look into window functions and common table expressions. You can replicate their behavior with techniques you’ve learned here, but they make life a lot easier and introduce you to a valuable new paradigm. I’ve omitted these concepts because at the time of writing SQLite [didn’t support window functions](https://www.sqlite.org/windowfunctions.html#history), and I wanted to avoid the complexity of a new database and SQL dialect.

Up till now we’ve also only learned about consuming data (querying). There is a whole other area of SQL for manipulating data. These deal with actions like table creation and data insertion and deletion. Understanding these concepts can be useful even if you don’t administer databases because it helps you understand, among other things, why tables are structured the way they are.

Most importantly, you still need lots of practice to become effective on real world problems. The next section provides some exercises but the difficulty increases sharply. You might want to go out into the world and practice what we’ve covered so far and come back when you’re ready.

## Challenge Questions

The exercises in the previous chapters were designed to reduce complexity to create a nurturing environment. This chapter marks the boundary into the wild untamed world of SQL problems. The idea here is trial-by-fire—the questions are optimized for utility rather than ease of learning. Even experienced SQL writers may struggle; and there is much value in this struggle.

### Call for Problems

Good problems make or break a tutorial. If you have an idea for a new problem or section, I'd love to help you post it up here with full credit going to you. Email me at [zichongkao@gmail.com](mailto:zichongkao+web@gmail.com) or submit a [pull request](https://github.com/zichongkao/selectstarsql). Remember that good problems aren't necessarily hard—they showcase techniques that have wide-ranging applications.

## Senate Cosponsorship Dataset

### Authored by: Kao

In this section, we introduce a new dataset from the 114th session of Congress (2015-2016) [compiled by James Fowler and others](http://jhfowler.ucsd.edu/cosponsorship.htm). I reworked the dataset to allow us to study cosponsoring relationships between senators.

The senator who introduces the bill is called the “sponsor”. Other senators can show their support by cosponsoring the bill. Cosponsors at the time of introduction are called “original cosponsors” ([Source](https://www.congress.gov/resources/display/content/How+Our+Laws+Are+Made+-+Learn+About+the+Legislative+Process#HowOurLawsAreMade-LearnAbouttheLegislativeProcess-IntroductionandReferraltoCommittee)). Each row of the table shows the bill, the sponsor, an original cosponsor, and the states the senators represent. Note that there can be multiple cosponsors of a bill.
