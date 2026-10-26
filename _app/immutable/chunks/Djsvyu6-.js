const s="kinney",a="testing",n="مدخل إلى الاختبارات",t="asymmetric-matchers-solution",l="الحل",p=[],c=`<p>إليك طريقة واحدة لتنفيذ اختبارات لصنف <code>Character</code> لدينا في <a href="https://stevekinney.com/courses/testing/asymmetric-matchers-exercise">التمرين السابق</a> باستخدام <a href="https://stevekinney.com/courses/testing/asymmetric-matchers">المطابقات غير المتماثلة</a>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Character</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./character.js&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Person</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./person.js&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Character&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should create a character with a first name, last name, and role&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> character = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Character</span>(<span class="hljs-string">&#x27;Ada&#x27;</span>, <span class="hljs-string">&#x27;Lovelace&#x27;</span>, <span class="hljs-string">&#x27;Computer Scientist&#x27;</span>);

    <span class="hljs-title function_">expect</span>(character).<span class="hljs-title function_">toEqual</span>({
      <span class="hljs-attr">id</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">String</span>),
      <span class="hljs-attr">firstName</span>: <span class="hljs-string">&#x27;Ada&#x27;</span>,
      <span class="hljs-attr">lastName</span>: <span class="hljs-string">&#x27;Lovelace&#x27;</span>,
      <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;Computer Scientist&#x27;</span>,
      <span class="hljs-attr">level</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">strength</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
      <span class="hljs-attr">dexterity</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
      <span class="hljs-attr">intelligence</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
      <span class="hljs-attr">wisdom</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
      <span class="hljs-attr">charisma</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
      <span class="hljs-attr">constitution</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Number</span>),
      <span class="hljs-attr">createdAt</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Date</span>),
      <span class="hljs-attr">lastModified</span>: expect.<span class="hljs-title function_">any</span>(<span class="hljs-title class_">Date</span>),
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should allow you to increase the level&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> character = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Character</span>(<span class="hljs-string">&#x27;Ada&#x27;</span>, <span class="hljs-string">&#x27;Lovelace&#x27;</span>, <span class="hljs-string">&#x27;Computer Scientist&#x27;</span>);

    character.<span class="hljs-title function_">levelUp</span>();
    <span class="hljs-title function_">expect</span>(character.<span class="hljs-property">level</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">2</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should update the last modified date when leveling up&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> character = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Character</span>(<span class="hljs-string">&#x27;Ada&#x27;</span>, <span class="hljs-string">&#x27;Lovelace&#x27;</span>, <span class="hljs-string">&#x27;Computer Scientist&#x27;</span>);

    <span class="hljs-keyword">const</span> initialLastModified = character.<span class="hljs-property">lastModified</span>;

    character.<span class="hljs-title function_">levelUp</span>();

    <span class="hljs-title function_">expect</span>(character.<span class="hljs-property">lastModified</span>).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBe</span>(initialLastModified);
  });

  <span class="hljs-comment">// Bonus: Test that Character inherits from Person</span>
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should inherit from Person&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> character = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Character</span>(<span class="hljs-string">&#x27;Ada&#x27;</span>, <span class="hljs-string">&#x27;Lovelace&#x27;</span>, <span class="hljs-string">&#x27;Computer Scientist&#x27;</span>);

    <span class="hljs-title function_">expect</span>(character).<span class="hljs-title function_">toBeInstanceOf</span>(<span class="hljs-title class_">Person</span>);
  });
});
</code></pre>
`,e={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,p as headings,c as html,t as slug,l as title};
