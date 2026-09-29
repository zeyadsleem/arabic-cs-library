---
title: "أفضل ممارسات أسلوب Go (1 من 2)"
lang: en
---

## About

This file documents **guidance about how to best apply the Go Style Guide**. This guidance is intended for common situations that arise frequently, but may not apply in every circumstance. Where possible, multiple alternative approaches are discussed along with the considerations that go into the decision about when and when not to apply them.

See [the overview](index#about) for the full set of Style Guide documents.

## Naming

### Function and method names

#### Avoid repetition

When choosing the name for a function or method, consider the context in which the name will be read. Consider the following recommendations to avoid excess [repetition](decisions#repetition) at the call site:

- The following can generally be omitted from function and method names: The types of the inputs and outputs (when there is no collision)
- The type of a method’s receiver
- Whether an input or output is a pointer

For functions, do not [repeat the name of the package](decisions#repetitive-with-package).

```
// Bad:
package yamlconfig
func ParseYAMLConfig(input string) (*Config, error)
```

```
// Good:
package yamlconfig
func Parse(input string) (*Config, error)
```

For methods, do not repeat the name of the method receiver.

```
// Bad:
func (c *Config) WriteConfigTo(w io.Writer) (int64, error)
```

```
// Good:
func (c *Config) WriteTo(w io.Writer) (int64, error)
```

Do not repeat the names of variables passed as parameters.

```
// Bad:
func OverrideFirstWithSecond(dest, source *Config) error
```

```
// Good:
func Override(dest, source *Config) error
```

Do not repeat the names and types of the return values.

```
// Bad:
func TransformToJSON(input *Config) *jsonconfig.Config
```

```
// Good:
func Transform(input *Config) *jsonconfig.Config
```

When it is necessary to disambiguate functions of a similar name, it is acceptable to include extra information.

```
// Good:
func (c *Config) WriteTextTo(w io.Writer) (int64, error)
func (c *Config) WriteBinaryTo(w io.Writer) (int64, error)
```

#### Naming conventions

There are some other common conventions when choosing names for functions and methods:

Functions that return something are given noun-like names.

```
// Good:
func (c *Config) JobName(key string) (value string, ok bool)
```

A corollary of this is that function and method names should [avoid the prefix `Get`](decisions#getters).

```
// Bad:
func (c *Config) GetJobName(key string) (value string, ok bool)
```

Functions that do something are given verb-like names.

```
// Good:
func (c *Config) WriteDetail(w io.Writer) (int64, error)
```

Identical functions that differ only by the types involved include the name of the type at the end of the name.

```
// Good:
func ParseInt(input string) (int, error)
func ParseInt64(input string) (int64, error)
func AppendInt(buf []byte, value int) []byte
func AppendInt64(buf []byte, value int64) []byte
```

If there is a clear “primary” version, the type can be omitted from the name for that version:

```
// Good:
func (c *Config) Marshal() ([]byte, error)
func (c *Config) MarshalText() (string, error)
```

### Test double and helper packages

There are several disciplines you can apply to [naming](guide#naming) packages and types that provide test helpers and especially [test doubles](https://abseil.io/resources/swe-book/html/ch13.html#basic_concepts). A test double could be a stub, fake, mock, or spy.

These examples mostly use stubs. Update your names accordingly if your code uses fakes or another kind of test double.

Suppose you have a well-focused package providing production code similar to this:

```python
package creditcard
import (
    "errors"
    "path/to/money"
)
// ErrDeclined indicates that the issuer declines the charge.
var ErrDeclined = errors.New("creditcard: declined")
// Card contains information about a credit card, such as its issuer,
// expiration, and limit.
type Card struct {
    // omitted
}
// Service allows you to perform operations with credit cards against external
// payment processor vendors like charge, authorize, reimburse, and subscribe.
type Service struct {
    // omitted
}
func (s *Service) Charge(c *Card, amount money.Money) error { /* omitted */ }
```

#### Creating test helper packages

Suppose you want to create a package that contains test doubles for another. We’ll use `package creditcard` (from above) for this example:

One approach is to introduce a new Go package based on the production one for testing. A safe choice is to append the word `test` to the original package name (“creditcard” + “test”):

```
// Good:
package creditcardtest
```

Unless stated explicitly otherwise, all examples in the sections below are in `package creditcardtest`.

#### Simple case

You want to add a set of test doubles for `Service`. Because `Card` is effectively a dumb data type, similar to a Protocol Buffer message, it needs no special treatment in tests, so no double is required. If you anticipate only test doubles for one type (like `Service`), you can take a concise approach to naming the doubles:

```python
// Good:
import (
    "path/to/creditcard"
    "path/to/money"
)
// Stub stubs creditcard.Service and provides no behavior of its own.
type Stub struct{}
func (Stub) Charge(*creditcard.Card, money.Money) error { return nil }
```

This is strictly preferable to a naming choice like `StubService` or the very poor `StubCreditCardService`, because the base package name and its domain types imply what `creditcardtest.Stub` is.

Finally, if the package is built with Bazel, make sure the new `go_library` rule for the package is marked as `testonly`:

```
# Good:
go_library(
    name = "creditcardtest",
    srcs = ["creditcardtest.go"],
    deps = [
        ":creditcard",
        ":money",
    ],
    testonly = True,
)
```

The approach above is conventional and will be reasonably well understood by other engineers.

See also:

- [Go Tip #42: Authoring a Stub for Testing](https://google.github.io/styleguide/go/index.html#gotip)

#### Multiple test double behaviors

When one kind of stub is not enough (for example, you also need one that always fails), we recommend naming the stubs according to the behavior they emulate. Here we rename `Stub` to `AlwaysCharges` and introduce a new stub called `AlwaysDeclines`:

```
// Good:
// AlwaysCharges stubs creditcard.Service and simulates success.
type AlwaysCharges struct{}
func (AlwaysCharges) Charge(*creditcard.Card, money.Money) error { return nil }
// AlwaysDeclines stubs creditcard.Service and simulates declined charges.
type AlwaysDeclines struct{}
func (AlwaysDeclines) Charge(*creditcard.Card, money.Money) error {
    return creditcard.ErrDeclined
}
```

#### Multiple doubles for multiple types

But now suppose that `package creditcard` contains multiple types worth creating doubles for, as seen below with `Service` and `StoredValue`:

```
package creditcard
type Service struct {
    // omitted
}
type Card struct {
    // omitted
}
// StoredValue manages customer credit balances.  This applies when returned
// merchandise is credited to a customer's local account instead of processed
// by the credit issuer.  For this reason, it is implemented as a separate
// service.
type StoredValue struct {
    // omitted
}
func (s *StoredValue) Credit(c *Card, amount money.Money) error { /* omitted */ }
```

In this case, more explicit test double naming is sensible:

```
// Good:
type StubService struct{}
func (StubService) Charge(*creditcard.Card, money.Money) error { return nil }
type StubStoredValue struct{}
func (StubStoredValue) Credit(*creditcard.Card, money.Money) error { return nil }
```

#### Local variables in tests

When variables in your tests refer to doubles, choose a name that most clearly differentiates the double from other production types based on context. Consider some production code you want to test:

```python
package payment
import (
    "path/to/creditcard"
    "path/to/money"
)
type CreditCard interface {
    Charge(*creditcard.Card, money.Money) error
}
type Processor struct {
    CC CreditCard
}
var ErrBadInstrument = errors.New("payment: instrument is invalid or expired")
func (p *Processor) Process(c *creditcard.Card, amount money.Money) error {
    if c.Expired() {
        return ErrBadInstrument
    }
    return p.CC.Charge(c, amount)
}
```

In the tests, a test double called a “spy” for `CreditCard` is juxtaposed against production types, so prefixing the name may improve clarity.

```python
// Good:
package payment
import "path/to/creditcardtest"
func TestProcessor(t *testing.T) {
    var spyCC creditcardtest.Spy
    proc := &Processor{CC: spyCC}
    // declarations omitted: card and amount
    if err := proc.Process(card, amount); err != nil {
        t.Errorf("proc.Process(card, amount) = %v, want nil", err)
    }
    charges := []creditcardtest.Charge{
        {Card: card, Amount: amount},
    }
    if got, want := spyCC.Charges, charges; !cmp.Equal(got, want) {
        t.Errorf("spyCC.Charges = %v, want %v", got, want)
    }
}
```

This is clearer than when the name is not prefixed.

```python
// Bad:
package payment
import "path/to/creditcardtest"
func TestProcessor(t *testing.T) {
    var cc creditcardtest.Spy
    proc := &Processor{CC: cc}
    // declarations omitted: card and amount
    if err := proc.Process(card, amount); err != nil {
        t.Errorf("proc.Process(card, amount) = %v, want nil", err)
    }
    charges := []creditcardtest.Charge{
        {Card: card, Amount: amount},
    }
    if got, want := cc.Charges, charges; !cmp.Equal(got, want) {
        t.Errorf("cc.Charges = %v, want %v", got, want)
    }
}
```

### Shadowing

**Note:** This explanation uses two informal terms, *stomping* and *shadowing*. They are not official concepts in the Go language spec.

Like many programming languages, Go has mutable variables: assigning to a variable changes its value.

```
// Good:
func abs(i int) int {
    if i < 0 {
        i *= -1
    }
    return i
}
```

When using [short variable declarations](https://go.dev/ref/spec#Short_variable_declarations) with the `:=` operator, in some cases a new variable is not created. We can call this *stomping*. It’s OK to do this when the original value is no longer needed.

```
// Good:
// innerHandler is a helper for some request handler, which itself issues
// requests to other backends.
func (s *Server) innerHandler(ctx context.Context, req *pb.MyRequest) *pb.MyResponse {
    // Unconditionally cap the deadline for this part of request handling.
    ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
    defer cancel()
    ctxlog.Info(ctx, "Capped deadline in inner request")
    // Code here no longer has access to the original context.
    // This is good style if when first writing this, you anticipate
    // that even as the code grows, no operation legitimately should
    // use the (possibly unbounded) original context that the caller provided.
    // ...
}
```

Be careful using short variable declarations in a new scope, though: that introduces a new variable. We can call this *shadowing* the original variable. Code after the end of the block refers to the original. Here is a buggy attempt to shorten the deadline conditionally:

```
// Bad:
func (s *Server) innerHandler(ctx context.Context, req *pb.MyRequest) *pb.MyResponse {
    // Attempt to conditionally cap the deadline.
    if *shortenDeadlines {
        ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
        defer cancel()
        ctxlog.Info(ctx, "Capped deadline in inner request")
    }
    // BUG: "ctx" here again means the context that the caller provided.
    // The above buggy code compiled because both ctx and cancel
    // were used inside the if statement.
    // ...
}
```

A correct version of the code might be:

```javascript
// Good:
func (s *Server) innerHandler(ctx context.Context, req *pb.MyRequest) *pb.MyResponse {
    if *shortenDeadlines {
        var cancel func()
        // Note the use of simple assignment, = and not :=.
        ctx, cancel = context.WithTimeout(ctx, 3*time.Second)
        defer cancel()
        ctxlog.Info(ctx, "Capped deadline in inner request")
    }
    // ...
}
```

In the case we called stomping, because there’s no new variable, the type being assigned must match that of the original variable. With shadowing, an entirely new entity is introduced so it can have a different type. Intentional shadowing can be a useful practice, but you can always use a new name if it improves [clarity](guide#clarity).

It is not a good idea to use variables with the same name as standard packages other than very small scopes, because that renders free functions and values from that package inaccessible. Conversely, when picking a name for your package, avoid names that are likely to require [import renaming](decisions#import-renaming) or cause shadowing of otherwise good variable names at the client side.

```
// Bad:
func LongFunction() {
    url := "https://example.com/"
    // Oops, now we can't use net/url in code below.
}
```

### Util packages

Go packages have a name specified on the `package` declaration, separate from the import path. The package name matters more for readability than the path.

Go package names should be [related to what the package provides](decisions#package-names). Naming a package just `util`, `helper`, `common` or similar is usually a poor choice (it can be used as *part* of the name though). Uninformative names make the code harder to read, and if used too broadly they are liable to cause needless [import conflicts](decisions#import-renaming).

Instead, consider what the callsite will look like.

```
// Good:
db := spannertest.NewDatabaseFromFile(...)
_, err := f.Seek(0, io.SeekStart)
b := elliptic.Marshal(curve, x, y)
```

You can tell roughly what each of these do even without knowing the imports list (`cloud.google.com/go/spanner/spannertest`, `io`, and `crypto/elliptic`). With less focused names, these might read:

```
// Bad:
db := test.NewDatabaseFromFile(...)
_, err := f.Seek(0, common.SeekStart)
b := helper.Marshal(curve, x, y)
```

## Package size

If you’re asking yourself how big your Go packages should be and whether to place related types in the same package or split them into different ones, a good place to start is the [Go blog post about package names](https://go.dev/blog/package-names). Despite the post title, it’s not solely about naming. It contains some helpful hints and cites several useful articles and talks.

Here are some other considerations and notes.

Users see [godoc](https://pkg.go.dev/) for the package in one page, and any methods exported by types supplied by the package are grouped by their type. Godoc also group constructors along with the types they return. If *client code* is likely to need two values of different type to interact with each other, it may be convenient for the user to have them in the same package.

Code within a package can access unexported identifiers in the package. If you have a few related types whose *implementation* is tightly coupled, placing them in the same package lets you achieve this coupling without polluting the public API with these details. A good test for this coupling is to imagine a hypothetical user of two packages, where the packages cover closely related topics: if the user must import both packages in order to use either in any meaningful way, combining them together is usually the right thing to do. The standard library generally demonstrates this kind of scoping and layering well.

All of that being said, putting your entire project in a single package would likely make that package too large. When something is conceptually distinct, giving it its own small package can make it easier to use. The short name of the package as known to clients together with the exported type name work together to make a meaningful identifier: e.g. `bytes.Buffer`, `ring.New`. The [Package Names blog post](https://go.dev/blog/package-names) has more examples.

Go style is flexible about file size, because maintainers can move code within a package from one file to another without affecting callers. But as a general guideline: it is usually not a good idea to have a single file with many thousands of lines in it, or having many tiny files. There is no “one type, one file” convention as in some other languages. As a rule of thumb, files should be focused enough that a maintainer can tell which file contains something, and the files should be small enough that it will be easy to find once there. The standard library often splits large packages to several source files, grouping related code by file. The source for [package `bytes`](https://go.dev/src/bytes/) is a good example. Packages with long package documentation may choose to dedicate one file called `doc.go` that has the [package documentation](decisions#package-comments), a package declaration, and nothing else, but this is not required.

Within the Google codebase and in projects using Bazel, directory layout for Go code is different than it is in open source Go projects: you can have multiple `go_library` targets in a single directory. A good reason to give each package its own directory is if you expect to open source your project in the future.

A few non-canonical reference examples to help demonstrate these ideas in action:

- small packages that contain one cohesive idea that warrant nothing more being added nor nothing being removed: [package `csv`](https://pkg.go.dev/encoding/csv): CSV data encoding and decoding with responsibility split respectively between [reader.go](https://go.googlesource.com/go/+/refs/heads/master/src/encoding/csv/reader.go) and [writer.go](https://go.googlesource.com/go/+/refs/heads/master/src/encoding/csv/writer.go).
- [package `expvar`](https://pkg.go.dev/expvar): whitebox program telemetry all contained in [expvar.go](https://go.googlesource.com/go/+/refs/heads/master/src/expvar/expvar.go).

moderately sized packages that contain one large domain and its multiple responsibilities together:

- [package `flag`](https://pkg.go.dev/flag): command line flag management all contained in [flag.go](https://go.googlesource.com/go/+/refs/heads/master/src/flag/flag.go).

large packages that divide several closely related domains across several files:

- [package `http`](https://pkg.go.dev/net/http): the core of HTTP: [client.go](https://go.googlesource.com/go/+/refs/heads/master/src/net/http/client.go), support for HTTP clients; [server.go](https://go.googlesource.com/go/+/refs/heads/master/src/net/http/client.go), support for HTTP servers; [cookie.go](https://go.googlesource.com/go/+/refs/heads/master/src/net/http/cookie.go), cookie management.
- [package `os`](https://pkg.go.dev/os): cross-platform operating system abstractions: [exec.go](https://go.googlesource.com/go/+/refs/heads/master/src/os/exec.go), subprocess management; [file.go](https://go.googlesource.com/go/+/refs/heads/master/src/os/file.go), file management; [tempfile.go](https://go.googlesource.com/go/+/refs/heads/master/src/os/tempfile.go), temporary files.

See also:

- [Test double packages](#naming-doubles)
- [Organizing Go Code (Blog Post)](https://go.dev/blog/organizing-go-code)
- [Organizing Go Code (Presentation)](https://go.dev/talks/2014/organizeio.slide)

## Imports

### Protocol Buffer Messages and Stubs

Proto library imports are treated differently than standard Go imports due to their cross-language nature. The convention for renamed proto imports are based on the rule that generated the package:

- The `pb` suffix is generally used for `go_proto_library` rules.
- The `grpc` suffix is generally used for `go_grpc_library` rules.

Often a single word describing the package is used:

```python
// Good:
import (
    foopb "path/to/package/foo_service_go_proto"
    foogrpc "path/to/package/foo_service_go_grpc"
)
```

Follow the style guidance for [package names](https://google.github.io/styleguide/go/decisions#package-names). Prefer whole words. Short names are good, but avoid ambiguity. When in doubt, use the proto package name up to _go with a pb suffix:

```python
// Good:
import (
    pushqueueservicepb "path/to/package/push_queue_service_go_proto"
)
```

**Note:** Previous guidance encouraged very short names such as “xpb” or even just “pb”. New code should prefer more descriptive names. Existing code which uses short names should not be used as an example, but does not need to be changed.

### Import ordering

See the [Go Style Decisions: Import grouping](/styleguide/go/decisions.html#import-grouping).

## Error handling

In Go, [errors are values](https://go.dev/blog/errors-are-values); they are created by code and consumed by code. Errors can be:

- Converted into diagnostic information for display to humans
- Used by the maintainer
- Interpreted by an end user

Error messages also show up across a variety of different surfaces including log messages, error dumps, and rendered UIs.

Code that processes (produces or consumes) errors should do so deliberately. It can be tempting to ignore or blindly propagate an error return value. However, it is always worth considering whether the current function in the call frame is positioned to handle the error most effectively. This is a large topic and it is hard to give categorical advice. Use your judgment, but keep the following considerations in mind:

- When creating an error value, decide whether to give it any [structure](#error-structure).
- When handling an error, consider [adding information](#error-extra-info) that you have but that the caller and/or callee might not.
- See also guidance on [error logging](#error-logging).

While it is usually not appropriate to ignore an error, a reasonable exception to this is when orchestrating related operations, where often only the first error is useful. Package [`errgroup`](https://pkg.go.dev/golang.org/x/sync/errgroup) provides a convenient abstraction for a group of operations that can all fail or be canceled as a group.

See also:

- [Effective Go on errors](https://go.dev/doc/effective_go#errors)
- [A post by the Go Blog on errors](https://go.dev/blog/go1.13-errors)
- [Package `errors`](https://pkg.go.dev/errors)
- [Package `upspin.io/errors`](https://commandcenter.blogspot.com/2017/12/error-handling-in-upspin.html)
- [GoTip #89: When to Use Canonical Status Codes as Errors](https://google.github.io/styleguide/go/index.html#gotip)
- [GoTip #48: Error Sentinel Values](https://google.github.io/styleguide/go/index.html#gotip)
- [GoTip #13: Designing Errors for Checking](https://google.github.io/styleguide/go/index.html#gotip)

### Error structure

If callers need to interrogate the error (e.g., distinguish different error conditions), give the error value structure so that this can be done programmatically rather than having the caller perform string matching. This advice applies to production code as well as to tests that care about different error conditions.

The simplest structured errors are unparameterized global values.

```javascript
type Animal string
var (
    // ErrDuplicate occurs if this animal has already been seen.
    ErrDuplicate = errors.New("duplicate")
    // ErrMarsupial occurs because we're allergic to marsupials outside Australia.
    // Sorry.
    ErrMarsupial = errors.New("marsupials are not supported")
)
func process(animal Animal) error {
    switch {
    case seen[animal]:
        return ErrDuplicate
    case marsupial(animal):
        return ErrMarsupial
    }
    seen[animal] = true
    // ...
    return nil
}
```

The caller can simply compare the returned error value of the function with one of the known error values:

```
// Good:
func handlePet(...) {
    switch err := process(an); err {
    case ErrDuplicate:
        return fmt.Errorf("feed %q: %v", an, err)
    case ErrMarsupial:
        // Try to recover with a friend instead.
        alternate = an.BackupAnimal()
        return handlePet(..., alternate, ...)
    }
}
```

The above uses sentinel values, where the error must be equal (in the sense of `==`) to the expected value. That is perfectly adequate in many cases. If `process` returns wrapped errors (discussed below), you can use [`errors.Is`](https://pkg.go.dev/errors#Is).

```
// Good:
func handlePet(...) {
    switch err := process(an); {
    case errors.Is(err, ErrDuplicate):
        return fmt.Errorf("feed %q: %v", an, err)
    case errors.Is(err, ErrMarsupial):
        // ...
    }
}
```

Do not attempt to distinguish errors based on their string form. (See [Go Tip #13: Designing Errors for Checking](https://google.github.io/styleguide/go/index.html#gotip) for more.)

```
// Bad:
func handlePet(...) {
    err := process(an)
    if regexp.MatchString(`duplicate`, err.Error()) {...}
    if regexp.MatchString(`marsupial`, err.Error()) {...}
}
```

If there is extra information in the error that the caller needs programmatically, it should ideally be presented structurally. For example, the [`os.PathError`](https://pkg.go.dev/os#PathError) type is documented to place the pathname of the failing operation in a struct field which the caller can easily access.

Other error structures can be used as appropriate, for example a project struct containing an error code and detail string. [Package `status`](https://pkg.go.dev/google.golang.org/grpc/status) is a common encapsulation; if you choose this approach (which you are not obligated to do), use [canonical codes](https://pkg.go.dev/google.golang.org/grpc/codes). See [Go Tip #89: When to Use Canonical Status Codes as Errors](https://google.github.io/styleguide/go/index.html#gotip) to know if using status codes is the right choice.

### Adding information to errors

When adding information to errors, avoid redundant information that the underlying error already provides. The `os` package, for instance, already includes path information in its errors.

```
// Good:
if err := os.Open("settings.txt"); err != nil {
  return fmt.Errorf("launch codes unavailable: %v", err)
}
// Output:
//
// launch codes unavailable: open settings.txt: no such file or directory
```

Here, “launch codes unavailable” adds specific meaning to the `os.Open` error that’s relevant to the current function’s context, without duplicating the underlying file path information.

```
// Bad:
if err := os.Open("settings.txt"); err != nil {
  return fmt.Errorf("could not open settings.txt: %v", err)
}
// Output:
//
// could not open settings.txt: open settings.txt: no such file or directory
```

Don’t add an annotation if its sole purpose is to indicate a failure without adding new information. The presence of an error sufficiently conveys the failure to the caller.

```
// Bad:
return fmt.Errorf("failed: %v", err) // just return err instead
```

The [choice between `%v` and `%w` when wrapping errors](https://go.dev/blog/go1.13-errors#whether-to-wrap) with `fmt.Errorf` is a nuanced decision that significantly impacts how errors are propagated handled, inspected, and documented within your application. The core principle is to make error values useful to their observers, whether those observers are humans or code.

**`%v` for simple annotation or new error**

The `%v` verb is your general-purpose tool for string formatting of any Go value, including errors. When used with `fmt.Errorf`, it embeds the string representation of an error (what its `Error()` method returns) into a new error value, dropping any structured information from the original error. Examples to use `%v`:

Adding interesting, non-redundant context: as in the example above.

Logging or displaying errors: When the primary goal is to present a human-readable error message in logs or to a user, and you don’t intend for the caller to programmatically `errors.Is` or `errors.As` the error (Note: `errors.Unwrap` is generally not recommended here as it doesn’t handle multi-errors).

Creating fresh, independent errors: Sometimes it is necessary to transform an error into a new error message, thereby hiding the specifics of the original error. This practice is particularly beneficial at system boundaries, including but not limited to RPC, IPC, and storage, where we translate domain-specific errors into a canonical error space.

```
// Good:
func (*FortuneTeller) SuggestFortune(context.Context, *pb.SuggestionRequest) (*pb.SuggestionResponse, error) {
  // ...
  if err != nil {
    return nil, fmt.Errorf("couldn't find fortune database: %v", err)
  }
}
```

We could also explicitly annotate RPC code `Internal` to the example above.

```python
// Good:
import (
  "google.golang.org/grpc/codes"
  "google.golang.org/grpc/status"
)
func (*FortuneTeller) SuggestFortune(context.Context, *pb.SuggestionRequest) (*pb.SuggestionResponse, error) {
  // ...
  if err != nil {
    // Or use fmt.Errorf with the %w verb if deliberately wrapping an
    // error which the caller is meant to unwrap.
    return nil, status.Errorf(codes.Internal, "couldn't find fortune database", status.ErrInternal)
  }
}
```

**`%w` (wrap) for programmatic inspection and error chaining**

The `%w` verb is specifically designed for error wrapping. It creates a new error that provides an `Unwrap()` method, allowing callers to programmatically inspect the error chain using `errors.Is` and `errors.As`. Examples to use `%w`:

Adding context while preserving the original error for programmatic inspection: This is the primary use case within helpers of your application. You want to enrich an error with additional context (e.g., what operation was being performed when it failed) but still allow the caller to check if the underlying error is a specific sentinel error or type.

```
// Good:
func (s *Server) internalFunction(ctx context.Context) error {
  // ...
  if err != nil {
    return fmt.Errorf("couldn't find remote file: %w", err)
  }
}
```

This allows a higher-level function to do `errors.Is(err, fs.ErrNotExist)` if the underlying error was `fs.ErrNotExist`, even though it’s wrapped.

At points where your system interacts with external systems like RPC, IPC, or storage, it’s often better to translate domain-specific errors into a standardized error space (e.g., gRPC status codes) rather than simply wrapping the raw underlying error with `%w`. The client typically doesn’t care about the exact internal file system error; they care about the canonical result (e.g., `Internal`, `NotFound`, `PermissionDenied`).

When you explicitly document and test the underlying errors you expose: If your package’s API guarantees that certain underlying errors can be unwrapped and checked by callers (e.g., “this function might return `ErrInvalidConfig` wrapped within a more general error”), then `%w` is appropriate. This forms part of your package’s contract.

See also:

- [Error Documentation Conventions](#documentation-conventions-errors)
- [Blog post on error wrapping](https://blog.golang.org/go1.13-errors)

### Placement of %w in errors

Prefer to place `%w` at the end of an error string *if* you are to use [error wrapping](https://go.dev/blog/go1.13-errors) with the `%w` formatting verb.

Errors can be wrapped with the `%w` verb, or by placing them in a [structured error](https://google.github.io/styleguide/go/index.html#gotip) that implements `Unwrap() error` (ex: [`fs.PathError`](https://pkg.go.dev/io/fs#PathError)).

Wrapped errors form error chains: each new layer of wrapping adds a new entry to the front of the error chain. The error chain can be traversed with the `Unwrap() error` method. For example:

```
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("err2: %w", err1)
err3 := fmt.Errorf("err3: %w", err2)
```

This forms an error chain of the form,

```
flowchart LR
  err3 == err3 wraps err2 ==> err2;
  err2 == err2 wraps err1 ==> err1;
```

Regardless of where the `%w` verb is placed, the error returned always represents the front of the error chain, and the `%w` is the next child. Similarly, `Unwrap() error` always traverses the error chain from newest to oldest error.

Placement of the `%w` verb does, however, affect whether the error chain is printed newest to oldest, oldest to newest, or neither:

```
// Good:
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("err2: %w", err1)
err3 := fmt.Errorf("err3: %w", err2)
fmt.Println(err3) // err3: err2: err1
// err3 is a newest-to-oldest error chain, that prints newest-to-oldest.
```

```
// Bad:
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("%w: err2", err1)
err3 := fmt.Errorf("%w: err3", err2)
fmt.Println(err3) // err1: err2: err3
// err3 is a newest-to-oldest error chain, that prints oldest-to-newest.
```

```
// Bad:
err1 := fmt.Errorf("err1")
err2 := fmt.Errorf("err2-1 %w err2-2", err1)
err3 := fmt.Errorf("err3-1 %w err3-2", err2)
fmt.Println(err3) // err3-1 err2-1 err1 err2-2 err3-2
// err3 is a newest-to-oldest error chain, that neither prints newest-to-oldest
// nor oldest-to-newest.
```

Therefore, in order for error text to mirror error chain structure, prefer placing the `%w` verb at the end with the form `[...]: %w`.

#### Sentinel error placement

An exception to this rule is when wrapping sentinel errors. A sentinel error is an error that serves as a primary categorization of a failure. This helps observers quickly understand the nature of a failure (such as “not found” or “invalid argument”) without having to parse the entire error message. Identifying that error type as early as possible in the error string is beneficial.

Examples of sentinel errors include os errors (e.g., [`os.ErrInvalid`](https://pkg.go.dev/os#ErrInvalid)) and package-level errors.

In these cases, placing the `%w` verb at the beginning of the error string can improve readability by immediately identifying the category of the error.

```javascript
// Good:
package parser
var ErrParse = fmt.Errorf("parse error")
// This is another package error that could be returned.
var ErrParseInvalidHeader = fmt.Errorf("%w: invalid header", ErrParse)
func parseHeader() error {
  err := checkHeader()
  return fmt.Errorf("%w: invalid character in header: %v", ErrParseInvalidHeader, err)
}
err := fmt.Errorf("%w: couldn't find fortune database: %v", ErrInternal, err)
```

Placing the status at the beginning ensures that the most relevant categorical information is most prominent.

```javascript
// Bad:
package parser
var ErrParse = fmt.Errorf("parse error")
// This is another package error that could be returned.
var ErrParseInvalidHeader = fmt.Errorf("%w: invalid header", ErrParse)
func parseHeader() error {
  err := checkHeader()
  return fmt.Errorf("invalid character in header: %v: %w", err, ErrParseInvalidHeader)
}
var ErrInternal = status.Error(codes.Internal, "internal")
err2 := fmt.Errorf("couldn't find fortune database: %v: %w", err, ErrInternal)
```

When you place it at the end, it makes it harder to identify the error category when reading the error text, as it’s buried in the specific error details.

See also:

- [Go Tip #48: Error Sentinel Values](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #106: Error Naming Conventions](https://google.github.io/styleguide/go/index.html#gotip)

### Logging errors

Functions sometimes need to tell an external system about an error without propagating it to their callers. Logging is an obvious choice here; but be conscious of what and how you log errors.

- Like [good test failure messages](https://google.github.io/styleguide/go/decisions#useful-test-failures), log messages should clearly express what went wrong and help the maintainer by including relevant information to diagnose the problem.
- Avoid duplication. If you return an error, it’s usually better not to log it yourself but rather let the caller handle it. The caller can choose to log the error, or perhaps rate-limit logging using [`rate.Sometimes`](https://pkg.go.dev/golang.org/x/time/rate#Sometimes). Other options include attempting recovery or even [stopping the program](#checks-and-panics). In any case, giving the caller control helps avoid logspam. The downside to this approach, however, is that any logging is written using the caller’s line coordinates.
- Be careful with [PII](https://en.wikipedia.org/wiki/Personal_data). Many log sinks are not appropriate destinations for sensitive end-user information.
- Use `log.Error` sparingly. ERROR level logging causes a flush and is more expensive than lower logging levels. This can have serious performance impact on your code. When deciding between error and warning levels, consider the best practice that messages at the error level should be actionable rather than “more serious” than a warning.
- Inside Google, we have monitoring systems that can be set up for more effective alerting than writing to a log file and hoping someone notices it. This is similar but not identical to the standard library [package `expvar`](https://pkg.go.dev/expvar).

#### Custom verbosity levels

Use verbose logging ([`log.V`](https://pkg.go.dev/github.com/golang/glog#V)) to your advantage. Verbose logging can be useful for development and tracing. Establishing a convention around verbosity levels can be helpful. For example:

- Write a small amount of extra information at `V(1)`
- Trace more information in `V(2)`
- Dump large internal states in `V(3)`

To minimize the cost of verbose logging, you should ensure not to accidentally call expensive functions even when `log.V` is turned off. `log.V` offers two APIs. The more convenient one carries the risk of this accidental expense. When in doubt, use the slightly more verbose style.

```
// Good:
for _, sql := range queries {
  log.V(1).Infof("Handling %v", sql)
  if log.V(2) {
    log.Infof("Handling %v", sql.Explain())
  }
  sql.Run(...)
}
```

```
// Bad:
// sql.Explain called even when this log is not printed.
log.V(2).Infof("Handling %v", sql.Explain())
```

### Program initialization

Program initialization errors (such as bad flags and configuration) should be propagated upward to `main`, which should call `log.Exit` with an error that explains how to fix the error. In these cases, `log.Fatal` should not generally be used, because a stack trace that points at the check is not likely to be as useful as a human-generated, actionable message.

### Program checks and panics

As stated in the [decision against panics](https://google.github.io/styleguide/go/decisions#dont-panic), standard error handling should be structured around error return values. Libraries should prefer returning an error to the caller rather than aborting the program, especially for transient errors.

It is occasionally necessary to perform consistency checks on an invariant and terminate the program if it is violated. In general, this is only done when a failure of the invariant check means that the internal state has become unrecoverable. The most reliable way to do this in the Google codebase is to call `log.Fatal`. Using `panic` in these cases is not reliable, because it is possible for deferred functions to deadlock or further corrupt internal or external state.

Similarly, resist the temptation to recover panics to avoid crashes, as doing so can result in propagating a corrupted state. The further you are from the panic, the less you know about the state of the program, which could be holding locks or other resources. The program can then develop other unexpected failure modes that can make the problem even more difficult to diagnose. Instead of trying to handle unexpected panics in code, use monitoring tools to surface unexpected failures and fix related bugs with a high priority.

**Note:** The standard [`net/http` server](https://pkg.go.dev/net/http#Server) violates this advice and recovers panics from request handlers. Consensus among experienced Go engineers is that this was a historical mistake. If you sample server logs from application servers in other languages, it is common to find large stacktraces that are left unhandled. Avoid this pitfall in your servers.

### When to panic

The standard library panics on API misuse. For example, [`reflect`](https://pkg.go.dev/reflect) issues a panic in many cases where a value is accessed in a way that suggests it was misinterpreted. This is analogous to the panics on core language bugs such as accessing an element of a slice that is out of bounds. Code review and tests should discover such bugs, which are not expected to appear in production code. These panics act as invariant checks that do not depend on a library, as the standard library does not have access to the [levelled `log`](decisions#logging) package that the Google codebase uses.

Another case in which panics can be useful, though uncommon, is as an internal implementation detail of a package which always has a matching recover in the callchain. Parsers and similar deeply nested, tightly coupled internal function groups can benefit from this design, where plumbing error returns adds complexity without value.

The key attribute of this design is that these **panics are never allowed to escape across package boundaries** and do not form part of the package’s API. This is typically accomplished with a top-level deferred function that uses `recover` to translate a propagated panic into a returned error at the public API boundary. It requires the code that panics and recovers to distinguish between panics that the code raises itself and those that it doesn’t:

```
// Good:
type syntaxError struct {
  msg string
}
func parseInt(in string) int {
  n, err := strconv.Atoi(in)
  if err != nil {
    panic(&syntaxError{"not a valid integer"})
  }
}
func Parse(in string) (_ *Node, err error) {
  defer func() {
    if p := recover(); p != nil {
      sErr, ok := p.(*syntaxError)
      if !ok {
        panic(p) // Propagate the panic since it is outside our code's domain.
      }
      err = fmt.Errorf("syntax error: %v", sErr.msg)
    }
  }()
  ... // Parse input calling parseInt internally to parse integers
}
```

> **Warning:** Code employing this pattern must take care to manage any resources associated with the code run in such defer-managed sections (e.g., close, free, or unlock).
> > See: [Go Tip #81: Avoiding Resource Leaks in API Design](https://google.github.io/styleguide/go/index.html#gotip)

Panic is also used when the compiler cannot identify unreachable code, for example when using a function like `log.Fatal` that will not return:

```
// Good:
func answer(i int) string {
    switch i {
    case 42:
        return "yup"
    case 54:
        return "base 13, huh"
    default:
        log.Fatalf("Sorry, %d is not the answer.", i)
        panic("unreachable")
    }
}
```

[Do not call `log` functions before flags have been parsed.](https://pkg.go.dev/github.com/golang/glog#pkg-overview) If you must die in a package initialization function (an `init` or a [“must” function](decisions#must-functions)), a panic is acceptable in place of the fatal logging call.

See also:

- [Handling panics](https://go.dev/ref/spec#Handling_panics) and [Run-time Panics](https://go.dev/ref/spec#Run_time_panics) in the language specification
- [Defer, Panic, and Recover](https://go.dev/blog/defer-panic-and-recover)
- [On the uses and misuses of panics in Go](https://eli.thegreenplace.net/2018/on-the-uses-and-misuses-of-panics-in-go/)

## Documentation

### Conventions

This section augments the decisions document’s [commentary](decisions#commentary) section.

Go code that is documented in familiar style is easier to read and less likely to be misused than something misdocumented or not documented at all. Runnable [examples](decisions#examples) show up in Godoc and Code Search and are an excellent way of explaining how to use your code.

#### Parameters and configuration

Not every parameter must be enumerated in the documentation. This applies to:

- function and method parameters
- struct fields
- APIs for options

Document the error-prone or non-obvious fields and parameters by saying why they are interesting.

In the following snippet, the highlighted commentary adds little useful information to the reader:

```
// Bad:
// Sprintf formats according to a format specifier and returns the resulting
// string.
//
// format is the format, and data is the interpolation data.
func Sprintf(format string, data ...any) string
```

However, this snippet demonstrates a code scenario similar to the previous where the commentary instead states something non-obvious or materially helpful to the reader:

```javascript
// Good:
// Sprintf formats according to a format specifier and returns the resulting
// string.
//
// The provided data is used to interpolate the format string. If the data does
// not match the expected format verbs or the amount of data does not satisfy
// the format specification, the function will inline warnings about formatting
// errors into the output string as described by the Format errors section
// above.
func Sprintf(format string, data ...any) string
```

Consider your likely audience in choosing what to document and at what depth. Maintainers, newcomers to the team, external users, and even yourself six months in the future may appreciate slightly different information from what is on your mind when you first come to write your docs.

See also:

- [GoTip #41: Identify Function Call Parameters](https://google.github.io/styleguide/go/index.html#gotip)
- [GoTip #51: Patterns for Configuration](https://google.github.io/styleguide/go/index.html#gotip)

#### Contexts

It is implied that the cancellation of a context argument interrupts the function it is provided to. If the function can return an error, conventionally it is `ctx.Err()`.

This fact does not need to be restated:

```
// Bad:
// Run executes the worker's run loop.
//
// The method will process work until the context is cancelled and accordingly
// returns an error.
func (Worker) Run(ctx context.Context) error
```

Because that is implied, the following is better:

```
// Good:
// Run executes the worker's run loop.
func (Worker) Run(ctx context.Context) error
```

Where context behavior is different or non-obvious, it should be expressly documented if any of the following are true.

The function returns an error other than `ctx.Err()` when the context is cancelled:

```
// Good:
// Run executes the worker's run loop.
//
// If the context is cancelled, Run returns a nil error.
func (Worker) Run(ctx context.Context) error
```

The function has other mechanisms that may interrupt it or affect lifetime:

```python
// Good:
// Run executes the worker's run loop.
//
// Run processes work until the context is cancelled or Stop is called.
// Context cancellation is handled asynchronously internally: run may return
// before all work has stopped. The Stop method is synchronous and waits
// until all operations from the run loop finish. Use Stop for graceful
// shutdown.
func (Worker) Run(ctx context.Context) error
func (Worker) Stop()
```

The function has special expectations about context lifetime, lineage, or attached values:

```python
// Good:
// NewReceiver starts receiving messages sent to the specified queue.
// The context should not have a deadline.
func NewReceiver(ctx context.Context) *Receiver
// Principal returns a human-readable name of the party who made the call.
// The context must have a value attached to it from security.NewContext.
func Principal(ctx context.Context) (name string, ok bool)
```

**Warning:** Avoid designing APIs that make such demands (like contexts not having deadlines) from their callers. The above is only an example of how to document this if it cannot be avoided, not an endorsement of the pattern.

#### Concurrency

Go users assume that conceptually read-only operations are safe for concurrent use and do not require extra synchronization.

The extra remark about concurrency can safely be removed in this Godoc:

```
// Len returns the number of bytes of the unread portion of the buffer;
// b.Len() == len(b.Bytes()).
//
// It is safe to be called concurrently by multiple goroutines.
func (*Buffer) Len() int
```

Mutating operations, however, are not assumed to be safe for concurrent use and require the user to consider synchronization.

Similarly, the extra remark about concurrency can safely be removed here:

```
// Grow grows the buffer's capacity.
//
// It is not safe to be called concurrently by multiple goroutines.
func (*Buffer) Grow(n int)
```

Documentation is strongly encouraged if any of the following are true.

It is unclear whether the operation is read-only or mutating:

```python
// Good:
package lrucache
// Lookup returns the data associated with the key from the cache.
//
// This operation is not safe for concurrent use.
func (*Cache) Lookup(key string) (data []byte, ok bool)
```

Why? A cache hit when looking up the key mutate a LRU cache internally. How this is implemented may not be obvious to all readers.

Synchronization is provided by the API:

```
// Good:
package fortune_go_proto
// NewFortuneTellerClient returns an *rpc.Client for the FortuneTeller service.
// It is safe for simultaneous use by multiple goroutines.
func NewFortuneTellerClient(cc *rpc.ClientConn) *FortuneTellerClient
```

Why? Stubby provides synchronization.

**Note:** If the API is a type and the API provides synchronization in entirety, conventionally only the type definition documents the semantics.

The API consumes user-implemented types of interfaces, and the interface’s consumer has particular concurrency requirements:

```
// Good:
package health
// A Watcher reports the health of some entity (usually a backend service).
//
// Watcher methods are safe for simultaneous use by multiple goroutines.
type Watcher interface {
    // Watch sends true on the passed-in channel when the Watcher's
    // status has changed.
    Watch(changed chan<- bool) (unwatch func())
    // Health returns nil if the entity being watched is healthy, or a
    // non-nil error explaining why the entity is not healthy.
    Health() error
}
```

Why? Whether an API is safe for use by multiple goroutines is part of its contract.

#### Cleanup

Document any explicit cleanup requirements that the API has. Otherwise, callers won’t use the API correctly, leading to resource leaks and other possible bugs.

Call out cleanups that are up to the caller:

```
// Good:
// NewTicker returns a new Ticker containing a channel that will send the
// current time on the channel after each tick.
//
// Call Stop to release the Ticker's associated resources when done.
func NewTicker(d Duration) *Ticker
func (*Ticker) Stop()
```

If it is potentially unclear how to clean up the resources, explain how:

```python
// Good:
// Get issues a GET to the specified URL.
//
// When err is nil, resp always contains a non-nil resp.Body.
// Caller should close resp.Body when done reading from it.
//
//    resp, err := http.Get("http://example.com/")
//    if err != nil {
//        // handle error
//    }
//    defer resp.Body.Close()
//    body, err := io.ReadAll(resp.Body)
func (c *Client) Get(url string) (resp *Response, err error)
```

See also:

- [GoTip #110: Don’t Mix Exit With Defer](https://google.github.io/styleguide/go/index.html#gotip)

#### Errors

Document significant error sentinel values or error types that your functions return to callers so that callers can anticipate what types of conditions they can handle in their code.

```python
// Good:
package os
// Read reads up to len(b) bytes from the File and stores them in b. It returns
// the number of bytes read and any error encountered.
//
// At end of file, Read returns 0, io.EOF.
func (*File) Read(b []byte) (n int, err error) {
```

When a function returns a specific error type, correctly note whether the error is a pointer receiver or not:

```
// Good:
package os
type PathError struct {
    Op   string
    Path string
    Err  error
}
// Chdir changes the current working directory to the named directory.
//
// If there is an error, it will be of type *PathError.
func Chdir(dir string) error {
```

Documenting whether the values returned are pointer receivers enables callers to correctly compare the errors using [`errors.Is`](https://pkg.go.dev/errors#Is), [`errors.As`](https://pkg.go.dev/errors#As), and [`package cmp`](https://pkg.go.dev/github.com/google/go-cmp/cmp). This is because a non-pointer value is not equivalent to a pointer value.

**Note:** In the `Chdir` example, the return type is written as `error` rather than `*PathError` due to [how nil interface values work](https://go.dev/doc/faq#nil_error).

Document overall error conventions in the [package’s documentation](decisions#package-comments) when the behavior is applicable to most errors found in the package:

```
// Good:
// Package os provides a platform-independent interface to operating system
// functionality.
//
// Often, more information is available within the error. For example, if a
// call that takes a file name fails, such as Open or Stat, the error will
// include the failing file name when printed and will be of type *PathError,
// which may be unpacked for more information.
package os
```

Thoughtful application of these approaches can add [extra information to errors](#error-extra-info) without much effort and help callers avoid adding redundant annotations.

See also:

- [Go Tip #106: Error Naming Conventions](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #89: When to Use Canonical Status Codes as Errors](https://google.github.io/styleguide/go/index.html#gotip)

### Preview

Go features a [documentation server](https://pkg.go.dev/golang.org/x/pkgsite/cmd/pkgsite). It is recommended to preview the documentation your code produces both before and during the code review process. This helps to validate that the [godoc formatting](#godoc-formatting) is rendered correctly.

### Godoc formatting

[Godoc](https://pkg.go.dev/) provides some specific syntax to [format documentation](https://go.dev/doc/comment).

A blank line is required to separate paragraphs:

```
// Good:
// LoadConfig reads a configuration out of the named file.
//
// See some/shortlink for config file format details.
```

Test files can contain [runnable examples](decisions#examples) that appear attached to the corresponding documentation in godoc:

```
// Good:
func ExampleConfig_WriteTo() {
  cfg := &Config{
    Name: "example",
  }
  if err := cfg.WriteTo(os.Stdout); err != nil {
    log.Exitf("Failed to write config: %s", err)
  }
  // Output:
  // {
  //   "name": "example"
  // }
}
```

Indenting lines by an additional two spaces formats them verbatim:

```javascript
// Good:
// Update runs the function in an atomic transaction.
//
// This is typically used with an anonymous TransactionFunc:
//
//   if err := db.Update(func(state *State) { state.Foo = bar }); err != nil {
//     //...
//   }
```

Note, however, that it can often be more appropriate to put code in a runnable example instead of including it in a comment.

This verbatim formatting can be leveraged for formatting that is not native to godoc, such as lists and tables:

```python
// Good:
// LoadConfig reads a configuration out of the named file.
//
// LoadConfig treats the following keys in special ways:
//   "import" will make this configuration inherit from the named file.
//   "env" if present will be populated with the system environment.
```

A single line that begins with a capital letter, contains no punctuation except parentheses and commas, and is followed by another paragraph, is formatted as a header:

```
// Good:
// The following line is formatted as a heading.
//
// Using headings
//
// Headings come with autogenerated anchor tags for easy linking.
```

### Signal boosting

Sometimes a line of code looks like something common, but actually isn’t. One of the best examples of this is an `err == nil` check (since `err != nil` is much more common). The following two conditional checks are hard to distinguish:

```
// Good:
if err := doSomething(); err != nil {
    // ...
}
```

```
// Bad:
if err := doSomething(); err == nil {
    // ...
}
```

You can instead “boost” the signal of the conditional by adding a comment:

```
// Good:
if err := doSomething(); err == nil { // if NO error
    // ...
}
```

The comment draws attention to the difference in the conditional.

## Variable declarations

### Initialization

For consistency, prefer `:=` over `var` when initializing a new variable with a non-zero value.

```
// Good:
i := 42
```

```javascript
// Bad:
var i = 42
```

### Declaring variables with zero values

The following declarations use the [zero value](https://golang.org/ref/spec#The_zero_value):

```javascript
// Good:
var (
    coords Point
    magic  [4]byte
    primes []int
)
```

You should declare values using the zero value when you want to convey an empty value that **is ready for later use**. Using composite literals with explicit initialization can be clunky:

```javascript
// Bad:
var (
    coords = Point{X: 0, Y: 0}
    magic  = [4]byte{0, 0, 0, 0}
    primes = []int(nil)
)
```

A common application of zero value declaration is when using a variable as the output when unmarshalling:

```javascript
// Good:
var coords Point
if err := json.Unmarshal(data, &coords); err != nil {
```

It is also okay to use the zero value in the following form when you need a variable of a pointer type:

```
// Good:
msg := new(pb.Bar) // or "&pb.Bar{}"
if err := proto.Unmarshal(data, msg); err != nil {
```

If you need a lock or other field that [must not be copied](decisions#copying) in your struct, you can make it a value type to take advantage of zero value initialization. It does mean that the containing type must now be passed via a pointer and not a value. Methods on the type must take pointer receivers.

```
// Good:
type Counter struct {
    // This field does not have to be "*sync.Mutex". However,
    // users must now pass *Counter objects between themselves, not Counter.
    mu   sync.Mutex
    data map[string]int64
}
// Note this must be a pointer receiver to prevent copying.
func (c *Counter) IncrementBy(name string, n int64)
```

It’s acceptable to use value types for local variables of composites (such as structs and arrays) even if they contain such uncopyable fields. However, if the composite is returned by the function, or if all accesses to it end up needing to take an address anyway, prefer declaring the variable as a pointer type at the outset. Similarly, protobuf messages should be declared as pointer types.

```javascript
// Good:
func NewCounter(name string) *Counter {
    c := new(Counter) // "&Counter{}" is also fine.
    registerCounter(name, c)
    return c
}
var msg = new(pb.Bar) // or "&pb.Bar{}".
```

This is because `*pb.Something` satisfies [`proto.Message`](https://pkg.go.dev/google.golang.org/protobuf/proto#Message) while `pb.Something` does not.

```javascript
// Bad:
func NewCounter(name string) *Counter {
    var c Counter
    registerCounter(name, &c)
    return &c
}
var msg = pb.Bar{}
```

> **Important:** Map types must be explicitly initialized before they can be modified. However, reading from zero-value maps is perfectly fine.
> > For map and slice types, if the code is particularly performance sensitive and if you know the sizes in advance, see the [size hints](#vardeclsize) section.

### Composite literals

The following are [composite literal](https://golang.org/ref/spec#Composite_literals) declarations:

```javascript
// Good:
var (
    coords   = Point{X: x, Y: y}
    magic    = [4]byte{'I', 'W', 'A', 'D'}
    primes   = []int{2, 3, 5, 7, 11}
    captains = map[string]string{"Kirk": "James Tiberius", "Picard": "Jean-Luc"}
)
```

You should declare a value using a composite literal when you know initial elements or members.

In contrast, using composite literals to declare empty or memberless values can be visually noisy compared to [zero-value initialization](#vardeclzero).

When you need a pointer to a zero value, you have two options: empty composite literals and `new`. Both are fine, but the `new` keyword can serve to remind the reader that if a non-zero value were needed, a composite literal wouldn’t work:

```javascript
// Good:
var (
  buf = new(bytes.Buffer) // non-empty Buffers are initialized with constructors.
  msg = new(pb.Message) // non-empty proto messages are initialized with builders or by setting fields one by one.
)
```

### Size hints

The following are declarations that take advantage of size hints in order to preallocate capacity:

```javascript
// Good:
var (
    // Preferred buffer size for target filesystem: st_blksize.
    buf = make([]byte, 131072)
    // Typically process up to 8-10 elements per run (16 is a safe assumption).
    q = make([]Node, 0, 16)
    // Each shard processes shardSize (typically 32000+) elements.
    seen = make(map[string]bool, shardSize)
)
```

Size hints and preallocation are important steps **when combined with empirical analysis of the code and its integrations**, to create performance-sensitive and resource-efficient code.

Most code does not need a size hint or preallocation, and can allow the runtime to grow the slice or map as necessary. It is acceptable to preallocate when the final size is known (e.g. when converting between a map and a slice) but this is not a readability requirement, and may not be worth the clutter in small cases.

**Warning:** Preallocating more memory than you need can waste memory in the fleet or even harm performance. When in doubt, see [GoTip #3: Benchmarking Go Code](https://google.github.io/styleguide/go/index.html#gotip) and default to a [zero initialization](#vardeclzero) or a [composite literal declaration](#vardeclcomposite).

### Channel direction

Specify [channel direction](https://go.dev/ref/spec#Channel_types) where possible.

```python
// Good:
// sum computes the sum of all of the values. It reads from the channel until
// the channel is closed.
func sum(values <-chan int) int {
    // ...
}
```

This prevents casual programming errors that are possible without specification:

```
// Bad:
func sum(values chan int) (out int) {
    for v := range values {
        out += v
    }
    // values must already be closed for this code to be reachable, which means
    // a second close triggers a panic.
    close(values)
}
```

When the direction is specified, the compiler catches simple errors like this. It also helps to convey a measure of ownership to the type.

See also Bryan Mills’ talk “Rethinking Classical Concurrency Patterns”: [slides](https://drive.google.com/file/d/1nPdvhB0PutEJzdCq5ms6UI58dp50fcAN/view?usp=sharing) [video](https://www.youtube.com/watch?v=5zXAHh5tJqQ).
