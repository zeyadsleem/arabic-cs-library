---
title: "تمرين 3: البث وSuspense"
lang: ar
source: "https://stevekinney.com/courses/enterprise-ui/streaming-and-suspense-exercise"
---

تُجري لوحة التحليلات ثلاثة نداءات إلى الواجهة البرمجية بسرعات مختلفة: إحصاءات الملخص (200ms)، وبيانات المخطط (800ms)، وجدول النشاط (2000ms). والآن تعرض الصفحة بأكملها مؤشر تحميل واحدًا حتى تُحلّ الثلاثة كلها. وستضيف حدود Suspense حول كل قسم وتطبّق `renderToPipeableStream` للتصيير المتدفّق من الخادم كي يُصيَّر كل قسم تدريجيًا مع وصول بياناته.

## لماذا يهم

حدود Suspense قرارات معمارية، لا خيارات تنسيق. فمكان وضعها يحدّد ما يراه المستخدم أثناء الانتظار، وما يبثّ معًا وما يبثّ باستقلال، وكيف تتكوّن حالات التحميل لديك عبر حدود الحزم. وفي مستودع أحادي بحزم ميزات تجلب كل منها بياناتها، فإن إتقان هذا يعني الفرق بين تطبيق مستجيب وتطبيق يبدو متجمدًا ثانيتين عند كل تحميل صفحة.

## كيف يعمل التصيير التدريجي

مع جلب البيانات لكل مكوّن على حدة وحدود Suspense، يُصيَّر كل قسم باستقلال مع وصول بياناته. ويعرض الخط الزمني أدناه ما يراه المستخدم في كل لحظة.

```
gantt
    title Progressive Rendering Timeline
    dateFormat X
    axisFormat %Lms

    section API Responses
    Summary API (200ms)     :done, api1, 0, 200
    Chart API (800ms)       :done, api2, 0, 800
    Table API (2000ms)      :done, api3, 0, 2000

    section User Sees
    App Shell + Skeletons       :active, shell, 0, 200
    Stats visible + 2 loading   :active, s1, 200, 800
    Stats + Chart + 1 loading   :active, s2, 800, 2000
    Fully loaded                :active, s3\, 2000, 2100
```

## أعد الهيكلة إلى جلب بيانات لكل مكوّن

حاليًا، يجلب `AnalyticsDashboard` مجموعات البيانات الثلاث كلها في `Promise.all` واحد ويمرّرها كخصائص. وهذا يعني أن الصفحة بأكملها تنتظر أبطأ استجابة (الجدول عند ~2000ms) قبل أن يُصيَّر أي شيء. وستعيد الهيكلة بحيث يجلب كل مكوّن بياناته بنفسه—وهو شرط مسبق كي تعمل حدود Suspense.

### ما الذي تنظر إليه أولًا

افتح `packages/analytics/src/analytics-dashboard.tsx` ولاحظ نمط الجلب المركزي:

*packages/analytics/src/analytics-dashboard.tsx*

```typescript
const [summaryResponse, chartResponse, tableResponse] = await Promise.all([
  fetch('/api/analytics/summary'),
  fetch(`/api/analytics/chart?range=${timeRange}`),
  fetch('/api/analytics/table?page=1'),
]);
```

تُجلب الاستجابات الثلاث كلها معًا وتُمرَّر كخصائص إلى المكوّنات التابعة.

ثم افتح `mocks/src/handlers.ts` وابحث عن نقاط نهاية التحليلات الثلاث. ولاحظ نداءات `delay()`—200ms، و800ms، و2000ms. وهذه حتمية لا عشوائية. والآن ينتظر المستخدم 2000ms لكل شيء لأن `Promise.all` يحجب حتى تُحلّ أبطأ استجابة.

> **ثلاثة أنماط لجلب البيانات**
>
> الجلب المتسلسل (اجلب `A`، ثم اجلب `B`، ثم اجلب `C`) ينشئ «شلالًا» ينتظر فيه كل طلب انتهاء الطلب السابق—وزمن الانتظار الكلي هو مجموع أزمنة الاستجابة كلها. أما `Promise.all` فيطلق كل الطلبات في الوقت نفسه، مانعًا الشلال، لكن الواجهة تظل محجوبة حتى تصل أبطأ استجابة—وزمن الانتظار الكلي يساوي أقصى زمن استجابة.
>
> الجلب لكل مكوّن على حدة (وهو ما سنطبّقه الآن) يُطلق الطلبات في الوقت نفسه أيضًا، لكن كل مكوّن يُصيَّر باستقلال بمجرد وصول بياناته—فيرى المستخدم النتائج تدريجيًا. ونمط الشلال هو أسوأ الحالات، ويظهر غالبًا عن غير قصد عندما يُغلَّف جلب البيانات داخل نداءات `await` متسلسلة أو سلاسل `useEffect` تعتمد كل واحدة على نتائج الأخرى.

