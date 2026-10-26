const n="kinney",s="python-ai",e="أساسيات الذكاء الاصطناعي بلغة Python",a="image-generation",t="توليد الصور من النص (Stable Diffusion)",p=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"دفتر-الملاحظات",text:"دفتر الملاحظات"},{depth:2,id:"تهيئة-stable-diffusion",text:"تهيئة Stable Diffusion"},{depth:2,id:"توليد-صورتك-الأولى",text:"توليد صورتك الأولى"},{depth:2,id:"مكونات-البنية",text:"مكوّنات البنية"},{depth:2,id:"فهم-نماذج-الانتشار",text:"فهم نماذج الانتشار"},{depth:2,id:"المعاملات-الرئيسية",text:"المعاملات الرئيسية"},{depth:3,id:"الجودة-مقابل-السرعة",text:"الجودة مقابل السرعة"},{depth:3,id:"فهم-المولد",text:"فهم المولّد"},{depth:2,id:"هندسة-الأوامر",text:"هندسة الأوامر"},{depth:2,id:"الأوامر-السلبية",text:"الأوامر السلبية"},{depth:2,id:"المجدولات-ومقايضاتها",text:"المجدولات ومقايضاتها"},{depth:2,id:"تحسينات-الذاكرة",text:"تحسينات الذاكرة"},{depth:3,id:"تقطيع-الانتباه",text:"تقطيع الانتباه"},{depth:3,id:"تحسينات-إضافية",text:"تحسينات إضافية"},{depth:2,id:"متغيرات-النموذج",text:"متغيّرات النموذج"},{depth:2,id:"التوجيه-بلا-مصنف-cfg",text:"التوجيه بلا مصنّف (CFG)"},{depth:2,id:"الدقة-ونسب-الأبعاد",text:"الدقة ونسب الأبعاد"},{depth:2,id:"السلامة-والأخلاقيات",text:"السلامة والأخلاقيات"},{depth:2,id:"اعتبارات-العتاد",text:"اعتبارات العتاد"},{depth:3,id:"إعدادات-cuda",text:"إعدادات CUDA"},{depth:3,id:"التوليد-بالدفعات",text:"التوليد بالدفعات"},{depth:2,id:"قابلية-إعادة-الإنتاج-والبذور",text:"قابلية إعادة الإنتاج والبذور"},{depth:2,id:"استكشاف-المشكلات-الشائعة-وإصلاحها",text:"استكشاف المشكلات الشائعة وإصلاحها"},{depth:2,id:"تقنيات-متقدمة",text:"تقنيات متقدّمة"},{depth:3,id:"ترجيح-الأوامر",text:"ترجيح الأوامر"},{depth:3,id:"دمج-نقاط-التحقق",text:"دمج نقاط التحقق"},{depth:2,id:"الخاتمة",text:"الخاتمة"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<blockquote>
<p><strong>أهم الاستنتاجات</strong></p>
<ul>
<li>يزيل Stable Diffusion التشويش من الكوامن (latents) المشروطة بالنص؛ ويفكّ VAE ترميزها إلى بكسلات</li>
<li>يوازن التوجيه بلا مصنّف (classifier-free) بين الالتزام بالأوامر والواقعية (اضبط CFG)</li>
<li>تقايض المجدولات (schedulers) بين السرعة والتفاصيل؛ وعدد الخطوات يتفاعل مع اختيار المجدول</li>
<li>استخدم دقّات كامنة صالحة (مضاعفات)، وصُغ أوامر إيجابية/سلبية، واضبط البذور (seeds)</li>
<li>حسّن الذاكرة: انتباه فعّال، والتقطيع (slicing)، وصيغة channels-last، والدقة المختلطة</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>يولّد Stable Diffusion الصور من النص باستخدام عملية انتشار كامنة (latent diffusion) يوجّهها مُرمِّز نصي وشبكة UNet لإزالة التشويش. وخلافًا لنماذج التصنيف التي تحلّل صورًا موجودة، تُنشئ نماذج الانتشار صورًا جديدة من الضوضاء.</p>
<p>فكّر في Stable Diffusion ككتاب تلوين سحري فائق الذكاء: تهمس له بالصورة التي تريدها—قل مثلًا «ديناصور أرجواني يأكل مثلجات على سطح القمر»—فيبدأ كتاب التلوين بصفحة مغطاة بخربشات عبثية (مجرد نقاط عشوائية). ثم، وكأن ممحاة وقلم تلوين يعملان معًا، يظل يمسح النقاط الفوضوية بلطف ويضيف الألوان والأشكال الصحيحة شيئًا فشيئًا، وهو يصغي إلى كلماتك طوال الوقت، حتى تتحول الفوضى العشوائية إلى الصورة التي طلبتها بالضبط.</p>
<h2 id="دفتر-الملاحظات">دفتر الملاحظات</h2>
<p>اطّلع على دفتر الملاحظات المرافق: <a href="https://colab.research.google.com/drive/15s90EDiGZCFqhkc54bV6lAenLqmevTD3?usp=sharing">توليد الصور</a></p>
<h2 id="تهيئة-stable-diffusion">تهيئة Stable Diffusion</h2>
<p>أولًا، ثبّت الاعتمادات اللازمة واستوردها:</p>
<pre><code class="language-python"><span class="hljs-comment"># Install dependencies</span>
!pip install --quiet <span class="hljs-string">&quot;diffusers[torch]&quot;</span> transformers accelerate safetensors

<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> diffusers <span class="hljs-keyword">import</span> AutoPipelineForText2Image, DPMSolverMultistepScheduler

<span class="hljs-comment"># Set up device and generator for reproducibility</span>
device = <span class="hljs-string">&quot;cuda&quot;</span> <span class="hljs-keyword">if</span> torch.cuda.is_available() <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;cpu&quot;</span>
generator = torch.Generator(device).manual_seed(<span class="hljs-number">1337</span>)
</code></pre>
<h2 id="توليد-صورتك-الأولى">توليد صورتك الأولى</h2>
<p>حمّل نموذج Stable Diffusion وولّد صورة:</p>
<pre><code class="language-python">model_id = <span class="hljs-string">&quot;stable-diffusion-v1-5/stable-diffusion-v1-5&quot;</span>

pipeline = AutoPipelineForText2Image.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    use_safetensors=<span class="hljs-literal">True</span>,
    low_cpu_mem_usage=<span class="hljs-literal">True</span>
).to(device)

