const e="kinney",s="openclaw",n="OpenClaw: مساعدك الذكي الشخصي",t="openclaw-browser-prompts",a="طلبات متصفح OpenClaw",i=[],o=`<p>تفترض هذه الطلبات أن المتصفح مُهيّأ بالفعل. وإن لم تكن قد شغّلته بعد، فابدأ بـ<a href="https://stevekinney.com/courses/openclaw/browser-setup-and-use">تهيئة المتصفح واستخدامه</a>.</p>
<p>وإليك طلبًا نموذجيًا قد تفكّر في استخدامه:</p>
<pre><code class="language-markdown">Open GitHub Trending at https://github.com/trending.

Find the 10 most interesting repositories related to AI agents, developer tooling, or automation.

For each repository:

<span class="hljs-bullet">-</span> Open its repository page.
<span class="hljs-bullet">-</span> Read its README.
<span class="hljs-bullet">-</span> Check its recent activity and open issues.
<span class="hljs-bullet">-</span> Determine what makes it interesting or technically distinctive.
<span class="hljs-bullet">-</span> Identify potential shortcomings or limitations.

Rank the repositories by how useful they might be for someone building sophisticated AI agent workflows.

Produce a report containing a comparison table, links, and your top three recommendations.

Use the browser to navigate the actual GitHub interface. Don&#x27;t substitute web search. Explain what you&#x27;re doing as you navigate, and take screenshots of three interesting discoveries.
</code></pre>
<p>وإليك كيف تبدو جولة تشغيل. فلوحة المتصفح على اليمين تُظهر الوكيل في صفحة إصدارات مستودع، بينما تحمل الدردشة على اليسار جدول المقارنة والتوصية الأولى.</p>
<p><img src="/arabic-cs-library/images/kinney/c496ba2e3ce7636c.webp" alt="دردشة Control UI مع جدول مقارنة لثلاثة مستودعات رائجة وتوصية أولى، إلى جانب لوحة متصفح جانبية تعرض صفحة إصدارات على GitHub"></p>
<p>أو إليك واحدًا أكثر متعة:</p>
<pre><code class="language-markdown">You are a senior QA engineer evaluating a web application.

Open https://todomvc.com/examples/react/dist/.

Your task is to explore the application and discover its functionality without being given a test plan.

First, inspect the interface and identify the available features.

Then design and execute a comprehensive exploratory test plan using the browser.

Test:

<span class="hljs-bullet">-</span> Creating tasks
<span class="hljs-bullet">-</span> Editing existing tasks
<span class="hljs-bullet">-</span> Completing and reopening tasks
<span class="hljs-bullet">-</span> Filtering active and completed tasks
<span class="hljs-bullet">-</span> Deleting tasks
<span class="hljs-bullet">-</span> Clearing completed tasks
<span class="hljs-bullet">-</span> Persistence across page reloads
<span class="hljs-bullet">-</span> Keyboard interactions
<span class="hljs-bullet">-</span> Edge cases involving empty input and unusual characters

For each test, record the expected behavior, observed behavior, and pass/fail result.
Capture screenshots of any unexpected behavior.

Finish with a QA report containing:

<span class="hljs-bullet">-</span> Features discovered
<span class="hljs-bullet">-</span> Tests executed
<span class="hljs-bullet">-</span> Bugs or inconsistencies identified
<span class="hljs-bullet">-</span> Reproduction steps for each issue
<span class="hljs-bullet">-</span> Recommendations for improving the application

<span class="hljs-strong">**Important**</span>: Actually interact with the application using browser tools. Do not infer behavior from the source code or documentation. Never report a test as passing unless you executed it.
</code></pre>
`,l={book:e,chapter:s,chapterTitle:n,slug:t,title:a,headings:i,html:o};export{e as book,s as chapter,n as chapterTitle,l as default,i as headings,o as html,t as slug,a as title};
