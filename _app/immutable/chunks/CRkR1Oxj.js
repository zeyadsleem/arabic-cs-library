const s="mooc",a="part-13",n="الجزء 13: الألعاب مع Pygame",p="4-more-pygame-techniques",e="تقنيات pygame إضافية",l=[{depth:2,id:"عنوان-النافذة",text:"عنوان النافذة"},{depth:2,id:"رسم-الأشكال",text:"رسم الأشكال"},{depth:2,id:"رسم-النص",text:"رسم النص"},{depth:2,id:"التمارين",text:"التمارين"}],c=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد هذا القسم</p>
<ul>
<li>ستعرف عنوان نافذة pygame</li>
<li>ستتمكّن من رسم الأشكال بمساعدة pygame</li>
<li>ستعرف كيفية عرض نص داخل نافذتك</li>
</ul>
</blockquote>
<h2 id="عنوان-النافذة">عنوان النافذة</h2>
<p>ستبدو برامجك أكثر احترافيةً إذا احتوى عنوان النافذة على اسم البرنامج الفعلي بدلًا من «نافذة pygame». يُعيَّن العنوان عبر الدالة <code>pygame.display.set_caption</code>:</p>
<pre><code class="language-python">pygame.display.set_caption(<span class="hljs-string">&quot;Great Adventure&quot;</span>)
</code></pre>
<h2 id="رسم-الأشكال">رسم الأشكال</h2>
<p>يرسم البرنامج التالي مستطيلًا ودائرة وخطًا على الشاشة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
display = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))
display.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))

pygame.draw.rect(display, (<span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>), (<span class="hljs-number">50</span>, <span class="hljs-number">100</span>, <span class="hljs-number">200</span>, <span class="hljs-number">250</span>))
pygame.draw.circle(display, (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>), (<span class="hljs-number">200</span>, <span class="hljs-number">150</span>), <span class="hljs-number">40</span>)
pygame.draw.line(display, (<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>), (<span class="hljs-number">80</span>, <span class="hljs-number">120</span>), (<span class="hljs-number">300</span>, <span class="hljs-number">160</span>), <span class="hljs-number">2</span>)

pygame.display.flip()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>يبدو تشغيل الشيفرة السابقة بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_shapes.gif" alt="pygame_shapes.gif"></p>
<h2 id="رسم-النص">رسم النص</h2>
<p>يُرسم النص في pygame على خطوتين: ننشئ أولًا صورةً تحتوي على النص المطلوب، ثم نرسم هذه الصورة على الشاشة. تجري العملية هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> pygame

pygame.init()
display = pygame.display.set_mode((<span class="hljs-number">640</span>, <span class="hljs-number">480</span>))
display.fill((<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))

game_font = pygame.font.SysFont(<span class="hljs-string">&quot;Arial&quot;</span>, <span class="hljs-number">24</span>)
text = game_font.render(<span class="hljs-string">&quot;Moikka!&quot;</span>, <span class="hljs-literal">True</span>, (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
display.blit(text, (<span class="hljs-number">100</span>, <span class="hljs-number">50</span>))
pygame.display.flip()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> event <span class="hljs-keyword">in</span> pygame.event.get():
        <span class="hljs-keyword">if</span> event.<span class="hljs-built_in">type</span> == pygame.QUIT:
            exit()
</code></pre>
<p>يبدو تشغيل الشيفرة السابقة بهذا الشكل:</p>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_text.gif" alt="pygame_text.gif"></p>
<p>هنا تنشئ الطريقة <code>pygame.font.SysFont</code> كائنًا (object) للخط، يستخدم خط النظام Arial بحجم 24. ثم تنشئ الطريقة <code>render</code> صورةً للنص المحدّد باللون المُعطى. وتُرسم هذه الصورة على النافذة عبر الطريقة <code>blit</code> تمامًا كما في المثال السابق.</p>
<p>تنبيه: تختلف الخطوط المتوفرة من نظام إلى آخر. فإذا لم يكن خط Arial متوفرًا على النظام الذي يُنفَّذ عليه هذا البرنامج — رغم أن Arial خط شائع جدًا ومتوفر على معظم الأنظمة — استُخدم خط النظام الافتراضي بدلًا منه. وإذا احتجت خطًا معيّنًا للعبتك، فيمكنك وضع ملف الخط داخل مجلد اللعبة وتحديد مساره لطريقة <code>pygame.font.Font</code>.</p>
<div class="exercises"><h2 id="التمارين">التمارين</h2>
<p>فيما يلي تمارين أكثر تقدّمًا للممارسة على ما تعلّمته في هذا القسم من مادة المقرر.</p>
<blockquote>
<p><strong>تمرين برمجي: الساعة</strong></p>
<p>اكتب برنامجًا يعرض واجهة ساعة تُظهر وقت النظام. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_clock.gif" alt="pygame_clock.gif"></p>
<blockquote>
<p><strong>تمرين برمجي: الكويكبات</strong></p>
<p>أنشئ لعبة تسقط فيها الكويكبات من السماء. يحرّك اللاعب روبوتًا إلى اليمين وإلى اليسار ويحاول جمع الصخور الساقطة. يحصل اللاعب على نقطة لكل كويكب يجمعه، ويظهر مجموع النقاط في أعلى النافذة. تنتهي اللعبة عندما يفوّت اللاعب كويكبًا. ينبغي أن تبدو النتيجة النهائية بهذا الشكل:</p>
</blockquote>
<p><img src="/arabic-cs-library/images/mooc/part-13/pygame_asteroids.gif" alt="pygame_asteroids.gif"></p>
<p>تنبيه: الحركة أعلاه مأخوذة من النسخة الفنلندية من المقرر. يمكنك استخدام كلمة «النقاط» بدلًا من الكلمة الفنلندية «Pisteet» الظاهرة في الصورة.</p>
<p>يحتوي قالب التمرين على الصورة <code>rock.png</code> للكويكب.</p>
<p>يرجى الإجابة على استبيان سريع حول هذا القسم من المقرر.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 9b57c7ea-8983-507f-93e7-243be766e2ad)</p>
</blockquote>
</div>`,r={book:s,chapter:a,chapterTitle:n,slug:p,title:e,headings:l,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,l as headings,c as html,p as slug,e as title};
