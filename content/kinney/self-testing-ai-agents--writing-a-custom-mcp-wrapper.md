---
title: "كتابة غلاف MCP مخصّص"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper"
---

إن Playwright MCP عامّ بحكم التصميم. فهو يعرض واجهة Playwright البرمجية في صورة أدوات، ويتعيّن على الوكيل أن يستنتج أي توليفة من الأجزاء الأولية (primitives) يستدعيها لينجز ما تريد. هذا مقبول في معظم الأحيان — فالوكيل بارع في تركيب الأجزاء الأولية.

لكنه ليس مقبولًا دائمًا. أحيانًا تريد أن تكون لدى الوكيل أداة واحدة اسمها «تحقّق من أن صفحة الرفّ تُصيَّر بشكل صحيح» تفعل ستة أشياء في الخلف وتعيد نتيجة مُهيكلة. لا تريد أن يضطر الوكيل إلى استنتاج كيفية تركيب تلك الأشياء الستة من الصفر في كل مرة، لأنه سيخطئ خطأً طفيفًا مرة من كل خمس، وستبقى أنت عالقًا في تشخيص استدعاء MCP.

الحل هو أن تغلّف MCP خاصًا بك. الأمر ليس صعبًا. بل هو في الحقيقة سهل إلى حدّ محرج مع [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)، والعائد — أداة تحقّق مخصّصة مفصّلة على مقاس قاعدة شيفرتك بالضبط — عائد ضخم.

