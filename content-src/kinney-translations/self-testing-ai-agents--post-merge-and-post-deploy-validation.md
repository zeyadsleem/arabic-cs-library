---
title: "التحقّق بعد الدمج وبعد النشر"
---

أن يخضرّ CI شعور رائع. وهو أيضًا ليس الشيء نفسه الذي «النشر سليم».

لقد أطلقت ما يكفي من طلبات السحب «الخضراء تمامًا» التي انكسرت مع ذلك في البيئة الحقيقية حتى أتوقّف عن التظاهر بغير ذلك. متغيّرات بيئة خاطئة. عنوان إعادة توجيه خاطئ. نطاق ملف تعريف ارتباط خاطئ. مهمة خلفية لم تُقلع. شبكة CDN قدّمت بيان الأصول القديم. ترحيل قاعدة البيانات نجح ومع ذلك انفجر المسار عند أول حركة مرور حقيقية. لا تحتاج إلا إلى بضعة أمثلة من هذه قبل أن يتوقّف «نجح CI» عن أن يبدو خطاب نصر.

إذن، هذا الدرس عن الحلقة *بعد* بوابة الدمج.

> **متطلّب سابق**
>
> يفترض هذا الدرس أنك وصلت بالفعل [CI كحلقة الملاذ الأخير](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort). فـ CI هو آخر بوابة قبل الدمج، والتحقّق بعد النشر هو أول بوابة بعد الدمج.

## شكل الحلقة

إن كنت تستخدم [بيئات GitHub Actions](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) أو نظام نشر مكافئًا، فتتبع الحلقة هذا الشكل:

```
graph LR
  Merge["Merge to main"] --> Deploy["Deploy to preview or production"]
  Deploy --> Smoke["Run post-deploy smoke check"]
  Smoke -->|Pass| Monitor["Watch health window"]
  Smoke -->|Fail| Rollback["Rollback or stop the rollout"]
  Monitor -->|Healthy| Done["Done"]
  Monitor -->|Errors spike| Rollback
```

هذا هو الدرس كله في رسم بياني.

والفكرة الأساسية: **النشر ليس نهاية الأتمتة. النشر بداية الحلقة التالية.**

## ما يثبته التحقّق بعد النشر فعلًا

هذه الطبقة لا تعيد تشغيل مجموعة اختباراتك بأكملها من باب التشويق. إنها تثبت شيئًا أصغر وأحدّ:

- أن عنوان URL المنشور قابل للوصول
- أن المسار الجوهري يُصيَّر
- أن المصادقة ما تزال تعمل إن كان المسار يعتمد عليها
- أن مسار القراءة الأساسي ومسار كتابة أساسي واحد ما يزالان يعملان
- أن الوصلات الخاصة بالبيئة صحيحة

هذا تدقيق سريع، لا خط أنابيب CI ثانٍ.

وبالنسبة لـ Shelf، يمكن أن يبقى تدقيق ما بعد النشر ضئيلًا:

- حمّل الصفحة الرئيسية أو صفحة الرف
- تأكّد من تصيير العنوان الحرج
- تأكّد من ظهور البيانات المبذورة أو حالة فارغة معروفة
- إن كانت المصادقة مطلوبة، فأثبت أن حالة التخزين أو تهيئة تسجيل الدخول ما تزال تعمل مقابل عنوان URL المنشور

والصِغر ميزة هنا. فإن استغرق التحقّق بعد النشر عشر دقائق، فلن يثق به أحد كإشارة لإيقاف الإطلاق.

### كيف تبدو مواصفة التدقيق فعلًا

اختبار التدقيق بعد النشر هو مواصفة Playwright عادية في مجلد مخصّص كي لا يعمل كجزء من مجموعة الاختبارات الشاملة العادية. والشيء الوحيد الذي يجعله «بعد النشر» هو أنه يقرأ عنوان URL الهدف من متغيّر بيئة يحقنه سير عمل النشر، بحيث يمكن للملف نفسه أن يعمل مقابل معاينة أو بيئة اختبار تمهيدي أو الإنتاج دون أي تغييرات في الشيفرة.

