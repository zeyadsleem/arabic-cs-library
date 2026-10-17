---
title: "إعداد المتصفح واستخدامه"
---

كثير من الويب لا يمكن قراءته بجلب عنوان URL. تبني الصفحات نفسها بـ JavaScript، وتُخفي المحتوى خلف النقرات، وتضع الجزء المفيد خلف نموذج أو تسجيل دخول. يمنح **المتصفح** (browser) في OpenClaw وكيلك متصفحًا فعليًا لقيادته: يمكنه فتح الصفحات، وقراءة ما عليها، والنقر، والكتابة، وأخذ لقطات الشاشة، وحفظ PDF.

هذا يختلف عن البحث في الويب أو جلب عادي، ويحمل سلطة أكبر. يمكن للمتصفح إرسال النماذج (forms) واستخدام أي جلسات (sessions) يمتلكها. الإعداد في هذا الدرس يُبقي تلك السلطة محدودة.

## كيف يعمل

الوكيل لديه أداة واحدة اسمها `browser`، وتغطي حفنة من الإجراءات: التحقق من الحالة، والبدء والإيقاف، وإدراج وفتح الألسنة (tabs)، وأخذ اللقطات (snapshots) ولقطات الشاشة (screenshots)، والتنقل، والعمل على الصفحة.

فكرتان تجعلان كل شيء آخر أسهل للمتابعة.

**المتصفح المُدار (managed browser) منفصل عن متصفحك.** افتراضيًا يشغّل OpenClaw متصفح Chrome الخاص به مع دليل بيانات (data directory) خاص به، يتحكم فيه خدمة (service) kleine داخل البوابة (Gateway) تستمع فقط على loopback. له واجهة مُلوّنة برتقالي حتى تُميّزه عن متصفحك، ولا يلمس ملف تعريفك (profile) الشخصي. يبدأ دون تسجيلات دخول (logins)، وهذا هو المقصود.

**الوكيل يعمل من اللقطات (snapshots).** بدلًا من التخمين على البكسلات (pixels)، يطلب **لقطة**: عرضًا منظمًا للصفحة حيث يحصل كل عنصر تحكم على مرجع قصير مثل `e12`. للنقر على زر، يقول «انقر `e12`». إن تغيرت الصفحة واختفى عنصر التحكم، يفشل المرجع، والحل هو أخذ لقطة جديدة.

## اختر ملف تعريف (Profile)

**ملف تعريف (profile)** يقرر أي متصفح يتحدث إليه الوكيل، وبالتالي أي ملفات تعريف ارتباط (cookies) لديه. هناك ثلاث ملفات تعريف مدمجة.

| ملف التعريف | ما هو | استخدمه عندما |
| --- | --- | --- |
| `openclaw` | متصفح مُدار، معزول، دون تسجيلات دخول. الافتراضي. | تقريبًا دائمًا. صفحات عامة، اختبار، أي شيء دون تسجيل دخول. |
| `user` | يعلّق على Chrome الحقيقي، مسجّل الدخول. يسأل Chrome «Allow remote debugging?» أول مرة. | تحتاج جلسة مسجّلة دخول وأنت عند الحاسوب. |
| `chrome` | Chrome الحقيقي، مسجّل الدخول، عبر إضافة OpenClaw. دون مطالبة، ويعمل عندما تكون بعيدًا. | تحتاج جلسة مسجّلة دخول ولن يكون أحد على المكتب. |

استخدم `openclaw` ما لم تكن مهمة لا يمكن أن تعمل فعلًا دون تسجيل دخول. إرفاق متصفحك الحقيقي يمنح الوكيل ملفات تعريف الارتباط (cookies) الخاصة بك، وألسنتك المفتوحة، وكل حساب أنت مسجّل الدخول فيه، والنقر يمكن أن يرسل رسالة أو يشتري شيئًا.

تختار ملف تعريف على سطر الأوامر بـ `--browser-profile <name>`، أو يختار الوكيل واحدًا بمعامل `profile`. إن لم تضبط أي شيء، تحصل على `openclaw`.

## الخطوة 1: التأكد من توفر المتصفح

المتصفح إضافة (plugin) مُجمّعة، ومفعلة افتراضيًا. تحقق من جاهزيتها:

```bash
openclaw browser doctor
openclaw browser status
```

`doctor` يتحقق من الجاهزية. `doctor --deep` يذهب أبعد ويُجري فحص لقطة مباشر.

