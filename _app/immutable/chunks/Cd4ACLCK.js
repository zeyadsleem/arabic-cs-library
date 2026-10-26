const s="kinney",n="python-ai",t="أساسيات الذكاء الاصطناعي بلغة Python",a="pipeline-basics",e="أساسيات خطوط الأنابيب (Hugging Face)",p=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"الدفتر",text:"الدفتر"},{depth:2,id:"البدء-مع-خطوط-الأنابيب",text:"البدء مع خطوط الأنابيب"},{depth:2,id:"تحليل-المشاعر",text:"تحليل المشاعر"},{depth:2,id:"توليد-النصوص",text:"توليد النصوص"},{depth:3,id:"فهم-معاملات-التوليد",text:"فهم معاملات التوليد"},{depth:2,id:"التصنيف-بدون-أمثلة",text:"التصنيف بدون أمثلة"},{depth:3,id:"التصنيف-متعدد-التسميات",text:"التصنيف متعدّد التسميات"},{depth:2,id:"الإجابة-عن-الأسئلة",text:"الإجابة عن الأسئلة"},{depth:2,id:"ملء-الفراغ",text:"ملء الفراغ"},{depth:2,id:"التلخيص",text:"التلخيص"},{depth:2,id:"التعرف-على-الكيانات-المسماة-ner",text:"التعرّف على الكيانات المسمّاة (NER)"},{depth:2,id:"الترجمة",text:"الترجمة"},{depth:2,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:3,id:"اختيار-الجهاز",text:"اختيار الجهاز"},{depth:3,id:"المعالجة-الدفعية",text:"المعالجة الدفعية"},{depth:3,id:"الدقة-المختلطة",text:"الدقة المختلطة"},{depth:2,id:"الإعداد-المتقدم",text:"الإعداد المتقدّم"},{depth:3,id:"نماذج-ومرمزات-مخصصة",text:"نماذج ومُرمِّزات مخصّصة"},{depth:3,id:"البتر-والحشو",text:"البتر والحشو"},{depth:2,id:"المزالق-الشائعة-وحلولها",text:"المزالق الشائعة وحلولها"},{depth:2,id:"اعتبارات-الإنتاج",text:"اعتبارات الإنتاج"},{depth:3,id:"السلامة-والمراقبة",text:"السلامة والمراقبة"},{depth:3,id:"التخزين-المؤقت-والتحسين",text:"التخزين المؤقت والتحسين"},{depth:3,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"},{depth:2,id:"متى-تتجاوز-خطوط-الأنابيب",text:"متى تتجاوز خطوط الأنابيب"},{depth:2,id:"الخاتمة",text:"الخاتمة"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<blockquote>
<p><strong>النقاط الرئيسية</strong></p>
<ul>
<li>خطوط الأنابيب توحّد المدخلات والمخرجات بتنسيق عمل المُرمِّز ← النموذج ← المعالجة اللاحقة</li>
<li>ثبّت النموذج والمراجعة صراحةً؛ واقرن دائمًا المُرمِّز الصحيح</li>
<li>عالج المدخلات دفعيًا، وفعّل البتر والحشو، واستخدم GPU بدقة مختلطة</li>
<li>تحكّم في فك الترميز (درجة الحرارة، top-p/k، الحزم) واضبط شروط توقّف آمنة</li>
<li>سجّل معرّفات النماذج ومراجعاتها ومعاملاتها؛ وطبّق حواجز حماية على الموجّهات والمخرجات</li>
<li>انزل إلى واجهات <code>Auto*</code> عندما تحتاج إلى معالجة مسبقة مخصّصة أو تحكّم في القيم اللوغاريتمية</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>توفّر خطوط الأنابيب غلافًا متكاملًا جاهزًا للعمل حول النماذج والمُرمِّزات (tokenizers) والمعالجة اللاحقة للمهام الشائعة. تخيّل <code>pipeline</code> كعصا سحرية تجمع كل الخطوات اللازمة للانتقال من النص الخام إلى مخرجات منظّمة: المعالجة المسبقة (تحويل النص إلى أرقام يفهمها النموذج)، واستدلال النموذج (تمرير الأرقام عبر النموذج للتنبؤ)، والمعالجة اللاحقة (تنقية المخرجات لتكون قابلة للقراءة البشرية).</p>
<h2 id="الدفتر">الدفتر</h2>
<p>اطّلع على الدفتر المرافق: <a href="https://colab.research.google.com/drive/1OnAQGIBrbkbJYC3h-Vf3mUwru9K3usSt?usp=sharing">أساسيات خطوط الأنابيب</a></p>
<h2 id="البدء-مع-خطوط-الأنابيب">البدء مع خطوط الأنابيب</h2>
<p>تتعامل خطوط الأنابيب مع ثماني فئات رئيسية من المهام، ولكل منها مدخلات ومخرجات محدّدة:</p>
<table>
<thead>
<tr>
<th>المهمة</th>
<th>المدخل</th>
<th>المخرج</th>
<th>مثال على حالة الاستخدام</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>تحليل المشاعر</strong></td>
<td>نص</td>
<td>تسمية المشاعر + درجة</td>
<td>مراجعات المنتجات</td>
</tr>
<tr>
<td><strong>توليد النصوص</strong></td>
<td>نص الموجّه</td>
<td>تكملة مولّدة</td>
<td>روبوتات المحادثة، كتابة القصص</td>
</tr>
<tr>
<td><strong>التصنيف بدون أمثلة</strong></td>
<td>نص + فئات</td>
<td>احتمالات الفئات</td>
<td>توجيه البريد الإلكتروني</td>
</tr>
<tr>
<td><strong>الإجابة عن الأسئلة</strong></td>
<td>سؤال + سياق</td>
<td>إجابة مستخلصة</td>
<td>أنظمة الأسئلة الشائعة</td>
</tr>
<tr>
<td><strong>ملء الفراغ</strong></td>
<td>نص يحتوي <code>&lt;mask&gt;</code></td>
<td>كلمات متوقّعة</td>
<td>الإكمال التلقائي</td>
</tr>
<tr>
<td><strong>التلخيص</strong></td>
<td>نص طويل</td>
<td>ملخّص قصير</td>
<td>موجزات الأخبار</td>
</tr>
<tr>
<td><strong>التعرّف على الكيانات المسمّاة</strong></td>
<td>نص</td>
<td>تسميات الكيانات + مواضعها</td>
<td>الامتثال للخصوصية</td>
</tr>
<tr>
<td><strong>الترجمة</strong></td>
<td>النص المصدر</td>
<td>نص اللغة الهدف</td>
<td>الدعم متعدّد اللغات</td>
</tr>
</tbody>
</table>
<h2 id="تحليل-المشاعر">تحليل المشاعر</h2>
<p>يحدّد تحليل المشاعر ما إذا كان النص يعبّر عن مشاعر إيجابية أو سلبية. وهو من أكثر مهام معالجة اللغة الطبيعية شيوعًا، وله تطبيقات في تحليل مراجعات العملاء ومراقبة وسائل التواصل الاجتماعي وترتيب أولويات تذاكر الدعم.</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> pipeline

sentiment_analyzer = pipeline(
    <span class="hljs-string">&quot;sentiment-analysis&quot;</span>,
    model=<span class="hljs-string">&quot;distilbert-base-uncased-finetuned-sst-2-english&quot;</span>
)

texts = [
    <span class="hljs-string">&quot;I love this product! It&#x27;s amazing.&quot;</span>,
    <span class="hljs-string">&quot;This is terrible. I hate it.&quot;</span>,
    <span class="hljs-string">&quot;It&#x27;s okay, nothing special.&quot;</span>,
]

<span class="hljs-keyword">for</span> text <span class="hljs-keyword">in</span> texts:
    result = sentiment_analyzer(text)[<span class="hljs-number">0</span>]
    label = result[<span class="hljs-string">&quot;label&quot;</span>]
    confidence = result[<span class="hljs-string">&quot;score&quot;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{text}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sentiment: <span class="hljs-subst">{label}</span> (Confidence: <span class="hljs-subst">{confidence:<span class="hljs-number">.3</span>f}</span>)\\n&quot;</span>)
</code></pre>
<p>تشير درجة الثقة إلى يقين النموذج: 0.999 تعني ثقة بنسبة 99.9% (متأكّد جدًا)، و0.750 تعني ثقة بنسبة 75% (متأكّد نوعًا ما)، و0.500 تعني ثقة بنسبة 50% (غير متأكّد).</p>
<blockquote>
<p><strong>قصور التصنيف الثنائي</strong></p>
<p>لا يُخرج نموذج المشاعر الافتراضي سوى <code>POSITIVE</code> أو <code>NEGATIVE</code>. وهو يفتقر إلى فئة <code>NEUTRAL</code> وقد يواجه صعوبة مع السخرية أو المشاعر المعقّدة.</p>
</blockquote>
<h2 id="توليد-النصوص">توليد النصوص</h2>
<p>يولّد توليد النصوص نصًا جديدًا انطلاقًا من موجّه بداية. وخلافًا لتحليل المشاعر الذي يفسّر نصًا موجودًا، فإن التوليد ينشئ نصًا لم يكن موجودًا من قبل.</p>
<pre><code class="language-python">text_generator = pipeline(<span class="hljs-string">&quot;text-generation&quot;</span>, model=<span class="hljs-string">&quot;gpt2&quot;</span>)

prompts = [
    <span class="hljs-string">&quot;The future of artificial intelligence is&quot;</span>,
    <span class="hljs-string">&quot;Once upon a time in a distant galaxy&quot;</span>,
]

<span class="hljs-keyword">for</span> prompt <span class="hljs-keyword">in</span> prompts:
    generated = text_generator(
        prompt,
        max_new_tokens=<span class="hljs-number">100</span>,
        num_return_sequences=<span class="hljs-number">1</span>,
        temperature=<span class="hljs-number">0.7</span>,
        do_sample=<span class="hljs-literal">True</span>,
        pad_token_id=text_generator.tokenizer.eos_token_id,
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{prompt}</span>...&quot;</span>)
    <span class="hljs-built_in">print</span>(generated[<span class="hljs-number">0</span>][<span class="hljs-string">&quot;generated_text&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
</code></pre>
<h3 id="فهم-معاملات-التوليد">فهم معاملات التوليد</h3>
<p>يتحكّم <strong><code>max_new_tokens</code></strong> في الحد الأقصى لعدد الرموز التي تُولَّد بعد الموجّه. ويعمل <strong><code>temperature</code></strong> كقرص للتحكّم في الإبداع: القيم المنخفضة (0.1-0.5) تنتج نصًا محافظًا، والقيم المتوسطة (0.6-0.9) توازن بين الإبداع والالتزام، والقيم المرتفعة (1.0+) تنتج مخرجات تجريبية. ويفعّل <strong><code>do_sample=True</code></strong> أخذ العينات الاحتمالي لتنويع المخرجات. ويتحكّم <strong><code>top_p</code></strong> و<code>top_k</code> في حجم مجموعة العينات.</p>
<p>تخيّل درجة الحرارة كما في الطبخ: الحرارة المنخفضة تعطي نتائج متوقّعة، والمتوسطة توازن بين النكهة والأمان، والمرتفعة تنتج أطباقًا جسورة لكن محفوفة بالمخاطر.</p>
<h2 id="التصنيف-بدون-أمثلة">التصنيف بدون أمثلة</h2>
<p>يصنّف التصنيف بدون أمثلة النص في تسميات تحدّدها أنت دون أي أمثلة تدريبية. ويستخدم النموذج فهمه للغة لمطابقة النص بالفئات اعتمادًا على المعنى وحده.</p>
<pre><code class="language-python">classifier = pipeline(<span class="hljs-string">&quot;zero-shot-classification&quot;</span>, model=<span class="hljs-string">&quot;facebook/bart-large-mnli&quot;</span>)

candidate_labels = [<span class="hljs-string">&quot;business&quot;</span>, <span class="hljs-string">&quot;technology&quot;</span>, <span class="hljs-string">&quot;sports&quot;</span>, <span class="hljs-string">&quot;entertainment&quot;</span>, <span class="hljs-string">&quot;politics&quot;</span>]

texts = [
    <span class="hljs-string">&quot;Apple reported record quarterly earnings driven by strong iPhone sales.&quot;</span>,
    <span class="hljs-string">&quot;The Denver Nuggets defeated the Lakers in last night&#x27;s basketball game.&quot;</span>,
]

<span class="hljs-keyword">for</span> text <span class="hljs-keyword">in</span> texts:
    result = classifier(text, candidate_labels)

    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{text}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Classifications:&quot;</span>)
    <span class="hljs-keyword">for</span> label, score <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(result[<span class="hljs-string">&quot;labels&quot;</span>], result[<span class="hljs-string">&quot;scores&quot;</span>]):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{label}</span>: <span class="hljs-subst">{score:<span class="hljs-number">.3</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
</code></pre>
<p>يحوّل النموذج التصنيف إلى استدلال باللغة الطبيعية. فلكل فئة ينشئ فرضية («هذا النص يدور حول [الفئة]»)، ويقيّم مدى ملاءمة كل فرضية، ويعيد درجات احتمال مجموعها 1.0.</p>
<h3 id="التصنيف-متعدد-التسميات">التصنيف متعدّد التسميات</h3>
<p>افتراضيًا، يفترض المصنّف أن كل نص ينتمي إلى فئة واحدة فقط. فعّل التصنيف متعدّد التسميات للنصوص التي تناسب فئات متعدّدة:</p>
<pre><code class="language-python">result = classifier(
    <span class="hljs-string">&quot;The new iPhone is expensive but innovative.&quot;</span>,
    candidate_labels=[<span class="hljs-string">&quot;technology&quot;</span>, <span class="hljs-string">&quot;business&quot;</span>, <span class="hljs-string">&quot;review&quot;</span>],
    multi_label=<span class="hljs-literal">True</span>
)
</code></pre>
<h2 id="الإجابة-عن-الأسئلة">الإجابة عن الأسئلة</h2>
<p>تستخلص الإجابة عن الأسئلة نطاقات نصية دقيقة تجيب عن الأسئلة من سياق معطى. وهذا ما يُسمّى الإجابة الاستخلاصية عن الأسئلة - فهو يعثر على الإجابات داخل النص ولا يولّد معلومات جديدة أبدًا.</p>
<pre><code class="language-python">qa_pipeline = pipeline(
    <span class="hljs-string">&quot;question-answering&quot;</span>,
    model=<span class="hljs-string">&quot;distilbert-base-cased-distilled-squad&quot;</span>,
)

context = <span class="hljs-string">&quot;&quot;&quot;
The modern hot dog traces its roots to German sausages brought to the U.S. by immigrants
in the 1800s. The first famous hot-dog stand popped up on Coney Island in 1871, allegedly
selling 3,684 sausages in buns during its first year. Nathan&#x27;s Famous launched its annual
Hot Dog Eating Contest in 1916, turning competitive eating into a Fourth-of-July spectacle.
&quot;&quot;&quot;</span>

questions = [
    <span class="hljs-string">&quot;Where did the first famous hot-dog stand appear?&quot;</span>,
    <span class="hljs-string">&quot;What competitive eating event did Nathan&#x27;s Famous start?&quot;</span>,
]

<span class="hljs-keyword">for</span> question <span class="hljs-keyword">in</span> questions:
    result = qa_pipeline(question=question, context=context)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;answer&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Confidence: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;score&#x27;</span>]:<span class="hljs-number">.3</span>f}</span>\\n&quot;</span>)
</code></pre>
<blockquote>
<p><strong>يجب أن تكون الإجابة موجودة</strong></p>
<p>سيخمّن النموذج إن لم تكن الإجابة موجودة في السياق، وغالبًا بثقة منخفضة. افحص دائمًا درجات الثقة - فالقيم دون 0.5 تعني عادةً إجابات غير موثوقة.</p>
</blockquote>
<h2 id="ملء-الفراغ">ملء الفراغ</h2>
<p>يتوقّع ملء الفراغ الكلمات الناقصة بناءً على السياق، فيكشف كيف تفهم النماذج العلاقات بين الكلمات:</p>
<pre><code class="language-python">fill_mask = pipeline(<span class="hljs-string">&quot;fill-mask&quot;</span>, model=<span class="hljs-string">&quot;distilroberta-base&quot;</span>)

sentences = [
    <span class="hljs-string">&quot;The capital of France is &lt;mask&gt;.&quot;</span>,
    <span class="hljs-string">&quot;Python is a popular &lt;mask&gt; language.&quot;</span>,
]

<span class="hljs-keyword">for</span> sentence <span class="hljs-keyword">in</span> sentences:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Original: <span class="hljs-subst">{sentence}</span>&quot;</span>)
    results = fill_mask(sentence, top_k=<span class="hljs-number">3</span>)

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Top predictions:&quot;</span>)
    <span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results, <span class="hljs-number">1</span>):
        token = result[<span class="hljs-string">&quot;token_str&quot;</span>]
        score = result[<span class="hljs-string">&quot;score&quot;</span>]
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  <span class="hljs-subst">{i}</span>. &#x27;<span class="hljs-subst">{token}</span>&#x27; (score: <span class="hljs-subst">{score:<span class="hljs-number">.3</span>f}</span>)&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
</code></pre>
<p>تستخدم النماذج المختلفة رموز قناع مختلفة: فيستخدم BERT الرمز <code>[MASK]</code> بينما يستخدم RoBERTa الرمز <code>&lt;mask&gt;</code>. ويتعامل خط الأنابيب مع ذلك تلقائيًا.</p>
<h2 id="التلخيص">التلخيص</h2>
<p>يكثّف التلخيص النصوص الطويلة مع الحفاظ على المعلومات الأساسية. وتستخدم النماذج الحديثة التلخيص التجريدي - فهي تعيد صياغة المحتوى بإيجاز بدلًا من مجرّد استخلاص الجمل.</p>
<pre><code class="language-python">summarizer = pipeline(<span class="hljs-string">&quot;summarization&quot;</span>, model=<span class="hljs-string">&quot;sshleifer/distilbart-cnn-12-6&quot;</span>)

