const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="vscode-tasks-tips-and-tricks",p="المهام: نصائح وحيل",l=[{depth:2,id:"مطابقات-مشكلات-مخصصة",text:"مطابِقات مشكلات مخصّصة"},{depth:2,id:"خيارات-العرض",text:"خيارات العرض"},{depth:2,id:"متغيرات-البيئة",text:"متغيّرات البيئة"},{depth:2,id:"تشغيل-المهام-تلقائيا-عند-فتح-مجلد",text:"تشغيل المهام تلقائيًا عند فتح مجلد"},{depth:3,id:"الخصائص-الرئيسية",text:"الخصائص الرئيسية:"},{depth:3,id:"خيارات-إضافية-لـ-runon",text:"خيارات إضافية لـ runOn:"},{depth:3,id:"نصائح-للمهام-التي-تبدأ-تلقائيا",text:"نصائح للمهام التي تبدأ تلقائيًا:"}],u=`<h2 id="مطابقات-مشكلات-مخصصة">مطابِقات مشكلات مخصّصة</h2>
<p>يمكنك تعريف مطابِقات مشكلات مخصّصة لتحليل مخرجات أي أداة من أدوات سطر الأوامر. وهذا مفيد جدًا إن كان لديك مصرّف خاصّ أو حلّ مخصّص لفحص الشيفرة. ويستطيع مطابِق مخصّص إبراز مسارات الملفات وأرقام الأسطر في الأخطاء، لتتمكّن من النقر عليها والانتقال مباشرةً إلى الشيفرة.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;owner&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;customLinter&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;pattern&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;regexp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error)\\\\s+(.*)$&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;file&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;line&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;column&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;severity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="خيارات-العرض">خيارات العرض</h2>
<p>يمكنك التحكّم في طريقة عرض مخرجات المهمة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Verbose Build&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build --verbose&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;presentation&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;reveal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;always&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;panel&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dedicated&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;echo&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;showReuseMessage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;clear&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<ul>
<li><code>reveal</code>: إظهار اللوحة تلقائيًا أو عند وجود مشكلة فقط (<code>silent</code> و <code>never</code> وغيرها).</li>
<li><code>panel</code>: الاحتفاظ بمخرجات كل مهمة في لوحة منفصلة، أو إعادة استخدام لوحة طرفية واحدة.</li>
<li><code>clear</code>: مسح المخرجات السابقة قبل تشغيل المهمة الجديدة.</li>
</ul>
<h2 id="متغيرات-البيئة">متغيّرات البيئة</h2>
<p>هل تحتاج متغيّرات بيئة لمهمة واحدة؟ أدرج <code>env</code> في المهمة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Build with Env Var&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run build&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;NODE_ENV&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;production&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;API_KEY&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;xyz123&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>تعامل مع الأسرار بأمان، وتجنّب إيداع أسرار حقيقية في التحكّم في الإصدارات! واستخدم قيمًا نائبة أو اجلبها من مخزن آمن.</p>
<h2 id="تشغيل-المهام-تلقائيا-عند-فتح-مجلد">تشغيل المهام تلقائيًا عند فتح مجلد</h2>
<p>يمكنك ضبط المهام لتعمل تلقائيًا عند فتح مجلد أو مساحة عمل باستخدام خاصية <code>runOn</code>. وهذا مفيد بوجه خاص في تشغيل خوادم التطوير، أو تنفيذ خطوات البناء الأولية، أو تهيئة بيئة تطويرك.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Start Dev Server&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;shell&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npm run dev&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;isBackground&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;problemMatcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;owner&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;custom&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;pattern&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;regexp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;background&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;beginsPattern&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Starting development server&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;endsPattern&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Development server started&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;runOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;runOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;folderOpen&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="الخصائص-الرئيسية">الخصائص الرئيسية:</h3>
<ul>
<li><strong><code>runOptions.runOn</code>:</strong> يحدّد متى تُشغَّل المهمة. وتعني القيمة <code>&quot;folderOpen&quot;</code> أن المهمة ستبدأ تلقائيًا عند فتح المجلد.</li>
<li><strong><code>isBackground: true</code>:</strong> يوسم المهمة كمهمة خلفية طويلة الأمد لا تعطّل Visual Studio Code.</li>
<li><strong><code>problemMatcher</code>:</strong> اضبط أنماطًا لكشف بدء المهمة بنجاح.</li>
</ul>
<h3 id="خيارات-إضافية-لـ-runon">خيارات إضافية لـ <code>runOn</code>:</h3>
<ul>
<li><strong><code>folderOpen</code>:</strong> العمل عند فتح المجلد أو مساحة العمل</li>
<li><strong><code>default</code>:</strong> العمل عند التشغيل الصريح فقط</li>
</ul>
<h3 id="نصائح-للمهام-التي-تبدأ-تلقائيا">نصائح للمهام التي تبدأ تلقائيًا:</h3>
<p><strong>استخدم خيارات <code>presentation</code></strong> للتحكّم في ظهور الطرفية:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;presentation&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
	<span class="hljs-attr">&quot;reveal&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;silent&quot;</span><span class="hljs-punctuation">,</span>
	<span class="hljs-attr">&quot;panel&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dedicated&quot;</span><span class="hljs-punctuation">,</span>
	<span class="hljs-attr">&quot;showReuseMessage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>اجمعها مع اعتماديات المهام</strong> لإنشاء مسارات عمل كاملة للإقلاع:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;label&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Dev Environment&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Start Backend&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Start Frontend&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;Watch CSS&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;dependsOrder&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;parallel&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;runOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;runOn&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;folderOpen&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>استخدم مطالبات للتأكيد</strong> إن لم ترغب في تشغيل المهمة دائمًا:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;inputs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
	<span class="hljs-punctuation">{</span>
		<span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;confirmStart&quot;</span><span class="hljs-punctuation">,</span>
		<span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;pickString&quot;</span><span class="hljs-punctuation">,</span>
		<span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Start development server?&quot;</span><span class="hljs-punctuation">,</span>
		<span class="hljs-attr">&quot;options&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;Yes&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;No&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
		<span class="hljs-attr">&quot;default&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Yes&quot;</span>
	<span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:u};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,u as html,t as slug,p as title};
