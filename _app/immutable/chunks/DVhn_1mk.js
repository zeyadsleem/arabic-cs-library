const n="go-tour",t="flowcontrol",e="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",h="p9",o="تعليمة switch",s=[{depth:2,id:"lesson-title",text:"تعليمة switch"}],i=`
  <h2 id="lesson-title">تعليمة switch</h2>
  
  
  <p>
    تعليمة <code>switch</code> طريقة أقصر لكتابة سلسلة من تعليمات <code>if - else</code>.


    وهي تُنفّذ أول حالة تساوي قيمتها قيمة تعبير الشرط.
  </p>
  

  
  <p>
    تعليمة switch في Go تشبه نظيرتها في C وC++ وJava وJavaScript وPHP،


    إلا أن Go تُنفّذ الحالة المختارة فقط، وليس جميع الحالات التي تليها.


    عمليًا، تُوفَّر تعليمة <code>break</code> اللازمة في نهاية كل حالة في تلك


    اللغات تلقائيًا في Go.


    ومن الفروق المهمة الأخرى أن حالات switch في Go لا يلزم أن


    تكون ثوابت، كما لا يلزم أن تكون القيم المعنية أعدادًا صحيحة.
  </p>
  

	
		
	

`,c=[{Name:"switch.go",Content:`package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("macOS.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\\n", os)
	}
}
`}],a=`
  <h2>Switch</h2>
  
  
  <p>
    A <code>switch</code> statement is a shorter way to write a sequence of <code>if - else</code> statements.


    It runs the first case whose value is equal to the condition expression.
  </p>
  

  
  <p>
    Go&#39;s switch is like the one in C, C++, Java, JavaScript, and PHP,


    except that Go only runs the selected case, not all the cases that follow.


    In effect, the <code>break</code> statement that is needed at the end of each case in those


    languages is provided automatically in Go.


    Another important difference is that Go&#39;s switch cases need not


    be constants, and the values involved need not be integers.
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:e,slug:"p9",title:o,headings:s,html:i,examples:c,original:a};export{n as book,t as chapter,e as chapterTitle,l as default,c as examples,s as headings,i as html,a as original,h as slug,o as title};
