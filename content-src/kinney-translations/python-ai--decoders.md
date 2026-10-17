---
title: "المفكّكات وتوليد النص"
---

> **الخلاصات الأساسية**
>
> - اختر طريقة فك الترميز حسب الهدف: greedy/beam لأجل الحتمية، وtop-p/k مع الحرارة لأجل الإبداع
> - اضبط التكرار بالعقوبات وno-repeat n-grams؛ وحدّد شروط إيقاف صريحة
> - فضّل `max_new_tokens` للوضوح مع المطالبات الطويلة؛ واضبط دائمًا معالجة EOS
> - فعّل KV cache للبثّ؛ ورتّب الدفعات حسب الطول لأجل الإنتاجية
> - استخدم المعالجات والمحوّلات (processors/warpers) لتشكيل logits قبل أخذ العيّنات

## نظرة عامة

تولّد المعماريات المعتمدة على المفكّك فقط (decoder-only) النص توليدًا انحداريًا تلقائيًا، إذ تتنبأ بالرمز التالي بناءً على السياق السابق. وتُجيد نماذج مثل GPT توليد نص جديد بكتابة القصص والإجابة عن الأسئلة وإكمال الجمل، رمزًا تلو الآخر. وفهم كيفية عمل هذه النماذج يكشف المعمارية والخطوات المتتابعة التي تقف وراء توليد النص.

## الدفتر

