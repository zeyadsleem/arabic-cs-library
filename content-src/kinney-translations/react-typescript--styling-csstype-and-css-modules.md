---
title: "التنسيق (Styling) باستخدام Csstype ووحدات CSS (CSS Modules)"
---

التنسيق في React مع TypeScript لا يجب أن يشعر وكأنه معركة مستمرة مع مدقق الأنواع. سواء كنت تستخدم أنماط inline، أو وحدات CSS (CSS Modules)، أو تبني نظام تصميم (design system)، يمكن لـ TypeScript أن يجعل تنسيقك أكثر متانة وودية للمطوّر. لنتعرّف على كيفية كتابة أنماطك بشكل آمن الأنواع باستخدام `csstype`، ووحدات CSS، وأنماط inline styles التي تتوسّع.

## التحدي في التنسيق وTypeScript

عند تنسيق مكوّنات React، 종종 تجد نفسك في أحد هذه المواقف:

- كتابة أنماط inline والتساؤل أي الخصائص فعليًا صالحة
- استخدام وحدات CSS وفقدان سلامة الأنواع بين CSS وTypeScript
- بناء مكوّنات نظام تصميم حيث خصائص النمط (style props) بحاجة إلى كتابة صارمة
- الإحباط من escapes `any` فقط لإرضاء مدقق الأنواع

الخبر السار؟ تطوّر نظام TypeScript أدوات متطوّرة للتعامل مع كل هذه السيناريوهات بسلاسة.

## دخول csstype: الأساس

حزمة [`csstype`](https://www.npmjs.com/package/csstype) توفّر تعريفات TypeScript شاملة لجميع خصائص وقيم CSS. هي ما بُني عليه نوع `CSSProperties` المدمج في React، وفهمها يفتح أنماط تنسيق أفضل.

```bash
npm install csstype
```

### الاستخدام الأساسي لـ `csstype`

في أبسط صوره، يمنحك `csstype` أنواعًا دقيقة لخصائص CSS:

```typescript
import { Property } from 'csstype';

// ✅ Specific property types
const borderRadius: Property.BorderRadius = '8px';
const display: Property.Display = 'flex';
const color: Property.Color = '#3b82f6';

// ❌ TypeScript will catch invalid values
// const invalidDisplay: Property.Display = 'invalid'; // Type error!
```

هذا بالفعل أدق من استخدام `string` في كل مكان، لكن القوة الحقيقية تأتي عند بناء مكوّنات قابلة لإعادة الاستخدام.

## كتابة Anماط Inline (Inline Styles) بشكل صحيح

`CSSProperties` في React مبني على `csstype`، لكن يمكنك توسيعه لحالات استخدام أكثر تحديدًا:

```typescript
import React from 'react';
import { CSSProperties } from 'react';

interface StyledBoxProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

const StyledBox: React.FC<StyledBoxProps> = ({ children, style }) => {
  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: '#f3f4f6',
        ...style, // User styles override defaults
      }}
    >
      {children}
    </div>
  );
};

// Usage with full type safety
<StyledBox
  style={{
    backgroundColor: '#3b82f6', // ✅ Valid
    padding: '2rem',           // ✅ Valid
    // invalidProp: 'value'    // ❌ Type error
  }}
>
  Content here
</StyledBox>
```

### إنشاء أنواع نمط (Style Types) مخصّصة

لأنظمة التصميم، 종종 تريد تقييد خصائص معينة بقيم محدّدة:

```typescript
import { CSSProperties } from 'react';
import { Property } from 'csstype';

interface DesignSystemColors {
  primary: '#3b82f6';
  secondary: '#6b7280';
  success: '#10b981';
  warning: '#f59e0b';
  danger: '#ef4444';
}

interface ThemeSpacing {
  xs: '0.25rem';
  sm: '0.5rem';
  md: '1rem';
  lg: '1.5rem';
  xl: '2rem';
}

// Restrict certain CSS properties to design system values
interface RestrictedStyleProps {
  color?: keyof DesignSystemColors;
  backgroundColor?: keyof DesignSystemColors;
  padding?: keyof ThemeSpacing;
  margin?: keyof ThemeSpacing;
  // Allow other CSS properties without restriction
  [K in keyof Omit<CSSProperties, 'color' | 'backgroundColor' | 'padding' | 'margin'>]?: CSSProperties[K];
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  style?: RestrictedStyleProps;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', style }) => {
  const baseStyles: CSSProperties = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: 600,
  };

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, CSSProperties> = {
    primary: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: 'white',
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};
```
