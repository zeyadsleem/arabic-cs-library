---
title: "مختبر"
---

النسخة الابتدائية من Shelf لا تأتي بأداة `verify_shelf_page`. وبنهاية هذا الشرح التفصيلي تكون قد بنيتها بنفسك، وتكون قادرًا على بناء أداة مكافئة لهدف تحقّق مختلف في مشروعك.

> **المتطلّبات المسبقة**
>
> أكمل [كتابة غلاف MCP مخصّص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper) أولًا. يفترض هذا المختبر أنك رأيت شكل خادم MCP وتعرف ما الغرض من `McpServer` و`registerTool` و`StdioServerTransport`.

> **في النسخة الابتدائية الحالية**
>
> ملف `.mcp.json` في الجذر لا يشحن افتراضيًا إلا مُدخل MCP الخاص بـ`svelte`. وإذا كنت قد أكملت مختبر وكلاء Playwright بالفعل، فقد يكون لديك الآن مُدخل `playwright-test` أيضًا. وعلى أي حال، فهذا المختبر هو المكان الذي تضيف فيه `@modelcontextprotocol/sdk` و`zod` وملف `tools/shelf-verification-server/server.ts` وتسجيله المطابق في `.mcp.json` دون أن تدهس المُدخلات الموجودة لديك.

قبل أن تبدأ، ثبّت اعتماديات الخادم:

```bash
npm install -D @modelcontextprotocol/sdk zod
```

## 1. التسجيل — `.mcp.json`

افتح `.mcp.json` في جذر المستودع وأضف مُدخل `shelf-verification`:

```json
{
  "mcpServers": {
    "shelf-verification": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "./tools/shelf-verification-server/server.ts"],
      "env": { "SHELF_BASE_URL": "http://127.0.0.1:4173" }
    }
  }
}
```

لاحظ أنه يعمل تحت `tsx` (TypeScript مباشرةً، بلا خطوة بناء) ويمرّر عنوان URL الأساسي عبر البيئة، لا كوسيط في سطر الأوامر. وهذا مهم لأن ملف الخادم نفسه يستطيع أن يشير إلى معاينة محلية أو عنوان URL لبيئة اختبار أو خادم تطوير حيّ، دون تغيير في الشيفرة.

**سؤال:** لماذا `stdio` بدلًا من HTTP؟ (الجواب: نقل stdio في MCP يُبقي الخادم محصورًا في عميل واحد ومحادثة واحدة. فلا إدارة منافذ، ولا مصادقة، ولا سطح شبكة مكشوف. ومضيف MCP يُفرّخ الخادم كعملية فرعية ويتحدّث معه عبر أنابيب — وهو مثالي لأدوات محلية في المستودع مثل هذه.)

## 2. ملف الخادم — `tools/shelf-verification-server/server.ts`

أنشئ `tools/shelf-verification-server/server.ts`. إنه ملف قصير — امشِ على أقسامه الأربعة:

### الاستيرادات والثوابت ونسخة الخادم

```typescript
import fs from 'node:fs';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { chromium } from 'playwright';
import { z } from 'zod';

const STORAGE_STATE_PATH = path.resolve('playwright/.authentication/user.json');
const baseUrl = process.env.SHELF_BASE_URL ?? 'http://127.0.0.1:4173';

const server = new McpServer({ name: 'shelf-verification', version: '0.1.0' });
```

ثمّة أمران يجدر ملاحظتهما. أولهما أن `STORAGE_STATE_PATH` يشير إلى الملف نفسه الذي تكتبه تهيئة حالة التخزين في Playwright — فتتشارك أداة MCP جلسة متصفح مُوثّقة مع بقية مجموعة الاختبارات. وثانيهما أن اسم الخادم (`shelf-verification`) يطابق مفتاح `.mcp.json`. وهذا ليس مفروضًا من الـSDK، لكن إبقاءهما متطابقين هو الفرق بين مُنقّح أخطاء مقروء ومُنقّح يستعصي على الفهم.

### عقد الأداة

```typescript
server.registerTool(
  'verify_shelf_page',
  {
    description:
      'Open the Shelf app and verify the public /shelf/[username] route renders correctly. ...',
    inputSchema: {
      username: z.string().min(1).describe('The reader handle, e.g. "alice" for alice@example.com'),
    },
    outputSchema: {
      ok: z.boolean(),
      bookCount: z.number().int().nonnegative(),
      consoleErrors: z.array(z.string()),
      url: z.string(),
    },
  } /* handler below */,
);
```

