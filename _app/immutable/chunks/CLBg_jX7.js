const n="kinney",o="full-stack-typescript",e="TypeScript للويب الكامل",l="validating-zod-schema-exercises",i="التحقّق من مخطط Zod (تمرين)",t=[{depth:2,id:"التمارين",text:"التمارين"},{depth:3,id:"مرحبا-zod-التحقق-الأساسي",text:"«مرحبًا، Zod!» التحقّق الأساسي"},{depth:3,id:"كل-شيء-عن-الخيارات",text:"كل شيء عن الخيارات"},{depth:3,id:"في-الشارع-الذي-تسكن-فيه",text:"في الشارع الذي تسكن فيه"},{depth:3,id:"الآن-شيء-مختلف-تماما-الاتحادات",text:"الآن شيء مختلف تمامًا: الاتحادات"},{depth:3,id:"صقل-أذواقك",text:"صقل أذواقك"},{depth:3,id:"المحولون-تحقق-متنكر",text:"المحوِّلون: تحقّق متنكّر"},{depth:3,id:"إضافة-قليل-من-الوسم-إلى-حياتك",text:"إضافة قليل من الوسم إلى حياتك"},{depth:3,id:"اجعل-partial-وpick-وomit-أفضل-أصدقائك",text:"اجعل «Partial» و«Pick» و«Omit» أفضل أصدقائك"},{depth:3,id:"مخططات-مخصصة",text:"مخططات مخصّصة"},{depth:3,id:"جمع-كل-شيء-ابن-محقق-نماذج",text:"جمّع كل شيء: ابنِ محقّق نماذج"},{depth:3,id:"إضافي",text:"إضافي"}],s=`<p>فيما يلي قائمة بعشرة تحدّيات عملية تنقلك من مبتدئ في Zod إلى ساحر في Zod. ابدأ من الأعلى، وتدرّج نزولًا، وستقوم بجولة في كثير من ميزات Zod وغرائبه على الطريق.</p>
<div class="exercises"><h2 id="التمارين">التمارين</h2>
<h3 id="مرحبا-zod-التحقق-الأساسي">«مرحبًا، Zod!» التحقّق الأساسي</h3>
<p><strong>المفاهيم</strong>: مخططات بسيطة، <code>.parse()</code>، تحقّق أساسي من <code>string</code>/<code>number</code></p>
<ol>
<li>أنشئ مخطط Zod يتحقّق من كائن يحتوي:</li>
</ol>
<ul>
<li>خاصية name (نص، مطلوبة)</li>
<li>خاصية age (عدد، يجب أن يكون &gt;= 0)</li>
</ul>
<ol>
<li>اكتب دالة صغيرة تستدعي <code>.parse()</code> على بعض البيانات النموذجية:</li>
</ol>
<ul>
<li><code>{ name: &quot;Ada&quot;, age: 36 }</code> يجب أن تمرّ</li>
<li><code>{ name: &quot;Charles&quot; }</code> يجب أن تفشل (عمر مفقود)</li>
<li><code>{ name: &quot;Bobby Tables&quot;, age: -1 }</code> يجب أن تفشل (عمر سالب)</li>
</ul>
<ol>
<li>سجّل النتيجة (pass/fail/error messages).</li>
</ol>
<p><strong>الهدف</strong>: أن تأنس بأبسط استخدام لـ Zod. حتى سمكتك الذهبية تستطيع فعل ذلك، لكنك ستحتاج هذه الأساسيات في كل مكان.</p>
<h3 id="كل-شيء-عن-الخيارات">كل شيء عن الخيارات</h3>
<p><strong>المفاهيم</strong>: الحقول الاختيارية مقابل المطلوبة، .optional()، القيم الافتراضية</p>
<ol>
<li>ابدأ بالكائن من التحدّي 1، لكن الآن صار عمر المستخدم اختياريًا (فربما لا يريد مشاركته).</li>
<li>إن لم يُقدَّم العمر، فاجعله افتراضيًا 0 عبر تحويل (أو أظهر خطأً إن كنت تفضّل ذلك).</li>
<li>اختبر بـ:</li>
</ol>
<ul>
<li><code>{ name: &quot;Ada&quot; }</code> (هل يُملأ العمر تلقائيًا؟ أم تُطلق خطأً؟)</li>
<li><code>{ name: &quot;Ada&quot;, age: 36 }</code></li>
<li>كائن فارغ أو name مفقود.</li>
</ul>
<p><strong>الهدف</strong>: أن تتعلّم كيفية التعامل مع الحقول الاختيارية. فالأمر في جوهره الفرق بين «ربما لدينا القيمة» و«بالتأكيد لدينا القيمة».</p>
<h3 id="في-الشارع-الذي-تسكن-فيه">في الشارع الذي تسكن فيه</h3>
<p><strong>المفاهيم</strong>: الكائنات المتداخلة، المصفوفات</p>
<ol>
<li>ابنِ مخططًا لـ <code>UserProfile</code> يبدو هكذا:</li>
</ol>
<pre><code class="language-typescript">{
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">addresses</span>: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">street</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">city</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">zip</span>: <span class="hljs-built_in">string</span>;
  }&gt;;
}
</code></pre>
<ol>
<li>يمكن أن يكون للمستخدمين عناوين متعددة، لذا addresses مصفوفة. ويُطلب عنوان واحد على الأقل.</li>
<li>تحقّق من كائن بعنوان واحد، وبعناوين متعددة، وبلا عناوين (وهذا يجب أن يفشل).</li>
<li>جرّب إضافة خاصية ثانوية اختيارية مثل apartmentNumber.</li>
</ol>
<p><strong>الهدف</strong>: أن تتعلّم كيف تُداخل المخططات وتتعامل مع المصفوفات. لأن البيانات معقّدة في الغالب، وكذلك التحقّقات.</p>
<h3 id="الآن-شيء-مختلف-تماما-الاتحادات">الآن شيء مختلف تمامًا: الاتحادات</h3>
<p><strong>المفاهيم</strong>: مخططات الاتحاد، .parse()، الاتحادات المُميَّزة (اختياري)</p>
<ol>
<li>أنشئ مخطط Zod يقبل أحد الأمرين:</li>
</ol>
<ul>
<li>نصًا يساوي <code>&quot;anonymous&quot;</code> بالضبط</li>
<li>كائنًا بحقلين، <code>id: number</code> و<code>name: string</code></li>
</ul>
<ol>
<li>هذا يعني أنه يجب أن تستطيع تحليل <code>&quot;anonymous&quot;</code> أو <code>{ id: 1, name: &quot;Alan&quot; }</code>.</li>
<li>اختبر ببيانات غير صالحة مثل <code>{ id: &quot;wrong&quot;, name: &quot;Marvin&quot; }</code> لترى كيف ينكسر الاتحاد.</li>
</ol>
<p><strong>الهدف</strong>: أن تتقن مفهوم الاتحاد، وهو ضروري للتعامل مع صيغ بيانات ممكنة متعددة. فبالبيانات تحاول التسلّل أحيانًا. والاتحادات تتيح لك ضبطها متلبّسة.</p>
<h3 id="صقل-أذواقك">صقل أذواقك</h3>
<p><strong>المفاهيم</strong>: <code>.refine()</code>، رسائل أخطاء مخصّصة</p>
<ol>
<li>خذ حقلًا عدديًا — لنقل quantity.</li>
<li>أضف فحص <code>.refine()</code> يضمن أن quantity عدد أولي (مثل 2 و3 و5 و7 وغيرها).</li>
<li>إذا فشل، أعِد رسالة خطأ مخصّصة: «Quantity must be prime!»</li>
</ol>
<p><strong>الهدف</strong>: أن تفهم كيف ترفق منطق تحقّق مخصّصًا بمخططك. ابقَ هادئًا وواصل الصقل.</p>
<h3 id="المحولون-تحقق-متنكر">المحوِّلون: تحقّق متنكّر</h3>
<p><strong>المفاهيم</strong>: <code>.transform()</code></p>
<ol>
<li>أنشئ مخططًا يقبل نصًا بصيغة <code>YYYY-MM-DD</code> (مثل «2025-03-20»).</li>
<li>بعد التحقّق من الصيغة، حوّله إلى كائن <code>Date</code> في JavaScript.</li>
<li>تأكّد أن ناتج .parse() النهائي فعلًا نوع <code>Date</code> (وليس نصًا).</li>
</ol>
<p><strong>الهدف</strong>: أن ترى كيف يستطيع Zod تحويل نوع متحقَّق منه تلقائيًا إلى شيء آخر. بيانات تدخل، وبيانات محوّلة تخرج — كخط أنابيب سحري.</p>
<h3 id="إضافة-قليل-من-الوسم-إلى-حياتك">إضافة قليل من الوسم إلى حياتك</h3>
<p><strong>المفاهيم</strong>: الأنواع الموسومة، أمان الأنواع في TypeScript</p>
<ol>
<li>أنشئ نوعًا موسومًا لـ <code>UserId</code> يكون في جوهره نصًا لكنه يحمل الوسم <code>UserId</code>.</li>
<li>يجب أن يكون النص UUID صالحًا (استخدم <code>z.string().uuid()</code>).</li>
<li>جرّب تمرير نص عادي إلى دالة تتوقع UserId — ينبغي أن يشتكي TypeScript.</li>
</ol>
<p><strong>الهدف</strong>: أن تتعلّم كيف يساعد الوسم على التمييز بين نوعين قائمين على النص في شيفرتك. لا مزيد من الخلط بين معرّفات المستخدمين وعناوين البريد الإلكتروني.</p>
<blockquote>
<p><strong>Zod v4</strong></p>
<p>في Zod v4، يُفضَّل كتابة <code>z.string().uuid()</code> بالصيغة <code>z.uuid()</code> على المستوى الأعلى.</p>
</blockquote>
<h3 id="اجعل-partial-وpick-وomit-أفضل-أصدقائك">اجعل «Partial» و«Pick» و«Omit» أفضل أصدقائك</h3>
<p><strong>المفاهيم</strong>: الطرق المساعدة (<code>.partial()</code>، <code>.pick()</code>، <code>.omit()</code>)</p>
<ol>
<li>ابدأ بمخطط أكبر يصف ملفًا شخصيًا لمستخدم (name وemail وaddresses وphoneNumber وغيرها).</li>
<li>أنشئ مخططًا ثانيًا نسخة جزئية — ربما لعملية «تحديث الملف الشخصي» حيث تُسمح بحقول معيّنة فقط.</li>
<li>ثم أنشئ مخطط «الملف العام» الذي يحذف حقولًا مثل email أو phoneNumber (الأشياء التي لا تريد عرضها علنًا).</li>
<li>تحقّق من مثال بكل مخططاتك الجديدة.</li>
</ol>
<p><strong>الهدف</strong>: أن تُظهر كيف تتجنّب إعادة كتابة المخطط نفسه مرات عدة لاستخدامات مختلفة. لأن DRY حياة.</p>
<h3 id="مخططات-مخصصة">مخططات مخصّصة</h3>
<p><strong>المفاهيم</strong>: <code>z.custom()</code></p>
<ol>
<li>اكتب مخططًا مخصّصًا لـ «نص لون سداسي عشري» (مثل <code>#FFFFFF</code> أو <code>#000</code>):</li>
</ol>
<ul>
<li>يجب أن يكون نصًا</li>
<li>يجب أن يبدأ بـ <code>#</code></li>
<li>ثم أن يحتوي 3 أو 6 أرقام سداسية عشرية صالحة (0-9، A-F)</li>
</ul>
<ol>
<li>إذا فشل، أظهر خطأً: «Invalid hex color.»</li>
<li>اختبر بنصوص صالحة/غير صالحة («#FFFFFF»، «#abc»، «#1234567»، «123456»).</li>
</ol>
<p><strong>الهدف</strong>: أن تفهم كيف تجري تحقّقًا مخصّصًا بالكامل ولا ينطبق بسهولة على أوليّات Zod الموجودة. هنا يمكنك برمجة قواعدك الغريبة الفريدة.</p>
<h3 id="جمع-كل-شيء-ابن-محقق-نماذج">جمّع كل شيء: ابنِ محقّق نماذج</h3>
<p><strong>المفاهيم</strong>: التركيب، الاستخدام الواقعي، الاختبار</p>
<ol>
<li>لنقل إن لديك نموذج تسجيل يتطلب:</li>
</ol>
<ul>
<li><code>username</code> (نص، 4–16 حرفًا)</li>
<li><code>password</code> (نص، 8 أحرف على الأقل، ويجب أن يحتوي رقمًا)</li>
<li><code>email</code> (نص، يجب أن يطابق نمط بريد إلكتروني أو تحسّنه عبر مكتبة خارجية)</li>
<li><code>birthDate</code> (اختياري؛ إن وُجد، يجب أن يُحلَّل إلى تاريخ صالح عبر .transform())</li>
</ul>
<ol>
<li>ابنِ مخططًا واحدًا أو مجموعة مخططات أصغر تُركَّب في مخطط أكبر. واستخدم <code>.refine()</code> و<code>.transform()</code> والمصفوفات (إن كان لنموذجك بيانات متعددة الخطوات، مثلًا)، أو أي شيء آخر تحتاجه.</li>
</ol>
<h3 id="إضافي">إضافي</h3>
<p><strong>الهدف</strong>: أن تتمرّن على جمع كل ما تعلّمته. فالنماذج الواقعية مفعمة بالحقول الاختيارية والقواعد المتخصّصة والتحويلات، وهذا تمثيل جيد للحياة الواقعية.</p>
<blockquote>
<p><strong>الحلول</strong></p>
<p>تجد الحلول <a href="https://stevekinney.com/courses/full-stack-typescript/validating-zod-schemas-solution">هنا</a>.</p>
</blockquote>
</div>`,d={book:n,chapter:o,chapterTitle:e,slug:l,title:i,headings:t,html:s};export{n as book,o as chapter,e as chapterTitle,d as default,t as headings,s as html,l as slug,i as title};
