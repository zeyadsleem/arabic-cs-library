const s="use-the-index-luke",e="sql-where-clause-null-partial-index",a="محاكاة الفهارس الجزئية في Oracle",n="index",p="محاكاة الفهارس الجزئية في قاعدة بيانات Oracle",o=[{depth:2,id:"الفهارس-الجزئية-الجزء-الثاني",text:"الفهارس الجزئية، الجزء الثاني"}],c=`<p>يمكن استخدام الطريقة الغريبة التي تتعامل بها قاعدة بيانات Oracle مع <code>NULL</code> في الفهارس لمحاكاة الفهارس الجزئية؛ إذ يكفي أن نستخدم <code>NULL</code> للصفوف التي لا ينبغي فهرستها.</p>
<p>وللتوضيح، نحاكي الفهرس الجزئي التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX messages_todo
          <span class="hljs-keyword">ON</span> messages (receiver)
       <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>
</code></pre>
<p>أولاً، نحتاج إلى دالة تعيد قيمة <code>RECEIVER</code> فقط إذا كانت قيمة <code>PROCESSED</code> تساوي <code>'N'</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
<span class="hljs-keyword">FUNCTION</span> pi_processed(processed <span class="hljs-type">CHAR</span>, receiver NUMBER)
<span class="hljs-keyword">RETURN</span> NUMBER
<span class="hljs-keyword">DETERMINISTIC</span>
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
   IF processed <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;N&#x27;</span>) <span class="hljs-keyword">THEN</span>
      <span class="hljs-keyword">RETURN</span> receiver;
   <span class="hljs-keyword">ELSE</span>
      <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">NULL</span>;
   <span class="hljs-keyword">END</span> IF;
<span class="hljs-keyword">END</span>
</code></pre>
<p>ويجب أن تكون الدالة <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index">حتمية لتُستخدم في تعريف فهرس</a>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-partial-indexes-oracle&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>الآن يمكننا إنشاء فهرس يحتوي فقط الصفوف التي تكون فيها <code>PROCESSED='N'</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX messages_todo
          <span class="hljs-keyword">ON</span> messages (pi_processed(processed, receiver))
</code></pre>
<p>لاستخدام الفهرس، يجب استخدام التعبير المفهرس في الاستعلام:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> message
  <span class="hljs-keyword">FROM</span> messages
 <span class="hljs-keyword">WHERE</span> pi_processed(processed, receiver) <span class="hljs-operator">=</span> ?
</code></pre>
<pre><code>----------------------------------------------------------
|Id | Operation                   | Name          | Cost |
----------------------------------------------------------
| 0 | SELECT STATEMENT            |               | 5330 |
| 1 |  TABLE ACCESS BY INDEX ROWID| MESSAGES      | 5330 |
|*2 |   INDEX RANGE SCAN          | MESSAGES_TODO | 5303 |
----------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access(&quot;PI_PROCESSED&quot;(&quot;PROCESSED&quot;,&quot;RECEIVER&quot;)=:X)
</code></pre>
<h2 id="الفهارس-الجزئية-الجزء-الثاني">الفهارس الجزئية، الجزء الثاني</h2>
<p>بدءاً من الإصدار 11<em>g</em>، يوجد نهج ثانٍ — مخيف بالقدر نفسه — لمحاكاة الفهارس الجزئية في قاعدة بيانات Oracle، وذلك باستخدام قسم فهرس معطَّل عمداً والمعامل <a href="https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/SKIP_UNUSABLE_INDEXES.html"><code>SKIP_UNUSABLE_INDEXES</code></a>.</p>
`,l={book:s,chapter:e,chapterTitle:a,slug:n,title:p,headings:o,html:c};export{s as book,e as chapter,a as chapterTitle,l as default,o as headings,c as html,n as slug,p as title};
