const s="patterns-dev",a="vanilla",n="أنماط JavaScript",t="virtual-lists",e="افتراضية القوائم (List Virtualization)",l=[{depth:2,id:"كيف-تعمل-افتراضية-القوائم",text:"كيف تعمل افتراضية القوائم؟"},{depth:2,id:"بديل-أصغر-لـ-react-virtualized",text:"بديل أصغر لـ react-virtualized"},{depth:3,id:"القائمة",text:"القائمة"},{depth:3,id:"الشبكة",text:"الشبكة"},{depth:2,id:"أمثلة-react-window-الأكثر-تفصيلا",text:"أمثلة react-window الأكثر تفصيلًا"},{depth:2,id:"ما-الذي-ينقص-react-window",text:"ما الذي ينقص react-window؟"},{depth:2,id:"التحسينات-في-منصة-الويب",text:"التحسينات في منصة الويب"},{depth:2,id:"قراءة-إضافية",text:"قراءة إضافية"}],i=`<p>في هذا الدليل، سنناقش افتراضية القوائم (list virtualization)، المعروفة أيضًا باسم النوافذ (windowing). الفكرة هي عرض الصفوف المرئية فقط من قائمة ديناميكية بدلًا من القائمة كاملة. وتكون الصفوف المعروضة جزءًا صغيرًا فقط، مع تحريك الجزء المرئي (النافذة) عندما يمرر المستخدم. ويمكن أن يحسّن هذا أداء العرض (rendering performance).</p>
<p>إذا كنت تستخدم React وتحتاج إلى <strong>عرض قائمة كبيرة من البيانات بكفاءة</strong>، فقد تكون على دراية بـ <a href="https://bvaughn.github.io/react-virtualized/">react-virtualized</a>. هذه مكتبة نوافذ أنشأها <a href="https://twitter.com/brian_d_vaughn">Brian Vaughn</a>، وتعرض العناصر المرئية فقط داخل قائمة قابلة للتمرير. هذا يعني أنك لا تدفع تكلفة عرض آلاف الصفوف مرة واحدة. ويرافق هذا الدليل <a href="https://www.youtube.com/embed/QhPn6hLGljU">فيديو</a> عن افتراضية القوائم باستخدام react-window.</p>
<h2 id="كيف-تعمل-افتراضية-القوائم">كيف تعمل افتراضية القوائم؟</h2>
<p>.LabeledSvgText { font-size: 14px } .NotRenderedLabeledSvgText { font-size: 12px } .LabeledSvgTextMono { font-family: monospace } .scuFalse { fill: #aaa } .scuTrue { fill: #c0e0d0 } .scuAnimatedLine,.scuFrozenLine { stroke-width: 1px; stroke-dasharray: 2,4; stroke: #222 } .scuAnimatedLine { -webkit-animation: dash .5s linear; animation: dash .5s linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite } @-webkit-keyframes dash { 0% { stroke-dashoffset: 6 } to { stroke-dashoffset: 0 } } @keyframes dash { 0% { stroke-dashoffset: 6 } to { stroke-dashoffset: 0 } } .scuArrow { fill: #222 } .scuText { font-family: monospace; font-size: 12px } .CrossHatchRectPattern { stroke: #fff; stroke-width: 10 } .CrossHatchRectHidden,.CrossHatchRectVisible { -webkit-transition: all 2.5s ease; transition: all 2.5s ease } .CrossHatchRectHidden { opacity: 0 } .CrossHatchRectVisible { opacity: .25 } .HowWorksGroup { -webkit-transform: skewX(0deg); -ms-transform: skewX(0deg); transform: skewX(0deg) } .HowWorksGroupSkewed { -webkit-transition: all 1s ease; transition: all 1s ease; -webkit-transform: skewX(15deg); -ms-transform: skewX(15deg); transform: skewX(15deg) } .HowWorksOuterGroup { -webkit-transform: translate(-75px,-68px); -ms-transform: translate(-75px,-68px); transform: translate(-75px,-68px) } .HowWorksOuterGroup,.HowWorksOuterRect { -webkit-transition: -webkit-transform 1s ease; transition: -webkit-transform 1s ease; transition: transform 1s ease; transition: transform 1s ease,-webkit-transform 1s ease } .HowWorksOuterRect { rx: 8px; ry: 8px; stroke-width: 4px; fill: transparent; stroke: #222 } .HowWorksOuterRectShifted { -webkit-transform: translateY(-30px); -ms-transform: translateY(-30px); transform: translateY(-30px) } .HowWorksHidden { opacity: 0 } .HowWorksHidden,.HowWorksVisible { -webkit-transition: all 1s ease; transition: all 1s ease } .HowWorksVisible { opacity: 1 } .HowWorksInnerLineAnimated { -webkit-animation: scrolling 1s linear; animation: scrolling 1s linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite } @-webkit-keyframes scrolling { 0% { -webkit-transform: translateY(0); transform: translateY(0) } to { -webkit-transform: translateY(30px); transform: translateY(30px) } } @keyframes scrolling { 0% { -webkit-transform: translateY(0); transform: translateY(0) } to { -webkit-transform: translateY(30px); transform: translateY(30px) } } .HowWorksInnerLine,.HowWorksInnerRect { fill: transparent; stroke-width: 1px; stroke-dasharray: 2,4; stroke: #222 } .HowWorksRowGroup { font-size: 10px } .HowWorksRowEstimated,.HowWorksRowNotRendered,.HowWorksRowRendered { stroke-width: 2px; stroke: #fff } .HowWorksRowEstimated { fill: #ddd } .HowWorksRowRendered { fill: #a2d4da } .HowWorksRowNotRendered { fill: #aaa } .HowWorksViewportLine { stroke-width: 1px; stroke-dasharray: 2,4; stroke: #222; -webkit-transition-delay: 1s; transition-delay: 1s } .HowWorksScrollTrack { fill: rgba(0,0,0,.1) } .HowWorksScrollThumb { fill: rgba(0,0,0,.5) } .HowWorksScrollingLoop { -webkit-animation: scrollingLoop 2.5s linear; animation: scrollingLoop 2.5s linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite } @-webkit-keyframes scrollingLoop { 0% { -webkit-transform: translateY(0); transform: translateY(0) } 50% { -webkit-transform: translateY(-40px); transform: translateY(-40px) } to { -webkit-transform: translateY(0); transform: translateY(0) } } @keyframes scrollingLoop { 0% { -webkit-transform: translateY(0); transform: translateY(0) } 50% { -webkit-transform: translateY(-40px); transform: translateY(-40px) } to { -webkit-transform: translateY(0); transform: translateY(0) } } .HowWorksScrollingThumbLoop { -webkit-animation: scrollingThumbLoop 2.5s linear; animation: scrollingThumbLoop 2.5s linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite } @-webkit-keyframes scrollingThumbLoop { 0% { -webkit-transform: translateY(0); transform: translateY(0) } 50% { -webkit-transform: translateY(15px); transform: translateY(15px) } to { -webkit-transform: translateY(0); transform: translateY(0) } } @keyframes scrollingThumbLoop { 0% { -webkit-transform: translateY(0); transform: translateY(0) } 50% { -webkit-transform: translateY(15px); transform: translateY(15px) } to { -webkit-transform: translateY(0); transform: translateY(0) } } .HowWorksTopConditionalScrollingFill { -webkit-animation: topConditionalScrollingFill 2.5s linear; animation: topConditionalScrollingFill 2.5s linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite } @-webkit-keyframes topConditionalScrollingFill { 0% { fill: #a2d4da } 14% { fill: #a2d4da } 15% { fill: #aaa } 84% { fill: #aaa } 85% { fill: #a2d4da } } @keyframes topConditionalScrollingFill { 0% { fill: #a2d4da } 14% { fill: #a2d4da } 15% { fill: #aaa } 84% { fill: #aaa } 85% { fill: #a2d4da } } .HowWorksBottomConditionalScrollingFill { -webkit-animation: bottomConditionalScrollingFill 2.5s linear; animation: bottomConditionalScrollingFill 2.5s linear; -webkit-animation-iteration-count: infinite; animation-iteration-count: infinite } @-webkit-keyframes bottomConditionalScrollingFill { 0% { fill: #aaa } 14% { fill: #aaa } 15% { fill: #a2d4da } 84% { fill: #a2d4da } 85% { fill: #aaa } } @keyframes bottomConditionalScrollingFill { 0% { fill: #aaa } 14% { fill: #aaa } 15% { fill: #a2d4da } 84% { fill: #a2d4da } 85% { fill: #aaa } } .List { width: 15rem; height: 15rem; overflow: auto; font-size: 12px; border: 1px solid #cfd8dc; margin: 1rem 0 } .ListWithBorderRadius { border-radius: 1rem; border-width: 4px; overflow: auto } .ListRow { padding: 0 .5rem; width: 100%; height: 40px; line-height: 40px; -webkit-transition: all 0; transition: all 0; white-space: pre; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; border-bottom: 1px solid #e9e9e9 } .ListRowActived { background-color: #e9e9e9 } .RowNumber { -webkit-box-flex: 0; -webkit-flex: 0 0 2rem; -ms-flex: 0 0 2rem; flex: 0 0 2rem; display: inline-block; width: 2rem; height: 2rem; line-height: 2rem; border-radius: 2rem; text-align: center; color: #fff } .RowStack { -webkit-box-flex: 1; -webkit-flex: 1 0 5.25rem; -ms-flex: 1 0 5.25rem; flex: 1 0 5.25rem; margin: 0 .5rem; font-size: 20px } .RowName { font-size: .8rem; line-height: .8rem; font-weight: 700 } .RowRowNumber { font-size: .6rem; line-height: .6rem; margin-top: .25rem } .RowStar { -webkit-box-flex: 0; -webkit-flex: 0 0 auto; -ms-flex: 0 0 auto; flex: 0 0 auto; font-size: 1rem!important; color: #ff502f!important } .ListScrolling { font-style: italic; opacity: .5 } .BuildingBlocksSvgWrapper { max-width: 100% } .svgOuterBox { fill: transparent; stroke: #222; stroke-width: 4px; rx: 8px; ry: 8px } .svgCollectionBoxNotRendered,.svgGridBoxNotRendered,.svgListRowNotRendered,.svgTableColumnNotRendered { fill: #aaa; stroke: transparent } .svgCollectionBox,.svgGridBox,.svgListRow,.svgTableColumn { fill: #c0e0d0; stroke: transparent } .svgTableHeader { fill: transparent; stroke: #222 } .svgNotRenderedDimmer { fill: #fff; opacity: .65 } .AnimatedListRow { display: -webkit-inline-box; display: -webkit-inline-flex; display: -ms-inline-flexbox; display: inline-flex; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; padding: 0 .5rem; background-color: #a2d4da; width: 100%; height: 26px; margin: 2px 0; -webkit-transition: all 0; transition: all 0 } .AnimatedList--Overscan { background-color: #c0e0d0 } .AnimatedList--Invisible { background-color: #aaa } .AnimatedList--Invisible,.AnimatedList--Overscan { -webkit-transition: all .5s; transition: all .5s } .AnimatedList { position: relative; width: 150px; height: 300px; margin: 8px; font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif; font-size: 12px } .AnimatedList,.Positioned { overflow: visible } .InnerFrame { position: absolute; top: 100px; height: 100px; left: -8px; right: -8px; border: 4px solid #222; border-radius: 8px } .AnimatedListDimmerBottom,.AnimatedListDimmerTop { position: absolute; left: 0; right: 0; background-color: #fff; opacity: .35 } .AnimatedListDimmerBottom { top: 200px; height: 130px } .AnimatedListDimmerTop { top: 0; height: 100px } .BottomGroup,.MiddleGroup,.TopGroup { -webkit-transition: all .25s linear; transition: all .25s linear } .MiddleGroup { position: relative; z-index: 2 } .BottomGroupScaled { -webkit-transform: scaleY(.5) translateY(-137px); -ms-transform: scaleY(.5) translateY(-137px); transform: scaleY(.5) translateY(-137px) } .MiddleGroupScaled { -webkit-transform: translateY(-35px); -ms-transform: translateY(-35px); transform: translateY(-35px) } .TopGroupScaled { -webkit-transform: scaleY(.5) translateY(-30px); -ms-transform: scaleY(.5) translateY(-30px); transform: scaleY(.5) translateY(-30px) } .OuterScrollContainer { position: absolute; top: 5px; width: 100px; height: 100px; border: 4px solid #222; border-radius: 8px } .UnscaledListItem,.UnscaledListItemActive { display: block; width: 88px; height: 26px; margin: 2px 6px } .UnscaledListItem { background-color: #aaa } .UnscaledListItemActive { background-color: #c0e0d0 } .SortableListRow { cursor: pointer; font-size: 12px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border-bottom: 1px solid #e9e9e9 } .SortableListRow:hover { background-color: #e9e9e9 } .SortableListRowActive { font-size: 13px; background-color: #c0e0d0; overflow: hidden } .ResizableListRow { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; padding: 0 .5rem; border-bottom: 1px solid #e9e9e9 } .DragHandle { position: absolute; bottom: 0; left: 0; right: 0; height: 16px; z-index: 2; cursor: row-resize; color: rgba(0,0,0,.2) } .DragHandle:hover { background-color: rgba(0,0,0,.1) } .DragHandleActive,.DragHandleActive:hover { color: rgba(0,0,0,.6); z-index: 3 } .DragHandleIcon { -webkit-box-flex: 0; -webkit-flex: 0 0 12px; -ms-flex: 0 0 12px; flex: 0 0 12px; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center } .GridContainer { height: 300px; position: relative; border: 1px solid #dadada; overflow: hidden } .TopLeftCell { height: 40px; width: 50px; background-color: #f3f3f3; border-bottom: 4px solid #bcbcbc; border-right: 4px solid #bcbcbc } .MainGrid { position: absolute!important; left: 50px; top: 40px } .MainGridCell { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; padding: .25rem; outline: 0; border: none; border-right: 1px solid #dadada; border-bottom: 1px solid #dadada; background-color: #fff; font-size: 1rem } .MainGridCellFocused { box-shadow: inset 0 0 0 2px #4285fa } .LeftGrid { left: 0; top: 40px } .LeftGrid,.TopGrid { position: absolute!important; overflow: hidden!important } .TopGrid { left: 50px; top: 0; height: 40px } .FixedGridCell { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; background-color: #f3f3f3; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc } .FixedGridCellFocused { background-color: #ddd } .Collection { border: 1px solid #ddd } .CollectionCell { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; color: #fff } .CollectionCellCircle { border-radius: 100% } Not RenderedNot RenderedRenderedRenderedRenderedRenderedNot RenderedNot RenderedNot RenderedNot Rendered</p>
<ul> تعني «افتراضية» قائمة العناصر **الحفاظ على نافذة** و**تحريك هذه النافذة حول القائمة**. تعمل النوافذ في react-virtualized بطريقتين:
<ul>
<li>وجود عنصر DOM صغير (مثل \`\`) بموضع نسبي (النافذة)</li>
<li>وجود عنصر DOM كبير للتمرير</li>
<li>وضع عناصر DOM داخل الحاوية بموضع مطلق، وضبط أنماط <code>top</code> و<code>left</code> و<code>width</code> و<code>height</code>.</li>
</ul>
<p>بدلًا من عرض آلاف العناصر دفعة واحدة، وهو ما قد يبطئ العرض الأولي أو يؤثر في أداء التمرير، <strong>ركز الافتراضية على عرض العناصر المرئية للمستخدم فقط</strong>.</p>
<p>يمكن أن يساعد ذلك في الحفاظ على سرعة عرض القوائم على الأجهزة متوسطة الأدئة ومنخفضة المواصفات. يمكنك جلب عناصر وعرضها أكثر مع تمرير المستخدم، مع تفريغ العناصر السابقة واستبدالها بأخرى جديدة.</p>
<h2 id="بديل-أصغر-لـ-react-virtualized">بديل أصغر لـ react-virtualized</h2>
<p><a href="https://react-window.now.sh/">react-window</a> هو إعادة كتابة لـ react-virtualized من المؤلف نفسه، ويهدف إلى أن يكون <strong>أصغر</strong> وأسرع وأكثر <a href="https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/">قابلية لإزالة الشيفرة الميتة</a>.</p>
<p>في مكتبة قابلة لإزالة الشيفرة الميتة، يعتمد الحجم على واجهات API التي تختار استخدامها. لوحظ توفير نحو 20–30KB بعد الضغط عند استخدامه بدلًا من react-virtualized:</p>
<p>واجهات API في الحزمتين متشابهة، ويميل react-window إلى البساطة عند اختلافهما. تتضمن مكوّنات react-window:</p>
<h3 id="القائمة">القائمة</h3>
<p>تعرض القوائم <strong>قائمة نوافذ من العناصر</strong>، أي أن الصفوف المرئية فقط تظهر للمستخدم، مثل <a href="https://react-window.now.sh/#/examples/list/fixed-size">FixedSizeList</a> و<a href="https://react-window.now.sh/#/examples/list/variable-size">VariableSizeList</a>. تستخدم القوائم Grid داخليًا لعرض الصفوف وتمرير الخصائص إلى الشبكة الداخلية.</p>
<p>صفصفصفصفصفصفصفلم يُعرضلم يُعرض</p>
<p><strong>عرض قائمة بيانات باستخدام React</strong></p>
<p>إليك مثالًا لعرض قائمة بيانات بسيطة (<code>itemsArray</code>) باستخدام React:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ReactDOM</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom&quot;</span>;

<span class="hljs-keyword">const</span> itemsArray = [

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Drake&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Halsey&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Camillo Cabello&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Travis Scott&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Bazzi&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Flume&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Nicki Minaj&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Kodak Black&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Tyga&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Buno Mars&quot;</span> },

{ <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;Lil Wayne&quot;</span> }, ...

]; <span class="hljs-comment">// our data</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, style }</span>) =&gt; (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{index</span> % <span class="hljs-attr">2</span> ? &quot;<span class="hljs-attr">ListItemOdd</span>&quot; <span class="hljs-attr">:</span> &quot;<span class="hljs-attr">ListItemEven</span>&quot;} <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>

{itemsArray[index].name}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Example</span> = (<span class="hljs-params"></span>) =&gt; (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>

<span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>

<span class="hljs-attr">height:</span> <span class="hljs-attr">150</span>,

<span class="hljs-attr">width:</span> <span class="hljs-attr">300</span>

}}

<span class="hljs-attr">class</span>=<span class="hljs-string">&quot;List&quot;</span>

&gt;</span>

{itemsArray.map((item, index) =&gt; Row({ index }))}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

<span class="hljs-title class_">ReactDOM</span>.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Example</span> /&gt;</span></span>, <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&quot;root&quot;</span>));
</code></pre>
<p><strong>عرض قائمة باستخدام react-window</strong></p>
<p>وهذا هو المثال نفسه باستخدام <code>FixedSizeList</code> من react-window، الذي يأخذ بعض الخصائص (<code>width</code> و<code>height</code> و<code>itemCount</code> و<code>itemSize</code>) ودالة عرض صف تُمرر كطفل:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ReactDOM</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom&quot;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeList</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">List</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-window&quot;</span>;

<span class="hljs-keyword">const</span> itemsArray = [...]; <span class="hljs-comment">// our data</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, style }</span>) =&gt; (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{index</span> % <span class="hljs-attr">2</span> ? &quot;<span class="hljs-attr">ListItemOdd</span>&quot; <span class="hljs-attr">:</span> &quot;<span class="hljs-attr">ListItemEven</span>&quot;} <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>

{itemsArray[index].name}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Example</span> = (<span class="hljs-params"></span>) =&gt; (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span>

<span class="hljs-attr">className</span>=<span class="hljs-string">&quot;List&quot;</span>

<span class="hljs-attr">height</span>=<span class="hljs-string">{150}</span>

<span class="hljs-attr">itemCount</span>=<span class="hljs-string">{itemsArray.length}</span>

<span class="hljs-attr">itemSize</span>=<span class="hljs-string">{35}</span>

<span class="hljs-attr">width</span>=<span class="hljs-string">{300}</span>

&gt;</span>

{Row}

<span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span></span>

);

<span class="hljs-title class_">ReactDOM</span>.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Example</span> /&gt;</span></span>, <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&quot;root&quot;</span>));
</code></pre>
<p>يمكنك تجربة <code>FixedSizeList</code> على <a href="https://codesandbox.io/s/github/bvaughn/react-window/tree/master/website/sandboxes/fixed-size-list-vertical">CodeSandbox</a>.</p>
<h3 id="الشبكة">الشبكة</h3>
<p>تعرض Grid <strong>بيانات جدولية</strong> مع افتراضية على المحورين الرأسي والأفقي، مثل <a href="https://react-window.now.sh/#/examples/grid/fixed-size">FizedSizeGrid</a> و<a href="https://react-window.now.sh/#/examples/grid/variable-size">VariableSizeGid</a>. وتعرض فقط خلايا Grid اللازمة لملء نفسها وفق مواضع التمرير الحالية.</p>
<p>خليةخليةخليةخليةخليةخليةخليةخليةخليةخليةلم يُعرضلم يُعرضلم يُعرضلم يُعرضلم يُعرضلم يُعرضلم يُعرضلم يُعرض</p>
<p>إذا أردنا عرض القائمة نفسها السابقة بتخطيط شبكي، مع افتراض أن مدخلاتنا مصفوفة متعددة الأبعاد، فيمكننا استخدام <code>FixedSizeGrid</code> كما يلي:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">ReactDOM</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeGrid</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Grid</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">const</span> itemsArray = [

[{},{},{},...],

[{},{},{},...],

[{},{},{},...],

[{},{},{},...],

];

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Cell</span> = (<span class="hljs-params">{ columnIndex, rowIndex, style }</span>) =&gt; (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>

<span class="hljs-attr">className</span>=<span class="hljs-string">{</span>

<span class="hljs-attr">columnIndex</span> % <span class="hljs-attr">2</span>

? <span class="hljs-attr">rowIndex</span> % <span class="hljs-attr">2</span> === <span class="hljs-string">0</span>

? &#x27;<span class="hljs-attr">GridItemOdd</span>&#x27;

<span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">GridItemEven</span>&#x27;

<span class="hljs-attr">:</span> <span class="hljs-attr">rowIndex</span> % <span class="hljs-attr">2</span>

? &#x27;<span class="hljs-attr">GridItemOdd</span>&#x27;

<span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">GridItemEven</span>&#x27;

}

<span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>

&gt;</span>

{itemsArray[rowIndex][columnIndex].name}

<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Example</span> = (<span class="hljs-params"></span>) =&gt; (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Grid</span>

<span class="hljs-attr">className</span>=<span class="hljs-string">&quot;Grid&quot;</span>

<span class="hljs-attr">columnCount</span>=<span class="hljs-string">{5}</span>

<span class="hljs-attr">columnWidth</span>=<span class="hljs-string">{100}</span>

<span class="hljs-attr">height</span>=<span class="hljs-string">{150}</span>

<span class="hljs-attr">rowCount</span>=<span class="hljs-string">{5}</span>

<span class="hljs-attr">rowHeight</span>=<span class="hljs-string">{35}</span>

<span class="hljs-attr">width</span>=<span class="hljs-string">{300}</span>

&gt;</span>

{Cell}

<span class="hljs-tag">&lt;/<span class="hljs-name">Grid</span>&gt;</span></span>

);

<span class="hljs-title class_">ReactDOM</span>.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Example</span> /&gt;</span></span>, <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;root&#x27;</span>));
</code></pre>
<p>يمكنك أيضًا تجربة <code>FixedSizeGrid</code> على <a href="https://codesandbox.io/s/github/bvaughn/react-window/tree/master/website/sandboxes/fixed-size-grid">CodeSandbox</a>.</p>
<h2 id="أمثلة-react-window-الأكثر-تفصيلا">أمثلة react-window الأكثر تفصيلًا</h2>
<p>نفّذ <a href="https://github.com/staylor">Scott Taylor</a> أداة <a href="http://pitchfork.highforthis.com/">Pitchfork music reviews scraper</a> مفتوحة المصدر <a href="https://github.com/staylor/pitchfork-scraper">(المصدر)</a> باستخدام <code>react-window</code> و<code>FixedSizeGrid</code>. وفيما يلي فيديو للتطبيق أثناء عمله:</p>
<p>يستخدم Pitchfork scraper مكتبة <a href="https://github.com/bvaughn/react-window-infinite-loader">react-window-infinite-loader</a> (<a href="https://codesandbox.io/s/5wqo7z2np4">عرض تجريبي</a>)، التي تساعد على تقسيم مجموعات البيانات الكبيرة إلى أجزاء يمكن تحميلها عند التمرير إليها.</p>
<p>إليك مقطعًا من طريقة دمج react-window-infinite-loader في هذا التطبيق:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { <span class="hljs-title class_">Component</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeGrid</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Grid</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-title class_">InfiniteLoader</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window-infinite-loader&#x27;</span>;

...

<span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">InfiniteLoader</span>

<span class="hljs-attr">isItemLoaded</span>=<span class="hljs-string">{this.isItemLoaded}</span>

<span class="hljs-attr">loadMoreItems</span>=<span class="hljs-string">{this.loadMoreItems}</span>

<span class="hljs-attr">itemCount</span>=<span class="hljs-string">{this.state.count</span> + <span class="hljs-attr">1</span>}

&gt;</span>

{({ onItemsRendered, ref }) =&gt; (

<span class="hljs-tag">&lt;<span class="hljs-name">Grid</span>

<span class="hljs-attr">onItemsRendered</span>=<span class="hljs-string">{this.onItemsRendered(onItemsRendered)}</span>

<span class="hljs-attr">columnCount</span>=<span class="hljs-string">{COLUMN_SIZE}</span>

<span class="hljs-attr">columnWidth</span>=<span class="hljs-string">{180}</span>

<span class="hljs-attr">height</span>=<span class="hljs-string">{800}</span>

<span class="hljs-attr">rowCount</span>=<span class="hljs-string">{Math.max(this.state.count</span> / <span class="hljs-attr">COLUMN_SIZE</span>)}

<span class="hljs-attr">rowHeight</span>=<span class="hljs-string">{220}</span>

<span class="hljs-attr">width</span>=<span class="hljs-string">{1024}</span>

<span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>

&gt;</span>

{this.renderCell}

<span class="hljs-tag">&lt;/<span class="hljs-name">Grid</span>&gt;</span>

)}

<span class="hljs-tag">&lt;/<span class="hljs-name">InfiniteLoader</span>&gt;</span></span>

);

}

}
</code></pre>
<p>قد تجد <a href="https://github.com/staylor/pitchfork-scraper/commit/d9bff69e332ad9de8351c67f4848fc7968209eff">الالتزام</a> الذي نقل التطبيق من <code>react-virtualized</code> مفيدًا.</p>
<p>تتوفر أيضًا تنفيذات لـ Pitchfork scraper تستخدم <code>FixedSizeList</code> (<a href="https://node-ntdprbnulc.now.sh">عرض تجريبي</a>، <a href="https://youtu.be/CImWBbBeQXU">عرض على Pixel</a>):</p>
<p>وهذا مقطع من التنفيذ:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">InfiniteLoader</span>

<span class="hljs-attr">isItemLoaded</span>=<span class="hljs-string">{this.isItemLoaded}</span>

<span class="hljs-attr">loadMoreItems</span>=<span class="hljs-string">{this.loadMoreItems}</span>

<span class="hljs-attr">itemCount</span>=<span class="hljs-string">{this.state.count}</span>

&gt;</span>

{({ onItemsRendered, ref }) =&gt; (

<span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">FixedSizeList</span>

<span class="hljs-attr">itemCount</span>=<span class="hljs-string">{this.state.count}</span>

<span class="hljs-attr">itemSize</span>=<span class="hljs-string">{ROW_HEIGHT}</span>

<span class="hljs-attr">onItemsRendered</span>=<span class="hljs-string">{onItemsRendered}</span>

<span class="hljs-attr">height</span>=<span class="hljs-string">{this.state.height}</span>

<span class="hljs-attr">width</span>=<span class="hljs-string">{this.state.width}</span>

<span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>

&gt;</span>

{this.renderCell}

<span class="hljs-tag">&lt;/<span class="hljs-name">FixedSizeList</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>

)}

<span class="hljs-tag">&lt;/<span class="hljs-name">InfiniteLoader</span>&gt;</span></span>

);
</code></pre>
<p>ماذا كانت احتياجاتنا أكثر تعقيدًا لحل افتراضية شبكية؟ وجدنا <a href="https://www.themoviedb.org/">The Movie Database</a> و<a href="https://tmdb-viewer.surge.sh/">تطبيق العرض</a> الذي استخدم react-virtualized وInfinite Loader في الداخل.</p>
<p>لم يستغرق <a href="https://github.com/addyosmani/tmdb-viewer/blob/master/src/components/InfiniteMoviesList.js">نقله</a> إلى react-window وreact-window-infinite-loader وقتًا طويلًا، لكننا اكتشفنا أن بعض المكونات غير مدعومة بعد. ومع ذلك، كانت الوظيفة النهائية <a href="https://tmdb-viewer.firebaseapp.com/">قريبة جدًا</a>.</p>
<p><a href="https://tmdb-viewer.firebaseapp.com/"></a></p>
<p>كانت المكونات الناقصة هي WindowScroller وAutoSizer، وسننظر إليها تاليًا.</p>
<pre><code class="language-javascript">...

<span class="hljs-keyword">return</span> (

&lt;section&gt;

&lt;AutoSizer disableHeight&gt;

{({width}) =&gt; {

const {movies, hasMore} = this.props;

const rowCount = getRowsAmount(width, movies.length, hasMore);

...

return (

&lt;InfiniteLoader

ref={this.infiniteLoaderRef}

...

{({onRowsRendered, registerChild}) =&gt; (

&lt;WindowScroller&gt;

{({height, scrollTop}) =&gt; (
</code></pre>
<h2 id="ما-الذي-ينقص-react-window">ما الذي ينقص react-window؟</h2>
<p>لا يملك react-window بعد واجهة API الكاملة الخاصة بـ react-virtualized، لذا راجع <a href="https://github.com/bvaughn/react-window#how-is-react-window-different-from-react-virtualized">وثائق المقارنة</a> إذا كنت تفكر فيه. ما الذي ينقص؟</p>
<ul>
<li><a href="https://github.com/bvaughn/react-virtualized/blob/master/docs/WindowScroller.md">WindowScroller</a> — مكوّن في <code>react-virtualized</code> يتيح تمرير القوائم وفق مواضع تمرير النافذة. لا توجد حاليًا <a href="https://github.com/bvaughn/react-window/issues/30">خطط</a> لتنفيذه في react-window، لذا ستحل المشكلة في userland.</li>
<li><a href="https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md">AutoSizer</a> — HOC يتمدد ليملأ المساحة المتاحة ويضبط عرض وارتفاع الطفل تلقائيًا. نفّذ Brian هذا كحزمة <a href="https://www.npmjs.com/package/react-virtualized-auto-sizer">مستقلة</a>. اتبع <a href="https://github.com/bvaughn/react-window/issues/5">المشكلة</a> لمعرفة آخر تحديث.</li>
<li><a href="https://github.com/bvaughn/react-virtualized/blob/master/docs/CellMeasurer.md">CellMeasurer</a> — HOC يقيس محتوى الخلية تلقائيًا عبر عرضه بطريقة غير مرئية للمستخدم. اتبع <a href="https://github.com/bvaughn/react-window/issues/6">هنا</a> للمناقشة.</li>
</ul>
<p>ومع ذلك، وجدنا react-window كافيًا لمعظم احتياجاتنا بما يوفره افتراضيًا.</p>
<h2 id="التحسينات-في-منصة-الويب">التحسينات في منصة الويب</h2>
<p>تدعم بعض المتصفحات الحديثة الآن خاصية <a href="https://web.dev/content-visibility/">CSS content-visibility</a>. تتيح <code>content-visibility:auto</code> تخطي عرض المحتوى خارج الشاشة ورسمه حتى الحاجة إليه. إذا كان لديك مستند HTML طويلًا مكلف العرض، فجرّب هذه الخاصية.</p>
<p>لعرض القوائم ذات المحتوى الديناميكي، ما زلت أنصح باستخدام مكتبة مثل react-window. يصعب أن تتغلب نسخة تستخدم <code>content-visbility:hidden</code> على نسخة تستخدم <code>display:none</code> بشدة أو إزالة عُقد DOM خارج الشاشة كما تفعل مكتبات افتراضية القوائم اليوم.</p>
<h2 id="قراءة-إضافية">قراءة إضافية</h2>
<p>لمزيد من القراءة عن react-window وreact-virtualized، راجع:</p>
<ul>
<li><a href="https://alligator.io/react/lists-with-react-window/">عرض القوائم عالية الأداء باستخدام react-window</a></li>
<li><a href="https://www.youtube.com/watch?v=t4tuhg7b50I">إنشاء عروض React أكثر كفاءة باستخدام Windowing</a></li>
<li><a href="https://css-tricks.com/rendering-lists-using-react-virtualized/">عرض القوائم باستخدام react-virtualized</a></li>
<li><a href="https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3">عرض القوائم الكبيرة باستخدام react-virtualized</a></li>
</ul>
<p><img src="/images/patterns-dev/vanilla-virtual-lists-0-frame_rate_10k_2x.webp" alt="أثر افترافية القوائم: معدل إطارات أعلى مقارنةً بالعرض دفعة واحدة"></p>
<p><img src="/images/patterns-dev/vanilla-virtual-lists-1-bundlephobia_2x.webp" alt="حجم حزمة react-virtualized (34 كيلوبايت مضغوطة) مقابل react-window (5 كيلوبايت)"></p>
<p><img src="/images/patterns-dev/vanilla-virtual-lists-2-wbpa_2x.webp" alt="محلّل حزم Webpack يُظهر فرقاً يقارب 20 كيلوبايت"></p>
<p><img src="/images/patterns-dev/vanilla-virtual-lists-3-tmdb_2x.webp" alt="عارض TMDB يعرض آلاف العناصر"></p>
`,r={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:i};export{s as book,a as chapter,n as chapterTitle,r as default,l as headings,i as html,t as slug,e as title};
