---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/write-the-ci-workflow-from-scratch-solution"
---

هذا مختبر هجين آخر. ملفات سير العمل لا تأتي مع بادئة Shelf، لكن المهام ما زالت تقابل أوامر محلية حقيقية. الأجزاء المستضافة — رفع المخرجات، ومشغّلات cron، والفحوصات المطلوبة — تحتاج إلى مستودع GitHub بعيد مع تفعيل Actions. سأُبقي هذين الحقيقتين منفصلتين كي لا يدّعي الحل أن تحليل YAML محليًا هو الشيء نفسه تشغيل CI حقيقي.

## ما يجب إضافته

### `main.yml`: خط الأنابيب ثلاثي المهام

افتح `.github/workflows/main.yml`. يعمل سير العمل عند كل `push` و`pull_request` ويطلب فقط `contents: read`. جيد. أبقِه مملًا.

#### مهمة `static`

```yaml
static:
  name: Static layer
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
    - name: Lint
      run: npm run lint
    - name: Typecheck
      run: npm run typecheck
    - name: Dead code
      run: npm run knip
    - name: Install gitleaks
      run: |
        curl -sSL https://github.com/gitleaks/gitleaks/releases/download/v8.30.1/gitleaks_8.30.1_linux_x64.tar.gz \
          | tar -xz -C /tmp gitleaks
        sudo install /tmp/gitleaks /usr/local/bin/gitleaks
        gitleaks version
    - name: Secret scan
      run: gitleaks dir . --redact --config .gitleaks.toml
```

هذه هي النسخة الأكمل بعد طبقة التحقق الساكن. إن لم تكن قد بنيت `knip` أو gitleaks بعد، فاحذف هاتين الخطوتين في الجولة الأولى وأعدهما لاحقًا. المقصود ليس تقليد YAML نفسه تقليدًا أعمى. المقصود هو إغلاق البوابة أمام الإخفاقات الرخيصة قبل أن تنفق دقائق المتصفح.

هذه خطوات، لا مهام منفصلة، لأن كلفة التهيئة مشتركة. تقسيم lint وtypecheck وknip وgitleaks إلى أربع مهام يشتري لك مزيدًا من عمليات البدء الباردة، لا مزيدًا من البصيرة.

#### مهمة `unit`

```yaml
unit:
  name: Unit tests
  runs-on: ubuntu-latest
  needs: static
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
    - name: Run Vitest
      run: npm run test:unit
```

`needs: static` هو أول قرار حامل في الملف. إذا كان lint أو typecheck قد فشل بالفعل، فلا سبب لحرق منفّذ آخر لتشغيل اختبارات الوحدة على شيفرة معطوبة.

#### مهمة `end-to-end`

```yaml
end-to-end:
  name: End-to-end tests
  runs-on: ubuntu-latest
  needs: static
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
      run: npx playwright install --with-deps chromium
    - name: Create .env for preview server
      run: |
        cat > .env <<'EOF'
        DATABASE_URL=file:./ci.db
        OPEN_LIBRARY_BASE_URL=https://openlibrary.org
        EOF
    - name: Run Playwright
      run: npm run test
    - name: Generate failure dossier
      if: failure()
      run: npm run dossier
    - name: Upload Playwright report
      if: failure()
      uses: actions/upload-artifact@v7
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 7
    - name: Upload failure dossier
      if: failure()
      uses: actions/upload-artifact@v7
      with:
        name: failure-dossier
        path: playwright-report/dossier.md
        retention-days: 7
```

ثلاثة تفاصيل تهمّ هنا.

أولًا: `npm run test`، لا `npm run test:e2e`. سطح أوامر Playwright في بادئة Shelf الحالية هو `test`، ولا ينبغي للحل أن يخترع سكربتًا ثانيًا لمجرد أن نسخة أقدم من المستودع كانت تفعل ذلك.

