const s="kinney",a="react-performance",n="أداء React",l="gpu-acceleration-patterns",p="أنماط تسريع GPU",t=[{depth:2,id:"فهم-تسريع-gpu",text:"فهم تسريع GPU"},{depth:2,id:"تسريع-gpu-عبر-css",text:"تسريع GPU عبر CSS"},{depth:3,id:"الخصائص-المعجلة-عتاديا",text:"الخصائص المعجّلة عتاديًا"},{depth:3,id:"إنشاء-طبقات-لـ-gpu",text:"إنشاء طبقات لـ GPU"},{depth:3,id:"تحسين-react-spring-لأجل-gpu",text:"تحسين React Spring لأجل GPU"},{depth:2,id:"التكامل-مع-webgl-في-react",text:"التكامل مع WebGL في React"},{depth:3,id:"التكامل-الأساسي-مع-threejs",text:"التكامل الأساسي مع Three.js"},{depth:3,id:"تظليلات-مخصصة-للحساب",text:"تظليلات مخصّصة للحساب"},{depth:2,id:"webgpu-مستقبل-الحوسبة-على-gpu",text:"WebGPU — مستقبل الحوسبة على GPU"},{depth:2,id:"تصور-البيانات-المعجل-بـ-gpu",text:"تصوّر البيانات المعجّل بـ GPU"},{depth:2,id:"إدارة-ذاكرة-gpu",text:"إدارة ذاكرة GPU"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"المعالجة-الهجينة-بين-cpu-وgpu",text:"المعالجة الهجينة بين CPU وGPU"},{depth:2,id:"تحسين-أداء-الحركات",text:"تحسين أداء الحركات"},{depth:3,id:"إدارة-خاصية-will-change",text:"إدارة خاصية will-change"},{depth:3,id:"محفزات-التسريع-العتادي",text:"محفّزات التسريع العتادي"},{depth:3,id:"إدارة-طبقات-التركيب",text:"إدارة طبقات التركيب"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>يعمل تطبيق React لديك بسلاسة… إلى أن تضيف نظام الجسيمات ذلك. أو تصوّر البيانات المعقّد ذلك. أو حركات 60 إطارًا في الثانية تلك. فجأةً، يصل المعالج CPU إلى أقصى طاقته، وتدور المراوح بأقصى سرعتها، وتتلعثم واجهتك المتقنة كأسطوانة مشروخة. وفي هذه الأثناء، تظل وحدة معالجة الرسوميات GPU — قوة معالجة متوازية — عاطلة، تنتظر فرصة المساعدة.</p>
<p>وهذه هي الحقيقة: تملك الأجهزة الحديثة قدرة GPU مذهلة لا تلمسها معظم تطبيقات React أبدًا. تستطيع هواتف مستخدميك تصيير ملايين المثلثات في الثانية، وتطبيق تظليلات (shaders) معقّدة في الوقت الحقيقي، والتعامل مع حسابات متوازية تسحق أي CPU. والحيلة هي معرفة كيفية الاستفادة من هذه القوة انطلاقًا من React.</p>
<p>لنستكشف كيفية تفريغ العمل إلى GPU، من تحويلات CSS البسيطة إلى التصوّرات المدعومة بـ WebGL، ونحوّل تطبيق React لديك إلى آلة أداء معجّلة عتاديًا.</p>
<h2 id="فهم-تسريع-gpu">فهم تسريع GPU</h2>
<p>تتفوّق GPU في العمليات المتوازية — أي فعل الشيء نفسه على كميات كبيرة من البيانات في آن واحد:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">GPUvsCP</span> {
  <span class="hljs-attr">cpu</span>: {
    <span class="hljs-attr">cores</span>: <span class="hljs-number">4</span>-<span class="hljs-number">8</span>;
    <span class="hljs-attr">strength</span>: <span class="hljs-string">&#x27;complex sequential logic&#x27;</span>;
    <span class="hljs-attr">weakness</span>: <span class="hljs-string">&#x27;parallel processing&#x27;</span>;
  };
  <span class="hljs-attr">gpu</span>: {
    <span class="hljs-attr">cores</span>: 100s-1000s;
    <span class="hljs-attr">strength</span>: <span class="hljs-string">&#x27;parallel operations&#x27;</span>;
    <span class="hljs-attr">weakness</span>: <span class="hljs-string">&#x27;complex branching logic&#x27;</span>;
  };
}

<span class="hljs-comment">// CPU approach - sequential</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">cpuProcess</span>(<span class="hljs-params"><span class="hljs-attr">pixels</span>: <span class="hljs-title class_">Pixel</span>[]</span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; pixels.<span class="hljs-property">length</span>; i++) {
    pixels[i] = <span class="hljs-title function_">complexTransform</span>(pixels[i]);
  }
}

