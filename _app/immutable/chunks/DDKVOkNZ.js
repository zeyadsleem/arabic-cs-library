const s="kinney",n="ai-development-setup",a="تهيئة بيئة التطوير بالذكاء الاصطناعي",e="dynamic-workflows",t="سيَرات العمل الديناميكية (Dynamic Workflows)",p=[{depth:2,id:"المفردات",text:"المفردات"},{depth:2,id:"مثال-صغير",text:"مثال صغير"},{depth:2,id:"مثال-أكبر",text:"مثال أكبر"},{depth:2,id:"خط-الأنابيب-مقابل-التوازي",text:"خط الأنابيب مقابل التوازي"},{depth:2,id:"الأخطاء-والنتائج-الفارغة",text:"الأخطاء والنتائج الفارغة"}],l=`<p>كلمة «سير العمل» تُستخدم لأشياء كثيرة. فقد تعني عملية فريقك، أو <a href="https://stevekinney.com/courses/ai-development-setup/skills">مهارة</a> تمشي بالوكيل خلال خطوات، أو خط أنابيب CI. وهنا تعني شيئًا واحدًا محدّدًا، فلنثبّته.</p>
<p><strong>سير العمل الديناميكي (dynamic workflow)</strong> سكربت JavaScript ينسّق العديد من <a href="https://stevekinney.com/courses/ai-development-setup/subagents">الوكلاء الفرعيين</a>—وكلاء مساعدون يبدأ كل منهم بسياق جديد وموجز مكتوب ولا يعيد سوى تقرير نهائي. يكتب Claude السكربت لمهمتك، وتشغّله بيئة تشغيل سيَر العمل المدمجة في Claude Code في الخلفية بينما تبقى جلستك مستجيبة. فبدلًا من تمثيل الخطة بالكلمات، تمثّلها بالشيفرة.</p>
<p>ولا يزال Claude <em>يكتب</em> الخطة. فالذي ينتقل إلى الشيفرة هو <em>تشغيلها</em>. فالحلقات والتفرّعات والنتائج الوسيطة تعيش في متغيّرات السكربت، فلا يحصل <a href="https://stevekinney.com/courses/ai-development-setup/why-systems">سياق</a> Claude—كل ما يراه النموذج حين يختار خطوته التالية—إلا على الإجابة النهائية، لا على كل تقرير في الطريق.</p>
<p>والتدفّق التحكّمي شيفرة عادية، فترتيب الخطوات حتمي. أما الوكلاء داخله فليسوا كذلك: فكل منهم لا يزال نموذجًا، ومخرجاته قد تتفاوت. و <a href="https://docs.openclaw.ai/tools/code-mode">Code Mode</a> في OpenClaw فكرة مشابهة تحت اسم مختلف.</p>
<p>يقسّم السكربت مهمة كبيرة إلى وحدات عمل محدودة بواجهات محدّدة بين الخطوات، ثم ينشرها بالتوازي أو يشغّلها كخط أنابيب تسلسلي.</p>
<p>وسيَر العمل زائلة افتراضيًا. يمكنك حفظ سكربت وإعادة تشغيله كما هو مكتوب بالضبط، وهو ما يغطّيه <a href="https://stevekinney.com/courses/ai-development-setup/running-workflows">تشغيل سيَر العمل</a>. وإن كنت تفضّل التقاط <em>التصميم</em> وترك Claude يكتب سكربتًا جديدًا لكل مهمة، فضع ذلك في مهارة بدلًا من ذلك.</p>
<h2 id="المفردات">المفردات</h2>
<p>تظهر هذه الأسماء باستمرار. ومعظمها بيّن بنفسه، وهي معًا النموذج الذهني.</p>
<ul>
<li><code>meta</code>: كائن حرفي يسمّي سير العمل ويصفه، ويسرد مراحله اختياريًا.</li>
<li><code>agent(prompt, opts?)</code>: يشغّل وكيلًا فرعيًا واحدًا. مرّر <code>schema</code> (وصفًا لشكل الكائن الذي تريده رجوعًا) فتحصل على كائن متحقَّق منه بدلًا من نثر.</li>
<li><code>pipeline(items, ...stages)</code>: يرسل كل عنصر خلال كل مرحلة، ويتحرّك كل عنصر بوتيرته الخاصة.</li>
<li><code>parallel(thunks)</code>: يشغّل قائمة دوال دفعة واحدة وينتظرها كلها قبل أن يعود.</li>
<li><code>phase(title)</code>: يبدأ مجموعة تقدّم مسماة في عرض <code>/workflows</code>، فترى أين وصل التشغيل.</li>
<li><code>log(message)</code>: يسجّل رسالة تقدّم للتشغيل.</li>
<li><code>workflow(nameOrRef, args?)</code>: يشغّل سير عمل محفوظًا آخر، بالاسم أو بالمرجع، ويمرّر إليه وسائط.</li>
<li><code>args</code>: الوسائط التي بدأ بها سير العمل.</li>
<li><code>budget</code>: كائن بشكل <code>{ total, spent(), remaining() }</code> يخبر السكربت بكم رمز بقي له، فيحجم نشره ليلائم.</li>
</ul>
<h2 id="مثال-صغير">مثال صغير</h2>
<p>إليك أصغر مثال مفيد. يسرد الوكيل الأول مسارات API، ويرسل خط الأنابيب كل مسار إلى مراجعه الخاص، ويعيد السكربت النتائج. والأسماء بالأحرف الكبيرة (<code>ROUTES</code>, <code>FINDING</code>) مخططات تركت تعريفاتها للإيجاز.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> meta = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;route-audit&#x27;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Audit routes&#x27;</span> };

<span class="hljs-keyword">const</span> routes = <span class="hljs-keyword">await</span> <span class="hljs-title function_">agent</span>(<span class="hljs-string">&#x27;List API routes as JSON&#x27;</span>, { <span class="hljs-attr">schema</span>: <span class="hljs-variable constant_">ROUTES</span> });

<span class="hljs-keyword">const</span> findings = <span class="hljs-keyword">await</span> <span class="hljs-title function_">pipeline</span>(routes.<span class="hljs-property">items</span>, <span class="hljs-function">(<span class="hljs-params">route</span>) =&gt;</span>
  <span class="hljs-title function_">agent</span>(<span class="hljs-string">&#x27;Review authorization on &#x27;</span> + route.<span class="hljs-property">path</span>, { <span class="hljs-attr">schema</span>: <span class="hljs-variable constant_">FINDING</span> }),
);

<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Reviewed &#x27;</span> + findings.<span class="hljs-property">length</span> + <span class="hljs-string">&#x27; routes&#x27;</span>);
<span class="hljs-keyword">return</span> findings;
</code></pre>
<p>لاحظ ما <em>ليس</em> هنا. لا توجد تعليمة تطلب من Claude أن يتذكّر كل نتيجة أو يحصي. فالسكربت يحمل كل ذلك، و <code>return</code> هو الشيء الوحيد الذي يراه Claude.</p>
<p>وثمّة ثغرة: لا معالجة للفشل. فـ <code>findings.length</code> يحصي العناصر الفاشلة، فيمكن لسطر السجل أن يبالغ في عدد المسارات التي روجعت، وإن فشل النداء الأول، يَطرح السطر التالي. ويشرح قسم الأخطاء والنتائج الفارغة أدناه السبب.</p>
<h2 id="مثال-أكبر">مثال أكبر</h2>
<p>هذا له مرحلتان. يجد وكيل مسح الاختبارات المتذبذبة، ثم يقترح وكيل لكل اختبار إصلاحًا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> meta = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;find-flaky-tests&#x27;</span>,
  <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Find flaky tests, propose fixes&#x27;</span>,
  <span class="hljs-attr">phases</span>: [
    { <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Scan&#x27;</span>, <span class="hljs-attr">detail</span>: <span class="hljs-string">&#x27;grep test logs&#x27;</span> },
    { <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Fix&#x27;</span>, <span class="hljs-attr">detail</span>: <span class="hljs-string">&#x27;one agent per test&#x27;</span> },
  ],
};

<span class="hljs-title function_">phase</span>(<span class="hljs-string">&#x27;Scan&#x27;</span>);

<span class="hljs-keyword">const</span> flaky = <span class="hljs-keyword">await</span> <span class="hljs-title function_">agent</span>(<span class="hljs-string">&#x27;grep CI logs for retry markers&#x27;</span>, {
  <span class="hljs-attr">schema</span>: <span class="hljs-variable constant_">FLAKY_SCHEMA</span>,
});

<span class="hljs-title function_">phase</span>(<span class="hljs-string">&#x27;Fix&#x27;</span>);

<span class="hljs-keyword">const</span> fixes = <span class="hljs-keyword">await</span> <span class="hljs-title function_">pipeline</span>(flaky.<span class="hljs-property">tests</span>, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
  <span class="hljs-title function_">agent</span>(<span class="hljs-string">\`Propose a fix for <span class="hljs-subst">\${t.name}</span>\`</span>, { <span class="hljs-attr">schema</span>: <span class="hljs-variable constant_">FIX_SCHEMA</span> }),
);

<span class="hljs-keyword">return</span> fixes;
</code></pre>
<p>وثمّة تفاصيل تقوم بعمل حقيقي في ذلك السكربت:</p>
<ul>
<li><code>meta</code> حرفي خالص. لا متغيّرات، ولا نداءات، ولا نشر، ولا إدراج قوالب. و <code>name</code> و <code>description</code> مطلوبان.</li>
<li>كل عنوان <code>phase()</code> يطابق مدخلًا في <code>meta.phases</code> بالضبط. وإن لم يفعل، يحصل على مجموعة تقدّم منفصلة خاصة به.</li>
</ul>
<h2 id="خط-الأنابيب-مقابل-التوازي">خط الأنابيب مقابل التوازي</h2>
<p>يتيح <code>pipeline()</code> لكل عنصر أن يتقدّم خلال مراحله باستقلال، بلا حاجز بين المراحل. ولا يعني ذلك أن كل عنصر يحصل على عامل فورًا: فالوكلاء بعد حدّ التزامن يصطفّون في انتظار مقعد. وإن لاءم النشر الكامل المقاعد المتاحة، فالبند الأبطأ هو من يحدّد مدة التشغيل. والنشرات الأكبر تدفع أيضًا مقابل موجات عمل مصطفّة. و <a href="https://code.claude.com/docs/en/workflows#behavior-and-limits">حدود سيَر العمل</a> تقف افتراضيًا عند 16 وكيلًا متزامنًا على الأكثر، وأقل أحيانًا على أنظمة محدودة المعالج.</p>
<p>و <code>parallel()</code> حاجز. ينتظر كل دالة في قائمته قبل أن يعود، فلا يبدأ شيء بعده حتى ينتهي أبطؤها. ولا تمدّ يدك إليه إلا حين تحتاج الخطوة التالية إلى كل النتائج دفعة واحدة، مثل إزالة تكرار النتائج عبر المراجعين كلهم.</p>
<p>وكلفة الحاجز يسهل الاستهانة بها. خذ ثلاثة عناصر ومرحلتين، مع وكلاء كافين لتشغيلها كلها في وقت واحد ومدد بالدقائق:</p>
<table>
<thead>
<tr>
<th>العنصر</th>
<th>المرحلة 1</th>
<th>المرحلة 2</th>
<th>مساره الخاص</th>
</tr>
</thead>
<tbody>
<tr>
<td>A</td>
<td>1</td>
<td>10</td>
<td>11</td>
</tr>
<tr>
<td>B</td>
<td>1</td>
<td>1</td>
<td>2</td>
</tr>
<tr>
<td>C</td>
<td>10</td>
<td>1</td>
<td>11</td>
</tr>
</tbody>
</table>
<p>مع حاجز بين المرحلتين، لا تستطيع المرحلة 2 أن تبدأ حتى ينهي C المرحلة 1، فيستغرق التشغيل 10 + 10 = 20 دقيقة. ومرّر كل عنصر بمجرد أن يجهز، فيستغرق التشغيل بقدر أبطأ مسار منفرد: 11 دقيقة. العمل نفسه، ووقت يقارب النصف، وكلما تفاوتت مدد العناصر كبرت الفجوة. واستدعاء <code>parallel()</code> مرة لكل مرحلة، أو <code>Promise.all</code> لكل مرحلة في شيفرتك، يعيد الحاجز. و <a href="https://stevekinney.com/experiments/delegation-economics">تجربة اقتصاديات التفويض</a> تتيح لك اللعب بالأرقام.</p>
<h2 id="الأخطاء-والنتائج-الفارغة">الأخطاء والنتائج الفارغة</h2>
<p>تفرّق <a href="https://code.claude.com/docs/en/workflows#what-the-saved-script-looks-like">وثائق سيَر العمل</a> بين فشلين. فإن ظلّ المخرج المهيكل يفشل في التحقق من المخطط بعد خمس محاولات، فإن <code>agent()</code> يَطرح خطأً يحوي آخر فشل تحقق. التقطه وسجّل عنصرًا فاشلًا، أو دعه يوقف سير العمل—فقط لا تحصُ ذلك العنصر كمُراجَع.</p>
<p>وإن توقّف وكيل في منتصف التشغيل أو صادف خطأ API غير قابل للاسترداد، فإن <code>agent()</code> يُحسم إلى <code>null</code> بدلًا من ذلك، ويُبقي <code>pipeline()</code> ذلك المدخل في نتائجه. افحص الاستثناءات والقيم الفارغة معًا قبل الإبلاغ بالنجاح.</p>
<p>أبقِ هذه الفكرة. فهي سبب قضاء <a href="https://stevekinney.com/courses/ai-development-setup/running-workflows">تشغيل سيَر العمل</a> وقتًا في أنماط الفشل، وسبب أن تشغيلًا انتهى ليس مثل تشغيل نجح.</p>
<p>سير العمل مكان جيد تضع فيه خطة تثق بها. ومكان سيئ تخفي فيه خطة لم تفحصها.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