<span class="hljs-comment"># Swap to a faster scheduler</span>
pipeline.scheduler = DPMSolverMultistepScheduler.from_config(
    pipeline.scheduler.config
)

<span class="hljs-comment"># Memory-saving optimizations</span>
pipeline.enable_attention_slicing()    <span class="hljs-comment"># Chunk cross-attention</span>
pipeline.enable_vae_slicing()          <span class="hljs-comment"># Same for VAE decoder</span>
pipeline.enable_model_cpu_offload()    <span class="hljs-comment"># Swap idle layers to CPU</span>

prompt = <span class="hljs-string">&quot;A pygmy hippo in New York City watching Instagram on an iPhone&quot;</span>

image = pipeline(
    prompt,
    num_inference_steps=<span class="hljs-number">50</span>,
    guidance_scale=<span class="hljs-number">7.5</span>,
    generator=generator,
).images[<span class="hljs-number">0</span>]

image
</code></pre>
<h2 id="مكونات-البنية">مكوّنات البنية</h2>
<p>يتكوّن Stable Diffusion من أربعة مكوّنات رئيسية تعمل معًا:</p>
<p><strong>المُرمِّز النصي</strong> (Text Encoder) وهو CLIP، ويحوّل أمرك إلى تمثيلات متجهية (embeddings) تشترط عمل مزيل التشويش. وهو يفهم المعنى الدلالي لكلماتك.</p>
<p><strong>مزيل التشويش UNet</strong> هو النحّات الذي يتوقّع الضوضاء ويزيلها مرارًا عند كل خطوة انتشار. وهو شبكة عصبية مُدرَّبة على تحويل الضوضاء العشوائية تدريجيًا إلى صور ذات معنى بناءً على التوجيه النصي.</p>
<p><strong>VAE (المُرمِّز التلقائي التغايري)</strong> يترجم بين فضاء البكسل وفضاء الكوامن. يضغط المُرمِّز الصور إلى تمثيلات كامنة أصغر للمعالجة بكفاءة، بينما يعيد المفكّك بناء صور كاملة الدقة من الكوامن.</p>
<p><strong>المجدول</strong> (Scheduler) يتحكّم في جدول الضوضاء وقاعدة التحديث. وتقدّم المجدولات المختلفة (DDIM، Euler، DPM++) مقايضات بين السرعة والجودة.</p>
<h2 id="فهم-نماذج-الانتشار">فهم نماذج الانتشار</h2>
<p>تُنشئ نماذج الانتشار الصور بإزالة الضوضاء تدريجيًا من أنماط عشوائية:</p>
<p><strong>العملية الأمامية</strong>: خذ صورة واضحة وأضف إليها الضوضاء تدريجيًا حتى تصبح ضوضاء عشوائية خالصة.</p>
<p><strong>العملية العكسية</strong>: درّب نموذجًا على عكس ذلك—ابدأ بالضوضاء وأزلها تدريجيًا لإنشاء صورة.</p>
<p>سُمّيت شبكة U-Net بهذا الاسم بسبب معماريتها على شكل حرف U: فلديها مسار لتقليل الدقة (يحلّل الصورة المشوّشة على مقاييس متعدّدة)، وعنق زجاجة (يفهم السياق الكلي)، ومسار لزيادة الدقة (يعيد بناء الصورة محسّنًا إياها خطوة بخطوة).</p>
<h2 id="المعاملات-الرئيسية">المعاملات الرئيسية</h2>
<h3 id="الجودة-مقابل-السرعة">الجودة مقابل السرعة</h3>
<p>تحكّم في المقايضة بين جودة التوليد والسرعة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Fewer steps = faster, lower quality</span>
quick_image = pipeline(prompt, num_inference_steps=<span class="hljs-number">10</span>)

