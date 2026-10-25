---
title: "Secrets Manager: التدوير والتشفير"
---

**Secrets Manager** خدمة AWS مستقلة بُنيت لغرض واحد: تخزين بيانات الاعتماد الحساسة وتدويرها. صحيح أن Parameter Store يستطيع الاحتفاظ بقيم مشفّرة (SecureString)، لكن Secrets Manager يذهب أبعد من ذلك بتدوير مدمج، وتكامل بين الخدمات، وواجهة برمجية مصمّمة خصيصًا لإدارة دورة حياة بيانات الاعتماد.

إذا أردت النسخة الرسمية من AWS لسلوك الخدمة أثناء القراءة، فإن [نظرة عامة على AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) و[توثيق Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) هما المرجعان المعتمدان.

فكّر في الأمر هكذا: Parameter Store مخزن إعدادات يدعم التشفير فحسب. أما Secrets Manager فخزنة بيانات اعتماد يكون التدوير فيها ميزة أساسية من الدرجة الأولى.

## إنشاء سر

يمكنك إنشاء سر من CLI بسلسلة JSON:

```bash
aws secretsmanager create-secret \
  --name "/my-frontend-app/production/stripe-key" \
  --secret-string '{"apiKey":"sk_live_abc123xyz","webhookSecret":"whsec_def456"}' \
  --region us-east-1 \
  --output json
```

تتضمن الاستجابة ARN الخاص بالسر واسمه:

```json
{
  "ARN": "arn:aws:secretsmanager:us-east-1:123456789012:secret:/my-frontend-app/production/stripe-key-AbCdEf",
  "Name": "/my-frontend-app/production/stripe-key",
  "VersionId": "a1b2c3d4-5678-90ab-cdef-EXAMPLE11111"
}
```

لاحظ اللاحقة العشوائية في ARN (`-AbCdEf`). يضيفها Secrets Manager تلقائيًا لضمان التفرّد. وعند الإشارة إلى السر في سياسات IAM، يمكنك استخدام الاسم أو ARN الكامل.

في وحدة التحكم، تعرض قائمة **Secrets** كل الأسرار في حسابك مع أسمائها وأوصافها وتواريخ آخر تدوير لها.

![صفحة قائمة Secrets في AWS Secrets Manager تعرض قائمة الأسرار مع أعمدة للاسم والوصف وآخر استرجاع وآخر تغيير.](/images/kinney/7a5d69a1e85a2b05.webp)

يمكنك أيضًا تخزين سلسلة نصية عادية بدلًا من JSON:

```bash
aws secretsmanager create-secret \
  --name "/my-frontend-app/production/sendgrid-key" \
  --secret-string "SG.abc123xyz" \
  --region us-east-1 \
  --output json
```

لكن JSON هو الافتراضي الأفضل. ألجأ إليه دائمًا تقريبًا. فمعظم بيانات الاعتماد لها قيم مترابطة متعددة—مفتاح API وسر، أو اسم مستخدم وكلمة مرور، أو معرّف عميل وسر عميل. وتخزينها معًا ككائن JSON يُبقيها متزامنة.

## مع SDK

```typescript
import {
  SecretsManagerClient,
  CreateSecretCommand,
  GetSecretValueCommand,
  UpdateSecretCommand,
  RotateSecretCommand,
} from '@aws-sdk/client-secrets-manager';

const secrets = new SecretsManagerClient({ region: 'us-east-1' });

await secrets.send(
  new CreateSecretCommand({
    Name: '/my-frontend-app/production/stripe-key',
    SecretString: JSON.stringify({
      apiKey: 'sk_live_abc123xyz',
      webhookSecret: 'whsec_def456',
    }),
  }),
);

const value = await secrets.send(
  new GetSecretValueCommand({ SecretId: '/my-frontend-app/production/stripe-key' }),
);
const { apiKey, webhookSecret } = JSON.parse(value.SecretString!);

// Rotate on a schedule:
await secrets.send(
  new RotateSecretCommand({
    SecretId: '/my-frontend-app/production/database-password',
    RotationLambdaARN: 'arn:aws:lambda:us-east-1:123456789012:function:my-rotation-function',
    RotationRules: { AutomaticallyAfterDays: 30 },
  }),
);
```

## استرجاع سر

```bash
aws secretsmanager get-secret-value \
  --secret-id "/my-frontend-app/production/stripe-key" \
  --region us-east-1 \
  --output json
```

تتضمن الاستجابة القيمة المفكوكة التشفير:

```json
{
  "ARN": "arn:aws:secretsmanager:us-east-1:123456789012:secret:/my-frontend-app/production/stripe-key-AbCdEf",
  "Name": "/my-frontend-app/production/stripe-key",
  "VersionId": "a1b2c3d4-5678-90ab-cdef-EXAMPLE11111",
  "SecretString": "{\"apiKey\":\"sk_live_abc123xyz\",\"webhookSecret\":\"whsec_def456\"}",
  "VersionStages": ["AWSCURRENT"],
  "CreatedDate": "2026-03-18T10:00:00.000Z"
}
```

