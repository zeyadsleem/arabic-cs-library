---
title: "Parameter Store مقابل Secrets Manager"
---

لديك خدمتان في AWS يمكنهما تخزين الأسرار. هذه خدمة واحدة أكثر من اللازم لكل من يريد فقط معرفة أين يضع مفتاح API. يمنحك هذا الدرس إطار قرار واضحًا حتى تتوقّف عن التردّد وتبدأ البناء.

إذا أردت النسخة الرسمية من AWS لسلوك الخدمتين أثناء قراءتك، فإن [نظرة عامة على AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) و[توثيق Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) هما المرجعان المعتمدان.

```
flowchart TD
    Start["New value to store"] --> Sensitive{"Sensitive?"}
    Sensitive -- "No" --> String["Parameter Store String"]
    Sensitive -- "Yes" --> Rotate{"Needs automatic rotation?"}
    Rotate -- "Yes" --> Secrets["Secrets Manager"]
    Rotate -- "No" --> Secure["Parameter Store SecureString"]
```

## المقارنة

| الميزة | Parameter Store (القياسي) | Parameter Store (المتقدّم) | Secrets Manager |
| --- | --- | --- | --- |
| **التكلفة** | مجاني | 0.05 دولار/معامل/شهر | 0.40 دولار/سر/شهر + 0.05 دولار لكل 10 آلاف استدعاء API |
| **أقصى حجم للقيمة** | 4 KB | 8 KB | 64 KB |
| **التشفير** | SecureString (KMS) | SecureString (KMS) | مشفّر دائمًا (KMS) |
| **التدوير التلقائي** | لا | لا | نعم |
| **إدارة الإصدارات** | نعم | نعم | نعم (مع تسميات المراحل) |
| **المسارات الهرمية** | نعم | نعم | نعم (بحسب العرف) |
| **النسخ المتماثل عبر المناطق** | لا | لا | نعم |
| **سياسات المعاملات (انتهاء الصلاحية)** | لا | نعم | لا ينطبق (التدوير يتولّى دورة الحياة) |
| **أقصى إنتاجية** | 40 TPS (افتراضي)، 1,000 TPS (أعلى) | 1,000 TPS (أعلى) | 5,000 TPS |
| **أقصى عدد معاملات/أسرار لكل منطقة** | 10,000 | 100,000 | 500,000 |
| **تسجيل CloudTrail** | نعم | نعم | نعم |

يحكي الجدول قصة واضحة: Parameter Store مخزن تهيئة عام الغرض مع تشفير اختياري. أما Secrets Manager فخزنة بيانات اعتماد يكون التدوير سِمتها المميّزة.

## متى تستخدم Parameter Store

**التهيئة غير الحسّاسة.** أسماء الجداول، وعناوين URL لنقاط نهاية API، وJSON لرايات الميزات، ومعرّفات المراحل. هذه معاملات `String` عادية. وهي مجانية، وذات إصدارات، ومنظّمة حسب المسار. وهذا يحلّ محل متغيرات بيئة Lambda التي كنت تستخدمها — البيانات نفسها، لكن بتنظيم وتحكّم في الوصول أفضل.

**القيم الحسّاسة التي لا تحتاج إلى تدوير.** مفتاح API لطرف ثالث تحدّثه مرة في السنة. سر توقيع ثابت لرموز JWT. مفتاح تشفير لرموز جهة العميل. خزّن هذه كمعاملات `SecureString`. فتحصل على تشفير KMS وتحكّم في الوصول عبر IAM مجانًا.

**التهيئة المشتركة بين عدة دوال.** إذا احتاجت خمس دوال Lambda إلى عنوان URL نفسه لنقطة نهاية API، فإن تخزينه في Parameter Store يعني تحديثه في مكان واحد. أما مع متغيرات البيئة، فحدّثه في خمس دوال وتأمل ألا تنسى واحدة.

**المشاريع التي تكون فيها التكلفة مهمة.** المشاريع الشخصية، والمشاريع الجانبية، والشركات الناشئة في مراحلها المبكرة — أي شيء يكون فيه 0.40 دولار لكل سر شهريًا مصروفًا غير ضروري. Parameter Store القياسي مجاني.

## متى تستخدم Secrets Manager

**بيانات اعتماد قواعد البيانات.** إذا اتصلت دوال Lambda لديك بـ RDS أو Aurora أو Redshift، يوفّر Secrets Manager دوال Lambda جاهزة للتدوير. تفعّل التدوير، وتضبط جدولًا زمنيًا، ويتولّى Secrets Manager دورة حياة بيانات الاعتماد — بإنشاء كلمات مرور جديدة واختبارها وترقيتها إلى الحالة النشطة. ويلتقط تطبيقك كلمة المرور الجديدة عند الجلب التالي.

