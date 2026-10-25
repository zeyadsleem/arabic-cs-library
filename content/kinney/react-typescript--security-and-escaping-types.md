---
title: "الأمن وأنواع التهريب"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/security-and-escaping-types"
---

لا تزال هجمات البرمجة العابرة للموقع (XSS) واحدة من أكثر ثغرات أمن الويب شيوعًا، وتطبيقات React ليست بمنأى منها. ولأنّ JSX في React يوفّر بعض الحماية المدمجة عبر تهريب القيم افتراضيًا، ما زالت هناك طرق كثيرة لإيذاء نفسك — خاصةً عند التعامل مع المحتوى الذي ينشئه المستخدم، أو واجهات برمجية من طرف ثالث، أو تلك الخاصية التي تبدو بريئة `dangerouslySetInnerHTML`. لنستكشف كيف يمكن لـ TypeScript أن يساعدنا في بناء تطبيقات React أكثر أمانًا عبر إنشاء تجريدات آمنة من حيث الأنواع للتعامل مع المحتوى غير الموثوق.

وفي نهاية هذا الدليل ستفهم كيف تستعمل نظام أنواع TypeScript لإلزام التنقية الصحيحة، وكيف تصنع أغلفة آمنة حول العمليات الخطرة، وكيف تبني نموذجًا ذهنيًا للتفكير في البيانات الموثوقة مقابل غير الموثوقة في كل أنحاء تطبيقك.

## المشكلة مع الثقة

قبل أن نغوص في الحلول، لنُرسِخ المشكلة الجوهرية: في تطبيق ويب، لا كل السلاسل متساوية. بعض السلاسل آمنة للتصيير مباشرةً، بينما يحتاج بعضها إلى تنقية أو تهريب أولًا.

تأمّل هذا المكوّن في React الذي يبدو بريئًا تمامًا:

```typescript
// ❌ Dangerous - what if content contains <script> tags?
function UserProfile({ bio }: { bio: string }) {
  return <div dangerouslySetInnerHTML={{ __html: bio }} />;
}
```

إذا احتوى `bio` على شيء مثل `<script>alert('XSS!');</script>`، فقد نفّذت للتوّ شيفرة JavaScript عشوائية في متصفّح المستخدم. ليس مثاليًا.

النهج التقليدي هو أن تتذكّر أن تنقّي المدخلات يدويًا:

```typescript
import DOMPurify from 'dompurify';

// ✅ Better, but easy to forget
function UserProfile({ bio }: { bio: string }) {
  const sanitizedBio = DOMPurify.sanitize(bio);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedBio }} />;
}
```

هذا يعمل، لكنه يعتمد على انضباط المطوّر. وماذا يحدث عندما يضيف أحدهم مكوّنًا جديدًا بعد ستّة أشهر ويتّنسى خطوة التنقية؟ يمكن لـ TypeScript أن يساعدنا في جعل هذا الخطأ مستحيلًا.

## نمذجة الثقة عبر الأنواع

الفكرة المحورية أنّنا يمكننا استعمال نظام أنواع TypeScript للتمييز بين السلاسل الموثوقة وغير الموثوقة. وبعد أن تُنقّى السلسلة تنقيةً سليمة، سنغلّفها في نوع موسوم (branded) لا يمكن إنشاؤه إلّا عبر عمليات آمنة.

لنبدأ بتعريف أنواعنا الأساسية:

```typescript
// Brand types to distinguish trusted from untrusted content
export type UntrustedString = string & { readonly __brand: 'UntrustedString' };
export type TrustedHtml = string & { readonly __brand: 'TrustedHtml' };
export type TrustedText = string & { readonly __brand: 'TrustedText' };

// Helper to create untrusted strings from user input
export function untrusted(value: string): UntrustedString {
  return value as UntrustedString;
}
```

هذه **أنواع موسومة** — ما زالت نصوصًا وقت التشغيل، لكنّ TypeScript يتعامل معها كأنواع متمايزة. وخاصية `__brand` موجودة في نظام الأنواع وحده، وتساعد على منع الخلط العرضي بين المحتوى الموثوق وغير الموثوق.

الآن يمكننا إنشاء دوالّ تحوّل المحتوى غير الموثوق إلى محتوى موثوق بأمان:

```typescript
import DOMPurify from 'dompurify';

// Sanitize HTML content, removing dangerous elements and attributes
export function sanitizeHtml(content: UntrustedString): TrustedHtml {
  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
    FORBID_ATTR: ['style', 'onerror', 'onload'],
  });
  return sanitized as TrustedHtml;
}

// Escape text content for safe display
export function escapeText(content: UntrustedString): TrustedText {
  return content
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;') as TrustedText;
}
```

