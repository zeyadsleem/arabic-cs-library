---
title: "تجنّب الاعتمادات غير الضرورية"
---

كل اعتماد تضيفه إلى مشروع React هو رهان — رهان على أن القيمة التي يقدّمها تفوق تكلفته من حيث حجم الحزمة، وعبء الصيانة، وثغرات الأمان المحتملة. وكثيرًا ما نلجأ إلى مكتبات شائعة دون أن نفكّر فيما إذا كنا نحتاجها فعلًا أو إذا كان هناك بديل أخف. لنستكشف كيفية تدقيق اعتماداتك، وتحديد التضخّم غير الضروري، واتخاذ خيارات مدروسة تُبقي تطبيقات React خفيفة وسريعة.

## التكلفة الخفية للاعتمادات

قبل أن نغوص في الحلول، لنتحدّث عمّا تدفعه فعلًا عند تنفيذ `npm install` لشيء جديد. فليست المسألة كيلوبايتات فقط (رغم أن لها أهمية كبيرة):

- **حجم الحزمة**: كل مكتبة تزيد حمولة JavaScript لديك، فتُبطئ تحميل الصفحة الأولى
- **زمن التحليل**: شيفرة أكثر تعني وقتًا أطول لمحرّك JavaScript لتحليلها وترجمتها
- **عبء الصيانة**: الاعتمادات تتعطّل أو تُهمَل أو تُدخل ثغرات أمنية
- **تعارضات الإصدارات**: قد تتعارض الاعتمادات بعضها مع بعض أو توقعك في جحيم الإصدارات
- **قيود إزالة الشيفرة الميتة**: ليست كل المكتبات مُحسّنة لإزالة الشيفرة غير المستخدمة (dead code elimination)

تأمّل هذا: إضافة Lodash من أجل دالة أدوات واحدة فقط قد تضيف 70KB إلى حزمتك إذا لم تُحسَّن إزالة الشيفرة غير المستخدمة كما ينبغي. وهذا ثمن باهظ مقابل الراحة.

## تدقيق اعتماداتك الحالية

قبل أن تقلّم الزوائد، عليك معرفة موضعها. وإليك كيفية تدقيق اعتماداتك بفعالية:

### تحليل الحزمة

ابدأ بتحليل حزمتك الحالية بأداة مثل `webpack-bundle-analyzer`:

```bash
npm install --save-dev webpack-bundle-analyzer
```

أضف هذا السكربت إلى `package.json`:

```json
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}
```

يُظهر لك هذا التفصيل البصري بدقة أي المكتبات تستهلك أكبر قدر من المساحة. وابحث عن:

- مكتبات كبيرة تُستخدم لميزات صغيرة
- مكتبات متعددة تفعل أشياء متشابهة
- مكتبات ضعيفة الدعم لإزالة الشيفرة غير المستخدمة

### استكشاف شجرة الاعتمادات

استخدم أدوات مثل `npm ls` أو `yarn why` لفهم شجرة اعتماداتك:

```bash
# See why a package is installed
npm ls package-name

# Or with yarn
yarn why package-name
```

أحيانًا تكتشف أن اعتمادًا ظننت أنك أزلته لا يزال تجرّه حزمة أخرى.

## المتّهمون الشائعون بالتضخّم وبدائلهم

لنستعرض بعض المتّهمين المتكرّرين وبدائلهم الأخف:

### معالجة التواريخ: من Moment.js إلى الواجهات الأصلية أو date-fns

كان Moment.js يومًا ما مكتبة التواريخ المفضّلة، لكنه ثقيل (67KB بعد التصغير) ولم يعد يُصان. وفي حالات استخدام كثيرة، تكفي JavaScript الأصلية:

```typescript
// ❌ Heavy: Using Moment.js for simple operations
import moment from 'moment';

const formatDate = (date: Date) => moment(date).format('MM/DD/YYYY');
const isToday = (date: Date) => moment(date).isSame(moment(), 'day');

// ✅ Light: Native JavaScript
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};
```

