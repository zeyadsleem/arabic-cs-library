---
title: "اختبار المصادقة عبر طرف ثالث"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/testing-third-party-authentication"
---

أصعب خلل مصادقة يمكن أن تشرحه لفريق هو هذا: *«لا، لن نجعل كل طلب سحب ينتظر شاشة تسجيل الدخول في Google.»* فإن كان تطبيقك يسجّل الدخول عبر Google OAuth أو Okta أو Auth0 أو Microsoft أو أحد تدفّقات SAML المؤسسية التي بالكاد تفهمها، فمن المُغري أن تعامل واجهة المزوّد بوصفها جزءًا من مجموعة اختبارات الانحدار لديك.

وهذا هو الحدّ الخاطئ.

أنت لا تملك DOM الخاص بـGoogle. ولا تتحكّم بحدود معدّل طلباته، ولا بكشفه للبوتات، ولا بشاشة تحدٍّ إضافية تظهر عنده أحيانًا، ولا بالشخص في قسم تقنية المعلومات الذي بدّل رقم هاتف استرداد حساب الاختبار. فإن جعلت تلك الواجهة جزءًا من كل تشغيل شامل، فأنت تستأجر مجموعة اختباراتك من تقويم حوادث شخص آخر.

## الحدّ الذي تملكه فعلًا

في المصادقة عبر طرف ثالث، ثمّة ثلاثة أسئلة منفصلة حقًّا:

- هل يستطيع المستخدم *أن يبدأ* تدفّق تسجيل الدخول من تطبيقك؟
- هل يستطيع تطبيقك إنشاء الجلسة الصحيحة بعد استدعاء عودة (callback) ناجح؟
- هل يتصرّف تطبيقك بشكل صحيح بعد أن يسجّل المستخدم الدخول؟

هذه الأسئلة لا تستحق جميعها النوع نفسه من الاختبار.

الأول فحص تكامل ضيّق. والثاني شأن من شؤون مصادقة التطبيق. والثالث هو ما تدور حوله معظم مجموعة اختباراتك الشاملة في الحقيقة. فإن جمعتها كلها في اختبار واحد عملاق من نوع «سجّل الدخول إلى Google فعليًا»، دفعت أعلى كلفة ممكنة مقابل أقلّ إشارة نافعة.

## النمط المعتاد: هيّئ جلسة تطبيقك

إذا كان OAuth يُنتج في النهاية كوكي جلسة عادية في تطبيق*ك*، فأنظف نمط هو:

1. أضف مساعدًا أو نقطة نهاية خاصّة بالاختبار في التطبيق تُنشئ تلك الجلسة نفسها لمستخدم اختبار معروف في بيئة الاختبار أو بيئة التهيئة.
2. استدعِ ذلك المساعد من مشروع الإعداد في Playwright.
3. احفظ حالة التخزين الناتجة ودع بقية المجموعة تعيد استخدامها.

المقتطف أدناه توضيحي. فـShelf لا يستخدم مصادقة عبر طرف ثالث، لذا فـ`/test-authentication/session` بديل عن أي مسار تهيئة تملكه شيفرتك وتكشفه.

```typescript
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';

const authenticationFile = path.resolve('playwright/.authentication/user.json');

setup('authenticate test user for OAuth-backed app', async ({ request }) => {
  const response = await request.post('/test-authentication/session', {
    data: {
      email: 'alice@example.com',
      provider: 'google',
    },
  });

  expect(response.ok()).toBeTruthy();

  await request.storageState({ path: authenticationFile });
});
```

هذا ليس غشًّا. إنه اختيار الفاصل الصحيح.

فحركة عودة OAuth الحقيقية لديك تستقبل الهوية من Google وتحوّلها إلى جلسة تطبيق. والمساعد ينبغي أن يفعل ذلك الجزء *الذي تملكه* أنت مباشرةً. وما تتخطّاه هو واجهة المزوّد، لا نموذج التخويل الخاص بك.

