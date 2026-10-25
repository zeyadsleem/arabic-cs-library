---
title: "الوصول إلى الأسرار من Lambda"
lang: ar
source: "https://stevekinney.com/courses/aws/accessing-secrets-from-lambda"
---

أنت تعرف كيف تخزّن الأسرار في Parameter Store وSecrets Manager. الآن تحتاج إلى قراءتها من دالة Lambda. النمط واضح: نفّذ استدعاءً عبر SDK أثناء التهيئة، وخزّن النتيجة في متغيّر على مستوى الوحدة، وأعد استخدامها عبر الاستدعاءات. هذا هو نمط التهيئة نفسه الذي استخدمته لمتغيّرات البيئة في [متغيّرات بيئة Lambda](https://stevekinney.com/courses/aws/lambda-environment-variables) — والفرق أن القيمة تأتي من استدعاء واجهة برمجية بدلًا من `process.env`.

إذا أردت نسخة AWS الرسمية من جانب وقت التشغيل في هذا النمط، فإن [نظرة Secrets Manager العامة](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) و[دليل متغيّرات بيئة Lambda](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html) مرجعان يستحقّان أن يبقيا مفتوحين.

```
flowchart LR
    Cold["Cold start or expired cache"] --> Fetch["Fetch parameter or secret with the SDK"]
    Fetch --> Cache["Store value in a module-level cache"]
    Cache --> Handler["Handler uses cached value"]
    Handler --> Warm{"Warm invocation and TTL still valid?"}
    Warm -- "Yes" --> Handler
    Warm -- "No" --> Fetch
```

## القراءة من Parameter Store

ثبّت حزمة عميل SSM في مشروع Lambda لديك:

```bash
npm install @aws-sdk/client-ssm
```

إليك دالة Lambda تقرأ مفتاح واجهة برمجية من Parameter Store في وقت التهيئة:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({});

let apiKey: string | undefined;

const loadConfig = async () => {
  if (apiKey) return;

  const response = await ssm.send(
    new GetParameterCommand({
      Name: '/my-frontend-app/production/api-key',
      WithDecryption: true,
    }),
  );

  apiKey = response.Parameter?.Value;
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await loadConfig();

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load API key' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Configuration loaded', keyPrefix: apiKey.slice(0, 4) }),
  };
};
```

*ملاحظة:* `WithDecryption: true` مطلوب لمعاملات `SecureString`. وبدونه تحصل على نص مشفّر.

تعمل الدالة `loadConfig` في أول استدعاء. وفي الاستدعاءات الدافئة اللاحقة يكون `apiKey` مضبوطًا بالفعل ويُتخطّى استدعاء SDK. هذا يعني أنك تجري استدعاءً واحدًا لكل بدء بارد، لا استدعاءً لكل طلب.

## القراءة من Secrets Manager

ثبّت حزمة عميل Secrets Manager:

```bash
npm install @aws-sdk/client-secrets-manager
```

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const secretsManager = new SecretsManagerClient({});

let stripeConfig: { apiKey: string; webhookSecret: string } | undefined;

const loadSecrets = async () => {
  if (stripeConfig) return;

  const response = await secretsManager.send(
    new GetSecretValueCommand({
      SecretId: '/my-frontend-app/production/stripe-key',
    }),
  );

  if (!response.SecretString) {
    throw new Error('Secret value is empty');
  }

  stripeConfig = JSON.parse(response.SecretString);
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await loadSecrets();

  if (!stripeConfig) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to load Stripe configuration' }),
    };
  }

  // Use stripeConfig.apiKey and stripeConfig.webhookSecret in your business logic
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Stripe configuration loaded' }),
  };
};
```

*ملاحظة:* يعيد Secrets Manager القيمة بعد فكّ تشفيرها تلقائيًا. فلا حاجة إلى خيار `WithDecryption`.

## أذونات IAM

