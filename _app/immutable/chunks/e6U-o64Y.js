const s="kinney",a="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="storage-state-authentication",e="المصادقة بحالة التخزين",l=[{depth:2,id:"الفكرة",text:"الفكرة"},{depth:2,id:"التهيئة",text:"التهيئة"},{depth:3,id:"الخيار-أ-تسجيل-الدخول-عبر-الواجهة",text:"الخيار أ: تسجيل الدخول عبر الواجهة"},{depth:3,id:"الخيار-ب-ضرب-نقطة-نهاية-المصادقة-مباشرة",text:"الخيار ب: ضرب نقطة نهاية المصادقة مباشرة"},{depth:3,id:"أيهما-تختار",text:"أيّهما تختار؟"},{depth:3,id:"كيف-يبدو-ملف-حالة-التخزين-والكائن",text:"كيف يبدو ملف حالة التخزين والكائن"},{depth:2,id:"بعض-الحالات-الحدية-المتقدمة-في-حالة-المصادقة",text:"بعض الحالات الحدّية المتقدّمة في حالة المصادقة"},{depth:2,id:"توصيله-بالتهيئة",text:"توصيله بالتهيئة"},{depth:2,id:"أدوار-متعددة",text:"أدوار متعدّدة"},{depth:2,id:"مزودو-المصادقة-الخارجيون-ينتهون-أيضا-إلى-حالة-التخزين",text:"مزوّدو المصادقة الخارجيون ينتهون أيضًا إلى حالة التخزين"},{depth:2,id:"ملف-gitignore-الذي-تحتاجه",text:"ملف .gitignore الذي تحتاجه"},{depth:2,id:"متى-تعيد-المصادقة",text:"متى تعيد المصادقة"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>هذا نمط أراه في كل مجموعة Playwright أورثها تقريبًا — وهو يفعل ضررًا أكبر ممّا يدركه أي أحد في الفريق.</p>
<pre><code class="language-typescript">test.<span class="hljs-title function_">beforeEach</span>(<span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/login&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;[name=email]&#x27;</span>, <span class="hljs-string">&#x27;alice@example.com&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;[name=password]&#x27;</span>, <span class="hljs-string">&#x27;password123&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">click</span>(<span class="hljs-string">&#x27;button[type=submit]&#x27;</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveURL</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
});
</code></pre>
<p>كل اختبار على حدة يسجّل الدخول عبر الواجهة. كل اختبار على حدة يفتح صفحة تسجيل الدخول، ويملأ الحقول، وينقر الإرسال، وينتظر إعادة التوجيه. فإن كانت مجموعتك مئة اختبار وكان تسجيل الدخول يستغرق 1.5 ثانية، فقد أنفقت للتوّ 150 ثانية من الزمن الفعلي في تكرار الشيء نفسه مرارًا. وهذا مال حقيقي في التكامل المستمر. وهو محليًا السبب في أن لا أحد يشغّل المجموعة كاملة.</p>
<p>بل يزداد الأمر سوءًا. فكل عملية تسجيل دخول من تلك العمليات هي <em>أيضًا</em> نقطة فشل محتملة مستقلة عن أي شيء يختبره الاختبار فعلًا. فإن غيّر أحدهم السمة <code>name</code> في حقل البريد الإلكتروني، انكسر خمسون اختبارًا دفعة واحدة، ولا علاقة لأي منها بتسجيل الدخول. وتكون مخرجات الاختبار جدارًا أحمر مليئًا بأخطاء «العنصر غير موجود»، والوكيل الذي ينظر إلى ذلك الجدار الأحمر سيمضي بسرور ليعيد كتابة خمسين اختبارًا بينما الإصلاح الفعلي هو تحديث محدّد واحد في <code>beforeEach</code> واحد.</p>
<p>هناك طريقة أفضل. وليست جديدة. إنها في <a href="https://playwright.dev/docs/auth">وثائق Playwright</a>. اسمها <a href="https://playwright.dev/docs/auth">حالة التخزين</a>، ولا أحد تقريبًا يستخدمها.</p>
<h2 id="الفكرة">الفكرة</h2>
<p>سجّل الدخول مرّة واحدة، في بداية تشغيل الاختبارات. واحفظ حالة المتصفّح الناتجة — ملفات تعريف الارتباط، و<code>localStorage</code>، و<code>IndexedDB</code> إن طلبتها — في JSON. وأخبر كل اختبار أن يبدأ من تلك الحالة بدلًا من متصفّح فارغ. الآن يبدأ كل اختبار وقد سُجّل الدخول إليه سلفًا، وقد دفعت كلفة تسجيل الدخول مرّة واحدة بالضبط.</p>
<p>يملك Playwright دعمًا من الدرجة الأولى لهذا. لا تحتاج إلى إضافات، ولا تحتاج إلى تجهيزات بارعة، كل ما تحتاجه أن تعرف أين يوجد المقبضان.</p>
<p>ملاحظة تسمية واحدة من <a href="https://playwright.dev/docs/auth">وثائق المصادقة</a> الرسمية: تستخدم الوثائق <code>playwright/.auth/</code> كمجلد اصطلاحي. أما Shelf فيحجز <code>playwright/.authentication/</code> في ملف <code>.gitignore</code> لعمل المختبر في هذا الدرس، وهذا لا بأس به. الاصطلاح أقل أهمية من القاعدة: أبقِ الملفات خارج git واجعل الموقع واضحًا.</p>
<h2 id="التهيئة">التهيئة</h2>
<p>أنشئ ملف تهيئة Playwright — يضيف هذا المختبر <code>tests/authentication.setup.ts</code> إلى Shelf — يسجّل الدخول ويكتب الحالة إلى ملف. وهناك طريقتان لأداء جزء «تسجيل الدخول»، وكلتاهما تستحقّ المعرفة.</p>
<h3 id="الخيار-أ-تسجيل-الدخول-عبر-الواجهة">الخيار أ: تسجيل الدخول عبر الواجهة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> setup, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;

