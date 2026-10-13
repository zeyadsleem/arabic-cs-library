---
title: "مُساعد البث"
book: hono
chapter: helpers
slug: streaming
order: 66
source: https://hono.dev/docs/helpers/streaming
lang: ar
---

يوفّر Streaming Helper طرقاً لبث الاستجابات (streaming).

## Import

```ts
import { Hono } from 'hono'
import { stream, streamText, streamSSE } from 'hono/streaming'
```

## `stream()`

يُعيد استجابة تدفّق بسيطة كـ `Response` كائن.

```ts
app.get('/stream', (c) => {
  return stream(c, async (stream) => {
    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log('Aborted!')
    })
    // Write a Uint8Array.
    await stream.write(new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]))
    // Pipe a readable stream.
    await stream.pipe(anotherReadableStream)
  })
})
```

## `streamText()`

يُرجع استجابة متدفقة (streaming) بـ `Content-Type: text/plain`, `Transfer-Encoding: chunked`، و `X-Content-Type-Options: nosniff` الترويسات.

```ts
app.get('/streamText', (c) => {
  return streamText(c, async (stream) => {
    // Write a text with a new line ('\n').
    await stream.writeln('Hello')
    // Wait 1 second.
    await stream.sleep(1000)
    // Write a text without a new line.
    await stream.write(`Hono!`)
  })
})
```


إذا كنت تطور تطبيقًا لـ Cloudflare Workers، فقد لا يعمل البث (streaming) جيدًا على Wrangler. إذا كان الأمر كذلك، أضف `Identity` لـ `Content-Encoding` الترويسة.

```ts
app.get('/streamText', (c) => {
  c.header('Content-Encoding', 'Identity')
  return streamText(c, async (stream) => {
    // ...
  })
})
```


## `streamSSE()`

يتيح لك بث أحداث الخادم المُرسَلة (Server-Sent Events - SSE) بسلاسة.

```ts
const app = new Hono()
let id = 0

app.get('/sse', async (c) => {
  return streamSSE(c, async (stream) => {
    while (!stream.aborted) {
      const message = `It is ${new Date().toISOString()}`
      await stream.writeSSE({
        data: message,
        event: 'time-update',
        id: String(id++),
      })
      await stream.sleep(1000)
    }
  })
})
```

## معالجة الأخطاء

الوسيطة الثالثة لمساعد البث (streaming helper) هي معالج الأخطاء (error handler).
هذه الوسيطة اختيارية؛ إذا لم تحددها، فسيتم إخراج الخطأ كخطأ في وحدة التحكم (console).

```ts
app.get('/stream', (c) => {
  return stream(
    c,
    async (stream) => {
      // Write a process to be executed when aborted.
      stream.onAbort(() => {
        console.log('Aborted!')
      })
      // Write a Uint8Array.
      await stream.write(
        new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f])
      )
      // Pipe a readable stream.
      await stream.pipe(anotherReadableStream)
    },
    (err, stream) => {
      stream.writeln('An error occurred!')
      console.error(err)
    }
  )
})
```

سيتم إغلاق التدفق (stream) تلقائيًا بعد تنفيذ دوال الاستدعاء (callbacks).


إذا ألقت دالة الاستدعاء (callback) الخاصة بمساعد البث (streaming helper) خطأً، فإن `onError` حدث Hono لن يُطلَق.

`onError` هو خطاف (hook) للتعامل مع الأخطاء قبل إرسال الاستجابة وإعادة كتابتها. ومع ذلك، عند تنفيذ دالة الاستدعاء، يكون الدفق قد بدأ بالفعل، لذا لا يمكن إعادة كتابته.
