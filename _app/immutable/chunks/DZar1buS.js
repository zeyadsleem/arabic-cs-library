const n="go-tour",t="methods",e="التوابع والواجهات",i="p9",o="الواجهات",a=[{depth:2,id:"lesson-title",text:"الواجهات"}],s=`
  <h2 id="lesson-title">الواجهات</h2>
  
  
  <p>
    يُعرَّف <i>نوع الواجهة</i> بأنه مجموعة من تواقيع التوابع.
  </p>
  

  
  <p>
    يمكن لقيمة من نوع واجهة أن تحتوي على أي قيمة تنفّذ تلك التوابع.
  </p>
  

  
  <p>
    <b>ملاحظة:</b> يوجد خطأ في شيفرة المثال في السطر 22.


    لا ينفّذ <code>Vertex</code> (النوع القيمي) الواجهة <code>Abser</code> لأن


    التابع <code>Abs</code> معرّف فقط على <code>*Vertex</code> (النوع المؤشري).
  </p>
  

	
		
	

`,r=[{Name:"interfaces.go",Content:`package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat implements Abser
	a = &v // a *Vertex implements Abser

	// In the following line, v is a Vertex (not *Vertex)
	// and does NOT implement Abser.
	a = v

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
`}],c=`
  <h2>Interfaces</h2>
  
  
  <p>
    An <i>interface type</i> is defined as a set of method signatures.
  </p>
  

  
  <p>
    A value of interface type can hold any value that implements those methods.
  </p>
  

  
  <p>
    <b>Note:</b> There is an error in the example code on line 22.


    <code>Vertex</code> (the value type) doesn&#39;t implement <code>Abser</code> because


    the <code>Abs</code> method is defined only on <code>*Vertex</code> (the pointer type).
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:e,slug:"p9",title:o,headings:a,html:s,examples:r,original:c};export{n as book,t as chapter,e as chapterTitle,l as default,r as examples,a as headings,s as html,c as original,i as slug,o as title};
