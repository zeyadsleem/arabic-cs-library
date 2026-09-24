---
title: "Introduction to Dynamic Programming"
book: hello-algo
chapter: chapter_dynamic_programming
slug: intro_to_dynamic_programming
order: 98
lang: en
---
<u>Dynamic programming</u> is an important algorithmic paradigm that decomposes a problem into a series of smaller subproblems and avoids redundant computation by storing the solutions to subproblems, thereby significantly improving time efficiency.

In this section, we start with a classic example, first presenting its brute force backtracking solution, observing the overlapping subproblems within it, and then gradually deriving a more efficient dynamic programming solution.

<div class="note">
<p class="note__title">Climbing stairs</p>

Given a staircase with $n$ steps, where you can climb $1$ or $2$ steps at a time, how many different ways are there to reach the top?

</div>

As shown in the figure below, for a $3$-step staircase, there are $3$ different ways to reach the top.

![Number of ways to reach the 3rd step](/images/hello-algo/chapter_dynamic_programming--climbing_stairs_example.png)

The goal of this problem is to determine the number of ways, so **we can consider using backtracking to enumerate all possibilities**. Specifically, imagine climbing stairs as a multi-round selection process: starting from the ground, choosing to go up $1$ or $2$ steps in each round, incrementing the count by $1$ whenever the top of the stairs is reached, and pruning when exceeding the top. The code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* Climbing stairs: Backtracking */
func climbingStairsBacktrack(n int) int {
	// Can choose to climb up 1 or 2 stairs
	choices := []int{1, 2}
	// Start climbing from the 0-th stair
	state := 0
	res := make([]int, 1)
	// Use res[0] to record the solution count
	res[0] = 0
	backtrack(choices, state, n, res)
	return res[0]
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Climbing stairs: Backtracking */
function climbingStairsBacktrack(n: number): number {
    const choices = [1, 2]; // Can choose to climb up 1 or 2 stairs
    const state = 0; // Start climbing from the 0-th stair
    const res = new Map();
    res.set(0, 0); // Use res[0] to record the solution count
    backtrack(choices, state, n, res);
    return res.get(0);
}
```

</div>

## Method 1: Brute Force Search

Backtracking algorithms typically do not explicitly decompose problems, but rather treat solving the problem as a series of decision steps, searching for all possible solutions through trial and pruning.

We can try to analyze this problem from the perspective of problem decomposition. Let the number of ways to climb to the $i$-th step be $dp[i]$, then $dp[i]$ is the original problem, and its subproblems include:

$$
dp[i-1], dp[i-2], \dots, dp[2], dp[1]
$$

Since we can only go up $1$ or $2$ steps in each round, when we stand on the $i$-th step, we could only have been on the $i-1$-th or $i-2$-th step in the previous round. In other words, we can only reach the $i$-th step from the $i-1$-th or $i-2$-th step.

This leads to an important conclusion: **the number of ways to climb to the $i-1$-th step plus the number of ways to climb to the $i-2$-th step equals the number of ways to climb to the $i$-th step**. The formula is as follows:

$$
dp[i] = dp[i-1] + dp[i-2]
$$

This means that in the stair climbing problem, there exists a recurrence relation among the subproblems, and **the solution to the original problem can be constructed from the solutions to the subproblems**. The figure below illustrates this recurrence relation.

![Recurrence relation for the number of ways](/images/hello-algo/chapter_dynamic_programming--climbing_stairs_state_transfer.png)

We can obtain a brute force search solution based on the recurrence formula. Starting from $dp[n]$, **recursively decompose a larger problem into the sum of two smaller problems**, until reaching the smallest subproblems $dp[1]$ and $dp[2]$ and returning. Among them, the solutions to the smallest subproblems are known, namely $dp[1] = 1$ and $dp[2] = 2$, representing $1$ and $2$ ways to climb to the $1$st and $2$nd steps, respectively.

Observe the following code: like standard backtracking code, it also uses depth-first search but is more concise:

The figure below shows the recursion tree formed by brute force search. For the problem $dp[n]$, the depth of its recursion tree is $n$, with a time complexity of $O(2^n)$. Exponential growth is explosive; if we input a relatively large $n$, the wait can be very long.

![Recursion tree for climbing stairs](/images/hello-algo/chapter_dynamic_programming--climbing_stairs_dfs_tree.png)

Observing the above figure, **the exponential time complexity is caused by "overlapping subproblems"**. For example, $dp[9]$ is decomposed into $dp[8]$ and $dp[7]$, and $dp[8]$ is decomposed into $dp[7]$ and $dp[6]$, both of which contain the subproblem $dp[7]$.

And so on, subproblems contain smaller overlapping subproblems, ad infinitum. The vast majority of computational resources are wasted on these overlapping subproblems.

## Method 2: Memoization

To improve algorithm efficiency, **we want all overlapping subproblems to be computed only once**. For this purpose, we declare an array `mem` to record the solution to each subproblem and prune overlapping subproblems during the search process.

1. When computing $dp[i]$ for the first time, we record it in `mem[i]` for later use.
2. When we need to compute $dp[i]$ again, we can directly retrieve the result from `mem[i]`, thereby avoiding redundant computation of that subproblem.

The code is as follows:

Observe the figure below: **after memoization, all overlapping subproblems need to be computed only once, reducing the time complexity to $O(n)$**, which is a tremendous leap.

![Recursion tree with memoization](/images/hello-algo/chapter_dynamic_programming--climbing_stairs_dfs_memo_tree.png)

## Method 3: Dynamic Programming

**Memoization is a "top-down" method**: we start from the original problem (root node), recursively decompose larger subproblems into smaller ones, until reaching the smallest known subproblems (leaf nodes). Afterward, by backtracking, we collect the solutions to the subproblems layer by layer to construct the solution to the original problem.

In contrast, **dynamic programming is a "bottom-up" method**: starting from the solutions to the smallest subproblems, iteratively constructing solutions to larger subproblems until obtaining the solution to the original problem.

Since dynamic programming does not include a backtracking process, it only requires loop iteration for implementation and does not need recursion. In the following code, we initialize an array `dp` to store the solutions to subproblems, which serves the same recording function as the array `mem` in memoization:

The figure below simulates the execution process of the above code.

![Dynamic programming process for climbing stairs](/images/hello-algo/chapter_dynamic_programming--climbing_stairs_dp.png)

Like backtracking algorithms, dynamic programming also uses the "state" concept to represent specific stages of problem solving, with each state corresponding to a subproblem and its corresponding local optimal solution. For example, the state in the stair climbing problem is defined as the current stair step number $i$.

Based on the above content, we can summarize the commonly used terminology in dynamic programming.

- The array `dp` is called the <u>dp table</u>, where $dp[i]$ represents the solution to the subproblem corresponding to state $i$.
- The states corresponding to the smallest subproblems (the $1$st and $2$nd steps) are called <u>initial states</u>.
- The recurrence formula $dp[i] = dp[i-1] + dp[i-2]$ is called the <u>state transition equation</u>.

## Space Optimization

Observant readers may have noticed that **since $dp[i]$ is only related to $dp[i-1]$ and $dp[i-2]$, we do not need to use an array `dp` to store the solutions to all subproblems**, and can instead use two variables that roll forward. The code is as follows:

As the above code shows, by eliminating the space occupied by the array `dp`, the space complexity is reduced from $O(n)$ to $O(1)$.

In dynamic programming problems, the current state often depends only on a limited number of preceding states, allowing us to retain only the necessary states and save memory space through "dimension reduction". **This space optimization technique is called "rolling variable" or "rolling array"**.
