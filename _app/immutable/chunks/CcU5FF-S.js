const s="kinney",n="python-ai",a="أساسيات الذكاء الاصطناعي بلغة Python",t="tokenization",e="الترميز — من النص إلى الموتّرات",p=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"الدفتر",text:"الدفتر"},{depth:2,id:"إعداد-المرمزات",text:"إعداد المُرمِّزات"},{depth:2,id:"الترميز-الأساسي",text:"الترميز الأساسي"},{depth:2,id:"من-الرموز-إلى-المعرفات",text:"من الرموز إلى المعرّفات"},{depth:2,id:"الرموز-الخاصة",text:"الرموز الخاصة"},{depth:2,id:"المعالجة-الدفعية-وأقنعة-الانتباه",text:"المعالجة الدفعية وأقنعة الانتباه"},{depth:3,id:"تشبيه-المصباح",text:"تشبيه المصباح"},{depth:2,id:"مقارنة-المرمزات",text:"مقارنة المُرمِّزات"},{depth:2,id:"إعدادات-الترميز-العملية",text:"إعدادات الترميز العملية"},{depth:2,id:"التعامل-مع-المستندات-الطويلة",text:"التعامل مع المستندات الطويلة"},{depth:2,id:"فك-الترميز-وربط-الإزاحات",text:"فك الترميز وربط الإزاحات"},{depth:2,id:"كيف-يعمل-ترميز-الكلمات-الفرعية",text:"كيف يعمل ترميز الكلمات الفرعية"},{depth:2,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:2,id:"المزالق-الشائعة-وحلولها",text:"المزالق الشائعة وحلولها"},{depth:2,id:"معرفات-نوع-الرمز-والتعامل-مع-المقاطع",text:"معرّفات نوع الرمز والتعامل مع المقاطع"},{depth:2,id:"أنماط-ترميز-متقدمة",text:"أنماط ترميز متقدّمة"},{depth:2,id:"تنقيح-الترميز",text:"تنقيح الترميز"},{depth:2,id:"الخاتمة",text:"الخاتمة"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<blockquote>
<p><strong>النقاط الرئيسية</strong></p>
<ul>
<li>ترميز الكلمات الفرعية (BPE/WordPiece/SentencePiece) يوازن بين التغطية وحجم المفردات</li>
<li>يجب أن تطابق الرموز الخاصة وأقنعة الانتباه ومعرّفات المقاطع توقّعات النموذج</li>
<li>استخدم البتر والحشو بحكمة؛ والنوافذ المنزلقة مع الخطوة تحافظ على السياق عبر المقاطع</li>
<li>تربط الإزاحات الرموز بنطاقات النص لمهام مثل التعرّف على الكيانات المسمّاة والإبراز</li>
<li>فضّل المُرمِّزات السريعة؛ وأعد استخدام نسخة واحدة ورمّز على دفعات للسرعة</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>يحوّل الترميز النص الخام إلى معرّفات عددية صحيحة يمكن للنماذج معالجتها. ولأن الشبكات العصبية لا تفهم سوى الأرقام، فإن الترميز يجسر الفجوة بين النص البشري ونماذج الذكاء الاصطناعي عبر أربع خطوات رئيسية: تقسيم النص إلى وحدات أصغر (رموز)، وربط الرموز بمعرّفات فريدة من مفردات معيّنة، وإضافة رموز خاصة تعطي النموذج تعليمات، وإنشاء أقنعة انتباه للتعامل مع الدفعات بكفاءة.</p>
<h2 id="الدفتر">الدفتر</h2>
<p>اطّلع على الدفتر المرافق: <a href="https://colab.research.google.com/drive/15cChgqEWrWTtWApWRBSQBqFpmWDe2ZR7?usp=sharing">الترميز</a></p>
<h2 id="إعداد-المرمزات">إعداد المُرمِّزات</h2>
<p>تستخدم النماذج المختلفة استراتيجيات ترميز مختلفة. لنستكشف أكثرها شيوعًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer

<span class="hljs-comment"># Load tokenizers for different models</span>
tokenizers = {
    <span class="hljs-string">&quot;BERT&quot;</span>: AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;bert-base-uncased&quot;</span>),
    <span class="hljs-string">&quot;GPT-2&quot;</span>: AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;gpt2&quot;</span>),
    <span class="hljs-string">&quot;RoBERTa&quot;</span>: AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;roberta-base&quot;</span>),
    <span class="hljs-string">&quot;T5&quot;</span>: AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;t5-small&quot;</span>)
}

