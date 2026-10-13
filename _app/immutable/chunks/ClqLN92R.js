const s="hono",n="getting-started",a="مقدمات",e="google-cloud-run",l="Google Cloud Run",o=[{depth:2,id:"1-تثبيت-cli",text:"1. تثبيت CLI"},{depth:2,id:"2-إعداد-المشروع",text:"2. إعداد المشروع"},{depth:2,id:"3-مرحبا-بالعالم",text:"3. مرحبًا بالعالم"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:2,id:"تغيير-بيئات-التشغيل",text:"تغيير بيئات التشغيل"}],p=`<p><a href="https://cloud.google.com/run">Google Cloud Run</a> هي منصة بدون خادم (serverless) مبنية بواسطة Google Cloud. يمكنك تشغيل كودك استجابةً للأحداث وتدير Google تلقائيًا موارد الحوسبة الأساسية نيابة عنك.</p>
<p>يستخدم Google Cloud Run الحاويات لتشغيل خدمتك. هذا يعني أنه يمكنك استخدام أي وقت تشغيل تريده (مثلًا Deno أو Bun) من خلال توفير Dockerfile. إذا لم يتم توفير Dockerfile، سيستخدم Google Cloud Run حزمة البناء (buildpack) الافتراضية لـ Node.js.</p>
<p>يفترض هذا الدليل أن لديك بالفعل حساب Google Cloud وحساب فوترة.</p>
<h2 id="1-تثبيت-cli">1. تثبيت CLI</h2>
<p>عند العمل مع Google Cloud Platform، من الأسهل التعامل مع <a href="https://cloud.google.com/sdk/docs/install">gcloud CLI</a>.</p>
<p>على سبيل المثال، على MacOS باستخدام Homebrew:</p>
<pre><code class="language-sh">brew install --cask gcloud-cli
</code></pre>
<p>صادِق باستخدام CLI.</p>
<pre><code class="language-sh">gcloud auth login
</code></pre>
<h2 id="2-إعداد-المشروع">2. إعداد المشروع</h2>
<p>أنشئ مشروعًا. اقبل معرف المشروع (project ID) المُنشأ تلقائيًا عند المطالبة (prompt).</p>
<pre><code class="language-sh">gcloud projects create --set-as-default --name=<span class="hljs-string">&quot;my app&quot;</span>
</code></pre>
<p>أنشئ متغيرات بيئة لمعرّف مشروعك (project ID) ورقم مشروعك لسهولة إعادة الاستخدام. قد يستغرق الأمر حوالي 30 ثانية قبل أن يُرجع المشروع بنجاح مع <code>gcloud projects list</code> الأمر.</p>
<pre><code class="language-sh">PROJECT_ID=$(gcloud projects list \\
    --format=<span class="hljs-string">&#x27;value(projectId)&#x27;</span> \\
    --filter=<span class="hljs-string">&#x27;name=&quot;my app&quot;&#x27;</span>)

PROJECT_NUMBER=$(gcloud projects list \\
    --format=<span class="hljs-string">&#x27;value(projectNumber)&#x27;</span> \\
    --filter=<span class="hljs-string">&#x27;name=&quot;my app&quot;&#x27;</span>)

<span class="hljs-built_in">echo</span> <span class="hljs-variable">$PROJECT_ID</span> <span class="hljs-variable">$PROJECT_NUMBER</span>
</code></pre>
<p>ابحث عن معرّف حساب الفوترة الخاص بك.</p>
<pre><code class="language-sh">gcloud billing accounts list
</code></pre>
<p>أضِف حساب الفوترة (billing) من الأمر السابق إلى المشروع.</p>
<pre><code class="language-sh">gcloud billing projects <span class="hljs-built_in">link</span> <span class="hljs-variable">$PROJECT_ID</span> \\
    --billing-account=[billing_account_id]
</code></pre>
<p>فعّل واجهات API المطلوبة.</p>
<pre><code class="language-sh">gcloud services <span class="hljs-built_in">enable</span> run.googleapis.com \\
    cloudbuild.googleapis.com
</code></pre>
<p>حدّث صلاحيات حساب الخدمة (service account) للوصول إلى Cloud Build.</p>
<pre><code class="language-sh">gcloud projects add-iam-policy-binding <span class="hljs-variable">$PROJECT_ID</span> \\
    --member=serviceAccount:<span class="hljs-variable">$PROJECT_NUMBER</span>-compute@developer.gserviceaccount.com \\
    --role=roles/run.builder
</code></pre>
<h2 id="3-مرحبا-بالعالم">3. مرحبًا بالعالم</h2>
<p>ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;. اختر <code>nodejs</code>.</p>
<pre><code class="language-sh">npm create hono@latest my-app
</code></pre>
<p>انتقل إلى <code>my-app</code> وثبّت التبعيات.</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
npm i
</code></pre>
<p>حدّث المنفذ في <code>src/index.ts</code> ليكون <code>8080</code>.</p>
<!-- prettier-ignore -->
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { serve } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono!&#x27;</span>)
})

<span class="hljs-title function_">serve</span>({
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span> <span class="hljs-comment">// [!code --]</span>
  <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span> <span class="hljs-comment">// [!code ++]</span>
}, <span class="hljs-function">(<span class="hljs-params">info</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Server is running on http://localhost:<span class="hljs-subst">\${info.port}</span>\`</span>)
})
</code></pre>
<p>شغّل خادم التطوير محليًا. ثم افتح http://localhost:8080 في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<h2 id="4-النشر">4. النشر</h2>
<p>ابدأ النشر واتبع المطالبات التفاعلية (على سبيل المثال، حدد منطقة).</p>
<pre><code class="language-sh">gcloud run deploy my-app --<span class="hljs-built_in">source</span> . --allow-unauthenticated
</code></pre>
<h2 id="تغيير-بيئات-التشغيل">تغيير بيئات التشغيل</h2>
<p>إذا كنت تريد النشر باستخدام بيئتي تشغيل Deno أو Bun (أو حاوية Nodejs مخصصة)، أضف <code>Dockerfile</code> (واختياريًا <code>.dockerignore</code>) بالبيئة التي تريدها.</p>
<p>لمعلومات حول الحَوسَبة (containerizing)، يُرجى الرجوع إلى:</p>
<ul>
<li><a href="https://hono.dev/docs/getting-started/nodejs#building-deployment">Node.js</a></li>
<li><a href="https://bun.com/guides/ecosystem/docker"><code>Bun</code></a></li>
<li><a href="https://docs.deno.com/examples/google_cloud_run_tutorial">Deno</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:o,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,o as headings,p as html,e as slug,l as title};
