const n="go-tour",e="moretypes",t="مزيد من الأنواع: البنى والشرائح والخرائط.",p="p7",o="الشرائح",s=[{depth:2,id:"lesson-title",text:"الشرائح"}],i=`
  <h2 id="lesson-title">الشرائح</h2>
  
  
  <p>
    للمصفوفة حجم ثابت.


    أما الشريحة، فهي عرض ذو حجم ديناميكي،


    ومرن لعناصر مصفوفة.


    عمليًا، الشرائح أكثر شيوعًا بكثير من المصفوفات.
  </p>
  

  
  <p>
    النوع <code>[]T</code> هو شريحة عناصرها من النوع <code>T</code>.
  </p>
  

  
  <p>
    تُشكَّل الشريحة بتحديد فهرسين، حدّ أدنى و


    حدّ أعلى، تفصل بينهما نقطتان رأسيتان:
  </p>
  

  
  <pre>a[low : high]</pre>
  

  
  <p>
    يحدّد هذا نطاقًا نصف مفتوح يشمل العنصر


    الأول، لكنه يستثني العنصر الأخير.
  </p>
  

  
  <p>
    ينشئ التعبير التالي شريحة تشمل


    العناصر من 1 إلى 3 من <code>a</code>:
  </p>
  

  
  <pre>a[1:4]</pre>
  

	
		
	

`,c=[{Name:"slices.go",Content:`package main

import "fmt"

func main() {
	primes := [6]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)
}
`}],a=`
  <h2>Slices</h2>
  
  
  <p>
    An array has a fixed size.


    A slice, on the other hand, is a dynamically-sized,


    flexible view into the elements of an array.


    In practice, slices are much more common than arrays.
  </p>
  

  
  <p>
    The type <code>[]T</code> is a slice with elements of type <code>T</code>.
  </p>
  

  
  <p>
    A slice is formed by specifying two indices, a low and


    high bound, separated by a colon:
  </p>
  

  
  <pre>a[low : high]</pre>
  

  
  <p>
    This selects a half-open range which includes the first


    element, but excludes the last one.
  </p>
  

  
  <p>
    The following expression creates a slice which includes


    elements 1 through 3 of <code>a</code>:
  </p>
  

  
  <pre>a[1:4]</pre>
  

	
		
	

`,l={book:n,chapter:e,chapterTitle:t,slug:"p7",title:o,headings:s,html:i,examples:c,original:a};export{n as book,e as chapter,t as chapterTitle,l as default,c as examples,s as headings,i as html,a as original,p as slug,o as title};
