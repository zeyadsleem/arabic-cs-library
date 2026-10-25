---
title: "الترويسات وCORS وسياسات الأمان"
lang: ar
source: "https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security"
---

يقدّم توزيع CloudFront الخاص بك موقعك الثابت عبر HTTPS، ويوجّه مسارات SPA بشكل صحيح، ويحمي S3 عبر التحكم في الوصول إلى الأصل (Origin Access Control). لكن افتح أدوات مطوّري المتصفح (DevTools)، وافحص ترويسات الاستجابة على أي طلب، وستلاحظ شيئًا ناقصًا: لا توجد ترويسات أمان. لا `Strict-Transport-Security`. لا `X-Content-Type-Options`. لا `X-Frame-Options`. لا يضيف S3 هذه الترويسات، ولا يضيفها CloudFront افتراضيًا.

إذا أردت أن تطّلع على نسخة AWS من آليات ترويسات الاستجابة أثناء القراءة، فإن [دليل سياسة ترويسات استجابة CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html) هو المرجع الرسمي.

على Vercel، تضبط هذه الترويسات في `vercel.json` أو `next.config.js`. وعلى Netlify، تستخدم `_headers`. وعلى AWS، تستخدم **سياسة ترويسات استجابة** (response headers policy) في CloudFront.

## لماذا تهم ترويسات الأمان

ترويسات الأمان هي ترويسات استجابة HTTP توجّه المتصفح إلى التصرف بطرق تحمي مستخدميك. وهي لا تحلّ محل الأمان على جانب الخادم، لكنها تسدّ نواقل هجوم شائعة:

- **`Strict-Transport-Security` (HSTS)**: تخبر المتصفح بأن يتصل بموقعك عبر HTTPS فقط، حتى لو كتب المستخدم `http://`. وتمنع هجمات تخفيض البروتوكول وتجريد SSL.
- **`X-Content-Type-Options: nosniff`**: تمنع المتصفح من استنتاج نوع استجابة يخالف `Content-Type` المعلن عبر استنشاق MIME. وتمنع المهاجم من خداع المتصفح لتنفيذ ملف بوصفه JavaScript بينما كان يُفترض أن يكون صورة.
- **`X-Frame-Options`**: تمنع تضمين موقعك داخل `<iframe>` في نطاق آخر. وتسدّ هجمات النقر المخادع (clickjacking). القيمة `DENY` تمنع كل تأطير؛ و`SAMEORIGIN` (وهي ما ترسله سياسة `SecurityHeadersPolicy` المُدارة) تسمح لنطاقك بتأطير نفسه. اختر `DENY` ما لم يكن لديك سبب محدّد لتأطير موقعك بنفسه.
- **`Referrer-Policy: strict-origin-when-cross-origin`**: تتحكم في مقدار معلومات المُحيل (referrer) التي تُضمّن في الطلبات إلى مواقع أخرى. وتمنع تسريب مسارات URL الحساسة.
- **`Content-Security-Policy`**: الترويسة الكبرى. تحدّد المصادر المسموح لها بتحميل السكربتات والأنماط والصور والموارد الأخرى. وسياسة CSP مضبوطة جيدًا هي أفضل دفاع فعّال ضد هجمات XSS.

من دون هذه الترويسات، موقعك ليس خطرًا — لكنه ليس محصّنًا أيضًا. وأي تدقيق أمني سيسجّل غيابها.

## السياسات المُدارة مقابل سياسات ترويسات الاستجابة المخصّصة

تقدّم CloudFront **سياسات ترويسات استجابة مُدارة** تغطّي إعدادات شائعة، ويمكنك أيضًا إنشاء **سياسات مخصّصة** لمزيد من التحكم.

السياسات المُدارة الجديرة بالمعرفة:

| اسم السياسة | المعرّف | ما تتضمنه |
| --- | --- | --- |
| **SecurityHeadersPolicy** | `67f7725c-6f97-4210-82d7-5512b31e9d03` | HSTS وX-Content-Type-Options وX-Frame-Options وX-XSS-Protection وReferrer-Policy |
| **SimpleCORS** | `60669652-455b-4ae9-85a4-c4c02393f86c` | `Access-Control-Allow-Origin: *` على كل الاستجابات |
| **CORS-with-preflight** | `5cc3b908-e619-4b99-88e5-2cf7f45965bd` | CORS كامل مع دعم التحقق المسبق (`Access-Control-Allow-Origin` و`Access-Control-Allow-Methods` و`Access-Control-Allow-Headers`) |
| **CORS-with-preflight-and-SecurityHeadersPolicy** | `eaab4381-ed33-4a86-88ca-d9558dc6cd63` | كل ما في CORS-with-preflight إضافة إلى كل ترويسات الأمان |

