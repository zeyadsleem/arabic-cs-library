---
title: "الحالة الحتمية وعزل الاختبارات"
---

تعاملنا مع الأشياء خارج تطبيقك — واجهة Open Library API — بتسجيل HAR وإعادة تشغيله. الآن نحتاج إلى التعامل مع الأشياء *داخل* تطبيقك: قاعدة البيانات، والجلسة، وأي شيء ذي حالة يكتب فيه اختبار وقد يقرأ منه اختبار آخر.

هذا هو الدرس الذي تصبح فيه اختبارات Playwright قابلة للتنبؤ. وهو أيضًا الدرس الذي تتخطاه معظم المشاريع — وهو سبب كون معظم حزم Playwright جدارًا من تعليقات `.only` و`.skip` مع شخص واحد في الفريق يعرف كيف يفتح الحزمة من جديد.

## نمط الفشل

```
✓ test 1: add book passes
✓ test 2: rate book passes
✗ test 3: view shelf fails—expected 3 books, got 7
```

يفشل الاختبار 3 لأن الاختبارين 1 و2 تركا بيانات خلفهما. أو لأن الاختبار 2 من تشغيل CI *الليلة الماضية* ترك بيانات خلفه. أو لأن المطوّر شغّل الاختبار محليًا أمس ولم ينظّف. أو لأن الاختبارات تعمل بالتوازي واثنان منها يكتبان في رفّ المستخدم نفسه في الوقت نفسه، متسابقين إلى نتيجة غير حتمية.

كل واحد من هذه هو «الحزمة غير معزولة». ذلك هو الداء. وكل ما سنفعله الآن هو العلاج.

## القاعدتان

القاعدة الأولى: **كل اختبار يبدأ في حالة معروفة.** لا حالة مجهولة، ولا «أيًا كان ما كان هناك في المرة الماضية»، ولا «الحالة التي صادف أن تركها الاختبار السابق». نقطة بداية محدّدة ومسمّاة. ينبغي أن يستطيع الوكيل قراءة الاختبار ومعرفة البيانات الموجودة بالضبط عند بدايته.

القاعدة الثانية: **كل اختبار ينظّف بعد نفسه، أو يعمل في فقاعة تُهدَم.** أميل قليلًا إلى نهج الفقاعة لأن «ينظّف بعد نفسه» سهل النسيان وصعب التحقق.

لننظر إلى الاثنتين.

## القاعدة الأولى: زرع البيانات