<span class="hljs-comment"># Check vocabulary sizes</span>
<span class="hljs-keyword">for</span> name, tokenizer <span class="hljs-keyword">in</span> tokenizers.items():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{name}</span>: Vocabulary size = <span class="hljs-subst">{tokenizer.vocab_size:,}</span>&quot;</span>)
</code></pre>
<p>لكل مُرمِّز مفردات ثابتة. فيعرف BERT نحو 30,000 رمز فريد، بينما يعرف GPT-2 نحو 50,000. وأي كلمة ليست في هذه المفردات تُقسَّم إلى كلمات فرعية أصغر أو تُوسَم بأنها غير معروفة.</p>
<h2 id="الترميز-الأساسي">الترميز الأساسي</h2>
<p>تقسّم الخطوة الأساسية النص إلى رموز. فالكلمات الشائعة تصبح رموزًا مفردة، بينما تنقسم الكلمات النادرة إلى كلمات فرعية:</p>
<pre><code class="language-python">text = <span class="hljs-string">&quot;Hello, world! Tokenization is the process of converting text into tokens.&quot;</span>
tokenizer = AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;bert-base-uncased&quot;</span>)

<span class="hljs-comment"># Tokenize the text</span>
tokens = tokenizer.tokenize(text)
<span class="hljs-built_in">print</span>(tokens)
<span class="hljs-comment"># Output: [&#x27;hello&#x27;, &#x27;,&#x27;, &#x27;world&#x27;, &#x27;!&#x27;, &#x27;token&#x27;, &#x27;##ization&#x27;, &#x27;is&#x27;, ...]</span>
</code></pre>
<p>تشير البادئة <code>##</code> في مُرمِّز BERT إلى أن الرمز استمرار للرمز السابق. وهذا النهج القائم على الكلمات الفرعية يتيح للنماذج التعامل مع الكلمات النادرة بتقسيمها إلى أجزاء مألوفة.</p>
<h2 id="من-الرموز-إلى-المعرفات">من الرموز إلى المعرّفات</h2>
<p>تحتاج النماذج إلى أرقام لا إلى نص. ويرتبط كل رمز بمعرّف فريد:</p>
<pre><code class="language-python">text = <span class="hljs-string">&quot;Hello, world!&quot;</span>
tokenizer = AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;bert-base-uncased&quot;</span>)

<span class="hljs-comment"># The encode method tokenizes and converts to IDs in one step</span>
token_ids = tokenizer.encode(text)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Original Text: <span class="hljs-subst">{text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Token IDs: <span class="hljs-subst">{token_ids}</span>&quot;</span>)
<span class="hljs-comment"># Output: Token IDs: [101, 7592, 1010, 2088, 999, 102]</span>
</code></pre>
<p>يمثّل كل رقم رمزًا محدّدًا: «hello» → 7592، و«world» → 2088. ويعالج النموذج هذه الأرقام لا النص الأصلي.</p>
<h2 id="الرموز-الخاصة">الرموز الخاصة</h2>
<p>توفّر الرموز الخاصة بنية وتعليمات للنموذج:</p>
<pre><code class="language-python"><span class="hljs-comment"># BERT adds special tokens automatically</span>
decoded = tokenizer.decode(token_ids)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Decoded: <span class="hljs-subst">{decoded}</span>&quot;</span>)
<span class="hljs-comment"># Output: [CLS] hello , world ! [SEP]</span>
</code></pre>
<p>يحدّد <strong><code>[CLS]</code></strong> (101) بداية التسلسل، ويُستخدم في مهام التصنيف. ويفصل <strong><code>[SEP]</code></strong> (102) بين المقاطع المختلفة أو يحدّد النهاية. ويملأ <strong><code>[PAD]</code></strong> (0) التسلسلات الأقصر لتوافق طول الدفعة. ويستبدل <strong><code>[UNK]</code></strong> الكلمات غير المعروفة غير الموجودة في المفردات. ويُستخدم <strong><code>[MASK]</code></strong> في نمذجة اللغة المقنّعة أثناء التدريب.</p>
<p>هذه الرموز بالغة الأهمية لأداء النموذج. فبدونها لن يفهم النموذج أين تبدأ التسلسلات وأين تنتهي أو كيف يتعامل مع المقاطع المختلفة.</p>
<h2 id="المعالجة-الدفعية-وأقنعة-الانتباه">المعالجة الدفعية وأقنعة الانتباه</h2>
<p>تكون النماذج أكثر كفاءة عند معالجة نصوص متعدّدة دفعةً واحدة. لكن النصوص المجمّعة في دفعة تتفاوت أطوالها. ويحلّ الحشو هذه المشكلة، لكن كيف يعرف النموذج أي الرموز يتجاهل؟ تجيب أقنعة الانتباه عن ذلك.</p>
<h3 id="تشبيه-المصباح">تشبيه المصباح</h3>
<p>تخيّل قناع الانتباه كمصباح في غرفة مظلمة. فأنت تريد إضاءة الكلمات الحقيقية فقط دون الحشو. ويخبر القناع النموذج بمكان «تسليط ضوئه» (أي مكان الانتباه):</p>
<pre><code class="language-python">texts = [
    <span class="hljs-string">&quot;The cat sat on the mat.&quot;</span>,
    <span class="hljs-string">&quot;The cat sat.&quot;</span>,
]

