const n="go-tour",t="methods",e="التوابع والواجهات",i="p3",o="التوابع: تتمّة",a=[{depth:2,id:"lesson-title",text:"التوابع: تتمّة"}],c=`
  <h2 id="lesson-title">التوابع: تتمّة</h2>
  
  
  <p>
    يمكنك أيضًا التصريح بتابع على أنواع ليست بُنى.
  </p>
  

  
  <p>
    في هذا المثال نرى نوعًا عدديًا <code>MyFloat</code> له تابع <code>Abs</code>.
  </p>
  

  
  <p>
    لا يمكنك التصريح بتابع إلا إذا كان نوع مستقبِله معرّفًا في الحزمة نفسها


    التي يوجد فيها التابع.


    لا يمكنك التصريح بتابع يكون نوع مستقبِله معرّفًا في حزمة أخرى


    (ويشمل ذلك الأنواع المدمجة مثل <code>int</code>).
  </p>
  

	
		
	

`,s=[{Name:"methods-continued.go",Content:`package main

import (
	"fmt"
	"math"
)

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
`}],d=`
  <h2>Methods continued</h2>
  
  
  <p>
    You can declare a method on non-struct types, too.
  </p>
  

  
  <p>
    In this example we see a numeric type <code>MyFloat</code> with an <code>Abs</code> method.
  </p>
  

  
  <p>
    You can only declare a method with a receiver whose type is defined in the same


    package as the method.


    You cannot declare a method with a receiver whose type is defined in another


    package (which includes the built-in types such as <code>int</code>).
  </p>
  

	
		
	

`,h={book:n,chapter:t,chapterTitle:e,slug:"p3",title:o,headings:a,html:c,examples:s,original:d};export{n as book,t as chapter,e as chapterTitle,h as default,s as examples,a as headings,c as html,d as original,i as slug,o as title};
