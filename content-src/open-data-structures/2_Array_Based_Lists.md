---
title: "2. Array-Based Lists"
lang: en
---

In this chapter, we will study implementations of the List and Queue interfaces where the underlying data is stored in an array, called the backing array. The following table summarizes the running times of operations for the data structures presented in this chapter:

|  | $$ \mathtt{get(i)}$$ / $$ \mathtt{set(i,x)}$$ | $$ \mathtt{add(i,x)}$$ / $$ \mathtt{remove(i)}$$ |
| --- | --- | --- |
| ArrayStack | $$ O(1)$$ | $$ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ |
| ArrayDeque | $$ O(1)$$ | $$ O(\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ |
| DualArrayDeque | $$ O(1)$$ | $$ O(\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ |
| RootishArrayStack | $$ O(1)$$ | $$ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ |

Data structures that work by storing data in a single array have many advantages and limitations in common:

- Arrays offer constant time access to any value in the array. This is what allows $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ to run in constant time.
- Arrays are not very dynamic. Adding or removing an element near the middle of a list means that a large number of elements in the array need to be shifted to make room for the newly added element or to fill in the gap created by the deleted element. This is why the operations $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ have running times that depend on $$ \mathtt{n}$$ and $$ \mathtt{i}$$ .
- Arrays cannot expand or shrink. When the number of elements in the data structure exceeds the size of the backing array, a new array needs to be allocated and the data from the old array needs to be copied into the new array. This is an expensive operation.

The third point is important. The running times cited in the table above do not include the cost associated with growing and shrinking the backing array. We will see that, if carefully managed, the cost of growing and shrinking the backing array does not add much to the cost of an average operation. More precisely, if we start with an empty data structure, and perform any sequence of $$ m$$ $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ operations, then the total cost of growing and shrinking the backing array, over the entire sequence of $$ m$$ operations is $$ O(m)$$ . Although some individual operations are more expensive, the amortized cost, when amortized over all $$ m$$ operations, is only $$ O(1)$$ per operation.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 2.1 ArrayStack: Fast Stack Operations Using an Array

**Subsections**

# 2.1 ArrayStack: Fast Stack Operations Using an Array

An ArrayStack implements the list interface using an array $$ \mathtt{a}$$ , called the backing array. The list element with index $$ \mathtt{i}$$ is stored in $$ \mathtt{a[i]}$$ . At most times, $$ \mathtt{a}$$ is larger than strictly necessary, so an integer $$ \mathtt{n}$$ is used to keep track of the number of elements actually stored in $$ \mathtt{a}$$ . In this way, the list elements are stored in $$ \mathtt{a[0]}$$ ,..., $$ \mathtt{a[n-1]}$$ and, at all times, $$ \ensuremath{\mathtt{a.length}} \ge \ensuremath{\mathtt{n}}$$ .

```
    T[] a;
    int n;
    int size() {
        return n;
    }
```

## 2.1.1 The Basics

Accessing and modifying the elements of an ArrayStack using $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ is trivial. After performing any necessary bounds-checking we simply return or set, respectively, $$ \mathtt{a[i]}$$ .

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        return a[i];
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T y = a[i];
        a[i] = x;
        return y;
    }
```

The operations of adding and removing elements from an ArrayStack are illustrated in Figure 2.1. To implement the $$ \mathtt{add(i,x)}$$ operation, we first check if $$ \mathtt{a}$$ is already full. If so, we call the method $$ \mathtt{resize()}$$ to increase the size of $$ \mathtt{a}$$ . How $$ \mathtt{resize()}$$ is implemented will be discussed later. For now, it is sufficient to know that, after a call to $$ \mathtt{resize()}$$ , we can be sure that $$ \ensuremath{\mathtt{a.length}} > \ensuremath{\mathtt{n}}$$ . With this out of the way, we now shift the elements $$ \ensuremath{\mathtt{a[i]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$$ right by one position to make room for $$ \mathtt{x}$$ , set $$ \mathtt{a[i]}$$ equal to $$ \mathtt{x}$$ , and increment $$ \mathtt{n}$$ .

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (n + 1 > a.length) resize();
        for (int j = n; j > i; j--) 
            a[j] = a[j-1];
        a[i] = x;
        n++;
    }
```

If we ignore the cost of the potential call to $$ \mathtt{resize()}$$ , then the cost of the $$ \mathtt{add(i,x)}$$ operation is proportional to the number of elements we have to shift to make room for $$ \mathtt{x}$$ . Therefore the cost of this operation (ignoring the cost of resizing $$ \mathtt{a}$$ ) is $$ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ . Implementing the $$ \mathtt{remove(i)}$$ operation is similar. We shift the elements $$ \ensuremath{\mathtt{a[i+1]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$$ left by one position (overwriting $$ \mathtt{a[i]}$$ ) and decrease the value of $$ \mathtt{n}$$ . After doing this, we check if $$ \mathtt{n}$$ is getting much smaller than $$ \mathtt{a.length}$$ by checking if $$ \ensuremath{\mathtt{a.length}} \ge 3\ensuremath{\mathtt{n}}$$ . If so, then we call $$ \mathtt{resize()}$$ to reduce the size of $$ \mathtt{a}$$ .

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T x = a[i];
        for (int j = i; j < n-1; j++) 
            a[j] = a[j+1];
        n--;
        if (a.length >= 3*n) resize();
        return x;
    }
```

If we ignore the cost of the $$ \mathtt{resize()}$$ method, the cost of a $$ \mathtt{remove(i)}$$ operation is proportional to the number of elements we shift, which is $$ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ .

## 2.1.2 Growing and Shrinking

The $$ \mathtt{resize()}$$ method is fairly straightforward; it allocates a new array $$ \mathtt{b}$$ whose size is $$ 2\ensuremath{\mathtt{n}}$$ and copies the $$ \mathtt{n}$$ elements of $$ \mathtt{a}$$ into the first $$ \mathtt{n}$$ positions in $$ \mathtt{b}$$ , and then sets $$ \mathtt{a}$$ to $$ \mathtt{b}$$ . Thus, after a call to $$ \mathtt{resize()}$$ , $$ \ensuremath{\mathtt{a.length}} = 2\ensuremath{\mathtt{n}}$$ .

```
    void resize() {
        T[] b = newArray(Math.max(n*2,1));
        for (int i = 0; i < n; i++) {
            b[i] = a[i];
        }
        a = b;
    }
```

Analyzing the actual cost of the $$ \mathtt{resize()}$$ operation is easy. It allocates an array $$ \mathtt{b}$$ of size $$ 2\ensuremath{\mathtt{n}}$$ and copies the $$ \mathtt{n}$$ elements of $$ \mathtt{a}$$ into $$ \mathtt{b}$$ . This takes $$ O(\ensuremath{\mathtt{n}})$$ time. The running time analysis from the previous section ignored the cost of calls to $$ \mathtt{resize()}$$ . In this section we analyze this cost using a technique known as amortized analysis. This technique does not try to determine the cost of resizing during each individual $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operation. Instead, it considers the cost of all calls to $$ \mathtt{resize()}$$ during a sequence of $$ m$$ calls to $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ . In particular, we will show: **Lemma 2..1** *If an empty ArrayStack is created and any sequence of $$ m\ge 1$$ calls to $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ are performed, then the total time spent during all calls to $$ \mathtt{resize()}$$ is $$ O(m)$$ .*

*Proof*. We will show that any time $$ \mathtt{resize()}$$ is called, the number of calls to $$ \mathtt{add}$$ or $$ \mathtt{remove}$$ since the last call to $$ \mathtt{resize()}$$ is at least $$ \ensuremath{\mathtt{n}}/2-1$$ . Therefore, if $$ \ensuremath{\mathtt{n}}_i$$ denotes the value of $$ \mathtt{n}$$ during the $$ i$$ th call to $$ \mathtt{resize()}$$ and $$ r$$ denotes the number of calls to $$ \mathtt{resize()}$$ , then the total number of calls to $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ is at least

![$\displaystyle \sum_{i=1}^{r} (\ensuremath{\mathtt{n}}_i/2-1) \le m \enspace , $](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img537.png.webp)

which is equivalent to

![$\displaystyle \sum_{i=1}^{r} \ensuremath{\mathtt{n}}_i \le 2m + 2r \enspace . $](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img538.png.webp)

On the other hand, the total time spent during all calls to $$ \mathtt{resize()}$$ is

![$\displaystyle \sum_{i=1}^{r} O(\ensuremath{\mathtt{n}}_i) \le O(m+r) = O(m) \enspace , $](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img540.png.webp)

since $$ r$$ is not more than $$ m$$ . All that remains is to show that the number of calls to $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ between the $$ (i-1)$$ th and the $$ i$$ th call to $$ \mathtt{resize()}$$ is at least $$ \ensuremath{\mathtt{n}}_i/2$$ .

There are two cases to consider. In the first case, $$ \mathtt{resize()}$$ is being called by $$ \mathtt{add(i,x)}$$ because the backing array $$ \mathtt{a}$$ is full, i.e., $$ \ensuremath{\mathtt{a.length}} = \ensuremath{\mathtt{n}}=\ensuremath{\mathtt{n}}_i$$ . Consider the previous call to $$ \mathtt{resize()}$$ : after this previous call, the size of $$ \mathtt{a}$$ was $$ \mathtt{a.length}$$ , but the number of elements stored in $$ \mathtt{a}$$ was at most $$ \ensuremath{\mathtt{a.length}}/2=\ensuremath{\mathtt{n}}_i/2$$ . But now the number of elements stored in $$ \mathtt{a}$$ is $$ \ensuremath{\mathtt{n}}_i=\ensuremath{\mathtt{a.length}}$$ , so there must have been at least $$ \ensuremath{\mathtt{n}}_i/2$$ calls to $$ \mathtt{add(i,x)}$$ since the previous call to $$ \mathtt{resize()}$$ . The second case occurs when $$ \mathtt{resize()}$$ is being called by $$ \mathtt{remove(i)}$$ because $$ \ensuremath{\mathtt{a.length}} \ge 3\ensuremath{\mathtt{n}}=3\ensuremath{\mathtt{n}}_i$$ . Again, after the previous call to $$ \mathtt{resize()}$$ the number of elements stored in $$ \mathtt{a}$$ was at least $$ \ensuremath{\mathtt{a.length/2}}-1$$ .2.1 Now there are $$ \ensuremath{\mathtt{n}}_i\le\ensuremath{\mathtt{a.length}}/3$$ elements stored in $$ \mathtt{a}$$ . Therefore, the number of $$ \mathtt{remove(i)}$$ operations since the last call to $$ \mathtt{resize()}$$ is at least

| $$\displaystyle R$$ | $$\displaystyle \ge \ensuremath{\mathtt{a.length}}/2 - 1 - \ensuremath{\mathtt{a.length}}/3$$ |  |
| --- | --- | --- |
|  | $$\displaystyle = \ensuremath{\mathtt{a.length}}/6 - 1$$ |  |
|  | $$\displaystyle = (\ensuremath{\mathtt{a.length}}/3)/2 - 1$$ |  |
|  | $$\displaystyle \ge \ensuremath{\mathtt{n}}_i/2 -1\enspace .$$ |  |

In either case, the number of calls to $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ that occur between the $$ (i-1)$$ th call to $$ \mathtt{resize()}$$ and the $$ i$$ th call to $$ \mathtt{resize()}$$ is at least $$ \ensuremath{\mathtt{n}}_i/2-1$$ , as required to complete the proof. ![$ \qedsymbol$](/images/open-data-structures/2_1_ArrayStack_Fast_Stack_O-img523.png.webp)

2.1.3 Summary The following theorem summarizes the performance of an ArrayStack: **Theorem 2..1** *An ArrayStack implements the List interface. Ignoring the cost of calls to $$ \mathtt{resize()}$$ , an ArrayStack supports the operations * $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ in $$ O(1)$$ time per operation; and $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ in $$ O(1+\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ time per operation. * Furthermore, beginning with an empty ArrayStack and performing any sequence of $$ m$$ $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operations results in a total of $$ O(m)$$ time spent during all calls to $$ \mathtt{resize()}$$ .*

The ArrayStack is an efficient way to implement a Stack. In particular, we can implement $$ \mathtt{push(x)}$$ as $$ \mathtt{add(n,x)}$$ and $$ \mathtt{pop()}$$ as $$ \mathtt{remove(n-1)}$$ , in which case these operations will run in $$ O(1)$$ amortized time.

#### Footnotes

....2.1 The $$ {}-1$$ in this formula accounts for the special case that occurs when $$ \ensuremath{\mathtt{n}}=0$$ and $$ \ensuremath{\mathtt{a.length}} = 1$$ . [opendatastructures.org](http://opendatastructures.org/)

## 2.2 FastArrayStack: An Optimized ArrayStack

Much of the work done by an ArrayStack involves shifting (by $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ ) and copying (by $$ \mathtt{resize()}$$ ) of data. In the implementations shown above, this was done using $$ \mathtt{for}$$ loops. It turns out that many programming environments have specific functions that are very efficient at copying and moving blocks of data. In the C programming language, there are the $$ \mathtt{memcpy(d,s,n)}$$ and $$ \mathtt{memmove(d,s,n)}$$ functions. In the C++ language there is the $$ \mathtt{std::copy(a0,a1,b)}$$ algorithm. In Java there is the $$ \mathtt{System.arraycopy(s,i,d,j,n)}$$ method.

```
    void resize() {
        T[] b = newArray(Math.max(2*n,1));
        System.arraycopy(a, 0, b, 0, n);
        a = b;
    }
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (n + 1 > a.length) resize();
        System.arraycopy(a, i, a, i+1, n-i); 
        a[i] = x;
        n++;
    }
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T x = a[i];
        System.arraycopy(a, i+1, a, i, n-i-1);
        n--; 
        if (a.length >= 3*n) resize();
        return x;
    }