<span class="hljs-keyword">const</span> authenticationFile = path.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span>);

<span class="hljs-title function_">setup</span>(<span class="hljs-string">&#x27;authenticate&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/login&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByLabel</span>(<span class="hljs-string">&#x27;Email&#x27;</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;alice@example.com&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByLabel</span>(<span class="hljs-string">&#x27;Password&#x27;</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-string">&#x27;password123&#x27;</span>);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Sign in&#x27;</span> }).<span class="hljs-title function_">click</span>();
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page).<span class="hljs-title function_">toHaveURL</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);

  <span class="hljs-comment">// Save cookies, localStorage, etc., to a file</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">storageState</span>({ <span class="hljs-attr">path</span>: authenticationFile });
});
</code></pre>
<p>هذا هو الافتراضي المحافظ، وهو ما يستخدمه Shelf. إنه يشغّل تدفّق تسجيل الدخول الحقيقي — الصفحة نفسها، والنموذج نفسه، وإعادة التوجيه نفسها — مرّة واحدة لكل استدعاء Playwright بدلًا من مرّة لكل اختبار. والأثر الجانبي أنه يعمل أيضًا كاختبار دخان: فإن كسر أحدهم نموذج تسجيل الدخول، فشلت التهيئة قبل أن يعمل أي اختبار آخر، وكان الخطأ واضحًا.</p>
<h3 id="الخيار-ب-ضرب-نقطة-نهاية-المصادقة-مباشرة">الخيار ب: ضرب نقطة نهاية المصادقة مباشرة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test <span class="hljs-keyword">as</span> setup, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;

<span class="hljs-keyword">const</span> authenticationFile = path.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span>);

