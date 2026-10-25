---
title: "المصادقة بحالة التخزين"
---

هذا نمط أراه في كل مجموعة Playwright أورثها تقريبًا — وهو يفعل ضررًا أكبر ممّا يدركه أي أحد في الفريق.

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'alice@example.com');
  await page.fill('[name=password]', 'password123');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('/shelf');
});
```

كل اختبار على حدة يسجّل الدخول عبر الواجهة. كل اختبار على حدة يفتح صفحة تسجيل الدخول، ويملأ الحقول، وينقر الإرسال، وينتظر إعادة التوجيه. فإن كانت مجموعتك مئة اختبار وكان تسجيل الدخول يستغرق 1.5 ثانية، فقد أنفقت للتوّ 150 ثانية من الزمن الفعلي في تكرار الشيء نفسه مرارًا. وهذا مال حقيقي في التكامل المستمر. وهو محليًا السبب في أن لا أحد يشغّل المجموعة كاملة.

بل يزداد الأمر سوءًا. فكل عملية تسجيل دخول من تلك العمليات هي *أيضًا* نقطة فشل محتملة مستقلة عن أي شيء يختبره الاختبار فعلًا. فإن غيّر أحدهم السمة `name` في حقل البريد الإلكتروني، انكسر خمسون اختبارًا دفعة واحدة، ولا علاقة لأي منها بتسجيل الدخول. وتكون مخرجات الاختبار جدارًا أحمر مليئًا بأخطاء «العنصر غير موجود»، والوكيل الذي ينظر إلى ذلك الجدار الأحمر سيمضي بسرور ليعيد كتابة خمسين اختبارًا بينما الإصلاح الفعلي هو تحديث محدّد واحد في `beforeEach` واحد.

هناك طريقة أفضل. وليست جديدة. إنها في [وثائق Playwright](https://playwright.dev/docs/auth). اسمها [حالة التخزين](https://playwright.dev/docs/auth)، ولا أحد تقريبًا يستخدمها.

## الفكرة

سجّل الدخول مرّة واحدة، في بداية تشغيل الاختبارات. واحفظ حالة المتصفّح الناتجة — ملفات تعريف الارتباط، و`localStorage`، و`IndexedDB` إن طلبتها — في JSON. وأخبر كل اختبار أن يبدأ من تلك الحالة بدلًا من متصفّح فارغ. الآن يبدأ كل اختبار وقد سُجّل الدخول إليه سلفًا، وقد دفعت كلفة تسجيل الدخول مرّة واحدة بالضبط.

يملك Playwright دعمًا من الدرجة الأولى لهذا. لا تحتاج إلى إضافات، ولا تحتاج إلى تجهيزات بارعة، كل ما تحتاجه أن تعرف أين يوجد المقبضان.

ملاحظة تسمية واحدة من [وثائق المصادقة](https://playwright.dev/docs/auth) الرسمية: تستخدم الوثائق `playwright/.auth/` كمجلد اصطلاحي. أما Shelf فيحجز `playwright/.authentication/` في ملف `.gitignore` لعمل المختبر في هذا الدرس، وهذا لا بأس به. الاصطلاح أقل أهمية من القاعدة: أبقِ الملفات خارج git واجعل الموقع واضحًا.

## التهيئة

أنشئ ملف تهيئة Playwright — يضيف هذا المختبر `tests/authentication.setup.ts` إلى Shelf — يسجّل الدخول ويكتب الحالة إلى ملف. وهناك طريقتان لأداء جزء «تسجيل الدخول»، وكلتاهما تستحقّ المعرفة.

### الخيار أ: تسجيل الدخول عبر الواجهة

```typescript
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';

const authenticationFile = path.resolve('playwright/.authentication/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('alice@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/shelf');

  // Save cookies, localStorage, etc., to a file
  await page.context().storageState({ path: authenticationFile });
});
```

هذا هو الافتراضي المحافظ، وهو ما يستخدمه Shelf. إنه يشغّل تدفّق تسجيل الدخول الحقيقي — الصفحة نفسها، والنموذج نفسه، وإعادة التوجيه نفسها — مرّة واحدة لكل استدعاء Playwright بدلًا من مرّة لكل اختبار. والأثر الجانبي أنه يعمل أيضًا كاختبار دخان: فإن كسر أحدهم نموذج تسجيل الدخول، فشلت التهيئة قبل أن يعمل أي اختبار آخر، وكان الخطأ واضحًا.

### الخيار ب: ضرب نقطة نهاية المصادقة مباشرة

```typescript
import { test as setup, expect } from '@playwright/test';
import path from 'node:path';

