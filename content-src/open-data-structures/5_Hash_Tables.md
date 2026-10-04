---
title: "5. Hash Tables"
lang: en
---

Hash tables are an efficient method of storing a small number, $ \mathtt{n}$ , of integers from a large range $ U=\{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ . The term hash table includes a broad range of data structures. The first part of this chapter focuses on two of the most common implementations of hash tables: hashing with chaining and linear probing. Very often hash tables store types of data that are not integers. In this case, an integer hash code is associated with each data item and is used in the hash table. The second part of this chapter discusses how such hash codes are generated. Some of the methods used in this chapter require random choices of integers in some specific range. In the code samples, some of these ``random'' integers are hard-coded constants. These constants were obtained using random bits generated from atmospheric noise.

**Subsections**

[opendatastructures.org](http://opendatastructures.org/)

## 5.1 ChainedHashTable: Hashing with Chaining

**Subsections**

# 5.1 ChainedHashTable: Hashing with Chaining

A ChainedHashTable data structure uses hashing with chaining to store data as an array, $ \mathtt{t}$ , of lists. An integer, $ \mathtt{n}$ , keeps track of the total number of items in all lists (see Figure 5.1):

```
    List<T>[] t;
    int n;
```

The hash value of a data item $ \mathtt{x}$ , denoted $ \mathtt{hash(x)}$ is a value in the range $ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$ . All items with hash value $ \mathtt{i}$ are stored in the list at $ \mathtt{t[i]}$ . To ensure that lists don't get too long, we maintain the invariant

![$\displaystyle \ensuremath{\mathtt{n}} \le \ensuremath{\mathtt{t.length}} $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img1941.png.webp)

so that the average number of elements stored in one of these lists is $ \ensuremath{\mathtt{n}}/\ensuremath{\mathtt{t.length}} \le 1$ . To add an element, $ \mathtt{x}$ , to the hash table, we first check if the length of $ \mathtt{t}$ needs to be increased and, if so, we grow $ \mathtt{t}$ . With this out of the way we hash $ \mathtt{x}$ to get an integer, $ \mathtt{i}$ , in the range $ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$ , and we append $ \mathtt{x}$ to the list $ \mathtt{t[i]}$ :

```
    boolean add(T x) {
        if (find(x) != null) return false;
        if (n+1 > t.length) resize();
        t[hash(x)].add(x);
        n++;
        return true;
    }
```

Growing the table, if necessary, involves doubling the length of $ \mathtt{t}$ and reinserting all elements into the new table. This strategy is exactly the same as the one used in the implementation of ArrayStack and the same result applies: The cost of growing is only constant when amortized over a sequence of insertions (see Lemma 2.1 on page ![[*]](/images/open-data-structures/5_1_ChainedHashTable_Hashin-crossref.png.webp) ). Besides growing, the only other work done when adding a new value $ \mathtt{x}$ to a ChainedHashTable involves appending $ \mathtt{x}$ to the list $ \mathtt{t[hash(x)]}$ . For any of the list implementations described in Chapters 2 or 3, this takes only constant time. To remove an element, $ \mathtt{x}$ , from the hash table, we iterate over the list $ \mathtt{t[hash(x)]}$ until we find $ \mathtt{x}$ so that we can remove it:

```
    T remove(T x) {
        Iterator<T> it = t[hash(x)].iterator();
        while (it.hasNext()) {
            T y = it.next();
            if (y.equals(x)) {
                it.remove();
                n--;
                return y;
            }
        }
        return null;
    }
```

This takes $ O(\ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{hash(x)}}})$ time, where $ \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{i}}}$ denotes the length of the list stored at $ \mathtt{t[i]}$ . Searching for the element $ \mathtt{x}$ in a hash table is similar. We perform a linear search on the list $ \mathtt{t[hash(x)]}$ :

```
    T find(Object x) {
        for (T y : t[hash(x)])
            if (y.equals(x))
                return y;
        return null;
    }
```

Again, this takes time proportional to the length of the list $ \mathtt{t[hash(x)]}$ .

The performance of a hash table depends critically on the choice of the hash function. A good hash function will spread the elements evenly among the $ \mathtt{t.length}$ lists, so that the expected size of the list $ \mathtt{t[hash(x)]}$ is $ O(\ensuremath{\mathtt{n}}/\ensuremath{\mathtt{t.length)}} = O(1)$ . On the other hand, a bad hash function will hash all values (including $ \mathtt{x}$ ) to the same table location, in which case the size of the list $ \mathtt{t[hash(x)]}$ will be $ \mathtt{n}$ . In the next section we describe a good hash function. 5.1.1 Multiplicative Hashing Multiplicative hashing is an efficient method of generating hash values based on modular arithmetic (discussed in Section 2.3) and integer division. It uses the $ \ddiv $ operator, which calculates the integral part of a quotient, while discarding the remainder. Formally, for any integers $ a\ge 0$ and $ b\ge 1$ , $ a\ddiv b = \lfloor a/b\rfloor$ . In multiplicative hashing, we use a hash table of size $ 2^{\ensuremath{\mathtt{d}}}$ for some integer $ \mathtt{d}$ (called the dimension). The formula for hashing an integer $ \ensuremath{\mathtt{x}}\in\{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ is

![$\displaystyle \ensuremath{\mathtt{hash(x)}} = ((\ensuremath{\mathtt{z}}\cdot\en... ...htt{w}}}) \ddiv 2^{\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}} \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img1977.png.webp)

Here, $ \mathtt{z}$ is a randomly chosen odd integer in $ \{1,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ . This hash function can be realized very efficiently by observing that, by default, operations on integers are already done modulo $ 2^{\ensuremath{\mathtt{w}}}$ where $ \ensuremath{\mathtt{w}}$ is the number of bits in an integer.5.1 (See Figure 5.2.) Furthermore, integer division by $ 2^{\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}}$ is equivalent to dropping the rightmost $ \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$ bits in a binary representation (which is implemented by shifting the bits right by $ \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$ using the $ \mathtt{\text{\ttfamily >>>}}$ operator). In this way, the code that implements the above formula is simpler than the formula itself:

```
    int hash(Object x) {
        return (z * x.hashCode()) >>> (w-d);
    }
```

**Figure 5.2:** The operation of the multiplicative hash function with $ \ensuremath{\mathtt{w}}=32$ and $ \ensuremath{\mathtt{d}}=8$ . ![\begin{figure}\begin{center} \resizebox{.98\textwidth}{!}{ \setlength{\arrayru... ... \end{tabular}} \setlength{\arrayrulewidth}{.4pt} \end{center} \end{figure}](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img1991.png.webp) The following lemma, whose proof is deferred until later in this section, shows that multiplicative hashing does a good job of avoiding collisions: **Lemma 5..1** *Let $ \mathtt{x}$ and $ \mathtt{y}$ be any two values in $ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ with $ \ensuremath{\mathtt{x}}\neq \ensuremath{\mathtt{y}}$ . Then $ \Pr\{\ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{hash(y)}}\} \le 2/2^{\ensuremath{\mathtt{d}}}$ .*

With Lemma 5.1, the performance of $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ are easy to analyze: **Lemma 5..2** *For any data value $ \mathtt{x}$ , the expected length of the list $ \mathtt{t[hash(x)]}$ is at most $ \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + 2$ , where $ \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}}$ is the number of occurrences of $ \mathtt{x}$ in the hash table.*

*Proof*. Let $ S$ be the (multi-)set of elements stored in the hash table that are not equal to $ \mathtt{x}$ . For an element $ \ensuremath{\mathtt{y}}\in S$ , define the indicator variable

![$\displaystyle I_{\ensuremath{\mathtt{y}}} = \left\{\begin{array}{ll} 1 & \mbox... ...\ensuremath{\mathtt{hash(y)}}$} \\ 0 & \mbox{otherwise} \end{array}\right. $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2008.png.webp)

and notice that, by Lemma 5.1, $ \mathrm{E}[I_{\ensuremath{\mathtt{y}}}] \le 2/2^{\ensuremath{\mathtt{d}}}=2/\ensuremath{\mathtt{t.length}}$ . The expected length of the list $ \mathtt{t[hash(x)]}$ is given by

