const s="kinney",a="python-ai",n="أساسيات الذكاء الاصطناعي بلغة Python",e="dreambooth",l="DreamBooth — تخصيص نماذج النص إلى صورة",p=[{depth:2,id:"نظرة-عامة",text:"نظرة عامة"},{depth:2,id:"دفتر-الملاحظات",text:"دفتر الملاحظات"},{depth:2,id:"ما-الذي-سنقوم-به",text:"ما الذي سنقوم به"},{depth:2,id:"تهيئة-الاعتمادات",text:"تهيئة الاعتمادات"},{depth:2,id:"تجهيز-البيانات",text:"تجهيز البيانات"},{depth:3,id:"رفع-صورك",text:"رفع صورك"},{depth:3,id:"إنشاء-أصناف-مجموعة-البيانات",text:"إنشاء أصناف مجموعة البيانات"},{depth:2,id:"الحفاظ-على-المقدمات-وصور-الصف",text:"الحفاظ على المقدّمات وصور الصف"},{depth:2,id:"مكونات-النموذج",text:"مكوّنات النموذج"},{depth:3,id:"مرمز-النص-clip",text:"مُرمِّز النص (CLIP)"},{depth:3,id:"vae-المرمز-التنوعي",text:"VAE (المُرمِّز التنوّعي)"},{depth:3,id:"نموذج-u-net",text:"نموذج U-Net"},{depth:3,id:"المقسم-إلى-رموز-tokenizer",text:"المُقسِّم إلى رموز (Tokenizer)"},{depth:2,id:"إعداد-التدريب",text:"إعداد التدريب"},{depth:2,id:"دالة-التدريب",text:"دالة التدريب"},{depth:2,id:"تشغيل-التدريب",text:"تشغيل التدريب"},{depth:2,id:"استخدام-النموذج-المضبط-بدقة",text:"استخدام النموذج المضبط بدقة"},{depth:2,id:"lora-مقابل-الضبط-الدقيق-الكامل",text:"LoRA مقابل الضبط الدقيق الكامل"},{depth:3,id:"الضبط-الدقيق-الكامل",text:"الضبط الدقيق الكامل"},{depth:3,id:"lora-التكيف-من-الرتبة-المنخفضة",text:"LoRA (التكيّف من الرتبة المنخفضة)"},{depth:2,id:"المعاملات-الفائقة-وأفضل-الممارسات",text:"المعاملات الفائقة وأفضل الممارسات"},{depth:3,id:"معدل-التعلم",text:"معدّل التعلّم"},{depth:3,id:"خطوات-التدريب",text:"خطوات التدريب"},{depth:3,id:"وزن-الحفاظ-على-المقدمات",text:"وزن الحفاظ على المقدّمات"},{depth:2,id:"نظافة-مجموعة-البيانات",text:"نظافة مجموعة البيانات"},{depth:2,id:"بروتوكول-التقييم",text:"بروتوكول التقييم"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها",text:"استكشاف الأخطاء وإصلاحها"},{depth:2,id:"الأخلاقيات-والسلامة",text:"الأخلاقيات والسلامة"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],t=`<blockquote>
<p><strong>أهم الاستنتاجات</strong></p>
<ul>
<li>جهّز من 3 إلى 10 صور متنوّعة للموضوع (instance) ورمز معرّف فريدًا</li>
<li>استخدم الحفاظ على المقدّمات (prior preservation) بصور الصف (class) للحد من فرط التأقلم</li>
<li>ابدأ بمعدّلات تعلّم وعدد خطوات متحفّظ، وراقب عيّنات دورية</li>
<li>فضّل LoRA لمُوصِّلات خفيفة قابلة للتركيب؛ أمّا الضبط الكامل فيثقل</li>
<li>عرّف أوامر التقييم عبر الأساليب والوضعيات، وأبقِ البذور ثابتة لضمان عدالة المقارنات</li>
</ul>
</blockquote>
<h2 id="نظرة-عامة">نظرة عامة</h2>
<p>DreamBooth تقنية تخصيص تضبط نموذج انتشار كامل من النص إلى صورة (text-to-image) باستخدام قليل من صور المرجع فحسب، عادةً من 3 إلى 5 صور. فمن خلال ربط رمز معرّف فريد بصفّ الموضوع (class) — مثل «صورة لـ [XYZ] كلب» — يتعلّم النموذج توليد ذلك الموضوع بدقّة في سياقات ووضعيات وإضاءات جديدة. وهذا يتيح تركيب صور عالية الولاء يقودها الموضوع حتى مع بيانات تدريب محدودة جدًّا.</p>
<h2 id="دفتر-الملاحظات">دفتر الملاحظات</h2>
<p>اطّلع على دفتر الملاحظات المرافق: <a href="https://colab.research.google.com/drive/1Swhhh_rQxRHgD1LGqJgvRigQ8eI5NvsA?usp=sharing">DreamBooth</a></p>
<h2 id="ما-الذي-سنقوم-به">ما الذي سنقوم به</h2>
<ol>
<li>تثبيت الاعتمادات</li>
<li>رفع صور تدريبك (من 3 إلى 10 صور عالية الجودة لموضوعك)</li>
<li>تدريب نموذج DreamBooth على موضوعك</li>
<li>توليد صور جديدة لموضوعك في سياقات مختلفة</li>
</ol>
<h2 id="تهيئة-الاعتمادات">تهيئة الاعتمادات</h2>
<p>نحتاج إلى استيراد كل مكتبات Python والوحدات الأساسية المطلوبة لتدريب DreamBooth وتوليد الصور:</p>
<pre><code class="language-python">%pip install -q git+https://github.com/huggingface/diffusers
%pip install -q accelerate tensorboard transformers ftfy bitsandbytes
%pip install xformers -q --index-url https://download.pytorch.org/whl/cu124
%pip install -qq bitsandbytes

<span class="hljs-keyword">from</span> pathlib <span class="hljs-keyword">import</span> Path
<span class="hljs-keyword">import</span> argparse
<span class="hljs-keyword">import</span> itertools
<span class="hljs-keyword">import</span> math
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> contextlib <span class="hljs-keyword">import</span> nullcontext
<span class="hljs-keyword">import</span> gc
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> torch.nn.functional <span class="hljs-keyword">as</span> F
<span class="hljs-keyword">import</span> torch.utils.checkpoint
<span class="hljs-keyword">from</span> torch.utils.data <span class="hljs-keyword">import</span> Dataset

<span class="hljs-keyword">import</span> PIL
<span class="hljs-keyword">from</span> accelerate <span class="hljs-keyword">import</span> Accelerator
<span class="hljs-keyword">from</span> accelerate.logging <span class="hljs-keyword">import</span> get_logger
<span class="hljs-keyword">from</span> accelerate.utils <span class="hljs-keyword">import</span> set_seed
<span class="hljs-keyword">from</span> diffusers <span class="hljs-keyword">import</span> (
    AutoencoderKL, DDPMScheduler, PNDMScheduler,
    StableDiffusionPipeline, UNet2DConditionModel
)
<span class="hljs-keyword">from</span> diffusers.optimization <span class="hljs-keyword">import</span> get_scheduler
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">from</span> torchvision <span class="hljs-keyword">import</span> transforms
<span class="hljs-keyword">from</span> tqdm.auto <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> CLIPFeatureExtractor, CLIPTextModel, CLIPTokenizer

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;👨‍🎤 Environment ready to rock.&quot;</span>)
</code></pre>
<h2 id="تجهيز-البيانات">تجهيز البيانات</h2>
<h3 id="رفع-صورك">رفع صورك</h3>
<p>اختر من 3 إلى 10 صور لموضوعك لرفعها. ينبغي أن تكون صورًا فوتوغرافية عالية الجودة بخلفيات وزوايا وإضاءات متنوّعة:</p>
<pre><code class="language-python"><span class="hljs-comment"># Name your concept (e.g., your dog&#x27;s name)</span>
concept_name = <span class="hljs-string">&quot;my-dog&quot;</span>  <span class="hljs-comment"># @param {&quot;type&quot;: &quot;string&quot;}</span>
instance_data_dir = os.path.join(<span class="hljs-string">&quot;/content/&quot;</span>, concept_name)

<span class="hljs-comment"># Create the directory</span>
os.makedirs(instance_data_dir, exist_ok=<span class="hljs-literal">True</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Directory &#x27;<span class="hljs-subst">{instance_data_dir}</span>&#x27; created for your images. 💪&quot;</span>)

<span class="hljs-comment"># Check if the directory is empty before prompting for upload</span>
<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.listdir(instance_data_dir):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Uploading images to <span class="hljs-subst">{instance_data_dir}</span>…&quot;</span>)
    <span class="hljs-keyword">from</span> google.colab <span class="hljs-keyword">import</span> files
    uploaded = files.upload()

    <span class="hljs-comment"># Move uploaded files to the instance directory</span>
    <span class="hljs-keyword">for</span> filename <span class="hljs-keyword">in</span> uploaded.keys():
        os.rename(filename, os.path.join(instance_data_dir, filename))
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Directory &#x27;<span class="hljs-subst">{instance_data_dir}</span>&#x27; is not empty. Skipping image upload.&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;🩻 Images uploaded successfully.&quot;</span>)
</code></pre>
<h3 id="إنشاء-أصناف-مجموعة-البيانات">إنشاء أصناف مجموعة البيانات</h3>
<p>يتطلّب DreamBooth أصناف Dataset مخصّصة في PyTorch للتعامل مع تجهيز البيانات:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">DreamBoothDataset</span>(<span class="hljs-title class_ inherited__">Dataset</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">
        self,
        instance_data_dir,
        instance_prompt,
        tokenizer,
        class_data_root=<span class="hljs-literal">None</span>,
        class_prompt=<span class="hljs-literal">None</span>,
        size=<span class="hljs-number">512</span>,
        center_crop=<span class="hljs-literal">False</span>,
    </span>):
        <span class="hljs-variable language_">self</span>.size = size
        <span class="hljs-variable language_">self</span>.center_crop = center_crop
        <span class="hljs-variable language_">self</span>.tokenizer = tokenizer

        <span class="hljs-variable language_">self</span>.instance_data_dir = Path(instance_data_dir)
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-variable language_">self</span>.instance_data_dir.exists():
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;Instance images root doesn&#x27;t exists.&quot;</span>)

        <span class="hljs-variable language_">self</span>.instance_images_path = <span class="hljs-built_in">list</span>(Path(instance_data_dir).iterdir())
        <span class="hljs-variable language_">self</span>.num_instance_images = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.instance_images_path)
        <span class="hljs-variable language_">self</span>.instance_prompt = instance_prompt
        <span class="hljs-variable language_">self</span>._length = <span class="hljs-variable language_">self</span>.num_instance_images

        <span class="hljs-keyword">if</span> class_data_root <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
            <span class="hljs-variable language_">self</span>.class_data_root = Path(class_data_root)
            <span class="hljs-variable language_">self</span>.class_data_root.mkdir(parents=<span class="hljs-literal">True</span>, exist_ok=<span class="hljs-literal">True</span>)
            <span class="hljs-variable language_">self</span>.class_images_path = <span class="hljs-built_in">list</span>(Path(class_data_root).iterdir())
            <span class="hljs-variable language_">self</span>.num_class_images = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.class_images_path)
            <span class="hljs-variable language_">self</span>._length = <span class="hljs-built_in">max</span>(<span class="hljs-variable language_">self</span>.num_class_images, <span class="hljs-variable language_">self</span>.num_instance_images)
            <span class="hljs-variable language_">self</span>.class_prompt = class_prompt
        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>.class_data_root = <span class="hljs-literal">None</span>

        <span class="hljs-variable language_">self</span>.image_transforms = transforms.Compose(
            [
                transforms.Resize(size, interpolation=transforms.InterpolationMode.BILINEAR),
                transforms.CenterCrop(size) <span class="hljs-keyword">if</span> center_crop <span class="hljs-keyword">else</span> transforms.RandomCrop(size),
                transforms.ToTensor(),
                transforms.Normalize([<span class="hljs-number">0.5</span>], [<span class="hljs-number">0.5</span>]),
            ]
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__len__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._length

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__getitem__</span>(<span class="hljs-params">self, index</span>):
        example = {}
        instance_image = Image.<span class="hljs-built_in">open</span>(<span class="hljs-variable language_">self</span>.instance_images_path[index % <span class="hljs-variable language_">self</span>.num_instance_images])
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> instance_image.mode == <span class="hljs-string">&quot;RGB&quot;</span>:
            instance_image = instance_image.convert(<span class="hljs-string">&quot;RGB&quot;</span>)
        example[<span class="hljs-string">&quot;instance_images&quot;</span>] = <span class="hljs-variable language_">self</span>.image_transforms(instance_image)

        example[<span class="hljs-string">&quot;instance_prompt_ids&quot;</span>] = <span class="hljs-variable language_">self</span>.tokenizer(
            <span class="hljs-variable language_">self</span>.instance_prompt,
            padding=<span class="hljs-string">&quot;do_not_pad&quot;</span>,
            truncation=<span class="hljs-literal">True</span>,
            max_length=<span class="hljs-variable language_">self</span>.tokenizer.model_max_length,
        ).input_ids

        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.class_data_root:
            class_image = Image.<span class="hljs-built_in">open</span>(<span class="hljs-variable language_">self</span>.class_images_path[index % <span class="hljs-variable language_">self</span>.num_class_images])
            <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> class_image.mode == <span class="hljs-string">&quot;RGB&quot;</span>:
                class_image = class_image.convert(<span class="hljs-string">&quot;RGB&quot;</span>)
            example[<span class="hljs-string">&quot;class_images&quot;</span>] = <span class="hljs-variable language_">self</span>.image_transforms(class_image)
            example[<span class="hljs-string">&quot;class_prompt_ids&quot;</span>] = <span class="hljs-variable language_">self</span>.tokenizer(
                <span class="hljs-variable language_">self</span>.class_prompt,
                padding=<span class="hljs-string">&quot;do_not_pad&quot;</span>,
                truncation=<span class="hljs-literal">True</span>,
                max_length=<span class="hljs-variable language_">self</span>.tokenizer.model_max_length,
            ).input_ids

        <span class="hljs-keyword">return</span> example

<span class="hljs-keyword">class</span> <span class="hljs-title class_">PromptDataset</span>(<span class="hljs-title class_ inherited__">Dataset</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, prompt, num_samples</span>):
        <span class="hljs-variable language_">self</span>.prompt = prompt
        <span class="hljs-variable language_">self</span>.num_samples = num_samples

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__len__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.num_samples

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__getitem__</span>(<span class="hljs-params">self, index</span>):
        example = {}
        example[<span class="hljs-string">&quot;prompt&quot;</span>] = <span class="hljs-variable language_">self</span>.prompt
        example[<span class="hljs-string">&quot;index&quot;</span>] = index
        <span class="hljs-keyword">return</span> example
</code></pre>
<h2 id="الحفاظ-على-المقدمات-وصور-الصف">الحفاظ على المقدّمات وصور الصف</h2>
<p>يساعد الحفاظ على المقدّمات (prior preservation) على منع فرط التأقلم وعلى الحفاظ على قدرة النموذج في توليد أمثلة متنوّعة من الصف الأوسع. فإن لم يكن لديك من صور الصف ما يكفي، ولّدها النموذج تلقائيًا:</p>
<pre><code class="language-python">pretrained_model_name_or_path = <span class="hljs-string">&quot;stabilityai/stable-diffusion-2&quot;</span>
prior_preservation_class_folder = <span class="hljs-string">&quot;./class_images&quot;</span>
prior_preservation_class_prompt = <span class="hljs-string">&quot;a photo of a pit bull&quot;</span>
prior_loss_weight = <span class="hljs-number">0.5</span>
num_class_images = <span class="hljs-number">12</span>
sample_batch_size = <span class="hljs-number">2</span>

class_images_dir = Path(prior_preservation_class_folder)
class_images_dir.mkdir(parents=<span class="hljs-literal">True</span>, exist_ok=<span class="hljs-literal">True</span>)

cur_class_images = <span class="hljs-built_in">len</span>(<span class="hljs-built_in">list</span>(class_images_dir.iterdir()))

<span class="hljs-keyword">if</span> cur_class_images &lt; num_class_images:
    pipeline = StableDiffusionPipeline.from_pretrained(
        pretrained_model_name_or_path,
        revision=<span class="hljs-string">&quot;fp16&quot;</span>,
        torch_dtype=torch.float16
    ).to(<span class="hljs-string">&quot;cuda&quot;</span>)
    pipeline.enable_attention_slicing()
    pipeline.set_progress_bar_config(disable=<span class="hljs-literal">True</span>)

    num_new_images = num_class_images - cur_class_images
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Number of class images to sample: <span class="hljs-subst">{num_new_images}</span>.&quot;</span>)

    sample_dataset = PromptDataset(prior_preservation_class_prompt, num_new_images)
    sample_dataloader = torch.utils.data.DataLoader(
        sample_dataset,
        batch_size=sample_batch_size
    )

    <span class="hljs-keyword">for</span> example <span class="hljs-keyword">in</span> tqdm(sample_dataloader, desc=<span class="hljs-string">&quot;Generating class images&quot;</span>):
        images = pipeline(example[<span class="hljs-string">&quot;prompt&quot;</span>]).images

        <span class="hljs-keyword">for</span> i, image <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(images):
            image.save(class_images_dir / <span class="hljs-string">f&quot;<span class="hljs-subst">{example[<span class="hljs-string">&#x27;index&#x27;</span>][i] + cur_class_images}</span>.jpg&quot;</span>)

    <span class="hljs-keyword">del</span> pipeline
    gc.collect()
    <span class="hljs-keyword">with</span> torch.no_grad():
        torch.cuda.empty_cache()

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total number of class images: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(<span class="hljs-built_in">list</span>(class_images_dir.iterdir()))}</span>&quot;</span>)
</code></pre>
<h2 id="مكونات-النموذج">مكوّنات النموذج</h2>
<p>يعتمد تدريب DreamBooth على مكوّنات أساسية مُدرَّبة مسبقًا في Stable Diffusion:</p>
<h3 id="مرمز-النص-clip">مُرمِّز النص (CLIP)</h3>
<p>يعالج الأوامر النصية ويضمّها:</p>
<pre><code class="language-python">text_encoder = CLIPTextModel.from_pretrained(
    pretrained_model_name_or_path,
    subfolder=<span class="hljs-string">&quot;text_encoder&quot;</span>
)
</code></pre>
<h3 id="vae-المرمز-التنوعي">VAE (المُرمِّز التنوّعي)</h3>
<p>يحوّل الصور إلى فضاء كامن مدمج ويعيدها منه من جديد من أجل تدريب فعّال:</p>
<pre><code class="language-python">vae = AutoencoderKL.from_pretrained(
    pretrained_model_name_or_path,
    subfolder=<span class="hljs-string">&quot;vae&quot;</span>
)
</code></pre>
<h3 id="نموذج-u-net">نموذج U-Net</h3>
<p>مكوّن إزالة التشويش الأساسي الذي يحوّل الضوضاء إلى صور:</p>
<pre><code class="language-python">unet = UNet2DConditionModel.from_pretrained(
    pretrained_model_name_or_path,
    subfolder=<span class="hljs-string">&quot;unet&quot;</span>
)
</code></pre>
<p>سُمّيت U-Net بذلك لمعماريتها على هيئة حرف U: فهي تملك مسارًا للتصغير (يحلّل الصورة المشوّشة على مقاييس متعدّدة)، وضيقًا (يفهم السياق العام)، ومسارًا للتكبير (يعيد بناء الصورة ويصقلها خطوة بخطوة).</p>
<h3 id="المقسم-إلى-رموز-tokenizer">المُقسِّم إلى رموز (Tokenizer)</h3>
<p>يحوّل النص إلى معرّفات الرموز:</p>
<pre><code class="language-python">tokenizer = CLIPTokenizer.from_pretrained(
    pretrained_model_name_or_path,
    subfolder=<span class="hljs-string">&quot;tokenizer&quot;</span>
)
</code></pre>
<h2 id="إعداد-التدريب">إعداد التدريب</h2>
<p>اضبط جميع معاملات التدريب:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> argparse <span class="hljs-keyword">import</span> Namespace

args = Namespace(
    pretrained_model_name_or_path=pretrained_model_name_or_path,
    resolution=vae.sample_size,
    center_crop=<span class="hljs-literal">True</span>,
    train_text_encoder=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Can improve results but requires more memory</span>
    instance_data_dir=instance_data_dir,
    instance_prompt=<span class="hljs-string">f&quot;a photo of <span class="hljs-subst">{concept_name}</span>&quot;</span>,
    learning_rate=<span class="hljs-number">5e-06</span>,
    max_train_steps=<span class="hljs-number">300</span>,
    save_steps=<span class="hljs-number">50</span>,
    train_batch_size=<span class="hljs-number">2</span>,
    gradient_accumulation_steps=<span class="hljs-number">2</span>,
    max_grad_norm=<span class="hljs-number">1.0</span>,
    mixed_precision=<span class="hljs-string">&quot;fp16&quot;</span>,  <span class="hljs-comment"># Use mixed precision for faster training</span>
    gradient_checkpointing=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Save memory</span>
    use_8bit_adam=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Lower memory usage</span>
    seed=<span class="hljs-number">3434554</span>,
    with_prior_preservation=<span class="hljs-literal">True</span>,
    prior_loss_weight=prior_loss_weight,
    sample_batch_size=<span class="hljs-number">2</span>,
    class_data_dir=prior_preservation_class_folder,
    class_prompt=prior_preservation_class_prompt,
    num_class_images=num_class_images,
    lr_scheduler=<span class="hljs-string">&quot;constant&quot;</span>,
    lr_warmup_steps=<span class="hljs-number">100</span>,
    output_dir=<span class="hljs-string">&quot;dreambooth-concept&quot;</span>,
)
</code></pre>
<h2 id="دالة-التدريب">دالة التدريب</h2>
<p>تُنفّذ دالة التدريب عملية الضبط الدقيق الكاملة لـ DreamBooth:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">training_function</span>(<span class="hljs-params">text_encoder, vae, unet</span>):
    logger = get_logger(__name__)
    set_seed(args.seed)

    accelerator = Accelerator(
        gradient_accumulation_steps=args.gradient_accumulation_steps,
        mixed_precision=args.mixed_precision,
    )

    <span class="hljs-comment"># Freeze VAE as it&#x27;s not being trained</span>
    vae.requires_grad_(<span class="hljs-literal">False</span>)
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> args.train_text_encoder:
        text_encoder.requires_grad_(<span class="hljs-literal">False</span>)

    <span class="hljs-comment"># Enable gradient checkpointing to save memory</span>
    <span class="hljs-keyword">if</span> args.gradient_checkpointing:
        unet.enable_gradient_checkpointing()
        <span class="hljs-keyword">if</span> args.train_text_encoder:
            text_encoder.gradient_checkpointing_enable()

    <span class="hljs-comment"># Use 8-bit Adam for lower memory usage</span>
    <span class="hljs-keyword">if</span> args.use_8bit_adam:
        <span class="hljs-keyword">import</span> bitsandbytes <span class="hljs-keyword">as</span> bnb
        optimizer_class = bnb.optim.AdamW8bit
    <span class="hljs-keyword">else</span>:
        optimizer_class = torch.optim.AdamW

    <span class="hljs-comment"># Determine parameters to optimize</span>
    params_to_optimize = (
        itertools.chain(unet.parameters(), text_encoder.parameters())
        <span class="hljs-keyword">if</span> args.train_text_encoder
        <span class="hljs-keyword">else</span> unet.parameters()
    )

    optimizer = optimizer_class(
        params_to_optimize,
        lr=args.learning_rate,
    )

    noise_scheduler = DDPMScheduler.from_config(
        args.pretrained_model_name_or_path,
        subfolder=<span class="hljs-string">&quot;scheduler&quot;</span>
    )

    <span class="hljs-comment"># Create the dataset</span>
    train_dataset = DreamBoothDataset(
        instance_data_dir=args.instance_data_dir,
        instance_prompt=args.instance_prompt,
        class_data_root=args.class_data_dir <span class="hljs-keyword">if</span> args.with_prior_preservation <span class="hljs-keyword">else</span> <span class="hljs-literal">None</span>,
        class_prompt=args.class_prompt,
        tokenizer=tokenizer,
        size=args.resolution,
        center_crop=args.center_crop,
    )

    <span class="hljs-comment"># Training loop continues...</span>
</code></pre>
<p>يكرّر حلقة التدريب ما يلي:</p>
<ol>
<li>ترميز الصور إلى التمثيلات الكامنة (latents)</li>
<li>إضافة الضوضاء</li>
<li>التنبّؤ بالضوضاء باستخدام U-Net</li>
<li>حساب الفقد (loss) مع الحفاظ على المقدّمات</li>
<li>انتشار التدرّجات عكسيًا (backpropagation)</li>
<li>تحديث أوزان النموذج</li>
</ol>
<h2 id="تشغيل-التدريب">تشغيل التدريب</h2>
<p>نفّذ التدريب مع توليد صور الصف بالشكل الصحيح:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> accelerate

<span class="hljs-comment"># Ensure class images are generated before training</span>
<span class="hljs-keyword">if</span> args.with_prior_preservation:
    class_images_dir = Path(args.class_data_dir)
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> class_images_dir.exists():
        class_images_dir.mkdir(parents=<span class="hljs-literal">True</span>)

    cur_class_images = <span class="hljs-built_in">len</span>(<span class="hljs-built_in">list</span>(class_images_dir.iterdir()))
    <span class="hljs-keyword">if</span> cur_class_images &lt; args.num_class_images:
        <span class="hljs-comment"># Generate missing class images</span>
        pipeline = StableDiffusionPipeline.from_pretrained(
            args.pretrained_model_name_or_path,
            revision=<span class="hljs-string">&quot;fp16&quot;</span>,
            torch_dtype=torch.float16
        ).to(<span class="hljs-string">&quot;cuda&quot;</span>)

        <span class="hljs-comment"># Generate and save images...</span>

<span class="hljs-comment"># Launch training</span>
accelerate.notebook_launcher(
    training_function,
    args=(text_encoder, vae, unet)
)

<span class="hljs-comment"># Clean up memory</span>
<span class="hljs-keyword">for</span> param <span class="hljs-keyword">in</span> itertools.chain(unet.parameters(), text_encoder.parameters()):
    <span class="hljs-keyword">if</span> param.grad <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
        <span class="hljs-keyword">del</span> param.grad
torch.cuda.empty_cache()
</code></pre>
<h2 id="استخدام-النموذج-المضبط-بدقة">استخدام النموذج المضبط بدقة</h2>
<p>حمّل نموذجك المخصّص واستخدمه:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> diffusers <span class="hljs-keyword">import</span> DiffusionPipeline

<span class="hljs-comment"># Load the fine-tuned pipeline</span>
model_path = args.output_dir
pipe = DiffusionPipeline.from_pretrained(
    model_path,
    torch_dtype=torch.float16
).to(<span class="hljs-string">&quot;cuda&quot;</span>)

<span class="hljs-comment"># Generate new images of your subject</span>
suffix = <span class="hljs-string">&quot;in space&quot;</span>  <span class="hljs-comment"># @param {&quot;type&quot;:&quot;string&quot;}</span>
prompt = <span class="hljs-string">f&quot;a photo of <span class="hljs-subst">{concept_name}</span> <span class="hljs-subst">{suffix}</span>&quot;</span>

image = pipe(
    prompt,
    num_inference_steps=<span class="hljs-number">50</span>,
    guidance_scale=<span class="hljs-number">7.5</span>
).images[<span class="hljs-number">0</span>]

image
</code></pre>
<h2 id="lora-مقابل-الضبط-الدقيق-الكامل">LoRA مقابل الضبط الدقيق الكامل</h2>
<h3 id="الضبط-الدقيق-الكامل">الضبط الدقيق الكامل</h3>
<p>يحدّث جميع أوزان النموذج، ويُنتج أعلى جودة لكنه يتطلّب ذاكرة وتخزينًا كبيرين.</p>
<h3 id="lora-التكيف-من-الرتبة-المنخفضة">LoRA (التكيّف من الرتبة المنخفضة)</h3>
<p>يضيف مصفوفات صغيرة قابلة للتدريب إلى جانب الأوزان المجمّدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> peft <span class="hljs-keyword">import</span> LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=<span class="hljs-number">4</span>,  <span class="hljs-comment"># Rank</span>
    lora_alpha=<span class="hljs-number">32</span>,
    target_modules=[<span class="hljs-string">&quot;to_k&quot;</span>, <span class="hljs-string">&quot;to_q&quot;</span>, <span class="hljs-string">&quot;to_v&quot;</span>, <span class="hljs-string">&quot;to_out.0&quot;</span>],
    lora_dropout=<span class="hljs-number">0.1</span>,
)

