const t="patterns-dev",p="vue",o="أنماط Vue",e="dynamic-components",n="المكوّنات الديناميكية",u=[{depth:2,id:"الحفاظ-على-الحالة-state",text:"الحفاظ على الحالة (state)"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],c=`<p>تمثّل المكوّنات الديناميكية (dynamic components) القدرة على تغيير (أي التبديل بين) المكوّنات ديناميكيًا عبر ربط سمة <code>is</code> بالعنصر المحجوز \`\`.</p>
<p>سنمرّ على مثال لفهم كيفية عمل المكوّنات الديناميكية على أفضل وجه. لنفترض لدينا مكوّنات منفصلة بعنوان <code>Home</code> و<code>Feed</code> و<code>History</code> تعرض ببساطة نصًا يوضّح أي مكوّن هي.</p>
<pre><code>&lt;!-- Home --&gt;
&lt;template&gt;&lt;div class=&quot;tab&quot;&gt;Home component&lt;/div&gt;&lt;/template&gt;

&lt;!-- Feed --&gt;
&lt;template&gt;&lt;div class=&quot;tab&quot;&gt;Feed component&lt;/div&gt;&lt;/template&gt;

&lt;!-- History --&gt;
&lt;template&gt;&lt;div class=&quot;tab&quot;&gt;History component&lt;/div&gt;&lt;/template&gt;
</code></pre>
<p>هدفنا هو بناء واجهة تعرض قائمة من علامات التبويب (tabs) يمكن النقر عليها. وبحسب علامة التبويب التي يتم النقر عليها، نريد عرض مكوّن معيّن ديناميكيًا.</p>
<p>عند التنقّل بين علامات التبويب، نريد أن يتم فكّ تركيب المكوّنات وتركيبها ديناميكيًا دون استخدام التوجيه (routing). ورغم أن تأمين شيء كهذا ممكن عبر عرض قوالب فرعية بشكل مشروط بمساعدة توجيهات مثل <a href="https://vuejs.org/guide/essentials/conditional.html"><code>v-if</code> و<code>v-else</code></a>، فإنها حالة مثالية لاستخدام المكوّنات الديناميكية في Vue.</p>
<p>في مكوّن <code>App</code> الأب الخاص بتطبيقنا، يمكننا أولًا استيراد المكوّنات الثلاثة منفردة لتكون متاحة في القالب. وسننشئ أيضًا خاصية تفاعلية باسم <code>currentTab</code> تُسنِد إليها قيمة أولية وهي <code>&quot;Home&quot;</code>.</p>
<pre><code>&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;
  import Home from &quot;./components/Home.vue&quot;;
  import Feed from &quot;./components/Feed.vue&quot;;
  import History from &quot;./components/History.vue&quot;;

  const currentTab = ref(&quot;Home&quot;);
  const tabs = {
    Home,
    Feed,
    History,
  };
&lt;/script&gt;
</code></pre>
<p>لاحظ أن كائن <code>tabs</code> لدينا يُشير إلى تعريفات المكوّنات الفعلية وليس إلى أسماء المكوّنات فقط.</p>
<p>في قالب مكوّن <code>App</code>، سنرغب في عرض ثلاثة أزرار تبويب منفصلة — واحد لكل مكوّن نعتزم عرضه. وسنستخدم <a href="https://vuejs.org/api/built-in-directives.html#v-for">التوجيه <code>v-for</code></a> للمساعدة في تحقيق ذلك. سنمرّ عبر قائمة <code>tabs</code> ونعرض قائمة من عناصر <code>. ولكل عنصر </code> يُعرض، سنربط قيمة علامة التبويب بسمة <code>key</code> في العنصر، ونعرض ديناميكيًا التصنيف <code>.active</code> إذا كانت علامة التبويب محدّدة/نشطة، ونضع معالج نقر (click handler) لتحديث قيمة المكوّن <code>currentTab</code> عند تحديد علامة التبويب.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;demo&quot;&gt;
    &lt;button
      v-for=&quot;(_, tab) in tabs&quot;
      :key=&quot;tab&quot;
      :class=&quot;['tab-button', { active: currentTab === tab }]&quot;
      @click=&quot;currentTab = tab&quot;
    &gt;
      {{ tab }}
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;
  import Home from &quot;./components/Home.vue&quot;;
  import Feed from &quot;./components/Feed.vue&quot;;
  import History from &quot;./components/History.vue&quot;;

  const currentTab = ref(&quot;Home&quot;);
  const tabs = {
    Home,
    Feed,
    History,
  };
&lt;/script&gt;
</code></pre>
<p>مع هذه التغييرات، ستظهر لنا ثلاثة أزرار تبويب في الوقت الحالي.</p>
<p>لعرض مكوّن فرعي معيّن ديناميكيًا، سنربط سمة <code>is</code> بالعنصر المحجوز \`\`. وينبغي أن تطابق القيمة المُسنَدة إلى السمة <code>is</code> المكوّن الفرعي الذي نريد عرضه ديناميكيًا. وفي حالتنا، سنستخدم خاصية البيانات <code>currentTab</code> لتحديد المكوّن الفرعي المختار في لحظة معيّنة.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;demo&quot;&gt;
    &lt;button
      v-for=&quot;(_, tab) in tabs&quot;
      :key=&quot;tab&quot;
      :class=&quot;['tab-button', { active: currentTab === tab }]&quot;
      @click=&quot;currentTab = tab&quot;
    &gt;
      {{ tab }}
    &lt;/button&gt;
    &lt;component :is=&quot;tabs[currentTab]&quot; class=&quot;tab&quot;&gt;&lt;/component&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;
  import Home from &quot;./components/Home.vue&quot;;
  import Feed from &quot;./components/Feed.vue&quot;;
  import History from &quot;./components/History.vue&quot;;

  // eslint-disable-next-line no-unused-vars
  const currentTab = ref(&quot;Home&quot;);

  // eslint-disable-next-line no-unused-vars
  const tabs = {
    Home,
    Feed,
    History,
  };
&lt;/script&gt;
</code></pre>
<p>مع وضع العنصر الديناميكي \`\` في قالبنا، سنلاحظ أن المكوّنات الفرعية يتم الآن فكّ تركيبها وتركيبها ديناميكيًا بحسب علامة التبويب التي تمّ اختيارها.</p>
<p>JavaScript iconApp.vue</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;demo&quot;&gt;
    &lt;button
      v-for=&quot;(_, tab) in tabs&quot;
      :key=&quot;tab&quot;
      :class=&quot;[&amp;#x27;tab-button&amp;#x27;, { active: currentTab === tab }]&quot;
      @click=&quot;currentTab = tab&quot;
    &gt;
      {{ tab }}
    &lt;/button&gt;
    &lt;component :is=&quot;tabs[currentTab]&quot; class=&quot;tab&quot;&gt;&lt;/component&gt;
  &lt;/div&gt;
&lt;/template&gt;


&lt;script setup&gt;
import { ref } from &quot;vue&quot;;
import Home from &quot;./components/Home.vue&quot;;
import Feed from &quot;./components/Feed.vue&quot;;
import History from &quot;./components/History.vue&quot;;


const currentTab = ref(&quot;Home&quot;);
const tabs = {
  Home,
  Feed,
  History,
};
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/dynamic-components-1-7qlvhk">فتح CodeSandbox</a></p>
<h2 id="الحفاظ-على-الحالة-state">الحفاظ على الحالة (state)</h2>
<p>قد يكون الحفاظ على الحالة اعتبارًا مهمًا ينبغي الإبقاء عليه في الاعتبار عند استخدام المكوّنات الديناميكية. وبالافتراضي، عند فكّ تركيب المكوّن تُفقد حالته. لكن Vue توفّر طريقة للحفاظ على حالة المكوّنات الديناميكية باستخدام مكوّن \`\`.</p>
<p>للحفاظ على حالة المكوّنات الديناميكية، يمكننا تغليف العنصر \`\` بمكوّن <code>&lt;KeepAlive</code>&gt;.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;demo&quot;&gt;
    &lt;!--  --&gt;
    &lt;KeepAlive&gt;
      &lt;component :is=&quot;tabs[currentTab]&quot; class=&quot;tab&quot;&gt;&lt;/component&gt;
    &lt;/KeepAlive&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // ...
&lt;/script&gt;
</code></pre>
<p>مع تغليف مكوّن <code>للعنصر</code>، ستُحفظ حالة المكوّنات الديناميكية عند فكّ تركيبها. وهذا يعني أن أيّ بيانات أو حالة للمكوّن ستبقى محفوظة، وسيحتفظ المكوّن بحالته السابقة عند تركيبه مرة أخرى.</p>
<p>ولرؤية مثال على ذلك، يمكننا تحديث كل مكوّن من مكوّناتنا الفرعية ليحتوي على عدّاد بسيط تتم زيادته.</p>
<pre><code>&lt;!-- Repeat this counter example for Home, Feed, and History --&gt;
&lt;template&gt;
  &lt;div class=&quot;tab&quot;&gt;
    Home component
    &lt;p&gt;Counter: {{ counter }}&lt;/p&gt;
    &lt;button @click=&quot;incrementCounter&quot;&gt;Increment&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;

  const counter = ref(0);

  // eslint-disable-next-line no-unused-vars
  const incrementCounter = () =&gt; {
    counter.value++;
  };
&lt;/script&gt;
</code></pre>
<p>مع هذه التغييرات، سنلاحظ أن حالة العدّاد لكل مكوّن فرعي تبقى محفوظة حتى مع تبديلنا الديناميكي بين المكوّنات.</p>
<p>وباستخدام مكوّن \`\`، يمكننا تحسين سلوك المكوّنات الديناميكية بحفظ حالتها وتوفير تجربة مستخدم أكثر سلاسة عند التنقّل بين علامات التبويب.</p>
<p>JavaScript iconApp.vue</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;demo&quot;&gt;
    &lt;button
      v-for=&quot;(_, tab) in tabs&quot;
      :key=&quot;tab&quot;
      :class=&quot;[&amp;#x27;tab-button&amp;#x27;, { active: currentTab === tab }]&quot;
      @click=&quot;currentTab = tab&quot;
    &gt;
      {{ tab }}
    &lt;/button&gt;
    &lt;KeepAlive&gt;
      &lt;component :is=&quot;tabs[currentTab]&quot; class=&quot;tab&quot;&gt;&lt;/component&gt;
    &lt;/KeepAlive&gt;
  &lt;/div&gt;
&lt;/template&gt;


&lt;script setup&gt;
import { ref } from &quot;vue&quot;;
import Home from &quot;./components/Home.vue&quot;;
import Feed from &quot;./components/Feed.vue&quot;;
import History from &quot;./components/History.vue&quot;;


const currentTab = ref(&quot;Home&quot;);
const tabs = {
  Home,
  Feed,
  History,
};
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/dynamic-components-2-7q9q4r">فتح CodeSandbox</a></p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/essentials/component-basics.html#dynamic-components">المكوّنات الديناميكية | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/built-ins/keep-alive.html">KeepAlive | توثيق Vue</a></li>
</ul>
<p><img src="/images/patterns-dev/vue-dynamic-components-67-dynamic_tabs.webp" alt="المكوّنات الديناميكية"> <img src="/images/patterns-dev/vue-dynamic-components-68-dynamic_tabs_initial.webp" alt="المكوّنات الديناميكية"> <img src="/images/patterns-dev/vue-dynamic-components-69-dynamic_components_preserve.webp" alt="المكوّنات الديناميكية"></p>
`,s={book:t,chapter:"vue",chapterTitle:o,slug:e,title:n,headings:u,html:c};export{t as book,p as chapter,o as chapterTitle,s as default,u as headings,c as html,e as slug,n as title};
