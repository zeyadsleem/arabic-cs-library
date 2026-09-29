---
title: "قرارات أسلوب Go (1 من 2)"
lang: en
---

## About

This document contains style decisions intended to unify and provide standard guidance, explanations, and examples for the advice given by the Go readability mentors.

This document is **not exhaustive** and will grow over time. In cases where [the core style guide](guide) contradicts the advice given here, **the style guide takes precedence**, and this document should be updated accordingly.

See [the Overview](https://google.github.io/styleguide/go#about) for the full set of Go Style documents.

The following sections have moved from style decisions to another part of the guide:

- **MixedCaps**: see [guide#mixed-caps](guide#mixed-caps)
- **Formatting**: see [guide#formatting](guide#formatting)
- **Line Length**: see [guide#line-length](guide#line-length)

## Naming

See the naming section within [the core style guide](guide#naming) for overarching guidance on naming. The following sections provide further clarification on specific areas within naming.

### Underscores

Names in Go should in general not contain underscores. There are three exceptions to this principle:

1. Package names that are only imported by generated code may contain underscores. See [package names](#package-names) for more detail around how to choose multi-word package names.
2. Test, Benchmark and Example function names within `*_test.go` files may include underscores.
3. Low-level libraries that interoperate with the operating system or cgo may reuse identifiers, as is done in [`syscall`](https://pkg.go.dev/syscall#pkg-constants). This is expected to be very rare in most codebases.

**Note:** Filenames of source code are not Go identifiers and do not have to follow these conventions. They may contain underscores.

### Package names

In Go, package names must be concise and use only lowercase letters and numbers (e.g., [`k8s`](https://pkg.go.dev/k8s.io/client-go/kubernetes), [`oauth2`](https://pkg.go.dev/golang.org/x/oauth2)). Multi-word package names should remain unbroken and in all lowercase (e.g., [`tabwriter`](https://pkg.go.dev/text/tabwriter) instead of `tabWriter`, `TabWriter`, or `tab_writer`).

Avoid selecting package names that are likely to be [shadowed](best-practices#shadowing) by commonly used local variable names. For example, `usercount` is a better package name than `count`, since `count` is a commonly used variable name.

Go package names should not have underscores. If you need to import a package that does have one in its name (usually from generated or third party code), it must be renamed at import time to a name that is suitable for use in Go code.

An exception to this is that package names that are only imported by generated code may contain underscores. Specific examples include:

- Using the `_test` suffix for unit tests that only exercise the exported API of a package (package `testing` calls these [“black box tests”](https://pkg.go.dev/testing)). For example, a package `linkedlist` must define its black box unit tests in a package named `linkedlist_test` (not `linked_list_test`)
- Using underscores and the `_test` suffix for packages that specify functional or integration tests. For example, a linked list service integration test could be named `linked_list_service_test`
- Using the `_test` suffix for [package-level documentation examples](https://go.dev/blog/examples)

Avoid uninformative package names like `util`, `utility`, `common`, `helper`, `model`, `testhelper`, and so on that would tempt users of the package to [rename it when importing](#import-renaming). See:

- [Guidance on so-called “utility packages”](best-practices#util-packages)
- [Go Tip #97: What’s in a Name](https://google.github.io/styleguide/go/index.html#gotip)
- [Go Tip #108: The Power of a Good Package Name](https://google.github.io/styleguide/go/index.html#gotip)

When an imported package is renamed (e.g. `import foopb "path/to/foo_go_proto"`), the local name for the package must comply with the rules above, as the local name dictates how the symbols in the package are referenced in the file. If a given import is renamed in multiple files, particularly in the same or nearby packages, the same local name should be used wherever possible for consistency.

See also: [Go blog post about package names](https://go.dev/blog/package-names).

### Receiver names

[Receiver](https://golang.org/ref/spec#Method_declarations) variable names must be:

- Short (usually one or two letters in length)
- Abbreviations for the type itself
- Applied consistently to every receiver for that type
- Not an underscore; omit the name if it is unused

| Long Name | Better Name |
| --- | --- |
| `func (tray Tray)` | `func (t Tray)` |
| `func (info *ResearchInfo)` | `func (ri *ResearchInfo)` |
| `func (this *ReportWriter)` | `func (w *ReportWriter)` |
| `func (self *Scanner)` | `func (s *Scanner)` |

### Constant names

Constant names must use [MixedCaps](guide#mixed-caps) like all other names in Go. ([Exported](https://tour.golang.org/basics/3) constants start with uppercase, while unexported constants start with lowercase.) This applies even when it breaks conventions in other languages. Constant names should not be a derivative of their values and should instead explain what the value denotes.

```javascript
// Good:
const MaxPacketSize = 512
const (
    ExecuteBit = 1 << iota
    WriteBit
    ReadBit
)
```

Do not use non-MixedCaps constant names or constants with a `K` prefix.

```javascript
// Bad:
const MAX_PACKET_SIZE = 512
const kMaxBufferSize = 1024
const KMaxUsersPergroup = 500
```

Name constants based on their role, not their values. If a constant does not have a role apart from its value, then it is unnecessary to define it as a constant.

```javascript
// Bad:
const Twelve = 12
const (
    UserNameColumn = "username"
    GroupColumn    = "group"
)
```

### Initialisms

Words in names that are initialisms or acronyms (e.g., `URL` and `NATO`) should have the same case. `URL` should appear as `URL` or `url` (as in `urlPony`, or `URLPony`), never as `Url`. As a general rule, identifiers (e.g., `ID` and `DB`) should also be capitalized similar to their usage in English prose.

- In names with multiple initialisms (e.g. `XMLAPI` because it contains `XML` and `API`), each letter within a given initialism should have the same case, but each initialism in the name does not need to have the same case.
- In names with an initialism containing a lowercase letter (e.g. `DDoS`, `iOS`, `gRPC`), the initialism should appear as it would in standard prose, unless you need to change the first letter for the sake of [exportedness](https://golang.org/ref/spec#Exported_identifiers). In these cases, the entire initialism should be the same case (e.g. `ddos`, `IOS`, `GRPC`).

| English Usage | Scope | Correct | Incorrect |
| --- | --- | --- | --- |
| XML API | Exported | `XMLAPI` | `XmlApi`, `XMLApi`, `XmlAPI`, `XMLapi` |
| XML API | Unexported | `xmlAPI` | `xmlapi`, `xmlApi` |
| iOS | Exported | `IOS` | `Ios`, `IoS` |
| iOS | Unexported | `iOS` | `ios` |
| gRPC | Exported | `GRPC` | `Grpc` |
| gRPC | Unexported | `gRPC` | `grpc` |
| DDoS | Exported | `DDoS` | `DDOS`, `Ddos` |
| DDoS | Unexported | `ddos` | `dDoS`, `dDOS` |
| ID | Exported | `ID` | `Id` |
| ID | Unexported | `id` | `iD` |
| DB | Exported | `DB` | `Db` |
| DB | Unexported | `db` | `dB` |
| Txn | Exported | `Txn` | `TXN` |

### Getters

Function and method names should not use a `Get` or `get` prefix, unless the underlying concept uses the word “get” (e.g. an HTTP GET). Prefer starting the name with the noun directly, for example use `Counts` over `GetCounts`.

If the function involves performing a complex computation or executing a remote call, a different word like `Compute` or `Fetch` can be used in place of `Get`, to make it clear to a reader that the function call may take time and could block or fail.

### Variable names

The general rule of thumb is that the length of a name should be proportional to the size of its scope and inversely proportional to the number of times that it is used within that scope. A variable created at file scope may require multiple words, whereas a variable scoped to a single inner block may be a single word or even just a character or two, to keep the code clear and avoid extraneous information.

Here is a rough baseline. These numeric guidelines are not strict rules. Apply judgement based on context, [clarity](guide#clarity), and [concision](guide#concision).

- A small scope is one in which one or two small operations are performed, say 1-7 lines.
- A medium scope is a few small or one large operation, say 8-15 lines.
- A large scope is one or a few large operations, say 15-25 lines.
- A very large scope is anything that spans more than a page (say, more than 25 lines).

A name that might be perfectly clear (e.g., `c` for a counter) within a small scope could be insufficient in a larger scope and would require clarification to remind the reader of its purpose further along in the code. A scope in which there are many variables, or variables that represent similar values or concepts, may necessitate longer variable names than the scope suggests.

The specificity of the concept can also help to keep a variable’s name concise. For example, assuming there is only a single database in use, a short variable name like `db` that might normally be reserved for very small scopes may remain perfectly clear even if the scope is very large. In this case, a single word `database` is likely acceptable based on the size of the scope, but is not required as `db` is a very common shortening for the word with few alternate interpretations.

The name of a local variable should reflect what it contains and how it is being used in the current context, rather than where the value originated. For example, it is often the case that the best local variable name is not the same as the struct or protocol buffer field name.

In general:

- Single-word names like `count` or `options` are a good starting point.
- Additional words can be added to disambiguate similar names, for example `userCount` and `projectCount`.
- Do not simply drop letters to save typing. For example `Sandbox` is preferred over `Sbx`, particularly for exported names.
- Omit [types and type-like words](#repetitive-with-type) from most variable names. For a number, `userCount` is a better name than `numUsers` or `usersInt`.
- For a slice, `users` is a better name than `userSlice`.
- It is acceptable to include a type-like qualifier if there are two versions of a value in scope, for example you might have an input stored in `ageString` and use `age` for the parsed value.

Omit words that are clear from the [surrounding context](#repetitive-in-context). For example, in the implementation of a `UserCount` method, a local variable called `userCount` is probably redundant; `count`, `users`, or even `c` are just as readable.

#### Single-letter variable names

Single-letter variable names can be a useful tool to minimize [repetition](#repetition), but can also make code needlessly opaque. Limit their use to instances where the full word is obvious and where it would be repetitive for it to appear in place of the single-letter variable.

In general:

- For a [method receiver variable](#receiver-names), a one-letter or two-letter name is preferred.
- Using familiar variable names for common types is often helpful: `r` for an `io.Reader` or `*http.Request`
- `w` for an `io.Writer` or `http.ResponseWriter`

Single-letter identifiers are acceptable as integer loop variables, particularly for indices (e.g., `i`) and coordinates (e.g., `x` and `y`). Abbreviations can be acceptable loop identifiers when the scope is short, for example `for _, n := range nodes { ... }`.

### Repetition

A piece of Go source code should avoid unnecessary repetition. One common source of this is repetitive names, which often include unnecessary words or repeat their context or type. Code itself can also be unnecessarily repetitive if the same or a similar code segment appears multiple times in close proximity.

Repetitive naming can come in many forms, including:

#### Package vs. exported symbol name

When naming exported symbols, the name of the package is always visible outside your package, so redundant information between the two should be reduced or eliminated. If a package exports only one type and it is named after the package itself, the canonical name for the constructor is `New` if one is required.

> **Examples:** Repetitive Name -> Better Name
> > `widget.NewWidget` -> `widget.New` `widget.NewWidgetWithName` -> `widget.NewWithName` `db.LoadFromDatabase` -> `db.Load` `goatteleportutil.CountGoatsTeleported` -> `gtutil.CountGoatsTeleported` or `goatteleport.Count` `myteampb.MyTeamMethodRequest` -> `mtpb.MyTeamMethodRequest` or `myteampb.MethodRequest`

#### Variable name vs. type

The compiler always knows the type of a variable, and in most cases it is also clear to the reader what type a variable is by how it is used. It is only necessary to clarify the type of a variable if its value appears twice in the same scope.

| Repetitive Name | Better Name |
| --- | --- |
| `var numUsers int` | `var users int` |
| `var nameString string` | `var name string` |
| `var primaryProject *Project` | `var primary *Project` |

If the value appears in multiple forms, this can be clarified either with an extra word like `raw` and `parsed` or with the underlying representation:

```
// Good:
limitRaw := r.FormValue("limit")
limit, err := strconv.Atoi(limitRaw)
```

```
// Good:
limitStr := r.FormValue("limit")
limit, err := strconv.Atoi(limitStr)
```

#### External context vs. local names

Names that include information from their surrounding context often create extra noise without benefit. The package name, method name, type name, function name, import path, and even filename can all provide context that automatically qualifies all names within.

```
// Bad:
// In package "ads/targeting/revenue/reporting"
type AdsTargetingRevenueReport struct{}
func (p *Project) ProjectName() string
```

```
// Good:
// In package "ads/targeting/revenue/reporting"
type Report struct{}
func (p *Project) Name() string
```

```
// Bad:
// In package "sqldb"
type DBConnection struct{}
```

```
// Good:
// In package "sqldb"
type Connection struct{}
```

```
// Bad:
// In package "ads/targeting"
func Process(in *pb.FooProto) *Report {
    adsTargetingID := in.GetAdsTargetingID()
}
```

```
// Good:
// In package "ads/targeting"
func Process(in *pb.FooProto) *Report {
    id := in.GetAdsTargetingID()
}
```

Repetition should generally be evaluated in the context of the user of the symbol, rather than in isolation. For example, the following code has lots of names that may be fine in some circumstances, but redundant in context:

```javascript
// Bad:
func (db *DB) UserCount() (userCount int, err error) {
    var userCountInt64 int64
    if dbLoadError := db.LoadFromDatabase("count(distinct users)", &userCountInt64); dbLoadError != nil {
        return 0, fmt.Errorf("failed to load user count: %s", dbLoadError)
    }
    userCount = int(userCountInt64)
    return userCount, nil
}
```

Instead, information about names that are clear from context or usage can often be omitted:

```javascript
// Good:
func (db *DB) UserCount() (int, error) {
    var count int64
    if err := db.Load("count(distinct users)", &count); err != nil {
        return 0, fmt.Errorf("failed to load user count: %s", err)
    }
    return int(count), nil
}
```

## Commentary

The conventions around commentary (which include what to comment, what style to use, how to provide runnable examples, etc.) are intended to support the experience of reading the documentation of a public API. See [Effective Go](http://golang.org/doc/effective_go.html#commentary) for more information.

The best practices document’s section on [documentation conventions](best-practices#documentation-conventions) discusses this further.

**Best Practice:** Use [doc preview](best-practices#documentation-preview) during development and code review to see whether the documentation and runnable examples are useful and are presented the way you expect them to be.

**Tip:** Godoc uses very little special formatting; lists and code snippets should usually be indented to avoid linewrapping. Apart from indentation, decoration should generally be avoided.

### Comment line length

There is no fixed [line length](guide#line-length) for comments in Go.

Long comment lines should be wrapped to ensure that source is readable in tools which do not perform automatic wrapping of comment lines. If you are uncertain where to wrap, 80 or 100 columns are common choices. However, this is not a hard cut-off; there are situations where breaking a long literal text is harmful. There is no requirement for the specific column width at which wrapping occurs. Aim to be [consistent](guide#consistency) within a file.

See this [post from The Go Blog on documentation](https://blog.golang.org/godoc-documenting-go-code) for more on commentary.

```
# Good:
// This is a comment paragraph.
// The length of individual lines doesn't matter in Godoc;
// but the choice of wrapping makes it easy to read on narrow screens.
//
// Don't worry too much about the long URL:
// https://supercalifragilisticexpialidocious.example.com:8080/Animalia/Chordata/Mammalia/Rodentia/Geomyoidea/Geomyidae/
//
// Similarly, if you have other information that is made awkward
// by too many line breaks, use your judgment and include a long line
// if it helps rather than hinders.
```

Avoid comments that fit large amounts of text onto a single line, which is a poor reader experience.

```
# Bad:
// This is a comment paragraph. While some code editors and viewers will wrap the paragraph for the reader, others will display a very long line that will overflow most windows and require users to scroll horizontally. In addition, even on a screen capable of displaying the entire line, it is easier to read a narrower paragraph than very wide one.
//
// Don't worry too much about the long URL:
// https://supercalifragilisticexpialidocious.example.com:8080/Animalia/Chordata/Mammalia/Rodentia/Geomyoidea/Geomyidae/
```

### Doc comments

All top-level exported names must have doc comments, as should unexported type or function declarations with unobvious behavior or meaning. These comments should be [full sentences](#comment-sentences) that begin with the name of the object being described. An article (“a”, “an”, “the”) can precede the name to make it read more naturally.

```
// Good:
// A Request represents a request to run a command.
type Request struct { ...
// Encode writes the JSON encoding of req to w.
func Encode(w io.Writer, req *Request) { ...
```

Doc comments appear in [Godoc](https://pkg.go.dev/) and are surfaced by IDEs, and therefore should be written for anyone using the package.

A documentation comment applies to the following symbol, or the group of fields if it appears in a struct.

```
// Good:
// Options configure the group management service.
type Options struct {
    // General setup:
    Name  string
    Group *FooGroup
    // Dependencies:
    DB *sql.DB
    // Customization:
    LargeGroupThreshold int // optional; default: 10
    MinimumMembers      int // optional; default: 2
}
```

**Best Practice:** If you have doc comments for unexported code, follow the same custom as if it were exported (namely, starting the comment with the unexported name). This makes it easy to export it later by simply replacing the unexported name with the newly-exported one across both comments and code.

### Comment sentences

Comments that are complete sentences should be capitalized and punctuated like standard English sentences. (As an exception, it is okay to begin a sentence with an uncapitalized identifier name if it is otherwise clear. Such cases are probably best done only at the beginning of a paragraph.)

Comments that are sentence fragments have no such requirements for punctuation or capitalization.

[Documentation comments](#doc-comments) should always be complete sentences, and as such should always be capitalized and punctuated. Simple end-of-line comments (especially for struct fields) can be simple phrases that assume the field name is the subject.

```python
// Good:
// A Server handles serving quotes from the collected works of Shakespeare.
type Server struct {
    // BaseDir points to the base directory under which Shakespeare's works are stored.
    //
    // The directory structure is expected to be the following:
    //   {BaseDir}/manifest.json
    //   {BaseDir}/{name}/{name}-part{number}.txt
    BaseDir string
    WelcomeMessage  string // displayed when user logs in
    ProtocolVersion string // checked against incoming requests
    PageLength      int    // lines per page when printing (optional; default: 20)
}
```

### Examples

Packages should clearly document their intended usage. Try to provide a [runnable example](http://blog.golang.org/examples); examples show up in Godoc. Runnable examples belong in the test file, not the production source file. See this example ([Godoc](https://pkg.go.dev/time#example-Duration), [source](https://cs.opensource.google/go/go/+/HEAD:src/time/example_test.go)).

If it isn’t feasible to provide a runnable example, example code can be provided within code comments. As with other code and command-line snippets in comments, it should follow standard formatting conventions.

### Named result parameters

When naming parameters, consider how function signatures appear in Godoc. The name of the function itself and the type of the result parameters are often sufficiently clear.

```
// Good:
func (n *Node) Parent1() *Node
func (n *Node) Parent2() (*Node, error)
```

If a function returns two or more parameters of the same type, adding names can be useful.

```
// Good:
func (n *Node) Children() (left, right *Node, err error)
```

If the caller must take action on particular result parameters, naming them can help suggest what the action is:

```python
// Good:
// WithTimeout returns a context that will be canceled no later than d duration
// from now.
//
// The caller must arrange for the returned cancel function to be called when
// the context is no longer needed to prevent a resource leak.
func WithTimeout(parent Context, d time.Duration) (ctx Context, cancel func())
```

In the code above, cancellation is a particular action a caller must take. However, were the result parameters written as `(Context, func())` alone, it would be unclear what is meant by “cancel function”.

Don’t use named result parameters when the names produce [unnecessary repetition](#repetitive-with-type).

```
// Bad:
func (n *Node) Parent1() (node *Node)
func (n *Node) Parent2() (node *Node, err error)
```

Don’t name result parameters in order to avoid declaring a variable inside the function. This practice results in unnecessary API verbosity at the cost of minor implementation brevity.

[Naked returns](https://tour.golang.org/basics/7) are acceptable only in a small function. Once it’s a medium-sized function, be explicit with your returned values. Similarly, do not name result parameters just because it enables you to use naked returns. [Clarity](guide#clarity) is always more important than saving a few lines in your function.

It is always acceptable to name a result parameter if its value must be changed in a deferred closure.

> **Tip:** Types can often be clearer than names in function signatures. [GoTip #38: Functions as Named Types](https://google.github.io/styleguide/go/index.html#gotip) demonstrates this.
> > In, [`WithTimeout`](https://pkg.go.dev/context#WithTimeout) above, the real code uses a [`CancelFunc`](https://pkg.go.dev/context#CancelFunc) instead of a raw `func()` in the result parameter list and requires little effort to document.

### Package comments

Package comments must appear immediately above the package clause with no blank line between the comment and the package name. Example:

```
// Good:
// Package math provides basic constants and mathematical functions.
//
// This package does not guarantee bit-identical results across architectures.
package math
```

There must be a single package comment per package. If a package is composed of multiple files, exactly one of the files should have a package comment.

Comments for `main` packages have a slightly different form, where the name of the `go_binary` rule in the BUILD file takes the place of the package name.

```python
// Good:
// The seed_generator command is a utility that generates a Finch seed file
// from a set of JSON study configs.
package main
```

Other styles of comment are fine as long as the name of the binary is exactly as written in the BUILD file. When the binary name is the first word, capitalizing it is required even though it does not strictly match the spelling of the command-line invocation.

```
// Good:
// Binary seed_generator ...
// Command seed_generator ...
// Program seed_generator ...
// The seed_generator command ...
// The seed_generator program ...
// Seed_generator ...
```

Tips:

Example command-line invocations and API usage can be useful documentation. For Godoc formatting, indent the comment lines containing code.

If there is no obvious primary file or if the package comment is extraordinarily long, it is acceptable to put the doc comment in a file named `doc.go` with only the comment and the package clause.

Multiline comments can be used instead of multiple single-line comments. This is primarily useful if the documentation contains sections which may be useful to copy and paste from the source file, as with sample command-lines (for binaries) and template examples.

```python
// Good:
/*
The seed_generator command is a utility that generates a Finch seed file
from a set of JSON study configs.

    seed_generator *.json | base64 > finch-seed.base64
*/
package template
```

Comments intended for maintainers and that apply to the whole file are typically placed after import declarations. These are not surfaced in Godoc and are not subject to the rules above on package comments.

## Imports

### Import renaming

Package imports shouldn’t normally be renamed, but there are cases where they must be renamed or where a rename improves readability.

Local names for imported packages must follow [the guidance around package naming](#package-names), including the prohibition on the use of underscores and capital letters. Try to be [consistent](guide#consistency) by always using the same local name for the same imported package.

An imported package *must* be renamed to avoid a name collision with other imports. (A corollary of this is that [good package names](#package-names) should not require renaming.) In the event of a name collision, prefer to rename the most local or project-specific import.

Generated protocol buffer packages *must* be renamed to remove underscores from their names, and their local names must have a `pb` suffix. See [proto and stub best practices](best-practices#import-protos) for more information.

```python
// Good:
import (
    foosvcpb "path/to/package/foo_service_go_proto"
)
```

Lastly, an imported, non-autogenerated package *can* be renamed if it has an uninformative name (e.g. `util` or `v1`) Do this sparingly: do not rename the package if the code surrounding the use of the package conveys enough context. When possible, prefer refactoring the package itself with a more suitable name.

```python
// Good:
import (
    core "github.com/kubernetes/api/core/v1"
    meta "github.com/kubernetes/apimachinery/pkg/apis/meta/v1beta1"
)
```

If you need to import a package whose name collides with a common local variable name that you want to use (e.g. `url`, `ssh`) and you wish to rename the package, the preferred way to do so is with the `pkg` suffix (e.g. `urlpkg`). Note that it is possible to shadow a package with a local variable; this rename is only necessary if the package still needs to be used when such a variable is in scope.

### Import grouping

Imports should be organized into the following groups, in order:

1. Standard library packages
2. Other (project and vendored) packages
3. Protocol Buffer imports (e.g., `fpb "path/to/foo_go_proto"`)
4. Import for [side-effects](https://go.dev/doc/effective_go#blank_import) (e.g., `_ "path/to/package"`)

```python
// Good:
package main
import (
    "fmt"
    "hash/adler32"
    "os"
    "github.com/dsnet/compress/flate"
    "golang.org/x/text/encoding"
    "google.golang.org/protobuf/proto"
    foopb "myproj/foo/proto/proto"
    _ "myproj/rpc/protocols/dial"
    _ "myproj/security/auth/authhooks"
)
```

### Import “blank” (`import _`)

Packages that are imported only for their side effects (using the syntax `import _ "package"`) may only be imported in a main package, or in tests that require them.

Some examples of such packages include:

- [time/tzdata](https://pkg.go.dev/time/tzdata)
- [image/jpeg](https://pkg.go.dev/image/jpeg) in image processing code

Avoid blank imports in library packages, even if the library indirectly depends on them. Constraining side-effect imports to the main package helps control dependencies, and makes it possible to write tests that rely on a different import without conflict or wasted build costs.

The following are the only exceptions to this rule:

- You may use a blank import to bypass the check for disallowed imports in the [nogo static checker](https://github.com/bazelbuild/rules_go/blob/master/go/nogo.rst).
- You may use a blank import of the [embed](https://pkg.go.dev/embed) package in a source file which uses the `//go:embed` compiler directive.

**Tip:** If you create a library package that indirectly depends on a side-effect import in production, document the intended usage.

### Import “dot” (`import .`)

The `import .` form is a language feature that allows bringing identifiers exported from another package to the current package without qualification. See the [language spec](https://go.dev/ref/spec#Import_declarations) for more.

Do **not** use this feature in the Google codebase; it makes it harder to tell where the functionality is coming from.

```python
// Bad:
package foo_test
import (
    "bar/testutil" // also imports "foo"
    . "foo"
)
var myThing = Bar() // Bar defined in package foo; no qualification needed.
```

```python
// Good:
package foo_test
import (
    "bar/testutil" // also imports "foo"
    "foo"
)
var myThing = foo.Bar()
```

## Errors

### Returning errors

Use `error` to signal that a function can fail. By convention, `error` is the last result parameter.

```
// Good:
func Good() error { /* ... */ }
```

Returning a `nil` error is the idiomatic way to signal a successful operation that could otherwise fail. If a function returns an error, callers must treat all non-error return values as unspecified unless explicitly documented otherwise. Commonly, the non-error return values are their zero values, but this cannot be assumed.

```
// Good:
func GoodLookup() (*Result, error) {
    // ...
    if err != nil {
        return nil, err
    }
    return res, nil
}
```

Exported functions that return errors should return them using the `error` type. Concrete error types are susceptible to subtle bugs: a concrete `nil` pointer can get wrapped into an interface and thus become a non-nil value (see the [Go FAQ entry on the topic](https://golang.org/doc/faq#nil_error)).

```
// Bad:
func Bad() *os.PathError { /*...*/ }
```

**Tip:** A function that takes a [`context.Context`](https://pkg.go.dev/context) argument should usually return an `error` so that the caller can determine if the context was cancelled while the function was running.

### Error strings

Error strings should not be capitalized (unless beginning with an exported name, a proper noun or an acronym) and should not end with punctuation. This is because error strings usually appear within other context before being printed to the user.

```
// Bad:
err := fmt.Errorf("Something bad happened.")
```

```
// Good:
err := fmt.Errorf("something bad happened")
```

On the other hand, the style for the full displayed message (logging, test failure, API response, or other UI) depends, but should typically be capitalized.

```
// Good:
log.Infof("Operation aborted: %v", err)
log.Errorf("Operation aborted: %v", err)
t.Errorf("Op(%q) failed unexpectedly; err=%v", args, err)
```

### Handle errors

Code that encounters an error should make a deliberate choice about how to handle it. It is not usually appropriate to discard errors using `_` variables. If a function returns an error, do one of the following:

- Handle and address the error immediately.
- Return the error to the caller.
- In exceptional situations, call [`log.Fatal`](https://pkg.go.dev/github.com/golang/glog#Fatal) or (if absolutely necessary) `panic`.

**Note:** `log.Fatalf` is not the standard library log. See [#logging].

In the rare circumstance where it is appropriate to ignore or discard an error (for example a call to [`(*bytes.Buffer).Write`](https://pkg.go.dev/bytes#Buffer.Write) that is documented to never fail), an accompanying comment should explain why this is safe.

```javascript
// Good:
var b *bytes.Buffer
n, _ := b.Write(p) // never returns a non-nil error
```

For more discussion and examples of error handling, see [Effective Go](http://golang.org/doc/effective_go.html#errors) and [best practices](/styleguide/go/best-practices.html#error-handling).

### In-band errors

In C and similar languages, it is common for functions to return values like -1, null, or the empty string to signal errors or missing results. This is known as in-band error handling.

```
// Bad:
// Lookup returns the value for key or -1 if there is no mapping for key.
func Lookup(key string) int
```

Failing to check for an in-band error value can lead to bugs and can attribute errors to the wrong function.

```
// Bad:
// The following line returns an error that Parse failed for the input value,
// whereas the failure was that there is no mapping for missingKey.
return Parse(Lookup(missingKey))
```

Go’s support for multiple return values provides a better solution (see the [Effective Go section on multiple returns](http://golang.org/doc/effective_go.html#multiple-returns)). Instead of requiring clients to check for an in-band error value, a function should return an additional value to indicate whether its other return values are valid. This return value may be an error or a boolean when no explanation is needed, and should be the final return value.

```
// Good:
// Lookup returns the value for key or ok=false if there is no mapping for key.
func Lookup(key string) (value string, ok bool)
```

This API prevents the caller from incorrectly writing `Parse(Lookup(key))` which causes a compile-time error, since `Lookup(key)` has 2 outputs.

Returning errors in this way encourages more robust and explicit error handling:

```
// Good:
value, ok := Lookup(key)
if !ok {
    return fmt.Errorf("no value for %q", key)
}
return Parse(value)
```

Some standard library functions, like those in package `strings`, return in-band error values. This greatly simplifies string-manipulation code at the cost of requiring more diligence from the programmer. In general, Go code in the Google codebase should return additional values for errors.

### Indent error flow

Handle errors before proceeding with the rest of your code. This improves the readability of the code by enabling the reader to find the normal path quickly. This same logic applies to any block which tests a condition then ends in a terminal condition (e.g., `return`, `panic`, `log.Fatal`).

Code that runs if the terminal condition is not met should appear after the `if` block, and should not be indented in an `else` clause.

```
// Good:
if err != nil {
    // error handling
    return // or continue, etc.
}
// normal code
```

```
// Bad:
if err != nil {
    // error handling
} else {
    // normal code that looks abnormal due to indentation
}
```

**Tip:** If you are using a variable for more than a few lines of code, it is generally not worth using the `if`-with-initializer style. In these cases, it is usually better to move the declaration out and use a standard `if` statement:

```
// Good:
x, err := f()
if err != nil {
  // error handling
  return
}
// lots of code that uses x
// across multiple lines
```

```
// Bad:
if x, err := f(); err != nil {
  // error handling
  return
} else {
  // lots of code that uses x
  // across multiple lines
}
```

See [Go Tip #1: Line of Sight](https://google.github.io/styleguide/go/index.html#gotip) and [TotT: Reduce Code Complexity by Reducing Nesting](https://testing.googleblog.com/2017/06/code-health-reduce-nesting-reduce.html) for more details.