| ![$\displaystyle \mathrm{E}\left[\ensuremath{\mathtt{t[hash(x)].size()}}\right]$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2011.png.webp) | ![$\displaystyle =$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2012.png.webp) | ![$\displaystyle \mathrm{E}\left[\ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} I_{\ensuremath{\mathtt{y}}}\right]$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2013.png.webp) |  |
| --- | --- | --- | --- |
|  | ![$\displaystyle =$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2014.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} \mathrm{E}[I_{\ensuremath{\mathtt{y}}} ]$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2015.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2016.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} 2/\ensuremath{\mathtt{t.length}}$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2017.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2018.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + \sum_{\ensuremath{\mathtt{y}}\in S} 2/\ensuremath{\mathtt{n}}$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2019.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2020.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + (\ensuremath{... ...n}}-\ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}})2/\ensuremath{\mathtt{n}}$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2021.png.webp) |  |
|  | ![$\displaystyle \le$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2022.png.webp) | ![$\displaystyle \ensuremath{\mathtt{n}}_{\ensuremath{\mathtt{x}}} + 2 \enspace ,$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2023.png.webp) |  |

as required. ![$ \qedsymbol$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2004.png.webp)

Now, we want to prove Lemma 5.1, but first we need a result from number theory. In the following proof, we use the notation $ (b_r,\ldots,b_0)_2$ to denote $ \sum_{i=0}^r b_i2^i$ , where each $ b_i$ is a bit, either 0 or 1. In other words, $ (b_r,\ldots,b_0)_2$ is the integer whose binary representation is given by $ b_r,\ldots,b_0$ . We use $ \star$ to denote a bit of unknown value. **Lemma 5..3** *Let $ S$ be the set of odd integers in $ \{1,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ ; let $ q$ and $ i$ be any two elements in $ S$ . Then there is exactly one value $ \ensuremath{\mathtt{z}}\in S$ such that $ \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = i$ .*

*Proof*. Since the number of choices for $ \ensuremath{\mathtt{z}}$ and $ i$ is the same, it is sufficient to prove that there is at most one value $ \ensuremath{\mathtt{z}}\in S$ that satisfies $ \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = i$ .

Suppose, for the sake of contradiction, that there are two such values $ \mathtt{z}$ and $ \mathtt{z'}$ , with $ \ensuremath{\mathtt{z}}>\ensuremath{\mathtt{z}}'$ . Then

![$\displaystyle \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = \ensuremath{\mathtt{z}}'q \bmod 2^{\ensuremath{\mathtt{w}}} = i $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2045.png.webp)

So

![$\displaystyle (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q\bmod 2^{\ensuremath{\mathtt{w}}} = 0 $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2046.png.webp)

But this means that

for some integer $ k$ . Thinking in terms of binary numbers, we have

![$\displaystyle (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q = k\cdot(1,\underbrace{0,\ldots,0}_{\ensuremath{\mathtt{w}}})_2 \enspace , $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2049.png.webp)

so that the $ \mathtt{w}$ trailing bits in the binary representation of $ (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q$ are all 0's.

Furthermore $ k\neq 0$ , since $ q\neq 0$ and $ \ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}'\neq 0$ . Since $ q$ is odd, it has no trailing 0's in its binary representation:

![$\displaystyle q = (\star,\ldots,\star,1)_2 \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2056.png.webp)

Since $ \vert\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}'\vert < 2^{\ensuremath{\mathtt{w}}}$ , $ \ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}'$ has fewer than $ \mathtt{w}$ trailing 0's in its binary representation:

![$\displaystyle \ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}' = (\star,\ldots,\star,1,\underbrace{0,\ldots,0}_{<\ensuremath{\mathtt{w}}})_2 \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2060.png.webp)

Therefore, the product $ (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q$ has fewer than $ \mathtt{w}$ trailing 0's in its binary representation:

![$\displaystyle (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q = (\star,\cdots,\star,1,\underbrace{0,\ldots,0}_{<\ensuremath{\mathtt{w}}})_2 \enspace . $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2063.png.webp)

Therefore $ (\ensuremath{\mathtt{z}}-\ensuremath{\mathtt{z}}')q$ cannot satisfy (5.1), yielding a contradiction and completing the proof. ![$ \qedsymbol$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2037.png.webp)

The utility of Lemma 5.3 comes from the following observation: If $ \mathtt{z}$ is chosen uniformly at random from $ S$ , then $ \mathtt{zt}$ is uniformly distributed over $ S$ . In the following proof, it helps to think of the binary representation of $ \mathtt{z}$ , which consists of $ \ensuremath{\mathtt{w}}-1$ random bits followed by a 1.

*Proof*. [Proof of Lemma 5.1] First we note that the condition $ \ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{hash(y)}}$ is equivalent to the statement ``the highest-order $ \mathtt{d}$ bits of $ \ensuremath{\mathtt{z}} \ensuremath{\mathtt{x}}\bmod2^{\ensuremath{\mathtt{w}}}$ and the highest-order $ \mathtt{d}$ bits of $ \ensuremath{\mathtt{z}} \ensuremath{\mathtt{y}}\bmod 2^{\ensuremath{\mathtt{w}}}$ are the same.'' A necessary condition of that statement is that the highest-order $ \mathtt{d}$ bits in the binary representation of $ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$ are either all 0's or all 1's. That is,

when $ \ensuremath{\mathtt{zx}}\bmod 2^{\ensuremath{\mathtt{w}}} > \ensuremath{\mathtt{zy}}\bmod 2^{\ensuremath{\mathtt{w}}}$ or

when $ \ensuremath{\mathtt{zx}}\bmod 2^{\ensuremath{\mathtt{w}}} < \ensuremath{\mathtt{zy}}\bmod 2^{\ensuremath{\mathtt{w}}}$ . Therefore, we only have to bound the probability that $ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$ looks like (5.2) or (5.3).

Let $ q$ be the unique odd integer such that $ (\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}=q2^r$ for some integer $ r\ge 0$ . By Lemma 5.3, the binary representation of $ \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}}$ has $ \ensuremath{\mathtt{w}}-1$ random bits, followed by a 1:

![$\displaystyle \ensuremath{\mathtt{z}}q\bmod 2^{\ensuremath{\mathtt{w}}} = (\und... ...{b_{\ensuremath{\mathtt{w}}-1},\ldots,b_{1}}_{\ensuremath{\mathtt{w}}-1},1)_2 $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2089.png.webp)

Therefore, the binary representation of ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 1](/images/open-data-structures/math-e09b57e6f33689d6bf9b.webp) has $ \ensuremath{\mathtt{w}}-r-1$ random bits, followed by a 1, followed by $ r$ 0's:

![$\displaystyle \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\math... ...ldots,b_{1}}_{\ensuremath{\mathtt{w}}-r-1},1,\underbrace{0,0,\ldots,0}_{r})_2 $](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2093.png.webp)

We can now finish the proof: If $ r > \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$ , then the $ \mathtt{d}$ higher order bits of $ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$ contain both 0's and 1's, so the probability that $ \ensuremath{\mathtt{z}}(\ensuremath{\mathtt{x}}-\ensuremath{\mathtt{y}})\bmod 2^{\ensuremath{\mathtt{w}}}$ looks like (5.2) or (5.3) is 0. If $ \ensuremath{\mathtt{r}}=\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$ , then the probability of looking like (5.2) is 0, but the probability of looking like (5.3) is $ 1/2^{\ensuremath{\mathtt{d}}-1}=2/2^{\ensuremath{\mathtt{d}}}$ (since we must have $ b_1,\ldots,b_{d-1}=1,\ldots,1$ ). If $ r < \ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}$ , then we must have $ b_{\ensuremath{\mathtt{w}}-r-1},\ldots,b_{\ensuremath{\mathtt{w}}-r-\ensuremath{\mathtt{d}}}=0,\ldots,0$ or $ b_{\ensuremath{\mathtt{w}}-r-1},\ldots,b_{\ensuremath{\mathtt{w}}-r-\ensuremath{\mathtt{d}}}=1,\ldots,1$ . The probability of each of these cases is $ 1/2^{\ensuremath{\mathtt{d}}}$ and they are mutually exclusive, so the probability of either of these cases is $ 2/2^{\ensuremath{\mathtt{d}}}$ . This completes the proof. ![$ \qedsymbol$](/images/open-data-structures/5_1_ChainedHashTable_Hashin-img2071.png.webp)

