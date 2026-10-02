const n="go-tour",e="moretypes",t="مزيد من الأنواع: البنى والشرائح والخرائط.",p="p11",i="طول الشريحة وسعتها",s=[{depth:2,id:"lesson-title",text:"طول الشريحة وسعتها"}],c=`
  <h2 id="lesson-title">طول الشريحة وسعتها</h2>
  
  
  <p>
    للشريحة كلٌّ من <i>طول</i> و<i>سعة</i>.
  </p>
  

  
  <p>
    طول الشريحة هو عدد العناصر التي تحتوي عليها.
  </p>
  

  
  <p>
    سعة الشريحة هي عدد العناصر في المصفوفة التي تستند إليها،


    بدءًا من العنصر الأول في الشريحة.
  </p>
  

  
  <p>
    يمكن الحصول على طول الشريحة <code>s</code> وسعتها باستخدام التعبيرين


    <code>len(s)</code> و<code>cap(s)</code>.
  </p>
  

  
  <p>
    يمكنك زيادة طول الشريحة بإعادة تحديد شريحة منها،


    بشرط أن تكون لها سعة كافية.


    جرّب تغيير إحدى عمليات الشرائح في البرنامج المثال لتمديدها


    إلى ما يتجاوز سعتها، وانظر ماذا يحدث.
  </p>
  

	
		
	

`,o=[{Name:"slice-len-cap.go",Content:`package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s)

	// Extend its length.
	s = s[:4]
	printSlice(s)

	// Drop its first two values.
	s = s[2:]
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\\n", len(s), cap(s), s)
}
`}],a=`
  <h2>Slice length and capacity</h2>
  
  
  <p>
    A slice has both a <i>length</i> and a <i>capacity</i>.
  </p>
  

  
  <p>
    The length of a slice is the number of elements it contains.
  </p>
  

  
  <p>
    The capacity of a slice is the number of elements in the underlying array,


    counting from the first element in the slice.
  </p>
  

  
  <p>
    The length and capacity of a slice <code>s</code> can be obtained using the expressions


    <code>len(s)</code> and <code>cap(s)</code>.
  </p>
  

  
  <p>
    You can extend a slice&#39;s length by re-slicing it,


    provided it has sufficient capacity.


    Try changing one of the slice operations in the example program to extend it


    beyond its capacity and see what happens.
  </p>
  

	
		
	

`,l={book:n,chapter:e,chapterTitle:t,slug:"p11",title:i,headings:s,html:c,examples:o,original:a};export{n as book,e as chapter,t as chapterTitle,l as default,o as examples,s as headings,c as html,a as original,p as slug,i as title};
