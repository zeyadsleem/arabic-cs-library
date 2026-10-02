const n="go-tour",t="basics",o="الحزم والمتغيرات والدوال",r="p2",e="الاستيراد",p=[{depth:2,id:"lesson-title",text:"الاستيراد"}],s=`
  <h2 id="lesson-title">الاستيراد</h2>
  
  
  <p>
    تجمع هذه الشيفرة عمليات الاستيراد في تعليمة استيراد &#34;مجمّعة&#34; بين قوسين.
  </p>
  

  
  <p>
    يمكنك أيضًا كتابة عدة تعليمات استيراد، مثل:
  </p>
  

  
  <pre>import &#34;fmt&#34;
import &#34;math&#34;</pre>
  

  
  <p>
    لكن استخدام تعليمة الاستيراد المجمّعة يُعدّ أسلوبًا جيدًا في كتابة الشيفرة.
  </p>
  

	
		
	

`,i=[{Name:"imports.go",Content:`package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Printf("Now you have %g problems.\\n", math.Sqrt(7))
}
`}],m=`
  <h2>Imports</h2>
  
  
  <p>
    This code groups the imports into a parenthesized, &#34;factored&#34; import statement.
  </p>
  

  
  <p>
    You can also write multiple import statements, like:
  </p>
  

  
  <pre>import &#34;fmt&#34;
import &#34;math&#34;</pre>
  

  
  <p>
    But it is good style to use the factored import statement.
  </p>
  

	
		
	

`,a={book:n,chapter:t,chapterTitle:o,slug:"p2",title:e,headings:p,html:s,examples:i,original:m};export{n as book,t as chapter,o as chapterTitle,a as default,i as examples,p as headings,s as html,m as original,r as slug,e as title};
