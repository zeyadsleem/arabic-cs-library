const n="go-tour",e="methods",t="التوابع والواجهات",s="p14",o="الواجهة الفارغة",i=[{depth:2,id:"lesson-title",text:"الواجهة الفارغة"}],a=`
  <h2 id="lesson-title">الواجهة الفارغة</h2>
  
  
  <p>
    يُعرف نوع الواجهة الذي لا يحدّد أي توابع باسم <i>الواجهة الفارغة</i>:
  </p>
  

  
  <pre>interface{}</pre>
  

  
  <p>
    يمكن للواجهة الفارغة أن تحتوي على قيم من أي نوع.


    (كل نوع ينفّذ صفرًا من التوابع على الأقل.)
  </p>
  

  
  <p>
    <code>any</code> اسم بديل لـ<code>interface{}</code>، وهما متكافئان تمامًا


    فيما بينهما.
  </p>
  

  
  <p>
    تستخدم الشيفرة التي تتعامل مع قيم مجهولة النوع الواجهات الفارغة.


    على سبيل المثال، تستقبل <code>fmt.Print</code> أي عدد من الوسائط من النوع <code>any</code>.
  </p>
  

	
		
	

`,c=[{Name:"empty-interface.go",Content:`package main

import "fmt"

func main() {
	var i interface{}
	describe(i)

	i = 42
	describe(i)

	i = "hello"
	describe(i)
}

func describe(i interface{}) {
	fmt.Printf("(%v, %T)\\n", i, i)
}
`}],p=`
  <h2>The empty interface</h2>
  
  
  <p>
    The interface type that specifies zero methods is known as the <i>empty interface</i>:
  </p>
  

  
  <pre>interface{}</pre>
  

  
  <p>
    An empty interface may hold values of any type.


    (Every type implements at least zero methods.)
  </p>
  

  
  <p>
    <code>any</code> is an alias for <code>interface{}</code>, and the two are completely


    equivalent.
  </p>
  

  
  <p>
    Empty interfaces are used by code that handles values of unknown type.


    For example, <code>fmt.Print</code> takes any number of arguments of type <code>any</code>.
  </p>
  

	
		
	

`,r={book:n,chapter:e,chapterTitle:t,slug:"p14",title:o,headings:i,html:a,examples:c,original:p};export{n as book,e as chapter,t as chapterTitle,r as default,c as examples,i as headings,a as html,p as original,s as slug,o as title};