<span class="hljs-comment"># More steps = slower, higher quality</span>
quality_image = pipeline(prompt, num_inference_steps=<span class="hljs-number">50</span>)

<span class="hljs-comment"># Guidance scale controls prompt adherence</span>
creative_image = pipeline(prompt, guidance_scale=<span class="hljs-number">3.0</span>)   <span class="hljs-comment"># More creative</span>
strict_image = pipeline(prompt, guidance_scale=<span class="hljs-number">15.0</span>)    <span class="hljs-comment"># Stricter to prompt</span>
</code></pre>
<p><strong><code>num_inference_steps</code></strong>: من 10 إلى 50 خطوة، والأقل أسرع. <strong><code>guidance_scale</code></strong>: من 1 إلى 15، والأعلى يعني وفاءً أكبر للنص لكن قد يكون أكثر تصلّبًا. <strong><code>width/height</code></strong>: التزم بمضاعفات 64؛ فالأحجام الأكبر تحتاج VRAM أكثر.</p>
<h3 id="فهم-المولد">فهم المولّد</h3>
<p>يوفّر المولّد عشوائية قابلة لإعادة الإنتاج:</p>
<pre><code class="language-python"><span class="hljs-comment"># Creates a random number generator on your GPU/CPU</span>
generator = torch.Generator(device).manual_seed(<span class="hljs-number">1337</span>)

<span class="hljs-comment"># Same seed = same initial noise = same final image</span>
<span class="hljs-comment"># Different seed = different image</span>
</code></pre>
<p>مرّر هذا المولّد إلى الأنبوب (pipeline) للحصول على نتائج متطابقة عبر التشغيلات. واحذف البذرة أو غيّرها للحصول على تنوّع.</p>
<h2 id="هندسة-الأوامر">هندسة الأوامر</h2>
<p>تعتمد جودة الصور المولَّدة اعتمادًا كبيرًا على طريقة كتابتك للأوامر. ويتضمّن الأمر الجيد عادةً:</p>
<ol>
<li><strong>الموضوع</strong>: ما أو مَن في الصورة</li>
<li><strong>الأسلوب</strong>: الطراز الفني أو الوسيط أو التقنية</li>
<li><strong>محدّدات الجودة</strong>: كلمات تعزّز الجودة</li>
<li><strong>الإضاءة</strong>: كيفية إضاءة المشهد</li>
<li><strong>التكوين</strong>: زاوية الكاميرا والتأطير</li>
<li><strong>التفاصيل</strong>: صفات أو خصائص محدّدة</li>
</ol>
<pre><code class="language-python"><span class="hljs-comment"># Basic prompt</span>
basic_prompt = <span class="hljs-string">&quot;a cat&quot;</span>

