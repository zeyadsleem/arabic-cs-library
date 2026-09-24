---
title: "Backtracking Algorithm"
book: hello-algo
chapter: chapter_backtracking
slug: backtracking_algorithm
order: 91
lang: en
---
<u>The backtracking algorithm</u> is a method for solving problems through exhaustive search. Its core idea is to start from an initial state and exhaustively search all possible solutions. When a correct solution is found, it is recorded. This process continues until a solution is found or all possible choices have been tried without finding a solution.

The backtracking algorithm typically employs "depth-first search" to traverse the solution space. In the "Binary Tree" chapter, we mentioned that preorder, inorder, and postorder traversals all belong to depth-first search. Next, we will construct a backtracking problem using preorder traversal to progressively understand how the backtracking algorithm works.

<div class="note">
<p class="note__title">Example 1</p>

Given a binary tree, search and record all nodes with value $7$, and return a list of these nodes.

</div>

For this problem, we perform a preorder traversal of the tree and check whether the current node's value is $7$. If it is, we add the node to the result list `res`. The relevant implementation is shown in the following figure and code:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Preorder traversal: Example 1 */
function preOrder(root: TreeNode | null, res: TreeNode[]): void {
    if (root === null) {
        return;
    }
    if (root.val === 7) {
        // Record solution
        res.push(root);
    }
    preOrder(root.left, res);
    preOrder(root.right, res);
}
```

</div>

![Search for nodes in preorder traversal](/images/hello-algo/chapter_backtracking--preorder_find_nodes.png)

## Attempt and Backtrack

**The reason it is called a backtracking algorithm is that it employs "attempt" and "backtrack" strategies when searching the solution space**. When the algorithm encounters a state where it cannot continue forward or cannot find a solution that satisfies the constraints, it will undo the previous choice, return to a previous state, and try other possible choices.

For Example 1, visiting each node represents an "attempt", while skipping over a leaf node or the `return` that brings the traversal back to the parent node represents a "backtrack".

It is worth noting that **backtracking is not limited to function returns alone**. To illustrate this, let's extend Example 1 slightly.

<div class="note">
<p class="note__title">Example 2</p>

In a binary tree, search all nodes with value $7$, **and return the paths from the root node to these nodes**.

</div>

Based on the code from Example 1, we need to use a list `path` to record the path of visited nodes. When we reach a node with value $7$, we copy `path` and add it to the result list `res`. After traversal is complete, `res` contains all the solutions. The code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Preorder traversal: Example 2 */
function preOrder(
    root: TreeNode | null,
    path: TreeNode[],
    res: TreeNode[][]
): void {
    if (root === null) {
        return;
    }
    // Attempt
    path.push(root);
    if (root.val === 7) {
        // Record solution
        res.push([...path]);
    }
    preOrder(root.left, path, res);
    preOrder(root.right, path, res);
    // Backtrack
    path.pop();
}
```

</div>

In each "attempt", we record the path by adding the current node to `path`; before "backtracking", we need to remove the node from `path`, **to restore the state before this attempt**.

Observing the process shown in the following figure, **we can understand attempt and backtrack as "advance" and "undo"**, two operations that are the reverse of each other.

## Pruning

Complex backtracking problems usually contain one or more constraints. **Constraints can typically be used for "pruning"**.

<div class="note">
<p class="note__title">Example 3</p>

In a binary tree, search all nodes with value $7$ and return the paths from the root node to these nodes, **but require that the paths do not contain nodes with value $3$**.

</div>

