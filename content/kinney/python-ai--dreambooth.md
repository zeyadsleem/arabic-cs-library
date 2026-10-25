---
title: "DreamBooth — تخصيص نماذج النص إلى صورة"
lang: ar
source: "https://stevekinney.com/courses/python-ai/dreambooth"
---

> **أهم الاستنتاجات**
>
> - جهّز من 3 إلى 10 صور متنوّعة للموضوع (instance) ورمز معرّف فريدًا
> - استخدم الحفاظ على المقدّمات (prior preservation) بصور الصف (class) للحد من فرط التأقلم
> - ابدأ بمعدّلات تعلّم وعدد خطوات متحفّظ، وراقب عيّنات دورية
> - فضّل LoRA لمُوصِّلات خفيفة قابلة للتركيب؛ أمّا الضبط الكامل فيثقل
> - عرّف أوامر التقييم عبر الأساليب والوضعيات، وأبقِ البذور ثابتة لضمان عدالة المقارنات

## نظرة عامة

DreamBooth تقنية تخصيص تضبط نموذج انتشار كامل من النص إلى صورة (text-to-image) باستخدام قليل من صور المرجع فحسب، عادةً من 3 إلى 5 صور. فمن خلال ربط رمز معرّف فريد بصفّ الموضوع (class) — مثل «صورة لـ [XYZ] كلب» — يتعلّم النموذج توليد ذلك الموضوع بدقّة في سياقات ووضعيات وإضاءات جديدة. وهذا يتيح تركيب صور عالية الولاء يقودها الموضوع حتى مع بيانات تدريب محدودة جدًّا.

## دفتر الملاحظات

