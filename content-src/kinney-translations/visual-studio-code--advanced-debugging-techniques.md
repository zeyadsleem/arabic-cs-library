---
title: "تقنيات تنقيح متقدّمة"
---

## نقاط التوقّف الشرطية

تتيح لك نقاط التوقّف الشرطية إيقاف التنفيذ فقط عند تحقّق شرط محدّد. وهذا مفيد للغاية حين تحتاج إلى التحقيق في خطأ لا يظهر إلا في ظروف معيّنة، فيغني عن التقدّم سطرًا بسطر عبر شيفرة لا علاقة لها بالمشكلة.

لضبط نقطة توقّف شرطية، انقر بزر الفأرة الأيمن على نقطة توقّف قائمة (أو في الهامش الأيسر حيث توضع نقاط التوقّف) واختر “Edit Breakpoint…“. ثم اختر “Expression” من القائمة المنسدلة. وأدخل تعبير JavaScript يُقيَّم إلى `true` أو `false`. ولن تُفعَّل نقطة التوقّف إلا إذا كان التعبير `true`.

فمثلًا، تخيّل أنك تنقّح حلقة ولا تريد التوقّف إلا عندما يكون المتغيّر `i` أكبر من 100 والمتغيّر `data[i].status` مساويًا لـ “error”:

```typescript
// Your code
for (let i = 0; i < data.length; i++) {
  // … some code …
}

// Conditional Breakpoint Expression:
i > 100 && data[i].status === 'error';
```

لن يتوقّف المُنقّح الآن إلا *داخل* الحلقة عندما يكون *كلا* الشرطين صحيحًا. وهذا أكفأ بكثير من التقدّم يدويًا عبر الحلقة مئات المرّات.

## Logpoints مقابل console.log: مقارنة مباشرة

يساعدك كلٌّ من Logpoints وعبارات `console.log` على تتبّع تنفيذ البرنامج وفحص القيم، لكنهما يختلفان اختلافًا كبيرًا في طريقة عملهما ووقت استخدام كلٍّ منهما.

### المقاربة التقليدية بـ console.log

```javascript
function processData(item) {
  console.log('Processing item:', item.id, 'name:', item.name); // Added manually

  // Process the item...

  console.log('Processing completed, result:', result); // Added manually
  return result;
}
```

### مقاربة Logpoint

```javascript
function processData(item) {
  // No code modification needed! Logpoint added through Visual Studio Code UI:
  // "Processing item: {item.id}, name: {item.name}"

  // Process the item...

  // Another logpoint added through Visual Studio Code UI:
  // "Processing completed, result: {result}"
  return result;
}
```

### الفروق الجوهرية

| الميزة | console.log | Logpoints |
| --- | --- | --- |
| **تعديل الشيفرة** | يتطلّب تغيير الشيفرة المصدرية | لا حاجة إلى أي تغيير في الشيفرة المصدرية |
| **التحكّم في الإصدارات** | تظهر التغييرات في الإيداعات | غير مرئية لنظام التحكّم في الإصدارات |
| **النشر** | يجب حذفها أو تحويلها إلى تعليقات قبل الإنتاج | تُزال تلقائيًا عند انتهاء التنقيح |
| **التسجيل الشرطي** | يتطلّب عبارات if صريحة | دعم مدمج لتعبيرات الشروط |
| **أثر الأداء** | تُنفَّذ دائمًا، حتى في الإنتاج | نشطة أثناء التنقيح فقط |
| **الاستمرارية** | تبقى في الشيفرة حتى تُحذف يدويًا | تستمر بين جلسات التنقيح لكنها لا تؤثّر في الإنتاج |
| **التعاون** | يرى زملاؤك سجلات التنقيح الخاصة بك | لا تؤثّر في تجربة زملائك |

### متى تستخدم كل مقاربة

**استخدم console.log عندما:**

- تحتاج إلى سجلات في الإنتاج لأغراض المراقبة أو التدقيق
- تريد أن يرى أعضاء الفريق السجلات نفسها
- تستخدمه كجزء من استراتيجيتك الدائمة للتسجيل