تستخدم الوثائق الرسمية `playwright/.auth/` مجلدًا تقليديًا لحالة التخزين. أما Shelf فيستخدم `playwright/.authentication/` في مواد الورشة. وكلاهما يعمل. اختر واحدًا، وأبعده عن git، ولا تدع الاصطلاحين ينزلقان إلى المستودع نفسه.

وثمّة قاعدتان تهمّان هنا:

- يجب ألّا يوجد المساعد إلا في بيئتي الاختبار أو التهيئة، وألّا يوجد في الإنتاج أبدًا.
- يجب أن يُصدر المساعد النوع نفسه من الجلسات الذي تُصدره حركة العودة الحقيقية. لا تُنشئ مفتاحًا مزيفًا من نوع `"loggedIn": true` يتخطّى الأدوار أو المطالبات (claims) أو فحوص الأذونات.

وإن بدت القاعدة الثانية متشدّدة، فهذا حسن. فالطريق المختصر المزيف في المصادقة الذي يتخطّى شكل الجلسة الحقيقي هو كيف تحصل على مجموعة اختبارات خضراء لا تشبه الإنتاج.

## عندما تعيش الحالة النهائية في تخزين المتصفح

بعض المكدّسات لا تنتهي بكوكي خادم عادي. بل تُنزل الرموز (tokens) النهائية في `localStorage` أو `IndexedDB` عبر SDK يعمل في المتصفح. وفي هذه الحالة تظلّ تستخدم الفكرة العامة نفسها، لكن التهيئة يجب أن تنتهي داخل سياق متصفح حتى يستطيع Playwright التقاط حالة المتصفح الحقيقية.

```typescript
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';

const authenticationFile = path.resolve('playwright/.authentication/user.json');

setup('authenticate browser-backed OAuth session', async ({ page }) => {
  await page.goto('/test-authentication/google?email=alice@example.com');
  await expect(page).toHaveURL('/shelf');

  await page.context().storageState({
    path: authenticationFile,
    indexedDB: true,
  });
});
```

و`indexedDB: true` هو الجزء الذي يفوته الناس. فإن كان SDK المزوّد يخزّن الرموز هناك، فلقطة الكوكيز وحدها ناقصة، وستُعيد اختباراتك التوجيه إلى تسجيل الدخول «بشكل غامض».

هذا لا يزال نمط حالة التخزين نفسه من الدرس السابق. والفرق الوحيد أن مسار الإعداد لديك يبني حالة مصادقة مدعومة بالمتصفح بدلًا من جلسة خادم عادية.

## أبقِ اختبار دخان حقيقيًا صغيرًا واحدًا

ما زلت تريد اختبارًا واحدًا يُثبت أن التكامل يبدأ على نحو صحيح. فالنقر على `Continue with Google` ينبغي أن يوجّه إلى مسار بدء OAuth لديك أو إلى نطاق المزوّد. وهذا شيء صحيح أن تختبره.

```typescript
import { test, expect } from '@playwright/test';

test('google sign-in starts the OAuth redirect', async ({ page }) => {
  await page.goto('/login');

  await Promise.all([
    page.waitForURL(/\/auth\/google|accounts\.google\.com/),
    page.getByRole('button', { name: 'Continue with Google' }).click(),
  ]);

  await expect(page).toHaveURL(/\/auth\/google|accounts\.google\.com/);
});
```

هذا يكفي لإثبات أن زر تسجيل الدخول لديك ومساره وتوصيلات التوجيه فيه حيّة. ولا يكفي لإثبات كل حالة حدّية في تدفّق تسجيل الدخول في Google، ولا حاجة به إلى ذلك. فهذا اختبار دخان، لا مجموعة اختبارات انحدار كاملة مُستعارة من الخارج.

وإن كان تطبيقك يفتح نافذة منبثقة بدلًا من توجيه الصفحة الحالية، فالقاعدة نفسها تنطبق: تحقّق من أن النافذة المنبثقة أو التنقّل *يبدأ*. ولا تحوّل واجهة المزوّد الكاملة إلى الشيء الذي ينتظره كل مطوّر.

## ضع تدفّق المزوّد الحقيقي في مسار خاص به

