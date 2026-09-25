const e="missing-semester",n="development-environment",o="بيئة التطوير والأدوات",s="index",i="بيئة التطوير والأدوات",t=[{depth:2,id:"التحرير-النمطي-modal-editing",text:"التحرير النمطي (Modal Editing)"},{depth:2,id:"الأساسيات-إدراج-النص",text:"الأساسيات: إدراج النص"},{depth:2,id:"واجهة-vim-هي-لغة-برمجة",text:"واجهة Vim هي لغة برمجة"},{depth:3,id:"الحركة",text:"الحركة"},{depth:3,id:"التحديد",text:"التحديد"},{depth:3,id:"التعديلات",text:"التعديلات"},{depth:3,id:"العدادات-counts",text:"العدّادات (Counts)"},{depth:3,id:"المعدلات-modifiers",text:"المعدِّلات (Modifiers)"},{depth:2,id:"تجميع-كل-ذلك-معا",text:"تجميع كل ذلك معًا"},{depth:2,id:"تعلم-vim",text:"تعلُّم Vim"},{depth:3,id:"موارد-إضافية",text:"موارد إضافية"},{depth:2,id:"إعداد-خوادم-اللغات",text:"إعداد خوادم اللغات"},{depth:2,id:"الإكمال-التلقائي-autocomplete",text:"الإكمال التلقائي (Autocomplete)"},{depth:2,id:"الدردشة-المضمنة-inline-chat",text:"الدردشة المضمّنة (Inline Chat)"},{depth:2,id:"وكلاء-البرمجة-coding-agents",text:"وكلاء البرمجة (Coding Agents)"},{depth:2,id:"البرامج-الموصى-بها",text:"البرامج الموصى بها"}],l=`<p class="lecture-video"><iframe src="https://www.youtube-nocookie.com/embed/QnM1nVzrkx8" title="بيئة التطوير والأدوات" loading="lazy" allowfullscreen></iframe></p>
<p><em>بيئة التطوير</em> (Development Environment) هي مجموعة من الأدوات المستخدمة لتطوير البرمجيات. في قلب بيئة التطوير توجد وظيفة تحرير النصوص (Text Editing)، إلى جانب ميزات مرافقة مثل تلوين الصيغة (Syntax Highlighting) والفحص النوعي (Type Checking) وتنسيق الكود (Code Formatting) والإكمال التلقائي (Autocomplete). <em>بيئات التطوير المتكاملة</em> (Integrated Development Environments - IDEs) مثل <a href="https://code.visualstudio.com/">VS Code</a> تجمع كل هذه الوظائف في تطبيق واحد. أما مسارات العمل المبنية على الطرفية (Terminal-Based Workflows) فتجمع بين أدوات مثل <a href="https://github.com/tmux/tmux">tmux</a> (مُضاعِف الطرفية - Terminal Multiplexer)، و<a href="https://www.vim.org/">Vim</a> (محرر نصوص)، و<a href="https://www.zsh.org/">Zsh</a> (مُعالج أوامر - Shell)، وأدوات سطر أوامر خاصة بلغة برمجة بعينها، مثل <a href="https://docs.astral.sh/ruff/">Ruff</a> (مدقّق الكود (Linter) ومُنسِّق الكود الخاص بـPython) و<a href="https://mypy-lang.org/">Mypy</a> (المُدقِّق النوعي الخاص بـPython).</p>
<p>لكلٍّ من بيئات التطوير المتكاملة ومسارات العمل المبنية على الطرفية نقاط قوة وضعف. على سبيل المثال، قد يكون تعلّم بيئات التطوير المتكاملة الرسومية أسهل، كما أن بيئات التطوير الحالية عادةً ما تتمتع بتكاملات أفضل مع الذكاء الاصطناعي (AI) بشكل افتراضي مثل الإكمال التلقائي بالذكاء الاصطناعي؛ ومن ناحية أخرى، فإن مسارات العمل المبنية على الطرفية خفيفة الوزن، وقد تكون خيارك الوحيد في البيئات التي لا تتوفر فيها واجهة رسومية (GUI) أو لا يمكن فيها تثبيت برامج. ننصحك بتطوير إلمام أساسي بالمسارين معًا وإتقان واحد منهما على الأقل. وإذا لم يكن لديك بيئة تطوير متكاملة تفضّلها بالفعل، فننصحك بالبدء بـ <a href="https://code.visualstudio.com/">VS Code</a>.</p>
<p>في هذه المحاضرة، سنغطّي:</p>
<ul>
<li>تحرير النصوص وVim</li>
<li>الذكاء اللغوي وخوادم اللغات</li>
<li>التطوير المدعوم بالذكاء الاصطناعي</li>
<li>الإضافات ووظائف بيئات التطوير الأخرى</li>
</ul>
<h1>تحرير النصوص وVim (Text Editing and Vim)</h1>
<p>عند البرمجة، تقضي معظم وقتك في التنقل عبر الكود، وقراءة مقاطع منه، وإجراء تعديلات عليه، بدلًا من كتابة تدفقات طويلة أو قراءة الملفات من البداية إلى النهاية. <a href="https://www.vim.org/">Vim</a> هو محرر نصوص مُحسَّن لهذا التوزيع من المهام.</p>
<p><strong>فلسفة Vim.</strong> يقوم Vim على فكرة جميلة: واجهته هي بحد ذاتها لغة برمجة مصمَّمة للتنقل في النص وتحريره. ضغطات المفاتيح (بأسماء استذكارية - Mnemonic Names) هي أوامر، وهذه الأوامر قابلة للتركيب. يتجنّب Vim استخدام الفأرة لأنها بطيئة جدًا؛ بل يتجنّب حتى استخدام مفاتيح الأسهم لأنها تتطلب الكثير من حركة اليد. النتيجة: محرر يبدو كواجهة مباشرة بين الدماغ والحاسوب، ويطابق السرعة التي تفكّر بها.</p>
<p><strong>دعم Vim في البرامج الأخرى.</strong> لا يتعيَّن عليك استخدام <a href="https://www.vim.org/">Vim</a> نفسه للاستفادة من الأفكار الأساسية فيه. فالعديد من البرامج التي تتضمن أي نوع من تحرير النصوص تدعم &quot;نمط Vim&quot; (Vim Mode)، إما كوظيفة مدمجة أو كإضافة (Plugin). على سبيل المثال، لدى VS Code إضافة <a href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim">VSCodeVim</a>، ولدى Zsh <a href="https://zsh.sourceforge.io/Guide/zshguide04.html">دعم مدمج</a> لمحاكاة Vim، بل وحتى Claude Code يملك <a href="https://code.claude.com/docs/en/interactive-mode#vim-editor-mode">دعمًا مدمجًا</a> لنمط محرر Vim. والأرجح أن أي أداة تستخدمها تتضمن تحرير النصوص ستدعم نمط Vim بشكل أو بآخر.</p>
<h2 id="التحرير-النمطي-modal-editing">التحرير النمطي (Modal Editing)</h2>
<p>Vim هو محرر <em>نمطي</em> (Modal Editor): له أوضاع تشغيل (Modes) مختلفة لفئات مختلفة من المهام.</p>
<ul>
<li><strong>العادي (Normal)</strong>: للتنقل في الملف وإجراء التعديلات</li>
<li><strong>الإدراج (Insert)</strong>: لإدراج النص</li>
<li><strong>الاستبدال (Replace)</strong>: لاستبدال النص</li>
<li><strong>البصري (Visual)</strong> (عادي، أو سطري، أو كتلي): لتحديد كتل من النص</li>
<li><strong>سطر الأوامر (Command-line)</strong>: لتنفيذ أمر</li>
</ul>
<p>تختلف معاني ضغطات المفاتيح باختلاف وضع التشغيل. على سبيل المثال، الحرف <code>x</code> في وضع الإدراج سيدرج ببساطة الحرف &quot;x&quot; كحرف نصي، لكنه في الوضع العادي سيحذف الحرف الموجود تحت المؤشر، وفي الوضع البصري سيحذف التحديد.</p>
<p>في تكوينه الافتراضي، يعرض Vim الوضع الحالي في الأسفل على اليسار. الوضع الأولي/الافتراضي هو الوضع العادي. عمومًا ستقضي معظم وقتك بين الوضعين العادي والإدراج.</p>
<p>يمكنك تغيير الأوضاع بالضغط على <code>&lt;ESC&gt;</code> (مفتاح الهروب) للعودة من أي وضع إلى الوضع العادي. ومن الوضع العادي، تدخل وضع الإدراج بـ<code>i</code>، ووضع الاستبدال بـ<code>R</code>، والوضع البصري بـ<code>v</code>، والوضع البصري السطري بـ<code>V</code>، والوضع البصري الكتلي بـ<code>&lt;C-v&gt;</code> (Ctrl-V، ويُكتب أحيانًا <code>^V</code>)، ووضع سطر الأوامر بـ<code>:</code></p>
<p>ستستخدم مفتاح <code>&lt;ESC&gt;</code> كثيرًا عند استخدام Vim: فكِّر في إعادة تعيين مفتاح Caps Lock ليصبح مفتاح Escape (<a href="https://vim.fandom.com/wiki/Map_caps_lock_to_escape_in_macOS">تعليمات لنظام macOS</a>) أو أنشئ <a href="https://vim.fandom.com/wiki/Avoid_the_escape_key#Mappings">تعيينًا بديلًا</a> لـ<code>&lt;ESC&gt;</code> بتسلسل مفاتيح بسيط.</p>
<h2 id="الأساسيات-إدراج-النص">الأساسيات: إدراج النص</h2>
<p>من الوضع العادي، اضغط <code>i</code> للدخول إلى وضع الإدراج. الآن، يتصرف Vim كأي محرر نصوص آخر، حتى تضغط <code>&lt;ESC&gt;</code> للعودة إلى الوضع العادي. هذا، إلى جانب الأساسيات الموضحة أعلاه، هو كل ما تحتاجه للبدء في تحرير الملفات باستخدام Vim (وإن لم يكن بكفاءة خاصة إذا كنت تقضي كل وقتك في التحرير من وضع الإدراج).</p>
<h2 id="واجهة-vim-هي-لغة-برمجة">واجهة Vim هي لغة برمجة</h2>
<p>واجهة Vim هي لغة برمجة. ضغطات المفاتيح (بأسماء استذكارية) هي أوامر، وهذه الأوامر <em>تتركَّب</em>. يتيح ذلك حركة وتعديلات فعّالة، خاصةً بمجرد أن تصبح الأوامر ذاكرة عضلية، تمامًا كما تصبح الكتابة فعّالة جدًا بمجرد تعلُّمك تخطيط لوحة المفاتيح.</p>
<h3 id="الحركة">الحركة</h3>
<p>ينبغي أن تقضي معظم وقتك في الوضع العادي، مستخدمًا أوامر الحركة للتنقل في الملف. تسمى الحركات في Vim أيضًا &quot;الأسماء&quot; (Nouns)، لأنها تشير إلى قطع من النص.</p>
<ul>
<li>الحركة الأساسية: <code>hjkl</code> (يسار، أسفل، أعلى، يمين)</li>
<li>الكلمات: <code>w</code> (الكلمة التالية)، <code>b</code> (بداية الكلمة)، <code>e</code> (نهاية الكلمة)</li>
<li>الأسطر: <code>0</code> (بداية السطر)، <code>^</code> (أول حرف غير فارغ)، <code>$</code> (نهاية السطر)</li>
<li>الشاشة: <code>H</code> (أعلى الشاشة)، <code>M</code> (وسط الشاشة)، <code>L</code> (أسفل الشاشة)</li>
<li>التمرير: <code>Ctrl-u</code> (أعلى)، <code>Ctrl-d</code> (أسفل)</li>
<li>الملف: <code>gg</code> (بداية الملف)، <code>G</code> (نهاية الملف)</li>
<li>أرقام الأسطر: <code>:{number}&lt;CR&gt;</code> أو <code>{number}G</code> (السطر رقم {number})
<ul>
<li>يشير <code>&lt;CR&gt;</code> إلى مفتاح الإرجاع/Enter</li>
</ul>
</li>
<li>متنوعة: <code>%</code> (العنصر المطابق، مثل قوس أو قوس معقوف)</li>
<li>البحث عن حرف: <code>f{character}</code>، <code>t{character}</code>، <code>F{character}</code>، <code>T{character}</code>
<ul>
<li>البحث/الانتقال إلى الأمام/الخلف نحو {character} في السطر الحالي</li>
<li><code>,</code> / <code>;</code> للتنقل بين التطابقات</li>
</ul>
</li>
<li>البحث عن نمط: <code>/{regex}</code>، ثم <code>n</code> / <code>N</code> للتنقل بين التطابقات</li>
</ul>
<h3 id="التحديد">التحديد</h3>
<p>أوضاع التحديد البصري:</p>
<ul>
<li>البصري: <code>v</code></li>
<li>البصري السطري: <code>V</code></li>
<li>البصري الكتلي: <code>Ctrl-v</code></li>
</ul>
<p>يمكنك استخدام مفاتيح الحركة لتكوين التحديد.</p>
<h3 id="التعديلات">التعديلات</h3>
<p>كل ما كنت تفعله بالفأرة، تفعله الآن بلوحة المفاتيح باستخدام أوامر التعديل التي تتركَّب مع أوامر الحركة. هنا تبدأ واجهة Vim في الظهور كلغة برمجة. تُسمى أوامر التعديل في Vim أيضًا &quot;الأفعال&quot; (Verbs)، لأن الأفعال تؤثر على الأسماء.</p>
<ul>
<li><code>i</code> الدخول إلى وضع الإدراج
<ul>
<li>لكن للتلاعب بالنص أو حذفه، ستحتاج إلى أكثر من مفتاح Backspace</li>
</ul>
</li>
<li><code>o</code> / <code>O</code> إدراج سطر أدناه / أعلاه</li>
<li><code>d{motion}</code> حذف {motion}
<ul>
<li>مثال: <code>dw</code> تحذف كلمة، <code>d$</code> تحذف حتى نهاية السطر، <code>d0</code> تحذف حتى بداية السطر</li>
</ul>
</li>
<li><code>c{motion}</code> تغيير {motion}
<ul>
<li>مثال: <code>cw</code> تغيّر كلمة</li>
<li>تعمل مثل <code>d{motion}</code> متبوعة بـ<code>i</code></li>
</ul>
</li>
<li><code>x</code> حذف حرف (تعادل <code>dl</code>)</li>
<li><code>s</code> استبدال حرف (تعادل <code>cl</code>)</li>
<li>الوضع البصري + التلاعب
<ul>
<li>حدّد النص، ثم <code>d</code> لحذفه أو <code>c</code> لتغييره</li>
</ul>
</li>
<li><code>u</code> للتراجع (Undo)، و<code>&lt;C-r&gt;</code> لإعادة التنفيذ (Redo)</li>
<li><code>y</code> للنسخ / &quot;الانتقاء&quot; (Yank) (بعض الأوامر الأخرى مثل <code>d</code> تنسخ أيضًا)</li>
<li><code>p</code> للصق</li>
<li>المزيد لتتعلمه: على سبيل المثال، <code>~</code> يعكس حالة حرف (أحرف كبيرة/صغيرة)، و<code>J</code> يدمج الأسطر معًا</li>
</ul>
<h3 id="العدادات-counts">العدّادات (Counts)</h3>
<p>يمكنك دمج الأسماء والأفعال مع عدد (Count)، والذي سينفّذ إجراءً معيّنًا عددًا من المرات.</p>
<ul>
<li><code>3w</code> انتقل 3 كلمات إلى الأمام</li>
<li><code>5j</code> انتقل 5 أسطر إلى الأسفل</li>
<li><code>7dw</code> احذف 7 كلمات</li>
</ul>
<h3 id="المعدلات-modifiers">المعدِّلات (Modifiers)</h3>
<p>يمكنك استخدام معدِّلات لتغيير معنى الاسم. بعض المعدِّلات هي <code>i</code>، والتي تعني &quot;الداخل&quot; أو &quot;الوسط&quot;، و<code>a</code>، والتي تعني &quot;حول&quot;.</p>
<ul>
<li><code>ci(</code> غيّر المحتويات داخل زوج الأقواس الحالي</li>
<li><code>ci[</code> غيّر المحتويات داخل زوج الأقواس المعقوفة الحالي</li>
<li><code>da'</code> احذف النص المفرد المقتبس، بما في ذلك علامات الاقتباس المفردة المحيطة به</li>
</ul>
<h2 id="تجميع-كل-ذلك-معا">تجميع كل ذلك معًا</h2>
<p>هذا تنفيذ <a href="https://en.wikipedia.org/wiki/Fizz_buzz">fizz buzz</a> معطوب:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fizz_buzz</span>(<span class="hljs-params">limit</span>):
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(limit):
        <span class="hljs-keyword">if</span> i % <span class="hljs-number">3</span> == <span class="hljs-number">0</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;fizz&quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
        <span class="hljs-keyword">if</span> i % <span class="hljs-number">5</span> == <span class="hljs-number">0</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;fizz&quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
        <span class="hljs-keyword">if</span> i % <span class="hljs-number">3</span> <span class="hljs-keyword">and</span> i % <span class="hljs-number">5</span>:
            <span class="hljs-built_in">print</span>(i, end=<span class="hljs-string">&quot;&quot;</span>)
        <span class="hljs-built_in">print</span>()

<span class="hljs-keyword">def</span> <span class="hljs-title function_">main</span>():
    fizz_buzz(<span class="hljs-number">20</span>)
</code></pre>
<p>نستخدم تسلسل الأوامر التالي لإصلاح المشكلات، بدءًا من الوضع العادي:</p>
<ul>
<li>الدالة <code>main</code> لا تُستدعى أبدًا
<ul>
<li><code>G</code> للقفز إلى نهاية الملف</li>
<li><code>o</code> لـ<strong>ف</strong>تح (o) سطر جديد أسفل</li>
<li>اكتب <code>if __name__ == &quot;__main__&quot;: main()</code>
<ul>
<li>إذا كان محررك يدعم لغة Python، فقد يقوم ببعض الإزاحة التلقائية (Auto-indentation) أثناء وجودك في وضع الإدراج</li>
</ul>
</li>
<li><code>&lt;ESC&gt;</code> للعودة إلى الوضع العادي</li>
</ul>
</li>
<li>يبدأ العد من 0 بدلًا من 1
<ul>
<li><code>/</code> متبوعًا بـ<code>range</code> ثم <code>&lt;CR&gt;</code> للبحث عن &quot;range&quot;</li>
<li><code>ww</code> للتحرك كلمتين إلى الأمام (يمكنك أيضًا استخدام <code>2w</code>، لكن عمليًا، للأعداد الصغيرة من الشائع تكرار المفتاح بدلًا من استخدام خاصية العد)</li>
<li><code>i</code> للتبديل إلى وضع الإدراج، وأضف <code>1,</code></li>
<li><code>&lt;ESC&gt;</code> للعودة إلى الوضع العادي</li>
<li><code>e</code> للقفز إلى <strong>ن</strong>هاية (e) الكلمة التالية</li>
<li><code>a</code> للبدء في <strong>إ</strong>لحاق (a) نص، وأضف <code>+ 1</code></li>
<li><code>&lt;ESC&gt;</code> للعودة إلى الوضع العادي</li>
</ul>
</li>
<li>يطبع &quot;fizz&quot; لمضاعفات الرقم 5
<ul>
<li><code>:6&lt;CR&gt;</code> للانتقال إلى السطر 6</li>
<li><code>ci&quot;</code> لت<strong>غ</strong>يير (c) ما <strong>د</strong>اخل (i) علامتي الاقتباس <code>&quot;</code>، غيّره إلى <code>&quot;buzz&quot;</code></li>
<li><code>&lt;ESC&gt;</code> للعودة إلى الوضع العادي</li>
</ul>
</li>
</ul>
<h2 id="تعلم-vim">تعلُّم Vim</h2>
<p>أفضل طريقة لتعلُّم Vim هي تعلُّم الأساسيات (ما غطّيناه حتى الآن) ثم تفعيل نمط Vim في جميع برامجك والبدء في استخدامه عمليًا. تجنّب إغراء استخدام الفأرة أو مفاتيح الأسهم؛ في بعض المحررات، يمكنك إلغاء ربط مفاتيح الأسهم لإجبار نفسك على بناء عادات جيدة.</p>
<h3 id="موارد-إضافية">موارد إضافية</h3>
<ul>
<li><a href="/book/missing-semester/development-environment/index">محاضرة Vim</a> من النسخة السابقة لهذا المقرر — لقد غطّينا Vim هناك بمزيد من العمق</li>
<li><code>vimtutor</code> هو درس تعليمي يأتي مثبّتًا مع Vim — إذا كان Vim مثبّتًا، فينبغي أن تكون قادرًا على تشغيل <code>vimtutor</code> من مُعالج الأوامر الخاص بك</li>
<li><a href="https://vim-adventures.com/">Vim Adventures</a> لعبة لتعلُّم Vim</li>
<li><a href="https://vim.fandom.com/wiki/Vim_Tips_Wiki">Vim Tips Wiki</a></li>
<li><a href="https://vimways.org/2019/">Vim Advent Calendar</a> يحتوي نصائح متنوعة عن Vim</li>
<li><a href="https://www.vimgolf.com/">VimGolf</a> هي <a href="https://en.wikipedia.org/wiki/Code_golf">غولف الكود (Code Golf)</a>، لكن حيث تكون لغة البرمجة هي واجهة Vim</li>
<li><a href="https://vi.stackexchange.com/">Vi/Vim Stack Exchange</a></li>
<li><a href="http://vimcasts.org/">Vim Screencasts</a></li>
<li><a href="https://pragprog.com/titles/dnvim2/">Practical Vim</a> (كتاب)</li>
</ul>
<h1>الذكاء اللغوي وخوادم اللغات (Code Intelligence and Language Servers)</h1>
<p>توفر بيئات التطوير المتكاملة عمومًا دعمًا خاصًا باللغة يتطلب فهمًا دلاليًا (Semantic Understanding) للكود، وذلك من خلال إضافات تتصل بـ_خوادم اللغات_ (Language Servers) التي تنفّذ <a href="https://microsoft.github.io/language-server-protocol/">بروتوكول خادم اللغة</a> (Language Server Protocol - LSP). على سبيل المثال، تعتمد <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.python">إضافة Python في VS Code</a> على <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance">Pylance</a>، وتعتمد <a href="https://marketplace.visualstudio.com/items?itemName=golang.go">إضافة Go في VS Code</a> على <a href="https://go.dev/gopls/">gopls</a> الرسمية من الجهة الأولى. من خلال تثبيت الإضافة وخادم اللغة للغات التي تعمل بها، يمكنك تفعيل العديد من الميزات الخاصة باللغة في بيئة التطوير المتكاملة الخاصة بك، مثل:</p>
<ul>
<li><strong>إكمال الكود (Code Completion).</strong> إكمال واقتراح تلقائي أفضل، مثل القدرة على رؤية حقول وطرق الكائن بعد كتابة <code>object.</code>.</li>
<li><strong>التوثيق المضمّن (Inline Documentation).</strong> رؤية التوثيق عند التمرير (Hover) وعند الاقتراح التلقائي.</li>
<li><strong>القفز إلى التعريف (Jump-to-Definition).</strong> القفز من موضع الاستخدام إلى التعريف، مثل الانتقال من مرجع حقل <code>object.field</code> إلى تعريف الحقل.</li>
<li><strong>العثور على المراجع (Find References).</strong> عكس ما سبق؛ البحث عن جميع المواضع التي يُشار فيها إلى عنصر معيّن مثل حقل أو نوع.</li>
<li><strong>المساعدة في الاستيراد.</strong> تنظيم عمليات الاستيراد، وإزالة عمليات الاستيراد غير المستخدمة، والتنبيه إلى عمليات الاستيراد المفقودة.</li>
<li><strong>جودة الكود (Code Quality).</strong> يمكن استخدام هذه الأدوات بشكل مستقل، لكن هذه الوظيفة غالبًا ما توفّرها خوادم اللغات أيضًا. تنسيق الكود يعمل على إزاحة وتنسيق الكود تلقائيًا، والمدقّقون النوعيون ومدقّقو الكود (Linters) يكتشفون الأخطاء في كودك أثناء الكتابة. سنغطّي هذه الفئة من الوظائف بمزيد من العمق في <a href="/book/missing-semester/code-quality/index">محاضرة جودة الكود</a>.</li>
</ul>
<h2 id="إعداد-خوادم-اللغات">إعداد خوادم اللغات</h2>
<p>بالنسبة لبعض اللغات، كل ما تحتاج إليه هو تثبيت الإضافة وخادم اللغة، وستكون جاهزًا. أما بالنسبة للغات أخرى، فلكي تحصل على أقصى فائدة من خادم اللغة، ستحتاج إلى إخبار بيئة التطوير المتكاملة ببيئتك. على سبيل المثال، توجيه VS Code إلى <a href="https://code.visualstudio.com/docs/python/environments">بيئة Python الخاصة بك</a> سيمكن خادم اللغة من رؤية الحزم المثبّتة لديك. تُغطّى البيئات (Environments) بمزيد من العمق في <a href="/book/missing-semester/shipping-code/index">محاضرةنا عن تغليف وشحن الكود</a>.</p>
<p>اعتمادًا على اللغة، قد توجد بعض الإعدادات التي يمكنك تهيئتها لخادم اللغة. على سبيل المثال، باستخدام دعم Python في VS Code، يمكنك تعطيل الفحص النوعي الثابت (Static Type Checking) للمشاريع التي لا تستخدم التعليقات النوعية الاختيارية في Python.</p>
<h1>التطوير المدعوم بالذكاء الاصطناعي (AI-Powered Development)</h1>
<p>منذ إطلاق <a href="https://github.com/features/copilot/ai-code-editor">GitHub Copilot</a> باستخدام <a href="https://openai.com/index/openai-codex/">نموذج Codex</a> من OpenAI في منتصف عام 2021، أصبحت <a href="https://en.wikipedia.org/wiki/Large_language_model">نماذج اللغات الكبيرة</a> (Large Language Models - LLMs) مستخدمة على نطاق واسع في هندسة البرمجيات. هناك ثلاثة أشكال رئيسية قيد الاستخدام الآن: الإكمال التلقائي، والدردشة المضمّنة، ووكلاء البرمجة (Coding Agents).</p>
<h2 id="الإكمال-التلقائي-autocomplete">الإكمال التلقائي (Autocomplete)</h2>
<p>الإكمال التلقائي المدعوم بالذكاء الاصطناعي له نفس شكل الإكمال التلقائي التقليدي في بيئة التطوير المتكاملة الخاصة بك، إذ يقترح إكمالات في موضع المؤشر أثناء الكتابة. أحيانًا يُستخدم كخاصية سلبية &quot;تعمل ببساطة&quot;. وما بعد ذلك، فإن الإكمال التلقائي بالذكاء الاصطناعي يُوجَّه عمومًا <a href="https://en.wikipedia.org/wiki/Prompt_engineering">باستخدام التلميحات (Prompts)</a> من خلال تعليقات الكود.</p>
<p>على سبيل المثال، لنكتب سكربتًا لتنزيل محتويات هذه الملاحظات الدراسية واستخراج جميع الروابط منها. يمكننا أن نبدأ بـ:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> requests

<span class="hljs-keyword">def</span> <span class="hljs-title function_">download_contents</span>(<span class="hljs-params">url: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
</code></pre>
<p>سيقوم النموذج بإكمال جسم الدالة تلقائيًا:</p>
<pre><code class="language-python">    response = requests.get(url)
    <span class="hljs-keyword">return</span> response.text
</code></pre>
<p>يمكننا توجيه عمليات الإكمال بشكل أكبر باستخدام التعليقات. على سبيل المثال، إذا بدأنا بكتابة دالة لاستخراج جميع روابط Markdown، لكنها لا تملك اسمًا وصفيًا بشكل خاص:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract</span>(<span class="hljs-params">contents: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>]:
</code></pre>
<p>سيقوم النموذج بإكمال شيء كهذا تلقائيًا:</p>
<pre><code class="language-python">    lines = contents.splitlines()
    <span class="hljs-keyword">return</span> [line <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> lines <span class="hljs-keyword">if</span> line.strip()]
</code></pre>
<p>يمكننا توجيه الإكمال من خلال تعليقات الكود:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract</span>(<span class="hljs-params">content: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>]:
    <span class="hljs-comment"># extract all Markdown links from the content</span>
</code></pre>
<p>هذه المرة، يعطي النموذج إكمالًا أفضل:</p>
<pre><code class="language-python">    <span class="hljs-keyword">import</span> re
    pattern = <span class="hljs-string">r&#x27;\\[.*?\\]\\((.*?)\\)&#x27;</span>
    <span class="hljs-keyword">return</span> re.findall(pattern, content)
</code></pre>
<p>هنا، نرى جانبًا سلبيًا واحدًا لهذه الأداة البرمجية المدعومة بالذكاء الاصطناعي: يمكنها تقديم إكمالات فقط في موضع المؤشر. في هذه الحالة، ستكون الممارسة الأفضل هي وضع <code>import re</code> على مستوى الوحدة (Module Level)، بدلًا من داخل الدالة.</p>
<p>استخدم المثال أعلاه دالة ضعيفة التسمية لتوضيح كيف يمكن توجيه إكمال الكود باستخدام التعليقات؛ عمليًا، سترغب في كتابة كود بدوال ذات أسماء وصفية أكثر، مثل <code>extract_links</code>، وسترغب في كتابة نصوص توثيق (Docstrings) (وبناءً على ذلك، ينبغي أن يولّد النموذج إكمالًا مشابهًا لما سبق).</p>
<p>لأغراض العرض التوضيحي، يمكننا إكمال السكربت:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(extract(download_contents(<span class="hljs-string">&quot;https://raw.githubusercontent.com/missing-semester/missing-semester/refs/heads/master/_2026/development-environment.md&quot;</span>)))
</code></pre>
<h2 id="الدردشة-المضمنة-inline-chat">الدردشة المضمّنة (Inline Chat)</h2>
<p>تتيح لك الدردشة المضمّنة تحديد سطر أو كتلة ثم مطالبة نموذج الذكاء الاصطناعي مباشرةً باقتراح تعديل. في وضع التفاعل هذا، يمكن للنموذج إجراء تغييرات على الكود الموجود (وهذا يختلف عن الإكمال التلقائي، الذي يكمل الكود فقط بعد المؤشر).</p>
<p>متابعةً للمثال السابق، لنفترض أننا قررنا عدم استخدام مكتبة <code>requests</code> الخارجية. يمكننا تحديد الأسطر الثلاثة ذات الصلة من الكود، واستدعاء الدردشة المضمّنة، وكتابة شيء مثل:</p>
<pre><code>use built-in libraries instead
</code></pre>
<p>يقترح النموذج:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> urllib.request <span class="hljs-keyword">import</span> urlopen

<span class="hljs-keyword">def</span> <span class="hljs-title function_">download_contents</span>(<span class="hljs-params">url: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    <span class="hljs-keyword">with</span> urlopen(url) <span class="hljs-keyword">as</span> response:
        <span class="hljs-keyword">return</span> response.read().decode(<span class="hljs-string">&#x27;utf-8&#x27;</span>)
</code></pre>
<h2 id="وكلاء-البرمجة-coding-agents">وكلاء البرمجة (Coding Agents)</h2>
<p>تُغطّى وكلاء البرمجة (Coding Agents) بالتفصيل في محاضرة <a href="/book/missing-semester/agentic-coding/index">البرمجة الوكيلة</a> (Agentic Coding).</p>
<h2 id="البرامج-الموصى-بها">البرامج الموصى بها</h2>
<p>بعض بيئات التطوير المتكاملة المدعومة بالذكاء الاصطناعي الشائعة هي <a href="https://code.visualstudio.com/">VS Code</a> مع إضافة <a href="https://github.com/features/copilot/ai-code-editor">GitHub Copilot</a> و<a href="https://cursor.com/">Cursor</a>. يتوفر GitHub Copilot حاليًا <a href="https://github.com/education/students">مجانًا للطلاب</a>، وللمعلمين، ولصانعي المشاريع مفتوحة المصدر الشهيرة. هذا مجال يتطور بسرعة. معظم المنتجات الرائدة لديها وظائف متكافئة تقريبًا.</p>
<h1>الإضافات ووظائف بيئات التطوير الأخرى (Extensions and Other IDE Functionality)</h1>
<p>بيئات التطوير المتكاملة أدوات قوية، تصبح أكثر قوة بفضل <em>الإضافات</em> (Extensions). لا يمكننا تغطية كل هذه الميزات في محاضرة واحدة، لكننا هنا نقدم بعض الإشارات إلى إضافات شائعة. نشجعك على استكشاف هذا المجال بنفسك؛ فهناك العديد من قوائم إضافات بيئات التطوير الشائعة المتاحة على الإنترنت، مثل <a href="https://vimawesome.com/">Vim Awesome</a> لإضافات Vim و<a href="https://marketplace.visualstudio.com/search?target=VSCode&amp;category=All%20categories&amp;sortBy=Installs">إضافات VS Code مرتبة حسب الشعبية</a>.</p>
<ul>
<li><a href="https://containers.dev/">حاويات التطوير (Development Containers)</a>: تدعمها بيئات التطوير المتكاملة الشهيرة (مثلًا <a href="https://code.visualstudio.com/docs/devcontainers/containers">تدعمها VS Code</a>)، وتتيح لك حاويات التطوير استخدام حاوية (Container) لتشغيل أدوات التطوير. يمكن أن يكون ذلك مفيدًا لقابلية النقل (Portability) أو العزل (Isolation). تغطّي <a href="/book/missing-semester/shipping-code/index">محاضرة تغليف وشحن الكود</a> الحاويات بمزيد من العمق.</li>
<li>التطوير عن بُعد (Remote Development): التطوير على جهاز بعيد باستخدام SSH (مثلًا باستخدام <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh">إضافة Remote SSH في VS Code</a>). يمكن أن يكون ذلك مفيدًا، على سبيل المثال، إذا أردت تطوير وتشغيل الكود على جهاز مزوّد بوحدة معالجة رسومية (GPU) قوية في السحابة.</li>
<li>التحرير التعاوني (Collaborative Editing): تحرير نفس الملف بأسلوب Google Docs (مثلًا باستخدام <a href="https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare">إضافة Live Share في VS Code</a>).</li>
</ul>
<h1>تمارين</h1>
<ol>
<li>فعِّل نمط Vim في جميع البرامج التي تستخدمها التي تدعمه، مثل محررك ومُعالج الأوامر الخاص بك، واستخدم نمط Vim لكل تحرير النصوص خلال الشهر القادم. كلما بدا لك شيء غير فعّال، أو عندما تفكّر &quot;لا بد أن هناك طريقة أفضل&quot;، حاول البحث عنه في Google؛ فمن المرجح أن توجد طريقة أفضل.</li>
<li>أكمل تحديًا من <a href="https://www.vimgolf.com/">VimGolf</a>.</li>
<li>هيِّئ إضافة بيئة تطوير متكاملة وخادم لغة لمشروع تعمل عليه. تأكد من أن جميع الوظائف المتوقعة، مثل القفز إلى التعريف لتبعيات المكتبات، تعمل كما ينبغي. إذا لم يكن لديك كود يمكنك استخدامه لهذا التمرين، فيمكنك استخدام مشروع مفتوح المصدر من GitHub (مثل <a href="https://github.com/spf13/cobra">هذا المشروع</a>).</li>
<li>تصفّح قائمة بإضافات بيئات التطوير المتكاملة وقم بتثبيت إضافة تبدو مفيدة لك.</li>
</ol>
`,a={book:e,chapter:n,chapterTitle:o,slug:s,title:i,headings:t,html:l};export{e as book,n as chapter,o as chapterTitle,a as default,t as headings,l as html,s as slug,i as title};
