---
title: "أساسيات خطوط الأنابيب (Hugging Face)"
lang: ar
source: "https://stevekinney.com/courses/python-ai/pipeline-basics"
---

> **النقاط الرئيسية**
>
> - خطوط الأنابيب توحّد المدخلات والمخرجات بتنسيق عمل المُرمِّز ← النموذج ← المعالجة اللاحقة
> - ثبّت النموذج والمراجعة صراحةً؛ واقرن دائمًا المُرمِّز الصحيح
> - عالج المدخلات دفعيًا، وفعّل البتر والحشو، واستخدم GPU بدقة مختلطة
> - تحكّم في فك الترميز (درجة الحرارة، top-p/k، الحزم) واضبط شروط توقّف آمنة
> - سجّل معرّفات النماذج ومراجعاتها ومعاملاتها؛ وطبّق حواجز حماية على الموجّهات والمخرجات
> - انزل إلى واجهات `Auto*` عندما تحتاج إلى معالجة مسبقة مخصّصة أو تحكّم في القيم اللوغاريتمية

## نظرة عامة

توفّر خطوط الأنابيب غلافًا متكاملًا جاهزًا للعمل حول النماذج والمُرمِّزات (tokenizers) والمعالجة اللاحقة للمهام الشائعة. تخيّل `pipeline` كعصا سحرية تجمع كل الخطوات اللازمة للانتقال من النص الخام إلى مخرجات منظّمة: المعالجة المسبقة (تحويل النص إلى أرقام يفهمها النموذج)، واستدلال النموذج (تمرير الأرقام عبر النموذج للتنبؤ)، والمعالجة اللاحقة (تنقية المخرجات لتكون قابلة للقراءة البشرية).

## الدفتر

