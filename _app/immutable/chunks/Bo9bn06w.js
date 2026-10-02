const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",l="p8",s="الشرائح تشبه المراجع إلى المصفوفات",a=[{depth:2,id:"lesson-title",text:"الشرائح تشبه المراجع إلى المصفوفات"}],o=`
  <h2 id="lesson-title">الشرائح تشبه المراجع إلى المصفوفات</h2>
  
  
  <p>
    لا تخزّن الشريحة أي بيانات،


    بل تصف فقط جزءًا من مصفوفة تستند إليها.
  </p>
  

  
  <p>
    يؤدّي تغيير عناصر الشريحة إلى تعديل


    العناصر المقابلة لها في المصفوفة التي تستند إليها.
  </p>
  

  
  <p>
    سترى الشرائح الأخرى التي تشترك في المصفوفة نفسها هذه التغييرات.
  </p>
  

	
		
	

`,i=[{Name:"slices-pointers.go",Content:`package main

import "fmt"

func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}
`}],r=`
  <h2>Slices are like references to arrays</h2>
  
  
  <p>
    A slice does not store any data,


    it just describes a section of an underlying array.
  </p>
  

  
  <p>
    Changing the elements of a slice modifies the


    corresponding elements of its underlying array.
  </p>
  

  
  <p>
    Other slices that share the same underlying array will see those changes.
  </p>
  

	
		
	

`,c={book:n,chapter:t,chapterTitle:e,slug:"p8",title:s,headings:a,html:o,examples:i,original:r};export{n as book,t as chapter,e as chapterTitle,c as default,i as examples,a as headings,o as html,r as original,l as slug,s as title};