To satisfy the above constraints, **we need to add pruning operations**: during the search process, if we encounter a node with value $3$, we return early and do not continue searching. The code is as follows:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Preorder traversal: Example 3 */
function preOrder(
    root: TreeNode | null,
    path: TreeNode[],
    res: TreeNode[][]
): void {
    // Pruning
    if (root === null || root.val === 3) {
        return;
    }
    // Attempt
    path.push(root);
    if (root.val === 7) {
        // Record solution
        res.push([...path]);
    }
    preOrder(root.left, path, res);
    preOrder(root.right, path, res);
    // Backtrack
    path.pop();
}
```

</div>

"Pruning" is a vivid term. As shown in the following figure, during the search process, **we "prune" search branches that do not satisfy the constraints**, avoiding many meaningless attempts and thus improving search efficiency.

![Pruning according to constraints](/images/hello-algo/chapter_backtracking--preorder_find_constrained_paths.png)

## Framework Code

Next, we attempt to extract a general framework centered on backtracking's "attempt, backtrack, and pruning" to improve code generality.

In the following framework code, `state` represents the current state of the problem, and `choices` represents the choices available in the current state:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title=""
/* Backtracking algorithm framework */
func backtrack(state *State, choices []Choice, res *[]State) {
    // Check if it is a solution
    if isSolution(state) {
        // Record the solution
        recordSolution(state, res)
        // Stop searching
        return
    }
    // Traverse all choices
    for _, choice := range choices {
        // Pruning: check if the choice is valid
        if isValid(state, choice) {
            // Attempt: make a choice and update the state
            makeChoice(state, choice)
            backtrack(state, choices, res)
            // Backtrack: undo the choice and restore to the previous state
            undoChoice(state, choice)
        }
    }
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title=""
/* Backtracking algorithm framework */
function backtrack(state: State, choices: Choice[], res: State[]): void {
    // Check if it is a solution
    if (isSolution(state)) {
        // Record the solution
        recordSolution(state, res);
        // Stop searching
        return;
    }
    // Traverse all choices
    for (let choice of choices) {
        // Pruning: check if the choice is valid
        if (isValid(state, choice)) {
            // Attempt: make a choice and update the state
            makeChoice(state, choice);
            backtrack(state, choices, res);
            // Backtrack: undo the choice and restore to the previous state
            undoChoice(state, choice);
        }
    }
}
```

</div>