5.1.2 Summary The following theorem summarizes the performance of a ChainedHashTable data structure: **Theorem 5..1** *A ChainedHashTable implements the USet interface. Ignoring the cost of calls to $ \mathtt{grow()}$ , a ChainedHashTable supports the operations $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ in $ O(1)$ expected time per operation. * *Furthermore, beginning with an empty ChainedHashTable, any sequence of $ m$ $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations results in a total of $ O(m)$ time spent during all calls to $ \mathtt{grow()}$ .*

#### Footnotes

... integer.5.1 This is true for most programming languages including C, C#, C++, and Java. Notable exceptions are Python and Ruby, in which the result of a fixed-length $ \mathtt{w}$ -bit integer operation that overflows is upgraded to a variable-length representation. [opendatastructures.org](http://opendatastructures.org/)

## 5.2 LinearHashTable: Linear Probing

**Subsections**

# 5.2 LinearHashTable: Linear Probing

The ChainedHashTable data structure uses an array of lists, where the $ \mathtt{i}$ th list stores all elements $ \mathtt{x}$ such that $ \ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{i}}$ . An alternative, called open addressing is to store the elements directly in an array, $ \mathtt{t}$ , with each array location in $ \mathtt{t}$ storing at most one value. This approach is taken by the LinearHashTable described in this section. In some places, this data structure is described as open addressing with linear probing. The main idea behind a LinearHashTable is that we would, ideally, like to store the element $ \mathtt{x}$ with hash value $ \mathtt{i=hash(x)}$ in the table location $ \mathtt{t[i]}$ . If we cannot do this (because some element is already stored there) then we try to store it at location $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod\ensuremath{\mathtt{t.length}}]$ ; if that's not possible, then we try $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod\ensuremath{\mathtt{t.length}}]$ , and so on, until we find a place for $ \mathtt{x}$ . There are three types of entries stored in $ \mathtt{t}$ :

1. data values: actual values in the USet that we are representing;
2. $ \mathtt{null}$ values: at array locations where no data has ever been stored; and
3. $ \mathtt{del}$ values: at array locations where data was once stored but that has since been deleted.

In addition to the counter, $ \mathtt{n}$ , that keeps track of the number of elements in the LinearHashTable, a counter, $ \mathtt{q}$ , keeps track of the number of elements of Types 1 and 3. That is, $ \mathtt{q}$ is equal to $ \mathtt{n}$ plus the number of $ \mathtt{del}$ values in $ \mathtt{t}$ . To make this work efficiently, we need $ \mathtt{t}$ to be considerably larger than $ \mathtt{q}$ , so that there are lots of $ \mathtt{null}$ values in $ \mathtt{t}$ . The operations on a LinearHashTable therefore maintain the invariant that $ \ensuremath{\mathtt{t.length}}\ge 2\ensuremath{\mathtt{q}}$ . To summarize, a LinearHashTable contains an array, $ \mathtt{t}$ , that stores data elements, and integers $ \mathtt{n}$ and $ \mathtt{q}$ that keep track of the number of data elements and non- $ \mathtt{null}$ values of $ \mathtt{t}$ , respectively. Because many hash functions only work for table sizes that are a power of 2, we also keep an integer $ \mathtt{d}$ and maintain the invariant that $ \ensuremath{\mathtt{t.length}}=2^\ensuremath{\mathtt{d}}$ .

```
    T[] t;   // the table
    int n;   // the size
    int d;   // t.length = 2^d
    int q;   // number of non-null entries in t
```

The $ \mathtt{find(x)}$ operation in a LinearHashTable is simple. We start at array entry $ \mathtt{t[i]}$ where $ \ensuremath{\mathtt{i}}=\ensuremath{\mathtt{hash(x)}}$ and search entries $ \mathtt{t[i]}$ , $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod \ensuremath{\mathtt{t.length}}]$ , $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod \ensuremath{\mathtt{t.length}}]$ , and so on, until we find an index $ \mathtt{i'}$ such that, either, $ \mathtt{t[i']=x}$ , or $ \mathtt{t[i']=null}$ . In the former case we return $ \mathtt{t[i']}$ . In the latter case, we conclude that $ \mathtt{x}$ is not contained in the hash table and return $ \mathtt{null}$ .

```
    T find(T x) {
        int i = hash(x);
        while (t[i] != null) {
            if (t[i] != del && x.equals(t[i])) return t[i];
            i = (i == t.length-1) ? 0 : i + 1; // increment i
        }
        return null;
    }
```

The $ \mathtt{add(x)}$ operation is also fairly easy to implement. After checking that $ \mathtt{x}$ is not already stored in the table (using $ \mathtt{find(x)}$ ), we search $ \mathtt{t[i]}$ , $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod \ensuremath{\mathtt{t.length}}]$ , $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod \ensuremath{\mathtt{t.length}}]$ , and so on, until we find a $ \mathtt{null}$ or $ \mathtt{del}$ and store $ \mathtt{x}$ at that location, increment $ \mathtt{n}$ , and $ \mathtt{q}$ , if appropriate.

```
    boolean add(T x) {
        if (find(x) != null) return false;
        if (2*(q+1) > t.length) resize(); // max 50% occupancy
        int i = hash(x);
        while (t[i] != null && t[i] != del)
            i = (i == t.length-1) ? 0 : i + 1; // increment i
        if (t[i] == null) q++;
        n++;
        t[i] = x;
        return true;
    }
```

By now, the implementation of the $ \mathtt{remove(x)}$ operation should be obvious. We search $ \mathtt{t[i]}$ , $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+1)\bmod \ensuremath{\mathtt{t.length}}]$ , $ \ensuremath{\mathtt{t}}[(\ensuremath{\mathtt{i}}+2)\bmod \ensuremath{\mathtt{t.length}}]$ , and so on until we find an index $ \mathtt{i'}$ such that $ \mathtt{t[i']=x}$ or $ \mathtt{t[i']=null}$ . In the former case, we set $ \mathtt{t[i']=del}$ and return $ \mathtt{true}$ . In the latter case we conclude that $ \mathtt{x}$ was not stored in the table (and therefore cannot be deleted) and return $ \mathtt{false}$ .

```
    T remove(T x) {
        int i = hash(x);
        while (t[i] != null) {
            T y = t[i];
            if (y != del && x.equals(y)) { 
                t[i] = del;
                n--;
                if (8*n < t.length) resize(); // min 12.5% occupancy
                return y;
            }
            i = (i == t.length-1) ? 0 : i + 1;  // increment i
        }
        return null;
    }
```

