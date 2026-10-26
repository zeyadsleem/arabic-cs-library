const e="kinney",o="react-typescript",t="React مع TypeScript",c="typescript-react-eslint-rules",n="قواعد ESLint",d=[],r=`<p>إليك ما تفعله كل قاعدة:</p>
<ul>
<li><strong><code>react/display-name</code>: 2</strong>: تتطلّب أن تمتلك مكوّنات React خاصية <code>displayName</code> (مفيدة أثناء تصحيح الأخطاء وReact DevTools). أما المكوّنات مجهولة الهوية في React.memo() أو React.forwardRef() فستُطلق هذا الخطأ.</li>
<li><strong><code>react/jsx-key</code>: 2</strong>: تُلزم بأن للعناصر داخل المصفوفات والمكرِّرات خاصية <code>key</code> فريدة. وهي تمنع مشكلات تصيير React ومشاكل الأداء.</li>
<li><strong><code>react/jsx-no-comment-textnodes</code>: 2</strong>: تمنع تصيير نص التعليق بالخطأ كمحتوى مرئي (مثلًا، <code>&lt;div&gt;// comment&lt;/div&gt;</code> كان سيعرض ”// comment” على الشاشة).</li>
<li><strong><code>react/jsx-no-duplicate-props</code>: 2</strong>: تمنع الخصائص المكرّرة في عناصر JSX (مثلًا، <code>&lt;div id=&quot;1&quot; id=&quot;2&quot; /&gt;</code> خطأ).</li>
<li><strong><code>react/jsx-no-target-blank</code>: 2</strong>: تتطلّب <code>rel=&quot;noopener noreferrer&quot;</code> عند استخدام <code>target=&quot;_blank&quot;</code> في الروابط، لمنع الثغرات الأمنية (reverse tabnabbing).</li>
<li><strong><code>react/jsx-no-undef</code>: 2</strong>: تمنع استخدام مكوّنات غير معرَّفة في JSX (تلتقط الأخطاء الإملائية مثل <code>&lt;Buton&gt;</code> بدلًا من <code>&lt;Button&gt;</code>).</li>
<li><strong><code>react/jsx-uses-react</code>: 2</strong>: تُعلِّم <code>React</code> على أنه مستخدَم عند وجود JSX (تمنع أخطاء “React is defined but never used”). اضبطها على 0 مع React 17+ في حالة استخدام تحويل JSX الجديد.</li>
<li><strong><code>react/jsx-uses-vars</code>: 2</strong>: تُعلِّم متغيّرات مكوّنات JSX على أنها مستخدَمة (تمنع <code>&lt;MyComponent&gt;</code> من إطلاق خطأ “MyComponent is defined but never used”).</li>
<li><strong><code>react/no-children-prop</code>: 2</strong>: تمنع تمرير الأبناء كخاصية صراحةً (<code>&lt;div children=&quot;foo&quot; /&gt;</code>) — ينبغي تضمين الأبناء بدلًا من ذلك (<code>&lt;div&gt;foo&lt;/div&gt;</code>).</li>
<li><strong><code>react/no-danger-with-children</code>: 2</strong>: تمنع استخدام <code>dangerouslySetInnerHTML</code> وخاصية <code>children</code> معًا (لأنهما يتعارضان — React لا يعرف أيّهما يصيّر).</li>
<li><strong><code>react/no-deprecated</code>: 2</strong>: تحذّر من توابع React المهمَلة (componentWillMount وcomponentWillReceiveProps وغيرها).</li>
<li><strong><code>react/no-direct-mutation-state</code>: 2</strong>: تمنع التعديل المباشر على <code>this.state</code> (يجب استخدام <code>setState()</code> بدلًا من ذلك). وهي تنطبق فقط على مكوّنات الأصناف.</li>
<li><strong><code>react/no-find-dom-node</code>: 2</strong>: تمنع استخدام <code>ReactDOM.findDOMNode()</code> المهمَلة — استخدم المراجع (refs) بدلًا من ذلك.</li>
<li><strong><code>react/no-is-mounted</code>: 2</strong>: تمنع استخدام تابع <code>isMounted()</code> المهمَل (نمط مضاد يشير إلى تصميم شيفرة مشكِل).</li>
<li><strong><code>react/no-render-return-value</code>: 2</strong>: تمنع استخدام القيمة المُعادة من <code>ReactDOM.render()</code> (فهي مهمَلة وستُزال).</li>
<li><strong><code>react/no-string-refs</code>: 2</strong>: تمنع المراجع النصّية (<code>ref=&quot;myRef&quot;</code>)، وتُلزم باستخدام مراجع دالّة (callback refs) أو <code>useRef</code> بدلًا من ذلك.</li>
<li><strong><code>react/no-unescaped-entities</code>: 2</strong>: تمنع كيانات HTML غير المُهرَّبة في JSX التي تبدو كالأخطاء الإملائية (مثلًا، ظهور <code>&gt;</code> أو <code>&quot;</code> كنص).</li>
<li><strong><code>react/no-unknown-property</code>: 2</strong>: تمنع خصائص DOM غير المعروفة (تلتقط <code>class</code> بدلًا من <code>className</code> و<code>for</code> بدلًا من <code>htmlFor</code>).</li>
<li><strong><code>react/no-unsafe</code>: 0</strong>: عند تفعيلها تحذّر من توابع دورة الحياة غير الآمنة (componentWillMount وcomponentWillReceiveProps وcomponentWillUpdate). اضبطها على 0 (معطّلة).</li>
<li><strong><code>react/prop-types</code>: 2</strong>: تتطلّب التحقّق عبر PropTypes لخصائص المكوّنات. وغالبًا ما تُعطَّل عند استخدام TypeScript.</li>
<li><strong><code>react/react-in-jsx-scope</code>: 2</strong>: تتطلّب وجود <code>React</code> في النطاق عند استخدام JSX. اضبطها على 0 مع React 17+ في حالة استخدام تحويل JSX الجديد.</li>
<li><strong><code>react/require-render-return</code>: 2</strong>: تُلزم بأن يكون لتابعَي render() في مكوّنات الأصناف جملة إرجاع.</li>
<li><strong><code>react-hooks/rules-of-hooks</code>: &quot;error&quot;</strong>: تُلزم بقواعد React Hooks: لا تُستدعى الخُطّافات إلا في المستوى الأعلى، ولا تُستدعى إلا من دوال React. وهي حاسمة لنعمل الخُطّافات على نحو صحيح.</li>
<li><strong><code>react-hooks/exhaustive-deps</code>: &quot;warn&quot;</strong>: تحذّر عند نقص الاعتماديات في مصفوفات اعتماديات useEffect وuseCallback وuseMemo. وهي تساعد على منع الأخطاء الناتجة عن الإغلاقات القديمة (stale closures).</li>
</ul>
`,s={book:e,chapter:o,chapterTitle:t,slug:c,title:n,headings:d,html:r};export{e as book,o as chapter,t as chapterTitle,s as default,d as headings,r as html,c as slug,n as title};
