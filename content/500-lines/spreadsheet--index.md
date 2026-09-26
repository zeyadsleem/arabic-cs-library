---
title: "ورقة حساب على الويب"
lang: ar
source: https://aosabook.org/en/500L/spreadsheet.html
---

_مُبرمجة ومترجمة تعلَّمت نفسها بنفسها، تعمل مع Apple كعاقدة مستقلّة في توطين خدمات السحابة وتقنيات اللغة الطبيعية. صمَّمت أودري سابقًا أوّل تنفيذ عامل للغة Perl 6 وقدته، وخدمت في لجان تصميم لغات الحاسوب الخاصّة بـ Haskell وPerl 5 وPerl 6. وتعمل أودري حاليًّا بدوام كامل كمساهِمة في مشروع g0v، وتقود مشروع التشريع الإلكتروني الأول في تايوان._

يقدّم هذا فصلًا عن ورقة حساب على الويب (spreadsheet) مكتوبة في 99 سطرًا من اللغات الثلاث التي تدعمها المتصفّحات أصلًا: HTML وJavaScript وCSS.

والإصدار ES5 من هذا المشروع متاح على [jsFiddle](http://jsfiddle.net/audreyt/LtDyP/).


_(هذا الفصل متاح أيضًا [بالصينية التقليدية](https://github.com/aosabook/500lines/blob/master/spreadsheet/spreadsheet.zh-tw.markdown))._


## مقدّمة

حين اخترع تيم بيرنز لي الويب عام 1990، كانت _صفحات الويب_ تُكتب بـ HTML عبر وضع وسوم بين قوسين زاويّين على النصّ، ومنح المحتوى بنيةً منطقية. وأصبح النصّ الموسوم داخل `<a>…</a>` _روابط تشعبية_ تُحيل المستخدم إلى صفحات أخرى على الويب.

وفي تسعينيات القرن الماضي، أضافت المتصفّحات وسومًا عرضيّة متنوّعة إلى مفردات HTML، ومنها وسوم غير قياسية شهيرة مثل `<blink>…</blink>` من Netscape Navigator و`<marquee>…</marquee>` من Internet Explorer، ممّا سبّب مشكلات واسعة في قابلية الاستخدام وتوافق المتصفّحات.

ومن أجل تقييد HTML بغايتها الأصلية—وصف البنية المنطقية للمستند—اتفق صانعو المتصفّحات في النهاية على دعم لغتين إضافيّتين: CSS لوصف أنماط العرض (_style_) للصفحة، وJavaScript (JS) لوصف تفاعلاتها الديناميكية.

ومنذ ذلك الحين، أصبحت اللغات الثلاث أكثر إيجازًا وقدرةً عبر عشرين عامًا من التطوّر المتبادل. وتحديدًا، جعلت التحسينات في محرّكات JS عمليًّا نشر أُطر عمل JS واسعة النطاق مثل [AngularJS](http://angularjs.org/).

اليوم، صارت _تطبيقات الويب_ (_web applications_) العابرة للمنصّات (مثل أوراق حساب الويب) شائعةً ومنتشرةً بقدر التطبيقات الخاصة بمنصّة بعينها (مثل VisiCalc وLotus 1-2-3 وExcel) من القرن الماضي.

كم ميزة يمكن لتطبيق ويب أن يقدّمها في 99 سطرًا مع AngularJS؟ لنرَها أثناء عملها!

## نظرة عامة

يحتوي دليل [ورقة الحساب](https://github.com/audreyt/500lines/tree/master/spreadsheet/code) على عرضنا لإصدارات أواخر عام 2014 من لغات الويب الثلاث: [HTML5](http://www.w3.org/TR/html5/) للبنية، و[CSS3](http://www.w3.org/TR/css3-ui/) للعرض، ومعيار JS [ES6 «Harmony»](http://git.io/es6features) للتفاعل. كما يستخدم [تخزين الويب](http://www.whatwg.org/specs/web-apps/current-work/multipage/webstorage.html) لاستمرارية البيانات، و[عمال الويب](http://www.whatwg.org/specs/web-apps/current-work/multipage/workers.html) لتشغيل شيفرة JS في الخلفية. وحتى وقت كتابة هذا الفصل، تدعم هذه المعايير ويب Firefox وChrome وInternet Explorer 11+، فضلًا عن متصفّحات الجوّال على iOS 5+ وAndroid 4+.

الآن لنفتح [ورقة حسابنا](http://audreyt.github.io/500lines/spreadsheet/) في متصفّح (\aosafigref{500l.spreadsheet.initial}):

\aosafigure[240pt]/images/500-lines/spreadsheet-0-01_initial.webp{Initial Screen}{500l.spreadsheet.initial}

### المفاهيم الأساسية

تمتدّ ورقة الحساب على بُعدين، تبدأ _الأعمدة_ (_columns_) من **A**، وتبدأ _الصفوف_ (_rows_) من **1**. ولكل _خلية_ (_cell_) إحداثيّ (_coordinate_) فريد (مثل **A1**) ومحتوى (_content_) (مثل "1874")، ينتمي إلى أحد أربعة _أنواع_:

* نصّ (_text_): "+" في **B1** و"->" في **D1**، محاذًى إلى اليسار.
* رقم: "1874" في **A1** و"2046" في **C1**، محاذًى إلى اليمين.
* صيغة (_formula_): ‏`=A1+C1` في **E1**، وهي _تُحسب_ (_calculates_) إلى _قيمة_ (_value_) "3920"، تُعرض بخلفية زرقاء فاتحة.
* فارغ: جميع خلايا الصف **2** فارغة حاليًّا.

انقر على "3920" لوضع _التركيز_ (_focus_) على **E1**، ما يكشف صيغتها في _مربّع إدخال_ (_input box_) (\aosafigref{500l.spreadsheet.inputbox}).

\aosafigure[240pt]/images/500-lines/spreadsheet-1-02_input.webp{Input Box}{500l.spreadsheet.inputbox}

الآن لنضع التركيز على **A1** و_نغيّر_ (_change_) محتواها إلى "1"، ممّا يجعل **E1** تُعيد الحساب (_recalculate_) لقيمتها فتصير "2047" (\aosafigref{500l.spreadsheet.changed}).

\aosafigure[240pt]/images/500-lines/spreadsheet-2-03_changed.webp{Changed Content}{500l.spreadsheet.changed}

اضغط **ENTER** لوضع التركيز على **A2** وتغيير محتواها إلى `=Date()`، ثم اضغط **TAB**، وغيّر محتوى **B2** إلى `=alert()`، ثم اضغط **TAB** مرّة أخرى لوضع التركيز على `C2` (\aosafigref{500l.spreadsheet.error}).

\aosafigure[240pt]/images/500-lines/spreadsheet-3-04_error.webp{Formula Error}{500l.spreadsheet.error}

وهذا يُظهر أن الصيغة قد تحسب إلى رقم ("2047" في **E1**)، أو إلى نصّ (الوقت الحالي في **A2**، محاذًى إلى اليسار)، أو إلى _خطأ_ (_error_) (حروف حمراء في **B2**، محاذاةً إلى الوسط).

بعد ذلك، لنجرّب إدخال `=for(;;){}`، وهي شيفرة JS لحلقة لا نهائية لا تنتهي أبدًا. وستمنع ورقة الحساب ذلك عبر _استعادة_ (_restore_) محتوى **C2** تلقائيًا بعد محاولة التغيير.

الآن أعِد تحميل الصفحة في المتصفّح عبر **Ctrl-R** أو **Cmd-R** للتحقّق من أنّ محتوى ورقة الحساب _دائم_ (_persistent_)، أي يبقى نفسه بين جلسات المتصفّح. ولإعادة _تعيين_ (_reset_) ورقة الحساب إلى محتواها الأصلي، اضغط زر «السهم المنحني» في الزاوية العليا اليسرى.

### التحسين التدريجي

قبل أن نغوص في أسطر الشيفرة التسعة والتسعين، يجدر بنا تعطيل JS في المتصفّح، وإعادة تحميل الصفحة، وتدوين الفروق (\aosafigref{500l.spreadsheet.nojs}).

* بدلًا من الشبكة الكبيرة، لا يبقى على الشاشة سوى جدول 2×2، وفيه خلية محتوى واحدة.
* تُستبدل تسميات الصفوف والأعمدة بـ `{{ row }}` و`{{ col }}`.
* الضغط على زر إعادة التعيين لا يُحدث أيّ أثر.
* الضغط على **TAB** أو النقر في سطر المحتوى الأوّل ما زال يكشف مربّع إدخال قابلًا للتحرير.

\aosafigure[240pt]/images/500-lines/spreadsheet-4-05_nojs.webp{With JavaScript Disabled}{500l.spreadsheet.nojs}

حين نعطّل التفاعلات الديناميكية (JS)، تبقى بنية المحتوى (HTML) وأنماط العرض (_style_) الخاصّة بـ CSS سارية. فإذا كان موقع ما مفيدًا مع تعطيل JS وCSS معًا، نقول إنّه يلتزم بمبدأ _التحسين التدريجي_ (_progressive enhancement_)، ممّا يجعل محتواه في متناول أوسع جمهور ممكن.

ولأنّ ورقة حسابنا تطبيق ويب بلا شيفرة من جهة الخادم، فلا بدّ من الاعتماد على JS لتوفير المنطق المطلوب. لكنّه يعمل فعلًا حين لا يكون CSS مدعومًا بالكامل، كما في قارئات الشاشة والمتصفّحات في وضع النصّ.

\aosafigure[240pt]/images/500-lines/spreadsheet-5-06_nocss.webp{With CSS Disabled}{500l.spreadsheet.nocss}

وكما يبيّن \aosafigref{500l.spreadsheet.nocss}، فإنّنا إن فعّلنا JS في المتصفّح وعطّلنا CSS بدلًا منه، تكون الآثار كالتالي:

* تختفي كلّ ألوان الخلفية والمقدّمة.
* يظهر مربّع الإدخال وقيمة الخلية معًا، بدلًا من ظهور أحدهما فقط في كلّ مرّة.
* وإلّا فإنّ التطبيق ما زال يعمل كما في النسخة الكاملة.

## استعراض الشيفرة

يبيّن \aosafigref{500l.spreadsheet.architecture} الروابط بين مكوّنات HTML وJS. وكي نفهم المخطّط، سنمرّ على ملفات الشيفرة المصدرية الأربعة، بالترتيب نفسه الذي يحمّل بها المتصفّح.

\aosafigure[240pt]/images/500-lines/spreadsheet-6-00_architecture.webp{Architecture Diagram}{500l.spreadsheet.architecture}


* **index.html**: 19 سطرًا
* **main.js**: 38 سطرًا (باستثناء التعليقات والأسطر الفارغة)
* **worker.js**: 30 سطرًا (باستثناء التعليقات والأسطر الفارغة)
* **styles.css**: 12 سطرًا

### HTML

يصرّح السطر الأوّل في `index.html` بأنّه مكتوب بـ HTML5 بترميز UTF-8:

```html
<!DOCTYPE html><html><head><meta charset="UTF-8">
```

من دون تصريح `charset`، قد يعرض المتصفّح رمز يونيكود الخاص بزر إعادة التعيين بوصفه `â†»`، وهو مثال على _التشويش النصّي_ (_mojibake_): نصّ مشوّه ناتج عن مشكلات في فكّ الترميز.

الأسطر الثلاثة التالية هي تعليمات JS، موضوعة في قسم `head` كالمعتاد:

```html
  <script src="lib/angular.js"></script>
  <script src="main.js"></script>
  <script>
      try { angular.module('500lines') }
      catch(e){ location="es5/index.html" }
  </script>
```

تحمّل وسوم `<script src="…">` موارد JS من المسار نفسه الذي توجد فيه صفحة HTML. فمثلًا، إذا كان عنوان URL الحالي هو `http://abc.com/x/index.html`، فإنّ `lib/angular.js` تشير إلى `http://abc.com/x/lib/angular.js`.

يختبر السطر `try{ angular.module('500lines') }` ما إذا كان `main.js` محمّلًا على الوجه الصحيح، وإن لم يكن فأمره أن يتنقّل المتصفّح إلى `es5/index.html` بدلًا من ذلك. وتضمن هذه تقنية _التدهور السلمي عبر إعادة التوجيه_ (_redirect-based graceful degradation_) أن نتمكّن، مع المتصفّحات ما قبل 2015 التي لا تدعم ES6، من استخدام نسخ برامج JS المترجَمة إلى ES5 كخيار احتياطي.

يحمّل السطران التاليان مورد CSS، ويغلقان قسم `head`، ويبدآن قسم `body` الذي يحتوي الجزء المرئي للمستخدم:

```html
  <link href="styles.css" rel="stylesheet">
</head><body ng-app="500lines" ng-controller="Spreadsheet" ng-cloak>
```

تخبر سمتا `ng-app` و`ng-controller` أعلاه [AngularJS](http://angularjs.org/) بأن تستدعي دالة `Spreadsheet` في وحدة `500lines`، وهي دالة تُعيد _نموذجًا_ (_model_): كائنًا يوفّر _ارتباطات_ (_bindings_) على _عرض المستند_ (_view_). (وتخفي سمة `ng-cloak` المستند عن العرض حتى تصبح الارتباطات في مواضعها.)

ولتكن مثالًا ملموسًا: حين ينقر المستخدم على `<button>` المعرَّف في السطر التالي، تُطلق سمة `ng-click` وتستدعي `reset()` و`calc()`، وهما دالتان مسمّاتان يوفّرهما نموذج JS:

```html
  <table><tr>
    <th><button type="button" ng-click="reset(); calc()">↻</button></th>
```

يستخدم السطر التالي `ng-repeat` لعرض قائمة تسميات الأعمدة في الصف العلوي:

```html
    <th ng-repeat="col in Cols">{{ col }}</th>
```

فمثلًا، إذا عرّف نموذج JS `Cols` بأنّها `["A","B","C"]`، فستكون هناك ثلاث خلايا ترويسة (`th`) موسومة بالمقابل. وتخبر صيغة `{{ col }}` AngularJS بأن _تستبدل_ (_interpolate_) التعبير، فتملأ محتوى كل `th` بالقيمة الحالية لـ `col`.

وبالمثل، يمرّ السطران التاليان على القيم في `Rows` — `[1,2,3]` وهكذا — فيُنشئان صفًّا لكل قيمة ويوسمان خلية `th` الأكثَر على اليمين برقمها:

```html
  </tr><tr ng-repeat="row in Rows">
    <th>{{ row }}</th>
```

ولأنّ الوسم `<tr ng-repeat>` لم يُغلق بعد بـ `</tr>`، فإنّ المتغيّر `row` ما زال متاحًا للتعبيرات. ويُنشئ السطر التالي خلية بيانات (`td`) في الصف الحالي، ويستخدم المتغيّرَين `col` و`row` معًا في سمة `ng-class` عليهما:

```html
    <td ng-repeat="col in Cols" ng-class="{ formula: ('=' === sheet[col+row][0]) }">
```

وهناك عدّة أمور تجري هنا. في HTML، تصف سمة `class` _مجموعة أسماء أصناف_ (_set of class names_) تسمح لـ CSS بتنسيقها على طرق مختلفة. ويقيّم `ng-class` هنا التعبير `('=' === sheet[col+row][0])`، فإن كانت النتيجة صحيحة أُضيف الصنف `formula` إلى `<td>`، ما يمنح الخلية خلفية زرقاء فاتحة كما هو معرّف في السطر 8 من **styles.css** بواسطة _مُحدِّد الصنف_ (_class selector_) ‏`.formula`.

ويتحقّق التعبير أعلاه ما إذا كانت الخلية الحالية صيغةً عبر اختبار ما إذا كان `=` هو الحرف الأوّل (`[0]`) في السلسلة `sheet[col+row]`، حيث إنّ `sheet` كائن في نموذج JS خصائصُه إحداثيّات (مثل `"E1"`)، وقيمُه محتويات الخلايا (مثل `"=A1+C1"`). ولاحظ أنّ `col` سلسلة نصّية لا رقم، فإنّ `+` في `col+row` تعني الدم (_concatenation_) لا الجمع.

وداخل `<td>`، نمنح المستخدم مربّع إدخال لتحرير محتوى الخلية المخزَّن في `sheet[col+row]`‏:

```html
       <input id="{{ col+row }}" ng-model="sheet[col+row]" ng-change="calc()"
        ng-model-options="{ debounce: 200 }" ng-keydown="keydown( $event, col, row )">
```

السمة المفتاحية هنا هي `ng-model`، وهي تتيح _ارتباطًا ثنائي الاتجاه_ (_two-way binding_) بين نموذج JS والمحتوى القابل للتحرير في مربّع الإدخال. وعمليًا، يعني هذا أنّ كلّما أجرى المستخدم تغييرًا في مربّع الإدخال، حدّث نموذج JS قيمة `sheet[col+row]` لتطابق المحتوى، وأطلق دالته `calc()` لإعادة حساب (_recalculation_) قيم جميع خلايا الصيغ.

ولتجنّب الاستدعاءات المتكرّرة لـ `calc()` حين يضغط المستخدم مفتاحًا ويستمرّ في الضغط، تحدّ `ng-model-options` معدّل التحديث بمعدّل مرّة واحدة كل 200 جزء من الثانية.

السمة `id` هنا مُستبدَلة بالإحداثيّ `col+row`. ويجب أن تكون سمة `id` في عنصر HTML مختلفة عن `id` في سائر عناصر المستند نفسه. وهذا يضمن أنّ _مُحدِّد المعرّف_ (_ID selector_) ‏`#A1` يشير إلى عنصر واحد، لا إلى مجموعة عناصر كما يفعل مُحدِّد الصنف `.formula`. وحين يضغط المستخدم مفاتيح **UP** أو **DOWN** أو **ENTER**، يستخدم منطق التنقّل بلوحة المفاتيح في `keydown()` محدّدات المعرّفات لتحديد مربّع الإدخال الذي ينبغي أن يوضع التركيز عليه.

وبعد مربّع الإدخال، نضع `<div>` لعرض القيمة المحسوبة للخلية الحالية، وهي ممثَّلة في نموذج JS بالكائنَين `errs` و`vals`‏:

```html
      <div ng-class="{ error: errs[col+row], text: vals[col+row][0] }">
        {{ errs[col+row] || vals[col+row] }}</div>
```

وإن حدث خطأ عند حساب صيغة، يستخدم استبدال النصّ رسالة الخطأ الواردة في `errs[col+row]`، ويطبّق `ng-class` الصنف `error` على العنصر، فيسمح لـ CSS بتنسيقه على نحو مختلف (بالحروف الحمراء، محاذاةً إلى الوسط، إلخ).

وحين لا يكون هناك خطأ، تُستبدل `vals[col+row]` الموجودة على يمين `||` بدلًا من ذلك. فإن كانت سلسلة نصّية غير فارغة، سيُقيَّم الحرف الأوّل (`[0]`) على أنّه صحيح، فيُطبَّق الصنف `text` على العنصر، وهو ما يُحاذي النصّ إلى اليسار.

ولأنّ السلاسل الفارغة والقيم الرقمية لا تملك حرفًا أوّلًا، فإنّ `ng-class` لا يمنحها أيّ أصناف، فيستطيع CSS تنسيقها بمحاذاة إلى اليمين بوصفها الحالة الافتراضية.

وأخيرًا، نغلق حلقة `ng-repeat` على مستوى العمود بـ `</td>`، ونغلق حلقة مستوى الصف بـ `</tr>`، وننهي مستند HTML بما يلي:

```html
    </td>
  </tr></table>
</body></html>
```

### JS: المتحكّم الرئيسي

يعرّف الملف `main.js` وحدة `500lines` ودالة المتحكّم `Spreadsheet` فيها، كما يتطلّب العنصر `<body>` في `index.html`.

وبصفته جسرًا بين عرض HTML والعامل الخلفيّ، فإنّه يتولّى أربع مهام:

* تعريف أبعاد الأعمدة والصفوف وتسمياتها.
* توفير معالِجات أحداث للتنقّل بلوحة المفاتيح ولبزر إعادة التعيين.
* عند تغيير المستخدم لورقة الحساب، إرسال محتواها الجديد إلى العامل.
* عند وصول النتائج المحسوبة من العامل، تحديث العرض وحفظ الحالة الحالية.

ويبيّن المخطّط الانسيابي في \aosafigref{500l.spreadsheet.flowchart} التفاعل بين المتحكّم والعامل بمزيد من التفصيل:

\aosafigure[240pt]/images/500-lines/spreadsheet-7-00_flowchart.webp{Controller-Worker Flowchart}{500l.spreadsheet.flowchart}

الآن لنمرّ على الشيفرة. في السطر الأوّل، نطلب `$scope` من AngularJS‏:

```javascript
angular.module('500lines', []).controller('Spreadsheet', function ($scope, $timeout) {
```

إنّ `$` في `$scope` جزء من اسم المتغيّر. ونطلب هنا أيضًا دالة الخدمة [`$timeout`](https://docs.angularjs.org/api/ng/service/$timeout) من AngularJS، وسنستخدمها لاحقًا لمنع الصيغ التي تدور إلى ما لا نهاية.

ولوضع `Cols` و`Rows` في النموذج، يكفي تعريفهما كسمات لـ `$scope`‏:

```javascript
  // Begin of $scope properties; start with the column/row labels
  $scope.Cols = [], $scope.Rows = [];
  for (col of range( 'A', 'H' )) { $scope.Cols.push(col); }
  for (row of range( 1, 20 )) { $scope.Rows.push(row); }
```

تجعل صيغة [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) في ES6 من السهل المرور على النطاقات (_ranges_) ذات نقطة بداية ونقطة نهاية، مع تعريف الدالة المساعدة `range` بوصفها [مولِّدًا](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) (generator)‏:


```javascript
  function* range(cur, end) { while (cur <= end) { yield cur;
```

وتعني `function*` أعلاه أنّ `range` تُعيد [مُتكرِّرًا](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol) (iterator)، مع حلقة `while` تُسلِّم عبر [`yield`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield) قيمة واحدة في كلّ مرّة. وحين تطلب حلقة `for` القيمة التالية، تستأنف التنفيذ بعد سطر `yield` مباشرةً:

```
    // If it’s a number, increase it by one; otherwise move to next letter
    cur = (isNaN( cur ) ? String.fromCodePoint( cur.codePointAt()+1 ) : cur+1);
  } }
```

ولتوليد القيمة التالية، نستخدم `isNaN` لمعرفة ما إذا كان المقصود بـ `cur` حرفًا (`NaN` اختصار لعبارة «ليس رقمًا»). فإن كان كذلك، نأخذ [قيمة نقطة الترميز](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) للحرف، ونزيدها بزيادة (_increment_) مقدارًا واحدًا، ثم [نحوّل نقطة الترميز](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) مجدّدًا للحصول على حرفه التالي. وإلّا فإنّنا نزيد الرقم بمقدار واحد فحسب.

وبعد ذلك، نعرّف الدالة `keydown()` التي تتعامل مع التنقّل بلوحة المفاتيح عبر الصفوف:

```javascript
  // UP(38) and DOWN(40)/ENTER(13) move focus to the row above (-1) and below (+1).
  $scope.keydown = ({which}, col, row)=>{ switch (which) {
```

تتلقّى [الدالة السهمية](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions) (arrow function) الوسائط `($event, col, row)` من `<input ng-keydown>`، وتستخدم [الإسناد الهدَّام](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7#Pulling_fields_from_objects_passed_as_function_parameter) (destructuring assignment) لإسناد `$event.which` إلى الوسيط `which`، ثم تفحص ما إذا كان أحد رموز المفاتيح الثلاثة الخاصّة بالتنقّل:

```javascript
    case 38: case 40: case 13: $timeout( ()=>{
```

وإن كان كذلك، نستخدم `$timeout` لجدولة تغيير التركيز بعد معالِج `ng-keydown` و`ng-change` الحالي. ولأنّ `$timeout` يتطلّب دالةً وسيطًا، فإنّ صيغة `()=>{…}` تبني دالةً تمثّل منطق تغيير التركيز، وهي تبدأ بفحص اتجاه الحركة:

```javascript
      const direction = (which === 38) ? -1 : +1;
```

يعني المُصرِّح `const` أنّ `direction` لن يتغيّر أثناء تنفيذ الدالة. واتجاه الحركة إمّا إلى أعلى (`-1`، من **A2** إلى **A1**) إذا كان رمز المفتاح 38‏ (**UP**)، وإمّا إلى أسفل (`+1`، من **A2** إلى **A3**) في غير ذلك.

وبعد ذلك، نسترجع العنصر الهدف باستخدام صيغة محدّد المعرّف (مثل ‏`"#A3"`)، وهي مبنيّة بـ[سلسلة قالب](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) (template string) مكتوبة بين علامتَي backtick، بدمج `#` الأولى مع `col` الحالية مع `row + direction` الهدف:

```javascript
      const cell = document.querySelector( `#${ col }${ row + direction }` );
      if (cell) { cell.focus(); }
    } );
  } };
```

ونضع فحصًا إضافيًّا على نتيجة `querySelector`، لأنّ التحرّك لأعلى من **A1** ينتج المحدّد `#A0`، وهو محدّد لا يطابق أيّ عنصر، ولن يُطلق تغيّر تركيز بالتالي — وينطبق الأمر نفسه على الضغط على **DOWN** في الصف الأخير.

وبعد ذلك، نعرّف الدالة `reset()` ليتمكّن زر إعادة التعيين من استعادة محتوى `sheet`‏:

```javascript
  // Default sheet content, with some data cells and one formula cell.
  $scope.reset = ()=>{ 
    $scope.sheet = { A1: 1874, B1: '+', C1: 2046, D1: '->', E1: '=A1+C1' }; }
```

تحاول الدالة `init()` استعادة محتوى `sheet` من حالته السابقة في [localStorage](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage)، وترجع إلى المحتوى الابتدائي إن كان هذا أوّل تشغيل للتطبيق:

```javascript
  // Define the initializer, and immediately call it
  ($scope.init = ()=>{
    // Restore the previous .sheet; reset to default if it’s the first run
    $scope.sheet = angular.fromJson( localStorage.getItem( '' ) );
    if (!$scope.sheet) { $scope.reset(); }
    $scope.worker = new Worker( 'worker.js' );
  }).call();
```

وهناك عدّة أمور تستحقّ الانتباه في الدالة `init()` أعلاه:

* نستخدم صيغة `($scope.init = ()=>{…}).call()` لتعريف الدالة واستدعائها فورًا.
* ولأنّ localStorage يخزّن السلاسل النصّية وحدها، فإنّنا _نحلّل_ (_parse_) بنية `sheet` من تمثيلها بصيغة [JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON) باستخدام `angular.fromJson()`.
* وفي الخطوة الأخيرة من `init()`، ننشئ خيط [عامل ويب](https://developer.mozilla.org/en-US/docs/Web/API/Worker) جديدًا ونُسنده إلى سمة `worker` في النطاق. فرغم أنّ العامل لا يُستخدم مباشرةً في العرض، فإنّ العُرف هو استخدام `$scope` لمشاركة الكائنات المستخدَمة عبر دوال النموذج، وهنا بين `init()` هنا و`calc()` أدناه.

بينما يحمل `sheet` محتوى الخلايا القابل للتحرير من المستخدم، يحتوي `errs` و`vals` على نتائج الحسابات — الأخطاء والقيم — وهي للقراءة فقط بالنسبة إلى المستخدم:

```javascript
  // Formula cells may produce errors in .errs; normal cell contents are in .vals
  [$scope.errs, $scope.vals] = [ {}, {} ];
```

وبمجرد توفّر هذه السمات، يمكننا تعريف الدالة `calc()` التي تُطلق كلّما أجرى المستخدم تغييرًا على `sheet`‏:

```javascript
  // Define the calculation handler; not calling it yet
  $scope.calc = ()=>{
    const json = angular.toJson( $scope.sheet );
```

هنا نأخذ لقطة (_snapshot_) من حالة `sheet` ونخزّنها في الثابت `json`، وهو سلسلة نصّية بصيغة JSON. ثم نبني `promise` من [$timeout](https://docs.angularjs.org/api/ng/service/$timeout) يُلغي الحساب القادم إن استغرق أكثر من 99 جزءًا من الثانية:

```javascript
    const promise = $timeout( ()=>{
      // If the worker has not returned in 99 milliseconds, terminate it
      $scope.worker.terminate();
      // Back up to the previous state and make a new worker
      $scope.init();
      // Redo the calculation using the last-known state
      $scope.calc();
    }, 99 );
```

ولأنّنا تأكّدنا من أنّ `calc()` لا تُستدعى أكثر من مرّة كل 200 جزء من الثانية بفضل السمة `<input ng-model-options>` في HTML، فإنّ هذا الترتيب يترك 101 جزءًا من الثانية كي تستعيد `init()` قيمة `sheet` إلى آخر حالة سليمة معروفة، وتنشئ عاملًا جديدًا.

ومهمّة العامل هي حساب `errs` و`vals` من محتوى `sheet`. ولأنّ **main.js** و**worker.js** يتواصلان عبر تمرير الرسائل، نحتاج إلى معالِج `onmessage` لاستلام النتائج فور جهوزيّتها:

```javascript
    // When the worker returns, apply its effect on the scope
    $scope.worker.onmessage = ({data})=>{
      $timeout.cancel( promise );
      localStorage.setItem( '', json );
      $timeout( ()=>{ [$scope.errs, $scope.vals] = data; } );
    };
```

وإن استُدعي `onmessage`، فإنّنا نعلم أنّ لقطة `sheet` الموجودة في `json` مستقرّة (أي لا تحوي صيغًا تدور إلى ما لا نهاية)، فنلغي مهلة التسعين جزءًا من الثانية، ونكتب اللقطة في localStorage، ونجدول تحديثًا للواجهة عبر دالة `$timeout` تحدّث `errs` و`vals` في العرض المرئي للمستخدم.

وبمجرد وضع المعالِج في موضعه، يمكننا إرسال حالة `sheet` إلى العامل، فتبدأ عمليّة الحساب في الخلفية:

```javascript
    // Post the current sheet content for the worker to process
    $scope.worker.postMessage( $scope.sheet );
  };

  // Start calculation when worker is ready
  $scope.worker.onmessage = $scope.calc;
  $scope.worker.postMessage( null );
});
```

### JS: العامل الخلفي

هناك ثلاثة أسباب لاستخدام عامل ويب لحساب الصيغ، بدلًا من استخدام خيط JS الرئيسي في هذه المهمّة:

* بينما يعمل العامل في الخلفية، يبقى المستخدم حرًّا في مواصلة التفاعل مع ورقة الحساب دون أن يحجبه حسابٌ في الخيط الرئيسي.
* ولأنّنا نقبل أيّ تعبير JS في الصيغة، يوفّر العامل _بيئة معزولة_ (_sandbox_) تمنع الصيغ من التشويش على الصفحة التي تحتويها، مثلًا بإظهار مربّع حوار `alert()`.
* ويمكن أن تشير الصيغة إلى أيّ إحداثيّات بوصفها متغيّرات. وقد تحتوي الإحداثيّات الأخرى على صيغة أخرى قد تنتهي بمرجع دوري (_cyclic reference_). ولمعالجة هذه المشكلة، نستخدم كائن _النطاق العام_ (_global scope_) للعامل، وهو `self`، ونعرّف هذه المتغيّرات بوصفها _دوال جالب_ (_getter functions_) على `self` لتطبيق منطق منع الدورات (_cycle_).

ومعيّنة هذه الاعتبارات، لننظر إلى شيفرة العامل.

الغرض الوحيد للعامل هو تعريف معالِج `onmessage` فيه. يأخذ المعالِج `sheet`، ويحسب `errs` و`vals`، ثم يعيد إرسالهما إلى خيط JS الرئيسي. ونبدأ بإعادة تهيئة المتغيّرات الثلاثة عند تلقّينا رسالة:

```javascript
let sheet, errs, vals;
self.onmessage = ({data})=>{
  [sheet, errs, vals] = [ data, {}, {} ];
```

ولتحويل الإحداثيّات إلى متغيّرات عامّة، نمرّ أوّلًا على كلّ خاصية في `sheet` باستخدام حلقة `for…in`‏:

```javascript
  for (const coord in sheet) {
```

تقدّم ES6 التصريحين `const` و`let` للإعلان عن ثوابت ومتغيّرات _محصورة بنطاق الكتلة_ (_block scoped_)‏؛ أمّا `const coord` أعلاه فيعني أنّ الدوال المعرَّفة داخل الحلقة تلتقط قيمة `coord` في كلّ دورة.

وفي المقابل، فإنّ `var coord` في إصدارات JS الأقدم يُعلن متغيّرًا _محصورًا بنطاق الدالة_ (_function scoped_)، والدوال المعرَّفة في كلّ دورة من دورات الحلقة تنتهي جميعها إلى الإشارة إلى المتغيّر `coord` نفسه.

واعتادةً، تكون متغيّرات الصيغ غير حسّاسة لحالة الأحرف، وقد تسبقها اختياريًّا علامة `$`. ولأنّ متغيّرات JS حسّاسة لحالة الأحرف، نستخدم `map` للمرور على أسماء المتغيّرات الأربعة الخاصّة بالإحداثيّ نفسه:

```javascript
    // Four variable names pointing to the same coordinate: A1, a1, $A1, $a1
    [ '', '$' ].map( p => [ coord, coord.toLowerCase() ].map(c => {
      const name = p+c;
```

ولاحظ صيغة الدالة السهمية المختصرة أعلاه: `p => ...` هي نفسها `(p) => { ... }`.

ولكلّ اسم متغيّر، مثل `A1` و`$a1`، نعرّف [خاصية وصول](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) (_accessor property_) على `self` تحسب `vals["A1"]` كلّما قيِّمت في تعبير:

```javascript
      // Worker is reused across calculations, so only define each variable once
      if ((Object.getOwnPropertyDescriptor( self, name ) || {}).get) { return; }

      // Define self['A1'], which is the same thing as the global variable A1
      Object.defineProperty( self, name, { get() {
```

وتُعدّ صيغة `{ get() { … } }` أعلاه اختصارًا للصيغة `{ get: ()=>{ … } }`. ولأنّنا نعرّف `get` وحده ولا نعرّف `set`، تصبح المتغيّرات _للقراءة وحدها_ (_read-only_) ولا يمكن تعديلها من صيغ يقدّمها المستخدم.

ويبدأ _جالب_ (_accessor_) `get` بفحص `vals[coord]`، ويعيده ببساطة إن كان محسوبًا بالفعل:

```javascript
        if (coord in vals) { return vals[coord]; }
```

وإن لم يكن، فعلينا حساب `vals[coord]` من `sheet[coord]`.

نضعه أوّلًا على `NaN`، حتى تنتهي المراجع الذاتية مثل تعيين **A1** إلى `=A1` بالقيمة `NaN` بدلًا من حلقة لا نهائية:

```javascript
        vals[coord] = NaN;
```

وبعد ذلك نفحص ما إذا كان `sheet[coord]` رقمًا عبر تحويله إلى صيغة عددية بالسابقة `+`، وإسناد الرقم إلى `x`، ثم مقارنة تمثيله النصّي مع السلسلة الأصلية. فإن اختلفا، ضبطنا `x` على السلسلة الأصلية:

```javascript
        // Turn numeric strings into numbers, so =A1+C1 works when both are numbers
        let x = +sheet[coord];
        if (sheet[coord] !== x.toString()) { x = sheet[coord]; }
```

وإن كان الحرف الأوّل من `x` هو `=`، فإنّها خلية صيغة. نقيّم الجزء التالي لـ `=` عبر `eval.call()`، مستخدمين الوسيط الأوّل `null` لأمر `eval` بأن يعمل في _النطاق العام_ (_global scope_)، مُخفيًا عن التقييم متغيّرات _النطاق المعجمي_ (_lexical scope_) مثل `x` و`sheet`:

```javascript
        // Evaluate formula cells that begin with =
        try { vals[coord] = (('=' === x[0]) ? eval.call( null, x.slice( 1 ) ) : x);
```

وإن نجح التقييم، تُخزَّن النتيجة في `vals[coord]`. أمّا في الخلايا غير الصيغية فتكون قيمة `vals[coord]` هي `x` ببساطة، وقد تكون رقمًا أو سلسلة نصّية.

وإن أسفر `eval` عن خطأ، تفحص كتلة `catch` ما إذا كان سببُه أنّ الصيغة تشير إلى خلية فارغة لم تُعرَّف بعد في `self`‏:

```javascript
        } catch (e) {
          const match = /\$?[A-Za-z]+[1-9][0-9]*\b/.exec( e );
          if (match && !( match[0] in self )) {
```

وفي تلك الحالة، نضبط القيمة الافتراضية للخلية المفقودة على "0"، ونمسح `vals[coord]`، ونعيد تشغيل الحساب الحالي باستخدام `self[coord]`‏:

```javascript
            // The formula refers to a uninitialized cell; set it to 0 and retry
            self[match[0]] = 0;
            delete vals[coord];
            return self[coord];
          }
```

وإن أعطى المستخدم الخلية المفقودة محتوى لاحقًا في `sheet[coord]`، فإنّ القيمة المؤقتة ستُستبدَل بواسطة `Object.defineProperty`.

وتُخزَّن أنواع الأخطاء الأخرى في `errs[coord]`‏:

```javascript
          // Otherwise, stringify the caught exception in the errs object
          errs[coord] = e.toString();
        }
```

وعند حدوث أخطاء، ستبقى قيمة `vals[coord]` هي `NaN`، لأنّ الإسناد لم يكتمل تنفيذه.

وأخيرًا، يعيد جالب `get` القيمة المحسوبة المخزَّنة في `vals[coord]`، ويجب أن تكون رقمًا أو قيمةً منطقية أو سلسلةً نصّية:

```javascript
        // Turn vals[coord] into a string if it's not a number or Boolean
        switch (typeof vals[coord]) { 
            case 'function': case 'object': vals[coord]+=''; 
        }
        return vals[coord];
      } } );
    }));
  }
```

وبمجرد تعريف خصائص الوصول لكلّ الإحداثيّات، يمرّ العامل على الإحداثيّات مرّة أخرى، مستدعيًا كلّ خاصية وصول بـ `self[coord]`، ثم يعيد إرسال `errs` و`vals` الناتجين إلى خيط JS الرئيسي:

```javascript
  // For each coordinate in the sheet, call the property getter defined above
  for (const coord in sheet) { self[coord]; }
  return [ errs, vals ];
}
```

### CSS

يحتوي الملف **styles.css** على بضعة محدّدات (_selectors_) وأنماط عرضها فحسب. أوّلًا، ننسّق الجدول (_style_) لدمج كلّ حدود الخلايا معًا، فلا تبقَ فراغات بين الخلايا المتجاورة:

```css
table { border-collapse: collapse; }
```

وتتشارك خلايا الترويسة وخلايا البيانات نمطَ الحدّ نفسه، لكن يمكن تمييزهما بألوان خلفيتيهما: خلايا الترويسة رماديّة فاتحة، وخلايا البيانات بيضاء افتراضيًّا، أمّا خلايا الصيغ فتحصل على خلفية زرقاء فاتحة:

```
th, td { border: 1px solid #ccc; }
th { background: #ddd; }
td.formula { background: #eef; }
```

والعرض المعروض ثابت لكلّ قيمة محسوبة في الخلية. فتحصل الخلايا الفارغة على ارتفاع أدنى، وتُقتطع الأسطر الطويلة بعلامة ثلاث نقاط في نهايتها:

```css
td div { text-align: right; width: 120px; min-height: 1.2em;
         overflow: hidden; text-overflow: ellipsis; }
```

ويحدّد محاذاة النصّ وزخارفه نوع كلّ قيمة، كما ينعكس ذلك في محدَّدي الأصناف `text` و`error`‏:

```css
div.text { text-align: left; }
div.error { text-align: center; color: #800; font-size: 90%; border: solid 1px #800 }
```

أمّا مربّع `input` القابل للتحرير من المستخدم، فنستخدم فيه _الموضع المطلق_ (_absolute positioning_) لمتراكبه فوق خلبيته، ونجعله شفافًا ليظهر من خلاله `div` الأساسي الذي يحمل قيمة الخلية:

```css
input { position: absolute; border: 0; padding: 0;
        width: 120px; height: 1.3em; font-size: 100%;
        color: transparent; background: transparent; }
```

وحين يضع المستخدم التركيز على مربّع الإدخال، فإنّه ينبثق إلى المقدّمة:

```css
input:focus { color: #111; background: #efe; }
```

وفضلا عن ذلك، يُطوى `div` الأساسي في سطر واحد، فيغطّيه مربّع الإدخال بالكامل:

```css
input:focus + div { white-space: nowrap; }
```

## الخلاصة

ولأنّ هذا الكتاب هو _500 سطرًا أو أقل_، فإنّ ورقة حساب ويب في 99 سطرًا هي مثال مصغّر&mdash;لا تتردّد في التجريب بها وتوسيعها في أيّ اتجاه تشاء.

وهذه بعض الأفكار، وكلّها سهلة المنال في المساحة المتبقّية من 401 سطر:

* محرّر تعاوني على الإنترنت باستخدام [ShareJS](http://sharejs.org/) أو [AngularFire](http://angularfire.com) أو [GoAngular](http://goangular.org/)‏.
* دعم صيغة Markdown لخلايا النصّ، باستخدام [angular-marked](http://ngmodules.org/modules/angular-marked).
* دوال الصيغ الشائعة (`SUM` و`TRIM` وغيرها) من [معيار OpenFormula](https://en.wikipedia.org/wiki/OpenFormula).
* التوافق مع تنسيقات أوراق الحساب الرائجة، مثل CSV وSpreadsheetML عبر [SheetJS](http://sheetjs.com/)‏.
* الاستيراد من خدمات أوراق الحساب على الإنترنت وتصدير إليها، مثل Google Spreadsheet و[EtherCalc](http://ethercalc.net/)‏.

### ملاحظة حول إصدارات JS

يهدف هذا الفصل إلى استعراض مفاهيم جديدة في ES6، لذلك نستخدم [مُصرِّف Traceur](https://github.com/google/traceur-compiler) لترجمة الشيفرة المصدرية إلى ES5 كي تعمل على المتصفّحات ما قبل 2015.

وإن كنت تفضّل العمل مباشرةً مع إصدار JS لعام 2010، فإنّ دليل [as-javascript-1.8.5](https://audreyt.github.io/500lines/spreadsheet/as-javascript-1.8.5/) يحتوي على **main.js** و**worker.js** مكتوبين بأسلوب ES5؛ و[الشيفرة المصدرية](https://github.com/audreyt/500lines/tree/master/spreadsheet/as-javascript-1.8.5) له قابلة للمقارنة سطرًا بسطر مع إصدار ES6، وبعددّ الأسطر نفسه.

ولمن يفضّل صياغةً أنظف، يستخدم دليل [as-livescript-1.3.0](https://audreyt.github.io/500lines/spreadsheet/as-livescript-1.3.0/) لغة [LiveScript](http://livescript.net/) بدلًا من ES6 لكتابة **main.ls** و**worker.ls**؛ وهو [أقصر بـ 20 سطرًا](https://github.com/audreyt/500lines/tree/master/spreadsheet/as-livescript-1.3.0) من نسخة JS.

وبناءً على لغة LiveScript، يستخدم دليل [as-react-livescript](https://audreyt.github.io/500lines/spreadsheet/as-react-livescript/) إطار العمل [ReactJS](https://facebook.github.io/react/)‏؛ [وهو أطول بعشرة أسطر](https://github.com/audreyt/500lines/tree/master/spreadsheet/as-react-livescript) من نظيره بـ AngularJS، لكنّه يعمل بسرعة أكبر بكثير.

وإن كنت مهتمًّا بترجمة هذا المثال إلى لغات JS أخرى، فأرسل [طلب سحب](https://github.com/audreyt/500lines/pulls)&mdash;وسأكون سعيدًا بسماعه منك!