يستخدم Shelf قاعدة SQLite عبر [Drizzle](https://orm.drizzle.team/). لاختبارات الطرف إلى الطرف، نريد طريقة لإعادة ضبط قاعدة البيانات إلى حالة معروفة قبل كل اختبار (أو كل ملف اختبار). النسخة الساذجة هي «نثر استدعاءات `db.delete(...)` في ملفات الاختبار». هذا ينجح لنهار واحد ويتحول إلى فوضى صيانة فورًا.

المشروع الأولي الحالي يتوقف عمدًا قبل طبقة واحدة من شحن مساعد الزرع الفعلي. بدلًا من ذلك يمنحك لبنين:

- أدوات مساعدة صغيرة على الخادم مثل `createUser` و`createBook` و`createShelfEntry` في `src/lib/server/`
- fixtures بصيغة JSON في `tests/data/*.json`

ثم يطلب منك مختبر الزرع الحتمي كتابة `tests/helpers/seed.ts` فوق تلك القطع. الفائدة تربوية: ينبغي أن يركّز الطلاب على Playwright والحالة الحتمية، لا أن يمضوا الدرس كله في هندسة عكسية لاستدعاءات إدراج Drizzle الخام.

لأدوات المشروع الأولي توقيعات مبسّطة تبدو تقريبًا هكذا (الصادرات الحقيقية دوال سهمية وتأخذ حقولًا أكثر، مثل `isAdmin` للمستخدمين و`featuredPosition` للكتب):

```typescript
// src/lib/server/users.ts
export async function createUser({ email, password, name }: CreateUserInput) {
  // hashes the password and inserts the row
}

// src/lib/server/books.ts
export async function createBook({ openLibraryId, title, author, description }: CreateBookInput) {
  // inserts the row and returns it
}

// src/lib/server/shelf-entries.ts
export async function createShelfEntry({ userId, bookId, status, rating }: CreateShelfEntryInput) {
  // inserts the row and returns it
}
```

وبيانات الزرع تعيش في JSON صريح:

```json
// tests/data/users.json
[
  {
    "email": "alice@example.com",
    "password": "ShelfStarter123!",
    "name": "Alice Reader",
    "isAdmin": false
  }
]
```

المساعد الذي يبنيه الطلاب في المختبر يقرأ ملفات JSON تلك، ويستدعي أدوات الخادم، ويصدّر الدالتين التي تعتمد عليهما بقية الحزمة:

```typescript
// tests/helpers/seed.ts
export async function seedFreshDatabase() {
  // reset users, books, and shelf entries from tests/data/*.json
}

export async function resetShelfContent() {
  // preserve users, reset books + shelf entries from tests/data/*.json
}
```

ثم في اختبار:

```typescript
import { resetShelfContent } from './helpers/seed';

test.beforeEach(async () => {
  await resetShelfContent();
});

test('alice can add Piranesi to her shelf', async ({ page }) => {
  await page.goto('/search?q=piranesi');
  await page.getByRole('button', { name: 'Add to shelf' }).click();
  await expect(page.getByText('Added to your shelf')).toBeVisible();
});
```

كل اختبار يبدأ بـ alice، وثلاثة كتب، ومدخلَي رفّ (Station Eleven وPiranesi). هذا هو العقد. وإذا احتاج اختبار بيانات مختلفة، فهو يزرع بيانات مختلفة *صراحةً*، لا بأمل أن بعض الاختبارات السابقة تركتها هناك.

المهم هنا أن الزرع *سريع* على SQLite. يمكنك تحمّل إعادة الزرع قبل كل اختبار. أما إذا كنت على Postgres واستغرق إعادة الزرع ثانيتين، فقد تعيد الزرع لكل ملف بدلًا من كل اختبار، أو تستخدم المعاملات (المزيد عن ذلك بعد قليل).

## القاعدة الثانية: فقاعات العزل

الزرع ينقلك إلى حالة *بداية* معروفة. والعزل ينقلك إلى *عملية* معروفة — اختباران يعملان بالتوازي لا يرى أحدهما كتابات الآخر، نقطة.

هناك ثلاث استراتيجيات شائعة. اختر واحدة بناءً على قاعدة بياناتك.

**معاملات لكل اختبار.** لفّ كل اختبار في معاملة، وارجع عنها في النهاية. هذا أسرع خيار ولا يحتاج أي كود تنظيف، لأن شيئًا لم يُثبَّت قط. المأخذ: لا ينجح إلا إذا أعاد كود تطبيقك استخدام اتصال قاعدة البيانات نفسه الذي يفتحه الاختبار. غالبًا ما يكسر تجميع الاتصالات على مستوى Node هذا، وعليك الحذر مع معالجات الطلبات على مستوى الإطار. يدعم [Drizzle](https://orm.drizzle.team/) هذا عبر `database.transaction`، لكن وصله بمعالجات طلبات SvelteKit يتطلب سباكة أكثر من درس كامل. يستحق المعرفة؛ لكنه ليس توصيتي الافتراضية.

**قواعد بيانات لكل عامل.** [يشغّل Playwright عدة عمال عندما يعمل بالتوازي.](https://playwright.dev/docs/test-parallel) يحصل كل عامل على ملف SQLite خاص به، ومخطّط خاص به، وزرع خاص به. تتشارك الاختبارات داخل العامل قاعدة البيانات نفسها لكنها تعمل دائمًا تسلسليًا، فلا يمكنها التسابق. هذا هو المكان الذي أريد أن تنتهي إليه مشاريع SQLite في نهاية المطاف. نسخة Shelf مستقبلية قد تبدو تقريبًا هكذا:

```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true,
  workers: 4,
  use: {
    baseURL: 'http://localhost:5173',
  },
});

// What the db helper would look like (Shelf today keys off databaseUrl,
// not TEST_WORKER_INDEX — this is aspirational):
const workerDatabasePath = `./test-database-${process.env.TEST_WORKER_INDEX ?? 0}.sqlite`;
```

كل عامل يوجّه التطبيق إلى ملف SQLite مختلف. وعندما يشغّل Playwright خادم التطوير (أو تشغّله أنت بنفسك بمتغيّر البيئة الصحيح)، يقرأ فهرس العامل ويستخدم قاعدة البيانات المطابقة.

**نطاقات لكل اختبار.** إذا كانت البيانات ذات نطاق طبيعي (مستخدم، أو مؤسسة، أو مستأجر)، فاجعل كل اختبار ينشئ نطاقه الخاص. Alice-1 للاختبار 1، وAlice-2 للاختبار 2. ثم تقرأ الاختبارات وتكتب داخل نطاقها ولا تتصادم أبدًا. هذا أثقل تكليف من الثلاثة لكنه أيضًا الأكثر مناعة، وينتقل إلى أي قاعدة بيانات بما فيها Postgres الشبيهة بالإنتاج.

## ما يفعله Shelf اليوم، ولماذا

لا يثبّت `playwright.config.ts` في Shelf قيمة `workers: 1`، وهذا هو الشكل الابتدائي الصحيح. الحزمة المشحونة صغيرة عمدًا: مواصفة دخان عامة واحدة، وأشجار مختبرات متجاهلة افتراضيًا، ولا مصفوفة مصادقة بعد. في ذلك العالم، أنظف تهيئة هي التهيئة الصادقة.

ما يتغيّر بمجرد أن تبني المختبرات اللاحقة هو مقدار الحالة المشتركة القابلة للتغيير. في اللحظة التي تضيف فيها مواصفات مصادقة تتحدث كلها إلى ملف SQLite نفسه، يتوقف عدد العمال عن كونه نظريًا. وإذا كشف رفع عدد العمال عن أعطال، فليس Playwright هو الوقح. إنها الحزمة تقول لك أخيرًا إن قصة عزل قاعدة البيانات ناقصة.

الإصلاح المغري هو `workers: 1`. تستخدمه أحيانًا مؤقتًا أثناء فتح طريق إعادة هيكلة. لا بأس. لكن ما يجب ألا تفعله هو أن تظن أن هذه الجبيرة المؤقتة هي التصميم النهائي. العامل الواحد يخفي التسريبات؛ ولا يزيلها.

الخطوة الدائمة التالية لمشروع SQLite مثل Shelf هي نمط قاعدة البيانات لكل عامل أعلاه. يحصل كل عامل على ملفه الخاص، ويقرأ الخادم `TEST_WORKER_INDEX`، ويوجّه مساعد الزرع إلى الملف نفسه الذي يستخدمه التطبيق. حينها يمكنك رفع عدد العمال مجددًا دون معاملة التوازي كخطأ.

## Fixtures الاختبار للإعداد المشترك

[‏`test.extend` في Playwright](https://playwright.dev/docs/test-fixtures) هو الطريقة النظيفة لربط بيانات الزرع بالاختبارات عندما تجد نفسك تكرّر كتلة `beforeEach`:

```typescript
import { test as base, expect } from '@playwright/test';
import { resetShelfContent, type SeedResult } from './helpers/seed';

type Fixtures = {
  seeded: SeedResult;
};

export const test = base.extend<Fixtures>({
  seeded: async ({}, use) => {
    const result = await resetShelfContent();
    await use(result);
    // no cleanup—reseeding handles it on the next test
  },
});

export { expect };
```

وفي اختبار:

```typescript
import { test, expect } from './fixtures';

test('reader can rate Station Eleven', async ({ page, seeded }) => {
  await page.goto('/shelf');
  // `seeded.reader` is available if the test needs the user id or email
  // ...
});
```

يعمل الـ fixture تلقائيًا عندما يستورد أي اختبار هذا `test`. لا مزيد من قوالب `beforeEach` المتناثرة في الملفات. ولأن منطق الزرع مركزي، فتحيث بيانات الأساس تغيير في ملف واحد.

## قواعد الوكيل

```markdown
## Database state in end-to-end tests

- Every test runs against a freshly seeded database. The seed lives in
  `tests/helpers/seed.ts`.
- Tests must not depend on data left by previous tests. If a test
  needs specific data, add it to the seed or insert it explicitly at the
  top of the test.
- Individual specs call `resetShelfContent`, which does _not_ reset user
  accounts. Only the authentication setup project uses `seedFreshDatabase`,
  because deleting users invalidates the stored browser session.
- The Shelf starter does not pin `workers` because the shipped suite is
  intentionally tiny. Once authenticated specs start sharing one SQLite
  file, treat worker-count failures as isolation bugs to fix, not as a
  reason to hard-code `workers: 1` forever.
```

القاعدة الأخيرة مهمة. سيعطّل الوكلاء التوازي بسرور لجعل اختبار فاشل ينجح. ينجح الأمر، ويصبح أخضر، وهو أيضًا انحدار صامت في سرعة الحزمة وضمانات العزل. لا تدعهم يفعلون ذلك.

## الشيء الوحيد الذي يجب تذكّره

ثابتان يجعلان حزمة Playwright جديرة بالثقة: كل اختبار يبدأ في حالة معروفة، ولا يمكن لاختبارين أن يرى أحدهما حالة الآخر. تحصل على الأول من مساعد زرع تستطيع كل مواصفة استدعاؤه مباشرة. وتحصل على الثاني باختيار استراتيجية تدعمها قاعدة بياناتك — ملفات لكل عامل، أو معاملات، أو نطاقات — وبمعاملة التوازي المتقلّب كتسريب يجب إصلاحه، لا كمقبض يُخفَّض.

## قراءات إضافية

- [تسجيل HARs لعزل الشبكة](https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation)
- [اختبارات هجينة بين API والواجهة](https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests)
