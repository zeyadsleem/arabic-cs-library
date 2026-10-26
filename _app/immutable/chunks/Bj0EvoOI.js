const e="kinney",n="openclaw",a="OpenClaw: مساعدك الذكي الشخصي",p="openclaw-setup",t="تهيئة OpenClaw",s=[{depth:2,id:"ضبط-إعدادات-الأمان",text:"ضبط إعدادات الأمان"}],c=`<p>وبعد أن ننهي <a href="https://stevekinney.com/courses/openclaw/installation">التثبيت</a>، سنحتاج إلى بعض أعمال التهيئة كي تبدأ نسخة OpenClaw الخاصة بنا العمل.</p>
<p>أول ما سنفعله هو تعيين النماذج التي سنستخدمها. وهذا قرار شخصي بطبيعة الحال، لكن إليك بعض الافتراضيات المعقولة.</p>
<p><img src="/arabic-cs-library/images/kinney/0ef6e78fd52956bc.webp" alt="إعدادات النماذج تعرض النموذج الأساسي، والنموذج المساعد، ونموذج القرار، ونموذج الاحتياط، والتفكير، والوضع السريع"></p>
<h2 id="ضبط-إعدادات-الأمان">ضبط إعدادات الأمان</h2>
<p><strong>اختياري:</strong> يملك OpenClaw افتراضيًا صلاحية كاملة لتنفيذ الأوامر. ومن أمر قد ترغب في التفكير فيه أن يطلب منك الإذن قبل تشغيل أي أمر غير موجود في قائمة السماح (allowlist).</p>
<pre><code class="language-bash">openclaw exec-policy preset cautious
</code></pre>
<p>شغّل هذا على الجهاز الذي تعمل عليه البوابة. ويشرح <a href="https://stevekinney.com/courses/openclaw/security-and-approvals">الأمن والموافقات</a> ما الذي يغيّره، وكيف تصلك طلبات الموافقة، وبقية ضوابط الأمان في OpenClaw.</p>
`,o={book:e,chapter:n,chapterTitle:a,slug:p,title:t,headings:s,html:c};export{e as book,n as chapter,a as chapterTitle,o as default,s as headings,c as html,p as slug,t as title};