وفي تمرين ما بعد النشر، يعيش الأمر المسمّى الذي يشغّل هذا المسار في `package.json` باسم `npm run test:smoke`، وتعيش المواصفة في `tests/smoke/post-deploy.spec.ts`، ويمكنك إضافة `playwright.smoke.config.ts` مخصّص إن أردت عزل تشغيل التدقيق عن الإعداد الرئيسي. وتلك الملفات هي السطح الملموس للحلقة.

```typescript
// tests/smoke/post-deploy.spec.ts
import { expect, test } from '@playwright/test';

const smokeBaseUrl = process.env.SMOKE_BASE_URL ?? 'http://127.0.0.1:4173';

test.use({ baseURL: smokeBaseUrl });

test('home page renders and exposes sign in', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('banner').getByRole('link', { name: 'Sign in' })).toBeVisible();
});
```

تحقّقان. هذا كل شيء. والنسخة المكتملة في Shelf تعيش في `tests/smoke/post-deploy.spec.ts` وتُستدعى غالبًا عبر `playwright.smoke.config.ts` مخصّص كي لا تلتقطها حلقة Playwright الافتراضية بالخطأ.

### سير عمل النشر الذي يشغّل تدقيق ما بعد النشر

سير عمل النشر هو حيث يستمدّ التدقيق أسنانه. وهذا شكل أدنى لـ GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
      - run: npm ci --ignore-scripts
      - run: npm run build
      - name: Deploy
        id: deploy
        run: |
          # Replace with your real deploy command. The important part
          # is that this step prints the deployed URL so the smoke job
          # can read it from the job output.
          echo "url=https://shelf-preview.example.com" >> "$GITHUB_OUTPUT"

  smoke:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
      - run: npm ci --ignore-scripts
      - run: npx playwright install --with-deps chromium
      - name: Run post-deploy smoke check
        env:
          SMOKE_BASE_URL: ${{ needs.deploy.outputs.url }}
        run: npm run test:smoke
      - name: Upload report on failure
        if: failure()
        uses: actions/upload-artifact@v7
        with:
          name: smoke-report
          path: playwright-report/
          retention-days: 7
```

مهمتان. المهمة الأولى تفعل ما يحتاجه مضيفك للنشر وتكتب عنوان URL المنشور في `$GITHUB_OUTPUT` كي تقرأه المهمة التالية. والمهمة الثانية تثبّت Playwright، وتشغّل `npm run test:smoke` مع `SMOKE_BASE_URL` مشيرًا إلى ذلك العنوان، وترفع تقرير Playwright إن فشل التحقّق. وإن احمرّت مهمة التدقيق، فإما أن يُلغى النشر تلقائيًا وإما أن ينشر سير العمل إشارة إيقاف الإطلاق.

> **لا يوجد هدف نشر بعد؟**
>
> إن لم يكن في نسختك من Shelf هدف نشر مستضاف، فيمكنك مع ذلك التدرّب على الحلقة نفسها محليًا: شغّل `npm run build && npm run preview -- --host 127.0.0.1 --port 4173` في طرفية، و`SMOKE_BASE_URL=http://127.0.0.1:4173 npm run test:smoke` في طرفية أخرى. وسجّل هذه الفجوة في دليل التشغيل (runbook) لديك، ووصّل سير عمل النشر الحقيقي عندما يصبح لديك هدف.

## أهداف المعاينة تُحتسب

لا تحتاج إلى إطلاق إنتاجي كامل لتعليم هذه الحلقة جيدًا.

فمعاينة نشر، أو هدف اختبار تمهيدي، أو حتى مهمة بناء ومعاينة تُتيح عنوان URL مستقرًا — كل ذلك يكفي للتدرّب على الشكل:

- انشر المخرج المرشّح
- شغّل تدقيقًا مقابل عنوان URL المنشور
- ارفع المخرجات عند الفشل
- قرّر ما إذا كنت تمضي قدمًا

