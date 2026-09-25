const t="patterns-dev",l="vue",e="أنماط Vue",o="data-provider",n="نمط مزوّد البيانات",a=[{depth:2,id:"نمط-مزود-البيانات-data-provider-pattern",text:"نمط مزوّد البيانات (Data Provider Pattern)"},{depth:2,id:"هل-يمكننا-استخدام-دوال-التركيب-composables-بدلا-من-ذلك",text:"هل يمكننا استخدام دوال التركيب (Composables) بدلًا من ذلك؟"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],p=`<p>في <a href="/book/patterns-dev/vue/renderless-components">مقال</a> سابق، تعلّمنا كيف تساعدنا المكوّنات بلا عرض (renderless components) على فصل منطق المكوّن عن عرضه. ويصبح هذا مفيدًا عندما نحتاج إلى إنشاء منطق قابل لإعادة الاستخدام يمكن تطبيقه على تنفيذات واجهة مستخدم (UI) مختلفة.</p>
<p>كما تتيح لنا المكوّنات بلا عرض الاستفادة من نمط مفيد آخر يُعرف بـ<strong>نمط مزوّد البيانات (data provider pattern)</strong>.</p>
<h2 id="نمط-مزود-البيانات-data-provider-pattern">نمط مزوّد البيانات (Data Provider Pattern)</h2>
<p>نمط مزوّد البيانات هو نمط تصميم (design pattern) يكمّل نمط المكوّنات بلا عرض في Vue، إذ يركّز على توفير البيانات وقدرات إدارة الحالة للمكوّنات <em>دون preoccupation بكيفية عرض البيانات أو إظهارها</em>.</p>
<p>في نمط مزوّد البيانات، يتغلّف مكوّن مزوّد البيانات منطق جلب البيانات وإدارتها وإتاحتها لمكوّناته التابعة. ثم يمكن للمكوّنات التابعة استهلاك هذه البيانات واستخدامها في عرضها أو سلوكها الخاص.</p>
<p>يشجّع هذا النمط على الفصل بين المسؤوليات (separation of concerns)، إذ يتولّى مكوّن مزوّد البيانات المهامّ المتعلقة بالبيانات، بينما يمكن للمكوّنات التابعة التركيز على العرض والتفاعل.</p>
<p>لنوضّح نمط مزوّد البيانات بمثال. تخيّل تطبيقًا بسيطًا يعرض مقدّمة نكتة طريفة يتبعها ردّها الطريف (punchline). وللمساعدة في إظهار نكتات مختلفة عشوائيًا، سنستخدم نقطة نهاية الواجهة البرمجية العامة المجانية <a href="https://official-joke-api.appspot.com/random_joke">https://official-joke-api.appspot.com/random_joke</a> التي تُعيد نكتة عشوائية بصيغة JSON.</p>
<pre><code># https://official-joke-api.appspot.com/random_joke

{
  &quot;type&quot;: &quot;general&quot;,
  &quot;setup&quot;: &quot;How good are you at Power Point?&quot;,
  &quot;punchline&quot;: &quot;I Excel at it.&quot;,
  &quot;id&quot;: 129
}
</code></pre>
<p>سننشئ أولًا مكوّن مزوّد للبيانات اسمه <code>DataProvider</code> يتولّى مسؤولية جلب النكتة من الواجهة البرمجية. وفي قسم \`\` من المكوّن، سنستورد الدالتين <code>ref()</code> و<code>reactive()</code> من مكتبة Vue، ونسنِد قيمة عنوان نقطة النهاية إلى ثابت، ونضبط خصائص <code>data</code> و<code>loading</code> التفاعليّتين لالتقاط البيانات وحالة التحميل لطلب الواجهة البرمجية.</p>
<pre><code>&lt;script setup&gt;
  import { ref, reactive } from &quot;vue&quot;;

  const API_ENDPOINT_URL = &quot;https://official-joke-api.appspot.com/random_joke&quot;;

  const data = reactive({
    setup: null,
    punchline: null,
  });
  const loading = ref(false);
&lt;/script&gt;
</code></pre>
<p>سننشئ بعد ذلك دالة غير متزامنة (async) اسمها <code>fetchJoke()</code> مسؤولة عن جلب نكتة من نقطة نهاية الواجهة البرمجية المحدّدة. وستقوم الدالة بما يلي:</p>
<ul>
<li>تبدأ بضبط القيمة التفاعلية <code>loading</code> على <code>true</code>، ما يشير إلى أن النكتة قيد الجلب.</li>
<li>تستخدم الدالة الأصلية في المتصفّح <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch">fetch()</a> لإرسال طلب GET إلى نقطة نهاية الواجهة البرمجية.</li>
<li>تحوّل الاستجابة من الواجهة البرمجية إلى صيغة JSON باستخدام الدالة <code>response.json()</code>.</li>
<li>تستخرج قيمتَي <code>setup</code> و<code>punchline</code> من بيانات الطلب التي تمّ الحصول عليها وتسنيدهما إلى الخصائص المقابلة في كائن <code>data</code>.</li>
<li>وأخيرًا، تعيد ضبط القيمة <code>loading</code> إلى <code>false</code>، ما يشير إلى أنه تمّ جلب النكتة.</li>
</ul>
<p>مع هذه التغييرات، ستبدو دالتنا <code>fetchJoke()</code> على النحو التالي:</p>
<pre><code>&lt;script setup&gt;
  import { ref, reactive } from &quot;vue&quot;;

  const API_ENDPOINT_URL = &quot;https://official-joke-api.appspot.com/random_joke&quot;;

  const data = reactive({
    setup: null,
    punchline: null,
  });
  const loading = ref(false);

  const fetchJoke = async () =&gt; {
    loading.value = true;

    const response = await fetch(API_ENDPOINT_URL);
    const responseData = await response.json();

    data.setup = responseData.setup;
    data.punchline = responseData.punchline;
    loading.value = false;
  };

  fetchJoke();
&lt;/script&gt;
</code></pre>
<p>لاحظ أننا نستدعي الدالة <code>fetchJoke()</code> في نهاية قسم \`\`؟ هذا يضمن جلب النكتة فور عرض مكوّن <code>DataProvider</code>.</p>
<p>آخر ما تبقّى علينا فعله هو جعل الخصائص <code>data</code> و<code>loading</code> متاحة في المستهلك (المكوّن الذي يستهلك) لمكوّن <code>DataProvider</code>. وللقيام بذلك، يمكننا تمرير هذه الخصائص إلى عنصر <code>سنضعه في قسم</code>.</p>
<pre><code>&lt;template&gt;
  &lt;slot :checkbox=&quot;checkbox&quot; :toggleCheckbox=&quot;toggleCheckbox&quot;&gt;&lt;/slot&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref, reactive } from &quot;vue&quot;;

  const API_ENDPOINT_URL = &quot;https://official-joke-api.appspot.com/random_joke&quot;;

  const data = reactive({
    setup: null,
    punchline: null,
  });
  const loading = ref(false);

  const fetchJoke = async () =&gt; {
    loading.value = true;

    const response = await fetch(API_ENDPOINT_URL);
    const responseData = await response.json();

    data.setup = responseData.setup;
    data.punchline = responseData.punchline;
    loading.value = false;
  };

  fetchJoke();
&lt;/script&gt;
</code></pre>
<p>مع اكتمال مكوّن مزوّد البيانات بلا عرض، يمكننا الآن استخدامه في تطبيقنا. وفي مكوّن التطبيق الأب، سنستورد مكوّن <code>DataProvider</code> ونضعه داخل القالب.</p>
<pre><code>&lt;template&gt;
  &lt;DataProvider v-slot=&quot;{ data, loading }&quot;&gt;
    &lt;!-- ... --&gt;
  &lt;/DataProvider&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import DataProvider from &quot;./components/DataProvider.vue&quot;;
&lt;/script&gt;
</code></pre>
<p>بمجرد عرض مكوّن \`\`، فإننا نُجري طلبًا إلى نقطة النهاية لجلب نكتة، ويمكننا الوصول إلى قيمتَي <code>data</code> و<code>loading</code> الخاصتين بالطلب بفضل التوجيه <code>v-slot</code>.</p>
<p>داخل تصريح المكوّن \`\`، يمكننا إنشاء واجهة المستخدم التي تعرض رسالة تحميل إذا كان الطلب في حالة التحميل، أو تعرض مقدّمة النكتة وردّها الطريف عندما تكون البيانات متاحة.</p>
<pre><code>&lt;template&gt;
  &lt;DataProvider v-slot=&quot;{ data, loading }&quot;&gt;
    &lt;div class=&quot;joke-section&quot;&gt;
      &lt;p v-if=&quot;loading&quot;&gt;Joke is loading...&lt;/p&gt;
      &lt;p v-if=&quot;!loading&quot;&gt;{{ data.setup }}&lt;/p&gt;
      &lt;p v-if=&quot;!loading&quot;&gt;{{ data.punchline }}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/DataProvider&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import DataProvider from &quot;./components/DataProvider.vue&quot;;
&lt;/script&gt;
</code></pre>
<p>عند حفظ تغييراتنا، ستظهر لنا رسالة تحميل قصيرة يتبعها نكتة عشوائية.</p>
<p>وإذا احتجنا عرض نسخة أخرى من مقدّمة النكتة وردّها، ربما حتى بقالب مختلف، يمكننا ببساطة إعادة استخدام مكوّن \`\` وإنشاء العناصر الفرعية الجديدة التي نرغب في إظهارها.</p>
<pre><code>&lt;template&gt;
  &lt;DataProvider v-slot=&quot;{ data, loading }&quot;&gt;
    &lt;div class=&quot;joke-section&quot;&gt;
      &lt;p v-if=&quot;loading&quot;&gt;Joke is loading...&lt;/p&gt;
      &lt;p v-if=&quot;!loading&quot;&gt;{{ data.setup }}&lt;/p&gt;
      &lt;p v-if=&quot;!loading&quot;&gt;{{ data.punchline }}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/DataProvider&gt;

  &lt;DataProvider v-slot=&quot;{ data, loading }&quot;&gt;
    &lt;p v-if=&quot;loading&quot;&gt;Hold on one sec...&lt;/p&gt;
    &lt;div v-else class=&quot;joke-section&quot;&gt;
      &lt;details&gt;
        &lt;summary&gt;{{ data.setup }}&lt;/summary&gt;
        &lt;p&gt;{{ data.punchline }}&lt;/p&gt;
      &lt;/details&gt;
    &lt;/div&gt;
  &lt;/DataProvider&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import DataProvider from &quot;./components/DataProvider.vue&quot;;
&lt;/script&gt;
</code></pre>
<p>في واجهة المستخدم التي عرضناها للتو، نضع الآن ردّ النكتة الطريف داخل عنصر كشف (disclosure element) بفضل عنصري HTML <code> و</code>.</p>
<p>مع نمط مزوّد البيانات، أصبح بإمكاننا إدارة البيانات وتوفيرها لعناصر/مكوّنات مختلفة بطريقة مفكوكة (decoupled) وقابلة لإعادة الاستخدام. وبتجريد منطق جلب الواجهة البرمجية في مكوّن بلا عرض، يمكننا إعادة استخدام طلب بيانات الواجهة البرمجية في سياقات مختلفة دون تكرار الشيفرة.</p>
<p>JavaScript iconDataProvider.vue</p>
<pre><code>&lt;template&gt;
  &lt;slot :data=&quot;data&quot; :loading=&quot;loading&quot;&gt;&lt;/slot&gt;
&lt;/template&gt;


&lt;script setup&gt;
import { ref, reactive } from &quot;vue&quot;;


const API_ENDPOINT_URL = &quot;https://official-joke-api.appspot.com/random_joke&quot;;


const data = reactive({
  setup: null,
  punchline: null,
});
const loading = ref(false);


const fetchJoke = async () =&gt; {
  loading.value = true;


  const response = await fetch(API_ENDPOINT_URL);
  const responseData = await response.json();


  data.setup = responseData.setup;
  data.punchline = responseData.punchline;
  loading.value = false;
};


fetchJoke();
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/data-provider-1-5s36xn">فتح CodeSandbox</a></p>
<h2 id="هل-يمكننا-استخدام-دوال-التركيب-composables-بدلا-من-ذلك">هل يمكننا استخدام دوال التركيب (Composables) بدلًا من ذلك؟</h2>
<p>نعم! بدلًا من استخدام نمط مزوّد البيانات، يمكننا ببساطة الاستفادة من دوال التركيب (composables) لاستخراج منطق الجلب إلى دالة قابلة لإعادة الاستخدام.</p>
<pre><code>import { ref, reactive } from &quot;vue&quot;;

const API_ENDPOINT_URL = &quot;https://official-joke-api.appspot.com/random_joke&quot;;

export function useGetJoke() {
  const data = reactive({
    setup: null,
    punchline: null,
  });
  const loading = ref(false);

  const fetchJoke = async () =&gt; {
    loading.value = true;

    const response = await fetch(API_ENDPOINT_URL);
    const responseData = await response.json();

    data.setup = responseData.setup;
    data.punchline = responseData.punchline;
    loading.value = false;
  };

  fetchJoke();

  return { data, loading };
}
</code></pre>
<p>في نسخ المكوّنات لدينا، يمكننا عندها استيراد دالة التركيب واستخدامها للحصول على بيانات <code>data</code> وحالة <code>loading</code> لطلب معيّن.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;joke-section&quot;&gt;
    &lt;p v-if=&quot;loading&quot;&gt;Joke is loading...&lt;/p&gt;
    &lt;p v-if=&quot;!loading&quot;&gt;{{ data.setup }}&lt;/p&gt;
    &lt;p v-if=&quot;!loading&quot;&gt;{{ data.punchline }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { useGetJoke } from &quot;./composables/useGetJoke&quot;;

  const { data, loading } = useGetJoke();
&lt;/script&gt;
</code></pre>
<p>سيتصرّف تطبيقنا الآن تمامًا كما كان قبله مع مثال مزوّد البيانات الخاص بنا.</p>
<p>JavaScript iconApp.vue</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;joke-section&quot;&gt;
    &lt;p v-if=&quot;loading&quot;&gt;Joke is loading...&lt;/p&gt;
    &lt;p v-if=&quot;!loading&quot;&gt;{{ data.setup }}&lt;/p&gt;
    &lt;p v-if=&quot;!loading&quot;&gt;{{ data.punchline }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;


&lt;script setup&gt;
import { useGetJoke } from &quot;./composables/useGetJoke&quot;;


const { data, loading } = useGetJoke();
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/data-provider-2-s3r847">فتح CodeSandbox</a></p>
<p>يساعد نمط مزوّد البيانات على فصل منطق المكوّن عن عرضه،eby جعل المكوّن الأب يتولّى عرض واجهة المستخدم المناسبة بناءً على البيانات والسلوك المُتاحَين من المكوّن بلا عرض. لكن مع القدرة على إنشاء دوال تركيب قابلة لإعادة الاستخدام في Vue 3، يمكن استخدام دوال التركيب بالمثل في أغلب الحالات التي يمكن أن يُستخدم فيها نمط مزوّد البيانات.</p>
<p>وعند المفاضلة بين استخدام نمط مزوّد البيانات أو استخدام دوال التركيب بدلًا منه، نوصي باستخدام دوال التركيب كلما أمكن، لأن ذلك يتجنّب الحاجة إلى عرض نسخة من المكوّن في كل مرة يجب فيها جلب البيانات (وهذا قد يسبب <a href="https://vuejs.org/guide/reusability/composables.html#vs-renderless-components">عبء أداء (performance overhead)</a>).</p>
<p>إضافةً إلى ذلك، إذا كنت تستخدم أداة إدارة حالة مثل <a href="https://pinia.vuejs.org/">Pinia</a> لإدارة كيفية توفير البيانات للمكوّنات، فمن المرجّح أن تكون طلبات الواجهة البرمجية لديك موجودة في <a href="https://pinia.vuejs.org/core-concepts/actions.html#actions">actions()</a> الخاصة بمخزنك (store). ومع وجود نمط إدارة الحالة هذا بالفعل، تصبح الحاجة إلى استخدام نمط مكوّن مزوّد البيانات أقل أهمية.</p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/components/slots.html#scoped-slots">المكوّنات بلا عرض | توثيق Vue</a></li>
</ul>
<p><img src="/images/patterns-dev/vue-data-provider-64-data_provider_pattern.webp" alt="نمط مزوّد البيانات"> <img src="/images/patterns-dev/vue-data-provider-65-data_provider_example.webp" alt="نمط مزوّد البيانات"> <img src="/images/patterns-dev/vue-data-provider-66-data_provider_example_2.webp" alt="نمط مزوّد البيانات"></p>
`,s={book:t,chapter:"vue",chapterTitle:e,slug:o,title:n,headings:a,html:p};export{t as book,l as chapter,e as chapterTitle,s as default,a as headings,p as html,o as slug,n as title};