The correctness of the $ \mathtt{find(x)}$ , $ \mathtt{add(x)}$ , and $ \mathtt{remove(x)}$ methods is easy to verify, though it relies on the use of $ \mathtt{del}$ values. Notice that none of these operations ever sets a non- $ \mathtt{null}$ entry to $ \mathtt{null}$ . Therefore, when we reach an index $ \mathtt{i'}$ such that $ \mathtt{t[i']=null}$ , this is a proof that the element, $ \mathtt{x}$ , that we are searching for is not stored in the table; $ \mathtt{t[i']}$ has always been $ \mathtt{null}$ , so there is no reason that a previous $ \mathtt{add(x)}$ operation would have proceeded beyond index $ \mathtt{i'}$ . The $ \mathtt{resize()}$ method is called by $ \mathtt{add(x)}$ when the number of non- $ \mathtt{null}$ entries exceeds $ \ensuremath{\mathtt{t.length}}/2$ or by $ \mathtt{remove(x)}$ when the number of data entries is less than $ \mathtt{t.length/8}$ . The $ \mathtt{resize()}$ method works like the $ \mathtt{resize()}$ methods in other array-based data structures. We find the smallest non-negative integer $ \mathtt{d}$ such that $ 2^{\ensuremath{\mathtt{d}}} \ge 3\ensuremath{\mathtt{n}}$ . We reallocate the array $ \mathtt{t}$ so that it has size $ 2^{\ensuremath{\mathtt{d}}}$ , and then we insert all the elements in the old version of $ \mathtt{t}$ into the newly-resized copy of $ \mathtt{t}$ . While doing this, we reset $ \mathtt{q}$ equal to $ \mathtt{n}$ since the newly-allocated $ \mathtt{t}$ contains no $ \mathtt{del}$ values.

```python
    void resize() {
        d = 1;
        while ((1<<d) < 3*n) d++;
        T[] told = t;
        t = newArray(1<<d);
        q = n;
        // insert everything from told
        for (int k = 0; k < told.length; k++) {
            if (told[k] != null && told[k] != del) {
                int i = hash(told[k]);
                while (t[i] != null) 
                    i = (i == t.length-1) ? 0 : i + 1;
                t[i] = told[k];
            }
        }
    }
```

5.2.1 Analysis of Linear Probing Notice that each operation, $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , or $ \mathtt{find(x)}$ , finishes as soon as (or before) it discovers the first $ \mathtt{null}$ entry in $ \mathtt{t}$ . The intuition behind the analysis of linear probing is that, since at least half the elements in $ \mathtt{t}$ are equal to $ \mathtt{null}$ , an operation should not take long to complete because it will very quickly come across a $ \mathtt{null}$ entry. We shouldn't rely too heavily on this intuition, though, because it would lead us to (the incorrect) conclusion that the expected number of locations in $ \mathtt{t}$ examined by an operation is at most 2. For the rest of this section, we will assume that all hash values are independently and uniformly distributed in $ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$ . This is not a realistic assumption, but it will make it possible for us to analyze linear probing. Later in this section we will describe a method, called tabulation hashing, that produces a hash function that is ``good enough'' for linear probing. We will also assume that all indices into the positions of $ \mathtt{t}$ are taken modulo $ \mathtt{t.length}$ , so that $ \mathtt{t[i]}$ is really a shorthand for $ \ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}\bmod\ensuremath{\mathtt{t.length}}]$ . We say that a run of length $ k$ that starts at $ \mathtt{i}$ occurs when all the table entries $ \ensuremath{\mathtt{t[i]}}, \ensuremath{\mathtt{t[i+1]}},\ldots,\ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}+k-1]$ are non- $ \mathtt{null}$ and $ \ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}-1]=\ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}+k]=\ensuremath{\mathtt{null}}$ . The number of non- $ \mathtt{null}$ elements of $ \mathtt{t}$ is exactly $ \mathtt{q}$ and the $ \mathtt{add(x)}$ method ensures that, at all times, $ \ensuremath{\mathtt{q}}\le\ensuremath{\mathtt{t.length}}/2$ . There are $ \mathtt{q}$ elements $ \ensuremath{\mathtt{x}}_1,\ldots,\ensuremath{\mathtt{x}}_{\ensuremath{\mathtt{q}}}$ that have been inserted into $ \mathtt{t}$ since the last $ \mathtt{rebuild()}$ operation. By our assumption, each of these has a hash value, $ \ensuremath{\mathtt{hash}}(\ensuremath{\mathtt{x}}_j)$ , that is uniform and independent of the rest. With this setup, we can prove the main lemma required to analyze linear probing. **Lemma 5..4** *Fix a value $ \ensuremath{\mathtt{i}}\in\{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$ . Then the probability that a run of length $ k$ starts at $ \mathtt{i}$ is $ O(c^k)$ for some constant $ 0<c<1$ .*

*Proof*. If a run of length $ k$ starts at $ \mathtt{i}$ , then there are exactly $ k$ elements $ \ensuremath{\mathtt{x}}_j$ such that $ \ensuremath{\mathtt{hash}}(\ensuremath{\mathtt{x}}_j)\in\{\ensuremath{\mathtt{i}},\ldots,\ensuremath{\mathtt{i}}+k-1\}$ . The probability that this occurs is exactly

![$\displaystyle p_k = \binom{\ensuremath{\mathtt{q}}}{k}\left(\frac{k}{\ensuremat... ...{\ensuremath{\mathtt{t.length}}}\right)^{\ensuremath{\mathtt{q}}-k} \enspace , $](/images/open-data-structures/5_2_LinearHashTable_Linear_-img2253.png.webp)

since, for each choice of $ k$ elements, these $ k$ elements must hash to one of the $ k$ locations and the remaining $ \ensuremath{\mathtt{q}}-k$ elements must hash to the other $ \ensuremath{\mathtt{t.length}}-k$ table locations.5.2

In the following derivation we will cheat a little and replace $ r!$ with $ (r/e)^r$ . Stirling's Approximation (Section 1.3.2) shows that this is only a factor of $ O(\sqrt{r})$ from the truth. This is just done to make the derivation simpler; Exercise 5.4 asks the reader to redo the calculation more rigorously using Stirling's Approximation in its entirety. The value of $ p_k$ is maximized when $ \mathtt{t.length}$ is minimum, and the data structure maintains the invariant that $ \ensuremath{\mathtt{t.length}} \ge 2\ensuremath{\mathtt{q}}$ , so

| $\displaystyle p_k$ | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 2](/images/open-data-structures/math-521e75146bc7eeb2a81f.webp) |  |  |  |
| --- | --- | --- | --- | --- |
|  | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 3](/images/open-data-structures/math-71b5e6e3a8432947113e.webp) |  |  |  |
|  | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 4](/images/open-data-structures/math-aa6f9c4b542f88baea0d.webp) |  |  |  |
|  | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 5](/images/open-data-structures/math-6a1109f4f909cc105805.webp) |  |  |  |
|  | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 6](/images/open-data-structures/math-72062ad2ebdd18c2c031.webp) |  |  |  |
|  | $\displaystyle = \left(\frac{1}{2}\right)^k \left(\frac{(2\ensuremath{\mathtt{q}}-k)}{2(\ensuremath{\mathtt{q}}-k)}\right)^{\ensuremath{\mathtt{q}}-k}$ |  |  |  |
|  | $\displaystyle = \left(\frac{1}{2}\right)^k \left(1+\frac{k}{2(\ensuremath{\mathtt{q}}-k)}\right)^{\ensuremath{\mathtt{q}}-k}$ |  |  |  |
|  | $\displaystyle \le \left(\frac{\sqrt{e}}{2}\right)^k \enspace .$ |  |  |  |

(In the last step, we use the inequality $ (1+1/x)^x \le e$ , which holds for all $ x>0$ .) Since $ \sqrt{e}/{2}< 0.824360636 < 1$ , this completes the proof. ![$ \qedsymbol$](/images/open-data-structures/5_2_LinearHashTable_Linear_-img2247.png.webp)

Using Lemma 5.4 to prove upper-bounds on the expected running time of $ \mathtt{find(x)}$ , $ \mathtt{add(x)}$ , and $ \mathtt{remove(x)}$ is now fairly straightforward. Consider the simplest case, where we execute $ \mathtt{find(x)}$ for some value $ \mathtt{x}$ that has never been stored in the LinearHashTable. In this case, $ \ensuremath{\mathtt{i}}=\ensuremath{\mathtt{hash(x)}}$ is a random value in $ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$ independent of the contents of $ \mathtt{t}$ . If $ \mathtt{i}$ is part of a run of length $ k$ , then the time it takes to execute the $ \mathtt{find(x)}$ operation is at most $ O(1+k)$ . Thus, the expected running time can be upper-bounded by

![$\displaystyle O\left(1 + \left(\frac{1}{\ensuremath{\mathtt{t.length}}}\right)\... ...xt{\ensuremath{\mathtt{i}} is part of a run of length $k$}\}\right) \enspace . $](/images/open-data-structures/5_2_LinearHashTable_Linear_-img2294.png.webp)

Note that each run of length $ k$ contributes to the inner sum $ k$ times for a total contribution of $ k^2$ , so the above sum can be rewritten as

|  | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 7](/images/open-data-structures/math-099d5ba2123ad1ab6c42.webp) |  |
| --- | --- | --- |
|  | $\displaystyle \le O\left(1 + \left(\frac{1}{\ensuremath{\mathtt{t.length}}}\right)\sum_{i=1}^{\ensuremath{\mathtt{t.length}}}\sum_{k=0}^{\infty} k^2p_k\right)$ |  |
|  | $\displaystyle = O\left(1 + \sum_{k=0}^{\infty} k^2p_k\right)$ |  |
|  | $\displaystyle = O\left(1 + \sum_{k=0}^{\infty} k^2\cdot O(c^k)\right)$ |  |
|  | $\displaystyle = O(1) \enspace .$ |  |

