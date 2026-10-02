const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",i="p7",s="قيم الإرجاع المسمّاة",o=[{depth:2,id:"lesson-title",text:"قيم الإرجاع المسمّاة"}],a=`
  <h2 id="lesson-title">قيم الإرجاع المسمّاة</h2>
  
  
  <p>
    يمكن تسمية قيم الإرجاع في Go. وفي هذه الحالة، تُعامل كمتغيرات معرّفة في بداية الدالة.
  </p>
  

  
  <p>
    ينبغي استخدام هذه الأسماء لتوثيق معنى قيم الإرجاع.
  </p>
  

  
  <p>
    تُرجع تعليمة <code>return</code> التي لا تتضمن معاملات قيم الإرجاع المسمّاة. ويُعرف هذا بالإرجاع &#34;المجرّد&#34;.
  </p>
  

  
  <p>
    ينبغي استخدام تعليمات الإرجاع المجرّد في الدوال القصيرة فقط، كما في المثال المعروض هنا. فقد تجعل الشيفرة أقل قابلية للقراءة في الدوال الأطول.
  </p>
  

	
		
	

`,r=[{Name:"named-results.go",Content:`package main

import "fmt"

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func main() {
	fmt.Println(split(17))
}
`}],u=`
  <h2>Named return values</h2>
  
  
  <p>
    Go&#39;s return values may be named. If so, they are treated as variables defined at the top of the function.
  </p>
  

  
  <p>
    These names should be used to document the meaning of the return values.
  </p>
  

  
  <p>
    A <code>return</code> statement without arguments returns the named return values. This is known as a &#34;naked&#34; return.
  </p>
  

  
  <p>
    Naked return statements should be used only in short functions, as with the example shown here. They can harm readability in longer functions.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p7",title:s,headings:o,html:a,examples:r,original:u};export{n as book,t as chapter,e as chapterTitle,p as default,r as examples,o as headings,a as html,u as original,i as slug,s as title};
