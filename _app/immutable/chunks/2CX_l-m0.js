const s="use-the-index-luke",a="sql-where-clause-obfuscation-math",n="Math",e="index",p="الرياضيات",l=[],o=`<p>هناك فئة أخرى من التعتيم ذكية وتمنع الاستخدام السليم للفهرس. فهي لا تستخدم تعبيرات منطقية بل عملية حسابية.</p>
<p>تأمّل العبارة التالية. هل يمكنها استخدام فهرس على <code>NUMERIC_NUMBER</code>؟</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> numeric_number
  <span class="hljs-keyword">FROM</span> table_name
 <span class="hljs-keyword">WHERE</span> numeric_number <span class="hljs-operator">-</span> <span class="hljs-number">1000</span> <span class="hljs-operator">&gt;</span> ?
</code></pre>
<p>وبالمثل، هل يمكن للعبارة التالية استخدام فهرس على <code>A</code> و<code>B</code>—وأنت تختار الترتيب؟</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> a, b
  <span class="hljs-keyword">FROM</span> table_name
 <span class="hljs-keyword">WHERE</span> <span class="hljs-number">3</span><span class="hljs-operator">*</span>a <span class="hljs-operator">+</span> <span class="hljs-number">5</span> <span class="hljs-operator">=</span> b
</code></pre>
<p>لنضع هذين السؤالين في منظور مختلف؛ لو كنت تطوّر قاعدة بيانات (database) SQL، هل ستضيف حلال معادلات؟ معظم موردي قواعد البيانات يقولون ببساطة «لا!»، وبالتالي لا يستخدم أي من المثالين الفهرس.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-obf-math&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>يمكنك حتى استخدام الرياضيات لتعتيم شرط عن قصد—<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-concatenation/index">كما فعلنا سابقاً في البحث النصي الكامل بـ<code>LIKE</code></a>. ويكفي إضافة صفر، مثلاً:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> numeric_number
  <span class="hljs-keyword">FROM</span> table_name
 <span class="hljs-keyword">WHERE</span> numeric_number <span class="hljs-operator">+</span> <span class="hljs-number">0</span> <span class="hljs-operator">=</span> ?
</code></pre>
<p>ومع ذلك يمكننا فهرسة هذه التعبيرات بـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">فهرس قائم على دالة</a> إذا استخدمنا الحسابات بذكاء وحوّلنا عبارة <code>where</code> كما نحل معادلة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> a, b
  <span class="hljs-keyword">FROM</span> table_name
 <span class="hljs-keyword">WHERE</span> <span class="hljs-number">3</span><span class="hljs-operator">*</span>a <span class="hljs-operator">-</span> b <span class="hljs-operator">=</span> <span class="hljs-number">-5</span>
</code></pre>
<p>لقد نقلنا مراجع الجدول إلى طرف والمعاملات الثابتة إلى الطرف الآخر. ثم يمكننا إنشاء فهرس قائم على دالة للطرف الأيسر من المعادلة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX math <span class="hljs-keyword">ON</span> table_name (<span class="hljs-number">3</span><span class="hljs-operator">*</span>a <span class="hljs-operator">-</span> b)
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:e,title:p,headings:l,html:o};export{s as book,a as chapter,n as chapterTitle,r as default,l as headings,o as html,e as slug,p as title};