model = get_peft_model(unet, lora_config)
<span class="hljs-comment"># Now only LoRA parameters are trainable</span>
</code></pre>
<p>ومن المزايا أن عدد المعاملات المطلوب تدريبها أقل بـ100×، مع تمثيل مواضيع متعدّدة كمُوصِّلات منفصلة، وسهولة المشاركة (ميجابايت مقابل جيجابايت).</p>
<h2 id="المعاملات-الفائقة-وأفضل-الممارسات">المعاملات الفائقة وأفضل الممارسات</h2>
<h3 id="معدل-التعلم">معدّل التعلّم</h3>
<ul>
<li><strong>مرتفع جدًا (&gt;1e-5)</strong>: فرط التأقلم وشوائب في المخرجات</li>
<li><strong>منخفض جدًا (&lt;1e-7)</strong>: تقارب بطيء</li>
<li><strong>النقطة المثلى</strong>: من 2e-6 إلى 5e-6</li>
</ul>
<h3 id="خطوات-التدريب">خطوات التدريب</h3>
<ul>
<li><strong>100-200</strong>: تكيّف خفيف</li>
<li><strong>300-500</strong>: توازن</li>
<li><strong>500 فما فوق</strong>: خطر فرط التأقلم</li>
</ul>
<h3 id="وزن-الحفاظ-على-المقدمات">وزن الحفاظ على المقدّمات</h3>
<ul>
<li><strong>0.5</strong>: توازن قياسي</li>
<li><strong>أعلى</strong>: أكثر عمومية وأقلّ تحديدًا</li>
<li><strong>أدنى</strong>: أدقّ تحديدًا مع خطر فرط التأقلم</li>
</ul>
<h2 id="نظافة-مجموعة-البيانات">نظافة مجموعة البيانات</h2>
<p>اضمن جودة بيانات التدريب:</p>
<ul>
<li><strong>زوايا متنوعة</strong>: أمامية، جانبية، وتعبيرات متعدّدة</li>
<li><strong>جودة متّسقة</strong>: صور حادّة واضحة الإضاءة</li>
<li><strong>خلفيات نظيفة</strong>: تجنّب العناصر المزدحمة أو المشتّتة</li>
<li><strong>بلا علامات مائية</strong>: قد تربك النموذج</li>
<li><strong>اتجاه صحيح</strong>: تحقّق من بيانات EXIF</li>
</ul>
<h2 id="بروتوكول-التقييم">بروتوكول التقييم</h2>
<p>عرّف أوامر الاختبار لتفحص أداء نموذجك:</p>
<pre><code class="language-python">test_prompts = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{concept_name}</span> as a superhero&quot;</span>,
    <span class="hljs-string">f&quot;<span class="hljs-subst">{concept_name}</span> in Van Gogh style&quot;</span>,
    <span class="hljs-string">f&quot;<span class="hljs-subst">{concept_name}</span> wearing a tuxedo&quot;</span>,
    <span class="hljs-string">f&quot;<span class="hljs-subst">{concept_name}</span> in ancient Rome&quot;</span>,
]