ولهذا أفضّل تعليم هذا على هدف معاينة أولًا. فالحلقة هي المقصد، والمضيف تفصيل تنفيذي.

## نافذة السلامة بعد اختبار التدقيق

النجاح في اختبار التدقيق ضروري. وهو ما يزال ليس القصة كاملة.

فعادةً ما تكون هناك نافذة قصيرة بعد النشر تريد فيها إشارة أخرى على الأقل:

- بقي معدّل الأخطاء ثابتًا
- لم تقفز زمن استجابة الطلبات
- السجلات لا تمتلئ باستثناءات واضحة
- المهام والعمال الخلفيون ما يزالون سليمين

أنا لا أطلب منك بناء منظومة مراقبة كاملة في هذه الدورة. لكنني *أطلب* منك تعريف ما الذي سيؤدي إلى التراجع. فإن لم تعرّف تلك القاعدة مسبقًا، صار كل نشر سيئ جدلًا بدلًا من قرار.

## قواعد التراجع ينبغي أن تُكتب قبل أن تحتاجها

هذه واحدة من تلك العادات الهندسية غير البرّاقة على نحو مُبهج التي توفّر قدرًا غير معقول من التوتّر.

اكتب محفّز التراجع:

- فشل تدقيق ما بعد النشر: تراجع
- مسار حرج يعيد 500: تراجع
- المصادقة معطّلة: تراجع
- قفزة أخطاء فوق الحدّ المتفق عليه في أول N دقيقة: تراجع أو إيقاف مؤقت

واجعل القاعدة محدّدة بما يكفي ليتبعها وكيل أو إنسان دون مسرحيات.

> **قواعد تراجع غامضة**
>
> «إن بدا سيئًا، فربما ينبغي أن نتراجع» ليست سياسة تراجع. تلك مجادلة مستقبلية في سلسلة تعليقات على طلب سحب بينما المستخدمون يشعرون بالمشكلة بالفعل.

## ما يحتاجه الوكيل هنا

يحتاج الوكيل الشيء نفسه بالضبط الذي احتاجه طوال اليوم:

- أمر مسمّى لتشغيله
- عنوان URL هدف
- مخرجات عند فشل التحقّق
- شرط إيقاف موثّق

فإن قال سير عمل النشر «شغّل `npm run test:smoke` مقابل `SMOKE_BASE_URL` وارفع تقرير Playwright عند الفشل»، فيمكن للوكيل العمل بذلك. وإن قال سير عمل النشر «انظر إلى النشر يدويًا وقرّر إن كانت الأجواء طيبة»، فمبروك، لقد أعدت بناء نفسك كحلقة وصل.

## قواعد الوكيل

```markdown
## Post-merge and post-deploy

- A green pull request is not the end of the loop. After merge or after
  a deploy preview is available, run the post-deploy smoke check against
  the deployed URL.
- Use the named smoke-test command and the deployment URL provided by the
  workflow or environment.
- If the smoke check fails, treat that as a stop-ship signal. Do not
  wave the deploy through in the summary.
- If rollback conditions are met, recommend rollback explicitly instead
  of describing the failure passively.
```

## كيف تعرف أن الحلقة حقيقية

تكون لديك هذه الحلقة عندما:

- هدف نشر أو معاينة يُتيح عنوان URL مستقرًا
- اختبار تدقيق مسمّى يعمل على ذلك العنوان تلقائيًا
- محفّزات التراجع مكتوبة قبل أن يفشل النشر

## الشيء الواحد الذي يجب تذكّره

يثبت CI أن التغيير كان قابلًا للدمج. ويثبت التحقّق بعد النشر أن النشر نفسه سليم. وهذان ادّعاءان مختلفان، وإن أتمتت الأول فقط، فالثاني ما يزال مشكلتك.

## قراءات إضافية

- [CI كحلقة الملاذ الأخير](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort)
- [تمرين: إضافة تدقيقات ما بعد النشر إلى Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-post-deploy-smoke-checks-to-shelf)
