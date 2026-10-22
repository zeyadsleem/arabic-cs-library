---
title: "اختصارات Emmet"
---

Emmet نظام اختصارات قوي لـ HTML و CSS، مدمج مباشرة في Visual Studio Code. وهو يسرّع سير عملك في الواجهات الأمامية سرعة كبيرة، إذ يتيح لك كتابة اختصارات موجزة تتوسّع إلى وسوم كاملة أو قواعد تنسيق كاملة. وفيما يلي الميزات الأساسية ونصائح لجعل Emmet يخدمك، خصوصًا عند كتابة React بصيغة TSX أو JSX.

## اختصارات Emmet

يحوّل Emmet مقاطع نصية قصيرة إلى بنى HTML كاملة. فمثلًا، إذا كتبت `div>ul>li*3` في ملف HTML وضغطت `Tab`، حصلت على:

```html
<div>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

وإليك نظرة سريعة على أنماط شائعة أخرى:

يتوسّع `header+main+footer` إلى ثلاثة عناصر شقيقة:

```html
<header></header>
<main></main>
<footer></footer>
```

ينشئ `ul>li.item*5` قائمة غير مرتّبة تضم خمسة عناصر قائمة، لكل منها الصنف `item`:

```html
<ul>
  <li class="item"></li>
  <li class="item"></li>
  <li class="item"></li>
  <li class="item"></li>
  <li class="item"></li>
</ul>
```

وينتج `div.container>img.logo[src="logo.png"]+p` عنصر `div` له ابنان: صورة وفقرة:

```html
<div class="container">
  <img class="logo" src="logo.png" />
  <p></p>
</div>
```

> **إذا لم تكن متأكدًا من الاختصار الذي تستخدمه، فاكتب جزءًا من المقتطف واضغط `Ctrl+Space` (أو `Cmd+Space` على macOS) لترى اقتراحات Emmet.**

## Emmet في JSX/TSX

يستطيع Emmet أيضًا أن يرفع إنتاجيتك في ملفات React. ولتضمن عمله بشكل صحيح في ملفات `.jsx` أو `.tsx`، اضبط إعدادات Visual Studio Code ليُعامل Emmet هذه الملفات كملفات HTML. ومن الأساليب الشائعة إضافة الإعداد التالي في `settings.json`:

```json
"emmet.includeLanguages": {
  "javascript": "html",
  "javascriptreact": "html",
  "typescriptreact": "html"
}
```

وبعد إضافة ذلك، يمكنك استخدام الاختصارات نفسها التي تستخدمها في ملف HTML. فمثلًا، في `MyComponent.tsx`:

```typescript
import React from 'react';

export function MyComponent() {
  return (
    <div.wrapper>div.title{Hello, Emmet!}^^p.subtitle{It even works in React!}</div.wrapper>
  );
}
```

وإذا كتبت `div.wrapper>div.title{Hello, Emmet!}^^p.subtitle{It even works in React!}` وضغطت `Tab`، ولّد Emmet ما يلي:

```typescript
import React from 'react';

export function MyComponent() {
  return (
    <div className="wrapper">
      <div className="title">Hello, Emmet!</div>
      <p className="subtitle">It even works in React!</p>
    </div>
  );
}
```

> **Emmet يدرك JSX**
>
> في JSX، يحوّل Emmet تلقائيًا خصائص مثل `class` إلى `className` عند الحاجة. لكن راجع نتائج التوسّع دائمًا، إذ قد تحتاج بعض ميزات خادم اللغة ثانية إضافية لتضمن أن كل شيء مصطفّ بشكل صحيح.

## تقنيات Emmet المتقدّمة

### استخدام التجميع بالأقواس `()`

تتيح لك الأقواس إنشاء بنى متداخلة معقّدة وتطبيق معاملات التكرار على مجموعات من العناصر. وهذا مفيد للغاية في إنشاء بنى مركّبة متكرّرة.

```css
(header>h1)+(main>section*3)+(footer>p)
```

يتوسّع إلى:

```html
<header>
  <h1></h1>
</header>
<main>
  <section></section>
  <section></section>
  <section></section>
</main>
<footer>
  <p></p>
</footer>
```

ويمكنك أيضًا استخدام التجميع لتطبيق خصائص أو محتوى على عناصر متعددة:

```css
(div>h2+p).card*3
```

ينشئ ثلاثة عناصر `div` بالصنف card، لكل منها عنصر `h2` وعنصر `p`:

```html
<div class="card">
  <h2></h2>
  <p></p>
</div>
<div class="card">
  <h2></h2>
  <p></p>
</div>
<div class="card">
  <h2></h2>
  <p></p>
</div>
```

### استخدام مرشّحات Emmet

تعدّل المرشّحات طريقة توسّع اختصارات Emmet، وتُضاف في نهاية الاختصار بالمحرف الأنبوبي (`|`).

#### مرشّح قصّ المسافات البيضاء (`|t`)

يزيل المسافات البيضاء غير المؤثّرة من المخرَج:

```css
ul>li*3|t
```

فيُنتج مخرَجًا أكثر إحكامًا:

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

#### مرشّح التعليقات (`|c`)

يضيف تعليقات تساعد على تمييز وسوم الإغلاق في البنى الكبيرة:

```css
div>header+main+footer|c
```

يتوسّع إلى:

```html
<div>
  <header></header>
  <main></main>
  <footer></footer>
  <!-- /div -->
