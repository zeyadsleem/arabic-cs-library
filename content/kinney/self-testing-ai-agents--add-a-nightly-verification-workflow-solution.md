---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/add-a-nightly-verification-workflow-solution"
---

سير العمل الليلي هو حيث تعيش الفحوص البطيئة. وكل ما في هذا الملف استُبعد عمدًا من حلقة طلبات السحب لأنه أبطأ أو أوسع أو أكثر عرضة للانحراف من أن يعمل عند كل دفعة. وهذا لا يجعله اختياريًا. إنه يعني فقط أنه ينتمي إلى إيقاع مختلف.

## ما الذي تضيفه

### `.github/workflows/nightly.yml`

امشِ فيه من الأعلى.

**المُشغِّلات:**

```yaml
on:
  schedule:
    - cron: '17 4 * * *'
  workflow_dispatch:
```

مُشغِّلان. `schedule` يشغّل سير العمل كل يوم عند 04:17 بالتوقيت العالمي. و`workflow_dispatch` يتيح لك تشغيله يدويًا من تبويب Actions، وهي الطريقة العاقلة لاختبار سير العمل دون انتظار الغد.

والرقم `17` ليس سحريًا. إنه فقط ليس `0`. فـGitHub Actions يزدحم عند رأس الساعة لأن الجميع ينسخ `0 4 * * *` من تدوينة ثم يتساءل لماذا يجلس سير عمله في طابور. فحرّك التشغيل بضع دقائق بعيدًا عن الساعة تتحسّن الحياة.

**الأذونات:**

```yaml
permissions:
  contents: read
```

أقلّ صلاحية. فسير العمل الليلي يقرأ المستودع ويشغّل الفحوص. وهو لا يحتاج صلاحية كتابة إلى أن تضيف عمدًا شيئًا مثل فاتح مشكلات أو خطوة طلب سحب آلية.

### المهمة 1: عنصر نائب لتحديث HAR

```yaml
har-refresh:
  name: Refresh HAR fixtures
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v6
    - name: Placeholder
      run: |
        echo "Placeholder: re-record the HAR fixtures the network-isolation lab will add (e.g. tests/fixtures/*.har) against the real Open Library API"
        echo "  and open a pull request with the diff so a human can review upstream drift."
```

هذا عنصر نائب صادق. وهو لا يتظاهر بتحديث ملفات HAR. بل يخبرك، في واجهة GitHub، بما يجب أن تفعله النسخة الحقيقية حين يوصّلها أحد. وذلك أفضل من إخفاء النية في TODO بصيغة ماركداون لا يراه أحد.

والأتمتة الحقيقية ستعيد تسجيل ملفات HAR، وتُظهر فرقها، وتفتح طلب سحب قابلًا للمراجعة. و«قابلًا للمراجعة» مهمّ. فقبول انحراف واجهة API في المنبع بهدوء طريقة جيدة لإيداع غرابة لا تفهمها.

### المهمة 2: تدقيق الاعتماد

```yaml
dependency-audit:
  name: Dependency audit
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-node@v6
      with:
        node-version: '24'
    - name: Install dependencies
      run: npm ci --ignore-scripts
    - name: Run npm audit
      run: npm audit --audit-level=high || true
    - name: Placeholder
      run: |
        echo "Placeholder: open an issue or create tracked work for new high-severity findings."
```

`npm audit --audit-level=high` هو الفحص الحقيقي. وأما `|| true` فموجودة لأن هذه النسخة من سير العمل تُظهر النتائج، ولا توجّهها بعد إلى عمل متعقَّب. فمهمة تدقيق ليلية حمراء لا يفرزها أحد هي فنّ أدائي. وأما عنصر نائب أخضر يقول «وصّل المتابعة لاحقًا» فهو صادق على الأقل.

وحين تضيف فاتح مشكلات أو أي تسليم حقيقي آخر، فأزل `|| true` واجعل سير العمل يفعل الشيء الأعلى صوتًا.

### المهمة 3: دخان عبر المتصفحات

```yaml
cross-browser-smoke:
  name: Cross-browser smoke
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-node@v6
      with:
        node-version: '24'
    - name: Cache dependencies
      uses: actions/cache@v5
      with:
        path: |
          ~/.npm
          ~/.cache/ms-playwright
        key: ${{ runner.os }}-deps-${{ hashFiles('package-lock.json') }}-playwright-${{ hashFiles('playwright.config.ts') }}
    - name: Install dependencies
      run: npm ci --ignore-scripts
    - name: Install Playwright browsers
      run: npx playwright install --with-deps firefox webkit
    - name: Create .env for preview server
      run: |
        cat > .env <<'EOF'
        DATABASE_URL=file:./ci.db
        OPEN_LIBRARY_BASE_URL=https://openlibrary.org
        EOF
    - name: Run cross-browser smoke tests
      run: npm run test:cross-browser
    - name: Upload Playwright report
      if: failure()
      uses: actions/upload-artifact@v7
      with:
        name: cross-browser-smoke-report
        path: playwright-report/
        retention-days: 7
```

