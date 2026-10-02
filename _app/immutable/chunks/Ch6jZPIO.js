const n="go-tour",e="moretypes",t="مزيد من الأنواع: البنى والشرائح والخرائط.",r="p15",o="الإلحاق بشريحة",a=[{depth:2,id:"lesson-title",text:"الإلحاق بشريحة"}],p=`
  <h2 id="lesson-title">الإلحاق بشريحة</h2>
  
  
  <p>
    من الشائع إلحاق عناصر جديدة بشريحة، ولذلك توفّر Go دالة مدمجة


    هي <code>append</code>. ويصف <a href="https://go.dev/pkg/builtin/#append" target="_blank" rel="noopener noreferrer">توثيق</a>


    الحزمة المدمجة الدالة <code>append</code>.
  </p>
  

  
  <pre>func append(s []T, vs ...T) []T</pre>
  

  
  <p>
    المعامل الأول <code>s</code> للدالة <code>append</code> هو شريحة من النوع <code>T</code>، والبقية هي


    قيم من النوع <code>T</code> تُلحَق بالشريحة.
  </p>
  

  
  <p>
    القيمة الناتجة من <code>append</code> هي شريحة تحتوي على جميع عناصر


    الشريحة الأصلية، بالإضافة إلى القيم المقدَّمة.
  </p>
  

  
  <p>
    إذا كانت المصفوفة التي تستند إليها <code>s</code> أصغر من أن تستوعب جميع القيم المعطاة، فستُخصَّص ذاكرة لمصفوفة أكبر.


    وستشير الشريحة المُعادة إلى المصفوفة التي خُصّصت لها الذاكرة


    حديثًا.
  </p>
  

  
  <p>
    (لمعرفة المزيد عن الشرائح، اقرأ مقالة <a href="https://go.dev/blog/go-slices-usage-and-internals" target="_blank" rel="noopener noreferrer">الشرائح: الاستخدام وآلية العمل الداخلية</a>.)
  </p>
  

	
		
	

`,s=[{Name:"append.go",Content:`package main

import "fmt"

func main() {
	var s []int
	printSlice(s)

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s)

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s)

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\\n", len(s), cap(s), s)
}
`}],d=`
  <h2>Appending to a slice</h2>
  
  
  <p>
    It is common to append new elements to a slice, and so Go provides a built-in


    <code>append</code> function. The <a href="https://go.dev/pkg/builtin/#append" target="_blank" rel="noopener noreferrer">documentation</a>


    of the built-in package describes <code>append</code>.
  </p>
  

  
  <pre>func append(s []T, vs ...T) []T</pre>
  

  
  <p>
    The first parameter <code>s</code> of <code>append</code> is a slice of type <code>T</code>, and the rest are


    <code>T</code> values to append to the slice.
  </p>
  

  
  <p>
    The resulting value of <code>append</code> is a slice containing all the elements of the


    original slice plus the provided values.
  </p>
  

  
  <p>
    If the backing array of <code>s</code> is too small to fit all the given values a bigger


    array will be allocated. The returned slice will point to the newly allocated


    array.
  </p>
  

  
  <p>
    (To learn more about slices, read the <a href="https://go.dev/blog/go-slices-usage-and-internals" target="_blank" rel="noopener noreferrer">Slices: usage and internals</a> article.)
  </p>
  

	
		
	

`,c={book:n,chapter:e,chapterTitle:t,slug:"p15",title:o,headings:a,html:p,examples:s,original:d};export{n as book,e as chapter,t as chapterTitle,c as default,s as examples,a as headings,p as html,d as original,r as slug,o as title};
