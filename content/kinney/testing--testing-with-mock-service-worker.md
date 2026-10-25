---
title: "عامل الخدمة المُحاكى (Mock Service Worker)"
lang: ar
source: "https://stevekinney.com/courses/testing/testing-with-mock-service-worker"
---

محاكاة طلبات الشبكة الخارجية جزء حاسم من اختبار التطبيقات التي تعتمد على واجهات برمجة التطبيقات. **Mock Service Worker (MSW)** أداة قوية تتيح لك اعتراض طلبات الشبكة ومحاكاتها على مستوى الشبكة. عند دمجها مع **Vitest**، إطار اختبار JavaScript سريع وحديث، يمكنك إنشاء اختبارات متينة وموثوقة لتطبيقاتك.

يستكشف هذا المقال كيفية استخدام MSW مع Vitest لمحاكاة نداءات واجهات برمجة التطبيقات بفعالية. سنغطي الإعداد والتنفيذ وأفضل الممارسات والمزالق المحتملة، بما يساعدك على فهم كيفية دمج MSW في استراتيجية الاختبار لديك.

## ما هو Mock Service Worker (MSW)؟

MSW مكتبة JavaScript تتيح لك محاكاة طلبات واجهات برمجة التطبيقات باعتراضها على مستوى الشبكة. تعمل في بيئتي المتصفح وNode.js معًا، ما يتيح لك:

- محاكاة واجهات REST وGraphQL.
- محاكاة استجابات خادم مختلفة، بما في ذلك الأخطاء.
- إبقاء اختباراتك قريبة من السيناريوهات الواقعية عبر عدم تغيير الشيفرة الفعلية التي تجري الطلبات.

## لماذا تستخدم MSW مع Vitest؟

- **المحاكاة على مستوى الشبكة**: تعترض MSW طلبات الشبكة الفعلية، ما يوفر ظروف اختبار أكثر واقعية.
- **المرونة**: محاكاة استجابات مختلفة بسهولة دون تغيير الشيفرة قيد الاختبار.
- **قابلية الصيانة**: أبقِ اختباراتك نظيفة بتجنب البدائل المُحاكاة المضمّنة في الشيفرة أو إعدادات المحاكاة المعقدة.
- **الاتساق**: استخدم نهج المحاكاة نفسه لبيئتي التطوير والاختبار.

## إعداد MSW مع Vitest

### تثبيت MSW

```bash
npm install --save-dev msw
```

### تهيئة MSW في مشروعك

أنشئ دليل `src/mocks` وأعدّ المعالجات (handlers) لنقاط نهاية واجهة برمجة التطبيقات لديك.

**مثال: تعريف المعالجات**

```javascript
// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Mock a GET request to /api/user
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: '123', name: 'John Doe' }));
  }),
  // Mock a POST request to /api/login
  rest.post('/api/login', (req, res, ctx) => {
    const { username } = req.body;
    return res(ctx.status(200), ctx.json({ message: `Welcome, ${username}!` }));
  }),
];
```

### إعداد الخادم للاختبار

أنشئ ملفًا لتهيئة خادم MSW للاختبار.

```javascript
// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(…handlers);
```

### تهيئة Vitest لاستخدام MSW

في ملف إعداد اختباراتك (مثل `setupTests.js`)، ابدأ الخادم قبل تشغيل الاختبارات ونظّف بعده.

```javascript
// setupTests.js
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/server';

// Start the server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
```

حدّث `vitest.config.js` لتضمين ملف الإعداد:

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
});
```

## كتابة الاختبارات باستخدام MSW وVitest

### مثال: اختبار مكوّن يجلب البيانات

افترض أن لديك مكوّن React يجلب بيانات المستخدم:

```jsx
// UserProfile.jsx
import React, { useEffect, useState } from 'react';

export function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <div>Loading…</div>;

  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}
```

**ملف الاختبار:**

```jsx
// UserProfile.test.jsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UserProfile } from './UserProfile';

