const s="kinney",a="react-performance",n="أداء React",l="image-and-asset-optimization",p="تحسين الصور والأصول لـ React",t=[{depth:2,id:"فهم-أثر-أداء-الصور",text:"فهم أثر أداء الصور"},{depth:2,id:"صيغ-الصور-الحديثة-ومتى-تستخدمها",text:"صيغ الصور الحديثة ومتى تستخدمها"},{depth:3,id:"مقارنة-الصيغ-واختيارها",text:"مقارنة الصيغ واختيارها"},{depth:3,id:"مكون-react-مع-بدائل-احتياطية-للصيغ",text:"مكوّن React مع بدائل احتياطية للصيغ"},{depth:2,id:"تنفيذ-الصور-المتجاوبة",text:"تنفيذ الصور المتجاوبة"},{depth:3,id:"خطاف-الصور-المتجاوبة",text:"خُطّاف الصور المتجاوبة"},{depth:3,id:"التوجيه-الفني-بعنصر-picture",text:"التوجيه الفني بعنصر picture"},{depth:2,id:"استراتيجيات-التحميل-الكسول-المتقدمة",text:"استراتيجيات التحميل الكسول المتقدمة"},{depth:3,id:"التحميل-التدريجي-للصور",text:"التحميل التدريجي للصور"},{depth:3,id:"التحميل-الكسول-الأصلي-مع-بديل-احتياطي",text:"التحميل الكسول الأصلي مع بديل احتياطي"},{depth:2,id:"تحسين-الصور-المتقدم",text:"تحسين الصور المتقدّم"},{depth:2,id:"قائمة-التحقق-لتحسين-الصور",text:"قائمة التحقق لتحسين الصور"}],e=`<p>الصور هي قاتل الأداء الصامت في الويب الحديث. صورة الواجهة الرئيسية في صفحتك التعريفية؟ غالبًا 2MB. صور المنتجات المصغّرة؟ تُحمَّل بدقتها الكاملة. رسومات مقالات المدونة؟ بصيغة PNG مع أنها يجب أن تكون WebP. قد يملك تطبيق React لديك شيفرة JavaScript فائقة السرعة، لكن إن كنت ترسل ميغابايتات من الصور غير المحسّنة، فمستخدموك لا يزالون ينتظرون — والمستخدمون المنتظرون يصبحون مستخدمين سابقين.</p>
<p>والخبر السار أن تحسين الصور في React لم يكن يومًا أقوى مما هو الآن. يمكن للصيغ الحديثة مثل WebP وAVIF خفض أحجام الملفات بنسبة 50% أو أكثر. وتضمن الصور المتجاوبة (responsive images) ألا ينزّل مستخدمو الجوال أصولًا بحجم سطح المكتب. ويُبقي التحميل الكسول أوقات التحميل الأولى سريعة. ومع تهيئة CDN الصحيحة، تُحمَّل صورك من خوادم قريبة من مستخدميك، لا من عبر الكرة الأرضية. يوضّح هذا الدليل كيفية تنفيذ كل هذه التقنيات في تطبيقات React لديك.</p>
<h2 id="فهم-أثر-أداء-الصور">فهم أثر أداء الصور</h2>
<p>قبل التحسين، افهم كيف تؤثر الصور في أداء تطبيقك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Image performance metrics and their impact</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImagePerformanceImpact</span> {
  <span class="hljs-comment">// Network impact</span>
  <span class="hljs-attr">network</span>: {
    <span class="hljs-attr">bandwidth</span>: <span class="hljs-string">&#x27;Images often account for 60-70% of page weight&#x27;</span>;
    <span class="hljs-attr">requests</span>: <span class="hljs-string">&#x27;Each image is a separate HTTP request&#x27;</span>;
    <span class="hljs-attr">blocking</span>: <span class="hljs-string">&#x27;Images can block critical resources&#x27;</span>;
    <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;Above-fold images compete with JavaScript&#x27;</span>;
  };

  <span class="hljs-comment">// Rendering impact</span>
  <span class="hljs-attr">rendering</span>: {
    <span class="hljs-attr">layoutShift</span>: <span class="hljs-string">&#x27;Images without dimensions cause CLS&#x27;</span>;
    <span class="hljs-attr">paintDelay</span>: <span class="hljs-string">&#x27;Large images delay Largest Contentful Paint&#x27;</span>;
    <span class="hljs-attr">decoding</span>: <span class="hljs-string">&#x27;Image decoding blocks the main thread&#x27;</span>;
    <span class="hljs-attr">memory</span>: <span class="hljs-string">&#x27;Decoded images consume significant RAM&#x27;</span>;
  };

  <span class="hljs-comment">// User experience impact</span>
  <span class="hljs-attr">ux</span>: {
    <span class="hljs-attr">perceivedSpeed</span>: <span class="hljs-string">&#x27;Slow images make entire app feel sluggish&#x27;</span>;
    <span class="hljs-attr">dataCost</span>: <span class="hljs-string">&#x27;Large images cost users money on mobile&#x27;</span>;
    <span class="hljs-attr">battery</span>: <span class="hljs-string">&#x27;Image processing drains battery&#x27;</span>;
    <span class="hljs-attr">engagement</span>: <span class="hljs-string">&#x27;1 second delay = 7% conversion loss&#x27;</span>;
  };
}
</code></pre>
<h2 id="صيغ-الصور-الحديثة-ومتى-تستخدمها">صيغ الصور الحديثة ومتى تستخدمها</h2>
<h3 id="مقارنة-الصيغ-واختيارها">مقارنة الصيغ واختيارها</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/imageFormat.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImageFormat</span> {
  <span class="hljs-attr">extension</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">mimeType</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">support</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Browser support percentage</span>
  <span class="hljs-attr">compression</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// Typical compression vs PNG</span>
  <span class="hljs-attr">useCase</span>: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">hasAlpha</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">hasAnimation</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">imageFormats</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">ImageFormat</span>&gt; = {
  <span class="hljs-attr">webp</span>: {
    <span class="hljs-attr">extension</span>: <span class="hljs-string">&#x27;.webp&#x27;</span>,
    <span class="hljs-attr">mimeType</span>: <span class="hljs-string">&#x27;image/webp&#x27;</span>,
    <span class="hljs-attr">support</span>: <span class="hljs-number">95</span>,
    <span class="hljs-attr">compression</span>: <span class="hljs-number">0.7</span>, <span class="hljs-comment">// 30% smaller than PNG</span>
    <span class="hljs-attr">useCase</span>: [<span class="hljs-string">&#x27;photos&#x27;</span>, <span class="hljs-string">&#x27;graphics&#x27;</span>, <span class="hljs-string">&#x27;screenshots&#x27;</span>],
    <span class="hljs-attr">hasAlpha</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">hasAnimation</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">avif</span>: {
    <span class="hljs-attr">extension</span>: <span class="hljs-string">&#x27;.avif&#x27;</span>,
    <span class="hljs-attr">mimeType</span>: <span class="hljs-string">&#x27;image/avif&#x27;</span>,
    <span class="hljs-attr">support</span>: <span class="hljs-number">75</span>,
    <span class="hljs-attr">compression</span>: <span class="hljs-number">0.5</span>, <span class="hljs-comment">// 50% smaller than PNG</span>
    <span class="hljs-attr">useCase</span>: [<span class="hljs-string">&#x27;photos&#x27;</span>, <span class="hljs-string">&#x27;high-quality images&#x27;</span>],
    <span class="hljs-attr">hasAlpha</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">hasAnimation</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">jpeg</span>: {
    <span class="hljs-attr">extension</span>: <span class="hljs-string">&#x27;.jpg&#x27;</span>,
    <span class="hljs-attr">mimeType</span>: <span class="hljs-string">&#x27;image/jpeg&#x27;</span>,
    <span class="hljs-attr">support</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">compression</span>: <span class="hljs-number">0.8</span>,
    <span class="hljs-attr">useCase</span>: [<span class="hljs-string">&#x27;photos&#x27;</span>, <span class="hljs-string">&#x27;complex images&#x27;</span>],
    <span class="hljs-attr">hasAlpha</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">hasAnimation</span>: <span class="hljs-literal">false</span>,
  },
  <span class="hljs-attr">png</span>: {
    <span class="hljs-attr">extension</span>: <span class="hljs-string">&#x27;.png&#x27;</span>,
    <span class="hljs-attr">mimeType</span>: <span class="hljs-string">&#x27;image/png&#x27;</span>,
    <span class="hljs-attr">support</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">compression</span>: <span class="hljs-number">1.0</span>,
    <span class="hljs-attr">useCase</span>: [<span class="hljs-string">&#x27;graphics&#x27;</span>, <span class="hljs-string">&#x27;logos&#x27;</span>, <span class="hljs-string">&#x27;screenshots&#x27;</span>],
    <span class="hljs-attr">hasAlpha</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">hasAnimation</span>: <span class="hljs-literal">false</span>,
  },
};

<span class="hljs-comment">// Automatic format selection based on content</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">selectOptimalFormat</span>(<span class="hljs-params">
  <span class="hljs-attr">imageType</span>: <span class="hljs-string">&#x27;photo&#x27;</span> | <span class="hljs-string">&#x27;graphic&#x27;</span> | <span class="hljs-string">&#x27;logo&#x27;</span>,
  <span class="hljs-attr">needsAlpha</span>: <span class="hljs-built_in">boolean</span>,
  <span class="hljs-attr">browserSupport</span>: <span class="hljs-built_in">string</span>[],
</span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-comment">// Check AVIF support first (best compression)</span>
  <span class="hljs-keyword">if</span> (browserSupport.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;avif&#x27;</span>) &amp;&amp; imageType === <span class="hljs-string">&#x27;photo&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;avif&#x27;</span>;
  }

  <span class="hljs-comment">// WebP for broad support with good compression</span>
  <span class="hljs-keyword">if</span> (browserSupport.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;webp&#x27;</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;webp&#x27;</span>;
  }

  <span class="hljs-comment">// Fallback to traditional formats</span>
  <span class="hljs-keyword">if</span> (needsAlpha || imageType === <span class="hljs-string">&#x27;logo&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;png&#x27;</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;jpeg&#x27;</span>;
}
</code></pre>
<h3 id="مكون-react-مع-بدائل-احتياطية-للصيغ">مكوّن React مع بدائل احتياطية للصيغ</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/OptimizedImage.tsx</span>
<span class="hljs-keyword">import</span> { useState, useEffect, useRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">OptimizedImageProps</span> {
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">alt</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">width</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">sizes</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">loading</span>?: <span class="hljs-string">&#x27;lazy&#x27;</span> | <span class="hljs-string">&#x27;eager&#x27;</span>;
  <span class="hljs-attr">priority</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onLoad</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizedImage</span>(<span class="hljs-params">{
  src,
  alt,
  width,
  height,
  sizes = <span class="hljs-string">&#x27;100vw&#x27;</span>,
  loading = <span class="hljs-string">&#x27;lazy&#x27;</span>,
  priority = <span class="hljs-literal">false</span>,
  onLoad,
  className,
}: <span class="hljs-title class_">OptimizedImageProps</span></span>) {
  <span class="hljs-keyword">const</span> [isIntersecting, setIsIntersecting] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [hasLoaded, setHasLoaded] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> imgRef = useRef&lt;<span class="hljs-title class_">HTMLImageElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> pictureRef = useRef&lt;<span class="hljs-title class_">HTMLPictureElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Generate optimized source sets</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">generateSrcSet</span> = (<span class="hljs-params"><span class="hljs-attr">format</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> basePath = src.<span class="hljs-title function_">substring</span>(<span class="hljs-number">0</span>, src.<span class="hljs-title function_">lastIndexOf</span>(<span class="hljs-string">&#x27;.&#x27;</span>));
    <span class="hljs-keyword">const</span> widths = [<span class="hljs-number">320</span>, <span class="hljs-number">640</span>, <span class="hljs-number">768</span>, <span class="hljs-number">1024</span>, <span class="hljs-number">1280</span>, <span class="hljs-number">1920</span>];

    <span class="hljs-keyword">return</span> widths.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">w</span>) =&gt;</span> <span class="hljs-string">\`<span class="hljs-subst">\${basePath}</span>-<span class="hljs-subst">\${w}</span>w.<span class="hljs-subst">\${format}</span> <span class="hljs-subst">\${w}</span>w\`</span>).<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;, &#x27;</span>);
  };

  <span class="hljs-comment">// Intersection Observer for lazy loading</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (loading === <span class="hljs-string">&#x27;eager&#x27;</span> || priority) {
      <span class="hljs-title function_">setIsIntersecting</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
      <span class="hljs-function">(<span class="hljs-params">[entry]</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span>) {
          <span class="hljs-title function_">setIsIntersecting</span>(<span class="hljs-literal">true</span>);
          observer.<span class="hljs-title function_">disconnect</span>();
        }
      },
      {
        <span class="hljs-attr">rootMargin</span>: <span class="hljs-string">&#x27;50px&#x27;</span>,
      },
    );

    <span class="hljs-keyword">if</span> (pictureRef.<span class="hljs-property">current</span>) {
      observer.<span class="hljs-title function_">observe</span>(pictureRef.<span class="hljs-property">current</span>);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> observer.<span class="hljs-title function_">disconnect</span>();
  }, [loading, priority]);

  <span class="hljs-comment">// Preload priority images</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (priority &amp;&amp; !hasLoaded) {
      <span class="hljs-keyword">const</span> link = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;link&#x27;</span>);
      link.<span class="hljs-property">rel</span> = <span class="hljs-string">&#x27;preload&#x27;</span>;
      link.<span class="hljs-property">as</span> = <span class="hljs-string">&#x27;image&#x27;</span>;
      link.<span class="hljs-property">href</span> = src;

      <span class="hljs-comment">// Add responsive preload</span>
      <span class="hljs-keyword">if</span> (sizes) {
        link.<span class="hljs-property">sizes</span> = sizes;
      }

      <span class="hljs-comment">// Check WebP support for preload</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-title function_">supportsWebP</span>()) {
        link.<span class="hljs-property">type</span> = <span class="hljs-string">&#x27;image/webp&#x27;</span>;
        link.<span class="hljs-property">href</span> = src.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/\\.[^.]+$/</span>, <span class="hljs-string">&#x27;.webp&#x27;</span>);
      }

      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(link);

      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">removeChild</span>(link);
      };
    }
  }, [priority, src, sizes, hasLoaded]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleLoad</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setHasLoaded</span>(<span class="hljs-literal">true</span>);
    onLoad?.();
  };

  <span class="hljs-comment">// Don&#x27;t render until intersecting (for lazy loading)</span>
  <span class="hljs-keyword">if</span> (!isIntersecting &amp;&amp; loading === <span class="hljs-string">&#x27;lazy&#x27;</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{pictureRef</span> <span class="hljs-attr">as</span> <span class="hljs-attr">any</span>}
        <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">width</span>,
          <span class="hljs-attr">height</span>,
          <span class="hljs-attr">backgroundColor:</span> &#x27;#<span class="hljs-attr">f0f0f0</span>&#x27;,
        }}
        <span class="hljs-attr">aria-label</span>=<span class="hljs-string">{alt}</span>
      /&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">picture</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{pictureRef}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>
      {/* AVIF source (best compression) */}
      <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;image/avif&quot;</span> <span class="hljs-attr">srcSet</span>=<span class="hljs-string">{generateSrcSet(</span>&#x27;<span class="hljs-attr">avif</span>&#x27;)} <span class="hljs-attr">sizes</span>=<span class="hljs-string">{sizes}</span> /&gt;</span>

      {/* WebP source (good compression, wide support) */}
      <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;image/webp&quot;</span> <span class="hljs-attr">srcSet</span>=<span class="hljs-string">{generateSrcSet(</span>&#x27;<span class="hljs-attr">webp</span>&#x27;)} <span class="hljs-attr">sizes</span>=<span class="hljs-string">{sizes}</span> /&gt;</span>

      {/* Fallback to original format */}
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{imgRef}</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">{src}</span>
        <span class="hljs-attr">alt</span>=<span class="hljs-string">{alt}</span>
        <span class="hljs-attr">width</span>=<span class="hljs-string">{width}</span>
        <span class="hljs-attr">height</span>=<span class="hljs-string">{height}</span>
        <span class="hljs-attr">loading</span>=<span class="hljs-string">{loading}</span>
        <span class="hljs-attr">decoding</span>=<span class="hljs-string">{priority</span> ? &#x27;<span class="hljs-attr">sync</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">async</span>&#x27;}
        <span class="hljs-attr">onLoad</span>=<span class="hljs-string">{handleLoad}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">opacity:</span> <span class="hljs-attr">hasLoaded</span> ? <span class="hljs-attr">1</span> <span class="hljs-attr">:</span> <span class="hljs-attr">0</span>,
          <span class="hljs-attr">transition:</span> &#x27;<span class="hljs-attr">opacity</span> <span class="hljs-attr">0.3s</span>&#x27;,
        }}
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">picture</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Utility to check WebP support</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">webpSupport</span>: <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">supportsWebP</span>(<span class="hljs-params"></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-keyword">if</span> (webpSupport !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> webpSupport;

  <span class="hljs-keyword">const</span> canvas = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;canvas&#x27;</span>);
  canvas.<span class="hljs-property">width</span> = <span class="hljs-number">1</span>;
  canvas.<span class="hljs-property">height</span> = <span class="hljs-number">1</span>;

  webpSupport = canvas.<span class="hljs-title function_">toDataURL</span>(<span class="hljs-string">&#x27;image/webp&#x27;</span>).<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">&#x27;image/webp&#x27;</span>) === <span class="hljs-number">5</span>;
  <span class="hljs-keyword">return</span> webpSupport;
}
</code></pre>
<h2 id="تنفيذ-الصور-المتجاوبة">تنفيذ الصور المتجاوبة</h2>
<h3 id="خطاف-الصور-المتجاوبة">خُطّاف الصور المتجاوبة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// hooks/useResponsiveImage.ts</span>
<span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ResponsiveImageConfig</span> {
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">breakpoints</span>?: {
    <span class="hljs-attr">mobile</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">tablet</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">desktop</span>?: <span class="hljs-built_in">number</span>;
  };
  <span class="hljs-attr">quality</span>?: {
    <span class="hljs-attr">mobile</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">tablet</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">desktop</span>?: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useResponsiveImage</span>(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-title class_">ResponsiveImageConfig</span></span>) {
  <span class="hljs-keyword">const</span> [currentSrc, setCurrentSrc] = <span class="hljs-title function_">useState</span>(config.<span class="hljs-property">src</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-keyword">const</span> breakpoints = {
    <span class="hljs-attr">mobile</span>: <span class="hljs-number">640</span>,
    <span class="hljs-attr">tablet</span>: <span class="hljs-number">1024</span>,
    <span class="hljs-attr">desktop</span>: <span class="hljs-number">1920</span>,
    ...config.<span class="hljs-property">breakpoints</span>,
  };

  <span class="hljs-keyword">const</span> quality = {
    <span class="hljs-attr">mobile</span>: <span class="hljs-number">70</span>,
    <span class="hljs-attr">tablet</span>: <span class="hljs-number">80</span>,
    <span class="hljs-attr">desktop</span>: <span class="hljs-number">90</span>,
    ...config.<span class="hljs-property">quality</span>,
  };

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateImageSource</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> width = <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>;
      <span class="hljs-keyword">const</span> dpr = <span class="hljs-variable language_">window</span>.<span class="hljs-property">devicePixelRatio</span> || <span class="hljs-number">1</span>;

      <span class="hljs-keyword">let</span> <span class="hljs-attr">breakpoint</span>: <span class="hljs-string">&#x27;mobile&#x27;</span> | <span class="hljs-string">&#x27;tablet&#x27;</span> | <span class="hljs-string">&#x27;desktop&#x27;</span>;
      <span class="hljs-keyword">let</span> <span class="hljs-attr">targetWidth</span>: <span class="hljs-built_in">number</span>;

      <span class="hljs-keyword">if</span> (width &lt;= breakpoints.<span class="hljs-property">mobile</span>) {
        breakpoint = <span class="hljs-string">&#x27;mobile&#x27;</span>;
        targetWidth = breakpoints.<span class="hljs-property">mobile</span>;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (width &lt;= breakpoints.<span class="hljs-property">tablet</span>) {
        breakpoint = <span class="hljs-string">&#x27;tablet&#x27;</span>;
        targetWidth = breakpoints.<span class="hljs-property">tablet</span>;
      } <span class="hljs-keyword">else</span> {
        breakpoint = <span class="hljs-string">&#x27;desktop&#x27;</span>;
        targetWidth = breakpoints.<span class="hljs-property">desktop</span>;
      }

      <span class="hljs-comment">// Adjust for device pixel ratio</span>
      targetWidth = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(targetWidth * dpr);

      <span class="hljs-comment">// Generate optimized URL</span>
      <span class="hljs-keyword">const</span> optimizedSrc = <span class="hljs-title function_">generateOptimizedUrl</span>(config.<span class="hljs-property">src</span>, targetWidth, quality[breakpoint]);

      <span class="hljs-title function_">setCurrentSrc</span>(optimizedSrc);
    };

    <span class="hljs-title function_">updateImageSource</span>();

    <span class="hljs-comment">// Debounced resize handler</span>
    <span class="hljs-keyword">let</span> <span class="hljs-attr">timeoutId</span>: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span>;
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleResize</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-built_in">clearTimeout</span>(timeoutId);
      timeoutId = <span class="hljs-built_in">setTimeout</span>(updateImageSource, <span class="hljs-number">300</span>);
    };

    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;resize&#x27;</span>, handleResize);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;resize&#x27;</span>, handleResize);
      <span class="hljs-built_in">clearTimeout</span>(timeoutId);
    };
  }, [config.<span class="hljs-property">src</span>, breakpoints, quality]);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">src</span>: currentSrc,
    <span class="hljs-attr">srcSet</span>: <span class="hljs-title function_">generateSrcSet</span>(config.<span class="hljs-property">src</span>),
    <span class="hljs-attr">sizes</span>: <span class="hljs-title function_">generateSizes</span>(breakpoints),
    isLoading,
    setIsLoading,
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">generateOptimizedUrl</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">quality</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-comment">// If using a CDN that supports on-the-fly optimization</span>
  <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(src);
  url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;w&#x27;</span>, width.<span class="hljs-title function_">toString</span>());
  url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;q&#x27;</span>, quality.<span class="hljs-title function_">toString</span>());
  url.<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;auto&#x27;</span>, <span class="hljs-string">&#x27;format&#x27;</span>); <span class="hljs-comment">// Auto-select best format</span>

  <span class="hljs-keyword">return</span> url.<span class="hljs-title function_">toString</span>();
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">generateSrcSet</span>(<span class="hljs-params"><span class="hljs-attr">baseSrc</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">const</span> widths = [<span class="hljs-number">320</span>, <span class="hljs-number">640</span>, <span class="hljs-number">768</span>, <span class="hljs-number">1024</span>, <span class="hljs-number">1280</span>, <span class="hljs-number">1920</span>, <span class="hljs-number">2560</span>];

  <span class="hljs-keyword">return</span> widths
    .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">w</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> url = <span class="hljs-title function_">generateOptimizedUrl</span>(baseSrc, w, <span class="hljs-number">85</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${url}</span> <span class="hljs-subst">\${w}</span>w\`</span>;
    })
    .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;, &#x27;</span>);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">generateSizes</span>(<span class="hljs-params"><span class="hljs-attr">breakpoints</span>: <span class="hljs-built_in">any</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`
    (max-width: <span class="hljs-subst">\${breakpoints.mobile}</span>px) 100vw,
    (max-width: <span class="hljs-subst">\${breakpoints.tablet}</span>px) 50vw,
    33vw
  \`</span>.<span class="hljs-title function_">trim</span>();
}
</code></pre>
<h3 id="التوجيه-الفني-بعنصر-picture">التوجيه الفني بعنصر picture</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/ArtDirectedImage.tsx</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ArtDirectedImageProps</span> {
  <span class="hljs-attr">sources</span>: {
    <span class="hljs-attr">mobile</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">tablet</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">desktop</span>: <span class="hljs-built_in">string</span>;
  };
  <span class="hljs-attr">alt</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ArtDirectedImage</span>(<span class="hljs-params">{ sources, alt, className }: <span class="hljs-title class_">ArtDirectedImageProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">picture</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>
      {/* Mobile-specific image (portrait crop) */}
      {sources.mobile &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">source</span>
          <span class="hljs-attr">media</span>=<span class="hljs-string">&quot;(max-width: 640px)&quot;</span>
          <span class="hljs-attr">srcSet</span>=<span class="hljs-string">{</span>\`
            \${<span class="hljs-attr">sources.mobile.replace</span>(&#x27;<span class="hljs-attr">.jpg</span>&#x27;, &#x27;<span class="hljs-attr">-320w.webp</span>&#x27;)} <span class="hljs-attr">320w</span>,
            \${<span class="hljs-attr">sources.mobile.replace</span>(&#x27;<span class="hljs-attr">.jpg</span>&#x27;, &#x27;<span class="hljs-attr">-640w.webp</span>&#x27;)} <span class="hljs-attr">640w</span>
          \`}
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;image/webp&quot;</span>
        /&gt;</span>
      )}

      {/* Tablet-specific image (square crop) */}
      {sources.tablet &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">source</span>
          <span class="hljs-attr">media</span>=<span class="hljs-string">&quot;(max-width: 1024px)&quot;</span>
          <span class="hljs-attr">srcSet</span>=<span class="hljs-string">{</span>\`
            \${<span class="hljs-attr">sources.tablet.replace</span>(&#x27;<span class="hljs-attr">.jpg</span>&#x27;, &#x27;<span class="hljs-attr">-768w.webp</span>&#x27;)} <span class="hljs-attr">768w</span>,
            \${<span class="hljs-attr">sources.tablet.replace</span>(&#x27;<span class="hljs-attr">.jpg</span>&#x27;, &#x27;<span class="hljs-attr">-1024w.webp</span>&#x27;)} <span class="hljs-attr">1024w</span>
          \`}
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;image/webp&quot;</span>
        /&gt;</span>
      )}

      {/* Desktop image (landscape crop) */}
      <span class="hljs-tag">&lt;<span class="hljs-name">source</span>
        <span class="hljs-attr">media</span>=<span class="hljs-string">&quot;(min-width: 1025px)&quot;</span>
        <span class="hljs-attr">srcSet</span>=<span class="hljs-string">{</span>\`
          \${<span class="hljs-attr">sources.desktop.replace</span>(&#x27;<span class="hljs-attr">.jpg</span>&#x27;, &#x27;<span class="hljs-attr">-1280w.webp</span>&#x27;)} <span class="hljs-attr">1280w</span>,
          \${<span class="hljs-attr">sources.desktop.replace</span>(&#x27;<span class="hljs-attr">.jpg</span>&#x27;, &#x27;<span class="hljs-attr">-1920w.webp</span>&#x27;)} <span class="hljs-attr">1920w</span>,
          \${<span class="hljs-attr">sources.desktop.replace</span>(&#x27;<span class="hljs-attr">.jpg</span>&#x27;, &#x27;<span class="hljs-attr">-2560w.webp</span>&#x27;)} <span class="hljs-attr">2560w</span>
        \`}
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;image/webp&quot;</span>
      /&gt;</span>

      {/* Fallback for browsers without picture support */}
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{sources.desktop}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{alt}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span> <span class="hljs-attr">loading</span>=<span class="hljs-string">&quot;lazy&quot;</span> <span class="hljs-attr">decoding</span>=<span class="hljs-string">&quot;async&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">picture</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="استراتيجيات-التحميل-الكسول-المتقدمة">استراتيجيات التحميل الكسول المتقدمة</h2>
<h3 id="التحميل-التدريجي-للصور">التحميل التدريجي للصور</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/ProgressiveImage.tsx</span>
<span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ProgressiveImageProps</span> {
  <span class="hljs-attr">placeholder</span>: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Low-quality placeholder (base64 or small image)</span>
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// Full-quality image</span>
  <span class="hljs-attr">alt</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onLoad</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ProgressiveImage</span>(<span class="hljs-params">{
  placeholder,
  src,
  alt,
  className,
  onLoad,
}: <span class="hljs-title class_">ProgressiveImageProps</span></span>) {
  <span class="hljs-keyword">const</span> [imageSrc, setImageSrc] = <span class="hljs-title function_">useState</span>(placeholder);
  <span class="hljs-keyword">const</span> [imageRef, setImageRef] = useState&lt;<span class="hljs-title class_">HTMLImageElement</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isLoaded, setIsLoaded] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [isInView, setIsInView] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-comment">// Intersection Observer for viewport detection</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">observer</span>: <span class="hljs-title class_">IntersectionObserver</span>;

    <span class="hljs-keyword">if</span> (imageRef) {
      observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
        <span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
          entries.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> {
            <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span>) {
              <span class="hljs-title function_">setIsInView</span>(<span class="hljs-literal">true</span>);
              observer.<span class="hljs-title function_">disconnect</span>();
            }
          });
        },
        { <span class="hljs-attr">threshold</span>: <span class="hljs-number">0.01</span>, <span class="hljs-attr">rootMargin</span>: <span class="hljs-string">&#x27;100px&#x27;</span> },
      );

      observer.<span class="hljs-title function_">observe</span>(imageRef);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (observer) {
        observer.<span class="hljs-title function_">disconnect</span>();
      }
    };
  }, [imageRef]);

  <span class="hljs-comment">// Load full image when in view</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!isInView || isLoaded) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> img = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Image</span>();

    img.<span class="hljs-property">onload</span> = <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setImageSrc</span>(src);
      <span class="hljs-title function_">setIsLoaded</span>(<span class="hljs-literal">true</span>);
      onLoad?.();
    };

    img.<span class="hljs-property">src</span> = src;
  }, [isInView, src, isLoaded, onLoad]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">progressive-image</span> \${<span class="hljs-attr">className</span>}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{setImageRef}</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">{imageSrc}</span>
        <span class="hljs-attr">alt</span>=<span class="hljs-string">{alt}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\` \${<span class="hljs-attr">isLoaded</span> ? &#x27;<span class="hljs-attr">loaded</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">loading</span>&#x27;} \${<span class="hljs-attr">className</span>} \`}
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">filter:</span> <span class="hljs-attr">isLoaded</span> ? &#x27;<span class="hljs-attr">none</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">blur</span>(<span class="hljs-attr">5px</span>)&#x27;,
          <span class="hljs-attr">transition:</span> &#x27;<span class="hljs-attr">filter</span> <span class="hljs-attr">0.3s</span> <span class="hljs-attr">ease-out</span>&#x27;,
        }}
      /&gt;</span>
      {!isLoaded &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;loading-shimmer&quot;</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="التحميل-الكسول-الأصلي-مع-بديل-احتياطي">التحميل الكسول الأصلي مع بديل احتياطي</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/LazyImage.tsx</span>
<span class="hljs-keyword">import</span> { useRef, useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LazyImageProps</span> {
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">alt</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">threshold</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">LazyImage</span>(<span class="hljs-params">{
  src,
  alt,
  fallback = <span class="hljs-string">&#x27;data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;400&quot; height=&quot;300&quot;%3E%3C/svg%3E&#x27;</span>,
  className,
  threshold = <span class="hljs-number">0.01</span>,
}: <span class="hljs-title class_">LazyImageProps</span></span>) {
  <span class="hljs-keyword">const</span> [supportNativeLazy, setSupportNativeLazy] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [imageSrc, setImageSrc] = <span class="hljs-title function_">useState</span>(fallback);
  <span class="hljs-keyword">const</span> imgRef = useRef&lt;<span class="hljs-title class_">HTMLImageElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Check for native lazy loading support</span>
    <span class="hljs-title function_">setSupportNativeLazy</span>(<span class="hljs-string">&#x27;loading&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-title class_">HTMLImageElement</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>);
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (supportNativeLazy) {
      <span class="hljs-title function_">setImageSrc</span>(src);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Fallback to Intersection Observer</span>
    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
      <span class="hljs-function">(<span class="hljs-params">[entry]</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span>) {
          <span class="hljs-title function_">setImageSrc</span>(src);
          observer.<span class="hljs-title function_">disconnect</span>();
        }
      },
      {
        threshold,
        <span class="hljs-attr">rootMargin</span>: <span class="hljs-string">&#x27;50px&#x27;</span>,
      },
    );

    <span class="hljs-keyword">if</span> (imgRef.<span class="hljs-property">current</span>) {
      observer.<span class="hljs-title function_">observe</span>(imgRef.<span class="hljs-property">current</span>);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> observer.<span class="hljs-title function_">disconnect</span>();
  }, [src, supportNativeLazy, threshold]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{imgRef}</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">{imageSrc}</span>
      <span class="hljs-attr">alt</span>=<span class="hljs-string">{alt}</span>
      <span class="hljs-attr">loading</span>=<span class="hljs-string">{supportNativeLazy</span> ? &#x27;<span class="hljs-attr">lazy</span>&#x27; <span class="hljs-attr">:</span> <span class="hljs-attr">undefined</span>}
      <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
    /&gt;</span></span>
  );
}
</code></pre>
<h2 id="تحسين-الصور-المتقدم">تحسين الصور المتقدّم</h2>
<p>للحصول على تحسين متقدّم وشامل للصور يشمل التكامل مع CDN، والمعالجة وقت البناء، ومراقبة الأداء، وخطوط التحسين المؤتمتة، راجع <a href="https://stevekinney.com/courses/react-performance/image-optimization-advanced">تقنيات تحسين الصور المتقدمة</a>.</p>
<p>أبرز الموضوعات المتقدمة التي يغطيها:</p>
<ul>
<li><strong>التكامل مع CDN</strong>: تهيئة CDN متعدد المزوّدين واستراتيجيات التحسين</li>
<li><strong>التحسين وقت البناء</strong>: خطوط معالجة الصور في Webpack وNext.js</li>
<li><strong>مراقبة الأداء</strong>: مقاييس أداء الصور في الوقت الحقيقي وتحليلاتها</li>
<li><strong>التحميل التكيّفي</strong>: تحميل واعٍ بالشبكة باستراتيجيات قائمة على الأولوية</li>
<li><strong>تحسين الذاكرة المؤقتة</strong>: استراتيجيات تخزين مؤقت متقدمة للصور والتحويلات</li>
</ul>
<h2 id="قائمة-التحقق-لتحسين-الصور">قائمة التحقق لتحسين الصور</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImageOptimizationChecklist</span> {
  <span class="hljs-attr">formats</span>: {
    <span class="hljs-attr">useModernFormats</span>: <span class="hljs-string">&#x27;Use WebP/AVIF with fallbacks&#x27;</span>;
    <span class="hljs-attr">appropriateFormat</span>: <span class="hljs-string">&#x27;JPEG for photos, PNG for graphics&#x27;</span>;
    <span class="hljs-attr">svg</span>: <span class="hljs-string">&#x27;Use SVG for logos and icons&#x27;</span>;
  };

  <span class="hljs-attr">dimensions</span>: {
    <span class="hljs-attr">specifyDimensions</span>: <span class="hljs-string">&#x27;Always set width/height to prevent CLS&#x27;</span>;
    <span class="hljs-attr">responsiveImages</span>: <span class="hljs-string">&#x27;Provide multiple sizes via srcset&#x27;</span>;
    <span class="hljs-attr">artDirection</span>: <span class="hljs-string">&#x27;Use picture element for different crops&#x27;</span>;
  };

  <span class="hljs-attr">loading</span>: {
    <span class="hljs-attr">lazyLoad</span>: <span class="hljs-string">&#x27;Lazy load below-fold images&#x27;</span>;
    <span class="hljs-attr">priorityLoad</span>: <span class="hljs-string">&#x27;Preload above-fold critical images&#x27;</span>;
    <span class="hljs-attr">progressive</span>: <span class="hljs-string">&#x27;Use progressive enhancement&#x27;</span>;
  };

  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">compress</span>: <span class="hljs-string">&#x27;Compress images (85% quality usually sufficient)&#x27;</span>;
    <span class="hljs-attr">rightSize</span>: <span class="hljs-string">&#x27;Serve correctly sized images for viewport&#x27;</span>;
    <span class="hljs-attr">cdn</span>: <span class="hljs-string">&#x27;Serve images from CDN&#x27;</span>;
  };

  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">measure</span>: <span class="hljs-string">&#x27;Track image loading metrics&#x27;</span>;
    <span class="hljs-attr">budget</span>: <span class="hljs-string">&#x27;Set and enforce image size budgets&#x27;</span>;
    <span class="hljs-attr">monitor</span>: <span class="hljs-string">&#x27;Monitor Core Web Vitals impact&#x27;</span>;
  };
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
