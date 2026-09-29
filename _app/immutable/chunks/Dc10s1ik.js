const s="use-the-index-luke",n="sql-where-clause-obfuscation-numeric-strings",a="Numeric Strings",e="index",p="السلاسل الرقمية",l=[],r=`<p>السلاسل الرقمية (numeric strings) أرقام مخزّنة في أعمدة نصية. ورغم أنها ممارسة سيئة للغاية، فإنها لا تجعل الفهرس عديم الفائدة تلقائياً إذا عاملتها باستمرار كسلسلة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> numeric_string <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;42&#x27;</span>
</code></pre>
<p>بالطبع يمكن لهذه العبارة استخدام فهرس على <code>NUMERIC_STRING</code>. لكن إذا قارنتها باستخدام رقم، فلن تستطيع قاعدة البيانات (database) بعد ذلك استخدام هذا الشرط كـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index#imp-index-predicate-types">مُسند وصول</a>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> numeric_string <span class="hljs-operator">=</span> <span class="hljs-number">42</span>
</code></pre>
<p>لاحظ علامات الاقتباس الناقصة. ورغم أن بعض قواعد البيانات تُصدر خطأ (مثل PostgreSQL)، فإن قواعد بيانات كثيرة تضيف مجرد تحويل نوع ضمني.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">CAST</span>(numeric_string <span class="hljs-keyword">AS</span> <span class="hljs-type">INT</span>) <span class="hljs-operator">=</span> <span class="hljs-number">42</span>
</code></pre>
<p>إنها المشكلة نفسها كما في السابق. فلا يمكن استخدام فهرس على <code>NUMERIC_STRING</code> بسبب نداء الدالة. والحل أيضاً هو نفسه: لا تحوّل عمود الجدول، بل حوّل مصطلح البحث.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> numeric_string <span class="hljs-operator">=</span> <span class="hljs-built_in">CAST</span>(<span class="hljs-number">42</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">10</span>))
</code></pre>
<p>قد تتساءل لماذا لا تفعل قاعدة البيانات ذلك تلقائياً؟ أعتقد أن السبب أن تحويل سلسلة إلى رقم يعطي دائماً نتيجة لا لبس فيها. وهذا غير صحيح في الاتجاه المعاكس. فالرقم، عندما يُنسَّق كنص، قد يحتوي مسافات وعلامات ترقيم وأصفاراً بادئة. ويمكن كتابة القيمة الواحدة بطرق كثيرة:</p>
<pre><code>42
042
0042
00042
...
</code></pre>
<p>لا يمكن لقاعدة البيانات معرفة تنسيق الأرقام المستخدم في العمود <code>NUMERIC_STRING</code>، لذا تفعل العكس: تحوّل قاعدة البيانات السلاسل إلى أرقام—وهذا تحويل لا لبس فيه.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-numeric-strings&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>يعيد تعبير <code>CAST AS VARCHAR</code> تمثيلاً نصياً واحداً فقط للرقم. لذا سيطابق أول سلسلة من القائمة أعلاه فقط. وإذا استخدمنا <code>CAST AS INT</code>، فإنه يطابقها جميعاً. ويعني ذلك أنه لا يوجد فرق في الأداء بين الصيغتين فحسب، بل فرق دلالي أيضاً!</p>
<p>استخدام السلاسل الرقمية مشكِل عموماً: فالأهم أنه يسبب مشكلات أداء بسبب التحويل الضمني، كما يطرح خطر الوقوع في أخطاء تحويل بسبب الأرقام غير الصالحة. وحتى أبسط استعلام لا يستخدم أي دوال في عبارة <code>where</code> قد يتوقف بسبب خطأ تحويل إذا كان في الجدول رقم غير صالح واحد فقط.</p>
<h4>نصيحة</h4>
<p>استخدم الأنواع الرقمية لتخزين الأرقام.</p>
<p>لاحظ أن المشكلة لا توجد في الاتجاه المعاكس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> numeric_number <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;42&#x27;</span>
</code></pre>
<p>ستحوّل قاعدة البيانات السلسلة إلى رقم باستمرار. وهي لا تطبّق دالة على العمود القابل للفهرسة: لذا سيعمل الفهرس العادي. ومع ذلك يمكن إجراء تحويل يدوي بالطريقة الخاطئة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> ...
 <span class="hljs-keyword">WHERE</span> TO_CHAR(numeric_number) <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;42&#x27;</span>
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:r};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,r as html,e as slug,p as title};
