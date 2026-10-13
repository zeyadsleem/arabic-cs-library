const e="hono",t="guides",o="الأدلة",n="create-hono",a="`Create-hono`",l=[{depth:2,id:"تمرير-الوسائط",text:"تمرير الوسائط:"},{depth:2,id:"الوسائط-الشائعة-الاستخدام",text:"الوسائط الشائعة الاستخدام"},{depth:2,id:"أمثلة-على-التدفقات",text:"أمثلة على التدفقات"},{depth:3,id:"بسيط-وتفاعلي",text:"بسيط وتفاعلي"},{depth:3,id:"غير-تفاعلي-اختر-القالب-template-ومدير-الحزم-package-manager",text:"غير تفاعلي، اختر القالب (template) ومدير الحزم (package manager)"},{depth:3,id:"استخدام-التخزين-المؤقت-دون-اتصال-بدون-شبكة",text:"استخدام التخزين المؤقت دون اتصال (بدون شبكة)"},{depth:2,id:"استكشاف-الأخطاء-وإصلاحها-ونصائح",text:"استكشاف الأخطاء وإصلاحها ونصائح"},{depth:2,id:"روابط-ومراجع",text:"روابط ومراجع"}],c=`<p>خيارات سطر الأوامر المدعومة بواسطة <code>create-hono</code> - مُهيّئ المشروع الذي يعمل عند تشغيلك <code>npm create hono@latest</code>, <code>npx create-hono@latest</code>، أو <code>pnpm create hono@latest</code>.</p>
<blockquote>
<p>[!NOTE]
<strong>لماذا هذه الصفحة؟</strong> غالبًا ما تعرض أمثلة التثبيت / البدء السريع إعدادًا أدنى <code>npm create hono@latest my-app</code> الأمر. <code>create-hono</code> يدعم عدة علامات (flags) مفيدة يمكنك تمريرها لأتمتة وتخصيص إنشاء المشروع (اختيار القوالب، تخطي المطالبات، اختيار مدير الحزم، استخدام ذاكرة التخزين المؤقت المحلية، والمزيد).</p>
</blockquote>
<h2 id="تمرير-الوسائط">تمرير الوسائط:</h2>
<p>عند استخدامك <code>npm create</code> (أو <code>npx</code>) يجب وضع الوسائط (arguments) المخصصة لسكربت التهيئة (initializer) <strong>بعد</strong> <code>--</code>. أي شيء بعد <code>--</code> يُمرَّر إلى المُهيِّئ (initializer).</p>
<pre><code class="language-sh"><span class="hljs-comment"># Forwarding arguments to create-hono (npm requires \`--\`)</span>
npm create hono@latest my-app -- --template cloudflare-workers
</code></pre>
<pre><code class="language-sh"><span class="hljs-comment"># &quot;--template cloudflare-workers&quot; selects the Cloudflare Workers template</span>
yarn create hono my-app --template cloudflare-workers
</code></pre>
<pre><code class="language-sh"><span class="hljs-comment"># &quot;--template cloudflare-workers&quot; selects the Cloudflare Workers template</span>
pnpm create hono@latest my-app --template cloudflare-workers
</code></pre>
<pre><code class="language-sh"><span class="hljs-comment"># &quot;--template cloudflare-workers&quot; selects the Cloudflare Workers template</span>
bun create hono@latest my-app --template cloudflare-workers
</code></pre>
<pre><code class="language-sh"><span class="hljs-comment"># &quot;--template cloudflare-workers&quot; selects the Cloudflare Workers template</span>
deno init --npm hono@latest my-app --template cloudflare-workers
</code></pre>
<h2 id="الوسائط-الشائعة-الاستخدام">الوسائط الشائعة الاستخدام</h2>
<table>
<thead>
<tr>
<th style="text-align:left">الوسيطة (Argument)</th>
<th style="text-align:left">الوصف (Description)</th>
<th style="text-align:left">المثال (Example)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>--template &lt;template&gt;</code></td>
<td style="text-align:left">حدد قالب بداية وتخطَّ مطالبة القالب التفاعلية. قد تتضمن القوالب أسماء مثل <code>bun</code>, <code>cloudflare-workers</code>, <code>vercel</code>، إلخ.</td>
<td style="text-align:left"><code>--template cloudflare-workers</code></td>
</tr>
<tr>
<td style="text-align:left"><code>--install</code></td>
<td style="text-align:left">تثبيت التبعيات تلقائيًا بعد إنشاء القالب.</td>
<td style="text-align:left"><code>--install</code></td>
</tr>
<tr>
<td style="text-align:left"><code>--pm &lt;packageManager&gt;</code></td>
<td style="text-align:left">حدد مدير الحزم الذي سيتم تشغيله عند تثبيت التبعيات. القيم الشائعة: <code>npm</code>, <code>pnpm</code>, <code>yarn</code>.</td>
<td style="text-align:left"><code>--pm pnpm</code></td>
</tr>
<tr>
<td style="text-align:left"><code>--offline</code></td>
<td style="text-align:left">استخدام ذاكرة التخزين المؤقت/القوالب المحلية بدلًا من جلب أحدث القوالب البعيدة. مفيد للبيئات غير المتصلة بالإنترنت أو للتشغيلات المحلية الحتمية (deterministic).</td>
<td style="text-align:left"><code>--offline</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p>[!NOTE]
المجموعة الدقيقة من القوالب (templates) والخيارات المتاحة تتم صيانتها بواسطة <code>create-hono</code> مشروع. تلخص صفحة التوثيق هذه العلامات (flags) الأكثر استخدامًا — راجع المستودع المرتبط أدناه للحصول على المرجع الكامل والموثوق.</p>
</blockquote>
<h2 id="أمثلة-على-التدفقات">أمثلة على التدفقات</h2>
<h3 id="بسيط-وتفاعلي">بسيط وتفاعلي</h3>
<pre><code class="language-bash">npm create hono@latest my-app
</code></pre>
<p>سيسألك هذا عن القَالَب والخيارات.</p>
<h3 id="غير-تفاعلي-اختر-القالب-template-ومدير-الحزم-package-manager">غير تفاعلي، اختر القالب (template) ومدير الحزم (package manager)</h3>
<pre><code class="language-bash">npm create hono@latest my-app -- --template vercel --pm npm --install
</code></pre>
<p>يُنشئ هذا <code>my-app</code> باستخدام <code>vercel</code> القالب، يثبّت التبعيات باستخدام <code>npm</code>، ويتخطى المطالبات التفاعلية.</p>
<h3 id="استخدام-التخزين-المؤقت-دون-اتصال-بدون-شبكة">استخدام التخزين المؤقت دون اتصال (بدون شبكة)</h3>
<pre><code class="language-bash">pnpm create hono@latest my-app --template deno --offline
</code></pre>
<h2 id="استكشاف-الأخطاء-وإصلاحها-ونصائح">استكشاف الأخطاء وإصلاحها ونصائح</h2>
<ul>
<li>إذا بدا أن أحد الخيارات غير معروف، فتأكد من أنك تمرّره باستخدام <code>--</code> عند استخدام <code>npm create</code> / <code>npx</code> .</li>
<li>للاطلاع على أحدث قائمة بالقوالب (templates) والأعلام (flags)، راجع <code>create-hono</code> المستودع (repository) أو شغّل أداة التهيئة (initializer) محليًا واتبع مخرجات المساعدة الخاصة بها.</li>
</ul>
<h2 id="روابط-ومراجع">روابط ومراجع</h2>
<ul>
<li><code>create-hono</code> المستودع: <a href="https://github.com/honojs/create-hono"><code>create-hono</code></a></li>
</ul>
`,d={book:e,chapter:t,chapterTitle:o,slug:n,title:a,headings:l,html:c};export{e as book,t as chapter,o as chapterTitle,d as default,l as headings,c as html,n as slug,a as title};