## تصيير HTML الآمن من حيث الأنواع

الآن يمكننا إنشاء مكوّن يقبل HTML موثوقًا فقط:

```typescript
interface SafeHtmlProps {
  content: TrustedHtml;
  className?: string;
}

function SafeHtml({ content, className }: SafeHtmlProps) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
}
```

جمال هذا النهج أنّ `SafeHtml` لا يمكن استعماله إلّا مع محتوى تنقيته صراحةً:

```typescript
function UserProfile({ bio }: { bio: string }) {
  // This forces explicit sanitization
  const trustedBio = sanitizeHtml(untrusted(bio));

  return <SafeHtml content={trustedBio} />;
}

// ❌ TypeScript error - can't pass raw string
function BrokenProfile({ bio }: { bio: string }) {
  return <SafeHtml content={bio} />; // Error: Type 'string' is not assignable to type 'TrustedHtml'
}
```

## التعامل الآمن مع مدخلات النماذج

مدخلات النماذج مصدر شائع آخر لثغرات XSS. لنصنع نمطًا آمنًا من حيث الأنواع للتعامل مع إدخال المستخدم:

```typescript
interface FormData {
  username: UntrustedString;
  email: UntrustedString;
  bio: UntrustedString;
}

function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    username: untrusted(''),
    email: untrusted(''),
    bio: untrusted(''),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate and sanitize before sending to server
    const safeData = {
      username: escapeText(formData.username),
      email: validateEmail(formData.email),
      bio: sanitizeHtml(formData.bio),
    };

    submitUserData(safeData);
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: untrusted(e.target.value),
      }));
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.username}
        onChange={handleInputChange('username')}
        placeholder="Username"
      />
      <input
        type="email"
        value={formData.email}
        onChange={handleInputChange('email')}
        placeholder="Email"
      />
      <textarea value={formData.bio} onChange={handleInputChange('bio')} placeholder="Bio" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## التحقّق من البريد الإلكتروني بأمان

إليك كيف يمكننا تنفيذ دالة `validateEmail` تلك مع معالجة أخطاء سليمة:

```typescript
export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateEmail(email: UntrustedString): TrustedText {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format', 'email');
  }

  // Additional sanitization - remove any potential HTML/JS
  return escapeText(email);
}
```

## التكامل مع واجهات البرمجة في العالم الحقيقي

عند العمل مع واجهات برمجية خارجية، غالبًا ما لا يمكنك الوثوق بالبيانات التي تتلقّاها. وإليك كيف تتعامل مع استجابات الواجهات البرمجية بأمان:

```typescript
import { z } from 'zod';

// Define expected API response structure
const ApiUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  bio: z.string(),
  avatar_url: z.string().url().optional(),
});

type ApiUser = z.infer<typeof ApiUserSchema>;

// Transform API data into our trusted types
async function fetchUser(userId: number): Promise<{
  id: number;
  username: TrustedText;
  email: TrustedText;
  bio: TrustedHtml;
  avatarUrl?: string;
}> {
  const response = await fetch(`/api/users/${userId}`);
  const rawData = await response.json();

  // Validate the structure first
  const userData = ApiUserSchema.parse(rawData);

  // Then sanitize the content
  return {
    id: userData.id,
    username: escapeText(untrusted(userData.username)),
    email: escapeText(untrusted(userData.email)),
    bio: sanitizeHtml(untrusted(userData.bio)),
    avatarUrl: userData.avatar_url,
  };
}
```

يجمع هذا النهج بين تحقّق Zod وقت التشغيل وأنواع الأمان لدينا، بما يضمن أنّ البيانات صحيحة بنيويًا ومنقّاة تنقيةً سليمة في آنٍ واحد.

## متقدّم: سياسات أمن المحتوى

لأمان إضافي، فكّر في تنفيذ ترويسات سياسة أمن المحتوى (CSP) إلى جانب تنقيتك الآمنة من حيث الأنواع:

```typescript
// In your HTML head or Next.js app
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
].join('; ');

// This would typically be set as an HTTP header
// Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
```

تعمل CSP كخطّ دفاع ثانٍ — حتى لو تسلّل المحتوى الخبيث بشكلٍ ما عبر تنقيتك، فسيحظر المتصفّح تنفيذه.

## دوالّ مساعدة للحالات الشائعة

إليك بعض الدوالّ العملية التي قد ترغب في وجودها في حقيبة أدوات الأمان لديك:

```typescript
// Create trusted content from compile-time constants
export function trusted<T extends string>(content: T): TrustedHtml {
  return content as TrustedHtml;
}