اطّلع على الدفتر المرافق: [أساسيات خطوط الأنابيب](https://colab.research.google.com/drive/1OnAQGIBrbkbJYC3h-Vf3mUwru9K3usSt?usp=sharing)

## البدء مع خطوط الأنابيب

تتعامل خطوط الأنابيب مع ثماني فئات رئيسية من المهام، ولكل منها مدخلات ومخرجات محدّدة:

| المهمة | المدخل | المخرج | مثال على حالة الاستخدام |
| --- | --- | --- | --- |
| **تحليل المشاعر** | نص | تسمية المشاعر + درجة | مراجعات المنتجات |
| **توليد النصوص** | نص الموجّه | تكملة مولّدة | روبوتات المحادثة، كتابة القصص |
| **التصنيف بدون أمثلة** | نص + فئات | احتمالات الفئات | توجيه البريد الإلكتروني |
| **الإجابة عن الأسئلة** | سؤال + سياق | إجابة مستخلصة | أنظمة الأسئلة الشائعة |
| **ملء الفراغ** | نص يحتوي `<mask>` | كلمات متوقّعة | الإكمال التلقائي |
| **التلخيص** | نص طويل | ملخّص قصير | موجزات الأخبار |
| **التعرّف على الكيانات المسمّاة** | نص | تسميات الكيانات + مواضعها | الامتثال للخصوصية |
| **الترجمة** | النص المصدر | نص اللغة الهدف | الدعم متعدّد اللغات |

## تحليل المشاعر

يحدّد تحليل المشاعر ما إذا كان النص يعبّر عن مشاعر إيجابية أو سلبية. وهو من أكثر مهام معالجة اللغة الطبيعية شيوعًا، وله تطبيقات في تحليل مراجعات العملاء ومراقبة وسائل التواصل الاجتماعي وترتيب أولويات تذاكر الدعم.

```python
from transformers import pipeline

sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

texts = [
    "I love this product! It's amazing.",
    "This is terrible. I hate it.",
    "It's okay, nothing special.",
]

for text in texts:
    result = sentiment_analyzer(text)[0]
    label = result["label"]
    confidence = result["score"]
    print(f"Text: {text}")
    print(f"Sentiment: {label} (Confidence: {confidence:.3f})\n")
```

تشير درجة الثقة إلى يقين النموذج: 0.999 تعني ثقة بنسبة 99.9% (متأكّد جدًا)، و0.750 تعني ثقة بنسبة 75% (متأكّد نوعًا ما)، و0.500 تعني ثقة بنسبة 50% (غير متأكّد).

> **قصور التصنيف الثنائي**
>
> لا يُخرج نموذج المشاعر الافتراضي سوى `POSITIVE` أو `NEGATIVE`. وهو يفتقر إلى فئة `NEUTRAL` وقد يواجه صعوبة مع السخرية أو المشاعر المعقّدة.

## توليد النصوص

يولّد توليد النصوص نصًا جديدًا انطلاقًا من موجّه بداية. وخلافًا لتحليل المشاعر الذي يفسّر نصًا موجودًا، فإن التوليد ينشئ نصًا لم يكن موجودًا من قبل.

```python
text_generator = pipeline("text-generation", model="gpt2")

prompts = [
    "The future of artificial intelligence is",
    "Once upon a time in a distant galaxy",
]

for prompt in prompts:
    generated = text_generator(
        prompt,
        max_new_tokens=100,
        num_return_sequences=1,
        temperature=0.7,
        do_sample=True,
        pad_token_id=text_generator.tokenizer.eos_token_id,
    )
    print(f"{prompt}...")
    print(generated[0]["generated_text"])
    print("-" * 50)
```

### فهم معاملات التوليد

يتحكّم **`max_new_tokens`** في الحد الأقصى لعدد الرموز التي تُولَّد بعد الموجّه. ويعمل **`temperature`** كقرص للتحكّم في الإبداع: القيم المنخفضة (0.1-0.5) تنتج نصًا محافظًا، والقيم المتوسطة (0.6-0.9) توازن بين الإبداع والالتزام، والقيم المرتفعة (1.0+) تنتج مخرجات تجريبية. ويفعّل **`do_sample=True`** أخذ العينات الاحتمالي لتنويع المخرجات. ويتحكّم **`top_p`** و`top_k` في حجم مجموعة العينات.

تخيّل درجة الحرارة كما في الطبخ: الحرارة المنخفضة تعطي نتائج متوقّعة، والمتوسطة توازن بين النكهة والأمان، والمرتفعة تنتج أطباقًا جسورة لكن محفوفة بالمخاطر.

## التصنيف بدون أمثلة

يصنّف التصنيف بدون أمثلة النص في تسميات تحدّدها أنت دون أي أمثلة تدريبية. ويستخدم النموذج فهمه للغة لمطابقة النص بالفئات اعتمادًا على المعنى وحده.

```python
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

candidate_labels = ["business", "technology", "sports", "entertainment", "politics"]

texts = [
    "Apple reported record quarterly earnings driven by strong iPhone sales.",
    "The Denver Nuggets defeated the Lakers in last night's basketball game.",
]

for text in texts:
    result = classifier(text, candidate_labels)

    print(f"Text: {text}")
    print("Classifications:")
    for label, score in zip(result["labels"], result["scores"]):
        print(f"  {label}: {score:.3f}")
    print("-" * 50)
```

يحوّل النموذج التصنيف إلى استدلال باللغة الطبيعية. فلكل فئة ينشئ فرضية («هذا النص يدور حول [الفئة]»)، ويقيّم مدى ملاءمة كل فرضية، ويعيد درجات احتمال مجموعها 1.0.

### التصنيف متعدّد التسميات

افتراضيًا، يفترض المصنّف أن كل نص ينتمي إلى فئة واحدة فقط. فعّل التصنيف متعدّد التسميات للنصوص التي تناسب فئات متعدّدة:

```python
result = classifier(
    "The new iPhone is expensive but innovative.",
    candidate_labels=["technology", "business", "review"],
    multi_label=True
)
```

## الإجابة عن الأسئلة

تستخلص الإجابة عن الأسئلة نطاقات نصية دقيقة تجيب عن الأسئلة من سياق معطى. وهذا ما يُسمّى الإجابة الاستخلاصية عن الأسئلة - فهو يعثر على الإجابات داخل النص ولا يولّد معلومات جديدة أبدًا.

```python
qa_pipeline = pipeline(
    "question-answering",
    model="distilbert-base-cased-distilled-squad",
)

context = """
The modern hot dog traces its roots to German sausages brought to the U.S. by immigrants
in the 1800s. The first famous hot-dog stand popped up on Coney Island in 1871, allegedly
selling 3,684 sausages in buns during its first year. Nathan's Famous launched its annual
Hot Dog Eating Contest in 1916, turning competitive eating into a Fourth-of-July spectacle.
"""

questions = [
    "Where did the first famous hot-dog stand appear?",
    "What competitive eating event did Nathan's Famous start?",
]

for question in questions:
    result = qa_pipeline(question=question, context=context)
    print(f"Question: {question}")
    print(f"Answer: {result['answer']}")
    print(f"Confidence: {result['score']:.3f}\n")
```

> **يجب أن تكون الإجابة موجودة**
>
> سيخمّن النموذج إن لم تكن الإجابة موجودة في السياق، وغالبًا بثقة منخفضة. افحص دائمًا درجات الثقة - فالقيم دون 0.5 تعني عادةً إجابات غير موثوقة.

## ملء الفراغ

يتوقّع ملء الفراغ الكلمات الناقصة بناءً على السياق، فيكشف كيف تفهم النماذج العلاقات بين الكلمات:

```python
fill_mask = pipeline("fill-mask", model="distilroberta-base")

sentences = [
    "The capital of France is <mask>.",
    "Python is a popular <mask> language.",
]

for sentence in sentences:
    print(f"Original: {sentence}")
    results = fill_mask(sentence, top_k=3)

    print("Top predictions:")
    for i, result in enumerate(results, 1):
        token = result["token_str"]
        score = result["score"]
        print(f"  {i}. '{token}' (score: {score:.3f})")
    print("-" * 50)
```

تستخدم النماذج المختلفة رموز قناع مختلفة: فيستخدم BERT الرمز `[MASK]` بينما يستخدم RoBERTa الرمز `<mask>`. ويتعامل خط الأنابيب مع ذلك تلقائيًا.

## التلخيص

يكثّف التلخيص النصوص الطويلة مع الحفاظ على المعلومات الأساسية. وتستخدم النماذج الحديثة التلخيص التجريدي - فهي تعيد صياغة المحتوى بإيجاز بدلًا من مجرّد استخلاص الجمل.

```python
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

long_text = """
The modern hot dog traces its roots to German sausages brought to the U.S. by immigrants
in the 1800s. The first famous hot-dog stand popped up on Coney Island in 1871, allegedly
selling 3,684 sausages in buns during its first year. Classic toppings include mustard,
ketchup (controversial in Chicago), relish, onions, and sauerkraut. Nathan's Famous
launched its annual Hot Dog Eating Contest in 1916, turning competitive eating into a
Fourth-of-July spectacle.
"""

summary = summarizer(
    long_text,
    max_length=50,
    min_length=10,
    do_sample=False
)

print("Original Text:")
print(long_text)
print("\nSummary:")
print(summary[0]['summary_text'])
```

تحكّم في طول الملخّص باستخدام `max_length` و`min_length`. ويضمن ضبط `do_sample=False` ملخّصات حتمية ومتّسقة.

## التعرّف على الكيانات المسمّاة (NER)

يحدّد التعرّف على الكيانات المسمّاة الكيانات المسمّاة في النص ويصنّفها - الأشخاص والمؤسسات والمواقع وغيرها. وهو بالغ الأهمية لاستخلاص المعلومات والامتثال للخصوصية.

```python
ner_pipeline = pipeline(
    "ner",
    aggregation_strategy="simple",
    model="dbmdz/bert-large-cased-finetuned-conll03-english",
)

texts = [
    "My name is John Smith and I work at Apple Inc. in Cupertino, California.",
    "Tesla CEO Elon Musk announced the new factory will be built in Austin, Texas.",
]

for text in texts:
    print(f"Text: {text}")
    entities = ner_pipeline(text)

    if entities:
        print("Entities found:")
        for entity in entities:
            word = entity["word"]
            label = entity["entity_group"]
            confidence = entity["score"]
            print(f"  '{word}' -> {label} (confidence: {confidence:.3f})")
    print("-" * 50)
```

تشمل أنواع الكيانات القياسية **PER** (شخص) و**ORG** (مؤسسة) و**LOC** (موقع) و**MISC** (متفرّقات). استخدم دائمًا `aggregation_strategy="simple"` للحصول على كلمات كاملة بدلًا من رموز الكلمات الفرعية.

## الترجمة

تحوّل الترجمة النص بين اللغات باستخدام نماذج متخصّصة:

```python
translator = pipeline("translation_en_to_de", model="Helsinki-NLP/opus-mt-en-de")

text = "The future of artificial intelligence is fascinating."
translation = translator(text)

print(f"Original (English): {text}")
print(f"Translated (German): {translation[0]['translation_text']}")
```

تُسمّى النماذج عادةً بلغتي المصدر والهدف (مثل `en-to-de` للإنجليزية إلى الألمانية).

## تحسين الأداء

### اختيار الجهاز

استخدم GPU عند توفّره للحصول على استدلال أسرع:

```python
import torch

device = 0 if torch.cuda.is_available() else -1
pipeline = pipeline("text-generation", model="gpt2", device=device)
```

### المعالجة الدفعية

عالج مدخلات متعدّدة معًا للحصول على إنتاجية أفضل:

```python
texts = ["Text 1", "Text 2", "Text 3"]
results = sentiment_analyzer(texts, batch_size=8)
```

### الدقة المختلطة

فعّل fp16/bf16 للحصول على استدلال أسرع واستهلاك أقل للذاكرة:

```python
pipeline = pipeline(
    "text-generation",
    model="gpt2",
    torch_dtype=torch.float16
)
```

## الإعداد المتقدّم

### نماذج ومُرمِّزات مخصّصة

حدّد النماذج والمراجعات بدقة لضمان قابلية إعادة الإنتاج:

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased-finetuned-sst-2-english",
    revision="refs/pr/123"  # Pin specific version
)
tokenizer = AutoTokenizer.from_pretrained(
    "distilbert-base-uncased-finetuned-sst-2-english"
)

