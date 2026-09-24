---
title: "تثبيت بيئة البرمجة"
book: hello-algo
chapter: chapter_appendix
slug: installation
order: 114
lang: ar
---
## تثبيت بيئة التطوير المتكاملة

نوصي باستخدام VS Code مفتوح المصدر وخفيف الوزن كبيئة تطوير متكاملة (IDE) محلية. تفضل بزيارة [الموقع الرسمي لـ VS Code](https://code.visualstudio.com/)، ونزّل نسخة VS Code المناسبة لنظام التشغيل لديك وثبّتها.

![تنزيل VS Code من الموقع الرسمي](/images/hello-algo/chapter_appendix--vscode_installation.png)

يمتلك VS Code منظومة قوية من الإضافات تدعم تشغيل معظم لغات البرمجة وتنقيحها. على سبيل المثال، بعد تثبيت إضافة "Python Extension Pack" يمكنك تنقيح شيفرة Python. وتظهر خطوات التثبيت في الشكل التالي.

![تثبيت إضافات VS Code](/images/hello-algo/chapter_appendix--vscode_extension_installation.png)

## تثبيت بيئات اللغات

### بيئة Python

1. نزّل [Miniconda3](https://docs.conda.io/en/latest/miniconda.html) وثبّتها مع Python 3.10 أو أحدث.
2. ابحث عن `python` في سوق إضافات VS Code وثبّت Python Extension Pack.
3. (اختياري) أدخل `pip install black` في سطر الأوامر لتثبيت منسّق الشيفرة.

### بيئة C/C++

1. تحتاج أنظمة Windows إلى تثبيت [MinGW](https://sourceforge.net/projects/mingw-w64/files/) ([دليل الإعداد](https://blog.csdn.net/qq_33698226/article/details/129031241))؛ أما macOS فيأتي مزوّداً بـ Clang ولا يحتاج إلى تثبيت.
2. ابحث عن `c++` في سوق إضافات VS Code وثبّت C/C++ Extension Pack.
3. (اختياري) افتح صفحة الإعدادات، وابحث عن خيار تنسيق الشيفرة `Clang_format_fallback Style`، واضبطه على `{ BasedOnStyle: Microsoft, BreakBeforeBraces: Attach }`.

### بيئة Java

1. نزّل [OpenJDK](https://jdk.java.net/18/) (الإصدار 10 أو أحدث) وثبّته.
2. ابحث عن `java` في سوق إضافات VS Code وثبّت Extension Pack for Java.

### بيئة C#

1. نزّل [.NET 8.0](https://dotnet.microsoft.com/en-us/download) وثبّته.
2. ابحث عن `C# Dev Kit` في سوق إضافات VS Code وثبّت C# Dev Kit ([دليل الإعداد](https://code.visualstudio.com/docs/csharp/get-started)).
3. يمكنك أيضاً استخدام Visual Studio ([دليل التثبيت](https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio?view=vs-2022)).

### بيئة Go

1. نزّل [Go](https://go.dev/dl/) وثبّته.
2. ابحث عن `go` في سوق إضافات VS Code وثبّت Go.
3. اضغط `Ctrl + Shift + P` لفتح لوحة الأوامر، واكتب `go`، واختر `Go: Install/Update Tools`، وحدّد جميع الخيارات وثبّتها.

### بيئة Swift

1. نزّل [Swift](https://www.swift.org/download/) وثبّته.
2. ابحث عن `swift` في سوق إضافات VS Code وثبّت [Swift for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=sswg.swift-lang).

### بيئة JavaScript

1. نزّل [Node.js](https://nodejs.org/en/) وثبّته.
2. (اختياري) ابحث عن `Prettier` في سوق إضافات VS Code وثبّت منسّق الشيفرة.

### بيئة TypeScript

1. اتبع خطوات التثبيت نفسها الخاصة ببيئة JavaScript.
2. ثبّت [TypeScript Execute (tsx)](https://github.com/privatenumber/tsx?tab=readme-ov-file#global-installation).
3. ابحث عن `typescript` في سوق إضافات VS Code وثبّت [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors).

### بيئة Dart

1. نزّل [Dart](https://dart.dev/get-dart) وثبّته.
2. ابحث عن `dart` في سوق إضافات VS Code وثبّت [Dart](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code).

### بيئة Rust

1. نزّل [Rust](https://www.rust-lang.org/tools/install) وثبّته.
2. ابحث عن `rust` في سوق إضافات VS Code وثبّت [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).
