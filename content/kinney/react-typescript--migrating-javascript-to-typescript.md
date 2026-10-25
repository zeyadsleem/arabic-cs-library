---
title: "ترحيل تطبيق React من JavaScript إلى TypeScript"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/migrating-javascript-to-typescript"
---

لا ينبغي أن يكون نقل تطبيقك في React من JavaScript إلى TypeScript مجهودًا بطوليًا في العطلة الأسبوعية يجعلك تسائل خياراتك في الحياة. باستراتيجية صحيحة تستطيع الترحيل تدريجيًا — ملفًا ملفًا، ومكوّنًا مكوّنًا — مع بقاء تطبيقك عاملًا في الإنتاج. لنتكشف كيف تحوّل بأمان باستخدام تهيئة TypeScript تدريجية، وعتلة تشدّد الصرامة تدريجيًا (strictness ratchet)، وأنماط مُجرَّبة لتنويع المكوّنات القديمة بلا اضطرابٍ غير ضروري.

الفكرة الأساسية هنا أن TypeScript صُمِّم لهذا السيناريو بالضبط. لا تحتاج إلى تحويل كل شيء دفعة واحدة، ولا تحتاج قطعًا إلى إيقاف تطوير الميزات أثناء ذلك.

## لماذا الترحيل إلى TypeScript؟

قبل الغوص في الكيف، لنجمل تغطية السبب. يوفّر TypeScript مزايا عدّة تتزايد قيمتها كلما نما حجم شيفرتك:

- **التقاط الأخطاء عند وقت التصريف** بدلًا من اكتشافها في الإنتاج (أو الأسوأ، في تقارير المستخدمين)
- **دعم أفضل من بيئة التطوير التكاملية (IDE)** مع الإكمال التلقائي وإعادة البناء والتنقل
- **شيفرة توثّق نفسها** عبر أنواعٍ وواجهات صريحة
- **تهيئة أيسر للأعضاء الجدد في الفريق**، إذ يفهمون توقيعات الدوال دون التعمّق في التنفيذات
- **ثقة في إعادة البناء** عند حاجتك إلى تغيير واجهات البرمجة (APIs) أو خصائص المكوّنات

> **ملاحظة**
>
> تزايد تبنّي TypeScript في شيفرات React تزايدًا كبيرًا. تُصدر أهم مكتبات React اليوم مع تعريفات TypeScript، فأصبح النظام البيئي أكثر ودًّا إلى TypeScript بمراحل مما كان قبل سنوات قليلة.

## استراتيجية الترحيل المتدرّج

سر الترحيل الموفَّق هو أن تُخذه خطوةً خطوة. هذا هو النهج المُجرَّب:

### المرحلة 1: تهيئة البنية التحتية لـ TypeScript

لنثبّت TypeScript ونضبطه أولًا دون تغيير أي شيفرة قائمة:

```bash
# Install TypeScript and related dependencies
npm install --save-dev typescript @types/react @types/react-dom @types/node

# If you're using Create React App
npm install --save-dev @types/jest

# For custom webpack setups, you might also need:
npm install --save-dev ts-loader
```

أنشئ ملف `tsconfig.json` متساهلًا جدًا في البداية. هذا جوهري — نريد أن يقبَل TypeScript كل أنماط JavaScript القائمة أثناء الترحيل:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

الإعدادات الأساسية هنا:

- `allowJs: true` يتيح لـ TypeScript معالجة ملفات JavaScript
- `strict: false` يعطّل التحقق النوعي الصارم في البداية
- `skipLibCheck: true` يتجاهل أخطاء الأنواع في node_modules

### المرحلة 2: البدء في تحويل الملفات

ابدأ بالمكوّنات الطرفية — أي ما لا يستورد مكوّنات محلية أخرى. وهي عادة دوال مساعِدة وثوابت ومكوّنات عرض بسيطة.

لننظر إلى مثال ترحيل نمطي. هذا مكوّن JavaScript:

```javascript
// Button.js
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, disabled, variant = 'primary' }) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button className={`btn btn-${variant}`} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
```

وهذه نسخة TypeScript مُنوَّعة الأنواع كما ينبغي:

```typescript
// Button.tsx
import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button className={`btn btn-${variant}`} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
```

> **نصيحة**
>
> ابدأ بالمكوّنات ذات الخصائص الواضحة البسيطة. أمّا المكوّنات المركّبة ذات الحالات الحدّية العديدة فيمكنها الانتظار حتى تتأقلم مع الأنماط أكثر.

