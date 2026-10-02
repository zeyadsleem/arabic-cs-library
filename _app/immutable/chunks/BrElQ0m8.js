const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",l="p16",o="الثوابت العددية",i=[{depth:2,id:"lesson-title",text:"الثوابت العددية"}],s=`
  <h2 id="lesson-title">الثوابت العددية</h2>
  
  
  <p>
    الثوابت العددية هي <i>قيم</i> عالية الدقة.
  </p>
  

  
  <p>
    يأخذ الثابت غير محدد النوع النوع الذي يتطلبه سياقه.
  </p>
  

  
  <p>
    جرّب طباعة <code>needInt(Big)</code> أيضًا.
  </p>
  

  
  <p>
    (يمكن للنوع <code>int</code> تخزين عدد صحيح بحجم 64 بت كحد أقصى، وأحيانًا أقل من ذلك.)
  </p>
  

	
		
	

`,a=[{Name:"numeric-constants.go",Content:`package main

import "fmt"

const (
	// Create a huge number by shifting a 1 bit left 100 places.
	// In other words, the binary number that is 1 followed by 100 zeroes.
	Big = 1 << 100
	// Shift it right again 99 places, so we end up with 1<<1, or 2.
	Small = Big >> 99
)

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
	return x * 0.1
}

func main() {
	fmt.Println(needInt(Small))
	fmt.Println(needFloat(Small))
	fmt.Println(needFloat(Big))
}
`}],c=`
  <h2>Numeric Constants</h2>
  
  
  <p>
    Numeric constants are high-precision <i>values</i>.
  </p>
  

  
  <p>
    An untyped constant takes the type needed by its context.
  </p>
  

  
  <p>
    Try printing <code>needInt(Big)</code> too.
  </p>
  

  
  <p>
    (An <code>int</code> can store at maximum a 64-bit integer, and sometimes less.)
  </p>
  

	
		
	

`,r={book:n,chapter:t,chapterTitle:e,slug:"p16",title:o,headings:i,html:s,examples:a,original:c};export{n as book,t as chapter,e as chapterTitle,r as default,a as examples,i as headings,s as html,c as original,l as slug,o as title};
