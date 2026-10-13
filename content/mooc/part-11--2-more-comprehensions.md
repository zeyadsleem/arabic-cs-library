---
title: "(More comprehensions)"
lang: ar
source: "https://programming-26.mooc.fi/part-11/2-more-comprehensions"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be able to use comprehensions with strings
- You will know how to use comprehensions with your own classes
- You will be able to create dictionary comprehensions

</text-box>

Lists are perhaps the most common target for comprehensions, but comprehensions work on any series of items, including strings. Just like in the list examples in the previous section, if a list comprehension is performed on a string, the items (i.e. the characters) in the string are plucked one by one, processed according to the expression given, and stored in a list.

```python
name = "Peter Python"

uppercased = [character.upper() for character in name]
print(uppercased)
```


```
['P', 'E', 'T', 'E', 'R', ' ', 'P', 'Y', 'T', 'H', 'O', 'N']
```


The result is indeed a list, as dictated by the bracket notation around the comprehension statement. If we wanted a string instead, we could use the string method `join` to parse the list into a string. Remember, the method is called on the string we want to use as the "glue" between the characters. Let's take a look at some examples:

```python
name = "Peter"
char_list = list(name)
print(char_list)

print("".join(char_list))
print(" ".join(char_list))
print(",".join(char_list))
print(" and ".join(char_list))
```


```
['P', 'e', 't', 'e', 'r']
Peter
P e t e r
P,e,t,e,r
P and e and t and e and r
```


List comprehensions and the `join` method make it easy to create new strings based on other strings. We could, for example, make a string which contains only the vowels from another string:

```python
test_string = "Hello there, this is a test!"

vowels = [character for character in test_string if character in "aeiou"]
new_string = "".join(vowels)

print(new_string)
```


```
eoeeiiae
```


In the example above the list comprehension and the `join` method... (truncated)
