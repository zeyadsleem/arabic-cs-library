const t="kinney",r="full-stack-typescript",e="TypeScript للويب الكامل",n="prisma-trpc",c="توليد tRPC من Prisma",o=[],a=`<p>حسنًا، حان وقت مكتبة أخرى! هذه المرة، سنستخدم قطعة تقنية أخرى مُسمّاة جيدًا: <a href="https://github.com/omar-dulaimi/prisma-trpc-generator">prisma-trpc-generator</a>.</p>
<pre><code class="language-prisma">generator trpc {
  provider          = &quot;prisma-trpc-generator&quot;
  withZod           = true
  withMiddleware    = false
  withShield        = false
  contextPath       = &quot;../src/context&quot;
  trpcOptionsPath   = &quot;../src/trpcOptions&quot;
}
</code></pre>
`,p={book:t,chapter:r,chapterTitle:e,slug:n,title:c,headings:o,html:a};export{t as book,r as chapter,e as chapterTitle,p as default,o as headings,a as html,n as slug,c as title};
