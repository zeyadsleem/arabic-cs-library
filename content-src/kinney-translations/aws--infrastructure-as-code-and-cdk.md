---
title: "البنية التحتية كشيفرة: متى تلجأ إلى CDK"
---

أمضيت هذه الدورة كلها تتنقّل في وحدات تحكم AWS وتشغّل أوامر سطر الأوامر. أنشأت حاوية S3، وهيأت توزيع CloudFront، وأعددت API Gateway، وأرفقت أدوار IAM، وأنشأت جدول DynamoDB، وربطت كل ذلك معًا. إنه يعمل. لكن ثمة مشكلة: لو اضطررت إلى فعل كل ذلك من جديد — على حساب جديد، أو لبيئة Scratch Lab جديدة، أو لزميل — لاحتجت إلى تكرار كل خطوة من ذاكرتك، بالترتيب الصحيح، ومن دون أخطاء.

إن أردت الصياغة الرسمية من AWS لأداة IaC الخاصة بها في هذا الدرس، فإن [دليل مطوّري AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) هو المرجع المعتمد.

> **CDK v2 فقط**
>
> كل ما في هذا الدرس يستخدم **CDK v2** (`aws-cdk-lib`). فقد وصل CDK v1 إلى نهاية الدعم في منتصف 2023. وإن صادفت دروسًا تستورد من `@aws-cdk/aws-s3` أو `@aws-cdk/aws-lambda` (حزمة واحدة لكل خدمة)، فذلك v1 — لا تنسخه. أما v2 فيجمع كل شيء في `aws-cdk-lib` مع `constructs`. تحقّق من ذلك بالنظر إلى `package.json`: `"aws-cdk-lib": "^2.x"` يعني v2.

**البنية التحتية كشيفرة** هي ما يحلّ تلك المشكلة. فبدلًا من تهيئة الخدمات يدويًا عبر لوحة تحكم ويب، تكتب شيفرة تصف بنيتك التحتية. وتُدخل تلك الشيفرة في نظام التحكّم في الإصدارات. وتنشرها بأمر واحد. وحين تحتاج إلى هدمها أو تحديثها أو تكرارها، تكون الشيفرة هي مصدر الحقيقة — لا سلسلة نقرات في لوحة التحكم تذكر نصفها.

إن كنت قد استخدمت `package.json` يومًا لوصف اعتماديات مشروعك، فقد فهمت الفكرة بالفعل. فـ IaC هو `package.json` لبنيتك التحتية على AWS.

## لماذا يهمّ هذا

هذا هو الدرس الذي تنعطف فيه الدورة أخيرًا على نفسها. فحتى هذه اللحظة، كانت التهيئة اليدوية هي الخطوة الصحيحة لأنك كنت تحتاج إلى رؤية كل خدمة مكشوفة. لكن بمجرد أن تفهم القطع، لم يعد تكرار رقصة لوحة التحكم تعليميًا. إنه مجرد انحراف في التهيئة ينتظر أن يحدث.

## يُبنى على

