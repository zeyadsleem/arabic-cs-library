const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",l="p2",o="البنى",s=[{depth:2,id:"lesson-title",text:"البنى"}],c=`
  <h2 id="lesson-title">البنى</h2>
  
  
  <p>
    البنية <code>struct</code> هي مجموعة من الحقول.
  </p>
  

	
		
	

`,i=[{Name:"structs.go",Content:`package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	fmt.Println(Vertex{1, 2})
}
`}],r=`
  <h2>Structs</h2>
  
  
  <p>
    A <code>struct</code> is a collection of fields.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p2",title:o,headings:s,html:c,examples:i,original:r};export{n as book,t as chapter,e as chapterTitle,p as default,i as examples,s as headings,c as html,r as original,l as slug,o as title};
