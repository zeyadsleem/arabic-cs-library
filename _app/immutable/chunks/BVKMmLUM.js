const s="kinney",a="react-performance",n="أداء React",l="webassembly-integration",p="دمج WebAssembly في React",t=[{depth:2,id:"فهم-أداء-webassembly",text:"فهم أداء WebAssembly"},{depth:2,id:"إعداد-webassembly-مع-react",text:"إعداد WebAssembly مع React"},{depth:2,id:"معالجة-الصور-باستخدام-webassembly",text:"معالجة الصور باستخدام WebAssembly"},{depth:2,id:"حسابات-معقدة-باستخدام-wasm",text:"حسابات معقدة باستخدام WASM"},{depth:2,id:"wasm-مع-web-workers",text:"WASM مع Web Workers"},{depth:2,id:"إدارة-الذاكرة",text:"إدارة الذاكرة"},{depth:2,id:"مراقبة-الأداء",text:"مراقبة الأداء"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>تصل JavaScript إلى حائط. يحتاج تطبيق React لديك إلى معالجة 10,000 نقطة بيانات، أو تطبيق مرشحات صور معقدة، أو تشغيل عمليات تشفير، وفجأة تتجمد واجهتك. جرّبت Web Workers، وحسّنت خوارزمياتك، ولا يزال الأداء غير كافٍ. هنا يأتي WebAssembly — أداء قريب من الأصلي في المتصفح. إنه ليس حلًا سحريًا، لكنه بالنسبة للمهام المكلفة معالجيًا الفرق بين عرض شرائح وتجربة سلسة بـ 60 إطارًا في الثانية.</p>
<p>يتيح لك WebAssembly (WASM) تشغيل شيفرة مجمّعة من لغات مثل Rust أو C++ أو Go مباشرة في المتصفح بسرعات قريبة من الأصلية. لكن دمج WASM مع React ليس تافهًا — تحتاج إلى التعامل مع التحميل غير المتزامن، وإدارة الذاكرة، وتحويلات الأنواع، وعدم التوافق بين طبيعة WASM منخفضة المستوى ونموذج مكوّنات React. يوضح لك هذا الدليل بالضبط متى يكون WASM منطقيًا، وكيف تدمجه على نحو سليم، وكيف تتجنب المزالق التي قد تجعل WASM أبطأ من JavaScript.</p>
<h2 id="فهم-أداء-webassembly">فهم أداء WebAssembly</h2>
<p>متى يتفوق WASM على JavaScript ومتى لا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// WebAssembly performance characteristics</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">WASMPerformance</span> {
  <span class="hljs-comment">// Where WASM excels</span>
  <span class="hljs-attr">strengths</span>: {
    <span class="hljs-attr">cpuIntensive</span>: <span class="hljs-string">&#x27;Heavy mathematical computations&#x27;</span>;
    <span class="hljs-attr">predictablePerformance</span>: <span class="hljs-string">&#x27;No JIT warmup or deoptimization&#x27;</span>;
    <span class="hljs-attr">parallelism</span>: <span class="hljs-string">&#x27;SIMD and threading support&#x27;</span>;
    <span class="hljs-attr">memoryControl</span>: <span class="hljs-string">&#x27;Manual memory management&#x27;</span>;
  };

  <span class="hljs-comment">// Where WASM struggles</span>
  <span class="hljs-attr">weaknesses</span>: {
    <span class="hljs-attr">startupTime</span>: <span class="hljs-string">&#x27;Module compilation and instantiation&#x27;</span>;
    <span class="hljs-attr">jsInterop</span>: <span class="hljs-string">&#x27;Crossing JS/WASM boundary is expensive&#x27;</span>;
    <span class="hljs-attr">domAccess</span>: <span class="hljs-string">&#x27;Cannot directly manipulate DOM&#x27;</span>;
    <span class="hljs-attr">bundleSize</span>: <span class="hljs-string">&#x27;WASM modules can be large&#x27;</span>;
  };

  <span class="hljs-comment">// Performance comparison</span>
  <span class="hljs-attr">comparison</span>: {
    <span class="hljs-attr">fibonacci</span>: { <span class="hljs-attr">js</span>: <span class="hljs-number">1</span>; <span class="hljs-attr">wasm</span>: <span class="hljs-number">0.3</span> }; <span class="hljs-comment">// WASM 3x faster</span>
    <span class="hljs-attr">sorting</span>: { <span class="hljs-attr">js</span>: <span class="hljs-number">1</span>; <span class="hljs-attr">wasm</span>: <span class="hljs-number">0.5</span> }; <span class="hljs-comment">// WASM 2x faster</span>
    <span class="hljs-attr">domManipulation</span>: { <span class="hljs-attr">js</span>: <span class="hljs-number">1</span>; <span class="hljs-attr">wasm</span>: <span class="hljs-number">10</span> }; <span class="hljs-comment">// JS 10x faster</span>
    <span class="hljs-attr">simpleCalculation</span>: { <span class="hljs-attr">js</span>: <span class="hljs-number">1</span>; <span class="hljs-attr">wasm</span>: <span class="hljs-number">1.2</span> }; <span class="hljs-comment">// JS slightly faster</span>
  };
}

<span class="hljs-comment">// Decision matrix for WASM usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">shouldUseWASM</span>(<span class="hljs-params"><span class="hljs-attr">task</span>: <span class="hljs-title class_">TaskProfile</span></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-keyword">const</span> {
    computationComplexity, <span class="hljs-comment">// O(n), O(n²), O(n³)</span>
    dataSize, <span class="hljs-comment">// Number of elements</span>
    frequency, <span class="hljs-comment">// How often it runs</span>
    requiresDom, <span class="hljs-comment">// Needs DOM access</span>
  } = task;

  <span class="hljs-comment">// WASM overhead not worth it for simple tasks</span>
  <span class="hljs-keyword">if</span> (computationComplexity === <span class="hljs-string">&#x27;O(n)&#x27;</span> &amp;&amp; dataSize &lt; <span class="hljs-number">1000</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// DOM manipulation should stay in JS</span>
  <span class="hljs-keyword">if</span> (requiresDom) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// High-frequency simple operations stay in JS</span>
  <span class="hljs-keyword">if</span> (frequency &gt; <span class="hljs-number">60</span> &amp;&amp; computationComplexity === <span class="hljs-string">&#x27;O(n)&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// Complex computations benefit from WASM</span>
  <span class="hljs-keyword">if</span> (computationComplexity === <span class="hljs-string">&#x27;O(n²)&#x27;</span> || computationComplexity === <span class="hljs-string">&#x27;O(n³)&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-comment">// Large data processing benefits from WASM</span>
  <span class="hljs-keyword">if</span> (dataSize &gt; <span class="hljs-number">10000</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}
</code></pre>
<h2 id="إعداد-webassembly-مع-react">إعداد WebAssembly مع React</h2>
<p>إعداد تكامل WASM الأساسي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// wasm-loader.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WASMLoader</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">wasmModule</span>: <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-property">Module</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">wasmInstance</span>: <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-property">Instance</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">memory</span>: <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-property">Memory</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Shared memory for WASM modules</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">memory</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-title class_">Memory</span>({
      <span class="hljs-attr">initial</span>: <span class="hljs-number">256</span>, <span class="hljs-comment">// 256 pages = 16MB</span>
      <span class="hljs-attr">maximum</span>: <span class="hljs-number">512</span>, <span class="hljs-comment">// 512 pages = 32MB</span>
    });
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">load</span>(<span class="hljs-attr">wasmPath</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-comment">// Fetch and compile WASM module</span>
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(wasmPath);
    <span class="hljs-keyword">const</span> bytes = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">arrayBuffer</span>();

    <span class="hljs-comment">// Compile module (cached by browser)</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">wasmModule</span> = <span class="hljs-keyword">await</span> <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-title function_">compile</span>(bytes);

    <span class="hljs-comment">// Instantiate with imports</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">wasmInstance</span> = <span class="hljs-keyword">await</span> <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-title function_">instantiate</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">wasmModule</span>, {
      <span class="hljs-attr">env</span>: {
        <span class="hljs-attr">memory</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">memory</span>,
        <span class="hljs-attr">abort</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">abort</span>.<span class="hljs-title function_">bind</span>(<span class="hljs-variable language_">this</span>),
        <span class="hljs-attr">log</span>: <span class="hljs-variable language_">console</span>.<span class="hljs-property">log</span>,
      },
      <span class="hljs-attr">js</span>: {
        <span class="hljs-attr">mem</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">memory</span>,
      },
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">abort</span>(<span class="hljs-attr">msg</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">file</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">line</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">column</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;WASM abort:&#x27;</span>, { msg, file, line, column });
  }

  <span class="hljs-title function_">getExports</span>(): <span class="hljs-built_in">any</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">wasmInstance</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;WASM module not loaded&#x27;</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">wasmInstance</span>.<span class="hljs-property">exports</span>;
  }

  <span class="hljs-title function_">getMemory</span>(): <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-property">Memory</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">memory</span>;
  }

  <span class="hljs-comment">// Helper to convert JS string to WASM memory</span>
  <span class="hljs-title function_">allocateString</span>(<span class="hljs-attr">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">exports</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getExports</span>();
    <span class="hljs-keyword">const</span> encoder = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TextEncoder</span>();
    <span class="hljs-keyword">const</span> encoded = encoder.<span class="hljs-title function_">encode</span>(str);

    <span class="hljs-keyword">const</span> ptr = <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">malloc</span>(encoded.<span class="hljs-property">length</span> + <span class="hljs-number">1</span>);
    <span class="hljs-keyword">const</span> memory = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Uint8Array</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">memory</span>.<span class="hljs-property">buffer</span>);

    memory.<span class="hljs-title function_">set</span>(encoded, ptr);
    memory[ptr + encoded.<span class="hljs-property">length</span>] = <span class="hljs-number">0</span>; <span class="hljs-comment">// Null terminator</span>

    <span class="hljs-keyword">return</span> ptr;
  }

  <span class="hljs-comment">// Helper to read string from WASM memory</span>
  <span class="hljs-title function_">readString</span>(<span class="hljs-attr">ptr</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> memory = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Uint8Array</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">memory</span>.<span class="hljs-property">buffer</span>);
    <span class="hljs-keyword">let</span> end = ptr;

    <span class="hljs-keyword">while</span> (memory[end] !== <span class="hljs-number">0</span>) {
      end++;
    }

    <span class="hljs-keyword">const</span> decoder = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TextDecoder</span>();
    <span class="hljs-keyword">return</span> decoder.<span class="hljs-title function_">decode</span>(memory.<span class="hljs-title function_">subarray</span>(ptr, end));
  }

  <span class="hljs-comment">// Clean up</span>
  <span class="hljs-title function_">free</span>(<span class="hljs-attr">ptr</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">exports</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getExports</span>();
    <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">free</span>(ptr);
  }
}