وإذا احتجت إلى عمليات تاريخ أكثر تعقيدًا، ففكّر في [date-fns](https://date-fns.org/)، فهي معيارية وقابلة لإزالة الشيفرة غير المستخدمة:

```typescript
// Only import what you need
import { format, isToday } from 'date-fns';

const formatDate = (date: Date) => format(date, 'MM/dd/yyyy');
```

### مكتبات الأدوات: من Lodash إلى التوابع الأصلية أو الاستيرادات الموجّهة

Lodash مفيدة للغاية، لكن استيراد المكتبة كاملة من أجل بضع أدوات إسراف:

```typescript
// ❌ Bad: Importing entire Lodash (70KB)
import _ from 'lodash';

const users = _.uniqBy(userList, 'id');
const grouped = _.groupBy(users, 'department');

// ✅ Better: Import specific functions
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';

const users = uniqBy(userList, 'id');
const grouped = groupBy(users, 'department');

// ✅ Best: Use native methods when possible
const users = userList.filter(
  (user, index, arr) => arr.findIndex((u) => u.id === user.id) === index,
);

const grouped = users.reduce(
  (acc, user) => {
    const dept = user.department;
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(user);
    return acc;
  },
  {} as Record<string, typeof users>,
);
```

### طلبات HTTP: من Axios إلى Fetch API

أصبح Fetch API مدعومًا على نطاق واسع ويتولّى معظم احتياجات HTTP:

```typescript
// ❌ Heavy: Axios for simple requests
import axios from 'axios';

const fetchUser = async (id: string) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

// ✅ Light: Native fetch
const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
```

وفي سيناريوهات أكثر تعقيدًا، قد تُنشئ غلافًا خفيفًا:

```typescript
// Custom fetch wrapper with error handling
const api = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
```

## تحقيق أقصى استفادة من إزالة الشيفرة الميتة

تُزيل تقنية tree-shaking الشيفرة الميتة من حزمتك، لكنها لا تعمل إلا عندما تُبنى المكتبات بوحدات ES modules وتكون استيراداتك محدّدة:

```typescript
// ❌ Bad: Entire library gets bundled
import * as utils from 'my-utils';

// ❌ Bad: May not tree-shake properly
import { debounce } from 'lodash';

// ✅ Good: Specific import that tree-shakes well
import debounce from 'lodash/debounce';

// ✅ Good: Import only what you need
import { useState, useEffect } from 'react';
```

### تهيئة Webpack لتحسين إزالة الشيفرة الميتة

تأكّد من أن تهيئة webpack لديك تدعم إزالة الشيفرة غير المستخدمة:

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false, // Only if you're sure no modules have side effects
  },
  resolve: {
    mainFields: ['es2015', 'module', 'main'], // Prefer ES modules
  },
};
```

## بناء أدواتك الخاصة

أحيانًا أفضل اعتماد هو ألّا يكون هناك اعتماد. وللأدوات البسيطة، فكّر في كتابتها بنفسك:

```typescript
// Custom debounce function (instead of importing Lodash)
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

// Custom throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let lastRun = 0;

  return (...args: Parameters<T>) => {
    if (Date.now() - lastRun >= limit) {
      func(...args);
      lastRun = Date.now();
    }
  };
}

// Custom deep clone (for simple objects)
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (Array.isArray(obj)) return obj.map(deepClone) as T;

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

> **نصيحة**
>
> قبل كتابة أدوات مخصّصة، تحقّق مما إذا كانت JavaScript الأصلية قد أضافت دعمًا لحالتك. فاللغة تتطوّر بسرعة، وكثير من الميزات التي كانت تعتمد على مكتبات أصبحت الآن مدعومة أصليًا.

## اتخاذ قرارات مدروسة

عند تقييم ما إذا كنت ستضيف اعتمادًا جديدًا، اسأل نفسك:

### تحليل القيمة مقابل التكلفة

