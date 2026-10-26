const s="kinney",n="storybook",a="بناء أنظمة التصميم في Storybook",t="adding-a-size-variant",o="إضافة متغيّر الحجم باستخدام CVA",p=[],e=`<p>في <a href="https://stevekinney.com/courses/storybook/class-variance-authority">القسم السابق</a>، نظرنا في استخدام <a href="https://cva.style/">Class Variance Authority</a> لتطبيق أصناف Tailwind المساعدة برمجيًا بناءً على الخصائص (props) المُمرَّرة. والآن نريد أن نفعل ذلك للنمط (style) أيضًا.</p>
<p>الخطوة الأولى هي إضافة متغيّر آخر.</p>
<pre><code class="language-diff"><span class="hljs-meta">@@ -52,9 +52,15 @@</span> export const variants = cva(
           &#x27;active:bg-danger-400&#x27;,
         ],
       },
<span class="hljs-addition">+      size: {</span>
<span class="hljs-addition">+        small: [&#x27;text-sm&#x27;, &#x27;px-2&#x27;, &#x27;py-1&#x27;],</span>
<span class="hljs-addition">+        medium: [&#x27;text-sm&#x27;, &#x27;px-2.5&#x27;, &#x27;py-1.5&#x27;],</span>
<span class="hljs-addition">+        large: [&#x27;text-sm&#x27;, &#x27;px-3&#x27;, &#x27;py-2&#x27;],</span>
<span class="hljs-addition">+      },</span>
     },
     defaultVariants: {
       variant: &#x27;secondary&#x27;,
<span class="hljs-addition">+      size: &#x27;medium&#x27;,</span>
     },
   },
 );
</code></pre>
<p>بعد ذلك، نستخدمه في مكوّننا.</p>
<pre><code class="language-diff"><span class="hljs-meta">@@ -68,5 +68,5 @@</span> export const variants = cva(
 type ButtonVariants = VariantProps&lt;typeof variants&gt;;

 export const Button = ({ variant = &#x27;primary&#x27;, size = &#x27;medium&#x27;, ...props }: ButtonProps) =&gt; {
<span class="hljs-deletion">-  return &lt;button className={clsx(variants({ variant }), styles[size])} {...props} /&gt;;</span>
<span class="hljs-addition">+  return &lt;button className={clsx(variants({ variant, size }))} {...props} /&gt;;</span>
 };
</code></pre>
<p>وأخيرًا، يمكننا أن نجعل نوعنا أنظف أكثر.</p>
<pre><code class="language-diff"><span class="hljs-meta">@@ -4,10 +4,7 @@</span> import clsx from &#x27;clsx&#x27;;

 import styles from &#x27;./button.module.css&#x27;;

<span class="hljs-deletion">-type ButtonProps = ComponentProps&lt;&#x27;button&#x27;&gt; &amp; {</span>
<span class="hljs-deletion">-  variant?: ButtonVariants[&#x27;variant&#x27;];</span>
<span class="hljs-deletion">-  size?: &#x27;small&#x27; | &#x27;medium&#x27; | &#x27;large&#x27;;</span>
<span class="hljs-deletion">-};</span>
<span class="hljs-addition">+type ButtonProps = ComponentProps&lt;&#x27;button&#x27;&gt; &amp; ButtonVariants;</span>

 export const variants = cva(
   [
</code></pre>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,l as default,p as headings,e as html,t as slug,o as title};
