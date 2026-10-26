const e="kinney",n="self-testing-ai-agents",t="وكلاء ذكاء اصطناعي يختبرون أنفسهم",o="bugbot-on-a-planted-bug-solution",i="الحل",s=[{depth:2,id:"ما-الذي-تضيفه",text:"ما الذي تضيفه"},{depth:3,id:"ملف-الإعداد",text:"ملف الإعداد"},{depth:3,id:"العلة-المزروعة",text:"العلّة المزروعة"},{depth:2,id:"ما-الذي-ما-زال-عليك-تشغيله",text:"ما الذي ما زال عليك تشغيله"},{depth:3,id:"التشعب-والتركيب",text:"التشعّب والتركيب"},{depth:3,id:"الدفع-وفتح-طلب-السحب",text:"الدفع وفتح طلب السحب"},{depth:3,id:"المراقبة",text:"المراقبة"},{depth:3,id:"سلمها-إلى-الوكيل",text:"سلّمها إلى الوكيل"},{depth:2,id:"المسلم-مقابل-الفجوة",text:"المُسلَّم مقابل الفجوة"},{depth:2,id:"أنماط-تأخذها-معك",text:"أنماط تأخذها معك"},{depth:2,id:"قراءة-إضافية",text:"قراءة إضافية"}],d=`<p>هذا مخبر هجين. جزء منه تأليف محلي داخل المستودع، والبقية — تركيب Bugbot، وإنشاء طلب السحب، وتعليق المراجعة نفسه — تتطلّب نسخة متشعّبة (fork) على GitHub وحسابًا على Cursor. سأمضي في النصفين وأكون صريحًا بشأن موضع الحدّ بينهما.</p>
<h2 id="ما-الذي-تضيفه">ما الذي تضيفه</h2>
<h3 id="ملف-الإعداد">ملف الإعداد</h3>
<p>افتح <code>.cursor/BUGBOT.md</code>. يحتوي ثلاثة أقسام.</p>
<p><strong>السياق</strong> يسمّي المكدّس في جملة واحدة: SvelteKit + TypeScript + Drizzle + SQLite. ويسمّي أدوات تشغيل الاختبارات (Vitest وPlaywright)، ويشير إلى مساعدات التخويل في <code>src/lib/server/authorization.ts</code>. هذا هو نوع التأصيل نفسه الذي قمنا به في <code>CLAUDE.md</code> — أخبر المراجع بما ينظر إليه حتى لا يضطر إلى التخمين.</p>
<p><strong>ما الذي يُبلَّغ عنه</strong> يسرد سبع فئات، كل واحدة تسمّي نمطًا محددًا وموضعًا محددًا:</p>
<ul>
<li>معالجات API التي تقرأ الهوية من جسم الطلب بدلًا من <code>locals.user</code>.</li>
<li>مسارات المشرفين التي تستخدم فحصًا مجرّدًا لـ <code>locals.user</code> بدلًا من <code>requireAdministrator(locals.user)</code>.</li>
<li>استعلامات Drizzle التي لا تقيّد النطاق بالمستخدم الحالي على الموارد المملوكة للمستخدم.</li>
<li>معالجة الأخطاء التي تلتقط الخطأ وتعيد 200.</li>
<li>التصيير غير الآمن للمحتوى الذي ينشئه المستخدم.</li>
<li>أنماط Playwright المحظورة (<code>waitForTimeout</code>، و<code>page.locator</code> الخام، وتسجيل الدخول عبر الواجهة).</li>
<li>التغييرات في حلقة الملف التعريفي التي تحذف مخرجات حرجة.</li>
</ul>
<p>كل بند يسمّي ما تبحث عنه <em>وأين</em> تبحث عنه. «مسارات المشرفين تحت <code>src/routes/api/admin/**</code>» بحثٌ بـ grep. أما «الاستعلامات غير المقيّدة» فحكمٌ تقديري، لكن النطاق يضيق إلى الموارد المملوكة للمستخدم. وأنماط Playwright تعكس قواعد ESLint التي وصّلناها في الطبقة الساكنة — حزام وحمّالة مرة أخرى.</p>
<p><strong>ما الذي تتركه</strong> يسرد المخرجات المولّدة، وملفات القفل، وحالة التخزين، ولقطات الحالة، وملفات HAR، ومخرجات البناء. بدون هذا القسم سيتعليق Bugbot على فروق في ملفات لا تعدّلها يدويًا أبدًا. ذلك ضجيج، والضجيج يدرّبك على تجاهل الروبوت.</p>
<p><strong>النبرة</strong> ثلاث جمل. «كن مباشرًا. سمِّ السطر. اقترح إصلاحًا محددًا.» لا «فكّر في»، ولا ملخصات. هذا مبدأ الصوت نفسه من <code>CLAUDE.md</code>: إن لم تكن ستقولها لزميل واقف عند مكتبك، فلا تدع الروبوت يقولها في تعليق مراجعة.</p>
<h3 id="العلة-المزروعة">العلّة المزروعة</h3>
<p>فرع <code>planted-bug/admin-feature</code> يغيّر ملفًا واحدًا بالضبط: <code>src/routes/api/admin/featured-books/+server.ts</code>. هذا هو الفرق:</p>
<pre><code class="language-diff"><span class="hljs-deletion">-import { requireAdministrator } from &#x27;$lib/server/authorization&#x27;;</span>
<span class="hljs-addition">+import { error } from &#x27;@sveltejs/kit&#x27;;</span>
 import type { RequestHandler } from &#x27;./$types&#x27;;

 /**
  * Admin surface for featuring books on the public home page. Only Shelf
<span class="hljs-deletion">- * administrators may call this endpoint — \`requireAdministrator\` throws a 403</span>
<span class="hljs-deletion">- * when the signed-in reader does not have administrator access.</span>
<span class="hljs-addition">+ * administrators may call this endpoint.</span>
  */

 export const POST: RequestHandler = async ({ locals, request }) =&gt; {
<span class="hljs-deletion">-	requireAdministrator(locals.user);</span>
<span class="hljs-addition">+	if (!locals.user) {</span>
<span class="hljs-addition">+		error(401, &#x27;Authentication required&#x27;);</span>
<span class="hljs-addition">+	}</span>
</code></pre>
<p>استيراد <code>requireAdministrator</code> اختفى، و<code>error</code> من <code>@sveltejs/kit</code> استُورد مكانه. والاستدعاء استُبدل بفحص مصادقة مجرّد: <code>if (!locals.user)</code>. صارت نقطة النهاية تسمح <em>لأي</em> مستخدم مسجّل الدخول بتمييز الكتب أو إلغاء تمييزها. وتعليق JSDoc قُلّم بهدوء لإزالة الإشارة إلى الوصول المخصّص للمشرفين.</p>
<p>هذه ليست علّة دقيقة. إنها تخفيض صلاحية على نقطة نهاية إدارية، وهي بالضبط البند الثاني في قائمة «ما الذي يُبلَّغ عنه» في BUGBOT.md. يمرّ الفرع في <code>npm run typecheck</code> و<code>npm run lint</code> و<code>npm run test</code> بنظافة — لأن لا اختبار يغطي حالة مستخدم غير مشرف يصل إلى نقطة النهاية. المسار السعيد ما زال يعمل. وذلك هو المقصود: هذه علّة <em>يفوتها</em> التحليل الساكن والاختبارات الموجودة، لكن مراجعًا مضبوطًا <em>ينبغي</em> أن يلتقطها.</p>
<p>إن كنت قد أنشأت فرع العلّة المزروعة بإعادة الأساس (rebase) على إيداع سابق لـ <code>/playground</code>، فسيحذف الفرق أيضًا مسار <code>/playground</code> (أُضيف إلى main بعد ذلك الإيداع). ذلك الفرق تجميلي — ليس العلّة المزروعة، ولا ينبغي لـ Bugbot أن يعلّق عليه. وإن كنت قد بدأت من <code>main</code> الحالي، فتجاهل هذه الفقرة كلها.</p>
<h2 id="ما-الذي-ما-زال-عليك-تشغيله">ما الذي ما زال عليك تشغيله</h2>
<p>كل ما يلي يتطلب نسخة متشعّبة على GitHub وحساب Cursor. إن كنت تعمل محليًا بلا مستودع بعيد، فوثّق الفجوة وانتقل إلى «أنماط تأخذها معك». المخرجات المحلية — ملف الإعداد والفرع — هي الجزء الذي يمكنك التحقق منه الآن.</p>
<h3 id="التشعب-والتركيب">التشعّب والتركيب</h3>
<p>انشئ نسخة متشعّبة من مستودع Shelf في حسابك على GitHub. ركّب Bugbot من لوحة تحكم Cursor وامنحه الوصول إلى نسختك. تأكّد من أنه نشط بفحص لوحة التحكم أو بفتح أي طلب سحب قائم — ينبغي أن يظهر Bugbot كمراجع خلال دقيقة أو دقيقتين.</p>
<h3 id="الدفع-وفتح-طلب-السحب">الدفع وفتح طلب السحب</h3>
<p>ادفع <code>main</code> (مع <code>.cursor/BUGBOT.md</code> مُودعًا) وفرع <code>planted-bug/admin-feature</code> إلى نسختك. افتح طلب سحب من <code>planted-bug/admin-feature</code> إلى <code>main</code>.</p>
<h3 id="المراقبة">المراقبة</h3>
<p>خلال دقيقة أو دقيقتين ينبغي أن ينشر Bugbot تعليقًا مضمّنًا واحدًا على الأقل على الفرق. مع وجود ملف الإعداد، ينبغي أن يقع التعليق على السطر الذي حُذف منه <code>requireAdministrator</code> وأن يوضح أن أي مستخدم مسجّل الدخول يستطيع الآن استدعاء نقطة النهاية الإدارية. وإن لم يجد العلّة من المحاولة الأولى، فحدّث <code>.cursor/BUGBOT.md</code> وادفع مرة أخرى. ذلك التكرار <em>هو</em> حلقة الضبط — ليس فشلًا، بل هو التمرين.</p>
<h3 id="سلمها-إلى-الوكيل">سلّمها إلى الوكيل</h3>
<p>حين يشير Bugbot إلى العلّة، لا تصلحها بنفسك. افتح Claude Code وقل شيئًا مثل:</p>
<blockquote>
<p>اقرأ تعليقات Bugbot على طلب السحب رقم 1. أصلح كل ما وجدته. ادفع إيداعًا جديدًا.</p>
</blockquote>
<p>ينبغي أن يقرأ الوكيل التعليق عبر <code>gh pr view --comments</code>، ويحدّد الملف والسطر المتأثرين، ويعيد استيراد <code>requireAdministrator</code> واستدعاءها، ثم يدفع. ويعيد Bugbot المراجعة على الدفعة الجديدة. فإما يُحلّ النقاش أو يظهر متابعة مصقولة.</p>
<p>القيد الأساسي: صفر رسائل تشرح فيها <em>أنت</em> العلّة. الروبوت وجدها، والوكيل أصلحها، وأنت راقبت.</p>
<h2 id="المسلم-مقابل-الفجوة">المُسلَّم مقابل الفجوة</h2>
<p><strong>محلي (مُسلَّم في المشروع الأولي):</strong></p>
<ul>
<li><code>.cursor/BUGBOT.md</code> موجود بالأقسام الثلاثة الموصوفة أعلاه.</li>
<li>فرع <code>planted-bug/admin-feature</code> موجود بفرق تخفيض الصلاحية نفسه بالضبط.</li>
<li>الفرع يمرّ في كل بوابات الجودة المحلية.</li>
</ul>
<p><strong>مستضاف (يتطلب نسختك المتشعّبة على GitHub وحساب Cursor):</strong></p>
<ul>
<li>تركيب Bugbot وتنشيطه.</li>
<li>إنشاء طلب السحب وتعليق المراجعة الفعلي.</li>
<li>حلقة قراءة الوكيل للتعليق وإصلاحه.</li>
<li>إعادة مراجعة Bugbot على الدفعة المُصلَحة.</li>
</ul>
<p>إن لم تستطع إكمال النصف المستضاف أثناء الورشة، فلا بأس — ملف الإعداد والفرع هما المخرجان المهمان للفهم. الحلقة المستضافة هي <em>الدليل</em> على أن الإعداد يعمل، لا الإعداد نفسه.</p>
<h2 id="أنماط-تأخذها-معك">أنماط تأخذها معك</h2>
<ul>
<li><strong>ضبط المراجع مهارة ككتابة <code>CLAUDE.md</code>.</strong> سمِّ أنماطًا محددة، ومواضع محددة، وما يجب تجاهله. البنية متطابقة — لا يتغيّر إلا الجمهور من «وكيل يكتب الشيفرة» إلى «وكيل يراجع الشيفرة».</li>
<li><strong>ازرع العلّة التي تريد التقاطها.</strong> أسرع طريقة لاختبار إعداد مراجعة أن تعطيه جوابًا معروفًا. إن فوّت المراجع علّة مزروعة، ففي الإعداد فجوة. وإن التقطها، فلديك دليل على أن الإعداد يعمل — لا إيمان فقط.</li>
<li><strong>التسليم من الروبوت إلى الوكيل هو الاختبار الحقيقي.</strong> عثور Bugbot على العلّة نصف الحلقة. وتصرّف الوكيل بناءً على ما وجده <em>دون أن تترجم أنت</em> هو النصف الآخر. إن اضطررت إلى شرح العلّة، فالتعليق لم يكن قابلًا للتنفيذ بما يكفي — اضبط قسم النبرة.</li>
<li><strong>«ما الذي تتركه» يمنع إجهاد الضجيج.</strong> مراجع يعلّق على ملفات القفل والمخططات المولّدة يدرّبك على تجاهله. قائمة الاستبعاد لا تقلّ أهمية عن قائمة الإدراج.</li>
</ul>
<h2 id="قراءة-إضافية">قراءة إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-bugbot-on-a-planted-bug">مخبر: Bugbot على علّة مزروعة</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/tuning-bugbot-for-your-codebase">ضبط Bugbot لقاعدة شيفرتك</a></li>
</ul>
`,r={book:e,chapter:n,chapterTitle:t,slug:o,title:i,headings:s,html:d};export{e as book,n as chapter,t as chapterTitle,r as default,s as headings,d as html,o as slug,i as title};
