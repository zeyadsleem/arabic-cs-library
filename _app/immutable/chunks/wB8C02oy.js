const s="kinney",a="react-performance",n="أداء React",l="offscreen-canvas-webgl",p="OffscreenCanvas وWebGL في React",t=[{depth:2,id:"فهم-offscreencanvas",text:"فهم OffscreenCanvas"},{depth:2,id:"الإعداد-الأساسي-لـ-offscreencanvas",text:"الإعداد الأساسي لـ OffscreenCanvas"},{depth:3,id:"إنشاء-البنية-التحتية-للعامل",text:"إنشاء البنية التحتية للعامل"},{depth:3,id:"خطاف-react-لـ-offscreencanvas",text:"خُطّاف React لـ OffscreenCanvas"},{depth:2,id:"webgl-مع-offscreencanvas",text:"WebGL مع OffscreenCanvas"},{depth:3,id:"تصيير-webgl-عالي-الأداء",text:"تصيير WebGL عالي الأداء"},{depth:2,id:"تصور-بيانات-معقد",text:"تصوّر بيانات معقّد"},{depth:3,id:"تصيير-المخططات-بـ-offscreencanvas",text:"تصيير المخططات بـ OffscreenCanvas"},{depth:3,id:"مكون-react-لتصور-البيانات",text:"مكوّن React لتصوّر البيانات"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>يحتاج تطبيق React لديك إلى تصيير مخطط معقّد بنحو 100,000 نقطة بيانات. أو تحريك تصوّر ثلاثي الأبعاد. أو معالجة بثوث فيديو في الوقت الحقيقي. فتنفّذه على الخيط الرئيسي، وإذا بواجهتك كلها تتجمّد فجأة. ويصير كل تفاعل بطيئًا متثاقلًا. ويعرض مراقب أداء المتصفح شريطًا أحمر طويلًا يحجب كل شيء.</p>
<p>وهذه هي المشكلة: عمليات canvas وتصيير WebGL مكلفة حسابيًا، وحين تعمل على الخيط الرئيسي فإنها تحجب كل ما عداه. لكن هناك حل لا يعرفه معظم مطوّري React، وهو OffscreenCanvas. فهو يتيح لك نقل كل عمل الرسوميات الثقيل ذلك إلى Web Worker، فيبقى خيطك الرئيسي حرًا وتبقى واجهتك متجاوبة.</p>
<p>لنستكشف كيف تبني تصوّرات ورسوميات فائقة السرعة في React باستخدام OffscreenCanvas وWebGL، من دون التضحية بالتفاعلية.</p>
<h2 id="فهم-offscreencanvas">فهم OffscreenCanvas</h2>
<p>يتيح OffscreenCanvas تصيير canvas داخل عمال الويب (Web Workers):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">OffscreenCanvasCapabilities</span> {
  <span class="hljs-attr">rendering</span>: <span class="hljs-string">&#x27;Runs in Web Worker&#x27;</span>;
  <span class="hljs-attr">threading</span>: <span class="hljs-string">&#x27;Parallel to main thread&#x27;</span>;
  <span class="hljs-attr">contexts</span>: [<span class="hljs-string">&#x27;2d&#x27;</span>, <span class="hljs-string">&#x27;webgl&#x27;</span>, <span class="hljs-string">&#x27;webgl2&#x27;</span>, <span class="hljs-string">&#x27;webgpu&#x27;</span>];
  <span class="hljs-attr">performance</span>: <span class="hljs-string">&#x27;No main thread blocking&#x27;</span>;
}

<span class="hljs-comment">// Check for support</span>
<span class="hljs-keyword">const</span> isSupported = <span class="hljs-string">&#x27;OffscreenCanvas&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">window</span>;

<span class="hljs-comment">// Transfer canvas control to worker</span>
<span class="hljs-keyword">const</span> canvas = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;canvas&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLCanvasElement</span>;
<span class="hljs-keyword">const</span> offscreen = canvas.<span class="hljs-title function_">transferControlToOffscreen</span>();

<span class="hljs-comment">// Send to worker</span>
worker.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">canvas</span>: offscreen }, [offscreen]);
</code></pre>
<h2 id="الإعداد-الأساسي-لـ-offscreencanvas">الإعداد الأساسي لـ OffscreenCanvas</h2>
<h3 id="إنشاء-البنية-التحتية-للعامل">إنشاء البنية التحتية للعامل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// canvas.worker.ts</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">canvas</span>: <span class="hljs-title class_">OffscreenCanvas</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">OffscreenCanvasRenderingContext2D</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">let</span> <span class="hljs-attr">animationId</span>: <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, data } = event.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;init&#x27;</span>:
      <span class="hljs-title function_">initCanvas</span>(data.<span class="hljs-property">canvas</span>);
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;render&#x27;</span>:
      <span class="hljs-title function_">renderFrame</span>(data);
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;startAnimation&#x27;</span>:
      <span class="hljs-title function_">startAnimation</span>();
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;stopAnimation&#x27;</span>:
      <span class="hljs-title function_">stopAnimation</span>();
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;resize&#x27;</span>:
      <span class="hljs-title function_">resizeCanvas</span>(data.<span class="hljs-property">width</span>, data.<span class="hljs-property">height</span>);
      <span class="hljs-keyword">break</span>;
  }
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">initCanvas</span>(<span class="hljs-params"><span class="hljs-attr">offscreenCanvas</span>: <span class="hljs-title class_">OffscreenCanvas</span></span>) {
  canvas = offscreenCanvas;
  ctx = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>);

  <span class="hljs-keyword">if</span> (!ctx) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Could not get 2D context&#x27;</span>);
  }

  <span class="hljs-comment">// Initial render</span>
  <span class="hljs-title function_">renderFrame</span>({});
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">renderFrame</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
  <span class="hljs-keyword">if</span> (!ctx || !canvas) <span class="hljs-keyword">return</span>;

  <span class="hljs-comment">// Clear canvas</span>
  ctx.<span class="hljs-title function_">clearRect</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.<span class="hljs-property">width</span>, canvas.<span class="hljs-property">height</span>);

  <span class="hljs-comment">// Expensive rendering operation</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++) {
    <span class="hljs-keyword">const</span> x = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * canvas.<span class="hljs-property">width</span>;
    <span class="hljs-keyword">const</span> y = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * canvas.<span class="hljs-property">height</span>;
    <span class="hljs-keyword">const</span> radius = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">5</span>;

    ctx.<span class="hljs-title function_">beginPath</span>();
    ctx.<span class="hljs-title function_">arc</span>(x, y, radius, <span class="hljs-number">0</span>, <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span> * <span class="hljs-number">2</span>);
    ctx.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">\`hsl(<span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">360</span>}</span>, 50%, 50%)\`</span>;
    ctx.<span class="hljs-title function_">fill</span>();
  }

  <span class="hljs-comment">// Report completion</span>
  <span class="hljs-variable language_">self</span>.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;frameComplete&#x27;</span>, <span class="hljs-attr">timestamp</span>: performance.<span class="hljs-title function_">now</span>() });
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">startAnimation</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">animate</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">renderFrame</span>({});
    animationId = <span class="hljs-title function_">requestAnimationFrame</span>(animate);
  };
  <span class="hljs-title function_">animate</span>();
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">stopAnimation</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">if</span> (animationId !== <span class="hljs-literal">null</span>) {
    <span class="hljs-title function_">cancelAnimationFrame</span>(animationId);
    animationId = <span class="hljs-literal">null</span>;
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">resizeCanvas</span>(<span class="hljs-params"><span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-keyword">if</span> (!canvas) <span class="hljs-keyword">return</span>;
  canvas.<span class="hljs-property">width</span> = width;
  canvas.<span class="hljs-property">height</span> = height;
  <span class="hljs-title function_">renderFrame</span>({});
}
</code></pre>
<h3 id="خطاف-react-لـ-offscreencanvas">خُطّاف React لـ OffscreenCanvas</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useOffscreenCanvas</span> = (<span class="hljs-params">
  <span class="hljs-attr">workerPath</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">options</span>?: <span class="hljs-title class_">OffscreenCanvasOptions</span>
</span>) =&gt; {
  <span class="hljs-keyword">const</span> canvasRef = useRef&lt;<span class="hljs-title class_">HTMLCanvasElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> workerRef = useRef&lt;<span class="hljs-title class_">Worker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isReady, setIsReady] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [fps, setFps] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!canvasRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Check for OffscreenCanvas support</span>
    <span class="hljs-keyword">if</span> (!(<span class="hljs-string">&#x27;transferControlToOffscreen&#x27;</span> <span class="hljs-keyword">in</span> canvasRef.<span class="hljs-property">current</span>)) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;OffscreenCanvas not supported, falling back to main thread&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Create worker</span>
    <span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(workerPath);
    workerRef.<span class="hljs-property">current</span> = worker;

    <span class="hljs-comment">// Transfer canvas control</span>
    <span class="hljs-keyword">const</span> offscreen = canvasRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">transferControlToOffscreen</span>();
    worker.<span class="hljs-title function_">postMessage</span>(
      { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;init&#x27;</span>, <span class="hljs-attr">data</span>: { <span class="hljs-attr">canvas</span>: offscreen } },
      [offscreen]
    );

    <span class="hljs-comment">// Handle worker messages</span>
    <span class="hljs-keyword">let</span> frameCount = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> lastTime = performance.<span class="hljs-title function_">now</span>();

    worker.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, data } = event.<span class="hljs-property">data</span>;

      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;ready&#x27;</span>) {
        <span class="hljs-title function_">setIsReady</span>(<span class="hljs-literal">true</span>);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;frameComplete&#x27;</span>) {
        frameCount++;
        <span class="hljs-keyword">const</span> now = performance.<span class="hljs-title function_">now</span>();

        <span class="hljs-keyword">if</span> (now - lastTime &gt;= <span class="hljs-number">1000</span>) {
          <span class="hljs-title function_">setFps</span>(frameCount);
          frameCount = <span class="hljs-number">0</span>;
          lastTime = now;
        }
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;error&#x27;</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Worker error:&#x27;</span>, data);
      }
    });

    <span class="hljs-comment">// Start animation if requested</span>
    <span class="hljs-keyword">if</span> (options?.<span class="hljs-property">autoStart</span>) {
      worker.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;startAnimation&#x27;</span> });
    }

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      worker.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;stopAnimation&#x27;</span> });
      worker.<span class="hljs-title function_">terminate</span>();
    };
  }, [workerPath, options]);

  <span class="hljs-keyword">const</span> sendMessage = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>?: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
    workerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-keyword">type</span>, data });
  }, []);

  <span class="hljs-keyword">return</span> {
    canvasRef,
    isReady,
    fps,
    sendMessage
  };
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">OffscreenCanvasOptions</span> {
  <span class="hljs-attr">autoStart</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">width</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// Usage in component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">VisualizationComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> { canvasRef, isReady, fps, sendMessage } = <span class="hljs-title function_">useOffscreenCanvas</span>(
    <span class="hljs-string">&#x27;/workers/canvas.worker.js&#x27;</span>,
    { <span class="hljs-attr">autoStart</span>: <span class="hljs-literal">true</span> }
  );

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{canvasRef}</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{800}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{600}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Status: {isReady ? &#x27;Ready&#x27; : &#x27;Loading&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>FPS: {fps}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> sendMessage(&#x27;startAnimation&#x27;)}&gt;Start<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> sendMessage(&#x27;stopAnimation&#x27;)}&gt;Stop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="webgl-مع-offscreencanvas">WebGL مع OffscreenCanvas</h2>
<h3 id="تصيير-webgl-عالي-الأداء">تصيير WebGL عالي الأداء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// webgl.worker.ts</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">WebGLRenderer</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">canvas</span>: <span class="hljs-title class_">OffscreenCanvas</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">gl</span>: <span class="hljs-title class_">WebGL2RenderingContext</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">program</span>: <span class="hljs-title class_">WebGLProgram</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">buffers</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">WebGLBuffer</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">uniforms</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">WebGLUniformLocation</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">canvas</span>: <span class="hljs-title class_">OffscreenCanvas</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span> = canvas;
    <span class="hljs-keyword">const</span> gl = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;webgl2&#x27;</span>);

    <span class="hljs-keyword">if</span> (!gl) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;WebGL2 not supported&#x27;</span>);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">gl</span> = gl;
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">initialize</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">initialize</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> gl = <span class="hljs-variable language_">this</span>.<span class="hljs-property">gl</span>;

    <span class="hljs-comment">// Vertex shader</span>
    <span class="hljs-keyword">const</span> vertexShaderSource = <span class="hljs-string">\`#version 300 es
      in vec3 a_position;
      in vec3 a_color;

      uniform mat4 u_matrix;
      uniform float u_time;

      out vec3 v_color;

      void main() {
        vec3 pos = a_position;
        pos.x += sin(u_time + a_position.y * 0.1) * 0.1;
        pos.y += cos(u_time + a_position.x * 0.1) * 0.1;

        gl_Position = u_matrix * vec4(pos, 1.0);
        gl_PointSize = 2.0;
        v_color = a_color;
      }
    \`</span>;

    <span class="hljs-comment">// Fragment shader</span>
    <span class="hljs-keyword">const</span> fragmentShaderSource = <span class="hljs-string">\`#version 300 es
      precision highp float;

      in vec3 v_color;
      out vec4 fragColor;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) &gt; 0.5) {
          discard;
        }
        fragColor = vec4(v_color, 1.0);
      }
    \`</span>;

    <span class="hljs-comment">// Compile shaders</span>
    <span class="hljs-keyword">const</span> vertexShader = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">compileShader</span>(gl.<span class="hljs-property">VERTEX_SHADER</span>, vertexShaderSource);
    <span class="hljs-keyword">const</span> fragmentShader = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">compileShader</span>(gl.<span class="hljs-property">FRAGMENT_SHADER</span>, fragmentShaderSource);

    <span class="hljs-comment">// Create program</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">createProgram</span>(vertexShader, fragmentShader);

    <span class="hljs-comment">// Get uniform locations</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">uniforms</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;u_matrix&#x27;</span>, gl.<span class="hljs-title function_">getUniformLocation</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>, <span class="hljs-string">&#x27;u_matrix&#x27;</span>)!);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">uniforms</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;u_time&#x27;</span>, gl.<span class="hljs-title function_">getUniformLocation</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>, <span class="hljs-string">&#x27;u_time&#x27;</span>)!);

    <span class="hljs-comment">// Setup GL state</span>
    gl.<span class="hljs-title function_">enable</span>(gl.<span class="hljs-property">DEPTH_TEST</span>);
    gl.<span class="hljs-title function_">enable</span>(gl.<span class="hljs-property">BLEND</span>);
    gl.<span class="hljs-title function_">blendFunc</span>(gl.<span class="hljs-property">SRC_ALPHA</span>, gl.<span class="hljs-property">ONE_MINUS_SRC_ALPHA</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">compileShader</span>(<span class="hljs-attr">type</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">source</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">WebGLShader</span> {
    <span class="hljs-keyword">const</span> gl = <span class="hljs-variable language_">this</span>.<span class="hljs-property">gl</span>;
    <span class="hljs-keyword">const</span> shader = gl.<span class="hljs-title function_">createShader</span>(<span class="hljs-keyword">type</span>)!;

    gl.<span class="hljs-title function_">shaderSource</span>(shader, source);
    gl.<span class="hljs-title function_">compileShader</span>(shader);

    <span class="hljs-keyword">if</span> (!gl.<span class="hljs-title function_">getShaderParameter</span>(shader, gl.<span class="hljs-property">COMPILE_STATUS</span>)) {
      <span class="hljs-keyword">const</span> info = gl.<span class="hljs-title function_">getShaderInfoLog</span>(shader);
      gl.<span class="hljs-title function_">deleteShader</span>(shader);
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Shader compilation failed: <span class="hljs-subst">\${info}</span>\`</span>);
    }

    <span class="hljs-keyword">return</span> shader;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">createProgram</span>(<span class="hljs-attr">vertexShader</span>: <span class="hljs-title class_">WebGLShader</span>, <span class="hljs-attr">fragmentShader</span>: <span class="hljs-title class_">WebGLShader</span>): <span class="hljs-title class_">WebGLProgram</span> {
    <span class="hljs-keyword">const</span> gl = <span class="hljs-variable language_">this</span>.<span class="hljs-property">gl</span>;
    <span class="hljs-keyword">const</span> program = gl.<span class="hljs-title function_">createProgram</span>()!;

    gl.<span class="hljs-title function_">attachShader</span>(program, vertexShader);
    gl.<span class="hljs-title function_">attachShader</span>(program, fragmentShader);
    gl.<span class="hljs-title function_">linkProgram</span>(program);

    <span class="hljs-keyword">if</span> (!gl.<span class="hljs-title function_">getProgramParameter</span>(program, gl.<span class="hljs-property">LINK_STATUS</span>)) {
      <span class="hljs-keyword">const</span> info = gl.<span class="hljs-title function_">getProgramInfoLog</span>(program);
      gl.<span class="hljs-title function_">deleteProgram</span>(program);
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Program linking failed: <span class="hljs-subst">\${info}</span>\`</span>);
    }

    <span class="hljs-keyword">return</span> program;
  }

  <span class="hljs-title function_">renderParticles</span>(<span class="hljs-params"><span class="hljs-attr">particles</span>: <span class="hljs-title class_">Float32Array</span>, <span class="hljs-attr">colors</span>: <span class="hljs-title class_">Float32Array</span>, <span class="hljs-attr">time</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">const</span> gl = <span class="hljs-variable language_">this</span>.<span class="hljs-property">gl</span>;

    <span class="hljs-comment">// Clear</span>
    gl.<span class="hljs-title function_">viewport</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">width</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">height</span>);
    gl.<span class="hljs-title function_">clearColor</span>(<span class="hljs-number">0.1</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">1.0</span>);
    gl.<span class="hljs-title function_">clear</span>(gl.<span class="hljs-property">COLOR_BUFFER_BIT</span> | gl.<span class="hljs-property">DEPTH_BUFFER_BIT</span>);

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Use program</span>
    gl.<span class="hljs-title function_">useProgram</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>);

    <span class="hljs-comment">// Create/update position buffer</span>
    <span class="hljs-keyword">let</span> positionBuffer = <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;position&#x27;</span>);
    <span class="hljs-keyword">if</span> (!positionBuffer) {
      positionBuffer = gl.<span class="hljs-title function_">createBuffer</span>()!;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffers</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;position&#x27;</span>, positionBuffer);
    }

    gl.<span class="hljs-title function_">bindBuffer</span>(gl.<span class="hljs-property">ARRAY_BUFFER</span>, positionBuffer);
    gl.<span class="hljs-title function_">bufferData</span>(gl.<span class="hljs-property">ARRAY_BUFFER</span>, particles, gl.<span class="hljs-property">DYNAMIC_DRAW</span>);

    <span class="hljs-keyword">const</span> positionLoc = gl.<span class="hljs-title function_">getAttribLocation</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>, <span class="hljs-string">&#x27;a_position&#x27;</span>);
    gl.<span class="hljs-title function_">enableVertexAttribArray</span>(positionLoc);
    gl.<span class="hljs-title function_">vertexAttribPointer</span>(positionLoc, <span class="hljs-number">3</span>, gl.<span class="hljs-property">FLOAT</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);

    <span class="hljs-comment">// Create/update color buffer</span>
    <span class="hljs-keyword">let</span> colorBuffer = <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;color&#x27;</span>);
    <span class="hljs-keyword">if</span> (!colorBuffer) {
      colorBuffer = gl.<span class="hljs-title function_">createBuffer</span>()!;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffers</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;color&#x27;</span>, colorBuffer);
    }

    gl.<span class="hljs-title function_">bindBuffer</span>(gl.<span class="hljs-property">ARRAY_BUFFER</span>, colorBuffer);
    gl.<span class="hljs-title function_">bufferData</span>(gl.<span class="hljs-property">ARRAY_BUFFER</span>, colors, gl.<span class="hljs-property">DYNAMIC_DRAW</span>);

    <span class="hljs-keyword">const</span> colorLoc = gl.<span class="hljs-title function_">getAttribLocation</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>, <span class="hljs-string">&#x27;a_color&#x27;</span>);
    gl.<span class="hljs-title function_">enableVertexAttribArray</span>(colorLoc);
    gl.<span class="hljs-title function_">vertexAttribPointer</span>(colorLoc, <span class="hljs-number">3</span>, gl.<span class="hljs-property">FLOAT</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);

    <span class="hljs-comment">// Set uniforms</span>
    <span class="hljs-keyword">const</span> matrix = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">createPerspectiveMatrix</span>();
    gl.<span class="hljs-title function_">uniformMatrix4fv</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">uniforms</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;u_matrix&#x27;</span>)!, <span class="hljs-literal">false</span>, matrix);
    gl.<span class="hljs-title function_">uniform1f</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">uniforms</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;u_time&#x27;</span>)!, time);

    <span class="hljs-comment">// Draw</span>
    gl.<span class="hljs-title function_">drawArrays</span>(gl.<span class="hljs-property">POINTS</span>, <span class="hljs-number">0</span>, particles.<span class="hljs-property">length</span> / <span class="hljs-number">3</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">createPerspectiveMatrix</span>(): <span class="hljs-title class_">Float32Array</span> {
    <span class="hljs-comment">// Simple perspective matrix</span>
    <span class="hljs-keyword">const</span> aspect = <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">width</span> / <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">height</span>;
    <span class="hljs-keyword">const</span> fov = <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span> / <span class="hljs-number">4</span>;
    <span class="hljs-keyword">const</span> near = <span class="hljs-number">0.1</span>;
    <span class="hljs-keyword">const</span> far = <span class="hljs-number">100</span>;

    <span class="hljs-keyword">const</span> f = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">tan</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span> * <span class="hljs-number">0.5</span> - <span class="hljs-number">0.5</span> * fov);
    <span class="hljs-keyword">const</span> rangeInv = <span class="hljs-number">1.0</span> / (near - far);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>([
      f / aspect,
      <span class="hljs-number">0</span>,
      <span class="hljs-number">0</span>,
      <span class="hljs-number">0</span>,
      <span class="hljs-number">0</span>,
      f,
      <span class="hljs-number">0</span>,
      <span class="hljs-number">0</span>,
      <span class="hljs-number">0</span>,
      <span class="hljs-number">0</span>,
      (near + far) * rangeInv,
      -<span class="hljs-number">1</span>,
      <span class="hljs-number">0</span>,
      <span class="hljs-number">0</span>,
      near * far * rangeInv * <span class="hljs-number">2</span>,
      <span class="hljs-number">0</span>,
    ]);
  }

  <span class="hljs-title function_">resize</span>(<span class="hljs-params"><span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">width</span> = width;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>.<span class="hljs-property">height</span> = height;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">gl</span>.<span class="hljs-title function_">viewport</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);
  }

  <span class="hljs-title function_">dispose</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> gl = <span class="hljs-variable language_">this</span>.<span class="hljs-property">gl</span>;

    <span class="hljs-comment">// Clean up buffers</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffers</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">buffer</span>) =&gt;</span> gl.<span class="hljs-title function_">deleteBuffer</span>(buffer));
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">buffers</span>.<span class="hljs-title function_">clear</span>();

    <span class="hljs-comment">// Clean up program</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>) {
      gl.<span class="hljs-title function_">deleteProgram</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span> = <span class="hljs-literal">null</span>;
    }
  }
}

<span class="hljs-comment">// Worker message handler</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">renderer</span>: <span class="hljs-title class_">WebGLRenderer</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">let</span> animating = <span class="hljs-literal">false</span>;

<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, data } = event.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;init&#x27;</span>:
      renderer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebGLRenderer</span>(data.<span class="hljs-property">canvas</span>);
      <span class="hljs-variable language_">self</span>.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ready&#x27;</span> });
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;render&#x27;</span>:
      <span class="hljs-keyword">if</span> (renderer) {
        renderer.<span class="hljs-title function_">renderParticles</span>(data.<span class="hljs-property">particles</span>, data.<span class="hljs-property">colors</span>, data.<span class="hljs-property">time</span>);
        <span class="hljs-variable language_">self</span>.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;frameComplete&#x27;</span> });
      }
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;startAnimation&#x27;</span>:
      animating = <span class="hljs-literal">true</span>;
      <span class="hljs-title function_">animate</span>();
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;stopAnimation&#x27;</span>:
      animating = <span class="hljs-literal">false</span>;
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;resize&#x27;</span>:
      renderer?.<span class="hljs-title function_">resize</span>(data.<span class="hljs-property">width</span>, data.<span class="hljs-property">height</span>);
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;dispose&#x27;</span>:
      renderer?.<span class="hljs-title function_">dispose</span>();
      renderer = <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">break</span>;
  }
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">animate</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">if</span> (!animating || !renderer) <span class="hljs-keyword">return</span>;

  <span class="hljs-comment">// Generate particle data</span>
  <span class="hljs-keyword">const</span> particleCount = <span class="hljs-number">10000</span>;
  <span class="hljs-keyword">const</span> particles = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(particleCount * <span class="hljs-number">3</span>);
  <span class="hljs-keyword">const</span> colors = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(particleCount * <span class="hljs-number">3</span>);

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; particleCount; i++) {
    <span class="hljs-keyword">const</span> angle = (i / particleCount) * <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span> * <span class="hljs-number">2</span>;
    <span class="hljs-keyword">const</span> radius = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">5</span>;

    particles[i * <span class="hljs-number">3</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">cos</span>(angle) * radius;
    particles[i * <span class="hljs-number">3</span> + <span class="hljs-number">1</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sin</span>(angle) * radius;
    particles[i * <span class="hljs-number">3</span> + <span class="hljs-number">2</span>] = (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() - <span class="hljs-number">0.5</span>) * <span class="hljs-number">2</span>;

    colors[i * <span class="hljs-number">3</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
    colors[i * <span class="hljs-number">3</span> + <span class="hljs-number">1</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
    colors[i * <span class="hljs-number">3</span> + <span class="hljs-number">2</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
  }

  renderer.<span class="hljs-title function_">renderParticles</span>(particles, colors, performance.<span class="hljs-title function_">now</span>() / <span class="hljs-number">1000</span>);
  <span class="hljs-variable language_">self</span>.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;frameComplete&#x27;</span> });

  <span class="hljs-title function_">requestAnimationFrame</span>(animate);
}
</code></pre>
<h2 id="تصور-بيانات-معقد">تصوّر بيانات معقّد</h2>
<h3 id="تصيير-المخططات-بـ-offscreencanvas">تصيير المخططات بـ OffscreenCanvas</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// chart.worker.ts</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ChartRenderer</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">canvas</span>: <span class="hljs-title class_">OffscreenCanvas</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">OffscreenCanvasRenderingContext2D</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">data</span>: <span class="hljs-title class_">ChartData</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">canvas</span>: <span class="hljs-title class_">OffscreenCanvas</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span> = canvas;
    <span class="hljs-keyword">const</span> ctx = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>);

    <span class="hljs-keyword">if</span> (!ctx) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Could not get 2D context&#x27;</span>);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span> = ctx;
  }

  <span class="hljs-title function_">updateData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">ChartData</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span> = data;
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">render</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> { width, height } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>;
    <span class="hljs-keyword">const</span> ctx = <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>;

    <span class="hljs-comment">// Clear canvas</span>
    ctx.<span class="hljs-title function_">clearRect</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, width, height);

    <span class="hljs-comment">// Render based on chart type</span>
    <span class="hljs-keyword">switch</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>.<span class="hljs-property">type</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;scatter&#x27;</span>:
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">renderScatterPlot</span>();
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;heatmap&#x27;</span>:
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">renderHeatmap</span>();
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;line&#x27;</span>:
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">renderLineChart</span>();
        <span class="hljs-keyword">break</span>;
    }

    <span class="hljs-variable language_">self</span>.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;renderComplete&#x27;</span>,
      <span class="hljs-attr">stats</span>: {
        <span class="hljs-attr">pointsRendered</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>.<span class="hljs-property">points</span>.<span class="hljs-property">length</span>,
        <span class="hljs-attr">renderTime</span>: performance.<span class="hljs-title function_">now</span>(),
      },
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">renderScatterPlot</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> { width, height } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>;
    <span class="hljs-keyword">const</span> { points, colorScale } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>;

    <span class="hljs-comment">// Use ImageData for better performance with many points</span>
    <span class="hljs-keyword">const</span> imageData = <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-title function_">createImageData</span>(width, height);
    <span class="hljs-keyword">const</span> pixels = imageData.<span class="hljs-property">data</span>;

    points.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">point</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> x = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(point.<span class="hljs-property">x</span> * width);
      <span class="hljs-keyword">const</span> y = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>((<span class="hljs-number">1</span> - point.<span class="hljs-property">y</span>) * height);

      <span class="hljs-keyword">if</span> (x &gt;= <span class="hljs-number">0</span> &amp;&amp; x &lt; width &amp;&amp; y &gt;= <span class="hljs-number">0</span> &amp;&amp; y &lt; height) {
        <span class="hljs-keyword">const</span> index = (y * width + x) * <span class="hljs-number">4</span>;
        <span class="hljs-keyword">const</span> color = <span class="hljs-title function_">colorScale</span>(point.<span class="hljs-property">value</span>);

        pixels[index] = color.<span class="hljs-property">r</span>;
        pixels[index + <span class="hljs-number">1</span>] = color.<span class="hljs-property">g</span>;
        pixels[index + <span class="hljs-number">2</span>] = color.<span class="hljs-property">b</span>;
        pixels[index + <span class="hljs-number">3</span>] = <span class="hljs-number">255</span>;
      }
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-title function_">putImageData</span>(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">renderHeatmap</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> { width, height } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>;
    <span class="hljs-keyword">const</span> { grid, colorScale } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>;

    <span class="hljs-keyword">const</span> cellWidth = width / grid[<span class="hljs-number">0</span>].<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> cellHeight = height / grid.<span class="hljs-property">length</span>;

    grid.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">row, y</span>) =&gt;</span> {
      row.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">value, x</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> color = <span class="hljs-title function_">colorScale</span>(value);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">\`rgb(<span class="hljs-subst">\${color.r}</span>, <span class="hljs-subst">\${color.g}</span>, <span class="hljs-subst">\${color.b}</span>)\`</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-title function_">fillRect</span>(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      });
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">renderLineChart</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> { width, height } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">canvas</span>;
    <span class="hljs-keyword">const</span> { series } = <span class="hljs-variable language_">this</span>.<span class="hljs-property">data</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-property">strokeStyle</span> = <span class="hljs-string">&#x27;#3b82f6&#x27;</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-property">lineWidth</span> = <span class="hljs-number">2</span>;

    series.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">line</span>) =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-title function_">beginPath</span>();

      line.<span class="hljs-property">points</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">point, i</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> x = (point.<span class="hljs-property">x</span> / line.<span class="hljs-property">maxX</span>) * width;
        <span class="hljs-keyword">const</span> y = height - (point.<span class="hljs-property">y</span> / line.<span class="hljs-property">maxY</span>) * height;

        <span class="hljs-keyword">if</span> (i === <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-title function_">moveTo</span>(x, y);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-title function_">lineTo</span>(x, y);
        }
      });

      <span class="hljs-variable language_">this</span>.<span class="hljs-property">ctx</span>.<span class="hljs-title function_">stroke</span>();
    });
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ChartData</span> {
  <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;scatter&#x27;</span> | <span class="hljs-string">&#x27;heatmap&#x27;</span> | <span class="hljs-string">&#x27;line&#x27;</span>;
  <span class="hljs-attr">points</span>?: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span> }&gt;;
  <span class="hljs-attr">grid</span>?: <span class="hljs-built_in">number</span>[][];
  <span class="hljs-attr">series</span>?: <span class="hljs-title class_">Array</span>&lt;{
    <span class="hljs-attr">points</span>: <span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span> }&gt;;
    <span class="hljs-attr">maxX</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">maxY</span>: <span class="hljs-built_in">number</span>;
  }&gt;;
  <span class="hljs-attr">colorScale</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> { <span class="hljs-attr">r</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">g</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span> };
}
</code></pre>
<h3 id="مكون-react-لتصور-البيانات">مكوّن React لتصوّر البيانات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">DataVisualization</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> workerRef = useRef&lt;<span class="hljs-title class_">Worker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> canvasRef = useRef&lt;<span class="hljs-title class_">HTMLCanvasElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [renderStats, setRenderStats] = useState&lt;<span class="hljs-title class_">RenderStats</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!canvasRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Check for OffscreenCanvas support</span>
    <span class="hljs-keyword">if</span> (!(<span class="hljs-string">&#x27;transferControlToOffscreen&#x27;</span> <span class="hljs-keyword">in</span> canvasRef.<span class="hljs-property">current</span>)) {
      <span class="hljs-comment">// Fallback to main thread rendering</span>
      <span class="hljs-title function_">renderOnMainThread</span>(canvasRef.<span class="hljs-property">current</span>, data);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Create worker</span>
    <span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-string">&#x27;/workers/chart.worker.js&#x27;</span>);
    workerRef.<span class="hljs-property">current</span> = worker;

    <span class="hljs-comment">// Transfer canvas</span>
    <span class="hljs-keyword">const</span> offscreen = canvasRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">transferControlToOffscreen</span>();
    worker.<span class="hljs-title function_">postMessage</span>(
      { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;init&#x27;</span>, <span class="hljs-attr">canvas</span>: offscreen },
      [offscreen]
    );

    <span class="hljs-comment">// Handle worker messages</span>
    worker.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;renderComplete&#x27;</span>) {
        <span class="hljs-title function_">setRenderStats</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">stats</span>);
      }
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      worker.<span class="hljs-title function_">terminate</span>();
    };
  }, []);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!workerRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Process data for visualization</span>
    <span class="hljs-keyword">const</span> processed = <span class="hljs-title function_">processDataForVisualization</span>(data);

    <span class="hljs-comment">// Send to worker</span>
    workerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">postMessage</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;updateData&#x27;</span>,
      <span class="hljs-attr">data</span>: processed
    });
  }, [data]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;visualization-container&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{canvasRef}</span>
        <span class="hljs-attr">width</span>=<span class="hljs-string">{1200}</span>
        <span class="hljs-attr">height</span>=<span class="hljs-string">{600}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;visualization-canvas&quot;</span>
      /&gt;</span>
      {renderStats &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;render-stats&quot;</span>&gt;</span>
          Points: {renderStats.pointsRendered.toLocaleString()} |
          Time: {renderStats.renderTime.toFixed(2)}ms
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RenderStats</span> {
  <span class="hljs-attr">pointsRendered</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">processDataForVisualization</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>[]</span>): <span class="hljs-title class_">ChartData</span> {
  <span class="hljs-comment">// Transform data for visualization</span>
  <span class="hljs-keyword">const</span> points = data.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> ({
    <span class="hljs-attr">x</span>: d.<span class="hljs-property">x</span> / <span class="hljs-number">100</span>,
    <span class="hljs-attr">y</span>: d.<span class="hljs-property">y</span> / <span class="hljs-number">100</span>,
    <span class="hljs-attr">value</span>: d.<span class="hljs-property">value</span>
  }));

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">colorScale</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> hue = value * <span class="hljs-number">360</span>;
    <span class="hljs-comment">// Convert HSL to RGB</span>
    <span class="hljs-keyword">const</span> c = <span class="hljs-number">0.5</span>;
    <span class="hljs-keyword">const</span> x = c * (<span class="hljs-number">1</span> - <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">abs</span>((hue / <span class="hljs-number">60</span>) % <span class="hljs-number">2</span> - <span class="hljs-number">1</span>));
    <span class="hljs-keyword">const</span> m = <span class="hljs-number">0.5</span>;

    <span class="hljs-keyword">let</span> r = <span class="hljs-number">0</span>, g = <span class="hljs-number">0</span>, b = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">if</span> (hue &lt; <span class="hljs-number">60</span>) {
      r = c; g = x; b = <span class="hljs-number">0</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (hue &lt; <span class="hljs-number">120</span>) {
      r = x; g = c; b = <span class="hljs-number">0</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (hue &lt; <span class="hljs-number">180</span>) {
      r = <span class="hljs-number">0</span>; g = c; b = x;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (hue &lt; <span class="hljs-number">240</span>) {
      r = <span class="hljs-number">0</span>; g = x; b = c;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (hue &lt; <span class="hljs-number">300</span>) {
      r = x; g = <span class="hljs-number">0</span>; b = c;
    } <span class="hljs-keyword">else</span> {
      r = c; g = <span class="hljs-number">0</span>; b = x;
    }

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">r</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>((r + m) * <span class="hljs-number">255</span>),
      <span class="hljs-attr">g</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>((g + m) * <span class="hljs-number">255</span>),
      <span class="hljs-attr">b</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>((b + m) * <span class="hljs-number">255</span>)
    };
  };

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;scatter&#x27;</span>,
    points,
    colorScale
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">renderOnMainThread</span>(<span class="hljs-params"><span class="hljs-attr">canvas</span>: <span class="hljs-title class_">HTMLCanvasElement</span>, <span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span>[]</span>) {
  <span class="hljs-keyword">const</span> ctx = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>);
  <span class="hljs-keyword">if</span> (!ctx) <span class="hljs-keyword">return</span>;

  <span class="hljs-comment">// Fallback rendering on main thread</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;OffscreenCanvas not supported, rendering on main thread&#x27;</span>);

  <span class="hljs-comment">// Simple rendering implementation</span>
  ctx.<span class="hljs-title function_">clearRect</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.<span class="hljs-property">width</span>, canvas.<span class="hljs-property">height</span>);

  data.<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">point</span> =&gt;</span> {
    ctx.<span class="hljs-title function_">beginPath</span>();
    ctx.<span class="hljs-title function_">arc</span>(point.<span class="hljs-property">x</span>, point.<span class="hljs-property">y</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span> * <span class="hljs-number">2</span>);
    ctx.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">\`hsl(<span class="hljs-subst">\${point.value * <span class="hljs-number">360</span>}</span>, 50%, 50%)\`</span>;
    ctx.<span class="hljs-title function_">fill</span>();
  });
}
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">CanvasPerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">PerformanceMetrics</span> = {
    <span class="hljs-attr">fps</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">frameTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">workerTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">transferTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">renderTime</span>: <span class="hljs-number">0</span>,
  };

  <span class="hljs-keyword">private</span> <span class="hljs-attr">frameTimings</span>: <span class="hljs-built_in">number</span>[] = [];
  <span class="hljs-keyword">private</span> lastFrameTime = <span class="hljs-number">0</span>;

  <span class="hljs-title function_">startFrame</span>(): <span class="hljs-title class_">FrameTimer</span> {
    <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">markTransferStart</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">transferTime</span> = performance.<span class="hljs-title function_">now</span>() - startTime;
      },

      <span class="hljs-attr">markWorkerStart</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> workerStart = performance.<span class="hljs-title function_">now</span>();
        <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">workerTime</span> = performance.<span class="hljs-title function_">now</span>() - workerStart;
        };
      },

      <span class="hljs-attr">markRenderComplete</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> frameTime = performance.<span class="hljs-title function_">now</span>() - startTime;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">frameTime</span> = frameTime;
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateFPS</span>(frameTime);
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportIfSlow</span>(frameTime);
      },
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">updateFPS</span>(<span class="hljs-params"><span class="hljs-attr">frameTime</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameTimings</span>.<span class="hljs-title function_">push</span>(frameTime);

    <span class="hljs-comment">// Keep last 60 frames</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">frameTimings</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">60</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameTimings</span>.<span class="hljs-title function_">shift</span>();
    }

    <span class="hljs-comment">// Calculate average FPS</span>
    <span class="hljs-keyword">const</span> avgFrameTime = <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameTimings</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameTimings</span>.<span class="hljs-property">length</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">fps</span> = <span class="hljs-number">1000</span> / avgFrameTime;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportIfSlow</span>(<span class="hljs-params"><span class="hljs-attr">frameTime</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">if</span> (frameTime &gt; <span class="hljs-number">16.67</span>) {
      <span class="hljs-comment">// Slower than 60fps</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Slow frame detected: <span class="hljs-subst">\${frameTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>, {
        <span class="hljs-attr">workerTime</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">workerTime</span>,
        <span class="hljs-attr">transferTime</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">transferTime</span>,
      });
    }
  }

  <span class="hljs-title function_">getMetrics</span>(): <span class="hljs-title class_">PerformanceMetrics</span> {
    <span class="hljs-keyword">return</span> { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> };
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceMetrics</span> {
  <span class="hljs-attr">fps</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">frameTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">workerTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">transferTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">renderTime</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FrameTimer</span> {
  <span class="hljs-attr">markTransferStart</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">markWorkerStart</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">markRenderComplete</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>استخدم OffscreenCanvas في:</strong></p>
<ul>
<li>التصوّرات المعقّدة</li>
<li>تصيير البيانات في الوقت الحقيقي</li>
<li>معالجة الصور والفيديو</li>
<li>الرسوميات والألعاب ثلاثية الأبعاد</li>
</ul>
<p>✅ <strong>حسّن التواصل مع العامل:</strong></p>
<ul>
<li>استخدم الكائنات القابلة للنقل (transferable)</li>
<li>جمّع التحديثات حين أمكن</li>
<li>قلّل حجم الرسائل</li>
<li>تجنّب التبادل المتكرر ذهابًا وإيابًا</li>
</ul>
<p>✅ <strong>تعامل مع البدائل الاحتياطية:</strong></p>
<ul>
<li>تحقّق من الدعم</li>
<li>وفّر بديلًا احتياطيًا على الخيط الرئيسي</li>
<li>اختبر على أجهزة متنوعة</li>
<li>راقب الأداء</li>
</ul>
<p>✅ <strong>أدر الموارد:</strong></p>
<ul>
<li>نظّف عمال الويب</li>
<li>تخلّص من موارد WebGL</li>
<li>أفرغ المخازن المؤقتة الكبيرة</li>
<li>أنهِ عمال الويب غير المستخدمة</li>
</ul>
<p>✅ <strong>حلّل الأداء:</strong></p>
<ul>
<li>راقب أزمنة الإطارات</li>
<li>تتبّع استغلال العامل</li>
<li>قِس الكلفة الإضافية للنقل</li>
<li>حدّد الاختناقات</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
