const n="go-tour",t="basics",i="الحزم والمتغيرات والدوال",c="p9",e="المتغيرات مع تعبيرات التهيئة",a=[{depth:2,id:"lesson-title",text:"المتغيرات مع تعبيرات التهيئة"}],o=`
  <h2 id="lesson-title">المتغيرات مع تعبيرات التهيئة</h2>
  
  
  <p>
    يمكن أن يتضمن تصريح <code>var</code> تعبيرات تهيئة، تعبيرًا واحدًا لكل متغير.
  </p>
  

  
  <p>
    إذا وُجد تعبير تهيئة، فيمكن حذف النوع؛ إذ سيأخذ المتغير نوع تعبير التهيئة.
  </p>
  

	
		
	

`,s=[{Name:"variables-with-initializers.go",Content:`package main

import "fmt"

var i, j int = 1, 2

func main() {
	var c, python, java = true, false, "no!"
	fmt.Println(i, j, c, python, java)
}
`}],l=`
  <h2>Variables with initializers</h2>
  
  
  <p>
    A <code>var</code> declaration can include initializers, one per variable.
  </p>
  

  
  <p>
    If an initializer is present, the type can be omitted; the variable will take the type of the initializer.
  </p>
  

	
		
	

`,r={book:n,chapter:t,chapterTitle:i,slug:"p9",title:e,headings:a,html:o,examples:s,original:l};export{n as book,t as chapter,i as chapterTitle,r as default,s as examples,a as headings,o as html,l as original,c as slug,e as title};
