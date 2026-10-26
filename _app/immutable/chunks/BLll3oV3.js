const s="kinney",a="enterprise-ui",n="واجهات المؤسسات",e="broadcast-channel",t="BroadcastChannel للتواصل عبر الحدود",c=[{depth:2,id:"الواجهة-البرمجية",text:"الواجهة البرمجية"},{depth:3,id:"إنشاء-قناة",text:"إنشاء قناة"},{depth:3,id:"نشر-الرسائل",text:"نشر الرسائل"},{depth:3,id:"الاستماع-إلى-الرسائل",text:"الاستماع إلى الرسائل"},{depth:3,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"},{depth:3,id:"إغلاق-قناة",text:"إغلاق قناة"},{depth:2,id:"ما-ليس-عليه-broadcastchannel",text:"ما ليس عليه BroadcastChannel"},{depth:2,id:"حالات-استخدام-تتجاوز-الاتحاد",text:"حالات استخدام تتجاوز الاتحاد"},{depth:3,id:"مزامنة-الجلسة-عبر-علامات-التبويب",text:"مزامنة الجلسة عبر علامات التبويب"},{depth:3,id:"نشر-السمة-والتفضيلات",text:"نشر السمة والتفضيلات"},{depth:3,id:"إبطال-الذاكرة-المؤقتة",text:"إبطال الذاكرة المؤقتة"},{depth:3,id:"التنسيق-مع-service-worker",text:"التنسيق مع Service Worker"},{depth:3,id:"البديل-من-shared-worker",text:"البديل من Shared Worker"},{depth:3,id:"الميزات-التعاونية",text:"الميزات التعاونية"},{depth:2,id:"لماذا-يهم-هذا-في-module-federation",text:"لماذا يهمّ هذا في Module Federation"},{depth:2,id:"النمط-عمليا",text:"النمط عمليًا"},{depth:2,id:"مشكلة-الحالة-الابتدائية",text:"مشكلة الحالة الابتدائية"},{depth:2,id:"broadcastchannel-مقابل-nanostores",text:"BroadcastChannel مقابل Nanostores"},{depth:2,id:"متى-تلجأ-إلى-broadcastchannel",text:"متى تلجأ إلى BroadcastChannel"}],p=`<p>تفترض معظم إدارة حالة الواجهة الأمامية صفحة واحدة بسياق JavaScript واحد. فـ React Context وZustand وnanostores وRedux تعيش كلها في مساحة ذاكرة واحدة، وشجرة مكوّنات واحدة، وحزمة واحدة. وينكسر هذا الافتراض في ثلاث حالات شائعة على الأقل: عندما تفتح التطبيق نفسه في عدة علامات تبويب، وعندما تركّب تطبيقًا من iframes أو remotes في Module Federation، وعندما تحتاج إلى التنسيق بين الخيط الرئيسي وService Worker أو Shared Worker.</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel"><code>BroadcastChannel</code></a> هو إجابة المتصفح المدمجة على الثلاثة جميعًا. فهو ناقل رسائل مُسمّى مُقيّد بالأصل (origin)، وأي سياق تصفّح—علامات التبويب، وiframes، وworkers، وremotes الاتحاد—يستطيع النشر إليه والاستماع عليه دون استيراد أي اعتماد.</p>
<h2 id="الواجهة-البرمجية">الواجهة البرمجية</h2>
<p>الواجهة كلها تتّسع على بطاقة فهرس. فتنشئ قناة باسم، وتنشر رسائل مُهيكلة، وتستمع إليها، وتُغلق عند الانتهاء.</p>
<h3 id="إنشاء-قناة">إنشاء قناة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> channel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;auth&#x27;</span>);
</code></pre>
<p>هذا كل شيء. أي شيفرة أخرى تعمل على الأصل نفسه وتنشئ <code>new BroadcastChannel('auth')</code> تصبح الآن جزءًا من القناة نفسها. لا خطوة تسجيل، ولا مصافحة، ولا خادم. فالمتصفح يدير التوجيه داخليًا.</p>
<p><strong>مُقيَّدة بالأصل (Origin-scoped)</strong> تعني أن القناة مرتبطة بمزيج البروتوكول والمضيف والمنفذ. فـ <code>https://example.com</code> و<code>http://example.com</code> أصلان مختلفان. و<code>localhost:3000</code> و<code>localhost:3001</code> أصلان مختلفان. ولا تستطيع شيفرة من أصل أن تستمع إلى قنوات أصل آخر أو تنشر إليها. وهذا التقييد حدّ أمني، لا خيار تهيئة.</p>
<h3 id="نشر-الرسائل">نشر الرسائل</h3>
<pre><code class="language-typescript">channel.<span class="hljs-title function_">postMessage</span>({
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;AUTH_UPDATE&#x27;</span>,
  <span class="hljs-attr">payload</span>: { <span class="hljs-attr">user</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Grace Hopper&#x27;</span> }, <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">true</span> },
});
</code></pre>
<p>يمكن أن تكون الوسيطة الممرّرة إلى <code>postMessage</code> أي قيمة تنجو من <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm">خوارزمية الاستنساخ المُهيكل</a>—كائنات، ومصفوفات، و<code>Map</code>، و<code>Set</code>، و<code>Date</code>، و<code>ArrayBuffer</code>، و<code>Blob</code>، و<code>File</code>، و<code>RegExp</code>، وتراكيب متداخلة من كل ذلك، وأكثر. أما ما <em>لا</em> تستطيع استنساخه: الدوال، وعُقد DOM، و<code>Symbol</code>، و<code>WeakMap</code>، و<code>WeakSet</code>، وأي شيء له سلسلة نماذج لا تتعرّف عليها الخوارزمية. وإذا احتوت رسالتك على شيء غير قابل للاستنساخ، فالنشر يرمي <code>DataCloneError</code> بشكل متزامن.</p>
<p>وثمة تفصيل يفاجئ الناس: المُرسِل لا يستقبل رسائله هو. فنسخ <code>BroadcastChannel</code> الأخرى بالاسم نفسه—في سياقات أخرى—هي التي تتلقّى حدث <code>message</code>. وإذا كان لديك قناتان باسم <code>'auth'</code> في الصفحة نفسها، فالثانية تستقبل الرسائل التي تنشرها الأولى، والعكس صحيح. لكن نسخة القناة الواحدة لا تُرجع أبدًا منشوراتها إلى نفسها.</p>
<h3 id="الاستماع-إلى-الرسائل">الاستماع إلى الرسائل</h3>
<pre><code class="language-typescript">channel.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(event.<span class="hljs-property">data</span>); <span class="hljs-comment">// whatever was passed to postMessage</span>
});
</code></pre>
<p>الحدث <code>event</code> هو <a href="https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent"><code>MessageEvent</code></a>. وتحتوي الخاصية <code>data</code> على الرسالة المستنسخة. وهناك أيضًا <code>event.origin</code>، وهو أصل سياق النشر (دائمًا أصلك أنت مع <code>BroadcastChannel</code>، لأن القنوات عبر الأصول غير موجودة)، و<code>event.source</code>، وهو <code>null</code> مع <code>BroadcastChannel</code> (بخلاف <code>window.postMessage</code>، الذي يمنحك مرجعًا إلى المُرسِل).</p>
<p>يمكنك أيضًا استخدام الخاصية <code>onmessage</code> بدلًا من <code>addEventListener</code>. السلوك نفسه، لكنها محدودة بمُعالِج واحد.</p>
<h3 id="معالجة-الأخطاء">معالجة الأخطاء</h3>
<pre><code class="language-typescript">channel.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;messageerror&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to deserialize message:&#x27;</span>, event);
});
</code></pre>
<p>يُطلق حدث <code>messageerror</code> عندما يستقبل المتصفح رسالة لكنه لا يستطيع فكّ تسلسلها. وعمليًا هذا نادر مع <code>BroadcastChannel</code> لأن الطرفين على الأصل نفسه ويشغّلان عادة شيفرة متشابهة، لكنه قد يحدث إذا أرسل Service Worker أو Worker بيانات باستخدام نقل لا يستطيع المُستقبِل إعادة بنائه.</p>
<h3 id="إغلاق-قناة">إغلاق قناة</h3>
<pre><code class="language-typescript">channel.<span class="hljs-title function_">close</span>();
</code></pre>
<p>بعد <code>close()</code>، تتوقف القناة عن استقبال الرسائل ولا تستطيع إرسالها. وهي غير قابلة لإعادة الاستخدام—فإن احتجتها مجددًا، أنشئ نسخة جديدة. وأغلق القنوات دائمًا في شيفرة التنظيف (القيمة المُعادة من <code>useEffect</code> في React، وتفكيك المكوّن، وإيقاف worker) لتجنّب تسريب المستمعين.</p>
<h2 id="ما-ليس-عليه-broadcastchannel">ما ليس عليه <code>BroadcastChannel</code></h2>
<p><code>BroadcastChannel</code> ليس مخزنًا دائمًا. فليس له ذاكرة. ولا توجد «قيمة حالية» تقرؤها عند الاشتراك—بل تستقبل فقط الرسائل المنشورة <em>بعد</em> أن تبدأ الاستماع. فإن أنشأت قناة ولم ينشر أحد شيئًا بعد، فلا تحصل على شيء. وإن نشر المُرسِل قبل خمس ثوانٍ وفتحت للتوّ علامة تبويب جديدة، فقد فاتك الأمر.</p>
<p>كما أنه ليس عبر الأصول. فبخلاف <code>window.postMessage</code>، الذي يستطيع استهداف نوافذ محددة عبر الأصول، <code>BroadcastChannel</code> مقفل على الأصل الحالي. ولا يمكنك استخدامه للتواصل بين <code>app.example.com</code> و<code>api.example.com</code>.</p>
<p>وليس مرتّبًا عبر السياقات بأي طريقة مضمونة. فالرسائل من مُرسِل واحد تصل بترتيبها عند مُستقبِل واحد، لكن إن نشر عدة مُرسِلين في الوقت نفسه، فقد يراها المُستقبِلون بترتيبات مختلفة. ولمعظم حالات الاستخدام—مزامنة المصادقة، وتغييرات السمة، والإشعارات—لا يهم هذا. أما أي شيء يحتاج ترتيبًا سببيًا، فستحتاج فيه إلى أرقام تسلسلية أو طوابع زمنية في حُمولة الرسالة.</p>
<h2 id="حالات-استخدام-تتجاوز-الاتحاد">حالات استخدام تتجاوز الاتحاد</h2>
<p><code>BroadcastChannel</code> مفيد في أي مكان تحتاج فيه إلى تنسيق خفيف بنمط «أرسل وانسَ» عبر سياقات التصفح. وهذه هي الأنماط التي تتكرّر أكثر من غيرها.</p>
<h3 id="مزامنة-الجلسة-عبر-علامات-التبويب">مزامنة الجلسة عبر علامات التبويب</h3>
<p>أكثر استخدام شائع في الإنتاج. فعندما يسجّل المستخدم الدخول في علامة تبويب، ينبغي أن تعكس كل علامة أخرى ذلك فورًا. وعندما يسجّل الخروج، الأمر نفسه. وبدون <code>BroadcastChannel</code>، تكون علامات التبويب جزرًا معزولة—فعلى كل واحدة أن تستطلع الخادم أو تنتظر تحديث الصفحة لاكتشاف تغييرات الجلسة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// On login</span>
<span class="hljs-keyword">const</span> sessionChannel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;session&#x27;</span>);
sessionChannel.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;LOGIN&#x27;</span>, <span class="hljs-attr">user</span>: currentUser });

