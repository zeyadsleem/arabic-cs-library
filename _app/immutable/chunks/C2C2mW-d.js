const s="mooc",n="part-13",a="الجزء 13: الألعاب مع Pygame",p="2-animation",e="التحريك",l=[{depth:2,id:"إنشاء-تحريك",text:"إنشاء تحريك"},{depth:2,id:"الارتداد-عن-الجدار",text:"الارتداد عن الجدار"},{depth:2,id:"الدوران",text:"الدوران"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف كيفية إنشاء تحريك (animation) بواسطة pygame</li>
<li>ستتمكّن من استخدام ساعة لضبط سرعة برنامجك</li>
<li>ستتمكّن من استخدام الدوال المثلثية الأساسية في تحريكاتك</li>
</ul>
</blockquote>
<p>كثير من الألعاب فيها شخصيات متحرّكة، ولذلك فإن إنشاء التحريكات خطوة تالية منطقية. يمكننا خلق وهم الحركة برسم الصورة نفسها في مواقع مختلفة على الشاشة وتوقيت التغييرات بصورة مناسبة.</p>
<h2 id="إنشاء-تحريك">إنشاء تحريك</h2>
<p>تُنشئ الشيفرة التالية تحريكًا ينتقل فيه روبوت من اليسار إلى اليمين داخل نافذة pygame:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)

x = <span class="hljs-number">0</span>
y = <span class="hljs-number">0</span>
clock = pygame.time.Clock()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()

    window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
    window.blit(robot, (x, y))
    pygame.display.flip()

    x += <span class="hljs-number">1</span>
    clock.tick(<span class="hljs-number">60</span>)
</code></pre>
<p>عند تنفيذ ذلك ينبغي أن تبدو النتيجة بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_animation.gif" alt="pygame_animation.gif"></p>
<p>لنتأمّل الأوامر المستخدمة عن قرب. إذا أردنا تتبّع حركة الصورة على الشاشة، فعلينا معرفة موقعها، ولهذا السبب لدينا متغيّران لإحداثيات الزاوية العليا اليسرى للصورة:</p>
<pre><code class="language-python">x = <span class="hljs-number">0</span>
y = <span class="hljs-number">0</span>
</code></pre>
<p>ولدينا أيضًا ساعة، نستخدمها للتأكّد من أن سرعة التحريك مناسبة تمامًا:</p>
<pre><code class="language-python">clock = pygame.time.Clock()
</code></pre>
<p>ترسم الحلقة الرئيسية الصورة في موقعها الحالي مع كل تكرار:</p>
<pre><code class="language-python">    window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
    window.blit(robot, (x, y))
    pygame.display.flip()
</code></pre>
<p>أولًا تملأ الطريقة <code>fill</code> النافذة بالأسود كما في السابق. يُمرَّر اللون كصف (tuple) يحتوي على قيم RGB للون. وفي هذه الحالة يكون الوسيط <code>(0, 0, 0)</code>، أي أن المكوّنات الثلاثة جميعها — الأحمر والأخضر والأزرق — قيمتها 0. ويمكن أن تقع قيمة كل مكوّن بين 0 و255. فلو مرّرنا <code>(255, 255, 255)</code> وسيطًا لحصلنا على نافذة بيضاء، ولو مرّرنا <code>(255, 0, 0)</code> لحصلنا على نافذة حمراء. تشكّل رموز ألوان RGB العمود الفقري للتلوين الرقمي، وهناك أدوات كثيرة على الإنترنت للتعامل معها، مثل <a href="https://www.rapidtables.com/web/color/RGB_Color.html">RGB Color Codes Chart</a>.</p>
<p>بعد امتلاء النافذة باللون تُرسم الصورة في الموقع المُعطى عبر الطريقة <code>blit</code>. ثم يُحدَّث محتوى النافذة عبر الدالة <code>pygame.display.flip</code>.</p>
<p>وأخيرًا تزداد القيمة المخزّنة في <code>x</code>، وهو ما يجعل الصورة تنتقل بكسلًا واحدًا إلى اليمين مع كل تكرار:</p>
<pre><code class="language-python">    x += <span class="hljs-number">1</span>
</code></pre>
<p>وتُستدعى طريقة الساعة <code>tick</code> في النهاية:</p>
<pre><code class="language-python">    clock.tick(<span class="hljs-number">60</span>)
</code></pre>
<p>تتولّى الطريقة <code>tick</code> سرعة التحريك. يفرض الوسيط <code>60</code> أن تُنفَّذ الحلقة 60 مرّة في الثانية، وهو ما يعني أن الصورة تنتقل 60 بكسل إلى اليمين في كل ثانية. وهذا يطابق تقريبًا قيمة <em>FPS</em> أي <em>الإطارات في الثانية</em> المستخدمة في الألعاب.</p>
<p>من حيث المبدأ تضمن الطريقة <code>tick</code> أن يجري التحريك بالسرعة نفسها على كل حاسوب. فلو لم يكن هناك توقيت كهذا، لاعتمدت سرعة التحريك على سرعة الحاسوب.</p>
<h2 id="الارتداد-عن-الجدار">الارتداد عن الجدار</h2>
<p>كان التحريك السابق ممتازًا في ما عدا أمرًا واحدًا: عندما بلغ الروبوت جدارًا واصل الخروج بعيدًا عن مجال الرؤية. لنجعل الروبوت يرتدّ عن الجدار.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)

