const s="kinney",n="python-ai",a="أساسيات الذكاء الاصطناعي بلغة Python",e="decoders",p="المفكّكات وتوليد النص",t=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"الدفتر",text:"الدفتر"},{depth:2,id:"الانتباه-السببي-النافذة-أحادية-الاتجاه",text:"الانتباه السببي: النافذة أحادية الاتجاه"},{depth:2,id:"تصوير-القناع-السببي",text:"تصوير القناع السببي"},{depth:2,id:"معمارية-المفكك",text:"معمارية المفكّك"},{depth:2,id:"التوليد-الانحداري-التلقائي",text:"التوليد الانحداري التلقائي"},{depth:2,id:"استراتيجيات-فك-الترميز",text:"استراتيجيات فك الترميز"},{depth:3,id:"البحث-الجشع-greedy-search",text:"البحث الجشع (Greedy Search)"},{depth:3,id:"أخذ-العينات-مع-الحرارة-sampling-with-temperature",text:"أخذ العيّنات مع الحرارة (Sampling with Temperature)"},{depth:3,id:"أخذ-العينات-top-k-وtop-p-النواة",text:"أخذ العيّنات Top-K وTop-P (النواة)"},{depth:2,id:"القيود-الشائعة",text:"القيود الشائعة"},{depth:2,id:"التوقف-في-منتصف-الجملة",text:"التوقف في منتصف الجملة"},{depth:2,id:"توليد-النص-مقابل-الإجابة-عن-الأسئلة",text:"توليد النص مقابل الإجابة عن الأسئلة"},{depth:3,id:"الإجابة-الاستخراجية-مقابل-الإجابة-التوليدية",text:"الإجابة الاستخراجية مقابل الإجابة التوليدية"},{depth:3,id:"السر-الضبط-الدقيق-بالتعليمات",text:"السر: الضبط الدقيق بالتعليمات"},{depth:2,id:"من-الـlogits-إلى-الرموز-المعالجات-والمحولات",text:"من الـLogits إلى الرموز: المعالجات والمحوّلات"},{depth:2,id:"دقائق-البحث-الشعاعي-beam-search",text:"دقائق البحث الشُّعاعي (Beam Search)"},{depth:2,id:"نصائح-الأداء",text:"نصائح الأداء"},{depth:2,id:"الحتمية-والاختبار",text:"الحتمية والاختبار"},{depth:2,id:"البث-وزمن-الاستجابة",text:"البثّ وزمن الاستجابة"},{depth:2,id:"الخاتمة",text:"الخاتمة"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<blockquote>
<p><strong>الخلاصات الأساسية</strong></p>
<ul>
<li>اختر طريقة فك الترميز حسب الهدف: greedy/beam لأجل الحتمية، وtop-p/k مع الحرارة لأجل الإبداع</li>
<li>اضبط التكرار بالعقوبات وno-repeat n-grams؛ وحدّد شروط إيقاف صريحة</li>
<li>فضّل <code>max_new_tokens</code> للوضوح مع المطالبات الطويلة؛ واضبط دائمًا معالجة EOS</li>
<li>فعّل KV cache للبثّ؛ ورتّب الدفعات حسب الطول لأجل الإنتاجية</li>
<li>استخدم المعالجات والمحوّلات (processors/warpers) لتشكيل logits قبل أخذ العيّنات</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>تولّد المعماريات المعتمدة على المفكّك فقط (decoder-only) النص توليدًا انحداريًا تلقائيًا، إذ تتنبأ بالرمز التالي بناءً على السياق السابق. وتُجيد نماذج مثل GPT توليد نص جديد بكتابة القصص والإجابة عن الأسئلة وإكمال الجمل، رمزًا تلو الآخر. وفهم كيفية عمل هذه النماذج يكشف المعمارية والخطوات المتتابعة التي تقف وراء توليد النص.</p>
<h2 id="الدفتر">الدفتر</h2>
<p>اطّلع على الدفتر المرافق: <a href="https://colab.research.google.com/drive/1ZUmRw8pTJaGum1gzJZ4H49X9aWkd9zfW?usp=sharing">المفكّكات</a></p>
<h2 id="الانتباه-السببي-النافذة-أحادية-الاتجاه">الانتباه السببي: النافذة أحادية الاتجاه</h2>
<p>تخيّل أنك تقرأ رواية بوليسية صفحة تلو الأخرى — ترى كل ما حدث سابقًا لكن لا يمكنك إلقاء نظرة على الصفحات القادمة. قناع الانتباه السببي يجعل نماذج اللغة تتصرف بالطريقة نفسها. فعند توليد الكلمة التالية، يُخفي القناع كل الكلمات المستقبلية، فلا يستطيع النموذج الانتباه إلا إلى الكلمات التي أنتجها بالفعل.</p>
<p>الفرق الجوهري بين نماذج توليد النص (المفكّكات) ونماذج فهم النص (المشفّرات) هو طريقة رؤيتها للمدخل:</p>
<p><strong>المشفّر (مثل BERT)</strong> يستخدم انتباهًا ثنائي الاتجاه. فعند تحليل «sat» في «the cat sat on the mat»، يرى كلًا من «the cat» (قبلها) و«on the mat» (بعدها). مثالي لفهم السياق الكامل.</p>
<p><strong>المفكّك (مثل GPT)</strong> يستخدم الانتباه السببي. فعند توليد «sat»، لا يرى إلا «the cat» التي سبقتها. ولا يستطيع رؤية المستقبل لأن تلك الكلمات لم توجد بعد.</p>
<p>هذا القيد جوهري — فعند توليد النص، على النموذج أن يتنبأ بالكلمة التالية بناءً على ما كتبه هو فقط.</p>
<h2 id="تصوير-القناع-السببي">تصوير القناع السببي</h2>
<p>يمنع القناع السببي النموذج صراحةً من الانتباه إلى الرموز المستقبلية بوضع درجات انتباهها عند سالب ما لا نهاية قبل تطبيق softmax:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
<span class="hljs-keyword">import</span> seaborn <span class="hljs-keyword">as</span> sns
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

<span class="hljs-comment"># Create a causal mask for 5 tokens</span>
sequence_length = <span class="hljs-number">5</span>
causal_mask = torch.triu(torch.ones(sequence_length, sequence_length) * -<span class="hljs-number">1e9</span>, diagonal=<span class="hljs-number">1</span>)

<span class="hljs-comment"># Visualize the mask</span>
plt.figure(figsize=(<span class="hljs-number">6</span>, <span class="hljs-number">6</span>))
sns.heatmap(causal_mask, cmap=<span class="hljs-string">&#x27;viridis&#x27;</span>, annot=<span class="hljs-literal">True</span>, fmt=<span class="hljs-string">&quot;.0f&quot;</span>, cbar=<span class="hljs-literal">False</span>,
            xticklabels=np.arange(sequence_length), yticklabels=np.arange(sequence_length))
plt.title(<span class="hljs-string">&quot;Causal Attention Mask Heatmap&quot;</span>)
plt.xlabel(<span class="hljs-string">&quot;Key Token Index&quot;</span>)
plt.ylabel(<span class="hljs-string">&quot;Query Token Index&quot;</span>)
plt.show()
</code></pre>
<p>في القناع، تعني <code>0</code> «انتبه» وتشير الأرقام السالبة الكبيرة إلى «تجاهل». وهذا يضمن ألا يؤثر كل موضع إلا في نفسه والمواضع السابقة، مما ينشئ نمط التوليد من اليسار إلى اليمين.</p>
<h2 id="معمارية-المفكك">معمارية المفكّك</h2>
<p>نموذج معتمد على المفكّك فقط مثل GPT-2 هو كومة من كتل مفكّك متطابقة. ولكل كتلة مكوّنان رئيسيان:</p>
<p><strong>الانتباه الذاتي متعدد الرؤوس المقنّع</strong> يطبّق القناع السببي الذي ناقشناه، فيتيح للنموذج وزن أهمية الكلمات السابقة. و<strong>الشبكة العصبية الأمامية</strong> تعالج ناتج الانتباه، مضيفةً عمقًا حسابيًا لتعلّم أنماط معقّدة.</p>
<p>تعالج هذه الكومة تضمينات الرموز، ويغذّي ناتج الكتلة الأخيرة رأس نمذجة اللغة — طبقة خطية تُسقط التمثيل النهائي في متجه ضخم يحمل درجة واحدة لكل كلمة في المفردات:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModelForCausalLM

model_name = <span class="hljs-string">&quot;gpt2-medium&quot;</span>
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

<span class="hljs-comment"># Make sure the tokenizer has a padding token for batching</span>
<span class="hljs-keyword">if</span> tokenizer.pad_token <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
    tokenizer.pad_token = tokenizer.eos_token

<span class="hljs-comment"># The language modeling head</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Language Modeling Head (Output Layer):&quot;</span>)
<span class="hljs-built_in">print</span>(model.lm_head)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Vocabulary size: <span class="hljs-subst">{tokenizer.vocab_size}</span>&quot;</span>)
</code></pre>
<h2 id="التوليد-الانحداري-التلقائي">التوليد الانحداري التلقائي</h2>
<p>التوليد الانحداري التلقائي مصطلح فخم لفكرة بسيطة: تنبؤ النموذج التالي يعتمد على تنبؤاته السابقة. وتتبع عملية التوليد حلقة خطوة بخطوة:</p>
<ol>
<li>ابدأ بمطالبة (prompt)</li>
<li>يتنبأ النموذج باحتمالات الرمز التالي</li>
<li>تختار استراتيجية فك الترميز رمزًا واحدًا من التوزيع الاحتمالي</li>
<li>يُضاف الرمز المختار إلى متتالية المدخل</li>
<li>كرّر من الخطوة 2 حتى يُولَّد رمز إيقاف أو يُبلَغ الطول الأقصى</li>
</ol>
<p>والجزء الأكثر إثارة هو الخطوة 3: كيف نختار الرمز التالي؟</p>
<h2 id="استراتيجيات-فك-الترميز">استراتيجيات فك الترميز</h2>
<h3 id="البحث-الجشع-greedy-search">البحث الجشع (Greedy Search)</h3>
<p>يختار البحث الجشع دائمًا الرمز التالي الأكثر احتمالًا. وهو سريع وقابل للتوقّع، لكنه غالبًا ينتج نصًا مملًا ومتكررًا:</p>
<pre><code class="language-python">prompt = <span class="hljs-string">&quot;The future of artificial intelligence is&quot;</span>
inputs = tokenizer(prompt, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>)

