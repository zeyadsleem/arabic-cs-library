---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/wrap-a-custom-verification-mcp-solution"
---

مقدّمة هذا المخبر كلها هي: ماذا لو استطاع وكيلك *أن ينظر إلى التطبيق العامل* بدلًا من قراءة مخرجات الاختبارات فقط؟ لا بمعنى «الرؤية بالذكاء الاصطناعي» الغامض، بل ملموسًا — أطلق متصفحًا، وانتقل إلى صفحة، وعُدّ العناصر، واجمع الأخطاء، وأعد JSON مهيكلًا. المشروع الأولي Shelf الحالي لا يشحن هذه المساعدة، لذا هذا الحل هو الشيفرة التي تضيفها أثناء المخبر.

## ما الذي تضيفه

ركّب الحزم الناقصة أولًا:

```bash
npm install -D @modelcontextprotocol/sdk zod
```

### `tools/shelf-verification-server/server.ts`

هذا خادم MCP قائم بذاته. يسجّل أداة واحدة، `verify_shelf_page`، تأخذ اسم مستخدم وتعيد تقريرًا مهيكلًا عن حالة صفحة رفّ ذلك المستخدم.

تهيئة الخادم بسيطة:

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { chromium } from 'playwright';
import { z } from 'zod';

const STORAGE_STATE_PATH = path.resolve('playwright/.authentication/user.json');
const baseUrl = process.env.SHELF_BASE_URL ?? 'http://127.0.0.1:4173';

const server = new McpServer({
  name: 'shelf-verification',
  version: '0.1.0',
});
```

`McpServer` من حزمة SDK تتولى تأطير JSON-RPC. أما `StdioServerTransport` فتعني أن الخادم يتواصل عبر stdin/stdout — عملية الوكيل تُطلقه كطفل وتُمرّر الرسائل ذهابًا وإيابًا. لا HTTP، ولا منافذ، ولا صداع CORS.

تسجيل الأداة هو حيث يحدث العمل الحقيقي:

```typescript
server.registerTool(
  'verify_shelf_page',
  {
    description:
      'Open the Shelf app and verify the public /shelf/[username] route renders correctly.',
    inputSchema: {
      username: z.string().min(1).describe('The reader handle, e.g. "alice" for alice@example.com'),
    },
    outputSchema: {
      ok: z.boolean(),
      bookCount: z.number().int().nonnegative(),
      consoleErrors: z.array(z.string()),
      url: z.string(),
    },
  },
  async ({ username }) => {
    // ...
  },
);
```

يستخدم كلٌّ من `inputSchema` و`outputSchema` مكتبة Zod. وتُسلسلها SDK إلى JSON Schema لقائمة أدوات الوكيل، فيعرف الوكيل بالضبط ما سيعود إليه قبل أن يستدعي الأداة. هذا هو العقد المهيكل الذي يجعل أدوات MCP قابلة للتركيب — لا يضطر الوكيل إلى تحليل نثر من وصف أداة ليفهم شكل الاستجابة.

داخل المعالج، تُطلق الأداة Chromium، وتنتقل، وتجمع البيانات:

```typescript
const targetUrl = `${baseUrl}/shelf/${encodeURIComponent(username)}`;
const browser = await chromium.launch();
try {
  const contextOptions = fs.existsSync(STORAGE_STATE_PATH)
    ? { storageState: STORAGE_STATE_PATH }
    : {};
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await page.goto(targetUrl);
  await page.getByRole('heading', { level: 1 }).waitFor();

  const bookCount = await page.getByRole('article').count();

  const result: VerifyShelfPageResult = {
    ok: consoleErrors.length === 0 && bookCount >= 0,
    bookCount,
    consoleErrors,
    url: targetUrl,
  };

  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    structuredContent: result,
  };
} finally {
  await browser.close();
}
```

بضعة أمور تستحق الملاحظة:

- **إعادة استخدام حالة التخزين.** إن وُجد ملف حالة مصادقة Playwright (من تشغيل اختبارات سابق)، تعيد الأداة استخدامه. مسار `/shelf/[username]` عام، لذا هذا ليس ضروريًا تمامًا — لكنه يُبقي جلسة الأداة متسقة مع بقية أدوات الورشة.
- **جمع أخطاء الطرفية.** مستمع `page.on('console')` يلتقط كل استدعاء `console.error` من التطبيق العامل. هذا هو فحص «هل انفجر شيء لم تُظهره الصفحة بصريًا؟». وتُبلغ الأداة بـ `ok: false` عند وجود أخطاء طرفية، حتى لو صُيّرت الصفحة صحيحًا.
- **`finally` يغلق المتصفح.** هذا هو منع العمليات الزومبي. إن رمى الانتقال استثناءً، أو انتهت مهلة الصفحة، أو فشل العدّ — يُغلق المتصفح على أي حال. بدونه كنت ستُسرّب عمليات Chromium مع كل خطأ.
- **عائد مهيكل.** تدعم SDK الخاصة بـ MCP كلا الأمرين: `content` (لوكلاء يقرأون النص) و`structuredContent` (لوكلاء يحلّلون JSON). إعادة الاثنين تعني أن الأداة تعمل مع أي عميل MCP.

### `.mcp.json`

```json
{
  "mcpServers": {
    "svelte": {
      "type": "stdio",
      "command": "npx",
      "env": {},
      "args": ["-y", "@sveltejs/mcp"]
    },
    "shelf-verification": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "./tools/shelf-verification-server/server.ts"],
      "env": {
        "SHELF_BASE_URL": "http://127.0.0.1:4173"
      }
    }
  }
}
```

يعيش ملف `.mcp.json` في جذر المستودع ويخبر Claude Code (أو أي وكيل يفهم MCP) كيف يبدأ الخادم. مدخل `type: "stdio"` يعني أن الوكيل يُطلق `npx tsx ./tools/shelf-verification-server/server.ts` كعملية طفل ويتواصل عبر الأنابيب. ويشير `SHELF_BASE_URL` إلى خادم المعاينة — الخادم نفسه الذي يستهدفه Playwright.

مدخل `svelte` كان موجودًا بالفعل. ومدخل `shelf-verification` هو ما يضيفه هذا المخبر.

## ما الذي ما زال عليك تشغيله

### ابدأ خادم المعاينة

تحتاج أداة التحقق إلى تطبيق عامل تضربه. ابنِ ثم اعرض:

```bash
npm run build && npm run preview -- --host 127.0.0.1 --port 4173
```

اتركه يعمل في طرفية منفصلة.

### تحقّق من أن الخادم يبدأ

في طرفية أخرى، تأكّد من أن خادم MCP يُقلع دون أن ينهار:

```bash
npx tsx ./tools/shelf-verification-server/server.ts
```

ينبغي أن تراه يتوقّف منتظرًا stdin (هذا صحيح — إنه ينتظر رسائل JSON-RPC من عميل MCP). أنهِه بـ Ctrl+C.

### اختبره عبر الوكيل

أعد تشغيل Claude Code في مجلد مستودع Shelf. بعد إعادة التشغيل، ينبغي أن ترى `shelf-verification` مدرجًا في خوادم MCP المتاحة. وينبغي أن تظهر أداة `verify_shelf_page` في قائمة أدوات الوكيل.

اطلب من الوكيل:

> تحقّق من صفحة الرفّ الخاصة بالمستخدم «alice».

ينبغي أن يستدعي الوكيل `verify_shelf_page` مع `username: "alice"` ويعيد شيئًا مثل:

```json
{
  "ok": true,
  "bookCount": 5,
  "consoleErrors": [],
  "url": "http://127.0.0.1:4173/shelf/alice"
}
```

### اختبر مسار الفشل

لتأكيد أن الأداة تلتقط الأخطاء، أضف `console.error` متعمدًا إلى أحد مسارات Shelf. مثلًا، في `src/routes/shelf/[username]/+page.svelte`، أضف:

```svelte
<script>
  console.error('Deliberate error for MCP verification test');
