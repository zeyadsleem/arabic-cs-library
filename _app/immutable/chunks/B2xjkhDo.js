const n="go-tour",r="methods",e="التوابع والواجهات",s="p19",t="الأخطاء",o=[{depth:2,id:"lesson-title",text:"الأخطاء"}],c=`
  <h2 id="lesson-title">الأخطاء</h2>
  
  
  <p>
    تعبّر برامج غو عن حالة الخطأ بقيم من النوع <code>error</code>.
  </p>
  

  
  <p>
    النوع <code>error</code> واجهة مدمجة تشبه <code>fmt.Stringer</code>:
  </p>
  

  
  <pre>type error interface {
    Error() string
}</pre>
  

  
  <p>
    (كما هو الحال مع <code>fmt.Stringer</code>، تبحث حزمة <code>fmt</code> عن واجهة <code>error</code> عند


    طباعة القيم.)
  </p>
  

  
  <p>
    غالبًا ما تُرجع الدوال قيمة من النوع <code>error</code>، وينبغي للشيفرة التي تستدعيها معالجة الأخطاء


    باختبار ما إذا كان الخطأ يساوي <code>nil</code>.
  </p>
  

  
  <pre>i, err := strconv.Atoi(&#34;42&#34;)
if err != nil {
    fmt.Printf(&#34;couldn&#39;t convert number: %v\\n&#34;, err)
    return
}
fmt.Println(&#34;Converted integer:&#34;, i)</pre>
  

  
  <p>
    تدلّ قيمة <code>error</code> المعدومة على النجاح؛ وتدلّ قيمة <code>error</code> غير المعدومة على الفشل.
  </p>
  

	
		
	

`,i=[{Name:"errors.go",Content:`package main

import (
	"fmt"
	"time"
)

type MyError struct {
	When time.Time
	What string
}

func (e *MyError) Error() string {
	return fmt.Sprintf("at %v, %s",
		e.When, e.What)
}

func run() error {
	return &MyError{
		time.Now(),
		"it didn't work",
	}
}

func main() {
	if err := run(); err != nil {
		fmt.Println(err)
	}
}
`}],d=`
  <h2>Errors</h2>
  
  
  <p>
    Go programs express error state with <code>error</code> values.
  </p>
  

  
  <p>
    The <code>error</code> type is a built-in interface similar to <code>fmt.Stringer</code>:
  </p>
  

  
  <pre>type error interface {
    Error() string
}</pre>
  

  
  <p>
    (As with <code>fmt.Stringer</code>, the <code>fmt</code> package looks for the <code>error</code> interface when


    printing values.)
  </p>
  

  
  <p>
    Functions often return an <code>error</code> value, and calling code should handle errors


    by testing whether the error equals <code>nil</code>.
  </p>
  

  
  <pre>i, err := strconv.Atoi(&#34;42&#34;)
if err != nil {
    fmt.Printf(&#34;couldn&#39;t convert number: %v\\n&#34;, err)
    return
}
fmt.Println(&#34;Converted integer:&#34;, i)</pre>
  

  
  <p>
    A nil <code>error</code> denotes success; a non-nil <code>error</code> denotes failure.
  </p>
  

	
		
	

`,p={book:n,chapter:r,chapterTitle:e,slug:"p19",title:t,headings:o,html:c,examples:i,original:d};export{n as book,r as chapter,e as chapterTitle,p as default,i as examples,o as headings,c as html,d as original,s as slug,t as title};