```

These functions are usually highly optimized and may even use special machine instructions that can do this copying much faster than we could by using a $$ \mathtt{for}$$ loop. Although using these functions does not asymptotically decrease the running times, it can still be a worthwhile optimization. In the Java implementations here, the use of the native $$ \mathtt{System.arraycopy(s,i,d,j,n)}$$ resulted in speedups of a factor between 2 and 3, depending on the types of operations performed. Your mileage may vary. [opendatastructures.org](http://opendatastructures.org/)

## 2.3 ArrayQueue: An Array-Based Queue

**Subsections**

# 2.3 ArrayQueue: An Array-Based Queue

In this section, we present the ArrayQueue data structure, which implements a FIFO (first-in-first-out) queue; elements are removed (using the $$ \mathtt{remove()}$$ operation) from the queue in the same order they are added (using the $$ \mathtt{add(x)}$$ operation). Notice that an ArrayStack is a poor choice for an implementation of a FIFO queue. It is not a good choice because we must choose one end of the list upon which to add elements and then remove elements from the other end. One of the two operations must work on the head of the list, which involves calling $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ with a value of $$ \ensuremath{\mathtt{i}}=0$$ . This gives a running time proportional to $$ \mathtt{n}$$ . To obtain an efficient array-based implementation of a queue, we first notice that the problem would be easy if we had an infinite array $$ \mathtt{a}$$ . We could maintain one index $$ \mathtt{j}$$ that keeps track of the next element to remove and an integer $$ \mathtt{n}$$ that counts the number of elements in the queue. The queue elements would always be stored in

![$\displaystyle \ensuremath{\mathtt{a[j]}},\ensuremath{\mathtt{a[j+1]}},\ldots,\ensuremath{\mathtt{a[j+n-1]}} \enspace . $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img627.png.webp)

Initially, both $$ \mathtt{j}$$ and $$ \mathtt{n}$$ would be set to 0. To add an element, we would place it in $$ \mathtt{a[j+n]}$$ and increment $$ \mathtt{n}$$ . To remove an element, we would remove it from $$ \mathtt{a[j]}$$ , increment $$ \mathtt{j}$$ , and decrement $$ \mathtt{n}$$ .

Of course, the problem with this solution is that it requires an infinite array. An ArrayQueue simulates this by using a finite array $$ \mathtt{a}$$ and modular arithmetic. This is the kind of arithmetic used when we are talking about the time of day. For example 10:00 plus five hours gives 3:00. Formally, we say that

![$\displaystyle 10 + 5 = 15 \equiv 3 \pmod{12} \enspace . $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img636.png.webp)

We read the latter part of this equation as ``15 is congruent to 3 modulo 12.'' We can also treat $$ \bmod$$ as a binary operator, so that

![$\displaystyle 15 \bmod 12 = 3 \enspace . $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img638.png.webp)

More generally, for an integer $$ a$$ and positive integer $$ m$$ , $$ a \bmod m$$ is the unique integer $$ r\in\{0,\ldots,m-1\}$$ such that $$ a = r + km$$ for some integer $$ k$$ . Less formally, the value $$ r$$ is the remainder we get when we divide $$ a$$ by $$ m$$ . In many programming languages, including Java, the $$ \bmod$$ operator is represented using the $$ \mathtt{\text{\ttfamily\%}}$$ symbol.2.2 Modular arithmetic is useful for simulating an infinite array, since $$ \ensuremath{\mathtt{i}}\bmod \ensuremath{\mathtt{a.length}}$$ always gives a value in the range $$ 0,\ldots,\ensuremath{\mathtt{a.length-1}}$$ . Using modular arithmetic we can store the queue elements at array locations

![$\displaystyle \ensuremath{\mathtt{a[j\text{\ttfamily\%}a.length]}},\ensuremath{... ...}},\ldots,\ensuremath{\mathtt{a[(j+n-1)\text{\ttfamily\%}a.length]}} \enspace. $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img652.png.webp)

This treats the array $$ \mathtt{a}$$ like a circular array in which array indices larger than $$ \ensuremath{\mathtt{a.length}}-1$$ ``wrap around'' to the beginning of the array. The only remaining thing to worry about is taking care that the number of elements in the ArrayQueue does not exceed the size of $$ \mathtt{a}$$ .

```
    T[] a;
    int j;
    int n;