classifier = pipeline(
    "sentiment-analysis",
    model=model,
    tokenizer=tokenizer
)
```

### البتر والحشو

تعامل مع المدخلات متغيّرة الطول على نحو صحيح:

```python
results = pipeline(
    texts,
    truncation=True,
    padding=True,
    max_length=512
)
```

## المزالق الشائعة وحلولها

> **حدود طول السياق**
>
> للنماذج نوافذ سياق قصوى. فيتعامل GPT-2 مع 1024 رمزًا، ويتعامل BERT مع 512. والنصوص التي تتجاوز الحدود تُبتر أو تسبّب أخطاء.

> **التعامل مع التكرار في التوليد**
>
> إذا تكرّر النص المولّد، فعدّل `repetition_penalty` أو استخدم استراتيجيات فك ترميز مختلفة مثل بحث الحزمة (beam search).

> **محتوى غير لائق**
>
> قد تولّد النماذج المدرَّبة على نصوص الإنترنت محتوى متحيّزًا أو غير لائق. فطبّق دائمًا مرشّحات المحتوى في الاستخدام الإنتاجي.

## اعتبارات الإنتاج

### السلامة والمراقبة

في عمليات النشر الإنتاجية، طبّق مرشّحات محتوى للنص المولّد، وتحقق من صحة المدخلات لمنع حقن الموجّهات (prompt injection)، وسجّل تنبؤات النموذج لأغراض التنقيح، وراقب زمن الاستجابة ومعدّلات الأخطاء. واضبط إعدادات افتراضية محافظة لمعاملات التوليد وطبّق آليات مهلة للاستدلالات الطويلة.

### التخزين المؤقت والتحسين

خزّن النماذج مؤقتًا محليًا لتجنّب التنزيل المتكرّر:

```python
from transformers import pipeline
import os

