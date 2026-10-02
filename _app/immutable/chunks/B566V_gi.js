const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",i="p6",o="المصفوفات",a=[{depth:2,id:"lesson-title",text:"المصفوفات"}],r=`
  <h2 id="lesson-title">المصفوفات</h2>
  
  
  <p>
    النوع <code>[n]T</code> هو مصفوفة من <code>n</code> قيمة من النوع <code>T</code>.
  </p>
  

  
  <p>
    التعبير
  </p>
  

  
  <pre>var a [10]int</pre>
  

  
  <p>
    يصرّح عن متغيّر <code>a</code> بوصفه مصفوفة من عشرة أعداد صحيحة.
  </p>
  

  
  <p>
    طول المصفوفة جزء من نوعها، لذا لا يمكن تغيير حجم المصفوفات.


    قد يبدو هذا مقيّدًا، لكن لا تقلق؛


    توفّر Go طريقة ملائمة للعمل مع المصفوفات.
  </p>
  

	
		
	

`,s=[{Name:"array.go",Content:`package main

import "fmt"

func main() {
	var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)

	primes := [6]int{2, 3, 5, 7, 11, 13}
	fmt.Println(primes)
}
`}],p=`
  <h2>Arrays</h2>
  
  
  <p>
    The type <code>[n]T</code> is an array of <code>n</code> values of type <code>T</code>.
  </p>
  

  
  <p>
    The expression
  </p>
  

  
  <pre>var a [10]int</pre>
  

  
  <p>
    declares a variable <code>a</code> as an array of ten integers.
  </p>
  

  
  <p>
    An array&#39;s length is part of its type, so arrays cannot be resized.


    This seems limiting, but don&#39;t worry;


    Go provides a convenient way of working with arrays.
  </p>
  

	
		
	

`,c={book:n,chapter:t,chapterTitle:e,slug:"p6",title:o,headings:a,html:r,examples:s,original:p};export{n as book,t as chapter,e as chapterTitle,c as default,s as examples,a as headings,r as html,p as original,i as slug,o as title};