**استخدم Logpoints عندما:**

- تحتاج إلى مخرَج تنقيح مؤقّت
- تستكشف شيفرة غير مألوفة
- تنقّح مكتبات طرف ثالث
- تريد تجنّب إثقال الإيداعات بشيفرة تنقيح
- تحتاج إلى مخرَج تنقيح شرطي من دون تعديل الشيفرة

لإضافة logpoint، انقر بزر الفأرة الأيمن في هامش نقاط التوقّف واختر “Add Logpoint…“. وأدخل رسالة تُسجَّل. ويمكنك استخدام الأقواس المعقوفة `{}` لتضمين تعبيرات داخل رسالة السجل، على غرار القوالب النصية (template literals).

```typescript
// Your code
function processData(item: any) {
  // … some code …
}

// Logpoint Message:
('Processing item: {item.id}, name: {item.name}');
```

عند بلوغ نقطة الـ logpoint، تُطبع الرسالة في Debug Console، مع القيم المُقيَّمة لـ `item.id` و`item.name`.

> **نصيحة**
>
> تُعدّ Logpoints مفيدة للغاية لتنقيح شيفرة لا تملكها أو لا تستطيع تعديلها مباشرة. وهي أيضًا ممتازة لتشخيص المشكلات في بيئات الإنتاج حيث لا يمكنك بسهولة إعادة تشغيل التطبيق بشيفرة معدّلة.

## نقاط توقّف العدّ التراكمي

تتيح لك نقاط توقّف العدّ التراكمي (hit count breakpoints) إيقاف التنفيذ فقط بعد أن تُصاب نقطة التوقّف عددًا محدّدًا من المرّات. وهذا مفيد في الحالات التي لا يظهر فيها خطأ إلا بعد عدد معيّن من الدورات في حلقة، أو بعد استدعاء دالة مرارًا.

لضبط نقطة توقّف عدّ تراكمي، انقر بزر الفأرة الأيمن على نقطة توقّف واختر “Edit Breakpoint…“. واختر “Hit Count” من القائمة المنسدلة. وأدخل رقمًا. ولن تُفعَّل نقطة التوقّف إلا بعد أن تُصاب ذلك العدد من المرّات.

```typescript
// Your code
for (let i = 0; i < 1000; i++) {
  // … some code …
  // Breakpoint set to hit count 500
}
```

سيتوقّف المُنقّح داخل الحلقة عند الدورة الـ500 فقط.

ويمكنك أيضًا استخدام عوامل المقارنة: `>` (أكبر من)، و`>=` (أكبر أو يساوي)، و`<` (أصغر من)، و`<=` (أصغر أو يساوي)، أو `=` (يساوي). فمثلًا، `>10` سيُفعّل نقطة التوقّف بعد 10 إصابات.

## نقاط توقّف البيانات: مقاربات عملية

صُمّمت نقاط توقّف البيانات (المعروفة أيضًا بـ“watchpoints”) لإيقاف التنفيذ عندما *تتغيّر* قيمة متغيّر محدّد. وهي قوية استثنائيًا لتتبّع التعديلات غير المتوقّعة على بياناتك.

### دعم اللغات لنقاط توقّف البيانات

يتفاوت مستوى دعم نقاط توقّف البيانات في Visual Studio Code حسب اللغة:

| اللغة | مستوى الدعم | ملاحظات |
| --- | --- | --- |
| **JavaScript/TypeScript** | محدود | دعم أساسي لتغيّرات الخصائص على الكائنات العامة |
| **C/C++** | كامل | دعم شامل لعناوين الذاكرة |
| **C#/.NET** | كامل | كشف قوي لتغيّرات الخصائص |
| **Java** | متوسّط | يعتمد الدعم على إصدار إضافة Java |
| **Python** | محدود | دعم أساسي في بعض إضافات التنقيح |

### مثال C#: نقاط توقّف بيانات قوية

في C#، تُدعَم نقاط توقّف البيانات جيدًا. فعند تنقيح تطبيق C#:

1. شغّل التطبيق في وضع التنقيح
2. عند التوقّف، اعثر على متغيّر في لوحة Variables
3. انقر بزر الفأرة الأيمن واختر “Break When Value Changes”

```csharp
// C# Example
public class User {
    public string Name { get; set; }
    public int Age { get; set; }
}

// In your code
var user = new User { Name = "John", Age = 30 };
UpdateUserData(user);  // Set a data breakpoint on user.Age
```

سيتوقّف المُنقّح تلقائيًا عند تغيّر خاصية `Age`، ويُظهر لك بالضبط موضع التعديل.

### مثال C++: مراقبة على مستوى الذاكرة

يوفّر C++ دعمًا منخفض المستوى عبر نقاط مراقبة الذاكرة:

```cpp
// C++ Example
struct Product {
    int id;
    double price;
};

// In your code
Product product{1, 9.99};
// Set a data breakpoint on product.price
UpdateInventory(&product);
```

يستطيع مُنقّح C++ مراقبة عنوان الذاكرة الخاص بـ `product.price` والتوقّف بدقّة عند تغيّر موضع الذاكرة ذلك.

### حلول بديلة في JavaScript: كائنات Proxy

مع أن دعم نقاط توقّف البيانات الأصلية محدود في JavaScript، يمكنك استخدام كائن `Proxy` في JavaScript لتحقيق وظائف مشابهة:

```javascript
// Create a monitored version of your object
function createMonitored(obj, onChange) {
  return new Proxy(obj, {
    set(target, property, value) {
      console.log(`Property '${property}' changing from ${target[property]} to ${value}`);
      onChange(target, property, value);
      target[property] = value;
      return true;
    },
  });
}

// Usage
const user = { name: 'Alice', score: 100 };
const monitoredUser = createMonitored(user, (obj, prop, value) => {
  debugger; // This will pause execution whenever a property changes
});

// Now use monitoredUser instead of user
monitoredUser.score = 150; // Will trigger the debugger
```

تتيح لك هذه المقاربة إنشاء “نسخة تنقيح” من كائن يُوقف التنفيذ تلقائيًا عند تغيّر أي خاصية.

### بديل آخر: تتبّع التغييرات عبر اللقطات

بالنسبة إلى الكائنات المعقّدة التي لا تناسبها مقاربة الـ proxy، يمكنك تنفيذ تتبّع يدوي للتغييرات:

```javascript
function trackChanges(obj, label = 'Object') {
  const snapshot = JSON.stringify(obj);

  // Create a conditional breakpoint with this expression:
  // JSON.stringify(obj) !== snapshot

  // Or use a logpoint with this message:
  // `${label} changed: before=${snapshot}, after=${JSON.stringify(obj)}`
}

// In your code
function processData(data) {
  trackChanges(data, 'data');
  // ... processing ...
}
```

### متى تستخدم نقاط توقّف البيانات

نقاط توقّف البيانات مفيدة بوجه خاص في تنقيح:

1. **تغيّرات الحالة غير المتوقّعة**: عندما تُعدَّل قيمة لكنك لا تعرف أين
2. **حالات التسابق (race conditions)**: عندما قد تكون أجزاء متعدّدة من الشيفرة تغيّر البيانات نفسها
3. **التفاعلات مع مكتبات الطرف الثالث**: عندما تعدّل شيفرة خارجية كائناتك
4. **تحوّلات الكائنات المعقّدة**: عند تتبّع التغييرات في أعماق تسلسلات الكائنات

> **نصيحة**
>
> حتى في اللغات ذات الدعم المحدود لنقاط توقّف البيانات، يمكن أن يوفّر الجمع بين نقاط التوقّف الشرطية والـ logpoints وكائنات proxy المخصّصة وظائف مشابهة مع قليل من الإعداد الإضافي.

## نقاط توقّف الدوال

