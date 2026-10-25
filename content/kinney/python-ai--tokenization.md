---
title: "الترميز — من النص إلى الموتّرات"
lang: ar
source: "https://stevekinney.com/courses/python-ai/tokenization"
---

> **النقاط الرئيسية**
>
> - ترميز الكلمات الفرعية (BPE/WordPiece/SentencePiece) يوازن بين التغطية وحجم المفردات
> - يجب أن تطابق الرموز الخاصة وأقنعة الانتباه ومعرّفات المقاطع توقّعات النموذج
> - استخدم البتر والحشو بحكمة؛ والنوافذ المنزلقة مع الخطوة تحافظ على السياق عبر المقاطع
> - تربط الإزاحات الرموز بنطاقات النص لمهام مثل التعرّف على الكيانات المسمّاة والإبراز
> - فضّل المُرمِّزات السريعة؛ وأعد استخدام نسخة واحدة ورمّز على دفعات للسرعة

## نظرة عامة

يحوّل الترميز النص الخام إلى معرّفات عددية صحيحة يمكن للنماذج معالجتها. ولأن الشبكات العصبية لا تفهم سوى الأرقام، فإن الترميز يجسر الفجوة بين النص البشري ونماذج الذكاء الاصطناعي عبر أربع خطوات رئيسية: تقسيم النص إلى وحدات أصغر (رموز)، وربط الرموز بمعرّفات فريدة من مفردات معيّنة، وإضافة رموز خاصة تعطي النموذج تعليمات، وإنشاء أقنعة انتباه للتعامل مع الدفعات بكفاءة.

## الدفتر

