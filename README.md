# المكتبة العربية لعلوم الحاسوب

الموقع المنشور: <https://zeyadsleem.github.io/arabic-cs-library/>

مشروع ترجمة عربية غير رسمي وغير تجاري لمصادر علوم الحاسوب المفتوحة، مبني
باستخدام **SvelteKit** مع دعم كامل للعربية واتجاه RTL.

## حالة الكتب

## حالة الكتب (34 مصدراً)

### متاح بالعربية داخل المكتبة
| الكتاب | الحالة |
| --- | --- |
| مرحباً بالخوارزميات (Hello Algo) — Go + TypeScript | ✅ مترجم بالكامل (117 قسماً) |
| الفصل المفقود في تعليم علوم الحاسوب (Missing Semester) | ✅ 13 محاضرة مع الفيديو |
| Go بالأمثلة (Go by Example) | ✅ 84 مثالاً — موقع مستقل |
| تعلّم Go مع الاختبارات (Learn Go with Tests) | ✅ كامل — موقع مستقل |
| Go 101 | ✅ 136 مقالاً — موقع مستقل |
| Eloquent JavaScript (الطبعة الرابعة) | ✅ 22 فصلاً — موقع مستقل |
| Full Stack open | ✅ 68 فصلاً — موقع مستقل |

### جاهز للترجمة (الترخيص يسمح)
| الكتاب | الترخيص | المصدر |
| --- | --- | --- |
| SICP | CC BY-SA 4.0 | HTML ثابت (38 صفحة) |
| الرياضيات المتقطعة (Levin) | CC BY-NC-SA 4.0 | PreTeXt/LaTeX + 306 SVG |
| رياضيات لعلوم الحاسوب (MCS) | CC BY-SA 3.0 | PDF (1048 صفحة) |
| بنى البيانات المفتوحة | CC BY 2.5 CA | LaTeX |
| Nand2Tetris (الجزءان) | CC BY-NC-SA 3.0 | صفحات المشاريع + PDF |
| xv6 | MIT | HTML + شيفرة C |
| تصميم قواعد البيانات | CC BY 4.0 | Pressbooks XHTML/EPUB |
| أداء قواعد البيانات على نطاق واسع | CC BY 4.0 | PDF (Springer OA) |
| تعلّم البرمجة بلغة OCaml | CC BY-SA 4.0 | PDF/EPUB |
| دليل لغة OCaml | CC BY-SA 4.0 | HTML |
| 500 سطر أو أقل | CC BY 3.0 | Markdown على GitHub |
| معمارية تطبيقات المصادر المفتوحة | CC BY 3.0 | LaTeX |
| تشفير 101 | CC BY-NC 4.0 | Markdown على GitHub |
| كرّاس التشفير المفتوح | CC BY-SA 4.0 | LaTeX |
| شبكات الحاسوب: مقاربة الأنظمة | CC BY 4.0 | RST — يتطلب موافقة المؤلفين |

### مراجع للقراءة فقط (الترخيص يمنع الترجمة)
CS3110 (OCaml) · مقدمة في علوم الحاسوب النظرية · الغوص في الأنظمة · صناعة
المفسّرات · أنماط برمجة الألعاب · أنظمة التشغيل OSTEP · أسس قواعد البيانات ·
داخل PostgreSQL · استخدم الفهرس يا لوقا · أمن الشبكات · تحديات كريبتوبالز.

> كل كتاب يحتفظ بترخيصه الأصلي وإسناده الكامل. الكتب التي تمنع الترجمة
> (CC BY-NC-ND أو بلا ترخيص) تُعرض كمصادر قراءة مع بديل قابل للترجمة عند
> وجوده. تفاصيل التراخيص موثّقة في `content/library.json`، وخارطة التعلّم في
> `content/learning-path.json`.

## خارطة التعلّم

13 مرحلة مرتّبة من التأسيس إلى الأمن، داخلها 34 مصدراً مع متطلبات سابقة معلنة.
الصفحة `/path` تعرض الترتيب، والصفحة `pnpm dev` لمعاينة الموقع محلياً.

## المتطلبات

- Node.js 20 أو أحدث
- pnpm

## الأوامر

```bash
pnpm install     # تثبيت الاعتماديات
pnpm dev         # تشغيل بيئة التطوير
pnpm build       # توليد المحتوى ثم بناء الموقع في build/
pnpm preview     # معاينة نسخة الإنتاج
pnpm deploy      # البناء ثم النشر على فرع gh-pages
```

## بنية المشروع

```
content/
  library.json                  بيانات كل الكتب (عناوين، أوصاف، تراخيص، حالة، مرحلة، متطلبات)
  learning-path.json            المراحل وترتيب الكتب داخل كل مرحلة
  <book>-structure.json         فهرس كل كتاب مُترجم (فصول وأقسام)
  <book>/                       المحتوى العربي المترجم
content-src/<book>/             النص الإنجليزي الأصلي
scripts/
  import-hello-algo.mjs         استيراد Hello Algo وتحويله (مع شيفرة Go/TS)
  import-missing-semester.mjs   استيراد ترجمة Missing Semester العربية مع الفيديو
  build-content.mjs             توليد الفهرس والبحث وصفحات المحتوى لكل الكتب
src/                            تطبيق SvelteKit
static/images/                  صور الكتب
TRANSLATION.md                  دليل الترجمة والمصطلحات
docs/ROADMAP.md                 خطة التنفيذ الكاملة ومصادر كل كتاب وحالة كل مرحلة
```

## الترخيص والإسناد

- **Hello Algo** للمؤلف krahets: <https://www.hello-algo.com/en/>، مرخّص
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
- **Missing Semester** لجامعة MIT، مرخّص
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)؛ الترجمة
  العربية في <https://github.com/zeyadsleem/missing.cs-ar>.
- ترجمات **Go by Example** و**Learn Go with Tests** و**Go 101** و**Eloquent
  JavaScript** و**Full Stack open** من إنتاج zeyadsleem، تحت تراخيص أصولها
  (CC BY 3.0 / MIT / CC BY 4.0 / CC BY-NC 3.0 / CC BY-NC-SA 3.0).
- بقية الكتب مذكورة بتراخيصها الأصلية في `content/library.json` وفي صفحاتها.
- هذه الترجمات غير رسمية وغير تجارية، وجميع الحقوق الفكرية لمؤلفيها الأصليين.
