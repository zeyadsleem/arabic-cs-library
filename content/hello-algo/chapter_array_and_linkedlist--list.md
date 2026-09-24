---
title: "القائمة"
book: hello-algo
chapter: chapter_array_and_linkedlist
slug: list
order: 26
lang: ar
---
<u>القائمة</u> (list) مفهوم مجرد في بنى البيانات يمثل مجموعة مرتَّبة من العناصر، ويدعم عمليات مثل الوصول إلى العناصر وتعديلها وإدراجها وحذفها واجتيازها، دون أن يقتضي من المستخدم مراعاة حدود السعة. ويمكن تنفيذ القوائم استناداً إلى قوائم مترابطة أو مصفوفات.

- يمكن النظر إلى القائمة المترابطة بطبيعتها على أنها قائمة: فهي تدعم الإدراج والحذف والبحث والتحديث، ويمكنها النمو بمرونة حسب الحاجة.
- تدعم المصفوفة أيضاً الإدراج والحذف والبحث والتحديث، لكن لأن طولها ثابت، لا يمكن اعتبارها إلا قائمة بسعة محدودة.

عند تنفيذ القائمة بمصفوفة، **يجعل طولها الثابت استخدامها العملي محدوداً**. ذلك لأننا لا نستطيع عادةً تحديد كمية البيانات التي نحتاج إلى تخزينها مسبقاً، ما يجعل اختيار السعة المناسبة أمراً صعباً. فإذا كانت السعة صغيرة جداً، فقد لا تلبي احتياجاتنا؛ وإذا كانت كبيرة جداً، فستُهدر مساحة الذاكرة.

لحل هذه المشكلة، يمكننا استخدام <u>مصفوفة ديناميكية</u> (dynamic array) لتنفيذ قائمة. فهي ترث جميع مزايا المصفوفات مع دعم تغيير الحجم ديناميكياً أثناء تنفيذ البرنامج.

في الواقع، **تُنفَّذ أنواع القوائم التي توفرها المكتبات القياسية في كثير من لغات البرمجة بمصفوفات ديناميكية**، مثل `list` في Python و`ArrayList` في Java و`vector` في C++ و`List` في C#. وفي المناقشة التالية، سنتعامل مع «القائمة» و«المصفوفة الديناميكية» كمفهومين متكافئين.

## عمليات القائمة الشائعة

### تهيئة قائمة

نهيّئ القائمة عادةً بإحدى طريقتين: فارغة أو بقيم محددة مسبقاً:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* تهيئة قائمة */
// دون قيم أولية
nums1 := []int{}
// مع قيم أولية
nums := []int{1, 3, 2, 5, 4}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* تهيئة قائمة */
// دون قيم أولية
const nums1: number[] = [];
// مع قيم أولية
const nums: number[] = [1, 3, 2, 5, 4];
```

</div>

### الوصول إلى العناصر

بما أن القائمة هي في جوهرها مصفوفة، يمكننا الوصول إلى العناصر وتحديثها بتعقيد زمني $O(1)$، وهو أمر بالغ الكفاءة.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* الوصول إلى عنصر */
num := nums[1]  // الوصول إلى العنصر عند الفهرس 1

/* تحديث عنصر */
nums[1] = 0     // تحديث العنصر عند الفهرس 1 إلى 0
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* الوصول إلى عنصر */
const num: number = nums[1];  // الوصول إلى العنصر عند الفهرس 1

/* تحديث عنصر */
nums[1] = 0;  // تحديث العنصر عند الفهرس 1 إلى 0
```

</div>

### إدراج العناصر وحذفها

بالمقارنة مع المصفوفات، تستطيع القوائم إضافة العناصر وحذفها بحرية. وإضافة عنصر في نهاية القائمة لها تعقيد زمني $O(1)$، أما إدراج العناصر وحذفها فتبقى بكفاءة المصفوفات نفسها، بتعقيد زمني $O(n)$.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* تفريغ القائمة */
nums = nil

/* إضافة عناصر في النهاية */
nums = append(nums, 1)
nums = append(nums, 3)
nums = append(nums, 2)
nums = append(nums, 5)
nums = append(nums, 4)

/* إدراج عنصر في الوسط */
nums = append(nums[:3], append([]int{6}, nums[3:]...)...) // إدراج العدد 6 عند الفهرس 3

/* حذف عنصر */
nums = append(nums[:3], nums[4:]...) // حذف العنصر عند الفهرس 3
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* تفريغ القائمة */
nums.length = 0;

/* إضافة عناصر في النهاية */
nums.push(1);
nums.push(3);
nums.push(2);
nums.push(5);
nums.push(4);

/* إدراج عنصر في الوسط */
nums.splice(3, 0, 6); // إدراج العدد 6 عند الفهرس 3

/* حذف عنصر */
nums.splice(3, 1);  // حذف العنصر عند الفهرس 3
```

</div>

### اجتياز القائمة

على غرار المصفوفات، يمكن اجتياز القوائم بالفهرس أو بالتكرار المباشر عبر العناصر.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* اجتياز القائمة بالفهرس */
count := 0
for i := 0; i < len(nums); i++ {
    count += nums[i]
}

/* اجتياز عناصر القائمة مباشرة */
count = 0
for _, num := range nums {
    count += num
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* اجتياز القائمة بالفهرس */
let count = 0;
for (let i = 0; i < nums.length; i++) {
    count += nums[i];
}

/* اجتياز عناصر القائمة مباشرة */
count = 0;
for (const num of nums) {
    count += num;
}
```

</div>

### دمج القوائم

