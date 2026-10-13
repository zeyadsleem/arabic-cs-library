const t="better-auth",e="concepts",s="المفاهيم",a="database",n="قاعدة البيانات",o=[{depth:2,id:"المحولات",text:"المحوّلات"},{depth:2,id:"cli",text:"CLI"},{depth:3,id:"تشغيل-الترحيلات",text:"تشغيل الترحيلات"}],c=`<h1>قاعدة البيانات (/docs/concepts/database)</h1>
<p>تعرّف على محوّلات قواعد البيانات، والترحيلات، والتخزين الثانوي باستخدام Redis، والمخطط الأساسي (user وsession وaccount وverification)، والجداول المخصّصة، وتوسيع المخططات، وتوليد المعرّفات، وخطافات قاعدة البيانات، ومخططات الإضافات.</p>
<h2 id="المحولات">المحوّلات</h2>
<p>يتصل Better Auth بقاعدة بيانات لتخزين البيانات. ستُستخدم قاعدة البيانات لتخزين بيانات مثل المستخدمين والجلسات وغيرها. كما يمكن للإضافات تعريف جداول قاعدة بيانات خاصة بها لتخزين البيانات.</p>
<p>يمكنك تمرير اتصال قاعدة بيانات إلى Better Auth عبر تمرير مثيل قاعدة بيانات مدعوم في خيارات database. يمكنك التعرّف على المزيد حول محوّلات قواعد البيانات المدعومة في وثائق <a href="https://better-auth.com/docs/adapters/other-relational-databases">Other relational databases</a>.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>يعمل Better Auth أيضًا دون أي قاعدة بيانات. لمزيد من التفاصيل، راجع <a href="https://better-auth.com/docs/concepts/session-management#stateless-session-management">Stateless Session Management</a>.</p>
</div>
<h2 id="cli">CLI</h2>
<p>يأتي Better Auth مزوّدًا بأداة CLI لإدارة ترحيلات قاعدة البيانات وتوليد المخطط.</p>
<h3 id="تشغيل-الترحيلات">تشغيل الترحيلات</h3>
<p>تفحص CLI قاعدة بياناتك وتطالبك بإضافة الجداول المفقودة أو تحديث الجداول الموجودة بأعمدة جديدة. هذا مدعوم فقط لمحوّل Kysely المدمج. بالنسبة إلى المحوّلات الأخرى، يمكنك استخدام الأمر <code>generate</code> لإنشاء المخطط ومعالجة الترحيل عبر ORM لديك.</p>
`,h={book:t,chapter:e,chapterTitle:s,slug:a,title:n,headings:o,html:c};export{t as book,e as chapter,s as chapterTitle,h as default,o as headings,c as html,a as slug,n as title};