<span class="hljs-comment">// On logout</span>
sessionChannel.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;LOGOUT&#x27;</span> });
</code></pre>
<p>وتستمع كل علامة تبويب أخرى وتحدّث واجهتها وفقًا لذلك. فيرى المستخدم اتساقًا فوريًا عبر علامات التبويب دون أي رحلات ذهاب وإياب إلى الخادم.</p>
<p>ويعالج هذا أيضًا المشكلة المحرجة: «سجّل الخروج في علامة تبويب، ولا يزال يتفاعل في أخرى». فبث تسجيل الخروج المُوصَّل جيدًا يستطيع إعادة توجيه كل علامات التبويب إلى صفحة الدخول، ومسح الذاكرات المؤقتة المحلية، ومنع نداءات API بجلسة قديمة.</p>
<h3 id="نشر-السمة-والتفضيلات">نشر السمة والتفضيلات</h3>
<p>إذا بدّل المستخدم الوضع الداكن في علامة تبويب، ينبغي أن تتبدّل كل علامة أخرى أيضًا. وكذلك اللغة، وحجم الخط، وتقليل الحركة، وأي تفضيل آخر للمستخدم يؤثر في الواجهة عمومًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> prefsChannel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;preferences&#x27;</span>);

<span class="hljs-comment">// When user changes theme</span>
prefsChannel.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;THEME_CHANGE&#x27;</span>, <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span> });
</code></pre>
<p>ستقرن هذا عادة بـ <code>localStorage</code> ليبقى التفضيل عبر الجلسات، وتستخدم <code>BroadcastChannel</code> فقط لإخطار علامات التبويب المفتوحة أصلًا بالتغيير. ولـ <code>localStorage</code> حدث <code>storage</code> خاص به يُطلق عبر علامات التبويب، لكنه يعمل فقط مع تعديلات <code>localStorage</code>—أما <code>BroadcastChannel</code> فيمنحك نمط مراسلة أعم.</p>
<h3 id="إبطال-الذاكرة-المؤقتة">إبطال الذاكرة المؤقتة</h3>
<p>عندما تجلب علامة تبويب بيانات جديدة وتكتبها في <code>IndexedDB</code> أو ذاكرة مؤقتة محلية، تصبح علامات التبويب الأخرى قديمة. ويمكن لـ <code>BroadcastChannel</code> أن يخطرها لإعادة الجلب أو القراءة من الذاكرة المحدّثة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> cacheChannel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;cache-updates&#x27;</span>);