<span class="hljs-comment">// GPU approach - parallel</span>
<span class="hljs-comment">// All pixels transformed simultaneously</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">gpuProcess</span>(<span class="hljs-params"><span class="hljs-attr">pixels</span>: <span class="hljs-title class_">Pixel</span>[]</span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-comment">// Runs on hundreds of cores at once</span>
  gpuShader.<span class="hljs-title function_">run</span>(pixels);
}
</code></pre>
<h2 id="تسريع-gpu-عبر-css">تسريع GPU عبر CSS</h2>
<p>أسهل طريقة للاستفادة من GPU في React هي عبر تحويلات CSS:</p>
<h3 id="الخصائص-المعجلة-عتاديا">الخصائص المعجّلة عتاديًا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Triggers layout and paint - runs on CPU</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">CPUAnimation</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [position, setPosition] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">animate</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setPosition</span>(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p + <span class="hljs-number">1</span>);
      <span class="hljs-title function_">requestAnimationFrame</span>(animate);
    };
    <span class="hljs-title function_">animate</span>();
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">position:</span> &#x27;<span class="hljs-attr">absolute</span>&#x27;,
        <span class="hljs-attr">left:</span> \`\${<span class="hljs-attr">position</span>}<span class="hljs-attr">px</span>\`, // <span class="hljs-attr">Changes</span> <span class="hljs-attr">layout</span>
        <span class="hljs-attr">top:</span> &#x27;<span class="hljs-attr">50px</span>&#x27;
      }}
    &gt;</span>
      Slow animation
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// ✅ GPU-accelerated transform</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">GPUAnimation</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [transform, setTransform] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">animate</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setTransform</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t + <span class="hljs-number">1</span>);
      <span class="hljs-title function_">requestAnimationFrame</span>(animate);
    };
    <span class="hljs-title function_">animate</span>();
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">transform:</span> \`<span class="hljs-attr">translateX</span>(\${<span class="hljs-attr">transform</span>}<span class="hljs-attr">px</span>)\`, // <span class="hljs-attr">GPU</span> <span class="hljs-attr">accelerated</span>
        <span class="hljs-attr">willChange:</span> &#x27;<span class="hljs-attr">transform</span>&#x27; // <span class="hljs-attr">Hint</span> <span class="hljs-attr">to</span> <span class="hljs-attr">browser</span>
      }}
    &gt;</span>
      Smooth animation
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="إنشاء-طبقات-لـ-gpu">إنشاء طبقات لـ GPU</h3>
<p>أجبر العناصر على الانتقال إلى طبقات GPU منفصلة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useGPULayer</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateZ(0)&#x27;</span>, <span class="hljs-comment">// Force GPU layer</span>
    <span class="hljs-attr">willChange</span>: <span class="hljs-string">&#x27;transform&#x27;</span>,
    <span class="hljs-attr">backfaceVisibility</span>: <span class="hljs-string">&#x27;hidden&#x27;</span> <span class="hljs-comment">// Optimization hint</span>
  }), []);
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ComplexComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> gpuStyle = <span class="hljs-title function_">useGPULayer</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{gpuStyle}</span>&gt;</span>
      {/* This component now has its own GPU layer */}
      <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveVisualization</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="تحسين-react-spring-لأجل-gpu">تحسين React Spring لأجل GPU</h3>
<p>هيّئ حركات React Spring لتسريع GPU:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useSpring, animated, config } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@react-spring/web&#x27;</span>;

<span class="hljs-comment">// ❌ Non-GPU properties</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">BadSpring</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> styles = <span class="hljs-title function_">useSpring</span>({
    <span class="hljs-attr">from</span>: { <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">width</span>: <span class="hljs-number">100</span> },
    <span class="hljs-attr">to</span>: { <span class="hljs-attr">left</span>: <span class="hljs-number">100</span>, <span class="hljs-attr">width</span>: <span class="hljs-number">200</span> },
    <span class="hljs-attr">config</span>: config.<span class="hljs-property">default</span>
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">animated.div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles}</span>&gt;</span>Slow<span class="hljs-tag">&lt;/<span class="hljs-name">animated.div</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ GPU-accelerated properties</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">GoodSpring</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> styles = <span class="hljs-title function_">useSpring</span>({
    <span class="hljs-attr">from</span>: {
      <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translate3d(0px, 0px, 0px) scale(1)&#x27;</span>,
      <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">to</span>: {
      <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translate3d(100px, 0px, 0px) scale(2)&#x27;</span>,
      <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>
    },
    <span class="hljs-attr">config</span>: { ...config.<span class="hljs-property">default</span>, <span class="hljs-attr">precision</span>: <span class="hljs-number">0.01</span> }
  });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">animated.div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles}</span>&gt;</span>Fast<span class="hljs-tag">&lt;/<span class="hljs-name">animated.div</span>&gt;</span></span>;
};
</code></pre>
<h2 id="التكامل-مع-webgl-في-react">التكامل مع WebGL في React</h2>
<p>للحسابات الجدّية على GPU، يُعدّ WebGL بوابتك:</p>
<h3 id="التكامل-الأساسي-مع-threejs">التكامل الأساسي مع Three.js</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Canvas</span>, useFrame } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@react-three/fiber&#x27;</span>;
<span class="hljs-keyword">import</span> { useRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> <span class="hljs-variable constant_">THREE</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;three&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ParticleSystemProps</span> {
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ParticleSystem</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ParticleSystemProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ count }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> mesh = useRef&lt;<span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">Points</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> particles = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> positions = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(count * <span class="hljs-number">3</span>);
    <span class="hljs-keyword">const</span> colors = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(count * <span class="hljs-number">3</span>);

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; count; i++) {
      positions[i * <span class="hljs-number">3</span>] = (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() - <span class="hljs-number">0.5</span>) * <span class="hljs-number">10</span>;
      positions[i * <span class="hljs-number">3</span> + <span class="hljs-number">1</span>] = (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() - <span class="hljs-number">0.5</span>) * <span class="hljs-number">10</span>;
      positions[i * <span class="hljs-number">3</span> + <span class="hljs-number">2</span>] = (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() - <span class="hljs-number">0.5</span>) * <span class="hljs-number">10</span>;

      colors[i * <span class="hljs-number">3</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
      colors[i * <span class="hljs-number">3</span> + <span class="hljs-number">1</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
      colors[i * <span class="hljs-number">3</span> + <span class="hljs-number">2</span>] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
    }

    <span class="hljs-keyword">return</span> { positions, colors };
  }, [count]);

  <span class="hljs-title function_">useFrame</span>(<span class="hljs-function">(<span class="hljs-params">state, delta</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (mesh.<span class="hljs-property">current</span>) {
      mesh.<span class="hljs-property">current</span>.<span class="hljs-property">rotation</span>.<span class="hljs-property">x</span> += delta * <span class="hljs-number">0.1</span>;
      mesh.<span class="hljs-property">current</span>.<span class="hljs-property">rotation</span>.<span class="hljs-property">y</span> += delta * <span class="hljs-number">0.15</span>;
    }
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">points</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{mesh}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">bufferGeometry</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bufferAttribute</span>
          <span class="hljs-attr">attach</span>=<span class="hljs-string">&quot;attributes-position&quot;</span>
          <span class="hljs-attr">count</span>=<span class="hljs-string">{count}</span>
          <span class="hljs-attr">array</span>=<span class="hljs-string">{particles.positions}</span>
          <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{3}</span>
        /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bufferAttribute</span>
          <span class="hljs-attr">attach</span>=<span class="hljs-string">&quot;attributes-color&quot;</span>
          <span class="hljs-attr">count</span>=<span class="hljs-string">{count}</span>
          <span class="hljs-attr">array</span>=<span class="hljs-string">{particles.colors}</span>
          <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{3}</span>
        /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">bufferGeometry</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">pointsMaterial</span> <span class="hljs-attr">size</span>=<span class="hljs-string">{0.05}</span> <span class="hljs-attr">vertexColors</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">points</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">GPUParticles</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Canvas</span> <span class="hljs-attr">camera</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">position:</span> [<span class="hljs-attr">0</span>, <span class="hljs-attr">0</span>, <span class="hljs-attr">5</span>] }}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ParticleSystem</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{10000}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Canvas</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="تظليلات-مخصصة-للحساب">تظليلات مخصّصة للحساب</h3>
<p>استخدم تظليلات (shaders) GPU للحسابات المعقّدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> computeShader = <span class="hljs-string">\`
  precision highp float;

  attribute vec3 position;
  attribute vec3 velocity;

  uniform float time;
  uniform float gravity;

  varying vec3 vColor;

  void main() {
    // GPU parallel computation for each particle
    vec3 pos = position + velocity * time;
    pos.y -= 0.5 * gravity * time * time;

    // Color based on velocity
    vColor = normalize(abs(velocity));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0;
  }
\`</span>;

<span class="hljs-keyword">const</span> fragmentShader = <span class="hljs-string">\`
  precision highp float;

  varying vec3 vColor;

  void main() {
    // GPU processes each pixel in parallel
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist &gt; 0.5) discard;

    gl_FragColor = vec4(vColor, 1.0 - dist);
  }
\`</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">GPUPhysics</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> materialRef = useRef&lt;<span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">ShaderMaterial</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useFrame</span>(<span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (materialRef.<span class="hljs-property">current</span>) {
      materialRef.<span class="hljs-property">current</span>.<span class="hljs-property">uniforms</span>.<span class="hljs-property">time</span>.<span class="hljs-property">value</span> = state.<span class="hljs-property">clock</span>.<span class="hljs-property">elapsedTime</span>;
    }
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">points</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">bufferGeometry</span>&gt;</span>
        {/* Geometry setup */}
      <span class="hljs-tag">&lt;/<span class="hljs-name">bufferGeometry</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">shaderMaterial</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{materialRef}</span>
        <span class="hljs-attr">vertexShader</span>=<span class="hljs-string">{computeShader}</span>
        <span class="hljs-attr">fragmentShader</span>=<span class="hljs-string">{fragmentShader}</span>
        <span class="hljs-attr">uniforms</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">time:</span> { <span class="hljs-attr">value:</span> <span class="hljs-attr">0</span> },
          <span class="hljs-attr">gravity:</span> { <span class="hljs-attr">value:</span> <span class="hljs-attr">9.8</span> }
        }}
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">points</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="webgpu-مستقبل-الحوسبة-على-gpu">WebGPU — مستقبل الحوسبة على GPU</h2>
<p>توفّر WebGPU وصولًا مباشرًا إلى حوسبة GPU:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">WebGPUCompute</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">device</span>: <span class="hljs-title class_">GPUDevice</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">pipeline</span>: <span class="hljs-title class_">GPUComputePipeline</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">initialize</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!navigator.<span class="hljs-property">gpu</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;WebGPU not supported&#x27;</span>);
    }

    <span class="hljs-keyword">const</span> adapter = <span class="hljs-keyword">await</span> navigator.<span class="hljs-property">gpu</span>.<span class="hljs-title function_">requestAdapter</span>();
    <span class="hljs-keyword">if</span> (!adapter) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;No GPU adapter found&#x27;</span>);

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span> = <span class="hljs-keyword">await</span> adapter.<span class="hljs-title function_">requestDevice</span>();
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">createComputePipeline</span>(<span class="hljs-params"><span class="hljs-attr">shaderCode</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Device not initialized&#x27;</span>);

    <span class="hljs-keyword">const</span> shaderModule = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createShaderModule</span>({
      <span class="hljs-attr">code</span>: shaderCode,
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pipeline</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createComputePipeline</span>({
      <span class="hljs-attr">layout</span>: <span class="hljs-string">&#x27;auto&#x27;</span>,
      <span class="hljs-attr">compute</span>: {
        <span class="hljs-attr">module</span>: shaderModule,
        <span class="hljs-attr">entryPoint</span>: <span class="hljs-string">&#x27;main&#x27;</span>,
      },
    });
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">compute</span>(<span class="hljs-attr">inputData</span>: <span class="hljs-title class_">Float32Array</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Float32Array</span>&gt; {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span> || !<span class="hljs-variable language_">this</span>.<span class="hljs-property">pipeline</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Pipeline not initialized&#x27;</span>);
    }

    <span class="hljs-comment">// Create GPU buffers</span>
    <span class="hljs-keyword">const</span> inputBuffer = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createBuffer</span>({
      <span class="hljs-attr">size</span>: inputData.<span class="hljs-property">byteLength</span>,
      <span class="hljs-attr">usage</span>: <span class="hljs-title class_">GPUBufferUsage</span>.<span class="hljs-property">STORAGE</span> | <span class="hljs-title class_">GPUBufferUsage</span>.<span class="hljs-property">COPY_DST</span>,
    });

    <span class="hljs-keyword">const</span> outputBuffer = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createBuffer</span>({
      <span class="hljs-attr">size</span>: inputData.<span class="hljs-property">byteLength</span>,
      <span class="hljs-attr">usage</span>: <span class="hljs-title class_">GPUBufferUsage</span>.<span class="hljs-property">STORAGE</span> | <span class="hljs-title class_">GPUBufferUsage</span>.<span class="hljs-property">COPY_SRC</span>,
    });

    <span class="hljs-comment">// Write data to GPU</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">writeBuffer</span>(inputBuffer, <span class="hljs-number">0</span>, inputData);

    <span class="hljs-comment">// Create bind group</span>
    <span class="hljs-keyword">const</span> bindGroup = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createBindGroup</span>({
      <span class="hljs-attr">layout</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">pipeline</span>.<span class="hljs-title function_">getBindGroupLayout</span>(<span class="hljs-number">0</span>),
      <span class="hljs-attr">entries</span>: [
        { <span class="hljs-attr">binding</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">resource</span>: { <span class="hljs-attr">buffer</span>: inputBuffer } },
        { <span class="hljs-attr">binding</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">resource</span>: { <span class="hljs-attr">buffer</span>: outputBuffer } },
      ],
    });

    <span class="hljs-comment">// Encode GPU commands</span>
    <span class="hljs-keyword">const</span> commandEncoder = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createCommandEncoder</span>();
    <span class="hljs-keyword">const</span> passEncoder = commandEncoder.<span class="hljs-title function_">beginComputePass</span>();

    passEncoder.<span class="hljs-title function_">setPipeline</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">pipeline</span>);
    passEncoder.<span class="hljs-title function_">setBindGroup</span>(<span class="hljs-number">0</span>, bindGroup);
    passEncoder.<span class="hljs-title function_">dispatchWorkgroups</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(inputData.<span class="hljs-property">length</span> / <span class="hljs-number">64</span>));
    passEncoder.<span class="hljs-title function_">end</span>();

    <span class="hljs-comment">// Submit to GPU</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">submit</span>([commandEncoder.<span class="hljs-title function_">finish</span>()]);

    <span class="hljs-comment">// Read results</span>
    <span class="hljs-keyword">const</span> staging = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createBuffer</span>({
      <span class="hljs-attr">size</span>: inputData.<span class="hljs-property">byteLength</span>,
      <span class="hljs-attr">usage</span>: <span class="hljs-title class_">GPUBufferUsage</span>.<span class="hljs-property">MAP_READ</span> | <span class="hljs-title class_">GPUBufferUsage</span>.<span class="hljs-property">COPY_DST</span>,
    });

    <span class="hljs-keyword">const</span> copyEncoder = <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-title function_">createCommandEncoder</span>();
    copyEncoder.<span class="hljs-title function_">copyBufferToBuffer</span>(outputBuffer, <span class="hljs-number">0</span>, staging, <span class="hljs-number">0</span>, inputData.<span class="hljs-property">byteLength</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">device</span>.<span class="hljs-property">queue</span>.<span class="hljs-title function_">submit</span>([copyEncoder.<span class="hljs-title function_">finish</span>()]);

    <span class="hljs-keyword">await</span> staging.<span class="hljs-title function_">mapAsync</span>(<span class="hljs-title class_">GPUMapMode</span>.<span class="hljs-property">READ</span>);
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(staging.<span class="hljs-title function_">getMappedRange</span>());

    <span class="hljs-keyword">return</span> result;
  }
}

<span class="hljs-comment">// React hook for WebGPU compute</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useWebGPUCompute</span> = (<span class="hljs-params"><span class="hljs-attr">shaderCode</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> [compute, setCompute] = useState&lt;<span class="hljs-title class_">WebGPUCompute</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [ready, setReady] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">init</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> gpu = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebGPUCompute</span>();
      <span class="hljs-keyword">await</span> gpu.<span class="hljs-title function_">initialize</span>();
      <span class="hljs-keyword">await</span> gpu.<span class="hljs-title function_">createComputePipeline</span>(shaderCode);
      <span class="hljs-title function_">setCompute</span>(gpu);
      <span class="hljs-title function_">setReady</span>(<span class="hljs-literal">true</span>);
    };

    <span class="hljs-title function_">init</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-variable language_">console</span>.<span class="hljs-property">error</span>);
  }, [shaderCode]);

  <span class="hljs-keyword">return</span> { compute, ready };
};
</code></pre>
<h2 id="تصور-البيانات-المعجل-بـ-gpu">تصوّر البيانات المعجّل بـ GPU</h2>
<p>صيّر مجموعات بيانات ضخمة باستخدام GPU:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useMemo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { scaleLinear } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;d3-scale&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataPoint</span> {
  <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">GPUScatterPlot</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">data</span>: <span class="hljs-title class_">DataPoint</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> geometry = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> positions = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(data.<span class="hljs-property">length</span> * <span class="hljs-number">3</span>);
    <span class="hljs-keyword">const</span> colors = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(data.<span class="hljs-property">length</span> * <span class="hljs-number">3</span>);

    <span class="hljs-keyword">const</span> colorScale = scaleLinear&lt;<span class="hljs-built_in">string</span>&gt;()
      .<span class="hljs-title function_">domain</span>([<span class="hljs-number">0</span>, <span class="hljs-number">100</span>])
      .<span class="hljs-title function_">range</span>([<span class="hljs-string">&#x27;#0066CC&#x27;</span>, <span class="hljs-string">&#x27;#FF6600&#x27;</span>]);

    data.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">point, i</span>) =&gt;</span> {
      <span class="hljs-comment">// Position</span>
      positions[i * <span class="hljs-number">3</span>] = point.<span class="hljs-property">x</span>;
      positions[i * <span class="hljs-number">3</span> + <span class="hljs-number">1</span>] = point.<span class="hljs-property">y</span>;
      positions[i * <span class="hljs-number">3</span> + <span class="hljs-number">2</span>] = <span class="hljs-number">0</span>;

      <span class="hljs-comment">// Color based on value</span>
      <span class="hljs-keyword">const</span> color = <span class="hljs-keyword">new</span> <span class="hljs-variable constant_">THREE</span>.<span class="hljs-title class_">Color</span>(<span class="hljs-title function_">colorScale</span>(point.<span class="hljs-property">value</span>));
      colors[i * <span class="hljs-number">3</span>] = color.<span class="hljs-property">r</span>;
      colors[i * <span class="hljs-number">3</span> + <span class="hljs-number">1</span>] = color.<span class="hljs-property">g</span>;
      colors[i * <span class="hljs-number">3</span> + <span class="hljs-number">2</span>] = color.<span class="hljs-property">b</span>;
    });

    <span class="hljs-keyword">return</span> { positions, colors };
  }, [data]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Canvas</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">points</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bufferGeometry</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">bufferAttribute</span>
            <span class="hljs-attr">attach</span>=<span class="hljs-string">&quot;attributes-position&quot;</span>
            <span class="hljs-attr">array</span>=<span class="hljs-string">{geometry.positions}</span>
            <span class="hljs-attr">count</span>=<span class="hljs-string">{data.length}</span>
            <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{3}</span>
          /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">bufferAttribute</span>
            <span class="hljs-attr">attach</span>=<span class="hljs-string">&quot;attributes-color&quot;</span>
            <span class="hljs-attr">array</span>=<span class="hljs-string">{geometry.colors}</span>
            <span class="hljs-attr">count</span>=<span class="hljs-string">{data.length}</span>
            <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{3}</span>
          /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">bufferGeometry</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">pointsMaterial</span>
          <span class="hljs-attr">size</span>=<span class="hljs-string">{2}</span>
          <span class="hljs-attr">vertexColors</span>
          <span class="hljs-attr">sizeAttenuation</span>=<span class="hljs-string">{false}</span>
        /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">points</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Canvas</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="إدارة-ذاكرة-gpu">إدارة ذاكرة GPU</h2>
<p>إدارة ذاكرة GPU أمر بالغ الأهمية للأداء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GPUResourceManager</span> {
  <span class="hljs-keyword">private</span> textures = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">Texture</span>&gt;();
  <span class="hljs-keyword">private</span> geometries = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">BufferGeometry</span>&gt;();
  <span class="hljs-keyword">private</span> materials = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">Material</span>&gt;();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">maxTextureSize</span>: <span class="hljs-built_in">number</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">renderer</span>: THREE.<span class="hljs-title class_">WebGLRenderer</span></span>) {
    <span class="hljs-keyword">const</span> gl = renderer.<span class="hljs-title function_">getContext</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxTextureSize</span> = gl.<span class="hljs-title function_">getParameter</span>(gl.<span class="hljs-property">MAX_TEXTURE_SIZE</span>);
  }

  <span class="hljs-title function_">loadTexture</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">Texture</span>&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">textures</span>.<span class="hljs-title function_">has</span>(key)) {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">textures</span>.<span class="hljs-title function_">get</span>(key)!);
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> loader = <span class="hljs-keyword">new</span> <span class="hljs-variable constant_">THREE</span>.<span class="hljs-title class_">TextureLoader</span>();

      loader.<span class="hljs-title function_">load</span>(
        url,
        <span class="hljs-function">(<span class="hljs-params">texture</span>) =&gt;</span> {
          <span class="hljs-comment">// Optimize for GPU</span>
          texture.<span class="hljs-property">minFilter</span> = <span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">LinearMipmapLinearFilter</span>;
          texture.<span class="hljs-property">magFilter</span> = <span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">LinearFilter</span>;
          texture.<span class="hljs-property">generateMipmaps</span> = <span class="hljs-literal">true</span>;

          <span class="hljs-comment">// Compress if too large</span>
          <span class="hljs-keyword">if</span> (texture.<span class="hljs-property">image</span>.<span class="hljs-property">width</span> &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxTextureSize</span>) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">compressTexture</span>(texture);
          }

          <span class="hljs-variable language_">this</span>.<span class="hljs-property">textures</span>.<span class="hljs-title function_">set</span>(key, texture);
          <span class="hljs-title function_">resolve</span>(texture);
        },
        <span class="hljs-literal">undefined</span>,
        reject,
      );
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">compressTexture</span>(<span class="hljs-params"><span class="hljs-attr">texture</span>: THREE.<span class="hljs-title class_">Texture</span></span>) {
    <span class="hljs-keyword">const</span> canvas = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;canvas&#x27;</span>);
    <span class="hljs-keyword">const</span> ctx = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>)!;

    canvas.<span class="hljs-property">width</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxTextureSize</span>;
    canvas.<span class="hljs-property">height</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxTextureSize</span>;

    ctx.<span class="hljs-title function_">drawImage</span>(texture.<span class="hljs-property">image</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.<span class="hljs-property">width</span>, canvas.<span class="hljs-property">height</span>);
    texture.<span class="hljs-property">image</span> = canvas;
  }

  <span class="hljs-title function_">dispose</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> texture = <span class="hljs-variable language_">this</span>.<span class="hljs-property">textures</span>.<span class="hljs-title function_">get</span>(key);
    <span class="hljs-keyword">if</span> (texture) {
      texture.<span class="hljs-title function_">dispose</span>();
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">textures</span>.<span class="hljs-title function_">delete</span>(key);
    }

    <span class="hljs-keyword">const</span> geometry = <span class="hljs-variable language_">this</span>.<span class="hljs-property">geometries</span>.<span class="hljs-title function_">get</span>(key);
    <span class="hljs-keyword">if</span> (geometry) {
      geometry.<span class="hljs-title function_">dispose</span>();
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">geometries</span>.<span class="hljs-title function_">delete</span>(key);
    }

    <span class="hljs-keyword">const</span> material = <span class="hljs-variable language_">this</span>.<span class="hljs-property">materials</span>.<span class="hljs-title function_">get</span>(key);
    <span class="hljs-keyword">if</span> (material) {
      material.<span class="hljs-title function_">dispose</span>();
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">materials</span>.<span class="hljs-title function_">delete</span>(key);
    }
  }

  <span class="hljs-title function_">disposeAll</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">textures</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">dispose</span>());
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">geometries</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">g</span>) =&gt;</span> g.<span class="hljs-title function_">dispose</span>());
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">materials</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-title function_">dispose</span>());

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">textures</span>.<span class="hljs-title function_">clear</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">geometries</span>.<span class="hljs-title function_">clear</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">materials</span>.<span class="hljs-title function_">clear</span>();
  }
}

<span class="hljs-comment">// React hook for GPU resource management</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useGPUResources</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> managerRef = useRef&lt;<span class="hljs-title class_">GPUResourceManager</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Cleanup on unmount</span>
      managerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">disposeAll</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> managerRef;
};
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<p>تتبّع مقاييس أداء GPU:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GPUPerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">renderer</span>: <span class="hljs-variable constant_">THREE</span>.<span class="hljs-property">WebGLRenderer</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">stats</span>: {
    <span class="hljs-attr">drawCalls</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">triangles</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">points</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">lines</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">frameTime</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">gpuMemory</span>: {
      <span class="hljs-attr">geometries</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">textures</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">programs</span>: <span class="hljs-built_in">number</span>;
    };
  };

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">renderer</span>: THREE.<span class="hljs-title class_">WebGLRenderer</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">renderer</span> = renderer;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span> = {
      <span class="hljs-attr">drawCalls</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">triangles</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">points</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">lines</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">frameTime</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">gpuMemory</span>: {
        <span class="hljs-attr">geometries</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">textures</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">programs</span>: <span class="hljs-number">0</span>
      }
    };
  }

  <span class="hljs-title function_">update</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> info = <span class="hljs-variable language_">this</span>.<span class="hljs-property">renderer</span>.<span class="hljs-property">info</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span> = {
      <span class="hljs-attr">drawCalls</span>: info.<span class="hljs-property">render</span>.<span class="hljs-property">calls</span>,
      <span class="hljs-attr">triangles</span>: info.<span class="hljs-property">render</span>.<span class="hljs-property">triangles</span>,
      <span class="hljs-attr">points</span>: info.<span class="hljs-property">render</span>.<span class="hljs-property">points</span>,
      <span class="hljs-attr">lines</span>: info.<span class="hljs-property">render</span>.<span class="hljs-property">lines</span>,
      <span class="hljs-attr">frameTime</span>: info.<span class="hljs-property">render</span>.<span class="hljs-property">frame</span>,
      <span class="hljs-attr">gpuMemory</span>: {
        <span class="hljs-attr">geometries</span>: info.<span class="hljs-property">memory</span>.<span class="hljs-property">geometries</span>,
        <span class="hljs-attr">textures</span>: info.<span class="hljs-property">memory</span>.<span class="hljs-property">textures</span>,
        <span class="hljs-attr">programs</span>: info.<span class="hljs-property">programs</span>?.<span class="hljs-property">length</span> || <span class="hljs-number">0</span>
      }
    };

    <span class="hljs-comment">// Check for performance issues</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">drawCalls</span> &gt; <span class="hljs-number">100</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;High draw call count:&#x27;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">drawCalls</span>);
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">gpuMemory</span>.<span class="hljs-property">textures</span> &gt; <span class="hljs-number">50</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;High texture count:&#x27;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span>.<span class="hljs-property">gpuMemory</span>.<span class="hljs-property">textures</span>);
    }
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> { ...<span class="hljs-variable language_">this</span>.<span class="hljs-property">stats</span> };
  }
}

<span class="hljs-comment">// React component for GPU stats display</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">GPUStatsOverlay</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">monitor</span>: <span class="hljs-title class_">GPUPerformanceMonitor</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ monitor }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [stats, setStats] = <span class="hljs-title function_">useState</span>(monitor.<span class="hljs-title function_">getStats</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setStats</span>(monitor.<span class="hljs-title function_">getStats</span>());
    }, <span class="hljs-number">100</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, [monitor]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;gpu-stats-overlay&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Draw Calls: {stats.drawCalls}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Triangles: {stats.triangles.toLocaleString()}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Textures: {stats.gpuMemory.textures}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Programs: {stats.gpuMemory.programs}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="المعالجة-الهجينة-بين-cpu-وgpu">المعالجة الهجينة بين CPU وGPU</h2>
<p>وازن العمل بين CPU وGPU:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">HybridProcessor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">useGPU</span>: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">gpuThreshold</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">10000</span>;

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">processData</span>(<span class="hljs-attr">data</span>: <span class="hljs-title class_">Float32Array</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Float32Array</span>&gt; {
    <span class="hljs-comment">// Choose processor based on data size and availability</span>
    <span class="hljs-keyword">if</span> (data.<span class="hljs-property">length</span> &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">gpuThreshold</span> || !<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isGPUAvailable</span>()) {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processCPU</span>(data);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processGPU</span>(data);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">processCPU</span>(<span class="hljs-attr">data</span>: <span class="hljs-title class_">Float32Array</span>): <span class="hljs-title class_">Float32Array</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(data.<span class="hljs-property">length</span>);

    <span class="hljs-comment">// CPU processing - good for small datasets</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data.<span class="hljs-property">length</span>; i++) {
      result[i] = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sin</span>(data[i]) * <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">cos</span>(data[i] * <span class="hljs-number">2</span>);
    }

    <span class="hljs-keyword">return</span> result;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">processGPU</span>(<span class="hljs-attr">data</span>: <span class="hljs-title class_">Float32Array</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Float32Array</span>&gt; {
    <span class="hljs-comment">// GPU processing - good for large datasets</span>
    <span class="hljs-keyword">const</span> shader = <span class="hljs-string">\`
      @group(0) @binding(0) var&lt;storage, read&gt; input: array&lt;f32&gt;;
      @group(0) @binding(1) var&lt;storage, read_write&gt; output: array&lt;f32&gt;;

      @compute @workgroup_size(64)
      fn main(@builtin(global_invocation_id) id: vec3&lt;u32&gt;) {
        let i = id.x;
        if (i &gt;= arrayLength(&amp;input)) { return; }

        output[i] = sin(input[i]) * cos(input[i] * 2.0);
      }
    \`</span>;

    <span class="hljs-comment">// Process on GPU (WebGPU implementation)</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">runWebGPUShader</span>(shader, data);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">isGPUAvailable</span>(): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;gpu&#x27;</span> <span class="hljs-keyword">in</span> navigator;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">runWebGPUShader</span>(<span class="hljs-attr">shader</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">data</span>: <span class="hljs-title class_">Float32Array</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Float32Array</span>&gt; {
    <span class="hljs-comment">// WebGPU implementation</span>
    <span class="hljs-comment">// ... (implementation details)</span>
    <span class="hljs-keyword">return</span> data; <span class="hljs-comment">// Placeholder</span>
  }
}
</code></pre>
<h2 id="تحسين-أداء-الحركات">تحسين أداء الحركات</h2>
<h3 id="إدارة-خاصية-will-change">إدارة خاصية will-change</h3>
<p>تشير خاصية <code>will-change</code> في CSS إلى المتصفح بالخصائص المرجّح أن تتغيّر، ما يتيح له التحسين مسبقًا:</p>
<pre><code class="language-css"><span class="hljs-comment">/* Prepare for animation */</span>
<span class="hljs-selector-class">.element-about-to-animate</span> {
  <span class="hljs-attribute">will-change</span>: transform, opacity;
}

<span class="hljs-comment">/* Remove after animation completes to free resources */</span>
<span class="hljs-selector-class">.element-animation-complete</span> {
  <span class="hljs-attribute">will-change</span>: auto;
}
</code></pre>
<blockquote>
<p><strong>أثر الأداء</strong></p>
<p>قد يُضرّ الإفراط في استخدام <code>will-change</code> بالأداء عبر إنشاء عدد كبير جدًا من طبقات GPU. لا تطبّقه إلا على العناصر التي توشك على الحركة، وأزله عند الانتهاء.</p>
</blockquote>
<h3 id="محفزات-التسريع-العتادي">محفّزات التسريع العتادي</h3>
<p>أجبر تسريع GPU للحصول على حركات أكثر سلاسة:</p>
<pre><code class="language-css"><span class="hljs-comment">/* Method 1: Transform3D */</span>
<span class="hljs-selector-class">.gpu-accelerated</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(<span class="hljs-number">0</span>);
  <span class="hljs-comment">/* or */</span>
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}

<span class="hljs-comment">/* Method 2: Will-change */</span>
<span class="hljs-selector-class">.gpu-accelerated-animation</span> {
  <span class="hljs-attribute">will-change</span>: transform;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(<span class="hljs-number">0</span>);
}

<span class="hljs-comment">/* Method 3: Backface visibility */</span>
<span class="hljs-selector-class">.gpu-accelerated-card</span> {
  <span class="hljs-attribute">backface-visibility</span>: hidden;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(<span class="hljs-number">0</span>);
}
</code></pre>
<h3 id="إدارة-طبقات-التركيب">إدارة طبقات التركيب</h3>
<p>فهم ما ينشئ طبقات تركيب جديدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Properties that create new layers</span>
<span class="hljs-keyword">const</span> layerTriggers = {
  <span class="hljs-string">&#x27;3d-transform&#x27;</span>: <span class="hljs-string">&#x27;transform: translateZ(0) or translate3d()&#x27;</span>,
  <span class="hljs-string">&#x27;will-change&#x27;</span>: <span class="hljs-string">&#x27;will-change: transform, opacity, etc&#x27;</span>,
  <span class="hljs-string">&#x27;fixed-position&#x27;</span>: <span class="hljs-string">&#x27;position: fixed with z-index&#x27;</span>,
  <span class="hljs-attr">filters</span>: <span class="hljs-string">&#x27;filter: blur(), brightness(), etc&#x27;</span>,
  <span class="hljs-string">&#x27;opacity-animation&#x27;</span>: <span class="hljs-string">&#x27;opacity with transition/animation&#x27;</span>,
  <span class="hljs-attr">mask</span>: <span class="hljs-string">&#x27;mask-image, mask-position&#x27;</span>,
  <span class="hljs-string">&#x27;clip-path&#x27;</span>: <span class="hljs-string">&#x27;clip-path animations&#x27;</span>,
  <span class="hljs-attr">backface</span>: <span class="hljs-string">&#x27;backface-visibility: hidden&#x27;</span>,
};

<span class="hljs-comment">// Check layer count in DevTools</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">checkLayerCount</span>(<span class="hljs-params"></span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Open DevTools &gt; Rendering &gt; Show Layer borders&#x27;</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Too many layers = memory overhead&#x27;</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Too few layers = repaint overhead&#x27;</span>);
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>استخدم تحويلات CSS للحركات:</strong></p>
<ul>
<li>فضّل transform على خصائص الموضع</li>
<li>أضف تلميحات will-change بشكل مدروس</li>
<li>استخدم translateZ(0) أو translate3d() لإجبار طبقات GPU</li>
<li>أزل will-change بعد اكتمال الحركات</li>
</ul>
<p>✅ <strong>حسّن استخدام WebGL:</strong></p>
<ul>
<li>اجمع استدعاءات الرسم في دفعات</li>
<li>استخدم التصيير بالنسخ (instanced rendering)</li>
<li>تخلّص من الموارد غير المستخدمة</li>
</ul>
<p>✅ <strong>راقب مقاييس GPU:</strong></p>
<ul>
<li>تتبّع استدعاءات الرسم</li>
<li>راقب ذاكرة الأنسجة (textures)</li>
<li>افحص تسريبات ذاكرة GPU</li>
</ul>
<p>✅ <strong>وازن العمل بين CPU وGPU:</strong></p>
<ul>
<li>استخدم GPU للعمليات المتوازية</li>
<li>أبقِ المنطق المعقّد على CPU</li>
<li>حلّل الأداء لإيجاد العتبات المثلى</li>
</ul>
<p>✅ <strong>تعامل مع البدائل الاحتياطية بلباقة:</strong></p>
<ul>
<li>اكتشف توفّر GPU</li>
<li>وفّر بدائل على CPU</li>
<li>تكيّف مع قدرات الجهاز</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
