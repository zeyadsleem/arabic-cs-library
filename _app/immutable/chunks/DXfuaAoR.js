const n="go-tour",e="methods",t="التوابع والواجهات",i="p6",c="التوابع والوصول غير المباشر عبر المؤشرات",o=[{depth:2,id:"lesson-title",text:"التوابع والوصول غير المباشر عبر المؤشرات"}],a=`
  <h2 id="lesson-title">التوابع والوصول غير المباشر عبر المؤشرات</h2>
  
  
  <p>
    عند مقارنة البرنامجين السابقين، قد تلاحظ أن


    الدوال ذات الوسيط المؤشري يجب أن تستقبل مؤشرًا:
  </p>
  

  
  <pre>var v Vertex
ScaleFunc(v, 5)  // Compile error!
ScaleFunc(&amp;v, 5) // OK</pre>
  

  
  <p>
    بينما تستقبل التوابع ذات المستقبِلات المؤشرية إما قيمة أو مؤشرًا بوصفه


    المستقبِل عند استدعائها:
  </p>
  

  
  <pre>var v Vertex
v.Scale(5)  // OK
p := &amp;v
p.Scale(10) // OK</pre>
  

  
  <p>
    في التعليمة <code>v.Scale(5)</code>، رغم أن <code>v</code> قيمة وليست مؤشرًا،


    يُستدعى التابع ذو المستقبِل المؤشري تلقائيًا.


    أي إن غو، تيسيرًا للاستخدام، تفسّر التعليمة <code>v.Scale(5)</code> على أنها


    <code>(&amp;v).Scale(5)</code> لأن التابع <code>Scale</code> له مستقبِل مؤشري.
  </p>
  

	
		
	

`,r=[{Name:"indirection.go",Content:`package main

import "fmt"

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &Vertex{4, 3}
	p.Scale(3)
	ScaleFunc(p, 8)

	fmt.Println(v, p)
}
`}],p=`
  <h2>Methods and pointer indirection</h2>
  
  
  <p>
    Comparing the previous two programs, you might notice that


    functions with a pointer argument must take a pointer:
  </p>
  

  
  <pre>var v Vertex
ScaleFunc(v, 5)  // Compile error!
ScaleFunc(&amp;v, 5) // OK</pre>
  

  
  <p>
    while methods with pointer receivers take either a value or a pointer as the


    receiver when they are called:
  </p>
  

  
  <pre>var v Vertex
v.Scale(5)  // OK
p := &amp;v
p.Scale(10) // OK</pre>
  

  
  <p>
    For the statement <code>v.Scale(5)</code>, even though <code>v</code> is a value and not a pointer,


    the method with the pointer receiver is called automatically.


    That is, as a convenience, Go interprets the statement <code>v.Scale(5)</code> as


    <code>(&amp;v).Scale(5)</code> since the <code>Scale</code> method has a pointer receiver.
  </p>
  

	
		
	

`,l={book:n,chapter:e,chapterTitle:t,slug:"p6",title:c,headings:o,html:a,examples:r,original:p};export{n as book,e as chapter,t as chapterTitle,l as default,r as examples,o as headings,a as html,p as original,i as slug,c as title};