وللمراجعة السريعة لما هو [بروتوكول سياق النموذج](https://modelcontextprotocol.io/) (Model Context Protocol) وكيف يعمل، راجع المواصفة. في هذا الدرس يكفي أن تعرف أن خادم MCP عملية فرعية (subprocess) تعرض أدوات للوكيل.

## ما الذي نبنيه

خادم MCP صغير بأداة واحدة اسمها `verify_shelf_page`. وعند استدعائها فإنه:

1. يشغّل Playwright على `http://127.0.0.1:4173/shelf/<username>` افتراضيًا. و`<username>` هو الجزء المكتوب بحروف صغيرة من بريد القارئ قبل `@`، لذا يصبح [alice@example.com](mailto:alice@example.com) هو `alice`. ويمكن لـ `SHELF_BASE_URL` تجاوز المضيف عند الحاجة.
2. ينتظر حتى يصبح عنوان الرفّ من المستوى الأول مرئيًا.
3. يعدّ الكتب المُصيَّرة كعناصر `<article>`.
4. يلتقط أي أخطاء في وحدة التحكّم تُصدَر أثناء تحميل الصفحة.
5. يعيد كتلة JSON مُهيكلة: `{ ok: boolean, bookCount: number, consoleErrors: string[], url: string }`.

يستطيع الوكيل الآن استدعاء `verify_shelf_page` والحصول على جواب مُهيكل بضربة واحدة على سؤال «هل هذه الصفحة في حالة جيدة؟». لا تركيب، ولا تخمين، ولا «هل تذكّرت أن تفحص وحدة التحكّم؟». كل ذلك داخل الأداة.

يسجّل Shelf الخادم في ملف `.mcp.json` محلي داخل المستودع، ويستخرج عنوان URL الهدف من `SHELF_BASE_URL`، ويكون الافتراضي `http://127.0.0.1:4173`. والمسار `/shelf/[username]` عام، لذا لا يحتاج الخادم إلى مصادقة بالمعنى الدقيق — لكنه يعيد استخدام حالة التخزين الموجودة في `playwright/.authentication/user.json` عندما تكون موجودة، حتى تبقى جلسة المتصفح متسقة مع بقية أدوات الورشة.

في النسخة الابتدائية الحالية، لا يزال ذلك المسار الهدف هو الملف الحقيقي `src/routes/shelf/[username]/+page.svelte`، لكن خادم التحقّق المخصّص نفسه شيء تضيفه لاحقًا في الدورة. وهذا هو النمط الذي يجب نسخه: مسار حقيقي، وتسجيل محلي في المستودع داخل `.mcp.json`، ومِسبار واحد محدّد الحواف.

## الهيكل العظمي

هذا هو الخادم كله، منزوعًا منه معالجة الأخطاء اختصارًا. إنه نحو خمسين سطرًا.

يستخدم [واجهة Playwright البرمجية](https://playwright.dev/docs/api/class-browsertype) لتشغيل المتصفحات وقيادة الصفحات. وكل ما يأتي من `chromium.launch()` فصاعدًا هو Playwright قياسي.

```typescript
// tools/shelf-verification-server/server.ts
import fs from 'node:fs';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { chromium } from 'playwright';
import { z } from 'zod';

const STORAGE_STATE_PATH = path.resolve('playwright/.authentication/user.json');
const baseUrl = process.env.SHELF_BASE_URL ?? 'http://127.0.0.1:4173';

const server = new McpServer({ name: 'shelf-verification', version: '0.1.0' });

server.registerTool(
  'verify_shelf_page',
  {
    description:
      'Open the Shelf app and verify the public /shelf/[username] route renders correctly.',
    inputSchema: {
      username: z.string().min(1),
    },
    outputSchema: {
      ok: z.boolean(),
      bookCount: z.number().int().nonnegative(),
      consoleErrors: z.array(z.string()),
      url: z.string(),
    },
  },
  async ({ username }) => {
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
        if (message.type() === 'error') consoleErrors.push(message.text());
      });

      const response = await page.goto(targetUrl);
      const heading = page.getByRole('heading', { level: 1, name: /shelf/i });
      await heading.waitFor();

      const bookCount = await page.getByRole('article').count();
      const status = response?.status() ?? 0;
      const headingVisible = await heading.isVisible();

      const result = {
        ok: status >= 200 && status < 300 && headingVisible && consoleErrors.length === 0,
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
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

هذا هو الخادم كله. وأجزاؤه الثلاثة هي:

- **قائمة الأدوات.** أخبر الوكيل بالأدوات الموجودة وبشكل مدخلاتها. وهذا يناظر مباشرةً ما يراه الوكيل في لوحة أدواته.
- **تنفيذ الأداة.** عندما يستدعي الوكيل الأداة، تشغّل أنت أي شيفرة تريدها، بأي مكتبات تريد، وتعيد مخرجات مُهيكلة.
- **النقل.** نقل stdio يعني أن الخادم يتحدّث إلى الوكيل عبر المدخل والمخرج القياسيين. ويشغّل الوكيل الخادم كعملية فرعية. هذا أبسط من HTTP، وهو الافتراضي الصحيح للأدوات المحلية.

> **نصيحة**
>
> لاحظ ما يغيب عن المثال: `waitUntil: 'networkidle'`. ينتظر الخادم عنوان الرفّ لأن ذلك هو إشارة النجاح الفعلية لهذا المسبار. وقواعد الانتظار نفسها من درس Playwright تنطبق داخل أدوات MCP المخصّصة التي تكتبها.

## توصيله بمضيف MCP المحلي لديك

في مستودع Shelf المحلي لهذه الدورة، تعيش تهيئة MCP في `.mcp.json` في جذر المستودع. أضف مُدخلًا:

```json
{
  "mcpServers": {
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

أعد تشغيل مضيف MCP. ينبغي أن تظهر أداة `verify_shelf_page` الجديدة في قائمة الأدوات. اطلب من الوكيل أن «يتحقّق من صفحة الرفّ الخاصة بـ alice» فينبغي أن يختار الأداة الصحيحة تلقائيًا.

إذا كان محرّرك أو مضيف الوكيل يستخدم مسار تهيئة مختلفًا، فالمفهوم نفسه حتى لو انتقل الملف. والشيء الوحيد الذي يتغيّر هو موضع تسجيل العملية الفرعية.

## لماذا يتفوّق هذا على «ركّبه بنفسك»

إليك جوهر الأمر في امتلاك أداة تحقّق مخصّصة. ليس أن الوكيل *لا يستطيع* فتح Playwright والتنقّل وعدّ الكتب وقراءة وحدة التحكّم بتركيب أدوات MCP أولية. بل يستطيع. المشكلة أن كل مرة يفعل فيها ذلك يتخذ قرارات صغيرة — أي محدّد (selector) يستخدم للعنوان، وهل ينتظر المقالات، وكم ينتظر، وهل يُطبّع نص وحدة التحكّم قبل المقارنة. وكل قرار من هذه قرار يُعرّض الجواب لأن يكون خاطئًا على نحو خفيّ.

الأداة المخصّصة تُرمّز الجواب *الصحيح* مرة واحدة، في الشيفرة، حيث تستطيع اختباره. فيتوقف الوكيل عن اتخاذ تلك القرارات ويبدأ في استهلاك نتيجة معروفة الجودة. ولأن النتيجة مُهيكلة (`bookCount: number`)، يستطيع الوكيل أن يستدلّ عليها بالموثوقية نفسها التي يتعامل بها مع أي JSON يصله من API. لا هلوسة حول معنى «تحقّق بنجاح» — فالأداة إمّا أعادت `{ ok: true }` أو لم تُعِد.

أنا أنظر إلى أدوات MCP المخصّصة بوصفها نقيض التلقين (prompting). فالتلقين يقول: «عزيزي النموذج اللغوي، من فضلك افعل هذا الشيء بشكل صحيح». أما الأداة المخصّصة فتقول: «لقد كتبت هذا الشيء بشكل صحيح بالفعل. وها هو في صورة دالة».

## ما الذي تُغلّفه وما الذي تتركه

ليست كل الأشياء تحتاج غلافًا مخصّصًا. وهذا هو دليلي الاستدلالي.

**غلّفه إذا:** كان الفحص خاصًا بقاعدة شيفرتك، ويُشغَّل أكثر من بضع مرات في اليوم، وقد أخطأ فيه الوكيل مرة على الأقل. هذه هي الأشياء التي يكون فيها معدّل خطأ الوكيل الحدّي مضروبًا في معدّل إزعاجه لك مرتفعًا بما يكفي ليعود الغلاف المخصّص بنفعه سريعًا.

**ولا تغلّفه إذا:** كانت أدوات MCP الجاهزة تؤدّيه جيدًا، وكان الفحص عامًّا («انقر زرًّا، واقرأ النتيجة»)، ولن تشغّله إلا بضع مرات. فالغلاف يستغرق ساعة. والمهمة العامة التي تُنفَّذ مرة واحدة لا تستحقّ تلك الساعة.

أمثلة غلّفتها:

- `verify_shelf_page` (هذا الدرس)
- `check_accessibility` — يشغّل axe-core على عنوان URL ويعيد الانتهاكات بصيغة JSON، ليستطيع الوكيل التصرّف بناءً عليها دون تحليل تقارير HTML
- `database_snapshot` — يُفرّغ الحالة الراهنة لقاعدة بيانات الاختبار بصيغة JSON، ليستطيع الوكيل الاستدلال على الحالة بين استدعاءات API

أمثلة لم أغلّفها:

- «انقر هذا الزر واقرأ الاستجابة». يتعامل Playwright MCP مع هذا جيدًا.
- «خُذ لقطة شاشة». هذه أولية بالفعل.
- «شغّل الاختبارات». أداة الصدفة هي الأداة الصحيحة؛ ولا شيء هنا يستدعي التغليف.

## تشخيص أخطاء MCP المخصّصة

أدوات MCP المخصّصة عمليات فرعية تتحدّث عبر stdio. وعندما تتعطّل، تتعطّل بصمت ويقول الوكيل فقط «فشل استدعاء الأداة». وفيما يلي أمور قليلة يجدر معرفتها:

- سجّل إلى stderr. فأي شيء تكتبه إلى stdout سيُفسَّر رسالة MCP وسيُسقِط البروتوكول. استخدم `console.error(...)` للتسجيل.
- اكتب السجلات إلى ملف. و`fs.appendFileSync('./mcp-log.txt', ...)` عكّاز تصحيح مفيد. راقب نهاية الملف في طرفية أخرى أثناء تطويرك.
- اختبر الخادم منفردًا بأداة MCP inspector قبل توصيله بوكيل. يستغرق ثلاثين ثانية ويوفّر ساعات.

## قواعد الوكيل

أضف إلى الملف:

```markdown
## Custom MCP tools

When verifying UI changes, prefer custom tools over composing primitives.
Specifically:

- Use `verify_shelf_page` instead of hand-rolling a Playwright probe of
  `/shelf`. It checks book count and console errors in one call.
- Use `check_accessibility` to run axe-core against a URL and get
  structured violations back.
- If you find yourself composing the same three primitive tool calls
  more than twice in a conversation, flag it—it's probably worth a
  new custom tool.
```

القاعدة الأخيرة هي المفضّلة عندي. فهي تدفع كلفة التغليف إلى حلقة عمل الوكيل — فإن لاحظ النمط، استطاع أن يطلب أداة جديدة، وتستطيع أنت كتابتها في الاستراحة التالية.

## الشيء الوحيد الذي يجب تذكّره

أدوات MCP الجاهزة عامة. أما المخصّصة فتُرمّز منطق تحقّقك الخاص مرة واحدة، في الشيفرة، وتمنح الوكيل جوابًا موثوقًا مُهيكلًا. وكل ساعة تنفقها في كتابة واحدة منها توفّر على الوكيل ساعة من تركيب الأوليّات بشكل رديء. فغلّف الفحوص التي تهمّك أكثر من غيرها.

## قراءات إضافية

- [مسابر وقت التشغيل داخل حلقة التطوير](https://stevekinney.com/courses/self-testing-ai-agents/runtime-probes-in-the-development-loop)
- [مخرجات سطر الأوامر المُهيكلة كغراء للخطوط الأنابيب](https://stevekinney.com/courses/self-testing-ai-agents/structured-cli-output-as-pipeline-glue)
- [مختبر: غلّف MCP تحقّق مخصّصًا](https://stevekinney.com/courses/self-testing-ai-agents/lab-wrap-a-custom-verification-mcp)