const authenticationFile = path.resolve('playwright/.authentication/user.json');

setup('authenticate', async ({ request }) => {
  // Shelf's login is a SvelteKit form action, not a JSON API endpoint.
  // POST to `/login?/signInEmail` with form-encoded credentials.
  const response = await request.post('/login?/signInEmail', {
    form: { email: 'alice@example.com', password: 'password123' },
  });

  expect(response.ok()).toBeTruthy();

  await request.storageState({ path: authenticationFile });
});
```

لا تحميل صفحة، ولا عرض DOM، ولا اعتماد على ترميز نموذج تسجيل الدخول. هذا أسرع وأكثر صمودًا أمام تغييرات الواجهة. والمقايضة: إن كسر أحدهم نموذج تسجيل الدخول، ظلّت التهيئة تنجح، ولن تعرف حتى يبلّغ مستخدم — أو حتى يكون لديك اختبار منفصل يمارس صفحة تسجيل الدخول مباشرة.

إن كان تطبيقك يستخدم نقطة نهاية مصادقة JSON عادية بدلًا من إجراء نموذج SvelteKit، فاستبدل المسار وحوّل `form: { ... }` إلى `data: { ... }` كي يُرسل الجسم بصيغة JSON.

### أيّهما تختار؟

استخدم نهج الواجهة حين يكون تسجيل الدخول سريعًا وتريد اختبار الدخان المجاني. واستخدم نهج واجهة البرمجة حين يكون تسجيل الدخول بطيئًا (إعادات توجيه OAuth، واختبارات CAPTCHA في بيئة الاختبار، وتدفّقات متعدّدة الخطوات)، أو حين يكون لديك سلفًا اختبار تسجيل دخول مخصّص ولا تحتاج أن يعمل التهيئة كاختبار ثانٍ.

### كيف يبدو ملف حالة التخزين والكائن

في كلتا الحالتين، يستطيع Playwright كتابة ملف JSON في `playwright/.authentication/user.json` يبدو تقريبًا هكذا:

```json
{
  "cookies": [
    {
      "name": "shelf_session",
      "value": "eyJhbGciOiJIUzI1NiJ9...",
      "domain": "127.0.0.1",
      "path": "/",
      "expires": 1748000000,
      "httpOnly": true,
      "secure": false,
      "sameSite": "Lax"
    }
  ],
  "origins": [
    {
      "origin": "http://127.0.0.1:4173",
      "localStorage": [
        {
          "name": "shelf:user",
          "value": "{\"id\":\"usr_01J\",\"email\":\"alice@example.com\"}"
        }
      ]
    }
  ]
}
```

هذا الشكل على القرص هو أيضًا شكل الكائن الأساسي الذي يمكنك تمريره مباشرة إلى `storageState` في الشيفرة. وإن صدّرت مع `indexedDB: true`، فيمكن لـPlaywright أن يضيف بيانات لقطة إضافية لك، لكن الصيغة المضمّنة المكتوبة يدويًا تبدأ دائمًا بـ`cookies` و`origins`. ولستَ *مضطرًا* إلى القراءة من ملف إن كانت الحالة صغيرة بما يكفي ليكون تضمينها أوضح.

```typescript
import { test } from '@playwright/test';

test.use({
  storageState: {
    cookies: [
      {
        name: 'shelf_session',
        value: 'test-session-token',
        domain: '127.0.0.1',
        path: '/',
        expires: 1893456000,
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      },
    ],
    origins: [
      {
        origin: 'http://127.0.0.1:4173',
        localStorage: [
          {
            name: 'shelf:user',
            value: JSON.stringify({
              id: 'usr_01J',
              email: 'alice@example.com',
            }),
          },
        ],
      },
    ],
  },
});

