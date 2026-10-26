const i="kinney",e="figma",n="Figma للمطوّرين",t="generating-an-icon-library",a="توليد مكتبة أيقونات",l=[{depth:2,id:"إحضار-أيقونة-إلى-figma",text:"إحضار أيقونة إلى Figma"},{depth:2,id:"إنشاء-المكونات",text:"إنشاء المكوّنات"}],s=`<p><img src="/arabic-cs-library/images/kinney/68d7285c068060c4.webp" alt="أيقونات"></p>
<p>يأتي أي نظام تصميم أو تطبيق بقدر معيّن من الأيقونات. وهذه دائمًا رقصة صعبة، إذ تريد عادةً <strong>الكثير بقدر ما تحتاج والقليل بقدر ما يمكنك الاستغناء عنه</strong>. ومرة أخرى، سأترك الفلسفة والنظرية للخبراء، وسنركّز على الجوانب العملية لكيفية توليد مكتبة أيقونات في Figma — وسننظر في <a href="https://stevekinney.com/courses/storybook/">دورة أخرى</a> في كيفية تنفيذها في الشيفرة.</p>
<p>كبداية، يعجبني <a href="https://lucide.dev/">Lucide</a> كنقطة انطلاق لمكتبة أيقوناتي. وفي وقت كتابة هذا النص، يحتوي على 1,452 أيقونة، وهو ما يبدو أكثر من كافٍ لأغراضنا.</p>
<p>وهذه خطة العمل:</p>
<ol>
<li>سنتصفّح <a href="https://lucide.dev/">Lucide</a> ونختار بعض الأيقونات التي نريد استخدامها.</li>
<li>سننشئ مكوّن <strong>Icon</strong> في Figma.</li>
<li>سنجعل كل أيقونة نمطًا بديلًا من ذلك المكوّن.</li>
</ol>
<h2 id="إحضار-أيقونة-إلى-figma">إحضار أيقونة إلى Figma</h2>
<p>هناك إضافات لـ Figma، لكن بصراحة، من السهل جدًا مجرد أخذ أيقونة بصيغة SVG ولصقها في Figma.</p>
<p><img src="/arabic-cs-library/images/kinney/9c0fa8cfffe5d0db.webp" alt="أيقونة Lucide سننسخها بصيغة SVG"></p>
<p>سأنسخ الأيقونات التالية:</p>
<ul>
<li><a href="https://lucide.dev/icons/triangle-alert">Triangle Alert</a>، وسأسميها <strong>Warn</strong></li>
<li><a href="https://lucide.dev/icons/bug">Bug</a></li>
<li><a href="https://lucide.dev/icons/check">Check</a></li>
<li><a href="https://lucide.dev/icons/circle-check">Circle Check</a>، وسأسميها <strong>Success</strong></li>
<li><a href="https://lucide.dev/icons/clipboard-list">Clipboard List</a></li>
<li><a href="https://lucide.dev/icons/flame">Flame</a></li>
<li><a href="https://lucide.dev/icons/circle-help">Circle Help</a>، وسأسميها <strong>Help</strong></li>
<li><a href="https://lucive.dev/icons/info">Info</a></li>
<li><a href="https://lucive.dev/icons/list">List</a></li>
<li><a href="https://lucive.dev/icons/pencil">Pencil</a></li>
<li><a href="https://lucive.dev/icons/quote">Quote</a></li>
<li><a href="https://lucive.dev/icons/x">X</a></li>
<li><a href="https://lucive.dev/icons/zap">Zap</a></li>
<li><a href="https://lucive.dev/icons/plus">Plus</a></li>
<li><a href="https://lucide.dev/icons/trash-2">Trash 2</a>، وسأسميها <strong>Trash</strong></li>
<li><a href="https://lucive.dev/icons/skull">Skull</a></li>
<li><a href="https://lucive.dev/icons/external-link">External Link</a></li>
<li><a href="https://lucive.dev/icons/link">Link</a></li>
<li><a href="https://lucide.dev/icons/hash">Hash</a></li>
</ul>
<blockquote>
<p><strong>لقد أنجزت عنك الجزء الممل</strong></p>
<p>يمكنك — بل ينبغي لك — أن <a href="https://www.figma.com/file/1v4uGneHKyq6SfxPWI7KJc/Figma-for-Developers-v2%2C-Frontend-Masters?type=design&amp;node-id=6-1296&amp;mode=design&amp;t=xaxtUNN7AZ04byvE-4">تستعير أيقوناتي من هنا</a>.</p>
</blockquote>
<h2 id="إنشاء-المكونات">إنشاء المكوّنات</h2>
<p>إذا كنت تريد أن تسهّل حياتك المستقبلية — اذهب وأعد تسمية كل المكوّنات وأضف إليها البادئة <strong>Type=</strong>، ويمكنك فعل ذلك بسهولة باستخدام <strong>Type=$&amp;</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/ff505944d5a4b6ee.webp" alt="إعادة تسمية الأيقونات دفعة واحدة"></p>
<p>بعد ذلك، سنختار <strong>Create component set</strong>.</p>
<p><img src="/arabic-cs-library/images/kinney/51199dfc48b3ce4a.webp" alt="إنشاء طقم مكوّنات"></p>
<p>سيكون لديك الآن مكوّن يمكنك إعادة تسميته إلى <strong>Icon</strong>. وهذا يمنحك قائمة سريعة وسهلة بالأيقونات المعتمدة لاستخدامها في نظام تصميمك.</p>
`,c={book:i,chapter:e,chapterTitle:n,slug:t,title:a,headings:l,html:s};export{i as book,e as chapter,n as chapterTitle,c as default,l as headings,s as html,t as slug,a as title};
