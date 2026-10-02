const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",r="p13",o="تحويلات الأنواع",i=[{depth:2,id:"lesson-title",text:"تحويلات الأنواع"}],c=`
  <h2 id="lesson-title">تحويلات الأنواع</h2>
  
  
  <p>
    يحوّل التعبير <code>T(v)</code> القيمة <code>v</code> إلى النوع <code>T</code>.
  </p>
  

  
  <p>
    بعض التحويلات العددية:
  </p>
  

  
  <pre>var i int = 42
var f float64 = float64(i)
var u uint = uint(f)</pre>
  

  
  <p>
    أو، بصيغة أبسط:
  </p>
  

  
  <pre>i := 42
f := float64(i)
u := uint(f)</pre>
  

  
  <p>
    على خلاف C، يتطلب الإسناد بين عناصر ذات أنواع مختلفة في Go


    تحويلًا صريحًا.


    جرّب إزالة التحويلات إلى <code>float64</code> أو <code>uint</code> في المثال وانظر ما يحدث.
  </p>
  

	
		
	

`,p=[{Name:"type-conversions.go",Content:`package main

import (
	"fmt"
	"math"
)

func main() {
	var x, y int = 3, 4
	var f float64 = math.Sqrt(float64(x*x + y*y))
	var z uint = uint(f)
	fmt.Println(x, y, z)
}
`}],a=`
  <h2>Type conversions</h2>
  
  
  <p>
    The expression <code>T(v)</code> converts the value <code>v</code> to the type <code>T</code>.
  </p>
  

  
  <p>
    Some numeric conversions:
  </p>
  

  
  <pre>var i int = 42
var f float64 = float64(i)
var u uint = uint(f)</pre>
  

  
  <p>
    Or, put more simply:
  </p>
  

  
  <pre>i := 42
f := float64(i)
u := uint(f)</pre>
  

  
  <p>
    Unlike in C, in Go assignment between items of different type requires an


    explicit conversion.


    Try removing the <code>float64</code> or <code>uint</code> conversions in the example and see what happens.
  </p>
  

	
		
	

`,s={book:n,chapter:t,chapterTitle:e,slug:"p13",title:o,headings:i,html:c,examples:p,original:a};export{n as book,t as chapter,e as chapterTitle,s as default,p as examples,i as headings,c as html,a as original,r as slug,o as title};
