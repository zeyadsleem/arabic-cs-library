---
title: "التنظيف وإزالة كل شيء"
lang: ar
source: "https://stevekinney.com/courses/aws/cleanup-and-teardown"
---

افتُتحت الدورة بعبارة «مال حقيقي وبنية تحتية حقيقية». وهنا نغلق تلك الحلقة. معظم ما بنيته يكلّف سنتات شهريًا وهو خامل—لكن «السنتات» عبر دستة خدمات، على مدى سنة نسيتها، تتراكم إلى مال حقيقي. والأسوأ أن بعض الخدمات (شهادات ACM، والنطاقات المستضافة في Route 53، وتوزيعات CloudFront) تستمر في إصدار الفواتير حتى حين لا يستخدمها أحد. يهدم هذا الدرس كل شيء بالترتيب الذي تسمح به AWS فعلًا.

إن أردت النسخة المعتمدة من AWS لأي من أوامر الحذف، فـ[مرجع أوامر AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/) هو المكان الذي تبحث فيه. وسأضع روابط للأوامر المحددة في موضعها حين تكون الأعلام دقيقة وصعبة.

## مبدأ الهدم

لموارد AWS تبعيات. لا يمكنك حذف دور بينما لا تزال دالة Lambda تستخدمه؛ ولا يمكنك حذف دلو S3 يحتوي على كائنات؛ ولا يمكنك حذف توزيع CloudFront لا يزال في حالة `Enabled`. والقاعدة دائمًا تقريبًا: **احذف الأشياء التي تعتمد على المورد قبل حذف المورد نفسه.**

الترتيب أدناه هو الترتيب الذي يعمل فعلًا. أما القفز هنا وهناك فسينتج أخطاء `ResourceInUseException` و`DependencyViolation` حتى تستسلم وتعود إليه.

## ما يستمر في إصدار الفواتير

قبل أن تبدأ، قائمة قصيرة بالخدمات التي تستمر في تقاضي المال منك سواء استخدمها أحد أم لا:

- **توزيعات CloudFront.** حتى وهي معطّلة لا تكلّف كثيرًا—لكن المحذوفة تكلّف صفرًا.
- **النطاقات المستضافة في Route 53.** 0.50 دولار شهريًا *لكل نطاق*. النطاقات المستضافة المنسية هي مفاجأة «12 دولارًا سنويًا» الكلاسيكية.
- **شهادات ACM.** مجانية، لكنها تُحتسب على حصتك. احذف الشهادات غير المستخدمة.
- **جداول DynamoDB في وضع الطلب.** لا تتقاضى شيئًا عند صفر طلبات، لكن تكلفة تخزين العناصر الموجودة تظل تتراكم.
- **مجموعات سجلات CloudWatch.** الاحتفاظ غير المحدد هو الوضع الافتراضي. احذفها أو اضبط مدة الاحتفاظ عند الهدم.
- **عناوين IP المرنة (Elastic IPs)** (غير مستخدمة في هذه الدورة، لكن: احذفها دائمًا).
- **دلاء S3 مع تمكين الإصدارات.** كل نسخة من كل كائن لا تزال تكلّفك. أفرغ *كل* الإصدارات قبل الحذف.

## ترتيب العمليات

التسلسل الآمن لبصمة هذه الدورة، من الأعلى إلى الأسفل:

1. توزيعات CloudFront (عطّل، انتظر، احذف) ووحدات OAC.
2. سجلات Route 53 (ما عدا NS وSOA) والنطاقات المستضافة.
3. شهادات ACM.
4. واجهات API Gateway البرمجية وأسماء النطاقات المخصصة.
5. دوال Lambda وإصداراتها وطبقاتها المرتبطة.
6. أدوار تنفيذ IAM وسياساتها (افصل أولًا، ثم احذف).
7. جداول DynamoDB.
8. مُعاملات Parameter Store وأسرار Secrets Manager.
9. مجموعات سجلات CloudWatch والإنذارات وموضوعات SNS.
10. دلاء S3 (أفرغ كل الإصدارات، ثم احذف).
11. الميزانيات وتنبيهات التكلفة.
12. مستخدمو IAM الذين لم تعد تحتاجهم (مثل deploy-bot) ومفاتيح وصولهم.

أبقِ المستخدم الجذري (root)، ومستخدم `admin` الخاص بك، والحساب نفسه. فهؤلاء يبقون للمشروع القادم.

## 1. CloudFront

