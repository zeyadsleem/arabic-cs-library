const e="tanstack-router",o="router",t="دورة TanStack Router الكاملة",d="more-topics-and-outro",c="الختام: حصاد الدورة والمواضيع التالية",a=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"ما-صار-إليه-التطبيق",text:"ما صار إليه التطبيق"},{depth:3,id:"شجرة-المسارات-والتخطيطات",text:"شجرة المسارات والتخطيطات"},{depth:3,id:"البيانات-المحملات-ومعاملات-البحث",text:"البيانات: المُحمِّلات ومعاملات البحث"},{depth:3,id:"الحماية-السياق-وإعادة-التوجيه",text:"الحماية: السياق وإعادة التوجيه"},{depth:3,id:"الحالات-الثلاث-لكل-مسار",text:"الحالات الثلاث لكل مسار"},{depth:3,id:"ما-لم-تغطه-الدورة",text:"ما لم تغطّه الدورة"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],n=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>هذا هو الدرس الأخير في الدورة، ولا يضيف سطرًا واحدًا إلى التطبيق. وظيفته أن يجمع الخيوط في صورة واحدة: ما صار إليه التطبيق، وكيف انتظمت أجزاؤه في طبقات، ثم ما بقي خارج الدورة من قدرات الموجّه وأين تقرأ عنه.</p>
<p>الفكرة التي يثبتها الختام أنّ TanStack Router ليس مجموعة حِيَل منفصلة، بل طبقات متراكبة: شجرة يولّدها نظام الملفات، وتخطيطات تعرض أبناءها في منفذ واحد، ومُحمِّلات (loaders) تجلب البيانات قبل التصيير، وتحقّق من معاملات البحث يجعل العنوان حالةً موثوقة، وسياق يمرّر الهوية إلى الشجرة كلها، وثلاث حالات عرض لكل مسار: انتظار وخطأ وغياب. من يفهم هذا التركيب يضيف مسارًا جديدًا في دقائق، لأنّه يعرف سلفًا أين يقع كل جزء.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="ما-صار-إليه-التطبيق">ما صار إليه التطبيق</h3>
<p>تطبيقنا تطبيق Vite صغير بـReact وTypeScript وTailwind. الملف <code>vite.config.ts</code> يضمّ إضافة <code>tanstackRouter</code> مع <code>autoCodeSplitting</code>، وهي التي تُولّد <code>src/routeTree.gen.ts</code> من ملفات <code>src/routes</code> عند كل تشغيل.</p>
<p>في <code>src/main.tsx</code> يُنشأ الموجّه مرة واحدة على مستوى الوحدة، ثم يمرّ إلى <code>RouterProvider</code>:</p>
<ul>
<li>الشجرة تأتي من <code>routeTree</code> المولّد.</li>
<li><code>context</code> الأولي يحمل <code>user: null</code> و<code>login</code> و<code>logout</code> كدوالّ فارغة، لأنّ الموجّه يُنشأ قبل أن يعرف React حالة المستخدم.</li>
<li><code>defaultPreload: &quot;intent&quot;</code> يجعل الموجّه يبدأ تحميل المسار حين يقترب مؤشّر الفأرة من رابط أو يلمسه المستخدم على شاشة لمس، فتصل البيانات قبل الضغط.</li>
<li><code>notFoundMode: &quot;fuzzy&quot;</code> و<code>defaultNotFoundComponent</code> يحدّدان كيف يُعرض عنوان لا يقابله مسار.</li>
<li>إعلان <code>Register</code> يربط أنواع الموجّه بـTypeScript، فيصبح كل <code>Link</code> و<code>navigate</code> و<code>useParams</code> مشروعًا على الشجرة الفعلية.</li>
</ul>
<p>وفي المكوّن <code>App</code> تُدار حالة المستخدم بـ<code>useState</code>. حين يسجّل الزائر دخوله تُحدَّث الحالة داخل <code>flushSync</code> ثم يُنادى <code>router.invalidate()</code>. السبب أنّ <code>beforeLoad</code> يقرأ السياق، ولو انتظرنا التحديث غير المتزامن لأُعيد التحقق بالسياق القديم، فيبقى المسار المحميّ يرى مستخدمًا فارغًا ويعيد التوجيه إلى صفحة الدخول.</p>
<h3 id="شجرة-المسارات-والتخطيطات">شجرة المسارات والتخطيطات</h3>
<p>في <code>src/routes/__root.tsx</code> يُعرَّف الجذر بـ<code>createRootRouteWithContext&lt;RootRouteContext&gt;()</code>. هذا المكوّن هو الإطار الثابت لكل صفحة: عنوان، ثم ترحيب بالمستخدم المسجّل أو بالزائر مع زرّي الدخول والخروج، ثم شريط تنقّل يضمّ <code>Home</code> و<code>About</code> و<code>Random Word</code>، ثم <code>Outlet</code> الذي تظهر فيه الصفحة المطلوبة، ثم <code>TanStackRouterDevtools</code>.</p>
<p>تحت الجذر بُنيت بقية الشجرة بقواعد تسمية الملفات، وكل قاعدة منها تحلّ مشكلة مختلفة:</p>
<ul>
<li>النقطة تعني تداخلًا في العنوان: الملف <code>posts.index.tsx</code> يعطي <code>/posts/</code>، والملف <code>posts.$postId.tsx</code> يعطي <code>/posts/$postId</code>.</li>
<li>الشرطة السفلية في البداية تعني تخطيطًا بلا مقطع عنوان: <code>_authenticated.tsx</code> لا يضيف شيئًا إلى الرابط، لكنه يغلّف ما تحته ويستطيع أن يحمي كل أبنائه في مكان واحد.</li>
<li>الشرطة السفلية في النهاية تعني الخروج من تخطيط الأب: الملف <code>_settingsLayout.settings_.password.tsx</code> يعطي <code>/settings/password</code> لكنه لا يُعرض داخل صفحة <code>settings</code> ولا يرث محتواها.</li>
<li>الأقواس المعقوفة حول مقطع تعني أنّه اختياري: <code>{-$locale}.archive.{-$year}.{-$month}.{-$day}.tsx</code> يعطي عنوانًا يعمل بجزء من أجزائه أو بكلها أو بلا شيء منها.</li>
<li>الشرطة في بداية اسم ملف تعني أنّه ليس مسارًا: مجلّد <code>-components</code> يحوي <code>Post.tsx</code> و<code>Nav.tsx</code>، وهما مكوّنان يُستوردان ولا يظهران في الشجرة.</li>
<li><code>$</code> وحده مقطع شامل: <code>file.file-{$fileId}.{$}[.]txt.tsx</code> يقرأ <code>_splat</code> و<code>fileId</code> معًا، و<code>[.]</code> يجعل النقطة حرفية لا فاصل امتداد.</li>
</ul>
<p>أمّا مجموعة <code>settings</code> فتعرض تخطيطًا يملك تنقّله الخاص: <code>_settingsLayout.tsx</code> يعرض <code>Nav</code> ثم <code>Outlet</code>، و<code>_settingsLayout.settings.tsx</code> أبٌ لصفحتَي <code>payment</code> و<code>profile</code>؛ فشريط <code>General</code> و<code>Payment</code> و<code>Profile</code> يبقى فوق الصفحة وأنت تنتقل بينها.</p>
<h3 id="البيانات-المحملات-ومعاملات-البحث">البيانات: المُحمِّلات ومعاملات البحث</h3>
<p>أهمّ ما يجعل هذه الشجرة مفيدة أنّها تجلب بياناتها قبل التصيير. في <code>_authenticated.random-word.tsx</code> يعرّف المسار مخطط Zod للكلمة <code>lang</code> ثم يمرّره إلى <code>validateSearch</code> عبر <code>zodValidator</code>، فلا يقبل العنوان إلا واحدة من أربع قيم أو لا شيء، وأي قيمة أخرى تُرفض قبل أن تصل إلى الشبكة.</p>
<p>والربط مع البيانات يتم بـ<code>loaderDeps</code>:</p>
<ul>
<li><code>loaderDeps</code> يعلن أنّ المُحمِّل يعتمد على <code>search.lang</code>، فيُعاد تشغيله كلما تغيّر هذا الحقل وحده دون أن يتغيّر المسار.</li>
<li>من دونه لن يعرف الموجّه أنّ تغيير <code>lang</code> يخصّ المُحمِّل، فتبقى الكلمة من اللغة السابقة.</li>
<li>الروابط داخل الصفحة تستعمل <code>to=&quot;.&quot;</code> مع <code>search={{ lang }}</code>، فتبقى في المسار نفسه وتغيّر معامل البحث فقط.</li>
</ul>
<p>وفي <code>posts.index.tsx</code> نمط ثانٍ: <code>beforeLoad</code> يُرجع <code>{ getPosts }</code>، فيصبح جالب البيانات جزءًا من سياق المسار لا استيرادًا مباشرًا في المُحمِّل، ويستطيع أيّ مسار ابن أن يستعمل الدالة نفسها. ثم يقرأ <code>loader</code> الصفحة من <code>deps.page</code>، وروابط «الصفحة التالية» تستعمل <code>search={(prev) =&gt; ({ page: (prev.page || 1) + 1 })}</code> كي تتراكم الصفحات بدل أن تتصادم.</p>
<p>وللبيانات البطيئة حلّ ثالث: مسار التدوينة يعيد <code>commentsPromise</code> دون <code>await</code>، ويعرضها المكوّن داخل <code>Await</code> مع بديل <code>Loading...</code>. هكذا يظهر نصّ التدوينة فورًا بينما تنتظر التعليقات وحدها، بدل أن تتجمّد الصفحة كلها على أبطأ طلب فيها.</p>
<h3 id="الحماية-السياق-وإعادة-التوجيه">الحماية: السياق وإعادة التوجيه</h3>
<p>الحماية في هذا التطبيق ليست فحصًا متكرّرًا في كل صفحة، بل فحص واحد في تخطيط أب. الملف <code>_authenticated.tsx</code> يرمي <code>redirect</code> من <code>beforeLoad</code> حين يكون <code>context.user</code> فارغًا، ويحمل معه العنوان الذي كان الزائر يقصده:</p>
<ul>
<li><code>to: &quot;/login&quot;</code> يوجّه إلى صفحة الدخول.</li>
<li><code>search: { redirect: location.href }</code> يحفظ الوجهة الأصلية، فتعود الصفحة بعد الدخول إلى ما أراده الزائر لا إلى الرئيسية.</li>
</ul>
<p>وصفحة <code>login</code> تكمل الدائرة: مخططها يقبل <code>redirect</code> اختياريًا، و<code>beforeLoad</code> فيها يطرد المسجّل إلى وجهته إن فتح صفحة الدخول مجددًا، وعند الضغط على الزرّ ينادي <code>login</code> ثم <code>navigate({ to: redirect || &quot;/&quot; })</code>. وفي <code>_authenticated.about.tsx</code> بقي <code>beforeLoad</code> معلَّقًا لأنّ الحماية انتقلت إلى الأب.</p>
<h3 id="الحالات-الثلاث-لكل-مسار">الحالات الثلاث لكل مسار</h3>
<p>لكل مسار ثلاث حالات عرض غير حالته الطبيعية، جرّبناها في <code>posts.$postId.tsx</code>:</p>
<ul>
<li><code>pendingComponent</code> مع <code>pendingMs: 0</code> و<code>pendingMinMs: 500</code>: يظهر <code>Loading...</code> فورًا، ويبقى نصف ثانية على الأقل حتى لا ترتجف الشاشة عند استجابة سريعة.</li>
<li><code>errorComponent</code>: يعرض نصّ الخطأ وزرًّا ينادي <code>router.invalidate()</code>، فيبقى الزائر في مكانه بدل أن يعيد تحميل الصفحة كلها.</li>
<li><code>notFoundComponent</code>: يتولّى حالة مورد غير موجود، ويُختار أقرب تعريف له صعودًا في الشجرة، مع <code>notFoundMode: &quot;fuzzy&quot;</code> الذي يحافظ على أكبر قدر من التخطيط حول الرسالة.</li>
</ul>
<p>وأضفنا <code>CatchBoundary</code> حول التعليقات وحدها مع <code>getResetKey</code>: لولا هذا الحدّ لصعد فشل طلبها إلى حدّ خطأ المسار فاختفى نصّ التدوينة مع أنّه وصل سليمًا.</p>
<h3 id="ما-لم-تغطه-الدورة">ما لم تغطّه الدورة</h3>
<p>ينبّه المؤلف في الختام إلى أنّ الدورة غطّت الأساس ولم تغطّ كل شيء، ويسمّي المواضيع التالية صراحةً؛ وهي إشارات إلى ما هو أبعد من تطبيقنا، لا ميزات فيه:</p>
<ul>
<li>تمويه المسارات (<code>route masking</code>): تنتقل إلى مسار مثل نافذة منبثقة، لكنّ العنوان الذي يُحفظ في السجلّ ويُشارك يبقى عنوان الصفحة الأب. <a href="https://tanstack.com/router/latest/docs/framework/react/guide/route-masking">دليل تمويه المسارات</a></li>
<li>أدوات الأنواع: أنواع جاهزة مثل <code>ValidateLinkOptions</code> و<code>ValidateNavigateOptions</code> و<code>ValidateRedirectOptions</code> لتمرير خيارات تنقّل إلى مكوّناتك الخاصّة وتبقى مفحوصة. <a href="https://tanstack.com/router/latest/docs/framework/react/guide/type-utilities">دليل أدوات الأنواع</a></li>
<li>حجب التنقّل: منع الخروج من مسار فيه تغييرات غير محفوظة، بالسؤال قبل المغادرة أو بعرض واجهة من تصميمك. <a href="https://tanstack.com/router/latest/docs/framework/react/guide/navigation-blocking">دليل حجب التنقّل</a></li>
<li>روابط مخصّصة: بناء رابطك بـ<code>createLink</code> فوق مكوّن مكتبة مثل <code>MUI</code> أو <code>Chakra UI</code> مع الاحتفاظ بفحص الأنواع. <a href="https://tanstack.com/router/latest/docs/framework/react/guide/custom-link">دليل الرابط المخصّص</a></li>
<li>إدارة رأس المستند: العنوان والوسوم الوصفية لكل مسار، وهي مادّة تحسين الظهور في محرّكات البحث. <a href="https://tanstack.com/router/latest/docs/framework/react/guide/document-head-management">دليل إدارة رأس المستند</a></li>
<li>مسارات الملفّات الافتراضية: تعريف الشجرة بشيفرة تشير إلى ملفات حقيقية، فتضع قواعد تسمية خاصّة بك بدل قواعد النقطة والشرطة السفلية. <a href="https://tanstack.com/router/latest/docs/framework/react/routing/virtual-file-routes">دليل مسارات الملفّات الافتراضية</a></li>
<li>التصيير على الخادم (SSR): وحين تحتاجه فعليًا فالأرجح أنّك ستنتقل إلى إطار TanStack المتكامل، TanStack Start، وقد كان حينها في النسخة التجريبية. <a href="https://tanstack.com/router/latest/docs/framework/react/guide/ssr">دليل التصيير على الخادم</a></li>
</ul>
<h2 id="النتيجة">النتيجة</h2>
<p>لم يتغيّر في هذه الجولة أيّ ملفّ؛ الدرس ختامي، والحصيلة هي التطبيق في حالته النهائية على الفرع <code>auth-2</code>. تفتح الرئيسية فترى شريط التنقّل العام وحالة الزائر مع زرّ الدخول، وتحته رابطين: أرشيف يعمل بمعاملات اختيارية، وقائمة منتجات تقرأ ترتيبها وترقيمها من معاملات البحث. وفي التدوينة تنتظر أولًا، ثم يظهر النصّ، ثم تصل التعليقات وحدها. وتحذف جزءًا من عنوان الأرشيف فيبقى يعمل، وتفتح عنوانًا لا وجود له فتظهر رسالة عدم الوجود داخل التخطيط لا في صفحة بيضاء. وقبل الدخول يعيدك <code>about</code> إلى صفحة الدخول، وبعده تصل إلى ما كنت تقصده. تطبيق صغير، لكنّ كلّ جزء فيه يعرف موضعه.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>أضف ملفًّا جديدًا <code>_settingsLayout.settings.notifications.tsx</code>، ثم افتح <code>/settings/notifications</code> وتأكّد أنّ شريط <code>General</code> و<code>Payment</code> و<code>Profile</code> يظهر فوقه تلقائيًا. كرّر التجربة باسم <code>_settingsLayout.settings_.notifications.tsx</code> ولاحظ اختفاء الشريط.</li>
<li>انقل الحماية من <code>_authenticated.tsx</code> إلى <code>_authenticated.about.tsx</code> وحده، ثم افتح <code>random-word</code> قبل الدخول: الفرق يوضّح لماذا وُضع الحارس في التخطيط.</li>
<li>أضف إلى مخطط <code>posts.index.tsx</code> القيمة الاحتياطية <code>fallback(z.number(), 1)</code> على <code>page</code>، ثم افتح <code>/posts?page=abc</code> وقارن السلوك قبل التعديل وبعده.</li>
<li>احذف <code>loaderDeps</code> من <code>random-word</code> مؤقّتًا، ثم بدّل اللغة من الشريط العلوي وراقب متى تتغيّر الكلمة. أعدها وكرّر التجربة.</li>
<li>افتح <code>TanStackRouterDevtools</code> وتصفّح شجرة المسارات كما بناها المولّد، وقارنها بأسماء ملفات <code>src/routes</code>. هذه الشجرة مرجعك في أيّ إضافة قادمة.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=13203s">فيديو الدرس: More Topics &amp; Outro</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/auth-2">شيفرة الدرس: فرع auth-2</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي: نظرة عامة على TanStack Router</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/route-masking">دليل تمويه المسارات</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/guide/navigation-blocking">دليل حجب التنقّل</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/routing/virtual-file-routes">دليل مسارات الملفّات الافتراضية</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «More Topics &amp; Outro» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,i={book:e,chapter:o,chapterTitle:t,slug:d,title:c,headings:a,html:n};export{e as book,o as chapter,t as chapterTitle,i as default,a as headings,n as html,d as slug,c as title};