### المرحلة 3: زيادة الصرامة تدريجيًا

مع تحويل المزيد من الملفات يمكنك شدّ تهيئة TypeScript تدريجيًا. أضف خيارات المُصرِّف هذه واحدًا تِلو الآخر:

```json
{
  "compilerOptions": {
    // ... existing options
    "noImplicitAny": true, // Disallow 'any' type
    "strictNullChecks": true, // Null and undefined are not assignable to other types
    "strictFunctionTypes": true, // Function parameters are contravariant
    "noImplicitReturns": true, // All code paths must return a value
    "noFallthroughCasesInSwitch": true // Switch statements need breaks
  }
}
```

فعّل خيارًا واحدًا، وأصلح الأخطاء التي يكشفها، ثم انتقل إلى الذي يليه. يقيك هذا المنهج التدريجي من الغرق في مئات أخطاء الأنواع دفعة واحدة.

## أنماط الترحيل الشائعة

### تنويع الخصائص مع التفكيك (destructuring)

من أصعب جوانب ترحيل مكوّنات React التعامل السليم مع الخصائص. هذه أكثر الأنماط شيوعًا:

```typescript
// ✅ Good: Interface for props
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (userId: string) => void;
  showEmail?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, showEmail = true }) => {
  // Component implementation
};
```

وبالنسبة إلى المكوّنات التي تقبل خصائصًا كثيرة فقد تحتاج إلى مرونة أكبر أثناء الترحيل:

```typescript
// ⚠️ Acceptable during migration: Partial typing
interface UserCardProps {
  user: {
    id: string;
    name: string;
    [key: string]: any; // Escape hatch for unknown props
  };
  [key: string]: any; // Allow additional props during migration
}
```

### التعامل مع معالجات الأحداث

تحمل معالجات أحداث React أنواعًا محددة يستحق تعلّمها:

```typescript
interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### ترحيل إدارة الحالة

تحويل استدعاءات useState يسير عادة:

```typescript
// Before
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);

// After: Explicit typing
interface User {
  id: string;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);
```

أما مع useReducer فستريد تنويع الحالة والإجراءات معًا:

```typescript
interface State {
  count: number;
  error: string | null;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'error'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: 0 };
    case 'error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
```

### بيانات API والمكتبات الخارجية

عند التعامل مع استجابات API، أنشئ واجهات للبيانات التي تتوقعها:

```typescript
interface ApiUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
}

const useUsers = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((response: ApiResponse<ApiUser>) => {
        setUsers(response.data);
        setLoading(false);
      });
  }, []);

  return { users, loading };
};
```

> **تحذير**
>
> لا تثق ببيانات API دون تحقّق. خُذ في الحسبان استخدام مكتبة تحقّق وقت التشغيل مثل [Zod](https://github.com/colinhacks/zod) لتضمن أن استجابات API تطابق أنواع TypeScript عندك.

## التعامل مع مكتبات الأطراف الثالثة

ليست كل المكتبات مصحوبة بتعريفات TypeScript. هكذا تتعامل مع الحالات المختلفة:

### المكتبات ذات حزم @types

الكثير من المكتبات الشائعة لها أنواع تصونها أوساطة المطورين:

```bash
npm install --save-dev @types/lodash @types/uuid @types/classnames
```

### المكتبات بلا أنواع

أما المكتبات بلا أنواع فيمكنك إنشاء ملفات إعلانات (declaration files) لها:

```typescript
// types/react-some-library.d.ts
declare module 'react-some-library' {
  interface SomeLibraryProps {
    value: string;
    onChange: (value: string) => void;
  }

  const SomeLibrary: React.FC<SomeLibraryProps>;
  export default SomeLibrary;
}
```

أو استخدم نهجًا أكثر تساهلًا أثناء الترحيل:

```typescript
// types/globals.d.ts
declare module 'react-some-library' {
  const content: any;
  export default content;
}
```

## الاختبار أثناء الترحيل

من المفروض أن تستمر اختباراتك القائمة في العمل، لكنك قد ترغب في إضافة بعض أنماط الاختبار الخاصة بـ TypeScript:

```typescript
// UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