يجب أن تكون توزيعات CloudFront **معطّلة**، ومنشورة بالكامل في تلك الحالة المعطّلة، وبعد *ذلك* تُحذف. يستغرق التعطيل من 15 إلى 30 دقيقة. أما الحذف فيكون سريعًا بمجرد أن تصبح الحالة `Deployed`.

```bash
DIST_ID=E1A2B3C4D5E6F7

# Fetch current config + ETag
aws cloudfront get-distribution-config --id "$DIST_ID" \
  --query 'DistributionConfig' --output json > dist-config.json
ETAG=$(aws cloudfront get-distribution-config --id "$DIST_ID" \
  --query 'ETag' --output text)

# Flip Enabled to false in dist-config.json (use jq or your editor)
jq '.Enabled = false' dist-config.json > dist-config.tmp && mv dist-config.tmp dist-config.json

aws cloudfront update-distribution \
  --id "$DIST_ID" \
  --distribution-config file://dist-config.json \
  --if-match "$ETAG"

aws cloudfront wait distribution-deployed --id "$DIST_ID"

NEW_ETAG=$(aws cloudfront get-distribution-config --id "$DIST_ID" \
  --query 'ETag' --output text)
aws cloudfront delete-distribution --id "$DIST_ID" --if-match "$NEW_ETAG"
```

ثم احذف وحدة OAC:

```bash
OAC_ID=E1OAC2EXAMPLE
OAC_ETAG=$(aws cloudfront get-origin-access-control --id "$OAC_ID" \
  --query 'ETag' --output text)
aws cloudfront delete-origin-access-control --id "$OAC_ID" --if-match "$OAC_ETAG"
```

## 2. Route 53

لا يمكنك حذف نطاق مستضاف يحتوي على أي سجلات غير السجلين الافتراضيين `NS` و`SOA`. اسرد ما هو موجود، واحذف كل سجل، ثم احذف النطاق.

```bash
ZONE_ID=Z1ABCDEF123456

# Dump non-default records to inspect
aws route53 list-resource-record-sets --hosted-zone-id "$ZONE_ID" \
  --query 'ResourceRecordSets[?Type!=`NS` && Type!=`SOA`]'

# For each non-default record, submit a change batch with Action=DELETE.
# Script this if you have more than a few. Then:

aws route53 delete-hosted-zone --id "$ZONE_ID"
```

> **نصيحة**
>
> إن سجّلت النطاق عبر Route 53، فلا **تحذف النطاق المستضاف** إلا إذا كنت ستنقل النطاق أو تتخلى عنه أيضًا. فالنطاقات المسجّلة تتوقع وجود نطاقها المستضاف.

## 3. شهادات ACM

لا يمكن حذف الشهادات وهي مرتبطة بتوزيع CloudFront أو بنطاق مخصص في API Gateway. أنجز CloudFront وAPI Gateway أولًا؛ ثم:

```bash
aws acm delete-certificate \
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \
  --region us-east-1
```

## 4. API Gateway

```bash
aws apigatewayv2 delete-api --api-id abc123def4 --region us-east-1

# Custom domain, if you attached one:
aws apigatewayv2 delete-api-mapping \
  --api-mapping-id m1a2p3 \
  --domain-name api.example.com \
  --region us-east-1
aws apigatewayv2 delete-domain-name \
  --domain-name api.example.com \
  --region us-east-1
```

## 5. Lambda

احذف كل دالة. الإصدارات المرتبطة بالدالة تذهب معها. أما دوال Lambda@Edge في CloudFront فتُنسخ إلى مواقع الحافة—وتنظّفها AWS بشكل غير متزامن بعد حذف الدالة؛ فلا تتفاجأ إن ظلّت وحدة التحكم تعرض نسخًا متماثلة لمدة تصل إلى بضع ساعات.

```bash
aws lambda delete-function --function-name scratch-lab-api --region us-east-1
aws lambda delete-function --function-name my-frontend-app-api --region us-east-1
```

## 6. أدوار وسياسات IAM

لا يمكنك حذف دور ما دامت هناك سياسات مرتبطة به. افصلها أولًا.

```bash
ROLE=scratch-lab-api-role

# List and detach managed policies
for ARN in $(aws iam list-attached-role-policies --role-name "$ROLE" \
  --query 'AttachedPolicies[].PolicyArn' --output text); do
  aws iam detach-role-policy --role-name "$ROLE" --policy-arn "$ARN"
done

# Delete inline policies
for NAME in $(aws iam list-role-policies --role-name "$ROLE" \
  --query 'PolicyNames[]' --output text); do
  aws iam delete-role-policy --role-name "$ROLE" --policy-name "$NAME"
done

aws iam delete-role --role-name "$ROLE"
```