The last step in this derivation comes from the fact that $ \sum_{k=0}^{\infty} k^2\cdot O(c^k)$ is an exponentially decreasing series.5.3Therefore, we conclude that the expected running time of the $ \mathtt{find(x)}$ operation for a value $ \mathtt{x}$ that is not contained in a LinearHashTable is $ O(1)$ .

If we ignore the cost of the $ \mathtt{resize()}$ operation, then the above analysis gives us all we need to analyze the cost of operations on a LinearHashTable. First of all, the analysis of $ \mathtt{find(x)}$ given above applies to the $ \mathtt{add(x)}$ operation when $ \mathtt{x}$ is not contained in the table. To analyze the $ \mathtt{find(x)}$ operation when $ \mathtt{x}$ is contained in the table, we need only note that this is the same as the cost of the $ \mathtt{add(x)}$ operation that previously added $ \mathtt{x}$ to the table. Finally, the cost of a $ \mathtt{remove(x)}$ operation is the same as the cost of a $ \mathtt{find(x)}$ operation. In summary, if we ignore the cost of calls to $ \mathtt{resize()}$ , all operations on a LinearHashTable run in $ O(1)$ expected time. Accounting for the cost of resize can be done using the same type of amortized analysis performed for the ArrayStack data structure in Section 2.1. 5.2.2 Summary The following theorem summarizes the performance of the LinearHashTable data structure: **Theorem 5..2** *A LinearHashTable implements the USet interface. Ignoring the cost of calls to $ \mathtt{resize()}$ , a LinearHashTable supports the operations $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ in $ O(1)$ expected time per operation. * *Furthermore, beginning with an empty LinearHashTable, any sequence of $ m$ $ \mathtt{add(x)}$ and $ \mathtt{remove(x)}$ operations results in a total of $ O(m)$ time spent during all calls to $ \mathtt{resize()}$ .*

## 5.2.3 Tabulation Hashing

While analyzing the LinearHashTable structure, we made a very strong assumption: That for any set of elements, $ \{\ensuremath{\mathtt{x}}_1,\ldots,\ensuremath{\mathtt{x}}_\ensuremath{\mathtt{n}}\}$ , the hash values $ \ensuremath{\mathtt{hash}}($ x $ _1),\ldots,\ensuremath{\mathtt{hash}}(\ensuremath{\mathtt{x}}_\ensuremath{\mathtt{n}})$ are independently and uniformly distributed over the set $ \{0,\ldots,\ensuremath{\mathtt{t.length}}-1\}$ . One way to achieve this is to store a giant array, $ \mathtt{tab}$ , of length $ 2^{\ensuremath{\mathtt{w}}}$ , where each entry is a random $ \mathtt{w}$ -bit integer, independent of all the other entries. In this way, we could implement $ \mathtt{hash(x)}$ by extracting a $ \mathtt{d}$ -bit integer from $ \mathtt{tab[x.hashCode()]}$ :

```
    int idealHash(T x) {
        return tab[x.hashCode() >>> w-d];
    }
```

Unfortunately, storing an array of size $ 2^{\ensuremath{\mathtt{w}}}$ is prohibitive in terms of memory usage. The approach used by tabulation hashing is to, instead, treat $ \mathtt{w}$ -bit integers as being comprised of $ \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{r}}$ integers, each having only $ \ensuremath{\mathtt{r}}$ bits. In this way, tabulation hashing only needs $ \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{r}}$ arrays each of length $ 2^{\ensuremath{\mathtt{r}}}$ . All the entries in these arrays are independent random $ \mathtt{w}$ -bit integers. To obtain the value of $ \mathtt{hash(x)}$ we split $ \mathtt{x.hashCode()}$ up into $ \ensuremath{\mathtt{w}}/\ensuremath{\mathtt{r}}$ $ \mathtt{r}$ -bit integers and use these as indices into these arrays. We then combine all these values with the bitwise exclusive-or operator to obtain $ \mathtt{hash(x)}$ . The following code shows how this works when $ \ensuremath{\mathtt{w}}=32$ and $ \ensuremath{\mathtt{r}}=4$ :

```
    int hash(T x) {
        int h = x.hashCode();
        return (tab[0][h&0xff] 
                 ^ tab[1][(h>>>8)&0xff]
                 ^ tab[2][(h>>>16)&0xff] 
                 ^ tab[3][(h>>>24)&0xff])
                  >>> (w-d);
    }
```

In this case, $ \mathtt{tab}$ is a two-dimensional array with four columns and $ 2^{32/4}=256$ rows. One can easily verify that, for any $ \mathtt{x}$ , $ \mathtt{hash(x)}$ is uniformly distributed over $ \{0,\ldots,2^{\ensuremath{\mathtt{d}}}-1\}$ . With a little work, one can even verify that any pair of values have independent hash values. This implies tabulation hashing could be used in place of multiplicative hashing for the ChainedHashTable implementation. However, it is not true that any set of $ \mathtt{n}$ distinct values gives a set of $ \mathtt{n}$ independent hash values. Nevertheless, when tabulation hashing is used, the bound of Theorem 5.2 still holds. References for this are provided at the end of this chapter.

#### Footnotes

... locations.5.2 Note that $ p_k$ is greater than the probability that a run of length $ k$ starts at $ \mathtt{i}$ , since the definition of $ p_k$ does not include the requirement $ \ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}-1]=\ensuremath{\mathtt{t}}[\ensuremath{\mathtt{i}}+k]=\ensuremath{\mathtt{null}}$ . ... series.5.3 In the terminology of many calculus texts, this sum passes the ratio test: There exists a positive integer $ k_0$ such that, for all $ k\ge k_0$ , $ \frac{(k+1)^2c^{k+1}}{k^2c^k} < 1$ . [opendatastructures.org](http://opendatastructures.org/)

## 5.3 Hash Codes

**Subsections**

# 5.3 Hash Codes

The hash tables discussed in the previous section are used to associate data with integer keys consisting of $ \mathtt{w}$ bits. In many cases, we have keys that are not integers. They may be strings, objects, arrays, or other compound structures. To use hash tables for these types of data, we must map these data types to $ \mathtt{w}$ -bit hash codes. Hash code mappings should have the following properties: If $ \mathtt{x}$ and $ \mathtt{y}$ are equal, then $ \mathtt{x.hashCode()}$ and $ \mathtt{y.hashCode()}$ are equal. If $ \mathtt{x}$ and $ \mathtt{y}$ are not equal, then the probability that $ \ensuremath{\mathtt{x.hashCode()}}=\ensuremath{\mathtt{y.hashCode()}}$ should be small (close to $ 1/2^{\ensuremath{\mathtt{w}}}$ ). The first property ensures that if we store $ \mathtt{x}$ in a hash table and later look up a value $ \mathtt{y}$ equal to $ \mathtt{x}$ , then we will find $ \mathtt{x}$ --as we should. The second property minimizes the loss from converting our objects to integers. It ensures that unequal objects usually have different hash codes and so are likely to be stored at different locations in our hash table. 5.3.1 Hash Codes for Primitive Data Types Small primitive data types like $ \mathtt{char}$ , $ \mathtt{byte}$ , $ \mathtt{int}$ , and $ \mathtt{float}$ are usually easy to find hash codes for. These data types always have a binary representation and this binary representation usually consists of $ \mathtt{w}$ or fewer bits. (For example, in Java, $ \mathtt{byte}$ is an 8-bit type and $ \mathtt{float}$ is a 32-bit type.) In these cases, we just treat these bits as the representation of an integer in the range $ \{0,\ldots,2^\ensuremath{\mathtt{w}}-1\}$ . If two values are different, they get different hash codes. If they are the same, they get the same hash code. A few primitive data types are made up of more than $ \mathtt{w}$ bits, usually $ c\ensuremath{\mathtt{w}}$ bits for some constant integer $ c$ . (Java's $ \mathtt{long}$ and $ \mathtt{double}$ types are examples of this with $ c=2$ .) These data types can be treated as compound objects made of $ c$ parts, as described in the next section. 5.3.2 Hash Codes for Compound Objects For a compound object, we want to create a hash code by combining the individual hash codes of the object's constituent parts. This is not as easy as it sounds. Although one can find many hacks for this (for example, combining the hash codes with bitwise exclusive-or operations), many of these hacks turn out to be easy to foil (see Exercises 5.7-5.9). However, if one is willing to do arithmetic with $ 2\ensuremath{\mathtt{w}}$ bits of precision, then there are simple and robust methods available. Suppose we have an object made up of several parts $ P_0,\ldots,P_{r-1}$ whose hash codes are $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$ . Then we can choose mutually independent random $ \mathtt{w}$ -bit integers $ \ensuremath{\mathtt{z}}_0,\ldots,\ensuremath{\mathtt{z}}_{r-1}$ and a random $ 2\ensuremath{\mathtt{w}}$ -bit odd integer $ \mathtt{z}$ and compute a hash code for our object with

![$\displaystyle h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})... ...2\ensuremath{\mathtt{w}}}\right) \ddiv 2^{\ensuremath{\mathtt{w}}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2399.png.webp)

