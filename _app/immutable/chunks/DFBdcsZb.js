const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",l="p3",s="حقول البنية",o=[{depth:2,id:"lesson-title",text:"حقول البنية"}],c=`
  <h2 id="lesson-title">حقول البنية</h2>
  
  
  <p>
    يجري الوصول إلى حقول البنية باستخدام نقطة.
  </p>
  

	
		
	

`,i=[{Name:"struct-fields.go",Content:`package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)
}
`}],r=`
  <h2>Struct Fields</h2>
  
  
  <p>
    Struct fields are accessed using a dot.
  </p>
  

	
		
	

`,a={book:n,chapter:t,chapterTitle:e,slug:"p3",title:s,headings:o,html:c,examples:i,original:r};export{n as book,t as chapter,e as chapterTitle,a as default,i as examples,o as headings,c as html,r as original,l as slug,s as title};