يحتاج دور تنفيذ دالة Lambda إلى إذن لقراءة المعاملات أو الأسرار المحددة التي يستخدمها. تذكّر من [أدوار تنفيذ Lambda وأذوناتها](https://stevekinney.com/courses/aws/lambda-execution-roles-and-permissions) أن دور التنفيذ يتحكم في خدمات AWS التي يمكن للدالة الوصول إليها.

### من أجل Parameter Store

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
      "Action": ["kms:Decrypt"],
      "Resource": "arn:aws:kms:us-east-1:123456789012:alias/aws/ssm"
    }
  ]
}
```

العبارة الأولى تمنح الوصول إلى كل المعاملات تحت المسار `/my-frontend-app/production/`. والعبارة الثانية تمنح الإذن بفكّ تشفير معاملات SecureString باستخدام مفتاح KMS المُدار من AWS. أما إذا استخدمت مفتاح KMS مُدارًا من العميل، فاستبدل ARN المورد بـ ARN مفتاحك.

> **تحذير**
>
> ARN المعامل في سياسات IAM **لا** يتضمن شرطة مائلة بادئة قبل اسم المعامل. فالمعامل المسمّى `/my-frontend-app/production/api-key` له ARN بالشكل `arn:aws:ssm:us-east-1:123456789012:parameter/my-frontend-app/production/api-key` — لاحظ الشرطة المائلة الواحدة بين `parameter` و`my-frontend-app`. هذا ما يوقع الناس في الخطأ، لأن اسم المعامل يبدأ بـ `/` لكن مسار ARN لا يضاعفها.

### من أجل Secrets Manager

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue"],
      "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:/my-frontend-app/production/*"
    }
  ]
}
```

يتولّى Secrets Manager فكّ التشفير داخليًا عندما تستدعي `GetSecretValue`، فلا تحتاج إلى إذن `kms:Decrypt` منفصل — إلا إذا استخدمت مفتاح KMS مُدارًا من العميل. في تلك الحالة، أضف عبارة `kms:Decrypt` لذلك المفتاح.

### إرفاق السياسة

أرفق هذه الأذونات بدور تنفيذ Lambda باستخدام سياسة مضمّنة:

```bash
aws iam put-role-policy \
  --role-name my-frontend-app-lambda-role \
  --policy-name parameter-store-access \
  --policy-document file://parameter-store-policy.json \
  --output json
```

