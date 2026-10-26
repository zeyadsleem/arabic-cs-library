const o="kinney",t="storybook",n="بناء أنظمة التصميم في Storybook",s="test-runner",e="إعداد مشغّل اختبارات",r=[{depth:2,id:"تشغيل-اختباراتك-في-github-actions",text:"تشغيل اختباراتك في Github Actions"}],c=`<p>يتيح لك Storybook أن تأخذ <a href="https://stevekinney.com/courses/storybook/play-functions">دوال التشغيل (Play functions)</a> وتشغّلها كلها بالترتيب للتأكد من أنها تفعل ما تتوقّعه منها.</p>
<p>ستحتاج إلى تثبيت مشغّل الاختبارات الخاص بهم للبدء في ذلك:</p>
<pre><code class="language-bash">npm install -D @storybook/test-runner
</code></pre>
<blockquote>
<p><strong>يستخدم Storybook إطار Playwright</strong></p>
<p>تأكد من تثبيت متصفحات Playwright لديك بتشغيل <code>npx playwright install</code>.</p>
</blockquote>
<blockquote>
<p><strong>يجب أن يكون Storybook قيد التشغيل</strong></p>
<p>يجب أن يكون Storybook قيد التشغيل لتشغيل اختباراتك باستخدام <code>@storybook/test-runner</code>.</p>
</blockquote>
<p>بمجرد أن يعمل Storybook لديك، يمكنك تشغيل اختباراتك.</p>
<pre><code class="language-bash">npx test-storybook
</code></pre>
<p>بدلًا من ذلك، يمكنك — بل ينبغي لك — إضافة سكربت إلى <code>package.json</code> لتشغيل الاختبارات.</p>
<h2 id="تشغيل-اختباراتك-في-github-actions">تشغيل اختباراتك في Github Actions</h2>
<p>لن نغطّي ذلك في وقتنا القصير معًا اليوم، لكن <a href="https://storybook.js.org/docs/writing-tests/test-runner#set-up-ci-to-run-tests">توثيق Storybook الرسمي</a> يتضمّن بعض الأمثلة على <a href="https://github.com/features/actions">Github Actions</a> لتشغيل اختبارات Storybook لديك كجزء من عملية CI/CD.</p>
`,p={book:o,chapter:t,chapterTitle:n,slug:s,title:e,headings:r,html:c};export{o as book,t as chapter,n as chapterTitle,p as default,r as headings,c as html,s as slug,e as title};
