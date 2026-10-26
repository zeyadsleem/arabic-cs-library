const s="kinney",t="aws",a="نشر تطبيقات الويب على AWS",n="s3-sdk-examples",l="أمثلة على SDK الخاص بـ S3",p=[{depth:2,id:"التثبيت",text:"التثبيت"},{depth:2,id:"تهيئة-العميل",text:"تهيئة العميل"},{depth:2,id:"رفع-كائن-putobject",text:"رفع كائن (PutObject)"},{depth:2,id:"تنزيل-كائن-getobject",text:"تنزيل كائن (GetObject)"},{depth:2,id:"سرد-الكائنات-listobjectsv2",text:"سرد الكائنات (ListObjectsV2)"},{depth:2,id:"حذف-كائن",text:"حذف كائن"},{depth:2,id:"نسخ-كائن",text:"نسخ كائن"},{depth:2,id:"التحقق-من-الوجود-headobject",text:"التحقّق من الوجود (HeadObject)"},{depth:2,id:"عناوين-url-الموقعة-مسبقا",text:"عناوين URL الموقّعة مسبقًا"},{depth:3,id:"عنوان-url-موقع-مسبقا-للتنزيل-getobject",text:"عنوان URL موقّع مسبقًا للتنزيل (GetObject)"},{depth:3,id:"عنوان-url-موقع-مسبقا-للرفع-putobject",text:"عنوان URL موقّع مسبقًا للرفع (PutObject)"},{depth:2,id:"الرفع-متعدد-الأجزاء-للملفات-الكبيرة",text:"الرفع متعدّد الأجزاء (للملفات الكبيرة)"},{depth:2,id:"مثال-express-الرفع-عبر-عنوان-url-موقع-مسبقا",text:"مثال Express: الرفع عبر عنوان URL موقّع مسبقًا"},{depth:2,id:"المزالق-الشائعة",text:"المزالق الشائعة"}],e=`<p>أنماط شائعة للعمل مع Amazon S3 باستخدام AWS SDK لـ JavaScript الإصدار v3 (<code>@aws-sdk/client-s3</code>).</p>
<h2 id="التثبيت">التثبيت</h2>
<pre><code class="language-bash">npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
</code></pre>
<h2 id="تهيئة-العميل">تهيئة العميل</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { S3Client } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">const</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-title function_">S3Client</span>({
  <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span>,
  <span class="hljs-comment">// Credentials are resolved from the environment, shared config,</span>
  <span class="hljs-comment">// or IAM role by default — only set them explicitly when needed.</span>
});
</code></pre>
<h2 id="رفع-كائن-putobject">رفع كائن (<code>PutObject</code>)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PutObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;
<span class="hljs-keyword">import</span> { readFile } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs/promises&#x27;</span>;

<span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> <span class="hljs-title function_">readFile</span>(<span class="hljs-string">&#x27;./hello.txt&#x27;</span>);

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutObjectCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;hello.txt&#x27;</span>,
    <span class="hljs-title class_">Body</span>: body,
    <span class="hljs-title class_">ContentType</span>: <span class="hljs-string">&#x27;text/plain&#x27;</span>,
  }),
);
</code></pre>
<h2 id="تنزيل-كائن-getobject">تنزيل كائن (<code>GetObject</code>)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">GetObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">const</span> { <span class="hljs-title class_">Body</span> } = <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetObjectCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;hello.txt&#x27;</span>,
  }),
);

<span class="hljs-keyword">const</span> text = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Body</span>!.<span class="hljs-title function_">transformToString</span>();
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(text);
</code></pre>
<h2 id="سرد-الكائنات-listobjectsv2">سرد الكائنات (<code>ListObjectsV2</code>)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ListObjectsV2Command</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-title class_">ContinuationToken</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>;
<span class="hljs-keyword">do</span> {
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListObjectsV2Command</span>({
      <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
      <span class="hljs-title class_">Prefix</span>: <span class="hljs-string">&#x27;uploads/&#x27;</span>,
      <span class="hljs-title class_">ContinuationToken</span>,
    }),
  );

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> obj <span class="hljs-keyword">of</span> page.<span class="hljs-property">Contents</span> ?? []) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(obj.<span class="hljs-property">Key</span>, obj.<span class="hljs-property">Size</span>);
  }

  <span class="hljs-title class_">ContinuationToken</span> = page.<span class="hljs-property">IsTruncated</span> ? page.<span class="hljs-property">NextContinuationToken</span> : <span class="hljs-literal">undefined</span>;
} <span class="hljs-keyword">while</span> (<span class="hljs-title class_">ContinuationToken</span>);
</code></pre>
<h2 id="حذف-كائن">حذف كائن</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DeleteObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">DeleteObjectCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;hello.txt&#x27;</span>,
  }),
);
</code></pre>
<h2 id="نسخ-كائن">نسخ كائن</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">CopyObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">CopyObjectCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
    <span class="hljs-title class_">CopySource</span>: <span class="hljs-string">&#x27;my-bucket/hello.txt&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;archive/hello.txt&#x27;</span>,
  }),
);
</code></pre>
<h2 id="التحقق-من-الوجود-headobject">التحقّق من الوجود (<code>HeadObject</code>)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HeadObjectCommand</span>, <span class="hljs-title class_">NotFound</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">exists</span>(<span class="hljs-params"><span class="hljs-title class_">Bucket</span>: <span class="hljs-built_in">string</span>, <span class="hljs-title class_">Key</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">HeadObjectCommand</span>({ <span class="hljs-title class_">Bucket</span>, <span class="hljs-title class_">Key</span> }));
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">NotFound</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">throw</span> err;
  }
}
</code></pre>
<h2 id="عناوين-url-الموقعة-مسبقا">عناوين URL الموقّعة مسبقًا</h2>
<p>تتيح عناوين URL الموقّعة مسبقًا للعميل رفع كائن أو تنزيله مباشرة من S3 دون أن يمرّر خادمك الخلفي البايتات. ويحمل عنوان URL توقيعًا محدود النطاق وقصير الأجل — فلا يحتاج العميل إلى بيانات اعتماد AWS.</p>
<h3 id="عنوان-url-موقع-مسبقا-للتنزيل-getobject">عنوان URL موقّع مسبقًا للتنزيل (<code>GetObject</code>)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">GetObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;
<span class="hljs-keyword">import</span> { getSignedUrl } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/s3-request-presigner&#x27;</span>;

<span class="hljs-keyword">const</span> url = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getSignedUrl</span>(
  s3,
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetObjectCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;reports/q1.pdf&#x27;</span>,
  }),
  { <span class="hljs-attr">expiresIn</span>: <span class="hljs-number">60</span> * <span class="hljs-number">5</span> }, <span class="hljs-comment">// 5 minutes</span>
);

<span class="hljs-comment">// Hand \`url\` to the browser — plain GET, no auth headers.</span>
</code></pre>
<h3 id="عنوان-url-موقع-مسبقا-للرفع-putobject">عنوان URL موقّع مسبقًا للرفع (<code>PutObject</code>)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">PutObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;
<span class="hljs-keyword">import</span> { getSignedUrl } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/s3-request-presigner&#x27;</span>;

<span class="hljs-keyword">const</span> url = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getSignedUrl</span>(
  s3,
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutObjectCommand</span>({
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">\`uploads/<span class="hljs-subst">\${crypto.randomUUID()}</span>.png\`</span>,
    <span class="hljs-title class_">ContentType</span>: <span class="hljs-string">&#x27;image/png&#x27;</span>,
  }),
  { <span class="hljs-attr">expiresIn</span>: <span class="hljs-number">60</span> * <span class="hljs-number">15</span> },
);
</code></pre>
<p>على جانب العميل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url, {
  <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;PUT&#x27;</span>,
  <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;image/png&#x27;</span> },
  <span class="hljs-attr">body</span>: file,
});
</code></pre>
<p>يجب أن تطابق ترويسة <code>Content-Type</code> في طلب <code>PUT</code> ما وُقّع، وإلا رفض S3 الطلب بـ <code>SignatureDoesNotMatch</code>.</p>
<h2 id="الرفع-متعدد-الأجزاء-للملفات-الكبيرة">الرفع متعدّد الأجزاء (للملفات الكبيرة)</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Upload</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/lib-storage&#x27;</span>;
<span class="hljs-keyword">import</span> { createReadStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;

<span class="hljs-keyword">const</span> upload = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Upload</span>({
  <span class="hljs-attr">client</span>: s3,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-title class_">Bucket</span>: <span class="hljs-string">&#x27;my-bucket&#x27;</span>,
    <span class="hljs-title class_">Key</span>: <span class="hljs-string">&#x27;videos/large.mp4&#x27;</span>,
    <span class="hljs-title class_">Body</span>: <span class="hljs-title function_">createReadStream</span>(<span class="hljs-string">&#x27;./large.mp4&#x27;</span>),
    <span class="hljs-title class_">ContentType</span>: <span class="hljs-string">&#x27;video/mp4&#x27;</span>,
  },
  <span class="hljs-attr">queueSize</span>: <span class="hljs-number">4</span>,
  <span class="hljs-attr">partSize</span>: <span class="hljs-number">5</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>,
});

upload.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;httpUploadProgress&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`<span class="hljs-subst">\${p.loaded}</span>/<span class="hljs-subst">\${p.total}</span>\`</span>);
});

<span class="hljs-keyword">await</span> upload.<span class="hljs-title function_">done</span>();
</code></pre>
<h2 id="مثال-express-الرفع-عبر-عنوان-url-موقع-مسبقا">مثال Express: الرفع عبر عنوان URL موقّع مسبقًا</h2>
<p>تطبيق Express بسيط يمنح العميل عنوان URL موقّعًا مسبقًا للرفع، ثم يقرأ الكائن مرة أخرى لاحقًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { S3Client, <span class="hljs-title class_">PutObjectCommand</span>, <span class="hljs-title class_">GetObjectCommand</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/client-s3&#x27;</span>;
<span class="hljs-keyword">import</span> { getSignedUrl } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@aws-sdk/s3-request-presigner&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
<span class="hljs-keyword">const</span> s3 = <span class="hljs-keyword">new</span> <span class="hljs-title function_">S3Client</span>({ <span class="hljs-attr">region</span>: <span class="hljs-string">&#x27;us-east-1&#x27;</span> });
<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">BUCKET</span> = <span class="hljs-string">&#x27;my-bucket&#x27;</span>;

<span class="hljs-comment">// Generate a pre-signed URL the client can PUT to directly.</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/uploads&#x27;</span>, <span class="hljs-title function_">async</span> (req, res) =&gt; {
  <span class="hljs-keyword">const</span> key = <span class="hljs-string">\`uploads/<span class="hljs-subst">\${crypto.randomUUID()}</span>.png\`</span>;

  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getSignedUrl</span>(
    s3,
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">PutObjectCommand</span>({
      <span class="hljs-title class_">Bucket</span>: <span class="hljs-variable constant_">BUCKET</span>,
      <span class="hljs-title class_">Key</span>: key,
      <span class="hljs-title class_">ContentType</span>: <span class="hljs-string">&#x27;image/png&#x27;</span>,
    }),
    { <span class="hljs-attr">expiresIn</span>: <span class="hljs-number">60</span> * <span class="hljs-number">15</span> },
  );

  res.<span class="hljs-title function_">json</span>({ url, key });
});

<span class="hljs-comment">// Proxy a download back through the server (useful when the</span>
<span class="hljs-comment">// bucket isn&#x27;t public and you don&#x27;t want to hand out signed GETs).</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/uploads/:key&#x27;</span>, <span class="hljs-title function_">async</span> (req, res) =&gt; {
  <span class="hljs-keyword">const</span> { <span class="hljs-title class_">Body</span>, <span class="hljs-title class_">ContentType</span> } = <span class="hljs-keyword">await</span> s3.<span class="hljs-title function_">send</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetObjectCommand</span>({
      <span class="hljs-title class_">Bucket</span>: <span class="hljs-variable constant_">BUCKET</span>,
      <span class="hljs-title class_">Key</span>: <span class="hljs-string">\`uploads/<span class="hljs-subst">\${req.params.key}</span>\`</span>,
    }),
  );

  res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-title class_">ContentType</span> ?? <span class="hljs-string">&#x27;application/octet-stream&#x27;</span>);
  <span class="hljs-comment">// Body is a Readable stream in Node — pipe it straight through.</span>
  <span class="hljs-title class_">Body</span>!.<span class="hljs-title function_">transformToWebStream</span>().<span class="hljs-title function_">pipeTo</span>(
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">WritableStream</span>({
      <span class="hljs-title function_">write</span>(<span class="hljs-params">chunk</span>) {
        res.<span class="hljs-title function_">write</span>(chunk);
      },
      <span class="hljs-title function_">close</span>(<span class="hljs-params"></span>) {
        res.<span class="hljs-title function_">end</span>();
      },
    }),
  );
});

app.<span class="hljs-title function_">listen</span>(<span class="hljs-number">3000</span>);
</code></pre>
<p>يضرب العميل <code>POST /uploads</code> للحصول على عنوان URL موقّع، ويرفع الملف مباشرة إلى S3 بـ <code>PUT</code>، ويمكنه لاحقًا جلبه عبر <code>GET /uploads/:key</code>. ولا يلمس خادمك بايتات الرفع إطلاقًا — فـ S3 تتولّى العمل الشاق.</p>
<h2 id="المزالق-الشائعة">المزالق الشائعة</h2>
<ul>
<li><strong>CORS</strong>: عمليات الرفع من المتصفح عبر عنوان URL موقّع مسبقًا تحتاج إلى تهيئة CORS في الحاوية للسماح بـ <code>PUT</code> من أصلك.</li>
<li><strong>انحراف الساعة</strong>: عناوين URL الموقّعة مسبقًا مرتبطة بالوقت. والعميل الذي انحرفت ساعته بشدة قد يحصل على <code>RequestTimeTooSkewed</code>.</li>
<li><strong>يجب أن تطابق الترويسات الموقّعة</strong>: أي ترويسة أُدرجت عند التوقيع (مثل <code>ContentType</code> و<code>ACL</code> و<code>x-amz-meta-*</code>) يجب أن يرسلها العميل حرفيًا.</li>
<li><strong>المنطقة</strong>: يجب أن تطابق منطقة العميل منطقة الحاوية، وإلا حصلت على <code>PermanentRedirect</code> / 301.</li>
</ul>
`,c={book:s,chapter:"aws",chapterTitle:a,slug:n,title:l,headings:p,html:e};export{s as book,t as chapter,a as chapterTitle,c as default,p as headings,e as html,n as slug,l as title};
