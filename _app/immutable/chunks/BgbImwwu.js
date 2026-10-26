const s="kinney",a="react-typescript",n="React مع TypeScript",l="module-federation-typescript",p="اتحاد الوحدات بواسطة TypeScript",t=[{depth:2,id:"فهم-اتحاد-الوحدات",text:"فهم اتحاد الوحدات"},{depth:2,id:"تهيئة-الأساس",text:"تهيئة الأساس"},{depth:3,id:"تهيئة-التطبيق-المضيف-host",text:"تهيئة التطبيق المُضيّف (host)"},{depth:3,id:"تهيئة-التطبيق-البعيد-remote",text:"تهيئة التطبيق البعيد (remote)"},{depth:2,id:"تعريفات-الأنواع-للوحدات-البعيدة",text:"تعريفات الأنواع للوحدات البعيدة"},{depth:3,id:"الإعلانات-النوعية-اليدوية",text:"الإعلانات النوعية اليدوية"},{depth:2,id:"التوليد-الآلي-للأنواع",text:"التوليد الآلي للأنواع"},{depth:3,id:"سكربت-استخلاص-الأنواع",text:"سكربت استخلاص الأنواع"},{depth:2,id:"أمان-الأنواع-عند-وقت-التشغيل",text:"أمان الأنواع عند وقت التشغيل"},{depth:3,id:"حراس-الأنواع-للمكونات-البعيدة",text:"حرّاس الأنواع للمكوّنات البعيدة"},{depth:3,id:"محمل-آمن-للمكونات-البعيدة",text:"محمّلٌ آمن للمكوّنات البعيدة"},{depth:2,id:"خطافات-بعيدة-آمنة-الأنواع",text:"خُطّافاتٌ بعيدةٌ آمنة الأنواع"},{depth:3,id:"محمل-الخطافات-البعيد",text:"محمّل الخُطّافات البعيد"},{depth:2,id:"تعريفات-أنواع-مشتركة",text:"تعريفات أنواع مشتركة"},{depth:3,id:"حزمة-أنواع-مركزية",text:"حزمة أنواع مركزية"},{depth:3,id:"تهيئة-الحزمة",text:"تهيئة الحزمة"},{depth:2,id:"التواصل-المحرك-بالأحداث",text:"التواصل المحرَّك بالأحداث"},{depth:3,id:"ناقل-أحداث-آمن-الأنواع",text:"ناقل أحداثٍ آمن الأنواع"},{depth:3,id:"خطاف-react-للأحداث",text:"خُطّاف React للأحداث"},{depth:2,id:"التطوير-والاختبار",text:"التطوير والاختبار"},{depth:3,id:"مكونات-بعيدة-محاكاة-للتطوير",text:"مكوّنات بعيدة مُحاكاةً للتطوير"},{depth:3,id:"اختبار-المكونات-الاتحادية",text:"اختبار المكوّنات الاتحادية"},{depth:2,id:"اعتبارات-الإنتاج",text:"اعتبارات الإنتاج"},{depth:3,id:"تهيئة-خاصة-بكل-بيئة",text:"تهيئة خاصة بكل بيئة"},{depth:3,id:"استرداد-الأخطاء-والبدائل-الاحتياطية",text:"استرداد الأخطاء والبدائل الاحتياطية"},{depth:3,id:"المراقبة-والتحليلات",text:"المراقبة والتحليلات"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"أمان-الأنواع-أولا",text:"أمان الأنواع أولًا"},{depth:3,id:"حدود-أخطاء-في-كل-مكان",text:"حدود أخطاء في كل مكان"},{depth:3,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:3,id:"إدارة-الإصدارات",text:"إدارة الإصدارات"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>اتحاد الوحدات (Module Federation) هو أسلوب لبناء تطبيقات React ونشرها — خصوصًا في الشركات الكبيرة التي لم تتيسر فرقُها على الحديث مع بعضها. بدلًا من حزمة موحّدة ضخمة، تستطيع إنشاء واجهاتٍ أمامية مصغّرة (micro-frontends) تتبادل المكوّنات والمكتبات بل وتطبيقات كاملةً عند وقت التشغيل. لكن مع القوة الكبيرة تعقيد كبير، خصوصًا حين يختلط TypeScript بالمشهد. لنتكشف كيف نبني تطبيقاتٍ اتحاديةً آمنة الأنواع.</p>
<blockquote>
<p><strong>لا أظن الواجهات المصغّرة فكرةً حسنة™</strong></p>
<p>اقتربتُ من عقدٍ كامل وأنا أعتبر الواجهاتَ المصغّرة حلًّا تقنيًا لمشكلة تنظيمية. فلا تلتمس مني أن أدافع عن هذه الممارسة أو عن أي حلقاتٍ سخيفة يقفز الناس من خلالها فيما يلي.</p>
<p>وإنما وُجد هذا المضمون كي، إذا سألني أحدٌ عنه، أحيلَه إلى هذه الصفحة، وعسى أن يقرأ صندوق التحذير هذا.</p>
</blockquote>
<h2 id="فهم-اتحاد-الوحدات">فهم اتحاد الوحدات</h2>
<p>يسمح لك اتحاد الوحدات بـ:</p>
<ul>
<li><strong>مشاركة الاعتمادات (dependencies)</strong> بين التطبيقات عند وقت التشغيل</li>
<li><strong>تحميل مكوّنات بعيدة</strong> على نحو ديناميكي</li>
<li><strong>النشر باستقلال</strong> مع المحافظة على التكامل</li>
<li><strong>توسيع الفرق</strong> بقيام كل فريقٍ بامتلاك واجهةٍ مصغّرة منفصلة</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// Host application loads remote components</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">RemoteButton</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;remoteApp/Button&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">RemoteUserCard</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;remoteApp/UserCard&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">App</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Host Application<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">RemoteButton</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> console.log(&#x27;clicked&#x27;)}&gt;
        Remote Button
      <span class="hljs-tag">&lt;/<span class="hljs-name">RemoteButton</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">RemoteUserCard</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>والتحدي؟ TypeScript لا يعلم شيئًا عن هذه الوحدات البعيدة عند وقت البناء.</p>
<h2 id="تهيئة-الأساس">تهيئة الأساس</h2>
<h3 id="تهيئة-التطبيق-المضيف-host">تهيئة التطبيق المُضيّف (host)</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// webpack.config.js (Host)</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ModuleFederationPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@module-federation/webpack&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;development&#x27;</span>,
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">port</span>: <span class="hljs-number">3000</span>,
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&#x27;.tsx&#x27;</span>, <span class="hljs-string">&#x27;.ts&#x27;</span>, <span class="hljs-string">&#x27;.js&#x27;</span>],
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.tsx?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&#x27;ts-loader&#x27;</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      },
    ],
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ModuleFederationPlugin</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;host&#x27;</span>,
      <span class="hljs-attr">remotes</span>: {
        <span class="hljs-attr">remoteApp</span>: <span class="hljs-string">&#x27;remoteApp@http://localhost:3001/remoteEntry.js&#x27;</span>,
        <span class="hljs-attr">remoteLibrary</span>: <span class="hljs-string">&#x27;remoteLibrary@http://localhost:3002/remoteEntry.js&#x27;</span>,
      },
      <span class="hljs-attr">shared</span>: {
        <span class="hljs-attr">react</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
        },
        <span class="hljs-string">&#x27;react-dom&#x27;</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
        },
        <span class="hljs-string">&#x27;@types/react&#x27;</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span>,
        },
      },
    }),
  ],
};
</code></pre>
<h3 id="تهيئة-التطبيق-البعيد-remote">تهيئة التطبيق البعيد (remote)</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// webpack.config.js (Remote)</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ModuleFederationPlugin</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@module-federation/webpack&#x27;</span>);