Note that this hash code has a final step (multiplying by $ \mathtt{z}$ and dividing by $ 2^{\ensuremath{\mathtt{w}}}$ ) that uses the multiplicative hash function from Section 5.1.1 to take the $ 2\ensuremath{\mathtt{w}}$ -bit intermediate result and reduce it to a $ \mathtt{w}$ -bit final result. Here is an example of this method applied to a simple compound object with three parts $ \mathtt{x0}$ , $ \mathtt{x1}$ , and $ \mathtt{x2}$ :

```python
    int hashCode() {
        // random numbers from rand.org
        long[] z = {0x2058cc50L, 0xcb19137eL, 0x2cb6b6fdL}; 
        long zz = 0xbea0107e5067d19dL;

        // convert (unsigned) hashcodes to long
        long h0 = x0.hashCode() & ((1L<<32)-1);
        long h1 = x1.hashCode() & ((1L<<32)-1);
        long h2 = x2.hashCode() & ((1L<<32)-1);
        
        return (int)(((z[0]*h0 + z[1]*h1 + z[2]*h2)*zz)
                     >>> 32);
    }
```

The following theorem shows that, in addition to being straightforward to implement, this method is provably good:

**Theorem 5..3** *Let $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$ and $ \ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1}$ each be sequences of $ \mathtt{w}$ bit integers in $ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ and assume $ \ensuremath{\mathtt{x}}_i \neq \ensuremath{\mathtt{y}}_i$ for at least one index $ i\in\{0,\ldots,r-1\}$ . Then *

![$\displaystyle \Pr\{ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_... ...suremath{\mathtt{y}}_{r-1}) \} \le 3/2^{\ensuremath{\mathtt{w}}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2413.png.webp)

*Proof*. We will first ignore the final multiplicative hashing step and see how that step contributes later. Define:

![$\displaystyle h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}... ...\ensuremath{\mathtt{x}}_j\right)\bmod 2^{2\ensuremath{\mathtt{w}}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2415.png.webp)

Suppose that $ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}) = h'(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$ . We can rewrite this as:

where

![$\displaystyle t = \left(\sum_{j=0}^{i-1} \ensuremath{\mathtt{z}}_j(\ensuremath{... ...tt{y}}_j-\ensuremath{\mathtt{x}}_j)\right) \bmod 2^{2\ensuremath{\mathtt{w}}} $](/images/open-data-structures/5_3_Hash_Codes-img2418.png.webp)

If we assume, without loss of generality that $ \ensuremath{\mathtt{x}}_i> \ensuremath{\mathtt{y}}_i$ , then (5.4) becomes

since each of $ \ensuremath{\mathtt{z}}_i$ and $ (\ensuremath{\mathtt{x}}_i-\ensuremath{\mathtt{y}}_i)$ is at most $ 2^{\ensuremath{\mathtt{w}}}-1$ , so their product is at most $ 2^{2\ensuremath{\mathtt{w}}}-2^{\ensuremath{\mathtt{w}}+1}+1 < 2^{2\ensuremath{\mathtt{w}}}-1$ . By assumption, $ \ensuremath{\mathtt{x}}_i-\ensuremath{\mathtt{y}}_i\neq 0$ , so (5.5) has at most one solution in $ \ensuremath{\mathtt{z}}_i$ . Therefore, since $ \ensuremath{\mathtt{z}}_i$ and $ t$ are independent ( $ \ensuremath{\mathtt{z}}_0,\ldots,\ensuremath{\mathtt{z}}_{r-1}$ are mutually independent), the probability that we select $ \ensuremath{\mathtt{z}}_i$ so that $ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})=h'(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$ is at most $ 1/2^{\ensuremath{\mathtt{w}}}$ .

The final step of the hash function is to apply multiplicative hashing to reduce our $ 2\ensuremath{\mathtt{w}}$ -bit intermediate result $ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})$ to a $ \mathtt{w}$ -bit final result $ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})$ . By Theorem 5.3, if $ h'(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})\neq h'(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$ , then ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 8](/images/open-data-structures/math-8d053bd7b0359e54e614.webp) . To summarize,

|  | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 9](/images/open-data-structures/math-20c17ed8f39aea6343b1.webp) |  |
| --- | --- | --- |
|  | ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 10](/images/open-data-structures/math-4fa663a43d2327729d9d.webp) |  |
|  | $\displaystyle \le 1/2^{\ensuremath{\mathtt{w}}} + 2/2^{\ensuremath{\mathtt{w}}} = 3/2^{\ensuremath{\mathtt{w}}} \enspace . \qedhere$ |  |

![$ \qedsymbol$](/images/open-data-structures/5_3_Hash_Codes-img2414.png.webp)

5.3.3 Hash Codes for Arrays and Strings The method from the previous section works well for objects that have a fixed, constant, number of components. However, it breaks down when we want to use it with objects that have a variable number of components, since it requires a random $ \mathtt{w}$ -bit integer $ \ensuremath{\mathtt{z}}_i$ for each component. We could use a pseudorandom sequence to generate as many $ \ensuremath{\mathtt{z}}_i$ 's as we need, but then the $ \ensuremath{\mathtt{z}}_i$ 's are not mutually independent, and it becomes difficult to prove that the pseudorandom numbers don't interact badly with the hash function we are using. In particular, the values of $ t$ and $ \ensuremath{\mathtt{z}}_i$ in the proof of Theorem 5.3 are no longer independent. A more rigorous approach is to base our hash codes on polynomials over prime fields; these are just regular polynomials that are evaluated modulo some prime number, $ \mathtt{p}$ . This method is based on the following theorem, which says that polynomials over prime fields behave pretty-much like usual polynomials: **Theorem 5..4** *Let $ \ensuremath{\mathtt{p}}$ be a prime number, and let ![المعادلة الأصلية: تحليل الاحتمالات ودوال التجزئة في جداول التجزئة، الصيغة 11](/images/open-data-structures/math-9b9d30e7b03760fed4f4.webp) be a non-trivial polynomial with coefficients $ \ensuremath{\mathtt{x}}_i\in\{0,\ldots,\ensuremath{\mathtt{p}}-1\}$ . Then the equation $ f(\ensuremath{\mathtt{z}})\bmod \ensuremath{\mathtt{p}} = 0$ has at most $ r-1$ solutions for $ \ensuremath{\mathtt{z}}\in\{0,\ldots,p-1\}$ .*

To use Theorem 5.4, we hash a sequence of integers $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$ with each $ \ensuremath{\mathtt{x}}_i\in \{0,\ldots,\ensuremath{\mathtt{p}}-2\}$ using a random integer $ \ensuremath{\mathtt{z}}\in\{0,\ldots,\ensuremath{\mathtt{p}}-1\}$ via the formula

![$\displaystyle h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1})... ...}}-1)\ensuremath{\mathtt{z}}^r \right)\bmod \ensuremath{\mathtt{p}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2458.png.webp)

