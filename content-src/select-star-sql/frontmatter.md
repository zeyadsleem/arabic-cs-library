---
title: "Front Matter"
lang: en
---

## Impetus

When I was a data scientist at Quora, I used to have people ask me for resources for learning SQL. I struggled to find something I could stand behind because I felt that a good resource had to be free, not require registration, and care about pedagogy—it had to genuinely care about its users and there was nothing like that around.

By overcoming some minor [technical hurdles](#technicals), I believe that **Select Star SQL** has met this standard. My hope is that like [Learn You a Haskell for Great Good!](http://learnyouahaskell.com/chapters) and [Beautiful Racket](https://beautifulracket.com) have done for Haskell and Racket, **Select Star SQL** will become the best place on the internet for learning SQL.

## Pedagogy

These principles have guided the design of this project:

- **Programming is best learnt by doing.** A high proportion of the material consists of exercises, and struggling with them should occupy most of your time.
- **Exercises should be realistic and substantial.** To quote [Alan Kay](https://www.fastcompany.com/40435064/what-alan-kay-thinks-about-the-iphone-and-technology-now): "You never let [the learner] do something that isn’t the real thing—but you have to work your ass off to figure out what the real thing is in the context of the way their minds are working at that developmental level." Likewise, the exercises here have been designed to introduce increasingly sophisticated SQL techniques while exploring the dataset in ways that people would actually be interested in.
- **Learning to program is learning a mental model** Our goal here isn't to learn the rules for how to use `GROUP BY` or when to pick a `LEFT JOIN` over an `INNER JOIN`. We know we've been successful if after writing a SQL query, you can close your eyes and imagine what the computer would do and what output it would give. Only then will you be able to solve real-world problems with SQL.

## Dataset

Our dataset documents Texas death row inmates executed from 1976, when the Supreme Court reinstated the death penalty, to the present. It was extracted from the [Texas Department of Criminal Justice](https://www.tdcj.state.tx.us/death_row/dr_executed_offenders.html) website using automatic means where possible. However, much of the pre-1995 data is only available as images of physical documents and these required painstaking manual extraction.

The raw data is available as a csv for [download](data/tx_deathrow_full.csv). Because of the manual extraction and cleaning that was done, it is probably the most complete set of Texas death row data on the internet. You can also explore a subset of it that I’ve prepared for this book:

On one level, the data is simply a part of a mundane programming book. On another, each row represents immense suffering, lives lost, and in some cases amazing redemption and acceptance. In preparing for this dataset, I was deeply moved by a number of the statements and found myself re-evaluating my position on capital punishment. I hope that as we examine the data, you too will contemplate the deeper issues at play.

## Technicals

- **Client-side Databases**. One of the challenges of making this site free was to avoid paying for web hosting. But to give users a hands-on experience with a database (see [Pedagogy](#pedagogy)), one would have to host and pay for a proper backend. Thankfully, client-side databases exist. This allows me to use [Github Pages'](https://pages.github.com) free static page hosting and have the pages run a SQLite database on your browser. Alon Zakai and others made this possible by [porting the SQLite C code into Javascript using Emscripten](https://github.com/kripken/sql.js).
- **Matthew Butterick**. I met Matthew at the [Racket Summer School](https://summer-school.racket-lang.org/2018/) and was blown away by the great work he's done on [Beautiful Racket](http://beautifulracket.com) and [Practical Typography](http://practicaltypography.com). As you can perhaps tell, I borrowed many design ideas from there.
- **Jekyll**. If not for [Jekyll](https://jekyllrb.com/), I would have ended up writing all the html by hand. Thank goodness for Jekyll.
- **Web Components**. I was able to reuse a lot of code by writing the interactive exercise and quiz components as [custom html tags](https://developer.mozilla.org/en-US/docs/Web/Web_Components). It's a relatively new development as I understand, and I hope that W3C continues to push for broader adoption.

## Credits and Contact

For corrections and suggestions, please write me (Kao) at zichongkao@gmail.com. You can find out more about me at [Kaomorphism](http://kaomorphism.com).

[Noam Castel](https://thepitz.io/) and Jowan Vogel did an amazing job on the [Hebrew](/he/) and [Dutch](/nl) translations. Please reach out to them for kudos and suggestions, or if you are interested translating it into other languages.

Much thanks to Sonja Lea Heinze, Quinn Batten, and [Nicholas Retallack](https://nickretallack.com) for providing valuable feedback.
