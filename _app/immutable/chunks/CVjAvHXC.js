const e="kinney",o="ai-development-setup",d="تهيئة بيئة التطوير بالذكاء الاصطناعي",c="claude-code-mods",n="تعديلات Claude Code (Claude Code Mods)",t=[{depth:2,id:"ما-لا-يقدر-عليه-إلا-التعديل",text:"ما لا يقدر عليه إلا التعديل"},{depth:2,id:"كيف-يعمل-التعديل",text:"كيف يعمل التعديل"},{depth:2,id:"الأحداث-الرئيسية",text:"الأحداث الرئيسية"},{depth:2,id:"تطوير-تعديل",text:"تطوير تعديل"},{depth:2,id:"الأمن-والحوكمة",text:"الأمن والحوكمة"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:2,id:"أنماط-مضادة",text:"أنماط مضادة"},{depth:2,id:"روافع-متقدمة",text:"روافع متقدّمة"},{depth:2,id:"تعلم-من-شيفرة-حقيقية",text:"تعلّم من شيفرة حقيقية"}],s=`<p>الإعدادات <a href="https://stevekinney.com/courses/ai-development-setup/hooks">الخُطّافات</a> (سكربتات يشغّلها الإطار عند أحداث دورة الحياة)، و <a href="https://stevekinney.com/courses/ai-development-setup/skills">المهارات</a> (مجلدات تعليمات يحمّلها الوكيل عند الطلب)، وخوادم MCP (برامج تضيف أدوات عبر <a href="https://modelcontextprotocol.io/">Model Context Protocol</a>) كلها تعمل من الخارج. يمكنها أن تتفاعل مع ما يفعله Claude Code أو أن تسلّمه نصًّا، لكنها لا تستطيع تغيير الواجهة أو التقدّم داخل طلب إلى النموذج.</p>
<p><strong>التعديل (mod)</strong> يستطيع ذلك. إنه <a href="https://code.claude.com/docs/en/plugins">إضافة</a> (حزمة امتدادات تثبّتها في Claude Code) تعمل دوالها بـ JavaScript أو TypeScript <em>داخل</em> عملية Claude Code نفسها. ولا تزال لا تحرّر شيفرة Claude Code؛ فالتعديل يعمل عبر الأحداث التي يعرّضها. والتعديلات مُفعَّلة افتراضيًا منذ Claude Code v2.1.287، في كل من أداة سطر الأوامر وتبويب Code في تطبيق سطح المكتب.</p>
<p>النسخة المختصرة: التعديل شيفرة بلا صندوق رمل تعمل باسمك.</p>
<h2 id="ما-لا-يقدر-عليه-إلا-التعديل">ما لا يقدر عليه إلا التعديل</h2>
<ul>
<li>أن يرسم واجهته الخاصة: ألواحًا، أو الشريط فوق الطلب.</li>
<li>أن يعيد رسم أجزاء من واجهة Claude Code: المؤشّر الدوّار، وصفوف الأدوات، والرسائل.</li>
<li>أن يتقدّم داخل طلب نموذج. فدالتك تقف في مسار الطلب، ويمكنها تمريره، أو تغييره، أو الإجابة عنه بنفسها.</li>
<li>أن يجيب عن نداء أداة بنفسه، فلا تعمل الأداة أبدًا. وخُطّاف الإعدادات يستطيع منع نداء أو تعديل مدخله؛ أما التعديل وحده فيستطيع تقديم النتيجة أو تجاوز قرار الإذن النهائي.</li>
<li>أن يضيف <code>/commands</code> تعمل فورًا، بلا دورة Claude على الإطلاق.</li>
</ul>
<p>هل تمنع أو تسمح أو تسجّل بسكربت لديك بالفعل؟ خُطّاف إعدادات. تعليمات ينبغي أن يقرأها Claude؟ مهارة. الوصول إلى نظام خارجي؟ خادم MCP. ولا تمدّ يدك إلى تعديل إلا حين تحتاج الداخل.</p>
<h2 id="كيف-يعمل-التعديل">كيف يعمل التعديل</h2>
<p>تحتاج ثلاثة ملفات:</p>
<ul>
<li><code>plugin.json</code>: البيان، الذي يسمّي الإضافة ويصف ما تحويه.</li>
<li><code>hooks/hooks.json</code>: يتضمّن <code>&quot;modules&quot;: [&quot;./register.js&quot;]</code>. وهذا المفتاح هو ما يجعل الإضافة تعديلًا.</li>
<li>وحدة الخُطّافات، التي تصدّر <code>register(on)</code>. يستدعيها Claude Code مرة واحدة، مسلّمًا إياك <code>on</code> لربط خُطّافات بالأحداث.</li>
</ul>
<p>كل خُطّاف يستقبل <code>($, e, next)</code>. وإن سبق أن كتبت <a href="https://expressjs.com/">وسيط</a> Express (دوال تعالج كل منها طلبًا وتمرّره)، فلديك الفكرة أساسًا:</p>
<ul>
<li><strong><code>$</code></strong>: واجهة برمجة التعديلات. وهي <em>الطريقة الوحيدة</em> التي تصل بها شيفرتك إلى الملفات، والعمليات، والشبكة، والنماذج، وواجهة المستخدم.</li>
<li><strong><code>e</code></strong>: الحدث، كبيانات عادية لا تستطيع تغييرها في مكانها. لتغييرها، مرّر نسخة إلى <code>next</code>.</li>
<li><strong><code>next(e)</code></strong>: يشغّل التعديلات المتبقية، ثم سلوك Claude Code نفسه.</li>
</ul>
<p>ويفعل الخُطّاف واحدًا من ثلاثة:</p>
<ul>
<li><strong>يلاحظ</strong>: أنجز عملك، ثم <code>return next(e)</code>.</li>
<li><strong>يعيد الكتابة</strong>: <code>return next({ …e, changed })</code>.</li>
<li><strong>يجيب</strong>: أعِد نتيجة <em>دون</em> استدعاء <code>next</code>. فلا يعمل شيء بعد خُطّافك.</li>
</ul>
<p>إليك حالة الملاحظة: خُطّاف يراقب كل طلب ترسله ويتركه كما هو.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">register</span>(<span class="hljs-params">on</span>) {
  <span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;prompt.submit&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">$, e, next</span>) =&gt;</span> {
    <span class="hljs-comment">// Do your work here, using $ for anything outside the mod.</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">next</span>(e);
  });
}
</code></pre>
<p>تضيّق المُطابِقات متى يعمل الخُطّاف: <code>{ tool: 'Bash' }</code>، أو <code>{ component: 'Pane' }</code>، أو مصفوفة قيم، أو تعبير نمطي.</p>
<h2 id="الأحداث-الرئيسية">الأحداث الرئيسية</h2>
<ul>
<li><strong>الأدوات</strong>: يُطلَق <code>tool.call</code> حين يطلب Claude تشغيل أداة. ويمكنه رفض النداء، أو تغيير وسائطه، أو إعادة نتيجة بنفسه. ويُطلَق <code>tool.check</code> حيث يُتّخذ قرار الإذن، ويمكنه تجاوز ذلك السماح أو السؤال أو الرفض النهائي. (لقواعد الرفض تحفّظ؛ <a href="#security-and-governance">الأمن والحوكمة</a> يشرح متى لا يستطيع تعديل المستخدم تجاوزها.)</li>
<li><strong>الطلبات</strong>: يستطيع <code>prompt.submit</code> إعادة كتابة الطلب، أو إضافة سياق يقرؤه Claude وحده، أو إسقاط الطلب كليًا.</li>
<li><strong>الدورات</strong>: يغطّي <code>turn.step</code> كل طلب إلى النموذج. وهو متدفّق، فتكتبه كمُولِّد غير متزامن. ويُطلَق <code>turn.complete</code> عند انتهاء الدورة.</li>
<li><strong>الجلسة والأوامر</strong>: سجّل الأوامر والأدوات في <code>session.start</code>. وأجِب عن أوامرك في <code>command.run</code>.</li>
<li><strong>الواجهة</strong>: يقرّر <code>ui.render</code> ما يرسمه لوح، أو الشريط، أو جزء قائم من الواجهة.</li>
<li><strong>التعديلات الأخرى</strong>: يتيح <code>plugin.register</code> لتعديل سياسات أن يرفض تعديلات أخرى قبل أن تُحمَّل. وكل تابع <code>$</code> هو أيضًا حدث (<code>fs.read</code>, <code>http.fetch</code>)، فيستطيع تعديل واحد أن يراقب نداءات آخر.</li>
<li><strong>أحداث خُطّافات الإعدادات</strong>: كل منها متاح أيضًا بصيغة <code>classic.&lt;Event&gt;</code>، فيستطيع التعديل معالجة كل ما تعالجه خُطّافاتك القائمة.</li>
</ul>
<h2 id="تطوير-تعديل">تطوير تعديل</h2>
<ul>
<li><code>claude --plugin-dir ./my-mod</code> يحمّل مجلدًا لجلسة واحدة ويعيد تحميله عند كل حفظ.</li>
<li>أسرع بداية أن تطلب من Claude كتابته. سيستخدم مهارة <code>plugin-authoring</code> المدمجة.</li>
<li><code>claude plugin validate ./my-mod</code> يقرأ شيفرتك دون تشغيلها، ويسرد ما يعالجه من <code>hooks:</code> وما يجريه من <code>calls:</code>، ويلتقط الأحداث المكتوبة خطأً. والوحدة التي لا يستطيع قراءتها لن تُحمَّل.</li>
<li><code>claude plugin test</code> يشغّل اختباراتك بلا جلسة، وبلا تسجيل دخول، وبلا شبكة. ويخرج بالرمز <code>1</code> عند الفشل، فيعمل في CI.</li>
<li>يكتب Claude Code ملفات تعريف TypeScript لإصدارك بالتحديد في <code>.claude-plugin/types/</code>. وحين تتعارض مع الوثائق، ثق بالأنواع.</li>
</ul>
<p>يعمل التعديل بأذوناتك داخل عملية Claude Code، فأخطاؤه تكلّف أكثر من أخطاء سكربت.</p>
<h2 id="الأمن-والحوكمة">الأمن والحوكمة <span class="content-anchor" id="security-and-governance"></span></h2>
<p>يستطيع التعديل قراءة ملفاتك وأسرارك، ورؤية كل طلب ونداء أداة، والموافقة على نداءات الأدوات نيابةً عنك، وإنفاق استخدامك. وقبل تثبيت أحدها، شغّل <code>claude plugin validate</code> واقرأ فعلًا سطرَي <code>calls:</code> و <code>hooks:</code>: ما الذي يصل إليه التعديل وما الذي يستمع إليه.</p>
<p>عند تحميل الحارس المدمج (<code>sec-default</code>)، <em>لا يستطيع</em> تعديل المستخدم تجاوز قواعد الرفض، أو خُطّافات <code>PreToolUse</code> المُدارة، أو التعليمات المُدارة، ولا حتى بـ <code>tool.check</code>. («مُدار» تعني مضبوطًا من مسؤول، في إعدادات لا يستطيع المستخدم تجاوزها.) ويُحمَّل <code>sec-default</code> في الطبقة الخارجية على جهاز بإعدادات مُدارة، أو لمنظمة Team أو Enterprise، ما لم تنصّ خُطّافات <code>prependPlugins</code> المُدارة على خلاف ذلك. وعلى جهاز شخصي بلا أي منهما، لا تصف الوثائق أي حماية كهذه، فافترض أن تعديلًا تثبّته قادر على تجاوز قواعد الرفض الخاصة بك. ولا يستطيع أي تعديل تغيير ما يعرضه طلب الإذن.</p>
<p>وما <em>يستطيع</em> التعديل تجاوزه:</p>
<ul>
<li>قواعد <code>ask</code>، وهي قواعد الإذن التي تجعل Claude Code يسألك.</li>
<li><code>PreToolUse</code> <a href="https://stevekinney.com/courses/ai-development-setup/hooks">خُطّافات</a> لا تأتي من إعدادات مُدارة.</li>
<li>مصنّف الوضع التلقائي، للنداءات التي يوافق عليها التعديل.</li>
<li><strong>قواعد الرفض الخاصة بك، لنداءات <code>$.fs</code> و <code>$.process</code> الخاصة بالتعديل نفسه.</strong></li>
</ul>
<p>هذه الأخيرة تفاجئ الناس. فقواعد الرفض تقيّد Claude، لا تعديلًا يقرأ الملفات بنفسه.</p>
<p>وللمسؤولين، في الإعدادات المُدارة:</p>
<ul>
<li><code>allowManagedModsOnly</code>: يمنع تحميل تعديلات المستخدمين أنفسهم.</li>
<li><code>prependPlugins</code> و <code>appendPlugins</code>: يحدّدان أين تعمل تعديلات مؤسستك نسبةً إلى تعديلات المستخدمين.</li>
<li><code>disableSideloadFlags</code>: يمنع <code>--plugin-dir</code>.</li>
<li><code>disableAllHooks</code>: يوقف كل التعديلات <em>و</em> كل الخُطّافات.</li>
</ul>
<p>ولك أنت: <code>--safe-mode</code> لجلسة واحدة، أو <code>&quot;disableAllHooks&quot;: true</code> في إعداداتك لكل جلسة.</p>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ul>
<li><strong>اجعل الحرّاس يفشلون مغلقين</strong>: يُتخطّى الخُطّاف الذي يَطرح استثناءً أو يبلغ مهلة المضيف، فيمرّر الحارس النداء. أعِد رفضًا من <code>.catch()</code>، وسابق أي عملية معلّقة بمهلة خاصة بك، لأن <code>.catch()</code> لا يستطيع حسم وعد معلّق. استخدم <code>$.clock.sleep</code> لذلك، مثلًا انتظار خمس ثوانٍ يُقابَل بـ <code>{ deny: &quot;Guard deadline exceeded&quot; }</code> لـ <code>tool.call</code>، داخل مهلة المضيف البالغة 10 ثوانٍ بأريحية. اختبر النجاح، والرفض، وعملية لا تُحسم أبدًا. ولا ينجو أي مؤقّت داخلي من انهيار بيئة تشغيل التعديل أو إلغاء تحميلها، فافرِض الثوابت التي يجب أن تنجو من ذلك بقاعدة إذن خارجية، أو خُطّاف مُدار، أو صندوق رمل، أو حدّ نظام تشغيل.</li>
<li><strong>اكتب نصّ الرفض كتعليمة</strong>: يقرؤه Claude كنتيجة الأداة، فأخبره بما يفعله بدلًا من ذلك.</li>
<li><strong>أبقِ الانتظار داخل نداءات <code>$</code></strong>: يحصل الخُطّاف على 10 ثوانٍ من زمن تشغيله الخاص. والانتظار على <code>next()</code> أو <code>$.ui.ask</code> لا يُحتسب. أما انتظار وعودك الخاصة فيُحتسب.</li>
<li><strong>اختر التخزين بحسب طول ما يجب أن يبقى</strong>: يُفقد متغيّر الوحدة عند كل إعادة تحميل. و <code>$.state</code> يبقى مدى الجلسة، والكتابة إليه تعيد رسم كل ما يعتمد عليه. و <code>$.store</code> يبقى عبر الجلسات ويتشاركه كل من فيها.</li>
<li><strong>أعِد تحميل <code>$.state</code> بعد <code>/clear</code></strong>: فـ <code>/clear</code> و <code>/resume</code> و <code>/branch</code> (الأوامر التي تفرّغ المحادثة أو تعيد فتحها أو تفرّعها) تعيد ضبطه، فانسخ القيم المحفوظة رجوعًا من <code>$.store</code> في <code>classic.SessionStart</code>.</li>
<li><strong>أعِد الرسم صراحةً لكل ما عدا ذلك</strong>: حين يغيّر شيء آخر غير <code>$.state</code> ما ينبغي أن يظهر على الشاشة، مثل متغيّر وحدة أو قيمة من <code>$.store</code>، فاستدعِ <code>$.ui.invalidate('ui.render')</code>، وامنح كل عنصر تحكم <code>key</code>، وتحقق من <code>e.surface</code>، لأن بعض العناصر تُرسم في الطرفية فقط أو في تطبيق سطح المكتب فقط.</li>
<li><strong>لا تفتح الألواح إلا حين يطلب المستخدم</strong>: فاللوح الذي يفتحه تعديلك من تلقاء نفسه يحتاج طرفية بعرض 144 عمودًا. استخدم <code>$.ui.toast</code> (إشعار قصير على الشاشة) للإعلان عن الأمور بدلًا من ذلك.</li>
</ul>
<h2 id="أنماط-مضادة">أنماط مضادة <span class="content-anchor" id="anti-patterns"></span></h2>
<ul>
<li><strong>شيفرة يرفضها المدقّق</strong>: إعطاء <code>$</code> اسمًا مستعارًا أو تفكيكه، وأسماء أحداث غير حرفية، وخُطّافا <code>session.start</code> بلا مُطابِق، و <code>import()</code> الديناميكي.</li>
<li><strong>مدّ اليد إلى أدوات JavaScript المعتادة</strong>: لا وجود لـ <code>setTimeout</code> و <code>fetch</code> وواجهات Node في التعديل. استخدم <code>$.clock</code> و <code>$.http</code> و <code>$.fs</code> و <code>$.process</code>.</li>
<li><strong>تحرير النسخة المثبّتة</strong>: إنها مخزّنة مؤقتًا حسب الإصدار. طوّر مقابل <code>--plugin-dir</code>.</li>
<li><strong>التعامل مع حارس تعبير نمطي كأمن</strong>: فنمط مكتوب من أجل <code>--force</code> تفوته <code>git push -f</code>. انظر <a href="https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder">سلّم الإلزام</a> لطرق فرض قاعدة بموثوقية أكبر.</li>
<li><strong>افتراض أن قواعد الرفض تقيّد التعديل نفسه</strong>: إنها لا تفعل. انظر <a href="#security-and-governance">الأمن والحوكمة</a>.</li>
<li><strong>حلقات مشغولة</strong>: تُسقِط خيط العمل المشترك الذي يشغّل التعديلات المثبّتة، والانهيارات المتكرّرة تلغي تحميل <em>كلها</em>.</li>
<li><strong>تغيير نص مطالبة النظام في كل طلب</strong>: يكسر <a href="https://stevekinney.com/courses/ai-development-setup/caching-and-cost">ذاكرة التخزين المؤقت للطلبات</a> (ذاكرة المزوّد لبادئة محادثة عالجها بالفعل، وهو ما يجعل إعادة إرسال تلك البادئة أرخص بكثير)، فيدفع كل طلب الثمن كاملًا. كل. مرة. واحدة.</li>
</ul>
<h2 id="روافع-متقدمة">روافع متقدّمة</h2>
<ul>
<li><code>turn.step</code> لتوجيه طلبات فردية إلى نموذج آخر، أو لتسجيل إصابات ذاكرة التخزين المؤقت.</li>
<li><code>$.tool.register</code> لمنح Claude أداة جديدة.</li>
<li><code>$.model.complete</code> لنداء نموذج من عندك، بلا تاريخ محادثة.</li>
<li><code>$.model.fork</code> لطرح سؤال على المحادثة الحالية، يُخدَم معظمه من ذاكرة التخزين المؤقت. مفيد لكتابة موجز تسليم.</li>
<li>المؤقّتات (<code>$.clock.every</code>)، إضافة إلى <code>$.prompt.submit</code> لبدء دورة من عمل في الخلفية.</li>
<li><code>$.session.send</code> لمراسلة جلسة أخرى.</li>
<li><code>session.append</code> لإعادة كتابة صفوف المحادثة قبل تخزينها، للحجب مثلًا.</li>
<li><code>Raster</code> و <code>$.ui.blit</code> للشبكات والرسوم المتحرّكة في الطرفية.</li>
<li>تعديلات السياسات: <code>plugin.register</code> لرفض تعديلات أخرى، وخُطّافات على توابع <code>$</code> لتدقيقها.</li>
</ul>
<h2 id="تعلم-من-شيفرة-حقيقية">تعلّم من شيفرة حقيقية</h2>
<p>ابدأ بالتعديلات المدمجة (<code>diff</code>, <code>agents-md</code>, <code>sec-default</code>, <code>telemetry</code>) في <a href="https://github.com/anthropics/claude-code/tree/main/mods"><code>anthropics/claude-code/mods</code></a>. ثم جرّب عيّنات Anthropic: token-weather، و blast-radius، و replay-theater.</p>
<p>ومن المجتمع، هناك <a href="https://github.com/OneWave-AI/claude-code-mods">عشرة تعديلات نموذجية من OneWave</a>، و <a href="https://paddo.dev/blog/claude-code-mods">مقال ccseats من paddo</a> عن المزالق الواقعية.</p>
<p>ابدأ بـ <code>validate</code> و <code>--plugin-dir</code>، وتعلّم من التعديلات المدمجة أولًا، وتعامل مع كل تعديل، بما فيه تعديلك، كشيفرة تحمل مفاتيح كل شيء.</p>
`,l={book:e,chapter:o,chapterTitle:d,slug:c,title:n,headings:t,html:s};export{e as book,o as chapter,d as chapterTitle,l as default,t as headings,s as html,c as slug,n as title};
