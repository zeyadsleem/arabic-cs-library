const e="kinney",t="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",s="runtime-probes-in-the-development-loop",o="مسابر وقت التشغيل داخل حلقة التطوير",r=[{depth:2,id:"ما-المسبار-ولماذا-يختلف-عن-الاختبار",text:"ما المسبار، ولماذا يختلف عن الاختبار"},{depth:2,id:"نمط-المسبار",text:"نمط المسبار"},{depth:2,id:"شجرة-إمكانية-الوصول-بوصفها-الملاحظة-الأساسية-للمسبار",text:"شجرة إمكانية الوصول بوصفها الملاحظة الأساسية للمسبار"},{depth:2,id:"تشغيل-خادم-التطوير-وإبقاؤه-حيا",text:"تشغيل خادم التطوير وإبقاؤه حيًّا"},{depth:2,id:"عندما-يجد-المسبار-شيئا",text:"عندما يجد المسبار شيئًا"},{depth:2,id:"نمط-الفشل-الذي-أريدك-أن-تراقبه",text:"نمط الفشل الذي أريدك أن تراقبه"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],l=`<p>ثبّتت Playwright MCP. عظيم. وما الآن؟</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>اعتبارًا من 9 أبريل 2026، صار Playwright MCP يستخدم افتراضيًا ملف تعريف متصفح دائمًا. وللحصول على مسابر قابلة لإعادة الإنتاج على Shelf، يُفضَّل استخدام ملف تعريف معزول أو حالة تخزين صريحة، حتى يبدأ كل مسبار من حالة متصفح ومصادقة معروفة.</p>
</blockquote>
<p>يدور هذا الدرس حول ما تفعله فعلًا بأداة وقت تشغيل بعد أن تصبح بيد الوكيل. والخلاصة القصيرة أنك تريد للوكيل أن يستكشف الواجهة بين التعديلات، بمبادرة منه، كما يفعل مطوّر دقيق.</p>
<h2 id="ما-المسبار-ولماذا-يختلف-عن-الاختبار">ما المسبار، ولماذا يختلف عن الاختبار</h2>
<p>الاختبار شيء مُبرمَج قابل للتكرار تُودِعه في المستودع. أما المسبار ففحص تفاعلي لمرة واحدة يشغّله الوكيل في منتصف انشغاله بشيء آخر. والمسابر لا تُودَع. وليست فيها تحقّقات بمعنى «أفشِل البناء». إنها تُنتج ملاحظات يستخدمها الوكيل ليقرّر ما يفعل تاليًا.</p>
<p>وبشكل ملموس: يكون الوكيل قد عدّل للتوّ <code>src/routes/shelf/+page.svelte</code> ليضيف قائمة منسدلة «رتّب حسب التقييم». وقبل أن يعلن انتهاء المهمة، يشغّل مسبارًا: «افتح خادم التطوير على localhost:5173/shelf، وتأكّد أن القائمة المنسدلة ظاهرة، وانقر عليها، وتأكّد أن خياراتها هي المتوقّعة، واختر «التقييم»، وتأكّد أن القائمة أُعيد ترتيبها.» هذا ليس اختبارًا. هذا الوكيل يشرح لنفسه وهو يشغّل الشيفرة التي كتبها فعلًا.</p>
<p>بلا أداة وقت تشغيل، أمام الوكيل خياران سيئان: أن يشغّل مجموعة اختبارات Playwright المُودَعة (بطيئة، وبمستوى تفصيل خاطئ، وربما لا تغطّي الشيء الجديد)، أو أن يتخطّى الفحص ويأمل. وبأداة وقت تشغيل يصبح لديه خيار ثالث: أن ينقر الميزة مباشرةً.</p>
<h2 id="نمط-المسبار">نمط المسبار</h2>
<p>أُدرّس النمط في صورة حلقة من أربع خطوات ينبغي للوكيل اتّباعها بعد أي تغيير في الواجهة:</p>
<ol>
<li><strong>انتقل</strong> إلى الصفحة المتأثّرة بالتغيير.</li>
<li><strong>لاحِظ</strong> المنطقة ذات الصلة — اقرأ شجرة إمكانية الوصول، وخُذ لقطة شاشة، وسجّل DOM للمكوّن المحدّد.</li>
<li><strong>تفاعَل</strong> مع التغيير — انقر الزر الجديد، واملأ حقل النموذج الجديد، وأشعِل الحركة الجديدة.</li>
<li><strong>أعِد الملاحظة</strong> — هل أنتج التفاعل النتيجة المتوقّعة؟ وماذا تقول وحدة التحكّم؟ وماذا تقول لوحة الشبكة؟</li>
</ol>
<p>الخطوة الرابعة هي التي يتخطّاها الوكلاء إن لم تأمرهم صراحةً بألّا يفعلوا. فالنقر ينجح، ولا يُطرَح خطأ، فيظنّ الوكيل أن الميزة تعمل. والسؤال الحقيقي هو <em>ما الذي حدث بعد ذلك</em>، والسبيل الوحيد لمعرفته هو النظر.</p>
<pre><code>graph LR
  A[&quot;Navigate&lt;br/&gt;(url, route)&quot;] --&gt; B[&quot;Observe&lt;br/&gt;(accessibility tree,&lt;br/&gt;screenshot)&quot;]
  B --&gt; C[&quot;Interact&lt;br/&gt;(click, fill, submit)&quot;]
  C --&gt; D[&quot;Re-observe&lt;br/&gt;(check result,&lt;br/&gt;console, network)&quot;]
  D --&gt;|Bug found| E[&quot;Fix&quot;]
  E --&gt; A
  D --&gt;|All good| F[&quot;Done&quot;]
  style A fill:#e1f5ff
  style B fill:#fff9c4
  style C fill:#f3e5f5
  style D fill:#fff9c4
  style E fill:#ffebee
  style F fill:#e8f5e9
</code></pre>
<p>يمكنك ترميز ذلك مباشرةً في ملف التعليمات:</p>
<pre><code class="language-markdown"><span class="hljs-section">## Runtime probing after UI changes</span>

After any change to a file under <span class="hljs-code">\`src/routes/\`</span> or <span class="hljs-code">\`src/lib/components/\`</span>,
run a runtime probe before declaring the task done. The probe must:

<span class="hljs-bullet">1.</span> Open the affected route in the browser (Playwright MCP or equivalent).
<span class="hljs-bullet">2.</span> Take a screenshot of the changed region.
<span class="hljs-bullet">3.</span> Interact with the change (click the button, submit the form, etc.).
<span class="hljs-bullet">4.</span> Report what you observed after the interaction—console errors,
   network responses, visible state changes, anything unexpected.

If any step produces an error or unexpected result, fix it before
reporting the task as complete. Attach the screenshot to your summary.
</code></pre>
<p>الجملة الأخيرة هي المهمة. «أرفق لقطة الشاشة بملخّصك» تعني أن على الوكيل أن ينظر فعليًا إلى الشيء الذي عدّله. وهذا يختلف عن تشغيل اختبار.</p>
<h2 id="شجرة-إمكانية-الوصول-بوصفها-الملاحظة-الأساسية-للمسبار">شجرة إمكانية الوصول بوصفها الملاحظة الأساسية للمسبار</h2>
<p>حين يستخدم الوكيل <a href="https://playwright.dev/">Playwright MCP</a> للاستكشاف، فإن أنفع شيء واحد يمكنه طلبه هو اللقطة المُهيكلة لإمكانية الوصول للمنطقة التي عدّلها. لا لقطة الشاشة — فتلك ثاني أنفع شيء. فلقطة إمكانية الوصول تمثيل نصّي لما في الصفحة، مُهيكلًا بحسب الدور، وهي الصورة التي يستطيع الوكيل الاستدلال عليها بأعلى كفاءة.</p>
<p>مسبار جيّد من الوكيل يبدو هكذا:</p>
<pre><code>&gt; Open http://localhost:5173/shelf and give me an accessibility snapshot of the main region.

main:
  heading: &quot;Alice's Shelf&quot;
  combobox: &quot;Sort by&quot;
    option: &quot;Date added&quot;
    option: &quot;Title&quot;
    option: &quot;Rating&quot;  ← new
  list:
    listitem: &quot;Station Eleven&quot;
      button: &quot;Rate this book&quot;
    listitem: &quot;Piranesi&quot;
      button: &quot;Rate this book&quot;
</code></pre>
<p>يستطيع الوكيل قراءة ذلك والتأكّد من أن «نعم، خيار «التقييم» موجود في القائمة المنسدلة، ولم يتحرّك شيء آخر». وهذه ملاحظة أقوى بكثير من «أخذت لقطة شاشة وتبدو جيّدة».</p>
<p>وإذا لم تُظهر لقطة إمكانية الوصول العنصر الجديد الذي توقّعه الوكيل، فذلك في ذاته خلل — إذ يعني أن الوكيل كتب زرًّا بلا اسم مُتاح لإمكانية الوصول، أو قائمة منسدلة بلا دور، أو شيئًا من هذا القبيل. والتقاط ذلك في وقت المسبار هو بالضبط نوع حلقة الإنذار المبكّر التي نريدها.</p>
<h2 id="تشغيل-خادم-التطوير-وإبقاؤه-حيا">تشغيل خادم التطوير وإبقاؤه حيًّا</h2>
<p>تتطلّب مسابر وقت التشغيل خادم تطوير يعمل. يبدو هذا بديهيًا، لكنه الجزء الأرجح أن يُعلِق الوكيل.</p>
<p>وفيما يلي أنماط قليلة تعمل:</p>
<p><strong>أن يدير الوكيل خادم التطوير بنفسه.</strong> يشغّل الوكيل خادم التطوير في صدفة خلفية، وينتظر لافتة عنوان URL المحلي، ثم يستكشف. وحين ينتهي، يُنهي الخادم. هذا يعمل لكنه شاقّ — فإدارة العمليات الخلفية ليست من مواطن قوة الوكيل.</p>
<p><strong>أن تشغّل خادم التطوير خارج الحلقة وتُخبر الوكيل به.</strong> تُبقي خادم التطوير يعمل في طرفية تملكها أنت. ويقول ملف تعليمات الوكيل: «خادم التطوير يعمل دائمًا على localhost:5173؛ لا تبدأه ولا توقفه.» فيكتفي الوكيل بالاستكشاف. هذا هو خياري الافتراضي في الورشة — أبسط، وأجزاء متحرّكة أقل، وأسهل في الاستدلال.</p>
<p><strong>أن تُشغّل خادم تطوير مخصّصًا للاختبار.</strong> يبدأ CI أو تهيئة Playwright لديك خادم تطوير على منفذ غير معتاد (مثل 4173) للاستكشاف فقط. ويستخدم الوكيل ذلك المنفذ. فيبقى خادم التطوير العادي لديك على 5173 بمنأى عن الوكيل. هذا جيّد للعزل لكنه يضيف تعقيدًا في التهيئة.</p>
<p>اختر واحدًا، وضع عنوان URL والقواعد في تعليمات وكيلك، وامضِ. كنت سأُنفق وقتًا أطول على هذا لو كان مثيرًا للاهتمام. وهو ليس كذلك.</p>
<h2 id="عندما-يجد-المسبار-شيئا">عندما يجد المسبار شيئًا</h2>
<p>وهذا هو الجزء الذي يعجبني. عندما يجد مسبار خللًا حقيقيًا — الزر لا يعمل، أو في وحدة التحكّم تحذير، أو لوحة الشبكة تُظهر 500 — يكون لدى الوكيل كل ما يحتاجه لإصلاح الخلل دون سؤالك. لديه عنوان URL الدقيق، والتفاعل الدقيق، والخطأ الدقيق. يستطيع العودة إلى الشيفرة، وإجراء تعديل، وإعادة تشغيل المسبار. والحلقة مكتملة.</p>
<p>هذه هي الحلقة تعمل كما هو مقصود. أمسك الوكيل خطأه بنفسه، وشخّصه، وأصلحه، وتحقّق من الإصلاح — كل ذلك قبل رسالتك التالية. والشيء الوحيد المتبقّي لك هو مراجعة الإيداع، والإيداع نظيف لأن الوكيل كرّر على نفسه.</p>
<p>حين أرى هذا يعمل، يبدو كالسحر. وهو ليس سحرًا. كل ما في الأمر أن حلقة التغذية الراجعة صارت موجودة أخيرًا.</p>
<h2 id="نمط-الفشل-الذي-أريدك-أن-تراقبه">نمط الفشل الذي أريدك أن تراقبه</h2>
<p>يمكن للمسابر أن تصير عملًا بلا طائل. يستكشف الوكيل <em>كل</em> تغيير، بما فيه تغييرات لا علاقة لها بالواجهة، فتنتهي وأنت تشاهد الوكيل يأخذ لقطات شاشة لصفحات غير ذات صلة خمس دقائق. وهذا إهدار.</p>
<p>قاعدة ملف التعليمات التي اقتبستها آنفًا فيها حارس نطاق مبنيّ في داخلها: «بعد أي تغيير في ملف تحت <code>src/routes/</code> أو <code>src/lib/components/</code>.» وأي شيء خارج هذين المسارين لا يُطلق مسبارًا. ويمكنك توسيع النطاق أو تضييقه بحسب ما تراه يفعل الوكيل. والهدف أن تُطلَق المسابر في الوقت النافع بالضبط، لا كلما تغيّر شيء.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<p>إضافةً إلى قاعدة المسبار أعلاه، أضع هذا في الملف:</p>
<pre><code class="language-markdown"><span class="hljs-section">## Runtime probing rules</span>

<span class="hljs-bullet">-</span> The dev server is running at http://localhost:5173 and should not be
  started or stopped by the agent.
<span class="hljs-bullet">-</span> Use Playwright MCP for probing. Prefer structured accessibility
  snapshots over screenshots as the primary observation; use both for
  visual changes.
<span class="hljs-bullet">-</span> Read the browser console after every interaction. If there is an
  error or a warning that wasn&#x27;t there before your change, fix it.
<span class="hljs-bullet">-</span> If a probe reveals a bug, fix it and re-probe before reporting the
  task as complete.
</code></pre>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>المسابر طريقة الوكيل لفحص عمله في وقت التشغيل دون دفع كلفة مجموعة الاختبارات الكاملة. فهي رخيصة وسريعة، وتلتقط صنف الأخطاء الذي لا تفكّر الاختبارات في تغطيته. علّم الوكيل تشغيلها، وستزول معظم أسئلة «هل جرّبته فعلًا؟» التي تسألها الآن.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/runtime-tools-compared">مقارنة أدوات وقت التشغيل</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper">كتابة غلاف MCP مخصّص</a></li>
</ul>
`,a={book:e,chapter:t,chapterTitle:n,slug:s,title:o,headings:r,html:l};export{e as book,t as chapter,n as chapterTitle,a as default,r as headings,l as html,s as slug,o as title};