</div>
```

#### مرشّح BEM (`|bem`)

يسهّل كتابة ترميز Block Element Modifier (BEM):

```css
form.search>input.field|bem
```

فيُنتج:

```html
<form class="search">
  <input class="search__field" />
</form>
```

### الوسوم الضمنية

يملك Emmet نظامًا ذكيًا يستنتج أسماء الوسوم بناءً على علاقات الأب بالابن، وهذا يختصر اختصاراتك أكثر.

فمثلًا، عند إنشاء قائمة يمكنك ترك اسم الوسم `li`:

```css
ul>.item*3
```

يعرف Emmet أن عناصر `ul` تحتوي عادةً على أبناء من نوع `li`، لذا يُنتج:

```html
<ul>
  <li class="item"></li>
  <li class="item"></li>
  <li class="item"></li>
</ul>
```

ومن الوسوم الضمنية الشائعة:

- `li` داخل `ul` و `ol`
- `tr` داخل `table`
- `td` داخل `tr`
- `option` داخل `select`

### توليد نص Lorem Ipsum

يتضمّن Emmet مولّدًا قويًا لنص lorem ipsum لإضافة نص بديل سريعًا:

```css
p>lorem
```

فينشئ فقرة بنص lorem ipsum القياسي:

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae
  natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti
  eos cupiditate dolore doloribus!
</p>
```

ويمكنك تحديد عدد الكلمات:

```css
p>lorem10
```

فيولّد عشر كلمات بالضبط:

```html
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, laboriosam.</p>
```

واجمع ذلك مع معاملات التكرار للحصول على فقرات متعددة:

```css
article>(h2>lorem5)+p*3>lorem20
```

فينشئ مقالًا بعنوان وثلاث فقرات:

```html
<article>
  <h2>Lorem ipsum dolor sit amet.</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi fugiat veritatis culpa quos
    aspernatur! Laboriosam alias iure fuga possimus officiis.
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci labore repellat, asperiores
    quas quae maxime doloremque aliquam? Eius, illo excepturi.
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sapiente distinctio illum
    perspiciatis, pariatur at libero. Placeat laboriosam asperiores esse.
  </p>
</article>
```

### مثال شبه واقعي وشبه معقّد

إليك بطاقة مقال كاملة بمحتوى منظّم:

```css
article.card>(header.card__header>h2.card__title{Post Title $}+p.card__meta>time+span.card__author{Author Name})+(div.card__content>p*2>lorem)+footer.card__footer>a.btn.btn--primary{Read More}
```

ينتج هذا الاختصار الواحد بطاقة مقال كاملة البنية بأصناف مناسبة ونص صوري وأزرار منسّقة، وهو ما يبيّن القوة الحقيقية لـ Emmet في تطوير الواجهات الأمامية بسرعة.

## اللفّ باختصار (Wrap with Abbreviation)

لا يقتصر Emmet على توليد وسوم جديدة، بل يستطيع أيضًا لفّ الشيفرة الموجودة داخل بنية جديدة. حدّد الشيفرة التي تريد لفّها، ثم نفّذ أمر **Wrap with Abbreviation** من لوحة الأوامر. اكتب اختصارك (مثل `section>div.wrapper`) واضغط `Tab`، فيحيط Emmet تحديدك بالوسوم الجديدة، موفّرًا عليك عناء التحرير اليدوي.

> **استخدم هذه الميزة لإعادة هيكلة كتل الشيفرة سريعًا، بإضافة أغلفة دلالية أو تطبيق تنسيق متّسق دون مقاطعة سيرك.**

## مقتطفات Emmet المخصّصة

للأنماط المتكرّرة أو الوسوم الخاصة بمشروعك، يمكنك تعريف مقتطفات Emmet مخصّصة. خصّصها بإضافة مُدخل `emmet.extensionsPath` في إعداداتك ليشير إلى مجلد يحتوي مقتطفاتك. فمثلًا، أنشئ ملفًا باسم `snippets.json` في مجلدك المخصّص بمحتوى مثل:

```json
{
  "html": {
    "snippets": {
      "btn": "<button class=\"btn\">$0</button>"
    }
  }
}
```

ثم اضبط المسار في `settings.json`:

```json
{
  "emmet.extensionsPath": "path/to/your/snippets"
}
```

وبهذه الطريقة، سؤدي كتابة `btn` والضغط على `Tab` إلى إدراج قالب الزر المخصّص بسرعة.

> **قد تُحدث المقتطفات المخصّصة فرقًا كبيرًا عند العمل على مشاريع بعناصر واجهة متكرّرة. فصّمها على مقاس شيفرتك لتوفّر الوقت وتقلّل الأخطاء.**

ترتقي هذه التقنيات والإعدادات الإضافية بـ Emmet من أداة اختصارات بسيطة إلى مساعد قابل للتخصيص بالكامل يتلاءم مع احتياجاتك التطويرية الخاصة.

والآن، لنلقِ نظرة على [بعض التمارين](https://stevekinney.com/courses/visual-studio-code/vscode-emmet-exercises).