لموقع ثابت لا يقدّم استجابات API ولا يحتاج CORS (فالواجهة الأمامية وأصولك على النطاق نفسه)، تعدّ **SecurityHeadersPolicy** نقطة البداية الصحيحة. وإذا كانت واجهتك الأمامية تستدعي واجهات API على نطاق مختلف وتُقدَّم تلك الواجهات عبر توزيع CloudFront نفسه، فاستخدم **CORS-with-preflight-and-SecurityHeadersPolicy**.

في لوحة التحكم، تسرد صفحة **Policies** ضمن **Response headers** كل السياسات المُدارة المتاحة مع أوصافها.

صفحة CloudFront Policies وهي تعرض تبويب Response headers مع سياسات مُدارة تشمل SecurityHeadersPolicy وCORS-With-Preflight وCORS-and-SecurityHeadersPolicy.

## إرفاق سياسة مُدارة

أسرع طريقة لإضافة ترويسات الأمان هي إرفاق سياسة مُدارة بسلوك التخزين المؤقت الافتراضي لديك. اجلب إعدادات التوزيع الحالية، وأضف `ResponseHeadersPolicyId`، ثم حدّث.

اجلب:

```bash
aws cloudfront get-distribution-config \
  --id E1A2B3C4D5E6F7 \
  --region us-east-1 \
  --output json > distribution-config-current.json
```

أضف `ResponseHeadersPolicyId` إلى `DefaultCacheBehavior`:

```json
{
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-my-frontend-app-assets",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "ResponseHeadersPolicyId": "67f7725c-6f97-4210-82d7-5512b31e9d03",
    "Compress": true,
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    }
  }
}
```

حدّث:

```bash
aws cloudfront update-distribution \
  --id E1A2B3C4D5E6F7 \
  --if-match E2QWRUHEXAMPLE \
  --distribution-config file://distribution-config-updated.json \
  --region us-east-1 \
  --output json
```

في لوحة التحكم، ترفق السياسة بسلوك من نموذج **Edit behavior**. وتعرض قائمة **Response headers policy** المنسدلة السياسات المُدارة إلى جانب أي سياسات مخصّصة أنشأتها.

نموذج CloudFront Edit behavior وهو يعرض قسم Response headers policy مع اختيار SecurityHeadersPolicy من القائمة المنسدلة.

بعد نشر التوزيع، ستتضمن كل استجابة من CloudFront ترويسات الأمان:

```
strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
referrer-policy: strict-origin-when-cross-origin
```

> **نصيحة**
>
> يمكنك التحقق من الترويسات باستخدام `curl -I https://d1234abcdef.cloudfront.net`. فإن لم ترَ ترويسات الأمان، فانتظر حتى يكتمل نشر التوزيع وحاول مرة أخرى. وقد تحتاج أيضًا إلى تفريغ ذاكرة الحافة المؤقتة بإنشاء إبطال (invalidation).

## إنشاء سياسة ترويسات استجابة مخصّصة

تغطّي السياسات المُدارة الحالات الشائعة، لكنك قد تحتاج إلى إعداد مخصّص — ربما تريد HSTS بـ `max-age` أطول، أو تحتاج ترويسة `Content-Security-Policy` مصمّمة لتطبيقك. لذلك أنشئ سياسة ترويسات استجابة مخصّصة.

احفظ هذا باسم `response-headers-policy.json`:

