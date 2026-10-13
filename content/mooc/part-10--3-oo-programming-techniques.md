---
title: "Object oriented programming techniques"
lang: ar
source: "https://programming-26.mooc.fi/part-10/3-oo-programming-techniques"
---

<text-box variant='learningObjectives' name="Learning objectives">

After this section

- You will be familiar with some of the different uses for the variable name `self`
- You will know how to overload operators in your own classes
- You will be able to create an iterable class

</text-box>

A class can contain a method which returns an object of the very same class. For example, below we have the class `Product`, whose method `product_on_sale` returns a new Product object with the same name as the original but with a price which is 25 % lower:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    def product_on_sale(self):
        on_sale = Product(self.__name, self.__price * 0.75)
        return on_sale
```

```python
apple1 = Product("Apple", 2.99)
apple2 = apple1.product_on_sale()
print(apple1)
print(apple2)
```


```
Apple (price 2.99)
Apple (price 2.2425)
```


Let's review the purpose of the variable `self`: within a class definition it refers to the object itself. Typically it is used to refer to the object's own traits, its attributes and methods. The variable can be used to refer to the entire object as well, for example if the object itself needs to be returned to the client code. In the example below we've added the method `cheaper` to the class definition. It takes another Product as its argument and returns the cheaper of the two:

```python
class Product:
    def __init__(self, name: str, price: float):
        self.__name = name
        self.__price = price

    def __str__(self):
        return f"{self.__name} (price {self.__price})"

    @property
    def price(self):
        return self.__price

    def cheaper(self, Product):
        if self.__price < Product.price:
            return self
        else:
  ... (truncated)
