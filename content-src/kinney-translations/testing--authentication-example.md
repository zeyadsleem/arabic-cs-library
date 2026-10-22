---
title: "اختبار المصادقة باستخدام Vitest"
---

## بناء نظام مصادقة باستخدام التطوير الموجّه بالاختبارات مع Express وVitest

**جدول المحتويات**

1. [المقدمة](#introduction)
2. [المتطلبات المسبقة](#prerequisites)
3. [إعداد المشروع](#project-setup)
4. [فهم التطوير الموجّه بالاختبارات](#understanding-test-driven-development)
5. [تصميم نظام المصادقة](#designing-the-authentication-system)
6. [تنفيذ النظام باستخدام TDD](#implementing-the-system-with-tdd) [1. تسجيل المستخدم](#user-registration) [2. تسجيل دخول المستخدم](#user-login) [3. تسجيل خروج المستخدم](#user-logout)
  - [1. تسجيل المستخدم](#user-registration)
  - [2. تسجيل دخول المستخدم](#user-login)
  - [3. تسجيل خروج المستخدم](#user-logout)
7. [مجالات التركيز في الاختبار](#testing-focus-areas) [اختبارات الوحدات: التحقق من النماذج وطرق التشفير](#unit-tests-form-validation-and-encryption-methods) [اختبارات التكامل: نقاط نهاية API للمصادقة](#integration-tests-api-endpoints-for-authentication) [اختبارات الأمان: التعامل مع رموز المصادقة](#security-tests-handling-authentication-tokens)
  - [اختبارات الوحدات: التحقق من النماذج وطرق التشفير](#unit-tests-form-validation-and-encryption-methods)
  - [اختبارات التكامل: نقاط نهاية API للمصادقة](#integration-tests-api-endpoints-for-authentication)
  - [اختبارات الأمان: التعامل مع رموز المصادقة](#security-tests-handling-authentication-tokens)
8. [تشغيل الاختبارات](#running-the-tests)
9. [الخلاصة](#conclusion)
10. [تمارين إضافية](#additional-exercises)

### المقدمة

بناء نظام مصادقة آمن جانبًا بالغ الأهمية في كثير من تطبيقات الويب. في هذا الدليل، سنطوّر نظام مصادقة بسيطًا باستخدام **التطوير الموجّه بالاختبارات (TDD)** مع **Express** (إطار تطبيقات ويب لـ Node.js) و**Vitest**، إطار اختبارات JavaScript حديث.

**الأهداف:**

- تعلّم كيفية تطبيق TDD في بناء نظام مصادقة.
- فهم كيفية كتابة اختبارات الوحدات والتكامل والأمان باستخدام Vitest.
- تنفيذ وظائف تسجيل المستخدم وتسجيل الدخول وتسجيل الخروج.
- ضمان التعامل الصحيح مع رموز المصادقة.

### المتطلبات المسبقة

- معرفة أساسية بـ JavaScript (صياغة ES6+) وNode.js.
- إلمام بـ Express.js.
- فهم مفاهيم اختبار الوحدات وTDD.
- تثبيت Node.js وnpm على جهازك.

### إعداد المشروع

1. **أنشئ دليل مشروع جديدًا** <code><span class="line"><span style="color:#82AAFF;font-style:italic">mkdir</span><span style="color:#ECC48D"> auth-system-tdd</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> auth-system-tdd</span></span></code>
2. **هيّئ npm** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> init</span><span style="color:#82AAFF"> -y</span></span></code>
3. **ثبّت الاعتمادات** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#ECC48D"> express</span><span style="color:#ECC48D"> bcrypt</span><span style="color:#ECC48D"> jsonwebtoken</span></span></code> `express`: إطار تطبيقات ويب. `bcrypt`: لتجزئة كلمات المرور. `jsonwebtoken`: لتوليد رموز JWT والتحقق منها.
  - `express`: إطار تطبيقات ويب.
  - `bcrypt`: لتجزئة كلمات المرور.
  - `jsonwebtoken`: لتوليد رموز JWT والتحقق منها.
4. **ثبّت اعتمادات التطوير** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span><span style="color:#ECC48D"> supertest</span></span></code> `vitest`: إطار اختبارات. `supertest`: لاختبار نقاط نهاية HTTP.
  - `vitest`: إطار اختبارات.
  - `supertest`: لاختبار نقاط نهاية HTTP.
5. **بنية المشروع** <code><span class="line"><span style="color:#D6DEEB">auth</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">system</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── app</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── routes</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ │ └── auth</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── controllers</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ │ └── authController</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── models</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── user</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">└── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> ├── unit</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> │ └── auth</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB"> └── integration</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> └── auth</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">integration</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code> `src/`: يحتوي على شيفرة التطبيق. `tests/`: يحتوي على ملفات الاختبار.
  - `src/`: يحتوي على شيفرة التطبيق.
  - `tests/`: يحتوي على ملفات الاختبار.

### فهم التطوير الموجّه بالاختبارات

**التطوير الموجّه بالاختبارات (TDD)** أسلوب لتطوير البرمجيات يقوم فيه المطوّر بما يلي:

1. **كتابة اختبار**: اكتب اختبارًا للجزء التالي من الوظيفة.
2. **تشغيل الاختبار ورؤيته يفشل**: يضمن أن الاختبار يكتشف غياب الوظيفة.
3. **كتابة أقل شيفرة تجعل الاختبار ينجح**: نفّذ ما يكفي فقط من الشيفرة لجعل الاختبار ينجح.
4. **إعادة الهيكلة**: حسّن الشيفرة مع إبقاء الاختبارات ناجحة.
5. **التكرار**: تابع مع الوظيفة التالية.

غالبًا ما تُسمّى هذه الدورة **أحمر-أخضر-إعادة هيكلة**.

### تصميم نظام المصادقة

**الميزات:**

- **تسجيل المستخدم**: يتيح للمستخدمين إنشاء حساب باسم مستخدم وكلمة مرور.
- **تسجيل دخول المستخدم**: يصادق على المستخدمين ويوفّر رمز JWT.
- **تسجيل خروج المستخدم**: يُبطل جلسة المستخدم (بالنسبة لـ JWT عديم الحالة، يمكن التعامل مع ذلك في جهة العميل).

**المكوّنات:**

- **التحقق من النموذج**: ضمان أن مدخلات المستخدم تستوفي المعايير.
- **تشفير كلمة المرور**: تخزين كلمات مرور المستخدمين بشكل آمن باستخدام التجزئة.
- **التعامل مع رمز JWT**: توليد رموز JSON Web Tokens والتحقق منها لأغراض المصادقة.

### تنفيذ النظام باستخدام TDD

#### تسجيل المستخدم

##### الخطوة 1: اكتب الاختبار (أحمر)

أنشئ `tests/unit/auth.test.js`:

```javascript
// tests/unit/auth.test.js
import { describe, it, expect } from 'vitest';
import { validateRegistrationData, hashPassword } from '../../src/controllers/authController';

describe('Auth Controller - Unit Tests', () => {
  describe('validateRegistrationData', () => {
    it('should validate correct data', () => {
      const data = { username: 'testuser', password: 'Password123' };
      const result = validateRegistrationData(data);
      expect(result).toBe(true);
    });

    it('should invalidate data with missing fields', () => {
      const data = { username: 'testuser' };
      expect(() => validateRegistrationData(data)).toThrow('Password is required');
    });

    it('should invalidate data with weak password', () => {
      const data = { username: 'testuser', password: 'pass' };
      expect(() => validateRegistrationData(data)).toThrow('Password is too weak');
    });
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const password = 'Password123';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash).toMatch(/^\$2[aby]\$.{56}$/); // Regex for bcrypt hash
    });
  });
});
```

**الشرح:**

- نختبر `validateRegistrationData` بمدخلات صالحة وأخرى غير صالحة.
- نختبر `hashPassword` للتأكد من أنها تجزّئ كلمة المرور بشكل صحيح.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm run test
```

تفشل الاختبارات لأن `validateRegistrationData` و`hashPassword` غير معرّفتين.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

أنشئ `src/controllers/authController.js`:

```javascript
// src/controllers/authController.js
import bcrypt from 'bcrypt';

export function validateRegistrationData(data) {
  if (!data.username) {
    throw new Error('Username is required');
  }
  if (!data.password) {
    throw new Error('Password is required');
  }
  if (data.password.length < 6) {
    throw new Error('Password is too weak');
  }
  return true;
}

export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن تنجح الاختبارات.

##### الخطوة 5: أعد الهيكلة (إن لزم)

تأكد من اتساق رسائل الخطأ ومن نظافة الشيفرة.

#### تسجيل دخول المستخدم

##### الخطوة 1: اكتب الاختبار (أحمر)

أضف إلى `tests/unit/auth.test.js`:

```javascript
import { verifyPassword, generateToken } from '../../src/controllers/authController';

describe('verifyPassword', () => {
  it('should return true for correct password', async () => {
    const password = 'Password123';
    const hash = await hashPassword(password);
    const result = await verifyPassword(password, hash);
    expect(result).toBe(true);
  });

  it('should return false for incorrect password', async () => {
    const password = 'Password123';
    const hash = await hashPassword(password);
    const result = await verifyPassword('WrongPassword', hash);
    expect(result).toBe(false);
  });
});

describe('generateToken', () => {
  it('should generate a JWT token', () => {
    const user = { id: 1, username: 'testuser' };
    const token = generateToken(user);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});
```

**الشرح:**

- نختبر `verifyPassword` بكلمات مرور صحيحة وأخرى غير صحيحة.
- نختبر `generateToken` للتأكد من أنها تُنشئ رمز JWT.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm run test
```

تفشل الاختبارات لأن `verifyPassword` و`generateToken` غير معرّفتين.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

حدّث `src/controllers/authController.js`:

```javascript
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // In production, store this securely

// … previous code …

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن تنجح الاختبارات.

##### الخطوة 5: أعد الهيكلة

تأكد من إدارة المفتاح السري بشكل آمن (مثلًا باستخدام متغيّرات البيئة).

#### تسجيل خروج المستخدم

بما أننا نستخدم رموز JWT، يمكن التعامل مع تسجيل الخروج في جهة العميل بحذف الرمز. لكن تسجيل الخروج في جهة الخادم (مثلًا بإدراج الرموز في قائمة سوداء) يتطلب بنية تحتية إضافية. للتبسيط، سنفترض أن JWT عديم الحالة ونركّز على تسجيل الخروج في جهة العميل.

### مجالات التركيز في الاختبار

#### اختبارات الوحدات: التحقق من النماذج وطرق التشفير

كتبنا بالفعل اختبارات وحدات لـ:

- **التحقق من النموذج**: ضمان أن بيانات التسجيل تستوفي المعايير.
- **طرق التشفير**: اختبار تجزئة كلمة المرور والتحقق منها.

#### اختبارات التكامل: نقاط نهاية API للمصادقة

سنكتب اختبارات تكامل لاختبار نقاط نهاية API.

##### الخطوة 1: أعدّ تطبيق Express

أنشئ `src/app.js`:

```javascript
// src/app.js
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

export default app;
```

أنشئ `src/routes/auth.js`:

```javascript
// src/routes/auth.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
```

حدّث `src/controllers/authController.js`:

```javascript
// … previous imports and functions …

const users = []; // In-memory user store (replace with a database in production)

export async function register(req, res) {
  try {
    validateRegistrationData(req.body);
    const hashedPassword = await hashPassword(req.body.password);
    const user = { id: users.length + 1, username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const user = users.find((u) => u.username === req.body.username);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isValid = await verifyPassword(req.body.password, user.password);
    if (!isValid) {
      throw new Error('Invalid username or password');
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
```

##### الخطوة 2: اكتب اختبارات التكامل (أحمر)

أنشئ `tests/integration/auth.integration.test.js`:

```javascript
// tests/integration/auth.integration.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';

describe('Auth Routes - Integration Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'Password123',
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should not register a user with existing username', async () => {
    // Register the user first
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'Password123',
    });
    // Try registering again
    const response = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'Password123',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Username already exists');
  });

  it('should login a registered user', async () => {
    // Register the user
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'Password123',
    });
    // Login
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'Password123',
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should not login with incorrect password', async () => {
    // Register the user
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'Password123',
    });
    // Attempt to login with wrong password
    const response = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'WrongPassword',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid username or password');
  });
});
```

**الشرح:**

- نختبر نقطتي النهاية `/register` و`/login`.
- نضمن أن التسجيل وتسجيل الدخول يعملان كما هو متوقع.

##### الخطوة 3: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm run test
```

قد تفشل الاختبارات لأن `Username already exists` غير معالَج.

##### الخطوة 4: اكتب أقل شيفرة تجعل الاختبار ينجح (أخضر)

حدّث دالة `register` في `authController.js`:

```javascript
export async function register(req, res) {
  try {
    validateRegistrationData(req.body);
    const existingUser = users.find((u) => u.username === req.body.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await hashPassword(req.body.password);
    const user = { id: users.length + 1, username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
```

##### الخطوة 5: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن تنجح كل الاختبارات.

##### الخطوة 6: أعد الهيكلة

فكّر في نقل مخزن المستخدمين إلى وحدة منفصلة أو في استخدام قاعدة بيانات.

#### اختبارات الأمان: التعامل مع رموز المصادقة

نحتاج إلى ضمان التعامل مع الرموز بشكل آمن.

##### الخطوة 1: اكتب الاختبار (أحمر)

أضف إلى `tests/integration/auth.integration.test.js`:

```javascript
describe('Protected Routes', () => {
  it('should access protected route with valid token', async () => {
    // Register and login the user
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'Password123',
    });
    const loginResponse = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'Password123',
    });
    const token = loginResponse.body.token;

    // Access protected route
    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Protected content');
  });

  it('should not access protected route without token', async () => {
    const response = await request(app).get('/api/protected');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Unauthorized');
  });

  it('should not access protected route with invalid token', async () => {
    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid token');
  });
});
```

**الشرح:**

- نختبر إمكانية الوصول إلى مسار محمي برمز صالح.
- نختبر رفض الوصول دون رمز أو برمز غير صالح.

##### الخطوة 2: نفّذ المسار المحمي

حدّث `src/app.js`:

```javascript
// … previous code …
import { authenticateToken } from './middleware/authMiddleware.js';

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected content' });
});
```

أنشئ `src/middleware/authMiddleware.js`:

```javascript
// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}
```

##### الخطوة 3: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm run test
```

ينبغي أن تنجح كل الاختبارات.

##### الخطوة 4: أعد الهيكلة

- خزّن `SECRET_KEY` في متغيّرات البيئة.
- تعامل مع انتهاء صلاحية الرمز وتحديثه إن لزم.

### تشغيل الاختبارات

شغّل كل الاختبارات باستخدام:

```bash
npm run test
```

سينفّذ Vitest كل الاختبارات في دليل `tests/` ويبلّغ بالنتائج.

### الخلاصة

باتّباع مبادئ التطوير الموجّه بالاختبارات، بنينا نظام مصادقة أساسيًا باستخدام Express. كتبنا اختبارات وحدات للتحقق من النماذج وطرق التشفير، واختبارات تكامل لنقاط نهاية API، واختبارات أمان للتعامل مع رموز المصادقة. يضمن هذا الأسلوب أن يكون تطبيقنا موثوقًا وآمنًا ويتصرّف كما هو متوقع.

**الخلاصات الأساسية:**

- **سير عمل TDD:** كتابة الاختبارات أولًا تساعد في تحديد السلوك المتوقع وتؤدي إلى شيفرة أفضل تصميمًا.
- **Vitest للاختبار:** يوفّر Vitest تجربة اختبار سريعة وحديثة لتطبيقات JavaScript.
- **اختبار شامل:** الجمع بين اختبارات الوحدات والتكامل والأمان يضمن تطبيقًا متينًا.

### تمارين إضافية

لتعزيز نظام المصادقة ومهاراتك في الاختبار أكثر، فكّر في تنفيذ الميزات التالية:

1. **وظيفة إعادة تعيين كلمة المرور** نفّذ إعادة تعيين كلمة المرور عبر البريد الإلكتروني. اكتب اختبارات لضمان أمان عملية إعادة التعيين.
  - نفّذ إعادة تعيين كلمة المرور عبر البريد الإلكتروني.
  - اكتب اختبارات لضمان أمان عملية إعادة التعيين.
2. **التحقق من الحساب** أرسل بريدًا إلكترونيًا للتحقق عند التسجيل. اكتب اختبارات للتحقق من أن الحسابات غير المؤكدة لا تستطيع تسجيل الدخول.
  - أرسل بريدًا إلكترونيًا للتحقق عند التسجيل.
  - اكتب اختبارات للتحقق من أن الحسابات غير المؤكدة لا تستطيع تسجيل الدخول.
3. **التحكم في الوصول القائم على الأدوار** نفّذ أدوارًا (مثل مستخدم، مدير) وأذونات. اكتب اختبارات لضمان فرض التحكم في الوصول بشكل صحيح.
  - نفّذ أدوارًا (مثل مستخدم، مدير) وأذونات.
  - اكتب اختبارات لضمان فرض التحكم في الوصول بشكل صحيح.
4. **استخدام قاعدة بيانات** استبدل مخزن المستخدمين في الذاكرة بقاعدة بيانات (مثل MongoDB أو PostgreSQL). اكتب اختبارات تتفاعل مع قاعدة البيانات، ربما باستخدام قاعدة بيانات اختبار.
  - استبدل مخزن المستخدمين في الذاكرة بقاعدة بيانات (مثل MongoDB أو PostgreSQL).
  - اكتب اختبارات تتفاعل مع قاعدة البيانات، ربما باستخدام قاعدة بيانات اختبار.
5. **إدارة الجلسات** نفّذ إدارة الجلسات لإبطال الرموز (مثل إدراجها في قائمة سوداء). اكتب اختبارات لضمان التعامل مع الجلسات بشكل صحيح.
  - نفّذ إدارة الجلسات لإبطال الرموز (مثل إدراجها في قائمة سوداء).
  - اكتب اختبارات لضمان التعامل مع الجلسات بشكل صحيح.
6. **تعقيم المدخلات** تأكد من تعقيم كل المدخلات لمنع هجمات الحقن. اكتب اختبارات للتحقق من أن النظام آمن ضد مثل هذه الهجمات.
  - تأكد من تعقيم كل المدخلات لمنع هجمات الحقن.
  - اكتب اختبارات للتحقق من أن النظام آمن ضد مثل هذه الهجمات.
7. **تحديد معدّل الطلبات** نفّذ تحديد معدّل الطلبات للحماية من هجمات القوة الغاشمة. اكتب اختبارات لضمان عمل تحديد معدّل الطلبات كما هو متوقع.
  - نفّذ تحديد معدّل الطلبات للحماية من هجمات القوة الغاشمة.
  - اكتب اختبارات لضمان عمل تحديد معدّل الطلبات كما هو متوقع.
8. **تدقيق الأمان** استخدم أدوات لتدقيق شيفرتك بحثًا عن ثغرات أمنية. عالج أي مشكلات تجدها واكتب اختبارات لمنع التراجعات.
  - استخدم أدوات لتدقيق شيفرتك بحثًا عن ثغرات أمنية.
  - عالج أي مشكلات تجدها واكتب اختبارات لمنع التراجعات.
