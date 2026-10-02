const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",p="p21",o="القيم الحرفية للخرائط، تتمّة",s=[{depth:2,id:"lesson-title",text:"القيم الحرفية للخرائط، تتمّة"}],l=`
  <h2 id="lesson-title">القيم الحرفية للخرائط، تتمّة</h2>
  
  
  <p>
    إذا كان النوع في المستوى الأعلى مجرد اسم نوع، فيمكنك حذفه من عناصر القيمة الحرفية.
  </p>
  

	
		
	

`,a=[{Name:"map-literals-continued.go",Content:`package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}

func main() {
	fmt.Println(m)
}
`}],i=`
  <h2>Map literals continued</h2>
  
  
  <p>
    If the top-level type is just a type name, you can omit it from the elements of the literal.
  </p>
  

	
		
	

`,r={book:n,chapter:t,chapterTitle:e,slug:"p21",title:o,headings:s,html:l,examples:a,original:i};export{n as book,t as chapter,e as chapterTitle,r as default,a as examples,s as headings,l as html,i as original,p as slug,o as title};
