const e="kinney",s="aws",n="نشر تطبيقات الويب على AWS",o="wildcard-certificates-and-multiple-domains",a="الشهادات الشاملة والنطاقات المتعددة",c=[{depth:2,id:"الشهادات-الشاملة",text:"الشهادات الشاملة"},{depth:3,id:"ما-لا-تغطيه-الشهادات-الشاملة",text:"ما لا تغطيه الشهادات الشاملة"},{depth:3,id:"التحقق-من-الشهادات-الشاملة",text:"التحقق من الشهادات الشاملة"},{depth:2,id:"أسماء-النطاقات-البديلة-sans",text:"أسماء النطاقات البديلة (SANs)"},{depth:3,id:"حدود-الأسماء-البديلة-في-acm",text:"حدود الأسماء البديلة في ACM"},{depth:2,id:"متى-تستخدم-كلا-منهما",text:"متى تستخدم كلًّا منهما"},{depth:2,id:"النمط-الشائع-في-الواجهة-الأمامية",text:"النمط الشائع في الواجهة الأمامية"},{depth:2,id:"التحقق-من-شهادتك",text:"التحقق من شهادتك"}],t=`<p>حتى الآن، كنّا نطلب شهادة تغطّي نطاقًا محددًا ونطاقه الفرعي <code>www</code>. ينجح ذلك تمامًا عندما تعرف بالضبط أي أسماء المضيفين تحتاجها. لكن ماذا يحدث عندما تنمو واجهتك الأمامية؟ قد تحتاج إلى <code>staging.example.com</code> لبيئة اختبار، و<code>api.example.com</code> لواجهتك الخلفية، و<code>docs.example.com</code> لموقع التوثيق الخاص بك. وطلب شهادة جديدة لكل نطاق فرعي يصبح أمرًا مملًّا بسرعة.</p>
<p>إذا أردت الصياغة الرسمية من AWS لسلوك الشهادات في هذا الدرس، فإن <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">دليل مستخدم AWS Certificate Manager</a> هو المرجع الموثوق.</p>
<p>تدعم ACM استراتيجيتين لتغطية عدة أسماء مضيفين: <strong>الشهادات الشاملة (wildcard)</strong> و<strong>أسماء النطاقات البديلة (SANs)</strong>. ولكل منهما مقايضاته، ومعرفة متى تستخدم أيًّا منهما ستوفّر عليك عبئًا لا داعي له في إدارة الشهادات.</p>
<p><img src="/arabic-cs-library/images/kinney/8c129427a2d979c6.svg" alt="مخطط يقارن تغطية الشهادات لكلٍّ من النطاق الجذري فقط والنطاق الشامل وSAN عبر أسماء نطاقات مثال، بما في ذلك الحالات المستثناة."></p>
<h2 id="الشهادات-الشاملة">الشهادات الشاملة</h2>
<p>تغطّي <strong>الشهادة الشاملة</strong> نطاقًا واحدًا وكل نطاقاته الفرعية على مستوى واحد. وتستخدم الصياغة نجمة: <code>*.example.com</code>.</p>
<pre><code class="language-bash">aws acm request-certificate \\
  --domain-name <span class="hljs-string">&quot;*.example.com&quot;</span> \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>هذه الشهادة الواحدة تغطّي:</p>
<ul>
<li><code>www.example.com</code></li>
<li><code>staging.example.com</code></li>
<li><code>api.example.com</code></li>
<li><code>docs.example.com</code></li>
<li>أي نطاق فرعي آخر لـ <code>example.com</code></li>
</ul>
<p>يمكنك إنشاء نطاقات فرعية جديدة في أي وقت، وستكون مغطاة تلقائيًا بالشهادة الموجودة. لا طلب شهادة جديد، ولا تحقق جديد، ولا انتظار.</p>
<h3 id="ما-لا-تغطيه-الشهادات-الشاملة">ما لا تغطيه الشهادات الشاملة</h3>
<p>تطابق الشهادات الشاملة مستوى واحدًا فقط من النطاقات الفرعية. <code>*.example.com</code> تغطّي <code>www.example.com</code> لكنها <strong>لا</strong> تغطّي ما يلي (وهذا ما يفاجئ الناس):</p>
<ul>
<li><code>example.com</code> (النطاق الجذري نفسه)</li>
<li><code>beta.staging.example.com</code> (على مستوى اثنين)</li>
</ul>
<p>إذا أردت النطاق الجذري وكل النطاقات الفرعية معًا، فستحتاج إلى تضمين كليهما في طلب الشهادة:</p>
<pre><code class="language-bash">aws acm request-certificate \\
  --domain-name example.com \\
  --subject-alternative-names <span class="hljs-string">&quot;*.example.com&quot;</span> \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تغطّي هذه الشهادة <code>example.com</code> وكل نطاق فرعي على مستوى واحد. وهذا هو النمط الأكثر شيوعًا لنشر الواجهات الأمامية—فأنت تريد أن يعمل موقعك على <code>example.com</code> وعلى <code>www.example.com</code> معًا، وتريد مساحة لإضافة المزيد من النطاقات الفرعية لاحقًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>قيمة <code>--domain-name</code> هي النطاق الأساسي على الشهادة. أما قائمة <code>--subject-alternative-names</code> فتضيف نطاقات إضافية. يُدرج النطاق الأساسي تلقائيًا في قائمة الأسماء البديلة (SANs)، لذا لا حاجة إلى ذكره مرتين.</p>
</blockquote>
<h3 id="التحقق-من-الشهادات-الشاملة">التحقق من الشهادات الشاملة</h3>
<p>يعمل التحقق عبر DNS للشهادة الشاملة بالطريقة نفسها المتبعة مع نطاق محدد. تُنشئ ACM سجل CNAME للنطاق الشامل، وتضيفه أنت إلى نظام DNS لديك. ويبدو السجل هكذا:</p>
<table>
<thead>
<tr>
<th>اسم السجل</th>
<th>نوع السجل</th>
<th>قيمة السجل</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>_abc123.example.com</code></td>
<td>CNAME</td>
<td><code>_def456.acm-validations.aws</code></td>
</tr>
</tbody>
</table>
<p>لاحظ أن سجل التحقق خاص بـ <code>example.com</code> وليس بـ <code>*.example.com</code>. تتحقق ACM من أنك تتحكم بالنطاق الأب، وهذا كافٍ لإثبات أنك تتحكم بكل النطاقات الفرعية تحته.</p>
<p>عندما تتضمن شهادتك كلاً من <code>example.com</code> و<code>*.example.com</code>، تُنشئ ACM سجل CNAME واحدًا للتحقق يغطيهما معًا — وتضيفه مرة واحدة فقط.</p>
<h2 id="أسماء-النطاقات-البديلة-sans">أسماء النطاقات البديلة (SANs)</h2>
<p>تتيح لك <strong>أسماء النطاقات البديلة</strong> إدراج أسماء مضيفين محددة على شهادة واحدة. فبدلًا من استخدام شهادة شاملة، تسرد بالضبط النطاقات التي ينبغي أن تغطّيها الشهادة:</p>
<pre><code class="language-bash">aws acm request-certificate \\
  --domain-name example.com \\
  --subject-alternative-names www.example.com staging.example.com api.example.com \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تغطّي هذه الشهادة أربعة أسماء مضيفين بالضبط: <code>example.com</code> و<code>www.example.com</code> و<code>staging.example.com</code> و<code>api.example.com</code>. ولا شيء غيرها.</p>
<p>كل اسم بديل (SAN) ينتمي إلى نطاق مختلف يتطلب سجل تحقق DNS خاصًا به. وإذا كانت كل الأسماء البديلة نطاقات فرعية للنطاق نفسه، فقد تحصل على عدد أقل من سجلات التحقق (فـ ACM يزيل التكرار عندما يستطيع ذلك).</p>
<h3 id="حدود-الأسماء-البديلة-في-acm">حدود الأسماء البديلة في ACM</h3>
<p>تسمح ACM بما يصل إلى <strong>10 أسماء نطاقات</strong> لكل شهادة افتراضيًا (اسم النطاق الأساسي زائد ما يصل إلى 9 أسماء بديلة إضافية). ويمكنك طلب زيادة الحد عبر دعم AWS إن احتجت إلى المزيد، بحد أقصى 100.</p>
<p>في معظم مشاريع الواجهة الأمامية، 10 أكثر من كافٍ. وإذا وصلت إلى هذا الحد، فالشهادة الشاملة على الأرجح هي الخيار الأفضل.</p>
<h2 id="متى-تستخدم-كلا-منهما">متى تستخدم كلًّا منهما</h2>
<p><strong>استخدم شهادة شاملة عندما:</strong></p>
<ul>
<li>تتوقع إضافة نطاقات فرعية مع الوقت ولا تريد إعادة إصدار الشهادة</li>
<li>تشغّل عدة بيئات على نطاقات فرعية (<code>staging.example.com</code>، <code>preview.example.com</code>)</li>
<li>تريد شهادة واحدة تغطّي أي نطاق فرعي مستقبلي دون تخطيط مسبق</li>
</ul>
<p><strong>استخدم أسماء بديلة محددة عندما:</strong></p>
<ul>
<li>تحتاج إلى تغطية نطاقات ليست نطاقات فرعية للأب نفسه (مثل <code>example.com</code> و<code>example.org</code>)</li>
<li>تتطلب سياسة الأمان لديك أن تُدرج الشهادات أسماء المضيفين المستخدمة فعلًا فقط</li>
<li>تريد سجلًا تدقيقيًا يوضح بالضبط أسماء المضيفين التي تغطّيها الشهادة</li>
</ul>
<p><strong>استخدم كليهما معًا عندما:</strong></p>
<ul>
<li>تريد النطاق الجذري وكل النطاقات الفرعية ونطاقًا أو أكثر غير مرتبط على الشهادة نفسها</li>
</ul>
<pre><code class="language-bash">aws acm request-certificate \\
  --domain-name example.com \\
  --subject-alternative-names <span class="hljs-string">&quot;*.example.com&quot;</span> docs.another-domain.com \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تغطّي هذه <code>example.com</code> وكل نطاق فرعي لـ <code>example.com</code> و<code>docs.another-domain.com</code>. وستحتاج إلى سجلات تحقق DNS في منطقة DNS لكلٍّ من <code>example.com</code> و<code>another-domain.com</code>.</p>
<h2 id="النمط-الشائع-في-الواجهة-الأمامية">النمط الشائع في الواجهة الأمامية</h2>
<p>بالنسبة إلى نشر واجهة أمامية نموذجي على AWS، هذا ما أوصي به:</p>
<pre><code class="language-bash">aws acm request-certificate \\
  --domain-name example.com \\
  --subject-alternative-names <span class="hljs-string">&quot;*.example.com&quot;</span> \\
  --validation-method DNS \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>يمنحك هذا شهادة واحدة تغطّي النطاق الجذري وأي نطاق فرعي. يمكنك توجيه <code>www.example.com</code> إلى توزيع CloudFront الخاص بك اليوم، وإنشاء <code>staging.example.com</code> الأسبوع القادم، وإضافة <code>api.example.com</code> الشهر المقبل—كل ذلك دون لمس ACM مرة أخرى.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تذكّر من <a href="https://stevekinney.com/courses/aws/requesting-a-certificate-in-acm">طلب شهادة في ACM</a>: شهادات CloudFront <strong>يجب</strong> أن تكون في <code>us-east-1</code>. وهذا ينطبق على الشهادات الشاملة والشهادات متعددة الأسماء البديلة بالتساوي. حدّد دائمًا <code>--region us-east-1</code>.</p>
</blockquote>
<h2 id="التحقق-من-شهادتك">التحقق من شهادتك</h2>
<p>بعد اكتمال التحقق، تأكد من أن الشهادة تغطّي النطاقات التي تتوقعها:</p>
<pre><code class="language-bash">aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \\
  --region us-east-1 \\
  --output json \\
  --query <span class="hljs-string">&quot;Certificate.SubjectAlternativeNames&quot;</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-punctuation">[</span><span class="hljs-string">&quot;example.com&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;*.example.com&quot;</span><span class="hljs-punctuation">]</span>
</code></pre>
<p>إذا كان نطاق ما مفقودًا، فلا يمكنك إضافته إلى شهادة موجودة. ستحتاج إلى طلب شهادة جديدة بقائمة النطاقات الصحيحة واستبدال القديمة على توزيع CloudFront الخاص بك. وهذا سبب آخر للبدء بشهادة شاملة—فهي تمنحك مساحة للنمو دون استبدال الشهادات.</p>
`,d={book:e,chapter:"aws",chapterTitle:n,slug:o,title:a,headings:c,html:t};export{e as book,s as chapter,n as chapterTitle,d as default,c as headings,t as html,o as slug,a as title};
