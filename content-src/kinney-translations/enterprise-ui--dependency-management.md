---
title: "إدارة الاعتماد في المستودعات الأحادية"
---

الاعتمادات هي حيث يتوقف المعمار عن كونه سبورة ويبدأ في أن يصبح مشكلة تشغيلية. ففي كتلة واحدة، يمكن لملف قفل واحد ومخرَج نشر واحد أن يخفيا كثيرًا من العادات السيئة. أما في مستودع متعدد الحزم أو أي منظومة واجهة أمامية موزّعة، فتتحوّل تلك العادات نفسها إلى انحراف الإصدارات، وأشجار اعتماد مكرّرة، واستيرادات شبحية من الرفع (hoisting)، وسيل من طلبات السحب للترقية لا يريد أحد مراجعتها.

ليس الحل «كن أكثر انضباطًا»، بل الحل هو جعل سياسة الاعتماد قابلة للتنفيذ في الأدوات وأتمتة الإصدار.

## مشكلة الاعتماد

يغطّي قسم [مديري حزم مساحة العمل](https://stevekinney.com/courses/enterprise-ui/workspace-package-managers) *أي* أداة تستخدم وكيف تتفاضل. أما هذا القسم فيغطّي مشكلات *إدارة* الاعتماد التي تظهر بصرف النظر عن الأداة التي اخترتها.

### انحراف الإصدارات

بلحظة أن تتحرّك حزم أو فرق مختلفة في الاعتمادات المشتركة باستقلالية، تكفّ «حزمتك المشتركة» عن كونها مشتركة. فالحزمة A على React 18.2، والحزمة B على 18.3، والقشرة على 18.3.1، ولا أحد متأكد أي إصدار ثانوي أدخل تغيير السلوك الذي كسر لوحة المعلومات الثلاثاء الماضي.

الجواب النظيف هو جعل إصدار واحد هو السياسة الافتراضية للاعتمادات المشتركة على نطاق واسع، وإجبار الانحرافات على أن تكون صريحة. ويمنحك [pnpm](https://pnpm.io/catalogs) أداتين أوليتين قويتين لذلك: **الكتالوجات (catalogs)**، التي تعرّف نطاقات إصدارات قابلة لإعادة الاستخدام مركزيًا في `pnpm-workspace.yaml`، و**التجاوزات (overrides)** على مستوى الجذر، التي تفرض إصدارًا واحدًا لاعتماد ما عبر مخطط الحلّ بأكمله.

### الاعتمادات الماسية

تعتمد الحزمة A على `lib@^1.0.0` عبر مسار، وتعتمد الحزمة B على `lib@^2.0.0` عبر مسار آخر، ويعتمد الجذر على كلتيهما A وB. وأحيانًا يستطيع مدير الحزم طيّ ذلك في نسخة واحدة. وتُظهر [وثائق npm للإزالة المكرّرة (dedupe)](https://docs.npmjs.com/cli/v8/commands/npm-dedupe) حالات يمكن فيها تقليص التكرارات المتداخلة إلى إصدار واحد متوافق. وأحيانًا لا يستطيع، فتحتفظ بنسخ متعددة.

```
graph TD
    Root["Root"]
    A["Package A"]
    B["Package B"]
    Lib1["lib@1.4.0"]
    Lib2["lib@2.1.0"]

    Root --> A
    Root --> B
    A --> Lib1
    B --> Lib2

    style Lib1 fill:#d4a373,color:#000
    style Lib2 fill:#d4a373,color:#000
```

النسخ المتعددة مقبولة عادةً لشيفرة الأدوات بلا حالة. لكنها أقل قبولًا بكثير لبيئات تشغيل الأطر، أو المكتبات ذات الحالة، أو أي شيء يكون فيه «نسخة واحدة» جزءًا من الافتراض التصميمي. فوجود نسختين من React في الصفحة نفسها ليس «مشكلة إدارة اعتماد»، بل حادثة إنتاج تنتظر أن يكتشفها عميل.

### الاعتمادات الشبحية

**الاعتماد الشبحي** حزمة تستوردها شيفرتك لكنها لا تعلنها في ملف `package.json` الخاص بها. وهو «يعمل» لأن حزمة أخرى في المستودع تسبّبت في رفعه إلى موضع يمكن الوصول إليه. ثم يغيّر أحدهم حزمة غير ذات صلة، فيتغيّر تخطيط الرفع، فينكسر الاستيراد في CI أو الإنتاج دون أي تغيير في شيفرة حزمتك.

ينشئ الرابط المعزول الافتراضي في pnpm تخطيطًا لا تستطيع فيه شيفرة التطبيق خارج `node_modules` الوصول إلى الاعتمادات غير المعلَنة. وتصف [وثائق الرفع في pnpm](https://pnpm.io/settings) هذا السلوك شبه الصارم: قد ترى الحزم داخل `node_modules` اعتمادات غير معلَنة بسبب الرفع داخل المخزن الافتراضي، لكن شيفرة تطبيقك تحصل على افتراضي أكثر صرامة من عمليات التثبيت المرفوعة مسطّحة.

وتلك الصرامة لا تصمد إلا إن لم تنقضها. فتعيين `shamefullyHoist` أو تهيئة `publicHoistPattern` على نطاق واسع يعيد إدخال مخاطر الاعتماد الشبحية نفسها التي صُمّم pnpm لمنعها. فالخيار موجود للتوافق مع الشيفرة القديمة، لا كنمط تشغيل دائم.

### إجهاد التحديث

السلوك الافتراضي لـ [Dependabot](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference) هو فتح طلب سحب منفصل لكل اعتماد قديم. ويتصرّف Renovate بالمثل ما لم تهيّئ التجميع. وذلك الافتراضي جيد للمستودعات الصغيرة وسيئ للمستودعات الكبيرة. والنتيجة كومة من طلبات السحب الصحيحة فرديًا وفريق يتعلّم ببطء تجاهلها كلها—وهو عكس الأثر المقصود تمامًا.

## فرض سياسة إصدار افتراضية

### الكتالوجات والتجاوزات

بالنسبة إلى مساحة عمل pnpm، أنظف تهيئة هي كتالوج جذري مع تجاوزات جذرية. فـ[الكتالوجات](https://pnpm.io/catalogs) تركّز نطاقات الإصدارات المسموح بها. وتعيين `catalogMode: strict` يجعل `pnpm add` يرفض الإصدارات خارج الكتالوج. وتفرض التجاوزات إصدارًا واحدًا على مخطط الاعتماد حيث تكون تلك السياسة منطقية.

```yaml
# pnpm-workspace.yaml
packages:
  - apps/*
  - packages/*

catalog:
  react: ^18.3.1
  react-dom: ^18.3.1
  typescript: ^5.8.0

catalogMode: strict

overrides:
  react: 'catalog:'
  react-dom: 'catalog:'
  typescript: 'catalog:'
```

*ملاحظة:* هذه هي الإصدارات المعتمدة. وتستخدمها كل حزمة في المستودع إلا إن كان لديها سبب وجيه جدًا.

يمكن استخدام بروتوكول `catalog:` في `dependencies` و`devDependencies` و`peerDependencies` و`overrides`، فتقود سياسة الإصدار المركزية نفسها الإعلانات المباشرة والفرض على مستوى المخطط معًا.

### الكتالوجات المُسمّاة للترحيلات المتدرّجة

إن احتجت فعلًا إلى ترحيل متدرّج—مثلًا الانتقال من React 18 إلى React 19 حزمةً حزمة—فـ[الكتالوجات المُسمّاة](https://pnpm.io/catalogs) هي مسار الاستثناء المعقول. كتالوج افتراضي واحد، وعدة كتالوجات مُسمّاة للترحيل الجاري:

```yaml
catalog:
  react: ^18.2.0
  react-dom: ^18.2.0

catalogs:
  react19:
    react: ^19.0.0
    react-dom: ^19.0.0
```

*ملاحظة:* الحزم التي رُحّلت تستخدم catalog:react19 بدلًا من الافتراضي.

وهذا يتيح لك جعل «إصدار واحد افتراضيًا» هو القاعدة دون التظاهر بأنه لن توجد استثناءات مضبوطة أبدًا.

### بروتوكول `workspace:`

بالنسبة إلى حزم مساحة العمل الداخلية، استخدم بروتوكول `workspace:` ليصبح حلّ الحزمة المحلية صريحًا لا انتهازيًا. وتحذّر [وثائق مساحات العمل في pnpm](https://pnpm.io/workspaces) من أن نطاقات semver العادية قد تُحلّ من السجلّ إذا لم يطابق الإصدار المحلي المتوقّع، ما يُدخل عدم يقين. أما مع `workspace:` فيفشل التثبيت بدلًا من استبدال حزمة من السجلّ بصمت.

```json
{
  "dependencies": {
    "@acme/design-system": "workspace:^",
    "@acme/api-client": "workspace:^"
  }
}
```

وعند النشر، يعيد pnpm كتابة مواصفات `workspace:` إلى نطاقات semver عادية، فيحصل المستهلكون خارج المستودع الأحادي على حزم عادية.

## اجعل الاعتمادات غير المعلَنة تفشل مبكرًا

أبسط سياسة اعتماد ما زالت أفضلها: يجب أن يسند كل استيراد مباشر إعلان اعتماد صريح. ويساعد نموذج مساحة العمل في pnpm افتراضيًا، إذ لا تحصل الحزم إلا على الوصول إلى الاعتمادات المعلَنة في ملف `package.json` الخاص بها، حتى مع وجود ملف قفل جذري مشترك و`node_modules` جذرية.

وينبغي أن تنطبق قاعدة «العقد الصريح» نفسها على الحزم الداخلية. وتوصي [وثائق حزم Node](https://nodejs.org/api/packages.html) بحقل `exports` للحزم الجديدة، وهي صريحة بشأن التغليف: بمجرد تعريف `exports`، تُغلَّف المسارات الفرعية غير المدرجة، وتفشل الاستيرادات إلى مسارات فرعية غير معلَنة بالخطأ `ERR_PACKAGE_PATH_NOT_EXPORTED`.

```json
{
  "name": "@acme/design-system",
  "version": "2.4.0",
  "exports": {
    ".": "./dist/index.js",
    "./tokens": "./dist/tokens.js",
    "./react": "./dist/react.js"
  }
}
```

*ملاحظة:* نقاط الدخول الثلاث هذه فقط هي العامة. وكل ما عداها مُغلَّف.

هذا بالضبط السلوك الذي تريده للحزم الداخلية المشتركة. لا استيرادات عميقة إلى ملفات خاصة. ولا واجهات برمجية عرَضية. ولا «عمل لأنه نفذ أحدهم إلى `dist/internal.js`» والآن لا تستطيع إعادة الهيكلة دون كسر ثلاثة فرق.

## أتمتة الترقيات دون الضجيج

### Dependabot

Dependabot هو نقطة البداية الواضحة لأتمتة GitHub الأصلية. وتصف [وثائق تهيئة GitHub](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configuring-dependabot-version-updates) كيف تمكّن تحديثات الإصدارات بملف `dependabot.yml`، وتتيح لك ميزة `groups` دمج ما قد يكون طلب سحب واحدًا لكل اعتماد في طلبات سحب موجَّهة أقل عددًا.

```yaml
# .github/dependabot.yml
version: 2

updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    groups:
      framework:
        applies-to: version-updates
        patterns:
          - 'react'
          - 'react-dom'
          - '@types/react*'
      tooling:
        applies-to: version-updates
        dependency-type: 'development'
        patterns:
          - 'eslint*'
          - '@typescript-eslint/*'
          - 'prettier'
```

*ملاحظة:* جمّع تحديثات أدوات التطوير معًا. فلا أحد يحتاج ستة طلبات سحب منفصلة لإضافات ESLint.

### Renovate

Renovate هو عادةً الخيار الأفضل عندما تريد مزيدًا من التحكّم. وتصف [وثائق تهيئته](https://docs.renovatebot.com/configuration-options/) كيف يتم التجميع عبر `groupName` على `packageRules`، وكيف يستطيع `automerge` دمج التحديثات الناجحة تلقائيًا. والقوة في تحديد نطاق كل ذلك حسب نوع الاعتماد ونوع التحديث:

```json
{
  "packageRules": [
    {
      "matchDepTypes": ["devDependencies"],
      "matchUpdateTypes": ["patch", "minor"],
      "groupName": "devDependencies (non-major)",
      "automerge": true
    },
    {
      "matchPackageNames": ["react", "react-dom"],
      "groupName": "react stack",
      "automerge": false
    }
  ]
}
```

*ملاحظة:* ترقيات الأطر الرئيسية لا تُدمج تلقائيًا أبدًا. يراجعها البشر.

وهذا يتيح لك فعل شيء عقلاني مثل «جمّع اعتمادات التطوير غير الرئيسية وادمجها تلقائيًا بعد نجاح CI» دون دمج الإصدارات الرئيسية تلقائيًا في الإنتاج لأن أحدهم كان متفائلًا.

### قاعدة التشغيل

دع الروبوتات تؤدي العمل الممل، لكن شكّل سيل طلبات السحب بحيث لا يضطر البشر إلى التفكير إلا عندما يكون التفكير مطلوبًا فعلًا. جمّع حسب النطاق. وادمج التحديثات منخفضة المخاطر تلقائيًا بعد نجاح الاختبارات. وأبقِ الترقيات الرئيسية أو الحساسة معماريًا مراجَعة بشريًا صراحةً. وتدعم [وثائق تحسين طلبات السحب في GitHub](https://docs.github.com/en/code-security/tutorials/secure-your-dependencies/optimizing-pr-creation-version-updates) وتهيئة Renovate معًا ذلك النمط.

## التنقيح وإدارة الإصدار

يغطّي قسم [التنقيح وإدارة الإصدار](https://stevekinney.com/courses/enterprise-ui/versioning-and-release-management) عقود semver، وتنقيح نظام تصميم قائم على الرموز (tokens)، وأساسيات Changesets بالتفصيل. أما هذا القسم فيركّز على آليات *أتمتة* الإصدار التي تجعل Changesets يعمل في CI.

### نموذج الـ changeset

يقسّم [Changesets](https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md) إدارة الإصدار إلى مرحلتين: التقاط النية وقت طلب السحب، وتنفيذ الإصدار لاحقًا. والـ changeset ملف Markdown صغير في `.changeset/` يسجّل أي الحزم تغيّرت، وأي نوع من رفع semver تحتاج، وملخّصًا مقروءًا للبشر:

```markdown
---
'@acme/design-system': minor
'@acme/button': patch
---

Add density tokens and expose the new compact button size.
```

وهذا يلتقط نية التنقيح بجوار مراجعة الشيفرة التي أدخلت التغيير، بدلًا من ترك اختيار الإصدار لمهندس إصدار بعد ثلاثة أسابيع يحاول إعادة بناء التاريخ من عناوين الإيداعات.

### المجموعات الثابتة

عندما يجب أن تتحرّك الحزم معًا، يدعم [Changesets المجموعات الثابتة](https://github.com/changesets/changesets/blob/main/docs/fixed-packages.md). فالحزم الثابتة تُنَسَّق وتُنشر معًا حتى إن لم يتغيّر بعض أعضائها:

```json
{
  "fixed": [["@acme/design-tokens", "@acme/design-system"]]
}
```

استخدم هذا للأزواج المقترنة ارتباطًا وثيقًا مثل الرموز (tokens) وحزمة نظام التصميم الأساسية، حيث يكون الإصدار الجزئي أكثر إرباكًا من كونه مفيدًا. ولا تطبّقه على كل شيء—فهذا يعيد اختراع الإصدار المتزامن بصياغة إضافية.

### أتمتة تدفّق الإصدار

تستخدم الأتمتة القياسية [إجراء GitHub الخاص بـ Changesets](https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md) لإنشاء طلب سحب «Version Packages» يبقى محدَّثًا مع تراكم الـ changesets، وينشر عند دمج ذلك الطلب:

```yaml
# .github/workflows/changesets.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v5

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - uses: changesets/action@v1
        with:
          version: pnpm changeset version
          publish: pnpm publish -r
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

*ملاحظة:* يُنشئ الإجراء طلب سحب لرفع الإصدارات. وعند دمجه، ينشر إلى npm.

استخدم `changeset status --since=main` كفحص CI مانع إن أردت أن تفشل عمليات الدمج عند غياب أي changeset. فهذا يفرض انضباط تسجيل النية وقت طلب السحب بدلًا من اكتشاف تغييرات غير منسّقة وقت الإصدار.

### الإصدارات الأولية واللقطات

يوفّر Changesets آليتين متمايزتين لاختبار الحزم غير المنشورة، وتخدمان غرضين مختلفين.

**نمط الإصدار الأولي** مخصّص لقناة إصدار أولي حقيقية في semver. وتصف [وثائق الإصدارات الأولية عند Changesets](https://github.com/changesets/changesets/blob/main/docs/prereleases.md) كيف يُدخل `changeset pre enter <tag>` نمط الإصدار الأولي، وكيف يضيف `changeset version` وسومًا مثل `-next.0`، وكيف يستخدم `changeset publish` الوسم كوسم توزيع npm. ولا تفي معظم نطاقات semver العادية بالإصدارات الأولية، لذا تحتاج الحزم التابعة غالبًا إلى رفعات لا تحتاجها في إصدار مستقر. وهذه هي الأداة الصحيحة لمسار تجريبي أو كناري فعلي.

```bash
pnpm changeset pre enter canary
pnpm changeset version
pnpm changeset publish --tag canary
```

**إصدارات اللقطات (snapshots)** مختلفة. وتصف [وثائق اللقطات عند Changesets](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md) اللقطات كبنيات اختبارية لا تحدّث الإصدارات الحقيقية، فتنتج إصدارات مثل `0.0.0-canary-DATETIMESTAMP`. وتشغّل `changeset version --snapshot <tag>` ثم `changeset publish --tag <tag>`.

```bash
pnpm changeset version --snapshot canary
pnpm changeset publish --tag canary
```

اللقطات أنسب عندما تريد بناءً قابلًا للتخلّص منه لاختبار التكامل—«ابنِ هذا الفرع ودع الناس يجرّبونه»—دون إدخال المستودع في تسلسل إصدار أولي مستمر.

الفصل مباشر: استخدم نمط الإصدار الأولي لقناة تجريبية فعلية تتصرّف كتيّار إصدار حقيقي. واستخدم اللقطات عندما تريد بناءً للاستعمال مرة واحدة دون إعادة كتابة تاريخ الحزمة.

## نموذج تشغيل عملي

```
graph TD
    subgraph "Version Policy"
        Cat["Catalog<br/>(blessed versions)"]
        Over["Overrides<br/>(graph-wide enforcement)"]
        WS["workspace: protocol<br/>(explicit local resolution)"]
    end

    subgraph "Upgrade Automation"
        Bot["Renovate / Dependabot<br/>(grouped PRs)"]
        CI["CI gate<br/>(tests + audit)"]
        Auto["Auto-merge<br/>(low-risk only)"]
    end

    subgraph "Release Mechanics"
        CS["Changesets<br/>(intent capture)"]
        Action["GitHub Action<br/>(version PR + publish)"]
        Snap["Snapshots<br/>(throwaway builds)"]
    end

    Cat --> Over
    Over --> WS
    Bot --> CI
    CI --> Auto
    CS --> Action
    Action --> Snap
```

أكثر تهيئة مستقرة مملّة بأفضل معنى. استخدم مدير حزم واحدًا للمستودع. واحتفظ بملف قفل مشترك واحد. واعمل كتالوجًا افتراضيًا للاعتمادات المشتركة. واستخدم التجاوزات الجذرية باعتدال لتثبيت الإصدارات على مستوى المخطط التي يجب توحيدها فعلًا. واستخدم `workspace:` للحزم الداخلية ليصبح الحلّ المحلي صريحًا. وأبقِ الرفع متحفّظًا لتبقى الاعتمادات غير المعلَنة مكسورة بدلًا من أن تعمل صدفةً.

ثم أزِل الضجيج بالأتمتة. وينبغي أن يفتح Dependabot أو Renovate طلبات سحب أقل وأفضل تشكيلًا—لا عاصفة اعتماد. وجمّع التحديثات حسب النطاق. وأبقِ تحديثات الأمان مُفعَّلة. ولا تدمج تلقائيًا إلا أصناف التحديثات التي ترتاح فعلًا لتفويضها إلى CI.

عامل الحزم المشتركة كمنتجات. وامنحها `exports` صريحة. ونَسّقها بـ semver. واطلب changeset عند تغيّرها. وانشر عبر الأتمتة. واستخدم الإصدارات الأولية أو اللقطات عندما تحتاج كناري. فهكذا تصبح إدارة الاعتماد قابلة للتنبؤ بدلًا من أن تكون مسرحية. والقابلية للتنبؤ، للأسف، هي ما يُبقي المستودع حيًّا مدة كافية ليواصل الجميع الجدال حول المعمار من الأصل.

---

## الخلاصة السريعة (TL;DR)

### كتالوجات pnpm

> مكان واحد لتعريف إصدارات الاعتماد للمستودع الأحادي بأكمله.

```yaml
# pnpm-workspace.yaml
catalog:
  react: ^18.3.0
  react-dom: ^18.3.0
  typescript: ^5.5.0
  vitest: ^2.0.0
```

```json
// packages/app-a/package.json
{
  "dependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  }
}
```

- حدّث React مرة → تحصل عليه كل حزمة.
- لا مزيد من انحراف الإصدارات عبر المستودع الأحادي.
- `pnpm.overrides` لفرض إصدارات الاعتمادات العابرة (transitive).
