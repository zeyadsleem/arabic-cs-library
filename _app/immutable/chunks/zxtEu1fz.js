const t="go-tour",n="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",i="p20",s="القيم الحرفية للخرائط",o=[{depth:2,id:"lesson-title",text:"القيم الحرفية للخرائط"}],a=`
  <h2 id="lesson-title">القيم الحرفية للخرائط</h2>
  
  
  <p>
    تشبه القيم الحرفية للخرائط القيم الحرفية للبنى، لكن المفاتيح مطلوبة.
  </p>
  

	
		
	

`,l=[{Name:"map-literals.go",Content:`package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

func main() {
	fmt.Println(m)
}
`}],r=`
  <h2>Map literals</h2>
  
  
  <p>
    Map literals are like struct literals, but the keys are required.
  </p>
  

	
		
	

`,p={book:t,chapter:n,chapterTitle:e,slug:"p20",title:s,headings:o,html:a,examples:l,original:r};export{t as book,n as chapter,e as chapterTitle,p as default,l as examples,o as headings,a as html,r as original,i as slug,s as title};