<span class="hljs-comment"># Generate with greedy search</span>
greedy_output = model.generate(
    inputs.input_ids,
    max_new_tokens=<span class="hljs-number">20</span>,
    num_beams=<span class="hljs-number">1</span>,
    do_sample=<span class="hljs-literal">False</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Greedy Search Output:&quot;</span>)
<span class="hljs-built_in">print</span>(tokenizer.decode(greedy_output[<span class="hljs-number">0</span>], skip_special_tokens=<span class="hljs-literal">True</span>))
</code></pre>
<h3 id="أخذ-العينات-مع-الحرارة-sampling-with-temperature">أخذ العيّنات مع الحرارة (Sampling with Temperature)</h3>
<p>بدلًا من اختيار الرمز الأعلى دائمًا، يمكننا أخذ عيّنات من التوزيع الاحتمالي. والحرارة تتحكّم في العشوائية:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F

<span class="hljs-comment"># Get the model&#x27;s predicted probabilities for the next word</span>
<span class="hljs-keyword">with</span> torch.no_grad():
    outputs = model(**inputs)
    next_token_logits = outputs.logits[:, -<span class="hljs-number">1</span>, :]
    probs = F.softmax(next_token_logits, dim=-<span class="hljs-number">1</span>).cpu().numpy().flatten()

