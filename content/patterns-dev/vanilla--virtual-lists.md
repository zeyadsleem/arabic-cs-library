---
title: افتراضية القوائم (List Virtualization)
lang: ar
source: https://www.patterns.dev/vanilla/virtual-lists/
---
في هذا الدليل، سنناقش افتراضية القوائم (list virtualization)، المعروفة أيضًا باسم النوافذ (windowing). الفكرة هي عرض الصفوف المرئية فقط من قائمة ديناميكية بدلًا من القائمة كاملة. وتكون الصفوف المعروضة جزءًا صغيرًا فقط، مع تحريك الجزء المرئي (النافذة) عندما يمرر المستخدم. ويمكن أن يحسّن هذا أداء العرض (rendering performance).

إذا كنت تستخدم React وتحتاج إلى **عرض قائمة كبيرة من البيانات بكفاءة**، فقد تكون على دراية بـ [react-virtualized](https://bvaughn.github.io/react-virtualized/). هذه مكتبة نوافذ أنشأها [Brian Vaughn](https://twitter.com/brian_d_vaughn)، وتعرض العناصر المرئية فقط داخل قائمة قابلة للتمرير. هذا يعني أنك لا تدفع تكلفة عرض آلاف الصفوف مرة واحدة. ويرافق هذا الدليل [فيديو](https://www.youtube.com/embed/QhPn6hLGljU) عن افتراضية القوائم باستخدام react-window.

## كيف تعمل افتراضية القوائم؟


<ul> تعني «افتراضية» قائمة العناصر **الحفاظ على نافذة** و**تحريك هذه النافذة حول القائمة**. تعمل النوافذ في react-virtualized بطريقتين:

- وجود عنصر DOM صغير (مثل ``) بموضع نسبي (النافذة)
- وجود عنصر DOM كبير للتمرير
- وضع عناصر DOM داخل الحاوية بموضع مطلق، وضبط أنماط `top` و`left` و`width` و`height`.

بدلًا من عرض آلاف العناصر دفعة واحدة، وهو ما قد يبطئ العرض الأولي أو يؤثر في أداء التمرير، **ركز الافتراضية على عرض العناصر المرئية للمستخدم فقط**.

يمكن أن يساعد ذلك في الحفاظ على سرعة عرض القوائم على الأجهزة متوسطة الأدئة ومنخفضة المواصفات. يمكنك جلب عناصر وعرضها أكثر مع تمرير المستخدم، مع تفريغ العناصر السابقة واستبدالها بأخرى جديدة.

## بديل أصغر لـ react-virtualized

[react-window](https://react-window.now.sh/) هو إعادة كتابة لـ react-virtualized من المؤلف نفسه، ويهدف إلى أن يكون **أصغر** وأسرع وأكثر [قابلية لإزالة الشيفرة الميتة](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/).

في مكتبة قابلة لإزالة الشيفرة الميتة، يعتمد الحجم على واجهات API التي تختار استخدامها. لوحظ توفير نحو 20–30KB بعد الضغط عند استخدامه بدلًا من react-virtualized:

واجهات API في الحزمتين متشابهة، ويميل react-window إلى البساطة عند اختلافهما. تتضمن مكوّنات react-window:

### القائمة

تعرض القوائم **قائمة نوافذ من العناصر**، أي أن الصفوف المرئية فقط تظهر للمستخدم، مثل [FixedSizeList](https://react-window.now.sh/#/examples/list/fixed-size) و[VariableSizeList](https://react-window.now.sh/#/examples/list/variable-size). تستخدم القوائم Grid داخليًا لعرض الصفوف وتمرير الخصائص إلى الشبكة الداخلية.


**عرض قائمة بيانات باستخدام React**

إليك مثالًا لعرض قائمة بيانات بسيطة (`itemsArray`) باستخدام React:

```javascript
import React from "react";

import ReactDOM from "react-dom";

const itemsArray = [

{ name: "Drake" },

{ name: "Halsey" },

{ name: "Camillo Cabello" },

{ name: "Travis Scott" },

{ name: "Bazzi" },

{ name: "Flume" },

{ name: "Nicki Minaj" },

{ name: "Kodak Black" },

{ name: "Tyga" },

{ name: "Buno Mars" },

{ name: "Lil Wayne" }, ...

]; // our data

const Row = ({ index, style }) => (

<div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>

{itemsArray[index].name}

</div>

);

const Example = () => (

<div

style={{

height: 150,

width: 300

}}

class="List"

>

{itemsArray.map((item, index) => Row({ index }))}

</div>

);

ReactDOM.render(<Example />, document.getElementById("root"));
```

**عرض قائمة باستخدام react-window**

وهذا هو المثال نفسه باستخدام `FixedSizeList` من react-window، الذي يأخذ بعض الخصائص (`width` و`height` و`itemCount` و`itemSize`) ودالة عرض صف تُمرر كطفل:

```javascript
import React from "react";

import ReactDOM from "react-dom";

import { FixedSizeList as List } from "react-window";

const itemsArray = [...]; // our data

const Row = ({ index, style }) => (

<div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>

{itemsArray[index].name}

</div>

);

const Example = () => (

<List

className="List"

height={150}

itemCount={itemsArray.length}

itemSize={35}

width={300}

>

{Row}

</List>

);

ReactDOM.render(<Example />, document.getElementById("root"));
```

يمكنك تجربة `FixedSizeList` على [CodeSandbox](https://codesandbox.io/s/github/bvaughn/react-window/tree/master/website/sandboxes/fixed-size-list-vertical).

### الشبكة

تعرض Grid **بيانات جدولية** مع افتراضية على المحورين الرأسي والأفقي، مثل [FizedSizeGrid](https://react-window.now.sh/#/examples/grid/fixed-size) و[VariableSizeGid](https://react-window.now.sh/#/examples/grid/variable-size). وتعرض فقط خلايا Grid اللازمة لملء نفسها وفق مواضع التمرير الحالية.


إذا أردنا عرض القائمة نفسها السابقة بتخطيط شبكي، مع افتراض أن مدخلاتنا مصفوفة متعددة الأبعاد، فيمكننا استخدام `FixedSizeGrid` كما يلي:

```javascript
import React from 'react';

import ReactDOM from 'react-dom';

import { FixedSizeGrid as Grid } from 'react-window';

const itemsArray = [

[{},{},{},...],

[{},{},{},...],

[{},{},{},...],

[{},{},{},...],

];

const Cell = ({ columnIndex, rowIndex, style }) => (

<div

className={

columnIndex % 2

? rowIndex % 2 === 0

? 'GridItemOdd'

: 'GridItemEven'

: rowIndex % 2

? 'GridItemOdd'

: 'GridItemEven'

}

style={style}

>

{itemsArray[rowIndex][columnIndex].name}

</div>

);

const Example = () => (

<Grid

className="Grid"

columnCount={5}

columnWidth={100}

height={150}

rowCount={5}

rowHeight={35}

width={300}

>

{Cell}

</Grid>

);

ReactDOM.render(<Example />, document.getElementById('root'));
```

يمكنك أيضًا تجربة `FixedSizeGrid` على [CodeSandbox](https://codesandbox.io/s/github/bvaughn/react-window/tree/master/website/sandboxes/fixed-size-grid).

## أمثلة react-window الأكثر تفصيلًا

نفّذ [Scott Taylor](https://github.com/staylor) أداة [Pitchfork music reviews scraper](http://pitchfork.highforthis.com/) مفتوحة المصدر [(المصدر)](https://github.com/staylor/pitchfork-scraper) باستخدام `react-window` و`FixedSizeGrid`. وفيما يلي فيديو للتطبيق أثناء عمله:

يستخدم Pitchfork scraper مكتبة [react-window-infinite-loader](https://github.com/bvaughn/react-window-infinite-loader) ([عرض تجريبي](https://codesandbox.io/s/5wqo7z2np4))، التي تساعد على تقسيم مجموعات البيانات الكبيرة إلى أجزاء يمكن تحميلها عند التمرير إليها.

إليك مقطعًا من طريقة دمج react-window-infinite-loader في هذا التطبيق:

```javascript
import React, { Component } from 'react';

import { FixedSizeGrid as Grid } from 'react-window';

import InfiniteLoader from 'react-window-infinite-loader';

...

render() {

return (

<InfiniteLoader

isItemLoaded={this.isItemLoaded}

loadMoreItems={this.loadMoreItems}

itemCount={this.state.count + 1}

>

{({ onItemsRendered, ref }) => (

<Grid

onItemsRendered={this.onItemsRendered(onItemsRendered)}

columnCount={COLUMN_SIZE}

columnWidth={180}

height={800}

rowCount={Math.max(this.state.count / COLUMN_SIZE)}

rowHeight={220}

width={1024}

ref={ref}

>

{this.renderCell}

</Grid>

)}

</InfiniteLoader>

);

}

}
```

قد تجد [الالتزام](https://github.com/staylor/pitchfork-scraper/commit/d9bff69e332ad9de8351c67f4848fc7968209eff) الذي نقل التطبيق من `react-virtualized` مفيدًا.

تتوفر أيضًا تنفيذات لـ Pitchfork scraper تستخدم `FixedSizeList` ([عرض تجريبي](https://node-ntdprbnulc.now.sh)، [عرض على Pixel](https://youtu.be/CImWBbBeQXU)):

وهذا مقطع من التنفيذ:

```javascript
return (

<InfiniteLoader

isItemLoaded={this.isItemLoaded}

loadMoreItems={this.loadMoreItems}

itemCount={this.state.count}

>

{({ onItemsRendered, ref }) => (

<section>

<FixedSizeList

itemCount={this.state.count}

itemSize={ROW_HEIGHT}

onItemsRendered={onItemsRendered}

height={this.state.height}

width={this.state.width}

ref={ref}

>

{this.renderCell}

</FixedSizeList>

</section>

)}

</InfiniteLoader>

);
```

ماذا كانت احتياجاتنا أكثر تعقيدًا لحل افتراضية شبكية؟ وجدنا [The Movie Database](https://www.themoviedb.org/) و[تطبيق العرض](https://tmdb-viewer.surge.sh/) الذي استخدم react-virtualized وInfinite Loader في الداخل.

لم يستغرق [نقله](https://github.com/addyosmani/tmdb-viewer/blob/master/src/components/InfiniteMoviesList.js) إلى react-window وreact-window-infinite-loader وقتًا طويلًا، لكننا اكتشفنا أن بعض المكونات غير مدعومة بعد. ومع ذلك، كانت الوظيفة النهائية [قريبة جدًا](https://tmdb-viewer.firebaseapp.com/).

[](https://tmdb-viewer.firebaseapp.com/)

كانت المكونات الناقصة هي WindowScroller وAutoSizer، وسننظر إليها تاليًا.

```javascript
...

return (

<section>

<AutoSizer disableHeight>

{({width}) => {

const {movies, hasMore} = this.props;

const rowCount = getRowsAmount(width, movies.length, hasMore);

...

return (

<InfiniteLoader

ref={this.infiniteLoaderRef}

...

{({onRowsRendered, registerChild}) => (

<WindowScroller>

{({height, scrollTop}) => (
```

## ما الذي ينقص react-window؟

لا يملك react-window بعد واجهة API الكاملة الخاصة بـ react-virtualized، لذا راجع [وثائق المقارنة](https://github.com/bvaughn/react-window#how-is-react-window-different-from-react-virtualized) إذا كنت تفكر فيه. ما الذي ينقص؟

- [WindowScroller](https://github.com/bvaughn/react-virtualized/blob/master/docs/WindowScroller.md) — مكوّن في `react-virtualized` يتيح تمرير القوائم وفق مواضع تمرير النافذة. لا توجد حاليًا [خطط](https://github.com/bvaughn/react-window/issues/30) لتنفيذه في react-window، لذا ستحل المشكلة في userland.
- [AutoSizer](https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md) — HOC يتمدد ليملأ المساحة المتاحة ويضبط عرض وارتفاع الطفل تلقائيًا. نفّذ Brian هذا كحزمة [مستقلة](https://www.npmjs.com/package/react-virtualized-auto-sizer). اتبع [المشكلة](https://github.com/bvaughn/react-window/issues/5) لمعرفة آخر تحديث.
- [CellMeasurer](https://github.com/bvaughn/react-virtualized/blob/master/docs/CellMeasurer.md) — HOC يقيس محتوى الخلية تلقائيًا عبر عرضه بطريقة غير مرئية للمستخدم. اتبع [هنا](https://github.com/bvaughn/react-window/issues/6) للمناقشة.

ومع ذلك، وجدنا react-window كافيًا لمعظم احتياجاتنا بما يوفره افتراضيًا.

## التحسينات في منصة الويب

تدعم بعض المتصفحات الحديثة الآن خاصية [CSS content-visibility](https://web.dev/content-visibility/). تتيح `content-visibility:auto` تخطي عرض المحتوى خارج الشاشة ورسمه حتى الحاجة إليه. إذا كان لديك مستند HTML طويلًا مكلف العرض، فجرّب هذه الخاصية.

لعرض القوائم ذات المحتوى الديناميكي، ما زلت أنصح باستخدام مكتبة مثل react-window. يصعب أن تتغلب نسخة تستخدم `content-visbility:hidden` على نسخة تستخدم `display:none` بشدة أو إزالة عُقد DOM خارج الشاشة كما تفعل مكتبات افتراضية القوائم اليوم.

## قراءة إضافية

لمزيد من القراءة عن react-window وreact-virtualized، راجع:

- [عرض القوائم عالية الأداء باستخدام react-window](https://alligator.io/react/lists-with-react-window/)
- [إنشاء عروض React أكثر كفاءة باستخدام Windowing](https://www.youtube.com/watch?v=t4tuhg7b50I)
- [عرض القوائم باستخدام react-virtualized](https://css-tricks.com/rendering-lists-using-react-virtualized/)
- [عرض القوائم الكبيرة باستخدام react-virtualized](https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3)

![أثر افترافية القوائم: معدل إطارات أعلى مقارنةً بالعرض دفعة واحدة](/images/patterns-dev/vanilla-virtual-lists-0-frame_rate_10k_2x.webp)

![حجم حزمة react-virtualized (34 كيلوبايت مضغوطة) مقابل react-window (5 كيلوبايت)](/images/patterns-dev/vanilla-virtual-lists-1-bundlephobia_2x.webp)

![محلّل حزم Webpack يُظهر فرقاً يقارب 20 كيلوبايت](/images/patterns-dev/vanilla-virtual-lists-2-wbpa_2x.webp)

![عارض TMDB يعرض آلاف العناصر](/images/patterns-dev/vanilla-virtual-lists-3-tmdb_2x.webp)
