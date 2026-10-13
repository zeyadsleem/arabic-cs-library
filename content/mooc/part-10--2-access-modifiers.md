---
title: "(Access modifiers)"
lang: ar
source: "https://programming-26.mooc.fi/part-10/2-access-modifiers"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will understand the access modifiers private and protected
- You will know how the visibility of traits is determined in Python

</text-box>

If a trait is defined as private in the base class, it is not directly accessible in any derived classes, as was briefly mentioned in the previous section. Let's take a look at an example. In the `Notebook` class below the notes are stored in a list, and the list attribute is private:

```python

class Notebook:
    """ A Notebook stores notes in string format """

    def __init__(self):
        # private attribute
        self.__notes = []

    def add_note(self, note):
        self.__notes.append(note)

    def retrieve_note(self, index):
        return self.__notes[index]

    def all_notes(self):
        return ",".join(self.__notes)

```

If the integrity of the class is key, making the list attribute `notes` private makes sense. The class provides the client with suitable methods for adding and browsing notes, after all. This approach becomes problematic if we define a new class `NotebookPro`, which inherits the `Notebook` class. The private list attribute is not accessible to the client, but neither is it accessible to the derived classes. If we try to access it, as in the `find_notes` method below, we get an error:

```python
class NotebookPro(Notebook):
    """ A better Notebook with search functionality """
    def __init__(self):
        # This is OK, the constructor is public despite the underscores
        super().__init__()

    # This causes an error
    def find_notes(self, search_term):
        found = []
        # the attribute __notes is private
        # the derived class can't access it directly
        for note in self.__notes:
            if search_term in note:
                found.append(note)

        return found
```


```... (truncated)
