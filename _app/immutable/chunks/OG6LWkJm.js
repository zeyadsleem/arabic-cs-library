const s="mooc",n="part-13",a="الجزء 13: الألعاب مع Pygame",e="3-events",p="الأحداث",l=[{depth:2,id:"معالجة-الأحداث",text:"معالجة الأحداث"},{depth:2,id:"أحداث-لوحة-المفاتيح",text:"أحداث لوحة المفاتيح"},{depth:2,id:"أحداث-الفأرة",text:"أحداث الفأرة"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستكون على دراية بأحداث pygame</li>
<li>ستتمكّن من كتابة برنامج يتفاعل مع ضغطات المفاتيح</li>
<li>ستتمكّن من كتابة برنامج يتفاعل مع أحداث الفأرة</li>
</ul>
</blockquote>
<p>حتى الآن لم تكن حلقاتنا الرئيسية تنفّذ سوى تحريكات محدّدة مسبقًا وتتفاعل فقط مع أحداث من نوع <code>pygame.QUIT</code>، رغم أن الحلقة تتلقّى قائمة بجميع الأحداث من نظام التشغيل. فلنتعرّف إذًا على أنواع أخرى من الأحداث.</p>
<h2 id="معالجة-الأحداث">معالجة الأحداث</h2>
<p>يطبع هذا البرنامج معلومات عن جميع الأحداث التي يمرّرها نظام التشغيل إلى برنامج pygame أثناء تشغيله:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-built_in">print</span>(event)
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>لنفترض أن البرنامج بقي يعمل فترة من الزمن، ثم نُقر على زرّ الخروج. يطبع البرنامج المعلومات التالية:</p>
<pre><code class="language-x">&lt;Event(4-MouseMotion {'pos': (495, 274), 'rel': (495, 274), 'buttons': (0, 0, 0), 'window': None})&gt;
&lt;Event(4-MouseMotion {'pos': (494, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})&gt;
&lt;Event(4-MouseMotion {'pos': (492, 274), 'rel': (-2, 0), 'buttons': (0, 0, 0), 'window': None})&gt;
&lt;Event(4-MouseMotion {'pos': (491, 274), 'rel': (-1, 0), 'buttons': (0, 0, 0), 'window': None})&gt;
&lt;Event(5-MouseButtonDown {'pos': (491, 274), 'button': 1, 'window': None})&gt;
&lt;Event(6-MouseButtonUp {'pos': (491, 274), 'button': 1, 'window': None})&gt;
&lt;Event(2-KeyDown {'unicode': 'a', 'key': 97, 'mod': 0, 'scancode': 38, 'window': None})&gt;
&lt;Event(3-KeyUp {'key': 97, 'mod': 0, 'scancode': 38, 'window': None})&gt;
&lt;Event(2-KeyDown {'unicode': 'b', 'key': 98, 'mod': 0, 'scancode': 56, 'window': None})&gt;
&lt;Event(3-KeyUp {'key': 98, 'mod': 0, 'scancode': 56, 'window': None})&gt;
&lt;Event(2-KeyDown {'unicode': 'c', 'key': 99, 'mod': 0, 'scancode': 54, 'window': None})&gt;
&lt;Event(3-KeyUp {'key': 99, 'mod': 0, 'scancode': 54, 'window': None})&gt;
&lt;Event(12-Quit {})&gt;
</code></pre>
<p>تتعلّق الأحداث القليلة الأولى باستخدام الفأرة، ثم تأتي بعض الأحداث من لوحة المفاتيح، وأخيرًا يُغلق الحدث الأخير البرنامج. ولكل حدث نوع على الأقل، لكنه قد يوفّر كذلك بعض المعلومات المميّزة الأخرى، مثل موقع مؤشّر الفأرة أو المفتاح الذي ضُغط.</p>
<p>يمكنك البحث عن أوصاف الأحداث في <a href="https://www.pygame.org/docs/ref/event.html">توثيق pygame</a>، لكن قد يكون أسهل أحيانًا طباعة الأحداث بالشيفرة أعلاه، والبحث عن الحدث الذي يقع عندما يحدث شيء تريد التفاعل معه.</p>
<h2 id="أحداث-لوحة-المفاتيح">أحداث لوحة المفاتيح</h2>
<p>يستطيع هذا البرنامج معالجة الأحداث التي يضغط فيها المستخدم مفتاح السهم إلى اليمين أو إلى اليسار على لوحة مفاتيحه. ويطبع البرنامج المفتاح الذي ضُغط.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.KEYDOWN:
            <span class="hljs-keyword">if</span> event.key == pygame.K_LEFT:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;left&quot;</span>)
            <span class="hljs-keyword">if</span> event.key == pygame.K_RIGHT:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;right&quot;</span>)

        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>يشير الثابتان <code>pygame.K_LEFT</code> و<code>pygame.K_RIGHT</code> إلى مفتاحَي السهم إلى اليسار وإلى اليمين. وثوابت المفاتيح في pygame الخاصة بمفاتيح لوحة المفاتيح المختلفة مدرجة في <a href="https://www.pygame.org/docs/ref/key.html#key-constants-label">توثيق pygame</a>.</p>
<p>فمثلًا، إذا ضغط المستخدم مفتاح السهم إلى اليمين مرّتين، ثم مفتاح اليسار مرّة واحدة، ثم مفتاح اليمين مرّة أخرى، يطبع البرنامج</p>
<pre><code class="language-x">right
right
left
right
</code></pre>
<p>لدينا الآن كل الأدوات اللازمة لتحريك شخصية، أو <em>كائن رسومي</em> (sprite)، على الشاشة إلى اليمين وإلى اليسار بمفتاحَي السهم. وتحقيق ذلك ممكن بالشيفرة التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)
x = <span class="hljs-number">0</span>
y = <span class="hljs-number">480</span>-robot.get_height()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.KEYDOWN:
            <span class="hljs-keyword">if</span> event.key == pygame.K_LEFT:
                x -= <span class="hljs-number">10</span>
            <span class="hljs-keyword">if</span> event.key == pygame.K_RIGHT:
                x += <span class="hljs-number">10</span>

        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()

    window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
    window.blit(robot, (x, y))
    pygame.display.flip()
