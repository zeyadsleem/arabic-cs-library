---
title: "BroadcastChannel للتواصل عبر الحدود"
---

تفترض معظم إدارة حالة الواجهة الأمامية صفحة واحدة بسياق JavaScript واحد. فـ React Context وZustand وnanostores وRedux تعيش كلها في مساحة ذاكرة واحدة، وشجرة مكوّنات واحدة، وحزمة واحدة. وينكسر هذا الافتراض في ثلاث حالات شائعة على الأقل: عندما تفتح التطبيق نفسه في عدة علامات تبويب، وعندما تركّب تطبيقًا من iframes أو remotes في Module Federation، وعندما تحتاج إلى التنسيق بين الخيط الرئيسي وService Worker أو Shared Worker.

[`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) هو إجابة المتصفح المدمجة على الثلاثة جميعًا. فهو ناقل رسائل مُسمّى مُقيّد بالأصل (origin)، وأي سياق تصفّح—علامات التبويب، وiframes، وworkers، وremotes الاتحاد—يستطيع النشر إليه والاستماع عليه دون استيراد أي اعتماد.

## الواجهة البرمجية

الواجهة كلها تتّسع على بطاقة فهرس. فتنشئ قناة باسم، وتنشر رسائل مُهيكلة، وتستمع إليها، وتُغلق عند الانتهاء.

### إنشاء قناة

```typescript
const channel = new BroadcastChannel('auth');
```

هذا كل شيء. أي شيفرة أخرى تعمل على الأصل نفسه وتنشئ `new BroadcastChannel('auth')` تصبح الآن جزءًا من القناة نفسها. لا خطوة تسجيل، ولا مصافحة، ولا خادم. فالمتصفح يدير التوجيه داخليًا.

**مُقيَّدة بالأصل (Origin-scoped)** تعني أن القناة مرتبطة بمزيج البروتوكول والمضيف والمنفذ. فـ `https://example.com` و`http://example.com` أصلان مختلفان. و`localhost:3000` و`localhost:3001` أصلان مختلفان. ولا تستطيع شيفرة من أصل أن تستمع إلى قنوات أصل آخر أو تنشر إليها. وهذا التقييد حدّ أمني، لا خيار تهيئة.

### نشر الرسائل

```typescript
channel.postMessage({
  type: 'AUTH_UPDATE',
  payload: { user: { name: 'Grace Hopper' }, isAuthenticated: true },
});
```

يمكن أن تكون الوسيطة الممرّرة إلى `postMessage` أي قيمة تنجو من [خوارزمية الاستنساخ المُهيكل](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)—كائنات، ومصفوفات، و`Map`، و`Set`، و`Date`، و`ArrayBuffer`، و`Blob`، و`File`، و`RegExp`، وتراكيب متداخلة من كل ذلك، وأكثر. أما ما *لا* تستطيع استنساخه: الدوال، وعُقد DOM، و`Symbol`، و`WeakMap`، و`WeakSet`، وأي شيء له سلسلة نماذج لا تتعرّف عليها الخوارزمية. وإذا احتوت رسالتك على شيء غير قابل للاستنساخ، فالنشر يرمي `DataCloneError` بشكل متزامن.

وثمة تفصيل يفاجئ الناس: المُرسِل لا يستقبل رسائله هو. فنسخ `BroadcastChannel` الأخرى بالاسم نفسه—في سياقات أخرى—هي التي تتلقّى حدث `message`. وإذا كان لديك قناتان باسم `'auth'` في الصفحة نفسها، فالثانية تستقبل الرسائل التي تنشرها الأولى، والعكس صحيح. لكن نسخة القناة الواحدة لا تُرجع أبدًا منشوراتها إلى نفسها.

### الاستماع إلى الرسائل

```typescript
channel.addEventListener('message', (event) => {
  console.log(event.data); // whatever was passed to postMessage
});
```

الحدث `event` هو [`MessageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent). وتحتوي الخاصية `data` على الرسالة المستنسخة. وهناك أيضًا `event.origin`، وهو أصل سياق النشر (دائمًا أصلك أنت مع `BroadcastChannel`، لأن القنوات عبر الأصول غير موجودة)، و`event.source`، وهو `null` مع `BroadcastChannel` (بخلاف `window.postMessage`، الذي يمنحك مرجعًا إلى المُرسِل).

يمكنك أيضًا استخدام الخاصية `onmessage` بدلًا من `addEventListener`. السلوك نفسه، لكنها محدودة بمُعالِج واحد.

### معالجة الأخطاء

```typescript
channel.addEventListener('messageerror', (event) => {
  console.error('Failed to deserialize message:', event);
});
```

يُطلق حدث `messageerror` عندما يستقبل المتصفح رسالة لكنه لا يستطيع فكّ تسلسلها. وعمليًا هذا نادر مع `BroadcastChannel` لأن الطرفين على الأصل نفسه ويشغّلان عادة شيفرة متشابهة، لكنه قد يحدث إذا أرسل Service Worker أو Worker بيانات باستخدام نقل لا يستطيع المُستقبِل إعادة بنائه.

### إغلاق قناة

```typescript
channel.close();
```

بعد `close()`، تتوقف القناة عن استقبال الرسائل ولا تستطيع إرسالها. وهي غير قابلة لإعادة الاستخدام—فإن احتجتها مجددًا، أنشئ نسخة جديدة. وأغلق القنوات دائمًا في شيفرة التنظيف (القيمة المُعادة من `useEffect` في React، وتفكيك المكوّن، وإيقاف worker) لتجنّب تسريب المستمعين.

## ما ليس عليه `BroadcastChannel`

`BroadcastChannel` ليس مخزنًا دائمًا. فليس له ذاكرة. ولا توجد «قيمة حالية» تقرؤها عند الاشتراك—بل تستقبل فقط الرسائل المنشورة *بعد* أن تبدأ الاستماع. فإن أنشأت قناة ولم ينشر أحد شيئًا بعد، فلا تحصل على شيء. وإن نشر المُرسِل قبل خمس ثوانٍ وفتحت للتوّ علامة تبويب جديدة، فقد فاتك الأمر.

كما أنه ليس عبر الأصول. فبخلاف `window.postMessage`، الذي يستطيع استهداف نوافذ محددة عبر الأصول، `BroadcastChannel` مقفل على الأصل الحالي. ولا يمكنك استخدامه للتواصل بين `app.example.com` و`api.example.com`.

وليس مرتّبًا عبر السياقات بأي طريقة مضمونة. فالرسائل من مُرسِل واحد تصل بترتيبها عند مُستقبِل واحد، لكن إن نشر عدة مُرسِلين في الوقت نفسه، فقد يراها المُستقبِلون بترتيبات مختلفة. ولمعظم حالات الاستخدام—مزامنة المصادقة، وتغييرات السمة، والإشعارات—لا يهم هذا. أما أي شيء يحتاج ترتيبًا سببيًا، فستحتاج فيه إلى أرقام تسلسلية أو طوابع زمنية في حُمولة الرسالة.

## حالات استخدام تتجاوز الاتحاد

`BroadcastChannel` مفيد في أي مكان تحتاج فيه إلى تنسيق خفيف بنمط «أرسل وانسَ» عبر سياقات التصفح. وهذه هي الأنماط التي تتكرّر أكثر من غيرها.

### مزامنة الجلسة عبر علامات التبويب

أكثر استخدام شائع في الإنتاج. فعندما يسجّل المستخدم الدخول في علامة تبويب، ينبغي أن تعكس كل علامة أخرى ذلك فورًا. وعندما يسجّل الخروج، الأمر نفسه. وبدون `BroadcastChannel`، تكون علامات التبويب جزرًا معزولة—فعلى كل واحدة أن تستطلع الخادم أو تنتظر تحديث الصفحة لاكتشاف تغييرات الجلسة.

```typescript
// On login
const sessionChannel = new BroadcastChannel('session');
sessionChannel.postMessage({ type: 'LOGIN', user: currentUser });

// On logout
sessionChannel.postMessage({ type: 'LOGOUT' });
```

وتستمع كل علامة تبويب أخرى وتحدّث واجهتها وفقًا لذلك. فيرى المستخدم اتساقًا فوريًا عبر علامات التبويب دون أي رحلات ذهاب وإياب إلى الخادم.

ويعالج هذا أيضًا المشكلة المحرجة: «سجّل الخروج في علامة تبويب، ولا يزال يتفاعل في أخرى». فبث تسجيل الخروج المُوصَّل جيدًا يستطيع إعادة توجيه كل علامات التبويب إلى صفحة الدخول، ومسح الذاكرات المؤقتة المحلية، ومنع نداءات API بجلسة قديمة.

### نشر السمة والتفضيلات

إذا بدّل المستخدم الوضع الداكن في علامة تبويب، ينبغي أن تتبدّل كل علامة أخرى أيضًا. وكذلك اللغة، وحجم الخط، وتقليل الحركة، وأي تفضيل آخر للمستخدم يؤثر في الواجهة عمومًا.

```typescript
const prefsChannel = new BroadcastChannel('preferences');

// When user changes theme
prefsChannel.postMessage({ type: 'THEME_CHANGE', theme: 'dark' });
```

ستقرن هذا عادة بـ `localStorage` ليبقى التفضيل عبر الجلسات، وتستخدم `BroadcastChannel` فقط لإخطار علامات التبويب المفتوحة أصلًا بالتغيير. ولـ `localStorage` حدث `storage` خاص به يُطلق عبر علامات التبويب، لكنه يعمل فقط مع تعديلات `localStorage`—أما `BroadcastChannel` فيمنحك نمط مراسلة أعم.

### إبطال الذاكرة المؤقتة

عندما تجلب علامة تبويب بيانات جديدة وتكتبها في `IndexedDB` أو ذاكرة مؤقتة محلية، تصبح علامات التبويب الأخرى قديمة. ويمكن لـ `BroadcastChannel` أن يخطرها لإعادة الجلب أو القراءة من الذاكرة المحدّثة.

```typescript
const cacheChannel = new BroadcastChannel('cache-updates');

// After writing fresh data to IndexedDB
cacheChannel.postMessage({
  type: 'CACHE_INVALIDATED',
  keys: ['user-profile', 'notifications'],
});
```

هذا هو النمط نفسه الذي تستخدمه Service Workers داخليًا. فـ [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) ليس فيه إشعارات تغيير مدمجة، لذا يسدّ `BroadcastChannel` هذه الفجوة.

### التنسيق مع Service Worker

تستطيع Service Workers إنشاء نسخ `BroadcastChannel`، ما يعني أنها تستطيع إخطار العملاء بإشعارات الدفع، واكتمال المزامنة الخلفية، وتحديثات الذاكرة المؤقتة، أو الانتقالات من دون اتصال إلى متصل. والبديل هو `postMessage` عبر واجهة `ServiceWorkerRegistration`، وهو أكثر صراحة لكنه أيضًا أكثر إسهابًا ويتطلب إدارة قائمة العملاء.

```typescript
// In the Service Worker
const updateChannel = new BroadcastChannel('sw-updates');

self.addEventListener('push', (event) => {
  const data = event.data.json();
  updateChannel.postMessage({ type: 'PUSH_RECEIVED', notification: data });
});
```

```typescript
// In the main thread
const updateChannel = new BroadcastChannel('sw-updates');
updateChannel.addEventListener('message', (event) => {
  if (event.data.type === 'PUSH_RECEIVED') {
    showInAppNotification(event.data.notification);
  }
});
```

### البديل من Shared Worker

[Shared Workers](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker) قادرة على التواصل مع عدة علامات تبويب، لكنها تتطلب إدارة منافذ صريحة ودعم المتصفحات فيها أضعف من `BroadcastChannel`. وللتنسيق البسيط—«أخبِر كل علامات التبويب عن X»—يكون `BroadcastChannel` دائمًا تقريبًا الخيار الأبسط. أما Shared Workers فهي الأداة الأفضل عندما تحتاج إلى حساب دائم يعمل عبر علامات التبويب (مثل اتصال WebSocket مشترك)، لكن في المراسلة الصِرفة، يفوز `BroadcastChannel` بالبساطة.

### الميزات التعاونية

إذا كنت تبني تحريرًا تعاونيًا، أو مؤشرات حية، أو تحديدات مشتركة عبر عروض المستند نفسه المفتوح في عدة علامات تبويب، يمنحك `BroadcastChannel` نشرًا محليًا فوريًا قبل أي رحلة إلى الخادم. فالتعاون المدعوم بالخادم (WebSocket، SSE) يتولّى المزامنة بين المستخدمين، بينما يتولّى `BroadcastChannel` المزامنة بين علامات تبويب المستخدم نفسه.

## لماذا يهمّ هذا في Module Federation

والآن، لنعد إلى [تمرين التركيب وقت التشغيل](https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise). لقد حللنا المصادقة عبر الحدود بـ [nanostores](https://stevekinney.com/courses/enterprise-ui/nanostores) واعتمادات مشتركة أحادية (singleton). هذا ينجح، لكنه يعتمد على تفاوض الأحادية في Module Federation ليضمن أن يرى الطرفان كائن المخزن نفسه. ويجب إعلان ثلاث حزم—`@pulse/shared` و`nanostores` و`@nanostores/react`—كاعتمادات مشتركة أحادية. وإن غاب أي من هذه الإعلانات، يحصل المضيف والـ remote على نسخ ذرّات منفصلة ولا تتدفق الحالة بينهما أبدًا. ونمط الفشل صامت: لا أخطاء، فقط «غير مُصادَق عليه» إلى الأبد.

يتحاشى `BroadcastChannel` هذه المشكلة برمّتها. فهو لا يهمّه إن كانت الوحدات مشتركة أو مكرّرة. ولا يعتمد على تفاوض Module Federation وقت التشغيل. فبُنيتان مستقلتان تمامًا، بلا أي اعتماد مشترك بينهما، تستطيعان مع ذلك التواصل عبر قناة مُسمّاة ما دامتا على الأصل نفسه. وهذا نموذج ثقة مختلف جذريًا.

والمقايضة أن `BroadcastChannel` غير متزامن ومترابط بشكل مفكوك. فمع nanostores، يقرأ الـ remote القيمة الحالية بشكل متزامن عند أول تصيير عبر `authStore.get()`. أما مع `BroadcastChannel`، فعلى الـ remote انتظار رسالة—فثمة فجوة توقيت بين إرسال المضيف واستقبال الـ remote. وإن صيّر الـ remote قبل أن ينشر المضيف تحديث المصادقة، فسيعرض لفترة وجيزة «غير مُصادَق عليه» حتى تصل الرسالة.

## النمط عمليًا

يحتوي مستودع التمرين أصلًا على نقطة بداية في [`shared/src/auth.ts`](https://github.com/stevekinney/enterprise-ui-federation/blob/main/shared/src/auth.ts)، تُعرّف `AUTH_CHANNEL` وواجهة `AuthEvent`. وهكذا يعمل النمط كاملًا.

على جانب المضيف، تبثّ حالة المصادقة كلما تغيّرت:

```typescript
const authChannel = new BroadcastChannel('auth');

// After fetching user data
authChannel.postMessage({
  type: 'AUTH_UPDATE',
  payload: {
    user: data,
    isAuthenticated: true,
    token: 'mock-jwt-token-' + data.id,
  },
});
```

وعلى جانب الـ remote، تستمع إلى تلك الرسائل وتحدّث الحالة المحلية:

```typescript
const [auth, setAuth] = useState({ user: null, isAuthenticated: false, token: null });

useEffect(() => {
  const channel = new BroadcastChannel('auth');

  channel.addEventListener('message', (event) => {
    if (event.data.type === 'AUTH_UPDATE') {
      setAuth(event.data.payload);
    }
  });

  return () => channel.close();
}, []);
```

لاحظ أن الـ remote لا يستورد شيئًا من المضيف ولا من وحدة أحادية مشتركة. فالعقد هو فقط اسم القناة وشكل الرسالة. وهذا يجعل `BroadcastChannel` مفيدًا بشكل خاص عندما لا تستطيع ضمان مشاركة الأحادية—مثلًا عندما تُحمَّل remotes من أصول مختلفة أو عندما تركّب تطبيقات لم تُبنَ بـ Module Federation أصلًا.

## مشكلة الحالة الابتدائية

أكبر ثغرة في `BroadcastChannel` لهذه الحالة هو انعدام «قيمة حالية». فعندما يشترك الـ remote، لا يحصل على آخر ما نُشر—بل يستقبل الرسائل المستقبلية فقط. وإن كان المضيف قد نشر تحديث المصادقة قبل تشغيل `useEffect` في الـ remote، فقد فاته.

ومن الأنماط الشائعة لحلّ هذا مصافحة طلب/استجابة:

```typescript
// Remote: request current auth state on mount
const channel = new BroadcastChannel('auth');
channel.postMessage({ type: 'AUTH_REQUEST' });

// Host: respond to requests
channel.addEventListener('message', (event) => {
  if (event.data.type === 'AUTH_REQUEST') {
    channel.postMessage({ type: 'AUTH_UPDATE', payload: currentAuthState });
  }
});
```

هذا يضيف تعقيدًا، لكنه يجعل العقد صريحًا أيضًا. فتعرف بالضبط أي رسائل تتدفق، وفي أي اتجاه، ومتى.

وثمة نهج آخر هو قرن `BroadcastChannel` بـ `localStorage`. اكتب حالة المصادقة الحالية في `localStorage` عند كل تحديث، واقرأها عند التركيب كقيمة ابتدائية. واستخدم `BroadcastChannel` فقط لإشعارات التغيير في الوقت الحقيقي. وهذا يمنحك أفضل ما في العالمين: قراءة ابتدائية متزامنة وتحديثات تفاعلية عبر السياقات.

```typescript
useEffect(() => {
  // Read initial state from localStorage
  const stored = localStorage.getItem('auth');
  if (stored) setAuth(JSON.parse(stored));

  // Listen for live updates via BroadcastChannel
  const channel = new BroadcastChannel('auth');
  channel.addEventListener('message', (event) => {
    if (event.data.type === 'AUTH_UPDATE') {
      setAuth(event.data.payload);
    }
  });

  return () => channel.close();
}, []);
```

## `BroadcastChannel` مقابل Nanostores

كلاهما يحلّ مشكلة التواصل عبر الحدود، لكن بمقايضات مختلفة.

| البُعد | Nanostores | `BroadcastChannel` |
| --- | --- | --- |
| النطاق | صفحة واحدة (سياق JS واحد) | الأصل نفسه (عبر علامات التبويب، عبر iframes) |
| القيمة الابتدائية | متزامنة عبر `.get()` | لا شيء (يجب الطلب أو استخدام localStorage) |
| نموذج الاشتراك | تفاعلي (`.subscribe()`) | قائم على الأحداث (حدث `message`) |
| اعتماد مشترك مطلوب | نعم (سلسلة أحادية مطلوبة) | لا |
| التسلسل | لا شيء (الذاكرة نفسها) | استنساخ مُهيكل (لا دوال/DOM) |
| الدعم عبر علامات التبويب | لا | نعم |
| ارتباطات الأطر | React، Vue، Svelte، Angular | لا حاجة لأي منها (أصلي في المتصفح) |
| نمط الفشل | صامت إن انكسرت الأحادية | صامت إن لم يكن ثمة مستمع جاهز |

وعمليًا، تستخدم فرق كثيرة كليهما. Nanostores للتفاعلية داخل الصفحة، و`BroadcastChannel` للمزامنة عبر علامات التبويب. هذا ليس هندسة مفرطة. بل استخدام لكل أداة حيث تكون قوية فعلًا.

## متى تلجأ إلى `BroadcastChannel`

استخدم `BroadcastChannel` عندما تحتاج إلى تواصل عبر الحدود لا يعتمد على آلة الأحادية في Module Federation—أو عندما تحتاج إلى تواصل عبر علامات التبويب، وهو ما لا تستطيع nanostores منحك إياه إطلاقًا. وهو أيضًا الخيار الصحيح عندما قد لا تتشارك الأطراف المتواصلة نظام بناء. فإن كنت تركّب تطبيقًا من iframe، وremote متحد، وService Worker، فـ `BroadcastChannel` هو البدائية الوحيدة التي تعمل عبر الثلاثة جميعًا.

واستخدم nanostores (أو أي مخزن أحادي مشترك) عندما تريد وصولًا متزامنًا إلى الحالة، واشتراكات تفاعلية بلا فجوات توقيت، ونموذج برمجة أبسط. فقط تذكّر أن شرط الأحادية حامل للبنية—فإن انكسر، بدا كل شيء على ما يرام إلا الجزء الذي لا تتدفق فيه الحالة.

`BroadcastChannel` من تلك الواجهات التي وُجدت في المتصفحات سنوات، ولها دعم شامل، ومع ذلك لا تنال الاهتمام الذي تستحقه. فمعظم الفرق تلجأ إلى WebSocket أو الاستطلاع عندما تحتاج تنسيقًا عبر علامات التبويب، أو تتّكئ على حالة خاصة بإطار عندما تحتاج تواصلًا عبر الحدود. أما `BroadcastChannel` فهو الإجابة المملّة ذات الاعتماد الصفري التي تعمل بالفعل—وفي هندسة الواجهات الأمامية، الإجابات المملّة التي تعمل بالفعل هي التي يجب أن تبدأ بها.