- **كم من القيمة تقدّم هذه المكتبة؟** هل تحلّ مشكلة معقّدة أم توفّر بضعة أسطر من الشيفرة فقط؟
- **ما تكلفة الحزمة؟** تحقّق من حجم المكتبة على [Bundlephobia](https://bundlephobia.com/)
- **هل هي قابلة لإزالة الشيفرة غير المستخدمة؟** ابحث عن نُسخ ESM ودعم الاستيراد المحدّد
- **كم مرة ستستخدمها؟** قد تستحقّ مكتبة بحجم 50KB العناء إذا استخدمتها بكثافة
- **ما عبء الصيانة؟** تحقّق من وتيرة تحديث المكتبة، وعدد المشكلات، واستجابة القائمين عليها

### إطار القرار

إليك شجرة قرار بسيطة:

1. **هل أستطيع حلّ هذا بـ JavaScript الأصلية؟** → استخدم الأصلية
2. **هل هذه مشكلة معقّدة تستغرق وقتًا كبيرًا لحلّها بشكل صحيح؟** → فكّر في مكتبة
3. **هل سأستخدم ميزات متعددة من هذه المكتبة؟** → قد تستحقّ المكتبة العناء
4. **هل المكتبة مصانة جيدًا وقابلة لإزالة الشيفرة غير المستخدمة؟** → مرشّح جيد
5. **هل تبرّر القيمة تكلفة الحزمة؟** → اتخذ القرار بناءً على ميزانية أدائك

## المراقبة والصيانة

نظافة الاعتمادات ليست مهمة لمرة واحدة — بل تتطلّب انتباهًا مستمرًا:

### تدقيقات منتظمة

أعدّ فحوصات آلية في خط CI لديك:

```bash
# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit

# Analyze bundle size over time
npm run analyze
```

### ميزانيات حجم الحزمة

هيّئ webpack لتحذيرك عندما تتجاوز حزمتك حدود الحجم:

```javascript
// webpack.config.js
module.exports = {
  performance: {
    maxAssetSize: 250000, // 250KB
    maxEntrypointSize: 250000,
    hints: 'warning',
  },
};
```

### استراتيجية تحديث الاعتمادات

ليست كل التحديثات تستحقّ التبنّي فورًا. ضع في اعتبارك:

- **ترقعات الأمان**: تبنَّها فورًا
- **إصلاحات الأخطاء**: تبنَّها عند ملاءمة الوقت
- **الميزات الجديدة**: قيّم ما إذا كنت تحتاجها
- **التغييرات الجذرية**: قيّم جهد الترحيل بعناية

## دراسة حالة واقعية

دعني أشاركك مثالًا حديثًا من مشروع عملت عليه. كان لدينا لوحة تحكّم React تُحمَّل ببطء، بحزمة JavaScript تتجاوز 2MB. وهذا ما وجدناه وأصلحناه:

**قبل التحسين:**

- حجم الحزمة: 2.1MB
- زمن التحميل الأولي: 4.2s على شبكة 3G بطيئة
- الاعتمادات: 47 حزمة

**المشكلات المُحدَّدة:**

- استيراد مكتبة Lodash كاملة من أجل 3 دوال أدوات
- استخدام Moment.js لتنسيق تواريخ بسيط
- تضمين Chart.js مع أننا لم نكن نحتاج إلا رسومًا بيانية أساسية
- استيراد أيقونات Material-UI فرادى لكن بغير كفاءة

**بعد التحسين:**

- حجم الحزمة: 780KB (خفض بنسبة 63%)
- زمن التحميل الأولي: 1.8s على شبكة 3G بطيئة
- الاعتمادات: 31 حزمة

**التغييرات المُجراة:**

- استبدال Lodash بتوابع أصلية واستيرادات محدّدة
- الانتقال من Moment.js إلى `Intl.DateTimeFormat` الأصلية
- بناء مكوّنات رسوم بيانية مخصّصة باستخدام SVG وCSS
- تطبيق إزالة مناسبة للشيفرة غير المستخدمة في الأيقونات

والنتيجة؟ تطبيق أسرع كثيرًا، بأعباء صيانة أقل ومساحة سطح أمني أصغر.

## الخطوات التالية

إدارة الاعتمادات عملية مستمرة، لا وجهة نهائية. ابدأ بـ:

1. **تدقيق حزمتك الحالية** باستخدام webpack-bundle-analyzer
2. **تحديد أثقل الاعتمادات** التي تقدّم أقل قيمة
3. **استبدال اعتماد واحد في كل مرة** لتقليل المخاطر
4. **إعداد المراقبة** لاكتشاف تضخّم الحزمة مستقبلًا
5. **إنشاء إطار قرار** لتقييم الاعتمادات الجديدة
