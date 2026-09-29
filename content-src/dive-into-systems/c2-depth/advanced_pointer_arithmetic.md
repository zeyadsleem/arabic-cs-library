---
title: "2.9.4. Pointer Arithmetic"
lang: en
---

If a pointer variable points to an array, a program can perform arithmetic on the pointer to access any of the array’s elements. In most cases, we recommend against using pointer arithmetic to access array elements: it’s easy to make errors and more difficult to debug when you do. However, occasionally it may be convenient to successively increment a pointer to iterate over an array of elements.

When incremented, a pointer points to the next storage location *of the type it points to*. For example, incrementing an integer pointer (`int *`) makes it point to the next `int` storage address (the address four bytes beyond its current value), and incrementing a character pointer makes it point to the next `char` storage address (the address one byte beyond its current value).

In the [following example program](https://diveintosystems.org/book/C2-C_depth/_attachments/pointerarith.c), we demonstrate how to use pointer arithmetic to manipulate an array. First declare pointer variables whose type matches the array’s element type:

```c
#define N 10
#define M 20

int main(void) {
    // array declarations:
    char letters[N];
    int numbers[N], i, j;
    int matrix[N][M];

    // declare pointer variables that will access int or char array elements
    // using pointer arithmetic (the pointer type must match array element type)
    char *cptr = NULL;
    int *iptr = NULL;
    ...
```

Next, initialize the pointer variables to the base address of the arrays over which they will iterate:

```c
// make the pointer point to the first element in the array
cptr = &(letters[0]); //  &(letters[0])  is the address of element 0
iptr = numbers;       // the address of element 0 (numbers is &(numbers[0]))
```

Then, using pointer dereferencing, our program can access the array’s elements. Here, we’re dereferencing to assign a value to an array element and then incrementing the pointer variable by one to advance it to point to the next element:

```c
// initialized letters and numbers arrays through pointer variables
for (i = 0; i < N; i++) {
    // dereference each pointer and update the element it currently points to
    *cptr = 'a' + i;
    *iptr = i * 3;

    // use pointer arithmetic to set each pointer to point to the next element
    cptr++;  // cptr points to the next char address (next element of letters)
    iptr++;  // iptr points to the next int address  (next element of numbers)
}
```

Note that in this example, the pointer values are incremented inside the loop. Thus, incrementing their value makes them point to the next element in the array. This pattern effectively walks through each element of an array in the same way that accessing `cptr[i]` or `iptr[i]` at each iteration would.

**Note — The semantics of pointer arithmetic and the underlying arithmetic function**

> The semantics of pointer arithmetic are type independent: changing any type of pointer’s value by `N`, (`ptr = ptr + N`) makes the pointer point `N` storage locations beyond its current value (or makes it point to `N` elements beyond the current element it points to). As a result, incrementing a pointer of any type makes it point to the very next memory location of the type it points to.
>
> However, the actual arithmetic function that the compiler generates for a pointer arithmetic expression varies depending on the type of the pointer variable (depending on the number of bytes the system uses to store the type to which it points). For example, incrementing a `char` pointer will increase its value by one because the very next valid `char` address is one byte from the current location. Incrementing an `int` pointer will increase its value by four because the next valid integer address is four bytes from the current location.
>
> A programmer can simply write `ptr++` to make a pointer point to the next element value. The compiler generates code to add the appropriate number of bytes for the corresponding type it points to. The addition effectively sets its value to the next valid address in memory of that type.

You can see how the above code modified array elements by printing out their values (we show this first using array indexing and then using pointer arithmetic to access each array element’s value):

```c
printf("\n array values using indexing to access: \n");
// see what the code above did:
for (i = 0; i < N; i++) {
    printf("letters[%d] = %c, numbers[%d] = %d\n",
           i, letters[i], i, numbers[i]);
}

// we could also use pointer arith to print these out:
printf("\n array values using pointer arith to access: \n");
// first: initialize pointers to base address of arrays:
cptr = letters;  // letters == &letters[0]
iptr = numbers;
for (i = 0; i < N; i++) {
    // dereference pointers to access array element values
    printf("letters[%d] = %c, numbers[%d] = %d\n",
            i, *cptr, i, *iptr);

    // increment pointers to point to the next element
    cptr++;
    iptr++;
}
```

Here’s what the output looks like:

```
 array values using indexing to access:
letters[0] = a, numbers[0] = 0
letters[1] = b, numbers[1] = 3
letters[2] = c, numbers[2] = 6
letters[3] = d, numbers[3] = 9
letters[4] = e, numbers[4] = 12
letters[5] = f, numbers[5] = 15
letters[6] = g, numbers[6] = 18
letters[7] = h, numbers[7] = 21
letters[8] = i, numbers[8] = 24
letters[9] = j, numbers[9] = 27

 array values using pointer arith to access:
letters[0] = a, numbers[0] = 0
letters[1] = b, numbers[1] = 3
letters[2] = c, numbers[2] = 6
letters[3] = d, numbers[3] = 9
letters[4] = e, numbers[4] = 12
letters[5] = f, numbers[5] = 15
letters[6] = g, numbers[6] = 18
letters[7] = h, numbers[7] = 21
letters[8] = i, numbers[8] = 24
letters[9] = j, numbers[9] = 27
```

Pointer arithmetic can be used to iterate over any contiguous chunk of memory. Here’s an example using pointer arithmetic to initialize a statically declared 2D array:

```c
// sets matrix to:
// row 0:   0,   1,   2, ...,  99
// row 1: 100, 110, 120, ..., 199
//        ...
iptr = &(matrix[0][0]);
for (i = 0; i < N*M; i++) {
    *iptr = i;
    iptr++;
}

// see what the code above did:
printf("\n 2D array values inited using pointer arith: \n");
for (i = 0; i < N; i++) {
    for (j = 0; j < M; j++) {
        printf("%3d ", matrix[i][j]);
    }
    printf("\n");
}

return 0;
}
```

The output will look like:

```
 2D array values initialized using pointer arith:
  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19
 20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  36  37  38  39
 40  41  42  43  44  45  46  47  48  49  50  51  52  53  54  55  56  57  58  59
 60  61  62  63  64  65  66  67  68  69  70  71  72  73  74  75  76  77  78  79
 80  81  82  83  84  85  86  87  88  89  90  91  92  93  94  95  96  97  98  99
100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119
120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139
140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159
160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179
180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199
```

Pointer arithmetic can access contiguous memory locations in any pattern, starting and ending anywhere in a contiguous chunk of memory. For example, after initializing a pointer to the address of an array element, its value can be changed by more than one. For example:

```c
iptr = &numbers[2];
*iptr = -13;
iptr += 4;
*iptr = 9999;
```

After executing the preceding code, printing the `numbers` array’s values would look like this (note that the values at index 2 and index 6 have changed):

```
numbers[0] = 0
numbers[1] = 3
numbers[2] = -13
numbers[3] = 9
numbers[4] = 12
numbers[5] = 15
numbers[6] = 9999
numbers[7] = 21
numbers[8] = 24
numbers[9] = 27
```

Pointer arithmetic works on dynamically allocated arrays too. However, programmers must be careful working with dynamically allocated multidimensional arrays. If, for example, a program uses multiple `malloc` calls to dynamically allocate individual rows of a 2D array ([method 2, array of arrays](https://diveintosystems.org/book/C2-C_depth/arrays.html#_method_2_the_programmer_friendly_way)), then the pointer must be reset to point to the address of the starting element of every row. Resetting the pointer is necessary because only elements within a row are located in contiguous memory addresses. On the other hand, if the 2D array is allocated as a single `malloc` of total rows times columns space ([method 1](https://diveintosystems.org/book/C2-C_depth/arrays.html#_method_1_memory_efficient_allocation)), then all the rows are in contiguous memory (like in the statically declared 2D array from the example above). In the latter case, the pointer only needs to be initialized to point to the base address, and then pointer arithmetic will correctly access any element in the 2D array.
