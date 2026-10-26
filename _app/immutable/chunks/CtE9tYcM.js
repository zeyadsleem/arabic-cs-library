const n="kinney",t="figma",o="Figma للمطوّرين",e="cropped-grid-components",s="مكوّنات الشبكة المقصوصة",c=[],i=`<p>كما تعلّمنا مع <a href="https://stevekinney.com/courses/figma/components">المكوّنات</a> وتعمّقنا قليلًا في <a href="https://stevekinney.com/courses/figma/placeholder-components">مكوّنات حجز المكان</a>، لا يمكن للمكوّنات أن تستقبل أبناءً مُدرَجين في فتحات، لكن يمكننا إجراء استبدال واحد لواحد. لكن ماذا لو أردنا تبديل أكثر من مكوّن واحد؟ من الحيّل التي يمكننا استخدامها ما يُسمّى <strong>مكوّنات الشبكة المقصوصة</strong>.</p>
<blockquote>
<p><strong>باختصار</strong></p>
<p>الخلاصة أن مكوّن الشبكة المقصوصة مجرّد مكوّن يحمل أكثر من نسخة من المكوّن نفسه، ثم نجعله بحجم يكفي فقط لعرض العدد الذي نحتاجه، مع <strong>قصّ</strong> الباقي.</p>
<p>نعم، يبدو حيلة، لكنه <a href="https://www.figma.com/best-practices/component-architecture/#setting-up-the-cropped-grid-components">أمر معتمد رسميًا</a>. أنا لا أضع القواعد هنا.</p>
</blockquote>
<p>سنُعِدّ إطارًا ليكون مكوّن قائمة المهام لدينا. ثم نملؤه بعناصر أكثر — في هذه الحالة، مكوّن <strong>Checklist Item</strong> الذي أنشأناه في <a href="https://stevekinney.com/courses/figma/building-a-checkbox-component">القسم السابق</a> — مما نحتاجه.</p>
<ol>
<li>أنشئ إطارًا فارغًا.</li>
<li>اسحب مكوّن <strong>Checklist Item</strong> واحدًا إلى داخله.</li>
<li>كرّره عدة مرات.</li>
<li>اضبط القيود بحيث يتحرّك مع أعلى الإطار الأب ثم مع وسطه.</li>
</ol>
`,p={book:n,chapter:t,chapterTitle:o,slug:e,title:s,headings:c,html:i};export{n as book,t as chapter,o as chapterTitle,p as default,c as headings,i as html,e as slug,s as title};
