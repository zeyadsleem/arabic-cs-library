const e="kinney",t="ai-development",n="التطوير بأدوات الذكاء الاصطناعي",o="interacting-with-cursor",i="التفاعل مع Cursor",d=[{depth:2,id:"التحرير-المضمن",text:"التحرير المضمّن"},{depth:2,id:"المحادثة",text:"المحادثة"},{depth:2,id:"وضع-الوكيل",text:"وضع الوكيل"},{depth:2,id:"وضعا-الخطة-والسؤال",text:"وضعا الخطة والسؤال"},{depth:2,id:"سير-العمل-السحابي-والطرفي",text:"سير العمل السحابي والطرفي"}],p=`<p>يمنحك <a href="https://cursor.com/">Cursor</a> عدة أسطح تفاعل. وهي ليست واجهات مختلفة للطلب نفسه، بل لكل منها نطاق تأثير مختلف.</p>
<h2 id="التحرير-المضمن">التحرير المضمّن</h2>
<p>استخدم التحرير المضمّن لإجراء تغييرات دقيقة على شيفرة محدّدة. حدّد الشيفرة المعنية، واضغط <code>Cmd+K</code> أو <code>Ctrl+K</code>، واطلب التغيير الذي تريده. هذه هي الأداة الصحيحة عندما يروي الملف المحيط القصة بالفعل.</p>
<p>الطلبات المضمّنة الجيدة ضيقة النطاق:</p>
<pre><code>Convert this function to return a discriminated union.
Do not change the call sites.
</code></pre>
<p>وإذا احتاج الطلب البحث في المستودع أو الاختبارات أو عدة ملفات، فانتقل إلى الوكيل.</p>
<h2 id="المحادثة">المحادثة</h2>
<p>المحادثة مفيدة للأسئلة وتصحيح الأخطاء والنقاش التصميمي. ويستطيع Cursor استخدام الملفات المفتوحة، والشيفرة المحدّدة، والملفات المذكورة، ومراجع التوثيق، والصور، وسياق الويب. واطلب الاستشهادات عندما تحتاج إلى فهم مصدر الإجابة.</p>
<pre><code>Explain how authentication is wired in this project.
Use file references and do not propose changes yet.
</code></pre>
<p>استخدم المحادثة عندما تكون أفضل خطوة تالية هي الفهم. واستخدم الوكيل عندما تكون أفضل خطوة تالية هي تغيير الشيفرة.</p>
<h2 id="وضع-الوكيل">وضع الوكيل</h2>
<p>يُفتح وضع الوكيل من اللوحة الجانبية بـ <code>Cmd+I</code> أو <code>Ctrl+I</code>. ويستطيع البحث في المستودع، وقراءة الملفات، وتعديل الملفات، وتشغيل أوامر الصدفة، واستخدام أدوات MCP المضبوطة، وفتح متصفح، وطرح أسئلة توضيحية بينما يواصل العمل الذي يستطيع أداءه بالفعل.</p>
<p>امنح الوكيل خط نهاية قابلًا للتحقق:</p>
<pre><code>Add validation for invalid invite tokens.
Write the failing test first, implement the fix, then run the targeted test and
the repository lint command. Stop if either command fails for an unrelated reason.
</code></pre>
<p>ينشئ Cursor نقاط استعادة أثناء عمل الوكيل، فيمكنك فحص دور سيّئ أو التراجع عنه. ونقاط الاستعادة ميزة تعافٍ، وليست بديلًا عن مراجعة الفروقات.</p>
<h2 id="وضعا-الخطة-والسؤال">وضعا الخطة والسؤال</h2>
<p>وضع الخطة للبحث قبل التعديلات، ووضع السؤال للإجابات دون إجراء. استخدم وضع الخطة عندما يكون للطلب عدة تصاميم معقولة، أو ملفات مجهولة، أو آثار أمنية.</p>
<p>طلب الخطة المفيد يسمّي القرار الذي تحتاجه:</p>
<pre><code>Plan the smallest change that adds Slack notifications to failed imports.
Compare the two likely implementation paths and list the files each path touches.
Do not edit files.
</code></pre>
<h2 id="سير-العمل-السحابي-والطرفي">سير العمل السحابي والطرفي</h2>
<p>تعمل الوكلاء السحابيون في بيئات سحابية معزولة، وهم مفيدون للمهام التي يمكن أن تستمر بعيدًا عن حاسوبك المحمول. وتشغّل الأتمتات الوكلاء السحابيين وفق جداول وأحداث. وتفيد واجهة سطر الأوامر <code>agent</code> في المراجعة الأصلية للطرفية، والنصوص البرمجية، والجلسات البعيدة.</p>
<p>هذه الأسطح قوية لأنها تستطيع التصرّف بينما لا تحدّق في المحرّر. وهذا أيضًا هو الخطر. وفي العمل السحابي أو الطرفي، اجعل الصلاحيات وأوامر التحقق وإشارات الفشل صريحة في الطلب.</p>
`,r={book:e,chapter:t,chapterTitle:n,slug:o,title:i,headings:d,html:p};export{e as book,t as chapter,n as chapterTitle,r as default,d as headings,p as html,o as slug,i as title};