### أعد هيكلة كل مكوّن

انقل جلب البيانات إلى كل مكوّن كي يدير حالة التحميل الخاصة به.

افتح `packages/analytics/src/stats-bar.tsx`. حاليًا، يتلقى `StatsBar` الخاصية `stats` من المكوّن الأب—ولا يدري كيف وصلت البيانات. وستزيل تلك الخاصية وتجعل المكوّن يجلب بيانات الملخص بنفسه. استبدل محتوى الملف بـ:

*packages/analytics/src/stats-bar.tsx*

```typescript
import React, { useEffect, useState } from "react";
import type { SummaryStats } from "@pulse/shared";
import { StatCard, LoadingSkeleton } from "@pulse/ui";

function formatNumber(value: number): string {
  return value.toLocaleString();
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function StatsBar(): React.ReactElement {
  const [stats, setStats] = useState<SummaryStats | null>(null);

  useEffect(() => {
    fetch("/api/analytics/summary")
      .then((response) => response.json())
      .then(setStats);
  }, []);
  if (!stats) {
    return <LoadingSkeleton variant="card" count={4} />;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Total Users" value={formatNumber(stats.totalUsers)} />
      <StatCard label="Active Today" value={formatNumber(stats.activeToday)} />
      <StatCard label="Revenue" value={formatCurrency(stats.revenue)} />
      <StatCard
        label="Conversion Rate"
        value={formatPercentage(stats.conversionRate)}
      />
    </div>
  );
}
```

*ملاحظة:* يجلب إحصاءات الملخص عند التثبيت—أسرع واجهة برمجية عند ~200ms

افتح `packages/analytics/src/chart.tsx`. كان هذا المكوّن يتلقى `data` كخاصية من `Promise.all` في المكوّن الأب. وستزيل خاصية `data` وتجعل `Chart` يجلب بناءً على خاصيته `range` بدلًا من ذلك. استبدل محتوى الملف بـ:

*packages/analytics/src/chart.tsx*

```typescript
import React, { useEffect, useState } from "react";
import type { ChartDataPoint, TimeRange } from "@pulse/shared";
import { LoadingSkeleton } from "@pulse/ui";

export function Chart({ range = "30d" }: { range?: TimeRange }): React.ReactElement {
  const [data, setData] = useState<ChartDataPoint[] | null>(null);

  useEffect(() => {
    setData(null);
    fetch(`/api/analytics/chart?range=${range}`)
      .then((response) => response.json())
      .then(setData);
  }, [range]);
  if (!data) {
    return <LoadingSkeleton variant="chart" />;
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map((point) => point.value));
  const chartHeight = 200;
  const chartWidth = 800;
  const barWidth = Math.max(4, (chartWidth - data.length * 2) / data.length);
  const gap = 2;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
      className="h-64 w-full"
      role="img"
      aria-label="Analytics activity chart"
    >
      {data.map((point, index) => {
        const barHeight = (point.value / maxValue) * chartHeight;
        const x = index * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <g key={point.date}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              className="fill-gray-800"
              rx={2}
            />
            {index % Math.ceil(data.length / 6) === 0 && (
              <text
                x={x + barWidth / 2}
                y={chartHeight + 16}
                textAnchor="middle"
                className="fill-gray-400 text-[10px]"
              >
                {point.date.slice(5)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
```

*ملاحظة:* تُعاد إلى null كي يظهر الهيكل العظمي أثناء إعادة الجلب

*ملاحظة:* يعيد الجلب كلما تغيّر النطاق الزمني

افتح `packages/analytics/src/big-table.tsx`. ومثل المكوّنين الآخرين، يتلقى `BigTable` حاليًا `data` كخاصية. وستزيل تلك الخاصية وتجعله يجلب صفوف جدوله بنفسه. استبدل محتوى الملف بـ:

*packages/analytics/src/big-table.tsx*