Note the extra $ (\ensuremath{\mathtt{p}}-1)\ensuremath{\mathtt{z}}^r$ term at the end of the formula. It helps to think of $ (\ensuremath{\mathtt{p}}-1)$ as the last element, $ \ensuremath{\mathtt{x}}_r$ , in the sequence $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r}$ . Note that this element differs from every other element in the sequence (each of which is in the set $ \{0,\ldots,\ensuremath{\mathtt{p}}-2\}$ ). We can think of $ \ensuremath{\mathtt{p}}-1$ as an end-of-sequence marker. The following theorem, which considers the case of two sequences of the same length, shows that this hash function gives a good return for the small amount of randomization needed to choose $ \mathtt{z}$ : **Theorem 5..5** *Let $ \ensuremath{\mathtt{p}}>2^{\ensuremath{\mathtt{w}}}+1$ be a prime, let $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$ and $ \ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1}$ each be sequences of $ \mathtt{w}$ -bit integers in $ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ , and assume $ \ensuremath{\mathtt{x}}_i \neq \ensuremath{\mathtt{y}}_i$ for at least one index $ i\in\{0,\ldots,r-1\}$ . Then *

![$\displaystyle \Pr\{ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_... ...math{\mathtt{y}}_{r-1}) \} \le (r-1)/\ensuremath{\mathtt{p}} \} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2473.png.webp)

*Proof*. The equation $ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}) = h(\ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r-1})$ can be rewritten as

Since $ \ensuremath{\mathtt{x}}_\ensuremath{\mathtt{i}}\neq \ensuremath{\mathtt{y}}_\ensuremath{\mathtt{i}}$ , this polynomial is non-trivial. Therefore, by Theorem 5.4, it has at most $ r-1$ solutions in $ \mathtt{z}$ . The probability that we pick $ \mathtt{z}$ to be one of these solutions is therefore at most $ (r-1)/\ensuremath{\mathtt{p}}$ . ![$ \qedsymbol$](/images/open-data-structures/5_3_Hash_Codes-img2474.png.webp)

Note that this hash function also deals with the case in which two sequences have different lengths, even when one of the sequences is a prefix of the other. This is because this function effectively hashes the infinite sequence

![$\displaystyle \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}, \ensuremath{\mathtt{p}}-1,0,0,\ldots \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2482.png.webp)

This guarantees that if we have two sequences of length $ r$ and $ r'$ with $ r > r'$ , then these two sequences differ at index $ i=r$ . In this case, (5.6) becomes

