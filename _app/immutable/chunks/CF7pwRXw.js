const e="kinney",c="aws",n="نشر تطبيقات الويب على AWS",o="cloudwatch-alarms-exercise",d="تمرين: إعداد إنذارات لدوال Lambda",a=[{depth:2,id:"لماذا-يهم-هذا",text:"لماذا يهم هذا"},{depth:2,id:"مهمتك",text:"مهمتك"},{depth:2,id:"إنشاء-موضوع-sns",text:"إنشاء موضوع SNS"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"الاشتراك-ببريدك-الإلكتروني",text:"الاشتراك ببريدك الإلكتروني"},{depth:3,id:"نقطة-تحقق-1",text:"نقطة تحقق"},{depth:2,id:"إنشاء-إنذار-عدد-الأخطاء",text:"إنشاء إنذار عدد الأخطاء"},{depth:3,id:"نقطة-تحقق-2",text:"نقطة تحقق"},{depth:2,id:"إنشاء-إنذار-المدة",text:"إنشاء إنذار المدة"},{depth:3,id:"نقطة-تحقق-3",text:"نقطة تحقق"},{depth:2,id:"اختبار-إنذار-الأخطاء",text:"اختبار إنذار الأخطاء"},{depth:3,id:"نقطة-تحقق-4",text:"نقطة تحقق"},{depth:2,id:"إطلاق-إنذار-حقيقي-اختياري",text:"إطلاق إنذار حقيقي (اختياري)"},{depth:3,id:"نقطة-تحقق-5",text:"نقطة تحقق"},{depth:2,id:"سرد-كل-الإنذارات-والتحقق-منها",text:"سرد كل الإنذارات والتحقق منها"},{depth:3,id:"نقطة-تحقق-6",text:"نقطة تحقق"},{depth:2,id:"ملخص-نقاط-التحقق",text:"ملخّص نقاط التحقق"},{depth:2,id:"تشخيص-الفشل",text:"تشخيص الفشل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"}],t=`<p>ستبني مسار تنبيه كاملًا من الصفر — موضوع SNS، واشتراك بريد إلكتروني، وإنذارَي CloudWatch يراقبان معدّل أخطاء دالة Lambda ومدة تنفيذها. ثم ستطلق الإنذارات عمدًا لتثبت أن المسار يعمل من طرف إلى طرف.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أردت إبقاء نسخة AWS من تدفّق الإنذار مفتوحة أثناء عملك، فأبقِ <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">نظرة CloudWatch العامة</a> قريبة. فهي أسرع طريقة للتحقق من تسميات لوحة التحكم ومصطلحات الإنذار عندما تتغيّر الواجهة.</p>
</blockquote>
<p>هذا هو إعداد المراقبة نفسه الذي ستستخدمه لأي دالة Lambda في الإنتاج. اجعله يعمل هنا، وستستطيع تكراره لكل دالة تنشرها.</p>
<h2 id="لماذا-يهم-هذا">لماذا يهم هذا</h2>
<p>تتطلب لوحات المعلومات منك أن تنظر إليها. وتتطلب السجلات منك أن تبحث فيها. ولا يوقظك أي منهما عندما يتعطّل شيء في الساعة 2 صباحًا. الإنذارات هي القطعة التي تُغلق الحلقة — فهي تراقب مقاييسك باستمرار وتُبلغك في اللحظة التي يتجاوز فيها شيء حدًّا. ومن دون إنذارات، تكون الفجوة بين «شيء ما تعطّل» و«شخص ما لاحظ» هي المدة التي يستغرقها مستخدم لتقديم شكوى. لقد كنت على طرفَي تلك الفجوة، وجانب الإنذار <em>بلا شك</em> أفضل.</p>
<h2 id="مهمتك">مهمتك</h2>
<p>أعدّ مسار مراقبة لـ <code>my-frontend-app-api</code> يقوم بما يلي:</p>
<ul>
<li>إرسال إشعارات بريد إلكتروني عبر موضوع SNS</li>
<li>إطلاق إنذار عندما يتجاوز عدد أخطاء Lambda 3 في فترة مدتها 5 دقائق</li>
<li>إطلاق إنذار عندما يتجاوز متوسط مدة تنفيذ Lambda ثانيتين</li>
<li>إمكانية اختباره بإطلاق كل إنذار عمدًا</li>
</ul>
<p>استخدم معرّف الحساب <code>123456789012</code> والمنطقة <code>us-east-1</code>.</p>
<h2 id="إنشاء-موضوع-sns">إنشاء موضوع SNS</h2>
<p>أنشئ موضوع SNS باسم <code>my-frontend-app-alerts</code> ليكون قناة الإشعارات لإنذاراتك.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>يعرض <code>aws sns list-topics --region us-east-1 --output json</code> موضوعًا بالـ ARN <code>arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts</code>.</p>
<h2 id="الاشتراك-ببريدك-الإلكتروني">الاشتراك ببريدك الإلكتروني</h2>
<p>اشترك بعنوان بريدك الإلكتروني في الموضوع. بعد تشغيل أمر الاشتراك، افحص صندوق الوارد بحثًا عن رسالة التأكيد وانقر رابط التأكيد.</p>
<h3 id="نقطة-تحقق-1">نقطة تحقق</h3>
<p>يعرض <code>aws sns list-subscriptions-by-topic --topic-arn arn:aws:sns:us-east-1:123456789012:my-frontend-app-alerts --region us-east-1 --output json</code> اشتراكك بـ ARN حقيقي (وليس <code>pending confirmation</code>).</p>
<h2 id="إنشاء-إنذار-عدد-الأخطاء">إنشاء إنذار عدد الأخطاء</h2>
<p>أنشئ إنذار CloudWatch باسم <code>my-frontend-app-api-error-count</code> يقوم بما يلي:</p>
<ul>
<li>يراقب مقياس <code>Errors</code> في مساحة الأسماء <code>AWS/Lambda</code></li>
<li>يستخدم بُعد <code>FunctionName</code> مضبوطًا على <code>my-frontend-app-api</code></li>
<li>يستخدم الإحصاءة <code>Sum</code></li>
<li>ينطلق عندما يكون عدد الأخطاء <strong>أكبر من 3</strong> في فترة واحدة مدتها 5 دقائق (300 ثانية)</li>
<li>يتطلب <strong>فترتَي تقييم متتاليتين</strong> قبل الإطلاق</li>
<li>يرسل إشعارات إلى موضوع SNS عند الانتقالين <code>ALARM</code> و<code>OK</code></li>
</ul>
<p>فكّر في أي <code>--comparison-operator</code> تحتاج. فـ«أكبر من 3» ليس مثل «أكبر من أو يساوي 3».</p>
<h3 id="نقطة-تحقق-2">نقطة تحقق</h3>
<p>يُرجع <code>aws cloudwatch describe-alarms --alarm-names my-frontend-app-api-error-count --region us-east-1 --output json</code> الإنذار مع:</p>
<ul>
<li><code>StateValue</code> بقيمة <code>INSUFFICIENT_DATA</code> (طبيعي لإنذار جديد)</li>
<li><code>Threshold</code> بقيمة <code>3.0</code></li>
<li><code>ComparisonOperator</code> بقيمة <code>GreaterThanThreshold</code></li>
<li><code>Period</code> بقيمة <code>300</code></li>
<li><code>EvaluationPeriods</code> بقيمة <code>2</code></li>
</ul>
<h2 id="إنشاء-إنذار-المدة">إنشاء إنذار المدة</h2>
<p>أنشئ إنذار CloudWatch باسم <code>my-frontend-app-api-high-duration</code> يقوم بما يلي:</p>
<ul>
<li>يراقب مقياس <code>Duration</code> في مساحة الأسماء <code>AWS/Lambda</code></li>
<li>يستخدم بُعد <code>FunctionName</code> مضبوطًا على <code>my-frontend-app-api</code></li>
<li>يستخدم الإحصاءة <code>Average</code></li>
<li>ينطلق عندما يكون متوسط المدة <strong>أكبر من 2000 مللي ثانية</strong></li>
<li>يستخدم فترة مدتها 300 ثانية وفترتَي تقييم</li>
<li>يرسل إشعارات إلى موضوع SNS عند الانتقال إلى <code>ALARM</code></li>
</ul>
<p>تذكّر: يُقاس <code>Duration</code> في Lambda بالمللي ثانية.</p>
<h3 id="نقطة-تحقق-3">نقطة تحقق</h3>
<p>يُرجع <code>aws cloudwatch describe-alarms --alarm-names my-frontend-app-api-high-duration --region us-east-1 --output json</code> الإنذار مع:</p>
<ul>
<li><code>MetricName</code> بقيمة <code>Duration</code></li>
<li><code>Statistic</code> بقيمة <code>Average</code></li>
<li><code>Threshold</code> بقيمة <code>2000.0</code></li>
</ul>
<h2 id="اختبار-إنذار-الأخطاء">اختبار إنذار الأخطاء</h2>
<p>يمكنك اختبار مسار الإشعارات دون انتظار أخطاء حقيقية بضبط حالة الإنذار يدويًا:</p>
<ol>
<li>استخدم <code>aws cloudwatch set-alarm-state</code> لفرض انتقال <code>my-frontend-app-api-error-count</code> إلى الحالة <code>ALARM</code> بسبب <code>&quot;Testing alarm notification pipeline&quot;</code></li>
<li>افحص بريدك الإلكتروني بحثًا عن إشعار SNS</li>
<li>انتظر بضع دقائق — سيعود الإنذار إلى حالته الفعلية في التقييم التالي</li>
</ol>
<h3 id="نقطة-تحقق-4">نقطة تحقق</h3>
<ul>
<li>تلقّيت بريدًا إلكترونيًا من SNS يتضمن تفاصيل الإنذار</li>
<li>يتضمن البريد اسم الإنذار والسبب وانتقال الحالة</li>
</ul>
<h2 id="إطلاق-إنذار-حقيقي-اختياري">إطلاق إنذار حقيقي (اختياري)</h2>
<p>إذا أردت رؤية الإنذار ينطلق من مقاييس حقيقية بدلًا من تغيير حالة يدوي، يمكنك تعطيل دالة Lambda عمدًا:</p>
<ol>
<li>حدّث شيفرة دالة Lambda لديك لتُطلق خطأً عند كل استدعاء</li>
<li>استدعِ الدالة أكثر من 3 مرات باستخدام CLI</li>
<li>انتظر فترتَي تقييم مدة كل منهما 5 دقائق (حتى 10 دقائق)</li>
<li>افحص بريدك الإلكتروني بحثًا عن إشعار الإنذار</li>
</ol>
<p>لإنشاء دالة فاشلة، انشر معالجًا يُطلق خطأً دائمًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">APIGatewayProxyHandlerV</span>2 = <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Intentional error to trigger CloudWatch alarm&#x27;</span>);
};
</code></pre>
<p>بعد التحقق من انطلاق الإنذار، <strong>أعد نشر المعالج العامل</strong>. لا تترك دالة معطّلة منشورة.</p>
<h3 id="نقطة-تحقق-5">نقطة تحقق</h3>
<ul>
<li>انتقل الإنذار من <code>INSUFFICIENT_DATA</code> (أو <code>OK</code>) إلى <code>ALARM</code></li>
<li>تلقّيت إشعار بريد إلكتروني من SNS</li>
<li>بعد إعادة نشر المعالج العامل، يعود الإنذار إلى <code>OK</code> (قد يستغرق هذا حتى 10 دقائق)</li>
</ul>
<h2 id="سرد-كل-الإنذارات-والتحقق-منها">سرد كل الإنذارات والتحقق منها</h2>
<p>اسرد كل إنذاراتك ذات البادئة <code>my-frontend-app</code> وتأكد من أن كليهما مهيّأ بشكل صحيح:</p>
<pre><code class="language-bash">aws cloudwatch describe-alarms \\
  --alarm-name-prefix my-frontend-app \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="نقطة-تحقق-6">نقطة تحقق</h3>
<p>تُسرد إنذاران، وكلاهما يشير إلى موضوع SNS نفسه، مع المقاييس والحدود وفترات التقييم الصحيحة.</p>
<h2 id="ملخص-نقاط-التحقق">ملخّص نقاط التحقق</h2>
<ul>
<li>موضوع SNS <code>my-frontend-app-alerts</code> موجود</li>
<li>اشتراك البريد الإلكتروني مؤكّد (وليس <code>pending confirmation</code>)</li>
<li>إنذار عدد الأخطاء موجود بحدّ 3، وإحصاءة Sum، وفترة 300s، وفترتَي تقييم</li>
<li>إنذار المدة موجود بحدّ 2000ms، وإحصاءة Average، وفترة 300s، وفترتَي تقييم</li>
<li>اختبار حالة الإنذار اليدوي أنتج إشعار بريد إلكتروني</li>
<li>يظهر الإنذاران في <code>describe-alarms</code> بإعداد صحيح</li>
</ul>
<h2 id="تشخيص-الفشل">تشخيص الفشل</h2>
<ul>
<li><strong>الإنذار موجود لكنك لا تتلقى بريدًا أبدًا:</strong> لا يزال اشتراك SNS في حالة <code>PendingConfirmation</code>، أو وصل البريد إلى مجلد الرسائل غير المرغوب فيها ولم يُؤكَّد قط.</li>
<li><strong>لا يخرج الإنذار من <code>INSUFFICIENT_DATA</code> أبدًا:</strong> لا تطابق مساحة أسماء المقياس أو الأبعاد أو الإحصاءة المورد الذي يصدر البيانات فعلًا.</li>
<li><strong>يبقى الإنذار في <code>ALARM</code> بعد إصلاح المشكلة:</strong> تنتظر CloudWatch نوافذ التقييم التالية. امنحها وقتًا كافيًا لرؤية نقاط بيانات سليمة جديدة قبل افتراض أن الإعداد خاطئ.</li>
</ul>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>أضف إنذار 5XX لـ API Gateway.</strong> أنشئ إنذارًا ثالثًا يراقب مقياس <code>5XXError</code> في مساحة الأسماء <code>AWS/ApiGateway</code>. استخدم حدًّا صفريًا وفترة تقييم واحدة — أي خطأ خادم يجب أن يطلقه فورًا.</li>
<li><strong>أضف إجراء OK إلى إنذار المدة.</strong> حدّث إنذار المدة ليُبلغك أيضًا عند عودته إلى <code>OK</code>. استخدم <code>aws cloudwatch put-metric-alarm</code> بالمعاملات نفسها مع <code>--ok-actions</code>.</li>
<li><strong>افحص سجل الإنذار.</strong> شغّل <code>aws cloudwatch describe-alarm-history --alarm-name my-frontend-app-api-error-count --region us-east-1 --output json</code> لرؤية سجل انتقالات الحالة لإنذارك.</li>
</ul>
<p>حين تكون مستعدًا، قارن عملك بـ <a href="https://stevekinney.com/courses/aws/cloudwatch-alarms-solution">الحل: إعداد إنذارات لدوال Lambda</a>.</p>
`,s={book:e,chapter:"aws",chapterTitle:n,slug:o,title:d,headings:a,html:t};export{e as book,c as chapter,n as chapterTitle,s as default,a as headings,t as html,o as slug,d as title};
