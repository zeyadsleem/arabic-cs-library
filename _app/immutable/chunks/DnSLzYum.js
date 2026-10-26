const n="kinney",e="ai-development",t="التطوير بأدوات الذكاء الاصطناعي",s="cursor-notepads",o="ترحيل الدفتر (Notepads)",r=[{depth:2,id:"أين-ينبغي-أن-يذهب-محتوى-الدفتر-الآن",text:"أين ينبغي أن يذهب محتوى الدفتر الآن"},{depth:2,id:"مثال-ترحيل",text:"مثال ترحيل"},{depth:2,id:"ما-لا-يجب-ترحيله",text:"ما لا يجب ترحيله"}],p=`<p>أُهملت <a href="https://forum.cursor.com/t/deprecating-notepads-in-cursor/138305">دفاتر Cursor</a> من Cursor في 2025. لا تُدخل الدفاتر في سير عمل حالي. وإذا وجدت واحدًا في دورة أقدم أو عملية فريق أو إعداد شخصي، فرحّل المحتوى إلى مصدر دائم يطابق طريقة استخدام المعلومة.</p>
<p>تُبقي هذه الصفحة المسار القديم حيًّا لأن الروابط الخارجية قد لا تزال تشير هنا. والدرس الحالي هو الترحيل، لا الاستخدام.</p>
<h2 id="أين-ينبغي-أن-يذهب-محتوى-الدفتر-الآن">أين ينبغي أن يذهب محتوى الدفتر الآن</h2>
<p>استخدم هذا التعيين:</p>
<ul>
<li>الإرشاد السلوكي المتكرر يصير قاعدة مشروع في <code>.cursor/rules/*.mdc</code>.</li>
<li>سير العمل متعدد الخطوات يصير مهارة في <code>.cursor/skills/&lt;name&gt;/SKILL.md</code>.</li>
<li>التفضيلات الشخصية التي لا ينبغي أن تسكن في المستودع تصير ذكريات Cursor أو قواعد مستخدم.</li>
<li>الشروح الطويلة وملاحظات المعمارية ومواد الإعداد تصير ملفات Markdown عادية في المستودع.</li>
<li>سياسة الفريق بأكملها تنتمي إلى قواعد الفريق أو توثيق مملوك للمستودع.</li>
</ul>
<p>العادة القديمة كانت «احزم كل ما أحتاجه لاحقًا». والعادة الحالية ينبغي أن تكون «ضع المعلومة حيث تكون الملكية والمراجعة واضحتين».</p>
<h2 id="مثال-ترحيل">مثال ترحيل</h2>
<p>قد يحتوي دفتر قديم على هذا:</p>
<pre><code>When editing API routes, use zod validation, return typed errors, update tests,
and run bun test:unit.
</code></pre>
<p>ينبغي أن يصير قاعدة مشروع مُنطَّقة:</p>
<pre><code class="language-markdown">---
description: API route testing and validation expectations.
globs:
<span class="hljs-bullet">  -</span> &#x27;src/routes/api/<span class="hljs-strong">**/<span class="hljs-emphasis">*.ts&#x27;
alwaysApply: false
---

When editing API routes, validate inputs at the boundary, return the existing
typed error shape, update the closest regression test, and run the targeted unit
test command before reporting completion.
</span></span></code></pre>
<p>وإذا تضمّن الدفتر أيضًا قائمة تحقق للإصدار، فانقل تلك القائمة إلى مهارة بدلًا من إطالة القاعدة.</p>
<h2 id="ما-لا-يجب-ترحيله">ما لا يجب ترحيله</h2>
<p>لا تحافظ على محتوى دفتر بائد لمجرد أنه كان موجودًا. احذف الطلبات المؤقتة، وتوصيات النماذج القديمة، والتوثيق المنسوخ، والملاحظات التي لم تعد تطابق المستودع. فترحيل السياق السيّئ يمنحه مجلدًا جديدًا فقط.</p>
`,a={book:n,chapter:e,chapterTitle:t,slug:s,title:o,headings:r,html:p};export{n as book,e as chapter,t as chapterTitle,a as default,r as headings,p as html,s as slug,o as title};
