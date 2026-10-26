const s="kinney",a="react-performance",n="أداء React",l="react-compiler-migration-guide",p="دليل الانتقال إلى مصرّف React",t=[{depth:2,id:"فهم-مصرف-react",text:"فهم مصرّف React"},{depth:2,id:"التقييم-قبل-الانتقال",text:"التقييم قبل الانتقال"},{depth:3,id:"جرد-التحسينات-القائمة",text:"جرد التحسينات القائمة"},{depth:2,id:"التثبيت-والإعداد-الأساسي",text:"التثبيت والإعداد الأساسي"},{depth:3,id:"تثبيت-مصرف-react",text:"تثبيت مصرّف React"},{depth:3,id:"إعداد-babel",text:"إعداد Babel"},{depth:3,id:"إعداد-webpack",text:"إعداد Webpack"},{depth:3,id:"إعداد-typescript",text:"إعداد TypeScript"},{depth:2,id:"استراتيجية-الانتقال-التدريجي",text:"استراتيجية الانتقال التدريجي"},{depth:3,id:"المرحلة-1-المكونات-الطرفية-خطر-منخفض",text:"المرحلة 1: المكوّنات الطرفية (خطر منخفض)"},{depth:3,id:"المرحلة-2-مكونات-الحاويات-خطر-متوسط",text:"المرحلة 2: مكوّنات الحاويات (خطر متوسط)"},{depth:3,id:"المرحلة-3-المكونات-المعقدة-خطر-أعلى",text:"المرحلة 3: المكوّنات المعقّدة (خطر أعلى)"},{depth:2,id:"معالجة-حالات-عدم-التوافق-مع-المصرف",text:"معالجة حالات عدم التوافق مع المصرّف"},{depth:3,id:"مشكلات-شائعة-وحلولها",text:"مشكلات شائعة وحلولها"},{depth:3,id:"مخارج-الطوارئ-في-المصرف",text:"مخارج الطوارئ في المصرّف"},{depth:3,id:"إنشاء-واجهات-صديقة-للمصرف",text:"إنشاء واجهات صديقة للمصرّف"},{depth:2,id:"قياس-الأداء-والتحقق-منه",text:"قياس الأداء والتحقّق منه"},{depth:3,id:"مقارنة-قبلبعد",text:"مقارنة قبل/بعد"},{depth:2,id:"الإزالة-التدريجية-للتحسينات",text:"الإزالة التدريجية للتحسينات"},{depth:3,id:"استراتيجية-إزالة-التحسينات-اليدوية",text:"استراتيجية إزالة التحسينات اليدوية"},{depth:2,id:"إعداد-متقدم-للمصرف",text:"إعداد متقدّم للمصرّف"},{depth:3,id:"ملفات-تعريف-تحسين-مخصصة",text:"ملفات تعريف تحسين مخصّصة"},{depth:2,id:"استكشاف-المشكلات-الشائعة-وإصلاحها",text:"استكشاف المشكلات الشائعة وإصلاحها"},{depth:3,id:"تنقيح-المكونات-المصرفة",text:"تنقيح المكوّنات المصرَّفة"}],e=`<p>يغيّر مصرّف React (React Compiler) جذريًا طريقة تفكيرنا في تحسين الأداء داخل React. فبدلًا من وضع <code>useMemo</code> و<code>useCallback</code> و<code>React.memo</code> يدويًا في أنحاء قاعدة شيفرتك، يحسّن المصرّف مكوّناتك تلقائيًا وقت البناء. وهو ليس سحرًا، بل تحليل ساكن متطوّر يفهم نموذج التصيير في React ويطبّق التحسينات حيث تهمّ فعلًا.</p>
<p>لكن الانتقال ليس مجرّد «شغّله ثم احذف كل تخزينك اليدوي للنتائج». فالمصرّف يعمل في أفضل حالاته حين تتبع شيفرتك أنماطًا معيّنة، وهناك حالات حدّية يبقى فيها التحسين اليدوي ضروريًا. يرشدك هذا الدليل خلال عملية الانتقال الكاملة: التحضير، وتفعيل المصرّف، ومعالجة حالات عدم التوافق، وقياس التحسّن، ومعرفة متى تُبقي تحسيناتك اليدوية.</p>
<h2 id="فهم-مصرف-react">فهم مصرّف React</h2>
<p>يحلّل مصرّف React مكوّناتك وقت البناء ويُدرج التحسينات تلقائيًا. وكأن لديك مهندس أداء React خبيرًا يراجع كل مكوّن ويطبّق عليه التحسينات المثالية.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// What you write</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCard</span>(<span class="hljs-params">{ product, onAddToCart }: <span class="hljs-title class_">ProductCardProps</span></span>) {
  <span class="hljs-keyword">const</span> discountedPrice = product.<span class="hljs-property">price</span> * (<span class="hljs-number">1</span> - product.<span class="hljs-property">discount</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">onAddToCart</span>(product.<span class="hljs-property">id</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-card&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>\${discountedPrice.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// What the compiler generates (conceptually)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCard</span>(<span class="hljs-params">{ product, onAddToCart }: <span class="hljs-title class_">ProductCardProps</span></span>) {
  <span class="hljs-keyword">const</span> discountedPrice = <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> product.<span class="hljs-property">price</span> * (<span class="hljs-number">1</span> - product.<span class="hljs-property">discount</span>),
    [product.<span class="hljs-property">price</span>, product.<span class="hljs-property">discount</span>],
  );

  <span class="hljs-keyword">const</span> handleClick = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">onAddToCart</span>(product.<span class="hljs-property">id</span>);
  }, [onAddToCart, product.<span class="hljs-property">id</span>]);

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(
    <span class="hljs-function">() =&gt;</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-card&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>\${discountedPrice.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    ),
    [product.<span class="hljs-property">name</span>, discountedPrice, handleClick],
  );
}
</code></pre>
<p>يطبّق المصرّف هذه التحسينات بذكاء: فهو لا يحفظ نتائج الحسابات المكلفة التي تتغيّر في كل تصيير، ويفهم متى يضرّ حفظ النتائج بالأداء فعلًا.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>تفعيل مصرّف React في React 19 اختياري (opt-in). وعليك تمكينه صراحةً في إعدادات البناء لديك. وقد صُمّم ليُتبنّى تدريجيًا، فتستطيع تفعيله لمكوّنات بعينها أو لمجلدات كاملة.</p>
</blockquote>
<h2 id="التقييم-قبل-الانتقال">التقييم قبل الانتقال</h2>
<p>قبل تفعيل المصرّف، قيّم قاعدة شيفرتك الحالية لتفهم التحسينات الموجودة لديك وأيّها قد يتعارض مع المصرّف:</p>
<h3 id="جرد-التحسينات-القائمة">جرد التحسينات القائمة</h3>
<pre><code class="language-bash"><span class="hljs-comment"># Find all manual memoization in your codebase</span>
rg <span class="hljs-string">&quot;useMemo|useCallback|React\\.memo&quot;</span> --<span class="hljs-built_in">type</span> tsx --<span class="hljs-built_in">type</span> ts -n

<span class="hljs-comment"># Find components with optimization patterns</span>
rg <span class="hljs-string">&quot;memo\\(|React\\.memo|React\\.forwardRef&quot;</span> --<span class="hljs-built_in">type</span> tsx --<span class="hljs-built_in">type</span> ts -A 5 -B 5

<span class="hljs-comment"># Look for potential compiler conflicts</span>
rg <span class="hljs-string">&quot;useEffect.*\\[\\]|useState.*function&quot;</span> --<span class="hljs-built_in">type</span> tsx --<span class="hljs-built_in">type</span> ts
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// audit-optimizations.ts - Script to analyze your current optimizations</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;
<span class="hljs-keyword">import</span> { parse } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@babel/parser&#x27;</span>;
<span class="hljs-keyword">import</span> traverse <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@babel/traverse&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">OptimizationAnalysis</span> {
  <span class="hljs-attr">file</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">optimizations</span>: {
    <span class="hljs-attr">useMemo</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">useCallback</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">reactMemo</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">forwardRef</span>: <span class="hljs-built_in">number</span>;
  };
  <span class="hljs-attr">potentialIssues</span>: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">OptimizationAuditor</span> {
  <span class="hljs-title function_">analyze</span>(<span class="hljs-attr">sourceDir</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">OptimizationAnalysis</span>[] {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">results</span>: <span class="hljs-title class_">OptimizationAnalysis</span>[] = [];

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">walkDirectory</span>(sourceDir, <span class="hljs-function">(<span class="hljs-params">filePath</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (filePath.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/\\.(tsx?|jsx?)$/</span>)) {
        <span class="hljs-keyword">const</span> analysis = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">analyzeFile</span>(filePath);
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">hasOptimizations</span>(analysis) || analysis.<span class="hljs-property">potentialIssues</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
          results.<span class="hljs-title function_">push</span>(analysis);
        }
      }
    });

    <span class="hljs-keyword">return</span> results;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">analyzeFile</span>(<span class="hljs-attr">filePath</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">OptimizationAnalysis</span> {
    <span class="hljs-keyword">const</span> source = fs.<span class="hljs-title function_">readFileSync</span>(filePath, <span class="hljs-string">&#x27;utf8&#x27;</span>);
    <span class="hljs-keyword">const</span> <span class="hljs-attr">analysis</span>: <span class="hljs-title class_">OptimizationAnalysis</span> = {
      <span class="hljs-attr">file</span>: filePath,
      <span class="hljs-attr">optimizations</span>: {
        <span class="hljs-attr">useMemo</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">useCallback</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">reactMemo</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">forwardRef</span>: <span class="hljs-number">0</span>,
      },
      <span class="hljs-attr">potentialIssues</span>: [],
    };

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> ast = <span class="hljs-title function_">parse</span>(source, {
        <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
        <span class="hljs-attr">plugins</span>: [<span class="hljs-string">&#x27;typescript&#x27;</span>, <span class="hljs-string">&#x27;jsx&#x27;</span>],
      });

      <span class="hljs-title function_">traverse</span>(ast, {
        <span class="hljs-title class_">CallExpression</span>: <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> callee = path.<span class="hljs-property">node</span>.<span class="hljs-property">callee</span>;

          <span class="hljs-keyword">if</span> (callee.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;Identifier&#x27;</span>) {
            <span class="hljs-keyword">switch</span> (callee.<span class="hljs-property">name</span>) {
              <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;useMemo&#x27;</span>:
                analysis.<span class="hljs-property">optimizations</span>.<span class="hljs-property">useMemo</span>++;
                <span class="hljs-keyword">break</span>;
              <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;useCallback&#x27;</span>:
                analysis.<span class="hljs-property">optimizations</span>.<span class="hljs-property">useCallback</span>++;
                <span class="hljs-keyword">break</span>;
            }
          }

          <span class="hljs-keyword">if</span> (callee.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;MemberExpression&#x27;</span>) {
            <span class="hljs-keyword">if</span> (
              callee.<span class="hljs-property">object</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;Identifier&#x27;</span> &amp;&amp;
              callee.<span class="hljs-property">object</span>.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;React&#x27;</span> &amp;&amp;
              callee.<span class="hljs-property">property</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;Identifier&#x27;</span>
            ) {
              <span class="hljs-keyword">switch</span> (callee.<span class="hljs-property">property</span>.<span class="hljs-property">name</span>) {
                <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;memo&#x27;</span>:
                  analysis.<span class="hljs-property">optimizations</span>.<span class="hljs-property">reactMemo</span>++;
                  <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;forwardRef&#x27;</span>:
                  analysis.<span class="hljs-property">optimizations</span>.<span class="hljs-property">forwardRef</span>++;
                  <span class="hljs-keyword">break</span>;
              }
            }
          }
        },

        <span class="hljs-comment">// Look for potential issues</span>
        <span class="hljs-title class_">VariableDeclarator</span>: <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (
            path.<span class="hljs-property">node</span>.<span class="hljs-property">init</span>?.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;ArrowFunctionExpression&#x27;</span> &amp;&amp;
            path.<span class="hljs-property">parentPath</span>.<span class="hljs-title function_">isVariableDeclaration</span>() &amp;&amp;
            path.<span class="hljs-property">parentPath</span>.<span class="hljs-property">node</span>.<span class="hljs-property">declarations</span>.<span class="hljs-property">length</span> === <span class="hljs-number">1</span>
          ) {
            analysis.<span class="hljs-property">potentialIssues</span>.<span class="hljs-title function_">push</span>(
              <span class="hljs-string">\`Potential inline function that could be optimized: line <span class="hljs-subst">\${path.node.loc?.start.line}</span>\`</span>,
            );
          }
        },
      });
    } <span class="hljs-keyword">catch</span> (error) {
      analysis.<span class="hljs-property">potentialIssues</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`Parse error: <span class="hljs-subst">\${error.message}</span>\`</span>);
    }

    <span class="hljs-keyword">return</span> analysis;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">hasOptimizations</span>(<span class="hljs-attr">analysis</span>: <span class="hljs-title class_">OptimizationAnalysis</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">const</span> { optimizations } = analysis;
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(optimizations).<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">count</span>) =&gt;</span> count &gt; <span class="hljs-number">0</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">walkDirectory</span>(<span class="hljs-params"><span class="hljs-attr">dir</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">callback</span>: (filePath: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span></span>) {
    <span class="hljs-keyword">const</span> entries = fs.<span class="hljs-title function_">readdirSync</span>(dir);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> entries) {
      <span class="hljs-keyword">const</span> fullPath = path.<span class="hljs-title function_">join</span>(dir, entry);
      <span class="hljs-keyword">const</span> stat = fs.<span class="hljs-title function_">statSync</span>(fullPath);

      <span class="hljs-keyword">if</span> (stat.<span class="hljs-title function_">isDirectory</span>() &amp;&amp; !entry.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;.&#x27;</span>) &amp;&amp; entry !== <span class="hljs-string">&#x27;node_modules&#x27;</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">walkDirectory</span>(fullPath, callback);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (stat.<span class="hljs-title function_">isFile</span>()) {
        <span class="hljs-title function_">callback</span>(fullPath);
      }
    }
  }

  <span class="hljs-title function_">generateReport</span>(<span class="hljs-attr">results</span>: <span class="hljs-title class_">OptimizationAnalysis</span>[]): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> totalFiles = results.<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> totalOptimizations = results.<span class="hljs-title function_">reduce</span>(
      <span class="hljs-function">(<span class="hljs-params">sum, r</span>) =&gt;</span> sum + <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(r.<span class="hljs-property">optimizations</span>).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">s, count</span>) =&gt;</span> s + count, <span class="hljs-number">0</span>),
      <span class="hljs-number">0</span>,
    );

    <span class="hljs-keyword">let</span> report = <span class="hljs-string">\`# React Optimization Audit\\n\\n\`</span>;
    report += <span class="hljs-string">\`**Total files with optimizations:** <span class="hljs-subst">\${totalFiles}</span>\\n\`</span>;
    report += <span class="hljs-string">\`**Total optimization calls:** <span class="hljs-subst">\${totalOptimizations}</span>\\n\\n\`</span>;

    <span class="hljs-comment">// Summary by optimization type</span>
    <span class="hljs-keyword">const</span> summary = results.<span class="hljs-title function_">reduce</span>(
      <span class="hljs-function">(<span class="hljs-params">acc, result</span>) =&gt;</span> {
        acc.<span class="hljs-property">useMemo</span> += result.<span class="hljs-property">optimizations</span>.<span class="hljs-property">useMemo</span>;
        acc.<span class="hljs-property">useCallback</span> += result.<span class="hljs-property">optimizations</span>.<span class="hljs-property">useCallback</span>;
        acc.<span class="hljs-property">reactMemo</span> += result.<span class="hljs-property">optimizations</span>.<span class="hljs-property">reactMemo</span>;
        acc.<span class="hljs-property">forwardRef</span> += result.<span class="hljs-property">optimizations</span>.<span class="hljs-property">forwardRef</span>;
        <span class="hljs-keyword">return</span> acc;
      },
      { <span class="hljs-attr">useMemo</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">useCallback</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">reactMemo</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">forwardRef</span>: <span class="hljs-number">0</span> },
    );

    report += <span class="hljs-string">\`## Optimization Summary\\n\`</span>;
    report += <span class="hljs-string">\`- useMemo: <span class="hljs-subst">\${summary.useMemo}</span>\\n\`</span>;
    report += <span class="hljs-string">\`- useCallback: <span class="hljs-subst">\${summary.useCallback}</span>\\n\`</span>;
    report += <span class="hljs-string">\`- React.memo: <span class="hljs-subst">\${summary.reactMemo}</span>\\n\`</span>;
    report += <span class="hljs-string">\`- React.forwardRef: <span class="hljs-subst">\${summary.forwardRef}</span>\\n\\n\`</span>;

    <span class="hljs-comment">// Top optimized files</span>
    <span class="hljs-keyword">const</span> topFiles = results
      .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> ({
        ...r,
        <span class="hljs-attr">total</span>: <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">values</span>(r.<span class="hljs-property">optimizations</span>).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, count</span>) =&gt;</span> sum + count, <span class="hljs-number">0</span>),
      }))
      .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">total</span> - a.<span class="hljs-property">total</span>)
      .<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>);

    report += <span class="hljs-string">\`## Most Optimized Files\\n\`</span>;
    topFiles.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">file</span>) =&gt;</span> {
      report += <span class="hljs-string">\`- **<span class="hljs-subst">\${file.file}</span>**: <span class="hljs-subst">\${file.total}</span> optimizations\\n\`</span>;
    });

    <span class="hljs-keyword">return</span> report;
  }
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> auditor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">OptimizationAuditor</span>();
<span class="hljs-keyword">const</span> results = auditor.<span class="hljs-title function_">analyze</span>(<span class="hljs-string">&#x27;./src&#x27;</span>);
<span class="hljs-keyword">const</span> report = auditor.<span class="hljs-title function_">generateReport</span>(results);

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(report);
fs.<span class="hljs-title function_">writeFileSync</span>(<span class="hljs-string">&#x27;optimization-audit.md&#x27;</span>, report);
</code></pre>
<h2 id="التثبيت-والإعداد-الأساسي">التثبيت والإعداد الأساسي</h2>
<h3 id="تثبيت-مصرف-react">تثبيت مصرّف React</h3>
<pre><code class="language-bash"><span class="hljs-comment"># Install the React Compiler (React 19+)</span>
npm install react-compiler-runtime
npm install --save-dev babel-plugin-react-compiler

<span class="hljs-comment"># Or with yarn</span>
yarn add react-compiler-runtime
yarn add --dev babel-plugin-react-compiler
</code></pre>
<h3 id="إعداد-babel">إعداد Babel</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// babel.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">presets</span>: [<span class="hljs-string">&#x27;@babel/preset-env&#x27;</span>, <span class="hljs-string">&#x27;@babel/preset-react&#x27;</span>, <span class="hljs-string">&#x27;@babel/preset-typescript&#x27;</span>],
  <span class="hljs-attr">plugins</span>: [
    [
      <span class="hljs-string">&#x27;react-compiler&#x27;</span>,
      {
        <span class="hljs-comment">// Start with opt-in mode for safer migration</span>
        <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;opt-in&#x27;</span>,

        <span class="hljs-comment">// Specify which components/files to compile</span>
        <span class="hljs-attr">include</span>: [<span class="hljs-string">&#x27;src/components/**&#x27;</span>, <span class="hljs-string">&#x27;src/pages/**&#x27;</span>],

        <span class="hljs-comment">// Exclude problematic files</span>
        <span class="hljs-attr">exclude</span>: [<span class="hljs-string">&#x27;src/legacy/**&#x27;</span>, <span class="hljs-string">&#x27;src/external/**&#x27;</span>],

        <span class="hljs-comment">// Compiler options</span>
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// Validate hooks rules more strictly</span>
          <span class="hljs-attr">strictMode</span>: <span class="hljs-literal">true</span>,

          <span class="hljs-comment">// Generate source maps for debugging</span>
          <span class="hljs-attr">sourceMaps</span>: <span class="hljs-literal">true</span>,

          <span class="hljs-comment">// Optimization level</span>
          <span class="hljs-attr">optimizationLevel</span>: <span class="hljs-string">&#x27;standard&#x27;</span>, <span class="hljs-comment">// &#x27;conservative&#x27; | &#x27;standard&#x27; | &#x27;aggressive&#x27;</span>
        },
      },
    ],
  ],
};
</code></pre>
<h3 id="إعداد-webpack">إعداد Webpack</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ReactCompilerWebpackPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;react-compiler-webpack-plugin&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ReactCompilerWebpackPlugin</span>({
      <span class="hljs-comment">// Enable compiler for development builds too</span>
      <span class="hljs-attr">enabled</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;production&#x27;</span> || process.<span class="hljs-property">env</span>.<span class="hljs-property">ENABLE_COMPILER</span> === <span class="hljs-string">&#x27;true&#x27;</span>,

      <span class="hljs-comment">// Compiler options</span>
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;opt-in&#x27;</span>,
        <span class="hljs-attr">include</span>: [<span class="hljs-string">&#x27;src/**/*.{ts,tsx,js,jsx}&#x27;</span>],
        <span class="hljs-attr">exclude</span>: [<span class="hljs-string">&#x27;**/*.test.*&#x27;</span>, <span class="hljs-string">&#x27;**/*.spec.*&#x27;</span>],
      },
    }),
  ],

  <span class="hljs-comment">// Enhanced development experience</span>
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-comment">// Enable hot reloading with compiler</span>
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-comment">// Show compiler warnings/errors</span>
    <span class="hljs-attr">client</span>: {
      <span class="hljs-attr">overlay</span>: {
        <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">runtimeErrors</span>: <span class="hljs-literal">true</span>,
      },
    },
  },

  <span class="hljs-comment">// Source maps for debugging compiled code</span>
  <span class="hljs-attr">devtool</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span> ? <span class="hljs-string">&#x27;eval-source-map&#x27;</span> : <span class="hljs-string">&#x27;source-map&#x27;</span>,
};
</code></pre>
<h3 id="إعداد-typescript">إعداد TypeScript</h3>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">// ... other options</span>

    <span class="hljs-comment">// Support for React Compiler runtime</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;react-compiler-runtime&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Preserve JSX for React Compiler</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;preserve&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Enable advanced optimizations</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2020&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>

  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;react-compiler.d.ts&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-typescript"><span class="hljs-comment">// react-compiler.d.ts - Type definitions for compiler annotations</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">namespace</span> <span class="hljs-title class_">ReactCompiler</span> {
  <span class="hljs-comment">/**
   * Opt a component into React Compiler optimization
   */</span>
  <span class="hljs-keyword">function</span> useOptimize&lt;T&gt;(<span class="hljs-attr">component</span>: T): T;

  <span class="hljs-comment">/**
   * Exclude a component from React Compiler optimization
   */</span>
  <span class="hljs-keyword">function</span> useNoOptimize&lt;T&gt;(<span class="hljs-attr">component</span>: T): T;

  <span class="hljs-comment">/**
   * Provide hints to the compiler about expensive operations
   */</span>
  <span class="hljs-keyword">function</span> useExpensive&lt;T&gt;(<span class="hljs-attr">computation</span>: <span class="hljs-function">() =&gt;</span> T, <span class="hljs-attr">deps</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">DependencyList</span>): T;
}
</code></pre>
<h2 id="استراتيجية-الانتقال-التدريجي">استراتيجية الانتقال التدريجي</h2>
<h3 id="المرحلة-1-المكونات-الطرفية-خطر-منخفض">المرحلة 1: المكوّنات الطرفية (خطر منخفض)</h3>
<p>ابدأ بالمكوّنات الطرفية البسيطة التي لا اعتمادات معقّدة لها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good candidates for early migration</span>
<span class="hljs-comment">// Simple components with clear props</span>
<span class="hljs-string">&#x27;use optimize&#x27;</span>; <span class="hljs-comment">// Compiler directive</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params">{ children, variant, onClick }: <span class="hljs-title class_">ButtonProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">btn</span> <span class="hljs-attr">btn-</span>\${<span class="hljs-attr">variant</span>}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserAvatar</span>(<span class="hljs-params">{ user, size = <span class="hljs-string">&#x27;medium&#x27;</span> }: <span class="hljs-title class_">UserAvatarProps</span></span>) {
  <span class="hljs-keyword">const</span> sizeClass = size === <span class="hljs-string">&#x27;small&#x27;</span> ? <span class="hljs-string">&#x27;w-8 h-8&#x27;</span> : size === <span class="hljs-string">&#x27;large&#x27;</span> ? <span class="hljs-string">&#x27;w-16 h-16&#x27;</span> : <span class="hljs-string">&#x27;w-12 h-12&#x27;</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{user.avatar}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{</span>\`\${<span class="hljs-attr">user.name</span>} <span class="hljs-attr">avatar</span>\`} <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">rounded-full</span> \${<span class="hljs-attr">sizeClass</span>}\`} /&gt;</span></span>
  );
}

<span class="hljs-comment">// Card component with simple logic</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCard</span>(<span class="hljs-params">{ product }: <span class="hljs-title class_">ProductCardProps</span></span>) {
  <span class="hljs-keyword">const</span> discountedPrice = product.<span class="hljs-property">price</span> * (<span class="hljs-number">1</span> - product.<span class="hljs-property">discount</span>);
  <span class="hljs-keyword">const</span> hasDiscount = product.<span class="hljs-property">discount</span> &gt; <span class="hljs-number">0</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;product-card&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.image}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;price&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{hasDiscount</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}&gt;</span>\${product.price}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        {hasDiscount &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;discount-price&quot;</span>&gt;</span>\${discountedPrice.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="المرحلة-2-مكونات-الحاويات-خطر-متوسط">المرحلة 2: مكوّنات الحاويات (خطر متوسط)</h3>
<p>بعد التأكد من أن المصرّف يعمل مع المكوّنات الطرفية، انتقل إلى مكوّنات الحاويات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Container component with state management</span>
<span class="hljs-string">&#x27;use optimize&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params">{ users, onUserSelect }: <span class="hljs-title class_">UserListProps</span></span>) {
  <span class="hljs-keyword">const</span> [selectedUser, setSelectedUser] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [searchQuery, setSearchQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// Compiler will automatically memoize this filtering</span>
  <span class="hljs-keyword">const</span> filteredUsers = users.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span>
    user.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchQuery.<span class="hljs-title function_">toLowerCase</span>()),
  );

  <span class="hljs-comment">// Compiler will automatically memoize this handler</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUserClick</span> = (<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setSelectedUser</span>(userId);
    <span class="hljs-title function_">onUserSelect</span>(userId);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;user-list&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchInput</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{searchQuery}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSearchQuery}</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;users&quot;</span>&gt;</span>
        {filteredUsers.map((user) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">UserCard</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{user.id}</span>
            <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span>
            <span class="hljs-attr">isSelected</span>=<span class="hljs-string">{selectedUser</span> === <span class="hljs-string">user.id}</span>
            <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> handleUserClick(user.id)}
          /&gt;
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="المرحلة-3-المكونات-المعقدة-خطر-أعلى">المرحلة 3: المكوّنات المعقّدة (خطر أعلى)</h3>
<p>وأخيرًا، انقل المكوّنات المعقّدة التي تتضمّن التأثيرات والمراجع وأنماطًا متقدّمة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Complex component with effects and refs</span>
<span class="hljs-string">&#x27;use optimize&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DataTable</span>(<span class="hljs-params">{ data, columns, onSort, onFilter }: <span class="hljs-title class_">DataTableProps</span></span>) {
  <span class="hljs-keyword">const</span> [sortConfig, setSortConfig] = useState&lt;<span class="hljs-title class_">SortConfig</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [filterConfig, setFilterConfig] = useState&lt;<span class="hljs-title class_">FilterConfig</span>&gt;({});
  <span class="hljs-keyword">const</span> [virtualizer, setVirtualizer] = useState&lt;<span class="hljs-title class_">VirtualizerAPI</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> tableRef = useRef&lt;<span class="hljs-title class_">HTMLTableElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> headerRef = useRef&lt;<span class="hljs-title class_">HTMLTableSectionElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Complex data processing - compiler will optimize automatically</span>
  <span class="hljs-keyword">const</span> processedData = data
    .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">row</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(filterConfig).<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">[column, filter]</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> value = row[column];
        <span class="hljs-keyword">return</span> filter.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;contains&#x27;</span>
          ? value.<span class="hljs-title function_">toString</span>().<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(filter.<span class="hljs-property">value</span>.<span class="hljs-title function_">toLowerCase</span>())
          : value === filter.<span class="hljs-property">value</span>;
      });
    })
    .<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!sortConfig) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;

      <span class="hljs-keyword">const</span> aValue = a[sortConfig.<span class="hljs-property">column</span>];
      <span class="hljs-keyword">const</span> bValue = b[sortConfig.<span class="hljs-property">column</span>];

      <span class="hljs-keyword">if</span> (aValue &lt; bValue) <span class="hljs-keyword">return</span> sortConfig.<span class="hljs-property">direction</span> === <span class="hljs-string">&#x27;asc&#x27;</span> ? -<span class="hljs-number">1</span> : <span class="hljs-number">1</span>;
      <span class="hljs-keyword">if</span> (aValue &gt; bValue) <span class="hljs-keyword">return</span> sortConfig.<span class="hljs-property">direction</span> === <span class="hljs-string">&#x27;asc&#x27;</span> ? <span class="hljs-number">1</span> : -<span class="hljs-number">1</span>;
      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    });

  <span class="hljs-comment">// Effect for virtualization setup</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (tableRef.<span class="hljs-property">current</span> &amp;&amp; processedData.<span class="hljs-property">length</span> &gt; <span class="hljs-number">100</span>) {
      <span class="hljs-keyword">const</span> virtualizer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">VirtualizerAPI</span>({
        <span class="hljs-attr">container</span>: tableRef.<span class="hljs-property">current</span>,
        <span class="hljs-attr">itemCount</span>: processedData.<span class="hljs-property">length</span>,
        <span class="hljs-attr">itemHeight</span>: <span class="hljs-number">48</span>,
      });

      <span class="hljs-title function_">setVirtualizer</span>(virtualizer);

      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> virtualizer.<span class="hljs-title function_">cleanup</span>();
    }
  }, [processedData.<span class="hljs-property">length</span>]);

  <span class="hljs-comment">// Complex event handlers - compiler will memoize appropriately</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSort</span> = (<span class="hljs-params"><span class="hljs-attr">column</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setSortConfig</span>(<span class="hljs-function">(<span class="hljs-params">prevSort</span>) =&gt;</span> ({
      column,
      <span class="hljs-attr">direction</span>: prevSort?.<span class="hljs-property">column</span> === column &amp;&amp; prevSort.<span class="hljs-property">direction</span> === <span class="hljs-string">&#x27;asc&#x27;</span> ? <span class="hljs-string">&#x27;desc&#x27;</span> : <span class="hljs-string">&#x27;asc&#x27;</span>,
    }));
    onSort?.(column);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleFilter</span> = (<span class="hljs-params"><span class="hljs-attr">column</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">filter</span>: <span class="hljs-title class_">FilterValue</span></span>) =&gt; {
    <span class="hljs-title function_">setFilterConfig</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
      ...prev,
      [column]: filter,
    }));
    onFilter?.(column, filter);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;data-table-container&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{tableRef}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;data-table&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{headerRef}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
            {columns.map((column) =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">TableHeader</span>
                <span class="hljs-attr">key</span>=<span class="hljs-string">{column.id}</span>
                <span class="hljs-attr">column</span>=<span class="hljs-string">{column}</span>
                <span class="hljs-attr">sortConfig</span>=<span class="hljs-string">{sortConfig}</span>
                <span class="hljs-attr">onSort</span>=<span class="hljs-string">{handleSort}</span>
                <span class="hljs-attr">onFilter</span>=<span class="hljs-string">{handleFilter}</span>
              /&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
          {virtualizer ? (
            <span class="hljs-tag">&lt;<span class="hljs-name">VirtualizedTableBody</span>
              <span class="hljs-attr">data</span>=<span class="hljs-string">{processedData}</span>
              <span class="hljs-attr">columns</span>=<span class="hljs-string">{columns}</span>
              <span class="hljs-attr">virtualizer</span>=<span class="hljs-string">{virtualizer}</span>
            /&gt;</span>
          ) : (
            processedData.map((row) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">TableRow</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{row.id}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{row}</span> <span class="hljs-attr">columns</span>=<span class="hljs-string">{columns}</span> /&gt;</span>)
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="معالجة-حالات-عدم-التوافق-مع-المصرف">معالجة حالات عدم التوافق مع المصرّف</h2>
<h3 id="مشكلات-شائعة-وحلولها">مشكلات شائعة وحلولها</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Issue: Dynamic hook usage (violates Rules of Hooks)</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProblematicComponent</span>(<span class="hljs-params">{ condition }: { condition: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">if</span> (condition) {
    <span class="hljs-keyword">const</span> value = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// ❌ Conditional hook usage</span>
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Solution: Move hooks to top level</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">FixedComponent</span>(<span class="hljs-params">{ condition }: { condition: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">if</span> (!condition) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Content with value: {value}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ❌ Issue: Mutating props or context values</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProblematicComponent</span>(<span class="hljs-params">{ config }: { config: Config }</span>) {
  config.<span class="hljs-property">lastAccessed</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(); <span class="hljs-comment">// ❌ Mutating props</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{config.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Solution: Create new objects for mutations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">FixedComponent</span>(<span class="hljs-params">{ config }: { config: Config }</span>) {
  <span class="hljs-keyword">const</span> updatedConfig = {
    ...config,
    <span class="hljs-attr">lastAccessed</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{updatedConfig.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ❌ Issue: Side effects in render</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProblematicComponent</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-comment">// ❌ Side effect during render</span>
  items.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">\`item-<span class="hljs-subst">\${item.id}</span>\`</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(item));
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{items.length} items<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Solution: Move side effects to useEffect</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">FixedComponent</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    items.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">\`item-<span class="hljs-subst">\${item.id}</span>\`</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(item));
    });
  }, [items]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{items.length} items<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="مخارج-الطوارئ-في-المصرف">مخارج الطوارئ في المصرّف</h3>
<p>تحتاج أحيانًا إلى تعطيل المصرّف لمكوّنات بعينها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Disable compiler for specific component</span>
<span class="hljs-string">&#x27;use no-optimize&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">LegacyComponent</span>(<span class="hljs-params">{ data }: <span class="hljs-title class_">LegacyProps</span></span>) {
  <span class="hljs-comment">// This component won&#x27;t be optimized by the compiler</span>
  <span class="hljs-comment">// Useful for components with complex imperative logic</span>
  <span class="hljs-comment">// or third-party library integration issues</span>

  <span class="hljs-keyword">const</span> legacyLibRef = useRef&lt;<span class="hljs-title class_">LegacyLibAPI</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Complex imperative setup that the compiler might not understand</span>
    legacyLibRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">LegacyLibAPI</span>({
      <span class="hljs-attr">container</span>: containerRef.<span class="hljs-property">current</span>,
      <span class="hljs-attr">options</span>: {
        <span class="hljs-comment">// Complex configuration</span>
      },
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      legacyLibRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">destroy</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{containerRef}</span> /&gt;</span></span>;
}

<span class="hljs-comment">// Selective optimization with compiler hints</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ComplexComponent</span>(<span class="hljs-params">{ data }: <span class="hljs-title class_">ComplexProps</span></span>) {
  <span class="hljs-comment">// This expensive calculation should always be memoized</span>
  <span class="hljs-keyword">const</span> expensiveResult = <span class="hljs-title class_">ReactCompiler</span>.<span class="hljs-title function_">useExpensive</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">performHeavyComputation</span>(data);
  }, [data]);

  <span class="hljs-comment">// Regular logic that compiler can optimize automatically</span>
  <span class="hljs-keyword">const</span> filteredData = data.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">active</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveVisualization</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{expensiveResult}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DataList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{filteredData}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="إنشاء-واجهات-صديقة-للمصرف">إنشاء واجهات صديقة للمصرّف</h3>
<p>صمّم واجهات برمجة التطبيقات لديك لتتوافق جيدًا مع المصرّف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Compiler-friendly API design</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">APIDesign</span> {
  <span class="hljs-comment">// Prefer simple props over complex objects</span>
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">userName</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">userEmail</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Instead of:</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComplexAPIDesign</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">profile</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">contact</span>: {
        <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
      };
    };
  };
}

<span class="hljs-comment">// ✅ Stable function references</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useStableCallbacks</span> = (<span class="hljs-params"><span class="hljs-attr">onSave</span>: (data: <span class="hljs-built_in">any</span>) =&gt; <span class="hljs-built_in">void</span></span>) =&gt; {
  <span class="hljs-comment">// Wrap external callbacks to make them stable</span>
  <span class="hljs-keyword">const</span> stableOnSave = <span class="hljs-title function_">useCallback</span>(onSave, [onSave]);

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">onSave</span>: stableOnSave };
};

<span class="hljs-comment">// ✅ Compiler-friendly custom hooks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useOptimizedSearch</span>(<span class="hljs-params"><span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[], <span class="hljs-attr">searchTerm</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-comment">// Simple dependencies that the compiler can track</span>
  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span>
    item.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(searchTerm.<span class="hljs-title function_">toLowerCase</span>()),
  );

  <span class="hljs-keyword">const</span> sortedItems = filteredItems.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">name</span>.<span class="hljs-title function_">localeCompare</span>(b.<span class="hljs-property">name</span>));

  <span class="hljs-keyword">return</span> sortedItems;
}
</code></pre>
<h2 id="قياس-الأداء-والتحقق-منه">قياس الأداء والتحقّق منه</h2>
<h3 id="مقارنة-قبلبعد">مقارنة قبل/بعد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// performance-comparison.ts - Script to measure compiler impact</span>
<span class="hljs-keyword">import</span> { performance } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;perf_hooks&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceMetrics</span> {
  <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">bundleSize</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">memoryUsage</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">reRenderCount</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">CompilerPerformanceValidator</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">measureComponent</span>(
    <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
    <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>,
    <span class="hljs-attr">iterations</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">100</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">PerformanceMetrics</span>&gt; {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">renderTimes</span>: <span class="hljs-built_in">number</span>[] = [];
    <span class="hljs-keyword">let</span> reRenderCount = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">TestWrapper</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> [, forceUpdate] = <span class="hljs-title function_">useState</span>({});

      <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// Measure multiple renders</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; iterations; i++) {
          <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

          <span class="hljs-title function_">forceUpdate</span>({}); <span class="hljs-comment">// Force re-render</span>

          <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
            <span class="hljs-keyword">const</span> endTime = performance.<span class="hljs-title function_">now</span>();
            renderTimes.<span class="hljs-title function_">push</span>(endTime - startTime);
            reRenderCount++;
          });
        }
      }, []);

      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>;
    };

    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TestWrapper</span> /&gt;</span></span>);

    <span class="hljs-comment">// Wait for all renders to complete</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">1000</span>));

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">renderTime</span>: renderTimes.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, time</span>) =&gt;</span> sum + time, <span class="hljs-number">0</span>) / renderTimes.<span class="hljs-property">length</span>,
      <span class="hljs-attr">bundleSize</span>: <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getBundleSize</span>(),
      <span class="hljs-attr">memoryUsage</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getMemoryUsage</span>(),
      reRenderCount,
    };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">compareVersions</span>(<span class="hljs-params">
    <span class="hljs-title class_">OriginalComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
    <span class="hljs-title class_">OptimizedComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
    <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>,
  </span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;🔄 Measuring original component...&#x27;</span>);
    <span class="hljs-keyword">const</span> originalMetrics = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measureComponent</span>(<span class="hljs-title class_">OriginalComponent</span>, props);

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;⚡ Measuring compiler-optimized component...&#x27;</span>);
    <span class="hljs-keyword">const</span> optimizedMetrics = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measureComponent</span>(<span class="hljs-title class_">OptimizedComponent</span>, props);

    <span class="hljs-keyword">const</span> improvement = {
      <span class="hljs-attr">renderTime</span>:
        ((originalMetrics.<span class="hljs-property">renderTime</span> - optimizedMetrics.<span class="hljs-property">renderTime</span>) / originalMetrics.<span class="hljs-property">renderTime</span>) *
        <span class="hljs-number">100</span>,
      <span class="hljs-attr">bundleSize</span>:
        ((originalMetrics.<span class="hljs-property">bundleSize</span> - optimizedMetrics.<span class="hljs-property">bundleSize</span>) / originalMetrics.<span class="hljs-property">bundleSize</span>) *
        <span class="hljs-number">100</span>,
      <span class="hljs-attr">memoryUsage</span>:
        ((originalMetrics.<span class="hljs-property">memoryUsage</span> - optimizedMetrics.<span class="hljs-property">memoryUsage</span>) /
          originalMetrics.<span class="hljs-property">memoryUsage</span>) *
        <span class="hljs-number">100</span>,
      <span class="hljs-attr">reRenderCount</span>: originalMetrics.<span class="hljs-property">reRenderCount</span> - optimizedMetrics.<span class="hljs-property">reRenderCount</span>,
    };

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">original</span>: originalMetrics,
      <span class="hljs-attr">optimized</span>: optimizedMetrics,
      improvement,
    };
  }

  <span class="hljs-title function_">generateReport</span>(<span class="hljs-attr">comparison</span>: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> { original, optimized, improvement } = comparison;

    <span class="hljs-keyword">return</span> <span class="hljs-string">\`
# React Compiler Performance Report

## Metrics Comparison

| Metric | Original | Optimized | Improvement |
|--------|----------|-----------|-------------|
| Render Time | <span class="hljs-subst">\${original.renderTime.toFixed(<span class="hljs-number">2</span>)}</span>ms | <span class="hljs-subst">\${optimized.renderTime.toFixed(<span class="hljs-number">2</span>)}</span>ms | <span class="hljs-subst">\${improvement.renderTime.toFixed(<span class="hljs-number">1</span>)}</span>% |
| Bundle Size | <span class="hljs-subst">\${(original.bundleSize / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">1</span>)}</span>KB | <span class="hljs-subst">\${(optimized.bundleSize / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">1</span>)}</span>KB | <span class="hljs-subst">\${improvement.bundleSize.toFixed(<span class="hljs-number">1</span>)}</span>% |
| Memory Usage | <span class="hljs-subst">\${(original.memoryUsage / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">1</span>)}</span>MB | <span class="hljs-subst">\${(optimized.memoryUsage / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">1</span>)}</span>MB | <span class="hljs-subst">\${improvement.memoryUsage.toFixed(<span class="hljs-number">1</span>)}</span>% |
| Re-renders | <span class="hljs-subst">\${original.reRenderCount}</span> | <span class="hljs-subst">\${optimized.reRenderCount}</span> | <span class="hljs-subst">\${improvement.reRenderCount}</span> fewer |

## Key Insights

<span class="hljs-subst">\${improvement.renderTime &gt; <span class="hljs-number">10</span> ? <span class="hljs-string">&#x27;✅ Significant render time improvement&#x27;</span> : <span class="hljs-string">&#x27;⚠️ Minimal render time impact&#x27;</span>}</span>
<span class="hljs-subst">\${improvement.bundleSize &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">&#x27;✅ Bundle size reduced&#x27;</span> : <span class="hljs-string">&#x27;⚠️ Bundle size increased (compiler overhead)&#x27;</span>}</span>
<span class="hljs-subst">\${improvement.reRenderCount &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">&#x27;✅ Reduced unnecessary re-renders&#x27;</span> : <span class="hljs-string">&#x27;⚠️ No re-render optimization&#x27;</span>}</span>

## Recommendations

<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.generateRecommendations(improvement)}</span>
\`</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateRecommendations</span>(<span class="hljs-attr">improvement</span>: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> recommendations = [];

    <span class="hljs-keyword">if</span> (improvement.<span class="hljs-property">renderTime</span> &gt; <span class="hljs-number">20</span>) {
      recommendations.<span class="hljs-title function_">push</span>(
        <span class="hljs-string">&#x27;🚀 Excellent render performance improvement - keep the compiler enabled&#x27;</span>,
      );
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (improvement.<span class="hljs-property">renderTime</span> &lt; <span class="hljs-number">0</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;⚠️ Performance regression detected - review compiler configuration&#x27;</span>);
    }

    <span class="hljs-keyword">if</span> (improvement.<span class="hljs-property">bundleSize</span> &lt; -<span class="hljs-number">10</span>) {
      recommendations.<span class="hljs-title function_">push</span>(
        <span class="hljs-string">&#x27;📦 Bundle size increased significantly - consider selective optimization&#x27;</span>,
      );
    }

    <span class="hljs-keyword">if</span> (improvement.<span class="hljs-property">reRenderCount</span> === <span class="hljs-number">0</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;🔄 No re-render optimization - component may already be optimal&#x27;</span>);
    }

    <span class="hljs-keyword">return</span> recommendations.<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;\\n&#x27;</span>);
  }
}
</code></pre>
<h2 id="الإزالة-التدريجية-للتحسينات">الإزالة التدريجية للتحسينات</h2>
<h3 id="استراتيجية-إزالة-التحسينات-اليدوية">استراتيجية إزالة التحسينات اليدوية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// migration-helper.ts - Tools to help remove manual optimizations</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">OptimizationRemovalHelper</span> {
  <span class="hljs-comment">/**
   * Automatically remove redundant optimizations from compiled components
   */</span>
  <span class="hljs-title function_">removeRedundantOptimizations</span>(<span class="hljs-attr">source</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-comment">// This would be implemented as a codemod</span>
    <span class="hljs-keyword">let</span> result = source;

    <span class="hljs-comment">// Remove unnecessary useMemo for simple computations</span>
    result = result.<span class="hljs-title function_">replace</span>(
      <span class="hljs-regexp">/const\\s+(\\w+)\\s*=\\s*useMemo\\(\\s*\\(\\)\\s*=&gt;\\s*([^,{]+),\\s*\\[([^\\]]*)\\]\\s*\\)/g</span>,
      <span class="hljs-string">&#x27;const $1 = $2&#x27;</span>,
    );

    <span class="hljs-comment">// Remove unnecessary useCallback for simple functions</span>
    result = result.<span class="hljs-title function_">replace</span>(
      <span class="hljs-regexp">/const\\s+(\\w+)\\s*=\\s*useCallback\\(\\s*\\([^)]*\\)\\s*=&gt;\\s*\\{([^}]+)\\},\\s*\\[([^\\]]*)\\]\\s*\\)/g</span>,
      <span class="hljs-string">&#x27;const $1 = ($2) =&gt; {$3}&#x27;</span>,
    );

    <span class="hljs-keyword">return</span> result;
  }

  <span class="hljs-comment">/**
   * Generate a report of optimizations that can be safely removed
   */</span>
  <span class="hljs-title function_">identifyRedundantOptimizations</span>(<span class="hljs-attr">componentPath</span>: <span class="hljs-built_in">string</span>): {
    <span class="hljs-attr">canRemove</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">line</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">reason</span>: <span class="hljs-built_in">string</span> }&gt;;
    <span class="hljs-attr">shouldKeep</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">line</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">reason</span>: <span class="hljs-built_in">string</span> }&gt;;
  } {
    <span class="hljs-comment">// Analyze component and identify redundant optimizations</span>
    <span class="hljs-comment">// This would integrate with the compiler&#x27;s analysis</span>

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">canRemove</span>: [
        {
          <span class="hljs-attr">line</span>: <span class="hljs-number">15</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;useMemo&#x27;</span>,
          <span class="hljs-attr">reason</span>: <span class="hljs-string">&#x27;Simple computation automatically optimized by compiler&#x27;</span>,
        },
        {
          <span class="hljs-attr">line</span>: <span class="hljs-number">23</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;useCallback&#x27;</span>,
          <span class="hljs-attr">reason</span>: <span class="hljs-string">&#x27;Function reference automatically stabilized by compiler&#x27;</span>,
        },
      ],
      <span class="hljs-attr">shouldKeep</span>: [
        {
          <span class="hljs-attr">line</span>: <span class="hljs-number">8</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;React.memo&#x27;</span>,
          <span class="hljs-attr">reason</span>: <span class="hljs-string">&#x27;Custom equality check cannot be inferred by compiler&#x27;</span>,
        },
      ],
    };
  }
}

<span class="hljs-comment">// Example codemod for removing redundant optimizations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createOptimizationRemovalCodemod</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;remove-redundant-optimizations&#x27;</span>,
    <span class="hljs-attr">transform</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">fileInfo</span>: <span class="hljs-built_in">any</span>, <span class="hljs-attr">api</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> j = api.<span class="hljs-property">jscodeshift</span>;
      <span class="hljs-keyword">const</span> source = <span class="hljs-title function_">j</span>(fileInfo.<span class="hljs-property">source</span>);

      <span class="hljs-comment">// Remove simple useMemo calls</span>
      source
        .<span class="hljs-title function_">find</span>(j.<span class="hljs-property">CallExpression</span>, {
          <span class="hljs-attr">callee</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;useMemo&#x27;</span> },
        })
        .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
          <span class="hljs-comment">// Only remove simple computations</span>
          <span class="hljs-keyword">const</span> callback = path.<span class="hljs-property">value</span>.<span class="hljs-property">arguments</span>[<span class="hljs-number">0</span>];
          <span class="hljs-keyword">return</span> (
            callback &amp;&amp;
            callback.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;ArrowFunctionExpression&#x27;</span> &amp;&amp;
            callback.<span class="hljs-property">body</span>.<span class="hljs-property">type</span> !== <span class="hljs-string">&#x27;BlockStatement&#x27;</span> <span class="hljs-comment">// Simple expression</span>
          );
        })
        .<span class="hljs-title function_">replaceWith</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> callback = path.<span class="hljs-property">value</span>.<span class="hljs-property">arguments</span>[<span class="hljs-number">0</span>];
          <span class="hljs-keyword">return</span> callback.<span class="hljs-property">body</span>;
        });

      <span class="hljs-comment">// Remove simple useCallback calls</span>
      source
        .<span class="hljs-title function_">find</span>(j.<span class="hljs-property">CallExpression</span>, {
          <span class="hljs-attr">callee</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;useCallback&#x27;</span> },
        })
        .<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
          <span class="hljs-comment">// Only remove callbacks without complex logic</span>
          <span class="hljs-keyword">const</span> callback = path.<span class="hljs-property">value</span>.<span class="hljs-property">arguments</span>[<span class="hljs-number">0</span>];
          <span class="hljs-keyword">return</span> (
            callback &amp;&amp;
            callback.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;ArrowFunctionExpression&#x27;</span> &amp;&amp;
            (!callback.<span class="hljs-property">body</span>.<span class="hljs-property">body</span> || callback.<span class="hljs-property">body</span>.<span class="hljs-property">body</span>.<span class="hljs-property">length</span> &lt;= <span class="hljs-number">2</span>)
          );
        })
        .<span class="hljs-title function_">replaceWith</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> callback = path.<span class="hljs-property">value</span>.<span class="hljs-property">arguments</span>[<span class="hljs-number">0</span>];
          <span class="hljs-keyword">return</span> callback;
        });

      <span class="hljs-keyword">return</span> source.<span class="hljs-title function_">toSource</span>();
    },
  };
}
</code></pre>
<h2 id="إعداد-متقدم-للمصرف">إعداد متقدّم للمصرّف</h2>
<h3 id="ملفات-تعريف-تحسين-مخصصة">ملفات تعريف تحسين مخصّصة</h3>
<pre><code class="language-javascript"><span class="hljs-comment">// Advanced compiler configuration for different environments</span>
<span class="hljs-keyword">const</span> compilerConfigs = {
  <span class="hljs-attr">development</span>: {
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;opt-in&#x27;</span>,
    <span class="hljs-attr">optimizationLevel</span>: <span class="hljs-string">&#x27;conservative&#x27;</span>,
    <span class="hljs-attr">sourceMaps</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">include</span>: [<span class="hljs-string">&#x27;src/components/**&#x27;</span>], <span class="hljs-comment">// Limited scope for faster builds</span>
    <span class="hljs-attr">options</span>: {
      <span class="hljs-comment">// More forgiving in development</span>
      <span class="hljs-attr">strictMode</span>: <span class="hljs-literal">false</span>,

      <span class="hljs-comment">// Keep original function names for debugging</span>
      <span class="hljs-attr">keepFunctionNames</span>: <span class="hljs-literal">true</span>,

      <span class="hljs-comment">// Generate detailed optimization reports</span>
      <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span>,
    },
  },

  <span class="hljs-attr">production</span>: {
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;opt-out&#x27;</span>, <span class="hljs-comment">// Optimize everything by default</span>
    <span class="hljs-attr">optimizationLevel</span>: <span class="hljs-string">&#x27;aggressive&#x27;</span>,
    <span class="hljs-attr">sourceMaps</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">exclude</span>: [<span class="hljs-string">&#x27;src/legacy/**&#x27;</span>, <span class="hljs-string">&#x27;src/vendor/**&#x27;</span>, <span class="hljs-string">&#x27;**/*.test.*&#x27;</span>],
    <span class="hljs-attr">options</span>: {
      <span class="hljs-comment">// Strict optimizations for production</span>
      <span class="hljs-attr">strictMode</span>: <span class="hljs-literal">true</span>,

      <span class="hljs-comment">// Advanced optimizations</span>
      <span class="hljs-attr">deadCodeElimination</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">inlineConstants</span>: <span class="hljs-literal">true</span>,

      <span class="hljs-comment">// Minimal runtime overhead</span>
      <span class="hljs-attr">minimalRuntime</span>: <span class="hljs-literal">true</span>,
    },
  },

  <span class="hljs-attr">testing</span>: {
    <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;opt-in&#x27;</span>,
    <span class="hljs-attr">optimizationLevel</span>: <span class="hljs-string">&#x27;standard&#x27;</span>,
    <span class="hljs-attr">sourceMaps</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">include</span>: [<span class="hljs-string">&#x27;src/**&#x27;</span>],
    <span class="hljs-attr">exclude</span>: [<span class="hljs-string">&#x27;**/*.test.*&#x27;</span>, <span class="hljs-string">&#x27;**/*.spec.*&#x27;</span>],
    <span class="hljs-attr">options</span>: {
      <span class="hljs-comment">// Predictable behavior for tests</span>
      <span class="hljs-attr">strictMode</span>: <span class="hljs-literal">true</span>,

      <span class="hljs-comment">// Preserve function names for better error messages</span>
      <span class="hljs-attr">keepFunctionNames</span>: <span class="hljs-literal">true</span>,

      <span class="hljs-comment">// Disable optimizations that might interfere with testing</span>
      <span class="hljs-attr">disableHoisting</span>: <span class="hljs-literal">true</span>,
    },
  },
};

<span class="hljs-comment">// Dynamic configuration based on environment</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">plugins</span>: [[<span class="hljs-string">&#x27;react-compiler&#x27;</span>, compilerConfigs[process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> || <span class="hljs-string">&#x27;development&#x27;</span>]]],
};
</code></pre>
<h2 id="استكشاف-المشكلات-الشائعة-وإصلاحها">استكشاف المشكلات الشائعة وإصلاحها</h2>
<h3 id="تنقيح-المكونات-المصرفة">تنقيح المكوّنات المصرَّفة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Development utilities for debugging compiler output</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createCompilerDebugTools</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;development&#x27;</span>) {
    <span class="hljs-keyword">return</span> {};
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-comment">// Log when compiler optimizations are applied</span>
    <span class="hljs-attr">logOptimizations</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">group</span>(<span class="hljs-string">\`🔧 <span class="hljs-subst">\${componentName}</span> Compiler Optimizations\`</span>);

      <span class="hljs-keyword">const</span> originalRender = <span class="hljs-title class_">React</span>.<span class="hljs-property">createElement</span>;
      <span class="hljs-title class_">React</span>.<span class="hljs-property">createElement</span> = <span class="hljs-keyword">function</span> (<span class="hljs-params">...args</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Creating element:&#x27;</span>, args[<span class="hljs-number">0</span>], args[<span class="hljs-number">1</span>]);
        <span class="hljs-keyword">return</span> originalRender.<span class="hljs-title function_">apply</span>(<span class="hljs-variable language_">this</span>, args);
      };

      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title class_">React</span>.<span class="hljs-property">createElement</span> = originalRender;
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">groupEnd</span>();
      };
    },

    <span class="hljs-comment">// Detect when memoization breaks</span>
    <span class="hljs-attr">detectMemoizationBreaks</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> renderCount = <span class="hljs-number">0</span>;

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">onRender</span>: <span class="hljs-function">() =&gt;</span> {
          renderCount++;
          <span class="hljs-keyword">if</span> (renderCount &gt; <span class="hljs-number">2</span>) {
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(
              <span class="hljs-string">\`⚠️ <span class="hljs-subst">\${componentName}</span> rendered <span class="hljs-subst">\${renderCount}</span> times - memoization may be broken\`</span>,
            );
          }
        },
        <span class="hljs-attr">reset</span>: <span class="hljs-function">() =&gt;</span> {
          renderCount = <span class="hljs-number">0</span>;
        },
      };
    },

    <span class="hljs-comment">// Compare compiled vs uncompiled performance</span>
    <span class="hljs-attr">comparePerformance</span>: <span class="hljs-title function_">async</span> (
      <span class="hljs-title class_">CompiledComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
      <span class="hljs-title class_">UncompiledComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
      <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>,
    ) =&gt; {
      <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">CompilerPerformanceValidator</span>().<span class="hljs-title function_">compareVersions</span>(
        <span class="hljs-title class_">UncompiledComponent</span>,
        <span class="hljs-title class_">CompiledComponent</span>,
        props,
      );

      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">table</span>({
        <span class="hljs-string">&#x27;Render Time&#x27;</span>: {
          <span class="hljs-string">&#x27;Before (ms)&#x27;</span>: results.<span class="hljs-property">original</span>.<span class="hljs-property">renderTime</span>.<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>),
          <span class="hljs-string">&#x27;After (ms)&#x27;</span>: results.<span class="hljs-property">optimized</span>.<span class="hljs-property">renderTime</span>.<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>),
          <span class="hljs-title class_">Improvement</span>: <span class="hljs-string">\`<span class="hljs-subst">\${results.improvement.renderTime.toFixed(<span class="hljs-number">1</span>)}</span>%\`</span>,
        },
        <span class="hljs-string">&#x27;Re-renders&#x27;</span>: {
          <span class="hljs-title class_">Before</span>: results.<span class="hljs-property">original</span>.<span class="hljs-property">reRenderCount</span>,
          <span class="hljs-title class_">After</span>: results.<span class="hljs-property">optimized</span>.<span class="hljs-property">reRenderCount</span>,
          <span class="hljs-title class_">Improvement</span>: results.<span class="hljs-property">improvement</span>.<span class="hljs-property">reRenderCount</span>,
        },
      });
    },
  };
}

<span class="hljs-comment">// Usage in development</span>
<span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
  <span class="hljs-keyword">const</span> debugTools = <span class="hljs-title function_">createCompilerDebugTools</span>();

  <span class="hljs-comment">// Enable for specific components</span>
  <span class="hljs-variable language_">window</span>.<span class="hljs-property">debugCompiler</span> = debugTools;
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
