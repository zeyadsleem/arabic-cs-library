const t="kinney",n="storybook",d="بناء أنظمة التصميم في Storybook",a="adding-dark-mode-to-our-components",r="دعم الوضع الداكن",s=[],e=`<p>هناك عدد من الطرق التي يمكننا بها إضافة الوضع الداكن إلى مكوّننا، لكن لنبدأ بسلوك المسار الأقل مقاومة باستخدام Tailwind، فقد أرسينا الأساس <a href="https://stevekinney.com/courses/storybook/setting-up-tailwind">سابقًا</a>.</p>
<p>يدعم Tailwind أداة مساعدة تُسمّى <code>dark:</code> لا تُفعّل الصنف إلا عندما يبدأ عمل <em>أي شيء</em> اخترناه لتفعيل الوضع الداكن.</p>
<p>فمثلًا، سيطبّق هذا الصنف الثاني إذا وفقط إذا كنا في الوضع الداكن.</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bg-primary-600 dark:bg-primary-500&quot;</span>&gt;</span>Button<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>وفقًا لنظام التصميم لدينا، نستخدم القيم التالية للوضعين الفاتح والداكن.</p>
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
<td><strong>Button / Primary</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الافتراضي</td>
<td>Primary/600</td>
<td>Primary/500</td>
</tr>
<tr>
<td>التحويم</td>
<td>Primary/500</td>
<td>Primary/400</td>
</tr>
<tr>
<td>النشط</td>
<td>Primary/400</td>
<td>Primary/300</td>
</tr>
<tr>
<td>النص</td>
<td>White</td>
<td>White</td>
</tr>
<tr>
<td>الحد</td>
<td>Transparent</td>
<td>Transparent</td>
</tr>
<tr>
<td><strong>Button / Secondary</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الافتراضي</td>
<td>White</td>
<td>Slate/900</td>
</tr>
<tr>
<td>التحويم</td>
<td>Slate/50</td>
<td>Slate/800</td>
</tr>
<tr>
<td>النشط</td>
<td>Slate/100</td>
<td>Slate/700</td>
</tr>
<tr>
<td>النص</td>
<td>Slate/900</td>
<td>White</td>
</tr>
<tr>
<td>الحد</td>
<td>Slate/300</td>
<td>Slate/900</td>
</tr>
<tr>
<td><strong>Button / Destructive</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الافتراضي</td>
<td>Danger/600</td>
<td>Danger/500</td>
</tr>
<tr>
<td>التحويم</td>
<td>Danger/500</td>
<td>Danger/400</td>
</tr>
<tr>
<td>النشط</td>
<td>Danger/400</td>
<td>Danger/300</td>
</tr>
<tr>
<td>النص</td>
<td>White</td>
<td>White</td>
</tr>
<tr>
<td>الحد</td>
<td>Transparent</td>
<td>Transparent</td>
</tr>
<tr>
<td><strong>Button / Ghost</strong></td>
<td></td>
<td></td>
</tr>
<tr>
<td>الافتراضي</td>
<td>Transparent</td>
<td>Transparent</td>
</tr>
<tr>
<td>التحويم</td>
<td>Slate/50</td>
<td>Slate/700</td>
</tr>
<tr>
<td>النشط</td>
<td>Slate/100</td>
<td>Slate/700</td>
</tr>
<tr>
<td>النص</td>
<td>Slate/900</td>
<td>White</td>
</tr>
<tr>
<td>الحد</td>
<td>Transparent</td>
<td>Transparent</td>
</tr>
</tbody>
</table>
<p>لذا، يمكننا تحديث مكوّننا كما يلي:</p>
<pre><code class="language-diff"><span class="hljs-meta">@@ -33,6 +33,9 @@</span> export const variants = cva(
           &#x27;border-transparent&#x27;,
           &#x27;hover:bg-primary-500&#x27;,
           &#x27;active:bg-primary-400&#x27;,
<span class="hljs-addition">+          &#x27;dark:bg-primary-500&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:hover:bg-primary-400&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:active:bg-primary-300&#x27;,</span>
         ],
         secondary: [
           &#x27;bg-white&#x27;,
<span class="hljs-meta">@@ -40,6 +43,11 @@</span> export const variants = cva(
           &#x27;border-slate-300&#x27;,
           &#x27;hover:bg-slate-50&#x27;,
           &#x27;active:bg-slate-100&#x27;,
<span class="hljs-addition">+          &#x27;dark:bg-slate-900&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:text-white&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:border-slate-900&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:hover:bg-slate-800&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:active:bg-slate-700&#x27;,</span>
         ],
         destructive: [
           &#x27;bg-danger-600&#x27;,
<span class="hljs-meta">@@ -47,6 +55,9 @@</span> export const variants = cva(
           &#x27;border-transparent&#x27;,
           &#x27;hover:bg-danger-500&#x27;,
           &#x27;active:bg-danger-400&#x27;,
<span class="hljs-addition">+          &#x27;dark:bg-danger-500&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:hover:bg-danger-400&#x27;,</span>
<span class="hljs-addition">+          &#x27;dark:active:bg-danger-300&#x27;,</span>
         ],
       },
       size: {
</code></pre>
`,o={book:t,chapter:n,chapterTitle:d,slug:a,title:r,headings:s,html:e};export{t as book,n as chapter,d as chapterTitle,o as default,s as headings,e as html,a as slug,r as title};
