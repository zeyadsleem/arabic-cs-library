---
title: "قياس الأداء"
---

تحسين الأداء بلا قياس ليس إلا أمنيات مع خطوات إضافية. قد *تشعر* أن إعادة هيكلة ذلك المكوّن جعلت الأمور أسرع، لكن المشاعر لا تُنتج برمجيات موثوقة. وسواء كنت تتعقّب عمليات تصيير بطيئة أو تُثبت لأصحاب المصلحة أن جولة التحسين التي قمت بها كانت تستحقّ، فأنت بحاجة إلى بيانات حقيقية من أدوات حقيقية.

كان تنقيح أداء React في السابق مزيجًا من سجلات console وشيفرة قياس الوقت وتخمينات مدروسة. لم يعد الأمر كذلك. فبين أداة Profiler في React DevTools وتبويب Performance في Chrome وأدوات مخططات اللهب (flamegraph) الحديثة، يمكنك تحديد الموضع الذي يستهلك فيه تطبيقك الوقت بدقة — والأهم من ذلك، الموضع الذي يهدره فيه.

## أداة Profiler في React DevTools: محطتك الأولى

صُمّمت [أداة Profiler في React Developer Tools](https://react.dev/learn/react-developer-tools) خصيصًا لتطبيقات React، وينبغي أن تكون أداتك المفضّلة لفهم سلوك المكوّنات. فهي تُظهر لك أيّ المكوّنات صُيّرت، ولماذا صُيّرت، وكم استغرقت.

### البدء مع أداة Profiler

أولًا، ثبّت [إضافة المتصفّح React Developer Tools](https://react.dev/learn/react-developer-tools). بعد التثبيت، سترى تبويب «Profiler» في أدوات تطوير المتصفّح عندما تعرض تطبيق React.

إليك كيفية التقاط ملف تعريف للأداء:

```typescript
// Sample component that might have performance issues
const ExpensiveList = ({ items, filter }: { items: Item[]; filter: string }) => {
  // ❌ This filtering happens on every render
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const expensiveCalculation = (item: Item) => {
    // Simulate expensive work
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += item.value * Math.random();
    }
    return result;
  };

  return (
    <div>
      {filteredItems.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>{expensiveCalculation(item)}</span>
        </div>
      ))}
    </div>
  );
};
```

لتحليل هذا المكوّن:

1. افتح React DevTools وانقر تبويب «Profiler»
2. انقر زر التسجيل (الدائرة)
3. تفاعل مع تطبيقك (اكتب في عامل التصفية، ومرّر، وانقر الأزرار)
4. انقر لإيقاف التسجيل

### قراءة نتائج Profiler

تعرض أداة Profiler مخطط لهب (flamegraph) لشجرة مكوّناتك. يمثّل كل شريط مكوّنًا، ويُظهر العرض مدّة تصييره. إليك ما ينبغي أن تبحث عنه:

- **أشرطة عريضة**: مكوّنات تستغرق وقتًا طويلًا في التصيير
- **مكدّسات عالية**: تسلسلات هرمية عميقة للمكوّنات قد تستفيد من التحسين
- **عمليات إعادة تصيير متكرّرة**: مكوّنات تتحدّث أكثر من اللازم

> **نصيحة**
>
> انقر على مكوّنات فردية في مخطط اللهب لترى لماذا صُيّرت. تشمل الأسباب الشائعة تغيّر الخصائص، وتحديثات الحالة، وإعادة تصيير المكوّن الأب.

تعرض أداة Profiler أيضًا طريقة العرض «Ranked»، التي تُدرج المكوّنات بحسب مدّة التصيير. هذه كنز للعثور على أسوأ المذنبين لديك.

### فهم سبب تصيير المكوّنات

لكل مكوّن، تخبرك أداة Profiler بدقة لماذا صُيّر:

- **تغيّر خُطّاف**: تحديث خُطّاف `useState` أو `useReducer`
- **تغيّرت الخصائص**: مرّر المكوّن الأب خصائص جديدة
- **صُيّر المكوّن الأب**: صُيّر المكوّن لأن أباه صُيّر
- **تغيّرت الحالة**: حُدِّثت حالة المكوّن نفسه

```typescript
// Example: Debugging unnecessary re-renders
const ProfileButton = ({ user, onEdit }: { user: User; onEdit: () => void }) => {
  console.log('ProfileButton rendering...', { user, onEdit });

  return <button onClick={onEdit}>Edit {user.name}</button>;
};

// Parent component
const UserProfile = () => {
  const [user, setUser] = useState(/* ... */);

  // ❌ This creates a new function on every render
  const handleEdit = () => {
    // edit logic
  };

  return <ProfileButton user={user} onEdit={handleEdit} />;
};
```

في أداة Profiler، سترى `ProfileButton` يُصيَّر والسبب «Props changed» — مع أن `user` لم يتغيّر فعليًا. فمن الجاني؟ دالة `handleEdit` التي يُعاد إنشاؤها عند كل عملية تصيير.

## تبويب Performance في Chrome: الغوص العميق

عندما تُظهر لك أداة Profiler في React DevTools *ما* هو بطيء لكنك تحتاج إلى فهم *لماذا*، يمنحك تبويب Performance في Chrome الصورة الكاملة. فهو يُظهر تنفيذ JavaScript، والتصيير، والرسم، وكل ما يجري في المتصفّح.

### تسجيل ملف تعريف للأداء

1. افتح Chrome DevTools (‏F12 أو Cmd+Option+I)
2. انتقل إلى تبويب «Performance»
3. انقر زر التسجيل
4. تفاعل مع تطبيقك لمدة 3-5 ثوانٍ
5. انقر للإيقاف

> **تحذير**
>
> قد تكون ملفات تعريف الأداء ضخمة. أبقِ التسجيلات قصيرة (3-10 ثوانٍ) وركّز على تفاعلات محدّدة.

### قراءة المخطط الزمني

يعرض تبويب Performance عدة مسارات:

- **الخيط الرئيسي**: تنفيذ JavaScript، بما في ذلك عمليات تصيير React
- **المُركِّب (Compositor)**: تركيب الطبقات والحركات
- **GPU**: عمليات مُسرَّعة بواسطة GPU
- **الشبكة**: تحميل الموارد

ابحث عن:

- **المهام الطويلة** (كتل صفراء/حمراء): JavaScript يعيق الخيط الرئيسي
- **إرباك التخطيط (layout thrashing)**: حسابات تخطيط متكرّرة
- **جمع نفايات مفرط**: ضغط على الذاكرة

### العثور على عمل React في المخطط الزمني

يظهر عمل React في المخطط الزمني للخيط الرئيسي. ابحث عن:

- استدعاءات دوال مثل `commitRoot` و`performWorkUntilDeadline`
- أسماء مكوّناتك في مكدّس الاستدعاءات
- الوقت المستغرق في `ReactDOMRoot.render`

```typescript
// This component will show up clearly in Chrome's timeline
const SlowComponent = ({ data }: { data: number[] }) => {
  const [sortOrder, setSortOrder] = useState('asc');

  // ❌ Expensive sort operation runs on every render
  const sortedData = data.sort((a, b) => (sortOrder === 'asc' ? a - b : b - a));

  return (
    <div>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Toggle sort
      </button>
      {sortedData.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
```

في المخطط الزمني لأداة Performance، سترى كتلة طويلة من تنفيذ JavaScript عند النقر على زر الترتيب، مع ظهور `SlowComponent` بارزًا في مكدّس الاستدعاءات.

## واجهة User Timing API: علامات أداء مخصّصة

تحتاج أحيانًا إلى قياس عمليات محدّدة لا تتماشى مع دورات تصيير React. تتيح لك واجهة User Timing API إضافة علامات مخصّصة إلى المخطط الزمني.

```typescript
const DataProcessor = ({ rawData }: { rawData: RawData[] }) => {
  const [processedData, setProcessedData] = useState<ProcessedData[]>([]);

  useEffect(() => {
    const processData = async () => {
      // Mark the start of data processing
      performance.mark('data-processing-start');

      const processed = await Promise.all(
        rawData.map(async (item) => {
          performance.mark(`process-item-${item.id}-start`);

          // Simulate async processing
          const result = await processItem(item);

          performance.mark(`process-item-${item.id}-end`);
          performance.measure(
            `process-item-${item.id}`,
            `process-item-${item.id}-start`,
            `process-item-${item.id}-end`,
          );

          return result;
        }),
      );

      performance.mark('data-processing-end');
      performance.measure('data-processing', 'data-processing-start', 'data-processing-end');

      setProcessedData(processed);
    };

    processData();
  }, [rawData]);

  return (
    <div>
      {processedData.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
```

تظهر هذه العلامات والقياسات المخصّصة في تبويب Performance في Chrome وفي React DevTools معًا، ما يمنحك توقيتًا دقيقًا لعملياتك الخاصة.

## تنقيح الأداء في الواقع العملي

لنمضِ خطوة بخطوة في تنقيح مشكلة أداء حقيقية. تخيّل أن لديك لوحة معلومات فيها عدة عناصر واجهة تشعر بأنها بطيئة.

### الخطوة 1: حدّد منطقة المشكلة

ابدأ بأداة Profiler في React DevTools:

```typescript
// Dashboard component that might be problematic
const Dashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  return (
    <div className="dashboard">
      <WidgetList widgets={widgets} selectedWidget={selectedWidget} onSelect={setSelectedWidget} />
      <WidgetDetails widget={widgets.find((w) => w.id === selectedWidget)} />
      <WidgetChart data={/* expensive calculation */} />
    </div>
  );
};
```

سجّل ملف تعريف أثناء تحديد عناصر واجهة مختلفة. قد ترى `WidgetChart` يستغرق 500 مللي ثانية في التصيير في كل مرة — حتى عندما لا يؤثّر عنصر الواجهة المحدّد في بيانات المخطط.

### الخطوة 2: افهم لماذا يُصيَّر

انظر إلى معلومات «Why did this render?» في أداة Profiler. قد تكتشف ما يلي:

- يُصيَّر `WidgetChart` لأن أباه `Dashboard` يُصيَّر
- يُصيَّر `Dashboard` لأن حالة `selectedWidget` تتغيّر
- لا يستخدم `WidgetChart` فعليًا بيانات `selectedWidget`

### الخطوة 3: استخدم أداة Performance في Chrome للتفاصيل

انتقل إلى تبويب Performance في Chrome لترى ما يفعله `WidgetChart` فعليًا خلال تلك الـ 500 مللي ثانية:

- هل هو حساب في JavaScript؟
- عمل تخطيط ورسم؟
- طلبات شبكة؟

قد تجد أنه يعيد حساب بيانات مخطط لم تتغيّر.

### الخطوة 4: حسّن وتحقّق

طبّق تحسينات مثل `React.memo` أو `useMemo` أو `useCallback`:

```typescript
// ✅ Optimized version
const WidgetChart = React.memo(({ data }: { data: ChartData[] }) => {
  // Chart rendering logic
  return <div>{/* chart implementation */}</div>;
});

const Dashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  // ✅ Memoize expensive chart data calculation
  const chartData = useMemo(() => calculateChartData(widgets), [widgets]);

  // ✅ Memoize callback to prevent WidgetList re-renders
  const handleSelect = useCallback((id: string) => {
    setSelectedWidget(id);
  }, []);

  return (
    <div className="dashboard">
      <WidgetList widgets={widgets} selectedWidget={selectedWidget} onSelect={handleSelect} />
      <WidgetDetails widget={widgets.find((w) => w.id === selectedWidget)} />
      <WidgetChart data={chartData} />
    </div>
  );
};
```

### الخطوة 5: قِس مرة أخرى

سجّل ملف تعريف آخر لتتأكّد أن تحسيناتك نجحت. ينبغي أن ترى:

- لم يعد `WidgetChart` يُصيَّر عند تحديد عناصر الواجهة
- انخفاض زمن التفاعل الإجمالي
- يُظهر مخطط اللهب عملًا أقل

## تقنيات تحليل متقدّمة

### محاكاة أجهزة أبطأ

يتيح لك Chrome خفض أداء المعالج لمحاكاة أجهزة أبطأ:

1. افتح تبويب Performance
2. انقر أيقونة الترس
3. اضبط المعالج على «4x slowdown» أو «6x slowdown»

يكشف هذا عن مشكلات أداء قد لا تكون واضحة على جهاز التطوير لديك.

### التحليل في بيئة الإنتاج

تعمل أداة Profiler في React DevTools مع عمليات البناء الإنتاجية، لكن عليك تمكينها صراحةً:

```typescript
// Only enable profiling in development or staging
const shouldProfile =
  process.env.NODE_ENV !== 'production' || process.env.REACT_APP_ENABLE_PROFILING === 'true';

if (shouldProfile) {
  import('react-dom/profiling').then(({ unstable_trace }) => {
    unstable_trace('App render', performance.now(), () => {
      // Your app rendering logic
    });
  });
}
```

> **خطر**
>
> يضيف التحليل عبئًا إضافيًا. لا تُبقِه ممكّنًا في بيئة الإنتاج إلا إذا كنت تنقّح بنشاط.

### تحليل الذاكرة

الأداء ليس مسألة سرعة تصيير فقط — فتسريبات الذاكرة قد تجعل تطبيقك أبطأ تدريجيًا. استخدم تبويب Memory في Chrome من أجل:

- أخذ لقطات لذاكرة الكومة (heap) قبل التفاعلات وبعدها
- مقارنة اللقطات للعثور على تسريبات الذاكرة
- تحليل التخصيصات لترى ما الذي يُنشئ الكائنات

```typescript
// Common memory leak pattern
const LeakyComponent = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // This interval keeps running even after component unmounts
      console.log('Still running...');
    }, 1000);

    // ❌ Missing cleanup
    // return () => clearInterval(interval);
  }, []);

  return <div>Component content</div>;
};
```

## اختبار الأداء في CI/CD

لا تنتظر أن يبلّغ المستخدمون عن تراجع في الأداء. ادمج اختبار الأداء في عملية البناء لديك:

```typescript
// Performance test using Lighthouse CI
const performanceTest = async () => {
  const lighthouse = await import('lighthouse');
  const puppeteer = await import('puppeteer');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const runnerResult = await lighthouse('http://localhost:3000', {
    port: 9222,
    output: 'json',
    onlyCategories: ['performance'],
  });

  const score = runnerResult.score;

  if (score < 90) {
    throw new Error(`Performance score too low: ${score}`);
  }

  await browser.close();
};
```

## الخلاصات الرئيسية

تحسين الأداء عملية تكرارية: قِس، حسّن، تحقّق، ثم كرّر. إليك صندوق أدواتك:

1. **أداة Profiler في React DevTools**: ابدأ من هنا للحصول على رؤى على مستوى المكوّنات
2. **تبويب Performance في Chrome**: غوص عميق في سلوك المتصفّح
3. **واجهة User Timing API**: أضف قياسات مخصّصة لعمليات محدّدة
4. **تحليل الذاكرة**: لا تنسَ تسريبات الذاكرة
5. **الاختبار الآلي**: امنع التراجع بدمج CI/CD

تذكّر: قد يكون التحسين المبكر أصل كل الشرور، لكن غياب التحسين أصل كل إحباط لدى المستخدمين. استخدم هذه الأدوات للعثور على نقاط الاختناق الحقيقية، وأصلحها بثقة، وقدّم تجارب أسرع سيلاحظها المستخدمون فعلًا.

في المرة القادمة التي يسألك فيها أحد «هل صار أسرع الآن؟»، ستكون لديك بيانات بدل الآمال والأحلام.
