---
title: "(Class hierarchies)"
lang: ar
source: "https://programming-26.mooc.fi/part-10/1-class-hierarchies"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will know what inheritance means in a programming context
- You will be able to write classes which inherit other classes
- You will know how inheritance affects the traits in classes

</text-box>

## Special classes for special purposes

Sometimes you come across a situation where you have already defined a class, but then realize you need special traits in some, but not all, instances of the class. Then again, sometimes you realize you've defined two very similar classes with only minor differences. As programmers we aim to always repeat ourselves as little as possible, while maintaining clarity and readability. So how can we accommodate for different implementations of intrinsically similar objects?

Let's have a look at two class definitions: `Student` and `Teacher`. Getter and setter methods have been left out for now, in order to keep the example short.

```python

class Student:

    def __init__(self, name: str, id: str, email: str, credits: str):
        self.name = name
        self.id = id
        self.email = email
        self.credits = credits

class Teacher:

    def __init__(self, name: str, email: str, room: str, teaching_years: int):
        self.name = name
        self.email = email
        self.room = room
        self.teaching_years = teaching_years

```

Even in a stripped down example, like the above, we already have quite a bit of repetition: both classes contain attributes `name` and `email`. It would be a good idea to have a single attribute definition, so that a single function would suffice for editing both attributes. 

For example, imagine the school's email address changed. All addresses would have to be updated. We _could_ write two separate versions of essentially the same function:

```python

def update_email(o: Student):
    o.email = o.email.replace(".com", ".edu")

def u... (truncated)
