const s="kinney",o="aws",n="نشر تطبيقات الويب على AWS",a="cost-monitoring-and-budget-alarms",t="مراقبة التكاليف وإنذارات الميزانية",p=[{depth:2,id:"حدود-الطبقة-المجانية-لكل-خدمة-في-هذه-الدورة",text:"حدود الطبقة المجانية لكل خدمة في هذه الدورة"},{depth:3,id:"s3",text:"S3"},{depth:3,id:"cloudfront",text:"CloudFront"},{depth:3,id:"lambda",text:"Lambda"},{depth:3,id:"api-gateway",text:"API Gateway"},{depth:3,id:"dynamodb",text:"DynamoDB"},{depth:3,id:"route-53",text:"Route 53"},{depth:3,id:"cloudwatch",text:"CloudWatch"},{depth:2,id:"إعداد-إنذار-ميزانية",text:"إعداد إنذار ميزانية"},{depth:3,id:"استخدام-لوحة-التحكم",text:"استخدام لوحة التحكم"},{depth:3,id:"استخدام-cli",text:"استخدام CLI"},{depth:2,id:"لوحة-الفوترة-وcost-explorer",text:"لوحة الفوترة وCost Explorer"},{depth:3,id:"لوحة-الفوترة",text:"لوحة الفوترة"},{depth:3,id:"cost-explorer",text:"Cost Explorer"},{depth:2,id:"الخدمات-التي-تفاجئ-الناس",text:"الخدمات التي تفاجئ الناس"},{depth:2,id:"ميزانية-معقولة-لهذه-الدورة",text:"ميزانية معقولة لهذه الدورة"},{depth:2,id:"التنظيف",text:"التنظيف"}],l=`<p>أكثر ما يخيف في AWS ليس سياسات IAM ولا قوالب CloudFormation — بل صفحة الفوترة. فعلى عكس Vercel أو Netlify، حيث تختار خطة وتعرف ما ستدفعه، تكلّفك AWS بالضبط مقابل ما تستخدمه. وهذا رائع لكفاءة التكلفة على نطاق واسع. لكنه مرعب أثناء التعلم، لأن خدمة مهيّأة بشكل خاطئ يمكن أن تتراكم عليها الرسوم قبل أن تلاحظ.</p>
<p>إذا أردت أرقامًا حيّة بدلًا من لقطات وقت الدرس، فإن <a href="https://calculator.aws/">حاسبة أسعار AWS</a>، و<a href="https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/">صفحة أسعار AWS Budgets</a>، وصفحات أسعار الخدمات الحالية هي مصادر الحقيقة.</p>
<p>الخبر السار: كل ما بنيته في هذه الدورة يقع بارتياح ضمن الطبقة المجانية من AWS أو يكلّف قروشًا شهريًا. والخبر الأفضل: تمنحك AWS أدوات لإعداد إنذارات تنطلق قبل أن تنفق دولارًا واحدًا غير متوقع. أعدّها الآن، قبل أن تنساها.</p>
<h2 id="حدود-الطبقة-المجانية-لكل-خدمة-في-هذه-الدورة">حدود الطبقة المجانية لكل خدمة في هذه الدورة</h2>
<p>قبل إعداد إنذارات الميزانية، تحتاج إلى معرفة ما هو مجاني فعلًا. وهذه كل خدمة استخدمتها، مع حدود طبقتها المجانية:</p>
<h3 id="s3">S3</h3>
<p><strong>مجاني لمدة 12 شهرًا</strong> بعد إنشاء الحساب:</p>
<ul>
<li>5 GB من تخزين S3 Standard</li>
<li>20,000 طلب GET شهريًا</li>
<li>2,000 طلب PUT شهريًا</li>
</ul>
<p>بناء واجهة أمامية ثابتة نموذجي حجمه 5–50 MB. وستحتاج إلى تخزين نحو 100 نسخة مختلفة من موقع كبير لتقترب من حد 5 GB. وحدود الطلبات سخية بالمثل — فـ 20,000 طلب GET شهريًا يتجاوز بكثير ما ستولّده أثناء التطوير.</p>
<h3 id="cloudfront">CloudFront</h3>
<p><strong>مجاني دائمًا</strong> (بلا انتهاء بعد 12 شهرًا):</p>
<ul>
<li>1 TB من نقل البيانات الصادر شهريًا</li>
<li>10,000,000 طلب HTTP/HTTPS شهريًا</li>
<li>2,000,000 استدعاء لـ CloudFront Functions شهريًا</li>
</ul>
<p>هذا سخي للغاية. فموقع ثابت نموذجي يقدّم صفحات بحجم 100 KB سيحتاج إلى 10 ملايين مشاهدة صفحة شهريًا ليصل إلى حد نقل 1 TB. وإذا كان مشروعك الشخصي يحصل على 10 ملايين مشاهدة صفحة، فلديك أمور أكبر بكثير للتفكير فيها من فاتورة AWS. (تهانينا، بالمناسبة.)</p>
<h3 id="lambda">Lambda</h3>
<p><strong>مجاني دائمًا</strong> (بلا انتهاء بعد 12 شهرًا):</p>
<ul>
<li>1,000,000 استدعاء شهريًا</li>
<li>400,000 GB-ثانية من الحوسبة شهريًا</li>
</ul>
<p>GB-ثانية هي ثانية واحدة من التنفيذ بذاكرة 1 GB. فإذا كانت دالتك تستخدم 128 MB من الذاكرة وتعمل 200 ms لكل استدعاء، فكل استدعاء يستهلك 0.025 GB-ثانية. وبذلك المعدّل، تحصل على 16 مليون استدعاء شهريًا قبل أن تتجاوز حد الحوسبة. وسيكون حد الطلبات البالغ مليون هو قيدك أولًا — ومليون استدعاء API شهريًا تطبيق حقيقي، لا مشروع جانبي.</p>
<h3 id="api-gateway">API Gateway</h3>
<p><strong>مجاني لمدة 12 شهرًا</strong> بعد إنشاء الحساب:</p>
<ul>
<li>1,000,000 استدعاء HTTP API شهريًا</li>
<li>1,000,000 استدعاء REST API شهريًا</li>
</ul>
<p>بعد فترة الـ 12 شهرًا، تكلّف HTTP APIs دولارًا واحدًا لكل مليون طلب. وحتى تطبيق نشط باعتدال سيكلّف رقمًا أحادي الخانة شهريًا.</p>
<h3 id="dynamodb">DynamoDB</h3>
<p><strong>مجاني دائمًا</strong> (بلا انتهاء بعد 12 شهرًا):</p>
<ul>
<li>25 GB من التخزين</li>
<li>25 وحدة سعة قراءة (RCUs)</li>
<li>25 وحدة سعة كتابة (WCUs)</li>
</ul>
<p>حد التخزين 25 GB هائل لمعظم التطبيقات المدعومة بواجهة أمامية. ووحدات السعة تكفي لنحو 25 قراءة و25 كتابة في الثانية — بشكل مستمر ومتواصل. ولمشروع جانبي أو تطبيق إنتاجي صغير، لن تصل إلى هذه الحدود أبدًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إذا أنشأت جدول DynamoDB بوضع السعة عند الطلب (كما هو موصى به في هذه الدورة)، فتعامل مع تكاليف DynamoDB على أنها قائمة على الطلبات لا على حسابات السعة المهيّأة. وأسهل طريقة للبقاء دقيقًا هي فحص صفحة أسعار DynamoDB الحالية أو الحاسبة بدلًا من حفظ أرقام الطبقة المجانية القديمة.</p>
</blockquote>
<h3 id="route-53">Route 53</h3>
<p><strong>لا طبقة مجانية.</strong> تكلّف Route 53 دولارًا واحدًا لكل نطاق مستضاف شهريًا، إضافة إلى 0.40 دولار لكل مليون استعلام DNS لأول مليار استعلام. ولنطاق واحد بحركة مرور عادية، توقّع دفع نحو 0.50–1.00 دولار شهريًا. وهذه إحدى الخدمات القليلة في هذه الدورة التي تكلّف مالًا من اليوم الأول.</p>
<h3 id="cloudwatch">CloudWatch</h3>
<p><strong>مجاني دائمًا</strong> (بلا انتهاء بعد 12 شهرًا):</p>
<ul>
<li>10 مقاييس مراقبة مخصّصة أو تفصيلية</li>
<li>10 مقاييس إنذار قياسية</li>
<li>1,000,000 طلب API</li>
<li>5 GB إجمالًا عبر إدخال السجلات وتخزين الأرشيف وفحص Logs Insights</li>
<li>3 لوحات معلومات حتى 50 مقياسًا لكل منها</li>
</ul>
<p>ترسل Lambda السجلات إلى CloudWatch تلقائيًا. ومخصّص السجلات المشترك البالغ 5 GB هو أرجح مكان تصل فيه إلى حد — فإذا كانت دوال Lambda تسجّل بكثافة، فيمكنك تجاوزه بسرعة. اضبط احتفاظ السجلات على 7 أو 14 يومًا في مجموعات سجلاتك لإبقاء تكاليف التخزين منخفضة.</p>
<h2 id="إعداد-إنذار-ميزانية">إعداد إنذار ميزانية</h2>
<p>تتيح لك AWS Budgets تعريف حد إنفاق وتلقي إشعار عند الاقتراب منه. ويستغرق هذا خمس دقائق ويمكن أن ينقذك من فاتورة مفاجئة.</p>
<h3 id="استخدام-لوحة-التحكم">استخدام لوحة التحكم</h3>
<p>أسرع طريقة لإعداد ميزانيتك الأولى:</p>
<ol>
<li>افتح لوحة تحكم <strong>AWS Billing and Cost Management</strong>.</li>
<li>انقر <strong>Budgets</strong> في الشريط الجانبي الأيسر.</li>
<li>انقر <strong>Create budget</strong>.</li>
<li>اختر <strong>Customize (advanced)</strong> ثم <strong>Cost budget</strong>.</li>
<li>اضبط مبلغ الميزانية على قيمة منخفضة — 5 أو 10 دولارات شهريًا معقولة لحساب تعليمي.</li>
<li>أضف حد إشعار عند 80% من ميزانيتك. وأدخل عنوان بريدك الإلكتروني كهدف الإشعار.</li>
<li>أضف إشعارًا ثانيًا عند 100%.</li>
<li>انقر <strong>Create budget</strong>.</li>
</ol>
<h3 id="استخدام-cli">استخدام CLI</h3>
<p>يمكنك أيضًا إنشاء ميزانية برمجيًا. أولًا، أنشئ ملف JSON بتعريف ميزانيتك:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;BudgetName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-monthly&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;BudgetLimit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Amount&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;10&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Unit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USD&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;TimeUnit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MONTHLY&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;BudgetType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;COST&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم أنشئ إعداد الإشعار:</p>
<pre><code class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Notification&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;NotificationType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ACTUAL&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ComparisonOperator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GREATER_THAN&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Threshold&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">80</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ThresholdType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PERCENTAGE&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Subscribers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;SubscriptionType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;EMAIL&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Address&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;your-email@example.com&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Notification&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;NotificationType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ACTUAL&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ComparisonOperator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;GREATER_THAN&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Threshold&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">100</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;ThresholdType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;PERCENTAGE&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Subscribers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;SubscriptionType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;EMAIL&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Address&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;your-email@example.com&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>ثم شغّل:</p>
<pre><code class="language-bash">aws budgets create-budget \\
  --account-id 123456789012 \\
  --budget file://budget.json \\
  --notifications-with-subscribers file://notifications.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>ستتلقى بريدًا إلكترونيًا عندما يتجاوز إنفاقك الفعلي 80% و100% من ميزانيتك الشهرية البالغة 10 دولارات.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تنبيهات الميزانية ليست فورية. فتقيّم AWS الميزانيات عدة مرات يوميًا، لكن قد يكون هناك تأخير من عدة ساعات بين تكبّدك رسمًا وانطلاق التنبيه. لا تعتمد على تنبيهات الميزانية كسقف إنفاق صارم — فهي نظام إنذار مبكر، لا مفتاح إيقاف.</p>
</blockquote>
<h2 id="لوحة-الفوترة-وcost-explorer">لوحة الفوترة وCost Explorer</h2>
<p>تساعدك أداتان في لوحة تحكم AWS على فهم أين يذهب مالك:</p>
<h3 id="لوحة-الفوترة">لوحة الفوترة</h3>
<p>تعرض <strong>Billing and Cost Management Dashboard</strong> رسوم شهرك الحالي مقسّمة حسب الخدمة. افتحها من شريط التنقل العلوي في لوحة التحكم (انقر اسم حسابك، ثم «Billing and Cost Management»). وهذه هي الصفحة التي ينبغي أن تفحصها مرة أسبوعيًا أثناء تعلم AWS.</p>
<p><img src="/arabic-cs-library/images/kinney/696aad4443332714.webp" alt="الصفحة الرئيسية لـ Billing and Cost Management وهي تعرض ملخّص التكلفة ومراقب التكلفة ولوحات الإجراءات الموصى بها."></p>
<p>تعرض لوحة المعلومات:</p>
<ul>
<li><strong>رسوم الشهر حتى تاريخه</strong> مقسّمة حسب الخدمة</li>
<li><strong>استخدام الطبقة المجانية</strong> الذي يوضح مقدار ما استهلكته من الطبقة المجانية لكل خدمة</li>
<li><strong>الرسوم المتوقعة لنهاية الشهر</strong> بناءً على نمط استخدامك الحالي</li>
</ul>
<p>إذا تعذّر على مستخدم <code>admin</code> لديك فتح هذه الصفحة، فالأرجح أنك تجاوزت <strong>وصول مستخدمي وأدوار IAM إلى معلومات الفوترة</strong> أثناء إعداد الحساب الأولي. عُد إلى <a href="https://stevekinney.com/courses/aws/creating-and-securing-an-aws-account">إنشاء حساب AWS وتأمينه</a> ومكّنه من صفحة إعدادات الفوترة بوصفك المستخدم الجذر.</p>
<h3 id="cost-explorer">Cost Explorer</h3>
<p><strong>Cost Explorer</strong> أقوى. فهو يتيح لك تصوّر الإنفاق بمرور الوقت، والتصفية حسب الخدمة، وتحديد الاتجاهات. وهو مفيد خاصة للإجابة عن أسئلة مثل «لماذا قفزت فاتورتي هذا الشهر؟» — فيمكنك التعمّق في خدمات فردية ورؤية الإنفاق يومًا بيوم.</p>
<p>لتمكين Cost Explorer:</p>
<ol>
<li>افتح لوحة تحكم الفوترة.</li>
<li>انقر <strong>Cost Explorer</strong> في الشريط الجانبي الأيسر.</li>
<li>انقر <strong>Launch Cost Explorer</strong> إن كانت هذه أول مرة لك.</li>
</ol>
<p>Cost Explorer نفسه مجاني للوظائف الأساسية. أما نسخة API فتكلّف لكل طلب، لكنك لا تحتاج إلى API للتحقيق اليدوي.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>مكّن <strong>Free Tier usage alerts</strong> في تفضيلات الفوترة. انتقل إلى Billing، ثم Preferences، ثم Billing Preferences، وحدّد «Receive Free Tier Usage Alerts». وستراسلك AWS عندما تقترب أي خدمة من 85% من حد طبقته المجانية — وهو تنبيه منفصل وأكثر تفصيلًا من إنذار الميزانية الذي أعددته أعلاه.</p>
</blockquote>
<h2 id="الخدمات-التي-تفاجئ-الناس">الخدمات التي تفاجئ الناس</h2>
<p>معظم الخدمات في هذه الدورة إما مجانية دائمًا أو تقع بارتياح ضمن الطبقة المجانية لمدة 12 شهرًا لأحمال التطوير. لكن قليلًا منها فاجأ الناس:</p>
<p><strong>النطاقات المستضافة في Route 53</strong> تكلّف 0.50 دولار شهريًا لكل نطاق. فإذا أنشأت نطاقات مستضافة متعددة أثناء التجربة، فكل واحد يكلّف 0.50 دولار شهريًا سواء استخدمته أم لا. احذف النطاقات المستضافة التي لا تستخدمها.</p>
<p><strong>تخزين CloudWatch Logs</strong> يكلّف 0.03 دولار لكل GB شهريًا بعد الطبقة المجانية. فإذا كانت دوال Lambda تسجّل مخرجات مطوّلة في كل استدعاء ولم تضبط سياسة احتفاظ قط، فستتراكم السجلات بلا نهاية. اضبط فترة احتفاظ على كل مجموعة سجلات.</p>
<p><strong>الموارد المنسية</strong> هي الخطر الحقيقي. وقد لُدغت من هذا أكثر من مرة. فدالة Lambda لا تُستدعى لا تكلّف شيئًا. أما جدول DynamoDB بسعة مهيّأة لا يقرأ منه أحد فلا يزال يكلّف مالًا مقابل معدّل النقل المهيّأ. وعنوان Elastic IP مخصّص لكنه غير مرتبط بمثيل عامل يكلّف 0.005 دولار في الساعة. والنمط دائمًا هو نفسه: أنشأت شيئًا أثناء التجربة، ونسيته، فتراكمت عليه الرسوم بهدوء.</p>
<p>شغّل هذا دوريًا لفحص الموارد التي ربما نسيتها:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">ls</span> --region us-east-1
</code></pre>
<pre><code class="language-bash">aws dynamodb list-tables --region us-east-1 --output json
</code></pre>
<pre><code class="language-bash">aws lambda list-functions --region us-east-1 --output json
</code></pre>
<p>إذا ظهر أي شيء لا تعرفه أو لم تعد تحتاجه، فاحذفه.</p>
<h2 id="ميزانية-معقولة-لهذه-الدورة">ميزانية معقولة لهذه الدورة</h2>
<p>إذا كنت تعمل في هذه الدورة بمشروع واحد، فهذا ما تتوقعه:</p>
<ul>
<li><strong>خلال فترة الطبقة المجانية البالغة 12 شهرًا:</strong> 0.50–2.00 دولار شهريًا، ومعظمها من Route 53 وتجاوزات CloudWatch الطفيفة.</li>
<li><strong>بعد انتهاء الطبقة المجانية البالغة 12 شهرًا:</strong> 2.00–5.00 دولار شهريًا لتطبيق منخفض الحركة، بافتراض بقاء Lambda وDynamoDB ضمن حدودهما المجانية الدائمة.</li>
<li><strong>إذا ساء شيء:</strong> أكثر فاتورة مفاجئة شيوعًا هي 10–50 دولارًا من مورد منسي أو إعداد تسجيل مطوّل أكثر من المتوقع.</li>
</ul>
<p>إعداد إنذار ميزانية شهري بقيمة 10 دولارات — وهو ما فعلته للتو — يغطّي كل هذه السيناريوهات. فإذا تلقيت ذلك البريد، فإما أن شيئًا مهيّأ بشكل خاطئ أو أنك تتلقى حركة مرور أكبر مما توقعت. وفي الحالتين، ستريد معرفة ذلك.</p>
<h2 id="التنظيف">التنظيف</h2>
<p>حين تنتهي من الدورة، احذف الميزانية لتجنّب إشعارات قديمة:</p>
<pre><code class="language-bash">aws budgets delete-budget \\
  --account-id 123456789012 \\
  --budget-name my-frontend-app-monthly
</code></pre>
<p>استبدل <code>123456789012</code> بمعرّف حسابك الفعلي. تكلّف AWS Budgets 0.02 دولار لكل ميزانية يوميًا بعد أول ميزانيتين — ولحساب تعليمي واحد، يبقى هذا ضمن الطبقة المجانية إلى ما لا نهاية، لكن حذفها يبقي الأمور مرتبة.</p>
`,u={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:l};export{s as book,o as chapter,n as chapterTitle,u as default,p as headings,l as html,a as slug,t as title};
