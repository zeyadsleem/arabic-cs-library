# دليل التصميم — المكتبة العربية لعلوم الحاسوب

يوثّق هذا الملف العالم البصري المبني فعلاً في `src/app.css` و`src/lib/library.css` وصفحات `src/routes`، لا تصميماً مقترحاً.

## 1. العالم والأطروحة

«المطبعة التقنية العربية» على مرجع مطبعة بولاق: حبر أسود، وحمرة عناوين (rubrication)، وورق دافئ، وعناوين كوفية هندسية (Reem Kufi).

الوعد: أن يبدأ الزائر القراءة في ثوانٍ، ويعرف أين هو في الكتاب، ويعود إلى موضعه لاحقاً؛ والأرقام المعروضة حقيقية من `content/library.json`.

العملي يغلب الرمزي: عُرضت الكتب في نسخة سابقة ككعوب رأسية على أرفف، ثم رُفض العرض لأنه أبطأ المسح وأصعب على الهاتف. الكتالوج الآن شبكة بطاقات `.book-card` أو صفوف `.book-list-row`، ولم يبقَ من الرف إلا نقطة قماش صغيرة بلون مرحلة الكتاب تسبق الاسم الإنجليزي أو العنوان (`.book-card__en::before` و`.book-list-row__title::before` و`.stage-book__title::before`).

المرفوض صراحةً: شبكة «أيقونة+عنوان+وصف» المتشابهة، وشعارات الإيموجي، والمظهر «الكريمي+السيريف» النمطي للمكتبات، وواجهة IDE الداكنة، والحسابات والدفع والتتبّع.

## 2. الرموز

### الخطوط

| الرمز | القيمة | الدور |
| --- | --- | --- |
| `--display` | `'Reem Kufi', 'Noto Kufi Arabic', system-ui, sans-serif` | العناوين (h1–h4) وواجهة المطبعة: اسم الموقع، أسماء الأزرار، عناوين البطاقات، أرقام المراحل |
| `--ui` | `'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif` | واجهة الصفحات: التنقّل، الشرائح، حقول البحث، صناديق التمارين |
| `--reading` | `'Noto Naskh Arabic', 'Amiri', Georgia, serif` | متن القراءة وحده (`.reader-content`) |
| `--body` | `var(--ui)` | اسم مستعار لواجهة الصفحة الافتراضية |
| `--mono` | `'IBM Plex Mono', ui-monospace, monospace` | الشيفرة والأرقام والبيانات الوصفية والإحالات |

`app.html` يحمّل من Google Fonts: Reem Kufi بأوزان 500/600، وIBM Plex Sans Arabic بـ400/500/600، وNoto Naskh Arabic بـ400/600، وIBM Plex Mono بـ400/500.

### الألوان

| الرمز | الفاتح | الداكن | الدور |
| --- | --- | --- | --- |
| `--ink` | `#171a1f` | `#ece5d6` | الحبر: النص الأساسي والخطوط القوية |
| `--ink-soft` | `#4c525c` | `#aca79c` | نص ثانوي: المقدمات والوصوف |
| `--ink-faint` | `#5f646d` | `#8a887f` | أرقام وفواصل وبيانات خافتة |
| `--paper` | `#f5efe3` | `#131519` | الورق: خلفية الصفحة |
| `--paper-deep` | `#ece2d0` | `#1a1d22` | ورق غائر: صفوف التمرير والتذييل والملاحظات |
| `--surface` | `#fdfbf6` | `#181b20` | سطح البطاقات والشرائح وحقول البحث |
| `--rule` | `#d8cbb4` | `#2c3037` | قاعدة خطية فاصلة 1px |
| `--rule-strong` | `#b9a98d` | `#454b54` | قاعدة قوية للحدود البارزة |
| `--rubric` | `#a6201e` | `#dd6a5e` | حمرة العناوين: الروابط والعناصر النشطة والعدادات |
| `--rubric-wash` | `#f4e2dd` | `#2a1c1b` | غسل أحمر: خلفية «محظور» والعنصر النشط |
| `--jade` | `#14524a` | `#6cb2a3` | أخضر جادي: حالة «مكتمل» وحدود «تابع القراءة» |
| `--jade-wash` | `#dde9e4` | `#17231f` | غسل جادي: خلفية «مترجم» وبطاقة المتابعة |
| `--code-bg` | `#191c22` | `#0d0f13` | خلفية كتل الشيفرة |
| `--code-text` | `#eae3d5` | `#ece5d6` | نص كتل الشيفرة |