<span class="hljs-title function_">setup</span>(<span class="hljs-string">&#x27;authenticate&#x27;</span>, <span class="hljs-title function_">async</span> ({ request }) =&gt; {
  <span class="hljs-comment">// Shelf&#x27;s login is a SvelteKit form action, not a JSON API endpoint.</span>
  <span class="hljs-comment">// POST to \`/login?/signInEmail\` with form-encoded credentials.</span>
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/login?/signInEmail&#x27;</span>, {
    <span class="hljs-attr">form</span>: { <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;password123&#x27;</span> },
  });

  <span class="hljs-title function_">expect</span>(response.<span class="hljs-title function_">ok</span>()).<span class="hljs-title function_">toBeTruthy</span>();

  <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">storageState</span>({ <span class="hljs-attr">path</span>: authenticationFile });
});
</code></pre>
<p>لا تحميل صفحة، ولا عرض DOM، ولا اعتماد على ترميز نموذج تسجيل الدخول. هذا أسرع وأكثر صمودًا أمام تغييرات الواجهة. والمقايضة: إن كسر أحدهم نموذج تسجيل الدخول، ظلّت التهيئة تنجح، ولن تعرف حتى يبلّغ مستخدم — أو حتى يكون لديك اختبار منفصل يمارس صفحة تسجيل الدخول مباشرة.</p>
<p>إن كان تطبيقك يستخدم نقطة نهاية مصادقة JSON عادية بدلًا من إجراء نموذج SvelteKit، فاستبدل المسار وحوّل <code>form: { ... }</code> إلى <code>data: { ... }</code> كي يُرسل الجسم بصيغة JSON.</p>
<h3 id="أيهما-تختار">أيّهما تختار؟</h3>
<p>استخدم نهج الواجهة حين يكون تسجيل الدخول سريعًا وتريد اختبار الدخان المجاني. واستخدم نهج واجهة البرمجة حين يكون تسجيل الدخول بطيئًا (إعادات توجيه OAuth، واختبارات CAPTCHA في بيئة الاختبار، وتدفّقات متعدّدة الخطوات)، أو حين يكون لديك سلفًا اختبار تسجيل دخول مخصّص ولا تحتاج أن يعمل التهيئة كاختبار ثانٍ.</p>
<h3 id="كيف-يبدو-ملف-حالة-التخزين-والكائن">كيف يبدو ملف حالة التخزين والكائن</h3>
<p>في كلتا الحالتين، يستطيع Playwright كتابة ملف JSON في <code>playwright/.authentication/user.json</code> يبدو تقريبًا هكذا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;cookies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shelf_session&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;eyJhbGciOiJIUzI1NiJ9...&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;domain&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;127.0.0.1&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;expires&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1748000000</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;httpOnly&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;secure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sameSite&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Lax&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;origins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;origin&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http://127.0.0.1:4173&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;localStorage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shelf:user&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;{\\&quot;id\\&quot;:\\&quot;usr_01J\\&quot;,\\&quot;email\\&quot;:\\&quot;alice@example.com\\&quot;}&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>هذا الشكل على القرص هو أيضًا شكل الكائن الأساسي الذي يمكنك تمريره مباشرة إلى <code>storageState</code> في الشيفرة. وإن صدّرت مع <code>indexedDB: true</code>، فيمكن لـPlaywright أن يضيف بيانات لقطة إضافية لك، لكن الصيغة المضمّنة المكتوبة يدويًا تبدأ دائمًا بـ<code>cookies</code> و<code>origins</code>. ولستَ <em>مضطرًا</em> إلى القراءة من ملف إن كانت الحالة صغيرة بما يكفي ليكون تضمينها أوضح.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">use</span>({
  <span class="hljs-attr">storageState</span>: {
    <span class="hljs-attr">cookies</span>: [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shelf_session&#x27;</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;test-session-token&#x27;</span>,
        <span class="hljs-attr">domain</span>: <span class="hljs-string">&#x27;127.0.0.1&#x27;</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
        <span class="hljs-attr">expires</span>: <span class="hljs-number">1893456000</span>,
        <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">secure</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">sameSite</span>: <span class="hljs-string">&#x27;Lax&#x27;</span>,
      },
    ],
    <span class="hljs-attr">origins</span>: [
      {
        <span class="hljs-attr">origin</span>: <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>,
        <span class="hljs-attr">localStorage</span>: [
          {
            <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shelf:user&#x27;</span>,
            <span class="hljs-attr">value</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
              <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;usr_01J&#x27;</span>,
              <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;alice@example.com&#x27;</span>,
            }),
          },
        ],
      },
    ],
  },
});

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;opens already signed in from an inline object&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-comment">// Already authenticated without reading a file.</span>
});
</code></pre>
<p>يفيد ذلك حين تريد حالة اصطناعية صغيرة لملف مواصفة واحد، أو حين تريد فرض حالة مسجّلة الخروج معروفة، أو حين يكون الاعتماد على نظام الملفات مراسم أكثر من قيمته.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { test } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

