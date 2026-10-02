const n="go-tour",t="moretypes",o="مزيد من الأنواع: البنى والشرائح والخرائط.",c="p24",e="قيم الدوال",a=[{depth:2,id:"lesson-title",text:"قيم الدوال"}],s=`
  <h2 id="lesson-title">قيم الدوال</h2>
  
  
  <p>
    الدوال قيم أيضًا. يمكن تمريرها مثل القيم الأخرى تمامًا.
  </p>
  

  
  <p>
    يمكن استخدام قيم الدوال كوسائط للدوال وكقيم إرجاع.
  </p>
  

	
		
	

`,u=[{Name:"function-values.go",Content:`package main

import (
	"fmt"
	"math"
)

func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
}
`}],l=`
  <h2>Function values</h2>
  
  
  <p>
    Functions are values too. They can be passed around just like other values.
  </p>
  

  
  <p>
    Function values may be used as function arguments and return values.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:o,slug:"p24",title:e,headings:a,html:s,examples:u,original:l};export{n as book,t as chapter,o as chapterTitle,p as default,u as examples,a as headings,s as html,l as original,c as slug,e as title};
