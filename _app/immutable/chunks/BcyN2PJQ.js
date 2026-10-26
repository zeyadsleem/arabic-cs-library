const t="kinney",n="ai-development",e="التطوير بأدوات الذكاء الاصطناعي",o="cursor-automations",i="أتمتات Cursor",a=[{depth:2,id:"مصادر-التشغيل",text:"مصادر التشغيل"},{depth:2,id:"عقد-الطلب",text:"عقد الطلب"},{depth:2,id:"الظهور-والملكية",text:"الظهور والملكية"},{depth:2,id:"راجع-التشغيلات-الأولى",text:"راجع التشغيلات الأولى"}],r=`<p>تشغّل <a href="https://cursor.com/docs/cloud-agent/automations">أتمتات Cursor</a> وكلاء السحابة وفق جدول أو حدث. واعتبارًا من <a href="https://cursor.com/changelog">Cursor 3.8</a>، يمكن أيضًا إنشاء الأتمتات من مهارة <code>/automate</code>.</p>
<p>الأتمتات مفيدة للصيانة القابلة للتكرار: فحوص الاعتماديات، وفرز الاختبارات المتذبذبة، وتنقيح المشكلات، وجاهزية الإصدار، والتقارير المجدولة. وهي محفوفة بالمخاطر عندما يكون الطلب غامضًا أو عندما تستطيع الأتمتة تغيير الشيفرة دون مسار مراجعة بشري.</p>
<h2 id="مصادر-التشغيل">مصادر التشغيل</h2>
<p>يدعم Cursor مشغّلات من الجداول وخطافات الويب وأحداث التحكم بالإصدارات و <a href="https://slack.com/">Slack</a> و <a href="https://linear.app/">Linear</a> و <a href="https://sentry.io/">Sentry</a> و <a href="https://www.pagerduty.com/">PagerDuty</a> والتكاملات ذات الصلة. ويمكن أن تتضمن مشغّلات <a href="https://github.com/">GitHub</a> تعليقات المشكلات، وتعليقات مراجعة طلبات السحب، والمراجعات المرسلة، وتحديثات خيوط المراجعة، وتشغيلات سير العمل.</p>
<p>اختر المشغّل الذي يطابق سير العمل. لا تجعل أتمتة تستقصي نظامًا يمكنه إرسال حدث دقيق.</p>
<h2 id="عقد-الطلب">عقد الطلب</h2>
<p>ينبغي أن يتضمن كل طلب أتمتة:</p>
<ul>
<li>ما يجوز له قراءته.</li>
<li>ما يجوز له تغييره.</li>
<li>أوامر التحقق التي يجب أن يشغّلها.</li>
<li>هل يجوز له إنشاء طلب سحب.</li>
<li>ما الذي يُعدّ محجوبًا.</li>
<li>أين ينبغي أن يبلّغ بالنتائج.</li>
</ul>
<p>مثال:</p>
<pre><code>When a workflow run fails on the main branch, inspect the failing job logs and
open a pull request only if the fix is confined to test configuration. Run
bun run lint and the failing test command. If the failure is product code or
requires a dependency change, report the diagnosis without editing files.
</code></pre>
<h2 id="الظهور-والملكية">الظهور والملكية</h2>
<p>يمكن أن تكون الأتمتات خاصة أو مرئية للفريق أو مملوكة للفريق. استخدم ملكية الفريق لسير العمل الذي يؤثر في مستودعات مشتركة. فالأتمتة الخاصة التي تفتح طلبات سحب على مستودع فريق يصعب تدقيقها.</p>
<h2 id="راجع-التشغيلات-الأولى">راجع التشغيلات الأولى</h2>
<p>عامل التشغيلات القليلة الأولى للأتمتة كاختبارات إنتاج. اقرأ الفرع وطلب السحب والسجلات والتعليقات. وأحكم الطلب عندما تفعل الأتمتة شيئًا مسموحًا تقنيًا لكنه غير مفيد تشغيليًا.</p>
`,s={book:t,chapter:n,chapterTitle:e,slug:o,title:i,headings:a,html:r};export{t as book,n as chapter,e as chapterTitle,s as default,a as headings,r as html,o as slug,i as title};
