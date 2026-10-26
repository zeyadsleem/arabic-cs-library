const n="kinney",t="openclaw",o="OpenClaw: مساعدك الذكي الشخصي",s="automation-ideas",e="أفكار أتمتة يمكنك تجربتها",a=[{depth:2,id:"المكونات-الأساسية",text:"المكوّنات الأساسية"},{depth:3,id:"الجدولة-في-ثلاثين-ثانية",text:"الجدولة في ثلاثين ثانية"},{depth:2,id:"القواعد-الأساسية",text:"القواعد الأساسية"},{depth:2,id:"الإيقاعات-اليومية",text:"الإيقاعات اليومية"},{depth:3,id:"1-الموجز-الصباحي",text:"1. الموجز الصباحي"},{depth:3,id:"2-نظرة-المساء-إلى-الغد",text:"2. نظرة المساء إلى الغد"},{depth:3,id:"3-فرز-البريد-المرقم-بموافقات-من-كلمة-واحدة",text:"3. فرز البريد المرقّم بموافقات من كلمة واحدة"},{depth:2,id:"مراقبون-يبقون-صامتين",text:"مراقبون يبقون صامتين"},{depth:3,id:"4-مراقب-أسعار-الموردين-وشروطهم",text:"4. مراقب أسعار المورّدين وشروطهم"},{depth:3,id:"5-مراقب-لا-يوقظ-النموذج-إلا-عندما-يهم-الأمر",text:"5. مراقب لا يوقظ النموذج إلا عندما يهم الأمر"},{depth:3,id:"6-أخبرني-عندما-ينتهي-البناء",text:"6. أخبرني عندما ينتهي البناء"},{depth:3,id:"7-المراقب-السريع",text:"7. المراقب السريع"},{depth:2,id:"استخدام-المتصفح",text:"استخدام المتصفح"},{depth:3,id:"8-موجز-أسبوعي-للرائج",text:"8. موجز أسبوعي للرائج"},{depth:3,id:"9-جولة-ضمان-جودة-ليلية-على-موقعك",text:"9. جولة ضمان جودة ليلية على موقعك"},{depth:2,id:"معرفتك-الخاصة",text:"معرفتك الخاصة"},{depth:3,id:"10-تدقيق-شهري-للذاكرة",text:"10. تدقيق شهري للذاكرة"},{depth:3,id:"11-مسودة-حالة-أسبوعية",text:"11. مسوّدة حالة أسبوعية"},{depth:2,id:"مع-جهاز-mac",text:"مع جهاز Mac"},{depth:3,id:"12-ملخص-نهاية-اليوم-للمطور",text:"12. ملخص نهاية اليوم للمطوّر"},{depth:2,id:"مع-وكلاء-البرمجة",text:"مع وكلاء البرمجة"},{depth:3,id:"13-صيانة-ليلية-في-نسخة-عمل-مؤقتة",text:"13. صيانة ليلية في نسخة عمل مؤقتة"},{depth:3,id:"14-رأي-ثان-على-كل-diff",text:"14. رأي ثانٍ على كل diff"},{depth:2,id:"أفكار-ينبغي-الحذر-منها",text:"أفكار ينبغي الحذر منها"},{depth:2,id:"اختيار-أفكارك-الثلاث-الأولى",text:"اختيار أفكارك الثلاث الأولى"},{depth:2,id:"التعايش-مع-أتمتاتك",text:"التعايش مع أتمتاتك"}],d=`<p>بمجرد أن تستطيع التحدث إلى وكيلك في Telegram، يبدأ الجزء الممتع: أن تجعله يفعل أشياء مفيدة بينما لا تنظر. هذا الدرس قائمة أفكار. اقرأها، واختر فكرة أو فكرتين تناسبان حياتك، ثم أعدّهما بالترتيب من الأسهل إلى الأصعب.</p>
<p>كل فكرة لها البنية نفسها:</p>
<ul>
<li><strong>ما تحصل عليه</strong> هو جوهر الفكرة.</li>
<li><strong>مبنيّ من</strong> يسمّي المكوّنات التي تستخدمها.</li>
<li><strong>جرّبها</strong> أمر أو توجيه للبدء.</li>
<li><strong>حواجز الحماية</strong> هي ما يمنعها من الانحراف.</li>
</ul>
<blockquote>
<p><strong>بعض الأفكار تحتاج مكوّنات من دروس لاحقة</strong></p>
<p>يأتي هذا الدرس مبكرًا كي تبدأ بالجدولة فورًا، لكن أفكارًا كثيرة تستخدم أشياء تُهيّئها دروس لاحقة: <a href="https://stevekinney.com/courses/openclaw/gmail-and-google-calendar-integration">Gmail وGoogle Calendar</a>، و<a href="https://stevekinney.com/courses/openclaw/browser-setup-and-use">المتصفح</a>، و<a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">جهاز Mac مقترن</a>، و<a href="https://stevekinney.com/courses/openclaw/acpx-runtime-plugin">وكلاء البرمجة</a>. يُظهر عمود <strong>Needs</strong> في <a href="#picking-your-first-three">اختيار أفكارك الثلاث الأولى</a> ما تتطلبه كل فكرة. ابدأ بالأفكار التي تحتاج فقط إلى جدول زمني ومحادثة، وعُد إلى البقية تدريجيًا.</p>
</blockquote>
<blockquote>
<p><strong>تعامل مع الأوامر كمسوّدات</strong></p>
<p>تستند خيارات الجدولة هنا إلى توثيق OpenClaw للإصدار <code>2026.9.8</code>، لكنني لم أُشغّل كل خيار منها على Gateway حيّ. وإذا لم يتصرف خيار كما هو موضّح، فشغّل الأمر مع <code>--help</code>. كثير من الأفكار أيضًا مقتبسة من كتابات المجتمع، وهي تقرير شخص واحد عن إعداده الخاص وليست شيئًا تحقّق منه المشروع.</p>
</blockquote>
<h2 id="المكونات-الأساسية">المكوّنات الأساسية</h2>
<p>كل فكرة تقريبًا أدناه هي مزيج من أشياء قليلة يفعلها OpenClaw بالفعل:</p>
<table>
<thead>
<tr>
<th>المكوّن</th>
<th>ما هو</th>
<th>الأنسب لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>أتمتة مجدولة</strong></td>
<td>مهمة مخزّنة تعمل وفق ساعة (<code>--cron</code> أو <code>--every</code> أو <code>--at</code>)</td>
<td>الموجزات والملخصات والتقارير الأسبوعية</td>
</tr>
<tr>
<td><strong>Heartbeat (النبضة الدورية)</strong></td>
<td>دورة متكررة على جلسة قائمة يُفترض أن تجيب عادةً بـ«لم يتغيّر شيء»</td>
<td>فحوص دورية خفيفة</td>
</tr>
<tr>
<td><strong><code>/loop</code></strong></td>
<td>اختصار في المحادثة لمهمة متكررة مرتبطة بالمحادثة الحالية</td>
<td>مراقبة سريعة ومؤقتة</td>
</tr>
<tr>
<td><strong>محفّزات الأحداث</strong></td>
<td>مهام تنطلق عندما ينتهي أمر، أو يطابق سطر في سجل، أو يطلب ذلك نص برمجي</td>
<td>«أخبرني عندما يحدث شيء ما»</td>
</tr>
<tr>
<td><strong>Webhooks (خطافات الويب)</strong></td>
<td>خدمة خارجية ترسل طلب POST إلى Gateway الخاص بك</td>
<td>أحداث من نوع الدفع (تحتاج عنوان URL يمكن الوصول إليه)</td>
</tr>
<tr>
<td><strong>القدرات</strong></td>
<td>Gmail وCalendar والمتصفح والذاكرة والعُقد المقترنة ووكلاء البرمجة عبر ACP</td>
<td>ما تفعله المهمة فعليًا</td>
</tr>
</tbody>
</table>
<h3 id="الجدولة-في-ثلاثين-ثانية">الجدولة في ثلاثين ثانية</h3>
<p>الأمر هو <code>openclaw automations</code> (والصيغة الأقدم <code>openclaw cron</code> تعمل أيضًا). وهناك طريقتان لكتابة الشيء نفسه. الأولى تضع الجدول والتوجيه في المقدمة:</p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 7 * * *&quot;</span> <span class="hljs-string">&quot;Summarize overnight updates.&quot;</span> \\
  --name <span class="hljs-string">&quot;Morning brief&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p>والثانية تفصّل كل شيء عبر الخيارات:</p>
<pre><code class="language-bash">openclaw automations add --name <span class="hljs-string">&quot;Calendar check&quot;</span> --at <span class="hljs-string">&quot;20m&quot;</span> \\
  --session main --system-event <span class="hljs-string">&quot;Next heartbeat: check calendar.&quot;</span> --wake now
</code></pre>
<p>وهناك خيارات قليلة تقوم بمعظم العمل:</p>
<ul>
<li><strong><code>--cron</code> و<code>--every</code> و<code>--at</code></strong> تحدد الجدول. ويمكن أن يكون الجدول تعبير cron، أو مدة مثل <code>20m</code>، أو فاصلًا مثل <code>every 1h</code>، أو طابعًا زمنيًا.</li>
<li><strong><code>--tz</code></strong> يضبط المنطقة الزمنية. اضبطه دائمًا لأي شيء مرتبط بيومك، وإلا صار «السابعة صباحًا» يعني السابعة صباحًا في المكان الذي يقيم فيه Gateway.</li>
<li><strong><code>--session isolated</code></strong> يمنح المهمة جلسة جديدة خاصة بها، فلا يتراكم السياق في محادثتك الرئيسية.</li>
<li><strong><code>--announce</code></strong> يوصّل النتيجة. استخدم <code>openclaw automations show &lt;job-id&gt;</code> بعد ذلك لترى بالضبط إلى أين ستذهب.</li>
</ul>
<p>وتدير المهام بالطريقة نفسها لكلها:</p>
<pre><code class="language-bash">openclaw automations list --all          <span class="hljs-comment"># every job, including disabled and system ones</span>
openclaw automations run &lt;job-id&gt; --<span class="hljs-built_in">wait</span> <span class="hljs-comment"># run it now and wait for the result</span>
openclaw automations runs &lt;job-id&gt;       <span class="hljs-comment"># run history</span>
openclaw automations <span class="hljs-built_in">disable</span> &lt;job-id&gt;    <span class="hljs-comment"># stop it without deleting it</span>
</code></pre>
<p>ويمكنك أيضًا أن تطلب من وكيلك، في Telegram، إنشاء واحدة. والمهام التي تُنشأ بهذه الطريقة محصورة بالأدوات المتاحة في المحادثة التي أنشأتها، وهذا حاجز حماية مدمج لطيف. شغّل <code>openclaw automations list</code> بعد ذلك للتحقق مما أنشأه فعلًا.</p>
<p>وإذا كنت تفضّل النقر على الكتابة، فإن واجهة التحكم (Control UI) فيها صفحة «الأتمتة» (Automations) بنموذج «أتمتة جديدة». يطلب الأشياء نفسها التي تطلبها الخيارات أعلاه: توجيهًا، واسمًا، وما إذا كانت المهمة تعمل في الجلسة الرئيسية أم في جلسة معزولة، وجدولًا على شكل فاصل زمني أو وقت واحد أو تعبير cron.</p>
<p><img src="/arabic-cs-library/images/kinney/c44cb1ec529ca24e.webp" alt="أعلى نموذج «أتمتة جديدة» في واجهة التحكم، مع مربع التوجيه متبوعًا بإعدادات الإجراء والنموذج اللغوي والاستدلال"></p>
<h2 id="القواعد-الأساسية">القواعد الأساسية</h2>
<p>تنطبق هذه القواعد على كل فكرة. وهي الفرق بين أتمتة تثق بها وأتمتة تُطفئها بعد أسبوع.</p>
<ol>
<li><strong>ابدأ للقراءة فقط.</strong> ابنِ النسخة التي تنظر وتُبلّغ فقط. وأضف الإجراءات لاحقًا، إن أضفتها أصلًا.</li>
<li><strong>شغّلها يدويًا أولًا.</strong> استخدم <code>openclaw automations run &lt;job-id&gt; --wait</code> واقرأ النتيجة قبل أن تُطلق جدولًا.</li>
<li><strong>جهّز مسوّدة ولا تُرسل.</strong> لأي شيء يغادر جهازك (بريد، رسائل، منشورات، مشتريات)، اطلب من الوكيل إنتاج مسوّدة والانتظار لك.</li>
<li><strong>اجعل الصمت ميزة.</strong> المهمة التي يكون ناتجها <code>NO_REPLY</code> فقط تُكتم. والمراقب الذي يتكلم كل يوم يُتجاهل. أما المراقب الذي يتكلم فقط عندما يتغير شيء فيُقرأ.</li>
<li><strong>تعامل مع ما يقرأه كبيانات.</strong> قد تحتوي رسائل البريد وصفحات الويب والمستندات على تعليمات موجّهة إلى وكيلك. اذكر ذلك في <code>AGENTS.md</code>، وأبقِ أذونات الأدوات أضيق ما تسمح به المهمة.</li>
<li><strong>انتبه للتكلفة.</strong> كل دورة نموذج مجدولة تستهلك رموزًا (tokens). والفحوص التي لا تحتاج إلى نموذج (هل الموقع يعمل، هل تغيّر الملف) ينبغي أن تستخدم أمرًا أو نصًا محفّزًا، لا دورة وكيل.</li>
<li><strong>اعرف ما يعمل بالفعل.</strong> Gateway الجديد لديه بالفعل مهام نظام، منها heartbeat كل 30 دقيقة (وكل ساعة عند إعداد Anthropic OAuth أو مصادقة رمزية، بما في ذلك إعادة استخدام تسجيل دخول Claude Code). شغّل <code>openclaw automations list --all</code> قبل أن تضيف مهامك.</li>
<li><strong>راقب الفشل الصامت.</strong> المهمة التي تتوقف بهدوء تبدو تمامًا كصندوق بريد هادئ. فعّل تنبيهات الفشل، وتفقّد سجل التشغيل من حين لآخر.</li>
<li><strong>خطّط للموافقات.</strong> إذا كانت الأوامر تتطلب موافقة، فإن طلب المهمة المجدولة يذهب فقط إلى تطبيق موافقات متصل، ويُرفض إن لم يكن هناك أي تطبيق متصل. شغّل المهمة مرة وأنت تراقب ووافق عليها باستخدام <strong>Always allow</strong>. والأوامر التي تعمل على عقدة مقترنة هي الاستثناء: فالمهام المجدولة لا تُظهر بطاقات موافقة لها أبدًا، لذا أدرج تلك الأوامر في قائمة السماح على العقدة مسبقًا. انظر <a href="https://stevekinney.com/courses/openclaw/security-and-approvals#when-nobodys-there">عندما لا يكون أحد موجودًا</a>.</li>
</ol>
<h2 id="الإيقاعات-اليومية">الإيقاعات اليومية</h2>
<h3 id="1-الموجز-الصباحي">1. الموجز الصباحي</h3>
<p><strong>ما تحصل عليه:</strong> رسالة قصيرة في السابعة صباحًا تتضمن جدول اليوم، وأي تعارضات، ورسائل البريد القليلة التي تحتاج إلى اهتمامك على الأرجح.</p>
<p><strong>مبنيّ من:</strong> أتمتة مجدولة، إضافة إلى <a href="https://stevekinney.com/courses/openclaw/gmail-and-google-calendar-integration">الوصول إلى Gmail وCalendar</a>.</p>
<p><strong>جرّبه:</strong></p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 7 * * 1-5&quot;</span> \\
  <span class="hljs-string">&quot;Check my Google Calendar for today and my Gmail for unread messages from the last 24 hours. Give me a short brief: my schedule, any conflicts, and the three emails most likely to need action. Read-only.&quot;</span> \\
  --name <span class="hljs-string">&quot;Morning brief&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p>ثم شغّله بنفسك باستخدام <code>run --wait</code> واقرأ الناتج قبل أن تثق بالجدول.</p>
<p><strong>حواجز الحماية:</strong> أبقِ بيانات اعتماد Google للقراءة فقط (<code>--readonly</code> في درس Gmail)، وتأكد من أن <code>AGENTS.md</code> ينص على أن البريد بيانات غير موثوقة لا تعليمات. وابدأ بالتوصيل مُعطّلًا أو موجّهًا إلى نفسك حتى يبدو الناتج صحيحًا.</p>
<h3 id="2-نظرة-المساء-إلى-الغد">2. نظرة المساء إلى الغد</h3>
<p><strong>ما تحصل عليه:</strong> في السادسة مساءً أيام العمل، تقويم الغد مع التعارضات وأي فراغ أطول من ساعة، كي تعرف ما أنت مقبل عليه.</p>
<p><strong>مبنيّ من:</strong> المكوّنات نفسها التي في الموجز الصباحي، على ساعة مختلفة.</p>
<p><strong>جرّبه:</strong></p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 18 * * 1-5&quot;</span> \\
  <span class="hljs-string">&quot;What&#x27;s on my calendar tomorrow? Identify conflicts and any gaps longer than one hour. Read-only.&quot;</span> \\
  --name <span class="hljs-string">&quot;Evening look-ahead&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p><strong>حواجز الحماية:</strong> لا شيء يزيد على ما في الموجز الصباحي. فهذه هي الفكرة الأكثر أمانًا في القائمة، ما يجعلها أتمتة أولى جيدة.</p>
<h3 id="3-فرز-البريد-المرقم-بموافقات-من-كلمة-واحدة">3. فرز البريد المرقّم بموافقات من كلمة واحدة</h3>
<p><strong>ما تحصل عليه:</strong> موجز كل ساعة يحصل فيه كل بريد يحتاج إلى اهتمام على رقم وملخص من جملتين وخطوة تالية مقترحة. وتُفرّغ صندوق بريدك بالرد «3 موافقة» أو «5 انقل إلى المراجعة الشخصية» من هاتفك.</p>
<p><strong>مبنيّ من:</strong> وكيل مخصص بمساحة عمل خاصة به، وملف قواعد، وجدول كل ساعة، وقناة محادثة. وتأتي الفكرة من كتابة في المجتمع، وأفضل حيلة فيها هي بروتوكول الرد: لا شيء يحدث حتى ترد برقم.</p>
<p><strong>جرّبه:</strong> ابدأ بالموجز فقط.</p>
<ol>
<li>اكتب قواعد الفرز لديك في ملف واحد: ما هو البريد المزعج، وما يجب أن تراه بنفسك، وما يمكنه الانتظار. وإذا سبق أن درّبت مساعدًا، فذلك المستند موجود على الأرجح بالفعل.</li>
<li>أنشئ وكيلًا منفصلًا له، كي لا يتسرب سياق الشركة إلى ذاكرة مساعدك العام.</li>
<li>جدول مهمة تعمل كل ساعة خلال ساعات العمل: <code><span class="line"><span style="color:#82AAFF;font-style:italic">openclaw</span><span style="color:#ECC48D"> automations</span><span style="color:#ECC48D"> create</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">0 9-17 * * 1-5</span><span style="color:#D9F5DD">&quot;</span><span style="color:#F78C6C"> &lt;/span&gt;</span>
<span class="line"><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">اقرأ بريدي غير المقروء. رقّم كل رسالة تحتاج إلى انتباه، وقدّم ملخصًا من جملتين وخطوة تالية مقترحة. وأدرج أي رسالة من الموجزات السابقة ما زالت بلا رد. لا تتخذ أي إجراء.</span><span style="color:#D9F5DD">&quot;</span><span style="color:#F78C6C"> &lt;/span&gt;</span>
<span class="line"><span style="color:#82AAFF"> --name</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">Email digest</span><span style="color:#D9F5DD">&quot;</span><span style="color:#82AAFF"> --tz</span><span style="color:#D9F5DD"> &quot;</span><span style="color:#ECC48D">America/Denver</span><span style="color:#D9F5DD">&quot;</span><span style="color:#82AAFF"> --session</span><span style="color:#ECC48D"> isolated</span><span style="color:#82AAFF"> --announce</span></span></code></li>
<li>شغّله أسبوعًا قبل أن تدع الوكيل يتصرف بناءً على أي رقم.</li>
</ol>
<p><strong>حواجز الحماية:</strong> القراءة والتصرف إذنان مختلفان. أبقِ الوكيل للقراءة فقط حتى تثق بالموجز، وعندما تضيف إجراءات فعلًا، أضفها خلف الأرقام كي يبقى القرار البشري على كل إجراء صادر. وتذكّر أن البريد الوارد هو المكان الأرجح لوصول هجوم حقن التوجيهات (prompt injection).</p>
<h2 id="مراقبون-يبقون-صامتين">مراقبون يبقون صامتين</h2>
<p>أفضل المراقبين لا يقولون شيئًا حتى يتغير شيء.</p>
<h3 id="4-مراقب-أسعار-الموردين-وشروطهم">4. مراقب أسعار المورّدين وشروطهم</h3>
<p><strong>ما تحصل عليه:</strong> فحص أسبوعي لصفحات الأسعار والشروط للأدوات التي تدفع مقابلها. ولا تسمع عنه إلا إذا تغيّر حقل جوهري، مثل سعر المقعد، أو سعر تجاوز الحد، أو بند الاحتفاظ بالبيانات.</p>
<p><strong>مبنيّ من:</strong> جدول أسبوعي، والمتصفح (أو طلب fetch عادي)، وملف لقطة في مساحة العمل. والحيلة هي فصل <em>الاستخراج</em> عن <em>الحكم</em>: استخرج الحقول القليلة التي تهمك، وقارنها بلقطة الأسبوع الماضي، وابقَ صامتًا إلا إذا تحرّك أحدها.</p>
<p><strong>جرّبه:</strong></p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 9 * * 1&quot;</span> \\
  <span class="hljs-string">&quot;Open each page listed in vendor-watch/targets.json and extract only the fields listed for it. Save them to vendor-watch/snapshots/ with today&#x27;s date. Compare against the previous snapshot. If no material field changed, reply with exactly NO_REPLY. Otherwise, list what changed and why it might matter.&quot;</span> \\
  --name <span class="hljs-string">&quot;Vendor watch&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p><strong>حواجز الحماية:</strong> صفحات الويب مدخلات غير موثوقة. والمراقب الذي يتعطل بهدوء يبدو تمامًا مثل «لم يتغير شيء»، لذا اطلب منه أيضًا أن يقول «ما زلت أراقب» في أول اثنين من كل شهر، وفعّل تنبيهات الفشل.</p>
<h3 id="5-مراقب-لا-يوقظ-النموذج-إلا-عندما-يهم-الأمر">5. مراقب لا يوقظ النموذج إلا عندما يهم الأمر</h3>
<p><strong>ما تحصل عليه:</strong> فحص للموقع كل خمس دقائق لا يكلّف شيئًا في يوم جيد، ولا يُشرك الوكيل إلا عندما يكون هناك خطأ.</p>
<p><strong>مبنيّ من:</strong> <em>مراقب شرط</em>، وهو نص برمجي صغير يُربط بجدول باستخدام <code>--trigger-script</code>. يعمل النص في كل نبضة، ولا يعمل توجيه الوكيل إلا إذا أعاد النص <code>{ fire: true }</code>. وأي <code>message</code> مُعادة تُضاف إلى التوجيه.</p>
<p><strong>جرّبه:</strong> اكتب نصًا يفحص موقعك ويعيد <code>fire: true</code> مع رسالة مثل «أعاد الموقع رمز 502» عندما يكون معطّلًا. ثم اربطه بجدول <code>--every</code> باستخدام <code>--trigger-script &lt;file&gt;</code> وتوجيه من قبيل «حقّق وأخبرني بما تجد».</p>
<p><strong>حواجز الحماية:</strong> تعمل النصوص المحفّزة دون إشراف وبسياسة الأدوات الكاملة للوكيل، لذا اكتبها كفحوص للقراءة فقط وأبقِ أي إجراءات في التوجيه، حيث تنطبق قواعد موافقتك. والجداول المحفّزة لها حد أدنى للفاصل قدره 30 ثانية، ولكل فحص ميزانية 30 ثانية.</p>
<h3 id="6-أخبرني-عندما-ينتهي-البناء">6. أخبرني عندما ينتهي البناء</h3>
<p><strong>ما تحصل عليه:</strong> رسالة عندما ينتهي بناء بطيء أو تشغيل اختبارات، مع ملخص عن نجاحه وما فشل.</p>
<p><strong>مبنيّ من:</strong> محفّز <code>--on-exit</code>، ينطلق مرة واحدة عندما ينتهي أمر مراقب.</p>
<p><strong>جرّبه:</strong></p>
<pre><code class="language-bash">openclaw automations add --name <span class="hljs-string">&quot;Build finished&quot;</span> \\
  --on-exit <span class="hljs-string">&quot;bun run build&quot;</span> --on-exit-cwd ~/Developer/my-site \\
  --session isolated \\
  --message <span class="hljs-string">&quot;The build just finished. Tell me whether it succeeded and summarize any errors.&quot;</span>
</code></pre>
<p><strong>حواجز الحماية:</strong> تُعطّل المهمة نفسها بعد انطلاقها، فأعد تمكينها للتشغيل التالي. وتحقّق من <code>openclaw automations add --help</code> لمعرفة كيف يُطلق الأمر ويُراقب بالضبط في إصدارك.</p>
<h3 id="7-المراقب-السريع">7. المراقب السريع</h3>
<p><strong>ما تحصل عليه:</strong> «راقب هذا» مؤقت يعيش في المحادثة الحالية ويزول عندما تفرغ منه.</p>
<p><strong>مبنيّ من:</strong> <code>/loop</code>، اختصار في المحادثة لمهمة متكررة. وهو مقصور على المالك.</p>
<p><strong>جرّبه:</strong> في محادثتك مع الوكيل:</p>
<pre><code>/loop 5m Check whether the latest deploy is healthy and tell me once it's green.
</code></pre>
<p>اترك الفاصل فارغًا فيُوتّر الحلقة نفسه بين دقيقة وساعة، فيفحص أكثر عندما تتغير الأمور ويتراجع عندما تكون هادئة. واعرض ما يعمل باستخدام <code>/loop status</code> وأنهِه باستخدام <code>/loop stop</code>.</p>
<p><strong>حواجز الحماية:</strong> الحلقة التي تظل تعلن أنه لا جديد لديها مشكلة في تحديد النطاق، لا في التوقيت. ففضيّق ما يُعدّ جديرًا بالذكر بدلًا من جعلها تعمل أسرع.</p>
<h2 id="استخدام-المتصفح">استخدام المتصفح</h2>
<p>كلتا الفكرتين تبنيان على التوجيهات من <a href="https://stevekinney.com/courses/openclaw/openclaw-browser-prompts">درس توجيهات المتصفح</a>.</p>
<h3 id="8-موجز-أسبوعي-للرائج">8. موجز أسبوعي للرائج</h3>
<p><strong>ما تحصل عليه:</strong> كل اثنين، تقرير عن أكثر مستودعات GitHub Trending إثارة للاهتمام في مجال وكلاء الذكاء الاصطناعي وأدوات المطورين، مع جدول مقارنة وأفضل ثلاثة اختيارات لديك، يُرسل إلى Telegram.</p>
<p><strong>مبنيّ من:</strong> جدول أسبوعي والمتصفح، مع توجيه GitHub Trending كنص أساسي.</p>
<p><strong>جرّبه:</strong> خذ التوجيه من درس المتصفح، وجدوله:</p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 8 * * 1&quot;</span> \\
  <span class="hljs-string">&quot;Open https://github.com/trending in the browser. Find the 10 most interesting repositories related to AI agents, developer tooling, or automation. Rank them, and send me a comparison table, links, and your top three. Use the browser to navigate the actual site.&quot;</span> \\
  --name <span class="hljs-string">&quot;Weekly trending&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p><strong>حواجز الحماية:</strong> لا توجّهه إلى ملف تعريف متصفح مسجّل الدخول إلى حساباتك. فالمتصفح المسجّل الدخول يستطيع الوصول إلى كل ما تستطيعه تلك الجلسة، وهو أوسع من أي token واحد لأي API.</p>
<h3 id="9-جولة-ضمان-جودة-ليلية-على-موقعك">9. جولة ضمان جودة ليلية على موقعك</h3>
<p><strong>ما تحصل عليه:</strong> اختبار استكشافي لموقع الاختبار (staging) لديك، مع السلوك المتوقع مقابل الملاحظ، وخطوات إعادة الإنتاج، ولقطات شاشة لأي شيء غريب.</p>
<p><strong>مبنيّ من:</strong> توجيه مهندس ضمان الجودة من درس المتصفح، موجّهًا إلى تطبيقك أنت ويعمل وفق جدول.</p>
<p><strong>جرّبه:</strong> عدّل توجيه TodoMVC ليناسب عنوان URL الخاص بموقع الاختبار، وأبقِ السطر الذي يقول إنه لا يجوز الإبلاغ عن اختبار بأنه ناجح إلا إذا نُفّذ فعلًا، وجدوله ليليًا أو أسبوعيًا.</p>
<p><strong>حواجز الحماية:</strong> بيئة الاختبار فقط. لا توجّهه أبدًا إلى الإنتاج بحسابات حقيقية، ولا تعطه بيانات اعتماد حقيقية أبدًا.</p>
<h2 id="معرفتك-الخاصة">معرفتك الخاصة</h2>
<h3 id="10-تدقيق-شهري-للذاكرة">10. تدقيق شهري للذاكرة</h3>
<p><strong>ما تحصل عليه:</strong> تقرير عن صحة ذاكرة وكيلك: حقائق مكررة، وقرارات قديمة، وتناقضات، وأي شيء لا ينبغي أن يكون هناك، مثل سر شارد.</p>
<p><strong>مبنيّ من:</strong> جدول شهري، ونموذج أقوى، والملفات من <a href="https://stevekinney.com/courses/openclaw/configuring-your-openclaw">درس الإعداد</a>. والغرض هو إيجاد المشكلات، لذا تكتب المهمة تقريرًا ولا تعدّل شيئًا.</p>
<p><strong>جرّبه:</strong></p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 10 1 * *&quot;</span> \\
  <span class="hljs-string">&quot;Read MEMORY.md, USER.md, and the files under memory/. Produce a report of duplicates, contradictions, stale facts, and anything that looks like a secret. Do not modify any file.&quot;</span> \\
  --name <span class="hljs-string">&quot;Memory audit&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p><strong>حواجز الحماية:</strong> يُفترض أن يبقى <code>MEMORY.md</code> صغيرًا ومنقّحًا، لذا ينبغي أن ينتهي التدقيق الجيد بأشياء يجب حذفها. وطبّق تلك التغييرات بنفسك.</p>
<h3 id="11-مسودة-حالة-أسبوعية">11. مسوّدة حالة أسبوعية</h3>
<p><strong>ما تحصل عليه:</strong> عصر الجمعة، ملخص مسوّدة للأسبوع مع روابط مصادر مؤرخة، ينتظر في ملف لتعدّله وترسله.</p>
<p><strong>مبنيّ من:</strong> <em>أمر دائم</em>، وهو تعليمات راسخة في <code>AGENTS.md</code> تحدّد ما يملكه الوكيل، وما يجوز له فعله، ومتى يجب أن يتوقف، إضافة إلى جدول يوم الجمعة. فالجدول يوقظه فقط، والأمر الدائم يقول ما يُسمح له بفعله.</p>
<p><strong>جرّبه:</strong> أضف برنامجًا قصيرًا إلى <code>AGENTS.md</code>:</p>
<pre><code class="language-markdown"><span class="hljs-section">## Program: Weekly status draft</span>

Scope: Read the approved sources and write an internal draft.
Output: Reports/weekly/YYYY-MM-DD.md with dated source links.
Allowed: Read sources, compare changes, update the draft.
Approval: Ask before sending, changing source records, or adding recipients.
Escalation: Stop if a required source is missing or contradicts another.
Completion: Verify the file exists and every material claim has a source.
</code></pre>
<p>ثم جدول مهمة يوم الجمعة يشير توجيهها إلى البرنامج بدلًا من تكراره.</p>
<p><strong>حواجز الحماية:</strong> تفصل هذه الفكرة بين إنتاج المسوّدة ونشرها. وإذا أردت يومًا أن ترسل، فاكتب الجمهور والشروط بدقة بدلًا من أن تقول له «كن مبادرًا».</p>
<h2 id="مع-جهاز-mac">مع جهاز Mac</h2>
<h3 id="12-ملخص-نهاية-اليوم-للمطور">12. ملخص نهاية اليوم للمطوّر</h3>
<p><strong>ما تحصل عليه:</strong> في السادسة مساءً، ملخص لما عملت عليه عبر مستودعاتك: الإيداعات والفروع والتغييرات غير المُودَعة.</p>
<p><strong>مبنيّ من:</strong> <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">عقدة Mac مقترنة</a> ومهمة مجدولة، مع توجيه الأوامر إلى العقدة. اضبط <code>tools.exec.host</code> على <code>node</code> للوكيل الذي يشغّل المهمة (و<code>tools.exec.node</code> إذا كان لديك أكثر من عقدة)، بدلًا من الاعتماد على توجيه <code>/exec</code> الذي لا ينطبق إلا في المحادثة.</p>
<p><strong>جرّبه:</strong> أدرج في قائمة السماح أوامر git للقراءة فقط على جهاز Mac، ثم جدول مهمة يطلب توجيهها ملخصًا للنشاط الأخير في مجلد مشاريعك.</p>
<p><strong>حواجز الحماية:</strong> يعود ناتج الأوامر إلى Gateway ويمكن أن يدخل سياق النموذج، أي أن الشيفرة تغادر جهاز Mac. فاسمح فقط بما تحتاجه، مثل <code>git log</code> و<code>git status</code>. وخطّط لاحتمال نوم جهاز Mac؛ فالعقدة غير المتصلة تُرفض ولا يُعاد توجيهها، لذا ينبغي أن تُبلغ المهمة بأنها لم تستطع العمل بدلًا من التحول إلى جهاز آخر.</p>
<h2 id="مع-وكلاء-البرمجة">مع وكلاء البرمجة</h2>
<p>تستخدم هذه الأفكار <a href="https://stevekinney.com/courses/openclaw/acpx-runtime-plugin">إضافة ACPX</a> وهي الأقوى والأخطر في القائمة.</p>
<h3 id="13-صيانة-ليلية-في-نسخة-عمل-مؤقتة">13. صيانة ليلية في نسخة عمل مؤقتة</h3>
<p><strong>ما تحصل عليه:</strong> في الثانية صباحًا، يشغّل وكيل برمجة اختباراتك، ويصلح إخفاقات lint التافهة، ويكتب ما وجده. وفي الصباح يكون لديك diff وتقرير للمراجعة.</p>
<p><strong>مبنيّ من:</strong> مهمة مجدولة يبدأ توجيهها جلسة ACP باستخدام <code>sessions_spawn</code>، ونسخة عمل مؤقتة من مستودعك على مضيف Gateway، ووضع الأذونات <code>approve-all</code> محصورًا في تلك النسخة فقط.</p>
<p><strong>جرّبه:</strong> استنسخ نسخة من مستودع إلى مجلد مؤقت على مضيف Gateway، ثم جدول مهمة مثل هذه:</p>
<pre><code class="language-bash">openclaw automations create <span class="hljs-string">&quot;0 2 * * 1-5&quot;</span> \\
  <span class="hljs-string">&quot;Use sessions_spawn with runtime acp and agentId claude, cwd /workspace/scratch/my-app. Run the test suite, fix only trivial lint failures, and write findings to REPORT.md. Do not push, commit to main, or touch anything outside this directory.&quot;</span> \\
  --name <span class="hljs-string">&quot;Overnight maintenance&quot;</span> --tz <span class="hljs-string">&quot;America/Denver&quot;</span> --session isolated --announce
</code></pre>
<p><strong>حواجز الحماية:</strong></p>
<ul>
<li><strong>لا بيانات اعتماد للدفع (push).</strong> لا ينبغي أن تستطيع نسخة العمل المؤقتة الدفع إلى أي مكان. فأنت تراجع diff ثم تطبّق ما تريد.</li>
<li><strong>ACP ليس معزولًا (sandboxed).</strong> يعمل harness على المضيف، لذا أبقِ <code>approve-all</code> معطّلًا في كل مكان إلا مجلد هذه المهمة، وأعده إلى <code>approve-reads</code> عندما لا تستخدمه.</li>
<li><strong>افحص قبل أن تعيد المحاولة.</strong> إذا فشلت الجلسة أو انتهت مهلتها، فقد يكون harness غيّر ملفات بالفعل. فتحقق من الجلسة وdiff أولًا.</li>
<li><strong>ليس من جلسة معزولة.</strong> تُحجب عمليات spawn الخاصة بـACP عندما تكون الجلسة الطالبة معزولة، لذا يجب أن تعمل هذه المهمة في جلسة غير معزولة.</li>
</ul>
<h3 id="14-رأي-ثان-على-كل-diff">14. رأي ثانٍ على كل diff</h3>
<p><strong>ما تحصل عليه:</strong> مراجعة شيفرة من نموذج مختلف عن النموذج الذي كتب الشيفرة.</p>
<p><strong>مبنيّ من:</strong> جلستان من ACP، واحدة لكل harness، موجّهتان إلى diff نفسه ومطروح عليهما السؤال نفسه. وهذا هو التمرين الثاني من درس ACPX، مطبّقًا في العمل.</p>
<p><strong>جرّبه:</strong> اطلب من وكيلك:</p>
<blockquote>
<p>أطلق جلستَي ACP للقراءة فقط، <code>codex</code> و<code>claude</code>، مع ضبط <code>cwd</code> على هذا المستودع. واطلب من كل منهما مراجعة التغييرات المُجهّزة بحثًا عن الأخطاء والافتراضات المحفوفة بالمخاطر. وأرِني أين يتفقان وأين يختلفان.</p>
</blockquote>
<p><strong>حواجز الحماية:</strong> وضع القراءة فقط كافٍ، لذا لا تحتاج إلى <code>approve-all</code>. والخلافات هي الجزء المثير. فانظر إليها أولًا.</p>
<h2 id="أفكار-ينبغي-الحذر-منها">أفكار ينبغي الحذر منها</h2>
<p><strong>أي شيء له عواقب في العالم الحقيقي.</strong> تعجّ عروض المجتمع بوكلاء يتفاوضون مع تجار سيارات، ويقدّمون مطالبات تأمين، ويسجّلون الوصول إلى الرحلات، ويطلبون مشتريات البقالة، ويرسلون الفواتير. وهذا مثير للإعجاب، لكن أيًا من الملخصات المنشورة لا يذكر خطوة موافقة. فإن أردت شيئًا كهذا، فاستعر نمط الموافقة المرقّمة من الفكرة 3: يجهّز الوكيل الإجراء، ولا شيء يحدث حتى ترد.</p>
<p><strong>Webhooks من نوع الدفع على Gateway خاص.</strong> يحتاج webhook إلى أن تصل الخدمة الخارجية إلى Gateway الخاص بك، وGateway لا يُصل إليه إلا عبر Tailscale، مثل ذلك الذي ينشره <a href="https://stevekinney.com/courses/openclaw/running-openclaw-on-railway-with-tailscale">درس Railway</a> على <a href="https://railway.com/?referralCode=kinney">Railway</a>، لا تستطيع GitHub أو Stripe الوصول إليه. والتعرّض العلني هو بالضبط ما يتجنبه ذلك الإعداد. وعندما تستطيع، فضّل النسخة من نوع السحب من الفكرة: جدول يفحص كل بضع دقائق بدلًا من حدث يصل.</p>
<p><strong>أي شيء يتصفح أثناء تسجيل الدخول.</strong> إنه مريح، لكنه منح أوسع بكثير مما يبدو. فإن احتجته فعلًا، ف<a href="https://stevekinney.com/courses/openclaw/syncing-cookies-to-a-remote-gateway">زامن فقط ملفات تعريف الارتباط للمواقع التي تحتاجها المهمة</a> إلى ملف تعريف مسمّى بدلًا من إرفاق متصفحك كله.</p>
<h2 id="اختيار-أفكارك-الثلاث-الأولى">اختيار أفكارك الثلاث الأولى <span class="content-anchor" id="picking-your-first-three"></span></h2>
<table>
<thead>
<tr>
<th>#</th>
<th>الفكرة</th>
<th>الجهد</th>
<th>الخطر</th>
<th>المتطلبات</th>
</tr>
</thead>
<tbody>
<tr>
<td>2</td>
<td>نظرة المساء إلى الغد</td>
<td>منخفض</td>
<td>منخفض جدًا</td>
<td>الوصول إلى التقويم</td>
</tr>
<tr>
<td>1</td>
<td>الموجز الصباحي</td>
<td>منخفض</td>
<td>منخفض</td>
<td>Gmail وCalendar</td>
</tr>
<tr>
<td>7</td>
<td>المراقب السريع (<code>/loop</code>)</td>
<td>منخفض</td>
<td>منخفض</td>
<td>مالك الأمر في المحادثة</td>
</tr>
<tr>
<td>8</td>
<td>موجز الرائج الأسبوعي</td>
<td>منخفض</td>
<td>منخفض</td>
<td>المتصفح</td>
</tr>
<tr>
<td>4</td>
<td>مراقب أسعار المورّدين</td>
<td>متوسط</td>
<td>منخفض</td>
<td>المتصفح، وملف لقطة</td>
</tr>
<tr>
<td>10</td>
<td>التدقيق الشهري للذاكرة</td>
<td>منخفض</td>
<td>منخفض</td>
<td>نموذج أقوى</td>
</tr>
<tr>
<td>11</td>
<td>مسوّدة الحالة الأسبوعية</td>
<td>متوسط</td>
<td>منخفض</td>
<td>أمر دائم</td>
</tr>
<tr>
<td>6</td>
<td>انتهاء البناء</td>
<td>متوسط</td>
<td>منخفض</td>
<td>أمر للمراقبة</td>
</tr>
<tr>
<td>5</td>
<td>المراقب الصامت</td>
<td>متوسط</td>
<td>متوسط</td>
<td>نص محفّز</td>
</tr>
<tr>
<td>9</td>
<td>ضمان الجودة الليلي</td>
<td>متوسط</td>
<td>متوسط</td>
<td>المتصفح، وموقع اختبار</td>
</tr>
<tr>
<td>3</td>
<td>فرز البريد المرقّم</td>
<td>مرتفع</td>
<td>متوسط</td>
<td>وكيل مخصص، وقواعد، وقناة</td>
</tr>
<tr>
<td>12</td>
<td>ملخص المطوّر عبر جهاز Mac</td>
<td>متوسط</td>
<td>متوسط</td>
<td>عقدة مقترنة</td>
</tr>
<tr>
<td>14</td>
<td>رأي ثانٍ على diff</td>
<td>متوسط</td>
<td>متوسط</td>
<td>ACPX، واثنان من harness</td>
</tr>
<tr>
<td>13</td>
<td>الصيانة الليلية</td>
<td>مرتفع</td>
<td>مرتفع</td>
<td>ACPX، ونسخة عمل مؤقتة</td>
</tr>
</tbody>
</table>
<p>وهذا مسار جيد:</p>
<ol>
<li><strong>فورًا:</strong> المراقب السريع، الذي يحتاج إلى محادثة فقط. فهو أسرع طريقة لرؤية الجدولة والتوصيل وهما يعملان.</li>
<li><strong>بعد توصيل Gmail وCalendar:</strong> نظرة المساء إلى الغد، ثم الموجز الصباحي. واعتد على سجل التشغيل والتوصيل.</li>
<li><strong>بعد ذلك:</strong> مراقب صامت، إما مراقب المورّدين أو تنبيه انتهاء البناء، كي تتعلم كيف يبدو «صامت إلا عندما يهم الأمر».</li>
<li><strong>ثم:</strong> فرز البريد في وضع الموجز فقط.</li>
<li><strong>وبعد ذلك:</strong> أفكار وكلاء البرمجة، عندما تثق بأذوناتك.</li>
</ol>
<h2 id="التعايش-مع-أتمتاتك">التعايش مع أتمتاتك</h2>
<p>بعد أن تعمل بضع أتمتات، امنحها فحصًا أسبوعيًا:</p>
<ul>
<li>شغّل <code>openclaw automations list --all</code> واسأل نفسك هل قرأت ناتج كل واحدة منها هذا الشهر. فإن لم تفعل، فعطّلها.</li>
<li>انظر في <code>openclaw automations runs &lt;job-id&gt;</code> بحثًا عن أي شيء يظل يفشل أو يفعل لا شيء بهدوء.</li>
<li>أعد النظر في أي شيء لديه أذونات دائمة، واسحب ما لم تعد تحتاجه.</li>
<li>احتفظ بقائمة قصيرة بما يعمل ولماذا، كي يستطيع «أنت» في المستقبل التمييز بين مهمة اخترتها ومهمة نسيتها.</li>
</ul>
<p>الهدف ليس أكبر عدد من الأتمتات، بل مجموعة صغيرة ستلاحظ فورًا إذا توقفت.</p>
`,r={book:n,chapter:t,chapterTitle:o,slug:s,title:e,headings:a,html:d};export{n as book,t as chapter,o as chapterTitle,r as default,a as headings,d as html,s as slug,e as title};
