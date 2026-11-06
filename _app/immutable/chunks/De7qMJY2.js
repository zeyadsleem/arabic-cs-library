const s="hello-algo",n="chapter_searching",a="Searching",l="replace_linear_by_hashing",t="استراتيجية التحسين بالتجزئة",p=[{depth:2,id:"البحث-الخطي-مقايضة-الزمن-بالمكان",text:"البحث الخطي: مقايضة الزمن بالمكان"},{depth:2,id:"البحث-القائم-على-التجزئة-مقايضة-المكان-بالزمن",text:"البحث القائم على التجزئة: مقايضة المكان بالزمن"}],e=`<p>في مسائل الخوارزميات، <strong>كثيراً ما نقلل التعقيد الزمني للخوارزميات عبر استبدال البحث الخطي بالبحث القائم على التجزئة</strong>. ولنستخدم إحدى مسائل الخوارزميات لتعميق فهمنا.</p>
<div class="note">
<p>بمعطى مصفوفة أعداد صحيحة <code>nums</code> وقيمة مستهدفة <code>target</code>، ابحث عن عنصرين في المصفوفة يكون مجموعهما <code>target</code>، ثم أعد فهرسيهما. تكفي أي إجابة.</p>
</div>
<h2 id="البحث-الخطي-مقايضة-الزمن-بالمكان">البحث الخطي: مقايضة الزمن بالمكان</h2>
<p>فكّر في اجتياز جميع التركيبات الممكنة مباشرة. وكما هو موضح في الشكل أدناه، نستخدم حلقات متداخلة ونتحقق في كل تكرار مما إذا كان مجموع عددين صحيحين يساوي <code>target</code>. فإن كان كذلك، نعيد فهرسيهما.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_searching--two_sum_brute_force.png" alt="حل البحث الخطي لمسألة المجموع الثنائي"></p>
<p>الكود موضح أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">two_sum_brute_force</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], target: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
    <span class="hljs-string">&quot;&quot;&quot;الطريقة 1: التعداد بالقوة الغاشمة&quot;&quot;&quot;</span>
    <span class="hljs-comment"># حلقتان متداخلتان تعطيان تعقيدًا زمنيًا O(n^2)</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(nums) - <span class="hljs-number">1</span>):
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(i + <span class="hljs-number">1</span>, <span class="hljs-built_in">len</span>(nums)):
            <span class="hljs-keyword">if</span> nums[i] + nums[j] == target:
                <span class="hljs-keyword">return</span> [i, j]
    <span class="hljs-keyword">return</span> []
</code></pre>
</div>
التعقيد الزمني لهذه الطريقة هو $O(n^2)$ والتعقيد المكاني هو $O(1)$، مما يجعلها مستهلكة للوقت للغاية عند المدخلات الكبيرة.
<h2 id="البحث-القائم-على-التجزئة-مقايضة-المكان-بالزمن">البحث القائم على التجزئة: مقايضة المكان بالزمن</h2>
<p>فكّر في استخدام جدول تجزئة تكون مفاتيحه عناصر المصفوفة وقيمه فهارسها. اجتز المصفوفة ونفّذ الخطوات الموضحة في الشكل أدناه في كل تكرار:</p>
<ol>
<li>تحقق مما إذا كان العدد <code>target - nums[i]</code> موجوداً في جدول التجزئة. فإن كان موجوداً، أعد فوريًا فهرسي هذين العنصرين.</li>
<li>أضف زوج المفتاح والقيمة المكوّن من <code>nums[i]</code> والفهرس <code>i</code> إلى جدول التجزئة.</li>
</ol>
<p>التنفيذ موضح أدناه ولا يتطلب سوى حلقة واحدة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">two_sum_hash_table</span>(<span class="hljs-params">nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], target: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
    <span class="hljs-string">&quot;&quot;&quot;الطريقة 2: جدول تجزئة مساعد&quot;&quot;&quot;</span>
    <span class="hljs-comment"># جدول التجزئة المساعد يستخدم مساحة O(n)</span>
    dic = {}
    <span class="hljs-comment"># حلقة واحدة بعمليات تجزئة متوسطة O(1) تعطي تعقيدًا زمنيًا متوسطًا O(n)</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(nums)):
        <span class="hljs-keyword">if</span> target - nums[i] <span class="hljs-keyword">in</span> dic:
            <span class="hljs-keyword">return</span> [dic[target - nums[i]], i]
        dic[nums[i]] = i
    <span class="hljs-keyword">return</span> []
</code></pre>
</div>
تقلل هذه الطريقة التعقيد الزمني من $O(n^2)$ إلى $O(n)$ عبر البحث القائم على التجزئة، مما يحسّن كفاءة زمن التشغيل تحسيناً كبيراً.
<p>وبما أنه يلزم الاحتفاظ بجدول تجزئة إضافي، فإن التعقيد المكاني هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. <strong>ومع ذلك، تقدم هذه الطريقة مقايضة زمنية-مكانية إجمالية أكثر توازناً، مما يجعلها الحل الأمثل لهذه المسألة</strong>.</p>
`,i={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,i as default,p as headings,e as html,l as slug,t as title};
