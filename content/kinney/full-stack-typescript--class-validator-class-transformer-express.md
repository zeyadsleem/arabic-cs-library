---
title: "التحقق بالأصناف وتحويل الكائنات"
lang: ar
source: "https://stevekinney.com/courses/full-stack-typescript/class-validator-class-transformer-express"
---

بينما يوفّر فحص الأنواع الأساسي ومكتبات مثل [Zod](https://www.npmjs.com/package/zod) تحققًا متينًا، قد تحتاج السيناريوهات المتقدّمة إلى تقنيات أكثر تطورًا. ويستعرض هذا الدليل استخدام [`class-validator`](https://www.npmjs.com/package/class-validator) و[`class-transformer`](https://www.npmjs.com/package/class-transformer) للتحقق الكائني، فضلًا عن صياغة حرّاس أنواع مخصّصين لمنطق معقّد.

## التحقق الكائني باستخدام `class-validator` و`class-transformer`

يعمل `class-validator` و`class-transformer` معًا بشكل تآزري لتوفير تحقق كائني قوي. ويستخدم `class-validator` المزيّنات (decorators) لتعريف قواعد التحقق، بينما يتولّى `class-transformer` تحويلات الكائنات.

### التثبيت

```bash
npm install class-validator class-transformer reflect-metadata
```

يثبّت هذا:

- [`class-validator`](https://www.npmjs.com/package/class-validator): للتحقق القائم على المزيّنات
- [`class-transformer`](https://www.npmjs.com/package/class-transformer): لتحويل الكائنات
- [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata): مطلوب لبيانات المزيّنات الوصفية

### تفعيل بيانات المزيّنات الوصفية:

تأكد من استيراد `reflect-metadata` في أعلى ملف الدخول لديك (مثل `index.ts`):

```typescript
import 'reflect-metadata'; // Import reflect-metadata once in your app
```

كذلك تأكد من تفعيل الخيارات التالية في `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    // ... other options
  }
}
```

### تعريف أصناف التحقق:

أنشئ أصنافًا تمثّل أجسام طلباتك، واستخدم المزيّنات من `class-validator` لتعريف قواعد التحقق.

```typescript
import { IsString, IsEmail, MinLength, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(120)
  age?: number;
}
```

### وسيط التحقق:

أنشئ وسيطًا للتحقق من الطلبات الواردة باستخدام `class-validator` و`class-transformer`.

```typescript
import { Request, Response, NextFunction } from 'express';
import { validate, plainToClass } from 'class-transformer';
import { CreateUserDto } from './dtos/create-user.dto'; // Assuming your DTO is in dtos/create-user.dto

export async function validateDto(req: Request, res: Response, next: NextFunction) {
  const dto = plainToClass(CreateUserDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map((e) => e.constraints) });
  }

  req.body = dto; // Replace req.body with the transformed and validated DTO
  next();
}
```

### استخدام وسيط التحقق في المسارات:

طبّق الوسيط على مساراتك.

```typescript
import express, { Request, Response } from 'express';
import { validateDto } from './middleware/validate.dto'; // Assuming your middleware is in middleware/validate.dto
import { CreateUserDto } from './dtos/create-user.dto';

const app = express();
app.use(express.json());

app.post('/users', validateDto, (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  // req.body is now a validated instance of CreateUserDto
  const { username, email, password, age } = req.body;
  // ... create user logic
  res.status(201).json({ message: 'User created' });
});
```

## حرّاس أنواع مخصّصون للتحقق المعقّد

لمنطق التحقق الذي يتجاوز المزيّنات البسيطة، يوفّر حرّاس الأنواع المخصّصون مرونة.

### مثال: التحقق من صيغة تاريخ مخصّصة

```typescript
function isValidCustomDate(value: any): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return regex.test(value);
}

interface EventRequest {
  startTime: string; // Must be a custom date format
}

function validateEventRequest(req: Request, res: Response, next: NextFunction) {
  const { startTime } = req.body as EventRequest;

  if (!isValidCustomDate(startTime)) {
    return res.status(400).json({ error: 'Invalid start time format' });
  }

  next();
}

app.post('/events', validateEventRequest, (req: Request<any, any, EventRequest>, res: Response) => {
  // req.body.startTime is now guaranteed to be a valid custom date string
  res.json({ message: 'Event created' });
});
```

### الفوائد

- **التحقق الكائني:** يوفّر `class-validator` و`class-transformer` مقاربة منظّمة للتحقق.
- **قابلية إعادة الاستخدام:** يمكن إعادة استخدام أصناف التحقق والوسيط في أنحاء تطبيقك.
- **المرونة:** يتعامل حرّاس الأنواع المخصّصون مع منطق تحقق معقّد.
- **الوضوح:** تُحسّن المزيّنات وحرّاس الأنواع وضوح الشيفرة.
