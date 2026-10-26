const n="kinney",e="ai-development",t="التطوير بأدوات الذكاء الاصطناعي",i="cursor-background-agents",o="وكلاء السحابة",r=[{depth:2,id:"ما-الذي-تتضمنه-البيئة-السحابية",text:"ما الذي تتضمنه البيئة السحابية"},{depth:2,id:"شكل-الطلب",text:"شكل الطلب"},{depth:2,id:"التسليم-مرة-أخرى-إلى-المحرر",text:"التسليم مرة أخرى إلى المحرّر"}],s=`<p><a href="https://cursor.com/docs/cloud-agent">وكلاء سحابة Cursor</a> هم الشكل الحالي لما كانت المواد الأقدم تسمّيه وكلاء الخلفية (Background Agents). يعملون في بيئات سحابية معزولة، ويستنسخون المستودع، وينشئون فرعهم الخاص، ويستطيعون مواصلة العمل بينما تستخدم المحرّر لشيء آخر.</p>
<p>وكلاء السحابة مفيدون عندما تكون المهمة واضحة بما يكفي لتشغيلها بعيدًا عن جهازك المحلي. وهم غير مناسبين لقرارات المنتج الغامضة أو للعمل الذي يحتاج تغذية راجعة مستمرة على مستوى الذوق.</p>
<h2 id="ما-الذي-تتضمنه-البيئة-السحابية">ما الذي تتضمنه البيئة السحابية</h2>
<p>يستطيع وكيل السحابة استخدام:</p>
<ul>
<li>مستودع مستنسخ من مزوّد تحكم بالإصدارات مدعوم.</li>
<li>اعتماديات مثبَّتة وأوامر تهيئة.</li>
<li>أسرار تقدّمها صراحةً.</li>
<li>خوادم MCP مهيّأة للبيئة.</li>
<li>خطّافات قائمة على الأوامر.</li>
<li>المتصفح والطرفية ولقطات الشاشة والفيديو والسجلات وغيرها من المخرجات.</li>
</ul>
<p>يمكن أن تسكن تهيئة البيئة في <code>.cursor/environment.json</code>. أبقِها مملّة. فالبيئة القابلة للتكرار تتفوق على الطلب الذكي في كل مرة.</p>
<h2 id="شكل-الطلب">شكل الطلب</h2>
<p>استخدم طلبات سحابية تحدّد النطاق والتحقق وشروط التوقف:</p>
<pre><code>Update the invite-token validation path only.

Acceptance criteria:
- Expired tokens return the same public error shape as revoked tokens.
- A regression test fails before the implementation and passes afterward.
- Run bun test:unit -- src/lib/server/invitations.test.ts and bun run lint.

Stop and report the blocker if dependency installation fails or if an unrelated
test failure appears.
</code></pre>
<p>يمكن الحكم على هذا الطلب من فرق الفرع ومخرَج الأوامر. أما «حسّن تدفق المصادقة» فلا يمكن.</p>
<h2 id="التسليم-مرة-أخرى-إلى-المحرر">التسليم مرة أخرى إلى المحرّر</h2>
<p>افحص فرع وكيل السحابة قبل الدمج أو المتابعة محليًا. راجع الفرق والمخرجات ومخرَج الأوامر وأي طلب سحب منشأ. وإذا تابعت محليًا، فعامل الفرع كعمل غير موثوق من مطوّر آخر: شغّل الاختبارات مرة أخرى واقرأ الملفات المتغيّرة.</p>
<p>وكلاء السحابة سطح تنفيذ. وهم لا يعفونك من مسؤولية المراجعة.</p>
`,a={book:n,chapter:e,chapterTitle:t,slug:i,title:o,headings:r,html:s};export{n as book,e as chapter,t as chapterTitle,a as default,r as headings,s as html,i as slug,o as title};
