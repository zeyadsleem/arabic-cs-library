const t="ahastack",n="html-first",p="HTML أولاً",c="index",s="HTML أولاً",a=[],e=`<p>أحد المفاهيم الأساسية في حزمة AHA (AHA Stack) هو «HTML أولًا» (HTML first).</p>
<p>يردّ الخادم على الطلب الأوّلي بصفحة HTML كاملة، مع DOCTYPE و <code>و</code> و \`\` وكل ما يلزم.</p>
<p>قد يكون ذلك HTML مولَّدًا مسبقًا ومُخزَّنًا في الذاكرة المؤقتة (cached)، أو مولَّدًا ديناميكيًا لحظة الطلب، فالأمر لا يهمّ.</p>
<p>يتلقّى المتصفّح هذا HTML ويصيّره. هذه مهمّة المتصفّح، وهو سريع وفعّال جدًّا فيها.</p>
<p>حين تطلب واجهة المستخدم (User Interface) أن تُحدَّث ديناميكيًا، مثلًا حين ينقر المستخدم على زرّ «تحميل المزيد» من العناصر في قائمة، يمكن للخادم أن يردّ بـ <strong>جزء HTML جزئي</strong> (HTML partial)، أي مجرّد بعض الأجزاء من HTML التي يحتاجها المتصفّح.</p>
<p>htmx تتكفّل بإضافة هذا HTML الجديد إلى الصفحة.</p>
<p>هذا هو النموذج الذهني فائق البساطة لمفهوم «HTML أولًا».</p>
<p>إنه كلّه HTML فحسب.</p>
<p>وCSS بالطبع.</p>
<p>وبعض رشّات JavaScript للتفاعلية في جهة العميل (client-side interactivity) عند الحاجة.</p>
<p>لكن في جوهر الأمر، نُرسِل HTML إلى المتصفّح، لا صيغ JSON أو غيرها من صيغ البيانات التي يحتاج المتصفّح إلى تفسيرها.</p>
`,H={book:t,chapter:n,chapterTitle:p,slug:c,title:s,headings:a,html:e};export{t as book,n as chapter,p as chapterTitle,H as default,a as headings,e as html,c as slug,s as title};
