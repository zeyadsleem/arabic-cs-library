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
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Initialize a list
# Without initial values
nums1: list[int] = []
# With initial values
nums: list[int] = [1, 3, 2, 5, 4]
```

</div>
### الوصول إلى العناصر

بما أن القائمة هي في جوهرها مصفوفة، يمكننا الوصول إلى العناصر وتحديثها بتعقيد زمني $O(1)$، وهو أمر بالغ الكفاءة.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Access an element
num: int = nums[1]  # Access element at index 1

# Update an element
nums[1] = 0    # Update element at index 1 to 0
```

</div>
### إدراج العناصر وحذفها

بالمقارنة مع المصفوفات، تستطيع القوائم إضافة العناصر وحذفها بحرية. وإضافة عنصر في نهاية القائمة لها تعقيد زمني $O(1)$، أما إدراج العناصر وحذفها فتبقى بكفاءة المصفوفات نفسها، بتعقيد زمني $O(n)$.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Clear the list
nums.clear()

# Add elements at the end
nums.append(1)
nums.append(3)
nums.append(2)
nums.append(5)
nums.append(4)

# Insert an element in the middle
nums.insert(3, 6)  # Insert number 6 at index 3

# Delete an element
nums.pop(3)        # Delete element at index 3
```

</div>
### اجتياز القائمة

على غرار المصفوفات، يمكن اجتياز القوائم بالفهرس أو بالتكرار المباشر عبر العناصر.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Traverse the list by index
count = 0
for i in range(len(nums)):
    count += nums[i]

# Traverse list elements directly
for num in nums:
    count += num
```

</div>
### دمج القوائم

بمعطى قائمة جديدة `nums1`، يمكننا دمجها في نهاية القائمة الأصلية.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Concatenate two lists
nums1: list[int] = [6, 8, 7, 10, 9]
nums += nums1  # Concatenate list nums1 to the end of nums
```

</div>
### ترتيب القائمة

بعد ترتيب القائمة، يمكننا استخدام خوارزميتَي «البحث الثنائي» و«المؤشرين»، وهما كثيراً ما يُختبران في مسائل خوارزميات المصفوفات.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```python title="list.py"
# Sort a list
nums.sort()  # After sorting, list elements are arranged from smallest to largest
```

</div>
## تنفيذ القائمة

تحتوي كثير من لغات البرمجة على قوائم مدمجة، مثل Java وC++ وPython. وتطبيقاتها معقدة إلى حد ما، ومعاملاتها مدروسة بعناية، مثل السعة الأولية ومضاعفات التوسيع وغيرها. ويمكن للقارئ المهتم الرجوع إلى الشيفرة المصدرية لمعرفة المزيد.

لتعميق فهمنا لطريقة عمل القوائم، نحاول تنفيذ قائمة بسيطة مع ثلاثة اعتبارات تصميمية رئيسية:

- **السعة الأولية**: اختر سعة أولية معقولة للمصفوفة الأساسية. وفي هذا المثال، نختار 10 سعةً أولية.
- **تتبع الحجم**: صرّح بمتغير `size` لتسجيل العدد الحالي لعناصر القائمة وتحديثه لحظياً عند إدراج العناصر وحذفها. واستناداً إلى هذا المتغير، يمكننا تحديد نهاية القائمة ومعرفة ما إذا كان التوسيع مطلوباً.
- **آلية التوسيع**: عندما تمتلئ سعة القائمة عند إدراج عنصر، نحتاج إلى التوسيع. ننشئ مصفوفة أكبر استناداً إلى مضاعف التوسيع ثم ننقل جميع العناصر من المصفوفة الحالية إلى المصفوفة الجديدة بالترتيب. وفي هذا المثال، نحدد أن تُوسَّع المصفوفة إلى ضعف حجمها السابق في كل مرة.

<div class="lang-tab">
<p class="lang-tab__label">Python</p>

```py
class MyList:
    """صنف القائمة"""

    def __init__(self):
        """المنشئ"""
        self._capacity: int = 10  # سعة القائمة
        self._arr: list[int] = [0] * self._capacity  # المصفوفة (تخزن عناصر القائمة)
        self._size: int = 0  # طول القائمة (عدد العناصر الحالي)
        self._extend_ratio: int = 2  # معامل نمو سعة القائمة في كل مرة

    def size(self) -> int:
        """الحصول على طول القائمة (عدد العناصر الحالي)"""
        return self._size

    def capacity(self) -> int:
        """الحصول على سعة القائمة"""
        return self._capacity

    def get(self, index: int) -> int:
        """وصول إلى عنصر"""
        # أطلق استثناء إذا خرج الفهرس عن الحدود؛ وينطبق الأمر نفسه فيما يلي
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        return self._arr[index]

    def set(self, num: int, index: int):
        """حدّث عنصرًا"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        self._arr[index] = num

    def add(self, num: int):
        """ألحق عنصرًا في النهاية"""
        # زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها
        if self.size() == self.capacity():
            self.extend_capacity()
        self._arr[self._size] = num
        self._size += 1

    def insert(self, num: int, index: int):
        """أدخل عنصرًا في المنتصف"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        # زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها
        if self._size == self.capacity():
            self.extend_capacity()
        # أزح كل العناصر من الفهرس `index` وما بعده موضعًا واحدًا إلى اليمين
        for j in range(self._size - 1, index - 1, -1):
            self._arr[j + 1] = self._arr[j]
        self._arr[index] = num
        # حدّث عدد العناصر
        self._size += 1

    def remove(self, index: int) -> int:
        """احذف عنصرًا"""
        if index < 0 or index >= self._size:
            raise IndexError("Index out of bounds")
        num = self._arr[index]
        # أزح كل العناصر بعد الفهرس `index` موضعًا واحدًا إلى اليسار
        for j in range(index, self._size - 1):
            self._arr[j] = self._arr[j + 1]
        # حدّث عدد العناصر
        self._size -= 1
        # أعد العنصر المحذوف
        return num

    def extend_capacity(self):
        """زيادة سعة القائمة"""
        # أنشئ مصفوفة جديدة طولها _extend_ratio ضعف الطول الأصلي وانسخ الأصلية فيها
        self._arr = self._arr + [0] * self.capacity() * (self._extend_ratio - 1)
        # حدّث سعة القائمة
        self._capacity = len(self._arr)

    def to_array(self) -> list[int]:
        """إرجاع الجزء من القائمة الذي يحتوي عناصر"""
        return self._arr[: self._size]
```

</div>