أو أنشئ سياسة مُدارة وأرفقها — وهو النهج الذي تعلمته في [كتابة أول سياسة IAM لك](https://stevekinney.com/courses/aws/writing-your-first-iam-policy). في الحالتين ينطبق مبدأ الامتياز الأدنى: امنح الوصول إلى المعاملات المحددة التي تحتاجها دالتك، لا إلى كل المعاملات في حسابك.

## استراتيجيات التخزين المؤقت

نمط الجلب في وقت التهيئة الموضّح أعلاه يعمل جيدًا للأسرار التي لا تتغير أثناء تشغيل الدالة. لكن إذا استخدمت التدوير التلقائي في Secrets Manager، فقد يتغيّر السر بينما بيئة تنفيذ Lambda لديك لا تزال دافئة. عندها تصبح القيمة المخزّنة مؤقتًا قديمة.

إليك نمط تخزين مؤقت مع مدة صلاحية (TTL):

```typescript
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({});

let cachedValue: string | undefined;
let cacheExpiry = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const getParameter = async (name: string): Promise<string> => {
  const now = Date.now();

  if (cachedValue && now < cacheExpiry) {
    return cachedValue;
  }

  const response = await ssm.send(
    new GetParameterCommand({
      Name: name,
      WithDecryption: true,
    }),
  );

  if (!response.Parameter?.Value) {
    throw new Error(`Parameter ${name} not found`);
  }

  cachedValue = response.Parameter.Value;
  cacheExpiry = now + CACHE_TTL_MS;

  return cachedValue;
};
```

*ملاحظة:* بعد 5 دقائق، يعيد الاستدعاء التالي جلب المعامل. هذا يُبقي الذاكرة المؤقتة حديثة دون استدعاء الواجهة البرمجية في كل طلب.

مدة صلاحية 5 دقائق تعني أن دالتك تعيد جلب السر مرة واحدة كل 5 دقائق لكل بيئة تنفيذ على الأكثر. وقد وجدت أن هذا توازن جيد لمعظم التطبيقات بين حداثة القيمة وتكلفة استدعاءات الواجهة البرمجية.

## إضافة Lambda لمعاملات وأسرار AWS

توفّر AWS إضافة Lambda تتولّى التخزين المؤقت نيابةً عنك. فبدلًا من إجراء استدعاءات SDK من كودك، تضيف طبقة Lambda تشغّل ذاكرة مؤقتة محلية عبر HTTP. وتستعيد دالتك المعاملات باستدعاء `localhost:2773` بدلًا من واجهة SSM أو Secrets Manager البرمجية.

أضف طبقة الإضافة إلى دالتك:

```bash
EXTENSION_ARN=$(aws ssm get-parameter \
  --name "/aws/service/aws-parameters-and-secrets-lambda-extension/x86/latest" \
  --query "Parameter.Value" \
  --region us-east-1 \
  --output text)

aws lambda update-function-configuration \
  --function-name my-frontend-app-api \
  --layers "$EXTENSION_ARN" \
  --region us-east-1 \
  --output json
```

> **تحذير**
>
> ARN الإضافة **خاص بالمعمارية** و**خاص بالمنطقة** في الوقت نفسه. فمسار `x86/latest` أعلاه يُحلّ إلى طبقة مبنية لدوال Lambda من نوع `x86_64`؛ أما `arm64/latest` فيُحلّ إلى طبقة مختلفة مبنية لدوال `arm64` (Graviton). وإرفاق طبقة x86 بدالة arm64 لا يفشل وقت النشر — بل تُقلع الدالة، لكن أي استدعاء إلى `localhost:2773` يفشل في وقت التشغيل لأن ملف الإضافة التنفيذي لا يمكن تشغيله على ذلك المعالج. والأسوأ من ذلك أن المعاملات العامة في AWS تُحلّ في المنطقة التي تستدعيها منها، فبحث `aws ssm get-parameter` في `us-east-1` يمنحك ARN من `us-east-1` لن يعمل في دالة منشورة في `eu-west-1`. طابق كلا الأمرين — خيار المعمارية (`x86` مقابل `arm64`) والمنطقة (`--region`) — مع الدالة التي تُرفق بها الطبقة.

ثم استرجع المعاملات عبر HTTP:

```typescript
const getParameterFromExtension = async (name: string): Promise<string> => {
  const response = await fetch(
    `http://localhost:2773/systemsmanager/parameters/get?name=${encodeURIComponent(name)}&withDecryption=true`,
    {
      headers: {
        'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN ?? '',
      },
    },
  );

  const data = await response.json();
  return data.Parameter.Value;
};
```

ولأجل Secrets Manager:

```typescript
const getSecretFromExtension = async (secretId: string): Promise<string> => {
  const response = await fetch(
    `http://localhost:2773/secretsmanager/get?secretId=${encodeURIComponent(secretId)}`,
    {
      headers: {
        'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN ?? '',
      },
    },
  );

  const data = await response.json();
  return data.SecretString;
};
```

تخزّن الإضافة القيم مؤقتًا بمدة صلاحية قابلة للتهيئة (الافتراضي 300 ثانية). وتتحكم في المدة عبر متغيّري البيئة `SSM_PARAMETER_STORE_TTL` و`SECRETS_MANAGER_TTL` على الدالة.

> **نصيحة**
>
> يقايض نهج الإضافة تبعيات SDK باستدعاءات HTTP. وهو مفيد عندما تريد تخزينًا مؤقتًا دون كتابة منطق التخزين المؤقت، أو عندما تريد إبقاء حزمة النشر صغيرة بعدم تضمين حزم SDK الخاصة بـ SSM أو Secrets Manager. أما حالات الاستخدام البسيطة التي فيها أسرار قليلة، فنهج SDK المباشر مناسب تمامًا.

## جمع كل ذلك معًا

إليك دالة Lambda كاملة تقرأ اسم جدول DynamoDB من متغيّر بيئة (غير حساس، ولا يتغيّر)، ومفتاح واجهة برمجية من Parameter Store (حساس، ونادرًا ما يتغيّر)، وتستخدم الاثنين:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const ssm = new SSMClient({});
const tableName = process.env.TABLE_NAME;

let apiKey: string | undefined;

const loadSecrets = async () => {
  if (apiKey) return;

  const response = await ssm.send(
    new GetParameterCommand({
      Name: '/my-frontend-app/production/api-key',
      WithDecryption: true,
    }),
  );

  apiKey = response.Parameter?.Value;
};

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  await loadSecrets();

  if (!tableName || !apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing configuration' }),
    };
  }

  // Use tableName for DynamoDB operations, apiKey for third-party API calls
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'All configuration loaded',
      table: tableName,
    }),
  };
};
```

هذا النمط — متغيّرات البيئة للتهيئة غير الحساسة، وParameter Store أو Secrets Manager للقيم الحساسة، والتخزين المؤقت في وقت التهيئة لكليهما — هو النهج القياسي لدوال Lambda في الإنتاج. أصبح لديك الآن خدمتان تحلّان مشكلات متشابهة. ويقدّم الدرس التالي مقارنة مباشرة بين Parameter Store وSecrets Manager لمساعدتك على تحديد أيهما تلجأ إليه في السيناريوهات المختلفة.
