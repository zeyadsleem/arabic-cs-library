const s="better-auth",n="concepts",a="المفاهيم",t="rate-limit",e="تحديد المعدل",p=[{depth:2,id:"تكوين-تحديد-المعدل",text:"تكوين تحديد المعدل"},{depth:3,id:"عنوان-ip-المتصل",text:"عنوان IP المتصل"},{depth:3,id:"نافذة-تحديد-المعدل",text:"نافذة تحديد المعدل"},{depth:3,id:"التخزين",text:"التخزين"}],l=`<h1>تحديد المعدل (/docs/concepts/rate-limit)</h1>
<p>تعرّف على كيفية تكوين تحديد المعدل في Better Auth، بما في ذلك اكتشاف عنوان IP، ودعم IPv6، ونوافذ تحديد المعدل المخصّصة، وخلفيات التخزين، ومعالجة الأخطاء، والقواعد لكل نقطة نهاية.</p>
<p>يتضمّن Better Auth محدِّد معدل مدمجًا للمساعدة في إدارة حركة المرور ومنع إساءة الاستخدام. تكون محدِّد المعدل افتراضيًا، في وضع الإنتاج، مضبوطًا على:</p>
<ul>
<li>النافذة: 10 ثوانٍ</li>
<li>الحد الأقصى للطلبات: 100 طلب</li>
</ul>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>لا تتأثر الطلبات من جهة الخادم التي تُجرى باستخدام <code>auth.api</code> بتحديد المعدل. تنطبق حدود المعدل فقط على الطلبات التي يبدأها العميل.</p>
</div>
<p>يمكنك تخصيص هذه الإعدادات بسهولة عبر تمرير الكائن rateLimit إلى الدالة betterAuth.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">window</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// time window in seconds</span>
        <span class="hljs-attr">max</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// max requests in the window</span>
    },
})
</code></pre>
<p>يكون تحديد المعدل معطّلًا في وضع التطوير افتراضيًا. ولتمكينه، اضبط <code>enabled</code> على <code>true</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">//...other options</span>
    },
})
</code></pre>
<p>بالإضافة إلى الإعدادات الافتراضية، يوفّر Better Auth قواعد مخصّصة لمسارات محدّدة. على سبيل المثال:</p>
<ul>
<li><code>/sign-in/email</code>: محدود بـ 3 طلبات خلال 10 ثوانٍ.</li>
</ul>
<p>إضافةً إلى ذلك، تُعرِّف الإضافات أيضًا قواعد مخصّصة لمسارات محدّدة. على سبيل المثال، تمتلك إضافة <code>twoFactor</code> قواعد مخصّصة:</p>
<ul>
<li><code>/two-factor/*</code>: محدود بـ 3 طلبات خلال 10 ثوانٍ.</li>
</ul>
<p>تضمن هذه القواعد المخصّصة حماية العمليات الحسّاسة بحدود أكثر صرامة.</p>
<h2 id="تكوين-تحديد-المعدل">تكوين تحديد المعدل</h2>
<h3 id="عنوان-ip-المتصل">عنوان IP المتصل</h3>
<p>يستخدم تحديد المعدل عنوان IP المتصل لتتبّع عدد الطلبات التي يجريها المستخدم. الترويسة الافتراضية التي يُتحقق منها هي <code>x-forwarded-for</code>، وهي شائعة الاستخدام في بيئات الإنتاج. إذا كنت تستخدم ترويسة مختلفة لتتبّع عنوان IP الخاص بالمستخدم، فستحتاج إلى تحديدها.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...other options</span>
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">ipAddress</span>: {
          <span class="hljs-attr">ipAddressHeaders</span>: [<span class="hljs-string">&quot;cf-connecting-ip&quot;</span>], <span class="hljs-comment">// Cloudflare specific header example</span>
      },
    },
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">window</span>: <span class="hljs-number">60</span>, <span class="hljs-comment">// time window in seconds</span>
        <span class="hljs-attr">max</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// max requests in the window</span>
    },
})
</code></pre>
<p>افتراضيًا، لا يثق Better Auth بسلاسل عناوين IP المُمرَّرة المفصولة بفواصل، لأن الرمز <code>X-Forwarded-For</code> الأيسر يتحكّم به العميل خلف وكيل يضيف القيم. خلف وكيل عكسي أو موازن أحمال، افعل أحد ما يلي.</p>
<p>وجّه <code>ipAddressHeaders</code> إلى ترويسة موثوقة واحدة يضبطها الوكيل لديك (على سبيل المثال <code>x-real-ip</code> أو <code>cf-connecting-ip</code>):</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">ipAddress</span>: {
            <span class="hljs-attr">ipAddressHeaders</span>: [<span class="hljs-string">&quot;x-real-ip&quot;</span>],
        },
    },
})
</code></pre>
<p>أو اذكر وكلاءك في <code>trustedProxies</code>. يسير Better Auth في السلسلة من اليمين إلى اليسار، ويتخطّى القفزات الموثوقة، ويأخذ أول عنوان غير موثوق باعتباره العميل:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">ipAddress</span>: {
            <span class="hljs-comment">// your proxies&#x27; addresses, not a broad private range that also covers clients</span>
            <span class="hljs-attr">trustedProxies</span>: [<span class="hljs-string">&quot;192.0.2.10&quot;</span>, <span class="hljs-string">&quot;10.0.0.0/24&quot;</span>],
        },
    },
})
</code></pre>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>يفسّر <code>trustedProxies</code> سلسلة الترويسات المُمرَّرة فقط ولا يستطيع التحقق من المُرسل المباشر. أبقِ الأصل (origin) قابلاً للوصول عبر هؤلاء الوكلاء فقط، واجعل كل وكيل يستبدل ترويسات IP المُمرَّرة أو ينقّيها. وإلا فيمكن للعميل ضبط <code>X-Forwarded-For</code> مباشرةً وانتحال عنوانه.</p>
</div>
<h4>دعم عناوين IPv6</h4>
<p>يقوم Better Auth تلقائيًا بتطبيع عناوين IPv6 لمنع هجمات التجاوز حيث يستخدم المهاجمون تمثيلات مختلفة للعنوان IPv6 نفسه (مثل <code>2001:db8::1</code> مقابل <code>2001:0db8:0000:0000:0000:0000:0000:0001</code>). يضمن ذلك أن جميع تمثيلات العنوان IPv6 نفسه تُعامَل على أنها نفسها لأغراض تحديد المعدل.</p>
<p>بالإضافة إلى ذلك، تُحوَّل عناوين IPv6 المُعيَّنة إلى IPv4 (مثل <code>::ffff:192.0.2.1</code>) تلقائيًا إلى صيغتها IPv4 (<code>192.0.2.1</code>) لمنع المهاجمين من تجاوز حدود المعدل عبر التبديل بين تمثيلات IPv4 وIPv6.</p>
<h4>تحديد المعدل حسب الشبكة الفرعية IPv6</h4>
<p>افتراضيًا، تُحدَّد عناوين IPv6 لكل شبكة فرعية <code>/64</code>، لا لكل عنوان فردي. يخصّص مزوّدو خدمة الإنترنت ومزوّدو السحابة بادئات IPv6 (عادةً <code>/64</code> للمستخدمين السكنيين وفق <a href="https://datatracker.ietf.org/doc/html/rfc6177">RFC 6177</a>) بدلًا من عناوين مفردة، لذا فإن أي عدّاد لكل عنوان سيسمح لعميل واحد بالتنقل عبر 2^64 من عناوين المصدر دون استنفاد الحد.</p>
<p>يمكنك تجاوز طول البادئة عبر الخيار <code>ipv6Subnet</code> إذا كان نشرك يحتاج إلى حدّ تخصيص مختلف:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...other options</span>
    <span class="hljs-attr">advanced</span>: {
        <span class="hljs-attr">ipAddress</span>: {
            <span class="hljs-attr">ipv6Subnet</span>: <span class="hljs-number">56</span>, <span class="hljs-comment">// Rate limit by /56 subnet (residential ISP allocation)</span>
        },
    },
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">window</span>: <span class="hljs-number">60</span>,
        <span class="hljs-attr">max</span>: <span class="hljs-number">100</span>,
    },
})
</code></pre>
<p>أطوال بادئات IPv6 الشائعة:</p>
<ul>
<li><code>128</code>: عنوان IPv6 فردي. الأكثر تقييدًا. آمن فقط عندما تتحكّم في الشبكة وتثق بأن كل عنوان يقابل عميلًا مميزًا.</li>
<li><code>64</code> (الافتراضي): شبكة فرعية /64. التخصيص النموذجي للمنزل أو العمل.</li>
<li><code>56</code>: شبكة فرعية /56. تخصيص مزوّد خدمة الإنترنت السكني وفق <a href="https://datatracker.ietf.org/doc/html/rfc6177">RFC 6177</a>.</li>
<li><code>48</code>: شبكة فرعية /48. تخصيص شبكة أكبر.</li>
<li><code>32</code>: شبكة فرعية /32. تخصيص على مستوى مزوّد خدمة الإنترنت.</li>
</ul>
<p>يُقبل أي طول بادئة صحيح من <code>0</code> إلى <code>128</code>؛ والقيم أعلاه هي الأكثر شيوعًا.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>يؤثر تكوين الشبكة الفرعية IPv6 على عناوين IPv6 فقط. تُحدَّد عناوين IPv4 دائمًا بشكل فردي.</p>
</div>
<h3 id="نافذة-تحديد-المعدل">نافذة تحديد المعدل</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...other options</span>
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">window</span>: <span class="hljs-number">60</span>, <span class="hljs-comment">// time window in seconds</span>
        <span class="hljs-attr">max</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// max requests in the window</span>
    },
})
</code></pre>
<p>يمكنك أيضًا تمرير قواعد مخصّصة لمسارات محدّدة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...other options</span>
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">window</span>: <span class="hljs-number">60</span>, <span class="hljs-comment">// time window in seconds</span>
        <span class="hljs-attr">max</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// max requests in the window</span>
        <span class="hljs-attr">customRules</span>: {
            <span class="hljs-string">&quot;/sign-in/email&quot;</span>: {
                <span class="hljs-attr">window</span>: <span class="hljs-number">10</span>,
                <span class="hljs-attr">max</span>: <span class="hljs-number">3</span>,
            },
            <span class="hljs-string">&quot;/two-factor/*&quot;</span>: <span class="hljs-title function_">async</span> (request)=&gt; {
                <span class="hljs-comment">// custom function to return rate limit window and max</span>
                <span class="hljs-keyword">return</span> {
                    <span class="hljs-attr">window</span>: <span class="hljs-number">10</span>,
                    <span class="hljs-attr">max</span>: <span class="hljs-number">3</span>,
                }
            }
        },
    },
})
</code></pre>
<p>إذا أردت تعطيل تحديد المعدل لمسار محدّد، يمكنك ضبطه على <code>false</code> أو إرجاع <code>false</code> من دالة القاعدة المخصّصة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...other options</span>
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">customRules</span>: {
            <span class="hljs-string">&quot;/get-session&quot;</span>: <span class="hljs-literal">false</span>,
        },
    },
})
</code></pre>
<h3 id="التخزين">التخزين</h3>
<p>افتراضيًا، تُخزَّن بيانات تحديد المعدل في الذاكرة، وهو ما قد لا يناسب العديد من حالات الاستخدام، خاصةً في البيئات اللامخدمية (serverless). ولمعالجة ذلك، يمكنك استخدام قاعدة بيانات أو تخزين ثانوي أو تخزين مخصّص لتخزين بيانات تحديد المعدل.</p>
<p><strong>استخدام قاعدة البيانات</strong></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { betterAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;better-auth&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> auth = <span class="hljs-title function_">betterAuth</span>({
    <span class="hljs-comment">//...other options</span>
    <span class="hljs-attr">rateLimit</span>: {
        <span class="hljs-attr">storage</span>: <span class="hljs-string">&quot;database&quot;</span>,
        <span class="hljs-attr">modelName</span>: <span class="hljs-string">&quot;rateLimit&quot;</span>, <span class="hljs-comment">//optional by default &quot;rateLimit&quot; is used</span>
    },
})
</code></pre>
<p>تأكّد من تشغيل <code>migrate</code> لإنشاء جدول تحديد المعدل في قاعدة بياناتك:</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,l as html,t as slug,e as title};