```

A sequence of $$ \mathtt{add(x)}$$ and $$ \mathtt{remove()}$$ operations on an ArrayQueue is illustrated in Figure 2.2. To implement $$ \mathtt{add(x)}$$ , we first check if $$ \mathtt{a}$$ is full and, if necessary, call $$ \mathtt{resize()}$$ to increase the size of $$ \mathtt{a}$$ . Next, we store $$ \mathtt{x}$$ in $$ \mathtt{a[(j+n)\text{\ttfamily\%}a.length]}$$ and increment $$ \mathtt{n}$$ .

```
    boolean add(T x) {
        if (n + 1 > a.length) resize();
        a[(j+n) % a.length] = x;
        n++;
        return true;
    }
```

To implement $$ \mathtt{remove()}$$ , we first store $$ \mathtt{a[j]}$$ so that we can return it later. Next, we decrement $$ \mathtt{n}$$ and increment $$ \mathtt{j}$$ (modulo $$ \mathtt{a.length}$$ ) by setting $$ \ensuremath{\mathtt{j}}=(\ensuremath{\mathtt{j}}+1)\bmod \ensuremath{\mathtt{a.length}}$$ . Finally, we return the stored value of $$ \mathtt{a[j]}$$ . If necessary, we may call $$ \mathtt{resize()}$$ to decrease the size of $$ \mathtt{a}$$ .

```
    T remove() { 
        if (n == 0) throw new NoSuchElementException();
        T x = a[j];
        j = (j + 1) % a.length;
        n--;
        if (a.length >= 3*n) resize();
        return x;
    }
```

Finally, the $$ \mathtt{resize()}$$ operation is very similar to the $$ \mathtt{resize()}$$ operation of ArrayStack. It allocates a new array, $$ \mathtt{b}$$ , of size $$ 2\ensuremath{\mathtt{n}}$$ and copies

![$\displaystyle \ensuremath{\mathtt{a[j]}},\ensuremath{\mathtt{a[(j+1)\text{\ttfa... ...}a.length]}},\ldots,\ensuremath{\mathtt{a[(j+n-1)\text{\ttfamily\%}a.length]}} $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img682.png.webp)

onto

![$\displaystyle \ensuremath{\mathtt{b[0]}},\ensuremath{\mathtt{b[1]}},\ldots,\ensuremath{\mathtt{b[n-1]}} $](/images/open-data-structures/2_3_ArrayQueue_Array_Based_-img683.png.webp)

and sets $$ \ensuremath{\mathtt{j}}=0$$ .

```
    void resize() {
        T[] b = newArray(Math.max(1,n*2));
        for (int k = 0; k < n; k++) 
            b[k] = a[(j+k) % a.length];
        a = b;
        j = 0;
    }
```

2.3.1 Summary The following theorem summarizes the performance of the ArrayQueue data structure: **Theorem 2..2** *An ArrayQueue implements the (FIFO) Queue interface. Ignoring the cost of calls to $$ \mathtt{resize()}$$ , an ArrayQueue supports the operations $$ \mathtt{add(x)}$$ and $$ \mathtt{remove()}$$ in $$ O(1)$$ time per operation. Furthermore, beginning with an empty ArrayQueue, any sequence of $$ m$$ $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operations results in a total of $$ O(m)$$ time spent during all calls to $$ \mathtt{resize()}$$ .*

#### Footnotes

... symbol.2.2 This is sometimes referred to as the brain-dead mod operator, since it does not correctly implement the mathematical mod operator when the first argument is negative. [opendatastructures.org](http://opendatastructures.org/)

## 2.4 ArrayDeque: Fast Deque Operations Using an Array

**Subsections**

# 2.4 ArrayDeque: Fast Deque Operations Using an Array

The ArrayQueue from the previous section is a data structure for representing a sequence that allows us to efficiently add to one end of the sequence and remove from the other end. The ArrayDeque data structure allows for efficient addition and removal at both ends. This structure implements the List interface by using the same circular array technique used to represent an ArrayQueue.

```
    T[] a;
    int j;
    int n;
```

The $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ operations on an ArrayDeque are straightforward. They get or set the array element $$ \ensuremath{\mathtt{a[}}{\ensuremath{\mathtt{(j+i)}}\bmod \ensuremath{\mathtt{a.length}}}\ensuremath{\mathtt{]}}$$ .

```
    T get(int i) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        return a[(j+i)%a.length];
    }
    T set(int i, T x) {
        if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
        T y = a[(j+i)%a.length];
        a[(j+i)%a.length] = x;
        return y;
    }
```

The implementation of $$ \mathtt{add(i,x)}$$ is a little more interesting. As usual, we first check if $$ \mathtt{a}$$ is full and, if necessary, call $$ \mathtt{resize()}$$ to resize $$ \mathtt{a}$$ . Remember that we want this operation to be fast when $$ \mathtt{i}$$ is small (close to 0) or when $$ \mathtt{i}$$ is large (close to $$ \mathtt{n}$$ ). Therefore, we check if $$ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{n}}/2$$ . If so, we shift the elements $$ \ensuremath{\mathtt{a[0]}},\ldots,\ensuremath{\mathtt{a[i-1]}}$$ left by one position. Otherwise ( $$ \ensuremath{\mathtt{i}}\ge\ensuremath{\mathtt{n}}/2$$ ), we shift the elements $$ \ensuremath{\mathtt{a[i]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$$ right by one position. See Figure 2.3 for an illustration of $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(x)}$$ operations on an ArrayDeque.

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        if (n+1 > a.length) resize();
        if (i < n/2) { // shift a[0],..,a[i-1] left one position
            j = (j == 0) ? a.length - 1 : j - 1; //(j-1)mod a.length
            for (int k = 0; k <= i-1; k++)
                a[(j+k)%a.length] = a[(j+k+1)%a.length];
        } else { // shift a[i],..,a[n-1] right one position
            for (int k = n; k > i; k--)
                a[(j+k)%a.length] = a[(j+k-1)%a.length];
        }
        a[(j+i)%a.length] = x;
        n++;
    }
```

By doing the shifting in this way, we guarantee that $$ \mathtt{add(i,x)}$$ never has to shift more than $$ \min\{ \ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}} \}$$ elements. Thus, the running time of the $$ \mathtt{add(i,x)}$$ operation (ignoring the cost of a $$ \mathtt{resize()}$$ operation) is $$ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ . The implementation of the $$ \mathtt{remove(i)}$$ operation is similar. It either shifts elements $$ \ensuremath{\mathtt{a[0]}},\ldots,\ensuremath{\mathtt{a[i-1]}}$$ right by one position or shifts the elements $$ \ensuremath{\mathtt{a[i+1]}},\ldots,\ensuremath{\mathtt{a[n-1]}}$$ left by one position depending on whether $$ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{n}}/2$$ . Again, this means that $$ \mathtt{remove(i)}$$ never spends more than $$ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ time to shift elements.

```
    T remove(int i) {
        if (i < 0 || i > n - 1)    throw new IndexOutOfBoundsException();
        T x = a[(j+i)%a.length];
        if (i < n/2) {  // shift a[0],..,[i-1] right one position
            for (int k = i; k > 0; k--)
                a[(j+k)%a.length] = a[(j+k-1)%a.length];
            j = (j + 1) % a.length;
        } else { // shift a[i+1],..,a[n-1] left one position
            for (int k = i; k < n-1; k++)
                a[(j+k)%a.length] = a[(j+k+1)%a.length];
        }
        n--;
        if (3*n < a.length) resize();
        return x;
    }
```

2.4.1 Summary The following theorem summarizes the performance of the ArrayDeque data structure: **Theorem 2..3** *An ArrayDeque implements the List interface. Ignoring the cost of calls to $$ \mathtt{resize()}$$ , an ArrayDeque supports the operations * $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ in $$ O(1)$$ time per operation; and $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ in $$ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ time per operation. * Furthermore, beginning with an empty ArrayDeque, performing any sequence of $$ m$$ $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operations results in a total of $$ O(m)$$ time spent during all calls to $$ \mathtt{resize()}$$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 2.5 DualArrayDeque: Building a Deque from Two Stacks

**Subsections**

# 2.5 DualArrayDeque: Building a Deque from Two Stacks

Next, we present a data structure, the DualArrayDeque that achieves the same performance bounds as an ArrayDeque by using two ArrayStacks. Although the asymptotic performance of the DualArrayDeque is no better than that of the ArrayDeque, it is still worth studying, since it offers a good example of how to make a sophisticated data structure by combining two simpler data structures. A DualArrayDeque represents a list using two ArrayStacks. Recall that an ArrayStack is fast when the operations on it modify elements near the end. A DualArrayDeque places two ArrayStacks, called $$ \mathtt{front}$$ and $$ \mathtt{back}$$ , back-to-back so that operations are fast at either end.

