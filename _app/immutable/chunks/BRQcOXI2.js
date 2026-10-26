const t="kinney",n="visual-studio-code",d="Visual Studio Code",r="vscode-keyboard-shortcuts",o="بعض اختصارات لوحة المفاتيح",s=[{depth:2,id:"التنقل-والبحث-العام",text:"التنقّل والبحث العام"},{depth:2,id:"أساسيات-التحرير",text:"أساسيات التحرير"},{depth:2,id:"الذكاء-البرمجي",text:"الذكاء البرمجي"},{depth:2,id:"التخطيط-والتنسيق",text:"التخطيط والتنسيق"}],g=`<h2 id="التنقل-والبحث-العام">التنقّل والبحث العام</h2>
<table>
<thead>
<tr>
<th>الإجراء</th>
<th>اختصار macOS</th>
<th>اختصار Windows</th>
<th>الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>لوحة الأوامر</strong></td>
<td><strong>Cmd + Shift + P</strong></td>
<td><strong>Ctrl + Shift + P</strong></td>
<td>الوصول إلى جميع الأوامر والإعدادات وغيرها.</td>
</tr>
<tr>
<td><strong>الانتقال إلى ملف</strong></td>
<td><strong>Cmd + P</strong></td>
<td><strong>Ctrl + P</strong></td>
<td>البحث التقريبي عن الملفات وفتحها.</td>
</tr>
<tr>
<td><strong>البحث في الملفات</strong></td>
<td><strong>Cmd + Shift + F</strong></td>
<td><strong>Ctrl + Shift + F</strong></td>
<td>بحث شامل في جميع الملفات والمجلدات.</td>
</tr>
<tr>
<td><strong>إظهار/إخفاء الطرفية</strong></td>
<td><strong>Ctrl + \`</strong></td>
<td><strong>Ctrl + \`</strong></td>
<td>إظهار الطرفية المدمجة أو إخفاؤها. (العلامة الخلفية \` هي المفتاح فوق Tab.)</td>
</tr>
<tr>
<td><strong>إظهار/إخفاء الشريط الجانبي</strong></td>
<td><strong>Cmd + B</strong></td>
<td><strong>Ctrl + B</strong></td>
<td>إظهار الشريط الجانبي الأيسر (مستكشف الملفات وغيره) أو إخفاؤه.</td>
</tr>
<tr>
<td><strong>الرجوع للخلف</strong></td>
<td><strong>Ctrl + -</strong></td>
<td><strong>Alt + Left Arrow</strong></td>
<td>العودة إلى الموضع السابق في الشيفرة.</td>
</tr>
<tr>
<td><strong>التقدّم للأمام</strong></td>
<td><strong>Ctrl + Shift + -</strong></td>
<td><strong>Alt + Right Arrow</strong></td>
<td>الانتقال إلى الموضع التالي في الشيفرة.</td>
</tr>
</tbody>
</table>
<h2 id="أساسيات-التحرير">أساسيات التحرير</h2>
<table>
<thead>
<tr>
<th>الإجراء</th>
<th>اختصار macOS</th>
<th>اختصار Windows</th>
<th>الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>قصّ السطر</strong> (بلا حاجة إلى تحديد)</td>
<td><strong>Cmd + X</strong></td>
<td><strong>Ctrl + X</strong></td>
<td>يقصّ السطر كاملًا إذا لم يكن هناك أي تحديد.</td>
</tr>
<tr>
<td><strong>نسخ السطر</strong> (بلا حاجة إلى تحديد)</td>
<td><strong>Cmd + C</strong></td>
<td><strong>Ctrl + C</strong></td>
<td>ينسخ السطر كاملًا إذا لم يكن هناك أي تحديد.</td>
</tr>
<tr>
<td><strong>اللصق</strong></td>
<td><strong>Cmd + V</strong></td>
<td><strong>Ctrl + V</strong></td>
<td>يلصق آخر ما قصصته أو نسخته.</td>
</tr>
<tr>
<td><strong>مضاعفة السطر</strong></td>
<td><strong>Shift + Option + ↓</strong></td>
<td><strong>Shift + Alt + ↓</strong></td>
<td>ينسخ سطرك الحالي مباشرة أسفله.</td>
</tr>
<tr>
<td><strong>تحريك السطر لأعلى/لأسفل</strong></td>
<td><strong>Option + ↑/↓</strong></td>
<td><strong>Alt + ↑/↓</strong></td>
<td>يحرّك السطر الحالي (أو التحديد) لأعلى أو لأسفل.</td>
</tr>
<tr>
<td><strong>تحديد المطابقة التالية</strong></td>
<td><strong>Cmd + D</strong></td>
<td><strong>Ctrl + D</strong></td>
<td>يجد المطابقة التالية تمامًا لتحديدك الحالي ويضيف مؤشّرًا جديدًا.</td>
</tr>
<tr>
<td><strong>تحديد جميع المطابقات</strong></td>
<td><strong>Cmd + Shift + L</strong></td>
<td><strong>Ctrl + Shift + L</strong></td>
<td>يبرز كل الكلمات المطابقة في الملف دفعة واحدة (مؤشّرات متعدّدة).</td>
</tr>
<tr>
<td><strong>تعليق/إلغاء تعليق السطر</strong></td>
<td><strong>Cmd + /</strong></td>
<td><strong>Ctrl + /</strong></td>
<td>يبدّل تعليق السطر (//) أو يحوّل تحديدًا إلى تعليق.</td>
</tr>
<tr>
<td><strong>تبديل تعليق الكتلة</strong></td>
<td><strong>Shift + Option + A</strong></td>
<td><strong>Shift + Alt + A</strong></td>
<td>يلفّ النص المحدّد في تعليق كتلة أو يزيل اللفّ.</td>
</tr>
<tr>
<td><strong>إضافة مؤشّرات متعدّدة</strong></td>
<td><strong>Option + Cmd + Up/Down</strong> <em>أو</em> <strong>Option + Click</strong></td>
<td><strong>Ctrl + Alt + Up/Down</strong> <em>أو</em> <strong>Alt + Click</strong></td>
<td>يضيف مؤشّرات متعدّدة للتحرير على التوازي.</td>
</tr>
<tr>
<td><strong>حذف السطر</strong></td>
<td><em>غير مرتبط افتراضيًا (يُقترح Ctrl+Shift+K)</em></td>
<td><strong>Ctrl + Shift + K</strong> (افتراضيًا)</td>
<td>يحذف السطر الحالي كاملًا.</td>
</tr>
<tr>
<td><strong>دمج الأسطر</strong></td>
<td>(اربطه يدويًا، مثل <strong>Ctrl+J</strong>)</td>
<td>(اربطه يدويًا، مثل <strong>Ctrl+J</strong>)</td>
<td>يدمج السطر التالي في نهاية السطر الحالي (بلا فاصل سطر).</td>
</tr>
</tbody>
</table>
<h2 id="الذكاء-البرمجي">الذكاء البرمجي</h2>
<table>
<thead>
<tr>
<th>الإجراء</th>
<th>اختصار macOS</th>
<th>اختصار Windows</th>
<th>الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الانتقال إلى التعريف</strong></td>
<td><strong>F12</strong> أو <strong>Cmd + Click</strong></td>
<td><strong>F12</strong> أو <strong>Ctrl + Click</strong></td>
<td>ينتقل إلى موضع تعريف الرمز (دالة أو متغيّر).</td>
</tr>
<tr>
<td><strong>معاينة التعريف</strong></td>
<td><strong>Option + F12</strong></td>
<td><strong>Alt + F12</strong></td>
<td>يعرض التعريف في نافذة منبثقة دون مغادرة ملفك.</td>
</tr>
<tr>
<td><strong>إعادة تسمية الرمز</strong></td>
<td><strong>F2</strong></td>
<td><strong>F2</strong></td>
<td>يعيد تسمية جميع حالات الرمز (دالة، متغيّر، وغيرها).</td>
</tr>
<tr>
<td><strong>اقتراحات الإكمال التلقائي</strong></td>
<td><strong>Ctrl + Space</strong></td>
<td><strong>Ctrl + Space</strong></td>
<td>يُظهر اقتراحات intellisense لإكمالات مبنية على السياق.</td>
</tr>
</tbody>
</table>
<h2 id="التخطيط-والتنسيق">التخطيط والتنسيق</h2>
<table>
<thead>
<tr>
<th>الإجراء</th>
<th>اختصار macOS</th>
<th>اختصار Windows</th>
<th>الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>تنسيق المستند</strong></td>
<td><strong>Shift + Option + F</strong></td>
<td><strong>Shift + Alt + F</strong></td>
<td>ينسّق شيفرتك (بواسطة Prettier أو مُجمّل الكود وغيره).</td>
</tr>
<tr>
<td><strong>تبديل التفاف الكلمات</strong></td>
<td><strong>Option + Z</strong></td>
<td><strong>Alt + Z</strong></td>
<td>يلفّ أسطر الشيفرة الطويلة إلى السطر التالي.</td>
</tr>
<tr>
<td><strong>طيّ الكل / فتح الكل</strong></td>
<td><strong>Cmd + K + 0 / Cmd + K + J</strong></td>
<td><strong>Ctrl + K + 0 / Ctrl + K + J</strong></td>
<td>يطوي جميع المناطق القابلة للطيّ في الملف أو يفردها.</td>
</tr>
<tr>
<td><strong>تقسيم المحرّر</strong></td>
<td>**Cmd + **</td>
<td>**Ctrl + **</td>
<td>يقسّم نافذة المحرّر النشطة إلى عدّة أجزاء.</td>
</tr>
<tr>
<td><strong>التركيز على مجموعة المحرّرات التالية/السابقة</strong></td>
<td><strong>Ctrl + Cmd + → / ←</strong></td>
<td><strong>Ctrl + K Ctrl + → / ←</strong></td>
<td>ينقل التركيز بين الأجزاء المقسّمة (أو استخدم مفاتيح الأسهم).</td>
</tr>
<tr>
<td><strong>تبديل وضع ملء الشاشة</strong></td>
<td><strong>Ctrl + Cmd + F</strong></td>
<td><strong>F11</strong></td>
<td>يبدّل عرض ملء الشاشة.</td>
</tr>
<tr>
<td><strong>وضع Zen</strong></td>
<td><strong>Cmd + K Z</strong></td>
<td><strong>Ctrl + K Z</strong></td>
<td>وضع خالٍ من المشتّتات.</td>
</tr>
</tbody>
</table>
`,h={book:t,chapter:n,chapterTitle:d,slug:r,title:o,headings:s,html:g};export{t as book,n as chapter,d as chapterTitle,h as default,s as headings,g as html,r as slug,o as title};
