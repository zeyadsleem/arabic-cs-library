const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-without-trying",p="استخدام TypeScript دون أن تبذل جهدًا",t=[{depth:2,id:"سحر-استدلال-الأنواع",text:"سحر استدلال الأنواع"},{depth:2,id:"خصائص-المكون-props-الاستدلال-في-العمل",text:"خصائص المكوّن (props): الاستدلال في العمل"},{depth:2,id:"تعريف-أنواع-الخصائص",text:"تعريف أنواع الخصائص"}],e=`<p><strong>إليك فكرة محورية في هذه الورشة</strong>: ليست أعظم قوة خارقة في TypeScript هي الأنواع الصريحة التي تكتبها، بل الأنواع التي <em>لا</em> تضطر إلى كتابتها. فإن TypeScript الحديث بارع جدًا في استنتاج ما قصدته، وكثيرًا ما يمنحك سلامة أنواع محكمة دون أي جهد إضافي. وسأحاول خلال وقتنا معًا أن أقنعك بأنك تسير على الطريق الصحيح حين تكاد لا تلاحظ أنك تستخدم TypeScript في مشروعك أصلًا.</p>
<h2 id="سحر-استدلال-الأنواع">سحر استدلال الأنواع</h2>
<p>أصبح محرّك الاستدلال في TypeScript <em>جيدًا إلى حدٍّ مخيف</em>. في حالات كثيرة يمكنك أن تكتب ما يشبه JavaScript العادي، ومع ذلك تحصل على فحص شامل للأنواع، وإكمال تلقائي، ودعم لإعادة الهيكلة. فما السر؟ إن TypeScript يحلّل بنية شيفرتك، وتوقيعات دوالك، وقيم الإرجاع فيها ليبني صورة كاملة عن أنواعك.</p>
<p>وهذا هو الجزء الجميل: من المرجّح أنك تحصل فعلًا على فوائد من TypeScript أكثر مما تدرك.</p>
<h2 id="خصائص-المكون-props-الاستدلال-في-العمل">خصائص المكوّن (props): الاستدلال في العمل</h2>
<p>تأمّل هذا المكوّن الصغير الساذج. وبحسب ما يمكننا ملاحظته في هذه المرحلة، لا يكاد يوجد دليل على أنه يستخدم TypeScript إطلاقًا. صحيح أنه يبدو مثل JavaScript ويتصرف مثل JavaScript في الوقت نفسه. وإذا لم يتمكّن TypeScript من استنتاج نوع خاصية معيّنة، فسيشير إليها ببساطة على أنها <code>any</code>.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// @ts-ignore</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">NameTag</span> = (<span class="hljs-params">{ name, title, level, isOnline }</span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;w-96 overflow-hidden rounded-xl border-2 border-red-600 bg-white shadow-md&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;bg-red-600 px-4 py-2 text-center font-bold tracking-widest text-white uppercase&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-3xl&quot;</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>My name is<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex flex-col items-center gap-4 p-6 text-center&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-3xl font-bold&quot;</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-gray-700&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-sm&quot;</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xs&quot;</span>&gt;</span>Level {level}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        {isOnline &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            Online
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>إنه يعمل من الناحية التقنية، ونحصل على فائدة <em>ضئيلة</em>: فعلى الأقل يعرف IntelliSense ما الخصائص التي يمكن أن يستقبلها هذا المكوّن، حتى وإن لم يكن يعرف ما الأنواع التي ينبغي أن تكون عليها تلك القيم.</p>
<p>ومع أن هذا يعمل، يمكننا الحصول على استدلال أفضل بتوفير قيم افتراضية للمعاملات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Better: defaults help TypeScript infer more precisely</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">NameTag</span> = (<span class="hljs-params">{ name = <span class="hljs-string">&#x27;&#x27;</span>, title = <span class="hljs-string">&#x27;&#x27;</span>, level = <span class="hljs-number">0</span>, isOnline = <span class="hljs-literal">false</span> }</span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;w-96 overflow-hidden rounded-xl border-2 border-red-600 bg-white shadow-md&quot;</span>&gt;</span>
      {/* The rest of the component… */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>الآن يعرف TypeScript أن <code>name</code> ينبغي أن يكون نصًا، وأن <code>level</code> ينبغي أن يكون رقمًا، وأن <code>isOnline</code> ينبغي أن يكون قيمة منطقية، وكل ذلك دون كتابة أي نوع صريح واحد.</p>
<h2 id="تعريف-أنواع-الخصائص">تعريف أنواع الخصائص</h2>
<p>وبالطبع يمكننا جعل الأمر أسهل من ذلك بالتسمية الصريحة للخصائص التي يتوقعها مكوّننا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">NameTagProps</span> = {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">level</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">isOnline</span>?: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-comment">// 🏆 Best: explicitly define the types for the component&#x27;s props.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title function_">NameTag</span> = (<span class="hljs-params">{ name, title, level, isOnline = <span class="hljs-literal">false</span> }: <span class="hljs-title class_">NameTagProps</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;w-96 overflow-hidden rounded-xl border-2 border-red-600 bg-white shadow-md&quot;</span>&gt;</span>
      {/* The rest of the component… */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
