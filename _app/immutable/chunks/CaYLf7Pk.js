const s="kinney",n="react-typescript",a="React مع TypeScript",t="setting-up-linting-and-formatting",p="ضبط الفحص الساكن والتنسيق",l=[{depth:2,id:"ضبط-الفحص-الساكن-والتنسيق",text:"ضبط الفحص الساكن والتنسيق"}],c=`<h2 id="ضبط-الفحص-الساكن-والتنسيق">ضبط الفحص الساكن والتنسيق</h2>
<p>لا يكتمل أي إعداد لـ TypeScript دون فحص ساكن سليم. إليك إعدادًا متينًا لـ ESLint مع React 19 و TypeScript:</p>
<pre><code class="language-bash">npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-react eslint-plugin-react-hooks
npm install -D prettier eslint-config-prettier
</code></pre>
<p>أنشئ ملف <code>.eslintrc.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;eslint:recommended&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;@typescript-eslint/recommended&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;plugin:react/recommended&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;plugin:react-hooks/recommended&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-string">&quot;prettier&quot;</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;parser&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@typescript-eslint/parser&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;plugins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;@typescript-eslint&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;react&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;rules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;react/react-in-jsx-scope&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;off&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@typescript-eslint/no-unused-vars&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;error&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;argsIgnorePattern&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^_&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@typescript-eslint/explicit-function-return-type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;off&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@typescript-eslint/explicit-module-boundary-types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;off&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;@typescript-eslint/no-explicit-any&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;warn&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;settings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;react&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;detect&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وكذلك ملف <code>.prettierrc.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;semi&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;trailingComma&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;es5&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;singleQuote&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;printWidth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">80</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;tabWidth&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span>
<span class="hljs-punctuation">}</span>
</code></pre>
`,u={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,u as default,l as headings,c as html,t as slug,p as title};