أحيانًا تحتاج فعلًا إلى اختبار شامل واحد كامل لتدفّق المزوّد. ربما يطلبه فريق الامتثال لديك. وربما تنكسر تهيئة SAML الخاصّة بعميل ما في كثير من الأحيان بما يكفي لتريد مراقبًا حقيقيًا واحدًا.

لا بأس. اعزله فقط.

- شغّله على حسابات اختبار مخصّصة بأصغر أذونات ممكنة.
- أبعده عن بوابة طلبات السحب الرئيسية إن كان المزوّد قد يحدّد معدّل الطلبات أو يطرح تحديًا أو يتباطأ عشوائيًا.
- شغّله وفق جدول زمني أو كفحص بيئة يُستدعى يدويًا، لا كالشيء الذي يقرّر ما إذا كان كل فرع ميزة غير ذي صلة يستطيع الدمج.
- إن كان المزوّد يوفّر بيئة اختبار معزولة أو مستأجر اختبار، فاستخدمه.

والتمييز الأساسي هو هذا: تدفّق المزوّد الحقيقي قد يكون اختبار دخان نافعًا، لكنه خيار افتراضي بائس لحلقة عمل المطوّر اليومية.

## نمط الفشل الذي يجب تجنّبه

حين يصطدم فريق بـGoogle OAuth في Playwright لأول مرة، تكون الغريزة المعتادة واحدة من هذه:

- أتمتة واجهة المزوّد كاملة في كل اختبار.
- إضافة `page.waitForTimeout(5000)` حتى يستقرّ التوجيه في النهاية.
- حفظ ملف تعريف مُوثّق واحد طويل العمر والأمل ألّا تنتهي صلاحيته أبدًا.

والثلاثة كلها غير مستقرة.

أما النسخة المستقرة فمملّة:

- اختبار دخان صغير واحد للتوجيه
- مسار تهيئة واحد تملكه أنت لاختبارات المصادقة العادية
- ملف حالة تخزين واحد لكل دور
- مسار دخان معزول واحد للمزوّد الحقيقي، إن كنت تحتاجه فعلًا

وإن احتجت يومًا إلى تبديل سياق متصفح واحد من حالة مصادقة إلى أخرى داخل تدفّق دخان ضيّق، فإن إصدارات Playwright الأحدث تضيف `browserContext.setStorageState()`. وهذه حالة حدّية متقدّمة، لا المسار الافتراضي. فالافتراضي لا يزال «سياق جديد، وحالة معروفة، وبلا بطولات».

هذا البنيان هو ما يمنع «المصادقة خارجية» من أن تنقلب إلى «المجموعة كلها خارجية».

## قواعد الوكيل

```markdown
## Third-party authentication

- For Google OAuth, Okta, Auth0, Microsoft, SAML, or any other
  third-party provider, do not drive the provider UI in every test.
- Keep one narrow smoke test for "the sign-in flow starts."
- For the normal authenticated suite, bootstrap the application's own
  session in test or staging and save Playwright storage state from
  there.
- If the auth state lives in browser storage, capture it with
  `browserContext.storageState({ indexedDB: true })`.
- If you deliberately switch auth state mid-flow, prefer
  `browserContext.setStorageState()` over hand-mutating cookies and
  localStorage.
- Any full real-provider flow belongs in a dedicated smoke lane, not the
  normal pull-request gate.
```

## الشيء الوحيد الذي يجب تذكّره

لا تُجرِ اختبار انحدار على صفحة تسجيل الدخول في Google. أجرِ اختبار انحدار على *علاقة تطبيقك بالمصادقة*. ابدأ التوجيه مرة واحدة، وأثبت أنك تستطيع إنشاء الجلسة الصحيحة، واحفظها في حالة التخزين، وأنفق بقية ميزانية اختبارك على السلوك الذي تملكه فعلًا.

## قراءات إضافية

- [المصادقة بحالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)
- [مشاريع Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects)
- [APIRequestContext: ما هو أبعد من حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/api-request-context-beyond-storage-state)
