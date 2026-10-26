const n="kinney",s="python-ai",t="أساسيات الذكاء الاصطناعي بلغة Python",e="attention-mechanism",a="آلية الانتباه",o=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"الدفتر",text:"الدفتر"},{depth:2,id:"من-تضمينات-الكلمات-إلى-الفهم-السياقي",text:"من تضمينات الكلمات إلى الفهم السياقي"},{depth:2,id:"الاستعلامات-والمفاتيح-والقيم",text:"الاستعلامات والمفاتيح والقيم"},{depth:3,id:"تشبيه-المكتبة",text:"تشبيه المكتبة"},{depth:2,id:"تصوير-الانتباه-بالشيفرة",text:"تصوير الانتباه بالشيفرة"},{depth:2,id:"ميكانيكا-الانتباه",text:"ميكانيكا الانتباه"},{depth:2,id:"الانتباه-متعدد-الرؤوس",text:"الانتباه متعدد الرؤوس"},{depth:2,id:"استراتيجيات-الإخفاء-masking",text:"استراتيجيات الإخفاء (Masking)"},{depth:2,id:"معلومات-المواضع",text:"معلومات المواضع"},{depth:2,id:"التعقيد-والأداء",text:"التعقيد والأداء"},{depth:2,id:"الأشكال-والتنفيذ",text:"الأشكال والتنفيذ"},{depth:2,id:"الانتباه-السببي-مقابل-ثنائي-الاتجاه-مقابل-المتقاطع",text:"الانتباه السببي مقابل ثنائي الاتجاه مقابل المتقاطع"},{depth:2,id:"فحص-الانتباه-وتصحيحه",text:"فحص الانتباه وتصحيحه"},{depth:2,id:"اعتبارات-عملية",text:"اعتبارات عملية"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<blockquote>
<p><strong>الخلاصات الأساسية</strong></p>
<ul>
<li>يبني الانتباه الذاتي السياق عبر إسقاطات Q/K/V وsoftmax لمضروب النقاط المُقيس</li>
<li>يلتقط الانتباه متعدد الرؤوس أنماطًا متنوعة؛ وتضيف الوصلات المتبقية والشبكات MLP عمقًا</li>
<li>تتيح الأقنعة السببية التوليد؛ وتمكّن الأقنعة ثنائية الاتجاه مهام الفهم</li>
<li>تحقن ترميزات المواضع (sinusoidal/learned/RoPE/ALiBi) معلومة الترتيب</li>
<li>الانتباه من الرتبة O(T²)؛ استخدم نوى مُحسَّنة واستراتيجيات السياق الطويل عند الحاجة</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>يتيح الانتباه للنماذج موازنة العلاقات بين الرموز لبناء تمثيلات واعية بالسياق. فحين تقرأ «The cat sat on the mat»، يعرف دماغك فورًا أن «sat» مرتبطة بـ«cat» (الفاعل الذي جلس) وبـ«mat» (المكان الذي جلس عليه). وتمنح آلية الانتباه النماذج القدرة نفسها على فهم العلاقات بين الكلمات، مهما تباعدت.</p>
<h2 id="الدفتر">الدفتر</h2>
<p>اطّلع على الدفتر المرافق: <a href="https://colab.research.google.com/drive/1m9LFBM2Ncl_k-wMHUYJ-7ltxyhLpM7Br?usp=sharing">آلية الانتباه</a></p>
<h2 id="من-تضمينات-الكلمات-إلى-الفهم-السياقي">من تضمينات الكلمات إلى الفهم السياقي</h2>
<p>قبل الانتباه، يُسقَط كل رمز إلى تضمين متجهي كثيف يمثّل معنى الكلمة في فضاء متعدد الأبعاد. والمشكلة أن تضمين «bank» يكون متطابقًا في البداية سواء ورد في «river bank» أو «money bank». ويحل الانتباه ذلك بأن يأخذ هذه التضمينات الخالية من السياق ويغنيها بمعلومات من كل الكلمات الأخرى في الجملة.</p>
<p>تبدأ العملية بالترميز (tokenization)، حيث يتحوّل النص إلى معرّفات رموز:</p>
<pre><code class="language-python"><span class="hljs-string">&quot;The cat sat&quot;</span> → [<span class="hljs-number">101</span>, <span class="hljs-number">1996</span>, <span class="hljs-number">4937</span>, <span class="hljs-number">3323</span>, <span class="hljs-number">102</span>]
</code></pre>
<p>تُسقَط هذه المعرّفات إلى تضمينات، لكنها بلا سياق تفتقر إلى الدقة اللازمة للفهم. وهنا يحوّل الانتباه التضمينات الساكنة إلى تمثيلات ديناميكية واعية بالسياق.</p>
<h2 id="الاستعلامات-والمفاتيح-والقيم">الاستعلامات والمفاتيح والقيم</h2>
<p>تنشئ آلية الانتباه ثلاثة متجهات خاصة لكل تضمين كلمة:</p>
<p><strong>الاستعلام (Q)</strong> يمثّل ما تبحث عنه الكلمة الحالية. و<strong>المفتاح (K)</strong> يمثّل ما تقدّمه كل كلمة. و<strong>القيمة (V)</strong> تحوي المعلومة الفعلية التي تسهم بها كل كلمة.</p>
<h3 id="تشبيه-المكتبة">تشبيه المكتبة</h3>
<p>تخيّل أنك تبحث عن «الذكاء الاصطناعي» في مكتبة. استعلامك هو موضوع بحثك. تذهب إلى فهرس البطاقات حيث يعمل عنوان كل كتاب كمفتاح. وتقارن استعلامك بكل مفتاح للعثور على تطابقات. فكتاب بعنوان «تاريخ الذكاء الاصطناعي» يتطابق بقوة، بينما «البستنة» تتطابق بضعف. ومحتويات الكتب هي القيم. فتنتقي أفضل الكتب تطابقًا (أعلى درجات الانتباه) وتمزج معلوماتها لفهم غني ومرتبط بالسياق.</p>
<p>تنفّذ آلية الانتباه هذه العملية لكل كلمة في المدخل، ما يتيح للنموذج أن يتعلّم أي الكلمات الأخرى أهم لفهم معنى كل كلمة في ذلك السياق تحديدًا.</p>
<h2 id="تصوير-الانتباه-بالشيفرة">تصوير الانتباه بالشيفرة</h2>
<p>لنرَ الانتباه أثناء عمله باستخدام BERT ومكتبة bertviz:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> AutoTokenizer, AutoModel
<span class="hljs-keyword">from</span> bertviz <span class="hljs-keyword">import</span> head_view

model_name = <span class="hljs-string">&quot;bert-base-uncased&quot;</span>
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name, output_attentions=<span class="hljs-literal">True</span>)

