---
title: "Parameter Store: التهيئة الهرمية"
---

**Parameter Store** جزء من AWS Systems Manager (SSM). إنه مخزن مفتاح-قيمة لبيانات التهيئة — نفس نوع البيانات التي كنت تضعها في متغيرات بيئة Lambda، لكن مع تشفير وتحكّم في الوصول وإصدارات وفضاء أسماء هرمي مدمج.

إذا أردت نسخة AWS من الميزة نفسها أثناء قراءتك، فإن [توثيق Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) هو المرجع الرسمي.

إذا كانت متغيرات بيئة Lambda أشبه بملف `.env` مسطّح، فإن Parameter Store أشبه بشجرة تهيئة منظّمة. أجد هذا التمييز مفيدًا لأنه يغيّر طريقة تفكيرك في تنظيم التهيئة. تنظّم المعاملات حسب التطبيق والبيئة والغرض باستخدام مسارات تشبه أدلّة نظام الملفات: `/my-frontend-app/production/api-key`. وعلى خلاف متغيرات البيئة، يمكنك مشاركة المعاملات بين عدة دوال Lambda دون تكرار القيم.

## إنشاء المعاملات باستخدام CLI

ينشئ الأمر `put-parameter` معاملًا جديدًا أو يحدّث معاملًا قائمًا. إليك معامل نص عادي:

```bash
aws ssm put-parameter \
  --name "/my-frontend-app/production/table-name" \
  --value "my-frontend-app-data" \
  --type "String" \
  --region us-east-1 \
  --output json
```

تتضمّن الاستجابة رقم الإصدار والطبقة:

```json
{
  "Version": 1,
  "Tier": "Standard"
}
```

الآن أنشئ معامل **SecureString** لشيء حسّاس — مفتاح API:

```bash
aws ssm put-parameter \
  --name "/my-frontend-app/production/api-key" \
  --value "sk_live_abc123xyz" \
  --type "SecureString" \
  --region us-east-1 \
  --output json
```

في وحدة التحكم، يعرض نموذج **Create parameter** خيار النوع **SecureString** مع محدّد مفتاح KMS.

نموذج Create parameter في AWS Systems Manager Parameter Store يعرض الاسم /my-frontend-app/api-key مملوءًا وSecureString محدّدًا كنوع مع مفتاح KMS الافتراضي.

تُشفَّر القيمة عند السكون باستخدام مفتاح KMS تديره AWS. يمكنك أيضًا تحديد مفتاح KMS خاص بك عبر العلم `--key-id`، لكن المفتاح الافتراضي يفي بالغرض في معظم حالات الاستخدام.

> **نصيحة**
>
> لتحديث معامل موجود، أضف العلم `--overwrite`. بدونه يفشل `put-parameter` إذا كان المعامل موجودًا بالفعل. هذه ميزة أمان — فلا تكتب فوق قيم الإنتاج عن غير قصد.

## المسارات الهرمية

الشرطات المائلة في أسماء المعاملات ليست مجرد مظهر. إنها تحدّد تسلسلًا هرميًا يمكنك الاستعلام عنه، والأهم من ذلك أنها تتيح لك حصر أذونات IAM في أشجار فرعية كاملة.

إليك بنية نموذجية لتطبيق واجهة أمامية ببيئتين:

```
/my-frontend-app/
├── production/
│   ├── table-name          (String)
│   ├── api-key             (SecureString)
│   ├── api-endpoint        (String)
│   └── feature-flags       (String)
├── staging/
│   ├── table-name          (String)
│   ├── api-key             (SecureString)
│   ├── api-endpoint        (String)
│   └── feature-flags       (String)
```

يمنحك هذا التسلسل الهرمي أمرين. أولًا، يمكنك استرجاع جميع معاملات بيئة معيّنة في استدعاء واحد. ثانيًا، يمكنك كتابة سياسة IAM تمنح دالة Lambda وصولًا إلى `/my-frontend-app/production/*` دون منحها وصولًا إلى معاملات staging.

في وحدة التحكم، تعرض قائمة **Parameter Store** جميع المعاملات في حسابك. يمكنك التصفية حسب المسار لرؤية تسلسل `/my-frontend-app/` فقط.

تعرض قائمة AWS Systems Manager Parameter Store المعاملات بأسمائها وأنواعها وتواريخ آخر تعديل لها.

لنضِف بضعة معاملات أخرى:

