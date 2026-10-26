const e="kinney",n="visual-studio-code",s="Visual Studio Code",o="dev-containers-and-dockerfiles",c="حاويات التطوير وملفات Dockerfile",a=[{depth:2,id:"أمثلة-على-تخصيص-dockerfile",text:"أمثلة على تخصيص Dockerfile"},{depth:3,id:"تثبيت-برمجيات-إضافية",text:"تثبيت برمجيات إضافية"},{depth:3,id:"ضبط-إعدادات-النظام",text:"ضبط إعدادات النظام"},{depth:3,id:"إعداد-الخدمات-قواعد-البيانات-ونواقل-الرسائل",text:"إعداد الخدمات (قواعد البيانات، ونواقل الرسائل)"},{depth:3,id:"صور-أساسية-مخصصة",text:"صور أساسية مخصّصة"},{depth:2,id:"أفضل-الممارسات-لملفات-dockerfile-في-حاويات-التطوير",text:"أفضل الممارسات لملفات Dockerfile في حاويات التطوير"}],l=`<p>توفّر حاويات التطوير درجة عالية من التخصيص لتلائم احتياجات مشروعك وتفضيلاتك الشخصية تمامًا. لنغص في تقنيات التخصيص المتقدّمة. فمع أن استخدام صور جاهزة عبر خاصية <code>image</code> في <code>devcontainer.json</code> مناسب، فإن استخدام <strong>Dockerfile</strong> للتخصيص الأكثر تقدمًا يوفّر تحكّمًا لا يُضاهى في صورة حاويتك.</p>
<ol>
<li><strong>أنشئ <code>Dockerfile</code>:</strong> أنشئ ملفًا باسم <code>Dockerfile</code> داخل مجلد <code>.devcontainer</code> في مشروعك.</li>
<li><strong>عدّل <code>devcontainer.json</code>:</strong> في <code>devcontainer.json</code>، استبدل خاصية <code>image</code> بـ<code>dockerFile</code> وحدّد مسار Dockerfile الخاص بك.</li>
</ol>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;dockerFile&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Dockerfile&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>إذا كان Dockerfile في المجلد نفسه الذي يضمّ <code>devcontainer.json</code>، فاستخدم <code>&quot;dockerFile&quot;: &quot;Dockerfile&quot;</code> ببساطة. وإذا كان في مجلد فرعي، فاستخدم مسارًا نسبيًا مثل <code>&quot;dockerFile&quot;: &quot;./path/to/Dockerfile&quot;</code>.</p>
<h2 id="أمثلة-على-تخصيص-dockerfile">أمثلة على تخصيص Dockerfile</h2>
<h3 id="تثبيت-برمجيات-إضافية">تثبيت برمجيات إضافية</h3>
<p>استخدم تعليمات <code>RUN</code> في Dockerfile لتثبيت أي حزم برمجية أو مكتبات أو أدوات يحتاجها بيئتك.</p>
<pre><code class="language-dockerfile"><span class="hljs-keyword">FROM</span> mcr.microsoft.com/devcontainers/javascript-node:<span class="hljs-number">18</span>
<span class="hljs-keyword">RUN</span><span class="language-bash"> apt-get update &amp;&amp; apt-get install -y --no-install-recommends \\
</span>
graphicsmagick
</code></pre>
<p>يضيف هذا المثال مكتبة معالجة الصور <code>graphicsmagick</code> إلى حاوية تطوير Node.js.</p>
<h3 id="ضبط-إعدادات-النظام">ضبط إعدادات النظام</h3>
<p>استخدم تعليمات <code>RUN</code> لتعديل إعدادات النظام داخل الحاوية.</p>
<pre><code class="language-dockerfile"><span class="hljs-keyword">FROM</span> mcr.microsoft.com/devcontainers/python:<span class="hljs-number">3.10</span>
<span class="hljs-keyword">RUN</span><span class="language-bash"> <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;en_US.UTF-8 UTF-8&quot;</span> &gt;&gt; /etc/locale.gen &amp;&amp; \\
</span>
locale-gen

<span class="hljs-keyword">ENV</span> LANG en_US.UTF-<span class="hljs-number">8</span>
<span class="hljs-keyword">ENV</span> LANGUAGE en_US:en
<span class="hljs-keyword">ENV</span> LC_ALL en_US.UTF-<span class="hljs-number">8</span>
</code></pre>
<p>يضبط هذا المثال اللغة المحلية (locale) داخل حاوية تطوير Python على UTF-8.</p>
<h3 id="إعداد-الخدمات-قواعد-البيانات-ونواقل-الرسائل">إعداد الخدمات (قواعد البيانات، ونواقل الرسائل)</h3>
<p>مع أن ملفات Dockerfile مخصّصة أساسًا لبناء الصور، يمكنك استخدام أوامر <code>RUN</code> لإعداد خدمات بسيطة. لكن بالنسبة إلى البنى الأكثر تعقيدًا متعدّدة الحاويات مع قواعد البيانات ونواقل الرسائل وغيرها، فكّر في استخدام <strong>Docker Compose</strong> (وسنتناوله لاحقًا).</p>
<pre><code class="language-dockerfile"><span class="hljs-keyword">FROM</span> mcr.microsoft.com/devcontainers/go:<span class="hljs-number">1.20</span>
<span class="hljs-keyword">RUN</span><span class="language-bash"> apt-get update &amp;&amp; apt-get install -y --no-install-recommends \\
</span>
postgresql-client
</code></pre>
<p>يثبّت هذا المثال أدوات عميل PostgreSQL في حاوية تطوير Go.</p>
<h3 id="صور-أساسية-مخصصة">صور أساسية مخصّصة</h3>
<p>يمكنك استخدام أي صورة Docker كصورة أساسية في Dockerfile، بما في ذلك صور مخصّصة تنشئها وتستضيفها بنفسك أو صور من سجلات خاصة.</p>
<h2 id="أفضل-الممارسات-لملفات-dockerfile-في-حاويات-التطوير">أفضل الممارسات لملفات Dockerfile في حاويات التطوير</h2>
<ul>
<li><strong>ابدأ بصورة أساسية جيدة الصيانة:</strong> ابدأ <code>Dockerfile</code> بـ<code>FROM</code> من صورة أساسية موثوقة وجيدة الصيانة وذات صلة بمنظومتك التقنية (مثل الصور الرسمية للغات، وصور Microsoft Dev Container).</li>
<li><strong>تحسين الطبقات:</strong> اتبع أفضل ممارسات Dockerfile في الطبقات الفعّالة والتخزين المؤقت لتسريع عمليات بناء الحاويات (اجمع الأوامر المترابطة في تعليمة <code>RUN</code> واحدة، ورتّب التعليمات بذكاء).</li>
<li><strong>أبقِه بسيطًا (في البداية):</strong> ابدأ بملف Dockerfile يضمّ البرمجيات والإعدادات الأساسية. وأضف التخصيصات تدريجيًا عند الحاجة. فملفات Dockerfile المعقّدة أكثر من اللازم قد تزيد زمن البناء وعبء الصيانة.</li>
<li><strong>تثبيت الإصدارات (الاعتمادات):</strong> فكّر في تثبيت إصدارات حزم البرمجيات والاعتمادات في Dockerfile لضمان قابلية إعادة الإنتاج وتجنّب التغييرات غير المتوقّعة عند تحديث الصور الأساسية.</li>
</ul>
`,t={book:e,chapter:n,chapterTitle:s,slug:o,title:c,headings:a,html:l};export{e as book,n as chapter,s as chapterTitle,t as default,a as headings,l as html,o as slug,c as title};