long_text = <span class="hljs-string">&quot;&quot;&quot;
The modern hot dog traces its roots to German sausages brought to the U.S. by immigrants
in the 1800s. The first famous hot-dog stand popped up on Coney Island in 1871, allegedly
selling 3,684 sausages in buns during its first year. Classic toppings include mustard,
ketchup (controversial in Chicago), relish, onions, and sauerkraut. Nathan&#x27;s Famous
launched its annual Hot Dog Eating Contest in 1916, turning competitive eating into a
Fourth-of-July spectacle.
&quot;&quot;&quot;</span>

summary = summarizer(
    long_text,
    max_length=<span class="hljs-number">50</span>,
    min_length=<span class="hljs-number">10</span>,
    do_sample=<span class="hljs-literal">False</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Original Text:&quot;</span>)
<span class="hljs-built_in">print</span>(long_text)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\\nSummary:&quot;</span>)
<span class="hljs-built_in">print</span>(summary[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;summary_text&#x27;</span>])
</code></pre>
<p>تحكّم في طول الملخّص باستخدام <code>max_length</code> و<code>min_length</code>. ويضمن ضبط <code>do_sample=False</code> ملخّصات حتمية ومتّسقة.</p>
<h2 id="التعرف-على-الكيانات-المسماة-ner">التعرّف على الكيانات المسمّاة (NER)</h2>
<p>يحدّد التعرّف على الكيانات المسمّاة الكيانات المسمّاة في النص ويصنّفها - الأشخاص والمؤسسات والمواقع وغيرها. وهو بالغ الأهمية لاستخلاص المعلومات والامتثال للخصوصية.</p>
<pre><code class="language-python">ner_pipeline = pipeline(
    <span class="hljs-string">&quot;ner&quot;</span>,
    aggregation_strategy=<span class="hljs-string">&quot;simple&quot;</span>,
    model=<span class="hljs-string">&quot;dbmdz/bert-large-cased-finetuned-conll03-english&quot;</span>,
)

texts = [
    <span class="hljs-string">&quot;My name is John Smith and I work at Apple Inc. in Cupertino, California.&quot;</span>,
    <span class="hljs-string">&quot;Tesla CEO Elon Musk announced the new factory will be built in Austin, Texas.&quot;</span>,
]

<span class="hljs-keyword">for</span> text <span class="hljs-keyword">in</span> texts:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{text}</span>&quot;</span>)
    entities = ner_pipeline(text)

    <span class="hljs-keyword">if</span> entities:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Entities found:&quot;</span>)
        <span class="hljs-keyword">for</span> entity <span class="hljs-keyword">in</span> entities:
            word = entity[<span class="hljs-string">&quot;word&quot;</span>]
            label = entity[<span class="hljs-string">&quot;entity_group&quot;</span>]
            confidence = entity[<span class="hljs-string">&quot;score&quot;</span>]
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  &#x27;<span class="hljs-subst">{word}</span>&#x27; -&gt; <span class="hljs-subst">{label}</span> (confidence: <span class="hljs-subst">{confidence:<span class="hljs-number">.3</span>f}</span>)&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
</code></pre>
<p>تشمل أنواع الكيانات القياسية <strong>PER</strong> (شخص) و<strong>ORG</strong> (مؤسسة) و<strong>LOC</strong> (موقع) و<strong>MISC</strong> (متفرّقات). استخدم دائمًا <code>aggregation_strategy=&quot;simple&quot;</code> للحصول على كلمات كاملة بدلًا من رموز الكلمات الفرعية.</p>
<h2 id="الترجمة">الترجمة</h2>
<p>تحوّل الترجمة النص بين اللغات باستخدام نماذج متخصّصة:</p>
<pre><code class="language-python">translator = pipeline(<span class="hljs-string">&quot;translation_en_to_de&quot;</span>, model=<span class="hljs-string">&quot;Helsinki-NLP/opus-mt-en-de&quot;</span>)