- [خط أنابيب الموقع الثابت الكامل](https://stevekinney.com/courses/aws/full-static-pipeline)
- [ما هي Lambda ولماذا يهتم مهندسو الواجهة الأمامية](https://stevekinney.com/courses/aws/what-is-lambda)
- [ما هو DynamoDB ومتى تستخدمه](https://stevekinney.com/courses/aws/what-is-dynamodb)

```
flowchart LR
    Code["TypeScript / YAML / SST config"] --> Synth["CDK or SST synth"]
    Synth --> CFN["CloudFormation stack"]
    CFN --> Infra["AWS resources"]
    Infra --> Drift["Reproducible changes<br/>instead of console drift"]
```

## عناء التهيئة اليدوية

قد لا تشعر بالوجع بعد. فلديك مشروع واحد، وحساب واحد، وقد أعددت كل شيء للتو. لكن فكّر فيما يحدث مع نموّك:

**قابلية التكرار.** ينضم مطوّر جديد إلى فريقك ويحتاج بيئة اختبار خاصة به. فتعطيه مستندًا من 47 خطوة. فيفوته الخطوة 23. وتنكسر البيئة بشكل يتطلّب ساعتين لتصحيحه، لأن رسالة الخطأ من CloudFront هي «Access Denied» والمشكلة الفعلية سياسة حاوية مفقودة.

**الانحراف.** يُجري أحدهم إصلاحًا سريعًا في لوحة التحكم — يعدّل مهلة Lambda، أو يضيف ترويسة CORS، أو يغيّر إعداد سعة DynamoDB. وهذا التغيير موجود في AWS فقط، لا في أي توثيق أو شيفرة. وبعد ثلاثة أشهر، تنشر بيئة «جديدة» من مستندك فيتصرّف بشكل مختلف عن الإنتاج. وتقضي يومًا في اكتشاف السبب.

**التدقيق.** يسأل فريق الأمان لديك: «ما الذي تغيّر في الشهر الماضي؟» مع تغييرات لوحة التحكم، الجواب: اذهب واقرأ سجلات CloudTrail وحاول إعادة بناء ما حدث. أما مع IaC، فالجواب: انظر إلى تاريخ Git.

**التعافي من الكوارث.** يحدث شيء كارثي — حذف عارض، أو انقطاع منطقة، أو اختراق حساب. فما مدى سرعة إعادة البناء؟ مع التهيئة اليدوية: ساعات إلى أيام. ومع IaC: دقائق.

## CloudFormation: الأساس

**CloudFormation** هي خدمة IaC الأصلية في AWS. تكتب قالبًا — ملف JSON أو YAML — يصف كل مورد تريده. فتقرأ CloudFormation القالب، وتنشئ الموارد، وتتتبّع حالتها. وحين تحدّث القالب، تستنتج CloudFormation ما تغيّر وتطبّق الفروق فقط.

إليك قالب CloudFormation صغيرًا ينشئ حاوية S3:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: S3 bucket for static frontend assets

Resources:
  FrontendBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-frontend-app-assets
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
```

تنشره بـ:

```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name my-frontend-app \
  --region us-east-1 \
  --output json
```

تنشئ CloudFormation **مكدّسًا** — مجموعة موارد تُدار كوحدة واحدة. احذف المكدّس، فتُحذف الموارد كلها. وحدّث القالب، وأعد النشر، فتتولّى CloudFormation التغييرات.

والقيمة واضحة: ملف YAML هذا هو بنيتك التحتية. أدخله في Git، وراجعه في طلبات السحب، فيستطيع أي أحد نشر البيئة نفسها بأمر واحد.

والجانب السلبي واضح أيضًا: قوالب CloudFormation تصير مطوّلة بسرعة. فنشر واجهة أمامية ثابتة كامل — حاوية S3، وسياسة حاوية، وتوزيع CloudFront، وOAC، وشهادة ACM، وسجلات Route 53 — قد يبلغ بسهولة 200-300 سطر من YAML. وYAML ليس ممتعًا تمامًا في الكتابة على نطاق واسع. (بصراحة، لست متأكدًا أن YAML ممتع في الكتابة على *أي* نطاق.)

## CDK: البنية التحتية بـ TypeScript

**AWS Cloud Development Kit (CDK)** يحلّ مشكلة الإطالة. فبدلًا من كتابة YAML، تكتب شيفرة حقيقية — TypeScript أو Python أو Java أو Go — تولّد قوالب CloudFormation في الخلف. ويمنحك CDK كامل قوة لغة برمجة: متغيّرات، وحلقات، وشرطيات، وتجريدات، وفحص أنواع.

إليك شكل بنيتك التحتية للموقع الثابت التي بنيتها يدويًا في CDK، باستخدام TypeScript:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

export class FrontendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, 'Assets', {
      bucketName: 'my-frontend-app-assets',
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const certificate = acm.Certificate.fromCertificateArn(
      this,
      'Certificate',
      'arn:aws:acm:us-east-1:123456789012:certificate/your-cert-id',
    );

    const distribution = new cloudfront.Distribution(this, 'CDN', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      domainNames: ['example.com'],
      certificate,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: 'example.com',
    });

    new route53.ARecord(this, 'DNS', {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });
  }
}
```

هذا نحو 45 سطرًا من TypeScript. ينشئ حاوية S3 محجوب وصولها العام، وتوزيع CloudFront مع OAC، وإعادة توجيه HTTPS، ومعالجة أخطاء SPA، وسجل Alias في Route 53 — أي قوس الاستضافة الثابتة كله تقريبًا في ملف واحد. ولأنها TypeScript، تحصل على الإكمال التلقائي وأخطاء الأنواع والتحقّق وقت الترجمة.

تنشره بـ:

```bash
npx cdk deploy --region us-east-1
```

يُصنّع CDK شيفرة TypeScript إلى قالب CloudFormation (غالبًا مئات الأسطر من YAML) وينشره. ولن تحتاج أبدًا إلى قراءة ذلك الـ YAML أو كتابته.

> **نصيحة**
>
> يستخدم CDK تجريدات — لبنات بناء قابلة لإعادة الاستخدام — على مستويات مختلفة من التجريد. فالصنف `Distribution` أعلاه «تجريد من المستوى الثاني (L2)» يضبط إعدادات افتراضية معقولة ويخفي تفاصيل CloudFormation المنخفضة المستوى. وإن احتجت إلى تحكّم كامل، يمكنك النزول إلى تجريدات المستوى الأول (L1) التي تُقابل موارد CloudFormation واحدًا لواحد.

## SST: CDK من أجل Serverless

**SST** (اسمها الأصلي «Serverless Stack») هو إطار عمل مبني فوق CDK ومصمّم خصيصًا لتطبيقات Serverless كاملة الحزمة. فإن كان CDK هو «البنية التحتية كشيفرة بـ TypeScript»، فـ SST هو «البنية التحتية كشيفرة بـ TypeScript، لكن برأي واضح في الأنماط التي ستستخدمها فعلًا».

يضيف SST عدة أشياء لا يوفّرها CDK جاهزة:

- **تطوير Lambda الحي.** تعمل شيفرة دالة Lambda لديك محليًا وتتصل بموارد AWS حقيقية، فتحصل على تغذية راجعة فورية دون نشر عند كل تغيير. وإن كنت قد استخدمت `next dev` أو `vite dev`، فهذا مكافئه لواجهات الخلفية في Serverless.
- **تجريدات أعلى مستوى.** يوفّر SST مكوّنات مثل `StaticSite` و`Api` و`Table` تجمع موارد AWS متعددة في إعداد افتراضي واحد معقول. فيستغرق إنشاء تطبيق كامل الحزمة بضعة أسطر بدلًا من بضع صفحات.
- **تكامل مع أطر الواجهة الأمامية.** يعرف SST عن Next.js وAstro وSvelteKit وأطر أخرى. ويمكنه نشر واجهتك الأمامية وخلفيتك معًا، مع إدارة خط أنابيب البناء تلقائيًا.

إليك الموقع الثابت نفسه في SST:

```typescript
new sst.aws.StaticSite('Frontend', {
  path: './build',
  domain: 'example.com',
});
```

سطران. ينشئ SST حاوية S3 وتوزيع CloudFront وOAC وشهادة ACM وسجلات Route 53 تلقائيًا. ويطبّق أفضل الممارسات نفسها التي هيّأتها يدويًا طوال قوس الاستضافة الثابتة.

> **تحذير**
>
> SST مشروع مفتوح المصدر من طرف ثالث، وليس منتجًا من AWS. وله مجتمع قوي وتطوير نشط، لكنه اعتمادية تتحمّلها. فإن كانت آراء SST في بنية المشروع وأنماط النشر لا تناسبك، فإن CDK يمنحك القوة نفسها بمرونة أكبر.

## أيها تستخدم؟

هذا ليس تعمّقًا في أي من هذه الأدوات. فلن تتعلم CDK أو SST في هذا الدرس. لكن إليك مصفوفة القرار الصادقة:

**CloudFormation** هو الخيار الصحيح إن أردت أقصى تحكّم، وبلا اعتماديات خارجية، وكنت مستعدًا لكتابة YAML/JSON مطوّل. ومعظم المؤسسات الكبيرة تستخدم CloudFormation (أو أدوات تولّده) لأنه اللبنة الأصلية في AWS.

**CDK** هو الخيار الصحيح إن أردت أمان الأنواع وتجريدات قابلة لإعادة الاستخدام، وكنت مرتاحًا في كتابة TypeScript (وأنت كذلك كمهندس واجهة أمامية). وCDK منتج من AWS بدعم قوي ونظام بيئي كبير.

**SST** هو الخيار الصحيح إن كنت تبني بالضبط نوع التطبيق الذي تعلّمه هذه الدورة — واجهة أمامية بواجهة خلفية Serverless — وتريد أسرع طريق من الشيفرة إلى بنية تحتية منشورة. فآراء SST توفّر الوقت عندما تطابق حالة استخدامك.

كل الأدوات الثلاث تنتج قوالب CloudFormation في النهاية. أما الاختلافات فتكمن في كيفية كتابتك وصيانتك للشيفرة التي تولّد تلك القوالب.

## القيمة الحقيقية

إليك ما يهمّ فعلًا: الآن، تفهم كيف تعمل كل خدمة لأنك هيّأتها بيدك. وهذا الفهم دائم وقابل للنقل. لا يهمّ إن استخدمت CDK أو SST أو Terraform أو Pulumi أو CloudFormation الخام — فأنت تعرف ما تفعله سياسة الحاوية، ولماذا يوجد OAC، وكيف تعمل أدوار التنفيذ، وماذا تعني ترويسات CORS. لقد أنجزت الجزء الصعب.

IaC ليس بديلًا عن ذلك الفهم. إنه طريقة لتشفيره. فالشيفرة التي تكتبها في CDK لا تجود إلا بقدر جودة معرفتك بالخدمات الأساسية. ولأنك بنيت كل شيء يدويًا أولًا، ستعرف فعلًا ما تفعله IaC حين يحدث خطأ — وسيحدث، لأن البنية التحتية بنية تحتية سواء كتبتها بـ YAML أو TypeScript.

## التحقّق

لا تحتاج إلى نشر CDK في هذا الدرس، لكن ينبغي أن تكون قادرًا على التحقّق من النموذج الذهني:

- هل يمكنك الإشارة إلى تغيير يدوي واحد في الدورة وقول ما سيصير إليه في الشيفرة؟
- هل يمكنك شرح مورد CloudFormation المختبئ تحت تجريد CDK الودود؟
- هل يمكنك شرح ما سيحدث لو أعاد زميل إنشاء Scratch Lab في حساب آخر من تعريف IaC نفسه؟

إن كانت هذه الأجوبة واضحة، فقد أدى الدرس مهمّته.

## أنماط الفشل الشائعة

- **القفز إلى التجريدات قبل فهم الخدمات:** يمنحك هذا سقالات سريعة وحدسًا بائسًا في التصحيح.
- **التعامل مع CDK كسحر لا كتوليد لـ CloudFormation:** حين تحدث أخطاء النشر، فأنت ما زلت تحتاج إلى نموذج AWS الأساسي.
- **تشفير بنية تحتية سيئة بشكل أسرع:** IaC يحفظ القرارات الجيدة *والسيئة* بأمانة.
- **ترك الإطار يختار كل شيء بصمت:** الإعدادات الافتراضية المعقولة رائعة إلى أن تكفّ عن مطابقة نظامك الفعلي.
