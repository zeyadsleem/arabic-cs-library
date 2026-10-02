const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",c="p5",o="الدوال: متابعة",p=[{depth:2,id:"lesson-title",text:"الدوال: متابعة"}],i=`
  <h2 id="lesson-title">الدوال: متابعة</h2>
  
  
  <p>
    عندما يشترك معاملان مسمّيان متتاليان أو أكثر من معاملات الدالة في النوع نفسه، يمكنك حذف النوع من جميعها باستثناء المعامل الأخير.
  </p>
  

  
  <p>
    في هذا المثال، اختصرنا
  </p>
  

  
  <pre>x int, y int</pre>
  

  
  <p>
    إلى
  </p>
  

  
  <pre>x, y int</pre>
  

	
		
	

`,s=[{Name:"functions-continued.go",Content:`package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
`}],a=`
  <h2>Functions continued</h2>
  
  
  <p>
    When two or more consecutive named function parameters share a type, you can omit the type from all but the last.
  </p>
  

  
  <p>
    In this example, we shortened
  </p>
  

  
  <pre>x int, y int</pre>
  

  
  <p>
    to
  </p>
  

  
  <pre>x, y int</pre>
  

	
		
	

`,r={book:n,chapter:t,chapterTitle:e,slug:"p5",title:o,headings:p,html:i,examples:s,original:a};export{n as book,t as chapter,e as chapterTitle,r as default,s as examples,p as headings,i as html,a as original,c as slug,o as title};
