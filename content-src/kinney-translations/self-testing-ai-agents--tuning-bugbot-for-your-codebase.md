---
title: "ضبط Bugbot على شيفرة مشروعك"
---

روبوت المراجعة الذي يعلّق على كل طلب دمج بنتائج منخفضة الجودة هو روبوت مراجعة يُكتَم. ونمط الفشل الثاني الأكثر شيوعًا (بعد «لا يجد شيئًا نافعًا») هو «يجد شيئًا في كل طلب دمج بصرف النظر عن وجود شيء يُوجَد». والفشلان يقتلان الحلقة، لأن الإشارة تكفّ عن كونها جديرة بالقراءة.

Bugbot — روبوت المراجعة في [Cursor](https://docs.cursor.com/en/bugbot) — يتيح لك تفادي الفشلين بإعدادات محدّدة قليلة. وهذا الدرس هو النسخة القصيرة من ما كنت سأسلمه لزميل في يومه الأول معه.

## تشغيله

يعمل Bugbot كتكامل مع GitHub. ثبّته من لوحة تحكّم Cursor، واربط مستودعك، فيبدأ مراجعة طلبات الدمج تلقائيًا عند فتحها وعند الدفع إليها. ووضع المراجعة الافتراضي هو «علّق على الفرق حيث يبدو شيء خطأً» — لا ملخّص، ولا تقييم، ولا منع، بل تعليقات مضمّنة فحسب.

هذا هو الوضع الذي أريده. فمراجعة على شكل ملخّص طقس. أما التعليق المضمّن فبند عمل.

## ملفّ التهيئة على مستوى المستودع

ألقِ `.cursor/BUGBOT.md` في جذر المستودع. هذا هو ملفّ تعليمات Bugbot — الفكرة نفسها التي في تعليمات وكيلك الأساسي، لكن للمراجع. ويخبر الملفّ الروبوت بما يهتم به المشروع وبما يتركه.

> **ملاحظة**
>
> حتى 9 أبريل 2026، تستخدم وثائق Cursor المسار `.cursor/BUGBOT.md`. وقد تعرض لقطات شاشة ومستودعات أقدم `.cursor/bugbot.md`. اتبع وثائق Cursor الحالية للحساب الذي تستخدمه فعلًا، لكن أبقِ اسم الملف متّسقًا في كل مكان في المستودع وفي ملاحظات دروسك.

يُودِع Shelf ملفّ `.cursor/BUGBOT.md` المضبوط في المستودع حتى قبل توصيل مراجعة Bugbot المستضافة. فالملفّ شأن تأليف؛ وتوجيه Bugbot إلى طلب دمج حقيقي في GitHub شأن نشر تعالجه منفصلًا.

```markdown
# Bugbot review rules for Shelf

## Context

Shelf is a reading-tracker built on [SvelteKit](https://kit.svelte.dev/) + TypeScript + [Drizzle](https://orm.drizzle.team/) + SQLite.
Tests run on [Vitest](https://vitest.dev/) (unit) and [Playwright](https://playwright.dev/) (end-to-end). [Better Auth](https://www.better-auth.com/) handles
authentication; authorization helpers live in `src/lib/server/authorization.ts`.

## What to flag

- API handlers under `src/routes/api/` that read user identity from the
  request body instead of the viewer. User identity comes from `locals.user`,
  never the request body.
- Admin-only route handlers that use plain `locals.user` checks or call
  something other than `requireAdministrator(locals.user)` from
  `$lib/server/authorization`. Any handler under `src/routes/api/admin/**` is
  admin-only.
- Drizzle queries that don't scope by the current user when operating on
  user-owned resources (shelf entries, ratings).
- Error handling that catches an error and returns 200. If we catch, we log
  and return an appropriate non-2xx status.
- Components that render user-generated content without escaping or
  sanitization.
- Playwright tests that use `page.waitForTimeout`, `page.locator` with raw
  CSS, or UI login. These patterns are banned by the agent rules.
- Changes to the dossier loop that remove `playwright-report/report.json`,
  retained traces, or the `npm run dossier` script.

## What to leave alone

- Generated Playwright artifacts under `playwright-report/`.
- Storage-state files under `playwright/.authentication/`.
- Snapshot PNGs in `tests/*-snapshots/`.
- HAR fixtures under `tests/fixtures/*.har`.
- Generated `build/` outputs.
- Lockfiles.

## Tone

Be direct. Name the line. Suggest a specific fix. Do not write
"consider," do not write "you may want to," do not summarize the PR.
If nothing is worth flagging, say nothing.
```

هذا الملفّ سيحمل معظم الثقل. وقسم «ما يجب تركه» هو الذي يمنع الروبوت من التعليق على بيانات البذر وملفّات التجهيزات التي *يُفترض* أن تكون هشّة. وقسم «النبرة» هو حيث تقتل المجاملات المنعكسة التي تجعل تعليقات روبوتات المراجعة تبدو كضجيج.

وفي Shelf، تبقى الحماية المحلية لمختبر الخلل المزروع مملّة عن قصد: `npm run typecheck` و`npm run lint` و`npm run test` كلها تبقى خضراء حتى مع وجود خلل الصلاحيات. ولهذا يهمّ الفرق المزروع. فحلقة المراجعة تلتقط فئة الخلل التي فوّتتها الاختبارات، سواء كُتب التحقّق السيئ كفرع يدوي `locals.user.isAdmin` أو كبديل «قريب بما يكفي» عن `requireAdministrator(locals.user)`.

## ما يشتريه لك قسم النبرة

أنا جادّ بشأن قواعد النبرة. فتعليق مراجعة يبدأ بـ«فكّر في إعادة هيكلة هذا إلى…» احتمال أن يُنتج إصلاحًا أقلّ بنحو 50% من التعليق نفسه مصاغًا كـ«هذا يثق بجسم الطلب؛ استخدم `locals.session.userId` بدلًا من ذلك». فالنسخة المباشرة لها فعل واضح. والنسخة المتحفّظة لها محادثة.

روبوت مراجعتك يكتب مطالبات لوكيل متابعة (أو لمطوّر بشري). وكلما زادت المطالبة إخباريةً، زاد احتمال أن تكون الخطوة التالية فعلًا لا نقاشًا. «فكّر في» نقاش. «استخدم X بدلًا من ذلك» فعل.

اطلب من Bugbot — عبر ملفّ تهيئته — أن يكتب كمهندس أول مستعجل. ثم راقب معدّل إصلاح المتابعة يرتفع.

## تحديد النطاق: لا تراجع كل شيء

يمكن توجيه Bugbot إلى مسارات محدّدة أو إخباره بتجاهل غيرها. استخدم هذا بشراسة.

أشياء أستبعدها دائمًا من المراجعة:

- التوثيق (`docs/`، `*.md`). فالتوثيق له سير عمل مراجعة خاص؛ وروبوت مراجعة شيفرة يعلّق على النحو ليس مفيدًا.
- الملفّات المولّدة تلقائيًا (الأنواع، وعملاء OpenAPI، وناتج توليد شيفرة GraphQL). فليس لدى الروبوت ما يقوله نافعًا عن شيفرة مولّدة.
- الترحيلات (`drizzle/migrations/` أو ما يشبهها). فالترحيلات تُراجَع مرة واحدة ولا تُراجَع بعدها؛ وتعليق Bugbot عليها بأثر رجعي مجرّد ضجيج.
- التجهيزات وبيانات البذر. فبيانات سيئة عن قصد تسكن هنا، وكل تعليق إيجابية كاذبة.
- ملفّات الأقفال (`bun.lockb`، `package-lock.json`). بديهي.

أشياء أضمّنها دائمًا:

- معالجات المسارات (`src/routes/**/+server.ts` و`+page.server.ts`). فهنا تسكن الأمان والصحّة.
- مساعدات قاعدة البيانات (`src/lib/server/*.ts`). فأخطاء الاستعلامات تسكن هنا.
- المكوّنات المشتركة (`src/lib/components/*.svelte`). فأخطاء مستوى التصيير تسكن هنا.
- مساعدات الاختبار (`tests/helpers/*.ts`). فهذه تضخّم الأخطاء عبر المجموعة؛ والأخطاء هنا مكلفة جدًا.

افتراضي الروبوت «راجع كل شيء». فتجاوزه.

## ما تفعله بالنتيجة

حين يترك Bugbot تعليقًا، يكون سير العمل مباشرًا:

1. **اقرأ النتيجة.** فليست كل نتيجة صحيحة. وكثير منها نقّ أو سوء فهم.
2. **إن كانت صحيحة**، سلّمها إلى الوكيل. «أشار Bugbot إلى هذا المعالج لأنه يثق بجسم الطلب. أصلحه.» فيقرأ الوكيل التعليق، ويجري التغيير، ويدفع. ويعيد Bugbot المراجعة عند الدفع.
3. **إن كانت خاطئة**، قل ذلك في طلب الدمج وعلّم الخيط محلولًا. وتعامل مع أي «تعلّم» من جانب الروبوت كتحسين مطلوب، لا كضمان. والإصلاح المتين هو تحديث `.cursor/BUGBOT.md` كي تقلّ احتمالية تكرار الإيجابية الكاذبة.
4. **إن لم تكن صحيحة بوضوح ولا خاطئة بوضوح**، فمل إلى إصلاحها. فنتائج روبوتات المراجعة تميل إلى كونها أعراضًا، وحتى حين يكون التشخيص بعيدًا، فإن معالجة العَرَض تُحسّن الشيفرة عادةً. (وهذا صحيح في المراجعين البشر أيضًا، بالمناسبة.)

## سلّم التصعيد (من الدرس السابق)

تذكّر قاعدة الثلاث من الدرس الماضي. حين يشير Bugbot إلى النوع نفسه من الأشياء مرارًا:

- مرة أو مرتين: أصلح طلب الدمج. وامضِ.
- ثلاث مرات: أضف قاعدة إلى تعليمات الوكيل كي يلتقطها وكيل الكتابة في المنبع.
- ما زال يحدث بعد القاعدة: أضف قاعدة lint أو تحقّق اختبار يجعل النمط السيئ فشلًا صارمًا.

روبوت المراجعة ليس نهاية الحلقة — إنه المراقب الذي يخبرك بما تؤتمته تاليًا. فكل نتيجة متّسقة من Bugbot معلومة عن أين يكون منعك في المنبع ضعيفًا.

## ما ليس Bugbot له

فحص صدق سريع.

- Bugbot ليس بديلًا عن اختباراتك. فإن كنت تعتمد عليه لالتقاط أخطاء المنطق، فستُخاب نحو 60% من الوقت.
- Bugbot ليس تدقيق أداء. فهو لا يشغّل شيفرتك. ولا يستطيع إخبارك أن حلقة ساخنة بطيئة.
- Bugbot ليس مفروضًا لدليل الأسلوب. استخدم ESLint وPrettier لذلك. فهما أرخص وأسرع وحتميان. ولا ينبغي أن يعلّق الروبوت على التنسيق.
- Bugbot ليس مراجعًا بشريًا. إنه جولة ثانية رخيصة سريعة. والمراجع البشري الحقيقي — زميلك — ما زال سيرى أشياء لا يراها Bugbot، وما زال ينبغي أن تجري مراجعات شيفرة حقيقية حين يهمّ الأمر.

تعامل مع الروبوت كالطبقة بين «انتهيت من كتابة الشيفرة» و«سيأتي بشري لينظر إلى هذا». فهو يلتقط الثمار الدانية كي تركّز المراجعة البشرية على الأشياء المثيرة للاهتمام.

## قواعد الوكيل

```markdown
## Review bot findings

- When Cursor Bugbot leaves a comment, read the finding and either (a)
  fix it and push a new commit, or (b) reply on the thread explaining
  why the finding is wrong, and mark the thread resolved.
- If Bugbot flags the same issue three times across three different
  PRs, add a rule to this file that prevents the pattern upstream.
- Do not argue with Bugbot in comments. If the finding is wrong,
  resolve the thread and update `.cursor/BUGBOT.md` to prevent
  the false positive.
```

## الشيء الوحيد الذي يجب تذكّره

روبوت المراجعة المضبوط متعاون. وروبوت المراجعة غير المضبوط ضجيج. والضبط يقيم في ملفّ واحد بقسمين — «ما يجب الإشارة إليه» و«ما يجب تركه» — إضافةً إلى توجيه نبرة. ثلاثون دقيقة من الضبط توفّر عليك أسابيع من الإشعارات المكتومة.

## قراءة إضافية

- [الرأي الثاني](https://stevekinney.com/courses/self-testing-ai-agents/the-second-opinion)
- [مختبر: Bugbot على خلل مزروع](https://stevekinney.com/courses/self-testing-ai-agents/lab-bugbot-on-a-planted-bug)