</code></pre>
<p>وبحسب طريقة استخدامك لمفتاحَي السهم، قد يبدو تشغيل البرنامج بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_move_robot.gif" alt="pygame_move_robot.gif"></p>
<p>في الشيفرة أعلاه لدينا المتغيّران <code>x</code> و<code>y</code> اللذان يحتويان على الموقع الإحداثي للكائن الرسومي. وقد ضُبط المتغيّر <code>y</code> ليظهر الكائن الرسومي في أسفل النافذة. ولا تتغيّر قيمة <code>y</code> خلال تنفيذ البرنامج. أما قيمة <code>x</code> فتزداد بمقدار 10 كلما ضغط المستخدم مفتاح السهم إلى اليمين، وتنقص بمقدار 10 كلما ضُغط مفتاح السهم إلى اليسار.</p>
<p>ويعمل البرنامج عمومًا بشكل جيد، لكن يلزم ضغط المفتاح من جديد في كل مرّة نريد فيها التحرّك مرة أخرى. وسيكون من الأفضل أن تكون الحركة متواصلة طالما بقي المفتاح مضغوطًا. ويوفّر البرنامج التالي هذه الوظيفة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)
x = <span class="hljs-number">0</span>
y = <span class="hljs-number">480</span>-robot.get_height()

to_right = <span class="hljs-literal">False</span>
to_left = <span class="hljs-literal">False</span>

clock = pygame.time.Clock()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.KEYDOWN:
            <span class="hljs-keyword">if</span> event.key == pygame.K_LEFT:
                to_left = <span class="hljs-literal">True</span>
            <span class="hljs-keyword">if</span> event.key == pygame.K_RIGHT:
                to_right = <span class="hljs-literal">True</span>

        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.KEYUP:
            <span class="hljs-keyword">if</span> event.key == pygame.K_LEFT:
                to_left = <span class="hljs-literal">False</span>
            <span class="hljs-keyword">if</span> event.key == pygame.K_RIGHT:
                to_right = <span class="hljs-literal">False</span>

        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()

    <span class="hljs-keyword">if</span> to_right:
        x += <span class="hljs-number">2</span>
    <span class="hljs-keyword">if</span> to_left:
        x -= <span class="hljs-number">2</span>

    window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
    window.blit(robot, (x, y))
    pygame.display.flip()

    clock.tick(<span class="hljs-number">60</span>)
</code></pre>
<p>تحتوي الشيفرة الآن على المتغيّرين <code>to_right</code> و<code>to_left</code>. وهما يحتويان على معرفة ما إذا كان ينبغي أن يتحرّك الكائن الرسومي إلى اليمين أو إلى اليسار في لحظة معيّنة. وعندما يضغط المستخدم مفتاح سهم، تصبح القيمة المخزّنة في المتغيّر المعنيّ <code>True</code>. وعندما يُطلق المفتاح تتغيّر القيمة إلى <code>False</code>.</p>
<p>تُستخدم الساعة لتوقيت حركات الكائن الرسومي، بحيث تحدث 60 مرّة في الثانية. وإذا ضُغط مفتاح سهم، يتحرّك الكائن الرسومي بكسلين إلى اليمين أو إلى اليسار. وهذا يعني أن الكائن الرسومي يتحرّك 120 بكسل في الثانية إذا بقي المفتاح مضغوطًا.</p>
<blockquote>
<p><strong>تمرين برمجي: أربعة اتجاهات</strong></p>
<p>اكتب برنامجًا يستطيع فيه اللاعب تحريك روبوت في أربعة اتجاهات بمفتاحَي السهم على لوحة المفاتيح. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_four_directions.gif" alt="pygame_four_directions.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: أربعة جدران</strong></p>
<p>حسّن البرنامج في التمرين السابق بحيث لا يستطيع الروبوت الخروج من النافذة في أيّ من الاتجاهات الأربعة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_four_walls.gif" alt="pygame_four_walls.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: لاعبان</strong></p>
<p>اكتب برنامجًا يوجّه فيه لاعبان كلٌّ روبوته الخاص. وينبغي أن يستخدم أحد اللاعبين مفتاحَي السهم بينما يستخدم الآخر مثلًا المفاتيح w-s-a-d. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_two_players.gif" alt="pygame_two_players.gif"></p>
<h2 id="أحداث-الفأرة">أحداث الفأرة</h2>
<p>تفاعل الشيفرة التالية مع الأحداث التي يُضغط فيها زرّ من أزرار الفأرة بينما يكون المؤشّر داخل منطقة النافذة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.MOUSEBUTTONDOWN:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;you pressed the button number&quot;</span>, event.button, <span class="hljs-string">&quot;at location&quot;</span>, event.pos)

        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>وينبغي أن يبدو تنفيذ هذا البرنامج على نحو ما بهذا الشكل:</p>
