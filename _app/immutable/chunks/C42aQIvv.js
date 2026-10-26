const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="advanced-snippet-techniques-vscode",p="تقنيات متقدّمة في المقتطفات",o=[{depth:2,id:"المقتطفات-المتداخلة",text:"المقتطفات المتداخلة"},{depth:3,id:"مثال-مقتطف-مكون-react-متداخل",text:"مثال: مقتطف مكوّن React متداخل"},{depth:3,id:"مقتطف-proptypes",text:"مقتطف PropTypes"},{depth:3,id:"كيف-يعمل-هذا",text:"كيف يعمل هذا"}],l=`<p>حسنًا، لم ننتهِ بعد. فلنأخذ لحظة سريعة لننظر في استراتيجيتين متقدّمتين قبل أن نمضي.</p>
<ul>
<li>استخدام المقتطفات المتداخلة</li>
<li>استخدام التعبيرات النمطية في المقتطفات</li>
</ul>
<h2 id="المقتطفات-المتداخلة">المقتطفات المتداخلة</h2>
<p>تتيح لك المقتطفات المتداخلة إنشاء مسارات عمل معقّدة لتوليد الشيفرة بإدراج مقتطفات داخل مقتطفات أخرى. ويتحقّق ذلك باستخدام عناصر نائبة كمُشغّلات للمقتطفات.</p>
<h3 id="مثال-مقتطف-مكون-react-متداخل">مثال: مقتطف مكوّن React متداخل</h3>
<p>افترض أن لديك مقتطفًا أساسيًا لمكوّن React ومقتطفًا منفصلًا لـ PropTypes. ويمكنك تداخل مقتطف PropTypes داخل مقتطف المكوّن.</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;React Functional Component&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rfc&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;import React from &#x27;react&#x27;;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;const \${1:\${TM_FILENAME_BASE/^(.*)$/\${1:/pascalcase}/}} = (props) =&gt; {&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\treturn (&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t\\t&lt;div&gt;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t\\t\\t\${0}&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t\\t&lt;/div&gt;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t);&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;};&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;export default \${1};&quot;</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;React functional component&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="مقتطف-proptypes">مقتطف PropTypes</h3>
<pre><code class="language-json"><span class="hljs-attr">&quot;React PropTypes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;proptypes&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;import PropTypes from &#x27;prop-types&#x27;;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\${1:ComponentName}.propTypes = {&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t\${0}&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;};&quot;</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;React PropTypes definition&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p><strong>تداخلهما:</strong> للتداخل، عدّل مقتطف مكوّن React (<code>react-component.json</code>) ليتضمّن عنصرًا نائبًا يشغّل مقتطف PropTypes. واستبدل السطر <code>export default \${1};</code> بما يلي:</p>
<pre><code class="language-json"><span class="hljs-string">&#x27;export default \${1};&#x27;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&#x27;\${2:proptypes}&#x27;</span>; <span class="hljs-comment">// Placeholder that triggers &quot;proptypes&quot; snippet</span>
</code></pre>
<p>الآن يصبح المقتطف المعدّل:</p>
<pre><code class="language-json"><span class="hljs-attr">&quot;React Functional Component with PropTypes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-comment">// Renamed snippet</span>
    <span class="hljs-attr">&quot;prefix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rfcp&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// New prefix</span>
    <span class="hljs-attr">&quot;body&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;import React from &#x27;react&#x27;;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;const \${1:\${TM_FILENAME_BASE/^(.*)$/\${1:/pascalcase}/}} = (props) =&gt; {&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\treturn (&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t\\t&lt;div&gt;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t\\t\\t\${0}&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t\\t&lt;/div&gt;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\\t);&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;};&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;export default \${1};&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;\${2:proptypes}&quot;</span> <span class="hljs-comment">// Placeholder that triggers &quot;proptypes&quot; snippet</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;React functional component with PropTypes&quot;</span> <span class="hljs-comment">// Updated description</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="كيف-يعمل-هذا">كيف يعمل هذا</h3>
<ol>
<li>أدرج مقتطف “React Functional Component with PropTypes” باستخدام البادئة <code>rfcp</code>.</li>
<li>املأ اسم المكوّن في العنصر النائب <code>$1</code>.</li>
<li>اضغط <code>Tab</code> للانتقال إلى العنصر النائب <code>$2</code>.</li>
<li>الآن، داخل العنصر النائب <code>$2</code>، اكتب بادئة مقتطف “React PropTypes”، وهي <code>proptypes</code>.</li>
<li>سيقترح Visual Studio Code مقتطف “React PropTypes”. فاختره.</li>
<li>سيُدرج مقتطف “React PropTypes” <em>داخل</em> العنصر النائب <code>$2</code> من مقتطف “React Functional Component”، فيتداخل المقتطفان فعليًا.</li>
</ol>
<p>تتيح لك المقتطفات المتداخلة إنشاء قوالب شيفرة معيارية قابلة لإعادة الاستخدام، وبناء بنى معقّدة من مقتطفات أصغر يمكن إدارتها.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:o,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,o as headings,l as html,t as slug,p as title};
