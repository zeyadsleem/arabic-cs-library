const e="hono",r="concepts",t="المفاهيم",s="routers",n="الموجِّهات",o=[{depth:2,id:"regexprouter",text:"RegExpRouter"},{depth:2,id:"trierouter",text:"TrieRouter"},{depth:2,id:"smartrouter",text:"SmartRouter"},{depth:2,id:"linearrouter",text:"LinearRouter"},{depth:2,id:"patternrouter",text:"PatternRouter"}],a=`<p>تُعدّ الموجِّهات (routers) أهم ميزات Hono.</p>
<p>يمتلك Hono خمسة موجّهات.</p>
<h2 id="regexprouter">RegExpRouter</h2>
<p><strong>RegExpRouter</strong> هو أسرع موجِّه (router) في عالم JavaScript.</p>
<p>على الرغم من أن هذا يُسمى &quot;RegExp&quot;، إلا أنه ليس تنفيذًا شبيهًا بـ Express يستخدم <a href="https://github.com/pillarjs/path-to-regexp"><code>path-to-regexp</code></a>.
إنها تستخدم حلقات خطية.
لذلك، سيتم إجراء مطابقة التعبيرات النمطية (regular expression) لجميع المسارات وستتدهور الأداء كلما زاد عدد المسارات لديك.</p>
<p><img src="/arabic-cs-library/images/hono/router-linear.jpg" alt=""></p>
<p>يحوّل RegExpRouter الخاص بـ Hono نمط المسار إلى &quot;تعبير نمطي (regular expression) واحد كبير&quot;.
ثم يمكنه الحصول على النتيجة بمطابقة لمرة واحدة.</p>
<p><img src="/arabic-cs-library/images/hono/router-regexp.jpg" alt=""></p>
<p>يعمل هذا بشكل أسرع من الطرق التي تستخدم خوارزميات قائمة على الأشجار مثل radix-tree في معظم الحالات.</p>
<p>ومع ذلك، لا يدعم RegExpRouter جميع أنماط التوجيه، لذا يُستخدم عادةً مع أحد الموجهات الأخرى أدناه التي تدعم جميع أنماط التوجيه.</p>
<h2 id="trierouter">TrieRouter</h2>
<p><strong>TrieRouter</strong> هو الموجِّه (router) الذي يستخدم خوارزمية شجرة Trie.
مثل RegExpRouter، فإنه لا يستخدم حلقات خطية.</p>
<p><img src="/arabic-cs-library/images/hono/router-tree.jpg" alt=""></p>
<p>هذا الموجّه ليس بنفس سرعة RegExpRouter، لكنه أسرع بكثير من موجّه Express.
يدعم الموجّه TrieRouter جميع الأنماط.</p>
<h2 id="smartrouter">SmartRouter</h2>
<p><strong>SmartRouter</strong> مفيد عندما تستخدم عدة موجهات (routers). يختار أفضل موجه عن طريق الاستدلال من الموجهات المسجلة.
يستخدم Hono SmartRouter وRegExpRouter وTrieRouter افتراضياً:</p>
<pre><code class="language-ts"><span class="hljs-comment">// Inside the core of Hono.</span>
<span class="hljs-keyword">readonly</span> <span class="hljs-attr">defaultRouter</span>: <span class="hljs-title class_">Router</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">SmartRouter</span>({
  <span class="hljs-attr">routers</span>: [<span class="hljs-keyword">new</span> <span class="hljs-title class_">RegExpRouter</span>(), <span class="hljs-keyword">new</span> <span class="hljs-title class_">TrieRouter</span>()],
})
</code></pre>
<p>عند بدء تشغيل التطبيق، يكتشف SmartRouter أسرع موجّه بناءً على التوجيه ويستمر في استخدامه.</p>
<h2 id="linearrouter">LinearRouter</h2>
<p>RegExpRouter سريع، لكن مرحلة تسجيل المسارات قد تكون بطيئة بعض الشيء.
لذا، فهو غير مناسب لبيئة تتم تهيئتها مع كل طلب.</p>
<p><strong>LinearRouter</strong> مُحسَّن لحالات &quot;المرة الواحدة&quot; (one shot).
تسجيل المسار أسرع بشكل ملحوظ من RegExpRouter لأنه يضيف المسار دون تجميع السلاسل، باستخدام نهج خطي.</p>
<p>فيما يلي إحدى نتائج الاختبارات المعيارية (benchmark)، والتي تتضمن مرحلة تسجيل المسارات.</p>
<pre><code class="language-console">• GET /user/lookup/username/hey
----------------------------------------------------- -----------------------------
LinearRouter     1.82 µs/iter      (1.7 µs … 2.04 µs)   1.84 µs   2.04 µs   2.04 µs
MedleyRouter     4.44 µs/iter     (4.34 µs … 4.54 µs)   4.48 µs   4.54 µs   4.54 µs
FindMyWay       60.36 µs/iter      (45.5 µs … 1.9 ms)  59.88 µs  78.13 µs  82.92 µs
KoaTreeRouter    3.81 µs/iter     (3.73 µs … 3.87 µs)   3.84 µs   3.87 µs   3.87 µs
TrekRouter       5.84 µs/iter     (5.75 µs … 6.04 µs)   5.86 µs   6.04 µs   6.04 µs

summary for GET /user/lookup/username/hey
  LinearRouter
   2.1x faster than KoaTreeRouter
   2.45x faster than MedleyRouter
   3.21x faster than TrekRouter
   33.24x faster than FindMyWay
</code></pre>
<h2 id="patternrouter">PatternRouter</h2>
<p><strong>PatternRouter</strong> هو أصغر موجِّه (router) بين موجِّهات Hono.</p>
<p>بينما Hono مضغوط بالفعل، إذا كنت بحاجة إلى جعله أصغر حتى لبيئة ذات موارد محدودة، استخدم PatternRouter.</p>
<p>التطبيق الذي يستخدم PatternRouter فقط حجمه أقل من 15KB.</p>
<pre><code class="language-console"><span class="hljs-meta prompt_">$ </span><span class="language-bash">npx wrangler deploy --minify ./src/index.ts</span>
 ⛅️ wrangler 3.20.0
-------------------
Total Upload: 14.68 KiB / gzip: 5.38 KiB
</code></pre>
`,p={book:e,chapter:r,chapterTitle:t,slug:s,title:n,headings:o,html:a};export{e as book,r as chapter,t as chapterTitle,p as default,o as headings,a as html,s as slug,n as title};
