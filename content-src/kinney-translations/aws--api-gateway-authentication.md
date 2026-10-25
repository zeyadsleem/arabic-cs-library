---
title: "المصادقة باستخدام API Gateway"
---

واجهتك البرمجية منشورة، وCORS مُهيّأ، وواجهتك الأمامية تستطيع استدعاءها. لكن في هذه اللحظة، أي شخص يملك الرابط يستطيع استدعاء أي نقطة نهاية. لا شيء يمنع سكربتًا عشوائيًا من قصف `POST /items` ببيانات لا معنى لها. أنت بحاجة إلى المصادقة—وهي طريقة للتحقق من أن الشخص الذي يرسل الطلب هو بالفعل من يدّعي أنه هو، ومن أنه مسموح له بفعل ما يطلبه.

إن أردت الاطلاع على نسخة AWS الدقيقة من نموذج المصادقة أثناء قراءتك، فإن [دليل مُفوِّض JWT لواجهات HTTP البرمجية](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html) هو المرجع الرسمي.

يدعم API Gateway نوعين من المُفوِّضات لواجهات HTTP البرمجية: **مُفوِّضات JWT** و**مُفوِّضات Lambda**. تتولى مُفوِّضات JWT الحالة الشائعة—التحقق من الرموز الصادرة من Cognito أو Auth0 أو أي مزوّد OIDC. وتتولى مُفوِّضات Lambda كل ما عدا ذلك.

