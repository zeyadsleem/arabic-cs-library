const n="kinney",s="aws",t="نشر تطبيقات الويب على AWS",o="edge-compute-comparison",d="الحوسبة على الحافة: Lambda@Edge مقابل CloudFront Functions",r=[{depth:2,id:"لماذا-هذا-مهم",text:"لماذا هذا مهم"},{depth:2,id:"يبني-على",text:"يبني على"},{depth:2,id:"أين-تعمل-في-دورة-حياة-الطلب",text:"أين تعمل في دورة حياة الطلب"},{depth:2,id:"جدول-المقارنة",text:"جدول المقارنة"},{depth:2,id:"الفرق-في-وقت-التشغيل",text:"الفرق في وقت التشغيل"},{depth:2,id:"الفرق-في-التسعير",text:"الفرق في التسعير"},{depth:2,id:"مصفوفة-القرار",text:"مصفوفة القرار"},{depth:2,id:"نموذج-النشر",text:"نموذج النشر"},{depth:2,id:"التحقق",text:"التحقق"},{depth:2,id:"أنماط-الفشل-الشائعة",text:"أنماط الفشل الشائعة"}],e=`<p>صار Scratch Lab مباشرًا الآن، وهذا يعني أن المتطلبات الغريبة تبدأ بالظهور. يريد فريق التسويق اختبار A/B على القسم الرئيسي من الصفحة الرئيسية. وأنت تريد إعادة توجيه رابط حملة متقاعدة قبل أن يصل إلى أصلك إطلاقًا. ويريد فريق الأمن إضافة ترويسة في كل مكان. هذه ليست مشكلات من نوع «شغّل خلفية كاملة». هذه مشكلات <em>الحافة</em>.</p>
<p>إذا أردت أن تكون حدود ميزات AWS الدقيقة أمامك أثناء القراءة، فأبقِ <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html">دليل CloudFront Functions</a> و<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html">دليل Lambda@Edge</a> مفتوحين.</p>
<p>أنت تعرف بالفعل كيف تكتب دوال Lambda وكيف يقدّم CloudFront محتواك. والآن ستدفع الحوسبة إلى شبكة توصيل المحتوى (CDN) نفسها. وتمنحك AWS طريقتين لتشغيل الشيفرة على مواقع حافة CloudFront: <strong>Lambda@Edge</strong> و<strong>CloudFront Functions</strong>. وهما تحلّان مشكلات متداخلة، لكنهما غير قابلتين للتبادل — فأوقات التشغيل وحدود التنفيذ والتسعير مختلفة بما يكفي لأن يجعل اختيار الخاطئ منهما يهدر المال أو يمنعك من فعل ما تحتاجه.</p>
<p>فكّر في الأمر كالفرق بين Vercel Edge Function وVercel Serverless Function. إحداهما تعمل فورًا على الحافة بقيود ضيقة. والأخرى تمنحك وقت تشغيل كاملًا بقدرة أكبر وزمن استجابة أطول. وقد أجرت AWS المقايضة نفسها، لكن بأسماء مختلفة.</p>
<h2 id="لماذا-هذا-مهم">لماذا هذا مهم</h2>
<p>يظهر هذا القرار سريعًا في الأنظمة الحقيقية. فإن كان كل ما تحتاجه إعادة توجيه أو إعادة كتابة ترويسة، فـ Lambda@Edge مبالغة وأكثر تكلفة. وإذا كنت تحتاج إلى استدعاء أصل، أو التحقق من رمز باستخدام مكتبة، أو لمس جسم الطلب، فإن CloudFront Functions تصطدم بحائط فورًا. والدرس هنا ليس «الحوسبة على الحافة موجودة». الدرس هو «اختر أصغر أداة تستطيع فعل المهمة فعلًا».</p>
<h2 id="يبني-على">يبني على</h2>
<ul>
<li><a href="https://stevekinney.com/courses/aws/creating-a-cloudfront-distribution">إنشاء توزيع CloudFront</a></li>
<li><a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكات التخزين المؤقت وعمليات الإبطال</a></li>
<li><a href="https://stevekinney.com/courses/aws/what-is-lambda">ما هي Lambda ولماذا يهتمّ مهندسو الواجهة الأمامية</a></li>
</ul>
<h2 id="أين-تعمل-في-دورة-حياة-الطلب">أين تعمل في دورة حياة الطلب</h2>
<p>تتصل كل من Lambda@Edge وCloudFront Functions بدورة حياة الطلب في CloudFront، لكن في نقاط مختلفة. فـ CloudFront يعالج كل طلب عبر أربعة أحداث محتملة:</p>
<ol>
<li><strong>طلب المشاهد</strong> — يستقبل CloudFront طلبًا من العميل، قبل فحص الذاكرة المؤقتة.</li>
<li><strong>طلب الأصل</strong> — يمرّر CloudFront الطلب إلى الأصل، بعد عدم إصابة الذاكرة المؤقتة (cache miss).</li>
<li><strong>استجابة الأصل</strong> — يستقبل CloudFront الاستجابة من الأصل، قبل تخزينها مؤقتًا.</li>
<li><strong>استجابة المشاهد</strong> — يعيد CloudFront الاستجابة إلى العميل.</li>
</ol>
<p>تستطيع <strong>CloudFront Functions</strong> الارتباط بحدثي <strong>طلب المشاهد</strong> و<strong>استجابة المشاهد</strong> فقط. فهي تعترض حركة المرور قبل طبقة الذاكرة المؤقتة، وهذا يعني أنها تعمل في كل طلب منفرد — سواء كان مخزّنًا مؤقتًا أم لا.</p>
<p>وتستطيع <strong>Lambda@Edge</strong> الارتباط بـ<strong>الأحداث الأربعة كلها</strong>: طلب المشاهد، واستجابة المشاهد، وطلب الأصل، واستجابة الأصل. وهذا يجعل Lambda@Edge الخيار الوحيد عندما تحتاج إلى تعديل كيفية تحدّث CloudFront مع أصلك.</p>
<pre><code>flowchart LR
    Viewer[&quot;Viewer request&quot;] --&gt; Cache[&quot;CloudFront cache&quot;]
    Cache --&gt;|miss| OriginRequest[&quot;Origin request&quot;]
    OriginRequest --&gt; Origin[&quot;Origin&quot;]
    Origin --&gt; OriginResponse[&quot;Origin response&quot;]
    OriginResponse --&gt; ViewerResponse[&quot;Viewer response&quot;]

    Function[&quot;CloudFront Functions&quot;] -. viewer request / viewer response .-&gt; Viewer
    Function -.-&gt; ViewerResponse
    LambdaEdge[&quot;Lambda@Edge&quot;] -. all four events .-&gt; Viewer
    LambdaEdge -.-&gt; OriginRequest
    LambdaEdge -.-&gt; OriginResponse
    LambdaEdge -.-&gt; ViewerResponse
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا كنت تحتاج إلى تحويل الطلب قبل أن يصل إلى حاوية S3 لديك (مثلًا إعادة كتابة مسار URL)، فأنت تحتاج إلى مُشغِّل <strong>طلب الأصل</strong> — وهذا يعني Lambda@Edge.</p>
</blockquote>
<h2 id="جدول-المقارنة">جدول المقارنة</h2>
<p>إليك التفصيل جنبًا إلى جنب. وفي كل مرة تختار بينهما، ابدأ من هنا.</p>
<table>
<thead>
<tr>
<th>البُعد</th>
<th>CloudFront Functions</th>
<th>Lambda@Edge</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>وقت التشغيل</strong></td>
<td>JavaScript ‏(ECMAScript 5.1 مع ميزات مختارة من ES6–ES12)</td>
<td>Node.js أو Python</td>
</tr>
<tr>
<td><strong>موقع التنفيذ</strong></td>
<td>مواقع حافة CloudFront ‏(أكثر من 200)</td>
<td>ذاكرات الحافة الإقليمية (13 موقعًا)</td>
</tr>
<tr>
<td><strong>الأحداث المدعومة</strong></td>
<td>طلب المشاهد، استجابة المشاهد</td>
<td>طلب المشاهد، استجابة المشاهد، طلب الأصل، استجابة الأصل</td>
</tr>
<tr>
<td><strong>أقصى مدة تنفيذ</strong></td>
<td>أقل من مللي ثانية (تُقاس كاستهلاك حوسبة، لا بساعة جدارية)</td>
<td>5 ثوانٍ (أحداث المشاهد)، 30 ثانية (أحداث الأصل)</td>
</tr>
<tr>
<td><strong>الذاكرة</strong></td>
<td>2 MB</td>
<td>128 MB (أحداث المشاهد)، حتى 10,240 MB (أحداث الأصل)</td>
</tr>
<tr>
<td><strong>أقصى حجم للحزمة</strong></td>
<td>10 KB</td>
<td>1 MB (أحداث المشاهد)، 50 MB (أحداث الأصل)</td>
</tr>
<tr>
<td><strong>الوصول إلى الشبكة</strong></td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td><strong>الوصول إلى نظام الملفات</strong></td>
<td>لا</td>
<td>نعم (<code>/tmp</code> للقراءة فقط، حتى 512 MB)</td>
</tr>
<tr>
<td><strong>الوصول إلى جسم الطلب</strong></td>
<td>لا</td>
<td>نعم (أحداث الأصل فقط)</td>
</tr>
<tr>
<td><strong>متغيّرات البيئة</strong></td>
<td>لا</td>
<td>لا متغيّرات بيئة يحدّدها المستخدم</td>
</tr>
<tr>
<td><strong>التسعير</strong></td>
<td>0.10 دولار لكل مليون استدعاء</td>
<td>0.60 دولار لكل مليون استدعاء + 0.00005001 دولار لكل GB-ثانية</td>
</tr>
<tr>
<td><strong>الطبقة المجانية</strong></td>
<td>مليونان من الاستدعاءات شهريًا</td>
<td>لا يوجد مخصّص مجاني في طبقة CloudFront المجانية لـ Lambda@Edge</td>
</tr>
<tr>
<td><strong>منطقة النشر</strong></td>
<td>عالمية (لا حاجة إلى اختيار منطقة)</td>
<td>يجب النشر في <code>us-east-1</code>؛ وAWS تنسخ تلقائيًا</td>
</tr>
<tr>
<td><strong>السعة</strong></td>
<td>أكثر من 10,000,000 طلب في الثانية</td>
<td>آلاف التنفيذات المتزامنة لكل منطقة</td>
</tr>
</tbody>
</table>
<h2 id="الفرق-في-وقت-التشغيل">الفرق في وقت التشغيل</h2>
<p>هذا أكبر فرق مفاهيمي. فـ CloudFront Functions <strong>لا</strong> تشغّل Node.js. بل تشغّل وقت تشغيل JavaScript مبنيًا لغرض محدّد، متوافقًا مع ECMAScript 5.1 ويدعم ميزات مختارة من ES6 حتى ES12. لا تستطيع استخدام <code>require()</code> أو <code>import</code> لتحميل الوحدات. لا تستطيع استخدام AWS SDK. لا تستطيع إجراء طلبات HTTP. ما تحصل عليه هو معالجة نصوص وكائنات JavaScript خالصة — لا أكثر.</p>
<p>أما Lambda@Edge فتشغّل وقت تشغيل Node.js أو Python كاملًا. يمكنك تجميع حزم npm، واستدعاء واجهات API خارجية، والقراءة من DynamoDB، والتحقق من رموز JWT بمكتبة — أي شيء تستطيع دالة Lambda عادية فعله، ضمن حدود وقت التنفيذ.</p>
<p>إذا سبق أن كتبت برمجيات وسيطة (middleware) في Express أو Next.js، فستبدو CloudFront Functions كطبقة وسيطة مجرّدة. أما Lambda@Edge فتبدو كدالة بلا خادم كاملة تصادف أنها تعمل أقرب إلى مستخدميك.</p>
<h2 id="الفرق-في-التسعير">الفرق في التسعير</h2>
<p>CloudFront Functions أقل تكلفة بستة أضعاف تقريبًا لكل استدعاء من Lambda@Edge، ولا يوجد رسم قائم على المدة. فتدفع 0.10 دولار ثابتة لكل مليون استدعاء بغض النظر عن المدة التي تستغرقها كل دالة (طالما بقيت ضمن حد استهلاك الحوسبة).</p>
<p>وتتقاضى Lambda@Edge 0.60 دولار لكل مليون استدعاء <strong>إضافة إلى</strong> رسم لكل GB-ثانية مقابل وقت الحوسبة الذي تستخدمه دالتك. فلدالة تستخدم 128 MB وتعمل 50 مللي ثانية، تكون تكلفة الحوسبة تلك صغيرة — لكنني رأيتها تتراكم أسرع ممّا تتوقّع على نطاق واسع.</p>
<p>وتغطّي طبقة الاستخدام المجانية في CloudFront <strong>1 TB من نقل البيانات الصادر، و10 ملايين طلب HTTP/HTTPS، ومليوني استدعاء لـ CloudFront Functions شهريًا</strong>. وLambda@Edge مستثناة صراحةً من نطاق الطبقة المجانية ذلك، وهي طريقة مهذّبة من AWS لتقول: إذا كان بإمكان إعادة كتابة تافهة أن تكون CloudFront Function، فاجعلها CloudFront Function.</p>
<p>لموقع يعالج 100 مليون طلب شهريًا:</p>
<ul>
<li><strong>CloudFront Functions:</strong> 100 مليون × 0.10 دولار / 1M = <strong>10.00 دولارات</strong></li>
<li><strong>Lambda@Edge (أحداث المشاهد، 128 MB، 50 ms):</strong> 100M × 0.60 دولار / 1M + الحوسبة = نحو <strong>32.00 = 92.00 دولارًا</strong></li>
</ul>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تعمل دوال Lambda@Edge على <strong>ذاكرات الحافة الإقليمية</strong>، لا على كل موقع حافة في CloudFront. وهذا يعني أن زمن استجابتها أطول من CloudFront Functions لأحداث المشاهد. فإن كانت دالتك تفعل شيئًا بسيطًا مثل إعادة كتابة URL أو التلاعب بالترويسات، فـ CloudFront Functions أسرع وأرخص.</p>
</blockquote>
<h2 id="مصفوفة-القرار">مصفوفة القرار</h2>
<p>استخدم هذا عند الاختيار:</p>
<p><strong>اختر CloudFront Functions عندما:</strong></p>
<ul>
<li>تحتاج إلى التلاعب بالترويسات أو عناوين URL أو ملفات تعريف الارتباط في طلبات المشاهد أو استجاباته</li>
<li>يكون منطقك معالجة نصوص بسيطة (إعادات توجيه، وإعادات كتابة، وحقن ترويسات)</li>
<li>تحتاج إلى وقت تنفيذ أقل من مللي ثانية</li>
<li>تعمل على نطاق واسع والتكلفة تهمّ</li>
<li>لا تحتاج إلى وصول إلى الشبكة أو اعتماديات خارجية</li>
</ul>
<p><strong>اختر Lambda@Edge عندما:</strong></p>
<ul>
<li>تحتاج إلى تشغيل شيفرة على حدثي طلب الأصل أو استجابة الأصل</li>
<li>تحتاج إلى إجراء اتصالات شبكة (التحقق من رموز مقابل خدمة خارجية، وجلب إعدادات)</li>
<li>يتطلّب منطقك حزم npm أو AWS SDK</li>
<li>تحتاج إلى الوصول إلى جسم الطلب</li>
<li>تحتاج إلى أكثر من 2 MB من الذاكرة أو أكثر من بضع مللي ثوانٍ من وقت التنفيذ</li>
</ul>
<p><strong>لا تختر أيًّا منهما عندما:</strong></p>
<ul>
<li>تتولّى ميزات CloudFront المدمجة الأمر. فسياسات ترويسات الاستجابة (التي أعددتها في <a href="https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security">الترويسات وCORS وسياسات الأمان</a>) تستطيع إضافة ترويسات أمان بلا أي شيفرة. وسياسات التخزين المؤقت تستطيع التعامل مع تمرير سلاسل الاستعلام. لا تكتب دالة لشيء يفعله CloudFront أصلًا.</li>
</ul>
<h2 id="نموذج-النشر">نموذج النشر</h2>
<p>تنتشر CloudFront Functions فورًا. تكتب الدالة، وتنشرها، وتربطها بـ<strong>سلوك</strong> على توزيعك (تذكّر السلوكات من <a href="https://stevekinney.com/courses/aws/cache-behaviors-and-invalidations">سلوكات التخزين المؤقت وعمليات الإبطال</a>)، فتصبح سارية في غضون ثوانٍ.</p>
<p>أما دوال Lambda@Edge فيجب نشرها إلى <code>us-east-1</code> — وهو متطلّب المنطقة نفسه الذي صادفته مع شهادات ACM في <a href="https://stevekinney.com/courses/aws/certificate-renewal-and-us-east-1">تجديد الشهادة ومتطلّب us-east-1</a>. وبمجرد النشر، تنشر إصدارًا مرقّمًا (لا <code>$LATEST</code>)، فتنسخ AWS ذلك الإصدار إلى ذاكرات الحافة الإقليمية في أنحاء العالم. وهذا النسخ يستغرق بضع دقائق، ولا تستطيع حذف دالة Lambda@Edge حتى ينتهي CloudFront من إزالة كل النسخ المتماثلة.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تستطيع استخدام <code>$LATEST</code> مع Lambda@Edge. يجب أن تنشر إصدارًا مرقّمًا وتشير إلى ARN ذلك الإصدار تحديدًا عند ربط الدالة بسلوك CloudFront. وإن حاولت استخدام <code>$LATEST</code>، سيرفض CloudFront الارتباط.</p>
</blockquote>
<p>وبالمقارنة في يدك، ستكتب وتنشر واحدة من كل نوع في الدرسين التاليين. يغطّي <a href="https://stevekinney.com/courses/aws/writing-a-cloudfront-function">كتابة دالة CloudFront</a> دالة إعادة كتابة URL باستخدام وقت تشغيل JavaScript الخفيف. ويغطّي <a href="https://stevekinney.com/courses/aws/writing-a-lambda-at-edge-function">كتابة دالة Lambda@Edge</a> نشر دالة Lambda إلى الحافة بوقت تشغيل Node.js الكامل. ويفترض الدرسان أن لديك توزيع CloudFront يعمل بالفعل. وإن لم يكن لديك، فارجع وأعدّ واحدًا أولًا.</p>
<h2 id="التحقق">التحقق</h2>
<p>قبل أن تختار، أجبر نفسك على المرور بهذه القائمة:</p>
<ul>
<li>هل يستطيع المنطق أن يعمل كليًا في طلب المشاهد أو استجابة المشاهد؟</li>
<li>هل يحتاج إلى حزمة، أو اتصال شبكة، أو جسم طلب، أو حدث أصل؟</li>
<li>هل يحدث هذا في كل طلب على نطاق واسع، حيث تهمّ تكلفة كل استدعاء؟</li>
</ul>
<p>إذا كانت الإجابات الصادقة «نعم، لا، نعم»، فـ CloudFront Functions هي الخيار الصحيح على الأرجح.</p>
<h2 id="أنماط-الفشل-الشائعة">أنماط الفشل الشائعة</h2>
<ul>
<li><strong>اختيار Lambda@Edge لإعادة توجيه بسيطة:</strong> تدفع أكثر، وتنشر أبطأ، ولا تكسب شيئًا.</li>
<li><strong>اختيار CloudFront Functions لأي شيء يحتاج إلى وصول إلى الشبكة أو استدعاءات SDK:</strong> فوقت التشغيل لا يستطيع فعل ذلك.</li>
<li><strong>افتراض أن Lambda@Edge تدعم وسائل الراحة المعتادة في Lambda:</strong> فمتغيّرات البيئة التي يحدّدها المستخدم غير متاحة، وقواعد النشر أكثر صرامة.</li>
<li><strong>نسيان موضع الحدث:</strong> فدالة طلب المشاهد لا تستطيع أداء عمل طلب الأصل لمجرد أنك تتمنّى لو تستطيع.</li>
</ul>
`,i={book:n,chapter:"aws",chapterTitle:t,slug:o,title:d,headings:r,html:e};export{n as book,s as chapter,t as chapterTitle,i as default,r as headings,e as html,o as slug,d as title};
