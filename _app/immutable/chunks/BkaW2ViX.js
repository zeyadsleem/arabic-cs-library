const s="use-the-index-luke",a="sql-where-clause-null",e="NULL في قاعدة بيانات Oracle",n="index",l="`NULL` في قاعدة بيانات Oracle",c=[{depth:2,id:"المحتويات",text:"المحتويات"}],o=`<p>غالباً ما يسبّب <code>NULL</code> في SQL الارتباك. فرغم أن الفكرة الأساسية لـ<code>NULL</code> — <a href="https://en.wikipedia.org/wiki/Null_%28SQL%29">تمثيل البيانات المفقودة</a> — بسيطة إلى حد ما، فإن لها بعض الخصوصيات. فعلى سبيل المثال، يجب استخدام <code>IS NULL</code> بدلاً من <code>= NULL</code>. علاوة على ذلك، لدى قاعدة بيانات Oracle غرائب إضافية تتعلق بـ<code>NULL</code>، من جهة لأنها لا تتعامل دائماً مع <code>NULL</code> كما يقتضي المعيار، ومن جهة أخرى لأن لديها معالجة «خاصة» جداً لـ<code>NULL</code> في الفهارس.</p>
<p>لا يعرّف معيار SQL قيمة <code>NULL</code> بوصفها قيمة، بل بوصفها عنصراً نائباً عن قيمة مفقودة أو مجهولة. وبناءً على ذلك، لا يمكن لأي قيمة أن تكون <code>NULL</code>. لكن قاعدة بيانات Oracle تتعامل مع السلسلة الفارغة على أنها <code>NULL</code>:</p>
<pre><code class="language-sql">   <span class="hljs-keyword">SELECT</span>     <span class="hljs-string">&#x27;0 IS NULL???&#x27;</span> <span class="hljs-keyword">AS</span> &quot;what is NULL?&quot; <span class="hljs-keyword">FROM</span> dual
    <span class="hljs-keyword">WHERE</span>      <span class="hljs-number">0</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
<span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span>    <span class="hljs-string">&#x27;0 is not null&#x27;</span> <span class="hljs-keyword">FROM</span> dual
    <span class="hljs-keyword">WHERE</span>     <span class="hljs-number">0</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
<span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-string">&#x27;&#x27;&#x27;&#x27;&#x27; IS NULL???&#x27;</span>  <span class="hljs-keyword">FROM</span> dual
    <span class="hljs-keyword">WHERE</span>    <span class="hljs-string">&#x27;&#x27;</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
<span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-string">&#x27;&#x27;&#x27;&#x27;&#x27; is not null&#x27;</span> <span class="hljs-keyword">FROM</span> dual 
    <span class="hljs-keyword">WHERE</span>    <span class="hljs-string">&#x27;&#x27;</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
</code></pre>
<p>ولزيادة الارتباك، توجد حتى حالة تتعامل فيها قاعدة بيانات Oracle مع <code>NULL</code> على أنه سلسلة فارغة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> dummy
     , dummy <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;&#x27;</span>
     , dummy <span class="hljs-operator">||</span> <span class="hljs-keyword">NULL</span>
  <span class="hljs-keyword">FROM</span> dual
</code></pre>
<p>ينبغي أن يؤدي ربط العمود <code>DUMMY</code> (الذي يحتوي دائماً على <code>'X'</code>) بـ<code>NULL</code> إلى إرجاع <code>NULL</code>.</p>
<p>يُستخدم مفهوم <code>NULL</code> في كثير من لغات البرمجة. وأينما بحثت، لن تجد السلسلة الفارغة مساوية لـ<code>NULL</code> أبداً… إلا في قاعدة بيانات Oracle. بل إنه من المستحيل فعلاً تخزين سلسلة فارغة في حقل <code>VARCHAR2</code>؛ فإن حاولت، تخزّن قاعدة بيانات Oracle قيمة <code>NULL</code> فقط.</p>
<p>هذه الخصوصية ليست غريبة فحسب، بل خطيرة أيضاً. وإضافة إلى ذلك، لا تتوقف غرابة <code>NULL</code> في قاعدة بيانات Oracle عند هذا الحد، بل تمتد إلى الفهرسة.</p>
<h2 id="المحتويات">المحتويات</h2>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null-index/index"><code>NULL</code> في الفهارس</a></em> — كل فهرس هو فهرس جزئي (partial index)</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null-not-null-constraint/index">قيود <code>NOT NULL</code></a></em> — تؤثر في استخدام الفهارس</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null-partial-index/index">محاكاة الفهارس الجزئية</a></em> — باستخدام الفهرسة القائمة على الدوال (function-based indexing)</li>
</ol>
`,p={book:s,chapter:a,chapterTitle:e,slug:n,title:l,headings:c,html:o};export{s as book,a as chapter,e as chapterTitle,p as default,c as headings,o as html,n as slug,l as title};
