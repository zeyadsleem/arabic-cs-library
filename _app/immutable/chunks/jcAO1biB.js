const n="go-tour",t="methods",e="التوابع والواجهات",i="p7",r="التوابع والوصول غير المباشر عبر المؤشرات (2)",p=[{depth:2,id:"lesson-title",text:"التوابع والوصول غير المباشر عبر المؤشرات (2)"}],s=`
  <h2 id="lesson-title">التوابع والوصول غير المباشر عبر المؤشرات (2)</h2>
  
  
  <p>
    يحدث أمر مماثل في الاتجاه المعاكس.
  </p>
  

  
  <p>
    الدوال التي تستقبل وسيطًا قيميًا يجب أن تستقبل قيمة من ذلك النوع المحدّد:
  </p>
  

  
  <pre>var v Vertex
fmt.Println(AbsFunc(v))  // OK
fmt.Println(AbsFunc(&amp;v)) // Compile error!</pre>
  

  
  <p>
    بينما تستقبل التوابع ذات المستقبِلات القيمية إما قيمة أو مؤشرًا بوصفه


    المستقبِل عند استدعائها:
  </p>
  

  
  <pre>var v Vertex
fmt.Println(v.Abs()) // OK
p := &amp;v
fmt.Println(p.Abs()) // OK</pre>
  

  
  <p>
    في هذه الحالة، يُفسَّر استدعاء التابع <code>p.Abs()</code> على أنه <code>(*p).Abs()</code>.
  </p>
  

	
		
	

`,o=[{Name:"indirection-values.go",Content:`package main

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

func AbsFunc(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
	fmt.Println(AbsFunc(v))

	p := &Vertex{4, 3}
	fmt.Println(p.Abs())
	fmt.Println(AbsFunc(*p))
}
`}],a=`
  <h2>Methods and pointer indirection (2)</h2>
  
  
  <p>
    The equivalent thing happens in the reverse direction.
  </p>
  

  
  <p>
    Functions that take a value argument must take a value of that specific type:
  </p>
  

  
  <pre>var v Vertex
fmt.Println(AbsFunc(v))  // OK
fmt.Println(AbsFunc(&amp;v)) // Compile error!</pre>
  

  
  <p>
    while methods with value receivers take either a value or a pointer as the


    receiver when they are called:
  </p>
  

  
  <pre>var v Vertex
fmt.Println(v.Abs()) // OK
p := &amp;v
fmt.Println(p.Abs()) // OK</pre>
  

  
  <p>
    In this case, the method call <code>p.Abs()</code> is interpreted as <code>(*p).Abs()</code>.
  </p>
  

	
		
	

`,c={book:n,chapter:t,chapterTitle:e,slug:"p7",title:r,headings:p,html:s,examples:o,original:a};export{n as book,t as chapter,e as chapterTitle,c as default,o as examples,p as headings,s as html,a as original,i as slug,r as title};