x = <span class="hljs-number">0</span>
y = <span class="hljs-number">0</span>
velocity = <span class="hljs-number">1</span>
clock = pygame.time.Clock()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()

    window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
    window.blit(robot, (x, y))
    pygame.display.flip()
    
    x += velocity
    <span class="hljs-keyword">if</span> velocity &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> x+robot.get_width() &gt;= <span class="hljs-number">640</span>:
        velocity = -velocity
    <span class="hljs-keyword">if</span> velocity &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> x &lt;= <span class="hljs-number">0</span>:
        velocity = -velocity

    clock.tick(<span class="hljs-number">60</span>)
</code></pre>
<p>ينبغي أن يبدو تشغيل الشيفرة أعلاه بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_animation2.gif" alt="pygame_animation2.gif"></p>
<p>هناك متغيّر جديد باسم <code>velocity</code> يحدّد اتجاه الحركة. فإذا كانت قيمته أعلى من صفر فالحركة إلى اليمين، وإذا كانت أدنى من صفر فالحركة إلى اليسار. وبصورة أدقّ في هذه الحالة: إذا كانت القيمة <code>1</code> يتحرّك الروبوت إلى اليمين، وإذا كانت <code>-1</code> يتحرّك الروبوت إلى اليسار.</p>
<p>تجعل الأسطر التالية الروبوت يرتدّ عن الجدران الجانبية:</p>
<pre><code class="language-python">    <span class="hljs-keyword">if</span> velocity &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> x+robot.get_width() &gt;= <span class="hljs-number">640</span>:
        velocity = -velocity
    <span class="hljs-keyword">if</span> velocity &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> x &lt;= <span class="hljs-number">0</span>:
        velocity = -velocity
</code></pre>
<p>فإذا كانت السرعة أعلى من صفر بحيث يتحرّك الروبوت إلى اليمين، وبلغت الحافة اليمنى للصورة الحافة اليمنى للنافذة أو تجاوزتها، انعكس الاتجاه وبدأ الروبوت يتحرّك إلى اليسار. وبالمثل، إذا كانت السرعة أدنى من صفر بحيث يتحرّك الروبوت إلى اليسار، وبلغت الحافة اليسرى للصورة الحافة اليسرى للنافذة، انعكس الاتجاه مرة أخرى وبدأ الروبوت يتحرّك إلى اليمين من جديد.</p>
<p>وبهذا ينتقل الروبوت في مسار من الحافة اليسرى للنافذة إلى الحافة اليمنى، ثم عائدًا إلى اليسار، ثم إلى اليمين مرة أخرى، ويتكرّر ذلك إلى ما لا نهاية.</p>
<h2 id="الدوران">الدوران</h2>
<p>لننشئ تحريكًا آخر. هذه المرّة ينبغي أن <em>يدور</em> الروبوت في دائرة حول مركز النافذة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame
<span class="hljs-keyword">import</span> math

pygame.init()
window = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))

robot = pygame.image.load(<span class="hljs-string">&quot;robot.png&quot;</span>)