<span class="hljs-keyword">for</span> prompt <span class="hljs-keyword">in</span> test_prompts:
    image = pipe(prompt, generator=torch.Generator(<span class="hljs-string">&quot;cuda&quot;</span>).manual_seed(<span class="hljs-number">42</span>)).images[<span class="hljs-number">0</span>]
    <span class="hljs-comment"># Save or display image</span>
</code></pre>
<h2 id="استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</h2>
<blockquote>
<p><strong>انزياح الهوية</strong></p>
<p>إن لم يبدُ الموضوع مطابقًا لصورتك الأصلية، زد وزن الحفاظ على المقدّمات، أو أضف صور موضوع أكثر تنوعًا، أو قلّل معدّل التعلّم.</p>
</blockquote>
<blockquote>
<p><strong>مؤشرات فرط التأقلم</strong></p>
<p>إن كانت الخلفيات تبدو دائمًا واحدة أو أن الوضعيات محدودة، فقلّل خطوات التدريب، أو أضف صور صف أكثر، أو استخدم نقاط تفتيش (checkpoints) أسبق.</p>
</blockquote>
<blockquote>
<p><strong>مشكلات الذاكرة</strong></p>
<p>فعّل تفتيش التدرّجات (gradient checkpointing)، واستخدم LoRA بدل الضبط الدقيق الكامل، أو قلّل حجم الدفعة، أو استخدم مُحسِّنات بدقّة 8-bit.</p>
</blockquote>
<h2 id="الأخلاقيات-والسلامة">الأخلاقيات والسلامة</h2>
<ul>
<li><strong>الموافقة</strong>: احصل دائمًا على إذن عند التدريب على ملامح الأشخاص</li>
<li><strong>النسب</strong>: احترم رخص النماذج الأصلية</li>
<li><strong>الإساءة</strong>: تجنّب إنشاء محتوى مضلّل أو ضار</li>
<li><strong>التحيّز</strong>: انتبه إلى التحيّزات الموروثة من النماذج الأساسية</li>
</ul>
<h2 id="الخلاصة">الخلاصة <span class="content-anchor" id="conclusion"></span></h2>
<p>يمكّن DreamBooth من تحقيق تخصيص قوي لنماذج الانتشار باستخدام عدد قليل من الصور. ويعتمد النجاح على موازنة شدّة التدريب بالحفاظ على المقدّمات، وعلى استخدام صور متنوّعة عالية الجودة، وعلى ضبط المعاملات الفائقة بعناية. ابدأ بإعدادات متحفّظة ثم كرّر المحاولة. وفكّر في LoRA لتدريب فعّال ونشر سهل. وبإعداد سليم، يمكنك إنشاء نماذج تعيد إنتاج المواضيع بدقّة في سياقات جديدة مع الحفاظ على القدرات الإبداعية للنموذج الأساسي.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li>DreamBooth (Ruiz وآخرون، 2022): <a href="https://arxiv.org/abs/2208.12242">https://arxiv.org/abs/2208.12242</a></li>
<li>Diffusers — تدريب DreamBooth: <a href="https://huggingface.co/docs/diffusers/main/en/training/dreambooth">https://huggingface.co/docs/diffusers/main/en/training/dreambooth</a></li>
<li>التوجيه بلا مصنّف (Classifier-Free Guidance): <a href="https://arxiv.org/abs/2207.12598">https://arxiv.org/abs/2207.12598</a></li>
<li>LoRA (Hu وآخرون، 2021): <a href="https://arxiv.org/abs/2106.09685">https://arxiv.org/abs/2106.09685</a></li>
</ul>
`,r={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,r as default,p as headings,t as html,e as slug,l as title};
