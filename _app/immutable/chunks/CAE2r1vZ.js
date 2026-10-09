const s="use-the-index-luke",e="sql-where-clause-partial-and-filtered-indexes",a="الفهارس الجزئية",n="index",p="الفهارس الجزئية",r=[],l=`<p>حتى الآن لم نناقش سوى <em>الأعمدة</em> التي تُضاف إلى الفهرس. ومع الفهارس <em>الجزئية</em> (partial) في PostgreSQL أو <em>المُرشَّحة</em> (filtered) في SQL Server، يمكنك أيضاً تحديد <em>الصفوف</em> التي تُفهرس.</p>
<h4>تنبيه</h4>
<p>لقاعدة بيانات Oracle نهج فريد في الفهرسة الجزئية؛ ويشرحه <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null/index">القسم التالي</a> بالبناء على هذا القسم.</p>
<p>ولا تدعم Db2 (LUW) الفهارس الجزئية، لكن يمكن <a href="https://use-the-index-luke.com/blog/2014-11/seven-surprising-findings-about-DB2#blog-db2intro-partialidx">محاكاتها كما في قاعدة بيانات Oracle</a> عند استخدام ميزة <code>EXCLUDE NULL KEYS</code>.</p>
<p>يُفيد الفهرس الجزئي في شروط <code>where</code> الشائعة التي تستخدم قيماً ثابتة — مثل رمز الحالة في المثال التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> message
  <span class="hljs-keyword">FROM</span> messages
 <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>
   <span class="hljs-keyword">AND</span> receiver  <span class="hljs-operator">=</span> ?
</code></pre>
<p>الاستعلامات كهذا شائعة جداً في أنظمة الطوابير؛ إذ يجلب الاستعلام جميع الرسائل غير المعالَجة لمستلم معيّن. أما الرسائل التي عُولجت بالفعل فنادراً ما تُحتاج، وإذا احتيج إليها فالوصول إليها يكون عادةً بمعيار أكثر تحديداً مثل المفتاح الأساسي.</p>
<p>يمكننا تحسين هذا الاستعلام بفهرس من عمودين. وبالنظر إلى هذا الاستعلام وحده، لا يهم ترتيب الأعمدة لعدم وجود شرط نطاق.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX messages_todo
          <span class="hljs-keyword">ON</span> messages (receiver, processed)
</code></pre>
<p>يؤدي الفهرس غرضه، لكنه يشمل صفوفاً كثيرة لا يُبحث فيها أبداً، وهي جميع الرسائل التي عُولجت بالفعل. ومع ذلك يجعل الفهرس الاستعلام سريعاً جداً بفضل قابلية التوسع اللوغاريتمية، وإن كان يهدر مساحة قرص كبيرة.</p>
<p>ومع الفهرسة الجزئية يمكنك قصر الفهرس على الرسائل غير المعالَجة فقط. وصيغة ذلك بسيطة إلى حد مفاجئ: جملة <code>where</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX messages_todo
          <span class="hljs-keyword">ON</span> messages (receiver)
       <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>
</code></pre>
<p>لا يحتوي الفهرس إلا الصفوف التي تستوفي جملة <code>where</code>. وفي هذه الحالة تحديداً، يمكننا حتى حذف العمود <code>PROCESSED</code> لأنه دائماً <code>'N'</code> على أي حال. ويعني ذلك أن الفهرس يقلّص حجمه في بُعدين: عمودياً لأنه يحتوي صفوفاً أقل، وأفقياً بسبب حذف العمود.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-partial-indexes&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>لذلك يكون الفهرس صغيراً جداً. وفي حالة طابور، قد يعني ذلك حتى أن حجم الفهرس يبقى دون تغيير رغم نمو الجدول بلا حدود؛ فالفهرس لا يحتوي جميع الرسائل بل غير المعالَجة فقط.</p>
<p>ويمكن أن تصبح جملة <code>where</code> لفهرس جزئي معقدة اعتباطياً. والقيود الجوهرية الوحيدة تتعلق بالدوال: فلا يمكنك استخدام سوى الدوال الحتمية كما هو الحال في كل تعريف فهرس. غير أن لـSQL Server قواعد أكثر تقييداً و<a href="https://learn.microsoft.com/en-us/sql/t-sql/statements/create-index-transact-sql?view=sql-server-ver16">لا تسمح بالدوال ولا بالمعامل <code>OR</code> في مُسندات الفهرس</a>.</p>
<p>وتستطيع قاعدة البيانات استخدام فهرس جزئي كلما ظهرت جملة <code>where</code> في استعلام.</p>
<h4>فكّر في الأمر</h4>
<p>ما الخصوصية التي يمتلكها أصغر فهرس ممكن للاستعلام التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> message
  <span class="hljs-keyword">FROM</span> messages
 <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>
</code></pre>
`,o={book:s,chapter:e,chapterTitle:a,slug:n,title:p,headings:r,html:l};export{s as book,e as chapter,a as chapterTitle,o as default,r as headings,l as html,n as slug,p as title};
