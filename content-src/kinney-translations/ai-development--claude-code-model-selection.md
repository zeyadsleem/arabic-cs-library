---
title: "اختيار النموذج"
---

تتغيّر [تهيئة نموذج Claude Code](https://code.claude.com/docs/en/model-config) بسرعة. واعتبارًا من 23 يونيو 2026، الفكرة الدائمة المهمة هي استخدام الأسماء المستعارة وشكل المهمة بدلًا من ترميز معرّفات النماذج الدقيقة في كل مكان.

## أسماء مستعارة مفيدة

يدعم Claude Code أسماء مستعارة مثل:

- `default`
- `best`
- `fable`
- `sonnet`
- `opus`
- `haiku`
- `sonnet[1m]`
- `opus[1m]`
- `opusplan`

وكما في التوثيق الحالي، يُقابل `opus` النموذج [Opus 4.8](https://code.claude.com/docs/en/model-config) على واجهة Anthropic API، بينما قد يحلّ Claude Platform on AWS و[Amazon Bedrock](https://aws.amazon.com/bedrock/) و[Google Vertex AI](https://cloud.google.com/vertex-ai) و[Microsoft Foundry](https://azure.microsoft.com/products/ai-foundry/) الاسم المستعار نفسه بطريقة مختلفة. ويُقابل `sonnet` النموذج [Sonnet 4.6](https://code.claude.com/docs/en/model-config) على واجهة Anthropic API و Claude Platform on AWS، ويتاح [Fable 5](https://code.claude.com/docs/en/model-config) للاستخدام الصريح عندما يسمح الحساب وسياسة الاحتفاظ بذلك. تحقّق من توجيه النماذج الخاص بكل مزوّد قبل وضع قاعدة على مستوى الفريق.

## الإعدادات الافتراضية

تختلف إعدادات Claude Code الافتراضية حسب نوع الحساب والمزوّد. وهذا يعني أن «استخدم النموذج الافتراضي» سير عمل شخصي معقول لكنه ادّعاء ضعيف بقابلية إعادة الإنتاج. ولسير عمل الفريق، حدّد الاسم المستعار وأرّخ الإرشاد.

```
As of 2026-06-23, use `sonnet` for routine implementation and `opusplan` for
planning complex changes before execution.
```

## خطة Opus

يستخدم `opusplan` نموذج Opus للتخطيط و Sonnet للتنفيذ. وهو مناسب عندما يكون الجزء الصعب هو التصميم لا كتابة الشيفرة. اطلب الخطة أولًا وراجعها قبل السماح بتعديلات واسعة.

## الجهد والسياق

يدعم Claude Code أيضًا ضوابط الجهد مثل `/effort` والأسماء المستعارة ذات السياق الكبير مثل `sonnet[1m]` و`opus[1m]`. والسياق الأكبر ليس أفضل تلقائيًا. فهو مفيد عندما تعتمد المهمة على ملفات كثيرة أو سجلات طويلة أو مخرجات مولَّدة. وهو إسراف عندما يحدّد اختبار مركّز وملفَّا مصدر الإجابة.

## سلاسل الاحتياط

استخدم نماذج احتياطية من أجل الموثوقية:

```bash
claude --model opus --fallback-model sonnet
```

الاحتياطات سياسة تشغيلية. وينبغي أن تحافظ على نية المهمة، لا أن تخفّض مراجعة أمنية بصمت إلى إعادة كتابة رخيصة.