```typescript
import React, { useEffect, useState } from "react";
import type { TableRow, PaginatedResponse } from "@pulse/shared";
import { DataTable, LoadingSkeleton } from "@pulse/ui";

const columns = [
  { key: "user" as const, header: "User" },
  { key: "action" as const, header: "Action" },
  {
    key: "timestamp" as const,
    header: "Time",
    render: (value: TableRow[keyof TableRow]) =>
      new Date(String(value)).toLocaleString(),
  },
  {
    key: "duration" as const,
    header: "Duration",
    render: (value: TableRow[keyof TableRow]) => `${value}ms`,
  },
];

export function BigTable(): React.ReactElement {
  const [data, setData] = useState<TableRow[] | null>(null);

  useEffect(() => {
    fetch("/api/analytics/table?page=1")
      .then((response) => response.json())
      .then((result: PaginatedResponse<TableRow>) => setData(result.data));
  }, []);
  if (!data) {
    return <LoadingSkeleton variant="table" />;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 font-medium text-gray-900">Recent Activity</h3>
      <DataTable columns={columns} data={data} keyField="id" />
    </div>
  );
}
```

*ملاحظة:* يجلب عند التثبيت—أبطأ واجهة برمجية عند ~2000ms

> **واجهة الجدول البرمجية تعيد استجابة مقسّمة إلى صفحات**
>
> تغلّف نقطة النهاية `/api/analytics/table?page=1` الصفوف في كائن `PaginatedResponse<TableRow>` بحقول `data` و`page` و`pageSize` و`total`. وتحتاج إلى استخراج `result.data` للحصول على مصفوفة عناصر `TableRow`.

والآن افتح `packages/analytics/src/analytics-dashboard.tsx` وجرّده من كل منطق جلب البيانات. احذف `Promise.all`، واحذف متغيّرات حالة مجموعات البيانات الثلاث، واحذف الخصائص التي كنت تمرّرها إلى كل مكوّن تابع. وتصير لوحة التحليلات قشرة تخطيط خالصة: فهي لا تجلب شيئًا، بل تصيّر المكوّنات الثلاثة فقط وتتركها تتولى بياناتها بنفسها. استبدل محتوى الملف بـ:

*packages/analytics/src/analytics-dashboard.tsx*

```typescript
import React, { useState } from "react";
import type { TimeRange } from "@pulse/shared";
import { useAuth } from "@pulse/shared";
import { StatsBar } from "./stats-bar";
import { Chart } from "./chart";
import { BigTable } from "./big-table";
export function AnalyticsDashboard(): React.ReactElement {
  const { user, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Analytics Overview
        </h2>
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Viewing as: {user.name}
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              Not authenticated
            </span>
          )}
        </div>
      </div>

      <StatsBar />

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Activity</h3>
          <div className="flex gap-1">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-3 py-1 text-sm ${
                  timeRange === range
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <Chart range={timeRange} />
      </div>

      <BigTable />
    </div>
  );
}

export default AnalyticsDashboard;
```

*ملاحظة:* بلا استيرادات لجلب البيانات—هذا المكوّن قشرة تخطيط خالصة

> **لماذا يجلب كل مكوّن بياناته بنفسه**
>
> هذا اختيار معماري متعمّد. فبجمع جلب البيانات مع المكوّن الذي يحتاجها في مكان واحد، يستطيع كل قسم أن يُصيَّر باستقلال بمجرد وصول بياناته. فيُصيَّر `StatsBar` بعد ~200ms بلا انتظار استجابة الجدول عند ~2000ms. وهذا النمط هو ما يجعل حدود Suspense مفيدة في الخطوة 2: فهي تمنح React الدقة الكافية لعرض نتائج جزئية بينما ما زالت طلبات أخرى جارية.

### نقطة تحقق

أعد تحميل الصفحة على `http://localhost:5173`. ينبغي أن ترى الآن كل قسم يظهر باستقلال—شريط الإحصاءات أولًا (~200ms)، ثم المخطط (~800ms)، ثم الجدول (~2000ms). ويعرض كل منها هيكله العظمي الخاص أثناء الانتظار. وهذا نمط الجلب لكل مكوّن الذي تحتاجه قبل إضافة Suspense.

هياكل عظمية للتحميل تظهر أثناء جلب البيانات

## اجعل جلب البيانات متوافقًا مع Suspense

يمنح نمط `useEffect` + `useState` لكل مكوّن من الخطوة 1 كل قسم بالفعل حالة تحميل خاصة به. لكن حدود Suspense تحتاج آلية مختلفة: مصدر بيانات **يرمي وعدًا** أثناء التحميل بدل أن يعيد `null`. هذه إشارة React لـ«لسنا جاهزين بعد».

### أنشئ مساعد موارد Suspense