### الحواف والظلال والعروض

| الرمز | الفاتح | الداكن | الدور |
| --- | --- | --- | --- |
| `--radius-sheet` | `14px` | نفسه | الأسطح الكبيرة: البطاقات والملاحظات وأصناف الجانب والصناديق |
| `--radius-control` | `8px` | نفسه | الأزرار وحقول التحكم وصفوف التنقّل |
| `--shadow-lift` | `0 10px 24px -14px rgba(23, 26, 31, 0.45)` | `0 12px 26px -16px rgba(0, 0, 0, 0.9)` | رفع البطاقة والغلاف عند المرور والقوائم المنسدلة |
| `--content-width` | `78rem` | نفسه | عرض حاوية المحتوى |
| `--reading-width` | `44rem` | نفسه | عرض عمود القراءة ومتنه |

أنصاف أقطار ثابتة خارج الرموز: `4px` للشيفرة السطرية والشارات، و`999px` للشرائح وأدوات القارئ، و`10px` لكتل `pre` وبطاقات التمارين، و`6px 12px 12px 6px` لغلاف الكتاب، و`2px` لنقاط المراحل وحدود التركيز.

### قواعد التيبوغرافيا

- لا `letter-spacing` في المشروع كله: تباعد الحروف يفكّ اتصال الحرف العربي، ولا وجود له في `app.css` أو `library.css`.
- أدوار الخطوط: `--display` للعناوين وواجهة المطبعة، و`--ui` لواجهة الصفحات، و`--reading` لمتن القارئ، و`--mono` للشيفرة والأرقام والبيانات الوصفية.
- الشيفرة تبقى LTR داخل النص العربي: `direction: ltr; unicode-bidi: embed` على `code, kbd, samp`، و`pre` بـ`direction: ltr; text-align: left`. وكذلك الأرقام والبيانات اللاتينية في `.book-card__en` و`.book-head__meta` و`.book-cover__pages` و`.toc-chapter__count` و`.toc-sections__num` وعدّاد التمارين.
- مقاسات: متن الصفحة `1rem` بارتفاع سطر `1.75`؛ `h1` حتى `2.9rem`؛ `h2` حتى `1.85rem`؛ `h3` `1.25rem`؛ متن القراءة `1.16rem` بارتفاع `2`؛ شيفرة سطرية `0.86em`؛ `pre` `0.88rem/1.75`.
- `text-wrap: balance` للعناوين و`pretty` للفقرات، و`tabular-nums` للجداول والإحصاءات.

## 3. المفردات

