const t="patterns-dev",c="vue",n="أنماط Vue",e="script-setup",o="إعداد السكربت",p=[{depth:2,id:"إعداد-السكربت-script-setup",text:"`` — إعداد السكربت (script setup)"},{depth:3,id:"لا-توجد-عبارة-return",text:"لا توجد عبارة return"},{depth:3,id:"لا-توجد-مكونات-مسجلة-محليا",text:"لا توجد مكوّنات مسجلة محليًا"},{depth:3,id:"defineprops",text:"defineProps()"},{depth:3,id:"defineemits",text:"defineEmits()"},{depth:2,id:"مقابل-setup",text:"`` مقابل setup()"},{depth:2,id:"موارد-مفيدة",text:"موارد مفيدة"}],s=`<p>قبل أن نتعمق في صيغة \`\` الخاصة بإعداد السكربت (script setup) وما هي، لنراجع بسرعة مفهومين — <strong>المكوّنات أحادية الملف (single-file components)</strong> و<strong>Composition API</strong>.</p>
<p>في Vue، تساعد SFCs على ربط المنطق عن طريق تمكيننا من تحديد HTML/CSS وJS للمكوّن داخل ملف <strong><code>.vue</code></strong> واحد. يتكون المكوّن أحادي الملف من ثلاثة أجزاء:</p>
<pre><code>&lt;template&gt;
  &lt;!-- HTML template goes here --&gt;
&lt;/template&gt;

&lt;script&gt;
  // JavaScript logic goes here
&lt;/script&gt;

&lt;style&gt;
  /* CSS styles go here */
&lt;/style&gt;
</code></pre>
<p>يحتوي <code>على ترميز المكوّن بصيغة HTML خالصة، ويصدّر</code> كائن المكوّن الذي يتكون من كل منطق JS داخله، ويحتوي \`\` على جميع أنماط المكوّن.</p>
<p>توفر Composition API دوال مستقلة تمثل القدرات الأساسية لـ Vue. تُستخدم هذه الدوال في المقام الأول داخل خيار <code>setup()</code> واحد، الذي يعمل كنقطة دخول لاستخدام Composition API.</p>
<pre><code>&lt;!-- Template --&gt;

&lt;script&gt;
  export default {
    name: &quot;MyComponent&quot;,
    setup() {
      // the setup function
    },
  };
&lt;/script&gt;

&lt;!-- Styles --&gt;
</code></pre>
<blockquote>
<p>تأكد من قراءة دليل <a href="/book/patterns-dev/vue/composables">الدوال القابلة للتركيب (composables)</a> للاطلاع بمزيد من التفصيل على المزايا التي توفرها Composition API مقارنة بصيغة Options API التقليدية.</p>
</blockquote>
<h2 id="إعداد-السكربت-script-setup">\`\` — إعداد السكربت (script setup)</h2>
<p>\`\` هو اختصار نحوي في وقت الترجمة يتيح صيغة أكثر إيجازًا وكفاءة عند تعريف خيارات Vue باستخدام Composition API. ووفقًا لتوثيق Vue، فإن هذه هي الصيغة الموصى بها إذا <a href="https://vuejs.org/api/sfc-script-setup.html">استخدمتَ SFCs وComposition API معًا</a>.</p>
<p>باستخدام كتلة <code>، يمكننا ضغط منطق المكوّن في كتلة واحدة، مما يلغي الحاجة إلى دالة \`setup()\` صريحة. لاستخدام صيغة </code>، يكفي أن نضيف السمة <code>setup</code> إلى كتلة \`\`.</p>
<pre><code>&lt;script setup&gt;
  // ...
&lt;/script&gt;
</code></pre>
<p>لنتستكشف بعض الاختلافات الرئيسية في الصيغة التي توفرها \`\`.</p>
<h3 id="لا-توجد-عبارة-return">لا توجد عبارة return</h3>
<p>مع صيغة \`\`، لم نعد بحاجة إلى تعريف عبارة <code>return</code> في نهاية الكتلة. فالارتباطات المعلنة في المستوى الأعلى (الدوال والمتغيرات والاستيرادات وما إلى ذلك) تكون متاحة ويمكن استخدامها مباشرةً في القالب.</p>
<h4>قبل</h4>
<pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: {{ count }}&lt;/p&gt;
    &lt;p&gt;Username: {{ state.username }}&lt;/p&gt;
    &lt;button @click=&quot;increment&quot;&gt;Increment Count&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import { ref, reactive, onMounted } from &quot;vue&quot;;

  setup() {
    const count = ref(0);
    const state = reactive({username: &quot;John&quot;});

    const increment = () =&gt; {
      count.value++;
    };

    onMounted(() =&gt; {
      console.log(&quot;Component mounted&quot;);
    });

    return {
      count,
      state,
      increment
    };
  },
&lt;/script&gt;
</code></pre>
<h4>بعد</h4>
<pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: {{ count }}&lt;/p&gt;
    &lt;p&gt;Username: {{ state.username }}&lt;/p&gt;
    &lt;button @click=&quot;increment&quot;&gt;Increment Count&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref, reactive, onMounted } from &quot;vue&quot;;

  const count = ref(0);
  const state = reactive({ username: &quot;John&quot; });

  const increment = () =&gt; {
    count.value++;
  };

  onMounted(() =&gt; {
    console.log(&quot;Component mounted&quot;);
  });
&lt;/script&gt;
</code></pre>
<h3 id="لا-توجد-مكونات-مسجلة-محليا">لا توجد مكوّنات مسجلة محليًا</h3>
<p>يتم التعرف على استيرادات المكوّنات وحلّها تلقائيًا داخل كتلة \`\` من دون الحاجة إلى 선언 المكوّن صراحةً ضمن خيار <code>components</code>.</p>
<h4>قبل</h4>
<pre><code>&lt;template&gt;
  &lt;ButtonComponent /&gt;
&lt;/template&gt;

&lt;script&gt;
  import ButtonComponent from &quot;./components/ButtonComponent.vue&quot;;

  export default {
    setup() {
      // the setup function
    },
    components: {
      ButtonComponent,
    },
  };
&lt;/script&gt;
</code></pre>
<h4>بعد</h4>
<pre><code>&lt;template&gt;
  &lt;ButtonComponent /&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ButtonComponent } from &quot;./components/Button&quot;;
&lt;/script&gt;
</code></pre>
<h3 id="defineprops"><code>defineProps()</code></h3>
<p>يمكن الوصول إلى الخصائص (<code>props</code>) مباشرةً داخل كتلة \`\` باستخدام دالة <code>defineProps()</code>.</p>
<h4>قبل</h4>
<pre><code>&lt;template&gt;
  &lt;button&gt;{{ buttonText }}&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    props: {
      buttonText: String,
    },
  };
&lt;/script&gt;
</code></pre>
<h4>بعد</h4>
<pre><code>&lt;template&gt;
  &lt;button&gt;{{ buttonText }}&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
  const { buttonText } = defineProps({
    buttonText: String,
  });
&lt;/script&gt;
</code></pre>
<p>تتيح <code>defineProps()</code> أيضًا الإعلان عن شكل الخصائص باستخدام TypeScript خالصًا.</p>
<pre><code>&lt;template&gt;
  &lt;button&gt;{{ buttonText }}&lt;/button&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
  const { buttonText } = defineProps&lt;{ buttonText: string }&gt;();
&lt;/script&gt;
</code></pre>
<p>لتقديم قيم افتراضية للخصائص في الإعلان الذي يعتمد على النوع فقط أعلاه، يمكننا استخدام ماكرو المُجمِّع <code>withDefaults()</code> لتحقيق ذلك.</p>
<pre><code>&lt;template&gt;
  &lt;button&gt;{{ buttonText }}&lt;/button&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
  const { buttonText } = withDefaults(defineProps&lt;{ buttonText: string }&gt;(), {
    buttonText: &quot;Initial button text&quot;,
  });
&lt;/script&gt;
</code></pre>
<p><code>defineProps</code> متاح فقط في \`\` ويمكن استخدامه من دون الحاجة إلى استيراده.</p>
<h3 id="defineemits"><code>defineEmits()</code></h3>
<p>مثل الخصائص، يمكن إحداث (emit) الأحداث المخصصة مباشرةً داخل كتلة \`\` باستخدام دالة <code>defineEmits()</code> في المكوّن.</p>
<h4>قبل</h4>
<pre><code>&lt;template&gt;
  &lt;button @click=&quot;closeButton&quot;&gt;Button Text&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    emits: [&quot;close&quot;],
    setup(props, { emit }) {
      const closeButton = () =&gt; emit(&quot;close&quot;);

      return {
        closeButton,
      };
    },
  };
&lt;/script&gt;
</code></pre>
<h4>بعد</h4>
<pre><code>&lt;template&gt;
  &lt;button @click=&quot;closeButton&quot;&gt;Button Text&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
  const emit = defineEmits([&quot;close&quot;]);
  const closeButton = () =&gt; emit(&quot;close&quot;);
&lt;/script&gt;
</code></pre>
<p>مثل <code>defineProps</code>، فإن <code>defineEmits</code> كلمة خاصة متاحة فقط في \`\` ويمكن استخدامها أيضًا من دون الحاجة إلى استيرادها. كما تتيح لنا تمرير الأنواع مباشرةً عند العمل ضمن إعداد TypeScript.</p>
<pre><code>&lt;template&gt;
  &lt;button @click=&quot;closeButton&quot;&gt;Button Text&lt;/button&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
  const emit = defineEmits&lt;{ (e: &quot;close&quot;): void }&gt;([&quot;close&quot;]);
  const closeButton = () =&gt; emit(&quot;close&quot;);
&lt;/script&gt;
</code></pre>
<h2 id="مقابل-setup">\`\` مقابل <code>setup()</code></h2>
<p>في المكوّنات الأكبر التي تحتوي على عدد كبير من الخيارات المُعادة ومكوّنات فرعية مسجلة محليًا، تساعد صيغة \`\` على إزالة الكثير من شيفرة التكرار، مما يؤدي إلى تعريفات أنظف وأكثر تركيزًا للمكوّنات، ويساعد لاحقًا على جعل الشيفرة أكثر قابلية للقراءة والصيانة.</p>
<p>إلى جانب تقليل شيفرة التكرار، توفر صيغة \`\` أيضًا أداءً (performance) أفضل وقت التشغيل، وأداءً أفضل لاستنتاج الأنواع في IDE، والقدرة على إعلان شكل الخصائص والأحداث المُحدَّثة باستخدام TypeScript.</p>
<p>للاطلاع على القائمة الكاملة للتغييرات التي يجب وضعها في الاعتبار عند العمل مع صيغة \`\`، راجع توثيق Vue الرسمي أدناه.</p>
<h2 id="موارد-مفيدة">موارد مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/api/sfc-script-setup.html">\`\` — إعداد السكربت (script setup) | توثيق Vue</a></li>
</ul>
<p><img src="/images/patterns-dev/vue-script-setup-77-script_setup_breakdown.webp" alt="&lt;script setup&gt;"></p>
`,u={book:t,chapter:"vue",chapterTitle:n,slug:e,title:o,headings:p,html:s};export{t as book,c as chapter,n as chapterTitle,u as default,p as headings,s as html,e as slug,o as title};
