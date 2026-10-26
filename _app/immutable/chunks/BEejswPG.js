const s="tanstack-router",t="router",n="دورة TanStack Router الكاملة",e="nesting-routes",a="تداخل المسارات (Nesting Routes)",o=[{depth:2,id:"ماذا-سنتعلم",text:"ماذا سنتعلّم؟"},{depth:2,id:"الشرح",text:"الشرح"},{depth:3,id:"تداخل-المسارات-بالمجلدات",text:"تداخل المسارات بالمجلّدات"},{depth:3,id:"settings-وحده-ملف-indextsx",text:"/settings وحده: ملف index.tsx"},{depth:3,id:"settings-تخطيطا-يجمع-أبناءه-ملف-routetsx",text:"/settings تخطيطًا يجمع أبناءه: ملف route.tsx"},{depth:3,id:"التنقل-داخل-الإعدادات",text:"التنقّل داخل الإعدادات"},{depth:3,id:"مسار-يشارك-العنوان-ولا-يرث-الواجهة-مجلد-settings",text:"مسارٌ يشارك العنوان ولا يرث الواجهة: مجلّد settings_"},{depth:2,id:"النتيجة",text:"النتيجة"},{depth:2,id:"جرب-بنفسك",text:"جرّب بنفسك"},{depth:2,id:"المراجع",text:"المراجع"}],l=`<h2 id="ماذا-سنتعلم">ماذا سنتعلّم؟</h2>
<p>في الدرس السابق نقلنا الموجّه إلى الأسلوب المعتمد على الملفات، فصار لكلّ مسارٍ ملفٌّ داخل <code>src/routes/</code>. ويطالعنا في هذا الدرس سؤالان: كيف نجمع عدّة صفحات تحت أبٍ واحد يعرض واجهةً مشتركة، مثل <code>/settings</code> الذي تحت صفحاتُ الملف الشخصي والدفع؟ وكيف نجعل صفحةً داخل صفحةً أخرى في عنوانها؟</p>
<p>الإجابة في هذا الدرس بالمجلّدات: مجلّدٌ داخل مجلّد المسارات، وملفاتٌ داخله. وسنرى فيه مقارنةً بين طريقتين لتحصيل <code>/settings</code> نفسه: ملف <code>index.tsx</code> الذي يجعله صفحةً مستقلّةً لا علاقة لها ببناتها، وملف <code>route.tsx</code> الذي يجعله تخطيطًا يحيط ببناته ويعرضهم في <code>&lt;Outlet /&gt;</code>. وننتهي إلى حيلةٍ تجعل العنوانَ يبدأ بـ <code>/settings</code> لكنّه لا يرث واجهةَ <code>settings</code>.</p>
<h2 id="الشرح">الشرح</h2>
<h3 id="تداخل-المسارات-بالمجلدات">تداخل المسارات بالمجلّدات</h3>
<p>للتداخل طريقتان في TanStack Router: تداخلُ المجلّدات، أو تسميةُ الملفّ على نحوٍ يدلّ على أنّه داخل مسارٍ آخر. نبدأ بالأولى لأنّها الأبسط والأوضح، وهي أيضًا التي تناسب أغلب التطبيقات.</p>
<p>أنشئ داخل <code>src/routes/</code> مجلّدًا اسمه <code>settings</code>، وضع فيه ملفَّي <code>profile.tsx</code> و<code>payment.tsx</code>:</p>
<ul>
<li><code>src/routes/settings/profile.tsx</code> — العنوان <code>/settings/profile</code></li>
<li><code>src/routes/settings/payment.tsx</code> — العنوان <code>/settings/payment</code></li>
</ul>
<p>المولِّد يكتب في كلّ ملف سطرَ تعريف المسار، ويبدأ العنوان تلقائيًا باسم المجلّد:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/settings/profile&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-amber-700 border-2&quot;</span>&gt;</span>Hello &quot;/settings/profile&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحظ أنّنا لم نكتب <code>/settings/profile</code> بيدنا ولا مرّة: المولِّد تركّبه من اسم المجلّد واسم الملف. والصفحةُ الثانية تُكتب بالطريقة نفسها:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/settings/payment&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 bg-amber-700 border-2&quot;</span>&gt;</span>Hello &quot;/settings/payment&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>الآن افتح أدوات المطوّر في التطبيق، وستجد في شجرة المسارات <code>settings/profile</code> و<code>settings/payment</code>، لكنّك لن تجد <code>settings</code> وحدها. أي أنّ فتح العنوان <code>/settings</code> لا يطابق شيئًا، لأنّه لا مسارَ يحمل هذا العنوان بالضبط.</p>
<h3 id="settings-وحده-ملف-indextsx"><code>/settings</code> وحده: ملف <code>index.tsx</code></h3>
<p>الحلُّ الأوّل أن نضيف داخل المجلّد ملفًا اسمه <code>index.tsx</code>، فيتولّد له مسارٌ بعنوان <code>/settings</code> ينتهي بشرطةٍ مائلة. وهذا الشرطُ المائل مقصود: المسارُ لا يُطابَق إلّا إذا كان عنوان الصفحة <code>/settings</code> بالضبط، لا <code>/settings/…</code> مع أيّ شيءٍ بعده.</p>
<p>لكنّ هذا الحلّ يجعل <code>settings</code> صفحةً مستقلّةً في شجرة المسارات: شقيقةً لـ <code>settings/profile</code> و<code>settings/payment</code> لا أمًّا لهما. فحين تفتح <code>/settings/profile</code> لا تُصيَّر صفحة <code>settings</code> ولا يظهر شيءٌ من محتواها، لأنّها ليست جزءًا من ذلك المسار. وفي أدوات المطوّر تراها شقيقةً للاثنين لا أمًّا لهما.</p>
<h3 id="settings-تخطيطا-يجمع-أبناءه-ملف-routetsx"><code>/settings</code> تخطيطًا يجمع أبناءه: ملف <code>route.tsx</code></h3>
<p>بدلًا من <code>index.tsx</code> نضع داخل المجلّد ملفًّا اسمه <code>route.tsx</code>. الملفُّ بهذا الاسم يجعل المسارَ أبًا حقيقيًا، ويلتقط كلَّ عنوانٍ يبدأ بـ <code>/settings</code> بما في ذلك <code>/settings</code> نفسها:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute, <span class="hljs-title class_">Link</span>, <span class="hljs-title class_">Outlet</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/settings&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      Hello &quot;/settings/&quot;!
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;p-2 flex gap-2 mb-4 bg-yellow-600 border-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/settings/payment&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Payment
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>{&quot; &quot;}
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/settings/profile&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;[&amp;.active]:font-bold&quot;</span>&gt;</span>
          Profile
        <span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Outlet</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>ثلاثةُ أمورٍ تغيّرت مقارنةً بالملف السابق:</p>
<ol>
<li><strong>العنوان المولَّد</strong> لم يعد منتهيًا بشرطةٍ مائلة، فصار المسارُ يطابق كلَّ عنوانٍ يبدأ بـ <code>/settings</code> وعلى رأسه <code>/settings</code> نفسها.</li>
<li><strong><code>&lt;Outlet /&gt;</code> صار ضرورة</strong>، لأنّ المكوّن صار أبًا: فبدونه يبقى الإطارُ الأمّ معروضًا وفارغًا من محتوى الابن.</li>
<li><strong>شريطُ تنقّلٍ مشترك</strong> أُضيف إلى المكوّن الأمّ، فيه رابطان إلى <code>Payment</code> و<code>Profile</code>، فيظهر أعلى كلّ صفحةٍ من صفحات الإعدادات.</li>
</ol>
<h3 id="التنقل-داخل-الإعدادات">التنقّل داخل الإعدادات</h3>
<p>النتيجةُ العملية أنّ مكوّن <code>route.tsx</code> يبقى معروضًا في كلّ مرّة تنتقل فيها داخل <code>/settings</code>، فصار المكانَ الطبيعيّ لروابط التنقّل بين الصفحات الفرعية. ولهذا وُضع شريطُ <code>Payment</code> و<code>Profile</code> فيه بالضبط.</p>
<p>ولأنّنا صرنا نستخدم عناوينَ أكثر، صارت هذه العناوين تظهر في اقتراحات المحرّر أثناء كتابة روابطٍ جديدة، فتكتب <code>/settings/profile</code> فيتلقّاها المحرّر دون أن تحفظه.</p>
<h3 id="مسار-يشارك-العنوان-ولا-يرث-الواجهة-مجلد-settings">مسارٌ يشارك العنوان ولا يرث الواجهة: مجلّد <code>settings_</code></h3>
<p>قد تحتاج إلى صفحةٍ عنوانها يبدأ بـ <code>/settings</code> لكنّك لا تريد أن ترث واجهةَ <code>settings</code> ولا شريطَ تنقّلها. والمشكلةُ أنّ أيّ ملفٍّ داخل مجلّد <code>settings</code> يُعامَل على أنّه ابنٌ لـ <code>settings</code>، فلا مفرّ من ذلك. والحلُّ أن تُنشئ مجلّدًا موازيًا اسمه <code>settings_</code> بشرطةٍ سفليةٍ في آخره، وتضع فيه ملف <code>password.tsx</code>:</p>
<ul>
<li><code>src/routes/settings_/password.tsx</code> — العنوان <code>/settings/password</code>، لكنّه ابنُ الجذر لا ابنُ <code>settings</code></li>
</ul>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { createFileRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@tanstack/react-router&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Route</span> = <span class="hljs-title function_">createFileRoute</span>(<span class="hljs-string">&quot;/settings_/password&quot;</span>)({
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">RouteComponent</span>,
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RouteComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello &quot;/settings/passwrod&quot;!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>انظر إلى العنوان المولَّد داخل الملف: <code>createFileRoute(&quot;/settings_/password&quot;)</code>. الشرطةُ السفلية باقيةٌ في هذا المعرّف الداخليّ، لكنّها لا تظهر في عنوان الصفحة: العنوانُ في المتصفّح يبقى <code>/settings/password</code>، والشرطُ الوحيد أنّ الملفَ لا يُعامَل على أنّه داخل <code>settings</code>، فلا يرث شريطَ التنقّل ولا نصَّه. (ولن تنتبه إلى خطأٍ إملائيٍّ صغير في النصّ المعروض داخل المكوّن، فهو موجودٌ في فرع الدرس كما هو.)</p>
<h2 id="النتيجة">النتيجة</h2>
<p><img src="/arabic-cs-library/images/tanstack-router/router--nesting-routes--settings-profile.png" alt="صفحة الملف الشخصي داخل الإعدادات، مع تخطيط settings وشريط التنقّل المشترك في الأعلى"></p>
<p>في الصورة: أوّلًا يظهر تخطيطُ <code>settings</code> — أي نصّه وشريطُ التنقّل الأصفرُ فيه رابطان إلى <code>Payment</code> و<code>Profile</code> — ثم تحته صفحةُ الملف الشخصي في مستطيلها الكهرماني. ولو فتحتَ <code>/settings/payment</code> لتبدّل المكوّن الأخير وحده وبقي الشريطُ والتخطيطُ كما هما، لأنّهما في المسار الأب.</p>
<h2 id="جرب-بنفسك">جرّب بنفسك</h2>
<ol>
<li>أنشئ مجلّد <code>src/routes/settings/</code> وضع فيه <code>profile.tsx</code> و<code>payment.tsx</code>، ولاحظ المسارات المولَّدة في كلّ ملف.</li>
<li>أضف <code>src/routes/settings/route.tsx</code> فيه <code>&lt;Outlet /&gt;</code> وشريطُ تنقّل، وامسح <code>index.tsx</code> إن كنت أضفته.</li>
<li>أنشئ <code>src/routes/settings_/password.tsx</code> وقارن بينه وبين ملفّات مجلّد <code>settings</code> في شجرة أدوات المطوّر.</li>
<li>شغّل <code>npm run dev</code>، ثم تصفّح <code>/settings</code> و<code>/settings/profile</code> و<code>/settings/payment</code> و<code>/settings/password</code> ولاحظ أيُّها يعرض الشريطَ المشترك وأيُّها لا يعرضه.</li>
</ol>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://www.youtube.com/watch?v=8_sGz4DHwIA&amp;t=1647s">فيديو الدرس: Nesting Routes</a></li>
<li><a href="https://github.com/alialaa/tanstack-router-course/tree/nesting-routes">شيفرة الدرس: فرع nesting-routes</a></li>
<li><a href="https://tanstack.com/router/latest/docs/framework/react/overview">التوثيق الرسمي لـ TanStack Router</a></li>
</ul>
<hr>
<blockquote>
<p>هذا الدرس شرحٌ عربيٌّ مُعَدّ عن درس «Nesting Routes» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع المستودع الأصلي، والروابط تشير إلى المصدر الرسمي.</p>
</blockquote>
`,c={book:s,chapter:t,chapterTitle:n,slug:e,title:a,headings:o,html:l};export{s as book,t as chapter,n as chapterTitle,c as default,o as headings,l as html,e as slug,a as title};
