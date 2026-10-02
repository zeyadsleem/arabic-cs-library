const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",l="p8",a="المتغيرات",o=[{depth:2,id:"lesson-title",text:"المتغيرات"}],s=`
  <h2 id="lesson-title">المتغيرات</h2>
  
  
  <p>
    تصرّح تعليمة <code>var</code> بقائمة من المتغيرات؛ ويأتي النوع في النهاية، كما في قوائم معاملات الدوال.
  </p>
  

  
  <p>
    يمكن أن تكون تعليمة <code>var</code> على مستوى الحزمة أو الدالة. ونرى الحالتين في هذا المثال.
  </p>
  

	
		
	

`,c=[{Name:"variables.go",Content:`package main

import "fmt"

var c, python, java bool

func main() {
	var i int
	fmt.Println(i, c, python, java)
}
`}],i=`
  <h2>Variables</h2>
  
  
  <p>
    The <code>var</code> statement declares a list of variables; as in function argument lists, the type is last.
  </p>
  

  
  <p>
    A <code>var</code> statement can be at package or function level. We see both in this example.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p8",title:a,headings:o,html:s,examples:c,original:i};export{n as book,t as chapter,e as chapterTitle,p as default,c as examples,o as headings,s as html,i as original,l as slug,a as title};
