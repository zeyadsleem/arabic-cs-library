const s="kinney",n="python-ai",a="أساسيات الذكاء الاصطناعي بلغة Python",e="image-to-image",t="التحويلات من صورة إلى صورة (Image-to-Image)",p=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"دفتر-الملاحظات",text:"دفتر الملاحظات"},{depth:2,id:"تهيئة-خط-المعالجة",text:"تهيئة خط المعالجة"},{depth:2,id:"معامل-القوة",text:"معامل القوة"},{depth:2,id:"كيف-يعمل",text:"كيف يعمل"},{depth:2,id:"تطبيقات-عملية",text:"تطبيقات عملية"},{depth:3,id:"نقل-الأسلوب",text:"نقل الأسلوب"},{depth:3,id:"تعديل-العناصر",text:"تعديل العناصر"},{depth:3,id:"إنشاء-التنويعات",text:"إنشاء التنويعات"},{depth:2,id:"الحفاظ-على-التكوين",text:"الحفاظ على التكوين"},{depth:2,id:"التنقيح-التدريجي",text:"التنقيح التدريجي"},{depth:2,id:"التحرير-بالقناع-inpainting",text:"التحرير بالقناع (Inpainting)"},{depth:2,id:"مطابقة-الدقة",text:"مطابقة الدقة"},{depth:2,id:"تصوير-القوة-مقابل-عدد-الخطوات",text:"تصوّير القوة مقابل عدد الخطوات"},{depth:2,id:"التكبير-باستخدام-الصور-من-صورة-إلى-صورة",text:"التكبير باستخدام الصور من صورة إلى صورة"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"},{depth:2,id:"اتساق-الألوان-والأسلوب",text:"اتساق الألوان والأسلوب"},{depth:2,id:"سير-عمل-متعدد-الممرات",text:"سير عمل متعدد الممرات"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<blockquote>
<p><strong>أهم الاستنتاجات</strong></p>
<ul>
<li>يبدأ التوليد من صورة إلى صورة من صور مصدر مشوّشة جزئيًا، لا من ضوضاء خالصة</li>
<li>يتحكّم معامل القوة (strength) في درجة التحوّل: صفر يعني الأصلية وواحد تعني الجديدة</li>
<li>حافظ على التكوين بقوة أقل، وغيّر الأسلوب بقيم أعلى</li>
<li>طابِق دقة التمثيل الكامن (latent)، وجهّز الصور مسبقًا لنتائج أفضل</li>
<li>يصلح لنقل الأسلوب، والتحرير، وإنشاء التنويعات، ومهام التكبير</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>يحوّل التوليد من صورة إلى صورة الصور الموجودة باستخدام أوامر نصية، مع الحفاظ على جوانب من الأصلية أثناء إدخال عناصر جديدة. وخلافًا للتوليد من نص إلى صورة الذي يبدأ من ضوضاء عشوائية، يبدأ هذا النوع من صورتك المصدر، فيمنحك سيطرة إبداعيًا على مقدار ما تحفظه مقابل مقدار ما تحوّله.</p>
<p>فكّر فيه كإعادة ترميم منزل بدل بنائه من الصفر. أنت تحفظ الأساس والبنية (أي التكوين)، لكن يمكنك تغيير الأسلوب والألوان والتفاصيل. ومعامل القوة (strength) يشبه الاختيار بين تجديد خفيف (طلاء جديد) أو تجديد شامل (كل شيء جديد).</p>
<h2 id="دفتر-الملاحظات">دفتر الملاحظات</h2>
<p>اطّلع على دفتر الملاحظات المرافق: <a href="https://colab.research.google.com/drive/1iI-RKtZOkL4DbaJKCIHIqkati3D1Yv_7?usp=sharing">تحويلات من صورة إلى صورة</a></p>
<h2 id="تهيئة-خط-المعالجة">تهيئة خط المعالجة</h2>
<p>ثبّت الاعتمادات وحمّل خط المعالجة (pipeline) المخصّص للصور من صورة إلى صورة:</p>
<pre><code class="language-python">!pip install -q diffusers transformers accelerate

<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> diffusers <span class="hljs-keyword">import</span> AutoPipelineForImage2Image
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO

<span class="hljs-comment"># Load the pipeline</span>
pipeline = AutoPipelineForImage2Image.from_pretrained(
    <span class="hljs-string">&quot;stable-diffusion-v1-5/stable-diffusion-v1-5&quot;</span>,
    torch_dtype=torch.float16,
    use_safetensors=<span class="hljs-literal">True</span>,
).to(<span class="hljs-string">&quot;cuda&quot;</span>)

<span class="hljs-comment"># Load an example image</span>
img_url = <span class="hljs-string">&quot;https://example.com/your-image.jpg&quot;</span>
response = requests.get(img_url)
init_image = Image.<span class="hljs-built_in">open</span>(BytesIO(response.content)).convert(<span class="hljs-string">&quot;RGB&quot;</span>)
init_image = init_image.resize((<span class="hljs-number">512</span>, <span class="hljs-number">512</span>))
</code></pre>
<h2 id="معامل-القوة">معامل القوة</h2>
<p>يحدّد معامل القوة مقدار ما تحفظه من صورتك الأصلية مقابل مقدار الحرية التي يملكها النموذج لتغييرها. ويُقابل المعامل موقع انطلاق العملية على مسار الانتشار: القوة العالية تُحقن ضوضاء أكثر (تغيّر أكبر)، والقوة المنخفضة تحافظ على البنية (تغيّر أقل).</p>
<pre><code class="language-python">prompt = <span class="hljs-string">&quot;A oil painting of a landscape in impressionist style&quot;</span>

<span class="hljs-comment"># Low strength - minimal changes</span>
light_edit = pipeline(
    prompt=prompt,
    image=init_image,
    strength=<span class="hljs-number">0.3</span>,
    guidance_scale=<span class="hljs-number">7.5</span>
).images[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Medium strength - balanced transformation</span>
balanced_edit = pipeline(
    prompt=prompt,
    image=init_image,
    strength=<span class="hljs-number">0.5</span>,
    guidance_scale=<span class="hljs-number">7.5</span>
).images[<span class="hljs-number">0</span>]

<span class="hljs-comment"># High strength - major transformation</span>
heavy_edit = pipeline(
    prompt=prompt,
    image=init_image,
    strength=<span class="hljs-number">0.8</span>,
    guidance_scale=<span class="hljs-number">7.5</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<p><strong>قوة = 0.0</strong>: تُعيد الصورة الأصلية دون أي تغيير. <strong>قوة = 0.3</strong>: تحريرات خفيفة تتغيّر معها الألوان والقوامات. <strong>قوة = 0.5</strong>: تغيّرات أسلوبية متوازنة. <strong>قوة = 0.8</strong>: تحوّل قوي قد يمسّ التكوين. <strong>قوة = 1.0</strong>: يعادل تقريبًا التوليد من نص إلى صورة.</p>
<h2 id="كيف-يعمل">كيف يعمل</h2>
<p>تختلف العملية عن التوليد من نص إلى صورة في جانب حاسم:</p>
<ol>
<li><strong>الترميز</strong>: تُرمَّز صورتك إلى الفضاء الكامن بمساعدة مُرمِّز VAE</li>
<li><strong>إضافة الضوضاء</strong>: تُضاف ضوضاء بناءً على معامل القوة</li>
<li><strong>إزالة التشويش</strong>: تزيل شبكة U-Net الضوضاء تحت توجيه أمرك النصي</li>
<li><strong>فك الترميز</strong>: يحوّل مفكّك VAE النتيجة عائدًا إلى صورة</li>
</ol>
<p>عند قوة تساوي 0.5، يُشغّل النموذج آخر 50% فقط من خطوات إزالة التشويش. وتبدأ صورتك في منتصف مسار إزالة التشويش، لا من ضوضاء خالصة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Understanding the math</span>
total_steps = <span class="hljs-number">50</span>
strength = <span class="hljs-number">0.5</span>
start_step = <span class="hljs-built_in">int</span>(total_steps * (<span class="hljs-number">1</span> - strength))  <span class="hljs-comment"># Start at step 25</span>
<span class="hljs-comment"># Model runs steps 25-50, preserving early structure</span>
</code></pre>
<h2 id="تطبيقات-عملية">تطبيقات عملية</h2>
<h3 id="نقل-الأسلوب">نقل الأسلوب</h3>
<p>حوّل الصور الفوتوغرافية إلى أساليب فنية مختلفة مع الحفاظ على التكوين:</p>
<pre><code class="language-python"><span class="hljs-comment"># Load a photo</span>
photo = Image.<span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;landscape_photo.jpg&quot;</span>).resize((<span class="hljs-number">512</span>, <span class="hljs-number">512</span>))

styles = [
    <span class="hljs-string">&quot;oil painting in the style of Van Gogh&quot;</span>,
    <span class="hljs-string">&quot;watercolor painting with soft edges&quot;</span>,
    <span class="hljs-string">&quot;pencil sketch with cross-hatching&quot;</span>,
    <span class="hljs-string">&quot;digital art in cyberpunk style&quot;</span>
]

styled_images = []
<span class="hljs-keyword">for</span> style_prompt <span class="hljs-keyword">in</span> styles:
    result = pipeline(
        prompt=style_prompt,
        image=photo,
        strength=<span class="hljs-number">0.6</span>,
        guidance_scale=<span class="hljs-number">7.5</span>
    ).images[<span class="hljs-number">0</span>]
    styled_images.append(result)
</code></pre>
<h3 id="تعديل-العناصر">تعديل العناصر</h3>
<p>غيّر عناصر محدّدة مع إبقاء بقية العناصر سليمة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Original: photo of a red car</span>
prompt = <span class="hljs-string">&quot;A blue car on a city street&quot;</span>

modified = pipeline(
    prompt=prompt,
    image=car_photo,
    strength=<span class="hljs-number">0.4</span>,  <span class="hljs-comment"># Lower strength to preserve composition</span>
    guidance_scale=<span class="hljs-number">10</span>,  <span class="hljs-comment"># Higher guidance for prompt adherence</span>
    negative_prompt=<span class="hljs-string">&quot;red, distorted, blurry&quot;</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<h3 id="إنشاء-التنويعات">إنشاء التنويعات</h3>
<p>ولّد نسخًا متعددة من المفهوم نفسه:</p>
<pre><code class="language-python">prompt = <span class="hljs-string">&quot;professional product photography of a watch&quot;</span>
variations = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>):
    generator = torch.Generator(<span class="hljs-string">&quot;cuda&quot;</span>).manual_seed(i)
    variant = pipeline(
        prompt=prompt,
        image=watch_image,
        strength=<span class="hljs-number">0.35</span>,
        generator=generator
    ).images[<span class="hljs-number">0</span>]
    variations.append(variant)
</code></pre>
<h2 id="الحفاظ-على-التكوين">الحفاظ على التكوين</h2>
<p>تساعد الأوامر التي تذكر العناصر والعلاقات بينها في الحفاظ على التخطيط. أما للحفاظ الصارم على البنية فادمجها مع أساليب التحكّم متى كانت متاحة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Include spatial information in prompt</span>
spatial_prompt = (
    <span class="hljs-string">&quot;Mountain in the background, lake in the middle ground, &quot;</span>
    <span class="hljs-string">&quot;trees in the foreground, sunset lighting&quot;</span>
)

<span class="hljs-comment"># Use negative prompts to prevent unwanted changes</span>
result = pipeline(
    prompt=spatial_prompt,
    image=landscape,
    strength=<span class="hljs-number">0.5</span>,
    negative_prompt=<span class="hljs-string">&quot;cluttered, distorted perspective, warped&quot;</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<h2 id="التنقيح-التدريجي">التنقيح التدريجي</h2>
<p>طبّق ممرات متعددة بقوة متناقصة للحصول على تحرير منضبط:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">progressive_edit</span>(<span class="hljs-params">image, prompt, strengths=[<span class="hljs-number">0.6</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>]</span>):
    current_image = image

    <span class="hljs-keyword">for</span> strength <span class="hljs-keyword">in</span> strengths:
        current_image = pipeline(
            prompt=prompt,
            image=current_image,
            strength=strength,
            guidance_scale=<span class="hljs-number">7.5</span>
        ).images[<span class="hljs-number">0</span>]

    <span class="hljs-keyword">return</span> current_image

<span class="hljs-comment"># Gradually transform the image</span>
final = progressive_edit(
    init_image,
    <span class="hljs-string">&quot;ethereal fantasy landscape with glowing crystals&quot;</span>
)
</code></pre>
<h2 id="التحرير-بالقناع-inpainting">التحرير بالقناع (Inpainting)</h2>
<p>لأجل التعديلات المحلية الدقيقة، استخدم خطوط معالجة التحرير بالقناع:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> diffusers <span class="hljs-keyword">import</span> AutoPipelineForInpainting

inpaint_pipe = AutoPipelineForInpainting.from_pretrained(
    <span class="hljs-string">&quot;runwayml/stable-diffusion-inpainting&quot;</span>,
    torch_dtype=torch.float16
).to(<span class="hljs-string">&quot;cuda&quot;</span>)

<span class="hljs-comment"># Create a mask (white = edit, black = preserve)</span>
mask = Image.new(<span class="hljs-string">&quot;L&quot;</span>, (<span class="hljs-number">512</span>, <span class="hljs-number">512</span>), <span class="hljs-number">0</span>)
<span class="hljs-comment"># Draw white areas where you want changes</span>

result = inpaint_pipe(
    prompt=<span class="hljs-string">&quot;a golden crown&quot;</span>,
    image=portrait,
    mask_image=mask,
    strength=<span class="hljs-number">0.8</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<h2 id="مطابقة-الدقة">مطابقة الدقة</h2>
<p>طابِق دائمًا دقة النموذج الأصلية للحصول على أفضل النتائج:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">prepare_image</span>(<span class="hljs-params">image, target_size=<span class="hljs-number">512</span></span>):
    <span class="hljs-comment"># Calculate aspect ratio</span>
    aspect = image.width / image.height

    <span class="hljs-keyword">if</span> aspect &gt; <span class="hljs-number">1</span>:  <span class="hljs-comment"># Landscape</span>
        new_width = target_size
        new_height = <span class="hljs-built_in">int</span>(target_size / aspect)
    <span class="hljs-keyword">else</span>:  <span class="hljs-comment"># Portrait or square</span>
        new_height = target_size
        new_width = <span class="hljs-built_in">int</span>(target_size * aspect)

    <span class="hljs-comment"># Resize maintaining aspect ratio</span>
    resized = image.resize((new_width, new_height), Image.LANCZOS)

    <span class="hljs-comment"># Pad to square if needed</span>
    <span class="hljs-keyword">if</span> new_width != new_height:
        padded = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (target_size, target_size))
        paste_x = (target_size - new_width) // <span class="hljs-number">2</span>
        paste_y = (target_size - new_height) // <span class="hljs-number">2</span>
        padded.paste(resized, (paste_x, paste_y))
        <span class="hljs-keyword">return</span> padded

    <span class="hljs-keyword">return</span> resized
</code></pre>
<h2 id="تصوير-القوة-مقابل-عدد-الخطوات">تصوّير القوة مقابل عدد الخطوات</h2>
<p>افهم كيف يؤثّر معامل القوة على عملية إزالة التشويش:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

<span class="hljs-comment"># Visualize the relationship</span>
strengths = np.linspace(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">11</span>)
total_steps = <span class="hljs-number">50</span>

fig, ax = plt.subplots(figsize=(<span class="hljs-number">10</span>, <span class="hljs-number">6</span>))

<span class="hljs-keyword">for</span> strength <span class="hljs-keyword">in</span> strengths:
    start_step = <span class="hljs-built_in">int</span>(total_steps * (<span class="hljs-number">1</span> - strength))
    remaining_steps = total_steps - start_step

    ax.barh(
        strength,
        remaining_steps,
        left=start_step,
        height=<span class="hljs-number">0.08</span>,
        label=<span class="hljs-string">f&quot;Strength <span class="hljs-subst">{strength:<span class="hljs-number">.1</span>f}</span>&quot;</span>
    )

ax.set_xlabel(<span class="hljs-string">&quot;Denoising Steps&quot;</span>)
ax.set_ylabel(<span class="hljs-string">&quot;Strength Parameter&quot;</span>)
ax.set_title(<span class="hljs-string">&quot;How Strength Controls the Denoising Process&quot;</span>)
ax.set_xlim(<span class="hljs-number">0</span>, total_steps)
plt.show()
</code></pre>
<p>قوة أقل تعني خطوات إزالة تشويش أقل، فتُحفظ نسبة أكبر من الأصلية. وقوة أعلى تعني خطوات أكثر، فيُسمح بتحوّل أكبر.</p>
<h2 id="التكبير-باستخدام-الصور-من-صورة-إلى-صورة">التكبير باستخدام الصور من صورة إلى صورة</h2>
<p>استخدم التوليد من صورة إلى صورة لتكبير ذكي:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> diffusers <span class="hljs-keyword">import</span> StableDiffusionUpscalePipeline

upscale_pipe = StableDiffusionUpscalePipeline.from_pretrained(
    <span class="hljs-string">&quot;stabilityai/stable-diffusion-x4-upscaler&quot;</span>,
    torch_dtype=torch.float16
).to(<span class="hljs-string">&quot;cuda&quot;</span>)

<span class="hljs-comment"># Upscale 4x with enhancement</span>
upscaled = upscale_pipe(
    prompt=<span class="hljs-string">&quot;high quality, detailed, sharp&quot;</span>,
    image=low_res_image,
    num_inference_steps=<span class="hljs-number">20</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<blockquote>
<p><strong>فقدان التفاصيل</strong></p>
<p>إن كنت تفقد تفاصيل كثيرة، فقلّل القوة أو زد مقياس التوجيه (guidance scale). وفكّر في استخدام نماذج مخصّصة لـ img2img.</p>
</blockquote>
<blockquote>
<p><strong>انزياح الألوان</strong></p>
<p>للحفاظ على الألوان الأصلية، أدرج وصف الألوان في أمرك أو استخدم قيم قوة أقل (0.2-0.4).</p>
</blockquote>
<blockquote>
<p><strong>شوائب الدقة</strong></p>
<p>قلّم حجم الصور دائمًا إلى الدقة الأصلية للنموذج (512×512 لـ SD 1.5، و768×768 أو 1024×1024 لـ SDXL).</p>
</blockquote>
<h2 id="اتساق-الألوان-والأسلوب">اتساق الألوان والأسلوب</h2>
<p>للحفاظ على لوحات الألوان، استخدم قوة أقل وخطوات أقل، أو طبّق نقل الألوان بعد المعالجة. أما لتغيير الأسلوب وحده فاحتفظ بالمحتوى الدلالي في الأمر وابرز الأوصاف الأسلوبية:</p>
<pre><code class="language-python"><span class="hljs-comment"># Preserve colors while changing style</span>
color_preserving_prompt = (
    <span class="hljs-string">&quot;impressionist painting with vibrant blues and warm oranges, &quot;</span>
    <span class="hljs-string">&quot;maintaining original color palette&quot;</span>
)

result = pipeline(
    prompt=color_preserving_prompt,
    image=original,
    strength=<span class="hljs-number">0.4</span>,
    negative_prompt=<span class="hljs-string">&quot;desaturated, monochrome, color shift&quot;</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<h2 id="سير-عمل-متعدد-الممرات">سير عمل متعدد الممرات</h2>
<p>كرّر التنفيذ بتعديلات صغيرة في القوة لتحقيق تحوّلات مركّبة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Stage 1: Style transfer</span>
stage1 = pipeline(
    <span class="hljs-string">&quot;oil painting style&quot;</span>,
    image=photo,
    strength=<span class="hljs-number">0.5</span>
).images[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Stage 2: Lighting adjustment</span>
stage2 = pipeline(
    <span class="hljs-string">&quot;dramatic sunset lighting&quot;</span>,
    image=stage1,
    strength=<span class="hljs-number">0.3</span>
).images[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Stage 3: Final touches</span>
final = pipeline(
    <span class="hljs-string">&quot;highly detailed, masterpiece&quot;</span>,
    image=stage2,
    strength=<span class="hljs-number">0.2</span>
).images[<span class="hljs-number">0</span>]
</code></pre>
<p>احفظ البذور (seeds) لكل ممر لتتمكن من إعادة تشغيل السلاسل الناجحة بطريقة حتمية.</p>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>يمنح توليد الصور من صورة إلى صورة تحكّمًا دقيقًا في تحوّل الصور بواسطة الذكاء الاصطناعي. ويزن معامل القوة بين الحفاظ والتحوّل—ابدأ بقيمة بين 0.3 و0.5 في معظم المهام. فالقيم الأدنى تحافظ على البنية بينما تتيح القيم الأعلى حرية إبداعية. وادمج ذلك مع التنقيح التدريجي، والتحرير بالقناع، ومعالجة الدقة الصحيحة للحصول على نتائج احترافية. وتذكّر أن هذه التقنية تتفوق في نقل الأسلوب، وتنويع المفاهيم، والمهام التنقيحية التكرارية.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li>Diffusers — التحوّل من صورة إلى صورة: <a href="https://huggingface.co/docs/diffusers/main/en/using-diffusers/img2img">https://huggingface.co/docs/diffusers/main/en/using-diffusers/img2img</a></li>
<li>Diffusers — التحرير بالقناع: <a href="https://huggingface.co/docs/diffusers/main/en/using-diffusers/inpaint">https://huggingface.co/docs/diffusers/main/en/using-diffusers/inpaint</a></li>
<li>شبكة التحكّم ControlNet (Zhang وAgrawala): <a href="https://arxiv.org/abs/2302.05543">https://arxiv.org/abs/2302.05543</a></li>
</ul>
`,i={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,i as default,p as headings,l as html,e as slug,t as title};
