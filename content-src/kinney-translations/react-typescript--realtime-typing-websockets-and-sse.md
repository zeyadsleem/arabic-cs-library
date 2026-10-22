---
title: "التحويل في الزمن الحقيقي عبر WebSocket وSSE"
---

صمّم طبقة زمن حقيقي (real-time) تبقى آمنة الأنواع عبر إعادة الاتصال وتطوّر البروتوكول — تحقّق من صحة الرسائل عند الحافة (edge) وأبقِ حالة واجهة المستخدم متوقعة.

## مخططات الرسائل والنسخ

```typescript
import { z } from 'zod';

const MessageV1 = z.discriminatedUnion('type', [
  z.object({ type: z.literal('welcome'), session: z.string() }),
  z.object({ type: z.literal('update'), id: z.string(), value: z.number() }),
]);

type Message = z.infer<typeof MessageV1>;
```

## عميل WebSocket مع التحقق

```typescript
const ws = new WebSocket('wss://example.com');
ws.onmessage = (e) => {
  const data = JSON.parse(e.data);
  const msg = MessageV1.parse(data);
  // Route by msg.type with exhaustiveness
};
```

## SSE والتراجع التدريجي

- استخدم EventSource للتدفقات خفيفة الحِمل.
- أعِد الاتصال بتراجعٍ تدريجي أسّي (exponential backoff) مع تغيير عشوائي (jitter).
- اخزّن التحديثات مؤقتًا لانتقالات React.

## اشتراكات tRPC

استفد من دعم tRPC للاشتراكات لتبقى الأنواع متّصلة من الطرف إلى الطرف (end-to-end) أثناء دفع التحديثات عبر WS.

## خُطّاف `useWebSocket` برسائل مُنوَّعة النوع

```typescript
type OnMessage<M> = (msg: M) => void;

function useWebSocket<M extends object>(
  url: string,
  schema: z.ZodSchema<M>,
  onMessage: OnMessage<M>,
) {
  useEffect(() => {
    let stop = false;
    let retry = 0;
    let ws: WebSocket | null = null;

    const connect = () => {
      ws = new WebSocket(url);
      ws.onopen = () => (retry = 0);
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const parsed = schema.safeParse(data);
        if (parsed.success) onMessage(parsed.data);
      };
      ws.onclose = () => {
        if (stop) return;
        retry++;
        const delay = Math.min(30_000, 500 * 2 ** retry) + Math.random() * 250;
        setTimeout(connect, delay);
      };
    };
    connect();
    return () => {
      stop = true;
      ws?.close();
    };
  }, [url, schema, onMessage]);
}
```

## استراتيجية تطوّر المخطط

- أبقِ الصيغ القديمة في الاتحاد وعامِلها برفق؛ وقدّم الحقول الجديدة كاختيارية.
- أضف حقل `version` وتفرّع بحسب الإصدار عند التغييرات الكاسرة.

```typescript
const MessageV2 = z.discriminatedUnion('type', [
  ...MessageV1.options,
  z.object({ type: z.literal('goodbye'), reason: z.string().optional() }),
]);
```

## انتقالات React 19 للتحديثات المتدفقة

```typescript
function LiveView() {
  const [items, setItems] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  useWebSocket('wss://example', MessageV1, (msg) => {
    startTransition(() => {
      if (msg.type === 'update') setItems((prev) => [...prev, msg]);
    });
  });

  return <List pending={isPending} items={items} />;
}
```