**بيانات الاعتماد التي يجب أن تدوّر وفق جدول.** غالبًا ما تتطلّب سياسات الأمان في المؤسسات الكبيرة تدوير بيانات الاعتماد كل 30 أو 60 أو 90 يومًا. التدوير اليدوي عرضة للأخطاء. أما Secrets Manager فيؤتمته.

**التعافي من الكوارث عبر المناطق.** إذا كنت تحتاج إلى أسرارك متاحة في عدة مناطق للتبديل عند الفشل، يدعم Secrets Manager النسخ المتماثل. أما Parameter Store فلا يدعمه.

**متطلبات الامتثال.** إن تدريج إصدارات Secrets Manager (`AWSCURRENT` و`AWSPENDING` و`AWSPREVIOUS`) ومسار تدقيق التدوير المدمج يلبّيان متطلبات الامتثال التي لا تلبيها إدارة الإصدارات الأبسط في Parameter Store.

## النهج الهجين

تستخدم معظم تطبيقات الإنتاج الخدمتين معًا. هذا ليس حلًا وسطًا — إنه النمط الموصى به.

```
Parameter Store (free)
├── /my-frontend-app/production/table-name          → "my-frontend-app-data"
├── /my-frontend-app/production/api-endpoint        → "https://api.example.com/v1"
├── /my-frontend-app/production/feature-flags       → '{"darkMode":true}'
├── /my-frontend-app/production/log-level           → "info"
└── /my-frontend-app/production/third-party-api-key → (SecureString) "sk_abc123"

Secrets Manager ($0.40/month per secret)
├── /my-frontend-app/production/database-credentials → (auto-rotates every 30 days)
└── /my-frontend-app/production/oauth-client-secret  → (auto-rotates every 90 days)
```

التهيئة غير الحسّاسة والأسرار الثابتة تذهب إلى Parameter Store. وبيانات الاعتماد التي لها دورة حياة تدوير تذهب إلى Secrets Manager. وتقرأ دالة Lambda لديك من الاثنين:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const ssm = new SSMClient({});
const secretsManager = new SecretsManagerClient({});

let config: { apiEndpoint: string; apiKey: string } | undefined;
let dbCredentials: { username: string; password: string } | undefined;

const loadConfig = async () => {
  if (!config) {
    const [endpointResponse, keyResponse] = await Promise.all([
      ssm.send(new GetParameterCommand({ Name: '/my-frontend-app/production/api-endpoint' })),
      ssm.send(
        new GetParameterCommand({
          Name: '/my-frontend-app/production/third-party-api-key',
          WithDecryption: true,
        }),
      ),
    ]);

    config = {
      apiEndpoint: endpointResponse.Parameter?.Value ?? '',
      apiKey: keyResponse.Parameter?.Value ?? '',
    };
  }

  if (!dbCredentials) {
    const response = await secretsManager.send(
      new GetSecretValueCommand({
        SecretId: '/my-frontend-app/production/database-credentials',
      }),
    );

    dbCredentials = JSON.parse(response.SecretString ?? '{}');
  }
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await loadConfig();

  // config and dbCredentials are now available
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'All configuration loaded' }),
  };
};
```

*ملاحظة:* اجلب عدة معاملات على التوازي باستخدام `Promise.all` لتقليل زمن التهيئة.

## مخطط قرار

عندما تكون لديك قيمة تهيئة جديدة لتخزينها، اطرح هذه الأسئلة بالترتيب:

1. **هل هي حسّاسة؟** لا — استخدم `String` في Parameter Store. فهي مجانية وذات إصدارات وقابلة للاستعلام حسب المسار.
2. **هل تحتاج إلى تدوير تلقائي؟** نعم — استخدم Secrets Manager. فالتكلفة مبرَّرة بالأتمتة.
3. **هل هي قيمة حسّاسة لا تحتاج إلى تدوير؟** استخدم `SecureString` في Parameter Store. فتحصل على تشفير KMS وتحكّم في الوصول عبر IAM دون تكلفة Secrets Manager.

هذا كل شيء. ثلاثة أسئلة، وإجابة واحدة في كل مرة.

## اعتبارات IAM

عندما تستخدم الخدمتين، يحتاج دور تنفيذ Lambda لديك إلى أذونات لكلتيهما. إليك سياسة مدمجة:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ssm:GetParameter", "ssm:GetParametersByPath"],
      "Resource": "arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/*"
    },
    {
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue"],
      "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:/my-frontend-app/production/*"
    },
    {
      "Effect": "Allow",
      "Action": ["kms:Decrypt"],
      "Resource": "arn:aws:kms:us-east-1:123456789012:key/1234abcd-12ab-34cd-56ef-1234567890ab"
    }
  ]
}
```

لاحظ تحديد النطاق. يمنح بيان SSM وصولًا إلى المعاملات تحت `/my-frontend-app/production/*`. ويفعل بيان Secrets Manager الشيء نفسه للأسرار. أما البيان الثالث فيمنح إذن فك التشفير لقيم `SecureString` في Parameter Store المشفّرة بمفتاح KMS **يديره العميل**.

