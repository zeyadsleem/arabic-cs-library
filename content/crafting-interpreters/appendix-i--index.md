---
title: "الملحق الأول"
lang: ar
source: https://craftinginterpreters.com/
---

هاهو ملحق (appendix) كامل لقواعد لغة Lox النحوية. تضمّ الفصول التي تُقدّم كلّ جزء من
اللغة قواعده هناك، لكن هذا يجمعها كلّها في مكان واحد.

## القواعد النحوية

تُستخدم القواعد النحوية (syntax) في تحليل تسلسل الرموز (tokens) الخطّي إلى بنية شجرة
التحليل (syntax tree) المتداخلة. وهي تبدأ بالقاعدة الأولى التي تطابق برنامج Lox
كاملاً (أو مُدخلاً واحداً في بيئة REPL التفاعلية).

```ebnf
program        → declaration* EOF ;
```

### الإعلانات

البرنامج سلسلة من الإعلانات، وهي الجمل التي تربط معرّفات (identifiers) جديدة أو أيّ
من أنواع الجمل الأخرى.

```ebnf
declaration    → classDecl
               | funDecl
               | varDecl
               | statement ;

classDecl      → "class" IDENTIFIER ( "<" IDENTIFIER )?
                 "{" function* "}" ;
funDecl        → "fun" function ;
varDecl        → "var" IDENTIFIER ( "=" expression )? ";" ;
```

### الجمل

قواعد الجمل المتبقّية تُنتج آثاراً جانبية (side effects)، لكنها لا تُدخل ربطات
(bindings) جديدة.

```ebnf
statement      → exprStmt
               | forStmt
               | ifStmt
               | printStmt
               | returnStmt
               | whileStmt
               | block ;

exprStmt       → expression ";" ;
forStmt        → "for" "(" ( varDecl | exprStmt | ";" )
                           expression? ";"
                           expression? ")" statement ;
ifStmt         → "if" "(" expression ")" statement
                 ( "else" statement )? ;
printStmt      → "print" expression ";" ;
returnStmt     → "return" expression? ";" ;
whileStmt      → "while" "(" expression ")" statement ;
block          → "{" declaration* "}" ;
```

لاحظ أنّ `block` قاعدة جملة، لكنها تُستخدم أيضاً كطرف غير طرفي (nonterminal) في
بعض القواعد الأخرى لأشياء مثل أجسام الدوال.

### التعبيرات

التعبيرات تُنتج قيماً (values). ولغة Lox لديها عدد من المعاملات أحادية وثنائية بمستويات
أولوية (precedence) مختلفة. فبعض قواعد اللغات لا تُشفّر علاقات الأولوية مباشرةً بل
تحدّدها في مكان آخر. أمّا نحن فنستخدم قاعدة منفصلة لكلّ مستوى أولوية لجعلها صريحة.

```ebnf
expression     → assignment ;

assignment     → ( call "." )? IDENTIFIER "=" assignment
               | logic_or ;

logic_or       → logic_and ( "or" logic_and )* ;
logic_and      → equality ( "and" equality )* ;
equality       → comparison ( ( "!=" | "==" ) comparison )* ;
comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
term           → factor ( ( "-" | "+" ) factor )* ;
factor         → unary ( ( "/" | "*" ) unary )* ;

unary          → ( "!" | "-" ) unary | call ;
call           → primary ( "(" arguments? ")" | "." IDENTIFIER )* ;
primary        → "true" | "false" | "nil" | "this"
               | NUMBER | STRING | IDENTIFIER | "(" expression ")"
               | "super" "." IDENTIFIER ;
```

### قواعد مساعدة

من أجل إبقاء القواعد أعلاه أنظف قليلاً، قُسِّم بعضُ القواعد إلى بضع قواعد مساعدة
مُعاد استخدامها.

```ebnf
function       → IDENTIFIER "(" parameters? ")" block ;
parameters     → IDENTIFIER ( "," IDENTIFIER )* ;
arguments      → expression ( "," expression )* ;
```

## القواعد المِعجمية

تستخدم القواعد المِعجمية (lexical) الماسح الضوئي (scanner) لتجميع المحارف في رموز.
وحيث تكون الصياغة [خالية من السياق][context free]، فإنّ القواعد المِعجمية
[منتظمة][regular] -- لاحظ أنّها لا تضمّ أيّ قواعد متكرّرة.

[context free]: https://en.wikipedia.org/wiki/Context-free_grammar
[regular]: https://en.wikipedia.org/wiki/Regular_grammar

```ebnf
NUMBER         → DIGIT+ ( "." DIGIT+ )? ;
STRING         → "\"" <any char except "\"">* "\"" ;
IDENTIFIER     → ALPHA ( ALPHA | DIGIT )* ;
ALPHA          → "a" ... "z" | "A" ... "Z" | "_" ;
DIGIT          → "0" ... "9" ;
```
