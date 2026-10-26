const t="kinney",e="full-stack-typescript",n="TypeScript للويب الكامل",c="what-is-trpc",o="ما هو tRPC؟",p=[{depth:2,id:"بنية-المشروع",text:"بنية المشروع"}],r=`<p>يمنحك tRPC (استدعاء الإجراء عن بُعد في TypeScript، TypeScript Remote Procedure Call) ما يلي:</p>
<ul>
<li><strong>استنتاج الأنواع في العميل والخادم.</strong> تُغيّر اسم حقل على الخادم، فيتعطّل العميل عند التصريف. إنه حلم أي مطوّر (أو حلم مطوّر كسول، حسب وجهة نظرك).</li>
<li><strong>بلا توليد شيفرة.</strong> لا يلزمك كتابة مخطط REST أو GraphQL منفصل ثم توليد أنواع العميل. كل شيء في الشيفرة، بفضل TypeScript وقوة tRPC.</li>
<li><strong>شيفرة متكررة أقل</strong> (مقارنةً بمزيج «مخطط API + خادم + عميل» المعتاد).</li>
</ul>
<p>في المجمل، يحوّل tRPC مشهد «عذرًا، غيّر الخادم اسم الحقل من <code>name</code> إلى <code>fullName</code> ونسينا تحديث العميل» المؤلم إلى خطأ فوري عند التصريف. الأمر أشبه بزميل ودود شديد اليقظة لا ينام أبدًا.</p>
<h2 id="بنية-المشروع">بنية المشروع</h2>
<p>النهج المعتاد هو أسلوب «المستودع الأحادي» (monorepo) بالشكل:</p>
<pre><code class="language-typescript">root/
 ┣ server/
 ┗ client/
</code></pre>
<p>سنضع خادم tRPC القائم على Express في <code>server/</code>، وأي شيفرة عميل في <code>client/</code>. وسيتشاركان الأنواع فنحصل على سلامة الأنواع من الطرف إلى الطرف.</p>
`,s={book:t,chapter:e,chapterTitle:n,slug:c,title:o,headings:p,html:r};export{t as book,e as chapter,n as chapterTitle,s as default,p as headings,r as html,c as slug,o as title};