<span class="hljs-comment"># Function to apply temperature</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">apply_temperature</span>(<span class="hljs-params">logits, temperature</span>):
    <span class="hljs-keyword">return</span> F.softmax(logits / temperature, dim=-<span class="hljs-number">1</span>).cpu().numpy().flatten()

<span class="hljs-comment"># Visualize temperature effects</span>
temperatures = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">1.5</span>]

plt.figure(figsize=(<span class="hljs-number">15</span>, <span class="hljs-number">5</span>))
<span class="hljs-keyword">for</span> i, temp <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(temperatures):
    plt.subplot(<span class="hljs-number">1</span>, <span class="hljs-built_in">len</span>(temperatures), i + <span class="hljs-number">1</span>)
    temp_probs = apply_temperature(next_token_logits, temp)
    <span class="hljs-comment"># Get top 20 tokens for visualization</span>
    topk_probs, topk_indices = torch.topk(torch.from_numpy(temp_probs), <span class="hljs-number">20</span>)
    topk_tokens = [tokenizer.decode(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> topk_indices]

    plt.bar(topk_tokens, topk_probs.numpy(), color=<span class="hljs-string">&#x27;skyblue&#x27;</span>)
    plt.title(<span class="hljs-string">f&quot;Temperature = <span class="hljs-subst">{temp}</span>&quot;</span>)
    plt.xticks(rotation=<span class="hljs-number">90</span>)
    plt.ylabel(<span class="hljs-string">&quot;Probability&quot;</span>)

plt.tight_layout()
plt.show()

<span class="hljs-comment"># Generate with sampling</span>
sampling_output = model.generate(
    inputs.input_ids,
    max_new_tokens=<span class="hljs-number">50</span>,
    do_sample=<span class="hljs-literal">True</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_k=<span class="hljs-number">0</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\\nSampling with Temperature (0.7):&quot;</span>)
<span class="hljs-built_in">print</span>(tokenizer.decode(sampling_output[<span class="hljs-number">0</span>], skip_special_tokens=<span class="hljs-literal">True</span>))
</code></pre>
<p><strong>الحرارة المنخفضة (0.2)</strong> تجعل التوزيع «أكثر حدّة» — فيصبح النموذج واثقًا ومحافظًا، على غرار البحث الجشع. و<strong>الحرارة المرتفعة (1.5)</strong> تُسطّح التوزيع — فيخاطر النموذج، ما يؤدي إلى نص إبداعي أو غير منطقي.</p>
<p>فكّر في الحرارة كمِقبض للإبداع: اخفضه للأمان وارفعه للتجريب.</p>
<h3 id="أخذ-العينات-top-k-وtop-p-النواة">أخذ العيّنات Top-K وTop-P (النواة)</h3>
<p>قد يُنتج أخذ العيّنات كلمات غريبة إن اختار عشوائيًا رموزًا منخفضة الاحتمال. لذلك نرشّح التوزيع قبل أخذ العيّنات:</p>
<p><strong>أخذ العيّنات Top-K</strong> لا ينظر إلا إلى الرموز الـk الأكثر احتمالًا. فمع <code>top_k=50</code>، يأخذ النموذج عيّناته من 50 كلمة فقط هي الأكثر احتمالًا.</p>
<p><strong>أخذ العيّنات Top-P (النواة)</strong> يتكيّف ديناميكيًا. فهو ينظر إلى أصغر مجموعة من الرموز يتجاوز مجموع احتمالاتها التراكمي العتبة p. فإذا كان <code>p=0.9</code>، أخذ عيّناته من الرموز التي تشكّل 90% من كتلة الاحتمال.</p>
<pre><code class="language-python"><span class="hljs-comment"># Generate with Top-P (Nucleus) Sampling</span>
nucleus_output = model.generate(
    inputs.input_ids,
    max_new_tokens=<span class="hljs-number">50</span>,
    do_sample=<span class="hljs-literal">True</span>,
    top_p=<span class="hljs-number">0.92</span>,
    top_k=<span class="hljs-number">0</span>  <span class="hljs-comment"># Disable top-k</span>
)

<span class="hljs-built_in">print</span>(tokenizer.decode(nucleus_output[<span class="hljs-number">0</span>], skip_special_tokens=<span class="hljs-literal">True</span>))
</code></pre>
<p>يُوصى عمومًا بـTop-P لتوليد نص عالي الجودة لأنه يتكيّف مع الحالة — فحين يكون النموذج واثقًا ينظر في كلمات قليلة، وحين يكون مترددًا ينظر في كلمات كثيرة.</p>
<h2 id="القيود-الشائعة">القيود الشائعة</h2>
<p><strong>نافذة السياق</strong>: للنماذج ذاكرة محدودة. ولـGPT-2 نافذة سياق من 1024 رمزًا — لا يستطيع تذكّر أي شيء يتجاوز تلك النافذة.</p>
<p><strong>التكرار</strong>: قد تعلق النماذج في حلقات. وتساعد معاملات مثل <code>repetition_penalty</code>:</p>
<pre><code class="language-python">output = model.generate(
    **inputs,
    max_new_tokens=<span class="hljs-number">60</span>,
    do_sample=<span class="hljs-literal">True</span>,
    top_p=<span class="hljs-number">0.95</span>,
    temperature=<span class="hljs-number">0.8</span>,
    repetition_penalty=<span class="hljs-number">1.05</span>,      <span class="hljs-comment"># Penalize repeated tokens</span>
    no_repeat_ngram_size=<span class="hljs-number">3</span>,       <span class="hljs-comment"># Block exact 3-gram repeats</span>
    eos_token_id=tokenizer.eos_token_id
)
</code></pre>
<p><strong>الهلوسة</strong>: قد تولّد النماذج نصًا يبدو معقولًا لكنه غير صحيح وقائعيًا. إنها آلات مطابقة أنماط بلا فهم حقيقي.</p>
<p><strong>التحيّز</strong>: ترث النماذج تحيّزات مجتمعية من بيانات التدريب. فكن دائمًا ناقدًا للمخرجات.</p>
<h2 id="التوقف-في-منتصف-الجملة">التوقف في منتصف الجملة</h2>
<p>تتعلّم النماذج إنهاء الجمل طبيعيًا بالتنبؤ برمز نهاية المتتالية (EOS). وأثناء التدريب تلاحظ أنماط الجمل وتتعلّم ربط اكتمال الفكرة برمز EOS. وعندما يصبح احتمال EOS هو الأعلى، يتوقف التوليد:</p>
<pre><code class="language-python"><span class="hljs-comment"># Increase max_new_tokens to allow for a full sentence</span>
natural_stop_output = model.generate(
    inputs.input_ids,
    max_new_tokens=<span class="hljs-number">100</span>,  <span class="hljs-comment"># Give the model plenty of room</span>
    do_sample=<span class="hljs-literal">True</span>,
    top_p=<span class="hljs-number">0.92</span>,
    temperature=<span class="hljs-number">0.7</span>,
    top_k=<span class="hljs-number">0</span>,
    eos_token_id=tokenizer.eos_token_id
)

<span class="hljs-built_in">print</span>(tokenizer.decode(natural_stop_output[<span class="hljs-number">0</span>], skip_special_tokens=<span class="hljs-literal">True</span>))
</code></pre>
<h2 id="توليد-النص-مقابل-الإجابة-عن-الأسئلة">توليد النص مقابل الإجابة عن الأسئلة</h2>
<p>نماذج مثل ChatGPT وGPT هي في جوهرها أنظمة توليد نص بالغة التقدّم. وهي لا تنتقل بين أنماط مختلفة — بل دُرِّبت قدرتها الوحيدة القوية على توليد النص على التعرّف على الأنماط بمهارة تجعلها تنتج نوع النص الصحيح لأي مهمة:</p>
<p>حين تطرح سؤالًا، تولّد نصًا يكون إجابة. وحين تطلب ملخصًا، تولّد نصًا يكون ملخصًا. وحين تطلب الترجمة، تولّد نصًا في اللغة الهدف.</p>
<h3 id="الإجابة-الاستخراجية-مقابل-الإجابة-التوليدية">الإجابة الاستخراجية مقابل الإجابة التوليدية</h3>
<p><strong>الإجابة الاستخراجية</strong> (مثل مثال الهوت دوغ سابقًا) تجد الإجابات الدقيقة وتستخرجها من السياق المتاح. ولا تستطيع استخدام معرفة خارجية.</p>
<p><strong>الإجابة التوليدية</strong> (ChatGPT وClaude وGemini) تولّد إجابات من الصفر بناءً على معرفة واسعة تعلّمتها أثناء التدريب. ولهذا تستطيع الإجابة عن أسئلة في أي موضوع تقريبًا دون الحاجة إلى سياق محدّد.</p>
<h3 id="السر-الضبط-الدقيق-بالتعليمات">السر: الضبط الدقيق بالتعليمات</h3>
<p>تبدأ النماذج الأساسية مفكّكات ضخمة دُرِّبت على التنبؤ بالكلمة التالية من أجزاء واسعة من الإنترنت. وبعد ذلك، يدرّبها الضبط الدقيق بالتعليمات على أزواج <code>[instruction, response]</code> عالية الجودة يكتبها البشر. وهذا يعلّم النموذج كيف يكون مساعدًا مفيدًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;instruction&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;What is the capital of France?&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;response&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The capital of France is Paris.&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وبالتدريب على ملايين الأمثلة من هذا القبيل، يتعلّم النموذج أن المدخل حين يكون سؤالًا، فإن «الرموز التالية» الأكثر احتمالًا إحصائيًا تشكّل إجابة متماسكة. والنموذج لا «يقرّر» الإجابة — بل جعل تدريبه نص الإجابة أكثر استكمال احتمالًا لنص السؤال.</p>
<h2 id="من-الـlogits-إلى-الرموز-المعالجات-والمحولات">من الـLogits إلى الرموز: المعالجات والمحوّلات</h2>
<p>تحسب حلقة التوليد logits في كل خطوة، ثم تطبّق المعالجات قبل أخذ العيّنات:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoModelForCausalLM, AutoTokenizer
<span class="hljs-keyword">import</span> torch

tok = AutoTokenizer.from_pretrained(<span class="hljs-string">&quot;gpt2&quot;</span>)
model = AutoModelForCausalLM.from_pretrained(<span class="hljs-string">&quot;gpt2&quot;</span>).<span class="hljs-built_in">eval</span>()

inp = tok(<span class="hljs-string">&quot;Write a haiku about the ocean:\\n&quot;</span>, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>)

out = model.generate(
    **inp,
    max_new_tokens=<span class="hljs-number">60</span>,
    do_sample=<span class="hljs-literal">True</span>,
    top_p=<span class="hljs-number">0.95</span>,
    temperature=<span class="hljs-number">0.8</span>,
    repetition_penalty=<span class="hljs-number">1.05</span>,
    no_repeat_ngram_size=<span class="hljs-number">3</span>,
    eos_token_id=tok.eos_token_id,
)

<span class="hljs-built_in">print</span>(tok.decode(out[<span class="hljs-number">0</span>], skip_special_tokens=<span class="hljs-literal">True</span>))
</code></pre>
<p>تشمل المعالجات النموذجية فرض الحد الأدنى/الأقصى للطول، وعقوبات التكرار، وتصفية الكلمات السيئة، والرموز المفروضة. أما المحوّلات (warpers) فتعيد تشكيل التوزيع عبر تعديلات top-k وtop-p والحرارة.</p>
<h2 id="دقائق-البحث-الشعاعي-beam-search">دقائق البحث الشُّعاعي (Beam Search)</h2>
<p>يستكشف البحث الشُّعاعي فرضيات متعددة لتعظيم احتمال المتتالية الكلي:</p>
<pre><code class="language-python">beam_output = model.generate(
    inputs.input_ids,
    max_new_tokens=<span class="hljs-number">30</span>,
    num_beams=<span class="hljs-number">5</span>,
    early_stopping=<span class="hljs-literal">True</span>
)
</code></pre>
<p>يحتفظ البحث الشُّعاعي بـk فرضيات جزئية، ويوسّعها، ويطبّق تطبيع الطول لتجنّب تفضيل المتتاليات القصيرة. وهو ينتج مخرجات أعلى جودة لكن أكثر استهلاكًا للحساب.</p>
<h2 id="نصائح-الأداء">نصائح الأداء</h2>
<p><strong>التخزين المؤقت</strong>: استخدم KV-cache لتجنّب إعادة حساب الانتباه للرموز السابقة في التوليدات الطويلة. فعّله بـ<code>model.config.use_cache = True</code>.</p>
<p><strong>الدفعات</strong>: جمّع المطالبات المتقاربة في الطول لتعظيم الإنتاجية وتقليل هدر الحشو.</p>
<p><strong>الدقة المختلطة</strong>: استخدم fp16/bf16 لاستدلال أسرع على وحدات GPU الحديثة:</p>
<pre><code class="language-python">model = model.half()  <span class="hljs-comment"># Convert to fp16</span>
<span class="hljs-comment"># or</span>
model = model.to(torch.bfloat16)
</code></pre>
<h2 id="الحتمية-والاختبار">الحتمية والاختبار</h2>
<p>اضبط البذور العشوائية واستخدم فك الترميز الجشع أو منخفض الحرارة عندما تحتاج إلى مخرجات قابلة لإعادة الإنتاج:</p>
<pre><code class="language-python">torch.manual_seed(<span class="hljs-number">42</span>)
output = model.generate(
    inputs.input_ids,
    do_sample=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Deterministic greedy decoding</span>
    max_new_tokens=<span class="hljs-number">50</span>
)
</code></pre>
<p>لاحظ أن عدم حتمية الفاصلة العائمة على وحدات GPU قد يسبّب اختلافات صغيرة رغم ذلك؛ ففضّل beam أو greedy في المسارات الحرجة.</p>
<h2 id="البث-وزمن-الاستجابة">البثّ وزمن الاستجابة</h2>
<p>في التطبيقات التفاعلية، ابثّ الرموز أثناء توليدها. واحتفظ بذاكرة مؤقتة من موترات المفتاح/القيمة لتحقيق زمن استجابة على مستوى الرمز. وفي الخدمة بالدفعات، جمّع المطالبات حسب الطول لتقليل هدر الحشو.</p>
<h2 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h2>
<p>تولّد المفكّكات النص عبر عملية منسّقة بعناية: يفرض الانتباه السببي التوليد من اليسار إلى اليمين، وتبني كتل المحوّلات المكدّسة تمثيلات عميقة، وينتج رأس نمذجة اللغة احتمالات المفردات، وتوازن استراتيجيات فك الترميز بين الجودة والإبداع.</p>
<p>وفهم هذه الميكانيكيات يزيل الغموض عن كيفية عمل نماذج مثل GPT. فقد انكشف «سحر» <code>pipeline(&quot;text-generation&quot;)</code> الآن كتفاعل أنيق بين أقنعة الانتباه والتوزيعات الاحتمالية واستراتيجيات أخذ العيّنات. وتبني المحادثة الذكية الحديثة على هذه الأسس، مضيفةً ضبط التعليمات وتدابير الأمان لتصنع مساعدين مفيدين وغير ضارين من مولّدات نص قوية.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li>Transformers — توليد النص: <a href="https://huggingface.co/docs/transformers/main/en/generation_strategies">https://huggingface.co/docs/transformers/main/en/generation_strategies</a></li>
<li>معالجات Logits والمحوّلات (Warpers): <a href="https://huggingface.co/docs/transformers/main/en/main_classes/text_generation#transformers.LogitsProcessor">https://huggingface.co/docs/transformers/main/en/main_classes/text_generation#transformers.LogitsProcessor</a></li>
<li>الحالة العجيبة لانحلال النص العصبي (Holtzman وآخرون، أخذ عيّنات النواة): <a href="https://arxiv.org/abs/1904.09751">https://arxiv.org/abs/1904.09751</a></li>
<li>تحسين البحث الشُّعاعي: <a href="https://arxiv.org/abs/1707.07862">https://arxiv.org/abs/1707.07862</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,l as html,e as slug,p as title};
