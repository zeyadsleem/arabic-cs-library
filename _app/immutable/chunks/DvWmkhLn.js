const n="kinney",e="openclaw",o="OpenClaw: مساعدك الذكي الشخصي",t="security-and-approvals",d="الأمن والموافقات",c=[{depth:2,id:"الطبقات-الأربع",text:"الطبقات الأربع"},{depth:2,id:"اعرف-موقعك",text:"اعرف موقعك"},{depth:2,id:"الطبقة-2-الأدوات-المتاحة",text:"الطبقة 2: الأدوات المتاحة"},{depth:2,id:"الطبقة-3-موافقات-التنفيذ",text:"الطبقة 3: موافقات التنفيذ"},{depth:3,id:"اختر-وضعا",text:"اختر وضعًا"},{depth:3,id:"أجب-عن-طلب-موافقة",text:"أجب عن طلب موافقة"},{depth:3,id:"ابن-قائمة-سماح",text:"ابنِ قائمة سماح"},{depth:3,id:"عندما-لا-يوجد-أحد",text:"عندما لا يوجد أحد"},{depth:3,id:"شدد-رسالة-واحدة",text:"شدّد رسالة واحدة"},{depth:2,id:"أوضاع-أذونات-الجلسة",text:"أوضاع أذونات الجلسة"},{depth:2,id:"الطبقة-4-العزل",text:"الطبقة 4: العزل"},{depth:2,id:"حقن-المطالبات",text:"حقن المطالبات"},{depth:2,id:"شغل-فحص-الأمان",text:"شغّل فحص الأمان"},{depth:2,id:"توصيتنا",text:"توصيتنا"},{depth:2,id:"إذا-حدث-خطأ-ما",text:"إذا حدث خطأ ما"}],s=`<p>يستطيع وكيلك قراءة ملفاتك وتشغيل الأوامر والتصرّف عبر حساباتك. هذا هو جوهره، ولهذا تحديدًا يحمل كل درس آخر في هذه الدورة تحذيرًا في مكان ما. يجمع هذا الدرس كل تلك التحذيرات في مكان واحد: ما الذي يقرّر ما يُسمح لوكيلك بفعله، وكيف تجعله يسأل قبل القيام بالأشياء، وكيف تتحقّق من أن تهيئتك هي ما تظنّه.</p>
<p>ابدأ بالإعدادات الافتراضية، لأنها تُدهش الناس. <strong>افتراضيًا، يشغّل OpenClaw الأوامر دون أن يسأل ولا يضع أي شيء في بيئة معزولة.</strong> تصف الوثائق هذا بأنه التجربة المقصودة لمشغّل واحد موثوق به، لا بوصفه ثغرة أمنية. وهو افتراضي معقول عندما تكون الشخص الوحيد الذي يستطيع الوصول إلى الوكيل وتثق بكل ما يقرأه. ومعظم التهويئات تتوقف عن تلبية هذين الشرطين بمجرد ربط قناة دردشة أو بريد وارد أو متصفّح.</p>
<h2 id="الطبقات-الأربع">الطبقات الأربع</h2>
<p>تمرّ كل عملية يقوم بها وكيلك بأربعة فحوص منفصلة:</p>
<table>
<thead>
<tr>
<th>الطبقة</th>
<th>السؤال الذي يجيب عنه</th>
<th>أين يُعالَج</th>
</tr>
</thead>
<tbody>
<tr>
<td>1. الوصول</td>
<td>من يحقّ له التحدّث مع الوكيل أصلًا؟</td>
<td><a href="https://stevekinney.com/courses/openclaw/choosing-a-dm-policy">اختيار سياسة الرسائل الخاصة</a></td>
</tr>
<tr>
<td>2. سياسة الأدوات</td>
<td>ما الأدوات التي يملكها الوكيل؟</td>
<td><a href="#layer-2-which-tools-exist">أدناه</a></td>
</tr>
<tr>
<td>3. موافقات التنفيذ</td>
<td>هل يحتاج هذا الأمر إلى بشر أولًا؟</td>
<td><a href="#layer-3-exec-approvals">أدناه</a></td>
</tr>
<tr>
<td>4. العزل</td>
<td>أين يُشغَّل الأمر؟</td>
<td><a href="#layer-4-sandboxing">أدناه</a></td>
</tr>
</tbody>
</table>
<p>وهناك قواعد قليلة تنطبق على كلها:</p>
<ul>
<li><strong>لا تستطيع الطبقات اللاحقة إلا التضييق.</strong> فلا شيء في طبقة لاحقة يستطيع إرجاع أداة أزالتها طبقة سابقة. لا العزل يستطيع ذلك، ولا الوضع المرفوع، ولا أمر الشرطة المائلة (slash command).</li>
<li><strong>المنع هو الأعلى.</strong> إذا منعت أي قاعدة مطبّقة أداة ما، فإن السماح في مكان آخر لا يُلغي ذلك.</li>
<li><strong>الأداة المزالة غير مرئية.</strong> حين تسلب السياسة أداة من الوكيل، لا يرى النموذج أبدًا إياها. لا استدعاء فاشل يمكن البحث عنه، لأن الوكيل لم تُعرض عليه الأداة إطلاقًا.</li>
</ul>
<p>الطبقات مستقلّة. فالسياسة الصارمة للرسائل الخاصة لا تجعل الأوامر آمنة، والموافقات لا تمنع الغرباء من التحدّث مع روبوتك. وأنت تحتاج إلى الطبقات الأربع معًا.</p>
<h2 id="اعرف-موقعك">اعرف موقعك</h2>
<p>شغّل هذه على الجهاز الذي تعمل عليه البوابة:</p>
<pre><code class="language-bash">openclaw exec-policy show
openclaw sandbox explain
openclaw security audit
</code></pre>
<ul>
<li><code>exec-policy show</code> يطبع سياسة موافقات الأوامر التي طلبتها، وما يحمله ملف الموافقات على المضيف، والنتيجة النهائية الفعّالة. وفي التثبيت الجديد، يقرأ الملخّص في السطر الواحد شكلًا مثل <code>auto · full · no approval prompts · fallback deny</code>. وكلمة <code>auto</code> هناك تعني المضيف الذي يُشغَّل عليه الأمر، لا وضعًا من الأوضاع.</li>
<li><code>sandbox explain</code> يُظهر ما إذا كانت هذه الجلسة معزولة (وافتراضيًا <code>mode: off</code>)، والأدوات التي سيسمح بها العزل، ومفاتيح الإعدادات التي تتحكم في كل منها.</li>
<li><code>security audit</code> يفحص الإعدادات الكاملة بحثًا عن مشكلات معروفة. وسيحصل على <a href="#run-the-security-audit">قسم خاص به</a> أدناه.</li>
</ul>
<h2 id="الطبقة-2-الأدوات-المتاحة">الطبقة 2: الأدوات المتاحة <span class="content-anchor" id="layer-2-which-tools-exist"></span></h2>
<p><strong>ملف الأدوات (tool profile)</strong> هو مجموعة بداية من الأدوات. ثم تضيف أو تحذف أدوات وفئات فردية:</p>
<table>
<thead>
<tr>
<th>الملف</th>
<th>ما يضمّه</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>minimal</code></td>
<td>لا شيء تقريبًا: حالة الجلسة والقدرة على تطبيق التحديثات</td>
</tr>
<tr>
<td><code>coding</code></td>
<td>الملفات، وسطر الأوامر، والويب، والذاكرة، والجلسات، والجدولة، والوسائط. بلا أداة مراسلة</td>
</tr>
<tr>
<td><code>messaging</code></td>
<td>أدوات المراسلة والجلسات. بلا ملفات وبلا سطر أوامر</td>
</tr>
<tr>
<td><code>full</code></td>
<td>كل شيء، بما في ذلك أدوات الإضافات الاختيارية</td>
</tr>
</tbody>
</table>
<p>إن لم تعيّن ملفًا، فلن تُرشَّح الأدوات الأساسية إطلاقًا. وقد يضبط لك الإعداد الابتدائي الوضع <code>full</code>.</p>
<p>توفر عليك الفئات سرد الأدوات واحدة تلو الأخرى:</p>
<table>
<thead>
<tr>
<th>الفئة</th>
<th>الأدوات</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>group:runtime</code></td>
<td><code>exec</code>، <code>process</code>، <code>code_execution</code></td>
</tr>
<tr>
<td><code>group:fs</code></td>
<td><code>read</code>، <code>write</code>، <code>edit</code>، <code>apply_patch</code></td>
</tr>
<tr>
<td><code>group:web</code></td>
<td><code>web_search</code>، <code>x_search</code>، <code>web_fetch</code></td>
</tr>
<tr>
<td><code>group:ui</code></td>
<td><code>browser</code> و<code>canvas</code> و<code>screen</code> وأدوات واجهة المستخدم الأخرى</td>
</tr>
<tr>
<td><code>group:automation</code></td>
<td><code>automations</code> (مهام مجدولة) و<code>gateway</code> و<code>plugins</code> و<code>openclaw</code></td>
</tr>
<tr>
<td><code>group:messaging</code></td>
<td><code>message</code></td>
</tr>
<tr>
<td><code>group:nodes</code></td>
<td><code>nodes</code> و<code>computer</code></td>
</tr>
</tbody>
</table>
<p>أرسل <code>/tools</code> داخل محادثة لترى بالضبط ما يستطيع الوكيل الحالي استخدامه الآن.</p>
<p>إليك ملف لوكيل يستطيع التصفّح والعمل مع الملفات لكنه لا يمسّ سطر الأوامر أبدًا:</p>
<pre><code class="language-json5"><span class="hljs-punctuation">{</span>
  agents<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    entries<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      main<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        tools<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          profile<span class="hljs-punctuation">:</span> <span class="hljs-string">&#x27;coding&#x27;</span><span class="hljs-punctuation">,</span>
          alsoAllow<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;browser&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
          deny<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&#x27;group:runtime&#x27;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثلاثة تفاصيل تربك الناس:</p>
<ul>
<li><strong>استخدم <code>alsoAllow</code> للإضافة إلى ملف.</strong> لا يمكن استخدام <code>allow</code> و<code>alsoAllow</code> معًا في المستوى نفسه، وترفض أدوات التحقّق الإعدادات إن حاولت ذلك.</li>
<li><strong>منع <code>write</code> لا يمنع <code>apply_patch</code>.</strong> فالسماح بـ <code>write</code> يُفعّل <code>apply_patch</code> أيضًا، لكن منعه لا يُطفئه. ولجعل الوكيل للقراءة فقط، امنع <code>group:fs</code> أو كلًا من الأدوات الأربع بالاسم.</li>
<li><strong>سطر الأوامر هو سطر الأوامر.</strong> فإذا كان <code>exec</code> مسموحًا، فإن منع أدوات الملفات لا يجعل الوكيل للقراءة فقط، فهو يستطيع كتابة الملفات بأمر. والوكيل للقراءة فقط حقًّا يحتاج أيضًا إلى منع <code>group:runtime</code>.</li>
</ul>
<h2 id="الطبقة-3-موافقات-التنفيذ">الطبقة 3: موافقات التنفيذ <span class="content-anchor" id="layer-3-exec-approvals"></span></h2>
<p>تحدد سياسة الأدوات ما إذا كان الوكيل يملك <code>exec</code> أصلًا. أمّا <strong>موافقات التنفيذ</strong> فتحدد الأوامر التي يستطيع تشغيلها دون أن يسأل. وهذه هي الطبقة الأكثر تعاملًا معها.</p>
<h3 id="اختر-وضعا">اختر وضعًا</h3>
<p>تُضبط السياسة عبر <code>tools.exec.mode</code>:</p>
<table>
<thead>
<tr>
<th>الوضع</th>
<th>ما يحدث للأمر غير الموجود في قائمة السماح</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>full</code></td>
<td>يُشغَّل دون أي مطالبات. <strong>هذا هو الافتراضي.</strong></td>
</tr>
<tr>
<td><code>ask</code></td>
<td>ينتظر حتى يوافق عليه بشر</td>
</tr>
<tr>
<td><code>auto</code></td>
<td>يسمح به مراجع من الذكاء الاصطناعي، أو يمنعه، أو يسأل بشرًا</td>
</tr>
<tr>
<td><code>allowlist</code></td>
<td>يُمنع بصمت</td>
</tr>
<tr>
<td><code>deny</code></td>
<td>تُعطَّل جميع الأوامر</td>
</tr>
</tbody>
</table>
<p>تضبط الأدلة الأقدم <code>tools.exec.security</code> و<code>tools.exec.ask</code> بدلًا من ذلك. وما زالت تعمل، ووضع <code>ask</code> يعادل <code>security: allowlist</code> مع <code>ask: on-miss</code>. فقط لا تضبط <code>mode</code> والزوج الأقدم في المكان نفسه، لأن OpenClaw يرفض هذا المزيج. و<code>openclaw doctor --fix</code> يُحوّل الصيغة القديمة إلى الجديدة.</p>
<p><strong>نوصي بوضع <code>ask</code>.</strong> وأسهل وسيلة للوصول إليه هي إعداد مسبق (preset) يحدّث ملف الإعدادات وملف موافقات المضيف معًا:</p>
<pre><code class="language-bash">openclaw exec-policy preset cautious
openclaw exec-policy show
</code></pre>
<p>يضبط <code>cautious</code> الوضع <code>ask</code> مع قيمة افتراضية بديلة <code>deny</code>: فإذا احتاج الأمر إلى موافقة ولم يكن هناك من يُسأل، فلا يُشغَّل. والإعدادات المسبقة الأخرى هي <code>yolo</code> (بلا مطالبات) و<code>deny-all</code>.</p>
<p>لا يغيّر <code>exec-policy</code> سوى الجهاز الذي تشغّله عليه. وعلى بوابة بعيدة، شغّله هناك. وعلى <a href="https://railway.com/?referralCode=kinney">قالب Railway</a>، يكون الأمر <code>railway ssh --service openclaw -- openclaw exec-policy preset cautious</code>.</p>
<blockquote>
<p><strong>لكل عقدة سياستها الخاصة</strong></p>
<p>تبدأ <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">العقدة المقترنة</a> بنفس الافتراضي الذي بلا مطالبات كالبوابة، وإعداد البوابة المسبق لا يغيّر ذلك. ولهذا يضبط درس العقدة سياسة موافقات الـ Mac <em>قبل</em> الاقتران.</p>
</blockquote>
<h3 id="أجب-عن-طلب-موافقة">أجب عن طلب موافقة</h3>
<p>مع تفعيل وضع <code>ask</code>، يتوقف الأمر غير المدرج في قائمة السماح ويرسل طلب موافقة. وستراه في واجهة التحكم، وفي تطبيق macOS، وفي تطبيقات iOS وAndroid. وفي المحادثة يمكنك الإجابة عبر <code>/approve</code>:</p>
<pre><code>/approve &lt;id&gt; allow-once
/approve &lt;id&gt; allow-always
/approve &lt;id&gt; deny
</code></pre>
<p>على Telegram، تذهب مطالبات الموافقة إلى الرسائل الخاصة للموافقين، ولا يستطيع الإجابة عنها سوى الموافقين. ويقوم الموافقون افتراضيًا بأدوار ملاك الأوامر الذين عيّنتهم عبر <code>commands.ownerAllowFrom</code> في <a href="https://stevekinney.com/courses/openclaw/choosing-a-dm-policy">درس سياسة الرسائل الخاصة</a>. ومن يستطيع التحدث مع الوكيل يمكنه إطلاق طلب، لكنه لا يستطيع الموافقة عليه ما لم يكن هو أيضًا موافقًا.</p>
<p>من طرفية:</p>
<pre><code class="language-bash">openclaw approvals pending
openclaw approvals resolve &lt;<span class="hljs-built_in">id</span>&gt; allow-once
</code></pre>
<p>الإجابات الثلاث تعني:</p>
<ul>
<li><strong>السماح مرة واحدة</strong> يشغّل هذا الأمر هذه المرة وحدها.</li>
<li><strong>السماح دائمًا</strong> تعني «السماح دائمًا <em>هنا</em>». فتوافق على سطر الأمر هذا بالضبط داخل دليل العمل هذا، لا على البرنامج عمومًا. وتشغيل البرنامج نفسه بوسائط مختلفة يُعيد السؤال.</li>
<li><strong>المنع</strong> يوقفه، ويُبلَّغ الوكيل بأنه مُنع.</li>
</ul>
<p>ينتهي الطلب الذي لا يُجب عنه بعد 30 دقيقة ويُعدّ رفضًا. وكتابة «نعم» ليست موافقة. استخدم <code>/approve</code> مع معرّف الطلب، أو زر الموافقة.</p>
<h3 id="ابن-قائمة-سماح">ابنِ قائمة سماح</h3>
<p>الأوامر التي توافق عليها طوال الوقت يمكن إدراجها في قائمة السماح حتى لا تُصدر مطالبات أبدًا:</p>
<pre><code class="language-bash">openclaw approvals allowlist add --agent main rg
openclaw approvals get
</code></pre>
<p>وبمثل <code>exec-policy</code>، يعدّل هذا موافقات الجهاز المحلي افتراضيًا. أضف <code>--gateway</code> لتعديل نسخة البوابة من حاسوب آخر، أو <code>--node &lt;id&gt;</code> لعقدة.</p>
<p>كيف تعمل المطابقة:</p>
<ul>
<li>الاسم العاري مثل <code>rg</code> يطابق ذلك البرنامج حين يُعثر عليه عبر <code>PATH</code>، لكنه لا يطابق <code>./rg</code>.</li>
<li>في أمر مترابط مثل <code>git status &amp;&amp; rg TODO</code>، يجب أن يطابق <strong>كل</strong> جزء فيه.</li>
<li>بضع أدوات قليلة غير ضارة تقتصر على الإدخال (<code>cut</code> و<code>uniq</code> و<code>head</code> و<code>tail</code> و<code>tr</code> و<code>wc</code>) تُشغَّل دون أي إدخالات في قائمة السماح.</li>
</ul>
<blockquote>
<p><strong>لا تضع منفّذًا (interpreter) في قائمة السماح أبدًا</strong></p>
<p>إن وضعت <code>python3</code> أو <code>node</code> أو <code>bash</code> أو ما يشبهها في قائمة السماح، فأنت توافق على <em>أي</em> برنامج، لأن <code>python3 -c '...'</code> يستطيع فعل أي شيء. وإن احتجت واحدًا فعلًا، ففعّل أيضًا <code>tools.exec.strictInlineEval</code>، الذي يجعل الشيفرة السطرية مثل <code>python3 -c</code> و<code>node -e</code> تسأل في كل مرة.</p>
</blockquote>
<h3 id="عندما-لا-يوجد-أحد">عندما لا يوجد أحد <span class="content-anchor" id="when-nobodys-there"></span></h3>
<p>تفترض الموافقات وجود من يجيب. وهناك وضعان يغيّران ذلك.</p>
<p>تستخدم <strong>المحادثات التفاعلية</strong> القيمة البديلة. فإذا احتاج الأمر إلى مطالبة ولم تتوفر واجهة موافقة يمكن الوصول إليها، قرّر البديل، ومع <code>cautious</code> يكون ذلك <code>deny</code>.</p>
<p>أما <strong>الأتمتة المجدولة</strong> فأشدّ صرامة. تذهب طلبات موافقتها فقط إلى تطبيقات الموافقة المتصلة: واجهة التحكم، وتطبيق macOS، وتطبيقات iOS وAndroid. ولا تذهب أبدًا إلى قنوات الدردشة، ولا تعرضها واجهة الطرفية. <strong>إن لم يكن أي تطبيق موافقة متصلًا، يُرفض الطلب فورًا.</strong></p>
<p>وحين توافق فعلًا على أمر أتمتة بخيار <strong>السماح دائمًا</strong>، ينشئ OpenClaw <strong>إذنًا دائمًا (standing grant)</strong> بدلًا من إدخال في قائمة السماح. ويرتبط الإذن بتلك المهمة تحديدًا، وبذلك الوكيل، وبالأمر ودليل العمل والبيئة بالضبط. وإذا رُتّبت المهمة، أو تغيّر الأمر بحرف واحد، يُعيد السؤال.</p>
<p>يمكنك مراجعة الأذونات الدائمة وإبطالها في واجهة التحكم تحت <strong>الإعدادات ← الموافقات</strong>، وهي تسرد أيضًا سجلًّا متدحرجًا لآخر 30 يومًا من الموافقات التي حُلّت. ويمكنك فعل ذلك أيضًا من الطرفيّة:</p>
<p><img src="/arabic-cs-library/images/kinney/fb65d221c8d68280.webp" alt="صفحة الموافقات في إعدادات OpenClaw، بجداول فارغة للأذونات الدائمة ولسجل الموافقات"></p>
<pre><code class="language-bash">openclaw approvals grants list
openclaw approvals grants revoke &lt;grant-id&gt;
</code></pre>
<p>تستمر الأذونات حتى تبطلها. ولجعل الأذونات المستقبلية تنتهي، اضبط <code>tools.exec.grantExpiryDays</code>.</p>
<p>هذا بالضبط ما تسعى إليه الضوابط في <a href="https://stevekinney.com/courses/openclaw/automation-ideas">أفكار الأتمتة</a>: اجعل المهمة تسأل مرة واحدة وأنت متابِع، ثم وافق عليها بخيار <strong>السماح دائمًا</strong>، وستمرّ بقية عمليات التشغيل لتلك المهمة ذاتها دون إشراف.</p>
<h3 id="شدد-رسالة-واحدة">شدّد رسالة واحدة</h3>
<p>يعدّل <code>/exec</code> الموافقات لرسالة واحدة. أرسله مع المهمة:</p>
<pre><code>/exec security=deny Summarize what's in ~/Downloads, but don't run anything.
</code></pre>
<p>تنطبق إعدادات <code>security</code> و<code>ask</code> على تلك الرسالة وحدها، ولا يستطيع استخدامها سوى المُرسِلين الذين رخّصت لهم. استخدمها لتضييق الأمور: فقواعد موافقات المضيف لا تزال مطبَّقة، ولا يستطيع <code>/exec</code> إعادة أداة <code>exec</code> التي منعتها سياسة الأدوات. ولإطفاء سطر الأوامر تمامًا، امنعه: <code>tools.deny: [&quot;exec&quot;]</code>.</p>
<h2 id="أوضاع-أذونات-الجلسة">أوضاع أذونات الجلسة</h2>
<p>تضيف واجهة التحكم مفتاحًا إضافيًا لكل محادثة. وفي محرّر المحادثة، تضبط قائمة <strong>أذونات التنفيذ</strong> <strong>وضع الأذونات</strong> لهذه الجلسة:</p>
<table>
<thead>
<tr>
<th>الوضع</th>
<th>الملفات</th>
<th>الأوامر خارج قائمة السماح</th>
</tr>
</thead>
<tbody>
<tr>
<td>للقراءة فقط</td>
<td>القراءة داخل مجلد الجلسة</td>
<td>ممنوعة</td>
</tr>
<tr>
<td>محميّ</td>
<td>القراءة والكتابة داخل المجلد</td>
<td>يُسأل بشر</td>
</tr>
<tr>
<td>مساحة العمل</td>
<td>القراءة والكتابة داخل المجلد</td>
<td>يقرّر مراجع من الذكاء الاصطناعي، أو يسألك أنت</td>
</tr>
<tr>
<td>وصول كامل</td>
<td>في أي مكان</td>
<td>تُشغَّل دون سؤال</td>
</tr>
</tbody>
</table>
<p><img src="/arabic-cs-library/images/kinney/b7437633128452f4.webp" alt="قائمة أذونات التنفيذ في محرّر المحادثة، تسرد الافتراضي والقراءة فقط والمحميّ ومساحة العمل والوصول الكامل"></p>
<p>الجلسة التي بلا وضع تستخدم سياستك العامة. ومدخل <strong>الافتراضي</strong> في القائمة يتبع تلك السياسة، ويشرح عنوانه ما تسمح به السياسة حاليًا، مثل <strong>الافتراضي (وصول كامل)</strong>. وبدون أي من إعدادات هذا الدرس، يكون الافتراضي وصولًا كاملًا.</p>
<p>يتطلب اختيار <strong>الوصول الكامل</strong> صلاحيات مسؤول على البوابة، ويتجاوز قواعد موافقات المضيف في تلك الجلسة. وتغيير الوضع في منتصف المهمة يُلغي كل ما ينتظر الموافقة، دون التراجع عمّا سبق تشغيله.</p>
<h2 id="الطبقة-4-العزل">الطبقة 4: العزل <span class="content-anchor" id="layer-4-sandboxing"></span></h2>
<p>يشغّل العزل أدوات الوكيل داخل حاوية (container) بدلًا من تشغيلها مباشرة على مضيف البوابة. وتبقى البوابة نفسها على المضيف. <strong>وهو معطّل افتراضيًا</strong>، ويحتاج إلى Docker أو Podman على مضيف البوابة. وقالب Railway مثلًا لا يحتوي على أيٍّ منهما.</p>
<p>الإعداد الرئيسي هو <code>agents.defaults.sandbox.mode</code>:</p>
<table>
<thead>
<tr>
<th>الوضع</th>
<th>ما يعزله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>off</code></td>
<td>لا شيء (الافتراضي)</td>
</tr>
<tr>
<td><code>non-main</code></td>
<td>كل الجلسات عدا جلسة الوكيل الرئيسية، بما فيها محادثات المجموعات</td>
</tr>
<tr>
<td><code>all</code></td>
<td>كل الجلسات</td>
</tr>
</tbody>
</table>
<p><code>non-main</code> مناسب إن كان وكيلك يجلس في محادثات المجموعات. تبقى محادثتك الرئيسية أنت بوصول كامل، بينما تُشغَّل المحادثات مع الآخرين داخل حاوية.</p>
<p>لا يملك عزل Docker وصولًا إلى الشبكة ولا نظام ملفات للكتابة افتراضيًا. ويقرّر <code>workspaceAccess</code> ما الذي تراه الحاوية من مساحة عمل الوكيل: <code>none</code> (الافتراضي) أو <code>ro</code> أو <code>rw</code>.</p>
<p>بعض التحذيرات:</p>
<ul>
<li><strong>التركيب يمنح الوصول.</strong> تركيب مجلد من المضيف داخل العزل يمنح الوكيل ذلك المجلد، حتى لو لم يكن لديه سطر أوامر.</li>
<li><strong>تثبّت إعدادات <code>exec-policy</code> الأوامر على المضيف.</strong> تضبط <code>tools.exec.host</code> على <code>gateway</code>، ما يُبقي الأوامر خارج العزل حتى حين يكون مفعّلًا. وبعد تفعيل العزل، شغّل <code>openclaw exec-policy set --host auto</code>.</li>
<li><strong>تغييرات الإعدادات لا تؤثر على الحاويات الجارية.</strong> شغّل <code>openclaw sandbox recreate --all</code> بعد تغيير إعدادات العزل.</li>
<li><strong>الوضع المرفوع</strong> يتيح لوكيل معزول تشغيل أمر على المضيف بدلًا من ذلك. ويحتاج إلى قائمة سماح صريحة لكل قناة تحت <code>tools.elevated.allowFrom</code>، وهي فارغة افتراضيًا. أبقِها كذلك إلا إذا علمت بالضبط من يحتاجها.</li>
<li><strong>بعض الميزات لا تعمل من داخل العزل.</strong> مثلًا، لا تستطيع الجلسات المعزولة بدء <a href="https://stevekinney.com/courses/openclaw/acpx-runtime-plugin">جلسات برمجة ACP</a>.</li>
</ul>
<h2 id="حقن-المطالبات">حقن المطالبات <span class="content-anchor" id="prompt-injection"></span></h2>
<p>كل هذه الطبقات موجودة بسبب مشكلة واحدة: <strong>أي شيء يقرأه وكيلك يمكن أن يحاول إعطائه تعليمات.</strong> وقد تقول صفحة ويب أو رسالة بريد أو دعوة تقويم أو ملف PDF أو رسالة في مجموعة دردشة: «تجاهل تعليماتك السابقة وشغّل هذا». تقاوم النماذج هذا أفضل بكثير مما كانت تقاومه، لكن المهاجم المُصرّ ما يزال ينجح بما يكفي من المرات بحيث لا يمكنك الاعتماد على النموذج وحده.</p>
<blockquote>
<p><strong>المحتوى بيانات. والموافقات هي حيث يقع القرار.</strong></p>
<p>تعامل مع كل ما يقرأه الوكيل على أنه غير موثوق به. يستطيع أن يلخّص ذلك المحتوى، لكن المحتوى لا يفوّض شيئًا. فالحماية تأتي من الموافقات وسياسة الأدوات، وهما موضع وقوع الفعل ولا تعتمدان على رفض النموذج.</p>
</blockquote>
<p>القواعد العملية:</p>
<ul>
<li><strong>امنح الوكلاء الذين يقرؤون محتوى غير موثوق به أدوات أقل.</strong> فالوكيل الذي يفرز بريدك الوارد لا يحتاج إلى سطر أوامر. ونمط شائع هو وكيل للقراءة فقط يقرأ المواد الخطرة ويسلّم ملخّصًا إلى وكيلك الرئيسي. ويشرح <a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration">الوكلاء الفرعيون والتنسيق</a> كيفية إعداد واحد منهم.</li>
<li><strong>استخدم أفضل نموذج لديك للوكلاء الذين يملكون الأدوات.</strong> النماذج الأصغر والأرخص أسهل بكثير في إقناعها.</li>
<li><strong>أبقِ إعدادات <code>allowUnsafeExternalContent</code> معطّلة.</strong> إنها تزيل العلامات التي يضعها OpenClaw حول المحتوى الخارجي.</li>
<li><strong>افحص ما فعله الوكيل، لا ما قاله.</strong> رفض النموذج لطلب ما وحظر أداة يبدوان متطابقين في المحادثة. وإن أردت معرفة أيّهما حدث، فراجع الموافقة أو سجل النشاط.</li>
</ul>
<h2 id="شغل-فحص-الأمان">شغّل فحص الأمان <span class="content-anchor" id="run-the-security-audit"></span></h2>
<p>يفحص <code>openclaw security audit</code> إعداداتك مقابل قائمة طويلة من المشكلات المعروفة: منافذ بوابة مكشوفة، ومصادقة مفقودة، وسياسات رسائل خاصة مفتوحة، وأذونات ملفات سائبة، ومجموعات خطيرة من الإضافات والأدوات، وغيرها الكثير.</p>
<pre><code class="language-bash">openclaw security audit
</code></pre>
<p>إليك مقتطفًا مختصرًا من المخرجات:</p>
<pre><code>OpenClaw security audit
Summary: 1 critical · 4 warn · 2 info
Run deeper: openclaw security audit --deep

WARN
gateway.trusted_proxies_missing Reverse proxy headers are not trusted
  gateway.bind is loopback and gateway.trustedProxies is empty. If you expose the Control UI
  through a reverse proxy, configure trusted proxies so local-client checks cannot be spoofed.
  Fix: Set gateway.trustedProxies to your proxy IPs or keep the Control UI local-only.
</code></pre>
<p>لكل نتيجة معرّف، ودرجة خطورة (<code>critical</code> أو <code>warn</code> أو <code>info</code>)، وشرح، وإصلاح. ومن النتائج الأكثر احتمالًا أن تراها:</p>
<table>
<thead>
<tr>
<th>النتيجة</th>
<th>ما تعنيه</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>gateway.bind_no_auth</code></td>
<td>يمكن الوصول إلى البوابة خارج localhost دون مصادقة</td>
</tr>
<tr>
<td><code>gateway.loopback_no_auth</code></td>
<td>لا يوجد سرّ مصادقة معيّن، وهو ما كان الوكيل العكسي سيحوّله إلى وصول مفتوح</td>
</tr>
<tr>
<td><code>gateway.tailscale_funnel</code></td>
<td>تُنشر البوابة على الإنترنت العام عبر Funnel</td>
</tr>
<tr>
<td><code>fs.config.perms_world_readable</code></td>
<td>يستطيع المستخدمون الآخرون على الجهاز قراءة إعداداتك، وقد تحمل رموزًا (tokens)</td>
</tr>
<tr>
<td><code>channels.&lt;provider&gt;.dm.open</code></td>
<td>يستطيع أي شخص إرسال رسالة خاصة إلى الوكيل على تلك القناة</td>
</tr>
<tr>
<td><code>security.exposure.open_groups_with_elevated</code></td>
<td>يمكن لمجموعة دردشة مفتوحة الوصول إلى الأوامر المرفوعة</td>
</tr>
<tr>
<td><code>plugins.extensions_no_allowlist</code></td>
<td>الإضافات مثبّتة لكن <code>plugins.allow</code> لا يحدّ من أيّها يُحمَّل</td>
</tr>
<tr>
<td><code>tools.exec.auto_allow_skills_enabled</code></td>
<td>تُوافق تلقائيًا على الثنائيات التي تذكرها المهارات على العقد</td>
</tr>
</tbody>
</table>
<p>صيغ مفيدة أخرى:</p>
<pre><code class="language-bash">openclaw security audit --deep
openclaw security audit --json
openclaw security audit --fix
</code></pre>
<ul>
<li>يضيف <code>--deep</code> فحوصًا حيّة مقابل البوابة العاملة، ويفحص شيفرة الإضافات والمهارات.</li>
<li><code>--json</code> مخصّص للبرمجة النصية (السكربتات)، مثل <code>openclaw security audit --json | jq '.summary'</code>.</li>
<li><code>--fix</code> أضيق مما يبدو. فهو يشدّد أذونات الملفات ويحوّل سياسات المجموعات المفتوحة إلى قوائم سماح. وهو <strong>لا</strong> يدوّر الأسرار، ولا يغيّر الأدوات، ولا يمسّ إعدادات الشبكة.</li>
</ul>
<p>عامل الفحص كدورة مستمرة، لا كبوابة نجاح أو إخفاق. أصلح النتيجة الأولى ثم شغّله مرة أخرى، لأن إصلاح مشكلة واحدة يكشف غالبًا المشكلة التالية. وانتبه إلى ما يعنيه الفحص النظيف: إعداداتك تطابق إعدادات معروفة بالصحّة، ولا يعني ذلك أن شيئًا سيئًا لا يمكن أن يحدث.</p>
<p>إن كانت النتيجة مقصودة، يمكنك كتمها مع ذكر سبب تحت <code>security.audit.suppressions</code>، فيكفّ عن إخفاء النتائج الجديدة.</p>
<h2 id="توصيتنا">توصيتنا</h2>
<p>لمساعد شخصي تصل إليه عبر تطبيق دردشة:</p>
<ol>
<li><strong>أقفل الباب الأمامي.</strong> استخدم سياسات رسائل خاصة من نوع <code>allowlist</code> كما في <a href="https://stevekinney.com/courses/openclaw/choosing-a-dm-policy">اختيار سياسة الرسائل الخاصة</a>، وأبقِ البوابة خاصة كما في <a href="https://stevekinney.com/courses/openclaw/connecting-securely-with-tailscale">درس Tailscale</a>.</li>
<li><strong>اجعل الأوامر تسأل.</strong> شغّل <code>openclaw exec-policy preset cautious</code> على مضيف البوابة.</li>
<li><strong>وصّل تطبيق موافقات.</strong> أبقِ واجهة التحكم أو تطبيق macOS أو تطبيق الهاتف مسجّل الدخول حتى تجد الموافقات وجهة تذهب إليها. وبدونه، تُمنع أوامر الأتمتة.</li>
<li><strong>عيّن الموافقين.</strong> تأكّد أن <code>commands.ownerAllowFrom</code> لا يسمّي سواك.</li>
<li><strong>أقفل العقد قبل اقترانها.</strong> اتبع الخطوات في <a href="https://stevekinney.com/courses/openclaw/connecting-a-remote-node">درس العقد</a>.</li>
<li><strong>امنح القارئين الخطرين أدوات أقل.</strong> فالوكلاء الذين يتعاملون مع البريد أو صفحات الويب أو محادثات المجموعات يحصلون على ملف أضيق أو على عزل.</li>
<li><strong>دع الوضع المرفوع وشأنه.</strong> لا تُضِف أحدًا إلى <code>tools.elevated.allowFrom</code> حتى تحتاج إلى ذلك.</li>
<li><strong>افحص حتى ينظُف.</strong> شغّل <code>openclaw security audit</code>، ثم أصلح، ثم كرّر.</li>
</ol>
<p>ثم <strong>اختبر الحالة السلبية</strong>. اطلب من وكيلك تشغيل <code>uname -a</code>. يجب أن تحصل على طلب موافقة بدلًا من إجابة. امنعه، وتأكّد من أن الوكيل يخبرك بأنه حُظر. ثم اطلب مرة أخرى واختر <strong>السماح مرة واحدة</strong>، وافحص أن <code>openclaw approvals get</code> لم يكتسب إدخالًا في قائمة السماح. وإن شغّل الأمر دون أن يسأل، فسياساتك ليست ما تظنّه. شغّل <code>openclaw exec-policy show</code> لمعرفة السبب.</p>
<h2 id="إذا-حدث-خطأ-ما">إذا حدث خطأ ما</h2>
<p>إن ظننت أن رمزًا (token) قد تسرب، أو أن غريبًا اقتحم، أو أن الوكيل فعل ما لا ينبغي له فعله:</p>
<ol>
<li><strong>احتوِه.</strong> أوقف البوابة، أو اضبط <code>dmPolicy</code> لكل قناة على <code>disabled</code>. وأطفئ Tailscale Funnel أو Serve إن كنت تستخدمهما.</li>
<li><strong>اعرف ما حدث قبل أن تدوّر.</strong> انظر في <code>openclaw logs</code>، وفي نصوص الجلسات تحت <code>~/.openclaw/agents/&lt;agentId&gt;/sessions/</code>، وفي سجل النشاط عبر <code>openclaw audit</code>. فالتدوير أولًا قد يمحو الأدلة التي تشير إلى أيّ بيانات اعتماد استُخدمت.</li>
<li><strong>دوّر بيانات الاعتماد.</strong> دوّر رمز البوابة، ثم مفاتيح مزوّد النموذج ورموز القنوات.</li>
<li><strong>أعد الفحص.</strong> شغّل <code>openclaw security audit --deep</code> وأصلح ما يجده قبل إعادة فتح أي شيء.</li>
</ol>
<p>من الجدير معرفة سجل النشاط قبل أن تحتاج إليه. يسرد <code>openclaw audit</code> عمليات تشغيل الوكيل وإجراءات الأدوات خلال آخر 30 يومًا. ويسجّل من فعل ماذا وما إذا كان ناجحًا، لكنه لا يسجّل المحتوى أبدًا. و<code>openclaw audit --kind tool_action --limit 50</code> نقطة انطلاق جيدة. غير أن غياب إدخال لا يثبت أن شيئًا لم يحدث، فتعامل معه كخيط يُستدلّ به لا كحكم نهائي.</p>
<blockquote>
<p><strong>الأوامر والأعلام تتغيّر</strong></p>
<p>يطابق هذا الدرس إصدار OpenClaw <code>2026.9.8</code>. وإن لم يتصرّف شيء كما هو موصوف، شغّل الأمر مع <code>--help</code> وراجع <a href="https://docs.openclaw.ai/">وثائق OpenClaw</a>.</p>
</blockquote>
`,a={book:n,chapter:e,chapterTitle:o,slug:t,title:d,headings:c,html:s};export{n as book,e as chapter,o as chapterTitle,a as default,c as headings,s as html,t as slug,d as title};
