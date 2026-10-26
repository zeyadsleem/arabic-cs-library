const s="kinney",n="testing",a="مدخل إلى الاختبارات",e="dependency-injection",p="حقن الاعتماديات (Dependency Injection)",l=[{depth:2,id:"قبل-حقن-الاعتماديات",text:"قبل حقن الاعتماديات"},{depth:2,id:"والآن-مع-اعتماديات-محقونة-بنسبة-100-إضافية",text:"والآن، مع اعتماديات محقونة بنسبة 100% إضافية"},{depth:2,id:"اختبار-هذه-الشيفرة-الجديدة-الرائعة",text:"اختبار هذه الشيفرة الجديدة الرائعة"},{depth:2,id:"لماذا-نتكبد-العناء",text:"لماذا نتكبد العناء؟"},{depth:2,id:"حقن-الاعتماديات-في-الدوال",text:"حقن الاعتماديات في الدوال"},{depth:2,id:"خاتمة",text:"خاتمة"}],t=`<p>اسم كبير فاخر، وفكرة بسيطة: <strong>حقن الاعتماديات</strong> في دالة أو صنف بدلًا من أن تنشئه الدالة أو الصنف بنفسه.</p>
<p>بكلمات أبسط، بدلًا من أن تكون دالتك ذلك الجيش الفردي الذي يذهب ويجلب كل ما يحتاجه (يطرق الأبواب قائلًا «مرحبًا، أين بيانات واجهة برمجة التطبيقات الخاصة بي؟»)، فأنت زميل فريق جيد وتقول: <strong>«مرحبًا، سأعطيك كل ما تحتاجه مقدمًا.»</strong> لا حاجة لأن تتجول دالتك طالبة الأشياء.</p>
<p>هذا يجعل شيفرتك أكثر مرونة، وأسهل بكثير في الاختبار. الاختبار على وشك أن يصبح أسهل بكثير حتى أنك ستستمتع به فعليًا. ربما.</p>
<h2 id="قبل-حقن-الاعتماديات">قبل حقن الاعتماديات</h2>
<p>لنفترض أن لديك <code>UserService</code> غير ذكي كثيرًا يجلب بعض بيانات المستخدم. لكنه يفعل <em>أكثر من اللازم</em> بقليل بنفسه.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">UserService</span> {
  <span class="hljs-title function_">getUser</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> apiClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ApiClient</span>();
    <span class="hljs-keyword">return</span> apiClient.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/user&#x27;</span>);
  }
}
</code></pre>
<p>هنا، <code>UserService</code> مسؤول عن <strong>إنشاء</strong> نسخة <code>ApiClient</code> ثم استخدامها. وبينما قد يكون <code>ApiClient</code> صنفًا جميلًا، فإن هذا يقرن الاثنين بإحكام. إذا أردت كتابة اختبار لـ <code>UserService</code>، حسنًا… حظًا سعيدًا لأنك ستضطر إلى التعامل مع <code>ApiClient</code> في كل مرة.</p>
<h2 id="والآن-مع-اعتماديات-محقونة-بنسبة-100-إضافية">والآن، مع اعتماديات محقونة بنسبة 100% إضافية</h2>
<p>لنرخِ هذه القيود ونمرر الاعتماديات عبر المُنشئ. فجأة، تبدو الحياة أكثر نسيمًا.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">UserService</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">apiClient</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">apiClient</span> = apiClient;
  }

  <span class="hljs-title function_">getUser</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">apiClient</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/user&#x27;</span>);
  }
}
</code></pre>
<p>عند هذه النقطة، لم يعد <code>UserService</code> يهتم بكيفية إنشاء <code>apiClient</code> — ولا حتى بما تنفيذه الأساسي. كل ما يهتم به: <strong>«مرحبًا، هل مرر لي أحدهم كائنًا لديه تابع <code>.get()</code>؟ رائع، أنا جاهز.»</strong></p>
<h2 id="اختبار-هذه-الشيفرة-الجديدة-الرائعة">اختبار هذه الشيفرة الجديدة الرائعة</h2>
<p>هنا يتألق حقن الاعتماديات حقًا. افترض أنك تريد كتابة اختبار لـ <code>UserService</code> دون ضرب الواجهة الحقيقية فعليًا. ماذا ستفعل؟ حاكِ عميل الواجهة أو ثبّته كبديل!</p>
<p>إليك كيف يمكننا فعل ذلك:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { describe, it, expect, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserService</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./UserService&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;UserService&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;fetches user data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> fakeApiClient = {
      <span class="hljs-attr">get</span>: vi.<span class="hljs-title function_">fn</span>().<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Steve&#x27;</span> }),
    };

    <span class="hljs-keyword">const</span> userService = <span class="hljs-keyword">new</span> <span class="hljs-title class_">UserService</span>(fakeApiClient);
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> userService.<span class="hljs-title function_">getUser</span>();

    <span class="hljs-title function_">expect</span>(fakeApiClient.<span class="hljs-property">get</span>).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;/user&#x27;</span>);
    <span class="hljs-title function_">expect</span>(user).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Steve&#x27;</span> });
  });
});
</code></pre>
<p>أترى كيف يمكننا الآن ببساطة تمرير <code>apiClient</code> مزيف، وإخباره بالضبط كيف يتصرف؟ ثم في الاختبار، لا نقلق من تعقيدات الواجهات الفعلية أو الشبكات: نتأكد فقط أن <code>UserService</code> يستدعي التابع الصحيح ويتلقى البيانات المتوقعة. ذلك هو الرحيق الحلو لصنف مختبَر بنظافة.</p>
<h2 id="لماذا-نتكبد-العناء">لماذا نتكبد العناء؟</h2>
<ul>
<li><strong>قابلية الاختبار:</strong> نعم، هذه هي الكبرى. عندما تكون اعتمادياتك محقونة، يمكنك استبدالها بسهولة ببدائل مُحاكاة أو بدائل أثناء الاختبار. قارن ذلك بالبديل — محاكاة منطق الإنشاء الداخلي (مقزز) أو ضرب واجهة حية فعليًا (أه… لا شكرًا).</li>
<li><strong>المرونة:</strong> يصبح تغيير اعتمادية بسيطًا كتسليم اعتمادية جديدة إلى صنفك أو دالتك. لا حاجة للغوص في الأعماق لمجرد تحديث تنفيذ، ما يجعل تطبيقك أكثر قابلية للصيانة.</li>
<li><strong>فك الارتباط:</strong> عندما لا تحتاج شيفرتك إلى معرفة <em>كيف</em> تُنشأ الأشياء، فهي معزولة إلى حد كبير عن التغييرات. تريد استبدال <code>ApiClient</code> بشيء آخر؟ سلّم الاعتمادية الجديدة فقط. لا دراما، ولا دموع.</li>
</ul>
<h2 id="حقن-الاعتماديات-في-الدوال">حقن الاعتماديات في الدوال</h2>
<p>لا تحتاج إلى أصناف فاخرة لممارسة حقن الاعتماديات أيضًا! يمكنك فعل ذلك بدوال بسيطة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">getUser</span>(<span class="hljs-params">apiClient</span>) {
  <span class="hljs-keyword">return</span> apiClient.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/user&#x27;</span>);
}
</code></pre>
<p>بوم، مرونة! يمكنك تمرير أي كائن تريده إلى <code>getUser()</code> — حتى كائن مزيف تمامًا لأغراض الاختبار (لا تقلق، لن أخبر أحدًا).</p>
<h2 id="خاتمة">خاتمة</h2>
<p>حقن الاعتماديات ليس مخيفًا. بل ليس معقدًا حتى. إنه مجرد خفة يد صغيرة حيث تمرر الأشياء من الخارج بدلًا من إنشاء كل شيء داخل دالة أو صنف. هذا النمط يفك ارتباط شيفرتك، ويجعل تغييرها <em>و</em> اختبارها أسهل. ثق بي، سيشكرك مستقبلك.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,t as html,e as slug,p as title};
