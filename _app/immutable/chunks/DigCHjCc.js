const t="kinney",e="testing",s="مدخل إلى الاختبارات",n="index",i="مقدمة إلى الاختبارات",a=[{depth:2,id:"المتطلبات-السابقة",text:"المتطلبات السابقة"},{depth:2,id:"الأساسيات",text:"الأساسيات"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"},{depth:2,id:"المكتبات-والأدوات-المستخدمة",text:"المكتبات والأدوات المستخدمة"},{depth:3,id:"التعمق-أكثر-في-vitest",text:"التعمّق أكثر في Vitest"}],r=`<p>المواد في هذه الدورة معدّة لتُرافق دورة <a href="https://frontendmasters.com/courses/testing/?utm_source=kinney&amp;utm_medium=social&amp;code=kinney">مقدمة إلى الاختبارات</a> مع <a href="https://frontendmasters.com/?utm_source=kinney&amp;utm_medium=social&amp;code=kinney">Frontend Masters</a>.</p>
<p>الاختبار يزيد ثقتك بأن تطبيقاتك ستعمل كما هو متوقّع. ستعلّمك هذه الورشة أساسيات الاختبار وتمنحك الأسس لكتابة شيفرة أكثر قابلية للاختبار في تطبيقاتك. ستُهيّئ بيئة اختبار فعّالة يكون فيها مُشغّل الاختبارات جزءًا من سير عمل التطوير لديك. وستكتسب خبرة عملية في كتابة اختبارات الوحدة واختبارات التكامل أثناء استكشاف أدوات الاختبار الشائعة.</p>
<h2 id="المتطلبات-السابقة">المتطلبات السابقة <span class="content-anchor" id="prerequisites"></span></h2>
<ul>
<li>فهم أساسي لـ JavaScript</li>
<li>إلمام بسطر الأوامر (مثلًا بما يكفي للتنقل بين المجلدات وتشغيل بضعة أوامر)</li>
<li>خبرة بـ Node و<code>npm</code> و<code>git</code> وGithub.</li>
</ul>
<h2 id="الأساسيات">الأساسيات</h2>
<p>إليك بعض الموضوعات التي سنغطيها أثناء القيام ببعض الأنشطة العملية، لكنني أردت أيضًا أن أضمّن بعض المحتوى لترجع إليه لاحقًا.</p>
<ul>
<li><a href="https://stevekinney.com/courses/testing/running-tests">تشغيل الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/testing/how-tests-work">كيف تعمل الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/testing/filtering-tests">تصفية الاختبارات</a></li>
<li><a href="https://stevekinney.com/courses/testing/organizing-and-annotating-tests">تنظيم الاختبارات والتعليق عليها</a></li>
</ul>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<p>سنحاول في هذه الدورة أن ننحاز إلى التطبيق العملي، وألّا نخوض في الجوانب النظرية إلا عند الضرورة القصوى. أفضّل أن نقضي وقتنا في كتابة الاختبارات بدلًا من الحديث عن كتابتها. ومع ذلك، لديّ مجموعة من المواد عن التفكير في أفضل الممارسات فيما يتعلّق بالاختبار، ويسعدني أن تطالعها في وقت فراغك.</p>
<ul>
<li><a href="https://stevekinney.com/courses/testing/structure-of-a-unit-test">بنية اختبار الوحدة</a></li>
<li><a href="https://stevekinney.com/courses/testing/types-of-tests">أنواع الاختبارات: الوحدة والتكامل ومن طرف إلى طرف</a></li>
<li><a href="https://stevekinney.com/courses/testing/test-runners-and-assertion-libraries">مكوّنات الاختبار: مُشغّلات الاختبارات ومكتبات التحقّق</a></li>
<li><a href="https://stevekinney.com/courses/testing/assert-versus-expect">التحقّق مقابل التوقّع</a></li>
<li><a href="https://stevekinney.com/courses/testing/mocking-best-practices">البدائل المُحاكاة: أفضل الممارسات والمزالق الشائعة</a></li>
<li><a href="https://stevekinney.com/courses/testing/test-driven-development">ما هو التطوير المدفوع بالاختبارات؟</a></li>
<li><a href="https://stevekinney.com/courses/testing/organizing-and-annotating-tests">تنظيم اختباراتك والتعليق عليها</a></li>
<li><a href="https://stevekinney.com/courses/testing/strategies-for-testing-conditional-logic">استراتيجيات اختبار المنطق الشرطي</a></li>
</ul>
<h2 id="المكتبات-والأدوات-المستخدمة">المكتبات والأدوات المستخدمة</h2>
<p>على مدار هذه الدورة، سنستفيد من المكتبات التالية.</p>
<ul>
<li><a href="https://vitest.dev/">Vitest</a></li>
<li><a href="https://testing-library.com/">Testing Library</a></li>
<li><a href="https://playwright.dev/">Playwright</a></li>
</ul>
<p>حتى لو كنت تستخدم <a href="https://jestjs.io/">Jest</a>، فإن <em>كل</em> محتوى هذه الدورة تقريبًا ينطبق عليك. وإذا كنت فضوليًا، يمكنك القراءة أكثر في <a href="https://stevekinney.com/courses/testing/differences-between-jest-and-vitest">الفروق بين Jest وVitest</a>.</p>
<h3 id="التعمق-أكثر-في-vitest">التعمّق أكثر في Vitest</h3>
<p>بالإضافة إلى ذلك، لديّ بعض القراءات الإضافية عن موضوعات أكثر تقدمًا تقع خارج نطاق هذه الدورة.</p>
<ul>
<li><a href="https://stevekinney.com/courses/testing/advanced-test-configuration">تهيئة Vitest المتقدمة</a></li>
<li><a href="https://stevekinney.com/courses/testing/debugging-vitest-tests">التنقيح المتقدم في Vitest</a></li>
<li><a href="https://stevekinney.com/courses/testing/vitest-reporters">إنشاء مُبلّغين مخصّصين في Vitest</a></li>
<li><a href="https://stevekinney.com/courses/testing/custom-matchers">إنشاء مُطابِقات مخصّصة في Vitest</a></li>
<li><a href="https://stevekinney.com/courses/testing/test-context">سياقات الاختبار في Vitest</a></li>
<li><a href="https://stevekinney.com/courses/testing/running-tests-for-related-files">تشغيل اختبارات الملفات ذات الصلة في Vitest</a></li>
</ul>
`,o={book:t,chapter:e,chapterTitle:s,slug:n,title:i,headings:a,html:r};export{t as book,e as chapter,s as chapterTitle,o as default,a as headings,r as html,n as slug,i as title};
