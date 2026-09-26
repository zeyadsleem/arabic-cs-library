const s="500-lines",n="crawler",a="A Web Crawler With asyncio Coroutines",e="index",l="زاحف ويب بكوروتينات asyncio",p=[{depth:2,id:"مقدمة",text:"مقدمة"},{depth:2,id:"المهمة",text:"المهمة"},{depth:2,id:"النهج-التقليدي",text:"النهج التقليدي"},{depth:2,id:"غير-المتزامن",text:"غير المتزامن"},{depth:2,id:"البرمجة-باستخدام-دوال-الاستدعاء",text:"البرمجة باستخدام دوال الاستدعاء"},{depth:2,id:"الكوروتينات",text:"الكوروتينات"},{depth:2,id:"كيف-تعمل-مولدات-python",text:"كيف تعمل مولّدات Python"},{depth:2,id:"بناء-الكوروتينات-باستخدام-المولدات",text:"بناء الكوروتينات باستخدام المولّدات"},{depth:2,id:"تجزئة-الكوروتينات-باستخدام-yield-from",text:"تجزئة الكوروتينات باستخدام yield from"},{depth:2,id:"تنسيق-الكوروتينات",text:"تنسيق الكوروتينات"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],c=`<p><em>إيه. جيسي جيريو ديفيس مهندس أولى في MongoDB في نيويورك. كتب Motor، وهو مُشغّل MongoDB غير المتزامن لـ Python، وهو المطوّر الرئيسي لمشغّل C الخاص بـ MongoDB وعضو في فريق PyMongo. يساهم في asyncio وTornado. يكتب على <a href="http://emptysqa.re">http://emptysqa.re</a>.</em></p>
<p><em>غيدو فان روسوم هو مُنشئ Python، إحدى لغات البرمجة الرئيسية على الويب وخارجه. يشار إليه في مجتمع Python بالحرف BDFL (الحاكم المستبدل الخيّر مدى الحياة)، وهو لقب مأخوذ مباشرة من مشهد في مونتي بايثون.  موطن غيدو على الويب هو <a href="http://www.python.org/~guido/">http://www.python.org/~guido/</a>.</em></p>
<h2 id="مقدمة">مقدمة</h2>
<p>يُركّز علم الحاسوب الكلاسيكي على الخوارزميات (algorithms) الكفؤة التي تُنجز الحسابات في أسرع وقت ممكن. لكن كثيراً من البرامج المتصلة بالشبكة لا تقضي وقتها في الحساب، بل في الإبقاء على اتصالات كثيرة مفتوحة إما بطيئة أو نادرة الأحداث. وتقدّم هذه البرامج تحدياً مختلفاً تماماً: انتظار عدد هائل من أحداث الشبكة بكفاءة. والمقاربة المعاصرة لهذه المشكلة هي الإدخال/الإخراج غير المتزامن (asynchronous I/O)، أو «غير المتزامن» (async).</p>
<p>يقدّم هذا الفصل زاحف ويب بسيطاً. والزاحف تطبيق غير متزامن نموذجي لأنه ينتظر استجابات كثيرة لكنه يقوم بحساب قليل. وكلما زاد عدد الصفحات التي يستطيع جلبها دفعة واحدة، زاد سرعته في الإنجاز. وإن خصّص خيطاً (thread) لكل طلب جارٍ، فمع ارتفاع عدد الطلبات المتزامنة سينفد من الذاكرة أو من موارد أخرى متعلقة بالخيوط قبل أن ينفد من المقابس (sockets). وهو يتجنّب الحاجة إلى الخيوط باستخدام الإدخال/الإخراج غير المتزامن.</p>
<p>نقدّم المثال على ثلاث مراحل. أولاً، نعرض حلقة أحداث (event loop) غير متزامنة ونرسم زاحفاً يستخدم الحلقة مع دوال استدعاء (callbacks): وهو فعّال جداً، لكن توسيعه إلى مشكلات أكثر تعقيداً سيؤدي إلى شيفرة متشابكة (spaghetti) غير قابلة للإدارة. ثانياً، بالتالي، نبيّن أن الكوروتينات (coroutines) في Python فعّالة وقابلة للتوسّع معاً. وننفّذ كوروتينات بسيطة في Python باستخدام دوال المولّدات (generators). وفي المرحلة الثالثة، نستخدم الكوروتينات الكاملة المزايا من مكتبة «asyncio» القياسية في Python[^16]، وننسّق بينها باستخدام طابور (queue) غير متزامن.</p>
<h2 id="المهمة">المهمة</h2>
<p>يجد زاحف الويب جميع صفحات موقع ما وينزّلها، ربما لأرشفتها أو لفهرستها. ابتداءً من عنوان URL جذر، يجلب كل صفحة، ويحللها بحثاً عن روابط إلى صفحات لم تُرَ من قبل، ويضيف هذه الروابط إلى طابور. ويتوقف حين يجلب صفحة لا تحتوي على روابط جديدة ويصبح الطابور فارغاً.</p>
<p>ويمكننا تسريع هذه العملية بتنزيل صفحات كثيرة في وقت واحد. فحين يعثر الزاحف على روابط جديدة، يطلق عمليات جلب متزامنة للصفحات الجديدة عبر مقابس منفصلة. ويحلل الاستجابات فور وصولها، مضيفاً الروابط الجديدة إلى الطابور. وقد تأتي نقطة يتناقص عندها العائد فيضرّ الإفراط في التزامن بالأداء، لذلك نحدّ من عدد الطلبات المتزامنة، ونترك بقية الروابط في الطابور حتى تكتمل بعض الطلبات الجارية.</p>
<h2 id="النهج-التقليدي">النهج التقليدي</h2>
<p>كيف نجعل الزاحف متزامناً؟ تقليدياً ننشئ مجموعة خيوط (thread pool). ويكون لكل خيط مسؤولية تنزيل صفحة واحدة في كل مرة عبر مقبس. فمثلاً، لتنزيل صفحة من <code>xkcd.com</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">url</span>):
    sock = socket.socket()
    sock.connect((<span class="hljs-string">&#x27;xkcd.com&#x27;</span>, <span class="hljs-number">80</span>))
    request = <span class="hljs-string">&#x27;GET {} HTTP/1.0\\r\\nHost: xkcd.com\\r\\n\\r\\n&#x27;</span>.<span class="hljs-built_in">format</span>(url)
    sock.send(request.encode(<span class="hljs-string">&#x27;ascii&#x27;</span>))
    response = <span class="hljs-string">b&#x27;&#x27;</span>
    chunk = sock.recv(<span class="hljs-number">4096</span>)
    <span class="hljs-keyword">while</span> chunk:
        response += chunk
        chunk = sock.recv(<span class="hljs-number">4096</span>)
    
    <span class="hljs-comment"># Page is now downloaded.</span>
    links = parse_links(response)
    q.add(links)
</code></pre>
<p>افتراضياً، تكون عمليات المقبس <em>حاجبة</em> (blocking): فحين يستدعي الخيط تابعاً مثل <code>connect</code> أو <code>recv</code>، يتوقف حتى تكتمل العملية.[^15] ولكي ننزّل صفحات كثيرة دفعة واحدة، نحتاج إلى خيوط كثيرة. ويقلّل التطبيق المتطوّر تكلفة إنشاء الخيوط بالاحتفاظ بخيوط خاملة في مجموعة خيوط، ثم استئجارها لإعادة استخدامها في المهام اللاحقة؛ وهو يفعل الشيء نفسه مع المقابس في مجموعة اتصالات.</p>
<p>ومع ذلك، الخيوط باهظة، وأنظمة التشغيل تفرض مجموعة متنوعة من الحدود الصارمة على عدد الخيوط التي قد تكون لعملية أو مستخدم أو آلة. وعلى نظام جيسي، يكلّف خيط Python نحو 50 كيلوبايت من الذاكرة، وإنشاء عشرات الآلاف من الخيوط يسبب أعطالاً. فإذا وسّعنا إلى عشرات الآلاف من العمليات المتزامنة على مقابس متزامنة، نفدنا من الخيوط قبل أن ننفد من المقابس. فالحمل الزائد لكل خيط أو حدود النظام على الخيوط هي عنق الزجاجة.</p>
<p>وفي مقاله المؤثر «مشكلة C10K»<a href="http://www.kegel.com/c10k.html">^8</a>، يشرح دان كيجل قيود تعدد الخيوط بالنسبة التزامن الإدخال/الإخراج. ويبدأ بقوله:</p>
<blockquote>
<p>حان وقت لخوادم الويب أن تتعامل مع عشرة آلاف عميل في وقت واحد، أليس كذلك؟ فبعد كل شيء، صار الويب مكاناً كبيراً.</p>
</blockquote>
<p>ابتكر كيجل مصطلح «C10K» عام 1999. عشرة آلاف اتصال تبدو رقماً صغيراً الآن، لكن المشكلة لم تتغيّر إلا في الحجم لا في النوع. فقد كان استخدام خيط لكل اتصال لتحقيق C10K غير عملي. أما الآن فالحد أعلى بمراتب كثير. وبالفعل، سيعمل زاحف الويب التجريبي لدينا بخيوط تماماً. لكن في التطبيقات فائقة الحجم، وبمئات الآلاف من الاتصالات، يبقى الحد قائماً: هناك حد تتجاوزه معظم الأنظمة فتظل قادرة على إنشاء المقابس لكنها نفدت من الخيوط. كيف نتغلب على ذلك؟</p>
<h2 id="غير-المتزامن">غير المتزامن</h2>
<p>تؤدي أطر الإدخال/الإخراج غير المتزامن عمليات متزامنة في خيط واحد باستخدام
مقابس <em>غير حاجبة</em> (non-blocking). وفي زاحفنا غير المتزامن، نجعل المقبس غير حاجب
قبل أن نبدأ الاتصال بالخادم:</p>
<pre><code class="language-python">sock = socket.socket()
sock.setblocking(<span class="hljs-literal">False</span>)
<span class="hljs-keyword">try</span>:
    sock.connect((<span class="hljs-string">&#x27;xkcd.com&#x27;</span>, <span class="hljs-number">80</span>))
<span class="hljs-keyword">except</span> BlockingIOError:
    <span class="hljs-keyword">pass</span>
</code></pre>
<p>وللأسف، يقذف المقبس غير الحاجب استثناءً من <code>connect</code>، حتى حين يعمل بصورة طبيعية. وتكرار هذا الاستثناء يعكس السلوك المُزعج للدالة C الأساسية، التي تضبط <code>errno</code> على <code>EINPROGRESS</code> لتخبرك أنها بدأت.</p>
<p>ويحتاج زاحفنا الآن إلى وسيلة لمعرفة متى يُنشأ الاتصال، ليتمكن من إرسال طلب HTTP. ويمكننا ببساطة أن نواصل المحاولة في حلقة محكمة:</p>
<pre><code class="language-python">request = <span class="hljs-string">&#x27;GET {} HTTP/1.0\\r\\nHost: xkcd.com\\r\\n\\r\\n&#x27;</span>.<span class="hljs-built_in">format</span>(url)
encoded = request.encode(<span class="hljs-string">&#x27;ascii&#x27;</span>)

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">try</span>:
        sock.send(encoded)
        <span class="hljs-keyword">break</span>  <span class="hljs-comment"># Done.</span>
    <span class="hljs-keyword">except</span> OSError <span class="hljs-keyword">as</span> e:
        <span class="hljs-keyword">pass</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;sent&#x27;</span>)
</code></pre>
<p>وليس هذا الأسلوب يهدر الكهرباء فحسب، بل إنه لا يستطيع الانتظار بكفاءة لأحداث على مقابس <em>متعددة</em>. وفي الزمن القديم، كان حل BSD Unix لهذه المشكلة هو <code>select</code>، وهي دالة C تنتظر حدوث حدث على مقبس غير حاجب أو على مصفوفة صغيرة منها. أما اليوم فإن الطلب على تطبيقات إنترنت ذات أعداد هائلة من الاتصالات قد أدّى إلى بدائل مثل <code>poll</code>، ثم <code>kqueue</code> في BSD و<code>epoll</code> في Linux. وهذه الواجهات تشبه <code>select</code>، لكنها تعمل جيداً مع أعداد هائلة من الاتصالات.</p>
<p>ويستخدم <code>DefaultSelector</code> في Python 3.4 أفضل دالة شبيهة بـ <code>select</code> المتاحة على نظامك. وللتسجيل للحصول على إشعارات عن الإدخال/الإخراج الشبكي، ننشئ مقبساً غير حاجب ونسجله لدى المحدِّد الافتراضي:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> selectors <span class="hljs-keyword">import</span> DefaultSelector, EVENT_WRITE

selector = DefaultSelector()

sock = socket.socket()
sock.setblocking(<span class="hljs-literal">False</span>)
<span class="hljs-keyword">try</span>:
    sock.connect((<span class="hljs-string">&#x27;xkcd.com&#x27;</span>, <span class="hljs-number">80</span>))
<span class="hljs-keyword">except</span> BlockingIOError:
    <span class="hljs-keyword">pass</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">connected</span>():
    selector.unregister(sock.fileno())
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;connected!&#x27;</span>)

selector.register(sock.fileno(), EVENT_WRITE, connected)
</code></pre>
<p>نهمل الخطأ الزائف ونستدعي <code>selector.register</code>، ممرِّرين واصف ملف المقبس وثابتاً يعبّر عن الحدث الذي ننتظره. ولِكي يصلك إشعار عند إنشاء الاتصال، نمرّر <code>EVENT_WRITE</code>: أي أننا نريد أن نعرف متى يصبح المقبس «قابلاً للكتابة». ونمرّر أيضاً دالة Python هي <code>connected</code> لتُنفَّذ عند وقوع ذلك الحدث. وتُعرف هذه الدالة بـ<em>دالة استدعاء</em> (callback).</p>
<p>نعالج إشعارات الإدخال/الإخراج فور وصولها من المحدِّد، في حلقة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">loop</span>():
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        events = selector.select()
        <span class="hljs-keyword">for</span> event_key, event_mask <span class="hljs-keyword">in</span> events:
            callback = event_key.data
            callback()
</code></pre>
<p>تُخزَّن دالة الاستدعاء <code>connected</code> في <code>event_key.data</code>، ونسترجعها وننفّذها ما إن يتصل المقبس غير الحاجب.</p>
<p>على خلاف حلقتنا سريعة الدوران أعلاه، فإن الاستدعاء إلى <code>select</code> هنا يتوقف منتظراً أحداث الإدخال/الإخراج التالية. ثم تشغّل الحلقة دوال الاستدعاء التي تنتظر هذه الأحداث. وتبقى العمليات التي لم تكتمل معلّقة حتى دورات مستقبلية من حلقة الأحداث.</p>
<p>ماذا أثبتنا حتى الآن؟ بيّنا كيف نبدأ عملية وننفّذ دالة استدعاء عندما تصبح العملية جاهزة. وإطار غير متزامن (async <em>framework</em>) يبني على الخاصيتين اللتين أظهرناهما — المقابس غير الحاجبة وحلقة الأحداث — لتشغيل عمليات متزامنة في خيط واحد.</p>
<p>لقد بلغنا هنا «التزامن» (concurrency)، لكن ليس ما يُسمى تقليدياً «التوازي» (parallelism). أي أننا بنينا نظاماً صغيراً يقوم بإدخال/إخراج متداخل. وهو قادر على بدء عمليات جديدة بينما عمليات أخرى جارية. لكنه لا يستغل فعلياً عدة أنوية لتنفيذ الحساب بالتوازي. لكن هذا النظام مصمَّم لمشكلات مقيّدة بالإدخال/الإخراج، لا بمشكلات مقيّدة بالمعالج.[^14]</p>
<p>فحلقة الأحداث لدينا فعّالة في الإدخال/الإخراج المتزامن لأنها لا تكرّس موارد خيوط لكل اتصال. لكن قبل أن ننتقل، من المهم تصحيح سوء فهم شائع بأن غير المتزامن <em>أسرع</em> من تعدد الخيوط. فكثيراً ما لا يكون الأمر كذلك — بل إن حلقة أحداث مثل حلقتنا في Python أبطأ باعتدال من تعدد الخيوط في خدمة عدد قليل من الاتصالات النشطة جداً. وفي بيئة تشغيل بلا قفل تفسير عام، لأداء الخيوط أن تكون أفضل في هذا النوع من الأحمال. أما ما يناسبه الإدخال/الإخراج غير المتزامن فهو التطبيقات التي لها اتصالات كثيرة بطيئة أو خاملة بأحداث نادرة.[^11]<latex>[^bayer]</latex></p>
<h2 id="البرمجة-باستخدام-دوال-الاستدعاء">البرمجة باستخدام دوال الاستدعاء</h2>
<p>مع إطار العمل غير المتزامن الصغير جداً الذي بنيناه حتى الآن، كيف نبني زاحف ويب؟ فحتى جالب عنوان URL بسيط يكون كتابته مكلفاً.</p>
<p>نبدأ بمجموعتين عامتين من عناوين URL التي لم نجلبها بعد، والعناوين التي رأيناها:</p>
<pre><code class="language-python">urls_todo = <span class="hljs-built_in">set</span>([<span class="hljs-string">&#x27;/&#x27;</span>])
seen_urls = <span class="hljs-built_in">set</span>([<span class="hljs-string">&#x27;/&#x27;</span>])
</code></pre>
<p>تتضمّن مجموعة <code>seen_urls</code> مجموعة <code>urls_todo</code> إضافةً إلى العناوين المكتملة. وتُهيَّأ المجموعتان بعنوان URL الجذر &quot;/&quot;.</p>
<p>سيتطلب جلب صفحة سلسلة من دوال الاستدعاء. فدالة الاستدعاء <code>connected</code> تُطلق عند اتصال مقبس، وترسل طلب GET إلى الخادم. لكن عليها بعد ذلك أن تنتظر استجابة، فتسجّل دالة استدعاء أخرى. فإذا لم تستطع قراءة الاستجابة كاملةً عندما تُطلق تلك الدالة، فإنها تسجّل من جديد، وهكذا دواليك.</p>
<p>لنجمع دوال الاستدعاء هذه في كائن <code>Fetcher</code>. فهو يحتاج إلى عنوان URL وكائن مقبس، ومكانً لتجميع بايتات الاستجابة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Fetcher</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, url</span>):
        <span class="hljs-variable language_">self</span>.response = <span class="hljs-string">b&#x27;&#x27;</span>  <span class="hljs-comment"># Empty array of bytes.</span>
        <span class="hljs-variable language_">self</span>.url = url
        <span class="hljs-variable language_">self</span>.sock = <span class="hljs-literal">None</span>
</code></pre>
<p>ونبدأ باستدعاء <code>Fetcher.fetch</code>:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method on Fetcher class.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.sock = socket.socket()
        <span class="hljs-variable language_">self</span>.sock.setblocking(<span class="hljs-literal">False</span>)
        <span class="hljs-keyword">try</span>:
            <span class="hljs-variable language_">self</span>.sock.connect((<span class="hljs-string">&#x27;xkcd.com&#x27;</span>, <span class="hljs-number">80</span>))
        <span class="hljs-keyword">except</span> BlockingIOError:
            <span class="hljs-keyword">pass</span>
            
        <span class="hljs-comment"># Register next callback.</span>
        selector.register(<span class="hljs-variable language_">self</span>.sock.fileno(),
                          EVENT_WRITE,
                          <span class="hljs-variable language_">self</span>.connected)
</code></pre>
<p>يبدأ تابع <code>fetch</code> بالاتصال بمقبس. لكن لاحظ أن التابع يعود قبل إنشاء الاتصال. ويجب أن يعيد التحكم إلى حلقة الأحداث لينتظر الاتصال. ولنفهم لماذا، تخيّل لو كان تطبيقنا بالكامل منظَّماً على هذا النحو:</p>
<pre><code class="language-python"><span class="hljs-comment"># Begin fetching http://xkcd.com/353/</span>
fetcher = Fetcher(<span class="hljs-string">&#x27;/353/&#x27;</span>)
fetcher.fetch()

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    events = selector.select()
    <span class="hljs-keyword">for</span> event_key, event_mask <span class="hljs-keyword">in</span> events:
        callback = event_key.data
        callback(event_key, event_mask)
</code></pre>
<p>تُعالَج كل إشعارات الأحداث في حلقة الأحداث حين تستدعي <code>select</code>. لذا يجب على <code>fetch</code> أن يسلّم التحكم إلى حلقة الأحداث، ليعرف البرنامج متى قد اتصل المقبس. وعندئذٍ فقط تشغّل الحلقة دالة الاستدعاء <code>connected</code> التي سُجِّلت في نهاية <code>fetch</code> أعلاه.</p>
<p>وهذا هو تنفيذ <code>connected</code>:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method on Fetcher class.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">connected</span>(<span class="hljs-params">self, key, mask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;connected!&#x27;</span>)
        selector.unregister(key.fd)
        request = <span class="hljs-string">&#x27;GET {} HTTP/1.0\\r\\nHost: xkcd.com\\r\\n\\r\\n&#x27;</span>.<span class="hljs-built_in">format</span>(<span class="hljs-variable language_">self</span>.url)
        <span class="hljs-variable language_">self</span>.sock.send(request.encode(<span class="hljs-string">&#x27;ascii&#x27;</span>))
        
        <span class="hljs-comment"># Register the next callback.</span>
        selector.register(key.fd,
                          EVENT_READ,
                          <span class="hljs-variable language_">self</span>.read_response)
</code></pre>
<p>يرسل هذا التابع طلب GET. ويفحص تطبيق حقيقي قيمة الإرجاع من <code>send</code> تحسباً لتعذّر إرسال الرسالة كاملةً دفعة واحدة. لكن طلبنا صغير وتطبيقنا بسيط. فيستدعي <code>send</code> ببساطة، ثم ينتظر استجابة. وهو بالطبع ملزم بتسجيل دالة استدعاء أخرى والتخلص من التحكم إلى حلقة الأحداث. وتُعالج دالة الاستدعاء التالية والأخيرة، وهي <code>read_response</code>، رد الخادم:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method on Fetcher class.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">read_response</span>(<span class="hljs-params">self, key, mask</span>):
        <span class="hljs-keyword">global</span> stopped

        chunk = <span class="hljs-variable language_">self</span>.sock.recv(<span class="hljs-number">4096</span>)  <span class="hljs-comment"># 4k chunk size.</span>
        <span class="hljs-keyword">if</span> chunk:
            <span class="hljs-variable language_">self</span>.response += chunk
        <span class="hljs-keyword">else</span>:
            selector.unregister(key.fd)  <span class="hljs-comment"># Done reading.</span>
            links = <span class="hljs-variable language_">self</span>.parse_links()
            
            <span class="hljs-comment"># Python set-logic:</span>
            <span class="hljs-keyword">for</span> link <span class="hljs-keyword">in</span> links.difference(seen_urls):
                urls_todo.add(link)
                Fetcher(link).fetch()  <span class="hljs-comment"># &lt;- New Fetcher.</span>

            seen_urls.update(links)
            urls_todo.remove(<span class="hljs-variable language_">self</span>.url)
            <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> urls_todo:
                stopped = <span class="hljs-literal">True</span>
</code></pre>
<p>تُنفَّذ دالة الاستدعاء في كل مرة يرى فيها المحدِّد أن المقبس «قابل للقراءة»، وهو ما قد يعني أمرين: أن المقبس فيه بيانات أو أنه مغلق.</p>
<p>وتطلب دالة الاستدعاء من المقبس ما يصل إلى أربعة كيلوبايتات من البيانات. فإن كان المتوفر أقل، احتوى <code>chunk</code> على البيانات المتاحة كلها. وإن كان أكثر، كان <code>chunk</code> بطول أربعة كيلوبايتات ويبقى المقبس قابلاً للقراءة، فتشغّل حلقة الأحداث دالة الاستدعاء هذه من جديد في الدورة التالية. وحين تكتمل الاستجابة، يكون الخادم قد أغلق المقبس ويكون <code>chunk</code> فارغاً.</p>
<p>ويعيد تابع <code>parse_links</code>، غير المُعرَض المعروض هنا، مجموعة من عناوين URL. ونبدأ جالباً جديداً لكل عنوان URL جديد، دون حد للتزامن. ولاحظ خاصية طيّفة في البرمجة غير المتزامنة باستخدام دوال الاستدعاء: لا نحتاج إلى كائن مزامنة (mutex) حول التغييرات في البيانات المشتركة، مثل حين نضيف روابط إلى <code>seen_urls</code>. فلا يوجد مهام متعددة استباقية، ولذلك لا يمكن مقاطعتنا عند نقاط عشوائية في شيفرتنا.</p>
<p>ونضيف متغيراً عاماً اسمه <code>stopped</code> ونستخدمه للتحكم في الحلقة:</p>
<pre><code class="language-python">stopped = <span class="hljs-literal">False</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">loop</span>():
    <span class="hljs-keyword">while</span> <span class="hljs-keyword">not</span> stopped:
        events = selector.select()
        <span class="hljs-keyword">for</span> event_key, event_mask <span class="hljs-keyword">in</span> events:
            callback = event_key.data
            callback()
</code></pre>
<p>ما إن تُنزَّل كل الصفحات يتوقف الجالب حلقة الأحداث العامة ويخرج البرنامج.</p>
<p>ويُظهر هذا المثال مشكلة غير المتزامن بوضوح: شيفرة متشابكة (spaghetti). فنحن بحاجة إلى وسيلة للتعبير عن سلسلة من الحسابات وعمليات الإدخال/الإخراج، ولجدولة عدة سلاسل من هذا النوع من العمليات لتعمل في وقت واحد. لكن من دون خيوط، لا يمكن جمع سلسلة من العمليات في دالة واحدة: فمتى تبدأ الدالة عملية إدخال/إخراج، فإنها تحفظ صراحةً أي حالة ستحتاجها في المستقبل ثم تعود. وأنت مسؤول عن التفكير في شيفرة حفظ الحالة هذه وكتابتها.</p>
<p>ولنشرح ما نقصده بذلك. لننظر في كم كان جلب عنوان URL على خيط بمقبس حاجب تقليدي بسيطاً:</p>
<pre><code class="language-python"><span class="hljs-comment"># Blocking version.</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">url</span>):
    sock = socket.socket()
    sock.connect((<span class="hljs-string">&#x27;xkcd.com&#x27;</span>, <span class="hljs-number">80</span>))
    request = <span class="hljs-string">&#x27;GET {} HTTP/1.0\\r\\nHost: xkcd.com\\r\\n\\r\\n&#x27;</span>.<span class="hljs-built_in">format</span>(url)
    sock.send(request.encode(<span class="hljs-string">&#x27;ascii&#x27;</span>))
    response = <span class="hljs-string">b&#x27;&#x27;</span>
    chunk = sock.recv(<span class="hljs-number">4096</span>)
    <span class="hljs-keyword">while</span> chunk:
        response += chunk
        chunk = sock.recv(<span class="hljs-number">4096</span>)
    
    <span class="hljs-comment"># Page is now downloaded.</span>
    links = parse_links(response)
    q.add(links)
</code></pre>
<p>ما الحالة التي تتذكرها هذه الدالة بين عملية مقبس والتي تليها؟ لديها المقبس وعنوان URL و<code>response</code> المتراكم.  تستخدم الدالة التي تعمل على خيط خصائص أساسية من لغة البرمجة لتخزين هذه الحالة المؤقتة في متغيّرات محلية، على مكدسها. ولدى الدالة أيضاً «استمرار» (continuation) — أي الشيفرة التي تزمع بتنفيذها بعد اكتمال الإدخال/الإخراج. وبيئة التشغيل تتذكر الاستمرار بتخزين مؤشر تعليمات الخيط. ولا تحتاج إلى التفكير في استعادة هذه المتغيّرات المحلية والاستمرار بعد الإدخال/الإخراج. فهو مبني في اللغة.</p>
<p>لكن مع إطار غير متزامن قائم على دوال الاستدعاء، لم تعد هذه الخصائص اللغوية نافعة. فأثناء انتظار الإدخال/الإخراج، يجب على الدالة أن تحفظ حالتها صراحةً، لأن الدالة تعود وتفقد إطار مكدسها قبل اكتمال الإدخال/الإخراج. وبدلاً من المتغيّرات المحلية، يخزّن مثالنا القائم على دوال الاستدعاء <code>sock</code> و<code>response</code> كسمتين لكائن <code>self</code>، أي نسخة Fetcher. وبدلاً من مؤشر التعليمات، يخزّن استمراره بتسجيل دوالتي الاستدعاء <code>connected</code> و<code>read_response</code>. ومع ازدياد ميزات التطبيق، يزداد تعقيد الحالة التي نحفظها يدوياً عبر دوال الاستدعاء. وتجعل هذه الأعمال الورقية الثقيلة المبرمج عرضة للصداع النصفي.</p>
<p>والأسوأ من ذلك، ماذا يحدث إذا ألقت دالة استدعاء استثناءً، قبل أن تجدول دالة الاستدعاء التالية في السلسلة؟ لنفترض أننا لم نُحسن تنفيذ تابع <code>parse_links</code> وأنه ألقى استثناءً أثناء تحليل some HTML:</p>
<pre><code>Traceback (most recent call last):
  File &quot;loop-with-callbacks.py&quot;, line 111, in &lt;module&gt;
    loop()
  File &quot;loop-with-callbacks.py&quot;, line 106, in loop
    callback(event_key, event_mask)
  File &quot;loop-with-callbacks.py&quot;, line 51, in read_response
    links = self.parse_links()
  File &quot;loop-with-callbacks.py&quot;, line 67, in parse_links
    raise Exception('parse error')
Exception: parse error
</code></pre>
<p>لا يُظهر أثر المكدس سوى أن حلقة الأحداث كانت تشغّل دالة استدعاء. ونحن لا نتذكر ما أدى إلى الخطأ. السلسلة مقطوعة من الطرفين: نسينا إلى أين كنا ذاهبون ومن أين أتينا. وهذه الفقدة للسياق تُسمّى «تمزيق المكدس» (stack ripping)، وفي حالات كثيرة تربك المحقق. كما يمنعنا تمزيق المكدس من تثبيت معالج استثناءات لسلسلة من دوال الاستدعاء، بالطريقة التي يلفّ بها كتلة «try / except» تحيط باستدعاء دالة وشجرة أحفادها.[^7]</p>
<p>فحتى إلى جانب النقاش الطويل حول الكفاءة النسبية بين تعدد الخيوط وغير المتزامن، هناك نقاش آخر حول أيهما أكثر عرضة للخطأ: فالخيوط عرضة لتسابق البيانات (data races) إن أخطأنا في مزامنتها، أما دوال الاستدعاء فمعطّبة التصحيح بسبب تمزيق المكدس.</p>
<h2 id="الكوروتينات">الكوروتينات</h2>
<p>نغريكم بوعد. فمن الممكن كتابة شيفرة غير متزامنة تجمع بين كفاءة دوال الاستدعاء والمظهر الكلاسيكي الجميل للبرمجة متعددة الخيوط. ويُتحقق هذا المزيج بنمط يُسمّى «الكوروتينات» (coroutines). وباستخدام مكتبة asyncio القياسية في Python 3.4 وحزمة اسمها «aiohttp»، يصبح جلب عنوان URL داخل كوروتين أمراً مباشراً جداً[^10]:</p>
<pre><code class="language-python"><span class="hljs-meta">    @asyncio.coroutine</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self, url</span>):
        response = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.session.get(url)
        body = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> response.read()
</code></pre>
<p>وهو قابل للتوسّع أيضاً. فمقارنةً بـ 50 كيلوبايت من الذاكرة لكل خيط والحدود الصارمة التي يفرضها نظام التشغيل على الخيوط، لا يستهلك كوروتين Python سوى 3 كيلوبايتات تقريباً من الذاكرة على نظام جيسي. ويستطيع Python بسهولة بدء مئات الآلاف من الكوروتينات.</p>
<p>ومفهوم الكوروتين، الذي يعود إلى أيام علم الحاسوب الأولى، بسيط: هو روتين فرعي يمكن إيقافه واستئنافه. في حين تُدار الخيوط مهام متعددة استباقياً بواسطة نظام التشغيل، فإن الكوروتينات تُدار مهام متعددة تعاونياً: فهي تختار متى تتوقف، وأي كوروتين يُشغَّل تالياً.</p>
<p>وهناك تطبيقات كثيرة للكوروتينات؛ حتى في Python هناك عدة منها. فالكوروتينات في مكتبة «asyncio» القياسية في Python 3.4 مبنية على المولّدات (generators) وصنف Future وتعبير «yield from».ابتداءً من Python 3.5، أصبحت الكوروتينات ميزة أصلية في اللغة نفسها[^17]؛ غير أن فهم الكوروتينات كما نُفِّذت أول مرة في Python 3.4 باستخدام تسهيلات اللغة الموجودة مسبقاً هو الأساس لمعالجة كوروتينات Python 3.5 الأصلية.</p>
<p>ولكي نشرح كوروتينات Python 3.4 القائمة على المولّدات، سنخوض في عرض للمولّدات (generators) وكيفية استخدامها كوروتينات في asyncio، ونثق أنك ستستمتع بقراءتها كما استمتعنا بكتبتها. وبعد أن نشرح الكوروتينات القائمة على المولّدات، سنستخدمها في زاحف الويب غير المتزامن لدينا.</p>
<h2 id="كيف-تعمل-مولدات-python">كيف تعمل مولّدات Python</h2>
<p>قبل أن تفهم مولّدات Python، عليك أن تفهم كيف تعمل دوال Python العادية. فعادةً، حين تستدعي دالة Python روتيناً فرعياً، يحتفظ الروتين الفرعي بالتحكم حتى يعود أو يطرح استثناء. ثم يعود التحكم إلى المستدعي:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">foo</span>():
<span class="hljs-meta">... </span>    bar()
...
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">bar</span>():
<span class="hljs-meta">... </span>    <span class="hljs-keyword">pass</span>
</code></pre>
<p>مفسّر Python القياسي مكتوب بلغة C. وتُسمّى دالة C التي تنفّذ دالة Python، باسم طموح، <code>PyEval_EvalFrameEx</code>. وهي تأخذ كائن إطار مكدس Python وتقيّم شيفرة بايت Python في سياق ذلك الإطار. وهذه شيفرة البايت الخاصة بـ <code>foo</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">import</span> dis
<span class="hljs-meta">&gt;&gt;&gt; </span>dis.dis(foo)
  <span class="hljs-number">2</span>           <span class="hljs-number">0</span> LOAD_GLOBAL              <span class="hljs-number">0</span> (bar)
              <span class="hljs-number">3</span> CALL_FUNCTION            <span class="hljs-number">0</span> (<span class="hljs-number">0</span> positional, <span class="hljs-number">0</span> keyword pair)
              <span class="hljs-number">6</span> POP_TOP
              <span class="hljs-number">7</span> LOAD_CONST               <span class="hljs-number">0</span> (<span class="hljs-literal">None</span>)
             <span class="hljs-number">10</span> RETURN_VALUE
</code></pre>
<p>تحمّل الدالة <code>foo</code> القيمة <code>bar</code> على مكدسها وتستدعيها، ثم تُخرج قيمة إرجاعها من المكدس، وتحمّل <code>None</code> على المكدس، وتعيد <code>None</code>.</p>
<p>وحين تصادف <code>PyEval_EvalFrameEx</code> شيفرة البايت <code>CALL_FUNCTION</code>، فإنها تنشئ إطار مكدس Python جديداً وتستدعي نفسها بشكل متكرر: أي أنها تنادي <code>PyEval_EvalFrameEx</code> بشكل متكرر مع الإطار الجديد، الذي يُستخدم لتنفيذ <code>bar</code>.</p>
<p>ومن المهم جداً أن نفهم أن إطارات مكدس Python تُخصَّص في ذاكرة الكومة (heap)! فمفسّر Python برنامج C عادي، لذا إطارات مكدسه إطارات مكدس عادية. لكن إطارات مكدس <em>Python</em> التي يتعامل معها تقع في الكومة. ومن بين المفاجآت الأخرى أن هذا يعني أن إطار مكدس Python قد يبقى بعد انتهاء استدعاء دالته. ولرؤية ذلك تفاعلياً، احفظ الإطار الحالي من داخل <code>bar</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">import</span> inspect
<span class="hljs-meta">&gt;&gt;&gt; </span>frame = <span class="hljs-literal">None</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">foo</span>():
<span class="hljs-meta">... </span>    bar()
...
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">bar</span>():
<span class="hljs-meta">... </span>    <span class="hljs-keyword">global</span> frame
<span class="hljs-meta">... </span>    frame = inspect.currentframe()
...
<span class="hljs-meta">&gt;&gt;&gt; </span>foo()
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-comment"># The frame was executing the code for &#x27;bar&#x27;.</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>frame.f_code.co_name
<span class="hljs-string">&#x27;bar&#x27;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-comment"># Its back pointer refers to the frame for &#x27;foo&#x27;.</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>caller_frame = frame.f_back
<span class="hljs-meta">&gt;&gt;&gt; </span>caller_frame.f_code.co_name
<span class="hljs-string">&#x27;foo&#x27;</span>
</code></pre>
<p>\\aosafigure[240pt]/images/500-lines/crawler-0-function_calls.webp{استدعاءات الدوال}{500l.crawler.functioncalls}</p>
<p>لقد استُؤنفت المسرح الآن لمولّدات Python التي تستخدم القطع البناءية نفسها — كائنات الشيفرة وإطارات المكدس — ببراعة استثنائية.</p>
<p>وهذه دالة مولّد:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_fn</span>():
<span class="hljs-meta">... </span>    result = <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
<span class="hljs-meta">... </span>    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;result of yield: {}&#x27;</span>.<span class="hljs-built_in">format</span>(result))
<span class="hljs-meta">... </span>    result2 = <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>
<span class="hljs-meta">... </span>    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;result of 2nd yield: {}&#x27;</span>.<span class="hljs-built_in">format</span>(result2))
<span class="hljs-meta">... </span>    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;done&#x27;</span>
<span class="hljs-meta">... </span>    
</code></pre>
<p>وحين يترجم Python <code>gen_fn</code> إلى شيفرة بايت، يرى عبارة <code>yield</code> ويعلم أن <code>gen_fn</code> دالة مولّد لا دالة عادية. ويضبط رايةً لتذكر هذه الحقيقة:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-comment"># The generator flag is bit position 5.</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>generator_bit = <span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">5</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">bool</span>(gen_fn.__code__.co_flags &amp; generator_bit)
<span class="hljs-literal">True</span>
</code></pre>
<p>وحين تستدعي دالة مولّد، يرى Python راية المولّد، ولا ينفّذ الدالة فعلياً. وبدلاً من ذلك ينشئ مولّداً:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen = gen_fn()
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">type</span>(gen)
&lt;<span class="hljs-keyword">class</span> <span class="hljs-string">&#x27;generator&#x27;</span>&gt;
</code></pre>
<p>ويغلّف مولّد Python إطار مكدس إضافةً إلى مرجع إلى شيفرة ما، وهي جسم <code>gen_fn</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen.gi_code.co_name
<span class="hljs-string">&#x27;gen_fn&#x27;</span>
</code></pre>
<p>كل المولّدات الناتجة من استدعاءات <code>gen_fn</code> تشير إلى هذه الشيفرة نفسها. لكن لكل منها إطار مكدس خاص به. وهذا الإطار ليس على أي مكدس فعلي، بل يجلس في ذاكرة الكومة بانتظار الاستخدام:</p>
<p>\\aosafigure[240pt]/images/500-lines/crawler-1-generator.webp{المولّدات}{500l.crawler.generators}</p>
<p>وللإطار مؤشر «آخر تعليمة»، أي التعليمة التي نفّذها آخر مرة. وفي البداية يكون مؤشر آخر تعليمة يساوي -1، ما يعني أن المولّد لم يبدأ بعد:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen.gi_frame.f_lasti
-<span class="hljs-number">1</span>
</code></pre>
<p>وحين نستدعي <code>send</code>، يصل المولّد إلى أول <code>yield</code> ويتوقف. وقيمة إرجاع <code>send</code> هي 1، لأن هذا ما يمرره <code>gen</code> إلى تعبير <code>yield</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen.send(<span class="hljs-literal">None</span>)
<span class="hljs-number">1</span>
</code></pre>
<p>أصبح مؤشر تعليمات المولّد الآن على بعد 3 بايتات من البداية، في منتصف الطريق ضمن الـ 56 بايتاً من شيفرة Python المُصرَّفة:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen.gi_frame.f_lasti
<span class="hljs-number">3</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(gen.gi_code.co_code)
<span class="hljs-number">56</span>
</code></pre>
<p>ويمكن استئناف المولّد في أي وقت ومن أي دالة، لأن إطار مكدسه ليس على المكدس فعلياً: بل على الكومة. وموضعه في تسلسل الاستدعاءات غير ثابت، ولا يلزمه الالتزام بترتيب التنفيذ «آخر داخل، أول خارج» كما تفعل الدوال العادية. إنه مُحرَّر، يطوف حرةً كسحابة.</p>
<p>ويمكننا إرسال القيمة &quot;hello&quot; إلى المولّد فتصبح نتيجة تعبير <code>yield</code>، ويستمر المولّد حتى يُنزِل 2:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen.send(<span class="hljs-string">&#x27;hello&#x27;</span>)
result of <span class="hljs-keyword">yield</span>: hello
<span class="hljs-number">2</span>
</code></pre>
<p>وأصبح إطار مكدسه يحتوي الآن على المتغير المحلي <code>result</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen.gi_frame.f_locals
{<span class="hljs-string">&#x27;result&#x27;</span>: <span class="hljs-string">&#x27;hello&#x27;</span>}
</code></pre>
<p>أما المولّدات الأخرى المنشأة من <code>gen_fn</code> فستكون لها إطارات مكدس ومتغيّرات محلية خاصة بها.</p>
<p>وحين نستدعي <code>send</code> من جديد، يستمر المولّد من <code>yield</code> الثاني وينتهي بإثارة الاستثناء الخاص <code>StopIteration</code>:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen.send(<span class="hljs-string">&#x27;goodbye&#x27;</span>)
result of 2nd <span class="hljs-keyword">yield</span>: goodbye
Traceback (most recent call last):
  File <span class="hljs-string">&quot;&lt;input&gt;&quot;</span>, line <span class="hljs-number">1</span>, <span class="hljs-keyword">in</span> &lt;module&gt;
StopIteration: done
</code></pre>
<p>وللاستثناء قيمة، وهي قيمة إرجاع المولّد: السلسلة <code>&quot;done&quot;</code>.</p>
<h2 id="بناء-الكوروتينات-باستخدام-المولدات">بناء الكوروتينات باستخدام المولّدات</h2>
<p>إذن يستطيع المولّد أن يتوقف، وأن يُستأنف بقيمة، ولديه قيمة إرجاع. يبدو وكأنه أساس جيد لنبني عليه نموذج برمجة غير متزامنة، بلا دوال استدعاء متشابكة! نريد بناء «كوروتين»: روتين يُجدول تعاونياً مع روتينات أخرى في البرنامج. وستكون كوروتيناتنا نسخة مبسّطة من الموجودة في مكتبة «asyncio» القياسية في Python. وكما في asyncio، سنستخدم المولّدات والأشياء المستقبلية (futures) وتعبير «yield from».</p>
<p>نحتاج أولاً إلى وسيلة لتمثيل نتيجة مستقبلية تنتظرها كوروتين. إليك نسخة مُجرَّدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Future</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.result = <span class="hljs-literal">None</span>
        <span class="hljs-variable language_">self</span>._callbacks = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_done_callback</span>(<span class="hljs-params">self, fn</span>):
        <span class="hljs-variable language_">self</span>._callbacks.append(fn)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_result</span>(<span class="hljs-params">self, result</span>):
        <span class="hljs-variable language_">self</span>.result = result
        <span class="hljs-keyword">for</span> fn <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>._callbacks:
            fn(<span class="hljs-variable language_">self</span>)
</code></pre>
<p>يكون المستقبل في البداية «معلَّقاً». ويصبح «محلولاً» باستدعاء <code>set_result</code>.[^12]</p>
<p>ولنكيّف جالبنا ليستخدم الأشياء المستقبلية والكوروتينات. فقد كتبنا <code>fetch</code> بدالة استدعاء:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Fetcher</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.sock = socket.socket()
        <span class="hljs-variable language_">self</span>.sock.setblocking(<span class="hljs-literal">False</span>)
        <span class="hljs-keyword">try</span>:
            <span class="hljs-variable language_">self</span>.sock.connect((<span class="hljs-string">&#x27;xkcd.com&#x27;</span>, <span class="hljs-number">80</span>))
        <span class="hljs-keyword">except</span> BlockingIOError:
            <span class="hljs-keyword">pass</span>
        selector.register(<span class="hljs-variable language_">self</span>.sock.fileno(),
                          EVENT_WRITE,
                          <span class="hljs-variable language_">self</span>.connected)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">connected</span>(<span class="hljs-params">self, key, mask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;connected!&#x27;</span>)
        <span class="hljs-comment"># And so on....</span>
</code></pre>
<p>يبدأ تابع <code>fetch</code> بالاتصال بمقبس، ثم يسجّل دالة الاستدعاء <code>connected</code> لتُنفَّذ عندما يصبح المقبس جاهزاً. والآن يمكننا دمج هاتين الخطوتين في كوروتين واحد:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self</span>):
        sock = socket.socket()
        sock.setblocking(<span class="hljs-literal">False</span>)
        <span class="hljs-keyword">try</span>:
            sock.connect((<span class="hljs-string">&#x27;xkcd.com&#x27;</span>, <span class="hljs-number">80</span>))
        <span class="hljs-keyword">except</span> BlockingIOError:
            <span class="hljs-keyword">pass</span>

        f = Future()

        <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_connected</span>():
            f.set_result(<span class="hljs-literal">None</span>)

        selector.register(sock.fileno(),
                          EVENT_WRITE,
                          on_connected)
        <span class="hljs-keyword">yield</span> f
        selector.unregister(sock.fileno())
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;connected!&#x27;</span>)
</code></pre>
<p>أصبح <code>fetch</code> الآن دالة مولّد لا دالة عادية، لأنها تحتوي عبارة <code>yield</code>. وننشئ شيئاً مستقبلياً معلَّقاً، ثم نُنزّله لنوقف <code>fetch</code> حتى يصبح المقبس جاهزاً. أمّا الدالة الداخلية <code>on_connected</code> فتُحلّ الشيء المستقبلي.</p>
<p>لكن حين يُحلّ الشيء المستقبلي، ما الذي يستأنف المولّد؟ نحتاج إلى <em>مُشغِّل</em> (driver) للكوروتين. ولنسمّه «مهمة» (task):</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Task</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, coro</span>):
        <span class="hljs-variable language_">self</span>.coro = coro
        f = Future()
        f.set_result(<span class="hljs-literal">None</span>)
        <span class="hljs-variable language_">self</span>.step(f)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">step</span>(<span class="hljs-params">self, future</span>):
        <span class="hljs-keyword">try</span>:
            next_future = <span class="hljs-variable language_">self</span>.coro.send(future.result)
        <span class="hljs-keyword">except</span> StopIteration:
            <span class="hljs-keyword">return</span>

        next_future.add_done_callback(<span class="hljs-variable language_">self</span>.step)

<span class="hljs-comment"># Begin fetching http://xkcd.com/353/</span>
fetcher = Fetcher(<span class="hljs-string">&#x27;/353/&#x27;</span>)
Task(fetcher.fetch())

loop()
</code></pre>
<p>تبدأ المهمةُ مولّد <code>fetch</code> بإرسال <code>None</code> إليه. ثم يعمل <code>fetch</code> حتى يُنزّل شيئاً مستقبلياً، تلتقطه المهمة باسم <code>next_future</code>. وحانما يتصل المقبس، تشغّل حلقة الأحداث دالة الاستدعاء <code>on_connected</code>، التي تُحلّ الشيء المستقبلي، الذي يستدعي <code>step</code>، التي تستأنف <code>fetch</code>.</p>
<h2 id="تجزئة-الكوروتينات-باستخدام-yield-from">تجزئة الكوروتينات باستخدام <code>yield from</code></h2>
<p>ما إن يتصل المقبس، نرسل طلب HTTP GET ونقرأ استجابة الخادم. ولم تعد هذه الخطوات مشرّقة بين دوال الاستدعاء؛ نجمعها في دالة المولّد نفسها:</p>
<pre><code class="language-python">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># ... connection logic from above, then:</span>
        sock.send(request.encode(<span class="hljs-string">&#x27;ascii&#x27;</span>))

        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            f = Future()

            <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_readable</span>():
                f.set_result(sock.recv(<span class="hljs-number">4096</span>))

            selector.register(sock.fileno(),
                              EVENT_READ,
                              on_readable)
            chunk = <span class="hljs-keyword">yield</span> f
            selector.unregister(sock.fileno())
            <span class="hljs-keyword">if</span> chunk:
                <span class="hljs-variable language_">self</span>.response += chunk
            <span class="hljs-keyword">else</span>:
                <span class="hljs-comment"># Done reading.</span>
                <span class="hljs-keyword">break</span>
</code></pre>
<p>هذه الشيفرة، التي تقرأ رسالة كاملة من مقبس، تبدو مفيدة على نطاق عام. فكيف يمكننا تجزئتها من <code>fetch</code> إلى روتين فرعي؟ والآن يدخل على المسرح تعبير <code>yield from</code> المحتفى به في Python 3. فهو يتيح لمولّد أن <em>يفوّض</em> (delegate) العمل لمولّد آخر.</p>
<p>ولكي نرى كيف، لنعد إلى مثال المولّد البسيط:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_fn</span>():
<span class="hljs-meta">... </span>    result = <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
<span class="hljs-meta">... </span>    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;result of yield: {}&#x27;</span>.<span class="hljs-built_in">format</span>(result))
<span class="hljs-meta">... </span>    result2 = <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>
<span class="hljs-meta">... </span>    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;result of 2nd yield: {}&#x27;</span>.<span class="hljs-built_in">format</span>(result2))
<span class="hljs-meta">... </span>    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;done&#x27;</span>
<span class="hljs-meta">... </span>    
</code></pre>
<p>ولكي نستدعي هذا المولّد من مولّد آخر، نفوّض إليه بـ <code>yield from</code> (yield from):</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-comment"># Generator function:</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">caller_fn</span>():
<span class="hljs-meta">... </span>    gen = gen_fn()
<span class="hljs-meta">... </span>    rv = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> gen
<span class="hljs-meta">... </span>    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;return value of yield-from: {}&#x27;</span>
<span class="hljs-meta">... </span>          .<span class="hljs-built_in">format</span>(rv))
...
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-comment"># Make a generator from the</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-comment"># generator function.</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>caller = caller_fn()
</code></pre>
<p>يتصرف المولّد <code>caller</code> وكأنه <code>gen</code> نفسه، المولّد الذي يفوّض إليه:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>caller.send(<span class="hljs-literal">None</span>)
<span class="hljs-number">1</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>caller.gi_frame.f_lasti
<span class="hljs-number">15</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>caller.send(<span class="hljs-string">&#x27;hello&#x27;</span>)
result of <span class="hljs-keyword">yield</span>: hello
<span class="hljs-number">2</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>caller.gi_frame.f_lasti  <span class="hljs-comment"># Hasn&#x27;t advanced.</span>
<span class="hljs-number">15</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>caller.send(<span class="hljs-string">&#x27;goodbye&#x27;</span>)
result of 2nd <span class="hljs-keyword">yield</span>: goodbye
<span class="hljs-keyword">return</span> value of <span class="hljs-keyword">yield</span>-<span class="hljs-keyword">from</span>: done
Traceback (most recent call last):
  File <span class="hljs-string">&quot;&lt;input&gt;&quot;</span>, line <span class="hljs-number">1</span>, <span class="hljs-keyword">in</span> &lt;module&gt;
StopIteration
</code></pre>
<p>وحين يُنزِل <code>caller</code> من <code>gen</code>، لا يتقدم <code>caller</code>. ولاحظ أن مؤشر تعليماته يبقى عند 15، موضع عبارة <code>yield from</code> فيه، حتى بينما يتقدم المولّد الداخلي <code>gen</code> من عبارة <code>yield</code> إلى التي تليها.[^13] ومن منظورنا خارج <code>caller</code>، لا يمكننا تمييز ما إذا كانت القيم التي يُنزِلها تأتي من <code>caller</code> أم من المولّد الذي يفوّض إليه. ومن داخل <code>gen</code>، لا يمكننا تمييز ما إذا كانت القيم تُرسَل من <code>caller</code> أم من خارجه. وتعبير <code>yield from</code> هو قناة بلا احتكاك، تتدفق عبرها القيم إلى <code>gen</code> وخارجه حتى يكتمل <code>gen</code>.</p>
<p>ويمكن للكوروتين أن يفوّض عملاً إلى كوروتين فرعي بـ <code>yield from</code> ويستقبل نتيجة ذلك العمل. ولاحظ في الأعلى أن <code>caller</code> طبع &quot;return value of yield-from: done&quot;. وحين اكتمل <code>gen</code>، أصبحت قيمته المُرجَعة هي قيمة تعبير <code>yield from</code> في <code>caller</code>:</p>
<pre><code class="language-python">    rv = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> gen
</code></pre>
<p>وفيما سبق، حين انتقدنا البرمجة غير المتزامنة القائمة على دوال الاستدعاء، كان أشدّ اعتراضاتنا على «تمزيق المكدس» (stack ripping): فحين تلقّي دالة استدعاء استثناءً، يكون أثر المكدس عديم الفائدة عادةً. فهو يُظهر فقط أن حلقة الأحداث كانت تشغّل دالة الاستدعاء، لا <em>سبب</em> ذلك. فكيف تصير الأمور مع الكوروتينات؟</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_fn</span>():
<span class="hljs-meta">... </span>    <span class="hljs-keyword">raise</span> Exception(<span class="hljs-string">&#x27;my error&#x27;</span>)
<span class="hljs-meta">&gt;&gt;&gt; </span>caller = caller_fn()
<span class="hljs-meta">&gt;&gt;&gt; </span>caller.send(<span class="hljs-literal">None</span>)
Traceback (most recent call last):
  File <span class="hljs-string">&quot;&lt;input&gt;&quot;</span>, line <span class="hljs-number">1</span>, <span class="hljs-keyword">in</span> &lt;module&gt;
  File <span class="hljs-string">&quot;&lt;input&gt;&quot;</span>, line <span class="hljs-number">3</span>, <span class="hljs-keyword">in</span> caller_fn
  File <span class="hljs-string">&quot;&lt;input&gt;&quot;</span>, line <span class="hljs-number">2</span>, <span class="hljs-keyword">in</span> gen_fn
Exception: my error
</code></pre>
<p>هذا أكثر فائدة بكثير! فأثر المكدس يُظهر أن <code>caller_fn</code> كان يفوّض إلى <code>gen_fn</code> حين أُلقي الخطأ. وهو أكثر طمأنةً أيضاً، يمكننا أن نلفّ الاستدعاء إلى كوروتين فرعي في معالج استثناءات، تماماً كما نفعل مع الروتينات الفرعية العادية:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">gen_fn</span>():
<span class="hljs-meta">... </span>    <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>
<span class="hljs-meta">... </span>    <span class="hljs-keyword">raise</span> Exception(<span class="hljs-string">&#x27;uh oh&#x27;</span>)
...
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">def</span> <span class="hljs-title function_">caller_fn</span>():
<span class="hljs-meta">... </span>    <span class="hljs-keyword">try</span>:
<span class="hljs-meta">... </span>        <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> gen_fn()
<span class="hljs-meta">... </span>    <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> exc:
<span class="hljs-meta">... </span>        <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;caught {}&#x27;</span>.<span class="hljs-built_in">format</span>(exc))
...
<span class="hljs-meta">&gt;&gt;&gt; </span>caller = caller_fn()
<span class="hljs-meta">&gt;&gt;&gt; </span>caller.send(<span class="hljs-literal">None</span>)
<span class="hljs-number">1</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>caller.send(<span class="hljs-string">&#x27;hello&#x27;</span>)
caught uh oh
</code></pre>
<p>إذن نجزّئ المنطق بكوروتينات فرعية تماماً كما نفعل بالروتينات الفرعية العادية. ولنتجزّئ بعض الكوروتينات الفرعية المفيدة من جالبنا. نكتب كوروتين <code>read</code> لاستقبال مقطع واحد:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">read</span>(<span class="hljs-params">sock</span>):
    f = Future()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_readable</span>():
        f.set_result(sock.recv(<span class="hljs-number">4096</span>))

    selector.register(sock.fileno(), EVENT_READ, on_readable)
    chunk = <span class="hljs-keyword">yield</span> f  <span class="hljs-comment"># Read one chunk.</span>
    selector.unregister(sock.fileno())
    <span class="hljs-keyword">return</span> chunk
</code></pre>
<p>ونبني على <code>read</code> عبر كوروتين <code>read_all</code> يستقبل رسالة كاملة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">read_all</span>(<span class="hljs-params">sock</span>):
    response = []
    <span class="hljs-comment"># Read whole response.</span>
    chunk = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> read(sock)
    <span class="hljs-keyword">while</span> chunk:
        response.append(chunk)
        chunk = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> read(sock)

    <span class="hljs-keyword">return</span> <span class="hljs-string">b&#x27;&#x27;</span>.join(response)
</code></pre>
<p>فإن حدّقت العين بالطريقة الصحيحة، تختفي تعبيرات <code>yield from</code> وتبدو هذه كدوال تقليدية تقوم بإدخال/إخراج حاجب. لكن في الواقع <code>read</code> و<code>read_all</code> كوروتينات. والتنازل من <code>read</code> يوقف <code>read_all</code> حتى يكتمل الإدخال/الإخراج. وأثناء توقف <code>read_all</code>، تقوم حلقة أحداث asyncio بأعمال أخرى وتنتظر أحداث إدخال/إخراج أخرى؛ ويُستأنف <code>read_all</code> بنتيجة <code>read</code> في الدورة التالية من الحلقة ما إن يصبح حدثه جاهزاً.</p>
<p>وعند جذر المكدس، يستدعي <code>fetch</code> الدالة <code>read_all</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Fetcher</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self</span>):
		 <span class="hljs-comment"># ... connection logic from above, then:</span>
        sock.send(request.encode(<span class="hljs-string">&#x27;ascii&#x27;</span>))
        <span class="hljs-variable language_">self</span>.response = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> read_all(sock)
</code></pre>
<p>ولحسن الحظ، لا يحتاج صنف Task إلى أي تعديل. فهو يشغّل كوروتين <code>fetch</code> الخارجي كما كان تماماً من قبل:</p>
<pre><code class="language-python">Task(fetcher.fetch())
loop()
</code></pre>
<p>وحين يُنزّل <code>read</code> شيئاً مستقبلياً، تستقبله المهمة عبر قناة تعبيرات <code>yield from</code>، تماماً كما لو أن الشيء المستقبلي أُنزِل مباشرةً من <code>fetch</code>. وحين تحلّ الحلقة شيئاً مستقبلياً، ترسل المهمة نتيجته إلى <code>fetch</code>، وتستقبل <code>read</code> القيمة، تماماً كما لو أن المهمة تشغّل <code>read</code> مباشرة:</p>
<p>\\aosafigure[240pt]/images/500-lines/crawler-2-yield_from.webp{التنازل من}{500l.crawler.yieldfrom}</p>
<p>ولإتقان تنفيذنا للكوروتينات، نُحسن تفصيلاً واحداً: فشيفرتنا تستخدم <code>yield</code> حين تنتظر شيئاً مستقبلياً، لكنها تستخدم <code>yield from</code> حين تفوّض إلى كوروتين فرعي. والأدقّ أن نستخدم <code>yield from</code> كلما توقّفت كوروتين. وعندها لا تحتاج الكوروتين إلى الانشغال بنوع الشيء الذي تنتظره.</p>
<p>ونستفيد من التطابق العميق في Python بين المولّدات والمُكرَّرات (iterators). فتقديم المولّد، من منظور المستدعي، هو نفسه تقديم مُكرَّر. ولذلك نجعل صنف Future قابلاً للتكرار بتنفيذ تابع خاص:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method on Future class.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__iter__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Tell Task to resume me here.</span>
        <span class="hljs-keyword">yield</span> <span class="hljs-variable language_">self</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.result
</code></pre>
<p>تابع <code>__iter__</code> في الشيء المستقبلي هو كوروتين يُنزّل الشيء المستقبلي نفسه. والآن حين نستبدل شيفرة كهذه:</p>
<pre><code class="language-python"><span class="hljs-comment"># f is a Future.</span>
<span class="hljs-keyword">yield</span> f
</code></pre>
<p>... بهذه:</p>
<pre><code class="language-python"><span class="hljs-comment"># f is a Future.</span>
<span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> f
</code></pre>
<p>... تكون النتيجة واحدة! فالمهمة المُشغِّلة تستقبل الشيء المستقبلي من استدعائها لـ <code>send</code>، وحين يُحلّ الشيء المستقبلي ترسل النتيجة الجديدة عائداً إلى الكوروتين.</p>
<p>فما فائدة استخدام <code>yield from</code> في كل مكان؟ ولماذا هذا أفضل من انتظار الأشياء المستقبلية بـ <code>yield</code> وتفويض العمل إلى الكوروتينات الفرعية بـ <code>yield from</code>؟ إنه أفضل لأن أصبح بإمكان تابع الآن أن يغيّر تنفيذه بحرية دون التأثير في المستدعي: فقد يكون تابعاً عادياً يعيد شيئاً مستقبلياً سيُحلّ إلى قيمة، وقد يكون كوروتين يحتوي تعبيرات <code>yield from</code> ويُعيد قيمة. وفي الحالتين، لا يحتاج المستدعي سوى أن يفوّض إلى التابع بـ <code>yield from</code> لينتظر النتيجة.</p>
<p>أيها القارئ الكريم، لقد بلغنا نهاية عرضنا الممتع للكوروتينات في asyncio. فقد تبيّصنا في آليات المولّدات، ورسمنا تنفيذاً مبسطاً للأشياء المستقبلية والمهام. وبيّنا كيف يحقق asyncio أفضل ما في العالمين: إدخال/إخراج متزامن أكثر كفاءة من الخيوط وأوضح من دوال الاستدعاء. وبطبيعة الحال، فإن asyncio الحقيقي أكثر تعقيداً بكثير من رسمنا هذا. فالإطار الحقيقي يعالج الإدخال/الإخراج بلا نسخ، والجدولة العادلة، ومعالجة الاستثناءات، ووفرة من الميزات الأخرى.</p>
<p>وللمستخدم الذي يستعمل asyncio، تكون البرمجة بالكوروتينات أبسط بكثير مما رأيته هنا. فنحن في الشيفرة أعلاه طبّقنا الكوروتينات من مبادئها الأولى، فرأيت دوال الاستدعاء والمهام والأشياء المستقبلية. بل ورأيت حتى المقابس غير الحاجبة والاستدعاء إلى <code>select</code>. لكن حين يحين وقت بناء تطبيق باستخدام asyncio، لا يظهر أيٌّ من هذا في شيفرتك. وكما وعدناك، تستطيع الآن جلب عنوان URL بأناقة:</p>
<pre><code class="language-python"><span class="hljs-meta">    @asyncio.coroutine</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self, url</span>):
        response = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.session.get(url)
        body = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> response.read()
</code></pre>
<p>وراضياً بهذا العرض، نعود إلى مهمتنا الأصلية: كتابة زاحف ويب غير متزامن باستخدام asyncio.</p>
<h2 id="تنسيق-الكوروتينات">تنسيق الكوروتينات</h2>
<p>بدأنا بوصف كيف نريد أن يعمل زاحفنا. والآن حان وقت تنفيذه بكوروتينات asyncio.</p>
<p>سيبدأ زاحفنا بجلب الصفحة الأولى، وتحليل روابطها، وإضافتها إلى طابور. وبعد ذلك ينتشر عبر الموقع فيجلب الصفحات في وقت واحد. لكن — من أجل الحدّ من الحمل على العميل والخادم — نريد أقصى عدد من العمال يعمل، لا أكثر. فمتى أتمّ عامل جلب صفحة، عليه أن يسحب الرابط التالي من الطابور فوراً. وسنمرّ بفترات لا يكفي فيها العمل، فيتعطّل بعض العمال. لكن حين يصطدم عامل بصفحة غنية بروابط جديدة، ينمو الطابور فجأة وينبغي أن يستيقظ أي عمال متوقّفون وينشغلوا بالعمل. وأخيراً، يجب أن ينتهي برنامجنا بمجرد انتهاء عمله.</p>
<p>وتخيّل لو كان العمال خيوطاً. فكيف نعبّر عن خوارزمية الزاحف؟ يمكننا استخدام طابور متزامن<a href="https://docs.python.org/3/library/queue.html">^5</a> من مكتبة Python القياسية. فمع كل عنصر يوضع في الطابور يزيد الطابور عدّاد «المهام» لديه. وتستدعي خيوط العمال <code>task_done</code> بعد إتمام العمل على عنصر ما. ويتحيّب الخيط الرئيسي على <code>Queue.join</code> حتى يقابل كل عنصر وُضع في الطابور استدعاء <code>task_done</code>، ثم يخرج.</p>
<p>وتستخدم الكوروتينات النمط نفسه تماماً مع طابور asyncio! أولاً نستورده<a href="https://docs.python.org/3/library/asyncio-sync.html">^6</a>:</p>
<pre><code class="language-python"><span class="hljs-keyword">try</span>:
    <span class="hljs-keyword">from</span> asyncio <span class="hljs-keyword">import</span> JoinableQueue <span class="hljs-keyword">as</span> Queue
<span class="hljs-keyword">except</span> ImportError:
    <span class="hljs-comment"># In Python 3.5, asyncio.JoinableQueue is</span>
    <span class="hljs-comment"># merged into Queue.</span>
    <span class="hljs-keyword">from</span> asyncio <span class="hljs-keyword">import</span> Queue
</code></pre>
<p>ونجمع الحالة المشتركة للعمال في صنف زاحف، ونكتب المنطق الرئيسي في تابعه <code>crawl</code>. ونشغّل <code>crawl</code> في كوروتين ونشغّل حلقة أحداث asyncio حتى ينتهي <code>crawl</code>:</p>
<pre><code class="language-python">loop = asyncio.get_event_loop()

crawler = crawling.Crawler(<span class="hljs-string">&#x27;http://xkcd.com&#x27;</span>,
                           max_redirect=<span class="hljs-number">10</span>)

loop.run_until_complete(crawler.crawl())
</code></pre>
<p>يبدأ الزاحف بعنوان URL جذر و<code>max_redirect</code>، وهو عدد عمليات إعادة التوجيه التي هو مستعداً لاتباعها لجلب أي عنوان URL بعينه. وهو يضع الزوج <code>(URL, max_redirect)</code> في الطابور. (ولأسباب ذلك، ابقَ معنا.)</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Crawler</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, root_url, max_redirect</span>):
        <span class="hljs-variable language_">self</span>.max_tasks = <span class="hljs-number">10</span>
        <span class="hljs-variable language_">self</span>.max_redirect = max_redirect
        <span class="hljs-variable language_">self</span>.q = Queue()
        <span class="hljs-variable language_">self</span>.seen_urls = <span class="hljs-built_in">set</span>()
        
        <span class="hljs-comment"># aiohttp&#x27;s ClientSession does connection pooling and</span>
        <span class="hljs-comment"># HTTP keep-alives for us.</span>
        <span class="hljs-variable language_">self</span>.session = aiohttp.ClientSession(loop=loop)
        
        <span class="hljs-comment"># Put (URL, max_redirect) in the queue.</span>
        <span class="hljs-variable language_">self</span>.q.put((root_url, <span class="hljs-variable language_">self</span>.max_redirect))
</code></pre>
<p>أصبح عدد المهام غير المنتهية في الطابور هو واحد الآن. وفي شيفرتنا الرئيسية نطلق حلقة الأحداث وتابع <code>crawl</code>:</p>
<pre><code class="language-python">loop.run_until_complete(crawler.crawl())
</code></pre>
<p>تطلق الكوروتين <code>crawl</code> العمال. فهي كخيط رئيسي: تتوقف عند <code>join</code> حتى تنتهي كل المهام، بينما يعمل العمال في الخلفية.</p>
<pre><code class="language-python"><span class="hljs-meta">    @asyncio.coroutine</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">crawl</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Run the crawler until all work is done.&quot;&quot;&quot;</span>
        workers = [asyncio.Task(<span class="hljs-variable language_">self</span>.work())
                   <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.max_tasks)]

        <span class="hljs-comment"># When all work is done, exit.</span>
        <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.q.join()
        <span class="hljs-keyword">for</span> w <span class="hljs-keyword">in</span> workers:
            w.cancel()
</code></pre>
<p>لو كانوا العمال خيوطاً، ربما لم نرغب في تشغيلهم جميعاً دفعة واحدة. ولتجنّب إنشاء خيوط باهظة قبل التأكد من الضرورة، تنمو مجموعة الخيوط عادةً عند الطلب. لكن الكوروتينات رخيصة، فنكتفي ببساطة ببدء أقصى عدد مسموح به.</p>
<p>ومن اللافت كيف نوقف الزاحف. فحين يُحلّ المستقبل <code>join</code>، تكون مهام العمال حيّة لكن معلّقة:</p>
<pre><code>ERROR:asyncio:Task was destroyed but it is pending!
</code></pre>
<p>وكيف يعمل <code>cancel</code>؟ للمولّدات ميزة لم نعرضها عليك بعد. تستطيع أن تُلقي استثناءً داخل مولّد من الخارج:</p>
<pre><code class="language-python"><span class="hljs-meta">&gt;&gt;&gt; </span>gen = gen_fn()
<span class="hljs-meta">&gt;&gt;&gt; </span>gen.send(<span class="hljs-literal">None</span>)  <span class="hljs-comment"># Start the generator as usual.</span>
<span class="hljs-number">1</span>
<span class="hljs-meta">&gt;&gt;&gt; </span>gen.throw(Exception(<span class="hljs-string">&#x27;error&#x27;</span>))
Traceback (most recent call last):
  File <span class="hljs-string">&quot;&lt;input&gt;&quot;</span>, line <span class="hljs-number">3</span>, <span class="hljs-keyword">in</span> &lt;module&gt;
  File <span class="hljs-string">&quot;&lt;input&gt;&quot;</span>, line <span class="hljs-number">2</span>, <span class="hljs-keyword">in</span> gen_fn
Exception: error
</code></pre>
<p>يُستأنف المولّد بواسطة <code>throw</code>، لكنه الآن يطرح استثناءً. فإذا لم تلتقطه أي شيفرة في مكدس استدعاءات المولّد، فإن الاستثناء يطفو عائداً إلى الأعلى. ولإلغاء الكوروتين الخاصة بمهمة ما:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method of Task class.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">cancel</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.coro.throw(CancelledError)
</code></pre>
<p>أينما كان المولّد متوقفاً، عند عبارة <code>yield from</code> ما، فإنه يستأنف ويطرح استثناءً. ونحن نتعامل مع الإلغاء في تابع <code>step</code> الخاص بالمهمة:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method of Task class.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">step</span>(<span class="hljs-params">self, future</span>):
        <span class="hljs-keyword">try</span>:
            next_future = <span class="hljs-variable language_">self</span>.coro.send(future.result)
        <span class="hljs-keyword">except</span> CancelledError:
            <span class="hljs-variable language_">self</span>.cancelled = <span class="hljs-literal">True</span>
            <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">except</span> StopIteration:
            <span class="hljs-keyword">return</span>

        next_future.add_done_callback(<span class="hljs-variable language_">self</span>.step)
</code></pre>
<p>والآن تعرف المهمة أنها أُلغيت، فحين تُدمَّر لا تصرخ في وجه نور الزوال.</p>
<p>وما إن تلغي <code>crawl</code> العمال، فإنها تخرج. وترى حلقة الأحداث أن الكوروتين اكتملت (وسنرى كيف لاحقاً)، فترد هي الأخرى:</p>
<pre><code class="language-python">loop.run_until_complete(crawler.crawl())
</code></pre>
<p>يجمع تابع <code>crawl</code> كل ما يجب أن تفعله الكوروتين الرئيسية. أما كوروتينات العمال فهي التي تأخذ عناوين URL من الطابور وتجلبها وتحللها وتبحث عن روابط جديدة. وكل عامل يشغّل كوروتين <code>work</code> بشكل مستقل:</p>
<pre><code class="language-python"><span class="hljs-meta">    @asyncio.coroutine</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">work</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            url, max_redirect = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.q.get()

            <span class="hljs-comment"># Download page and add new links to self.q.</span>
            <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.fetch(url, max_redirect)
            <span class="hljs-variable language_">self</span>.q.task_done()
</code></pre>
<p>يرى Python أن هذه الشيفرة تحتوي تعبيرات <code>yield from</code> فيترجمها إلى دالة مولّد.فكرة في في <code>crawl</code>، حين تستدعي الكوروتين الرئيسية <code>self.work</code> عشر مرات، لا تنفّذ هذه الشيفرة فعلاً: إنها لا تنشئ سوى عشرة كائنات مولّد تحيل إلى هذه الشيفرة. وتغلّف كلاً منها في مهمة. وتتلقى المهمة كل شيء مستقبلي يُنزّله المولّد، وتشغّل المولّد باستدعاء <code>send</code> مع نتيجة كل شيء مستقبلي عند حلّه. ولأن للمولّدات إطارات مكدس خاصة بها، فإنها تعمل باستقلال، ولكل منها متغيّرات محلية ومؤشرات تعليمات خاصة.</p>
<p>وينسّق العامل مع زملائه عبر الطابور. فهو ينتظر عناوين URL جديدة عبر:</p>
<pre><code class="language-python">    url, max_redirect = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.q.get()
</code></pre>
<p>وتابع <code>get</code> في الطابور هو نفسه كوروتين: يتوقف حتى يضع أحدهم عنصراً في الطابور، ثم يستأنف ويعيد العنصر.</p>
<p>ولنلاحظ بالمصادفة أن هذا هو المكان الذي سيتوقف عنده العامل في نهاية الزحف، حين تلغيه الكوروتين الرئيسية. فمن منظور الكوروتين، تنتهي جولته الأخيرة حول الحلقة حين يطرح <code>yield from</code> استثناء <code>CancelledError</code>.</p>
<p>وحين يجلب عامل صفحة، يحلل روابطها ويضع الجديدة في الطابور، ثم يستدعي <code>task_done</code> لخفض العدّاد. وفي نهاية المطاف، يجلب عامل صفحة جرت جلب عناوين URL الخاصة بها كلها من قبل، ولا يتبقى في الطابور أي عمل. لذلك فإن استدعاء <code>task_done</code> من هذا العامل يخفض العدّاد إلى الصفر. عندئذٍ يُستأنف <code>crawl</code> الذي كان ينتظر تابع <code>join</code> الخاص بالطابور، فينهي عمله.</p>
<p>وعدنا بأن نشرح لماذا تكون عناصر الطابور أزواجاً، مثل:</p>
<pre><code class="language-python"><span class="hljs-comment"># URL to fetch, and the number of redirects left.</span>
(<span class="hljs-string">&#x27;http://xkcd.com/353&#x27;</span>, <span class="hljs-number">10</span>)
</code></pre>
<p>لعناوين URL الجديدة تتبقى عشرة إعادة توجيه. وجلب عنوان URL هذا ينتج إعادة توجيه إلى موقع جديد بشرطة مائلة في آخره. فنخفض عدد عمليات إعادة التوجيه المتبقية، ونضع الموقع التالي في الطابور:</p>
<pre><code class="language-python"><span class="hljs-comment"># URL with a trailing slash. Nine redirects left.</span>
(<span class="hljs-string">&#x27;http://xkcd.com/353/&#x27;</span>, <span class="hljs-number">9</span>)
</code></pre>
<p>كانت حزمة <code>aiohttp</code> التي نستخدمها تتبع عمليات إعادة التوجيه افتراضياً وتسعّرنا الاستجابة النهائية. لكننا نطلب منها ألا تفعل ذلك، نتعامل مع عمليات إعادة التوجيه داخل الزاحف، حتى يتمكّن من دمج مسارات إعادة التوجيه المؤدية إلى الوجهة نفسها: فإذا كنا قد رأينا عنوان URL هذا من قبل، فهو في <code>self.seen_urls</code> وقد بدأنا هذا المسار بالفعل من نقطة دخول أخرى:</p>
<p>\\aosafigure[240pt]/images/500-lines/crawler-3-redirects.webp{إعادة التوجيه}{500l.crawler.redirects}</p>
<p>فيجلب الزاحف &quot;foo&quot; ويرى أنه يُعيد التوجيه إلى &quot;baz&quot;، فيضيف &quot;baz&quot; إلى
الطابور وإلى <code>seen_urls</code>. وإذا كانت الصفحة التالية التي يجلبها هي &quot;bar&quot;، وهي
أيضاً تُعيد التوجيه إلى &quot;baz&quot;، فإن الجالب لن يضع &quot;baz&quot; في الطابور مرة أخرى. وإذا كانت
الاستجابة صفحة لا إعادة توجيه، فإن <code>fetch</code> يحللها بحثاً عن روابط
ويضع الجديدة في الطابور.</p>
<pre><code class="language-python"><span class="hljs-meta">    @asyncio.coroutine</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params">self, url, max_redirect</span>):
        <span class="hljs-comment"># Handle redirects ourselves.</span>
        response = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.session.get(
            url, allow_redirects=<span class="hljs-literal">False</span>)

        <span class="hljs-keyword">try</span>:
            <span class="hljs-keyword">if</span> is_redirect(response):
                <span class="hljs-keyword">if</span> max_redirect &gt; <span class="hljs-number">0</span>:
                    next_url = response.headers[<span class="hljs-string">&#x27;location&#x27;</span>]
                    <span class="hljs-keyword">if</span> next_url <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.seen_urls:
                        <span class="hljs-comment"># We have been down this path before.</span>
                        <span class="hljs-keyword">return</span>
    
                    <span class="hljs-comment"># Remember we have seen this URL.</span>
                    <span class="hljs-variable language_">self</span>.seen_urls.add(next_url)
                    
                    <span class="hljs-comment"># Follow the redirect. One less redirect remains.</span>
                    <span class="hljs-variable language_">self</span>.q.put_nowait((next_url, max_redirect - <span class="hljs-number">1</span>))
    	     <span class="hljs-keyword">else</span>:
    	         links = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>.parse_links(response)
    	         <span class="hljs-comment"># Python set-logic:</span>
    	         <span class="hljs-keyword">for</span> link <span class="hljs-keyword">in</span> links.difference(<span class="hljs-variable language_">self</span>.seen_urls):
                    <span class="hljs-variable language_">self</span>.q.put_nowait((link, <span class="hljs-variable language_">self</span>.max_redirect))
                <span class="hljs-variable language_">self</span>.seen_urls.update(links)
        <span class="hljs-keyword">finally</span>:
            <span class="hljs-comment"># Return connection to pool.</span>
            <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> response.release()
</code></pre>
<p>لو كانت هذه شيفرة متعددة الخيوط، لكانت سيئة التصرف مع حالات التسابق. فمثلاً، يفحص العامل إن كان رابط ما موجوداً في <code>seen_urls</code>، فإن لم يكن يضعه في الطابور ويضيفه إلى <code>seen_urls</code>. ولو قُاطع بين العمليتين، لأمكن لعامل آخر أن يحلل الرابط نفسه من صفحة مختلفة، يلاحظ أيضاً أنه ليس في <code>seen_urls</code>، ويضيفه إلى الطابور أيضاً. عندها يصبح الرابط نفسه في الطابور مرتين، مما يؤدي — في أحسن الأحوال — إلى عمل مكرر وإحصاءات خاطئة.</p>
<p>غير أن الكوروتين لا يكون عرضة للمقاطعة إلا عند تعبيرات <code>yield from</code>. وهذا فرق جوهري يجعل شيفرة الكوروتينات أقل عرضة للتسابق بكثير من الشيفرة متعددة الخيوط: فشيفرة تعدد الخيوط ملزمة بدخول قسم حرج (critical section) صراحةً عبر التقاط قفل، وإلا فإنها قابلة للمقاطعة. أما كوروتين Python فهو غير قابل للمقاطعة افتراضياً، ولا يتنازل عن التحكم إلا حين ينزّل صراحةً.</p>
<p>ولم نعد بحاجة إلى صنف جالب كما كان لدينا في البرنامج القائم على دوال الاستدعاء. فقد كان ذلك الصنف حلاً مؤقتاً لنقص في دوال الاستدعاء: فهي تحتاج إلى مكان ما لتخزين الحالة أثناء انتظار الإدخال/الإخراج، لأن متغيّراتها المحلية لا تبقى محفوظة بين الاستدعاءات. لكن كوروتين <code>fetch</code> يستطيع تخزين حالته في متغيّرات محلية كما تفعل الدالة العادية، فلا حاجة بعدئذٍ إلى صنف.</p>
<p>وحين ينتهي <code>fetch</code> من معالجة استجابة الخادم، يعود إلى المستدعي وهو <code>work</code>. ويستدعي تابع <code>work</code> الدالة <code>task_done</code> على الطابور، ثم يأخذ عنوان URL التالي من الطابور ليجلبه.</p>
<p>وحين يضع <code>fetch</code> روابط جديدة في الطابور، يزيد عدد المهام غير المنتهية ويُبقي الكوروتين الرئيسية، المنتظرة عند <code>q.join</code>، متوقفة. لكن إذا لم تكن هناك روابط لم تُرَ من قبل وكان هذا آخر عنوان URL في الطابور، فإن عدد المهام غير المنتهية يسقط إلى الصفر حين يستدعي <code>work</code> الدالة <code>task_done</code>. وهذا الحدث يُستأنف <code>join</code> وتكتمل الكوروتين الرئيسية.</p>
<p>وشيفرة الطابور التي تنسّق العمال والكوروتين الرئيسية هي كما يلي[^9]:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Queue</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>._join_future = Future()
        <span class="hljs-variable language_">self</span>._unfinished_tasks = <span class="hljs-number">0</span>
        <span class="hljs-comment"># ... other initialization ...</span>
    
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">put_nowait</span>(<span class="hljs-params">self, item</span>):
        <span class="hljs-variable language_">self</span>._unfinished_tasks += <span class="hljs-number">1</span>
        <span class="hljs-comment"># ... store the item ...</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">task_done</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>._unfinished_tasks -= <span class="hljs-number">1</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._unfinished_tasks == <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>._join_future.set_result(<span class="hljs-literal">None</span>)

<span class="hljs-meta">    @asyncio.coroutine</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">join</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._unfinished_tasks &gt; <span class="hljs-number">0</span>:
            <span class="hljs-keyword">yield</span> <span class="hljs-keyword">from</span> <span class="hljs-variable language_">self</span>._join_future
</code></pre>
<p>وتُنزّل الكوروتين الرئيسية <code>crawl</code> من <code>join</code>. فحين يخفض آخر عامل عدد المهام غير المنتهية إلى الصفر، فإنه يشير إلى <code>crawl</code> بأن يستأنف وأن ينهي عمله.</p>
<p>فالرحلة شبه منتهية. فقد بدأ برنامجنا باستدعاء <code>crawl</code>:</p>
<pre><code class="language-python">loop.run_until_complete(<span class="hljs-variable language_">self</span>.crawler.crawl())
</code></pre>
<p>وكيف ينتهي البرنامج؟ ولأن <code>crawl</code> دالة مولّد، فإن استدعاءها يعيد مولّداً. ولتشغيل هذا المولّد، يغلّفه asyncio في مهمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">EventLoop</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">run_until_complete</span>(<span class="hljs-params">self, coro</span>):
        <span class="hljs-string">&quot;&quot;&quot;Run until the coroutine is done.&quot;&quot;&quot;</span>
        task = Task(coro)
        task.add_done_callback(stop_callback)
        <span class="hljs-keyword">try</span>:
            <span class="hljs-variable language_">self</span>.run_forever()
        <span class="hljs-keyword">except</span> StopError:
            <span class="hljs-keyword">pass</span>

<span class="hljs-keyword">class</span> <span class="hljs-title class_">StopError</span>(<span class="hljs-title class_ inherited__">BaseException</span>):
    <span class="hljs-string">&quot;&quot;&quot;Raised to stop the event loop.&quot;&quot;&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">stop_callback</span>(<span class="hljs-params">future</span>):
    <span class="hljs-keyword">raise</span> StopError
</code></pre>
<p>وحين تكتمل المهمة، فإنها تطرح <code>StopError </code>، وتستخدمها الحلقة كإشارة إلى أنها بلغت الاكتمال الطبيعي.</p>
<p>لكن ما هذا؟ ألأن للمهمة توابع اسمها <code>add_done_callback</code> و<code>result</code>؟ قد تظن أن المهمة تشبه المستقبل. حدسك صحيح. ويجب أن نعترف بتفصيل عن صنف Task أخفيناه عنك: المهمة هي مستقبل.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Task</span>(<span class="hljs-title class_ inherited__">Future</span>):
    <span class="hljs-string">&quot;&quot;&quot;A coroutine wrapped in a Future.&quot;&quot;&quot;</span>
</code></pre>
<p>عادةً ما يُحلّ المستقبل بأن يستدعيه شخص آخر فيستدعي <code>set_result</code>. لكن المهمة تحلّ <em>نفسها</em> حين تتوقف كوروتينها. وتذكّر من استكشافنا السابق لمولّدات Python أن المولّد، حين يعود، يطرح الاستثناء الخاص <code>StopIteration</code>:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method of class Task.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">step</span>(<span class="hljs-params">self, future</span>):
        <span class="hljs-keyword">try</span>:
            next_future = <span class="hljs-variable language_">self</span>.coro.send(future.result)
        <span class="hljs-keyword">except</span> CancelledError:
            <span class="hljs-variable language_">self</span>.cancelled = <span class="hljs-literal">True</span>
            <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">except</span> StopIteration <span class="hljs-keyword">as</span> exc:

            <span class="hljs-comment"># Task resolves itself with coro&#x27;s return</span>
            <span class="hljs-comment"># value.</span>
            <span class="hljs-variable language_">self</span>.set_result(exc.value)
            <span class="hljs-keyword">return</span>

        next_future.add_done_callback(<span class="hljs-variable language_">self</span>.step)
</code></pre>
<p>إذن حين تستدعي حلقة الأحداث <code>task.add_done_callback(stop_callback)</code>، فإنها تستعد للتوقف بواسطة المهمة. وهذا هو <code>run_until_complete</code> مرة أخرى:</p>
<pre><code class="language-python">    <span class="hljs-comment"># Method of event loop.</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">run_until_complete</span>(<span class="hljs-params">self, coro</span>):
        task = Task(coro)
        task.add_done_callback(stop_callback)
        <span class="hljs-keyword">try</span>:
            <span class="hljs-variable language_">self</span>.run_forever()
        <span class="hljs-keyword">except</span> StopError:
            <span class="hljs-keyword">pass</span>
</code></pre>
<p>وحين تلتقط المهمة <code>StopIteration</code> وتحلّ نفسها، تطرح دالة الاستدعاء <code>StopError</code> من داخل الحلقة. تتوقف الحلقة ويُفكّ مكدس الاستدعاءات حتى <code>run_until_complete</code>. يكون برنامجنا قد انتهى.</p>
<h2 id="الخاتمة">الخاتمة</h2>
<p>كثيراً مما تكون البرامج الحديثة مقيّدة بالإدخال/الإخراج بدل أن تكون مقيّدة بالمعالج. وبهذه البرامج، تكون خيوط Python أسوأ الخيارات من كل وجه:</p>
<p>وإن حدّقت العين بحيث تذوب تعبيرات <code>yield from</code>، بدت الكوروتين كخيط يقوم بإدخال/إخراج حاجب تقليدي. بل يمكننا حتى تنسيق الكوروتينات بأنماط كلاسيكية من البرمجة متعددة الخيوط. ولا حاجة لإعادة الاختراع. وعليه، مقارنةً بدوال الاستدعاء، تُعد الكوروتينات أسلوباً جاذباً للمبرمج المعتاد على تعدد الخيوط.</p>
<p>لكن حين نفتح أعيننا ونركّز على تعبيرات <code>yield from</code>، نرى أنها تحدّد المواضع التي تتنازل فيها الكوروتين عن التحكم وتسمح للآخرين بالعمل. وبخلاف الخيوط، تُظهر الكوروتينات أين يمكن أن تُقاطَع شيفرتنا وأين لا يمكن. وفي مقاله المضيء «Unyielding»<a href="https://glyph.twistedmatrix.com/2014/02/unyielding.html">^4</a>، يكتب غليف ليفكوفيتز: «الخيوط تجعل التفكير المحلي صعباً، والتفكير المحلي ربما أهم شيء في هندسة البرمجيات». أما التنازل الصريح فيجعل من الممكن أن «تفهم سلوك (وعليه، صحة) روتين بفحص الروتين نفسه بدل فحص النظام بأكمله».</p>
<p>كُتب هذا الفصل خلال عصر نهضة في تاريخ Python وغير المتزامن. فقد أُطلقت الكوروتينات القائمة على المولّدات، التي تعلمت للتو اختراعها، في وحدة «asyncio» مع Python 3.4 في مارس 2014. وفي سبتمبر 2015، أُطلق Python 3.5 بكوروتينات مبنية في اللغة نفسها. وتُصرَّح هذه الكوروتينات الأصلية بالصياغة الجديدة «async def»، وبدلاً من «yield from» تستخدم الكلمة المفتاحية الجديدة «await» (انتظار) للتفويض إلى كوروتين أو للانتظار مستقبل.</p>
<p>ورغم هذه الإنجازات، تبقى الأفكار الجوهرية كما هي. فستكون كوروتينات Python الأصلية الجديدة متميزة نحوياً عن المولّدات لكنها تعمل على نحو متشابه جداً؛ بل إنها ستشارك تنفيماً واحداً داخل مفسّر Python. وستستمر المهمة والمستقبل وحلقة الأحداث في أدوارها في asyncio.</p>
<p>والآن بعد أن عرفت كيف تعمل كوروتينات asyncio، يمكنك أن تنسى التفاصيل في الغالب. فالآلية مخبّأة خلف واجهة أنيقة. لكن إتقانك للأساسيات يتيح لك البرمجة على نحو صحيح وفعّال في بيئات غير المتزامن الحديثة.</p>
<p>[^7]: لحلّ معقّد لهذه المشكلة، انظر <a href="http://www.tornadoweb.org/en/stable/stack_context.html">http://www.tornadoweb.org/en/stable/stack_context.html</a></p>
<p>[^9]: يستخدم تنفيذ <code>asyncio.Queue</code> الفعلي حدث <code>asyncio.Event</code> بدلاً من المستقبل الظاهر هنا. والفرق أن الحدث يمكن إعادة تعيينه، بينما لا يمكن للمستقبل أن ينتقل من المحلول إلى المعلّق.</p>
<p>[^10]: مزخرف <code>@asyncio.coroutine</code> ليس سحرياً. فإذا زيّن دالة مولّد ولم يُضبط متغيّر البيئة <code>PYTHONASYNCIODEBUG</code>، فإن المزخرف لا يفعل عملياً شيئاً. فهو يكتفي بضبط سمة <code>_is_coroutine</code> لراحة أجزاء أخرى من الإطار. ومن الممكن استعمال asyncio مع مولّدات خالية دون أي زخرفة بـ <code>@asyncio.coroutine</code>.</p>
<latex>
[^11]: يورد جيسي دواعي استخدام غير المتزامن وعوارضه في «ما هو Async، وكيف يعمل، ومتى ينبغي أن أستعمله؟»، المتاح على pyvideo.org.
[^bayer]: قارن مايك باير إنتاجية asyncio وتعدد الخيوط لأحمال عمل مختلفة في «البايثون غير المتزامن وقواعد البيانات»: http://techspot.zzzeek.org/2015/02/15/asynchronous-python-and-databases/
</latex>
<p>[^11]: يورد جيسي دواعي استخدام غير المتزامن وعوارضه في <a href="http://pyvideo.org/video/2565/what-is-async-how-does-it-work-and-when-should">&quot;ما هو Async، وكيف يعمل، ومتى ينبغي أن أستعمله؟&quot;:</a>. وقارن مايك باير إنتاجية asyncio وتعدد الخيوط لأحمال عمل مختلفة في <a href="http://techspot.zzzeek.org/2015/02/15/asynchronous-python-and-databases/">&quot;البايثون غير المتزامن وقواعد البيانات&quot;:</a></p>
<p>[^12]: لهذا المستقبل عيوب كثيرة. فمثلاً، ما إن يُحلّ هذا المستقبل، ينبغي أن تستأنف الكوروتين التي تُنزّله فوراً بدل التوقف، لكن شيفرتنا لا تفعل ذلك. انظر صنف Future في asyncio للحصول على تنفيذ كامل.</p>
<p>[^13]: وفي الحقيقة هذه هي بالضبط طريقة عمل «yield from» في CPython. فالدالة تزيد مؤشر تعليماتها قبل تنفيذ كل عبارة. لكن بعد أن ينفّذ المولّد الخارجي «yield from»، يطرح واحداً من مؤشر تعليماته ليبقى مثبَّتاً عند عبارة «yield from». ثم يتنازل إلى <em>مستدعيه</em>. وتتكرر الدورة حتى يطرح المولّد الداخلي <code>StopIteration</code>، وعندها يسمح المولّد الخارجي لنفسه أخيراً بأن يتقدم إلى التعليمة التالية.</p>
<p>[^14]: يمنع قفل التفسير العام في Python تشغيل شيفرة Python بالتوازي داخل عملية واحدة أصلاً. فتوازين الخوارزميات المقيّدة بالمعالج في Python يتطلب عمليات متعددة، أو كتابة الأجزاء المتوازية من الشيفرة بلغة C. لكن هذا موضوع ليوم آخر.</p>
<p>[^15]: حتى الاستدعاءات إلى <code>send</code> يمكن أن تكون حاجبة، إن كان المتلقّي بطيئاً في الإقرار بالرسائل المعلّقة وامتلأ مخزن.buffer البيانات الصادرة في النظام.</p>
<p>[^16]: قدّم غيدو مكتبة asyncio القياسية، المسمّاة آنذاك «Tulip»، في <a href="http://pyvideo.org/video/1667/keynote">PyCon 2013</a>.</p>
<latex>
[^16]: قدّم غيدو مكتبة asyncio القياسية، المسمّاة آنذاك «Tulip»، في PyCon 2013.
</latex>
<p>[^17]: الكوروتينات المدمجة في Python 3.5 موصوفة في <a href="https://www.python.org/dev/peps/pep-0492/">PEP 492</a> «الكوروتينات بصياغة async و await».</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,c as html,e as slug,l as title};