> **يفترض هذا الدرس وجود مصدر للرمز**
>
> لا تتناول هذه الدورة إعداد مزوّد الهوية نفسه—فـCognito موجود في [ما التالي](https://stevekinney.com/courses/aws/whats-next-services-youll-eventually-need)، أما Auth0 وClerk فهما خارج نطاق AWS. كل ما يلي يفترض أن لديك بالفعل JWT قادمًا من *مكان ما*: رمز اختبار صادر مسبقًا، أو Cognito User Pool، أو مستأجر Auth0. إن أردت مسارًا سريعًا للحصول على رمز حقيقي لهذا الدرس، فأنشئ مستأجر Auth0 مجانيًا واستخدم تطبيق «Machine-to-Machine» لديهم لإصدار الرموز—فهذا يمنحك شيئًا ملموسًا توجّه إليه المُفوِّض. وفي الإنتاج، على الأرجح ستنتهي إلى Cognito أو مزوّد خارجي. أما *تهيئة المُفوِّض* أدناه فهي متطابقة بغض النظر عن الجهة التي تصدر الرمز.

```
flowchart LR
    Request["Incoming API request"] --> Choice{"Authorization type"}
    Choice -- "JWT authorizer" --> JWT["Validate issuer, audience, signature"]
    Choice -- "Lambda authorizer" --> Custom["Run custom authorizer Lambda"]
    JWT --> Allowed{"Authorized?"}
    Custom --> Allowed
    Allowed -- "No" --> Reject["401 or 403 response"]
    Allowed -- "Yes" --> Route["Matched API Gateway route"]
    Route --> Handler["Backend Lambda handler"]
```

## مُفوِّضات JWT: المسار السريع

**مُفوِّض JWT** يتحقق من رموز JSON Web Tokens في الطلبات الواردة. أنت تخبر API Gateway بمكان العثور على الرمز (عادةً ترويسة `Authorization`)، ومن أصدره (رابط مزوّد OIDC)، وأي جمهور يقبل. يتحقق API Gateway من توقيع الرمز وانتهاء صلاحيته ومُصدره وجمهوره قبل أن تعمل دالة Lambda الخاصة بك. وإذا كان الرمز غير صالح، فإن الطلب يحصل على 401—ولا تُنفَّذ شيفرة المعالج لديك إطلاقًا.

هذا هو الشيء نفسه الذي يحدث عندما تستخدم وسيطًا مثل `next-auth` أو دالة حافة على Vercel للتحقق من الرموز، إلا أن API Gateway يفعل ذلك على مستوى البنية التحتية.

### إنشاء مُفوِّض JWT

إليك كيفية إنشاء مُفوِّض JWT يتحقق من الرموز الصادرة من مجمّع مستخدمي Amazon Cognito:

```bash
aws apigatewayv2 create-authorizer \
  --api-id abc123def4 \
  --authorizer-type JWT \
  --name cognito-authorizer \
  --identity-source '$request.header.Authorization' \
  --jwt-configuration \
    Issuer="https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AbCdEfGhI",Audience="1a2b3c4d5e6f7g8h9i0j" \
  --region us-east-1 \
  --output json
```

```json
{
  "AuthorizerId": "auth123",
  "AuthorizerType": "JWT",
  "IdentitySource": "$request.header.Authorization",
  "JwtConfiguration": {
    "Audience": ["1a2b3c4d5e6f7g8h9i0j"],
    "Issuer": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_AbCdEfGhI"
  },
  "Name": "cognito-authorizer"
}
```

المعاملات الأساسية:

- **`--authorizer-type JWT`**—يخبر API Gateway أن يتحقق من الرمز بوصفه JWT.
- **`--identity-source '$request.header.Authorization'`**—مكان العثور على الرمز. يقبل مُفوِّض JWT الخاص بواجهات HTTP البرمجية في API Gateway ترويسة `Authorization` تحتوي إما على رمز مجرّد أو على رمز مسبوق بـ `Bearer`—ولست بحاجة إلى إزالة البادئة بنفسك. يستخرج المُفوِّض الرمز من مصدر الهوية ويتحقق من JWT مباشرة؛ ويستقبل خادمك الخلفي المطالبات المفكوكة، لا سلسلة الترويسة الخام.
- **`--jwt-configuration Issuer`**—رابط المُصدر. بالنسبة إلى Cognito فهو `https://cognito-idp.{region}.amazonaws.com/{userPoolId}`. وبالنسبة إلى Auth0 فهو `https://{your-domain}.auth0.com/`. ويجب أن يطابق المُصدر مطالبة `iss` في JWT.
- **`--jwt-configuration Audience`**—الجمهور المتوقع. بالنسبة إلى Cognito فهو معرّف عميل التطبيق. وبالنسبة إلى Auth0 فهو معرّف الواجهة البرمجية. ويجب أن يطابق الجمهور مطالبة `aud` في JWT.

### استخدام أي مزوّد OIDC

تعمل مُفوِّضات JWT مع أي مزوّد يصدر رموز JWT ويكشف نقطة نهاية JSON Web Key Set (JWKS). ويشمل ذلك:

- **Amazon Cognito**—خدمة الهوية المدمجة في AWS
- **Auth0**—مزوّد مصادقة خارجي شائع
- **Okta**—مزوّد هوية للمؤسسات
- **Firebase Auth**—خدمة المصادقة من Google
- **أي مزوّد متوافق مع OIDC**—أي شيء ينشر نقطة نهاية `.well-known/openid-configuration`

يجلب API Gateway مجموعة JWKS الخاصة بالمزوّد (المفاتيح العامة المستخدمة لتوقيع الرموز) من نقطة نهاية `/.well-known/openid-configuration` الخاصة بالمُصدر، ويستخدمها للتحقق من توقيعات الرموز. لا تحتاج إلى إدارة المفاتيح بنفسك.

إليك الأمر نفسه لرمز صادر من Auth0:

```bash
aws apigatewayv2 create-authorizer \
  --api-id abc123def4 \
  --authorizer-type JWT \
  --name auth0-authorizer \
  --identity-source '$request.header.Authorization' \
  --jwt-configuration \
    Issuer="https://my-app.us.auth0.com/",Audience="https://api.example.com" \
  --region us-east-1 \
  --output json
```

> **نصيحة**
>
> يجب أن يتضمن رابط المُصدر الخاص بـ Auth0 الشرطة المائلة في آخره. أما روابط مُصدر Cognito فلا تتضمن شرطة مائلة في آخرها. وهذا مصدر شائع لأخطاء 401—إذ يجب أن يطابق المُصدر الموجود في الرمز المُصدر الذي تهيّئه على المُفوِّض تمامًا.

### إرفاق المُفوِّض بمسار

إنشاء مُفوِّض لا يحمي أي مسار بحد ذاته. تحتاج إلى إرفاقه بمسارات محددة باستخدام `update-route`:

```bash
aws apigatewayv2 update-route \
  --api-id abc123def4 \
  --route-id xyz789 \
  --authorization-type JWT \
  --authorizer-id auth123 \
  --authorization-scopes "items:read" "items:write" \
  --region us-east-1 \
  --output json
```

المعامل `--authorization-scopes` اختياري. وإذا حُدِّد، يتحقق API Gateway من أن مطالبة `scope` في الرمز تحتوي على واحد على الأقل من النطاقات المدرجة. وهذا يتيح لك إنشاء أذونات دقيقة: فقد يتطلب مسار `GET /items` النطاق `items:read`، بينما يتطلب `POST /items` النطاق `items:write`. وأجد أن هذه إحدى تلك الميزات التي لا تحتاجها حتى تحتاجها *حقًا*.

يمكنك العثور على معرّف المسار بسرد المسارات:

```bash
aws apigatewayv2 get-routes \
  --api-id abc123def4 \
  --region us-east-1 \
  --output json
```

### ما يستقبله المعالج لديك

عندما يوافق مُفوِّض JWT على طلب، تصبح مطالبات الرمز المفكوكة متاحة في المعالج لديك عند `event.requestContext.authorizer.jwt.claims`:

```typescript
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const claims = event.requestContext.authorizer?.jwt?.claims;
  const userId = claims?.sub;

  if (!userId) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Hello, user ${userId}` }),
  };
};
```

*ملاحظة:* مطالبة `sub` هي المعرّف الفريد للمستخدم في معظم مزوّدي OIDC.

يتضمن كائن المطالبات كل شيء في حِمل JWT: `sub` (الموضوع/معرّف المستخدم)، و`email`، و`iss` (المُصدر)، و`exp` (الانتهاء)، والمطالبات المخصّصة، وأي شيء آخر يضمّنه مزوّد الهوية.

## مُفوِّضات Lambda: منطق مخصّص

**مُفوِّضات Lambda** تشغّل دالة Lambda لتقرير ما إذا كان الطلب مسموحًا به. وهي أكثر مرونة من مُفوِّضات JWT—يمكنك التحقق من رموز صادرة من مزوّدين غير قياسيين، أو فحص ترويسات مخصّصة، أو البحث عن مفاتيح API في قاعدة بيانات، أو تنفيذ أي منطق مصادقة تحتاجه.

### إنشاء مُفوِّض Lambda

أولًا، اكتب دالة المُفوِّض. هذه دالة Lambda منفصلة عن معالج واجهتك البرمجية:

```typescript
import type { APIGatewayRequestSimpleAuthorizerHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2 = async (event) => {
  const token = event.headers?.authorization;

  if (!token) {
    return {
      isAuthorized: false,
    };
  }

  // Your custom validation logic here
  // Examples: decode a custom token, check a database, validate an API key
  const isValid = token === 'Bearer my-secret-api-key';

  return {
    isAuthorized: isValid,
    context: {
      userId: 'user-123',
      plan: 'premium',
    },
  };
};
```

يعيد المُفوِّض `isAuthorized: true` أو `isAuthorized: false`. وكائن `context` الاختياري يمرّر بيانات إلى معالج واجهتك البرمجية—إذ تظهر القيم في `event.requestContext.authorizer.lambda`.

انشر هذه الدالة بشكل منفصل (باستخدام العملية نفسها من [نشر دالة Lambda واختبارها](https://stevekinney.com/courses/aws/deploying-and-testing-a-lambda-function))، ثم أنشئ المُفوِّض:

```bash
aws apigatewayv2 create-authorizer \
  --api-id abc123def4 \
  --authorizer-type REQUEST \
  --name custom-authorizer \
  --authorizer-uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:my-frontend-app-authorizer/invocations \
  --authorizer-payload-format-version 2.0 \
  --identity-source '$request.header.Authorization' \
  --authorizer-result-ttl-in-seconds 300 \
  --region us-east-1 \
  --output json
```

وامنح API Gateway إذنًا باستدعاء دالة المُفوِّض:

```bash
aws lambda add-permission \
  --function-name my-frontend-app-authorizer \
  --statement-id apigateway-authorizer \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:123456789012:abc123def4/authorizers/auth456" \
  --region us-east-1 \
  --output json
```

> **تحذير**
>
> تُحتسب استدعاءات مُفوِّض Lambda كاستدعاءات Lambda إضافية وتترتب عليها تكاليفها الخاصة. ويخزّن المعامل `--authorizer-result-ttl-in-seconds` نتيجة التفويض مؤقتًا حتى لا يُستدعى المُفوِّض في كل طلب. اضبطه على قيمة معقولة (300 ثانية أي خمس دقائق) لتقليل زمن الاستجابة والتكلفة معًا.

### الإرفاق بمسار

```bash
aws apigatewayv2 update-route \
  --api-id abc123def4 \
  --route-id xyz789 \
  --authorization-type CUSTOM \
  --authorizer-id auth456 \
  --region us-east-1 \
  --output json
```

## مُفوِّضات JWT مقابل مُفوِّضات Lambda

| الميزة | مُفوِّض JWT | مُفوِّض Lambda |
| --- | --- | --- |
| التحقق من الرمز | مدمج (التوقيع، الانتهاء، المطالبات) | شيفرتك |
| المزوّدون المدعومون | أي مُصدر OIDC/JWT | أي شيء |
| منطق تحقق مخصّص | لا | نعم |
| تكلفة Lambda إضافية | لا | نعم (استدعاء إضافي) |
| زمن الاستجابة | أقل (بلا بدء بارد لـ Lambda) | أعلى (استدعاء Lambda) |
| التخزين المؤقت | مدمج | مدة TTL قابلة للتهيئة |
| حالة الاستخدام | تدفقات OAuth/OIDC القياسية | مفاتيح API، رموز مخصّصة، استعلامات قواعد البيانات |

ابدأ بمُفوِّضات JWT. وانتقل إلى مُفوِّضات Lambda عندما تحتاج إلى منطق لا يستطيع التحقق بواسطة JWT التعبير عنه—مثل فحص قاعدة بيانات، أو التحقق من صيغة رمز مخصّصة، أو تنفيذ تفويض متعدد المستأجرين.

## ترك المسارات بلا حماية

ليس كل مسار بحاجة إلى مصادقة. فالنقاط النهائية العامة—فحوصات السلامة، وتدفقات البيانات العامة، ومحتوى صفحة الهبوط—ينبغي أن تبقى متاحة دون رمز. أرفق المُفوِّضات بالمسارات التي تتطلب المصادقة فقط. والمسارات التي لا مُفوِّض لها مفتوحة افتراضيًا.

## استدعاء واجهة برمجية محمية من واجهتك الأمامية

من تطبيق React لديك، أدرج JWT في ترويسة `Authorization`:

```typescript
const token = await getAccessToken(); // From your auth library

const response = await fetch('https://api.example.com/items', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
```

إذا كان الرمز منتهي الصلاحية أو غير صالح، فإن الاستجابة تكون 401. وينبغي أن تتعامل واجهتك الأمامية مع ذلك بتحديث الرمز أو بإعادة التوجيه إلى تدفق تسجيل الدخول.

## أخطاء شائعة

**استخدام جمهور خاطئ.** يجب أن تطابق مطالبة `aud` في JWT الجمهور المهيّأ على المُفوِّض. وبالنسبة إلى Cognito، الجمهور هو معرّف عميل التطبيق—لا معرّف مجمّع المستخدمين. وهذا هو السبب الأكثر شيوعًا لأخطاء 401 مع رمز يبدو صالحًا.

**نسيان منح إذن الاستدعاء لدالة مُفوِّض Lambda.** تمامًا مثل معالج واجهتك البرمجية، تحتاج دالة المُفوِّض إلى سياسة قائمة على الموارد تسمح لـ `apigateway.amazonaws.com` باستدعائها. وبدون ذلك، يعيد كل طلب رمز 500.

**عدم التعامل مع استجابات 401 في الواجهة الأمامية.** عندما يرفض المُفوِّض طلبًا، تكون الاستجابة `{"message":"Unauthorized"}` المجرّدة. وينبغي أن تتحقق شيفرة واجهتك الأمامية من حالة 401 وتطلق تحديث الرمز أو إعادة التوجيه إلى تسجيل الدخول، لا أن تعرض خطأً عامًا.

باتت لديك الآن صورة API Gateway كاملة: واجهات HTTP البرمجية، والمسارات، والتكاملات، وCORS، والمراحل، والنطاقات المخصّصة، والمصادقة. وفي التمرين التالي، ستجمع كل هذه القطع معًا وتبني واجهة برمجية عاملة تستطيع واجهتك الأمامية استدعاءها.
