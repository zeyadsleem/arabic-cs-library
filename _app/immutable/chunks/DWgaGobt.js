const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",d="p10",o="التصريحات المختصرة عن المتغيرات",c=[{depth:2,id:"lesson-title",text:"التصريحات المختصرة عن المتغيرات"}],a=`
  <h2 id="lesson-title">التصريحات المختصرة عن المتغيرات</h2>
  
  
  <p>
    داخل الدالة، يمكن استخدام تعليمة الإسناد المختصرة <code>:=</code> بدلًا من تصريح <code>var</code> ذي نوع ضمني.
  </p>
  

  
  <p>
    خارج الدالة، تبدأ كل تعليمة بكلمة محجوزة (<code>var</code>، <code>func</code>، وهكذا)، ولذلك لا تتوفر صيغة <code>:=</code>.
  </p>
  

	
		
	

`,s=[{Name:"short-variable-declarations.go",Content:`package main

import "fmt"

func main() {
	var i, j int = 1, 2
	k := 3
	c, python, java := true, false, "no!"

	fmt.Println(i, j, k, c, python, java)
}
`}],i=`
  <h2>Short variable declarations</h2>
  
  
  <p>
    Inside a function, the <code>:=</code> short assignment statement can be used in place of a <code>var</code> declaration with implicit type.
  </p>
  

  
  <p>
    Outside a function, every statement begins with a keyword (<code>var</code>, <code>func</code>, and so on) and so the <code>:=</code> construct is not available.
  </p>
  

	
		
	

`,r={book:n,chapter:t,chapterTitle:e,slug:"p10",title:o,headings:c,html:a,examples:s,original:i};export{n as book,t as chapter,e as chapterTitle,r as default,s as examples,c as headings,a as html,i as original,d as slug,o as title};