اطّلع على الدفتر المرافق: [المفكّكات](https://colab.research.google.com/drive/1ZUmRw8pTJaGum1gzJZ4H49X9aWkd9zfW?usp=sharing)

## الانتباه السببي: النافذة أحادية الاتجاه

تخيّل أنك تقرأ رواية بوليسية صفحة تلو الأخرى — ترى كل ما حدث سابقًا لكن لا يمكنك إلقاء نظرة على الصفحات القادمة. قناع الانتباه السببي يجعل نماذج اللغة تتصرف بالطريقة نفسها. فعند توليد الكلمة التالية، يُخفي القناع كل الكلمات المستقبلية، فلا يستطيع النموذج الانتباه إلا إلى الكلمات التي أنتجها بالفعل.

الفرق الجوهري بين نماذج توليد النص (المفكّكات) ونماذج فهم النص (المشفّرات) هو طريقة رؤيتها للمدخل:

**المشفّر (مثل BERT)** يستخدم انتباهًا ثنائي الاتجاه. فعند تحليل «sat» في «the cat sat on the mat»، يرى كلًا من «the cat» (قبلها) و«on the mat» (بعدها). مثالي لفهم السياق الكامل.

**المفكّك (مثل GPT)** يستخدم الانتباه السببي. فعند توليد «sat»، لا يرى إلا «the cat» التي سبقتها. ولا يستطيع رؤية المستقبل لأن تلك الكلمات لم توجد بعد.

هذا القيد جوهري — فعند توليد النص، على النموذج أن يتنبأ بالكلمة التالية بناءً على ما كتبه هو فقط.

## تصوير القناع السببي

يمنع القناع السببي النموذج صراحةً من الانتباه إلى الرموز المستقبلية بوضع درجات انتباهها عند سالب ما لا نهاية قبل تطبيق softmax:

```python
import torch
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Create a causal mask for 5 tokens
sequence_length = 5
causal_mask = torch.triu(torch.ones(sequence_length, sequence_length) * -1e9, diagonal=1)

# Visualize the mask
plt.figure(figsize=(6, 6))
sns.heatmap(causal_mask, cmap='viridis', annot=True, fmt=".0f", cbar=False,
            xticklabels=np.arange(sequence_length), yticklabels=np.arange(sequence_length))
plt.title("Causal Attention Mask Heatmap")
plt.xlabel("Key Token Index")
plt.ylabel("Query Token Index")
plt.show()
```

في القناع، تعني `0` «انتبه» وتشير الأرقام السالبة الكبيرة إلى «تجاهل». وهذا يضمن ألا يؤثر كل موضع إلا في نفسه والمواضع السابقة، مما ينشئ نمط التوليد من اليسار إلى اليمين.

## معمارية المفكّك

نموذج معتمد على المفكّك فقط مثل GPT-2 هو كومة من كتل مفكّك متطابقة. ولكل كتلة مكوّنان رئيسيان:

**الانتباه الذاتي متعدد الرؤوس المقنّع** يطبّق القناع السببي الذي ناقشناه، فيتيح للنموذج وزن أهمية الكلمات السابقة. و**الشبكة العصبية الأمامية** تعالج ناتج الانتباه، مضيفةً عمقًا حسابيًا لتعلّم أنماط معقّدة.

تعالج هذه الكومة تضمينات الرموز، ويغذّي ناتج الكتلة الأخيرة رأس نمذجة اللغة — طبقة خطية تُسقط التمثيل النهائي في متجه ضخم يحمل درجة واحدة لكل كلمة في المفردات:

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "gpt2-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Make sure the tokenizer has a padding token for batching
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

# The language modeling head
print("Language Modeling Head (Output Layer):")
print(model.lm_head)
print(f"Vocabulary size: {tokenizer.vocab_size}")
```

## التوليد الانحداري التلقائي

التوليد الانحداري التلقائي مصطلح فخم لفكرة بسيطة: تنبؤ النموذج التالي يعتمد على تنبؤاته السابقة. وتتبع عملية التوليد حلقة خطوة بخطوة:

1. ابدأ بمطالبة (prompt)
2. يتنبأ النموذج باحتمالات الرمز التالي
3. تختار استراتيجية فك الترميز رمزًا واحدًا من التوزيع الاحتمالي
4. يُضاف الرمز المختار إلى متتالية المدخل
5. كرّر من الخطوة 2 حتى يُولَّد رمز إيقاف أو يُبلَغ الطول الأقصى

والجزء الأكثر إثارة هو الخطوة 3: كيف نختار الرمز التالي؟

## استراتيجيات فك الترميز

### البحث الجشع (Greedy Search)

يختار البحث الجشع دائمًا الرمز التالي الأكثر احتمالًا. وهو سريع وقابل للتوقّع، لكنه غالبًا ينتج نصًا مملًا ومتكررًا:

```python
prompt = "The future of artificial intelligence is"
inputs = tokenizer(prompt, return_tensors="pt")

# Generate with greedy search
greedy_output = model.generate(
    inputs.input_ids,
    max_new_tokens=20,
    num_beams=1,
    do_sample=False
)

print("Greedy Search Output:")
print(tokenizer.decode(greedy_output[0], skip_special_tokens=True))
```

### أخذ العيّنات مع الحرارة (Sampling with Temperature)

بدلًا من اختيار الرمز الأعلى دائمًا، يمكننا أخذ عيّنات من التوزيع الاحتمالي. والحرارة تتحكّم في العشوائية:

```python
import torch.nn.functional as F

# Get the model's predicted probabilities for the next word
with torch.no_grad():
    outputs = model(**inputs)
    next_token_logits = outputs.logits[:, -1, :]
    probs = F.softmax(next_token_logits, dim=-1).cpu().numpy().flatten()

# Function to apply temperature
def apply_temperature(logits, temperature):
    return F.softmax(logits / temperature, dim=-1).cpu().numpy().flatten()

# Visualize temperature effects
temperatures = [0.1, 0.7, 1.5]

plt.figure(figsize=(15, 5))
for i, temp in enumerate(temperatures):
    plt.subplot(1, len(temperatures), i + 1)
    temp_probs = apply_temperature(next_token_logits, temp)
    # Get top 20 tokens for visualization
    topk_probs, topk_indices = torch.topk(torch.from_numpy(temp_probs), 20)
    topk_tokens = [tokenizer.decode(i) for i in topk_indices]

    plt.bar(topk_tokens, topk_probs.numpy(), color='skyblue')
    plt.title(f"Temperature = {temp}")
    plt.xticks(rotation=90)
    plt.ylabel("Probability")

plt.tight_layout()
plt.show()

# Generate with sampling
sampling_output = model.generate(
    inputs.input_ids,
    max_new_tokens=50,
    do_sample=True,
    temperature=0.7,
    top_k=0
)

print("\nSampling with Temperature (0.7):")
print(tokenizer.decode(sampling_output[0], skip_special_tokens=True))
```

**الحرارة المنخفضة (0.2)** تجعل التوزيع «أكثر حدّة» — فيصبح النموذج واثقًا ومحافظًا، على غرار البحث الجشع. و**الحرارة المرتفعة (1.5)** تُسطّح التوزيع — فيخاطر النموذج، ما يؤدي إلى نص إبداعي أو غير منطقي.

فكّر في الحرارة كمِقبض للإبداع: اخفضه للأمان وارفعه للتجريب.

### أخذ العيّنات Top-K وTop-P (النواة)

قد يُنتج أخذ العيّنات كلمات غريبة إن اختار عشوائيًا رموزًا منخفضة الاحتمال. لذلك نرشّح التوزيع قبل أخذ العيّنات:

**أخذ العيّنات Top-K** لا ينظر إلا إلى الرموز الـk الأكثر احتمالًا. فمع `top_k=50`، يأخذ النموذج عيّناته من 50 كلمة فقط هي الأكثر احتمالًا.

**أخذ العيّنات Top-P (النواة)** يتكيّف ديناميكيًا. فهو ينظر إلى أصغر مجموعة من الرموز يتجاوز مجموع احتمالاتها التراكمي العتبة p. فإذا كان `p=0.9`، أخذ عيّناته من الرموز التي تشكّل 90% من كتلة الاحتمال.

```python
# Generate with Top-P (Nucleus) Sampling
nucleus_output = model.generate(
    inputs.input_ids,
    max_new_tokens=50,
    do_sample=True,
    top_p=0.92,
    top_k=0  # Disable top-k
)

print(tokenizer.decode(nucleus_output[0], skip_special_tokens=True))
```

يُوصى عمومًا بـTop-P لتوليد نص عالي الجودة لأنه يتكيّف مع الحالة — فحين يكون النموذج واثقًا ينظر في كلمات قليلة، وحين يكون مترددًا ينظر في كلمات كثيرة.

## القيود الشائعة

**نافذة السياق**: للنماذج ذاكرة محدودة. ولـGPT-2 نافذة سياق من 1024 رمزًا — لا يستطيع تذكّر أي شيء يتجاوز تلك النافذة.

**التكرار**: قد تعلق النماذج في حلقات. وتساعد معاملات مثل `repetition_penalty`:

```python
output = model.generate(
    **inputs,
    max_new_tokens=60,
    do_sample=True,
    top_p=0.95,
    temperature=0.8,
    repetition_penalty=1.05,      # Penalize repeated tokens
    no_repeat_ngram_size=3,       # Block exact 3-gram repeats
    eos_token_id=tokenizer.eos_token_id
)
```

**الهلوسة**: قد تولّد النماذج نصًا يبدو معقولًا لكنه غير صحيح وقائعيًا. إنها آلات مطابقة أنماط بلا فهم حقيقي.

**التحيّز**: ترث النماذج تحيّزات مجتمعية من بيانات التدريب. فكن دائمًا ناقدًا للمخرجات.

## التوقف في منتصف الجملة

تتعلّم النماذج إنهاء الجمل طبيعيًا بالتنبؤ برمز نهاية المتتالية (EOS). وأثناء التدريب تلاحظ أنماط الجمل وتتعلّم ربط اكتمال الفكرة برمز EOS. وعندما يصبح احتمال EOS هو الأعلى، يتوقف التوليد:

```python
# Increase max_new_tokens to allow for a full sentence
natural_stop_output = model.generate(
    inputs.input_ids,
    max_new_tokens=100,  # Give the model plenty of room
    do_sample=True,
    top_p=0.92,
    temperature=0.7,
    top_k=0,
    eos_token_id=tokenizer.eos_token_id
)

print(tokenizer.decode(natural_stop_output[0], skip_special_tokens=True))
```

## توليد النص مقابل الإجابة عن الأسئلة

نماذج مثل ChatGPT وGPT هي في جوهرها أنظمة توليد نص بالغة التقدّم. وهي لا تنتقل بين أنماط مختلفة — بل دُرِّبت قدرتها الوحيدة القوية على توليد النص على التعرّف على الأنماط بمهارة تجعلها تنتج نوع النص الصحيح لأي مهمة:

حين تطرح سؤالًا، تولّد نصًا يكون إجابة. وحين تطلب ملخصًا، تولّد نصًا يكون ملخصًا. وحين تطلب الترجمة، تولّد نصًا في اللغة الهدف.

### الإجابة الاستخراجية مقابل الإجابة التوليدية

**الإجابة الاستخراجية** (مثل مثال الهوت دوغ سابقًا) تجد الإجابات الدقيقة وتستخرجها من السياق المتاح. ولا تستطيع استخدام معرفة خارجية.

**الإجابة التوليدية** (ChatGPT وClaude وGemini) تولّد إجابات من الصفر بناءً على معرفة واسعة تعلّمتها أثناء التدريب. ولهذا تستطيع الإجابة عن أسئلة في أي موضوع تقريبًا دون الحاجة إلى سياق محدّد.

### السر: الضبط الدقيق بالتعليمات

تبدأ النماذج الأساسية مفكّكات ضخمة دُرِّبت على التنبؤ بالكلمة التالية من أجزاء واسعة من الإنترنت. وبعد ذلك، يدرّبها الضبط الدقيق بالتعليمات على أزواج `[instruction, response]` عالية الجودة يكتبها البشر. وهذا يعلّم النموذج كيف يكون مساعدًا مفيدًا:

```json
{
  "instruction": "What is the capital of France?",
  "response": "The capital of France is Paris."
}
```

وبالتدريب على ملايين الأمثلة من هذا القبيل، يتعلّم النموذج أن المدخل حين يكون سؤالًا، فإن «الرموز التالية» الأكثر احتمالًا إحصائيًا تشكّل إجابة متماسكة. والنموذج لا «يقرّر» الإجابة — بل جعل تدريبه نص الإجابة أكثر استكمال احتمالًا لنص السؤال.

## من الـLogits إلى الرموز: المعالجات والمحوّلات

تحسب حلقة التوليد logits في كل خطوة، ثم تطبّق المعالجات قبل أخذ العيّنات:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

tok = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2").eval()

inp = tok("Write a haiku about the ocean:\n", return_tensors="pt")

out = model.generate(
    **inp,
    max_new_tokens=60,
    do_sample=True,
    top_p=0.95,
    temperature=0.8,
    repetition_penalty=1.05,
    no_repeat_ngram_size=3,
    eos_token_id=tok.eos_token_id,
)

print(tok.decode(out[0], skip_special_tokens=True))
```

تشمل المعالجات النموذجية فرض الحد الأدنى/الأقصى للطول، وعقوبات التكرار، وتصفية الكلمات السيئة، والرموز المفروضة. أما المحوّلات (warpers) فتعيد تشكيل التوزيع عبر تعديلات top-k وtop-p والحرارة.

## دقائق البحث الشُّعاعي (Beam Search)

يستكشف البحث الشُّعاعي فرضيات متعددة لتعظيم احتمال المتتالية الكلي:

```python
beam_output = model.generate(
    inputs.input_ids,
    max_new_tokens=30,
    num_beams=5,
    early_stopping=True
)
```

يحتفظ البحث الشُّعاعي بـk فرضيات جزئية، ويوسّعها، ويطبّق تطبيع الطول لتجنّب تفضيل المتتاليات القصيرة. وهو ينتج مخرجات أعلى جودة لكن أكثر استهلاكًا للحساب.

## نصائح الأداء

**التخزين المؤقت**: استخدم KV-cache لتجنّب إعادة حساب الانتباه للرموز السابقة في التوليدات الطويلة. فعّله بـ`model.config.use_cache = True`.

**الدفعات**: جمّع المطالبات المتقاربة في الطول لتعظيم الإنتاجية وتقليل هدر الحشو.

**الدقة المختلطة**: استخدم fp16/bf16 لاستدلال أسرع على وحدات GPU الحديثة:

```python
model = model.half()  # Convert to fp16
# or
model = model.to(torch.bfloat16)
```

## الحتمية والاختبار

اضبط البذور العشوائية واستخدم فك الترميز الجشع أو منخفض الحرارة عندما تحتاج إلى مخرجات قابلة لإعادة الإنتاج:

```python
torch.manual_seed(42)
output = model.generate(
    inputs.input_ids,
    do_sample=False,  # Deterministic greedy decoding
    max_new_tokens=50
)
```

لاحظ أن عدم حتمية الفاصلة العائمة على وحدات GPU قد يسبّب اختلافات صغيرة رغم ذلك؛ ففضّل beam أو greedy في المسارات الحرجة.

## البثّ وزمن الاستجابة

في التطبيقات التفاعلية، ابثّ الرموز أثناء توليدها. واحتفظ بذاكرة مؤقتة من موترات المفتاح/القيمة لتحقيق زمن استجابة على مستوى الرمز. وفي الخدمة بالدفعات، جمّع المطالبات حسب الطول لتقليل هدر الحشو.

## الخاتمة

تولّد المفكّكات النص عبر عملية منسّقة بعناية: يفرض الانتباه السببي التوليد من اليسار إلى اليمين، وتبني كتل المحوّلات المكدّسة تمثيلات عميقة، وينتج رأس نمذجة اللغة احتمالات المفردات، وتوازن استراتيجيات فك الترميز بين الجودة والإبداع.

وفهم هذه الميكانيكيات يزيل الغموض عن كيفية عمل نماذج مثل GPT. فقد انكشف «سحر» `pipeline("text-generation")` الآن كتفاعل أنيق بين أقنعة الانتباه والتوزيعات الاحتمالية واستراتيجيات أخذ العيّنات. وتبني المحادثة الذكية الحديثة على هذه الأسس، مضيفةً ضبط التعليمات وتدابير الأمان لتصنع مساعدين مفيدين وغير ضارين من مولّدات نص قوية.

## قراءات إضافية

- Transformers — توليد النص: [https://huggingface.co/docs/transformers/main/en/generation_strategies](https://huggingface.co/docs/transformers/main/en/generation_strategies)
- معالجات Logits والمحوّلات (Warpers): [https://huggingface.co/docs/transformers/main/en/main_classes/text_generation#transformers.LogitsProcessor](https://huggingface.co/docs/transformers/main/en/main_classes/text_generation#transformers.LogitsProcessor)
- الحالة العجيبة لانحلال النص العصبي (Holtzman وآخرون، أخذ عيّنات النواة): [https://arxiv.org/abs/1904.09751](https://arxiv.org/abs/1904.09751)
- تحسين البحث الشُّعاعي: [https://arxiv.org/abs/1707.07862](https://arxiv.org/abs/1707.07862)
