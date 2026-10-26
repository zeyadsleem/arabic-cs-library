const e="kinney",o="openclaw",s="OpenClaw: مساعدك الذكي الشخصي",t="lobster-workflows",n="سير عمل Lobster",d=[{depth:2,id:"تثبيته",text:"تثبيته"},{depth:2,id:"خطوط-الأنابيب",text:"خطوط الأنابيب"},{depth:2,id:"ملفات-سير-العمل",text:"ملفات سير العمل"},{depth:2,id:"تشغيل-lobster-من-وكيلك",text:"تشغيل Lobster من وكيلك"},{depth:3,id:"كيف-تعمل-الموافقة",text:"كيف تعمل الموافقة"},{depth:2,id:"ما-ينبغي-الحذر-منه",text:"ما ينبغي الحذر منه"},{depth:2,id:"جربه",text:"جرّبه"},{depth:3,id:"1-التثبيت-واختبار-سريع",text:"1. التثبيت واختبار سريع"},{depth:3,id:"2-إعداد-مختبر",text:"2. إعداد مختبر"},{depth:3,id:"3-الموافقة-على-تشغيل",text:"3. الموافقة على تشغيل"},{depth:3,id:"4-ارفض-واحدا-ثم-حاول-إعادة-استخدامه",text:"4. ارفض واحدًا، ثم حاول إعادة استخدامه"},{depth:3,id:"5-تمرير-وسائط-وعدم-العثور-على-شيء",text:"5. تمرير وسائط، وعدم العثور على شيء"},{depth:3,id:"6-ضعه-على-جدول-زمني",text:"6. ضعه على جدول زمني"},{depth:3,id:"7-اكتشف-كيف-يتعامل-lobster-مع-سياسة-التنفيذ-لديك",text:"7. اكتشف كيف يتعامل Lobster مع سياسة التنفيذ لديك"},{depth:3,id:"التنظيف",text:"التنظيف"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"}],c=`<p>حين يؤدّي وكيلك مهمة متعدّدة الخطوات من تلقاء نفسه، يقرّر النموذج كل خطوة: يستدعي أداة، ويقرأ النتيجة، ويقرّر ما التالي، ويستدعي أداة أخرى. هذا مرن، لكنه بطيء، ويكلّف رموزًا (tokens) في كل ذهاب وإياب، وقد يفعل الأشياء بترتيب مختلف قليلًا في كل مرة.</p>
<p><strong>Lobster</strong> مخصّص للمهام التي تعرف خطواتها مسبقًا. فهو يشغّل خط أنابيب كاملًا في <strong>نداء أداة واحد</strong>، ويمرّر بيانات منظّمة من خطوة إلى أخرى، و<strong>يتوقّف لأخذ موافقتك</strong> قبل أي خطوة تغيّر شيئًا. وحين توافق، يستأنف من حيث توقّف دون إعادة تشغيل الخطوات السابقة.</p>
<p>وهو أيضًا حيث انتهت مهمة TaskFlow. فوثائق TaskFlow القديمة تُعيد التوجيه الآن إلى Lobster. راجع <a href="https://stevekinney.com/courses/openclaw/choosing-an-orchestration-tool">اختيار أداة تنسيق</a> للقصة كاملة.</p>
<h2 id="تثبيته">تثبيته</h2>
<p>Lobster إضافة رسمية، لكنه لا يأتي مع OpenClaw. ثبّته على مضيف البوابة:</p>
<pre><code class="language-bash">openclaw plugins install @openclaw/lobster
openclaw plugins inspect lobster --runtime --json
</code></pre>
<p>تلتقط البوابة العاملة الإضافة من تلقاء نفسها. و<code>inspect</code> وحدها تفحص بيان الإضافة وتهيئتها فقط، أما <code>--runtime</code> فتحمّلها فعلًا وتؤكّد أنها سجّلت أداة <code>lobster</code>.</p>
<p>بعد ذلك، اسمح بالأداة. فـ Lobster أداة اختيارية، ولا تُدرَج إلا إذا أضفتها. افحص أولًا ما تسمح به بالفعل، لأن تعيين القائمة يستبدله:</p>
<pre><code class="language-bash">openclaw config get tools.alsoAllow
openclaw config <span class="hljs-built_in">set</span> tools.alsoAllow <span class="hljs-string">&#x27;[&quot;lobster&quot;]&#x27;</span>
</code></pre>
<p>إذا طبعت الأوامر الأولى مُدخلات (مثل <code>browser</code> من <a href="https://stevekinney.com/courses/openclaw/browser-setup-and-use">درس المتصفّح</a>)، فأدرجها في القائمة الجديدة. وللسماح لـ Lobster لوكيل واحد فقط، عيّن <code>agents.entries.&lt;id&gt;.tools.alsoAllow</code> بدلًا من ذلك.</p>
<blockquote>
<p><strong>غير متاح في الجلسات المعزولة</strong></p>
<p>تُعطَّل أداة <code>lobster</code> تمامًا في الجلسات المعزولة. وإن كنت قد اتّبعت قسم العزل في <a href="https://stevekinney.com/courses/openclaw/security-and-approvals#layer-4-sandboxing">الأمن والموافقات</a>، فاستخدم Lobster من جلستك الرئيسية غير المعزولة.</p>
</blockquote>
<h2 id="خطوط-الأنابيب">خطوط الأنابيب</h2>
<p>أصغر برنامج Lobster هو خط أنابيب من سطر واحد. تُضمّ الخطوات بـ <code>|</code>، وتتدفّق البيانات بينها بصيغة JSON لا كنص:</p>
<pre><code>exec --json --shell 'echo [3,1,2]' | sort
</code></pre>
<p>يشغّل <code>exec --json</code> أمر طرفية ويحلّل خرجه بصيغة JSON. و<code>sort</code> ترتّبه. والنتيجة هي <code>[1, 2, 3]</code>.</p>
<p>أضف <code>approve</code> فيتوقّف خط الأنابيب قبل المتابعة:</p>
<pre><code>exec --json --shell 'echo [3,1,2]' | sort | approve --preview-from-stdin --limit 5 --prompt 'Keep going?'
</code></pre>
<p>فبدلًا من أن ينتهي، تُعيد الأداة حالة <code>needs_approval</code>، والمطالبة، ومعاينة للبيانات، وطريقتين للاستئناف: <code>resumeToken</code> طويل و<code>approvalId</code> قصير.</p>
<p>تُظهر محادثة واجهة التحكم نتيجة lobster بحالة needs_approval، ومطالبة Keep going، ومعاينة من ثلاثة عناصر، ورمز استئناف، ومعرّف موافقة</p>
<h2 id="ملفات-سير-العمل">ملفات سير العمل</h2>
<p><img src="/arabic-cs-library/images/kinney/470e864930a9d4ef.webp" alt="محادثة Control UI تعرض نتيجة lobster بحالة needs_approval، ومطالبة Keep going، ومعاينة من ثلاثة عناصر، ورمز استئناف، ومعرّف موافقة."></p>
<p>كل ما يزيد على بضع خطوات يستحق أن يوضع في ملف سير عمل. وهذا ملف ينظّف ملفات <code>.tmp</code> في مجلد، لكن فقط بعد أن ترى القائمة:</p>
<pre><code class="language-yaml"><span class="hljs-attr">name:</span> <span class="hljs-string">tidy-scratch</span>
<span class="hljs-attr">args:</span>
  <span class="hljs-attr">dir:</span>
    <span class="hljs-attr">default:</span> <span class="hljs-string">/tmp/lobster-lab</span>
<span class="hljs-attr">steps:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">id:</span> <span class="hljs-string">find</span>
    <span class="hljs-attr">command:</span> <span class="hljs-string">find</span> <span class="hljs-string">&quot;$LOBSTER_ARG_DIR&quot;</span> <span class="hljs-string">-name</span> <span class="hljs-string">&#x27;*.tmp&#x27;</span> <span class="hljs-string">-type</span> <span class="hljs-string">f</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">id:</span> <span class="hljs-string">preview</span>
    <span class="hljs-attr">command:</span> <span class="hljs-string">echo</span> <span class="hljs-string">&quot;Files to delete:&quot;</span> <span class="hljs-string">&amp;&amp;</span> <span class="hljs-string">cat</span>
    <span class="hljs-attr">stdin:</span> <span class="hljs-string">$find.stdout</span>
    <span class="hljs-attr">condition:</span> <span class="hljs-string">$find.stdout</span> <span class="hljs-type">!=</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-attr">approval:</span> <span class="hljs-string">required</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">id:</span> <span class="hljs-string">delete</span>
    <span class="hljs-attr">command:</span> <span class="hljs-string">xargs</span> <span class="hljs-string">rm</span> <span class="hljs-string">-v</span>
    <span class="hljs-attr">stdin:</span> <span class="hljs-string">$find.stdout</span>
    <span class="hljs-attr">condition:</span> <span class="hljs-string">$preview.approved</span>
</code></pre>
<p>ما الذي يفعله كل جزء:</p>
<ul>
<li><strong><code>args</code></strong> هي مدخلات سير العمل، مع قيمها الافتراضية. وكل واحد منها متاح للأوامر كمتغيّر بيئة باسم <code>LOBSTER_ARG_&lt;NAME&gt;</code>، فيصبح <code>dir</code> هو <code>LOBSTER_ARG_DIR</code>. وكلها مجتمعة في <code>LOBSTER_ARGS_JSON</code>.</li>
<li><strong><code>command</code></strong> أمر طرفية يُشغَّل على مضيف البوابة.</li>
<li><strong><code>stdin: $find.stdout</code></strong> يغذّي خطوةً بخرج خطوة أخرى. واستخدم <code>$step.json</code> بدلًا منه حين تطبع خطوة بصيغة JSON، و<code>$step.json.&lt;field&gt;</code> لانتقاء حقل بعينه.</li>
<li><strong><code>condition</code></strong> يقرّر ما إذا كانت الخطوة ستُشغَّل. وهنا تُتخطّى <code>preview</code> حين لا يجد <code>find</code> شيئًا، فلا يُطلب منك أبدًا الموافقة على قائمة فارغة.</li>
<li><strong><code>approval: required</code></strong> يوقف سير العمل بعد تشغيل هذه الخطوة ويعرض خرجها كمعاينة.</li>
<li><strong><code>$preview.approved</code></strong> لا يكون صحيحًا إلا بعد أن توافق، فلا تُشغَّل <code>delete</code> إلا بعد أن تقول نعم.</li>
</ul>
<p>تستخدم ملفات سير العمل الامتداد <code>.lobster</code> (وهي YAML)، وتعمل أيضًا <code>.yaml</code> و<code>.yml</code> و<code>.json</code>.</p>
<blockquote>
<p><strong>خطوة الموافقة نفسها تُشغَّل قبل التوقّف</strong></p>
<p>تعني <code>approval: required</code> «توقّف <em>بعد</em> هذه الخطوة»، لا «اسأل قبل تشغيلها». فأمر الخطوة نفسه يُشغَّل أولًا، حتى يكون خرجه هو المعاينة. اجعل خطوات الموافقة للقراءة فقط، مثل <code>echo</code> أعلاه، وضع التغيير الحقيقي في خطوة لاحقة مشروطة بـ <code>$&lt;step&gt;.approved</code>. والمثال في وثائق OpenClaw نفسه يضع <code>inbox apply --approve</code> على خطوة الموافقة، وهذا يعني أنه سيُشغَّل قبل أن تُسأل.</p>
</blockquote>
<h2 id="تشغيل-lobster-من-وكيلك">تشغيل Lobster من وكيلك</h2>
<p>أنت لا تستدعي Lobster مباشرةً. بل يفعل وكيلك ذلك باستخدام أداة <code>lobster</code>:</p>
<table>
<thead>
<tr>
<th>المعامل</th>
<th>الافتراضي</th>
<th>ما الذي يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>action</code></td>
<td>—</td>
<td><code>run</code> أو <code>resume</code></td>
</tr>
<tr>
<td><code>pipeline</code></td>
<td>—</td>
<td>خط أنابيب مضمّن، أو مسار ملف سير عمل</td>
</tr>
<tr>
<td><code>argsJson</code></td>
<td>—</td>
<td>وسائط لملف سير عمل، كسلسلة JSON. تُتجاهل بالنسبة لخطوط الأنابيب</td>
</tr>
<tr>
<td><code>cwd</code></td>
<td>مجلد البوابة</td>
<td>مجلد عمل، نسبي إلى مجلد البوابة نفسه</td>
</tr>
<tr>
<td><code>timeoutMs</code></td>
<td><code>20000</code></td>
<td>المدة التي قد يستغرقها التشغيل</td>
</tr>
<tr>
<td><code>maxStdoutBytes</code></td>
<td><code>512000</code></td>
<td>مقدار الخرج الذي قد ينتجه التشغيل</td>
</tr>
<tr>
<td><code>token</code> أو <code>approvalId</code></td>
<td>—</td>
<td>أي تشغيل متوقّف تستأنفه</td>
</tr>
<tr>
<td><code>approve</code></td>
<td>—</td>
<td><code>true</code> للمتابعة، و<code>false</code> للإلغاء</td>
</tr>
</tbody>
</table>
<p>عمليًا، تطلب بلغة عادية: «استخدم أداة lobster لتشغيل <code>~/.openclaw/workspace/workflows/tidy-scratch.lobster</code>».</p>
<h3 id="كيف-تعمل-الموافقة">كيف تعمل الموافقة</h3>
<p>حين يتوقّف تشغيل، يستعيد الوكيل المطالبة والمعاينة ومعرّفات الاستئناف، وينقلها إليك في المحادثة. فتجيبه، فيستدعي الوكيل <code>lobster</code> مرة أخرى بـ <code>action: &quot;resume&quot;</code>:</p>
<ul>
<li><strong>وافق</strong>، فيتابع التشغيل من الخطوة المتوقّفة. ولا تُشغَّل الخطوات السابقة مرة أخرى.</li>
<li><strong>ارفض</strong>، فينتهي التشغيل بحالة <code>cancelled</code>.</li>
<li><strong>وفي الحالتين، يُستهلك معرّف الاستئناف.</strong> فمحاولة استخدامه مرة أخرى تفشل لأن الحالة المحفوظة قد ذهبت.</li>
</ul>
<p>تُحفظ الحالة المتوقّفة كملفات صغيرة في <code>~/.lobster/state</code> على مضيف البوابة. والرمز ليس إلا مؤشّرًا إلى تلك الملفات، فلا تُفرغ ذلك المجلد بينما شيء ما ينتظرك.</p>
<p>وهذا ليس مثل <a href="https://stevekinney.com/courses/openclaw/security-and-approvals#layer-3-exec-approvals">موافقة تنفيذ</a>. فتوقّف Lobster لا ينتج بطاقة موافقة في واجهة التحكم ولا إشعارًا منبثقًا، ولا يظهر في <code>openclaw approvals pending</code>. وهو لا يوجد إلا كرسالة الوكيل إليك.</p>
<h2 id="ما-ينبغي-الحذر-منه">ما ينبغي الحذر منه</h2>
<ul>
<li><strong>الخطوات تُشغَّل على مضيف البوابة ببيئة البوابة.</strong> وهذا يشمل أي مفاتيح API فيها. والوثائق لا تقول إن خطوات طرفية Lobster تمرّ عبر موافقات التنفيذ، فتعامل مع ملف سير العمل كسكربت قد تشغّله بنفسك: لا تشغّل إلا ما قرأته.</li>
<li><strong><code>openclaw.invoke</code> لا يعمل بموثوقية داخل الإضافة.</strong> فلـ Lobster أمر لاستدعاء أدوات OpenClaw من خط أنابيب، لكن الإضافة المضمّنة لا تمرّر عنوان البوابة ولا بيانات اعتمادها. وإلى أن يُصلَح ذلك، أبقِ نداءات الأدوات (ومنها <a href="https://stevekinney.com/courses/openclaw/llm-task">مهمة LLM</a>) خارج سير عملك، ودع الوكيل يجريها مباشرةً.</li>
<li><strong>لا إعادة محاولات تلقائية.</strong> فإن فشلت خطوة بعد أن فعلت شيئًا، لن يشغّلها Lobster مرة أخرى، لأنه لا يستطيع تحديد ما إذا كان الأثر الجانبي قد وقع بالفعل.</li>
<li><strong>المسارات.</strong> يجب أن يكون <code>cwd</code> مسارًا نسبيًا داخل مجلد عمل البوابة. أما مسار ملف سير العمل فيمكن أن يكون مطلقًا، وهو الخيار الأبسط. واستخدم مسارات مطلقة داخل الأوامر أيضًا، لأنك قد لا تعرف مجلد عمل البوابة.</li>
<li><strong>المهلات الزمنية.</strong> الافتراضي هو 20 ثانية لكل تشغيل. فارفع <code>timeoutMs</code> لأي شيء بطيء.</li>
</ul>
<h2 id="جربه">جرّبه</h2>
<p>شغّل هذه على بوابتك الحقيقية. وفي قالب <a href="https://railway.com/?referralCode=kinney">Railway</a>، شغّل أوامر الطرفية عبر <code>railway ssh --service openclaw -- ...</code>، وتذكّر أن <code>/tmp</code> هناك داخل الحاوية.</p>
<h3 id="1-التثبيت-واختبار-سريع">1. التثبيت واختبار سريع</h3>
<p>ثبّت الإضافة، واسمح بالأداة، وأكّد أنها حُمّلت بـ <code>openclaw plugins inspect lobster --runtime --json</code>. ثم اطلب من وكيلك:</p>
<blockquote>
<p>استخدم أداة lobster لتشغيل خط الأنابيب هذا وأرِني النتيجة الخام: <code>exec --json --shell 'echo [3,1,2]' | sort</code></p>
</blockquote>
<p>ينبغي أن ترى حالة <code>ok</code> وخرجًا هو <code>[1, 2, 3]</code>. وإن قال الوكيل إنه لا يملك أداة <code>lobster</code>، فافحص <code>tools.alsoAllow</code> وأرسل <code>/tools</code> لترى ما يستطيع استخدامه.</p>
<p><img src="/arabic-cs-library/images/kinney/dc86b7963be18a22.webp" alt="تُظهر محادثة واجهة التحكم نتيجة أداة lobster بحالة ok وخرج هو 1, 2, 3"></p>
<h3 id="2-إعداد-مختبر">2. إعداد مختبر</h3>
<p>على مضيف البوابة، أنشئ بعض الملفات لتنظيفها:</p>
<pre><code class="language-bash"><span class="hljs-built_in">mkdir</span> -p /tmp/lobster-lab
<span class="hljs-built_in">touch</span> /tmp/lobster-lab/a.tmp /tmp/lobster-lab/b.tmp /tmp/lobster-lab/keep.txt
</code></pre>
<p>احفظ سير عمل <code>tidy-scratch</code> من أعلاه باسم <code>~/.openclaw/workspace/workflows/tidy-scratch.lobster</code>. ويمكنك أيضًا لصقه إلى وكيلك وأن تطلب منه حفظ الملف هناك.</p>
<h3 id="3-الموافقة-على-تشغيل">3. الموافقة على تشغيل</h3>
<p>اطلب من وكيلك:</p>
<blockquote>
<p>استخدم أداة lobster لتشغيل سير العمل في <code>~/.openclaw/workspace/workflows/tidy-scratch.lobster</code>. وإن توقّف لأخذ الموافقة، فأرِني المعاينة وانتظر إجابتي.</p>
</blockquote>
<p>ينبغي أن ترى معاينة تسرد <code>a.tmp</code> و<code>b.tmp</code>، لكن ليس <code>keep.txt</code>. وأجب بأنك توافق. فيستأنف الوكيل التشغيل، وينبغي أن يُظهر <code>ls /tmp/lobster-lab</code> الملف <code>keep.txt</code> وحده.</p>
<h3 id="4-ارفض-واحدا-ثم-حاول-إعادة-استخدامه">4. ارفض واحدًا، ثم حاول إعادة استخدامه</h3>
<p>أعد إنشاء ملفات <code>.tmp</code> وشغّل سير العمل مرة أخرى. وهذه المرة، ارفضه. ينبغي أن يعود التشغيل بحالة <code>cancelled</code>، وأن تبقى الملفات في مكانها. ثم اطلب من الوكيل أن يستأنف التشغيل نفسه مرة أخرى بموافقة. ينبغي أن يفشل، لأن معرّف الاستئناف يعمل مرة واحدة فقط.</p>
<h3 id="5-تمرير-وسائط-وعدم-العثور-على-شيء">5. تمرير وسائط، وعدم العثور على شيء</h3>
<p>أنشئ مجلدًا ثانيًا فيه ملف واحد، <code>/tmp/lobster-other/c.tmp</code>، واطلب من الوكيل تشغيل سير العمل مع <code>argsJson</code> مضبوطًا على <code>{&quot;dir&quot;:&quot;/tmp/lobster-other&quot;}</code>. ينبغي أن تسرد المعاينة <code>c.tmp</code> وحده. فارفضه.</p>
<p>ثم شغّل سير العمل على <code>/tmp/lobster-lab</code> بعد أن نُظّف. ينبغي أن ينتهي بـ <code>ok</code> وألا يسألك شيئًا أبدًا، لأن <code>condition</code> تخطّى خطوة المعاينة.</p>
<h3 id="6-ضعه-على-جدول-زمني">6. ضعه على جدول زمني</h3>
<p>أنشئ أتمتة تشغّل سير العمل كل مساء وتعلن النتيجة إلى Telegram:</p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 21 * * *&quot;</span> \\
  <span class="hljs-string">&quot;Use the lobster tool to run ~/.openclaw/workspace/workflows/tidy-scratch.lobster. If it needs approval, tell me what it found and include the approval ID.&quot;</span> \\
  --name <span class="hljs-string">&quot;Tidy scratch&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p>استخدم <code>openclaw automations run &lt;job-id&gt; --wait</code> لتجربته الآن بدلًا من الانتظار. ينبغي أن تصلك رسالة Telegram فيها المعاينة ومعرّف موافقة. وأجب في محادثتك الرئيسية طالبًا من الوكيل استئناف معرّف الموافقة ذاك. ثم افحص هل ذهبت الملفات.</p>
<p>هذا جدير بالاختبار لا بالافتراض. فالتشغيل الذي وجد الملفات يكون قد انتهى بحلول وقت إجابتك، فيجري الاستئناف في محادثة مختلفة. والحالة المحفوظة تعيش على مضيف البوابة لا في المحادثة، فينبغي أن يعمل هذا، لكن أكّده في تهيئتك قبل الاعتماد عليه.</p>
<h3 id="7-اكتشف-كيف-يتعامل-lobster-مع-سياسة-التنفيذ-لديك">7. اكتشف كيف يتعامل Lobster مع سياسة التنفيذ لديك</h3>
<p>إن كنت قد أعددت وضع <code>ask</code> في <a href="https://stevekinney.com/courses/openclaw/security-and-approvals">الأمن والموافقات</a>، فشغّل سير العمل وراقب ظهور بطاقات موافقة التنفيذ. والوثائق لا تقول هل تمرّ خطوات طرفية Lobster عبر موافقات التنفيذ. سجّل ما تراه. فإن لم تظهر أي بطاقات، فخطوات Lobster تعمل دون تلك الشبكة الأمنية، وهذا سبب آخر لتشغيل ملفات سير العمل التي قرأتها فقط.</p>
<h3 id="التنظيف">التنظيف</h3>
<p>احذف <code>/tmp/lobster-lab</code> و<code>/tmp/lobster-other</code>، وعطّل الأتمتة بـ <code>openclaw automations disable &lt;job-id&gt;</code> إن كنت لا تريدها.</p>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<table>
<thead>
<tr>
<th>الخطأ</th>
<th>ما ينبغي فعله</th>
</tr>
</thead>
<tbody>
<tr>
<td>الوكيل لا يملك أداة <code>lobster</code></td>
<td>أضفها إلى <code>tools.alsoAllow</code>. وتأكّد أن الجلسة ليست معزولة</td>
</tr>
<tr>
<td><code>lobster runtime timed out</code></td>
<td>ارفع <code>timeoutMs</code>، أو قسّم العمل إلى خطوط أنابيب أصغر</td>
</tr>
<tr>
<td><code>lobster stdout exceeded maxStdoutBytes</code></td>
<td>ارفع <code>maxStdoutBytes</code>، أو اجعل الخطوات تطبع أقل</td>
</tr>
<tr>
<td><code>run --args-json must be valid JSON</code></td>
<td>صوّب الاقتباس في <code>argsJson</code></td>
</tr>
<tr>
<td>فشل استئناف بـ «not found»</td>
<td>كان التشغيل قد وُوفق عليه أو رُفض، أو حُذفت حالته</td>
</tr>
<tr>
<td><code>lobster runtime failed</code></td>
<td>افحص <code>openclaw logs</code> على مضيف البوابة</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>الأوامر والأعلام تتغيّر</strong></p>
<p>يطابق هذا الدرس OpenClaw <code>2026.9.8</code> وإضافة <code>@openclaw/lobster</code> في تلك الإصدارة. فإن لم يتصرّف شيء كما هو موصوف، فشغّل الأمر مع <code>--help</code> وافحص <a href="https://docs.openclaw.ai/">وثائق OpenClaw</a>.</p>
</blockquote>
`,a={book:e,chapter:o,chapterTitle:s,slug:t,title:n,headings:d,html:c};export{e as book,o as chapter,s as chapterTitle,a as default,d as headings,c as html,t as slug,n as title};