يحتوي حقل `SecretString` على قيمتك المفكوكة التشفير. وإذا خزّنت JSON، فأنت تحلّله في كود تطبيقك.

## التشفير باستخدام KMS

كل سر في Secrets Manager مشفّر بمفتاح KMS. يستخدم Secrets Manager افتراضيًا مفتاحًا مُدارًا من AWS (`aws/secretsmanager`). يمكنك أيضًا تحديد مفتاح KMS مُدار من العميل عند إنشاء السر:

```bash
aws secretsmanager create-secret \
  --name "/my-frontend-app/production/database-password" \
  --secret-string "my-database-password-here" \
  --kms-key-id "arn:aws:kms:us-east-1:123456789012:key/1a2b3c4d-5678-90ab-cdef-EXAMPLE22222" \
  --region us-east-1 \
  --output json
```

لماذا قد تستخدم مفتاحًا مُدارًا من العميل؟ لسببين. أولًا، يتيح لك التحكم فيمن يمكنه فكّ تشفير السر بشكل مستقل عن من يمكنه الوصول إلى Secrets Manager. ثانيًا، يتيح لك تتبّع استخدام مفتاح KMS في CloudTrail، ما يمنحك مسار تدقيق منفصلًا لعمليات فكّ التشفير.

بالنسبة إلى معظم التطبيقات الأمامية، المفتاح الافتراضي المُدار من AWS كافٍ. ستستخدم مفتاحًا مُدارًا من العميل عندما تتطلب سياسة الأمان في مؤسستك ذلك، أو عندما تحتاج إلى مشاركة الأسرار بين حسابات AWS (الوصول بين الحسابات يتطلب مفتاحًا مُدارًا من العميل).

## التدوير التلقائي

هذه هي الميزة التي تفصل Secrets Manager عن كل شيء آخر. يمكنك تهيئة سر ليدور تلقائيًا وفق جدول—كل 30 يومًا، أو كل 7 أيام، أو أي شيء تتطلبه سياسة الأمان لديك.

يعمل التدوير عبر دالة Lambda. عندما يُطلق جدول التدوير، يستدعي Secrets Manager دالة Lambda للتدوير تقوم بما يلي:

1. إنشاء بيانات اعتماد جديدة لدى الخدمة الخارجية (مثلًا، توليد كلمة مرور قاعدة بيانات جديدة)
2. تخزين بيانات الاعتماد الجديدة في Secrets Manager كنسخة معلّقة
3. اختبار بيانات الاعتماد الجديدة للتأكد من أنها تعمل
4. ترقية بيانات الاعتماد الجديدة إلى النسخة الحالية

بالنسبة إلى الخدمات الأصلية في AWS مثل RDS وRedshift وDocumentDB، توفّر AWS دوال Lambda جاهزة للتدوير. تُفعّل التدوير بأمر CLI واحد:

```bash
aws secretsmanager rotate-secret \
  --secret-id "/my-frontend-app/production/database-password" \
  --rotation-lambda-arn "arn:aws:lambda:us-east-1:123456789012:function:my-rotation-function" \
  --rotation-rules '{"AutomaticallyAfterDays": 30}' \
  --region us-east-1 \
  --output json
```

أما خدمات الطرف الثالث (Stripe وSendGrid وTwilio)، فأنت تكتب دالة Lambda للتدوير خاصة بك تستدعي واجهة الخدمة البرمجية لتوليد مفتاح جديد.

> **تحذير**
>
> إذا كانت قاعدة بيانات RDS أو Aurora لديك داخل VPC خاصة (وهو الافتراضي لأي شيء بمستوى الإنتاج)، فيجب أن تعمل دالة Lambda للتدوير داخل VPC نفسها أيضًا، *ويجب* أن تكون لتلك VPC **نقطة نهاية VPC لـ Secrets Manager** (`com.amazonaws.us-east-1.secretsmanager`). فمن دون نقطة النهاية، لا تستطيع دالة Lambda للتدوير الوصول إلى واجهة Secrets Manager البرمجية لتأكيد النجاح، ويفشل التدوير بصمت مع أخطاء مهلة غامضة. هذا هو السبب الأكثر شيوعًا لتعطّل تدوير RDS بعد الإعداد الأولي.

> **تحذير**
>
> التدوير التلقائي يعني أن تطبيقك يجب أن يتعامل مع تغيّر بيانات الاعتماد بلطف. إذا خزّنت دالة Lambda سرًا مؤقتًا وقت التهيئة ولم تحدّثه أبدًا، فستسبب بيانات الاعتماد المدوّرة أعطالًا حتى البدء البارد التالي. الحل هو التخزين المؤقت مع TTL وإعادة الجلب عند انتهاء صلاحية الذاكرة المؤقتة. يغطي الدرس التالي استراتيجيات التخزين المؤقت بالتفصيل.

## مراحل النسخ

يستخدم Secrets Manager **مراحل النسخ** لإدارة التدوير دون توقف. المرحلتان المهمتان هما:

- **`AWSCURRENT`**—النسخة النشطة. وهي ما يحصل عليه تطبيقك افتراضيًا عند استرجاع السر.
- **`AWSPENDING`**—النسخة التي تُختبر أثناء التدوير. وبمجرد التحقق منها، تصبح `AWSCURRENT`.

ثمة أيضًا **`AWSPREVIOUS`**—النسخة القديمة، محفوظة كي تستطيع التطبيقات التي خزّنت القيمة السابقة مؤقتًا أن تصادق خلال نافذة التدوير. هكذا يعمل التدوير دون توقف: تظل بيانات الاعتماد القديمة صالحة حتى تُلغيها دالة Lambda للتدوير صراحةً.

## التسعير

Secrets Manager ليس مجانيًا. إليك تفصيل التكلفة:

| المكوّن | التكلفة |
| --- | --- |
| التخزين | 0.40 دولار لكل سر شهريًا |
| استدعاءات API | 0.05 دولار لكل 10,000 استدعاء API |

عشرة أسرار تكلف 4.00 دولارات شهريًا. ومئة سر تكلف 40.00 دولارًا شهريًا. تكلفة استدعاءات API ضئيلة لمعظم التطبيقات—فدالة Lambda تسترجع سرًا مرة واحدة لكل بدء بارد تولّد استدعاءات API قليلة جدًا.

قارن هذا بالطبقة القياسية من Parameter Store، وهي مجانية. لتطبيق أمامي ببضعة أسرار لا تحتاج إلى تدوير تلقائي، يصعب تبرير 0.40 دولار لكل سر شهريًا. أما بيانات اعتماد قاعدة بيانات يجب أن تدور كل 30 يومًا دون توقف، فهي تستحق كل قرش.

## متى يستحق Secrets Manager

استخدم Secrets Manager عندما:

- **تحتاج إلى تدوير تلقائي.** هذا هو الفارق الأساسي. إذا كانت بيانات اعتماد تحتاج إلى التدوير وفق جدول—كلمات مرور قواعد البيانات، ومفاتيح حسابات الخدمات—فإن Secrets Manager هو الأداة.
- **تستخدم RDS أو Redshift أو DocumentDB.** توفّر AWS دوال تدوير جاهزة لهذه الخدمات. التدوير شبه جاهز بالكامل.
- **تتطلب مؤسستك إدارة دورة حياة بيانات الاعتماد.** يتتبّع Secrets Manager تواريخ الإنشاء والتدوير وسجل النسخ. وفرق الامتثال تحب ذلك.
- **تحتاج إلى تكرار بين المناطق.** يستطيع Secrets Manager تكرار الأسرار إلى مناطق متعددة لاستعادة الكوارث.

استخدم Parameter Store SecureString عندما:

- **لا تحتاج بيانات الاعتماد إلى تدوير تلقائي.** مفتاح API لطرف ثالث تحدّثه يدويًا مرة في السنة لا يحتاج إلى Secrets Manager.
- **التكلفة مهمة.** الطبقة القياسية من Parameter Store مجانية. لمشروع شخصي أو شركة ناشئة في مرحلة مبكرة، يصعب التغلّب على المجاني.
- **تريد تخزين الإعدادات والأسرار في المكان نفسه.** يتعامل Parameter Store مع كليهما ببنية مسارات هرمية.

> **نصيحة**
>
> من الأنماط الشائعة استخدام كليهما: Parameter Store للإعدادات غير الحساسة والأسرار التي لا تدور، وSecrets Manager لبيانات اعتماد قواعد البيانات وغيرها من الأسرار التي تحتاج إلى تدوير تلقائي. إنهما ليسا خدمتين متنافستين—بل يكمّل إحداهما الآخر.

## تحديث سر

لتحديث قيمة سر:

```bash
aws secretsmanager put-secret-value \
  --secret-id "/my-frontend-app/production/stripe-key" \
  --secret-string '{"apiKey":"sk_live_newkey789","webhookSecret":"whsec_newsecret456"}' \
  --region us-east-1 \
  --output json
```

هذا ينشئ نسخة جديدة من السر. وتنتقل النسخة السابقة إلى مرحلة `AWSPREVIOUS`.

## حذف سر

لا يحذف Secrets Manager الأسرار فورًا. بل يجدول الحذف بنافذة استرداد:

```bash
aws secretsmanager delete-secret \
  --secret-id "/my-frontend-app/production/stripe-key" \
  --recovery-window-in-days 7 \
  --region us-east-1 \
  --output json
```

خلال نافذة الاسترداد (7 أيام كحد أدنى، و30 يومًا افتراضيًا)، يمكنك استعادة السر. وهذا يحمي من الحذف غير المقصود. وإذا كنت متأكدًا تمامًا وتريد تخطي نافذة الاسترداد، فأضف `--force-delete-without-recovery`، لكن فكّر مرتين قبل استخدامه.

أنت تعرف الآن أين تخزّن الأسرار. السؤال التالي: كيف تقرأها دالة Lambda الخاصة بك فعليًا وقت التشغيل؟ يغطي الدرس التالي استدعاءات SDK، وأذونات IAM، واستراتيجيات التخزين المؤقت التي تجعل استرجاع الأسرار فعّالًا.
