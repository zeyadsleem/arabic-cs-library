const s="kinney",a="full-stack-typescript",n="TypeScript للويب الكامل",p="open-api-swagger-express",l="عقود OpenAPI/Swagger",t=[{depth:2,id:"تعريف-api-باستخدام-openapi",text:"تعريف API باستخدام OpenAPI"},{depth:3,id:"مثال-على-مواصفة-openapi-openapiyaml",text:"مثال على مواصفة OpenAPI (openapi.yaml):"},{depth:2,id:"توليد-أنواع-typescript",text:"توليد أنواع TypeScript"},{depth:3,id:"توليد-الأنواع",text:"توليد الأنواع"},{depth:3,id:"مثال-على-الأنواع-المولدة-apidts",text:"مثال على الأنواع المولَّدة (api.d.ts)"},{depth:2,id:"استخدام-الأنواع-المولدة-في-express",text:"استخدام الأنواع المولَّدة في Express"},{depth:2,id:"الفوائد",text:"الفوائد"},{depth:2,id:"تحسينات-سير-العمل",text:"تحسينات سير العمل"}],r=`<p>يوفر OpenAPI (المعروف سابقًا بـ Swagger) طريقة قوية لتعريف عقود API وتوثيقها. ويضمن دمجه مع TypeScript سلامة الأنواع والاتساق في تطبيقك. ويرشدك هذا الدليل عبر تعريف API باستخدام OpenAPI، وتوليد أنواع TypeScript، واستخدامها داخل تطبيق Express لديك.</p>
<h2 id="تعريف-api-باستخدام-openapi">تعريف API باستخدام OpenAPI</h2>
<p>يستخدم OpenAPI صيغة YAML أو JSON لوصف نقاط نهاية API وأجسام الطلبات والاستجابات وتفاصيل أخرى.</p>
<h3 id="مثال-على-مواصفة-openapi-openapiyaml">مثال على مواصفة OpenAPI (openapi.yaml):</h3>
<pre><code class="language-yaml"><span class="hljs-attr">openapi:</span> <span class="hljs-number">3.0</span><span class="hljs-number">.0</span>
<span class="hljs-attr">info:</span>
  <span class="hljs-attr">title:</span> <span class="hljs-string">User</span> <span class="hljs-string">API</span>
  <span class="hljs-attr">version:</span> <span class="hljs-number">1.0</span><span class="hljs-number">.0</span>
<span class="hljs-attr">paths:</span>
  <span class="hljs-string">/users:</span>
    <span class="hljs-attr">get:</span>
      <span class="hljs-attr">summary:</span> <span class="hljs-string">Get</span> <span class="hljs-string">a</span> <span class="hljs-string">list</span> <span class="hljs-string">of</span> <span class="hljs-string">users</span>
      <span class="hljs-attr">parameters:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">query</span>
          <span class="hljs-attr">in:</span> <span class="hljs-string">query</span>
          <span class="hljs-attr">description:</span> <span class="hljs-string">Search</span> <span class="hljs-string">query</span>
          <span class="hljs-attr">schema:</span>
            <span class="hljs-attr">type:</span> <span class="hljs-string">string</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">page</span>
          <span class="hljs-attr">in:</span> <span class="hljs-string">query</span>
          <span class="hljs-attr">description:</span> <span class="hljs-string">Page</span> <span class="hljs-string">number</span>
          <span class="hljs-attr">schema:</span>
            <span class="hljs-attr">type:</span> <span class="hljs-string">integer</span>
      <span class="hljs-attr">responses:</span>
        <span class="hljs-attr">&#x27;200&#x27;:</span>
          <span class="hljs-attr">description:</span> <span class="hljs-string">Successful</span> <span class="hljs-string">response</span>
          <span class="hljs-attr">content:</span>
            <span class="hljs-attr">application/json:</span>
              <span class="hljs-attr">schema:</span>
                <span class="hljs-attr">type:</span> <span class="hljs-string">array</span>
                <span class="hljs-attr">items:</span>
                  <span class="hljs-string">$ref:</span> <span class="hljs-string">&#x27;#/components/schemas/User&#x27;</span>
    <span class="hljs-attr">post:</span>
      <span class="hljs-attr">summary:</span> <span class="hljs-string">Create</span> <span class="hljs-string">a</span> <span class="hljs-string">new</span> <span class="hljs-string">user</span>
      <span class="hljs-attr">requestBody:</span>
        <span class="hljs-attr">required:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">content:</span>
          <span class="hljs-attr">application/json:</span>
            <span class="hljs-attr">schema:</span>
              <span class="hljs-string">$ref:</span> <span class="hljs-string">&#x27;#/components/schemas/CreateUserRequest&#x27;</span>
      <span class="hljs-attr">responses:</span>
        <span class="hljs-attr">&#x27;201&#x27;:</span>
          <span class="hljs-attr">description:</span> <span class="hljs-string">User</span> <span class="hljs-string">created</span>
          <span class="hljs-attr">content:</span>
            <span class="hljs-attr">application/json:</span>
              <span class="hljs-attr">schema:</span>
                <span class="hljs-string">$ref:</span> <span class="hljs-string">&#x27;#/components/schemas/User&#x27;</span>
  <span class="hljs-string">/users/{userId}:</span>
    <span class="hljs-attr">get:</span>
      <span class="hljs-attr">summary:</span> <span class="hljs-string">Get</span> <span class="hljs-string">a</span> <span class="hljs-string">user</span> <span class="hljs-string">by</span> <span class="hljs-string">ID</span>
      <span class="hljs-attr">parameters:</span>
        <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">userId</span>
          <span class="hljs-attr">in:</span> <span class="hljs-string">path</span>
          <span class="hljs-attr">required:</span> <span class="hljs-literal">true</span>
          <span class="hljs-attr">schema:</span>
            <span class="hljs-attr">type:</span> <span class="hljs-string">string</span>
      <span class="hljs-attr">responses:</span>
        <span class="hljs-attr">&#x27;200&#x27;:</span>
          <span class="hljs-attr">description:</span> <span class="hljs-string">Successful</span> <span class="hljs-string">response</span>
          <span class="hljs-attr">content:</span>
            <span class="hljs-attr">application/json:</span>
              <span class="hljs-attr">schema:</span>
                <span class="hljs-string">$ref:</span> <span class="hljs-string">&#x27;#/components/schemas/User&#x27;</span>
<span class="hljs-attr">components:</span>
  <span class="hljs-attr">schemas:</span>
    <span class="hljs-attr">User:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">object</span>
      <span class="hljs-attr">properties:</span>
        <span class="hljs-attr">id:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">string</span>
        <span class="hljs-attr">username:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">string</span>
        <span class="hljs-attr">email:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">string</span>
    <span class="hljs-attr">CreateUserRequest:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">object</span>
      <span class="hljs-attr">properties:</span>
        <span class="hljs-attr">username:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">string</span>
        <span class="hljs-attr">email:</span>
          <span class="hljs-attr">type:</span> <span class="hljs-string">string</span>
</code></pre>
<p>يعرّف ملف YAML هذا نقاط نهاية لاسترجاع المستخدمين وإنشائهم، مع مخططات طلباتها واستجاباتها.</p>
<h2 id="توليد-أنواع-typescript">توليد أنواع TypeScript</h2>
<p>تولّد أداة <a href="https://www.npmjs.com/package/openapi-typescript"><code>openapi-typescript</code></a> أنواع TypeScript انطلاقًا من مواصفة OpenAPI لديك.</p>
<pre><code class="language-bash">npm install -D openapi-typescript
</code></pre>
<h3 id="توليد-الأنواع">توليد الأنواع</h3>
<pre><code class="language-bash">npx openapi-typescript openapi.yaml -o src/types/api.d.ts
</code></pre>
<p>يولّد هذا الأمر ملف <code>src/types/api.d.ts</code> الذي يحتوي أنواع TypeScript المقابلة لمخططات OpenAPI لديك.</p>
<h3 id="مثال-على-الأنواع-المولدة-apidts">مثال على الأنواع المولَّدة (<code>api.d.ts</code>)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">username</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">CreateUserRequest</span> {
  <span class="hljs-attr">username</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> paths {
  <span class="hljs-string">&#x27;/users&#x27;</span>: {
    <span class="hljs-attr">get</span>: {
      <span class="hljs-attr">parameters</span>: {
        <span class="hljs-attr">query</span>?: {
          <span class="hljs-attr">query</span>?: <span class="hljs-built_in">string</span>;
          <span class="hljs-attr">page</span>?: <span class="hljs-built_in">number</span>;
        };
      };
      <span class="hljs-attr">responses</span>: {
        <span class="hljs-string">&#x27;200&#x27;</span>: {
          <span class="hljs-attr">content</span>: {
            <span class="hljs-string">&#x27;application/json&#x27;</span>: components[<span class="hljs-string">&#x27;schemas&#x27;</span>][<span class="hljs-string">&#x27;User&#x27;</span>][];
          };
        };
      };
    };
    <span class="hljs-attr">post</span>: {
      <span class="hljs-attr">requestBody</span>: {
        <span class="hljs-attr">content</span>: {
          <span class="hljs-string">&#x27;application/json&#x27;</span>: components[<span class="hljs-string">&#x27;schemas&#x27;</span>][<span class="hljs-string">&#x27;CreateUserRequest&#x27;</span>];
        };
      };
      <span class="hljs-attr">responses</span>: {
        <span class="hljs-string">&#x27;201&#x27;</span>: {
          <span class="hljs-attr">content</span>: {
            <span class="hljs-string">&#x27;application/json&#x27;</span>: components[<span class="hljs-string">&#x27;schemas&#x27;</span>][<span class="hljs-string">&#x27;User&#x27;</span>];
          };
        };
      };
    };
  };
  <span class="hljs-string">&#x27;/users/{userId}&#x27;</span>: {
    <span class="hljs-attr">get</span>: {
      <span class="hljs-attr">parameters</span>: {
        <span class="hljs-attr">path</span>: {
          <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
        };
      };
      <span class="hljs-attr">responses</span>: {
        <span class="hljs-string">&#x27;200&#x27;</span>: {
          <span class="hljs-attr">content</span>: {
            <span class="hljs-string">&#x27;application/json&#x27;</span>: components[<span class="hljs-string">&#x27;schemas&#x27;</span>][<span class="hljs-string">&#x27;User&#x27;</span>];
          };
        };
      };
    };
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> components {
  <span class="hljs-attr">schemas</span>: {
    <span class="hljs-title class_">User</span>: {
      <span class="hljs-attr">id</span>?: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">username</span>?: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span>;
    };
    <span class="hljs-title class_">CreateUserRequest</span>: {
      <span class="hljs-attr">username</span>?: <span class="hljs-built_in">string</span>;
      <span class="hljs-attr">email</span>?: <span class="hljs-built_in">string</span>;
    };
  };
}
</code></pre>
<h2 id="استخدام-الأنواع-المولدة-في-express">استخدام الأنواع المولَّدة في Express</h2>
<p>استورد الأنواع المولَّدة إلى معالجات مسارات Express لديك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> express, { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> { paths } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./types/api&#x27;</span>;

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();
app.<span class="hljs-title function_">use</span>(express.<span class="hljs-title function_">json</span>());

<span class="hljs-comment">// Example route handler</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;
      {},
      paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;200&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>],
      {},
      paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;parameters&#x27;</span>][<span class="hljs-string">&#x27;query&#x27;</span>]
    &gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;200&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>]&gt;,
  </span>) =&gt;</span> {
    <span class="hljs-comment">// Access typed query parameters</span>
    <span class="hljs-keyword">const</span> query = req.<span class="hljs-property">query</span>.<span class="hljs-property">query</span>;
    <span class="hljs-keyword">const</span> page = req.<span class="hljs-property">query</span>.<span class="hljs-property">page</span>;
    <span class="hljs-comment">// ... your logic</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">users</span>: paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;200&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>] = [
      { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;john&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span> },
    ];
    res.<span class="hljs-title function_">json</span>(users);
  },
);

app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/users&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;
      {},
      paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;post&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;201&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>],
      paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;post&#x27;</span>][<span class="hljs-string">&#x27;requestBody&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>]
    &gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;post&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;201&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>]&gt;,
  </span>) =&gt;</span> {
    <span class="hljs-comment">// Access typed request body</span>
    <span class="hljs-keyword">const</span> { username, email } = req.<span class="hljs-property">body</span>;
    <span class="hljs-comment">// ... your logic</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: paths[<span class="hljs-string">&#x27;/users&#x27;</span>][<span class="hljs-string">&#x27;post&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;201&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>] = {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>,
      <span class="hljs-attr">username</span>: username,
      <span class="hljs-attr">email</span>: email,
    };
    res.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>).<span class="hljs-title function_">json</span>(user);
  },
);

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/users/:userId&#x27;</span>,
  <span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>&lt;
      paths[<span class="hljs-string">&#x27;/users/{userId}&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;parameters&#x27;</span>][<span class="hljs-string">&#x27;path&#x27;</span>],
      paths[<span class="hljs-string">&#x27;/users/{userId}&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;200&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>]
    &gt;,
    <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span>&lt;
      paths[<span class="hljs-string">&#x27;/users/{userId}&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;200&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>]
    &gt;,
  </span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> userId = req.<span class="hljs-property">params</span>.<span class="hljs-property">userId</span>;
    <span class="hljs-comment">// ... your logic</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: paths[<span class="hljs-string">&#x27;/users/{userId}&#x27;</span>][<span class="hljs-string">&#x27;get&#x27;</span>][<span class="hljs-string">&#x27;responses&#x27;</span>][<span class="hljs-string">&#x27;200&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>][<span class="hljs-string">&#x27;application/json&#x27;</span>] =
      { <span class="hljs-attr">id</span>: userId, <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;john&#x27;</span>, <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span> };
    res.<span class="hljs-title function_">json</span>(user);
  },
);

<span class="hljs-comment">// ... other routes</span>
</code></pre>
<h2 id="الفوائد">الفوائد</h2>
<ul>
<li><strong>مصدر واحد للحقيقة:</strong> تكون مواصفة OpenAPI لديك التعريف المركزي لـ API الخاص بك.</li>
<li><strong>سلامة الأنواع:</strong> تضمن أنواع TypeScript المولَّدة الاتساق بين API لديك وشيفرتك.</li>
<li><strong>توثيق محسّن:</strong> يوفر OpenAPI توثيقًا تفاعليًا لـ API الخاص بك.</li>
<li><strong>أخطاء أقل:</strong> يلتقط فحص الأنواع الأخطاء المحتملة مبكرًا في أثناء التطوير.</li>
</ul>
<h2 id="تحسينات-سير-العمل">تحسينات سير العمل</h2>
<ul>
<li>ادمج <code>openapi-typescript</code> في عملية البناء لديك لتوليد الأنواع تلقائيًا كلما تغيّرت مواصفة OpenAPI لديك.</li>
<li>استخدم أدوات التحقق من OpenAPI للتأكد من أن مواصفتك صالحة.</li>
<li>فكّر في استخدام أدوات توليد الشيفرة لتوليد معالجات مسارات Express من مواصفة OpenAPI لديك.</li>
<li>استخدم مكتبات مثل <a href="https://www.npmjs.com/package/express-openapi-validator"><code>express-openapi-validator</code></a> للتحقق من الطلبات مقابل مواصفة OpenAPI لديك في وقت التشغيل.</li>
</ul>
`,e={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:r};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,r as html,p as slug,l as title};
