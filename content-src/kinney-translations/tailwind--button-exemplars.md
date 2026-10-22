---
title: "نماذج الأزرار"
---

## الوضع الفاتح

### التنويع الأساسي

*التنويع الأساسي — المثال 1 — [افتح المثال](https://stevekinney.com/generated/playgrounds/04a20ae89b141d17a76a6d62f51f6483d55afe14f65b91d5d87462576b553214.html)*

```html
<button
  class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400 dark:disabled:bg-indigo-600/50"
>
  Primary
</button>
```

### التنويع الثانوي

*التنويع الثانوي — المثال 2 — [افتح المثال](https://stevekinney.com/generated/playgrounds/0a01f10bc94e9cba678a8785f776c8f87fa324b92d9ebf8326a06249cc32a0e7.html)*

```html
<button
  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-xs ring-1 ring-slate-300 transition-colors duration-200 ring-inset hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-400 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500"
>
  Secondary
</button>
```

### تنويع الخطر

*تنويع الخطر — المثال 3 — [افتح المثال](https://stevekinney.com/generated/playgrounds/11d81599eba16adcaff6e0d0ead3a5758a8075160ed391a039baa6d2e304a648.html)*

```html
<button
  class="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:bg-red-400 disabled:hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-400 dark:disabled:bg-red-600/50"
>
  Danger
</button>
```

### تنويع الشبح

*تنويع الشبح — المثال 4 — [افتح المثال](https://stevekinney.com/generated/playgrounds/2e01b2bee01d3b62a144b537767ce52e1d335d60bc8e3996caa804736f668206.html)*

```html
<button
  class="rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-none transition-colors duration-200 hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-400 dark:disabled:text-gray-600 dark:disabled:hover:bg-transparent"
>
  Ghost
</button>
```

## الوضع الداكن

في الوضع الداكن، لُفّ الأزرار داخل حاوية تحمل الصنف `dark`:

*الوضع الداكن — المثال 5 — [افتح المثال](https://stevekinney.com/generated/playgrounds/c5e6dd9d68c73bef1b3f2bce1095d4fd544ba15de4ad05557b0a104a0f6108cb.html)*

```html
<div class="dark">
  <!-- Any button from above will automatically use dark mode styles -->
  <button
    class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400 dark:disabled:bg-indigo-600/50"
  >
    Primary Dark
  </button>
</div>
```

## حالات التعطيل

#### الأساسي المعطَّل

*الأساسي المعطَّل — المثال 6 — [افتح المثال](https://stevekinney.com/generated/playgrounds/adb0b7c62d1401d35029f77de648cb79fe4355d79721e9806a9f04ba5937afda.html)*

```html
<button
  disabled
  class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400 dark:disabled:bg-indigo-600/50"
>
  Primary Disabled
</button>
```

#### الثانوي المعطَّل

*الثانوي المعطَّل — المثال 7 — [افتح المثال](https://stevekinney.com/generated/playgrounds/7fced9322ffcc59d1abb54d7739d95e8e2c0af4f43b754848d707f0825827aec.html)*

```html
<button
  disabled
  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-xs ring-1 ring-slate-300 transition-colors duration-200 ring-inset hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-400 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500"
>
  Secondary Disabled
</button>
```

#### الخطر المعطَّل

*الخطر المعطَّل — المثال 8 — [افتح المثال](https://stevekinney.com/generated/playgrounds/d838f14cbc74719d6fcb9b6a420bc1d0b100e90e60971b72f88bb9868c4dfbfb.html)*

```html
<button
  disabled
  class="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:bg-red-400 disabled:hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-400 dark:disabled:bg-red-600/50"
>
  Danger Disabled
</button>
```

#### الشبح المعطَّل

*الشبح المعطَّل — المثال 9 — [افتح المثال](https://stevekinney.com/generated/playgrounds/1fa2ee623b5e8a5c5927c483a92fd0700cfc9bbd971d0fc239a3539f1e4e594a.html)*

```html
<button
  disabled
  class="rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-none transition-colors duration-200 hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-400 dark:disabled:text-gray-600 dark:disabled:hover:bg-transparent"
>
  Ghost Disabled
</button>
```

## تنويعات العرض الكامل

#### الأساسي بعرض كامل

*الأساسي بعرض كامل — المثال 10 — [افتح المثال](https://stevekinney.com/generated/playgrounds/ee9b85247ee47aaaadd4ac996a6059b18eda605f077bcdc5fe349d3f2614a0eb.html)*

```html
<button
  class="w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs transition-colors duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400 dark:disabled:bg-indigo-600/50"
>
  Primary Full Width
</button>
```

#### الثانوي بعرض كامل

*الثانوي بعرض كامل — المثال 11 — [افتح المثال](https://stevekinney.com/generated/playgrounds/643ac0a917da8d20c89666184c4f7ac5bc9a86b10a79db66cbd61f894ab8221d.html)*

```html
<button
  class="w-full rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-xs ring-1 ring-slate-300 transition-colors duration-200 ring-inset hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-400 dark:disabled:bg-gray-800/50 dark:disabled:text-gray-500"
>
  Secondary Full Width
</button>
```
