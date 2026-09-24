---
title: "حدود البحث الثنائي"
book: hello-algo
chapter: chapter_searching
slug: binary_search_edge
order: 65
lang: ar
---
## إيجاد الحد الأيسر

<div class="note">

بمعطى مصفوفة مرتبة `nums` طولها $n$ قد تحتوي على عناصر مكررة، أعد فهرس أول ظهور لـ`target` من جهة اليسار. وإذا لم تحتوِ المصفوفة على `target`، فأعد $-1$.

</div>

تذكّر طريقة إيجاد نقطة الإدراج بالبحث الثنائي. بعد انتهاء البحث، يشير $i$ إلى `target` الأقرب إلى أقصى اليسار، **لذا فإن إيجاد نقطة الإدراج هو في جوهره إيجاد فهرس `target` الأقرب إلى أقصى اليسار**.

فكّر في تنفيذ بحث الحد الأيسر باستخدام دالة إيجاد نقطة الإدراج. لاحظ أن المصفوفة قد لا تحتوي على `target`، وهو ما قد يؤدي إلى الحالتين التاليتين:

- فهرس نقطة الإدراج $i$ يتجاوز حدود المصفوفة.
- العنصر `nums[i]` لا يساوي `target`.

عند حدوث أي من هاتين الحالتين، يكفي إعادة $-1$. وتظهر الشيفرة أدناه:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* البحث الثنائي عن target الأقرب إلى أقصى اليسار */
func binarySearchLeftEdge(nums []int, target int) int {
	// يكافئ إيجاد نقطة إدراج target
	i := binarySearchInsertion(nums, target)
	// لم يُعثر على target، أعد -1
	if i == len(nums) || nums[i] != target {
		return -1
	}
	// عُثر على target، أعد الفهرس i
	return i
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* البحث الثنائي عن target الأقرب إلى أقصى اليسار */
function binarySearchLeftEdge(nums: Array<number>, target: number): number {
    // يكافئ إيجاد نقطة إدراج target
    const i = binarySearchInsertion(nums, target);
    // لم يُعثر على target، أعد -1
    if (i === nums.length || nums[i] !== target) {
        return -1;
    }
    // عُثر على target، أعد الفهرس i
    return i;
}
```

</div>

## إيجاد الحد الأيمن

فكيف نجد `target` الأقرب إلى أقصى اليمين؟ الطريقة الأكثر مباشرة هي تعديل الشيفرة واستبدال عملية تقليص المؤشر في حالة `nums[m] == target`. ونحذف الشيفرة هنا؛ ويمكن للقارئ المهتم تنفيذها بنفسه.

نستعرض أدناه طريقتين أكثر براعة.

### إعادة استخدام بحث الحد الأيسر

في الواقع، يمكننا استخدام دالة إيجاد `target` الأقرب إلى أقصى اليسار لإيجاد `target` الأقرب إلى أقصى اليمين. والطريقة المحددة هي: **تحويل إيجاد `target` الأقرب إلى أقصى اليمين إلى إيجاد `target + 1` الأقرب إلى أقصى اليسار**.

كما يوضح الشكل أدناه، بعد انتهاء البحث يشير المؤشر $i$ إلى `target + 1` الأقرب إلى أقصى اليسار (إن وُجد)، بينما يشير $j$ إلى `target` الأقرب إلى أقصى اليمين، **لذا يمكننا إعادة $j$**.

![تحويل بحث الحد الأيمن إلى بحث الحد الأيسر](/images/hello-algo/chapter_searching--binary_search_right_edge_by_left_edge.png)

لاحظ أن نقطة الإدراج المُعادة هي $i$، لذا يلزم إنقاص $1$ منها للحصول على $j$:

<div class="lang-tab">
<p class="lang-tab__label">Go</p>

```go
/* البحث الثنائي عن target الأقرب إلى أقصى اليمين */
func binarySearchRightEdge(nums []int, target int) int {
	// حوّل المسألة إلى إيجاد target + 1 الأقرب إلى أقصى اليسار
	i := binarySearchInsertion(nums, target+1)
	// يشير j إلى target الأقرب إلى أقصى اليمين، ويشير i إلى أول عنصر أكبر من target
	j := i - 1
	// لم يُعثر على target، أعد -1
	if j == -1 || nums[j] != target {
		return -1
	}
	// عُثر على target، أعد الفهرس j
	return j
}
```

</div>

<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>

```ts
/* البحث الثنائي عن target الأقرب إلى أقصى اليمين */
function binarySearchRightEdge(nums: Array<number>, target: number): number {
    // حوّل المسألة إلى إيجاد target + 1 الأقرب إلى أقصى اليسار
    const i = binarySearchInsertion(nums, target + 1);
    // يشير j إلى target الأقرب إلى أقصى اليمين، ويشير i إلى أول عنصر أكبر من target
    const j = i - 1;
    // لم يُعثر على target، أعد -1
    if (j === -1 || nums[j] !== target) {
        return -1;
    }
    // عُثر على target، أعد الفهرس j
    return j;
}
```

</div>

### التحويل إلى بحث عنصر

نعلم أنه عندما لا تحتوي المصفوفة على `target`، سيشير $i$ و$j$ في النهاية إلى أول عنصر أكبر من `target` والعنصر الأقصى يميناً الأصغر من `target` على الترتيب.

لذلك، وكما يوضح الشكل أدناه، يمكننا إنشاء عنصر غير موجود في المصفوفة لإيجاد الحدين الأيسر والأيمن.

- إيجاد `target` الأقرب إلى أقصى اليسار: يمكن تحويله إلى إيجاد `target - 0.5` وإعادة المؤشر $i$.
- إيجاد `target` الأقرب إلى أقصى اليمين: يمكن تحويله إلى إيجاد `target + 0.5` وإعادة المؤشر $j$.

![تحويل بحث الحدود إلى بحث عنصر](/images/hello-algo/chapter_searching--binary_search_edge_by_element.png)

نحذف الشيفرة هنا، لكن تجدر الإشارة إلى النقطتين التاليتين:

- بما أن المصفوفة المعطاة لا تحتوي على قيم عشرية، فلا حاجة إلى القلق بشأن كيفية التعامل مع التساوي.
- لأن هذه الطريقة تُدخل أعداداً عشرية، يلزم تغيير المتغير `target` في الدالة إلى نوع الفاصلة العائمة (ولا يحتاج Python إلى هذا التغيير).