```
    List<T> front;
    List<T> back;
```

A DualArrayDeque does not explicitly store the number, $$ \mathtt{n}$$ , of elements it contains. It doesn't need to, since it contains $$ \ensuremath{\mathtt{n}}=\ensuremath{\mathtt{front.size()}} + \ensuremath{\mathtt{back.size()}}$$ elements. Nevertheless, when analyzing the DualArrayDeque we will still use $$ \mathtt{n}$$ to denote the number of elements it contains.

```
    int size() {
        return front.size() + back.size();        
    }
```

The $$ \mathtt{front}$$ ArrayStack stores the list elements that whose indices are $$ 0,\ldots,\ensuremath{\mathtt{front.size()}}-1$$ , but stores them in reverse order. The $$ \mathtt{back}$$ ArrayStack contains list elements with indices in $$ \ensuremath{\mathtt{front.size()}},\ldots,\ensuremath{\mathtt{size()}}-1$$ in the normal order. In this way, $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ translate into appropriate calls to $$ \mathtt{get(i)}$$ or $$ \mathtt{set(i,x)}$$ on either $$ \mathtt{front}$$ or $$ \mathtt{back}$$ , which take $$ O(1)$$ time per operation.

```
    T get(int i) {
        if (i < front.size()) {
            return front.get(front.size()-i-1);
        } else {
            return back.get(i-front.size());
        }
    }
    T set(int i, T x) {
        if (i < front.size()) {
            return front.set(front.size()-i-1, x);
            
        } else {
            return back.set(i-front.size(), x);
        }
    }
```

Note that if an index $$ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{front.size()}}$$ , then it corresponds to the element of $$ \mathtt{front}$$ at position $$ \ensuremath{\mathtt{front.size()}}-\ensuremath{\mathtt{i}}-1$$ , since the elements of $$ \mathtt{front}$$ are stored in reverse order. Adding and removing elements from a DualArrayDeque is illustrated in Figure 2.4. The $$ \mathtt{add(i,x)}$$ operation manipulates either $$ \mathtt{front}$$ or $$ \mathtt{back}$$ , as appropriate:

```
    void add(int i, T x) {
        if (i < front.size()) { 
            front.add(front.size()-i, x);
        } else {
            back.add(i-front.size(), x);
        }
        balance();
    }
```

The $$ \mathtt{add(i,x)}$$ method performs rebalancing of the two ArrayStacks $$ \mathtt{front}$$ and $$ \mathtt{back}$$ , by calling the $$ \mathtt{balance()}$$ method. The implementation of $$ \mathtt{balance()}$$ is described below, but for now it is sufficient to know that $$ \mathtt{balance()}$$ ensures that, unless $$ \ensuremath{\mathtt{size()}}<2$$ , $$ \mathtt{front.size()}$$ and $$ \mathtt{back.size()}$$ do not differ by more than a factor of 3. In particular, $$ 3\cdot\ensuremath{\mathtt{front.size()}} \ge \ensuremath{\mathtt{back.size()}}$$ and $$ 3\cdot\ensuremath{\mathtt{back.size()}} \ge \ensuremath{\mathtt{front.size()}}$$ . Next we analyze the cost of $$ \mathtt{add(i,x)}$$ , ignoring the cost of calls to $$ \mathtt{balance()}$$ . If $$ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{front.size()}}$$ , then $$ \mathtt{add(i,x)}$$ gets implemented by the call to $$ \ensuremath{\mathtt{front.add(front.size()-i-1,x)}}$$ . Since $$ \mathtt{front}$$ is an ArrayStack, the cost of this is

On the other hand, if $$ \ensuremath{\mathtt{i}}\ge\ensuremath{\mathtt{front.size()}}$$ , then $$ \mathtt{add(i,x)}$$ gets implemented as $$ \ensuremath{\mathtt{back.add(i-front.size(),x)}}$$ . The cost of this is

Notice that the first case (2.1) occurs when $$ \ensuremath{\mathtt{i}}<\ensuremath{\mathtt{n}}/4$$ . The second case (2.2) occurs when $$ \ensuremath{\mathtt{i}}\ge 3\ensuremath{\mathtt{n}}/4$$ . When $$ \ensuremath{\mathtt{n}}/4\le\ensuremath{\mathtt{i}}<3\ensuremath{\mathtt{n}}/4$$ , we cannot be sure whether the operation affects $$ \mathtt{front}$$ or $$ \mathtt{back}$$ , but in either case, the operation takes $$ O(\ensuremath{\mathtt{n}})=O(\ensuremath{\mathtt{i}})=O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ time, since $$ \ensuremath{\mathtt{i}}\ge \ensuremath{\mathtt{n}}/4$$ and $$ \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}> \ensuremath{\mathtt{n}}/4$$ . Summarizing the situation, we have