هذا هو العقد كله: مُدخل واحد (`username`)، وأربعة مُخرجات (`ok`، و`bookCount`، و`consoleErrors`، و`url`). ودالة `.describe()` على المُدخل حاملة للحِمل — فالوكيل يقرأها ويستخدمها ليقرّر ما يمرّره. فبلا الوصف، قد يخمّن النموذج أن `username` تعني عنوان البريد الكامل، فتفشل الأداة في العثور على القارئ.

**سؤال:** لماذا تُعيد `url` ضمن المُخرجات مع أن الوكيل يعرف نظريًا عنوان URL الذي سأل عنه؟ (الجواب: الوكيل لا يعرف إلا `username` التي مرّرها. والخادم هو من يبني عنوان URL الحقيقي — عنوان URL الأساسي زائد المسار زائد الترميز. ووضع `url` في المُخرجات المُهيكلة يعني أن الوكيل يستطيع أن يقتبس عنوان URL الدقيق في ملخّصه إلى المستخدم، وهو أنفع بكثير من «استدعيت verify_shelf_page بالاسم alice.»)

### المعالج

```typescript
async ({ username }) => {
  const targetUrl = `${baseUrl}/shelf/${encodeURIComponent(username)}`;
  const browser = await chromium.launch();
  try {
    // Reuse the authenticated storage state when it exists — even though
    // the /shelf/[username] page is public, the Playwright session stays
    // consistent with the rest of the workshop tooling.
    const contextOptions = fs.existsSync(STORAGE_STATE_PATH)
      ? { storageState: STORAGE_STATE_PATH }
      : {};
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto(targetUrl);
    await page.getByRole('heading', { level: 1 }).waitFor();

    const bookCount = await page.getByRole('article').count();
    const result = {
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
};
```

كتلة `finally` هي أهم سطر في الملف. فبلاها، أي طرح أعلى منها — مهلة تنقّل، أو خطأ شبكة، أو محدّد معطوب — يُسرّب عملية Chromium. فيبقى الخادم حيًّا، ويظلّ الوكيل يستدعي الأداة، وكل استدعاء فاشل يلتهم 200 ميغابايت أخرى من الذاكرة العشوائية. و`finally` ليست اختيارية.

ومُسند `ok` فضفاض عن قصد (`bookCount >= 0`) لأن المسار العام `/shelf/[username]` صفحة حقيقية حتى لرفّ فارغ — فـ«لا كتب بعد» تصيير صحيح. وإن كان نطاق مسألتك يقول غير ذلك، فشدّده إلى `bookCount > 0`.

وشكل الإرجاع يستخدم كليهما: `content` (لمضيفي MCP الذين يقرأون قناة النص) و`structuredContent` (للمضيفين الذين يحترمون مخطّط المُخرجات المُهيكلة). والإرجاع لكليهما يعني أن الأداة تعمل مع أي من النوعين دون تفرّع.

### النقل

```typescript
const transport = new StdioServerTransport();
await server.connect(transport);
```

وصل الخادم بـstdio. و`server.connect()` هو الاستدعاء الذي يبدأ الاستماع لرسائل JSON-RPC على المدخل القياسي للعملية والردّ على المخرج القياسي. ولا شيء آخر.

**سؤال:** لماذا لا يُغلَّف هذا بـ`try/catch` أو معالج إيقاف؟ (الجواب: عندما يقتل مضيف MCP العملية الفرعية، يُغلق المدخل القياسي فينسلّ النقل من تلقاء نفسه بنظافة. وإضافة معالج `SIGTERM` لـ«الإغلاق بلطف» من نوع الشيفرة الدفاعية التي تبدو مسؤولة لكنها تُسرّب التعقيد. وإن ماتت العملية الفرعية موتًا صعبًا، يُفرّخ المضيف واحدة جديدة.)

## 3. استخدامه

اطلب من الوكيل أن يتحقّق من رفّ alice. مثال على الطلب:

> شغّل `verify_shelf_page` بالاسم «alice» وأبلغني بالنتيجة. وإن كانت `ok` خاطئة، فشخّص السبب.

