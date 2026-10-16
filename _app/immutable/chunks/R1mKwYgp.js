const p="mooc",n="part-13",a="الجزء 13: الألعاب مع Pygame",e="1-pygame",s="مكتبة pygame",o=[{depth:2,id:"تثبيت-pygame",text:"تثبيت pygame"},{depth:3,id:"لينكس",text:"لينكس"},{depth:3,id:"ويندوز",text:"ويندوز"},{depth:3,id:"ماك",text:"ماك"},{depth:2,id:"برنامجك-الأول",text:"برنامجك الأول"},{depth:2,id:"إضافة-صورة",text:"إضافة صورة"}],c=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>تكون قد ثبّتَت مكتبة pygame على حاسوبك</li>
<li>ستعرف كيفية إنشاء نافذة pygame وكيفية الخروج من البرنامج</li>
<li>ستتمكّن من استخدام صورة محفوظة في ملف داخل نافذة pygame</li>
</ul>
</blockquote>
<p>في هذين القسمين الأخيرين من مادة المقرر سنتقن مكتبة pygame. إنها مكتبة (library) بايثون مخصّصة لبرمجة الألعاب، وتساعدك على إنشاء العناصر الرسومية، وعلى التعامل مع الأحداث (events) القادمة من لوحة المفاتيح والفأرة، وعلى تنفيذ مواصفات أخرى يلزم توفرها في الألعاب.</p>
<h2 id="تثبيت-pygame">تثبيت pygame</h2>
<h3 id="لينكس">لينكس</h3>
<p>افتح سطر الأوامر، واكتب <code>pip3 install pygame</code> ثم اضغط <code>enter</code>.</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_linux.png" alt="pygame_linux.png"></p>
<p>ينبغي أن يُثبِّت هذا المكتبة على حاسوبك.</p>
<h3 id="ويندوز">ويندوز</h3>
<p>افتح طرفية ويندوز عن طريق القائمة، واكتب <code>cmd</code> ثم اضغط <code>enter</code>:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/13_1_1.png" alt="13_1_1.png"></p>
<p>ينبغي أن تُفتح نافذة مفسّر سطر الأوامر. اكتب <code>pip3 install pygame</code> ثم اضغط <code>enter</code>.</p>
<p>ينبغي أن يُثبِّت هذا المكتبة على حاسوبك.</p>
<p>قد يتطلّب التثبيت صلاحيات مسؤول النظام. فإذا لم ينجح ما سبق، يمكنك محاولة تشغيل تطبيق الطرفية كمسؤول: افتح قائمة ويندوز، وابحث عن تطبيق CMD، وانقر عليه بزر الفأرة الأيمن ثم اختر «Run as administrator».</p>
<p>يتطلّب تثبيت pygame والوصول إليها أن يكون تثبيت Python مضبوطًا في متغيّر المسار (path) وفق التعليمات <a href="https://www.mooc.fi/en/installation/vscode/#python3">هنا</a>.</p>
<h3 id="ماك">ماك</h3>
<p>افتح <em>Terminal</em>، فمثلًا عبر رمز العدسة المكبّرة في الزاوية العليا اليمنى:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/13-1-2.png" alt="13-1-2.png"></p>
<p>ينبغي أن تُفتح أداة البحث. اكتب <code>terminal</code> ثم اضغط <code>enter</code>:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/13-1-3.png" alt="13-1-3.png"></p>
<p>اكتب ما يلي ثم اضغط <code>enter</code>:</p>
<p><code>pip3 install pygame</code></p>
<p><img src="/arabic-cs-library/images/mooc/part-13/13-1-4.png" alt="13-1-4.png"></p>
<p>ينبغي أن يُثبِّت هذا المكتبة على حاسوبك.</p>
<h2 id="برنامجك-الأول">برنامجك الأول</h2>
<p>إليك برنامج بسيط للتحقّق من أن تثبيت pygame يعمل بصورة صحيحة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

