const o="kinney",t="storybook",n="بناء أنظمة التصميم في Storybook",s="naming-and-hierarchy",e="تنظيم القصص والتوثيق",a=[{depth:2,id:"النتيجة",text:"النتيجة"}],c=`<p>إن نظرت إلى شريطنا الجانبي، فهو <em>بالفعل</em> صار غير منظّم قليلًا. ولحسن الحظ، من السهل جدًا إدخال قدر من التنظيم على مكوّناتنا. وتستخدم Storybook طريقة تسمية مكوّناتنا لتكوين نوع من التسلسل الهرمي.</p>
<p>فمثلًا، إن سمّيت مكوّنًا <code>Components/Button</code>، فسيضع قصة <code>Button</code> لديك تحت قسم <code>Components</code>. هيا نجرّب ما يلي.</p>
<p>في <code>src/colors.mdx</code>:</p>
<pre><code class="language-diff"><span class="hljs-meta">@@ -2,7 +2,7 @@</span> import { Meta, ColorPalette, ColorItem } from &#x27;@storybook/blocks&#x27;;
 import colors from &#x27;tailwindcss/colors&#x27;;
 import config from &#x27;../tailwind.config&#x27;;

<span class="hljs-deletion">-&lt;Meta title=&quot;Colors&quot; /&gt;</span>
<span class="hljs-addition">+&lt;Meta title=&quot;Tokens/Colors&quot; /&gt;</span>

 ## Brand Colors
</code></pre>
<p>في <code>src/components/button/button.stories.tsx</code>:</p>
<pre><code class="language-diff"><span class="hljs-meta">@@ -3,7 +3,7 @@</span> import type { Meta, StoryObj } from &#x27;@storybook/react&#x27;;
 import { Button } from &#x27;./button&#x27;;

 const meta = {
<span class="hljs-deletion">-  title: &#x27;Button&#x27;,</span>
<span class="hljs-addition">+  title: &#x27;Components/Button&#x27;,</span>
   component: Button,
   args: {
     children: &#x27;Button&#x27;,
</code></pre>
<p>في <code>src/icons.mdx</code>:</p>
<pre><code class="language-diff"><span class="hljs-meta">@@ -1,7 +1,7 @@</span>
 import { Meta, Title, IconGallery, IconItem } from &#x27;@storybook/blocks&#x27;;
 import { icons, Icon } from &#x27;./components/icon&#x27;;

<span class="hljs-deletion">-&lt;Meta title=&quot;Icons&quot; /&gt;</span>
<span class="hljs-addition">+&lt;Meta title=&quot;Tokens/Icons&quot; /&gt;</span>

 &lt;Title&gt;Icons&lt;/Title&gt;
</code></pre>
<h2 id="النتيجة">النتيجة</h2>
<p>ينبغي أن نعيش الآن في عالم أكثر نظامًا بكثير.</p>
<p><img src="/arabic-cs-library/images/kinney/104a990d309d86f0.webp" alt="مكوّنات Storybook مرتّبة بشكل جميل"></p>
`,l={book:o,chapter:t,chapterTitle:n,slug:s,title:e,headings:a,html:c};export{o as book,t as chapter,n as chapterTitle,l as default,a as headings,c as html,s as slug,e as title};
