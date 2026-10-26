const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="vitests-hooks-exercise",l="تمرين",e=[],p=`<p>هل يمكنك أخذ اختبارات <code>Character</code> من <a href="https://stevekinney.com/courses/testing/asymmetric-matchers-solution">الحل السابق</a> واستخدام خطّاف <code>beforeEach</code> لإنشاء شخصية جديدة في كل مرة؟</p>
<p>لو أردنا فعل شيء مماثل مع <code>Person</code>، فقد يبدو هكذا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect, beforeEach } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Person</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./person.js&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Person&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">let</span> person;

  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    person = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Grace&#x27;</span>, <span class="hljs-string">&#x27;Hopper&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should create a person with a first name and last name&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(person).<span class="hljs-title function_">toMatchObject</span>({
      <span class="hljs-attr">firstName</span>: <span class="hljs-string">&#x27;Grace&#x27;</span>,
      <span class="hljs-attr">lastName</span>: <span class="hljs-string">&#x27;Hopper&#x27;</span>,
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error if first name or last name is missing&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>(<span class="hljs-string">&#x27;Grace&#x27;</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;First name and last name are required&#x27;</span>);

    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Person</span>()).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;First name and last name are required&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the full name&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(person.<span class="hljs-property">fullName</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Grace Hopper&#x27;</span>);
  });
});
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