إذا كان شيء ناقصًا، فهناك ثلاثة مفاتيح للتحقق. المتصفح يحتاج إلى جميعها:

1. **الإضافة والإعداد.** يجب أن تكون إضافة المتصفح مفعلة، وأن يكون `browser.enabled` هو `true`. إذا لم يظهر تأثير تغيير، أعد تشغيل البوابة (Gateway).
2. **قائمة السماح للإضافات.** إذا قيدت الإضافات بـ `plugins.allow`، فـ `browser` يجب أن تكون في تلك القائمة: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#ECC48D"> plugins</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#ECC48D"> allow</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">telegram</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">, </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">browser</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> ثم شغّل `openclaw plugins enable browser`. إعادة تشغيل وحدها لا تُصلح استبعادًا من السياسة.
3. **سياسة الأدوات.** يجب أن يُسمح للوكيل باستخدام الأداة أيضًا. إذا لم يشمل ملف أدواتك الأداة، فأضفها: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#ECC48D"> tools</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#ECC48D"> profile</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">coding</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#ECC48D"> alsoAllow</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">browser</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> للسماح بها لوكيل واحد، استخدم `agents.entries.<id>.tools.alsoAllow` بدلًا من ذلك. السماح بها لـ [الوكلاء الفرعيين](https://stevekinney.com/courses/openclaw/subagents-and-orchestration) إعداد منفصل، ولا يكفي وحده.

