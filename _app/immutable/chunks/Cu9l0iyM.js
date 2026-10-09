const e="use-the-index-luke",t="sql-myth-directory-most-selective-first",a="الأكثر انتقائيةً أولاً",n="index",s="الأكثر انتقائية أولاً",r=[],o=`<p>في كل مرة يُنشأ فيها فهرس مركّب، يجب اختيار ترتيب الأعمدة بحكمة. وقد خُصص <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index"><em>الفهارس المُدمجة</em></a> لهذه المسألة.</p>
<p>غير أن هناك خرافة تقول إنه ينبغي دائماً وضع العمود الأكثر انتقائية في الموضع الأول؛ وهذا خطأ محض.</p>
<h4>مهم</h4>
<p>أهم اعتبار عند تعريف فهرس مُدمج هو كيفية اختيار ترتيب الأعمدة بحيث يمكن استخدامه بأكبر قدر ممكن من التكرار.</p>
<p>وبعد ذلك، توجد حتى أسباب لوضع العمود الأقل انتقائية أولاً؛ فتستطيع قاعدة بيانات Oracle مثلاً استخدام <code>INDEX SKIP SCAN</code> في تلك الحالة. لكنها ميزة متقدمة. أما العامل الأهم... أمهلني، هل قلت ذلك من قبل؟</p>
<p>ويرتبط جوهر هذه الخرافة الحقيقي بفهرسة شروط النطاق المستقلة — وهي الحالة الوحيدة التي ينبغي أن تؤثر فيها الانتقائية في تصميم الفهرس (انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-index-merge-performance/index"><em>دمج الفهارس: الجمع بين فهارس متعددة</em></a>).</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=myth-most-selective-first&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>الخرافة راسخة رسوخاً استثنائياً في بيئة SQL Server، بل تظهر حتى في الوثائق الرسمية. والسبب أن SQL Server يحتفظ بمدرج تكراري (histogram) للعمود الأول في الفهرس فقط. لكن هذا يعني أن التوصية ينبغي أن تُصاغ هكذا: «الأعمدة غير المتساوية التوزيع أولاً»، لأن المدرجات التكرارية ليست مفيدة كثيراً للأعمدة المتساوية التوزيع على أي حال.</p>
<p>ولست أول من يحارب هذه الخرافة. وإليك بعض المراجع الإضافية التي تدحضها:</p>
<p>لا تضع تلقائياً الحد الأكثر انتقائية أولاً في فهرس مُدمج.</p>
<p>— Guy Harrison في «<a href="http://guyharrison.squarespace.com/blog/2009/10/5/oracle-performance-survival-guide-available-as-pdf.html">Oracle Performance Survival Guide</a>»</p>
<blockquote>
<p>من الحكايات الخرافية التي كثيراً ما تُقتبس عن الفهارس التوجيهُ بأن «توضع الأعمدة الأكثر انتقائية أولاً». ولم يكن ذلك يوماً قاعدة عملية سليمة (ربما باستثناء ما قبل الإصدار 6.0).— Jonathan Lewis في «<a href="https://jonathanlewis.wordpress.com/2007/02/14/conditional-sql-2/">Oracle Scratchpad</a>»</p>
</blockquote>
<p>لا جدوى من وضع العمود الأكثر انتقائية في الفهرس على اليسار إذا لم تصفِّ عليه إلا استعلامات قليلة جداً. أما الاستعلامات التي لا تصفّي عليه بل تصفّي على أعمدة الفهرس الأخرى فسيكون عليها أن تمسح، والمسح مكلف.</p>
<p>— Gail Shaw في «<a href="https://www.sqlinthewild.co.za/index.php/2009/01/19/index-columns-selectivity-and-equality-predicates/">SQL (Server) in the Wild</a>»</p>
`,i={book:e,chapter:t,chapterTitle:a,slug:n,title:s,headings:r,html:o};export{e as book,t as chapter,a as chapterTitle,i as default,r as headings,o as html,n as slug,s as title};
