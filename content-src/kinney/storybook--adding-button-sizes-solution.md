---
title: "Solution: Adding Button Size Variants and Controls"
lang: "en"
chapter: "storybook"
slug: "adding-button-sizes-solution"
order: 34
source: "https://stevekinney.com/courses/storybook/adding-button-sizes-solution"
---

We should also probably update the component as well, right?

```typescript
import { ComponentProps } from 'react';
import clsx from 'clsx';

import styles from './button.module.css';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
};

export const Button = ({ variant = 'primary', size = 'medium', ...props }: ButtonProps) => {
  return <button className={clsx(styles.button, styles[variant], styles[size])} {...props} />;
};
```

Lastly, we need to add additional stories for our button sizes.

```typescript
export const Small: Story = {
  args: {
    children: 'Button',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Button',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'large',
  },
};
```

As promised, it’s time to talk about [default arguments](https://stevekinney.com/courses/storybook/default-args).
