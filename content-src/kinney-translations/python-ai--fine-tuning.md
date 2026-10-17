---
title: "الضبط الدقيق لنماذج المحوّلات (Transformer)"
---

> **أهم الاستنتاجات**
>
> - البيانات النظيفة جيدة التوسيم هي الأهم؛ رمّز بمُرمِّز النموذج نفسه بالضبط
> - اختر الضبط الكامل (full FT) للسعة أو LoRA/PEFT للكفاءة وإعادة استخدام المحوّلات (adapters)
> - اضبط Trainer: أحجام الدفعات، ومعدل التعلّم/التسخين، واضمحلال الأوزان، والدقة، واستراتيجية التقييم
> - استخدم الإيقاف المبكر ونقاط التحقق والمراجعات المثبَّتة لضمان قابلية إعادة الإنتاج
> - جهّز للإنتاج بإعدادات فك ترميز آمنة افتراضيًا، وقابلية المراقبة، وإدارة الإصدارات

## نظرة عامة

يُكيّف الضبط الدقيق نموذجًا مُدرَّبًا مسبقًا مع مجالك أو مهمتك باستخدام أمثلة موسومة، ما يحسّن الدقة والالتزام بالأسلوب. يمكنك تحديث كل الأوزان (الضبط الكامل) أو تطبيق طرق فعّالة من حيث المعاملات مثل LoRA/PEFT لتقليل متطلبات الحوسبة وVRAM. تشبه هذه العملية تعليم طالب واسع المعرفة مهارة محدّدة—فالنموذج المُدرَّب مسبقًا يفهم أنماط اللغة بالفعل، ونحن نعلّمه تطبيق هذه المعرفة على مهمتنا المحدّدة.

## دفتر الملاحظات