<span class="hljs-comment"># Detailed prompt</span>
detailed_prompt = <span class="hljs-string">&quot;&quot;&quot;
Ultra-realistic cinematic photo of a fluffy Persian cat sitting on a vintage
velvet armchair, golden hour lighting streaming through Victorian windows,
85mm lens, shallow depth of field, shot on Kodak Portra 400, 8K resolution
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Generate with both</span>
basic_image = pipeline(basic_prompt).images[<span class="hljs-number">0</span>]
detailed_image = pipeline(detailed_prompt).images[<span class="hljs-number">0</span>]
</code></pre>
<h2 id="الأوامر-السلبية">الأوامر السلبية</h2>
<p>تخبر الأوامر السلبية النموذج بما يجب تجنّبه. ففي التوجيه بلا مصنّف، يزيل النموذج التشويش مرتين عند كل خطوة—مرة بأمرك الإيجابي ومرة بأمر غير مشروط. ويحلّ الأمر السلبي محلّ ذلك الأمر غير المشروط الفارغ، فيبعد النموذج بنشاط عن المفاهيم غير المرغوبة:</p>
<pre><code class="language-python">model_id = <span class="hljs-string">&quot;stabilityai/stable-diffusion-xl-base-1.0&quot;</span>

pipeline = AutoPipelineForText2Image.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    use_safetensors=<span class="hljs-literal">True</span>,
).to(device)

pipeline.scheduler = DPMSolverMultistepScheduler.from_config(
    pipeline.scheduler.config
)
pipeline.enable_attention_slicing()

<span class="hljs-comment"># Positive prompt - what you want</span>
prompt = (
    <span class="hljs-string">&quot;Ultra-realistic cinematic photo of a pygmy hippo jaywalking through &quot;</span>
    <span class="hljs-string">&quot;a neon-lit downtown street at dusk, rain-soaked asphalt reflecting &quot;</span>
    <span class="hljs-string">&quot;colored lights, 85mm lens, f/1.4 bokeh, dramatic rim lighting, &quot;</span>
    <span class="hljs-string">&quot;shot on Kodak Portra 800, 8K resolution&quot;</span>
)

<span class="hljs-comment"># Negative prompt - what to avoid</span>
negative_prompt = (
    <span class="hljs-string">&quot;blurry, grainy, lowres, overexposed, watermark, text, logo, &quot;</span>
    <span class="hljs-string">&quot;extra limbs, cars, people, distorted anatomy, jpeg artifacts&quot;</span>
)

image = pipeline(
    prompt=prompt,
    negative_prompt=negative_prompt,
    num_inference_steps=<span class="hljs-number">28</span>,
    guidance_scale=<span class="hljs-number">7.0</span>,
    width=<span class="hljs-number">512</span>,
    height=<span class="hljs-number">512</span>,
    generator=generator,
).images[<span class="hljs-number">0</span>]
</code></pre>
<p>الأثر الرياضي هو أن النموذج يبتعد بنشاط عن المفاهيم الواردة في الأمر السلبي، ما يقلّل التشوهات والعناصر غير المرغوبة.</p>
<h2 id="المجدولات-ومقايضاتها">المجدولات ومقايضاتها</h2>
<p>تقدّم المجدولات المختلفة مزايا مختلفة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> diffusers <span class="hljs-keyword">import</span> (
    DDIMScheduler,
    EulerDiscreteScheduler,
    DPMSolverMultistepScheduler,
    HeunDiscreteScheduler
)

<span class="hljs-comment"># DPMSolverMultistep - Fast and high quality</span>
pipeline.scheduler = DPMSolverMultistepScheduler.from_config(
    pipeline.scheduler.config
)

<span class="hljs-comment"># Euler - Good for artistic styles</span>
pipeline.scheduler = EulerDiscreteScheduler.from_config(
    pipeline.scheduler.config
)

