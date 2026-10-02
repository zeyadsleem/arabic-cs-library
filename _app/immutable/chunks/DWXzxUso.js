const n="go-tour",t="methods",e="التوابع والواجهات",d="p5",o="المؤشرات والدوال",c=[{depth:2,id:"lesson-title",text:"المؤشرات والدوال"}],s=`
  <h2 id="lesson-title">المؤشرات والدوال</h2>
  
  
  <p>
    نرى هنا التابعين <code>Abs</code> و<code>Scale</code> وقد أُعيدت كتابتهما بوصفهما دالتين.
  </p>
  

  
  <p>
    جرّب مجددًا إزالة <code>*</code> من السطر 16.


    هل يمكنك معرفة سبب تغيّر السلوك؟


    ما الذي احتجت أيضًا إلى تغييره كي ينجح تصريف المثال؟
  </p>
  

  
  <p>
    (إذا لم تكن متأكدًا، فانتقل إلى الصفحة التالية.)
  </p>
  

	
		
	

`,a=[{Name:"methods-pointers-explained.go",Content:`package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func Scale(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	Scale(&v, 10)
	fmt.Println(Abs(v))
}
`}],r=`
  <h2>Pointers and functions</h2>
  
  
  <p>
    Here we see the <code>Abs</code> and <code>Scale</code> methods rewritten as functions.
  </p>
  

  
  <p>
    Again, try removing the <code>*</code> from line 16.


    Can you see why the behavior changes?


    What else did you need to change for the example to compile?
  </p>
  

  
  <p>
    (If you&#39;re not sure, continue to the next page.)
  </p>
  

	
		
	

`,i={book:n,chapter:t,chapterTitle:e,slug:"p5",title:o,headings:c,html:s,examples:a,original:r};export{n as book,t as chapter,e as chapterTitle,i as default,a as examples,c as headings,s as html,r as original,d as slug,o as title};
