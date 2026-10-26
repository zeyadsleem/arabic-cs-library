const s="kinney",n="react-typescript",a="React مع TypeScript",t="useoptimistic-typed-optimism",p="useOptimistic والتحديثات المتفائلة ذات الأنواع",l=[{depth:2,id:"ما-هي-التحديثات-المتفائلة",text:"ما هي التحديثات المتفائلة؟"},{depth:2,id:"فهم-خطاف-useoptimistic",text:"فهم خطّاف useOptimistic"},{depth:2,id:"إعداد-الأنواع-للتحديثات-المتفائلة",text:"إعداد الأنواع للتحديثات المتفائلة"},{depth:2,id:"بناء-خطاف-متفائل-آمن-من-حيث-الأنواع",text:"بناء خطّاف متفائل آمن من حيث الأنواع"},{depth:2,id:"التعامل-مع-حالة-متفائلة-معقدة",text:"التعامل مع حالة متفائلة معقّدة"},{depth:2,id:"المطابقة-مع-حالة-الخادم",text:"المطابقة مع حالة الخادم"},{depth:2,id:"أنماط-معالجة-الأخطاء",text:"أنماط معالجة الأخطاء"},{depth:3,id:"التدهور-الرشيق",text:"التدهور الرشيق"},{depth:3,id:"منطق-إعادة-المحاولة",text:"منطق إعادة المحاولة"},{depth:2,id:"اختبار-التحديثات-المتفائلة",text:"اختبار التحديثات المتفائلة"},{depth:2,id:"اعتبارات-من-العالم-الواقعي",text:"اعتبارات من العالم الواقعي"},{depth:3,id:"حل-التضارب",text:"حل التضارب"},{depth:3,id:"اعتبارات-عرض-النطاق-الترددي",text:"اعتبارات عرض النطاق الترددي"},{depth:3,id:"سهولة-الوصول",text:"سهولة الوصول"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],e=`<p>يُتيح لك خطّاف <code>useOptimistic</code> في React إظهار تغذية راجعة فورية للمستخدمين بينما لا تزال أفعالهم قيد المعالجة على الخادم. فكّر في الأمر كإظهار زر «الإعجاب» وقد نُقر عليه بالفعل بينما لا يزال طلب API قيد الإرسال—يحصل المستخدمون على رضا فوري، وأنت تتعامل مع التعقيدات خلف الكواليس. لكن الأمر هنا: بدون نمذجة مناسبة بـ TypeScript، يمكن أن تتحول التحديثات المتفائلة بسرعة إلى كابوس في تصحيح الأخطاء عندما لا تتطابق ردود الخادم مع افتراضاتك.</p>
<p>لنستكشف كيفية بناء أنماط واجهة مستخدم متفائلة قوية وآمنة من حيث الأنواع، تتعامل برفق مع المسار السعيد، وأخطاء الشبكة، وكل ما بينهما.</p>
<h2 id="ما-هي-التحديثات-المتفائلة">ما هي التحديثات المتفائلة؟</h2>
<p>التحديثات المتفائلة (Optimistic Updates) هي نمط في واجهة المستخدم حيث تُظهر فورًا النتيجة المتوقعة لإجراء المستخدم، ثم تُطابِقها مع استجابة الخادم الفعلية بعد ذلك. بدلًا من عرض مؤشر التحميل أثناء انتظار الخادم، تفترض أن الإجراء سينجح وتُحدّث واجهة المستخدم وفقًا لذلك.</p>
<p>إليك سير العمل الأساسي:</p>
<ol>
<li>يقوم المستخدم بإجراء ما (النقر على «إعجاب»، أو إرسال نموذج، أو حذف عنصر)</li>
<li>تُحدّث واجهة المستخدم فورًا كأن الإجراء قد نجح</li>
<li>يُرسل الطلب إلى الخادم في الخلفية</li>
<li>إذا نجح الطلب، تبقى الحالة المتفائلة كما هي</li>
<li>إذا فشل الطلب، تُعاد الحالة إلى ما كانت عليه وتُعرض رسالة خطأ</li>
</ol>
<p>الفكرة الرئيسية هي أن معظم إجراءات المستخدم تنجح في معظم الأوقات. من خلال التحسين للحالة الشائعة، تُنشئ تجربة مستخدم أسرع.</p>
<h2 id="فهم-خطاف-useoptimistic">فهم خطّاف <code>useOptimistic</code></h2>
<p>يوفر خطّاف <code>useOptimistic</code> في React 19 تجريدًا نظيفًا لهذا النمط. يدير جزأين من الحالة: البيانات الفعلية والنسخة المتفائلة التي قد تختلف مؤقتًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useOptimistic } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MyComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [likes, setLikes] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">42</span>);
  <span class="hljs-keyword">const</span> [optimisticLikes, addOptimisticLike] = <span class="hljs-title function_">useOptimistic</span>(
    likes,
    <span class="hljs-function">(<span class="hljs-params">current, optimisticValue</span>) =&gt;</span> current + optimisticValue,
  );

  <span class="hljs-comment">// optimisticLikes shows immediate updates</span>
  <span class="hljs-comment">// likes shows the confirmed server state</span>
}
</code></pre>
<p>يأخذ الخطّاف معلمتين:</p>
<ul>
<li><strong>الحالة الحالية (Current state)</strong>: الحالة الفعلية والمؤكدة من الخادم</li>
<li><strong>دالة الاختزال (Reducer function)</strong>: كيفية تطبيق التحديثات المتفائلة على تلك الحالة</li>
</ul>
<h2 id="إعداد-الأنواع-للتحديثات-المتفائلة">إعداد الأنواع للتحديثات المتفائلة</h2>
<p>لنُنشئ نظام «إعجاب» بنمذجة مناسبة بـ TypeScript. أولًا، سنُعرّف الأنواع الأساسية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Base types for our data</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Post</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">likesCount</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">isLikedByUser</span>: <span class="hljs-built_in">boolean</span>;
};

<span class="hljs-comment">// Actions that can be applied optimistically</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">OptimisticLikeAction</span> =
  { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_LIKE&#x27;</span>; <span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span> } | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;REVERT_LIKE&#x27;</span>; <span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// Server response types</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">LikeResponse</span> =
  | {
      <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>;
      <span class="hljs-attr">likesCount</span>: <span class="hljs-built_in">number</span>;
      <span class="hljs-attr">isLikedByUser</span>: <span class="hljs-built_in">boolean</span>;
    }
  | {
      <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>;
      <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span>;
    };
</code></pre>
<p>لاحظ كيف نمذجنا كلًا من الإجراءات المتفائلة وردود الخادم المحتملة. هذا يمنحنا أمانًا أثناء الترجمة عند التعامل مع سيناريوهات مختلفة.</p>
<h2 id="بناء-خطاف-متفائل-آمن-من-حيث-الأنواع">بناء خطّاف متفائل آمن من حيث الأنواع</h2>
<p>لنُنشئ خطّافًا قابلاً لإعادة الاستخدام يُغلّف منطق «الإعجاب» المتفائل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useOptimistic, useCallback, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useOptimisticLikes</span>(<span class="hljs-params"><span class="hljs-attr">posts</span>: <span class="hljs-title class_">Post</span>[]</span>) {
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> [optimisticPosts, addOptimisticAction] = <span class="hljs-title function_">useOptimistic</span>(
    posts,
    <span class="hljs-function">(<span class="hljs-params">currentPosts, <span class="hljs-attr">action</span>: <span class="hljs-title class_">OptimisticLikeAction</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> currentPosts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (post.<span class="hljs-property">id</span> !== action.<span class="hljs-property">postId</span>) <span class="hljs-keyword">return</span> post;

        <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;TOGGLE_LIKE&#x27;</span>:
            <span class="hljs-keyword">return</span> {
              ...post,
              <span class="hljs-attr">isLikedByUser</span>: !post.<span class="hljs-property">isLikedByUser</span>,
              <span class="hljs-attr">likesCount</span>: post.<span class="hljs-property">isLikedByUser</span> ? post.<span class="hljs-property">likesCount</span> - <span class="hljs-number">1</span> : post.<span class="hljs-property">likesCount</span> + <span class="hljs-number">1</span>,
            };

          <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;REVERT_LIKE&#x27;</span>:
            <span class="hljs-comment">// This handles server failures by reverting optimistic changes</span>
            <span class="hljs-keyword">return</span> {
              ...post,
              <span class="hljs-attr">isLikedByUser</span>: !post.<span class="hljs-property">isLikedByUser</span>,
              <span class="hljs-attr">likesCount</span>: post.<span class="hljs-property">isLikedByUser</span> ? post.<span class="hljs-property">likesCount</span> - <span class="hljs-number">1</span> : post.<span class="hljs-property">likesCount</span> + <span class="hljs-number">1</span>,
            };

          <span class="hljs-attr">default</span>:
            <span class="hljs-comment">// TypeScript will error if we miss any action types</span>
            <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = action;
            <span class="hljs-keyword">return</span> post;
        }
      });
    },
  );

  <span class="hljs-keyword">const</span> toggleLike = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span>) =&gt; {
      <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);

      <span class="hljs-comment">// Apply optimistic update immediately</span>
      <span class="hljs-title function_">addOptimisticAction</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;TOGGLE_LIKE&#x27;</span>, postId });

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/posts/<span class="hljs-subst">\${postId}</span>/like\`</span>, {
          <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
        });

        <span class="hljs-keyword">const</span> <span class="hljs-attr">result</span>: <span class="hljs-title class_">LikeResponse</span> = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

        <span class="hljs-keyword">if</span> (!result.<span class="hljs-property">success</span>) {
          <span class="hljs-comment">// Revert optimistic update on server error</span>
          <span class="hljs-title function_">addOptimisticAction</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;REVERT_LIKE&#x27;</span>, postId });
          <span class="hljs-title function_">setError</span>(result.<span class="hljs-property">error</span>);
        }

        <span class="hljs-comment">// If successful, the server data will eventually update the posts array,</span>
        <span class="hljs-comment">// and useOptimistic will reconcile automatically</span>
      } <span class="hljs-keyword">catch</span> (networkError) {
        <span class="hljs-comment">// Revert on network failure</span>
        <span class="hljs-title function_">addOptimisticAction</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;REVERT_LIKE&#x27;</span>, postId });
        <span class="hljs-title function_">setError</span>(<span class="hljs-string">&#x27;Network error. Please try again.&#x27;</span>);
      }
    },
    [addOptimisticAction],
  );

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">posts</span>: optimisticPosts,
    toggleLike,
    error,
  };
}
</code></pre>
<h2 id="التعامل-مع-حالة-متفائلة-معقدة">التعامل مع حالة متفائلة معقّدة</h2>
<p>بالنسبة للسيناريوهات الأكثر تعقيدًا، قد تحتاج إلى نمذجة أنواع متعددة من التحديثات المتفائلة. لنوسّع مثالنا ليتعامل مع التعليقات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Comment</span> = {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">author</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">OptimisticCommentAction</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_COMMENT&#x27;</span>; <span class="hljs-attr">comment</span>: <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">Comment</span>, <span class="hljs-string">&#x27;id&#x27;</span>&gt; &amp; { <span class="hljs-attr">tempId</span>: <span class="hljs-built_in">string</span> } }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;REMOVE_OPTIMISTIC_COMMENT&#x27;</span>; <span class="hljs-attr">tempId</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CONFIRM_COMMENT&#x27;</span>; <span class="hljs-attr">tempId</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">actualId</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// Extended post type with comments</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">PostWithComments</span> = <span class="hljs-title class_">Post</span> &amp; {
  <span class="hljs-attr">comments</span>: <span class="hljs-title class_">Comment</span>[];
};
</code></pre>
<p>الفكرة الرئيسية هنا: نستخدم <code>tempId</code> للتعليقات المتفائلة و<code>actualId</code> بمجرد تأكيد الخادم لها. يتيح لنا هذا تتبّع التعليقات المؤكدة مقابل تلك قيد الانتظار:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useOptimisticComments</span>(<span class="hljs-params"><span class="hljs-attr">postsWithComments</span>: <span class="hljs-title class_">PostWithComments</span>[]</span>) {
  <span class="hljs-keyword">const</span> [optimisticPosts, addOptimisticAction] = <span class="hljs-title function_">useOptimistic</span>(
    postsWithComments,
    <span class="hljs-function">(<span class="hljs-params">currentPosts, <span class="hljs-attr">action</span>: <span class="hljs-title class_">OptimisticCommentAction</span></span>) =&gt;</span> {
      <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;ADD_COMMENT&#x27;</span>: {
          <span class="hljs-keyword">return</span> currentPosts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span>
            post.<span class="hljs-property">id</span> === action.<span class="hljs-property">comment</span>.<span class="hljs-property">postId</span>
              ? {
                  ...post,
                  <span class="hljs-attr">comments</span>: [
                    ...post.<span class="hljs-property">comments</span>,
                    {
                      <span class="hljs-attr">id</span>: action.<span class="hljs-property">comment</span>.<span class="hljs-property">tempId</span>, <span class="hljs-comment">// Use tempId until confirmed</span>
                      ...action.<span class="hljs-property">comment</span>,
                    } <span class="hljs-keyword">as</span> <span class="hljs-title class_">Comment</span>,
                  ],
                }
              : post,
          );
        }

        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;REMOVE_OPTIMISTIC_COMMENT&#x27;</span>: {
          <span class="hljs-keyword">return</span> currentPosts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span> ({
            ...post,
            <span class="hljs-attr">comments</span>: post.<span class="hljs-property">comments</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">comment</span>) =&gt;</span> comment.<span class="hljs-property">id</span> !== action.<span class="hljs-property">tempId</span>),
          }));
        }

        <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;CONFIRM_COMMENT&#x27;</span>: {
          <span class="hljs-keyword">return</span> currentPosts.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">post</span>) =&gt;</span> ({
            ...post,
            <span class="hljs-attr">comments</span>: post.<span class="hljs-property">comments</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">comment</span>) =&gt;</span>
              comment.<span class="hljs-property">id</span> === action.<span class="hljs-property">tempId</span> ? { ...comment, <span class="hljs-attr">id</span>: action.<span class="hljs-property">actualId</span> } : comment,
            ),
          }));
        }
      }
    },
  );

  <span class="hljs-keyword">const</span> addComment = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">author</span>: <span class="hljs-built_in">string</span>) =&gt; {
      <span class="hljs-keyword">const</span> tempId = <span class="hljs-string">\`temp-<span class="hljs-subst">\${<span class="hljs-built_in">Date</span>.now()}</span>-<span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.random()}</span>\`</span>;

      <span class="hljs-comment">// Optimistically add the comment</span>
      <span class="hljs-title function_">addOptimisticAction</span>({
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;ADD_COMMENT&#x27;</span>,
        <span class="hljs-attr">comment</span>: {
          postId,
          content,
          author,
          <span class="hljs-attr">timestamp</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(),
          tempId,
        },
      });

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/posts/<span class="hljs-subst">\${postId}</span>/comments\`</span>, {
          <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
          <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
          <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ content, author }),
        });

        <span class="hljs-keyword">if</span> (response.<span class="hljs-property">ok</span>) {
          <span class="hljs-keyword">const</span> { id } = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
          <span class="hljs-comment">// Convert the temporary comment to a real one</span>
          <span class="hljs-title function_">addOptimisticAction</span>({
            <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;CONFIRM_COMMENT&#x27;</span>,
            tempId,
            <span class="hljs-attr">actualId</span>: id,
          });
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to post comment&#x27;</span>);
        }
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-comment">// Remove the failed optimistic comment</span>
        <span class="hljs-title function_">addOptimisticAction</span>({
          <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;REMOVE_OPTIMISTIC_COMMENT&#x27;</span>,
          tempId,
        });
      }
    },
    [addOptimisticAction],
  );

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">posts</span>: optimisticPosts, addComment };
}
</code></pre>
<h2 id="المطابقة-مع-حالة-الخادم">المطابقة مع حالة الخادم</h2>
<p>أحد أصعب جوانب التحديثات المتفائلة هو التعامل مع المطابقة عندما تتغير حالة الخادم. تحتاج إلى توخي الحذر بشأن كيفية دمج الحالة المتفائلة مع بيانات الخادم الجديدة.</p>
<p>إليك نمط للتعامل مع هذا باستخدام React Query أو SWR:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useQuery, useMutation, useQueryClient } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tanstack/react-query&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">PostsWithOptimisticUpdates</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> queryClient = <span class="hljs-title function_">useQueryClient</span>();

  <span class="hljs-comment">// Server state</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: serverPosts = [] } = <span class="hljs-title function_">useQuery</span>({
    <span class="hljs-attr">queryKey</span>: [<span class="hljs-string">&#x27;posts&#x27;</span>],
    <span class="hljs-attr">queryFn</span>: fetchPosts,
  });

  <span class="hljs-comment">// Optimistic state built on top of server state</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-attr">posts</span>: optimisticPosts, toggleLike } = <span class="hljs-title function_">useOptimisticLikes</span>(serverPosts);

  <span class="hljs-keyword">const</span> likeMutation = <span class="hljs-title function_">useMutation</span>({
    <span class="hljs-attr">mutationFn</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">postId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title function_">likePost</span>(postId),
    <span class="hljs-attr">onSuccess</span>: <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Refetch to ensure we have the latest server state</span>
      queryClient.<span class="hljs-title function_">invalidateQueries</span>({ <span class="hljs-attr">queryKey</span>: [<span class="hljs-string">&#x27;posts&#x27;</span>] });
    },
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {optimisticPosts.map(post =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">PostCard</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span>
          <span class="hljs-attr">post</span>=<span class="hljs-string">{post}</span>
          <span class="hljs-attr">onLike</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleLike(post.id)}
        /&gt;
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>عند تحديث بيانات الخادم، يُطابِق <code>useOptimistic</code> تلقائيًا عن طريق تطبيق أي إجراءات متفائلة معلّقة على حالة الخادم الجديدة. وهذا يعني أن تحديثاتك المتفائلة «تلتصق» حتى تُلغى صراحةً.</p>
</blockquote>
<h2 id="أنماط-معالجة-الأخطاء">أنماط معالجة الأخطاء</h2>
<p>تتطلب التحديثات المتفائلة القوية معالجة مدروسة للأخطاء. إليك بعض الأنماط التي تعمل جيدًا:</p>
<h3 id="التدهور-الرشيق">التدهور الرشيق</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useResilientOptimisticUpdates&lt;T, A&gt;(
  <span class="hljs-attr">serverState</span>: T,
  <span class="hljs-attr">reducer</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">state</span>: T, <span class="hljs-attr">action</span>: A</span>) =&gt;</span> T,
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">onError</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>, <span class="hljs-attr">action</span>: A</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-attr">maxRetries</span>?: <span class="hljs-built_in">number</span>;
  } = {},
) {
  <span class="hljs-keyword">const</span> [optimisticState, addOptimisticAction] = <span class="hljs-title function_">useOptimistic</span>(serverState, reducer);
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">Error</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

  <span class="hljs-keyword">const</span> performOptimisticAction = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (
      <span class="hljs-attr">action</span>: A,
      <span class="hljs-attr">apiCall</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;,
      <span class="hljs-attr">actionId</span>: <span class="hljs-built_in">string</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(),
    ) =&gt; {
      <span class="hljs-comment">// Clear any previous errors for this action</span>
      <span class="hljs-title function_">setErrors</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev);
        next.<span class="hljs-title function_">delete</span>(actionId);
        <span class="hljs-keyword">return</span> next;
      });

      <span class="hljs-comment">// Apply optimistic update</span>
      <span class="hljs-title function_">addOptimisticAction</span>(action);

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">apiCall</span>();
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-comment">// Store the error and revert the action</span>
        <span class="hljs-title function_">setErrors</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(actionId, error <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>));
        options.<span class="hljs-property">onError</span>?.(error <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>, action);

        <span class="hljs-comment">// You might apply a revert action here depending on your setup</span>
      }
    },
    [addOptimisticAction, options],
  );

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">state</span>: optimisticState,
    performOptimisticAction,
    errors,
    <span class="hljs-attr">hasErrors</span>: errors.<span class="hljs-property">size</span> &gt; <span class="hljs-number">0</span>,
  };
}
</code></pre>
<h3 id="منطق-إعادة-المحاولة">منطق إعادة المحاولة</h3>
<p>بالنسبة للإجراءات الحرجة، قد ترغب في إعادة المحاولة تلقائيًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> withRetry&lt;T&gt;(<span class="hljs-attr">operation</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;T&gt;, maxRetries = <span class="hljs-number">3</span>, delay = <span class="hljs-number">1000</span>): <span class="hljs-title class_">Promise</span>&lt;T&gt; {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">lastError</span>: <span class="hljs-title class_">Error</span>;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> attempt = <span class="hljs-number">0</span>; attempt &lt;= maxRetries; attempt++) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">operation</span>();
    } <span class="hljs-keyword">catch</span> (error) {
      lastError = error <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>;

      <span class="hljs-keyword">if</span> (attempt === maxRetries) <span class="hljs-keyword">break</span>;

      <span class="hljs-comment">// Exponential backoff</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, delay * <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">2</span>, attempt)));
    }
  }

  <span class="hljs-keyword">throw</span> lastError!;
}
</code></pre>
<h2 id="اختبار-التحديثات-المتفائلة">اختبار التحديثات المتفائلة</h2>
<p>يتطلب اختبار السلوك المتفائل محاكاة سيناريوهات النجاح والفشل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { render, screen, fireEvent, waitFor } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@testing-library/react&#x27;</span>;
<span class="hljs-keyword">import</span> { vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;OptimisticLikes&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;shows immediate feedback on like&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> mockLikePost = vi.<span class="hljs-title function_">fn</span>().<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> });

    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PostWithLikes</span> <span class="hljs-attr">onLike</span>=<span class="hljs-string">{mockLikePost}</span> <span class="hljs-attr">initialLikes</span>=<span class="hljs-string">{5}</span> /&gt;</span></span>);

    <span class="hljs-keyword">const</span> likeButton = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/like/i</span> });

    <span class="hljs-comment">// Should show optimistic update immediately</span>
    fireEvent.<span class="hljs-title function_">click</span>(likeButton);
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;6 likes&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

    <span class="hljs-comment">// Server call should happen</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(mockLikePost).<span class="hljs-title function_">toHaveBeenCalled</span>();
    });
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;reverts on server failure&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> mockLikePost = vi.<span class="hljs-title function_">fn</span>().<span class="hljs-title function_">mockRejectedValue</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Server error&#x27;</span>));

    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">PostWithLikes</span> <span class="hljs-attr">onLike</span>=<span class="hljs-string">{mockLikePost}</span> <span class="hljs-attr">initialLikes</span>=<span class="hljs-string">{5}</span> /&gt;</span></span>);

    <span class="hljs-keyword">const</span> likeButton = screen.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-regexp">/like/i</span> });

    fireEvent.<span class="hljs-title function_">click</span>(likeButton);
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;6 likes&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();

    <span class="hljs-comment">// Should revert after server failure</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">waitFor</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;5 likes&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
    });

    <span class="hljs-comment">// Should show error message</span>
    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-regexp">/error/i</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });
});
</code></pre>
<h2 id="اعتبارات-من-العالم-الواقعي">اعتبارات من العالم الواقعي</h2>
<p>عند تنفيذ التحديثات المتفائلة في تطبيقات الإنتاج، ضع هذه الأنماط في الاعتبار:</p>
<h3 id="حل-التضارب">حل التضارب</h3>
<p>عندما يُعدّل مستخدمون متعددون نفس البيانات في الوقت نفسه، تحتاج إلى استراتيجيات للتعامل مع التضارب:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ConflictResolution</span> = <span class="hljs-string">&#x27;server-wins&#x27;</span> | <span class="hljs-string">&#x27;client-wins&#x27;</span> | <span class="hljs-string">&#x27;merge&#x27;</span> | <span class="hljs-string">&#x27;prompt-user&#x27;</span>;

<span class="hljs-keyword">function</span> resolveOptimisticConflict&lt;T&gt;(
  <span class="hljs-attr">serverVersion</span>: T,
  <span class="hljs-attr">optimisticVersion</span>: T,
  <span class="hljs-attr">strategy</span>: <span class="hljs-title class_">ConflictResolution</span>,
): T {
  <span class="hljs-keyword">switch</span> (strategy) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;server-wins&#x27;</span>:
      <span class="hljs-keyword">return</span> serverVersion;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;client-wins&#x27;</span>:
      <span class="hljs-keyword">return</span> optimisticVersion;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;merge&#x27;</span>:
      <span class="hljs-comment">// Custom merge logic based on your data structure</span>
      <span class="hljs-keyword">return</span> { ...serverVersion, ...optimisticVersion };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;prompt-user&#x27;</span>:
      <span class="hljs-comment">// Show a UI dialog for manual resolution</span>
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">ConflictError</span>(serverVersion, optimisticVersion);

    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">const</span> <span class="hljs-attr">_exhaustive</span>: <span class="hljs-built_in">never</span> = strategy;
      <span class="hljs-keyword">return</span> serverVersion;
  }
}
</code></pre>
<h3 id="اعتبارات-عرض-النطاق-الترددي">اعتبارات عرض النطاق الترددي</h3>
<p>بالنسبة للمستخدمين على اتصالات بطيئة، فكر في تجميع التحديثات المتفائلة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> useBatchedOptimisticUpdates&lt;T&gt;(
  batchWindow = <span class="hljs-number">500</span>, <span class="hljs-comment">// ms</span>
) {
  <span class="hljs-keyword">const</span> [pendingActions, setPendingActions] = useState&lt;T[]&gt;([]);
  <span class="hljs-keyword">const</span> timeoutRef = useRef&lt;<span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span>&gt;();

  <span class="hljs-keyword">const</span> addAction = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">action</span>: T</span>) =&gt;</span> {
      <span class="hljs-title function_">setPendingActions</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, action]);

      <span class="hljs-comment">// Clear existing timeout</span>
      <span class="hljs-keyword">if</span> (timeoutRef.<span class="hljs-property">current</span>) {
        <span class="hljs-built_in">clearTimeout</span>(timeoutRef.<span class="hljs-property">current</span>);
      }

      <span class="hljs-comment">// Set new timeout to flush batch</span>
      timeoutRef.<span class="hljs-property">current</span> = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">flushPendingActions</span>();
      }, batchWindow);
    },
    [batchWindow],
  );

  <span class="hljs-comment">// Implementation details for flushing...</span>
}
</code></pre>
<h3 id="سهولة-الوصول">سهولة الوصول</h3>
<p>لا تنسَ الإعلان عن تغيّرات الحالة المتفائلة لقارئات الشاشة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useOptimisticAnnouncements</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> announce = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> announcement = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>);
    announcement.<span class="hljs-title function_">setAttribute</span>(<span class="hljs-string">&#x27;aria-live&#x27;</span>, <span class="hljs-string">&#x27;polite&#x27;</span>);
    announcement.<span class="hljs-title function_">setAttribute</span>(<span class="hljs-string">&#x27;aria-atomic&#x27;</span>, <span class="hljs-string">&#x27;true&#x27;</span>);
    announcement.<span class="hljs-property">className</span> = <span class="hljs-string">&#x27;sr-only&#x27;</span>; <span class="hljs-comment">// Screen reader only</span>
    announcement.<span class="hljs-property">textContent</span> = message;

    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(announcement);

    <span class="hljs-comment">// Clean up after announcement</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">removeChild</span>(announcement);
    }, <span class="hljs-number">1000</span>);
  }, []);

  <span class="hljs-keyword">return</span> { announce };
}
</code></pre>
<h2 id="الخاتمة">الخاتمة</h2>
<p>يمكن للتحديثات المتفائلة باستخدام <code>useOptimistic</code> أن تحسّن بشكل كبير الأداء الظاهر، لكنها تتطلب نمذجة مدروسة بـ TypeScript للتعامل مع الحالات الاستثنائية برفق. المبادئ الرئيسية التي يجب تذكّرها:</p>
<ol>
<li><strong>نمذج إجراءاتك صراحةً</strong> باستخدام اتحادات مميّزة</li>
<li><strong>خطّط للفشل</strong> بآليات التراجع</li>
<li><strong>اختبر المسار السعيد ومسار الفشل</strong> بدقة</li>
<li><strong>فكّر في المطابقة</strong> عند تحديث حالة الخادم</li>
<li><strong>تعامل مع التضاربات</strong> بين الحالة المتفائلة وحالة الخادم</li>
</ol>
<p>عندما تُنفّذ بحكمة، تُنشئ التحديثات المتفائلة واجهات سريعة الاستجابة بشكل رائع تشعر المستخدمين بأنها فورية، مع الحفاظ على سلامة البيانات خلف الكواليس. تضمن شبكة الأمان من TypeScript اكتشاف الحالات الاستثنائية أثناء الترجمة بدلًا من الإنتاج—لأنّه لا شيء يُفسد تجربة التفاؤل مثل خطأ وقت التشغيل.</p>
<p>تتوسّع الأنماط التي استكشفناها هنا من أزرار «الإعجاب» البسيطة إلى سيناريوهات التحرير التعاوني المعقّدة. ابدأ بالأساسيات، وأضف التعقيد عند الحاجة، وتذكّر دائمًا: التفاؤل رائع، لكن قليلًا من التخطيط المتشائم يقطع شوطًا طويلًا.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,t as slug,p as title};
