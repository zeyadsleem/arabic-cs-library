const s="kinney",a="react-performance",n="أداء React",l="image-optimization-advanced",p="تقنيات تحسين الصور المتقدمة",t=[{depth:2,id:"التكامل-مع-cdn-وتحسينه",text:"التكامل مع CDN وتحسينه"},{depth:3,id:"مساعد-تهيئة-cdn",text:"مساعد تهيئة CDN"},{depth:3,id:"استراتيجية-تخزين-مؤقت-ذكية-في-cdn",text:"استراتيجية تخزين مؤقت ذكية في CDN"},{depth:2,id:"أنماط-أداء-تحميل-الصور",text:"أنماط أداء تحميل الصور"},{depth:3,id:"استراتيجية-التحميل-حسب-الأولوية",text:"استراتيجية التحميل حسب الأولوية"},{depth:3,id:"التحميل-التكيفي-بناء-على-الشبكة",text:"التحميل التكيّفي بناءً على الشبكة"},{depth:2,id:"تحسين-الصور-وقت-البناء",text:"تحسين الصور وقت البناء"},{depth:3,id:"تحسين-الصور-في-webpack",text:"تحسين الصور في Webpack"},{depth:3,id:"تهيئة-مكون-الصور-في-nextjs",text:"تهيئة مكوّن الصور في Next.js"},{depth:2,id:"مراقبة-الأداء-والمقاييس",text:"مراقبة الأداء والمقاييس"}],e=`<p>يتجاوز تحسين الصور المتقدّم الصور المتجاوبة الأساسية والتحميل الكسول. يغطي هذا الدليل التكامل مع CDN، والتحسين وقت البناء، ومراقبة الأداء، وخطوط التحسين المؤتمتة التي تضمن أداء صورك على النحو الأمثل عند التوسّع في بيئات الإنتاج.</p>
<h2 id="التكامل-مع-cdn-وتحسينه">التكامل مع CDN وتحسينه</h2>
<h3 id="مساعد-تهيئة-cdn">مساعد تهيئة CDN</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/cdn.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CDNConfig</span> {
  <span class="hljs-attr">baseUrl</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">transformations</span>: {
    <span class="hljs-attr">format</span>?: <span class="hljs-string">&#x27;auto&#x27;</span> | <span class="hljs-string">&#x27;webp&#x27;</span> | <span class="hljs-string">&#x27;avif&#x27;</span>;
    <span class="hljs-attr">quality</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">width</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">height</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">fit</span>?: <span class="hljs-string">&#x27;cover&#x27;</span> | <span class="hljs-string">&#x27;contain&#x27;</span> | <span class="hljs-string">&#x27;fill&#x27;</span> | <span class="hljs-string">&#x27;inside&#x27;</span> | <span class="hljs-string">&#x27;outside&#x27;</span>;
    <span class="hljs-attr">dpr</span>?: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">CDNImageOptimizer</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">CDNConfig</span></span>) {}

  <span class="hljs-title function_">generateUrl</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">CDNConfig</span>[<span class="hljs-string">&#x27;transformations&#x27;</span>]&gt; = {}): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> transformations = { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">transformations</span>, ...options };

    <span class="hljs-comment">// Cloudinary format</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">baseUrl</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;cloudinary&#x27;</span>)) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">cloudinaryUrl</span>(path, transformations);
    }

    <span class="hljs-comment">// Imgix format</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">baseUrl</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;imgix&#x27;</span>)) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">imgixUrl</span>(path, transformations);
    }

    <span class="hljs-comment">// Cloudflare Images format</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">baseUrl</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;cloudflare&#x27;</span>)) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">cloudflareUrl</span>(path, transformations);
    }

    <span class="hljs-comment">// Generic CDN with query params</span>
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">genericUrl</span>(path, transformations);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">cloudinaryUrl</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">transforms</span>: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> transformString = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(transforms)
      .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[key, value]</span>) =&gt;</span> {
        <span class="hljs-keyword">switch</span> (key) {
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;width&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`w_<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;height&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`h_<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;quality&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`q_<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;format&#x27;</span>:
            <span class="hljs-keyword">return</span> value === <span class="hljs-string">&#x27;auto&#x27;</span> ? <span class="hljs-string">&#x27;f_auto&#x27;</span> : <span class="hljs-string">\`f_<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;dpr&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`dpr_<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;fit&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`c_<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-attr">default</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>;
        }
      })
      .<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>)
      .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;,&#x27;</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.config.baseUrl}</span>/<span class="hljs-subst">\${transformString}</span>/<span class="hljs-subst">\${path}</span>\`</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">imgixUrl</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">transforms</span>: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>();

    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(transforms).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[key, value]</span>) =&gt;</span> {
      <span class="hljs-keyword">switch</span> (key) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;width&#x27;</span>:
          params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;w&#x27;</span>, value.<span class="hljs-title function_">toString</span>());
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;height&#x27;</span>:
          params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;h&#x27;</span>, value.<span class="hljs-title function_">toString</span>());
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;quality&#x27;</span>:
          params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;q&#x27;</span>, value.<span class="hljs-title function_">toString</span>());
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;format&#x27;</span>:
          <span class="hljs-keyword">if</span> (value === <span class="hljs-string">&#x27;auto&#x27;</span>) {
            params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;auto&#x27;</span>, <span class="hljs-string">&#x27;format&#x27;</span>);
          } <span class="hljs-keyword">else</span> {
            params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;fm&#x27;</span>, value.<span class="hljs-title function_">toString</span>());
          }
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;dpr&#x27;</span>:
          params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;dpr&#x27;</span>, value.<span class="hljs-title function_">toString</span>());
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;fit&#x27;</span>:
          params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;fit&#x27;</span>, value.<span class="hljs-title function_">toString</span>());
          <span class="hljs-keyword">break</span>;
      }
    });

    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.config.baseUrl}</span>/<span class="hljs-subst">\${path}</span>?<span class="hljs-subst">\${params.toString()}</span>\`</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">cloudflareUrl</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">transforms</span>: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> options = <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(transforms)
      .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">[key, value]</span>) =&gt;</span> {
        <span class="hljs-keyword">switch</span> (key) {
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;width&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`width=<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;height&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`height=<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;quality&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`quality=<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;format&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`format=<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;fit&#x27;</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">\`fit=<span class="hljs-subst">\${value}</span>\`</span>;
          <span class="hljs-attr">default</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;&#x27;</span>;
        }
      })
      .<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>)
      .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;,&#x27;</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.config.baseUrl}</span>/cdn-cgi/image/<span class="hljs-subst">\${options}</span>/<span class="hljs-subst">\${path}</span>\`</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">genericUrl</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">transforms</span>: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>();
    <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">entries</span>(transforms).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">[key, value]</span>) =&gt;</span> {
      params.<span class="hljs-title function_">set</span>(key, value.<span class="hljs-title function_">toString</span>());
    });

    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.config.baseUrl}</span>/<span class="hljs-subst">\${path}</span>?<span class="hljs-subst">\${params.toString()}</span>\`</span>;
  }
}

<span class="hljs-comment">// React hook for CDN images</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useCDNImage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> optimizer = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">CDNImageOptimizer</span>({
      <span class="hljs-attr">baseUrl</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">NEXT_PUBLIC_CDN_URL</span> || <span class="hljs-string">&#x27;&#x27;</span>,
      <span class="hljs-attr">transformations</span>: {
        <span class="hljs-attr">format</span>: <span class="hljs-string">&#x27;auto&#x27;</span>,
        <span class="hljs-attr">quality</span>: <span class="hljs-number">80</span>,
      },
    });
  }, []);

  <span class="hljs-keyword">const</span> generateSrcSet = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">widths</span>: <span class="hljs-built_in">number</span>[]</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> widths
        .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">width</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> url = optimizer.<span class="hljs-title function_">generateUrl</span>(path, { width });
          <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${url}</span> <span class="hljs-subst">\${width}</span>w\`</span>;
        })
        .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;, &#x27;</span>);
    },
    [optimizer],
  );

  <span class="hljs-keyword">const</span> generateUrl = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>?: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> optimizer.<span class="hljs-title function_">generateUrl</span>(path, options);
    },
    [optimizer],
  );

  <span class="hljs-keyword">return</span> { generateUrl, generateSrcSet };
}
</code></pre>
<h3 id="استراتيجية-تخزين-مؤقت-ذكية-في-cdn">استراتيجية تخزين مؤقت ذكية في CDN</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// CDN cache optimization</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CacheStrategy</span> {
  <span class="hljs-attr">images</span>: {
    <span class="hljs-attr">maxAge</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">staleWhileRevalidate</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">immutable</span>?: <span class="hljs-built_in">boolean</span>;
  };
  <span class="hljs-attr">transforms</span>: {
    <span class="hljs-attr">maxAge</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">staleWhileRevalidate</span>: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">cacheStrategy</span>: <span class="hljs-title class_">CacheStrategy</span> = {
  <span class="hljs-attr">images</span>: {
    <span class="hljs-attr">maxAge</span>: <span class="hljs-number">31536000</span>, <span class="hljs-comment">// 1 year for original images</span>
    <span class="hljs-attr">staleWhileRevalidate</span>: <span class="hljs-number">86400</span>, <span class="hljs-comment">// 1 day</span>
    <span class="hljs-attr">immutable</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">transforms</span>: {
    <span class="hljs-attr">maxAge</span>: <span class="hljs-number">2592000</span>, <span class="hljs-comment">// 30 days for transformed images</span>
    <span class="hljs-attr">staleWhileRevalidate</span>: <span class="hljs-number">86400</span>, <span class="hljs-comment">// 1 day</span>
  },
};

<span class="hljs-comment">// Cloudflare Worker for image optimization</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt; {
    <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(request.<span class="hljs-property">url</span>);
    <span class="hljs-keyword">const</span> { pathname, searchParams } = url;

    <span class="hljs-comment">// Extract image path and transformation params</span>
    <span class="hljs-keyword">const</span> imagePath = pathname.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&#x27;/images/&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>);
    <span class="hljs-keyword">const</span> width = searchParams.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;w&#x27;</span>);
    <span class="hljs-keyword">const</span> quality = searchParams.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;q&#x27;</span>) || <span class="hljs-string">&#x27;80&#x27;</span>;
    <span class="hljs-keyword">const</span> format = searchParams.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;f&#x27;</span>) || <span class="hljs-string">&#x27;auto&#x27;</span>;

    <span class="hljs-comment">// Check cache first</span>
    <span class="hljs-keyword">const</span> cacheKey = <span class="hljs-string">\`image:<span class="hljs-subst">\${imagePath}</span>:<span class="hljs-subst">\${width}</span>:<span class="hljs-subst">\${quality}</span>:<span class="hljs-subst">\${format}</span>\`</span>;
    <span class="hljs-keyword">const</span> cached = <span class="hljs-keyword">await</span> caches.<span class="hljs-property">default</span>.<span class="hljs-title function_">match</span>(cacheKey);

    <span class="hljs-keyword">if</span> (cached) {
      <span class="hljs-keyword">return</span> cached;
    }

    <span class="hljs-comment">// Fetch and transform image</span>
    <span class="hljs-keyword">const</span> transformedImage = <span class="hljs-keyword">await</span> <span class="hljs-title function_">transformImage</span>(imagePath, {
      <span class="hljs-attr">width</span>: width ? <span class="hljs-built_in">parseInt</span>(width) : <span class="hljs-literal">undefined</span>,
      <span class="hljs-attr">quality</span>: <span class="hljs-built_in">parseInt</span>(quality),
      format,
    });

    <span class="hljs-comment">// Cache response</span>
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(transformedImage, {
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">\`image/<span class="hljs-subst">\${format}</span>\`</span>,
        <span class="hljs-string">&#x27;Cache-Control&#x27;</span>: <span class="hljs-string">\`public, max-age=<span class="hljs-subst">\${cacheStrategy.transforms.maxAge}</span>, stale-while-revalidate=<span class="hljs-subst">\${cacheStrategy.transforms.staleWhileRevalidate}</span>\`</span>,
        <span class="hljs-string">&#x27;CDN-Cache-Control&#x27;</span>: <span class="hljs-string">\`max-age=<span class="hljs-subst">\${cacheStrategy.transforms.maxAge}</span>\`</span>,
      },
    });

    <span class="hljs-comment">// Store in cache</span>
    <span class="hljs-keyword">await</span> caches.<span class="hljs-property">default</span>.<span class="hljs-title function_">put</span>(cacheKey, response.<span class="hljs-title function_">clone</span>());

    <span class="hljs-keyword">return</span> response;
  },
};
</code></pre>
<h2 id="أنماط-أداء-تحميل-الصور">أنماط أداء تحميل الصور</h2>
<h3 id="استراتيجية-التحميل-حسب-الأولوية">استراتيجية التحميل حسب الأولوية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Priority-based image loading</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImagePriority</span> {
  <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;low&#x27;</span>;
  <span class="hljs-attr">viewport</span>: <span class="hljs-string">&#x27;above-fold&#x27;</span> | <span class="hljs-string">&#x27;below-fold&#x27;</span>;
  <span class="hljs-attr">critical</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ImageLoadingManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">loadingQueue</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">ImagePriority</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">loadedImages</span>: <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>();
  <span class="hljs-keyword">private</span> maxConcurrent = <span class="hljs-number">3</span>;
  <span class="hljs-keyword">private</span> currentLoading = <span class="hljs-number">0</span>;

  <span class="hljs-title function_">addToQueue</span>(<span class="hljs-attr">image</span>: <span class="hljs-title class_">ImagePriority</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingQueue</span>.<span class="hljs-title function_">set</span>(image.<span class="hljs-property">path</span>, image);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">processQueue</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">currentLoading</span> &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxConcurrent</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Sort by priority</span>
    <span class="hljs-keyword">const</span> sorted = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingQueue</span>.<span class="hljs-title function_">entries</span>()).<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">[, a], [, b]</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> priorityWeight = { <span class="hljs-attr">high</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">medium</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">low</span>: <span class="hljs-number">1</span> };
      <span class="hljs-keyword">const</span> viewportWeight = { <span class="hljs-string">&#x27;above-fold&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;below-fold&#x27;</span>: <span class="hljs-number">1</span> };
      <span class="hljs-keyword">const</span> criticalWeight = a.<span class="hljs-property">critical</span> ? <span class="hljs-number">10</span> : <span class="hljs-number">0</span>;

      <span class="hljs-keyword">const</span> scoreA = priorityWeight[a.<span class="hljs-property">priority</span>] + viewportWeight[a.<span class="hljs-property">viewport</span>] + criticalWeight;
      <span class="hljs-keyword">const</span> scoreB =
        priorityWeight[b.<span class="hljs-property">priority</span>] + viewportWeight[b.<span class="hljs-property">viewport</span>] + (b.<span class="hljs-property">critical</span> ? <span class="hljs-number">10</span> : <span class="hljs-number">0</span>);

      <span class="hljs-keyword">return</span> scoreB - scoreA;
    });

    <span class="hljs-keyword">const</span> [path, priority] = sorted[<span class="hljs-number">0</span>] || [];
    <span class="hljs-keyword">if</span> (!path || <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedImages</span>.<span class="hljs-title function_">has</span>(path)) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingQueue</span>.<span class="hljs-title function_">delete</span>(path);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentLoading</span>++;

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">loadImage</span>(path, priority);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadedImages</span>.<span class="hljs-title function_">add</span>(path);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentLoading</span>--;
      <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">loadingQueue</span>.<span class="hljs-property">size</span> &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
      }
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">loadImage</span>(<span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">priority</span>: <span class="hljs-title class_">ImagePriority</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> img = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Image</span>();

      <span class="hljs-comment">// Set priority attributes</span>
      <span class="hljs-keyword">if</span> (priority.<span class="hljs-property">critical</span>) {
        img.<span class="hljs-property">decoding</span> = <span class="hljs-string">&#x27;sync&#x27;</span>;
        img.<span class="hljs-property">fetchPriority</span> = <span class="hljs-string">&#x27;high&#x27;</span>;
      } <span class="hljs-keyword">else</span> {
        img.<span class="hljs-property">decoding</span> = <span class="hljs-string">&#x27;async&#x27;</span>;
        img.<span class="hljs-property">fetchPriority</span> = priority.<span class="hljs-property">priority</span>;
      }

      img.<span class="hljs-property">onload</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>();
      img.<span class="hljs-property">onerror</span> = reject;
      img.<span class="hljs-property">src</span> = path;
    });
  }
}

<span class="hljs-comment">// React hook for priority loading</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">usePriorityImageLoading</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> manager = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ImageLoadingManager</span>(), []);

  <span class="hljs-keyword">const</span> loadImage = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>: <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">ImagePriority</span>, <span class="hljs-string">&#x27;path&#x27;</span>&gt;</span>) =&gt;</span> {
      manager.<span class="hljs-title function_">addToQueue</span>({ path, ...options });
    },
    [manager],
  );

  <span class="hljs-keyword">return</span> { loadImage };
}
</code></pre>
<h3 id="التحميل-التكيفي-بناء-على-الشبكة">التحميل التكيّفي بناءً على الشبكة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Network-aware image loading</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useNetworkAwareImages</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [connectionType, setConnectionType] = useState&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;4g&#x27;</span>);
  <span class="hljs-keyword">const</span> [effectiveType, setEffectiveType] = useState&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;4g&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;connection&#x27;</span> <span class="hljs-keyword">in</span> navigator) {
      <span class="hljs-keyword">const</span> connection = (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>;

      <span class="hljs-title function_">setConnectionType</span>(connection.<span class="hljs-property">type</span> || <span class="hljs-string">&#x27;4g&#x27;</span>);
      <span class="hljs-title function_">setEffectiveType</span>(connection.<span class="hljs-property">effectiveType</span> || <span class="hljs-string">&#x27;4g&#x27;</span>);

      <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateConnection</span> = (<span class="hljs-params"></span>) =&gt; {
        <span class="hljs-title function_">setConnectionType</span>(connection.<span class="hljs-property">type</span> || <span class="hljs-string">&#x27;4g&#x27;</span>);
        <span class="hljs-title function_">setEffectiveType</span>(connection.<span class="hljs-property">effectiveType</span> || <span class="hljs-string">&#x27;4g&#x27;</span>);
      };

      connection.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, updateConnection);
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> connection.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, updateConnection);
    }
  }, []);

  <span class="hljs-keyword">const</span> getImageQuality = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (effectiveType === <span class="hljs-string">&#x27;slow-2g&#x27;</span> || effectiveType === <span class="hljs-string">&#x27;2g&#x27;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-number">40</span>; <span class="hljs-comment">// Low quality for slow connections</span>
    }
    <span class="hljs-keyword">if</span> (effectiveType === <span class="hljs-string">&#x27;3g&#x27;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-number">60</span>; <span class="hljs-comment">// Medium quality</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">80</span>; <span class="hljs-comment">// High quality for 4g+</span>
  }, [effectiveType]);

  <span class="hljs-keyword">const</span> getImageFormat = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (effectiveType === <span class="hljs-string">&#x27;slow-2g&#x27;</span> || effectiveType === <span class="hljs-string">&#x27;2g&#x27;</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;webp&#x27;</span>; <span class="hljs-comment">// Smaller file size</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;auto&#x27;</span>; <span class="hljs-comment">// Let CDN decide</span>
  }, [effectiveType]);

  <span class="hljs-keyword">const</span> shouldLoadImage = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;low&#x27;</span></span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (effectiveType === <span class="hljs-string">&#x27;slow-2g&#x27;</span>) {
        <span class="hljs-keyword">return</span> priority === <span class="hljs-string">&#x27;high&#x27;</span>;
      }
      <span class="hljs-keyword">if</span> (effectiveType === <span class="hljs-string">&#x27;2g&#x27;</span>) {
        <span class="hljs-keyword">return</span> priority !== <span class="hljs-string">&#x27;low&#x27;</span>;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; <span class="hljs-comment">// Load all images on faster connections</span>
    },
    [effectiveType],
  );

  <span class="hljs-keyword">return</span> {
    connectionType,
    effectiveType,
    getImageQuality,
    getImageFormat,
    shouldLoadImage,
  };
}
</code></pre>
<h2 id="تحسين-الصور-وقت-البناء">تحسين الصور وقت البناء</h2>
<h3 id="تحسين-الصور-في-webpack">تحسين الصور في Webpack</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ImageMinimizerPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;imagemin-webpack-plugin&#x27;</span>).<span class="hljs-property">default</span>;
<span class="hljs-keyword">const</span> imageminWebp = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;imagemin-webp&#x27;</span>);
<span class="hljs-keyword">const</span> imageminAvif = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;imagemin-avif&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(png|jpe?g|gif|svg)$/i</span>,
        <span class="hljs-attr">use</span>: [
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">&#x27;file-loader&#x27;</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">outputPath</span>: <span class="hljs-string">&#x27;images/&#x27;</span>,
              <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;[name].[contenthash].[ext]&#x27;</span>,
            },
          },
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">&#x27;image-webpack-loader&#x27;</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">mozjpeg</span>: {
                <span class="hljs-attr">progressive</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">quality</span>: <span class="hljs-number">80</span>,
              },
              <span class="hljs-attr">optipng</span>: {
                <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>,
              },
              <span class="hljs-attr">pngquant</span>: {
                <span class="hljs-attr">quality</span>: [<span class="hljs-number">0.65</span>, <span class="hljs-number">0.9</span>],
                <span class="hljs-attr">speed</span>: <span class="hljs-number">4</span>,
              },
              <span class="hljs-attr">gifsicle</span>: {
                <span class="hljs-attr">interlaced</span>: <span class="hljs-literal">false</span>,
              },
              <span class="hljs-attr">webp</span>: {
                <span class="hljs-attr">quality</span>: <span class="hljs-number">80</span>,
              },
            },
          },
        ],
      },
    ],
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ImageMinimizerPlugin</span>({
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.(jpe?g|png|gif|svg)$/i</span>,
      <span class="hljs-attr">minimizerOptions</span>: {
        <span class="hljs-attr">plugins</span>: [
          <span class="hljs-comment">// Generate WebP versions</span>
          [<span class="hljs-string">&#x27;imagemin-webp&#x27;</span>, { <span class="hljs-attr">quality</span>: <span class="hljs-number">80</span> }],
          <span class="hljs-comment">// Generate AVIF versions</span>
          [<span class="hljs-string">&#x27;imagemin-avif&#x27;</span>, { <span class="hljs-attr">quality</span>: <span class="hljs-number">80</span> }],
        ],
      },
    }),
  ],
};
</code></pre>
<h3 id="تهيئة-مكون-الصور-في-nextjs">تهيئة مكوّن الصور في Next.js</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// next.config.js</span>
<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">images</span>: {
    <span class="hljs-attr">domains</span>: [<span class="hljs-string">&#x27;example.com&#x27;</span>, <span class="hljs-string">&#x27;cdn.example.com&#x27;</span>],
    <span class="hljs-attr">formats</span>: [<span class="hljs-string">&#x27;image/avif&#x27;</span>, <span class="hljs-string">&#x27;image/webp&#x27;</span>],
    <span class="hljs-attr">deviceSizes</span>: [<span class="hljs-number">640</span>, <span class="hljs-number">768</span>, <span class="hljs-number">1024</span>, <span class="hljs-number">1280</span>, <span class="hljs-number">1600</span>],
    <span class="hljs-attr">imageSizes</span>: [<span class="hljs-number">16</span>, <span class="hljs-number">32</span>, <span class="hljs-number">48</span>, <span class="hljs-number">64</span>, <span class="hljs-number">96</span>, <span class="hljs-number">128</span>, <span class="hljs-number">256</span>, <span class="hljs-number">384</span>],
    <span class="hljs-attr">minimumCacheTTL</span>: <span class="hljs-number">31536000</span>, <span class="hljs-comment">// 1 year</span>
    <span class="hljs-attr">dangerouslyAllowSVG</span>: <span class="hljs-literal">false</span>,
  },
  <span class="hljs-comment">// Custom image loader</span>
  <span class="hljs-attr">loader</span>: <span class="hljs-string">&#x27;custom&#x27;</span>,
  <span class="hljs-attr">loaderFile</span>: <span class="hljs-string">&#x27;./lib/imageLoader.js&#x27;</span>,
};

<span class="hljs-comment">// lib/imageLoader.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">customLoader</span>(<span class="hljs-params">{ src, width, quality }</span>) {
  <span class="hljs-keyword">const</span> params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">URLSearchParams</span>();
  params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;w&#x27;</span>, width.<span class="hljs-title function_">toString</span>());
  <span class="hljs-keyword">if</span> (quality) params.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;q&#x27;</span>, quality.<span class="hljs-title function_">toString</span>());

  <span class="hljs-keyword">return</span> <span class="hljs-string">\`https://cdn.example.com/images/<span class="hljs-subst">\${src}</span>?<span class="hljs-subst">\${params.toString()}</span>\`</span>;
}

<span class="hljs-comment">// Optimized Image component</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Image</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next/image&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">OptimizedImageProps</span> {
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">alt</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">priority</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">sizes</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">OptimizedImage</span>(<span class="hljs-params">{
  src,
  alt,
  priority = <span class="hljs-literal">false</span>,
  className,
  sizes = <span class="hljs-string">&#x27;(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw&#x27;</span>,
}: <span class="hljs-title class_">OptimizedImageProps</span></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Image</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">{src}</span>
      <span class="hljs-attr">alt</span>=<span class="hljs-string">{alt}</span>
      <span class="hljs-attr">fill</span>
      <span class="hljs-attr">priority</span>=<span class="hljs-string">{priority}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>
      <span class="hljs-attr">sizes</span>=<span class="hljs-string">{sizes}</span>
      <span class="hljs-attr">quality</span>=<span class="hljs-string">{80}</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;blur&quot;</span>
      <span class="hljs-attr">blurDataURL</span>=<span class="hljs-string">&quot;data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+JNnI5Ny+3V6ArkHqiOmQPd4aZJ2JB6HZ8qNHqidHTbGDKLGbewlVN0BxvM3nLzrflPIxdoFhYFgtWSDMIJOwAP7tBQXExN3SLBpFhLzJ2TL6BwuZKAACQoM9VlkjSPXLH4KYo5J8W8oo0OTKmVzRqIAyTnOFAhV0pMDj8Xb8aMsL43/tB/9k=&quot;</span>
    /&gt;</span></span>
  );
}
</code></pre>
<h2 id="مراقبة-الأداء-والمقاييس">مراقبة الأداء والمقاييس</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Image performance monitoring</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ImageMetrics</span> {
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">loadTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">fileSize</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">format</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">dimensions</span>: { <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span> };
  <span class="hljs-attr">cacheHit</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">ImagePerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">ImageMetrics</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">observer</span>: <span class="hljs-title class_">PerformanceObserver</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setupPerformanceObserver</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setupIntersectionObserver</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">setupPerformanceObserver</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observer</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">entryType</span> === <span class="hljs-string">&#x27;resource&#x27;</span> &amp;&amp; entry.<span class="hljs-property">initiatorType</span> === <span class="hljs-string">&#x27;img&#x27;</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordImageLoad</span>(entry <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceResourceTiming</span>);
        }
      }
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observer</span>.<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">entryTypes</span>: [<span class="hljs-string">&#x27;resource&#x27;</span>] });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">recordImageLoad</span>(<span class="hljs-attr">entry</span>: <span class="hljs-title class_">PerformanceResourceTiming</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">ImageMetrics</span> = {
      <span class="hljs-attr">src</span>: entry.<span class="hljs-property">name</span>,
      <span class="hljs-attr">loadTime</span>: entry.<span class="hljs-property">duration</span>,
      <span class="hljs-attr">fileSize</span>: entry.<span class="hljs-property">transferSize</span>,
      <span class="hljs-attr">renderTime</span>: entry.<span class="hljs-property">responseEnd</span> - entry.<span class="hljs-property">startTime</span>,
      <span class="hljs-attr">format</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">extractFormat</span>(entry.<span class="hljs-property">name</span>),
      <span class="hljs-attr">dimensions</span>: { <span class="hljs-attr">width</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">0</span> }, <span class="hljs-comment">// Will be updated when image loads</span>
      <span class="hljs-attr">cacheHit</span>: entry.<span class="hljs-property">transferSize</span> === <span class="hljs-number">0</span>,
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(entry.<span class="hljs-property">name</span>, metrics);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportMetrics</span>(metrics);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">extractFormat</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> match = url.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/\\.(\\w+)(\\?|$)/</span>);
    <span class="hljs-keyword">return</span> match ? match[<span class="hljs-number">1</span>] : <span class="hljs-string">&#x27;unknown&#x27;</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportMetrics</span>(<span class="hljs-attr">metrics</span>: <span class="hljs-title class_">ImageMetrics</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// Report to analytics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> gtag !== <span class="hljs-string">&#x27;undefined&#x27;</span>) {
      <span class="hljs-title function_">gtag</span>(<span class="hljs-string">&#x27;event&#x27;</span>, <span class="hljs-string">&#x27;image_load&#x27;</span>, {
        <span class="hljs-attr">event_category</span>: <span class="hljs-string">&#x27;performance&#x27;</span>,
        <span class="hljs-attr">event_label</span>: metrics.<span class="hljs-property">format</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(metrics.<span class="hljs-property">loadTime</span>),
        <span class="hljs-attr">custom_map</span>: {
          <span class="hljs-attr">file_size</span>: metrics.<span class="hljs-property">fileSize</span>,
          <span class="hljs-attr">cache_hit</span>: metrics.<span class="hljs-property">cacheHit</span>,
        },
      });
    }

    <span class="hljs-comment">// Report to custom analytics</span>
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/analytics/image-performance&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(metrics),
    }).<span class="hljs-title function_">catch</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Silently fail</span>
    });
  }

  <span class="hljs-title function_">getMetrics</span>(): <span class="hljs-title class_">ImageMetrics</span>[] {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">values</span>());
  }

  <span class="hljs-title function_">getAverageLoadTime</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> metrics = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getMetrics</span>();
    <span class="hljs-keyword">return</span> metrics.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">loadTime</span>, <span class="hljs-number">0</span>) / metrics.<span class="hljs-property">length</span>;
  }

  <span class="hljs-title function_">getCacheHitRate</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> metrics = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getMetrics</span>();
    <span class="hljs-keyword">const</span> cacheHits = metrics.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">cacheHit</span>).<span class="hljs-property">length</span>;
    <span class="hljs-keyword">return</span> cacheHits / metrics.<span class="hljs-property">length</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">setupIntersectionObserver</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// Monitor when images become visible</span>
    <span class="hljs-keyword">const</span> imageObserver = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(<span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
      entries.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span> &amp;&amp; entry.<span class="hljs-property">target</span>.<span class="hljs-property">tagName</span> === <span class="hljs-string">&#x27;IMG&#x27;</span>) {
          <span class="hljs-keyword">const</span> img = entry.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLImageElement</span>;
          <span class="hljs-keyword">const</span> metrics = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(img.<span class="hljs-property">src</span>);

          <span class="hljs-keyword">if</span> (metrics) {
            metrics.<span class="hljs-property">dimensions</span> = {
              <span class="hljs-attr">width</span>: img.<span class="hljs-property">naturalWidth</span>,
              <span class="hljs-attr">height</span>: img.<span class="hljs-property">naturalHeight</span>,
            };
          }
        }
      });
    });

    <span class="hljs-comment">// Observe all images</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;img&#x27;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">img</span>) =&gt;</span> {
      imageObserver.<span class="hljs-title function_">observe</span>(img);
    });
  }
}

<span class="hljs-comment">// React hook for image performance monitoring</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useImagePerformanceMonitoring</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [monitor] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ImagePerformanceMonitor</span>());

  <span class="hljs-keyword">const</span> getPerformanceReport = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">totalImages</span>: monitor.<span class="hljs-title function_">getMetrics</span>().<span class="hljs-property">length</span>,
      <span class="hljs-attr">averageLoadTime</span>: monitor.<span class="hljs-title function_">getAverageLoadTime</span>(),
      <span class="hljs-attr">cacheHitRate</span>: monitor.<span class="hljs-title function_">getCacheHitRate</span>(),
      <span class="hljs-attr">metrics</span>: monitor.<span class="hljs-title function_">getMetrics</span>(),
    };
  }, [monitor]);

  <span class="hljs-keyword">return</span> { getPerformanceReport };
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
