const s="kinney",n="storybook",t="بناء أنظمة التصميم في Storybook",a="callout-component-exercise",l="تنفيذ مكوّن Callout",p=[{depth:2,id:"الألوان",text:"الألوان"},{depth:3,id:"ملاحظات-تذوق-أخرى",text:"ملاحظات تذوّق أخرى"},{depth:2,id:"بعض-الشيفرة-الابتدائية",text:"بعض الشيفرة الابتدائية"}],d=`<p>حسنًا، جاء دورك لتجربة هذا. تأمّل <a href="https://www.figma.com/file/Qhb4PJucNK8bgvf4N65Jrm/Anthology?type=design&amp;node-id=2-2372&amp;mode=design">مكوّن Callout</a>. وتأمّل ما يلي. ويمكنك أن تختار تجاهل كونها بأيقونات مختلفة إن أردت.</p>
<p><img src="/arabic-cs-library/images/kinney/4e82532f86431ad7.webp" alt="تصميمات مكوّن Callout"></p>
<h2 id="الألوان">الألوان</h2>
<p>يستخدم مكوّن Callout الألوان التالية من سمتنا.</p>
<table>
<thead>
<tr>
<th>الاسم</th>
<th>الفاتح</th>
<th>الداكن</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Callout / Primary</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الخلفية</td>
<td>Primary/200</td>
<td>Primary/800</td>
</tr>
<tr>
<td>الحد</td>
<td>Primary/500</td>
<td>Primary/900</td>
</tr>
<tr>
<td>النص</td>
<td>Primary/900</td>
<td>Primary/50</td>
</tr>
<tr>
<td><strong>Callout / Information</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الخلفية</td>
<td>Information/200</td>
<td>Information/800</td>
</tr>
<tr>
<td>الحد</td>
<td>Information/500</td>
<td>Information/500</td>
</tr>
<tr>
<td>النص</td>
<td>Information/900</td>
<td>Information/50</td>
</tr>
<tr>
<td><strong>Callout / Success</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الخلفية</td>
<td>Success/200</td>
<td>Success/800</td>
</tr>
<tr>
<td>الحد</td>
<td>Success/500</td>
<td>Success/900</td>
</tr>
<tr>
<td>النص</td>
<td>Success/900</td>
<td>Success/50</td>
</tr>
<tr>
<td><strong>Callout / Warning</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الخلفية</td>
<td>Warning/200</td>
<td>Warning/800</td>
</tr>
<tr>
<td>الحد</td>
<td>Warning/500</td>
<td>Warning/900</td>
</tr>
<tr>
<td>النص</td>
<td>Warning/900</td>
<td>Warning/50</td>
</tr>
<tr>
<td><strong>Callout / Danger</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الخلفية</td>
<td>Danger/200</td>
<td>Danger/800</td>
</tr>
<tr>
<td>الحد</td>
<td>Danger/500</td>
<td>Danger/900</td>
</tr>
<tr>
<td>النص</td>
<td>Danger/900</td>
<td>Danger/50</td>
</tr>
<tr>
<td><strong>Callout / Default</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الخلفية</td>
<td>Slate/200</td>
<td>Slate/800</td>
</tr>
<tr>
<td>الحد</td>
<td>Slate/500</td>
<td>Slate/900</td>
</tr>
<tr>
<td>النص</td>
<td>Slate/900</td>
<td>Slate/50</td>
</tr>
</tbody>
</table>
<h3 id="ملاحظات-تذوق-أخرى">ملاحظات تذوّق أخرى</h3>
<ul>
<li>الخطوط هي الخط الأساسي، لكن عنوان مكوّن Callout بوزن شبه عريض.</li>
<li>الزوايا مستديرة باستخدام صنف <code>rounded</code> في Tailwind.</li>
</ul>
<h2 id="بعض-الشيفرة-الابتدائية">بعض الشيفرة الابتدائية</h2>
<p>إليك بعض الشيفرة لتبدأ إن كان ذلك مفيدًا. لنبدأ بالمكوّن.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">PropsWithChildren</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { cva, <span class="hljs-keyword">type</span> <span class="hljs-title class_">VariantProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;class-variance-authority&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">CalloutProps</span> = <span class="hljs-title class_">PropsWithChildren</span>&lt;{ <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span> }&gt; &amp; <span class="hljs-title class_">VariantProps</span>&lt;<span class="hljs-keyword">typeof</span> variants&gt;;

<span class="hljs-keyword">const</span> variants = <span class="hljs-title function_">cva</span>([<span class="hljs-string">&#x27;p-4&#x27;</span>, <span class="hljs-string">&#x27;rounded&#x27;</span>, <span class="hljs-string">&#x27;border&#x27;</span>, <span class="hljs-string">&#x27;shadow-md&#x27;</span>, <span class="hljs-string">&#x27;space-y-4&#x27;</span>]);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">Callout</span> = (<span class="hljs-params">{ title, children }: <span class="hljs-title class_">CalloutProps</span></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{variants({})}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-semibold&quot;</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);
</code></pre>
<p>والآن للقصة (يُفضّل في <code>src/components/callout/callout.stores.tsx</code>):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Meta</span>, <span class="hljs-title class_">StoryObj</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@storybook/react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Callout</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./callout&#x27;</span>;

<span class="hljs-keyword">const</span> meta = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Components/Callout&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Callout</span>,
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;An Important Message&#x27;</span>,
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;This is a message that you should read.&#x27;</span>,
  },
} <span class="hljs-keyword">satisfies</span> <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Callout</span>&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> meta;
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Story</span> = <span class="hljs-title class_">StoryObj</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Callout</span>&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Default</span>: <span class="hljs-title class_">Story</span> = {};
</code></pre>
<blockquote>
<p><strong>الحل</strong></p>
<p>بعد أن تسنح لك الفرصة لتنفيذ هذا المكوّن وكتابة قصة، سننظر في حل ممكن <a href="https://stevekinney.com/courses/storybook/callout-component-solution">هنا</a>.</p>
</blockquote>
`,r={book:s,chapter:n,chapterTitle:t,slug:a,title:l,headings:p,html:d};export{s as book,n as chapter,t as chapterTitle,r as default,p as headings,d as html,a as slug,l as title};
