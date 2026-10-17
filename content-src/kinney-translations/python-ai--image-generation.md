---
title: "توليد الصور من النص (Stable Diffusion)"
---

> **أهم الاستنتاجات**
>
> - يزيل Stable Diffusion التشويش من الكوامن (latents) المشروطة بالنص؛ ويفكّ VAE ترميزها إلى بكسلات
> - يوازن التوجيه بلا مصنّف (classifier-free) بين الالتزام بالأوامر والواقعية (اضبط CFG)
> - تقايض المجدولات (schedulers) بين السرعة والتفاصيل؛ وعدد الخطوات يتفاعل مع اختيار المجدول
> - استخدم دقّات كامنة صالحة (مضاعفات)، وصُغ أوامر إيجابية/سلبية، واضبط البذور (seeds)
> - حسّن الذاكرة: انتباه فعّال، والتقطيع (slicing)، وصيغة channels-last، والدقة المختلطة

## نظرة عامة

يولّد Stable Diffusion الصور من النص باستخدام عملية انتشار كامنة (latent diffusion) يوجّهها مُرمِّز نصي وشبكة UNet لإزالة التشويش. وخلافًا لنماذج التصنيف التي تحلّل صورًا موجودة، تُنشئ نماذج الانتشار صورًا جديدة من الضوضاء.

فكّر في Stable Diffusion ككتاب تلوين سحري فائق الذكاء: تهمس له بالصورة التي تريدها—قل مثلًا «ديناصور أرجواني يأكل مثلجات على سطح القمر»—فيبدأ كتاب التلوين بصفحة مغطاة بخربشات عبثية (مجرد نقاط عشوائية). ثم، وكأن ممحاة وقلم تلوين يعملان معًا، يظل يمسح النقاط الفوضوية بلطف ويضيف الألوان والأشكال الصحيحة شيئًا فشيئًا، وهو يصغي إلى كلماتك طوال الوقت، حتى تتحول الفوضى العشوائية إلى الصورة التي طلبتها بالضبط.

## دفتر الملاحظات

