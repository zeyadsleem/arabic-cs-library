---
title: "التحويلات من صورة إلى صورة (Image-to-Image)"
---

> **أهم الاستنتاجات**
>
> - يبدأ التوليد من صورة إلى صورة من صور مصدر مشوّشة جزئيًا، لا من ضوضاء خالصة
> - يتحكّم معامل القوة (strength) في درجة التحوّل: صفر يعني الأصلية وواحد تعني الجديدة
> - حافظ على التكوين بقوة أقل، وغيّر الأسلوب بقيم أعلى
> - طابِق دقة التمثيل الكامن (latent)، وجهّز الصور مسبقًا لنتائج أفضل
> - يصلح لنقل الأسلوب، والتحرير، وإنشاء التنويعات، ومهام التكبير

## نظرة عامة

يحوّل التوليد من صورة إلى صورة الصور الموجودة باستخدام أوامر نصية، مع الحفاظ على جوانب من الأصلية أثناء إدخال عناصر جديدة. وخلافًا للتوليد من نص إلى صورة الذي يبدأ من ضوضاء عشوائية، يبدأ هذا النوع من صورتك المصدر، فيمنحك سيطرة إبداعيًا على مقدار ما تحفظه مقابل مقدار ما تحوّله.

فكّر فيه كإعادة ترميم منزل بدل بنائه من الصفر. أنت تحفظ الأساس والبنية (أي التكوين)، لكن يمكنك تغيير الأسلوب والألوان والتفاصيل. ومعامل القوة (strength) يشبه الاختيار بين تجديد خفيف (طلاء جديد) أو تجديد شامل (كل شيء جديد).

## دفتر الملاحظات