- **رأس المطبعة وتذييلها**: `.press-header` لاصق بشريط `.press-header__rule` ارتفاعه 3px، وفيه `.press-header__inner` و`.press-mark`/`.press-mark__name`/`.press-mark__desk`، ونموذج `.header-search` ينقل إلى `/search?q=`، و`.press-nav` مع الحالة `.active`، وزر تبديل السمة؛ ويتحول إلى `.press-menu-toggle` و`.press-nav--open` تحت 48rem. والتذييل `.press-footer`/`.press-footer__inner`/`.press-footer__links` على `--paper-deep`.
- **الافتتاحية**: `.intro`/`.intro__title`/`.intro__lead` بعرض `62ch`، و`.intro__stats` من `.stat` بعنوان `b` وشرح `span`؛ تُستعمل في الرئيسية وخارطة التعلّم.
- **تابع القراءة**: `.continue-card` على `--jade-wash` بحدّ جادي شفاف، و`.continue-card__label` بالأخضر الجادي، وتُعرض في الرئيسية عند وجود موضع محفوظ.
- **الكتالوج وشريطه**: `.catalogue` يحوي `.catalogue__bar` الذي يضم `.chip` و`.chip--on` (الكل/مترجم/قيد الترجمة) و`.catalogue__sort` (ترتيب خارطة التعلّم/الأكثر صفحات/أبجدياً) و`.catalogue__count` وزر تبديل الشبكة/القائمة.
- **شبكة البطاقات**: `.book-grid` شبكة `auto-fill` بحد أدنى `19rem`، والبطاقة `.book-card` على `--surface` بحد `--rule` وحواف `--radius-sheet`؛ داخلها `.book-card__en` أحادي LTR بنقطة قماش المرحلة في `::before`، و`.book-card__title` بالخط العرضي، و`.book-card__author`، و`.book-card__description` (3 أسطر كحد أقصى)، و`.book-card__foot` (صفحات + شارة + `.book-card__cta` بالأحمر).
- **صف القائمة**: `.book-row-list` و`.book-list-row` بشبكة `2.4fr 1.6fr auto auto`، و`.book-list-row__title` بنقطة قماش المرحلة، و`.book-list-row__author`، و`.book-list-row__meta` بالأرقام الجدولية.
- **الشارات**: `.badge` بأربع حالات: `.badge--done` جادي، و`.badge--planned` على `--paper-deep`، و`.badge--blocked` أحمر، و`.badge--reference` شفاف بحد `--rule`.
- **فرخ الكتاب**: `.book-head`/`.book-head__layout` (متن + غلاف)، و`.book-cover` بنسبة `3/4` بلون `--book-cloth` وتظليل كعب، و`.book-cover__title`/`__pages` أحادي LTR، و`.book-head__meta` أحادي LTR، و`.book-head__title`/`.book-head__author`/`.book-head__lead`، و`.book-facts` مع `.book-fact__label`/`.book-fact__value`، و`.book-actions`، و`.sheet-note` على `--paper-deep`.
- **فهرس الكتاب**: `.book-body` بشبكة متن + عمود جانبي `18rem`، و`.toc-list`/`.toc-chapter`/`.toc-chapter__head`/`.toc-chapter__title`/`.toc-chapter__count` أحادي LTR، و`.toc-sections`/`.toc-sections__num`، و`.aside-card` لبطاقات الجانب (المرحلة نفسها، المسار، الإسناد).
- **شريط القارئ والتقدم**: `.reader-bar` لاصق تحت الرأس، وفيه `.reader-bar__inner` و`.reader-bar__book` بالأحمر، و`.reader-bar__chapter`، و`.reader-bar__spacer`، وعدّاد الفصول، و`.reader-tool` و`.reader-tool--on` للحفظ؛ و`.reader-progress` شريط `2px` بالأحمر يتمدد من اليمين بـ`transform: scaleX(var(--progress))`.
- **تخطيط القارئ**: `.reader-layout` بشبكة `18rem + minmax(0, 1fr)`، و`.reader-aside` لاصق يمرّر داخلياً مع `.reader-aside__title` و`.active` و`.active-chapter` بالأحمر، و`.reader-sheet`، و`.reader-tools`، و`.reader-content` بخط القراءة، و`.toc-inline` حين تكون عناوين القسم بين 3 و12، و`.prev-next`/`.prev-next__label`/`.prev-next__title`.
- **مراحل المسار**: `.path` يحوي `.stage` بحد علوي حبري `2px` وشبكة `2.6rem + minmax(0, 1fr)`، و`.stage__num` بالأحمر، و`.stage__title`/`.stage__description`، و`.stage__books` بقائمة `.stage-book` على `--surface` مع `.stage-book__title` بنقطة قماش، و`.stage-book__en` أحادي LTR، و`.stage-book__description`/`.stage-book__facts`/`.stage-book__badges`/`.stage-book__action`.
- **البحث**: `.search-hero`، و`.search-field` بحد `--rule` وحالة `:focus-within` بالأحمر، و`.search-count`، و`.search-results` مع `.search-result`/`.search-result__book`/`.search-result__title`/`.search-result__snippet`؛ البحث يبدأ من حرفين، ويطبّع التشكيل العربي، ويعرض 30 نتيجة كحد أقصى.
- **بطاقات الكولوفون**: `.colophon-grid` شبكة `auto-fit` بحد أدنى `17rem`، و`.colophon-card` على `--surface`، وتُعرض في «عن المكتبة».
- **صندوق التمارين والفيديو**: `.exercises` صندوق على `--surface` بترقيم دائري أحمر عبر CSS counters ومهام فرعية بشرطة، و`.lecture-video` إطار `16:9` بأقصى `--reading-width`.
- **الأزرار والأيقونات**: `.button` حبر ممتلئ بحواف `--radius-control` يتحول للأحمر ويرتفع `1px` عند المرور، و`.button--quiet` شفاف بحد `--rule-strong`؛ و`.icon` SVG بسماكة `1.6` و`currentColor` وحجم `1.05rem` و`fill: none` و`aria-hidden`.
- **عناصر المتن والأدوات**: روابط بالأحمر بخط سفلي خفيف يقوى عند المرور، و`blockquote` بحد جانبي أحمر، وجداول بحد سفلي `2px` على `--rule-strong`، و`.container` و`.page`/`.page__lead` و`.skip-link` و`.visually-hidden`.
- ملاحظة: الأصناف `.press-sheet`/`.press-sheet__title`/`.press-sheet__lead` و`.press-actions` تظهر في `about/+page.svelte` و`+error.svelte` بلا قواعد مقابلة في `library.css`، فترث تنسيقات العناصر العامة فقط.