Running time of ![$\displaystyle \ensuremath{\mathtt{add(i,x)}} \le \left\{\begin{array}{ll} O(... ... $\ensuremath{\mathtt{i}} \ge 3\ensuremath{\mathtt{n}}/4$} \end{array}\right. $](/images/open-data-structures/2_5_DualArrayDeque_Building-img793.png.webp)

Thus, the running time of $$ \mathtt{add(i,x)}$$ , if we ignore the cost of the call to $$ \mathtt{balance()}$$ , is $$ O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ . The $$ \mathtt{remove(i)}$$ operation and its analysis resemble the $$ \mathtt{add(i,x)}$$ operation and analysis.

```
    T remove(int i) {
        T x;
        if (i < front.size()) {
            x = front.remove(front.size()-i-1);
        } else {
            x = back.remove(i-front.size());
        }
        balance();
        return x;
    }
```

## 2.5.1 Balancing

Finally, we turn to the $$ \mathtt{balance()}$$ operation performed by $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ . This operation ensures that neither $$ \mathtt{front}$$ nor $$ \mathtt{back}$$ becomes too big (or too small). It ensures that, unless there are fewer than two elements, each of $$ \mathtt{front}$$ and $$ \mathtt{back}$$ contain at least $$ \ensuremath{\mathtt{n}}/4$$ elements. If this is not the case, then it moves elements between them so that $$ \mathtt{front}$$ and $$ \mathtt{back}$$ contain exactly $$ \lfloor\ensuremath{\mathtt{n}}/2\rfloor$$ elements and $$ \lceil\ensuremath{\mathtt{n}}/2\rceil$$ elements, respectively.

```
    void balance() {
        int n = size();
        if (3*front.size() < back.size()) {
            int s = n/2 - front.size();
            List<T> l1 = newStack();
            List<T> l2 = newStack();
            l1.addAll(back.subList(0,s));
            Collections.reverse(l1);
            l1.addAll(front);
            l2.addAll(back.subList(s, back.size()));
            front = l1;
            back = l2;
        } else if (3*back.size() < front.size()) {
            int s = front.size() - n/2;
            List<T> l1 = newStack();
            List<T> l2 = newStack();
            l1.addAll(front.subList(s, front.size()));
            l2.addAll(front.subList(0, s));
            Collections.reverse(l2);
            l2.addAll(back);
            front = l1;
            back = l2;
        }
    }
```

Here there is little to analyze. If the $$ \mathtt{balance()}$$ operation does rebalancing, then it moves $$ O(\ensuremath{\mathtt{n}})$$ elements and this takes $$ O(\ensuremath{\mathtt{n}})$$ time. This is bad, since $$ \mathtt{balance()}$$ is called with each call to $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ . However, the following lemma shows that, on average, $$ \mathtt{balance()}$$ only spends a constant amount of time per operation. **Lemma 2..2** *If an empty DualArrayDeque is created and any sequence of $$ m\ge 1$$ calls to $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ are performed, then the total time spent during all calls to $$ \mathtt{balance()}$$ is $$ O(m)$$ .*

*Proof*. We will show that, if $$ \mathtt{balance()}$$ is forced to shift elements, then the number of $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operations since the last time any elements were shifted by $$ \mathtt{balance()}$$ is at least $$ \ensuremath{\mathtt{n}}/2-1$$ . As in the proof of Lemma 2.1, this is sufficient to prove that the total time spent by $$ \mathtt{balance()}$$ is $$ O(m)$$ .

We will perform our analysis using a technique knows as the potential method. Define the potential, $$ \Phi$$ , of the DualArrayDeque as the difference in size between $$ \mathtt{front}$$ and $$ \mathtt{back}$$ :

![$\displaystyle \Phi = \vert\ensuremath{\mathtt{front.size()}} - \ensuremath{\mathtt{back.size()}}\vert \enspace . $](/images/open-data-structures/2_5_DualArrayDeque_Building-img834.png.webp)

The interesting thing about this potential is that a call to $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ that does not do any balancing can increase the potential by at most 1.

Observe that, immediately after a call to $$ \mathtt{balance()}$$ that shifts elements, the potential, $$ \Phi_0$$ , is at most 1, since

![$\displaystyle \Phi_0 = \left\vert\lfloor\ensuremath{\mathtt{n}}/2\rfloor-\lceil\ensuremath{\mathtt{n}}/2\rceil\right\vert\le 1 \enspace .$](/images/open-data-structures/2_5_DualArrayDeque_Building-img839.png.webp)

Consider the situation immediately before a call to $$ \mathtt{balance()}$$ that shifts elements and suppose, without loss of generality, that $$ \mathtt{balance()}$$ is shifting elements because $$ 3\ensuremath{\mathtt{front.size()}} < \ensuremath{\mathtt{back.size()}}$$ . Notice that, in this case, ![$\displaystyle \ensuremath{\mathtt{n}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img843.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img844.png.webp) ![$\displaystyle \ensuremath{\mathtt{front.size()}}+\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img845.png.webp) ![$\displaystyle <$](/images/open-data-structures/2_5_DualArrayDeque_Building-img846.png.webp) ![$\displaystyle \ensuremath{\mathtt{back.size()}}/3+\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img847.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img848.png.webp) ![$\displaystyle \frac{4}{3}\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img849.png.webp) Furthermore, the potential at this point in time is ![$\displaystyle \Phi_1$](/images/open-data-structures/2_5_DualArrayDeque_Building-img850.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img851.png.webp) ![$\displaystyle \ensuremath{\mathtt{back.size()}} - \ensuremath{\mathtt{front.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img852.png.webp) ![$\displaystyle >$](/images/open-data-structures/2_5_DualArrayDeque_Building-img853.png.webp) ![$\displaystyle \ensuremath{\mathtt{back.size()}} - \ensuremath{\mathtt{back.size()}}/3$](/images/open-data-structures/2_5_DualArrayDeque_Building-img854.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img855.png.webp) ![$\displaystyle \frac{2}{3}\ensuremath{\mathtt{back.size()}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img856.png.webp) ![$\displaystyle >$](/images/open-data-structures/2_5_DualArrayDeque_Building-img857.png.webp) ![$\displaystyle \frac{2}{3}\times\frac{3}{4}\ensuremath{\mathtt{n}}$](/images/open-data-structures/2_5_DualArrayDeque_Building-img858.png.webp) ![$\displaystyle =$](/images/open-data-structures/2_5_DualArrayDeque_Building-img859.png.webp) ![$\displaystyle \ensuremath{\mathtt{n}}/2$](/images/open-data-structures/2_5_DualArrayDeque_Building-img860.png.webp) Therefore, the number of calls to $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ since the last time $$ \mathtt{balance()}$$ shifted elements is at least $$ \Phi_1-\Phi_0 > \ensuremath{\mathtt{n}}/2-1$$ . This completes the proof. ![$ \qedsymbol$](/images/open-data-structures/2_5_DualArrayDeque_Building-img823.png.webp)

2.5.2 Summary The following theorem summarizes the properties of a DualArrayDeque: **Theorem 2..4** *A DualArrayDeque implements the List interface. Ignoring the cost of calls to $$ \mathtt{resize()}$$ and $$ \mathtt{balance()}$$ , a DualArrayDeque supports the operations * $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ in $$ O(1)$$ time per operation; and $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ in $$ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ time per operation. * Furthermore, beginning with an empty DualArrayDeque, any sequence of $$ m$$ $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operations results in a total of $$ O(m)$$ time spent during all calls to $$ \mathtt{resize()}$$ and $$ \mathtt{balance()}$$ .*

[opendatastructures.org](http://opendatastructures.org/)

## 2.6 RootishArrayStack: A Space-Efficient Array Stack

**Subsections**

# 2.6 RootishArrayStack: A Space-Efficient Array Stack

One of the drawbacks of all previous data structures in this chapter is that, because they store their data in one or two arrays and they avoid resizing these arrays too often, the arrays frequently are not very full. For example, immediately after a $$ \mathtt{resize()}$$ operation on an ArrayStack, the backing array $$ \mathtt{a}$$ is only half full. Even worse, there are times when only one third of $$ \mathtt{a}$$ contains data. In this section, we discuss the RootishArrayStack data structure, that addresses the problem of wasted space. The RootishArrayStack stores $$ \mathtt{n}$$ elements using $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ arrays. In these arrays, at most $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ array locations are unused at any time. All remaining array locations are used to store data. Therefore, these data structures waste at most $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ space when storing $$ \mathtt{n}$$ elements. A RootishArrayStack stores its elements in a list of $$ \mathtt{r}$$ arrays called blocks that are numbered $$ 0,1,\ldots,\ensuremath{\mathtt{r}}-1$$ . See Figure 2.5. Block $$ b$$ contains $$ b+1$$ elements. Therefore, all $$ \mathtt{r}$$ blocks contain a total of

![$\displaystyle 1+ 2+ 3+\cdots +\ensuremath{\mathtt{r}} = \ensuremath{\mathtt{r}}(\ensuremath{\mathtt{r}}+1)/2 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img892.png.webp)

elements. The above formula can be obtained as shown in Figure 2.6.

```
    List<T[]> blocks;
    int n;
```

**Figure 2.6:** The number of white squares is $$ 1+2+3+\cdots+\ensuremath{\mathtt{r}}$$ . The number of shaded squares is the same. Together the white and shaded squares make a rectangle consisting of $$ \ensuremath{\mathtt{r}}(\ensuremath{\mathtt{r}}+1)$$ squares. ![\includegraphics[scale=0.90909]{figs/gauss}](/images/open-data-structures/2_6_RootishArrayStack_Space-img896.png.webp) As we might expect, the elements of the list are laid out in order within the blocks. The list element with index 0 is stored in block 0, elements with list indices 1 and 2 are stored in block 1, elements with list indices 3, 4, and 5 are stored in block 2, and so on. The main problem we have to address is that of determining, given an index $$ \ensuremath{\mathtt{i}}$$ , which block contains $$ \mathtt{i}$$ as well as the index corresponding to $$ \mathtt{i}$$ within that block. Determining the index of $$ \mathtt{i}$$ within its block turns out to be easy. If index $$ \mathtt{i}$$ is in block $$ \mathtt{b}$$ , then the number of elements in blocks $$ 0,\ldots,\ensuremath{\mathtt{b}}-1$$ is $$ \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)/2$$ . Therefore, $$ \mathtt{i}$$ is stored at location

![$\displaystyle \ensuremath{\mathtt{j}} = \ensuremath{\mathtt{i}} - \ensuremath{\mathtt{b}}(\ensuremath{\mathtt{b}}+1)/2 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img910.png.webp)

within block $$ \mathtt{b}$$ . Somewhat more challenging is the problem of determining the value of $$ \mathtt{b}$$ . The number of elements that have indices less than or equal to $$ \mathtt{i}$$ is $$ \ensuremath{\mathtt{i}}+1$$ . On the other hand, the number of elements in blocks 0,...,b is $$ (\ensuremath{\mathtt{b}}+1)(\ensuremath{\mathtt{b}}+2)/2$$ . Therefore, $$ \mathtt{b}$$ is the smallest integer such that

![$\displaystyle (\ensuremath{\mathtt{b}}+1)(\ensuremath{\mathtt{b}}+2)/2 \ge \ensuremath{\mathtt{i}}+1 \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img917.png.webp)

We can rewrite this equation as

![$\displaystyle \ensuremath{\mathtt{b}}^2 + 3\ensuremath{\mathtt{b}} - 2\ensuremath{\mathtt{i}} \ge 0 \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img918.png.webp)

The corresponding quadratic equation $$ \ensuremath{\mathtt{b}}^2 + 3\ensuremath{\mathtt{b}} - 2\ensuremath{\mathtt{i}} = 0$$ has two solutions: $$ \ensuremath{\mathtt{b}}=(-3 + \sqrt{9+8\ensuremath{\mathtt{i}}}) / 2$$ and $$ \ensuremath{\mathtt{b}}=(-3 - \sqrt{9+8\ensuremath{\mathtt{i}}}) / 2$$ . The second solution makes no sense in our application since it always gives a negative value. Therefore, we obtain the solution $$ \ensuremath{\mathtt{b}} = (-3 + \sqrt{9+8i}) / 2$$ . In general, this solution is not an integer, but going back to our inequality, we want the smallest integer $$ \ensuremath{\mathtt{b}}$$ such that $$ \ensuremath{\mathtt{b}} \ge (-3 + \sqrt{9+8i}) / 2$$ . This is simply

![$\displaystyle \ensuremath{\mathtt{b}} = \left\lceil(-3 + \sqrt{9+8i}) / 2\right\rceil \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img925.png.webp)

```
     int i2b(int i) {
        double db = (-3.0 + Math.sqrt(9 + 8*i)) / 2.0;
        int b = (int)Math.ceil(db);
        return b; 
    }
```

With this out of the way, the $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ methods are straightforward. We first compute the appropriate block $$ \mathtt{b}$$ and the appropriate index $$ \mathtt{j}$$ within the block and then perform the appropriate operation:

```
    T get(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        int b = i2b(i);
        int j = i - b*(b+1)/2;
        return blocks.get(b)[j];
    }
    T set(int i, T x) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        int b = i2b(i);
        int j = i - b*(b+1)/2;
        T y = blocks.get(b)[j];
        blocks.get(b)[j] = x;
        return y;
    }
```

If we use any of the data structures in this chapter for representing the $$ \mathtt{blocks}$$ list, then $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ will each run in constant time. The $$ \mathtt{add(i,x)}$$ method will, by now, look familiar. We first check to see if our data structure is full, by checking if the number of blocks, $$ \mathtt{r}$$ , is such that $$ \ensuremath{\mathtt{r}}(\ensuremath{\mathtt{r}}+1)/2 = \ensuremath{\mathtt{n}}$$ . If so, we call $$ \mathtt{grow()}$$ to add another block. With this done, we shift elements with indices $$ \ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{n}}-1$$ to the right by one position to make room for the new element with index $$ \mathtt{i}$$ :

```
    void add(int i, T x) {
        if (i < 0 || i > n) throw new IndexOutOfBoundsException();
        int r = blocks.size();
        if (r*(r+1)/2 < n + 1) grow();
        n++;
        for (int j = n-1; j > i; j--)
            set(j, get(j-1));
        set(i, x);
    }
```

The $$ \mathtt{grow()}$$ method does what we expect. It adds a new block:

```
    void grow() {
        blocks.add(newArray(blocks.size()+1));
    }
```

Ignoring the cost of the $$ \mathtt{grow()}$$ operation, the cost of an $$ \mathtt{add(i,x)}$$ operation is dominated by the cost of shifting and is therefore $$ O(1+\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ , just like an ArrayStack. The $$ \mathtt{remove(i)}$$ operation is similar to $$ \mathtt{add(i,x)}$$ . It shifts the elements with indices $$ \ensuremath{\mathtt{i}}+1,\ldots,\ensuremath{\mathtt{n}}$$ left by one position and then, if there is more than one empty block, it calls the $$ \mathtt{shrink()}$$ method to remove all but one of the unused blocks:

```
    T remove(int i) {
        if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
        T x = get(i);
        for (int j = i; j < n-1; j++)
            set(j, get(j+1));
        n--;
        int r = blocks.size();
        if ((r-2)*(r-1)/2 >= n)    shrink();
        return x;
    }
```

```
    void shrink() {
        int r = blocks.size();
        while (r > 0 && (r-2)*(r-1)/2 >= n) {
            blocks.remove(blocks.size()-1);
            r--;
        }
    }
```

Once again, ignoring the cost of the $$ \mathtt{shrink()}$$ operation, the cost of a $$ \mathtt{remove(i)}$$ operation is dominated by the cost of shifting and is therefore $$ O(\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ . 2.6.1 Analysis of Growing and Shrinking The above analysis of $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ does not account for the cost of $$ \mathtt{grow()}$$ and $$ \mathtt{shrink()}$$ . Note that, unlike the $$ \mathtt{ArrayStack.resize()}$$ operation, $$ \mathtt{grow()}$$ and $$ \mathtt{shrink()}$$ do not copy any data. They only allocate or free an array of size $$ \mathtt{r}$$ . In some environments, this takes only constant time, while in others, it may require time proportional to $$ \mathtt{r}$$ . We note that, immediately after a call to $$ \mathtt{grow()}$$ or $$ \mathtt{shrink()}$$ , the situation is clear. The final block is completely empty, and all other blocks are completely full. Another call to $$ \mathtt{grow()}$$ or $$ \mathtt{shrink()}$$ will not happen until at least $$ \ensuremath{\mathtt{r}}-1$$ elements have been added or removed. Therefore, even if $$ \mathtt{grow()}$$ and $$ \mathtt{shrink()}$$ take $$ O(\ensuremath{\mathtt{r}})$$ time, this cost can be amortized over at least $$ \ensuremath{\mathtt{r}}-1$$ $$ \mathtt{add(i,x)}$$ or $$ \mathtt{remove(i)}$$ operations, so that the amortized cost of $$ \mathtt{grow()}$$ and $$ \mathtt{shrink()}$$ is $$ O(1)$$ per operation. 2.6.2 Space Usage Next, we analyze the amount of extra space used by a RootishArrayStack. In particular, we want to count any space used by a RootishArrayStack that is not an array element currently used to hold a list element. We call all such space wasted space. The $$ \mathtt{remove(i)}$$ operation ensures that a RootishArrayStack never has more than two blocks that are not completely full. The number of blocks, $$ \mathtt{r}$$ , used by a RootishArrayStack that stores $$ \mathtt{n}$$ elements therefore satisfies

![$\displaystyle (\ensuremath{\mathtt{r}}-2)(\ensuremath{\mathtt{r}}-1) \le \ensuremath{\mathtt{n}} \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img976.png.webp)

Again, using the quadratic equation on this gives

![$\displaystyle \ensuremath{\mathtt{r}} \le (3+\sqrt{1+4\ensuremath{\mathtt{n}}})/2 = O(\sqrt{\ensuremath{\mathtt{n}}}) \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img977.png.webp)

The last two blocks have sizes $$ \mathtt{r}$$ and $$ \mathtt{r-1}$$ , so the space wasted by these two blocks is at most $$ 2\ensuremath{\mathtt{r}}-1 = O(\sqrt{\ensuremath{\mathtt{n}}})$$ . If we store the blocks in (for example) an ArrayStack, then the amount of space wasted by the List that stores those $$ \mathtt{r}$$ blocks is also $$ O(\ensuremath{\mathtt{r}})=O(\sqrt{\ensuremath{\mathtt{n}}})$$ . The other space needed for storing $$ \mathtt{n}$$ and other accounting information is $$ O(1)$$ . Therefore, the total amount of wasted space in a RootishArrayStack is $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ .

Next, we argue that this space usage is optimal for any data structure that starts out empty and can support the addition of one item at a time. More precisely, we will show that, at some point during the addition of $$ \mathtt{n}$$ items, the data structure is wasting an amount of space at least in $$ \sqrt{\ensuremath{\mathtt{n}}}$$ (though it may be only wasted for a moment). Suppose we start with an empty data structure and we add $$ \mathtt{n}$$ items one at a time. At the end of this process, all $$ \mathtt{n}$$ items are stored in the structure and distributed among a collection of $$ \mathtt{r}$$ memory blocks. If $$ \ensuremath{\mathtt{r}}\ge \sqrt{\ensuremath{\mathtt{n}}}$$ , then the data structure must be using $$ \mathtt{r}$$ pointers (or references) to keep track of these $$ \mathtt{r}$$ blocks, and these pointers are wasted space. On the other hand, if $$ \ensuremath{\mathtt{r}} < \sqrt{\ensuremath{\mathtt{n}}}$$ then, by the pigeonhole principle, some block must have a size of at least $$ \ensuremath{\mathtt{n}}/\ensuremath{\mathtt{r}} > \sqrt{\ensuremath{\mathtt{n}}}$$ . Consider the moment at which this block was first allocated. Immediately after it was allocated, this block was empty, and was therefore wasting $$ \sqrt{\ensuremath{\mathtt{n}}}$$ space. Therefore, at some point in time during the insertion of $$ \mathtt{n}$$ elements, the data structure was wasting $$ \sqrt{\ensuremath{\mathtt{n}}}$$ space. 2.6.3 Summary The following theorem summarizes our discussion of the RootishArrayStack data structure: **Theorem 2..5** *A RootishArrayStack implements the List interface. Ignoring the cost of calls to $$ \mathtt{grow()}$$ and $$ \mathtt{shrink()}$$ , a RootishArrayStack supports the operations * $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ in $$ O(1)$$ time per operation; and $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ in $$ O(1+\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}})$$ time per operation. * Furthermore, beginning with an empty RootishArrayStack, any sequence of $$ m$$ $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operations results in a total of $$ O(m)$$ time spent during all calls to $$ \mathtt{grow()}$$ and $$ \mathtt{shrink()}$$ . * *The space (measured in words)2.3 used by a RootishArrayStack that stores $$ \mathtt{n}$$ elements is $$ \ensuremath{\mathtt{n}} +O(\sqrt{\ensuremath{\mathtt{n}}})$$ .*

2.6.4 Computing Square Roots A reader who has had some exposure to models of computation may notice that the RootishArrayStack, as described above, does not fit into the usual word-RAM model of computation (Section 1.4) because it requires taking square roots. The square root operation is generally not considered a basic operation and is therefore not usually part of the word-RAM model. In this section, we show that the square root operation can be implemented efficiently. In particular, we show that for any integer $$ \ensuremath{\mathtt{x}}\in\{0,\ldots,\ensuremath{\mathtt{n}}\}$$ , $$ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$$ can be computed in constant-time, after $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ preprocessing that creates two arrays of length $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ . The following lemma shows that we can reduce the problem of computing the square root of $$ \mathtt{x}$$ to the square root of a related value $$ \mathtt{x'}$$ . **Lemma 2..3** *Let $$ \ensuremath{\mathtt{x}}\ge 1$$ and let $$ \ensuremath{\mathtt{x'}}=\ensuremath{\mathtt{x}}-a$$ , where $$ 0\le a\le\sqrt{\ensuremath{\mathtt{x}}}$$ . Then $$ \sqrt{x'} \ge \sqrt{\ensuremath{\mathtt{x}}}-1$$ .*

*Proof*. It suffices to show that

![$\displaystyle \sqrt{\ensuremath{\mathtt{x}}-\sqrt{\ensuremath{\mathtt{x}}}} \ge \sqrt{\ensuremath{\mathtt{x}}}-1 \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1026.png.webp)

Square both sides of this inequality to get

![$\displaystyle \ensuremath{\mathtt{x}}-\sqrt{\ensuremath{\mathtt{x}}} \ge \ensuremath{\mathtt{x}}-2\sqrt{\ensuremath{\mathtt{x}}}+1 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1027.png.webp)

and gather terms to get

![$\displaystyle \sqrt{\ensuremath{\mathtt{x}}} \ge 1 $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1028.png.webp)

which is clearly true for any $$ \ensuremath{\mathtt{x}}\ge 1$$ . ![$ \qedsymbol$](/images/open-data-structures/2_6_RootishArrayStack_Space-img1025.png.webp)

Start by restricting the problem a little, and assume that $$ 2^{\ensuremath{\mathtt{r}}} \le \ensuremath{\mathtt{x}} < 2^{\ensuremath{\mathtt{r}}+1}$$ , so that $$ \lfloor\log \ensuremath{\mathtt{x}}\rfloor=\ensuremath{\mathtt{r}}$$ , i.e., $$ \mathtt{x}$$ is an integer having $$ \ensuremath{\mathtt{r}}+1$$ bits in its binary representation. We can take $$ \ensuremath{\mathtt{x'}}=\ensuremath{\mathtt{x}} - (\ensuremath{\mathtt{x}}\bmod 2^{\lfloor r/2\rfloor})$$ . Now, $$ \mathtt{x'}$$ satisfies the conditions of Lemma 2.3, so $$ \sqrt{\ensuremath{\mathtt{x}}}-\sqrt{\ensuremath{\mathtt{x'}}} \le 1$$ . Furthermore, $$ \mathtt{x'}$$ has all of its lower-order $$ \lfloor \ensuremath{\mathtt{r}}/2\rfloor$$ bits equal to 0, so there are only

![$\displaystyle 2^{\ensuremath{\mathtt{r}}+1-\lfloor \ensuremath{\mathtt{r}}/2\rfloor} \le 4\cdot2^{\ensuremath{\mathtt{r}}/2} \le 4\sqrt{\ensuremath{\mathtt{x}}} $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1039.png.webp)

possible values of $$ \mathtt{x'}$$ . This means that we can use an array, $$ \mathtt{sqrttab}$$ , that stores the value of $$ \lfloor\sqrt{\ensuremath{\mathtt{x'}}}\rfloor$$ for each possible value of $$ \mathtt{x'}$$ . A little more precisely, we have

![$\displaystyle \ensuremath{\mathtt{sqrttab}}[i] = \left\lfloor \sqrt{i 2^{\lfloor \ensuremath{\mathtt{r}}/2\rfloor}} \right\rfloor \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1044.png.webp)

In this way, $$ \ensuremath{\mathtt{sqrttab}}[i]$$ is within 2 of $$ \sqrt{\ensuremath{\mathtt{x}}}$$ for all $$ \ensuremath{\mathtt{x}}\in\{i2^{\lfloor r/2\rfloor},\ldots,(i+1)2^{\lfloor r/2\rfloor}-1\}$$ . Stated another way, the array entry $$ \ensuremath{\mathtt{s}}=\ensuremath{\mathtt{sqrttab}}[\ensuremath{\mathtt{x}}\ensuremath{\mathtt{\text{\ttfamily >>}}}\lfloor \ensuremath{\mathtt{r}}/2\rfloor]$$ is either equal to $$ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$$ , $$ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor-1$$ , or $$ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor-2$$ . From $$ \mathtt{s}$$ we can determine the value of $$ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$$ by incrementing $$ \mathtt{s}$$ until $$ (\ensuremath{\mathtt{s}}+1)^2 > \ensuremath{\mathtt{x}}$$ .

```
    int sqrt(int x, int r) {
        int s = sqrtab[x>>r/2];
        while ((s+1)*(s+1) <= x) s++; // executes at most twice
        return s;
    }
```

Now, this only works for $$ \ensuremath{\mathtt{x}}\in\{2^{\ensuremath{\mathtt{r}}},\ldots,2^{\ensuremath{\mathtt{r}}+1}-1\}$$ and $$ \mathtt{sqrttab}$$ is a special table that only works for a particular value of $$ \ensuremath{\mathtt{r}}=\lfloor\log \ensuremath{\mathtt{x}}\rfloor$$ . To overcome this, we could compute $$ \lfloor\log \ensuremath{\mathtt{n}}\rfloor$$ different $$ \mathtt{sqrttab}$$ arrays, one for each possible value of $$ \lfloor\log \ensuremath{\mathtt{x}}\rfloor$$ . The sizes of these tables form an exponential sequence whose largest value is at most $$ 4\sqrt{\ensuremath{\mathtt{n}}}$$ , so the total size of all tables is $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ .

However, it turns out that more than one $$ \mathtt{sqrttab}$$ array is unnecessary; we only need one $$ \mathtt{sqrttab}$$ array for the value $$ \ensuremath{\mathtt{r}}=\lfloor\log \ensuremath{\mathtt{n}}\rfloor$$ . Any value $$ \mathtt{x}$$ with $$ \log\ensuremath{\mathtt{x}}=\ensuremath{\mathtt{r'}}<\ensuremath{\mathtt{r}}$$ can be upgraded by multiplying $$ \mathtt{x}$$ by $$ 2^{\ensuremath{\mathtt{r}}-\ensuremath{\mathtt{r'}}}$$ and using the equation

![$\displaystyle \sqrt{2^{\ensuremath{\mathtt{r}}-\ensuremath{\mathtt{r'}}}x} = 2^... ...thtt{r}}-\ensuremath{\mathtt{r}}')/2}\sqrt{\ensuremath{\mathtt{x}}} \enspace . $](/images/open-data-structures/2_6_RootishArrayStack_Space-img1071.png.webp)

The quantity $$ 2^{\ensuremath{\mathtt{r}}-\ensuremath{\mathtt{r}}'}x$$ is in the range $$ \{2^{\ensuremath{\mathtt{r}}},\ldots,2^{\ensuremath{\mathtt{r}}+1}-1\}$$ so we can look up its square root in $$ \mathtt{sqrttab}$$ . The following code implements this idea to compute $$ \lfloor\sqrt{\ensuremath{\mathtt{x}}}\rfloor$$ for all non-negative integers $$ \mathtt{x}$$ in the range $$ \{0,\ldots,2^{30}-1\}$$ using an array, $$ \mathtt{sqrttab}$$ , of size $$ 2^{16}$$ .

```
    int sqrt(int x) {
        int rp = log(x);
        int upgrade = ((r-rp)/2) * 2;
        int xp = x << upgrade;  // xp has r or r-1 bits
        int s = sqrtab[xp>>(r/2)] >> (upgrade/2);
        while ((s+1)*(s+1) <= x) s++;  // executes at most twice
        return s;
    }
```

Something we have taken for granted thus far is the question of how to compute $$ \ensuremath{\mathtt{r}}'=\lfloor\log\ensuremath{\mathtt{x}}\rfloor$$ . Again, this is a problem that can be solved with an array, $$ \mathtt{logtab}$$ , of size $$ 2^{\ensuremath{\mathtt{r}}/2}$$ . In this case, the code is particularly simple, since $$ \lfloor\log \ensuremath{\mathtt{x}}\rfloor$$ is just the index of the most significant 1 bit in the binary representation of $$ \mathtt{x}$$ . This means that, for $$ \ensuremath{\mathtt{x}}>2^{\ensuremath{\mathtt{r}}/2}$$ , we can right-shift the bits of $$ \mathtt{x}$$ by $$ \ensuremath{\mathtt{r}}/2$$ positions before using it as an index into $$ \mathtt{logtab}$$ . The following code does this using an array $$ \mathtt{logtab}$$ of size $$ 2^{16}$$ to compute $$ \lfloor\log \ensuremath{\mathtt{x}}\rfloor$$ for all $$ \mathtt{x}$$ in the range $$ \{1,\ldots,2^{32}-1\}$$ .

```
    int log(int x) {
        if (x >= halfint)
            return 16 + logtab[x>>>16];
        return logtab[x];
    }
```

Finally, for completeness, we include the following code that initializes $$ \mathtt{logtab}$$ and $$ \mathtt{sqrttab}$$ :

```
    void inittabs() {
        sqrtab = new int[1<<(r/2)];
        logtab = new int[1<<(r/2)];
        for (int d = 0; d < r/2; d++) 
            Arrays.fill(logtab, 1<<d, 2<<d, d);
        int s = 1<<(r/4);                    // sqrt(2^(r/2))
        for (int i = 0; i < 1<<(r/2); i++) {
            if ((s+1)*(s+1) <= i << (r/2)) s++; // sqrt increases
            sqrtab[i] = s;
        }
    }
```

To summarize, the computations done by the $$ \mathtt{i2b(i)}$$ method can be implemented in constant time on the word-RAM using $$ O(\sqrt{n})$$ extra memory to store the $$ \mathtt{sqrttab}$$ and $$ \mathtt{logtab}$$ arrays. These arrays can be rebuilt when $$ \mathtt{n}$$ increases or decreases by a factor of two, and the cost of this rebuilding can be amortized over the number of $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ operations that caused the change in $$ \mathtt{n}$$ in the same way that the cost of $$ \mathtt{resize()}$$ is analyzed in the ArrayStack implementation.

#### Footnotes

... words)2.3 Recall Section 1.4 for a discussion of how memory is measured. [opendatastructures.org](http://opendatastructures.org/)

## 2.7 Discussion and Exercises

Most of the data structures described in this chapter are folklore. They can be found in implementations dating back over 30 years. For example, implementations of stacks, queues, and deques, which generalize easily to the ArrayStack, ArrayQueue and ArrayDeque structures described here, are discussed by Knuth [46, Section 2.2.2]. Brodnik et al. [13] seem to have been the first to describe the RootishArrayStack and prove a $$ \sqrt{n}$$ lower-bound like that in Section 2.6.2. They also present a different structure that uses a more sophisticated choice of block sizes in order to avoid computing square roots in the $$ \mathtt{i2b(i)}$$ method. Within their scheme, the block containing $$ \mathtt{i}$$ is block $$ \lfloor\log (\ensuremath{\mathtt{i}}+1)\rfloor$$ , which is simply the index of the leading 1 bit in the binary representation of $$ \ensuremath{\mathtt{i}}+1$$ . Some computer architectures provide an instruction for computing the index of the leading 1-bit in an integer. In Java, the Integer class provides a method $$ \mathtt{numberOfLeadingZeros(i)}$$ from which one can easily compute $$ \lfloor\log (\ensuremath{\mathtt{i}}+1)\rfloor$$ . A structure related to the RootishArrayStack is the two-level tiered-vector of Goodrich and Kloss [35]. This structure supports the $$ \mathtt{get(i,x)}$$ and $$ \mathtt{set(i,x)}$$ operations in constant time and $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ in $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ time. These running times are similar to what can be achieved with the more careful implementation of a RootishArrayStack discussed in Exercise 2.11. **Exercise 2..1** In the ArrayStack implementation, after the first call to $$ \mathtt{remove(i)}$$ , the backing array, $$ \mathtt{a}$$ , contains $$ \ensuremath{\mathtt{n}}+1$$ non- $$ \mathtt{null}$$ values despite the fact that the ArrayStack only contains $$ \mathtt{n}$$ elements. Where is the extra non- $$ \mathtt{null}$$ value? Discuss any consequences this non- $$ \mathtt{null}$$ value might have on the Java Runtime Environment's memory manager.

**Exercise 2..2** The List method $$ \mathtt{addAll(i,c)}$$ inserts all elements of the Collection $$ \mathtt{c}$$ into the list at position $$ \mathtt{i}$$ . (The $$ \mathtt{add(i,x)}$$ method is a special case where $$ \ensuremath{\mathtt{c}}=\{\ensuremath{\mathtt{x}}\}$$ .) Explain why, for the data structures in this chapter, it is not efficient to implement $$ \mathtt{addAll(i,c)}$$ by repeated calls to $$ \mathtt{add(i,x)}$$ . Design and implement a more efficient implementation.

**Exercise 2..3** Design and implement a RandomQueue. This is an implementation of the Queue interface in which the $$ \mathtt{remove()}$$ operation removes an element that is chosen uniformly at random among all the elements currently in the queue. (Think of a RandomQueue as a bag in which we can add elements or reach in and blindly remove some random element.) The $$ \mathtt{add(x)}$$ and $$ \mathtt{remove()}$$ operations in a RandomQueue should run in constant time per operation.

**Exercise 2..4** Design and implement a Treque (triple-ended queue). This is a List implementation in which $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ run in constant time and $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ run in time

![$\displaystyle O(1+\min\{\ensuremath{\mathtt{i}}, \ensuremath{\mathtt{n}}-\ensur... ...}}, \vert\ensuremath{\mathtt{n}}/2-\ensuremath{\mathtt{i}}\vert\}) \enspace . $](/images/open-data-structures/2_7_Discussion_Exercises-img1138.png.webp)

In other words, modifications are fast if they are near either end or near the middle of the list.

**Exercise 2..5** Implement a method $$ \mathtt{rotate(a,r)}$$ that ``rotates'' the array $$ \mathtt{a}$$ so that $$ \mathtt{a[i]}$$ moves to $$ \ensuremath{\mathtt{a}}[(\ensuremath{\mathtt{i}}+\ensuremath{\mathtt{r}})\bmod \ensuremath{\mathtt{a.length}}]$$ , for all $$ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{a.length}}\}$$ .

**Exercise 2..6** Implement a method $$ \mathtt{rotate(r)}$$ that ``rotates'' a List so that list item $$ \mathtt{i}$$ becomes list item $$ (\ensuremath{\mathtt{i}}+\ensuremath{\mathtt{r}})\bmod \ensuremath{\mathtt{n}}$$ . When run on an ArrayDeque, or a DualArrayDeque, $$ \mathtt{rotate(r)}$$ should run in $$ O(1+\min\{\ensuremath{\mathtt{r}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{r}}\})$$ time.

**Exercise 2..7** Modify the ArrayDeque implementation so that the shifting done by $$ \mathtt{add(i,x)}$$ , $$ \mathtt{remove(i)}$$ , and $$ \mathtt{resize()}$$ is done using the faster $$ \mathtt{System.arraycopy(s,i,d,j,n)}$$ method.

**Exercise 2..8** Modify the ArrayDeque implementation so that it does not use the $$ \mathtt{\text{\ttfamily\%}}$$ operator (which is expensive on some systems). Instead, it should make use of the fact that, if $$ \mathtt{a.length}$$ is a power of 2, then

![$\displaystyle \ensuremath{\mathtt{k\text{\ttfamily\%}a.length}}=\ensuremath{\mathtt{k\text{\ttfamily\&}(a.length-1)}} \enspace . $](/images/open-data-structures/2_7_Discussion_Exercises-img1155.png.webp)

(Here, $$ \mathtt{\text{\ttfamily\&}}$$ is the bitwise-and operator.)

**Exercise 2..9** Design and implement a variant of ArrayDeque that does not do any modular arithmetic at all. Instead, all the data sits in a consecutive block, in order, inside an array. When the data overruns the beginning or the end of this array, a modified $$ \mathtt{rebuild()}$$ operation is performed. The amortized cost of all operations should be the same as in an ArrayDeque. Hint: Getting this to work is really all about how you implement the $$ \mathtt{rebuild()}$$ operation. You would like $$ \mathtt{rebuild()}$$ to put the data structure into a state where the data cannot run off either end until at least $$ \ensuremath{\mathtt{n}}/2$$ operations have been performed. Test the performance of your implementation against the ArrayDeque. Optimize your implementation (by using $$ \mathtt{System.arraycopy(a,i,b,i,n)}$$ ) and see if you can get it to outperform the ArrayDeque implementation.

**Exercise 2..10** Design and implement a version of a RootishArrayStack that has only $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ wasted space, but that can perform $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i,x)}$$ operations in $$ O(1+\min\{\ensuremath{\mathtt{i}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ time.

**Exercise 2..11** Design and implement a version of a RootishArrayStack that has only $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ wasted space, but that can perform $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i,x)}$$ operations in $$ O(1+\min\{\sqrt{\ensuremath{\mathtt{n}}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ time. (For an idea on how to do this, see Section 3.3.)

**Exercise 2..12** Design and implement a version of a RootishArrayStack that has only $$ O(\sqrt{\ensuremath{\mathtt{n}}})$$ wasted space, but that can perform $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i,x)}$$ operations in $$ O(1+\min\{\ensuremath{\mathtt{i}},\sqrt {\ensuremath{\mathtt{n}}},\ensuremath{\mathtt{n}}-\ensuremath{\mathtt{i}}\})$$ time. (See Section 3.3 for ideas on how to achieve this.)

**Exercise 2..13** Design and implement a CubishArrayStack. This three level structure implements the List interface using $$ O(\ensuremath{\mathtt{n}}^{2/3})$$ wasted space. In this structure, $$ \mathtt{get(i)}$$ and $$ \mathtt{set(i,x)}$$ take constant time; while $$ \mathtt{add(i,x)}$$ and $$ \mathtt{remove(i)}$$ take $$ O(\ensuremath{\mathtt{n}}^{1/3})$$ amortized time.

[opendatastructures.org](http://opendatastructures.org/)