<span class="hljs-comment">// React hook for WASM modules</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useWASM</span>(<span class="hljs-params"><span class="hljs-attr">wasmPath</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> [loader, setLoader] = useState&lt;<span class="hljs-title class_">WASMLoader</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">initWASM</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> wasmLoader = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WASMLoader</span>();
        <span class="hljs-keyword">await</span> wasmLoader.<span class="hljs-title function_">load</span>(wasmPath);
        <span class="hljs-title function_">setLoader</span>(wasmLoader);
      } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-title function_">setError</span>(err <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>);
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    };

    <span class="hljs-title function_">initWASM</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Cleanup if needed</span>
    };
  }, [wasmPath]);

  <span class="hljs-keyword">return</span> { loader, isLoading, error };
}
</code></pre>
<h2 id="معالجة-الصور-باستخدام-webassembly">معالجة الصور باستخدام WebAssembly</h2>
<p>التلاعب بالصور عالي الأداء:</p>
<pre><code class="language-rust"><span class="hljs-comment">// image_processor.rs - Rust source for WASM</span>
<span class="hljs-keyword">use</span> wasm_bindgen::prelude::*;

<span class="hljs-meta">#[wasm_bindgen]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">ImageProcessor</span> {
    width: <span class="hljs-type">u32</span>,
    height: <span class="hljs-type">u32</span>,
    pixels: <span class="hljs-type">Vec</span>&lt;<span class="hljs-type">u8</span>&gt;,
}