<span class="hljs-comment">// After writing fresh data to IndexedDB</span>
cacheChannel.<span class="hljs-title function_">postMessage</span>({
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CACHE_INVALIDATED&#x27;</span>,
  <span class="hljs-attr">keys</span>: [<span class="hljs-string">&#x27;user-profile&#x27;</span>, <span class="hljs-string">&#x27;notifications&#x27;</span>],
});
</code></pre>
<p>هذا هو النمط نفسه الذي تستخدمه Service Workers داخليًا. فـ <a href="https://developer.mozilla.org/en-US/docs/Web/API/Cache">Cache API</a> ليس فيه إشعارات تغيير مدمجة، لذا يسدّ <code>BroadcastChannel</code> هذه الفجوة.</p>
<h3 id="التنسيق-مع-service-worker">التنسيق مع Service Worker</h3>
<p>تستطيع Service Workers إنشاء نسخ <code>BroadcastChannel</code>، ما يعني أنها تستطيع إخطار العملاء بإشعارات الدفع، واكتمال المزامنة الخلفية، وتحديثات الذاكرة المؤقتة، أو الانتقالات من دون اتصال إلى متصل. والبديل هو <code>postMessage</code> عبر واجهة <code>ServiceWorkerRegistration</code>، وهو أكثر صراحة لكنه أيضًا أكثر إسهابًا ويتطلب إدارة قائمة العملاء.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In the Service Worker</span>
<span class="hljs-keyword">const</span> updateChannel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;sw-updates&#x27;</span>);

<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;push&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> data = event.<span class="hljs-property">data</span>.<span class="hljs-title function_">json</span>();
  updateChannel.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PUSH_RECEIVED&#x27;</span>, <span class="hljs-attr">notification</span>: data });
});
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// In the main thread</span>
<span class="hljs-keyword">const</span> updateChannel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;sw-updates&#x27;</span>);
updateChannel.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;PUSH_RECEIVED&#x27;</span>) {
    <span class="hljs-title function_">showInAppNotification</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">notification</span>);
  }
});
</code></pre>
<h3 id="البديل-من-shared-worker">البديل من Shared Worker</h3>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker">Shared Workers</a> قادرة على التواصل مع عدة علامات تبويب، لكنها تتطلب إدارة منافذ صريحة ودعم المتصفحات فيها أضعف من <code>BroadcastChannel</code>. وللتنسيق البسيط—«أخبِر كل علامات التبويب عن X»—يكون <code>BroadcastChannel</code> دائمًا تقريبًا الخيار الأبسط. أما Shared Workers فهي الأداة الأفضل عندما تحتاج إلى حساب دائم يعمل عبر علامات التبويب (مثل اتصال WebSocket مشترك)، لكن في المراسلة الصِرفة، يفوز <code>BroadcastChannel</code> بالبساطة.</p>
<h3 id="الميزات-التعاونية">الميزات التعاونية</h3>
<p>إذا كنت تبني تحريرًا تعاونيًا، أو مؤشرات حية، أو تحديدات مشتركة عبر عروض المستند نفسه المفتوح في عدة علامات تبويب، يمنحك <code>BroadcastChannel</code> نشرًا محليًا فوريًا قبل أي رحلة إلى الخادم. فالتعاون المدعوم بالخادم (WebSocket، SSE) يتولّى المزامنة بين المستخدمين، بينما يتولّى <code>BroadcastChannel</code> المزامنة بين علامات تبويب المستخدم نفسه.</p>
<h2 id="لماذا-يهم-هذا-في-module-federation">لماذا يهمّ هذا في Module Federation</h2>
<p>والآن، لنعد إلى <a href="https://stevekinney.com/courses/enterprise-ui/runtime-composition-exercise">تمرين التركيب وقت التشغيل</a>. لقد حللنا المصادقة عبر الحدود بـ <a href="https://stevekinney.com/courses/enterprise-ui/nanostores">nanostores</a> واعتمادات مشتركة أحادية (singleton). هذا ينجح، لكنه يعتمد على تفاوض الأحادية في Module Federation ليضمن أن يرى الطرفان كائن المخزن نفسه. ويجب إعلان ثلاث حزم—<code>@pulse/shared</code> و<code>nanostores</code> و<code>@nanostores/react</code>—كاعتمادات مشتركة أحادية. وإن غاب أي من هذه الإعلانات، يحصل المضيف والـ remote على نسخ ذرّات منفصلة ولا تتدفق الحالة بينهما أبدًا. ونمط الفشل صامت: لا أخطاء، فقط «غير مُصادَق عليه» إلى الأبد.</p>
<p>يتحاشى <code>BroadcastChannel</code> هذه المشكلة برمّتها. فهو لا يهمّه إن كانت الوحدات مشتركة أو مكرّرة. ولا يعتمد على تفاوض Module Federation وقت التشغيل. فبُنيتان مستقلتان تمامًا، بلا أي اعتماد مشترك بينهما، تستطيعان مع ذلك التواصل عبر قناة مُسمّاة ما دامتا على الأصل نفسه. وهذا نموذج ثقة مختلف جذريًا.</p>
<p>والمقايضة أن <code>BroadcastChannel</code> غير متزامن ومترابط بشكل مفكوك. فمع nanostores، يقرأ الـ remote القيمة الحالية بشكل متزامن عند أول تصيير عبر <code>authStore.get()</code>. أما مع <code>BroadcastChannel</code>، فعلى الـ remote انتظار رسالة—فثمة فجوة توقيت بين إرسال المضيف واستقبال الـ remote. وإن صيّر الـ remote قبل أن ينشر المضيف تحديث المصادقة، فسيعرض لفترة وجيزة «غير مُصادَق عليه» حتى تصل الرسالة.</p>
<h2 id="النمط-عمليا">النمط عمليًا</h2>
<p>يحتوي مستودع التمرين أصلًا على نقطة بداية في <a href="https://github.com/stevekinney/enterprise-ui-federation/blob/main/shared/src/auth.ts"><code>shared/src/auth.ts</code></a>، تُعرّف <code>AUTH_CHANNEL</code> وواجهة <code>AuthEvent</code>. وهكذا يعمل النمط كاملًا.</p>
<p>على جانب المضيف، تبثّ حالة المصادقة كلما تغيّرت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> authChannel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;auth&#x27;</span>);

