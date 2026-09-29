---
title: "17.6 Searching: grep and find"
lang: en
---

A common task is to search for specific files or for specific content within files. The `find` command is useful for finding a file or directory whose name has a specific pattern, whereas the `grep` command is useful for searching for a specific pattern within a file or set of files.

### [](#_the_find_command)17.6.1. The find Command

The `find` command performs a recursive search of a filesystem (at a given start point in the directory structure), to find any files. When run with the `-name ` command line option, `find` searches for all files (and directories) with a name matching the given search pattern. The search pattern is a regular expression that includes character literals and special characters or sub-patterns that specify general patterns. One special character commonly used in regular expressions is `*`. It means "match with zero or more of any character". So for the search pattern `"hello*"`, `hello1`, `hellothere`, and `hello_123_XYZ` all match the pattern. Here are a few examples of the `find` command to find files:

```bash
$ find ./ -name dog.c    # from current directory (./) find all files named dog.c
$ find ./ -name "*.c"    # from ./ find all files that end with .c
$ find ./ -name "temp*"  # from ./ find all files that that start with temp
```

There are many other command line options to the `find` command, allowing users to configure its search behavior in different ways. See its man page for more information.

### [](#_the_grep_command)17.6.2. The grep Command

The `grep` command finds patterns within a file or within a set of files. It can filter data from a source to a destination based on pattern matching. The `grep` command takes two command line arguments, a search pattern regular expression, and a file (or set of files) to search in for matching patterns. It outputs every line in the file (or set of files) that has a matching occurrence of the pattern. Like `find`, `grep` also has many command line options to tailor its search. Below are a few examples of the `grep` command to find patterns in a file(s). One of the files used in these examples is the `temp` file, whose contents are the following:

```
hello
Hello
hiHelo
hello there
hello There
Meow
Mellow
```

Search for all occurrences of `"hello"` in the file `temp`:

```bash
$ grep hello temp
hello
hello there
hello There
```

Search for occurrences of `"hello there"` in the file `temp`. In this example, because the search pattern has space characters in it, the pattern needs to be inside double quotes.

```bash
$ grep "hello there" temp
hello there
```

Include the file line numbers with matches (`-n` command line option) and ignore case in the pattern (`-i` command line option):

```bash
$ grep -n -i "hello there" temp
4:hello there
5:hello There
```

Search for all patterns that have any upper-case alphabetic character (`[A-Z]`) followed by an `el`:

```bash
$ grep "[A-Z]el" temp
Hello
hiHelo
Mellow
```

Search for all words that start with (`\b` matches a word boundary) any upper-case alphabetic character (`[A-Z]`) followed by an `el`:

```bash
$ grep "\b[A-Z]el" temp
Hello
Mellow
```

Search for all patterns that have any upper-case alphabetic character (`[A-Z]`) followed by zero or more (`*`) `e` characters:

```bash
$  grep "[A-Z]e*" temp
Hello
hiHelo
hello There
Meow
Mellow
```

Note that `hello There` is a match because it contains an upper case character, `T`, followed by zero `e` characters.

Search for all patterns that have any upper-case alphabetic character (`[A-Z]`) followed by `el` followed by zero or more (`*`) additional `l` characters followed by an `o`:

```bash
$  grep "[A-Z]ell*o" temp
Hello
hiHelo
Mellow
```

Search for `main` in all files ending in `.c`:

```bash
$ grep main *.c
function.c:int main(void) {
hello.c:int main(void) {
string.c:int main(void) {
structfunc.c:int main(void) {
types_scanf.c:int main(void) {
```

Search for `main` in all files ending in `.c`, and list the filename (`-H`) and the line number (`-n`) of all matches:

```bash
$ grep -H -n main *.c
function.c:21:int main(void) {
hello.c:13:int main(void) {
string.c:11:int main(void) {
structfunc.c:17:int main(void) {
types_scanf.c:13:int main(void) {
```

Recursively grep (`-r`) for hello in all files starting in the `CS31` subdirectory:

```bash
$ grep -r hello  ~/cs31
```

There are many command line options to `grep` to configure its search in different ways.

### [](#_references)17.6.3. References

For more information see:

- The man pages for these commands (e.g., `man grep`)
- [grep user info](https://www.gnu.org/savannah-checkouts/gnu/grep/manual/grep.html) from gnu.org
- [most used Unix commands](https://www.cheat-sheets.org/project/tldr/command/special-most-used-linux-commands/) from cheat-sheets.org
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html) from gnu.org.
