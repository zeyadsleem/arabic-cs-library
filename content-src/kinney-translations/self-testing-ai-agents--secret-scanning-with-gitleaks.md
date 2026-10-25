---
title: "فحص الأسرار باستخدام Gitleaks"
---

درس قصير. درس مهم.

يطلب منك [مختبر الطبقة الساكنة](https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-the-static-layer-into-shelf) إنشاء ملف `sample-config.json` يحتوي مفتاح API مزيّفًا. هذا مقصود. إنه طُعم. الطعم موجود لأن الوكيل، إذا أُعطي نصف فرصة، سينسخ سرًّا «حقيقيًا كمثال» من ملف إلى ملف آخر على وشك أن يُودَع، وأريد أن نرى حلقة التغذية الراجعة تنطلق على طعم مزيّف قبل أن تنشر إلى مشروع حقيقي أبدًا.

هذا ليس افتراضًا نظريًا. لقد شاهدت بنفسي Claude Code وCursor وCodex وكلّها تُودِع بيانات اعتماد خلال السنة الماضية. في كل مرة، كان الإصلاح هو نفسه: ثبّت gitleaks، وهيِّئ الخطّاف، فيصبح تكرار الخطأ مستحيلًا. وفي كل مرة، كان سبب حدوثه أصلًا أن فحص الأسرار لم يكن مثبّتًا.

ثبّته الآن. قبل أن يُودِع الوكيل شيئًا تضطر فعليًا إلى تدويره.

## ما الذي يفعله Gitleaks