<span class="hljs-meta">#[wasm_bindgen]</span>
<span class="hljs-keyword">impl</span> <span class="hljs-title class_">ImageProcessor</span> {
    <span class="hljs-meta">#[wasm_bindgen(constructor)]</span>
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">new</span>(width: <span class="hljs-type">u32</span>, height: <span class="hljs-type">u32</span>) <span class="hljs-punctuation">-&gt;</span> ImageProcessor {
        ImageProcessor {
            width,
            height,
            pixels: <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0</span>; (width * height * <span class="hljs-number">4</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>],
        }
    }

    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">load_image</span>(&amp;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, data: &amp;[<span class="hljs-type">u8</span>]) {
        <span class="hljs-keyword">self</span>.pixels = data.<span class="hljs-title function_ invoke__">to_vec</span>();
    }

    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">get_pixels</span>(&amp;<span class="hljs-keyword">self</span>) <span class="hljs-punctuation">-&gt;</span> <span class="hljs-type">Vec</span>&lt;<span class="hljs-type">u8</span>&gt; {
        <span class="hljs-keyword">self</span>.pixels.<span class="hljs-title function_ invoke__">clone</span>()
    }

    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">apply_blur</span>(&amp;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, radius: <span class="hljs-type">u32</span>) {
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">output</span> = <span class="hljs-built_in">vec!</span>[<span class="hljs-number">0u8</span>; <span class="hljs-keyword">self</span>.pixels.<span class="hljs-title function_ invoke__">len</span>()];

        <span class="hljs-keyword">for</span> <span class="hljs-variable">y</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span>..<span class="hljs-keyword">self</span>.height {
            <span class="hljs-keyword">for</span> <span class="hljs-variable">x</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span>..<span class="hljs-keyword">self</span>.width {
                <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">r</span> = <span class="hljs-number">0u32</span>;
                <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">g</span> = <span class="hljs-number">0u32</span>;
                <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">b</span> = <span class="hljs-number">0u32</span>;
                <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">count</span> = <span class="hljs-number">0u32</span>;

                <span class="hljs-keyword">for</span> <span class="hljs-variable">dy</span> <span class="hljs-keyword">in</span> -(radius <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span>)..=(radius <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span>) {
                    <span class="hljs-keyword">for</span> <span class="hljs-variable">dx</span> <span class="hljs-keyword">in</span> -(radius <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span>)..=(radius <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span>) {
                        <span class="hljs-keyword">let</span> <span class="hljs-variable">nx</span> = x <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span> + dx;
                        <span class="hljs-keyword">let</span> <span class="hljs-variable">ny</span> = y <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span> + dy;

                        <span class="hljs-keyword">if</span> nx &gt;= <span class="hljs-number">0</span> &amp;&amp; nx &lt; <span class="hljs-keyword">self</span>.width <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span> &amp;&amp;
                           ny &gt;= <span class="hljs-number">0</span> &amp;&amp; ny &lt; <span class="hljs-keyword">self</span>.height <span class="hljs-keyword">as</span> <span class="hljs-type">i32</span> {
                            <span class="hljs-keyword">let</span> <span class="hljs-variable">idx</span> = ((ny <span class="hljs-keyword">as</span> <span class="hljs-type">u32</span> * <span class="hljs-keyword">self</span>.width + nx <span class="hljs-keyword">as</span> <span class="hljs-type">u32</span>) * <span class="hljs-number">4</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>;
                            r += <span class="hljs-keyword">self</span>.pixels[idx] <span class="hljs-keyword">as</span> <span class="hljs-type">u32</span>;
                            g += <span class="hljs-keyword">self</span>.pixels[idx + <span class="hljs-number">1</span>] <span class="hljs-keyword">as</span> <span class="hljs-type">u32</span>;
                            b += <span class="hljs-keyword">self</span>.pixels[idx + <span class="hljs-number">2</span>] <span class="hljs-keyword">as</span> <span class="hljs-type">u32</span>;
                            count += <span class="hljs-number">1</span>;
                        }
                    }
                }

                <span class="hljs-keyword">let</span> <span class="hljs-variable">idx</span> = ((y * <span class="hljs-keyword">self</span>.width + x) * <span class="hljs-number">4</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>;
                output[idx] = (r / count) <span class="hljs-keyword">as</span> <span class="hljs-type">u8</span>;
                output[idx + <span class="hljs-number">1</span>] = (g / count) <span class="hljs-keyword">as</span> <span class="hljs-type">u8</span>;
                output[idx + <span class="hljs-number">2</span>] = (b / count) <span class="hljs-keyword">as</span> <span class="hljs-type">u8</span>;
                output[idx + <span class="hljs-number">3</span>] = <span class="hljs-keyword">self</span>.pixels[idx + <span class="hljs-number">3</span>];
            }
        }

        <span class="hljs-keyword">self</span>.pixels = output;
    }

    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">fn</span> <span class="hljs-title function_">apply_sharpen</span>(&amp;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, strength: <span class="hljs-type">f32</span>) {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">kernel</span> = [
            <span class="hljs-number">0.0</span>, -<span class="hljs-number">1.0</span>, <span class="hljs-number">0.0</span>,
            -<span class="hljs-number">1.0</span>, <span class="hljs-number">5.0</span>, -<span class="hljs-number">1.0</span>,
            <span class="hljs-number">0.0</span>, -<span class="hljs-number">1.0</span>, <span class="hljs-number">0.0</span>,
        ];

        <span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">apply_convolution</span>(&amp;kernel, strength);
    }

    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">apply_convolution</span>(&amp;<span class="hljs-keyword">mut</span> <span class="hljs-keyword">self</span>, kernel: &amp;[<span class="hljs-type">f32</span>; <span class="hljs-number">9</span>], strength: <span class="hljs-type">f32</span>) {
        <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">output</span> = <span class="hljs-keyword">self</span>.pixels.<span class="hljs-title function_ invoke__">clone</span>();

        <span class="hljs-keyword">for</span> <span class="hljs-variable">y</span> <span class="hljs-keyword">in</span> <span class="hljs-number">1</span>..<span class="hljs-keyword">self</span>.height - <span class="hljs-number">1</span> {
            <span class="hljs-keyword">for</span> <span class="hljs-variable">x</span> <span class="hljs-keyword">in</span> <span class="hljs-number">1</span>..<span class="hljs-keyword">self</span>.width - <span class="hljs-number">1</span> {
                <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">r</span> = <span class="hljs-number">0.0</span>;
                <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">g</span> = <span class="hljs-number">0.0</span>;
                <span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">b</span> = <span class="hljs-number">0.0</span>;

                <span class="hljs-keyword">for</span> <span class="hljs-variable">ky</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span>..<span class="hljs-number">3</span> {
                    <span class="hljs-keyword">for</span> <span class="hljs-variable">kx</span> <span class="hljs-keyword">in</span> <span class="hljs-number">0</span>..<span class="hljs-number">3</span> {
                        <span class="hljs-keyword">let</span> <span class="hljs-variable">px</span> = (x + kx - <span class="hljs-number">1</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>;
                        <span class="hljs-keyword">let</span> <span class="hljs-variable">py</span> = (y + ky - <span class="hljs-number">1</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>;
                        <span class="hljs-keyword">let</span> <span class="hljs-variable">idx</span> = (py * <span class="hljs-keyword">self</span>.width <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span> + px) * <span class="hljs-number">4</span>;
                        <span class="hljs-keyword">let</span> <span class="hljs-variable">k</span> = kernel[ky * <span class="hljs-number">3</span> + kx];

                        r += <span class="hljs-keyword">self</span>.pixels[idx] <span class="hljs-keyword">as</span> <span class="hljs-type">f32</span> * k;
                        g += <span class="hljs-keyword">self</span>.pixels[idx + <span class="hljs-number">1</span>] <span class="hljs-keyword">as</span> <span class="hljs-type">f32</span> * k;
                        b += <span class="hljs-keyword">self</span>.pixels[idx + <span class="hljs-number">2</span>] <span class="hljs-keyword">as</span> <span class="hljs-type">f32</span> * k;
                    }
                }

                <span class="hljs-keyword">let</span> <span class="hljs-variable">idx</span> = ((y * <span class="hljs-keyword">self</span>.width + x) * <span class="hljs-number">4</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">usize</span>;
                output[idx] = (<span class="hljs-keyword">self</span>.pixels[idx] <span class="hljs-keyword">as</span> <span class="hljs-type">f32</span> * (<span class="hljs-number">1.0</span> - strength) +
                              r * strength).<span class="hljs-title function_ invoke__">clamp</span>(<span class="hljs-number">0.0</span>, <span class="hljs-number">255.0</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">u8</span>;
                output[idx + <span class="hljs-number">1</span>] = (<span class="hljs-keyword">self</span>.pixels[idx + <span class="hljs-number">1</span>] <span class="hljs-keyword">as</span> <span class="hljs-type">f32</span> * (<span class="hljs-number">1.0</span> - strength) +
                                   g * strength).<span class="hljs-title function_ invoke__">clamp</span>(<span class="hljs-number">0.0</span>, <span class="hljs-number">255.0</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">u8</span>;
                output[idx + <span class="hljs-number">2</span>] = (<span class="hljs-keyword">self</span>.pixels[idx + <span class="hljs-number">2</span>] <span class="hljs-keyword">as</span> <span class="hljs-type">f32</span> * (<span class="hljs-number">1.0</span> - strength) +
                                   b * strength).<span class="hljs-title function_ invoke__">clamp</span>(<span class="hljs-number">0.0</span>, <span class="hljs-number">255.0</span>) <span class="hljs-keyword">as</span> <span class="hljs-type">u8</span>;
            }
        }

        <span class="hljs-keyword">self</span>.pixels = output;
    }
}
</code></pre>
<p>مكوّن React يستخدم معالج صور WASM:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ImageEditor.tsx</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ImageEditor</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> canvasRef = useRef&lt;<span class="hljs-title class_">HTMLCanvasElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [processor, setProcessor] = useState&lt;<span class="hljs-built_in">any</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [processing, setProcessing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Load WASM module</span>
    <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;../wasm/image_processor_bg.wasm&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-title function_">async</span> (<span class="hljs-variable language_">module</span>) =&gt; {
      <span class="hljs-keyword">const</span> wasm = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">module</span>.<span class="hljs-title function_">default</span>();
      <span class="hljs-title function_">setProcessor</span>(wasm);
    });
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadImage</span> = (<span class="hljs-params"><span class="hljs-attr">file</span>: <span class="hljs-title class_">File</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> reader = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FileReader</span>();

    reader.<span class="hljs-property">onload</span> = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> img = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Image</span>();

      img.<span class="hljs-property">onload</span> = <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">const</span> canvas = canvasRef.<span class="hljs-property">current</span>!;
        <span class="hljs-keyword">const</span> ctx = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>)!;

        canvas.<span class="hljs-property">width</span> = img.<span class="hljs-property">width</span>;
        canvas.<span class="hljs-property">height</span> = img.<span class="hljs-property">height</span>;
        ctx.<span class="hljs-title function_">drawImage</span>(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);

        <span class="hljs-comment">// Get image data</span>
        <span class="hljs-keyword">const</span> imageData = ctx.<span class="hljs-title function_">getImageData</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, img.<span class="hljs-property">width</span>, img.<span class="hljs-property">height</span>);

        <span class="hljs-comment">// Initialize WASM processor</span>
        <span class="hljs-keyword">if</span> (processor) {
          <span class="hljs-keyword">const</span> imgProcessor = <span class="hljs-keyword">new</span> processor.<span class="hljs-title class_">ImageProcessor</span>(img.<span class="hljs-property">width</span>, img.<span class="hljs-property">height</span>);
          imgProcessor.<span class="hljs-title function_">load_image</span>(imageData.<span class="hljs-property">data</span>);

          <span class="hljs-comment">// Store processor instance</span>
          canvasRef.<span class="hljs-property">current</span>.<span class="hljs-property">wasmProcessor</span> = imgProcessor;
        }
      };

      img.<span class="hljs-property">src</span> = e.<span class="hljs-property">target</span>?.<span class="hljs-property">result</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>;
    };

    reader.<span class="hljs-title function_">readAsDataURL</span>(file);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">applyFilter</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">filterType</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!canvasRef.<span class="hljs-property">current</span>?.<span class="hljs-property">wasmProcessor</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-title function_">setProcessing</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Use requestAnimationFrame for smooth UI</span>
    <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();
      <span class="hljs-keyword">const</span> processor = canvasRef.<span class="hljs-property">current</span>.<span class="hljs-property">wasmProcessor</span>;

      <span class="hljs-keyword">switch</span> (filterType) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;blur&#x27;</span>:
          processor.<span class="hljs-title function_">apply_blur</span>(<span class="hljs-number">5</span>);
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;sharpen&#x27;</span>:
          processor.<span class="hljs-title function_">apply_sharpen</span>(<span class="hljs-number">0.5</span>);
          <span class="hljs-keyword">break</span>;
        <span class="hljs-comment">// Add more filters</span>
      }

      <span class="hljs-comment">// Get processed pixels</span>
      <span class="hljs-keyword">const</span> pixels = processor.<span class="hljs-title function_">get_pixels</span>();

      <span class="hljs-comment">// Update canvas</span>
      <span class="hljs-keyword">const</span> canvas = canvasRef.<span class="hljs-property">current</span>!;
      <span class="hljs-keyword">const</span> ctx = canvas.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>)!;
      <span class="hljs-keyword">const</span> imageData = ctx.<span class="hljs-title function_">createImageData</span>(canvas.<span class="hljs-property">width</span>, canvas.<span class="hljs-property">height</span>);
      imageData.<span class="hljs-property">data</span>.<span class="hljs-title function_">set</span>(pixels);
      ctx.<span class="hljs-title function_">putImageData</span>(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);

      <span class="hljs-keyword">const</span> processingTime = performance.<span class="hljs-title function_">now</span>() - startTime;
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Filter applied in <span class="hljs-subst">\${processingTime.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>);

      <span class="hljs-title function_">setProcessing</span>(<span class="hljs-literal">false</span>);
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;image-editor&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;file&quot;</span>
        <span class="hljs-attr">accept</span>=<span class="hljs-string">&quot;image/*&quot;</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> e.target.files?.[0] &amp;&amp; loadImage(e.target.files[0])}
      /&gt;

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;filters&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> applyFilter(&#x27;blur&#x27;)} disabled={processing}&gt;
          Blur
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> applyFilter(&#x27;sharpen&#x27;)} disabled={processing}&gt;
          Sharpen
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{canvasRef}</span> /&gt;</span>

      {processing &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;processing-indicator&quot;</span>&gt;</span>Processing...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="حسابات-معقدة-باستخدام-wasm">حسابات معقدة باستخدام WASM</h2>
<p>أفرِغ الحسابات الثقيلة:</p>
<pre><code class="language-cpp"><span class="hljs-comment">// math_engine.cpp - C++ source for WASM</span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;emscripten.h&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;cmath&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;algorithm&gt;</span></span>

<span class="hljs-keyword">extern</span> <span class="hljs-string">&quot;C&quot;</span> {

<span class="hljs-function">EMSCRIPTEN_KEEPALIVE
<span class="hljs-type">double</span>* <span class="hljs-title">matrix_multiply</span><span class="hljs-params">(<span class="hljs-type">double</span>* a, <span class="hljs-type">double</span>* b, <span class="hljs-type">int</span> n)</span> </span>{
    <span class="hljs-type">double</span>* result = (<span class="hljs-type">double</span>*)<span class="hljs-built_in">malloc</span>(n * n * <span class="hljs-keyword">sizeof</span>(<span class="hljs-type">double</span>));

    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> j = <span class="hljs-number">0</span>; j &lt; n; j++) {
            <span class="hljs-type">double</span> sum = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> k = <span class="hljs-number">0</span>; k &lt; n; k++) {
                sum += a[i * n + k] * b[k * n + j];
            }
            result[i * n + j] = sum;
        }
    }

    <span class="hljs-keyword">return</span> result;
}

<span class="hljs-function">EMSCRIPTEN_KEEPALIVE
<span class="hljs-type">void</span> <span class="hljs-title">fibonacci_sequence</span><span class="hljs-params">(<span class="hljs-type">int</span>* output, <span class="hljs-type">int</span> count)</span> </span>{
    <span class="hljs-keyword">if</span> (count &lt;= <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    output[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (count == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;

    output[<span class="hljs-number">1</span>] = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i = <span class="hljs-number">2</span>; i &lt; count; i++) {
        output[i] = output[i<span class="hljs-number">-1</span>] + output[i<span class="hljs-number">-2</span>];
    }
}

<span class="hljs-function">EMSCRIPTEN_KEEPALIVE
<span class="hljs-type">double</span> <span class="hljs-title">monte_carlo_pi</span><span class="hljs-params">(<span class="hljs-type">int</span> iterations)</span> </span>{
    <span class="hljs-type">int</span> inside = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i = <span class="hljs-number">0</span>; i &lt; iterations; i++) {
        <span class="hljs-type">double</span> x = (<span class="hljs-type">double</span>)<span class="hljs-built_in">rand</span>() / RAND_MAX;
        <span class="hljs-type">double</span> y = (<span class="hljs-type">double</span>)<span class="hljs-built_in">rand</span>() / RAND_MAX;

        <span class="hljs-keyword">if</span> (x*x + y*y &lt;= <span class="hljs-number">1.0</span>) {
            inside++;
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-number">4.0</span> * inside / iterations;
}

<span class="hljs-function">EMSCRIPTEN_KEEPALIVE
<span class="hljs-type">void</span> <span class="hljs-title">prime_sieve</span><span class="hljs-params">(<span class="hljs-type">bool</span>* is_prime, <span class="hljs-type">int</span> limit)</span> </span>{
    std::<span class="hljs-built_in">fill</span>(is_prime, is_prime + limit + <span class="hljs-number">1</span>, <span class="hljs-literal">true</span>);
    is_prime[<span class="hljs-number">0</span>] = is_prime[<span class="hljs-number">1</span>] = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> i = <span class="hljs-number">2</span>; i * i &lt;= limit; i++) {
        <span class="hljs-keyword">if</span> (is_prime[i]) {
            <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> j = i * i; j &lt;= limit; j += i) {
                is_prime[j] = <span class="hljs-literal">false</span>;
            }
        }
    }
}

}
</code></pre>
<p>خُطّاف React للحسابات الرياضية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// useMathWASM.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useMathWASM</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [wasm, setWasm] = useState&lt;<span class="hljs-built_in">any</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">loadMathWASM</span>().<span class="hljs-title function_">then</span>(setWasm);
  }, []);

  <span class="hljs-keyword">const</span> matrixMultiply = <span class="hljs-title function_">useCallback</span>(
    (<span class="hljs-attr">a</span>: <span class="hljs-built_in">number</span>[][], <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span>[][]): <span class="hljs-built_in">number</span>[][] | <span class="hljs-function"><span class="hljs-params">null</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (!wasm) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

      <span class="hljs-keyword">const</span> n = a.<span class="hljs-property">length</span>;
      <span class="hljs-keyword">const</span> flatA = a.<span class="hljs-title function_">flat</span>();
      <span class="hljs-keyword">const</span> flatB = b.<span class="hljs-title function_">flat</span>();

      <span class="hljs-comment">// Allocate memory in WASM</span>
      <span class="hljs-keyword">const</span> bytesPerElement = <span class="hljs-number">8</span>; <span class="hljs-comment">// double</span>
      <span class="hljs-keyword">const</span> aPtr = wasm.<span class="hljs-title function_">_malloc</span>(n * n * bytesPerElement);
      <span class="hljs-keyword">const</span> bPtr = wasm.<span class="hljs-title function_">_malloc</span>(n * n * bytesPerElement);

      <span class="hljs-comment">// Copy data to WASM memory</span>
      wasm.<span class="hljs-property">HEAPF64</span>.<span class="hljs-title function_">set</span>(flatA, aPtr / bytesPerElement);
      wasm.<span class="hljs-property">HEAPF64</span>.<span class="hljs-title function_">set</span>(flatB, bPtr / bytesPerElement);

      <span class="hljs-comment">// Perform multiplication</span>
      <span class="hljs-keyword">const</span> resultPtr = wasm.<span class="hljs-title function_">_matrix_multiply</span>(aPtr, bPtr, n);

      <span class="hljs-comment">// Read result</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">result</span>: <span class="hljs-built_in">number</span>[][] = [];
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        result[i] = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; n; j++) {
          result[i][j] = wasm.<span class="hljs-property">HEAPF64</span>[resultPtr / bytesPerElement + i * n + j];
        }
      }

      <span class="hljs-comment">// Free memory</span>
      wasm.<span class="hljs-title function_">_free</span>(aPtr);
      wasm.<span class="hljs-title function_">_free</span>(bPtr);
      wasm.<span class="hljs-title function_">_free</span>(resultPtr);

      <span class="hljs-keyword">return</span> result;
    },
    [wasm],
  );

  <span class="hljs-keyword">const</span> calculatePrimes = <span class="hljs-title function_">useCallback</span>(
    (<span class="hljs-attr">limit</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span>[] =&gt; {
      <span class="hljs-keyword">if</span> (!wasm) <span class="hljs-keyword">return</span> [];

      <span class="hljs-keyword">const</span> isPrimePtr = wasm.<span class="hljs-title function_">_malloc</span>(limit + <span class="hljs-number">1</span>);

      <span class="hljs-comment">// Calculate primes</span>
      wasm.<span class="hljs-title function_">_prime_sieve</span>(isPrimePtr, limit);

      <span class="hljs-comment">// Read results</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">primes</span>: <span class="hljs-built_in">number</span>[] = [];
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">2</span>; i &lt;= limit; i++) {
        <span class="hljs-keyword">if</span> (wasm.<span class="hljs-property">HEAPU8</span>[isPrimePtr + i]) {
          primes.<span class="hljs-title function_">push</span>(i);
        }
      }

      wasm.<span class="hljs-title function_">_free</span>(isPrimePtr);
      <span class="hljs-keyword">return</span> primes;
    },
    [wasm],
  );

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">isReady</span>: !!wasm,
    matrixMultiply,
    calculatePrimes,
    <span class="hljs-attr">monteCarloPi</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">iterations</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> wasm?.<span class="hljs-title function_">_monte_carlo_pi</span>(iterations),
  };
}
</code></pre>
<h2 id="wasm-مع-web-workers">WASM مع Web Workers</h2>
<p>اجمع WASM مع العمّال لأقصى أداء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// wasm-worker.ts</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">ctx</span>: <span class="hljs-title class_">Worker</span> = <span class="hljs-variable language_">self</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>;

<span class="hljs-keyword">let</span> <span class="hljs-attr">wasmModule</span>: <span class="hljs-built_in">any</span> = <span class="hljs-literal">null</span>;

<span class="hljs-comment">// Initialize WASM in worker</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">initWASM</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/wasm/processor.wasm&#x27;</span>);
  <span class="hljs-keyword">const</span> bytes = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">arrayBuffer</span>();
  <span class="hljs-keyword">const</span> <span class="hljs-variable language_">module</span> = <span class="hljs-keyword">await</span> <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-title function_">compile</span>(bytes);

  wasmModule = <span class="hljs-keyword">await</span> <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-title function_">instantiate</span>(<span class="hljs-variable language_">module</span>, {
    <span class="hljs-attr">env</span>: {
      <span class="hljs-attr">memory</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebAssembly</span>.<span class="hljs-title class_">Memory</span>({ <span class="hljs-attr">initial</span>: <span class="hljs-number">256</span> }),
    },
  });
}

ctx.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> { <span class="hljs-keyword">type</span>, data } = event.<span class="hljs-property">data</span>;

  <span class="hljs-keyword">if</span> (!wasmModule) {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">initWASM</span>();
  }

  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;PROCESS_DATA&#x27;</span>:
      <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">processWithWASM</span>(data);
      ctx.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;RESULT&#x27;</span>, <span class="hljs-attr">data</span>: result });
      <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;BATCH_PROCESS&#x27;</span>:
      <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-title function_">processBatch</span>(data);
      ctx.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;BATCH_RESULT&#x27;</span>, <span class="hljs-attr">data</span>: results });
      <span class="hljs-keyword">break</span>;
  }
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">processWithWASM</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">any</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">exports</span> = wasmModule.<span class="hljs-property">exports</span>;

  <span class="hljs-comment">// Allocate memory</span>
  <span class="hljs-keyword">const</span> ptr = <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">malloc</span>(data.<span class="hljs-property">length</span> * <span class="hljs-number">4</span>);

  <span class="hljs-comment">// Copy data to WASM</span>
  <span class="hljs-keyword">const</span> memory = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(<span class="hljs-built_in">exports</span>.<span class="hljs-property">memory</span>.<span class="hljs-property">buffer</span>);
  memory.<span class="hljs-title function_">set</span>(data, ptr / <span class="hljs-number">4</span>);

  <span class="hljs-comment">// Process</span>
  <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">process_data</span>(ptr, data.<span class="hljs-property">length</span>);

  <span class="hljs-comment">// Read result</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(memory.<span class="hljs-title function_">subarray</span>(ptr / <span class="hljs-number">4</span>, ptr / <span class="hljs-number">4</span> + data.<span class="hljs-property">length</span>));

  <span class="hljs-comment">// Clean up</span>
  <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">free</span>(ptr);

  <span class="hljs-keyword">return</span> result;
}

<span class="hljs-comment">// React hook for WASM worker</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useWASMWorker</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> workerRef = useRef&lt;<span class="hljs-title class_">Worker</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isProcessing, setIsProcessing] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    workerRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Worker</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&#x27;./wasm-worker.ts&#x27;</span>, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>), {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
    });

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      workerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">terminate</span>();
    };
  }, []);

  <span class="hljs-keyword">const</span> process = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">data</span>: <span class="hljs-title class_">Float32Array</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Float32Array</span>&gt; =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!workerRef.<span class="hljs-property">current</span>) {
        <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Worker not initialized&#x27;</span>));
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">true</span>);

      <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMessage</span> = (<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">MessageEvent</span></span>) =&gt; {
        <span class="hljs-keyword">if</span> (event.<span class="hljs-property">data</span>.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;RESULT&#x27;</span>) {
          workerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleMessage);
          <span class="hljs-title function_">setIsProcessing</span>(<span class="hljs-literal">false</span>);
          <span class="hljs-title function_">resolve</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Float32Array</span>(event.<span class="hljs-property">data</span>.<span class="hljs-property">data</span>));
        }
      };

      workerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;message&#x27;</span>, handleMessage);
      workerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">postMessage</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;PROCESS_DATA&#x27;</span>, data });
    });
  }, []);

  <span class="hljs-keyword">return</span> { process, isProcessing };
}
</code></pre>
<h2 id="إدارة-الذاكرة">إدارة الذاكرة</h2>
<p>تعامل مع ذاكرة WASM بكفاءة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Memory management utilities</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WASMMemoryManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">allocations</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">exports</span>: <span class="hljs-built_in">any</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">wasmExports</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">exports</span> = wasmExports;
  }

  <span class="hljs-title function_">allocate</span>(<span class="hljs-attr">bytes</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> ptr = <span class="hljs-variable language_">this</span>.<span class="hljs-property">exports</span>.<span class="hljs-title function_">malloc</span>(bytes);

    <span class="hljs-keyword">if</span> (ptr === <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to allocate <span class="hljs-subst">\${bytes}</span> bytes\`</span>);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">allocations</span>.<span class="hljs-title function_">set</span>(ptr, bytes);
    <span class="hljs-keyword">return</span> ptr;
  }

  <span class="hljs-title function_">free</span>(<span class="hljs-attr">ptr</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">allocations</span>.<span class="hljs-title function_">has</span>(ptr)) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Attempting to free untracked pointer: <span class="hljs-subst">\${ptr}</span>\`</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">exports</span>.<span class="hljs-title function_">free</span>(ptr);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">allocations</span>.<span class="hljs-title function_">delete</span>(ptr);
  }

  <span class="hljs-title function_">freeAll</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> ptr <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">allocations</span>.<span class="hljs-title function_">keys</span>()) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">exports</span>.<span class="hljs-title function_">free</span>(ptr);
    }
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">allocations</span>.<span class="hljs-title function_">clear</span>();
  }

  <span class="hljs-title function_">getMemoryUsage</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bytes <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">allocations</span>.<span class="hljs-title function_">values</span>()) {
      total += bytes;
    }
    <span class="hljs-keyword">return</span> total;
  }

  <span class="hljs-comment">// Auto-cleanup wrapper</span>
  withMemory&lt;T&gt;(<span class="hljs-attr">fn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">allocate</span>: (bytes: <span class="hljs-built_in">number</span>) =&gt; <span class="hljs-built_in">number</span></span>) =&gt;</span> T): T {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">ptrs</span>: <span class="hljs-built_in">number</span>[] = [];

    <span class="hljs-keyword">const</span> trackedAllocate = (<span class="hljs-attr">bytes</span>: <span class="hljs-built_in">number</span>): <span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> ptr = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">allocate</span>(bytes);
      ptrs.<span class="hljs-title function_">push</span>(ptr);
      <span class="hljs-keyword">return</span> ptr;
    };

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">fn</span>(trackedAllocate);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-comment">// Clean up all allocations</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> ptr <span class="hljs-keyword">of</span> ptrs) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">free</span>(ptr);
      }
    }
  }
}

<span class="hljs-comment">// React component with memory management</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">WASMComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> memoryManagerRef = useRef&lt;<span class="hljs-title class_">WASMMemoryManager</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Clean up all allocations on unmount</span>
      memoryManagerRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">freeAll</span>();
    };
  }, []);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">processData</span> = (<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Float32Array</span></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!memoryManagerRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    memoryManagerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">withMemory</span>(<span class="hljs-function">(<span class="hljs-params">allocate</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> ptr = <span class="hljs-title function_">allocate</span>(data.<span class="hljs-property">length</span> * <span class="hljs-number">4</span>);

      <span class="hljs-comment">// Use allocated memory</span>
      <span class="hljs-comment">// ...</span>

      <span class="hljs-comment">// Memory automatically freed when function exits</span>
    });
  };
}
</code></pre>
<h2 id="مراقبة-الأداء">مراقبة الأداء</h2>
<p>تتبّع أداء WASM:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// WASM performance monitor</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">WASMPerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">PerformanceMetric</span>[]&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

  measure&lt;T&gt;(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fn</span>: <span class="hljs-function">() =&gt;</span> T): T {
    <span class="hljs-keyword">const</span> startMemory = performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">fn</span>();

    <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - startTime;
    <span class="hljs-keyword">const</span> memoryDelta = (performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>) - startMemory;

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordMetric</span>(name, {
      duration,
      memoryDelta,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    });

    <span class="hljs-keyword">return</span> result;
  }

  <span class="hljs-keyword">async</span> measureAsync&lt;T&gt;(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">fn</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
    <span class="hljs-keyword">const</span> startMemory = performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fn</span>();

    <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - startTime;
    <span class="hljs-keyword">const</span> memoryDelta = (performance.<span class="hljs-property">memory</span>?.<span class="hljs-property">usedJSHeapSize</span> || <span class="hljs-number">0</span>) - startMemory;

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">recordMetric</span>(name, {
      duration,
      memoryDelta,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    });

    <span class="hljs-keyword">return</span> result;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">recordMetric</span>(<span class="hljs-params"><span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">metric</span>: <span class="hljs-title class_">PerformanceMetric</span></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">has</span>(name)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">set</span>(name, []);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name)!.<span class="hljs-title function_">push</span>(metric);

    <span class="hljs-comment">// Keep only last 100 metrics</span>
    <span class="hljs-keyword">const</span> metrics = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name)!;
    <span class="hljs-keyword">if</span> (metrics.<span class="hljs-property">length</span> &gt; <span class="hljs-number">100</span>) {
      metrics.<span class="hljs-title function_">shift</span>();
    }
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">PerformanceStats</span> | <span class="hljs-literal">null</span> {
    <span class="hljs-keyword">const</span> metrics = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">get</span>(name);
    <span class="hljs-keyword">if</span> (!metrics || metrics.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">const</span> durations = metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">duration</span>);
    <span class="hljs-keyword">const</span> memoryDeltas = metrics.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">memoryDelta</span>);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: metrics.<span class="hljs-property">length</span>,
      <span class="hljs-attr">avgDuration</span>: durations.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / durations.<span class="hljs-property">length</span>,
      <span class="hljs-attr">minDuration</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(...durations),
      <span class="hljs-attr">maxDuration</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...durations),
      <span class="hljs-attr">avgMemoryDelta</span>: memoryDeltas.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / memoryDeltas.<span class="hljs-property">length</span>,
    };
  }

  <span class="hljs-title function_">compareWithJS</span>(
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">jsImpl</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>,
    <span class="hljs-attr">wasmImpl</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>,
    <span class="hljs-attr">iterations</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">100</span>,
  ): <span class="hljs-title class_">ComparisonResult</span> {
    <span class="hljs-comment">// Warm up</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
      <span class="hljs-title function_">jsImpl</span>();
      <span class="hljs-title function_">wasmImpl</span>();
    }

    <span class="hljs-comment">// Measure JS</span>
    <span class="hljs-keyword">const</span> jsStart = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; iterations; i++) {
      <span class="hljs-title function_">jsImpl</span>();
    }
    <span class="hljs-keyword">const</span> jsTime = performance.<span class="hljs-title function_">now</span>() - jsStart;

    <span class="hljs-comment">// Measure WASM</span>
    <span class="hljs-keyword">const</span> wasmStart = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; iterations; i++) {
      <span class="hljs-title function_">wasmImpl</span>();
    }
    <span class="hljs-keyword">const</span> wasmTime = performance.<span class="hljs-title function_">now</span>() - wasmStart;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">jsTime</span>: jsTime / iterations,
      <span class="hljs-attr">wasmTime</span>: wasmTime / iterations,
      <span class="hljs-attr">speedup</span>: jsTime / wasmTime,
      <span class="hljs-attr">winner</span>: jsTime &gt; wasmTime ? <span class="hljs-string">&#x27;WASM&#x27;</span> : <span class="hljs-string">&#x27;JS&#x27;</span>,
    };
  }
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">WASMBestPractices</span> {
  <span class="hljs-comment">// When to use WASM</span>
  <span class="hljs-attr">useWhen</span>: {
    <span class="hljs-attr">cpuIntensive</span>: <span class="hljs-string">&#x27;Heavy mathematical computations&#x27;</span>;
    <span class="hljs-attr">largeDatasets</span>: <span class="hljs-string">&#x27;Processing arrays with 10K+ elements&#x27;</span>;
    <span class="hljs-attr">consistentPerformance</span>: <span class="hljs-string">&#x27;Need predictable performance&#x27;</span>;
    <span class="hljs-attr">existingCode</span>: <span class="hljs-string">&#x27;Porting existing C/C++/Rust code&#x27;</span>;
  };

  <span class="hljs-comment">// When NOT to use WASM</span>
  <span class="hljs-attr">avoidWhen</span>: {
    <span class="hljs-attr">domManipulation</span>: <span class="hljs-string">&#x27;Working with DOM elements&#x27;</span>;
    <span class="hljs-attr">simpleCalculations</span>: <span class="hljs-string">&#x27;Basic arithmetic or string operations&#x27;</span>;
    <span class="hljs-attr">frequentInterop</span>: <span class="hljs-string">&#x27;Many JS/WASM boundary crossings&#x27;</span>;
    <span class="hljs-attr">smallData</span>: <span class="hljs-string">&#x27;Processing small amounts of data&#x27;</span>;
  };

  <span class="hljs-comment">// Performance tips</span>
  <span class="hljs-attr">performance</span>: {
    <span class="hljs-attr">batchOperations</span>: <span class="hljs-string">&#x27;Process data in batches to reduce overhead&#x27;</span>;
    <span class="hljs-attr">reuseMemory</span>: <span class="hljs-string">&#x27;Allocate once, reuse memory buffers&#x27;</span>;
    <span class="hljs-attr">useWorkers</span>: <span class="hljs-string">&#x27;Run WASM in Web Workers for non-blocking&#x27;</span>;
    <span class="hljs-attr">preloadModules</span>: <span class="hljs-string">&#x27;Load WASM modules ahead of time&#x27;</span>;
  };

  <span class="hljs-comment">// Memory management</span>
  <span class="hljs-attr">memory</span>: {
    <span class="hljs-attr">trackAllocations</span>: <span class="hljs-string">&#x27;Keep track of all malloc calls&#x27;</span>;
    <span class="hljs-attr">freeMemory</span>: <span class="hljs-string">&#x27;Always free allocated memory&#x27;</span>;
    <span class="hljs-attr">useArena</span>: <span class="hljs-string">&#x27;Use arena allocation for temporary data&#x27;</span>;
    <span class="hljs-attr">limitSize</span>: <span class="hljs-string">&#x27;Set memory limits to prevent runaway growth&#x27;</span>;
  };
}
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