## 4. التخطيط

- الحاوية `.container`: عرض أقصى `78rem` وحشوة أفقية `clamp(1rem, 4vw, 2.5rem)`. عمود القراءة وما يتبعه (`.reader-content`، `.toc-inline`، `.prev-next`، `.lecture-video`) محدود بـ`--reading-width` أي `44rem`.
- الشبكات: البطاقات `auto-fill minmax(19rem, 1fr)`؛ صف القائمة `2.4fr 1.6fr auto auto`؛ رأس الكتاب `8.5rem + 1fr`؛ الوقائع `auto-fit minmax(9rem, 1fr)`؛ جسم الكتاب `1fr + 18rem`؛ فهرس الكتاب `auto-fill minmax(17rem, 1fr)`؛ القارئ `18rem + 1fr` بفجوة `2.6rem`؛ السابق/التالي `auto-fit minmax(14rem, 1fr)`؛ المرحلة `2.6rem + 1fr`؛ الكولوفون `auto-fit minmax(17rem, 1fr)`؛ التذييل `2fr + 1fr`.
- الإيقاع: هوامش العناوين `2.4rem 0 1rem`، وأقسام الصفحات بين `1.4rem` و`4rem`، وفواصل `1px` بلون `--rule`، والفجوات الصغيرة بين `0.1rem` و`1.2rem`.
- عند `64rem`: ينهار القارئ إلى عمود واحد ويصبح `.reader-aside` ثابتاً أعلى الصفحة بحد سفلي، وينهار `.book-body` إلى عمود، ويضيق غلاف الكتاب إلى `6.5rem`، ويصبح تذييل المطبعة عموداً واحداً.
- عند `48rem`: يظهر `.press-menu-toggle` ويختفي `.press-nav` و`.header-search`، وتُفتح القائمة المطلقة `.press-nav--open` بظل `--shadow-lift`؛ ويتحول رأس الكتاب إلى عمود بغلاف أقصاه `9rem`، وصف القائمة إلى عمودين بإخفاء المؤلف والبيانات، والمرحلة و`.stage-book` إلى عمود واحد.

