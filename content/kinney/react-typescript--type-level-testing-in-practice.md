---
title: "اختبار الأنواع (Type-Level Testing) في الممارسة"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/type-level-testing-in-practice"
---

يمكن للأنواع أن تتدحرج (regress) بصمت. أضف اختبارات على مستوى الأنواع (type-level tests) للكشف عن الأعطال عند إعادة تشكيل الأنواع العامة (generics)، والتحميلات الزائدة (overloads)، والواجهات البرمجية العامة (public APIs).

## `tsd` أو `expectTypeOf`

```typescript
// vitest + expectTypeOf
import { expectTypeOf, describe, it } from 'vitest';

type Foo<T> = { value: T };

describe('Foo', () => {
  it('preserves generic', () => {
    const x: Foo<number> = { value: 42 };
    expectTypeOf(x.value).toEqualTypeOf<number>();
  });
});
```

## التكامل المستمر (CI) وتغطية الأنواع

- شغّل اختبارات الأنواع في CI تمامًا كما تفعل مع اختبارات الوحدة.
- تتبّع ميزانيات «تغطية الأنواع»: امنع `any`، وفرض `noUncheckedIndexedAccess`.
- اجعل إصدارات مكتبات المكوّنات مشروطة باجتياز تحقّقات الأنواع.

## اختبار المكوّنات متعدّدة الأشكال (Polymorphic)

```typescript
import { expectTypeOf, it } from 'vitest';

// Polymorphic Button with `as` prop
declare function Button<C extends React.ElementType = 'button'>(props: {
  as?: C;
} & React.ComponentPropsWithoutRef<C>): React.ReactNode;

it('infers correct props for anchor', () => {
  const el = <Button as="a" href="/" />;
  expectTypeOf(el.props.href).toBeString(); // href must exist on anchor
});
```

## الحفاظ على خصائص مكوّنات higher-order (HOC)

```typescript
function withLogging<P>(Comp: React.ComponentType<P>) {
  return (props: P) => <Comp {...props} />;
}

type InputProps = { value: string; onChange: (v: string) => void };
const Input: React.FC<InputProps> = () => null;
const LoggedInput = withLogging(Input);

// ensure HOC preserves prop types
expectTypeOf<Parameters<typeof LoggedInput>[0]>().toEqualTypeOf<InputProps>();
```

## إعداد `tsd` (بديل)

```json
// package.json
{
  "scripts": {
    "test:types": "tsd"
  }
}
```

```typescript
// tsd.config.json
{
  "entry": "./types/**/*.test-d.ts"
}
```

```typescript
// types/button.test-d.ts
import { expectType } from 'tsd';
import { Button } from '../dist';

expectType<JSX.Element>(<Button />);
```

## حماية الواجهات البرمجية العامة (Public APIs) في المكتبات

- صدّر الأنواع (`export type { ButtonProps }`) وتحقّق منها في `test:types`.
- ثبّت overloads والقيم الافتراضية (defaults) للـ generics بتحقّقات موجّهة.

## لقطات (Snapshots) لأنواع مكوّنات public

ثبّت واجهتك البرمجية public بأنواع type snapshots باستخدام `tsd` أو `expectTypeOf`.

```typescript
// tsd: Button and TextField public types
import type { ComponentProps } from 'react';
import { expectType } from 'tsd';
import { Button } from '../dist';
import { TextField } from '../dist';

// Button supports as="a" | "button" and mirrors intrinsic attrs
type ButtonProps = ComponentProps<typeof Button>;
expectType<ButtonProps>({ as: 'button', onClick: () => {} });
expectType<ButtonProps>({ as: 'a', href: '/home' });
// @ts-expect-error - anchors need href
expectType<ButtonProps>({ as: 'a' });

// TextField narrows onChange to the correct event type
type TextFieldProps = ComponentProps<typeof TextField>;
expectType<TextFieldProps>({ label: 'Name', value: '', onChange: (e) => e.target.value });
expectType<TextFieldProps>({
  as: 'textarea',
  label: 'Bio',
  defaultValue: '',
  onChange: (e) => e.target.value,
});
// @ts-expect-error - wrong event type for textarea
expectType<TextFieldProps>({
  as: 'textarea',
  label: 'Bio',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
});
```