<span class="hljs-variable language_">module</span>.<span class="hljs-property">exports</span> = {
  <span class="hljs-attr">mode</span>: <span class="hljs-string">&#x27;development&#x27;</span>,
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">port</span>: <span class="hljs-number">3001</span>,
    <span class="hljs-attr">headers</span>: {
      <span class="hljs-string">&#x27;Access-Control-Allow-Origin&#x27;</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
    },
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&#x27;.tsx&#x27;</span>, <span class="hljs-string">&#x27;.ts&#x27;</span>, <span class="hljs-string">&#x27;.js&#x27;</span>],
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\\.tsx?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&#x27;ts-loader&#x27;</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      },
    ],
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ModuleFederationPlugin</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;remoteApp&#x27;</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&#x27;remoteEntry.js&#x27;</span>,
      <span class="hljs-attr">exposes</span>: {
        <span class="hljs-string">&#x27;./Button&#x27;</span>: <span class="hljs-string">&#x27;./src/components/Button&#x27;</span>,
        <span class="hljs-string">&#x27;./UserCard&#x27;</span>: <span class="hljs-string">&#x27;./src/components/UserCard&#x27;</span>,
        <span class="hljs-string">&#x27;./hooks/useUser&#x27;</span>: <span class="hljs-string">&#x27;./src/hooks/useUser&#x27;</span>,
        <span class="hljs-string">&#x27;./types&#x27;</span>: <span class="hljs-string">&#x27;./src/types/index&#x27;</span>,
      },
      <span class="hljs-attr">shared</span>: {
        <span class="hljs-attr">react</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
        },
        <span class="hljs-string">&#x27;react-dom&#x27;</span>: {
          <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
        },
      },
    }),
  ],
};
</code></pre>
<h2 id="تعريفات-الأنواع-للوحدات-البعيدة">تعريفات الأنواع للوحدات البعيدة</h2>
<h3 id="الإعلانات-النوعية-اليدوية">الإعلانات النوعية اليدوية</h3>
<p>أنشئ تعريفات أنواعٍ للوحدات البعيدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// types/remotes.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;remoteApp/Button&#x27;</span> {
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ButtonProps</span> {
    <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
    <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
    <span class="hljs-attr">size</span>?: <span class="hljs-string">&#x27;small&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;large&#x27;</span>;
    <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  }

  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Button</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">ButtonProps</span>&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">Button</span>;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;remoteApp/UserCard&#x27;</span> {
  <span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserCardProps</span> {
    <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">onEdit</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">onDelete</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">compact</span>?: <span class="hljs-built_in">boolean</span>;
  }

  <span class="hljs-keyword">const</span> <span class="hljs-title class_">UserCard</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">UserCardProps</span>&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">UserCard</span>;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;remoteApp/hooks/useUser&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">lastSeen</span>: <span class="hljs-title class_">Date</span>;
  }

  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UseUserResult</span> {
    <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">refetch</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useUser</span>(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">UseUserResult</span>;
}

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;remoteApp/types&#x27;</span> {
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">lastSeen</span>: <span class="hljs-title class_">Date</span>;
    <span class="hljs-attr">preferences</span>: {
      <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
      <span class="hljs-attr">notifications</span>: <span class="hljs-built_in">boolean</span>;
    };
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; {
    <span class="hljs-attr">data</span>: T;
    <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">UserRole</span> = <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span> | <span class="hljs-string">&#x27;viewer&#x27;</span>;
}
</code></pre>
<h2 id="التوليد-الآلي-للأنواع">التوليد الآلي للأنواع</h2>
<h3 id="سكربت-استخلاص-الأنواع">سكربت استخلاص الأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// scripts/extract-types.ts</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> ts <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;typescript&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ExposedModule</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">exports</span>: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">TypeExtractor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">program</span>: ts.<span class="hljs-property">Program</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">checker</span>: ts.<span class="hljs-property">TypeChecker</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> <span class="hljs-attr">configPath</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-keyword">const</span> config = ts.<span class="hljs-title function_">readConfigFile</span>(configPath, ts.<span class="hljs-property">sys</span>.<span class="hljs-property">readFile</span>);
    <span class="hljs-keyword">const</span> parsedConfig = ts.<span class="hljs-title function_">parseJsonConfigFileContent</span>(
      config.<span class="hljs-property">config</span>,
      ts.<span class="hljs-property">sys</span>,
      path.<span class="hljs-title function_">dirname</span>(configPath),
    );

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span> = ts.<span class="hljs-title function_">createProgram</span>(parsedConfig.<span class="hljs-property">fileNames</span>, parsedConfig.<span class="hljs-property">options</span>);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">checker</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>.<span class="hljs-title function_">getTypeChecker</span>();
  }

  <span class="hljs-title function_">extractTypes</span>(<span class="hljs-attr">exposedModules</span>: <span class="hljs-title class_">ExposedModule</span>[]): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">let</span> declarations = <span class="hljs-string">&#x27;&#x27;</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> <span class="hljs-variable language_">module</span> <span class="hljs-keyword">of</span> exposedModules) {
      <span class="hljs-keyword">const</span> sourceFile = <span class="hljs-variable language_">this</span>.<span class="hljs-property">program</span>.<span class="hljs-title function_">getSourceFile</span>(<span class="hljs-variable language_">module</span>.<span class="hljs-property">path</span>);
      <span class="hljs-keyword">if</span> (!sourceFile) <span class="hljs-keyword">continue</span>;

      <span class="hljs-keyword">const</span> moduleDeclaration = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateModuleDeclaration</span>(<span class="hljs-variable language_">module</span>, sourceFile);
      declarations += moduleDeclaration + <span class="hljs-string">&#x27;\\n\\n&#x27;</span>;
    }

    <span class="hljs-keyword">return</span> declarations;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateModuleDeclaration</span>(<span class="hljs-attr">module</span>: <span class="hljs-title class_">ExposedModule</span>, <span class="hljs-attr">sourceFile</span>: ts.<span class="hljs-property">SourceFile</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">exports</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">extractExports</span>(sourceFile);
    <span class="hljs-keyword">const</span> imports = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">extractImports</span>(sourceFile);

    <span class="hljs-keyword">let</span> declaration = <span class="hljs-string">\`declare module &#x27;<span class="hljs-subst">\${<span class="hljs-variable language_">module</span>.name}</span>&#x27; {\\n\`</span>;

    <span class="hljs-comment">// Add imports</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> imp <span class="hljs-keyword">of</span> imports) {
      declaration += <span class="hljs-string">\`  <span class="hljs-subst">\${imp}</span>\\n\`</span>;
    }

    <span class="hljs-keyword">if</span> (imports.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      declaration += <span class="hljs-string">&#x27;\\n&#x27;</span>;
    }

    <span class="hljs-comment">// Add exports</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> exp <span class="hljs-keyword">of</span> <span class="hljs-built_in">exports</span>) {
      declaration += <span class="hljs-string">\`  <span class="hljs-subst">\${exp}</span>\\n\`</span>;
    }

    declaration += <span class="hljs-string">&#x27;}&#x27;</span>;
    <span class="hljs-keyword">return</span> declaration;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">extractExports</span>(<span class="hljs-attr">sourceFile</span>: ts.<span class="hljs-property">SourceFile</span>): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">exports</span>: <span class="hljs-built_in">string</span>[] = [];

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">visit</span> = (<span class="hljs-params"><span class="hljs-attr">node</span>: ts.<span class="hljs-title class_">Node</span></span>) =&gt; {
      <span class="hljs-comment">// Extract export declarations</span>
      <span class="hljs-keyword">if</span> (ts.<span class="hljs-title function_">isExportDeclaration</span>(node)) {
        <span class="hljs-keyword">const</span> exportClause = node.<span class="hljs-property">exportClause</span>;
        <span class="hljs-keyword">if</span> (exportClause &amp;&amp; ts.<span class="hljs-title function_">isNamedExports</span>(exportClause)) {
          <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> element <span class="hljs-keyword">of</span> exportClause.<span class="hljs-property">elements</span>) {
            <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`export { <span class="hljs-subst">\${element.name.text}</span> };\`</span>);
          }
        }
      }

      <span class="hljs-comment">// Extract exported functions/components</span>
      <span class="hljs-keyword">if</span> (
        ts.<span class="hljs-title function_">isFunctionDeclaration</span>(node) &amp;&amp;
        node.<span class="hljs-property">modifiers</span>?.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">kind</span> === ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">ExportKeyword</span>)
      ) {
        <span class="hljs-keyword">const</span> signature = <span class="hljs-variable language_">this</span>.<span class="hljs-property">checker</span>.<span class="hljs-title function_">getSignatureFromDeclaration</span>(node);
        <span class="hljs-keyword">if</span> (signature) {
          <span class="hljs-keyword">const</span> typeString = <span class="hljs-variable language_">this</span>.<span class="hljs-property">checker</span>.<span class="hljs-title function_">typeToString</span>(signature.<span class="hljs-title function_">getReturnType</span>());
          <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">push</span>(<span class="hljs-string">\`export function <span class="hljs-subst">\${node.name?.text}</span>(...args: any[]): <span class="hljs-subst">\${typeString}</span>;\`</span>);
        }
      }

      <span class="hljs-comment">// Extract exported interfaces</span>
      <span class="hljs-keyword">if</span> (
        ts.<span class="hljs-title function_">isInterfaceDeclaration</span>(node) &amp;&amp;
        node.<span class="hljs-property">modifiers</span>?.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">kind</span> === ts.<span class="hljs-property">SyntaxKind</span>.<span class="hljs-property">ExportKeyword</span>)
      ) {
        <span class="hljs-keyword">const</span> interfaceText = node.<span class="hljs-title function_">getFullText</span>().<span class="hljs-title function_">trim</span>();
        <span class="hljs-built_in">exports</span>.<span class="hljs-title function_">push</span>(interfaceText);
      }

      ts.<span class="hljs-title function_">forEachChild</span>(node, visit);
    };

    <span class="hljs-title function_">visit</span>(sourceFile);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">exports</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">extractImports</span>(<span class="hljs-attr">sourceFile</span>: ts.<span class="hljs-property">SourceFile</span>): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">imports</span>: <span class="hljs-built_in">string</span>[] = [];

    sourceFile.<span class="hljs-property">statements</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">statement</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (ts.<span class="hljs-title function_">isImportDeclaration</span>(statement)) {
        <span class="hljs-keyword">const</span> importText = statement.<span class="hljs-title function_">getFullText</span>().<span class="hljs-title function_">trim</span>();
        imports.<span class="hljs-title function_">push</span>(importText);
      }
    });

    <span class="hljs-keyword">return</span> imports;
  }
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> extractor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TypeExtractor</span>(<span class="hljs-string">&#x27;./tsconfig.json&#x27;</span>);
<span class="hljs-keyword">const</span> <span class="hljs-attr">exposedModules</span>: <span class="hljs-title class_">ExposedModule</span>[] = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;remoteApp/Button&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./src/components/Button.tsx&#x27;</span>, <span class="hljs-attr">exports</span>: [<span class="hljs-string">&#x27;default&#x27;</span>] },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;remoteApp/UserCard&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./src/components/UserCard.tsx&#x27;</span>, <span class="hljs-attr">exports</span>: [<span class="hljs-string">&#x27;default&#x27;</span>] },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;remoteApp/types&#x27;</span>, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./src/types/index.ts&#x27;</span>, <span class="hljs-attr">exports</span>: [<span class="hljs-string">&#x27;User&#x27;</span>, <span class="hljs-string">&#x27;ApiResponse&#x27;</span>] },
];

<span class="hljs-keyword">const</span> types = extractor.<span class="hljs-title function_">extractTypes</span>(exposedModules);
fs.<span class="hljs-title function_">writeFileSync</span>(<span class="hljs-string">&#x27;./types/remote-types.d.ts&#x27;</span>, types);
</code></pre>
<h2 id="أمان-الأنواع-عند-وقت-التشغيل">أمان الأنواع عند وقت التشغيل</h2>
<h3 id="حراس-الأنواع-للمكونات-البعيدة">حرّاس الأنواع للمكوّنات البعيدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/typeGuards.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> isValidComponent&lt;P = <span class="hljs-built_in">any</span>&gt;(<span class="hljs-attr">component</span>: <span class="hljs-built_in">any</span>): component is <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt; {
  <span class="hljs-keyword">return</span> (
    component &amp;&amp;
    (<span class="hljs-keyword">typeof</span> component === <span class="hljs-string">&#x27;function&#x27;</span> || (<span class="hljs-keyword">typeof</span> component === <span class="hljs-string">&#x27;object&#x27;</span> &amp;&amp; component.<span class="hljs-property">$$typeof</span>))
  );
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> hasRequiredProps&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;&gt;(
  <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>,
  <span class="hljs-attr">required</span>: (keyof T)[],
): props is T {
  <span class="hljs-keyword">if</span> (!props || <span class="hljs-keyword">typeof</span> props !== <span class="hljs-string">&#x27;object&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

  <span class="hljs-keyword">return</span> required.<span class="hljs-title function_">every</span>(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> key <span class="hljs-keyword">in</span> props);
}

<span class="hljs-comment">// Validate remote component props at runtime</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> validateRemoteProps&lt;T&gt;(<span class="hljs-attr">props</span>: <span class="hljs-built_in">unknown</span>, <span class="hljs-attr">validator</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> props is T): T {
  <span class="hljs-keyword">if</span> (!<span class="hljs-title function_">validator</span>(props)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid props passed to remote component&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> props;
}
</code></pre>
<h3 id="محمل-آمن-للمكونات-البعيدة">محمّلٌ آمن للمكوّنات البعيدة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// components/RemoteComponentLoader.tsx</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RemoteComponentLoaderProps</span>&lt;T = <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-attr">module</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>;
  <span class="hljs-attr">errorBoundary</span>?: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;{ <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> }&gt;;
  <span class="hljs-attr">props</span>?: T;
  <span class="hljs-attr">validator</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">component</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onLoad</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ComponentType</span>&lt;T&gt;</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoaderState</span>&lt;T&gt; {
  <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;T&gt; | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">RemoteComponentLoader</span>&lt;T = <span class="hljs-built_in">any</span>&gt;({
  <span class="hljs-variable language_">module</span>,
  <span class="hljs-attr">fallback</span>: <span class="hljs-title class_">Fallback</span>,
  <span class="hljs-attr">errorBoundary</span>: <span class="hljs-title class_">ErrorBoundary</span>,
  props,
  validator,
  onLoad,
  onError
}: <span class="hljs-title class_">RemoteComponentLoaderProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">LoaderState</span>&lt;T&gt;&gt;({
    <span class="hljs-title class_">Component</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> mounted = <span class="hljs-literal">true</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadComponent</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-title function_">setState</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> ({ ...prev, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> }));

        <span class="hljs-comment">// Dynamic import of remote module</span>
        <span class="hljs-keyword">const</span> remoteModule = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackIgnore: true */</span> <span class="hljs-variable language_">module</span>);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span> = remoteModule.<span class="hljs-property">default</span> || remoteModule;

        <span class="hljs-keyword">if</span> (!mounted) <span class="hljs-keyword">return</span>;

        <span class="hljs-comment">// Validate component</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-title function_">isValidComponent</span>(<span class="hljs-title class_">Component</span>)) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Invalid component loaded from <span class="hljs-subst">\${<span class="hljs-variable language_">module</span>}</span>\`</span>);
        }

        <span class="hljs-comment">// Custom validation</span>
        <span class="hljs-keyword">if</span> (validator &amp;&amp; !<span class="hljs-title function_">validator</span>(<span class="hljs-title class_">Component</span>)) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Component validation failed for <span class="hljs-subst">\${<span class="hljs-variable language_">module</span>}</span>\`</span>);
        }

        <span class="hljs-title function_">setState</span>({
          <span class="hljs-title class_">Component</span>,
          <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>
        });

        onLoad?.(<span class="hljs-title class_">Component</span>);

      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-keyword">if</span> (!mounted) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">const</span> err = error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to load component&#x27;</span>);

        <span class="hljs-title function_">setState</span>({
          <span class="hljs-title class_">Component</span>: <span class="hljs-literal">null</span>,
          <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">error</span>: err
        });

        onError?.(err);
      }
    };

    <span class="hljs-title function_">loadComponent</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      mounted = <span class="hljs-literal">false</span>;
    };
  }, [<span class="hljs-variable language_">module</span>, validator, onLoad, onError]);

  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">loading</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Fallback</span> ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Fallback</span> /&gt;</span></span> : <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading component...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">error</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-title class_">ErrorBoundary</span>) {
      <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{state.error}</span> /&gt;</span></span>;
    }
    <span class="hljs-keyword">throw</span> state.<span class="hljs-property">error</span>;
  }

  <span class="hljs-keyword">if</span> (!state.<span class="hljs-property">Component</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span> = state.<span class="hljs-property">Component</span>;
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...</span>(<span class="hljs-attr">props</span> <span class="hljs-attr">as</span> <span class="hljs-attr">T</span>)} /&gt;</span></span>;
}
</code></pre>
<h2 id="خطافات-بعيدة-آمنة-الأنواع">خُطّافاتٌ بعيدةٌ آمنة الأنواع</h2>
<h3 id="محمل-الخطافات-البعيد">محمّل الخُطّافات البعيد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// hooks/useRemoteHook.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RemoteHookResult</span>&lt;T&gt; {
  <span class="hljs-attr">hook</span>: T | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">loading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useRemoteHook&lt;T <span class="hljs-title function_">extends</span> (...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]) =&gt; <span class="hljs-built_in">any</span>&gt;(
  <span class="hljs-attr">module</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">hookName</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">&#x27;default&#x27;</span>
): <span class="hljs-title class_">RemoteHookResult</span>&lt;T&gt; {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">RemoteHookResult</span>&lt;T&gt;&gt;({
    <span class="hljs-attr">hook</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> mounted = <span class="hljs-literal">true</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadHook</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> remoteModule = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackIgnore: true */</span> <span class="hljs-variable language_">module</span>);
        <span class="hljs-keyword">const</span> hook = hookName === <span class="hljs-string">&#x27;default&#x27;</span> ? remoteModule.<span class="hljs-property">default</span> : remoteModule[hookName];

        <span class="hljs-keyword">if</span> (!mounted) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> hook !== <span class="hljs-string">&#x27;function&#x27;</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Hook <span class="hljs-subst">\${hookName}</span> is not a function in <span class="hljs-subst">\${<span class="hljs-variable language_">module</span>}</span>\`</span>);
        }

        <span class="hljs-title function_">setState</span>({
          <span class="hljs-attr">hook</span>: hook <span class="hljs-keyword">as</span> T,
          <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>
        });

      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-keyword">if</span> (!mounted) <span class="hljs-keyword">return</span>;

        <span class="hljs-title function_">setState</span>({
          <span class="hljs-attr">hook</span>: <span class="hljs-literal">null</span>,
          <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to load hook&#x27;</span>)
        });
      }
    };

    <span class="hljs-title function_">loadHook</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      mounted = <span class="hljs-literal">false</span>;
    };
  }, [<span class="hljs-variable language_">module</span>, hookName]);

  <span class="hljs-keyword">return</span> state;
}

<span class="hljs-comment">// Usage example</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserProfileWithRemoteData</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ userId }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">hook</span>: useRemoteUser, <span class="hljs-attr">loading</span>: hookLoading, <span class="hljs-attr">error</span>: hookError } = <span class="hljs-title function_">useRemoteHook</span>(
    <span class="hljs-string">&#x27;remoteApp/hooks/useUser&#x27;</span>
  );

  <span class="hljs-keyword">const</span> userResult = useRemoteUser?.(userId);

  <span class="hljs-keyword">if</span> (hookLoading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading remote hook...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (hookError) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error loading hook: {hookError.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!useRemoteUser) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hook not available<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">const</span> { user, loading, error } = userResult || { <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">loading</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> };

  <span class="hljs-keyword">if</span> (loading) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User not found<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="تعريفات-أنواع-مشتركة">تعريفات أنواع مشتركة</h2>
<h3 id="حزمة-أنواع-مركزية">حزمة أنواع مركزية</h3>
<p>أنشئ حزمة مشتركة للأنواع الشائعة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// packages/shared-types/src/index.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">avatar</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">lastSeen</span>: <span class="hljs-title class_">Date</span>;
  <span class="hljs-attr">preferences</span>: <span class="hljs-title class_">UserPreferences</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserPreferences</span> {
  <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span> | <span class="hljs-string">&#x27;auto&#x27;</span>;
  <span class="hljs-attr">notifications</span>: {
    <span class="hljs-attr">email</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">push</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">sms</span>: <span class="hljs-built_in">boolean</span>;
  };
  <span class="hljs-attr">language</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiResponse</span>&lt;T&gt; {
  <span class="hljs-attr">data</span>: T;
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">ApiError</span>;
  <span class="hljs-attr">meta</span>?: {
    <span class="hljs-attr">page</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">totalPages</span>?: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">total</span>?: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ApiError</span> {
  <span class="hljs-attr">code</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">details</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">UserRole</span> = <span class="hljs-string">&#x27;admin&#x27;</span> | <span class="hljs-string">&#x27;user&#x27;</span> | <span class="hljs-string">&#x27;viewer&#x27;</span> | <span class="hljs-string">&#x27;editor&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentProps</span> {
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-string">&#x27;data-testid&#x27;</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// Event types for cross-app communication</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">AppEvent</span>&lt;T = <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">payload</span>: T;
  <span class="hljs-attr">source</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">UserEvent</span> =
  | <span class="hljs-title class_">AppEvent</span>&lt;{ <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;login&#x27;</span> }&gt;
  | <span class="hljs-title class_">AppEvent</span>&lt;{ <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;logout&#x27;</span> }&gt;
  | <span class="hljs-title class_">AppEvent</span>&lt;{ <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">profile</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;; <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;profile_update&#x27;</span> }&gt;;
</code></pre>
<h3 id="تهيئة-الحزمة">تهيئة الحزمة</h3>
<pre><code class="language-json"><span class="hljs-comment">// packages/shared-types/package.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;@myapp/shared-types&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;1.0.0&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dist/index.js&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;dist/index.d.ts&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --watch&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;devDependencies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;typescript&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;^5.0.0&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<pre><code class="language-json"><span class="hljs-comment">// packages/shared-types/tsconfig.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2020&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;commonjs&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2020&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;declaration&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;outDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;esModuleInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;forceConsistentCasingInFileNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="التواصل-المحرك-بالأحداث">التواصل المحرَّك بالأحداث</h2>
<h3 id="ناقل-أحداث-آمن-الأنواع">ناقل أحداثٍ آمن الأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/eventBus.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserEvent</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@myapp/shared-types&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">EventHandler</span>&lt;T&gt; = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">TypedEventBus</span> {
  <span class="hljs-keyword">private</span> handlers = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Set</span>&lt;<span class="hljs-title class_">EventHandler</span>&lt;<span class="hljs-built_in">any</span>&gt;&gt;&gt;();

  subscribe&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">UserEvent</span>&gt;(<span class="hljs-attr">eventType</span>: T[<span class="hljs-string">&#x27;type&#x27;</span>], <span class="hljs-attr">handler</span>: <span class="hljs-title class_">EventHandler</span>&lt;T&gt;): <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">handlers</span>.<span class="hljs-title function_">has</span>(eventType)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">handlers</span>.<span class="hljs-title function_">set</span>(eventType, <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">handlers</span>.<span class="hljs-title function_">get</span>(eventType)!.<span class="hljs-title function_">add</span>(handler);

    <span class="hljs-comment">// Return unsubscribe function</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">handlers</span>.<span class="hljs-title function_">get</span>(eventType);
      <span class="hljs-keyword">if</span> (handlers) {
        handlers.<span class="hljs-title function_">delete</span>(handler);
        <span class="hljs-keyword">if</span> (handlers.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-property">handlers</span>.<span class="hljs-title function_">delete</span>(eventType);
        }
      }
    };
  }

  emit&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">UserEvent</span>&gt;(<span class="hljs-attr">event</span>: T): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> handlers = <span class="hljs-variable language_">this</span>.<span class="hljs-property">handlers</span>.<span class="hljs-title function_">get</span>(event.<span class="hljs-property">type</span>);
    <span class="hljs-keyword">if</span> (handlers) {
      handlers.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">handler</span>) =&gt;</span> {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-title function_">handler</span>(event);
        } <span class="hljs-keyword">catch</span> (error) {
          <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error in event handler for <span class="hljs-subst">\${event.<span class="hljs-keyword">type</span>}</span>:\`</span>, error);
        }
      });
    }
  }

  <span class="hljs-comment">// Type-safe emit helpers</span>
  <span class="hljs-title function_">emitUserLogin</span>(<span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;login&#x27;</span>,
      <span class="hljs-attr">payload</span>: { userId, <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;login&#x27;</span> },
      <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;host-app&#x27;</span>,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
    });
  }

  <span class="hljs-title function_">emitUserLogout</span>(<span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;logout&#x27;</span>,
      <span class="hljs-attr">payload</span>: { userId, <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;logout&#x27;</span> },
      <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;host-app&#x27;</span>,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
    });
  }

  <span class="hljs-title function_">emitProfileUpdate</span>(<span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">profile</span>: <span class="hljs-title class_">Partial</span>&lt;<span class="hljs-title class_">User</span>&gt;): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">emit</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;profile_update&#x27;</span>,
      <span class="hljs-attr">payload</span>: { userId, profile, <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;profile_update&#x27;</span> },
      <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;host-app&#x27;</span>,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
    });
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> eventBus = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TypedEventBus</span>();
</code></pre>
<h3 id="خطاف-react-للأحداث">خُطّاف React للأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// hooks/useEventBus.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useEventBus</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> subscribe = <span class="hljs-title function_">useCallback</span>(
    &lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">UserEvent</span>&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">eventType</span>: T[<span class="hljs-string">&#x27;type&#x27;</span>], <span class="hljs-attr">handler</span>: <span class="hljs-title class_">EventHandler</span>&lt;T&gt;</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> eventBus.<span class="hljs-title function_">subscribe</span>(eventType, handler);
    },
    [],
  );

  <span class="hljs-keyword">const</span> emit = <span class="hljs-title function_">useCallback</span>(&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">UserEvent</span>&gt;<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: T</span>) =&gt;</span> {
    eventBus.<span class="hljs-title function_">emit</span>(event);
  }, []);

  <span class="hljs-keyword">return</span> { subscribe, emit };
}

<span class="hljs-comment">// Specific event hooks</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useUserEvents</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { subscribe } = <span class="hljs-title function_">useEventBus</span>();

  <span class="hljs-keyword">const</span> onUserLogin = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">handler</span>: (userId: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">subscribe</span>(<span class="hljs-string">&#x27;login&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        <span class="hljs-title function_">handler</span>(event.<span class="hljs-property">payload</span>.<span class="hljs-property">userId</span>);
      });
    },
    [subscribe],
  );

  <span class="hljs-keyword">const</span> onUserLogout = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">handler</span>: (userId: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">subscribe</span>(<span class="hljs-string">&#x27;logout&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        <span class="hljs-title function_">handler</span>(event.<span class="hljs-property">payload</span>.<span class="hljs-property">userId</span>);
      });
    },
    [subscribe],
  );

  <span class="hljs-keyword">const</span> onProfileUpdate = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">handler</span>: (userId: <span class="hljs-built_in">string</span>, profile: Partial&lt;User&gt;) =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">subscribe</span>(<span class="hljs-string">&#x27;profile_update&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        <span class="hljs-title function_">handler</span>(event.<span class="hljs-property">payload</span>.<span class="hljs-property">userId</span>, event.<span class="hljs-property">payload</span>.<span class="hljs-property">profile</span>);
      });
    },
    [subscribe],
  );

  <span class="hljs-keyword">return</span> { onUserLogin, onUserLogout, onProfileUpdate };
}
</code></pre>
<h2 id="التطوير-والاختبار">التطوير والاختبار</h2>
<h3 id="مكونات-بعيدة-محاكاة-للتطوير">مكوّنات بعيدة مُحاكاةً للتطوير</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// __mocks__/remoteComponents.tsx</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ComponentProps</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@myapp/shared-types&#x27;</span>;

<span class="hljs-comment">// Mock Button component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">MockButton</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">variant</span>?: <span class="hljs-string">&#x27;primary&#x27;</span> | <span class="hljs-string">&#x27;secondary&#x27;</span> | <span class="hljs-string">&#x27;danger&#x27;</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
} &amp; <span class="hljs-title class_">ComponentProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ children, onClick, variant = <span class="hljs-string">&#x27;primary&#x27;</span>, disabled, ...props }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">mock-button</span> <span class="hljs-attr">mock-button--</span>\${<span class="hljs-attr">variant</span>} \${<span class="hljs-attr">props.className</span> || &#x27;&#x27;}\`}
      <span class="hljs-attr">data-testid</span>=<span class="hljs-string">{props[</span>&#x27;<span class="hljs-attr">data-testid</span>&#x27;]}
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">8px</span> <span class="hljs-attr">16px</span>&#x27;,
        <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
        <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">4px</span>&#x27;,
        <span class="hljs-attr">backgroundColor:</span> <span class="hljs-attr">variant</span> === <span class="hljs-string">&#x27;primary&#x27;</span> ? &#x27;#<span class="hljs-attr">007bff</span>&#x27; <span class="hljs-attr">:</span> <span class="hljs-attr">variant</span> === <span class="hljs-string">&#x27;danger&#x27;</span> ? &#x27;#<span class="hljs-attr">dc3545</span>&#x27; <span class="hljs-attr">:</span> &#x27;#<span class="hljs-attr">6c757d</span>&#x27;,
        <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">white</span>&#x27;,
        <span class="hljs-attr">cursor:</span> <span class="hljs-attr">disabled</span> ? &#x27;<span class="hljs-attr">not-allowed</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">pointer</span>&#x27;,
        <span class="hljs-attr">opacity:</span> <span class="hljs-attr">disabled</span> ? <span class="hljs-attr">0.6</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>
      }}
    &gt;</span>
      {children} (Mock)
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// Mock UserCard component</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">MockUserCard</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onEdit</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onDelete</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">compact</span>?: <span class="hljs-built_in">boolean</span>;
} &amp; <span class="hljs-title class_">ComponentProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ userId, onEdit, onDelete, compact, ...props }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> mockUser = {
    <span class="hljs-attr">id</span>: userId,
    <span class="hljs-attr">name</span>: <span class="hljs-string">\`Mock User <span class="hljs-subst">\${userId}</span>\`</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">\`user<span class="hljs-subst">\${userId}</span>@example.com\`</span>,
    <span class="hljs-attr">avatar</span>: <span class="hljs-string">\`https://via.placeholder.com/40/007bff/ffffff?text=<span class="hljs-subst">\${userId}</span>\`</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">mock-user-card</span> \${<span class="hljs-attr">compact</span> ? &#x27;<span class="hljs-attr">compact</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;} \${<span class="hljs-attr">props.className</span> || &#x27;&#x27;}\`}
      <span class="hljs-attr">data-testid</span>=<span class="hljs-string">{props[</span>&#x27;<span class="hljs-attr">data-testid</span>&#x27;]}
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ddd</span>&#x27;,
        <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">8px</span>&#x27;,
        <span class="hljs-attr">padding:</span> <span class="hljs-attr">compact</span> ? &#x27;<span class="hljs-attr">8px</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">16px</span>&#x27;,
        <span class="hljs-attr">display:</span> &#x27;<span class="hljs-attr">flex</span>&#x27;,
        <span class="hljs-attr">alignItems:</span> &#x27;<span class="hljs-attr">center</span>&#x27;,
        <span class="hljs-attr">gap:</span> &#x27;<span class="hljs-attr">12px</span>&#x27;
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">{mockUser.avatar}</span>
        <span class="hljs-attr">alt</span>=<span class="hljs-string">{mockUser.name}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">compact</span> ? &#x27;<span class="hljs-attr">32px</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">48px</span>&#x27;, <span class="hljs-attr">height:</span> <span class="hljs-attr">compact</span> ? &#x27;<span class="hljs-attr">32px</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">48px</span>&#x27;, <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">50</span>%&#x27; }}
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">margin:</span> <span class="hljs-attr">0</span> }}&gt;</span>{mockUser.name} (Mock)<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">margin:</span> <span class="hljs-attr">0</span>, <span class="hljs-attr">fontSize:</span> &#x27;<span class="hljs-attr">14px</span>&#x27;, <span class="hljs-attr">color:</span> &#x27;#<span class="hljs-attr">666</span>&#x27; }}&gt;</span>{mockUser.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginLeft:</span> &#x27;<span class="hljs-attr">auto</span>&#x27; }}&gt;</span>
        {onEdit &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onEdit(mockUser)} style={{ marginRight: &#x27;8px&#x27; }}&gt;
            Edit
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        )}
        {onDelete &amp;&amp; (
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onDelete(userId)}&gt;Delete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// Development mode detection</span>
<span class="hljs-keyword">const</span> isDevelopment = process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>;

<span class="hljs-comment">// Mock module factory</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">createMockModule</span>(<span class="hljs-params"><span class="hljs-attr">moduleName</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">switch</span> (moduleName) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;remoteApp/Button&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">default</span>: <span class="hljs-title class_">MockButton</span> };
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;remoteApp/UserCard&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">default</span>: <span class="hljs-title class_">MockUserCard</span> };
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`No mock available for <span class="hljs-subst">\${moduleName}</span>\`</span>);
  }
}
</code></pre>
<h3 id="اختبار-المكونات-الاتحادية">اختبار المكوّنات الاتحادية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// __tests__/RemoteComponentLoader.test.tsx</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { render, screen, waitFor } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RemoteComponentLoader</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../components/RemoteComponentLoader&#x27;</span>;
<span class="hljs-keyword">import</span> { createMockModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../__mocks__/remoteComponents&#x27;</span>;

<span class="hljs-comment">// Mock dynamic imports</span>
jest.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;../../utils/dynamicImport&#x27;</span>, <span class="hljs-function">() =&gt;</span> ({
  <span class="hljs-attr">importRemoteModule</span>: jest.<span class="hljs-title function_">fn</span>()
}));

<span class="hljs-keyword">import</span> { importRemoteModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../utils/dynamicImport&#x27;</span>;
<span class="hljs-keyword">const</span> mockImportRemoteModule = importRemoteModule <span class="hljs-keyword">as</span> jest.<span class="hljs-property">MockedFunction</span>&lt;<span class="hljs-keyword">typeof</span> importRemoteModule&gt;;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;RemoteComponentLoader&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
    jest.<span class="hljs-title function_">clearAllMocks</span>();
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should load and render remote component&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> mockComponent = <span class="hljs-title function_">createMockModule</span>(<span class="hljs-string">&#x27;remoteApp/Button&#x27;</span>);
    mockImportRemoteModule.<span class="hljs-title function_">mockResolvedValue</span>(mockComponent);

    <span class="hljs-title function_">render</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RemoteComponentLoader</span>
        <span class="hljs-attr">module</span>=<span class="hljs-string">&quot;remoteApp/Button&quot;</span>
        <span class="hljs-attr">props</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">children:</span> &#x27;<span class="hljs-attr">Click</span> <span class="hljs-attr">me</span>&#x27;, <span class="hljs-attr">variant:</span> &#x27;<span class="hljs-attr">primary</span>&#x27; }}
      /&gt;</span></span>
    );

    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Loading component...&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Click me (Mock)&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });

    <span class="hljs-title function_">expect</span>(mockImportRemoteModule).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;remoteApp/Button&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should show error when component fails to load&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    mockImportRemoteModule.<span class="hljs-title function_">mockRejectedValue</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Network error&#x27;</span>));

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">ErrorBoundary</span> = (<span class="hljs-params">{ error }: { error: <span class="hljs-built_in">Error</span> }</span>) =&gt; (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );

    <span class="hljs-title function_">render</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RemoteComponentLoader</span>
        <span class="hljs-attr">module</span>=<span class="hljs-string">&quot;remoteApp/Button&quot;</span>
        <span class="hljs-attr">errorBoundary</span>=<span class="hljs-string">{ErrorBoundary}</span>
      /&gt;</span></span>
    );

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Error: Network error&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should validate component before rendering&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> invalidComponent = { <span class="hljs-attr">notAComponent</span>: <span class="hljs-literal">true</span> };
    mockImportRemoteModule.<span class="hljs-title function_">mockResolvedValue</span>(invalidComponent);

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">validator</span> = (<span class="hljs-params"><span class="hljs-attr">component</span>: <span class="hljs-built_in">any</span></span>) =&gt; <span class="hljs-keyword">typeof</span> component.<span class="hljs-property">default</span> === <span class="hljs-string">&#x27;function&#x27;</span>;

    <span class="hljs-title function_">render</span>(
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RemoteComponentLoader</span>
        <span class="hljs-attr">module</span>=<span class="hljs-string">&quot;remoteApp/Button&quot;</span>
        <span class="hljs-attr">validator</span>=<span class="hljs-string">{validator}</span>
      /&gt;</span></span>
    );

    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-regexp">/Component validation failed/</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });
  });
});

<span class="hljs-comment">// Test federated app integration</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Federated App Integration&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should handle cross-app events&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> eventHandler = jest.<span class="hljs-title function_">fn</span>();

    <span class="hljs-comment">// Simulate event from remote app</span>
    eventBus.<span class="hljs-title function_">emit</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;login&#x27;</span>,
      <span class="hljs-attr">payload</span>: { <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;login&#x27;</span> },
      <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;remote-app&#x27;</span>,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()
    });

    <span class="hljs-title function_">expect</span>(eventHandler).<span class="hljs-property">not</span>.<span class="hljs-title function_">toHaveBeenCalled</span>();

    <span class="hljs-keyword">const</span> unsubscribe = eventBus.<span class="hljs-title function_">subscribe</span>(<span class="hljs-string">&#x27;login&#x27;</span>, eventHandler);

    eventBus.<span class="hljs-title function_">emit</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;login&#x27;</span>,
      <span class="hljs-attr">payload</span>: { <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;456&#x27;</span>, <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;login&#x27;</span> },
      <span class="hljs-attr">source</span>: <span class="hljs-string">&#x27;remote-app&#x27;</span>,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()
    });

    <span class="hljs-title function_">expect</span>(eventHandler).<span class="hljs-title function_">toHaveBeenCalledWith</span>(
      expect.<span class="hljs-title function_">objectContaining</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;login&#x27;</span>,
        <span class="hljs-attr">payload</span>: { <span class="hljs-attr">userId</span>: <span class="hljs-string">&#x27;456&#x27;</span>, <span class="hljs-attr">action</span>: <span class="hljs-string">&#x27;login&#x27;</span> }
      })
    );

    <span class="hljs-title function_">unsubscribe</span>();
  });
});
</code></pre>
<h2 id="اعتبارات-الإنتاج">اعتبارات الإنتاج</h2>
<h3 id="تهيئة-خاصة-بكل-بيئة">تهيئة خاصة بكل بيئة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// config/federation.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FederationConfig</span> {
  <span class="hljs-attr">remotes</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;
  <span class="hljs-attr">shared</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
  <span class="hljs-attr">fallbackUrls</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-attr">configs</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">FederationConfig</span>&gt; = {
  <span class="hljs-attr">development</span>: {
    <span class="hljs-attr">remotes</span>: {
      <span class="hljs-attr">remoteApp</span>: <span class="hljs-string">&#x27;http://localhost:3001/remoteEntry.js&#x27;</span>,
      <span class="hljs-attr">remoteLibrary</span>: <span class="hljs-string">&#x27;http://localhost:3002/remoteEntry.js&#x27;</span>,
    },
    <span class="hljs-attr">shared</span>: {
      <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
      <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">true</span> },
    },
  },

  <span class="hljs-attr">staging</span>: {
    <span class="hljs-attr">remotes</span>: {
      <span class="hljs-attr">remoteApp</span>: <span class="hljs-string">&#x27;https://staging-remote.myapp.com/remoteEntry.js&#x27;</span>,
      <span class="hljs-attr">remoteLibrary</span>: <span class="hljs-string">&#x27;https://staging-library.myapp.com/remoteEntry.js&#x27;</span>,
    },
    <span class="hljs-attr">shared</span>: {
      <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">false</span> },
      <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">false</span> },
    },
    <span class="hljs-attr">fallbackUrls</span>: {
      <span class="hljs-attr">remoteApp</span>: [
        <span class="hljs-string">&#x27;https://staging-remote-fallback.myapp.com/remoteEntry.js&#x27;</span>,
        <span class="hljs-string">&#x27;https://staging-remote-backup.myapp.com/remoteEntry.js&#x27;</span>,
      ],
    },
  },

  <span class="hljs-attr">production</span>: {
    <span class="hljs-attr">remotes</span>: {
      <span class="hljs-attr">remoteApp</span>: <span class="hljs-string">&#x27;https://remote.myapp.com/remoteEntry.js&#x27;</span>,
      <span class="hljs-attr">remoteLibrary</span>: <span class="hljs-string">&#x27;https://library.myapp.com/remoteEntry.js&#x27;</span>,
    },
    <span class="hljs-attr">shared</span>: {
      <span class="hljs-attr">react</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span> },
      <span class="hljs-string">&#x27;react-dom&#x27;</span>: { <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">eager</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span> },
    },
    <span class="hljs-attr">fallbackUrls</span>: {
      <span class="hljs-attr">remoteApp</span>: [
        <span class="hljs-string">&#x27;https://cdn-fallback.myapp.com/remote/remoteEntry.js&#x27;</span>,
        <span class="hljs-string">&#x27;https://backup.myapp.com/remote/remoteEntry.js&#x27;</span>,
      ],
    },
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getFederationConfig = (): <span class="hljs-function"><span class="hljs-params">FederationConfig</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> env = process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> || <span class="hljs-string">&#x27;development&#x27;</span>;
  <span class="hljs-keyword">return</span> configs[env] || configs.<span class="hljs-property">development</span>;
};
</code></pre>
<h3 id="استرداد-الأخطاء-والبدائل-الاحتياطية">استرداد الأخطاء والبدائل الاحتياطية</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/resilientLoader.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoadOptions</span> {
  <span class="hljs-attr">maxRetries</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">retryDelay</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">fallbackUrls</span>?: <span class="hljs-built_in">string</span>[];
  <span class="hljs-attr">timeout</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">ResilientRemoteLoader</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadRemoteModule</span>(<span class="hljs-attr">primaryUrl</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>: <span class="hljs-title class_">LoadOptions</span> = {}): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt; {
    <span class="hljs-keyword">const</span> { maxRetries = <span class="hljs-number">3</span>, retryDelay = <span class="hljs-number">1000</span>, fallbackUrls = [], timeout = <span class="hljs-number">10000</span> } = options;

    <span class="hljs-keyword">const</span> allUrls = [primaryUrl, ...fallbackUrls];
    <span class="hljs-keyword">let</span> <span class="hljs-attr">lastError</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> url <span class="hljs-keyword">of</span> allUrls) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attempt = <span class="hljs-number">0</span>; attempt &lt; maxRetries; attempt++) {
        <span class="hljs-keyword">try</span> {
          <span class="hljs-keyword">const</span> <span class="hljs-variable language_">module</span> = <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">loadWithTimeout</span>(url, timeout);
          <span class="hljs-keyword">return</span> <span class="hljs-variable language_">module</span>;
        } <span class="hljs-keyword">catch</span> (error) {
          lastError = error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error : <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Unknown error&#x27;</span>);

          <span class="hljs-comment">// Wait before retry</span>
          <span class="hljs-keyword">if</span> (attempt &lt; maxRetries - <span class="hljs-number">1</span>) {
            <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, retryDelay));
          }
        }
      }
    }

    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to load remote module from all URLs: <span class="hljs-subst">\${lastError?.message}</span>\`</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">loadWithTimeout</span>(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">timeout</span>: <span class="hljs-built_in">number</span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> script = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;script&#x27;</span>);
      script.<span class="hljs-property">src</span> = url;
      script.<span class="hljs-property">async</span> = <span class="hljs-literal">true</span>;

      <span class="hljs-keyword">const</span> timeoutId = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">removeChild</span>(script);
        <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Timeout loading <span class="hljs-subst">\${url}</span>\`</span>));
      }, timeout);

      script.<span class="hljs-property">onload</span> = <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-built_in">clearTimeout</span>(timeoutId);
        <span class="hljs-title function_">resolve</span>(<span class="hljs-variable language_">window</span>[url.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;/&#x27;</span>).<span class="hljs-title function_">pop</span>()?.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;.&#x27;</span>)[<span class="hljs-number">0</span>] || <span class="hljs-string">&#x27;unknown&#x27;</span>]);
      };

      script.<span class="hljs-property">onerror</span> = <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-built_in">clearTimeout</span>(timeoutId);
        <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">removeChild</span>(script);
        <span class="hljs-title function_">reject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to load <span class="hljs-subst">\${url}</span>\`</span>));
      };

      <span class="hljs-variable language_">document</span>.<span class="hljs-property">head</span>.<span class="hljs-title function_">appendChild</span>(script);
    });
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> resilientLoader = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ResilientRemoteLoader</span>();
</code></pre>
<h3 id="المراقبة-والتحليلات">المراقبة والتحليلات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// utils/federationMonitoring.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">LoadMetrics</span> {
  <span class="hljs-attr">module</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">loadTime</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">attempt</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">fallback</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">FederationMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">LoadMetrics</span>[] = [];

  <span class="hljs-title function_">recordLoad</span>(<span class="hljs-attr">metrics</span>: <span class="hljs-title class_">LoadMetrics</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">push</span>(metrics);

    <span class="hljs-comment">// Send to analytics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendToAnalytics</span>(metrics);

    <span class="hljs-comment">// Trim old metrics</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1000</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">slice</span>(-<span class="hljs-number">1000</span>);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">sendToAnalytics</span>(<span class="hljs-attr">metrics</span>: <span class="hljs-title class_">LoadMetrics</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span> &amp;&amp; <span class="hljs-variable language_">window</span>.<span class="hljs-property">gtag</span>) {
      <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gtag</span>(<span class="hljs-string">&#x27;event&#x27;</span>, <span class="hljs-string">&#x27;remote_module_load&#x27;</span>, {
        <span class="hljs-attr">event_category</span>: <span class="hljs-string">&#x27;module_federation&#x27;</span>,
        <span class="hljs-attr">event_label</span>: metrics.<span class="hljs-property">module</span>,
        <span class="hljs-attr">value</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(metrics.<span class="hljs-property">loadTime</span>),
        <span class="hljs-attr">custom_map</span>: {
          <span class="hljs-attr">success</span>: metrics.<span class="hljs-property">success</span>,
          <span class="hljs-attr">attempt</span>: metrics.<span class="hljs-property">attempt</span>,
          <span class="hljs-attr">fallback</span>: metrics.<span class="hljs-property">fallback</span>,
          <span class="hljs-attr">error</span>: metrics.<span class="hljs-property">error</span>,
        },
      });
    }
  }

  <span class="hljs-title function_">getStats</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> total = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> successful = <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">success</span>).<span class="hljs-property">length</span>;
    <span class="hljs-keyword">const</span> avgLoadTime =
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">success</span>).<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, m</span>) =&gt;</span> sum + m.<span class="hljs-property">loadTime</span>, <span class="hljs-number">0</span>) / successful;

    <span class="hljs-keyword">return</span> {
      total,
      successful,
      <span class="hljs-attr">failureRate</span>: ((total - successful) / total) * <span class="hljs-number">100</span>,
      <span class="hljs-attr">avgLoadTime</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(avgLoadTime),
    };
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> federationMonitor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FederationMonitor</span>();
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="أمان-الأنواع-أولا">أمان الأنواع أولًا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Always define types for remote modules</span>
<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;remoteApp/Component&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
    <span class="hljs-comment">/* ... */</span>
  }
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">Props</span>&gt;;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">Component</span>;
}

<span class="hljs-comment">// ✅ Use type guards for runtime safety</span>
<span class="hljs-keyword">if</span> (!<span class="hljs-title function_">isValidComponent</span>(<span class="hljs-title class_">RemoteComponent</span>)) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid remote component&#x27;</span>);
}

<span class="hljs-comment">// ✅ Validate props before passing to remote components</span>
<span class="hljs-keyword">const</span> validatedProps = <span class="hljs-title function_">validateRemoteProps</span>(props, isValidProps);
</code></pre>
<h3 id="حدود-أخطاء-في-كل-مكان">حدود أخطاء في كل مكان</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Wrap remote components in error boundaries</span>
&lt;<span class="hljs-title class_">ErrorBoundary</span> fallback={<span class="hljs-title class_">LocalFallback</span>}&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">RemoteComponent</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>
&lt;/<span class="hljs-title class_">ErrorBoundary</span>&gt;

<span class="hljs-comment">// ✅ Provide meaningful fallbacks</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">FallbackComponent</span> = (<span class="hljs-params"></span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;remote-fallback&quot;</span>&gt;</span>
    This feature is temporarily unavailable
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);
</code></pre>
<h3 id="تحسين-الأداء">تحسين الأداء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Lazy load remote components</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">RemoteComponent</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">lazy</span>(<span class="hljs-function">() =&gt;</span>
  <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;remoteApp/Component&#x27;</span>).<span class="hljs-title function_">catch</span>(<span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">default</span>: <span class="hljs-title class_">FallbackComponent</span>
  }))
);

<span class="hljs-comment">// ✅ Preload critical remote modules</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;remoteApp/CriticalComponent&#x27;</span>);
}, []);

<span class="hljs-comment">// ✅ Use Suspense for loading states</span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Loading</span> /&gt;</span>}&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">RemoteComponent</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
</code></pre>
<h3 id="إدارة-الإصدارات">إدارة الإصدارات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Use semantic versioning in shared dependencies</span>
<span class="hljs-attr">shared</span>: {
  <span class="hljs-attr">react</span>: {
    <span class="hljs-attr">singleton</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">requiredVersion</span>: <span class="hljs-string">&#x27;^18.0.0&#x27;</span>,
    <span class="hljs-attr">strictVersion</span>: <span class="hljs-literal">true</span>
  }
}

<span class="hljs-comment">// ✅ Handle version mismatches gracefully</span>
<span class="hljs-keyword">if</span> (remoteVersion !== hostVersion) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`Version mismatch: host(<span class="hljs-subst">\${hostVersion}</span>) vs remote(<span class="hljs-subst">\${remoteVersion}</span>)\`</span>);
}
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>يتيح اتحاد الوحدات مع TypeScript:</p>
<ol>
<li><strong>نشرًا مستقلًا</strong> للواجهات المصغّرة</li>
<li><strong>مشاركةً عند وقت التشغيل</strong> للاعتمادات والمكوّنات</li>
<li><strong>أمانًا نوعيًا</strong> عبر حدود التطبيقات</li>
<li><strong>بدائلٍ احتياطية رشيقة</strong> حين تفشل الوحدات البعيدة</li>
<li><strong>تواصلًا محرَّكًا بالأحداث</strong> بين التطبيقات الاتحادية</li>
</ol>
<p>إن رأيت في كل هذا وجعًا، فأنا وأنت من التقين.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
