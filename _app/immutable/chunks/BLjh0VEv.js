const n="go-tour",o="welcome",e="مرحبًا!",t="index",a="مرحبًا، أيها العالم",r=[{depth:2,id:"lesson-title",text:"مرحبًا، أيها العالم"}],i=`
  <h2 id="lesson-title">مرحبًا، أيها العالم</h2>
  
  
  <p>
    مرحبًا بك في جولة في <a href="https://go.dev/" target="_blank" rel="noopener noreferrer">لغة البرمجة Go</a>.
  </p>
  

  
  <p>
    تنقسم الجولة إلى قائمة من الوحدات التي يمكنك


    الوصول إليها بالنقر على


    <a href="/arabic-cs-library/book/go-tour/" data-tour-action="modules">جولة في Go</a> في أعلى يسار الصفحة.
  </p>
  

  
  <p>
    يمكنك أيضًا عرض جدول المحتويات في أي وقت بالنقر على <a href="/arabic-cs-library/book/go-tour/" data-tour-action="modules">القائمة</a> في أعلى يمين الصفحة.
  </p>
  

  
  <p>
    ستجد خلال الجولة سلسلة من الشرائح والتمارين


    التي عليك إكمالها.
  </p>
  

  
  <p>
    يمكنك التنقل بينها باستخدام
  </p>
  

  <ul>
  
    <li><a href="/arabic-cs-library/book/go-tour/" data-tour-action="previous">&#34;السابق&#34;</a> أو <code>PageUp</code> للانتقال إلى الصفحة السابقة،</li>
  
  </ul>

  <ul>
  
    <li><a href="/arabic-cs-library/book/go-tour/welcome/p2/" data-tour-action="next">&#34;التالي&#34;</a> أو <code>PageDown</code> للانتقال إلى الصفحة التالية.</li>
  
  </ul>

  
  <p>
    الجولة تفاعلية. انقر على زر


    <a href="#tour-run" data-tour-action="run">تشغيل</a> الآن


    (أو اضغط على <code>Shift</code> + <code>Enter</code>) لترجمة البرنامج وتشغيله على


    خادم بعيد.


    تُعرض النتيجة أسفل الشيفرة.
  </p>
  

  
  <p>
    توضّح هذه البرامج النموذجية جوانب مختلفة من Go. وتهدف برامج الجولة إلى أن تكون نقاط انطلاق لتجاربك الخاصة.
  </p>
  

  
  <p>
    عدّل البرنامج وشغّله مجددًا.
  </p>
  

  
  <p>
    عندما تنقر على <a href="#tour-format" data-tour-action="format">تنسيق</a>


    (الاختصار: <code>Ctrl</code> + <code>Enter</code>)، يُنسَّق النص في المحرّر باستخدام


    أداة <a href="https://go.dev/cmd/gofmt/" target="_blank" rel="noopener noreferrer">gofmt</a>.
  </p>
  

  
  <p>
    عندما تكون مستعدًا للمتابعة، انقر على <a href="/arabic-cs-library/book/go-tour/welcome/p2/" data-tour-action="next">السهم الأيمن</a> أدناه أو اضغط على مفتاح <code>PageDown</code>.
  </p>
  

	
		
	

`,c=[{Name:"hello.go",Content:`package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
`}],l=`
  <h2>Hello, 世界</h2>
  
  
  <p>
    Welcome to a tour of the <a href="https://go.dev/" target="_blank" rel="noopener noreferrer">Go programming language</a>.
  </p>
  

  
  <p>
    The tour is divided into a list of modules that you can


    access by clicking on


    <a href="/arabic-cs-library/book/go-tour/" data-tour-action="modules">A Tour of Go</a> on the top left of the page.
  </p>
  

  
  <p>
    You can also view the table of contents at any time by clicking on the <a href="/arabic-cs-library/book/go-tour/" data-tour-action="modules">menu</a> on the top right of the page.
  </p>
  

  
  <p>
    Throughout the tour you will find a series of slides and exercises for you


    to complete.
  </p>
  

  
  <p>
    You can navigate through them using
  </p>
  

  <ul>
  
    <li><a href="/arabic-cs-library/book/go-tour/" data-tour-action="previous">&#34;previous&#34;</a> or <code>PageUp</code> to go to the previous page,</li>
  
  </ul>

  <ul>
  
    <li><a href="/arabic-cs-library/book/go-tour/welcome/p2/" data-tour-action="next">&#34;next&#34;</a> or <code>PageDown</code> to go to the next page.</li>
  
  </ul>

  
  <p>
    The tour is interactive. Click the


    <a href="#tour-run" data-tour-action="run">Run</a> button now


    (or press <code>Shift</code> + <code>Enter</code>) to compile and run the program on


    a remote server.


    The result is displayed below the code.
  </p>
  

  
  <p>
    These example programs demonstrate different aspects of Go. The programs in the tour are meant to be starting points for your own experimentation.
  </p>
  

  
  <p>
    Edit the program and run it again.
  </p>
  

  
  <p>
    When you click on <a href="#tour-format" data-tour-action="format">Format</a>


    (shortcut: <code>Ctrl</code> + <code>Enter</code>), the text in the editor is formatted using the


    <a href="https://go.dev/cmd/gofmt/" target="_blank" rel="noopener noreferrer">gofmt</a> tool. You can switch syntax highlighting on and off


    by clicking on the <a href="#tour-editor" data-tour-action="editor">syntax</a> button.
  </p>
  

  
  <p>
    When you&#39;re ready to move on, click the <a href="/arabic-cs-library/book/go-tour/welcome/p2/" data-tour-action="next">right arrow</a> below or type the <code>PageDown</code> key.
  </p>
  

	
		
	

`,p={book:n,chapter:o,chapterTitle:e,slug:t,title:a,headings:r,html:i,examples:c,original:l};export{n as book,o as chapter,e as chapterTitle,p as default,c as examples,r as headings,i as html,l as original,t as slug,a as title};
