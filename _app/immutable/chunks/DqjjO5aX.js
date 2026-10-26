const n="kinney",t="visual-studio-code",o="Visual Studio Code",s="settings-profiles-vscode",i="ملفات تعريف الإعدادات",r=[{depth:2,id:"إنشاء-ملفات-التعريف",text:"إنشاء ملفات التعريف"},{depth:2,id:"تبديل-ملفات-التعريف",text:"تبديل ملفات التعريف"},{depth:2,id:"إدارة-ملفات-التعريف",text:"إدارة ملفات التعريف"},{depth:2,id:"حالات-استخدام-نموذجية",text:"حالات استخدام نموذجية"}],e=`<p>تتيح لك <strong>ملفات تعريف الإعدادات (Settings Profiles)</strong> إنشاء تهيئات مختلفة لـ Visual Studio Code وإدارتها لمشاريع أو مهام أو لغات برمجة مختلفة. وهذا مفيد للغاية عندما تحتاج إلى التبديل بين بيئات تطوير مختلفة اختلافًا جذريًا (مثل تطوير الويب مقابل علم البيانات، والمشاريع الشخصية مقابل مشاريع العمل).</p>
<p><img src="/arabic-cs-library/images/kinney/54f282ed354b70f5.webp" alt="إنشاء ملف تعريف جديد"></p>
<h2 id="إنشاء-ملفات-التعريف">إنشاء ملفات التعريف</h2>
<ol>
<li><strong>لوحة الأوامر:</strong> افتح لوحة الأوامر (<code>Ctrl+Shift+P</code> أو <code>Cmd+Shift+P</code>) ونفّذ “Preferences: Create Settings Profile”.</li>
<li><strong>نوع ملف التعريف:</strong> اختر نوع ملف التعريف: <strong>ملف تعريف فارغ:</strong> يبدأ بالإعدادات الافتراضية. <strong>بناءً على ملف التعريف الحالي:</strong> ينسخ الإعدادات من ملف تعريفك الحالي. <strong>بناءً على ملف تعريف قالب:</strong> يبدأ بإعدادات من قالب محدّد مسبقًا (مثل “Web Development” و “Data Science”).</li>
</ol>
<ul>
<li><strong>ملف تعريف فارغ:</strong> يبدأ بالإعدادات الافتراضية.</li>
<li><strong>بناءً على ملف التعريف الحالي:</strong> ينسخ الإعدادات من ملف تعريفك الحالي.</li>
<li><strong>بناءً على ملف تعريف قالب:</strong> يبدأ بإعدادات من قالب محدّد مسبقًا (مثل “Web Development” و “Data Science”).</li>
</ul>
<ol start="3">
<li><strong>اسم ملف التعريف:</strong> أدخل اسمًا لملف تعريفك الجديد.</li>
</ol>
<h2 id="تبديل-ملفات-التعريف">تبديل ملفات التعريف</h2>
<ol>
<li><strong>لوحة الأوامر:</strong> افتح لوحة الأوامر (<code>Ctrl+Shift+P</code> أو <code>Cmd+Shift+P</code>) ونفّذ “Preferences: Switch Settings Profile”.</li>
<li><strong>اختيار ملف التعريف:</strong> اختر ملف التعريف الذي تريد تنشيطه من القائمة.</li>
</ol>
<h2 id="إدارة-ملفات-التعريف">إدارة ملفات التعريف</h2>
<ol>
<li><strong>لوحة الأوامر:</strong> افتح لوحة الأوامر (<code>Ctrl+Shift+P</code> أو <code>Cmd+Shift+P</code>) ونفّذ “Preferences: Manage Settings Profiles”.</li>
<li><strong>إجراءات ملف التعريف:</strong> في عرض Settings Profiles، يمكنك: <strong>تحرير:</strong> تعديل الإعدادات داخل ملف تعريف. <strong>إعادة تسمية:</strong> تغيير اسم ملف تعريف. <strong>تصدير:</strong> تصدير ملف تعريف إلى ملف JSON. <strong>استيراد:</strong> استيراد ملف تعريف من ملف JSON. <strong>حذف:</strong> حذف ملف تعريف.</li>
</ol>
<ul>
<li><strong>تحرير:</strong> تعديل الإعدادات داخل ملف تعريف.</li>
<li><strong>إعادة تسمية:</strong> تغيير اسم ملف تعريف.</li>
<li><strong>تصدير:</strong> تصدير ملف تعريف إلى ملف JSON.</li>
<li><strong>استيراد:</strong> استيراد ملف تعريف من ملف JSON.</li>
<li><strong>حذف:</strong> حذف ملف تعريف.</li>
</ul>
<blockquote>
<p><strong>نطاق ملف التعريف</strong></p>
<p>تدير ملفات تعريف الإعدادات إعدادات User أساسًا. أما إعدادات Workspace و Folder فتبقى خاصة بمساحة العمل أو المجلد ولا تديرها ملفات التعريف مباشرةً. ومع ذلك، يمكنك إنشاء ملفات تعريف مصمّمة لأنواع محدّدة من المشاريع، ثم تطبيقها عند العمل على مشاريع من ذلك النوع.</p>
</blockquote>
<h2 id="حالات-استخدام-نموذجية">حالات استخدام نموذجية</h2>
<ul>
<li><strong>ملف تعريف لتطوير الويب:</strong> فعّل الإضافات الخاصة بتطوير الويب، واضبط منسّقات الشيفرة لـ HTML و CSS و JavaScript، وأعدّ أدوات فحص الشيفرة لتقنيات الويب، وخصّص السمات للعمل على الواجهات الأمامية.</li>
<li><strong>ملف تعريف لعلم البيانات:</strong> ثبّت إضافات علم البيانات (Python و Jupyter و R)، واضبط بيئات Python، وعدّل إعدادات المحرّر لدفاتر تحليل البيانات، واستخدم سمة مناسبة لتصوير البيانات.</li>
<li><strong>ملف تعريف للعمل مقابل الشخصي:</strong> افصل الإعدادات المتعلقة بالعمل (سمات الشركة، وإرشادات نمط الشيفرة، والإضافات المحدّدة) عن إعدادات المشاريع الشخصية.</li>
<li><strong>ملفات تعريف خاصة بلغة:</strong> أنشئ ملفات تعريف للغات برمجة مختلفة (مثل ملف تعريف Python وملف تعريف JavaScript) بإعدادات وإضافات خاصة بكل لغة.</li>
</ul>
`,l={book:n,chapter:t,chapterTitle:o,slug:s,title:i,headings:r,html:e};export{n as book,t as chapter,o as chapterTitle,l as default,r as headings,e as html,s as slug,i as title};