window.fill((<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>))
pygame.display.flip()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>عند تشغيل هذا البرنامج ينبغي أن يعرض نافذة:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_first.gif" alt="pygame_first.gif"></p>
<p>لا يتكوّن البرنامج إلا من عرض نافذة، وهو يعمل حتى يُغلق المستخدم النافذة.</p>
<p>لنتأمّل الخطوات اللازمة لتحقيق ذلك عن قرب. يُدخل السطر الأول مكتبة pygame إلى الاستخدام: <code>import pygame</code>. ثم يُهيّئ الأمر التالي <code>pygame.init</code> وحدات pygame، ويُنشئ الأمر الذي يليها نافذةً عبر الدالة <code>pygame.display.set_mode</code>.</p>
<pre><code class="language-python">pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))
</code></pre>
<p>تأخذ الدالة <code>set_mode</code> أبعاد النافذة وسيطًا (argument). تشير الصف (tuple) <code>(640, 480)</code> إلى أن النافذة عرضها 640 بكسل وارتفاعها 480 بكسل. ويمكن استخدام اسم المتغيّر <code>window</code> لاحقًا للوصول إلى النافذة، فمثلًا لرسم شيء فيها.</p>
<p>يفعل الأمران التاليان شيئًا مماثلًا:</p>
<pre><code class="language-python">window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
pygame.display.flip()
</code></pre>
<p>تملأ الطريقة <code>fill</code> النافذة باللون الممرور إليها كوسط. وفي هذه الحالة يكون اللون أسود، ممرورًا كقيمة RGB في الصف <code>(0, 0, 0)</code>. ويُحدّث <code>pygame.display.flip</code> محتوى النافذة.</p>
<p>بعد أوامر التهيئة هذه يبدأ <em>الحلقة الرئيسية</em> للبرنامج:</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>تتعامل الحلقة الرئيسية مع كل الأحداث التي يمرّرها نظام التشغيل إلى البرنامج. ومع كل تكرار (iteration) تُعيد الدالة <code>pygame.event.get</code> قائمة بالأحداث المُجمَّعة منذ التكرار السابق، إن وُجدت.</p>
<p>في المثال أعلاه يعالج البرنامج أحداث نوع <code>pygame.QUIT</code> فقط. يُرفَع هذا الحدث مثلًا عند النقر على زر الإغلاق في زاوية النافذة. وإذا رُفع حدث <code>pygame.QUIT</code> يخرج البرنامج عبر الدالة <code>exit</code>.</p>
<p>يمكنك أن تجرّب وترى ما يحدث إذا لم يعالج برنامجك حدث <code>pygame.QUIT</code>. ينبغي أن يؤدي ذلك إلى أن النقر على زر الإغلاق لا يفعل شيئًا، وهو ما قد يربك المستخدم. وبما أن البرنامج يُشغَّل من سطر الأوامر، فلا تزال قادرًا على إيقافه من سطر الأوامر باستخدام Control+C.</p>
<h2 id="إضافة-صورة">إضافة صورة</h2>
<p>لنضف صورةً إلى النافذة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)

