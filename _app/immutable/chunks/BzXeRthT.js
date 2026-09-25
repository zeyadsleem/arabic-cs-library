const t="patterns-dev",l="vue",e="أنماط Vue",n="components",o="المكوّنات",c=[{depth:2,id:"المكونات-لبنات-البناء",text:"المكوّنات = لبنات البناء"},{depth:2,id:"الحالة-التفاعلية",text:"الحالة التفاعلية"},{depth:2,id:"الخلاصة",text:"الخلاصة"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],a=`<p>مكوّنات Vue هي لبنات البناء الأساسية لتطبيقات Vue، إذ تتيح لنا دمج الترميز (HTML) والمنطق (JS) والأنماط (CSS) داخلها.</p>
<p>وحين نعمل داخل تطبيق Vue، من المهمّ أن نفهم أن كل عنصر تقريبًا يُعرض في واجهة المستخدم يكون غالبًا جزءًا من مكوّن Vue. والسبب في ذلك أن تطبيق Vue غالبًا ما يتكوّن من مكوّنات متداخلة داخل مكوّنات أخرى، مما يُشكّل بنية هرمية.</p>
<p>قابلية إعادة الاستخدام وقابلية الصيانة هما من أبرز الأسباب التي تجعل بناء تطبيق بمكوّنات ذات بنية جيدة أمرًا مهمًا بشكل خاص.</p>
<p>ولفهم المكوّنات فهمًا أفضل، سنقوم بإنشاء أحدها. وأبسط طريقة لإنشاء مكوّن Vue في تطبيق لا يحتوي على عملية بناء (build process) (مثل Webpack) هي إنشاء كائن JavaScript عادي يحتوي على خيارات خاصة بـ Vue.</p>
<pre><code>export default {
  props: [&quot;name&quot;],
  template: \`&lt;h1&gt;Hello, my name is {{ name }}&lt;/h1&gt;\`,
};
</code></pre>
<p>يحتوي المكوّن على خاصية <code>props</code> معرّفة، وهي تقبل خاصية واحدة اسمها <code>name</code>. والخصائص (props) هي وسيلة لتمرير البيانات إلى مكوّن من مكوّنه الأصل.</p>
<p>أما خاصية <code>template</code> فتعرّف قالب HTML الخاص بالمكوّن. وفي حالتنا هذه، تحتوي على وسم عنوان \`\` يعرض النص <code>&quot;Hello, my name is&quot;</code> تليه قيمة الخاصية <code>name</code>، يتم تصييرها باستخدام صيغة الأقواس المعقوفة المزدوجة في Vue وهي <code>{{ }}</code>.</p>
<p>إلى جانب تعريف المكوّنات ككائنات JavaScript عادية، فإن الطريقة الأكثر شيوعًا لإنشاء المكوّنات في Vue هي استخدام المكوّنات أحادية الملف (SFCs). والمكوّنات أحادية الملف هي مكوّنات تتيح لنا تعريف HTML وCSS وJS الخاص بالمكوّن كلٍّ منها داخل ملف <code>.vue</code> خاص، كما هو موضح أدناه:</p>
<pre><code>&lt;template&gt;
  &lt;h1&gt;Hello, my name is {{ name }}&lt;/h1&gt;
&lt;/template&gt;

&lt;script setup&gt;
  const { name } = defineProps([&quot;name&quot;]);
&lt;/script&gt;
</code></pre>
<blockquote>
<p>ملاحظة: المكوّنات أحادية الملف في Vue ممكنة بفضل أدوات البناء مثل <a href="https://vitejs.dev/">Vite</a>. فهذه الأدوات تساعد على ترجمة مكوّنات <code>.vue</code> إلى وحدات JavaScript عادية يمكن للمتصفحات فهمها.</p>
</blockquote>
<h2 id="المكونات-لبنات-البناء">المكوّنات = لبنات البناء</h2>
<p>سنمرّ على تمرين بسيط لتوضيح كيف يمكن تقسيم المكوّنات إلى مكوّنات أصغر. خذ المكوّن الخيالي <code>Tweet</code> التالي:</p>
<p>يمكن تنفيذ المكوّن أعلاه على النحو التالي:</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;Tweet&quot;&gt;
    &lt;image class=&quot;Tweet-image&quot; :src=&quot;image.imageUrl&quot; :alt=&quot;image.description&quot; /&gt;
    &lt;div class=&quot;User&quot;&gt;
      &lt;image class=&quot;Avatar&quot; :src=&quot;author.avatarUrl&quot; :alt=&quot;author.name&quot; /&gt;
      &lt;div class=&quot;User-name&quot;&gt;{{ author.name }}&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;Details&quot;&gt;
      &lt;div class=&quot;Tweet-text&quot;&gt;{{ text }}&lt;/div&gt;
      &lt;div class=&quot;Tweet-date&quot;&gt;{{ formatDate(date) }}&lt;/div&gt;
      &lt;!-- ... --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // ...
&lt;/script&gt;
</code></pre>
<p>يمكن النظر إلى المكوّن أعلاه والاعتبار أنه صعب التعديل بسبب مدى ازدحام محتواه، كما قد يكون الأمر صعبًا أيضًا عند إعادة استخدام أجزاء منه على حدة. ولجعل الأمور أكثر قابلية للتركيب (composable)، يمكننا استخراج بضعة مكوّنات من هذا المكوّن الواحد.</p>
<p>يمكن أن يكون المكوّن الرئيسي <code>Tweet</code> هو الأصل للمكوّنَي <code>TweetUser</code> و<code>TweetDetails</code>. وسيعرض <code>TweetUser</code> معلومات المستخدم، وسيكون هو الأصل لمكوّن <code>TweetAvatar</code> الذي يعرض صورة المستخدم الرمزية (avatar). وأما <code>TweetDetails</code> سيعرض ببساطة معلومات إضافية في التغريدة مثل نصّ التغريدة وتاريخ نشرها. وستبدو شجرة المكوّنات على النحو التالي:</p>
<p>يمكننا أولًا إنشاء المكوّن الفرعي <code>TweetAvatar</code> ليحتوي على عنصر صورة المستخدم الرمزية.</p>
<pre><code>&lt;template&gt;
  &lt;image class=&quot;Avatar&quot; :src=&quot;author.avatarUrl&quot; :alt=&quot;author.name&quot; /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // ...
&lt;/script&gt;
</code></pre>
<p>و بعدها يمكننا إنشاء المكوّن <code>TweetUser</code> الذي يعرض المكوّن <code>TweetAvatar</code> ومعلومات المستخدم ذات الصلة.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;User&quot;&gt;
    &lt;TweetAvatar /&gt;
    &lt;div class=&quot;User-name&quot;&gt;{{ author.name }}&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { TweetAvatar } from &quot;./TweetAvatar.vue&quot;;
&lt;/script&gt;
</code></pre>
<p>و يمكننا إنشاء المكوّن <code>TweetDetails</code> لعرض بقية المعلومات الموجودة في التغريدة.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;Details&quot;&gt;
    &lt;div class=&quot;Tweet-text&quot;&gt;{{ text }}&lt;/div&gt;
    &lt;div class=&quot;Tweet-date&quot;&gt;{{ formatDate(date) }}&lt;/div&gt;
    &lt;!-- ... --&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // ...
&lt;/script&gt;
</code></pre>
<p>وأخيرًا، يمكننا استخدام هذه المكوّنات الفرعية المُنشأة حديثًا لتبسيط قالب المكوّن الأصل <code>Tweet</code>.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;Tweet&quot;&gt;
    &lt;image class=&quot;Tweet-image&quot; :src=&quot;image.imageUrl&quot; :alt=&quot;image.description&quot; /&gt;
    &lt;TweetUser :author=&quot;author&quot; /&gt;
    &lt;TweetDetails :text=&quot;text&quot; :date=&quot;date&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  // ...
&lt;/script&gt;
</code></pre>
<p>يبدو استخراج المكوّنات عملًا مملًّا، لكن وجود مكوّنات قابلة لإعادة الاستخدام يجعل الأمور أسهل عند كتابة الشيفرة لتطبيقات أكبر. والمعيار الجيّد الذي يمكن نفكّره فيه عند تبسيط المكوّنات هو هذا — إذا كان جزء من واجهة المستخدم لديك يُستخدم عدّة مرّات (<code>Button</code>، <code>Panel</code>، <code>Avatar</code>)، أو كان معقّدًا بما يكفي بمفرده (<code>App</code>، <code>FeedStory</code>، <code>Comment</code>)، فإنّه مرشّح جيّد لاستخراجه في مكوّن منفصل.</p>
<h2 id="الحالة-التفاعلية">الحالة التفاعلية</h2>
<p>الحالة التفاعلية (reactive state) هي مفهوم أساسي في مكوّنات Vue يتيح واجهات مستخدم ديناميكية ومتجاوبة. وهو يتيح للمكوّنات <strong>أن تُحدِّث بيانات وتعكس تغييراتها تلقائيًا</strong>.</p>
<p>في Vue، يمكننا تعريف خصائص البيانات التفاعلية باستخدام الدالة <code>ref()</code> (للقيم الأولية المستقلّة) والدالة <code>reactive()</code> (للكائنات). ولنأخذ مثالًا بسيطًا لمكوّن عدّاد:</p>
<pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;h2&gt;Counter: {{ count }}&lt;/h2&gt;
    &lt;button @click=&quot;increment&quot;&gt;Increment&lt;/button&gt;
    &lt;button @click=&quot;decrement&quot;&gt;Decrement&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;

  const count = ref(0);

  const increment = () =&gt; {
    count.value++;
  };

  const decrement = () =&gt; {
    count.value--;
  };
&lt;/script&gt;
</code></pre>
<p>في المثال أعلاه، نعرّف خاصية تفاعلية اسمها <code>count</code> ونهيّئها بقيمة 0. ثم يستخدم القالب الأقواس المعقوفة المزدوجة <code>{{ }}</code> لعرض القيمة الحالية لـ <code>count</code>.</p>
<p>يتضمّن القالب أيضًا زرّين: <code>&quot;Increment&quot;</code> و<code>&quot;Decrement&quot;</code>، وهما مربوطان بالطريقتَي <code>increment()</code> و<code>decrement()</code> المقابلتين باستخدام التوجيه <code>@click</code>. وداخل هاتين الطريقتين، نصل إلى قيمة الخاصية التفاعلية <code>count</code> ونعدّلها. <strong>يكتشف Vue التغييرات ويحدّث عرض المكوّن تلقائيًا ليعكس القيمة الجديدة.</strong></p>
<p>توفّر الحالة التفاعلية في مكوّنات Vue طريقة سلسة لإدارة تتبّع تغييرات البيانات، مما يجعل بناء واجهات مستخدم تفاعلية وديناميكية أسهل.</p>
<p>JavaScript iconApp.vue</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;demo tab&quot;&gt;
    &lt;h2&gt;Counter: {{ count }}&lt;/h2&gt;
    &lt;button @click=&quot;increment&quot;&gt;Increment&lt;/button&gt;
    &lt;button @click=&quot;decrement&quot;&gt;Decrement&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;


&lt;script setup&gt;
import { ref } from &quot;vue&quot;;


const count = ref(0);


const increment = () =&gt; {
  count.value++;
};


const decrement = () =&gt; {
  count.value--;
};
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/components-1-lkx35t">Open CodeSandbox</a></p>
<h2 id="الخلاصة">الخلاصة</h2>
<p>يهدف هذا المقال إلى تقديم مقدّمة بسيطة لمفهوم المكوّنات. وفي المقالات والأدلة الأخرى، سنغوص أعمق في فهم الأنماط الشائعة والمهمة عند العمل مع Vue ومكوّنات Vue. ويشمل ذلك على سبيل المثال لا الحصر:</p>
<ul>
<li><a href="/book/patterns-dev/vue/script-setup">استخدام صيغة \`\`</a></li>
<li><a href="/book/patterns-dev/vue/composables">إنشاء دوال مركّبة لإعادة استخدام المنطق ذي الحالة</a></li>
<li><a href="/book/patterns-dev/vue/provide-inject">تمرير البيانات عبر عدّة مكوّنات باستخدام provide/inject</a></li>
<li><a href="/book/patterns-dev/vue/state-management">فهم إدارة الحالة على مستوى التطبيق</a></li>
<li><a href="/book/patterns-dev/vue/dynamic-components">استخدام المكوّنات الديناميكية للتبدّل بين المكوّنات ديناميكيًا</a></li>
<li><a href="/book/patterns-dev/vue/render-functions">عرض قوالب المكوّنات باستخدام JSX</a></li>
<li>وغيرها الكثير.</li>
</ul>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/essentials/component-basics.html#components-basics">أساسيات المكوّنات | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html">أساسيات التفاعلية | توثيق Vue</a></li>
</ul>
<p><img src="/images/patterns-dev/vue-components-54-badge.webp" alt="المكوّنات"> <img src="/images/patterns-dev/vue-components-55-tweet_component.webp" alt="المكوّنات"> <img src="/images/patterns-dev/vue-components-56-tweet_component_diagram_breakdown.webp" alt="المكوّنات"> <img src="/images/patterns-dev/vue-components-57-tweet_component_breakdown_diagram.webp" alt="المكوّنات"> <img src="/images/patterns-dev/vue-components-58-components_reactivity.webp" alt="المكوّنات"></p>
`,p={book:t,chapter:"vue",chapterTitle:e,slug:n,title:o,headings:c,html:a};export{t as book,l as chapter,e as chapterTitle,p as default,c as headings,a as html,n as slug,o as title};
