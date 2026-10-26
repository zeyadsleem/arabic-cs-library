const s="kinney",a="react-typescript",n="React مع TypeScript",l="edge-ssr-hydration",p="الحوافّ، وSSR، وأنواع حمولات الترطيب",t=[{depth:2,id:"مشكلة-حمولة-الترطيب",text:"مشكلة حمولة الترطيب"},{depth:2,id:"بناء-أنواع-آمنة-التسلسل",text:"بناء أنواع آمنة التسلسل"},{depth:2,id:"نمط-عقد-الترطيب",text:"نمط عقد الترطيب"},{depth:2,id:"اعتبارات-وقت-التنفيذ-في-الحواف",text:"اعتبارات وقت التنفيذ في الحوافّ"},{depth:2,id:"التعامل-مع-عدم-تطابق-الترطيب",text:"التعامل مع عدم تطابق الترطيب"},{depth:2,id:"تحسين-الحمولات-المتقدم",text:"تحسين الحمولات المتقدّم"},{depth:3,id:"الحمولات-المجزأة",text:"الحمولات المجزَّأة"},{depth:3,id:"الحمولات-المضغوطة",text:"الحمولات المضغوطة"},{depth:2,id:"اختبار-حمولات-الترطيب",text:"اختبار حمولات الترطيب"},{depth:2,id:"مثال-تنفيذ-من-الواقع",text:"مثال تنفيذ من الواقع"},{depth:2,id:"الخلاصات-الأساسية",text:"الخلاصات الأساسية"}],e=`<p>قدرات التصيير من جانب الخادم (SSR) والبثّ (streaming) الحديثة في React 19 قوية، لكنها تأتي بتعقيدٍ خفي: فعليَ بياناتك أن تنجو من رحلة خطِرة من الخادم إلى العميل، مرورًا ببيئات تنفيذ (runtimes) متعددة وحدود تسلسل (serialization) ومراحل ترطيب (hydration). وإنّ اختلالًا صغيرًا في الأنواع—مثل كائن <code>Date</code> يغدو سلسلة نصّية، أو <code>undefined</code> يختفي كليًّا—قد يحوّل شيفرتك جهة الخادم المحدَّدة الأنواع على نحوٍ مثالي إلى كابوس عدم تطابق الترطيب (hydration mismatch) في العميل. لنستكشف كيف نبني أنواع حمولات ترطيب متينةً تعمل بسلاسة عبر دوال الحوافّ (edge functions)، وخوادم Node.js، وعملية ترطيب React.</p>
<h2 id="مشكلة-حمولة-الترطيب">مشكلة حمولة الترطيب</h2>
<p>الترطيب (hydration) هو عملية React في إحياء HTML المُصيَّر على الخادم بربطه مع معالجات الأحداث وجعله تفاعليًّا. لكن بينهما توجد خطوة حرجة: على بياناتك أن تُسلسَل (إلى JSON في الغالب)، وأن تُغرز في HTML، ثم يُفكّ تسلسلها وتمرَّر إلى مكوّنات (components) React.</p>
<p>في هذه العملية البسيطة ظاهريًّا تنهار تطبيقات كثيرة آمنة الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Server code - looks perfectly typed</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">lastLogin</span>: <span class="hljs-title class_">Date</span>; <span class="hljs-comment">// This is a Date object</span>
  <span class="hljs-attr">preferences</span>?: {
    <span class="hljs-comment">// This is optional</span>
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getServerSideProps</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">props</span>: { user }, <span class="hljs-comment">// TypeScript thinks this is safe</span>
  };
}

<span class="hljs-comment">// ❌ Client receives this after JSON serialization:</span>
<span class="hljs-keyword">const</span> actualClientData = {
  <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>,
  <span class="hljs-attr">lastLogin</span>: <span class="hljs-string">&#x27;2025-01-06T12:00:00.000Z&#x27;</span>, <span class="hljs-comment">// Now a string!</span>
  <span class="hljs-comment">// preferences disappeared (undefined was dropped)</span>
};
</code></pre>
<p>يتوقّع مكوّن (component) العميل <code>User</code> فيه كائن <code>Date</code>، لكنه يستقبل سلسلة نصّية. ولا يُمسكه TypeScript لأنّ التسلسل يقع وقت التشغيل، ما يخلق عدم تطابق ترطيب.</p>
<h2 id="بناء-أنواع-آمنة-التسلسل">بناء أنواع آمنة التسلسل</h2>
<p>يبدأ الحل بتصميم أنواع تراعي بوضوح حدّ التسلسل. وبدلًا من الأمل في أن تنجو أنواعك الغنية في الرحلة، صمّم أنواع حمل (payload) آمنة JSON بطبيعتها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// ✅ JSON-serializable payload type</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">HydrationUserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">lastLogin</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">datetime</span>(), <span class="hljs-comment">// ISO string, not Date</span>
  <span class="hljs-attr">preferences</span>: z
    .<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">theme</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;light&#x27;</span>, <span class="hljs-string">&#x27;dark&#x27;</span>]),
    })
    .<span class="hljs-title function_">nullable</span>(), <span class="hljs-comment">// Explicit null instead of undefined</span>
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">HydrationUser</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">HydrationUserSchema</span>&gt;;

<span class="hljs-comment">// ✅ Rich client-side type (derived from payload)</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ClientUser</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">lastLogin</span>: <span class="hljs-title class_">Date</span>; <span class="hljs-comment">// Converted back to Date on client</span>
  <span class="hljs-attr">preferences</span>: {
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>;
  } | <span class="hljs-literal">null</span>;
}
</code></pre>
<p>لاحظ الفروق الجوهرية في نوع حمولة الترطيب:</p>
<ul>
<li>الكائنات <code>Date</code> تغدو سلاسل ISO</li>
<li>الخصائص الاختيارية تغدو <code>null</code> صريحةً (لأن JSON يُسقِط <code>undefined</code>)</li>
<li>نستخدم Zod للتحقّق من البنية وقت التشغيل</li>
</ul>
<h2 id="نمط-عقد-الترطيب">نمط عقد الترطيب</h2>
<p>أنشئ عقودًا صريحة بين الخادم والعميل تُدير تحويلات الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// hydration-contract.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">HydrationContract</span> {
  <span class="hljs-keyword">static</span> <span class="hljs-title function_">serializeUser</span>(<span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>): <span class="hljs-title class_">HydrationUser</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: user.<span class="hljs-property">name</span>,
      <span class="hljs-attr">lastLogin</span>: user.<span class="hljs-property">lastLogin</span>.<span class="hljs-title function_">toISOString</span>(),
      <span class="hljs-attr">preferences</span>: user.<span class="hljs-property">preferences</span> || <span class="hljs-literal">null</span>,
    };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">deserializeUser</span>(<span class="hljs-attr">payload</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title class_">ClientUser</span> {
    <span class="hljs-comment">// Validate the payload shape first</span>
    <span class="hljs-keyword">const</span> validated = <span class="hljs-title class_">HydrationUserSchema</span>.<span class="hljs-title function_">parse</span>(payload);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">id</span>: validated.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: validated.<span class="hljs-property">name</span>,
      <span class="hljs-attr">lastLogin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(validated.<span class="hljs-property">lastLogin</span>),
      <span class="hljs-attr">preferences</span>: validated.<span class="hljs-property">preferences</span>,
    };
  }
}

<span class="hljs-comment">// ✅ Server-side usage</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getServerSideProps</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>();

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">userPayload</span>: <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">serializeUser</span>(user)
    }
  };
}

<span class="hljs-comment">// ✅ Client-side component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserProfileProps</span> {
  <span class="hljs-attr">userPayload</span>: <span class="hljs-title class_">HydrationUser</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userPayload }: <span class="hljs-title class_">UserProfileProps</span></span>) {
  <span class="hljs-comment">// Safe deserialization with validation</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">deserializeUser</span>(userPayload);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Invalid user payload:&#x27;</span>, error);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
  }, [userPayload]);

  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Invalid user data<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Last login: {user.lastLogin.toLocaleDateString()}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Theme: {user.preferences?.theme ?? &#x27;not set&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اعتبارات-وقت-التنفيذ-في-الحواف">اعتبارات وقت التنفيذ في الحوافّ</h2>
<p>تضيف دوال الحوافّ (edge functions) طبقة تعقيد إضافية. فهي تعمل في بيئة مقيَّدة بواجهات محدودة، وتحتاج حمولات الترطيب لديك إلى أن تكون خفيفة الوزن بوجهٍ خاصة. هكذا تبني عقود ترطيب محسّنة للحوافّ:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// edge-safe-types.ts</span>
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// ✅ Edge-optimized payload (minimal, serializable)</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">EdgeUserPayloadSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">theme</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;light&#x27;</span>, <span class="hljs-string">&#x27;dark&#x27;</span>]).<span class="hljs-title function_">nullable</span>(),
  <span class="hljs-comment">// Avoid complex nested objects that bloat payload size</span>
  <span class="hljs-attr">lastLoginTimestamp</span>: z.<span class="hljs-title function_">number</span>(), <span class="hljs-comment">// Unix timestamp instead of ISO string</span>
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">EdgeUserPayload</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">EdgeUserPayloadSchema</span>&gt;;

<span class="hljs-comment">// ✅ Edge-safe contract</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">EdgeHydrationContract</span> {
  <span class="hljs-comment">// Validate environment compatibility</span>
  <span class="hljs-keyword">static</span> <span class="hljs-title function_">isEdgeCompatible</span>(<span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-title class_">EdgeUserPayloadSchema</span>.<span class="hljs-title function_">parse</span>(data);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    } <span class="hljs-keyword">catch</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">serializeForEdge</span>(<span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>): <span class="hljs-title class_">EdgeUserPayload</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: user.<span class="hljs-property">name</span>,
      <span class="hljs-attr">theme</span>: user.<span class="hljs-property">preferences</span>?.<span class="hljs-property">theme</span> || <span class="hljs-literal">null</span>,
      <span class="hljs-attr">lastLoginTimestamp</span>: user.<span class="hljs-property">lastLogin</span>.<span class="hljs-title function_">getTime</span>(),
    };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">deserializeFromEdge</span>(<span class="hljs-attr">payload</span>: <span class="hljs-title class_">EdgeUserPayload</span>): <span class="hljs-title class_">ClientUser</span> {
    <span class="hljs-keyword">const</span> validated = <span class="hljs-title class_">EdgeUserPayloadSchema</span>.<span class="hljs-title function_">parse</span>(payload);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">id</span>: validated.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: validated.<span class="hljs-property">name</span>,
      <span class="hljs-attr">lastLogin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(validated.<span class="hljs-property">lastLoginTimestamp</span>),
      <span class="hljs-attr">preferences</span>: validated.<span class="hljs-property">theme</span> ? { <span class="hljs-attr">theme</span>: validated.<span class="hljs-property">theme</span> } : <span class="hljs-literal">null</span>,
    };
  }
}
</code></pre>
<h2 id="التعامل-مع-عدم-تطابق-الترطيب">التعامل مع عدم تطابق الترطيب</h2>
<p>حتى مع تحديد الأنواع بعناية، قد يقع عدم تطابق الترطيب. React 19 يوفّر أدوات أفضل للتعامل مع هذه الحالات بسلاسة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useSyncExternalStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Hook for safe hydration with mismatch detection</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useHydratedUser</span>(<span class="hljs-params"><span class="hljs-attr">serverPayload</span>: <span class="hljs-title class_">HydrationUser</span></span>) {
  <span class="hljs-keyword">const</span> [hydrationError, setHydrationError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Track hydration status</span>
  <span class="hljs-keyword">const</span> isHydrated = <span class="hljs-title function_">useSyncExternalStore</span>(
    <span class="hljs-function">(<span class="hljs-params">callback</span>) =&gt;</span> {
      <span class="hljs-comment">// Subscribe to hydration completion</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span>) {
        <span class="hljs-title function_">callback</span>();
      }
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {};
    },
    <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span>,  <span class="hljs-comment">// Client value</span>
    <span class="hljs-function">() =&gt;</span> <span class="hljs-literal">false</span>  <span class="hljs-comment">// Server value</span>
  );

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">deserializeUser</span>(serverPayload);
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">const</span> errorMessage = error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>;
      <span class="hljs-title function_">setHydrationError</span>(<span class="hljs-string">\`Hydration mismatch: <span class="hljs-subst">\${errorMessage}</span>\`</span>);

      <span class="hljs-comment">// Log detailed debug info in development</span>
      <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Hydration payload validation failed:&#x27;</span>, {
          error,
          <span class="hljs-attr">payload</span>: serverPayload,
          <span class="hljs-attr">expected</span>: <span class="hljs-string">&#x27;HydrationUser schema&#x27;</span>
        });
      }

      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
  }, [serverPayload]);

  <span class="hljs-keyword">return</span> { user, isHydrated, hydrationError };
}

<span class="hljs-comment">// ✅ Component with graceful error handling</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userPayload }: <span class="hljs-title class_">UserProfileProps</span></span>) {
  <span class="hljs-keyword">const</span> { user, isHydrated, hydrationError } = <span class="hljs-title function_">useHydratedUser</span>(userPayload);

  <span class="hljs-comment">// Show loading state during hydration</span>
  <span class="hljs-keyword">if</span> (!isHydrated) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserSkeleton</span> /&gt;</span></span>;
  }

  <span class="hljs-comment">// Handle hydration errors gracefully</span>
  <span class="hljs-keyword">if</span> (hydrationError) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorBoundary</span>
        <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">UserErrorFallback</span> <span class="hljs-attr">error</span>=<span class="hljs-string">{hydrationError}</span> /&gt;</span>}
        onError={(error) =&gt; {
          // Report to error tracking service
          reportHydrationError(error, userPayload);
        }}
      &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User data temporarily unavailable<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ErrorBoundary</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>No user data<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Last login: {user.lastLogin.toLocaleDateString()}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Theme: {user.preferences?.theme ?? &#x27;not set&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تحسين-الحمولات-المتقدم">تحسين الحمولات المتقدّم</h2>
<p>قد تحتاج في التطبيقات المعقّدة إلى معالجة حمولات أكثر تطوّرًا:</p>
<h3 id="الحمولات-المجزأة">الحمولات المجزَّأة</h3>
<p>قسّم حمولات الترطيب الكبيرة إلى قطع تُحمَّل تدرّجيًّا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Chunked hydration for large datasets</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">UserPayloadChunkSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">essential</span>: z.<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  }),
  <span class="hljs-attr">preferences</span>: z
    .<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">theme</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;light&#x27;</span>, <span class="hljs-string">&#x27;dark&#x27;</span>]),
      <span class="hljs-attr">notifications</span>: z.<span class="hljs-title function_">boolean</span>(),
    })
    .<span class="hljs-title function_">optional</span>(),
  <span class="hljs-attr">activity</span>: z
    .<span class="hljs-title function_">array</span>(
      z.<span class="hljs-title function_">object</span>({
        <span class="hljs-attr">type</span>: z.<span class="hljs-title function_">string</span>(),
        <span class="hljs-attr">timestamp</span>: z.<span class="hljs-title function_">number</span>(),
      }),
    )
    .<span class="hljs-title function_">optional</span>(),
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useChunkedUser</span>(<span class="hljs-params"><span class="hljs-attr">chunks</span>: <span class="hljs-title class_">Partial</span>&lt;z.infer&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserPayloadChunkSchema</span>&gt;&gt;</span>) {
  <span class="hljs-keyword">const</span> [loadedChunks, setLoadedChunks] = <span class="hljs-title function_">useState</span>(chunks);

  <span class="hljs-keyword">const</span> loadChunk = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">chunkName</span>: keyof <span class="hljs-keyword">typeof</span> chunks) =&gt; {
      <span class="hljs-keyword">if</span> (loadedChunks[chunkName]) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> chunk = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUserChunk</span>(chunkName);
        <span class="hljs-title function_">setLoadedChunks</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [chunkName]: chunk }));
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Failed to load user chunk <span class="hljs-subst">\${chunkName}</span>:\`</span>, error);
      }
    },
    [loadedChunks],
  );

  <span class="hljs-keyword">return</span> { loadedChunks, loadChunk };
}
</code></pre>
<h3 id="الحمولات-المضغوطة">الحمولات المضغوطة</h3>
<p>في دوال الحوافّ ذوات قيود الحجم، نفّذ ضغطًا للحمولات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Compressed payloads for edge functions</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">CompressedHydrationContract</span> {
  <span class="hljs-keyword">static</span> <span class="hljs-title function_">compress</span>(<span class="hljs-attr">data</span>: <span class="hljs-title class_">HydrationUser</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-comment">// Simple compression strategy - remove nulls, use short keys</span>
    <span class="hljs-keyword">const</span> compressed = {
      <span class="hljs-attr">i</span>: data.<span class="hljs-property">id</span>,
      <span class="hljs-attr">n</span>: data.<span class="hljs-property">name</span>,
      <span class="hljs-attr">l</span>: data.<span class="hljs-property">lastLoginTimestamp</span>,
      <span class="hljs-attr">t</span>: data.<span class="hljs-property">preferences</span>?.<span class="hljs-property">theme</span>,
    };

    <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(compressed);
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">decompress</span>(<span class="hljs-attr">compressed</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">HydrationUser</span> {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(compressed);

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">id</span>: data.<span class="hljs-property">i</span>,
        <span class="hljs-attr">name</span>: data.<span class="hljs-property">n</span>,
        <span class="hljs-attr">lastLoginTimestamp</span>: data.<span class="hljs-property">l</span>,
        <span class="hljs-attr">preferences</span>: data.<span class="hljs-property">t</span> ? { <span class="hljs-attr">theme</span>: data.<span class="hljs-property">t</span> } : <span class="hljs-literal">null</span>,
      };
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to decompress payload: <span class="hljs-subst">\${error}</span>\`</span>);
    }
  }
}
</code></pre>
<h2 id="اختبار-حمولات-الترطيب">اختبار حمولات الترطيب</h2>
<p>لا تنسَ اختبار عقود الترطيب لديك اختبارًا شاملًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// hydration-contract.test.ts</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;HydrationContract&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">mockUser</span>: <span class="hljs-title class_">User</span> = {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>,
    <span class="hljs-attr">lastLogin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-string">&#x27;2025-01-06T12:00:00.000Z&#x27;</span>),
    <span class="hljs-attr">preferences</span>: { <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span> },
  };

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;serializes and deserializes user correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> serialized = <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">serializeUser</span>(mockUser);
    <span class="hljs-keyword">const</span> deserialized = <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">deserializeUser</span>(serialized);

    <span class="hljs-title function_">expect</span>(deserialized.<span class="hljs-property">id</span>).<span class="hljs-title function_">toBe</span>(mockUser.<span class="hljs-property">id</span>);
    <span class="hljs-title function_">expect</span>(deserialized.<span class="hljs-property">name</span>).<span class="hljs-title function_">toBe</span>(mockUser.<span class="hljs-property">name</span>);
    <span class="hljs-title function_">expect</span>(deserialized.<span class="hljs-property">lastLogin</span>).<span class="hljs-title function_">toEqual</span>(mockUser.<span class="hljs-property">lastLogin</span>);
    <span class="hljs-title function_">expect</span>(deserialized.<span class="hljs-property">preferences</span>).<span class="hljs-title function_">toEqual</span>(mockUser.<span class="hljs-property">preferences</span>);
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;handles malformed payload gracefully&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> malformed = { <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>, <span class="hljs-attr">name</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">lastLogin</span>: <span class="hljs-string">&#x27;invalid-date&#x27;</span> };

    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">deserializeUser</span>(malformed);
    }).<span class="hljs-title function_">toThrow</span>();
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;survives JSON serialization round-trip&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> payload = <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">serializeUser</span>(mockUser);
    <span class="hljs-keyword">const</span> jsonString = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(payload);
    <span class="hljs-keyword">const</span> parsed = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(jsonString);
    <span class="hljs-keyword">const</span> user = <span class="hljs-title class_">HydrationContract</span>.<span class="hljs-title function_">deserializeUser</span>(parsed);

    <span class="hljs-title function_">expect</span>(user.<span class="hljs-property">lastLogin</span>.<span class="hljs-title function_">getTime</span>()).<span class="hljs-title function_">toBe</span>(mockUser.<span class="hljs-property">lastLogin</span>.<span class="hljs-title function_">getTime</span>());
  });

  <span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;validates payload schema strictly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> result = <span class="hljs-title class_">HydrationUserSchema</span>.<span class="hljs-title function_">safeParse</span>({
      <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span>,
      <span class="hljs-attr">lastLogin</span>: <span class="hljs-string">&#x27;2025-01-06T12:00:00.000Z&#x27;</span>,
      <span class="hljs-attr">preferences</span>: { <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span> },
      <span class="hljs-attr">extraField</span>: <span class="hljs-string">&#x27;should-be-ignored&#x27;</span>, <span class="hljs-comment">// This should be stripped</span>
    });

    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">success</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// Strict validation</span>
  });
});
</code></pre>
<h2 id="مثال-تنفيذ-من-الواقع">مثال تنفيذ من الواقع</h2>
<p>هذا تنفيذ كامل يريك كل هذه الأنماط وهي تعمل معًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// user-hydration-system.ts</span>
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// Base schemas</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserPreferencesSchema</span> = z
  .<span class="hljs-title function_">object</span>({
    <span class="hljs-attr">theme</span>: z.<span class="hljs-title function_">enum</span>([<span class="hljs-string">&#x27;light&#x27;</span>, <span class="hljs-string">&#x27;dark&#x27;</span>]),
    <span class="hljs-attr">notifications</span>: z.<span class="hljs-title function_">boolean</span>(),
  })
  .<span class="hljs-title function_">nullable</span>();

<span class="hljs-keyword">const</span> <span class="hljs-title class_">HydrationUserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">name</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">lastLoginTimestamp</span>: z.<span class="hljs-title function_">number</span>(),
  <span class="hljs-attr">preferences</span>: <span class="hljs-title class_">UserPreferencesSchema</span>,
});

<span class="hljs-comment">// Runtime detection</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getTargetRuntime</span>(<span class="hljs-params"></span>): <span class="hljs-string">&#x27;browser&#x27;</span> | <span class="hljs-string">&#x27;node&#x27;</span> | <span class="hljs-string">&#x27;edge&#x27;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> !== <span class="hljs-string">&#x27;undefined&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;browser&#x27;</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> process !== <span class="hljs-string">&#x27;undefined&#x27;</span> &amp;&amp; process.<span class="hljs-property">versions</span>?.<span class="hljs-property">node</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;node&#x27;</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;edge&#x27;</span>;
}

<span class="hljs-comment">// Universal hydration contract</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">UniversalHydrationContract</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> runtime = <span class="hljs-title function_">getTargetRuntime</span>();

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">serializeUser</span>(<span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span>): z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">HydrationUserSchema</span>&gt; {
    <span class="hljs-keyword">const</span> payload = {
      <span class="hljs-attr">id</span>: user.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: user.<span class="hljs-property">name</span>,
      <span class="hljs-attr">email</span>: user.<span class="hljs-property">email</span>,
      <span class="hljs-attr">lastLoginTimestamp</span>: user.<span class="hljs-property">lastLogin</span>.<span class="hljs-title function_">getTime</span>(),
      <span class="hljs-attr">preferences</span>: user.<span class="hljs-property">preferences</span> || <span class="hljs-literal">null</span>,
    };

    <span class="hljs-comment">// Validate the payload before sending</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-title class_">HydrationUserSchema</span>.<span class="hljs-title function_">safeParse</span>(payload);
    <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Invalid hydration payload: <span class="hljs-subst">\${result.error.message}</span>\`</span>);
    }

    <span class="hljs-keyword">return</span> result.<span class="hljs-property">data</span>;
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">deserializeUser</span>(<span class="hljs-attr">payload</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title class_">ClientUser</span> {
    <span class="hljs-keyword">const</span> validated = <span class="hljs-title class_">HydrationUserSchema</span>.<span class="hljs-title function_">parse</span>(payload);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">id</span>: validated.<span class="hljs-property">id</span>,
      <span class="hljs-attr">name</span>: validated.<span class="hljs-property">name</span>,
      <span class="hljs-attr">email</span>: validated.<span class="hljs-property">email</span>,
      <span class="hljs-attr">lastLogin</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(validated.<span class="hljs-property">lastLoginTimestamp</span>),
      <span class="hljs-attr">preferences</span>: validated.<span class="hljs-property">preferences</span>,
    };
  }

  <span class="hljs-comment">// Runtime-specific optimizations</span>
  <span class="hljs-keyword">static</span> <span class="hljs-title function_">optimizeForRuntime</span>(<span class="hljs-params"><span class="hljs-attr">payload</span>: z.infer&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">HydrationUserSchema</span>&gt;</span>) {
    <span class="hljs-keyword">switch</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">runtime</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;edge&#x27;</span>:
        <span class="hljs-comment">// Minimize payload size for edge functions</span>
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">i</span>: payload.<span class="hljs-property">id</span>,
          <span class="hljs-attr">n</span>: payload.<span class="hljs-property">name</span>,
          <span class="hljs-attr">e</span>: payload.<span class="hljs-property">email</span>,
          <span class="hljs-attr">l</span>: payload.<span class="hljs-property">lastLoginTimestamp</span>,
          <span class="hljs-attr">p</span>: payload.<span class="hljs-property">preferences</span>,
        };
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;node&#x27;</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;browser&#x27;</span>:
      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> payload;
    }
  }
}

<span class="hljs-comment">// ✅ API route handler (works everywhere)</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">GET</span>(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span></span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> userId = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(request.<span class="hljs-property">url</span>).<span class="hljs-property">searchParams</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;id&#x27;</span>);
    <span class="hljs-keyword">if</span> (!userId) {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Response</span>.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;User ID required&#x27;</span> }, { <span class="hljs-attr">status</span>: <span class="hljs-number">400</span> });
    }

    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUser</span>(userId);
    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Response</span>.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;User not found&#x27;</span> }, { <span class="hljs-attr">status</span>: <span class="hljs-number">404</span> });
    }

    <span class="hljs-keyword">const</span> payload = <span class="hljs-title class_">UniversalHydrationContract</span>.<span class="hljs-title function_">serializeUser</span>(user);
    <span class="hljs-keyword">const</span> optimized = <span class="hljs-title class_">UniversalHydrationContract</span>.<span class="hljs-title function_">optimizeForRuntime</span>(payload);

    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Response</span>.<span class="hljs-title function_">json</span>(optimized, {
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span>,
        <span class="hljs-string">&#x27;Cache-Control&#x27;</span>: <span class="hljs-string">&#x27;public, max-age=300&#x27;</span>,
      },
    });
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;User API error:&#x27;</span>, error);
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Response</span>.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Internal server error&#x27;</span> }, { <span class="hljs-attr">status</span>: <span class="hljs-number">500</span> });
  }
}
</code></pre>
<h2 id="الخلاصات-الأساسية">الخلاصات الأساسية</h2>
<p>يتطلّب بناء أنواع موثوقة لحمولات الترطيب تفكيرًا فيما وراء ضمانات TypeScript وقت التصريف:</p>
<ol>
<li><strong>صمّم مع التسلسل</strong>—ينبغي أن تكون أنواعك آمنة JSON بطبيعتها</li>
<li><strong>تحقّق وقت التشغيل</strong>—استخدم Zod لالتقاط عدم مطابقة الحمولة قبل أن تُسبّب أخطاء ترطيب</li>
<li><strong>عالج الفرق بين <code>undefined</code> و<code>null</code></strong>—تسلسل JSON يُسقِط قيم <code>undefined</code>، فاستعمل <code>null</code> صريحةً</li>
<li><strong>راعِ بيئة تنفيذك</strong>—قيود دوال الحوافّ مختلفة عن خوادم Node.js</li>
<li><strong>اختبر الرحلة كاملةً</strong>—تحقّق أنّ حمولاتك تجتاز تحولات الخادم ← JSON ← العميل</li>
<li><strong>خطّط للأخطاء</strong>—سوف تقع حالات عدم تطابق الترطيب؛ فتعامل معها بسلاسة</li>
</ol>
<p>النتيجة تطبيقات React بأمان أنواعٍ صخريّ يعمل بسلاسة عبر أيّ هدف نشر (deployment)—سواء كنت تشغّل على خوادم تقليدية، أو دوال بلا خادم (serverless)، أو بيئات تنفيذ الحوافّ. لن يرى مستخدموك عدم تطابق ترطيب، وسيشكرك زملاؤك المطوّرون على عقود البيانات المتوقَّعة وسليمة الأنواع.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
