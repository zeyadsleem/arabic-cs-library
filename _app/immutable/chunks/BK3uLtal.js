const e="kinney",n="openclaw",a="OpenClaw: مساعدك الذكي الشخصي",t="adding-telegram-as-a-channel",c="إضافة Telegram بوصفها قناة",p=[],o=`<p>في البداية، سنذهب للعثور على <a href="https://t.me/BotFather">BotFather</a> على Telegram، ثم سنستعمل الأمر <code>/newbot</code>.</p>
<p><img src="/arabic-cs-library/images/kinney/b0a5a79a0dad766b.webp" alt="كتابة أمر /newbot داخل محادثة مع BotFather"></p>
<p>سيُطلب منك أن تمنح روبوتك اسمًا، ثم — في مرحلة لاحقة — اسم مستخدم. وحين يكتمل ذلك كلّه، ستحصل على رمز (token) يمكنك استخدامه.</p>
<p><img src="/arabic-cs-library/images/kinney/cd38e6b3fcce6412.webp" alt="رسالة تأكيد BotFather مع إخفاء رمز واجهة HTTP البرمجية للروبوت الجديد"></p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>كل من يملك ذلك الرمز يستطيع التحكّم في روبوتك. أبقِه سرًّا، ولا تلصقه في محادثات عامة، ولا تودعه في مستودع (repository).</p>
</blockquote>
<p>ومن هناك، سنستعمل ذلك الرمز لإعداده داخل OpenClaw بوصفه قناة.</p>
<pre><code class="language-bash">openclaw channels add --channel telegram --token &lt;YOUR_BOT_TOKEN&gt;
</code></pre>
<p>بمجرّد أن تراسل روبوتك لأول مرة، ستلاحظ أنه ما زال بحاجة إلى الإقران.</p>
<p><img src="/arabic-cs-library/images/kinney/b3c0df86115bc153.webp" alt="الروبوت يردّ بأن الوصول غير مُهيّأ، مع رمز إقران وأمر موافقة"></p>
<p>نفّذ أمر الموافقة الوارد في الرسالة على الجهاز الذي يضيف OpenClaw. وحين ننجز ذلك، نكون جاهزين للانطلاق.</p>
<p>يمكنك تأكيد الاتصال من واجهة التحكم (Control UI). افتح الإعدادات (Settings)، ثم اختر القنوات (Channels)، فيظهر Telegram تحت «القنوات المتصلة» (Connected Channels) بحالة «قيد التشغيل» (Running).</p>
<p><img src="/arabic-cs-library/images/kinney/91296a488f4e4e34.webp" alt="صفحة القنوات في إعدادات OpenClaw مع إدراج Telegram كقناة تعمل ضمن القنوات المتصلة"></p>
<p>إن كان بإمكان أشخاصٍ آخرين التواصل مع الوكيل (agent)، فاضبط <code>session.dmScope</code> على <code>&quot;per-channel-peer&quot;</code>.</p>
<p>وبمجرّد أن تتمكن من التحدّث إلى روبوتك، اقرأ <a href="https://stevekinney.com/courses/openclaw/choosing-a-dm-policy">اختيار سياسة الرسائل المباشرة</a> لتحديد من يجب أن يتمتّع بذلك أيضًا.</p>
`,s={book:e,chapter:n,chapterTitle:a,slug:t,title:c,headings:p,html:o};export{e as book,n as chapter,a as chapterTitle,s as default,p as headings,o as html,t as slug,c as title};