اطّلع على دفتر الملاحظات المرافق: [تحويلات من صورة إلى صورة](https://colab.research.google.com/drive/1iI-RKtZOkL4DbaJKCIHIqkati3D1Yv_7?usp=sharing)

## تهيئة خط المعالجة

ثبّت الاعتمادات وحمّل خط المعالجة (pipeline) المخصّص للصور من صورة إلى صورة:

```python
!pip install -q diffusers transformers accelerate

import torch
from diffusers import AutoPipelineForImage2Image
from PIL import Image
import requests
from io import BytesIO

# Load the pipeline
pipeline = AutoPipelineForImage2Image.from_pretrained(
    "stable-diffusion-v1-5/stable-diffusion-v1-5",
    torch_dtype=torch.float16,
    use_safetensors=True,
).to("cuda")

# Load an example image
img_url = "https://example.com/your-image.jpg"
response = requests.get(img_url)
init_image = Image.open(BytesIO(response.content)).convert("RGB")
init_image = init_image.resize((512, 512))
```

## معامل القوة

يحدّد معامل القوة مقدار ما تحفظه من صورتك الأصلية مقابل مقدار الحرية التي يملكها النموذج لتغييرها. ويُقابل المعامل موقع انطلاق العملية على مسار الانتشار: القوة العالية تُحقن ضوضاء أكثر (تغيّر أكبر)، والقوة المنخفضة تحافظ على البنية (تغيّر أقل).

```python
prompt = "A oil painting of a landscape in impressionist style"

# Low strength - minimal changes
light_edit = pipeline(
    prompt=prompt,
    image=init_image,
    strength=0.3,
    guidance_scale=7.5
).images[0]

# Medium strength - balanced transformation
balanced_edit = pipeline(
    prompt=prompt,
    image=init_image,
    strength=0.5,
    guidance_scale=7.5
).images[0]

# High strength - major transformation
heavy_edit = pipeline(
    prompt=prompt,
    image=init_image,
    strength=0.8,
    guidance_scale=7.5
).images[0]
```

**قوة = 0.0**: تُعيد الصورة الأصلية دون أي تغيير. **قوة = 0.3**: تحريرات خفيفة تتغيّر معها الألوان والقوامات. **قوة = 0.5**: تغيّرات أسلوبية متوازنة. **قوة = 0.8**: تحوّل قوي قد يمسّ التكوين. **قوة = 1.0**: يعادل تقريبًا التوليد من نص إلى صورة.

## كيف يعمل

تختلف العملية عن التوليد من نص إلى صورة في جانب حاسم:

1. **الترميز**: تُرمَّز صورتك إلى الفضاء الكامن ب помощью مُرمِّز VAE
2. **إضافة الضوضاء**: تُضاف ضوضاء بناءً على معامل القوة
3. **إزالة التشويش**: تزيل شبكة U-Net الضوضاء تحت توجيه أمرك النصي
4. **فك الترميز**: يحوّل مفكّك VAE النتيجة عائدًا إلى صورة

عند قوة تساوي 0.5، يُشغّل النموذج آخر 50% فقط من خطوات إزالة التشويش. وتبدأ صورتك في منتصف مسار إزالة التشويش، لا من ضوضاء خالصة:

```python
# Understanding the math
total_steps = 50
strength = 0.5
start_step = int(total_steps * (1 - strength))  # Start at step 25
# Model runs steps 25-50, preserving early structure
```

## تطبيقات عملية

### نقل الأسلوب

حوّل الصور الفوتوغرافية إلى أساليب فنية مختلفة مع الحفاظ على التكوين:

```python
# Load a photo
photo = Image.open("landscape_photo.jpg").resize((512, 512))

styles = [
    "oil painting in the style of Van Gogh",
    "watercolor painting with soft edges",
    "pencil sketch with cross-hatching",
    "digital art in cyberpunk style"
]

styled_images = []
for style_prompt in styles:
    result = pipeline(
        prompt=style_prompt,
        image=photo,
        strength=0.6,
        guidance_scale=7.5
    ).images[0]
    styled_images.append(result)
```

### تعديل العناصر

غيّر عناصر محدّدة مع إبقاء بقية العناصر سليمة:

```python
# Original: photo of a red car
prompt = "A blue car on a city street"

modified = pipeline(
    prompt=prompt,
    image=car_photo,
    strength=0.4,  # Lower strength to preserve composition
    guidance_scale=10,  # Higher guidance for prompt adherence
    negative_prompt="red, distorted, blurry"
).images[0]
```

### إنشاء التنويعات

ولّد نسخًا متعددة من المفهوم نفسه:

```python
prompt = "professional product photography of a watch"
variations = []

for i in range(4):
    generator = torch.Generator("cuda").manual_seed(i)
    variant = pipeline(
        prompt=prompt,
        image=watch_image,
        strength=0.35,
        generator=generator
    ).images[0]
    variations.append(variant)
```

## الحفاظ على التكوين

تساعد الأوامر التي تذكر العناصر والعلاقات بينها في الحفاظ على التخطيط. أما للحفاظ الصارم على البنية فادمجها مع أساليب التحكّم متى كانت متاحة:

```python
# Include spatial information in prompt
spatial_prompt = (
    "Mountain in the background, lake in the middle ground, "
    "trees in the foreground, sunset lighting"
)

# Use negative prompts to prevent unwanted changes
result = pipeline(
    prompt=spatial_prompt,
    image=landscape,
    strength=0.5,
    negative_prompt="cluttered, distorted perspective, warped"
).images[0]
```

## التنقيح التدريجي

طبّق ممرات متعددة بقوة متناقصة للحصول على تحرير منضبط:

```python
def progressive_edit(image, prompt, strengths=[0.6, 0.4, 0.2]):
    current_image = image

    for strength in strengths:
        current_image = pipeline(
            prompt=prompt,
            image=current_image,
            strength=strength,
            guidance_scale=7.5
        ).images[0]

    return current_image

# Gradually transform the image
final = progressive_edit(
    init_image,
    "ethereal fantasy landscape with glowing crystals"
)
```

## التحرير بالقناع (Inpainting)

لأجل التعديلات المحلية الدقيقة، استخدم خطوط معالجة التحرير بالقناع:

```python
from diffusers import AutoPipelineForInpainting

inpaint_pipe = AutoPipelineForInpainting.from_pretrained(
    "runwayml/stable-diffusion-inpainting",
    torch_dtype=torch.float16
).to("cuda")

# Create a mask (white = edit, black = preserve)
mask = Image.new("L", (512, 512), 0)
# Draw white areas where you want changes

result = inpaint_pipe(
    prompt="a golden crown",
    image=portrait,
    mask_image=mask,
    strength=0.8
).images[0]
```

## مطابقة الدقة

طابِق دائمًا دقة النموذج الأصلية للحصول على أفضل النتائج:

```python
def prepare_image(image, target_size=512):
    # Calculate aspect ratio
    aspect = image.width / image.height

    if aspect > 1:  # Landscape
        new_width = target_size
        new_height = int(target_size / aspect)
    else:  # Portrait or square
        new_height = target_size
        new_width = int(target_size * aspect)

    # Resize maintaining aspect ratio
    resized = image.resize((new_width, new_height), Image.LANCZOS)

    # Pad to square if needed
    if new_width != new_height:
        padded = Image.new("RGB", (target_size, target_size))
        paste_x = (target_size - new_width) // 2
        paste_y = (target_size - new_height) // 2
        padded.paste(resized, (paste_x, paste_y))
        return padded

    return resized
```

## تصوّير القوة مقابل عدد الخطوات

افهم كيف يؤثّر معامل القوة على عملية إزالة التشويش:

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualize the relationship
strengths = np.linspace(0, 1, 11)
total_steps = 50

fig, ax = plt.subplots(figsize=(10, 6))

for strength in strengths:
    start_step = int(total_steps * (1 - strength))
    remaining_steps = total_steps - start_step

    ax.barh(
        strength,
        remaining_steps,
        left=start_step,
        height=0.08,
        label=f"Strength {strength:.1f}"
    )

ax.set_xlabel("Denoising Steps")
ax.set_ylabel("Strength Parameter")
ax.set_title("How Strength Controls the Denoising Process")
ax.set_xlim(0, total_steps)
plt.show()
```

قوة أقل تعني خطوات إزالة تشويش أقل، فتُحفظ نسبة أكبر من الأصلية. وقوة أعلى تعني خطوات أكثر، فيُسمح بتحوّل أكبر.

## التكبير باستخدام الصور من صورة إلى صورة

استخدم التوليد من صورة إلى صورة لتكبير ذكي:

```python
from diffusers import StableDiffusionUpscalePipeline

upscale_pipe = StableDiffusionUpscalePipeline.from_pretrained(
    "stabilityai/stable-diffusion-x4-upscaler",
    torch_dtype=torch.float16
).to("cuda")

# Upscale 4x with enhancement
upscaled = upscale_pipe(
    prompt="high quality, detailed, sharp",
    image=low_res_image,
    num_inference_steps=20
).images[0]
```

## استكشاف الأخطاء وإصلاحها

> **فقدان التفاصيل**
>
> إن كنت تفقد تفاصيل كثيرة، فقلّل القوة أو زد مقياس التوجيه (guidance scale). وفكّر في استخدام نماذج مخصّصة لـ img2img.

> **انزياح الألوان**
>
> للحفاظ على الألوان الأصلية، أدرج وصف الألوان في أمرك أو استخدم قيم قوة أقل (0.2-0.4).

> **شوائب الدقة**
>
> قلّم حجم الصور دائمًا إلى الدقة الأصلية للنموذج (512×512 لـ SD 1.5، و768×768 أو 1024×1024 لـ SDXL).

## اتساق الألوان والأسلوب

للحفاظ على لوحات الألوان، استخدم قوة أقل وخطوات أقل، أو طبّق نقل الألوان بعد المعالجة. أما لتغيير الأسلوب وحده فاحتفظ بالمحتوى الدلالي في الأمر وابرز الأوصاف الأسلوبية:

```python
# Preserve colors while changing style
color_preserving_prompt = (
    "impressionist painting with vibrant blues and warm oranges, "
    "maintaining original color palette"
)

result = pipeline(
    prompt=color_preserving_prompt,
    image=original,
    strength=0.4,
    negative_prompt="desaturated, monochrome, color shift"
).images[0]
```

## سير عمل متعدد الممرات

كرّر التنفيذ بتعديلات صغيرة في القوة لتحقيق تحوّلات مركّبة:

```python
# Stage 1: Style transfer
stage1 = pipeline(
    "oil painting style",
    image=photo,
    strength=0.5
).images[0]

# Stage 2: Lighting adjustment
stage2 = pipeline(
    "dramatic sunset lighting",
    image=stage1,
    strength=0.3
).images[0]

# Stage 3: Final touches
final = pipeline(
    "highly detailed, masterpiece",
    image=stage2,
    strength=0.2
).images[0]
```

احفظ البذور (seeds) لكل ممر لتتمكن من إعادة تشغيل السلاسل الناجحة بطريقة حتمية.

## الخلاصة

يمنح توليد الصور من صورة إلى صورة تحكّمًا دقيقًا في تحوّل الصور بواسطة الذكاء الاصطناعي. ويزن معامل القوة بين الحفاظ والتحوّل—ابدأ بقيمة بين 0.3 و0.5 في معظم المهام. فالقيم الأدنى تحافظ على البنية بينما تتيح القيم الأعلى حرية إبداعية. وادمج ذلك مع التنقيح التدريجي، والتحرير بالقناع، ومعالجة الدقة الصحيحة للحصول على نتائج احترافية. وتذكّر أن هذه التقنية تتفوق في نقل الأسلوب، وتنويع المفاهيم، والمهام التنقيحية التكرارية.

## قراءات إضافية

- Diffusers — التحوّل من صورة إلى صورة: [https://huggingface.co/docs/diffusers/main/en/using-diffusers/img2img](https://huggingface.co/docs/diffusers/main/en/using-diffusers/img2img)
- Diffusers — التحرير بالقناع: [https://huggingface.co/docs/diffusers/main/en/using-diffusers/inpaint](https://huggingface.co/docs/diffusers/main/en/using-diffusers/inpaint)
- شبكة التحكّم ControlNet (Zhang وAgrawala): [https://arxiv.org/abs/2302.05543](https://arxiv.org/abs/2302.05543)