test.<span class="hljs-title function_">use</span>({ <span class="hljs-attr">storageState</span>: { <span class="hljs-attr">cookies</span>: [], <span class="hljs-attr">origins</span>: [] } });
</code></pre>
<p>كل حقل في الكائن المضمّن مهم. في وثائق Playwright الحالية وأنواع Playwright <code>1.59.x</code> المثبّتة في هذا المستودع، تقبل صيغة الكائن مفتاحين علويين بالضبط: <code>cookies</code> و<code>origins</code>.</p>
<h4><code>cookies</code></h4>
<p>هذه مصفوفة من كائنات ملفات تعريف الارتباط تُحمَّل مسبقًا في سياق المتصفّح.</p>
<ul>
<li><strong><code>name</code>:</strong> اسم ملف تعريف الارتباط.</li>
<li><strong><code>value</code>:</strong> قيمة ملف تعريف الارتباط.</li>
<li><strong><code>domain</code>:</strong> المضيف الذي ينتمي إليه ملف تعريف الارتباط. أضف النقطة <code>.</code> في البداية إن أردت أن ينطبق على النطاقات الفرعية أيضًا، مثل <code>.example.com</code>.</li>
<li><strong><code>path</code>:</strong> مسار URL الذي ينطبق عليه ملف تعريف الارتباط. وتعني <code>'/'</code> الموقع كله.</li>
<li><strong><code>expires</code>:</strong> وقت الانتهاء كطابع زمني Unix بالثواني.</li>
<li><strong><code>httpOnly</code>:</strong> هل يستطيع JavaScript في الصفحة قراءة ملف تعريف الارتباط. وتعني <code>true</code> أن <code>document.cookie</code> لا يراه.</li>
<li><strong><code>secure</code>:</strong> هل ينبغي إرسال ملف تعريف الارتباط عبر HTTPS فقط.</li>
<li><strong><code>sameSite</code>:</strong> السلوك عبر المواقع. <code>'Strict'</code> هي الأكثر تقييدًا، و<code>'Lax'</code> هي الافتراضي الشائع، و<code>'None'</code> تسمح بالاستخدام عبر المواقع.</li>
</ul>
<h4><code>origins</code></h4>
<p>هذه مصفوفة من حزم تخزين محصورة بنطاق أصل. كل واحدة تقابل أصل متصفّح واحدًا بعينه.</p>
<ul>
<li><strong><code>origin</code>:</strong> المخطّط والمضيف والمنفذ بالضبط، مثل <code>http://localhost:5173</code>. فإن كانت الصفحة تعمل على أصل مختلف، فلا تفعل هذه المدخلات شيئًا.</li>
<li><strong><code>localStorage</code>:</strong> مدخلات <code>localStorage</code> التي تُحمَّل مسبقًا لذلك الأصل.</li>
</ul>
<h4><code>localStorage</code></h4>
<p>كل مدخل <code>localStorage</code> زوج اسم/قيمة.</p>
<ul>
<li><strong><code>name</code>:</strong> المفتاح.</li>
<li><strong><code>value</code>:</strong> القيمة النصية المخزّنة. فـ<code>localStorage</code> لا يقبل إلا النصوص، لذا تحتاج الكائنات إلى <code>JSON.stringify(...)</code>.</li>
</ul>
<h4>ما الذي <em>لا</em> يوجد في هذا الكائن</h4>
<p>هذا هو الجزء الذي يخلط فيه الناس.</p>
<ul>
<li>لا يوجد هنا مفتاح <code>path</code> في المستوى الأعلى. فـ<code>path</code> ينتمي إلى <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state"><code>browserContext.storageState({ path })</code></a> حين تكون <em>تصدّر</em> الحالة إلى القرص.</li>
<li>ولا يوجد هنا مفتاح <code>indexedDB</code> في المستوى الأعلى أيضًا. فـ<code>indexedDB: true</code> خيار <em>تصدير</em> أيضًا في <code>browserContext.storageState(...)</code>، لا شيء تكتبه يدويًا عادةً في كائن الإدخال المضمّن.</li>
<li>لا يوجد مفتاح <code>sessionStorage</code>. و<a href="https://playwright.dev/docs/auth#session-storage">وثائق المصادقة في Playwright</a> صريحة في أن <code>storageState</code> لا يحفظ <code>sessionStorage</code>؛ فإن كان تطبيقك يخزّن المصادقة هناك، فأنت بحاجة إلى وصفة <code>addInitScript</code> بدلًا من ذلك.</li>
<li>لا يوجد اختصار <code>url</code> لملف تعريف الارتباط في هذا الشكل. فـ<code>url</code> موجود في <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-add-cookies"><code>browserContext.addCookies()</code></a>، لكن <code>storageState</code> يتوقّع <code>domain</code> و<code>path</code>.</li>
</ul>
<p>فالنموذج الذهني هو:</p>
<ul>
<li><code>browserContext.storageState({ path, indexedDB })</code>: تصدير الحالة</li>
<li><code>test.use({ storageState })</code> أو <code>browser.newContext({ storageState })</code>: استهلاك مسار ملف أو كائن مضمّن فيه <code>cookies</code> و<code>origins</code></li>
</ul>
<h2 id="بعض-الحالات-الحدية-المتقدمة-في-حالة-المصادقة">بعض الحالات الحدّية المتقدّمة في حالة المصادقة</h2>
<p>ثلاث واجهات برمجية أصغر تستحقّ المعرفة بعد أن يستقرّ النمط الأساسي.</p>
<p>أولًا، إن كانت بيانات مصادقتك تعيش في تخزين يديره المتصفّح خارج ملفات تعريف الارتباط و<code>localStorage</code>، فصدّر مع <code>indexedDB: true</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">storageState</span>({
  <span class="hljs-attr">path</span>: authenticationFile,
  <span class="hljs-attr">indexedDB</span>: <span class="hljs-literal">true</span>,
});
</code></pre>
<p>يهمّ ذلك في تدفّقات المصادقة التي تقودها حزم SDK وتخزّن الرموز في IndexedDB بدلًا من ملفات تعريف الارتباط.</p>
<p>ثانيًا، تضيف إصدارات Playwright الأحدث <a href="https://playwright.dev/docs/api/class-browsercontext"><code>browserContext.setStorageState()</code></a>. وهو يتيح لك مسح ملفات تعريف الارتباط الحالية، و<code>localStorage</code>، وIndexedDB، وتطبيق حالة جديدة على السياق نفسه. وما زالت معظم مجموعات الاختبار تُخدَم على نحو أفضل بـ«سياق جديد لكل اختبار»، لكن إن كنت تكتب مساعدًا متعمّدًا لتبديل الأدوار أو إعادة الضبط، فهذا أنظف من محاولة تغيير الجلسة القديمة قطعةً قطعة.</p>
<p>ثالثًا، إن كنت تختبر CHIPS أو ملفات تعريف الارتباط الخارجية المقسّمة، فيمكن لكائنات ملفات تعريف الارتباط أن تحمل <code>partitionKey</code>. ولا يحتاج Shelf إلى هذا. لكن يستحقّ أن تعرف أن الشكل موجود قبل أن تنفق عصرًا تتساءل لماذا يفتقد اختبار حديث لملفات تعريف الارتباط الخارجية جزءًا من نموذج الجلسة.</p>
<h2 id="توصيله-بالتهيئة">توصيله بالتهيئة</h2>
<p>هنا <a href="https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects">مشاريع Playwright</a> تثبت قيمتها. وإن لم تكن قد قرأت ذلك الدرس بعد، فالنسخة القصيرة: المشروع كتلة مسمّاة في <code>playwright.config.ts</code> لها إعداداتها واعتمادياتها. ويشغّلها Playwright بترتيب الاعتماديات، كرسم بياني مصغّر للبناء.</p>
<p>وللمصادقة، تقسّم التهيئة إلى مشروعين — واحد يسجّل الدخول، وآخر يشغّل الاختبارات الفعلية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">projects</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>,
      <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/authentication\\.setup\\.ts/</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;chromium&#x27;</span>,
      <span class="hljs-attr">use</span>: {
        <span class="hljs-attr">storageState</span>: path.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span>),
      },
      <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
    },
  ],
});
</code></pre>
<p>مشروع <code>setup</code> يطابق ملف تهيئة المصادقة فقط. ومشروع <code>chromium</code> يعتمد على <code>setup</code>، فيضمن Playwright أن تسجيل الدخول يعمل أولًا. وكل اختبار في <code>chromium</code> يبدأ والجلسة المحفوظة محمّلة مسبقًا — لا شيفرة تسجيل دخول، ولا <code>beforeEach</code>، ولا شيء.</p>
<pre><code>flowchart TD
  A[&quot;Setup project runs once&quot;] --&gt; B[&quot;User logs in via UI&quot;]
  B --&gt; C[&quot;Browser state saved&lt;br&gt;to JSON file&quot;]
  C --&gt; D[&quot;Tests run&quot;]
  D --&gt; E[&quot;Each test loads&lt;br&gt;storage state&quot;]
  E --&gt; F[&quot;Tests start&lt;br&gt;already authenticated&quot;]

  style A fill:#e1f5ff
  style C fill:#c8e6c9
  style F fill:#c8e6c9
