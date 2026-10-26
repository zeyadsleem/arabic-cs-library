const o="kinney",t="storybook",e="بناء أنظمة التصميم في Storybook",n="setting-up",s="إعداد Storybook",r=[],i=`<p>يتولّى Storybook معظم إعداداته بنفسه. داخل مشروع قائم، ما عليك إلا تشغيل الأمر التالي.</p>
<pre><code class="language-bash">npx storybook@latest init
</code></pre>
<p>عند تشغيل هذا الأمر، سيلقي Storybook نظرة على مشروعك ويحاول معرفة إطار العمل — إن وُجد — الذي تستخدمه إلى جانب أدوات البناء التي تستخدمها. ولنفترض جدلًا أننا نستخدم React وTypeScript وVite.</p>
<p>سيثبّت Storybook الاعتمادات التالية:</p>
<ul>
<li><a href="https://npm.im/@chromatic-com/storybook"><code>@chromatic-com/storybook</code></a></li>
<li><a href="https://npm.im/@storybook/addon-essentials"><code>@storybook/addon-essentials</code></a></li>
<li><a href="https://npm.im/@storybook/addon-interactions"><code>@storybook/addon-interactions</code></a></li>
<li><a href="https://npm.im/@storybook/addon-links"><code>@storybook/addon-links</code></a></li>
<li><a href="https://npm.im/@storybook/blocks"><code>@storybook/blocks</code></a></li>
<li><a href="https://npm.im/@storybook/react"><code>@storybook/react</code></a></li>
<li><a href="https://npm.im/@storybook/react-vite"><code>@storybook/react-vite</code></a></li>
<li><a href="https://npm.im/@storybook/test"><code>@storybook/test</code></a></li>
</ul>
<p>بالإضافة إلى ذلك، سيُثبَّت <a href="https://npm.im/eslint-plugin-storybook"><code>eslint-plugin-storybook</code></a> <em>فقط</em> إذا كنت تستخدم <a href="https://eslint.org/">ESLint</a> بالفعل في مشروعك.</p>
<p>هناك اعتماد إضافي واحد، <a href="https://npm.im/@storybook/addon-onboarding"><code>@storybook/addon-onboarding</code></a>، لن يُثبَّت <em>إلا</em> مع أطر عمل معيّنة. ومن المرجّح أيضًا أنك ستزيله لاحقًا.</p>
<p>وسينشئ أيضًا مجلد <code>.storybook</code> في جذر مشروعك مع ملفين:</p>
<ul>
<li><code>.storybook/main.ts</code></li>
<li><code>.storybook/preview.ts</code></li>
</ul>
<p>وسيُعدّ لك بعض القصص الأساسية في <code>src/stories</code>.</p>
<p>وأخيرًا، سيُشغّل خادمًا يعمل على المنفذ 6006. ويمكنك تشغيل هذا الخادم في أي وقت باستخدام <code>npm run storybook</code>.</p>
<p><img src="/arabic-cs-library/images/kinney/eb40b408789bbdc7.webp" alt="شاشة الترحيب الأولية في Storybook"></p>
<p>وبعد ذلك، لنلقِ نظرة على <a href="https://stevekinney.com/courses/storybook/writing-stories">كتابة أول قصة لنا</a>.</p>
`,c={book:o,chapter:t,chapterTitle:e,slug:n,title:s,headings:r,html:i};export{o as book,t as chapter,e as chapterTitle,c as default,r as headings,i as html,n as slug,s as title};
