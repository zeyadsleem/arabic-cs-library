const t="patterns-dev",o="vanilla",n="أنماط JavaScript",e="static-import",p="الاستيراد الساكن (Static Import)",c=[],a=`<p>تتيح لنا الكلمة المفتاحية <code>import</code> استيراد الشيفرة التي تم تصديرها من وحدة أخرى. بشكل افتراضي، تُضاف جميع الوحدات التي نقوم بـ<em>استيرادها بشكل ساكن</em> (static import) إلى حزمة التحميل الأولية (bundle). وأي وحدة يتم استيرادها باستخدام صيغة الاستيراد الافتراضية في ES2015، أي <code>import module from 'module'</code>، فهي مستوردة بشكل ساكن.</p>
<p>لننظر إلى مثال! يحتوي تطبيق دردشة بسيط على مكوّن <code>Chat</code>، نقوم فيه باستيراد ثلاثة مكونات بشكل ساكن وعرضها: <code>UserProfile</code> و<code>ChatList</code> و<code>ChatInput</code> لكتابة الرسائل وإرسالها! وداخل وحدة <code>ChatInput</code>، نقوم باستيراد مكوّن <code>EmojiPicker</code> بشكل ساكن كي نتمكّن من إظهار منتقي الإيموجي للمستخدم عندما يُبدّل حالة زر الإيموجي.</p>
<p>JavaScript iconApp.js</p>
<pre><code>import React from &quot;react&quot;;


// Statically import Chatlist, ChatInput and UserInfo
import UserInfo from &quot;./components/UserInfo&quot;;
import ChatList from &quot;./components/ChatList&quot;;
import ChatInput from &quot;./components/ChatInput&quot;;


import &quot;./styles.css&quot;;


console.log(&quot;App loading&quot;, Date.now());


const App = () =&gt; (
  &lt;div className=&quot;App&quot;&gt;
    &lt;UserInfo /&gt;
    &lt;ChatList /&gt;
    &lt;ChatInput /&gt;
  &lt;/div&gt;
);


export default App;
</code></pre>
<p><a href="https://codesandbox.io/embed/staticimport-b0cgl">افتح CodeSandbox</a></p>
<p>تُنفَّذ الوحدات فور وصول المحرك (engine) إلى السطر الذي استوردناها فيه. وعندما تفتح وحدة التحكم، يمكنك أن ترى الترتيب الذي حُمِّلت به الوحدات!</p>
<p>JavaScript iconApp.js</p>
<pre><code>import React from &quot;react&quot;;


// Statically import Chatlist, ChatInput and UserInfo
import UserInfo from &quot;./components/UserInfo&quot;;
import ChatList from &quot;./components/ChatList&quot;;
import ChatInput from &quot;./components/ChatInput&quot;;


import &quot;./styles.css&quot;;


console.log(&quot;App loading&quot;, Date.now());


const App = () =&gt; (
  &lt;div className=&quot;App&quot;&gt;
    &lt;UserInfo /&gt;
    &lt;ChatList /&gt;
    &lt;ChatInput /&gt;
  &lt;/div&gt;
);


export default App;
</code></pre>
<p><a href="https://codesandbox.io/embed/pedantic-keldysh-bv7cj">افتح CodeSandbox</a></p>
<p>ولأن المكونات تم استيرادها بشكل ساكن، قام Webpack بتجميع الوحدات في حزمة التحميل الأولية. يمكننا رؤية الحزمة التي ينشئها Webpack بعد بناء التطبيق:</p>
<pre><code>Asset           Size      Chunks            Chunk Names
main.bundle.js  1.5 MiB    main  [emitted]  main
</code></pre>
<p>يتم تجميع الشيفرة المصدرية لتطبيق الدردشة الخاص بنا في حزمة واحدة: <code>main.bundle.js</code>. ويمكن لحجم الحزمة الكبير أن يؤثر بشكل كبير في زمن تحميل تطبيقنا، وذلك يعتمد على جهاز المستخدم واتصاله بالشبكة. وقبل أن يتمكّن مكوّن <code>App</code> من عرض محتوياته على شاشة المستخدم، عليه أولًا أن يحمّل جميع الوحدات ويحللها.</p>
<p>ولحسن الحظ، هناك طرق كثيرة لتسريع زمن التحميل! فنحن لا نضطر دائمًا إلى استيراد جميع الوحدات دفعة واحدة: ربما توجد وحدات ينبغي ألا تُعرض إلا استنادًا إلى تفاعل المستخدم، مثل <code>EmojiPicker</code> في هذه الحالة، أو تُعرض في موضع أدنى في الصفحة. وبدلًا من استيراد جميع المكونات بشكل ساكن، يمكننا <em>استيراد</em> الوحدات ديناميكيًا (dynamic import) بعد أن يكون مكوّن <code>App</code> قد عرض محتوياته وأصبح بإمكان المستخدم التفاعل مع تطبيقنا.</p>
`,s={book:t,chapter:o,chapterTitle:n,slug:e,title:p,headings:c,html:a};export{t as book,o as chapter,n as chapterTitle,s as default,c as headings,a as html,e as slug,p as title};