</code></pre>
<p>الاختبارات التي كانت تبدأ بتدفّق تسجيل دخول تبدأ الآن من <code>/shelf</code> وقد سُجّل الدخول إليها مسبقًا:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;rate a book&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
  <span class="hljs-comment">// Already logged in. Just do the thing.</span>
  <span class="hljs-keyword">await</span> page
    .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/Station Eleven/</span> })
    .<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Rate this book&#x27;</span> })
    .<span class="hljs-title function_">click</span>();
  <span class="hljs-comment">// ...</span>
});
</code></pre>
<p>ذهبت شيفرة تسجيل الدخول. وذهب <em>همّ</em> تسجيل الدخول. فإن انكسر تسجيل الدخول، فشل اختبار واحد بالضبط — اختبار التهيئة — وأخبرك الخطأ بلا لبس أن تسجيل الدخول نفسه معطوب، لا أن «كل شيء متقلّب».</p>
<h2 id="أدوار-متعددة">أدوار متعدّدة</h2>
<p>لدى Shelf واجهة إدارة لإبراز كتب في الصفحة الرئيسية. لذا نحتاج سياقين مصادَقين: مستخدمًا عاديًا ومشرفًا. سهل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// authentication.setup.ts</span>
<span class="hljs-title function_">setup</span>(<span class="hljs-string">&#x27;authenticate as user&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-comment">// ... log in as alice ...</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">storageState</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span> });
});

