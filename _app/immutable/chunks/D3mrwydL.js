const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",c="p12",s="الشرائح المعدومة",o=[{depth:2,id:"lesson-title",text:"الشرائح المعدومة"}],i=`
  <h2 id="lesson-title">الشرائح المعدومة</h2>
  
  
  <p>
    القيمة الصفرية للشريحة هي <code>nil</code>.
  </p>
  

  
  <p>
    للشريحة المعدومة طول وسعة يساويان 0


    وليس لها مصفوفة تستند إليها.
  </p>
  

	
		
	

`,l=[{Name:"nil-slices.go",Content:`package main

import "fmt"

func main() {
	var s []int
	fmt.Println(s, len(s), cap(s))
	if s == nil {
		fmt.Println("nil!")
	}
}
`}],a=`
  <h2>Nil slices</h2>
  
  
  <p>
    The zero value of a slice is <code>nil</code>.
  </p>
  

  
  <p>
    A nil slice has a length and capacity of 0


    and has no underlying array.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p12",title:s,headings:o,html:i,examples:l,original:a};export{n as book,t as chapter,e as chapterTitle,p as default,l as examples,o as headings,i as html,a as original,c as slug,s as title};
