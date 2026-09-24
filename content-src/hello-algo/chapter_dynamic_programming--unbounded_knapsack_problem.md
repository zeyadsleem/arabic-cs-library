---
title: "Unbounded Knapsack Problem"
book: hello-algo
chapter: chapter_dynamic_programming
slug: unbounded_knapsack_problem
order: 102
lang: en
---
In this section, we first solve another common knapsack problem: the unbounded knapsack, and then explore a special case of it: the coin change problem.

## Unbounded Knapsack Problem

<div class="note">

Given $n$ items, where the weight of the $i$-th item is $wgt[i-1]$ and its value is $val[i-1]$, and a knapsack with capacity $cap$. **Each item can be selected multiple times**. What is the maximum value that can be placed in the knapsack within the capacity limit? An example is shown in the figure below.

</div>

![Example data for unbounded knapsack problem](/images/hello-algo/chapter_dynamic_programming--unbounded_knapsack_example.png)

### Dynamic Programming Approach

The unbounded knapsack problem is very similar to the 0-1 knapsack problem, **differing only in that there is no limit on the number of times an item can be selected**.

- In the 0-1 knapsack problem, there is only one of each type of item, so after placing item $i$ in the knapsack, we can only choose from the first $i-1$ items.
- In the unbounded knapsack problem, the quantity of each type of item is unlimited, so after placing item $i$ in the knapsack, **we can still choose from the first $i$ items**.

Under the rules of the unbounded knapsack problem, the changes in state $[i, c]$ are divided into two cases.

- **Not putting item $i$**: Same as the 0-1 knapsack problem, transfer to $[i-1, c]$.
- **Putting item $i$**: Different from the 0-1 knapsack problem, transfer to $[i, c-wgt[i-1]]$.

Thus, the state transition equation becomes:

$$
dp[i, c] = \max(dp[i-1, c], dp[i, c - wgt[i-1]] + val[i-1])
$$

### Code Implementation

Comparing the code for the two problems, there is one change in state transition from $i-1$ to $i$, with everything else identical:

### Space Optimization

Since the current state is transferred from states on the left and above, **after space optimization, each row in the $dp$ table should be traversed in forward order**.

This traversal order is exactly opposite to the 0-1 knapsack. Please refer to the figure below to understand the difference between the two.

The code implementation is relatively simple, just delete the first dimension of the array `dp`:

## Coin Change Problem

The knapsack problem represents a large class of dynamic programming problems and has many variants, such as the coin change problem.

<div class="note">

Given $n$ types of coins, where the denomination of the $i$-th type of coin is $coins[i - 1]$, and the target amount is $amt$. **Each type of coin can be selected multiple times**. What is the minimum number of coins needed to make up the target amount? If it is impossible to make up the target amount, return $-1$. An example is shown in the figure below.

</div>

![Example data for coin change problem](/images/hello-algo/chapter_dynamic_programming--coin_change_example.png)

### Dynamic Programming Approach

**The coin change problem can be viewed as a special case of the unbounded knapsack problem**, with the following connections and differences.

- The two problems can be converted to each other: "item" corresponds to "coin", "item weight" corresponds to "coin denomination", and "knapsack capacity" corresponds to "target amount".
- The optimization goals are opposite: the unbounded knapsack problem aims to maximize item value, while the coin change problem aims to minimize the number of coins.
- The unbounded knapsack problem seeks solutions "not exceeding" the knapsack capacity, while the coin change problem seeks solutions that "exactly" make up the target amount.

**Step 1: Think about the decisions in each round, define the state, and thus obtain the $dp$ table**

State $[i, a]$ corresponds to the subproblem: **the minimum number of coins among the first $i$ types of coins that can make up amount $a$**, denoted as $dp[i, a]$.

The two-dimensional $dp$ table has size $(n+1) \times (amt+1)$.

**Step 2: Identify the optimal substructure, and then derive the state transition equation**

This problem differs from the unbounded knapsack problem in the following two aspects regarding the state transition equation.

- This problem seeks the minimum value, so the operator $\max()$ needs to be changed to $\min()$.
- The optimization target is the number of coins rather than item value, so when a coin is selected, simply add $1$.

$$
dp[i, a] = \min(dp[i-1, a], dp[i, a - coins[i-1]] + 1)
$$

**Step 3: Determine boundary conditions and state transition order**

When the target amount is $0$, the minimum number of coins needed to make it up is $0$, so all $dp[i, 0]$ in the first column equal $0$.

When there are no coins, **it is impossible to make up any amount $> 0$**, which is an invalid solution. To enable the $\min()$ function in the state transition equation to identify and filter out invalid solutions, we consider using $+ \infty$ to represent them, i.e., set all $dp[0, a]$ in the first row to $+ \infty$.

### Code Implementation

Most programming languages do not provide a $+ \infty$ variable, and can only use the maximum value of integer type `int` as a substitute. However, this can lead to integer overflow: the $+ 1$ operation in the state transition equation may cause overflow.

For this reason, we use the number $amt + 1$ to represent invalid solutions, because the maximum number of coins needed to make up $amt$ is at most $amt$. Before returning, check whether $dp[n, amt]$ equals $amt + 1$; if so, return $-1$, indicating that the target amount cannot be made up. The code is as follows:

The figure below shows the dynamic programming process for coin change, which is very similar to the unbounded knapsack problem.

### Space Optimization

The space optimization for the coin change problem is handled in the same way as the unbounded knapsack problem:

## Coin Change Problem II

<div class="note">

Given $n$ types of coins, where the denomination of the $i$-th type of coin is $coins[i - 1]$, and the target amount is $amt$. Each type of coin can be selected multiple times. **What is the number of coin combinations that can make up the target amount?** An example is shown in the figure below.

</div>

![Example data for coin change problem II](/images/hello-algo/chapter_dynamic_programming--coin_change_ii_example.png)

### Dynamic Programming Approach

Compared to the previous problem, this problem's goal is to find the number of combinations, so the subproblem becomes: **the number of combinations among the first $i$ types of coins that can make up amount $a$**. The $dp$ table remains a two-dimensional matrix of size $(n+1) \times (amt + 1)$.

The number of combinations for the current state equals the sum of the combinations from not selecting the current coin and selecting the current coin. The state transition equation is:

$$
dp[i, a] = dp[i-1, a] + dp[i, a - coins[i-1]]
$$

When the target amount is $0$, no coins need to be selected to make up the target amount, so all $dp[i, 0]$ in the first column should be initialized to $1$. When there are no coins, it is impossible to make up any amount $>0$, so all $dp[0, a]$ in the first row equal $0$.

### Code Implementation

### Space Optimization

The space optimization is handled in the same way, just delete the coin dimension:
