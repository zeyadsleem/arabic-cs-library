const e="kinney",i="aws",o="نشر تطبيقات الويب على AWS",d="cloudfront-function-exercise",n="تمرين: إضافة دالة CloudFront",c=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهمّ هذا"},{depth:2,id:"مهمتك",text:"مهمتك"},{depth:2,id:"اكتب-دالة-رؤوس-الأمان",text:"اكتب دالة رؤوس الأمان"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقّق"},{depth:2,id:"أنشئ-دالة-رؤوس-الأمان-واختبرنها",text:"أنشئ دالة رؤوس الأمان واختبرنها"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقّق"},{depth:2,id:"اكتب-دالة-إعادة-التوجيه-القديمة",text:"اكتب دالة إعادة التوجيه القديمة"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقّق"},{depth:2,id:"أنشئ-دالة-إعادة-التوجيه-القديمة-واختبرنها",text:"أنشئ دالة إعادة التوجيه القديمة واختبرنها"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقّق"},{depth:2,id:"انشر-الدالتين",text:"انشر الدالتين"},{depth:3,id:"نقطة-تحقق-4",text:"نقطة تحقّق"},{depth:2,id:"اربط-الدالتين-بتوزيعك",text:"اربط الدالتين بتوزيعك"},{depth:3,id:"نقطة-تحقق-5",text:"نقطة تحقّق"},{depth:2,id:"تحقق-في-الإنتاج",text:"تحقق في الإنتاج"},{depth:3,id:"نقطة-تحقق-6",text:"نقطة تحقّق"},{depth:2,id:"ملخص-نقاط-التحقق",text:"ملخّص نقاط التحقّق"},{depth:2,id:"تشخيص-الأعطال",text:"تشخيص الأعطال"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],t=`<p>ستكتب وتنشر دالتَي CloudFront: واحدة تضيف رؤوس أمان إلى كل استجابة، وأخرى تعيد توجيه عنوان URL قديم إلى مسار جديد. بنهاية هذا التمرين، سيفرض توزيع CloudFront لديك رؤوس الأمان على جميع الاستجابات ويعيد توجيه <code>/old-path</code> تلقائيًا إلى <code>/new-path</code>—دون لمس أصلك أو كود تطبيقك.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهمّ هذا</h2>
<p>على Vercel أو Netlify، تهيّئ رؤوس الأمان في ملف <code>vercel.json</code> أو <code>_headers</code>. على AWS، يمكنك استخدام سياسة رؤوس استجابة CloudFront (التي تعدها في <a href="https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security">رؤوس CloudFront وCORS والأمان</a>)، لكن ذلك النهج إعداد ثابت. أما دالة CloudFront فتمنحك تحكمًا <strong>برمجيًا</strong> في الرؤوس—يمكنك إضافة رؤوس شرطيًا، أو تنويعها حسب المسار، أو تضمين قيم ديناميكية. ولإعادة التوجيه، تحل دالة CloudFront محل قاعدة إعادة توجيه كانت ستُثبَّت في كود تطبيقك.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت نسخة AWS من حدود وقت التشغيل وتدفق النشر مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html">دليل دوال CloudFront</a> قريبًا منك.</p>
</blockquote>
<p>يعزّز هذا التمرين سير عمل دوال CloudFront: اكتب الدالة، واختبرها، وانشرها، واربطها بسلوك. وبمجرد أن تتقن هذا السير، يمكنك تكييفه مع أي من حالات الاستخدام في <a href="https://stevekinney.com/courses/aws/edge-function-use-cases">حالات استخدام دوال الحافة</a>.</p>
<h2 id="مهمتك">مهمتك</h2>
<p>ابنِ وانشر دالتَي CloudFront:</p>
<ol>
<li><strong><code>security-headers</code></strong>—دالة استجابة مشاهد تضيف رؤوس أمان إلى كل استجابة من توزيعك.</li>
<li><strong><code>legacy-redirect</code></strong>—دالة طلب مشاهد تعيد توجيه الطلبات إلى <code>/old-path</code> نحو <code>/new-path</code> برمز حالة 301.</li>
</ol>
<p>استخدم التوزيع <code>E1A2B3C4D5E6F7</code>، والحساب <code>123456789012</code>، والمنطقة <code>us-east-1</code>.</p>
<h2 id="اكتب-دالة-رؤوس-الأمان">اكتب دالة رؤوس الأمان</h2>
<p>اكتب دالة CloudFront تضيف هذه الرؤوس إلى كل استجابة:</p>
<ul>
<li><code>Strict-Transport-Security</code>: <code>max-age=63072000; includeSubDomains; preload</code></li>
<li><code>X-Content-Type-Options</code>: <code>nosniff</code></li>
<li><code>X-Frame-Options</code>: <code>DENY</code></li>
<li><code>Referrer-Policy</code>: <code>strict-origin-when-cross-origin</code></li>
</ul>
<p>ينبغي أن تكون الدالة:</p>
<ul>
<li>باسم <code>security-headers</code></li>
<li>تستخدم بيئة التشغيل <code>cloudfront-js-2.0</code></li>
<li>تُفعَّل عند أحداث <code>viewer-response</code></li>
<li>تحافظ على أي رؤوس استجابة موجودة (لا تستبدل كائن الرؤوس بأكمله)</li>
</ul>
<h3 id="نقطة-تحقق">نقطة تحقّق</h3>
<p>لديك دالة JavaScript تأخذ حدثًا، وتضيف أربعة رؤوس إلى <code>event.response.headers</code>، وتعيد الاستجابة.</p>
<h2 id="أنشئ-دالة-رؤوس-الأمان-واختبرنها">أنشئ دالة رؤوس الأمان واختبرنها</h2>
<p>استخدم AWS CLI لإنشاء الدالة بـ <code>aws cloudfront create-function</code>. احفظ <code>ETag</code> من الاستجابة.</p>
<p>اختبر الدالة بحدث استجابة مشاهد تجريبي. ينبغي أن يتضمن الحدث التجريبي كائن استجابة أساسيًا فيه <code>statusCode: 200</code> ورأس موجود واحد على الأقل (مثل <code>content-type</code>).</p>
<p>تحقق من أن:</p>
<ul>
<li>الدالة تُنفَّذ دون أخطاء</li>
<li>تظهر رؤوس الأمان الأربعة في استجابة المخرجات</li>
<li>يُحافَظ على رأس <code>content-type</code> الأصلي</li>
</ul>
<h3 id="نقطة-تحقق-1">نقطة تحقّق</h3>
<p>يعيد <code>aws cloudfront test-function</code> نتيجة ناجحة مع رؤوس الأمان الأربعة كلها في الاستجابة والرؤوس الأصلية سليمة.</p>
<h2 id="اكتب-دالة-إعادة-التوجيه-القديمة">اكتب دالة إعادة التوجيه القديمة</h2>
<p>اكتب دالة CloudFront تقوم بما يلي:</p>
<ul>
<li>تتحقق مما إذا كان URI الطلب هو <code>/old-path</code></li>
<li>إذا طابق، تعيد استجابة إعادة توجيه 301 مع ضبط رأس <code>Location</code> على <code>/new-path</code></li>
<li>إذا لم يطابق، تمرّر الطلب دون تغيير</li>
</ul>
<p>ينبغي أن تكون الدالة:</p>
<ul>
<li>باسم <code>legacy-redirect</code></li>
<li>تستخدم بيئة التشغيل <code>cloudfront-js-2.0</code></li>
<li>تُفعَّل عند أحداث <code>viewer-request</code></li>
</ul>
<h3 id="نقطة-تحقق-2">نقطة تحقّق</h3>
<p>لديك دالة JavaScript تعيد استجابة 301 لـ <code>/old-path</code> وتعيد الطلب غير المعدّل لجميع المسارات الأخرى.</p>
<h2 id="أنشئ-دالة-إعادة-التوجيه-القديمة-واختبرنها">أنشئ دالة إعادة التوجيه القديمة واختبرنها</h2>
<p>أنشئ الدالة باستخدام CLI واختبرها بحدثين مختلفين:</p>
<ol>
<li>طلب إلى <code>/old-path</code>—ينبغي أن يعيد استجابة 301 مع <code>Location: /new-path</code></li>
<li>طلب إلى <code>/about</code>—ينبغي أن يعيد الطلب دون تغيير (تمرير)</li>
</ol>
<h3 id="نقطة-تحقق-3">نقطة تحقّق</h3>
<p>تنتج حالتا الاختبار المخرجات المتوقعة: إعادة توجيه لـ <code>/old-path</code> وتمرير لـ <code>/about</code>.</p>
<h2 id="انشر-الدالتين">انشر الدالتين</h2>
<p>انشر الدالتين من <code>DEVELOPMENT</code> إلى <code>LIVE</code> باستخدام <code>aws cloudfront publish-function</code>. تذكّر أن كل عملية نشر تتطلب <code>ETag</code> الحالي.</p>
<h3 id="نقطة-تحقق-4">نقطة تحقّق</h3>
<p>الدالتان في مرحلة <code>LIVE</code>. يمكنك التحقق بـ <code>aws cloudfront describe-function --name security-headers --stage LIVE --region us-east-1 --output json</code>.</p>
<h2 id="اربط-الدالتين-بتوزيعك">اربط الدالتين بتوزيعك</h2>
<p>استرجع تهيئة توزيعك وحدّث سلوك التخزين المؤقت الافتراضي ليتضمن ارتباطَي الدالتين:</p>
<ul>
<li><code>legacy-redirect</code> على حدث <code>viewer-request</code></li>
<li><code>security-headers</code> على حدث <code>viewer-response</code></li>
</ul>
<p>تذكّر: يمكن أن يكون للسلوك الواحد <strong>دالة واحدة</strong> لكل نوع حدث. أنت تربط دالتين مختلفتين بحدثين مختلفين على السلوك نفسه.</p>
<p>بعد التحديث، انتظر حتى تتغير حالة التوزيع من <code>InProgress</code> إلى <code>Deployed</code>.</p>
<h3 id="نقطة-تحقق-5">نقطة تحقّق</h3>
<p>يعرض <code>aws cloudfront get-distribution-config --id E1A2B3C4D5E6F7 --region us-east-1 --output json</code> ارتباطَي الدالتين في سلوك التخزين المؤقت الافتراضي.</p>
<h2 id="تحقق-في-الإنتاج">تحقق في الإنتاج</h2>
<p>اختبر رؤوس الأمان بإرسال طلب إلى توزيعك وفحص رؤوس الاستجابة:</p>
<pre><code class="language-bash">curl -I https://d111111abcdef8.cloudfront.net/
</code></pre>
<p>اختبر إعادة التوجيه:</p>
<pre><code class="language-bash">curl -I https://d111111abcdef8.cloudfront.net/old-path
</code></pre>
<h3 id="نقطة-تحقق-6">نقطة تحقّق</h3>
<ul>
<li>تتضمن استجابة رؤوس الأمان <code>Strict-Transport-Security</code> و<code>X-Content-Type-Options</code> و<code>X-Frame-Options</code> و<code>Referrer-Policy</code></li>
<li>يعيد طلب <code>/old-path</code> استجابة <code>301 Moved Permanently</code> مع <code>Location: /new-path</code></li>
</ul>
<h2 id="ملخص-نقاط-التحقق">ملخّص نقاط التحقّق</h2>
<ul>
<li>دالة <code>security-headers</code> تضيف أربعة رؤوس إلى استجابات المشاهد</li>
<li>دالة <code>legacy-redirect</code> تعيد 301 لـ <code>/old-path</code> وتمرّر الطلبات الأخرى</li>
<li>كلتا الدالتين تنجحان في <code>test-function</code> بالمخرجات المتوقعة</li>
<li>كلتا الدالتين منشورتان إلى <code>LIVE</code></li>
<li>كلتا الدالتين مرتبطتان بالسلوك الافتراضي على التوزيع <code>E1A2B3C4D5E6F7</code></li>
<li>يؤكد <code>curl -I</code> وجود رؤوس الأمان في الاستجابة</li>
<li>يؤكد <code>curl -I /old-path</code> إعادة التوجيه 301</li>
</ul>
<h2 id="تشخيص-الأعطال">تشخيص الأعطال</h2>
<ul>
<li><strong>اختبارات الدالة تنجح لكن سلوك الإنتاج لا يتغيّر أبدًا:</strong> لا تؤثر دوال CloudFront في المرور حتى تنشرها إلى <code>LIVE</code> وينتهي التوزيع من نشر الارتباط الجديد.</li>
<li><strong>إعادة التوجيه تعمل لكن الرؤوس مفقودة:</strong> الدالتان مرتبطتان بأنواع أحداث خاطئة. منطق إعادة التوجيه ينتمي إلى <code>viewer-request</code>، وتعديل الرؤوس ينتمي إلى <code>viewer-response</code>.</li>
<li><strong>كل المسارات تُعاد توجيهها بدلًا من <code>/old-path</code> فقط:</strong> شرطك واسع جدًا. أعد اختبار مقارنة URI الطلب قبل إعادة النشر.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>أضف رأس <code>Content-Security-Policy</code>.</strong> وسّع دالة رؤوس الأمان بتوجيه CSP. ابدأ بـ <code>default-src 'self'</code> وعدّل بناءً على ما يحمّله موقعك فعليًا.</li>
<li><strong>أعد توجيه مسارات متعددة.</strong> وسّع دالة إعادة التوجيه لتعالج خريطة من المسارات القديمة إلى الجديدة بدلًا من مسار واحد مثبّت في الكود. أبقِ الدالة أقل من 10 KB.</li>
<li><strong>ادمج الدالتين في واحدة.</strong> لا يمكنك أن تملك دالتَي CloudFront على نوع الحدث نفسه لسلوك واحد. لكن هل يمكنك معالجة رؤوس الأمان (استجابة المشاهد) وإعادة التوجيه (طلب المشاهد) بدالة واحدة إذا كانتا على حدثين مختلفين؟ تلميح: لا يمكنك—فهما تتطلبان نوعي حدث مختلفين. لكن الأمر يستحق التفكير لفهم القيد.</li>
</ul>
<p>عندما تكون مستعدًا، راجع عملك مقابل <a href="https://stevekinney.com/courses/aws/cloudfront-function-solution">الحل: إضافة دالة CloudFront إلى توزيعك</a>.</p>
`,l={book:e,chapter:"aws",chapterTitle:o,slug:d,title:n,headings:c,html:t};export{e as book,i as chapter,o as chapterTitle,l as default,c as headings,t as html,d as slug,n as title};
