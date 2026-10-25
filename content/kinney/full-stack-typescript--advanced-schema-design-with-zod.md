---
title: "تصميم مخططات متقدّمة مع Zod"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/advanced-schema-design-with-zod"
---

يقدّم Zod أنماط تصميم متقدّمة للمخططات للتعامل مع سيناريوهات التحقق المعقّدة بفعالية.

## بنى البيانات التعاودية مع `z.lazy()`

تعامل مع المخططات التي تشير إلى نفسها تعاوديًا (مثل البنى الشجرية). ويتيح لك `z.lazy()` تعريف مخطط يشير إلى نفسه دون إحداث مشكلات اعتماد دائري أثناء تعريف المخطط.

```typescript
interface Category {
  name: string;
  subcategories?: Category[]; // Recursive reference
}

const categorySchema: z.ZodSchema<Category> = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(categorySchema).optional(), // Use lazy schema here
  }),
);

const validCategory: Category = {
  name: 'Electronics',
  subcategories: [
    { name: 'Computers' },
    { name: 'Phones', subcategories: [{ name: 'Smartphones' }] },
  ],
};

categorySchema.parse(validCategory); // Valid

const invalidCategory: any = {
  name: 'Books',
  subcategories: [{ name: 123 }], // Invalid subcategory type
};

// categorySchema.parse(invalidCategory); // Throws ZodError: Expected object, received number at 'subcategories[0].name'
```

## المعالجة المسبقة للتحقق المعقّد مع `z.preprocess()` و`z.superPreprocess()`

استخدم المعالجة المسبقة للتعامل مع تحويلات بيانات معقّدة أو منطق تحقق شرطي قبل تطبيق التحقق الأساسي بالمخطط. وهذا مفيد بشكل خاص عند التعامل مع بيانات تحتاج إلى تهيئة كبيرة قبل أن يمكن التحقق منها وفق مخطط محدد.

```typescript
const complexDataSchema = z.preprocess(
  (input) => {
    if (typeof input === 'string' && input.startsWith('{') && input.endsWith('}')) {
      try {
        return JSON.parse(input); // Attempt to parse JSON string
      } catch (e) {
        return input; // If parsing fails, return original string for string validation
      }
    }
    return input; // Return original input if not a JSON-like string
  },
  z.union([
    z.object({
      // Schema for parsed JSON object
      type: z.literal('json'),
      data: z.object({ value: z.number() }),
    }),
    z.string().startsWith('prefix-'), // Schema for string with prefix
  ]),
);

complexDataSchema.parse('{ "type": "json", "data": { "value": 42 } }'); // Valid, parses JSON and validates object schema
complexDataSchema.parse('prefix-string-value'); // Valid, validates string schema
// complexDataSchema.parse("invalid json string"); // Throws ZodError for string schema validation failure
```

بإتقانك بناء المخططات وتحسينها وتحويلها ومعالجة أخطائها، تملك القدرة على تعريف توقعات بيانات دقيقة وفرضها بصرامة في وقت التشغيل باستخدام Zod.

## التناغم بين Zod وTypeScript: شراكة قوية

صُمّم Zod ليعمل بانسجام مع TypeScript، فيحسّن تجربة المطوّر ويعظّم سلامة الأنواع في كل أنحاء تطبيقاتك.

### استنتاج الأنواع: جسر بين وقت التشغيل ووقت التصريف

تشكّل قدرات استنتاج الأنواع القوية في Zod تغييرًا جذريًا لمطوّري TypeScript. فتتيح لك أداة `z.infer<typeof schema>` استخراج نوع TypeScript تلقائيًا من مخطط Zod. وهذا يلغي الحاجة إلى تعريف أنواع يدويًا تحاكي مخططاتك، فيقلّل التكرار ويضمن اتساق الأنواع بين منطق التحقق لديك وشيفرة TypeScript.

