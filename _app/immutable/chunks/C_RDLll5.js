const s="kinney",a="enterprise-ui",n="واجهات المؤسسات",l="streaming-and-suspense-exercise",t="تمرين 3: البث وSuspense",p=[{depth:2,id:"لماذا-يهم",text:"لماذا يهم"},{depth:2,id:"كيف-يعمل-التصيير-التدريجي",text:"كيف يعمل التصيير التدريجي"},{depth:2,id:"أعد-الهيكلة-إلى-جلب-بيانات-لكل-مكون",text:"أعد الهيكلة إلى جلب بيانات لكل مكوّن"},{depth:3,id:"ما-الذي-تنظر-إليه-أولا",text:"ما الذي تنظر إليه أولًا"},{depth:3,id:"أعد-هيكلة-كل-مكون",text:"أعد هيكلة كل مكوّن"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"اجعل-جلب-البيانات-متوافقا-مع-suspense",text:"اجعل جلب البيانات متوافقًا مع Suspense"},{depth:3,id:"أنشئ-مساعد-موارد-suspense",text:"أنشئ مساعد موارد Suspense"},{depth:3,id:"حدث-المكونات-لتستخدم-موارد-suspense",text:"حدّث المكوّنات لتستخدم موارد Suspense"},{depth:3,id:"أضف-حدود-suspense",text:"أضف حدود Suspense"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"التصيير-المتدفق-من-الخادم-مع-rendertopipeablestream",text:"التصيير المتدفّق من الخادم مع renderToPipeableStream"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"جرب-مواضع-الحدود",text:"جرّب مواضع الحدود"},{depth:3,id:"التهيئة-a-حد-واحد-حول-كل-شيء",text:"التهيئة A: حدّ واحد حول كل شيء"},{depth:3,id:"التهيئة-b-حدود-فردية-الحالية",text:"التهيئة B: حدود فردية (الحالية)"},{depth:3,id:"التهيئة-c-حدود-مجمعة",text:"التهيئة C: حدود مجمّعة"},{depth:3,id:"جرب-كل-واحدة",text:"جرّب كل واحدة"},{depth:3,id:"نقطة-تحقق",text:"نقطة تحقق"},{depth:2,id:"الحل",text:"الحل"},{depth:2,id:"أهداف-إضافية",text:"أهداف إضافية"},{depth:2,id:"ما-التالي",text:"ما التالي"}],e=`<p>تُجري لوحة التحليلات ثلاثة نداءات إلى الواجهة البرمجية بسرعات مختلفة: إحصاءات الملخص (200ms)، وبيانات المخطط (800ms)، وجدول النشاط (2000ms). والآن تعرض الصفحة بأكملها مؤشر تحميل واحدًا حتى تُحلّ الثلاثة كلها. وستضيف حدود Suspense حول كل قسم وتطبّق <code>renderToPipeableStream</code> للتصيير المتدفّق من الخادم كي يُصيَّر كل قسم تدريجيًا مع وصول بياناته.</p>
<h2 id="لماذا-يهم">لماذا يهم</h2>
<p>حدود Suspense قرارات معمارية، لا خيارات تنسيق. فمكان وضعها يحدّد ما يراه المستخدم أثناء الانتظار، وما يبثّ معًا وما يبثّ باستقلال، وكيف تتكوّن حالات التحميل لديك عبر حدود الحزم. وفي مستودع أحادي بحزم ميزات تجلب كل منها بياناتها، فإن إتقان هذا يعني الفرق بين تطبيق مستجيب وتطبيق يبدو متجمدًا ثانيتين عند كل تحميل صفحة.</p>
<h2 id="كيف-يعمل-التصيير-التدريجي">كيف يعمل التصيير التدريجي</h2>
<p>مع جلب البيانات لكل مكوّن على حدة وحدود Suspense، يُصيَّر كل قسم باستقلال مع وصول بياناته. ويعرض الخط الزمني أدناه ما يراه المستخدم في كل لحظة.</p>
<pre><code>gantt
    title Progressive Rendering Timeline
    dateFormat X
    axisFormat %Lms

    section API Responses
    Summary API (200ms)     :done, api1, 0, 200
    Chart API (800ms)       :done, api2, 0, 800
    Table API (2000ms)      :done, api3, 0, 2000

    section User Sees
    App Shell + Skeletons       :active, shell, 0, 200
    Stats visible + 2 loading   :active, s1, 200, 800
    Stats + Chart + 1 loading   :active, s2, 800, 2000
    Fully loaded                :active, s3\\, 2000, 2100
</code></pre>
<h2 id="أعد-الهيكلة-إلى-جلب-بيانات-لكل-مكون">أعد الهيكلة إلى جلب بيانات لكل مكوّن</h2>
<p>حاليًا، يجلب <code>AnalyticsDashboard</code> مجموعات البيانات الثلاث كلها في <code>Promise.all</code> واحد ويمرّرها كخصائص. وهذا يعني أن الصفحة بأكملها تنتظر أبطأ استجابة (الجدول عند ~2000ms) قبل أن يُصيَّر أي شيء. وستعيد الهيكلة بحيث يجلب كل مكوّن بياناته بنفسه—وهو شرط مسبق كي تعمل حدود Suspense.</p>
<h3 id="ما-الذي-تنظر-إليه-أولا">ما الذي تنظر إليه أولًا</h3>
<p>افتح <code>packages/analytics/src/analytics-dashboard.tsx</code> ولاحظ نمط الجلب المركزي:</p>
<p><em>packages/analytics/src/analytics-dashboard.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> [summaryResponse, chartResponse, tableResponse] = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>([
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/analytics/summary&#x27;</span>),
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/analytics/chart?range=<span class="hljs-subst">\${timeRange}</span>\`</span>),
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/analytics/table?page=1&#x27;</span>),
]);
</code></pre>
<p>تُجلب الاستجابات الثلاث كلها معًا وتُمرَّر كخصائص إلى المكوّنات التابعة.</p>
<p>ثم افتح <code>mocks/src/handlers.ts</code> وابحث عن نقاط نهاية التحليلات الثلاث. ولاحظ نداءات <code>delay()</code>—200ms، و800ms، و2000ms. وهذه حتمية لا عشوائية. والآن ينتظر المستخدم 2000ms لكل شيء لأن <code>Promise.all</code> يحجب حتى تُحلّ أبطأ استجابة.</p>
<blockquote>
<p><strong>ثلاثة أنماط لجلب البيانات</strong></p>
<p>الجلب المتسلسل (اجلب <code>A</code>، ثم اجلب <code>B</code>، ثم اجلب <code>C</code>) ينشئ «شلالًا» ينتظر فيه كل طلب انتهاء الطلب السابق—وزمن الانتظار الكلي هو مجموع أزمنة الاستجابة كلها. أما <code>Promise.all</code> فيطلق كل الطلبات في الوقت نفسه، مانعًا الشلال، لكن الواجهة تظل محجوبة حتى تصل أبطأ استجابة—وزمن الانتظار الكلي يساوي أقصى زمن استجابة.</p>
<p>الجلب لكل مكوّن على حدة (وهو ما سنطبّقه الآن) يُطلق الطلبات في الوقت نفسه أيضًا، لكن كل مكوّن يُصيَّر باستقلال بمجرد وصول بياناته—فيرى المستخدم النتائج تدريجيًا. ونمط الشلال هو أسوأ الحالات، ويظهر غالبًا عن غير قصد عندما يُغلَّف جلب البيانات داخل نداءات <code>await</code> متسلسلة أو سلاسل <code>useEffect</code> تعتمد كل واحدة على نتائج الأخرى.</p>
</blockquote>
<h3 id="أعد-هيكلة-كل-مكون">أعد هيكلة كل مكوّن</h3>
<p>انقل جلب البيانات إلى كل مكوّن كي يدير حالة التحميل الخاصة به.</p>
<p>افتح <code>packages/analytics/src/stats-bar.tsx</code>. حاليًا، يتلقى <code>StatsBar</code> الخاصية <code>stats</code> من المكوّن الأب—ولا يدري كيف وصلت البيانات. وستزيل تلك الخاصية وتجعل المكوّن يجلب بيانات الملخص بنفسه. استبدل محتوى الملف بـ:</p>
<p><em>packages/analytics/src/stats-bar.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">SummaryStats</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">StatCard</span>, <span class="hljs-title class_">LoadingSkeleton</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/ui&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">formatNumber</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> value.<span class="hljs-title function_">toLocaleString</span>();
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">formatCurrency</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Intl</span>.<span class="hljs-title class_">NumberFormat</span>(<span class="hljs-string">&quot;en-US&quot;</span>, {
    <span class="hljs-attr">style</span>: <span class="hljs-string">&quot;currency&quot;</span>,
    <span class="hljs-attr">currency</span>: <span class="hljs-string">&quot;USD&quot;</span>,
    <span class="hljs-attr">minimumFractionDigits</span>: <span class="hljs-number">0</span>,
  }).<span class="hljs-title function_">format</span>(value);
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">formatPercentage</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${(value * <span class="hljs-number">100</span>).toFixed(<span class="hljs-number">1</span>)}</span>%\`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">StatsBar</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> [stats, setStats] = useState&lt;<span class="hljs-title class_">SummaryStats</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/api/analytics/summary&quot;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> response.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setStats);
  }, []);
  <span class="hljs-keyword">if</span> (!stats) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;card&quot;</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{4}</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;grid grid-cols-4 gap-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Total Users&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formatNumber(stats.totalUsers)}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Active Today&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formatNumber(stats.activeToday)}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Revenue&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formatCurrency(stats.revenue)}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Conversion Rate&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formatPercentage(stats.conversionRate)}</span>
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><em>ملاحظة:</em> يجلب إحصاءات الملخص عند التثبيت—أسرع واجهة برمجية عند ~200ms</p>
<p>افتح <code>packages/analytics/src/chart.tsx</code>. كان هذا المكوّن يتلقى <code>data</code> كخاصية من <code>Promise.all</code> في المكوّن الأب. وستزيل خاصية <code>data</code> وتجعل <code>Chart</code> يجلب بناءً على خاصيته <code>range</code> بدلًا من ذلك. استبدل محتوى الملف بـ:</p>
<p><em>packages/analytics/src/chart.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ChartDataPoint</span>, <span class="hljs-title class_">TimeRange</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LoadingSkeleton</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/ui&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Chart</span>(<span class="hljs-params">{ range = <span class="hljs-string">&quot;30d&quot;</span> }: { range?: TimeRange }</span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">ChartDataPoint</span>[] | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setData</span>(<span class="hljs-literal">null</span>);
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/analytics/chart?range=<span class="hljs-subst">\${range}</span>\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> response.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(setData);
  }, [range]);
  <span class="hljs-keyword">if</span> (!data) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;chart&quot;</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (data.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex h-64 items-center justify-center text-gray-400&quot;</span>&gt;</span>
        No data available
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">const</span> maxValue = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...data.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">point</span>) =&gt;</span> point.<span class="hljs-property">value</span>));
  <span class="hljs-keyword">const</span> chartHeight = <span class="hljs-number">200</span>;
  <span class="hljs-keyword">const</span> chartWidth = <span class="hljs-number">800</span>;
  <span class="hljs-keyword">const</span> barWidth = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">4</span>, (chartWidth - data.<span class="hljs-property">length</span> * <span class="hljs-number">2</span>) / data.<span class="hljs-property">length</span>);
  <span class="hljs-keyword">const</span> gap = <span class="hljs-number">2</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span>
      <span class="hljs-attr">viewBox</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">0</span> <span class="hljs-attr">0</span> \${<span class="hljs-attr">chartWidth</span>} \${<span class="hljs-attr">chartHeight</span> + <span class="hljs-attr">30</span>}\`}
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;h-64 w-full&quot;</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;img&quot;</span>
      <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Analytics activity chart&quot;</span>
    &gt;</span>
      {data.map((point, index) =&gt; {
        const barHeight = (point.value / maxValue) * chartHeight;
        const x = index * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{point.date}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">rect</span>
              <span class="hljs-attr">x</span>=<span class="hljs-string">{x}</span>
              <span class="hljs-attr">y</span>=<span class="hljs-string">{y}</span>
              <span class="hljs-attr">width</span>=<span class="hljs-string">{barWidth}</span>
              <span class="hljs-attr">height</span>=<span class="hljs-string">{barHeight}</span>
              <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;fill-gray-800&quot;</span>
              <span class="hljs-attr">rx</span>=<span class="hljs-string">{2}</span>
            /&gt;</span>
            {index % Math.ceil(data.length / 6) === 0 &amp;&amp; (
              <span class="hljs-tag">&lt;<span class="hljs-name">text</span>
                <span class="hljs-attr">x</span>=<span class="hljs-string">{x</span> + <span class="hljs-attr">barWidth</span> / <span class="hljs-attr">2</span>}
                <span class="hljs-attr">y</span>=<span class="hljs-string">{chartHeight</span> + <span class="hljs-attr">16</span>}
                <span class="hljs-attr">textAnchor</span>=<span class="hljs-string">&quot;middle&quot;</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;fill-gray-400 text-[10px]&quot;</span>
              &gt;</span>
                {point.date.slice(5)}
              <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
            )}
          <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
        );
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></span>
  );
}
</code></pre>
<p><em>ملاحظة:</em> تُعاد إلى null كي يظهر الهيكل العظمي أثناء إعادة الجلب</p>
<p><em>ملاحظة:</em> يعيد الجلب كلما تغيّر النطاق الزمني</p>
<p>افتح <code>packages/analytics/src/big-table.tsx</code>. ومثل المكوّنين الآخرين، يتلقى <code>BigTable</code> حاليًا <code>data</code> كخاصية. وستزيل تلك الخاصية وتجعله يجلب صفوف جدوله بنفسه. استبدل محتوى الملف بـ:</p>
<p><em>packages/analytics/src/big-table.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">TableRow</span>, <span class="hljs-title class_">PaginatedResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataTable</span>, <span class="hljs-title class_">LoadingSkeleton</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/ui&quot;</span>;

<span class="hljs-keyword">const</span> columns = [
  { <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;user&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>, <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;User&quot;</span> },
  { <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;action&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>, <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;Action&quot;</span> },
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;timestamp&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;Time&quot;</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-title class_">TableRow</span>[keyof <span class="hljs-title class_">TableRow</span>]</span>) =&gt;</span>
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">String</span>(value)).<span class="hljs-title function_">toLocaleString</span>(),
  },
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;duration&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;Duration&quot;</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-title class_">TableRow</span>[keyof <span class="hljs-title class_">TableRow</span>]</span>) =&gt;</span> <span class="hljs-string">\`<span class="hljs-subst">\${value}</span>ms\`</span>,
  },
];

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">BigTable</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-title class_">TableRow</span>[] | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/api/analytics/table?page=1&quot;</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> response.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">result</span>: <span class="hljs-title class_">PaginatedResponse</span>&lt;<span class="hljs-title class_">TableRow</span>&gt;</span>) =&gt;</span> <span class="hljs-title function_">setData</span>(result.<span class="hljs-property">data</span>));
  }, []);
  <span class="hljs-keyword">if</span> (!data) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;table&quot;</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-lg border border-gray-200 bg-white p-6&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4 font-medium text-gray-900&quot;</span>&gt;</span>Recent Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DataTable</span> <span class="hljs-attr">columns</span>=<span class="hljs-string">{columns}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">keyField</span>=<span class="hljs-string">&quot;id&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><em>ملاحظة:</em> يجلب عند التثبيت—أبطأ واجهة برمجية عند ~2000ms</p>
<blockquote>
<p><strong>واجهة الجدول البرمجية تعيد استجابة مقسّمة إلى صفحات</strong></p>
<p>تغلّف نقطة النهاية <code>/api/analytics/table?page=1</code> الصفوف في كائن <code>PaginatedResponse&lt;TableRow&gt;</code> بحقول <code>data</code> و<code>page</code> و<code>pageSize</code> و<code>total</code>. وتحتاج إلى استخراج <code>result.data</code> للحصول على مصفوفة عناصر <code>TableRow</code>.</p>
</blockquote>
<p>والآن افتح <code>packages/analytics/src/analytics-dashboard.tsx</code> وجرّده من كل منطق جلب البيانات. احذف <code>Promise.all</code>، واحذف متغيّرات حالة مجموعات البيانات الثلاث، واحذف الخصائص التي كنت تمرّرها إلى كل مكوّن تابع. وتصير لوحة التحليلات قشرة تخطيط خالصة: فهي لا تجلب شيئًا، بل تصيّر المكوّنات الثلاثة فقط وتتركها تتولى بياناتها بنفسها. استبدل محتوى الملف بـ:</p>
<p><em>packages/analytics/src/analytics-dashboard.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">TimeRange</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { useAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">StatsBar</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./stats-bar&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Chart</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./chart&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">BigTable</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./big-table&quot;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">AnalyticsDashboard</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> { user, isAuthenticated } = <span class="hljs-title function_">useAuth</span>();
  <span class="hljs-keyword">const</span> [timeRange, setTimeRange] = useState&lt;<span class="hljs-title class_">TimeRange</span>&gt;(<span class="hljs-string">&quot;30d&quot;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;space-y-6&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-center justify-between&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-xl font-semibold text-gray-900&quot;</span>&gt;</span>
          Analytics Overview
        <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-center gap-3&quot;</span>&gt;</span>
          {isAuthenticated &amp;&amp; user ? (
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700&quot;</span>&gt;</span>
              Viewing as: {user.name}
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          ) : (
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700&quot;</span>&gt;</span>
              Not authenticated
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">StatsBar</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-lg border border-gray-200 bg-white p-6&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4 flex items-center justify-between&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-medium text-gray-900&quot;</span>&gt;</span>Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex gap-1&quot;</span>&gt;</span>
            {([&quot;7d&quot;, &quot;30d&quot;, &quot;90d&quot;] as const).map((range) =&gt; (
              <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
                <span class="hljs-attr">key</span>=<span class="hljs-string">{range}</span>
                <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setTimeRange(range)}
                className={\`rounded-md px-3 py-1 text-sm \${
                  timeRange === range
                    ? &quot;bg-gray-900 text-white&quot;
                    : &quot;text-gray-600 hover:bg-gray-100&quot;
                }\`}
              &gt;
                {range}
              <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            ))}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">range</span>=<span class="hljs-string">{timeRange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">BigTable</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">AnalyticsDashboard</span>;
</code></pre>
<p><em>ملاحظة:</em> بلا استيرادات لجلب البيانات—هذا المكوّن قشرة تخطيط خالصة</p>
<blockquote>
<p><strong>لماذا يجلب كل مكوّن بياناته بنفسه</strong></p>
<p>هذا اختيار معماري متعمّد. فبجمع جلب البيانات مع المكوّن الذي يحتاجها في مكان واحد، يستطيع كل قسم أن يُصيَّر باستقلال بمجرد وصول بياناته. فيُصيَّر <code>StatsBar</code> بعد ~200ms بلا انتظار استجابة الجدول عند ~2000ms. وهذا النمط هو ما يجعل حدود Suspense مفيدة في الخطوة 2: فهي تمنح React الدقة الكافية لعرض نتائج جزئية بينما ما زالت طلبات أخرى جارية.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>أعد تحميل الصفحة على <code>http://localhost:5173</code>. ينبغي أن ترى الآن كل قسم يظهر باستقلال—شريط الإحصاءات أولًا (~200ms)، ثم المخطط (~800ms)، ثم الجدول (~2000ms). ويعرض كل منها هيكله العظمي الخاص أثناء الانتظار. وهذا نمط الجلب لكل مكوّن الذي تحتاجه قبل إضافة Suspense.</p>
<p><img src="/arabic-cs-library/images/kinney/32a64b3bfabf03c9.webp" alt="هياكل عظمية للتحميل تظهر أثناء جلب البيانات"></p>
<h2 id="اجعل-جلب-البيانات-متوافقا-مع-suspense">اجعل جلب البيانات متوافقًا مع Suspense</h2>
<p>يمنح نمط <code>useEffect</code> + <code>useState</code> لكل مكوّن من الخطوة 1 كل قسم بالفعل حالة تحميل خاصة به. لكن حدود Suspense تحتاج آلية مختلفة: مصدر بيانات <strong>يرمي وعدًا</strong> أثناء التحميل بدل أن يعيد <code>null</code>. هذه إشارة React لـ«لسنا جاهزين بعد».</p>
<h3 id="أنشئ-مساعد-موارد-suspense">أنشئ مساعد موارد Suspense</h3>
<p>افتح <code>packages/shared/src/api-client.ts</code> وأضف الدالة التالية. هذه إضافة جديدة كليًا: لا شيء في الملف تحتاج إلى تغييره، فألحق هذا في آخره:</p>
<p><em>packages/shared/src/api-client.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SuspenseResource</span>&lt;T&gt; {
  <span class="hljs-title function_">read</span>(): T;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> createSuspenseResource&lt;T&gt;(<span class="hljs-attr">promise</span>: <span class="hljs-title class_">Promise</span>&lt;T&gt;): <span class="hljs-title class_">SuspenseResource</span>&lt;T&gt; {
  <span class="hljs-keyword">let</span> <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span> = <span class="hljs-string">&#x27;pending&#x27;</span>;
  <span class="hljs-keyword">let</span> <span class="hljs-attr">result</span>: T;
  <span class="hljs-keyword">let</span> <span class="hljs-attr">error</span>: <span class="hljs-built_in">unknown</span>;

  <span class="hljs-keyword">const</span> suspender = promise.<span class="hljs-title function_">then</span>(
    <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
      status = <span class="hljs-string">&#x27;success&#x27;</span>;
      result = value;
    },
    <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
      status = <span class="hljs-string">&#x27;error&#x27;</span>;
      error = err;
    },
  );

  <span class="hljs-keyword">return</span> {
    <span class="hljs-title function_">read</span>(<span class="hljs-params"></span>) {
      <span class="hljs-keyword">if</span> (status === <span class="hljs-string">&#x27;pending&#x27;</span>) <span class="hljs-keyword">throw</span> suspender;
      <span class="hljs-keyword">if</span> (status === <span class="hljs-string">&#x27;error&#x27;</span>) <span class="hljs-keyword">throw</span> error;
      <span class="hljs-keyword">return</span> result;
    },
  };
}
</code></pre>
<p><em>ملاحظة:</em> يلفّ وعدًا في آلة بثلاث حالات: قيد الانتظار، أو نجاح، أو خطأ</p>
<p><em>ملاحظة:</em> رمي الوعد يخبر React أن يعرض أقرب واجهة احتياطية لـSuspense</p>
<p>ثم أضف سطرًا واحدًا إلى <code>packages/shared/src/index.ts</code> لكشف الدالة الجديدة:</p>
<p><em>packages/shared/src/index.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> { createSuspenseResource } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./api-client&#x27;</span>;
</code></pre>
<blockquote>
<p><strong>كيف يعمل نمط رمي الوعد</strong></p>
<p>عندما ينادي مكوّن <code>resource.read()</code> ولا تكون البيانات جاهزة، ترمي الدالة الوعد المعلّق. فيلتقط React هذا الوعد المرمي، ويعرض أقرب واجهة احتياطية <code>&lt;Suspense&gt;</code>، ويعيد تصيير المكوّن عندما يُحلّ الوعد. وهذا مختلف جذريًا عن <code>useEffect</code>: فبدل التصيير بـ<code>null</code> وتحديث الحالة لاحقًا، <em>لا يُصيَّر</em> المكوّن إطلاقًا حتى تصير البيانات متاحة. وهذا ما يجعل حدود Suspense مفيدة: فهي تعترض الوعد المرمي وتعرض واجهة احتياطية.</p>
</blockquote>
<h3 id="حدث-المكونات-لتستخدم-موارد-suspense">حدّث المكوّنات لتستخدم موارد Suspense</h3>
<p>افتح <code>packages/analytics/src/stats-bar.tsx</code> مرة أخرى. وستُجري ثلاثة تغييرات: (1) بدّل الاستيرادات—أسقط <code>useEffect</code> و<code>useState</code> و<code>LoadingSkeleton</code>، وأضف <code>createSuspenseResource</code>؛ (2) استبدل جلب <code>useEffect</code>/<code>useState</code> بمورد Suspense على مستوى الوحدة؛ (3) احذف حارس التحميل <code>if (!stats)</code>—فـSuspense يتولى ذلك الآن. حدّث الملف إلى:</p>
<p><em>packages/analytics/src/stats-bar.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">SummaryStats</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { createSuspenseResource } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">StatCard</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/ui&quot;</span>;
<span class="hljs-comment">// ... keep formatNumber, formatCurrency, formatPercentage functions ...</span>

<span class="hljs-keyword">const</span> statsResource = createSuspenseResource&lt;<span class="hljs-title class_">SummaryStats</span>&gt;(
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/api/analytics/summary&quot;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>()),
);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">StatsBar</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> stats = statsResource.<span class="hljs-title function_">read</span>();
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;grid grid-cols-4 gap-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Total Users&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formatNumber(stats.totalUsers)}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Active Today&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formatNumber(stats.activeToday)}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Revenue&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{formatCurrency(stats.revenue)}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">StatCard</span>
        <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Conversion Rate&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formatPercentage(stats.conversionRate)}</span>
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><em>ملاحظة:</em> بلا useEffect، بلا useState، بلا LoadingSkeleton—فـSuspense يتولى كل ذلك</p>
<p><em>ملاحظة:</em> مورد على مستوى الوحدة—يبدأ الجلب وقت الاستيراد، لا وقت التصيير</p>
<p><em>ملاحظة:</em> يرمي وعدًا إن لم تكن البيانات جاهزة—فيعرض React واجهة Suspense الاحتياطية بدلًا من ذلك</p>
<p>افتح <code>packages/analytics/src/chart.tsx</code> مرة أخرى. وتنطبق التغييرات الثلاثة نفسها: بدّل الاستيرادات، واستبدل <code>useEffect</code> بمورد Suspense، واحذف حارس التحميل—لكن في المخطط التفاف: فبياناته تعتمد على خاصية <code>range</code>، فلا يمكنك استخدام مورد واحد على مستوى الوحدة. استخدم بدلًا من ذلك <code>Map</code> يخزّن مؤقتًا موردًا واحدًا لكل قيمة نطاق. حدّث الملف إلى:</p>
<p><em>packages/analytics/src/chart.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">ChartDataPoint</span>, <span class="hljs-title class_">TimeRange</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { createSuspenseResource } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">const</span> chartCache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;
  <span class="hljs-title class_">TimeRange</span>,
  <span class="hljs-title class_">ReturnType</span>&lt;<span class="hljs-keyword">typeof</span> createSuspenseResource&lt;<span class="hljs-title class_">ChartDataPoint</span>[]&gt;&gt;
&gt;();
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getChartResource</span>(<span class="hljs-params"><span class="hljs-attr">range</span>: <span class="hljs-title class_">TimeRange</span></span>) {
  <span class="hljs-keyword">if</span> (!chartCache.<span class="hljs-title function_">has</span>(range)) {
    chartCache.<span class="hljs-title function_">set</span>(
      range,
      createSuspenseResource&lt;<span class="hljs-title class_">ChartDataPoint</span>[]&gt;(
        <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/analytics/chart?range=<span class="hljs-subst">\${range}</span>\`</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>()),
      ),
    );
  }
  <span class="hljs-keyword">return</span> chartCache.<span class="hljs-title function_">get</span>(range)!;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Chart</span>(<span class="hljs-params">{
  range = <span class="hljs-string">&quot;30d&quot;</span>,
}: {
  range?: TimeRange;
}</span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> data = <span class="hljs-title function_">getChartResource</span>(range).<span class="hljs-title function_">read</span>();
  <span class="hljs-keyword">if</span> (data.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex h-64 items-center justify-center text-gray-400&quot;</span>&gt;</span>
        No data available
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

  <span class="hljs-keyword">const</span> maxValue = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(...data.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">point</span>) =&gt;</span> point.<span class="hljs-property">value</span>));
  <span class="hljs-keyword">const</span> chartHeight = <span class="hljs-number">200</span>;
  <span class="hljs-keyword">const</span> chartWidth = <span class="hljs-number">800</span>;
  <span class="hljs-keyword">const</span> barWidth = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">4</span>, (chartWidth - data.<span class="hljs-property">length</span> * <span class="hljs-number">2</span>) / data.<span class="hljs-property">length</span>);
  <span class="hljs-keyword">const</span> gap = <span class="hljs-number">2</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span>
      <span class="hljs-attr">viewBox</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">0</span> <span class="hljs-attr">0</span> \${<span class="hljs-attr">chartWidth</span>} \${<span class="hljs-attr">chartHeight</span> + <span class="hljs-attr">30</span>}\`}
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;h-64 w-full&quot;</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;img&quot;</span>
      <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Analytics activity chart&quot;</span>
    &gt;</span>
      {data.map((point, index) =&gt; {
        const barHeight = (point.value / maxValue) * chartHeight;
        const x = index * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{point.date}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">rect</span>
              <span class="hljs-attr">x</span>=<span class="hljs-string">{x}</span>
              <span class="hljs-attr">y</span>=<span class="hljs-string">{y}</span>
              <span class="hljs-attr">width</span>=<span class="hljs-string">{barWidth}</span>
              <span class="hljs-attr">height</span>=<span class="hljs-string">{barHeight}</span>
              <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;fill-gray-800&quot;</span>
              <span class="hljs-attr">rx</span>=<span class="hljs-string">{2}</span>
            /&gt;</span>
            {index % Math.ceil(data.length / 6) === 0 &amp;&amp; (
              <span class="hljs-tag">&lt;<span class="hljs-name">text</span>
                <span class="hljs-attr">x</span>=<span class="hljs-string">{x</span> + <span class="hljs-attr">barWidth</span> / <span class="hljs-attr">2</span>}
                <span class="hljs-attr">y</span>=<span class="hljs-string">{chartHeight</span> + <span class="hljs-attr">16</span>}
                <span class="hljs-attr">textAnchor</span>=<span class="hljs-string">&quot;middle&quot;</span>
                <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;fill-gray-400 text-[10px]&quot;</span>
              &gt;</span>
                {point.date.slice(5)}
              <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
            )}
          <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
        );
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></span>
  );
}
</code></pre>
<p><em>ملاحظة:</em> بلا useEffect، بلا useState، بلا LoadingSkeleton—فـSuspense يتولى كل ذلك</p>
<p><em>ملاحظة:</em> ذاكرة مؤقتة قائمة على Map لأن عنوان الجلب يعتمد على خاصية range</p>
<p><em>ملاحظة:</em> يرمي وعدًا إن لم تكن بيانات هذا النطاق جاهزة بعد</p>
<p>افتح <code>packages/analytics/src/big-table.tsx</code> مرة أخرى. والنمط نفسه كـ<code>StatsBar</code>: بدّل الاستيرادات، واستبدل <code>useEffect</code> بمورد على مستوى الوحدة، واحذف حارس التحميل. حدّث الملف إلى:</p>
<p><em>packages/analytics/src/big-table.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">TableRow</span>, <span class="hljs-title class_">PaginatedResponse</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { createSuspenseResource } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/shared&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataTable</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@pulse/ui&quot;</span>;
<span class="hljs-keyword">const</span> columns = [
  { <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;user&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>, <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;User&quot;</span> },
  { <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;action&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>, <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;Action&quot;</span> },
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;timestamp&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;Time&quot;</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-title class_">TableRow</span>[keyof <span class="hljs-title class_">TableRow</span>]</span>) =&gt;</span>
      <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">String</span>(value)).<span class="hljs-title function_">toLocaleString</span>(),
  },
  {
    <span class="hljs-attr">key</span>: <span class="hljs-string">&quot;duration&quot;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">header</span>: <span class="hljs-string">&quot;Duration&quot;</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-title class_">TableRow</span>[keyof <span class="hljs-title class_">TableRow</span>]</span>) =&gt;</span> <span class="hljs-string">\`<span class="hljs-subst">\${value}</span>ms\`</span>,
  },
];

<span class="hljs-keyword">const</span> tableResource = createSuspenseResource&lt;<span class="hljs-title class_">TableRow</span>[]&gt;(
  <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&quot;/api/analytics/table?page=1&quot;</span>)
    .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">r</span>) =&gt;</span> r.<span class="hljs-title function_">json</span>())
    .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">result</span>: <span class="hljs-title class_">PaginatedResponse</span>&lt;<span class="hljs-title class_">TableRow</span>&gt;</span>) =&gt;</span> result.<span class="hljs-property">data</span>),
);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">BigTable</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactElement</span> {
  <span class="hljs-keyword">const</span> data = tableResource.<span class="hljs-title function_">read</span>();
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-lg border border-gray-200 bg-white p-6&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4 font-medium text-gray-900&quot;</span>&gt;</span>Recent Activity<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DataTable</span> <span class="hljs-attr">columns</span>=<span class="hljs-string">{columns}</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">keyField</span>=<span class="hljs-string">&quot;id&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p><em>ملاحظة:</em> بلا useEffect، بلا useState، بلا LoadingSkeleton—فـSuspense يتولى كل ذلك</p>
<p><em>ملاحظة:</em> مورد على مستوى الوحدة—يبدأ الجلب وقت الاستيراد</p>
<p><em>ملاحظة:</em> يرمي وعدًا إن لم تكن البيانات جاهزة—فيعرض React واجهة Suspense الاحتياطية بدلًا من ذلك</p>
<blockquote>
<p><strong>الموارد على مستوى الوحدة تُنفَّذ فورًا</strong></p>
<p>يُنشأ <code>statsResource</code> و<code>tableResource</code> وقت الاستيراد، ما يعني أن الجلب يبدأ بمجرد تحميل الوحدة—لا عند تصيير المكوّن. وهذا مرغوب فعلًا مع Suspense: فكلما بدأ الجلب أبكر، وصلت البيانات أسرع. وأما الموارد التي تعتمد على خصائص (مثل النطاق الزمني في المخطط)، فالذاكرة المؤقتة القائمة على <code>Map</code> تنشئ موردًا جديدًا عند أول وصول لكل قيمة نطاق.</p>
</blockquote>
<h3 id="أضف-حدود-suspense">أضف حدود Suspense</h3>
<p>والآن افتح <code>packages/analytics/src/analytics-dashboard.tsx</code> مرة أخيرة. وستضيف استيرادين وتلفّ كل مكوّن تابع في حدّ <code>&lt;Suspense&gt;</code>. أما بقية الملف فتبقى كما هي.</p>
<p>حدّث الاستيرادات في أعلى الملف—أضف <code>Suspense</code> من React و<code>LoadingSkeleton</code> من <code>@pulse/ui</code>:</p>
<p><em>packages/analytics/src/analytics-dashboard.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { <span class="hljs-title class_">Suspense</span>, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LoadingSkeleton</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@pulse/ui&#x27;</span>;
<span class="hljs-comment">// ... other imports stay the same ...</span>
</code></pre>
<p><em>ملاحظة:</em> Suspense للحدود غير المتزامنة؛ وLoadingSkeleton لواجهة الاستبدال الاحتياطية</p>
<p>ثم لفّ كل مكوّن تابع في JSX. ابحث عن <code>&lt;StatsBar /&gt;</code> و<code>&lt;Chart /&gt;</code> و<code>&lt;BigTable /&gt;</code> ولفّ كل واحد منها:</p>
<p><em>packages/analytics/src/analytics-dashboard.tsx</em></p>
<pre><code class="language-typescript">&lt;<span class="hljs-title class_">Suspense</span> fallback={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;card&quot;</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{4}</span> /&gt;</span></span>}&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StatsBar</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">Suspense</span>&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded-lg border border-gray-200 bg-white p-6&quot;</span>&gt;</span>
  {/* ... time range buttons stay the same ... */}
  <span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;chart&quot;</span> /&gt;</span>}&gt;
    <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> <span class="hljs-attr">range</span>=<span class="hljs-string">{timeRange}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;table&quot;</span> /&gt;</span>}&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">BigTable</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
</code></pre>
<p><em>ملاحظة:</em> يلتقط Suspense الوعد المرمي من statsResource.read() ويعرض هيكلًا عظميًا</p>
<p><em>ملاحظة:</em> يُحلّ كل حدّ Suspense باستقلال مع وصول بياناته</p>
<p><em>ملاحظة:</em> تستغرق بيانات الجدول ~2000ms—فيبقى هيكله العظمي ظاهرًا أطول مدة</p>
<p>احفظ وأعد تحميل الصفحة. وراقب تسلسل التصيير:</p>
<ul>
<li>تُصيَّر قشرة الصفحة (الشريط الجانبي، والترويسة) فورًا</li>
<li>تظهر الهياكل العظمية الاحتياطية لكل قسم</li>
<li>يظهر <code>StatsBar</code> بعد ~200ms مع استبدال الهيكل العظمي</li>
<li>يظهر <code>Chart</code> بعد ~800ms</li>
<li>يظهر <code>BigTable</code> بعد ~2000ms</li>
</ul>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>يُحمَّل كل قسم من لوحة التحليلات الآن باستقلال عبر Suspense. فيظهر شريط الإحصاءات ببطاقات مقاييسه الأربع أولًا، ويتبعه المخطط بعد نحو 600ms، ويصل الجدول أخيرًا. ويعرض كل منها عنصر الهيكل العظمي الخاص به أثناء التحميل. والفرق الجوهري عن الخطوة 1: أن حالة التحميل يديرها الآن آلية Suspense في React، لا <code>useState</code> اليدوي في كل مكوّن.</p>
<p><img src="/arabic-cs-library/images/kinney/0142a98c5bc53abb.webp" alt="شريط الإحصاءات محمَّل بينما المخطط والجدول ما زالا يعرضان هياكل عظمية"></p>
<p><img src="/arabic-cs-library/images/kinney/0bd9c26954e3e8f5.webp" alt="المخطط محمَّل مع شريط الإحصاءات، والجدول ما زال يُحمَّل"></p>
<p><img src="/arabic-cs-library/images/kinney/c02cd34e22318477.webp" alt="كل الأقسام محمَّلة بالكامل"></p>
<h2 id="التصيير-المتدفق-من-الخادم-مع-rendertopipeablestream">التصيير المتدفّق من الخادم مع <code>renderToPipeableStream</code></h2>
<p>تخدم حدود Suspense التي أضفتها في الخطوة 2 غرضين. ففي العميل، تعرض هياكل عظمية احتياطية أثناء تحميل البيانات. وفي الخادم، تخبر التصيير المتدفّق من الخادم في React أين يقسّم دفق HTML. وإليك شكل تطبيق التصيير المتدفّق من الخادم باستخدام حدود Suspense التي بنيتها بالفعل:</p>
<p><em>server/render.tsx</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { renderToPipeableStream } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom/server&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">StaticRouter</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-router-dom/server&quot;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">App</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./app&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Request</span>, <span class="hljs-title class_">Response</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;express&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">render</span>(<span class="hljs-params"><span class="hljs-attr">req</span>: <span class="hljs-title class_">Request</span>, <span class="hljs-attr">res</span>: <span class="hljs-title class_">Response</span></span>) {
  <span class="hljs-keyword">const</span> { pipe } = <span class="hljs-title function_">renderToPipeableStream</span>(
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StaticRouter</span> <span class="hljs-attr">location</span>=<span class="hljs-string">{req.url}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">StaticRouter</span>&gt;</span></span>,
    {
      <span class="hljs-attr">bootstrapScripts</span>: [<span class="hljs-string">&quot;/src/main.tsx&quot;</span>],
      <span class="hljs-title function_">onShellReady</span>(<span class="hljs-params"></span>) {
        <span class="hljs-comment">// The shell (everything outside Suspense boundaries) is ready.</span>
        <span class="hljs-comment">// Start piping HTML immediately—Suspense fallbacks render as real HTML.</span>
        <span class="hljs-comment">// Each Suspense boundary streams its resolved content later as a &lt;script&gt; tag</span>
        <span class="hljs-comment">// that swaps in the final markup.</span>
        res.<span class="hljs-title function_">setHeader</span>(<span class="hljs-string">&quot;Content-Type&quot;</span>, <span class="hljs-string">&quot;text/html&quot;</span>);
        <span class="hljs-title function_">pipe</span>(res);
      },
      <span class="hljs-title function_">onError</span>(<span class="hljs-params">error</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&quot;SSR error:&quot;</span>, error);
        res.<span class="hljs-property">statusCode</span> = <span class="hljs-number">500</span>;
      },
    },
  );
}
</code></pre>
<blockquote>
<p><strong><code>onShellReady</code> مقابل <code>onAllReady</code></strong></p>
<p>تمنحك واجهة <code>renderToPipeableStream</code> خياري استدعاء راجع لتحديد متى يبدأ تدفق HTML إلى العميل. فيُطلَق <code>onShellReady</code> بمجرد تصيير كل ما هو <em>خارج</em> حدود Suspense: قشرة التطبيق، والتنقل، والهياكل العظمية الاحتياطية. أما المحتوى داخل حدود Suspense فيتدفق لاحقًا مع حلّ كل حدّ. وينتظر <code>onAllReady</code> حتى يُحلّ كل شيء، بما في ذلك كل حدود Suspense—وهذا يمنحك سلوك «انتظر كل شيء» القديم. وللتصيير التدريجي، استخدم <code>onShellReady</code> دائمًا. ولا تستخدم <code>onAllReady</code> إلا للتوليد الساكن للمواقع أو للزواحف التي تحتاج HTML كاملًا.</p>
</blockquote>
<blockquote>
<p><strong>كيف يعمل الاستبدال المتدفّق في الكواليس</strong></p>
<p>عندما يُطلَق <code>onShellReady</code>، يرسل React HTML كاملًا للقشرة—بما في ذلك محتوى الاستبدال لكل حدّ Suspense مصيَّرًا كـHTML حقيقي (مكوّنات الهيكل العظمي). ومع حلّ كل حدّ Suspense على الخادم، يرسل React وسم <code>&lt;script&gt;</code> يحتوي HTML المحلول ودالة صغيرة تستبدله في موضعه الصحيح في DOM. وينفّذ المتصفح هذا السكربت المضمّن فورًا، مستبدلًا الهيكل العظمي بالمحتوى النهائي—بلا حاجة إلى أي إطار عمل JavaScript للاستبدال. ولهذا تبدو الصفحة وكأنها «تمتلئ» تدريجيًا حتى قبل أن يترطّب React في العميل.</p>
</blockquote>
<blockquote>
<p><strong>هذه الخطوة مفاهيمية</strong></p>
<p>إعداد وسيط Express أو وضع التصيير من الخادم في Vite خارج نطاق هذا التمرين. والخلاصة الجوهرية أن حدود Suspense لديك تعمل تلقائيًا مع <code>renderToPipeableStream</code>—ولست بحاجة إلى تغيير أي شيفرة مكوّن لتمكين التصيير المتدفّق من الخادم. فالمعمار الذي بنيته في الخطوتين 1-2 جاهز للتصيير من الخادم بحكم التصميم.</p>
</blockquote>
<blockquote>
<p><strong>الترطيب</strong></p>
<p>عندما يتلقى المتصفح HTML الأولي من التصيير المتدفّق من الخادم، يكون ترميزًا ساكنًا: فلا تستجيب الأزرار للنقر، ولا تُشغّل تغييرات الحالة إعادات تصيير، ولا تعمل التأثيرات. والترطيب هو أن يسير React في DOM القائم، ويقارنه بشجرة المكوّنات التي كان سيصيّرها في العميل، و«يتبنّى» عُقد DOM تلك بربط معالجات الأحداث والمراجع وإدارة الحالة. وبعد اكتمال الترطيب، يصير التطبيق تفاعليًا بالكامل. ولهذا يكون التصيير المتدفّق من الخادم قيّمًا حتى قبل انتهاء الترطيب: فيرى المستخدم محتوى حقيقيًا فورًا (HTML مصيَّرًا في الخادم)، ويصير تفاعليًا تدريجيًا مع ترطيب React لكل حدّ Suspense. أما عدم توافق الترطيب—حيث يختلف HTML المصيَّر في الخادم عمّا سيصيّره العميل—فيجعل React يتخلى عن ترميز الخادم ويعيد التصيير من الصفر، ملغيًا فائدة الأداء.</p>
</blockquote>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>فهمت كيف يستخدم <code>renderToPipeableStream</code> حدود Suspense لديك لبثّ HTML تدريجيًا. فالقشرة (الشريط الجانبي، والترويسة، والهياكل العظمية الاحتياطية) تُرسل أولًا، ثم يُبثّ كل حدّ Suspense محلول كوسم <code>&lt;script&gt;</code> استبدالي.</p>
<h2 id="جرب-مواضع-الحدود">جرّب مواضع الحدود</h2>
<p>يغيّر موضع حدود Suspense تجربة المستخدم. جرّب تهيئات مختلفة في <code>packages/analytics/src/analytics-dashboard.tsx</code> لتلمس المقايضات.</p>
<p>تعرض شجرة المكوّنات أدناه كيف تلفّ حدود Suspense كل مكوّن يجلب بياناته باستقلال. ويلتقط كل حدّ الوعود المرمية من تابعه ويعرض الاستبدال المقابل.</p>
<pre><code>graph TD
    AD[&quot;AnalyticsDashboard&quot;]
    SB_S[&quot;Suspense (card skeleton)&quot;]
    SB_C[&quot;Suspense (chart skeleton)&quot;]
    SB_T[&quot;Suspense (table skeleton)&quot;]
    Stats[&quot;StatsBar → statsResource.read()&quot;]
    Chart[&quot;Chart → chartResource.read()&quot;]
    Table[&quot;BigTable → tableResource.read()&quot;]

    AD --&gt; SB_S
    AD --&gt; SB_C
    AD --&gt; SB_T
    SB_S --&gt; Stats
    SB_C --&gt; Chart
    SB_T --&gt; Table
</code></pre>
<h3 id="التهيئة-a-حد-واحد-حول-كل-شيء">التهيئة A: حدّ واحد حول كل شيء</h3>
<pre><code class="language-typescript">&lt;<span class="hljs-title class_">Suspense</span> fallback={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;page&quot;</span> /&gt;</span></span>}&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StatsBar</span> /&gt;</span></span>
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> /&gt;</span></span>
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">BigTable</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">Suspense</span>&gt;
</code></pre>
<p>هذه مقاربة «كل شيء أو لا شيء». فتعرض منطقة التحليلات بأكملها هيكلًا عظميًا واحدًا حتى يُحلّ أبطأ مكوّن (<code>BigTable</code> عند 2000ms). فتبقى بيانات <code>StatsBar</code> السريعة غير مستخدمة 1800ms.</p>
<h3 id="التهيئة-b-حدود-فردية-الحالية">التهيئة B: حدود فردية (الحالية)</h3>
<pre><code class="language-typescript">&lt;<span class="hljs-title class_">Suspense</span> fallback={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;card&quot;</span> /&gt;</span></span>}&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StatsBar</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">Suspense</span>&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;chart&quot;</span> /&gt;</span>}&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;table&quot;</span> /&gt;</span>}&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">BigTable</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
</code></pre>
<p>يُصيَّر كل قسم بمجرد أن تصير بياناته جاهزة. أقصى تدريج ممكن، لكن الصفحة تنقل تخطيطها ثلاث مرات مع ظهور الأقسام تباعًا.</p>
<h3 id="التهيئة-c-حدود-مجمعة">التهيئة C: حدود مجمّعة</h3>
<pre><code class="language-typescript">&lt;<span class="hljs-title class_">Suspense</span> fallback={<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;card&quot;</span> /&gt;</span></span>}&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StatsBar</span> /&gt;</span></span>
&lt;/<span class="hljs-title class_">Suspense</span>&gt;
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">LoadingSkeleton</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;page&quot;</span> /&gt;</span>}&gt;
  <span class="hljs-tag">&lt;<span class="hljs-name">Chart</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">BigTable</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>
</code></pre>
<p>يُبثّ شريط الإحصاءات أولًا (تغذية راجعة سريعة)، ثم يظهر المخطط والجدول معًا عند حلّ الجدول. فتنقلبان مرتين بدل ثلاث. وبيانات المخطط جاهزة عند 800ms لكنها تنتظر حتى 2000ms لتُصيَّر لأنها تشترك في حدّ مع <code>BigTable</code>.</p>
<blockquote>
<p><strong>لا يوجد موضع صحيح في كل الحالات</strong></p>
<p>تمنح التهيئة B أسرع زمن لوصول المحتوى الأول، لكنها تسبب ثلاث نقلات تخطيط. وتقلّل التهيئة C نقلات التخطيط لكنها تؤخر المخطط 1200ms. أما التهيئة A فلها أسوأ زمن لوصول المحتوى الأول لكن بلا أي نقلات تخطيط. والاختيار الصحيح يعتمد على منتجك: فلوحة تحكم لحظية تستفيد من التصيير التدريجي (B)، بينما قد يفضّل تقرير كثيف البيانات استقرار الحدود المجمّعة (C). ولهذا حدود Suspense قرارات معمارية: فهي ترمّز أولويات المنتج في شجرة مكوّناتك.</p>
</blockquote>
<h3 id="جرب-كل-واحدة">جرّب كل واحدة</h3>
<p>بدّل بين التهيئات A وB وC. وراقب شلال الشبكة في DevTools وانتبه إلى إحساس الصفحة كمستخدم. ثم استقرّ على أي مقاربة تفضّل واتركها في مكانها.</p>
<h3 id="نقطة-تحقق">نقطة تحقق</h3>
<p>جرّبت موضعين مختلفين على الأقل لحدود Suspense ولاحظت كيف يغيّر كل منهما تجربة التحميل. وتستطيع أن تصف بدقة المقايضة بين زمن وصول المحتوى الأول واستقرار التخطيط.</p>
<h2 id="الحل">الحل</h2>
<p>إن كنت بحاجة إلى اللحاق، فالحالة المكتملة لهذا التمرين متاحة على الفرع <code>04-monorepos-start</code>:</p>
<pre><code class="language-bash">git checkout 04-monorepos-start
pnpm install
</code></pre>
<h2 id="أهداف-إضافية">أهداف إضافية</h2>
<ul>
<li><strong>أضف حدود أخطاء إلى جانب حدود Suspense:</strong> لفّ كل حدّ Suspense بـ<code>ErrorBoundary</code> من <code>@pulse/ui</code>. وأوقف الواجهة البرمجية المُحاكاة لنقطة نهاية واحدة (عدّل معالج MSW كي يعيد 500) وتحقق من أن حدّ الأخطاء يلتقط ذلك دون إسقاط بقية لوحة التحليلات.</li>
<li><strong>Suspense متداخل:</strong> أضف حدّ Suspense داخل <code>BigTable</code> حول عناصر التحكم في التقسيم إلى صفحات. وعندما يغيّر المستخدم الصفحات، تبقى ترويسة الجدول ظاهرة بينما تعرض الصفوف وحدها حالة تحميل.</li>
<li><strong><code>useTransition</code> للتنقل:</strong> لفّ تغييرات المسار في <code>useTransition</code> كي يبقى المسار السابق ظاهرًا أثناء تحميل بيانات المسار التالي، بدل عرض هيكل عظمي على مستوى الصفحة.</li>
</ul>
<h2 id="ما-التالي">ما التالي</h2>
<p>رأيت كيف تتحكم حدود Suspense في تجربة التحميل عبر مكوّنات تجلب بياناتها باستقلال. ولوحة التحليلات الآن بحزم متعددة (analytics وui وshared) لكن بلا تنسيق للبناء—فـ<code>pnpm -r build</code> يعيد بناء كل شيء في كل مرة. وفي التمرين التالي، ستضيف Turborepo للحصول على عمليات بناء واعية بالاعتمادات ومخزَّنة مؤقتًا، وتلمس الفرق عندما يستغرق البناء الثاني زمنًا يقارب الصفر.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