> **تحذير**
>
> يستخدم بيان `kms:Decrypt` الموضّح هنا **ARN المفتاح** في KMS، لا ARN للاسم المستعار. يقيّم IAM شروط موارد KMS حسب ARN المفتاح، وسترفض بعض أدوات التقييم بصمت سياسة تشير إلى `arn:aws:kms:…:alias/…` في حقل `Resource`. اكتب ARN المفتاح هنا دائمًا (أو امنح إذن فك التشفير عبر سياسة مفتاح KMS، وهي النمط الأفضل للوصول عبر الحسابات).
>
> لا تحتاج إلى هذا البيان أصلًا إلا إذا كنت تستخدم مفتاح KMS **يديره العميل**. فالمعاملات المشفّرة بمفتاح `alias/aws/ssm` الذي تديره AWS يتولّاها SSM نيابةً عن المستدعي — ولا يحتاج دور التنفيذ إلى بيان `kms:Decrypt` صريح لأن SSM يستخدم منحه الخاصة. وإذا كانت جميع معاملات `SecureString` لديك تستخدم المفتاح الافتراضي `alias/aws/ssm`، فاحذف هذا البيان تمامًا. وهذا يتبع مبدأ أقل الامتيازات الذي تعلّمته في [مبدأ أقل الامتيازات](https://stevekinney.com/courses/aws/principle-of-least-privilege) — تحصل كل دالة على وصول إلى ما تحتاجه بالضبط.

إن حرف البدل `*` في ARN الخاص بـ Secrets Manager ليس كسلًا — إنه مطلوب. فـ Secrets Manager يضيف لاحقة عشوائية من 6 أحرف إلى عناوين ARN الخاصة بالأسرار (مثل `secret:/my-frontend-app/production/stripe-key-AbCdEf`) لمنع إعادة استخدام الاسم داخل فترة استرداد الحذف. لا يمكنك توقّع تلك اللاحقة وقت كتابة السياسة، لذا يجب أن تستخدم سياسة IAM لديك `*` أو تتضمّن ARN الكامل مع اللاحقة.

> **نصيحة**
>
> إذا كانت لديك دوال Lambda منفصلة لميزات مختلفة (واحدة لإدارة المستخدمين، وواحدة للمدفوعات)، فامنح كل دالة وصولًا إلى أسرارها فقط. فدالة المدفوعات تحصل على وصول إلى `/my-frontend-app/production/stripe-*`. ودالة إدارة المستخدمين تحصل على وصول إلى `/my-frontend-app/production/auth-*`. لا تمنح كل دالة وصولًا إلى كل سر.

## أخطاء شائعة

**استخدام Secrets Manager للتهيئة غير الحسّاسة.** تخزين اسم جدول DynamoDB في Secrets Manager يكلّف 0.40 دولار شهريًا بلا سبب. استخدم Parameter Store.

**تخزين الأسرار في متغيرات البيئة «مؤقتًا فقط».** إن «مؤقتًا فقط» لها نصف عمر يقارب الأبد. لقد ارتكبت هذا الخطأ بنفسي. ضع السر في المكان الصحيح من البداية.

**عدم تخزين الأسرار مؤقتًا في Lambda.** كل استدعاء SDK إلى Parameter Store أو Secrets Manager يضيف زمن استجابة وتكلفة API. خزّن القيم في متغيرات على مستوى الوحدة وحدّثها وفق TTL أو عند بدء التشغيل البارد. غطّينا هذا النمط في [الوصول إلى الأسرار من Lambda](https://stevekinney.com/courses/aws/accessing-secrets-from-lambda).

**منح `ssm:GetParameter` على موارد `*`.** يمنح هذا الدالة وصولًا إلى كل معامل في حسابك. احصر المورد في المسار المحدّد الذي تحتاجه دالتك.

## ما الذي تعلّمته

منحك قسم الأسرار الأدوات اللازمة لنقل التهيئة الحسّاسة من متغيرات بيئة Lambda إلى تخزين أسرار مخصّص لهذا الغرض. يتولّى Parameter Store التهيئة والأسرار الثابتة مجانًا. ويتولّى Secrets Manager بيانات الاعتماد المتدوّرة مقابل 0.40 دولار لكل سر شهريًا. تقرأ دوال Lambda لديك من الاثنين عند التهيئة، وتخزّن القيم مؤقتًا، وتستخدم سياسات IAM لفرض التحكّم في الوصول.

النمط بسيط: متغيرات البيئة للتهيئة غير الحسّاسة التي لا تتغيّر بين عمليات النشر. وParameter Store لكل ما عدا ذلك ولا يتدوّر. وSecrets Manager لبيانات الاعتماد التي يجب أن تدوّر. الآن انقل مفتاح API ذاك خارج متغيرات بيئتك.
