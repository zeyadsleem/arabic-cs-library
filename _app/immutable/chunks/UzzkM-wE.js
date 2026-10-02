const n="go-tour",e="concurrency",t="التزامن",i="p7",o="تمرين: الأشجار الثنائية المتكافئة",r=[{depth:2,id:"lesson-title",text:"تمرين: الأشجار الثنائية المتكافئة"}],c=`
  <h2 id="lesson-title">تمرين: الأشجار الثنائية المتكافئة</h2>
  
  
  <p>
    قد توجد أشجار ثنائية عديدة ومختلفة تخزّن التسلسل نفسه من القيم. على سبيل المثال، إليك شجرتين ثنائيتين تخزّنان التسلسل 1، 1، 2، 3، 5، 8، 13.
  </p>
  

  <img src="https://go.dev/tour/static/img/tree.png" alt="رسم توضيحي من جولة Go الأصلية" loading="lazy">

  
  <p>
    تكون الدالة التي تتحقق مما إذا كانت شجرتان ثنائيتان تخزّنان التسلسل نفسه معقدةً إلى حد كبير في معظم اللغات. سنستخدم التزامن والقنوات في Go لكتابة حل بسيط.
  </p>
  

  
  <p>
    يستخدم هذا المثال حزمة <code>tree</code> التي تعرّف النوع:
  </p>
  

  
  <pre>type Tree struct {
    Left  *Tree
    Value int
    Right *Tree
}</pre>
  

  
  <p>
    تابع الوصف في <a href="/arabic-cs-library/book/go-tour/concurrency/p8/" data-tour-action="next">الصفحة التالية</a>.
  </p>
  

`,s=[],a=`
  <h2>Exercise: Equivalent Binary Trees</h2>
  
  
  <p>
    There can be many different binary trees with the same sequence of values stored in it. For example, here are two binary trees storing the sequence 1, 1, 2, 3, 5, 8, 13.
  </p>
  

  <img src="https://go.dev/tour/static/img/tree.png" alt="رسم توضيحي من جولة Go الأصلية" loading="lazy">

  
  <p>
    A function to check whether two binary trees store the same sequence is quite complex in most languages. We&#39;ll use Go&#39;s concurrency and channels to write a simple solution.
  </p>
  

  
  <p>
    This example uses the <code>tree</code> package, which defines the type:
  </p>
  

  
  <pre>type Tree struct {
    Left  *Tree
    Value int
    Right *Tree
}</pre>
  

  
  <p>
    Continue description on <a href="/arabic-cs-library/book/go-tour/concurrency/p8/" data-tour-action="next">next page</a>.
  </p>
  

`,p={book:n,chapter:e,chapterTitle:t,slug:"p7",title:o,headings:r,html:c,examples:s,original:a};export{n as book,e as chapter,t as chapterTitle,p as default,s as examples,r as headings,c as html,a as original,i as slug,o as title};
