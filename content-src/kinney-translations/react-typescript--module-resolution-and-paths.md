---
title: "حلّ الوحدات ومساراتها"
---

تحوّل هياكل المجلدات العميقة عمليات الاستيراد إلى كابوس. أنت تعرف الطريقة تمامًا: `../../../components/ui/Button` في كل مكان، ومسارات هشّة تنكسر متى أعدتَ الهيكلة، وعبارات استيراد تبدو وكأنها تحاول الهروب من قاعدتك البرمجية كليًا. و**حلّ الوحدات** و**مسارات الاختصار** يحلّان هذه المشكلة بأن يتيحا لك كتابة استيرادات مطلقة نظيفة مثل `@/components/Button` أو `~/utils/helpers` — لكن ذلك لا يتحقّق إلا إن ضبطتَ TypeScript ومُجمِّع الملفات على نحو صحيح.

حلّ الوحدات هو الطريقة التي يعثر بها TypeScript (ومُجمِّع ملفاتك) على الملفات التي تستوردها. أمّا مسارات الاختصار فتتيح لك إنشاء اختصارات — فكّر فيها كأنها إشارات مرجعية للمجلدات التي تستوردها كثيرًا. أمّا الحيلة فهي التأكّد من أن مسارات `tsconfig.json` لديك تطابق ما يتوقّعه مُجمِّع الملفات، ليعمل كودك في بيئة التطوير وفي الإنتاج على حدّ سواء.

## المشكلة مع الاستيراد النسبي

قبل أن نغوص في الحلول، لنُعترف أولًا بأن الاستيراد النسبي يصبح فوضويًا:

```typescript
// ❌ Fragile and hard to read
import Button from '../../../components/ui/Button';
import { formatDate } from '../../../../utils/date';
import { useAuth } from '../../../hooks/useAuth';

// What happens when you move this file?
// What happens when you refactor the folder structure?
```

في كل مرة تنقل فيها ملفًا أو تُعيد تنظيم المجلدات، تجد نفسك تطارد المسارات النسبية. ولا تُعطِني بداية الحديث عن الحمل المعرفي الناتج عن عدّ أجزاء `../` لتعرف أين تقف فعلًا داخل مشروعك.

## ضبط مسارات الاختصار في TypeScript

يتيح لك ملف `tsconfig.json` في TypeScript تعريف تعيينات مسارات تنشئ اختصارات إلى المجلدات المستخدَمة كثيرًا. إليك إعدادًا نموذجيًا:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/types/*": ["src/types/*"],
      "~/assets/*": ["public/assets/*"]
    }
  }
}
```

تصبح استيراداتك الآن نظيفة ويمكن التنبؤ بها:

```typescript
// ✅ Clear, absolute, and refactor-safe
import Button from '@/components/ui/Button';
import { formatDate } from '@/utils/date';
import { useAuth } from '@/hooks/useAuth';
```

### أنماط مسارات الاختصار الشائعة

تفضّل كل فريق اصطلاحاته الخاصة. إليك أكثر الأساليب شيوعًا:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // Option 1: @ prefix (popular with Vue/Nuxt)
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],

      // Option 2: ~ prefix (popular with Next.js)
      "~/*": ["src/*"],
      "~/components/*": ["src/components/*"],

      // Option 3: No prefix, just descriptive names
      "components/*": ["src/components/*"],
      "utils/*": ["src/utils/*"],

      // Option 4: Mix and match based on usage
      "@/*": ["src/*"],
      "assets/*": ["public/assets/*"],
      "styles/*": ["src/styles/*"]
    }
  }
}
```

> **نصيحة**
>
> التزم باصطلاح واحد في كل مشروع. فخلطُ بادئتَي `@/` و`~/` سيُربك فريقك ويُربك نفسك في المستقبل.

## ضبط مُجمِّع الملفات

هنا تصبح الأمور معقّدة: يتولّى TypeScript فحص الأنواع، لكن مُجمِّع الملفات (Vite وWebpack وغيرها) يتولّى حلّ الملفات فعليًا أثناء التشغيل. ولا بدّ أن يتّفق الاثنان على معنى مسارات الاختصار لديك.

### ضبط Vite

إذا كنت تستخدم Vite، فعليك ضبط آليّة حلّ مسارات الاختصار فيه:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
    },
  },
});
```

**بدلًا من ذلك**: يمكنك استخدام [vite-tsconfig-paths](https://npm.im/vite-tsconfig-paths) لتجعل Vite يستخدم مسارات `tsconfig.json` لديك.