```json
{
  "Name": "my-frontend-app-headers",
  "Comment": "Security and CORS headers for my-frontend-app",
  "SecurityHeadersConfig": {
    "StrictTransportSecurity": {
      "AccessControlMaxAgeSec": 63072000,
      "IncludeSubdomains": true,
      "Preload": true,
      "Override": true
    },
    "ContentTypeOptions": {
      "Override": true
    },
    "FrameOptions": {
      "FrameOption": "DENY",
      "Override": true
    },
    "ReferrerPolicy": {
      "ReferrerPolicy": "strict-origin-when-cross-origin",
      "Override": true
    },
    "XSSProtection": {
      "ModeBlock": true,
      "Protection": true,
      "Override": true
    }
  },
  "CorsConfig": {
    "AccessControlAllowOrigins": {
      "Quantity": 1,
      "Items": ["https://example.com"]
    },
    "AccessControlAllowMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "AccessControlAllowHeaders": {
      "Quantity": 1,
      "Items": ["*"]
    },
    "AccessControlAllowCredentials": false,
    "AccessControlMaxAgeSec": 86400,
    "OriginOverride": true
  },
  "CustomHeadersConfig": {
    "Quantity": 2,
    "Items": [
      {
        "Header": "Permissions-Policy",
        "Value": "camera=(), microphone=(), geolocation=()",
        "Override": true
      },
      {
        "Header": "Content-Security-Policy",
        "Value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://api.example.com; frame-ancestors 'none'",
        "Override": true
      }
    ]
  }
}
```

أنشئ السياسة:

```bash
aws cloudfront create-response-headers-policy \
  --response-headers-policy-config file://response-headers-policy.json \
  --region us-east-1 \
  --output json
```

تتضمن الاستجابة معرّف السياسة:

```json
{
  "ResponseHeadersPolicy": {
    "Id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "ResponseHeadersPolicyConfig": {
      "Name": "my-frontend-app-headers"
    }
  }
}
```

استخدم هذا المعرّف في حقل `ResponseHeadersPolicyId` في سلوك التخزين المؤقت لديك، بالطريقة نفسها التي أرفقت بها السياسة المُدارة.

## تفكيك السياسة المخصّصة

### SecurityHeadersConfig

يمنحك إعداد ترويسات الأمان تحكمًا في كل ترويسة على حدة:

- **`StrictTransportSecurity`**: `max-age=63072000` (سنتان)، و`includeSubDomains`، و`preload`. ويجعل العلم `preload` نطاقك مؤهلًا لـ [قوائم التحميل المسبق لـ HSTS](https://hstspreload.org/)، التي تثبّت سياسة HTTPS فقط داخل المتصفحات.
- **`ContentTypeOptions`**: تضيف `X-Content-Type-Options: nosniff`. ولا تحتاج إعدادًا يتجاوز تمكينها.
- **`FrameOptions`**: القيمة `DENY` تمنع تضمين موقعك في أي iframe. استخدم `SAMEORIGIN` إذا كان موقعك يستخدم iframes داخليًا (مثلًا لتضمين لوحات معاينة). أنا أختار `DENY` افتراضيًا ولا أرخيها إلا عندما يكون لدي سبب *مؤكد*.
- **`ReferrerPolicy`**: ترسل `strict-origin-when-cross-origin` عنوان URL الكامل للطلبات ذات الأصل نفسه، لكنها ترسل الأصل فقط (دون المسار) للطلبات عبر الأصول المختلفة.
- **`XSSProtection`**: تضيف `X-XSS-Protection: 1; mode=block`. وكل متصفح حالي إما يتجاهل هذه الترويسة أو أزال المرشّح الأساسي الذي كانت تتحكم فيه. فهي ميتة فعليًا — وCSP (أدناه) هي الدفاع الحقيقي. وتضمينها لا يكلّفك شيئًا ويعدّ دفاعًا رخيصًا متعدد الطبقات، لكن لا تحسبها ضمن حكايتك مع XSS.

يحدّد حقل **`Override`** في كل ترويسة ما إذا كانت قيمة CloudFront تتجاوز قيمة يضبطها الأصل. عندما تكون `true`، تستبدل CloudFront أي ترويسة موجودة من S3 بالقيمة المعرّفة في السياسة. وعندما تكون `false`، لا تضيف CloudFront الترويسة إلا إذا لم يكن الأصل قد ضمّنها. وبالنسبة إلى ترويسات الأمان، تريد دائمًا تقريبًا `Override: true` — فأنت مصدر الحقيقة لسياسة الأمان، لا S3.

### CorsConfig

إذا كانت واجهتك الأمامية تجري طلبات API عبر الأصول المختلفة تُوجَّه عبر CloudFront (مثلًا سلوك `/api/*` يشير إلى API Gateway)، فإن إعداد CORS يخبر CloudFront بتضمين ترويسات `Access-Control-Allow-*` المناسبة. ولموقع ثابت يُقدَّم بالكامل من نطاق واحد، تكون ترويسات CORS اختيارية لكنها غير ضارة.

### CustomHeadersConfig

يمكن إضافة أي ترويسة لا يغطّيها قسم الأمان أو CORS هنا.

- **`Permissions-Policy`** (المعروفة سابقًا باسم `Feature-Policy`) تتحكم في ميزات المتصفح التي يمكن لموقعك استخدامها — فتعطّل الوصول إلى الكاميرا والميكروفون والموقع الجغرافي إن لم يكن موقعك بحاجة إليها.
- **`Content-Security-Policy`** هي الدفاع الحقيقي ضد XSS. والمثال هنا نقطة بداية محكمة: السكربتات والأنماط من أصلك فقط، والصور من أصلك ومن عناوين `data:` المضمّنة، وXHR/fetch إلى `https://api.example.com` فقط. والقيمة `frame-ancestors 'none'` تكرّر `X-Frame-Options: DENY` للمتصفحات التي تحترم CSP بدلًا من الترويسة القديمة. ومن شبه المؤكد أنك ستحتاج إلى إرخائها بعد ربط تطبيق حقيقي — ابدأ صارمًا وأضف المصادر كلما اشتكت وحدة تحكم المتصفح.

## CORS لاستدعاءات API

إذا كانت واجهتك الأمامية تستدعي API على أصل مختلف (مثلًا تطبيق React على `example.com` يستدعي `api.example.com`)، فأنت تحتاج ترويسات CORS على استجابات API. وهناك سيناريوهان:

**API يُقدَّم عبر CloudFront** (مثلًا سلوك `/api/*` يشير إلى API Gateway): اضبط CORS في سياسة ترويسات الاستجابة المرفقة بذلك السلوك. وستضيف CloudFront الترويسات نيابة عنك.

**API يُقدَّم بشكل منفصل** (مثلًا API Gateway بنطاقه الخاص): اضبط CORS على API Gateway مباشرة. وهذا مشمول في قسم API Gateway.

لواجهة أمامية ثابتة نموذجية تُقدَّم بالكامل عبر توزيع CloudFront واحد على نطاق واحد، لن تحتاج عمومًا إلى ترويسات CORS على أصولك الثابتة. فالمتصفح لا يفرض CORS إلا على الطلبات عبر الأصول المختلفة، وأصولك من الأصل نفسه.

## التحقق من ترويساتك

بعد تحديث التوزيع، افحص ترويسات الاستجابة:

```bash
curl -I https://d1234abcdef.cloudfront.net/index.html
```

ينبغي أن ترى ترويسات الأمان في الاستجابة:

```
HTTP/2 200
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
x-xss-protection: 1; mode=block
permissions-policy: camera=(), microphone=(), geolocation=()
```

إذا كانت أي ترويسة ناقصة، فتحقق من أن معرّف سياسة ترويسات الاستجابة مرفق بسلوك التخزين المؤقت الصحيح، وأن التوزيع أكمل النشر، وأنك لا ترى استجابة مخزّنة مؤقتًا من قبل التحديث (أبطل الذاكرة المؤقتة إن لزم).

> **تحذير**
>
> تنطبق سياسات ترويسات الاستجابة على كل الاستجابات التي يقدّمها سلوك التخزين المؤقت المرفقة به — بما في ذلك الاستجابات المخزّنة مؤقتًا. فإذا أرفقت سياسة بعد تخزين المحتوى مؤقتًا، فقد تحتاج إلى إنشاء إبطال لضمان ظهور الترويسات فورًا. وإلا فستفتقر الاستجابات المخزّنة مؤقتًا إلى الترويسات الجديدة حتى تنتهي مدة صلاحيتها (TTL).

أصبح لديك توزيع CloudFront مهيّأ بالكامل: أصل S3 مع OAC، وسلوكات تخزين مؤقت وعمليات إبطال للنشر، وتوجيه SPA عبر استجابات أخطاء مخصّصة، وHTTPS مع شهادة ACM، وترويسات أمان. والخطوة التالية هي ربط نطاق مخصّص في قسم توجيه النطاق المخصّص في Route 53. وقبل ذلك، سيطلب منك تمرين هذا القسم بناء كل هذا من الصفر.
