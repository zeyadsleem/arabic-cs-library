---
title: "Functions"
lang: en
source: https://discrete.openmathbooks.org/dmoi4/sec_structures-functions.html
---

\A function is a rule that assigns each input exactly one output. We call the output the image of the input. The set of all inputs for a function is called the domain. The set of all allowable outputs is called the codomain. We would write \(f:X \to Y\) to describe a function with name \(f\text{,}\) domain \(X\text{,}\) and codomain \(Y\text{.}\) This does not tell us *which* function \(f\) is though. To define the function, we must describe the rule. This is often done by giving a formula to compute the output for any input (although this is certainly not the only way to describe the rule).[🔗](#sec_structures-functions-2-2) For example, consider the function \(f:\N \to \N\) defined by \(f(x) = x^2 + 3\text{.}\) Here the domain and codomain are the same set (the natural numbers). The rule: Take your input, multiply it by itself, and add 3. This works because we can apply this rule to every natural number (every element of the domain) and the result is always a natural number (an element of the codomain). Notice though that not every natural number is actually an output (there is no way to get 0, 1, 2, 5, etc.). The set of natural numbers that *are* outputs is called the range of the function (in this case, the range is \(\{3, 4, 7, 12, 19, 28, \ldots\}\text{,}\) all the natural numbers that are 3 more than a perfect square).[🔗](#sec_structures-functions-2-3) The key thing that makes a rule a *function* is that there is *exactly one* output for each input. That is, it is important that the rule be a good rule. What output do we assign to the input 7? There can only be one answer for any particular function.[🔗](#sec_structures-functions-2-4)

### Example 5.2.1.

The following are all examples of functions:

1. \(f:\Z \to \Z\) defined by \(f(n) = 3n\text{.}\) The domain and codomain are both the set of integers. However, the range is only the set of integer multiples of 3.[🔗](#sec_structures-functions-2-5-1-1-1-1-1) [🔗](#sec_structures-functions-2-5-1-1-1-1)
2. \(g: \{1,2,3\} \to \{a,b,c\}\) defined by \(g(1) = c\text{,}\) \(g(2) = a\text{,}\) and \(g(3) = a\text{.}\) The domain is the set \(\{1,2,3\}\text{,}\) the codomain is the set \(\{a,b,c\}\) and the range is the set \(\{a,c\}\text{.}\) Note that \(g(2)\) and \(g(3)\) are the same element of the codomain. This is okay since each element in the domain still has only one output.[🔗](#sec_structures-functions-2-5-1-1-1-2-1) [🔗](#sec_structures-functions-2-5-1-1-1-2)
3. \(h:\{1,2,3,4\} \to \N\) defined by the table:[🔗](#sec_structures-functions-2-5-1-1-1-3-1) \(x\) 1 2 3 4 \(h(x)\) 3 6 9 12 Here the domain is the finite set \(\{1,2,3,4\}\text{,}\) and the codomain is the set of natural numbers, \(\N\text{.}\) At first you might think this function is the same as \(f\) defined above. It absolutely is not. Even though the rule is the same, the domain and codomain are different, so these are two different functions.[🔗](#sec_structures-functions-2-5-1-1-1-3-3) [🔗](#sec_structures-functions-2-5-1-1-1-3)

[🔗](#sec_structures-functions-2-5-1-1) [🔗](#sec_structures-functions-2-5)

### Example 5.2.2.

Just because you can describe a rule in the same way you would write a function does not mean that the rule is a function. The following are NOT functions.

1. \(f:\N \to \N\) defined by \(f(n) = \frac{n}{2}\text{.}\) The reason this is not a function is because not every input has an output. Where does \(f\) send 3? The rule says that \(f(3) = \frac{3}{2}\text{,}\) but \(\frac{3}{2}\) is not an element of the codomain.[🔗](#sec_structures-functions-2-6-1-1-1-1-1) [🔗](#sec_structures-functions-2-6-1-1-1-1)
2. Consider the rule that matches each person to their phone number. If you think of the set of people as the domain and the set of phone numbers as the codomain, then this is not a function, since some people have two phone numbers. Switching the domain and codomain sets doesn’t help either, since some phone numbers belong to multiple people (assuming some households still have landlines when you are reading this).[🔗](#sec_structures-functions-2-6-1-1-1-2-1) [🔗](#sec_structures-functions-2-6-1-1-1-2)

[🔗](#sec_structures-functions-2-6-1-1) [🔗](#sec_structures-functions-2-6)

### Subsection Describing Functions

It is worth making a distinction between a function and its description. The function is the abstract mathematical object that in some way exists whether or not anyone ever talks about it. But when we *do* want to talk about the function, we need a way to describe it. A particular function can be described in multiple ways.[🔗](#sec_structures-functions-3-3) Some calculus textbooks talk about the *Rule of Four*, that every function can be described in four ways: algebraically (a formula), numerically (a table), graphically, or in words. In discrete math, we can still use any of these to describe functions, but we can also be more specific since we are primarily concerned with functions that have \(\N\) or a finite subset of \(\N\) as their domain.[🔗](#sec_structures-functions-3-4) Describing a function graphically usually means drawing the graph of the function: plotting the points on the plane. We can do this and might get a graph like the following for a function \(f:\{1,2,3\} \to \{1,2,3\}\text{.}\)[🔗](#sec_structures-functions-3-5) ![Graph of the first quadrant, including axes and a rectangular grid. Points on grid at (1,2), (2, 1) and (3,3).](generated/latex-image/discrete-function-graph.svg) It would be absolutely WRONG to connect the dots or try to fit them to some curve. There are only three elements in the domain. A curve would mean that the domain contains an entire interval of real numbers.[🔗](#sec_structures-functions-3-7) Here is another way to represent that same function:[🔗](#sec_structures-functions-3-8) ![Two rows containing the numbers 1, 2, and 3, from left to right. Arrows from the top 1 to bottom 2, from the top 2 to bottom 1, and top 3 straight down to bottom 3.](generated/latex-image/arrow-function-example.svg) This shows that the function \(f\) sends 1 to 2, 2 to 1, and 3 to 3: Just follow the arrows.[🔗](#sec_structures-functions-3-10) The arrow diagram used to define the function above can be very helpful in visualizing functions. We will often be working with functions with *finite* domains, so this kind of picture is often more useful than a traditional graph of a function.[🔗](#sec_structures-functions-3-11) Note that for finite domains, finding an algebraic formula that gives the output for any input is often impossible. Of course we could use a piecewise-defined function, like \begin{equation*} f(x) = \begin{cases} x+1 \amp \text{ if } x = 1 \\ x-1 \amp \text{ if } x = 2 \\ x \amp \text{ if } x = 3\text{.}\end{cases} \end{equation*} This describes exactly the same function as above, but we can all agree is a ridiculous way of doing so. [🔗](#sec_structures-functions-3-12) Since we will so often use functions with small domains and codomains, let’s adopt some notation to describe them. All we need is some clear way of denoting the image of each element in the domain. In fact, writing a table of values would work perfectly:[🔗](#sec_structures-functions-3-13)

| \(x\) | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| \(f(x)\) | 3 | 3 | 2 | 4 | 1 |

We simplify this further by writing this as a “matrix” with each input directly over its output: \begin{equation*} f = \twoline{0 \amp 1 \amp 2\amp 3 \amp 4}{3 \amp 3 \amp 2 \amp 4 \amp 1}\text{.} \end{equation*} Note this is just notation and not the same sort of matrix you would find in a linear algebra class (it does not make sense to do operations with these matrices, or row reduce them, for example). [🔗](#sec_structures-functions-3-15) One advantage of the two-line notation over the arrow diagrams is that it is harder to accidentally define a rule that is not a function using two-line notation.[🔗](#sec_structures-functions-3-16)

#### Example 5.2.3.

Which of the following diagrams represent a function? Let \(X = \{1,2,3,4\}\) and \(Y = \{a,b,c,d\}\text{.}\)[🔗](#sec_structures-functions-3-17-1-1) ![Picture labeled f:X to Y with two rows of numbers and letters and arrows between the rows. Top row contains the numbers 1, 2, 3, and 4. Bottom row contains letters a, b, c, and d. Arrows point from 1 to d, 2 to a, 3 to c, and 4 to d.](generated/latex-image/f-arrows.svg) ![Picture labeled g:X to Y with two rows of numbers and letters and arrows between the rows. Top row contains the numbers 1, 2, 3, and 4. Bottom row contains letters a, b, c, and d. Arrows point from 1 to d, 2 to a, 3 to a, and 4 to b.](generated/latex-image/g-arrows.svg) ![Picture labeled f:X to Y with two rows of numbers and letters and arrows between the rows. Top row contains the numbers 1, 2, 3, and 4. Bottom row contains letters a, b, c, and d. Arrows point from 2 to a and also 2 to c, 3 to d, and 4 to b.](generated/latex-image/h-arrows.svg) Solution. \(f\) is a function. So is \(g\text{.}\) There is no problem with an element of the codomain not being the image of any input, and there is no problem with \(a\) from the codomain being the image of both 2 and 3 from the domain. We could use our two-line notation to write these as \begin{equation*} f= \begin{pmatrix} 1 \amp 2 \amp 3 \amp 4 \\ d \amp a \amp c \amp b \end{pmatrix} \qquad g = \begin{pmatrix} 1 \amp 2 \amp 3 \amp 4 \\ d \amp a \amp a \amp b \end{pmatrix} \end{equation*} . [🔗](#sec_structures-functions-3-17-2-1) However, \(h\) is NOT a function. In fact, it fails for two reasons. First, the element 1 from the domain has not been mapped to any element from the codomain. Second, the element 2 from the domain has been mapped to more than one element from the codomain (\(a\) and \(c\)). Note that either one of these problems is enough to make a rule not a function. In general, neither of the following mappings are functions:[🔗](#sec_structures-functions-3-17-2-2) ![Three black dots in a row above and two white dots in a row below. An arrow points from the left black dot to the left white dot and from the right black dot to the right white dot.](generated/latex-image/not-function-a.svg) ![Three black dots in a row above and four white dots in a row below. Two arrows point from the left black dot to each of the two left-most white dots. Each of the other black dots have an arrow pointing down to the white dots below and slightly to the right of them.](generated/latex-image/not-function-b.svg) It might also be helpful to think about how you would write the two-line notation for \(h\text{.}\) We would have something like: \begin{equation*} h=\twoline{1 \amp 2 \amp 3 \amp 4}{\amp a,c? \amp d \amp b}\text{.} \end{equation*} There is nothing under 1 (bad), and we needed to put more than one thing under 2 (very bad). With a rule that is actually a function, the two-line notation will always “work.” [🔗](#sec_structures-functions-3-17-2-4) [🔗](#sec_structures-functions-3-17-2) [🔗](#sec_structures-functions-3-17)We will also be interested in functions with domain \(\N\text{.}\) Here two-line notation is no good, but describing the function algebraically is often possible. Even tables are a little awkward since they do not describe the function completely. For example, consider the function \(f:\N \to \N\) given by the table below.[🔗](#sec_structures-functions-3-18)

| \(x\) | 0 | 1 | 2 | 3 | 4 | 5 | \(\ldots\) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| \(f(x)\) | 0 | 1 | 4 | 9 | 16 | 25 | \(\ldots\) |

Have I given you enough entries for you to be able to determine \(f(6)\text{?}\) You might guess that \(f(6) = 36\text{,}\) but there is no way for you to *know* this for sure. Maybe I am being a jerk and intended \(f(6) = 42\text{.}\) In fact, for every natural number \(n\text{,}\) there is a function that agrees with the table above, but for which \(f(6) = n\text{.}\)[🔗](#sec_structures-functions-3-20) Okay, suppose I really did mean for \(f(6) = 36\text{,}\) and in fact, for the rule that you think is governing the function to actually be the rule. Then I should say what that rule is. \(f(n) = n^2\text{.}\) Now there is no confusion possible.[🔗](#sec_structures-functions-3-21) Giving an explicit formula that calculates the image of any element in the domain is a great way to describe a function. We will say that these explicit rules are closed formulas for the function. [🔗](#sec_structures-functions-3-22) There is another very useful way to describe functions whose domain is \(\N\text{,}\) that rely specifically on the structure of the natural numbers. We can define a function *recursively*![🔗](#sec_structures-functions-3-23)

#### Example 5.2.4.

Consider the function \(f:\N \to \N\) given by \(f(0) = 0\) and \(f(n+1) = f(n) + 2n+1\text{.}\) Find \(f(6)\text{.}\)[🔗](#sec_structures-functions-3-24-1-1) Solution. The rule says that \(f(6) = f(5) + 11\) (we are using \(6 = n+1\) so \(n = 5\)). We don’t know what \(f(5)\) is though. Well, we know that \(f(5) = f(4) + 9\text{.}\) So we need to compute \(f(4)\text{,}\) which will require knowing \(f(3)\text{,}\) which will require knowing\(f(2)\text{,}\)… will it ever end?[🔗](#sec_structures-functions-3-24-2-1) Yes! This process will always end because we have \(\N\) as our domain, so there is a least element. And we gave the value of \(f(0)\) explicitly, so we are good. We might decide to work up to \(f(6)\) instead of working down from \(f(6)\text{:}\) \begin{align*} f(1) = \amp f(0) + 1 = \amp 0 + 1 = 1\\ f(2) = \amp f(1) + 3 = \amp 1 + 3 = 4\\ f(3) = \amp f(2) + 5 = \amp 4 + 5 = 9\\ f(4) = \amp f(3) + 7 = \amp 9 + 7 = 16\\ f(5) = \amp f(4) + 9 = \amp 16 + 9 = 25\\ f(6) = \amp f(5) + 11 = \amp 25 + 11 = 36 \end{align*} [🔗](#sec_structures-functions-3-24-2-2) It looks like this recursively defined function is the same as the explicitly defined function \(f(n) = n^2\text{.}\) Is it? Later we will prove that it is.[🔗](#sec_structures-functions-3-24-2-3) [🔗](#sec_structures-functions-3-24-2) [🔗](#sec_structures-functions-3-24)Recursively defined functions are often easier to create from a “real-world” problem, because they describe how the values of the functions are changing. However, this comes with a price. It is harder to calculate the image of a single input, since you need to know the images of other (previous) elements in the domain.[🔗](#sec_structures-functions-3-25)

#### Recursively Defined Functions.

For a function \(f:\N \to \N\text{,}\) a recursive definition consists of an initial condition together with a recurrence relation. The initial condition is the explicitly given value of \(f(0)\text{.}\) The recurrence relation is a formula for \(f(n+1)\) in terms of \(f(n)\) (and possibly \(n\) itself).[🔗](#sec_structures-functions-3-26-3) [🔗](#sec_structures-functions-3-26)

#### Example 5.2.5.

Give recursive definitions for the functions described below.

1. \(f:\N \to \N\) gives the number of snails in your terrarium \(n\) years after you built it, assuming you started with 3 snails and the number of snails doubles each year.[🔗](#sec_structures-functions-3-27-1-1-1-1-1) [🔗](#sec_structures-functions-3-27-1-1-1-1)
2. \(g:\N \to \N\) gives the number of push-ups you do \(n\) days after you started your push-ups challenge, assuming you could do 7 push-ups on day 0 and you can do 2 more push-ups each day.[🔗](#sec_structures-functions-3-27-1-1-1-2-1) [🔗](#sec_structures-functions-3-27-1-1-1-2)
3. \(h:\N \to \N\) defined by \(h(n) = n!\text{.}\) Recall that \(n! = 1 \cdot 2 \cdot 3 \cdot \cdots \cdot (n-1)\cdot n\) is the product of all numbers from \(1\) through \(n\text{.}\) We also define \(0! = 1\text{.}\)[🔗](#sec_structures-functions-3-27-1-1-1-3-1) [🔗](#sec_structures-functions-3-27-1-1-1-3)

[🔗](#sec_structures-functions-3-27-1-1) Solution.

1. The initial condition is \(f(0) = 3\text{.}\) To get \(f(n+1)\text{,}\) we would double the number of snails in the terrarium the previous year, which is given by \(f(n)\text{.}\) Thus \(f(n+1) = 2f(n)\text{.}\) The full recursive definition contains both of these and would be written, \begin{equation*} f(0) = 3;~ f(n+1) = 2f(n)\text{.} \end{equation*} [🔗](#sec_structures-functions-3-27-2-1-1-1-1) [🔗](#sec_structures-functions-3-27-2-1-1-1)
2. We are told that on day 0 you can do 7 push-ups, so \(g(0) = 7\text{.}\) The number of push-ups you can do on day \(n+1\) is 2 more than the number you can do on day \(n\text{,}\) which is given by \(g(n)\text{.}\) Thus \begin{equation*} g(0) = 7;~ g(n+1) = g(n) + 2\text{.} \end{equation*} [🔗](#sec_structures-functions-3-27-2-1-1-2-1) [🔗](#sec_structures-functions-3-27-2-1-1-2)
3. Here \(h(0) = 1\text{.}\) To get the recurrence relation, think about how you can get \(h(n+1) = (n+1)!\) from \(h(n) = n!\text{.}\) If you write out both of these as products, you see that \((n+1)!\) is just like \(n!\) except that you have one more term in the product, an extra \(n+1\text{.}\) So we have, \begin{equation*} h(0) = 1;~ h(n+1) = (n+1)\cdot h(n)\text{.} \end{equation*} [🔗](#sec_structures-functions-3-27-2-1-1-3-1) [🔗](#sec_structures-functions-3-27-2-1-1-3)

[🔗](#sec_structures-functions-3-27-2-1) [🔗](#sec_structures-functions-3-27-2) [🔗](#sec_structures-functions-3-27)[🔗](#sec_structures-functions-3)

### Subsection Surjections, Injections, and Bijections

We now turn to investigating special properties functions might or might not possess.[🔗](#subsec_surj-inj-bij-5) In the examples above, you may have noticed that sometimes there are elements of the codomain that are not in the range. When this sort of thing *does not* happen (that is, when everything in the codomain is in the range), we say the function is onto or that the function maps the domain *onto* the codomain. This terminology should make sense: The function puts the domain (entirely) on top of the codomain. The fancy math term for an onto function is a surjection, and we say that an onto function is a surjective function.[🔗](#subsec_surj-inj-bij-6) In pictures:[🔗](#subsec_surj-inj-bij-7) ! !

#### Example 5.2.6.

Which functions are surjective (i.e., onto)?

1. \(f:\Z \to \Z\) defined by \(f(n) = 3n\text{.}\) [🔗](#subsec_surj-inj-bij-9-1-1-1-1)
2. \(g: \{1,2,3\} \to \{a,b,c\}\) defined by \(g = \begin{pmatrix}1 \amp 2 \amp 3 \\ c \amp a \amp a \end{pmatrix}\text{.}\) [🔗](#subsec_surj-inj-bij-9-1-1-1-2)
3. \(h:\{1,2,3\} \to \{1,2,3\}\) defined as follows:[🔗](#subsec_surj-inj-bij-9-1-1-1-3-1) ![Two rows containing the numbers 1, 2, and 3, from left to right. Arrows from the top 1 to bottom 2, from the top 2 to bottom 1, and top 3 straight down to bottom 3.](generated/latex-image/ex-surj-q.svg) [🔗](#subsec_surj-inj-bij-9-1-1-1-3)

[🔗](#subsec_surj-inj-bij-9-1-1) Solution.

1. \(f\) is not surjective. There are elements in the codomain that are not in the range. For example, no \(n \in \Z\) gets mapped to the number 1 (the rule would say that \(\frac{1}{3}\) would be sent to 1, but \(\frac{1}{3}\) is not in the domain). In fact, the range of the function is \(3\Z\) (the integer multiples of 3), which is not equal to \(\Z\text{.}\) [🔗](#subsec_surj-inj-bij-9-2-1-1-1)
2. \(g\) is not surjective. There is no \(x \in \{1,2,3\}\) (the domain) for which \(g(x) = b\text{,}\) so \(b\text{,}\) which is in the codomain, is not in the range. Notice that there is an element from the codomain “missing” from the bottom row of the matrix. [🔗](#subsec_surj-inj-bij-9-2-1-1-2)
3. \(h\) is surjective. Every element of the codomain is also in the range. Nothing in the codomain is missed. [🔗](#subsec_surj-inj-bij-9-2-1-1-3)

[🔗](#subsec_surj-inj-bij-9-2-1) [🔗](#subsec_surj-inj-bij-9-2) [🔗](#subsec_surj-inj-bij-9)To be a function, a rule cannot assign a single element of the domain to two or more different elements of the codomain. However, we have seen that the reverse *is* permissible: A function might assign the same element of the codomain to two or more different elements of the domain. When this *does not* occur (that is, when each element of the codomain is the image of at most one element of the domain), then we say the function is one-to-one. Again, this terminology makes sense: We are sending at most one element from the domain to one element from the codomain. One input to one output. The fancy math term for a one-to-one function is an injection. We call one-to-one functions injective functions.[🔗](#subsec_surj-inj-bij-10) In pictures:[🔗](#subsec_surj-inj-bij-11) ! !

#### Example 5.2.7.

Which functions are injective (i.e., one-to-one)?

1. \(f:\Z \to \Z\) defined by \(f(n) = 3n\text{.}\) [🔗](#subsec_surj-inj-bij-13-1-1-1-1)
2. \(g: \{1,2,3\} \to \{a,b,c\}\) defined by \(g = \begin{pmatrix}1 \amp 2 \amp 3 \\ c \amp a \amp a \end{pmatrix}\text{.}\) [🔗](#subsec_surj-inj-bij-13-1-1-1-2)
3. \(h:\{1,2,3\} \to \{1,2,3\}\) defined as follows:[🔗](#subsec_surj-inj-bij-13-1-1-1-3-1) ![Two rows containing the numbers 1, 2, and 3, from left to right. Arrows from the top 1 to bottom 2, from the top 2 to bottom 1, and top 3 straight down to bottom 3.](generated/latex-image/img-function-eg.svg) [🔗](#subsec_surj-inj-bij-13-1-1-1-3)

[🔗](#subsec_surj-inj-bij-13-1-1) Solution.

1. \(f\) is injective. Each element in the codomain is assigned to at *most* one element from the domain. If \(x\) is a multiple of three, then only \(x/3\) is mapped to \(x\text{.}\) If \(x\) is not a multiple of 3, then there is no input corresponding to the output \(x\text{.}\) [🔗](#subsec_surj-inj-bij-13-2-1-1-1)
2. \(g\) is not injective. Both inputs \(2\) and \(3\) are assigned the output \(a\text{.}\) Notice that there is an element from the codomain that appears more than once on the bottom row of the matrix. [🔗](#subsec_surj-inj-bij-13-2-1-1-2)
3. \(h\) is injective. Each output is only an output once. [🔗](#subsec_surj-inj-bij-13-2-1-1-3)

[🔗](#subsec_surj-inj-bij-13-2-1) [🔗](#subsec_surj-inj-bij-13-2) [🔗](#subsec_surj-inj-bij-13)Be careful: “surjective” and “injective” are NOT opposites. You can see in the two examples above that there are functions that are surjective but not injective, injective but not surjective, both, or neither. In the case when a function is both one-to-one and onto (an injection and surjection), we say the function is a bijection, or that the function is a bijective function.[🔗](#subsec_surj-inj-bij-14) To illustrate the contrast between these two properties, consider a more formal definition of each, side by side.[🔗](#subsec_surj-inj-bij-15)

#### Injective vs. Surjective.

A function is injective provided every element of the codomain is the image of *at most* one element from the domain.[🔗](#subsec_surj-inj-bij-16-2) A function is surjective provided every element of the codomain is the image of *at least* one element from the domain.[🔗](#subsec_surj-inj-bij-16-3) [🔗](#subsec_surj-inj-bij-16)Notice both properties are determined by what happens to elements of the codomain: They could be repeated as images, or they could be “missed” (not be images). Injective functions do not have repeats but might or might not miss elements. Surjective functions do not miss elements, but might or might not have repeats. The bijective functions are those that do not have repeats and do not miss elements.[🔗](#subsec_surj-inj-bij-17) [🔗](#subsec_surj-inj-bij)

### Subsection Image and Inverse Image

When discussing functions, we have notation for talking about an element of the domain (say \(x\)) and its corresponding element in the codomain (we write \(f(x)\text{,}\) which *is* the image of \(x\)). Sometimes we will want to talk about all the elements that are images of some subset of the domain. It would also be nice to start with some element of the codomain (say \(y\)) and talk about which element or elements (if any) from the domain it is the image of. We could write “those \(x\) in the domain such that \(f(x) = y\text{,}\)” but this is a lot of writing. Here is some notation to make our lives easier.[🔗](#sec_structures-functions-5-4) To address the first situation, what we are after is a way to describe the *set* of images of elements in some subset of the domain. Suppose \(f:X \to Y\) is a function and that \(A \subseteq X\) is some subset of the domain (possibly all of it). We will use the notation \(f(A)\) to denote the image of \(A\) under \(f\), namely the set of elements in \(Y\) that are the image of elements from \(A\text{.}\) That is, \(f(A) = \{f(a) \in Y \st a \in A\}\text{.}\) [🔗](#sec_structures-functions-5-5) We can do this in the other direction as well. We might ask which elements of the domain get mapped to a particular set in the codomain. Let \(f:X \to Y\) be a function and suppose \(B \subseteq Y\) is a subset of the codomain. Then we will write \(f\inv(B)\) for the inverse image of \(B\) under \(f\), namely the set of elements in \(X\) whose image are elements in \(B\text{.}\) In other words, \(f\inv(B) = \{x \in X \st f(x) \in B\}\) . [🔗](#sec_structures-functions-5-6) Often we are interested in the element(s) whose image is a particular element \(y\) of in the codomain. The notation above works: \(f\inv(\{y\})\) is the set of all elements in the domain that \(f\) sends to \(y\text{.}\) It makes sense to think of this as a set: there might not be anything sent to \(y\) (if \(y\) is not in the range), in which case \(f\inv(\{y\}) = \emptyset\text{.}\) Or \(f\) might send multiple elements to \(y\) (if \(f\) is not injective). As a notational convenience, we usually drop the set braces around the \(y\) and write \(f\inv(y)\) instead for this set.[🔗](#sec_structures-functions-5-7) WARNING: \(f\inv(y)\) is not an inverse function! Inverse functions only exist for bijections, but \(f\inv(y)\) is defined for any function \(f\text{.}\) The point: \(f\inv(y)\) is a *set*, not an *element* of the domain. This is just sloppy notation for \(f\inv(\{y\})\text{.}\) To help make this distinction, we would call \(f\inv(y)\) the complete inverse image of \(y\) under \(f\). It is not the image of \(y\) under \(f\inv\) (since the function \(f\inv\) might not exist).[🔗](#sec_structures-functions-5-8)

#### Example 5.2.8.

Consider the function \(f:\{1,2,3,4,5,6\} \to \{a,b,c,d\}\) given by \begin{equation*} f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \amp 5 \amp 6 \\ a \amp a \amp b \amp b \amp b \amp c\end{pmatrix}\text{.} \end{equation*} Find \(f(\{1,2,3\})\text{,}\) \(f\inv(\{a,b\})\text{,}\) and \(f\inv(d)\text{.}\) [🔗](#sec_structures-functions-5-9-1-1) Solution. \(f(\{1,2,3\}) = \{a,b\}\) since \(a\) and \(b\) are the elements in the codomain to which \(f\) sends \(1\text{,}\) \(2\text{,}\) and \(3\text{.}\)[🔗](#sec_structures-functions-5-9-2-1) \(f\inv(\{a,b\}) = \{1,2,3,4,5\}\) since these are exactly the elements that \(f\) sends to \(a\) and \(b\text{.}\)[🔗](#sec_structures-functions-5-9-2-2) \(f\inv(d) = \emptyset\) since \(d\) is not in the range of \(f\text{.}\)[🔗](#sec_structures-functions-5-9-2-3) [🔗](#sec_structures-functions-5-9-2) [🔗](#sec_structures-functions-5-9)

#### Example 5.2.9.

Consider the function \(g:\Z \to \Z\) defined by \(g(n) = n^2 + 1\text{.}\) Find \(g(1)\) and \(g(\{1\})\text{.}\) Then find \(g\inv(1)\text{,}\) \(g\inv(2)\text{,}\) and \(g\inv(3)\text{.}\)[🔗](#sec_structures-functions-5-10-1-1) Solution. Note that \(g(1) \ne g(\{1\})\text{.}\) The first is an element: \(g(1) = 2\text{.}\) The second is a set: \(g(\{1\}) = \{2\}\) .[🔗](#sec_structures-functions-5-10-2-1) To find \(g\inv(1)\text{,}\) we need to find all integers \(n\) such that \(n^2 + 1 = 1\text{.}\) Clearly only 0 works, so \(g\inv(1) = \{0\}\) (note that even though there is only one element, we still write it as a set with one element in it).[🔗](#sec_structures-functions-5-10-2-2) To find \(g\inv(2)\text{,}\) we need to find all \(n\) such that \(n^2 + 1 = 2\text{.}\) We see \(g\inv(2) = \{-1,1\}\text{.}\)[🔗](#sec_structures-functions-5-10-2-3) Finally, if \(n^2 + 1 = 3\text{,}\) then we are looking for an \(n\) such that \(n^2 = 2\text{.}\) There are no such integers so \(g\inv(3) = \emptyset\text{.}\)[🔗](#sec_structures-functions-5-10-2-4) [🔗](#sec_structures-functions-5-10-2) [🔗](#sec_structures-functions-5-10)Since \(f\inv(y)\) is a set, it makes sense to ask for \(\card{f\inv(y)}\text{,}\) the number of elements in the domain that map to \(y\text{.}\)[🔗](#sec_structures-functions-5-11)

#### Example 5.2.10.

Find a function \(f:\{1,2,3,4,5\} \to \N\) such that \(\card{f\inv(7)} = 5\text{.}\)[🔗](#sec_structures-functions-5-12-1-1) Solution. There is only one such function. We need five elements of the domain to map to the number \(7 \in \N\text{.}\) Since there are only five elements in the domain, all of them must map to 7. So \begin{equation*} f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \amp 5 \\ 7 \amp 7 \amp 7 \amp 7 \amp 7\end{pmatrix} \end{equation*} . [🔗](#sec_structures-functions-5-12-2-1) [🔗](#sec_structures-functions-5-12-2) [🔗](#sec_structures-functions-5-12)

#### Function Definitions.

Here is a summary of all the main concepts and definitions we use when working with functions.

- A function is a rule that assigns each element of a set, called the domain, to exactly one element of a second set, called the codomain.[🔗](#sec_structures-functions-5-13-2-1-1-1) [🔗](#sec_structures-functions-5-13-2-1-1)
- Notation: \(f:X \to Y\) is our way of saying that the function is called \(f\text{,}\) the domain is the set \(X\text{,}\) and the codomain is the set \(Y\text{.}\)[🔗](#sec_structures-functions-5-13-2-1-2-1) [🔗](#sec_structures-functions-5-13-2-1-2)
- To specify the rule for a function with small domain, use two-line notation by writing a matrix with each output directly below its corresponding input, as in: \begin{equation*} f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \\ 2 \amp 1 \amp 3 \amp 1 \end{pmatrix} \end{equation*} . [🔗](#sec_structures-functions-5-13-2-1-3-1) [🔗](#sec_structures-functions-5-13-2-1-3)
- \(f(x) = y\) means the element \(x\) of the domain (input) is assigned to the element \(y\) of the codomain. We say \(y\) is an output. Alternatively, we call \(y\) the image of \(x\) under \(f\) .[🔗](#sec_structures-functions-5-13-2-1-4-1) [🔗](#sec_structures-functions-5-13-2-1-4)
- The range is a subset of the codomain. It is the set of all elements that are assigned to at least one element of the domain by the function. That is, the range is the set of all outputs.[🔗](#sec_structures-functions-5-13-2-1-5-1) [🔗](#sec_structures-functions-5-13-2-1-5)
- A function is injective (an injection or one-to-one) if every element of the codomain is the image of at most one element from the domain.[🔗](#sec_structures-functions-5-13-2-1-6-1) [🔗](#sec_structures-functions-5-13-2-1-6)
- A function is surjective (a surjection or onto) if every element of the codomain is the image of at least one element from the domain.[🔗](#sec_structures-functions-5-13-2-1-7-1) [🔗](#sec_structures-functions-5-13-2-1-7)
- A bijection is a function that is both an injection and surjection. In other words, if every element of the codomain is the image of exactly one element from the domain.[🔗](#sec_structures-functions-5-13-2-1-8-1) [🔗](#sec_structures-functions-5-13-2-1-8)
- The image of an element \(x\) in the domain is the element \(y\) in the codomain that \(x\) is mapped to. That is, the image of \(x\) under \(f\) is \(f(x)\text{.}\)[🔗](#sec_structures-functions-5-13-2-1-9-1) [🔗](#sec_structures-functions-5-13-2-1-9)
- The complete inverse image of an element \(y\) in the codomain, written \(f\inv(y)\text{,}\) is the *set* of all elements in the domain that are assigned to \(y\) by the function.[🔗](#sec_structures-functions-5-13-2-1-10-1) [🔗](#sec_structures-functions-5-13-2-1-10)
- The image of a subset \(A\) of the domain is the set \(f(A) = \{f(a) \in Y \st a \in A\}\text{.}\)[🔗](#sec_structures-functions-5-13-2-1-11-1) [🔗](#sec_structures-functions-5-13-2-1-11)
- The inverse image of a subset \(B\) of the codomain is the set \(f\inv(B) = \{x \in X \st f(x) \in B\}\text{.}\)[🔗](#sec_structures-functions-5-13-2-1-12-1) [🔗](#sec_structures-functions-5-13-2-1-12)

[🔗](#sec_structures-functions-5-13-2) [🔗](#sec_structures-functions-5-13)

#### Reading Questions Reading Questions

#### 1.

Explain, in your own words, the relationship between the codomain of a function and the range of a function.[🔗](#rq-intro-functions-codom-range-1-1) [🔗](#rq-intro-functions-codom-range)

#### 2.

If a function has domain and codomain of equal sizes, must the function be *surjective*? Must it be *injective*? Could it be only one of these? Briefly explain your thinking.[🔗](#rq-intro-functions-equal-sizes-1-1) [🔗](#rq-intro-functions-equal-sizes)

#### 3.

What questions do you have? Write at least one question about the content of this section that you or a classmate might be curious about after reading this section.[🔗](#rq-intro-functions-q-1-1) [🔗](#rq-intro-functions-q)[🔗](#rqs-intro-functions)[🔗](#sec_structures-functions-5)

### Exercises Exercises

#### 1.

Activate Consider the function \(f:\{1,2,3,4,5\} \to \{1,2,3,4,5\}\) given by[🔗](#extracted-webwork-235-1-1-1) \(\displaystyle{f = \begin{pmatrix} 1 \amp 2 \amp 3 \amp 4 \amp 5 \\ 5 \amp 3 \amp 3 \amp 4 \amp 2 \end{pmatrix}.}\)[🔗](#extracted-webwork-235-1-1-2)

1. Find \(f(5)\text{.}\) [🔗](#extracted-webwork-235-1-1-3-1-1-1) [🔗](#extracted-webwork-235-1-1-3-1-1)
2. Find a \(n\) in the domain such that \(f(n) = 5\text{.}\) [🔗](#extracted-webwork-235-1-1-3-1-2-1) [🔗](#extracted-webwork-235-1-1-3-1-2)
3. Find an element \(n\) of the domain such that \(f(n) = n\text{.}\) [🔗](#extracted-webwork-235-1-1-3-1-3-1) [🔗](#extracted-webwork-235-1-1-3-1-3)
4. Find an element of the codomain that is not in the range. [🔗](#extracted-webwork-235-1-1-3-1-4-1) [🔗](#extracted-webwork-235-1-1-3-1-4)

[🔗](#extracted-webwork-235-1-1-3) [🔗](#ww-functions-two-line)

#### 2.

Activate The following functions all have \(\lbrace 1,2,3,4,5\rbrace\) as both their domain and codomain. For each, determine whether it is (only) injective, (only) surjective, bijective, or neither injective nor surjective.[🔗](#extracted-webwork-236-1-1-1)

1. \(\displaystyle f(x) = \begin{cases} x + 2 \amp \text{ if } x \lt 4 \\ x \amp \text{ if } x \ge 4 \end{cases}\)[🔗](#extracted-webwork-236-1-1-2-1-1-1) [🔗](#extracted-webwork-236-1-1-2-1-1)
2. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \amp 5 \\ 3 \amp 3 \amp 1 \amp 3 \amp 1\end{pmatrix}\)[🔗](#extracted-webwork-236-1-1-2-1-2-1) [🔗](#extracted-webwork-236-1-1-2-1-2)
3. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \amp 5 \\ 2 \amp 3 \amp 4 \amp 5 \amp 1\end{pmatrix}\)[🔗](#extracted-webwork-236-1-1-2-1-3-1) [🔗](#extracted-webwork-236-1-1-2-1-3)
4. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \amp 5 \\ 5 \amp 4 \amp 3 \amp 2 \amp 1\end{pmatrix}\)[🔗](#extracted-webwork-236-1-1-2-1-4-1) [🔗](#extracted-webwork-236-1-1-2-1-4)

[🔗](#extracted-webwork-236-1-1-2) Hint. Since the domain and codomain are the same size, is it possible for a function to be injective but not surjective, or surjective but not injective?[🔗](#extracted-webwork-236-1-2-1) [🔗](#extracted-webwork-236-1-2) [🔗](#ww-functions-inj-surj1)

#### 3.

Activate Consider the following functions \(f: \lbrace 1,2,3,4,5\rbrace \to \lbrace 1,2,3\rbrace\text{.}\) For each, determine whether it is (only) injective, (only) surjective, bijective, or neither injective nor surjective.[🔗](#extracted-webwork-237-1-1-1)

1. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \amp 5 \\ 2 \amp 2 \amp 3 \amp 3 \amp 2\end{pmatrix}\)[🔗](#extracted-webwork-237-1-1-2-1-1-1) [🔗](#extracted-webwork-237-1-1-2-1-1)
2. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \amp 5 \\ 2 \amp 1 \amp 2 \amp 1 \amp 2\end{pmatrix}\)[🔗](#extracted-webwork-237-1-1-2-1-2-1) [🔗](#extracted-webwork-237-1-1-2-1-2)
3. \(\displaystyle f(x) = \begin{cases} 4-x \amp \text{ if } x \le 3 \\ x-3 \amp \text{ if } x > 3 \end{cases}\)[🔗](#extracted-webwork-237-1-1-2-1-3-1) [🔗](#extracted-webwork-237-1-1-2-1-3)

[🔗](#extracted-webwork-237-1-1-2) [🔗](#ww-functions-inj-surj2)

#### 4.

Activate Consider the following functions \(f: \lbrace 1,2,3,4\rbrace \to \lbrace 1,2,3,4,5\rbrace\text{.}\) For each, determine whether it is (only) injective, (only) surjective, bijective, or neither injective nor surjective.[🔗](#extracted-webwork-238-1-1-1)

1. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \\ 2 \amp 2 \amp 1 \amp 4\end{pmatrix}\)[🔗](#extracted-webwork-238-1-1-2-1-1-1) [🔗](#extracted-webwork-238-1-1-2-1-1)
2. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \\ 4 \amp 3 \amp 2 \amp 1\end{pmatrix}\)[🔗](#extracted-webwork-238-1-1-2-1-2-1) [🔗](#extracted-webwork-238-1-1-2-1-2)
3. \(\displaystyle f = \begin{pmatrix}1 \amp 2 \amp 3 \amp 4 \\ 2 \amp 3 \amp 4 \amp 5\end{pmatrix}\)[🔗](#extracted-webwork-238-1-1-2-1-3-1) [🔗](#extracted-webwork-238-1-1-2-1-3)

[🔗](#extracted-webwork-238-1-1-2) [🔗](#ww-functions-inj-surj3)

#### 5.

Activate Write out all functions \(f: \{1,2,3,4\} \to \{a,b\}\) (using two-line notation).[🔗](#extracted-webwork-239-1-1-1) How many functions are there?[🔗](#extracted-webwork-239-1-1-2) How many are surjective?[🔗](#extracted-webwork-239-1-1-3) How many are injective?[🔗](#extracted-webwork-239-1-1-4) How many are bijective?[🔗](#extracted-webwork-239-1-1-5) [🔗](#ww-functions-count-inj-surj1)

#### 6.

Activate Write out all function \(f: \{1,2\} \to \{a,b,c,d\}\) (in two-line notation).[🔗](#extracted-webwork-240-1-1-1) How many functions are there?[🔗](#extracted-webwork-240-1-1-2) How many are surjective?[🔗](#extracted-webwork-240-1-1-3) How many are injective?[🔗](#extracted-webwork-240-1-1-4) How many are bijective?[🔗](#extracted-webwork-240-1-1-5) [🔗](#ww-functions-count-inj-surj2)

#### 7.

Consider the function \(f:\{1,2,3,4,5\} \to \{1,2,3,4\}\) given by the table below:[🔗](#exercises_intro-functions-7-1-1)

| \(x\) | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| \(f(x)\) | 3 | 2 | 4 | 1 | 2 |

1. Is \(f\) injective? Explain.[🔗](#exercises_intro-functions-7-1-3-1-1-1) [🔗](#exercises_intro-functions-7-1-3-1-1)
2. Is \(f\) surjective? Explain.[🔗](#exercises_intro-functions-7-1-3-1-2-1) [🔗](#exercises_intro-functions-7-1-3-1-2)
3. Write the function using two-line notation.[🔗](#exercises_intro-functions-7-1-3-1-3-1) [🔗](#exercises_intro-functions-7-1-3-1-3)

[🔗](#exercises_intro-functions-7-1-3) [🔗](#exercises_intro-functions-7)

#### 8.

Consider the function \(f:\{1,2,3,4\} \to \{1,2,3,4\}\) given by the graph below.[🔗](#exercises_intro-functions-8-1-1) !

1. Is \(f\) injective? Explain.[🔗](#exercises_intro-functions-8-1-3-1-1-1) [🔗](#exercises_intro-functions-8-1-3-1-1)
2. Is \(f\) surjective? Explain.[🔗](#exercises_intro-functions-8-1-3-1-2-1) [🔗](#exercises_intro-functions-8-1-3-1-2)
3. Write the function using two-line notation.[🔗](#exercises_intro-functions-8-1-3-1-3-1) [🔗](#exercises_intro-functions-8-1-3-1-3)

[🔗](#exercises_intro-functions-8-1-3) [🔗](#exercises_intro-functions-8)

#### 9.

Activate Consider the function \(f:\N \to \N\) given *recursively* by[🔗](#extracted-webwork-241-1-1-1) \begin{equation*} f(0) = 1 \text{ and } f(n+1) = 4 \cdot f(n) \text{.} \end{equation*} [🔗](#extracted-webwork-241-1-1-2) Find \(f(14)\text{.}\)[🔗](#extracted-webwork-241-1-1-3) [🔗](#ww-functions-rec-quick)

#### 10.

Activate Suppose \(f:\N \to \N\) satisfies the recurrence[🔗](#extracted-webwork-242-1-1-1) \begin{equation*} f(n+1) = f(n) + 8\text{.} \end{equation*} [🔗](#extracted-webwork-242-1-1-2) Note that this is not enough information to define the function, since we don’t have an initial condition. For each of the initial conditions below, find the value of \(f(8)\text{.}\)

1. If \(f(0) = 1\text{.}\)[🔗](#extracted-webwork-242-1-1-3-3-1-1) [🔗](#extracted-webwork-242-1-1-3-3-1)
2. \(\displaystyle f(0) = 7\text{.}\)[🔗](#extracted-webwork-242-1-1-3-3-2-1) [🔗](#extracted-webwork-242-1-1-3-3-2)
3. \(\displaystyle f(0) = 11\text{.}\)[🔗](#extracted-webwork-242-1-1-3-3-3-1) [🔗](#extracted-webwork-242-1-1-3-3-3)
4. \(\displaystyle f(0) = 226\text{.}\)[🔗](#extracted-webwork-242-1-1-3-3-4-1) [🔗](#extracted-webwork-242-1-1-3-3-4)

[🔗](#extracted-webwork-242-1-1-3) [🔗](#ww-functions-rec-ic)

#### 11.

Suppose \(f:\N \to \N\) satisfies the recurrence relation \begin{equation*} f(n+1) = \begin{cases} \frac{f(n)}{2} \amp \text{ if } f(n) \text{ is even} \\ 3f(n) + 1 \amp \text{ if } f(n) \text{ is odd}\text{.}\end{cases} \end{equation*} Note that with the initial condition \(f(0) = 1\text{,}\) the values of the function are: \(f(1) = 4\) , \(f(2) = 2\text{,}\) \(f(3) = 1\text{,}\) \(f(4) = 4\text{,}\) and so on, the images cycling through those three numbers. Thus \(f\) is NOT injective (and also certainly not surjective). Might it be under other initial conditions? 1 It turns out this is a *really* hard question to answer in general. The *Collatz conjecture* is that no matter what the initial condition is, the function will eventually produce 1 as an output. This is an open problem in mathematics: nobody knows the answer.

1. If \(f\) satisfies the initial condition \(f(0) = 5\text{,}\) is \(f\) injective? Explain why or give a specific example of two elements from the domain with the same image.[🔗](#exercises_intro-functions-11-1-1-10-1-1) [🔗](#exercises_intro-functions-11-1-1-10-1)
2. If \(f\) satisfies the initial condition \(f(0) = 3\text{,}\) is \(f\) injective? Explain why or give a specific example of two elements from the domain with the same image.[🔗](#exercises_intro-functions-11-1-1-10-2-1) [🔗](#exercises_intro-functions-11-1-1-10-2)
3. If \(f\) satisfies the initial condition \(f(0) = 27\text{,}\) then it turns out that \(f(105) = 10\) and no two numbers less than 105 have the same image. Could \(f\) be injective? Explain.[🔗](#exercises_intro-functions-11-1-1-10-3-1) [🔗](#exercises_intro-functions-11-1-1-10-3)
4. Prove that no matter what initial condition you choose, the function cannot be surjective.[🔗](#exercises_intro-functions-11-1-1-10-4-1) [🔗](#exercises_intro-functions-11-1-1-10-4)

[🔗](#exercises_intro-functions-11-1-1) [🔗](#exercises_intro-functions-11)

#### 12.

For each function given below, determine whether or not the function is injective and whether or not the function is surjective.

1. \(f:\N \to \N\) given by \(f(n) = n+4\text{.}\) [🔗](#exercises_intro-functions-12-1-1-1-1)
2. \(f:\Z \to \Z\) given by \(f(n) = n+4\text{.}\) [🔗](#exercises_intro-functions-12-1-1-1-2)
3. \(f:\Z \to \Z\) given by \(f(n) = 5n - 8\text{.}\) [🔗](#exercises_intro-functions-12-1-1-1-3)
4. \(f:\Z \to \Z\) given by \(f(n) = \begin{cases}n/2 \amp \text{ if } n \text{ is even} \\ (n+1)/2 \amp \text{ if } n \text{ is odd} . \end{cases}\) [🔗](#exercises_intro-functions-12-1-1-1-4)

[🔗](#exercises_intro-functions-12-1-1) [🔗](#exercises_intro-functions-12)

#### 13.

Let \(A = \{1,2,3,\ldots,10\}\text{.}\) Consider the function \(f:\pow(A) \to \N\) given by \(f(B) = |B|\text{.}\) That is, \(f\) takes a subset of \(A\) as an input and outputs the cardinality of that set.

1. Is \(f\) injective? Prove your answer.[🔗](#exercises_intro-functions-13-1-1-6-1-1) [🔗](#exercises_intro-functions-13-1-1-6-1)
2. Is \(f\) surjective? Prove your answer.[🔗](#exercises_intro-functions-13-1-1-6-2-1) [🔗](#exercises_intro-functions-13-1-1-6-2)
3. Find \(f\inv(1)\text{.}\)[🔗](#exercises_intro-functions-13-1-1-6-3-1) [🔗](#exercises_intro-functions-13-1-1-6-3)
4. Find \(f\inv(0)\text{.}\)[🔗](#exercises_intro-functions-13-1-1-6-4-1) [🔗](#exercises_intro-functions-13-1-1-6-4)
5. Find \(f\inv(12)\text{.}\)[🔗](#exercises_intro-functions-13-1-1-6-5-1) [🔗](#exercises_intro-functions-13-1-1-6-5)

[🔗](#exercises_intro-functions-13-1-1) [🔗](#exercises_intro-functions-13)

#### 14.

Activate Let \(X = \{n \in \N \st 0 \le n \le 999\}\) be the set of all numbers with three or fewer digits. Define the function \(f:X \to \N\) by \(f(abc) = a+b+c\text{,}\) where \(a\text{,}\) \(b\text{,}\) and \(c\) are the digits of the number in \(X\) (write numbers less than 100 with leading 0’s to make them three digits). In other words, \(f\) returns the sum of the digits of its input. For example, \(f(253) = 2 + 5 + 3 = 10\text{.}\)[🔗](#extracted-webwork-243-1-1-1)

#### (a)

Let \(A = \{n \in X \st 309 \le x \le 326\}\text{.}\) Find \(f(A)\text{.}\)[🔗](#extracted-webwork-243-1-2-1-1) [🔗](#extracted-webwork-243-1-2)

#### (b)

Find \(f\inv(\{1,3\})\text{.}\)[🔗](#extracted-webwork-243-1-3-1-1) [🔗](#extracted-webwork-243-1-3)

#### (c)

Find \(f\inv(2)\text{.}\)[🔗](#extracted-webwork-243-1-4-1-1) [🔗](#extracted-webwork-243-1-4)

#### (d)

Find \(f\inv(200)\text{.}\)[🔗](#extracted-webwork-243-1-5-1-1) [🔗](#extracted-webwork-243-1-5) [🔗](#ww-functions-sum-of-digits)

#### 15.

Consider the set \(\N^2 = \N \times \N\text{,}\) the set of all ordered pairs \((a,b)\) where \(a\) and \(b\) are natural numbers. Consider a function \(f: \N^2 \to \N\) given by \(f((a,b)) =a+b\) .

1. Let \(A = \{(a,b) \in \N^2 \st a, b \le 10\}\text{.}\) Find \(f(A)\text{.}\)[🔗](#exercises_intro-functions-15-1-1-7-1-1) [🔗](#exercises_intro-functions-15-1-1-7-1)
2. Find \(f\inv(3)\) and \(f\inv(\{0,1,2,3\})\text{.}\)[🔗](#exercises_intro-functions-15-1-1-7-2-1) [🔗](#exercises_intro-functions-15-1-1-7-2)
3. Give geometric descriptions of \(f\inv(n)\) and \(f\inv(\{0, 1, \ldots, n\})\) for any \(n \ge 1\text{.}\)[🔗](#exercises_intro-functions-15-1-1-7-3-1) [🔗](#exercises_intro-functions-15-1-1-7-3)
4. Find \(\card{f\inv(8)}\) and \(\card{f\inv(\{0,1, \ldots, 8\})}\text{.}\)[🔗](#exercises_intro-functions-15-1-1-7-4-1) [🔗](#exercises_intro-functions-15-1-1-7-4)

[🔗](#exercises_intro-functions-15-1-1) [🔗](#exercises_intro-functions-15)

#### 16.

Let \(f:X \to Y\) be some function. Suppose \(3 \in Y\text{.}\) What can you say about \(f\inv(3)\) if you know,

1. \(f\) is injective? Explain.[🔗](#exercises_intro-functions-16-1-1-4-1-1) [🔗](#exercises_intro-functions-16-1-1-4-1)
2. \(f\) is surjective? Explain.[🔗](#exercises_intro-functions-16-1-1-4-2-1) [🔗](#exercises_intro-functions-16-1-1-4-2)
3. \(f\) is bijective? Explain.[🔗](#exercises_intro-functions-16-1-1-4-3-1) [🔗](#exercises_intro-functions-16-1-1-4-3)

[🔗](#exercises_intro-functions-16-1-1) [🔗](#exercises_intro-functions-16)

#### 17.

Find a set \(X\) and a function \(f:X \to \N\) so that \(f\inv(0) \cup f\inv(1) = X\text{.}\)[🔗](#exercises_intro-functions-17-1-1) [🔗](#exercises_intro-functions-17)

#### 18.

What can you deduce about the sets \(X\) and \(Y\) if you know,

1. there is an injective function \(f:X \to Y\text{?}\) Explain.[🔗](#exercises_intro-functions-18-1-1-3-1-1) [🔗](#exercises_intro-functions-18-1-1-3-1)
2. there is a surjective function \(f:X \to Y\text{?}\) Explain.[🔗](#exercises_intro-functions-18-1-1-3-2-1) [🔗](#exercises_intro-functions-18-1-1-3-2)
3. there is a bijective function \(f:X \to Y\text{?}\) Explain.[🔗](#exercises_intro-functions-18-1-1-3-3-1) [🔗](#exercises_intro-functions-18-1-1-3-3)

[🔗](#exercises_intro-functions-18-1-1) [🔗](#exercises_intro-functions-18)

#### 19.

Suppose \(f:X \to Y\) is a function. Which of the following are possible? Explain.

1. \(f\) is injective but not surjective. [🔗](#exercises_intro-functions-19-1-1-2-1)
2. \(f\) is surjective but not injective. [🔗](#exercises_intro-functions-19-1-1-2-2)
3. \(|X| = |Y|\) and \(f\) is injective but not surjective. [🔗](#exercises_intro-functions-19-1-1-2-3)
4. \(|X| = |Y|\) and \(f\) is surjective but not injective. [🔗](#exercises_intro-functions-19-1-1-2-4)
5. \(|X| = |Y|\text{,}\) \(X\) and \(Y\) are finite, and \(f\) is injective but not surjective. [🔗](#exercises_intro-functions-19-1-1-2-5)
6. \(|X| = |Y|\text{,}\) \(X\) and \(Y\) are finite, and \(f\) is surjective but not injective. [🔗](#exercises_intro-functions-19-1-1-2-6)

[🔗](#exercises_intro-functions-19-1-1) [🔗](#exercises_intro-functions-19)

#### 20.

Let \(f:X \to Y\) and \(g:Y \to Z\) be functions. We can define the composition of \(f\) and \(g\) to be the function \(g\circ f:X \to Z\) for which the image of each \(x \in X\) is \(g(f(x))\text{.}\) That is, plug \(x\) into \(f\text{,}\) then plug the result into \(g\) (just like composition in algebra and calculus).

1. If \(f\) and \(g\) are both injective, must \(g\circ f\) be injective? Explain.[🔗](#exercises_intro-functions-20-1-1-13-1-1) [🔗](#exercises_intro-functions-20-1-1-13-1)
2. If \(f\) and \(g\) are both surjective, must \(g\circ f\) be surjective? Explain.[🔗](#exercises_intro-functions-20-1-1-13-2-1) [🔗](#exercises_intro-functions-20-1-1-13-2)
3. Suppose \(g\circ f\) is injective. What, if anything, can you say about \(f\) and \(g\text{?}\) Explain.[🔗](#exercises_intro-functions-20-1-1-13-3-1) [🔗](#exercises_intro-functions-20-1-1-13-3)
4. Suppose \(g\circ f\) is surjective. What, if anything, can you say about \(f\) and \(g\text{?}\) Explain.[🔗](#exercises_intro-functions-20-1-1-13-4-1) [🔗](#exercises_intro-functions-20-1-1-13-4)

[🔗](#exercises_intro-functions-20-1-1) Hint. Work with some examples. What if \(f = \twoline{1\amp 2 \amp 3}{a \amp a \amp b}\) and \(g = \twoline{a\amp b \amp c}{5 \amp 6 \amp 7}\text{?}\)[🔗](#exercises_intro-functions-20-2-1) [🔗](#exercises_intro-functions-20-2) [🔗](#exercises_intro-functions-20)

#### 21.

Consider the function \(f:\Z \to \Z\) given by \(f(n) = \begin{cases}n+1 \amp \text{ if }n\text{ is even} \\ n-3 \amp \text{ if }n\text{ is odd} . \end{cases}\)

1. Is \(f\) injective? Prove your answer.[🔗](#exercises_intro-functions-21-1-1-3-1-1) [🔗](#exercises_intro-functions-21-1-1-3-1)
2. Is \(f\) surjective? Prove your answer.[🔗](#exercises_intro-functions-21-1-1-3-2-1) [🔗](#exercises_intro-functions-21-1-1-3-2)

[🔗](#exercises_intro-functions-21-1-1) [🔗](#exercises_intro-functions-21)

#### 22.

At the end of the semester a teacher assigns letter grades to each of her students. Is this a function? If so, what sets make up the domain and codomain, and is the function injective, surjective, bijective, or neither?[🔗](#exercises_intro-functions-22-1-1) [🔗](#exercises_intro-functions-22)

#### 23.

In the game of *Hearts*, four players are each dealt 13 cards from a deck of 52. Is this a function? If so, what sets make up the domain and codomain, and is the function injective, surjective, bijective, or neither?[🔗](#exercises_intro-functions-23-1-1) [🔗](#exercises_intro-functions-23)

#### 24.

Seven players are playing 5-card stud. Each player initially receives 5 cards from a deck of 52. Is this a function? If so, what sets make up the domain and codomain, and is the function injective, surjective, bijective, or neither?[🔗](#exercises_intro-functions-24-1-1) [🔗](#exercises_intro-functions-24)

#### 25.

Consider the function \(f:\N \to \N\) that gives the number of handshakes that take place in a room of \(n\) people assuming everyone shakes hands with everyone else. Give a recursive definition for this function.[🔗](#exercises_intro-functions-25-1-1) Hint. To find the recurrence relation, consider how many *new* handshakes occur when person \(n+1\) enters the room.[🔗](#exercises_intro-functions-25-2-1) [🔗](#exercises_intro-functions-25-2) [🔗](#exercises_intro-functions-25)

#### 26.

Let \(f:X \to Y\) be a function and \(A \subseteq X\) be a finite subset of the domain. What can you say about the relationship between \(\card{A}\) and \(\card{f(A)}\text{?}\) Consider both the general case and what happens when you know \(f\) is injective, surjective, or bijective.[🔗](#exercises_intro-functions-26-1-1) [🔗](#exercises_intro-functions-26)

#### 27.

Let \(f:X \to Y\) be a function and \(B \subseteq Y\) be a finite subset of the codomain. What can you say about the relationship between \(\card{B}\) and \(\card{f\inv(B)}\text{?}\) Consider both the general case and what happens when you know \(f\) is injective, surjective, or bijective.[🔗](#exercises_intro-functions-27-1-1) [🔗](#exercises_intro-functions-27)

#### 28.

Let \(f:X \to Y\) be a function, \(A \subseteq X\) and \(B \subseteq Y\text{.}\)

1. Is \(f\inv\left(f(A)\right) = A\text{?}\) Always, sometimes, never? Explain.[🔗](#exercises_intro-functions-28-1-1-4-1-1) [🔗](#exercises_intro-functions-28-1-1-4-1)
2. Is \(f\left(f\inv(B)\right) = B\text{?}\) Always, sometimes, never? Explain.[🔗](#exercises_intro-functions-28-1-1-4-2-1) [🔗](#exercises_intro-functions-28-1-1-4-2)
3. If one or both of the above do not always hold, is there something else you can say? Will equality always hold for particular types of functions? Is there some other relationship other than equality that would always hold? Explore.[🔗](#exercises_intro-functions-28-1-1-4-3-1) [🔗](#exercises_intro-functions-28-1-1-4-3)

[🔗](#exercises_intro-functions-28-1-1) [🔗](#exercises_intro-functions-28)

#### 29.

Let \(f:X \to Y\) be a function and \(A, B \subseteq X\) be subsets of the domain.

1. Is \(f(A \cup B) = f(A) \cup f(B)\text{?}\) Always, sometimes, or never? Explain.[🔗](#exercises_intro-functions-29-1-1-3-1-1) [🔗](#exercises_intro-functions-29-1-1-3-1)
2. Is \(f(A \cap B) = f(A) \cap f(B)\text{?}\) Always, sometimes, or never? Explain.[🔗](#exercises_intro-functions-29-1-1-3-2-1) [🔗](#exercises_intro-functions-29-1-1-3-2)

[🔗](#exercises_intro-functions-29-1-1) Hint. One of these is not always true. Try some examples![🔗](#exercises_intro-functions-29-2-1) [🔗](#exercises_intro-functions-29-2) [🔗](#exercises_intro-functions-29)

#### 30.

Let \(f:X \to Y\) be a function and \(A, B \subseteq Y\) be subsets of the codomain.

1. Is \(f\inv(A \cup B) = f\inv(A) \cup f\inv(B)\text{?}\) Always, sometimes, or never? Explain.[🔗](#exercises_intro-functions-30-1-1-3-1-1) [🔗](#exercises_intro-functions-30-1-1-3-1)
2. Is \(f\inv(A \cap B) = f\inv(A) \cap f\inv(B)\text{?}\) Always, sometimes, or never? Explain.[🔗](#exercises_intro-functions-30-1-1-3-2-1) [🔗](#exercises_intro-functions-30-1-1-3-2)

[🔗](#exercises_intro-functions-30-1-1) [🔗](#exercises_intro-functions-30)[🔗](#exercises_intro-functions)[🔗](#sec_structures-functions) [&#xe5cb;Prev](sec_structures-sets.html)[&#xe5ce;Top](#)[Next&#xe5cc;](ch_additionalTopics.html) [Feedback](/cdn-cgi/l/email-protection#650a160604174b0900130c0b25100b060a4b000110)[PreTeXt logo](https://pretextbook.org)[![Runstone Academy logo](/images/discrete-math/sec_structures-functions-RAIcon_cropped.png.webp)](https://runestone.academy)[![MathJax logo](/images/discrete-math/sec_structures-functions-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');