<span class="hljs-comment">// After fetching user data</span>
authChannel.<span class="hljs-title function_">postMessage</span>({
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;AUTH_UPDATE&#x27;</span>,
  <span class="hljs-attr">payload</span>: {
    <span class="hljs-attr">user</span>: data,
    <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;mock-jwt-token-&#x27;</span> + data.<span class="hljs-property">id</span>,
  },
});
</code></pre>
<p>وعلى جانب الـ remote، تستمع إلى تلك الرسائل وتحدّث الحالة المحلية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> [auth, setAuth] = <span class="hljs-title function_">useState</span>({ <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">isAuthenticated</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">token</span>: <span class="hljs-literal">null</span> });

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> channel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;auth&#x27;</span>);

  channel.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;AUTH_UPDATE&#x27;</span>) {
      <span class="hljs-title function_">setAuth</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">payload</span>);
    }
  });

  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> channel.<span class="hljs-title function_">close</span>();
}, []);
</code></pre>
<p>لاحظ أن الـ remote لا يستورد شيئًا من المضيف ولا من وحدة أحادية مشتركة. فالعقد هو فقط اسم القناة وشكل الرسالة. وهذا يجعل <code>BroadcastChannel</code> مفيدًا بشكل خاص عندما لا تستطيع ضمان مشاركة الأحادية—مثلًا عندما تُحمَّل remotes من أصول مختلفة أو عندما تركّب تطبيقات لم تُبنَ بـ Module Federation أصلًا.</p>
<h2 id="مشكلة-الحالة-الابتدائية">مشكلة الحالة الابتدائية</h2>
<p>أكبر ثغرة في <code>BroadcastChannel</code> لهذه الحالة هو انعدام «قيمة حالية». فعندما يشترك الـ remote، لا يحصل على آخر ما نُشر—بل يستقبل الرسائل المستقبلية فقط. وإن كان المضيف قد نشر تحديث المصادقة قبل تشغيل <code>useEffect</code> في الـ remote، فقد فاته.</p>
<p>ومن الأنماط الشائعة لحلّ هذا مصافحة طلب/استجابة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Remote: request current auth state on mount</span>
<span class="hljs-keyword">const</span> channel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;auth&#x27;</span>);
channel.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;AUTH_REQUEST&#x27;</span> });

