const s="mooc",a="part-14",n="الجزء 14: مشروع اللعبة",l="3-finishing-the-game",e="إنهاء اللعبة",p=[{depth:2,id:"عداد-الحركات",text:"عدّاد الحركات"},{depth:2,id:"لعبة-جديدة-وإنهاء-اللعبة",text:"لعبة جديدة وإنهاء اللعبة"},{depth:2,id:"حل-اللعبة",text:"حلّ اللعبة"},{depth:2,id:"تلميح-للاختبار",text:"تلميح للاختبار"},{depth:2,id:"لعبتك-على-github",text:"لعبتك على GitHub؟"},{depth:2,id:"كم-عدد-الحركات-المطلوبة",text:"كم عدد الحركات المطلوبة؟"}],c=`<p>لعبةنا باتت وظيفية إلى حد كافٍ، حان الوقت لإضافة بعض اللمسات الأخيرة. سنضيف عدّادًا يعرض عدد الحركات التي نفّذها اللاعب، وخيارًا لبدء لعبة جديدة وإنهاء اللعبة بلوحة المفاتيح، وإشعارًا عند نجاح اللاعب في حلّ اللعبة.</p>
<h2 id="عداد-الحركات">عدّاد الحركات</h2>
<p>عدّاد الحركات القريب من الحافة السفلية لنافذة اللعبة يعرض عدد الحركات التي نفّذها اللاعب حتى الآن. ويمكن استخدامه للوصول إلى الحل بأقل عدد ممكن من الحركات.</p>
<p>يتطلّب العدّاد بعض التعديلات على الشيفرة. أوّلًا، لنُعدِّل المُنشِئ (constructor) بحيث تكون هناك مساحة كافية للعدّاد، ولدينا خطّ مناسب متاح لرسم النصّ:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        ...
        <span class="hljs-variable language_">self</span>.window = pygame.display.set_mode((window_width, window_height + <span class="hljs-variable language_">self</span>.scale))

        <span class="hljs-variable language_">self</span>.game_font = pygame.font.SysFont(<span class="hljs-string">&quot;Arial&quot;</span>, <span class="hljs-number">24</span>)
        ...
</code></pre>
<p>يُهيَّأ عدّاد الحركات بالصفر في بداية اللعبة. وكلّ حركة تزيده بمقدار واحد:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">new_game</span>(<span class="hljs-params">self</span>):
        ...
        <span class="hljs-variable language_">self</span>.moves = <span class="hljs-number">0</span>
</code></pre>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">move</span>(<span class="hljs-params">self, move_y, move_x</span>):
        ...
        <span class="hljs-variable language_">self</span>.moves += <span class="hljs-number">1</span>

</code></pre>
<p>في كلّ مرّة تُحدَّث فيها محتويات النافذة، ينبغي أن يُحدَّث أيضًا عدد الحركات المعروض على الشاشة:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">draw_window</span>(<span class="hljs-params">self</span>):
        ...
        game_text = <span class="hljs-variable language_">self</span>.game_font.render(<span class="hljs-string">&quot;Moves: &quot;</span> + <span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.moves), <span class="hljs-literal">True</span>, (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
        <span class="hljs-variable language_">self</span>.window.blit(game_text, (<span class="hljs-number">25</span>, <span class="hljs-variable language_">self</span>.height * <span class="hljs-variable language_">self</span>.scale + <span class="hljs-number">10</span>))
        ...
</code></pre>
<h2 id="لعبة-جديدة-وإنهاء-اللعبة">لعبة جديدة وإنهاء اللعبة</h2>
<p>الخطوة التالية، لنُضِف أوامر لوحة المفاتيح لبدء لعبة جديدة بمفتاح <code>F2</code> ولإنهاء اللعبة بمفتاح <code>Esc</code>. كلاهما سهل التنفيذ إلى حدّ كبير:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">check_events</span>(<span class="hljs-params">self</span>):
        ...
                <span class="hljs-keyword">if</span> event.key == pygame.K_F2:
                    <span class="hljs-variable language_">self</span>.new_game()
                <span class="hljs-keyword">if</span> event.key == pygame.K_ESCAPE:
                    exit()
        ...
</code></pre>
<p>نضيف أيضًا معلومة عن هذه الوظيفة ليراها اللاعب:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">draw_window</span>(<span class="hljs-params">self</span>):
        ...
        game_text = <span class="hljs-variable language_">self</span>.game_font.render(<span class="hljs-string">&quot;F2 = new game&quot;</span>, <span class="hljs-literal">True</span>, (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
        <span class="hljs-variable language_">self</span>.window.blit(game_text, (<span class="hljs-number">200</span>, <span class="hljs-variable language_">self</span>.height * <span class="hljs-variable language_">self</span>.scale + <span class="hljs-number">10</span>))

        game_text = <span class="hljs-variable language_">self</span>.game_font.render(<span class="hljs-string">&quot;Esc = exit game&quot;</span>, <span class="hljs-literal">True</span>, (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
        <span class="hljs-variable language_">self</span>.window.blit(game_text, (<span class="hljs-number">400</span>, <span class="hljs-variable language_">self</span>.height * <span class="hljs-variable language_">self</span>.scale + <span class="hljs-number">10</span>))
        ...
</code></pre>
<h2 id="حل-اللعبة">حلّ اللعبة</h2>
<p>يكون اللاعب قد حلّ اللعبة عندما تكون كلّ صندوق داخل إحدى المربّعات الهدف. والطريقة (method) التالية تتولّى التحقّق من ذلك:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">game_solved</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">for</span> y <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.height):
            <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.width):
                <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">map</span>[y][x] <span class="hljs-keyword">in</span> [<span class="hljs-number">2</span>, <span class="hljs-number">6</span>]:
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
</code></pre>
<p>تمرّ الطريقة على جميع مربّعات شبكة اللعبة. فإذا كان أيّ من المربّعات يحمل القيمة 2 (مربّع هدف فارغ) أو 6 (روبوت داخل مربّع هدف)، فلم تُحَل اللعبة بعد، ولذلك تُعيد الطريقة <code>False</code>. وإذا لم يكن هناك مربّع كهذا في الشبكة، فلا بدّ أن جميع المربّعات الهدف مشغولة بالصناديق، وقد حُلّت اللعبة، وتُعيد الطريقة <code>True</code>.</p>
<p>إذا حلّ اللاعب اللعبة، ينبغي أن نعرض رسالة مناسبة بوسيلة الطريقة <code>draw_window</code>:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">draw_window</span>(<span class="hljs-params">self</span>):
        ...
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.game_solved():
            game_text = <span class="hljs-variable language_">self</span>.game_font.render(<span class="hljs-string">&quot;Congratulations, you solved the game!&quot;</span>, <span class="hljs-literal">True</span>, (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
            game_text_x = <span class="hljs-variable language_">self</span>.scale * <span class="hljs-variable language_">self</span>.width / <span class="hljs-number">2</span> - game_text.get_width() / <span class="hljs-number">2</span>
            game_text_y = <span class="hljs-variable language_">self</span>.scale * <span class="hljs-variable language_">self</span>.height / <span class="hljs-number">2</span> - game_text.get_height() / <span class="hljs-number">2</span>
            pygame.draw.rect(<span class="hljs-variable language_">self</span>.window, (<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>), (game_text_x, game_text_y, game_text.get_width(), game_text.get_height()))
            <span class="hljs-variable language_">self</span>.window.blit(game_text, (game_text_x, game_text_y))
        ...
</code></pre>
<p>ولإكمال الصورة، لنُعدِّل الطريقة <code>move</code> أيضًا بحيث لا يستطيع اللاعب التحرّك بعد حلّ اللعبة:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">move</span>(<span class="hljs-params">self, move_y, move_x</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.game_solved():
            <span class="hljs-keyword">return</span>
        ...
</code></pre>
<p>ولا يزال اللاعب قادرًا على رؤية شبكة اللعبة وحالتها النهائية.</p>
<h2 id="تلميح-للاختبار">تلميح للاختبار</h2>
<p>عند تطوير الألعاب يحدث غالبًا أنّك ترغب في التحقّق عمّا سيحدث في مراحل لاحقة من اللعبة. وفي هذه اللعبة على سبيل المثال، تكون لحظة حلّ اللعبة من هذا النوع من المواقف.</p>
<p>قد يكون اختبار عمل موقق كهذا صعبًا، لأنك في العادة ستحتاج إلى حلّ اللعبة للوصول إلى تلك النقطة منها. وبصفتنا مبرمجين، يمكننا إدخال بعض التعديلات المؤقّتة في ألعابنا ليسهل اختبارها. فعلى سبيل المثال يمكننا إضافة ما يلي ليسهل حلّ اللعبة مؤقّتًا:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">game_solved</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
</code></pre>
<p>الآن تُعيد الطريقة دائمًا <code>True</code>، أي إنّ اللعبة «محلولة» منذ بدايتها. وهذا يُسهّل التحقّق من أنّ الإشعار في النهاية يبدو جيدًا، ومن أنّ اللاعب لم يعد قادرًا على التحرّك في الشبكة بعد الحلّ. وعندما يُختبر هذا الجزء اختبارًا كاملًا، يمكننا التراجع عن التعديلات.</p>
<h2 id="لعبتك-على-github">لعبتك على GitHub؟</h2>
<p>انتهت اللعبة الآن. وإن أردت طريقة سهلة للعب بالشيفرة والصور، يمكنك استراد الشيفرة المصدرية من GitHub:</p>
<ul>
<li><a href="https://github.com/moocfi/sokoban">https://github.com/moocfi/sokoban</a></li>
</ul>
<p>وهو مكان شائع لأنواع عديدة من مشاريع البرمجة. ويمكنك استخدامه لتخزين الشيفرة المصدرية ومواد مشاريعك البرمجية الخاصة أيضًا، وعندها سيبقى برنامجك محفوظًا عبر نظام التحكّم في الإصدارات git، ويمكن مشاركته مع الآخرين بسهولة. وستصبح ملمًّا بـ git وGitHub إن واصلت الدراسة في دورات mooc.fi البرمجية الأخرى.</p>
<h2 id="كم-عدد-الحركات-المطلوبة">كم عدد الحركات المطلوبة؟</h2>
<p>شبكة هذه اللعبة صغيرة، لكن اللعبة ليست سهلة إلى هذه الدرجة. التحدّي الأول هو ببساطة إنهاء اللعبة، أمّا المرحلة التالية فهي السعي إلى ذلك بأقلّ قدر ممكن من الحركات. فما أقصر طريق إلى الحلّ؟</p>
<p>البحث عن أقصر حلّ ممكن ليس مهمة سهلة على الإطلاق، لكنه يبقى ذا حلول حسابية أيضًا. وهي إحدى موضوعات مقرّر <em>بنى البيانات والخوارزميات</em>.</p>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,p as headings,c as html,l as slug,e as title};
