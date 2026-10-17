---
title: "معرض الأيقونات"
---

هناك الكثير من الأيقونات في العالم، لكنك عمومًا تريد استخدام أكبر عدد تحتاج إليه من الأيقونات وأقل عدد يمكنك تدبّره في تطبيقك أو نظام تصميمك. وكتلة `IconGallery` في Storybook تسهّل عليك عرض الأيقونات التي تنوي استخدامها في تطبيقك.

وما يلزم لصنع معرض أيقونات في Storybook ليس بالكثير.

```mdx
import { Meta, Title, IconGallery, IconItem } from '@storybook/blocks';
import { icons, Icon } from './components/icon';

<Meta title="Icons" />

<Title>Icons</Title>

These are the icons being used in our design system. They are available as React components.

<IconGallery>
  {icons.map((icon) => (
    <IconItem key={icon} name={icon}>
      <Icon type={icon} />
    </IconItem>
  ))}
</IconGallery>
```

معرض أيقونات في Storybook

> **تنفيذ مكوّن `Icon`**
>
> يمكنك الاطلاع على تنفيذي لمكوّن `Icon` [هنا](https://stevekinney.com/courses/storybook/creating-an-icon-component).