افتح `packages/shared/src/api-client.ts` وأضف الدالة التالية. هذه إضافة جديدة كليًا: لا شيء في الملف تحتاج إلى تغييره، فألحق هذا في آخره:

*packages/shared/src/api-client.ts*

```typescript
interface SuspenseResource<T> {
  read(): T;
}

export function createSuspenseResource<T>(promise: Promise<T>): SuspenseResource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;

  const suspender = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (err) => {
      status = 'error';
      error = err;
    },
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      return result;
    },
  };
}
```

*ملاحظة:* يلفّ وعدًا في آلة بثلاث حالات: قيد الانتظار، أو نجاح، أو خطأ

*ملاحظة:* رمي الوعد يخبر React أن يعرض أقرب واجهة احتياطية لـSuspense

ثم أضف سطرًا واحدًا إلى `packages/shared/src/index.ts` لكشف الدالة الجديدة:

*packages/shared/src/index.ts*

```typescript
export { createSuspenseResource } from './api-client';
```

> **كيف يعمل نمط رمي الوعد**
>
> عندما ينادي مكوّن `resource.read()` ولا تكون البيانات جاهزة، ترمي الدالة الوعد المعلّق. فيلتقط React هذا الوعد المرمي، ويعرض أقرب واجهة احتياطية `<Suspense>`، ويعيد تصيير المكوّن عندما يُحلّ الوعد. وهذا مختلف جذريًا عن `useEffect`: فبدل التصيير بـ`null` وتحديث الحالة لاحقًا، *لا يُصيَّر* المكوّن إطلاقًا حتى تصير البيانات متاحة. وهذا ما يجعل حدود Suspense مفيدة: فهي تعترض الوعد المرمي وتعرض واجهة احتياطية.

### حدّث المكوّنات لتستخدم موارد Suspense

افتح `packages/analytics/src/stats-bar.tsx` مرة أخرى. وستُجري ثلاثة تغييرات: (1) بدّل الاستيرادات—أسقط `useEffect` و`useState` و`LoadingSkeleton`، وأضف `createSuspenseResource`؛ (2) استبدل جلب `useEffect`/`useState` بمورد Suspense على مستوى الوحدة؛ (3) احذف حارس التحميل `if (!stats)`—فـSuspense يتولى ذلك الآن. حدّث الملف إلى:

*packages/analytics/src/stats-bar.tsx*

```typescript
import React from "react";
import type { SummaryStats } from "@pulse/shared";
import { createSuspenseResource } from "@pulse/shared";
import { StatCard } from "@pulse/ui";
// ... keep formatNumber, formatCurrency, formatPercentage functions ...

const statsResource = createSuspenseResource<SummaryStats>(
  fetch("/api/analytics/summary").then((r) => r.json()),
);
export function StatsBar(): React.ReactElement {
  const stats = statsResource.read();
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Total Users" value={formatNumber(stats.totalUsers)} />
      <StatCard label="Active Today" value={formatNumber(stats.activeToday)} />
      <StatCard label="Revenue" value={formatCurrency(stats.revenue)} />
      <StatCard
        label="Conversion Rate"
        value={formatPercentage(stats.conversionRate)}
      />
    </div>
  );
}
```

*ملاحظة:* بلا useEffect، بلا useState، بلا LoadingSkeleton—فـSuspense يتولى كل ذلك

*ملاحظة:* مورد على مستوى الوحدة—يبدأ الجلب وقت الاستيراد، لا وقت التصيير

*ملاحظة:* يرمي وعدًا إن لم تكن البيانات جاهزة—فيعرض React واجهة Suspense الاحتياطية بدلًا من ذلك

افتح `packages/analytics/src/chart.tsx` مرة أخرى. وتنطبق التغييرات الثلاثة نفسها: بدّل الاستيرادات، واستبدل `useEffect` بمورد Suspense، واحذف حارس التحميل—لكن في المخطط التفاف: فبياناته تعتمد على خاصية `range`، فلا يمكنك استخدام مورد واحد على مستوى الوحدة. استخدم بدلًا من ذلك `Map` يخزّن مؤقتًا موردًا واحدًا لكل قيمة نطاق. حدّث الملف إلى:

*packages/analytics/src/chart.tsx*

