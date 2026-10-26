const e="kinney",o="openclaw",n="OpenClaw: مساعدك الذكي الشخصي",s="browser-setup-and-use",t="إعداد المتصفح واستخدامه",r=[{depth:2,id:"كيف-يعمل",text:"كيف يعمل"},{depth:2,id:"اختر-ملف-التعريف",text:"اختر ملف التعريف"},{depth:2,id:"الخطوة-1-تأكد-من-توفر-المتصفح",text:"الخطوة 1: تأكّد من توفر المتصفح"},{depth:2,id:"الخطوة-2-شغله-وألق-نظرة",text:"الخطوة 2: شغّله وألقِ نظرة"},{depth:2,id:"الخطوة-3-العمل-على-الصفحة",text:"الخطوة 3: العمل على الصفحة"},{depth:2,id:"الخطوة-4-دع-الوكيل-يقود",text:"الخطوة 4: دع الوكيل يقود"},{depth:2,id:"أنشئ-ملفات-تعريف-خاصة-بك",text:"أنشئ ملفات تعريف خاصة بك"},{depth:2,id:"إدخال-تسجيل-دخول-إلى-المتصفح",text:"إدخال تسجيل دخول إلى المتصفح"},{depth:2,id:"إعدادات-يجدر-معرفتها",text:"إعدادات يجدر معرفتها"},{depth:2,id:"ضوابط-الأمان",text:"ضوابط الأمان"},{depth:2,id:"جربه-بنفسك",text:"جرّبه بنفسك"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"}],c=`<p>كثير من محتوى الويب لا يمكن قراءته بمجرد جلب عنوان URL. فالصفحات تبني نفسها بـ JavaScript، وتُخفي محتواها خلف النقرات، وتضع الجزء المفيد خلف نموذج أو تسجيل دخول. يمنح <strong>المتصفح</strong> في OpenClaw وكيلك متصفحًا فعليًا يقوده: يفتح الصفحات، ويقرأ ما عليها، وينقر، ويكتب، ويأخذ لقطات شاشة، ويحفظ ملفات PDF.</p>
<p>وهذا يختلف عن البحث في الويب أو الجلب العادي، وهو يحمل صلاحية أكبر. فالمتصفح يستطيع إرسال النماذج واستخدام أي جلسات لديه. ويُبقي الإعداد في هذا الدرس تلك الصلاحية محدودة.</p>
<h2 id="كيف-يعمل">كيف يعمل</h2>
<p>يمتلك الوكيل أداة واحدة اسمها <code>browser</code>، تغطي عددًا من الإجراءات: التحقق من الحالة، والتشغيل والإيقاف، وسرد الألسنة وفتحها، وأخذ اللقطات ولقطات الشاشة، والتنقل، والعمل على الصفحة.</p>
<p>وثمة فكرتان تجعلان متابعة كل ما تبقى أسهل.</p>
<p><strong>المتصفح المُدار منفصل عن متصفحك.</strong> يشغّل OpenClaw افتراضيًا نسخة Chrome خاصة به بدليل بيانات خاص، وتتحكم فيها خدمة صغيرة داخل البوابة (Gateway) تستمع على واجهة loopback فقط. ولواجهتها لون برتقالي يميّزها عن متصفحك، وهي لا تلمس ملف التعريف الشخصي لمتصفحك أبدًا. وتبدأ بلا أي تسجيلات دخول، وهذا هو المقصود.</p>
<p><strong>يعمل الوكيل انطلاقًا من اللقطات.</strong> فبدلًا من تخمين مواضع البكسلات، يطلب <strong>لقطة</strong>: عرضًا مُهيكلًا للصفحة يحصل فيه كل عنصر تحكم على مرجع قصير مثل <code>e12</code>. وللنقر على زر يقول: «انقر <code>e12</code>». وإذا تغيّرت الصفحة واختفى عنصر التحكم، يفشل المرجع، والحل هو أخذ لقطة جديدة.</p>
<h2 id="اختر-ملف-التعريف">اختر ملف التعريف</h2>
<p>يحدد <strong>ملف التعريف</strong> المتصفح الذي يخاطبه الوكيل، وبالتالي ملفات تعريف الارتباط التي يملكها. وهناك ثلاثة ملفات مدمجة.</p>
<table>
<thead>
<tr>
<th>ملف التعريف</th>
<th>ما هو</th>
<th>متى تستخدمه</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>openclaw</code></td>
<td>متصفح مُدار ومعزول بلا تسجيلات دخول. وهو الافتراضي.</td>
<td>في معظم الحالات تقريبًا: الصفحات العامة، والاختبار، وأي مهمة لا تحتاج تسجيل دخول.</td>
</tr>
<tr>
<td><code>user</code></td>
<td>يرتبط بنسخة Chrome الحقيقية المسجّل الدخول إليها، ويسأل Chrome في المرة الأولى: «هل تسمح بالتصحيح عن بُعد؟»</td>
<td>عندما تحتاج جلسة مسجّلة الدخول وتكون أنت أمام الحاسوب.</td>
</tr>
<tr>
<td><code>chrome</code></td>
<td>نسخة Chrome الحقيقية المسجّل الدخول إليها، عبر إضافة OpenClaw. بلا مطالبة، ويعمل عندما تكون بعيدًا.</td>
<td>عندما تحتاج جلسة مسجّلة الدخول ولا يكون أحد أمام المكتب.</td>
</tr>
</tbody>
</table>
<p>استخدم <code>openclaw</code> ما لم تكن المهمة لا تستطيع العمل فعلًا دون تسجيل دخول. فإرفاق متصفحك الحقيقي يمنح الوكيل ملفات تعريف الارتباط الخاصة بك، وألسنتك المفتوحة، وكل حساب مسجّل الدخول إليه، ونقرة واحدة قد ترسل رسالة أو تُجري عملية شراء.</p>
<p>تختار ملف التعريف من سطر الأوامر بـ <code>--browser-profile &lt;name&gt;</code>، أو يختاره الوكيل بمعامل <code>profile</code>. وإن لم تضبط شيئًا، فستحصل على <code>openclaw</code>.</p>
<h2 id="الخطوة-1-تأكد-من-توفر-المتصفح">الخطوة 1: تأكّد من توفر المتصفح</h2>
<p>المتصفح إضافة مُضمّنة ومفعّلة افتراضيًا. تحقّق من جاهزيتها:</p>
<pre><code class="language-bash">openclaw browser doctor
openclaw browser status
</code></pre>
<p>يتحقق <code>doctor</code> من الجاهزية. ويذهب <code>doctor --deep</code> أبعد من ذلك فيجري فحص لقطة حيًا.</p>
<p>إذا كان هناك شيء ناقص، فهناك ثلاثة مفاتيح يجب التحقق منها. ويحتاج المتصفح إليها جميعًا:</p>
<ol>
<li><strong>الإضافة والإعداد.</strong> يجب أن تكون إضافة المتصفح مفعّلة، وأن تكون قيمة <code>browser.enabled</code> هي <code>true</code>. وإذا بدا أن تغييرًا لا يسري مفعوله، فأعد تشغيل البوابة.</li>
<li><strong>قائمة السماح للإضافات.</strong> إذا كنت قد قيّدت الإضافات بـ <code>plugins.allow</code>، فيجب أن يكون <code>browser</code> في تلك القائمة: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#ECC48D"> plugins</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#ECC48D"> allow</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">telegram</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">, </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">browser</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> ثم شغّل <code>openclaw plugins enable browser</code>. ولا تكفي إعادة التشغيل وحدها لإصلاح استبعاد تفرضه السياسة.</li>
<li><strong>سياسة الأدوات.</strong> يجب أيضًا أن يكون مسموحًا للوكيل باستخدام الأداة. وإذا لم يكن ملف أدواتك يشملها، فأضفها: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#ECC48D"> tools</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#ECC48D"> profile</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">coding</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#ECC48D"> alsoAllow</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">browser</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> وللسماح بها لوكيل واحد، استخدم <code>agents.entries.&lt;id&gt;.tools.alsoAllow</code> بدلًا من ذلك. والسماح بها لـ<a href="https://stevekinney.com/courses/openclaw/subagents-and-orchestration">الوكلاء الفرعيين</a> إعداد منفصل، ولا يكفي وحده.</li>
</ol>
<blockquote>
<p><strong>بعض عمليات النشر تعطّله</strong></p>
<p>فمثلًا، يأتي قالب <a href="https://railway.com/?referralCode=kinney">Railway</a> مع تعطيل التحكم بالمتصفح وغياب Chromium من الصورة. وهذا خيار أمني متعمّد. وإذا كنت تعمل على إعداد كهذا، فإن تفعيل المتصفح قرار تتخذه، وليس وضعًا افتراضيًا.</p>
</blockquote>
<h2 id="الخطوة-2-شغله-وألق-نظرة">الخطوة 2: شغّله وألقِ نظرة</h2>
<p>جرّب الدورة كاملة بنفسك ويدويًا قبل أن تسلّمها إلى الوكيل. فهي مجموعة الإجراءات نفسها التي يستخدمها الوكيل:</p>
<pre><code class="language-bash">openclaw browser start
openclaw browser open https://example.com
openclaw browser tabs
openclaw browser snapshot
</code></pre>
<p>تُفتح نافذة Chrome مُدارة بلون برتقالي. ويطبع <code>snapshot</code> الصفحة على شكل شجرة، مع مرجع بجوار كل عنصر تحكم. وهذا هو ما يقرأه الوكيل.</p>
<p>وفيما يلي بعض الخيارات التي يجدر معرفتها:</p>
<pre><code class="language-bash">openclaw browser start --headless      <span class="hljs-comment"># No visible window, for this request</span>
openclaw browser snapshot --urls       <span class="hljs-comment"># Include link destinations</span>
openclaw browser screenshot            <span class="hljs-comment"># A picture of the page</span>
openclaw browser screenshot --labels   <span class="hljs-comment"># The picture, with snapshot references drawn on it</span>
openclaw browser screenshot --full-page
</code></pre>
<p>لقطة الشاشة المُوسومة هي أفضل طريقة لبناء الحدس. فهي تضع مراجع اللقطة فوق الصفحة نفسها، بحيث ترى بالضبط أي عنصر تحكم هو <code>e12</code>.</p>
<h2 id="الخطوة-3-العمل-على-الصفحة">الخطوة 3: العمل على الصفحة</h2>
<p>الآن استخدم تلك المراجع. خذ لقطة، وابحث عن عنصر التحكم الذي تريده، ثم اعمل عليه:</p>
<pre><code class="language-bash">openclaw browser click e12
openclaw browser <span class="hljs-built_in">type</span> e7 <span class="hljs-string">&quot;hello&quot;</span>
openclaw browser press Enter
openclaw browser <span class="hljs-built_in">wait</span> --text <span class="hljs-string">&quot;Done&quot;</span>
</code></pre>
<p>وتتبع الإجراءات الأخرى النمط نفسه: <code>hover</code> و<code>select</code> و<code>drag</code> و<code>fill</code> و<code>scrollintoview</code> وغيرها. شغّل <code>openclaw browser --help</code> للحصول على القائمة الكاملة في نسختك.</p>
<p>وعادتان ستوفران عليك كثيرًا من العناء:</p>
<ul>
<li><strong>فضّل المراجع على الإحداثيات.</strong> فهناك أمر <code>click-coords</code>، لكن المراجع تصمد أمام تغيّرات التخطيط بينما لا تصمد مواضع البكسلات.</li>
<li><strong>أعد أخذ اللقطة عند فشل أي شيء.</strong> إذا لم يُحدث النقر أثرًا أو توقف مرجع عن العمل، فمن المرجح أن الصفحة أُعيد تصييرها. خذ لقطة جديدة واستخدم المرجع الجديد، ولا تكرر الاستدعاء نفسه.</li>
</ul>
<p>وعندما تنتهي، أغلقه:</p>
<pre><code class="language-bash">openclaw browser stop
</code></pre>
<h2 id="الخطوة-4-دع-الوكيل-يقود">الخطوة 4: دع الوكيل يقود</h2>
<p>كل ما فعلته للتو بيدك يستطيع الوكيل فعله داخل محادثة. فأنت لا تكتب أوامر، بل تصف الهدف وتضع القواعد الأساسية.</p>
<blockquote>
<p>باستخدام المتصفح، افتح <a href="https://news.ycombinator.com/">https://news.ycombinator.com</a>، واقرأ أهم عشر قصص، وأعطني ملخصًا من سطر واحد لكل قصة. استخدم المتصفح لا البحث في الويب. وأخبرني بما فعلت، وتوقف إذا واجهت صفحة تسجيل دخول.</p>
</blockquote>
<p>في واجهة التحكم (Control UI)، يُفتح المتصفح في لوحة جانبية بجوار المحادثة، موسومة بملف التعريف <code>openclaw</code>، لتتمكن من مشاهدة الصفحة التي يعمل عليها الوكيل.</p>
<p><img src="/arabic-cs-library/images/kinney/89adfa13fd53a202.webp" alt="محادثة واجهة التحكم مع لوحة جانبية للمتصفح تعرض example.com تحت ملف التعريف openclaw، إلى جانب ملخص الوكيل للصفحة"></p>
<p>ومطالبة المتصفح الجيدة تفعل عدة أشياء:</p>
<ul>
<li><strong>تسمّي ملف التعريف</strong> عندما يكون ذلك مهمًا. وعبارة «استخدم ملف التعريف <code>openclaw</code>» افتراض جيد ينبغي التصريح به.</li>
<li><strong>تنص على استخدام المتصفح فعليًا</strong> بدلًا من البحث أو التخمين.</li>
<li><strong>تطلب السرد</strong>، لتتمكن من رؤية الخطوات التي اتخذها، وتطلب لقطات شاشة لأي شيء مثير للاهتمام.</li>
<li><strong>تحدد متى يتوقف.</strong> فجدار تسجيل الدخول أو نموذج الدفع أو اختبار CAPTCHA يجب أن يُنهي المهمة، لا أن يتحول إلى لغز يجب حله.</li>
<li><strong>تفصل النظر عن التصرف.</strong> فـ«اقرأ» و«لخّص» مختلفتان تمامًا عن «أرسل» و«اشترِ».</li>
</ul>
<p>وللحصول على مطالبات جاهزة، بما في ذلك ملخص لـ GitHub Trending وجولة QA استكشافية كاملة، راجع <a href="https://stevekinney.com/courses/openclaw/openclaw-browser-prompts">مطالبات متصفح OpenClaw</a>.</p>
<blockquote>
<p><strong>وهناك مهارة مُضمّنة أيضًا</strong></p>
<p>عند تفعيل إضافة المتصفح، تأتي معها مهارة <code>browser-automation</code>. ولا تحتاج إلى فعل أي شيء لاستخدامها، لكن من المفيد أن تعرف أنها موجودة عندما تفحص <code>openclaw skills list</code>.</p>
</blockquote>
<h2 id="أنشئ-ملفات-تعريف-خاصة-بك">أنشئ ملفات تعريف خاصة بك</h2>
<p>تغطي ملفات التعريف المدمجة معظم الاحتياجات، لكن يمكنك إنشاء المزيد. فملف التعريف المسمّى يتيح لك الاحتفاظ بمجموعة منفصلة من ملفات تعريف الارتباط لغرض واحد، أو الإشارة إلى متصفح مختلف.</p>
<pre><code class="language-bash">openclaw browser create-profile --name work --color <span class="hljs-string">&quot;#FF5A36&quot;</span>
openclaw browser profiles
</code></pre>
<p>وفيما يلي بعض الصيغ المتنوعة:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Attach to a signed-in Chrome through Chrome DevTools</span>
openclaw browser create-profile --name chrome-live --driver existing-session

<span class="hljs-comment"># Point at a remote browser over CDP</span>
openclaw browser create-profile --name remote --cdp-url https://browser-host.example.com
</code></pre>
<p>واحذف ملف التعريف الذي لم تعد تحتاجه بـ <code>openclaw browser delete-profile --name work</code>.</p>
<p>إنشاء ملف تعريف لا يجعله الافتراضي. فسيواصل الوكيل استخدام <code>openclaw</code> ما لم تسمِّ ملف التعريف الجديد في المطالبة أو تضبط <code>browser.defaultProfile</code>. واترك الافتراضي كما هو ما لم يكن لديك سبب لتغييره. وإذا ضبطته على <code>user</code>، فستبدأ <strong>كل</strong> مهمة تصفح في متصفحك الحقيقي المسجّل الدخول إليه.</p>
<h2 id="إدخال-تسجيل-دخول-إلى-المتصفح">إدخال تسجيل دخول إلى المتصفح</h2>
<p>يبدأ ملف التعريف المُدار فارغًا، لذا تصطدم أي مهمة خلف تسجيل دخول بحائط. ولديك خيارات، من الأكثر أمانًا إلى الأكثر خطورة:</p>
<ol>
<li><strong>تجاوز تسجيل الدخول.</strong> وجّه المهمة إلى صفحات عامة.</li>
<li><strong>سجّل الدخول يدويًا إلى حساب مؤقت</strong> داخل المتصفح المُدار.</li>
<li><strong>انسخ ملفات تعريف ارتباط محددة.</strong> على Mac، ينسخ <code>openclaw browser import-profile</code> ملفات تعريف الارتباط من ملف تعريف من عائلة Chrome إلى ملف مُدار جديد، مرة واحدة. وأضف <code>--domains</code> لحصره في المواقع التي تحتاجها. وهذا ينسخ ملفات تعريف الارتباط فقط، لا كلمات المرور. وإذا كانت البوابة على جهاز آخر، فاستخدم <a href="https://stevekinney.com/courses/openclaw/syncing-cookies-to-a-remote-gateway">مزامنة ملفات تعريف الارتباط</a> بدلًا من ذلك.</li>
<li><strong>أرفق متصفحك الحقيقي</strong> باستخدام ملفي التعريف <code>user</code> أو <code>chrome</code>.</li>
</ol>
<p>وإذا جرّبت ملف التعريف <code>user</code>، فإليك طريقة آمنة لاختباره. راقب ظهور <code>driver: existing-session</code> و<code>transport: chrome-mcp</code> و<code>running: true</code> في الحالة:</p>
<pre><code class="language-bash">openclaw browser --browser-profile user start
openclaw browser --browser-profile user status
openclaw browser --browser-profile user tabs
openclaw browser --browser-profile user snapshot --format ai
</code></pre>
<p>يعرض Chrome مطالبة في المرة الأولى، ويجب أن يوافق عليها شخص ما. ولهذا أيضًا ستتوقف أي مهمة مجدولة تطلب <code>user</code> عند المطالبة دون أي خطأ حتى تعود إلى الحاسوب. أما ملف تعريف إضافة <code>chrome</code> فهو الذي يعمل أثناء غيابك. ولإعداده، ابدأ بـ <code>openclaw browser extension setup --action inspect</code>، ثم <code>--action install</code> و<code>--action verify</code>، وتحقّق من <code>openclaw browser extension --help</code> لمعرفة بقية الخيارات.</p>
<h2 id="إعدادات-يجدر-معرفتها">إعدادات يجدر معرفتها</h2>
<p>نادرًا ما تحتاج إلى تغيير هذه الإعدادات، لكن من الجيد معرفة أنها موجودة. اضبطها بـ <code>openclaw config set</code>:</p>
<table>
<thead>
<tr>
<th>المفتاح</th>
<th>الافتراضي</th>
<th>ما يفعله</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>browser.enabled</code></td>
<td><code>true</code></td>
<td>يفعّل التحكم بالمتصفح أو يعطّله.</td>
</tr>
<tr>
<td><code>browser.defaultProfile</code></td>
<td><code>&quot;openclaw&quot;</code></td>
<td>ملف التعريف المستخدم عند عدم تسمية أي ملف. اضبطه على <code>&quot;user&quot;</code> عن قصد فقط.</td>
</tr>
<tr>
<td><code>browser.headless</code></td>
<td><code>false</code> (مثال الوثائق)</td>
<td>يشغّل المتصفحات المحلية المُدارة دون نافذة.</td>
</tr>
<tr>
<td><code>browser.executablePath</code></td>
<td>كشف تلقائي</td>
<td>متصفح Chromium الذي سيُشغّل. اضبطه إذا كان الكشف التلقائي يختار المتصفح الخطأ.</td>
</tr>
<tr>
<td><code>browser.attachOnly</code></td>
<td><code>false</code> (مثال الوثائق)</td>
<td>لا يشغّل متصفحًا أبدًا، بل يرتبط فقط بمتصفح يعمل بالفعل.</td>
</tr>
<tr>
<td><code>browser.evaluateEnabled</code></td>
<td><code>true</code></td>
<td>عند ضبطه على <code>false</code>، لا يستطيع الوكيل تشغيل JavaScript عشوائي على صفحة.</td>
</tr>
<tr>
<td><code>browser.ssrfPolicy</code></td>
<td>انظر أدناه</td>
<td>العناوين التي يُسمح للمتصفح بالانتقال إليها.</td>
</tr>
<tr>
<td><code>browser.tabCleanup.enabled</code></td>
<td><code>true</code></td>
<td>يغلق الألسنة الخاملة دوريًا.</td>
</tr>
</tbody>
</table>
<p>فمثلًا، للإشارة إلى نسخة Chrome محددة:</p>
<pre><code class="language-bash">openclaw config <span class="hljs-built_in">set</span> browser.executablePath <span class="hljs-string">&quot;/usr/bin/google-chrome&quot;</span>
</code></pre>
<p>تستمع خدمة التحكم بالمتصفح على واجهة loopback (المنفذ <code>18791</code> افتراضيًا، وهو مشتق من منفذ البوابة)، وتستخدم ملفات التعريف المحلية المُدارة منافذ في النطاق من <code>18800</code> إلى <code>18899</code>. ولا تحتاج عادةً إلى التعامل مع هذه المنافذ، لكن من المفيد التعرف عليها في السجلات.</p>
<p>تُطبَّق كثير من إعدادات <code>browser.*</code>، بما فيها ملفات التعريف وملف التعريف الافتراضي و<code>browser.enabled</code> نفسه، دون إعادة تشغيل البوابة. وبعضها يفعل ذلك باستبدال خدمة التحكم بالمتصفح، ما يلغي أي عمليات معلّقة. أما مرحّل إضافة Chrome وبعض الإعدادات الأخرى فتحتاج فعلًا إلى إعادة تشغيل.</p>
<h2 id="ضوابط-الأمان">ضوابط الأمان</h2>
<ul>
<li><strong>تعامل مع محتوى الصفحة كمحتوى غير موثوق.</strong> فنص الصفحة وأخطاؤها محتوى خارجي. ويمكن أن تحتوي صفحة ويب على تعليمات موجهة إلى وكيلك، ويسهّل المتصفح على الوكيل التصرف بناءً عليها.</li>
<li><strong>عطّل تنفيذ JavaScript إن لم تكن تحتاجه.</strong> فإعداد <code>browser.evaluateEnabled: false</code> يزيل الإجراء الوحيد الذي يشغّل كودًا عشوائيًا على الصفحة.</li>
<li><strong>انتبه إلى سياسة الشبكة.</strong> فسياسة SSRF تتحكم في الأماكن التي يجوز للمتصفح الانتقال إليها. اترك الوصول إلى الشبكة الخاصة معطّلًا ما لم يتطلبه إعداد موثوق، وعندما تضطر إلى فتحه، فضّل <code>allowedHostnames</code> مع أسماء مضيفين محددة على <code>dangerouslyAllowPrivateNetwork</code>.</li>
<li><strong>المتصفح والصدفة مساران منفصلان.</strong> فالمتصفح يمكنه الوصول إلى صفحة لا تستطيع الصدفة الوصول إليها، والصدفة يمكنها إرسال بيانات إلى الخارج دون استخدام المتصفح إطلاقًا. راجع كلًا منهما على حدة.</li>
<li><strong>احترس من التنزيلات.</strong> فالملفات التي ينزّلها المتصفح تُحفظ في دليل التنزيلات الخاص بـ OpenClaw (<code>/tmp/openclaw/downloads</code> افتراضيًا). وتعامل مع كل تنزيل كمدخل غير موثوق.</li>
<li><strong>ملف التعريف المسجّل الدخول يستطيع فعل كل ما تستطيعه أنت.</strong> استخدم حسابًا مخصصًا للاختبار حيثما أمكن، وحدّد نطاق أدوات الوكيل للمهام التي تستخدمه، وتأكد من اللسان وملف التعريف قبل أي إجراء مدمّر. ولا تجعل صياغة مهارة هي ما يمنع عملية شراء أو إرسال رسالة، بل أزل القدرة نفسها.</li>
<li><strong>أبقِ البوابة خاصة.</strong> فالتحكم بالمتصفح مقتصر على loopback، ومصادقته تمر عبر البوابة. لا تعرّض خدمة التحكم للإنترنت.</li>
</ul>
<h2 id="جربه-بنفسك">جرّبه بنفسك</h2>
<ol>
<li><strong>يدويًا.</strong> شغّل <code>doctor</code> و<code>start</code> و<code>open https://example.com</code> و<code>snapshot</code> و<code>screenshot --labels</code> و<code>stop</code>. وطابق الوسوم في الصورة مع المراجع في اللقطة.</li>
<li><strong>صفحة عامة.</strong> اطلب من وكيلك فتح صفحة أخبار، وقراءة أهم القصص، وتلخيصها، باستخدام المتصفح لا البحث في الويب. وتحقق من أنه يخبرك بما فعل.</li>
<li><strong>جدار تسجيل دخول.</strong> اطلب منه فتح صفحة تتطلب تسجيل الدخول والإبلاغ عما يراه. وينبغي أن يتوقف ويخبرك. وإذا حاول تسجيل الدخول، فشدد مطالبتك.</li>
<li><strong>مرجع قديم.</strong> خذ لقطة لصفحة متغيرة، وأحدث التغيير، وجرّب المرجع القديم. ثم خذ لقطة جديدة وستنجح. وهذا هو أكثر ما ستصطدم به عند تصحيح الأخطاء.</li>
<li><strong>مطالبة ضمان الجودة.</strong> شغّل اختبار TodoMVC الاستكشافي من <a href="https://stevekinney.com/courses/openclaw/openclaw-browser-prompts">درس مطالبات المتصفح</a> واقرأ التقرير الذي ينتجه.</li>
</ol>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<p>ابدأ بـ <code>openclaw browser doctor</code>. ثم طابق العَرَض:</p>
<table>
<thead>
<tr>
<th>العَرَض</th>
<th>ما يجب التحقق منه</th>
</tr>
</thead>
<tbody>
<tr>
<td>«المتصفح معطّل»</td>
<td>الإضافة أو <code>browser.enabled</code> معطّل. تحقق من كليهما، ثم أعد تشغيل البوابة.</td>
</tr>
<tr>
<td>الوكيل يقول إنه لا يملك أداة متصفح</td>
<td>قائمة <code>plugins.allow</code> لا تتضمن <code>browser</code>، أو سياسة الأدوات لا تسمح بها. راجع الخطوة 1.</td>
</tr>
<tr>
<td>«المتصفح غير متاح»</td>
<td>انظر إلى حالة العملية، وأي ملف Chrome التنفيذي تم اختياره، وما إذا كان ملف التعريف مقفلًا، ونقطة نهاية CDP، قبل أن تلوم الصفحة.</td>
</tr>
<tr>
<td>Chrome لا يبدأ على خادم</td>
<td>قد لا يكون هناك متصفح قائم على Chromium مثبّت. ثبّت واحدًا واضبط <code>browser.executablePath</code>.</td>
</tr>
<tr>
<td>«تم رفض التنقل»</td>
<td>حُجب عنوان URL بسياسة الخروج، وربما بعد إعادة توجيه. تحقق من سياسة SSRF قبل تغيير أي شيء آخر.</td>
</tr>
<tr>
<td>«لا يوجد لسان»</td>
<td>أنت على ملف التعريف الخطأ، أو أن الجلسة لم تُرتبط قط.</td>
</tr>
<tr>
<td>«لم يُحدث النقر أثرًا»</td>
<td>أُعيد تصيير الصفحة. خذ لقطة جديدة واستخدم المرجع الجديد.</td>
</tr>
<tr>
<td>تنتهي مهلة لقطة الشاشة</td>
<td>انتظر انتهاء الالتقاط. وإذا ظل عالقًا، فأغلق اللسان وأعد فتحه.</td>
</tr>
<tr>
<td>مهمة مجدولة تستخدم <code>user</code> تتوقف بلا سبب</td>
<td>إنها تنتظر مطالبة الارتباط في Chrome. استخدم <code>chrome</code> أو ملف تعريف مُدار للأعمال غير المراقبة.</td>
</tr>
</tbody>
</table>
<p>من المفيد التفكير في أي إخفاق على أنه سلسلة: اختير ملف التعريف الصحيح، والصفحة التي وجدها كانت الصحيحة، والإجراء كان مسموحًا به وفق السياسة، ثم تُثبت الصفحة بعد ذلك أنه نجح. فابحث عن أول حلقة مكسورة.</p>
<blockquote>
<p><strong>الإصدارات والتحديثات</strong></p>
<p>يتبع هذا الدرس وثائق OpenClaw للإصدار <code>2026.9.x</code>. ولا تعرض الوثائق ناتجًا نموذجيًا لأمرَي <code>doctor</code> أو <code>status</code>، لذا لا يعرضه الدرس أيضًا. شغّل <code>openclaw browser --help</code> في نسختك للتأكد من الأوامر والرايات الدقيقة.</p>
</blockquote>
`,d={book:e,chapter:o,chapterTitle:n,slug:s,title:t,headings:r,html:c};export{e as book,o as chapter,n as chapterTitle,d as default,r as headings,c as html,s as slug,t as title};
