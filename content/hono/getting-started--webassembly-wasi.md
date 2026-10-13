---
title: "WebAssembly (مع WASI)"
book: hono
chapter: getting-started
slug: webassembly-wasi
order: 18
source: https://hono.dev/docs/getting-started/webassembly-wasi
lang: ar
---

[WebAssembly][wasm-core] هي بيئة تشغيل آمنة ومعزولة (sandboxed) ومحمولة تعمل داخل متصفحات الويب وخارجها.

عمليًا:

- اللغات (مثل JavaScript) _تُترجم إلى_ WebAssembly (`.wasm` ملفات)
- بيئات تشغيل WebAssembly (مثل [`wasmtime`][wasmtime] أو [`jco`][jco]) تتيح _تشغيل_ ملفات WebAssembly الثنائية

بينما لا يملك WebAssembly الأساسي _أي_ وصول إلى أشياء مثل نظام الملفات المحلي أو المقابس (sockets)، فإن [WebAssembly System Interface][wasi]
تتدخل لتمكين تعريف منصة ضمن أعباء عمل (workloads) WebAssembly.

هذا يعني أنه _مع_ WASI، يمكن لـ WebAssembly العمل على الملفات والمآخذ (sockets) وغير ذلك الكثير.

هل تريد إلقاء نظرة على واجهة WASI بنفسك؟ اطّلع على [`wasi:http`][wasi-http]

يعتمد دعم WebAssembly مع WASI في JS على [StarlingMonkey][sm]، وبفضل التركيز على معايير الويب في
كلاهما StarlingMonkey و Hono، **يعمل Hono \*مباشرة مع النظم البيئية لـ WebAssembly المفعّلة بـ WASI.**

[sm]: https://github.com/bytecodealliance/StarlingMonkey
[wasm-core]: https://webassembly.org/
[wasi]: https://wasi.dev/
[bca]: https://bytecodealliance.org/
[wasi-http]: https://github.com/WebAssembly/wasi-http

## 1. الإعداد

يوفر النظام البيئي JavaScript الخاص بـ WebAssembly أدوات تسهّل البدء في بناء مكونات WebAssembly المفعّلة بـ WASI:

- [StarlingMonkey][sm] هو فرع (fork) من [SpiderMonkey][spidermonkey] يُترجم إلى WebAssembly ويتيح للمكونات
- [`componentize-js`'][componentize-js] يحوّل وحدات JavaScript ES إلى مكونات WebAssembly
- [`jco`][jco] هو أداة متعددة الاستخدامات تبني المكونات، وتولّد الأنواع، وتشغّل المكونات في بيئات مثل Node.js أو المتصفح

يمتلك WebAssembly نظامًا بيئيًا مفتوحًا ومصدرًا مفتوحًا، حيث تُدار المشاريع الأساسية بشكل أساسي من قبل [Bytecode Alliance][bca] وأعضائه.

الميزات الجديدة والقضايا وطلبات السحب (pull requests) وأنواع المساهمات الأخرى مرحب بها دائمًا.

على الرغم من أن قالب البدء (starter) لـ Hono على WebAssembly غير متوفر بعد، يمكنك بدء مشروع Hono على WebAssembly تمامًا مثل أي مشروع آخر:


```sh [npm]
mkdir my-app
cd my-app
npm init
npm i hono
npm i -D @bytecodealliance/jco @bytecodealliance/componentize-js @bytecodealliance/jco-std
npm i -D rolldown
```

```sh [yarn]
mkdir my-app
cd my-app
npm init
yarn add hono
yarn add -D @bytecodealliance/jco @bytecodealliance/componentize-js @bytecodealliance/jco-std
yarn add -D rolldown
```

```sh [pnpm]
mkdir my-app
cd my-app
pnpm init --init-type module
pnpm add hono
pnpm add -D @bytecodealliance/jco @bytecodealliance/componentize-js @bytecodealliance/jco-std
pnpm add -D rolldown
```

```sh [bun]
mkdir my-app
cd my-app
npm init
bun add hono
bun add -D @bytecodealliance/jco @bytecodealliance/componentize-js @bytecodealliance/jco-std
```


لضمان استخدام مشروعك لوحدات ES، تأكّد من `type` مضبوط على `"module"` في `package.json`

بعد إدخال `my-app` المجلد، ثبِّت التبعيات، وتهيِّئ TypeScript:


```sh [npm]
npm i
npx tsc --init
```

```sh [yarn]
yarn
yarn tsc --init
```

```sh [pnpm]
pnpm i
pnpm exec tsc --init
```

```sh [bun]
bun i
```


بمجرد أن يكون لديك ملف تهيئة TypeScript أساسي (`tsconfig.json`)، يُرجى التأكد من أنه يحتوي على الإعدادات التالية:

- `compilerOptions.module` تعيين إلى `"nodenext"`

منذ `componentize-js` (و `jco` الذي يعيد استخدامه) يدعم فقط ملفات JS المفردة،
التجميع ضروري، لذا [`rolldown`][rolldown] يمكن استخدامه لإنشاء حزمة (bundle) من ملف واحد.

إعداد Rolldown (`rolldown.config.mjs`) كهذا يمكن استخدامه:

```js
import { defineConfig } from 'rolldown'

export default defineConfig({
  input: 'src/component.ts',
  external: /wasi:.*/,
  output: {
    file: 'dist/component.js',
    format: 'esm',
  },
})
```

لا تتردد في استخدام أي أدوات تجميع (bundlers) أخرى تشعر براحة أكبر معها (`rolldown`, `esbuild`, `rollup`، إلخ)

[jco]: https://github.com/bytecodealliance/jco
[componentize-js]: https://github.com/bytecodealliance/componentize-js
[rolldown]: https://rolldown.rs
[spidermonkey]: https://spidermonkey.dev/

## 2. إعداد واجهة WIT والتبعيات

[WebAssembly Interface Types (WIT)][wit] هي لغة تعريف واجهات (Interface Definition Language) تحكم الوظائف التي يستخدمها مكون WebAssembly ("imports") وما يوفره ("exports").

من بين واجهات WIT الموحّدة، [`wasi:http`][wasi-http] مخصص للتعامل مع طلبات HTTP (سواء استقبالها أو إرسالها)، وبما أننا ننوي إنشاء خادم ويب، يجب أن يصرح مكوننا باستخدام `wasi:http/incoming-handler` في [عالم WIT][wit-world] الخاص به:

أولاً، لنُعِدّ عالم WIT الخاص بالمكوّن في ملف يُسمّى `wit/component.wit`:

```txt
package example:hono;

world component {
    export wasi:http/incoming-handler@0.2.6;
}
```

ببساطة، يعني ملف WIT أعلاه أن مكوننا "يوفر" وظيفة "استقبال"/"معالجة الطلبات الواردة" لطلبات HTTP.

الـ `wasi:http/incoming-handler` تعتمد الواجهة على واجهات WIT المعيارية من المنبع (مواصفات لكيفية تنظيم الطلبات، وما إلى ذلك).

لسحب واجهات WIT تلك من طرف ثالث (التي يحافظ عليها Bytecode Alliance)، فإن إحدى الأدوات التي يمكننا استخدامها هي [`wkg`][wkg]:

```sh
wkg wit fetch
```

بمجرد `wkg` انتهى التشغيل، ينبغي أن تجد `wit` مجلد مملوء بـ `deps` مجلد بجانب `component.wit`:

```
wit
├── component.wit
└── deps
    ├── wasi-cli-0.2.6
    │   └── package.wit
    ├── wasi-clocks-0.2.6
    │   └── package.wit
    ├── wasi-http-0.2.6
    │   └── package.wit
    ├── wasi-io-0.2.6
    │   └── package.wit
    └── wasi-random-0.2.6
        └── package.wit
```

[wkg]: https://github.com/bytecodealliance/wasm-pkg-tools
[wit-world]: https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md#wit-worlds
[wit]: https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md

## 3. مرحبًا Wasm

لبناء خادم HTTP في WebAssembly، يمكننا الاستفادة من [`jco-std`][jco-std] مشروع، يحتوي على أدوات مساعدة تجعل التجربة مشابهة جدًا لتجربة Hono القياسية.

لنحقِّق `component` مرحبًا بالعالم مع تطبيق Hono أساسي كمكوّن WebAssembly في ملف يُسمى `src/component.ts`:

```ts
import { Hono } from 'hono'
import { fire } from '@bytecodealliance/jco-std/wasi/0.2.6/http/adapters/hono/server'

const app = new Hono()

app.get('/hello', (c) => {
  return c.json({ message: 'Hello from WebAssembly!' })
})

fire(app)

// Although we've called `fire()` with wasi HTTP configured for use above,
// we still need to actually export the `wasi:http/incoming-handler` interface object,
// as jco and componentize-js will be looking for the ES module export that matches the WASI interface.
export { incomingHandler } from '@bytecodealliance/jco-std/wasi/0.2.6/http/adapters/hono/server'
```

## 4. البناء

بما أننا نستخدم Rolldown (وهو مُهيأ للتعامل مع تجميع TypeScript)، يمكننا استخدامه للبناء والتجميع (bundle):


```sh [npm]
npx rolldown -c
```

```sh [yarn]
yarn rolldown -c
```

```sh [pnpm]
pnpm exec rolldown -c
```

```sh [bun]
bun build --target=bun --outfile=dist/component.js ./src/component.ts
```


خطوة التجميع (bundling) ضرورية لأن أدوات النظام البيئي JavaScript الخاص بـ WebAssembly تدعم حاليًا ملف JS واحدًا فقط، ونود تضمين Hono مع المكتبات ذات الصلة.

بالنسبة للمكونات ذات المتطلبات الأبسط، لا تكون أدوات التجميع (bundlers) ضرورية.

لبناء مكوّن WebAssembly الخاص بك، استخدم `jco` (وبشكل غير مباشر `componentize-js`):


```sh [npm]
npx jco componentize -w wit -o dist/component.wasm dist/component.js
```

```sh [yarn]
yarn jco componentize -w wit -o dist/component.wasm dist/component.js
```

```sh [pnpm]
pnpm exec jco componentize -w wit -o dist/component.wasm dist/component.js
```

```sh [bun]
bun run jco componentize -w wit -o dist/component.wasm dist/component.js
```


## 5. تشغيل

لتشغيل خادم Hono WebAssembly HTTP الخاص بك، يمكنك استخدام أي بيئة تشغيل WebAssembly تدعم WASI:

- [`wasmtime`][wasmtime]
- `jco` (يعمل في Node.js)

في هذا الدليل، سنستخدم `jco serve` لأنه مثبّت بالفعل.

`jco serve` مخصص للتطوير (development)، ولا يُنصح باستخدامه في بيئة الإنتاج (production).

[wasmtime]: https://wasmtime.dev


```sh [npm]
npx jco serve dist/component.wasm
```

```sh [yarn]
yarn jco serve dist/component.wasm
```

```sh [pnpm]
pnpm exec jco serve dist/component.wasm
```

```sh [bun]
bun run jco serve dist/component.wasm
```


ينبغي أن ترى مخرجات كهذه:

```
$ npx jco serve dist/component.wasm
Server listening @ localhost:8000...
```

إرسال طلب إلى `localhost:8000/hello` سينتج مخرجات JSON التي حددتها في تطبيق Hono الخاص بك.

ينبغي أن ترى مخرجات كهذه:

```json
{ "message": "Hello from WebAssembly!" }
```

`jco serve` يعمل عن طريق تحويل مكون WebAssembly إلى وحدة نواة (core module) أساسية من WebAssembly، بحيث يمكن تشغيله في أوقات تشغيل مثل Node.js والمتصفح.

تُشغَّل هذه العملية عادةً عبر `jco transpile`، وهي الطريقة التي يمكننا من خلالها استخدام محركات JS مثل Node.js والمتصفح (الذي قد يستخدم V8 أو محركات JavaScript أخرى) كأوقات تشغيل لمكونات WebAssembly.

كيف `jco transpile` خارج نطاق هذا الدليل، يمكنك قراءة المزيد عنه في [كتاب Jco][jco-book]

## مزيد من المعلومات

لمعرفة المزيد حول WASI ومكونات WebAssembly والمزيد، راجع الموارد التالية:

- [كتاب نموذج مكوّنات BytecodeAlliance][cm-book]
- [`jco` codebase][jco]
  - [`jco` مكونات المثال][jco-example-components] (ولا سيما [مثال Hono][jco-example-component-hono])
- [Jco book][jco-book]
- [`componentize-js` codebase][componentize-js]
- [StarlingMonkey codebase][sm]

للتواصل مع مجتمع WebAssembly بأسئلة أو تعليقات أو مساهمات أو لتسجيل القضايا:

- [Bytecode Alliance Zulip](https://bytecodealliance.zulipchat.com) (فكّر في النشر في [قناة `#jco`](https://bytecodealliance.zulipchat.com/#narrow/channel/409526-jco))
- [مستودع `Jco`](https://github.com/bytecodealliance/jco)
- [مستودع componentize-js](https://github.com/bytecodealliance/componentize-js)

[cm-book]: https://component-model.bytecodealliance.org/
[jco-book]: https://bytecodealliance.github.io/jco/
[jco-example-components]: https://github.com/bytecodealliance/jco/tree/main/examples/components
[jco-example-component-hono]: https://github.com/bytecodealliance/jco/tree/main/examples/components/http-server-hono
