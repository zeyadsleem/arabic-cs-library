# دليل ترجمة Hello Algo إلى العربية

## القواعد الذهبية

1. **ترجم كل نص ظاهر**: العناوين، الفقرات، القوائم، الجداول، نص الروابط،
   النصوص البديلة (alt)، ومحتويات `<div class="note">`.
2. **لا تغيّر**: وسوم HTML وخصائصها (`div`, `class`, `href`, `src`, `u`،
   `mark`, `sup`, `sub`)، والشيفرة داخل ` ``` ` (تُترجم تعليقاتها فقط)، وأسماء
   المتغيرات والدوال والأنواع، وروابط URL، وصيغة Markdown.
3. **أبقِ لاتينياً**: Go, TypeScript, array, slice, map, heap, tree, graph,
   hash, BFS, DFS, DP, O(n), Redis, Python, Java, C++, Swift, Rust, Ruby,
   Node.js.
4. **المصطلحات المعتمدة**:
   - array = مصفوفة | linked list = قائمة مترابطة | list = قائمة
   - stack = مكدس | queue = طابور | deque = طابور مزدوج
   - hash table = جدول تجزئة | hash collision = تصادم التجزئة
   - tree = شجرة | binary tree = شجرة ثنائية | heap = كومة
   - graph = رسم بياني | vertex/node = رأس/عقدة | edge = ضلع/حافة
   - traversal = اجتياز | recursion = تعاود | iteration = تكرار
   - time complexity = تعقيد زمني | space complexity = تعقيد مكاني
   - sorting = ترتيب | searching = بحث | greedy = جشع
   - dynamic programming = برمجة ديناميكية | backtracking = تتبّع رجعي
   - divide and conquer = تقسيم وتغلب | algorithm = خوارزمية
   - data structure = بنية بيانات | index = فهرس | value = قيمة
   - capacity = سعة | element = عنصر | operation = عملية
5. عند أول ذكر لمصطلح مهم ضع الأصل بين قوسين: «القوائم المترابطة (linked
   lists)». لا تُكثر.
6. لا إيموجي ولا إضافات أو حذف. أسلوب عربي فصيح بضمير المخاطب.
7. في الواجهة الأمامية: ترجم `title` فقط، وغيّر `lang: en` إلى `lang: ar`،
   واترك `book` و`chapter` و`slug` و`order`.

## مسارات الملفات

- المصدر: `content-src/hello-algo/<name>.md`
- المخرج: `content/hello-algo/<name>.md`

## أمثلة الشيفرة (Python فقط)

أمثلة الشيفرة في الكورس بلغة Python حصراً:

- المصدر الإنجليزي `content-src/` لا يحوي إلا لتبويبات Python
  (`<div class="lang-tab"><p class="lang-tab__label">Python</p>…`).
  لطخات Go وTypeScript أزيلت نهائياً (بقيت مجلدات الشيفرة القديمة في
  `sources/hello-algo/codes/` دون استخدام).
- يقوم `scripts/import-hello-algo.mjs` بعد توليد المصدر الإنجليزي بخطوة
  `updateArabicContent()` تزامن مجاميع التبويبات في الملفات العربية مع
  المصدر (استبدال Go/TS بمقابلات Python وإدراج ما ينقص قبل أقرب صورة
  أو عنوان مطابق). ما تخلّف عن المزامنة الآلية يُصلَّح يدوياً ثم يُعاد
  بناء المثال نفسه.
- تعليقات شيفرة Python تبقى بالإنجليزية كما هي.

## الملفات الكبيرة

إذا تجاوز الملف نحو 3500 كلمة، اكتب الترجمة على مرحلتين (write ثم ملف مؤقت
وادمجه بـ `cat`). لا تختصر أي فقرة.
