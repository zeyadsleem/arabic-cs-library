const t="crafting-interpreters",s="appendix-i",n="Appendix I",a="index",o="الملحق الأول",e=[{depth:2,id:"القواعد-النحوية",text:"القواعد النحوية"},{depth:3,id:"الإعلانات",text:"الإعلانات"},{depth:3,id:"الجمل",text:"الجمل"},{depth:3,id:"التعبيرات",text:"التعبيرات"},{depth:3,id:"قواعد-مساعدة",text:"قواعد مساعدة"},{depth:2,id:"القواعد-المعجمية",text:"القواعد المِعجمية"}],u=`<p>هاهو ملحق (appendix) كامل لقواعد لغة Lox النحوية. تضمّ الفصول التي تُقدّم كلّ جزء من
اللغة قواعده هناك، لكن هذا يجمعها كلّها في مكان واحد.</p>
<h2 id="القواعد-النحوية">القواعد النحوية</h2>
<p>تُستخدم القواعد النحوية (syntax) في تحليل تسلسل الرموز (tokens) الخطّي إلى بنية شجرة
التحليل (syntax tree) المتداخلة. وهي تبدأ بالقاعدة الأولى التي تطابق برنامج Lox
كاملاً (أو مُدخلاً واحداً في بيئة REPL التفاعلية).</p>
<pre><code class="language-ebnf"><span class="hljs-attribute">program</span>        → declaration* EOF ;
</code></pre>
<h3 id="الإعلانات">الإعلانات</h3>
<p>البرنامج سلسلة من الإعلانات، وهي الجمل التي تربط معرّفات (identifiers) جديدة أو أيّ
من أنواع الجمل الأخرى.</p>
<pre><code class="language-ebnf"><span class="hljs-attribute">declaration</span>    → classDecl
               | funDecl
               | varDecl
               | statement ;

<span class="hljs-attribute">classDecl</span>      → &quot;class&quot; IDENTIFIER ( &quot;&lt;&quot; IDENTIFIER )?
                 &quot;{&quot; function* &quot;}&quot; ;
<span class="hljs-attribute">funDecl</span>        → &quot;fun&quot; function ;
<span class="hljs-attribute">varDecl</span>        → &quot;var&quot; IDENTIFIER ( &quot;=<span class="hljs-string">&quot; expression )? &quot;</span>;&quot; ;
</code></pre>
<h3 id="الجمل">الجمل</h3>
<p>قواعد الجمل المتبقّية تُنتج آثاراً جانبية (side effects)، لكنها لا تُدخل ربطات
(bindings) جديدة.</p>
<pre><code class="language-ebnf"><span class="hljs-attribute">statement</span>      → exprStmt
               | forStmt
               | ifStmt
               | printStmt
               | returnStmt
               | whileStmt
               | block ;

<span class="hljs-attribute">exprStmt</span>       → expression &quot;;&quot; ;
<span class="hljs-attribute">forStmt</span>        → &quot;for&quot; &quot;(&quot; ( varDecl | exprStmt | &quot;;&quot; )
<span class="hljs-attribute">                           expression</span>? &quot;;&quot;
<span class="hljs-attribute">                           expression</span>? &quot;)&quot; statement ;
<span class="hljs-attribute">ifStmt</span>         → &quot;if&quot; &quot;(&quot; expression &quot;)&quot; statement
                 ( &quot;else&quot; statement )? ;
<span class="hljs-attribute">printStmt</span>      → &quot;print&quot; expression &quot;;&quot; ;
<span class="hljs-attribute">returnStmt</span>     → &quot;return&quot; expression? &quot;;&quot; ;
<span class="hljs-attribute">whileStmt</span>      → &quot;while&quot; &quot;(&quot; expression &quot;)&quot; statement ;
<span class="hljs-attribute">block</span>          → &quot;{&quot; declaration* &quot;}&quot; ;
</code></pre>
<p>لاحظ أنّ <code>block</code> قاعدة جملة، لكنها تُستخدم أيضاً كطرف غير طرفي (nonterminal) في
بعض القواعد الأخرى لأشياء مثل أجسام الدوال.</p>
<h3 id="التعبيرات">التعبيرات</h3>
<p>التعبيرات تُنتج قيماً (values). ولغة Lox لديها عدد من المعاملات أحادية وثنائية بمستويات
أولوية (precedence) مختلفة. فبعض قواعد اللغات لا تُشفّر علاقات الأولوية مباشرةً بل
تحدّدها في مكان آخر. أمّا نحن فنستخدم قاعدة منفصلة لكلّ مستوى أولوية لجعلها صريحة.</p>
<pre><code class="language-ebnf"><span class="hljs-attribute">expression</span>     → assignment ;

<span class="hljs-attribute">assignment</span>     → ( call &quot;.&quot; )? IDENTIFIER &quot;=<span class="hljs-string">&quot; assignment
               | logic_or ;

logic_or       → logic_and ( &quot;</span>or<span class="hljs-string">&quot; logic_and )* ;
logic_and      → equality ( &quot;</span>and<span class="hljs-string">&quot; equality )* ;
equality       → comparison ( ( &quot;</span>!=<span class="hljs-string">&quot; | &quot;</span>==<span class="hljs-string">&quot; ) comparison )* ;
comparison     → term ( ( &quot;</span>&gt;<span class="hljs-string">&quot; | &quot;</span>&gt;=<span class="hljs-string">&quot; | &quot;</span>&lt;<span class="hljs-string">&quot; | &quot;</span>&lt;=<span class="hljs-string">&quot; ) term )* ;
term           → factor ( ( &quot;</span>-<span class="hljs-string">&quot; | &quot;</span>+<span class="hljs-string">&quot; ) factor )* ;
factor         → unary ( ( &quot;</span>/<span class="hljs-string">&quot; | &quot;</span>*<span class="hljs-string">&quot; ) unary )* ;

unary          → ( &quot;</span>!<span class="hljs-string">&quot; | &quot;</span>-<span class="hljs-string">&quot; ) unary | call ;
call           → primary ( &quot;</span>(<span class="hljs-string">&quot; arguments? &quot;</span>)<span class="hljs-string">&quot; | &quot;</span>.&quot; IDENTIFIER )* ;
<span class="hljs-attribute">primary</span>        → &quot;true&quot; | &quot;false&quot; | &quot;nil&quot; | &quot;this&quot;
               | NUMBER | STRING | IDENTIFIER | &quot;(&quot; expression &quot;)&quot;
               | &quot;super&quot; &quot;.&quot; IDENTIFIER ;
</code></pre>
<h3 id="قواعد-مساعدة">قواعد مساعدة</h3>
<p>من أجل إبقاء القواعد أعلاه أنظف قليلاً، قُسِّم بعضُ القواعد إلى بضع قواعد مساعدة
مُعاد استخدامها.</p>
<pre><code class="language-ebnf"><span class="hljs-attribute">function</span>       → IDENTIFIER &quot;(&quot; parameters? &quot;)&quot; block ;
<span class="hljs-attribute">parameters</span>     → IDENTIFIER ( &quot;,&quot; IDENTIFIER )* ;
<span class="hljs-attribute">arguments</span>      → expression ( &quot;,&quot; expression )* ;
</code></pre>
<h2 id="القواعد-المعجمية">القواعد المِعجمية</h2>
<p>تستخدم القواعد المِعجمية (lexical) الماسح الضوئي (scanner) لتجميع المحارف في رموز.
وحيث تكون الصياغة <a href="https://en.wikipedia.org/wiki/Context-free_grammar">خالية من السياق</a>، فإنّ القواعد المِعجمية
<a href="https://en.wikipedia.org/wiki/Regular_grammar">منتظمة</a> -- لاحظ أنّها لا تضمّ أيّ قواعد متكرّرة.</p>
<pre><code class="language-ebnf"><span class="hljs-attribute">NUMBER</span>         → DIGIT+ ( &quot;.&quot; DIGIT+ )? ;
<span class="hljs-attribute">STRING</span>         → &quot;\\&quot;&quot; &lt;any char except &quot;\\&quot;&quot;&gt;* &quot;\\&quot;&quot; ;
<span class="hljs-attribute">IDENTIFIER</span>     → ALPHA ( ALPHA | DIGIT )* ;
<span class="hljs-attribute">ALPHA</span>          → &quot;a&quot; ... &quot;z&quot; | &quot;A&quot; ... &quot;Z&quot; | &quot;_&quot; ;
<span class="hljs-attribute">DIGIT</span>          → &quot;0&quot; ... &quot;9&quot; ;
</code></pre>
`,p={book:t,chapter:s,chapterTitle:n,slug:a,title:o,headings:e,html:u};export{t as book,s as chapter,n as chapterTitle,p as default,e as headings,u as html,a as slug,o as title};