اطّلع على الدفتر المرافق: [الترميز](https://colab.research.google.com/drive/15cChgqEWrWTtWApWRBSQBqFpmWDe2ZR7?usp=sharing)

## إعداد المُرمِّزات

تستخدم النماذج المختلفة استراتيجيات ترميز مختلفة. لنستكشف أكثرها شيوعًا:

```python
from transformers import AutoTokenizer

# Load tokenizers for different models
tokenizers = {
    "BERT": AutoTokenizer.from_pretrained("bert-base-uncased"),
    "GPT-2": AutoTokenizer.from_pretrained("gpt2"),
    "RoBERTa": AutoTokenizer.from_pretrained("roberta-base"),
    "T5": AutoTokenizer.from_pretrained("t5-small")
}

# Check vocabulary sizes
for name, tokenizer in tokenizers.items():
    print(f"{name}: Vocabulary size = {tokenizer.vocab_size:,}")
```

لكل مُرمِّز مفردات ثابتة. فيعرف BERT نحو 30,000 رمز فريد، بينما يعرف GPT-2 نحو 50,000. وأي كلمة ليست في هذه المفردات تُقسَّم إلى كلمات فرعية أصغر أو تُوسَم بأنها غير معروفة.

## الترميز الأساسي

تقسّم الخطوة الأساسية النص إلى رموز. فالكلمات الشائعة تصبح رموزًا مفردة، بينما تنقسم الكلمات النادرة إلى كلمات فرعية:

```python
text = "Hello, world! Tokenization is the process of converting text into tokens."
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# Tokenize the text
tokens = tokenizer.tokenize(text)
print(tokens)
# Output: ['hello', ',', 'world', '!', 'token', '##ization', 'is', ...]
```

تشير البادئة `##` في مُرمِّز BERT إلى أن الرمز استمرار للرمز السابق. وهذا النهج القائم على الكلمات الفرعية يتيح للنماذج التعامل مع الكلمات النادرة بتقسيمها إلى أجزاء مألوفة.

## من الرموز إلى المعرّفات

تحتاج النماذج إلى أرقام لا إلى نص. ويرتبط كل رمز بمعرّف فريد:

```python
text = "Hello, world!"
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# The encode method tokenizes and converts to IDs in one step
token_ids = tokenizer.encode(text)

print(f"Original Text: {text}")
print(f"Token IDs: {token_ids}")
# Output: Token IDs: [101, 7592, 1010, 2088, 999, 102]
```

يمثّل كل رقم رمزًا محدّدًا: «hello» → 7592، و«world» → 2088. ويعالج النموذج هذه الأرقام لا النص الأصلي.

## الرموز الخاصة

توفّر الرموز الخاصة بنية وتعليمات للنموذج:

```python
# BERT adds special tokens automatically
decoded = tokenizer.decode(token_ids)
print(f"Decoded: {decoded}")
# Output: [CLS] hello , world ! [SEP]
```

يحدّد **`[CLS]`** (101) بداية التسلسل، ويُستخدم في مهام التصنيف. ويفصل **`[SEP]`** (102) بين المقاطع المختلفة أو يحدّد النهاية. ويملأ **`[PAD]`** (0) التسلسلات الأقصر لتوافق طول الدفعة. ويستبدل **`[UNK]`** الكلمات غير المعروفة غير الموجودة في المفردات. ويُستخدم **`[MASK]`** في نمذجة اللغة المقنّعة أثناء التدريب.

هذه الرموز بالغة الأهمية لأداء النموذج. فبدونها لن يفهم النموذج أين تبدأ التسلسلات وأين تنتهي أو كيف يتعامل مع المقاطع المختلفة.

## المعالجة الدفعية وأقنعة الانتباه

تكون النماذج أكثر كفاءة عند معالجة نصوص متعدّدة دفعةً واحدة. لكن النصوص المجمّعة في دفعة تتفاوت أطوالها. ويحلّ الحشو هذه المشكلة، لكن كيف يعرف النموذج أي الرموز يتجاهل؟ تجيب أقنعة الانتباه عن ذلك.

### تشبيه المصباح

تخيّل قناع الانتباه كمصباح في غرفة مظلمة. فأنت تريد إضاءة الكلمات الحقيقية فقط دون الحشو. ويخبر القناع النموذج بمكان «تسليط ضوئه» (أي مكان الانتباه):

```python
texts = [
    "The cat sat on the mat.",
    "The cat sat.",
]

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
inputs = tokenizer(texts, padding=True, return_tensors="pt")

print("Token IDs:")
print(inputs["input_ids"])
print("\nAttention Mask:")
print(inputs["attention_mask"])
```

يوضّح المخرج كيف يعمل الحشو:

```
Token IDs:
[[101, 1996, 4937, 3323, 2006, 1996, 13523, 1012, 102],
 [101, 1996, 4937, 3323, 1012, 102, 0, 0, 0]]

Attention Mask:
[[1, 1, 1, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 1, 1, 0, 0, 0]]
```

كل رقم في قناع الانتباه يشبه مفتاح إضاءة: `1` تعني «انظر إلى هذه الكلمة!» و`0` تعني «تجاهل هذه، فهي مجرّد حشو».

## مقارنة المُرمِّزات

تتعامل المُرمِّزات المختلفة مع النص نفسه بطرق مختلفة:

```python
text = "Uncommon-tokenization: transformers' tokenizers are fast."

for name, tok in tokenizers.items():
    tokens = tok.tokenize(text)
    print(f"{name}: {len(tokens)} tokens")
    print(f"  Sample: {tokens[:5]}...")
```

قد يقسّم BERT كلمة «Uncommon» إلى `['un', '##common']` بينما يحتفظ بها GPT-2 كاملة. ويستخدم RoBERTa ترميزًا على مستوى البايت، ويستخدم T5 تقنية SentencePiece. ولكل نهج مقايضات بين حجم المفردات والتعامل مع الكلمات النادرة والدعم متعدّد اللغات.

## إعدادات الترميز العملية

تتحكّم معاملات رئيسية في سلوك الترميز:

```python
# Full tokenization with all options
encoded = tokenizer(
    text,
    padding="max_length",      # Pad to max_length
    truncation=True,           # Cut if too long
    max_length=128,           # Maximum sequence length
    return_tensors="pt",      # Return PyTorch tensors
    return_offsets_mapping=True,  # Character spans
    return_attention_mask=True    # Attention mask
)
```

تشمل خيارات **`padding`** القيمة `'longest'` للحشو الديناميكي لكل دفعة، والقيمة `'max_length'` للأشكال الثابتة عبر الدفعات، والقيمة `False` لعدم الحشو. ويضمن **`truncation`** أن تتناسب التسلسلات مع حدود النموذج. ويمكن أن يكون **`return_tensors`** القيمة `"pt"` لـ PyTorch، أو `"tf"` لـ TensorFlow، أو `None` للقوائم.

## التعامل مع المستندات الطويلة

تتجاوز النصوص الطويلة حدود النموذج، ولا بدّ من تقطيعها بذكاء:

```python
long_text = "Very long document..." * 100

# Use sliding windows with overlap
encoded = tokenizer(
    long_text,
    max_length=512,
    truncation=True,
    return_overflowing_tokens=True,
    stride=64,  # Overlap between chunks
)

print(f"Number of chunks: {len(encoded['input_ids'])}")
```

ينشئ المعامل `stride` تداخلًا بين المقاطع، ما يحافظ على السياق عند الحدود. وهذا يحسّن التماسك في مهام مثل الإجابة عن الأسئلة أو التلخيص.

## فك الترميز وربط الإزاحات

حوّل المعرّفات مرة أخرى إلى نص وتتبّع مواضع الأحرف:

```python
# Encode with offset mapping
enc = tokenizer(
    "The quick brown fox",
    return_offsets_mapping=True
)

# Decode back to text
decoded = tokenizer.decode(enc["input_ids"], skip_special_tokens=True)

# Offsets show character spans for each token
for token_id, (start, end) in zip(enc["input_ids"], enc["offset_mapping"]):
    if start != end:  # Skip special tokens
        token = tokenizer.decode([token_id])
        original_span = text[start:end]
        print(f"Token: '{token}' maps to characters {start}:{end} = '{original_span}'")
```

يتيح ربط الإزاحات محاذاة دقيقة بين تنبؤات النموذج والنص الأصلي، وهو أمر ضروري لمهام مثل التعرّف على الكيانات المسمّاة أو إبراز نطاقات محدّدة.

## كيف يعمل ترميز الكلمات الفرعية

تستخدم المُرمِّزات الحديثة خوارزميات الكلمات الفرعية للموازنة بين حجم المفردات والتغطية:

يبدأ **ترميز أزواج البايتات (BPE)** بالأحرف ثم يدمج الأزواج الأكثر تكرارًا تكرارًا. ويستخدم **WordPiece** (الذي يعتمد عليه BERT) تقييمًا قائمًا على الأرجحية لعمليات الدمج. ويتعامل **SentencePiece** مع النص كبايتات خام، ما يتيح ترميزًا مستقلًا عن اللغة.

تُطبّع العملية النص (تحويله إلى أحرف صغيرة، وتطبيع unicode)، ثم تقسّمه مسبقًا إلى مقاطع أولية (المسافات وعلامات الترقيم)، ثم تطبّق قواعد الدمج المتعلّمة لإنشاء الكلمات الفرعية، ثم تربط الرموز النهائية بمعرّفات المفردات.

## تحسين الأداء

توفّر المُرمِّزات السريعة (المدعومة بـ Rust) تسريعًا ملحوظًا:

```python
# Fast tokenizers have additional capabilities
fast_tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased", use_fast=True)

# Batch tokenization is vectorized
texts = ["Text 1", "Text 2", "Text 3"] * 100
%timeit fast_tokenizer(texts, padding=True, truncation=True)
```

تشمل نصائح التحسين إعادة استخدام نسخ المُرمِّز لتجنّب إعادة تحميل المفردات، ومعالجة النصوص دفعةً واحدة بدلًا من معالجتها فرادى، واستخدام المُرمِّزات السريعة للحصول على سرعة أكبر 10-100 مرة، وتخزين مجموعات البيانات المرمّزة مؤقتًا لتجنّب المعالجة المتكرّرة.

## المزالق الشائعة وحلولها

> **عدم توافق المُرمِّزات**
>
> اقرن دائمًا المُرمِّز نفسه بنموذجه بدقة. فاستخدام مُرمِّز BERT مع نموذج GPT-2 ينتج مخرجات رديئة.

> **التعامل مع الأحرف الخاصة**
>
> تحقّق من كيفية تعامل مُرمِّزك مع unicode والرموز التعبيرية والأحرف الخاصة. فبعضها يطبّع بشكل مكثّف، وبعضها يحافظ على كل شيء.

> **طول أقصى خاطئ**
>
> البتر الصغير جدًا يفقد سياقًا بالغ الأهمية. والكبير جدًا يهدر الذاكرة. افحص بياناتك لتعرف الأطوال المثلى.

## معرّفات نوع الرمز والتعامل مع المقاطع

تستخدم بعض النماذج (مثل BERT) معرّفات نوع الرمز للمدخلات المزدوجة:

```python
# Question-answering or sentence pair classification
question = "What is tokenization?"
context = "Tokenization converts text to numbers for models to process."

inputs = tokenizer(
    question,
    context,
    return_token_type_ids=True
)

# Token type IDs mark which segment each token belongs to
print(inputs["token_type_ids"])
# [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
#  <-- question --> <---- context ----->
```

## أنماط ترميز متقدّمة

في الأنظمة الإنتاجية، ضع هذه الأنماط في الحسبان:

```python
class SmartTokenizer:
    def __init__(self, model_name, max_length=512):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.max_length = max_length

    def tokenize_batch(self, texts, **kwargs):
        # Default settings for consistency
        return self.tokenizer(
            texts,
            padding="longest",
            truncation=True,
            max_length=self.max_length,
            return_tensors="pt",
            **kwargs
        )

    def smart_truncate(self, text, preserve_end=False):
        # Sometimes the end of text is more important
        tokens = self.tokenizer.tokenize(text)
        if len(tokens) > self.max_length - 2:  # Account for special tokens
            if preserve_end:
                tokens = tokens[-(self.max_length - 2):]
            else:
                tokens = tokens[:self.max_length - 2]
        return self.tokenizer.convert_tokens_to_ids(tokens)
```

## تنقيح الترميز

عندما تسوء الأمور، افحص عملية الترميز:

```python
def debug_tokenization(tokenizer, text):
    # Step-by-step breakdown
    tokens = tokenizer.tokenize(text)
    token_ids = tokenizer.convert_tokens_to_ids(tokens)
    decoded = tokenizer.decode(token_ids)

    print(f"Original: {text}")
    print(f"Tokens: {tokens}")
    print(f"IDs: {token_ids}")
    print(f"Decoded: {decoded}")
    print(f"Matches original? {decoded.lower() == text.lower()}")

    # Check special tokens
    full_ids = tokenizer.encode(text)
    print(f"With special tokens: {full_ids}")
    print(f"Special token positions: {[i for i, id in enumerate(full_ids)
                                       if id in tokenizer.all_special_ids]}")
```

## الخاتمة {#conclusion}

الترميز هو أساس جميع مهام معالجة اللغة الطبيعية. وفهم كيف يتحوّل النص إلى أرقام، وكيف يعمل الحشو وأقنعة الانتباه، وكيف تتصرّف المُرمِّزات المختلفة يساعدك على تنقيح المشكلات وتحسين الأداء وبناء تطبيقات أكثر تطورًا. فكل سلسلة نصية يعالجها نموذج لغوي تمرّ بهذا التحوّل الحاسم من نص مقروء بشريًا إلى موتّرات (tensors) جاهزة للنموذج.

## قراءات إضافية

- ملخّص المُرمِّزات في Transformers: [https://huggingface.co/docs/transformers/main/en/tokenizer_summary](https://huggingface.co/docs/transformers/main/en/tokenizer_summary)
- مكتبة Tokenizers: [https://huggingface.co/docs/tokenizers/index](https://huggingface.co/docs/tokenizers/index)
- ترميز أزواج البايتات (Sennrich وآخرون، 2015): [https://arxiv.org/abs/1508.07909](https://arxiv.org/abs/1508.07909)
- WordPiece (Schuster وNakajima، 2012): [https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/37842.pdf](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/37842.pdf)
- SentencePiece (Kudo وRichardson، 2018): [https://arxiv.org/abs/1808.06226](https://arxiv.org/abs/1808.06226)