اطّلع على دفتر الملاحظات المرافق: [الضبط الدقيق](https://colab.research.google.com/drive/1obIENeCQ1NqIe2CK7hgB-s4X0G29T-BV?usp=sharing)

## ما هو الضبط الدقيق؟

يأخذ الضبط الدقيق نموذجًا تعلّم بالفعل الفهم اللغوي العام من مجموعات بيانات ضخمة ويخصّصه لاحتياجاتك المحدّدة. فقد تعلّم النموذج الأساسي الأنماط والقواعد والمعرفة من التدريب على أجزاء ضخمة من الإنترنت. ويعلّمه الضبط الدقيق كيفية تطبيق هذه المعرفة على مهمتك.

## لماذا الضبط الدقيق؟

**الأداء الخاص بالمهمة**: النماذج المُدرَّبة مسبقًا عامة الغرض؛ والضبط الدقيق يجعلها خبيرة في مهمتك. **التكيّف مع المجال**: كيّف النماذج مع مجالات محدّدة (طبي، قانوني، تقني). **كفاءة البيانات**: يتطلب بيانات أقل بكثير من التدريب من الصفر. **كفاءة الوقت**: أسرع بكثير من التدريب المسبق لنموذج.

## التهيئة للضبط الدقيق

أولًا، ثبّت المكتبات اللازمة:

```python
!pip install transformers datasets accelerate bitsandbytes -q

import pprint
import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig,
    DataCollatorForLanguageModeling,
    TrainingArguments,
    Trainer,
    pipeline,
    logging
)
from datasets import load_dataset
import peft

# Suppress verbose output
logging.set_verbosity_error()
print("🤘 The setup is complete.")
```

## تحضير البيانات

جودة بياناتك التدريبية وتنسيقها هما أهم عاملين لنجاح الضبط الدقيق. وفي مثالنا، سنعلّم نموذجًا توليد الاقتباسات:

```python
# Load the dataset
dataset_name = "Abirate/english_quotes"
dataset = load_dataset(dataset_name, split="train")

print(dataset)
# Dataset({
#     features: ['quote', 'author', 'tags'],
#     num_rows: 2508
# })

# Format data for our task
def format_prompt(example):
    quote_text = example['quote']
    author_name = example['author']
    return {"text": f"Quote by {author_name}: {quote_text} <|endoftext|>"}

formatted_dataset = dataset.map(format_prompt)

# Example formatted text
print(formatted_dataset[0]['text'])
# Quote by Oscar Wilde: "Be yourself; everyone else is already taken." <|endoftext|>
```

رمز `<|endoftext|>` بالغ الأهمية—فهو يعلّم النموذج متى ينتهي الاقتباس، فيتعلّم التوقف عن التوليد في الوقت المناسب.

## تحميل النموذج المُدرَّب مسبقًا

سنستخدم التكميم (quantization) لجعل النموذج موفّرًا للذاكرة. وهذا يتيح لنا ضبط نماذج أكبر دقيقًا على عتاد محدود:

```python
model_name = "gpt2-medium"

# Quantization configuration to load the model in 4-bit
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
)

def get_model():
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        quantization_config=bnb_config,
        trust_remote_code=True
    )
    model.config.use_cache = False
    return model

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token
```

فكّر في التكميم كما لو أنه إنشاء ملخّص لكتاب طويل جدًا. فبدلًا من استخدام مفردات غنية ومفصّلة (أعداد الفاصلة العائمة 32-بت)، نستخدم مجموعة محدودة وأكثر كفاءة من الكلمات (أعداد صحيحة 4-بت) لالتقاط الأفكار الرئيسية.

## الضبط الدقيق الفعّال من حيث المعاملات (PEFT)

PEFT عائلة من التقنيات لتخصيص النماذج الكبيرة دون المساس بكل أوزانها الأصلية. وبدلًا من إعادة تدريب مئات الملايين من المعاملات، تُجمّد طرق PEFT النموذج الأساسي وتتعلّم إضافة صغيرة جدًا فقط.

### ما هو LoRA؟

يُجمّد التكيّف منخفض الرتبة (LoRA) الأوزان الأصلية ويتعلّم مصفوفتين صغيرتين جدًا يكون حاصل ضربهما منخفض الرتبة للغاية. وأثناء التدريب، لا تُحدَّث سوى مصفوفات الإضافة هذه، فتخزّن وتضرب معاملات أقل بكثير—غالبًا أقل بمئات المرات من الضبط الكامل.

```python
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False
)

# Configure LoRA
lora_config = peft.LoraConfig(
    r=8,  # Rank of the update matrices
    lora_alpha=32,  # Scaling factor for the LoRA weights
    lora_dropout=0.05,  # Dropout probability for LoRA layers
    bias="none",  # Bias type
    task_type="CAUSAL_LM",  # Task type
    fan_in_fan_out=True,
)

# Add LoRA adapters to the model
model = peft.get_peft_model(get_model(), lora_config)
model.print_trainable_parameters()
# trainable params: 786,432 || all params: 355,609,600 || trainable%: 0.2212
```

نحن ندرّب أقل من 1% من معاملات النموذج! لهذا السبب يكون LoRA بهذه الكفاءة.

## ترميز مجموعة البيانات

حوّل نصّنا المنسّق إلى معرّفات رموز (token IDs):

```python
def tokenize_function(examples):
    return tokenizer(
        examples['text'],
        padding="max_length",
        truncation=True,
        max_length=128
    )

# Tokenize the entire dataset
tokenized_dataset = formatted_dataset.map(tokenize_function, batched=True)

pprint.pp(tokenized_dataset[0], compact=True)
```

## عملية الضبط الدقيق

استخدم واجهة Trainer من Hugging Face لإدارة حلقة التدريب بالكامل:

```python
# Define training arguments
training_args = TrainingArguments(
    output_dir="./gpt2-medium-quotes",
    num_train_epochs=1,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=1,
    learning_rate=2e-4,
    fp16=True,  # Mixed precision for faster training
    logging_steps=200,
    save_total_limit=2,
    report_to="none"
)

# Create the Trainer instance
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator
)

# Start fine-tuning!
print("🚀 Starting fine-tuning…")
trainer.train()
print("✅ Fine-tuning complete!")

# Save the final model
final_model_dir = "./gpt2-medium-quotes-final"
trainer.save_model(final_model_dir)
```

## شرح وسائط التدريب

**`learning_rate`**: فكّر في هذا كحجم الخطوة التي يخطوها الطالب عند تصحيح خطأ. فإن كانت كبيرة جدًا (&gt;5e-5)، فقد يتجاوز الحد. وإن كانت صغيرة جدًا (&lt;1e-6)، فسيستغرق التعلّم وقتًا طويلًا لا ينتهي.

**`per_device_train_batch_size`**: عدد الأمثلة التي تُعرض قبل تحديث الفهم. وهو أكثر كفاءة من عرض مثال واحد في كل مرة.

**`num_train_epochs`**: عدد المرات التي تمرّ فيها على مجموعة البيانات بالكامل. وقد تُحسّن الحقب (epochs) الأكثر التعلّم لكنها تخاطر بالإفراط في التخصيص.

**`fp16`**: استخدم الدقة المختلطة لتدريب أسرع واستهلاك ذاكرة أقل.

## اختبار النموذج المضبوط

قارن النموذج الأساسي بنسختنا المضبوطة:

```python
from peft import PeftModel

prompt = "Quote by Jimi Hendrix"

# Test the original base model
print("--- Testing the Original Base Model ---")
base_generator = pipeline('text-generation', model="gpt2-medium", tokenizer="gpt2-medium")
result = base_generator(prompt, max_length=50, num_return_sequences=1)
print("Base model response:")
print(result[0]['generated_text'])

# Test our fine-tuned model
print("\n--- Testing Our Fine-Tuned Model ---")
base_model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True
)
fine_tuned_model = PeftModel.from_pretrained(base_model, final_model_dir)
fine_tuned_model = fine_tuned_model.merge_and_unload()

fine_tuned_generator = pipeline(
    'text-generation',
    model=fine_tuned_model,
    tokenizer=tokenizer
)
result = fine_tuned_generator(prompt, max_length=50, num_return_sequences=1)
print("Fine-tuned model response:")
print(result[0]['generated_text'])
```

ينبغي أن ترى فرقًا هائلًا. فالنموذج الأساسي غالبًا يولّد شيئًا عامًا أو غير ذي صلة، بينما يولّد النموذج المضبوط فورًا اقتباسًا معقولًا يتبع البنية التي تعلّمها.

## مقاربات الضبط الدقيق

### الضبط الدقيق الكامل

يحدّث كل أوزان النموذج. ويوفّر أعلى سعة لكنه الأكثر تكلفة:

```python
# Full fine-tuning (without LoRA)
model = AutoModelForCausalLM.from_pretrained(model_name)
# All parameters are trainable
```

### LoRA/PEFT

يحقن محوّلات منخفضة الرتبة، فيدرّب معاملات أقل بمقدار 10-100×:

```python
lora_config = peft.LoraConfig(
    r=8,  # Lower rank = fewer parameters
    lora_alpha=16,  # Scaling factor
    target_modules=["c_attn"],  # Which layers to adapt
    lora_dropout=0.05
)
```

### تجميد الطبقات

جمّد الطبقات الدنيا لتوفير الحوسبة:

```python
# Freeze all but the last two transformer blocks
for param in model.transformer.h[:-2].parameters():
    param.requires_grad = False
```

## مقاييس التقييم

راقب هذه المقاييس أثناء التدريب:

**التصنيف**: الدقة، ودرجة F1، والإحكام (precision)، والاستدعاء (recall). **التوليد**: الحيرة (perplexity)، ودرجة BLEU، والتقييم البشري. **مقاييس مخصّصة**: قياسات خاصة بالمهمة.

```python
import evaluate

def compute_metrics(eval_pred):
    metric = evaluate.load("accuracy")
    logits, labels = eval_pred
    predictions = logits.argmax(-1)
    return metric.compute(predictions=predictions, references=labels)
```

## النشر في الإنتاج

### إدارة إصدارات النموذج

ثبّت إصدارات محدّدة لضمان قابلية إعادة الإنتاج:

```python
model = AutoModelForCausalLM.from_pretrained(
    "your-model",
    revision="v1.0.0"  # Pin specific version
)
```

### الاستدلال الآمن

اضبط إعدادات افتراضية حتمية للإنتاج:

```python
def safe_generate(prompt, model, tokenizer):
    inputs = tokenizer(prompt, return_tensors="pt")

    with torch.no_grad():
        outputs = model.generate(
            inputs.input_ids,
            max_new_tokens=100,
            temperature=0.7,  # Conservative temperature
            do_sample=False,  # Deterministic
            pad_token_id=tokenizer.eos_token_id
        )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)
```

## ضبط المعاملات الفائقة

ابدأ بإعدادات افتراضية مُتحقَّق منها، ثم اضبط:

```python
# Sweep these hyperparameters
learning_rates = [1e-5, 2e-5, 5e-5]
batch_sizes = [4, 8, 16]
warmup_ratios = [0.03, 0.06, 0.1]

for lr in learning_rates:
    for bs in batch_sizes:
        args = TrainingArguments(
            learning_rate=lr,
            per_device_train_batch_size=bs,
            # ... other args
        )
        # Train and evaluate
```

## استكشاف المشكلات الشائعة وإصلاحها

> **الإفراط في التخصيص**
>
> إذا حفظ النموذج بيانات التدريب عن ظهر قلب، فقلّل الحقب، أو زد الإسقاط (dropout)، أو أضف بيانات أكثر تنوّعًا، أو استخدم الإيقاف المبكر.

> **القصور في التخصيص**
>
> إذا كان الأداء ضعيفًا، فزد سعة النموذج، أو ارفع معدل التعلّم بحذر، أو حسّن جودة البيانات، أو درّب لحقب أكثر.

> **مشكلات الذاكرة**
>
> فعّل نقاط تحقق التدرّج (gradient checkpointing)، أو استخدم أحجام دفعات أصغر، أو طبّق تراكم التدرّج (gradient accumulation)، أو انتقل إلى LoRA/PEFT.

## توسيع نطاق التدريب

للنماذج أو مجموعات البيانات الأكبر:

```python
# Use accelerate for multi-GPU
from accelerate import Accelerator

accelerator = Accelerator()
model, optimizer, dataloader = accelerator.prepare(
    model, optimizer, dataloader
)

# Or use DeepSpeed for extreme scale
training_args = TrainingArguments(
    deepspeed="ds_config.json",
    # ... other args
)
```

## الأخلاقيات والسلامة

**الترخيص**: احترم تراخيص النموذج الأساسي ومجموعة البيانات. **الخصوصية**: تجنّب التدريب على بيانات حسّاسة دون موافقة. **التحيّز**: قيّم التحيّزات الضارّة وطبّق ضمانات. **إساءة الاستخدام**: ضع في الحسبان إساءة الاستخدام المحتملة وأضف تحذيرات مناسبة.

## تقنيات متقدّمة

### الضبط الدقيق القائم على الأوامر

نسّق البيانات كأزواج من أمر-استجابة:

```python
def format_instruction(example):
    return {
        "text": f"### Instruction: {example['instruction']}\n"
                f"### Response: {example['response']}<|endoftext|>"
    }
```

### الضبط الدقيق متعدّد المهام

درّب على مهام متعدّدة في الوقت نفسه:

```python
# Combine multiple datasets
combined_dataset = concatenate_datasets([
    dataset1.map(format_task1),
    dataset2.map(format_task2),
    dataset3.map(format_task3)
])
```

### التعلّم المستمر

اضبط النموذج دقيقًا على مهام جديدة دون نسيان المهام القديمة:

```python
# Use elastic weight consolidation or similar techniques
from peft import TaskType

model = peft.get_peft_model(
    base_model,
    lora_config,
    task_type=TaskType.MULTI_TASK
)
```

## الخاتمة

يحوّل الضبط الدقيق النماذج عامة الغرض إلى أدوات متخصّصة لاحتياجاتك المحدّدة. ويعتمد النجاح على بيانات عالية الجودة، واختيار التقنية المناسبة (الكامل مقابل PEFT)، وضبط المعاملات الفائقة بعناية. ابدأ بـ LoRA للكفاءة، واستخدم واجهة Trainer للبساطة، وقيّم دائمًا على بيانات محجوزة. وبضبط دقيق سليم، يمكنك تحقيق أداء متقدّم في مهمتك المحدّدة مع الاستفادة من المعرفة المُضمَّنة في النماذج المُدرَّبة مسبقًا.

## قراءات إضافية

- [Transformers — Trainer](https://huggingface.co/docs/transformers/main/en/main_classes/trainer)
- [دورة Hugging Face — الضبط الدقيق](https://huggingface.co/learn/nlp-course/chapter3/1?fw=pt)
- [PEFT (الضبط الدقيق الفعّال من حيث المعاملات)](https://github.com/huggingface/peft)
- [Accelerate](https://huggingface.co/docs/accelerate/index)
- [DeepSpeed](https://www.deepspeed.ai/)
- [ورقة LoRA (Hu وآخرون، 2021)](https://arxiv.org/abs/2106.09685)
