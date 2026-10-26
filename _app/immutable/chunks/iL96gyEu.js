const s="kinney",a="react-typescript",n="React مع TypeScript",l="data-fetching-and-runtime-validation",p="جلب البيانات والتحقّق وقت التشغيل",t=[{depth:2,id:"المشكلة-مع-تأكيدات-النوع-الساذجة",text:"المشكلة مع تأكيدات النوع الساذجة"},{depth:2,id:"الدخول-إلى-التحقق-وقت-التشغيل-مع-zod",text:"الدخول إلى التحقّق وقت التشغيل مع Zod"},{depth:2,id:"التعامل-مع-التحقق-بأناقة",text:"التعامل مع التحقّق بأناقة"},{depth:2,id:"react-19-والخطاف-use",text:"React 19 والخُطّاف use"},{depth:2,id:"بناء-خطاف-متين-لجلب-البيانات",text:"بناء خُطّاف متين لجلب البيانات"},{depth:2,id:"التعامل-مع-أشكال-البيانات-المعقدة",text:"التعامل مع أشكال البيانات المعقّدة"},{depth:2,id:"حدود-الأخطاء-لفشل-التحقق",text:"حدود الأخطاء لفشل التحقّق"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"تحقق-مرة-واحدة-ثم-ثق",text:"تحقّق مرّة واحدة ثم ثق"},{depth:3,id:"التخزين-المؤقت-للمخططات",text:"التخزين المؤقت للمخطّطات"},{depth:3,id:"التحقق-الجزئي",text:"التحقّق الجزئي"}],e=`<p>حين تجلب البيانات في React، يمنحك TypeScript أمانًا ممتازًا وقت التجميع — لكنّه لا يستطيع أن يضمن بشكل سحري أنّ الواجهة البرمجية التي تستدعيها تُعيد ما تتوقّعه. وهنا يأتي دور التحقّق وقت التشغيل، الذي يسدّ الفجوة بين التحليل الساكن في TypeScript وعالم البيانات الخارجية الفوضوي غير المتوقّع. وتجعل أنماط اللاتزامنية المحسّنة في React 19 هذا الأمر أكثر أهمية (لحسن الحظ، وبأناقة أكبر) في ضبطه.</p>
<p>وهنا التحدّي الجوهري: أنواع TypeScript ليست سوى تلميحات للمُصرِّف تختفي وقت التشغيل، لكنّ واجهاتك البرمجية قد تُعيد أي شيء — بيانات مشوّهة أو حقول ناقصة أو بنى لا تتوقّعها البتّة. وحرفٌ واحد خطأ في ترحيلٍ في الخادم، وفجأة يصبح <code>user.firstName</code> بقيمة <code>undefined</code>، فينهار شجرة مكوّناتك بالكامل بطرق لم ينبّهك إليها TypeScript يومًا.</p>
<h2 id="المشكلة-مع-تأكيدات-النوع-الساذجة">المشكلة مع تأكيدات النوع الساذجة</h2>
<p>لنبدأ بما ينبغي ألّا تفعله. ربّما رأيت (أو كتبت) شيفرة كهذه:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Just assuming the API returns what you expect</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">firstName</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">lastName</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUser</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">const</span> user = (<span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>()) <span class="hljs-keyword">as</span> <span class="hljs-title class_">User</span>; <span class="hljs-comment">// 🚨 Lying to TypeScript</span>
  <span class="hljs-keyword">return</span> user;
}
</code></pre>
<p>هذا النهج هشّ لأنّك تُجري تأكيد نوع غير آمن (<code>as User</code>) من دون أن تتحقّق فعليًا من مطابقة البيانات لتوقّعاتك. وحين يتغيّر الخادم لا محالة أو يُعيد استجابة خطأ، سينفجر مكوّنك بطرق غير متوقّعة.</p>
<h2 id="الدخول-إلى-التحقق-وقت-التشغيل-مع-zod">الدخول إلى التحقّق وقت التشغيل مع Zod</h2>
<p><a href="https://zod.dev/">Zod</a> هو المعيار الذهبي للتحقّق من المخطّطات (schemas) في عالم TypeScript. فهو يتيح لك تعريف مخطّطات تتحقّق من البيانات وقت التشغيل <em>و</em> تستنتج أنواع TypeScript في آنٍ واحد — مصدرًا واحدًا للحقيقة بشأن أشكال بياناتك.</p>
<pre><code class="language-bash">npm install zod
</code></pre>
<p>وهكذا نعيد كتابة جلب المستخدم لدينا مع تحقّق سليم:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-comment">// ✅ Good: Schema that validates and provides types</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">firstName</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, <span class="hljs-string">&#x27;First name is required&#x27;</span>),
  <span class="hljs-attr">lastName</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>, <span class="hljs-string">&#x27;Last name is required&#x27;</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(<span class="hljs-string">&#x27;Must be a valid email&#x27;</span>),
});

<span class="hljs-comment">// Automatically infer the TypeScript type</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">User</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">UserSchema</span>&gt;;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUser</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);

  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Failed to fetch user: <span class="hljs-subst">\${response.statusText}</span>\`</span>);
  }

  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

  <span class="hljs-comment">// Runtime validation that throws on invalid data</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">UserSchema</span>.<span class="hljs-title function_">parse</span>(data);
}
</code></pre>
<p>هكذا تحصل الآن على أمان الأنواع وقت التجميع والتحقّق وقت التشغيل معًا. فإن أعادت الواجهة البرمجية بيانات مشوّهة، فإنّ Zod سيرمي خطأً وصفيًا بدلًا من أن يسمح للبيانات غير الصالحة بأن تُفسد حالة مكوّنك بصمت.</p>
<h2 id="التعامل-مع-التحقق-بأناقة">التعامل مع التحقّق بأناقة</h2>
<p>أحيانًا تريد التعامل مع فشل التحقّق بأسلوب أنيق أكثر من رمي الاستثناءات. في هذه الحالة تُعيد طريقة <code>safeParse</code> في Zod كائن نتيجة بدلًا من ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserSafely</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);

    <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`HTTP <span class="hljs-subst">\${response.status}</span>: <span class="hljs-subst">\${response.statusText}</span>\`</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
    <span class="hljs-keyword">const</span> result = <span class="hljs-title class_">UserSchema</span>.<span class="hljs-title function_">safeParse</span>(data);

    <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Validation failed:&#x27;</span>, result.<span class="hljs-property">error</span>.<span class="hljs-property">errors</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">return</span> result.<span class="hljs-property">data</span>;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Network error:&#x27;</span>, error);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
}
</code></pre>
<p>يتيح لك هذا النهج التعامل مع أعطال الشبكة وأخطاء HTTP وفشل التحقّق باستراتيجيات مختلفة — ربّما تُعيد المحاولة عند أخطاء الشبكة لكنّك تسجّل وتُعيد null عند فشل التحقّق.</p>
<h2 id="react-19-والخطاف-use">React 19 والخُطّاف <code>use</code></h2>
<p>يقدّم React 19 الخُطّاف التجريبي <code>use</code> الذي يستطيع استهلاك الوعود مباشرةً. وهذا يتوافق بسلاسة مع جلب البيانات المُتحقَّق منه:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { use, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// Promise that fetches and validates user data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">createUserPromise</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetchUser</span>(id); <span class="hljs-comment">// Our validated fetching function from above</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// React 19&#x27;s use hook consumes the promise</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">createUserPromise</span>(userId));

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
        {user.firstName} {user.lastName}
      <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
  );
}
</code></pre>
<p>وبما أنّ دالة <code>fetchUser</code> لدينا تتضمّن التحقّق بالفعل، فإنّ أي بيانات مشوّهة ستُجعل الوعد يُرفض، فتُطلق معالجة حدّ الأخطاء في React بدلًا من تصيير واجهة مكسورة.</p>
<blockquote>
<p><strong>تلميح</strong></p>
<p>لا يزال الخُطّاف <code>use</code> تجريبيًا حتى الآن في React 19. وفي شيفرة الإنتاج، التزم بأنماط اللاتزامنية التقليدية أو بمكتبات مثل React Query حتى يستقرّ.</p>
</blockquote>
<h2 id="بناء-خطاف-متين-لجلب-البيانات">بناء خُطّاف متين لجلب البيانات</h2>
<p>لنجمع كل ذلك معًا في نمط قابل لإعادة الاستخدام يتعامل مع حالات التحميل والأخطاء والتحقّق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">type</span> <span class="hljs-title class_">AsyncState</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>; <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T; <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">function</span> useValidatedFetch&lt;T&gt;(<span class="hljs-attr">url</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;T&gt;, <span class="hljs-attr">dependencies</span>: <span class="hljs-built_in">unknown</span>[] = []) {
  <span class="hljs-keyword">const</span> [state, setState] = useState&lt;<span class="hljs-title class_">AsyncState</span>&lt;T&gt;&gt;({
    <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>,
    <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
  });

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> cancelled = <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchData</span>(<span class="hljs-params"></span>) {
      <span class="hljs-title function_">setState</span>({ <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span>, <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span> });

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(url);

        <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`HTTP <span class="hljs-subst">\${response.status}</span>: <span class="hljs-subst">\${response.statusText}</span>\`</span>);
        }

        <span class="hljs-keyword">const</span> rawData = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
        <span class="hljs-keyword">const</span> result = schema.<span class="hljs-title function_">safeParse</span>(rawData);

        <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
          <span class="hljs-keyword">const</span> errorMessage = result.<span class="hljs-property">error</span>.<span class="hljs-property">errors</span>
            .<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> <span class="hljs-string">\`<span class="hljs-subst">\${err.path.join(<span class="hljs-string">&#x27;.&#x27;</span>)}</span>: <span class="hljs-subst">\${err.message}</span>\`</span>)
            .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;, &#x27;</span>);
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Validation failed: <span class="hljs-subst">\${errorMessage}</span>\`</span>);
        }

        <span class="hljs-keyword">if</span> (!cancelled) {
          <span class="hljs-title function_">setState</span>({
            <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>,
            <span class="hljs-attr">data</span>: result.<span class="hljs-property">data</span>,
            <span class="hljs-attr">error</span>: <span class="hljs-literal">null</span>,
          });
        }
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-keyword">if</span> (!cancelled) {
          <span class="hljs-title function_">setState</span>({
            <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
            <span class="hljs-attr">data</span>: <span class="hljs-literal">null</span>,
            <span class="hljs-attr">error</span>: error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Error</span> ? error.<span class="hljs-property">message</span> : <span class="hljs-string">&#x27;Unknown error&#x27;</span>,
          });
        }
      }
    }

    <span class="hljs-title function_">fetchData</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      cancelled = <span class="hljs-literal">true</span>;
    };
  }, dependencies);

  <span class="hljs-keyword">return</span> state;
}
</code></pre>
<p>والآن يمكنك استخدام هذا الخُطّاف في أي موضع تحتاج فيه إلى جلب بيانات مُتحقَّق منها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userState = <span class="hljs-title function_">useValidatedFetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>, <span class="hljs-title class_">UserSchema</span>, [userId]);

  <span class="hljs-keyword">if</span> (userState.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;loading&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading user...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (userState.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;error&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {userState.error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: user } = userState;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
        {user.firstName} {user.lastName}
      <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التعامل-مع-أشكال-البيانات-المعقدة">التعامل مع أشكال البيانات المعقّدة</h2>
<p>غالبًا ما تُعيد الواجهات البرمجية في العالم الحقيقي كائنات متداخلة ومصفوفات وحقولًا اختيارية. وZod متميّز في التعامل مع هذه السيناريوهات المعقّدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">AddressSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">street</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">city</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">state</span>: z.<span class="hljs-title function_">string</span>(),
  <span class="hljs-attr">zipCode</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">regex</span>(<span class="hljs-regexp">/^\\d{5}(-\\d{4})?$/</span>, <span class="hljs-string">&#x27;Invalid zip code&#x27;</span>),
});

<span class="hljs-keyword">const</span> <span class="hljs-title class_">DetailedUserSchema</span> = z.<span class="hljs-title function_">object</span>({
  <span class="hljs-attr">id</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">uuid</span>(),
  <span class="hljs-attr">firstName</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
  <span class="hljs-attr">lastName</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
  <span class="hljs-attr">email</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">email</span>(),
  <span class="hljs-attr">age</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">0</span>).<span class="hljs-title function_">max</span>(<span class="hljs-number">150</span>),
  <span class="hljs-attr">address</span>: <span class="hljs-title class_">AddressSchema</span>.<span class="hljs-title function_">optional</span>(), <span class="hljs-comment">// Optional nested object</span>
  <span class="hljs-attr">tags</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>()).<span class="hljs-title function_">default</span>([]), <span class="hljs-comment">// Array with default</span>
  <span class="hljs-attr">preferences</span>: z.<span class="hljs-title function_">record</span>(z.<span class="hljs-title function_">string</span>(), z.<span class="hljs-title function_">unknown</span>()).<span class="hljs-title function_">optional</span>(), <span class="hljs-comment">// Key-value pairs</span>
  <span class="hljs-attr">createdAt</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">transform</span>(<span class="hljs-function">(<span class="hljs-params">date</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(date)), <span class="hljs-comment">// Transform string to Date</span>
});

<span class="hljs-keyword">type</span> <span class="hljs-title class_">DetailedUser</span> = z.<span class="hljs-property">infer</span>&lt;<span class="hljs-keyword">typeof</span> <span class="hljs-title class_">DetailedUserSchema</span>&gt;;
</code></pre>
<p>وهذا المخطّط يتعامل مع:</p>
<ul>
<li>الكائنات المتداخلة (<code>address</code>)</li>
<li>الحقول الاختيارية (<code>.optional()</code>)</li>
<li>المصفوفات مع قيم افتراضية (<code>.default([])</code>)</li>
<li>كائنات المفاتيح والقيم المرنة (<code>z.record()</code>)</li>
<li>تحويلات البيانات (<code>.transform()</code>)</li>
<li>التحقّق المخصّص عبر أنماط التعبيرات النمطية (regex)</li>
</ul>
<h2 id="حدود-الأخطاء-لفشل-التحقق">حدود الأخطاء لفشل التحقّق</h2>
<p>وبما أنّ فشل التحقّق يمكن أن يحدث في أي لحظة أثناء جلب البيانات، ينبغي أن تغلّف مكوّنات جلب البيانات لديك بحدود أخطاء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Component</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Props</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">ReactNode</span>;
  <span class="hljs-attr">fallback</span>?: <span class="hljs-title class_">ReactNode</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">State</span> {
  <span class="hljs-attr">hasError</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">DataValidationBoundary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span>&lt;<span class="hljs-title class_">Props</span>, <span class="hljs-title class_">State</span>&gt; {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">Props</span></span>) {
    <span class="hljs-variable language_">super</span>(props);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span> = { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">false</span> };
  }

  <span class="hljs-keyword">static</span> <span class="hljs-title function_">getDerivedStateFromError</span>(<span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>): <span class="hljs-title class_">State</span> {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">hasError</span>: <span class="hljs-literal">true</span>, error };
  }

  <span class="hljs-title function_">componentDidCatch</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">errorInfo</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">ErrorInfo</span></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Data validation error:&#x27;</span>, error, errorInfo);
  }

  <span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">hasError</span>) {
      <span class="hljs-keyword">return</span> (
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">fallback</span> || (
          <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Data Error<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>The data from the server doesn&#x27;t match what we expected.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">details</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">summary</span>&gt;</span>Technical details<span class="hljs-tag">&lt;/<span class="hljs-name">summary</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>{this.state.error?.message}<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">details</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
      );
    }

    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">props</span>.<span class="hljs-property">children</span>;
  }
}
</code></pre>
<p>غلّف مكوّناتك المعتمدة على البيانات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">DataValidationBoundary</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfile</span> <span class="hljs-attr">userId</span>=<span class="hljs-string">&quot;123&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">DataValidationBoundary</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>التحقّق وقت التشغيل يضيف بعض الحمل الزائد، لكنّه عادةً لا يُذكر مقارنةً بطلبات الشبكة. ومع ذلك، هناك بضع استراتيجيات تحسين:</p>
<h3 id="تحقق-مرة-واحدة-ثم-ثق">تحقّق مرّة واحدة ثم ثق</h3>
<p>إذا كنت تمرّر بيانات مُتحقَّق منها عبر عدّة مكوّنات، فلا حاجة لك إلى إعادة التحقّق منها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Validate at the boundary, pass typed data down</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserDashboard</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> userState = <span class="hljs-title function_">useValidatedFetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>, <span class="hljs-title class_">UserSchema</span>, [userId]);

  <span class="hljs-keyword">if</span> (userState.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;success&#x27;</span>) {
    <span class="hljs-comment">// userState.data is already validated - pass it down safely</span>
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">UserHeader</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{userState.data}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">UserDetails</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{userState.data}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">UserActivity</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{userState.data}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/&gt;</span></span>
    );
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// These components can trust the data is valid</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserHeader</span>(<span class="hljs-params">{ user }: { user: User }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
      {user.firstName} {user.lastName}
    <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="التخزين-المؤقت-للمخططات">التخزين المؤقت للمخطّطات</h3>
<p>للمخطّطات المستخدَمة كثيرًا، من المفيد التفكير في تخزين دوالّ التحقّق المُصرَّفة مؤقتًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> schemaCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();

<span class="hljs-keyword">function</span> getCachedSchema&lt;T&gt;(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">schema</span>: z.<span class="hljs-property">ZodSchema</span>&lt;T&gt;) {
  <span class="hljs-keyword">if</span> (!schemaCache.<span class="hljs-title function_">has</span>(key)) {
    schemaCache.<span class="hljs-title function_">set</span>(key, schema);
  }
  <span class="hljs-keyword">return</span> schemaCache.<span class="hljs-title function_">get</span>(key);
}
</code></pre>
<h3 id="التحقق-الجزئي">التحقّق الجزئي</h3>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