tokenizer = AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;bert-base-uncased&quot;</span>)
inputs = tokenizer(texts, padding=<span class="hljs-literal">True</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Token IDs:&quot;</span>)
<span class="hljs-built_in">print</span>(inputs[<span class="hljs-string">&quot;input_ids&quot;</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\\nAttention Mask:&quot;</span>)
<span class="hljs-built_in">print</span>(inputs[<span class="hljs-string">&quot;attention_mask&quot;</span>])
</code></pre>
<p>يوضّح المخرج كيف يعمل الحشو:</p>
<pre><code>Token IDs:
[[101, 1996, 4937, 3323, 2006, 1996, 13523, 1012, 102],
 [101, 1996, 4937, 3323, 1012, 102, 0, 0, 0]]

Attention Mask:
[[1, 1, 1, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 1, 1, 0, 0, 0]]
</code></pre>
<p>كل رقم في قناع الانتباه يشبه مفتاح إضاءة: <code>1</code> تعني «انظر إلى هذه الكلمة!» و<code>0</code> تعني «تجاهل هذه، فهي مجرّد حشو».</p>
<h2 id="مقارنة-المرمزات">مقارنة المُرمِّزات</h2>
<p>تتعامل المُرمِّزات المختلفة مع النص نفسه بطرق مختلفة:</p>
<pre><code class="language-python">text = <span class="hljs-string">&quot;Uncommon-tokenization: transformers&#x27; tokenizers are fast.&quot;</span>

<span class="hljs-keyword">for</span> name, tok <span class="hljs-keyword">in</span> tokenizers.items():
    tokens = tok.tokenize(text)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{name}</span>: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(tokens)}</span> tokens&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Sample: <span class="hljs-subst">{tokens[:<span class="hljs-number">5</span>]}</span>...&quot;</span>)