[Gitleaks](https://github.com/gitleaks/gitleaks) ملف تنفيذي واحد. يفحص الملفات (أو سجل git) بحثًا عن أنماط تطابق صيغ أسرار معروفة: مفاتيح AWS، ورموز GitHub، ورموز Slack، ومفاتيح Stripe، ومفاتيح OpenAI API، والمفاتيح الخاصة، ورموز JWT، والنصوص العامة التي «تبدو كسرّ». وعندما يجد واحدًا، يفشل بصوت عالٍ مع مسار الملف ورقم السطر ومعاينة محجوبة للنتيجة.

له وضعان عمليان في هذه الورشة:

- **فحص المستودع أو السجل كاملًا.** تعرض إصدارات Gitleaks الحالية هذا عبر أوامر مثل `gitleaks git ...`، وتعرض الدروس الأقدم غالبًا `gitleaks detect ...`. شغّل الفحص الكامل مرة عند التثبيت، ومرة أخرى في CI كشبكة أمان.
- **فحص المحتوى المرحّل (staged).** في نسخة الطبقة الساكنة المكتملة من Shelf، هذا سكربت مساعد داخل المستودع يأخذ لقطة من فهرس git نفسه ويشغّل `gitleaks dir` على ذلك الدليل المؤقت. سريع. استخدمه في خطّاف ما قبل الالتزام.

المزيج يلتقط كلا الحالتين: «الوكيل على وشك إيداع سرّ» و«سرّ تسلّل بالفعل عبر مسار آخر».

في Shelf، يجلس هذا الموضع داخل طبقة ساكنة أوسع. المختبر نفسه الذي يصل gitleaks يطلب منك أيضًا إنشاء أو توسيع `eslint.config.js` و`tsconfig.json` و`knip.json` و`lefthook.yml` و`.gitleaks.toml` و`scripts/run-gitleaks-staged.ts`، ثم تشغيل `npm run lint` و`npm run typecheck` و`npm run knip` و`npm run test` و`npm run pre-push` وحلقة `npm run lint -- --quiet` الخفيفة. فحص الأسرار طبقة واحدة في ذلك المكدّس، لا مهمة جانبية.

## تثبيت Gitleaks

Gitleaks ملف تنفيذي مكتوب بـ Go، لا حزمة npm. ثبّته بمدير حزم نظامك:

```bash
# macOS
brew install gitleaks

# Linux (various)
# See https://github.com/gitleaks/gitleaks#installing
```

هناك أيضًا صورة Docker و[إجراء GitHub](https://docs.github.com/en/actions). أفضّل الملف التنفيذي لأنه يعمل بسرعة محليًا. تحقق من أن gitleaks على `$PATH` لديك:

```bash
gitleaks version
```

## وصله بخطّاف ما قبل الالتزام

أضف أوامر `lint` و`format` و`secrets` إلى كتلة `pre-commit` في `lefthook.yml`:

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: '*.{ts,svelte,js,mjs,cjs}'
      run: npx eslint --fix --max-warnings=0 {staged_files}
      stage_fixed: true
    format:
      glob: '*.{ts,svelte,js,mjs,cjs,json,md,yml,yaml,css}'
      run: npx prettier --write {staged_files}
      stage_fixed: true
    secrets:
      run: npx tsx scripts/run-gitleaks-staged.ts
```

في Shelf، يُجسّد ذلك السكربت لقطة المحتوى المرحّل بالضبط في دليل مؤقت ويشغّل `gitleaks dir` عليه. هذا أكثر موثوقية من الاعتماد على أي أعلام ملفات مرحّلة يدعمها إصدار Gitleaks المثبّت لديك هذا الشهر. لاحظ الغياب المتعمّد لحقل `glob` في أمر `secrets` — فسكربت الغلاف يعيد تعداد الفهرس المرحّل بنفسه، ومنحه قائمة `{staged_files}` مُفلترة مسبقًا سيفلتر مرتين.

اختبره:

```bash
echo "AWS_SECRET_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE" > fake.env
git add fake.env
git commit -m "testing secret scanner"
```

ينبغي أن ترى تقرير gitleaks وإلغاءً للالتزام. نظّف:

```bash
git reset HEAD fake.env
rm fake.env
```

إذا لم ينطلق الخطّاف، فتحقق مرة أخرى من أن gitleaks مثبّت وأن أمر `secrets` موصول بشكل صحيح في `lefthook.yml`.

## تشغيله على السجل، مرة واحدة

إذا كنت تضيف Gitleaks إلى مشروع قائم، فشغّل فحصًا كاملًا على المستودع أو سجل git أولًا. هناك دائمًا نتائج تقريبًا.

```bash
# Current releases usually expose this as:
gitleaks git --redact

# Older tutorials may show:
gitleaks detect --redact
```

لكل نتيجة:

1. **هل كانت حقيقية؟** إذا كانت كذلك، فدوّر بيانات الاعتماد *فورًا*. هذه الخطوة الأولى، قبل أي شيء آخر. السرّ المُودَع مخترق، انتهى الأمر، حتى لو لم «يجده» أحد. دوّر المفتاح، ثم تعامل مع سجل git.
2. **امسح السجل.** استخدم `git filter-repo` أو `bfg` لإزالة السرّ من كل التزام سابق. هذا يعيد كتابة السجل، ما يعني أن على كل فرد في الفريق إعادة استنساخ المستودع. نسّق الأمر.
3. **وثّق الحادث.** لا اللوم. الحادث. «في هذا التاريخ، انكشفت بيانات الاعتماد هذه، ودوّرناها، ومسحناها من السجل، وهذا هو حكم gitleaks الذي كان سيلتقطها.» يصبح هذا بيانات التدريب على سبب وجود الخطّاف لديك.

إذا كانت النتيجة إيجابية كاذبة — عنصر نائب مثل `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` — فأضف مدخلًا في قائمة السماح للنمط المحدّد حتى يتوقف gitleaks عن الإشارة إليه. المزيد عن قائمة السماح أدناه.

## تهيئة `.gitleaks.toml`

في معظم الوقت لا تحتاج إلى ملف تهيئة — افتراضيات gitleaks جيدة. لكن حالتين تستحقان واحدًا.

**السماح بالإيجابيات الكاذبة.** في مختبر الطبقة الساكنة المكتمل، تنشئ ملف طُعم `sample-config.json` بمفتاح API مزيّف عمدًا حتى تثبت أن الفاحص يعمل على مدخل سيئ معروف. ثم، *بعد* أن ترى الفشل، تضيف `sample-config.json` إلى قائمة السماح كي لا يتعثر الفريق على الملف المتعمّد نفسه إلى الأبد. وإذا أردت السماح ببيانات اعتماد الورشة الأولية المزروعة أيضًا، فاستخدم `tests/data/` بدلًا من مسار fixture أقدم. التهيئة أدناه هي نسخة «ما بعد المختبر»:

```toml
# .gitleaks.toml
[extend]
# Use gitleaks' default rules as a base.
useDefault = true

[allowlist]
description = "Global allowlist"
paths = [
  '''sample-config\.json$''',
  '''tests/data/.*''',
]
```

تتخطى قائمة `paths` الملفات المطابقة. يُستثنى `sample-config.json` *بعد* أن يبرهن المختبر أن الطعم يُلتقط. و`tests/data/` قائمة سماح اختيارية لاحقة لأن المشروع الأولي يخزّن بيانات اعتماد ورشة مزيفة هناك لمختبرات زرع البيانات.

**إضافة قواعد مخصّصة.** إذا كانت مؤسستك تستخدم صيغة رمز خاصة لا تغطيها افتراضيات gitleaks، فيمكنك إضافة قاعدة:

```toml
[[rules]]
id = "shelf-internal-token"
description = "Shelf internal service token"
regex = '''shelf_tok_[a-zA-Z0-9]{40}'''
tags = ["token", "shelf"]
```

سيشير Gitleaks الآن إلى أي شيء يطابق ذلك النمط. مفيد لحالة «لدينا صيغة سرّ داخلية لا يعرفها أحد آخر».

## ملف `.gitleaksignore`

أحيانًا يشير Gitleaks إلى نتيجة محدّدة تريد الاحتفاظ بها حقًا. ربما مثال في التوثيق، أو ثابت حرفي يصادف أنه يطابق نمط سرّ. للإعفاءات الفردية، استخدم `.gitleaksignore`:

```
# .gitleaksignore
path/to/file.md:generic-api-key:42
```

المثال أعلاه بصيغة البصمة التي يطبعها Gitleaks في مخرجاته: `path/to/file:rule-id:line-number`. انسخ المعرّف الدقيق مباشرة من التقرير بدلًا من كتابة رقم سطر مجرّد يدويًا — فالبصمة هي كيف يربط Gitleaks مدخل التجاهل بنتيجة محدّدة. أدقّ بكثير من قائمة السماح بالمسار، التي تتخطى ملفات كاملة.

لا تدع `.gitleaksignore` يتحول إلى مكبّ نفايات. كل سطر وعدٌ قطعته على نفسك باستمرار تجاهل نتيجة، وكل وعد ينبغي مراجعته دوريًا. راجع الملف وفق جدول.

## CI كشبكة أمان

حتى مع خطّاف ما قبل التزام صلب كالصخر، شغّل gitleaks في CI أيضًا. يمكن تجاوز خطّاف ما قبل الالتزام (`--no-verify`)، ويمكن أن يفشل تثبيته (عضو فريق جديد لم يشغّل `bun install`)، ويمكن أن يُهيَّأ خطأً بطريقة تنجح محليًا ولا تنجح في CI. تشغيل CI هو الملتقط الشامل.

في GitHub Actions (سنعمّق الحديث عن CI في [CI كحلقة الملاذ الأخير](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort)):

```yaml
# .github/workflows/security.yml
- name: Scan for secrets
  uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    # Organization repos also require a free license key since v2.0.0:
    # GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}
```

الإجراء الرسمي هو المسار السهل. يشغّل Gitleaks على كل دفعة وكل طلب سحب، ويفشل البناء عند أي نتيجة، ويمنحك بوابة CI نظيفة حتى عندما يتجاوز أحدهم الخطّاف المحلي. يمكن للمستودعات الشخصية استخدام `GITHUB_TOKEN` وحده؛ أما المستودعات المملوكة لحساب مؤسسة فتحتاج إضافةً إلى ذلك `GITLEAKS_LICENSE` مضبوطًا على مفتاح ترخيص مجاني (يمكن الحصول عليه من موقع gitleaks).

> **ملاحظة**
>
> تحقق من متطلبات الترخيص والإعداد الحالية لـ `gitleaks/gitleaks-action@v2` قبل أن تعتمده معياريًا للمستودعات المؤسسية. إذا كان الإجراء الرسمي غير مناسب لخطتك، فاستدعِ سطر الأوامر مباشرة في خطوة shell بدلًا منه. الجزء المهم هو بوابة CI، لا الغلاف.

## قواعد الوكيل

```markdown
## Secrets

- Never commit a real API key, access token, password, or private key
  to this repository. Real secrets live in `.env.local` (gitignored)
  or in the deployment environment's secret manager.
- Sample configuration files (`sample-config.json`, `.env.example`)
  may contain placeholder values that look like credentials. Use
  obviously-fake values like `your_api_key_here`, not values that could
  be mistaken for real keys.
- Gitleaks runs in the pre-commit hook. If it flags your commit, do
  not bypass it. Remove the secret and replace it with a placeholder.
- If you believe a gitleaks finding is a false positive, add an
  allowlist entry in `.gitleaks.toml` with a comment explaining why.
  Do not add to `.gitleaksignore` without a comment.
```

قاعدة «القيم المزيّفة بوضوح» وُضعت تحديدًا لمنع حركة الوكيل المفضّلة: نسخ `AKIAIOSFODNN7EXAMPLE` من درس وإلصاقه في ملف تهيئة حقيقي، حيث يشير إليه gitleaks لأنه يبدو حقيقيًا. استخدم قيمًا مزيّفة بوضوح لا تطابق نمط أي صيغة سرّ معروفة. `placeholder_value` و`replace_me` و`your_key_here` — كلها مقبولة، وكلها ليست حقيقية بلا لبس.

## نسخة الثلاثين ثانية من هذا الدرس كله

1. ثبّت gitleaks.
2. أضف سكربت لقطة المحتوى المرحّل كأمر `secrets` في `lefthook.yml`.
3. شغّل فحص Gitleaks كاملًا مرة واحدة على سجلك القائم. دوّر أي شيء حقيقي يجده.
4. أضف إجراء gitleaks في GitHub إلى CI كشبكة أمان.
5. لا تتجاوز الخطّاف أبدًا. إذا قال gitleaks إنه وجد سرًّا، فقد وجد سرًّا.

هذا كل شيء. خمس خطوات، ومعظم صباح يوم ثلاثاء، وتختفي من حياتك مشكلة «الوكيل أودع مفتاح API».

## الشيء الوحيد الذي يجب تذكّره

فحص الأسرار من أرخص الأشياء وأعلاها قيمة في الطبقة الساكنة. يلتقط الخطّاف الأخطاء قبل أن تصبح علنية، ويلتقط تشغيل CI الأخطاء التي فاتت الخطّاف، وتتيح لك قائمة السماح إبعاد الإيجابيات الكاذبة عن الطريق. ثبّته بعد ظهر اليوم. اشكرني لاحقًا.

## قراءات إضافية

- [خطّافات Git باستخدام Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook)
- [مختبر: وصّل الطبقة الساكنة بـ Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-the-static-layer-into-shelf)
