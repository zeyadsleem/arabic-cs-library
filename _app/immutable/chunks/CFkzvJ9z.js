const n="go-tour",t="methods",e="التوابع والواجهات",r="p2",o="التوابع دوال",s=[{depth:2,id:"lesson-title",text:"التوابع دوال"}],c=`
  <h2 id="lesson-title">التوابع دوال</h2>
  
  
  <p>
    تذكّر: التابع ليس سوى دالة لها وسيط مستقبِل.
  </p>
  

  
  <p>
    إليك <code>Abs</code> مكتوبةً بوصفها دالة عادية دون أي تغيير في الوظيفة التي تؤديها.
  </p>
  

	
		
	

`,a=[{Name:"methods-funcs.go",Content:`package main

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

func main() {
	v := Vertex{3, 4}
	fmt.Println(Abs(v))
}
`}],i=`
  <h2>Methods are functions</h2>
  
  
  <p>
    Remember: a method is just a function with a receiver argument.
  </p>
  

  
  <p>
    Here&#39;s <code>Abs</code> written as a regular function with no change in functionality.
  </p>
  

	
		
	

`,h={book:n,chapter:t,chapterTitle:e,slug:"p2",title:o,headings:s,html:c,examples:a,original:i};export{n as book,t as chapter,e as chapterTitle,h as default,a as examples,s as headings,c as html,i as original,r as slug,o as title};
