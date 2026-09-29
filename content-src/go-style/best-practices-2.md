---
title: "أفضل ممارسات أسلوب Go (2 من 2)"
lang: en
---

## Function argument lists

Don’t let the signature of a function get too long. As more parameters are added to a function, the role of individual parameters becomes less clear, and adjacent parameters of the same type become easier to confuse. Functions with large numbers of arguments are less memorable and more difficult to read at the call-site.

When designing an API, consider splitting a highly configurable function whose signature is growing complex into several simpler ones. These can share an (unexported) implementation if necessary.

Where a function requires many inputs, consider introducing an [option struct](#option-structure) for some of the arguments or employing the more advanced [variadic options](#variadic-options) technique. The primary consideration for which strategy to choose should be how the function call looks across all expected use cases.

The recommendations below primarily apply to exported APIs, which are held to a higher standard than unexported ones. These techniques may be unnecessary for your use case. Use your judgment, and balance the principles of [clarity](guide#clarity) and [least mechanism](guide#least-mechanism).

See also: [Go Tip #24: Use Case-Specific Constructions](https://google.github.io/styleguide/go/index.html#gotip)

### Option structure

An option structure is a struct type that collects some or all of the arguments of a function or method, that is then passed as the last argument to the function or method. (The struct should be exported only if it is used in an exported function.)

Using an option structure has a number of benefits:

- The struct literal includes both fields and values for each argument, which makes them self-documenting and harder to swap.
- Irrelevant or “default” fields can be omitted.
- Callers can share the option struct and write helpers to operate on it.
- Structs provide cleaner per-field documentation than function arguments.
- Option structs can grow over time without impacting call-sites.

Here is an example of a function that could be improved:

```
// Bad:
func EnableReplication(ctx context.Context, config *replicator.Config, primaryRegions, readonlyRegions []string, replicateExisting, overwritePolicies bool, replicationInterval time.Duration, copyWorkers int, healthWatcher health.Watcher) {
    // ...
}
```

The function above could be rewritten with an option structure as follows:

```
// Good:
type ReplicationOptions struct {
    Config              *replicator.Config
    PrimaryRegions      []string
    ReadonlyRegions     []string
    ReplicateExisting   bool
    OverwritePolicies   bool
    ReplicationInterval time.Duration
    CopyWorkers         int
    HealthWatcher       health.Watcher
}
func EnableReplication(ctx context.Context, opts ReplicationOptions) {
    // ...
}
```

The function can then be called in a different package:

```
// Good:
func foo(ctx context.Context) {
    // Complex call:
    storage.EnableReplication(ctx, storage.ReplicationOptions{
        Config:              config,
        PrimaryRegions:      []string{"us-east1", "us-central2", "us-west3"},
        ReadonlyRegions:     []string{"us-east5", "us-central6"},
        OverwritePolicies:   true,
        ReplicationInterval: 1 * time.Hour,
        CopyWorkers:         100,
        HealthWatcher:       watcher,
    })
    // Simple call:
    storage.EnableReplication(ctx, storage.ReplicationOptions{
        Config:         config,
        PrimaryRegions: []string{"us-east1", "us-central2", "us-west3"},
    })
}
```

**Note:** [Contexts are never included in option structs](decisions#contexts).

This option is often preferred when some of the following apply:

- All callers need to specify one or more of the options.
- A large number of callers need to provide many options.
- The options are shared between multiple functions that the user will call.

### Variadic options

Using variadic options, exported functions are created which return closures that can be passed to the [variadic (`...`) parameter](https://golang.org/ref/spec#Passing_arguments_to_..._parameters) of a function. The function takes as its parameters the values of the option (if any), and the returned closure accepts a mutable reference (usually a pointer to a struct type) that will be updated based on the inputs.

Using variadic options can provide a number of benefits:

- Options take no space at a call-site when no configuration is needed.
- Options are still values, so callers can share them, write helpers, and accumulate them.
- Options can accept multiple parameters (e.g. `cartesian.Translate(dx, dy int) TransformOption`).
- The option functions can return a named type to group options together in godoc.
- Packages can allow (or prevent) third-party packages to define (or from defining) their own options.

**Note:** Using variadic options requires a substantial amount of additional code (see the following example), so it should only be used when the advantages outweigh the overhead.

Here is an example of a function that could be improved:

```
// Bad:
func EnableReplication(ctx context.Context, config *placer.Config, primaryCells, readonlyCells []string, replicateExisting, overwritePolicies bool, replicationInterval time.Duration, copyWorkers int, healthWatcher health.Watcher) {
  ...
}
```

The example above could be rewritten with variadic options as follows:

```javascript
// Good:
type replicationOptions struct {
    readonlyCells       []string
    replicateExisting   bool
    overwritePolicies   bool
    replicationInterval time.Duration
    copyWorkers         int
    healthWatcher       health.Watcher
}
// A ReplicationOption configures EnableReplication.
type ReplicationOption func(*replicationOptions)
// ReadonlyCells adds additional cells that should additionally
// contain read-only replicas of the data.
//
// Passing this option multiple times will add additional
// read-only cells.
//
// Default: none
func ReadonlyCells(cells ...string) ReplicationOption {
    return func(opts *replicationOptions) {
        opts.readonlyCells = append(opts.readonlyCells, cells...)
    }
}
// ReplicateExisting controls whether files that already exist in the
// primary cells will be replicated.  Otherwise, only newly-added
// files will be candidates for replication.
//
// Passing this option again will overwrite earlier values.
//
// Default: false
func ReplicateExisting(enabled bool) ReplicationOption {
    return func(opts *replicationOptions) {
        opts.replicateExisting = enabled
    }
}
// ... other options ...
// DefaultReplicationOptions control the default values before
// applying options passed to EnableReplication.
var DefaultReplicationOptions = []ReplicationOption{
    OverwritePolicies(true),
    ReplicationInterval(12 * time.Hour),
    CopyWorkers(10),
}
func EnableReplication(ctx context.Context, config *placer.Config, primaryCells []string, opts ...ReplicationOption) {
    var options replicationOptions
    for _, opt := range DefaultReplicationOptions {
        opt(&options)
    }
    for _, opt := range opts {
        opt(&options)
    }
}
```

The function can then be called in a different package:

```
// Good:
func foo(ctx context.Context) {
    // Complex call:
    storage.EnableReplication(ctx, config, []string{"po", "is", "ea"},
        storage.ReadonlyCells("ix", "gg"),
        storage.OverwritePolicies(true),
        storage.ReplicationInterval(1*time.Hour),
        storage.CopyWorkers(100),
        storage.HealthWatcher(watcher),
    )
    // Simple call:
    storage.EnableReplication(ctx, config, []string{"po", "is", "ea"})
}
```

Prefer this option when many of the following apply:

- Most callers will not need to specify any options.
- Most options are used infrequently.
- There are a large number of options.
- Options require arguments.
- Options could fail or be set incorrectly (in which case the option function returns an `error`).
- Options require a lot of documentation that can be hard to fit in a struct.
- Users or other packages can provide custom options.

Options in this style should accept parameters rather than using presence to signal their value; the latter can make dynamic composition of arguments much more difficult. For example, binary settings should accept a boolean (e.g. `rpc.FailFast(enable bool)` is preferable to `rpc.EnableFailFast()`). An enumerated option should accept an enumerated constant (e.g. `log.Format(log.Capacitor)` is preferable to `log.CapacitorFormat()`). The alternative makes it much more difficult for users who must programmatically choose which options to pass; such users are forced to change the actual composition of the parameters rather than simply changing the arguments to the options. Don’t assume that all users will know the full set of options statically.

In general, options should be processed in order. If there is a conflict or if a non-cumulative option is passed multiple times, the last argument should win.

The parameter to the option function is generally unexported in this pattern, to restrict the options to being defined only within the package itself. This is a good default, though there may be times when it is appropriate to allow other packages to define options.

See [Rob Pike’s original blog post](http://commandcenter.blogspot.com/2014/01/self-referential-functions-and-design.html) and [Dave Cheney’s talk](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis) for a more in-depth look at how these options can be used.

## Complex command-line interfaces

Some programs wish to present users with a rich command-line interface that includes sub-commands. For example, `kubectl create`, `kubectl run`, and many other sub-commands are all provided by the program `kubectl`. There are at least the following libraries in common use for achieving this.

If you don’t have a preference or other considerations are equal, [subcommands](https://pkg.go.dev/github.com/google/subcommands) is recommended, since it is the simplest and is easy to use correctly. However, if you need different features that it doesn’t provide, pick one of the other options.

- **[cobra](https://pkg.go.dev/github.com/spf13/cobra)** Flag convention: getopt
- Common outside the Google codebase.
- Many extra features.
- Pitfalls in usage (see below).

**[subcommands](https://pkg.go.dev/github.com/google/subcommands)**

- Flag convention: Go
- Simple and easy to use correctly.
- Recommended if you don’t need extra features.

**Warning**: cobra command functions should use `cmd.Context()` to obtain a context rather than creating their own root context with `context.Background`. Code that uses the subcommands package already receives the correct context as a function parameter.

You are not required to place each subcommand in a separate package, and it is often not necessary to do so. Apply the same considerations about package boundaries as in any Go codebase. If your code can be used both as a library and as a binary, it is usually beneficial to separate the CLI code and the library, making the CLI just one more of its clients. (This is not specific to CLIs that have subcommands, but is mentioned here because it is a common place where it comes up.)

## Tests

### Leave testing to the `Test` function

Go distinguishes between “test helpers” and “assertion helpers”:

- **Test helpers** are functions that do setup or cleanup tasks. All failures that occur in test helpers are expected to be failures of the environment (not from the code under test) — for example when a test database cannot be started because there are no more free ports on this machine. For functions like these, calling `t.Helper` is often appropriate to [mark them as a test helper](decisions#mark-test-helpers). See [error handling in test helpers](#test-helper-error-handling) for more details.
- **Assertion helpers** are functions that check the correctness of a system and fail the test if an expectation is not met. Assertion helpers are [not considered idiomatic](decisions#assert) in Go.

The purpose of a test is to report pass/fail conditions of the code under test. The ideal place to fail a test is within the `Test` function itself, as that ensures that [failure messages](decisions#useful-test-failures) and the test logic are clear.

As your testing code grows, it may become necessary to factor out some functionality to separate functions. Standard software engineering considerations still apply, as *test code is still code*. If the functionality does not interact with the testing framework, then all of the usual rules apply. When the common code interacts with the framework, however, some care must be taken to avoid common pitfalls that can lead to uninformative failure messages and unmaintainable tests.

If many separate test cases require the same validation logic, arrange the test in one of the following ways instead of using assertion helpers or complex validation functions:

- Inline the logic (both the validation and the failure) in the `Test` function, even if it is repetitive. This works best in simple cases.
- If inputs are similar, consider unifying them into a [table-driven test](decisions#table-driven-tests) while keeping the logic inlined in the loop. This helps to avoid repetition while keeping the validation and failure in the `Test`.
- If there are multiple callers who need the same validation function but table tests are not suitable (typically because the inputs are not simple enough or the validation is required as part of a sequence of operations), arrange the validation function so that it returns a value (typically an `error`) rather than taking a `testing.T` parameter and using it to fail the test. Use logic within the `Test` to decide whether to fail, and to provide [useful test failures](decisions#useful-test-failures). You can also create test helpers to factor out common boilerplate setup code.

The design outlined in the last point maintains orthogonality. For example, [package `cmp`](https://pkg.go.dev/github.com/google/go-cmp/cmp) is not designed to fail tests, but rather to compare (and to diff) values. It therefore does not need to know about the context in which the comparison was made, since the caller can supply that. If your common testing code provides a `cmp.Transformer` for your data type, that can often be the simplest design. For other validations, consider returning an `error` value.

```
// Good:
// polygonCmp returns a cmp.Option that equates s2 geometry objects up to
// some small floating-point error.
func polygonCmp() cmp.Option {
    return cmp.Options{
        cmp.Transformer("polygon", func(p *s2.Polygon) []*s2.Loop { return p.Loops() }),
        cmp.Transformer("loop", func(l *s2.Loop) []s2.Point { return l.Vertices() }),
        cmpopts.EquateApprox(0.00000001, 0),
        cmpopts.EquateEmpty(),
    }
}
func TestFenceposts(t *testing.T) {
    // This is a test for a fictional function, Fenceposts, which draws a fence
    // around some Place object. The details are not important, except that
    // the result is some object that has s2 geometry (github.com/golang/geo/s2)
    got := Fencepost(tomsDiner, 1*meter)
    if diff := cmp.Diff(want, got, polygonCmp()); diff != "" {
        t.Errorf("Fencepost(tomsDiner, 1m) returned unexpected diff (-want+got):\n%v", diff)
    }
}
func FuzzFencepost(f *testing.F) {
    // Fuzz test (https://go.dev/doc/fuzz) for the same.
    f.Add(tomsDiner, 1*meter)
    f.Add(school, 3*meter)
    f.Fuzz(func(t *testing.T, geo Place, padding Length) {
        got := Fencepost(geo, padding)
        // Simple reference implementation: not used in prod, but easy to
        // reason about and therefore useful to check against in random tests.
        reference := slowFencepost(geo, padding)
        // In the fuzz test, inputs and outputs can be large so don't
        // bother with printing a diff. cmp.Equal is enough.
        if !cmp.Equal(got, reference, polygonCmp()) {
            t.Errorf("Fencepost returned wrong placement")
        }
    })
}
```

The `polygonCmp` function is agnostic about how it’s called; it doesn’t take a concrete input type nor does it police what to do in case two objects don’t match. Therefore, more callers can make use of it.

**Note:** There is an analogy between test helpers and plain library code. Code in libraries should usually [not panic](decisions#dont-panic) except in rare circumstances; code called from a test should not stop the test unless there is [no point in proceeding](#t-fatal).

### Designing extensible validation APIs

Most of the advice about testing in the style guide is about testing your own code. This section is about how to provide facilities for other people to test the code they write to ensure that it conforms to your library’s requirements.

#### Acceptance testing

Such testing is referred to as [acceptance testing](https://en.wikipedia.org/wiki/Acceptance_testing). The premise of this kind of testing is that the person using the test does not know every last detail of what goes on in the test; they just hand the inputs over to the testing facility to do the work. This can be thought of as a form of [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control).

In a typical Go test, the test function controls the program flow, and the [no assert](decisions#assert) and [test functions](#test-functions) guidance encourages you to keep it that way. This section explains how to author support for these tests in a way that is consistent with Go style.

Before diving into how, consider an example from [`io/fs`](https://pkg.go.dev/io/fs), excerpted below:

```
type FS interface {
    Open(name string) (File, error)
}
```

While there exist well-known implementations of `fs.FS`, a Go developer may be expected to author one. To help validate the user-implemented `fs.FS` is correct, a generic library has been provided in [`testing/fstest`](https://pkg.go.dev/testing/fstest) called [`fstest.TestFS`](https://pkg.go.dev/testing/fstest#TestFS). This API treats the implementation as a blackbox to make sure it upholds the most basic parts of the `io/fs` contract.

#### Writing an acceptance test

Now that we know what an acceptance test is and why you might use one, let’s explore building an acceptance test for `package chess`, a package used to simulate chess games. Users of `chess` are expected to implement the `chess.Player` interface. These implementations are the primary thing we will validate. Our acceptance test concerns itself with whether the player implementation makes legal moves, not whether the moves are smart.

Create a new package for the validation behavior, [customarily named](#naming-doubles-helper-package) by appending the word `test` to the package name (for example, `chesstest`).

Create the function that performs the validation by accepting the implementation under test as an argument and exercises it:

```
// ExercisePlayer tests a Player implementation in a single turn on a board.
// The board itself is spot checked for sensibility and correctness.
//
// It returns a nil error if the player makes a correct move in the context
// of the provided board. Otherwise ExercisePlayer returns one of this
// package's errors to indicate how and why the player failed the
// validation.
func ExercisePlayer(b *chess.Board, p chess.Player) error
```

The test should note which invariants are broken and how. Your design can choose between two disciplines for failure reporting:

**Fail fast**: return an error as soon as the implementation violates an invariant.

This is the simplest approach, and it works well if the acceptance test is expected to execute quickly. Simple error [sentinels](https://google.github.io/styleguide/go/index.html#gotip) and [custom types](https://google.github.io/styleguide/go/index.html#gotip) can be used easily here, which conversely makes testing the acceptance test easy.

```
for color, army := range b.Armies {
    // The king should never leave the board, because the game ends at
    // checkmate.
    if army.King == nil {
        return &MissingPieceError{Color: color, Piece: chess.King}
    }
}
```

**Aggregate all failures**: collect all failures, and report them all.

This approach resembles the [keep going](decisions#keep-going) guidance in feel and may be preferable if the acceptance test is expected to execute slowly.

How you aggregate the failures should be dictated by whether you want to give users the ability or yourself the ability to interrogate individual failures (for example, for you to test your acceptance test). Below demonstrates using a [custom error type](https://google.github.io/styleguide/go/index.html#gotip) that [aggregates errors](https://google.github.io/styleguide/go/index.html#gotip):

```javascript
var badMoves []error
move := p.Move()
if putsOwnKingIntoCheck(b, move) {
    badMoves = append(badMoves, PutsSelfIntoCheckError{Move: move})
}
if len(badMoves) > 0 {
    return SimulationError{BadMoves: badMoves}
}
return nil
```

The acceptance test should honor the [keep going](decisions#keep-going) guidance by not calling `t.Fatal` unless the test detects a broken invariant in the system being exercised.

For example, `t.Fatal` should be reserved for exceptional cases such as [setup failure](#test-helper-error-handling) as usual:

```
func ExerciseGame(t *testing.T, cfg *Config, p chess.Player) error {
    t.Helper()
    if cfg.Simulation == Modem {
        conn, err := modempool.Allocate()
        if err != nil {
            t.Fatalf("No modem for the opponent could be provisioned: %v", err)
        }
        t.Cleanup(func() { modempool.Return(conn) })
    }
    // Run acceptance test (a whole game).
}
```

This technique can help you create concise, canonical validations. But do not attempt to use it to bypass the [guidance on assertions](decisions#assert).

The final product should be in a form similar to this for end users:

```python
// Good:
package deepblue_test
import (
    "chesstest"
    "deepblue"
)
func TestAcceptance(t *testing.T) {
    player := deepblue.New()
    err := chesstest.ExerciseGame(t, chesstest.SimpleGame, player)
    if err != nil {
        t.Errorf("Deep Blue player failed acceptance test: %v", err)
    }
}
```

### Use real transports

When testing component integrations, especially where HTTP or RPC are used as the underlying transport between the components, prefer using the real underlying transport to connect to the test version of the backend.

For example, suppose the code you want to test (sometimes referred to as “system under test” or SUT) interacts with a backend that implements the [long running operations](https://pkg.go.dev/google.golang.org/genproto/googleapis/longrunning) API. To test your SUT, use a real [OperationsClient](https://pkg.go.dev/google.golang.org/genproto/googleapis/longrunning#OperationsClient) that is connected to a [test double](https://abseil.io/resources/swe-book/html/ch13.html#basic_concepts) (e.g., a mock, stub, or fake) of the [OperationsServer](https://pkg.go.dev/google.golang.org/genproto/googleapis/longrunning#OperationsServer).

This is recommended over hand-implementing the client, due to the complexity of imitating client behavior correctly. By using the production client with a test-specific server, you ensure your test is using as much of the real code as possible.

**Tip:** Where possible, use a testing library provided by the authors of the service under test.

### `t.Error` vs. `t.Fatal`

As discussed in [decisions](decisions#keep-going), tests should generally not abort at the first encountered problem.

However, some situations require that the test not proceed. Calling `t.Fatal` is appropriate when some piece of test setup fails, especially in [test setup helpers](#test-helper-error-handling), without which you cannot run the rest of the test. In a table-driven test, `t.Fatal` is appropriate for failures that set up the whole test function before the test loop. Failures that affect a single entry in the test table, which make it impossible to continue with that entry, should be reported as follows:

- If you’re not using `t.Run` subtests, use `t.Error` followed by a `continue` statement to move on to the next table entry.
- If you’re using subtests (and you’re inside a call to `t.Run`), use `t.Fatal`, which ends the current subtest and allows your test case to progress to the next subtest.

**Warning:** It is not always safe to call `t.Fatal` and similar functions. [More details here](#t-fatal-goroutine).

### Error handling in test helpers

**Note:** This section discusses [test helpers](decisions#mark-test-helpers) in the sense Go uses the term: functions that perform test setup and cleanup, not common assertion facilities. See the [test functions](#test-functions) section for more discussion.

Operations performed by a test helper sometimes fail. For example, setting up a directory with files involves I/O, which can fail. When test helpers fail, their failure often signifies that the test cannot continue, since a setup precondition failed. When this happens, prefer calling one of the `Fatal` functions in the helper:

```
// Good:
func mustAddGameAssets(t *testing.T, dir string) {
    t.Helper()
    if err := os.WriteFile(path.Join(dir, "pak0.pak"), pak0, 0644); err != nil {
        t.Fatalf("Setup failed: could not write pak0 asset: %v", err)
    }
    if err := os.WriteFile(path.Join(dir, "pak1.pak"), pak1, 0644); err != nil {
        t.Fatalf("Setup failed: could not write pak1 asset: %v", err)
    }
}
```

This keeps the calling side cleaner than if the helper were to return the error to the test itself:

```
// Bad:
func addGameAssets(t *testing.T, dir string) error {
    t.Helper()
    if err := os.WriteFile(path.Join(d, "pak0.pak"), pak0, 0644); err != nil {
        return err
    }
    if err := os.WriteFile(path.Join(d, "pak1.pak"), pak1, 0644); err != nil {
        return err
    }
    return nil
}
```

**Warning:** It is not always safe to call `t.Fatal` and similar functions. [More details](#t-fatal-goroutine) here.

The failure message should include a description of what happened. This is important, as you may be providing a testing API to many users, especially as the number of error-producing steps in the helper increases. When the test fails, the user should know where, and why.

**Tip:** Go 1.14 introduced a [`t.Cleanup`](https://pkg.go.dev/testing#T.Cleanup) function that can be used to register cleanup functions that run when your test completes. The function also works with test helpers. See [GoTip #4: Cleaning Up Your Tests](https://google.github.io/styleguide/go/index.html#gotip) for guidance on simplifying test helpers.

The snippet below in a fictional file called `paint_test.go` demonstrates how `(*testing.T).Helper` influences failure reporting in a Go test:

```python
package paint_test
import (
    "fmt"
    "testing"
)
func paint(color string) error {
    return fmt.Errorf("no %q paint today", color)
}
func badSetup(t *testing.T) {
    // This should call t.Helper, but doesn't.
    if err := paint("taupe"); err != nil {
        t.Fatalf("Could not paint the house under test: %v", err) // line 15
    }
}
func goodSetup(t *testing.T) {
    t.Helper()
    if err := paint("lilac"); err != nil {
        t.Fatalf("Could not paint the house under test: %v", err)
    }
}
func TestBad(t *testing.T) {
    badSetup(t)
    // ...
}
func TestGood(t *testing.T) {
    goodSetup(t) // line 32
    // ...
}
```

Here is an example of this output when run. Note the highlighted text and how it differs:

```
=== RUN   TestBad
    paint_test.go:15: Could not paint the house under test: no "taupe" paint today
--- FAIL: TestBad (0.00s)
=== RUN   TestGood
    paint_test.go:32: Could not paint the house under test: no "lilac" paint today
--- FAIL: TestGood (0.00s)
FAIL
```

The error with `paint_test.go:15` refers to the line of the setup function that failed in `badSetup`:

`t.Fatalf("Could not paint the house under test: %v", err)`

Whereas `paint_test.go:32` refers to the line of the test that failed in `TestGood`:

`goodSetup(t)`

Correctly using `(*testing.T).Helper` attributes the location of the failure much better when:

- the helper functions grow
- the helper functions call other helpers
- the amount of helper usage in the test functions grow

**Tip:** If a helper calls `(*testing.T).Error` or `(*testing.T).Fatal`, provide some context in the format string to help determine what went wrong and why.

**Tip:** If nothing a helper does can cause a test to fail, it doesn’t need to call `t.Helper`. Simplify its signature by removing `t` from the function parameter list.

### Don’t call `t.Fatal` from separate goroutines

As [documented in package testing](https://pkg.go.dev/testing#T), it is incorrect to call `t.FailNow`, `t.Fatal`, etc. from any goroutine but the one running the Test function (or the subtest). If your test starts new goroutines, they must not call these functions from inside these goroutines.

[Test helpers](#test-functions) usually don’t signal failure from new goroutines, and therefore it is all right for them to use `t.Fatal`. If in doubt, call `t.Error` and return instead.

```javascript
// Good:
func TestRevEngine(t *testing.T) {
    engine, err := Start()
    if err != nil {
        t.Fatalf("Engine failed to start: %v", err)
    }
    num := 11
    var wg sync.WaitGroup
    wg.Add(num)
    for i := 0; i < num; i++ {
        go func() {
            defer wg.Done()
            if err := engine.Vroom(); err != nil {
                // This cannot be t.Fatalf.
                t.Errorf("No vroom left on engine: %v", err)
                return
            }
            if rpm := engine.Tachometer(); rpm > 1e6 {
                t.Errorf("Inconceivable engine rate: %d", rpm)
            }
        }()
    }
    wg.Wait()
    if seen := engine.NumVrooms(); seen != num {
        t.Errorf("engine.NumVrooms() = %d, want %d", seen, num)
    }
}
```

Adding `t.Parallel` to a test or subtest does not make it unsafe to call `t.Fatal`.

When all calls to the `testing` API are in the [test function](#test-functions), it is usually easy to spot incorrect usage because the `go` keyword is plain to see. Passing `testing.T` arguments around makes tracking such usage harder. Typically, the reason for passing these arguments is to introduce a test helper, and those should not depend on the system under test. Therefore, if a test helper [registers a fatal test failure](#test-helper-error-handling), it can and should do so from the test’s goroutine.

### Use field names in struct literals

In table-driven tests, prefer to specify field names when initializing test case struct literals. This is helpful when the test cases cover a large amount of vertical space (e.g. more than 20-30 lines), when there are adjacent fields with the same type, and also when you wish to omit fields which have the zero value. For example:

```
// Good:
func TestStrJoin(t *testing.T) {
    tests := []struct {
        slice     []string
        separator string
        skipEmpty bool
        want      string
    }{
        {
            slice:     []string{"a", "b", ""},
            separator: ",",
            want:      "a,b,",
        },
        {
            slice:     []string{"a", "b", ""},
            separator: ",",
            skipEmpty: true,
            want:      "a,b",
        },
        // ...
    }
    // ...
}
```

### Keep setup code scoped to specific tests

Where possible, setup of resources and dependencies should be as closely scoped to specific test cases as possible. For example, given a setup function:

```
// mustLoadDataSet loads a data set for the tests.
//
// This example is very simple and easy to read. Often realistic setup is more
// complex, error-prone, and potentially slow.
func mustLoadDataset(t *testing.T) []byte {
    t.Helper()
    data, err := os.ReadFile("path/to/your/project/testdata/dataset")
    if err != nil {
        t.Fatalf("Could not load dataset: %v", err)
    }
    return data
}
```

Call `mustLoadDataset` explicitly in test functions that need it:

```
// Good:
func TestParseData(t *testing.T) {
    data := mustLoadDataset(t)
    parsed, err := ParseData(data)
    if err != nil {
        t.Fatalf("Unexpected error parsing data: %v", err)
    }
    want := &DataTable{ /* ... */ }
    if got := parsed; !cmp.Equal(got, want) {
        t.Errorf("ParseData(data) = %v, want %v", got, want)
    }
}
func TestListContents(t *testing.T) {
    data := mustLoadDataset(t)
    contents, err := ListContents(data)
    if err != nil {
        t.Fatalf("Unexpected error listing contents: %v", err)
    }
    want := []string{ /* ... */ }
    if got := contents; !cmp.Equal(got, want) {
        t.Errorf("ListContents(data) = %v, want %v", got, want)
    }
}
func TestRegression682831(t *testing.T) {
    if got, want := guessOS("zpc79.example.com"), "grhat"; got != want {
        t.Errorf(`guessOS("zpc79.example.com") = %q, want %q`, got, want)
    }
}
```

The test function `TestRegression682831` does not use the data set and therefore does not call `mustLoadDataset`, which could be slow and failure-prone:

```javascript
// Bad:
var dataset []byte
func TestParseData(t *testing.T) {
    // As documented above without calling mustLoadDataset directly.
}
func TestListContents(t *testing.T) {
    // As documented above without calling mustLoadDataset directly.
}
func TestRegression682831(t *testing.T) {
    if got, want := guessOS("zpc79.example.com"), "grhat"; got != want {
        t.Errorf(`guessOS("zpc79.example.com") = %q, want %q`, got, want)
    }
}
func init() {
    dataset = mustLoadDataset()
}
```

A user may wish to run a function in isolation of the others and should not be penalized by these factors:

```bash
# No reason for this to perform the expensive initialization.
$ go test -run TestRegression682831
```

#### When to use a custom `TestMain` entrypoint

If **all tests in the package** require common setup and the **setup requires teardown**, you can use a [custom testmain entrypoint](https://golang.org/pkg/testing/#hdr-Main). This can happen if the resource the test cases require is especially expensive to setup, and the cost should be amortized. Typically you have extracted any unrelated tests from the test suite at that point. It is typically only used for [functional tests](https://en.wikipedia.org/wiki/Functional_testing).

Using a custom `TestMain` **should not be your first choice** due the amount of care that should be taken for correct use. Consider first whether the solution in the [*amortizing common test setup*](#t-setup-amortization) section or an ordinary [test helper](#t-common-setup-scope) is sufficient for your needs.

```javascript
// Good:
var db *sql.DB
func TestInsert(t *testing.T) { /* omitted */ }
func TestSelect(t *testing.T) { /* omitted */ }
func TestUpdate(t *testing.T) { /* omitted */ }
func TestDelete(t *testing.T) { /* omitted */ }
// runMain sets up the test dependencies and eventually executes the tests.
// It is defined as a separate function to enable the setup stages to clearly
// defer their teardown steps.
func runMain(ctx context.Context, m *testing.M) (code int, err error) {
    ctx, cancel := context.WithCancel(ctx)
    defer cancel()
    d, err := setupDatabase(ctx)
    if err != nil {
        return 0, err
    }
    defer d.Close() // Expressly clean up database.
    db = d          // db is defined as a package-level variable.
    // m.Run() executes the regular, user-defined test functions.
    // Any defer statements that have been made will be run after m.Run()
    // completes.
    return m.Run(), nil
}
func TestMain(m *testing.M) {
    code, err := runMain(context.Background(), m)
    if err != nil {
        // Failure messages should be written to STDERR, which log.Fatal uses.
        log.Fatal(err)
    }
    // NOTE: defer statements do not run past here due to os.Exit
    //       terminating the process.
    os.Exit(code)
}
```

Ideally a test case is hermetic between invocations of itself and between other test cases.

At the very least, ensure that individual test cases reset any global state they have modified if they have done so (for instance, if the tests are working with an external database).

#### Amortizing common test setup

Using a `sync.Once` may be appropriate, though not required, if all of the following are true about the common setup:

- It is expensive.
- It only applies to some tests.
- It does not require teardown.

```javascript
// Good:
var dataset struct {
    once sync.Once
    data []byte
    err  error
}
func mustLoadDataset(t *testing.T) []byte {
    t.Helper()
    dataset.once.Do(func() {
        data, err := os.ReadFile("path/to/your/project/testdata/dataset")
        // dataset is defined as a package-level variable.
        dataset.data = data
        dataset.err = err
    })
    if err := dataset.err; err != nil {
        t.Fatalf("Could not load dataset: %v", err)
    }
    return dataset.data
}
```

When `mustLoadDataset` is used in multiple test functions, its cost is amortized:

```
// Good:
func TestParseData(t *testing.T) {
    data := mustLoadDataset(t)
    // As documented above.
}
func TestListContents(t *testing.T) {
    data := mustLoadDataset(t)
    // As documented above.
}
func TestRegression682831(t *testing.T) {
    if got, want := guessOS("zpc79.example.com"), "grhat"; got != want {
        t.Errorf(`guessOS("zpc79.example.com") = %q, want %q`, got, want)
    }
}
```

The reason that common teardown is tricky is there is no uniform place to register cleanup routines. If the setup function (in this case `mustLoadDataset`) relies on a context, `sync.Once` may be problematic. This is because the second of two racing calls to the setup function would need to wait for the first call to finish before returning. This period of waiting cannot be easily made to respect the context’s cancellation.

## String concatenation

There are several ways to concatenate strings in Go. Some examples include:

- The “+” operator
- `fmt.Sprintf`
- `strings.Builder`
- `text/template`
- `safehtml/template`

Though there is no one-size-fits-all rule for which to choose, the following guidance outlines when each method is preferred.

### Prefer “+” for simple cases

Prefer using “+” when concatenating few strings. This method is syntactically the simplest and requires no import.

```
// Good:
key := "projectid: " + p
```

### Prefer `fmt.Sprintf` when formatting

Prefer using `fmt.Sprintf` when building a complex string with formatting. Using many “+” operators may obscure the end result.

```
// Good:
str := fmt.Sprintf("%s [%s:%d]-> %s", src, qos, mtu, dst)
```

```
// Bad:
bad := src.String() + " [" + qos.String() + ":" + strconv.Itoa(mtu) + "]-> " + dst.String()
```

**Best Practice:** When the output of the string-building operation is an `io.Writer`, don’t construct a temporary string with `fmt.Sprintf` just to send it to the Writer. Instead, use `fmt.Fprintf` to emit to the Writer directly.

When the formatting is even more complex, prefer [`text/template`](https://pkg.go.dev/text/template) or [`safehtml/template`](https://pkg.go.dev/github.com/google/safehtml/template) as appropriate.

### Prefer `strings.Builder` for constructing a string piecemeal

Prefer using `strings.Builder` when building a string bit-by-bit. `strings.Builder` takes amortized linear time, whereas “+” and `fmt.Sprintf` take quadratic time when called sequentially to form a larger string.

```
// Good:
b := new(strings.Builder)
for i, d := range digitsOfPi {
    fmt.Fprintf(b, "the %d digit of pi is: %d\n", i, d)
}
str := b.String()
```

**Note:** For more discussion, see [GoTip #29: Building Strings Efficiently](https://google.github.io/styleguide/go/index.html#gotip).

### Constant strings

Prefer to use backticks (`) when constructing constant, multi-line string literals.

```
// Good:
usage := `Usage:

custom_tool [args]`
```

```
// Bad:
usage := "" +
  "Usage:\n" +
  "\n" +
  "custom_tool [args]"
```

## Global state

Libraries should not force their clients to use APIs that rely on [global state](https://en.wikipedia.org/wiki/Global_variable). They are advised not to expose APIs or export [package level](https://go.dev/ref/spec#TopLevelDecl) variables that control behavior for all clients as parts of their API. The rest of the section uses “global” and “package level state” synonymously.

Instead, if your functionality maintains state, allow your clients to create and use instance values.

**Important:** While this guidance is applicable to all developers, it is most critical for infrastructure providers who offer libraries, integrations, and services to other teams.

```
// Good:
// Package sidecar manages subprocesses that provide features for applications.
package sidecar
type Registry struct { plugins map[string]*Plugin }
func New() *Registry { return &Registry{plugins: make(map[string]*Plugin)} }
func (r *Registry) Register(name string, p *Plugin) error { ... }
```

Your users will instantiate the data they need (a `*sidecar.Registry`) and then pass it as an explicit dependency:

```
// Good:
package main
func main() {
  sidecars := sidecar.New()
  if err := sidecars.Register("Cloud Logger", cloudlogger.New()); err != nil {
    log.Exitf("Could not setup cloud logger: %v", err)
  }
  cfg := &myapp.Config{Sidecars: sidecars}
  myapp.Run(context.Background(), cfg)
}
```

There are different approaches to migrating existing code to support dependency passing. The main one you will use is passing dependencies as parameters to constructors, functions, methods, or struct fields on the call chain.

See also:

- [Go Tip #5: Slimming Your Client Libraries](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #24: Use Case-Specific Constructions](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #40: Improving Time Testability with Function Parameters](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #41: Identify Function Call Parameters](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #44: Improving Time Testability with Struct Fields](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #80: Dependency Injection Principles](https://google.github.io/styleguide/go/index.html#gotip)

APIs that do not support explicit dependency passing become fragile as the number of clients increases:

```javascript
// Bad:
package sidecar
var registry = make(map[string]*Plugin)
func Register(name string, p *Plugin) error { /* registers plugin in registry */ }
```

Consider what happens in the case of tests exercising code that transitively relies on a sidecar for cloud logging.

```python
// Bad:
package app
import (
  "cloudlogger"
  "sidecar"
  "testing"
)
func TestEndToEnd(t *testing.T) {
  // The system under test (SUT) relies on a sidecar for a production cloud
  // logger already being registered.
  ... // Exercise SUT and check invariants.
}
func TestRegression_NetworkUnavailability(t *testing.T) {
  // We had an outage because of a network partition that rendered the cloud
  // logger inoperative, so we added a regression test to exercise the SUT with
  // a test double that simulates network unavailability with the logger.
  sidecar.Register("cloudlogger", cloudloggertest.UnavailableLogger)
  ... // Exercise SUT and check invariants.
}
func TestRegression_InvalidUser(t *testing.T) {
  // The system under test (SUT) relies on a sidecar for a production cloud
  // logger already being registered.
  //
  // Oops. cloudloggertest.UnavailableLogger is still registered from the
  // previous test.
  ... // Exercise SUT and check invariants.
}
```

Go tests are executed sequentially by default, so the tests above run as:

1. `TestEndToEnd`
2. `TestRegression_NetworkUnavailability`, which overrides the default value of cloudlogger
3. `TestRegression_InvalidUser`, which requires the default value of cloudlogger registered in `package sidecar`

This creates an order-dependent test case, which breaks running with test filters, and prevents tests from running in parallel or being sharded.

Using global state poses problems that lack easy answers for you and the API’s clients:

- What happens if a client needs to use different and separately operating sets of `Plugin`s (for example, to support multiple servers) in the same process space?
- What happens if a client wants to replace a registered `Plugin` with an alternative implementation in a test, like a [test double](https://abseil.io/resources/swe-book/html/ch13.html)? What happens if a client’s tests require hermeticity between instances of a `Plugin`, or between all of the plugins registered?
- What happens if multiple clients `Register` a `Plugin` under the same name? Which one wins, if any? How should errors be [handled](decisions#handle-errors)? If the code panics or calls `log.Fatal`, will that always be [appropriate for all places in which API would be called](decisions#dont-panic)? Can a client verify it doesn’t do something bad before doing so?
- Are there certain stages in a program’s startup phases or lifetime during which `Register` can be called and when it can’t? What happens if `Register` is called at the wrong time? A client could call `Register` in [`func init`](https://go.dev/ref/spec#Package_initialization), before flags are parsed, or after `main`. The stage at which a function is called affects error handling. If the author of an API assumes the API is *only* called during program initialization without the requirement that it is, the assumption may nudge the author to design error handling to [abort the program](best-practices#program-init) by modeling the API as a `Must`-like function. Aborting is not appropriate for general-purpose library functions that can be used at any stage.
- What if the client’s and the designer’s concurrency needs are mismatched?

See also:

- [Go Tip #36: Enclosing Package-Level State](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #71: Reducing Parallel Test Flakiness](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #80: Dependency Injection Principles](https://google.github.io/styleguide/go/index.html#gotip)
- Error Handling: [Look Before You Leap](https://docs.python.org/3/glossary.html#term-LBYL) versus [Easier to Ask for Forgiveness than Permission](https://docs.python.org/3/glossary.html#term-EAFP)
- [Unit Testing Practices on Public APIs](/styleguide/go/#unit-testing-practices)

Global state has cascading effects on the [health of the Google codebase](/styleguide/go/guide.html#maintainability). Global state should be approached with **extreme scrutiny**.

[Global state comes in several forms](#globals-forms), and you can use a few [litmus tests to identify when it is safe](#globals-litmus-tests).

### Major forms of package state APIs

Several of the most common problematic API forms are enumerated below:

Top-level variables irrespective of whether they are exported.

```javascript
// Bad:
package logger
// Sinks manages the default output sources for this package's logging API.  This
// variable should be set at package initialization time and never thereafter.
var Sinks []Sink
```

See the [litmus tests](#globals-litmus-tests) to know when these are safe.

The [service locator pattern](https://en.wikipedia.org/wiki/Service_locator_pattern). See the [first example](#globals). The service locator pattern itself is not problematic, rather the locator being defined as global.

Registries for [callbacks](https://en.wikipedia.org/wiki/Callback_\(computer_programming\)) and similar behaviors.

```javascript
// Bad:
package health
var unhealthyFuncs []func
func OnUnhealthy(f func()) {
  unhealthyFuncs = append(unhealthyFuncs, f)
}
```

Thick-Client singletons for things like backends, storage, data access layers, and other system resources. These often pose additional problems with service reliability.

```javascript
// Bad:
package useradmin
var client pb.UserAdminServiceClientInterface
func Client() *pb.UserAdminServiceClient {
    if client == nil {
        client = ...  // Set up client.
    }
    return client
}
```

> **Note:** Many legacy APIs in the Google codebase do not follow this guidance; in fact, some Go standard libraries allow for configuration via global values. Nevertheless, the legacy API’s contravention of this guidance **[should not be used as precedent](guide#local-consistency)** for continuing the pattern.
> > It is better to invest in proper API design today than pay for redesigning later.

### Litmus tests

[APIs using the patterns above](#globals-forms) are unsafe when:

- Multiple functions interact via global state when executed in the same program, despite being otherwise independent (for example, authored by different authors in vastly different directories).
- Independent test cases interact with each other through global state.
- Users of the API are tempted to swap or replace global state for testing purposes, particularly to replace any part of the state with a [test double](https://abseil.io/resources/swe-book/html/ch13.html), like a stub, fake, spy, or mock.
- Users have to consider special ordering requirements when interacting with global state: `func init`, whether flags are parsed yet, etc.

Provided the conditions above are avoided, there are a **few limited circumstances under which these APIs are safe**, namely when any of the following is true:

- The global state is logically constant ([example](https://github.com/klauspost/compress/blob/290f4cfacb3eff892555a491e3eeb569a48665e7/zstd/snappy.go#L413)).
- The package’s observable behavior is stateless. For example, a public function may use a private global variable as a cache, but so long as the caller can’t distinguish cache hits from misses, the function is stateless.
- The global state does not bleed into things that are external to the program, like sidecar processes or files on a shared filesystem.
- There is no expectation of predictable behavior ([example](https://pkg.go.dev/math/rand)).

> **Note:** [Sidecar processes](https://www.oreilly.com/library/view/designing-distributed-systems/9781491983638/ch02.html) may **not** strictly be process-local. They can and often are shared with more than one application process. Moreover, these sidecars often interact with external distributed systems.
> > Further, the same stateless, idempotent, and local rules in addition to the base considerations above would apply to the code of the sidecar process itself!

An example of one of these safe situations is [`package image`](https://pkg.go.dev/image) with its [`image.RegisterFormat`](https://pkg.go.dev/image#RegisterFormat) function. Consider the litmus tests from above applied to a typical decoder, like the one for handling the [PNG](https://pkg.go.dev/image/png) format:

- Multiple calls to `package image`’s APIs that use the registered decoders (for example, `image.Decode`) cannot interfere with one another, similarly for tests. The only exception is `image.RegisterFormat`, but that is mitigated by the points below.
- It is extremely unlikely that a user would want to replace a decoder with a [test double](https://abseil.io/resources/swe-book/html/ch13.html), as the PNG decoder exemplifies a case in which our codebase’s preference for real objects applies. However, a user would be more likely to replace a decoder with a test double if the decoder statefully interacted with operating system resources (for example, the network).
- Collisions in registration are conceivable, though they are probably rare in practice.
- The decoders are stateless, idempotent, and pure.

### Providing a default instance

While not recommended, it is acceptable to provide a simplified API that uses package level state if you need to maximize convenience for the user.

Follow the [litmus tests](#globals-litmus-tests) with these guidelines in such cases:

The package must offer clients the ability to create isolated instances of package types as [described above](#globals-forms). The public APIs that use global state must be a thin proxy to the previous API. A good example of this is [`http.Handle`](https://pkg.go.dev/net/http#Handle) internally calling [`(*http.ServeMux).Handle`](https://pkg.go.dev/net/http#ServeMux.Handle) on the package variable [`http.DefaultServeMux`](https://pkg.go.dev/net/http#DefaultServeMux).

This package-level API must only be used by [binary build targets](https://github.com/bazelbuild/rules_go/blob/master/docs/go/core/rules.md#go_binary), not [libraries](https://github.com/bazelbuild/rules_go/blob/master/docs/go/core/rules.md#go_library), unless the libraries are undertaking a refactoring to support dependency passing. Infrastructure libraries that can be imported by other packages must not rely on package-level state of the packages they import.

For example, an infrastructure provider implementing a sidecar that is to be shared with other teams using the API from the top should offer an API to accommodate this:

```
// Good:
package cloudlogger
func New() *Logger { ... }
func Register(r *sidecar.Registry, l *Logger) {
  r.Register("Cloud Logging", l)
}
```

This package-level API must [document](#documentation-conventions) and enforce its invariants (for example, at which stage in the program’s life it can be called, whether it can be used concurrently). Further, it must provide an API to reset global state to a known-good default (for example, to facilitate testing).

See also:

- [Go Tip #36: Enclosing Package-Level State](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #80: Dependency Injection Principles](https://google.github.io/styleguide/go/index.html#gotip)

## Interfaces

Interfaces in Go are powerful but can be overused or misunderstood. Because Go interfaces are satisfied implicitly, they are a structural tool rather than a declarative one. The following guidance provides the best practices for how to design and return interfaces in Go without over-engineering your codebase.

Refer to [Decisions’ section on interfaces](decisions#interfaces) for a summary.

### Avoid unnecessary interfaces

The most common mistake is creating an interface before a [real need](guide#simplicity) exists.

1. **Don’t confuse the concept with the keyword:** Just because you are designing a “service” or a “repository” or similar pattern doesn’t mean you need a named interface type (e.g., `type Service interface`). Focus on the behavior and its concrete implementation first.
2. **Reuse existing interfaces:** If an interface already exists, especially in generated code, like a RPC client or server, use it ([testing RPC](https://codelabs.developers.google.com/grpc/getting-started-grpc-go#3)). Do not wrap a generated RPC code in a new, manual interface just for the sake of abstraction or testing. [Use real transports](#use-real-transports) instead.
3. **Don’t define back doors only for tests:** Do not export a [test double](https://abseil.io/resources/swe-book/html/ch13.html) implementation of an interface from an API that consumes it. Instead, prefer to design the API so that it can be tested using the [public API](https://abseil.io/resources/swe-book/html/ch12.html#test_via_public_apis) of the real implementation. Every exported type increases the cognitive load for the reader. When you export a test double alongside the real implementation, you force the reader to understand three entities (the interface, the real implementation, and the test double) instead of one. Export an interface for a test double when you have a [material need](guide#least-mechanism) to support substitution.

When it does make sense to create an interface:

1. **Multiple implementations:** When there are two or more concrete types that must be handled by the same logic (e.g., something that operates with both [json.Encoder](https://pkg.go.dev/encoding/json#Encoder) and [gob.GobEncoder](https://pkg.go.dev/encoding/gob#GobEncoder)), the API consumer could define an interface.
2. **Decoupling packages:** To break circular dependencies between two packages (see an [example](#avoiding-circular-dependencies)), an API producer could define an interface. **Caution:** Carefully observe guidance on [Package Size](#package-size). Introducing interfaces to break dependency cycles is often a signal of improperly structured packages.
3. **Hiding complexity:** When a concrete type has a massive API surface, but a specific function only needs one or two methods, an API consumer may define an interface.

### Interface ownership and visibility

1. **Do not export interface types unnecessarily:** If an interface is only used internally within a package to satisfy a specific logic flow, keep the interface unexported. Exporting an interface commits you to maintaining that API for external callers.
2. **The consumer defines the interface:** In Go, interfaces generally belong in the package that uses them, not the package that implements them. The consumer should define only the methods they actually use [GoTip #78: Minimal Viable Interfaces](https://google.github.io/styleguide/go/index.html#gotip), adhering to the idea that [the bigger the interface, the weaker the abstraction](https://go-proverbs.github.io/). There are common scenarios where it often makes sense for the producer (the package providing the logic) to export the interface: **The interface is the product:** When a package’s primary purpose is to provide a common protocol that many different implementations must follow, the producer defines the interface. For example, [io.Writer](https://pkg.go.dev/io#Writer), [hash.Hash](https://pkg.go.dev/hash#Hash). The concept of “protocol” includes aspects like [documentation](#documentation) about critical behaviors (e.g., expected use case, edge cases, concurrency) that need to be centrally and canonically explicated. Another prominent example of this is generated interfaces from protobuf. It doesn’t abstract a specific behavior, it defines a boundary. Its purpose is to ensure that your server implementation exactly matches the schema defined in the `.proto` file. Here, the interface serves as a rigid legal contract between the service and its clients. For large systems, if the interface lives inside a huge implementation package, every client is forced to import the entire world just to reference the interface. You may define the interface in a standalone, implementation-free package, avoiding unnecessary symbols and potential circular dependencies. This is also the same philosophy used by generated code from protobuf.
3. **Prevent interface bloat:** In large codebases, maintenance becomes difficult if numerous packages utilize the same `AuthService` while each defining an identical `type Authorizer interface`. While Go often favors [a little copying over a little dependency](https://go-proverbs.github.io/), keep in mind that maintaining perfectly mirrored interfaces (see point above) across many packages can create an unnecessary burden.
4. **Resolve circular dependency:** see [an example](#avoiding-circular-dependencies) below.

### Designing effective interfaces

1. **Keep interfaces small:** The larger the interface, [the harder it is to implement and to write code that takes advantage of it](https://go-proverbs.github.io/). Small interfaces are easier to compose into larger ones if needed.
2. **Documentation:** Treat every interface as the “user manual” for your abstraction. The depth of your documentation should be proportional to the interface’s cognitive load, not just the count of its methods. Whether an interface has ten methods or a single `Write` of [io.Writer](https://pkg.go.dev/io#Writer), if a programmer is expected to interact with that type, the API must be documented thoroughly. **Single-method interfaces:** documentation on the type itself is usually sufficient (e.g., io.Writer). Explain its contract, edge cases, and expected errors.
3. **Multi-method interfaces:** each individual method requires its own documentation.
4. **Unexported interfaces:** consider documenting them anyway. They are often the glue that holds complex internal logic together, and because they are invisible to external users, they can easily become mystery code for future maintainers (including your future self).
5. **Accept interfaces, return concrete types:** Returning a concrete type allows the caller to use the full functionality of the value without being locked into a specific interface abstraction [GoTip #49: Accept Interfaces, Return Concrete Types](https://google.github.io/styleguide/go/index.html#gotip).

There are several common scenarios where returning an interface is the idiomatic choice:

**Encapsulation:** While interfaces cannot strictly hide exported methods (as they remain accessible via type assertions), returning an interface is a powerful tool for limiting the default API surface and guiding the caller’s behavior.. The most common example is the `error` interface; you [almost never return a concrete error type](decisions#errors) like `*MyCustomError`.

Consider a `ThrottledReader` that implements `io.Reader` but also has a `Refill` method for internal bucket management. Returning the concrete `*ThrottledReader` invites the caller to manage the bucket manually, which could lead to race conditions or broken rate-limiting logic. By returning an interface, you tell the caller that your only job is to consume this reader. If you try to cast this back to a `ThrottledReader` to `Refill` the internal bucket, you are breaking the contract.

```python
// Good:
type ThrottledReader struct {
    source     io.Reader
    limit      int  // bytes per second
    balance    int  // current allowance of bytes
    lastRefill time.Time
}
// Read implements the io.Reader interface with rate-limiting logic.
func (t *ThrottledReader) Read(p []byte) (int, error) { ... }
// Refill manually adds tokens to the bucket.
// INTERNAL USE ONLY: Calling this from outside breaks the rate limit logic.
func (t *ThrottledReader) Refill(amount int) {
    t.balance = min(t.balance + amount, t.limit)
}
// New returns the io.Reader with rate-limiting.
func New(r io.Reader, bytesPerSec int) io.Reader {
    return &ThrottledReader{
        source:     r,
        limit:      bytesPerSec,
        balance:    bytesPerSec, // start with a full bucket
        lastRefill: time.Now(),
    }
}
```

This raises a natural question: if `Refill` is dangerous, why export it at all? In complex systems, you often need internal orchestration. For example, an `AggregateReader` manages multiple `ThrottledReader` values to ensure total bandwidth across all streams stays under a global limit. This coordinator needs to call Refill to distribute tokens, but the non-power user processing the data should never see that capability.

**Caution:** Before returning an interface to hide implementation, ask: “Would a user calling these extra methods actually break the system’s integrity or meaningfully limit maintainability?” If the extra details allow the user to bypass safety checks, or if exposing the concrete type makes it impossible to change the underlying provider later without a breaking change, you may return an interface. Do not rotely encapsulate without reason.

**Certain patterns:** If a function is designed to return one of several different concrete types based on decisions made at runtime, it must return an interface. This is commonly true with command, chaining, factory, and [strategy](https://en.wikipedia.org/wiki/Strategy_pattern) patterns. Consider this code that selects which encoder to use based the requested format:

```
// Good:
func NewWriter(format string) io.Writer {
    switch format {
    case "json":
        return &jsonWriter{}
    case "xml":
        return &xmlWriter{}
    default:
        return &textWriter{}
    }
}
```

The following example of a chaining API demonstrates how returning an interface enables polymorphic behavior. By allowing callers to use either `client.Do(req)` or `client.WithAuth("token").Do(req)`, you can swap implementations without breaking the calling code.

```
// Good:
type Client interface {
    WithAuth(token string) Client
    Do(req *Request) error
}
```

These patterns are guidelines, not rules. Avoid forcing an interface if a single, robust concrete type can handle the abstraction internally. For example, the standard [database/sql](https://pkg.go.dev/database/sql#DB) library exports a single concrete `DB` type instead of forcing an interface to handle types like `MySQLDB` and `OracleDB`.

**Avoiding circular dependencies:** If returning a concrete type would require importing a package that already imports your current package, you must return an interface to break the circular dependency.

For example:

```python
// Bad:
package app
import "myproject/plugin"
type Config struct {
    APIKey string
}
func Start() {
    p := plugin.New()
}
```

```python
// Bad:
package plugin
import "myproject/app"  // ERROR: Import cycle!
func New() *app.Config {
    return &app.Config{APIKey: "secret"}
}
```

In this case, `plugin`’s `New` cannot return `*app.Config` because it would create a circular import. To break this, we use the fact that interfaces are satisfied implicitly. We move the “contract” to a neutral place or have the producer return an interface that the consumer already understands.

If `plugin`’s `New` returns an interface instead of the concrete `*app.Config` struct, it no longer needs to import package `app`.

```
package plugin
type Configurer interface {
    APIKey() string
}
type localConfig struct {
    key string
}
func (c localConfig) APIKey() string { return c.key }
// New returns the interface Configurer instead of the concrete app.Config
func New() Configurer {
    return &localConfig{key: "secret"}
}
```

```python
package app
import "myproject/plugin"
func Start() {
    conf := plugin.New()  // 'conf' is now a Configurer interface
    fmt.Println(conf.APIKey())
}
```

**Caution:** Carefully observe guidance on [Package Size](#package-size). Introducing interfaces to break dependency cycles is often a signal of improperly structured packages. Consolidated packages are often preferred over too many too small packages that fail to stand on their own.

This site is open source. [Improve this page](https://github.com/google/styleguide/edit/gh-pages/go/best-practices.md).
