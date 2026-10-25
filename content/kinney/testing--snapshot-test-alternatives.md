---
title: "بدائل اختبار اللقطات (Snapshot Test Alternatives)"
lang: ar
source: "https://stevekinney.com/courses/testing/snapshot-test-alternatives"
---

اختبارات اللقطات — أحببها أو اكرهها. تبدو *بالغة* الفائدة في البداية. «انظر، لقد نجحت للتو في جعل هذا الاختبار يمر بتحديث اللقطة!» لكن بعد شهر، حين تكون تلك اللقطة 1,200 سطر من JSON ولا تتذكر حتى ما تختبره؟ نعم، جميعنا مررنا بذلك. إذن، إذا أردت تجنب فخ تحوّل اختبارات اللقطات إلى كابوس صيانة، فماذا يمكنك أن تفعل بدلًا من ذلك؟ لنستكشف بعض البدائل الواقعية التي تبقي مجموعة اختباراتك مفيدة وقابلة للصيانة معًا.

## اختبار أجزاء فردية من المخرجات

اللقطات مغرية للغاية لأنك ببساطة «تلتقط» مخرجات مكوّن دفعة واحدة. لكن في تسع حالات من عشر، من المحتمل ألا تكون مهتمًا بـ*كل* ما يخرج. ما يهمك **حقًا** هو تلك القطعة الصغيرة المحددة من المخرجات — صنف CSS أو وسم أو بعض النص.

لنفترض أن لديك مكوّن `Button`. بدلًا من أخذ لقطة للمكوّن بأكمله، لنركّز على الجزء الأساسي. على سبيل المثال، قد نريد التأكد من أن الزر يستخدم الصنف الصحيح ويعرض التسمية الصحيحة:

```javascript
import { render } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('renders with the right label and class', () => {
    const { getByRole } = render(Button, { props: { label: 'Click Me' } });

    const button = getByRole('button');

    // Instead of snapshotting the whole thing
    expect(button.textContent).toBe('Click Me');
    expect(button.classList).toContain('btn-primary');
  });
});
```

بوم. أنت الآن تختبر بالضبط ما يهم… ولن تغرق في فروق لا نهائية عندما تتغير الحشوة (padding) على الزر.

## اختبار السلوك بدلًا من المخرجات

تركّز اللقطات *بشدة* على «ماذا» (كيف تبدو المخرجات؟). لكن هل فكرت يومًا في «كيف»؟ أنت لا تكتب المكوّنات فقط لتبدو جميلة؛ ينبغي أن *تفعل* شيئًا، كما تعلم.

هنا يأتي دور اختبار السلوك. لنبقَ مع مثال `Button` ولنتخيل أن لديه معالج نقر. لا يهمنا كيف يبدو DOM بعد التصيير — يهمنا ما إذا كان ينشر حدث نقر عندما ينقر المستخدم عليه فعليًا.

```javascript
import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import Button from './Button.vue';

describe('Button', () => {
  it('emits an event when clicked', async () => {
    const { getByRole, emitted } = render(Button, {
      props: { label: 'Click Me' },
    });

    const button = getByRole('button');

    await fireEvent.click(button);

    expect(emitted()).toHaveProperty('click');
  });
});
```

ها أنت ذا — تختبر السلوك، لا الترميز. إذا كان للزر الآن هوامش بكسل تتغير، أو بعض عنصر span غامض جديد متداخل، فلن تنزعج من فروق لا معنى لها.

## استخدام تحققات نصية، لا اللقطات

للمكوّنات الأكبر التي تصيّر تخطيطات أكثر تعقيدًا، قد يكون التمثيل النصي أسهل في الفهم من مخرجات HTML الخام. التحققات النصية صديقتك عندما تركّز على المحتوى الموجّه للمستخدم.

لنفترض أننا نختبر مكوّن `UserProfile` يعرض اسم المستخدم ومسمّاه الوظيفي. بدلًا من أخذ لقطة للمكوّن بأكمله (وأن تموت موتًا بطيئًا مع كل تغيير تخطيط دقيق)، يمكنك اختبار أن المحتوى الصحيح يُصيّر:

```javascript
import { render } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import UserProfile from './UserProfile.vue';

describe('UserProfile', () => {
  it("renders the user's name and title", () => {
    const { getByText } = render(UserProfile, {
      props: { user: { name: 'Jane Doe', title: 'Developer' } },
    });

    // Test user-facing text—super easy to follow and maintain
    expect(getByText('Jane Doe')).toBeTruthy();
    expect(getByText('Developer')).toBeTruthy();
  });
});
```

في المرة القادمة التي يتغير فيها التخطيط، لا قلق من فروق ضخمة. أنت تتحقق من الشيء الوحيد الذي يهم المستخدمين فعلًا — ما *يرونه* و*يقرؤونه*.

## مطابقات مخصصة

أحيانًا تتسلل لقطات JSON إلى الحفلة. إذا وجدت نفسك في ذلك السيناريو، ففكر في كتابة مطابقات مخصصة لجعل الاختبار أكثر صراحة. مع Vitest، يمكنك إنشاء مطابقات لتبسيط تلك التحققات المعقدة.

```javascript
expect.extend({
  toHaveTextContent(received, argument) {
    const pass = received.textContent.includes(argument);
    if (pass) {
      return {
        message: () => `expected ${received} not to have text content ${argument}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to have text content ${argument}`,
        pass: false,
      };
    }
  },
});

// In your test
expect(button).toHaveTextContent('Click Me');
```

يساعد ذلك في إبقاء الأمور مقروءة — ويتجنب جحيم اللقطات.

## متى/إن كانت اللقطات قد تساعد فعلًا

لا أطلب منك حذف **كل** اللقطات من حياتك. ثمة أوقات تكون فيها مريحة جدًا — مثل تتبع كتلة ضخمة من كائنات التهيئة أو بيانات استجابة واجهة برمجة التطبيقات المُحاكاة حيث تحتاج الصورة الكاملة.

لكن الحيلة هي استخدامها **باعتدال**. ركّز اختباراتك على الأجزاء الحرجة من واجهتك وتفاعلاتك، واحفظ اللقطات للبيانات أو عندما تكون البنية *مهمة حقًا*.

## أفكار ختامية

قد تبدو اللقطات جذابة لأنها تشبه شبكة أمان «اضبطها وانسها»، لكنها في كثير من الأحيان تتحول إلى كابوس «اضبطها وارجُ أن تنسى أن طلب السحب هذا حدث أصلًا». تمسّك بالبدائل: اختبر السلوك، واختبر مخرجات محددة، وإذا امتدت يدك إلى لقطة يومًا ما، فحاول اختبار الجزء الذي يهم حقًا فقط. ستشكر نفسك حين لا تغرق في فروق اللقطات في نشر ليلة الجمعة القادمة.
