const n="kinney",e="figma",a="Figma للمطوّرين",i="adding-a-dark-theme-to-the-button",p="إضافة الوضع الداكن",t=[{depth:2,id:"وراثة-وضع",text:"وراثة وضع"}],s=`<p>لنفترض أننا نريد إضافة سمة الوضع الداكن إلى زرّنا.</p>
<blockquote>
<p><strong>أوضاع المتغيّرات تتطلّب أن تكون على خطة مدفوعة</strong></p>
<p>أوضاع Figma غير متاحة في خطتها المجانية. يمكنك الحصول على ما يصل إلى أربعة أوضاع لكل مجموعة في خطّتي Professional وOrganization، ثم ما يصل إلى 40 في خطة Enterprise.</p>
</blockquote>
<p>لنأخذ مكوّنات الزرّ لدينا من <a href="https://stevekinney.com/courses/figma/creating-a-button-component">القسم السابق</a>.</p>
<p><img src="/arabic-cs-library/images/kinney/e31be24e0fb3194f.webp" alt="أنماط زرّ Figma البديلة"></p>
<p>لا أريد أن أصنع مكوّنات <em>إضافية</em> أكثر لوضع داكن، لكنني أرغب في أن أتمكّن من تغيير الألوان قليلًا عندما نكون في الوضع الداكن.</p>
<p>وللقيام بذلك، سأضيف وضعًا إضافيًا لمتغيّراتي.</p>
<p><img src="/arabic-cs-library/images/kinney/08132a52ee6d9ace.webp" alt="متغيّرات Figma للوضع الداكن"></p>
<h2 id="وراثة-وضع">وراثة وضع</h2>
<p>الأمر الرائع في الأوضاع في Figma أنك تستطيع وراثة الوضع من أي طبقة أب. ومن الأمور التي أحبّ فعلها أن أصنع بعض الحاويات ثم أرى كيف تتغيّر الأوضاع بينما أنقل مكوّناتي هنا وهناك.</p>
<p>لنُنشئ بعض المتغيّرات الأساسية للسمة العامة لنظام التصميم لدينا.</p>
<p><img src="/arabic-cs-library/images/kinney/23445e34e3d013d6.webp" alt="متغيّرات طبقتنا الأساسية"></p>
<p>بعد ذلك، أنشئ حاوية تستخدم متغيّر اللون هذا كلون تعبئة.</p>
<p><img src="/arabic-cs-library/images/kinney/670df35272ed543c.webp" alt="حاوية بمتغيّر للون التعبئة"></p>
<p>بالنسبة إلى النسخة الثانية من الطبقة، غيّر الوضع.</p>
<p><img src="/arabic-cs-library/images/kinney/6dc04a606b12b7f1.webp" alt="نسخة ثانية من الحاوية في الوضع الداكن"></p>
<p>والآن، سيرث زرّك وضع الحاوية.</p>
`,c={book:n,chapter:e,chapterTitle:a,slug:i,title:p,headings:t,html:s};export{n as book,e as chapter,a as chapterTitle,c as default,t as headings,s as html,i as slug,p as title};
