const e="use-the-index-luke",t="sql-testing-scalability",a="الأداء وقابلية التوسّع",n="index",i="الأداء وقابلية التوسع",s=[{depth:2,id:"المحتويات",text:"المحتويات"}],l=`<p>يتناول هذا الفصل أداء قواعد البيانات وقابليتها للتوسع.</p>
<p>وفي هذا السياق، أستخدم التعريف التالي لقابلية التوسع:</p>
<pre><code>Scalability is the ability of a system, network, or process,
to handle a growing amount of work in a capable manner
or
its ability to be enlarged to accommodate that growth.
</code></pre>
<p>— <a href="https://en.wikipedia.org/wiki/Scalability">Wikipedia</a></p>
<p>ترى أن هناك في الواقع تعريفين: الأول عن آثار الحِمل المتنامي على النظام، والثاني عن توسيع النظام للتعامل مع حِمل أكبر.</p>
<p>ويحظى التعريف الثاني بشعبية أكبر بكثير من الأول؛ فكلما تحدث أحدهم عن قابلية التوسع، كان الحديث دائماً تقريباً عن استخدام عتاد أكثر. و<em>التوسع الرأسي</em> و<em>التوسع الأفقي</em> هما الكلمتان المفتاحيتان المعنيتان، وقد أكملتهما حديثاً عبارات رنّانة جديدة مثل <em>النطاق الشبكي (web-scale)</em>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ch-scalability&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وعلى وجه العموم، تتعلق قابلية التوسع بأثر التغيرات البيئية في الأداء. والعتاد ليس سوى معامل بيئي واحد يمكن أن يتغير؛ ويتناول هذا الفصل معاملات أخرى مثل حجم البيانات وحِمل النظام أيضاً.</p>
<h2 id="المحتويات">المحتويات</h2>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-data-volume/index">حجم البيانات</a></em> — الفهرسة المتهاونة تعضّ من جديد</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-system-load/index">حِمل النظام</a></em> — حِمل الإنتاج يؤثر في زمن الاستجابة</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-response-time-throughput-scaling-horizontal/index">زمن الاستجابة والإنتاجية</a></em> — قابلية التوسع الأفقي</li>
</ol>
`,o={book:e,chapter:t,chapterTitle:a,slug:n,title:i,headings:s,html:l};export{e as book,t as chapter,a as chapterTitle,o as default,s as headings,l as html,n as slug,i as title};