test('renders user profile after fetching data', async () => {
  // Render the component
  render(<UserProfile />);

  // Verify loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the user data to be displayed
  const userName = await screen.findByText('John Doe');
  expect(userName).toBeInTheDocument();
});
```

**الشرح:**

- يُصيّر الاختبار مكوّن `UserProfile`.
- يتحقق من حالة التحميل.
- يستخدم `findByText` للانتظار حتى التحديث غير المتزامن.
- تعترض MSW طلب `/api/user` وتعيد الاستجابة المُحاكاة المعرّفة في `handlers.js`.

### مثال: اختبار معالجة الأخطاء

يمكنك محاكاة استجابات الأخطاء لاختبار كيفية تعامل مكوّنك مع الإخفاقات.

**عدّل الاختبار:**

```jsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { rest } from 'msw';
import { server } from '../mocks/server';
import { UserProfile } from './UserProfile';

test('handles server error', async () => {
  // Override the default handler for this test
  server.use(
    rest.get('/api/user', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<UserProfile />);

  // Wait for error message
  const errorMessage = await screen.findByText(/failed to load user/i);
  expect(errorMessage).toBeInTheDocument();
});
```

**الشرح:**

- **`server.use(…)`**: يتجاوز معالج `/api/user` لهذا الاختبار، محاكيًا خطأ خادم.
- ينبغي أن يتعامل المكوّن مع الخطأ ويعرض رسالة مناسبة.
- يتحقق الاختبار من عرض رسالة الخطأ.

## أفضل الممارسات مع MSW

### تمركز معالجات الطلبات

عرّف كل معالجات طلباتك في مكان واحد (`handlers.js`) للحفاظ على تنظيم بدائلك المُحاكاة.

**الفوائد:**

- **قابلية الصيانة**: تحديث استجابات المحاكاة وإدارتها أسهل.
- **قابلية إعادة الاستخدام**: يمكن إعادة استخدام المعالجات عبر اختبارات متعددة.

### استخدم معالجات طلبات سياقية لاختبارات محددة

تجاوز المعالجات داخل الاختبارات لمحاكاة سيناريوهات مختلفة.

```javascript
server.use(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ error: 'User not found' }));
  }),
);
```

**الفوائد:**

- **المرونة**: اختبر الحالات الطرفية وظروف الأخطاء دون التأثير في الاختبارات الأخرى.
- **العزل**: لا تؤثر التغييرات في المعالجات داخل اختبار واحد على الآخرين.

### تحقق من الطلبات في الاختبارات

يمكنك التحقق من أن طلبات معينة جرى إرسالها بمعاملات متوقعة.

```javascript
import { expect, test } from 'vitest';
import { rest } from 'msw';
import { server } from '../mocks/server';

test('submits form data correctly', async () => {
  let requestBody;

  server.use(
    rest.post('/api/submit', (req, res, ctx) => {
      requestBody = req.body;
      return res(ctx.status(200));
    }),
  );

  // … render component and trigger form submission …

  expect(requestBody).toEqual({ name: 'Alice', age: 30 });
});
```

### تعامل مع الطلبات غير المعالجة

هيّئ MSW لتنبيهك إلى الطلبات غير المعالجة، بما يساعد في اكتشاف المعالجات المفقودة.

```javascript
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
```

خيارات `onUnhandledRequest`:

- `'bypass'`: السلوك الافتراضي، تمضي الطلبات غير المعالجة كما هي.
- `'warn'`: يسجّل تحذيرًا للطلبات غير المعالجة.
- `'error'`: يرفع خطأ للطلبات غير المعالجة.

### استخدم TypeScript لأمان أنواع أفضل (اختياري)

إذا كنت تستخدم TypeScript، توفر MSW تعريفات أنواع لتحسين تجربة التطوير لديك.

## المزالق المحتملة وكيفية تجنبها

### نسيان إعادة تعيين المعالجات

**المشكلة**: تستمر المعالجات المتجاوَزة عبر الاختبارات، ما يسبب سلوكًا غير متوقع.

**الحل**:

- استخدم `server.resetHandlers()` في `afterEach` لإعادة تعيين المعالجات بعد كل اختبار.

```javascript
afterEach(() => server.resetHandlers());
```

### محاكاة استجابات منسّقة بشكل خاطئ

**المشكلة**: إرجاع استجابات لا تطابق التنسيق المتوقع قد يسبب فشل الاختبارات.

**الحل**:

- تأكد من أن الاستجابات المُحاكاة تطابق الشكل والبنية المتوقعين من الشيفرة قيد الاختبار.

### تجاهل الطلبات غير المعالجة

**المشكلة**: يمكن أن تؤدي المعالجات المفقودة لنداءات واجهة برمجة التطبيقات إلى طلبات غير معالجة، ما يجعل الاختبارات تنجح حين ينبغي أن تفشل.

**الحل**:

- اضبط `onUnhandledRequest` على `'error'` أثناء الاختبار لاكتشاف الطلبات غير المعالجة.

### الإفراط في المحاكاة

**المشكلة**: قد يؤدي الإفراط في المحاكاة إلى اختبارات لا تعكس السلوك الواقعي.

**الحل**:

- حاكِ طلبات الشبكة الخارجية فقط.
- تجنب محاكاة الدوال أو الوحدات الداخلية دون داعٍ.

## أمثلة عملية

### اختبار مكوّن بنداءات متعددة لواجهة برمجة التطبيقات

```jsx
// Dashboard.jsx
import React, { useEffect, useState } from 'react';