هذه أكمل مهمة في سير العمل لأن المختبر السابق لهذا واحد كان قد جعلك تبني الأمر الأساسي.

والتخزين المؤقت يغطّي حزم npm ومتصفّحات Playwright معًا. وخطوة تثبيت المتصفّحات صريحة لأن Playwright لا يتضمّن افتراضيًا إلا Chromium. وتمهيد `.env` صغير عن قصد: `DATABASE_URL=file:./ci.db` إضافةً إلى عنوان Open Library الأساسي الذي يتوقّعه التطبيق أصلًا. وأبقِ هذا التمهيد مركّزًا على ما تحتاجه حلقة الدخان العامة فعلًا — وقاوم الرغبة في تحميل أسرار مصادقة أو قواعد بيانات إضافية أو أصول لا يستخدمها البادئ الحالي.

ومرة أخرى، اسم الأثر يهمّ. فحين يفشل تشغيل ليلي، تريد أن تقوم أسماء المهام والآثار بعملية الفرز لك قبل أن تنقر أي شيء.

### كيف ترتبط المهام بالأوامر المحلية

يجب أن تقابل كل مهمة ليلية أمرًا محليًا حقيقيًا:

| المهمة الليلية | الأمر المحلي |
| --- | --- |
| `har-refresh` | عنصر نائب فقط في الوقت الحالي |
| `dependency-audit` | `npm audit --audit-level=high` |
| `cross-browser-smoke` | `npm run test:cross-browser` |

وهذا التطابق هو قاعدة التصميم. فإن كان فشل ليلي لا يمكن إعادة إنتاجه محليًا بالأمر نفسه الذي تستخدمه المهمة، فسير العمل يخفي منطقًا أكثر من اللازم.

## ما يبقى عليك تشغيله

تحقّق من أن YAML يُحلَّل:

```bash
yq eval '.jobs | keys' .github/workflows/nightly.yml
```

شغّل المكافئات المحلية للمهام الحقيقية:

```bash
npm audit --audit-level=high
npm run test:cross-browser
```

ثم افترض فشلًا واحدًا عمدًا. اكسر تحقّق دخان موسومًا، أو وجّه العنصر النائب لـHAR إلى اسم ملف بلا معنى حين تستبدل العنصر النائب بشيفرة حقيقية. ويجب أن يمنحك سير العمل اسم مهمة حمراء واضحًا وخطوة تالية ملموسة، لا شعورًا غامضًا بأن شيئًا في مكان ما غير سعيد.

## محلي مقابل مستضاف

**محليًا:** تستطيع التحقّق من YAML ومن كل أمر حقيقي الآن.

**مستضافًا:** لا يوجد مُشغِّل cron الفعلي، ولا الاحتفاظ بالآثار، ولا واجهة Actions، إلا حين يكون سير العمل على الفرع الافتراضي لمستودع GitHub مع تمكين Actions. استخدم `workflow_dispatch` أولًا. أما انتظار الجدولة فهو لمن عنده وقت فراغ كثير.

## أنماط تأخذها معك

- الجدولة خارج رأس الساعة تتجنّب ازدحام Actions. اختر دقيقة ليست `0`.
- المهام النائبة أفضل من نية غير مرئية. فإن لم تكن الأتمتة مبنية بعد، فقل ذلك في سير العمل نفسه.
- كل مهمة ليلية تُقابل أمرًا مسمّى واحدًا. فلا يجب أن يكون الليلي كيسًا من تفاصيل الشِل التي لا يستطيع مطوّر إعادة إنتاجها.
- الآثار تحتاج مدة احتفاظ محدودة. وسبعة أيام قيمة افتراضية جيدة لأدلة العمل الليلي.
- الفشل الليلي يحتاج مسار تسليم. فتشغيل cron أحمر لا يقرأه أحد ليس تغطية. إنه زينة.

## قراءات إضافية

- [مختبر: إضافة سير عمل تحقّق ليلي](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-a-nightly-verification-workflow)
- [حلقات التحقّق الليلية](https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops)
