const s="kinney",t="full-stack-typescript",e="TypeScript للويب الكامل",p="zod-schemas-from-prisma",o="توليد مخططات Zod من Prisma",a=[],r=`<p>الآن وقد أعددنا Prisma، الجزء التالي سهل. سنستخدم أداة مُسمّاة aptly، تُدعى <a href="https://www.npmjs.com/package/zod-prisma-types"><code>zod-prisma-types</code></a>.</p>
<p>في إعداد Prisma الخاص بك أضف ما يلي.</p>
<pre><code class="language-prisma">generator zod {
  provider       = &quot;zod-prisma-types&quot;
}
</code></pre>
<p>والآن نفّذ: <code>npx prisma generate zod</code>.</p>
<p><strong>رائع.</strong> هذا كل ما في الأمر. ولكن، ماذا لو تمكّنا أيضًا من توليد <a href="https://stevekinney.com/courses/full-stack-typescript/prisma-trpc">مخطط tRPC</a>؟</p>
`,c={book:s,chapter:t,chapterTitle:e,slug:p,title:o,headings:a,html:r};export{s as book,t as chapter,e as chapterTitle,c as default,a as headings,r as html,p as slug,o as title};
