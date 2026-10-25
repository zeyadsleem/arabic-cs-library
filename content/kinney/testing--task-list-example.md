---
title: "بناء قائمة مهام باستخدام Vitest"
lang: ar
source: "https://stevekinney.com/courses/testing/task-list-example"
---

## بناء تطبيق قائمة مهام في React بالتطوير المدفوع بالاختبارات مع Vitest

**جدول المحتويات**

1. [المقدمة](#introduction)
2. [المتطلبات المسبقة](#prerequisites)
3. [تهيئة المشروع](#project-setup)
4. [فهم التطوير المدفوع بالاختبارات](#understanding-test-driven-development)
5. [تهيئة React مع Vitest](#setting-up-react-with-vitest)
6. [تصميم تطبيق قائمة المهام](#designing-the-to-do-list-application)
7. [تنفيذ التطبيق بالتطوير المدفوع بالاختبارات](#implementing-the-application-with-tdd) [1. إنشاء مكوّن `ToDoList`](#creating-the-todolist-component) [2. جلب المهام من واجهة برمجة تطبيقات](#fetching-to-dos-from-an-api) [3. إضافة مهمة جديدة](#adding-a-new-to-do) [4. تعليم مهمة كمكتملة](#marking-a-to-do-as-completed) [5. حذف مهمة](#deleting-a-to-do)
  - [1. إنشاء مكوّن `ToDoList`](#creating-the-todolist-component)
  - [2. جلب المهام من واجهة برمجة تطبيقات](#fetching-to-dos-from-an-api)
  - [3. إضافة مهمة جديدة](#adding-a-new-to-do)
  - [4. تعليم مهمة كمكتملة](#marking-a-to-do-as-completed)
  - [5. حذف مهمة](#deleting-a-to-do)
8. [محاكاة واجهة برمجة التطبيقات باستخدام MSW](#mocking-the-api-with-msw)
9. [تشغيل الاختبارات](#running-the-tests)
10. [الخلاصة](#conclusion)
11. [تمارين إضافية](#additional-exercises)

---

### المقدمة {#introduction}

في هذا الدليل سنبني تطبيق **قائمة مهام** باستخدام **التطوير المدفوع بالاختبارات (TDD)** مع **React** و**Vitest**، إطار اختبار JavaScript حديث. سيتفاعل التطبيق مع واجهة برمجة تطبيقات لجلب عناصر المهام وإضافتها وتحديثها وحذفها. سنحاكي واجهة برمجة التطبيقات باستخدام **Mock Service Worker (MSW)** لمحاكاة استجابات الخادم أثناء الاختبار.

**الأهداف:**

- تعلّم كيفية تطبيق التطوير المدفوع بالاختبارات في تطبيق React.
- فهم كيفية كتابة اختبارات الوحدات واختبارات التكامل باستخدام Vitest وReact Testing Library.
- استخدام MSW لمحاكاة تفاعلات واجهة برمجة التطبيقات في الاختبارات.
- تطوير تطبيق قائمة مهام بمزايا مثل جلب المهام وإضافة مهام جديدة وتعليم المهام كمكتملة وحذف المهام.

### المتطلبات المسبقة {#prerequisites}

- معرفة أساسية بـ JavaScript (صيغة ES6+) وReact.
- إلمام بـ Node.js وnpm.
- فهم مفاهيم اختبار الوحدات.
- Node.js وnpm مثبّتان على جهازك.

### تهيئة المشروع {#project-setup}

1. **أنشئ تطبيق React جديدًا باستخدام Vite** سنستخدم **Vite** لتهيئة تطبيق React بسرعة. <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> create</span><span style="color:#ECC48D"> vite@latest</span><span style="color:#ECC48D"> todo-app-tdd</span><span style="color:#82AAFF"> --</span><span style="color:#82AAFF"> --template</span><span style="color:#ECC48D"> react</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> todo-app-tdd</span></span></code>
2. **ثبّت الاعتمادات** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span></span></code>
3. **ثبّت Vitest والحزم ذات الصلة** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span><span style="color:#ECC48D"> @testing-library/react</span><span style="color:#ECC48D"> @testing-library/jest-dom</span><span style="color:#ECC48D"> jsdom</span><span style="color:#ECC48D"> msw</span></span></code> `vitest`: إطار الاختبار. `@testing-library/react`: أدوات مساعدة لاختبار مكوّنات React. `@testing-library/jest-dom`: مطابقات Jest مخصصة لـ DOM. `jsdom`: يحاكي بيئة متصفح لـ Node.js. `msw`: Mock Service Worker لمحاكاة واجهة برمجة التطبيقات.
  - `vitest`: إطار الاختبار.
  - `@testing-library/react`: أدوات مساعدة لاختبار مكوّنات React.
  - `@testing-library/jest-dom`: مطابقات Jest مخصصة لـ DOM.
  - `jsdom`: يحاكي بيئة متصفح لـ Node.js.
  - `msw`: Mock Service Worker لمحاكاة واجهة برمجة التطبيقات.
4. **بنية المشروع** <code><span class="line"><span style="color:#D6DEEB">todo</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">app</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── node_modules</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── public</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── components</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── App</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">jsx</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── main</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">jsx</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── index</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">css</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── mocks</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vite</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">└── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code>

### فهم التطوير المدفوع بالاختبارات {#understanding-test-driven-development}

**التطوير المدفوع بالاختبارات (TDD)** مقاربة لتطوير البرمجيات تقوم فيها بما يلي:

1. **اكتب اختبارًا**: اكتب اختبارًا للجزء التالي من الوظائف الذي تريد إضافته.
2. **شغّل الاختبار وشاهده يفشل**: يضمن أن الاختبار يكتشف غياب الوظيفة.
3. **اكتب أقل شيفرة تجعل الاختبار ينجح**: نفّذ شيفرة كافية فقط لجعل الاختبار ينجح.
4. **أعد الهيكلة**: حسّن الشيفرة مع إبقاء الاختبارات ناجحة.
5. **كرّر**: تابع مع الوظيفة التالية.

غالبًا ما تُسمّى هذه الدورة **الأحمر-الأخضر-إعادة الهيكلة** (Red-Green-Refactor).

### تهيئة React مع Vitest {#setting-up-react-with-vitest}

1. **هيّئ Vitest** أنشئ ملف `vitest.config.js` في الدليل الجذر: <code><span class="line"><span style="color:#637777;font-style:italic">// vitest.config.js</span></span>
<span class="line"><span style="color:#C792EA;font-style:italic">import</span><span style="color:#D6DEEB"> { defineConfig } </span><span style="color:#C792EA;font-style:italic">from</span><span style="color:#D9F5DD"> '</span><span style="color:#ECC48D">vitest/config</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">;</span></span>
<span class="line"><span style="color:#C792EA;font-style:italic">import</span><span style="color:#D6DEEB"> react </span><span style="color:#C792EA;font-style:italic">from</span><span style="color:#D9F5DD"> '</span><span style="color:#ECC48D">@vitejs/plugin-react</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;font-style:italic">export</span><span style="color:#C792EA;font-style:italic"> default</span><span style="color:#82AAFF;font-style:italic"> defineConfig</span><span style="color:#D6DEEB">({</span></span>
<span class="line"><span style="color:#D6DEEB"> plugins: [</span><span style="color:#82AAFF;font-style:italic">react</span><span style="color:#D6DEEB">()],</span></span>
<span class="line"><span style="color:#D6DEEB"> test: {</span></span>
<span class="line"><span style="color:#D6DEEB"> globals: </span><span style="color:#FF5874">true</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#D6DEEB"> environment: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">jsdom</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#D6DEEB"> setupFiles: </span><span style="color:#D9F5DD">'</span><span style="color:#ECC48D">./tests/setupTests.js</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#D6DEEB"> },</span></span>
<span class="line"><span style="color:#D6DEEB">});</span></span></code>
2. **أنشئ ملف تهيئة للاختبارات** أنشئ `tests/setupTests.js` لإعداد أدوات الاختبار: <code><span class="line"><span style="color:#637777;font-style:italic">// tests/setupTests.js</span></span>
<span class="line"><span style="color:#C792EA;font-style:italic">import</span><span style="color:#D9F5DD"> '</span><span style="color:#ECC48D">@testing-library/jest-dom</span><span style="color:#D9F5DD">'</span><span style="color:#D6DEEB">;</span></span></code>
3. **حدّث سكربتات `package.json`** <code><span class="line"><span style="color:#D6DEEB">{</span></span>
<span class="line"><span style="color:#7FDBCA"> "scripts"</span><span style="color:#D6DEEB">: {</span></span>
<span class="line"><span style="color:#7FDBCA"> "dev"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">vite</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "build"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">vite build</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "preview"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">vite preview</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "test"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">vitest</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "test:watch"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">vitest --watch</span><span style="color:#D9F5DD">"</span><span style="color:#D6DEEB">,</span></span>
<span class="line"><span style="color:#7FDBCA"> "coverage"</span><span style="color:#D6DEEB">: </span><span style="color:#D9F5DD">"</span><span style="color:#C789D6">vitest run --coverage</span><span style="color:#D9F5DD">"</span></span>
<span class="line"><span style="color:#D6DEEB"> }</span></span>
<span class="line"><span style="color:#D6DEEB">}</span></span></code>

### تصميم تطبيق قائمة المهام {#designing-the-to-do-list-application}

**المزايا:**

- عرض قائمة من عناصر المهام المجلوبة من واجهة برمجة تطبيقات.
- إضافة عنصر مهمة جديد.
- تعليم عنصر مهمة كمكتمل.
- حذف عنصر مهمة.

**نقاط نهاية واجهة برمجة التطبيقات:**

- `GET /api/todos`: جلب كل المهام.
- `POST /api/todos`: إضافة مهمة جديدة.
- `PUT /api/todos/:id`: تحديث مهمة.
- `DELETE /api/todos/:id`: حذف مهمة.

### تنفيذ التطبيق بالتطوير المدفوع بالاختبارات {#implementing-the-application-with-tdd}

#### إنشاء مكوّن `ToDoList`

##### الخطوة 1: اكتب الاختبار (الأحمر)

أنشئ `src/tests/ToDoList.test.jsx`:

```jsx
// src/tests/ToDoList.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ToDoList } from '../components/ToDoList';

const mockTodos = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
];

const server = setupServer(
  rest.get('/api/todos', (req, res, ctx) => {
    return res(ctx.json(mockTodos));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders to-do items fetched from API', async () => {
  render(<ToDoList />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  const items = await screen.findAllByRole('listitem');
  expect(items).toHaveLength(2);
  expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  expect(screen.getByText('Walk the dog')).toBeInTheDocument();
});
```

**الشرح:**

- نُهيّئ خادم MSW لمحاكاة استجابة واجهة برمجة التطبيقات.
- يتحقق الاختبار من ظهور مؤشر التحميل.
- ينتظر تصيير عناصر المهام.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm run test
```

يفشل الاختبار لأن مكوّن `ToDoList` غير موجود.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

أنشئ `src/components/ToDoList.jsx`:

```jsx
// src/components/ToDoList.jsx
import React, { useEffect, useState } from 'react';

export function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title} {todo.completed ? '(Completed)' : ''}
        </li>
      ))}
    </ul>
  );
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن ينجح الاختبار.

##### الخطوة 5: أعد الهيكلة (إن لزم)

لا حاجة إلى إعادة هيكلة فورية.

#### جلب المهام من واجهة برمجة تطبيقات {#fetching-to-dos-from-an-api}

سبق أن نفّذنا جلب المهام في الخطوة السابقة.

#### إضافة مهمة جديدة {#adding-a-new-to-do}

##### الخطوة 1: اكتب الاختبار (الأحمر)

حدّث `src/tests/ToDoList.test.jsx`:

```jsx
import userEvent from '@testing-library/user-event';

// … previous imports and setup …

test('adds a new to-do item', async () => {
  render(<ToDoList />);

  const input = screen.getByPlaceholderText('Add new to-do');
  const addButton = screen.getByRole('button', { name: /add/i });

  await userEvent.type(input, 'Learn TDD');
  await userEvent.click(addButton);

  // Mock the POST request
  server.use(
    rest.post('/api/todos', (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ id: 3, title: 'Learn TDD', completed: false }));
    })
  );

  // Mock the updated GET request
  server.use(
    rest.get('/api/todos', (req, res, ctx) => {
      return res(ctx.json([…mockTodos, { id: 3, title: 'Learn TDD', completed: false }]));
    })
  );

  const newItem = await screen.findByText('Learn TDD');
  expect(newItem).toBeInTheDocument();
});
```

**الشرح:**

- نحاكي الكتابة في المُدخل والنقر على زر الإضافة.
- نحاكي طلب POST وطلب GET التالي ليشمل العنصر الجديد.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm run test
```

يفشل الاختبار لأن المُدخل والزر غير موجودين.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

حدّث `src/components/ToDoList.jsx`:

```jsx
import React, { useEffect, useState } from 'react';

export function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }

  function addTodo() {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    }).then(() => {
      setNewTodo('');
      fetchTodos();
    });
  }

  if (loading) return <div>Loading…</div>;

  return (
    <div>
      <input
        placeholder="Add new to-do"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '(Completed)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن ينجح الاختبار.

##### الخطوة 5: أعد الهيكلة (إن لزم)

فكّر في معالجة الأخطاء وتحسين تحديثات الحالة.

#### تعليم مهمة كمكتملة {#marking-a-to-do-as-completed}

##### الخطوة 1: اكتب الاختبار (الأحمر)

حدّث `src/tests/ToDoList.test.jsx`:

```jsx
test('marks a to-do item as completed', async () => {
  render(<ToDoList />);

  const itemCheckbox = await screen.findByRole('checkbox', { name: 'Buy groceries' });
  expect(itemCheckbox).not.toBeChecked();

  // Mock the PUT request
  server.use(
    rest.put('/api/todos/1', (req, res, ctx) => {
      return res(ctx.json({ id: 1, title: 'Buy groceries', completed: true }));
    }),
  );

  await userEvent.click(itemCheckbox);

  expect(itemCheckbox).toBeChecked();
});
```

**الشرح:**

- نجد مربع الاختيار المرتبط بعنصر المهمة.
- نحاكي طلب PUT لتحديث عنصر المهمة.
- نحاكي النقر على مربع الاختيار ونتحقق من أنه محدّد.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm run test
```

يفشل الاختبار لأن مربع الاختيار غير موجود.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

حدّث `src/components/ToDoList.jsx`:

```jsx
function toggleComplete(todo) {
  fetch(`/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ …todo, completed: !todo.completed }),
  }).then(() => {
    fetchTodos();
  });
}

// … in the return statement …

<ul>
  {todos.map((todo) => (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo)}
          aria-label={todo.title}
        />
        {todo.title}
      </label>
    </li>
  ))}
</ul>
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن ينجح الاختبار.

##### الخطوة 5: أعد الهيكلة (إن لزم)

حسّن `fetchTodos` لتجنّب طلبات الشبكة غير الضرورية.

#### حذف مهمة {#deleting-a-to-do}

##### الخطوة 1: اكتب الاختبار (الأحمر)

حدّث `src/tests/ToDoList.test.jsx`:

```jsx
test('deletes a to-do item', async () => {
  render(<ToDoList />);

  const deleteButton = await screen.findByRole('button', { name: 'Delete Buy groceries' });

  // Mock the DELETE request
  server.use(
    rest.delete('/api/todos/1', (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );

  // Mock the updated GET request
  server.use(
    rest.get('/api/todos', (req, res, ctx) => {
      return res(ctx.json(mockTodos.filter((todo) => todo.id !== 1)));
    })
  );

  await userEvent.click(deleteButton);

  expect(screen.queryByText('Buy groceries')).not toBeInTheDocument();
});
```

**الشرح:**

- نحدّد زر الحذف لعنصر مهمة معيّن.
- نحاكي طلب `DELETE` وطلب `GET` التالي.
- بعد النقر على الحذف، نتحقق من أن العنصر المحذوف لم يعد مُصيَّرًا.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm run test
```

يفشل الاختبار لأن المكوّن لا يصيّر زر حذف بعد.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

حدّث `src/components/ToDoList.jsx`:

```jsx
function deleteTodo(id) {
  fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  }).then(() => {
    fetchTodos();
  });
}

// … in the return statement …

<ul>
  {todos.map((todo) => (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo)}
          aria-label={todo.title}
        />
        {todo.title}
      </label>
      <button onClick={() => deleteTodo(todo.id)} aria-label={`Delete ${todo.title}`}>
        Delete
      </button>
    </li>
  ))}
</ul>;
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن ينجح الاختبار.

##### الخطوة 5: أعد الهيكلة (إن لزم)

فكّر في استخراج استدعاءات واجهة برمجة التطبيقات إلى وحدة خدمة صغيرة إن بدأ المكوّن يتولّى مسؤوليات كثيرة.

### محاكاة واجهة برمجة التطبيقات باستخدام MSW {#mocking-the-api-with-msw}

يتيح لك **Mock Service Worker (MSW)** اختبار المكوّن في مواجهة سلوك شبكي واقعي دون تغيير شيفرة الإنتاج. استخدمنا في هذا الدليل:

- `setupServer` من `msw/node` لاعتراض الطلبات في بيئة الاختبار.
- `server.use(...)` لتجاوز المعالجات في حالة اختبار واحدة.
- معالجات `GET` و`POST` و`PUT` و`DELETE` مُحاكاة لمحاكاة سير عمل المهام الكامل.

يمنحك ذلك ثقة بأن واجهة المستخدم تتصرف بشكل صحيح عبر حالات التحميل والإنشاء والتحديث والحذف مع إبقاء الاختبارات حتمية.

### تشغيل الاختبارات {#running-the-tests}

شغّل كل الاختبارات بالأمر:

```bash
npm run test
```

سينفّذ Vitest مجموعة الاختبارات، ويمكنك استخدام `npm run test -- --watch` أثناء التكرار خلال التطوير.

### الخلاصة {#conclusion}

باتباع مبادئ التطوير المدفوع بالاختبارات، بنينا تطبيق مهام React كاملًا سلوكًا واحدًا في كل مرة. قاد كل اختبار جزءًا محدّدًا من الوظائف، من تحميل البيانات الأولية إلى إضافة المهام وتحديثها وحذفها.

**الخلاصات الرئيسية:**

- **TDD يبقي النطاق مركّزًا:** منحنا كل اختبار فاشل سلوكًا واحدًا ملموسًا لتنفيذه.
- **Vitest يعمل جيدًا مع تطبيقات React:** يوفر تغذية راجعة سريعة ويتكامل بنظافة مع Testing Library.
- **MSW يجعل اختبارات واجهة المستخدم الشبكية عملية:** يمكنك اختبار تدفقات طلبات واقعية دون الاعتماد على واجهة برمجة تطبيقات حيّة.

### تمارين إضافية {#additional-exercises}

لتوسيع هذا المشروع والاستمرار في تدريب مهاراتك في الاختبار، جرّب إضافة:

1. **التصفية** أضف مرشّحات لكل المهام والنشطة والمكتملة. اكتب اختبارات للتحقق من ظهور المهام الصحيحة في كل عرض.
  - أضف مرشّحات لكل المهام والنشطة والمكتملة.
  - اكتب اختبارات للتحقق من ظهور المهام الصحيحة في كل عرض.
2. **تحرير المهام الموجودة** اسمح للمستخدمين بإعادة تسمية مهمة في مكانها. اكتب اختبارات لسلوك الحفظ والإلغاء.
  - اسمح للمستخدمين بإعادة تسمية مهمة في مكانها.
  - اكتب اختبارات لسلوك الحفظ والإلغاء.
3. **معالجة الأخطاء** اعرض رسالة خطأ عندما يفشل طلب إلى واجهة برمجة التطبيقات. اكتب اختبارات لطلبات `GET` و`POST` و`PUT` و`DELETE` الفاشلة.
  - اعرض رسالة خطأ عندما يفشل طلب إلى واجهة برمجة التطبيقات.
  - اكتب اختبارات لطلبات `GET` و`POST` و`PUT` و`DELETE` الفاشلة.
4. **التحديثات المتفائلة** حدّث واجهة المستخدم قبل اكتمال رحلة الشبكة. اكتب اختبارات تؤكد أن واجهة المستخدم تتراجع بشكل صحيح عند الفشل.
  - حدّث واجهة المستخدم قبل اكتمال رحلة الشبكة.
  - اكتب اختبارات تؤكد أن واجهة المستخدم تتراجع بشكل صحيح عند الفشل.
5. **الاستمرارية** احفظ القائمة محليًا باستخدام `localStorage` أو اربطها بخادم حقيقي. اكتب اختبارات تتحقق من استعادة المهام بشكل صحيح.
  - احفظ القائمة محليًا باستخدام `localStorage` أو اربطها بخادم حقيقي.
  - اكتب اختبارات تتحقق من استعادة المهام بشكل صحيح.
6. **تحسينات إمكانية الوصول** حسّن دعم لوحة المفاتيح وتغذية قارئ الشاشة الراجعة. أضف اختبارات تتحقق من الأسماء والحالات المتاحة.
  - حسّن دعم لوحة المفاتيح وتغذية قارئ الشاشة الراجعة.
  - أضف اختبارات تتحقق من الأسماء والحالات المتاحة.
7. **البحث** أضف حقل بحث لتصفية المهام حسب النص. اكتب اختبارات تؤكد أن المطابقات الجزئية تتصرف بشكل صحيح.
  - أضف حقل بحث لتصفية المهام حسب النص.
  - اكتب اختبارات تؤكد أن المطابقات الجزئية تتصرف بشكل صحيح.
8. **الإجراءات الجماعية** أضف عناصر تحكم لإكمال أو حذف عدة مهام دفعة واحدة. اكتب اختبارات لحالات الاختيار المختلطة والتحديثات الدفعية.
  - أضف عناصر تحكم لإكمال أو حذف عدة مهام دفعة واحدة.
  - اكتب اختبارات لحالات الاختيار المختلطة والتحديثات الدفعية.
