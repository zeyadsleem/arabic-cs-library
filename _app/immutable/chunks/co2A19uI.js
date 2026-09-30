const e="aosabook",a="v1-socialcalc",c="SocialCalc",o="index",l="SocialCalc",n=[{depth:2,id:"191-wikicalc",text:"19.1. WikiCalc"},{depth:2,id:"192-socialcalc",text:"19.2. SocialCalc"},{depth:2,id:"193-حلقة-تنفيذ-الأوامر",text:"19.3. حلقة تنفيذ الأوامر"},{depth:2,id:"194-محرر-الجدول",text:"19.4. محرّر الجدول"},{depth:2,id:"195-صيغة-الحفظ",text:"19.5. صيغة الحفظ"},{depth:2,id:"196-تحرير-النصوص-المنسقة",text:"19.6. تحرير النصوص المنسَّقة"},{depth:3,id:"1961-الأنواع-والصيغ",text:"19.6.1. الأنواع والصيغ"},{depth:3,id:"1962-عرض-نصوص-الويكي",text:"19.6.2. عرض نصوص الويكي"},{depth:2,id:"197-التعاون-الفوري",text:"19.7. التعاون الفوري"},{depth:3,id:"1971-النقل-عبر-المتصفحات",text:"19.7.1. النقل عبر المتصفحات"},{depth:3,id:"1972-حل-التعارضات",text:"19.7.2. حل التعارضات"},{depth:3,id:"1973-المؤشرات-البعيدة",text:"19.7.3. المؤشّرات البعيدة"},{depth:2,id:"198-الدروس-المستفادة",text:"19.8. الدروس المستفادة"},{depth:3,id:"1981-مصمم-رئيسي-برؤية-واضحة",text:"19.8.1. مصمّم رئيسي برؤية واضحة"},{depth:3,id:"1982-الويكات-من-أجل-استمرارية-المشروع",text:"19.8.2. الويكات من أجل استمرارية المشروع"},{depth:3,id:"1983-تبن-فروق-المناطق-الزمنية",text:"19.8.3. تبنَّ فروق المناطق الزمنية"},{depth:3,id:"1984-التحسين-من-أجل-المتعة",text:"19.8.4. التحسين من أجل المتعة"},{depth:3,id:"1985-قيادة-التطوير-باختبارات-القصص",text:"19.8.5. قيادة التطوير باختبارات القصص"},{depth:3,id:"1986-البرمجيات-مفتوحة-المصدر-مع-cpal",text:"19.8.6. البرمجيات مفتوحة المصدر مع CPAL"},{depth:2,id:"الحواشي",text:"الحواشي"}],s=`<p>معمارية تطبيقات المصادر المفتوحة (المجلد الأول)SocialCalc</p>
<h1>معمارية تطبيقات المصادر المفتوحة (المجلد الأول) SocialCalc</h1>
<p>Audrey Tang</p>
<p>إذا استمتعتُ بهذه الكتب، فقد تستمتع أيضًا بـ <a href="https://third-bit.com/sdxpy/">Software Design by Example in Python</a> و <a href="https://third-bit.com/sdxjs/">Software Design by Example in JavaScript</a>.</p>
<p>يمتدّ تاريخ جداول البيانات (spreadsheets) لأكثر من ثلاثين عامًا. فقد تصوّر Dan Bricklin برنامج جداول البيانات الأول، VisiCalc، عام 1978 وصدر عام 1979. وكان المفهوم الأصلي في غاية البساطة: جدولٌ يمتدّ في بُعدين إلى ما لا نهاية، وخلاياه مملوءة بنصوص وأرقام وصيغ. وتُؤلَّف الصيغ من معاملات حسابية عادية ودوال مدمجة متنوّعة، ويمكن لكل صيغة أن تستخدم المحتوى الحالي لخلايا أخرى بوصفه قيمًا.</p>
<p>ولئن كانت الاستعارة (metaphor) بسيطة، فإن لها تطبيقات عديدة: المحاسبة، وجرد المخزون، وإدارة القوائم، هي سوى بعض الأمثلة. وكانت الإمكانات عمليًا بلا حدود. وقد جعلت جميع هذه الاستخدامات من VisiCalc أول «تطبيق قاتل» (killer app) في عصر الحاسوب الشخصي.</p>
<p>وفي العقود التالية، أدخلت تطبيقات مثل Lotus 1-2-3 و Excel تحسينات تدريجية، لكن الاستعارة الأساسية بقيت كما هي. كانت معظم جداول البيانات تُخزَّن كملفات على القرص، وتُحمَّل في الذاكرة عند فتحها للتحرير. وكان التعاون صعبًا على وجه الخصوص في النموذج المعتمد على الملفات:</p>
<ul>
<li>كان على كل مستخدم تثبيت نسخة من محرّر جداول البيانات.</li>
<li>أضاف كلٌّ من تبادل البريد الإلكتروني ذهابًا وإيابًا، والمجلدات المشتركة، وإقامة نظام إدارة إصدارات مخصّص عبءً إداريًا.</li>
<li>كان تتبّع التغييرات محدودًا؛ فمثلًا لا يحتفظ Excel بسجل لتغييرات التنسيق ولا بتعليقات الخلايا.</li>
<li>كان تحديث التنسيقات أو الصيغ في القوالب يستلزم تغييرات مرهقة في ملفات جداول البيانات القائمة التي تستخدم ذلك القالب.</li>
</ul>
<p>ولحسن الحظ، ظهر نموذج تعاون جديد يعالج هذه المشكلات ببساطة أنيقة. إنه نموذج الويكي (wiki)، الذي اخترعه Ward Cunningham عام 1994، وروّجت له ويكيبيديا في مطلع الألفية الثالثة.</p>
<p>وبدلًا من الملفات، يقوم نموذج الويكي على صفحات تُستضاف على خادم، قابلة للتحرير داخل المتصفح من دون الحاجة إلى برمجيات خاصة. ويمكن لتلك الصفحات النصية التشعبية (hypertext) أن ترتبط ببعضها بسهولة، وأن تتضمّن حتى أجزاء من صفحات أخرى لتكوّن صفحة أكبر. ويطّلع جميع المشاركين على أحدث نسخة ويحرّرونها افتراضيًا، فيما يتولى الخادم إدارة سجلّ المراجعات تلقائيًا.</p>
<p>وبإلهام من نموذج الويكي، بدأ Dan Bricklin العمل على WikiCalc عام 2005. وهو يهدف إلى الجمع بين سهولة التأليف والتحرير المتعدّد الأشخاص في الويكيات مع استعارة التنسيق المرئي والحساب المألوفة في جداول البيانات.</p>
<h2 id="191-wikicalc">19.1. WikiCalc</h2>
<p>اتّسم الإصدار الأول من WikiCalc (<a href="#fig.soc.screenshot">الشكل 19.1</a>) بعدة ميزات ميّزته عن جداول البيانات الأخرى في ذلك الوقت:</p>
<ul>
<li>عرض البيانات النصية بنص عادي و HTML وترميز بأسلوب الويك.</li>
<li>نص بأسلوب الويك يتضمّن أوامر لإدراج الروابط والصور والقيم من مراجع الخلايا.</li>
<li>يمكن لخلايا الصيغ أن تشير إلى قيم صفحات WikiCalc أخرى المستضافة على مواقع ويب أخرى.</li>
<li>القدرة على إنشاء مُخرَجات يمكن تضمينها في صفحات ويب أخرى، سواء كانت بيانات ساكنة أو حيّة.</li>
<li>تنسيق الخلايا مع إمكان الوصول إلى سمات أنماط CSS وأصناف CSS.</li>
<li>تسجيل جميع عمليات التحرير في سجل تدقيق (audit trail).</li>
<li>الاحتفاظ، على طريقة الويكي، بكل نسخة جديدة من الصفحة مع إمكانية التراجع عنها.</li>
</ul>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-wikicalc-screenshot.webp" alt="[واجهة WikiCalc 1.0]"></p>
<p>الشكل 19.1: واجهة WikiCalc 1.0</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-wikicalc-components.webp" alt="[مكوّنات WikiCalc]"></p>
<p>الشكل 19.2: مكوّنات WikiCalc</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-wikicalc-flow.webp" alt="[تدفّق WikiCalc]"></p>
<p>الشكل 19.3: تدفّق WikiCalc</p>
<p>كانت البنية الداخلية لـ WikiCalc 1.0 (<a href="#fig.soc.comp">الشكل 19.2</a>) وتدفّق المعلومات فيها (<a href="#fig.soc.flow">الشكل 19.3</a>) بسيطين عن قصد، لكنهما مع ذلك قويّان. وقد أثبتت القدرة على تركيب جدول بيانات رئيسي من عدة جداول بيانات أصغر فائدتها العملية. فمثلًا، تخيّل سيناريو يحتفظ فيه كل مندوب مبيعات بأرقامه في صفحة جدول بيانات. ثم يجمع كل مدير مبيعات أرقام مندوبيه في جدول بيانات إقليمي، ثم يجمع نائب رئيس المبيعات الأرقام الإقليمية في جدول بيانات على المستوى الأعلى.</p>
<p>وفي كل مرة يُحدَّث فيها أحد جداول البيانات الفردية، يمكن لجميع جداول البيانات التجميعية أن تعكس ذلك التحديث. وإذا أراد أحدهم تفاصيل أكثر، فليكبّر عبر المستويات لعرض الجدول الكامن خلف الجدول. وتُلغي هذه القدرة التجميعية الجهد المكرر والمعرَّض للخطأ في تحديث الأرقام في أماكن متعددة، وتضمن بقاء جميع وجهات النظر على المعلومات طازجة.</p>
<p>ولضمان بقاء عمليات إعادة الحساب محدَّثة، تبنّى WikiCalc تصميم العميل الرفيع (thin client)، مُبقيًا جميع معلومات الحالة في جانب الخادم. ويُمثَّل كل جدول بيانات في المتصفح على هيئة عنصر \`\`؛ وتحرير خلية يُرسل نداء <code>ajaxsetcell</code> إلى الخادم، ثم ي告诉 الخادم المتصفح ما الخلايا التي تحتاج إلى تحديث.</p>
<p>وليس من المستغرب أن يعتمد هذا التصميم على اتصال سريع بين المتصفح والخادم. فحين يكون زمن الاستجابة (latency) مرتفعًا، يبدأ المستخدمون في ملاحظة تكرار ظهور رسائل «جارٍ التحميل…» (Loading…) في الفاصل بين تحديث خلية ورؤية محتواها الجديد، كما يوضّح <a href="#fig.soc.load">الشكل 19.4</a>. وتكون هذه مشكلة بصفة خاصة للمستخدمين الذين يحرّرون الصيغ تفاعليًا بتعديل المدخلات ويتوقّعون رؤية النتائج في الوقت الحقيقي.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-wikicalc-loading.webp" alt="[رسالة التحميل]"></p>
<p>الشكل 19.4: رسالة التحميل</p>
<p>علاوة على ذلك، ولأن عنصر \`\` كان له الأبعاد نفسها التي كانت لجدول البيانات، فإن شبكة قياس 100×100 كانت ستنشئ 10,000 عنصر DOM، وهو ما يرهق مورد الذاكرة في المتصفحات، فيقيّد حجم الصفحات أكثر.</p>
<p>ولهذه العيوب، ولئن كان WikiCalc مفيدًا كخادم مستقل يعمل على localhost، إلا أنه لم يكن عمليًا جدًا لدمجه ضمن أنظمة إدارة المحتوى المعتمدة على الويب.</p>
<p>وفي عام 2006، تعاون Dan Bricklin مع Socialtext لبدء تطوير SocialCalc، وهو إعادة كتابة لـ WikiCalc من الصفر بلغة Javascript بالاعتماد على بعض شيفرة Perl الأصلية.</p>
<p>استهدفت هذه إعادة الكتابة عمليات تعاون موزّعة وكبيرة، وسعت إلى توفير مظهر وإحساس أقرب إلى تطبيق سطح مكتب. وقد تضمّنت أهداف التصميم الأخرى:</p>
<ul>
<li>القدرة على معالجة مئات الآلاف من الخلايا.</li>
<li>زمن استجابة سريع لعمليات التحرير.</li>
<li>سجل تدقيق (audit trail) ومكدّس تراجع/إعادة على جانب العميل.</li>
<li>استخدام أفضل لـ Javascript و CSS لتوفير وظائف تخطيط كاملة.</li>
<li>دعم المتصفحات المتعددة، رغم الاستخدام الأوسع لجافاسكربت المتجاوب (responsive Javascript).</li>
</ul>
<p>وبعد ثلاث سنوات من التطوير وإصدارات تجريبية عديدة، أصدرت Socialtext نسخة SocialCalc 1.0 عام 2009، محقّقةً أهداف التصميم بنجاح. فلننظر الآن إلى معمارية نظام SocialCalc.</p>
<h2 id="192-socialcalc">19.2. SocialCalc</h2>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-socialcalc-screenshot.webp" alt="[واجهة SocialCalc]"></p>
<p>الشكل 19.5: واجهة SocialCalc</p>
<p>يوضّح <a href="#fig.soc.action">الشكل 19.5</a> و <a href="#fig.soc.class">الشكل 19.6</a> واجهة SocialCalc وأصنافه على الترتيب. ومقارنةً بـ WikiCalc، فقد تقلّص دور الخادم كثيرًا. فمسؤوليته الوحيدة هي الاستجابة لطلبات HTTP GET بتقديم جداول البيانات كاملةً مُسلسَلةً بصيغة الحفظ؛ وبمجرد أن يستلم المتصفح البيانات، تكون جميع الحسابات وتتبّع التغيّرات وتفاعل المستخدم منفَّذة الآن في Javascript.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-socialcalc-class-diagram.webp" alt="[مخطط أصناف SocialCalc]"></p>
<p>الشكل 19.6: مخطط أصناف SocialCalc</p>
<p>صُمِّمت مكوّنات Javascript بأسلوب MVC (Model/View/Controller) طبقي، مع تركيز كل صنف على جانب واحد:</p>
<ul>
<li><em>Sheet</em> هو نموذج البيانات، ويمثّل بنية في الذاكرة لجدول بيانات. فهو يحتوي على قاموس يربط الإحداثيات بكائنات <em>Cell</em>، يمثّل كل منها خلية واحدة. أما الخلايا الفارغة فلا تحتاج إلى أي إدخالات، وبذلك لا تستهلك أي ذاكرة على الإطلاق.</li>
<li><em>Cell</em> يمثّل محتوى الخلية وتنسيقاتها. وتوضّح <a href="#tbl.soc.cellcontents">الجدول 19.1</a> بعض الخصائص الشائعة.</li>
<li><em>RenderContext</em> ينفّذ طبقة العرض (view)؛ وهو مسؤول عن تصيير الورقة إلى كائنات DOM.</li>
<li><em>TableControl</em> هو المتحكّم الرئيسي، ويقبل أحداث الفأرة ولوحة المفاتيح. فحين يتلقّى أحداث عرض مثل التمرير والتحجيم، يحدّث كائن <em>RenderContext</em> المرتبط به. وحين يتلقّى أحداث تحديث تؤثّر في محتوى الورقة، يجدول أوامر جديدة في قائمة أوامر الورقة.</li>
<li><em>SpreadSheetControl</em> هو واجهة المستخدم في المستوى الأعلى، وتضمّ أشرطة أدوات وأشرطة حالة ونوافذ حوار ومنتقيات ألوان.</li>
<li><em>SpreadSheetViewer</em> واجهة بديلة في المستوى الأعلى توفّر عرضًا تفاعليًا للقراءة فقط.</li>
</ul>
<table>
<thead>
<tr>
<th><code>datatype</code></th>
<th><code>t</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>datavalue</code></td>
<td><code>1Q84</code></td>
</tr>
<tr>
<td><code>color</code></td>
<td><code>black</code></td>
</tr>
<tr>
<td><code>bgcolor</code></td>
<td><code>white</code></td>
</tr>
<tr>
<td><code>font</code></td>
<td><code>italic bold 12pt Ubuntu</code></td>
</tr>
<tr>
<td><code>comment</code></td>
<td><code>Ichi-Kyu-Hachi-Yon</code></td>
</tr>
</tbody>
</table>
<p>الجدول 19.1: محتوى الخلايا وتنسيقاتها</p>
<p>اعتمدنا نظام كائنات قائم على الأصناف (class-based) في أدنى صوره، مع تركيب/تفويض (composition/delegation) بسيط، من دون أي استخدام للوراثة (inheritance) أو للنماذج الأولية للكائنات (object prototypes). وتوضع جميع الرموز ضمن فضاء الأسماء <code>SocialCalc.*</code> تفاديًا لتعارض الأسماء.</p>
<p>يمرّ كل تحديث على الورقة عبر الطريقة <code>ScheduleSheetCommands</code>، التي تأخذ سلسلة أوامر تمثّل التحرير. (وتوضّح <a href="#tbl.soc.commands">الجدول 19.2</a> بعض الأوامر الشائعة.) ويمكن للتطبيق المُضمِّن لـ SocialCalc أن يعرّف أوامر إضافية خاصة به، بإضافة دوال استدعاء مسمّاة (named callbacks) إلى الكائن <code>SocialCalc.SheetCommandInfo.CmdExtensionCallbacks</code>، واستخدام الأمر <code>startcmdextension</code> لاستدعائها.</p>
<pre><code>    set     sheet defaultcolor blue
    set     A width 100
    set     A1 value n 42
    set     A2 text t Hello
    set     A3 formula A1*2
    set     A4 empty
    set     A5 bgcolor green
    merge   A1:B2
    unmerge A1
</code></pre>
<pre><code>    erase   A2
    cut     A3
    paste   A4
    copy    A5
    sort    A1:B9 A up B down
    name    define Foo A1:A5
    name    desc   Foo Used in formulas like SUM(Foo)
    name    delete Foo
    startcmdextension UserDefined args
</code></pre>
<p>الجدول 19.2: أوامر SocialCalc</p>
<h2 id="193-حلقة-تنفيذ-الأوامر">19.3. حلقة تنفيذ الأوامر</h2>
<p>لتحسين الاستجابة، يؤدّي SocialCalc جميع عمليات إعادة الحساب وتحديثات DOM في الخلفية، بحيث يواصل المستخدم إجراء تغييراته على عدة خلايا بينما يلحق المحرّك بالتغييرات الأسبق الموجودة في قائمة الأوامر.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-socialcalc-command-runloop.webp" alt="[حلقة تنفيذ أوامر SocialCalc]"></p>
<p>الشكل 19.7: حلقة تنفيذ أوامر SocialCalc</p>
<p>أثناء تشغيل أمر ما، يضبط الكائن <code>TableEditor</code> راية <code>busy</code> على القيمة true؛ وعندئذٍ تُدفع الأوامر التالية إلى قائمة <code>deferredCommands</code>، بما يضمن ترتيبًا تسلسليًا للتنفيذ. وكما يوضّح مخطط حلقة الأحداث في <a href="#fig.soc.loop">الشكل 19.7</a>، يواصل كائن Sheet إرسال أحداث <code>StatusCallback</code> لإعلام المستخدم بالحالة الراهنة لتنفيذ الأوامر، عبر كل واحدة من الخطوات الأربع:</p>
<ul>
<li><em>ExecuteCommand</em>: يرسل <code>cmdstart</code> عند البدء، و <code>cmdend</code> عند انتهاء تنفيذ الأمر. وإذا غيّر الأمر قيمة خلية بشكل غير مباشر، فادخل خطوة <em>Recalc</em>. وإلا، إذا غيّر الأمر المظهر المرئي لخلية واحدة أو أكثر من خلايا الشاشة، فادخل خطوة <em>Render</em>. وإذا لم ينطبق أيٌّ من الأمرين السابقين (مثلًا مع الأمر <code>copy</code>)، فتجاوز إلى خطوة <em>PositionCalculations</em>.</li>
<li><em>Recalc</em> <em>(asneeded)</em>: يرسل <code>calcstart</code> عند البدء، و <code>calcorder</code> كل 100 مللي ثانية عند فحص سلسلة اعتمادية الخلايا، و <code>calccheckdone</code> عند انتهاء الفحص، و <code>calcfinished</code> عندما تتلقّى جميع الخلايا المتأثرة قيمها المعاد حسابها. وتتبع هذه الخطوة دائمًا خطوة <em>Render</em>.</li>
<li><em>Render</em> <em>(as needed)</em>: يرسل <code>schedrender</code> عند البدء، و <code>renderdone</code> عندما يُحدَّث عنصر \`\` بالخلايا المنسَّقة. وتتبع هذه الخطوة دائمًا <em>PositionCalculations</em>.</li>
<li><em>PositionCalculations</em>: يرسل <code>schedposcalc</code> عند البدء، و <code>doneposcalc</code> بعد تحديث أشرطة التمرير ومؤشّر الخلية القابلة للتحرير الحالية والمكوّنات المرئية الأخرى الخاصة بـ <code>TableEditor</code>.</li>
</ul>
<p>ولأن جميع الأوامر تُحفظ فور تنفيذها، فإننا نحصل طبيعيًا على سجل تدقيق لكل العمليات. وتقدّم الطريقة <code>Sheet.CreateAuditString</code> سلسلةً مفصولةً بأسطر جديدة بوصفها سجل التدقيق، بحيث يقع كل أمر في سطر واحد.</p>
<p>كما تنشئ <code>ExecuteSheetCommand</code> أمر تراجع (undo) لكل أمر تنفّذه. فمثلًا، إذا كانت الخلية A1 تحتوي على «Foo» ونفّذ المستخدم الأمر <code>set A1 text Bar</code>، فسيُدفع أمر التراجع <code>set A1 text Foo</code> إلى مكدّس التراجع. وإذا نقر المستخدم على تراجع (Undo)، يُنفَّذ أمر التراجع لاستعادة A1 إلى قيمته الأصلية.</p>
<h2 id="194-محرر-الجدول">19.4. محرّر الجدول</h2>
<p>لننظر الآن إلى طبقة TableEditor. فهي تحسب الإحداثيات على الشاشة الخاصة بـ <code>RenderContext</code>، وتدير أشرطة التمرير الأفقية والرأسية عبر نسختين من <code>TableControl</code>.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-socialcalc-parts.webp" alt="[نسختا TableControl تُديران أشرطة التمرير]"></p>
<p>الشكل 19.8: نسختا TableControl تُديران أشرطة التمرير</p>
<p>وتختلف طبقة العرض، التي يتولاها الصنف <code>RenderContext</code>، أيضًا عن تصميم WikiCalc. فبدلًا من ربط كل خلية بعنصر <code>، أصبحنا ننشئ ببساطة عنصرًا </code> ثابت الحجم يتّسع مع المنطقة المرئية في المتصفح، ونملؤه مسبقًا بعناصر \`\`.</p>
<p>ومع تمرير المستخدم جدول البيانات عبر أشرطة التمرير التي رسمناها بأنفسنا، نحدّث ديناميكيًا قيمة <code>innerHTML</code> للعناصر <code>المرسومة مسبقًا. وهذا يعني أننا لا نحتاج إلى إنشاء أي عناصر</code> أو \`\` أو إتلافها في حالات شائعة كثيرة، مما يسرّع زمن الاستجابة كثيرًا.</p>
<p>ولأن <code>RenderContext</code> لا يعرض سوى المنطقة المرئية، يمكن أن يكون حجم كائن Sheet كبيرًا إلى أي حدّ دون أن يؤثر ذلك في أدائه.</p>
<p>يحتوي <code>TableEditor</code> أيضًا على كائن <code>CellHandles</code>، الذي ينفّذ قائمة التعبئة/النقل/الانزلاق الدائرية (radial fill/move/slide) المرتبطة بالزاوية السفلية اليمنى من الخلية القابلة للتحرير الحالية، المعروفة باسم ECell، كما يوضّح <a href="#fig.soc.ecell">الشكل 19.9</a>.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-socialcalc-cell-handles.webp" alt="[الخلية القابلة للتحرير الحالية، المعروفة باسم ECell]"></p>
<p>الشكل 19.9: الخلية القابلة للتحرير الحالية، المعروفة باسم ECell</p>
<p>يُدار صندوق الإدخال (input box) بواسطة صنفين: <code>InputBox</code> و <code>InputEcho</code>. فأولهما يدير صف التحرير الموجود فوق الشبكة، بينما يعرض الثاني طبقة معاينة تُحدَّث أثناء الكتابة، مُتراكِبة فوق محتوى ECell (<a href="#fig.soc.input">الشكل 19.10</a>).</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-socialcalc-input.webp" alt="[صندوق الإدخال يديره صنفان]"></p>
<p>الشكل 19.10: صندوق الإدخال يديره صنفان</p>
<p>عادةً ما لا يحتاج محرّك SocialCalc إلى الاتصال بالخادم إلا عند فتح جدول بيانات للتحرير، وعند حفظه مجددًا إلى الخادم. ولهذا الغرض، تحلّل الطريقة <code>Sheet.ParseSheetSave</code> سلسلةً بصيغة الحفظ إلى كائن <code>Sheet</code>، وتُسلسِل الطريقة <code>Sheet.CreateSheetSave</code> كائن <code>Sheet</code> مرة أخرى إلى صيغة الحفظ.</p>
<p>ويمكن للصيغ أن تشير إلى قيم من أي جدول بيانات بعيد له عنوان URL. ويعيد الأمر <code>recalc</code> جلب جداول البيانات المُشار إليها خارجيًا، ويحلّلها من جديد باستخدام <code>Sheet.ParseSheetSave</code>، ويخزّنها في ذاكرة مؤقتة (cache) بحيث يتمكّن المستخدم من الإشارة إلى خلايا أخرى في جداول البيانات البعيدة نفسها من دون إعادة جلب محتواها.</p>
<h2 id="195-صيغة-الحفظ">19.5. صيغة الحفظ</h2>
<p>صيغة الحفظ هي صيغة MIME القياسية <code>multipart/mixed</code>، وتتألف من أربعة أجزاء من نوع <code>text/plain; charset=UTF-8</code>، يتضمّن كل جزء نصًا مفصولًا بأسطر جديدة وتُفصل حقول بياناته بنقطتين. والأجزاء هي:</p>
<ul>
<li>يعدّد الجزء <code>meta</code> أنواع الأجزاء الأخرى.</li>
<li>يعدّد الجزء <code>sheet</code> تنسيق ومحتوى كل خلية، وعرض كل عمود (إن لم يكن افتراضيًا)، والتنسيق الافتراضي للورقة، يلي ذلك قائمة بالخطوط والألوان والحدود المستخدمة في الورقة.</li>
<li>يحفظ الجزء الاختياري <code>edit</code> حالة التحرير في <code>TableEditor</code>، بما في ذلك الموضع الأخير لـ ECell، وكذلك الأحجام الثابتة لألواح الصفوف/الأعمدة.</li>
<li>يحتوي الجزء الاختياري <code>audit</code> على سجلّ الأوامر التي نُفِّذت في جلسة التحرير السابقة.</li>
</ul>
<p>فمثلًا، يوضّح <a href="#fig.soc.save">الشكل 19.11</a> جدول بيانات من ثلاث خلايا، فيها القيمة <code>1874</code> في A1 بوصفها ECell، والصيغة <code>2^2*43</code> في A2، والصيغة <code>SUM(Foo)</code> في A3 معروضة بخط عريض، وتشير إلى النطاق المُسمّى <code>Foo</code> على <code>A1:A2</code>.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-socialcalc-2046.webp" alt="[جدول بيانات بثلاث خلايا]"></p>
<p>الشكل 19.11: جدول بيانات بثلاث خلايا</p>
<p>تبدو صيغة الحفظ المُسلسَلة لجدول البيانات على النحو التالي:</p>
<pre><code>    socialcalc:version:1.0
    MIME-Version: 1.0
    Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave
    --SocialCalcSpreadsheetControlSave
    Content-type: text/plain; charset=UTF-8

    # SocialCalc Spreadsheet Control Save
    version:1.0
    part:sheet
    part:edit
    part:audit
    --SocialCalcSpreadsheetControlSave
    Content-type: text/plain; charset=UTF-8

    version:1.5
    cell:A1:v:1874
    cell:A2:vtf:n:172:2^2*43
    cell:A3:vtf:n:2046:SUM(Foo):f:1
    sheet:c:1:r:3
    font:1:normal bold * *
    name:FOO::A1\\cA2
    --SocialCalcSpreadsheetControlSave
    Content-type: text/plain; charset=UTF-8

    version:1.0
    rowpane:0:1:14
    colpane:0:1:16
    ecell:A1
    --SocialCalcSpreadsheetControlSave
    Content-type: text/plain; charset=UTF-8

    set A1 value n 1874
    set A2 formula 2^2*43
    name define Foo A1:A2
    set A3 formula SUM(Foo)
    --SocialCalcSpreadsheetControlSave--
</code></pre>
<p>صُمِّمت هذه الصيغة لتكون قابلة للقراءة من جانب الإنسان، فضلًا عن كونها سهلة التوليد نسبيًا برمجيًا. وهذا يجعل بالإمكان لإضافة Sheetnode في Drupal أن تستخدم PHP للتحويل بين هذه الصيغة وصيغ جداول البيانات الشائعة الأخرى، مثل Excel (<code>.xls</code>) و OpenDocument (<code>.ods</code>).</p>
<p>والآن، وقد صار لدينا تصوّر جيّد عن كيفية ترابط أجزاء SocialCalc، فلننظر إلى مثالين من العالم الفعلي لتوسيع SocialCalc.</p>
<h2 id="196-تحرير-النصوص-المنسقة">19.6. تحرير النصوص المنسَّقة</h2>
<p>المثال الأول الذي سننظر إليه هو تحسين خلايا النص في SocialCalc بترميز الويك، لعرض صيغته المنسَّقة (rich text) داخل محرّر الجدول نفسه (<a href="#fig.soc.rt">الشكل 19.12</a>).</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-richtext-screenshot.webp" alt="[عرض النصوص المنسّقة في محرّر الجدول]"></p>
<p>الشكل 19.12: عرض النصوص المنسّقة في محرّر الجدول</p>
<p>أضفنا هذه الميزة إلى SocialCalc مباشرة بعد إصداره 1.0، للاستجابة إلى الطلب الشائع بإدراج الصور والروابط وتنسيقات النصوص باستخدام صياغة موحّدة. وبما أن Socialtext يمتلك أصلًا منصة ويكي مفتوحة المصدر، كان من الطبيعي أن نُعيد استخدام الصياغة نفسها في SocialCalc أيضًا.</p>
<p>ولتنفيذ ذلك، نحتاج إلى مُصيِّر (renderer) مخصّص لـ <code>textvalueformat</code> الخاص بـ <code>text-wiki</code>، وإلى تغيير الصيغة الافتراضية لخلايا النصوص لاستخدامه.</p>
<p>وما هذا <code>textvalueformat</code> الذي تسأل عنه؟ تابع القراءة.</p>
<h3 id="1961-الأنواع-والصيغ">19.6.1. الأنواع والصيغ</h3>
<p>في SocialCalc، لكل خلية <code>datatype</code> (نوع بيانات) و <code>valuetype</code> (نوع قيمة). وخلايا البيانات التي تحمل نصًا أو أرقامًا تقابل أنواع قيم نصية/رقمية، أما خلايا الصيغ ذات <code>datatype=&quot;f&quot;</code> فيمكن أن تولّد قيمًا رقمية أو نصية.</p>
<p>وتذكّر أن الكائن <code>Sheet</code> يولّد لغة HTML من كل خلية من خلاياه في خطوة Render. وهو يفعل ذلك بفحص <code>valuetype</code> الخاص بكل خلية: إذا بدأ بالحرف t، فإن الخاصية <code>textvalueformat</code> للخلية تحدّد كيفية التوليد. وإذا بدأ بالحرف <code>n</code>، فيُستخدم بدلًا منها الخاصية <code>nontextvalueformat</code>.</p>
<p>غير أنه إذا لم تكن الخاصية <code>textvalueformat</code> أو <code>nontextvalueformat</code> للخلية معرَّفةً صراحةً، فيُبحث عن صيغة افتراضية انطلاقًا من <code>valuetype</code> الخاص بها، كما يوضّح <a href="#fig.soc.vformat">الشكل 19.13</a>.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-richtext-formats.webp" alt="[أنواع القيم]"></p>
<p>الشكل 19.13: أنواع القيم</p>
<p>الدعم لصيغة القيم <code>text-wiki</code> مُرمَّز في <code>SocialCalc.format_text_for_display</code>:</p>
<pre><code>if (SocialCalc.Callbacks.expand_wiki &amp;&amp; /^text-wiki/.test(valueformat)) {
    // do general wiki markup
    displayvalue = SocialCalc.Callbacks.expand_wiki(
        displayvalue, sheetobj, linkstyle, valueformat
    );
}
</code></pre>
<p>وبدلًا من تضمين أداة تحويل الويك إلى HTML داخل <code>format_text_for_display</code>، سنعرّف خطّافًا (hook) جديدًا في <code>SocialCalc.Callbacks</code>. وهذا هو النمط الموصى به في شيفرة SocialCalc بكاملها؛ فهو يحسّن النمطية (modularity) بجعله ممكنًا لتوصيل طرائق مختلفة لتوسيع نصوص الويك، فضلًا عن الحفاظ على التوافق مع التطبيقات المُضمِّنة التي لا ترغب في هذه الميزة.</p>
<h3 id="1962-عرض-نصوص-الويكي">19.6.2. عرض نصوص الويكي</h3>
<p>ثم سنستعين بـ Wikiwyg<a href="#footnote-1">1</a>، وهي مكتبة Javascript توفّر تحويلات ثنائية الاتجاه بين نصوص الويك و HTML.</p>
<p>نعرّف الدالة <code>expand_wiki</code> بأن نأخذ نص الخلية ونمرّره على محلّل نصوص الويك في Wikiwyg وعلى باعث HTML الخاص به:</p>
<pre><code class="language-python">var parser = new Document.Parser.Wikitext();
var emitter = new Document.Emitter.HTML();
SocialCalc.Callbacks.expand_wiki = function(val) {
    // Convert val <span class="hljs-keyword">from</span> Wikitext to HTML
    <span class="hljs-keyword">return</span> parser.parse(val, emitter);
}
</code></pre>
<p>وتتمثّل الخطوة الأخيرة في جدولة الأمر <code>set sheet defaulttextvalueformat text-wiki</code> مباشرةً بعد تهيئة جدول البيانات:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// We assume there&#x27;s a &lt;div id=&quot;tableeditor&quot;/&gt; in the DOM already</span>
<span class="hljs-keyword">var</span> spreadsheet = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SocialCalc</span>.<span class="hljs-title class_">SpreadsheetControl</span>();
spreadsheet.<span class="hljs-title class_">InitializeSpreadsheetControl</span>(<span class="hljs-string">&quot;tableeditor&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
spreadsheet.<span class="hljs-title class_">ExecuteCommand</span>(<span class="hljs-string">&#x27;set sheet defaulttextvalueformat text-wiki&#x27;</span>);
</code></pre>
<p>وبتجميع ذلك كله، تعمل خطوة Render الآن كما يوضّح <a href="#fig.soc.render">الشكل 19.14</a>.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-richtext-flow.webp" alt="[خطوة Render]"></p>
<p>الشكل 19.14: خطوة Render</p>
<p>هذا كل شيء! يدعم SocialCalc المحسَّن الآن مجموعةً غنية من صيغ ترميز الويك:</p>
<pre><code>*bold* _italic_ \`monospace\` 
&gt; indented text
* unordered list
# ordered list
&quot;Hyperlink with label&quot;&lt;http://softwaregarden.com/&gt;
{image: http://www.socialtext.com/static/logo.png}
</code></pre>
<p>جرّب إدخال <code>*bold* _italic_ </code>monospace\`\` في A1، وستراه معروضًا كنص منسَّق (<a href="#fig.soc.rtext">الشكل 19.15</a>).</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-richtext-example.webp" alt="[مثال Wikywyg]"></p>
<p>الشكل 19.15: مثال Wikywyg</p>
<h2 id="197-التعاون-الفوري">19.7. التعاون الفوري</h2>
<p>المثال التالي الذي سنستكشفه هو التحرير الفوري متعدّد المستخدمين على جدول بيانات مشترك. قد يبدو ذلك معقّدًا في بادئ الأمر، لكن بفضل التصميم النمطي لـ SocialCalc لا يحتاج الأمر سوى أن يبثّ كل مستخدم متصل أوامرَه إلى بقية المشاركين.</p>
<p>وللتمييز بين الأوامر الصادرة محليًا والأوامر البعيدة، نضيف معاملًا <code>isRemote</code> إلى الطريقة <code>ScheduleSheetCommands</code>:</p>
<pre><code>SocialCalc.ScheduleSheetCommands = function(sheet, cmdstr, saveundo, isRemote) {
   if (SocialCalc.Callbacks.broadcast &amp;&amp; !isRemote) {
       SocialCalc.Callbacks.broadcast('execute', {
           cmdstr: cmdstr, saveundo: saveundo
       });
   }
   // &amp;hellip;original ScheduleSheetCommands code here&amp;hellip;
}
</code></pre>
<p>ولم يعد أمامنا سوى تعريف دالة استدعاء مناسبة وهي <code>SocialCalc.Callbacks.broadcast</code>. وبمجرد توفّرها، ستُنفَّذ الأوامر نفسها لدى جميع المستخدمين الموصولين بجدول البيانات نفسه.</p>
<p>وعندما نُفِّذت هذه الميزة أول مرة من أجل مشروع OLPC (One Laptop Per Child<a href="#footnote-2">2</a>) على يد مختبرات Sugar التابعة لـ SEETA<a href="#footnote-3">3</a> عام 2009، بُنيت الدالة <code>broadcast</code> باستخدام نداءات XPCOM إلى D-Bus/Telepathy، وهو الناقل المعياري لشبكات OLPC/Sugar (انظر <a href="#fig.soc.olpc">الشكل 19.16</a>).</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-collab-olpc.webp" alt="[تنفيذ OLPC]"></p>
<p>الشكل 19.16: تنفيذ OLPC</p>
<p>وقد نجح ذلك إلى حدٍّ معقول، إذ أتاح لحالات XO في شبكة Sugar نفسها أن تتعاون على جدول بيانات SocialCalc مشترك. غير أنه مرتبط على حد سواء بمنصّة المتصفح Mozilla/XPCOM وبمنصّة المراسلة D-Bus/Telepathy.</p>
<h3 id="1971-النقل-عبر-المتصفحات">19.7.1. النقل عبر المتصفحات</h3>
<p>ولجعل ذلك يعمل عبر المتصفحات وأنظمة التشغيل، نستخدم إطار <code>Web::Hippie</code><a href="#footnote-4">4</a>، وهو تجريد عالي المستوى لـ JSON-over-WebSocket مع ربط مريح بـ jQuery، مع جعل MXHR (Multipart XML HTTP Request<a href="#footnote-5">5</a>) آلية النقل الاحتياطية إذا لم يكن WebSocket متاحًا.</p>
<p>وللمتصفحات التي تتوفّر فيها إضافة Adobe Flash ولا تدعم WebSocket أصليًا، نستخدم محاكاة WebSocket عبر Flash من مشروع <code>web_socket.js</code><a href="#footnote-6">6</a>، وهي غالبًا أسرع وأكثر موثوقية من MXHR. ويوضّح <a href="#fig.soc.collab">الشكل 19.17</a> تدفّق العملية.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-collab-flow.webp" alt="[التدفّق عبر المتصفحات]"></p>
<p>الشكل 19.17: التدفّق عبر المتصفحات</p>
<p>تُعرَّف دالة <code>SocialCalc.Callbacks.broadcast</code> في جانب العميل على النحو التالي:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">var</span> hpipe = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hippie</span>.<span class="hljs-title class_">Pipe</span>();

<span class="hljs-title class_">SocialCalc</span>.<span class="hljs-property">Callbacks</span>.<span class="hljs-property">broadcast</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">type, data</span>) {
    hpipe.<span class="hljs-title function_">send</span>({ <span class="hljs-attr">type</span>: type, <span class="hljs-attr">data</span>: data });
};

$(hpipe).<span class="hljs-title function_">bind</span>(<span class="hljs-string">&quot;message.execute&quot;</span>, <span class="hljs-keyword">function</span> (<span class="hljs-params">e, d</span>) {
    <span class="hljs-keyword">var</span> sheet = <span class="hljs-title class_">SocialCalc</span>.<span class="hljs-property">CurrentSpreadsheetControlObject</span>.<span class="hljs-property">context</span>.<span class="hljs-property">sheetobj</span>;
    sheet.<span class="hljs-title class_">ScheduleSheetCommands</span>(
        d.<span class="hljs-property">data</span>.<span class="hljs-property">cmdstr</span>, d.<span class="hljs-property">data</span>.<span class="hljs-property">saveundo</span>, <span class="hljs-literal">true</span> <span class="hljs-comment">// isRemote = true</span>
    );
    <span class="hljs-keyword">break</span>;
});
</code></pre>
<p>ولئن كان هذا يعمل جيدًا إلى حدٍّ كبير، فهناك مشكلتان متبقيتان يجب معالجتهما.</p>
<h3 id="1972-حل-التعارضات">19.7.2. حل التعارضات</h3>
<p>الأولى هي حالة سباق (race condition) في ترتيب الأوامر المنفَّذة: إذا نفّذ المستخدمان A و B في الوقت نفسه عملية تؤثّر في الخلايا نفسها، ثم تسلّما الأمرين المبوَّثين من المستخدم الآخر ونفّذاهما، فسينتهي بهما الحال في حالتين مختلفتين، كما يوضّح <a href="#fig.soc.conflict">الشكل 19.18</a>.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-collab-conflict.webp" alt="[تعارض بسبب حالة السباق]"></p>
<p>الشكل 19.18: تعارض بسبب حالة السباق</p>
<p>ويمكننا حلّ ذلك بآلية التراجع/الإعادة المدمجة في SocialCalc، كما يوضّح <a href="#fig.soc.resolve">الشكل 19.19</a>.</p>
<p><img src="/arabic-cs-library/images/aosabook/v1-socialcalc-collab-resolution.webp" alt="[حل تعارض حالة السباق]"></p>
<p>الشكل 19.19: حل تعارض حالة السباق</p>
<p>العملية المستخدمة لحل التعارض هي كما يلي. عندما يبثّ عميل أمرًا، يضيف هذا الأمر إلى قائمة انتظار (Pending queue). وعندما يستقبل عميل أمرًا، يقارن الأمر البعيد بقائمة الانتظار.</p>
<p>إذا كانت قائمة الانتظار فارغة، فالأمر يُنفَّذ ببساطة بوصفه إجراءً بعيدًا. وإذا طابق الأمر البعيد أمرًا في قائمة الانتظار، فحُذف الأمر المحلي من القائمة.</p>
<p>وإلا، يفحص العميل ما إذا كانت هناك أوامر في الطابور تتعارض مع الأمر المستلم. وإذا وُجدت أوامر متعارضة، يقوم العميل أولًا بتنفيذ <code>Undo</code> لتلك الأوامر ويضع علامات عليها لتنفيذ <code>Redo</code> لاحقًا. وبعد التراجع عن الأوامر المتعارضة (إن وُجدت)، يُنفَّذ الأمر البعيد كالمعتاد.</p>
<p>وعندما يستقبل العميل من الخادم أمرًا موسومًا لإعادة تنفيذه، فسيعيد تنفيذه ثم يحذفه من القائمة.</p>
<h3 id="1973-المؤشرات-البعيدة">19.7.3. المؤشّرات البعيدة</h3>
<p>وحتى مع معالجة حالات السباق، فإن الكتابة فوق خلية يحرّرها مستخدم آخر حاليًا عن طريق الخطأ تبقى أمرًا غير مثالي. والتحسين البسيط هو أن يبثّ كل عميل موضع مؤشّره إلى بقية المستخدمين، بحيث يرى الجميع الخلايا التي يجري العمل عليها.</p>
<p>ولتنفيذ هذه الفكرة، نضيف معالج <code>broadcast</code> آخر إلى الحدث <code>MoveECellCallback</code>:</p>
<pre><code class="language-javascript">editor.<span class="hljs-property">MoveECellCallback</span>.<span class="hljs-property">broadcast</span> = <span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) {
    hpipe.<span class="hljs-title function_">send</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ecell&#x27;</span>,
        <span class="hljs-attr">data</span>: e.<span class="hljs-property">ecell</span>.<span class="hljs-property">coord</span>
    });
};

$(hpipe).<span class="hljs-title function_">bind</span>(<span class="hljs-string">&quot;message.ecell&quot;</span>, <span class="hljs-keyword">function</span> (<span class="hljs-params">e, d</span>) {
    <span class="hljs-keyword">var</span> cr = <span class="hljs-title class_">SocialCalc</span>.<span class="hljs-title function_">coordToCr</span>(d.<span class="hljs-property">data</span>);
    <span class="hljs-keyword">var</span> cell = <span class="hljs-title class_">SocialCalc</span>.<span class="hljs-title class_">GetEditorCellElement</span>(editor, cr.<span class="hljs-property">row</span>, cr.<span class="hljs-property">col</span>);
    <span class="hljs-comment">// &amp;hellip;decorate cell with styles specific to the remote user(s) on it&amp;hellip;</span>
});
</code></pre>
<p>ولتمييز الخلية النشطة في جداول البيانات، من الشائع استخدام حدود ملوّنة. غير أن الخلية قد تكون معرِّفة لنفسها الخاصية <code>border</code>، ولأن <code>border</code> أحادي اللون، فإنه لا يمكنه أن يمثّل سوى مؤشّر واحد على الخلية نفسها.</p>
<p>لذلك، في المتصفحات التي تدعم CSS3، نستخدم الخاصية <code>box-shadow</code> لتمثيل عدة مؤشّرات للأقران في الخلية نفسها:</p>
<pre><code>/* Two cursors on the same cell */
box-shadow: inset 0 0 0 4px red, inset 0 0 0 2px green;
</code></pre>
<p>يوضّح <a href="#fig.soc.borders">الشكل 19.20</a> كيف ستبدو الشاشة مع أربعة أشخاص يحرّرون جدول البيانات نفسه. <img src="/arabic-cs-library/images/aosabook/v1-socialcalc-collab-borders.webp" alt="[أربعة مستخدمون يحرّرون جدول بيانات واحد]"></p>
<p>الشكل 19.20: أربعة مستخدمون يحرّرون جدول بيانات واحد</p>
<h2 id="198-الدروس-المستفادة">19.8. الدروس المستفادة</h2>
<p>سلّمنا SocialCalc 1.0 في 19 أكتوبر 2009، وهي الذكرى الثلاثون للإصدار الأول من VisiCalc. وكانت خبرتي في التعاون مع زملائي في Socialtext تحت إشراف Dan Bricklin بالغة الأهمية بالنسبة لي، وأودّ أن أشارك بعض الدروس التي تعلّمتها خلال تلك الفترة.</p>
<h3 id="1981-مصمم-رئيسي-برؤية-واضحة">19.8.1. مصمّم رئيسي برؤية واضحة</h3>
<p>في [<a href="https://aosabook.org/en/v1/bib1.html#bib:brooks:design">Bro10</a>]، يقرّر Fred Brooks أن بناء الأنظمة المعقّدة يصبح فيه الحوار أكثر مباشرة بكثير إن ركّزنا على <em>مفهوم تصميم</em> متّسق (coherent design concept) بدلًا من التمثيلات المشتقّة. ووفقًا لما يراه Brooks، فإن صياغة مثل هذا المفهوم المتّسق من التصميم يكون من الأفضل الاحتفاظ بها في ذهن شخص واحد:</p>
<blockquote>
<blockquote>
<p>ولأن السلامة المفاهيمية هي أهمّ سمة من سمات التصميم العظيم، ولأنها تنبع من عقل واحد أو بضعة عقول تعمل <em>uno animo</em>، فإن المدير الحكيم يسلّم كل مهمة تصميم، بثقة وجسارة، إلى مصمّم رئيسي موهوب.</p>
</blockquote>
</blockquote>
<p>وفي حالة SocialCalc، كان وجود Tracy Ruggles بوصفها مصمّمة تجربة المستخدم الرئيسية (chief user-experience designer) هو المفتاح الذي جعل المشروع ينبثق نحو رؤية مشتركة. ولأن محرّك SocialCalc الكامِن كان شديد المرونة، كان إغراء تمدّد الميزات (feature creep) واقعًا تمامًا. وقد ساعدت قدرة Tracy على التواصل بواسطة الرسوم التخطيطية للتصميم (design sketches) كثيرًا في تقديم الميزات على نحو يبدو بديهيًا للمستخدمين.</p>
<h3 id="1982-الويكات-من-أجل-استمرارية-المشروع">19.8.2. الويكات من أجل استمرارية المشروع</h3>
<p>قبل أن أنضم إلى مشروع SocialCalc، كان قد مضى على التصميم والتطوير المستمر أكثر من عامين، ومع ذلك تمكّنت من اللحاق بالركب والبدء في المشاركة في أقل من أسبوع، لمجرد أن <em>كل شيء موجود في الويكي</em>. فمن أقدم ملاحظات التصميم إلى أحدث مصفوفة دعم للمتصفحات، وُثِّقت العملية برمتها في صفحات الويك وجداول بيانات SocialCalc.</p>
<p>وقد أوصلني تصفّح مساحة عمل المشروع سريعًا إلى الصفحة نفسها التي وصل إليها غيري، من دون ذلك العبء المعتاد من الإرشاد اليدوي المرتبط عادةً بتأهيل عضو جديد في الفريق.</p>
<p>ولن يكون هذا ممكنًا في مشاريع البرمجيات مفتوحة المصدر التقليدية، حيث يجري معظم الحوار عبر IRC وقوائم البريد الإلكتروني، ولا يُستخدم الويكي (إن وُجد) إلا للتوثيق ولمصادر التطوير. فبالنسبة للواصل حديثًا، فإن إعادة بناء السياق من سجلات IRC غير المهيكلة وأرشيفات البريد أصعب بكثير.</p>
<h3 id="1983-تبن-فروق-المناطق-الزمنية">19.8.3. تبنَّ فروق المناطق الزمنية</h3>
<p>علّق David Heinemeier Hansson، مطوّر Ruby on Rails، ذات مرة على فائدة الفرق الموزّعة عندما انضم إلى 37signals لأول مرة، قائلًا: «المناطق الزمنية السبع بين كوبنهاغن وشيكاغو كانت في الواقع تعني أننا أنجزنا الكثير مع قلّة المقاطعات.» ومع وجود تسع مناطق زمنية بين تايبيه وبالو ألتو، كان ذلك صحيحًا بالنسبة إلينا أيضًا أثناء تطوير SocialCalc.</p>
<p>وكنّا غالبًا ما نُكمل دورة تغذية راجعة كاملة من التصميم والتطوير وضمان الجودة خلال يوم مدته 24 ساعة، إذ يستغرق كل جانب يوم عمل مدته 8 ساعات لأحد الأشخاص في نهاره المحلي. وقد ألزم هذا الأسلوب غير المتزامن للتعاون بأن نُنتج مُخرَجات وصفية لنفسها (رسوم التصميم، والشيفرة، والاختبارات)، وهو ما حسّن في المقابل ثقتنا ببعضنا بعضًا كثيرًا.</p>
<h3 id="1984-التحسين-من-أجل-المتعة">19.8.4. التحسين من أجل المتعة</h3>
<p>في المحاضرة الافتتاحية (keynote) التي ألقيتها عام 2006 في مؤتمر CONISLI ([<a href="https://aosabook.org/en/v1/bib1.html#bib:tang:fun">Tan06</a>])، لخّصت تجربتي في قيادة فريق موزّع نفّذ لغة Perl 6 في بضع ملاحظات. ومن بينها، هناك عبارات ذات صلة خاصة بالفرق الموزّعة الصغيرة: <em>احرص دائمًا على خارطة طريق</em> (Always have a Roadmap)، و <em>الغفران أفضل من الإذن</em> (Forgiveness &gt; Permission)، و <em>أزل الجمود</em> (Remove deadlocks)، و <em>اطرح الأفكار ولا تطلب الإجماع</em> (Seek ideas, not consensus)، و <em>ارسُم الأفكار بالشيفرة</em> (Sketch ideas with code).</p>
<p>وعند تطوير SocialCalc، أخذنا بالكفاية في توزيع المعرفة بين أعضاء الفريق عبر ملكية تعاونية للشيفرة (collaborative code ownership)، حتى لا يصبح أحدهم اختناقًا حرجًا.</p>
<p>فضلًا عن ذلك، كنّا نُسوّي الخلافات استباقيًا عبر كتابة بدائل فعلية لاستكشاف فضاء التصميم، ولم نخشَ استبدال النماذج الأولية العاملة تمامًا حين يصل تصميم أفضل.</p>
<p>وقد ساعدتنا هذه السمات الثقافية على زرع شعور بالتوقّع والؤلفة على رغم غياب التفاعل المباشر، وأبقينا الأمور السياسية في أدنى حد، وجعلت العمل على SocialCalc متعة كبيرة.</p>
<h3 id="1985-قيادة-التطوير-باختبارات-القصص">19.8.5. قيادة التطوير باختبارات القصص</h3>
<p>قبل انضمامي إلى Socialtext، كنت قد دعتُ إلى نهج «مزج الاختبارات مع المواصفة» (interleave tests with the specification)، كما يتّضح في مواصفة لغة Perl 6<a href="#footnote-7">7</a>، حيث نُنشِئ مواصفة اللغة مرفقةً بمجموعة الاختبارات الرسمية. غير أن Ken Pier و Matt Heusser، وهما فريق ضمان الجودة في SocialCalc، هما اللذان فتحا لي عينيّ حقًا على كيف يمكن الارتقاء بهذا المنهج إلى المستوى التالي، بنقل الاختبارات إلى موضع <em>المواصفة القابلة للتنفيذ</em> (executable specification).</p>
<p>وفي الفصل 16 من [<a href="https://aosabook.org/en/v1/bib1.html#bib:goucher:test">GR09</a>]، شرح Matt عملية تطويرنا المبنية على اختبارات القصص (story tests) على النحو التالي:</p>
<blockquote>
<blockquote>
<p>الوحدة الأساسية للعمل هي «قصة»، وهي مستند متطلبات شديد الخفة. وتتضمّن القصة وصفًا موجزًا لميزة، إلى جانب أمثلة لما ينبغي أن يحدث حتى تُعدّ القصة مكتملة؛ ونسمي هذه الأمثلة «اختبارات القبول» (acceptance tests) ونصفها بالإنجليزية المبسّطة.
وعند القصّ الأول للقصة، يقوم مالك المنتج بمحاولة أولى بحسن نية لإنشاء اختبارات القبول، ثم يزيد عليها المطوّرون والمختبِرون قبل أن يكتب أي مطوّر سطرًا واحدًا من الشيفرة.</p>
</blockquote>
</blockquote>
<p>ثم تُترجَم اختبارات القصص هذه إلى wikitests، وهي لغة مواصفة قائمة على الجداول مستوحاة من إطار FIT لـ Ward Cunningham<a href="#footnote-8">8</a>، تقود أطر الاختبارات الآلية مثل <code>Test::WWW::Mechanize</code><a href="#footnote-9">9</a> و <code>Test::WWW::Selenium</code><a href="#footnote-10">10</a>.</p>
<p>ومن الصعب المبالغة في تقدير فائدة وجود اختبارات القصص بوصفها لغة مشتركة للتعبير عن المتطلبات والتحقق منها. فقد كان لها دور محوري في الحدّ من سوء الفهم، وقد أدّت إلى اختفاء الانحدارات (regressions) من إصداراتنا الشهرية عمليًا.</p>
<h3 id="1986-البرمجيات-مفتوحة-المصدر-مع-cpal">19.8.6. البرمجيات مفتوحة المصدر مع CPAL</h3>
<p>وأخيرًا وليس آخرًا، فإن نموذج البرمجيات مفتوحة المصدر الذي اخترناه لـ SocialCalc يشكّل بحدّ ذاته درسًا مثيرًا للاهتمام.</p>
<p>أنشأت Socialtext رخصة الإسناد العام (Common Public Attribution License)<a href="#footnote-11">11</a> من أجل SocialCalc. واستنادًا إلى رخصة Mozilla العامة (Mozilla Public License)، صُمِّمت CPAL لتتيح للمؤلف الأصلي أن يشترط إظهار إسناد في واجهة مستخدم البرمجية، كما تحتوي بندًا للاستخدام عبر الشبكة يُفعّل أحكام المشاركة بالمثل (share-alike) عندما يُستضاف العمل المشتق في خدمة عبر الشبكة.</p>
<p>وبعد موافقتها من قِبل كلٍّ من مؤسسة البرمجيات مفتوحة المصدر (Open Source Initiative)<a href="#footnote-12">12</a> ومؤسسة البرمجيات الحرة (Free Software Foundation)<a href="#footnote-13">13</a>، رأينا مواقع بارزة مثل Facebook<a href="#footnote-14">14</a> و Reddit<a href="#footnote-15">15</a> تختار إصدار شيفرة منصّتها المصدرية بموجب CPAL، وهو ما يُبشّر كثيرًا.</p>
<p>ولأن CPAL رخصة «نسخ مفتوح ضعيف» (weak copyleft)، فيمكن للمطوّرين دمجها بحرّية مع برمجيات حرة أو مملوكة، ولا يحتاجون سوى إلى إصدار التعديلات على SocialCalc نفسه. وقد مكّن ذلك مختلف المجتمعات من تبنّي SocialCalc وجعله أكثر روعة.</p>
<p>وهناك إمكانيات كثيرة ومثيرة مع هذا المحرّك مفتوح المصدر لجداول البيانات، وإذا استطعت إيجاد طريقة لتضمين SocialCalc في مشروعك المفضّل، فسنكون بالتأكيد سعداء بسماعك.</p>
<h2 id="الحواشي">الحواشي</h2>
<ol>
<li><code>https://github.com/audreyt/wikiwyg-js</code></li>
<li><code>http://one.laptop.org/</code></li>
<li><code>http://seeta.in/wiki/index.php?title=Collaboration_in_SocialCalc</code></li>
<li><code>http://search.cpan.org/dist/Web-Hippie/</code></li>
<li><code>http://about.digg.com/blog/duistream-and-mxhr</code></li>
<li><code>https://github.com/gimite/web-socket-js</code></li>
<li><code>http://perlcabal.org/syn/S02.html</code></li>
<li><code>http://fit.c2.com/</code></li>
<li><code>http://search.cpan.org/dist/Test-WWW-Mechanize/</code></li>
<li><code>http://search.cpan.org/dist/Test-WWW-Selenium/</code></li>
<li><code>https://www.socialtext.net/open/?cpal</code></li>
<li><code>http://opensource.org/</code></li>
<li><code>http://www.fsf.org</code></li>
<li><code>https://github.com/facebook/platform</code></li>
<li><code>https://github.com/reddit/reddit</code></li>
</ol>
`,t={book:e,chapter:a,chapterTitle:c,slug:o,title:l,headings:n,html:s};export{e as book,a as chapter,c as chapterTitle,t as default,n as headings,s as html,o as slug,l as title};