ثانيًا: `DATABASE_URL=file:./ci.db`. لا تحتاج البادئة الحالية إلى `tmp/ci.db` ولا إلى مجلد `tmp/` مُنشأ مسبقًا لتشغيل خادم المعاينة. أبقِ بيئة CI صغيرة وحقيقية.

ثالثًا: رفع ملف الحصيلة مشروط ومنفصل. تقرير HTML كبير. وحصيلة markdown صغيرة. ينبغي أن يستطيع الوكيل التقاط الصغيرة أولًا ولا يسحب التقرير الكامل إلا إذا احتاج إلى الآثار.

إن لم تكن قد أكملت مختبر الحصيلة بعد، فاحذف خطوة الحصيلة ورفع مخرجها في الجولة الأولى. مخرج تقرير Playwright يشتري لك معظم قيمة التنقيح على أي حال.

### `nightly.yml` يعيش في الملحق

سير العمل الليلي ليس جزءًا من هذا المختبر. إنه يقع في مختبرات الملحق ([مختبر: إضافة تغطية عبر المتصفحات](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-cross-browser-coverage) و[مختبر: إضافة سير عمل تحقّق ليلي](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-a-nightly-verification-workflow)) إلى جانب الأوامر التي يشغّلها فعلًا. العنصر النائب المستقل أسوأ من عدم وجود ملف أصلًا — فهو يستدعي أسماء مهام منقولة تقليدًا وانحرافًا صامتًا في الجدولة. ابنِ `nightly.yml` عندما تبني الأشياء التي يحرسها.

## ما ما زلت بحاجة إلى تشغيله

محليًا، تحقّق من صحة YAML:

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/main.yml'))"
```

ثم شغّل الأوامر التي تقابلها المهام:

```bash
npm run lint
npm run typecheck
npm run knip
npm run test:unit
npm run test
```

إن كنت قد وصّلت الحصيلة بالفعل، فيمكنك التحقق السريع من الأمر أيضًا:

```bash
npm run dossier 2>/dev/null || echo "dossier only becomes interesting after a failure"
```

وإن كان gitleaks CLI مثبتًا محليًا:

```bash
gitleaks dir . --redact --config .gitleaks.toml
```

## المحلي مقابل المستضاف

**محليًا:** يمكنك إثبات أن ملفات سير العمل تُحلَّل وأن كل أمر مسمّى يتصرف كما تتوقع المهام.

**مستضافًا:** تشغيلات سير العمل الفعلية، وتنزيل المخرجات، والفحوصات المطلوبة، ومشغّل cron ما زالت تحتاج إلى مستودع GitHub مع تفعيل Actions. لا تدّعِ أن حلقة المخرجات تعمل حتى تنزّل مخرجًا فعلًا من تشغيل حقيقي.

## أنماط تستحق الاحتفاظ بها

- بوابة واحدة، ثم توزيع. `static` يحجب `unit` و`end-to-end`، وهذا يوفّر وقت المنفّذ ويحصل على عمليات بناء حمراء أسرع.
- استخدم سطح الأوامر الحقيقي للمستودع. إن كانت البادئة تقول `npm run test`، فسير العمل يقول `npm run test`.
- أبقِ بيئة CI صغيرة وصريحة. أضف فقط المتغيرات التي يقرأها التطبيق اليوم.
- ارفع الحصيلة منفصلة عندما تكون لديك. المخرجات الصغيرة تجعل تعافي الوكيل أسرع.
- الليلي موجود لإبقاء الفحوصات الواسعة أو البطيئة خارج حلقة طلبات السحب السريعة. ابنِ مهام الليل الحقيقية عندما تضيف مختبرات الملحق الأوامر التي تعتمد عليها.

## قراءات إضافية

- [مختبر: اكتب سير عمل CI من الصفر](https://stevekinney.com/courses/self-testing-ai-agents/lab-write-the-ci-workflow-from-scratch)
- [CI كحلقة الملاذ الأخير](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort)
