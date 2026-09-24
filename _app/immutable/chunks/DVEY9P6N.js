const t="hello-algo",e="chapter_appendix",o="الملاحق",i="installation",a="تثبيت بيئة البرمجة",l=[{depth:2,id:"تثبيت-بيئة-التطوير-المتكاملة",text:"تثبيت بيئة التطوير المتكاملة"},{depth:2,id:"تثبيت-بيئات-اللغات",text:"تثبيت بيئات اللغات"},{depth:3,id:"بيئة-python",text:"بيئة Python"},{depth:3,id:"بيئة-cc",text:"بيئة C/C++"},{depth:3,id:"بيئة-java",text:"بيئة Java"},{depth:3,id:"بيئة-c",text:"بيئة C#"},{depth:3,id:"بيئة-go",text:"بيئة Go"},{depth:3,id:"بيئة-swift",text:"بيئة Swift"},{depth:3,id:"بيئة-javascript",text:"بيئة JavaScript"},{depth:3,id:"بيئة-typescript",text:"بيئة TypeScript"},{depth:3,id:"بيئة-dart",text:"بيئة Dart"},{depth:3,id:"بيئة-rust",text:"بيئة Rust"}],n=`<h2 id="تثبيت-بيئة-التطوير-المتكاملة">تثبيت بيئة التطوير المتكاملة</h2>
<p>نوصي باستخدام VS Code مفتوح المصدر وخفيف الوزن كبيئة تطوير متكاملة (IDE) محلية. تفضل بزيارة <a href="https://code.visualstudio.com/">الموقع الرسمي لـ VS Code</a>، ونزّل نسخة VS Code المناسبة لنظام التشغيل لديك وثبّتها.</p>
<p><img src="/images/hello-algo/chapter_appendix--vscode_installation.png" alt="تنزيل VS Code من الموقع الرسمي"></p>
<p>يمتلك VS Code منظومة قوية من الإضافات تدعم تشغيل معظم لغات البرمجة وتنقيحها. على سبيل المثال، بعد تثبيت إضافة &quot;Python Extension Pack&quot; يمكنك تنقيح شيفرة Python. وتظهر خطوات التثبيت في الشكل التالي.</p>
<p><img src="/images/hello-algo/chapter_appendix--vscode_extension_installation.png" alt="تثبيت إضافات VS Code"></p>
<h2 id="تثبيت-بيئات-اللغات">تثبيت بيئات اللغات</h2>
<h3 id="بيئة-python">بيئة Python</h3>
<ol>
<li>نزّل <a href="https://docs.conda.io/en/latest/miniconda.html">Miniconda3</a> وثبّتها مع Python 3.10 أو أحدث.</li>
<li>ابحث عن <code>python</code> في سوق إضافات VS Code وثبّت Python Extension Pack.</li>
<li>(اختياري) أدخل <code>pip install black</code> في سطر الأوامر لتثبيت منسّق الشيفرة.</li>
</ol>
<h3 id="بيئة-cc">بيئة C/C++</h3>
<ol>
<li>تحتاج أنظمة Windows إلى تثبيت <a href="https://sourceforge.net/projects/mingw-w64/files/">MinGW</a> (<a href="https://blog.csdn.net/qq_33698226/article/details/129031241">دليل الإعداد</a>)؛ أما macOS فيأتي مزوّداً بـ Clang ولا يحتاج إلى تثبيت.</li>
<li>ابحث عن <code>c++</code> في سوق إضافات VS Code وثبّت C/C++ Extension Pack.</li>
<li>(اختياري) افتح صفحة الإعدادات، وابحث عن خيار تنسيق الشيفرة <code>Clang_format_fallback Style</code>، واضبطه على <code>{ BasedOnStyle: Microsoft, BreakBeforeBraces: Attach }</code>.</li>
</ol>
<h3 id="بيئة-java">بيئة Java</h3>
<ol>
<li>نزّل <a href="https://jdk.java.net/18/">OpenJDK</a> (الإصدار 10 أو أحدث) وثبّته.</li>
<li>ابحث عن <code>java</code> في سوق إضافات VS Code وثبّت Extension Pack for Java.</li>
</ol>
<h3 id="بيئة-c">بيئة C#</h3>
<ol>
<li>نزّل <a href="https://dotnet.microsoft.com/en-us/download">.NET 8.0</a> وثبّته.</li>
<li>ابحث عن <code>C# Dev Kit</code> في سوق إضافات VS Code وثبّت C# Dev Kit (<a href="https://code.visualstudio.com/docs/csharp/get-started">دليل الإعداد</a>).</li>
<li>يمكنك أيضاً استخدام Visual Studio (<a href="https://learn.microsoft.com/zh-cn/visualstudio/install/install-visual-studio?view=vs-2022">دليل التثبيت</a>).</li>
</ol>
<h3 id="بيئة-go">بيئة Go</h3>
<ol>
<li>نزّل <a href="https://go.dev/dl/">Go</a> وثبّته.</li>
<li>ابحث عن <code>go</code> في سوق إضافات VS Code وثبّت Go.</li>
<li>اضغط <code>Ctrl + Shift + P</code> لفتح لوحة الأوامر، واكتب <code>go</code>، واختر <code>Go: Install/Update Tools</code>، وحدّد جميع الخيارات وثبّتها.</li>
</ol>
<h3 id="بيئة-swift">بيئة Swift</h3>
<ol>
<li>نزّل <a href="https://www.swift.org/download/">Swift</a> وثبّته.</li>
<li>ابحث عن <code>swift</code> في سوق إضافات VS Code وثبّت <a href="https://marketplace.visualstudio.com/items?itemName=sswg.swift-lang">Swift for Visual Studio Code</a>.</li>
</ol>
<h3 id="بيئة-javascript">بيئة JavaScript</h3>
<ol>
<li>نزّل <a href="https://nodejs.org/en/">Node.js</a> وثبّته.</li>
<li>(اختياري) ابحث عن <code>Prettier</code> في سوق إضافات VS Code وثبّت منسّق الشيفرة.</li>
</ol>
<h3 id="بيئة-typescript">بيئة TypeScript</h3>
<ol>
<li>اتبع خطوات التثبيت نفسها الخاصة ببيئة JavaScript.</li>
<li>ثبّت <a href="https://github.com/privatenumber/tsx?tab=readme-ov-file#global-installation">TypeScript Execute (tsx)</a>.</li>
<li>ابحث عن <code>typescript</code> في سوق إضافات VS Code وثبّت <a href="https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors">Pretty TypeScript Errors</a>.</li>
</ol>
<h3 id="بيئة-dart">بيئة Dart</h3>
<ol>
<li>نزّل <a href="https://dart.dev/get-dart">Dart</a> وثبّته.</li>
<li>ابحث عن <code>dart</code> في سوق إضافات VS Code وثبّت <a href="https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code">Dart</a>.</li>
</ol>
<h3 id="بيئة-rust">بيئة Rust</h3>
<ol>
<li>نزّل <a href="https://www.rust-lang.org/tools/install">Rust</a> وثبّته.</li>
<li>ابحث عن <code>rust</code> في سوق إضافات VS Code وثبّت <a href="https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer">rust-analyzer</a>.</li>
</ol>
`,d={book:t,chapter:e,chapterTitle:o,slug:i,title:a,headings:l,html:n};export{t as book,e as chapter,o as chapterTitle,d as default,l as headings,n as html,i as slug,a as title};