angle = <span class="hljs-number">0</span>
clock = pygame.time.Clock()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()

    x = <span class="hljs-number">320</span>+math.cos(angle)*<span class="hljs-number">100</span>-robot.get_width()/<span class="hljs-number">2</span>
    y = <span class="hljs-number">240</span>+math.sin(angle)*<span class="hljs-number">100</span>-robot.get_height()/<span class="hljs-number">2</span>

    window.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
    window.blit(robot, (x, y))
    pygame.display.flip()

    angle += <span class="hljs-number">0.01</span>
    clock.tick(<span class="hljs-number">60</span>)
</code></pre>
<p>ينبغي أن يبدو تشغيل الشيفرة أعلاه بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_rotation.gif" alt="pygame_rotation.gif"></p>
<p>يتحقّق الدوران في دائرة دقيقة نسبيًا بمساعدة بعض الدوال المثلثية الأساسية. يحتوي المتغيّر <code>angle</code> على زاوية موقع الروبوت بالنسبة إلى مركز النافذة والخط الأفقي المارّ به. وتُستخدم الدالتان الجيب (sine) وجيب التمام (cosine) من مكتبة math في بايثون لحساب إحداثيات موقع الروبوت:</p>
<pre><code class="language-python">        x = <span class="hljs-number">320</span>+math.cos(angle)*<span class="hljs-number">100</span>-robot.get_width()/<span class="hljs-number">2</span>
        y = <span class="hljs-number">240</span>+math.sin(angle)*<span class="hljs-number">100</span>-robot.get_height()/<span class="hljs-number">2</span>
</code></pre>
<p>يدور الروبوت حول دائرة نصف قطرها 100 حول مركز النافذة. والوتر في هذه الحالة هو نصف قطر الدائرة. وتُعطي دالة جيب التمام طول الضلع <em>المجاور</em> في مثلث قائم الزاوية بالنسبة إلى الوتر، أي أنها تُعطينا الإحداثي <code>x</code> للموقع. وتُعطي دالة الجيب طول الضلع <em>المقابل</em>، أي الإحداثي <code>y</code>. ثم يُعدَّل الموقع بحسب حجم الصورة، بحيث يقع مركز الدائرة في مركز النافذة.</p>
<p>مع كل تكرار يزداد مقدار <code>angle</code> بمقدار 0.01:llä. وبما أننا نستخدم الراديان، فإن الدائرة الكاملة تساوي 2π، أي نحو 6.28. ويستغرق الروبوت نحو 628 تكرارًا لإكمال دورة كاملة، وبمعدل 60 تكرارًا في الثانية يستغرق ذلك ما يزيد قليلًا على 10 ثوانٍ.</p>
<blockquote>
<p><strong>تمرين برمجي: حركة رأسية</strong></p>
<p>أنشئ تحريكًا يتحرّك فيه الروبوت صعودًا وهبوطًا في حلقة لا نهائية. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_vertical.gif" alt="pygame_vertical.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: الدوران حول المحيط</strong></p>
<p>أنشئ تحريكًا يطوف فيه الروبوت بمحيط النافذة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_perimeter.gif" alt="pygame_perimeter.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: روبوتان</strong></p>
<p>أنشئ تحريكًا يتحرّك فيه روبوتان ذهابًا وإيابًا إلى اليسار وإلى اليمين. ينبغي أن يتحرّك الروبوت الأسفل بضعف سرعة الروبوت الأعلى. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_move2.gif" alt="pygame_move2.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: روبوتات في دائرة</strong></p>
<p>أنشئ تحريكًا تدور فيه عشرة روبوتات في دائرة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_circle.gif" alt="pygame_circle.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: الكرة المرتدة</strong></p>
<p>أنشئ تحريكًا ترتدّ فيه كرة عن حوافّ النافذة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_bounce.gif" alt="pygame_bounce.gif"></p>
<p>يحتوي قالب التمرين على الصورة <code>ball.png</code>.</p>
<blockquote>
<p><strong>تمرين برمجي: غزو الروبوتات</strong></p>
<p>أنشئ تحريكًا تسقط فيه الروبوتات من السماء عشوائيًا. وعندما يبلغ روبوت الأرض، يبدأ بالتحرّك إلى اليسار أو إلى اليمين، ثم يختفي أخيرًا عن الشاشة. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_invasion.gif" alt="pygame_invasion.gif"></p>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,o as html,p as slug,e as title};