```typescript
const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  price: z.number().positive(),
  description: z.string().optional(),
});

// Infer the TypeScript type from the Zod schema
type Product = z.infer<typeof productSchema>;

function processProduct(product: Product) {
  console.log(`Processing product: ${product.name} (ID: ${product.id}), Price: $${product.price}`);
  // ... further logic with type-safe 'product' object
}

const validProductData = {
  id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  name: 'Awesome Gadget',
  price: 99.99,
};

const parsedProduct = productSchema.parse(validProductData); // Runtime validation
processProduct(parsedProduct); // Type-safe usage of validated data
```

باستخدام `z.infer`، تنشئ مصدرًا واحدًا للحقيقة لبنية بياناتك، وهو مخطط Zod. ويفهم TypeScript تلقائيًا شكل البيانات المتحقَّق منها، فيوفّر سلامة أنواع في وقت التصريف لبيانات متحقَّق منها في وقت التشغيل.

### بصمات الدوال: ضمان سلامة الأنواع عند حدود الدوال

يمكن استخدام مخططات Zod لتعريف بصمات أنواع دقيقة لمعاملات الدوال وقيمها المعادة، فتوسّع سلامة الأنواع إلى ما هو أبعد من بنى الكائنات لتشمل واجهات الدوال. وهذا مفيد بشكل خاص لضمان صحة الأنواع عند التعامل مع دوال تتعامل مع بيانات خارجية أو تجري تحويلات بيانات معقّدة.

```typescript
const configSchema = z.object({
  apiKey: z.string(),
  apiUrl: z.string().url(),
  timeout: z.number().positive().default(5000), // Default timeout in milliseconds
});
type Config = z.infer<typeof configSchema>;

function initializeApp(configData: unknown): Config {
  // Input as 'unknown' to force runtime validation
  const config = configSchema.parse(configData); // Runtime validation of config data
  console.log('App initialized with config:', config);
  return config; // Type-safe Config object returned
}

const validConfigData = {
  apiKey: 'your-api-key',
  apiUrl: '[https://api.example.com](https://www.google.com/search?q=https://api.example.com)',
  // timeout is optional, default will be used
};

const appConfig = initializeApp(validConfigData); // Runtime validation and type-safe config
// initializeApp({ apiKey: 123, apiUrl: "invalid-url" }); // Runtime validation error

// Type-safe access to config properties
console.log('API Key:', appConfig.apiKey);
console.log('API URL:', appConfig.apiUrl);
console.log('Timeout:', appConfig.timeout);
```

باستخدام مخططات Zod لتعريف بصمات الدوال، تنشئ عقودًا واضحة لدوالك، فتضمن أنها تستقبل وتعيد بيانات بالتنسيق المتوقع، متحقَّقًا منها في وقت التشغيل.

### التحقق اللامتزامن: التعامل مع مصادر البيانات الخارجية

يدعم Zod التحقق اللامتزامن بالتابع `schema.parseAsync(data)`. وهذا حاسم في السيناريوهات التي يحتاج فيها منطق التحقق إلى التفاعل مع موارد خارجية، مثل قواعد البيانات أو واجهات API، لإجراء الفحوص.

```typescript
import { z } from 'zod';

const usernameSchema = z
  .string()
  .min(3)
  .refine(
    async (username) => {
      // Simulate asynchronous check against a database or API
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network latency
      const isUsernameTaken = await checkUsernameAvailability(username); // Assume this function checks username in a database
      return !isUsernameTaken; // Username is valid if not taken
    },
    { message: 'Username is already taken' },
  );

async function validateUsername(username: string) {
  try {
    const validatedUsername = await usernameSchema.parseAsync(username);
    console.log(`Username "${validatedUsername}" is valid and available.`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Username validation failed:', error.errors);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Assume checkUsernameAvailability is an asynchronous function that checks username availability
async function checkUsernameAvailability(username: string): Promise<boolean> {
  // ... (Implementation to check username in database or API) ...
  // Simulate:
  const takenUsernames = ['takenUser', 'anotherTakenUser'];
  return takenUsernames.includes(username);
}

validateUsername('newUser123'); // Validates asynchronously, assuming "newUser123" is available
// validateUsername("takenUser"); // Validates asynchronously, throws ZodError: Username is already taken
```