# Set cache directory
os.environ["TRANSFORMERS_CACHE"] = "/path/to/cache"

# Models download once, then load from cache
pipeline = pipeline("sentiment-analysis")
```

### معالجة الأخطاء

غلّف استدعاءات خطوط الأنابيب بمعالجة أخطاء مناسبة:

```python
def safe_inference(pipeline, text, max_retries=3):
    for attempt in range(max_retries):
        try:
            return pipeline(text)
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            time.sleep(2 ** attempt)  # Exponential backoff
```

## متى تتجاوز خطوط الأنابيب

استخدم واجهات `AutoTokenizer` و`AutoModel` الأدنى مستوى عندما تحتاج إلى معالجة مسبقة مخصّصة، أو رؤوس متعدّدة المهام، أو تحكّم في معالجة القيم اللوغاريتمية (logits)، أو تكامل محكم مع أنظمة الاسترجاع أو إعادة الترتيب. فخطوط الأنابيب مثالية للنماذج الأولية السريعة وكثير من حالات الإنتاج، لكن الأنظمة المخصّصة تستفيد من التحكّم الصريح.

```python
# Example: Custom logits processing
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

inputs = tokenizer("Hello", return_tensors="pt")
outputs = model(**inputs)
logits = outputs.logits  # Direct access to raw scores

# Custom processing here
```

## الخاتمة {#conclusion}

تتيح خطوط أنابيب Hugging Face الوصول إلى أحدث نماذج معالجة اللغة الطبيعية للجميع. فهي تتولّى تعقيدات الترميز واستدلال النموذج والمعالجة اللاحقة، لتتيح لك التركيز على حلّ المشكلات بدلًا من تفاصيل التنفيذ. ابدأ بخطوط الأنابيب للنمذجة الأولية السريعة، ثم خصّصها كلما نمت احتياجاتك. فمع توفّر آلاف النماذج على Hugging Face Hub، يمكنك العثور على حلول مدرّبة مسبقًا لكل مهمة معالجة لغة طبيعية تكاد تُخطر ببالك.

## قراءات إضافية

- خطوط الأنابيب في Transformers: [https://huggingface.co/docs/transformers/main/en/main_classes/pipelines](https://huggingface.co/docs/transformers/main/en/main_classes/pipelines)
- ملخّص المهام في Transformers: [https://huggingface.co/docs/transformers/main/en/task_summary](https://huggingface.co/docs/transformers/main/en/task_summary)
- Accelerate: [https://huggingface.co/docs/accelerate/index](https://huggingface.co/docs/accelerate/index)
- Optimum: [https://huggingface.co/docs/optimum/index](https://huggingface.co/docs/optimum/index)
- bitsandbytes (8 بت/4 بت): [https://github.com/TimDettmers/bitsandbytes](https://github.com/TimDettmers/bitsandbytes)
