const t="patterns-dev",n="vanilla",e="أنماط JavaScript",o="mediator-pattern",d="نمط الوسيط/البرمجيات الوسيطة (mediator/middleware)",a=[{depth:2,id:"وسيط-مخصص-بسيط",text:"وسيط مخصص بسيط"},{depth:2,id:"الوسيط-مقابل-البرمجيات-الوسيطة",text:"الوسيط مقابل البرمجيات الوسيطة"},{depth:2,id:"عندما-يكون-الوسيط-آلة-حالات",text:"عندما يكون الوسيط آلة حالات"},{depth:2,id:"الوسيط-مقابل-الواجهة-facade-مقابل-ناقل-الأحداث",text:"الوسيط مقابل الواجهة (facade) مقابل ناقل الأحداث"},{depth:2,id:"المزالق-الشائعة",text:"المزالق الشائعة"},{depth:3,id:"وسيط-الكائن-الإلهي",text:"وسيط الكائن الإلهي"},{depth:3,id:"مكونات-تعرف-بعضها-سرا",text:"مكونات تعرف بعضها سرًا"},{depth:3,id:"صعوبة-التتبع-في-وقت-التشغيل",text:"صعوبة التتبّع في وقت التشغيل"},{depth:3,id:"إشعارات-إعادة-الدخول",text:"إشعارات إعادة الدخول"},{depth:2,id:"متى-لا-تستخدم-وسيطا",text:"متى لا تستخدم وسيطًا"},{depth:2,id:"المراجع",text:"المراجع"}],s=`<p>الوسيط (mediator) هو الكائن الموجود في الوسط. بدلًا من أن تعرف المكونات بعضها بعضًا، تتحدث المكونات إلى الوسيط، الذي يقرر ما ينبغي أن يحدث تاليًا. تخيل مشرفًا في غرفة محادثة مزدحمة: تمر كل رسالة عبره، وهو يفرض القواعد — من يحق له التحدث، ومن يُكتم، وأي رسالة تُثبت. لا يحتاج المشاركون إلى معرفة الآخرين بالاسم. كل ما يحتاجونه هو معرفة وجود مشرف يستمع إليهم.</p>
<p>من دون وسيط، ينتهي نظام فيه N مكونات يحتاج كل منها إلى التحدث مع جميع الآخرين إلى عدد اتصالات من رتبة N². يعرف كل مكون بقية المكونات، وتغيير واحد يجعل نطاق الضرر كل شيء. أما مع الوسيط، فلدى كل مكون قناة اتصال واحدة: إلى الوسط. والوسط هو الشيء الوحيد الذي عليه أن يفهم رقصة التنسيق.</p>
<h2 id="وسيط-مخصص-بسيط">وسيط مخصص بسيط</h2>
<p>إليك وسيطًا صغيرًا ينسق خطوات معالج نموذج متعدد الخطوات. لدى المعالج مكونات خطوات مستقلة (المعلومات الشخصية، وعنوان الشحن، والدفع)، ويحتاج أحدها إلى تحديد معنى «التالي» وفق الحالة الحالية. هذا القرار يقع على الوسيط، ولا يتكرر في كل خطوة.</p>
<pre><code>class WizardMediator {
  #steps = [];
  #current = 0;
  #data = {};
  #listeners = new Set();

  registerSteps(steps) {
    this.#steps = steps;
  }

  notify(sender, event, payload) {
    switch (event) {
      case &quot;submit&quot;: {
        Object.assign(this.#data, payload);
        const nextIndex = this.#computeNext(sender, payload);
        if (nextIndex &gt;= this.#steps.length) {
          this.#emit({ type: &quot;complete&quot;, data: this.#data });
        } else {
          this.#current = nextIndex;
          this.#emit({ type: &quot;advance&quot;, step: this.#steps[nextIndex] });
        }
        break;
      }
      case &quot;back&quot;:
        this.#current = Math.max(0, this.#current - 1);
        this.#emit({ type: &quot;advance&quot;, step: this.#steps[this.#current] });
        break;
      case &quot;cancel&quot;:
        this.#data = {};
        this.#current = 0;
        this.#emit({ type: &quot;reset&quot; });
        break;
    }
  }

  // The conditional flow lives here, not in any one step.
  #computeNext(sender, payload) {
    if (sender === &quot;personal&quot; &amp;&amp; payload.accountType === &quot;guest&quot;) {
      return this.#steps.indexOf(&quot;payment&quot;); // skip address-on-file
    }
    return this.#current + 1;
  }

  subscribe(fn) {
    this.#listeners.add(fn);
    return () =&gt; this.#listeners.delete(fn);
  }

  #emit(event) {
    for (const fn of this.#listeners) fn(event);
  }
}
</code></pre>
<p>لدى كل مكون خطوة عقد صغير مع الوسيط: استدعِ <code>notify(&quot;submit&quot;, { ... })</code> عندما ينقر المستخدم على «التالي». لا تستورد الخطوة أي خطوة أخرى، ولا تعرف أي خطوة تأتي بعدها، ولا تتخذ قرارات بشأن المسار. فالوسيط يملك كل ذلك.</p>
<p>إذا أخبرك قسم التسويق في الربع المقبل بأن خطوة العنوان ينبغي تخطيها لحسابات B2B، فغيّر فرعًا واحدًا في <code>#computeNext</code>. ولا تحتاج مكونات الخطوة إلى معرفة وجود القاعدة.</p>
<h2 id="الوسيط-مقابل-البرمجيات-الوسيطة">الوسيط مقابل البرمجيات الوسيطة</h2>
<p>البرمجيات الوسيطة (middleware) — برمجيات Redux الوسيطة، وApollo Link، وHono، وfastify، وأطر الخادم (server) بكل أشكالها — هي وسيط مقدم في صورة خط أنابيب. بدلًا من كائن واحد يقرر ما يجب فعله، تكوّن سلسلة من الدوال الصغيرة، يمكن لكل منها فحص الرسالة أو تحويلها أو قطع مسارها أو تمريرها.</p>
<p>إليك محركًا صغيرًا للبرمجيات الوسيطة، بالشكل نفسه الذي تستخدمه كل أطر تحاكي Express في داخلها:</p>
<pre><code>function createPipeline(...middleware) {
  return function dispatch(ctx) {
    let index = -1;

    function runFrom(i) {
      if (i &lt;= index) throw new Error(&quot;next() called multiple times&quot;);
      index = i;
      const fn = middleware[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, () =&gt; runFrom(i + 1)));
    }

    return runFrom(0);
  };
}
</code></pre>
<p>المعالج هو <code>(context, next) =&gt; ...</code>. ويفوض استدعاء <code>next()</code> التنفيذ إلى الحلقة التالية في السلسلة، بينما عدم استدعائه يقطع بقية المسار. ولأن كل خطوة تحصل على <code>ctx</code> نفسه، تتراكم التعديلات بالطريقة نفسها في Express أو Koa أو Hono.</p>
<pre><code>const handle = createPipeline(
  async (ctx, next) =&gt; {
    const started = performance.now();
    await next();
    console.log(\`\${ctx.path} \${performance.now() - started}ms\`);
  },

  async (ctx, next) =&gt; {
    const token = ctx.headers.authorization;
    if (!token) {
      ctx.response = { status: 401, body: &quot;Unauthorized&quot; };
      return; // short-circuit
    }
    ctx.user = await verify(token);
    await next();
  },

  async (ctx) =&gt; {
    ctx.response = { status: 200, body: \`Hello, \${ctx.user.name}\` };
  }
);

await handle({ path: &quot;/me&quot;, headers: { authorization: &quot;Bearer ...&quot; } });
</code></pre>
<p>الشكل نفسه يشغل <strong>البرمجيات الوسيطة في Redux</strong> (ترى كل برمجية وسيطة الإجراء وتقرر هل تُطلق الإجراء التالي)، و<strong>Apollo Link</strong> (يلتف كل رابط حول عملية)، و<strong>Hono / Koa</strong> (يلتف كل برمجية وسيطة حول الطلب (request)). وحين تتعرف على النمط، فستراه في كل مكان.</p>
<h2 id="عندما-يكون-الوسيط-آلة-حالات">عندما يكون الوسيط آلة حالات</h2>
<p>للتنسيق المعقد فعلًا — مثل تدفق الدفع مع إعادة المحاولة، أو رفع ملف مع إيقاف مؤقت واستئناف وإلغاء، أو مشغل فيديو مع تخزين مؤقت وتعطل واسترداد من الأخطاء — تكون آلة الحالات المحدودة (finite state machine) غالبًا الشكل المناسب للوسيط. الحالات والانتقالات هي البروتوكول، وترسل المكونات الأحداث إلى الآلة بدلًا من استدعاء بعضها بعض.</p>
<p>تجعل <a href="https://stately.ai/docs/xstate">XState</a> ذلك صريحًا:</p>
<pre><code>import { setup, createActor } from &quot;xstate&quot;;

const uploadMachine = setup({
  actions: {
    sendBytes: ({ context }) =&gt; api.upload(context.file),
    cleanup:   ({ context }) =&gt; api.abort(context.uploadId),
  },
}).createMachine({
  id: &quot;upload&quot;,
  initial: &quot;idle&quot;,
  context: { file: null, uploadId: null, progress: 0 },
  states: {
    idle:     { on: { START:  &quot;uploading&quot; } },
    uploading: {
      entry: &quot;sendBytes&quot;,
      on: {
        PROGRESS: { actions: ({ context, event }) =&gt; (context.progress = event.value) },
        DONE:    &quot;success&quot;,
        ERROR:   &quot;failed&quot;,
        CANCEL:  { target: &quot;idle&quot;, actions: &quot;cleanup&quot; },
      },
    },
    success: { type: &quot;final&quot; },
    failed:  { on: { RETRY: &quot;uploading&quot; } },
  },
});

const upload = createActor(uploadMachine).start();
upload.send({ type: &quot;START&quot; });
</code></pre>
<p>تطلق واجهة المستخدم الأحداث. وتقرر الآلة ما هو مسموح — إذ تُتجاهل <code>PROGRESS</code> أثناء <code>idle</code> بصمت، ولا تعمل <code>RETRY</code> إلا من <code>failed</code>، وهكذا. ولا يمكن للانتقالات غير القانونية أن تحدث لأنها ليست في المخطط.</p>
<h2 id="الوسيط-مقابل-الواجهة-facade-مقابل-ناقل-الأحداث">الوسيط مقابل الواجهة (facade) مقابل ناقل الأحداث</h2>
<p>يختلط الناس كثيرًا بين هذه الأنماط الثلاثة. وهي ليست الشيء نفسه.</p>
<table>
<thead>
<tr>
<th></th>
<th>الوسيط</th>
<th>ناقل الأحداث (نشر/اشتراك)</th>
<th>الواجهة (facade)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الاتجاه</strong></td>
<td>متعدد الاتجاهات — تتحدث المكونات إليه، وهو يتحدث إليها</td>
<td>إرسال بلا انتظار — لا يعرف الناشرون المشتركين</td>
<td>أحادي الاتجاه — يستدعيه المستدعي، وتخفي الواجهة التعقيد</td>
</tr>
<tr>
<td><strong>يملك المنطق؟</strong></td>
<td>نعم — يعيش مسار العمل هنا</td>
<td>لا — توجيه فقط</td>
<td>لا — تفويض فقط</td>
</tr>
<tr>
<td><strong>هل تعرف المكونات به؟</strong></td>
<td>نعم — تستدعي واجهته البرمجية</td>
<td>نعم — تنشر/تشترك</td>
<td>غالبًا يعرفه جانب المستدعي فقط</td>
</tr>
<tr>
<td><strong>الاستخدام المعتاد</strong></td>
<td>تنسيق مسار عمل (معالج متعدد الخطوات، رفع ملف، نموذج)</td>
<td>أحداث عرضية مفككة (تحليلات، قياس عن بعد)</td>
<td>إخفاء نظام فرعي فوضوي خلف نقطة دخول واحدة واضحة</td>
</tr>
</tbody>
</table>
<p>اختبار مفيد: إذا كان العنصر الأوسط يتخذ القرارات، فهو وسيط. وإذا كان يوجه الرسائل فقط من دون فحصها، فهو ناقل. وإذا كان يبسط الوصول إلى شيء معقد من دون تنسيق أطراف متعددة، فهو واجهة.</p>
<h2 id="المزالق-الشائعة">المزالق الشائعة</h2>
<h3 id="وسيط-الكائن-الإلهي">وسيط الكائن الإلهي</h3>
<p>مهمة الوسيط هي التنسيق، لا تنفيذ العمل. إذا انتهى كل قاعدة عمل في تطبيقك داخل صنف واحد اسمه <code>AppMediator</code>، فقد حولته إلى كائن أحادي ضخم من 4000 سطر — وهو تحديدًا ما يفترض أن يمنع النمط. قسّم الوسطاء حسب المجال (<code>CheckoutMediator</code> و<code>UploadMediator</code> و<code>ChatMediator</code>)، واجعل كل واحد مركزًا على مسار عمل واحد.</p>
<h3 id="مكونات-تعرف-بعضها-سرا">مكونات تعرف بعضها سرًا</h3>
<p>تأتي قيمة النمط من كون المكونات لا تعرف إلا الوسيط. وفي اللحظة التي يستورد فيها المكون A المكون B «من أجل النوع فقط»، أو يطلق حدثًا يحمل اسم وجود المكون B، تكون قد أعيد إدخال الاقتران. راقب ذلك أثناء مراجعة الشيفرة.</p>
<h3 id="صعوبة-التتبع-في-وقت-التشغيل">صعوبة التتبّع في وقت التشغيل</h3>
<p>حين يمر كل شيء عبر عبارة <code>switch</code> واحدة، قد تصبح «ماذا يحدث عندما أنقر هذا الزر؟» قصة تحرٍ صغيرة. خفف ذلك عبر تسجيل منظم داخل الوسيط نفسه — إذ يُسجل كل <code>notify</code>/<code>emit</code> مع معرّف ارتباط — وعبر برامج التصور لآلات الحالات عند استخدام XState أو ما شابه.</p>
<h3 id="إشعارات-إعادة-الدخول">إشعارات إعادة الدخول</h3>
<p>إذا سبب معالجة حدث في إطلاق الوسيط حدثًا آخر بصورة متزامنة، فقد تنتهي إلى تكرار غير متوقع. وبالنسبة إلى الوسطاء غير البسط، ضع الأحداث في طابور باستخدام <code>queueMicrotask</code> كي ينتهي كل حدث قبل بدء التالي.</p>
<h2 id="متى-لا-تستخدم-وسيطا">متى لا تستخدم وسيطًا</h2>
<ul>
<li><strong>مكوّنان يتحدثان دائمًا بعضهما فقط.</strong> لا تضف شيئًا إلى الوسط. فالاستدعاء المباشر أبسط وأسهل في التتبع.</li>
<li><strong>أحداث فردية بلا تنسيق.</strong> يكفي ناقل أحداث عادي أو دالة استدعاء.</li>
<li><strong>خطوط أنابيب تُنفذ فيها كل خطوة دائمًا بالترتيب.</strong> تركيب الدوال البسيط أوضح من محرك برمجيات وسيطة.</li>
</ul>
<p>يعود الوسيط بنفعه إلى نفسه عندما يكون لديك ثلاثة مكونات أو أكثر تتفاعل، وتكون قواعد من يتحدث مع من غير بديهية. وفيما دون ذلك، يمثل عبئًا زائدًا.</p>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://redux.js.org/understanding/history-and-design/middleware">البرمجيات الوسيطة في Redux</a></li>
<li><a href="https://www.apollographql.com/docs/react/api/link/introduction">Apollo Link</a></li>
<li><a href="https://hono.dev/">Hono — برمجيات وسيطة وفق معيار الويب</a></li>
<li><a href="https://stately.ai/docs/xstate">XState — آلات حالات لـJavaScript</a></li>
<li><a href="https://refactoring.guru/design-patterns/mediator">الوسيط — Refactoring Guru</a></li>
</ul>
`,i={book:t,chapter:n,chapterTitle:e,slug:o,title:d,headings:a,html:s};export{t as book,n as chapter,e as chapterTitle,i as default,a as headings,s as html,o as slug,d as title};
