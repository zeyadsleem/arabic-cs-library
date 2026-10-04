const n="go-tour",e="concurrency",t="التزامن",i="p7",r="تمرين: الأشجار الثنائية المتكافئة",o=[{depth:2,id:"lesson-title",text:"تمرين: الأشجار الثنائية المتكافئة"}],a=`
  <h2 id="lesson-title">تمرين: الأشجار الثنائية المتكافئة</h2>
  
  
  <p>
    قد توجد أشجار ثنائية عديدة ومختلفة تخزّن التسلسل نفسه من القيم. على سبيل المثال، إليك شجرتين ثنائيتين تخزّنان التسلسل 1، 1، 2، 3، 5، 8، 13.
  </p>
  

  <img src="/arabic-cs-library/images/go-tour/remote-1bb5d14bea0b6614.webp" alt="رسم توضيحي من جولة Go الأصلية" loading="lazy">

  
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
  

`,c=[],s=`
  <h2>Exercise: Equivalent Binary Trees</h2>
  
  
  <p>
    There can be many different binary trees with the same sequence of values stored in it. For example, here are two binary trees storing the sequence 1, 1, 2, 3, 5, 8, 13.
  </p>
  

  <img src="/arabic-cs-library/images/go-tour/remote-1bb5d14bea0b6614.webp" alt="رسم توضيحي من جولة Go الأصلية" loading="lazy">

  
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
  

`,p={book:n,chapter:e,chapterTitle:t,slug:"p7",title:r,headings:o,html:a,examples:c,original:s};export{n as book,e as chapter,t as chapterTitle,p as default,c as examples,o as headings,a as html,s as original,i as slug,r as title};