<span class="hljs-comment"># DDIM - Deterministic, good for reproducibility</span>
pipeline.scheduler = DDIMScheduler.from_config(
    pipeline.scheduler.config
)
</code></pre>
<p><strong>DPMSolverMultistep</strong> يشبه امتلاك كتيّب تعليمات ذكي يجد طرقًا مختصرة، فيُظهر الصور أسرع دون فقدان الجودة. <strong>Euler/Euler A</strong> غالبًا ما يمنح تفاصيل حادّة. <strong>DDIM</strong> يمكن أن يكون أسرع بخطوات أقل. <strong>متغيّرات DPM++</strong> تقدّم تفاصيل جيدة واستقرارًا.</p>
<h2 id="تحسينات-الذاكرة">تحسينات الذاكرة</h2>
<h3 id="تقطيع-الانتباه">تقطيع الانتباه</h3>
<p>يعالج تقطيع الانتباه الصورة على شكل أجزاء أصغر بدلًا من معالجتها كلها دفعة واحدة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Instead of processing the whole image at once</span>
pipeline.enable_attention_slicing()

<span class="hljs-comment"># The model looks at one small chunk at a time</span>
<span class="hljs-comment"># Like coloring one square of a grid at a time</span>
</code></pre>
<p>وهذا يمنع نفاد ذاكرة GPU لديك مع بناء الصورة الكاملة رغم ذلك.</p>
<h3 id="تحسينات-إضافية">تحسينات إضافية</h3>
<pre><code class="language-python"><span class="hljs-comment"># VAE slicing - process VAE in chunks</span>
pipeline.enable_vae_slicing()

<span class="hljs-comment"># CPU offloading - swap unused layers to CPU</span>
pipeline.enable_model_cpu_offload()

<span class="hljs-comment"># Channels-last memory format for CUDA</span>
pipeline.unet.to(memory_format=torch.channels_last)

<span class="hljs-comment"># Mixed precision with autocast</span>
<span class="hljs-keyword">with</span> torch.autocast(<span class="hljs-string">&quot;cuda&quot;</span>):
    image = pipeline(prompt).images[<span class="hljs-number">0</span>]
</code></pre>
<h2 id="متغيرات-النموذج">متغيّرات النموذج</h2>
<p>تقدّم النماذج المختلفة نقاط قوة مختلفة:</p>
<ul>
<li><strong><code>runwayml/stable-diffusion-v1-5</code></strong>: الإصدار الكلاسيكي SD 1.5—سريع ومتعدّد الاستخدامات</li>
<li><strong><code>stabilityai/stable-diffusion-2-1</code></strong>: الإصدار SD 2.1—وجوه أفضل ودقة أعلى</li>
<li><strong><code>stabilityai/stable-diffusion-xl-base-1.0</code></strong>: الإصدار SDXL—أعلى جودة لكن أبطأ</li>
<li><strong><code>prompthero/openjourney</code></strong>: بأسلوب Midjourney</li>
<li><strong><code>hakurei/waifu-diffusion</code></strong>: بأسلوب الأنمي</li>
<li><strong><code>nitrosocke/Ghibli-Diffusion</code></strong>: بأسلوب استوديو Ghibli</li>
</ul>
<pre><code class="language-python"><span class="hljs-comment"># Load a specialized model</span>
anime_pipeline = AutoPipelineForText2Image.from_pretrained(
    <span class="hljs-string">&quot;hakurei/waifu-diffusion&quot;</span>,
    torch_dtype=torch.float16
).to(device)