بمعطى قائمة جديدة `nums1`، يمكننا دمجها في نهاية القائمة الأصلية.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* دمج قائمتين */
nums1 := []int{6, 8, 7, 10, 9}
nums = append(nums, nums1...)  // دمج القائمة nums1 في نهاية nums
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* دمج قائمتين */
const nums1: number[] = [6, 8, 7, 10, 9];
nums.push(...nums1);  // دمج القائمة nums1 في نهاية nums
```

</div>

### ترتيب القائمة

بعد ترتيب القائمة، يمكننا استخدام خوارزميتَي «البحث الثنائي» و«المؤشرين»، وهما كثيراً ما يُختبران في مسائل خوارزميات المصفوفات.

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go title="list_test.go"
/* ترتيب القائمة */
sort.Ints(nums)  // بعد الترتيب، تُرتَّب عناصر القائمة من الأصغر إلى الأكبر
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```typescript title="list.ts"
/* ترتيب القائمة */
nums.sort((a, b) => a - b);  // بعد الترتيب، تُرتَّب عناصر القائمة من الأصغر إلى الأكبر
```

</div>

## تنفيذ القائمة

تحتوي كثير من لغات البرمجة على قوائم مدمجة، مثل Java وC++ وPython. وتطبيقاتها معقدة إلى حد ما، ومعاملاتها مدروسة بعناية، مثل السعة الأولية ومضاعفات التوسيع وغيرها. ويمكن للقارئ المهتم الرجوع إلى الشيفرة المصدرية لمعرفة المزيد.

لتعميق فهمنا لطريقة عمل القوائم، نحاول تنفيذ قائمة بسيطة مع ثلاثة اعتبارات تصميمية رئيسية:

- **السعة الأولية**: اختر سعة أولية معقولة للمصفوفة الأساسية. وفي هذا المثال، نختار 10 سعةً أولية.
- **تتبع الحجم**: صرّح بمتغير `size` لتسجيل العدد الحالي لعناصر القائمة وتحديثه لحظياً عند إدراج العناصر وحذفها. واستناداً إلى هذا المتغير، يمكننا تحديد نهاية القائمة ومعرفة ما إذا كان التوسيع مطلوباً.
- **آلية التوسيع**: عندما تمتلئ سعة القائمة عند إدراج عنصر، نحتاج إلى التوسيع. ننشئ مصفوفة أكبر استناداً إلى مضاعف التوسيع ثم ننقل جميع العناصر من المصفوفة الحالية إلى المصفوفة الجديدة بالترتيب. وفي هذا المثال، نحدد أن تُوسَّع المصفوفة إلى ضعف حجمها السابق في كل مرة.

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* صنف القائمة */
class MyList {
    private arr: Array<number>; // مصفوفة (تخزّن عناصر القائمة)
    private _capacity: number = 10; // سعة القائمة
    private _size: number = 0; // طول القائمة (عدد العناصر الحالي)
    private extendRatio: number = 2; // المضاعف الذي تُوسَّع به سعة القائمة في كل مرة

    /* دالة البناء */
    constructor() {
        this.arr = new Array(this._capacity);
    }

    /* احصل على طول القائمة (عدد العناصر الحالي) */
    public size(): number {
        return this._size;
    }

    /* احصل على سعة القائمة */
    public capacity(): number {
        return this._capacity;
    }

    /* تحديث عنصر */
    public get(index: number): number {
        // إذا كان الفهرس خارج الحدود، ارمِ استثناءً كما يلي
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        return this.arr[index];
    }

    /* إضافة عناصر في النهاية */
    public set(index: number, num: number): void {
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        this.arr[index] = num;
    }

    /* الاجتياز المباشر لعناصر القائمة */
    public add(num: number): void {
        // إذا ساوى الطول السعة، يلزم التوسيع
        if (this._size === this._capacity) this.extendCapacity();
        // أضف عنصراً جديداً إلى نهاية القائمة
        this.arr[this._size] = num;
        this._size++;
    }

    /* ترتيب القائمة */
    public insert(index: number, num: number): void {
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        // عندما يتجاوز عدد العناصر السعة، فعّل آلية التوسيع
        if (this._size === this._capacity) {
            this.extendCapacity();
        }
        // حرّك جميع العناصر بعد الفهرس index موضعاً واحداً إلى الأمام
        for (let j = this._size - 1; j >= index; j--) {
            this.arr[j + 1] = this.arr[j];
        }
        // حدّث عدد العناصر
        this.arr[index] = num;
        this._size++;
    }

    /* إزالة عنصر */
    public remove(index: number): number {
        if (index < 0 || index >= this._size) throw new Error('Index out of bounds');
        let num = this.arr[index];
        // حرّك جميع العناصر بعد الفهرس موضعاً واحداً إلى الأمام
        for (let j = index; j < this._size - 1; j++) {
            this.arr[j] = this.arr[j + 1];
        }
        // حدّث عدد العناصر
        this._size--;
        // أعد العنصر المُزال
        return num;
    }

    /* شيفرة التشغيل */
    public extendCapacity(): void {
        // أنشئ مصفوفة جديدة بطول size وانسخ المصفوفة الأصلية إلى المصفوفة الجديدة
        this.arr = this.arr.concat(
            new Array(this.capacity() * (this.extendRatio - 1))
        );
        // أضف عناصر في النهاية
        this._capacity = this.arr.length;
    }

    /* حوّل القائمة إلى مصفوفة */
    public toArray(): number[] {
        let size = this.size();
        // العناصر تدخل الطابور
        const arr = new Array(size);
        for (let i = 0; i < size; i++) {
            arr[i] = this.get(i);
        }
        return arr;
    }
}
```

</div>
