const n="go-tour",e="methods",t="التوابع والواجهات",o="index",c="التوابع",s=[{depth:2,id:"lesson-title",text:"التوابع"}],d=`
  <h2 id="lesson-title">التوابع</h2>
  
  
  <p>
    لا توجد أصناف في غو.


    لكن يمكنك تعريف توابع على الأنواع.
  </p>
  

  
  <p>
    التابع دالة لها وسيط خاص يُسمّى <i>المستقبِل</i>.
  </p>
  

  
  <p>
    يظهر المستقبِل في قائمة وسائط خاصة به بين الكلمة المحجوزة <code>func</code> و


    اسم التابع.
  </p>
  

  
  <p>
    في هذا المثال، للتابع <code>Abs</code> مستقبِل من النوع <code>Vertex</code> اسمه <code>v</code>.
  </p>
  

	
		
	

`,a=[{Name:"methods.go",Content:`package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
`}],i=`
  <h2>Methods</h2>
  
  
  <p>
    Go does not have classes.


    However, you can define methods on types.
  </p>
  

  
  <p>
    A method is a function with a special <i>receiver</i> argument.
  </p>
  

  
  <p>
    The receiver appears in its own argument list between the <code>func</code> keyword and


    the method name.
  </p>
  

  
  <p>
    In this example, the <code>Abs</code> method has a receiver of type <code>Vertex</code> named <code>v</code>.
  </p>
  

	
		
	

`,p={book:n,chapter:e,chapterTitle:t,slug:o,title:c,headings:s,html:d,examples:a,original:i};export{n as book,e as chapter,t as chapterTitle,p as default,a as examples,s as headings,d as html,i as original,o as slug,c as title};
