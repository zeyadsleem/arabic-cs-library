const e="kinney",d="ai-development-setup",o="تهيئة بيئة التطوير بالذكاء الاصطناعي",t="user-and-project-instructions",n="تعليمات المستخدم والمشروع",c=[{depth:2,id:"ما-هي-هذه-الملفات",text:"ما هي هذه الملفات"},{depth:2,id:"النطاقات",text:"النطاقات"},{depth:2,id:"اكتب-حقائق-تشغيلية",text:"اكتب حقائق تشغيلية"},{depth:2,id:"التعليمات-ليست-حدودا-أمنية",text:"التعليمات ليست حدودًا أمنية"},{depth:2,id:"الويكي-العملاق-الحي",text:"الويكي العملاق الحيّ"},{depth:2,id:"الإعداد-الشخصي-في-مستودع-مشترك",text:"الإعداد الشخصي في مستودع مشترك"}],p=`<p>كل مشروع ينمو فيه ملف تعليمات في النهاية. يبدأ بخمسة أسطر مفيدة. وبعد سنة يصير أربعمئة سطر من التاريخ والآراء والنصائح نصف البائدة، ولا يستطيع أحد، إنسانًا كان أو وكيلًا، أن يقول أيّها ما زال مهمًّا.</p>
<p>والإصلاح هو أن تُبقي ذلك الملف صغيرًا ومحدّدًا وصادقًا في ما لا يستطيع فعله.</p>
<h2 id="ما-هي-هذه-الملفات">ما هي هذه الملفات</h2>
<p>يقرأ Claude Code ملف Markdown اسمه <code>CLAUDE.md</code> في بداية كل جلسة. ويقرأ <a href="https://developers.openai.com/codex">Codex</a>، وهو أداة البرمجة من OpenAI، ملف <a href="https://developers.openai.com/codex/guides/agents-md"><code>AGENTS.md</code></a> بالطريقة نفسها. وتعود إصدارات Claude Code الحديثة أيضًا إلى <code>AGENTS.md</code>، لكن فقط حين لا يوجد <code>CLAUDE.md</code> أو <code>CLAUDE.local.md</code> في مجلد عملك أو فوقه. وسأسمّي أيًّا منهما تقرأه أداتك <em>ملف التعليمات</em>. (والأداة (harness) هي البرنامج الملتفّ حول النموذج؛ و<em>الجلسة</em> محادثة واحدة مع الوكيل.)</p>
<p>في Claude Code، تُحمَّل ملفات التعليمات في مجلد العمل وأسلافه عند الإطلاق. أما ملفات <code>CLAUDE.md</code> التابعة فتُحمَّل عند الطلب، حين يقرأ Claude ملفات في تلك المجلدات، فهي ليست كلها حاضرة أثناء التخطيط الأولي أو الاستكشاف بـ Bash وحده. فاقرأ تعليمات أي شجرة فرعية صراحةً قبل تخطيط العمل فيها. وتضم <a href="https://code.claude.com/docs/en/memory">وثائق الذاكرة</a> في Claude Code قواعد التحميل.</p>
<p>ينبغي أن تقلّل هذه الملفات الغموض. و<em>لا</em> ينبغي أن تصير مواصفة ثانية منحرفة.</p>
<h2 id="النطاقات">النطاقات</h2>
<p>لديك بضع طبقات تعمل بها، من الأوسع إلى الأضيق:</p>
<ul>
<li><strong>نطاق المستخدم</strong>: إعدادات افتراضية شخصية عبر كل مشاريعك.</li>
<li><strong>نطاق المستودع</strong>: معمارية وأوامر مشتركة لكل من يعمل في قاعدة الشيفرة هذه.</li>
<li><strong>نطاق المجلد</strong>: قواعد محلية لشجرة فرعية واحدة. ويمكنك تضمين ملف تعليمات في مجلد فرعي.</li>
<li><strong>موجّه المهمة</strong>: الهدف المباشر، واختبار القبول بشكل مثالي.</li>
</ul>
<p>ويمكنك أيضًا إبقاء التفضيلات الخاصة خارج الملف المشترك. ففي Claude Code، يُحمَّل <code>CLAUDE.local.md</code> إلى جانب <code>CLAUDE.md</code>، وتضيفه إلى <code>.gitignore</code>. وفي Codex، <em>يستبدل</em> <code>AGENTS.override.md</code> ملف <code>AGENTS.md</code> في مستواه، فعليه أن يحمل كل شيء من الملف الذي يخفيه.</p>
<p>وماذا يحدث حين يختلف نطاقان؟ يضع Codex الملفات الأقرب إلى مجلد عملك في الآخر، فيفوز التوجيه اللاحق. ويسلسل Claude Code الملفات بدلًا من استبدالها، وتقول وثائقه إن Claude قد يختار أحدهما اعتباطًا حين يتعارضان. فلا تكتب تعارضًا وتثق بالأسبقية لتحلّه. وحُل دون تناقض النطاقات.</p>
<h2 id="اكتب-حقائق-تشغيلية">اكتب حقائق تشغيلية <span class="content-anchor" id="write-operational-facts"></span></h2>
<p>سمعت هذا على الأرجح من قبل، لكن للاحتياط: فضّل الحقائق التشغيلية.</p>
<ul>
<li>«نفّذ <code>pnpm test:billing</code> من <code>apps/api</code>» تعليمة قابلة للاستعمال.</li>
<li>«حافظ على جودة عالية» يصعب اختباره ويصعب العمل به.</li>
</ul>
<p>للتعليمة الجيدة ثلاثة أجزاء:</p>
<blockquote>
<p>حين <code>$trigger</code>، نفّذ <code>$action</code>، ثم تحقّق من <code>$result</code>.</p>
</blockquote>
<p>وصيغة أعمليّة أكثر:</p>
<blockquote>
<p>حين تعدّل تسلسل الفاتورة، حدّث نصّ العقد (fixture) ونفّذ فحصه.</p>
</blockquote>
<p>والأفضل من ذلك قائمة قصيرة:</p>
<blockquote>
<ul>
<li>قبل تعديل شيفرة الفوترة، اقرأ <code>docs/billing-invariants.md</code>.</li>
<li>نفّذ <code>pnpm test:billing</code> بعد التغييرات.</li>
<li>لا تغيّر حقول الفاتورة العامة دون تحديث عقد API.</li>
</ul>
</blockquote>
<p>كل واحدة تخبر الوكيل بما يفعل، ومعظمها يخبره كيف يعرف أنه نجح. وهذه الفكرة نفسها التي في <a href="https://stevekinney.com/courses/ai-development-setup/planning-and-task-contracts">عقد المهمة</a>، لكن محصورة في مجال كامل من قاعدة الشيفرة.</p>
<h2 id="التعليمات-ليست-حدودا-أمنية">التعليمات ليست حدودًا أمنية</h2>
<p>«لا تقرأ <code>.env</code> أبدًا» تعليمة. وليست ضمانًا. فالنموذج يتبعها عادةً، وفي المرة الواحدة التي لا يتبعها فيها، لا شيء يمنعه.</p>
<p>وحين تحتاج حدًّا حقيقيًا، فاستخدم الأذونات: إعدادات تسمح بنداءات أدوات محدّدة أو تمنعها، وتُنفّذها الأداة مهما قرّر النموذج. وسنوضّح متى نستخدم كلًّا منهما في <a href="https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder">سلّم الإنفاذ</a>، ويتناول <a href="https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder#blast-radius">نطاق الانفجار</a> الضرر الذي قد يفعله وكيل عند غياب حدّ.</p>
<h2 id="الويكي-العملاق-الحي">الويكي العملاق الحيّ</h2>
<p><em>الويكي العملاق الحيّ</em> هو ما يصير إليه ملف التعليمات حين يُلقى فيه كل شيء ولا يقلّمه أحد. فكثرة التفاصيل المحمّلة دائمًا تخفي القواعد القليلة التي <em>تهمّ</em> فعلًا.</p>
<p>وبدلًا من ذلك، أخبر الوكيل أين تعيش وثائق المشروع ومتى يذهب لقراءتها. فإشارة قصيرة («قواعد الفوترة في <code>docs/billing-invariants.md</code>؛ اقرأها قبل لمس شيفرة الفوترة») أفضل من لصق الوثيقة كاملة.</p>
<p>وإن كانت كتلة تعليمات لا تنطبق إلا على نوع واحد من المهام، فقد تنتمي إلى <a href="https://stevekinney.com/courses/ai-development-setup/skills">مهارة</a>، تُحمَّل عند الطلب بدلًا من كل مرة.</p>
<h2 id="الإعداد-الشخصي-في-مستودع-مشترك">الإعداد الشخصي في مستودع مشترك</h2>
<p>ملفات التعليمات Markdown يقرأها النموذج. أما ملفات <em>الإعدادات</em> فمختلفة: فهي JSON (وTOML في Codex) تهيّئ الأداة نفسها، بما فيها قواعد الأذونات والخطافات ومتغيّرات البيئة. وللإعدادات التي تخصك وحدك، فوق أي شيء مُودَع، يمنحك Claude Code ملف <code>.claude/settings.local.json</code>، ويبقيه خارج Git حين ينشئه. وإليك كيف تتناظر القطع بين الأداتين:</p>
<table>
<thead>
<tr>
<th>Claude Code</th>
<th>Codex</th>
<th>الغرض</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>.claude/settings.local.json</code></td>
<td><code>.codex/config.toml</code></td>
<td>إعدادات على مستوى المشروع (وملف Claude Code يخصك وحدك)</td>
</tr>
<tr>
<td><code>CLAUDE.local.md</code></td>
<td><code>AGENTS.override.md</code></td>
<td>تعليمات المشروع الشخصية</td>
</tr>
<tr>
<td><code>CLAUDE.md</code></td>
<td><code>AGENTS.md</code></td>
<td>تعليمات المشروع المشتركة (ملف التعليمات)</td>
</tr>
<tr>
<td><code>~/.claude/settings.json</code></td>
<td><code>~/.codex/config.toml</code></td>
<td>إعدادات المستخدم والعالمية</td>
</tr>
<tr>
<td><code>~/.claude/CLAUDE.md</code></td>
<td><code>~/.codex/AGENTS.md</code></td>
<td>تعليمات المستخدم والعالمية</td>
</tr>
</tbody>
</table>
<p>وتسرد <a href="https://code.claude.com/docs/en/settings">وثائق إعدادات Claude Code</a> من أين يُقرأ كل ملف.</p>
<blockquote>
<p><strong>مهارات على نطاق المستودع دون إيداعها</strong></p>
<p>إن كنت تعمل في مستودع مشترك وتريد مهاراتك أو إعدادك الخاص على نطاق المستودع، فأضف أنماطها إلى الملف في <code>git rev-parse --git-path info/exclude</code>. وهو يعمل مثل <code>.gitignore</code>، لكنه غير مُودَع. واطلب من Git المسار: ففي شجرة عمل مرتبطة، <code>.git</code> ملف مؤشّر، فبناء <code>.git/info/exclude</code> يفشل. وتتشارك أشجار العمل المرتبطة ملف الاستبعاد الخاص بالمستودع.</p>
</blockquote>
<p>أفضل ملف تعليمات هو أقصر ملف لا يزال يمنع الأخطاء التي تراها مرة بعد مرة.</p>
`,l={book:e,chapter:d,chapterTitle:o,slug:t,title:n,headings:c,html:p};export{e as book,d as chapter,o as chapterTitle,l as default,c as headings,p as html,t as slug,n as title};
