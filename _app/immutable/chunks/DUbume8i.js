const s="kinney",a="storybook",n="بناء أنظمة التصميم في Storybook",t="arg-types",l="تحسين argTypes بالبيانات الوصفية",p=[{depth:2,id:"إضافة-بيانات-وصفية-إلى-argtypes",text:"إضافة بيانات وصفية إلى argTypes"},{depth:2,id:"تهيئة-جدول-أدوات-التحكم",text:"تهيئة جدول أدوات التحكم"},{depth:3,id:"إخفاء-أداة-تحكم",text:"إخفاء أداة تحكم"},{depth:2,id:"عرض-قيمة-افتراضية",text:"عرض قيمة افتراضية"},{depth:2,id:"أدوات-تحكم-إضافية",text:"أدوات تحكم إضافية"}],e=`<h2 id="إضافة-بيانات-وصفية-إلى-argtypes">إضافة بيانات وصفية إلى <code>argTypes</code></h2>
<p>تحاول Storybook أن تستنتج قدر ما تستطيع، لكن كلما أضفت بيانات أكثر، حصلت على جدول أفضل. لنمرّ على هذا المثال.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">Button</span>,
  <span class="hljs-attr">args</span>: {
    <span class="hljs-attr">children</span>: <span class="hljs-string">&#x27;Button&#x27;</span>,
    <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>,
    <span class="hljs-attr">size</span>: <span class="hljs-string">&#x27;medium&#x27;</span>,
    <span class="hljs-attr">disabled</span>: <span class="hljs-literal">false</span>,
  },
  <span class="hljs-attr">argTypes</span>: {
    <span class="hljs-attr">children</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Label&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;text&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Text to display on the button&#x27;</span>,
    },
    <span class="hljs-attr">variant</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Variant&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Variant of the button&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;select&#x27;</span>,
    },
    <span class="hljs-attr">size</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Size&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;select&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Size of the button&#x27;</span>,
    },
    <span class="hljs-attr">disabled</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Disabled&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;boolean&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Disables the button&#x27;</span>,
    },
  },
};
</code></pre>
<h2 id="تهيئة-جدول-أدوات-التحكم">تهيئة جدول أدوات التحكم</h2>
<p>يأخذ كل <code>argType</code> مجموعة من المعاملات لا تتعلق بالضرورة بالوسيط أو الخاصية نفسها، بل بكيفية رغبتك في أن تصيّر Storybook أداة التحكم في الجدول.</p>
<h3 id="إخفاء-أداة-تحكم">إخفاء أداة تحكم</h3>
<p>ليس مفيدًا كثيرًا أن تكون لديك أداة تحكم لعنوان الزر. فنحن نعرف كيف يعمل هذا. لذا قد نرغب في إخفائها.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-comment">// Other metadata…</span>
  <span class="hljs-attr">argTypes</span>: {
    <span class="hljs-attr">children</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Label&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;text&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Text to display on the button&#x27;</span>,
      <span class="hljs-attr">table</span>: {
        <span class="hljs-attr">disable</span>: <span class="hljs-literal">true</span>,
      },
    },
    <span class="hljs-comment">// The rest of the argTypes…</span>
};
</code></pre>
<h2 id="عرض-قيمة-افتراضية">عرض قيمة افتراضية</h2>
<p>تحاول Storybook أن تستنتج القيمة الافتراضية بتحليل شيفرتك، لكن يمكنك أيضًا مساعدتها حيث تقصّر. فمثلًا، لا نذكر خاصية <code>disabled</code> أبدًا في شيفرتنا، لأننا نستخدم خاصية HTML المدمجة فقط. و<em>يمكننا</em> إضافة بعض المعلومات الإضافية إلى الجدول.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-comment">// Other metadata…</span>
  <span class="hljs-attr">argTypes</span>: {
    <span class="hljs-attr">disabled</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Disabled&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;boolean&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Disables the button&#x27;</span>,
      <span class="hljs-attr">table</span>: {
        <span class="hljs-attr">defaultValue</span>: {
          <span class="hljs-attr">summary</span>: <span class="hljs-literal">false</span>,
        },
      },
    },
    <span class="hljs-comment">// The rest of the argTypes…</span>
};
</code></pre>
<p>وإضافة إلى ذلك، يمكنك إضافة تفاصيل أكثر، لكنك على الأرجح لا تحتاج ذلك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-attr">meta</span>: <span class="hljs-title class_">Meta</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">Button</span>&gt; = {
  <span class="hljs-comment">// Other metadata…</span>
  <span class="hljs-attr">argTypes</span>: {
    <span class="hljs-attr">disabled</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Disabled&#x27;</span>,
      <span class="hljs-attr">control</span>: <span class="hljs-string">&#x27;boolean&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Disables the button&#x27;</span>,
      <span class="hljs-attr">table</span>: {
        <span class="hljs-attr">defaultValue</span>: {
          <span class="hljs-attr">summary</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">detail</span>: <span class="hljs-string">&quot;Defers to the built-in HTML attribute.&quot;</span>
        },
      },
    },
    <span class="hljs-comment">// The rest of the argTypes…</span>
};
</code></pre>
<p>سيصيّر هذا تلميحًا صغيرًا يحمل تفصيلك الإضافي.</p>
<p><img src="/arabic-cs-library/images/kinney/1399822d6bdf4c7a.webp" alt="تُصيَّر التفاصيل الإضافية في تلميح صغير"></p>
<p>وإليك ملخص تغييراتنا حتى الآن لمن يتابع منكم في المنزل.</p>
<pre><code class="language-diff"><span class="hljs-comment">diff --git a/src/components/button/button.stories.tsx b/src/components/button/button.stories.tsx</span>
<span class="hljs-comment">index 4348e02..34ba94e 100644</span>
<span class="hljs-comment">--- a/src/components/button/button.stories.tsx</span>
<span class="hljs-comment">+++ b/src/components/button/button.stories.tsx</span>
<span class="hljs-meta">@@ -16,21 +16,39 @@</span> const meta = {
       name: &#x27;Label&#x27;,
       control: &#x27;text&#x27;,
       description: &#x27;Text to display on the button&#x27;,
<span class="hljs-addition">+      table: {</span>
<span class="hljs-addition">+        disable: true,</span>
<span class="hljs-addition">+      },</span>
     },
     variant: {
       name: &#x27;Variant&#x27;,
       description: &#x27;Variant of the button&#x27;,
       control: &#x27;select&#x27;,
<span class="hljs-addition">+      table: {</span>
<span class="hljs-addition">+        defaultValue: {</span>
<span class="hljs-addition">+          summary: &#x27;primary&#x27;,</span>
<span class="hljs-addition">+        },</span>
<span class="hljs-addition">+      },</span>
     },
     size: {
       name: &#x27;Size&#x27;,
       control: &#x27;select&#x27;,
       description: &#x27;Size of the button&#x27;,
<span class="hljs-addition">+      table: {</span>
<span class="hljs-addition">+        defaultValue: {</span>
<span class="hljs-addition">+          summary: &#x27;medium&#x27;,</span>
<span class="hljs-addition">+        },</span>
<span class="hljs-addition">+      },</span>
     },
     disabled: {
       name: &#x27;Disabled&#x27;,
       control: &#x27;boolean&#x27;,
       description: &#x27;Disables the button&#x27;,
<span class="hljs-addition">+      table: {</span>
<span class="hljs-addition">+        defaultValue: {</span>
<span class="hljs-addition">+          summary: false,</span>
<span class="hljs-addition">+        },</span>
<span class="hljs-addition">+      },</span>
     },
   },
 } satisfies Meta&lt;typeof Button&gt;;
</code></pre>
<h2 id="أدوات-تحكم-إضافية">أدوات تحكم إضافية</h2>
<p>يمكنك أيضًا استخدام الخاصيتين <code>category</code> و<code>subcategory</code> على <code>table</code> للتقسيم. لمزيد من التنظيم لأدوات تحكمك. ليس لدينا الكثير لتنظيمه <em>الآن</em>، لكني أردت أن أضعه على رادارك.</p>
<p><img src="/arabic-cs-library/images/kinney/31b18f78c73e0647.webp" alt="أدوات تحكم Figma مع الفئات والفئات الفرعية"></p>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
