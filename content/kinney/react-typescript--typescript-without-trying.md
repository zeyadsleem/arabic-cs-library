---
title: "استخدام TypeScript دون أن تبذل جهدًا"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/typescript-without-trying"
---

**إليك فكرة محورية في هذه الورشة**: ليست أعظم قوة خارقة في TypeScript هي الأنواع الصريحة التي تكتبها، بل الأنواع التي *لا* تضطر إلى كتابتها. فإن TypeScript الحديث بارع جدًا في استنتاج ما قصدته، وكثيرًا ما يمنحك سلامة أنواع محكمة دون أي جهد إضافي. وسأحاول خلال وقتنا معًا أن أقنعك بأنك تسير على الطريق الصحيح حين تكاد لا تلاحظ أنك تستخدم TypeScript في مشروعك أصلًا.

## سحر استدلال الأنواع

أصبح محرّك الاستدلال في TypeScript *جيدًا إلى حدٍّ مخيف*. في حالات كثيرة يمكنك أن تكتب ما يشبه JavaScript العادي، ومع ذلك تحصل على فحص شامل للأنواع، وإكمال تلقائي، ودعم لإعادة الهيكلة. فما السر؟ إن TypeScript يحلّل بنية شيفرتك، وتوقيعات دوالك، وقيم الإرجاع فيها ليبني صورة كاملة عن أنواعك.

وهذا هو الجزء الجميل: من المرجّح أنك تحصل فعلًا على فوائد من TypeScript أكثر مما تدرك.

## خصائص المكوّن (props): الاستدلال في العمل

تأمّل هذا المكوّن الصغير الساذج. وبحسب ما يمكننا ملاحظته في هذه المرحلة، لا يكاد يوجد دليل على أنه يستخدم TypeScript إطلاقًا. صحيح أنه يبدو مثل JavaScript ويتصرف مثل JavaScript في الوقت نفسه. وإذا لم يتمكّن TypeScript من استنتاج نوع خاصية معيّنة، فسيشير إليها ببساطة على أنها `any`.

```typescript
// @ts-ignore
export const NameTag = ({ name, title, level, isOnline }) => {
  return (
    <div className="w-96 overflow-hidden rounded-xl border-2 border-red-600 bg-white shadow-md">
      <div className="bg-red-600 px-4 py-2 text-center font-bold tracking-widest text-white uppercase">
        <div className="text-3xl">Hello</div>
        <div>My name is</div>
      </div>
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <div className="text-3xl font-bold">{name}</div>
        <div className="text-gray-700">
          <div className="text-sm">{title}</div>
          <div className="text-xs">Level {level}</div>
        </div>
        {isOnline && (
          <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
            Online
          </div>
        )}
      </div>
    </div>
  );
};
```

إنه يعمل من الناحية التقنية، ونحصل على فائدة *ضئيلة*: فعلى الأقل يعرف IntelliSense ما الخصائص التي يمكن أن يستقبلها هذا المكوّن، حتى وإن لم يكن يعرف ما الأنواع التي ينبغي أن تكون عليها تلك القيم.

ومع أن هذا يعمل، يمكننا الحصول على استدلال أفضل بتوفير قيم افتراضية للمعاملات:

```typescript
// ✅ Better: defaults help TypeScript infer more precisely
export const NameTag = ({ name = '', title = '', level = 0, isOnline = false }) => {
  return (
    <div className="w-96 overflow-hidden rounded-xl border-2 border-red-600 bg-white shadow-md">
      {/* The rest of the component… */}
    </div>
  );
};
```

الآن يعرف TypeScript أن `name` ينبغي أن يكون نصًا، وأن `level` ينبغي أن يكون رقمًا، وأن `isOnline` ينبغي أن يكون قيمة منطقية، وكل ذلك دون كتابة أي نوع صريح واحد.

## تعريف أنواع الخصائص

وبالطبع يمكننا جعل الأمر أسهل من ذلك بالتسمية الصريحة للخصائص التي يتوقعها مكوّننا.

```typescript
type NameTagProps = {
  name: string;
  title: string;
  level: number;
  isOnline?: boolean;
};

// 🏆 Best: explicitly define the types for the component's props.
export const NameTag = ({ name, title, level, isOnline = false }: NameTagProps) => {
  return (
    <div className="w-96 overflow-hidden rounded-xl border-2 border-red-600 bg-white shadow-md">
      {/* The rest of the component… */}
    </div>
  );
};
```
