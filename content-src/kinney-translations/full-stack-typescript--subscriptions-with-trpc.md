---
title: "الاشتراكات (Subscriptions) في tRPC"
---

إذا كنت بحاجة إلى تحديثات فورية (مثل الدردشة أو الإشعارات)، فإن tRPC يدعم الاشتراكات (عبر SSE أو WebSockets). ستُعدّ رابطًا خاصًا على العميل وتُعرّف إجراءات `.subscription()` على الخادم. راجع توثيق tRPC للنهج الدقيق (بما أنّه قد يختلف بين SSE و WS). مثال مقتطف على الخادم:

```typescript
onNewUser: publicProcedure.subscription(() => {
  // Return a subscription that emits whenever a new user is created
});
```

ثم على العميل:

```typescript
client.user.onNewUser.subscribe(undefined, {
  next(data) {
    console.log('New user:', data);
  },
});
```