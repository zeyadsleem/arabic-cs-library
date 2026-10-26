const e="kinney",t="ai-development-setup",o="تهيئة بيئة التطوير بالذكاء الاصطناعي",n="worktrees",d="أشجار العمل (Worktrees)",r=[{depth:2,id:"ما-هو-مشترك-وما-ليس-كذلك",text:"ما هو مشترك وما ليس كذلك"},{depth:2,id:"أمور-ستؤذيك",text:"أمور ستؤذيك"},{depth:2,id:"أشجار-العمل-والوكلاء-المتوازون",text:"أشجار العمل والوكلاء المتوازون"},{depth:2,id:"التنظيف-قرار-ملكية",text:"التنظيف قرار ملكية"}],c=`<p>شغّل وكيلين في نسخة العمل نفسها فتتخطّى تعديلات أحدهما الأخرى خلال دقائق. والإصلاح المعتاد هو <a href="https://git-scm.com/docs/git-worktree">شجرة عمل Git</a>: نسخة إضافية من المستودع نفسه في مجلدها الخاص، بملفاتها وفرعها. فلا يكتب أحد فوق أحد.</p>
<p>ذلك الإصلاح أضيق مما يبدو. فأشجار العمل تقلّل تصادمات الملفات. لكنها <em>لا</em> تعزل الخدمات ولا المنافذ ولا قواعد البيانات ولا الأسرار ولا القرارات. وتلك الثغرة، بفارق كبير، أكبر مصدر لإرباك الوكلاء عندي: فقد رفض حارس أشجار العمل لديّ، وهو <a href="https://stevekinney.com/courses/ai-development-setup/hooks">خُطّاف</a> يمنع الأوامر التي قد تخرج من شجرة عمل الوكيل، 465 منها في شهرين.</p>
<h2 id="ما-هو-مشترك-وما-ليس-كذلك">ما هو مشترك وما ليس كذلك</h2>
<table>
<thead>
<tr>
<th>منفصل لكل شجرة عمل</th>
<th>مشترك بينها جميعًا</th>
</tr>
</thead>
<tbody>
<tr>
<td>ملفات العمل</td>
<td>الإيداعات والفروع والوسوم</td>
</tr>
<tr>
<td>الفهرس</td>
<td>المخبأ (stash) وإعداد Git وخطافات Git</td>
</tr>
<tr>
<td><code>HEAD</code></td>
<td></td>
</tr>
<tr>
<td></td>
<td>القرارات</td>
</tr>
</tbody>
</table>
<p>وبعض النتائج المترتبة:</p>
<ul>
<li><strong>الفرع ينتمي إلى شجرة عمل واحدة</strong>: يرفض Git إخراج الفرع نفسه مرتين. وذلك إشارة ملكية، لا إزعاج.</li>
<li><strong><code>.git</code> ملف في شجرة عمل مرتبطة</strong>: ينبغي للسكربتات أن تسأل Git بـ <code>git rev-parse --show-toplevel</code> أو <code>--git-common-dir</code> بدلًا من افتراض أن <code>.git</code> مجلد.</li>
<li><strong>المخبأ مشترك</strong>: الأتمتة التي تُفرِّغ <code>stash@{0}</code> قد تفرّغ عمل شجرة عمل أخرى.</li>
<li><strong><code>git config --local</code> يغيّر كل شجرة عمل</strong>: إذ ثمة ملف إعداد واحد للمستودع.</li>
</ul>
<p>يتولّى Git حدًّا واحدًا فقط عنك: من يعدّل أيّ الملفات. أما المنافذ وقواعد البيانات ودمج التغييرات من جديد وتقرير متى تكون شجرة العمل آمنة للحذف، فهي مهمتك.</p>
<h2 id="أمور-ستؤذيك">أمور ستؤذيك <span class="content-anchor" id="things-that-will-bite-you"></span></h2>
<ul>
<li><strong>القاعدة ليست ما تظن</strong>: <code>isolation: worktree</code> (وهو الإعداد الذي يمنح وكيلًا فرعيًا شجرة عمل خاصة) ينشئ شجرة العمل من الفرع الافتراضي لمستودعك، لا من الإيداع الذي عليه جلستك. والعمل غير المُودَع وغير المدفوع لا ينتقل أبدًا. فأودِع الأساس <em>و</em>اضبط <code>worktree.baseRef</code> على <code>&quot;head&quot;</code> في إعدادات Claude Code.</li>
<li><strong>فرق الوكلاء تتجاهل <code>isolation</code></strong>: لا تفترض أن <a href="https://stevekinney.com/courses/ai-development-setup/agent-teams">الزملاء</a> معزولون عن بعضهم.</li>
<li><strong>نسخة العمل الجديدة ليست بيئة جاهزة</strong>: الملفات المتجاهَلة لا تأتي معها. فثبّت الاعتمادات لكل شجرة عمل، واسرد الملفات المتجاهَلة التي تحتاج نسخها (مثل <code>.env</code>) في <code>.worktreeinclude</code>، وهو ملف Claude Code في جذر المستودع. ونفّذ فحص المشروع الخاص قبل أن يعدّل أحد أي شيء.</li>
<li><strong>النجاح مقابل الخادم الخطأ</strong>: سيشغّل <code>reuseExistingServer</code> في <a href="https://playwright.dev/">Playwright</a> اختباراتك بسرور تطوير من شجرة عمل <em>مختلفة</em> عن طيب خاطر. ومنافذ المضيف الثابتة في <a href="https://docs.docker.com/compose/">Docker Compose</a> تتصادم بالطريقة نفسها، وملف <code>.env</code> منسوخ يوجّه كل شجرة عمل إلى قاعدة البيانات نفسها.</li>
<li><strong>امنح كل مهمة مواردها الخاصة</strong>: منفذًا، وقاعدة بيانات، واسم مشروع Compose، وسياق متصفح. وسلسل عمليات البناء المكلفة خلف قفل. وشارك ذاكرة التنزيل المؤقتة، لكن لا تُنشئ رابطًا رمزيًا لـ <code>node_modules</code> أبدًا.</li>
</ul>
<p>اكتب اختبار عزل سلبيًا واحدًا: علامة تُنشأ في شجرة العمل A يجب أن تكون غير مرئية من شجرة العمل B.</p>
<h2 id="أشجار-العمل-والوكلاء-المتوازون">أشجار العمل والوكلاء المتوازون <span class="content-anchor" id="worktrees-and-parallel-agents"></span></h2>
<p>لكل من <a href="https://code.claude.com/docs/en/overview">Claude Code</a> و<a href="https://developers.openai.com/codex">Codex</a> و<a href="https://cursor.com/">Cursor</a> و<a href="https://github.com/features/copilot">GitHub Copilot</a> أوضاع أشجار عمل. وهي تختلف في أين تعيش أشجار العمل، وعمّا تستند إليه، وكيف يعمل التنظيف، فتفقّد الإعدادات الافتراضية لأداتك قبل أن تثق بها.</p>
<p>أشجار العمل لا تُذهب التعارضات. بل تنقلها إلى وقت الدمج. <a href="https://arxiv.org/abs/2607.04697">وفي دراسة واحدة</a>، تعارضت طلبات السحب من وكلاء <em>مختلفين</em> بنسبة 41.7%. فقسّم بالملكية قبل أن تشغّل أي وكيل. وإن استطعت أن تكتب مسبقًا من يملك ماذا، فسيُدمج الفروع بسلاسة على الأرجح. وإن لم تستطع، فظهور الملكية المتداخلة على الأقل كتعارض دمج مرئي خير من أن يكتب وكيلان فوق بعضهما في صمت.</p>
<p>ثم دمج تسلسليًا: ادمج واحدًا، وأعد تشغيل المجموعة الكاملة، وادمج التالي. فالفروع التي تنجح وحدها قد تفشل معًا، وحين يكسر دمجٌ فحصًا، توقّف وأبلغ عن الفرع والفحص. وإن أنتج عاملان حلّين متنافسين، فاختر أحدهما؛ ولا تخلطهما. ويتنبّأ <code>git merge-tree --write-tree</code> بالتعارضات قبل أن تدمج.</p>
<p>تقترح Anthropic <a href="https://support.claude.com/en/articles/14554000-claude-code-power-user-tips">ثلاث إلى خمس جلسات متوازية</a>. لكن الحد الحقيقي ليس Git. بل هو مقدار ما تستطيع مراجعته، للأسباب المشروحة في <a href="https://stevekinney.com/courses/ai-development-setup/verification-and-evidence#you-are-a-load-sensitive-component">أنت مكوّن حسّاس للحمل</a>.</p>
<h2 id="التنظيف-قرار-ملكية">التنظيف قرار ملكية</h2>
<p>حذف شجرة عمل يبدو كترتيب البيت. لكنه في الحقيقة حكم بأن لا أحد ما زال يحتاج ما فيها.</p>
<ul>
<li><strong>القِدَم ليس دليل هجران</strong>: يخبرك <code>git rev-list --count HEAD --not --remotes</code> ما إذا كانت لشجرة العمل إيداعات لا توجد في مكان آخر. فإن كانت متسخة أو غير مدفوعة فلا تحذفها.</li>
<li><strong>حالة <code>git status</code> نظيفة ليست آمنة أيضًا</strong>: فـ <code>git worktree remove</code> يحذف الملفات المتجاهَلة، مثل قاعدة بيانات SQLite محلية، دون سؤال.</li>
<li><strong>عمليات دمج الضغط (squash) تكذب</strong>: يقول <code>git merge-base --is-ancestor</code> إن العمل لم يصل قط، لأن الإيداعات الأصلية لا تصير أسلافًا لـ <code>main</code> أبدًا.</li>
<li><strong>دع النموذج يصنّف، ودع سكربتًا يحذف</strong>: النموذج جيد في فرز أشجار العمل إلى «منتهية بوضوح» و«اسأل إنسانًا». وينبغي أن يتولّى <code>rm</code> سكربت يعمل افتراضيًا بوضع المحاكاة (dry-run) وقد قرأته.</li>
</ul>
<p>الترتيب الآمن: أوقف عمليات المهمة وتفقّد الحالة، بما فيها الملفات المتجاهَلة. وتأكّد أن العمل وصل، أو احفظه برفع أو <a href="https://git-scm.com/docs/git-bundle"><code>git bundle</code></a>، وانسخ أي ملفات متجاهَلة تحتاجها. ثم نفّذ <code>git worktree remove</code> <em>بدون</em> <code>--force</code>، ونفّذ <code>git branch -d</code> كخطوة منفصلة. ولا تنفّذ <code>rm -rf</code> على شجرة عمل ولا تعِد تسمية مجلدها يدويًا أبدًا: استخدم <code>git worktree move</code>، و<code>git worktree list --porcelain -z</code> حين يحتاج سكربت إلى قراءة القائمة.</p>
<p>شجرة العمل مجلد بفرع، لا صندوق رمل. فلا تحذف إلا ما أنشأته أنت، وإلا حين تستطيع إثبات أن لا شيء يُفقد.</p>
`,s={book:e,chapter:t,chapterTitle:o,slug:n,title:d,headings:r,html:c};export{e as book,t as chapter,o as chapterTitle,s as default,r as headings,c as html,n as slug,d as title};