test('opens already signed in from an inline object', async ({ page }) => {
  await page.goto('/shelf');
  // Already authenticated without reading a file.
});
```

يفيد ذلك حين تريد حالة اصطناعية صغيرة لملف مواصفة واحد، أو حين تريد فرض حالة مسجّلة الخروج معروفة، أو حين يكون الاعتماد على نظام الملفات مراسم أكثر من قيمته.

```typescript
import { test } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });
```

كل حقل في الكائن المضمّن مهم. في وثائق Playwright الحالية وأنواع Playwright `1.59.x` المثبّتة في هذا المستودع، تقبل صيغة الكائن مفتاحين علويين بالضبط: `cookies` و`origins`.

#### `cookies`

هذه مصفوفة من كائنات ملفات تعريف الارتباط تُحمَّل مسبقًا في سياق المتصفّح.

- **`name`:** اسم ملف تعريف الارتباط.
- **`value`:** قيمة ملف تعريف الارتباط.
- **`domain`:** المضيف الذي ينتمي إليه ملف تعريف الارتباط. أضف النقطة `.` في البداية إن أردت أن ينطبق على النطاقات الفرعية أيضًا، مثل `.example.com`.
- **`path`:** مسار URL الذي ينطبق عليه ملف تعريف الارتباط. وتعني `'/'` الموقع كله.
- **`expires`:** وقت الانتهاء كطابع زمني Unix بالثواني.
- **`httpOnly`:** هل يستطيع JavaScript في الصفحة قراءة ملف تعريف الارتباط. وتعني `true` أن `document.cookie` لا يراه.
- **`secure`:** هل ينبغي إرسال ملف تعريف الارتباط عبر HTTPS فقط.
- **`sameSite`:** السلوك عبر المواقع. `'Strict'` هي الأكثر تقييدًا، و`'Lax'` هي الافتراضي الشائع، و`'None'` تسمح بالاستخدام عبر المواقع.

#### `origins`

هذه مصفوفة من حزم تخزين محصورة بنطاق أصل. كل واحدة تقابل أصل متصفّح واحدًا بعينه.

- **`origin`:** المخطّط والمضيف والمنفذ بالضبط، مثل `http://localhost:5173`. فإن كانت الصفحة تعمل على أصل مختلف، فلا تفعل هذه المدخلات شيئًا.
- **`localStorage`:** مدخلات `localStorage` التي تُحمَّل مسبقًا لذلك الأصل.

#### `localStorage`

كل مدخل `localStorage` زوج اسم/قيمة.

- **`name`:** المفتاح.
- **`value`:** القيمة النصية المخزّنة. فـ`localStorage` لا يقبل إلا النصوص، لذا تحتاج الكائنات إلى `JSON.stringify(...)`.

#### ما الذي *لا* يوجد في هذا الكائن

هذا هو الجزء الذي يخلط فيه الناس.

- لا يوجد هنا مفتاح `path` في المستوى الأعلى. فـ`path` ينتمي إلى [`browserContext.storageState({ path })`](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state) حين تكون *تصدّر* الحالة إلى القرص.
- ولا يوجد هنا مفتاح `indexedDB` في المستوى الأعلى أيضًا. فـ`indexedDB: true` خيار *تصدير* أيضًا في `browserContext.storageState(...)`، لا شيء تكتبه يدويًا عادةً في كائن الإدخال المضمّن.
- لا يوجد مفتاح `sessionStorage`. و[وثائق المصادقة في Playwright](https://playwright.dev/docs/auth#session-storage) صريحة في أن `storageState` لا يحفظ `sessionStorage`؛ فإن كان تطبيقك يخزّن المصادقة هناك، فأنت بحاجة إلى وصفة `addInitScript` بدلًا من ذلك.
- لا يوجد اختصار `url` لملف تعريف الارتباط في هذا الشكل. فـ`url` موجود في [`browserContext.addCookies()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-cookies)، لكن `storageState` يتوقّع `domain` و`path`.

فالنموذج الذهني هو:

- `browserContext.storageState({ path, indexedDB })`: تصدير الحالة
- `test.use({ storageState })` أو `browser.newContext({ storageState })`: استهلاك مسار ملف أو كائن مضمّن فيه `cookies` و`origins`

## بعض الحالات الحدّية المتقدّمة في حالة المصادقة

ثلاث واجهات برمجية أصغر تستحقّ المعرفة بعد أن يستقرّ النمط الأساسي.

أولًا، إن كانت بيانات مصادقتك تعيش في تخزين يديره المتصفّح خارج ملفات تعريف الارتباط و`localStorage`، فصدّر مع `indexedDB: true`:

```typescript
await page.context().storageState({
  path: authenticationFile,
  indexedDB: true,
});
```

يهمّ ذلك في تدفّقات المصادقة التي تقودها حزم SDK وتخزّن الرموز في IndexedDB بدلًا من ملفات تعريف الارتباط.

ثانيًا، تضيف إصدارات Playwright الأحدث [`browserContext.setStorageState()`](https://playwright.dev/docs/api/class-browsercontext). وهو يتيح لك مسح ملفات تعريف الارتباط الحالية، و`localStorage`، وIndexedDB، وتطبيق حالة جديدة على السياق نفسه. وما زالت معظم مجموعات الاختبار تُخدَم على نحو أفضل بـ«سياق جديد لكل اختبار»، لكن إن كنت تكتب مساعدًا متعمّدًا لتبديل الأدوار أو إعادة الضبط، فهذا أنظف من محاولة تغيير الجلسة القديمة قطعةً قطعة.

ثالثًا، إن كنت تختبر CHIPS أو ملفات تعريف الارتباط الخارجية المقسّمة، فيمكن لكائنات ملفات تعريف الارتباط أن تحمل `partitionKey`. ولا يحتاج Shelf إلى هذا. لكن يستحقّ أن تعرف أن الشكل موجود قبل أن تنفق عصرًا تتساءل لماذا يفتقد اختبار حديث لملفات تعريف الارتباط الخارجية جزءًا من نموذج الجلسة.

## توصيله بالتهيئة

هنا [مشاريع Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects) تثبت قيمتها. وإن لم تكن قد قرأت ذلك الدرس بعد، فالنسخة القصيرة: المشروع كتلة مسمّاة في `playwright.config.ts` لها إعداداتها واعتمادياتها. ويشغّلها Playwright بترتيب الاعتماديات، كرسم بياني مصغّر للبناء.

وللمصادقة، تقسّم التهيئة إلى مشروعين — واحد يسجّل الدخول، وآخر يشغّل الاختبارات الفعلية:

```typescript
import { defineConfig } from '@playwright/test';
import path from 'node:path';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /authentication\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        storageState: path.resolve('playwright/.authentication/user.json'),
      },
      dependencies: ['setup'],
    },
  ],
});
```

مشروع `setup` يطابق ملف تهيئة المصادقة فقط. ومشروع `chromium` يعتمد على `setup`، فيضمن Playwright أن تسجيل الدخول يعمل أولًا. وكل اختبار في `chromium` يبدأ والجلسة المحفوظة محمّلة مسبقًا — لا شيفرة تسجيل دخول، ولا `beforeEach`، ولا شيء.

```
flowchart TD
  A["Setup project runs once"] --> B["User logs in via UI"]
  B --> C["Browser state saved<br>to JSON file"]
  C --> D["Tests run"]
  D --> E["Each test loads<br>storage state"]
  E --> F["Tests start<br>already authenticated"]

  style A fill:#e1f5ff
  style C fill:#c8e6c9
  style F fill:#c8e6c9