text = <span class="hljs-string">&quot;The future of artificial intelligence is fascinating.&quot;</span>
translation = translator(text)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Original (English): <span class="hljs-subst">{text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Translated (German): <span class="hljs-subst">{translation[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;translation_text&#x27;</span>]}</span>&quot;</span>)
</code></pre>
<p>تُسمّى النماذج عادةً بلغتي المصدر والهدف (مثل <code>en-to-de</code> للإنجليزية إلى الألمانية).</p>
<h2 id="تحسين-الأداء">تحسين الأداء</h2>
<h3 id="اختيار-الجهاز">اختيار الجهاز</h3>
<p>استخدم GPU عند توفّره للحصول على استدلال أسرع:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> torch

device = <span class="hljs-number">0</span> <span class="hljs-keyword">if</span> torch.cuda.is_available() <span class="hljs-keyword">else</span> -<span class="hljs-number">1</span>
pipeline = pipeline(<span class="hljs-string">&quot;text-generation&quot;</span>, model=<span class="hljs-string">&quot;gpt2&quot;</span>, device=device)
</code></pre>
<h3 id="المعالجة-الدفعية">المعالجة الدفعية</h3>
<p>عالج مدخلات متعدّدة معًا للحصول على إنتاجية أفضل:</p>
<pre><code class="language-python">texts = [<span class="hljs-string">&quot;Text 1&quot;</span>, <span class="hljs-string">&quot;Text 2&quot;</span>, <span class="hljs-string">&quot;Text 3&quot;</span>]
results = sentiment_analyzer(texts, batch_size=<span class="hljs-number">8</span>)
</code></pre>
<h3 id="الدقة-المختلطة">الدقة المختلطة</h3>
<p>فعّل fp16/bf16 للحصول على استدلال أسرع واستهلاك أقل للذاكرة:</p>
<pre><code class="language-python">pipeline = pipeline(
    <span class="hljs-string">&quot;text-generation&quot;</span>,
    model=<span class="hljs-string">&quot;gpt2&quot;</span>,
    torch_dtype=torch.float16
)
</code></pre>
<h2 id="الإعداد-المتقدم">الإعداد المتقدّم</h2>
<h3 id="نماذج-ومرمزات-مخصصة">نماذج ومُرمِّزات مخصّصة</h3>
<p>حدّد النماذج والمراجعات بدقة لضمان قابلية إعادة الإنتاج:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    <span class="hljs-string">&quot;distilbert-base-uncased-finetuned-sst-2-english&quot;</span>,
    revision=<span class="hljs-string">&quot;refs/pr/123&quot;</span>  <span class="hljs-comment"># Pin specific version</span>
)
tokenizer = AutoTokenizer.from_pretrained(
    <span class="hljs-string">&quot;distilbert-base-uncased-finetuned-sst-2-english&quot;</span>
)

classifier = pipeline(
    <span class="hljs-string">&quot;sentiment-analysis&quot;</span>,
    model=model,
    tokenizer=tokenizer
)
</code></pre>
<h3 id="البتر-والحشو">البتر والحشو</h3>
<p>تعامل مع المدخلات متغيّرة الطول على نحو صحيح:</p>
<pre><code class="language-python">results = pipeline(
    texts,
    truncation=<span class="hljs-literal">True</span>,
    padding=<span class="hljs-literal">True</span>,
    max_length=<span class="hljs-number">512</span>
)
</code></pre>
<h2 id="المزالق-الشائعة-وحلولها">المزالق الشائعة وحلولها</h2>
<blockquote>
<p><strong>حدود طول السياق</strong></p>
<p>للنماذج نوافذ سياق قصوى. فيتعامل GPT-2 مع 1024 رمزًا، ويتعامل BERT مع 512. والنصوص التي تتجاوز الحدود تُبتر أو تسبّب أخطاء.</p>
</blockquote>
<blockquote>
<p><strong>التعامل مع التكرار في التوليد</strong></p>
<p>إذا تكرّر النص المولّد، فعدّل <code>repetition_penalty</code> أو استخدم استراتيجيات فك ترميز مختلفة مثل بحث الحزمة (beam search).</p>
</blockquote>
<blockquote>
<p><strong>محتوى غير لائق</strong></p>
<p>قد تولّد النماذج المدرَّبة على نصوص الإنترنت محتوى متحيّزًا أو غير لائق. فطبّق دائمًا مرشّحات المحتوى في الاستخدام الإنتاجي.</p>
</blockquote>
<h2 id="اعتبارات-الإنتاج">اعتبارات الإنتاج</h2>
<h3 id="السلامة-والمراقبة">السلامة والمراقبة</h3>
<p>في عمليات النشر الإنتاجية، طبّق مرشّحات محتوى للنص المولّد، وتحقق من صحة المدخلات لمنع حقن الموجّهات (prompt injection)، وسجّل تنبؤات النموذج لأغراض التنقيح، وراقب زمن الاستجابة ومعدّلات الأخطاء. واضبط إعدادات افتراضية محافظة لمعاملات التوليد وطبّق آليات مهلة للاستدلالات الطويلة.</p>
<h3 id="التخزين-المؤقت-والتحسين">التخزين المؤقت والتحسين</h3>
<p>خزّن النماذج مؤقتًا محليًا لتجنّب التنزيل المتكرّر:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> pipeline
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Set cache directory</span>
os.environ[<span class="hljs-string">&quot;TRANSFORMERS_CACHE&quot;</span>] = <span class="hljs-string">&quot;/path/to/cache&quot;</span>

<span class="hljs-comment"># Models download once, then load from cache</span>
pipeline = pipeline(<span class="hljs-string">&quot;sentiment-analysis&quot;</span>)
</code></pre>
<h3 id="معالجة-الأخطاء">معالجة الأخطاء</h3>
<p>غلّف استدعاءات خطوط الأنابيب بمعالجة أخطاء مناسبة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">safe_inference</span>(<span class="hljs-params">pipeline, text, max_retries=<span class="hljs-number">3</span></span>):
    <span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(max_retries):
        <span class="hljs-keyword">try</span>:
            <span class="hljs-keyword">return</span> pipeline(text)
        <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> e:
            <span class="hljs-keyword">if</span> attempt == max_retries - <span class="hljs-number">1</span>:
                <span class="hljs-keyword">raise</span>
            time.sleep(<span class="hljs-number">2</span> ** attempt)  <span class="hljs-comment"># Exponential backoff</span>
</code></pre>
<h2 id="متى-تتجاوز-خطوط-الأنابيب">متى تتجاوز خطوط الأنابيب</h2>
<p>استخدم واجهات <code>AutoTokenizer</code> و<code>AutoModel</code> الأدنى مستوى عندما تحتاج إلى معالجة مسبقة مخصّصة، أو رؤوس متعدّدة المهام، أو تحكّم في معالجة القيم اللوغاريتمية (logits)، أو تكامل محكم مع أنظمة الاسترجاع أو إعادة الترتيب. فخطوط الأنابيب مثالية للنماذج الأولية السريعة وكثير من حالات الإنتاج، لكن الأنظمة المخصّصة تستفيد من التحكّم الصريح.</p>
<pre><code class="language-python"><span class="hljs-comment"># Example: Custom logits processing</span>
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;gpt2&quot;</span>)
model = AutoModelForCausalLM.from_pretrained(<span class="hljs-string">&quot;gpt2&quot;</span>)

inputs = tokenizer(<span class="hljs-string">&quot;Hello&quot;</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>)
outputs = model(**inputs)
logits = outputs.logits  <span class="hljs-comment"># Direct access to raw scores</span>

<span class="hljs-comment"># Custom processing here</span>
</code></pre>
<h2 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h2>
<p>تتيح خطوط أنابيب Hugging Face الوصول إلى أحدث نماذج معالجة اللغة الطبيعية للجميع. فهي تتولّى تعقيدات الترميز واستدلال النموذج والمعالجة اللاحقة، لتتيح لك التركيز على حلّ المشكلات بدلًا من تفاصيل التنفيذ. ابدأ بخطوط الأنابيب للنمذجة الأولية السريعة، ثم خصّصها كلما نمت احتياجاتك. فمع توفّر آلاف النماذج على Hugging Face Hub، يمكنك العثور على حلول مدرّبة مسبقًا لكل مهمة معالجة لغة طبيعية تكاد تُخطر ببالك.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li>خطوط الأنابيب في Transformers: <a href="https://huggingface.co/docs/transformers/main/en/main_classes/pipelines">https://huggingface.co/docs/transformers/main/en/main_classes/pipelines</a></li>
<li>ملخّص المهام في Transformers: <a href="https://huggingface.co/docs/transformers/main/en/task_summary">https://huggingface.co/docs/transformers/main/en/task_summary</a></li>
<li>Accelerate: <a href="https://huggingface.co/docs/accelerate/index">https://huggingface.co/docs/accelerate/index</a></li>
<li>Optimum: <a href="https://huggingface.co/docs/optimum/index">https://huggingface.co/docs/optimum/index</a></li>
<li>bitsandbytes (8 بت/4 بت): <a href="https://github.com/TimDettmers/bitsandbytes">https://github.com/TimDettmers/bitsandbytes</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:t,slug:a,title:e,headings:p,html:l};export{s as book,n as chapter,t as chapterTitle,o as default,p as headings,l as html,a as slug,e as title};
