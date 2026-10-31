const s="kinney",a="react-typescript",n="React مع TypeScript",l="assets-and-module-declarations",p="الأصول وإقرارات الوحدات",e=[{depth:2,id:"لماذا-يلتبس-typescript",text:"لماذا يلتبس TypeScript"},{depth:2,id:"إنشاء-ملف-إقرارات-الوحدات-الأول",text:"إنشاء ملف إقرارات الوحدات الأول"},{depth:2,id:"التعامل-مع-أنواع-الأصول-المختلفة",text:"التعامل مع أنواع الأصول المختلفة"},{depth:3,id:"css-والتنسيق",text:"CSS والتنسيق"},{depth:3,id:"ملفات-svg-الحالة-الصعبة",text:"ملفات SVG: الحالة الصعبة"},{depth:2,id:"إقرارات-الأصول-المتقدمة",text:"إقرارات الأصول المتقدّمة"},{depth:3,id:"الخطوط-والملفات-الأخرى",text:"الخطوط والملفات الأخرى"},{depth:3,id:"ملفات-الوسائط",text:"ملفات الوسائط"},{depth:2,id:"الإقرارات-الخاصة-بكل-بيئة",text:"الإقرارات الخاصة بكل بيئة"},{depth:2,id:"مثال-واقعي-إعداد-الأصول-الكامل",text:"مثال واقعي: إعداد الأصول الكامل"},{depth:2,id:"استخدام-إقراراتك",text:"استخدام إقراراتك"},{depth:2,id:"اعتبارات-خاصة-بكل-إطار-عمل",text:"اعتبارات خاصة بكل إطار عمل"},{depth:3,id:"create-react-app",text:"Create React App"},{depth:3,id:"vite",text:"Vite"},{depth:3,id:"nextjs",text:"Next.js"},{depth:2,id:"الأخطاء-الشائعة-وكيف-تتجنبها",text:"الأخطاء الشائعة وكيف تتجنّبها"},{depth:3,id:"جذور-الأنواع-المفقودة",text:"جذور الأنواع المفقودة"},{depth:3,id:"إقرارات-متعارضة",text:"إقرارات متعارضة"},{depth:3,id:"أكثر-عمومية-من-اللازم-أو-أكثر-تحديدا-من-اللازم",text:"أكثر عمومية من اللازم أو أكثر تحديدًا من اللازم"},{depth:2,id:"اختبار-إقرارات-وحداتك",text:"اختبار إقرارات وحداتك"},{depth:2,id:"حين-لا-تكفي-إقرارات-الوحدات",text:"حين لا تكفي إقرارات الوحدات"}],c=`<p>حين تبني تطبيق React، فأنت لا تكتب JavaScript وTypeScript فحسب. أنت تستورد ملفات CSS وصورًا وملفات SVG وخطوطًا وكل أنواع الأصول الأخرى التي تجعل تطبيقك يبدو جيّدًا ويعمل على نحو صحيح. لكن هذه هي المسألة: لا يعرف TypeScript افتراضيًا ماذا يفعل بهذه الملفات غير المكتوبة بـ JavaScript، وسيُطلق نَفَسًا من الغضب في كلّ مرّة تحاول فيها استيرادها.</p>
<p>وهنا يأتي دور <strong>إقرارات الوحدات (module declarations)</strong>—طريقة TypeScript في القول: «أعرف ما هذا الامتداد الغريب للملف، وهذه هي الطريقة التي ينبغي أن تتعامل معه بها». فبكتابة إقرارات وحدات مخصّصة، يمكنك أن تجعل TypeScript يفهم أصولك، ويحصل على إكمال تلقائي صحيح، ويتخلّص من أخطاء «Cannot find module» المزعجة التي تلاحق كل مشروع React في وقت ما.</p>
<h2 id="لماذا-يلتبس-typescript">لماذا يلتبس TypeScript</h2>
<p>لنبدأ بالمشكلة. لقد رأيت على الأرجح شيئًا كهذا في تطبيق React لديك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;./Button.css&#x27;</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./logo.png&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">IconSvg</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./icon.svg&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Button</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;fancy-button&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{logo}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Company logo&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">IconSvg</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;button-icon&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>من دون إقرارات وحدات سليمة، سيشتكي TypeScript من كل استيراد هنا:</p>
<pre><code>❌ Cannot find module './Button.css' or its corresponding type declarations.
❌ Cannot find module './logo.png' or its corresponding type declarations.
❌ Cannot find module './icon.svg' or its corresponding type declarations.
</code></pre>
<p>السبب بسيط: لا يفهم TypeScript افتراضيًا سوى ملفات JavaScript وTypeScript. وحين يصادف ملف <code>.css</code> أو <code>.png</code> أو <code>.svg</code> فلا فكرة لديه عمّا ينبغي أن تكون هذه الملفات أو كيف ينبغي أن تتصرّف في شيفرتك.</p>
<h2 id="إنشاء-ملف-إقرارات-الوحدات-الأول">إنشاء ملف إقرارات الوحدات الأول</h2>
<p>تعيش إقرارات الوحدات في ملفات <code>.d.ts</code> (الحرف «d» اختصارًا لكلمة «declaration»). يمكنك وضعها في أي مكان يعثر عليه TypeScript، لكن الأسلوب المتّبع هو إنشاء مجلّد <code>types</code> أو إضافتها إلى ملفات تعريف الأنواع الموجودة لديك.</p>
<p>لنبدأ بإنشاء ملف <code>src/types/assets.d.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// src/types/assets.d.ts</span>

<span class="hljs-comment">// CSS Modules and regular CSS files</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">styles</span>: { [<span class="hljs-attr">className</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> styles;
}

<span class="hljs-comment">// Images</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.png&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.jpg&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.jpeg&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.webp&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}
</code></pre>
<p>هذا يخبر TypeScript: «حين يستورد أحدهم ملف <code>.css</code>، تعامل معه ككائن له مفاتيح نصّية وقيم نصّية. وحين يستورد أحدهم صورة، تعامل معها كنصّ (رابط URL للصورة)».</p>
<blockquote>
<p><strong>تلميح</strong></p>
<p>تأكّد من أنّ <code>tsconfig.json</code> يتضمّن مجلّد <code>types</code> أو من أنّ ملفات الإقرارات هذه في مكان يعثر عليه TypeScript تلقائيًا.</p>
</blockquote>
<h2 id="التعامل-مع-أنواع-الأصول-المختلفة">التعامل مع أنواع الأصول المختلفة</h2>
<h3 id="css-والتنسيق">CSS والتنسيق</h3>
<p>إقرار CSS أعلاه يعمل مع ملفات CSS العادية ومع CSS Modules معًا. فإذا كنت تستخدم CSS Modules حصريًا وتريد تصنيفًا أدقّ، فيمكنك أن تكون أكثر تحديدًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// For CSS Modules specifically</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.module.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: { [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes;
}

<span class="hljs-comment">// For regular CSS files (side-effect imports)</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content;
}
</code></pre>
<p>ومع CSS Modules، قد ترغب أيضًا في إضافة نوع أكثر تقييدًا إذا كنت تعرف أسماء أصنافك مسبقًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// For a specific CSS Module file</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;./Button.module.css&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Classes</span> {
    <span class="hljs-attr">button</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">primary</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">secondary</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">disabled</span>: <span class="hljs-built_in">string</span>;
  }
  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: <span class="hljs-title class_">Classes</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes;
}
</code></pre>
<h3 id="ملفات-svg-الحالة-الصعبة">ملفات SVG: الحالة الصعبة</h3>
<p>تُعدّ ملفات SVG مثيرة للاهتمام بصفة خاصة لأن حُزّام الملفات (bundlers) غالبًا ما تتعامل معها بطرق مختلفة. فبعضها يتعامل معها كروابط صور، وبعضها يتيح لك استيرادها كمكوّنات React. إليك كيفية التعامل مع الحالتين معًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// SVGs as URLs (like images)</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-comment">// SVGs as React components (common with SVGR)</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg&#x27;</span> {
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">SVGComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FunctionComponent</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt; &amp; { <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span> }&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">SVGComponent</span>;
}
</code></pre>
<p>لكن انتبه—لا يمكن أن يكون لديك إقراران لنمط الوحدة نفسه! فإذا كان حُزّامك يدعم الحالتين معًا (مثل Create React App أو Vite مع الإضافات المناسبة)، فسيُلزمك أن تكون أكثر تحديدًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// For SVGs imported as URLs</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg?url&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-comment">// For SVGs imported as React components</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg&#x27;</span> {
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">SVGComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FunctionComponent</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt; &amp; { <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span> }&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">SVGComponent</span>;
}
</code></pre>
<p>ثم في شيفرتك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">IconComponent</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./icon.svg&#x27;</span>; <span class="hljs-comment">// React component</span>
<span class="hljs-keyword">import</span> iconUrl <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./icon.svg?url&#x27;</span>; <span class="hljs-comment">// URL string</span>

<span class="hljs-comment">// Use as component</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconComponent</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;w-6 h-6&quot;</span> /&gt;</span></span>

<span class="hljs-comment">// Use as image source</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{iconUrl}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Icon&quot;</span> /&gt;</span></span>
</code></pre>
<h2 id="إقرارات-الأصول-المتقدمة">إقرارات الأصول المتقدّمة</h2>
<h3 id="الخطوط-والملفات-الأخرى">الخطوط والملفات الأخرى</h3>
<p>لا تنسَ الأصول الأخرى التي قد يستخدمها تطبيقك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Font files</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.woff&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.woff2&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.ttf&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-comment">// Data files</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.json&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> value;
}

<span class="hljs-comment">// Text files</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.txt&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content;
}
</code></pre>
<h3 id="ملفات-الوسائط">ملفات الوسائط</h3>
<p>بالنسبة إلى الصوت والفيديو:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.mp4&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.webm&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.mp3&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.wav&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}
</code></pre>
<h2 id="الإقرارات-الخاصة-بكل-بيئة">الإقرارات الخاصة بكل بيئة</h2>
<p>أحيانًا تحتاج إلى إقرارات مختلفة لكل بيئة. يمكنك استخدام تحسين الوحدات (module augmentation) في TypeScript لهذا الغرض:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In development, you might want more detailed image information</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.png&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// This allows you to import both the src and metadata</span>
<span class="hljs-keyword">import</span> logoSrc, { width, height } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./logo.png&#x27;</span>;
</code></pre>
<h2 id="مثال-واقعي-إعداد-الأصول-الكامل">مثال واقعي: إعداد الأصول الكامل</h2>
<p>إليك ملف <code>src/types/assets.d.ts</code> شاملًا يغطّي معظم حالات الاستخدام الشائعة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// CSS and styling</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">styles</span>: { [<span class="hljs-attr">className</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> styles;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.module.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: { [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.scss&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">styles</span>: { [<span class="hljs-attr">className</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> styles;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.module.scss&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">classes</span>: { [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> classes;
}

<span class="hljs-comment">// Images</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.png&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.jpg&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.jpeg&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.gif&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.webp&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.avif&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-comment">// SVGs (as React components)</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg&#x27;</span> {
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">SVGComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FunctionComponent</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt; &amp; { <span class="hljs-attr">title</span>?: <span class="hljs-built_in">string</span> }&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">SVGComponent</span>;
}

<span class="hljs-comment">// SVGs as URLs (when using ?url suffix)</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg?url&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-comment">// Fonts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.woff&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.woff2&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.ttf&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.otf&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-comment">// Audio/Video</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.mp4&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.webm&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.mp3&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.wav&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-comment">// Documents and data</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.pdf&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> src;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.txt&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content;
}
</code></pre>
<h2 id="استخدام-إقراراتك">استخدام إقراراتك</h2>
<p>بعد أن تُنشئ إقرارات وحداتك، يصبح استيراد الأصول أمرًا يسيرًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// All of these now have proper TypeScript support</span>
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./Component.module.css&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;./global.css&#x27;</span>;
<span class="hljs-keyword">import</span> heroImage <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./hero.jpg&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">LogoIcon</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./logo.svg&#x27;</span>;
<span class="hljs-keyword">import</span> logoUrl <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./logo.svg?url&#x27;</span>;
<span class="hljs-keyword">import</span> fontFile <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./custom-font.woff2&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Hero</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.hero}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{heroImage}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;Hero&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">LogoIcon</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.logo}</span> /&gt;</span>
      {/* TypeScript knows all about these imports! */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اعتبارات-خاصة-بكل-إطار-عمل">اعتبارات خاصة بكل إطار عمل</h2>
<h3 id="create-react-app">Create React App <span class="content-anchor" id="create-react-app-1"></span></h3>
<p>إذا كنت تستخدم Create React App، فهو يأتي مع بعض إقرارات الأصول مدمجة، لكنك قد ترغب في توسيعها. يبحث CRA عن ملفات الإقرارات في <code>src/</code>، لذا ينبغي أن يعمل ملف <code>src/types/assets.d.ts</code> لديك على نحو مثالي.</p>
<h3 id="vite">Vite</h3>
<p>يقدّم Vite دعمًا مدمجًا ممتازًا للأصول ويوفّر تعريفات أنواع خاصة به. يمكنك توسيعها في ملف <code>vite-env.d.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">/// &lt;reference types=&quot;vite/client&quot; /&gt;</span>

<span class="hljs-comment">// Extend Vite&#x27;s built-in asset handling</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.svg?component&#x27;</span> {
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">SVGComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FunctionComponent</span>&lt;<span class="hljs-title class_">React</span>.<span class="hljs-property">SVGProps</span>&lt;<span class="hljs-title class_">SVGSVGElement</span>&gt;&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">SVGComponent</span>;
}
</code></pre>
<h3 id="nextjs">Next.js</h3>
<p>يتعامل Next.js مع أصول كثيرة تلقائيًا، لكنك قد تحتاج إلى إقرارات مخصّصة للأصول المتخصّصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// next-env.d.ts (or in your custom declaration file)</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.md&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.mdx&#x27;</span> {
  <span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">MDXComponent</span>: <span class="hljs-title class_">ComponentType</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">MDXComponent</span>;
}
</code></pre>
<h2 id="الأخطاء-الشائعة-وكيف-تتجنبها">الأخطاء الشائعة وكيف تتجنّبها</h2>
<h3 id="جذور-الأنواع-المفقودة">جذور الأنواع المفقودة</h3>
<p>إذا لم تكن إقراراتك قد التُقطت، فافحص <code>tsconfig.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;typeRoots&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;./types&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;./node_modules/@types&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;types/**/*&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إقرارات-متعارضة">إقرارات متعارضة</h3>
<p>إذا كانت لديك عدّة ملفات إقرارات تعرّف أنماط الوحدات نفسها، فسيشتكي TypeScript. تأكّد من أنّ كل نمط معرَّف مرّة واحدة فقط عبر كل ملفات <code>.d.ts</code> لديك.</p>
<h3 id="أكثر-عمومية-من-اللازم-أو-أكثر-تحديدا-من-اللازم">أكثر عمومية من اللازم أو أكثر تحديدًا من اللازم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Too generic - loses type information</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">content</span>: <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content;
}

<span class="hljs-comment">// ✅ Just right - specific enough to be useful</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;*.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">styles</span>: { [<span class="hljs-attr">className</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span> };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> styles;
}

<span class="hljs-comment">// ❌ Too specific - maintenance nightmare</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;./specific-file.css&#x27;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">styles</span>: {
    <span class="hljs-attr">button</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">primary</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-comment">// ... every class name</span>
  };
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> styles;
}
</code></pre>
<h2 id="اختبار-إقرارات-وحداتك">اختبار إقرارات وحداتك</h2>
<p>يمكنك التحقّق من عمل إقراراتك عبر استيراد أصل ومطابقة الأنواع المستنتجة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./test.css&#x27;</span>;
<span class="hljs-keyword">import</span> image <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./test.png&#x27;</span>;

<span class="hljs-comment">// Hover over these in your IDE to see the inferred types</span>
<span class="hljs-keyword">const</span> buttonClass = styles.<span class="hljs-property">button</span>; <span class="hljs-comment">// string</span>
<span class="hljs-keyword">const</span> imageSrc = image; <span class="hljs-comment">// string</span>

<span class="hljs-comment">// TypeScript should catch these errors:</span>
<span class="hljs-comment">// const invalid = styles.nonexistentClass; // Should work (CSS modules are flexible)</span>
<span class="hljs-comment">// const alsoInvalid: number = image; // Should error</span>
</code></pre>
<h2 id="حين-لا-تكفي-إقرارات-الوحدات">حين لا تكفي إقرارات الوحدات</h2>
<p>أحيانًا تحتاج إلى ما هو أكثر من إقرارات الوحدات الأساسية. في السيناريوهات المعقّدة، فكّر في:</p>
<ol>
<li><strong>إضافات مخصّصة لحُزّام الملفات</strong> تولّد الأنواع تلقائيًا</li>
<li><strong>توليد الأنواع وقت البناء</strong> لأشياء مثل GraphQL أو مخطّطات API</li>
<li><strong>التحقّق وقت التشغيل (runtime validation)</strong> بمكتبات مثل Zod للاستيرادات الديناميكية</li>
</ol>
<p>لكن لِما يقارب 90% من احتياجات استيراد الأصول في تطبيقات React، ستفي إقرارات الوحدات التي غطّيناها هنا بالغرض على نحو جيّد.</p>
<hr>
<p>قد تبدو إقرارات الوحدات كأنها شيفرة روتينية (boilerplate)، لكنها هي الأساس الذي يجعل استيراد الأصول في تطبيقات React المكتوبة بـ TypeScript أمرًا ممتعًا في العمل عليه فعلًا. اضبطها مرّة واحدة، وستحصل على إكمال تلقائي صحيح، وفحص أخطاء، وذلك الإحساس الدافئ بالسلامة النمطية في كل مرّة تستورد فيها صورة أو ملف أنماط أو أي أصل آخر.</p>
<p>وفي المرّة القادمة التي تصادف فيها خطأ «Cannot find module» لأصل ما، ستعرف تمامًا ما ينبغي فعله: اكتب إقرارًا، وعلّم TypeScript ما ينبغي أن يكون عليه ذلك الملف، ثم عُد إلى بناء تجارب مستخدم رائعة.</p>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,l as slug,p as title};
