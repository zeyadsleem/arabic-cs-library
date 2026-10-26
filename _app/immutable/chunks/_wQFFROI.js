const o="kinney",t="storybook",e="بناء أنظمة التصميم في Storybook",n="parameters",s="المعاملات (Parameters)",r=[],c=`<p>المعاملات مجموعة من البيانات الوصفية الثابتة المسمّاة عن قصة، تُستخدم للتحكم في سلوك أو مظهر المكوّنات داخل Storybook. ويمكن تعيينها عالميًا لتؤثر في كل القصص أو محليًا لتؤثر في قصص فردية.</p>
<p>لا تفعل Storybook الكثير بالمعاملات جاهزة، لكنها مفيدة بشكل خاص عند العمل مع الملحقات. ويمكنك تعريف المعاملات في جملة مستويات مختلفة:</p>
<ul>
<li><code>.storybook/preview.ts</code>: هذه المعاملات متاحة عالميًا لكل القصص.</li>
<li>في <code>Meta</code> لمجموعة قصص.</li>
<li>مقصوصة على قصة بعينها.</li>
</ul>
<p>وعلى طول الطريق، تُدمج كائنات المعاملات، فترث قصصك الفردية المعاملات المعرَّفة في مستوى أعلى، لكنها تستطيع أيضًا تجاوزها عند الحاجة.</p>
<p>والجزء المهم هنا أن المعاملات يستطيع <a href="https://stevekinney.com/courses/storybook/decorators">المزيّنات</a> الوصول إليها، ويمكن التحكم بها باستخدام الملحقات. وهذا يتيح قدرًا كبيرًا من المرونة لإضافة وظائف مخصّصة للتحكم في قصصك.</p>
`,a={book:o,chapter:t,chapterTitle:e,slug:n,title:s,headings:r,html:c};export{o as book,t as chapter,e as chapterTitle,a as default,r as headings,c as html,n as slug,s as title};
