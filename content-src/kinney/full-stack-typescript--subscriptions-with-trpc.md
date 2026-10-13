---
title: "Subscriptions with tRPC"
lang: "en"
chapter: "full-stack-typescript"
slug: "subscriptions-with-trpc"
order: 35
source: "https://stevekinney.com/courses/full-stack-typescript/subscriptions-with-trpc"
---

If you need real-time updates (like for chat or notifications), tRPC supports subscriptions (via SSE or WebSockets). You’ll set up a special link on the client and define `.subscription()` procedures on the server. Check tRPC docs for the exact approach (since it can differ between SSE and WS). Example snippet on the server:

```typescript
onNewUser: publicProcedure.subscription(() => {
  // Return a subscription that emits whenever a new user is created
});
```

Then on the client:

```typescript
client.user.onNewUser.subscribe(undefined, {
  next(data) {
    console.log('New user:', data);
  },
});
```
