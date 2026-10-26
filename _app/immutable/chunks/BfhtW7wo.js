const s="kinney",n="python-ai",a="أساسيات الذكاء الاصطناعي بلغة Python",e="fine-tuning",t="الضبط الدقيق لنماذج المحوّلات (Transformer)",p=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"دفتر-الملاحظات",text:"دفتر الملاحظات"},{depth:2,id:"ما-هو-الضبط-الدقيق",text:"ما هو الضبط الدقيق؟"},{depth:2,id:"لماذا-الضبط-الدقيق",text:"لماذا الضبط الدقيق؟"},{depth:2,id:"التهيئة-للضبط-الدقيق",text:"التهيئة للضبط الدقيق"},{depth:2,id:"تحضير-البيانات",text:"تحضير البيانات"},{depth:2,id:"تحميل-النموذج-المدرب-مسبقا",text:"تحميل النموذج المُدرَّب مسبقًا"},{depth:2,id:"الضبط-الدقيق-الفعال-من-حيث-المعاملات-peft",text:"الضبط الدقيق الفعّال من حيث المعاملات (PEFT)"},{depth:3,id:"ما-هو-lora",text:"ما هو LoRA؟"},{depth:2,id:"ترميز-مجموعة-البيانات",text:"ترميز مجموعة البيانات"},{depth:2,id:"عملية-الضبط-الدقيق",text:"عملية الضبط الدقيق"},{depth:2,id:"شرح-وسائط-التدريب",text:"شرح وسائط التدريب"},{depth:2,id:"اختبار-النموذج-المضبوط",text:"اختبار النموذج المضبوط"},{depth:2,id:"مقاربات-الضبط-الدقيق",text:"مقاربات الضبط الدقيق"},{depth:3,id:"الضبط-الدقيق-الكامل",text:"الضبط الدقيق الكامل"},{depth:3,id:"lorapeft",text:"LoRA/PEFT"},{depth:3,id:"تجميد-الطبقات",text:"تجميد الطبقات"},{depth:2,id:"مقاييس-التقييم",text:"مقاييس التقييم"},{depth:2,id:"النشر-في-الإنتاج",text:"النشر في الإنتاج"},{depth:3,id:"إدارة-إصدارات-النموذج",text:"إدارة إصدارات النموذج"},{depth:3,id:"الاستدلال-الآمن",text:"الاستدلال الآمن"},{depth:2,id:"ضبط-المعاملات-الفائقة",text:"ضبط المعاملات الفائقة"},{depth:2,id:"استكشاف-المشكلات-الشائعة-وإصلاحها",text:"استكشاف المشكلات الشائعة وإصلاحها"},{depth:2,id:"توسيع-نطاق-التدريب",text:"توسيع نطاق التدريب"},{depth:2,id:"الأخلاقيات-والسلامة",text:"الأخلاقيات والسلامة"},{depth:2,id:"تقنيات-متقدمة",text:"تقنيات متقدّمة"},{depth:3,id:"الضبط-الدقيق-القائم-على-الأوامر",text:"الضبط الدقيق القائم على الأوامر"},{depth:3,id:"الضبط-الدقيق-متعدد-المهام",text:"الضبط الدقيق متعدّد المهام"},{depth:3,id:"التعلم-المستمر",text:"التعلّم المستمر"},{depth:2,id:"الخاتمة",text:"الخاتمة"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<blockquote>
<p><strong>أهم الاستنتاجات</strong></p>
<ul>
<li>البيانات النظيفة جيدة التوسيم هي الأهم؛ رمّز بمُرمِّز النموذج نفسه بالضبط</li>
<li>اختر الضبط الكامل (full FT) للسعة أو LoRA/PEFT للكفاءة وإعادة استخدام المحوّلات (adapters)</li>
<li>اضبط Trainer: أحجام الدفعات، ومعدل التعلّم/التسخين، واضمحلال الأوزان، والدقة، واستراتيجية التقييم</li>
<li>استخدم الإيقاف المبكر ونقاط التحقق والمراجعات المثبَّتة لضمان قابلية إعادة الإنتاج</li>
<li>جهّز للإنتاج بإعدادات فك ترميز آمنة افتراضيًا، وقابلية المراقبة، وإدارة الإصدارات</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>يُكيّف الضبط الدقيق نموذجًا مُدرَّبًا مسبقًا مع مجالك أو مهمتك باستخدام أمثلة موسومة، ما يحسّن الدقة والالتزام بالأسلوب. يمكنك تحديث كل الأوزان (الضبط الكامل) أو تطبيق طرق فعّالة من حيث المعاملات مثل LoRA/PEFT لتقليل متطلبات الحوسبة وVRAM. تشبه هذه العملية تعليم طالب واسع المعرفة مهارة محدّدة—فالنموذج المُدرَّب مسبقًا يفهم أنماط اللغة بالفعل، ونحن نعلّمه تطبيق هذه المعرفة على مهمتنا المحدّدة.</p>
<h2 id="دفتر-الملاحظات">دفتر الملاحظات</h2>
<p>اطّلع على دفتر الملاحظات المرافق: <a href="https://colab.research.google.com/drive/1obIENeCQ1NqIe2CK7hgB-s4X0G29T-BV?usp=sharing">الضبط الدقيق</a></p>
<h2 id="ما-هو-الضبط-الدقيق">ما هو الضبط الدقيق؟</h2>
<p>يأخذ الضبط الدقيق نموذجًا تعلّم بالفعل الفهم اللغوي العام من مجموعات بيانات ضخمة ويخصّصه لاحتياجاتك المحدّدة. فقد تعلّم النموذج الأساسي الأنماط والقواعد والمعرفة من التدريب على أجزاء ضخمة من الإنترنت. ويعلّمه الضبط الدقيق كيفية تطبيق هذه المعرفة على مهمتك.</p>
<h2 id="لماذا-الضبط-الدقيق">لماذا الضبط الدقيق؟</h2>
<p><strong>الأداء الخاص بالمهمة</strong>: النماذج المُدرَّبة مسبقًا عامة الغرض؛ والضبط الدقيق يجعلها خبيرة في مهمتك. <strong>التكيّف مع المجال</strong>: كيّف النماذج مع مجالات محدّدة (طبي، قانوني، تقني). <strong>كفاءة البيانات</strong>: يتطلب بيانات أقل بكثير من التدريب من الصفر. <strong>كفاءة الوقت</strong>: أسرع بكثير من التدريب المسبق لنموذج.</p>
<h2 id="التهيئة-للضبط-الدقيق">التهيئة للضبط الدقيق</h2>
<p>أولًا، ثبّت المكتبات اللازمة:</p>
<pre><code class="language-python">!pip install transformers datasets accelerate bitsandbytes -q

<span class="hljs-keyword">import</span> pprint
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig,
    DataCollatorForLanguageModeling,
    TrainingArguments,
    Trainer,
    pipeline,
    logging
)
<span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset
<span class="hljs-keyword">import</span> peft