export function Dashboard() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(setUser);

    fetch('/api/notifications')
      .then((res) => res.json())
      .then(setNotifications);
  }, []);

  if (!user || notifications.length === 0) return <div>Loading…</div>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}
```

**المعالجات:**

```javascript
// handlers.js
export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: '123', name: 'Alice' }));
  }),
  rest.get('/api/notifications', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', message: 'Notification 1' },
        { id: '2', message: 'Notification 2' },
      ]),
    );
  }),
];
```

**الاختبار:**

```jsx
// Dashboard.test.jsx
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Dashboard } from './Dashboard';

test('renders user and notifications', async () => {
  render(<Dashboard />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  const welcomeMessage = await screen.findByText(/welcome, alice/i);
  expect(welcomeMessage).toBeInTheDocument();

  const notificationItems = await screen.findAllByRole('listitem');
  expect(notificationItems).toHaveLength(2);
});
```

**الشرح:**

- تتعامل MSW مع طلبي `/api/user` و`/api/notifications` معًا.
- يتحقق الاختبار من تصيير بيانات المستخدم والإشعارات معًا بشكل صحيح.

## الخلاصة {#conclusion}

استخدام Mock Service Worker مع Vitest يوفر طريقة قوية ومرنة لمحاكاة طلبات الشبكة في اختباراتك. باعتراض الطلبات على مستوى الشبكة، تتيح لك MSW إنشاء اختبارات واقعية وقابلة للصيانة تحاكي سلوك التطبيق الفعلي عن كثب.

### النقاط الرئيسية

#### فوائد MSW

- تحاكي طلبات الشبكة على مستوى الشبكة.
- تعمل بسلاسة في بيئتي المتصفح وNode.js معًا.
- تبسّط اختبار المكوّنات التي تعتمد على واجهات برمجة تطبيقات خارجية.

#### أفضل الممارسات {#best-practices}

- مركّز معالجات الطلبات من أجل قابلية الصيانة.
- استخدم معالجات سياقية لمحاكاة سيناريوهات مختلفة.
- تحقق من الطلبات والاستجابات داخل الاختبارات.
- تعامل مع الطلبات غير المعالجة لاكتشاف المعالجات المفقودة.

#### تجنب المزالق

- أعد تعيين المعالجات بين الاختبارات لمنع التلوث بينها.
- تأكد من أن الاستجابات المُحاكاة تطابق التنسيقات المتوقعة.
- كن حذرًا من الإفراط في المحاكاة.

بدمج MSW في سير عمل الاختبار لديك مع Vitest، يمكنك تحسين موثوقية اختباراتك ومتانتها، بما يؤدي في النهاية إلى تطبيقات أعلى جودة.

### متى تستخدم MSW

- **المكوّنات المعتمدة على واجهات برمجة التطبيقات**: عند اختبار مكوّنات تجري طلبات HTTP إلى واجهات خارجية.
- **سيناريوهات معالجة الأخطاء**: لمحاكاة أخطاء الخادم واختبار كيفية استجابة تطبيقك.
- **بنى استجابات معقدة**: عند التعامل مع استجابات واجهة برمجة تطبيقات معقدة أو كبيرة يكون محاكاتها يدويًا مرهقًا.

### القيود المحتملة

- **منحنى التعلم**: يتطلب فهم كيفية اعتراض MSW للطلبات وكيفية تهيئة المعالجات.
- **عبء الإعداد**: قد يكون الإعداد الأولي أكثر تعقيدًا مقارنة بالمحاكاة البسيطة، لكنه يثمر على المدى الطويل.
