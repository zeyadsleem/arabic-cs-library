const n="kinney",t="openclaw",o="OpenClaw: مساعدك الذكي الشخصي",e="choosing-an-orchestration-tool",s="اختيار أداة التنسيق",a=[{depth:2,id:"ما-حدث-لـ-taskflow",text:"ما حدث لـ TaskFlow"},{depth:2,id:"الخريطة",text:"الخريطة"},{depth:2,id:"كيف-تختار",text:"كيف تختار"},{depth:2,id:"ما-ينجو-من-إعادة-التشغيل",text:"ما ينجو من إعادة التشغيل"},{depth:2,id:"الأهداف",text:"الأهداف"},{depth:2,id:"النوايا-القائمة",text:"النوايا القائمة"},{depth:2,id:"خطافات-الويب-الواردة",text:"خطافات الويب الواردة"},{depth:2,id:"جربها",text:"جرّبها"},{depth:3,id:"1-جرد-ما-لديك",text:"1. جرد ما لديك"},{depth:3,id:"2-امض-بهدف-عبر-محادثة",text:"2. امضِ بهدف عبر محادثة"},{depth:3,id:"3-اضبط-نية-قائمة-وأطلقها",text:"3. اضبط نية قائمة وأطلقها"},{depth:3,id:"4-أرسل-خطاف-ويب-إلى-بوابتك",text:"4. أرسل خطاف ويب إلى بوابتك"},{depth:3,id:"5-إن-كنت-قد-استخدمت-taskflow-سابقا",text:"5. إن كنت قد استخدمت TaskFlow سابقًا"}],d=`<p>حتى الآن رأيت طرقًا عدة لإنجاز العمل دون كتابة كل خطوة: الأتمتات المجدولة، والوكلاء الفرعيون، وجلسات برمجة ACP، وسيور عمل Lobster، والأسراب. وهي متشابكة، وليس واضحًا دائمًا أيّها يناسب مهمة بعينها. هذا الدرس هو الخريطة. ويتناول أيضًا ثلاث أدوات أصغر لم يحصل كل منها على درس مستقل (الأهداف، والنوايا القائمة، وخطافات الويب الواردة) ويشرح ما حدث لـ TaskFlow.</p>
<h2 id="ما-حدث-لـ-taskflow">ما حدث لـ TaskFlow</h2>
<p>إن كنت قد قرأت أدلة OpenClaw الأقدم، فقد رأيت <strong>TaskFlow</strong> و<strong>سجل المهام (Tasks ledger)</strong>. كان سجل المهام سجلًا مشتركًا لكل الأعمال المنفصلة، وكنت تفحصه بـ <code>openclaw tasks list</code>. وأضاف TaskFlow فوقه «سيورًا» دائمة متعددة الخطوات، لها مراحل وانتظارات ومهام أبناء مرتبطة.</p>
<p><strong>أُزيل الاثنان في OpenClaw <code>2026.9.7</code>.</strong> وكان تعليل المشروع أن السجل يكرّر حالة كل بيئة تشغيل تتعقّبها بنفسها أصلًا. فالأتمتات تحتفظ بتاريخ تشغيلها، والوكلاء الفرعيون يتعقّبون أبناءهم، وجلسات ACP تدير دورة حياتها. وتلخّص الوثائق ذلك بأن: كل بيئة تشغيل تملك التنفيذ والإتمام.</p>
<p>وما يعنيه ذلك عمليًا:</p>
<ul>
<li>لم يعد <code>openclaw tasks</code> موجودًا. وتشغيله يعطيك <code>OpenClaw does not know the command &quot;tasks&quot;</code>.</li>
<li>تبقى سجلات المهام والسيور القديمة في قاعدة البيانات لكن لا شيء يقرأها، ولا شيء يحوّل السيور القديمة إلى شيء آخر.</li>
<li>إن كنت تستخدم إضافة <strong>TaskFlow Webhooks</strong>، فإعدادها الآن متجاهَل مع تحذير <code>plugin removed: webhooks</code>. وينظّفه <code>openclaw doctor --fix</code>.</li>
</ul>
<p>وإليك أين ذهبت كل مهمة قديمة:</p>
<table>
<thead>
<tr>
<th>كنت…</th>
<th>استخدم الآن</th>
</tr>
</thead>
<tbody>
<tr>
<td>تتابع العمل المفوَّض بـ <code>tasks list</code></td>
<td><code>/subagents list</code> و<code>info</code> و<code>log</code> (<a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration">الوكلاء الفرعيون</a>)</td>
</tr>
<tr>
<td>تفحص التشغيلات المجدولة بـ <code>tasks list</code></td>
<td><code>openclaw automations runs &lt;job-id&gt;</code></td>
</tr>
<tr>
<td>توقف العمل بـ <code>tasks cancel</code></td>
<td><code>/stop</code>، أو زر <strong>Stop</strong> في واجهة التحكم، أو أدوات <code>/acp</code> لجلسات ACP</td>
</tr>
<tr>
<td>تنتظر انتهاء عدة أبناء</td>
<td>اتـرك الأصل ينتظر إبلاغاتهم، أو استخدم <a href="https://stevekinney.com/courses/openclaw/swarms">سربًا</a></td>
</tr>
<tr>
<td>تشغّل سيرًا متعدد الخطوات ببوابات موافقة</td>
<td><a href="https://stevekinney.com/courses/openclaw/lobster-workflows">سير عمل Lobster</a></td>
</tr>
<tr>
<td>تنتظر حدثًا خارجيًا</td>
<td>أتمتة بسكربت مشغّل، أو <a href="#inbound-webhooks">خطاف ويب وارد</a></td>
</tr>
<tr>
<td>تتعقّب هدفًا واحدًا طويلًا</td>
<td><a href="#goals">هدف</a></td>
</tr>
<tr>
<td>تدقّق ما جرى</td>
<td><code>openclaw audit</code></td>
</tr>
</tbody>
</table>
<p>ثمة ثغرة حقيقية واحدة. لا شيء اليوم يعوّض سيرًا دائمًا متعقَّب المراجعات ينسّق العمل عبر بيئات تشغيل مختلفة. وLobster أقرب ما يلائم العمل متعدد الخطوات، لكن حالته المحفوظة مجموعة ملفات على القرص، لا سجل مشترك.</p>
<h2 id="الخريطة">الخريطة</h2>
<table>
<thead>
<tr>
<th>الأداة</th>
<th>تبدأ متى</th>
<th>تصلح لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://stevekinney.com/courses/openclaw/automation-ideas">أتمتة مجدولة</a></td>
<td>ساعة، أو فاصل، أو سكربت شرط</td>
<td>الإحاطات والملخّصات والمراقبات والتذكيرات</td>
</tr>
<tr>
<td>نبضة (Heartbeat)</td>
<td>كل 30 دقيقة، على جلستك الرئيسية</td>
<td>فحوصات محيطة من نوع «هل يحتاج شيء انتباهي؟»</td>
</tr>
<tr>
<td>أمر دائم</td>
<td>يُحمَّل دائمًا من <code>AGENTS.md</code></td>
<td>مسؤولية مستمرة، مقترنة بجدولة</td>
</tr>
<tr>
<td><a href="#standing-intents">نية قائمة</a></td>
<td>يظهر شيء محدّد في المحادثة</td>
<td>«حين يظهر X، ذكّرني بـ Y»</td>
</tr>
<tr>
<td><a href="#goals">هدف</a></td>
<td>تضبطه في جلسة</td>
<td>نتيجة ملموسة واحدة تُتابَع على مدى أدوار كثيرة</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration">وكيل فرعي</a></td>
<td>يقرّر وكيلك التفويض</td>
<td>بضع قطع عمل مستقلة بالتوازي</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/openclaw/swarms">سرب</a></td>
<td>يشغّل وكيلك سكربت توزيع</td>
<td>خمس مهام متشابهة أو أكثر بنتائج منظّمة</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/openclaw/acpx-runtime-plugin">جلسة ACP</a></td>
<td>يسلّم وكيلك العمل إلى أداة برمجة</td>
<td>عمل برمجة حقيقي في Claude Code وCodex وغيرهما</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/openclaw/lobster-workflows">سير عمل Lobster</a></td>
<td>يشغّل وكيلك أو أتمتة خطّ معالجة</td>
<td>وصفة ثابتة بخطوات تحتاج إقرارًا</td>
</tr>
<tr>
<td><a href="https://stevekinney.com/courses/openclaw/llm-task">مهمة LLM</a></td>
<td>يحتاج سير عمل إجابة منظّمة واحدة</td>
<td>التصنيف أو الاستخلاص أو القرار، بصيغة JSON</td>
</tr>
<tr>
<td><a href="#inbound-webhooks">خطاف ويب وارد</a></td>
<td>تستدعي خدمة خارجية بوابتك</td>
<td>التفاعل مع أحداث من أنظمة أخرى</td>
</tr>
</tbody>
</table>
<p>والمقصود أن تُدمج. فقد يكون التقرير الأسبوعي أمرًا دائمًا يقول ما يملكه الوكيل، وأتمتة توقظه أيام الجمعة، وسير عمل Lobster يجمع البيانات ويتوقّف قبل الإرسال، وخطوة مهمة LLM داخل ذلك السير تصنّف كل عنصر.</p>
<h2 id="كيف-تختار">كيف تختار</h2>
<p>اسأل هذه بالترتيب:</p>
<ol>
<li><strong>هل يحدث في وقت بعينه؟</strong> استخدم أتمتة مجدولة.</li>
<li><strong>هل يحدث حين يظهر شيء في المحادثة؟</strong> استخدم نية قائمة.</li>
<li><strong>هل يحدث حين يقول نظام آخر ذلك؟</strong> استخدم خطاف ويب وارد. وإن كانت بوابتك خاصة، فاستخدم أتمتة تفحص كل بضع دقائق بدلًا من ذلك.</li>
<li><strong>هل تسلسل الخطوات معروف مسبقًا، بآثار جانبية تحتاج إقرارك؟</strong> استخدم Lobster. وإن احتاجت خطوة حكمًا تقديريًا، فاجعلها خطوة مهمة LLM.</li>
<li><strong>هل يمكن تقسيم العمل إلى قطع مستقلة؟</strong> لعدد قليل، استخدم الوكلاء الفرعيين. ولعدد كبير منها متشابه، استخدم سربًا.</li>
<li><strong>هل يحتاج أداة برمجة حقيقية؟</strong> استخدم ACP.</li>
<li><strong>هل هو نتيجة واحدة ستنال منها شيئًا فشيئًا على مدى محادثة طويلة؟</strong> اضبط هدفًا.</li>
<li><strong>هل هي مسؤولية مستمرة؟</strong> اكتب أمرًا دائمًا وجدوله.</li>
</ol>
<p>إن لم تكن متأكدًا، فابدأ بمحادثة عادية. وارقِ الأمر إلى أداة بعد أن تفعل الشيء نفسه يدويًا ثلاث مرات.</p>
<h2 id="ما-ينجو-من-إعادة-التشغيل">ما ينجو من إعادة التشغيل</h2>
<p>تختلف الأدوات في ما يحدث عند إعادة تشغيل البوابة وفي كيفية وصول الموافقات إليك. وذلك يهمّ أكثر ما يهمّ في كل ما يعمل أثناء غيابك.</p>
<table>
<thead>
<tr>
<th>الأداة</th>
<th>بعد إعادة التشغيل</th>
<th>الموافقات</th>
</tr>
</thead>
<tbody>
<tr>
<td>أتمتة</td>
<td>تبقى المهام والسجل. وتُعاد جدولة المهام الفائتة</td>
<td>تذهب إلى تطبيقات الموافقة المتصلة فقط. ولا شيء متصل يعني الرفض</td>
</tr>
<tr>
<td>هدف</td>
<td>يبقى مع الجلسة. ويُزيله <code>/new</code> و<code>/reset</code></td>
<td>الهدف لا يوافق على شيء أبدًا</td>
</tr>
<tr>
<td>نية قائمة</td>
<td>تبقى في قاعدة بيانات الوكيل</td>
<td>لا ينشئها إلا مالكو الأوامر</td>
</tr>
<tr>
<td>وكيل فرعي</td>
<td>تُنهى التشغيلات المتقطعة بوصفها متقطعة، لا تُعاد</td>
<td>ينتظر قرارًا كأي تشغيل آخر</td>
</tr>
<tr>
<td>سرب</td>
<td>الجامعون وكلاء فرعيون. لا تُعِد تشغيل دفعة تلقائيًا</td>
<td>الجامع لا يسأل أبدًا. وكل ما يحتاج موافقة يُرفض</td>
</tr>
<tr>
<td>Lobster</td>
<td>تُحفظ حالة التشغيل المتوقّف على القرص، فتستطيع استئنافه لاحقًا</td>
<td>مدمج: الخطوة التي تحتاج موافقة تتوقّف حتى تجيب</td>
</tr>
<tr>
<td>خطاف ويب وارد</td>
<td>الطلبات المتكرّرة بمفتاح إعادة الأثر (idempotency key) نفسه تُعيد تشغيل التشغيل نفسه</td>
<td>يُعامَل بوصفه بلا إشراف، كأتمتة معزولة</td>
</tr>
</tbody>
</table>
<h2 id="الأهداف">الأهداف <span class="content-anchor" id="goals"></span></h2>
<p><strong>الهدف (goal)</strong> غاية واحدة مرتبطة بالجلسة الحالية. ويبقى ظاهرًا للوكيل في كل دور حتى ينتهي، فلا تنحرف محادثة طويلة عمّا كنت تحاول إنجازه.</p>
<pre><code>/goal start Draft a one-page plan for migrating my blog to a new host, with a cost estimate
/goal
/goal pause waiting on hosting quotes
/goal resume
/goal complete
/goal clear
</code></pre>
<p>وفي واجهة التحكم، يظهر الهدف أيضًا كشريط فوق مربّع الرسالة، مع أزرار لتعديله أو إيقافه مؤقتًا أو مسحه.</p>
<p><img src="/arabic-cs-library/images/kinney/777c0de30a66ea1f.webp" alt="محادثة واجهة التحكم مع شريط هدف بحالة «Pursuing» فوق مربّع الرسالة، يعرض نص الهدف ومؤقّتًا وأزرار التعديل والإيقاف المؤقت والمسح"></p>
<p>ما ينبغي معرفته:</p>
<ul>
<li><strong>هدف واحد لكل جلسة.</strong> بدء هدف ثانٍ يفشل بـ <code>goal already exists</code> حتى تمسح الأول.</li>
<li><strong>لا يستطيع الوكيل إلا إنهاءه أو حجبه.</strong> فيمكنه وسم الهدف مكتملًا، أو محجوبًا بعد الإبلاغ عن الحاجز نفسه ثلاثة أدوار متتالية. وأنت وحدك من يوقفه مؤقتًا أو يستأنفه أو يعدّله أو يمسحه.</li>
<li><strong>يمسحه <code>/new</code> و<code>/reset</code>،</strong> لأنهما يبدآن جلسة جديدة.</li>
<li><strong>ليس مجدولًا ولا قائمة انتظار.</strong> فالهدف لا يشغّل شيئًا بنفسه، ولا يوافق على شيء.</li>
</ul>
<h2 id="النوايا-القائمة">النوايا القائمة <span class="content-anchor" id="standing-intents"></span></h2>
<p><strong>النية القائمة (standing intent)</strong> تذكير مرتبط بحدث بدلًا من وقت. فاطلب واحدة فقط:</p>
<blockquote>
<p>حين أذكر قائمة إطلاق المنتج، ذكّرني بتأكيد من يملك التراجع.</p>
</blockquote>
<p>وفي المرة التالية التي تحتوي فيها رسالة على تلك الكلمات، يُضاف التذكير إلى سياق الوكيل فيطرحه. والمطابقة فحص كلمات مفتاحية، لا نداء نموذج، فلا تصبح أضبابية كلما طالت المحادثة.</p>
<p>الإعدادات الافتراضية حذرة عن قصد: تُطلق كل نية 3 مرات على الأكثر، وتنتظر 24 ساعة بين إطلاق وآخر، وتنتهي بعد 90 يومًا. وهي افتراضيًا لا تنطبق إلا في القناة ومع الشخص اللذين أنشأتها فيهما. ولا ينشئها إلا مالكو الأوامر (<code>commands.ownerAllowFrom</code>)، وعليك أن تفعل ذلك من قناة محادثة.</p>
<p>اطلب من الوكيل أن يسرد نواياك القائمة لترى حالتها، وأن يلغي واحدة بالاسم. والوكيل لا يلغي واحدة بنفسه أبدًا.</p>
<h2 id="خطافات-الويب-الواردة">خطافات الويب الواردة <span class="content-anchor" id="inbound-webhooks"></span></h2>
<p><strong>خطافات الويب الواردة (inbound webhooks)</strong> تتيح لخدمة أخرى بدء دور للوكيل باستدعاء بوابتك عبر HTTP. وهي معطّلة افتراضيًا. ولتفعيلها، أضف هذا إلى إعدادك برمز عشوائي طويل لا تستخدمه إلا للخطافات:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  hooks<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    enabled<span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    token<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;&lt;long-random-hook-token&gt;&#x27;</span><span class="hljs-punctuation">,</span>
    path<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;/hooks&#x27;</span><span class="hljs-punctuation">,</span>
    allowedAgentIds<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;main&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    allowRequestSessionKey<span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يحدّ <code>allowedAgentIds</code> أي الوكلاء يستطيع المتصل الوصول إليه. وبدونه يحذّر <code>openclaw security audit</code> من أن أي متصل موثَّق يمكنه التوجيه إلى أي وكيل.</p>
<p>استجابة 200 من خطاف الويب تعني فقط أن الطلب قُبل. وهي لا تعني أن التشغيل انتهى، إلا إذا طلبت من الطلب أن ينتظر، كما يوضّح التمرين 4 أدناه.</p>
<blockquote>
<p><strong>بوابة خاصة لا تستطيع تلقّي خطافات ويب من الخارج</strong></p>
<p>لا تستطيع GitHub وStripe وما شابههما الوصول إلى بوابة موجودة على شبكة tailnet وحدها، كما في <a href="https://stevekinney.com/courses/openclaw/running-openclaw-on-railway-with-tailscale">درس Railway</a>. ولا تزال خطافات الويب تعمل من الأجهزة داخل شبكة tailnet. وللخدمات الخارجية، فإن أتمتة تستطلع الحالة هي الخيار الأكثر أمانًا عادةً.</p>
</blockquote>
<h2 id="جربها">جرّبها</h2>
<p>كل هذه تُشغَّل مقابل بوابتك الحقيقية.</p>
<h3 id="1-جرد-ما-لديك">1. جرد ما لديك</h3>
<p>قبل إضافة أي شيء، انظر ما يعمل بالفعل:</p>
<pre><code class="language-bash">openclaw automations list --all
openclaw audit --<span class="hljs-built_in">limit</span> 20
</code></pre>
<p>ثم، في محادثة مع وكيلك:</p>
<pre><code>/subagents list
/goal
</code></pre>
<p>ينبغي أن ترى على الأقل مهمة نبضة النظام في قائمة الأتمتات. ودوّن أي شيء لا تعرفه واكتشف ما الذي أنشأه.</p>
<h3 id="2-امض-بهدف-عبر-محادثة">2. امضِ بهدف عبر محادثة</h3>
<p>اختر شيئًا يستغرق بضعة أدوار، مثل خطة ترحيل المدوّنة أعلاه. ابدأه بـ <code>/goal start ...</code>، واعمل عليه ثلاث أو أربع رسائل، وافحص <code>/goal</code> في الطريق لترى الحالة واستخدام الرموز (tokens). أوقفه مؤقتًا، وأرسل رسالة غير ذات صلة، وأكّد أن الوكيل لا يواصل العمل على الهدف. ثم استأنفه، وأنهِه، ونفّذ <code>/goal complete</code>.</p>
<p>ثم ابدأ هدفًا آخر وأرسل <code>/new</code>. ونفّذ <code>/goal</code> وأكّد أنه اختفى.</p>
<h3 id="3-اضبط-نية-قائمة-وأطلقها">3. اضبط نية قائمة وأطلقها</h3>
<p>من Telegram، بصفتك مالك الأوامر:</p>
<blockquote>
<p>حين أذكر «طبيب الأسنان»، ذكّرني بأنني بحاجة إلى إعادة جدولة تنظيف أسناني.</p>
</blockquote>
<p>ثم أرسل رسالة تذكر طبيب أسنانك. وينبغي أن يطرح الوكيل التذكير. وأرسل أخرى في الحال؛ فمهلة التهدئة البالغة 24 ساعة تعني أنه لا ينبغي أن يذكّرك مرة أخرى. واطلب من الوكيل أن يسرد نواياك القائمة وأكّد أن النية تُظهر أنها أُطلقت مرة. ثم اطلب منه إلغاء النية، واسردها مرة أخرى لتأكيد إلغائها.</p>
<h3 id="4-أرسل-خطاف-ويب-إلى-بوابتك">4. أرسل خطاف ويب إلى بوابتك</h3>
<p>فعّل الخطافات بالإعداد أعلاه، ثم تحقّق وأعد التشغيل. ونفّذ هذه على مضيف البوابة:</p>
<pre><code class="language-bash">openclaw config validate
openclaw gateway restart
</code></pre>
<p>من مضيف البوابة، أرسل حدث اختبار ينتظر النتيجة لكنه لا يوصّل شيئًا إلى محادثتك:</p>
<pre><code class="language-bash">curl --include http://127.0.0.1:18789/hooks/agent \\
  -H <span class="hljs-string">&#x27;Authorization: Bearer &lt;long-random-hook-token&gt;&#x27;</span> \\
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \\
  -H <span class="hljs-string">&#x27;Idempotency-Key: webhook-smoke-001&#x27;</span> \\
  --data <span class="hljs-string">&#x27;{&quot;message&quot;:&quot;Summarize this test event: the sample import completed.&quot;,&quot;name&quot;:&quot;Webhook smoke test&quot;,&quot;agentId&quot;:&quot;main&quot;,&quot;deliver&quot;:false,&quot;waitForCompletion&quot;:true}&#x27;</span>
</code></pre>
<p>ينبغي أن تحصل على HTTP <code>200</code> مع <code>runId</code> وكائن <code>completion</code> حالته <code>ok</code>. وأرسل الطلب نفسه تمامًا مرة أخرى: فلأن مفتاح إعادة الأثر يطابق، تحصل على <code>runId</code> نفسه بدلًا من تشغيل ثانٍ. ثم جرّب طلبًا برمز خاطئ وأكّد أنه مرفوض.</p>
<p>وفي قالب <a href="https://railway.com/?referralCode=kinney">Railway</a>، نفّذ هذه عبر <code>railway ssh --service openclaw -- ...</code>. وإن كنت لا تخطّط لاستخدام خطافات الويب، فأعِد <code>hooks.enabled</code> إلى <code>false</code> بعد ذلك.</p>
<h3 id="5-إن-كنت-قد-استخدمت-taskflow-سابقا">5. إن كنت قد استخدمت TaskFlow سابقًا</h3>
<p>نفّذ <code>openclaw doctor</code>. وإن أفاد بـ <code>plugin removed: webhooks</code>، فنفّذ <code>openclaw doctor --fix</code> لتنظيف الإعداد القديم. ثم أعِد بناء أي شيء كان يعتمد على السيور باستخدام الجدول في أعلى هذا الدرس.</p>
<blockquote>
<p><strong>الأوامر والأعلام تتغيّر</strong></p>
<p>هذا الدرس يطابق OpenClaw <code>2026.9.8</code>. وإن لم يتصرّف شيء كما هو موصوف، فنفّذ الأمر مع <code>--help</code> وتفقّد <a href="https://docs.openclaw.ai/">وثائق OpenClaw</a>.</p>
</blockquote>
`,p={book:n,chapter:t,chapterTitle:o,slug:e,title:s,headings:a,html:d};export{n as book,t as chapter,o as chapterTitle,p as default,a as headings,d as html,e as slug,s as title};