<span class="hljs-comment"># Suppress verbose output</span>
logging.set_verbosity_error()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;🤘 The setup is complete.&quot;</span>)
</code></pre>
<h2 id="تحضير-البيانات">تحضير البيانات</h2>
<p>جودة بياناتك التدريبية وتنسيقها هما أهم عاملين لنجاح الضبط الدقيق. وفي مثالنا، سنعلّم نموذجًا توليد الاقتباسات:</p>
<pre><code class="language-python"><span class="hljs-comment"># Load the dataset</span>
dataset_name = <span class="hljs-string">&quot;Abirate/english_quotes&quot;</span>
dataset = load_dataset(dataset_name, split=<span class="hljs-string">&quot;train&quot;</span>)

<span class="hljs-built_in">print</span>(dataset)
<span class="hljs-comment"># Dataset({</span>
<span class="hljs-comment">#     features: [&#x27;quote&#x27;, &#x27;author&#x27;, &#x27;tags&#x27;],</span>
<span class="hljs-comment">#     num_rows: 2508</span>
<span class="hljs-comment"># })</span>

<span class="hljs-comment"># Format data for our task</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_prompt</span>(<span class="hljs-params">example</span>):
    quote_text = example[<span class="hljs-string">&#x27;quote&#x27;</span>]
    author_name = example[<span class="hljs-string">&#x27;author&#x27;</span>]
    <span class="hljs-keyword">return</span> {<span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">f&quot;Quote by <span class="hljs-subst">{author_name}</span>: <span class="hljs-subst">{quote_text}</span> &lt;|endoftext|&gt;&quot;</span>}

formatted_dataset = dataset.<span class="hljs-built_in">map</span>(format_prompt)

<span class="hljs-comment"># Example formatted text</span>
<span class="hljs-built_in">print</span>(formatted_dataset[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;text&#x27;</span>])
<span class="hljs-comment"># Quote by Oscar Wilde: &quot;Be yourself; everyone else is already taken.&quot; &lt;|endoftext|&gt;</span>
</code></pre>
<p>رمز <code>&lt;|endoftext|&gt;</code> بالغ الأهمية—فهو يعلّم النموذج متى ينتهي الاقتباس، فيتعلّم التوقف عن التوليد في الوقت المناسب.</p>
<h2 id="تحميل-النموذج-المدرب-مسبقا">تحميل النموذج المُدرَّب مسبقًا</h2>
<p>سنستخدم التكميم (quantization) لجعل النموذج موفّرًا للذاكرة. وهذا يتيح لنا ضبط نماذج أكبر دقيقًا على عتاد محدود:</p>
<pre><code class="language-python">model_name = <span class="hljs-string">&quot;gpt2-medium&quot;</span>

<span class="hljs-comment"># Quantization configuration to load the model in 4-bit</span>
bnb_config = BitsAndBytesConfig(
    load_in_4bit=<span class="hljs-literal">True</span>,
    bnb_4bit_quant_type=<span class="hljs-string">&quot;nf4&quot;</span>,
    bnb_4bit_compute_dtype=torch.float16,
)

<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_model</span>():
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        quantization_config=bnb_config,
        trust_remote_code=<span class="hljs-literal">True</span>
    )
    model.config.use_cache = <span class="hljs-literal">False</span>
    <span class="hljs-keyword">return</span> model

<span class="hljs-comment"># Load the tokenizer</span>
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=<span class="hljs-literal">True</span>)
tokenizer.pad_token = tokenizer.eos_token
</code></pre>
<p>فكّر في التكميم كما لو أنه إنشاء ملخّص لكتاب طويل جدًا. فبدلًا من استخدام مفردات غنية ومفصّلة (أعداد الفاصلة العائمة 32-بت)، نستخدم مجموعة محدودة وأكثر كفاءة من الكلمات (أعداد صحيحة 4-بت) لالتقاط الأفكار الرئيسية.</p>
<h2 id="الضبط-الدقيق-الفعال-من-حيث-المعاملات-peft">الضبط الدقيق الفعّال من حيث المعاملات (PEFT)</h2>
<p>PEFT عائلة من التقنيات لتخصيص النماذج الكبيرة دون المساس بكل أوزانها الأصلية. وبدلًا من إعادة تدريب مئات الملايين من المعاملات، تُجمّد طرق PEFT النموذج الأساسي وتتعلّم إضافة صغيرة جدًا فقط.</p>
<h3 id="ما-هو-lora">ما هو LoRA؟</h3>
<p>يُجمّد التكيّف منخفض الرتبة (LoRA) الأوزان الأصلية ويتعلّم مصفوفتين صغيرتين جدًا يكون حاصل ضربهما منخفض الرتبة للغاية. وأثناء التدريب، لا تُحدَّث سوى مصفوفات الإضافة هذه، فتخزّن وتضرب معاملات أقل بكثير—غالبًا أقل بمئات المرات من الضبط الكامل.</p>
<pre><code class="language-python">data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=<span class="hljs-literal">False</span>
)

<span class="hljs-comment"># Configure LoRA</span>
lora_config = peft.LoraConfig(
    r=<span class="hljs-number">8</span>,  <span class="hljs-comment"># Rank of the update matrices</span>
    lora_alpha=<span class="hljs-number">32</span>,  <span class="hljs-comment"># Scaling factor for the LoRA weights</span>
    lora_dropout=<span class="hljs-number">0.05</span>,  <span class="hljs-comment"># Dropout probability for LoRA layers</span>
    bias=<span class="hljs-string">&quot;none&quot;</span>,  <span class="hljs-comment"># Bias type</span>
    task_type=<span class="hljs-string">&quot;CAUSAL_LM&quot;</span>,  <span class="hljs-comment"># Task type</span>
    fan_in_fan_out=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Add LoRA adapters to the model</span>
model = peft.get_peft_model(get_model(), lora_config)
model.print_trainable_parameters()
<span class="hljs-comment"># trainable params: 786,432 || all params: 355,609,600 || trainable%: 0.2212</span>
</code></pre>
<p>نحن ندرّب أقل من 1% من معاملات النموذج! لهذا السبب يكون LoRA بهذه الكفاءة.</p>
<h2 id="ترميز-مجموعة-البيانات">ترميز مجموعة البيانات</h2>
<p>حوّل نصّنا المنسّق إلى معرّفات رموز (token IDs):</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">tokenize_function</span>(<span class="hljs-params">examples</span>):
    <span class="hljs-keyword">return</span> tokenizer(
        examples[<span class="hljs-string">&#x27;text&#x27;</span>],
        padding=<span class="hljs-string">&quot;max_length&quot;</span>,
        truncation=<span class="hljs-literal">True</span>,
        max_length=<span class="hljs-number">128</span>
    )

<span class="hljs-comment"># Tokenize the entire dataset</span>
tokenized_dataset = formatted_dataset.<span class="hljs-built_in">map</span>(tokenize_function, batched=<span class="hljs-literal">True</span>)

pprint.pp(tokenized_dataset[<span class="hljs-number">0</span>], compact=<span class="hljs-literal">True</span>)
</code></pre>
<h2 id="عملية-الضبط-الدقيق">عملية الضبط الدقيق</h2>
<p>استخدم واجهة Trainer من Hugging Face لإدارة حلقة التدريب بالكامل:</p>
<pre><code class="language-python"><span class="hljs-comment"># Define training arguments</span>
training_args = TrainingArguments(
    output_dir=<span class="hljs-string">&quot;./gpt2-medium-quotes&quot;</span>,
    num_train_epochs=<span class="hljs-number">1</span>,
    per_device_train_batch_size=<span class="hljs-number">2</span>,
    gradient_accumulation_steps=<span class="hljs-number">1</span>,
    learning_rate=<span class="hljs-number">2e-4</span>,
    fp16=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Mixed precision for faster training</span>
    logging_steps=<span class="hljs-number">200</span>,
    save_total_limit=<span class="hljs-number">2</span>,
    report_to=<span class="hljs-string">&quot;none&quot;</span>
)

<span class="hljs-comment"># Create the Trainer instance</span>
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator
)

<span class="hljs-comment"># Start fine-tuning!</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;🚀 Starting fine-tuning…&quot;</span>)
trainer.train()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;✅ Fine-tuning complete!&quot;</span>)

<span class="hljs-comment"># Save the final model</span>
final_model_dir = <span class="hljs-string">&quot;./gpt2-medium-quotes-final&quot;</span>
trainer.save_model(final_model_dir)
</code></pre>
<h2 id="شرح-وسائط-التدريب">شرح وسائط التدريب</h2>
<p><strong><code>learning_rate</code></strong>: فكّر في هذا كحجم الخطوة التي يخطوها الطالب عند تصحيح خطأ. فإن كانت كبيرة جدًا (&gt;5e-5)، فقد يتجاوز الحد. وإن كانت صغيرة جدًا (&lt;1e-6)، فسيستغرق التعلّم وقتًا طويلًا لا ينتهي.</p>
<p><strong><code>per_device_train_batch_size</code></strong>: عدد الأمثلة التي تُعرض قبل تحديث الفهم. وهو أكثر كفاءة من عرض مثال واحد في كل مرة.</p>
<p><strong><code>num_train_epochs</code></strong>: عدد المرات التي تمرّ فيها على مجموعة البيانات بالكامل. وقد تُحسّن الحقب (epochs) الأكثر التعلّم لكنها تخاطر بالإفراط في التخصيص.</p>
<p><strong><code>fp16</code></strong>: استخدم الدقة المختلطة لتدريب أسرع واستهلاك ذاكرة أقل.</p>
<h2 id="اختبار-النموذج-المضبوط">اختبار النموذج المضبوط</h2>
<p>قارن النموذج الأساسي بنسختنا المضبوطة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> peft <span class="hljs-keyword">import</span> PeftModel

prompt = <span class="hljs-string">&quot;Quote by Jimi Hendrix&quot;</span>

<span class="hljs-comment"># Test the original base model</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;--- Testing the Original Base Model ---&quot;</span>)
base_generator = pipeline(<span class="hljs-string">&#x27;text-generation&#x27;</span>, model=<span class="hljs-string">&quot;gpt2-medium&quot;</span>, tokenizer=<span class="hljs-string">&quot;gpt2-medium&quot;</span>)
result = base_generator(prompt, max_length=<span class="hljs-number">50</span>, num_return_sequences=<span class="hljs-number">1</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Base model response:&quot;</span>)
<span class="hljs-built_in">print</span>(result[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;generated_text&#x27;</span>])

<span class="hljs-comment"># Test our fine-tuned model</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\\n--- Testing Our Fine-Tuned Model ---&quot;</span>)
base_model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    low_cpu_mem_usage=<span class="hljs-literal">True</span>
)
fine_tuned_model = PeftModel.from_pretrained(base_model, final_model_dir)
fine_tuned_model = fine_tuned_model.merge_and_unload()

fine_tuned_generator = pipeline(
    <span class="hljs-string">&#x27;text-generation&#x27;</span>,
    model=fine_tuned_model,
    tokenizer=tokenizer
)
result = fine_tuned_generator(prompt, max_length=<span class="hljs-number">50</span>, num_return_sequences=<span class="hljs-number">1</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Fine-tuned model response:&quot;</span>)
<span class="hljs-built_in">print</span>(result[<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;generated_text&#x27;</span>])
</code></pre>
<p>ينبغي أن ترى فرقًا هائلًا. فالنموذج الأساسي غالبًا يولّد شيئًا عامًا أو غير ذي صلة، بينما يولّد النموذج المضبوط فورًا اقتباسًا معقولًا يتبع البنية التي تعلّمها.</p>
<h2 id="مقاربات-الضبط-الدقيق">مقاربات الضبط الدقيق</h2>
<h3 id="الضبط-الدقيق-الكامل">الضبط الدقيق الكامل</h3>
<p>يحدّث كل أوزان النموذج. ويوفّر أعلى سعة لكنه الأكثر تكلفة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Full fine-tuning (without LoRA)</span>
model = AutoModelForCausalLM.from_pretrained(model_name)
<span class="hljs-comment"># All parameters are trainable</span>
</code></pre>
<h3 id="lorapeft">LoRA/PEFT</h3>
<p>يحقن محوّلات منخفضة الرتبة، فيدرّب معاملات أقل بمقدار 10-100×:</p>
<pre><code class="language-python">lora_config = peft.LoraConfig(
    r=<span class="hljs-number">8</span>,  <span class="hljs-comment"># Lower rank = fewer parameters</span>
    lora_alpha=<span class="hljs-number">16</span>,  <span class="hljs-comment"># Scaling factor</span>
    target_modules=[<span class="hljs-string">&quot;c_attn&quot;</span>],  <span class="hljs-comment"># Which layers to adapt</span>
    lora_dropout=<span class="hljs-number">0.05</span>
)
</code></pre>
<h3 id="تجميد-الطبقات">تجميد الطبقات</h3>
<p>جمّد الطبقات الدنيا لتوفير الحوسبة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Freeze all but the last two transformer blocks</span>
<span class="hljs-keyword">for</span> param <span class="hljs-keyword">in</span> model.transformer.h[:-<span class="hljs-number">2</span>].parameters():
    param.requires_grad = <span class="hljs-literal">False</span>
</code></pre>
<h2 id="مقاييس-التقييم">مقاييس التقييم</h2>
<p>راقب هذه المقاييس أثناء التدريب:</p>
<p><strong>التصنيف</strong>: الدقة، ودرجة F1، والإحكام (precision)، والاستدعاء (recall). <strong>التوليد</strong>: الحيرة (perplexity)، ودرجة BLEU، والتقييم البشري. <strong>مقاييس مخصّصة</strong>: قياسات خاصة بالمهمة.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> evaluate

<span class="hljs-keyword">def</span> <span class="hljs-title function_">compute_metrics</span>(<span class="hljs-params">eval_pred</span>):
    metric = evaluate.load(<span class="hljs-string">&quot;accuracy&quot;</span>)
    logits, labels = eval_pred
    predictions = logits.argmax(-<span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> metric.compute(predictions=predictions, references=labels)
</code></pre>
<h2 id="النشر-في-الإنتاج">النشر في الإنتاج</h2>
<h3 id="إدارة-إصدارات-النموذج">إدارة إصدارات النموذج</h3>
<p>ثبّت إصدارات محدّدة لضمان قابلية إعادة الإنتاج:</p>
<pre><code class="language-python">model = AutoModelForCausalLM.from_pretrained(
    <span class="hljs-string">&quot;your-model&quot;</span>,
    revision=<span class="hljs-string">&quot;v1.0.0&quot;</span>  <span class="hljs-comment"># Pin specific version</span>
)
</code></pre>
<h3 id="الاستدلال-الآمن">الاستدلال الآمن</h3>
<p>اضبط إعدادات افتراضية حتمية للإنتاج:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">safe_generate</span>(<span class="hljs-params">prompt, model, tokenizer</span>):
    inputs = tokenizer(prompt, return_tensors=<span class="hljs-string">&quot;pt&quot;</span>)

    <span class="hljs-keyword">with</span> torch.no_grad():
        outputs = model.generate(
            inputs.input_ids,
            max_new_tokens=<span class="hljs-number">100</span>,
            temperature=<span class="hljs-number">0.7</span>,  <span class="hljs-comment"># Conservative temperature</span>
            do_sample=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Deterministic</span>
            pad_token_id=tokenizer.eos_token_id
        )

    <span class="hljs-keyword">return</span> tokenizer.decode(outputs[<span class="hljs-number">0</span>], skip_special_tokens=<span class="hljs-literal">True</span>)
</code></pre>
<h2 id="ضبط-المعاملات-الفائقة">ضبط المعاملات الفائقة</h2>
<p>ابدأ بإعدادات افتراضية مُتحقَّق منها، ثم اضبط:</p>
<pre><code class="language-python"><span class="hljs-comment"># Sweep these hyperparameters</span>
learning_rates = [<span class="hljs-number">1e-5</span>, <span class="hljs-number">2e-5</span>, <span class="hljs-number">5e-5</span>]
batch_sizes = [<span class="hljs-number">4</span>, <span class="hljs-number">8</span>, <span class="hljs-number">16</span>]
warmup_ratios = [<span class="hljs-number">0.03</span>, <span class="hljs-number">0.06</span>, <span class="hljs-number">0.1</span>]

<span class="hljs-keyword">for</span> lr <span class="hljs-keyword">in</span> learning_rates:
    <span class="hljs-keyword">for</span> bs <span class="hljs-keyword">in</span> batch_sizes:
        args = TrainingArguments(
            learning_rate=lr,
            per_device_train_batch_size=bs,
            <span class="hljs-comment"># ... other args</span>
        )
        <span class="hljs-comment"># Train and evaluate</span>
</code></pre>
<h2 id="استكشاف-المشكلات-الشائعة-وإصلاحها">استكشاف المشكلات الشائعة وإصلاحها</h2>
<blockquote>
<p><strong>الإفراط في التخصيص</strong></p>
<p>إذا حفظ النموذج بيانات التدريب عن ظهر قلب، فقلّل الحقب، أو زد الإسقاط (dropout)، أو أضف بيانات أكثر تنوّعًا، أو استخدم الإيقاف المبكر.</p>
</blockquote>
<blockquote>
<p><strong>القصور في التخصيص</strong></p>
<p>إذا كان الأداء ضعيفًا، فزد سعة النموذج، أو ارفع معدل التعلّم بحذر، أو حسّن جودة البيانات، أو درّب لحقب أكثر.</p>
</blockquote>
<blockquote>
<p><strong>مشكلات الذاكرة</strong></p>
<p>فعّل نقاط تحقق التدرّج (gradient checkpointing)، أو استخدم أحجام دفعات أصغر، أو طبّق تراكم التدرّج (gradient accumulation)، أو انتقل إلى LoRA/PEFT.</p>
</blockquote>
<h2 id="توسيع-نطاق-التدريب">توسيع نطاق التدريب</h2>
<p>للنماذج أو مجموعات البيانات الأكبر:</p>
<pre><code class="language-python"><span class="hljs-comment"># Use accelerate for multi-GPU</span>
<span class="hljs-keyword">from</span> accelerate <span class="hljs-keyword">import</span> Accelerator

accelerator = Accelerator()
model, optimizer, dataloader = accelerator.prepare(
    model, optimizer, dataloader
)

<span class="hljs-comment"># Or use DeepSpeed for extreme scale</span>
training_args = TrainingArguments(
    deepspeed=<span class="hljs-string">&quot;ds_config.json&quot;</span>,
    <span class="hljs-comment"># ... other args</span>
)
</code></pre>
<h2 id="الأخلاقيات-والسلامة">الأخلاقيات والسلامة</h2>
<p><strong>الترخيص</strong>: احترم تراخيص النموذج الأساسي ومجموعة البيانات. <strong>الخصوصية</strong>: تجنّب التدريب على بيانات حسّاسة دون موافقة. <strong>التحيّز</strong>: قيّم التحيّزات الضارّة وطبّق ضمانات. <strong>إساءة الاستخدام</strong>: ضع في الحسبان إساءة الاستخدام المحتملة وأضف تحذيرات مناسبة.</p>
<h2 id="تقنيات-متقدمة">تقنيات متقدّمة <span class="content-anchor" id="advanced-techniques"></span></h2>
<h3 id="الضبط-الدقيق-القائم-على-الأوامر">الضبط الدقيق القائم على الأوامر</h3>
<p>نسّق البيانات كأزواج من أمر-استجابة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_instruction</span>(<span class="hljs-params">example</span>):
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">f&quot;### Instruction: <span class="hljs-subst">{example[<span class="hljs-string">&#x27;instruction&#x27;</span>]}</span>\\n&quot;</span>
                <span class="hljs-string">f&quot;### Response: <span class="hljs-subst">{example[<span class="hljs-string">&#x27;response&#x27;</span>]}</span>&lt;|endoftext|&gt;&quot;</span>
    }
</code></pre>
<h3 id="الضبط-الدقيق-متعدد-المهام">الضبط الدقيق متعدّد المهام</h3>
<p>درّب على مهام متعدّدة في الوقت نفسه:</p>
<pre><code class="language-python"><span class="hljs-comment"># Combine multiple datasets</span>
combined_dataset = concatenate_datasets([
    dataset1.<span class="hljs-built_in">map</span>(format_task1),
    dataset2.<span class="hljs-built_in">map</span>(format_task2),
    dataset3.<span class="hljs-built_in">map</span>(format_task3)
])
</code></pre>
<h3 id="التعلم-المستمر">التعلّم المستمر</h3>
<p>اضبط النموذج دقيقًا على مهام جديدة دون نسيان المهام القديمة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Use elastic weight consolidation or similar techniques</span>
<span class="hljs-keyword">from</span> peft <span class="hljs-keyword">import</span> TaskType

model = peft.get_peft_model(
    base_model,
    lora_config,
    task_type=TaskType.MULTI_TASK
)
</code></pre>
<h2 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h2>
<p>يحوّل الضبط الدقيق النماذج عامة الغرض إلى أدوات متخصّصة لاحتياجاتك المحدّدة. ويعتمد النجاح على بيانات عالية الجودة، واختيار التقنية المناسبة (الكامل مقابل PEFT)، وضبط المعاملات الفائقة بعناية. ابدأ بـ LoRA للكفاءة، واستخدم واجهة Trainer للبساطة، وقيّم دائمًا على بيانات محجوزة. وبضبط دقيق سليم، يمكنك تحقيق أداء متقدّم في مهمتك المحدّدة مع الاستفادة من المعرفة المُضمَّنة في النماذج المُدرَّبة مسبقًا.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://huggingface.co/docs/transformers/main/en/main_classes/trainer">Transformers — Trainer</a></li>
<li><a href="https://huggingface.co/learn/nlp-course/chapter3/1?fw=pt">دورة Hugging Face — الضبط الدقيق</a></li>
<li><a href="https://github.com/huggingface/peft">PEFT (الضبط الدقيق الفعّال من حيث المعاملات)</a></li>
<li><a href="https://huggingface.co/docs/accelerate/index">Accelerate</a></li>
<li><a href="https://www.deepspeed.ai/">DeepSpeed</a></li>
<li><a href="https://arxiv.org/abs/2106.09685">ورقة LoRA (Hu وآخرون، 2021)</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
