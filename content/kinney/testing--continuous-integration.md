---
title: "إعداد التكامل المستمر (Setting Up Continuous Integration)"
lang: ar
source: "https://stevekinney.com/courses/testing/continuous-integration"
---

التكامل المستمر (CI) ممارسة حاسمة في تطوير البرمجيات الحديث، تتيح للفرق اكتشاف المشكلات مبكرًا بتشغيل الاختبارات تلقائيًا على تغييرات الشيفرة. يوفر **GitHub Actions** منصة قوية لأتمتة سير العمل مباشرة داخل مستودع GitHub لديك. سيرشدك هذا الدليل خلال إعداد GitHub Actions لتشغيل اختبارات وحدات **Vitest** في كل طلب سحب (PR)، بما يضمن ألا يُدمج إلا الكود الناجح.

## لماذا نؤتمت الاختبارات باستخدام GitHub Actions؟

- **الكشف المبكر**: اكتشف الأخطاء والمشكلات فور دفع الشيفرة.
- **الاتساق**: تأكد من أن كل تغييرات الشيفرة تلبي معايير الاختبار في المشروع.
- **الكفاءة**: أتمت عملية الاختبار لتوفير الوقت وتقليل الجهد اليدوي.
- **التعاون**: وفر تغذية راجعة فورية للمساهمين عبر فحوص طلبات السحب.

## المتطلبات المسبقة {#prerequisites}

- مستودع GitHub يحتوي مشروعك.
- Vitest مثبّت ومهيأ في مشروعك.
- اختبارات وحدات موجودة مكتوبة بـ Vitest.
- Node.js ومدير حزم مهيأ في مشروعك (npm أو pnpm أو yarn أو bun).

## دليل خطوة بخطوة

### أنشئ ملف سير عمل GitHub Actions

في مستودعك، أنشئ دليلًا اسمه `.github/workflows` إن لم يكن موجودًا. داخل هذا الدليل، أنشئ ملف YAML جديدًا لسير عملك، مثل `ci.yml`.

```typescript
your-repo/
├── .github/
│   └── workflows/
│       └── ci.yml
```

### عرّف تهيئة سير العمل

افتح `ci.yml` وعرّف سير العمل:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

- **`name: CI`**: يسمي سير العمل «CI» (التكامل المستمر).
- **`on: pull_request`**: يشغّل سير العمل عند طلبات السحب الموجّهة إلى فرع `main`.
- **`jobs`**: يحدد المهام التي ستُشغَّل؛ في هذه الحالة، مهمة واحدة اسمها `build`.
- **`runs-on`**: يحدد بيئة نظام التشغيل (`ubuntu-latest`).
- **`strategy.matrix.node-version`**: يتيح الاختبار على إصدارات Node.js مختلفة (عدّل حسب الحاجة).
- **`steps`**: يسرد الخطوات التي ستُنفَّذ في المهمة.

> **ملاحظة**: Node.js 16 مهجور ولم يعد مدعومًا من GitHub Actions. استخدم إصدارات LTS النشطة (مثل 18.x/20.x/22.x).

### تفصيل خطوات سير العمل

#### سحب المستودع

أولًا وقبل كل شيء: لنخبر الإجراء بسحب مستودعك.

```yaml
- name: Checkout code
  uses: actions/checkout@v3
```

يستخدم هذا إجراء `actions/checkout` لاستنساخ مستودعك.

#### إعداد بيئة Node

```yaml
- name: Use Node.js ${{ matrix.node-version }}
  uses: actions/setup-node@v3
  with:
    node-version: ${{ matrix.node-version }}
    cache: 'npm'
```

هذه الخطوة:

- تهيّئ إصدار Node المحدد، و
- تخزّن اعتماديات `npm` مؤقتًا لتسريع سير العمل.

#### ثبّت اعتمادياتك

```yaml
- name: Install dependencies
  run: npm install
```

لا شيء مميز بشكل خاص هنا. يثبّت هذا اعتماديات المشروع المعرّفة في `package.json`.

#### شغّل الاختبارات

```yaml
- name: Run tests
  run: npm test
```

ينفّذ هذا سكربت الاختبار المعرّف في `package.json`.

### استخدام pnpm أو yarn أو bun بدلًا من npm

إذا كنت تستخدم مدير حزم مختلفًا، فأضف خطوة إعداده واستبدل أوامر التثبيت/الاختبار. على سبيل المثال، مع **pnpm**:

```yaml
- name: Set up pnpm
  uses: pnpm/action-setup@v4
  with:
    version: 9

- name: Install dependencies
  run: pnpm install

- name: Run tests
  run: pnpm test
```

أما **yarn**، ففعّل Corepack واستخدم `yarn install`/`yarn test`. وأما **bun**، فاستخدم `oven-sh/setup-bun@v2` وشغّل `bun install`/`bun test`. عدّل قيمة `cache` في `actions/setup-node` لتطابق مدير حزمك (`pnpm`/`yarn`).

### أودع ملف سير العمل وادفعه

أضف ملف سير العمل إلى مستودعك وادفعه إلى GitHub:

```bash
git add .github/workflows/ci.yml
git commit -m "Add CI workflow for running Vitest tests"
git push origin main
```

### تحقق من تنفيذ سير العمل

بعد دفع ملف سير العمل:

- افتح مستودعك على GitHub.
- انتقل إلى تبويب **Actions**.
- ينبغي أن ترى سير عمل **CI** مدرجًا.
- انقر عليه لرؤية تفاصيل تشغيلات سير العمل.

### اختبر سير العمل بطلب سحب

أنشئ فرعًا جديدًا.

```bash
git checkout -b test-ci
```

أجرِ تغييرًا صغيرًا أو أضف إيداعًا وهميًا.

```bash
touch dummy.txt
git add dummy.txt
git commit -m "Test CI workflow"
git push origin test-ci
```

- أنشئ طلب سحب موجّهًا إلى فرع `main`.
- ينبغي أن يُشغَّل سير عمل CI تلقائيًا.
- افحص صفحة طلب السحب لرؤية حالة الفحوص.

### التعامل مع إخفاقات الاختبارات

إذا فشلت اختباراتك:

- سيميّز سير العمل البناء كمُخفِق.
- سيعرض طلب السحب أن الفحوص فشلت.
- انقر رابط **التفاصيل** لعرض السجلات وتحديد المشكلات.
- أصلح الاختبارات أو الشيفرة المسببة للفشل.
- ادفع التغييرات؛ سيعيد سير العمل التشغيل.

### إضافة تقارير التغطية (اختياري)

إذا أردت تضمين تقارير التغطية:

عدّل سكربت الاختبار في `package.json`:

```json
{
  "scripts": {
    "test": "vitest --coverage"
  }
}
```

حدّث سير العمل لرفع عناصر التغطية الأثرية:

```yaml
- name: Run tests with coverage
  run: npm test

- name: Upload coverage report
  uses: actions/upload-artifact@v3
  with:
    name: coverage-report
    path: coverage
```

سيكون تقرير التغطية متاحًا في عناصر سير العمل الأثرية.

### اختياري: فرض فحوص الحالة المطلوبة

لمنع دمج شيفرة باختبارات فاشلة:

- اذهب إلى **Settings** > **Branches** في مستودعك.
- تحت **Branch protection rules**، انقر **Add rule**.
- حدد نمط اسم الفرع (مثل `main`).
- فعّل **Require status checks to pass before merging**.
- اختر سير عمل **CI** كفحص مطلوب.
- احفظ التغييرات.

## أفضل الممارسات {#best-practices}

**استخدم التخزين المؤقت**: خزّن الاعتماديات مؤقتًا لتسريع تشغيلات سير العمل.

```yaml
with:
  node-version: ${{ matrix.node-version }}
  cache: 'npm'
```

**اختبر إصدارات Node متعددة**: تأكد من التوافق عبر بيئات مختلفة. هذا على الأرجح مهم فقط إذا كنت تختبر شيفرة من جهة الخادم.

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

**الفشل السريع**: استخدم خيار `fail-fast` لإيقاف تشغيل المهام عند أول فشل.

```yaml
strategy:
  fail-fast: true
```

**وازِ بين المهام**: إذا كانت لديك مجموعات اختبارات متعددة، فشغّلها على التوازي لتقليل إجمالي زمن البناء.

**أمّن أسرارك**: تجنب تضمين المعلومات الحساسة في سير العمل. استخدم أسرار GitHub المشفّرة.

**أبقِ سير العمل محدّثًا**: حدّث إصدارات الإجراءات بانتظام للاستفادة من التحسينات وتصحيحات الأمان.

## نصائح استكشاف الأخطاء وإصلاحها

إذا ساءت الأمور، فإليك بعض الأسباب الشائعة المحتملة.

- **مشكلات الأذونات**: تأكد من وجود ملف سير العمل في الفرع الافتراضي (مثل `main`) ليعمل عند طلبات السحب.
- **أخطاء الصياغة**: YAML ليس شيفرة. إنه لغة ترميز أخرى (YAML). استخدم مدقق YAML أو محرر سير العمل في GitHub للتحقق من ملفات YAML.
- **التخزين المؤقت لا يعمل**: تحقق من تعيين مفتاح التخزين المؤقت بشكل صحيح ومن عدم تغيّر اعتماديات التخزين المؤقت.
- **اختلافات البيئة**: إذا نجحت الاختبارات محليًا وفشلت في CI، فتأكد من اتساق متغيرات البيئة والتهيئات.

## الخلاصة {#conclusion}

إعداد GitHub Actions لتشغيل اختبارات وحدات Vitest في كل طلب سحب يحسّن سير عمل التطوير لديك بأتمتة عملية الاختبار. يساعد في الحفاظ على جودة الشيفرة، ويمنع وصول الأخطاء إلى الإنتاج، ويعزز ثقافة التكامل المستمر. باتباع هذا الدليل، لديك الآن خط أنابيب CI يشغّل اختباراتك تلقائيًا، ويوفر تغذية راجعة فورية للمساهمين، ويحافظ على سلامة قاعدة شيفرتك.

## موارد إضافية

- **توثيق Vitest**: [https://vitest.dev/](https://vitest.dev/)
- **توثيق GitHub Actions**: [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
- **تخزين الاعتماديات مؤقتًا**: [تخزين الاعتماديات مؤقتًا لتسريع سير العمل](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- **GitHub Actions لـ JavaScript وNode.js**: [الدليل الرسمي من GitHub](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
