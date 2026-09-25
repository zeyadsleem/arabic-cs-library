const t="patterns-dev",g="vue",o="أنماط Vue",e="renderless-components",n="المكوّنات بلا عرض",l=[{depth:2,id:"تبديل-تبديل-تبديل",text:"تبديل، تبديل، تبديل"},{depth:2,id:"المكونات-بلا-عرض",text:"المكوّنات بلا عرض"},{depth:2,id:"الدوال-المركبة-في-مقابل-المكونات-بلا-عرض",text:"الدوال المركّبة في مقابل المكوّنات بلا عرض"},{depth:2,id:"مصادر-مفيدة",text:"مصادر مفيدة"}],c=`<p>المكوّنات بلا عرض (renderless components) هي نمط في Vue <strong>يفصل منطق المكوّن عن عرضه التقديمي</strong>. ويوفّر هذا النمط طريقة لتغليف الوظائف دون <em>فرض التمثيل البصري للمكوّن</em>. وبعبارة أخرى، يركّز المكوّن بلا عرض على المنطق والسلوك فقط، ويترك عملية العرض إلى المكوّن الأصل.</p>
<p>تُعدّ المكوّنات بلا عرض مفيدة بشكل خاص عندما نحتاج إلى إنشاء منطق قابل لإعادة الاستخدام يمكن تطبيقه على تطبيقات واجهة مستخدم مختلفة. فمن خلال استخراج المنطق في مكوّن بلا عرض، يمكننا إعادة استخدامه بسهولة في سياقات مختلفة دون تكرار الشيفرة. وإذا كنت لا تزال مشتبكًا في هذه المرحلة، فلا تقلق! لنتعمّق أكثر في هذا المفهوم من خلال مثال.</p>
<h2 id="تبديل-تبديل-تبديل">تبديل، تبديل، تبديل</h2>
<p>تخيّل أن لديك عنصر واجهة تبديل (toggle) يحتاج إلى الاستخدام في أجزاء مختلفة من تطبيقك، لكن قد تكون لكل نسخة تمثيل بصري مختلف. فبعض مفاتيح التبديل قد تُعرض كأزرار، بينما قد تكون أخرى مربّعات اختيار أو مفاتيح تحويل.</p>
<p>يمكننا ببساطة إنشاء ثلاثة مكوّنات تبديل مختلفة للمثال أعلاه، لكننا نلاحظ أن كل عنصر تبديل يتشارك المنطق والسلوك نفسه. ولكل مفتاح تبديل حالة خاملة وأخرى نشطة تُتابَع عبر خاصية بيانات في المكوّن (مثل <code>checked</code>). وعندما يُنقر على مفتاح التبديل، تنتقل حالة المكوّن من الخاملة إلى النشطة والعكس (أي <code>checked = !checked</code>).</p>
<p>إليك صورة توضّح كيف يُبنى القسمان <code> و</code> في كل مكوّن:</p>
<p>نرى فورًا أننا يمكننا إنشاء نمط أكثر قابلية لإعادة الاستخدام عبر استخراج المنطق والسلوك المشتركين بحيث لا نضطر إلى تعريف الحالة وطرق التبديل مرارًا وتكرارًا في كل مكوّن تبديل على حدة. وهذه حالة ممتازة لاستخدام <a href="/book/patterns-dev/vue/composables">الدوال المركّبة (composables)</a>، إذ تتيح لنا هذه الدوال تغليف المنطق ذي الحالة المشترك ومشاركته عبر مكوّنات التبديل المختلفة.</p>
<p><strong>useCheckboxToggle</strong>:</p>
<pre><code>import { ref } from &quot;vue&quot;;

export function useCheckboxToggle() {
  const checkbox = ref(false);

  const toggleCheckbox = () =&gt; {
    checkbox.value = !checkbox.value;
  };

  return {
    checkbox,
    toggleCheckbox,
  };
}
</code></pre>
<p><strong>مكوّن تبديل</strong>:</p>
<pre><code>&lt;template&gt;
  &lt;div class=&quot;comp&quot;&gt;
    &lt;label class=&quot;switch&quot;&gt;
      &lt;input type=&quot;checkbox&quot; :value=&quot;checkbox&quot; @click=&quot;toggleCheckbox&quot; /&gt;
      &lt;div class=&quot;slider rounded&quot; :class=&quot;checkbox ? 'active' : ''&quot;&gt;&lt;/div&gt;
    &lt;/label&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { useCheckboxToggle } from &quot;./composables/useCheckboxToggle&quot;;

  const { checkbox, toggleCheckbox } = useCheckboxToggle();
&lt;/script&gt;
</code></pre>
<p>ورغم أن ما سبق يعمل جيّدًا جدًا لحالة الاستخدام لدينا، فإن Vue يقدّم لنا نمطًا آخر يوضّح كيف يمكننا إعادة استخدام منطق ذي حالة مع إبقائه منفصلًا عن العرض.</p>
<h2 id="المكونات-بلا-عرض">المكوّنات بلا عرض</h2>
<p>الفكرة الأساسية وراء المكوّنات بلا عرض هي إنشاء مكوّن لا يعرض أي HTML أو عناصر واجهة مستخدم بنفسه، بل يعرض حالته الداخلية وطرقه إلى المكوّن الأصل. ثم يتولّى المكوّن الأصل مهمة عرض واجهة المستخدم المناسبة بناءً على البيانات والسلوك المُتاح من المكوّن بلا عرض.</p>
<p>أما القدرة على جعل المكوّن الأصل يقرّر ما ينبغي عرضه فهي ممكنة بفضل المفهوم المعروف بـ <strong>الفتحات (slots)</strong>.</p>
<p>تتيح الفتحات للمكوّن الأصل حقن محتوى القالب في مكوّن فرعي، ويمكن اعتبارها أشبه بالخصائص (props)، لكن بدلًا من تمرير قيم JavaScript إلى الأسفل، فإنها تسمح بتمرير أجزاء من القالب إلى المكوّنات الفرعية.</p>
<p>لنبدأ بإنشاء مكوّن التبديل بلا عرض لدينا. وفي قسم \`\` من المكوّن، ستحتوي المنطق ذي الحالة المسؤول عن تبديل قيمة حالة <code>checkbox</code>.</p>
<pre><code>&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;

  const checkbox = ref(false);

  const toggleCheckbox = () =&gt; {
    checkbox.value = !checkbox.value;
  };
&lt;/script&gt;
</code></pre>
<p>وفي قسم <code>من المكوّن، سنستخدم عنصر</code> الخاص لنقرّر أن هذا هو المكان الذي سيوضع فيه محتوى القالب الذي يوفّره المكوّن الأصل.</p>
<pre><code>&lt;template&gt;
  &lt;slot&gt;&lt;/slot&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;

  const checkbox = ref(false);

  const toggleCheckbox = () =&gt; {
    checkbox.value = !checkbox.value;
  };
&lt;/script&gt;
</code></pre>
<p>سنحتاج إلى إتاحة الخصائص <code>checkbox</code> و<code>toggleCheckbox()</code> في المكوّن الأصل عندما نصرّح بالقالب الذي نريد عرضه في المكوّن الفرعي. ولتحقيق ذلك، يمكننا تمرير هاتين الخاصيتين إلى مخرج \`\` تمامًا كما نمرّر الخصائص إلى مكوّن.</p>
<pre><code>&lt;template&gt;
  &lt;slot :checkbox=&quot;checkbox&quot; :toggleCheckbox=&quot;toggleCheckbox&quot;&gt;&lt;/slot&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;

  const checkbox = ref(false);

  const toggleCheckbox = () =&gt; {
    checkbox.value = !checkbox.value;
  };
&lt;/script&gt;
</code></pre>
<p>في المكوّن الأصل، يمكننا الآن الإشارة إلى السمتين <code>checkbox</code> و<code>toggleCheckbox()</code> بينما نقرّر كيف نريد أن يُعرض المكوّن الفرعي.</p>
<p>لاحظ كيف أن المكوّن الذي أنشأناه لا يملك قالبًا خاصًا به؟ هذا بالضبط ما يجعله <strong>مكوّنًا بلا عرض</strong> — مكوّنًا يركّز على المنطق والسلوك فقط، ويترك العرض إلى المكوّن الأصل.</p>
<p>في المكوّن الأصل، سنحاول الآن عرض ثلاثة عناصر تبديل مختلفة، لكل منها تجربة مستخدم فريدة خاصة به. سنبدأ أولًا باستيراد المكوّن <code>ToggleComponent</code> بلا عرض الذي أنشأناه أعلاه.</p>
<pre><code>&lt;script setup&gt;
  import ToggleComponent from &quot;./components/ToggleComponent&quot;;
&lt;/script&gt;
</code></pre>
<p>الآن يمكننا محاولة عرض \`\` وأي ما نضعه داخل العناصر الفرعية للمكوّن سيكون هو محتوى فتحة القالب المُعرَض.</p>
<pre><code>&lt;template&gt;
  &lt;ToggleComponent&gt;
    &lt;!-- slot content --&gt;
    &lt;!-- (i.e. what gets rendered as the ToggleComponent template) --&gt;
  &lt;/ToggleComponent&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import ToggleComponent from &quot;./components/ToggleComponent&quot;;
&lt;/script&gt;
</code></pre>
<p>وحين نعرض محتوى فتحة المكوّن، سنحتاج إلى الوصول إلى الخصائص الموجودة في نطاق المكوّن الفرعي (<code>checkbox</code> و<code>toggleCheckbox()</code>). ولأننا مرّرنا هاتين السمتين إلى مخرج الفتحة (\`\`) في وقت سابق، يمكننا استخدام التوجيه <code>v-slot</code> لاستلام خصائص الفتحة هذه.</p>
<pre><code>&lt;template&gt;
  &lt;ToggleComponent v-slot=&quot;{ checkbox, toggleCheckbox }&quot;&gt;
    &lt;!-- slot content --&gt;
    &lt;!-- (i.e. what gets rendered as the ToggleComponent template) --&gt;
  &lt;/ToggleComponent&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import ToggleComponent from &quot;./components/ToggleComponent&quot;;
&lt;/script&gt;
</code></pre>
<p>بعد أن صارت خصائص الفتحة ذات الصلة متاحة لنا، يمكننا الآن عرض عنصر التبديل الأول. وسيكون هذا العنصر مفتاح تحويل (switch) ينتقل من الحالة الخاملة إلى الحالة النشطة اعتمادًا على قيمة الخاصية <code>checkbox</code>.</p>
<pre><code>&lt;template&gt;
  &lt;ToggleComponent v-slot=&quot;{ checkbox, toggleCheckbox }&quot;&gt;
    &lt;div class=&quot;comp&quot;&gt;
      &lt;label class=&quot;switch&quot;&gt;
        &lt;input type=&quot;checkbox&quot; :value=&quot;checkbox&quot; @click=&quot;toggleCheckbox&quot; /&gt;
        &lt;div class=&quot;slider rounded&quot; :class=&quot;checkbox ? 'active' : ''&quot;&gt;&lt;/div&gt;
      &lt;/label&gt;
    &lt;/div&gt;
  &lt;/ToggleComponent&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import ToggleComponent from &quot;./components/ToggleComponent&quot;;
&lt;/script&gt;
</code></pre>
<p>عند حفظ تغييراتنا، سيُعرض لنا مفتاح التحويل في تطبيقنا.</p>
<p>و يمكننا المضي قدمًا وإنشاء عنصرَي التبديل الآخرين بطريقة متشابهة جدًا. وسيكون عنصر التبديل الثاني زرًّا، وإذا ما النُقر عليه، يتناوب بين النص <code>Toggle | Yes 😀</code> والنص <code>Toggle | No 😔</code>.</p>
<pre><code>&lt;template&gt;
  &lt;!-- Toggle element 1 --&gt;
  &lt;ToggleComponent v-slot=&quot;{ checkbox, toggleCheckbox }&quot;&gt;
    &lt;div class=&quot;comp&quot;&gt;
      &lt;label class=&quot;switch&quot;&gt;
        &lt;input type=&quot;checkbox&quot; :value=&quot;checkbox&quot; @click=&quot;toggleCheckbox&quot; /&gt;
        &lt;div class=&quot;slider rounded&quot; :class=&quot;checkbox ? 'active' : ''&quot;&gt;&lt;/div&gt;
      &lt;/label&gt;
    &lt;/div&gt;
  &lt;/ToggleComponent&gt;

  &lt;!-- Toggle element 2 --&gt;
  &lt;ToggleComponent v-slot=&quot;{ checkbox, toggleCheckbox }&quot;&gt;
    &lt;div class=&quot;comp&quot;&gt;
      &lt;button class=&quot;toggle-button&quot; @click=&quot;toggleCheckbox&quot;&gt;
        Toggle | &lt;span&gt;{{ checkbox ? &quot;Yes 😀&quot; : &quot;No 😔&quot; }}&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/ToggleComponent&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import ToggleComponent from &quot;./components/ToggleComponent&quot;;
&lt;/script&gt;
</code></pre>
<p>وأخيرًا، سيكون عنصر التبديل الثالث زرَّي تبويب، وعند النقر على أيٍّ منهما تتبدّل الحالة النشطة للزرّين معًا.</p>
<pre><code>&lt;template&gt;
  &lt;!-- Toggle element 1 --&gt;
  &lt;ToggleComponent v-slot=&quot;{ checkbox, toggleCheckbox }&quot;&gt;
    &lt;div class=&quot;comp&quot;&gt;
      &lt;label class=&quot;switch&quot;&gt;
        &lt;input type=&quot;checkbox&quot; :value=&quot;checkbox&quot; @click=&quot;toggleCheckbox&quot; /&gt;
        &lt;div class=&quot;slider rounded&quot; :class=&quot;checkbox ? 'active' : ''&quot;&gt;&lt;/div&gt;
      &lt;/label&gt;
    &lt;/div&gt;
  &lt;/ToggleComponent&gt;

  &lt;!-- Toggle element 2 --&gt;
  &lt;ToggleComponent v-slot=&quot;{ checkbox, toggleCheckbox }&quot;&gt;
    &lt;div class=&quot;comp&quot;&gt;
      &lt;button class=&quot;toggle-button&quot; @click=&quot;toggleCheckbox&quot;&gt;
        Toggle | &lt;span&gt;{{ checkbox ? &quot;Yes 😀&quot; : &quot;No 😔&quot; }}&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/ToggleComponent&gt;

  &lt;!-- Toggle element 3 --&gt;
  &lt;ToggleComponent v-slot=&quot;{ checkbox, toggleCheckbox }&quot;&gt;
    &lt;div class=&quot;comp&quot;&gt;
      &lt;button
        :class=&quot;['tab-button', { active: checkbox }]&quot;
        @click=&quot;toggleCheckbox&quot;
      &gt;
        On
      &lt;/button&gt;
      &lt;button
        :class=&quot;['tab-button', { active: !checkbox }]&quot;
        @click=&quot;toggleCheckbox&quot;
      &gt;
        Off
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/ToggleComponent&gt;
&lt;/template&gt;

&lt;script setup&gt;
  import ToggleComponent from &quot;./components/ToggleComponent&quot;;
&lt;/script&gt;
</code></pre>
<p>بعد حفظ هذه التغييرات، سيُعرض لنا عناصر التبديل الثلاثة التي تبدو مختلفة لكنها تشترك في المنطق الأساسي نفسه.</p>
<p>JavaScript iconToggleComponent.vue</p>
<pre><code>&lt;template&gt;
  &lt;slot :checkbox=&quot;checkbox&quot; :toggleCheckbox=&quot;toggleCheckbox&quot;&gt;&lt;/slot&gt;
&lt;/template&gt;


&lt;script setup&gt;
import { ref } from &quot;vue&quot;;


const checkbox = ref(false);


/* eslint-disable-next-line no-unused-vars */
const toggleCheckbox = () =&gt; {
  checkbox.value = !checkbox.value;
};
&lt;/script&gt;
</code></pre>
<p><a href="https://codesandbox.io/embed/renderless-components-1-99h8zq">Open CodeSandbox</a></p>
<h2 id="الدوال-المركبة-في-مقابل-المكونات-بلا-عرض">الدوال المركّبة في مقابل المكوّنات بلا عرض</h2>
<p>الدوال المركّبة (composables) والمكوّنات بلا عرض هما نمطان في Vue يقدّمان منهجيتين مختلفتين لتغليف المنطق وإعادة استخدامه.</p>
<p>لقد رأينا في <a href="/book/patterns-dev/vue/composables">مقالنا السابق</a> أن الدوال المركّبة تتكوّن عادةً من دوال تُعيد بيانات وتفاعلية (reactive) وطرقًا، يمكن استيرادها واستخدامها في مكوّنات مختلفة. ومن جهة أخرى فإن المكوّنات بلا عرض تركّز على فصل منطق المكوّن عن عرضه التقديمي، عبر جعل المكوّن الأصل يتولّى عرض واجهة المستخدم المناسبة بناءً على البيانات والسلوك المُتاح من المكوّن بلا عرض.</p>
<p>يوصي <a href="https://vuejs.org/guide/reusability/composables.html#vs-renderless-components">توثيق Vue</a> باستخدام الدوال المركّبة كلما أمكن ذلك، لأن نمط المكوّن بلا عرض قد يترتّب عليه أحيانًا عبء أداء بسبب عدد نسخ المكوّنات الإضافية التي يتم إنشاؤها. لكن المكوّنات بلا عرض قد تكون مفيدة أحيانًا في المواقف التي نحتاج فيها إلى تحكّم دقيق في العرض و/أو نحتاج إلى إعادة استخدام كلٍّ من المنطق والتخطيط البصري.</p>
<h2 id="مصادر-مفيدة">مصادر مفيدة</h2>
<ul>
<li><a href="https://vuejs.org/guide/components/slots.html#slots">الفتحات | توثيق Vue</a></li>
<li><a href="https://vuejs.org/guide/components/slots.html#scoped-slots">المكوّنات بلا عرض | توثيق Vue</a></li>
</ul>
<p><img src="/images/patterns-dev/vue-renderless-components-74-renderless_toggles.webp" alt="المكوّنات بلا عرض"> <img src="/images/patterns-dev/vue-renderless-components-75-renderless_toggles_visual.webp" alt="المكوّنات بلا عرض"> <img src="/images/patterns-dev/vue-renderless-components-76-toggle_element_1.webp" alt="المكوّنات بلا عرض"></p>
`,p={book:t,chapter:"vue",chapterTitle:o,slug:e,title:n,headings:l,html:c};export{t as book,g as chapter,o as chapterTitle,p as default,l as headings,c as html,e as slug,n as title};