```

الاختبارات التي كانت تبدأ بتدفّق تسجيل دخول تبدأ الآن من `/shelf` وقد سُجّل الدخول إليها مسبقًا:

```typescript
test('rate a book', async ({ page }) => {
  await page.goto('/shelf');
  // Already logged in. Just do the thing.
  await page
    .getByRole('article', { name: /Station Eleven/ })
    .getByRole('button', { name: 'Rate this book' })
    .click();
  // ...
});
```

ذهبت شيفرة تسجيل الدخول. وذهب *همّ* تسجيل الدخول. فإن انكسر تسجيل الدخول، فشل اختبار واحد بالضبط — اختبار التهيئة — وأخبرك الخطأ بلا لبس أن تسجيل الدخول نفسه معطوب، لا أن «كل شيء متقلّب».

## أدوار متعدّدة

لدى Shelf واجهة إدارة لإبراز كتب في الصفحة الرئيسية. لذا نحتاج سياقين مصادَقين: مستخدمًا عاديًا ومشرفًا. سهل:

```typescript
// authentication.setup.ts
setup('authenticate as user', async ({ page }) => {
  // ... log in as alice ...
  await page.context().storageState({ path: 'playwright/.authentication/user.json' });
});

setup('authenticate as admin', async ({ page }) => {
  // ... log in as admin ...
  await page.context().storageState({ path: 'playwright/.authentication/admin.json' });
});
```

ثم في التهيئة، مشروعا اختبار:

```typescript
projects: [
  { name: 'setup', testMatch: /authentication\.setup\.ts/ },
  {
    name: 'user',
    testMatch: /tests\/user\//,
    use: { storageState: 'playwright/.authentication/user.json' },
    dependencies: ['setup'],
  },
  {
    name: 'admin',
    testMatch: /tests\/admin\//,
    use: { storageState: 'playwright/.authentication/admin.json' },
    dependencies: ['setup'],
  },
];
```

نظّم الاختبارات حسب الدور تحت مجلدات فرعية. فيرث كل اختبار الحالة الصحيحة تلقائيًا. لا مزخرفات، ولا تجهيزات داخل تجهيزات، ولا منطق `beforeEach` بارع.

## مزوّدو المصادقة الخارجيون ينتهون أيضًا إلى حالة التخزين

إن كان تطبيقك يسجّل الدخول عبر Google OAuth، أو Okta، أو Microsoft، أو Auth0، أو أي مزوّد هوية خارجي آخر، فنمط حالة التخزين ينطبق أيضًا. وما يتغيّر ليس الوجهة بل *كيف تحصل على الحالة المصادَقة*.

يغطّي الدرس المخصّص، [اختبار المصادقة عبر طرف ثالث](https://stevekinney.com/courses/self-testing-ai-agents/testing-third-party-authentication)، النمط بالتفصيل: أبقِ اختبار دخان ضيّقًا واحدًا لـ«إعادة التوجيه تبدأ»، وهيِّئ جلسة تطبيقك الخاصة للمجموعة العادية، واحفظ تدفّقات المزوّد الحقيقي الكاملة لمسار دخان منفصل حين تحتاجها فعلًا.

## ملف `.gitignore` الذي تحتاجه

تحتوي ملفات حالة المصادقة على ملفات تعريف ارتباط حقيقية. لا تلتزم بها. أضف هذا إلى `.gitignore`:

```
playwright/.authentication/
# or `playwright/.auth/` if you follow the Playwright docs convention
```

ولا تتخطَّ هذه الخطوة. رأيت ملفات تعريف ارتباط جلسة تُلتزم في مستودعات عامة مرّتين. وفي المرّتين كان الوكيل هو من فعلها. ضع سطر التجاهل قبل أن يكتب الوكيل ملف التهيئة، لا بعده.

## متى تعيد المصادقة

ملفات حالة التخزين لا تنتهي من تلقاء نفسها. فإن كانت ملفات تعريف ارتباط جلستك قصيرة العمر (كما ينبغي أن تكون)، فسيصبح ملف الحالة قديمًا في نهاية المطاف، وستبدأ اختباراتك بالفشل بأخطاء «أُعيد التوجيه إلى /login».

يوجد خياران:

- إعادة توليد ملف الحالة عند كل تشغيل Playwright. ونهج مشروع `setup` أعلاه يفعل ذلك تلقائيًا — فكل `npx playwright test` يشغّل تسجيل الدخول من جديد.
- تخزين ملف الحالة مؤقتًا بمدة صلاحية. وتوجد وصفات في وثائق Playwright إن أردت ذلك. وأنا لا أفعلها عادةً — فإعادة التوليد عند كل تشغيل رخيصة بما يكفي لأنني لا أكلّف نفسي عناء التخزين المؤقت.

> **نصيحة**
>
> نمط مشروع التهيئة هو الافتراضي الأكثر أمانًا لشيفرة الورشة لأنه يمنحك حالة مصادقة طازجة وحقيقية في المتصفّح عند كل تشغيل. لا تخزّن الملف مؤقتًا إلا حين تقيس التهيئة كعنق زجاجة وتفهم أنماط الفشل المتعلّقة بملفات تعريف الارتباط المنتهية.

## قواعد الوكيل

```markdown
## Playwright authentication