يعيد `parseAsync()` وعدًا يُحلّ بالبيانات المتحقَّق منها إذا نجح التحقق، أو يُرفض بـ `ZodError` إذا فشل التحقق. وهذا يتيح لك دمج التحقق اللامتزامن بانسجام في تدفق بيانات تطبيقك.

### Zod في الميدان: تطبيقات واقعية

تجعل تعدّد استخدامات Zod قابلًا للتطبيق في سياقات متنوعة في تطوير TypeScript. وإليك بعض حالات الاستخدام الواقعية الشائعة:

## التحقق من طلبات API واستجاباتها

في تطبيقات الخادم (مثل Express وNestJS)، استخدم Zod للتحقق من طلبات API الواردة واستجابات API الصادرة. وهذا يضمن سلامة البيانات عند حدود API لديك.

```typescript
import express, { Request, Response } from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

app.post('/users', async (req: Request, res: Response) => {
  try {
    const userData = createUserSchema.parse(req.body); // Validate request body
    // ... (Create user in database using validated userData) ...
    res.status(201).json({ message: 'User created successfully', user: userData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors }); // Return validation errors to client
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
```

## التحقق من النماذج

في تطبيقات الويب (مثل React وAngular وVue.js)، استخدم Zod للتحقق من مدخلات المستخدم في النماذج. وهذا يوفّر تحققًا قويًا من جهة العميل ويحسّن تجربة المستخدم.

```typescript
import React, { useState } from 'react';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});
type ContactFormData = z.infer<typeof contactFormSchema>;

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<z.ZodError<ContactFormData> | null>(
    null,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = contactFormSchema.safeParse(formData); // Validate form data

    if (validationResult.success) {
      console.log('Form data is valid:', validationResult.data);
      setErrors(null); // Clear errors
      // ... (Submit form data) ...
    } else {
      console.error('Form validation errors:', validationResult.error.errors);
      setErrors(validationResult.error); // Set errors to display to user
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors?.formErrors
          .filter((err) => err.path[0] === 'name')
          .map((err) => (
            <p className="error">{err.message}</p>
          ))}
      </div>
      {/* ... (Email and Message fields and error display similar to Name) ... */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## تسلسل البيانات وإلغاء تسلسلها

تحقق من البيانات وحوّلها عند التسلسل إلى صيغ مثل JSON أو إلغاء التسلسل منها، أو عند التعامل مع أنظمة تخزين.

```typescript
import { z } from 'zod';

const userDataSchema = z.object({
  userId: z.number(),
  username: z.string(),
  profileData: z
    .object({
      bio: z.string().optional(),
      avatarUrl: z.string().url().optional(),
    })
    .nullable(), // Profile data can be null
});
type UserData = z.infer<typeof userDataSchema>;

function serializeUserData(user: UserData): string {
  userDataSchema.parse(user); // Validate before serialization
  return JSON.stringify(user);
}

function deserializeUserData(jsonString: string): UserData {
  const parsedData = JSON.parse(jsonString);
  return userDataSchema.parse(parsedData); // Validate after deserialization
}

const userToSerialize: UserData = {
  userId: 123,
  username: 'testUser',
  profileData: {
    bio: 'Software developer',
    avatarUrl:
      '[https://example.com/avatar.png](https://www.google.com/search?q=https://example.com/avatar.png)',
  },
};

const serialized = serializeUserData(userToSerialize);
console.log('Serialized user data:', serialized);

const deserialized = deserializeUserData(serialized);
console.log('Deserialized user data:', deserialized);
```

## التحقق من التهيئة

افرض سلامة الأنواع على ملفات تهيئة التطبيق، بما يضمن صلاحية قيم التهيئة ويمنع أخطاء وقت التشغيل الناتجة عن تهيئة خاطئة.

```typescript
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { z } from 'zod';

const appConfigSchema = z.object({
  server: z.object({
    host: z.string(),
    port: z.number().positive(),
  }),
  database: z.object({
    url: z.string().url(),
    username: z.string(),
    password: z.string(),
  }),
  featureFlags: z.record(z.string(), z.boolean()).optional(), // Optional feature flags
});
type AppConfig = z.infer<typeof appConfigSchema>;

