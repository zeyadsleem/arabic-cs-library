---
title: "Add Timestamp"
lang: "en"
chapter: "testing"
slug: "exercise-add-timestamp"
order: 30
source: "https://stevekinney.com/courses/testing/exercise-add-timestamp"
---

**Your mission**: We want a function that takes an object and adds a `timestamp` field to it with the current date.

The problem, of course, is that the current date is always going to be different, because—as they say—time keeps on tickin’, tickin’, tickin’ into the future. So, we don’t care about the exact value. We just want to make sure that a `timestamp` field was added and that the value of that field is some kind of `Date` object.
