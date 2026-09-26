const s="500-lines",n="template-engine",e="A Template Engine",a="index",l="محرّك القوالب",p=[{depth:2,id:"مقدمة",text:"مقدّمة"},{depth:2,id:"القوالب",text:"القوالب"},{depth:2,id:"الصياغة-المدعومة",text:"الصياغة المدعومة"},{depth:2,id:"نهج-التنفيذ",text:"نُهج التنفيذ"},{depth:2,id:"التصريف-إلى-بايثون",text:"التصريف إلى بايثون"},{depth:2,id:"كتابة-المحرك",text:"كتابة المحرّك"},{depth:3,id:"صنف-templite",text:"صنف Templite"},{depth:3,id:"codebuilder",text:"CodeBuilder"},{depth:3,id:"تنفيذ-صنف-templite",text:"تنفيذ صنف Templite"},{depth:2,id:"الاختبار",text:"الاختبار"},{depth:2,id:"ما-ترك-جانبا",text:"ما تُرك جانبًا"},{depth:2,id:"خلاصة",text:"خلاصة"}],t=`<p><em>نيد باتشلدر مهندس برمجيات ذو مسيرة طويلة، ويعمل حاليًّا في edX ليُنشئ برمجيات مفتوحة المصدر
لتثقيف العالم. وهو مشرف على coverage.py، ومنظّم Boston Python، وقد تحدّث في العدّة من
مؤتمرات PyCon. يكتب مدونته على
<a href="http://nedbatchelder.com">http://nedbatchelder.com</a>. وقد تناول العشاء مرّة ذات ليلة في البيت الأبيض.</em></p>
<h2 id="مقدمة">مقدّمة</h2>
<p>تحتوي معظم البرامج على كثير من المنطق، وعلى قدر يسير من البيانات النصّية الحرفية. وقد صُمِّمت لغات البرمجة لتكون جيّدة لهذا النوع من البرمجة. لكنّ بعض مهام البرمجة لا تتضمّن إلّا قدرًا يسيرًا من المنطق، وكثيرًا جدًّا من البيانات النصّية. ولكل هذه المهام، نودّ أن نتوفّر على أداة أنسب لهذه المشكلات الغنيّة بالنص. ومحرّك القوالب (template engine) هو تلك الأداة بالضبط. وفي هذا الفصل، سنبني محرّك قوالب بسيطًا.</p>
<p>أشهر مثال على هذه المهام الغنيّة بالنص هو في تطبيقات الويب. فمرحلة مهمّة في أيّ تطبيق ويب هي توليد HTML يُقدَّم إلى المتصفّح. وقليل جدًّا من صفحات HTML تكون ساكنة تمامًا: فهي تتضمّن على الأقلّ قدرًا يسيرًا من البيانات الديناميكية، مثل اسم المستخدم. وعادةً ما تحتوي قدرًا كبيرًا من البيانات الديناميكية: قوائم المنتجات، وتحديثات أخبار الأصدقاء، وهكذا.</p>
<p>وفي الوقت نفسه، تحتوي كل صفحة HTML على مساحات كبيرة من النصّ الساكن. وهذه الصفحات كبيرة، إذ تحتوي على عشرات الآلاف من بايتات النص. وأمام مطوّر تطبيق الويب مسألة يجب أن يحلّها: كيف نولّد بأفضل طريقة سلسلة نصّية كبيرة تحتوي على مزيج من البيانات الساكنة والديناميكية؟ ولزيادة تعقيد المسألة، فإنّ النصّ الساكن هو في الواقع ترميز HTML (markup) يؤلّفه عضو آخر من الفريق، وهو مصمّم الواجهة الأمامية، ويريد أن يتمكّن من العمل عليه بطرق مألوفة.</p>
<p>لأغراض التوضيح، لنفترض أننا نريد إنتاج هذا HTML التجريبي:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome, Charlie!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Products:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Apple: $1.00<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Fig: $1.50<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Pomegranate: $3.25<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>هنا، سيكون اسم المستخدم ديناميكيًّا، وكذلك أسماء المنتجات وأسعارها. بل إنّ عدد المنتجات ليس ثابتًا: فقد يكون هناك في لحظة أخرى منتجات أكثر أو أقلّ لعرضها.</p>
<p>إحدى طرق إنتاج هذا HTML هي أن يكون لدينا ثوابت نصّية في شيفرتنا، ندمجها معًا لإنتاج الصفحة. وتُدرَج البيانات الديناميكية عبر استبدال نصّي من نوع ما. وبعض بياناتنا الديناميكية متكرّرة، مثل قوائم منتجاتنا. وهذا يعني أنّ لدينا مجزوءات من HTML تتكرّر، لذا يجب معالجتها على حدة ثمّ دمجها مع بقية الصفحة.</p>
<p>قد يبدو إنتاج صفحتنا التجريبية بهذه الطريقة هكذا:</p>
<pre><code class="language-python"><span class="hljs-comment"># The main HTML for the whole page.</span>
PAGE_HTML = <span class="hljs-string">&quot;&quot;&quot;
&lt;p&gt;Welcome, {name}!&lt;/p&gt;
&lt;p&gt;Products:&lt;/p&gt;
&lt;ul&gt;
{products}
&lt;/ul&gt;
&quot;&quot;&quot;</span>

<span class="hljs-comment"># The HTML for each product displayed.</span>
PRODUCT_HTML = <span class="hljs-string">&quot;&lt;li&gt;{prodname}: {price}&lt;/li&gt;\\n&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">make_page</span>(<span class="hljs-params">username, products</span>):
    product_html = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> prodname, price <span class="hljs-keyword">in</span> products:
        product_html += PRODUCT_HTML.<span class="hljs-built_in">format</span>(
            prodname=prodname, price=format_price(price))
    html = PAGE_HTML.<span class="hljs-built_in">format</span>(name=username, products=product_html)
    <span class="hljs-keyword">return</span> html
</code></pre>
<p>هذا يعمل، لكنّنا وقعنا في فوضى. إنّ HTML موزّع في عدّة ثوابت نصّية مضمّنة داخل شيفرة تطبيقنا. ومنطق الصفحة صعب الرؤية لأنّ النصّ الساكن مُجزَّأ إلى قطع منفصلة. وتضيع تفاصيل كيفية تنسيق البيانات داخل شيفرة بايثون. وحتى يعدّل مصمّم الواجهة الأمامية صفحة HTML، عليه أن يتمكّن من تحرير شيفرة بايثون لإجراء تغييرات على HTML. وتخيّل كيف سيبدو الشيفرة لو كانت الصفحة أعقد بعشر مرّات (أو مئة مرّة)؛ فستصبح غير قابلة للعمل بسرعة تامّة.</p>
<h2 id="القوالب">القوالب</h2>
<p>والطريقة الأفضل لإنتاج صفحات HTML هي باستخدام <em>القوالب</em> (templates). تُؤلَّف صفحة HTML بوصفها قالبًا، ما يعني أنّ الملف هو في معظمه HTML ساكن، مع أجزاء ديناميكية مضمّنة فيه باستخدام ترميز خاصّ. ويمكن أن تبدو صفحتنا التجريبية أعلاه بهذا الشكل بوصفها قالبًا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome, {{user_name}}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Products:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
{% for product in product_list %}
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{{ product.name }}:
        {{ product.price|format_price }}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
{% endfor %}
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>هنا يكون التركيز على النصّ HTML، مع منطق مضمّن داخل HTML. قارن هذا النهج المتمركز حول المستند بشيفرتنا المتمركزة حول المنطق أعلاه. فقد كان برنامجنا الأسبق شيفرة بايثون في معظمها، مع HTML مضمّن داخل منطق بايثون. أمّا هنا فبرنامجنا في معظمه ترميز HTML ساكن.</p>
<p>والأسلوب الساكن في الغالب المستخدم في القوالب هو عكس كيفية عمل معظم لغات البرمجة. فمثلًا، في بايثون، معظم ملف المصدر شيفرة قابلة للتنفيذ، وإذا احتجت إلى نصّ ساكن حرفيّ فإنّك تضمّنه في ثابت نصّي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">hello</span>():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hello, world!&quot;</span>)

hello()
</code></pre>
<p>حين تقرأ بايثون ملف المصدر هذا، فإنّها تفسّر نصًّا مثل <code>def hello():</code> بوصفه تعليمات يُقصد تنفيذها. أمّا محرف الاقتباس المزدوج في <code>print(&quot;Hello, world!&quot;)</code> فيُشير إلى أنّ النصّ التالي مقصود منه أن يكون حرفيًّا، حتى الاقتباس المزدوج الختامي. وهكذا تعمل معظم لغات البرمجة: ديناميكية في الغالب، مع بعض القطع الساكنة المضمّنة في التعليمات. وتُشير القطع الساكنة إلى ترميز الاقتباس المزدوج.</p>
<p>وتقلب لغة القوالب هذا الترتيب: ملف القالب هو في معظمه نصّ حرفيّ ساكن، مع ترميز خاصّ يُشير إلى الأجزاء الديناميكية القابلة للتنفيذ.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome, {{user_name}}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>هنا المقصود أن يظهر النصّ حرفيًّا في صفحة HTML الناتجة، حتى يشير '<code>{{</code>' إلى الانتقال إلى الوضع الديناميكي، حيث يُستبدل المتغيّر <code>user_name</code> في المخرجات.</p>
<p>ودوالّ تنسيق النصوص مثل <code>&quot;foo = {foo}!&quot;.format(foo=17)</code> في بايثون هي أمثلة على لغات مصغّرة (mini-languages) تُستخدم لإنشاء نصّ من ثابت نصّي ومن البيانات التي ستُدرج. وتوسّع القوالب هذه الفكرة لتشمل بنى مثل الجمل الشرطية والحلقات، لكنّ الفرق هو فرق في الدرجة فقط.</p>
<p>وتُسمّى هذه الملفات قوالب لأنها تُستخدم لإنتاج عدّة صفحات ذات بنية متشابهة لكن بتفاصيل مختلفة.</p>
<p>ولاستخدام قوالب HTML في برامجنا، نحتاج إلى <em>محرّك قوالب</em>: دالة تأخذ قالبًا ساكنًا يصف بنية الصفحة ومحتواها الساكن، وسياقًا (context) ديناميكيًّا يوفّر البيانات الديناميكية التي ستُدغم في القالب. يجمع محرّك القوالب بين القالب والسياق لإنتاج سلسلة HTML كاملة. ومهمّة محرّك القوالب هي تفسير القالب، واستبدال الأجزاء الديناميكية ببيانات حقيقية.</p>
<p>وبالمناسبة، لا شيء في محرّك القوالب خاصّ بـ HTML تحديدًا، إذ يمكن استخدامه لإنتاج أيّ نتيجة نصّية. فمثلًا، تُستخدم أيضًا لإنتاج رسائل بريد إلكتروني نصّية صرفة. لكنّها عادةً ما تُستخدم لـ HTML، وأحيانًا تكون لها ميزات خاصّة بـ HTML مثل الهروب (escaping)، وهو ما يجعل من الممكن إدراج القيم في HTML دون قلق بشأن أيّ المحارف خاصّة في HTML.</p>
<h2 id="الصياغة-المدعومة">الصياغة المدعومة</h2>
<p>تختلف محرّكات القوالب في الصياغة التي تدعمها. وصياغة قوالبنا مبنيّة على Django، وهو إطار ويب شائع. وبما أنّنا ننفّذ محرّكنا في بايثون، فإنّ بعض مفاهيم بايثون ستظهر في صياغتنا. وقد رأينا بعضها من هذه الصياغة في مثالنا التجريبي في أعلى الفصل، لكنّ هذا ملخّص سريع لكل الصياغات التي سننفّذها.</p>
<p>تُدرَج البيانات من السياق باستخدام أقواس معقوفة مزدوجة:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome, {{user_name}}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>تُوفَّر البيانات المتاحة للقالب في السياق عند عرض (render) القالب. والمزيد عن ذلك لاحقًا.</p>
<p>وتوفّر محرّكات القوالب عادةً وسيلة للوصول إلى العناصر داخل البيانات باستخدام صياغة مبسّطة ومتساهلة. في بايثون، يكون لكل هذه التعبيرات (expressions) آثار مختلفة:</p>
<pre><code class="language-python"><span class="hljs-built_in">dict</span>[<span class="hljs-string">&quot;key&quot;</span>]
obj.attr
obj.method()
</code></pre>
<p>وفي صياغة قوالبنا، تُعبَّر كل هذه العمليات بنقطة:</p>
<pre><code>dict.key
obj.attr
obj.method
</code></pre>
<p>وستُتيح النقطة الوصول إلى خصائص الكائن أو قيم القاموس، وإذا كانت القيمة الناتجة قابلة للاستدعاء (callable) فسيجري استدعاؤها تلقائيًّا. وهذا يختلف عن شيفرة بايثون، إذ يحتاج هناك إلى استخدام صياغة مختلفة لهذه العمليات. ويؤدي هذا إلى صياغة قوالب أبسط:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The price is: {{product.price}}, with a {{product.discount}}% discount.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>ويمكنك استخدام دوالّ تُسمّى <em>مرشِّحات</em> (filters) لتعديل القيم. وتُستدعى المرشِّحات بشرطة عمودية:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Short name: {{story.subject|slugify|lower}}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>وعادةً ما تتطلّب الصفحات المثيرة للاهتمام قدرًا من اتخاذ القرار على الأقلّ، لذا تتوفّر الجمل الشرطية:</p>
<pre><code class="language-html">{% if user.is_logged_in %}
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome, {{ user.name }}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
{% endif %}
</code></pre>
<p>وتتيح لنا الحلقات تضمين مجموعات البيانات في صفحاتنا:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Products:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
{% for product in product_list %}
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{{ product.name }}: {{ product.price|format_price }}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
{% endfor %}
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>وكما في لغات البرمجة الأخرى، يمكن تداخل الجمل الشرطية والحلقات لبناء بٍ منطقية معقّدة.</p>
<p>وأخيرًا، كي نتمكّن من توثيق قوالبنا، تظهر التعليقات بين أقواس تحمل رموز التجزئة:</p>
<pre><code class="language-html">{# This is the best template ever! #}
</code></pre>
<h2 id="نهج-التنفيذ">نُهج التنفيذ</h2>
<p>بصورة عامة، سيكون لمحرّك القوالب مرحلتان رئيسيّتان: <em>تحليل</em> القالب، ثمّ <em>عرض</em> القالب.</p>
<p>وينطوي العرض تحديدًا على:</p>
<ul>
<li>إدارة السياق الديناميكي، وهو مصدر البيانات</li>
<li>تنفيذ عناصر المنطق</li>
<li>تنفيذ الوصول بالنقطة وتشغيل المرشِّحات</li>
</ul>
<p>والسؤال عمّا نمرّره من مرحلة التحليل إلى مرحلة العرض هو جوهر الأمر. فما الذي ينتجه التحليل ويمكن عرضه؟ هناك خياران رئيسيّان؛ وسنسمّيهما <em>التفسير</em> (interpretation) و_التصريف_ (compilation)، مستخدمَين المصطلحَين بمعنى فضفاض مأخوذ من تنفيذي لغات أخرى.</p>
<p>في نموذج التفسير، ينتج عن التحليل بنية بيانات تمثّل بنية القالب. وتمرّ مرحلة العرض على تلك بنية البيانات، مجمِّعة النصّ الناتج بناءً على التعليمات التي تجدها. وكمثال من العالم الحقيقي، يستخدم محرّك قوالب Django هذا الأسلوب.</p>
<p>في نموذج التصريف، ينتج عن التحليل شكل ما من الشيفرة القابلة للتنفيذ مباشرة. وتنفّذ مرحلة العرض تلك الشيفرة، فينتج النصّ. وJinja2 وMako مثالان على محرّكي قوالب يستخدمان نهج التصريف.</p>
<p>ويستخدم تنفيذنا للمحرّك التصريف: فنحن نصرّف القالب إلى شيفرة بايثون. وحين تُنفَّذ، تُجمِّع شيفرة بايثون النتيجة.</p>
<p>وكُتب محرّك القوالب الموصوف هنا في الأصل كجزء من coverage.py، لإنتاج تقارير HTML. وفي coverage.py، لا وجود إلّا لقواعد قليلة، تُستخدم مرارًا وتكرارًا لإنتاج عدّة ملفات من القالب نفسه. وإجمالًا، كان البرنامج أسرع تشغيلًا إذا صُرِّفت القوالب إلى شيفرة بايثون، لأنّ عملية التصريف كانت أعقد قليلًا، لكنّها لم تكن بحاجة إلّا إلى أن تُنفَّذ مرّة واحدة، في حين تُنفَّذ الشيفرة المصرَّفة مرّاتٍ كثيرة، وتكون أسرع من تفسير بنية بيانات مرّاتٍ كثيرة.</p>
<p>والتصريف إلى بايثون أعقد قليلًا، لكنّه ليس بالسوء الذي قد تظنّه. وإلى جانب ذلك، كما يستطيع أيّ مطوّر أن يخبرك، فإنّ كتابة برنامج لكتابة برنامج أمتع من كتابة برنامج!</p>
<p>ومُصرِّف القوالب الذي كتبناه مثال صغير على تقنية عامّة تُسمّى توليد الشيفرة (code generation). وتُبنى تقنيات كثيرة وقويّة ومرنة على توليد الشيفرة، بما فيها مُصرِّفات لغات البرمجة. وقد يصبح توليد الشيفرة معقّدًا، لكنّه تقنية مفيدة يُستحسن أن تكون في أدواتك.</p>
<p>وقد يفضّل تطبيق آخر للقوالب النهج المُفسَّر، إذا كانت القوالب ستُستخدم كلٍّ منها مرّاتٍ قليلة فقط. عندئذٍ لن يستردّ جهد التصريف إلى بايثون ثماره في الأمد البعيد، وقد تكون عملية تفسير أبسط أفضل إجمالًا.</p>
<h2 id="التصريف-إلى-بايثون">التصريف إلى بايثون</h2>
<p>وقبل أن نصل إلى شيفرة محرّك القوالب، لننظر إلى الشيفرة التي ينتجها. ستحوّل مرحلة التحليل القالب إلى دالة بايثون. وهذا هو قالبنا الصغير مرّة أخرى:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome, {{user_name}}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Products:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
{% for product in product_list %}
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{{ product.name }}:
        {{ product.price|format_price }}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
{% endfor %}
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>سينصرّف محرّكنا هذا القالب إلى شيفرة بايثون. وتبدو شيفرة بايثون الناتجة غير مألوفة، لأنّنا اخترنا بعض الاختصارات التي تنتج شيفرة أسرع بقليل. وهذه هي شيفرة بايثون (أُعيد تنسيقها قليلًا لأغراض القراءة):</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">render_function</span>(<span class="hljs-params">context, do_dots</span>):
    c_user_name = context[<span class="hljs-string">&#x27;user_name&#x27;</span>]
    c_product_list = context[<span class="hljs-string">&#x27;product_list&#x27;</span>]
    c_format_price = context[<span class="hljs-string">&#x27;format_price&#x27;</span>]

    result = []
    append_result = result.append
    extend_result = result.extend
    to_str = <span class="hljs-built_in">str</span>

    extend_result([
        <span class="hljs-string">&#x27;&lt;p&gt;Welcome, &#x27;</span>,
        to_str(c_user_name),
        <span class="hljs-string">&#x27;!&lt;/p&gt;\\n&lt;p&gt;Products:&lt;/p&gt;\\n&lt;ul&gt;\\n&#x27;</span>
    ])
    <span class="hljs-keyword">for</span> c_product <span class="hljs-keyword">in</span> c_product_list:
        extend_result([
            <span class="hljs-string">&#x27;\\n    &lt;li&gt;&#x27;</span>,
            to_str(do_dots(c_product, <span class="hljs-string">&#x27;name&#x27;</span>)),
            <span class="hljs-string">&#x27;:\\n        &#x27;</span>,
            to_str(c_format_price(do_dots(c_product, <span class="hljs-string">&#x27;price&#x27;</span>))),
            <span class="hljs-string">&#x27;&lt;/li&gt;\\n&#x27;</span>
        ])
    append_result(<span class="hljs-string">&#x27;\\n&lt;/ul&gt;\\n&#x27;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>.join(result)
</code></pre>
<p>ويُحوَّل كل قالب إلى دالة اسمها <code>render_function</code> تأخذ قاموس بيانات يُسمّى السياق. ويبدأ جسم الدالة بتفريغ بيانات السياق في أسماء محلّية، لأنّها أسرع عند الاستخدام المتكرّر. وتذهب كل بيانات السياق إلى متغيّرات محلّية لها البادئة <code>c_</code>، كي نتمكّن من استخدام أسماء محلّية أخرى دون خوف من التصادم.</p>
<p>وستكون نتيجة القالب سلسلة نصّية. وأسرع طريقة لبناء سلسلة نصّية من أجزاء هي إنشاء قائمة من النصوص ودمجها معًا في النهاية. وستكون <code>result</code> هي قائمة النصوص. ولأنّنا سنضيف نصوصًا إلى هذه القائمة، فإنّنا نلتقط طرقي <code>append</code> و<code>extend</code> فيها في الاسمين المحلّيَين <code>result_append</code> و<code>result_extend</code>. أمّا آخر متغيّر محلّي ننشئه فهو اختصار <code>to_str</code> للدالة المدمجة <code>str</code>.</p>
<p>وهذه الأنواع من الاختصارات غير مألوفة. فلننظر إليها عن قرب. في بايثون، يُنفَّذ استدعاء دالة على كائن مثل <code>result.append(&quot;hello&quot;)</code> في خطوتين. أولًا، تُجلب الخاصّية append من كائن النتيجة: <code>result.append</code>. ثمّ تُستدعى القيمة المُجلبَة بوصفها دالة، مع تمرير الوسيط <code>&quot;hello&quot;</code> إليها. ولئن كنا معتادين على رؤية هاتين الخطوتين تُنفَّذان معًا، فإنّهما منفصلتان حقًّا. فإذا حفظت نتيجة الخطوة الأولى، يمكنك تنفيذ الخطوة الثانية على القيمة المحفوظة. وعليه، تفعل مقتطفا بايثون هذان الأمر نفسه:</p>
<pre><code class="language-python"><span class="hljs-comment"># The way we&#x27;re used to seeing it:</span>
result.append(<span class="hljs-string">&quot;hello&quot;</span>)

<span class="hljs-comment"># But this works the same:</span>
append_result = result.append
append_result(<span class="hljs-string">&quot;hello&quot;</span>)
</code></pre>
<p>في شيفرة محرّك القوالب، فصلناها على هذا النحو كي لا نفعل الخطوة الأولى إلّا مرّة واحدة، مهما كرّرنا الخطوة الثانية. وهذا يوفّر علينا قدرًا يسيرًا من الوقت، لأنّنا نتجنّب الوقت الذي يستغرقه البحث عن الخاصّية append.</p>
<p>وهذا مثال على تحسين دقيق (micro-optimization): تقنية برمجية غير مألوفة تمنحنا تحسينات ضئيلة في السرعة. وقد تكون التحسينات الدقيقة أقلّ قابلية للقراءة، أو أكثر إرباكًا، لذا فإنّها لا تُبرَّر إلّا للشيفرة التي ثبت أنّها عنق زجاجة للأداء. ويتّفق المطورون على خلاف حول مقدار ما يُبرَّر من التحسين الدقيق، وبعض المبتدئين يفرطون فيه. وأُضيفت التحسينات هنا إلّا بعد أن أظهرت تجارب التوقيت أنّها تحسّن الأداء، وإن كان بقليل حقًّا. والتحسينات الدقيقة قد تكون تعليمية، لأنّها تستفيد من بعض جوانب بايثون الغريبة، لكنّ لا تفرط في استخدامها في شيفرتك.</p>
<p>والاختصار الخاصّ بـ <code>str</code> هو أيضًا تحسين دقيق. ويمكن أن تكون الأسماء في بايثون محلّية لدالة، أو عامّة على مستوى وحدة، أو مدمجة في بايثون. والبحث عن اسم محلّي أسرع من البحث عن اسم عامّ أو مدمج. نحن معتادون على أنّ <code>str</code> دالة مدمجة متاحة دائمًا، لكنّ بايثون لا يزال بحاجة إلى البحث عن الاسم <code>str</code> كلّما استُخدم. ووضعه في متغيّر محلّي يوفّر علينا شريحةً أخرى صغيرة من الوقت، لأنّ المحلّيّات أسرع من المدمجات.</p>
<p>وبمجرّد أن تُعرَّف تلك الاختصارات، نكون مستعدّين لأسطر بايثون المولَّدة من قالبنا المحدّد. وتُضاف النصوص إلى قائمة النتيجة باستخدام اختصاري <code>append_result</code> أو <code>extend_result</code>، تبعًا لمّا إن كان لدينا نصّ واحد نضيفه أو أكثر من ذلك. ويصبح النصّ الحرفيّ في القالب ثابتًا نصّيًّا بسيطًا.</p>
<p>ووجود الطريقَين append وextend يزيد من التعقيد، لكن تذكّر أنّنا نستهدف أسرع تنفيذ ممكن للقالب، وأنّ استخدام extend لعنصر واحد يعني إنشاء قائمة جديدة من عنصر واحد كي نمرّرها إلى extend.</p>
<p>وتُحسب التعبيرات في <code>{{ ... }}</code> وتُحوَّل إلى نصوص وتُضاف إلى النتيجة. وتُعالَج النقاط في التعبير بواسطة الدالة <code>do_dots</code> المُمرَّرة إلى دالتنا، لأنّ معنى التعبيرات المنقّطة يعتمد على البيانات الموجودة في السياق: قد يكون الوصول إلى خاصّية أو الوصول إلى عنصر، وقد يكون قابلًا للاستدعاء.</p>
<p>وتُحوَّل البنى المنطقية <code>{% if ... %}</code> و<code>{% for ... %}</code> إلى جمل وحلقات بايثون. وسيصبح التعبير في الوسم <code>{% if/for ... %}</code> هو التعبير في جملة <code>if</code> أو <code>for</code>، وسيصبح المحتوى حتى الوسم <code>{% end... %}</code> هو جسم الجملة.</p>
<!-- [[[cog from cogutil import include ]]] -->
<!-- [[[end]]] -->
<h2 id="كتابة-المحرك">كتابة المحرّك</h2>
<p>الآن بعد أن فهمنا ما سيقوم به المحرّك، لنمرّ على التنفيذ خطوةً خطوة.</p>
<h3 id="صنف-templite">صنف Templite</h3>
<p>قلب محرّك القوالب هو الصنف Templite. (أفهمها؟ إنّها template، لكنّها lite!)</p>
<p>ولدى الصنف Templite واجهة صغيرة. تنشئ كائن Templite مع نصّ القالب، ثمّ يمكنك لاحقًا استخدام الطريقة <code>render</code> عليه لعرض سياق معيّن، أي قاموس البيانات، عبر القالب:</p>
<pre><code class="language-python"><span class="hljs-comment"># Make a Templite object.</span>
templite = Templite(<span class="hljs-string">&#x27;&#x27;&#x27;
    &lt;h1&gt;Hello {{name|upper}}!&lt;/h1&gt;
    {% for topic in topics %}
        &lt;p&gt;You are interested in {{topic}}.&lt;/p&gt;
    {% endfor %}
    &#x27;&#x27;&#x27;</span>,
    {<span class="hljs-string">&#x27;upper&#x27;</span>: <span class="hljs-built_in">str</span>.upper},
)

<span class="hljs-comment"># Later, use it to render some data.</span>
text = templite.render({
    <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&quot;Ned&quot;</span>,
    <span class="hljs-string">&#x27;topics&#x27;</span>: [<span class="hljs-string">&#x27;Python&#x27;</span>, <span class="hljs-string">&#x27;Geometry&#x27;</span>, <span class="hljs-string">&#x27;Juggling&#x27;</span>],
})
</code></pre>
<p>ونمرّر نصّ القالب لحظة إنشاء الكائن كي نتمكّن من إجراء خطوة التصريف مرّة واحدة فقط، ثمّ نستدعي <code>render</code> لاحقًا عدّة مرّات لإعادة استخدام النتائج المصرَّفة.</p>
<p>كما يقبل الباني (constructor) قاموس قيم، أي سياق أوليًّا. تُخزَّن هذه القيم في كائن Templite، وتكون متاحة عند عرض القالب لاحقًا. وهي جيّدة لتعريف دوالّ أو ثوابت نريدها أن تكون متاحة في كل مكان، مثل <code>upper</code> في المثال السابق.</p>
<p>ووقبل أن نتحدّث عن تنفيذ الصنف Templite، لدينا دالّة مساعدة نعرّفها أولًا: CodeBuilder.</p>
<h3 id="codebuilder">CodeBuilder</h3>
<p>معظم العمل في محرّكنا هو تحليل القالب وإنتاج شيفرة بايثون اللازمة. ولتساعدنا في إنتاج شيفرة بايثون، لدينا الصنف CodeBuilder الذي يتولّى أعمال التتبّع والحسابات عنا أثناء بنينا لشيفرة بايثون. فهو يضيف أسطر شيفرة، ويدير المسافة البادئة، وأخيرًا يقدّم لنا القيم من شيفرة بايثون المصرَّفة.</p>
<p>ويتولّى كائن CodeBuilder واحد مجزوءًا كاملًا من شيفرة بايثون. وكما هو مستخدَم في محرّك قوالبنا، فإنّ مجزوء بايثون هو دائمًا تعريف دالة واحدة كاملة. لكنّ الصنف CodeBuilder لا يفترض أنّه سيكون دالة واحدة فقط. وهذا يجعل شيفرة CodeBuilder أكثر عمومية، وأقلّ ترابطًا ببقية شيفرة محرّك القوالب.</p>
<p>وكما سنرى، فإنّنا نستخدم أيضًا كائنات CodeBuilder متداخلة، لجعل من الممكن وضع شيفرة في بداية الدالة رغم أنّنا لا نعرف ما ستكونه حتى تكاد ننتهي.</p>
<p>ويحتفظ كائن CodeBuilder بقائمة نصوص تشكّل معًا شيفرة بايثون النهائية. والحالة الوحيدة الأخرى التي يحتاجها هي مستوى المسافة البادئة الحالي:</p>
<!-- [[[cog include("templite.py", first="class CodeBuilder", numblanks=2) ]]] -->
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">CodeBuilder</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-string">&quot;&quot;&quot;Build source code conveniently.&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, indent=<span class="hljs-number">0</span></span>):
        <span class="hljs-variable language_">self</span>.code = []
        <span class="hljs-variable language_">self</span>.indent_level = indent
</code></pre>
<!-- [[[end]]] -->
<p>ولا يفعل CodeBuilder الكثير. وتضيف <code>add_line</code> سطرًا جديدًا من الشيفرة، فتُزاح النصّ تلقائيًّا إلى مستوى المسافة البادئة الحالي، وتضيف سطرًا جديدًا:</p>
<!-- [[[cog include("templite.py", first="def add_line", numblanks=3, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_line</span>(<span class="hljs-params">self, line</span>):
        <span class="hljs-string">&quot;&quot;&quot;Add a line of source to the code.

        Indentation and newline will be added for you, don&#x27;t provide them.

        &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.code.extend([<span class="hljs-string">&quot; &quot;</span> * <span class="hljs-variable language_">self</span>.indent_level, line, <span class="hljs-string">&quot;\\n&quot;</span>])
</code></pre>
<!-- [[[end]]] -->
<p>وتزيد <code>indent</code> و<code>dedent</code> من مستوى المسافة البادئة أو تنقصانه:</p>
<!-- [[[cog include("templite.py", first="INDENT_STEP = 4", numblanks=3, dedent=False) ]]] -->
<pre><code class="language-python">    INDENT_STEP = <span class="hljs-number">4</span>      <span class="hljs-comment"># PEP8 says so!</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">indent</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Increase the current indent for following lines.&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.indent_level += <span class="hljs-variable language_">self</span>.INDENT_STEP

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">dedent</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Decrease the current indent for following lines.&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.indent_level -= <span class="hljs-variable language_">self</span>.INDENT_STEP
</code></pre>
<!-- [[[end]]] -->
<p>ويُدار <code>add_section</code> بواسطة كائن CodeBuilder آخر. وهذا يتيح لنا الاحتفاظ بمرجع إلى موضع في الشيفرة، وإضافة نصّ إليه لاحقًا. وقائمة <code>self.code</code> هي في معظمها قائمة نصوص، لكنّها ستحتفظ أيضًا بمراجع إلى هذه المقاطع:</p>
<!-- [[[cog include("templite.py", first="def add_section", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_section</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Add a section, a sub-CodeBuilder.&quot;&quot;&quot;</span>
        section = CodeBuilder(<span class="hljs-variable language_">self</span>.indent_level)
        <span class="hljs-variable language_">self</span>.code.append(section)
        <span class="hljs-keyword">return</span> section
</code></pre>
<!-- [[[end]]] -->
<p>ويُنتج <code>__str__</code> سلسلة واحدة تضمّ كل الشيفرة. وهذا ببساطة يدمج كل النصوص الموجودة في <code>self.code</code>. ولاحظ أنّه بما أنّ <code>self.code</code> قد يحتوي على مقاطع، فقد يستدعي كائنات <code>CodeBuilder</code> أخرى بشكل متكرّر:</p>
<!-- [[[cog include("templite.py", first="def __str__", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>.join(<span class="hljs-built_in">str</span>(c) <span class="hljs-keyword">for</span> c <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.code)
</code></pre>
<!-- [[[end]]] -->
<p>وتقدّم <code>get_globals</code> القيم النهائية بتنفيذ الشيفرة. فهي تحوّل الكائن إلى نصّ، وتنفّذه للحصول على تعريفاته، وتُعيد القيم الناتجة:</p>
<!-- [[[cog include("templite.py", first="def get_globals", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_globals</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Execute the code, and return a dict of globals it defines.&quot;&quot;&quot;</span>
        <span class="hljs-comment"># A check that the caller really finished all the blocks they started.</span>
        <span class="hljs-keyword">assert</span> <span class="hljs-variable language_">self</span>.indent_level == <span class="hljs-number">0</span>
        <span class="hljs-comment"># Get the Python source as a single string.</span>
        python_source = <span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>)
        <span class="hljs-comment"># Execute the source, defining globals, and return them.</span>
        global_namespace = {}
        <span class="hljs-built_in">exec</span>(python_source, global_namespace)
        <span class="hljs-keyword">return</span> global_namespace
</code></pre>
<!-- [[[end]]] -->
<p>وتستخدم هذه الطريقة الأخيرة بعض سمات بايثون الغريبة. فالدالة <code>exec</code> تنفّذ سلسلة تحتوي على شيفرة بايثون. والوسيط الثاني لـ <code>exec</code> هو قاموس يجمع المتغيّرات العامة (globals) التي عرّفتها الشيفرة. فمثلًا، إن فعلنا ما يلي:</p>
<pre><code class="language-python">python_source = <span class="hljs-string">&quot;&quot;&quot;\\
SEVENTEEN = 17

def three():
    return 3
&quot;&quot;&quot;</span>
global_namespace = {}
<span class="hljs-built_in">exec</span>(python_source, global_namespace)
</code></pre>
<p>فإنّ <code>global_namespace['SEVENTEEN']</code> يساوي 17، و<code>global_namespace['three']</code> هو دالة حقيقية اسمها <code>three</code>.</p>
<p>ولئن كنّا نستخدم CodeBuilder لإنتاج دالة واحدة فقط، فلا شيء هنا يحدّه بهذا الاستخدام. وهذا يجعل الصنف أبسط في التنفيذ وأسهل في الفهم.</p>
<p>ويتيح لنا CodeBuilder إنشاء مجزوء من شيفرة بايثون المصدرية، ولا يملك أيّ معرفة محدّدة بمحرّك القوالب لدينا إطلاقًا. يمكننا استخدامه بحيث تُعرَّف في بايثون ثلاث دوالّ مختلفة، ثمّ تُعيد <code>get_globals</code> قاموسًا من ثلاث قيم، وهي الدوالّ الثلاث. وبمناسبة الحديث، فإنّ محرّك قوالبنا لا يحتاج إلّا إلى تعريف دالة واحدة. لكنّ تصميم برمجيات أفضل أن نُبقي تفصيل التنفيذ هذا داخل شيفرة محرّك القوالب، وأن نُخرجه من صنف CodeBuilder.</p>
<p>ولئن كنّا نستخدمه فعلًا—لتعريف دالة واحدة—فإنّ جعل <code>get_globals</code> تُعيد القاموس يُبقي الشيفرة أكثر ترابطًا (modular)، لأنّها لا تحتاج إلى معرفة اسم الدالة التي عرّفناها. فأيًّا كان اسم الدالة الذي نعرّفه في شيفرة بايثون المصدرية، يمكننا استرجاع ذلك الاسم من القاموس الذي تُعيده <code>get_globals</code>.</p>
<p>والآن يمكننا الانتقال إلى تنفيذ صنف Templite نفسه، ورؤية كيفية استخدام CodeBuilder وأين يُستخدم.</p>
<h3 id="تنفيذ-صنف-templite">تنفيذ صنف Templite</h3>
<p>ومعظم شيفرتنا موجود في صنف Templite. وكما ناقشنا، لديه مرحلة تصريف ومرحلة عرض.</p>
<h4>التصريف</h4>
<p>ويجري كل العمل اللازم لتصريف القالب إلى دالة بايثون داخل باني الصنف Templite. أولًا تُحفظ السياقات جانبًا:</p>
<!-- [[[cog include("templite.py", first="def __init__(self, text, ", numblanks=3, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, text, *contexts</span>):
        <span class="hljs-string">&quot;&quot;&quot;Construct a Templite with the given \`text\`.

        \`contexts\` are dictionaries of values to use for future renderings.
        These are good for filters and global values.

        &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.context = {}
        <span class="hljs-keyword">for</span> context <span class="hljs-keyword">in</span> contexts:
            <span class="hljs-variable language_">self</span>.context.update(context)
</code></pre>
<!-- [[[end]]] -->
<p>ولاحظ أنّنا استخدمنا <code>*contexts</code> كوسيط. وتشير النجمة إلى أنّ أيّ عدد من الوسائط الموضعية سيُحزَم في طور (tuple) ويُمرَّر باسم <code>contexts</code>. ويُسمّى هذا تفريغ الوسائط (argument unpacking)، ويعني أنّ المُستدعي يمكنه تقديم عدد من قاموسات السياقات المختلفة. والآن، أيّ من هذه الاستدعاءات صالح:</p>
<pre><code class="language-python">t = Templite(template_text)
t = Templite(template_text, context1)
t = Templite(template_text, context1, context2)
</code></pre>
<p>وتُقدَّم وسائط السياق (إن وُجدت) إلى الباني على هيئة طور من السياقات. يمكننا عندئذٍ المرور على طور <code>contexts</code>، والتعامل مع كلٍّ منها بالترتيب. ونكتفي ببساطة بإنشاء قاموس واحد مدمج اسمه <code>self.context</code> يحوي محتويات جميع السياقات المقدَّمة. وإذا قدُّمت أسماء مكرّرة في السياقات، فالأخير هو الفائز.</p>
<p>ولجعل دالتنا المصرَّفة في أقصى درجة من السرعة، نستخرج متغيّرات السياق إلى متغيّرات بايثون محلّية. وسنحصل على تلك الأسماء بالاحتفاظ بمجموعة من أسماء المتغيّرات التي نصادفها، لكنّنا نحتاج أيضًا إلى تتبّع أسماء المتغيّرات المعرَّفة في القالب، أي متغيّرات الحلقة:</p>
<!-- [[[cog include("templite.py", first="self.all_vars", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-variable language_">self</span>.all_vars = <span class="hljs-built_in">set</span>()
        <span class="hljs-variable language_">self</span>.loop_vars = <span class="hljs-built_in">set</span>()
</code></pre>
<!-- [[[end]]] -->
<p>وسنرى لاحقًا كيف تُستخدم هذه المجموعة للمساعدة في بناء مقدّمة (prologue) دالتنا. أولًا، سنستخدم الصنف CodeBuilder الذي كتبناه سابقًا لنبدأ ببناء دالتنا المصرَّفة:</p>
<!-- [[[cog include("templite.py", first="code = CodeBuilder", numblanks=2, dedent=False) ]]] -->
<pre><code class="language-python">        code = CodeBuilder()

        code.add_line(<span class="hljs-string">&quot;def render_function(context, do_dots):&quot;</span>)
        code.indent()
        vars_code = code.add_section()
        code.add_line(<span class="hljs-string">&quot;result = []&quot;</span>)
        code.add_line(<span class="hljs-string">&quot;append_result = result.append&quot;</span>)
        code.add_line(<span class="hljs-string">&quot;extend_result = result.extend&quot;</span>)
        code.add_line(<span class="hljs-string">&quot;to_str = str&quot;</span>)
</code></pre>
<!-- [[[end]]] -->
<p>وهنا نبني كائن CodeBuilder ونبدأ بكتابة أسطر فيه. وستُسمّى دالتنا في بايثون <code>render_function</code>، وستأخذ وسيطين: <code>context</code> هو قاموس البيانات الذي ينبغي أن تستخدمه، و<code>do_dots</code> هي دالة تنفّذ الوصول إلى الخصائص بالنقطة.</p>
<p>والسياق هنا هو دمج بين سياق البيانات الممرَّر إلى باني Templite وسياق البيانات الممرَّر إلى دالة العرض. وهو المجموعة الكاملة من البيانات المتاحة للقالب، وقد أنشأناها في باني Templite.</p>
<p>ولاحظ أنّ CodeBuilder بسيط جدًّا: فهو لا «يعرف» شيئًا عن تعريفات الدوالّ، بل عن أسطر الشيفرة فقط. وهذا يُبقي CodeBuilder بسيطًا، سواء في تنفيذه أو في استخدامه. يمكننا قراءة الشيفرة المولَّدة هنا دون أن نضطر إلى استيعاب ذهني لكائنات CodeBuilder متخصّصة أكثر مما ينبغي.</p>
<p>وننشئ مقطعًا اسمه <code>vars_code</code>. وسنكتب لاحقًا أسطر استخراج المتغيّرات في ذلك المقطع. ويتيح لنا كائن <code>vars_code</code> أن نحتفظ بموضع في الدالة يمكن ملؤه لاحقًا حين تتوفّر لدينا المعلومات التي نحتاجها.</p>
<p>ثمّ تُكتب أربعة أسطر ثابتة، تعرّف قائمة النتائج، واختصارات لطريقة الإلحاق بها أو توسيعها، واختصارًا للدالة المدمجة <code>str()</code>. وكما ناقشنا سابقًا، فإنّ هذه الخطوة الغريبة تستخرج قدرًا أكبر قليلًا من الأداء من دالة العرض لدينا.</p>
<p>والسبب في وجود اختصارَي <code>append</code> و<code>extend</code> معًا هو كي نتمكّن من استخدام الطريقة الأكثر فاعلية، تبعًا لمّا إن كان لدينا سطر واحد نضيفه إلى نتيجتنا أو أكثر من ذلك.</p>
<p>وبعد ذلك نعرّف دالة داخلية تساعدنا في تخزين نصوص المخرجات مؤقتًا (buffering):</p>
<!-- [[[cog include("templite.py", first="buffered =", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">        buffered = []
        <span class="hljs-keyword">def</span> <span class="hljs-title function_">flush_output</span>():
            <span class="hljs-string">&quot;&quot;&quot;Force \`buffered\` to the code builder.&quot;&quot;&quot;</span>
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(buffered) == <span class="hljs-number">1</span>:
                code.add_line(<span class="hljs-string">&quot;append_result(%s)&quot;</span> % buffered[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">elif</span> <span class="hljs-built_in">len</span>(buffered) &gt; <span class="hljs-number">1</span>:
                code.add_line(<span class="hljs-string">&quot;extend_result([%s])&quot;</span> % <span class="hljs-string">&quot;, &quot;</span>.join(buffered))
            <span class="hljs-keyword">del</span> buffered[:]
</code></pre>
<!-- [[[end]]] -->
<p>ننشئ مجزوءات من المخرجات يجب أن تدخل في دالتنا المصرَّفة، فنحتاج إلى تحويلها إلى استدعاءات دوالّ تُلحق بنتيجتنا. ونودّ أن ندمج استدعاءات الإلحاق المتكرّرة في استدعاء extend واحد. وهذه تحسينٌ دقيق آخر. ولإتاحة ذلك، فإنّنا نخزّن المجزوءات مؤقتًا.</p>
<p>وتحمل قائمة <code>buffered</code> نصوصًا لم تُكتب بعد في شيفرة دالتنا المصدرية. ومع تقدّم تصريف القالب، سنُلحق نصوصًا بـ <code>buffered</code>، ونفرغها في شيفرة الدالة حين نصل إلى نقاط تدفّق التحكم، مثل جمل <code>if</code>، أو بدايات الحلقات أو نهاياتها.</p>
<p>ودالة <code>flush_output</code> هي <em>إغلاق</em> (closure)، وهي كلمة فاخرة تعني دالة تشير إلى متغيّرات خارج نفسها. هنا تشير <code>flush_output</code> إلى <code>buffered</code> و<code>code</code>. وهذا يُبسّط استدعاءاتنا للدالة: لا نحتاج إلى أن نخبر <code>flush_output</code> ما المخزن المؤقت الذي يفرغه، ولا أين يفرغه؛ فهي تعرف ذلك كلّه ضمنًا.</p>
<p>وإذا لم يكن هناك إلّا نصّ واحد مخزَّن مؤقتًا، فإنّ اختصار <code>append_result</code> يُستخدم لإلحاقه بالنتيجة. وإذا خُزِّن أكثر من نصّ، فإنّ اختصار <code>extend_result</code> يُستخدم بكلّها لإضافتها إلى النتيجة. ثمّ تُفرَغ القائمة المؤقتة كي يتسنّ تخزين نصوص أكثر مؤقتًا.</p>
<p>وستضيف بقية شيفرة التصريف أسطرًا إلى الدالة بإلحاقها بـ <code>buffered</code>، ثمّ تستدعي في النهاية <code>flush_output</code> لكتابتها إلى CodeBuilder.</p>
<p>وبوجود هذه الدالة في مكانها، يمكننا وضع سطر شيفرة في مُصرِّفنا بهذا الشكل:</p>
<pre><code class="language-python">buffered.append(<span class="hljs-string">&quot;&#x27;hello&#x27;&quot;</span>)
</code></pre>
<p>\\noindent أي أنّ دالة بايثون المصرَّفة لدينا ستحتوي على هذا السطر:</p>
<pre><code class="language-python">append_result(<span class="hljs-string">&#x27;hello&#x27;</span>)
</code></pre>
<p>\\noindent أي أنّه سيضيف النصّ <code>hello</code> إلى المخرجات المعروضة للقالب. ولدينا هنا عدّة مستويات من التجريد قد يكون من الصعب إبقاءها في الحسبان. ويستخدم المُصرِّف \\newline <code>buffered.append(&quot;'hello'&quot;)</code>، الذي يُنشئ <code>append_result('hello')</code> في دالة بايثون المصرَّفة، والتي حين تُنفَّذ تُلحق <code>hello</code> بنتيجة القالب.</p>
<p>ونعد إلى صنف Templite. وبينما نحلل بنى تدفّق التحكم، نودّ التحقّق من أنّها متداخلة على نحو صحيح. وقائمة <code>ops_stack</code> هي مكدّس من النصوص:</p>
<!-- [[[cog include("templite.py", first="ops_stack", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">        ops_stack = []
</code></pre>
<!-- [[[end]]] -->
<p>وحين نصادف وسمًا مثل <code>{% if .. %}</code>، سندفع <code>'if'</code> إلى المكدّس. وحين نجد وسم <code>{% endif %}</code>، يمكننا إخراج العنصر الأقصى من المكدّس والإبلاغ عن خطأ إن لم يكن هناك <code>'if'</code> في قمة المكدّس.</p>
<p>والآن يبدأ التحليل الحقيقي. نقسّم نصّ القالب إلى عدد من الرموز (tokens) باستخدام تعبير نمطي (regular expression)، أو <em>regex</em>. وقد تكون التعبيرات النمطية مخيفة: فهي ترميز مضغوط جدًّا لمطابقة الأنماط المعقّدة. وهي أيضًا شديدة الكفاءة، لأنّ تعقيد مطابقة النمط مُنفَّذ بلغة C داخل محرّك التعبيرات النمطية، لا داخل شيفرة بايثون الخاصة بك. وهذا هو تعبيرنا النمطي:</p>
<!-- [[[cog include("templite.py", first="tokens =", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">        tokens = re.split(<span class="hljs-string">r&quot;(?s)({{.*?}}|{%.*?%}|{#.*?#})&quot;</span>, text)
</code></pre>
<!-- [[[end]]] -->
<p>ويبدو هذا معقّدًا؛ لنفكّكه.</p>
<p>وستقسّم الدالة <code>re.split</code> سلسلة باستخدام تعبير نمطي. ونمطنا محاط بأقواس، لذا ستُستخدم المطابقات لتقسيم السلسلة، وستُعاد أيضًا كقطع في قائمة التقسيم. وسيطابق نمطنا صياغات الوسوم لدينا، لكنّنا أحطناه بأقواس كي تُقسَّم السلسلة عند الوسوم، وتُعاد الوسوم أيضًا.</p>
<p>وتعني الراية <code>(?s)</code> في التعبير النمطي أنّ النقطة يجب أن تطابق حتّى سطرًا جديدًا. وبعد ذلك لدينا مجموعتنا المحاطة بأقواس من ثلاثة بدائل: <code>{{.*?}}</code> يطابق تعبيرًا، و<code>{%.*?%}</code> يطابق وسمًا، و<code>{#.*?#}</code> يطابق تعليقًا. وفي جميع هذه نستخدم <code>.*?</code> لمطابقة أيّ عدد من المحارف، لكن بأقصر تسلسل يُطابق.</p>
<p>ونتيجة <code>re.split</code> هي قائمة من النصوص. فمثلًا، نصّ القالب التالي:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Topics for {{name}}: {% for t in topics %}{{t}}, {% endfor %}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
<p>سيُقسَّم إلى هذه القطع:</p>
<pre><code class="language-python">[
    <span class="hljs-string">&#x27;&lt;p&gt;Topics for &#x27;</span>,               <span class="hljs-comment"># literal</span>
    <span class="hljs-string">&#x27;{{name}}&#x27;</span>,                     <span class="hljs-comment"># expression</span>
    <span class="hljs-string">&#x27;: &#x27;</span>,                           <span class="hljs-comment"># literal</span>
    <span class="hljs-string">&#x27;{% for t in topics %}&#x27;</span>,        <span class="hljs-comment"># tag</span>
    <span class="hljs-string">&#x27;&#x27;</span>,                             <span class="hljs-comment"># literal (empty)</span>
    <span class="hljs-string">&#x27;{{t}}&#x27;</span>,                        <span class="hljs-comment"># expression</span>
    <span class="hljs-string">&#x27;, &#x27;</span>,                           <span class="hljs-comment"># literal</span>
    <span class="hljs-string">&#x27;{% endfor %}&#x27;</span>,                 <span class="hljs-comment"># tag</span>
    <span class="hljs-string">&#x27;&lt;/p&gt;&#x27;</span>                          <span class="hljs-comment"># literal</span>
]
</code></pre>
<p>وبمجرّد أن يُقسَّم النصّ إلى رموز على هذا النحو، يمكننا المرور على الرموز في حلقة، والتعامل مع كلٍّ منها على حدة. وبتقسيمها تبعًا لنوعها، يمكننا معالجة كل نوع على حدة.</p>
<p>وشيفرة التصريف هي حلقة تمرّ على هذه الرموز:</p>
<!-- [[[cog include("templite.py", first="for token", numlines=1, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> tokens:
</code></pre>
<!-- [[[end]]] -->
<p>ويُفحص كل رمز لمعرفة أيّ الحالات الأربع ينتمي إليها. يكفي النظر إلى المحرفين الأوّلين. والحالة الأولى هي تعليق، وهي سهلة المعالجة: تجاهله ببساطة والانتقال إلى الرمز التالي:</p>
<!-- [[[cog include("templite.py", first="if token.", numlines=3, dedent=False) ]]] -->
<pre><code class="language-python">            <span class="hljs-keyword">if</span> token.startswith(<span class="hljs-string">&#x27;{#&#x27;</span>):
                <span class="hljs-comment"># Comment: ignore it and move on.</span>
                <span class="hljs-keyword">continue</span>
</code></pre>
<!-- [[[end]]] -->
<p>وفي حالة تعبيرات <code>{{...}}</code>، نزيل القوسين الأماميين والخلفيين، ونزيل المسافات البيضاء، ونمرّر التعبير كاملًا إلى <code>_expr_code</code>:</p>
<!-- [[[cog include("templite.py", first="elif token.startswith('{{')", numlines=4, dedent=False) ]]] -->
<pre><code class="language-python">            <span class="hljs-keyword">elif</span> token.startswith(<span class="hljs-string">&#x27;{{&#x27;</span>):
                <span class="hljs-comment"># An expression to evaluate.</span>
                expr = <span class="hljs-variable language_">self</span>._expr_code(token[<span class="hljs-number">2</span>:-<span class="hljs-number">2</span>].strip())
                buffered.append(<span class="hljs-string">&quot;to_str(%s)&quot;</span> % expr)
</code></pre>
<!-- [[[end]]] -->
<p>وستصرّف الدالة <code>_expr_code</code> تعبير القالب إلى تعبير بايثون. وسنرى تلك الدالة لاحقًا. ونستخدم الدالة <code>to_str</code> لإجبار قيمة التعبير على أن تكون نصًّا، وإضافتها إلى نتيجتنا.</p>
<p>والحالة الثالثة هي الكبيرة: وسوم <code>{% ... %}</code>. وهذه بنى تدفّق تحكم ستتحوّل إلى بنى تدفّق تحكم في بايثون. أولًا علينا تفريغ أسطر المخرجات المخزَّنة مؤقتًا، ثمّ نستخرج قائمة كلمات من الوسم:</p>
<!-- [[[cog include("templite.py", first="elif token.startswith('{%')", numlines=4, dedent=False) ]]] -->
<pre><code class="language-python">            <span class="hljs-keyword">elif</span> token.startswith(<span class="hljs-string">&#x27;{%&#x27;</span>):
                <span class="hljs-comment"># Action tag: split into words and parse further.</span>
                flush_output()
                words = token[<span class="hljs-number">2</span>:-<span class="hljs-number">2</span>].strip().split()
</code></pre>
<!-- [[[end]]] -->
<p>والآن لدينا ثلاث حالات فرعية، بناءً على الكلمة الأولى في الوسم: <code>if</code> أو <code>for</code> أو <code>end</code>. وتُظهر حالة <code>if</code> معالجتنا البسيطة للأخطاء وتوليدنا للشيفرة:</p>
<!-- [[[cog include("templite.py", first="if words[0] == 'if'", numlines=7, dedent=False) ]]] -->
<pre><code class="language-python">                <span class="hljs-keyword">if</span> words[<span class="hljs-number">0</span>] == <span class="hljs-string">&#x27;if&#x27;</span>:
                    <span class="hljs-comment"># An if statement: evaluate the expression to determine if.</span>
                    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(words) != <span class="hljs-number">2</span>:
                        <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Don&#x27;t understand if&quot;</span>, token)
                    ops_stack.append(<span class="hljs-string">&#x27;if&#x27;</span>)
                    code.add_line(<span class="hljs-string">&quot;if %s:&quot;</span> % <span class="hljs-variable language_">self</span>._expr_code(words[<span class="hljs-number">1</span>]))
                    code.indent()
</code></pre>
<!-- [[[end]]] -->
<p>وينبغي أن يحتوي وسم <code>if</code> على تعبير واحد، لذا ينبغي أن تحتوي قائمة <code>words</code> على عنصرين فقط. وإن لم يكن كذلك، فإنّنا نستخدم الدالة المساعدة <code>_syntax_error</code> لرمي استثناء خطأ نحوي. وندفع <code>'if'</code> إلى <code>ops_stack</code> كي نتمكّن من التحقّق من وسم <code>endif</code>. ويُصرَّف الجزء التعبيري من وسم <code>if</code> إلى تعبير بايثون بواسطة <code>_expr_code</code>، ويُستخدم كتعبير شرطي في جملة <code>if</code> في بايثون.</p>
<p>والنوع الثاني من الوسوم هو <code>for</code>، وسيُصرَّف إلى جملة <code>for</code> في بايثون:</p>
<!-- [[[cog include("templite.py", first="elif words[0] == 'for'", numlines=13, dedent=False) ]]] -->
<pre><code class="language-python">                <span class="hljs-keyword">elif</span> words[<span class="hljs-number">0</span>] == <span class="hljs-string">&#x27;for&#x27;</span>:
                    <span class="hljs-comment"># A loop: iterate over expression result.</span>
                    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(words) != <span class="hljs-number">4</span> <span class="hljs-keyword">or</span> words[<span class="hljs-number">2</span>] != <span class="hljs-string">&#x27;in&#x27;</span>:
                        <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Don&#x27;t understand for&quot;</span>, token)
                    ops_stack.append(<span class="hljs-string">&#x27;for&#x27;</span>)
                    <span class="hljs-variable language_">self</span>._variable(words[<span class="hljs-number">1</span>], <span class="hljs-variable language_">self</span>.loop_vars)
                    code.add_line(
                        <span class="hljs-string">&quot;for c_%s in %s:&quot;</span> % (
                            words[<span class="hljs-number">1</span>],
                            <span class="hljs-variable language_">self</span>._expr_code(words[<span class="hljs-number">3</span>])
                        )
                    )
                    code.indent()
</code></pre>
<!-- [[[end]]] -->
<p>نُجري فحصًا للصياغة وندفع <code>'for'</code> إلى المكدّس. تتحقّق الدالة <code>_variable</code> من صياغة المتغيّر، وتضيفه إلى المجموعة التي نقدّمها. وهكذا نجمع أسماء جميع المتغيّرات أثناء التصريف. وسنحتاج لاحقًا إلى كتابة مقدّمة دالتنا، حيث سنفرّغ جميع أسماء المتغيّرات التي نحصل عليها من السياق. ولإجراء ذلك على نحو صحيح، نحتاج إلى معرفة أسماء جميع المتغيّرات التي صادفناها، وهي <code>self.all_vars</code>، وأسماء جميع المتغيّرات التي تعرّفها الحلقات، وهي <code>self.loop_vars</code>.</p>
<p>ونضيف سطرًا واحدًا إلى شيفرة دالتنا، وهي جملة <code>for</code>. وكلّ متغيّرات قالبنا تتحوّل إلى متغيّرات بايثون عبر البادئة <code>c_</code>، كي نعرف أنّها لن تتعارض مع أسماء أخرى نستخدمها في دالتنا المكتوبة بـ بايثون. ونستخدم <code>_expr_code</code> لتصريف تعبير التكرار من القالب إلى تعبير تكرار في بايثون.</p>
<p>والنوع الأخير من الوسوم الذي نتعامل معه هو وسم <code>end</code>؛ سواء <code>{% endif %}</code> أو <code>{% endfor %}</code>. والأثر في شيفرة دالتنا المصرَّفة هو نفسه: فقط انزع المسافة البادئة لإنهاء جملة <code>if</code> أو <code>for</code> التي بدأت في وقت سابق:</p>
<!-- [[[cog include("templite.py", first="elif words[0].startswith('end')", numlines=11, dedent=False) ]]] -->
<pre><code class="language-python">                <span class="hljs-keyword">elif</span> words[<span class="hljs-number">0</span>].startswith(<span class="hljs-string">&#x27;end&#x27;</span>):
                    <span class="hljs-comment"># Endsomething.  Pop the ops stack.</span>
                    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(words) != <span class="hljs-number">1</span>:
                        <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Don&#x27;t understand end&quot;</span>, token)
                    end_what = words[<span class="hljs-number">0</span>][<span class="hljs-number">3</span>:]
                    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> ops_stack:
                        <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Too many ends&quot;</span>, token)
                    start_what = ops_stack.pop()
                    <span class="hljs-keyword">if</span> start_what != end_what:
                        <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Mismatched end tag&quot;</span>, end_what)
                    code.dedent()
</code></pre>
<!-- [[[end]]] -->
<p>ولاحظ هنا أنّ العمل الفعلي اللازم لوسم end هو سطر واحد: إزالة المسافة البادئة عن شيفرة الدالة. وبقيّة هذه الشقّة كلّها فحص أخطاء للتأكّد من أنّ القالب مُشكَّل على نحو صحيح. وهذا ليس بأمر غير مألوف في شيفرة ترجمة البرامج.</p>
<p>ولأنّنا نتحدّث عن معالجة الأخطاء، فإنّ كان الوسم ليس <code>if</code> ولا <code>for</code> ولا <code>end</code>، فإنّنا لا نعرف ما هو، لذا نرمي خطأ نحويًّا:</p>
<!-- [[[cog include("templite.py", first="else:", numlines=2, dedent=False) ]]] -->
<pre><code class="language-python">                <span class="hljs-keyword">else</span>:
                    <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Don&#x27;t understand tag&quot;</span>, words[<span class="hljs-number">0</span>])
</code></pre>
<!-- [[[end]]] -->
<p>وانتهينا من الصياغات الخاصّة الثلاث المختلفة (<code>{{...}}</code> و<code>{#...#}</code> و<code>{%...%}</code>). والمتبقي هو المحتوى الحرفيّ. وسنضيف النصّ الحرفيّ إلى المخرجات المخزَّنة مؤقتًا، مستخدمَين الدالة المدمجة <code>repr</code> لإنتاج ثابت نصّي في بايثون للرمز:</p>
<!-- [[[cog include("templite.py", first="else:", after="Don't understand tag", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">            <span class="hljs-keyword">else</span>:
                <span class="hljs-comment"># Literal content.  If it isn&#x27;t empty, output it.</span>
                <span class="hljs-keyword">if</span> token:
                    buffered.append(<span class="hljs-built_in">repr</span>(token))
</code></pre>
<!-- [[[end]]] -->
<p>ولو لم نستخدم <code>repr</code>، لسقطنا عند أسطر مثل هذه في دالتنا المصرَّفة:</p>
<pre><code class="language-python">append_result(abc)      <span class="hljs-comment"># Error! abc isn&#x27;t defined</span>
</code></pre>
<p>ونحتاج إلى أن تكون القيمة بين علامتي تنصيص هكذا:</p>
<pre><code class="language-python">append_result(<span class="hljs-string">&#x27;abc&#x27;</span>)
</code></pre>
<p>وتقدّم الدالة <code>repr</code> علامات الاقتباس حول النصّ نيابةً عنا، وتوفّر أيضًا الشرطات المائلة العكسية حيث يلزم:</p>
<pre><code class="language-python">append_result(<span class="hljs-string">&#x27;&quot;Don\\&#x27;t you like my hat?&quot; he asked.&#x27;</span>)
</code></pre>
<p>ولاحظ أنّنا نتحقّق أولًا ممّا إذا كان الرمز نصًّا فارغًا باستخدام <code>if token:</code>، لأنّه لا فائدة من إضافة نصّ فارغ إلى المخرجات. ولأنّ تعبيرنا النمطي يقسم عند صياغة الوسوم، فإنّ الوسوم المتجاورة سيكون بينهما رمز فارغ. وهذا الفحص هنا طريقة سهلة لتجنّب وضع جمل <code>append_result(&quot;&quot;)</code> عديمة الفائدة في دالتنا المصرَّفة.</p>
<p>وبهذا تكتمل الحلقة على جميع رموز القالب. وحين تنتهي الحلقة، يكون القالب كلّه قد جرى معالجته. ولدينا فحص أخير علينا إجراؤه: إن لم تكن <code>ops_stack</code> فارغة، فيجب أن يكون ينقصنا وسم end. ثمّ نفرّغ المخرجات المخزَّنة مؤقتًا في شيفرة الدالة:</p>
<!-- [[[cog include("templite.py", first="if ops_stack:", numblanks=2, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-keyword">if</span> ops_stack:
            <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Unmatched action tag&quot;</span>, ops_stack[-<span class="hljs-number">1</span>])

        flush_output()
</code></pre>
<!-- [[[end]]] -->
<p>وكان قد أُنشئ في بداية الدالة مقطع. وكان دوره تفريغ متغيّرات القالب من السياق إلى متغيّرات بايثون محلّية. والآن بعد أن عالجنا القالب كلّه، نعرف أسماء جميع المتغيّرات، يمكننا كتابة الأسطر في هذه المقدّمة.</p>
<p>وعلينا أن نعمل قليلًا لمعرفة الأسماء التي نحتاج إلى تعريفها. ولنتّفق على قالبنا النموذجي:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Welcome, {{user_name}}!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Products:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
{% for product in product_list %}
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{{ product.name }}:
        {{ product.price|format_price }}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
{% endfor %}
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>وهناك متغيّران مستخدَمان هنا، وهما <code>user_name</code> و<code>product</code>. وستحتوي مجموعة <code>all_vars</code> على الاسمين معًا، لأنّ كليهما مستخدَم في تعبيرات <code>{{...}}</code>. لكن <code>user_name</code> وحده هو ما يحتاج إلى الاستخراج من السياق في المقدّمة، لأنّ <code>product</code> معرَّف بواسطة الحلقة.</p>
<p>وكل المتغيّرات المستخدَمة في القالب موجودة في المجموعة <code>all_vars</code>، وكل المتغيّرات المعرَّفة في القالب موجودة في <code>loop_vars</code>. وقد رُسمت جميع الأسماء الموجودة في <code>loop_vars</code> أصلًا في الشيفرة لأنّها مستخدَمة في الحلقات. إذن نحتاج إلى تفريغ أي اسم في <code>all_vars</code> ليس في <code>loop_vars</code>:</p>
<!-- [[[cog include("templite.py", first="for var_name", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-keyword">for</span> var_name <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.all_vars - <span class="hljs-variable language_">self</span>.loop_vars:
            vars_code.add_line(<span class="hljs-string">&quot;c_%s = context[%r]&quot;</span> % (var_name, var_name))
</code></pre>
<!-- [[[end]]] -->
<p>ويصبح كل اسم سطرًا في مقدّمة الدالة، يفرّغ متغيّر السياق في متغيّر محلّي باسم مناسب.</p>
<p>ونحن على وشك الانتهاء من تصريف القالب إلى دالة بايثون. وقد كانت دالتنا تُلحق نصوصًا بـ <code>result</code>، لذا فإنّ السطر الأخير من الدالة هو ببساطة دمجها كلّها وإعادتها:</p>
<!-- [[[cog include("templite.py", first='code.add_line("return', numlines=2, dedent=False) ]]] -->
<pre><code class="language-python">        code.add_line(<span class="hljs-string">&quot;return &#x27;&#x27;.join(result)&quot;</span>)
        code.dedent()
</code></pre>
<!-- [[[end]]] -->
<p>والآن بعد أن فرغنا من كتابة المصدر لدالتنا المصرَّفة في بايثون، نحتاج إلى الحصول على الدالة نفسها من كائن CodeBuilder لدينا. وتُنفّذ الدالة <code>get_globals</code> شيفرة بايثون التي كنّا نجمّعها. وتذكّر أنّ شيفرتنا هي تعريف دالة (يبدأ بـ <code>def render_function(..):</code>)، لذا فإنّ تنفيذ الشيفرة سيعرّف <code>render_function</code>، لكنّه لن ينفّذ جسم <code>render_function</code>.</p>
<p>ونتيجة <code>get_globals</code> هي قاموس القيم المعرَّفة في الشيفرة. ونلتقط قيمة <code>render_function</code> منه، ونحفظها كخاصّية في كائن Templite لدينا:</p>
<!-- [[[cog include("templite.py", first="self._render_function =", numlines=1, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-variable language_">self</span>._render_function = code.get_globals()[<span class="hljs-string">&#x27;render_function&#x27;</span>]
</code></pre>
<!-- [[[end]]] -->
<p>والآن أصبحت <code>self._render_function</code> دالة بايثون قابلة للاستدعاء. وسنستخدمها لاحقًا، أثناء مرحلة العرض.</p>
<h4>تصريف التعبيرات</h4>
<p>ولم نَرَ بعد جزءًا مهمًّا من عملية التصريف: الدالة <code>_expr_code</code> التي تصرّف تعبير قالب إلى تعبير بايثون. ويمكن أن تكون تعبيرات قالبنا ببساطة اسمًا واحدًا:</p>
<pre><code>{{user_name}}
</code></pre>
<p>\\noindent أو يمكن أن تكون تسلسلًا معقّدًا من عمليات الوصول إلى الخصائص والمرشِّحات:</p>
<pre><code>{{user.name.localized|upper|escape}}
</code></pre>
<p>وستتعامل دالتنا <code>_expr_code</code> مع كل هذه الاحتمالات. وكما في التعبيرات في أيّ لغة، تُبنى تعبيراتنا بشكل متكرّر: فالتعبيرات الكبيرة تتكوّن من تعبيرات أصغر. والتعبير الكامل مفصول بعلامات الأنبوب، حيث تكون القطعة الأولى مفصولة بنقاط، وهكذا. لذا تأخذ دالتنا صيغة متكرّرة بشكل طبيعي:</p>
<!-- [[[cog include("templite.py", first="def _expr_code", numlines=2, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_expr_code</span>(<span class="hljs-params">self, expr</span>):
        <span class="hljs-string">&quot;&quot;&quot;Generate a Python expression for \`expr\`.&quot;&quot;&quot;</span>
</code></pre>
<!-- [[[end]]] -->
<p>والحالة الأولى التي يجب التفكير فيها هي أنّ تعبيرنا يحتوي على أنابيب. وإن كان كذلك، فإنّنا نقسّمه إلى قائمة من القطع المفصولة بأنابيب. وتُمرَّر القطعة الأولى بشكل متكرّر إلى <code>_expr_code</code> لتحويلها إلى تعبير بايثون.</p>
<!-- [[[cog include("templite.py", first="if ", after="def _expr_code", numlines=6, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;|&quot;</span> <span class="hljs-keyword">in</span> expr:
            pipes = expr.split(<span class="hljs-string">&quot;|&quot;</span>)
            code = <span class="hljs-variable language_">self</span>._expr_code(pipes[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">for</span> func <span class="hljs-keyword">in</span> pipes[<span class="hljs-number">1</span>:]:
                <span class="hljs-variable language_">self</span>._variable(func, <span class="hljs-variable language_">self</span>.all_vars)
                code = <span class="hljs-string">&quot;c_%s(%s)&quot;</span> % (func, code)
</code></pre>
<!-- [[[end]]] -->
<p>وكل قطعة من القطع المتبقّية المفصولة بأنابيب هي اسم دالة. وتمرّ القيمة عبر تلك الدالة لإنتاج القيمة النهائية. وكل اسم دالة هو متغيّر يُضاف إلى <code>all_vars</code> كي نتمكّن من استخراجه على نحو صحيح في المقدّمة.</p>
<p>وإن لم تكن هناك أنابيب، فقد تكون هناك نقاط. وإن كان كذلك، فسنقسم عند النقاط. ويُمرَّر الجزء الأول بشكل متكرّر إلى <code>_expr_code</code> ليحوّله إلى تعبير بايثون، ثمّ يُعالَج كل اسم نقطي على حدة:</p>
<!-- [[[cog include("templite.py", first="elif ", after="def _expr_code", numlines=5, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-keyword">elif</span> <span class="hljs-string">&quot;.&quot;</span> <span class="hljs-keyword">in</span> expr:
            dots = expr.split(<span class="hljs-string">&quot;.&quot;</span>)
            code = <span class="hljs-variable language_">self</span>._expr_code(dots[<span class="hljs-number">0</span>])
            args = <span class="hljs-string">&quot;, &quot;</span>.join(<span class="hljs-built_in">repr</span>(d) <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> dots[<span class="hljs-number">1</span>:])
            code = <span class="hljs-string">&quot;do_dots(%s, %s)&quot;</span> % (code, args)
</code></pre>
<!-- [[[end]]] -->
<p>ولفهم كيفية تصريف النقاط، تذكّر أنّ <code>x.y</code> في القالب يمكن أن تعني إمّا <code>x['y']</code> أو <code>x.y</code> في بايثون، أيّهما ينجح؛ وإذا كانت النتيجة قابلة للاستدعاء فسيجري استدعاؤها. وهذا عدم اليقين يعني أنّ علينا تجربة تلك الاحتمالات وقت التنفيذ لا وقت التصريف. لذا نصرّف <code>x.y.z</code> إلى استدعاء دالة، وهو <code>do_dots(x, 'y', 'z')</code>. وستجرّب دالة النقاط طرق الوصول المختلفة وتُعيد القيمة التي نجحت.</p>
<p>وتُمرَّر الدالة <code>do_dots</code> إلى دالتنا المصرَّفة في بايثون وقت التنفيذ. وسنرى تنفيذها بعد قليل.</p>
<p>وتتعامل الشقّة الأخيرة في الدالة <code>_expr_code</code> مع الحالة التي لا يوجد فيها أنبوب ولا نقطة في تعبير الإدخال. وفي تلك الحالة، يكون الأمر مجرّد اسم. نسجّله في <code>all_vars</code>، ونصل إلى المتغيّر باستخدام اسمه في بايثون مسبوقًا بالبادئة:</p>
<!-- [[[cog include("templite.py", first="else:", after="def _expr_code", numlines=4, dedent=False) ]]] -->
<pre><code class="language-python">        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>._variable(expr, <span class="hljs-variable language_">self</span>.all_vars)
            code = <span class="hljs-string">&quot;c_%s&quot;</span> % expr
        <span class="hljs-keyword">return</span> code
</code></pre>
<!-- [[[end]]] -->
<h4>دوالّ مساعدة</h4>
<p>استخدمنا أثناء التصريف بضع دوالّ مساعدة. فالدالة <code>_syntax_error</code> تجمع ببساطة رسالة خطأ جيّدة وترمي الاستثناء:</p>
<!-- [[[cog include("templite.py", first="def _syntax_error", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_syntax_error</span>(<span class="hljs-params">self, msg, thing</span>):
        <span class="hljs-string">&quot;&quot;&quot;Raise a syntax error using \`msg\`, and showing \`thing\`.&quot;&quot;&quot;</span>
        <span class="hljs-keyword">raise</span> TempliteSyntaxError(<span class="hljs-string">&quot;%s: %r&quot;</span> % (msg, thing))
</code></pre>
<!-- [[[end]]] -->
<p>وتساعدنا الدالة <code>_variable</code> في التحقّق من صحّة أسماء المتغيّرات وإضافتها إلى المجموعات من الأسماء التي جمعناها أثناء التصريف. ونستخدم تعبيرًا نمطيًا للتحقّق من أنّ الاسم مُعرِّف بايثون صالح، ثمّ نضيف الاسم إلى المجموعة:</p>
<!-- [[[cog include("templite.py", first="def _variable", numblanks=4, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_variable</span>(<span class="hljs-params">self, name, vars_set</span>):
        <span class="hljs-string">&quot;&quot;&quot;Track that \`name\` is used as a variable.

        Adds the name to \`vars_set\`, a set of variable names.

        Raises an syntax error if \`name\` is not a valid name.

        &quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> re.<span class="hljs-keyword">match</span>(<span class="hljs-string">r&quot;[_a-zA-Z][_a-zA-Z0-9]*$&quot;</span>, name):
            <span class="hljs-variable language_">self</span>._syntax_error(<span class="hljs-string">&quot;Not a valid name&quot;</span>, name)
        vars_set.add(name)
</code></pre>
<!-- [[[end]]] -->
<p>وبهذا تكتمل شيفرة التصريف!</p>
<h4>العرض</h4>
<p>ولم يبقَ سوى كتابة شيفرة العرض. وبما أنّنا صرّفنا قالبنا إلى دالة بايثون، فإنّ شيفرة العرض ليس لديها الكثير لتفعله. عليها أن تجهّز سياق البيانات، ثمّ تستدعي شيفرة بايثون المصرَّفة:</p>
<!-- [[[cog include("templite.py", first="def render(", numblanks=3, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">render</span>(<span class="hljs-params">self, context=<span class="hljs-literal">None</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Render this template by applying it to \`context\`.

        \`context\` is a dictionary of values to use in this rendering.

        &quot;&quot;&quot;</span>
        <span class="hljs-comment"># Make the complete context we&#x27;ll use.</span>
        render_context = <span class="hljs-built_in">dict</span>(<span class="hljs-variable language_">self</span>.context)
        <span class="hljs-keyword">if</span> context:
            render_context.update(context)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._render_function(render_context, <span class="hljs-variable language_">self</span>._do_dots)
</code></pre>
<!-- [[[end]]] -->
<p>وتذكّر أنّنا حين أنشأنا كائن <code>Templite</code> بدأنا بسياق بيانات. وهنا ننسخه، وندمج فيه أيّ بيانات مُمرَّرة لهذا العرض. والنسخ يتمّ كي لا ترى استدعاءات العرض المتتالية بيانات بعضها البعض، والدمج يتمّ كي يتوفّر لدينا قاموس واحد نستخدمه للبحث عن البيانات. وهكذا نبني سياق بيانات موحّدًا من السياقات المقدَّمة لحظة إنشاء القالب، مع البيانات المقدَّمة الآن وقت العرض.</p>
<p>ولاحظ أنّ البيانات الممرَّرة إلى <code>render</code> يمكن أن تكتب فوق البيانات الممرَّرة إلى باني Templite. وهذا لا يحدث عادةً، لأنّ السياق الممرَّر إلى الباني يحوي أمورًا شبيهة العامة مثل تعريفات المرشِّحات والثوابت، بينما السياق الممرَّر إلى <code>render</code> يحوي بيانات محدّدة لعرض واحد بعينه.</p>
<p>ثمّ نستدعي ببساطة <code>render_function</code> المصرَّفة لدينا. والوسيط الأول هو سياق البيانات الكامل، والوسيط الثاني هو الدالة التي ستنفّذ دلالة النقاط. ونستخدم التنفيذ نفسه في كل مرّة: وهي دالتنا <code>_do_dots</code>.</p>
<!-- [[[cog include("templite.py", first="def _do_dots", numblanks=1, dedent=False) ]]] -->
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_do_dots</span>(<span class="hljs-params">self, value, *dots</span>):
        <span class="hljs-string">&quot;&quot;&quot;Evaluate dotted expressions at runtime.&quot;&quot;&quot;</span>
        <span class="hljs-keyword">for</span> dot <span class="hljs-keyword">in</span> dots:
            <span class="hljs-keyword">try</span>:
                value = <span class="hljs-built_in">getattr</span>(value, dot)
            <span class="hljs-keyword">except</span> AttributeError:
                value = value[dot]
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">callable</span>(value):
                value = value()
        <span class="hljs-keyword">return</span> value
</code></pre>
<!-- [[[end]]] -->
<p>وأثناء التصريف، يتحوّل تعبير قالب مثل <code>x.y.z</code> إلى <code>do_dots(x, 'y', 'z')</code>. وتُمرّر هذه الدالة في حلقة على الأسماء النقطية، وتجرّب كل اسم كخاصّية، وإذا فشل ذلك تجرّبه كمفتاح. وهذا ما يمنح صياغة قالبنا الوحيدة المرونة كي تتصرّف إمّا بوصفها <code>x.y</code> أو <code>x['y']</code>. وفي كل خطوة، نتحقّق أيضًا ممّا إذا كانت القيمة الجديدة قابلة للاستدعاء، وإن كانت كذلك نستدعيها. وبمجرد أن ننتهي من جميع الأسماء النقطية، تكون القيمة التي بين أيدينا هي القيمة التي نريدها.</p>
<p>وهنا استخدمنا تفريغ وسائط بايثون من جديد (<code>*dots</code>) كي تتمكّن <code>_do_dots</code> من قبول أيّ عدد من الأسماء النقطية. وهذا يمنحنا دالة مرنة ستعمل مع أيّ تعبير منقّط نصادفه في القالب.</p>
<p>ولاحظ أنّنا عند استدعاء <code>self._render_function</code> نمرّر دالة تُستخدم لتقييم التعبيرات المنقّطة، لكنّنا نمرّر الدالة نفسها دائمًا. كان من الممكن أن نجعل تلك الشيفرة جزءًا من القالب المصرَّف، لكنّها الأسطر الثمانية نفسها لكل قالب، وهذه الأسطر الثمانية جزء من تعريف كيفية عمل القوالب، لا من تفاصيل قالب بعينه. ويبدو تنفيذها بهذا الشكل أنظف من جعل تلك الشيفرة جزءًا من القالب المصرَّف.</p>
<h2 id="الاختبار">الاختبار</h2>
<p>ويُرفق بمحرّك القوالب مجموعة اختبارات تغطّي كل السلوك والحالات الحديّة. وأنا في الواقع متجاوز قليلًا حدّ الخمسمئة سطر: محرّك القوالب 252 سطرًا، والاختبارات 275 سطرًا. وهذا شائع في الشيفرة المختبَرة جيدًا: فلديك شيفرة أكثر في اختباراتك مما في منتجك.</p>
<h2 id="ما-ترك-جانبا">ما تُرك جانبًا</h2>
<p>وتوفّر محرّكات القوالب الغنيّة بالميزات الكثير أكثر مما نفّذناه هنا. ولإبقاء هذه الشيفرة صغيرة، فإنّنا نترك جانبًا أفكارًا مثيرة مثل:</p>
<ul>
<li>وراثة القوالب وإدراجها</li>
<li>وسوم مخصّصة</li>
<li>الهروب التلقائي</li>
<li>وسائط للمرشِّحات</li>
<li>منطق شرطي معقّد مثل <code>else</code> و<code>elif</code></li>
<li>حلقات بأكثر من متغيّر حلقة</li>
<li>التحكّم في المسافات البيضاء</li>
</ul>
<p>ورغم ذلك، فإنّ محرّك القوالب البسيط لدينا مفيد. وفي الواقع، هو محرّك القوالب المستخدم في coverage.py لإنتاج تقارير HTML.</p>
<h2 id="خلاصة">خلاصة</h2>
<p>وفي 252 سطرًا، حصلنا على محرّك قوالب بسيط لكنّه قادر. ومحرّكات القوالب الحقيقية لها ميزات أكثر بكثير، لكنّ هذه الشيفرة تشرح الأفكار الأساسية للعملية: صرّف القالب إلى دالة بايثون، ثمّ نفّذ الدالة لإنتاج النصّ الناتج.</p>
`,o={book:s,chapter:n,chapterTitle:e,slug:a,title:l,headings:p,html:t};export{s as book,n as chapter,e as chapterTitle,o as default,p as headings,t as html,a as slug,l as title};