</code></pre>
<p>قد يقسّم BERT كلمة «Uncommon» إلى <code>['un', '##common']</code> بينما يحتفظ بها GPT-2 كاملة. ويستخدم RoBERTa ترميزًا على مستوى البايت، ويستخدم T5 تقنية SentencePiece. ولكل نهج مقايضات بين حجم المفردات والتعامل مع الكلمات النادرة والدعم متعدّد اللغات.</p>
<h2 id="إعدادات-الترميز-العملية">إعدادات الترميز العملية</h2>
<p>تتحكّم معاملات رئيسية في سلوك الترميز:</p>
<pre><code class="language-python"><span class="hljs-comment"># Full tokenization with all options</span>
encoded = tokenizer(
    text,
    padding=<span class="hljs-string">&quot;max_length&quot;</span>,      <span class="hljs-comment"># Pad to max_length</span>
    truncation=<span class="hljs-literal">True</span>,           <span class="hljs-comment"># Cut if too long</span>
    max_length=<span class="hljs-number">128</span>,           <span class="hljs-comment"># Maximum sequence length</span>
    return_tensors=<span class="hljs-string">&quot;pt&quot;</span>,      <span class="hljs-comment"># Return PyTorch tensors</span>
    return_offsets_mapping=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Character spans</span>
    return_attention_mask=<span class="hljs-literal">True</span>    <span class="hljs-comment"># Attention mask</span>
)
</code></pre>
<p>تشمل خيارات <strong><code>padding</code></strong> القيمة <code>'longest'</code> للحشو الديناميكي لكل دفعة، والقيمة <code>'max_length'</code> للأشكال الثابتة عبر الدفعات، والقيمة <code>False</code> لعدم الحشو. ويضمن <strong><code>truncation</code></strong> أن تتناسب التسلسلات مع حدود النموذج. ويمكن أن يكون <strong><code>return_tensors</code></strong> القيمة <code>&quot;pt&quot;</code> لـ PyTorch، أو <code>&quot;tf&quot;</code> لـ TensorFlow، أو <code>None</code> للقوائم.</p>
<h2 id="التعامل-مع-المستندات-الطويلة">التعامل مع المستندات الطويلة</h2>
<p>تتجاوز النصوص الطويلة حدود النموذج، ولا بدّ من تقطيعها بذكاء:</p>
<pre><code class="language-python">long_text = <span class="hljs-string">&quot;Very long document...&quot;</span> * <span class="hljs-number">100</span>

