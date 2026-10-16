const s="mooc",a="part-14",n="الجزء 14: مشروع اللعبة",l="1-game-project",p="مشروع اللعبة",e=[{depth:2,id:"خريطة-اللعبة",text:"خريطة اللعبة"},{depth:2,id:"المنشئ",text:"المُنشِئ"},{depth:2,id:"تحميل-الصور",text:"تحميل الصور"},{depth:3,id:"مربع-الأرضية",text:"مربّع الأرضية"},{depth:3,id:"مربع-الجدار",text:"مربّع الجدار"},{depth:3,id:"مربع-الهدف",text:"مربّع الهدف"},{depth:3,id:"صندوق",text:"صندوق"},{depth:3,id:"روبوت",text:"روبوت"},{depth:3,id:"صندوق-فوق-مربع-هدف",text:"صندوق فوق مربّع هدف"},{depth:3,id:"روبوت-فوق-مربع-هدف",text:"روبوت فوق مربّع هدف"},{depth:2,id:"إنشاء-الشبكة",text:"إنشاء الشبكة"},{depth:2,id:"الحلقة-الرئيسية",text:"الحلقة الرئيسية"}],c=`<p>في هذا الجزء سنستخدم pygame لإنشاء لعبة أكبر نسبيًا. وهي تنويعة من لعبة سوكوبان (Sokoban) الكلاسيكية، يحرّك فيها اللاعب روبوتًا على شبكة ويَدفع الصناديق إلى مواضعها الصحيحة بأقل عدد ممكن من الحركات.</p>
<p>سيبدو النتيجة النهائية هكذا:</p>
<p><img src="/arabic-cs-library/images/mooc/part-14/game.png" alt="game.png"></p>
<h2 id="خريطة-اللعبة">خريطة اللعبة</h2>
<p>لنبدأ برسم الخريطة المستخدمة في اللعبة. تُنفَّذ اللعبة في الصنف <code>Sokoban</code>، والذي يجمع كل الوظائف اللازمة للعب. وفي هذه المرحلة الأولى تكون محتويات الصنف كما يلي:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Sokoban</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        pygame.init()
        
        <span class="hljs-variable language_">self</span>.load_images()
        <span class="hljs-variable language_">self</span>.new_game()
        
        <span class="hljs-variable language_">self</span>.height = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span>)
        <span class="hljs-variable language_">self</span>.width = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span>[<span class="hljs-number">0</span>])
        <span class="hljs-variable language_">self</span>.scale = <span class="hljs-variable language_">self</span>.images[<span class="hljs-number">0</span>].get_width()

        window_height = <span class="hljs-variable language_">self</span>.scale * <span class="hljs-variable language_">self</span>.height
        window_width = <span class="hljs-variable language_">self</span>.scale * <span class="hljs-variable language_">self</span>.width
        <span class="hljs-variable language_">self</span>.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption(<span class="hljs-string">&quot;Sokoban&quot;</span>)

        <span class="hljs-variable language_">self</span>.main_loop()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">load_images</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.images = []
        <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;floor&quot;</span>, <span class="hljs-string">&quot;wall&quot;</span>, <span class="hljs-string">&quot;target&quot;</span>, <span class="hljs-string">&quot;box&quot;</span>, <span class="hljs-string">&quot;robot&quot;</span>, <span class="hljs-string">&quot;done&quot;</span>, <span class="hljs-string">&quot;target_robot&quot;</span>]:
            <span class="hljs-variable language_">self</span>.images.append(pygame.image.load(name + <span class="hljs-string">&quot;.png&quot;</span>))

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">new_game</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span> = [[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>]]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">main_loop</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            <span class="hljs-variable language_">self</span>.check_events()
            <span class="hljs-variable language_">self</span>.draw_window()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">check_events</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
            <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
                exit()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">draw_window</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))

        <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.height):
            <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.width):
                square = <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span>[y][x]
                <span class="hljs-variable language_">self</span>.window.blit(<span class="hljs-variable language_">self</span>.images[square], (x * <span class="hljs-variable language_">self</span>.scale, y * <span class="hljs-variable language_">self</span>.scale))

        pygame.display.flip()

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    Sokoban()
</code></pre>
<p>ينبغي لتشغيل البرنامج أن يعرض نافذة تحمل الحالة الأولية للعبة. لننظر عن قرب إلى الشيفرة التي تُحقّق ذلك.</p>
<h2 id="المنشئ">المُنشِئ</h2>
<p>يُهيّئ مُنشِئ (constructor) الصنف وحدود pygame والمتغيرات وبنى البيانات الأساسية المعنية بالعبة. كما يستدعي طريقة الحلقة الرئيسية للعبة.</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        pygame.init()
        
        <span class="hljs-variable language_">self</span>.load_images()
        <span class="hljs-variable language_">self</span>.new_game()
        
        <span class="hljs-variable language_">self</span>.height = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span>)
        <span class="hljs-variable language_">self</span>.width = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span>[<span class="hljs-number">0</span>])
        <span class="hljs-variable language_">self</span>.scale = <span class="hljs-variable language_">self</span>.images[<span class="hljs-number">0</span>].get_width()

        window_height = <span class="hljs-variable language_">self</span>.scale * <span class="hljs-variable language_">self</span>.height
        window_width = <span class="hljs-variable language_">self</span>.scale * <span class="hljs-variable language_">self</span>.width
        <span class="hljs-variable language_">self</span>.window = pygame.display.set_mode((window_width, window_height))

        pygame.display.set_caption(<span class="hljs-string">&quot;Sokoban&quot;</span>)

        <span class="hljs-variable language_">self</span>.main_loop()
</code></pre>
<p>تحمّل الطريقة <code>load_images</code> الصور المستخدمة في اللعبة إلى قائمة اسمها <code>images</code>. وتنشئ الطريقة <code>new_game</code> قائمة ثنائية الأبعاد اسمها <code>map</code>، التي تحمل حالة شبكة اللعبة في بدايتها.</p>
<p>يُهيَّأ المتغيّران <code>height</code> و<code>width</code> استنادًا إلى أبعاد شبكة اللعبة. وتحمل المتغيّر <code>scale</code> طول ضلع واحد من مربّعات الشبكة. ولأن كل صورة مربّع بنفس الحجم تمامًا، فإن حجم جميع المربّعات يغطّيه هذا المتغيّر وحده، ويكفي أن نستخدم عرض الصورة الأولى قيمًا له. ويمكن استخدام هذه القيمة نفسها لحساب عرض وارتفاع الشبكة كاملة، وهذا يتيح لنا إنشاء نافذة بالحجم المناسب لعرض شبكة اللعبة.</p>
<h2 id="تحميل-الصور">تحميل الصور</h2>
<p>تحمّل الطريقة <code>load_images</code> كل الصور المستخدمة في اللعبة:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">load_images</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.images = []
        <span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;floor&quot;</span>, <span class="hljs-string">&quot;wall&quot;</span>, <span class="hljs-string">&quot;target&quot;</span>, <span class="hljs-string">&quot;box&quot;</span>, <span class="hljs-string">&quot;robot&quot;</span>, <span class="hljs-string">&quot;done&quot;</span>, <span class="hljs-string">&quot;target_robot&quot;</span>]:
            <span class="hljs-variable language_">self</span>.images.append(pygame.image.load(name + <span class="hljs-string">&quot;.png&quot;</span>))
</code></pre>
<p>تستخدم اللعبة الصور التالية:</p>
<h3 id="مربع-الأرضية">مربّع الأرضية</h3>
<p><img src="/arabic-cs-library/images/mooc/part-14/floor.png" alt="floor.png"></p>
<ul>
<li>اسم الملف: <code>floor.png</code></li>
<li>الموضع في القائمة: 0</li>
</ul>
<h3 id="مربع-الجدار">مربّع الجدار</h3>
<p><img src="/arabic-cs-library/images/mooc/part-14/wall.png" alt="wall.png"></p>
<ul>
<li>اسم الملف: <code>wall.png</code></li>
<li>الموضع في القائمة: 1</li>
</ul>
<h3 id="مربع-الهدف">مربّع الهدف</h3>
<p><img src="/arabic-cs-library/images/mooc/part-14/target.png" alt="target.png"></p>
<ul>
<li>اسم الملف: <code>target.png</code></li>
<li>الموضع في القائمة: 2</li>
<li>ينبغي للروبوت أن يُحرّك أحد الصناديق إلى هذا المربّع</li>
</ul>
<h3 id="صندوق">صندوق</h3>
<p><img src="/arabic-cs-library/images/mooc/part-14/box.png" alt="box.png"></p>
<ul>
<li>اسم الملف: <code>box.png</code></li>
<li>الموضع في القائمة: 3</li>
</ul>
<h3 id="روبوت">روبوت</h3>
<p><img src="/arabic-cs-library/images/mooc/part-14/robot.png" alt="robot.png"></p>
<ul>
<li>اسم الملف: <code>robot.png</code></li>
<li>الموضع في القائمة: 4</li>
</ul>
<h3 id="صندوق-فوق-مربع-هدف">صندوق فوق مربّع هدف</h3>
<p><img src="/arabic-cs-library/images/mooc/part-14/done.png" alt="done.png"></p>
<ul>
<li>اسم الملف: <code>done.png</code></li>
<li>الموضع في القائمة: 5</li>
<li>نُقل الصندوق إلى مربّع الهدف</li>
</ul>
<h3 id="روبوت-فوق-مربع-هدف">روبوت فوق مربّع هدف</h3>
<p><img src="/arabic-cs-library/images/mooc/part-14/target_robot.png" alt="target_robot.png"></p>
<ul>
<li>اسم الملف: <code>target_robot.png</code></li>
<li>الموضع في القائمة: 6</li>
<li>ويمكن للروبوت أن يكون أيضًا داخل مربّع هدف فارغ</li>
</ul>
<h2 id="إنشاء-الشبكة">إنشاء الشبكة</h2>
<p>تنشئ الطريقة <code>new_game</code> الحالة الأولية لشبكة اللعبة:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">new_game</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span> = [[<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>],
                    [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>]]
</code></pre>
<p>تنشئ الطريقة قائمة ثنائية الأبعاد اسمها <code>map</code> تستخدم المواقع المرقّمة للصور في <em>قائمتها</em> للدلالة على أي صورة تذهب إلى أي موضع. وبهذا تحتفظ اللعبة بسجلّ لحالة شبكة اللعبة في كل وقت.</p>
<p>ملاحظة: في البداية تحوي جميع مربّعات الشبكة عددًا بين 0 و4. أمّا العدَدان 5 و6 فلا يظهران في البداية، إذ لا يوجد صندوق أو روبوت داخل مربّع هدف في تلك المرحلة.</p>
<h2 id="الحلقة-الرئيسية">الحلقة الرئيسية</h2>
<p>الطريقة <code>main_loop</code> قصيرة نسبيًا. ففي كل دورة تستدعي طريقتين: تمرّ <code>check_events</code> على الأحداث التي جُمعت منذ الدورة السابقة، وتُحدِّث الطريقة <code>draw_window</code> محتويات النافذة.</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">main_loop</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            <span class="hljs-variable language_">self</span>.check_events()
            <span class="hljs-variable language_">self</span>.draw_window()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">check_events</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
            <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
                exit()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">draw_window</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))

        <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.height):
            <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.width):
                square = <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span>[y][x]
                <span class="hljs-variable language_">self</span>.window.blit(<span class="hljs-variable language_">self</span>.images[square], (x * <span class="hljs-variable language_">self</span>.scale, y * <span class="hljs-variable language_">self</span>.scale))

        pygame.display.flip()
</code></pre>
<p>في هذه المرحلة، الحدث الوحيد الذي تعامل فعليًا معه اللعبة هو إغلاق نافذتها، من زر الإغلاق مثلًا. ثم تخرج اللعبة باستدعاء الدالة <code>exit</code> في بايثون.</p>
<p>وفي كل مرة تُستدعى فيها الطريقة <code>draw_window</code>، تُمرَّ شبكة اللعبة كاملة، وتُرسم الصورة المقابلة لكل مربّع في الشبكة في الموقع الصحيح.</p>
<p>ملاحظة: تُستعمل إحداثيّات x وy بطريقتين مختلفتين داخل اللعبة. فعند التعامل مع فهرس قائمة ثنائية الأبعاد، يكون منطقيًا ذكر الإحداثي y أوّلًا، إذ يشير y إلى رقم الصفاحة بينما x إلى رقم العمود. أمّا عند استعمال طرق pygame فيُمرَّر x عادةً أولًا، وهو ما يحدث كثيرًا في الرسوميات وفي السياقات الرياضية أيضًا.</p>
`,h={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,h as default,e as headings,c as html,l as slug,p as title};