> **بعض النشرات تعطّله**
>
> قالب [Railway](https://railway.com/?referralCode=kinney)، على سبيل المثال، يأتي مع تعطيل التحكم بالمتصفح وبدون Chromium في الصورة. هذا خيار أمني متعمد. إذا كنت على إعداد من هذا النوع، فإن تفعيل المتصفح قرار، لا افتراض.

## الخطوة 2: شغّله وتفقده

جرّب الحلقة كاملة بنفسك، يدويًا، قبل أن تمنحها لوكيل. إنها نفس مجموعة الإجراءات التي يستخدمها الوكيل:

```bash
openclaw browser start
openclaw browser open https://example.com
openclaw browser tabs
openclaw browser snapshot
```

يُفتح نافذة Chrome مُدارة، مُلوّنة برتقالي. `snapshot` يُطبع الصفحة كشجرة، مع مرجع بجوار كل عنصر تحكم. هذا ما يقرأه الوكيل.

بعض الخيارات التي تستحق المعرفة:

```bash
openclaw browser start --headless      # No visible window, for this request
openclaw browser snapshot --urls       # Include link destinations
openclaw browser screenshot            # A picture of the page
openclaw browser screenshot --labels   # The picture, with snapshot references drawn on it
openclaw browser screenshot --full-page
```

لقطة الشاشة المُوسومة هي أفضل طريقة لبناء حدس. تضع مراجع اللقطة على الصفحة نفسها، لذا يمكنك رؤية أي عنصر تحكم هو `e12` بالضبط.

## الخطوة 3: العمل على الصفحة

الآن استخدم المراجع. خذ لقطة، وابحث عن عنصر التحكم الذي تريده، واعمل عليه:

```bash
openclaw browser click e12
openclaw browser type e7 "hello"
openclaw browser press Enter
openclaw browser wait --text "Done"
```

إجراءات أخرى تتبع النمط نفسه: `hover`، `select`، `drag`، `fill`، `scrollintoview`، وما إلى ذلك. شغّل `openclaw browser --help` للحصول على القائمة كاملة على بنائك.

عادتان ستوفران عليك كثيرًا من الإحباط:

- **فضّل المراجع على الإحداثيات.** هناك أمر `click-coords`، لكن المراجع تتحمل تغيّرات التخطيط (layout) بطريقة لا تتحملها مواقع البكسلات.
- **أعد أخذ اللقطة عند فشل شيء.** إذا لم يُحدث نقر أي أثر أو توقّف مرجع عن العمل، فمن المحتمل أن الصفحة أُعيد تصييرها (re-rendered). خذ لقطة جديدة واستخدم المرجع جديد. لا تكرّر نفس الاستدعاء.

عندما تنتهي، أغلقه:

```bash
openclaw browser stop
```

## الخطوة 4: دع الوكيل يقود

كل ما فعلته يدويًا، يمكن للوكيل فعله في محادثة. لا تكتب أوامر. صف الهدف وضع القواعد الأساسية.

> استخدم المتصفح، افتح [https://news.ycombinator.com](https://news.ycombinator.com/)، اقرأ أفضل عشر قصص، وأعطني ملخصًا من سطر واحد لكل منها. استخدم المتصفح، لا البحث في الويب. أخبرني بما فعلت، وتوقّف إذا وصلت إلى صفحة تسجيل دخول.

في واجهة التحكم (Control UI)، يفتح المتصفح في لوحة جانبية بجوار المحادثة، مُوسومة بملف التعريف `openclaw`، لذا يمكنك مشاهدة الصفحة التي يعمل عليها الوكيل.

المحادثة في واجهة التحكم (Control UI) مع لوحة متصفح جانبية تُظهر example.com تحت ملف تعريف openclaw، بجوار ملخص الوكيل للصفحة

مطالبة متصفح جيدة تفعل عدة أشياء:

- **تُسمّي ملف التعريف** عندما يهم. «Using the `openclaw` profile» افتراض جيد أن تكون صريحًا بشأنه.
- **تقول استخدم المتصفح فعلًا** بدلًا من البحث أو التخمين.
- **تطلب سردًا (narration)،** لذا يمكنك رؤية الخطوات التي اتخذها، ولقطات شاشة لأي شيء مثير للاهتمام.
- **تقول متى تتوقف.** يجب أن تُنهي جدار تسجيل الدخول، أو نموذج الدفع، أو CAPTCHA المهمة، لا أن تصبح لغزًا للحل.
- **تفصل النظر عن العمل.** «Read» و«summarize» يختلفان كثيرًا عن «submit» و«buy».

للمطالبات جاهزة الاستخدام، بما في ذلك ملخص GitHub Trending وتمرير QA استكشافي كامل، انظر [OpenClaw Browser Prompts](https://stevekinney.com/courses/openclaw/openclaw-browser-prompts).

> **هناك مهارة مُجمّعة أيضًا**
>
> عند تفعيل إضافة المتصفح، تأتي معها مهارة `browser-automation`. لا يجب عليك فعل أي شيء لاستخدامها، لكن من المفيد معرفة وجودها عندما تتحقق من `openclaw skills list`.

## أنشئ ملفات تعريف خاصة بك

ملفات التعريف المدمجة تغطي معظم الاحتياجات، لكن يمكنك إنشاء المزيد. ملف تعريف مُسمّى يتيح لك الاحتفاظ بمجموعة منفصلة من ملفات تعريف الارتباط لغرض واحد، أو الإشارة إلى متصفح آخر.

```bash
openclaw browser create-profile --name work --color "#FF5A36"
openclaw browser profiles
```

بعض التنويعات:

```bash
# Attach to a signed-in Chrome through Chrome DevTools
openclaw browser create-profile --name chrome-live --driver existing-session

# Point at a remote browser over CDP
openclaw browser create-profile --name remote --cdp-url https://browser-host.example.com
```

احذف ملف تعريف لا تحتاجه بعد الآن بـ `openclaw browser delete-profile --name work`.

إنشاء ملف تعريف لا يجعله الافتراضي. يواصل الوكيل استخدام `openclaw` ما لم تُسمِّ ملف التعريف الجديد in the prompt or set `browser.defaultProfile`. اترك الافتراضي وحده ما لم يكن لديك سبب. إذا ضبطته على `user`، **every** browsing task starts in your real signed-in browser.

## إدخال تسجيل دخول إلى المتصفح

يبدأ ملف التعريف المُدار فارغًا، لذا مهمة خلف تسجيل دخول تصطدم بجدار. لديك خيارات، من الأكثر أمانًا إلى الأكثر risk.

1. **تجاوز تسجيل الدخول.** وجّه المهمة إلى صفحات عامة.
2. **سجّل الدخول يدويًا إلى حساب مؤقت** داخل المتصفح المُدار.
تمت ترجمة هذا القسم إلى العربية. انظر [cookie sync](https://stevekinney.com/courses/openclaw/syncing-cookies-to-a-remote-gateway).
4. **أرفق متصفحك الحقيقي** with the `user` or `chrome` profiles.

إذا جرّبت ملف تع rif `user`، إليك طريقة آمنة لاختباره. راقب `driver: existing-session`، `transport: chrome-mcp`، و`running: true` في الحالة:

```bash
openclaw browser --browser-profile user start
openclaw browser --browser-profile user status
openclaw browser --browser-profile user tabs
openclaw browser --browser-profile user snapshot --format ai
```

يُظهر Chrome مطالبة في المرة الأولى، يجب على شخص ما الموافقة عليها. الوظيفة المجدولة التي تطلب `user` ستتعثر عند المطالبة من دون خطأ حتى تعود إلى الحاسوب. ملف تع rif إضافة `chrome` هو الذي يعمل بينما تكون بعيدًا. لإعداده، ابدأ بـ `openclaw browser extension setup --action inspect`، ثم `--action install` و`--action verify`، وتحقق من `openclaw browser extension --help` للبقية.

## إعدادات تستحق المعرفة

نادرًا ما تحتاج إلى تغييرها، لكن من الجيد معرفة وجودها. اضبطها بـ `openclaw config set`:

| Key | Default | What it does |
| --- | --- | --- |
| `browser.enabled` | `true` | Turns browser control on or off. |
| `browser.defaultProfile` | `"openclaw"` | The profile used when none is named. Set to `"user"` only on purpose. |
| `browser.headless` | `false` (docs’ example) | Launch local managed browsers without a window. |
The Chromium-based browser to launch. Set it if auto-detection finds the wrong one.
| `browser.attachOnly` | `false` (docs’ example) | Never launch a browser. Attach only to one that’s already running. |
| `browser.evaluateEnabled` | `true` | When `false`, the agent can’t run arbitrary JavaScript on a page. |
| `browser.ssrfPolicy` | see below | Which addresses the browser is allowed to navigate to. |
| `browser.tabCleanup.enabled` | `true` | Periodically closes idle tabs. |

For example, to point at a specific Chrome:

```bash
openclaw config set browser.executablePath "/usr/bin/google-chrome"
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

## حواجز أمان

- **عامل محتوى الصفحة غير موثوق.** نص الصفحة وأخطاؤها محتوى خارجي. صفحة ويب يمكن أن تحتوي على تعليمات موجهة إلى وكيلك، والمتصفح يُسهّل على الوكيل التصرف بناءً عليها.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
- **المتصفح و shell مسارات منفصلة.** متصفح يمكنه الوصول إلى صفحة لا يمكن لل shell الوصول إليها، ويمكن ل shell إرسال بيانات خارجًا دون استخدام المتصفح أبدًا. راجع كل واحد على حدة.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
- **أبقِ البوابة (Gateway) خاصة.** التحكم بالمتصفح loopback-only، ومصادقته تمر عبر البوابة. لا تُعرِض خدمة التحكم للإنترنت.

## جرّبها

تمت ترجمة هذا القسم إلى العربية.
2. **صفحة عامة.** اطلب من وكيلك فتح صفحة أخبار، وقراءة أفضل القصص، وتلخيصها، باستخدام المتصفح لا البحث في الويب. تحقق من أنه أخبرك بما فعل.
3. **جدار تسجيل دخول.** اطلب منه فتح صفحة تتطلب تسجيل دخول والإبلاغ عما يراه. يجب أن يتوقف ويُخبرك. إذا حاول تسجيل الدخول، شدّد مطالبتتك.
4. **مرجع قديم.** خذ لقطة لصفحة تتغير، وأطلق التغيير، وجرب المرجع القديم. ثم خذ لقطة جديدة وانجح. هذا هو أكثر ما ستُنقّحه.
5. **تمت ترجمة هذا القسم إلى العربية.** انظر [browser prompts lesson](https://stevekinney.com/courses/openclaw/openclaw-browser-prompts).

## استكشاف الأخطاء وإصلاحها

Start with `openclaw browser doctor`. Then match the symptom:

| Symptom | What to check |
| --- | --- |
| “Browser disabled” | The plugin or `browser.enabled` is off. Check both, then restart the Gateway. |
تمت ترجمة هذا القسم إلى العربية.
| “Browser unavailable” | انظر إلى حالة العملية، وأي binary Chrome تم اختياره، ما إذا كان ملف التعريف مقفلاً، ونقطة نهاية CDP، قبل إلقاء اللوم على الصفحة. |
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
| “No tab” | You’re on the wrong profile, or the session was never attached. |
| “Click had no effect” | الصفحة re-rendered. خذ لقطة جديدة واستخدم المرجع الجديد.
| A screenshot times out | انتظر انتهاء الالتقاط. إذا ظل عالقًا، أغلق اللسان وأعد فتحه. |
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

> **ال versions and updates**
>
تمت ترجمة هذا القسم إلى العربية.
