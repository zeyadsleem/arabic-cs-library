const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",i="p9",r="القيم الحرفية للشرائح",l=[{depth:2,id:"lesson-title",text:"القيم الحرفية للشرائح"}],s=`
  <h2 id="lesson-title">القيم الحرفية للشرائح</h2>
  
  
  <p>
    تشبه القيمة الحرفية للشريحة القيمة الحرفية للمصفوفة، لكن دون الطول.
  </p>
  

  
  <p>
    هذه قيمة حرفية لمصفوفة:
  </p>
  

  
  <pre>[3]bool{true, true, false}</pre>
  

  
  <p>
    وهذا ينشئ المصفوفة نفسها التي أعلاه،


    ثم يبني شريحة تشير إليها:
  </p>
  

  
  <pre>[]bool{true, true, false}</pre>
  

	
		
	

`,a=[{Name:"slice-literals.go",Content:`package main

import "fmt"

func main() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(q)

	r := []bool{true, false, true, true, false, true}
	fmt.Println(r)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println(s)
}
`}],o=`
  <h2>Slice literals</h2>
  
  
  <p>
    A slice literal is like an array literal without the length.
  </p>
  

  
  <p>
    This is an array literal:
  </p>
  

  
  <pre>[3]bool{true, true, false}</pre>
  

  
  <p>
    And this creates the same array as above,


    then builds a slice that references it:
  </p>
  

  
  <pre>[]bool{true, true, false}</pre>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p9",title:r,headings:l,html:s,examples:a,original:o};export{n as book,t as chapter,e as chapterTitle,p as default,a as examples,l as headings,s as html,o as original,i as slug,r as title};