```bash
aws ssm put-parameter \
  --name "/my-frontend-app/production/api-endpoint" \
  --value "https://api.example.com/v1" \
  --type "String" \
  --region us-east-1 \
  --output json

aws ssm put-parameter \
  --name "/my-frontend-app/production/feature-flags" \
  --value '{"darkMode":true,"newCheckout":false}' \
  --type "String" \
  --region us-east-1 \
  --output json
```

## String مقابل SecureString

يدعم Parameter Store ثلاثة أنواع:

| النوع | التشفير | حالة الاستخدام |
| --- | --- | --- |
| `String` | لا شيء | أسماء الجداول، وعناوين URL للنقاط الطرفية، ورايات الميزات |
| `StringList` | لا شيء | قيم مفصولة بفواصل |
| `SecureString` | KMS | مفاتيح API، والرموز، وكلمات المرور، وسلاسل الاتصال |

تُخزَّن معاملات **String** كنص عادي. استخدمها للتهيئة غير الحسّاسة — نفس نوع القيم التي تضعها في متغيرات بيئة Lambda.

تُشفَّر معاملات **SecureString** عند السكون بمفتاح KMS. عند استرجاع SecureString، يجب أن تطلب فك التشفير صراحةً عبر العلم `--with-decryption` (CLI) أو `WithDecryption: true` (SDK). وبدون ذلك تحصل على النص المشفّر، وهو بلا فائدة.

يخزّن **StringList** قيمًا مفصولة بفواصل في معامل واحد. يكون مفيدًا أحيانًا، لكن في معظم الأوقات يكون استخدام سلسلة JSON في معامل `String` عادي أفضل.

> **تحذير**
>
> تتطلّب معاملات SecureString أذونات KMS لفك التشفير. إذا لم يكن دور تنفيذ دالة Lambda يملك إذن `kms:Decrypt` على مفتاح KMS المستخدم لتشفير المعامل، فيمكن للدالة قراءة اسم المعامل لكنها لا تستطيع فك تشفير القيمة. ستحصل على خطأ رفض الوصول وقت التشغيل، لا وقت النشر.

## استرجاع المعاملات

### الحصول على معامل واحد

```bash
aws ssm get-parameter \
  --name "/my-frontend-app/production/table-name" \
  --region us-east-1 \
  --output json
```

الاستجابة:

```json
{
  "Parameter": {
    "Name": "/my-frontend-app/production/table-name",
    "Type": "String",
    "Value": "my-frontend-app-data",
    "Version": 1,
    "LastModifiedDate": "2026-03-18T10:00:00.000Z",
    "ARN": "arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/table-name"
  }
}
```

بالنسبة إلى معاملات SecureString، أضف `--with-decryption`:

```bash
aws ssm get-parameter \
  --name "/my-frontend-app/production/api-key" \
  --with-decryption \
  --region us-east-1 \
  --output json
```

بدون `--with-decryption`، يحتوي الحقل `Value` على النص المشفّر.

### الحصول على كل المعاملات حسب المسار

هنا يُثمر التسلسل الهرمي. استرجع كل معامل تحت مسار معيّن:

```bash
aws ssm get-parameters-by-path \
  --path "/my-frontend-app/production" \
  --with-decryption \
  --recursive \
  --region us-east-1 \
  --output json
```

يعيد هذا جميع المعاملات الأربعة تحت `/my-frontend-app/production/` في استدعاء API واحد. يتضمّن العلم `--recursive` المعاملات في المسارات المتداخلة. وبدونه تُعاد فقط العناصر الفرعية المباشرة للمسار المحدّد.

## استرجاع المعاملات باستخدام SDK

إليك كيفية استرجاع معامل من دالة Lambda باستخدام AWS SDK v3:

```typescript
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({});

const getParameter = async (name: string): Promise<string> => {
  const response = await ssm.send(
    new GetParameterCommand({
      Name: name,
      WithDecryption: true,
    }),
  );

  if (!response.Parameter?.Value) {
    throw new Error(`Parameter ${name} not found or has no value`);
  }

  return response.Parameter.Value;
};
```

*ملاحظة:* `WithDecryption: true` مطلوب لمعاملات `SecureString`. وليس له أي تأثير على معاملات `String`، لذا يمكنك ضبطه بأمان لجميع المعاملات.

لاسترجاع كل المعاملات تحت مسار:

```typescript
import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({});

const getParametersByPath = async (path: string): Promise<Record<string, string>> => {
  const response = await ssm.send(
    new GetParametersByPathCommand({
      Path: path,
      WithDecryption: true,
      Recursive: true,
    }),
  );

  const parameters: Record<string, string> = {};
  for (const param of response.Parameters ?? []) {
    if (param.Name && param.Value) {
      const key = param.Name.replace(path, '').replace(/^\//, '');
      parameters[key] = param.Value;
    }
  }

  return parameters;
};
```