anime_image = anime_pipeline(
    <span class="hljs-string">&quot;anime girl with blue hair in cherry blossom garden&quot;</span>,
    num_inference_steps=<span class="hljs-number">30</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<h2 id="التوجيه-بلا-مصنف-cfg">التوجيه بلا مصنّف (CFG)</h2>
<p>يضخّم CFG الفرق بين التوقّعات المشروطة وغير المشروطة:</p>
<p><code>predicted_noise = uncond + s * (cond - uncond)</code></p>
<p>حيث <code>s</code> هو مقياس التوجيه. تجعل القيم الأعلى النموذج يتبع أمرك بصرامة أكبر لكنها قد تؤدي إلى إفراط في التشبّع أو تشوهات. ويوازن CFG المعتدل (من 5 إلى 9 للإصدار SD 1.5، ونطاقات مختلفة لـ SDXL) بين الوفاء والطبيعية.</p>
<h2 id="الدقة-ونسب-الأبعاد">الدقة ونسب الأبعاد</h2>
<p>تعمل الكوامن بدقة أقل من البكسلات (تقليل بمقدار 64× في الإصدار SD 1.5). ويجب أن تكون الأبعاد الصالحة مضاعفات لعامل تقليل الدقة في النموذج:</p>
<pre><code class="language-python"><span class="hljs-comment"># Valid resolutions for SD 1.5 (multiples of 64)</span>
resolutions = [
    (<span class="hljs-number">512</span>, <span class="hljs-number">512</span>),    <span class="hljs-comment"># Square</span>
    (<span class="hljs-number">768</span>, <span class="hljs-number">512</span>),    <span class="hljs-comment"># Landscape</span>
    (<span class="hljs-number">512</span>, <span class="hljs-number">768</span>),    <span class="hljs-comment"># Portrait</span>
    (<span class="hljs-number">640</span>, <span class="hljs-number">512</span>),    <span class="hljs-comment"># Wide</span>
]

<span class="hljs-keyword">for</span> width, height <span class="hljs-keyword">in</span> resolutions:
    image = pipeline(
        prompt,
        width=width,
        height=height
    ).images[<span class="hljs-number">0</span>]
</code></pre>
<p>ابدأ بأحجام معتدلة (512×512)، ثم زد الدقة بمكبّرات (upscalers) مخصّصة عند الحاجة.</p>
<h2 id="السلامة-والأخلاقيات">السلامة والأخلاقيات</h2>
<p>استخدم أدوات فحص السلامة ومرشّحات المحتوى بمسؤولية:</p>
<pre><code class="language-python"><span class="hljs-comment"># Safety checker is included by default</span>
<span class="hljs-comment"># To disable (use responsibly):</span>
pipeline.safety_checker = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Or create custom filters</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">custom_safety_check</span>(<span class="hljs-params">images, **kwargs</span>):
    <span class="hljs-comment"># Your safety logic here</span>
    <span class="hljs-keyword">return</span> images, [<span class="hljs-literal">False</span>] * <span class="hljs-built_in">len</span>(images)

pipeline.safety_checker = custom_safety_check
</code></pre>
<p>احترم التراخيص وسياسات الاستخدام. وتجنّب نسخ الأساليب المسمّاة لفنانين أحياء إلا إذا كان ذلك مسموحًا؛ وفضّل الأوصاف العامة. وكن على وعي بالتحيّزات المحتملة في المحتوى المولَّد.</p>
<h2 id="اعتبارات-العتاد">اعتبارات العتاد</h2>
<h3 id="إعدادات-cuda">إعدادات CUDA</h3>
<p>فعّل التحسينات للحصول على أداء أفضل:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> torch
torch.backends.cudnn.benchmark = <span class="hljs-literal">True</span>
<span class="hljs-comment"># Use autocast for fp16/bf16 when running custom inference loops</span>
</code></pre>
<h3 id="التوليد-بالدفعات">التوليد بالدفعات</h3>
<p>ولّد صورًا متعدّدة بكفاءة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Generate batch of images</span>
batch_size = <span class="hljs-number">4</span>
prompts = [prompt] * batch_size

images = pipeline(
    prompts,
    num_inference_steps=<span class="hljs-number">30</span>,
    generator=[torch.Generator(device).manual_seed(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_size)]
).images
</code></pre>
<h2 id="قابلية-إعادة-الإنتاج-والبذور">قابلية إعادة الإنتاج والبذور</h2>
<p>اضبط البذور للحصول على نتائج قابلة لإعادة الإنتاج:</p>
<pre><code class="language-python"><span class="hljs-comment"># Fixed seed for reproducibility</span>
seed = <span class="hljs-number">42</span>
generator = torch.Generator(device).manual_seed(seed)

<span class="hljs-comment"># Generate multiple variations</span>
seeds = [<span class="hljs-number">42</span>, <span class="hljs-number">123</span>, <span class="hljs-number">456</span>, <span class="hljs-number">789</span>]
images = []

<span class="hljs-keyword">for</span> seed <span class="hljs-keyword">in</span> seeds:
    gen = torch.Generator(device).manual_seed(seed)
    image = pipeline(prompt, generator=gen).images[<span class="hljs-number">0</span>]
    images.append(image)
</code></pre>
<h2 id="استكشاف-المشكلات-الشائعة-وإصلاحها">استكشاف المشكلات الشائعة وإصلاحها</h2>
<blockquote>
<p><strong>الإفراط في التشبّع</strong></p>
<p>إذا بدت الصور باهتة أو مشبَعة بإفراط، فقلّل مقياس التوجيه أو جرّب مجدولًا مختلفًا.</p>
</blockquote>
<blockquote>
<p><strong>تجاهل الأمر</strong></p>
<p>إذا تجاهل النموذج أجزاء من أمرك، فجرّب زيادة مقياس التوجيه، أو إعادة الصياغة بمفاهيم أوضح، أو استخدام نقطة تحقق (checkpoint) مختلفة للنموذج.</p>
</blockquote>
<blockquote>
<p><strong>الأنماط المتكرّرة</strong></p>
<p>للتشوهات أو الأنماط المتكرّرة، جرّب بذورًا مختلفة، أو أضف أوامر سلبية للتشوهات الشائعة، أو عدّل عدد خطوات الاستدلال.</p>
</blockquote>
<h2 id="تقنيات-متقدمة">تقنيات متقدّمة <span class="content-anchor" id="advanced-techniques"></span></h2>
<h3 id="ترجيح-الأوامر">ترجيح الأوامر</h3>
<p>تدعم بعض الواجهات ترجيح الأوامر، وإن كان Diffusers الأساسي لا يدعمه مباشرة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Conceptual - requires custom implementation</span>
weighted_prompt = <span class="hljs-string">&quot;(beautiful:1.2) sunset over (calm:0.8) ocean&quot;</span>
</code></pre>
<h3 id="دمج-نقاط-التحقق">دمج نقاط التحقق</h3>
<p>اجمع نقاط قوة نماذج مختلفة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Conceptual - requires model merging tools</span>
merged_model = merge_models(
    model_a=<span class="hljs-string">&quot;stable-diffusion-v1-5&quot;</span>,
    model_b=<span class="hljs-string">&quot;custom-style-model&quot;</span>,
    alpha=<span class="hljs-number">0.5</span>  <span class="hljs-comment"># Blend ratio</span>
)
</code></pre>
<h2 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h2>
<p>يُتيح Stable Diffusion توليد الصور للجميع، فيمكّن أي شخص من إنشاء مرئيات مذهلة من أوصاف نصية. ويعتمد النجاح على فهم التفاعل بين الأوامر والمعاملات وقدرات النموذج. ابدأ بنماذج مُجرَّبة وإعدادات افتراضية، ثم جرّب الأوامر والمجدولات والمعاملات لتجد ما يناسب حالة استخدامك. وتذكّر أن التوليد احتمالي—فاغتنم التغيّر واستخدم البذور عندما تحتاج إلى الاتساق.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li>نماذج الانتشار الكامن (Rombach وآخرون، 2022): <a href="https://arxiv.org/abs/2112.10752">https://arxiv.org/abs/2112.10752</a></li>
<li>التوجيه بلا مصنّف (Ho وSalimans، 2021): <a href="https://arxiv.org/abs/2207.12598">https://arxiv.org/abs/2207.12598</a></li>
<li>Stable Diffusion XL: <a href="https://arxiv.org/abs/2307.01952">https://arxiv.org/abs/2307.01952</a></li>
<li>Diffusers — توليد الصور من النص: <a href="https://huggingface.co/docs/diffusers/main/en/using-diffusers/conditional_image_generation">https://huggingface.co/docs/diffusers/main/en/using-diffusers/conditional_image_generation</a></li>
<li>Diffusers — المجدولات: <a href="https://huggingface.co/docs/diffusers/main/en/using-diffusers/schedulers">https://huggingface.co/docs/diffusers/main/en/using-diffusers/schedulers</a></li>
</ul>
`,o={book:n,chapter:s,chapterTitle:e,slug:a,title:t,headings:p,html:l};export{n as book,s as chapter,e as chapterTitle,o as default,p as headings,l as html,a as slug,t as title};