sentence_a = <span class="hljs-string">&quot;The cat sat on the mat&quot;</span>
sentence_b = <span class="hljs-string">&quot;The dog played in the park&quot;</span>

<span class="hljs-comment"># Tokenize and get model outputs</span>
inputs = tokenizer(sentence_a, sentence_b, return_tensors=<span class="hljs-string">&#x27;pt&#x27;</span>)
outputs = model(**inputs)
attention = outputs[-<span class="hljs-number">1</span>]  <span class="hljs-comment"># The attention scores</span>

<span class="hljs-comment"># Visualize the attention patterns</span>
head_view(attention, tokens=tokenizer.convert_ids_to_tokens(inputs[<span class="hljs-string">&#x27;input_ids&#x27;</span>][<span class="hljs-number">0</span>]))
</code></pre>
<p>يكشف التصوير روابط قوية بين الكلمات المترابطة: <code>cat</code> تتصل بـ<code>sat</code> و<code>mat</code>، بينما <code>dog</code> تتصل بـ<code>played</code> و<code>park</code>. ويتعلّم النموذج إبقاء الجملتين منفصلتين بفضل الرمز <code>[SEP]</code>.</p>
<h2 id="ميكانيكا-الانتباه">ميكانيكا الانتباه</h2>
<p>يتضمّن الحساب الأساسي إسقاط المدخلات إلى استعلامات ومفاتيح وقيم عبر تحويلات خطية متعلَّمة. وصيغة الانتباه بمضروب النقاط المُقيس هي:</p>
<pre><code>Attention(Q, K, V) = softmax(QK^T / √d_k) V
</code></pre>
<p>يمنع عامل القياس <code>√d_k</code> مضاريب النقاط من النمو إلى حدّ كبير، وهو ما قد يجعل softmax يتشبّع. وبعد الانتباه، تمرّ المخرجات عبر وصلات متبقية وشبكات تغذية أمامية لمزيد من العمق واللاخطية.</p>
<h2 id="الانتباه-متعدد-الرؤوس">الانتباه متعدد الرؤوس</h2>
<p>بدلًا من حساب الانتباه مرة واحدة، يُجري الانتباه متعدد الرؤوس عدة عمليات انتباه على التوازي، لكل منها إسقاطات متعلَّمة مختلفة. وهذا يتيح للنموذج أن ينتبه معًا إلى معلومات من فضاءات تمثيل مختلفة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Conceptually, for H heads:</span>
<span class="hljs-keyword">for</span> head <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(H):
    Q_h = Linear_Q[head](X)
    K_h = Linear_K[head](X)
    V_h = Linear_V[head](X)
    head_output[head] = Attention(Q_h, K_h, V_h)

output = Concat(head_outputs) @ W_O
</code></pre>
<p>تتعلّم الرؤوس المختلفة أنواعًا مختلفة من العلاقات. فقد يركّز بعضها على الأنماط النحوية، وآخر على العلاقات الدلالية، وآخر على معلومات المواضع.</p>
<h2 id="استراتيجيات-الإخفاء-masking">استراتيجيات الإخفاء (Masking)</h2>
<p>يتحكّم الإخفاء في الرموز التي يمكن لكل رمز أن ينتبه إليها:</p>
<p><strong>قناع الحشو</strong> يمنع الانتباه إلى الرموز المحشوّة في المتتاليات المجمّعة في دفعات. و<strong>القناع السببي</strong> يضمن ألا يرى الرمز t الرموز المستقبلية (t+1، t+2، …)، وهو أمر جوهري لفاكّات الترميز الانحدارية التلقائية. و<strong>الانتباه ثنائي الاتجاه</strong> يتيح للرموز الانتباه بحرية في الاتجاهين، ويُستخدم في نماذج المشفّرات لمهام الفهم.</p>
<p>يُنفَّذ القناع السببي بوضع المواضع المستقبلية عند سالب ما لا نهاية قبل تطبيق softmax:</p>
<pre><code class="language-python"><span class="hljs-comment"># Create a causal mask</span>
mask = torch.triu(torch.ones(seq_len, seq_len) * -inf, diagonal=<span class="hljs-number">1</span>)
scores = (Q @ K.T) / sqrt(d_k) + mask
attention_weights = softmax(scores)
</code></pre>
<h2 id="معلومات-المواضع">معلومات المواضع</h2>
<p>الانتباه الذاتي المحض ثابت تحت التبديل، أي أنه يتعامل مع المتتاليات كمجموعات بلا ترتيب. وتحقن ترميزات المواضع معلومة الترتيب:</p>
<p><strong>الترميزات الجيبية</strong> تستخدم دالتي الجيب والجيب التمام بترددات مختلفة. و<strong>التضمينات المتعلَّمة</strong> تتعامل مع المواضع كمعاملات قابلة للتعلّم. و<strong>تضمينات المواضع الدورانية (RoPE)</strong> تُدوّر درجات الانتباه بناءً على المواضع النسبية. و<strong>ALiBi</strong> تضيف تحيّزات خطية إلى درجات الانتباه بناءً على المسافة.</p>
<p>للمتتاليات الطويلة، تشمل الاستراتيجيات النوافذ المنزلقة (الانتباه فقط إلى الرموز القريبة)، والأنماط الموسّعة (تخطّي رموز على فواصل منتظمة)، والتقطيع مع التداخل للحفاظ على السياق.</p>
<h2 id="التعقيد-والأداء">التعقيد والأداء</h2>
<p>التعقيد في الانتباه الأساسي هو O(n²) بالنسبة لطول المتتالية، ما يجعل الذاكرة والزمن ينموان تربيعيًا. ويصبح هذا باهظًا للمتتاليات الطويلة.</p>
<p>تشمل التحسينات <strong>FlashAttention</strong>، الذي يدمج العمليات ويتجنّب تجسيد مصفوفة الانتباه كاملة. و<strong>الانتباه المتناثر</strong> يقلّل عدد أزواج الرموز المدروسة. وتحقّق <strong>تقريبات الانتباه الخطي</strong> تعقيد O(n) عبر حيل النوى.</p>
<p>عند التنفيذ، استخدم الدقة المختلطة (fp16/bf16) والنوى المُحسَّنة. وراقب ذروة استهلاك الذاكرة وفكّر في نقاط التفتيش التدرّجية (gradient checkpointing) أثناء التدريب للمتتاليات الأطول.</p>
<h2 id="الأشكال-والتنفيذ">الأشكال والتنفيذ</h2>
<p>بإعطاء متتالية مدخل X بشكل <code>[B, T, D]</code>، تنتج الإسقاطات الخطية Q وK وV بالأبعاد نفسها. وفي الانتباه متعدد الرؤوس بعدد H من الرؤوس، يُقسَم البعد D: <code>[B, H, T, D_h]</code> حيث <code>D_h = D/H</code>.</p>
<p>يحافظ حساب الانتباه على هذه الأشكال:</p>
<pre><code class="language-python"><span class="hljs-comment"># Shapes during attention computation</span>
Q: [B, H, T, D_h]
K: [B, H, T, D_h]
V: [B, H, T, D_h]
scores: [B, H, T, T]  <span class="hljs-comment"># After Q @ K.T</span>
weights: [B, H, T, T]  <span class="hljs-comment"># After softmax</span>
output: [B, H, T, D_h]  <span class="hljs-comment"># After weights @ V</span>
final: [B, T, D]  <span class="hljs-comment"># After concatenation and projection</span>
</code></pre>
<h2 id="الانتباه-السببي-مقابل-ثنائي-الاتجاه-مقابل-المتقاطع">الانتباه السببي مقابل ثنائي الاتجاه مقابل المتقاطع</h2>
<p><strong>الانتباه السببي</strong> يقيّد كل موضع بالانتباه إلى نفسه والرموز السابقة فقط، وهو جوهري لنماذج اللغة المعتمدة على المفكّك فقط التي تولّد النص من اليسار إلى اليمين.</p>
<p><strong>الانتباه ثنائي الاتجاه</strong> يتيح لكل رمز رؤية المتتالية كاملة، وهو معتاد في مكدّسات المشفّرات في مهام الفهم مثل BERT.</p>
<p><strong>الانتباه المتقاطع</strong> ينتبه من متتالية (المفكّك) إلى أخرى (مخرجات المشفّر)، وهو حاسم في نماذج متتالية-إلى-متتالية للترجمة أو في النماذج متعددة الوسائط التي تربط النص بالصور.</p>
<h2 id="فحص-الانتباه-وتصحيحه">فحص الانتباه وتصحيحه</h2>
<p>مع أن خرائط الانتباه توفّر بعض قابلية التفسير، فإنها لا تفسّر تفكير النموذج تفسيرًا كاملًا. ومع ذلك، يمكن للتصوير أن يكشف الأنماط المتعلَّمة:</p>
<p><strong>رؤوس الاستقراء</strong> تتعلّم نسخ الأنماط أو متابعتها. و<strong>الرؤوس الموضعية</strong> تركّز على مواضع نسبية محدّدة. و<strong>الرؤوس النحوية</strong> تتحاذى مع البنى النحوية. و<strong>الرؤوس الدلالية</strong> تربط المفاهيم المترابطة.</p>
<p>استخدم تصوير الانتباه لتصحيح مشكلات الإخفاء أو ترميز المواضع أو أنماط التركيز غير المتوقعة. وأدوات مثل bertviz تجعل هذا التحليل سهلًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> bertviz <span class="hljs-keyword">import</span> model_view

<span class="hljs-comment"># Show attention across all layers and heads</span>
model_view(attention, tokens, html_action=<span class="hljs-string">&#x27;return&#x27;</span>)
</code></pre>
<h2 id="اعتبارات-عملية">اعتبارات عملية</h2>
<p>عند العمل مع الانتباه، وازن حجم النموذج مع الذاكرة المتاحة. وابدأ بنماذج مُدرَّبة مسبقًا لديها بالفعل أنماط انتباه متعلَّمة. وفي التنفيذات المخصّصة، تحقّق بعناية من الإخفاء واستخدم المكتبات الراسخة حيث أمكن.</p>
<p>غيّرت آلية الانتباه جذريًا طريقة معالجة النماذج للمتتاليات، إذ مكّنتها من التقاط اعتماديات بعيدة المدى وعلاقات معقّدة. وفهم الانتباه مفتاح لفهم نماذج المحوّلات الحديثة وقدراتها اللافتة في فهم اللغة وتوليدها.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li>الانتباه هو كل ما تحتاجه (Vaswani وآخرون، 2017): <a href="https://arxiv.org/abs/1706.03762">https://arxiv.org/abs/1706.03762</a></li>
<li>FlashAttention (Tri Dao وآخرون): <a href="https://arxiv.org/abs/2205.14135">https://arxiv.org/abs/2205.14135</a></li>
<li>تضمين المواضع الدوراني (RoPE): <a href="https://arxiv.org/abs/2104.09864">https://arxiv.org/abs/2104.09864</a></li>
<li>ALiBi (الانتباه بتحيّزات خطية): <a href="https://arxiv.org/abs/2108.12409">https://arxiv.org/abs/2108.12409</a></li>
<li>مسح للمحوّلات الفعّالة: <a href="https://arxiv.org/abs/2009.06732">https://arxiv.org/abs/2009.06732</a></li>
</ul>
`,r={book:n,chapter:s,chapterTitle:t,slug:e,title:a,headings:o,html:p};export{n as book,s as chapter,t as chapterTitle,r as default,o as headings,p as html,e as slug,a as title};