test('renders user information', () => {
  render(<UserCard user={mockUser} />);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

// Type-checking test utilities
const renderUserCard = (props: Partial<UserCardProps> = {}) => {
  const defaultProps: UserCardProps = {
    user: mockUser,
    showEmail: true,
  };

  return render(<UserCard {...defaultProps} {...props} />);
};
```

## فخاخ الترحيل وكيف تتجنبها

### لا تحوّل كل شيء في وقت واحد

```typescript
// ❌ Bad: Trying to perfectly type everything immediately
interface SuperComplexProps {
  data: ComplexNestedType & {
    callbacks: {
      onUpdate: (id: string, changes: Partial<Entity>) => Promise<UpdateResult>;
      onDelete: (id: string) => Promise<void>;
    };
  };
  // ... 50 more properties
}

// ✅ Good: Start simple, improve incrementally
interface SuperComplexProps {
  data: any; // TODO: Type this properly later
  onUpdate?: (...args: any[]) => any;
  onDelete?: (id: string) => void;
}
```

### تجنب any، لكن لا تخفه أثناء الترحيل

```typescript
// ✅ Acceptable during migration
const legacyComponent = (props: any) => {
  // Keep the component working while you figure out the types
  return <div>{props.children}</div>;
};

// ✅ Better: Be explicit about what you don't know yet
interface LegacyComponentProps {
  children: React.ReactNode;
  [key: string]: unknown; // For props you haven't typed yet
}
```

### التعامل مع ترحيل defaultProps

إن كنت تستخدم مكوّنات صنف (class components) مع defaultProps، فسيحتاج الترحيل بعض العناية:

```typescript
// Before
class MyComponent extends React.Component {
  static defaultProps = {
    variant: 'primary',
    disabled: false,
  };

  render() {
    // ...
  }
}

// After: Use default parameters instead
interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({
  variant = 'primary',
  disabled = false,
  children,
}) => {
  // ...
};
```

## استراتيجيات وأنماط الترحيل

### عقلية الترحيل

قبل أن نتعمّق أكثر، افهم هذا: **الترحيل ليست غايتُه الكمال**، بل التقدم. فكل ملف تحوّله يجعل شيفرتك أيسر صيانة، حتى لو لم تلمس البقية.

```typescript
// This is perfectly valid during migration
// someFile.js - Still JavaScript
import { processUser } from './userProcessor.ts'; // TypeScript file

// userProcessor.ts - Now TypeScript
export function processUser(user: any): string {
  return `Hello, ${user.name}`; // `any` is okay for now
}
```

### ابدأ بملفات الإعلانات النوعية

أنشئ ملفات `.d.ts` للوحدات القائمة لديك قبل تحويلها. فيوفر لك ذلك منافع أمان الأنواع حتى قبل بدء الترحيل:

```typescript
// types/api.d.ts - Describe existing JS API
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

// Describe your existing JS API functions
export declare function fetchUsers(): Promise<User[]>;
export declare function createPost(data: Omit<Post, 'id' | 'createdAt'>): Promise<Post>;
```

### استراتيجية باب الهروب `any`

استخدم `any` بحكمة أثناء الترحيل:

```typescript
// migration-helpers.ts - Temporary utility types
export type TODO_TYPE = any; // Mark things to fix later
export type LEGACY_PROPS = any; // For old component props
export type API_RESPONSE = any; // For untyped API responses

// Use in components during migration
interface UserListProps {
  users: TODO_TYPE[]; // Will fix this later
  filters: LEGACY_PROPS; // Legacy component props
  onUserSelect: (user: TODO_TYPE) => void; // Gradually type these
}
```

### صرامة ملفًا ملفًا

استخدم توجيهات التعليقات للتحكم في مستوى الملف:

```typescript
// @ts-check - Enable checking in JS files
// users.js
// @ts-check

/**
 * @param {string} name
 * @param {number} age
 * @returns {string}
 */
function formatUser(name, age) {
  return `${name} (${age})`;
}

// TypeScript will catch errors even in JS!
formatUser('Alice', '30'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

```typescript
// Disable strict checks temporarily
// legacy-component.tsx
// @ts-nocheck - Skip this file entirely (temporary)

// Or disable specific lines
const userData = api.getUserData(); // @ts-ignore - Will fix this later
```

## أدوات تعينك في الترحيل

### مساعد الترحيل في TypeScript

يقدم VS Code دعمًا ممتازًا لـ TypeScript مع إصلاحات سريعة نافعة. ابحث عن أيقونة المصباح حين تقع أمام أخطاء أنواع — غالبًا ما يقترح الإصلاح تلقائيًا.

### قواعد ESLint لـ TypeScript

أضف قواعد ESLint هذه لالتقاط المشاكل الشائعة أثناء الترحيل:

```json
// .eslintrc.json - Gradual rule introduction
{
  "extends": ["@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn", // Allow during migration
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-non-null-assertion": "warn", // Discourage !
    "@typescript-eslint/explicit-function-return-type": "off", // Too strict for migration
    "@typescript-eslint/explicit-module-boundary-types": "off"
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "error" // Stricter for new TS files
      }
    }
  ]
}
```

### الاستيرادات النوعية فقط

استخدم الاستيراد النوعي (type-only imports) حين تستورد لأجل الإسناد النوعي وحده:

```typescript
import type { User } from './types';
import { fetchUser } from './api'; // Regular import for runtime code

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  // ...
};
```

### سكربتات الترحيل

أنشئ سكربتات مساعدة تؤتمت مهام الترحيل الشائعة:

```bash
#!/bin/bash
# migrate-file.sh - Helper script to migrate a file

file=$1
if [ -z "$file" ]; then
  echo "Usage: ./migrate-file.sh <file-path>"
  exit 1
fi

# Rename file
if [[ $file == *.js ]]; then
  new_file="${file%.js}.ts"
elif [[ $file == *.jsx ]]; then
  new_file="${file%.jsx}.tsx"
else
  echo "File must be .js or .jsx"
  exit 1
fi

mv "$file" "$new_file"
echo "Migrated $file to $new_file"
echo "Don't forget to:"
echo "1. Add proper prop types"
echo "2. Type event handlers"
echo "3. Update imports in other files"
```

## استراتيجية الترحيل للفريق

### إرشادات مراجعة الشيفرة

أنشئ قالب PR لأعمال الترحيل:

```markdown
## TypeScript Migration Checklist

- [ ] Props interfaces defined for new/modified components
- [ ] Event handlers properly typed
- [ ] API responses typed (even if loosely)
- [ ] No new `any` types without `TODO_TYPE` marker
- [ ] Tests updated with basic types
- [ ] README updated if new patterns introduced

## Migration Progress

- Files converted: `___` / `___`
- Components typed: `___` / `___`
- API endpoints typed: `___` / `___`
```

### تتبّع تقدّمك

راقب ترحيلك بمقاييس بسيطة:

```javascript
// migration-stats.js - Run weekly
const fs = require('fs');
const path = require('path');

function countFiles(dir, ext) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;

  for (const file of files) {
    if (file.isDirectory()) {
      count += countFiles(path.join(dir, file.name), ext);
    } else if (file.name.endsWith(ext)) {
      count++;
    }
  }

  return count;
}

const srcDir = './src';
const jsFiles = countFiles(srcDir, '.js') + countFiles(srcDir, '.jsx');
const tsFiles = countFiles(srcDir, '.ts') + countFiles(srcDir, '.tsx');
const total = jsFiles + tsFiles;

console.log(`Migration Progress:
TypeScript files: ${tsFiles}
JavaScript files: ${jsFiles}
Total files: ${total}
Progress: ${Math.round((tsFiles / total) * 100)}%`);
```

## أهم الخلاصات

الترحيل الناجح لـ TypeScript قائم على **التقدم لا الكمال**:

1. **ابدأ متساهلًا** — اسمح بـ JavaScript، وعطّل التحقق الصارم في البداية
2. **رحّل الحدود أولًا** — خصائص المكوّنات ودوال API والخُطّافات
3. **استخدم أبواب الهروب** — `any` مقبول مؤقتًا
4. **امشِ ملفًا ملفًا** — لا تحاول ترحيل كل شيء دفعة واحدة
5. **احفظ التوافق** — لا تكسر شيفرة JavaScript القائمة
6. **تتبّع التقدم** — قِس التحسينات التدريجية واحتفل بها
7. **فعّل الصرامة تدريجيًا** — شغّل القواعد كلما حسّنت التغطية

تذكّر: شيفرة TypeScript مُرحَّلة جزئيًا خيرُها لا يُحدَّ من شيفرة JavaScript تخشى أن تغيّرها. وكل نوع تضيفه يجعل تطبيقك أيسر صيانة، حتى لو لم تكن البقية متقنة بعد. والغاية ليست أن تكون لك أنواع متقنة في كل موضع، بل أن تصطاد عللًا أكثر، وأن تُحسّن تجربة المطوّر، وأن تجعل شيفرتك أيسر صيانة بمرور الزمن.