<span class="hljs-title function_">setup</span>(<span class="hljs-string">&#x27;authenticate as admin&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-comment">// ... log in as admin ...</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">context</span>().<span class="hljs-title function_">storageState</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;playwright/.authentication/admin.json&#x27;</span> });
});
</code></pre>
<p>ثم في التهيئة، مشروعا اختبار:</p>
<pre><code class="language-typescript"><span class="hljs-attr">projects</span>: [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;setup&#x27;</span>, <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/authentication\\.setup\\.ts/</span> },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;user&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/tests\\/user\\//</span>,
    <span class="hljs-attr">use</span>: { <span class="hljs-attr">storageState</span>: <span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span> },
    <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;admin&#x27;</span>,
    <span class="hljs-attr">testMatch</span>: <span class="hljs-regexp">/tests\\/admin\\//</span>,
    <span class="hljs-attr">use</span>: { <span class="hljs-attr">storageState</span>: <span class="hljs-string">&#x27;playwright/.authentication/admin.json&#x27;</span> },
    <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">&#x27;setup&#x27;</span>],
  },
];
</code></pre>
<p>نظّم الاختبارات حسب الدور تحت مجلدات فرعية. فيرث كل اختبار الحالة الصحيحة تلقائيًا. لا مزخرفات، ولا تجهيزات داخل تجهيزات، ولا منطق <code>beforeEach</code> بارع.</p>
<h2 id="مزودو-المصادقة-الخارجيون-ينتهون-أيضا-إلى-حالة-التخزين">مزوّدو المصادقة الخارجيون ينتهون أيضًا إلى حالة التخزين</h2>
<p>إن كان تطبيقك يسجّل الدخول عبر Google OAuth، أو Okta، أو Microsoft، أو Auth0، أو أي مزوّد هوية خارجي آخر، فنمط حالة التخزين ينطبق أيضًا. وما يتغيّر ليس الوجهة بل <em>كيف تحصل على الحالة المصادَقة</em>.</p>
<p>يغطّي الدرس المخصّص، <a href="https://stevekinney.com/courses/self-testing-ai-agents/testing-third-party-authentication">اختبار المصادقة عبر طرف ثالث</a>، النمط بالتفصيل: أبقِ اختبار دخان ضيّقًا واحدًا لـ«إعادة التوجيه تبدأ»، وهيِّئ جلسة تطبيقك الخاصة للمجموعة العادية، واحفظ تدفّقات المزوّد الحقيقي الكاملة لمسار دخان منفصل حين تحتاجها فعلًا.</p>
<h2 id="ملف-gitignore-الذي-تحتاجه">ملف <code>.gitignore</code> الذي تحتاجه</h2>
<p>تحتوي ملفات حالة المصادقة على ملفات تعريف ارتباط حقيقية. لا تلتزم بها. أضف هذا إلى <code>.gitignore</code>:</p>
<pre><code>playwright/.authentication/
# or \`playwright/.auth/\` if you follow the Playwright docs convention
</code></pre>
<p>ولا تتخطَّ هذه الخطوة. رأيت ملفات تعريف ارتباط جلسة تُلتزم في مستودعات عامة مرّتين. وفي المرّتين كان الوكيل هو من فعلها. ضع سطر التجاهل قبل أن يكتب الوكيل ملف التهيئة، لا بعده.</p>
<h2 id="متى-تعيد-المصادقة">متى تعيد المصادقة</h2>
<p>ملفات حالة التخزين لا تنتهي من تلقاء نفسها. فإن كانت ملفات تعريف ارتباط جلستك قصيرة العمر (كما ينبغي أن تكون)، فسيصبح ملف الحالة قديمًا في نهاية المطاف، وستبدأ اختباراتك بالفشل بأخطاء «أُعيد التوجيه إلى /login».</p>
<p>يوجد خياران:</p>
<ul>
<li>إعادة توليد ملف الحالة عند كل تشغيل Playwright. ونهج مشروع <code>setup</code> أعلاه يفعل ذلك تلقائيًا — فكل <code>npx playwright test</code> يشغّل تسجيل الدخول من جديد.</li>
<li>تخزين ملف الحالة مؤقتًا بمدة صلاحية. وتوجد وصفات في وثائق Playwright إن أردت ذلك. وأنا لا أفعلها عادةً — فإعادة التوليد عند كل تشغيل رخيصة بما يكفي لأنني لا أكلّف نفسي عناء التخزين المؤقت.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>نمط مشروع التهيئة هو الافتراضي الأكثر أمانًا لشيفرة الورشة لأنه يمنحك حالة مصادقة طازجة وحقيقية في المتصفّح عند كل تشغيل. لا تخزّن الملف مؤقتًا إلا حين تقيس التهيئة كعنق زجاجة وتفهم أنماط الفشل المتعلّقة بملفات تعريف الارتباط المنتهية.</p>
</blockquote>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<pre><code class="language-markdown"><span class="hljs-section">## Playwright authentication</span>