يستدعي الوكيل الأداة، فيحصل على المُخرجات المُهيكلة، ويتصرّف بناءً عليها.

![مسار الرفّ العام الذي يستهدفه `verify_shelf_page`](/images/kinney/2dd3ff9d7f78d14b.webp)

المسار العام للرفّ الذي تستهدفه `verify_shelf_page`

## معايير القبول

لا يمكنك أن تشقّ طريقك في هذا بالنسخ واللصق — فالشيفرة موجودة سلفًا. تكون قد انتهيت حين تستطيع الإجابة عن كل سؤال من هذه دون أن تنظر:

- لماذا يستخدم `.mcp.json` نقل `stdio` بدلًا من HTTP؟
- لماذا يشير `STORAGE_STATE_PATH` إلى الملف نفسه الذي تستخدمه Playwright؟
- لماذا تكون `describe()` على مُدخل `username` حاملة للحِمل؟
- لماذا تتضمّن المُخرجات `url` مع أن الوكيل مرّر الاسم بالفعل؟
- ماذا يحدث إن أزلت كتلة `finally` وطرح `page.goto` استثناءً؟
- لماذا مُسند `ok` هو `bookCount >= 0` بدلًا من `bookCount > 0`؟
- لماذا يتضمّن شكل الإرجاع كليهما: `content` و`structuredContent`؟
- لماذا لا يوجد معالج إيقاف صريح على النقل؟

وفحص آلي واحد إضافةً إلى ذلك:

- أعد تشغيل مضيف MCP لديك. اطلب من الوكيل تشغيل `verify_shelf_page` بالاسم `alice`. ينبغي أن تتضمّن النتيجة `ok: true`، و`bookCount` غير سالب، ومصفوفة `consoleErrors` فارغة، و`url` المبنيّ. أضف الآن `console.error('oops')` إلى `src/routes/shelf/[username]/+page.svelte`، وأعد تشغيل الأداة، وتأكّد أن `ok` تنقلب إلى `false` وأن `consoleErrors` تحتوي نصّك.

## أهداف إضافية

- أضف أداة ثانية، `check_accessibility`، تشغّل [axe-core](https://github.com/dequelabs/axe-core) على عنوان URL وتُعيد الانتهاكات بصيغة JSON مُهيكلة. حزمة [axe-playwright-npm](https://github.com/abhinaba-ghosh/axe-playwright) تجعل هذا تنفيذًا من نحو 15 سطرًا.
- أضف أداة ثالثة، `database_snapshot`، تستدعي واجهة Shelf البرمجية لتقرأ الحالة الراهنة لقاعدة بيانات الاختبار (الكتب، والأرفف، والمستخدمون) وتُعيدها بصيغة JSON. وهذا نافع لي«ينظر» الوكيل إلى الحالة دون قراءة SQL خام.
- اجعل خادمك يسجّل كل استدعاءات الأدوات في ملف عند `./mcp-log.txt` حتى تستطيع متابعة نهاية السجل بينما يعمل الوكيل. وسجّل إلى stderr، لا إلى stdout (فـstdout هي قناة بروتوكول MCP).
- اختبر خادمك منفردًا بـ[MCP Inspector](https://github.com/modelcontextprotocol/inspector) قبل توصيله بالوكيل.

## ما ينبغي أن يتبقّى بيدك

MCP مخصّص عامل، مسجّل مع Claude Code، يستطيع الوكيل استدعاءه للتحقّق من صفحة Shelf الرئيسية. وقاعدة في `CLAUDE.md` تطلب من الوكيل تفضيله. وانخفاض صغير لكنه قابل للقياس في حاجة الوكيل إلى تركيب أوليّات Playwright من الصفر.

هذه هي أحكم حلقة تحقّق سنبنيها اليوم. يُجري الوكيل تعديلًا، ويستدعي `verify_shelf_page`، ويقرأ النتيجة، ويكرّر. لا إنسان في الحلقة، ولا أوامر صدفة، ولا تخمين. وهذا هو الرهان كله وقد صار واقعًا.

## قراءات إضافية

- [الحلّ](https://stevekinney.com/courses/self-testing-ai-agents/wrap-a-custom-verification-mcp-solution)
- [كتابة غلاف MCP مخصّص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper)
- [ملفّات الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build)
