const e="kinney",n="openclaw",t="OpenClaw: مساعدك الذكي الشخصي",o="demonstrating-openclaw-memory",a="عرض توضيحي لذاكرة OpenClaw",r=[{depth:2,id:"الخطوة-1-اطلب-من-openclaw-أن-يتذكر-شيئا",text:"الخطوة 1: اطلب من OpenClaw أن يتذكّر شيئًا"},{depth:2,id:"الخطوة-2-تحقق-من-كتابة-الذاكرة",text:"الخطوة 2: تحقّق من كتابة الذاكرة"},{depth:2,id:"الخطوة-3-ابدأ-جلسة-جديدة-تماما",text:"الخطوة 3: ابدأ جلسة جديدة تمامًا"},{depth:2,id:"الخطوة-4-اختبر-الاسترجاع-الدلالي-من-الذاكرة",text:"الخطوة 4: اختبر الاسترجاع الدلالي من الذاكرة"},{depth:2,id:"الخطوة-5-افحص-الذاكرة-بشكل-مستقل",text:"الخطوة 5: افحص الذاكرة بشكل مستقل"},{depth:2,id:"ما-الذي-يعد-نجاحا",text:"ما الذي يُعدّ نجاحًا؟"}],i=`<p>إليك عرضًا توضيحيًا بسيطًا للذاكرة الدائمة في OpenClaw. والهدف هو تعليمه شيئًا في جلسة واحدة، والتحقّق من أنه حفظ المعلومة، ثم اختبار ما إذا كان يتذكّرها في جلسة جديدة تمامًا.</p>
<h2 id="الخطوة-1-اطلب-من-openclaw-أن-يتذكر-شيئا">الخطوة 1: اطلب من OpenClaw أن يتذكّر شيئًا</h2>
<p>الصق هذا في دردشة OpenClaw:</p>
<pre><code>I want to test your long-term memory.

Please remember the following information about me:

- My favorite fictional project is called Project Magpie.
- Project Magpie is a personal knowledge management application.
- Its technology stack is SvelteKit, TypeScript, Bun, and Neon Postgres.
- My favorite color for Project Magpie is burnt orange.
- I strongly prefer descriptive variable names over abbreviations.

Store this as durable memory so you can recall it in future sessions, not just from our current conversation.

After saving it, tell me:

1. Which memory file you updated.
2. What information you stored.

3. How you verified that the information was written successfully.
</code></pre>
<p>يمنحنا المشروع الخيالي اختبارًا سهل التمييز دون خلط معلومات تجريبية في تفضيلاتك الحقيقية.</p>
<h2 id="الخطوة-2-تحقق-من-كتابة-الذاكرة">الخطوة 2: تحقّق من كتابة الذاكرة</h2>
<p>لا تقبل «سأتذكّر ذلك» دليلًا. فالنماذج اللغوية بارعة بشكل استثنائي في الإبلاغ بثقة عن إنجازها أمورًا.</p>
<p>الصق هذا بعد ذلك:</p>
<pre><code>Verify that you actually persisted the Project Magpie information.

Read the relevant memory file from disk using your available tools.

Show me the exact Markdown content containing the Project Magpie information and the full path of the file.

Do not answer based solely on our conversation history. If you cannot access or verify the file, say so explicitly.
</code></pre>
<p><img src="/arabic-cs-library/images/kinney/870406528fe37a06.webp" alt="دردشة Control UI تُظهر الوكيل وهو يقرأ MEMORY.md من القرص بعد طلب Project Magpie"></p>
<p>حسب تهيئة وكيلك، قد يخزّن المعلومة في <code>MEMORY.md</code>، أو في ملف Markdown بتاريخ ضمن <code>memory/</code>، أو في خلفية ذاكرة أخرى مُهيّأة.</p>
<h2 id="الخطوة-3-ابدأ-جلسة-جديدة-تماما">الخطوة 3: ابدأ جلسة جديدة تمامًا</h2>
<p>في OpenClaw، اكتب:</p>
<pre><code>/new
</code></pre>
<p>في Control UI، يؤدي كتابة <code>/</code> إلى فتح قائمة أوامر، ويظهر <code>/new</code> تحت Session كأمر يبدأ جلسة جديدة.</p>
<p><img src="/arabic-cs-library/images/kinney/6389b3017b76a662.webp" alt="قائمة أوامر الشرطة المائلة في محرّر Control UI مع إبراز الأمر new"></p>
<p>يبدأ هذا جلسة جديدة دون السياق النشط للمحادثة السابقة.</p>
<p>الآن اسأل:</p>
<pre><code>I'm starting a new conversation and want to check your long-term memory.

What do you remember about Project Magpie?

Specifically:
- What kind of application is it?
- What technology stack does it use?
- What color did I choose?
- What naming conventions do I prefer?

Use your persistent memory, not previous conversation history. Tell me which memory sources you used.
</code></pre>
<p>ينبغي للاستجابة الناجحة أن تحدّد التفاصيل الأربعة كلها بشكل صحيح دون الحاجة إلى المحادثة الأصلية.</p>
<p><img src="/arabic-cs-library/images/kinney/5c2c085666a78303.webp" alt="جلسة جديدة تجيب عن أسئلة Project Magpie وتسمّي MEMORY.md وUSER.md كمصدرين لها"></p>
<h2 id="الخطوة-4-اختبر-الاسترجاع-الدلالي-من-الذاكرة">الخطوة 4: اختبر الاسترجاع الدلالي من الذاكرة</h2>
<p>هذا هو الاختبار الأكثر إثارة للاهتمام لأنه يفحص ما إذا كان OpenClaw قادرًا على استرجاع المعلومة حين يستخدم سؤالك صياغة مختلفة.</p>
<pre><code>I'm considering restarting that fictional personal knowledge management application we discussed previously.

What technical choices and visual preferences had I settled on?

Search your persistent memory for relevant information. Don't guess if you can't find it.
</code></pre>
<p>من الناحية المثالية، ينبغي أن يستعيد اسم المشروع والحزمة التقنية وتفضيل اللون البرتقالي المحروق.</p>
<p>يمكن لـ <code>memory_search</code> في OpenClaw استرجاع الذكريات ذات الصلة دلاليًا، بينما يمكن لـ <code>memory_get</code> قراءة محتواها الأصلي.</p>
<h2 id="الخطوة-5-افحص-الذاكرة-بشكل-مستقل">الخطوة 5: افحص الذاكرة بشكل مستقل</h2>
<p>إذا كان لديك وصول طرفية إلى الجهاز الذي يستضيف OpenClaw، فافحص الملفات الأساسية:</p>
<pre><code class="language-bash"><span class="hljs-built_in">cat</span> ~/.openclaw/workspace/MEMORY.md
<span class="hljs-built_in">cat</span> ~/.openclaw/workspace/USER.md
grep -Rni <span class="hljs-string">&quot;Project Magpie&quot;</span> ~/.openclaw/workspace/memory/
</code></pre>
<p>تفترض هذه المسارات مساحة العمل الافتراضية للوكيل. وإذا كان وكيلك يستخدم مساحة عمل مخصّصة، فاستبدل ذلك الموقع.</p>
<h2 id="ما-الذي-يعد-نجاحا">ما الذي يُعدّ نجاحًا؟</h2>
<table>
<thead>
<tr>
<th>الاختبار</th>
<th>النتيجة المتوقعة</th>
</tr>
</thead>
<tbody>
<tr>
<td>طلب الذاكرة الأولي</td>
<td>يكتب الوكيل المعلومة إلى القرص</td>
</tr>
<tr>
<td>التحقّق من الملف</td>
<td>المعلومة موجودة في ملف ذاكرة</td>
</tr>
<tr>
<td>التذكّر في جلسة جديدة</td>
<td>يستدعي الوكيل المشروع بشكل صحيح</td>
</tr>
<tr>
<td>الاسترجاع الدلالي</td>
<td>يستدعي الوكيل التفاصيل دون كلمات مفتاحية مطابقة</td>
</tr>
<tr>
<td>التحقّق من المصدر</td>
<td>يحدّد الوكيل ملف الذاكرة الذي استخدمه</td>
</tr>
</tbody>
</table>
<p>وملاحظة واحدة: قد تُحمّل الجلسة الجديدة الذاكرة طويلة المدى تلقائيًا. وهذا هو السلوك المقصود، لا اختبار فاشل. والمقصود أن المعلومة تأتي من تخزين دائم لا من السياق النشط للمحادثة السابقة.</p>
<p>وأفضل دليل هو الجمع بين كتابة مُتحقَّق منها على القرص واستدعاء ناجح بعد <code>/new</code>. وأي منهما وحده دليل أضعف.</p>
<p>تصف وثائق OpenClaw الحالية هذا النهج المدعوم بالملفات في نظرة عامة الذاكرة.</p>
`,p={book:e,chapter:n,chapterTitle:t,slug:o,title:a,headings:r,html:i};export{e as book,n as chapter,t as chapterTitle,p as default,r as headings,i as html,o as slug,a as title};
