const n="kinney",t="enterprise-ui",s="واجهات المؤسسات",e="frontend-security",o="أمن الواجهة الأمامية وسلامة سلسلة التوريد",a=[{depth:2,id:"نموذج-الثقة-في-المتصفح",text:"نموذج الثقة في المتصفح"},{depth:2,id:"سياسة-أمان-المحتوى",text:"سياسة أمان المحتوى"},{depth:3,id:"كيف-تعمل-توجيهات-csp",text:"كيف تعمل توجيهات CSP"},{depth:3,id:"سياسة-أمان-المحتوى-القائمة-على-الـnonce",text:"سياسة أمان المحتوى القائمة على الـnonce"},{depth:3,id:"سياسة-أمان-المحتوى-في-معماريات-الواجهات-المصغرة",text:"سياسة أمان المحتوى في معماريات الواجهات المصغّرة"},{depth:3,id:"نشر-سياسة-أمان-المحتوى-تدريجيا",text:"نشر سياسة أمان المحتوى تدريجيًا"},{depth:2,id:"الوقاية-من-xss-بما-يتجاوز-التهريب",text:"الوقاية من XSS بما يتجاوز التهريب"},{depth:3,id:"الأنواع-الموثوقة-trusted-types",text:"الأنواع الموثوقة (Trusted Types)"},{depth:3,id:"نواقل-xss-الأقل-شهرة",text:"نواقل XSS الأقل شهرة"},{depth:2,id:"أمن-سلسلة-توريد-الاعتمادات",text:"أمن سلسلة توريد الاعتمادات"},{depth:3,id:"تصنيف-الهجمات",text:"تصنيف الهجمات"},{depth:3,id:"انضباط-ملف-القفل",text:"انضباط ملف القفل"},{depth:3,id:"التدقيق-الآلي-في-ci",text:"التدقيق الآلي في CI"},{depth:3,id:"نظافة-الاعتمادات",text:"نظافة الاعتمادات"},{depth:2,id:"سلامة-الموارد-الفرعية",text:"سلامة الموارد الفرعية"},{depth:3,id:"سلامة-الموارد-الفرعية-والمعماريات-الديناميكية",text:"سلامة الموارد الفرعية والمعماريات الديناميكية"},{depth:2,id:"عزل-سكربتات-الطرف-الثالث-في-صناديق-رملية",text:"عزل سكربتات الطرف الثالث في صناديق رملية"},{depth:3,id:"استراتيجيات-العزل",text:"استراتيجيات العزل"},{depth:3,id:"حوكمة-مدير-الوسوم",text:"حوكمة مدير الوسوم"},{depth:2,id:"ترويسات-الأمان",text:"ترويسات الأمان"},{depth:3,id:"العزل-عبر-الأصول",text:"العزل عبر الأصول"},{depth:2,id:"حماية-البيانات-من-جهة-العميل",text:"حماية البيانات من جهة العميل"},{depth:3,id:"ما-ينبغي-ألا-يكون-في-الحزمة",text:"ما ينبغي ألا يكون في الحزمة"},{depth:2,id:"أمن-خط-الأنابيب",text:"أمن خط الأنابيب"},{depth:2,id:"الأمن-على-نطاق-تنظيمي",text:"الأمن على نطاق تنظيمي"},{depth:3,id:"هرم-الأمن",text:"هرم الأمن"},{depth:3,id:"نظام-التصميم-كرافعة-أمنية",text:"نظام التصميم كرافعة أمنية"},{depth:2,id:"الامتثال-والجاهزية-للتدقيق",text:"الامتثال والجاهزية للتدقيق"},{depth:2,id:"الخلاصة-السريعة",text:"الخلاصة السريعة"},{depth:3,id:"نموذج-الثقة-في-المتصفح-1",text:"نموذج الثقة في المتصفح"},{depth:3,id:"سياسة-أمان-المحتوى-1",text:"سياسة أمان المحتوى"},{depth:3,id:"أمن-سلسلة-التوريد",text:"أمن سلسلة التوريد"},{depth:3,id:"عزل-شيفرة-الطرف-الثالث",text:"عزل شيفرة الطرف الثالث"}],c=`<p>كان أمن الواجهة الأمامية محادثة قصيرة في ما مضى. هرّب مخرجاتك، واضبط بعض الترويسات، ولا تضع الأسرار في الحزمة. هذا كان كل شيء تقريبًا. كانت الواجهة الأمامية طبقة تصيير رفيعة، والعمل الأمني الحقيقي يجري على الخادم.</p>
<p>لكن هذا ليس موضعنا اليوم. فواجهات المؤسسات الحديثة عملاء متخمون. تحتوي منطق العمل، وحالة المصادقة، وبيانات المستخدم، وشجرة اعتمادات فيها ألف حزمة عابرة — كل واحدة منها مدخل محتمل للمهاجم. ويحمّل التطبيق سكربتات من أصول متعددة، ويتواصل مع خدمات خلفية عبر حدود ثقة، ويشغّل شيفرة طرف ثالث بالامتيازات نفسها التي تحظى بها شيفرتك. والوضع الأمني لهذا النظام ليس قائمة تحقق من الترويسات، بل انضباط معماري.</p>
<h2 id="نموذج-الثقة-في-المتصفح">نموذج الثقة في المتصفح</h2>
<p>الآلية الأمنية الأساسية في المتصفح هي <strong>سياسة الأصل نفسه</strong> (Same-Origin Policy، SOP): فالشيفرة من أصل واحد (المخطط + المضيف + المنفذ) لا تستطيع قراءة بيانات من أصل آخر. و<code>https://app.example.com</code> و<code>https://api.example.com</code> أصلان مختلفان. و<code>http://</code> و<code>https://</code> على المضيف نفسه أصلان مختلفان. و<code>localhost:3000</code> و<code>localhost:3001</code> أصلان مختلفان. و<a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">سياسة الأصل نفسه (SOP)</a> هي السبب في أن صفحة ويب عشوائية لا تستطيع قراءة بريدك الإلكتروني.</p>
<p>واختراق تطبيقات المؤسسات لهذا الحد أمر روتيني. فترويسات CORS تسمح بنداءات الواجهة البرمجية عبر الأصول. و<code>postMessage</code> يتيح تواصلًا عبر الأصول بين الإطارات. ووسوم <code>&lt;script&gt;</code> لطرف ثالث تعمل بوصول كامل إلى DOM الصفحة المضيفة. وكل واحد من هذه ثقب مقصود في نموذج العزل، وكل واحد منها موضع يمكن أن تنكسر فيه الافتراضات الأمنية.</p>
<pre><code>graph TD
    subgraph &quot;Your Origin&quot;
        App[&quot;Your Application&quot;]
        SW[&quot;Service Worker&quot;]
        Worker[&quot;Web Worker&quot;]
    end

    subgraph &quot;Intentional Boundary Crossings&quot;
        CORS[&quot;CORS APIs&quot;]
        PM[&quot;postMessage&quot;]
        Scripts[&quot;Third-Party Scripts&quot;]
        Frames[&quot;iframe Embeds&quot;]
    end

    App --&gt;|&quot;full access&quot;| SW
    App --&gt;|&quot;full access&quot;| Worker
    App --&gt;|&quot;relaxed by headers&quot;| CORS
    App --&gt;|&quot;explicit channel&quot;| PM
    App --&gt;|&quot;same privileges as your code&quot;| Scripts
    App --&gt;|&quot;sandboxable&quot;| Frames
</code></pre>
<p>والحقيقة المقلقة عن سكربتات الطرف الثالث تستحق أن تُقال صراحة: فوسم <code>&lt;script src=&quot;https://analytics.example.com/tag.js&quot;&gt;</code> يمنح ذلك السكربت امتيازات مطابقة لامتيازات شيفرتك. يستطيع قراءة DOM، والوصول إلى <code>localStorage</code>، وتسجيل مستمعات أحداث على حقول الإدخال، وإجراء طلبات شبكة إلى أي أصل. وإن اختُرقت جهة التحليلات — أو سمح مدير وسوم لقسم التسويق بحقن JavaScript اعتباطي — فسيحصل المهاجم على الوصول نفسه الذي يحظى به أقدم مهندسيك.</p>
<table>
<thead>
<tr>
<th>حد الثقة</th>
<th>الآلية</th>
<th>ما ينكسر عند اختراقه</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الأصل نفسه</strong></td>
<td>سياسة الأصل نفسه، ونطاق الكوكيز</td>
<td>وصول كامل إلى DOM، وسرقة بيانات الاعتماد</td>
</tr>
<tr>
<td><strong>الواجهة البرمجية عبر الأصول</strong></td>
<td>ترويسات CORS</td>
<td>تسريب البيانات، وتزوير الطلبات عبر المواقع</td>
</tr>
<tr>
<td><strong>سكربتات الطرف الثالث</strong></td>
<td>وسوم <code>&lt;script&gt;</code>، ومديرو الوسوم</td>
<td>تسجيل ضغطات المفاتيح، واختطاف الجلسات، وسرقة البيانات</td>
</tr>
<tr>
<td><strong>الإطارات المضمّنة</strong></td>
<td>خاصية <code>sandbox</code>، وسياسة أمان المحتوى</td>
<td>اختطاف النقرات، والتصيّد</td>
</tr>
<tr>
<td><strong>عمال الخدمة</strong></td>
<td>مقيّدون بالأصل، ويعترضون كل الجلبات</td>
<td>رجل في المنتصف من جهة العميل</td>
</tr>
</tbody>
</table>
<h2 id="سياسة-أمان-المحتوى">سياسة أمان المحتوى</h2>
<p>سياسة أمان المحتوى (CSP) هي الآلية الأمنية الأكثر أثرًا المتاحة لمطوّري الواجهة الأمامية. فسياسة مُعدّة جيدًا تقلّل أثر XSS تقليلًا هائلًا بإخبار المتصفح بالموارد المسموح له بتحميلها وتنفيذها. وإن حقن مهاجم وسم <code>&lt;script&gt;</code> لا تسمح به السياسة، حجبه المتصفح.</p>
<p>ومع ذلك تظل CSP من أكثر الميزات الأمنية سوءًا في التنفيذ داخل تطبيقات المؤسسات. ونمط الفشل المعتاد هو نشر سياسة متسامحة إلى حد لا توفّر حماية ذات معنى، أو تخطيها كليًا بحجة «أنها كانت تكسر الأشياء في بيئة التجهيز».</p>
<h3 id="كيف-تعمل-توجيهات-csp">كيف تعمل توجيهات CSP</h3>
<p>سياسة أمان المحتوى مجموعة من التوجيهات، يضبط كل منها نوعًا مختلفًا من الموارد. وتُسلَّم السياسة عبر ترويسة استجابة HTTP:</p>
<pre><code>Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}' https://cdn.trusted-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://images.cdn.example.com;
  connect-src 'self' https://api.example.com wss://realtime.example.com;
  frame-src 'self' https://auth.provider.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
</code></pre>
<p>توجيه <code>default-src</code> هو البديل الاحتياطي لأي توجيه غير مذكور صراحة. ويتحكم <code>script-src</code> بمصادر JavaScript. ويتحكم <code>connect-src</code> بوجهات <code>fetch</code> و<code>XMLHttpRequest</code> وWebSocket. وينفّذ المتصفح كل توجيه باستقلال — فإن لم يطابق مورد قائمة السماح في التوجيه، حُجب المورد وأُبلغ عن مخالفة.</p>
<h3 id="سياسة-أمان-المحتوى-القائمة-على-الـnonce">سياسة أمان المحتوى القائمة على الـnonce</h3>
<p>تستخدم المقاربة الحديثة لـCSP <strong>الـnonces</strong> بدل قوائم سماح النطاقات. وتوصي <a href="https://web.dev/articles/strict-csp">إرشادات Google لسياسة CSP الصارمة</a> بهذه الاستراتيجية لأن قوائم سماح النطاقات سهلة التجاوز على نحو مفاجئ (فأي سكربت على شبكة توصيل محتوى موثوقة يصبح ناقل هجوم)، في حين تربط الـnonces تنفيذ السكربت بتحميل صفحة بعينه.</p>
<p>والتدفّق:</p>
<pre><code>sequenceDiagram
    participant Server
    participant Browser
    participant Attacker

    Server-&gt;&gt;Server: Generate random nonce for this response
    Server-&gt;&gt;Browser: CSP header: script-src 'nonce-a1b2c3'
    Server-&gt;&gt;Browser: &lt;script nonce=&quot;a1b2c3&quot;&gt;app.js&lt;/script&gt;
    Browser-&gt;&gt;Browser: Nonce matches → execute script

    Attacker-&gt;&gt;Browser: &lt;script&gt;malicious()&lt;/script&gt;
    Browser-&gt;&gt;Browser: No nonce → BLOCKED
</code></pre>
<p>كل سكربت مضمّن مشروع يتضمن الـnonce الذي يولّده الخادم. وأي سكربت محقون بلا الـnonce المطابق يُحجب. ويتغيّر الـnonce في كل استجابة، فلا يستطيع مهاجم يكتشف nonce واحد أن يعيد استخدامه.</p>
<p>وتمدد كلمة <strong><code>strict-dynamic</code></strong> هذا السلوك: فإن أنشأ سكربت موثوق (له nonce صالح) سكربتات إضافية ديناميكيًا، كانت تلك السكربتات موثوقة أيضًا. وتصف <a href="https://web.dev/articles/strict-csp">توثيق Google لـCSP</a> الـ<code>strict-dynamic</code> بأنه الآلية التي تجعل سياسة أمان المحتوى القائمة على الـnonce عملية للتطبيقات التي تحمّل الشيفرة ديناميكيًا — بما فيها الوحدات البعيدة في Module Federation.</p>
<blockquote>
<p><strong>سياسة أمان المحتوى ومكوّنات الخادم</strong></p>
<p>تعمل سياسة أمان المحتوى القائمة على الـnonce بشكل طبيعي مع الأطر المصيّرة على الخادم (Next.js وRemix وSvelteKit) لأن الخادم يولّد الـnonce أثناء التصيير ويحقنه في الترويسة وفي وسوم السكربت معًا. أما تطبيقات الصفحة الواحدة المصيّرة كليًا على العميل فيجب أن يولّد الـnonce فيها الـBFF أو الوسيط العكسي.</p>
</blockquote>
<h3 id="سياسة-أمان-المحتوى-في-معماريات-الواجهات-المصغرة">سياسة أمان المحتوى في معماريات الواجهات المصغّرة</h3>
<p>تصبح سياسة أمان المحتوى أكثر تعقيدًا عندما تنشر فرق متعددة باستقلال. فسياسة القشرة التطبيقية يجب أن تكون متسامحة بما يكفي لتسمح بكل الوحدات البعيدة، ما يخاطر بإضعاف السياسة.</p>
<p>وتساعد مقاربة الـnonce مع <code>strict-dynamic</code> هنا. فإذا حمّلت القشرة وحدة بعيدة من Module Federation بـnonce صالح، صارت السكربتات التي تنشئها تلك الوحدة ديناميكيًا موثوقة تلقائيًا. وهذا يجنّبك صيانة قائمة سماح متضخمة باستمرار لأصول الوحدات البعيدة في سياسة أمان المحتوى.</p>
<p>وفي الواجهات المصغّرة القائمة على الإطارات، يمكن أن يكون لكل إطار سياسته الخاصة — وهو أقوى نموذج عزل. والمقايضة هي العبء التنظيمي للتواصل الذي يرافق حدود الإطارات.</p>
<h3 id="نشر-سياسة-أمان-المحتوى-تدريجيا">نشر سياسة أمان المحتوى تدريجيًا</h3>
<p>لا تنشر سياسة CSP صارمة في الإنتاج عصر يوم جمعة وتأمل أن يكون كل شيء على ما يُراد. ينبغي أن يتبع النشر تدرجًا:</p>
<ul>
<li><strong>وضع الإبلاغ فقط أولًا</strong>. تجمع ترويسة <code>Content-Security-Policy-Report-Only</code> المخالفات دون حجب أي شيء. انشرها، ودعها تعمل أسبوعًا أو أسبوعين، وحلّل ما ينكسر.</li>
<li><strong>حلّل المخالفات</strong>. استخدم <a href="https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API">واجهة الإبلاغ (Reporting API)</a> أو خدمات مثل report-uri.com لتجميع المخالفات. ومعظم المخالفات أشياء مشروعة نسيت السماح بها — لا هجمات.</li>
<li><strong>شدّد تدريجيًا</strong>. انتقل من التسامح إلى الصرامة وأنت تحل كل فئة مخالفات. أزل <code>unsafe-inline</code> من <code>script-src</code> أولًا (واستبدلها بالـnonces)، ثم شدّد <code>connect-src</code> و<code>img-src</code> وغيرهما.</li>
<li><strong>فرض السياسة</strong>. انتقل من <code>Report-Only</code> إلى الإنفاذ متى صار معدّل المخالفات قابلًا للإدارة.</li>
<li><strong>راقب باستمرار</strong>. ينبغي أن تتغذى مخالفات سياسة أمان المحتوى في <a href="https://stevekinney.com/courses/enterprise-ui/observability">خط أنابيب الملاحظة</a> لديك كإشارة أمنية. فقفزة في المخالفات بعد نشر تعني على الأرجح انحدارًا.</li>
</ul>
<h2 id="الوقاية-من-xss-بما-يتجاوز-التهريب">الوقاية من XSS بما يتجاوز التهريب</h2>
<p>تهريب المخرجات هو أساس الوقاية من XSS، والأطر الحديثة تفعله افتراضيًا. فـReact يهرّب قيم JSX تلقائيًا. وVue يهرّب إقحام القوالب تلقائيًا. وSvelte يهرّب ارتباطات التعبيرات تلقائيًا. وAngular يعقّم إسنادات DOM. والنمط متسق عبر الأطر: الأمان افتراضيًا، مع مخارج هروب مسماة صراحة (<code>dangerouslySetInnerHTML</code>، <code>v-html</code>، <code>{@html}</code>، <code>bypassSecurityTrustHtml</code>) يمكن للتحليل الساكن اكتشافها وللمراجعة البرمجية الإشارة إليها.</p>
<p>لكن التهريب طبقة واحدة. وتحتاج تطبيقات المؤسسات إلى دفاع في العمق.</p>
<h3 id="الأنواع-الموثوقة-trusted-types">الأنواع الموثوقة (Trusted Types)</h3>
<p><strong>الأنواع الموثوقة</strong> واجهة برمجية في المتصفح توفّر إنفاذًا برمجيًا ضد XSS في DOM. وعند تفعيلها عبر سياسة أمان المحتوى (<code>require-trusted-types-for 'script'</code>)، يرفض المتصفح إسنادات النصوص إلى مصارف DOM الخطرة — <code>innerHTML</code> و<code>eval</code> و<code>document.write</code> و<code>script.src</code> وخصائص معالجات الأحداث — ما لم تُغلَّف القيمة في كائن من الأنواع الموثوقة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Define a policy that sanitizes HTML input</span>
<span class="hljs-keyword">const</span> sanitizePolicy = trustedTypes.<span class="hljs-title function_">createPolicy</span>(<span class="hljs-string">&#x27;sanitize&#x27;</span>, {
  <span class="hljs-attr">createHTML</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">DOMPurify</span>.<span class="hljs-title function_">sanitize</span>(input),
  <span class="hljs-attr">createScriptURL</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(input);
    <span class="hljs-keyword">if</span> (allowedHosts.<span class="hljs-title function_">includes</span>(url.<span class="hljs-property">hostname</span>)) <span class="hljs-keyword">return</span> input;
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Untrusted script URL: <span class="hljs-subst">\${input}</span>\`</span>);
  },
});

<span class="hljs-comment">// The browser enforces this—raw strings are rejected</span>
element.<span class="hljs-property">innerHTML</span> = sanitizePolicy.<span class="hljs-title function_">createHTML</span>(userContent);
</code></pre>
<p><em>ملاحظة:</em> السياسة نقطة إنفاذ مركزية قابلة للتدقيق. مكان واحد لإتقان التعقيم.</p>
<p>وتكون <a href="https://w3c.github.io/trusted-types/dist/spec/">الأنواع الموثوقة</a> ذات قيمة خاصة في تطبيقات المؤسسات، حيث تسهم فرق متعددة بالشيفرة ويصعب إنفاذ «لا تستخدم <code>innerHTML</code>» عبر المراجعة البرمجية وحدها. فتصبح السياسة نقطة إنفاذ تعمل في وقت التشغيل، لا في وقت المراجعة فقط.</p>
<h3 id="نواقل-xss-الأقل-شهرة">نواقل XSS الأقل شهرة</h3>
<p>يستحق ناقلان الانتباه في سياقات المؤسسات:</p>
<ul>
<li><strong>سحق DOM (DOM clobbering)</strong>: يمكن لعناصر HTML بخصائص <code>id</code> أو <code>name</code> أن تحجب متغيّرات JavaScript العامة وتوابع واجهة DOM البرمجية. ومهاجم يتحكم بخصائص <code>id</code> لعنصر ما يستطيع تجاوز خصائص يقرأها التطبيق عبر DOM. تجنّب قراءة المتغيّرات العامة مثل <code>document.getElementById('config')</code> عندما يكون المحتوى قابلًا لتحكم المستخدم.</li>
<li><strong>XSS التحوّل (mXSS)</strong>: يستغل فروقًا بين كيفية تحليل مُعقّمات HTML للمحتوى وكيفية تصيير محلّل المتصفح له فعلًا. فالمدخل الذي يبدو نظيفًا بعد التعقيم يُحوّله خوارزم تحليل المتصفح إلى سكربت قابل للتنفيذ. و<a href="https://github.com/cure53/DOMPurify">DOMPurify</a> هو أقوى دفاع لأن تعقيمه يجري في سياق المحلل نفسه الذي يستخدمه المتصفح.</li>
</ul>
<h2 id="أمن-سلسلة-توريد-الاعتمادات">أمن سلسلة توريد الاعتمادات</h2>
<p>تطبيق واجهة أمامية نمطي في المؤسسات له أكثر من ألف اعتماد عابر. وكل واحد منها مدخل محتمل. وأمن تطبيقك محدود بأقل حزمة جديرة بالثقة في شجرة اعتماداتك.</p>
<h3 id="تصنيف-الهجمات">تصنيف الهجمات</h3>
<p>انتقلت هجمات سلسلة التوريد على نظام npm البيئي من الإطار النظري إلى الروتين:</p>
<table>
<thead>
<tr>
<th>ناقل الهجوم</th>
<th>كيف يعمل</th>
<th>مثال بارز</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>انتحال الأسماء (Typosquatting)</strong></td>
<td>حزمة خبيثة باسم شبيه باسم حزمة شهيرة</td>
<td><code>crossenv</code> مقابل <code>cross-env</code> (2017)</td>
</tr>
<tr>
<td><strong>الخلط بين الاعتمادات (Dependency confusion)</strong></td>
<td>حزمة عامة تحجب حزمة خاصة مقصودة عند الدقة</td>
<td>بحث Alex Birsan عام 2021 (Apple وMicrosoft)</td>
</tr>
<tr>
<td><strong>اختراق مشرف</strong></td>
<td>يحصل المهاجم على حساب مشرف شرعي على npm</td>
<td><code>event-stream</code> (2018)، و<code>ua-parser-js</code> (2021)</td>
</tr>
<tr>
<td><strong>تحديث خبيث</strong></td>
<td>حزمة كانت شرعية تنشر إصدارًا مخترقًا</td>
<td><code>colors</code> و<code>faker</code> (2022)</td>
</tr>
<tr>
<td><strong>استغلال سكربت البناء</strong></td>
<td>شيفرة خبيثة في سكربتات <code>postinstall</code> تعمل أثناء <code>npm install</code></td>
<td>مختلف معدّنات العملات الرقمية</td>
</tr>
</tbody>
</table>
<h3 id="انضباط-ملف-القفل">انضباط ملف القفل</h3>
<p>ملف القفل (<code>package-lock.json</code>، <code>pnpm-lock.yaml</code>، <code>yarn.lock</code>) هو أهم أثر أمني واحد لسلسلة التوريد في مشروعك. فهو يثبّت الإصدارات الدقيقة ويسجل بصمات السلامة (SHA-512) لكل اعتماد.</p>
<pre><code class="language-yaml"><span class="hljs-comment"># In CI: frozen lockfile installs are non-negotiable</span>
<span class="hljs-attr">install:</span>
  <span class="hljs-attr">npm:</span> <span class="hljs-string">npm</span> <span class="hljs-string">ci</span>
  <span class="hljs-attr">pnpm:</span> <span class="hljs-string">pnpm</span> <span class="hljs-string">install</span> <span class="hljs-string">--frozen-lockfile</span>
  <span class="hljs-attr">yarn:</span> <span class="hljs-string">yarn</span> <span class="hljs-string">install</span> <span class="hljs-string">--immutable</span>
</code></pre>
<p><em>ملاحظة:</em> يرفض <code>npm ci</code> تعديل ملف القفل. فإن لم يطابق <code>package.json</code>، فشل البناء.</p>
<p>وكل طلب سحب يعدّل ملف القفل ينبغي أن يُفعّل مراجعة. لا ختمًا مطاطيًا — بل مراجعة حقيقية. وتستطيع أدوات مثل <code>lockfile-lint</code> إنفاذ سياسات (كل الحزم من السجل الرسمي، وبلا عناوين HTTP، وبلا اعتمادات git بلا بصمات سلامة).</p>
<h3 id="التدقيق-الآلي-في-ci">التدقيق الآلي في CI</h3>
<p>ينبغي أن يكون تدقيق الاعتمادات بوابة حاجبة في <a href="https://stevekinney.com/courses/enterprise-ui/github-actions">خط أنابيب CI/CD</a> لديك، لا لوحة معلومات يفتحها أحدهم شهريًا:</p>
<pre><code class="language-yaml"><span class="hljs-comment"># Multi-layered dependency security gate</span>
<span class="hljs-attr">security-audit:</span>
  <span class="hljs-attr">steps:</span>
    <span class="hljs-comment"># Known vulnerability scanning</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npm</span> <span class="hljs-string">audit</span> <span class="hljs-string">--audit-level=high</span>

    <span class="hljs-comment"># Behavioral analysis—what do packages actually do?</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">socket-security</span> <span class="hljs-string">audit</span>

    <span class="hljs-comment"># Lockfile integrity enforcement</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">lockfile-lint</span> <span class="hljs-string">--path</span> <span class="hljs-string">package-lock.json</span> <span class="hljs-string">--type</span> <span class="hljs-string">npm</span> <span class="hljs-string">--allowed-hosts</span> <span class="hljs-string">npm</span>

    <span class="hljs-comment"># License compliance (GPL in a proprietary app is a legal problem)</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">license-checker</span> <span class="hljs-string">--failOn</span> <span class="hljs-string">&quot;GPL-3.0;AGPL-3.0&quot;</span>

    <span class="hljs-comment"># Software Bill of Materials</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">run:</span> <span class="hljs-string">npx</span> <span class="hljs-string">@cyclonedx/cyclonedx-npm</span> <span class="hljs-string">--output</span> <span class="hljs-string">sbom.json</span>
</code></pre>
<p><em>ملاحظة:</em> يزداد الطلب على توليد قائمة مكوّنات البرمجيات (SBOM) في العقود الحكومية ومشتريات المؤسسات.</p>
<p>والفرق الجوهري بين الطبقات: يبحث <code>npm audit</code> وSnyk عن ثغرات <em>معروفة</em> (CVEs) — أي ثغرات أُبلغ عنها وفُهرست. أما أدوات التحليل السلوكي مثل Socket.dev فتحلّل ما تفعله الحزم فعلًا: الوصول إلى نظام الملفات، ونداءات الشبكة، وقراءة متغيّرات البيئة، والشيفرة المبهمة، وسكربتات التثبيت. فقد تكون حزمة بلا أي ثغرة معروفة وتبقى خبيثة. والطبقتان ضروريتان معًا.</p>
<h3 id="نظافة-الاعتمادات">نظافة الاعتمادات</h3>
<p>يتطلب التوتر بين الأمن (التحديث السريع لترقيع الثغرات) والاستقرار (عدم كسر الإنتاج بتحديثات غير مختبَرة) استراتيجية متعمّدة:</p>
<ul>
<li><strong>طلبات سحب آلية للتحديثات</strong>: ينشئ Renovate أو Dependabot طلبات سحب لتحديثات الاعتمادات. وجمّع التحديثات المترابطة (كل حزم <code>@testing-library/*</code> في طلب واحد) لتقليل عبء المراجعة.</li>
<li><strong>وتيرة التحديث</strong>: تُدمج الترقيعات الأمنية فورًا. أما التحديثات الثانوية والرئيسية فتُجمّع أسبوعيًا، مرهونة بالمجموعة الكاملة من الاختبارات.</li>
<li><strong>تقليل الاعتمادات</strong>: قيّم بانتظام هل ما زال كل اعتماد لازمًا. ويكشف <code>depcheck</code> الحزم غير المستخدمة. وقلة الاعتمادات تعني سطح هجوم أصغر ومشكلة تدقيق أصغر.</li>
<li><strong>توليد قائمة مكوّنات البرمجيات</strong>: توفر قائمة مكوّنات البرمجيات (بصيغة CycloneDX أو SPDX) جردًا مقروءًا آليًا لكل اعتماد. وهذا ليس اختياريًا للمؤسسات التي تبيع للحكومات أو للمشتريات المؤسسية.</li>
</ul>
<h2 id="سلامة-الموارد-الفرعية">سلامة الموارد الفرعية</h2>
<p>عند تحميل سكربتات أو أوراق أنماط من شبكات توصيل محتوى أو أصول طرف ثالث، تضمن <strong>سلامة الموارد الفرعية</strong> (SRI) ألا ينفّذ المتصفح إلا الموارد التي تطابق بَصمة تشفيرية متوقعة.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>
  <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.example.com/vendor.js&quot;</span>
  <span class="hljs-attr">integrity</span>=<span class="hljs-string">&quot;sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC&quot;</span>
  <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">&quot;anonymous&quot;</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>يجلب المتصفح السكربت، ويحسب بصمته، ويقارنها بخاصية <code>integrity</code>. فإن لم تتطابقا — لأن شبكة التوصيل اختُرقت، أو لأن رجلًا في المنتصف عدّل الاستجابة — يرفض المتصفح تنفيذ السكربت. و<a href="https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity">توثيق MDN لسلامة الموارد الفرعية</a> يصف الخوارزميات المدعومة (<code>sha256</code>، <code>sha384</code>، <code>sha512</code>) وعملية التحقق.</p>
<h3 id="سلامة-الموارد-الفرعية-والمعماريات-الديناميكية">سلامة الموارد الفرعية والمعماريات الديناميكية</h3>
<p>تطرح سلامة الموارد الفرعية تحديات في Module Federation والمعماريات المقسمة إلى حزم، حيث يتغير محتوى الحزمة مع كل عملية نشر:</p>
<ul>
<li><strong>الوحدات البعيدة في Module Federation</strong>: تتغير سكربتات حاويات الوحدات البعيدة في كل نشر، فتصبح بصمة SRI الساكنة في HTML المضيف قديمة فورًا. والنمط العملي هو ملف بيان يربط عناوين دخول الوحدات البعيدة ببصماتها الحالية، ويُحدَّث في إطار خط أنابيب نشر الوحدة البعيدة. فيجلب المضيف البيان ويتحقق من السلامة قبل تحميل الوحدة البعيدة.</li>
<li><strong>الاستيراد الديناميكي <code>import()</code></strong>: لا تدعم الشُّذر المقسمة المحمّلة عبر الاستيرادات الديناميكية خصائص SRI أصليًا. وتستطيع أدوات البناء توليد خرائط استيراد (import maps) ببيانات سلامة وصفية، وإن كان دعم المتصفحات لسلامة خرائط الاستيراد ما زال في تطوّر.</li>
<li><strong>التحقق عبر عامل الخدمة</strong>: يستطيع عامل الخدمة اعتراض طلبات الجلب لشُذر JavaScript، والتحقق من سلامتها مقابل بيان موقّع، ورفض كل ما لا يطابق — ما يوفّر حماية شبيهة بـSRI للاستيرادات الديناميكية.</li>
</ul>
<h2 id="عزل-سكربتات-الطرف-الثالث-في-صناديق-رملية">عزل سكربتات الطرف الثالث في صناديق رملية</h2>
<p>تحمّل تطبيقات المؤسسات بشكل روتيني أدوات التحليلات، ومديري الوسوم، وأدوات اختبار A/B، وويدجت دعم العملاء، وسكربتات الإعلانات. وكل واحد منها يعمل بوصول كامل إلى الصفحة ما لم تتخذ خطوات لعزله.</p>
<h3 id="استراتيجيات-العزل">استراتيجيات العزل</h3>
<p><strong>العزل بالإطار</strong> يحمّل سكربتات الطرف الثالث في إطار مقيّد الصلاحيات:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://analytics.example.com/widget&quot;</span> <span class="hljs-attr">sandbox</span>=<span class="hljs-string">&quot;allow-scripts&quot;</span> <span class="hljs-attr">loading</span>=<span class="hljs-string">&quot;lazy&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
</code></pre>
<p>تجريد خاصية <code>sandbox</code> كل الصلاحيات افتراضيًا. ولا تُمنح إلا القدرات المسموح بها صراحة (<code>allow-scripts</code>، <code>allow-same-origin</code>، <code>allow-forms</code>). ويجري التواصل مع الصفحة المضيفة عبر <code>postMessage</code>.</p>
<p><strong>العزل في عامل ويب</strong> يشغّل شيفرة الطرف الثالث في خيط عامل لا وصول له إلى DOM. ومكتبات مثل <a href="https://partytown.builder.io/">Partytown</a> تتبع هذه المقاربة، فتوكل عمليات DOM من العامل:</p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Partytown moves third-party scripts off the main thread --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/partytown&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://analytics.example.com/tag.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>وهذا يحسّن أداء الخيط الرئيسي (وهو شاغل تتناوله <a href="https://stevekinney.com/courses/enterprise-ui/performance-budgets">ميزانيات الأداء</a>) مع توفير حدّ أمني أيضًا — فالسكربت لا يستطيع الوصول مباشرة إلى DOM أو حقول النموذج أو بيانات المستخدم.</p>
<p><strong>تقييد سياسة أمان المحتوى</strong> يحدّ مما تستطيع سكربتات الطرف الثالث فعله حتى لو عملت في الخيط الرئيسي. فسياسة <code>connect-src</code> ضيقة تمنع سكربت تحليلات مخترقًا من تسريب البيانات إلى نقاط نهاية غير متوقعة. وسياسة <code>script-src</code> مقيّدة تمنعه من تحميل سكربتات إضافية.</p>
<h3 id="حوكمة-مدير-الوسوم">حوكمة مدير الوسوم</h3>
<p>غالبًا ما يكون Google Tag Manager وأنظمة إدارة الوسوم المشابهة أضعف حلقة في أمن واجهات المؤسسات، لأنها تتيح لفرق التسويق حقن JavaScript اعتباطي دون مراجعة هندسية. فالسكربت الذي يتتبّع نقرات الأزرار اليوم قد يُستبدل غدًا بمسجّل ضغطات مفاتيح إن اختُرق حساب GTM — أو إن أضاف أحدهم وسمًا دون فهم ما يفعله.</p>
<p>وأنماط الحوكمة:</p>
<ul>
<li><strong>قيود سياسة أمان المحتوى على حاويات GTM</strong>: حدّد ما تستطيع GTM تحميله من سكربتات عبر CSP. وهذا يتطلب تنسيقًا مع فرق التسويق.</li>
<li><strong>مسارات الموافقة</strong>: نفّذ بوابات موافقة في منصة إدارة الوسوم قبل وصول الوسوم إلى الإنتاج.</li>
<li><strong>مراقبة التغييرات</strong>: نبّه عند إضافة الوسوم أو تعديلها. وينبغي أن تتغذى مديريات الوسوم في عملية إدارة التغيير نفسها التي تتبعها عمليات نشر الشيفرة.</li>
<li><strong>الوسم من جهة الخادم</strong>: انقل تنفيذ الوسوم من المتصفح إلى حاوية من جهة الخادم. ويدعم Google Tag Manager وضع وسم من جهة الخادم يُلغي سطح الهجوم من جهة العميل كليًا. فلا تعمل الوسوم في متصفح المستخدم أبدًا.</li>
</ul>
<h2 id="ترويسات-الأمان">ترويسات الأمان</h2>
<p>فيما يتجاوز سياسة أمان المحتوى، تُشكّل عدة ترويسات استجابة HTTP طبقة دفاع رخيصة التنفيذ ومكلفة الإغفال:</p>
<table>
<thead>
<tr>
<th>الترويسة</th>
<th>الغرض</th>
<th>القيمة الموصى بها</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Strict-Transport-Security</code></td>
<td>فرض HTTPS</td>
<td><code>max-age=63072000; includeSubDomains; preload</code></td>
</tr>
<tr>
<td><code>X-Content-Type-Options</code></td>
<td>منع استنشاق نوع MIME</td>
<td><code>nosniff</code></td>
</tr>
<tr>
<td><code>X-Frame-Options</code></td>
<td>منع اختطاف النقرات (قديم)</td>
<td><code>DENY</code> أو <code>SAMEORIGIN</code></td>
</tr>
<tr>
<td><code>Referrer-Policy</code></td>
<td>التحكم في تسريب المُحيل</td>
<td><code>strict-origin-when-cross-origin</code></td>
</tr>
<tr>
<td><code>Permissions-Policy</code></td>
<td>تقييد واجهات المتصفح البرمجية</td>
<td><code>camera=(), microphone=(), geolocation=()</code></td>
</tr>
<tr>
<td><code>Cross-Origin-Opener-Policy</code></td>
<td>عزل العمليات</td>
<td><code>same-origin</code></td>
</tr>
<tr>
<td><code>Cross-Origin-Embedder-Policy</code></td>
<td>اشتراط CORP للموارد الفرعية</td>
<td><code>require-corp</code></td>
</tr>
<tr>
<td><code>Cross-Origin-Resource-Policy</code></td>
<td>تقييد من يحمّل أصولك</td>
<td><code>same-origin</code></td>
</tr>
</tbody>
</table>
<p>تخبر <code>Strict-Transport-Security</code> المتصفح بأن يستخدم HTTPS دائمًا لهذا النطاق، حتى لو كتب المستخدم <code>http://</code>. و<code>X-Content-Type-Options: nosniff</code> يمنع المتصفح من تخمين نوع MIME للاستجابة، فيوقفه عن تنفيذ استجابة JSON كأنها JavaScript. وتقيّد <code>Permissions-Policy</code> الوصول إلى واجهات المتصفح البرمجية التي لا يستخدمها تطبيقك — الكاميرا والميكروفون وتحديد الموقع — فلا يستطيع سكربت مخترق تفعيلها بصمت.</p>
<h3 id="العزل-عبر-الأصول">العزل عبر الأصول</h3>
<p>تُمكّن <strong>سياسة فتح الأصول المتقاطعة</strong> (COOP) و<strong>سياسة تضمين الأصول المتقاطعة</strong> (COEP) معًا العزل عبر الأصول. وهذا يضع المستند في مجموعة سياق تصفح خاصة به، فيمنع هجمات القنوات الجانبية من فئة Spectre، ويتيح <code>SharedArrayBuffer</code> والمؤقتات عالية الدقة.</p>
<pre><code>Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
</code></pre>
<p>ويزداد ارتباط العزل عبر الأصول بتطبيقات المؤسسات التي تستخدم عمال ويب مع <code>SharedArrayBuffer</code> لحسابات حساسة للأداء. والمقايضة أن <code>require-corp</code> تعني أن كل مورد عبر الأصول تحمّله صفحتك يجب أن يوافق صراحة عبر ترويسة <code>Cross-Origin-Resource-Policy</code>، وقد يكون ذلك مؤلمًا في التطبيق عندما تعتمد على شبكات توصيل محتوى لطرف ثالث لم تضف الترويسة بعد.</p>
<h2 id="حماية-البيانات-من-جهة-العميل">حماية البيانات من جهة العميل</h2>
<h3 id="ما-ينبغي-ألا-يكون-في-الحزمة">ما ينبغي ألا يكون في الحزمة</h3>
<p>حزمة جهة العميل علنية. فكل من لديه أدوات مطوّري المتصفح يستطيع قراءتها. والتصغير والتعتيم مصدّات سرعة، لا حواجز. وهذا يعني أن أشياء معينة ينبغي ألا تكون فيها أبدًا:</p>
<ul>
<li><strong>أسرار الواجهات البرمجية</strong>: إن كان مفتاح Google Maps API في الحزمة، فيمكن استخراجه وإساءة استخدامه. استخدم طلبات بوساطة الخادم، أو قيّد المفاتيح بالمُحيل وعنوان IP.</li>
<li><strong>إعدادات رايات الميزات</strong>: تكشف المجموعة الكاملة لرايات الميزات ميزات لم تُصدر بعد، وتجارب داخلية، واستراتيجية تجارية. قيّم الرايات من جهة الخادم أو عبر وسيط.</li>
<li><strong>مخططات GraphQL الكاملة</strong>: تكشف نقطة نهاية GraphQL المفعّل فيها الاستبطان نموذج البيانات كاملًا، بما فيه حقول لا ينبغي للمستخدم الحالي معرفتها. عطّل الاستبطان في الإنتاج.</li>
<li><strong>خرائط الشيفرة المصدرية</strong>: تُعالَج في <a href="https://stevekinney.com/courses/enterprise-ui/observability">قسم الملاحظة</a> — لا تقدّمها أبدًا لمستخدمين غير موثَّقين.</li>
</ul>
<p>والنموذج الذهني الصحيح واضح: عامل العميل كغير موثوق. تحقق من كل شيء من جهة الخادم. ولا تضع منطقًا حساسًا في الواجهة الأمامية أبدًا. ويجب أن يُنفّذ الخادم الخلفي فحوص التخويل، مهما عرضت الواجهة الأمامية. وتعتيم الشيفرة يوفّر تأخيرًا، لا أمانًا.</p>
<h2 id="أمن-خط-الأنابيب">أمن خط الأنابيب</h2>
<p>يمتد أمن الواجهة الأمامية إلى ما بعد التطبيق العامل إلى <a href="https://stevekinney.com/courses/enterprise-ui/github-actions">خط أنابيب CI/CD</a>. فخط أنابيب بناء مخترق يستطيع حقن شيفرة خبيثة في كل مخرج ينتجه، ما يجعله هدفًا أعلى مردودًا من أي ثغرة فردية.</p>
<pre><code>graph LR
    subgraph &quot;Build Pipeline Security&quot;
        A[&quot;Dependency Install&lt;br/&gt;(frozen lockfile, audit)&quot;] --&gt; B[&quot;Build&lt;br/&gt;(ephemeral container)&quot;]
        B --&gt; C[&quot;Output Verification&lt;br/&gt;(manifest + hashes)&quot;]
        C --&gt; D[&quot;Deploy&lt;br/&gt;(immutable, content-hashed)&quot;]
        D --&gt; E[&quot;Post-Deploy Scan&lt;br/&gt;(OWASP ZAP, headers check)&quot;]
    end
</code></pre>
<p>والممارسات الجوهرية:</p>
<ul>
<li><strong>تثبيت بملف قفل مجمّد</strong> في CI. استخدم <code>npm ci</code> لا <code>npm install</code>. فملف القفل هو العقد، وCI ينفّذه.</li>
<li><strong>بيئات بناء عابرة</strong>. شغّل عمليات البناء في حاويات معزولة تُدمَّر بعد كل بناء. ولا تعد استخدام بيئات البناء عبر المشاريع.</li>
<li><strong>إدارة الأسرار</strong>. متغيّرات البيئة التي تحتوي مفاتيح الواجهات البرمجية أو بيانات اعتماد التوقيع تأتي من مدير أسرار (Vault، أو AWS Secrets Manager)، لا من المستودع. والأسرار في ملفات <code>.env</code> المُودَعة في git ليست استراتيجية إعداد؛ بل حادثة مستقبلية.</li>
<li><strong>التحقق من مخرجات البناء</strong>. ولّد بيانًا موقّعًا لكل ملفات المخرجات ببصماتها. وتحقق من هذا البيان أثناء النشر.</li>
<li><strong>عمليات نشر غير قابلة للتغيير</strong>. استخدم أسماء ملفات مُبصَّمة بالمحتوى ليكون كل نشر مجموعة ملفات جديدة. وتبقى الإصدارات القديمة متاحة للتراجع دون بهلوانيات إبطال الذاكرة المؤقتة.</li>
<li><strong>الفحص بعد النشر</strong>. شغّل فحوصًا أمنية آلية (OWASP ZAP وNuclei) على التطبيق المنشور كفحص بعد النشر.</li>
</ul>
<h2 id="الأمن-على-نطاق-تنظيمي">الأمن على نطاق تنظيمي</h2>
<p>في مؤسسة كبيرة فيها عشرات فرق الواجهة الأمامية، لا يمكن إنفاذ الأمن بواسطة فريق واحد يراجع كل طلب سحب. بل يجب تضمينه في المعمارية والأدوات والافتراضات.</p>
<h3 id="هرم-الأمن">هرم الأمن</h3>
<p>الطبقات، من الأكثر آلية إلى الأكثر بشرية:</p>
<pre><code>graph TD
    A[&quot;Framework Defaults&lt;br/&gt;(automatic — JSX escaping, CSP nonces)&quot;]
    B[&quot;Linting &amp; Static Analysis&lt;br/&gt;(CI-enforced — ESLint security rules, Semgrep)&quot;]
    C[&quot;Automated Scanning&lt;br/&gt;(CI-gated — dependency audit, SAST, CSP validation)&quot;]
    D[&quot;Security Champions&lt;br/&gt;(human — trained devs on each team)&quot;]
    E[&quot;Penetration Testing&lt;br/&gt;(periodic — external teams)&quot;]

    A --- B
    B --- C
    C --- D
    D --- E

    style A fill:#2d6a4f,color:#fff
    style B fill:#40916c,color:#fff
    style C fill:#52b788,color:#fff
    style D fill:#74c69d,color:#000
    style E fill:#95d5b2,color:#000
</code></pre>
<p>تتعامل قاعدة الهرم مع أكبر حجم. فالافتراضات في الأطر التي تمنع XSS تحمي كل سطر شيفرة تلقائيًا. وقواعد الفحص التي تلتقط <code>dangerouslySetInnerHTML</code> و<code>eval</code> و<code>document.write</code> تمسك الأخطاء على مستوى المحرّر. والفحص الآلي في CI يحجب الاعتمادات المخترقة قبل أن تصل إلى الإنتاج. أما الطبقات البشرية — أبطال الأمن في كل فريق، واختبار الاختراق الدوري — فتتعامل مع الأحكام الدقيقة التي لا تستطيع الأتمتة بلوغها.</p>
<h3 id="نظام-التصميم-كرافعة-أمنية">نظام التصميم كرافعة أمنية</h3>
<p><a href="https://stevekinney.com/courses/enterprise-ui/design-system-governance">نظام التصميم</a> أداة أمنية قوية لكنها قليلة الاستخدام، لأنه يتحكم بالمكوّنات التي تمتد إليها يد كل فريق:</p>
<ul>
<li><strong>مكوّنات الإدخال</strong>: ابنِ معالجة إدخال آمنة من XSS في مكوّنات النماذج في نظام التصميم. فإن عقّم مكوّن <code>&lt;TextInput&gt;</code> المدخلات تلقائيًا، لم يعد على الفرق أن تتذكر فعل ذلك.</li>
<li><strong>مكوّنات الروابط</strong>: يستطيع مكوّن <code>&lt;Link&gt;</code> في نظام التصميم رفض عناوين <code>javascript:</code> والتحقق من قيم <code>href</code>.</li>
<li><strong>محرّرات النصوص المنسّقة</strong>: إن وفّر نظام التصميم محرّر نصوص منسّقة، فينبغي أن يستخدم DOMPurify افتراضيًا بلا خيار لتعطيل التعقيم.</li>
</ul>
<p>وعندما يكون المسار الآمن هو المسار السهل نفسه، يتبعه الفرق دون تفكير. وهذا هو الهدف.</p>
<h2 id="الامتثال-والجاهزية-للتدقيق">الامتثال والجاهزية للتدقيق</h2>
<p>تخضع تطبيقات المؤسسات لأطر امتثال — SOC 2 وPCI DSS وHIPAA وGDPR وISO 27001 — تفحص ممارسات أمن الواجهة الأمامية بشكل متزايد. وإسهام الواجهة الأمامية في أدلة التدقيق أكثر واقعية مما تدركه معظم الفرق:</p>
<table>
<thead>
<tr>
<th>الإطار</th>
<th>المتطلبات ذات الصلة بالواجهة الأمامية</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SOC 2</strong></td>
<td>ضوابط الوصول، والتشفير أثناء النقل، والتسجيل، وإدارة التغيير</td>
</tr>
<tr>
<td><strong>PCI DSS</strong></td>
<td>التحقق من المدخلات، والوقاية من XSS، وسلامة الموارد الفرعية، ومعالجة الرموز بشكل آمن</td>
</tr>
<tr>
<td><strong>HIPAA</strong></td>
<td>عدم تخزين معلومات الصحة المحمية من جهة العميل أبدًا، والتشفير أثناء النقل، وتسجيل التدقيق</td>
</tr>
<tr>
<td><strong>GDPR</strong></td>
<td>موافقة الكوكيز، وتقليل البيانات في التحليلات، والحق في المحو من التخزين</td>
</tr>
<tr>
<td><strong>ISO 27001</strong></td>
<td>جرد الأصول (SBOM)، وإدارة الثغرات، والاستجابة للحوادث</td>
</tr>
</tbody>
</table>
<p>والممارسات الموصوفة في هذا القسم — توليد SBOM، والإبلاغ عن مخالفات سياسة أمان المحتوى، وتهيئة ترويسات الأمان، وسجلات تدقيق الاعتمادات، ومسارات تدقيق رايات الميزات — ليست هندسة جيدة فقط، بل أدلة تدقيق. وتوليدها آليًا في CI يعني أنها محدَّثة دائمًا، فيتحول عبء الامتثال إلى مخرج من مخرجات CI.</p>
<hr>
<h2 id="الخلاصة-السريعة">الخلاصة السريعة</h2>
<h3 id="نموذج-الثقة-في-المتصفح-1">نموذج الثقة في المتصفح</h3>
<blockquote>
<p>تعمل شيفرتك في بيئة لا تتحكم بها.</p>
</blockquote>
<ul>
<li>ينفّذ المتصفح <em>أي شيء</em> في وسم <code>&lt;script&gt;</code> — شيفرتك، أو شيفرة مهاجم، أو شبكة إعلانات.</li>
<li>والواجهات المصغّرة تزيد الأمر سوءًا: فرق متعددة تنشر شيفرة إلى الأصل نفسه.</li>
<li>ويحمّل Module Federation شيفرة JavaScript بعيدة في وقت التشغيل — سطح هجوم جديد.</li>
</ul>
<p><strong>التهديدات الأساسية لواجهات المؤسسات:</strong></p>
<ul>
<li>البرمجة عبر المواقع (XSS) عبر حقن المحتوى الديناميكي</li>
<li>هجمات سلسلة التوريد عبر اعتمادات مخترقة</li>
<li>تسريب البيانات من سياق متصفح مشترك</li>
<li>حقن السكربتات عبر الوحدات البعيدة الموحّدة</li>
</ul>
<hr>
<h3 id="سياسة-أمان-المحتوى-1">سياسة أمان المحتوى</h3>
<blockquote>
<p>تخبر CSP المتصفح بالسكربتات المسموح لها بالتنفيذ.</p>
</blockquote>
<pre><code class="language-http"><span class="hljs-attribute">Content-Security-Policy</span>:
  default-src &#x27;self&#x27;;
  script-src &#x27;self&#x27; https://cdn.example.com &#x27;nonce-abc123&#x27;;
  style-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;;
  connect-src &#x27;self&#x27; https://api.example.com;
</code></pre>
<ul>
<li><code>'self'</code> — السكربتات من أصلك فقط.</li>
<li><code>nonce-abc123</code> — السكربتات المضمّنة التي تحمل هذا الـnonce فقط (يُولَّد لكل طلب).</li>
<li><strong>تحدي Module Federation:</strong> سكربتات دخول الوحدات البعيدة تأتي من أصول أخرى. أضف أصل كل وحدة بعيدة إلى <code>script-src</code>. أو استخدم أصل شبكة توصيل محتوى مشتركًا لكل الوحدات البعيدة.
<ul>
<li>أضف أصل كل وحدة بعيدة إلى <code>script-src</code>.</li>
<li>أو استخدم أصل شبكة توصيل محتوى مشتركًا لكل الوحدات البعيدة.</li>
</ul>
</li>
</ul>
<hr>
<h3 id="أمن-سلسلة-التوريد">أمن سلسلة التوريد</h3>
<blockquote>
<p>أنت تنشر أخطاء اعتماداتك أيضًا.</p>
</blockquote>
<table>
<thead>
<tr>
<th>ناقل الهجوم</th>
<th>الدفاع</th>
</tr>
</thead>
<tbody>
<tr>
<td>حزمة npm مخترقة</td>
<td>ملفات القفل، والتدقيق في CI (<code>npm audit</code>)، وSnyk/Socket</td>
</tr>
<tr>
<td>انتحال الأسماء</td>
<td>الحزم ذات النطاق (<code>@yourorg/</code>)، وقوائم السماح في السجل</td>
</tr>
<tr>
<td>سكربتات postinstall خبيثة</td>
<td><code>ignore-scripts</code> في <code>.npmrc</code>، ومراجعة الاستثناءات</td>
</tr>
<tr>
<td>اختراق شبكة توصيل المحتوى</td>
<td>بَصمات <strong>سلامة الموارد الفرعية (SRI)</strong></td>
</tr>
</tbody>
</table>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>
  <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.example.com/vendor.js&quot;</span>
  <span class="hljs-attr">integrity</span>=<span class="hljs-string">&quot;sha384-oqVuAfXRKap7fdgcCY5uykM6+...&quot;</span>
  <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">&quot;anonymous&quot;</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<ul>
<li>سلامة الموارد الفرعية: إن تغيّر الملف، يرفض المتصفح تنفيذه.</li>
<li>ولّد البَصمات في وقت البناء، وتحقّق منها في وقت التشغيل.</li>
</ul>
<hr>
<h3 id="عزل-شيفرة-الطرف-الثالث">عزل شيفرة الطرف الثالث</h3>
<blockquote>
<p>استراتيجيات العزل عندما لا تستطيع الثقة الكاملة بالشيفرة.</p>
</blockquote>
<ul>
<li><strong><code>&lt;iframe sandbox&gt;</code></strong> — أقوى عزل، وأعلى احتكاك. جيد لويدجت الطرف الثالث الحقيقية.</li>
<li><strong>Shadow DOM</strong> — عزل للأنماط، لا عزل أمني. وهذا فهم خاطئ شائع.</li>
<li><strong>عمال ويب</strong> — تشغّل الشيفرة خارج الخيط الرئيسي بوصول محدود إلى DOM. جيدة للحسابات.</li>
<li><strong>سياسة CSP لكل وحدة بعيدة</strong> — سياسات مختلفة لأصول مختلفة. دقيقة لكن معقّدة.</li>
</ul>
<p><strong>والمبدأ:</strong> افترض أن أي وحدة بعيدة <em>قد</em> تكون مخترقة. وحدّ مما تستطيع الوصول إليه.</p>
<ul>
<li>لا تضع رموز المصادقة في <code>localStorage</code> حيث يستطيع أي سكربت على الأصل قراءتها.</li>
<li>استخدم كوكيز <code>httpOnly</code> — فلا يستطيع JavaScript الوصول إليها إطلاقًا.</li>
<li>نمط BFF يُبقي الرموز من جهة الخادم.</li>
</ul>
`,r={book:n,chapter:t,chapterTitle:s,slug:e,title:o,headings:a,html:c};export{n as book,t as chapter,s as chapterTitle,r as default,a as headings,c as html,e as slug,o as title};