// Combine multiple trusted HTML pieces
export function joinTrustedHtml(pieces: TrustedHtml[], separator = ''): TrustedHtml {
  return pieces.join(separator) as TrustedHtml;
}

// Template literal helper for trusted HTML
export function html(strings: TemplateStringsArray, ...values: TrustedHtml[]): TrustedHtml {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += values[i] + strings[i + 1];
  }
  return result as TrustedHtml;
}

// Usage examples:
const staticContent = trusted('<p>This is safe static content</p>');
const userContent = sanitizeHtml(untrusted(userInput));
const combined = html`<div>${staticContent}${userContent}</div>`;
```

## اختبار إجراءاتك الأمنية

لا تنسَ اختبار منطق التنقية لديك! وإليك بعض حمولات XSS الشائعة التي يمكنك الاختبار مقابلها:

```typescript
// security.test.ts
import { describe, it, expect } from 'vitest';
import { sanitizeHtml, escapeText, untrusted } from './security';

describe('sanitization', () => {
  const xssPayloads = [
    '<script>alert("xss")</script>',
    '<img src="x" onerror="alert(1)">',
    '<svg onload="alert(1)">',
    'javascript:alert(1)',
    '<iframe src="javascript:alert(1)">',
  ];

  it('should remove dangerous script tags', () => {
    xssPayloads.forEach((payload) => {
      const sanitized = sanitizeHtml(untrusted(payload));
      expect(sanitized).not.toContain('<script');
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('onerror');
      expect(sanitized).not.toContain('onload');
    });
  });

  it('should escape text content properly', () => {
    const dangerous = '<script>alert("xss")</script>';
    const escaped = escapeText(untrusted(dangerous));
    expect(escaped).toBe('<script>alert("xss")</script>');
  });
});
```

## اعتبارات الأداء

التنقية ليست مجّانية — يحتاج DOMPurify إلى تحليل HTML وتنظيفه، وقد يكون ذلك مكلفًا مع المحتوى الكبير. فكّر في هذه التحسينات:

- **التخزين المؤقت (memoization)**: خزّن المحتوى المنقّى مؤقتًا لتفادي إعادة معالجته
- **التنقية الكسولة (lazy sanitization)**: لا تنقِّ المحتوى إلّا عندما يُعرض فعلًا
- **التنقية في الخادم**: نظّف المحتوى مرّة واحدة في الخادم بدلًا من كل تصيير في العميل

```typescript
import { useMemo } from 'react';

function OptimizedUserProfile({ bio }: { bio: string }) {
  // Memoize expensive sanitization
  const trustedBio = useMemo(() => sanitizeHtml(untrusted(bio)), [bio]);

  return <SafeHtml content={trustedBio} />;
}
```

## ما أنجزناه

بالاستفادة من نظام أنواع TypeScript، أنشأنا نموذج أمان:

- **يجعل العمليات غير الآمنة صريحة** عبر الأنواع الموسومة
- **يفرض التنقية** قبل العمليات الخطرة مثل `dangerouslySetInnerHTML`
- **يوفّر حدودًا واضحة** بين البيانات الموثوقة وغير الموثوقة
- **يندمج مع مكتبات التحقّق** القائمة مثل Zod
- **يتّسع عبر تطبيقك** دون الاعتماد على انضباط المطوّر

> **تلميح**
>
> ابدأ بتحديد كل المواضع في تطبيقك التي يدخل فيها المحتوى غير الموثوق إلى النظام — مدخلات النماذج، استجابات الواجهات البرمجية، معاملات URL، قيم localStorage. هذه هي حدودك الأمنية.

لن يلتقط نظام الأنواع كل مشكلة أمنية ممكنة، لكنّه سيُلغي أكثر ثغرات XSS شيوعًا بجعل تنفيذ العمليات غير الآمنة بالخطأ مستحيلًا. ومع الاختبارات الصحيحة وترويسات CSP ومراجعة الشيفرة بعقلية أمنية، تملك دفاعًا متينًا ضد هجمات العميل.

وتذكّر: الأمن هو الدفاع متعدّد الطبقات. الأنواع طبقة واحدة — تأكّد من التفكير شموليًا في الوضع الأمني لتطبيقك.