## 5. الوصول وأسطح المتصفّح

التباين محسوب من الرموز وفق WCAG (فاتح/داكن):

| الزوج | النسبة |
| --- | --- |
| `--ink` على `--paper` | `15.23:1` / `14.57:1` |
| `--ink-soft` على `--paper` | `6.87:1` / `7.63:1` |
| `--ink-faint` على `--paper` | `5.19:1` / `5.14:1` |
| `--ink-faint` على `--surface` | `5.75:1` / `4.86:1` |
| `--rubric` على `--paper` | `6.44:1` / `5.48:1` |
| `--rubric` على `--surface` | `7.13:1` / `5.18:1` |
| `--jade` على `--paper` | `7.85:1` / `7.43:1` |
| `--rubric` على `--rubric-wash` | `5.89:1` / `4.92:1` |
| `--jade` على `--jade-wash` | `7.21:1` / `6.58:1` |
| `--paper` على `--rubric` (التحديد وعدادات التمارين) | `6.44:1` / `5.48:1` |
| `--code-text` على `--code-bg` | `13.37:1` / `15.29:1` |

كل الأزواج النصية المذكورة تتجاوز `4.5:1`، وأدنى نسبة فيها `--ink-faint` على `--surface` في الداكن (`4.86:1`).

- حلقة التركيز `:focus-visible`: حد `2px` بلون `--rubric` وإزاحة `3px` وحواف دائرية `2px`. حقول البحث `.header-search` و`.search-field` تخفي حدّ الإدخال الداخلي وتُظهر حالة `:focus-within` بحد أحمر.
- أسطح المتصفّح: التحديد `--rubric` على `--paper`، ومؤشر الكتابة `caret-color: var(--rubric)`، وأشرطة التمرير `scrollbar-color: var(--rule-strong) var(--paper)` بعرض `thin`، و`pre` بشريط رفيع.
- `prefers-reduced-motion`: `scroll-behavior: auto`، وتقصير كل الحركات والانتقالات إلى `0.001ms` مع تكرار واحد.
- رابط التخطي `.skip-link` يقفز إلى `#main` ويظهر عند التركيز، وأداة `.visually-hidden` للمحتوى النصي غير المرئي. الصفحة `lang="ar" dir="rtl"`، والأيقونات `aria-hidden`، والتنقّل والقوائم وحقول البحث موسومة بـ`aria-label` أو `role="search"`.
- الوضع الداكن يُقرأ قبل الرسم: سكربت في `app.html` يقرأ `localStorage.theme` ويضبط `data-theme="dark"` على `<html>`، فتتفادى الصفحة وميض السمة.

## 6. الحالة المحفوظة

- **السمة**: مفتاح `theme` في localStorage (القيم `light`/`dark`، والافتراضي فاتح). يكتبه زر التبديل في رأس المطبعة الظاهر في كل الصفحات، ويُطبَّق قبل الرسم عبر `app.html`.
- **آخر موضع قراءة**: مفتاح `arabic-cs-library:last-read` عبر `src/lib/reading.js`، يُحفظ من صفحة القارئ عند فتح القسم بصيغة `{ book, title, chapter, slug, path, at }`. تعرضه الرئيسية في `.continue-card`، وصفحة الكتاب في زر «تابع من حيث توقّفت».
- **العلامات المرجعية**: مفتاح `arabic-cs-library:bookmarks`، مصفوفة مفاتيح `book:chapter:slug`، تُقرأ وتُبدَّل في صفحة القارئ وحدها، وتظهر حالته في `.reader-tool--on`.
