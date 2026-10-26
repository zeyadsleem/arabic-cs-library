const s="kinney",n="storybook",a="بناء أنظمة التصميم في Storybook",t="play-functions",l="دوال التشغيل (Play Functions)",p=[{depth:2,id:"الوصول-إلى-الوسائط",text:"الوصول إلى الوسائط"}],e=`<p>تأمّل منطقة النص هذه لحظة.</p>
<p><img src="/arabic-cs-library/images/kinney/15e7f6cac986241d.webp" alt="مكوّن منطقة النص"></p>
<p>إذا مُرِّرت خاصية <code>maxLength</code>، فعندئذ نعرض عدد الأحرف في الأسفل. بل إن لديها ميزة إضافية: سنضيف تنسيقًا إلى منطقة النص في حال تجاوز المستخدم عدد الأحرف.</p>
<p><img src="/arabic-cs-library/images/kinney/cfc21e8060607e4c.webp" alt="منطقة نص غير صالحة"></p>
<p>وما نودّ فعله هو التحقق من هذه الحالة. أفترض أنه يمكننا الغش بأن تكون لدينا قصص تضعها في كل حالة، لكن هذا يعيبه أننا نحتاج إلى التأكد من النظر إلى القصة في كل مرة نعدّل فيها المكوّن.</p>
<p>بدلًا من ذلك، يمكننا استخدام دالة <strong>Play</strong> لمحاكاة تفاعل مستخدم.</p>
<p>لنبدأ بكتابة قصة تتحقق مما إذا كان عدّ الطول يعمل أصلًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">MaxLength</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">maxLength</span>: <span class="hljs-number">140</span>,
  },
  <span class="hljs-attr">play</span>: <span class="hljs-title function_">async</span> ({ canvasElement }) =&gt; {
    <span class="hljs-keyword">const</span> canvas = <span class="hljs-title function_">within</span>(canvasElement);
    <span class="hljs-keyword">const</span> textArea = canvas.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;textbox&#x27;</span>);
    <span class="hljs-keyword">const</span> count = canvas.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;length&#x27;</span>);

    <span class="hljs-keyword">const</span> inputValue = <span class="hljs-string">&#x27;Hello, world!&#x27;</span>;

    userEvent.<span class="hljs-title function_">type</span>(textArea, inputValue);
    <span class="hljs-title function_">expect</span>(count).<span class="hljs-title function_">toHaveTextContent</span>(inputValue.<span class="hljs-property">length</span>.<span class="hljs-title function_">toString</span>());
  },
};
</code></pre>
<h2 id="الوصول-إلى-الوسائط">الوصول إلى الوسائط</h2>
<p>بل إن لدينا وصولًا إلى <code>args</code>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">LengthTooLong</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">maxLength</span>: <span class="hljs-number">140</span>,
  },
  <span class="hljs-attr">play</span>: <span class="hljs-title function_">async</span> ({ canvasElement, args }) =&gt; {
    <span class="hljs-keyword">const</span> canvas = <span class="hljs-title function_">within</span>(canvasElement);
    <span class="hljs-keyword">const</span> textArea = canvas.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;textbox&#x27;</span>);
    <span class="hljs-keyword">const</span> count = canvas.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;length&#x27;</span>);

    <span class="hljs-keyword">const</span> inputValue = <span class="hljs-string">&#x27;H&#x27;</span> + <span class="hljs-string">&#x27;e&#x27;</span>.<span class="hljs-title function_">repeat</span>(<span class="hljs-number">140</span>) + <span class="hljs-string">&#x27;y!&#x27;</span>;

    <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">type</span>(textArea, inputValue);
    <span class="hljs-title function_">expect</span>(count).<span class="hljs-title function_">toHaveTextContent</span>(inputValue.<span class="hljs-property">length</span>.<span class="hljs-title function_">toString</span>());
  },
};
</code></pre>
<p>يمكننا حتى توسيع هذا للتحقق من أشياء مثل الأصناف أو الأنماط أو خصائص إمكانية الوصول.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">LengthTooLong</span>: <span class="hljs-title class_">Story</span> = {
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">maxLength</span>: <span class="hljs-number">140</span>,
  },
  <span class="hljs-attr">play</span>: <span class="hljs-title function_">async</span> ({ canvasElement, args }) =&gt; {
    <span class="hljs-keyword">const</span> canvas = <span class="hljs-title function_">within</span>(canvasElement);
    <span class="hljs-keyword">const</span> textArea = canvas.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;textbox&#x27;</span>);
    <span class="hljs-keyword">const</span> count = canvas.<span class="hljs-title function_">getByTestId</span>(<span class="hljs-string">&#x27;length&#x27;</span>);

    <span class="hljs-keyword">const</span> inputValue = <span class="hljs-string">&#x27;H&#x27;</span> + <span class="hljs-string">&#x27;e&#x27;</span>.<span class="hljs-title function_">repeat</span>(args.<span class="hljs-property">maxLength</span> || <span class="hljs-number">140</span>) + <span class="hljs-string">&#x27;y!&#x27;</span>;

    <span class="hljs-keyword">await</span> userEvent.<span class="hljs-title function_">type</span>(textArea, inputValue);

    <span class="hljs-title function_">expect</span>(count).<span class="hljs-title function_">toHaveTextContent</span>(inputValue.<span class="hljs-property">length</span>.<span class="hljs-title function_">toString</span>());
    <span class="hljs-title function_">expect</span>(textArea).<span class="hljs-title function_">toHaveClass</span>(<span class="hljs-string">&#x27;ring-danger-500&#x27;</span>);
    <span class="hljs-title function_">expect</span>(count).<span class="hljs-title function_">toHaveStyle</span>({ <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;rgb(237, 70, 86)&#x27;</span> });
    <span class="hljs-title function_">expect</span>(textArea).<span class="hljs-title function_">toHaveAttribute</span>(<span class="hljs-string">&#x27;aria-invalid&#x27;</span>, <span class="hljs-string">&#x27;true&#x27;</span>);
  },
};
</code></pre>
<blockquote>
<p><strong>تمرين سريع</strong></p>
<p>هل يمكنك كتابة اختبار يتحقق مما يلي:</p>
<ul>
<li>منطقة نص معطّلة هي—في الحقيقة—معطّلة.</li>
<li>الكتابة في منطقة النص لا تغيّر قيمة منطقة النص.</li>
</ul>
<p>ويمكن العثور على حل محتمل <a href="https://stevekinney.com/courses/storybook/text-area-disabled-play-function-solution">هنا</a>.</p>
</blockquote>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
