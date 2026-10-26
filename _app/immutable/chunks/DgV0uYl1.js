const n="kinney",t="tailwind",e="Tailwind CSS",s="at-property",p="قاعدة @property",l=[{depth:2,id:"ما-هي-property",text:"ما هي @property؟"},{depth:2,id:"كيف-يستخدمها-tailwind",text:"كيف يستخدمها Tailwind"},{depth:2,id:"متطلبات-المتصفح",text:"متطلبات المتصفح"},{depth:2,id:"فروق-جوهرية",text:"فروق جوهرية"},{depth:3,id:"theme-أنت-تستخدم-هذا",text:"@theme (أنت تستخدم هذا)"},{depth:3,id:"property-tailwind-يستخدم-هذا",text:"@property (Tailwind يستخدم هذا)"},{depth:3,id:"متغيرات-root",text:"متغيّرات :root"},{depth:2,id:"الأثر-على-شيفرتك",text:"الأثر على شيفرتك"}],o=`<p>يستخدم Tailwind 4 قاعدة CSS <code>@property</code> داخليًا لتفعيل الميزات الحديثة وتحسينات الأداء.</p>
<h2 id="ما-هي-property">ما هي <code>@property</code>؟</h2>
<p>تسجّل قاعدة <code>@property</code> خصائص CSS المخصّصة مع:</p>
<ul>
<li><strong>تعريف النوع</strong> (طول، لون، رقم، إلخ)</li>
<li><strong>القيمة الأولية</strong></li>
<li><strong>سلوك التوريث</strong></li>
</ul>
<pre><code class="language-scss"><span class="hljs-keyword">@property</span> --my-color {
  syntax: <span class="hljs-string">&#x27;&lt;color&gt;&#x27;</span>;
  initial-value: black;
  inherits: false;
}
</code></pre>
<h2 id="كيف-يستخدمها-tailwind">كيف يستخدمها Tailwind</h2>
<p>يستفيد Tailwind من <code>@property</code> داخليًا من أجل:</p>
<ol>
<li><strong>حركات التدرّجات اللونية</strong> - انتقالات سلسة بين نقاط التدرّج</li>
<li><strong>تحسين الأداء</strong> - خاصةً في الصفحات الكبيرة</li>
<li><strong>خصائص مخصّصة آمنة النوع</strong> - تحسينات أفضل في المتصفح</li>
</ol>
<p>أنت لا تكتب قواعد <code>@property</code> مباشرة - يتولّى Tailwind ذلك في الكواليس.</p>
<h2 id="متطلبات-المتصفح">متطلبات المتصفح</h2>
<p>تعني هذه التبعية أن Tailwind 4 يتطلّب:</p>
<ul>
<li>Safari 16.4+</li>
<li>Chrome 111+</li>
<li>Firefox 128+</li>
</ul>
<p><strong>لا دعم للمتصفحات الأقدم.</strong></p>
<h2 id="فروق-جوهرية">فروق جوهرية</h2>
<h3 id="theme-أنت-تستخدم-هذا"><code>@theme</code> (أنت تستخدم هذا)</h3>
<p>عرّف رموز التصميم التي تولّد الأصناف المساعدة:</p>
<pre><code class="language-scss"><span class="hljs-keyword">@theme</span> {
  <span class="hljs-attr">--color-primary</span>: <span class="hljs-number">#3b82f6</span>;
  <span class="hljs-attr">--spacing-lg</span>: <span class="hljs-number">2rem</span>;
}
</code></pre>
<h3 id="property-tailwind-يستخدم-هذا"><code>@property</code> (Tailwind يستخدم هذا)</h3>
<p>تنفيذ داخلي للإطار يتيح ميزات CSS الحديثة.</p>
<h3 id="متغيرات-root">متغيّرات <code>:root</code></h3>
<p>لا تزال مفيدة لمتغيّرات CSS غير المرتبطة بالأصناف المساعدة:</p>
<pre><code class="language-css"><span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attr">--header-height</span>: <span class="hljs-number">64px</span>; <span class="hljs-comment">/* Won&#x27;t generate utilities */</span>
}
</code></pre>
<h2 id="الأثر-على-شيفرتك">الأثر على شيفرتك</h2>
<p>بينما تعمل <code>@property</code> في الكواليس، فإنك تستفيد من:</p>
<ul>
<li>حركات أكثر سلاسة</li>
<li>أداء أفضل</li>
<li>الوصول إلى قيم السمة كمتغيّرات CSS</li>
<li>ميزات CSS الحديثة التي لم تكن ممكنة من قبل</li>
</ul>
<p>المقايضة: اشتراط متصفحات حديثة، دون دعم لـ IE11 أو المتصفحات القديمة.</p>
`,i={book:n,chapter:t,chapterTitle:e,slug:s,title:p,headings:l,html:o};export{n as book,t as chapter,e as chapterTitle,i as default,l as headings,o as html,s as slug,p as title};