<pre><code class="language-x">you pressed the button number 1 at location (82, 135)
you pressed the button number 1 at location (369, 135)
you pressed the button number 1 at location (269, 297)
you pressed the button number 3 at location (515, 324)
</code></pre>
<p>يشير الزرّ رقم 1 إلى زرّ الفأرة الأيسر، ويشير الزرّ رقم 3 إلى زرّ الفأرة الأيمن.</p>
<p>ويجمع البرنامج التالي بين معالجة أحداث الفأرة ورسم صورة على الشاشة. فعندما يضغط المستخدم زرًّا من أزرار الفأرة بينما يكون مؤشّر الفأرة داخل حدود النافذة، تُرسم صورة روبوت في ذلك الموقع.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.MOUSEBUTTONDOWN:
            x = event.pos[<span class="hljs-number">0</span>]-robot.get_width()/<span class="hljs-number">2</span>
            y = event.pos[<span class="hljs-number">1</span>]-robot.get_height()/<span class="hljs-number">2</span>

            window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
            window.blit(robot, (x, y))
            pygame.display.flip()

        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>وقد يبدو تنفيذ البرنامج بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_cursor.gif" alt="pygame_cursor.gif"></p>
<p>يحتوي البرنامج التالي على تحريك يتبع فيه الكائن الرسومي للروبوت مؤشّر الفأرة. ويُخزَّن موقع الكائن الرسومي في المتغيّرين <code>robot_x</code> و<code>robot_y</code>. وعندما تتحرّك الفأرة، يُخزَّن موقعها في المتغيّرين <code>target_x</code> و<code>target_y</code>. وإذا لم يكن الروبوت في هذا الموقع، فإنه يتحرّك في الاتجاه المناسب.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)

robot_x = <span class="hljs-number">0</span>
robot_y = <span class="hljs-number">0</span>
target_x = <span class="hljs-number">0</span>
target_y = <span class="hljs-number">0</span>

clock = pygame.time.Clock()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.MOUSEMOTION:
            target_x = event.pos[<span class="hljs-number">0</span>]-robot.get_width()/<span class="hljs-number">2</span>
            target_y = event.pos[<span class="hljs-number">1</span>]-robot.get_height()/<span class="hljs-number">2</span>

        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit(<span class="hljs-number">0</span>)

    <span class="hljs-keyword">if</span> robot_x &gt; target_x:
        robot_x -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">if</span> robot_x &lt; target_x:
        robot_x += <span class="hljs-number">1</span>
    <span class="hljs-keyword">if</span> robot_y &gt; target_y:
        robot_y -= <span class="hljs-number">1</span>
    <span class="hljs-keyword">if</span> robot_y &lt; target_y:
        robot_y += <span class="hljs-number">1</span>

    window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
    window.blit(robot, (robot_x, robot_y))
    pygame.display.flip()

    clock.tick(<span class="hljs-number">60</span>)
</code></pre>
<p>وينبغي أن يبدو تنفيذ البرنامج على نحو ما بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_cursor2.gif" alt="pygame_cursor2.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: الروبوت والفأرة</strong></p>
<p>اكتب برنامجًا يتبع فيه الروبوت مؤشّر الفأرة بحيث يكون مركز الروبوت دائمًا عند مؤشّر الفأرة مباشرة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_robot_cursor.gif" alt="pygame_robot_cursor.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: موقع الروبوت</strong></p>
<p>اكتب برنامجًا يظهر فيه الروبوت في موقع عشوائي داخل النافذة. وعندما ينقر اللاعب على الروبوت بالفأرة، ينتقل الروبوت إلى موقع جديد. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_robot_location.gif" alt="pygame_robot_location.gif"></p>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,t as default,l as headings,o as html,e as slug,p as title};
