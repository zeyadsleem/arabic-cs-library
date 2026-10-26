const s="kinney",n="react-typescript",a="React مع TypeScript",e="edge-ssr-and-runtime-types",t="التصيير على الحافة وأنواع بيئات التشغيل",p=[{depth:2,id:"مشكلة-متعدد-عوالم-التشغيل",text:"مشكلة متعدد عوالم التشغيل"}],l=`<p>تعمل تطبيقات React الحديثة في بيئات JavaScript متعددة: المتصفحات، وخوادم Node.js، وبيئات التشغيل الطرفية مثل Cloudflare Workers أو Vercel Edge Functions، وكل ما بينها. لكل بيئة تشغيل واجهاتها الخاصة وقودها الخاص وتعريفات أنواعها الخاصة — لكن شيفرة TypeScript لديك تحتاج إلى العمل عبرها جميعًا. لنستكشف كيف نتنقّل بين هذه الاختلافات، ونكتب شيفرة واعية ببيئة التشغيل، ونحرص على أن تبقى عقود بيانات التصيير من جهة الخادم (SSR) متينة (حتى حين تقرر واجهتك البرمجية أن ترسل لك <code>null</code> بدلًا من كائن المستخدم اللطيف الذي كنت تتوقعه).</p>
<h2 id="مشكلة-متعدد-عوالم-التشغيل">مشكلة متعدد عوالم التشغيل</h2>
<p>عندما تكتب مكوّنات React، فأنت غالبًا ما تستهدف بيئات JavaScript متعددة في الوقت نفسه:</p>
<ul>
<li><strong>المتصفح</strong>: واجهات DOM كاملة، وتصيير في جهة العميل، وتفاعلات المستخدم</li>
<li><strong>Node.js</strong>: تصيير في جهة الخادم، والوصول إلى نظام الملفات، وواجهات Node كاملة</li>
<li><strong>بيئة التشغيل الطرفية</strong>: معزولات V8 خفيفة تحتوي على واجهات الويب لكن بلا واجهات Node.js</li>
<li><strong>وقت البناء</strong>: التوليد الساكن (static generation) أثناء عملية البناء</li>
</ul>
<p>لكل بيئة تشغيل كائنات عامة مختلفة، وواجهات مختلفة، والأهم — تعريفات TypeScript مختلفة. قد يُصيَّر مكوّنك بإتقان في المتصفح لكن يرمي أخطاء أنواع عندما تحاول تصييره على الخادم، أو يعمل بشكل رائع على خادم Node.js لكن يفشل بشكل غامض عند نشره في دالة طرفية.</p>
<p>إليك مثالًا شائعًا لهذا الألم:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ This works in browser but breaks in Node.js</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MyComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [windowSize, setWindowSize] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">width</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>,  <span class="hljs-comment">// ReferenceError: window is not defined</span>
    <span class="hljs-attr">height</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerHeight</span>
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Window size: {windowSize.width}x{windowSize.height}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
`,i={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,i as default,p as headings,l as html,e as slug,t as title};