```typescript
import React from "react";
import type { ChartDataPoint, TimeRange } from "@pulse/shared";
import { createSuspenseResource } from "@pulse/shared";
const chartCache = new Map<
  TimeRange,
  ReturnType<typeof createSuspenseResource<ChartDataPoint[]>>
>();
function getChartResource(range: TimeRange) {
  if (!chartCache.has(range)) {
    chartCache.set(
      range,
      createSuspenseResource<ChartDataPoint[]>(
        fetch(`/api/analytics/chart?range=${range}`).then((r) => r.json()),
      ),
    );
  }
  return chartCache.get(range)!;
}

export function Chart({
  range = "30d",
}: {
  range?: TimeRange;
}): React.ReactElement {
  const data = getChartResource(range).read();
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map((point) => point.value));
  const chartHeight = 200;
  const chartWidth = 800;
  const barWidth = Math.max(4, (chartWidth - data.length * 2) / data.length);
  const gap = 2;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
      className="h-64 w-full"
      role="img"
      aria-label="Analytics activity chart"
    >
      {data.map((point, index) => {
        const barHeight = (point.value / maxValue) * chartHeight;
        const x = index * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <g key={point.date}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              className="fill-gray-800"
              rx={2}
            />
            {index % Math.ceil(data.length / 6) === 0 && (
              <text
                x={x + barWidth / 2}
                y={chartHeight + 16}
                textAnchor="middle"
                className="fill-gray-400 text-[10px]"
              >
                {point.date.slice(5)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
```

*ملاحظة:* بلا useEffect، بلا useState، بلا LoadingSkeleton—فـSuspense يتولى كل ذلك

*ملاحظة:* ذاكرة مؤقتة قائمة على Map لأن عنوان الجلب يعتمد على خاصية range

*ملاحظة:* يرمي وعدًا إن لم تكن بيانات هذا النطاق جاهزة بعد

افتح `packages/analytics/src/big-table.tsx` مرة أخرى. والنمط نفسه كـ`StatsBar`: بدّل الاستيرادات، واستبدل `useEffect` بمورد على مستوى الوحدة، واحذف حارس التحميل. حدّث الملف إلى:

*packages/analytics/src/big-table.tsx*

```typescript
import React from "react";
import type { TableRow, PaginatedResponse } from "@pulse/shared";
import { createSuspenseResource } from "@pulse/shared";
import { DataTable } from "@pulse/ui";
const columns = [
  { key: "user" as const, header: "User" },
  { key: "action" as const, header: "Action" },
  {
    key: "timestamp" as const,
    header: "Time",
    render: (value: TableRow[keyof TableRow]) =>
      new Date(String(value)).toLocaleString(),
  },
  {
    key: "duration" as const,
    header: "Duration",
    render: (value: TableRow[keyof TableRow]) => `${value}ms`,
  },
];

const tableResource = createSuspenseResource<TableRow[]>(
  fetch("/api/analytics/table?page=1")
    .then((r) => r.json())
    .then((result: PaginatedResponse<TableRow>) => result.data),
);
export function BigTable(): React.ReactElement {
  const data = tableResource.read();
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 font-medium text-gray-900">Recent Activity</h3>
      <DataTable columns={columns} data={data} keyField="id" />
    </div>
  );
}
```

*ملاحظة:* بلا useEffect، بلا useState، بلا LoadingSkeleton—فـSuspense يتولى كل ذلك

*ملاحظة:* مورد على مستوى الوحدة—يبدأ الجلب وقت الاستيراد

*ملاحظة:* يرمي وعدًا إن لم تكن البيانات جاهزة—فيعرض React واجهة Suspense الاحتياطية بدلًا من ذلك

> **الموارد على مستوى الوحدة تُنفَّذ فورًا**
>
> يُنشأ `statsResource` و`tableResource` وقت الاستيراد، ما يعني أن الجلب يبدأ بمجرد تحميل الوحدة—لا عند تصيير المكوّن. وهذا مرغوب فعلًا مع Suspense: فكلما بدأ الجلب أبكر، وصلت البيانات أسرع. وأما الموارد التي تعتمد على خصائص (مثل النطاق الزمني في المخطط)، فالذاكرة المؤقتة القائمة على `Map` تنشئ موردًا جديدًا عند أول وصول لكل قيمة نطاق.

### أضف حدود Suspense

والآن افتح `packages/analytics/src/analytics-dashboard.tsx` مرة أخيرة. وستضيف استيرادين وتلفّ كل مكوّن تابع في حدّ `<Suspense>`. أما بقية الملف فتبقى كما هي.

حدّث الاستيرادات في أعلى الملف—أضف `Suspense` من React و`LoadingSkeleton` من `@pulse/ui`:

*packages/analytics/src/analytics-dashboard.tsx*

```typescript
import React, { Suspense, useState } from 'react';
import { LoadingSkeleton } from '@pulse/ui';
// ... other imports stay the same ...
```