Next, we solve Example 3 based on the framework code. The state `state` is the node traversal path, the choices `choices` are the left and right child nodes of the current node, and the result `res` is a list of paths:

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* Backtracking algorithm: Example 3 */
function backtrack(
    state: TreeNode[],
    choices: TreeNode[],
    res: TreeNode[][]
): void {
    // Check if it is a solution
    if (isSolution(state)) {
        // Record solution
        recordSolution(state, res);
    }
    // Traverse all choices
    for (const choice of choices) {
        // Pruning: check if the choice is valid
        if (isValid(state, choice)) {
            // Attempt: make choice, update state
            makeChoice(state, choice);
            // Proceed to the next round of selection
            backtrack(state, [choice.left, choice.right], res);
            // Backtrack: undo choice, restore to previous state
            undoChoice(state);
        }
    }
}
```

</div>

As per the problem statement, we should continue searching after finding a node with value $7$. **Therefore, we need to remove the `return` statement after recording the solution**. The following figure compares the search process with and without the `return` statement.

![Comparison of search process with and without return statement](/images/hello-algo/chapter_backtracking--backtrack_remove_return_or_not.png)

Compared to code based on preorder traversal, code based on the backtracking algorithm framework appears more verbose, but is more general. In fact, **many backtracking problems can be solved within this framework**. We only need to define `state` and `choices` for the specific problem and implement each method in the framework.

## Common Terminology

To analyze algorithmic problems more clearly, we summarize the meanings of common terminology used in backtracking algorithms and provide corresponding examples from Example 3, as shown in the following table.

<p align="center"> Table <id> &nbsp; Common Backtracking Algorithm Terminology </p>

| Term                      | Definition                                                                                                                   | Example 3                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Solution (solution)       | A solution is an answer that satisfies the specific conditions of a problem; there may be one or more solutions             | All paths from root to nodes with value $7$ that satisfy the constraint            |
| Constraint (constraint)   | A constraint is a condition in the problem that limits the feasibility of solutions, typically used for pruning              | Paths do not contain nodes with value $3$                                          |
| State (state)             | State represents the situation of a problem at a certain moment, including the choices already made                           | The currently visited node path, i.e., the `path` list of nodes                    |
| Attempt (attempt)         | An attempt is the process of exploring the solution space according to available choices, including making choices, updating state, and checking if it is a solution | Recursively visit left (right) child nodes, add nodes to `path`, check if node value is $7$ |
| Backtrack (backtracking)  | Backtracking refers to undoing previous choices and returning to a previous state when encountering a state that does not satisfy constraints | Stop searching when passing over leaf nodes, ending node visits, or encountering nodes with value $3$; function returns |
| Pruning (pruning)         | Pruning is a method of avoiding meaningless search paths according to problem characteristics and constraints, which can improve search efficiency | When encountering a node with value $3$, do not continue searching                 |

<div class="note">

The concepts of problem, solution, state, etc. are universal and appear in divide-and-conquer, backtracking, dynamic programming, greedy algorithms, and others.

</div>

## Advantages and Limitations

The backtracking algorithm is essentially a depth-first search algorithm that tries all possible solutions until it finds one that satisfies the conditions. The advantage of this approach is that it can find all possible solutions, and with reasonable pruning operations, it achieves high efficiency.

However, when dealing with large-scale or complex problems, **the running efficiency of the backtracking algorithm may be unacceptable**.

- **Time**: The backtracking algorithm usually needs to traverse all possibilities in the state space, and the time complexity can reach exponential or factorial order.
- **Space**: During recursive calls, the current state needs to be saved (such as paths, auxiliary variables used for pruning, etc.), and when the depth is large, the space requirement can become very large.

Nevertheless, **the backtracking algorithm is still the best solution for certain search problems and constraint satisfaction problems**. For these problems, since we cannot predict which choices will generate valid solutions, we must traverse all possible choices. In this case, **the key is how to optimize efficiency**. There are two common efficiency optimization methods.

- **Pruning**: Avoid searching paths that are guaranteed not to produce solutions, thereby saving time and space.
- **Heuristic search**: Introduce certain strategies or estimation values during the search process to prioritize searching paths that are most likely to produce valid solutions.

## Typical Backtracking Examples

The backtracking algorithm can be used to solve many search problems, constraint satisfaction problems, and combinatorial optimization problems.

**Search problems**: The goal of these problems is to find solutions that satisfy specific conditions.

- Permutation problem: Given a set, find all possible permutations and combinations.
- Subset sum problem: Given a set and a target sum, find all subsets in the set whose elements sum to the target.
- Tower of Hanoi: Given three pegs and a series of disks of different sizes, move all disks from one peg to another, moving only one disk at a time, and never placing a larger disk on a smaller disk.

**Constraint satisfaction problems**: The goal of these problems is to find solutions that satisfy all constraints.

- N-Queens: Place $n$ queens on an $n \times n$ chessboard such that they do not attack each other.
- Sudoku: Fill numbers $1$ to $9$ in a $9 \times 9$ grid such that each row, column, and $3 \times 3$ subgrid contains no repeated digits.
- Graph coloring: Given an undirected graph, color each vertex with the minimum number of colors such that adjacent vertices have different colors.

**Combinatorial optimization problems**: The goal of these problems is to find an optimal solution that satisfies certain conditions in a combinatorial space.

- 0-1 Knapsack: Given a set of items and a knapsack, each item has a value and weight. Under the knapsack capacity constraint, select items to maximize total value.
- Traveling Salesman Problem: Starting from a point in a graph, visit all other points exactly once and return to the starting point, finding the shortest path.
- Maximum Clique: Given an undirected graph, find the largest complete subgraph, i.e., a subgraph where any two vertices are connected by an edge.

Note that for many combinatorial optimization problems, backtracking is not the optimal solution.

- The 0-1 Knapsack problem is usually solved using dynamic programming to achieve higher time efficiency.
- The Traveling Salesman Problem is a famous NP-Hard problem; common solutions include genetic algorithms and ant colony algorithms.
- The Maximum Clique problem is a classical problem in graph theory and can be solved using heuristic algorithms such as greedy algorithms.