<span class="hljs-bullet">-</span> Never log in through the UI inside a test. Login happens once, in
  <span class="hljs-code">\`tests/authentication.setup.ts\`</span>, and all other tests inherit
  the resulting storage state.
<span class="hljs-bullet">-</span> If a test needs a different user or role, add a new setup for that
  role and a new Playwright project that depends on it.
<span class="hljs-bullet">-</span> Never commit <span class="hljs-code">\`playwright/.authentication/\`</span>. It contains real session
  cookies. The docs call this folder <span class="hljs-code">\`playwright/.auth/\`</span>; the rule is the
  same either way.
<span class="hljs-bullet">-</span> If a test is failing because it&#x27;s redirected to <span class="hljs-code">\`/login\`</span>, the problem
  is the setup file or the session cookie TTL, not the individual test.
  Do not fix it by adding <span class="hljs-code">\`page.goto(&#x27;/login&#x27;)\`</span> to the test.
</code></pre>
<p>القاعدة الأخيرة موجودة تحديدًا لمنع الوكيل من «إصلاح» العَرَض حين تكون التهيئة معطوبة. لقد شاهدت وكيلًا، حين أُعطي خطأ إعادة توجيه، يتراجع عن ستة أشهر من العمل على حالة التخزين لأن نسخ كتلة تسجيل دخول ولصقها في الاختبار الفاشل كان أسهل. القاعدة تجعل ذلك ممنوعًا صراحةً.</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>تسجّل الدخول مرّة لكل تشغيل، لا مرّة لكل اختبار. والوفورات في الكلفة حقيقية، وتحسينات الاستقرار أكبر من الوفورات، والنمط واحد من الأماكن القليلة التي تكون فيها إعدادات Playwright الافتراضية مصمّمة تصميمًا جيدًا فعلًا ولا يستخدمها أحد تقريبًا. ضعه في ملف التعليمات. وسيشكرك الوكيل بأن لا يكتب مئة كتلة تسجيل دخول.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects">مشاريع Playwright</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/testing-third-party-authentication">اختبار المصادقة عبر طرف ثالث</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story">حكاية الانتظار</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation">تسجيل ملفات HAR لعزل الشبكة</a></li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
