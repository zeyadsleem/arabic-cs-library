const n="go-tour",e="methods",t="التوابع والواجهات",i="p8",o="اختيار مستقبِل قيمي أو مؤشري",s=[{depth:2,id:"lesson-title",text:"اختيار مستقبِل قيمي أو مؤشري"}],r=`
  <h2 id="lesson-title">اختيار مستقبِل قيمي أو مؤشري</h2>
  
  
  <p>
    هناك سببان لاستخدام مستقبِل مؤشري.
  </p>
  

  
  <p>
    الأول هو تمكين التابع من تعديل القيمة التي يشير إليها مستقبِله.
  </p>
  

  
  <p>
    والثاني هو تجنّب نسخ القيمة عند كل استدعاء للتابع.


    قد يكون هذا أكثر كفاءة إذا كان المستقبِل بنية كبيرة، على سبيل المثال.
  </p>
  

  
  <p>
    في هذا المثال، كلٌّ من <code>Scale</code> و<code>Abs</code> تابع له مستقبِل من النوع <code>*Vertex</code>،


    رغم أن التابع <code>Abs</code> لا يحتاج إلى تعديل مستقبِله.
  </p>
  

  
  <p>
    عمومًا، ينبغي أن تكون مستقبِلات جميع التوابع على نوع معيّن إما قيمية أو مؤشرية


    لا مزيجًا من الاثنين.


    (سنرى السبب في الصفحات القليلة التالية.)
  </p>
  

	
		
	

`,c=[{Name:"methods-with-pointer-receivers.go",Content:`package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := &Vertex{3, 4}
	fmt.Printf("Before scaling: %+v, Abs: %v\\n", v, v.Abs())
	v.Scale(5)
	fmt.Printf("After scaling: %+v, Abs: %v\\n", v, v.Abs())
}
`}],a=`
  <h2>Choosing a value or pointer receiver</h2>
  
  
  <p>
    There are two reasons to use a pointer receiver.
  </p>
  

  
  <p>
    The first is so that the method can modify the value that its receiver points to.
  </p>
  

  
  <p>
    The second is to avoid copying the value on each method call.


    This can be more efficient if the receiver is a large struct, for example.
  </p>
  

  
  <p>
    In this example, both <code>Scale</code> and <code>Abs</code> are methods with receiver type <code>*Vertex</code>,


    even though the <code>Abs</code> method needn&#39;t modify its receiver.
  </p>
  

  
  <p>
    In general, all methods on a given type should have either value or pointer


    receivers, but not a mixture of both.


    (We&#39;ll see why over the next few pages.)
  </p>
  

	
		
	

`,h={book:n,chapter:e,chapterTitle:t,slug:"p8",title:o,headings:s,html:r,examples:c,original:a};export{n as book,e as chapter,t as chapterTitle,h as default,c as examples,s as headings,r as html,a as original,i as slug,o as title};
