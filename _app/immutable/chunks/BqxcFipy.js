const s="hono",t="middleware-builtin",n="الوسائط المدمجة",a="language",e="البرمجية الوسيطة Language",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام-الأساسي",text:"الاستخدام الأساسي"},{depth:3,id:"أمثلة-العميل",text:"أمثلة العميل"},{depth:2,id:"التكوين-الافتراضي",text:"التكوين الافتراضي"},{depth:2,id:"السلوكيات-الأساسية",text:"السلوكيات الأساسية"},{depth:3,id:"سير-عمل-الاكتشاف",text:"سير عمل الاكتشاف"},{depth:2,id:"التكوين-المتقدم",text:"التكوين المتقدم"},{depth:3,id:"ترتيب-اكتشاف-مخصص",text:"ترتيب اكتشاف مخصص"},{depth:3,id:"المطابقة-التدريجية-للغة",text:"المطابقة التدريجية للغة"},{depth:3,id:"تحويل-رمز-اللغة",text:"تحويل رمز اللغة"},{depth:3,id:"تكوين-ملفات-تعريف-الارتباط",text:"تكوين ملفات تعريف الارتباط"},{depth:3,id:"التصحيح",text:"التصحيح"},{depth:2,id:"مرجع-الخيارات",text:"مرجع الخيارات"},{depth:3,id:"الخيارات-الأساسية",text:"الخيارات الأساسية"},{depth:3,id:"خيارات-الاكتشاف",text:"خيارات الاكتشاف"},{depth:3,id:"خيارات-ملفات-تعريف-الارتباط",text:"خيارات ملفات تعريف الارتباط"},{depth:3,id:"خيارات-متقدمة",text:"خيارات متقدمة"},{depth:2,id:"التحقق-ومعالجة-الأخطاء",text:"التحقق ومعالجة الأخطاء"},{depth:2,id:"وصفات-شائعة",text:"وصفات شائعة"},{depth:3,id:"التوجيه-على-أساس-المسار",text:"التوجيه على أساس المسار"},{depth:3,id:"لغات-متعددة-مدعومة",text:"لغات متعددة مدعومة"}],p=`<p>يحدد وسيط كاشف اللغة (Language Detector) تلقائيًا اللغة المفضلة للمستخدم (locale) من مصادر مختلفة ويجعلها متاحة عبر <code>c.get('language')</code>. تشمل استراتيجيات الكشف معاملات الاستعلام (query parameters) وملفات تعريف الارتباط والترويسات ومقاطع مسار URL. مثالية للتدويل (i18n) والمحتوى الخاص باللغة (locale).</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { languageDetector } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/language&#x27;</span>
</code></pre>
<h2 id="الاستخدام-الأساسي">الاستخدام الأساسي</h2>
<p>اكتشف اللغة من سلسلة الاستعلام (query string) وملف تعريف الارتباط والترويسة (بالترتيب الافتراضي)، مع الرجوع إلى الإنجليزية كبديل:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">languageDetector</span>({
    <span class="hljs-attr">supportedLanguages</span>: [<span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-string">&#x27;ar&#x27;</span>, <span class="hljs-string">&#x27;ja&#x27;</span>], <span class="hljs-comment">// Must include fallback</span>
    <span class="hljs-attr">fallbackLanguage</span>: <span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-comment">// Required</span>
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> lang = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;language&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Hello! Your language is <span class="hljs-subst">\${lang}</span>\`</span>)
})
</code></pre>
<h3 id="أمثلة-العميل">أمثلة العميل</h3>
<pre><code class="language-sh"><span class="hljs-comment"># Via path</span>
curl http://localhost:8787/ar/home

<span class="hljs-comment"># Via query parameter</span>
curl http://localhost:8787/?lang=ar

<span class="hljs-comment"># Via cookie</span>
curl -H <span class="hljs-string">&#x27;Cookie: language=ja&#x27;</span> http://localhost:8787/

<span class="hljs-comment"># Via header</span>
curl -H <span class="hljs-string">&#x27;Accept-Language: ar,en;q=0.9&#x27;</span> http://localhost:8787/
</code></pre>
<h2 id="التكوين-الافتراضي">التكوين الافتراضي</h2>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">DEFAULT_OPTIONS</span>: <span class="hljs-title class_">DetectorOptions</span> = {
  <span class="hljs-attr">order</span>: [<span class="hljs-string">&#x27;querystring&#x27;</span>, <span class="hljs-string">&#x27;cookie&#x27;</span>, <span class="hljs-string">&#x27;header&#x27;</span>],
  <span class="hljs-attr">lookupQueryString</span>: <span class="hljs-string">&#x27;lang&#x27;</span>,
  <span class="hljs-attr">lookupCookie</span>: <span class="hljs-string">&#x27;language&#x27;</span>,
  <span class="hljs-attr">lookupFromHeaderKey</span>: <span class="hljs-string">&#x27;accept-language&#x27;</span>,
  <span class="hljs-attr">lookupFromPathIndex</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">caches</span>: [<span class="hljs-string">&#x27;cookie&#x27;</span>],
  <span class="hljs-attr">ignoreCase</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">fallbackLanguage</span>: <span class="hljs-string">&#x27;en&#x27;</span>,
  <span class="hljs-attr">supportedLanguages</span>: [<span class="hljs-string">&#x27;en&#x27;</span>],
  <span class="hljs-attr">cookieOptions</span>: {
    <span class="hljs-attr">sameSite</span>: <span class="hljs-string">&#x27;Strict&#x27;</span>,
    <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">maxAge</span>: <span class="hljs-number">365</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,
    <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">debug</span>: <span class="hljs-literal">false</span>,
}
</code></pre>
<h2 id="السلوكيات-الأساسية">السلوكيات الأساسية</h2>
<h3 id="سير-عمل-الاكتشاف">سير عمل الاكتشاف</h3>
<ol>
<li>
<p><strong>الترتيب (Order)</strong>: يفحص المصادر بهذا التسلسل افتراضياً:</p>
<ul>
<li>معامل الاستعلام (?lang=ar)</li>
<li>ملف تعريف الارتباط (language=ar)</li>
<li>ترويسة Accept-Language</li>
</ul>
</li>
<li>
<p><strong>التخزين المؤقت (Caching)</strong>: يخزّن اللغة المكتشفة في ملف تعريف ارتباط (cookie) (سنة واحدة افتراضيًا)</p>
</li>
<li>
<p><strong>الاحتياطي</strong>: يستخدم <code>fallbackLanguage</code> إذا لم يكن هناك اكتشاف صالح (يجب أن يكون في <code>supportedLanguages</code>)</p>
</li>
</ol>
<h2 id="التكوين-المتقدم">التكوين المتقدم</h2>
<h3 id="ترتيب-اكتشاف-مخصص">ترتيب اكتشاف مخصص</h3>
<p>أعطِ الأولوية لكشف مسار URL (مثل /en/about):</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">languageDetector</span>({
    <span class="hljs-attr">order</span>: [<span class="hljs-string">&#x27;path&#x27;</span>, <span class="hljs-string">&#x27;cookie&#x27;</span>, <span class="hljs-string">&#x27;querystring&#x27;</span>, <span class="hljs-string">&#x27;header&#x27;</span>],
    <span class="hljs-attr">lookupFromPathIndex</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// /en/profile → index 0 = &#x27;en&#x27;</span>
    <span class="hljs-attr">supportedLanguages</span>: [<span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-string">&#x27;ar&#x27;</span>],
    <span class="hljs-attr">fallbackLanguage</span>: <span class="hljs-string">&#x27;en&#x27;</span>,
  })
)
</code></pre>
<h3 id="المطابقة-التدريجية-للغة">المطابقة التدريجية للغة</h3>
<p>عندما يكون رمز لغة مكتشف مثل <code>ja-JP</code> ليس في <code>supportedLanguages</code>، يقوم الوسيط (middleware) باقتطاع العلامات الفرعية (subtags) تدريجيًا للعثور على تطابق. على سبيل المثال، <code>zh-Hant-CN</code> سيحاول <code>zh-Hant</code>، ثم <code>zh</code>. تُفضَّل المطابقة التامة دائمًا.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">languageDetector</span>({
    <span class="hljs-attr">supportedLanguages</span>: [<span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-string">&#x27;ja&#x27;</span>, <span class="hljs-string">&#x27;zh-Hant&#x27;</span>],
    <span class="hljs-attr">fallbackLanguage</span>: <span class="hljs-string">&#x27;en&#x27;</span>,
  })
)

<span class="hljs-comment">// Accept-Language: ja-JP → matches &#x27;ja&#x27;</span>
<span class="hljs-comment">// Accept-Language: zh-Hant-CN → matches &#x27;zh-Hant&#x27;</span>
</code></pre>
<h3 id="تحويل-رمز-اللغة">تحويل رمز اللغة</h3>
<p>وحّد الرموز المعقّدة (مثل en-US → en):</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">languageDetector</span>({
    <span class="hljs-attr">convertDetectedLanguage</span>: <span class="hljs-function">(<span class="hljs-params">lang</span>) =&gt;</span> lang.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;-&#x27;</span>)[<span class="hljs-number">0</span>],
    <span class="hljs-attr">supportedLanguages</span>: [<span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-string">&#x27;ja&#x27;</span>],
    <span class="hljs-attr">fallbackLanguage</span>: <span class="hljs-string">&#x27;en&#x27;</span>,
  })
)
</code></pre>
<h3 id="تكوين-ملفات-تعريف-الارتباط">تكوين ملفات تعريف الارتباط</h3>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">languageDetector</span>({
    <span class="hljs-attr">lookupCookie</span>: <span class="hljs-string">&#x27;app_lang&#x27;</span>,
    <span class="hljs-attr">caches</span>: [<span class="hljs-string">&#x27;cookie&#x27;</span>],
    <span class="hljs-attr">cookieOptions</span>: {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-comment">// Cookie path</span>
      <span class="hljs-attr">sameSite</span>: <span class="hljs-string">&#x27;Lax&#x27;</span>, <span class="hljs-comment">// Cookie same-site policy</span>
      <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Only send over HTTPS</span>
      <span class="hljs-attr">maxAge</span>: <span class="hljs-number">86400</span> * <span class="hljs-number">365</span>, <span class="hljs-comment">// 1 year expiration</span>
      <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Not accessible via JavaScript</span>
      <span class="hljs-attr">domain</span>: <span class="hljs-string">&#x27;.example.com&#x27;</span>, <span class="hljs-comment">// Optional: specific domain</span>
    },
  })
)
</code></pre>
<p>لتعطيل التخزين المؤقت للكوكيز:</p>
<pre><code class="language-ts"><span class="hljs-title function_">languageDetector</span>({
  <span class="hljs-attr">caches</span>: <span class="hljs-literal">false</span>,
})
</code></pre>
<h3 id="التصحيح">التصحيح</h3>
<p>تسجيل خطوات الكشف:</p>
<pre><code class="language-ts"><span class="hljs-title function_">languageDetector</span>({
  <span class="hljs-attr">debug</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Shows: &quot;Detected from querystring: ar&quot;</span>
})
</code></pre>
<h2 id="مرجع-الخيارات">مرجع الخيارات</h2>
<h3 id="الخيارات-الأساسية">الخيارات الأساسية</h3>
<table>
<thead>
<tr>
<th style="text-align:left">الخيار (Option)</th>
<th style="text-align:left">النوع (Type)</th>
<th style="text-align:left">الافتراضي (Default)</th>
<th style="text-align:left">مطلوب (Required)</th>
<th style="text-align:left">الوصف (Description)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>supportedLanguages</code></td>
<td style="text-align:left"><code>string[]</code></td>
<td style="text-align:left"><code>['en']</code></td>
<td style="text-align:left">نعم</td>
<td style="text-align:left">رموز اللغات المسموح بها</td>
</tr>
<tr>
<td style="text-align:left"><code>fallbackLanguage</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>'en'</code></td>
<td style="text-align:left">نعم</td>
<td style="text-align:left">اللغة الافتراضية</td>
</tr>
<tr>
<td style="text-align:left"><code>order</code></td>
<td style="text-align:left"><code>DetectorType[]</code></td>
<td style="text-align:left"><code>['querystring', 'cookie', 'header']</code></td>
<td style="text-align:left">لا</td>
<td style="text-align:left">تسلسل الكشف</td>
</tr>
<tr>
<td style="text-align:left"><code>debug</code></td>
<td style="text-align:left"><code>boolean</code></td>
<td style="text-align:left"><code>false</code></td>
<td style="text-align:left">لا</td>
<td style="text-align:left">تفعيل التسجيل</td>
</tr>
</tbody>
</table>
<h3 id="خيارات-الاكتشاف">خيارات الاكتشاف</h3>
<table>
<thead>
<tr>
<th style="text-align:left">الخيار</th>
<th style="text-align:left">النوع</th>
<th style="text-align:left">الافتراضي</th>
<th style="text-align:left">الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>lookupQueryString</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>'lang'</code></td>
<td style="text-align:left">اسم معامل الاستعلام</td>
</tr>
<tr>
<td style="text-align:left"><code>lookupCookie</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>'language'</code></td>
<td style="text-align:left">اسم ملف تعريف الارتباط</td>
</tr>
<tr>
<td style="text-align:left"><code>lookupFromHeaderKey</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>'accept-language'</code></td>
<td style="text-align:left">اسم الترويسة</td>
</tr>
<tr>
<td style="text-align:left"><code>lookupFromPathIndex</code></td>
<td style="text-align:left"><code>number</code></td>
<td style="text-align:left"><code>0</code></td>
<td style="text-align:left">فهرس مقطع المسار</td>
</tr>
</tbody>
</table>
<h3 id="خيارات-ملفات-تعريف-الارتباط">خيارات ملفات تعريف الارتباط</h3>
<table>
<thead>
<tr>
<th style="text-align:left">الخيار</th>
<th style="text-align:left">النوع</th>
<th style="text-align:left">الافتراضي</th>
<th style="text-align:left">الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>caches</code></td>
<td style="text-align:left"><code>CacheType[] | false</code></td>
<td style="text-align:left"><code>['cookie']</code></td>
<td style="text-align:left">إعدادات التخزين المؤقت</td>
</tr>
<tr>
<td style="text-align:left"><code>cookieOptions.path</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>'/'</code></td>
<td style="text-align:left">مسار ملف تعريف الارتباط</td>
</tr>
<tr>
<td style="text-align:left"><code>cookieOptions.sameSite</code></td>
<td style="text-align:left"><code>'Strict' | 'Lax' | 'None'</code></td>
<td style="text-align:left"><code>'Strict'</code></td>
<td style="text-align:left">سياسة SameSite</td>
</tr>
<tr>
<td style="text-align:left"><code>cookieOptions.secure</code></td>
<td style="text-align:left"><code>boolean</code></td>
<td style="text-align:left"><code>true</code></td>
<td style="text-align:left">HTTPS فقط</td>
</tr>
<tr>
<td style="text-align:left"><code>cookieOptions.maxAge</code></td>
<td style="text-align:left"><code>number</code></td>
<td style="text-align:left"><code>31536000</code></td>
<td style="text-align:left">الانتهاء (بالثواني)</td>
</tr>
<tr>
<td style="text-align:left"><code>cookieOptions.httpOnly</code></td>
<td style="text-align:left"><code>boolean</code></td>
<td style="text-align:left"><code>true</code></td>
<td style="text-align:left">إمكانية وصول JS</td>
</tr>
<tr>
<td style="text-align:left"><code>cookieOptions.domain</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left">نطاق ملف تعريف الارتباط</td>
</tr>
</tbody>
</table>
<h3 id="خيارات-متقدمة">خيارات متقدمة</h3>
<table>
<thead>
<tr>
<th style="text-align:left">الخيار</th>
<th style="text-align:left">النوع</th>
<th style="text-align:left">الافتراضي</th>
<th style="text-align:left">الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>ignoreCase</code></td>
<td style="text-align:left"><code>boolean</code></td>
<td style="text-align:left"><code>true</code></td>
<td style="text-align:left">المطابقة بغض النظر عن حالة الأحرف</td>
</tr>
<tr>
<td style="text-align:left"><code>convertDetectedLanguage</code></td>
<td style="text-align:left"><code>(lang: string) =&gt; string</code></td>
<td style="text-align:left"><code>undefined</code></td>
<td style="text-align:left">محوّل رمز اللغة</td>
</tr>
</tbody>
</table>
<h2 id="التحقق-ومعالجة-الأخطاء">التحقق ومعالجة الأخطاء</h2>
<ul>
<li><code>fallbackLanguage</code> يجب أن يكون في <code>supportedLanguages</code> (يرفع خطأً أثناء الإعداد)</li>
<li><code>lookupFromPathIndex</code> يجب أن يكون ≥ 0</li>
<li>التكوينات غير الصالحة تُلقي أخطاءً أثناء تهيئة (initialization) الوسيط</li>
<li>تستخدم عمليات الكشف الفاشلة بصمت <code>fallbackLanguage</code></li>
</ul>
<h2 id="وصفات-شائعة">وصفات شائعة</h2>
<h3 id="التوجيه-على-أساس-المسار">التوجيه على أساس المسار</h3>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:lang/home&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> lang = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;language&#x27;</span>) <span class="hljs-comment">// &#x27;en&#x27;, &#x27;ar&#x27;, etc.</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-title function_">getLocalizedContent</span>(lang) })
})
</code></pre>
<h3 id="لغات-متعددة-مدعومة">لغات متعددة مدعومة</h3>
<pre><code class="language-ts"><span class="hljs-title function_">languageDetector</span>({
  <span class="hljs-attr">supportedLanguages</span>: [<span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-string">&#x27;en-GB&#x27;</span>, <span class="hljs-string">&#x27;ar&#x27;</span>, <span class="hljs-string">&#x27;ar-EG&#x27;</span>],
  <span class="hljs-attr">convertDetectedLanguage</span>: <span class="hljs-function">(<span class="hljs-params">lang</span>) =&gt;</span> lang.<span class="hljs-title function_">replace</span>(<span class="hljs-string">&#x27;_&#x27;</span>, <span class="hljs-string">&#x27;-&#x27;</span>), <span class="hljs-comment">// Normalize</span>
})
</code></pre>
`,c={book:s,chapter:t,chapterTitle:n,slug:a,title:e,headings:l,html:p};export{s as book,t as chapter,n as chapterTitle,c as default,l as headings,p as html,a as slug,e as title};
