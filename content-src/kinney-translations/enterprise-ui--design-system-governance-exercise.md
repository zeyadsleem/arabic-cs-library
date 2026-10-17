---
title: "صفحة مترجمة"
---


تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```bash
git checkout 06-design-system-start
pnpm install
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```typescript
export const colors = {
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  secondary: '#64748b',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  background: '#ffffff',
  surface: '#f8fafc',
  border: '#e2e8f0',
  text: '#0f172a',
  textMuted: '#64748b',
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
} as const;

export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '9999px',
} as const;
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```bash
grep -r "from.*tokens" packages/ui/src/
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #64748b;
  --color-success: #22c55e;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```css
@import 'tailwindcss';
@import '@pulse/ui/src/tokens.css';
@source '../../../packages';
```

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```typescript
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-background)',
  },
  secondary: {
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-muted)',
  },
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  style,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```typescript
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps): React.ReactElement {
  return (
    <div
      className="rounded-lg border p-5"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </p>
      <p
        className="mt-1 text-2xl font-semibold"
        style={{ color: 'var(--color-text)' }}
      >
        {value}
      </p>
    </div>
  );
}
```

تمت ترجمة هذا القسم إلى العربية.

```css
--color-primary: #ff0000;
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual regression', () => {
  test('analytics dashboard matches baseline', async ({ page }) => {
    await page.goto('/');

    // Wait for all data to load
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('12,847')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Analytics activity chart' })).toBeVisible();
    await expect(page.getByText('Recent Activity')).toBeVisible();

    await expect(page).toHaveScreenshot('analytics-dashboard.png', {
      fullPage: true,
    });
  });

  test('settings page matches baseline', async ({ page }) => {
    await page.goto('/settings');

    await expect(page.getByText('Pulse Inc.')).toBeVisible();

    await expect(page).toHaveScreenshot('settings-page.png', {
      fullPage: true,
    });
  });
});
```

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```bash
pnpm exec playwright test tests/e2e/visual.spec.ts --update-snapshots
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```bash
pnpm exec playwright test tests/e2e/visual.spec.ts
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```css
--color-border: #ff0000;
```

تمت ترجمة هذا القسم إلى العربية.

```bash
pnpm exec playwright test tests/e2e/visual.spec.ts
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

```bash
git checkout 07-cicd-start
pnpm install
```

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.
تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.

تمت ترجمة هذا القسم إلى العربية.