*ملاحظة:* أزل بادئة المسار للحصول على مفتاح نظيف مثل `api-key` بدلًا من المسار الكامل.

> **تحذير**
>
> يقتصر `GetParametersByPath` على **10 معاملات في كل استدعاء**. إذا كان العدد أكثر من ذلك، تتضمّن الاستجابة `NextToken` يجب تمريره في استدعاء متابعة. يتجاهل المثال أعلاه ترقيم الصفحات — فإذا كان لديك أكثر من 10 معاملات تحت المسار، فسترى أول 10 فقط دون أي تنبيه. الشكل الصحيح هو حلقة:
>
> ```typescript
> let nextToken: string | undefined;
> do {
>   const response = await ssm.send(
>     new GetParametersByPathCommand({
>       Path: path,
>       WithDecryption: true,
>       Recursive: true,
>       NextToken: nextToken,
>     }),
>   );
>   for (const param of response.Parameters ?? []) {
>     /* collect */
>   }
>   nextToken = response.NextToken;
> } while (nextToken);
> ```
>
> أو استخدم مساعد ترقيم الصفحات في AWS SDK v3: `paginateGetParametersByPath({ client: ssm }, { Path: path })`.

## الطبقة القياسية مقابل الطبقة المتقدّمة

لـ Parameter Store طبقتان:

| الميزة | القياسية | المتقدّمة |
| --- | --- | --- |
| **التكلفة** | مجانية | 0.05 دولار لكل معامل شهريًا |
| **أقصى حجم للقيمة** | 4 KB | 8 KB |
| **أقصى عدد معاملات لكل منطقة** | 10,000 | 100,000 |
| **سياسات المعاملات** | لا | نعم (انتهاء الصلاحية، الإشعارات) |
| **الإنتاجية** | 40 TPS (افتراضي) | حتى 1,000 TPS (إنتاجية أعلى) |

بالنسبة إلى كل تطبيق واجهة أمامية تقريبًا، الطبقة القياسية أكثر من كافية. أنت تخزّن حفنة من قيم التهيئة، لا عشرات الآلاف. حدّ القيمة البالغ 4 KB هو نفسه حدّ متغيرات البيئة في Lambda، وهو وفير لمفاتيح API وسلاسل التهيئة.

> **نصيحة**
>
> لا تحتاج إلى اختيار طبقة مسبقًا. تكون المعاملات افتراضيًا في الطبقة القياسية. وإذا احتجت لاحقًا إلى ميزات متقدّمة، يمكنك تغيير طبقة المعامل عبر `put-parameter --tier Advanced --overwrite`. يمكنك أيضًا ضبط الطبقة على `Intelligent-Tiering` وترك AWS يرقّي المعاملات إلى المتقدّمة فقط عندما تتجاوز حدود الطبقة القياسية.

## إدارة الإصدارات

في كل مرة تحدّث فيها معاملًا، يزيد Parameter Store رقم إصداره. يمكنك استرجاع إصدار محدّد بإلحاق `:version` بالاسم:

```bash
aws ssm get-parameter \
  --name "/my-frontend-app/production/api-key:1" \
  --with-decryption \
  --region us-east-1 \
  --output json
```

يمنحك هذا مسار تدقيق خفيفًا والقدرة على التراجع عن تغيير في التهيئة دون إعادة نشر أي شيء.

يتولّى Parameter Store معظم احتياجات التهيئة، لكنه لا يدوّر بيانات الاعتماد نيابةً عنك. عندما تحتاج إلى تدوير تلقائي — لكلمات مرور قواعد البيانات، أو رموز OAuth، أو أي بيانات اعتماد لها دورة حياة — فهنا يأتي دور Secrets Manager. يغطي الدرس التالي Secrets Manager ومتى يستحق تكلفته.

## التنظيف

معاملات الطبقة القياسية مجانية، لذا لا يوجد سبب متعلّق بالفواتير لحذفها — لكن الحذف يبقي فضاء أسماء المعاملات نظيفًا:

```bash
aws ssm delete-parameters \
  --names \
    "/my-frontend-app/production/table-name" \
    "/my-frontend-app/production/api-key" \
    "/my-frontend-app/production/api-endpoint" \
    "/my-frontend-app/production/feature-flags" \
  --region us-east-1 \
  --output json
```
