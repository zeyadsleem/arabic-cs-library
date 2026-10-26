const s="kinney",a="tailwind",n="Tailwind CSS",t="starting-style",l="بداية الأنماط (@starting-style)",p=[{depth:2,id:"المشكلة",text:"المشكلة"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"استخدام-مبدل-starting",text:"استخدام مُبدّل starting"},{depth:2,id:"الأنماط-الشائعة",text:"الأنماط الشائعة"},{depth:2,id:"مع-انتقالات-العرض",text:"مع انتقالات العرض"},{depth:2,id:"دعم-المتصفحات",text:"دعم المتصفحات"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"}],e=`<p>يتيح مُبدّل <code>starting</code> (جديد في Tailwind 4) حركات سلسة عندما تظهر العناصر أول مرة أو تنتقل من <code>display: none</code>.</p>
<h2 id="المشكلة">المشكلة</h2>
<p>لا تعمل انتقالات CSS عند التصيير الأول أو عند التبديل من <code>display: none</code>، لأن المتصفح يحتاج حالتين ينتقل بينهما.</p>
<pre><code class="language-css"><span class="hljs-comment">/* Won&#x27;t animate on first appearance */</span>
<span class="hljs-selector-class">.modal</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">0.3s</span>;
}
</code></pre>
<h2 id="الحل">الحل</h2>
<p>تُعرّف قاعدة CSS <code>@starting-style</code> الأنماط الأولية للتصيير الأول:</p>
<pre><code class="language-css"><span class="hljs-selector-class">.modal</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">0.3s</span>;
}

<span class="hljs-keyword">@starting-style</span> {
  <span class="hljs-selector-class">.modal</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; <span class="hljs-comment">/* Starting state */</span>
  }
}
</code></pre>
<h2 id="استخدام-مبدل-starting">استخدام مُبدّل <code>starting</code></h2>
<p>يلفّ Tailwind الأصناف المساعِدة داخل <code>@starting-style</code> تلقائيًا:</p>
<p><em>استخدام مُبدّل starting — المثال 1 — <a href="https://stevekinney.com/generated/playgrounds/7a732a7546ca055b25a4cb861ddfa5fd502e6e531421a38cfc4407658980a7fc.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-comment">&lt;!-- Fade in on appearance --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;opacity-100 transition-opacity duration-300 starting:opacity-0&quot;</span>&gt;</span>Fades in smoothly<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Slide and fade --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;translate-y-0 opacity-100 transition-all duration-300 starting:translate-y-4 starting:opacity-0&quot;</span>
&gt;</span>
  Slides up while fading in
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<h2 id="الأنماط-الشائعة">الأنماط الشائعة</h2>
<p><strong>مربّعات الحوار (modals):</strong></p>
<p><em>الأنماط الشائعة — المثال 2 — <a href="https://stevekinney.com/generated/playgrounds/7fea11cce421fae0fd797cad5d7d3966ded8b14bc99203bb7df9296f06c5daa4.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span>
  <span class="hljs-attr">open</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;scale-100 opacity-100 transition-all duration-200 starting:scale-95 starting:opacity-0&quot;</span>
&gt;</span>
  Modal content (open so the starting state can be inspected)
<span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
</code></pre>
<p><strong>إشعارات التنبيه (toasts):</strong></p>
<p><em>الأنماط الشائعة — المثال 3 — <a href="https://stevekinney.com/generated/playgrounds/4420e2fff3d8f073d49279500119a9d65db1f9cb88ad70c4194c604d62432100.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;translate-x-0 transition-transform duration-300 starting:translate-x-full&quot;</span>&gt;</span>
  Slides in from right
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p><strong>القوائم المنسدلة (dropdowns):</strong></p>
<p><em>الأنماط الشائعة — المثال 4 — <a href="https://stevekinney.com/generated/playgrounds/463f1809ec9bf780467b2e33c395fda67e1940f90c38f0634a1818324eba1d18.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;translate-y-0 opacity-100 transition-all duration-150 starting:-translate-y-2 starting:opacity-0&quot;</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Menu item<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<h2 id="مع-انتقالات-العرض">مع انتقالات العرض</h2>
<p>فعّل الانتقالات عند تغيّرات الخاصية <code>display</code>:</p>
<p><em>مع انتقالات العرض — المثال 5 — <a href="https://stevekinney.com/generated/playgrounds/c045102f9c6b8f87860169d9b79b5927b94617b92ceb5f29dec7f1c335da1f3b.html">افتح المثال</a></em></p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">details</span> <span class="hljs-attr">open</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;transition-[display,opacity] duration-300 starting:opacity-0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">summary</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cursor-pointer font-medium&quot;</span>&gt;</span>Toggle the displayed content<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mt-2&quot;</span>&gt;</span>Native details provides the visible and hidden states.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
</code></pre>
<p><strong>ملاحظة:</strong> يتطلّب <code>transition-behavior: allow-discrete</code> (وهو مُضمَّن عندما تستخدم <code>transition-[display]</code>).</p>
<h2 id="دعم-المتصفحات">دعم المتصفحات</h2>
<ul>
<li>Chrome/Edge 117+</li>
<li>Firefox 129+</li>
<li>Safari 17.5+</li>
</ul>
<p>دائمًا قدّم بدائل احتياطية غير متحرّكة للمتصفحات غير المدعومة.</p>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<ol>
<li>اجعل الحركات خفيفة وسريعة (150-300ms)</li>
<li>استخدمه مع مُبدّلات <code>motion-reduce:</code> لإتاحة الوصول</li>
<li>اختبره في المتصفحات غير المدعومة</li>
<li>اجمعه مع JavaScript للحصول على حركات الخروج (غير مدعومة في CSS حتى الآن)</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
