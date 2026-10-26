const s="kinney",c="aws",n="نشر تطبيقات الويب على AWS",a="writing-your-first-iam-policy",t="كتابة أول سياسة IAM لك",p=[{depth:2,id:"بنية-سياسة-iam",text:"بنية سياسة IAM"},{depth:3,id:"version",text:"Version"},{depth:3,id:"statement",text:"Statement"},{depth:3,id:"sid-اختياري",text:"Sid (اختياري)"},{depth:3,id:"effect",text:"Effect"},{depth:3,id:"action",text:"Action"},{depth:3,id:"resource",text:"Resource"},{depth:2,id:"سياسة-حقيقية-وصول-للقراءة-فقط-إلى-حاوية-الأصول",text:"سياسة حقيقية: وصول للقراءة فقط إلى حاوية الأصول"},{depth:2,id:"إرفاق-سياسة",text:"إرفاق سياسة"},{depth:3,id:"باستخدام-وحدة-التحكم",text:"باستخدام وحدة التحكم"},{depth:3,id:"باستخدام-cli",text:"باستخدام CLI"},{depth:3,id:"باستخدام-sdk",text:"باستخدام SDK"},{depth:2,id:"سياسة-أكثر-عملية-أذونات-النشر",text:"سياسة أكثر عملية: أذونات النشر"},{depth:2,id:"مفاتيح-الشروط-تضييق-عمليات-السماح",text:"مفاتيح الشروط: تضييق عمليات السماح"},{depth:2,id:"أخطاء-شائعة",text:"أخطاء شائعة"}],o=`<p>تعرف كيف أن لكل نقطة نهاية API في تطبيق الواجهة الأمامية برمجية وسيطة تتحقق مما إذا كان المستخدم يملك الأذونات الصحيحة قبل السماح بمرور الطلب؟ سياسات IAM هي تلك البرمجية الوسيطة، لكن لكل AWS. إنها مستندات JSON—وأنت تعرف JSON بالفعل—وبمجرد أن تفهم الحقول الخمسة المهمة، تستطيع كتابتها من الصفر بدلًا من نسخ أمثلة من Stack Overflow والأمل في الأفضل. (لقد مررت بذلك، وكلنا مررنا بذلك.)</p>
<p>إن أردت نسخة AWS من لغة السياسات أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html">مرجع سياسات IAM بصيغة JSON</a> هو المصدر الرسمي الموثوق.</p>
<h2 id="بنية-سياسة-iam">بنية سياسة IAM</h2>
<p>كل <strong>سياسة IAM</strong> تتبع الشكل نفسه:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DescriptiveNameForThisStatement&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>خمسة حقول. هذا كل شيء. لنفصّل كل واحد منها.</p>
<h3 id="version">Version</h3>
<pre><code class="language-json"><span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span>
</code></pre>
<p>هذه هي <strong>نسخة لغة السياسة</strong>، لا تاريخًا تحدّثه. والنسخة الحالية (والعملية الوحيدة) هي <code>2012-10-17</code>. طرحتها AWS في 2012 وأبقتها منذ ذلك الحين. وهناك نسخة أقدم (<code>2008-10-17</code>) تفتقر إلى ميزات مثل متغيرات السياسة—لا تستخدمها.</p>
<p>أدرج هذا الحقل دائمًا، واضبطه دائمًا على <code>2012-10-17</code>، ثم انتقل.</p>
<h3 id="statement">Statement</h3>
<p>الـ <strong>Statement</strong> مصفوفة من قواعد الأذونات الفردية. كل عنصر في المصفوفة قاعدة واحدة تسمح أو تمنع إجراءات محددة على موارد محددة. ويمكن لسياسة واحدة أن تحتوي عدة بيانات:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span> <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>يمكنك دمجها في بيان واحد بمصفوفة إجراءات (سنصل إلى ذلك)، لكن فصلها يحافظ على قابلية قراءة كل قاعدة.</p>
<h3 id="sid-اختياري">Sid (اختياري)</h3>
<p>الـ <strong>Sid</strong> (معرّف البيان) تسمية اختيارية مقروءة بشريًا للبيان. ولا أثر وظيفي له على التقييم—فهو لك ولزملائك البشر فقط.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowReadAccessToAssetsBucket&quot;</span>
</code></pre>
<p>أنصحك بإدراج واحد دائمًا. فعندما تحدّق في سياسة بعد ستة أشهر محاولًا معرفة ما تفعله، فإن Sid وصفيًا يستحق وزنه ذهبًا.</p>
<h3 id="effect">Effect</h3>
<p><strong>Effect</strong> إما <code>&quot;Allow&quot;</code> أو <code>&quot;Deny&quot;</code>. ولا خيارات أخرى. ويحدد هذا الحقل ما إذا كان البيان يمنح الوصول أو يحجبه.</p>
<p>كما شرحنا في <a href="https://stevekinney.com/courses/aws/iam-mental-model">النموذج الذهني لـ IAM</a>، فإن <code>Deny</code> يتغلب على <code>Allow</code> دائمًا. فإذا قال بيان <code>Allow</code> وقال آخر <code>Deny</code> للإجراء والمورد نفسيهما، يفوز الـ <code>Deny</code>.</p>
<blockquote>
<p><strong><code>Effect</code> مقابل <code>Action</code></strong></p>
<p>فكّر في <strong>Action</strong> باعتباره <em>ما يحاول شخص فعله</em> وفي <strong>Effect</strong> باعتباره <em>جواب AWS على ذلك الطلب</em>. <code>s3:GetObject</code> هو الإجراء، و<code>&quot;Allow&quot;</code> أو <code>&quot;Deny&quot;</code> هو الأثر. وجمعهما معًا يعطيك قاعدة كاملة: «اسمح بـ <code>s3:GetObject</code>» أو «امنع <code>s3:GetObject</code>». الإجراء نفسه، والحكم مختلف.</p>
</blockquote>
<h3 id="action">Action</h3>
<p>يحدد <strong>Action</strong> عمليات AWS API التي ينطبق عليها البيان. وتتبع الإجراءات النمط <code>&lt;service&gt;:&lt;operation&gt;</code>:</p>
<ul>
<li><code>s3:GetObject</code>—قراءة ملف من S3</li>
<li><code>s3:PutObject</code>—رفع ملف إلى S3</li>
<li><code>cloudfront:CreateInvalidation</code>—إبطال الملفات المخزنة مؤقتًا في CloudFront</li>
<li><code>iam:CreateUser</code>—إنشاء مستخدم IAM جديد</li>
</ul>
<p>يمكنك تحديد إجراء واحد كسلسلة أو إجراءات متعددة كمصفوفة:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:DeleteObject&quot;</span><span class="hljs-punctuation">]</span>
</code></pre>
<p>تعمل أحرف البدل أيضًا. <code>s3:*</code> تعني «كل إجراءات S3»، و<code>s3:Get*</code> تعني «كل إجراءات S3 التي تبدأ بـ Get». وسنتحدث عن سبب خطورة أحرف البدل في <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ أقل الامتيازات</a>.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لست بحاجة إلى حفظ أسماء الإجراءات. فـ AWS توثّق كل إجراء لكل خدمة. ابحث عن «IAM actions for S3» أو «IAM actions for CloudFront» وستجد القائمة الكاملة. ويمكن أن تساعدك أداة AWS Policy Generator أيضًا في اكتشاف أسماء الإجراءات الصحيحة.</p>
</blockquote>
<h3 id="resource">Resource</h3>
<p>يحدد حقل <strong>Resource</strong> موارد AWS التي ينطبق عليها البيان، معرّفة بـ <strong>ARN (Amazon Resource Name)</strong>. والـ ARNs معرّفات فريدة عالميًا تتبع هذه الصيغة:</p>
<pre><code>arn:aws:&lt;service&gt;:&lt;region&gt;:&lt;account-id&gt;:&lt;resource-type&gt;/&lt;resource-id&gt;
</code></pre>
<p>بضعة أمثلة:</p>
<table>
<thead>
<tr>
<th>المورد</th>
<th>ARN</th>
</tr>
</thead>
<tbody>
<tr>
<td>حاوية S3 محددة</td>
<td><code>arn:aws:s3:::my-frontend-app-assets</code></td>
</tr>
<tr>
<td>كل الكائنات في تلك الحاوية</td>
<td><code>arn:aws:s3:::my-frontend-app-assets/*</code></td>
</tr>
<tr>
<td>توزيع CloudFront محدد</td>
<td><code>arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7</code></td>
</tr>
<tr>
<td>كل الموارد (خطير)</td>
<td><code>*</code></td>
</tr>
</tbody>
</table>
<p>لاحظ أن ARNs حاويات S3 لا تتضمن منطقة أو معرّف حساب—فأسماء الحاويات فريدة عالميًا، لذا لا تحتاج AWS إليها لتحديد المورد. أما الخدمات الأخرى فتشمل المنطقة والحساب. وستألف نمط كل خدمة مع استخدامك لها.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>الفرق بين <code>arn:aws:s3:::my-frontend-app-assets</code> (الحاوية نفسها) و<code>arn:aws:s3:::my-frontend-app-assets/*</code> (الكائنات داخل الحاوية) مهم. فـ <code>s3:ListBucket</code> يعمل على الحاوية، بينما <code>s3:GetObject</code> يعمل على الكائنات داخل الحاوية. وإذا خلطت بينهما، فلن تعمل سياستك ولن تخبرك رسائل الخطأ بالسبب.</p>
</blockquote>
<h2 id="سياسة-حقيقية-وصول-للقراءة-فقط-إلى-حاوية-الأصول">سياسة حقيقية: وصول للقراءة فقط إلى حاوية الأصول</h2>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>جميع سياسات IAM في هذا الدرس متاحة كملفات JSON مستقلة في <a href="https://github.com/stevekinney/scratch-lab/tree/main/policies/iam-policies">مستودع Scratch Lab</a>.</p>
</blockquote>
<p>لنكتب سياسة تمنح وصولًا للقراءة فقط إلى حاوية أصولك الثابتة. هذا نوع السياسة الذي ترفقه بدور لا يحتاج إلا إلى تقديم الملفات—لا رفع ولا حذف.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowListBucket&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowReadObjects&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:GetObject&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><em>ملاحظة:</em> <code>s3:ListBucket</code> يعمل على ARN الحاوية، لا على الكائنات داخلها.</p>
<p><em>ملاحظة:</em> <code>s3:GetObject</code> يعمل على الكائنات، لذا ينتهي الـ ARN بـ <code>/*</code>.</p>
<p>بيانان، ونطاقان مختلفان للموارد. الأول يتيح لك سرد ما في الحاوية، والثاني يتيح لك قراءة الملفات الفردية. ومعهما تحصل على وصول للقراءة فقط. لا أكثر.</p>
<h2 id="إرفاق-سياسة">إرفاق سياسة</h2>
<p>السياسة الموجودة بمفردها لا تفعل شيئًا. عليك إرفاقها بمستخدم أو مجموعة أو دور.</p>
<h3 id="باستخدام-وحدة-التحكم">باستخدام وحدة التحكم</h3>
<ol>
<li>انتقل إلى <strong>IAM</strong> &gt; <strong>Policies</strong> &gt; <strong>Create policy</strong>.</li>
<li>انقر على علامة تبويب <strong>JSON</strong> (المحرر المرئي جيد للاستكشاف، لكن يجب أن تعرف JSON).</li>
<li>الصق مستند سياستك.</li>
<li>انقر <strong>Next</strong>، وأعطها اسمًا مثل <code>S3AssetsReadOnly</code>، ثم انقر <strong>Create policy</strong>.</li>
<li>انتقل إلى المستخدم أو الدور الذي تريد منحه هذه الأذونات.</li>
<li>انقر <strong>Add permissions</strong> &gt; <strong>Attach policies</strong>.</li>
<li>ابحث عن <code>S3AssetsReadOnly</code> وأرفقها.</li>
</ol>
<h3 id="باستخدام-cli">باستخدام CLI</h3>
<p>يمكنك أيضًا إنشاء السياسات وإرفاقها عبر AWS CLI:</p>
<pre><code class="language-bash">aws iam create-policy \\
  --policy-name S3AssetsReadOnly \\
  --policy-document file://s3-assets-read-only.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يعيد هذا الأمر <strong>ARN</strong> الخاص بالسياسة، وستحتاجه لإرفاقها:</p>
<pre><code class="language-bash">aws iam attach-user-policy \\
  --user-name admin \\
  --policy-arn arn:aws:iam::123456789012:policy/S3AssetsReadOnly \\
  --region us-east-1 \\
  --output json
</code></pre>
<h3 id="باستخدام-sdk">باستخدام SDK</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IAMClient</span>, <span class="hljs-title class_">CreatePolicyCommand</span>, <span class="hljs-title class_">AttachUserPolicyCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-iam&#x27;</span>;

<span class="hljs-keyword">const</span> iam = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IAMClient</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });

<span class="hljs-keyword">const</span> policy = <span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CreatePolicyCommand</span>({
    <span class="hljs-title class_">PolicyName</span>: <span class="hljs-string">&#x27;S3AssetsReadOnly&#x27;</span>,
    <span class="hljs-title class_">PolicyDocument</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
      <span class="hljs-title class_">Version</span>: <span class="hljs-string">&#x27;2012-10-17&#x27;</span>,
      <span class="hljs-title class_">Statement</span>: [
        {
          <span class="hljs-title class_">Sid</span>: <span class="hljs-string">&#x27;AllowListBucket&#x27;</span>,
          <span class="hljs-title class_">Effect</span>: <span class="hljs-string">&#x27;Allow&#x27;</span>,
          <span class="hljs-title class_">Action</span>: [<span class="hljs-string">&#x27;s3:ListBucket&#x27;</span>],
          <span class="hljs-title class_">Resource</span>: <span class="hljs-string">&#x27;arn:aws:s3:::my-frontend-app-assets&#x27;</span>,
        },
        {
          <span class="hljs-title class_">Sid</span>: <span class="hljs-string">&#x27;AllowReadObjects&#x27;</span>,
          <span class="hljs-title class_">Effect</span>: <span class="hljs-string">&#x27;Allow&#x27;</span>,
          <span class="hljs-title class_">Action</span>: [<span class="hljs-string">&#x27;s3:GetObject&#x27;</span>],
          <span class="hljs-title class_">Resource</span>: <span class="hljs-string">&#x27;arn:aws:s3:::my-frontend-app-assets/*&#x27;</span>,
        },
      ],
    }),
  }),
);

<span class="hljs-keyword">await</span> iam.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">AttachUserPolicyCommand</span>({
    <span class="hljs-title class_">UserName</span>: <span class="hljs-string">&#x27;admin&#x27;</span>,
    <span class="hljs-title class_">PolicyArn</span>: policy.<span class="hljs-property">Policy</span>!.<span class="hljs-property">Arn</span>!,
  }),
);
</code></pre>
<h2 id="سياسة-أكثر-عملية-أذونات-النشر">سياسة أكثر عملية: أذونات النشر</h2>
<p>إليك شيئًا أقرب إلى ما ستحتاجه فعلًا. تتيح هذه السياسة لمستخدم مزامنة ملفات إلى حاوية S3 وإنشاء إبطالات CloudFront—وهما العمليتان اللازمتان لنشر واجهة أمامية ثابتة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowS3Sync&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;s3:PutObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:DeleteObject&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;s3:ListBucket&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;arn:aws:s3:::my-frontend-app-assets/*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AllowCloudFrontInvalidation&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;cloudfront:CreateInvalidation&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:cloudfront::123456789012:distribution/E1A2B3C4D5E6F7&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><em>ملاحظة:</em> النطاق محصور في توزيع محدد واحد، لا في كل التوزيعات في الحساب.</p>
<p>لاحظ أن حقل <strong>Resource</strong> في بيان CloudFront يستهدف توزيعًا محددًا عبر ARN الخاص به. فلا يستطيع المستخدم إبطال ذاكرات التخزين المؤقت في توزيعات أخرى—فقط في التوزيع الذي حددته. وهذا مقصود.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>عند بناء سياسة، ابدأ بالسؤال: «ما أوامر CLI أو استدعاءات SDK التي يحتاج هذا المستخدم إلى تشغيلها؟» فكل أمر CLI يقابل إجراء IAM واحدًا أو أكثر. <code>aws s3 sync</code> يحتاج <code>s3:PutObject</code> و<code>s3:DeleteObject</code> و<code>s3:ListBucket</code>، و<code>aws cloudfront create-invalidation</code> يحتاج <code>cloudfront:CreateInvalidation</code>. اعمل بالاتجاه المعاكس من الأوامر إلى السياسة.</p>
</blockquote>
<h2 id="مفاتيح-الشروط-تضييق-عمليات-السماح">مفاتيح الشروط: تضييق عمليات السماح</h2>
<p>الحقول الخمسة أعلاه (<code>Version</code> و<code>Statement</code> و<code>Effect</code> و<code>Action</code> و<code>Resource</code>) تشكّل سياسة صالحة. والحقل السادس، <code>Condition</code>، يتيح لك تضييق السماح كي يعمل فقط عندما تطابق سمات طلب معينة. وهو ما يحوّل «اسمح بهذا الإجراء على هذا المورد» إلى «اسمح بهذا الإجراء على هذا المورد <em>فقط عندما يأتي الطلب من منطقتي أنا</em>» أو «فقط عندما يكون عنوان IP المصدر للمتصل ضمن نطاق معين».</p>
<p>مثال ملموس واحد: قصر مستخدم IAM على عمليات في <code>us-east-1</code> فقط. فحتى لو كان لديه إذن استدعاء <code>ec2:RunInstances</code>، يرفض الشرط الاستدعاء ما لم يكن الطلب محصور النطاق في <code>us-east-1</code>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;*&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;*&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Condition&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;StringEquals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;aws:RequestedRegion&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;us-east-1&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><code>aws:RequestedRegion</code> هو <strong>مفتاح شرط عالمي</strong>—متاح في كل طلب. ومن المفاتيح الأخرى الجديرة بالمعرفة:</p>
<ul>
<li><strong><code>aws:SourceIp</code></strong> — وصول محصور بنطاق CIDR (شبكات المكتب).</li>
<li><strong><code>aws:SourceVpc</code></strong> — من VPC محدد فقط (للأحمال الخاصة).</li>
<li><strong><code>aws:MultiFactorAuthPresent</code></strong> — اشتراط MFA للإجراءات الحساسة.</li>
<li><strong><code>aws:PrincipalTag/&lt;tagKey&gt;</code></strong> — تحكم بنمط ABAC عبر وسم المتصل.</li>
</ul>
<p>القائمة الكاملة موجودة في <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html">مرجع مفاتيح سياق الشروط العالمية في AWS</a>.</p>
<h2 id="أخطاء-شائعة">أخطاء شائعة</h2>
<p><strong>نسيان حقل <code>Version</code>.</strong> بدونه، ترجع AWS إلى لغة سياسات 2008، التي تتصرف بشكل مختلف. أدرج دائمًا <code>&quot;Version&quot;: &quot;2012-10-17&quot;</code>.</p>
<p><strong>استخدام <code>Resource: &quot;*&quot;</code> بدافع العادة.</strong> هذا يمنح الوصول إلى كل مورد من نوع الإجراء في حسابك. وأحيانًا يكون ضروريًا (إجراءات IAM مثل <code>iam:ListUsers</code> لا تدعم قيودًا على مستوى المورد)، لكن بالنسبة إلى S3 وCloudFront، احصر النطاق دائمًا في ARNs محددة.</p>
<p><strong>الخلط بين ARNs الحاويات وARNs الكائنات.</strong> <code>arn:aws:s3:::my-bucket</code> هو الحاوية، و<code>arn:aws:s3:::my-bucket/*</code> هو الكائنات داخل الحاوية. فبعض الإجراءات تعمل على الحاوية (مثل <code>s3:ListBucket</code>)، وأخرى تعمل على الكائنات (مثل <code>s3:GetObject</code>). وإذا لم تعمل سياستك، فهذا أول ما تتحقق منه.</p>
<p>أنت تعرف الآن كيف تكتب سياسة من الصفر. وفي <a href="https://stevekinney.com/courses/aws/principle-of-least-privilege">مبدأ أقل الامتيازات</a>، سنتحدث عن كيفية التأكد من أن سياساتك لا تمنح وصولًا أكثر مما ينبغي.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:o};export{s as book,c as chapter,n as chapterTitle,l as default,p as headings,o as html,a as slug,t as title};