<span class="hljs-comment"># Use sliding windows with overlap</span>
encoded = tokenizer(
    long_text,
    max_length=<span class="hljs-number">512</span>,
    truncation=<span class="hljs-literal">True</span>,
    return_overflowing_tokens=<span class="hljs-literal">True</span>,
    stride=<span class="hljs-number">64</span>,  <span class="hljs-comment"># Overlap between chunks</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Number of chunks: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(encoded[<span class="hljs-string">&#x27;input_ids&#x27;</span>])}</span>&quot;</span>)
</code></pre>
<p>ينشئ المعامل <code>stride</code> تداخلًا بين المقاطع، ما يحافظ على السياق عند الحدود. وهذا يحسّن التماسك في مهام مثل الإجابة عن الأسئلة أو التلخيص.</p>
<h2 id="فك-الترميز-وربط-الإزاحات">فك الترميز وربط الإزاحات</h2>
<p>حوّل المعرّفات مرة أخرى إلى نص وتتبّع مواضع الأحرف:</p>
<pre><code class="language-python"><span class="hljs-comment"># Encode with offset mapping</span>
enc = tokenizer(
    <span class="hljs-string">&quot;The quick brown fox&quot;</span>,
    return_offsets_mapping=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># Decode back to text</span>
decoded = tokenizer.decode(enc[<span class="hljs-string">&quot;input_ids&quot;</span>], skip_special_tokens=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Offsets show character spans for each token</span>
<span class="hljs-keyword">for</span> token_id, (start, end) <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(enc[<span class="hljs-string">&quot;input_ids&quot;</span>], enc[<span class="hljs-string">&quot;offset_mapping&quot;</span>]):
    <span class="hljs-keyword">if</span> start != end:  <span class="hljs-comment"># Skip special tokens</span>
        token = tokenizer.decode([token_id])
        original_span = text[start:end]
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Token: &#x27;<span class="hljs-subst">{token}</span>&#x27; maps to characters <span class="hljs-subst">{start}</span>:<span class="hljs-subst">{end}</span> = &#x27;<span class="hljs-subst">{original_span}</span>&#x27;&quot;</span>)
</code></pre>
<p>يتيح ربط الإزاحات محاذاة دقيقة بين تنبؤات النموذج والنص الأصلي، وهو أمر ضروري لمهام مثل التعرّف على الكيانات المسمّاة أو إبراز نطاقات محدّدة.</p>
<h2 id="كيف-يعمل-ترميز-الكلمات-الفرعية">كيف يعمل ترميز الكلمات الفرعية</h2>
<p>تستخدم المُرمِّزات الحديثة خوارزميات الكلمات الفرعية للموازنة بين حجم المفردات والتغطية:</p>
<p>يبدأ <strong>ترميز أزواج البايتات (BPE)</strong> بالأحرف ثم يدمج الأزواج الأكثر تكرارًا تكرارًا. ويستخدم <strong>WordPiece</strong> (الذي يعتمد عليه BERT) تقييمًا قائمًا على الأرجحية لعمليات الدمج. ويتعامل <strong>SentencePiece</strong> مع النص كبايتات خام، ما يتيح ترميزًا مستقلًا عن اللغة.</p>
<p>تُطبّع العملية النص (تحويله إلى أحرف صغيرة، وتطبيع unicode)، ثم تقسّمه مسبقًا إلى مقاطع أولية (المسافات وعلامات الترقيم)، ثم تطبّق قواعد الدمج المتعلّمة لإنشاء الكلمات الفرعية، ثم تربط الرموز النهائية بمعرّفات المفردات.</p>
<h2 id="تحسين-الأداء">تحسين الأداء</h2>
<p>توفّر المُرمِّزات السريعة (المدعومة بـ Rust) تسريعًا ملحوظًا:</p>
<pre><code class="language-python"><span class="hljs-comment"># Fast tokenizers have additional capabilities</span>
fast_tokenizer = AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;bert-base-uncased&quot;</span>, use_fast=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Batch tokenization is vectorized</span>
texts = [<span class="hljs-string">&quot;Text 1&quot;</span>, <span class="hljs-string">&quot;Text 2&quot;</span>, <span class="hljs-string">&quot;Text 3&quot;</span>] * <span class="hljs-number">100</span>
%timeit fast_tokenizer(texts, padding=<span class="hljs-literal">True</span>, truncation=<span class="hljs-literal">True</span>)
</code></pre>
<p>تشمل نصائح التحسين إعادة استخدام نسخ المُرمِّز لتجنّب إعادة تحميل المفردات، ومعالجة النصوص دفعةً واحدة بدلًا من معالجتها فرادى، واستخدام المُرمِّزات السريعة للحصول على سرعة أكبر 10-100 مرة، وتخزين مجموعات البيانات المرمّزة مؤقتًا لتجنّب المعالجة المتكرّرة.</p>
<h2 id="المزالق-الشائعة-وحلولها">المزالق الشائعة وحلولها</h2>
<blockquote>
<p><strong>عدم توافق المُرمِّزات</strong></p>
<p>اقرن دائمًا المُرمِّز نفسه بنموذجه بدقة. فاستخدام مُرمِّز BERT مع نموذج GPT-2 ينتج مخرجات رديئة.</p>
</blockquote>
<blockquote>
<p><strong>التعامل مع الأحرف الخاصة</strong></p>
<p>تحقّق من كيفية تعامل مُرمِّزك مع unicode والرموز التعبيرية والأحرف الخاصة. فبعضها يطبّع بشكل مكثّف، وبعضها يحافظ على كل شيء.</p>
</blockquote>
<blockquote>
<p><strong>طول أقصى خاطئ</strong></p>
<p>البتر الصغير جدًا يفقد سياقًا بالغ الأهمية. والكبير جدًا يهدر الذاكرة. افحص بياناتك لتعرف الأطوال المثلى.</p>
</blockquote>
<h2 id="معرفات-نوع-الرمز-والتعامل-مع-المقاطع">معرّفات نوع الرمز والتعامل مع المقاطع</h2>
<p>تستخدم بعض النماذج (مثل BERT) معرّفات نوع الرمز للمدخلات المزدوجة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Question-answering or sentence pair classification</span>
question = <span class="hljs-string">&quot;What is tokenization?&quot;</span>
context = <span class="hljs-string">&quot;Tokenization converts text to numbers for models to process.&quot;</span>

inputs = tokenizer(
    question,
    context,
    return_token_type_ids=<span class="hljs-literal">True</span>
)

<span class="hljs-comment"># Token type IDs mark which segment each token belongs to</span>
<span class="hljs-built_in">print</span>(inputs[<span class="hljs-string">&quot;token_type_ids&quot;</span>])
<span class="hljs-comment"># [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]</span>
<span class="hljs-comment">#  &lt;-- question --&gt; &lt;---- context -----&gt;</span>
</code></pre>
<h2 id="أنماط-ترميز-متقدمة">أنماط ترميز متقدّمة</h2>
<p>في الأنظمة الإنتاجية، ضع هذه الأنماط في الحسبان:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">SmartTokenizer</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, model_name, max_length=<span class="hljs-number">512</span></span>):
        <span class="hljs-variable language_">self</span>.tokenizer = AutoTokenizer.from_pretrained(model_name)
        <span class="hljs-variable language_">self</span>.max_length = max_length

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">tokenize_batch</span>(<span class="hljs-params">self, texts, **kwargs</span>):
        <span class="hljs-comment"># Default settings for consistency</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.tokenizer(
            texts,
            padding=<span class="hljs-string">&quot;longest&quot;</span>,
            truncation=<span class="hljs-literal">True</span>,
            max_length=<span class="hljs-variable language_">self</span>.max_length,
            return_tensors=<span class="hljs-string">&quot;pt&quot;</span>,
            **kwargs
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">smart_truncate</span>(<span class="hljs-params">self, text, preserve_end=<span class="hljs-literal">False</span></span>):
        <span class="hljs-comment"># Sometimes the end of text is more important</span>
        tokens = <span class="hljs-variable language_">self</span>.tokenizer.tokenize(text)
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(tokens) &gt; <span class="hljs-variable language_">self</span>.max_length - <span class="hljs-number">2</span>:  <span class="hljs-comment"># Account for special tokens</span>
            <span class="hljs-keyword">if</span> preserve_end:
                tokens = tokens[-(<span class="hljs-variable language_">self</span>.max_length - <span class="hljs-number">2</span>):]
            <span class="hljs-keyword">else</span>:
                tokens = tokens[:<span class="hljs-variable language_">self</span>.max_length - <span class="hljs-number">2</span>]
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.tokenizer.convert_tokens_to_ids(tokens)
</code></pre>
<h2 id="تنقيح-الترميز">تنقيح الترميز</h2>
<p>عندما تسوء الأمور، افحص عملية الترميز:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">debug_tokenization</span>(<span class="hljs-params">tokenizer, text</span>):
    <span class="hljs-comment"># Step-by-step breakdown</span>
    tokens = tokenizer.tokenize(text)
    token_ids = tokenizer.convert_tokens_to_ids(tokens)
    decoded = tokenizer.decode(token_ids)

    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Original: <span class="hljs-subst">{text}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Tokens: <span class="hljs-subst">{tokens}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;IDs: <span class="hljs-subst">{token_ids}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Decoded: <span class="hljs-subst">{decoded}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Matches original? <span class="hljs-subst">{decoded.lower() == text.lower()}</span>&quot;</span>)

    <span class="hljs-comment"># Check special tokens</span>
    full_ids = tokenizer.encode(text)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;With special tokens: <span class="hljs-subst">{full_ids}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Special token positions: <span class="hljs-subst">{[i <span class="hljs-keyword">for</span> i, <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(full_ids)
                                       <span class="hljs-keyword">if</span> <span class="hljs-built_in">id</span> <span class="hljs-keyword">in</span> tokenizer.all_special_ids]}</span>&quot;</span>)
</code></pre>
<h2 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h2>
<p>الترميز هو أساس جميع مهام معالجة اللغة الطبيعية. وفهم كيف يتحوّل النص إلى أرقام، وكيف يعمل الحشو وأقنعة الانتباه، وكيف تتصرّف المُرمِّزات المختلفة يساعدك على تنقيح المشكلات وتحسين الأداء وبناء تطبيقات أكثر تطورًا. فكل سلسلة نصية يعالجها نموذج لغوي تمرّ بهذا التحوّل الحاسم من نص مقروء بشريًا إلى موتّرات (tensors) جاهزة للنموذج.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li>ملخّص المُرمِّزات في Transformers: <a href="https://huggingface.co/docs/transformers/main/en/tokenizer_summary">https://huggingface.co/docs/transformers/main/en/tokenizer_summary</a></li>
<li>مكتبة Tokenizers: <a href="https://huggingface.co/docs/tokenizers/index">https://huggingface.co/docs/tokenizers/index</a></li>
<li>ترميز أزواج البايتات (Sennrich وآخرون، 2015): <a href="https://arxiv.org/abs/1508.07909">https://arxiv.org/abs/1508.07909</a></li>
<li>WordPiece (Schuster وNakajima، 2012): <a href="https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/37842.pdf">https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/37842.pdf</a></li>
<li>SentencePiece (Kudo وRichardson، 2018): <a href="https://arxiv.org/abs/1808.06226">https://arxiv.org/abs/1808.06226</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,t as slug,e as title};