window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
window.blit(robot, (<span class="hljs-number">100</span>, <span class="hljs-number">50</span>))
pygame.display.flip()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>يستخدم البرنامج صورة هذا الروبوت، المحفوظة في الملف <code>robot.png</code>:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/robot.png" alt="robot.png"></p>
<p>يجب أن يكون الملف <code>robot.png</code> في الدليل نفسه الذي يقع فيه شيفرة برنامجك المصدرية، وإلا لن يتمكّن البرنامج من العثور عليه. وفي قوالب تمارين هذا القسم تنتظر الصور داخل دليل التمرين.</p>
<p>ينبغي أن تبدو النافذة الآن بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_pic.gif" alt="pygame_pic.gif"></p>
<p>تحمّل الدالة <code>pygame.image.load</code> الصورة في الملف <code>robot.png</code> وتخزّن إحالةً إليها في المتغيّر المسمّى <code>robot</code>. وترسم الطريقة <code>blit</code> الصورة في الموقع <code>(100, 50)</code>، وتحدّث الدالة <code>pygame.display.flip</code> محتوى النافذة كما في السابق. يعني الموقع <code>(100, 50)</code> أن <em>الزاوية العليا اليسرى</em> للصورة تقع في هذا الموقع داخل النافذة.</p>
<p>في pygame يقع نقطة الأصل <code>(0, 0)</code> في الزاوية العليا اليمنى للنافذة. تزداد إحداثيات x إلى اليمين، وتزداد إحداثيات y إلى الأسفل، بحيث يكون للزاوية العليا اليسرى للنافذة الإحداثيان <code>(640, 480)</code>. وهذا خلاف لما اعتُاد عليه في تعامل الرياضيات مثلًا مع الإحداثيات، لكنه شائع جدًا في سياق البرمجة، ويستحقّ أن تعتاد عليه.</p>
<p>بمجرّد تحميلك صورةً يمكنك استخدامها مرّات عديدة داخل النافذة نفسها. ترسم الشيفرة التالية صورة الروبوت في ثلاثة مواقع مختلفة:</p>
<pre><code class="language-python">window.blit(robot, (<span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
window.blit(robot, (<span class="hljs-number">300</span>, <span class="hljs-number">0</span>))
window.blit(robot, (<span class="hljs-number">100</span>, <span class="hljs-number">200</span>))
</code></pre>
<p>ينبغي أن تبدو النافذة بهذا الشكل نتيجةً لذلك:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_pic2.gif" alt="pygame_pic2.gif"></p>
<p>هنا نضبط موقع الصورة بحيث تقع في وسط النافذة:</p>
<pre><code class="language-python">width = robot.get_width()
height = robot.get_height()
window.blit(robot, (<span class="hljs-number">320</span>-width/<span class="hljs-number">2</span>, <span class="hljs-number">240</span>-height/<span class="hljs-number">2</span>))
</code></pre>
<p>ينبغي أن تبدو النافذة الآن بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_pic3.gif" alt="pygame_pic3.gif"></p>
<p>تُعيد الطريقة <code>get_width</code> عرض الصورة، وتُعيد الطريقة <code>get_height</code> ارتفاعها، وكلاهما بالبكسل. يقع وسط النافذة عند نصف عرضها وارتفاعها، أي عند <code>(320, 240)</code>، ويمكننا استخدام ذلك لحساب موقع مناسب للزاوية العليا اليسرى للصورة بحيث تقع تمامًا في المنتصف.</p>
<blockquote>
<p><strong>تمارين pygame</strong></p>
<p>لا تختبر تمارين هذا القسم من المقرر اختبارات آلية، إذ تُتحقَّق نتائجها بصريًا. تمنح الاختبارات النقاط تلقائيًا عند تقديم حلّك إلى الخادم، مهما كانت طريقة تنفيذك. لا تقدّم حلّك إلا عندما تكون جاهزًا وأن يكون مطابقًا لوصف التمرين. ورغم أن التمارين قد تفتقر إلى الاختبارات الآلية، فإن فريق المقرر يرى حلّك على أي حال. كذلك يمنح تقديم حلّ ناقص إلى TMC Paste نقاطًا تلقائيًا، ولذلك لا ينبغي استخدامه عند طلب المساعدة حول تمارين هذا القسم. يمكنك استخدام <a href="https://pastebin.com/">Pastebin.com</a> أو أي خدمة لصق (pastebin) أخرى على الإنترنت عند طلب المساعدة في قنوات دعم المقرر.</p>
<p>إذا لم يكن حلّك مطابقًا لوصف التمرين بوضوح، فقد تخسر النقاط الممنوحة لتمارين هذا القسم.</p>
</blockquote>
<blockquote>
<p><strong>تمرين برمجي: أربعة روبوتات</strong></p>
<p>اكتب برنامجًا يرسم روبوتًا في كل زوايا النافذة الأربع. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_four.gif" alt="pygame_four.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: روبوتات في صف</strong></p>
<p>اكتب برنامجًا يرسم عشرة روبوتات في صفّ واحد. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_row.gif" alt="pygame_row.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: مئة روبوت</strong></p>
<p>اكتب برنامجًا يرسم مئة روبوت: عشرة صفوف في كل صفّ منها عشرة روبوتات. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_hundred.gif" alt="pygame_hundred.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: روبوتات عشوائية</strong></p>
<p>اكتب برنامجًا يرسم <em>ألف</em> روبوت في مواقع عشوائية. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_thousand.gif" alt="pygame_thousand.gif"></p>
`,l={book:p,chapter:n,chapterTitle:a,slug:e,title:s,headings:o,html:c};export{p as book,n as chapter,a as chapterTitle,l as default,o as headings,c as html,e as slug,s as title};
