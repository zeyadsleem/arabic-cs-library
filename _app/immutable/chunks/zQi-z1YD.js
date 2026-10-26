const n="kinney",a="aws",e="نشر تطبيقات الويب على AWS",o="deploying-scratch-lab",t="نشر Scratch Lab إلى CloudFront",c=[{depth:2,id:"استنساخ-المستودع-وبناؤه",text:"استنساخ المستودع وبناؤه"},{depth:2,id:"النشر-إلى-حاوية-s3",text:"النشر إلى حاوية S3"},{depth:2,id:"ما-يحدث-مع-المسارات-على-جانب-العميل",text:"ما يحدث مع المسارات على جانب العميل"},{depth:2,id:"ما-الذي-ستصلحه-تاليا",text:"ما الذي ستصلحه تاليًا"}],s=`<p>حتى الآن، كنت تنشر موقعًا تجريبيًا من أربعة ملفات: <code>index.html</code>، وورقة أنماط، وسكربت، وصفحة خطأ. كان ذلك مقصودًا. فعندما تتعلم سياسات حاويات S3 وسلوكات التخزين المؤقت في CloudFront، فإن آخر ما تحتاجه هو خطوة بناء React تعكّر حلقة التغذية الراجعة. لكن الموقع التجريبي أدّى مهمته. لقد فهمت المسار. والآن حان وقت وضع تطبيق حقيقي عليه.</p>
<p><a href="https://github.com/stevekinney/scratch-lab">Scratch Lab</a> تطبيق مفكّرة (notepad) مبني بـ React وTypeScript وVite. وله توجيه على جانب العميل (<code>/</code> و<code>/notes/:id</code>)، وشجرة مكوّنات حقيقية، وتعقيد كافٍ لكشف المشكلات التي وُجدت دوال الحافة لحلّها. وستبنيه، وتنشر مخرجاته إلى حاوية S3 الموجودة لديك، وترى ما يحدث.</p>
<blockquote>
<p><strong>هذا هو التطبيق لبقية الدورة</strong></p>
<p>من هنا فصاعدًا، Scratch Lab هو ما تبني عليه. تضيف أقسام Lambda وAPI Gateway واجهة خلفية. وتضيف DynamoDB الاستمرارية. ويخزّن Secrets Manager بيانات الاعتماد. وبنهاية الدورة، تصبح هذه المفكّرة تطبيقًا متكاملًا منشورًا بالكامل على AWS.</p>
</blockquote>
<h2 id="استنساخ-المستودع-وبناؤه">استنساخ المستودع وبناؤه</h2>
<p>إن لم تكن قد فعلت ذلك بعد، فاستنسخ مستودع Scratch Lab:</p>
<pre><code class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/stevekinney/scratch-lab.git
<span class="hljs-built_in">cd</span> scratch-lab
npm install
</code></pre>
<p>ابنِ التطبيق:</p>
<pre><code class="language-bash">npm run build
</code></pre>
<p>ينتج هذا دليل <code>dist/</code> بمخرجات Vite القياسية:</p>
<pre><code>dist/
├── index.html
├── favicon.svg
└── assets/
    ├── index-BzcUcrld.js
    └── index-DiDi9kH6.css
</code></pre>
<p>لاحظ ما <em>ليس</em> هنا: لا يوجد دليل <code>notes/</code>، ولا <code>notes/abc123/index.html</code>. فكل مسار في التطبيق — <code>/</code> و<code>/notes/abc123</code> و<code>/not-found</code> — يتولاه JavaScript على جانب العميل. ويحمّل <code>index.html</code> الوحيد حزمة JS، ويقرأ موجّه مخصّص <code>window.location.pathname</code> ليقرّر ما يعرضه.</p>
<p>وهذه هي البنية نفسها في أي بناء Vite أو Create React App أو تصدير ثابت من Next.js. وهي البنية التي ستتصرف قريبًا بطرق قد لا تتوقعها على توزيع CloudFront لديك.</p>
<h2 id="النشر-إلى-حاوية-s3">النشر إلى حاوية S3</h2>
<p>استبدل ملفات الموقع التجريبي بمخرجات بناء Scratch Lab:</p>
<pre><code class="language-bash">aws s3 <span class="hljs-built_in">sync</span> ./dist s3://my-frontend-app-assets \\
  --region us-east-1 \\
  --delete \\
  --output json
</code></pre>
<p>يزيل علم <code>--delete</code> ملفات الموقع التجريبي القديمة (<code>app.js</code> و<code>styles.css</code> و<code>error.html</code>). وتحتوي حاوية S3 لديك الآن على بناء Scratch Lab فقط.</p>
<p>أبطل ذاكرة CloudFront المؤقتة كي تلتقط مواقع الحافة الملفات الجديدة:</p>
<pre><code class="language-bash">aws cloudfront create-invalidation \\
  --distribution-id YOUR_DISTRIBUTION_ID \\
  --paths <span class="hljs-string">&quot;/*&quot;</span> \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>انتظر دقيقة أو دقيقتين، ثم زُر نطاق CloudFront في متصفح. وينبغي أن ترى واجهة مفكّرة Scratch Lab بدلًا من صفحة الموقع التجريبي.</p>
<h2 id="ما-يحدث-مع-المسارات-على-جانب-العميل">ما يحدث مع المسارات على جانب العميل</h2>
<p>يُحمَّل التطبيق جيدًا على عنوان URL الجذري. تنقّل فيه — أنشئ ملاحظة، وانتقل إليها. يتحدّث شريط العنوان إلى شيء مثل <code>/notes/abc123</code>. وكل شيء يعمل لأن الموجّه على جانب العميل يتولى التنقل باستخدام <code>history.pushState</code>، ولا يجري المتصفح طلبًا جديدًا إلى CloudFront أبدًا.</p>
<p>الآن <strong>حدّث الصفحة</strong> بينما أنت على <code>/notes/abc123</code>.</p>
<p>هنا يصبح الأمر مثيرًا. لقد أعددت استجابات أخطاء مخصّصة في <a href="https://stevekinney.com/courses/aws/cloudfront-distribution-exercise">تمرين توزيع CloudFront</a> — فأخطاء 403 و404 من S3 تُعترَض وتقدّم <code>/index.html</code> برمز حالة 200. لذا تُحمَّل الصفحة فعليًا. ويلتقط موجّه SPA المسار، ويجد الملاحظة، ويعرضها. ومن منظور المستخدم، إنها تعمل.</p>
<p>لكن افحص استجابة HTTP:</p>
<pre><code class="language-bash">curl -I https://YOUR_CLOUDFRONT_DOMAIN/notes/abc123
</code></pre>
<p>رمز الحالة: <strong>200 OK</strong>. وهذا صحيح لعنوان URL هذا — فهو مسار صالح.</p>
<p>الآن جرّب مسارًا غير موجود في تطبيقك:</p>
<pre><code class="language-bash">curl -I https://YOUR_CLOUDFRONT_DOMAIN/totally-fake-path
</code></pre>
<p>رمز الحالة: لا يزال <strong>200 OK</strong>. يعرض تطبيق SPA مكوّن «غير موجود» لديه، لكن حالة HTTP تقول إن كل شيء على ما يرام. جرّب <code>/settings</code> و<code>/admin</code> و<code>/notes/</code> (بشرطة مائلة في النهاية) — كلها 200.</p>
<p>وهذا يهم لسببين:</p>
<ol>
<li><strong>محركات البحث.</strong> تفهرس Google الصفحات بناءً على رموز حالة HTTP. فرمز 200 على <code>/totally-fake-path</code> يقول للزواحف إنها صفحة حقيقية تستحق الفهرسة. وتنتهي بنفايات في نتائج بحثك.</li>
<li><strong>المراقبة.</strong> إذا أرجع كل مسار 200، فلا يمكنك التمييز بين حركة المرور الحقيقية والروابط المعطوبة والروبوتات التي تطرق مسارات عشوائية وإعادات التوجيه المهيّأة بشكل خاطئ من مواقع أخرى.</li>
</ol>
<p>أوصلتك استجابات الأخطاء المخصّصة إلى 90% من الطريق — فالتطبيق يعمل للمستخدمين. لكن دلالات HTTP خاطئة، وهذا بالضبط نوع المشكلة الذي تحلّه دوال الحافة.</p>
<h2 id="ما-الذي-ستصلحه-تاليا">ما الذي ستصلحه تاليًا</h2>
<p>في الدروس القليلة التالية، ستتعلم الفرق بين CloudFront Functions وLambda@Edge، ثم:</p>
<ol>
<li><strong>تكتب CloudFront Function</strong> تعيد كتابة عناوين URL قبل أن تصل إلى S3 — بحيث يطلب CloudFront الملف <code>/index.html</code> مباشرة بدلًا من انتظار S3 ليُرجع 403 ثم اعتراضه.</li>
<li><strong>تكتب دالة Lambda@Edge</strong> تفحص عنوان URL الأصلي مقابل مسارات تطبيقك المعروفة وتُرجع رمز حالة 404 صحيحًا للمسارات غير المطابقة.</li>
</ol>
<p>والنتيجة: مسارات SPA لديك تعمل بشكل صحيح، والأصول الثابتة تُقدَّم مباشرة، والمسارات المجهولة تُرجع 404 بدلالات HTTP الصحيحة.</p>
`,d={book:n,chapter:"aws",chapterTitle:e,slug:o,title:t,headings:c,html:s};export{n as book,a as chapter,e as chapterTitle,d as default,c as headings,s as html,o as slug,t as title};
