---
title: "(List comprehensions)"
lang: ar
source: "https://programming-26.mooc.fi/part-11/1-list-comprehensions"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know what list comprehensions are
- You will be able to use list comprehensions to create new lists

</text-box>

One of the situations where programming is at its most powerful is processing sequences of items and events. Computers are good at repeating things. For example, in the previous parts of this material we have been iterating over strings, lists and dictionaries in various ways.

Let's assume we have a list of integers, and we would need the same list of items in string format. A traditional way of completing the task could look like this:

```python
numbers = [1, 2, 3, 6, 5, 4, 7]

strings = []
for number in numbers:
    strings.append(str(number))
```

## List comprehensions

There is also a more "pythonic" way of generating lists from existing lists. These are called _list comprehensions_.

The idea is to fit on a single line both the description of what should be done to each item on the list, and the assignment of the result to a new list.

In the above example, the operation performed on each item on the list was very simple: each integer was converted into a string. Let's see what this would look like implemented with a list comprehension:

```python
numbers = [1, 2, 3, 6, 5, 4, 7]
strings = [str(number) for number in numbers]
```

The second line above contains many of the same elements as the more traditional iterative approach, but the syntax is different. One way of generalising a list comprehension statement would be

`[<expression> for <item> in <series>]`

The square brackets around the list comprehension statement signal to Python that the result should be a new list. One by one, each item in the original list is processed, and the result is stored in the new list, just like in the iterative approach above. As a result we have a new list with exactly as many items as were in the original,... (truncated)