اطّلع على دفتر الملاحظات المرافق: [DreamBooth](https://colab.research.google.com/drive/1Swhhh_rQxRHgD1LGqJgvRigQ8eI5NvsA?usp=sharing)

## ما الذي سنقوم به

1. تثبيت الاعتمادات
2. رفع صور تدريبك (من 3 إلى 10 صور عالية الجودة لموضوعك)
3. تدريب نموذج DreamBooth على موضوعك
4. توليد صور جديدة لموضوعك في سياقات مختلفة

## تهيئة الاعتمادات

نحتاج إلى استيراد كل مكتبات Python والوحدات الأساسية المطلوبة لتدريب DreamBooth وتوليد الصور:

```python
%pip install -q git+https://github.com/huggingface/diffusers
%pip install -q accelerate tensorboard transformers ftfy bitsandbytes
%pip install xformers -q --index-url https://download.pytorch.org/whl/cu124
%pip install -qq bitsandbytes

from pathlib import Path
import argparse
import itertools
import math
import os
from contextlib import nullcontext
import gc
import random
import numpy as np
import torch
import torch.nn.functional as F
import torch.utils.checkpoint
from torch.utils.data import Dataset

import PIL
from accelerate import Accelerator
from accelerate.logging import get_logger
from accelerate.utils import set_seed
from diffusers import (
    AutoencoderKL, DDPMScheduler, PNDMScheduler,
    StableDiffusionPipeline, UNet2DConditionModel
)
from diffusers.optimization import get_scheduler
from PIL import Image
from torchvision import transforms
from tqdm.auto import tqdm
from transformers import CLIPFeatureExtractor, CLIPTextModel, CLIPTokenizer

print("👨‍🎤 Environment ready to rock.")
```

## تجهيز البيانات

### رفع صورك

اختر من 3 إلى 10 صور لموضوعك لرفعها. ينبغي أن تكون صورًا فوتوغرافية عالية الجودة بخلفيات وزوايا وإضاءات متنوّعة:

```python
# Name your concept (e.g., your dog's name)
concept_name = "my-dog"  # @param {"type": "string"}
instance_data_dir = os.path.join("/content/", concept_name)

# Create the directory
os.makedirs(instance_data_dir, exist_ok=True)

print(f"Directory '{instance_data_dir}' created for your images. 💪")

# Check if the directory is empty before prompting for upload
if not os.listdir(instance_data_dir):
    print(f"Uploading images to {instance_data_dir}…")
    from google.colab import files
    uploaded = files.upload()

    # Move uploaded files to the instance directory
    for filename in uploaded.keys():
        os.rename(filename, os.path.join(instance_data_dir, filename))
else:
    print(f"Directory '{instance_data_dir}' is not empty. Skipping image upload.")

print("🩻 Images uploaded successfully.")
```

### إنشاء أصناف مجموعة البيانات

يتطلّب DreamBooth أصناف Dataset مخصّصة في PyTorch للتعامل مع تجهيز البيانات:

```python
class DreamBoothDataset(Dataset):
    def __init__(
        self,
        instance_data_dir,
        instance_prompt,
        tokenizer,
        class_data_root=None,
        class_prompt=None,
        size=512,
        center_crop=False,
    ):
        self.size = size
        self.center_crop = center_crop
        self.tokenizer = tokenizer

        self.instance_data_dir = Path(instance_data_dir)
        if not self.instance_data_dir.exists():
            raise ValueError("Instance images root doesn't exists.")

        self.instance_images_path = list(Path(instance_data_dir).iterdir())
        self.num_instance_images = len(self.instance_images_path)
        self.instance_prompt = instance_prompt
        self._length = self.num_instance_images

        if class_data_root is not None:
            self.class_data_root = Path(class_data_root)
            self.class_data_root.mkdir(parents=True, exist_ok=True)
            self.class_images_path = list(Path(class_data_root).iterdir())
            self.num_class_images = len(self.class_images_path)
            self._length = max(self.num_class_images, self.num_instance_images)
            self.class_prompt = class_prompt
        else:
            self.class_data_root = None

        self.image_transforms = transforms.Compose(
            [
                transforms.Resize(size, interpolation=transforms.InterpolationMode.BILINEAR),
                transforms.CenterCrop(size) if center_crop else transforms.RandomCrop(size),
                transforms.ToTensor(),
                transforms.Normalize([0.5], [0.5]),
            ]
        )

    def __len__(self):
        return self._length

    def __getitem__(self, index):
        example = {}
        instance_image = Image.open(self.instance_images_path[index % self.num_instance_images])
        if not instance_image.mode == "RGB":
            instance_image = instance_image.convert("RGB")
        example["instance_images"] = self.image_transforms(instance_image)

        example["instance_prompt_ids"] = self.tokenizer(
            self.instance_prompt,
            padding="do_not_pad",
            truncation=True,
            max_length=self.tokenizer.model_max_length,
        ).input_ids

        if self.class_data_root:
            class_image = Image.open(self.class_images_path[index % self.num_class_images])
            if not class_image.mode == "RGB":
                class_image = class_image.convert("RGB")
            example["class_images"] = self.image_transforms(class_image)
            example["class_prompt_ids"] = self.tokenizer(
                self.class_prompt,
                padding="do_not_pad",
                truncation=True,
                max_length=self.tokenizer.model_max_length,
            ).input_ids

        return example

class PromptDataset(Dataset):
    def __init__(self, prompt, num_samples):
        self.prompt = prompt
        self.num_samples = num_samples

    def __len__(self):
        return self.num_samples

    def __getitem__(self, index):
        example = {}
        example["prompt"] = self.prompt
        example["index"] = index
        return example
```

## الحفاظ على المقدّمات وصور الصف

يساعد الحفاظ على المقدّمات (prior preservation) على منع فرط التأقلم وعلى الحفاظ على قدرة النموذج في توليد أمثلة متنوّعة من الصف الأوسع. فإن لم يكن لديك من صور الصف ما يكفي، ولّدها النموذج تلقائيًا:

```python
pretrained_model_name_or_path = "stabilityai/stable-diffusion-2"
prior_preservation_class_folder = "./class_images"
prior_preservation_class_prompt = "a photo of a pit bull"
prior_loss_weight = 0.5
num_class_images = 12
sample_batch_size = 2

class_images_dir = Path(prior_preservation_class_folder)
class_images_dir.mkdir(parents=True, exist_ok=True)

cur_class_images = len(list(class_images_dir.iterdir()))

if cur_class_images < num_class_images:
    pipeline = StableDiffusionPipeline.from_pretrained(
        pretrained_model_name_or_path,
        revision="fp16",
        torch_dtype=torch.float16
    ).to("cuda")
    pipeline.enable_attention_slicing()
    pipeline.set_progress_bar_config(disable=True)

    num_new_images = num_class_images - cur_class_images
    print(f"Number of class images to sample: {num_new_images}.")

    sample_dataset = PromptDataset(prior_preservation_class_prompt, num_new_images)
    sample_dataloader = torch.utils.data.DataLoader(
        sample_dataset,
        batch_size=sample_batch_size
    )

    for example in tqdm(sample_dataloader, desc="Generating class images"):
        images = pipeline(example["prompt"]).images

        for i, image in enumerate(images):
            image.save(class_images_dir / f"{example['index'][i] + cur_class_images}.jpg")

    del pipeline
    gc.collect()
    with torch.no_grad():
        torch.cuda.empty_cache()

print(f"Total number of class images: {len(list(class_images_dir.iterdir()))}")
```

## مكوّنات النموذج

يعتمد تدريب DreamBooth على مكوّنات أساسية مُدرَّبة مسبقًا في Stable Diffusion:

### مُرمِّز النص (CLIP)

يعالج الأوامر النصية ويضمّها:

```python
text_encoder = CLIPTextModel.from_pretrained(
    pretrained_model_name_or_path,
    subfolder="text_encoder"
)
```

### VAE (المُرمِّز التنوّعي)

يحوّل الصور إلى فضاء كامن مدمج ويعيدها منه من جديد من أجل تدريب فعّال:

```python
vae = AutoencoderKL.from_pretrained(
    pretrained_model_name_or_path,
    subfolder="vae"
)
```

### نموذج U-Net

مكوّن إزالة التشويش الأساسي الذي يحوّل الضوضاء إلى صور:

```python
unet = UNet2DConditionModel.from_pretrained(
    pretrained_model_name_or_path,
    subfolder="unet"
)
```

سُمّيت U-Net بذلك لمعماريتها على هيئة حرف U: فهي تملك مسارًا للتصغير (يحلّل الصورة المشوّشة على مقاييس متعدّدة)، وضيقًا (يفهم السياق العام)، ومسارًا للتكبير (يعيد بناء الصورة ويصقلها خطوة بخطوة).

### المُقسِّم إلى رموز (Tokenizer)

يحوّل النص إلى معرّفات الرموز:

```python
tokenizer = CLIPTokenizer.from_pretrained(
    pretrained_model_name_or_path,
    subfolder="tokenizer"
)
```

## إعداد التدريب

اضبط جميع معاملات التدريب:

```python
from argparse import Namespace

args = Namespace(
    pretrained_model_name_or_path=pretrained_model_name_or_path,
    resolution=vae.sample_size,
    center_crop=True,
    train_text_encoder=False,  # Can improve results but requires more memory
    instance_data_dir=instance_data_dir,
    instance_prompt=f"a photo of {concept_name}",
    learning_rate=5e-06,
    max_train_steps=300,
    save_steps=50,
    train_batch_size=2,
    gradient_accumulation_steps=2,
    max_grad_norm=1.0,
    mixed_precision="fp16",  # Use mixed precision for faster training
    gradient_checkpointing=True,  # Save memory
    use_8bit_adam=True,  # Lower memory usage
    seed=3434554,
    with_prior_preservation=True,
    prior_loss_weight=prior_loss_weight,
    sample_batch_size=2,
    class_data_dir=prior_preservation_class_folder,
    class_prompt=prior_preservation_class_prompt,
    num_class_images=num_class_images,
    lr_scheduler="constant",
    lr_warmup_steps=100,
    output_dir="dreambooth-concept",
)
```

## دالة التدريب

تُنفّذ دالة التدريب عملية الضبط الدقيق الكاملة لـ DreamBooth:

```python
def training_function(text_encoder, vae, unet):
    logger = get_logger(__name__)
    set_seed(args.seed)

    accelerator = Accelerator(
        gradient_accumulation_steps=args.gradient_accumulation_steps,
        mixed_precision=args.mixed_precision,
    )

    # Freeze VAE as it's not being trained
    vae.requires_grad_(False)
    if not args.train_text_encoder:
        text_encoder.requires_grad_(False)

    # Enable gradient checkpointing to save memory
    if args.gradient_checkpointing:
        unet.enable_gradient_checkpointing()
        if args.train_text_encoder:
            text_encoder.gradient_checkpointing_enable()

    # Use 8-bit Adam for lower memory usage
    if args.use_8bit_adam:
        import bitsandbytes as bnb
        optimizer_class = bnb.optim.AdamW8bit
    else:
        optimizer_class = torch.optim.AdamW

    # Determine parameters to optimize
    params_to_optimize = (
        itertools.chain(unet.parameters(), text_encoder.parameters())
        if args.train_text_encoder
        else unet.parameters()
    )

    optimizer = optimizer_class(
        params_to_optimize,
        lr=args.learning_rate,
    )

    noise_scheduler = DDPMScheduler.from_config(
        args.pretrained_model_name_or_path,
        subfolder="scheduler"
    )

    # Create the dataset
    train_dataset = DreamBoothDataset(
        instance_data_dir=args.instance_data_dir,
        instance_prompt=args.instance_prompt,
        class_data_root=args.class_data_dir if args.with_prior_preservation else None,
        class_prompt=args.class_prompt,
        tokenizer=tokenizer,
        size=args.resolution,
        center_crop=args.center_crop,
    )

    # Training loop continues...
```

يكرّر حلقة التدريب ما يلي:

1. ترميز الصور إلى التمثيلات الكامنة (latents)
2. إضافة الضوضاء
3. التنبّؤ بالضوضاء باستخدام U-Net
4. حساب الفقد (loss) مع الحفاظ على المقدّمات
5. انتشار التدرّجات عكسيًا (backpropagation)
6. تحديث أوزان النموذج

## تشغيل التدريب

نفّذ التدريب مع توليد صور الصف بالشكل الصحيح:

```python
import accelerate

# Ensure class images are generated before training
if args.with_prior_preservation:
    class_images_dir = Path(args.class_data_dir)
    if not class_images_dir.exists():
        class_images_dir.mkdir(parents=True)

    cur_class_images = len(list(class_images_dir.iterdir()))
    if cur_class_images < args.num_class_images:
        # Generate missing class images
        pipeline = StableDiffusionPipeline.from_pretrained(
            args.pretrained_model_name_or_path,
            revision="fp16",
            torch_dtype=torch.float16
        ).to("cuda")

        # Generate and save images...

# Launch training
accelerate.notebook_launcher(
    training_function,
    args=(text_encoder, vae, unet)
)

# Clean up memory
for param in itertools.chain(unet.parameters(), text_encoder.parameters()):
    if param.grad is not None:
        del param.grad
torch.cuda.empty_cache()
```

## استخدام النموذج المضبط بدقة

حمّل نموذجك المخصّص واستخدمه:

```python
from diffusers import DiffusionPipeline

# Load the fine-tuned pipeline
model_path = args.output_dir
pipe = DiffusionPipeline.from_pretrained(
    model_path,
    torch_dtype=torch.float16
).to("cuda")

# Generate new images of your subject
suffix = "in space"  # @param {"type":"string"}
prompt = f"a photo of {concept_name} {suffix}"

image = pipe(
    prompt,
    num_inference_steps=50,
    guidance_scale=7.5
).images[0]

image
```

## LoRA مقابل الضبط الدقيق الكامل

### الضبط الدقيق الكامل

يحدّث جميع أوزان النموذج، ويُنتج أعلى جودة لكنه يتطلّب ذاكرة وتخزينًا كبيرين.

### LoRA (التكيّف من الرتبة المنخفضة)

يضيف مصفوفات صغيرة قابلة للتدريب إلى جانب الأوزان المجمّدة:

```python
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=4,  # Rank
    lora_alpha=32,
    target_modules=["to_k", "to_q", "to_v", "to_out.0"],
    lora_dropout=0.1,
)

model = get_peft_model(unet, lora_config)
# Now only LoRA parameters are trainable
```

ومن المزايا أن عدد المعاملات المطلوب تدريبها أقل بـ100×، مع تمثيل مواضيع متعدّدة كمُوصِّلات منفصلة، وسهولة المشاركة (ميجابايت مقابل جيجابايت).

## المعاملات الفائقة وأفضل الممارسات

### معدّل التعلّم

- **مرتفع جدًا (&gt;1e-5)**: فرط التأقلم وشوائب في المخرجات
- **منخفض جدًا (&lt;1e-7)**: تقارب بطيء
- **النقطة المثلى**: من 2e-6 إلى 5e-6

### خطوات التدريب

- **100-200**: تكيّف خفيف
- **300-500**: توازن
- **500 فما فوق**: خطر فرط التأقلم

### وزن الحفاظ على المقدّمات

- **0.5**: توازن قياسي
- **أعلى**: أكثر عمومية وأقلّ تحديدًا
- **أدنى**: أدقّ تحديدًا مع خطر فرط التأقلم

## نظافة مجموعة البيانات

اضمن جودة بيانات التدريب:

- **زوايا متنوعة**: أمامية، جانبية، وتعبيرات متعدّدة
- **جودة متّسقة**: صور حادّة واضحة الإضاءة
- **خلفيات نظيفة**: تجنّب العناصر المزدحمة أو المشتّتة
- **بلا علامات مائية**: قد تربك النموذج
- **اتجاه صحيح**: تحقّق من بيانات EXIF

## بروتوكول التقييم

عرّف أوامر الاختبار لتفحص أداء نموذجك:

```python
test_prompts = [
    f"{concept_name} as a superhero",
    f"{concept_name} in Van Gogh style",
    f"{concept_name} wearing a tuxedo",
    f"{concept_name} in ancient Rome",
]

for prompt in test_prompts:
    image = pipe(prompt, generator=torch.Generator("cuda").manual_seed(42)).images[0]
    # Save or display image
```

## استكشاف الأخطاء وإصلاحها

> **انزياح الهوية**
>
> إن لم يبدُ الموضوع مطابقًا لصورتك الأصلية، زد وزن الحفاظ على المقدّمات، أو أضف صور موضوع أكثر تنوعًا، أو قلّل معدّل التعلّم.

> **مؤشرات فرط التأقلم**
>
> إن كانت الخلفيات تبدو دائمًا واحدة أو أن الوضعيات محدودة، فقلّل خطوات التدريب، أو أضف صور صف أكثر، أو استخدم نقاط تفتيش (checkpoints) أسبق.

> **مشكلات الذاكرة**
>
> فعّل تفتيش التدرّجات (gradient checkpointing)، واستخدم LoRA بدل الضبط الدقيق الكامل، أو قلّل حجم الدفعة، أو استخدم مُحسِّنات بدقّة 8-bit.

## الأخلاقيات والسلامة

- **الموافقة**: احصل دائمًا على إذن عند التدريب على ملامح الأشخاص
- **النسب**: احترم رخص النماذج الأصلية
- **الإساءة**: تجنّب إنشاء محتوى مضلّل أو ضار
- **التحيّز**: انتبه إلى التحيّزات الموروثة من النماذج الأساسية

## الخلاصة {#conclusion}

يمكّن DreamBooth من تحقيق تخصيص قوي لنماذج الانتشار باستخدام عدد قليل من الصور. ويعتمد النجاح على موازنة شدّة التدريب بالحفاظ على المقدّمات، وعلى استخدام صور متنوّعة عالية الجودة، وعلى ضبط المعاملات الفائقة بعناية. ابدأ بإعدادات متحفّظة ثم كرّر المحاولة. وفكّر في LoRA لتدريب فعّال ونشر سهل. وبإعداد سليم، يمكنك إنشاء نماذج تعيد إنتاج المواضيع بدقّة في سياقات جديدة مع الحفاظ على القدرات الإبداعية للنموذج الأساسي.

## قراءات إضافية

- DreamBooth (Ruiz وآخرون، 2022): [https://arxiv.org/abs/2208.12242](https://arxiv.org/abs/2208.12242)
- Diffusers — تدريب DreamBooth: [https://huggingface.co/docs/diffusers/main/en/training/dreambooth](https://huggingface.co/docs/diffusers/main/en/training/dreambooth)
- التوجيه بلا مصنّف (Classifier-Free Guidance): [https://arxiv.org/abs/2207.12598](https://arxiv.org/abs/2207.12598)
- LoRA (Hu وآخرون، 2021): [https://arxiv.org/abs/2106.09685](https://arxiv.org/abs/2106.09685)