- Never log in through the UI inside a test. Login happens once, in
  `tests/authentication.setup.ts`, and all other tests inherit
  the resulting storage state.
- If a test needs a different user or role, add a new setup for that
  role and a new Playwright project that depends on it.
- Never commit `playwright/.authentication/`. It contains real session
  cookies. The docs call this folder `playwright/.auth/`; the rule is the
  same either way.
- If a test is failing because it's redirected to `/login`, the problem
  is the setup file or the session cookie TTL, not the individual test.
  Do not fix it by adding `page.goto('/login')` to the test.
```

القاعدة الأخيرة موجودة تحديدًا لمنع الوكيل من «إصلاح» العَرَض حين تكون التهيئة معطوبة. لقد شاهدت وكيلًا، حين أُعطي خطأ إعادة توجيه، يتراجع عن ستة أشهر من العمل على حالة التخزين لأن نسخ كتلة تسجيل دخول ولصقها في الاختبار الفاشل كان أسهل. القاعدة تجعل ذلك ممنوعًا صراحةً.

## الشيء الوحيد الذي يجب تذكّره

تسجّل الدخول مرّة لكل تشغيل، لا مرّة لكل اختبار. والوفورات في الكلفة حقيقية، وتحسينات الاستقرار أكبر من الوفورات، والنمط واحد من الأماكن القليلة التي تكون فيها إعدادات Playwright الافتراضية مصمّمة تصميمًا جيدًا فعلًا ولا يستخدمها أحد تقريبًا. ضعه في ملف التعليمات. وسيشكرك الوكيل بأن لا يكتب مئة كتلة تسجيل دخول.

## قراءات إضافية

- [مشاريع Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects)
- [اختبار المصادقة عبر طرف ثالث](https://stevekinney.com/courses/self-testing-ai-agents/testing-third-party-authentication)
- [حكاية الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)
- [تسجيل ملفات HAR لعزل الشبكة](https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation)
