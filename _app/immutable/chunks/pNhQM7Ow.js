const e="kinney",t="ai-development-setup",n="تهيئة بيئة التطوير بالذكاء الاصطناعي",s="agentic-coding-patterns",p="أنماط البرمجة الوكيلية (Agentic Coding Patterns)",o=[{depth:2,id:"المشكلات-الأربع",text:"المشكلات الأربع"},{depth:2,id:"كيف-ترتبط-هذه-ببقية-الدورة",text:"كيف ترتبط هذه ببقية الدورة"}],r=`<p>في هذه المرحلة من الدورة، تكون قد رأيت معظم القطع: المهارات، والوكلاء الفرعيون، والخُطّافات، والحلقات، و worktrees. و<strong>النمط (pattern)</strong> طريقة معروفة الجودة لتركيب تلك القطع معًا لحلّ مشكلة تتكرّر. «اجعل وكيلًا ثانيًا يراجع الفرق (diff) دون أن يرى المحادثة» نمط. وكذلك «لا تدع أي مقياس جودة يتراجع أبدًا».</p>
<p>أحتفظ بمكتبة من نحو سبعين نمطًا، ومعظمها تنويعات على مجموعة أصغر بكثير من الأفكار. وهذه الخمسة عشر هي التي كنت سأبقيها لو لم يكن لي أن أبقي سوى خمسة عشر. اخترتها بثلاثة أسئلة: ما مدى شيوع الفشل الذي تمنعه وكلفته، وما مدى رخص تبنّيها، وهل تجعل الأنماط الأخرى تعمل بشكل أفضل؟</p>
<p>كل نمط يقول أيضًا متى <em>لا</em> تستخدمه، وهذا هو النصف الذي أتمنّى لو ضمّته مزيد من الكتابات. فالنمط المطبّق على المشكلة الخاطئة لا يفشل في المساعدة فحسب، بل يضيف طقوسًا، ويحرق الرموز، ويمنحك ثقة زائفة.</p>
<h2 id="المشكلات-الأربع">المشكلات الأربع</h2>
<p>تتجمّع الأنماط حسب المشكلة التي تحلّها.</p>
<table>
<thead>
<tr>
<th>المشكلة</th>
<th>الأنماط</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://stevekinney.com/courses/ai-development-setup/patterns-for-proving-it-works">إثبات أنه يعمل</a></td>
<td>حلقة التحقّق، وحلقة الوكيل المدفوعة بالاختبارات، وسقّاطة الاختبارات، وبوّابة الطفرات، والمراجع بسياق جديد</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/ai-development-setup/patterns-for-deciding-what-to-build">تحديد ما يُبنى</a></td>
<td>ابحث، وخطّط، ونفّذ؛ والمقابلة للوصول إلى مواصفة؛ وتحديد موضع الخلل أولًا</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/ai-development-setup/patterns-for-keeping-context-useful">إبقاء السياق مفيدًا</a></td>
<td>التعليمات كعقد اختبار، وملف التقدّم، والهندسة المركّبة</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/ai-development-setup/patterns-for-running-unattended-work">تشغيل عمل بلا إشراف</a></td>
<td>حلقة Ralph، وقاطع الدارة، والاستقلالية المقيّدة بحاجز بشري، وسرب worktrees المتوازي</td>
</tr>
</tbody>
</table>
<p>إن كنت ستقرأ صفحة واحدة من هذه، فاقرأ الأولى. بحسب تجربتي، أكثر فشل شيوعًا هو أن يقول الوكيل إنه انتهى وهو لم ينتهِ، وتلك المجموعة هي الدفاع.</p>
<h2 id="كيف-ترتبط-هذه-ببقية-الدورة">كيف ترتبط هذه ببقية الدورة</h2>
<p>تحصل معظم هذه الأنماط على معالجة أعمق في مكان آخر من الدورة، ويربط كل نمط إليها حين تريد التهيئة وأنماط الفشل والمثال المشروح.</p>
<p>والنمط أيضًا ليس آلية. «سقّاطة الاختبارات» فكرة. أما إن كنت تفرضها بقاعدة إذن، أو <a href="https://stevekinney.com/courses/ai-development-setup/hooks">خُطّاف</a>، أو فحص CI، فذلك قرار منفصل، و <a href="https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder">سلّم الإلزام</a> يغطّي ذلك الاختيار. ويمكن أن يسكن النمط في <a href="https://stevekinney.com/courses/ai-development-setup/skills">مهارة</a>، أو <a href="https://stevekinney.com/courses/ai-development-setup/subagents">وكيل فرعي</a>، أو سكربت، ويعرض <a href="https://stevekinney.com/courses/ai-development-setup/exemplar-skills">المهارات النموذجية</a> و <a href="https://stevekinney.com/courses/ai-development-setup/exemplar-subagents">الوكلاء الفرعيون النموذجيون</a> نسخًا ملموسة لعدد منها.</p>
<p>لا تتبنَّ الخمسة عشر كلها دفعة واحدة. اختر النمط المناسب للفشل الذي تصادفه أكثر من غيره هذا الأسبوع، وأضِف التالي حين تصادف الفشل التالي.</p>
`,a={book:e,chapter:t,chapterTitle:n,slug:s,title:p,headings:o,html:r};export{e as book,t as chapter,n as chapterTitle,a as default,o as headings,r as html,s as slug,p as title};