![$\displaystyle \left( \sum_{i=0}^{i=r'-1}(\ensuremath{\mathtt{x}}_i-\ensuremath... ...nsuremath{\mathtt{z}}^{r} \right)\bmod \ensuremath{\mathtt{p}} = 0 \enspace , $](/images/open-data-structures/5_3_Hash_Codes-img2487.png.webp)

which, by Theorem 5.4, has at most $ r$ solutions in $ \ensuremath{\mathtt{z}}$ . This combined with Theorem 5.5 suffice to prove the following more general theorem:

**Theorem 5..6** *Let $ \ensuremath{\mathtt{p}}>2^{\ensuremath{\mathtt{w}}}+1$ be a prime, let $ \ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_{r-1}$ and $ \ensuremath{\mathtt{y}}_0,\ldots,\ensuremath{\mathtt{y}}_{r'-1}$ be distinct sequences of $ \mathtt{w}$ -bit integers in $ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}-1\}$ . Then *

![$\displaystyle \Pr\{ h(\ensuremath{\mathtt{x}}_0,\ldots,\ensuremath{\mathtt{x}}_... ...{\mathtt{y}}_{r-1}) \} \le \max\{r,r'\}/\ensuremath{\mathtt{p}} \enspace . $](/images/open-data-structures/5_3_Hash_Codes-img2495.png.webp)

The following example code shows how this hash function is applied to an object that contains an array, $ \mathtt{x}$ , of values:

```python
    int hashCode() {
        long p = (1L<<32)-5;   // prime: 2^32 - 5
        long z = 0x64b6055aL;  // 32 bits from random.org
        int z2 = 0x5067d19d;   // random odd 32 bit number
        long s = 0;
        long zi = 1;
        for (int i = 0; i < x.length; i++) {
            // reduce to 31 bits
            long xi = (x[i].hashCode() * z2) >>> 1; 
            s = (s + zi * xi) % p;
            zi = (zi * z) % p;    
        }
        s = (s + zi * (p-1)) % p;
        return (int)s;
    }
```

The preceding code sacrifices some collision probability for implementation convenience. In particular, it applies the multiplicative hash function from Section 5.1.1, with $ \ensuremath{\mathtt{d}}=31$ to reduce $ \mathtt{x[i].hashCode()}$ to a 31-bit value. This is so that the additions and multiplications that are done modulo the prime $ \ensuremath{\mathtt{p}}=2^{32}-5$ can be carried out using unsigned 63-bit arithmetic. Thus the probability of two different sequences, the longer of which has length $ r$ , having the same hash code is at most

![$\displaystyle 2/2^{31} + r/(2^{32}-5) $](/images/open-data-structures/5_3_Hash_Codes-img2501.png.webp)

rather than the $ r/(2^{32}-5)$ specified in Theorem 5.6. [opendatastructures.org](http://opendatastructures.org/)

## 5.4 Discussion and Exercises

Hash tables and hash codes represent an enormous and active field of research that is just touched upon in this chapter. The online Bibliography on Hashing [10] contains nearly 2000 entries. A variety of different hash table implementations exist. The one described in Section 5.1 is known as hashing with chaining (each array entry contains a chain (List) of elements). Hashing with chaining dates back to an internal IBM memorandum authored by H. P. Luhn and dated January 1953. This memorandum also seems to be one of the earliest references to linked lists. An alternative to hashing with chaining is that used by open addressing schemes, where all data is stored directly in an array. These schemes include the LinearHashTable structure of Section 5.2. This idea was also proposed, independently, by a group at IBM in the 1950s. Open addressing schemes must deal with the problem of collision resolution: the case where two values hash to the same array location. Different strategies exist for collision resolution; these provide different performance guarantees and often require more sophisticated hash functions than the ones described here. Yet another category of hash table implementations are the so-called perfect hashing methods. These are methods in which $ \mathtt{find(x)}$ operations take $ O(1)$ time in the worst-case. For static data sets, this can be accomplished by finding perfect hash functions for the data; these are functions that map each piece of data to a unique array location. For data that changes over time, perfect hashing methods include FKS two-level hash tables [31,24] and cuckoo hashing [57]. The hash functions presented in this chapter are probably among the most practical methods currently known that can be proven to work well for any set of data. Other provably good methods date back to the pioneering work of Carter and Wegman who introduced the notion of universal hashing and described several hash functions for different scenarios [14]. Tabulation hashing, described in Section 5.2.3, is due to Carter and Wegman [14], but its analysis, when applied to linear probing (and several other hash table schemes) is due to P ![{\v{a\/}}\kern.05em](/images/open-data-structures/5_4_Discussion_Exercises-img2583.png.webp) tra ![{\c{s\/}}](/images/open-data-structures/5_4_Discussion_Exercises-img2584.png.webp) cu and Thorup [60]. The idea of multiplicative hashing is very old and seems to be part of the hashing folklore [48, Section 6.4]. However, the idea of choosing the multiplier $ \mathtt{z}$ to be a random odd number, and the analysis in Section 5.1.1 is due to Dietzfelbinger et al. [23]. This version of multiplicative hashing is one of the simplest, but its collision probability of $ 2/2^{\ensuremath{\mathtt{d}}}$ is a factor of two larger than what one could expect with a random function from $ 2^{\ensuremath{\mathtt{w}}}\to 2^{\ensuremath{\mathtt{d}}}$ . The multiply-add hashing method uses the function

![$\displaystyle h(\ensuremath{\mathtt{x}}) = ((\ensuremath{\mathtt{z}}\ensuremath... ...math{\mathtt{2w}}}) \ddiv 2^{\ensuremath{\mathtt{2w}}-\ensuremath{\mathtt{d}}} $](/images/open-data-structures/5_4_Discussion_Exercises-img2508.png.webp)

where $ \mathtt{z}$ and $ \mathtt{b}$ are each randomly chosen from $ \{0,\ldots,2^{\ensuremath{\mathtt{2w}}}-1\}$ . Multiply-add hashing has a collision probability of only $ 1/2^{\ensuremath{\mathtt{d}}}$ [21], but requires $ 2\ensuremath{\mathtt{w}}$ -bit precision arithmetic.

There are a number of methods of obtaining hash codes from fixed-length sequences of $ \mathtt{w}$ -bit integers. One particularly fast method [11] is the function

![\begin{displaymath}\begin{array}{l} h(\ensuremath{\mathtt{x}}_0,\ldots,\ensurem... ...htt{w}}})\right) \bmod 2^{2\ensuremath{\mathtt{w}}} \end{array}\end{displaymath}](/images/open-data-structures/5_4_Discussion_Exercises-img2515.png.webp)

where $ r$ is even and $ \ensuremath{\mathtt{a}}_0,\ldots,\ensuremath{\mathtt{a}}_{r-1}$ are randomly chosen from $ \{0,\ldots,2^{\ensuremath{\mathtt{w}}}\}$ . This yields a $ 2\ensuremath{\mathtt{w}}$ -bit hash code that has collision probability $ 1/2^{\ensuremath{\mathtt{w}}}$ . This can be reduced to a $ \mathtt{w}$ -bit hash code using multiplicative (or multiply-add) hashing. This method is fast because it requires only $ r/2$ $ 2\ensuremath{\mathtt{w}}$ -bit multiplications whereas the method described in Section 5.3.2 requires $ r$ multiplications. (The $ \bmod$ operations occur implicitly by using $ \mathtt{w}$ and $ 2\ensuremath{\mathtt{w}}$ -bit arithmetic for the additions and multiplications, respectively.)

The method from Section 5.3.3 of using polynomials over prime fields to hash variable-length arrays and strings is due to Dietzfelbinger et al. [22]. Due to its use of the $ \bmod$ operator which relies on a costly machine instruction, it is, unfortunately, not very fast. Some variants of this method choose the prime $ \mathtt{p}$ to be one of the form $ 2^{\ensuremath{\mathtt{w}}}-1$ , in which case the $ \bmod$ operator can be replaced with addition ( $ \mathtt{+}$ ) and bitwise-and ( $ \mathtt{\text{\ttfamily\&}}$ ) operations [47, Section 3.6]. Another option is to apply one of the fast methods for fixed-length strings to blocks of length $ c$ for some constant $ c>1$ and then apply the prime field method to the resulting sequence of $ \lceil r/c\rceil$ hash codes. **Exercise 5..1** A certain university assigns each of its students student numbers the first time they register for any course. These numbers are sequential integers that started at 0 many years ago and are now in the millions. Suppose we have a class of one hundred first year students and we want to assign them hash codes based on their student numbers. Does it make more sense to use the first two digits or the last two digits of their student number? Justify your answer.

**Exercise 5..2** Consider the hashing scheme in Section 5.1.1, and suppose $ \ensuremath{\mathtt{n}}=2^{\ensuremath{\mathtt{d}}}$ and $ \ensuremath{\mathtt{d}}\le \ensuremath{\mathtt{w}}/2$ . Show that, for any choice of the muliplier, $ \mathtt{z}$ , there exists $ \mathtt{n}$ values that all have the same hash code. (Hint: This is easy, and doesn't require any number theory.) Given the multiplier, $ \mathtt{z}$ , describe $ \mathtt{n}$ values that all have the same hash code. (Hint: This is harder, and requires some basic number theory.)

**Exercise 5..3** Prove that the bound $ 2/2^{\ensuremath{\mathtt{d}}}$ in Lemma 5.1 is the best possible bound by showing that, if $ x=2^{\ensuremath{\mathtt{w}}-\ensuremath{\mathtt{d}}-2}$ and $ \ensuremath{\mathtt{y}}=3\ensuremath{\mathtt{x}}$ , then $ \Pr\{\ensuremath{\mathtt{hash(x)}}=\ensuremath{\mathtt{hash(y)}}\}=2/2^{\ensuremath{\mathtt{d}}}$ . (Hint look at the binary representations of $ \ensuremath{\mathtt{zx}}$ and $ \ensuremath{\mathtt{z}}3\ensuremath{\mathtt{x}}$ and use the fact that $ \ensuremath{\mathtt{z}}3\ensuremath{\mathtt{x}} = \ensuremath{\mathtt{z}}x\ensuremath{\mathtt{+2}}z\ensuremath{\mathtt{x}}$ .)

**Exercise 5..4** Reprove Lemma 5.4 using the full version of Stirling's Approximation given in Section 1.3.2.

**Exercise 5..5** Consider the following simplified version of the code for adding an element $ \mathtt{x}$ to a LinearHashTable, which simply stores $ \mathtt{x}$ in the first $ \mathtt{null}$ array entry it finds. Explain why this could be very slow by giving an example of a sequence of $ O(\ensuremath{\mathtt{n}})$ $ \mathtt{add(x)}$ , $ \mathtt{remove(x)}$ , and $ \mathtt{find(x)}$ operations that would take on the order of $ \ensuremath{\mathtt{n}}^2$ time to execute.

```
    boolean addSlow(T x) {
        if (2*(q+1) > t.length) resize(); // max 50% occupancy
        int i = hash(x);
        while (t[i] != null) {
            if (t[i] != del && x.equals(t[i])) return false;
            i = (i == t.length-1) ? 0 : i + 1; // increment i
        }
        t[i] = x;
        n++; q++;
        return true;
    }
```

**Exercise 5..6** Early versions of the Java $ \mathtt{hashCode()}$ method for the String class worked by not using all of the characters found in long strings. For example, for a sixteen character string, the hash code was computed using only the eight even-indexed characters. Explain why this was a very bad idea by giving an example of large set of strings that all have the same hash code.

**Exercise 5..7** Suppose you have an object made up of two $ \mathtt{w}$ -bit integers, $ \mathtt{x}$ and $ \mathtt{y}$ . Show why $ \ensuremath{\mathtt{x}}\oplus\ensuremath{\mathtt{y}}$ does not make a good hash code for your object. Give an example of a large set of objects that would all have hash code 0.

**Exercise 5..8** Suppose you have an object made up of two $ \mathtt{w}$ -bit integers, $ \mathtt{x}$ and $ \mathtt{y}$ . Show why $ \ensuremath{\mathtt{x}}+\ensuremath{\mathtt{y}}$ does not make a good hash code for your object. Give an example of a large set of objects that would all have the same hash code.

**Exercise 5..9** Suppose you have an object made up of two $ \mathtt{w}$ -bit integers, $ \mathtt{x}$ and $ \mathtt{y}$ . Suppose that the hash code for your object is defined by some deterministic function $ h(\ensuremath{\mathtt{x}},\ensuremath{\mathtt{y}})$ that produces a single $ \mathtt{w}$ -bit integer. Prove that there exists a large set of objects that have the same hash code.

**Exercise 5..10** Let $ p=2^{\ensuremath{\mathtt{w}}}-1$ for some positive integer $ \mathtt{w}$ . Explain why, for a positive integer $ x$

![$\displaystyle (x\bmod 2^{\ensuremath{\mathtt{w}}}) + (x\ddiv 2^{\ensuremath{\mathtt{w}}}) \equiv x \bmod (2^{\ensuremath{\mathtt{w}}}-1) \enspace . $](/images/open-data-structures/5_4_Discussion_Exercises-img2575.png.webp)

(This gives an algorithm for computing $ x \bmod (2^{\ensuremath{\mathtt{w}}}-1)$ by repeatedly setting

![$\displaystyle \ensuremath{\mathtt{x = x\text{\ttfamily\&}((1\text{\ttfamily <<}w)-1) + x\text{\ttfamily >>>}w}} $](/images/open-data-structures/5_4_Discussion_Exercises-img2577.png.webp)

until $ \ensuremath{\mathtt{x}} \le 2^{\ensuremath{\mathtt{w}}}-1$ .)

**Exercise 5..11** Find some commonly used hash table implementation such as the (Java Collection Framework HashMap or the HashTable or LinearHashTable implementations in this book, and design a program that stores integers in this data structure so that there are integers, $ \mathtt{x}$ , such that $ \mathtt{find(x)}$ takes linear time. That is, find a set of $ \mathtt{n}$ integers for which there are $ c\ensuremath{\mathtt{n}}$ elements that hash to the same table location. Depending on how good the implementation is, you may be able to do this just by inspecting the code for the implementation, or you may have to write some code that does trial insertions and searches, timing how long it takes to add and find particular values. (This can be, and has been, used to launch denial of service attacks on web servers [17].)

[opendatastructures.org](http://opendatastructures.org/)