اطّلع على دفتر الملاحظات المرافق: [توليد الصور](https://colab.research.google.com/drive/15s90EDiGZCFqhkc54bV6lAenLqmevTD3?usp=sharing)

## تهيئة Stable Diffusion

أولًا، ثبّت الاعتمادات اللازمة واستوردها:

```python
# Install dependencies
!pip install --quiet "diffusers[torch]" transformers accelerate safetensors

import torch
from diffusers import AutoPipelineForText2Image, DPMSolverMultistepScheduler

# Set up device and generator for reproducibility
device = "cuda" if torch.cuda.is_available() else "cpu"
generator = torch.Generator(device).manual_seed(1337)
```

## توليد صورتك الأولى

حمّل نموذج Stable Diffusion وولّد صورة:

```python
model_id = "stable-diffusion-v1-5/stable-diffusion-v1-5"

pipeline = AutoPipelineForText2Image.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    use_safetensors=True,
    low_cpu_mem_usage=True
).to(device)

# Swap to a faster scheduler
pipeline.scheduler = DPMSolverMultistepScheduler.from_config(
    pipeline.scheduler.config
)

# Memory-saving optimizations
pipeline.enable_attention_slicing()    # Chunk cross-attention
pipeline.enable_vae_slicing()          # Same for VAE decoder
pipeline.enable_model_cpu_offload()    # Swap idle layers to CPU

prompt = "A pygmy hippo in New York City watching Instagram on an iPhone"

image = pipeline(
    prompt,
    num_inference_steps=50,
    guidance_scale=7.5,
    generator=generator,
).images[0]

image
```

## مكوّنات البنية

يتكوّن Stable Diffusion من أربعة مكوّنات رئيسية تعمل معًا:

**المُرمِّز النصي** (Text Encoder) وهو CLIP، ويحوّل أمرك إلى تمثيلات متجهية (embeddings) تشترط عمل مزيل التشويش. وهو يفهم المعنى الدلالي لكلماتك.

**مزيل التشويش UNet** هو النحّات الذي يتوقّع الضوضاء ويزيلها مرارًا عند كل خطوة انتشار. وهو شبكة عصبية مُدرَّبة على تحويل الضوضاء العشوائية تدريجيًا إلى صور ذات معنى بناءً على التوجيه النصي.

**VAE (المُرمِّز التلقائي التغايري)** يترجم بين فضاء البكسل وفضاء الكوامن. يضغط المُرمِّز الصور إلى تمثيلات كامنة أصغر للمعالجة بكفاءة، بينما يعيد المفكّك بناء صور كاملة الدقة من الكوامن.

**المجدول** (Scheduler) يتحكّم في جدول الضوضاء وقاعدة التحديث. وتقدّم المجدولات المختلفة (DDIM، Euler، DPM++) مقايضات بين السرعة والجودة.

## فهم نماذج الانتشار

تُنشئ نماذج الانتشار الصور بإزالة الضوضاء تدريجيًا من أنماط عشوائية:

**العملية الأمامية**: خذ صورة واضحة وأضف إليها الضوضاء تدريجيًا حتى تصبح ضوضاء عشوائية خالصة.

**العملية العكسية**: درّب نموذجًا على عكس ذلك—ابدأ بالضوضاء وأزلها تدريجيًا لإنشاء صورة.

سُمّيت شبكة U-Net بهذا الاسم بسبب معماريتها على شكل حرف U: فلديها مسار لتقليل الدقة (يحلّل الصورة المشوّشة على مقاييس متعدّدة)، وعنق زجاجة (يفهم السياق الكلي)، ومسار لزيادة الدقة (يعيد بناء الصورة محسّنًا إياها خطوة بخطوة).

## المعاملات الرئيسية

### الجودة مقابل السرعة

تحكّم في المقايضة بين جودة التوليد والسرعة:

```python
# Fewer steps = faster, lower quality
quick_image = pipeline(prompt, num_inference_steps=10)

# More steps = slower, higher quality
quality_image = pipeline(prompt, num_inference_steps=50)

# Guidance scale controls prompt adherence
creative_image = pipeline(prompt, guidance_scale=3.0)   # More creative
strict_image = pipeline(prompt, guidance_scale=15.0)    # Stricter to prompt
```

**`num_inference_steps`**: من 10 إلى 50 خطوة، والأقل أسرع. **`guidance_scale`**: من 1 إلى 15، والأعلى يعني وفاءً أكبر للنص لكن قد يكون أكثر تصلّبًا. **`width/height`**: التزم بمضاعفات 64؛ فالأحجام الأكبر تحتاج VRAM أكثر.

### فهم المولّد

يوفّر المولّد عشوائية قابلة لإعادة الإنتاج:

```python
# Creates a random number generator on your GPU/CPU
generator = torch.Generator(device).manual_seed(1337)

# Same seed = same initial noise = same final image
# Different seed = different image
```

مرّر هذا المولّد إلى الأنبوب (pipeline) للحصول على نتائج متطابقة عبر التشغيلات. واحذف البذرة أو غيّرها للحصول على تنوّع.

## هندسة الأوامر

تعتمد جودة الصور المولَّدة اعتمادًا كبيرًا على طريقة كتابتك للأوامر. ويتضمّن الأمر الجيد عادةً:

1. **الموضوع**: ما أو مَن في الصورة
2. **الأسلوب**: الطراز الفني أو الوسيط أو التقنية
3. **محدّدات الجودة**: كلمات تعزّز الجودة
4. **الإضاءة**: كيفية إضاءة المشهد
5. **التكوين**: زاوية الكاميرا والتأطير
6. **التفاصيل**: صفات أو خصائص محدّدة

```python
# Basic prompt
basic_prompt = "a cat"

# Detailed prompt
detailed_prompt = """
Ultra-realistic cinematic photo of a fluffy Persian cat sitting on a vintage
velvet armchair, golden hour lighting streaming through Victorian windows,
85mm lens, shallow depth of field, shot on Kodak Portra 400, 8K resolution
"""

# Generate with both
basic_image = pipeline(basic_prompt).images[0]
detailed_image = pipeline(detailed_prompt).images[0]
```

## الأوامر السلبية

تخبر الأوامر السلبية النموذج بما يجب تجنّبه. ففي التوجيه بلا مصنّف، يزيل النموذج التشويش مرتين عند كل خطوة—مرة بأمرك الإيجابي ومرة بأمر غير مشروط. ويحلّ الأمر السلبي محلّ ذلك الأمر غير المشروط الفارغ، فيبعد النموذج بنشاط عن المفاهيم غير المرغوبة:

```python
model_id = "stabilityai/stable-diffusion-xl-base-1.0"

pipeline = AutoPipelineForText2Image.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    use_safetensors=True,
).to(device)

pipeline.scheduler = DPMSolverMultistepScheduler.from_config(
    pipeline.scheduler.config
)
pipeline.enable_attention_slicing()

# Positive prompt - what you want
prompt = (
    "Ultra-realistic cinematic photo of a pygmy hippo jaywalking through "
    "a neon-lit downtown street at dusk, rain-soaked asphalt reflecting "
    "colored lights, 85mm lens, f/1.4 bokeh, dramatic rim lighting, "
    "shot on Kodak Portra 800, 8K resolution"
)

# Negative prompt - what to avoid
negative_prompt = (
    "blurry, grainy, lowres, overexposed, watermark, text, logo, "
    "extra limbs, cars, people, distorted anatomy, jpeg artifacts"
)

image = pipeline(
    prompt=prompt,
    negative_prompt=negative_prompt,
    num_inference_steps=28,
    guidance_scale=7.0,
    width=512,
    height=512,
    generator=generator,
).images[0]
```

الأثر الرياضي هو أن النموذج يبتعد بنشاط عن المفاهيم الواردة في الأمر السلبي، ما يقلّل التشوهات والعناصر غير المرغوبة.

## المجدولات ومقايضاتها

تقدّم المجدولات المختلفة مزايا مختلفة:

```python
from diffusers import (
    DDIMScheduler,
    EulerDiscreteScheduler,
    DPMSolverMultistepScheduler,
    HeunDiscreteScheduler
)

# DPMSolverMultistep - Fast and high quality
pipeline.scheduler = DPMSolverMultistepScheduler.from_config(
    pipeline.scheduler.config
)

# Euler - Good for artistic styles
pipeline.scheduler = EulerDiscreteScheduler.from_config(
    pipeline.scheduler.config
)

# DDIM - Deterministic, good for reproducibility
pipeline.scheduler = DDIMScheduler.from_config(
    pipeline.scheduler.config
)
```

**DPMSolverMultistep** يشبه امتلاك كتيّب تعليمات ذكي يجد طرقًا مختصرة، فيُظهر الصور أسرع دون فقدان الجودة. **Euler/Euler A** غالبًا ما يمنح تفاصيل حادّة. **DDIM** يمكن أن يكون أسرع بخطوات أقل. **متغيّرات DPM++** تقدّم تفاصيل جيدة واستقرارًا.

## تحسينات الذاكرة

### تقطيع الانتباه

يعالج تقطيع الانتباه الصورة على شكل أجزاء أصغر بدلًا من معالجتها كلها دفعة واحدة:

```python
# Instead of processing the whole image at once
pipeline.enable_attention_slicing()

# The model looks at one small chunk at a time
# Like coloring one square of a grid at a time
```

وهذا يمنع نفاد ذاكرة GPU لديك مع بناء الصورة الكاملة رغم ذلك.

### تحسينات إضافية

```python
# VAE slicing - process VAE in chunks
pipeline.enable_vae_slicing()

# CPU offloading - swap unused layers to CPU
pipeline.enable_model_cpu_offload()

# Channels-last memory format for CUDA
pipeline.unet.to(memory_format=torch.channels_last)

# Mixed precision with autocast
with torch.autocast("cuda"):
    image = pipeline(prompt).images[0]
```

## متغيّرات النموذج

تقدّم النماذج المختلفة نقاط قوة مختلفة:

- **`runwayml/stable-diffusion-v1-5`**: الإصدار الكلاسيكي SD 1.5—سريع ومتعدّد الاستخدامات
- **`stabilityai/stable-diffusion-2-1`**: الإصدار SD 2.1—وجوه أفضل ودقة أعلى
- **`stabilityai/stable-diffusion-xl-base-1.0`**: الإصدار SDXL—أعلى جودة لكن أبطأ
- **`prompthero/openjourney`**: بأسلوب Midjourney
- **`hakurei/waifu-diffusion`**: بأسلوب الأنمي
- **`nitrosocke/Ghibli-Diffusion`**: بأسلوب استوديو Ghibli

```python
# Load a specialized model
anime_pipeline = AutoPipelineForText2Image.from_pretrained(
    "hakurei/waifu-diffusion",
    torch_dtype=torch.float16
).to(device)

anime_image = anime_pipeline(
    "anime girl with blue hair in cherry blossom garden",
    num_inference_steps=30
).images[0]
```

## التوجيه بلا مصنّف (CFG)

يضخّم CFG الفرق بين التوقّعات المشروطة وغير المشروطة:

`predicted_noise = uncond + s * (cond - uncond)`

حيث `s` هو مقياس التوجيه. تجعل القيم الأعلى النموذج يتبع أمرك بصرامة أكبر لكنها قد تؤدي إلى إفراط في التشبّع أو تشوهات. ويوازن CFG المعتدل (من 5 إلى 9 للإصدار SD 1.5، ونطاقات مختلفة لـ SDXL) بين الوفاء والطبيعية.

## الدقة ونسب الأبعاد

تعمل الكوامن بدقة أقل من البكسلات (تقليل بمقدار 64× في الإصدار SD 1.5). ويجب أن تكون الأبعاد الصالحة مضاعفات لعامل تقليل الدقة في النموذج:

```python
# Valid resolutions for SD 1.5 (multiples of 64)
resolutions = [
    (512, 512),    # Square
    (768, 512),    # Landscape
    (512, 768),    # Portrait
    (640, 512),    # Wide
]

for width, height in resolutions:
    image = pipeline(
        prompt,
        width=width,
        height=height
    ).images[0]
```

ابدأ بأحجام معتدلة (512×512)، ثم زد الدقة بمكبّرات (upscalers) مخصّصة عند الحاجة.

## السلامة والأخلاقيات

استخدم أدوات فحص السلامة ومرشّحات المحتوى بمسؤولية:

```python
# Safety checker is included by default
# To disable (use responsibly):
pipeline.safety_checker = None

# Or create custom filters
def custom_safety_check(images, **kwargs):
    # Your safety logic here
    return images, [False] * len(images)

pipeline.safety_checker = custom_safety_check
```

احترم التراخيص وسياسات الاستخدام. وتجنّب نسخ الأساليب المسمّاة لفنانين أحياء إلا إذا كان ذلك مسموحًا؛ وفضّل الأوصاف العامة. وكن على وعي بالتحيّزات المحتملة في المحتوى المولَّد.

## اعتبارات العتاد

### إعدادات CUDA

فعّل التحسينات للحصول على أداء أفضل:

```python
import torch
torch.backends.cudnn.benchmark = True
# Use autocast for fp16/bf16 when running custom inference loops
```

### التوليد بالدفعات

ولّد صورًا متعدّدة بكفاءة:

```python
# Generate batch of images
batch_size = 4
prompts = [prompt] * batch_size

images = pipeline(
    prompts,
    num_inference_steps=30,
    generator=[torch.Generator(device).manual_seed(i) for i in range(batch_size)]
).images
```

## قابلية إعادة الإنتاج والبذور

اضبط البذور للحصول على نتائج قابلة لإعادة الإنتاج:

```python
# Fixed seed for reproducibility
seed = 42
generator = torch.Generator(device).manual_seed(seed)

# Generate multiple variations
seeds = [42, 123, 456, 789]
images = []

for seed in seeds:
    gen = torch.Generator(device).manual_seed(seed)
    image = pipeline(prompt, generator=gen).images[0]
    images.append(image)
```

## استكشاف المشكلات الشائعة وإصلاحها

> **الإفراط في التشبّع**
>
> إذا بدت الصور باهتة أو مشبَعة بإفراط، فقلّل مقياس التوجيه أو جرّب مجدولًا مختلفًا.

> **تجاهل الأمر**
>
> إذا تجاهل النموذج أجزاء من أمرك، فجرّب زيادة مقياس التوجيه، أو إعادة الصياغة بمفاهيم أوضح، أو استخدام نقطة تحقق (checkpoint) مختلفة للنموذج.

> **الأنماط المتكرّرة**
>
> للتشوهات أو الأنماط المتكرّرة، جرّب بذورًا مختلفة، أو أضف أوامر سلبية للتشوهات الشائعة، أو عدّل عدد خطوات الاستدلال.

## تقنيات متقدّمة

### ترجيح الأوامر

تدعم بعض الواجهات ترجيح الأوامر، وإن كان Diffusers الأساسي لا يدعمه مباشرة:

```python
# Conceptual - requires custom implementation
weighted_prompt = "(beautiful:1.2) sunset over (calm:0.8) ocean"
```

### دمج نقاط التحقق

اجمع نقاط قوة نماذج مختلفة:

```python
# Conceptual - requires model merging tools
merged_model = merge_models(
    model_a="stable-diffusion-v1-5",
    model_b="custom-style-model",
    alpha=0.5  # Blend ratio
)
```

## الخاتمة

يُتيح Stable Diffusion توليد الصور للجميع، فيمكّن أي شخص من إنشاء مرئيات مذهلة من أوصاف نصية. ويعتمد النجاح على فهم التفاعل بين الأوامر والمعاملات وقدرات النموذج. ابدأ بنماذج مُجرَّبة وإعدادات افتراضية، ثم جرّب الأوامر والمجدولات والمعاملات لتجد ما يناسب حالة استخدامك. وتذكّر أن التوليد احتمالي—فاغتنم التغيّر واستخدم البذور عندما تحتاج إلى الاتساق.

## قراءات إضافية

- نماذج الانتشار الكامن (Rombach وآخرون، 2022): [https://arxiv.org/abs/2112.10752](https://arxiv.org/abs/2112.10752)
- التوجيه بلا مصنّف (Ho وSalimans، 2021): [https://arxiv.org/abs/2207.12598](https://arxiv.org/abs/2207.12598)
- Stable Diffusion XL: [https://arxiv.org/abs/2307.01952](https://arxiv.org/abs/2307.01952)
- Diffusers — توليد الصور من النص: [https://huggingface.co/docs/diffusers/main/en/using-diffusers/conditional_image_generation](https://huggingface.co/docs/diffusers/main/en/using-diffusers/conditional_image_generation)
- Diffusers — المجدولات: [https://huggingface.co/docs/diffusers/main/en/using-diffusers/schedulers](https://huggingface.co/docs/diffusers/main/en/using-diffusers/schedulers)