*ملاحظة:* Suspense للحدود غير المتزامنة؛ وLoadingSkeleton لواجهة الاستبدال الاحتياطية

ثم لفّ كل مكوّن تابع في JSX. ابحث عن `<StatsBar />` و`<Chart />` و`<BigTable />` ولفّ كل واحد منها:

*packages/analytics/src/analytics-dashboard.tsx*

```typescript
<Suspense fallback={<LoadingSkeleton variant="card" count={4} />}>
  <StatsBar />
</Suspense>
<div className="rounded-lg border border-gray-200 bg-white p-6">
  {/* ... time range buttons stay the same ... */}
  <Suspense fallback={<LoadingSkeleton variant="chart" />}>
    <Chart range={timeRange} />
  </Suspense>
</div>

<Suspense fallback={<LoadingSkeleton variant="table" />}>
  <BigTable />
</Suspense>
```

*ملاحظة:* يلتقط Suspense الوعد المرمي من statsResource.read() ويعرض هيكلًا عظميًا

*ملاحظة:* يُحلّ كل حدّ Suspense باستقلال مع وصول بياناته

*ملاحظة:* تستغرق بيانات الجدول ~2000ms—فيبقى هيكله العظمي ظاهرًا أطول مدة

احفظ وأعد تحميل الصفحة. وراقب تسلسل التصيير:

- تُصيَّر قشرة الصفحة (الشريط الجانبي، والترويسة) فورًا
- تظهر الهياكل العظمية الاحتياطية لكل قسم
- يظهر `StatsBar` بعد ~200ms مع استبدال الهيكل العظمي
- يظهر `Chart` بعد ~800ms
- يظهر `BigTable` بعد ~2000ms

### نقطة تحقق

يُحمَّل كل قسم من لوحة التحليلات الآن باستقلال عبر Suspense. فيظهر شريط الإحصاءات ببطاقات مقاييسه الأربع أولًا، ويتبعه المخطط بعد نحو 600ms، ويصل الجدول أخيرًا. ويعرض كل منها عنصر الهيكل العظمي الخاص به أثناء التحميل. والفرق الجوهري عن الخطوة 1: أن حالة التحميل يديرها الآن آلية Suspense في React، لا `useState` اليدوي في كل مكوّن.

شريط الإحصاءات محمَّل بينما المخطط والجدول ما زالا يعرضان هياكل عظمية

المخطط محمَّل مع شريط الإحصاءات، والجدول ما زال يُحمَّل

كل الأقسام محمَّلة بالكامل

## التصيير المتدفّق من الخادم مع `renderToPipeableStream`

تخدم حدود Suspense التي أضفتها في الخطوة 2 غرضين. ففي العميل، تعرض هياكل عظمية احتياطية أثناء تحميل البيانات. وفي الخادم، تخبر التصيير المتدفّق من الخادم في React أين يقسّم دفق HTML. وإليك شكل تطبيق التصيير المتدفّق من الخادم باستخدام حدود Suspense التي بنيتها بالفعل:

*server/render.tsx*

```typescript
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./app";
import type { Request, Response } from "express";

export function render(req: Request, res: Response) {
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: ["/src/main.tsx"],
      onShellReady() {
        // The shell (everything outside Suspense boundaries) is ready.
        // Start piping HTML immediately—Suspense fallbacks render as real HTML.
        // Each Suspense boundary streams its resolved content later as a <script> tag
        // that swaps in the final markup.
        res.setHeader("Content-Type", "text/html");
        pipe(res);
      },
      onError(error) {
        console.error("SSR error:", error);
        res.statusCode = 500;
      },
    },
  );
}
```

> **`onShellReady` مقابل `onAllReady`**
>
> تمنحك واجهة `renderToPipeableStream` خياري استدعاء راجع لتحديد متى يبدأ تدفق HTML إلى العميل. فيُطلَق `onShellReady` بمجرد تصيير كل ما هو *خارج* حدود Suspense: قشرة التطبيق، والتنقل، والهياكل العظمية الاحتياطية. أما المحتوى داخل حدود Suspense فيتدفق لاحقًا مع حلّ كل حدّ. وينتظر `onAllReady` حتى يُحلّ كل شيء، بما في ذلك كل حدود Suspense—وهذا يمنحك سلوك «انتظر كل شيء» القديم. وللتصيير التدريجي، استخدم `onShellReady` دائمًا. ولا تستخدم `onAllReady` إلا للتوليد الساكن للمواقع أو للزواحف التي تحتاج HTML كاملًا.