تتيح لك نقاط توقّف الدوال إيقاف التنفيذ كلما *استُدعيت* دالة محدّدة، بصرف النظر عن موضع الاستدعاء. وهذا مفيد للغاية حين تريد فهم كيف تُستخدم دالة معيّنة في أنحاء تطبيقك، وخصوصًا في قواعد الشيفرة الكبيرة أو عند التعامل مع دوال الاستدعاء أو معالجات الأحداث.

لإنشاء نقطة توقّف دالة، انتقل إلى قسم “Breakpoints” في عرض Debug. وانقر على زر ”+” واختر “Function Breakpoint”. ثم أدخل اسم الدالة. ويمكنك أيضًا تحديد شرط أو عدّ تراكمي لنقاط توقّف الدوال.

```typescript
// Function Breakpoint:
myFunction;
```

سيتوقّف المُنقّح الآن عند بداية `myFunction` في كل مرة تُستدعى فيها.

## التنقيح عن بُعد

يتيح لك التنقيح عن بُعد تنقيح تطبيق يعمل على جهاز مختلف، أو داخل جهاز افتراضي، أو داخل حاوية Docker. وهذا ضروري لتنقيح تطبيقات جهة الخادم، أو عمليات النشر السحابية، أو الحالات التي تختلف فيها بيئة التنفيذ عن جهاز التطوير لديك.

يدعم Visual Studio Code التنقيح عن بُعد عبر إضافات وإعدادات تنقيح متنوّعة. وتتضمّن المقاربة العامة ما يلي:

1. **تهيئة البيئة البعيدة:** تأكّد من تثبيت أدوات التنقيح اللازمة في البيئة البعيدة (مثل مُنقّح Node.js، ومُنقّح Python، وغيرها).
2. **ضبط المُنقّح:** أنشئ إعدادًا في `launch.json` يكون فيه نوع `request` مضبوطًا على `"attach"`. وستحتاج إلى تحديد المضيف والمنفذ وتفاصيل الاتصال الأخرى الخاصة بالمُنقّح البعيد.
3. **الاتصال بالعملية البعيدة:** شغّل التطبيق في وضع التنقيح على الجهاز البعيد، ثم استخدم عرض Debug في Visual Studio Code للاتصال به.

فمثلًا، لتنقيح تطبيق Node.js يعمل عن بُعد:

JSON

```typescript
// launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "attach",
            "name": "Attach to Remote",
            "address": "192.168.1.100", // IP address of the remote machine
            "port": 9229,              // Debugging port
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/path/to/app/on/remote", // Path to the app on the remote machine
            "skipFiles": ["<node_internals>/**"]
        }
    ]
}
```

على الجهاز البعيد، ستشغّل تطبيق Node.js الخاص بك مع العَلَم `--inspect`:

Bash

```typescript
node --inspect=0.0.0.0:9229 index.js  # Allow connections from any IP
```

توفّر حاويات التطوير Dev Containers (التي تناولناها في أقسامك السابقة) طريقة انسيابية للتعامل مع التنقيح عن بُعد داخل حاويات Docker، إذ تؤتمت كثيرًا من خطوات هذا الإعداد.

## تنقيح الاختبارات: مقاربات خاصة بكل إطار

تنقيح الاختبارات ضروري لفهم سبب فشلها ولإصلاح شيفرتك أو اختباراتك وفقًا لذلك. ويوفّر Visual Studio Code دعمًا شاملًا لتنقيح مختلف أطر الاختبار، مما يتيح لك التقدّم في تنفيذ الاختبارات سطرًا بسطر وفحص المتغيّرات كما تفعل مع أي شيفرة أخرى.

### استخدام واجهة Test Explorer

يوفّر Test Explorer في Visual Studio Code واجهة موحّدة لاكتشاف الاختبارات وعرضها وتشغيلها عبر أطر مختلفة:

1. ثبّت إضافة الاختبار المناسبة لإطارك
2. افتح لوحة Testing في الشريط الجانبي (أيقونة القارورة)
3. تُكتشف الاختبارات تلقائيًا وتُعرض في عرض شجري
4. انقر بزر الفأرة الأيمن على اختبار واختر “Debug Test” لتشغيله في وضع التنقيح

