---
title: "تشغيل OpenClaw على Railway مع Tailscale"
---

[Railway](https://railway.com/?referralCode=kinney) مكان مريح لتشغيل بوابة (Gateway) تعمل باستمرار: فأنت لا تدير خادمًا، وتحتفظ وحدات التخزين (volumes) بحالتك بين عمليات النشر. غير أن عملية نشر نمطية على Railway تمنح البوابة عنوان URL عامًا، وذلك نقيض ما نريده لشيء يستطيع قراءة ملفاتك واستخدام حساباتك.

يستخدم هذا الدرس قالب [`stevekinney/openclaw-railway-template`](https://github.com/stevekinney/openclaw-railway-template)، وهو نشر بالغ البساطة **بلا نطاق عام على الإطلاق**. وتعمل خدمتان على Railway جنبًا إلى جنب:

- **`openclaw`** تشغّل البوابة على شبكة Railway الخاصة.
- **`tailscale`** تنضم إلى شبكة tailnet لديك وتمرّر حركة المرور إلى البوابة.

```
 Mac app / browser / phone          (devices on your tailnet)
            │
            │  WireGuard (Tailscale)
            ▼
 ┌──────────────── Railway project (private network only) ────────────────┐
 │                                                                        │
 │  tailscale service ── raw TCP forward ──►  openclaw service            │
 │  joins your tailnet                        Gateway on :8080            │
 │  volume: node identity                     volume: /data (all state)   │
 │                                                                        │
 └────────────────────────────────────────────────────────────────────────┘
```

> **هذا إعداد مختلف عن الدرس السابق**
>
> في [الاتصال بـ OpenClaw بأمان عبر Tailscale](https://stevekinney.com/courses/openclaw/connecting-securely-with-tailscale)، تدير البوابة Tailscale بنفسها عبر `gateway.tailscale.mode: serve`. ويتطلب ذلك أن يعمل Tailscale على الجهاز نفسه الذي تعمل عليه البوابة. وهذا لا ينجح على Railway، لذا تحصل Tailscale على خدمة خاصة بها ويبقى تكامل OpenClaw المدمج معطّلًا. الأفكار واحدة، أما طريقة الربط فمختلفة.

## لماذا خدمة Tailscale منفصلة؟

ثمة أمور قليلة تجعل Railway مختلفًا عن خادم VPS:

- لا تستطيع حاويات Railway استخدام شبكات النواة (kernel networking) التي يحتاجها تثبيت Tailscale العادي، ولا يمكنك تشغيل عمليتين طويلتي الأمد في حاوية واحدة دون مشرف (supervisor).
- **موجّه الشبكة الفرعية (subnet router)** في Tailscale سيكشف كل خدمة في بيئة Railway لديك لشبكة tailnet.
- أسماء المضيفين الخاصة في Railway (مثل `openclaw.railway.internal`) لا تُحلّ إلا داخل Railway.

لذا تشغّل خدمة `tailscale` برنامج Tailscale في وضع **الشبكات في فضاء المستخدم (userspace networking)**، وتنضم إلى شبكة tailnet كجهاز قائم بذاته باسم `openclaw`، وتمرّر الاتصالات عبر شبكة Railway الخاصة إلى البوابة.

### لماذا TCP الخام لا وسيط HTTP؟

يستطيع Tailscale Serve التمرير بطريقتين. الطريقة البديهية هي وسيط عكسي (reverse proxy) لـ HTTP، لكنها تضيف ترويسات `X-Forwarded-*` و`Tailscale-User-*` إلى كل طلب. وترفض البوابة الطلبات التي تحمل تلك الترويسات إلا إذا جاءت من وسيط أُخبرت بالثقة به، كما أن عنوان IP الخاص بحاوية Tailscale يتغيّر مع كل عملية نشر. وستنتهي إلى الثقة بنطاق كامل من شبكة Railway، أو إلى الاصطدام بخطأ `Proxy client attribution is required`.

هذا القالب يمرّر **TCP الخام** بدلًا من ذلك. فالبايتات تمر كما هي دون تغيير، لذا ترى البوابة عميلًا عاديًا على الشبكة الخاصة بلا أي ادعاءات ممرَّرة، ولا شيء موثوق يمكن تزويره. ولا يزال TLS يُعالج في Tailscale على المنفذ 443، باستخدام شهادة شبكة tailnet الحقيقية.

## قبل أن تبدأ

ستحتاج إلى:

- حساب [Railway](https://railway.com/?referralCode=kinney) على خطة مدفوعة (فوحدات التخزين أكبر مما تسمح به الخطة المجانية)، وأداة [Railway CLI](https://docs.railway.com/cli): `brew install railway` ثم `railway login`.
- شبكة tailnet مفعَّلة فيها **MagicDNS** و**شهادات HTTPS (HTTPS Certificates)**، كما هو موصوف في الدرس السابق. دوّن اسم DNS لشبكة tailnet في وحدة تحكم الإدارة تحت **DNS**. وهو يبدو مثل `tail1234.ts.net`.
- مفتاح API لمزوّد نماذج. تستخدم الأمثلة Anthropic.

> **استخدم بيئة Railway جديدة**
>
> لا تستطيع البوابة الارتباط إلا بـ IPv4، وبيئات Railway التي أُنشئت قبل 2025-10-16 تُحلّ أسماء المضيفين الخاصة فيها إلى IPv6 فقط. وبيئة `production` في مشروع جديد سليمة. أما بيئة قديمة فسيفشل اتصالها.

## الخطوة 1: جهّز سياسة الوصول لشبكة tailnet

افعل ذلك قبل نشر أي شيء. في [وحدة تحكم الإدارة](https://login.tailscale.com/admin)، افتح **ضوابط الوصول (Access controls)** وأضف وسمًا (tag)، مع منح (grant) لا يسمح لأحد سواك بالوصول إلى البوابة. واستبدل `you@example.com` بتسجيل الدخول الخاص بك في Tailscale:

```json
{
  "tagOwners": {
    "tag:openclaw": ["autogroup:admin"],
  },
  "grants": [
    // Only the operator's devices may reach the Gateway, and only its two ports.
    { "src": ["you@example.com"], "dst": ["tag:openclaw"], "ip": ["tcp:443", "tcp:18789"] },
  ],
  "tests": [{ "src": "you@example.com", "accept": ["tag:openclaw:443", "tag:openclaw:18789"] }],
}
```

ادمج هذا في سياستك القائمة بدلًا من استبدالها. وإن كنت تفضّل عدم استخدام وسم، فراجع [تفضّل عدم الوسم؟](#prefer-not-to-tag) في الخطوة 2.

ثمة أمران يجب التحقق منهما:

- إذا كانت سياستك لا تزال تحوي قاعدة السماح الشاملة الافتراضية (`"src": ["*"], "dst": ["*:*"]`)، فإن **كل عضو في شبكة tailnet يستطيع الوصول إلى البوابة**. فضيِّقها.
- لا يحصل جهاز `openclaw` الجديد على أي منح خاص به، لذا حتى لو اختُرقت البوابة لما استطاعت فتح اتصالات بأي شيء آخر في شبكة tailnet.

## الخطوة 2: ولّد مفتاح مصادقة

تحتاج خدمة `tailscale` إلى مفتاح يُستخدم مرة واحدة كي تنضم إلى شبكة tailnet دون أن يسجّل أحد الدخول يدويًا. اذهب إلى **الإعدادات (Settings) → المفاتيح (Keys) → توليد مفتاح مصادقة (Generate auth key)**.

![مربّع الحوار Generate auth key في Tailscale وفيه مفاتيح تبديل الخيارات Reusable وEphemeral وTags.](/images/kinney/32fcd84b09c248cb.webp)

اضبطه على هذا النحو:

| الإعداد | القيمة | السبب |
| --- | --- | --- |
| Reusable (قابل لإعادة الاستخدام) | **معطّل** | يُستخدم المفتاح مرة واحدة. بعد ذلك تعيش هوية العقدة على وحدة تخزينها (volume). |
| Expiration (الانتهاء) | **يوم واحد** | لا يلزم أن يدوم إلا حتى أول عملية نشر. (القيمة الافتراضية في مربع الحوار 90 يومًا.) |
| Ephemeral (مؤقت) | **معطّل** | الجهاز المؤقت يختفي حين ينقطع اتصاله، بما في ذلك أثناء كل إعادة نشر. |
| Pre-approved (موافَق عليه مسبقًا) | **مفعّل** إن كان مطلوبًا | فعّله إذا كانت شبكة tailnet تتطلب الموافقة على الأجهزة، كي لا تبقى العقدة في انتظار. |
| Tags (الوسوم) | **مفعّل**: `tag:openclaw` | الأجهزة الموسومة لا تحصل إلا على الوصول الذي تمنحه سياستك، ومفاتيح عقدها لا تنتهي صلاحيتها. |

انسخ المفتاح حين يُعرض. فلن يعرضه Tailscale كاملًا مرة أخرى.

> **تحذير**
>
> عامل المفتاح كأنه كلمة مرور. فمن يملكه يستطيع إضافة جهاز إلى شبكة tailnet. لا تلصقه في محادثة ولا تُثبّته في المستودع، واستخدم انتهاء الصلاحية ليوم واحد كي يصبح المفتاح المسرَّب عديم القيمة سريعًا.

### تفضّل عدم الوسم؟

الوسم مستحسن، لكنه ليس مطلوبًا. وإن كنت تفضّل عدم تعديل `tagOwners` في سياستك، فاترك **Tags** معطّلًا في مربع الحوار وستنضم العقدة كجهاز عادي يملكه مستخدمك. وكل ما عدا ذلك في هذا الدرس يعمل. وثمة ثلاثة أشياء تتغير:

1. **عليك تعطيل انتهاء صلاحية المفتاح بنفسك.** فالعقد غير الموسومة تنتهي صلاحيتها بعد 180 يومًا افتراضيًا، وحينها تسقط البوابة من شبكة tailnet بصمت. بعد انضمام الجهاز، افتح `openclaw` في وحدة تحكم الإدارة واختر **تعطيل انتهاء صلاحية المفتاح (Disable key expiry)**. والعقد الموسومة تتجاوز هذه الخطوة.
2. **منح الخطوة 1 لن ينطبق.** فهو يستهدف `tag:openclaw`، وهو وسم لا تملكه عقدة غير موسومة. فتجاوز كتلة `tagOwners`، وحين يظهر الجهاز وجّه المنح إليه مباشرة: <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> "grants"</span><span style="color:#D6DEEB">: [</span></span>
<span class="line"><span style="color:#D6DEEB"> {</span></span>
<span class="line"><span style="color:#7FDBCA"> "src"</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">you@example.com</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#7FDBCA"> "dst"</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">&lt;openclaw-tailnet-ip&gt;</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#7FDBCA"> "ip"</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">tcp:443</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">, </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">tcp:18789</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">],</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB"> ],</span></span>
<span class="line"><span style="color:#7FDBCA"> "tests"</span><span style="color:#D6DEEB">: [{ </span><span style="color:#7FDBCA">"src"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">you@example.com</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">, </span><span style="color:#7FDBCA">"accept"</span><span style="color:#D6DEEB">: [</span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">&lt;openclaw-tailnet-ip&gt;:443</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">] }],</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code> وستجد عنوان IP في صفحة الجهاز في وحدة تحكم الإدارة.
3. **العقدة تحمل هويتك.** فالعقدة الموسومة لا تحصل إلا على الوصول الذي تمنحه سياستها، وهذه العقدة لم تُمنح شيئًا. أما العقدة غير الموسومة فهي *أنت* بقدر ما تعنيه السياسة، لذا يمكن لحاوية بوابة مخترقة أن تصل إلى كل ما يستطيع حسابك الوصول إليه. ولا تتناول وثائق القالب هذه الحالة، لذا عاملها كسلوك عام في Tailscale لا كشيء يضمنه القالب. وإن كانت سياستك لا تزال السماح الشامل الافتراضي، فذلك يعني كل شيء في شبكة tailnet، لذا ضيّقها في كل الأحوال.

بالنسبة إلى بوابة تستطيع تشغيل الأوامر، الوسم تأمين رخيص. أما على شبكة tailnet شخصية صغيرة بسياسة محكمة، فالاستغناء عنه مقايضة معقولة.

## الخطوة 3: انشر القالب

افتح [قالب بوابة OpenClaw الخاصة](https://railway.com/deploy/openclaw-private-gateway?referralCode=kinney) على Railway واملأ متغيرين:

| المتغير | القيمة |
| --- | --- |
| `OPENCLAW_PUBLIC_ORIGIN` | `https://openclaw.<your-tailnet>.ts.net` |
| `TS_AUTHKEY` | المفتاح من الخطوة 2 |

`OPENCLAW_PUBLIC_ORIGIN` هو العنوان الذي ستتصل به. وتستخدمه البوابة أيضًا قائمةً بأصول المتصفحات المسموح بها. أما رمز البوابة (`OPENCLAW_GATEWAY_TOKEN`) فيُولَّد لك.

انتظر حتى تصبح الخدمتان باللون الأخضر. يستغرق ذلك نحو أربع دقائق، لأن البناء الأول يسحب صورة كبيرة. وعند انتهائه يظهر جهاز باسم `openclaw` في صفحة **الأجهزة (Machines)** في شبكة tailnet.

إن كان لديك جهاز باسم `openclaw` بالفعل، فسيسمّي Tailscale الجديد `openclaw-1`. أزل القديم، أو اضبط `OPENCLAW_PUBLIC_ORIGIN` ليطابق الاسم الجديد.

> **تريد النشر من نسختك المتفرعة؟**
>
> يصف المستودع الخدمتين أيضًا بـ Railway Infrastructure as Code في `.railway/railway.ts`. استخدم ذلك إن كنت تنوي تغيير الشيفرة. ويشرح `DEPLOYMENT.md` في القالب ذلك خطوة بخطوة.

## الخطوة 4: تحقق من جهة شبكة tailnet

من جهاز على شبكة tailnet تسمح به سياستك:

```bash
tailscale ping openclaw
curl -fsS https://openclaw.<your-tailnet>.ts.net/healthz
```

ينبغي أن تحصل على رد من `tailscale ping`، وأن يطبع `curl` القيمة `{"ok":true,"status":"live"}`. وقد يستغرق أول طلب HTTPS بضع ثوانٍ بينما يصدر Tailscale الشهادة.

ثم شغّل الأمر `curl` نفسه من جهاز **لا** تسمح به سياستك. ينبغي أن تنتهي المهلة. فذلك هو عمل سياسة الوصول؛ فتحقق منها بعناية تماثل عنايتك بحالة النجاح.

وأخيرًا، افتح لوحة تحكم Railway وانظر إلى **الإعدادات (Settings) → الشبكات (Networking)** في كل خدمة. لا ينبغي أن يوجد أي نطاق ولا أي وسيط TCP في أي منهما.

## الخطوة 5: أكمل إعداد البوابة

في هذه المرحلة تعمل البوابة، لكن ليس لديها مزوّد نماذج بعد. اربط Railway CLI بالمشروع، وسجّل مفتاح SSH، وتأكد من قدرتك على الوصول إلى الحاوية:

```bash
railway link
railway ssh keys add --key ~/.ssh/id_ed25519.pub
railway ssh --service openclaw -- openclaw health
```

يطلب منك أول `railway ssh` الثقة بـ `ssh.railway.com`. ولا ينشر Railway بصمات مفاتيح المضيف (host-key fingerprints)، لذا لا يمكنك إلا قبولها في المرة الأولى.

أضف مفتاح مزوّد النماذج. انسخه إلى الحافظة، ثم:

```bash
pbpaste | tr -d '\n' | railway variable set ANTHROPIC_API_KEY --stdin --service openclaw
```

حين يصبح ذلك النشر أخضر، شغّل الإعداد الأولي غير التفاعلي داخل الحاوية:

```bash
railway ssh --service openclaw -- openclaw onboard --non-interactive --accept-risk --skip-health \
  --mode local --auth-choice apiKey --secret-input-mode ref \
  --gateway-auth token --gateway-token-ref-env OPENCLAW_GATEWAY_TOKEN \
  --gateway-bind lan --skip-channels --no-install-daemon
```

يغيّر الإعداد الأولي إعدادًا يحتاج إلى إعادة تشغيل. وRailway هو المشرف هنا، لذا تخرج البوابة بسلام ويعيد Railway تشغيلها في نحو 30 ثانية. ثم تحقق من أن الوكيل يجيب:

```bash
railway ssh --service openclaw -- openclaw agent --agent main --message "Reply with exactly: OK"
```

لمزوّد غير Anthropic، اضبط متغير مفتاحه بدلًا من ذلك وغيّر `--auth-choice`. ويسرد `openclaw onboard --help` الخيارات.

## الخطوة 6: صِل أجهزتك

كل شيء يستخدم عنوانًا واحدًا. استخدم العنوان الآمن `wss://`:

```
wss://openclaw.<your-tailnet>.ts.net
```

وثمة بديل نصي صريح (plaintext) على `ws://openclaw.<your-tailnet>.ts.net:18789`. لا تزال حركة المرور مشفّرة بـ WireGuard داخل شبكة tailnet، لكن فضّل `wss://` إلا إذا كانت شبكة tailnet لا تستطيع إصدار شهادات HTTPS.

### تطبيق macOS

1. في شريط القوائم، افتح **الاتصال… (Connection…)**.
2. تحت **OpenClaw runs**، اختر **بعيد (Remote — مضيف آخر)**.
3. اختر **عنوان البوابة أو رمز الإعداد (Gateway address or setup code)** وأدخل عنوان `wss://`.
4. أدخل رمز البوابة، الذي يمكنك قراءته من متغيرات خدمة `openclaw` في Railway.
5. اختر **حفظ الاتصال (Save connection)**، ثم **اختبار (Test)**.

يبلّغ الاختبار الأول عن لزوم الاقتران (pairing). وهذا متوقع.

### وافق على الجهاز

تُعدّ اتصالات شبكة tailnet اتصالات بعيدة، لذا لا يُوافق على شيء تلقائيًا. وافق على كل طلب معلّق من البوابة:

```bash
railway ssh --service openclaw -- openclaw devices list
railway ssh --service openclaw -- openclaw devices approve <requestId>
```

يرفع تطبيق Mac طلبين، أحدهما لدور المشغّل (operator) والآخر لدور العقدة (node). وافق على كليهما. ثم سيطلب إذنًا لكشف الأوامر على جهاز Mac، بما في ذلك تشغيل أوامر shell. اقرأ ذلك الطلب بعناية قبل الموافقة. ويشرح [درس العقدة المقترنة](https://stevekinney.com/courses/openclaw/connecting-a-remote-node) ما توافق عليه.

### المتصفحات والهواتف

- **متصفح:** افتح `https://openclaw.<your-tailnet>.ts.net/` على جهاز في شبكة tailnet وسجّل الدخول برمز البوابة. كل ملف تعريف في المتصفح يُعدّ جهازًا منفصلًا، لذا وافق عليه بالطريقة نفسها.
- **iOS وAndroid:** بعد وضع الهاتف على شبكة tailnet، شغّل `railway ssh --service openclaw -- openclaw qr` وامسح الرمز في تطبيق OpenClaw. أضف `--limited` لحجب الوصول الإداري عن الهاتف. ويحتوي الرمز على رمز قصير الأمد، فلا تنشره في أي مكان.

تُخزَّن سجلات الاقتران على وحدة تخزين البوابة، لذا تبقى بعد عمليات إعادة النشر.

## الخطوة 7: نظّف

- **أزل مفتاح المصادقة.** بعد انضمام الجهاز يمكنك حذف `TS_AUTHKEY` من خدمة `tailscale`. فالمفتاح المستخدم لمرة واحدة عديم الفائدة على أي حال.
- **تحقق من انتهاء صلاحية المفتاح.** إن وسمت المفتاح، فإن العقدة لا تنتهي صلاحيتها أبدًا. وإن لم تفعل، فعطّل انتهاء صلاحية المفتاح على جهاز `openclaw` في وحدة تحكم الإدارة، وإلا سقط الجهاز من شبكة tailnet بعد 180 يومًا.
- **فعّل النسخ الاحتياطي.** في كل خدمة، افتح **النسخ الاحتياطي (Backups)** وفعّل النسخ الاحتياطي اليومي. فوحدة تخزين `openclaw` تحوي رموز OAuth وسجلات الاقتران وسجل المحادثات.
- **التدقيق.** شغّل التدقيق الأمني وتأكد من أنه يعود نظيفًا: <code><span class="line"><span style="color:#82AAFF;font-style:italic">railway</span><span style="color:#ECC48D"> ssh</span><span style="color:#82AAFF"> --service</span><span style="color:#ECC48D"> openclaw</span><span style="color:#82AAFF"> --</span><span style="color:#ECC48D"> openclaw</span><span style="color:#ECC48D"> security</span><span style="color:#ECC48D"> audit</span></span></code>

ثم تابع بقية الدورة: [أضف قناة](https://stevekinney.com/courses/openclaw/adding-telegram-as-a-channel) و[اختر سياسة رسائل مباشرة](https://stevekinney.com/courses/openclaw/choosing-a-dm-policy)، وشدّد ما يُسمح للوكيل بتشغيله.

## كيف تعمل خدمة Tailscale

لا تحتاج إلى لمس أي من هذا لاستخدام القالب، لكنه يفسّر السلوك. فخدمة `tailscale` تُبنى من ملف Dockerfile صغير فوق صورة Tailscale الرسمية، إضافة إلى إعداد Serve مضمَّن في الصورة لأن Railway لا يستطيع تركيب ملفات داخل خدمة:

```json
{
  "TCP": {
    "443": {
      "TCPForward": "openclaw.railway.internal:8080",
      "TerminateTLS": "${TS_CERT_DOMAIN}"
    },
    "18789": {
      "TCPForward": "openclaw.railway.internal:8080"
    }
  }
}
```

ينتج عن ذلك الملف نتيجتان:

- **يجب أن تكون خدمة البوابة باسم `openclaw`.** فاسم مضيفها الخاص مكتوب مباشرة هنا.
- **المنفذ 443 ينهي TLS في Tailscale**، باستخدام شهادة شبكة tailnet. والمنفذ 18789 هو البديل النصي الصريح. وكلاهما يذهب إلى منفذ البوابة نفسه.

متغيرات البيئة المهمة:

| المتغير | ما يفعله |
| --- | --- |
| `TS_USERSPACE=true` | الشبكات في فضاء المستخدم، فلا حاجة إلى `/dev/net/tun` ولا إلى قدرات Linux إضافية. |
| `TS_STATE_DIR` | يخزّن هوية العقدة على وحدة تخزين الخدمة. |
| `TS_AUTH_ONCE=true` | يسجّل الدخول فقط حين لا يكون مسجّلًا بالفعل، فلا تستهلك إعادة التشغيل مفتاحًا آخر. |
| `TS_SERVE_CONFIG` | يشير إلى إعداد Serve أعلاه. |
| `TS_HOSTNAME` | اسم MagicDNS. القيمة الافتراضية `openclaw`. |
| `TS_ACCEPT_DNS` | متروك معطّلًا كي يستمر مُحلِّل Railway نفسه في العمل. و`openclaw.railway.internal` يعتمد عليه. |
| `TS_DEBUG_MTU=1236` | يصغّر حزم النفق لتناسب شبكة Railway. راجع جدول استكشاف الأخطاء. |
| `TS_AUTHKEY` | لتسجيل الدخول الأول فقط. |

ولأن هوية العقدة تعيش على وحدة تخزين، تحافظ عمليات إعادة النشر وإعادة التشغيل على الجهاز والعنوان والشهادة نفسها.

## من يعرف من أنت؟

حين تتصل من جهاز Mac وهاتفك ومتصفح، فمن الطبيعي أن تفترض أن شيئًا ما يعرف أنها كلها أنت. وثمة ثلاث طبقات مختلفة تعرف كل منها شيئًا مختلفًا، ويستحق الأمر إبقاءها واضحة.

| الطبقة | ما تعرفه | ما تقرره |
| --- | --- | --- |
| **Tailscale** | أي مستخدم يملك كل جهاز على شبكة tailnet | هل يستطيع الجهاز الوصول إلى البوابة أصلًا |
| **رمز البوابة** | لا شيء عنك. فهو سر مشترك | هل يجوز لعميل التحدث إلى البوابة |
| **اقتران الأجهزة** | المفتاح الخاص بجهاز واحد، الذي وافقت عليه يدويًا | ما يُسمح لذلك الجهاز بعينه بفعله |

**Tailscale** هي الطبقة الوحيدة التي تعرف أن أجهزتك تخص الشخص نفسه. فكل جهاز على شبكة tailnet له هوية مرتبطة بتسجيل دخولك، وسياسة وصولك (`"src": ["you@example.com"]`) تُفحص مقابلها. وهكذا يُعدّ جهاز Mac وهاتفك وحاسوبك المحمول كلها «أنت»، وهكذا يُردّ جهاز غريب قبل أن يمسّ البوابة أصلًا.

**البوابة لا تحصل على تلك المعلومات.** فخدمة `tailscale` تمرّر TCP الخام، وهو يمرّر البايتات دون إضافة أي ترويسات هوية، وتكامل Tailscale في OpenClaw معطّل. بل إن البوابة ترفض الطلبات التي تصل بترويسة `Tailscale-User-Login`، لأنها لا تملك وسيلة للتحقق منها. ومن وجهة نظرها، كل عميل هو عنوان IP الخاص لخدمة Tailscale. (ولهذا السبب نفسه تُقيَّد محاولات تسجيل الدخول الفاشلة معًا، ولهذا لا تستطيع سجلاتها التمييز بين أجهزتك.)

لذا تبني البوابة صورتها عنك من أمرين:

- **الرمز** سر مشترك. فكل عميل يقدّم الرمز نفسه. وهو يثبت أن العميل يعرف السر ولا شيء غير ذلك.
- **اقتران الأجهزة** يمنح كل عميل زوج مفاتيح خاصًا به. ويبقى الجهاز الجديد معلّقًا حتى توافق عليه، والاتصال الذي لا يحمل هوية جهاز مقترن لا يحصل على أي نطاقات صلاحية للمشغّل. والعميل الذي يملك الرمز وحده يستطيع استدعاء `health` لكنه لا يستطيع قراءة الإعدادات.

والنتيجة أن OpenClaw يرى تطبيق Mac وكل ملف تعريف في المتصفح وهاتفك **أجهزة منفصلة**. تُوافق عليها منفصلة وتُلغى منفصلة، ولا شيء يربطها إلا أنها كلها تعرف الرمز. ونافذة المتصفح الخاصة تنسى هوية جهازها، لذا تحتاج إلى موافقة في كل مرة.

ولهذا نتائج عملية قليلة:

- **الرمز هو الشيء الذي «هو أنت».** أبقِه محكمًا في Railway، وبدّله إن تسرّب.
- **ألغِ بحسب الجهاز.** لقطع هاتف مفقود دون المساس بأجهزتك الأخرى، ألغِ ذلك الجهاز وحده: <code><span class="line"><span style="color:#82AAFF;font-style:italic">railway</span><span style="color:#ECC48D"> ssh</span><span style="color:#82AAFF"> --service</span><span style="color:#ECC48D"> openclaw</span><span style="color:#82AAFF"> --</span><span style="color:#ECC48D"> openclaw</span><span style="color:#ECC48D"> devices</span><span style="color:#ECC48D"> list</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">railway</span><span style="color:#ECC48D"> ssh</span><span style="color:#82AAFF"> --service</span><span style="color:#ECC48D"> openclaw</span><span style="color:#82AAFF"> --</span><span style="color:#ECC48D"> openclaw</span><span style="color:#ECC48D"> devices</span><span style="color:#ECC48D"> revoke</span><span style="color:#82AAFF"> --device</span><span style="color:#7FDBCA"> <</span><span style="color:#ECC48D">i</span><span style="color:#D6DEEB">d</span><span style="color:#7FDBCA">></span><span style="color:#82AAFF"> --role</span><span style="color:#7FDBCA"> <</span><span style="color:#ECC48D">rol</span><span style="color:#D6DEEB">e</span><span style="color:#7FDBCA">></span></span></code>
- **لسؤال «أي جهاز فعل ذلك؟»، راجع سجلات Tailscale.** فسجلات البوابة لا تُظهر إلا عنوان IP المشترك.

إعداد [الدرس السابق](https://stevekinney.com/courses/openclaw/connecting-securely-with-tailscale) يعمل بشكل مختلف. فحين يعمل Tailscale على مضيف البوابة، يستطيع OpenClaw أن يسأل الخادم الخفي المحلي لـ Tailscale عن هوية المتصل ويستخدم ذلك لتسجيل الدخول إلى واجهة التحكم (Control UI). وRailway لا يستطيع فعل ذلك، وهي المقايضة التي تقبلها لإبقاء البوابة خارج الإنترنت العام هناك.

## مقايضات يجب معرفتها

- **الجميع يتشاركون عنوان IP واحدًا.** فالبوابة ترى كل عميل على شبكة tailnet كعنوان IP الخاص بخدمة Tailscale. ولن تُظهر سجلاتها أي جهاز اتصل (ستُظهره سجلات Tailscale)، وتقييد محاولات تسجيل الدخول الفاشلة مشترك. فعشر محاولات سيئة في دقيقة تقفل **كل** أجهزتك خمس دقائق.
- **من يملك وصولًا إلى Railway يملك صدفة جذر (root shell).** فأعضاء المشروع يستطيعون الدخول إلى الحاويات عبر `railway ssh`. ووحدة التخزين تحوي الرموز والسجل، فحدّد من يكون في المشروع.
- **لا تفعّل Funnel لهذه العقدة أبدًا.** فاختبارات القالب تفشل إن فعّل إعداد Serve خاصية Funnel أو تحوّل إلى وسيط HTTP.

## استكشاف الأخطاء وإصلاحها

ابدأ بالسجلات:

```bash
railway logs --service tailscale
railway logs --service openclaw
```

| العرَض | السبب المحتمل والإصلاح |
| --- | --- |
| `tailscale` غير سليمة ويقول السجل `To authenticate, visit:` | إنها غير مسجّلة الدخول. اضبط `TS_AUTHKEY`، أو افتح عنوان URL المطبوع في غضون خمس دقائق. فمن يستطيع قراءة السجلات في تلك النافذة يمكنه الاستيلاء على العقدة. |
| الجهاز اسمه `openclaw-1` | كان الاسم محجوزًا. أزل الجهاز القديم أو اضبط `TS_HOSTNAME`، وأبقِ `OPENCLAW_PUBLIC_ORIGIN` متطابقًا. |
| ينتهي `curl` إلى عنوان `wss://` بمهلة | سياستك لا تسمح بجهازك، أو العقدة غير متصلة. تحقق من المنح وشغّل `tailscale ping openclaw`. |
| يفشل HTTPS، لكن المنفذ `18789` يعمل | شهادات HTTPS غير مفعّلة لشبكة tailnet. فعّلها تحت **DNS**. |
| يقول السجل `failed to TCP proxy port … to openclaw.railway.internal:8080` | البوابة متوقفة، أو الخدمة ليست باسم `openclaw`، أو البيئة قديمة من نوع IPv6 فقط. |
| الاتصال يعمل لكنه بطيء (تستغرق المصافحة نحو ثانية) | تُفقد الحزم الأكبر من وحدة MTU في شبكة Railway. أبقِ `TS_DEBUG_MTU=1236` ولا تتجاوزه. |
| `pairing required` أو `disconnected (1008)` | جهاز جديد. شغّل `openclaw devices list`، ثم `devices approve`. |
| `Proxy client attribution is required` (403) | شيء ما يضيف ترويسات ممرَّرة، غالبًا لأن إعداد Serve غُيّر إلى وسيط HTTP. أعد تمرير TCP الخام. ولا تضف وكلاء موثوقين. |
| `401 Unauthorized` في كل مكان | الرمز خاطئ أو بُدّل، أو أن تقييد المعدل أقفل الجميع. انتظر خمس دقائق. |

### إن كانت Tailscale متوقفة

توفّر بوابة SSH في Railway بديلًا للطوارئ. ويحتاج إلى حساب Railway في المشروع ومفتاح SSH مسجّل. انسخ معرّف نسخة خدمة `openclaw` (اضغط ⌘K في لوحة التحكم واختر **نسخ معرّف نسخة الخدمة (Copy Service Instance ID)**)، ثم مرّر منفذ البوابة:

```bash
ssh -N -L 18789:127.0.0.1:8080 <service-instance-id>@ssh.railway.com
```

وجّه التطبيق إلى `ws://127.0.0.1:18789` مع رمز البوابة. فعبر النفق ترى البوابة عميلًا على الواجهة المحلية (loopback)، لذا يُوافق على الاقتران تلقائيًا. وذلك ليس وصولًا أكثر مما منحك النفق أصلًا، لأن من يستطيع فتحه يملك بالفعل صدفة جذر في الحاوية.

> **الإصدارات والتحديثات**
>
> يتبع هذا الدرس القالب كما هو في OpenClaw `2026.9.8` وTailscale `1.102.5`. والترقيات تغيير للصورة، لذا راجع مستودع القالب للحصول على التعليمات الحالية قبل التحديث.
