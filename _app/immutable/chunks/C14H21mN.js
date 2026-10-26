const s="kinney",n="storybook",a="بناء أنظمة التصميم في Storybook",t="default-args",l="تعيين الوسائط الافتراضية",e=[],o=`<p>الآن، هذا مثير للاهتمام. فإن نظرت عن قرب، سترى أنه ليس لدينا شيء محدَّد من ناحية <code>variant</code> لأي من أحجام الأزرار هذه. وهذا منطقي لأننا لم نضفه كوسيط، وإن ألقيت نظرة على شيفرة مكوّننا، سترى أننا عندما نتردّد نعود افتراضيًا إلى زر أساسي إلا إن قيل لنا غير ذلك—وبالمثل، نعود افتراضيًا إلى زر بمقاس متوسط إن لم تُمرَّر خاصية <code>size</code>.</p>
<p><img src="/arabic-cs-library/images/kinney/f3cf7e9d06b435a1.webp" alt="أداة تحكم إضافية للحالة المعطّلة في Storybook"></p>
<p>يمكننا تعيين بعض الوسائط الافتراضية التي ستعود إليها Storybook ما لم نتجاوزها في قصصنا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Button</span>,
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;medium&#x27;</span>,
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span>,
  },
  <span class="hljs-attr">argTypes</span>: {
    <span class="hljs-attr">disabled</span>: { <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;boolean&#x27;</span> },
  },
};
</code></pre>
<p>سترى الآن أن أزرار الاختيار الصحيحة محدَّدة، وحتى القيمة المنطقية <code>disabled</code> صارت معيَّنة بشكل صحيح. والآن، يمكننا إزالة الكثير من الشيفرة المتكرّرة ونشر الوسائط لنحصل على شيء أنظف قليلًا.</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/src/components/button/button.stories.tsx b/src/components/button/button.stories.tsx</span>
<span class="hljs-comment">index 58228bd..4a09a08 100644</span>
<span class="hljs-comment">--- a/src/components/button/button.stories.tsx</span>
<span class="hljs-comment">+++ b/src/components/button/button.stories.tsx</span>
<span class="hljs-meta">@@ -21,45 +21,36 @@</span> type Story = StoryObj&lt;typeof Button&gt;;

 export const Primary: Story = {
   args: {
<span class="hljs-deletion">-    children: &#x27;Button&#x27;,</span>
     variant: &#x27;primary&#x27;,
<span class="hljs-deletion">-    disabled: false,</span>
   },
 };

 export const Secondary: Story = {
   args: {
<span class="hljs-deletion">-    children: &#x27;Button&#x27;,</span>
     variant: &#x27;secondary&#x27;,
<span class="hljs-deletion">-    disabled: false,</span>
   },
 };

 export const Destructive: Story = {
   args: {
<span class="hljs-deletion">-    children: &#x27;Button&#x27;,</span>
     variant: &#x27;destructive&#x27;,
<span class="hljs-deletion">-    disabled: false,</span>
   },
 };

 export const Small: Story = {
   args: {
<span class="hljs-deletion">-    children: &#x27;Button&#x27;,</span>
     size: &#x27;small&#x27;,
   },
 };

 export const Medium: Story = {
   args: {
<span class="hljs-deletion">-    children: &#x27;Button&#x27;,</span>
     size: &#x27;medium&#x27;,
   },
 };

 export const Large: Story = {
   args: {
<span class="hljs-deletion">-    children: &#x27;Button&#x27;,</span>
     size: &#x27;large&#x27;,
   },
 };
</code></pre>
<p>يمكنك أن تحتجّ بأنه يمكننا، بل ينبغي لنا على الأرجح، أن نتخلّص من قصة مخصّصة لكل مقاس، وأنا على الأرجح لن أقدّم حجة مضادة.</p>
`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:o};export{s as book,n as chapter,a as chapterTitle,p as default,e as headings,o as html,t as slug,l as title};