![Test Explorer يعرض شجرة اختبارات مع خيارات التنقيح]

### اختبارات Jest (JavaScript/TypeScript)

بالنسبة إلى Jest، وهو أشهر إطار اختبار في JavaScript:

```json
// launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Jest Tests",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "${fileBasename}"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    }
  ]
}
```

مع هذا الإعداد:

- يضمن `--runInBand` تشغيل الاختبارات بالتتابع، وهو أفضل للتنقيح
- يشغّل `${fileBasename}` الاختبارات في الملف الحالي
- يمكنك ضبط نقاط التوقّف مباشرة في اختبارك أو في الشيفرة التي تُختبر

ولمقاربة أكثر تفاعلًا، ثبّت إضافة “Jest Runner” التي تضيف أزرار “Debug” مضمّنة فوق كل اختبار:

```javascript
// Example Jest test with breakpoint
test('calculates total correctly', () => {
  const cart = new ShoppingCart();
  cart.addItem({ id: 1, price: 10 });
  cart.addItem({ id: 2, price: 20 });

  // Set a breakpoint on the next line to inspect the cart before checking
  const total = cart.calculateTotal();

  expect(total).toBe(30);
});
```

### اختبارات Mocha (JavaScript/TypeScript)

بالنسبة إلى Mocha، وهو إطار اختبار آخر شائع في JavaScript:

```json
// launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Mocha Tests",
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": ["--timeout", "999999", "--colors", "${file}"],
      "internalConsoleOptions": "openOnSessionStart"
    }
  ]
}
```

### اختبارات Python (pytest)

بالنسبة إلى Python باستخدام pytest:

```json
// launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug pytest",
      "type": "python",
      "request": "launch",
      "module": "pytest",
      "args": ["${file}", "-v"],
      "justMyCode": false
    }
  ]
}
```

تضيف إضافة “Python” في Visual Studio Code عدسات شيفرة فوق دوال الاختبار تحمل زرّي “Run Test” و“Debug Test”:

```python
# Example pytest test
def test_calculate_area():
    rectangle = Rectangle(width=5, height=10)

    # Set a breakpoint here to inspect the rectangle
    area = rectangle.calculate_area()

    assert area == 50
```

### اختبارات .NET (xUnit وNUnit وMSTest)

توفّر إضافة C# دعمًا مدمجًا ممتازًا لأطر اختبار .NET:

```json
// launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug xUnit Tests",
      "type": "coreclr",
      "request": "launch",
      "preLaunchTask": "build",
      "program": "dotnet",
      "args": ["test", "${workspaceFolder}/tests/MyProject.Tests/MyProject.Tests.csproj"],
      "cwd": "${workspaceFolder}",
      "console": "internalConsole",
      "stopAtEntry": false
    }
  ]
}
```

### تنقيح اختبارات مكوّنات الواجهة

بالنسبة إلى اختبارات المكوّنات في أطر مثل React أو Vue أو Angular:

1. **React Testing Library / Enzyme**: استخدم إعداد Jest لكن أضف الوسيطة `--env=jsdom`
   - استخدم إعداد Jest لكن أضف الوسيطة `--env=jsdom`
2. **اختبارات مكوّنات Cypress**: استخدم إضافة Cypress لفتح Cypress في وضع التنقيح، واضبط نقاط التوقّف في شيفرة مكوّنك
   - استخدم إضافة Cypress لفتح Cypress في وضع التنقيح
   - اضبط نقاط التوقّف في شيفرة مكوّنك
3. **اختبارات Storybook**: انقّح خادم تطوير Storybook باستخدام مُنقّح Chrome
   - انقّح خادم تطوير Storybook باستخدام مُنقّح Chrome

### نصائح لتنقيح الاختبارات

