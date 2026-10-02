const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",i="p4",o="الدوال",a=[{depth:2,id:"lesson-title",text:"الدوال"}],r=`
  <h2 id="lesson-title">الدوال</h2>
  
  
  <p>
    يمكن للدالة أن تستقبل صفرًا من المعاملات أو أكثر.
  </p>
  

  
  <p>
    في هذا المثال، تستقبل الدالة <code>add</code> معاملين من النوع <code>int</code>.
  </p>
  

  
  <p>
    لاحظ أن النوع يأتي <i>بعد</i> اسم المتغير.
  </p>
  

  
  <p>
    (لمزيد من المعلومات عن سبب كتابة الأنواع بهذه الطريقة، انظر <a href="https://go.dev/blog/gos-declaration-syntax" target="_blank" rel="noopener noreferrer">المقال عن صياغة التصريحات في Go</a>.)
  </p>
  

	
		
	

`,s=[{Name:"functions.go",Content:`package main

import "fmt"

func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
`}],c=`
  <h2>Functions</h2>
  
  
  <p>
    A function can take zero or more arguments.
  </p>
  

  
  <p>
    In this example, <code>add</code> takes two parameters of type <code>int</code>.
  </p>
  

  
  <p>
    Notice that the type comes <i>after</i> the variable name.
  </p>
  

  
  <p>
    (For more about why types look the way they do, see the <a href="https://go.dev/blog/gos-declaration-syntax" target="_blank" rel="noopener noreferrer">article on Go&#39;s declaration syntax</a>.)
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p4",title:o,headings:a,html:r,examples:s,original:c};export{n as book,t as chapter,e as chapterTitle,p as default,s as examples,a as headings,r as html,c as original,i as slug,o as title};