function loadConfig(configPath: string): AppConfig {
  try {
    const configFile = fs.readFileSync(configPath, 'utf8');
    const configData = yaml.load(configFile); // Load YAML config
    return appConfigSchema.parse(configData); // Validate config data
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Configuration validation failed:', error.errors);
    } else {
      console.error('Error loading configuration:', error);
    }
    throw new Error('Failed to load application configuration.');
  }
}

const config = loadConfig('./config.yaml'); // Load and validate configuration from YAML file
console.log('Loaded configuration:', config);

// Type-safe access to configuration values
console.log('Server Host:', config.server.host);
console.log('Database URL:', config.database.url);
```

توضح هذه الأمثلة اتساع قابلية تطبيق Zod. وبإدماج Zod في مشاريع TypeScript لديك، يمكنك تحسين التحقق من البيانات وسلامة الأنواع تحسينًا كبيرًا في طبقات التطبيق المختلفة.

## خرائط أخطاء مخصّصة

قد تبدو رسائل الخطأ الافتراضية في Zod آلية بعض الشيء لذوقك. فاستخدم خريطة أخطاء مخصّصة لتعديلها عالميًا أو محليًا.

### تعيين خريطة أخطاء عالمية

```typescript
import { z, ZodError, ZodIssueCode } from 'zod';

z.setErrorMap((issue, ctx) => {
  if (issue.code === ZodIssueCode.invalid_type) {
    return { message: `Invalid type: expected ${issue.expected}, got ${issue.received}` };
  }
  // fallback to default message
  return { message: ctx.defaultError };
});

z.string().parse(123);
// => "Invalid type: expected string, got number"
```

### خريطة أخطاء على مستوى المخطط

```typescript
const mySchema = z.string().errorMap((issue, ctx) => {
  return { message: "This isn't a string—cut it out." };
});
```

> **Zod v4**
>
> في Zod v4، لم يعد التابع `.errorMap()` على مستوى المخطط موجودًا. استخدم المعامل `error` مباشرةً على المُحقِّقات الفردية بدلًا منه. كما استُبدل `z.setErrorMap()` العالمي بـ `z.config()`.

### لماذا تستخدم خرائط الأخطاء؟

- تنسيق مركزي ومتسق للأخطاء.
- تجاوزات محلية أو عالمية.
- رسائل أوْدّ وأكثر تخصصًا في النطاق.

مخططات التحويل القسري: دع Zod يقوم بالتحليل

إذا وصلتك مدخلات نصية تمثل أرقامًا أو قيمًا منطقية أو تواريخ، فجرّب واجهات `z.coerce.*` الجديدة لتحويلها تلقائيًا.

### مثال: تحويل السلاسل النصية إلى أرقام

```typescript
import { z } from 'zod';

const numberFromString = z.coerce.number().min(10);

// "15" -> 15 -> passes
numberFromString.parse('15');

// "8" -> 8 -> fails because it's < 10
```

#### تحويلات قسرية أخرى

- `z.coerce.boolean()`
- `z.coerce.date()`

وهذا أبسط من كتابة `.preprocess()` أو `.transform()` يدويًا في حالات كثيرة.

## دمج المخططات

يدمج `objectSchemaA.merge(objectSchemaB)` مخططَي كائنات، جامعًا الخصائص (ومتجاوزًا بعضها).

### مثال

```typescript
import { z } from 'zod';

const schemaA = z.object({
  name: z.string(),
  age: z.number(),
});

const schemaB = z.object({
  age: z.number().min(18),
  email: z.string().email(),
});

const merged = schemaA.merge(schemaB);
// => z.object({
//      name: z.string(),
//      age: z.number().min(18),
//      email: z.string().email(),
//    });
```

> **Zod v4**
>
> في Zod v4، أصبح `.merge()` مهجورًا. استخدم `.extend()` بدلًا منه: `schemaA.extend(schemaB.shape)`.

### الفرق عن التقاطع

- يعمل `merge` على مخططات الكائنات فقط ويدمج الخصائص (مع تجاوز المخطط الثاني للمفاتيح المتعارضة).
- يستطيع `intersection` جمع أي مخططات (لا الكائنات فقط) ويشترط نجاح التحققين معًا.
