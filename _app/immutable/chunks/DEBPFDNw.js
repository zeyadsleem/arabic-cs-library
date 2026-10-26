const o="kinney",t="storybook",s="بناء أنظمة التصميم في Storybook",r="mdx",n="استخدام Storybook مع MDX",e=[{depth:2,id:"كتل-التوثيق",text:"كتل التوثيق"}],a=`<p>تتيح لك Storybook توثيق المكوّنات باستخدام <a href="https://mdxjs.com/">MDX</a>، وهو أساسًا Markdown + JSX فقط.</p>
<p>وهذا يتيح <em>قدرًا كبيرًا</em> من المرونة في كيفية عرضك للمكوّنات والقصص وأدوات التحكم—والتوثيق بالطبع.</p>
<blockquote>
<p><strong>Storybook وMDX يدعم React فقط.</strong></p>
<p>يمكن أن تكون مكوّناتك وقصصك بأي إطار عمل تدعمه Storybook، لكن ملفات MDX لديك ستستخدم React.</p>
</blockquote>
<p>افتراضيًا، سيلتقط MDX أي ملفات <code>.mdx</code> في مشروعك. لكن <em>يمكنك</em> تهيئته إن أردت.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">StorybookConfig</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/react-vite&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">StorybookConfig</span> = {
  <span class="hljs-comment">/**
   * Change the setting below if you want to be a bit more specific
   * about where you want Storybook to go looking for MDX files.
   */</span>
  <span class="hljs-attr">stories</span>: [<span class="hljs-string">&#x27;../src/**/*.mdx&#x27;</span>, <span class="hljs-string">&#x27;../src/**/*.stories.@(js|jsx|mjs|ts|tsx)&#x27;</span>],
  <span class="hljs-comment">// The rest of your configuration…</span>
};
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> config;
</code></pre>
<p>لنبدأ بشيء بسيط فقط لنوضّح كيف يعمل MDX، ثم ندخل في بعض الحيل الأكثر تحديدًا المتعلقة بـ Storybook. لننشئ <code>src/components/button/button.mdx</code>.</p>
<pre><code class="language-mdx">import { Button } from './button';

# Component System

Welcome to our dope component library. This is a collection of components that we use in our projects. We hope you find them useful.

&lt;Button&gt;Wow, a button!&lt;/Button&gt;
</code></pre>
<p><img src="/arabic-cs-library/images/kinney/b538d7878f197348.webp" alt="صفحة توثيق MDX أساسية في Storybook"></p>
<h2 id="كتل-التوثيق">كتل التوثيق</h2>
<p>القوة <em>الحقيقية</em>—أو القوة المتعلقة بـ Storybook على الأقل—تأتي من خلط <code>@storybook/blocks</code> في توثيقك. وتتيح لك كتل التوثيق أخذ أجزاء من القصص التي نعمل عليها حتى الآن ودمجها في نثرك.</p>
<pre><code class="language-mdx">import { Meta, Title, Primary, Controls, Story } from '@storybook/blocks';
import * as ButtonStories from './button.stories';

&lt;Meta of={ButtonStories} /&gt;

&lt;Title&gt;Button&lt;/Title&gt;

A button is a thing that you press in order to make stuff happen.

&lt;Primary /&gt;

## Controls

Buttons have lots of little things that you can tweak about them.

&lt;Controls /&gt;
</code></pre>
<p>لنتحدث عمّا يجري هنا:</p>
<ul>
<li>نستورد كل الصادرات من قصص زرنا.</li>
<li>نستورد كتلة <code>Meta</code> من <code>@storybook/blocks</code> لربط توثيقنا بمكوّننا.</li>
<li>كتلة <code>Primary</code> تصيّر أول قصة معرَّفة في ملف <code>button.stories.tsx</code> لدينا. ومن قبيل المصادفة البحتة أن أول تصدير لدي <em>أيضًا</em> اسمه <strong>Primary</strong>.</li>
<li>هناك بعض النثر الإضافي ثم نعيد تصيير <code>Controls</code>، وهو مماثل لما رأيناه حتى الآن.</li>
</ul>
<p><img src="/arabic-cs-library/images/kinney/512f75e347b95e68.webp" alt="توثيق مكوّن الزر مصيَّر في MDX"></p>
`,l={book:o,chapter:t,chapterTitle:s,slug:"mdx",title:n,headings:e,html:a};export{o as book,t as chapter,s as chapterTitle,l as default,e as headings,a as html,r as slug,n as title};