> **كيف يعمل الاستبدال المتدفّق في الكواليس**
>
> عندما يُطلَق `onShellReady`، يرسل React HTML كاملًا للقشرة—بما في ذلك محتوى الاستبدال لكل حدّ Suspense مصيَّرًا كـHTML حقيقي (مكوّنات الهيكل العظمي). ومع حلّ كل حدّ Suspense على الخادم، يرسل React وسم `<script>` يحتوي HTML المحلول ودالة صغيرة تستبدله في موضعه الصحيح في DOM. وينفّذ المتصفح هذا السكربت المضمّن فورًا، مستبدلًا الهيكل العظمي بالمحتوى النهائي—بلا حاجة إلى أي إطار عمل JavaScript للاستبدال. ولهذا تبدو الصفحة وكأنها «تمتلئ» تدريجيًا حتى قبل أن يترطّب React في العميل.

> **هذه الخطوة مفاهيمية**
>
> إعداد وسيط Express أو وضع التصيير من الخادم في Vite خارج نطاق هذا التمرين. والخلاصة الجوهرية أن حدود Suspense لديك تعمل تلقائيًا مع `renderToPipeableStream`—ولست بحاجة إلى تغيير أي شيفرة مكوّن لتمكين التصيير المتدفّق من الخادم. فالمعمار الذي بنيته في الخطوتين 1-2 جاهز للتصيير من الخادم بحكم التصميم.

> **الترطيب**
>
> عندما يتلقى المتصفح HTML الأولي من التصيير المتدفّق من الخادم، يكون ترميزًا ساكنًا: فلا تستجيب الأزرار للنقر، ولا تُشغّل تغييرات الحالة إعادات تصيير، ولا تعمل التأثيرات. والترطيب هو أن يسير React في DOM القائم، ويقارنه بشجرة المكوّنات التي كان سيصيّرها في العميل، و«يتبنّى» عُقد DOM تلك بربط معالجات الأحداث والمراجع وإدارة الحالة. وبعد اكتمال الترطيب، يصير التطبيق تفاعليًا بالكامل. ولهذا يكون التصيير المتدفّق من الخادم قيّمًا حتى قبل انتهاء الترطيب: فيرى المستخدم محتوى حقيقيًا فورًا (HTML مصيَّرًا في الخادم)، ويصير تفاعليًا تدريجيًا مع ترطيب React لكل حدّ Suspense. أما عدم توافق الترطيب—حيث يختلف HTML المصيَّر في الخادم عمّا سيصيّره العميل—فيجعل React يتخلى عن ترميز الخادم ويعيد التصيير من الصفر، ملغيًا فائدة الأداء.

### نقطة تحقق

فهمت كيف يستخدم `renderToPipeableStream` حدود Suspense لديك لبثّ HTML تدريجيًا. فالقشرة (الشريط الجانبي، والترويسة، والهياكل العظمية الاحتياطية) تُرسل أولًا، ثم يُبثّ كل حدّ Suspense محلول كوسم `<script>` استبدالي.

## جرّب مواضع الحدود

يغيّر موضع حدود Suspense تجربة المستخدم. جرّب تهيئات مختلفة في `packages/analytics/src/analytics-dashboard.tsx` لتلمس المقايضات.

تعرض شجرة المكوّنات أدناه كيف تلفّ حدود Suspense كل مكوّن يجلب بياناته باستقلال. ويلتقط كل حدّ الوعود المرمية من تابعه ويعرض الاستبدال المقابل.

```
graph TD
    AD["AnalyticsDashboard"]
    SB_S["Suspense (card skeleton)"]
    SB_C["Suspense (chart skeleton)"]
    SB_T["Suspense (table skeleton)"]
    Stats["StatsBar → statsResource.read()"]
    Chart["Chart → chartResource.read()"]
    Table["BigTable → tableResource.read()"]

    AD --> SB_S
    AD --> SB_C
    AD --> SB_T
    SB_S --> Stats
    SB_C --> Chart
    SB_T --> Table
```

### التهيئة A: حدّ واحد حول كل شيء

```typescript
<Suspense fallback={<LoadingSkeleton variant="page" />}>
  <StatsBar />
  <Chart />
  <BigTable />
</Suspense>
```

هذه مقاربة «كل شيء أو لا شيء». فتعرض منطقة التحليلات بأكملها هيكلًا عظميًا واحدًا حتى يُحلّ أبطأ مكوّن (`BigTable` عند 2000ms). فتبقى بيانات `StatsBar` السريعة غير مستخدمة 1800ms.