1. **اقتصر على الاختبارات الفاشلة في التنقيح**: تتيح لك معظم أطر الاختبار تشغيل الاختبارات المطابقة لنمط فقط <code><span class="line"><span style="color:#637777;font-style:italic"># Jest example</span></span>
<span class="line"><span style="color:#82AAFF;font-style:italic">jest</span><span style="color:#82AAFF"> -t</span><span style="color:#D9F5DD"> "</span><span style="color:#ECC48D">calculates total</span><span style="color:#D9F5DD">"</span><span style="color:#82AAFF"> --runInBand</span></span></code>
2. **استخدم وضع المراقبة مع نقاط التوقّف**: شغّل مُشغّل الاختبارات في وضع المراقبة واضبط نقاط التوقّف للتنقيح تلقائيًا عند التغييرات
3. **انقّح الاختبار والتنفيذ معًا**: اضبط نقاط التوقّف في ملفات الاختبار وفي الشيفرة قيد الاختبار لفهم المسار كاملًا
4. **استخدم Debug Console في Visual Studio Code**: قيّم التعبيرات وعدّل القيم أثناء تنفيذ الاختبار
5. **حاكِ الاعتمادات**: اعزل اختباراتك بتهيئة بدائل محاكاة في Debug Console أثناء تنفيذ متوقّف

## فحص المتغيّرات

لوحة “Variables” في عرض Debug هي أداتك الأساسية لفحص حالة تطبيقك أثناء التنقيح. وهي تعرض:

- **المتغيّرات المحلية:** المتغيّرات داخل النطاق الحالي (دالة أو كتلة).
- **المتغيّرات العامة:** المتغيّرات المتاحة من أي موضع في شيفرتك.
- **الإغلاقات (Closures):** متغيّرات من نطاقات خارجية يمكن الوصول إليها داخل الدالة الحالية (وهذا مهم في JavaScript واللغات الأخرى التي تملك إغلاقات).
- **مكدّس الاستدعاءات (Call Stack):** تسلسل استدعاءات الدوال الذي أدّى إلى نقطة التنفيذ الحالية. ويمكنك النقر على إطارات مختلفة في مكدّس الاستدعاءات لفحص المتغيّرات في تلك النطاقات.

ويمكنك توسيع الكائنات والمصفوفات لرؤية خصائصها وعناصرها. كما يمكنك تعديل قيم المتغيّرات مباشرة في لوحة Variables (في معظم الحالات) لاختبار سيناريوهات مختلفة.

## تعبيرات المراقبة

تتيح لك تعبيرات المراقبة مراقبة قيم تعبيرات أو متغيّرات محدّدة باستمرار أثناء التنقيح. وتُعاد تقييم هذه التعبيرات في كل مرة يتوقّف فيها المُنقّح، مما يوفّر عرضًا ديناميكيًا لبياناتك.

لإضافة تعبير مراقبة، انتقل إلى قسم “Watch” في عرض Debug وانقر على زر ”+”. وأدخل تعبير JavaScript. وسيُقيَّم التعبير وتُعرض قيمته.

فمثلًا، قد تراقب:

- `myVariable`: لرؤية القيمة الحالية لمتغيّر.
- `myArray.length`: لتتبّع حجم مصفوفة.
- `myObject.property1 + myObject.property2`: لرؤية نتيجة حساب.
- `typeof myVariable`: لتتبّع نوع البيانات.

تعبيرات المراقبة ذات قيمة كبيرة لتتبّع تغيّرات الحالة المعقّدة وفهم كيف تتطوّر بياناتك أثناء التنفيذ.

> **نصيحة**
>
> اجمع تعبيرات المراقبة مع نقاط التوقّف الشرطية لتنقيح أكثر استهدافًا. فمثلًا، يمكنك ضبط نقطة توقّف شرطية لا تُفعَّل إلا عندما يستوفي تعبير مراقَب شرطًا معيّنًا.

بإتقانك هذه التقنيات المتقدّمة في التنقيح، ستكون مجهّزًا جيدًا للتعامل حتى مع أصعب حالات التنقيح في Visual Studio Code. وتذكّر أن تجرّب هذه الميزات وأن تجد سير العمل الأنسب لاحتياجاتك. تنقيحًا ممتعًا!
