const n="kinney",t="self-testing-ai-agents",e="وكلاء ذكاء اصطناعي يختبرون أنفسهم",s="review-portability-beyond-bugbot",o="قابلية نقل المراجعة إلى ما هو أبعد من Bugbot",i=[{depth:2,id:"الأجزاء-القابلة-للنقل-من-الحلقة",text:"الأجزاء القابلة للنقل من الحلقة"},{depth:2,id:"نماذج-المشغلات",text:"نماذج المُشغِّلات"},{depth:2,id:"أسطح-التعليمات-تتفاوت-أكثر-مما-يتوقع-الناس",text:"أسطح التعليمات تتفاوت أكثر مما يتوقّع الناس"},{depth:2,id:"وحد-الملاحظات-لا-الأداة",text:"وحّد الملاحظات، لا الأداة"},{depth:2,id:"قاعدة-الثلاثة-ما-زالت-تنطبق",text:"قاعدة الثلاثة ما زالت تنطبق"},{depth:2,id:"مصفوفة-مراجعة-قابلة-للنقل",text:"مصفوفة مراجعة قابلة للنقل"},{depth:2,id:"ما-يوضع-في-المستودع",text:"ما يوضع في المستودع"},{depth:3,id:"كيف-يبدو-دليل-المراجعة",text:"كيف يبدو دليل المراجعة"},{depth:2,id:"كيف-تعرف-أن-حلقة-المراجعة-تنتقل-معك",text:"كيف تعرف أن حلقة المراجعة تنتقل معك"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>يعجبني Bugbot. لكنني أيضًا لا أريد أن تنهار حلقة المراجعة لديك في اللحظة التي يستخدم فيها فريقك أداة مختلفة.</p>
<p>وهذا هو مقصد هذا الملحق.</p>
<p>تتغيّر الأسماء. أما الحلقة الكامنة فلا تتغيّر. <a href="https://cursor.com/docs/bugbot">Cursor Bugbot</a> و<a href="https://docs.github.com/en/copilot/tutorials/optimize-code-reviews">مراجعة الشيفرة في GitHub Copilot</a> و<a href="https://help.openai.com/en/articles/11369540-codex-in-chatgpt">المراجعة التلقائية في Codex</a> كلها تقوم على الهيكل نفسه: وكيل ثانٍ يقرأ الفرق، ويترك ملاحظات، ثم يحوّل وكيل التأليف أو الإنسان الملاحظات المتكررة إلى قواعد في المنبع.</p>
<blockquote>
<p><strong>المتطلب السابق</strong></p>
<p>ابدأ بـ<a href="https://stevekinney.com/courses/self-testing-ai-agents/the-second-opinion">الرأي الثاني</a> و<a href="https://stevekinney.com/courses/self-testing-ai-agents/tuning-bugbot-for-your-codebase">ضبط Bugbot ليناسب قاعدة شيفرتك</a>. يفترض هذا الملحق أنك تفهم بالفعل لماذا تهمّ حلقة الرأي الثاني. والشيء الوحيد الذي يتغيّر هنا هو المساحة السطحية الخاصة بكل مورّد.</p>
</blockquote>
<h2 id="الأجزاء-القابلة-للنقل-من-الحلقة">الأجزاء القابلة للنقل من الحلقة</h2>
<p>حين أنتقل من أداة مراجعة إلى أخرى، هذه هي الأشياء التي أضع لها خريطة أولًا:</p>
<ul>
<li><strong>المُشغِّل</strong>: متى تجري المراجعة؟</li>
<li><strong>سطح التعليمات</strong>: من أين يتعلّم المراجع قواعد المستودع؟</li>
<li><strong>سياسة الملاحظات</strong>: أي التعليقات حاجزة، وأيها استشارية؟</li>
<li><strong>معالجة التكرار</strong>: ماذا يحدث حين تتعثّر ثلاثة طلبات سحب متتالية في الفئة نفسها من المشكلات؟</li>
<li><strong>قاعدة إعادة المراجعة</strong>: كيف تعرف الأداة أن عليها النظر مرة أخرى بعد إصلاح؟</li>
</ul>
<p>هذه هي الواجهة الحقيقية. وكل ما عدا ذلك زخرفة منتج.</p>
<h2 id="نماذج-المشغلات">نماذج المُشغِّلات</h2>
<p>بعض الأدوات تراجع تلقائيًا عند فتح طلب السحب. وبعضها يعيد المراجعة مع كل دفعة. وبعضها يحتاج إلى تعليق أو إلى إجراء صريح.</p>
<p>وقاعدة النقل بسيطة: <strong>وثّق المُشغِّل في المستودع، لا في رأسك فقط.</strong></p>
<p>فإن كان المراجع لا يعمل إلا حين يكتب أحدهم عبارة سحرية، فهذا ليس اختبارًا ذاتيًا. بل طقس.</p>
<h2 id="أسطح-التعليمات-تتفاوت-أكثر-مما-يتوقع-الناس">أسطح التعليمات تتفاوت أكثر مما يتوقّع الناس</h2>
<p>هذا هو الجزء الذي يلسع الفرق.</p>
<p>قد يقرأ Bugbot الملف <code>.cursor/BUGBOT.md</code>. وقد يقرأ Copilot الملف <code>.github/copilot-instructions.md</code> إضافة إلى أي تعليمات مستودع تُظهرها عبر GitHub. وقد يعمل Codex انطلاقًا من مُوجِّه على مستوى المستودع، أو من سير عمل موصول، أو من تعليمة يدوية من نوع «راجع هذا الفرق». أما تعليقات المراجعة العادية في GitHub فليس لها ملف تعليمات مدمج على الإطلاق، ومعنى ذلك أنك تحتاج إلى دليل إرشادي في المستودع إن أردت الاتساق.</p>
<p>مداخل مختلفة. والمهمة واحدة: أن تمنح المراجع سياقًا كافيًا ليلتقط مشكلاتك بدل أن يختلق مشكلات جديدة.</p>
<p>لذا، حين تنقل الحلقة، لا تبدأ بـ«أي زر أنقر؟». ابدأ بـ«من أين يقرأ هذا المراجع القواعد؟».</p>
<h2 id="وحد-الملاحظات-لا-الأداة">وحّد الملاحظات، لا الأداة</h2>
<p>أسرع طريقة لجعل أدوات المراجعة قابلة للنقل هي توحيد كيفية تفسير الملاحظات.</p>
<p>وأنا أحب ثلاث سلال:</p>
<ul>
<li><strong>حاجزة</strong>: الأمان، وفقدان البيانات، وكسر المصادقة، ومشكلات الصحة</li>
<li><strong>تحتاج حكمًا</strong>: ملاءمة المعمارية، والتسمية، والمنطق غير الواضح، والأنماط المريبة</li>
<li><strong>ضجيج</strong>: ثرثرة أسلوب قليلة القيمة أو تعليقات مكرّرة لا تغيّر الرقعة</li>
</ul>
<p>إن صنّفت الملاحظات على هذا النحو، صار المورّد أقل أهمية. فوكيل التأليف أو الإنسان يعرف الآن كيف يستجيب حتى لو جاء التعليق من منتج مختلف. وللنسخة الميكانيكية من هذا التوحيد، فإن مخطط JSON مشتركًا يُمرَّر إلى <code>claude -p --json-schema</code> أو <code>codex exec --output-schema</code> يفرض على كل أداة مراجعة الشكل الناتج نفسه — انظر <a href="https://stevekinney.com/courses/self-testing-ai-agents/structured-cli-output-as-pipeline-glue">مخرجات سطر الأوامر المهيكلة كغراء للخط الأنابيب</a>.</p>
<h2 id="قاعدة-الثلاثة-ما-زالت-تنطبق">قاعدة الثلاثة ما زالت تنطبق</h2>
<p>هذا الجزء لا يتغيّر لمجرد أن الشعار تغيّر.</p>
<p>إن تعثّرت ثلاثة طلبات سحب في الملاحظة نفسها:</p>
<ul>
<li>أولًا، أضف التعليمة أو شدّدها</li>
<li>بعدها، أضف قاعدة فحص ثابت أو تحققًا ساكنًا إن كانت المشكلة ميكانيكية</li>
<li>وأخيرًا، أضف اختبارًا إن كانت المشكلة سلوكية</li>
</ul>
<p>وهكذا تتوقّف ملاحظات المراجعة عن التكرار وتبدأ في أن تصبح بنية تحتية.</p>
<p>والمهم أن تعيش سياسة التصعيد في المستودع. وإلا فإن كل انتقال بين الأدوات يعيد الفريق إلى الحكايات الشفهية.</p>
<h2 id="مصفوفة-مراجعة-قابلة-للنقل">مصفوفة مراجعة قابلة للنقل</h2>
<p>هذه هي المصفوفة التي أريدها مكتوبة فعلًا:</p>
<table>
<thead>
<tr>
<th>السطح</th>
<th>المُشغِّل</th>
<th>مصدر القواعد</th>
<th>آلية إعادة المراجعة</th>
<th>أفضل استخدام</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bugbot</td>
<td>تلقائي عند أي نشاط على طلب السحب</td>
<td><code>.cursor/BUGBOT.md</code> إضافة إلى أعراف المستودع</td>
<td>ادفع إصلاحًا أو استخدم تدفّق المتابعة في الأداة</td>
<td>ملاحظات حادة على مستوى الفرق</td>
</tr>
<tr>
<td>مراجعة Copilot</td>
<td>إعداد سير عمل المستودع أو طلب السحب</td>
<td><code>.github/copilot-instructions.md</code> إضافة إلى وثائق المستودع</td>
<td>ادفع إصلاحًا وأعد تشغيل المراجعة</td>
<td>مراجعة أصلية في GitHub بأقل احتكاك</td>
</tr>
<tr>
<td>مراجعة Codex</td>
<td>مراجعة تلقائية أو مفوّضة حسب الإعداد</td>
<td>مُوجِّه المستودع إضافة إلى وثائق المستودع</td>
<td>ادفع إصلاحًا أو أعد تشغيل سير عمل المراجعة</td>
<td>حلقة مراجعة وإصلاح في آن</td>
</tr>
<tr>
<td>مراجعة GitHub العادية</td>
<td>مراجعة بشرية أو مراجعة وكيل يدوية</td>
<td>دليل المستودع وحكم المراجع</td>
<td>اطلب إعادة مراجعة</td>
<td>الملاذ الذي يوجد دائمًا</td>
</tr>
</tbody>
</table>
<p>المقصود ليس أن هذا الجدول سيبقى كاملًا إلى الأبد. المقصود أن لديك الآن شيئًا صريحًا تنقله.</p>
<blockquote>
<p><strong>انحراف المنتجات</strong></p>
<p>يتغيّر توفّر أدوات المراجعة المستضافة وأسعارها وخطوات إعدادها بالضبط بسرعة. أعد التحقق من وثائق المنتج الحالية قبل أن تجعل أي أداة واحدة بوابة دمج إلزامية.</p>
</blockquote>
<h2 id="ما-يوضع-في-المستودع">ما يوضع في المستودع</h2>
<p>إن أردت لهذه الحلقة أن تصمد أمام تقلّب الأدوات، فأنا أبقي ثلاثة آثار في المستودع:</p>
<ul>
<li>ملف التعليمات الخاص بالأداة، لأي سطح مراجعة أستخدمه فعلًا</li>
<li>دليل مراجعة محايد تجاه المورّد يصف سلال الخطورة ومعالجة التكرار وقواعد التصعيد</li>
<li>مكان واحد يقول كيف تعود الملاحظات المتكررة إلى قواعد الوكيل وقواعد الفحص والاختبارات</li>
</ul>
<p>هذا يكفي ليبقى العملية قابلة للنقل حتى لو لم يبق المنتج ساكنًا.</p>
<h3 id="كيف-يبدو-دليل-المراجعة">كيف يبدو دليل المراجعة</h3>
<p>دليل المراجعة هو الأثر المحايد تجاه المورّد. ومهمته أن يصف الحلقة بمصطلحات يستطيع أي مراجع (إنسان، Bugbot، Copilot، Codex) أن يطبّقها. دليل Shelf سيعيش في <code>docs/review-loop-playbook.md</code> — وهذا الملف هو ما سينشئه المختبر — وله هذا الشكل:</p>
<pre><code class="language-markdown"><span class="hljs-section"># Review loop playbook</span>

<span class="hljs-section">## Finding categories</span>

<span class="hljs-section">### Blocking</span>

A finding is blocking when it matches one of these patterns:

<span class="hljs-bullet">-</span> Any API handler reading user identity from the request body instead
  of <span class="hljs-code">\`locals.user\`</span>.
<span class="hljs-bullet">-</span> Any Drizzle query on user-owned data that does not scope by the
  current user.
<span class="hljs-bullet">-</span> Any Playwright spec that uses <span class="hljs-code">\`page.waitForTimeout\`</span> or a raw CSS
  <span class="hljs-code">\`page.locator\`</span>.

Blocking findings must be fixed before merge.

<span class="hljs-section">### Judgment</span>

A finding needs judgment when it is symptom-level — naming, error
messaging, helper extraction. Worth reading, worth considering,
not automatically required.

<span class="hljs-section">### Noise</span>

A finding counts as noise when it applies to generated artifacts
(<span class="hljs-code">\`playwright-report/\`</span>, <span class="hljs-code">\`build/\`</span>), test snapshot PNGs, or the
allowlisted bait file you create during the static-layer lab
(<span class="hljs-code">\`sample-config.json\`</span> in the course walkthrough). If the reviewer keeps
producing noise here, update its instruction surface.

<span class="hljs-section">## The rule of three</span>

<span class="hljs-bullet">-</span> First two occurrences: fix the PR.
<span class="hljs-bullet">-</span> Third occurrence: add a rule to the agent instructions.
<span class="hljs-bullet">-</span> Still recurring: add a lint rule, test assertion, or CI gate.

<span class="hljs-section">## Re-review path</span>

After a fix lands, the reviewer reruns on the next push. If it stays
silent on a remaining blocking pattern, update its instructions
file.
</code></pre>
<p>قصير. صريح. ميكانيكي. الملف كله يتّسع في صفحة واحدة، وكل مراجع يتبع تصنيف السلال الثلاث نفسه بصرف النظر عن الأداة الجالسة في مقعد المراجع.</p>
<h2 id="كيف-تعرف-أن-حلقة-المراجعة-تنتقل-معك">كيف تعرف أن حلقة المراجعة تنتقل معك</h2>
<p>تكون لديك حلقة مراجعة قابلة للنقل عندما:</p>
<ul>
<li>يكون سطح مراجعة بديل واحد على الأقل موثّقًا إلى جانب Bugbot</li>
<li>يعرّف المستودع الملاحظات الحاجزة والاستشارية تعريفًا صريحًا</li>
<li>يكون للملاحظات المتكررة مسار متفق عليه للعودة إلى قواعد المنبع</li>
</ul>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>علامة روبوت المراجعة ليست هي الحلقة. الحلقة هي «عين ثانية تجد ما فات المؤلف، والملاحظات المتكررة تصبح قواعد في المستودع». اكتب <em>ذلك</em>، فيمكن أن تتغيّر الأدوات دون أن تأخذ عمليتك معها.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-second-opinion">الرأي الثاني</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-port-the-review-loop-beyond-bugbot">مختبر: انقل حلقة المراجعة إلى ما هو أبعد من Bugbot</a></li>
</ul>
`,a={book:n,chapter:t,chapterTitle:e,slug:s,title:o,headings:i,html:l};export{n as book,t as chapter,e as chapterTitle,a as default,i as headings,l as html,s as slug,o as title};