### التهيئة B: حدود فردية (الحالية)

```typescript
<Suspense fallback={<LoadingSkeleton variant="card" />}>
  <StatsBar />
</Suspense>
<Suspense fallback={<LoadingSkeleton variant="chart" />}>
  <Chart />
</Suspense>
<Suspense fallback={<LoadingSkeleton variant="table" />}>
  <BigTable />
</Suspense>
```

يُصيَّر كل قسم بمجرد أن تصير بياناته جاهزة. أقصى تدريج ممكن، لكن الصفحة تنقل تخطيطها ثلاث مرات مع ظهور الأقسام تباعًا.

### التهيئة C: حدود مجمّعة

```typescript
<Suspense fallback={<LoadingSkeleton variant="card" />}>
  <StatsBar />
</Suspense>
<Suspense fallback={<LoadingSkeleton variant="page" />}>
  <Chart />
  <BigTable />
</Suspense>
```

يُبثّ شريط الإحصاءات أولًا (تغذية راجعة سريعة)، ثم يظهر المخطط والجدول معًا عند حلّ الجدول. فتنقلبان مرتين بدل ثلاث. وبيانات المخطط جاهزة عند 800ms لكنها تنتظر حتى 2000ms لتُصيَّر لأنها تشترك في حدّ مع `BigTable`.

> **لا يوجد موضع صحيح في كل الحالات**
>
> تمنح التهيئة B أسرع زمن لوصول المحتوى الأول، لكنها تسبب ثلاث نقلات تخطيط. وتقلّل التهيئة C نقلات التخطيط لكنها تؤخر المخطط 1200ms. أما التهيئة A فلها أسوأ زمن لوصول المحتوى الأول لكن بلا أي نقلات تخطيط. والاختيار الصحيح يعتمد على منتجك: فلوحة تحكم لحظية تستفيد من التصيير التدريجي (B)، بينما قد يفضّل تقرير كثيف البيانات استقرار الحدود المجمّعة (C). ولهذا حدود Suspense قرارات معمارية: فهي ترمّز أولويات المنتج في شجرة مكوّناتك.

### جرّب كل واحدة

بدّل بين التهيئات A وB وC. وراقب شلال الشبكة في DevTools وانتبه إلى إحساس الصفحة كمستخدم. ثم استقرّ على أي مقاربة تفضّل واتركها في مكانها.

### نقطة تحقق

جرّبت موضعين مختلفين على الأقل لحدود Suspense ولاحظت كيف يغيّر كل منهما تجربة التحميل. وتستطيع أن تصف بدقة المقايضة بين زمن وصول المحتوى الأول واستقرار التخطيط.

## الحل

إن كنت بحاجة إلى اللحاق، فالحالة المكتملة لهذا التمرين متاحة على الفرع `04-monorepos-start`:

```bash
git checkout 04-monorepos-start
pnpm install
```

## أهداف إضافية

- **أضف حدود أخطاء إلى جانب حدود Suspense:** لفّ كل حدّ Suspense بـ`ErrorBoundary` من `@pulse/ui`. وأوقف الواجهة البرمجية المُحاكاة لنقطة نهاية واحدة (عدّل معالج MSW كي يعيد 500) وتحقق من أن حدّ الأخطاء يلتقط ذلك دون إسقاط بقية لوحة التحليلات.
- **Suspense متداخل:** أضف حدّ Suspense داخل `BigTable` حول عناصر التحكم في التقسيم إلى صفحات. وعندما يغيّر المستخدم الصفحات، تبقى ترويسة الجدول ظاهرة بينما تعرض الصفوف وحدها حالة تحميل.
- **`useTransition` للتنقل:** لفّ تغييرات المسار في `useTransition` كي يبقى المسار السابق ظاهرًا أثناء تحميل بيانات المسار التالي، بدل عرض هيكل عظمي على مستوى الصفحة.

## ما التالي

رأيت كيف تتحكم حدود Suspense في تجربة التحميل عبر مكوّنات تجلب بياناتها باستقلال. ولوحة التحليلات الآن بحزم متعددة (analytics وui وshared) لكن بلا تنسيق للبناء—فـ`pnpm -r build` يعيد بناء كل شيء في كل مرة. وفي التمرين التالي، ستضيف Turborepo للحصول على عمليات بناء واعية بالاعتمادات ومخزَّنة مؤقتًا، وتلمس الفرق عندما يستغرق البناء الثاني زمنًا يقارب الصفر.
