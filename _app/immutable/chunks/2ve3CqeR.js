const n="go-tour",e="welcome",o="مرحبًا!",i="p3",t="الجولة دون اتصال بالإنترنت (اختياري)",r=[{depth:2,id:"lesson-title",text:"الجولة دون اتصال بالإنترنت (اختياري)"}],a=`
  <h2 id="lesson-title">الجولة دون اتصال بالإنترنت (اختياري)</h2>
  
  
  <p>
    هذه الجولة متاحة أيضًا بوصفها برنامجًا مستقلًا يمكنك استخدامه


    دون اتصال بالإنترنت. وهو يبني أمثلة الشيفرة ويشغّلها على


    جهازك الخاص.
  </p>
  

  
  <p>
    لتشغيل الجولة محليًا، ستحتاج أولًا إلى


    <a href="https://go.dev/doc/install" target="_blank" rel="noopener noreferrer">تثبيت Go</a> ثم تنفيذ:
  </p>
  

  
  <pre>go install golang.org/x/website/tour@latest</pre>
  

  
  <p>
    سيضع هذا ملفًا تنفيذيًا باسم <code>tour</code> ضمن مسار


    <a href="https://go.dev/cmd/go/#hdr-GOPATH_and_Modules" target="_blank" rel="noopener noreferrer">GOPATH</a> الخاص بك، في دليل <code>bin</code>.


    عندما تشغّل برنامج الجولة، سيفتح متصفّح ويب يعرض


    نسختك المحلية من الجولة.
  </p>
  

  
  <p>
    بالطبع، يمكنك مواصلة الجولة عبر هذا الموقع.
  </p>
  

`,l=[],s=`
  <h2>Go offline (optional)</h2>
  
  
  <p>
    This tour is also available as a stand-alone program that you can use


    without access to the internet. It builds and runs the code samples on


    your own machine.
  </p>
  

  
  <p>
    To run the tour locally, you&#39;ll need to first


    <a href="https://go.dev/doc/install" target="_blank" rel="noopener noreferrer">install Go</a> and then run:
  </p>
  

  
  <pre>go install golang.org/x/website/tour@latest</pre>
  

  
  <p>
    This will place a <code>tour</code> binary in your


    <a href="https://go.dev/cmd/go/#hdr-GOPATH_and_Modules" target="_blank" rel="noopener noreferrer">GOPATH</a>&#39;s <code>bin</code> directory.


    When you run the tour program, it will open a web browser displaying


    your local version of the tour.
  </p>
  

  
  <p>
    Of course, you can continue to take the tour through this web site.
  </p>
  

`,p={book:n,chapter:e,chapterTitle:o,slug:"p3",title:t,headings:r,html:a,examples:l,original:s};export{n as book,e as chapter,o as chapterTitle,p as default,l as examples,r as headings,a as html,s as original,i as slug,t as title};
