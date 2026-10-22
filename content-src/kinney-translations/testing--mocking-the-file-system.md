---
title: "محاكاة قراءة الملفات وكتابتها"
---

عادةً، عندما تختبر شيئًا مثل عمليات الملفات، فإنك لا تريد فعليًا أن تعبث اختباراتك بنظام ملفاتك. لا نريد لاختبار وحدة شارد أن يغيّر الملف الذي يحوي تفضيلات غداء زملائك في العمل، أو، حاشا لله، أن يحذفه بالكامل. هنا تأتي المحاكاة. فبالمحاكاة يمكننا أن *نتظاهر* فقط بأننا نقرأ الملفات ونكتبها. يجعل Vitest وأدوات حديثة مثل `fs/promises` هذا الأمر بالغ البساطة. فلنغص في التفاصيل.

## تهيئة المشهد

لنفترض أن لديك هذه الوحدة الصغيرة الفاخرة التي تقرأ من ملف، وتعدّل البيانات، ثم تكتبها مرة أخرى. شيء *واقعي* حقًا مثل هذا:

```javascript
// fileOperations.js
import { readFile, writeFile } from 'fs/promises';

export async function processFile(filePath, content) {
  const existingContent = await readFile(filePath, 'utf-8');
  const updatedContent = `${existingContent}\n${content}`;
  await writeFile(filePath, updatedContent);
  return updatedContent;
}
```

الحلم هنا أن تمرّر مسار ملف وبعض المحتوى الجديد، فيُلحق ذلك المحتوى بما في الملف. أمر معتاد تمامًا. لكن من أجل اختباراتنا، لا نريد أن نقرأ أو نكتب ملفات فعليًا.

## محاكاة نظام الملفات باستخدام Vitest

يمكننا محاكاة `fs/promises` باستخدام دالة `vi.mock()` في Vitest. يتيح لنا ذلك *اعتراض* تلك النداءات إلى `readFile` و`writeFile` وإعادة قيم محددة نريدها.

### كتابة الاختبار

لنكتب الاختبارات أولًا، مع محاكاة نداءات نظام الملفات تلك كي لا نُدمّر أي ملفات حقيقية.

```javascript
import { processFile } from './fileOperations';
import { readFile, writeFile } from 'fs/promises';
import { describe, it, expect, vi } from 'vitest';

vi.mock('fs/promises'); // this magic line mocks the whole module

describe('processFile', () => {
  it('should read content, append new content, and write it back', async () => {
    // Arrange: Set up mock behavior
    const mockFilePath = 'mockFile.txt';
    const mockExistingContent = 'Hello World';
    const mockNewContent = 'Vitest is awesome';

    // Mock 'readFile' to return some existing content
    readFile.mockResolvedValue(mockExistingContent);

    // Act: Call the function we're testing
    const result = await processFile(mockFilePath, mockNewContent);

    // Assert: Did the magic happen?
    expect(readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    expect(writeFile).toHaveBeenCalledWith(
      mockFilePath,
      `${mockExistingContent}\n${mockNewContent}`,
    );
    expect(result).toBe(`${mockExistingContent}\n${mockNewContent}`);
  });
});
```

### تفكيك الأمر

#### البديل المُحاكى

`vi.mock('fs/promises')` يقول أساسًا: «مرحبًا Vitest، لا تحاول حتى التفاعل مع نظام الملفات الحقيقي، حاكِ فقط كل شيء في هذه الوحدة.»

#### محاكاة `readFile`

نريد أن نحاكي قراءة الملف دون القيام بذلك فعليًا. تقول `readFile.mockResolvedValue(mockExistingContent)` لـ Vitest: «كلما نادى أحدهم `readFile`، بدلًا من الوصول إلى القرص، أعطه هذا المحتوى المُحاكى فقط.»

#### التحقق من `writeFile`

بعد إلحاق المحتوى، ستحتاج إلى التحقق من أنه ينادي `writeFile` بشكل صحيح. فعبارة `expect(writeFile).toHaveBeenCalledWith(mockFilePath, expectedContent)` تؤكد أنه يكتب ما تتوقعه.

### تشغيل الاختبار

بافتراض أن Vitest معدّ بالكامل، يمكنك إطلاق الاختبار بتشغيل:

```bash
npx vitest
```

وإن كان كل شيء موصولًا بشكل صحيح، فسينجح! 🎉

## المزالق الشائعة

1. **نسيان محاكاة الشيء الصحيح:** تقع واجهة نظام الملفات تحت أسماء مختلفة (`fs`، `fs/promises`). تأكد من أنك تحاكي الاسم الصحيح! تفضّل شيفرة Node.js الأحدث `fs/promises`، ولهذا نحاكيه.
2. **البدائل المُحاكاة التي تُعيد undefined:** إن نسيت `mockResolvedValue`، فسيُعيد Vitest القيمة `undefined` افتراضيًا. لذا إن كنت تتساءل لماذا يُطلق اختبارك `undefined is not a function`، فافحص تلك البدائل المُحاكاة!

## أفكار ختامية

قد تكون محاكاة قراءة الملفات وكتابتها مخيفة قليلًا في البداية، لكن بمجرد أن تتقنها، ستصبح اختباراتك أنظف وأسرع وأقل احتمالًا لمحو ملفات ثمينة لأحدهم (ملفاتك أنت مثلًا).
