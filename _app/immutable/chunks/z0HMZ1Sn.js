const n="go-tour",t="methods",e="التوابع والواجهات",l="p13",i="قيم الواجهات المعدومة",o=[{depth:2,id:"lesson-title",text:"قيم الواجهات المعدومة"}],c=`
  <h2 id="lesson-title">قيم الواجهات المعدومة</h2>
  
  
  <p>
    لا تحتوي قيمة الواجهة المعدومة على قيمة ولا على نوع فعلي.
  </p>
  

  
  <p>
    يُعدّ استدعاء تابع على واجهة معدومة خطأً وقت التشغيل، لعدم وجود


    نوع داخل زوج الواجهة يحدّد أي تابع <i>فعلي</i> ينبغي استدعاؤه.
  </p>
  

	
		
	

`,a=[{Name:"nil-interface-values.go",Content:`package main

import "fmt"

type I interface {
	M()
}

func main() {
	var i I
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\\n", i, i)
}
`}],s=`
  <h2>Nil interface values</h2>
  
  
  <p>
    A nil interface value holds neither value nor concrete type.
  </p>
  

  
  <p>
    Calling a method on a nil interface is a run-time error because there is no


    type inside the interface tuple to indicate which <i>concrete</i> method to call.
  </p>
  

	
		
	

`,r={book:n,chapter:t,chapterTitle:e,slug:"p13",title:i,headings:o,html:c,examples:a,original:s};export{n as book,t as chapter,e as chapterTitle,r as default,a as examples,o as headings,c as html,s as original,l as slug,i as title};
