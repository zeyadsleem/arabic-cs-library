const n="go-tour",e="methods",o="التوابع والواجهات",i="p4",t="المستقبِلات المؤشرية",c=[{depth:2,id:"lesson-title",text:"المستقبِلات المؤشرية"}],d=`
  <h2 id="lesson-title">المستقبِلات المؤشرية</h2>
  
  
  <p>
    يمكنك التصريح بتوابع ذات مستقبِلات مؤشرية.
  </p>
  

  
  <p>
    يعني هذا أن نوع المستقبِل يُكتب بالصيغة الحرفية <code>*T</code> لنوع ما <code>T</code>.


    (كذلك، لا يمكن أن يكون <code>T</code> نفسه مؤشرًا مثل <code>*int</code>.)
  </p>
  

  
  <p>
    على سبيل المثال، التابع <code>Scale</code> هنا معرّف على <code>*Vertex</code>.
  </p>
  

  
  <p>
    يمكن للتوابع ذات المستقبِلات المؤشرية تعديل القيمة التي يشير إليها المستقبِل


    (كما يفعل <code>Scale</code> هنا).


    ولأن التوابع غالبًا ما تحتاج إلى تعديل مستقبِلاتها، فإن المستقبِلات المؤشرية أكثر


    شيوعًا من المستقبِلات القيمية.
  </p>
  

  
  <p>
    جرّب إزالة <code>*</code> من التصريح بالدالة <code>Scale</code> في السطر 16


    ولاحظ كيف يتغيّر سلوك البرنامج.
  </p>
  

  
  <p>
    عند استخدام مستقبِل قيمي، يعمل التابع <code>Scale</code> على نسخة من القيمة الأصلية


    من النوع <code>Vertex</code>.


    (وهذا هو السلوك نفسه لأي وسيط آخر لدالة.)


    يجب أن يكون للتابع <code>Scale</code> مستقبِل مؤشري لتغيير قيمة <code>Vertex</code>


    المصرّح بها في الدالة <code>main</code>.
  </p>
  

	
		
	

`,r=[{Name:"methods-pointers.go",Content:`package main

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

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs())
}
`}],a=`
  <h2>Pointer receivers</h2>
  
  
  <p>
    You can declare methods with pointer receivers.
  </p>
  

  
  <p>
    This means the receiver type has the literal syntax <code>*T</code> for some type <code>T</code>.


    (Also, <code>T</code> cannot itself be a pointer such as <code>*int</code>.)
  </p>
  

  
  <p>
    For example, the <code>Scale</code> method here is defined on <code>*Vertex</code>.
  </p>
  

  
  <p>
    Methods with pointer receivers can modify the value to which the receiver


    points (as <code>Scale</code> does here).


    Since methods often need to modify their receiver, pointer receivers are more


    common than value receivers.
  </p>
  

  
  <p>
    Try removing the <code>*</code> from the declaration of the <code>Scale</code> function on line 16


    and observe how the program&#39;s behavior changes.
  </p>
  

  
  <p>
    With a value receiver, the <code>Scale</code> method operates on a copy of the original


    <code>Vertex</code> value.


    (This is the same behavior as for any other function argument.)


    The <code>Scale</code> method must have a pointer receiver to change the <code>Vertex</code> value


    declared in the <code>main</code> function.
  </p>
  

	
		
	

`,s={book:n,chapter:e,chapterTitle:o,slug:"p4",title:t,headings:c,html:d,examples:r,original:a};export{n as book,e as chapter,o as chapterTitle,s as default,r as examples,c as headings,d as html,a as original,i as slug,t as title};
