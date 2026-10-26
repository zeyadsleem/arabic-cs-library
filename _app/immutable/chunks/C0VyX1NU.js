const s="kinney",n="enterprise-ui",t="واجهات المؤسسات",e="husky-and-lint-staged",a="Husky و lint-staged: خُطّافات Git والملفات المُجهَّزة",p=[{depth:2,id:"خطافات-git",text:"خُطّافات Git"},{depth:2,id:"ما-الذي-يفعله-husky-فعلا",text:"ما الذي يفعله Husky فعلًا"},{depth:2,id:"التهيئة-الحديثة",text:"التهيئة الحديثة"},{depth:2,id:"كتابة-ملفات-الخطافات",text:"كتابة ملفات الخُطّافات"},{depth:2,id:"أي-خطاف-تستخدم-ومتى",text:"أي خُطّاف تستخدم ومتى"},{depth:2,id:"تجاوز-الخطافات-وci-وتثبيتات-الإنتاج",text:"تجاوز الخُطّافات وCI وتثبيتات الإنتاج"},{depth:2,id:"الواجهات-الرسومية-ومديرو-إصدارات-node-وpath",text:"الواجهات الرسومية ومديرو إصدارات Node وPATH"},{depth:2,id:"الحزم-المتداخلة-وتهيئات-ما-يقارب-المستودع-الأحادي",text:"الحزم المتداخلة وتهيئات ما يقارب المستودع الأحادي"},{depth:2,id:"ما-الذي-يفعله-lint-staged-فعلا",text:"ما الذي يفعله lint-staged فعلًا"},{depth:2,id:"نموذج-الإعداد",text:"نموذج الإعداد"},{depth:2,id:"مطابقة-الملفات-والمسارات",text:"مطابقة الملفات والمسارات"},{depth:2,id:"تجاهل-الملفات",text:"تجاهل الملفات"},{depth:2,id:"التجهيز-التلقائي-والتخزين-المؤقت-والملفات-المجهزة-جزئيا",text:"التجهيز التلقائي والتخزين المؤقت والملفات المُجهَّزة جزئيًا"},{depth:2,id:"التزامن-وحالات-التسابق",text:"التزامن وحالات التسابق"},{depth:2,id:"إعداد-الدوال-كمخرج-طارئ",text:"إعداد الدوال كمخرج طارئ"},{depth:2,id:"المستودعات-الأحادية",text:"المستودعات الأحادية"},{depth:2,id:"تشغيل-lint-staged-في-ci",text:"تشغيل lint-staged في CI"},{depth:2,id:"حل-المشكلات",text:"حل المشكلات"},{depth:2,id:"ما-لا-ينبغي-فعله",text:"ما لا ينبغي فعله"},{depth:2,id:"التهيئة-التي-أوصي-بها-فعلا",text:"التهيئة التي أوصي بها فعلًا"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"خطافات-git-كحواجز-أمان",text:"خُطّافات Git كحواجز أمان"}],o=`<p>يحل Husky و lint-staged مشكلتين متقاربتين لكن مختلفتين. فلدى Git أصلًا خُطّافات أصلية — <code>pre-commit</code> و<code>commit-msg</code> و<code>pre-push</code> — وهذه الخُطّافات مجرد برامج قابلة للتنفيذ في مجلد خُطّافات Git، أو في أي مجلد يشير إليه <a href="https://git-scm.com/docs/githooks"><code>core.hooksPath</code></a>. وHusky هو الطبقة الرقيقة التي تدير تلك الخُطّافات الأصلية لمشروع JavaScript. أما lint-staged فهو ما تشغّله عادةً <em>داخل</em> <code>pre-commit</code> لتنفيذ الأوامر على الملفات المُجهَّزة فقط بدل المستودع بأكمله.</p>
<p>هذا التمييز مهم. فـHusky هو توصيل الخُطّافات. وlint-staged هو تنسيق مهام الملفات المُجهَّزة. وإذا خلطت بينهما، انتهيت تصلح الطبقة الخطأ، وهي هواية إنسانية جدًا.</p>
<h2 id="خطافات-git">خُطّافات Git</h2>
<p>خُطّافات Git مجرد سكربتات. وهي تعيش افتراضيًا تحت <code>$GIT_DIR/hooks</code>، لكن Git يمكنه استخدام مجلد آخر عبر <code>core.hooksPath</code>. وتُتجاهل الخُطّافات التي لا تحمل بت التنفيذ. وفي مستودع عادي غير مجرّد، يشغّل Git الخُطّافات من جذر شجرة العمل، لا من أي مجلد فرعي تعيش فيه حزمتك.</p>
<p>الخُطّافات الثلاثة على جانب العميل التي تهم معظم الفرق فعلًا هي <code>pre-commit</code> و<code>commit-msg</code> و<code>pre-push</code>. يعمل <code>pre-commit</code> قبل أن ينشئ Git الإيداع ويمكن تجاوزه بـ<code>git commit --no-verify</code>. ويعمل <code>commit-msg</code> على ملف رسالة الإيداع المقترحة ويمكن تجاوزه أيضًا بـ<code>--no-verify</code>. ويعمل <code>pre-push</code> أثناء <code>git push</code> ويمكن أن يمنع الدفع. أما <code>prepare-commit-msg</code> فحالة خاصة: فهو يعدّل الرسالة قبل أن يفتح المحرر، و<em>لا</em> يُوقفه <code>--no-verify</code>.</p>
<p>وهذا يخبرك بفلسفة السياسة أصلًا. فالخُطّافات أداة محلية للسرعة والتغذية الراجعة، لا حد فرض محكم، لأن المطوّرين يستطيعون تجاوز كثير منها. ويظل CI هو المرجع النهائي. ويبقى البشر مبدعين حين تلتقي المواعيد النهائية مع <code>--no-verify</code>.</p>
<h2 id="ما-الذي-يفعله-husky-فعلا">ما الذي يفعله Husky فعلًا</h2>
<p>Husky صغير عن قصد. فهو يستخدم <code>core.hooksPath</code>، ويدعم خُطّافات Git الثلاثة عشر كلها على جانب العميل، ويعمل عبر macOS وLinux وWindows وواجهات Git الرسومية ومجلدات الخُطّافات المخصّصة والمشاريع المتداخلة والمستودعات الأحادية. والمهم أنه يظل قريبًا من نموذج الخُطّافات الأصلي في Git بدل اختراع وقت تشغيل خاص بالخُطّافات.</p>
<p>إذن، Husky ليس مشغّل مهام ولا أداة فحص. بل يُنشئ ملفات خُطّافات حقيقية في <code>.husky/</code> ويديرها، وتلك الملفات مجرد سكربتات صدفة. و«استخدام Husky» يعني في الأغلب «السماح لـHusky بضبط <code>core.hooksPath</code> وتخزين سكربتات خُطّافاتك في نظام إدارة الإصدارات».</p>
<h2 id="التهيئة-الحديثة">التهيئة الحديثة</h2>
<p>التهيئة الموصى بها حاليًا بسيطة جدًا: ثبّت Husky كتبعية تطوير وشغّل <code>husky init</code>. ينتج عن ذلك سكربت <code>pre-commit</code> في <code>.husky/</code> وتحديث سكربت <code>prepare</code> في <code>package.json</code>. ويوافق Husky هذا صراحةً مع <a href="https://docs.npmjs.com/cli/v11/using-npm/scripts/">أفضل ممارسات npm</a> حول <code>prepare</code>.</p>
<p>ويبدو خط الأساس النظيف هكذا:</p>
<pre><code class="language-bash">npm install --save-dev husky lint-staged
npx husky init
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prepare&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;husky&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># .husky/pre-commit</span>
npx lint-staged
</code></pre>
<p>لماذا <code>prepare</code>؟ لأن npm يُعرّفه كسكربت دورة حياة يعمل عند تنفيذ <code>npm install</code> محليًا دون معاملات حزم، ويمكن في مساحات العمل أن يعمل تزامنيًا عبر الحزم. وهذا مريح لإعداد الخُطّافات تلقائيًا، لكنه يعني أيضًا أنه ينبغي غالبًا أن تُبقي سكربت <code>prepare</code> الخاص بـHusky خفيفًا وأن تعرّفه في حزمة جذر المستودع، لا أن ترشّه في كل مساحة عمل إلا إذا كنت تستمتع بسلوك مفاجئ وقت التثبيت.</p>
<h2 id="كتابة-ملفات-الخطافات">كتابة ملفات الخُطّافات</h2>
<p>ملفات خُطّافات Husky سكربتات صدفة. وتوصي <a href="https://typicode.github.io/husky/how-to.html">التوثيقات</a> بصدفة متوافقة مع POSIX لأجل التوافق، خصوصًا لأن ليست كل الآلات لديها Bash بالشكل الذي تتوقعه، ولأن مستخدمي Windows موجودون ليذكّروا الجميع بأن الافتراضات مرض. وإذا احتجت إلى Node أو Python أو وقت تشغيل آخر، فالنمط الموصى به هو إبقاء الخُطّاف نقطة دخول صغيرة في الصدفة واستدعاء سكربتك الحقيقي منها.</p>
<pre><code class="language-bash"><span class="hljs-comment"># .husky/pre-commit</span>
node .husky/pre-commit.mjs
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// .husky/pre-commit.mjs</span>
<span class="hljs-keyword">import</span> { execSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:child_process&#x27;</span>;

<span class="hljs-title function_">execSync</span>(<span class="hljs-string">&#x27;npx lint-staged&#x27;</span>, { <span class="hljs-attr">stdio</span>: <span class="hljs-string">&#x27;inherit&#x27;</span> });
</code></pre>
<p>يُبقي هذا النهج الخُطّاف قابلًا للنقل ويُخرج المنطق المعقّد من الصدفة. فالصدفة رائعة إلى أن تتوقف عن ذلك، وهو ما يحدث عادةً بعد خمس دقائق من إضافة الشروط.</p>
<h2 id="أي-خطاف-تستخدم-ومتى">أي خُطّاف تستخدم ومتى</h2>
<table>
<thead>
<tr>
<th>الخُطّاف</th>
<th>متى يعمل</th>
<th>التجاوز بـ<code>--no-verify</code></th>
<th>الأفضل لـ</th>
<th>متطلب السرعة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>pre-commit</code></td>
<td>قبل إنشاء الإيداع</td>
<td>نعم</td>
<td>التنسيق وفحص الملفات المُجهَّزة</td>
<td>سريع (ثوانٍ)</td>
</tr>
<tr>
<td><code>commit-msg</code></td>
<td>بعد كتابة الرسالة</td>
<td>نعم</td>
<td>التحقق من الرسالة، والإيداعات الاصطلاحية</td>
<td>سريع</td>
</tr>
<tr>
<td><code>pre-push</code></td>
<td>أثناء <code>git push</code></td>
<td>نعم</td>
<td>تشغيل الاختبارات كاملة، وفحوصات أوسع</td>
<td>متوسط (الدقائق مقبولة)</td>
</tr>
<tr>
<td><code>prepare-commit-msg</code></td>
<td>قبل فتح المحرر</td>
<td>لا</td>
<td>إدراج قالب، وإضافة بادئة التذكرة</td>
<td>سريع</td>
</tr>
</tbody>
</table>
<p>استخدم <code>pre-commit</code> للعمل <strong>السريع على الملفات المُجهَّزة فقط</strong>. وهنا مكان lint-staged. واستخدم <code>commit-msg</code> للتحقق من رسالة الإيداع أو تسويتها. واستخدم <code>pre-push</code> للفحوصات الأبطأ التي تكون مكلفة أكثر من اللازم أو أوسع من نطاق <code>pre-commit</code>، مثل تشغيل اختبارات أكمل. وتتوافق <a href="https://git-scm.com/docs/githooks">دلالات الخُطّافات</a> في Git مع هذا التقسيم تمامًا.</p>
<p>وقد تبدو التهيئة العملية هكذا:</p>
<pre><code class="language-bash"><span class="hljs-comment"># .husky/pre-commit</span>
npx lint-staged
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># .husky/commit-msg</span>
node scripts/validate-commit-message.mjs <span class="hljs-string">&quot;<span class="hljs-variable">$1</span>&quot;</span>
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># .husky/pre-push</span>
npm <span class="hljs-built_in">test</span>
</code></pre>
<p>القاعدة الإرشادية بسيطة. أبقِ <code>pre-commit</code> سريعًا بما يكفي ألا يكرهه الناس. وإذا حشوت فيه مجموعة اختبارات المشروع بأكمله أو بناءً بطيئًا، فسيستخدم المطوّرون <code>--no-verify</code>، وهو أمر يجعل Git وHusky استخدامه تافهًا. وهذا ليس عيبًا في الأخلاق. بل استجابة نظام متوقعة.</p>
<h2 id="تجاوز-الخطافات-وci-وتثبيتات-الإنتاج">تجاوز الخُطّافات وCI وتثبيتات الإنتاج</h2>
<p>يدعم Husky مسار التجاوز المعتاد في Git ومسار التجاوز الخاص به القائم على متغيرات البيئة. فلإيداع واحد، يتجاوز <code>git commit -n</code> أو <code>--no-verify</code> الخُطّافات المؤهلة. وعلى نطاق أوسع، يؤدي ضبط <code>HUSKY=0</code> إلى تعطيل خُطّافات Husky، و<a href="https://typicode.github.io/husky/how-to.html">يوثّق Husky ذلك</a> للأوامر المفردة ولفترات أطول مثل إعادة الأساس. وهو أيضًا الطريقة الموصى بها لتفادي تثبيت الخُطّافات أو تشغيلها في خوادم CI وDocker.</p>
<p>ويقودنا هذا إلى حالة حدّية مهمة وقت التثبيت. إذا ثبّتت تبعيات الإنتاج فقط، فقد يفشل <code>&quot;prepare&quot;: &quot;husky&quot;</code> المجرّد لأن Husky تبعية تطوير وغير موجودة. وتقدّم توثيقات Husky إصلاحين: اجعل السكربت متسامحًا عبر <code>&quot;prepare&quot;: &quot;husky || true&quot;</code>، أو استخدم سكربت تثبيت صغيرًا يخرج مبكرًا في الإنتاج أو CI.</p>
<p>نسخة آمنة للإنتاج:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// .husky/install.mjs</span>
<span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span> || process.<span class="hljs-property">env</span>.<span class="hljs-property">CI</span> === <span class="hljs-string">&#x27;true&#x27;</span>) {
  process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">0</span>);
}

<span class="hljs-keyword">const</span> husky = (<span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;husky&#x27;</span>)).<span class="hljs-property">default</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">husky</span>());
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prepare&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node .husky/install.mjs&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا هو النمط الناضج إذا كانت صورة CI لديك أو تثبيت الإنتاج يستبعد تبعيات التطوير.</p>
<h2 id="الواجهات-الرسومية-ومديرو-إصدارات-node-وpath">الواجهات الرسومية ومديرو إصدارات Node وPATH</h2>
<p>من أنفع توثيقات Husky ما يتعلق بـ<a href="https://typicode.github.io/husky/how-to.html">واجهات Git الرسومية ومديري إصدارات Node</a>. فإذا ثبّت المطوّرون Node عبر <code>nvm</code> أو <code>fnm</code> أو <code>asdf</code> أو <code>volta</code> وما شابهها، فقد يفشل تنفيذ الخُطّاف في واجهة رسومية برسالة <code>command not found</code> لأن الواجهات الرسومية غالبًا لا تهيّئ ملفات بدء الصدفة التي تضبط <code>PATH</code> الصحيح. وحل Husky هو <code>~/.config/husky/init.sh</code>، الذي يقرأه Husky قبل كل خُطّاف.</p>
<pre><code class="language-bash"><span class="hljs-comment"># ~/.config/husky/init.sh</span>
<span class="hljs-built_in">export</span> NVM_DIR=<span class="hljs-string">&quot;<span class="hljs-variable">$HOME</span>/.nvm&quot;</span>
[ -s <span class="hljs-string">&quot;<span class="hljs-variable">$NVM_DIR</span>/nvm.sh&quot;</span> ] &amp;&amp; . <span class="hljs-string">&quot;<span class="hljs-variable">$NVM_DIR</span>/nvm.sh&quot;</span>
</code></pre>
<p>إذا كان فريقك يستخدم واجهات رسومية وقال أحدهم «تعمل في الطرفية لكنها لا تعمل في SourceTree / Tower / VS Code / أيًا كان»، فهذا أول مكان تبحث فيه.</p>
<h2 id="الحزم-المتداخلة-وتهيئات-ما-يقارب-المستودع-الأحادي">الحزم المتداخلة وتهيئات ما يقارب المستودع الأحادي</h2>
<p>يشغّل Git الخُطّافات من جذر المستودع، ولا يثبّت Husky في المجلدات الأصلية لأسباب أمنية. وإذا كان <code>package.json</code> لديك داخل مجلد فرعي بينما <code>.git/</code> فوقه، فتوصي توثيقات Husky بتغيير المجلد في <code>prepare</code> — مثلًا <code>cd .. &amp;&amp; husky frontend/.husky</code> — ثم العودة داخل الخُطّاف قبل تشغيل أمر مشروعك.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prepare&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cd .. &amp;&amp; husky frontend/.husky&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-bash"><span class="hljs-comment"># frontend/.husky/pre-commit</span>
<span class="hljs-built_in">cd</span> frontend
npm <span class="hljs-built_in">test</span>
</code></pre>
<p>يهمّ هذا في المستودعات المقسمة إلى واجهة أمامية وخلفية، والتطبيقات المتداخلة، وزوايا المستودعات الأحادية حيث وضع أحدهم تطبيق JavaScript في مكان «منطقي»، وهو ما يعني عمليًا «غير مريح».</p>
<h2 id="ما-الذي-يفعله-lint-staged-فعلا">ما الذي يفعله lint-staged فعلًا</h2>
<p>lint-staged أبسط بكثير مما تجعله فرق كثيرة. فمهمته أن يأخذ مجموعة <a href="https://github.com/lint-staged/lint-staged">الملفات المُجهَّزة</a>، ويطابقها مع أنماط glob، ويشغّل الأوامر للملفات المطابقة فقط. وهو مصمّم افتراضيًا ليعمل من <code>pre-commit</code>، وتُظهر التوثيقات صراحةً <code>.husky/pre-commit</code> وهو يستدعي <code>npx lint-staged</code> <em>بلا معاملات مسار</em>، لأن lint-staged يضيف الملفات المُجهَّزة المطابقة نيابةً عنك.</p>
<p>فكّر في lint-staged كـ<strong>موجّه للملفات المُجهَّزة</strong>، لا كـ«مدير سكربتات صدفة عام لـpre-commit». فهو ممتاز لـ<code>eslint --fix</code> و<code>prettier --write</code> و<code>stylelint</code> وتحسين الصور ومهام محلية ملفيًا مشابهة. وهو غلاف سيئ لأدوات تريد في جوهرها أن تعمل على المشروع كله.</p>
<h2 id="نموذج-الإعداد">نموذج الإعداد</h2>
<p>يمكن إعداد lint-staged في <code>package.json</code> أو ملفات <code>.lintstagedrc</code> أو ملفات إعداد مخصّصة مثل <code>lint-staged.config.js</code> و<code>.mjs</code> و<code>.cjs</code> وحتى <code>.ts</code> عندما تدعمها بيئة Node لديك. والإعداد كائن مفاتيحه أنماط glob وقيمه أوامر تُشغَّل. ويمكن لملفات إعداد JavaScript أيضًا أن تصدّر دوال لسلوك متقدم.</p>
<p>إعداد عادي:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;lint-staged&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;*.{js,jsx,ts,tsx}&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;eslint --fix&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;prettier --write&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;*.{md,json,yml,yaml}&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;prettier --write&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أو إذا أردت ملف إعداد منفصلًا:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// lint-staged.config.mjs</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-string">&#x27;*.{js,jsx,ts,tsx}&#x27;</span>: [<span class="hljs-string">&#x27;eslint --fix&#x27;</span>, <span class="hljs-string">&#x27;prettier --write&#x27;</span>],
  <span class="hljs-string">&#x27;*.{md,json,yml,yaml}&#x27;</span>: <span class="hljs-string">&#x27;prettier --write&#x27;</span>,
};
</code></pre>
<p>يضيف lint-staged افتراضيًا الملفات المُجهَّزة المطابقة إلى الأمر الذي يشغّله. لذا إذا قال إعدادك <code>&quot;*.js&quot;: &quot;eslint --fix&quot;</code>، فسيشغّل lint-staged فعليًا شيئًا مثل <code>eslint --fix file1.js file2.js</code>. ويمكن أن تكون الأوامر المدعومة ملفات تنفيذية محلية أو عامة، لكن lint-staged يُثبّط صراحةً الملفات التنفيذية العامة لأنها غير قابلة لإعادة الإنتاج عبر الآلات.</p>
<h2 id="مطابقة-الملفات-والمسارات">مطابقة الملفات والمسارات</h2>
<p>يستخدم lint-staged <a href="https://github.com/lint-staged/lint-staged">micromatch</a> لمطابقة glob. وإذا لم يحتوِ النمط على شرطة مائلة، فهو يطابق الأسماء الأساسية في أي مكان، لذا يطابق <code>&quot;*.js&quot;</code> كلا من <code>test.js</code> و<code>foo/bar/test.js</code>. وإذا احتوى على شرطة مائلة، تُطبَّق مطابقة المسار، لذا لا يطابق <code>&quot;foo/**/*.js&quot;</code> إلا تحت <code>foo/</code>.</p>
<p>يحدّد lint-staged جذر git تلقائيًا، ويختار الملفات المُجهَّزة داخل مجلد المشروع، ويرشّحها بالنمط، ويمرّر <strong>مسارات مطلقة</strong> إلى المهام افتراضيًا. ومن السهل تفويت هذا الافتراضي الخاص بالمسارات المطلقة، وهو مفيد بشكل مفاجئ — إذ يجنّبك الغموض عندما لا يكون مجلد <code>.git</code> و<code>package.json</code> في المكان نفسه. وإذا كانت أداتك تريد مسارات نسبية فعلًا، فاستخدم <code>--relative</code> أو إعدادًا بدالة تعيد كتابة أسماء الملفات بنفسك.</p>
<h2 id="تجاهل-الملفات">تجاهل الملفات</h2>
<p>توثيقات lint-staged نفسها واضحة في هذا: ينبغي عادةً أن تتولى الأداة الأساسية عملية تجاهل الملفات، لا lint-staged. وإذا كان ينبغي أن يتجاهل Prettier مجلد <code>vendor/</code>، فضع ذلك في <code>.prettierignore</code>. وسيظل lint-staged يمرّر الملفات المُجهَّزة في <code>vendor/</code>، لكن Prettier سيتجاهلها وفق قواعده الخاصة.</p>
<p>وإذا احتجت فعلًا إلى ترشيح على مستوى lint-staged، فاستخدم إعدادًا بـJavaScript ورشّح أسماء الملفات بنفسك عبر <code>micromatch.not()</code> أو بمنطقك الخاص. وهذه استثناء لا الافتراضي. وفي معظم الأحيان، إذا كنت تصارع lint-staged لتجاهل شيء ما، فإعداد التجاهل الفعلي مكانه ESLint أو Prettier أو Stylelint أو أي أداة حقيقية تقوم بالعمل.</p>
<h2 id="التجهيز-التلقائي-والتخزين-المؤقت-والملفات-المجهزة-جزئيا">التجهيز التلقائي والتخزين المؤقت والملفات المُجهَّزة جزئيًا</h2>
<p>lint-staged احتياطي بطبعه افتراضيًا. فهو ينشئ تخزينًا مؤقتًا احتياطيًا قبل تشغيل المهام، وإذا أحدثت المهام تعديلات بنجاح، جهّز lint-staged تلك التعديلات تلقائيًا للإيداع. لهذا <em>لا</em> ينبغي أن تضيف <code>git add</code> يدويًا في أوامر المهام بعد الآن. فقد تكفّل lint-staged بذلك بنفسه منذ الإصدار 10 تحديدًا لتفادي حالات التسابق عندما تعدّل مهام متعددة الملفات نفسها.</p>
<p>وسلوك الملفات المُجهَّزة جزئيًا هو الجزء الذي لا يفكر فيه الناس تقريبًا حتى يعضّهم. فـlint-staged يخفي افتراضيًا التغييرات غير المُجهَّزة في الملفات المُجهَّزة جزئيًا، ويشغّل المهام، ثم يعيد تلك التغييرات غير المُجهَّزة. وإذا عطّلت ذلك بـ<code>--no-hide-partially-staged</code>، فقد تنتهي تلك التغييرات مُودَعة أيضًا.</p>
<p>ويوجد أيضًا <code>--fail-on-changes</code>، الذي يقلب سير عمل أدوات التنسيق المعتاد. فبدل تجهيز تعديلات المهام تلقائيًا وترك الإيداع يمضي، يخرج lint-staged بالرمز 1 عندما تغيّر المهام ملفات ويترك تلك التعديلات في شجرة العمل لإعادة تجهيزها يدويًا. وهذا مفيد للفرق التي تريد أن يكون التنسيق صريحًا لا مُعدَّلًا بصمت داخل الإيداع.</p>
<h2 id="التزامن-وحالات-التسابق">التزامن وحالات التسابق</h2>
<p>يشغّل lint-staged المهام المهيّأة تزامنيًا افتراضيًا. وهذا لا بأس به عندما لا تتداخل الأنماط أو عندما تقرأ الأوامر الملفات فقط. أما عندما تكتب أنماط متداخلة <em>بالكتابة</em> في المجموعة نفسها من الملفات فيصبح الأمر فوضى. وتنبّه التوثيقات إلى ذلك مباشرةً بالفكرة السيئة الكلاسيكية: <code>&quot;*&quot;: &quot;prettier --write&quot;</code> مع <code>&quot;*.ts&quot;: &quot;eslint --fix&quot;</code>. الآن قد يعيد الأمران كتابة ملفات TypeScript نفسها في الوقت نفسه. مبروك على مولّد حالات التسابق الصغير الذي بنيته.</p>
<p>الإصلاح إما أن تجعل الأنماط غير متداخلة، أو أن تستخدم صيغة المصفوفة داخل نمط واحد بحيث تعمل الأوامر بالترتيب على المجموعة نفسها من الملفات:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-string">&#x27;!(*.ts)&#x27;</span>: <span class="hljs-string">&#x27;prettier --write&#x27;</span>,
  <span class="hljs-string">&#x27;*.ts&#x27;</span>: [<span class="hljs-string">&#x27;eslint --fix&#x27;</span>, <span class="hljs-string">&#x27;prettier --write&#x27;</span>],
};
</code></pre>
<p>وإذا احتجت تزامنًا أقل على المستوى العام، يدعم lint-staged <code>--concurrent &lt;number&gt;</code> أو <code>--concurrent false</code>.</p>
<h2 id="إعداد-الدوال-كمخرج-طارئ">إعداد الدوال كمخرج طارئ</h2>
<p>الإعداد القائم على الدوال هو الأداة القوية الحقيقية. فهو يتيح لك بناء الأوامر ديناميكيًا، وتشغيل منطق Node مخصّص، وترشيح قوائم الملفات بنفسك، والأهم أنه يمنع lint-staged من إضافة أسماء الملفات عندما ينبغي أن تعمل أداة مرة واحدة بلا معاملات ملفات. وتُظهر توثيقات lint-staged ذلك صراحةً في حالة <code>tsc</code>، لأن إضافة أسماء الملفات قد تجعل TypeScript يتجاهل <code>tsconfig.json</code>. والإصلاح هو <code>() =&gt; 'tsc --noEmit'</code>، لا <code>&quot;tsc --noEmit&quot;</code>.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// lint-staged.config.mjs</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-string">&#x27;*.{ts,tsx}&#x27;</span>: [<span class="hljs-function">() =&gt;</span> <span class="hljs-string">&#x27;tsc -p tsconfig.json --noEmit&#x27;</span>, <span class="hljs-string">&#x27;eslint --fix&#x27;</span>, <span class="hljs-string">&#x27;prettier --write&#x27;</span>],
};
</code></pre>
<p>كما يُستخدم إعداد الدوال للتعامل مع إعادة كتابة المسارات المخصّصة، أو بناء تجميعك الخاص للملفات، أو ترشيح الملفات قبل تسليمها إلى أداة. وهو المخرج الطارئ الصحيح عندما يتوقف التخطيط البسيط من نمط إلى أمر عن الكفاية.</p>
<p>وتفصيل آخر يسهل تفويته: لا توسّع أوامر المهام متغيرات البيئة كما تفعل صدفتك عادةً. وتذكر توثيقات lint-staged تحديدًا استخدام شيء مثل <code>cross-env</code> إذا احتجت ذلك السلوك.</p>
<h2 id="المستودعات-الأحادية">المستودعات الأحادية</h2>
<p>إرشادات lint-staged الرسمية للمستودعات الأحادية محددة جدًا: ثبّت lint-staged في جذر المستودع، ثم أضف ملفات إعداد منفصلة في كل حزمة إذا احتاجت حزم مختلفة إلى قواعد مختلفة. وسيستخدم lint-staged دائمًا ملف الإعداد <em>الأقرب</em> إلى الملف المُجهَّز. وتُعتبر تلك الإعدادات معزولة. وهذا يعني أن إعداد الجذر <em>لا</em> «يكمل» تلقائيًا الأنماط الناقصة في إعداد حزمة أقرب.</p>
<p>هذا العزل يفاجئ الناس دائمًا. فإذا وُجد <code>packages/frontend/.lintstagedrc.json</code> وكان يطابق <code>*.js</code> فقط، فلن يعود ملف <code>packages/frontend/README.md</code> المُجهَّز إلى قاعدة <code>*.md</code> في الجذر. فالإعداد الأقرب يفوز حتى لو لم يحتوِ على نمط مطابق لذلك الملف. وتوصي التوثيقات صراحةً باستخدام ملفات JS لتوسيع إعداد أساسي إذا أردت سلوكًا مشتركًا مع إضافات خاصة بالحزمة.</p>
<p>تهيئة صحية لمستودع أحادي:</p>
<pre><code class="language-bash"><span class="hljs-comment"># .husky/pre-commit</span>
pnpm <span class="hljs-built_in">exec</span> lint-staged
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// .lintstagedrc.mjs at repo root</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-string">&#x27;*.md&#x27;</span>: <span class="hljs-string">&#x27;prettier --write&#x27;</span>,
};
</code></pre>
<pre><code class="language-javascript"><span class="hljs-comment">// packages/frontend/lint-staged.config.mjs</span>
<span class="hljs-keyword">import</span> base <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../.lintstagedrc.mjs&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...base,
  <span class="hljs-string">&#x27;*.{js,jsx,ts,tsx}&#x27;</span>: [<span class="hljs-string">&#x27;eslint --fix&#x27;</span>, <span class="hljs-string">&#x27;prettier --write&#x27;</span>],
};
</code></pre>
<p>وإذا أردت فعلًا تشغيل lint-staged في حزمة واحدة فقط، فالمخرج الطارئ الرسمي هو <code>--cwd</code>.</p>
<h2 id="تشغيل-lint-staged-في-ci">تشغيل lint-staged في CI</h2>
<p>lint-staged أداة pre-commit في المقام الأول، لكنه يمكن أن يعمل في CI إذا أخبرته أي فرق (diff) يستخدم. ويستبدل خيار <code>--diff</code> المصدر المعتاد للملفات <code>git diff --staged</code> ويستلزم <code>--no-stash</code>.</p>
<pre><code class="language-bash">npx lint-staged --diff=<span class="hljs-string">&quot;origin/main...HEAD&quot;</span>
</code></pre>
<p>لكن النقطة المعمارية تبقى كما هي: خُطّافات Husky من أجل راحة المطوّر. أما CI فهو حد الفرض. وفي CI، عطّل Husky بـ<code>HUSKY=0</code> وشغّل الأوامر الفعلية التي تهمك، مع استخدام lint-staged اختياريًا مع <code>--diff</code> عندما يكون سلوك اختيار الملفات هذا ذا قيمة.</p>
<h2 id="حل-المشكلات">حل المشكلات</h2>
<p>إذا لم تعمل الخُطّافات إطلاقًا، فإن <a href="https://typicode.github.io/husky/troubleshoot.html">دليل حل المشكلات في Husky</a> يقول افحص ثلاثة أمور أولًا: يجب أن يكون اسم الملف اسم خُطّاف حقيقيًا مثل <code>pre-commit</code>، وينبغي أن يشير <code>core.hooksPath</code> إلى <code>.husky/_</code> أو إلى مجلد الخُطّافات الذي اخترته، وأن يكون Git أحدث من 2.9. ويشير أيضًا إلى أن <code>precommit</code> و<code>pre-commit.sh</code> اسمان غير صالحين للخُطّافات. وهذا النوع من الأخطاء محرج، لكنه شائع للغاية أيضًا.</p>
<p>وإذا بدا مخرَج الخُطّاف غريبًا أو مكررًا أو بلا ألوان، فإن lint-staged يوثّق تراجعًا في TTY خُطّافات Git 2.36 جرى إصلاحه في Git 2.37. وإذا عملت الخُطّافات في الطرفية وفشلت في واجهة رسومية، فأصلح تهيئة <code>PATH</code> عبر <code>~/.config/husky/init.sh</code>. وإذا فشلت في CI أو في تثبيتات الإنتاج فقط، فأصلح سكربت <code>prepare</code> و/أو اضبط <code>HUSKY=0</code>. وإذا فشلت في المستودعات المتداخلة، فتذكّر أن Git يشغّل الخُطّافات من جذر المستودع وأن Husky لن يثبّت في المجلدات الأصلية.</p>
<p>هذا معظم الغموض، ناقصًا بعض مشكلات Windows الحرفية.</p>
<h2 id="ما-لا-ينبغي-فعله">ما لا ينبغي فعله</h2>
<p>لا تشغّل أدوات المشروع الكاملة عبر lint-staged إذا كانت تلك الأدوات مصمّمة لفحص المشروع كله. فتوثيقات lint-staged نفسها تذكر <code>ng lint</code> صراحةً كأداة غير مناسبة للتنفيذ على الملفات المُجهَّزة وتوصي بوضعها في الخُطّاف مباشرةً بدل ذلك. وتسري هذه القاعدة العامة على ما هو أبعد من Angular.</p>
<p>لا تجعل أنماطًا متداخلة مُعدِّلة تتسابق فيما بينها. ولا تضف <code>git add</code> يدويًا في مهام lint-staged. ولا تعتمد على ملفات تنفيذية مثبّتة عامة. ولا تجعل <code>pre-commit</code> بطيئًا إلى حد أن يمدّ الجميع أيديهم إلى <code>--no-verify</code>. ولا تتظاهر بأن الخُطّافات المحلية تحل محل CI، لأن Git وHusky يمنحان الناس طرقًا عدة للالتفاف حولها.</p>
<h2 id="التهيئة-التي-أوصي-بها-فعلا">التهيئة التي أوصي بها فعلًا</h2>
<p>استخدم Husky لإدارة خُطّافات Git الأصلية عبر <code>.husky/</code>. وأبقِ <code>prepare</code> في جذر المستودع. وضع lint-staged في <code>pre-commit</code>. وأبقِ <code>pre-commit</code> محدودًا بمهام سريعة محلية ملفيًا على المُجهَّز فقط مثل التنسيق والإصلاح التلقائي بـESLint وStylelint، وربما فحصًا خفيفًا للأنواع أو الاختبارات عندما يعمل بسرعة فعلًا. وضع التحقق من الرسالة في <code>commit-msg</code>. وضع الاختبارات الأبطأ على مستوى المستودع في <code>pre-push</code> أو CI. وفي المستودعات الأحادية، شغّل عملية lint-staged واحدة في الجذر واستخدم إعدادات لكل حزمة فقط عندما تحتاج الحزم فعلًا إلى سياسات مختلفة للملفات المُجهَّزة.</p>
<p>الافتراضي الممل يفوز هنا. Husky لتوصيل الخُطّافات الأصلية. وlint-staged للعمل السريع على الملفات المُجهَّزة. وCI للفرض النهائي. وتصمد هذه التهيئة أمام النمو أفضل بكثير من البديل الكلاسيكي، الذي هو حشو برنامج الجودة كله داخل <code>pre-commit</code> ثم التظاهر بالدهشة عندما يبدأ الجميع بالإيداع بما يعادل «لا تخبر أمي» رقميًا.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="خطافات-git-كحواجز-أمان">خُطّافات Git كحواجز أمان</h3>
<blockquote>
<p>افرض المعايير قبل أن تصل الشفرة إلى CI.</p>
</blockquote>
<ul>
<li><strong>Husky</strong> — يدير خُطّافات Git. و<code>husky init</code> ينشئ مجلد <code>.husky/</code>.</li>
<li><strong>lint-staged</strong> — يشغّل الأدوات <em>على الملفات المُجهَّزة فقط</em>. سريع، حتى في المستودعات الكبيرة.</li>
</ul>
<pre><code class="language-json"><span class="hljs-comment">// package.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;lint-staged&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;*.{ts,tsx}&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;eslint --fix&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;prettier --write&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;*.css&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;stylelint --fix&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li>Pre-commit: فحص وتنسيق الملفات المُجهَّزة.</li>
<li>Commit-msg: التحقق من صيغة الإيداع الاصطلاحية.</li>
<li>Pre-push: تشغيل فحص الأنواع.</li>
</ul>
<p><strong>في مستودع أحادي:</strong> إعدادات lint-staged لكل حزمة. وكل حزمة تعرّف قواعدها.</p>
`,c={book:s,chapter:n,chapterTitle:t,slug:e,title:a,headings:p,html:o};export{s as book,n as chapter,t as chapterTitle,c as default,p as headings,o as html,e as slug,a as title};
