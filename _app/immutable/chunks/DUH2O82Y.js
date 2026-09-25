const n="patterns-dev",u="vue",t="أنماط Vue",e="composables",o="دوال التركيب",i=[{depth:2,id:"options-api",text:"Options API"},{depth:2,id:"composition-api",text:"Composition API"},{depth:2,id:"دوال-التركيب-composables",text:"دوال التركيب (composables)"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],d=`<h2 id="options-api">Options API</h2>
<p>قبل تقديم Composition API في Vue، كان المطوّرون يعتمدون على <strong>Options API</strong> لتنظيم منطق المكوّنات، والذي يشمل البيانات التفاعلية (reactive data)، ودورات الحياة، والخصائص المحسوبة (computed properties)، وغيرها. سمحت Options API بتعريف هذه الجوانب ضمن خيارات محدّدة، كما هو موضح في المثال أدناه:</p>
<pre><code>&lt;!-- Template --&gt;

&lt;script&gt;
  export default {
    name: &quot;MyComponent&quot;,
    props: {
      // props
    },
    data() {
      // data
    },
    computed: {
      // computed properties
    },
    watch: {
      // properties to watch
    },
    methods: {
      // methods
    },
    created() {
      // lifecyle methods like created
    },
    // ...
  };
&lt;/script&gt;

&lt;!-- Styles --&gt;
</code></pre>
<p>رغم أن هذا النهج يؤدّي غرضه ولا يزال قابلًا للتطبيق في Vue v3، إلا أنه قد يصبح صعب الإدارة والصيانة مع نمو المكوّنات وتعقيدها. فتعريف منطق المكوّن ضمن خيارات محدّدة يجعل قراءة الشيفرة وفهمها أصعب، خصوصًا عند التعامل مع مكوّنات كبيرة. كما يصبح استخراج المنطق المشترك وإعادة استخدامه بين المكوّنات صعبًا في هذا الإعداد.</p>
<p>لننظر إلى مثال بسيط لمكوّن <code>App</code> يعرض مكوّنين فرديين تابعين له — <code>Count</code> و<code>Width</code>.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;App&quot;&gt;
    &lt;Count :count=&quot;count&quot; :increment=&quot;increment&quot; :decrement=&quot;decrement&quot; /&gt;
    &lt;div id=&quot;divider&quot; /&gt;
    &lt;Width :width=&quot;width&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import Count from &quot;./components/Count.vue&quot;;
  import Width from &quot;./components/Width.vue&quot;;

  export default {
    name: &quot;App&quot;,
    data() {
      return {
        count: 0,
        width: 0,
      };
    },
    mounted() {
      this.handleResize();
      window.addEventListener(&quot;resize&quot;, this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener(&quot;resize&quot;, this.handleResize);
    },
    methods: {
      increment() {
        this.count++;
      },
      decrement() {
        this.count--;
      },
      handleResize() {
        this.width = window.innerWidth;
      },
    },
    components: {
      Count,
      Width,
    },
  };
&lt;/script&gt;
</code></pre>
<p>يمثّل مقتطف الشيفرة أعلاه مكوّن Vue أحادي الملف (SFC) باسم <code>App</code>.</p>
<p>يحدّد قسم <code>ترميز المكوّن (markup). وفي حالتنا هذه، يحتوي على عنصر</code> بالتصنيف “App” يلتف بمكوّنين تابعين: <code> و</code>. وتُمرَّر بعض الخصائص إلى هذين المكوّنين التابعين باستخدام صيغة ربط السمات في Vue (<code>:count</code> و<code>:increment</code> و<code>:decrement</code> و<code>:width</code>).</p>
<p>يحتوي قسم \`\` على شيفرة JavaScript الخاصة بالمكوّن. وهو يبدأ باستيراد المكوّنَين <code>Count</code> و<code>Width</code> من ملفّيهما. وتُستخدم عبارة <code>export default</code> لتصدير تعريف المكوّن. وداخل تعريف المكوّن لدينا:</p>
<ul>
<li>الدالة <code>data</code> التي تُعيد كائنًا يحتوي على خصائص البيانات الأولية للمكوّن، وهي <code>count</code> و<code>width</code> المهيّأَين إلى 0.</li>
<li>خطّاف دورة الحياة <code>mounted()</code> يُستخدم لتنفيذ الشيفرة بعد أن يكون المكوّن قد ثُبِّت في DOM. وفي هذه الحالة، يستدعي الدالة <code>handleResize()</code> ويضيف مستمعًا لحدث تغيير الحجم (resize).</li>
<li>خطّاف دورة الحياة <code>beforeUnmount()</code> يُستخدم لتنفيذ الشيفرة قبل أن يُزال المكوّن ويُدمَّر. وهنا يزيل مستمع الحدث الخاص بتغيير الحجم.</li>
<li>يحتوي الكائن <code>methods</code> على دوال المكوّن. وهو يعرّف الدوال <code>increment()</code> و<code>decrement()</code> و<code>handleResize()</code> التي تتلاعب بخصائص البيانات <code>count</code> و<code>width</code> استنادًا إلى أحداث أو إجراءات معيّنة.</li>
</ul>
<p>JavaScript iconApp.vue</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;App&quot;&gt;
    &lt;Count :count=&quot;count&quot; :increment=&quot;increment&quot; :decrement=&quot;decrement&quot; /&gt;
    &lt;div id=&quot;divider&quot; /&gt;
    &lt;Width :width=&quot;width&quot; /&gt;
  &lt;/div&gt;
 &lt;/template&gt;
 
 &lt;script&gt;
 import Count from &quot;./components/Count.vue&quot;;
 import Width from &quot;./components/Width.vue&quot;;
 
 export default {
  name: &quot;App&quot;,
  data() {
    return {
      count: 0,
      width: 0,
    };
  },
  mounted() {
    this.handleResize();
    window.addEventListener(&quot;resize&quot;, this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener(&quot;resize&quot;, this.handleResize);
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    handleResize() {
      this.width = window.innerWidth;
    },
  },
  components: {
    Count,
    Width,
  },
 };
 &lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/composables-1-srzc9w">فتح CodeSandbox</a></p>
<p>عند تشغيل التطبيق، يُعرض العدد الحالي والعرض الداخلي للنافذة في الوقت الفعلي. ويمكن للمستخدم التفاعل مع المكوّن عبر زيادة العدد أو إنقاصه باستخدام الأزرار في مكوّن \`\`.</p>
<p>وبالمثل، يُحدَّث العرض تلقائيًا كلما أُعيد تغيير حجم النافذة.</p>
<p>يمكن تصور بنية مكوّن <code>App.vue</code> أحادي الملف على النحو التالي:</p>
<p>رغم أن حجم هذا المكوّن صغير، فإن المنطق بداخله أصبح متشابكًا بالفعل. فبعض الأجزاء مخصّصة لوظيفة العدّاد، بينما تتعلّق أجزاء أخرى بمنطق العرض. ومع نمو المكوّن، يصبح تنظيم المنطق المرتبط داخله والعثور عليه أكثر صعوبة.</p>
<p>لمعالجة هذه التحديات، قدّم فريق Vue واجهة Composition API في Vue v3.</p>
<h2 id="composition-api">Composition API</h2>
<p>يمكن النظر إلى Composition API على أنها <strong>واجهة برمجية توفّر دوال مستقلة تمثّل القدرات الأساسية لـ Vue</strong>. وتُستخدم هذه الدوال أساسًا داخل خيار <code>setup()</code> واحد يعمل كنقطة دخول لاستخدام Composition API.</p>
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
<p>تُنفَّذ الدالة <code>setup()</code> قبل إنشاء المكوّن، وحين تكون خصائص المكوّن متاحة.</p>
<p>مع Composition API، يمكننا استيراد دوال مستقلة تساعدنا على الوصول إلى القدرات الأساسية لـ Vue داخل مكوّننا. لنُعِد كتابة مثال العدّاد والعرض الذي رأيناه أعلاه مع الاعتماد على صيغة Composition API.</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;App&quot;&gt;
    &lt;Count :count=&quot;count&quot; :increment=&quot;increment&quot; :decrement=&quot;decrement&quot; /&gt;
    &lt;div id=&quot;divider&quot; /&gt;
    &lt;Width :width=&quot;width&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import { ref, onMounted, onBeforeUnmount } from &quot;vue&quot;;
  import Count from &quot;./components/Count.vue&quot;;
  import Width from &quot;./components/Width.vue&quot;;

  export default {
    name: &quot;App&quot;,
    setup() {
      const count = ref(0);
      const width = ref(0);

      const increment = () =&gt; {
        count.value++;
      };

      const decrement = () =&gt; {
        count.value--;
      };

      const handleResize = () =&gt; {
        width.value = window.innerWidth;
      };

      onMounted(() =&gt; {
        handleResize();
        window.addEventListener(&quot;resize&quot;, handleResize);
      });

      onBeforeUnmount(() =&gt; {
        window.removeEventListener(&quot;resize&quot;, handleResize);
      });

      return {
        count,
        width,
        increment,
        decrement,
      };
    },
    components: {
      Count,
      Width,
    },
  };
&lt;/script&gt;
</code></pre>
<p>يبقى قسم <code>لمكوّننا كما هو، لكن في قسم</code> من مكوّننا نستخدم الآن Composition API مع الدالة <code>setup()</code>.</p>
<p>داخل الدالة <code>setup()</code>، نحن:</p>
<ul>
<li>نعرّف المتغيّرين التفاعليَّين <code>count</code> و<code>width</code> باستخدام الدالة <code>ref()</code> — وهي الدالة التي تقبل قيمة أولية واحدة (مثل سلسلة نصية أو رقم وغيرها) وتُعيد كائنًا تفاعليًّا قابلًا للتغيير.</li>
<li>نعرّف كذلك الدوال المخصّصة <code>increment()</code> و<code>decrement()</code> و<code>handleResize()</code>. وهذه الدوال مشابهة للدوال التي عرّفناها في مثال Options API السابق.</li>
<li>نستخدم دالة دورة الحياة <code>onMounted()</code> لاستدعاء الدالة المخصّصة <code>handleResize()</code> وإضافة مستمع لحدث تغيير الحجم عند تركيب المكوّن. وبالمثل، نستخدم دالة دورة الحياة <code>onBeforeUnmount()</code> لإزالة مستمع حدث تغيير الحجم قبل إزالة المكوّن.</li>
<li>تُعاد بعدها المتغيّرات التفاعلية والدوال المعرَّفة في الدالة <code>setup()</code>، مما يجعلها متاحة في قالب المكوّن.</li>
</ul>
<p>JavaScript iconApp.vue</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;App&quot;&gt;
    &lt;Count :count=&quot;count&quot; :increment=&quot;increment&quot; :decrement=&quot;decrement&quot; /&gt;
    &lt;div id=&quot;divider&quot; /&gt;
    &lt;Width :width=&quot;width&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;


&lt;script&gt;
import { ref, onMounted, onBeforeUnmount } from &quot;vue&quot;;
import Count from &quot;./components/Count.vue&quot;;
import Width from &quot;./components/Width.vue&quot;;


export default {
  name: &quot;App&quot;,
  setup() {
    const count = ref(0);
    const width = ref(0);


    const increment = () =&gt; {
      count.value++;
    };


    const decrement = () =&gt; {
      count.value--;
    };


    const handleResize = () =&gt; {
      width.value = window.innerWidth;
    };


    onMounted(() =&gt; {
      handleResize();
      window.addEventListener(&quot;resize&quot;, handleResize);
    });


    onBeforeUnmount(() =&gt; {
      window.removeEventListener(&quot;resize&quot;, handleResize);
    });


    return {
      count,
      width,
      increment,
      decrement,
    };
  },
  components: {
    Count,
    Width,
  },
};
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/composables-2-0j3l8z">فتح CodeSandbox</a></p>
<h2 id="دوال-التركيب-composables">دوال التركيب (composables)</h2>
<p>مع مثال الشيفرة السابق، قد لا يزال يتساءل أحد كيف تقدّم الدالة <code>setup()</code> أي ميزة للتطوير، إذ يبدو أنها ببساطة تطلب إلينا تصريح خيارات المكوّن ضمن دالة واحدة.</p>
<p>من بين الفوائد الرائعة لاعتماد Composition API هي <strong>القدرة على استخراج المنطق المشترك وإعادة استخدامه بين المكوّنات</strong>. ويرجع هذا الأمر إلى أننا نستطيع ببساطة تصريح دوال خاصة بنا تستخدم دوال التركيب (composition functions) المتاحة عالميًا في Vue، ويصبح من الممكن أن تكون دوالنا <em>سهلة الاستخدام في عدّة مكوّنات لتحقيق النتيجة نفسها</em>.</p>
<p>لنأخذ مثال العدّاد والعرض السابق خطوة أبعد، بإنشاء دوال تركيب (composables) تُغلّف المنطق المشترك بحيث يمكن إعادة استخدامه عبر المكوّنات.</p>
<p>أولًا، لننشئ دالة تركيب (composable) اسمها <code>useCounter</code>، وهي دالة تركيب تُغلّف وظيفة العدّاد وتُعيد القيمة الحالية لـ <code>count</code>، إضافة إلى دالة <code>increment()</code> ودالة <code>decrement()</code>.</p>
<blockquote>
<p>بحكم العرف، تبدأ أسماء دوال التركيب بكلمة المفتاح &quot;use&quot;.</p>
</blockquote>
<pre><code>import { ref } from &quot;vue&quot;;

export function useCounter(initialCount = 0) {
  const count = ref(initialCount);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  return {
    count,
    increment,
    decrement,
  };
}
</code></pre>
<p>وبالمثل، يمكننا إنشاء دالة تركيب اسمها <code>useWidth()</code> تُغلّف وظيفة العرض في تطبيقنا.</p>
<pre><code>import { ref, onMounted, onBeforeUnmount } from &quot;vue&quot;;

export function useWidth() {
  const width = ref(0);

  function handleResize() {
    width.value = window.innerWidth;
  }

  onMounted(() =&gt; {
    handleResize();
    window.addEventListener(&quot;resize&quot;, handleResize);
  });

  onBeforeUnmount(() =&gt; {
    window.removeEventListener(&quot;resize&quot;, handleResize);
  });

  return {
    width,
  };
}
</code></pre>
<p>في مكوّن <code>App</code> لدينا، يمكننا الآن استخدام دوال التركيب لتحقيق النتيجة نفسها:</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;App&quot;&gt;
    &lt;Count :count=&quot;count&quot; :increment=&quot;increment&quot; :decrement=&quot;decrement&quot; /&gt;
    &lt;div id=&quot;divider&quot; /&gt;
    &lt;Width :width=&quot;width&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import Count from &quot;./components/Count.vue&quot;;
  import Width from &quot;./components/Width.vue&quot;;
  import { useCounter } from &quot;./composables/useCounter&quot;;
  import { useWidth } from &quot;./composables/useWidth&quot;;

  export default {
    name: &quot;App&quot;,
    components: {
      Count,
      Width,
    },
    setup() {
      const { count, increment, decrement } = useCounter(0);
      const { width } = useWidth();

      return {
        count,
        increment,
        decrement,
        width,
      };
    },
  };
&lt;/script&gt;
</code></pre>
<p>مع هذه التغييرات، سيعمل تطبيقنا كما كان عليه من قبل، لكن ضمن إعداد أكثر قابلية للتركيب.</p>
<p>JavaScript iconApp.vue</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;App&quot;&gt;
    &lt;Count :count=&quot;count&quot; :increment=&quot;increment&quot; :decrement=&quot;decrement&quot; /&gt;
    &lt;div id=&quot;divider&quot; /&gt;
    &lt;Width :width=&quot;width&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;


&lt;script&gt;
import Count from &quot;./components/Count.vue&quot;;
import Width from &quot;./components/Width.vue&quot;;
import { useCounter } from &quot;./composables/useCounter&quot;;
import { useWidth } from &quot;./composables/useWidth&quot;;


export default {
  name: &quot;App&quot;,
  components: {
    Count,
    Width,
  },
  setup() {
    const { count, increment, decrement } = useCounter(0);
    const { width } = useWidth();


    return {
      count,
      increment,
      decrement,
      width,
    };
  },
};
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/composables-3-zr4q7x">فتح CodeSandbox</a></p>
<p>باستخدام دوال التركيب ضمن إعداد Composition API، تمكّنّا من تفكيك سياق تطبيقنا إلى أجزاء أصغر قابلة لإعادة الاستخدام تفصل المنطق عن بعضها.</p>
<p>لنُصوِّر التغييرات التي أجريناها للتو مقارنةً بمثال المكوّن الأول في Options API.</p>
<p>أدى استخدام دوال التركيب في Vue إلى تسهيل فصل منطق مكوّننا إلى عدة أجزاء أصغر. وأصبحت إعادة استخدام المنطق ذي الحالة نفسه سهلة الآن، إذ لم نعد مقيدين بتنظيم شيفرتنا ضمن خيارات محدّدة في Options API.</p>
<p>مع دوال التركيب، لدينا المرونة لاستخراج المنطق المشترك وإعادة استخدامه عبر المكوّنات. وهذا الفصل بين المسؤوليات يتيح لنا التركيز على وظيفة محدّدة داخل كل دالة تركيب، مما يجعل شيفرتنا <strong>أكثر وحداتية وأسهل في الصيانة</strong>.</p>
<p>وبتقسيم المنطق إلى أجزاء أصغر قابلة لإعادة الاستخدام، يمكننا تركيب مكوّناتنا باستخدام دوال التركيب هذه، فتجتمع الوظائف اللازمة دون تكرار الشيفرة. ويشجّع هذا النهج على <strong>إعادة استخدام الشيفرة</strong> ويقلّل خطر ازدواج الشيفرة والتعارضات فيها.</p>
<p>إضافةً إلى ذلك، يوفّر استخدام Composition API <strong>قابلية قراءة</strong> و<strong>فَهْم</strong> أفضل لمنطق المكوّن. فكل دالة تركيب تُغلّف جانبًا محدّدًا من سلوك المكوّن، مما يجعل التفكير فيه واختباره أسهل. كما يتيح تعاونًا أسهل بين أعضاء الفريق، لأن الشيفرة تصبح أكثر تنظيمًا ونظامًا.</p>
<p>وأخيرًا، يتيح بناء تطبيقات Vue باستخدام Composition API <strong>استنتاج الأنواع (type inference)</strong> بشكل أفضل. ولأن Composition API تساعدنا على التعامل مع منطق المكوّن عبر المتغيّرات ودوال JavaScript القياسية، يصبح بناء تطبيقات Vue واسعة النطاق باستخدام نظام أنواع ساكن مثل TypeScript أسهل بكثير!</p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/reusability/composables.html">دوال التركيب | توثيق Vue</a></li>
<li><a href="https://vueuse.org/">مجموعة من أدوات Utility الخاصة بـ Vue Composition API | VueUse</a></li>
</ul>
<p><img src="/images/patterns-dev/vue-composables-59-composables_count.webp" alt="دوال التركيب"> <img src="/images/patterns-dev/vue-composables-60-composables_width.webp" alt="دوال التركيب"> <img src="/images/patterns-dev/vue-composables-61-options_api_breakdown.webp" alt="دوال التركيب"> <img src="/images/patterns-dev/vue-composables-62-composables_breakdown.webp" alt="دوال التركيب"></p>
`,c={book:n,chapter:"vue",chapterTitle:t,slug:e,title:o,headings:i,html:d};export{n as book,u as chapter,t as chapterTitle,c as default,i as headings,d as html,e as slug,o as title};