<span class="hljs-comment">// Host: respond to requests</span>
channel.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;AUTH_REQUEST&#x27;</span>) {
    channel.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;AUTH_UPDATE&#x27;</span>, <span class="hljs-attr">payload</span>: currentAuthState });
  }
});
</code></pre>
<p>هذا يضيف تعقيدًا، لكنه يجعل العقد صريحًا أيضًا. فتعرف بالضبط أي رسائل تتدفق، وفي أي اتجاه، ومتى.</p>
<p>وثمة نهج آخر هو قرن <code>BroadcastChannel</code> بـ <code>localStorage</code>. اكتب حالة المصادقة الحالية في <code>localStorage</code> عند كل تحديث، واقرأها عند التركيب كقيمة ابتدائية. واستخدم <code>BroadcastChannel</code> فقط لإشعارات التغيير في الوقت الحقيقي. وهذا يمنحك أفضل ما في العالمين: قراءة ابتدائية متزامنة وتحديثات تفاعلية عبر السياقات.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Read initial state from localStorage</span>
  <span class="hljs-keyword">const</span> stored = <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;auth&#x27;</span>);
  <span class="hljs-keyword">if</span> (stored) <span class="hljs-title function_">setAuth</span>(<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(stored));

  <span class="hljs-comment">// Listen for live updates via BroadcastChannel</span>
  <span class="hljs-keyword">const</span> channel = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BroadcastChannel</span>(<span class="hljs-string">&#x27;auth&#x27;</span>);
  channel.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;AUTH_UPDATE&#x27;</span>) {
      <span class="hljs-title function_">setAuth</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">payload</span>);
    }
  });

  <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> channel.<span class="hljs-title function_">close</span>();
}, []);
</code></pre>
<h2 id="broadcastchannel-مقابل-nanostores"><code>BroadcastChannel</code> مقابل Nanostores</h2>
<p>كلاهما يحلّ مشكلة التواصل عبر الحدود، لكن بمقايضات مختلفة.</p>
<table>
<thead>
<tr>
<th>البُعد</th>
<th>Nanostores</th>
<th><code>BroadcastChannel</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>النطاق</td>
<td>صفحة واحدة (سياق JS واحد)</td>
<td>الأصل نفسه (عبر علامات التبويب، عبر iframes)</td>
</tr>
<tr>
<td>القيمة الابتدائية</td>
<td>متزامنة عبر <code>.get()</code></td>
<td>لا شيء (يجب الطلب أو استخدام localStorage)</td>
</tr>
<tr>
<td>نموذج الاشتراك</td>
<td>تفاعلي (<code>.subscribe()</code>)</td>
<td>قائم على الأحداث (حدث <code>message</code>)</td>
</tr>
<tr>
<td>اعتماد مشترك مطلوب</td>
<td>نعم (سلسلة أحادية مطلوبة)</td>
<td>لا</td>
</tr>
<tr>
<td>التسلسل</td>
<td>لا شيء (الذاكرة نفسها)</td>
<td>استنساخ مُهيكل (لا دوال/DOM)</td>
</tr>
<tr>
<td>الدعم عبر علامات التبويب</td>
<td>لا</td>
<td>نعم</td>
</tr>
<tr>
<td>ارتباطات الأطر</td>
<td>React، Vue، Svelte، Angular</td>
<td>لا حاجة لأي منها (أصلي في المتصفح)</td>
</tr>
<tr>
<td>نمط الفشل</td>
<td>صامت إن انكسرت الأحادية</td>
<td>صامت إن لم يكن ثمة مستمع جاهز</td>
</tr>
</tbody>
</table>
<p>وعمليًا، تستخدم فرق كثيرة كليهما. Nanostores للتفاعلية داخل الصفحة، و<code>BroadcastChannel</code> للمزامنة عبر علامات التبويب. هذا ليس هندسة مفرطة. بل استخدام لكل أداة حيث تكون قوية فعلًا.</p>
<h2 id="متى-تلجأ-إلى-broadcastchannel">متى تلجأ إلى <code>BroadcastChannel</code></h2>
<p>استخدم <code>BroadcastChannel</code> عندما تحتاج إلى تواصل عبر الحدود لا يعتمد على آلة الأحادية في Module Federation—أو عندما تحتاج إلى تواصل عبر علامات التبويب، وهو ما لا تستطيع nanostores منحك إياه إطلاقًا. وهو أيضًا الخيار الصحيح عندما قد لا تتشارك الأطراف المتواصلة نظام بناء. فإن كنت تركّب تطبيقًا من iframe، وremote متحد، وService Worker، فـ <code>BroadcastChannel</code> هو البدائية الوحيدة التي تعمل عبر الثلاثة جميعًا.</p>
<p>واستخدم nanostores (أو أي مخزن أحادي مشترك) عندما تريد وصولًا متزامنًا إلى الحالة، واشتراكات تفاعلية بلا فجوات توقيت، ونموذج برمجة أبسط. فقط تذكّر أن شرط الأحادية حامل للبنية—فإن انكسر، بدا كل شيء على ما يرام إلا الجزء الذي لا تتدفق فيه الحالة.</p>
<p><code>BroadcastChannel</code> من تلك الواجهات التي وُجدت في المتصفحات سنوات، ولها دعم شامل، ومع ذلك لا تنال الاهتمام الذي تستحقه. فمعظم الفرق تلجأ إلى WebSocket أو الاستطلاع عندما تحتاج تنسيقًا عبر علامات التبويب، أو تتّكئ على حالة خاصة بإطار عندما تحتاج تواصلًا عبر الحدود. أما <code>BroadcastChannel</code> فهو الإجابة المملّة ذات الاعتماد الصفري التي تعمل بالفعل—وفي هندسة الواجهات الأمامية، الإجابات المملّة التي تعمل بالفعل هي التي يجب أن تبدأ بها.</p>
`,l={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:c,html:p};export{s as book,a as chapter,n as chapterTitle,l as default,c as headings,p as html,e as slug,t as title};