</script>
```

أعد البناء، وأعد تشغيل المعاينة، واطلب من الوكيل التحقق مرة أخرى. هذه المرة ينبغي أن تُظهر النتيجة `ok: false` مع رسالة الخطأ في `consoleErrors`.

أزل الخطأ المتعمد حين تنتهي.

### تحقّق من عدم وجود عمليات زومبي

بعد تشغيل الأداة بضع مرات، تأكّد من عدم بقاء عمليات Chromium معلّقة:

```bash
ps aux | grep -i chromium | grep -v grep
```

ينبغي أن تمنع كتلة `finally` في المعالج التسريبات، لكن التأكيد يستحق العناء. إن رأيت عمليات يتيمة، فشيء ما في مسار الخطأ لا ينظّف.

## أنماط تأخذها معك

- **مهيكل داخلًا، مهيكل خارجًا.** مخططات Zod على المدخل والمخرج معًا تعني أن الوكيل لا يضطر أبدًا إلى تخمين صيغة الاستجابة. هذا ما يفصل أداة MCP عن «شغّل سكربتًا وحلّل stdout».
- **Stdio أبسط ناقل.** لا خادم تُهيّئه، ولا منافذ تديرها، ولا مصادقة توصّلها. الوكيل يُطلق العملية، ويرسل JSON-RPC عبر الأنابيب، ويستقبل JSON-RPC. لأدوات التطوير المحلية، هذا هو الخيار الصحيح دائمًا تقريبًا.
- **أتمتة المتصفح داخل أداة أمر قوي.** الأداة لا تلتقط صورة شاشة ولا تشغّل OCR. إنها تنتقل بـ Playwright، وتعدّ عناصر DOM بحسب الدور، وتجمع أخطاء الطرفية. يحصل الوكيل على بيانات دقيقة ومهيكلة عن التطبيق العامل فعلًا.
- **`finally` عنصر حامل.** تنظيف المتصفح في كتلة `finally` ليس برمجة دفاعية — إنه الفرق بين أداة تعمل مرة وأداة تعمل بموثوقية. عمليات Chromium المتسرّبة ستأكل ذاكرة جهازك وتسبب في النهاية إخفاقات غامضة.
- **أداة واحدة، سؤال واحد.** تجيب `verify_shelf_page` عن «هل تُصيَّر صفحة رفّ هذا المستخدم صحيحًا؟». إنها لا تفحص الأداء أيضًا، ولا تشغّل تدقيقات إمكانية الوصول، ولا تتحقق من طبقة API. الإبقاء على الأدوات ضيقة يجعلها قابلة للتركيب.

## قراءة إضافية

- [مخبر: غلّف تحققًا مخصصًا في MCP](https://stevekinney.com/courses/self-testing-ai-agents/lab-wrap-a-custom-verification-mcp)
- [كتابة غلاف MCP مخصص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper)