كرّر ذلك مع كل دور تنفيذ أنشأته الدورة. واحذف السياسات التي يديرها العميل (`DeployBotPolicy` وغيرها) بعد ألا يشير إليها أي دور أو مستخدم.

## 7. DynamoDB

```bash
aws dynamodb delete-table \
  --table-name scratch-lab-notes \
  --region us-east-1
```

إن كنت قد فعّلت الاستعادة إلى نقطة زمنية، فقد تبقى النسخ الاحتياطية النهائية خلال نافذة الاحتفاظ.

## 8. Parameter Store وSecrets Manager

```bash
aws ssm delete-parameter \
  --name /scratch-lab/production/search-api-key \
  --region us-east-1

# Secrets Manager requires --force-delete-without-recovery to actually delete
# immediately; otherwise the secret sits in a 7-30 day recovery window.
aws secretsmanager delete-secret \
  --secret-id /scratch-lab/production/database-credentials \
  --force-delete-without-recovery \
  --region us-east-1
```

## 9. CloudWatch

```bash
aws logs delete-log-group \
  --log-group-name /aws/lambda/scratch-lab-api \
  --region us-east-1

aws cloudwatch delete-alarms \
  --alarm-names scratch-lab-5xx-rate \
  --region us-east-1

aws sns delete-topic \
  --topic-arn arn:aws:sns:us-east-1:123456789012:scratch-lab-alerts \
  --region us-east-1
```

## 10. S3

تحتاج الدلاء التي فُعّل فيها الإصدار إلى إزالة كل نسخة *و*كل علامة حذف قبل أن يمكن حذف الدلو.

```bash
BUCKET=my-frontend-app-assets

# Delete all current objects
aws s3 rm "s3://$BUCKET" --recursive

# Delete all non-current versions and delete markers
aws s3api list-object-versions --bucket "$BUCKET" \
  --query '{Objects: [Versions[].{Key:Key,VersionId:VersionId}, DeleteMarkers[].{Key:Key,VersionId:VersionId}][]}' \
  --output json > versions.json

# If versions.json has non-empty Objects, run:
aws s3api delete-objects --bucket "$BUCKET" --delete file://versions.json

aws s3api delete-bucket --bucket "$BUCKET" --region us-east-1
```

## 11. الميزانيات وتنبيهات التكلفة

```bash
aws budgets delete-budget \
  --account-id 123456789012 \
  --budget-name my-frontend-app-monthly
```

## 12. مستخدمو IAM

إن كنت قد أنشأت `deploy-bot` أو أي مستخدم خدمة آخر خصيصًا للدورة، فاحذفه بعد أن يزول عمل CloudFront/S3 الخاص به. ويجب حذف مفاتيح الوصول أولًا.

```bash
USER=deploy-bot

for KEY in $(aws iam list-access-keys --user-name "$USER" \
  --query 'AccessKeyMetadata[].AccessKeyId' --output text); do
  aws iam delete-access-key --user-name "$USER" --access-key-id "$KEY"
done

for ARN in $(aws iam list-attached-user-policies --user-name "$USER" \
  --query 'AttachedPolicies[].PolicyArn' --output text); do
  aws iam detach-user-policy --user-name "$USER" --policy-arn "$ARN"
done

aws iam delete-user --user-name "$USER"
```

## التحقق من عدم بقاء شيء

بعض الفحوص السريعة:

```bash
aws cloudfront list-distributions --query 'DistributionList.Items[].Id' --output text
aws lambda list-functions --region us-east-1 --query 'Functions[].FunctionName' --output text
aws dynamodb list-tables --region us-east-1 --query 'TableNames[]' --output text
aws s3 ls
aws route53 list-hosted-zones --query 'HostedZones[].Name' --output text
```

إن كانت كل قائمة فارغة (أو لا تحتوي إلا على أشياء أبقيتها عن قصد)، فأنت نظيف.

أخيرًا، تحقّق من [وحدة تحكم الفوترة](https://console.aws.amazon.com/billing/home) بعد بضعة أيام. فالرسوم المستمرة بعد الهدم تعني أن شيئًا ما لا يزال حيًا. وأكثر الأسباب شيوعًا هي نسخ S3 التي لم تُفرّغها، أو نطاق مستضاف في Route 53 نسيته، أو نسخة Lambda@Edge لم ينتهِ حذفها.

الأضواء مطفأة. عمل جيد.
