const n="go-tour",e="welcome",t="مرحبًا!",i="p4",o="ساحة تجارب Go",r=[{depth:2,id:"lesson-title",text:"ساحة تجارب Go"}],a=`
  <h2 id="lesson-title">ساحة تجارب Go</h2>
  
  
  <p>
    بُنيت هذه الجولة على <a href="https://play.golang.org/" target="_blank" rel="noopener noreferrer">ساحة تجارب Go</a>، وهي


    خدمة ويب تعمل على خوادم <a href="https://go.dev/" target="_blank" rel="noopener noreferrer">golang.org</a>.
  </p>
  

  
  <p>
    تستقبل الخدمة برنامجًا بلغة Go، وتترجمه وتربطه وتشغّله داخل


    بيئة معزولة، ثم تُعيد المخرجات.
  </p>
  

  
  <p>
    توجد قيود على البرامج التي يمكن تشغيلها في ساحة التجارب:
  </p>
  

  <ul>
  
    <li>يبدأ الوقت في ساحة التجارب عند 2009-11-10 23:00:00 UTC (تحديد دلالة هذا التاريخ تمرين للقارئ). وهذا يسهّل تخزين البرامج مؤقتًا بمنحها مخرجات حتمية.</li>
  
  </ul>

  <ul>
  
    <li>توجد أيضًا حدود لوقت التنفيذ ولاستخدام وحدة المعالجة المركزية والذاكرة، ولا يمكن للبرنامج الوصول إلى مضيفي الشبكة الخارجيين.</li>
  
  </ul>

  
  <p>
    تستخدم ساحة التجارب أحدث إصدار مستقر من Go.
  </p>
  

  
  <p>
    اقرأ &#34;<a href="https://go.dev/blog/playground" target="_blank" rel="noopener noreferrer">داخل ساحة تجارب Go</a>&#34; لمعرفة المزيد.
  </p>
  

	
		
	

`,l=[{Name:"sandbox.go",Content:`package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Welcome to the playground!")

	fmt.Println("The time is", time.Now())
}
`}],s=`
  <h2>The Go Playground</h2>
  
  
  <p>
    This tour is built atop the <a href="https://play.golang.org/" target="_blank" rel="noopener noreferrer">Go Playground</a>, a


    web service that runs on <a href="https://go.dev/" target="_blank" rel="noopener noreferrer">golang.org</a>&#39;s servers.
  </p>
  

  
  <p>
    The service receives a Go program, compiles, links, and runs the program inside


    a sandbox, then returns the output.
  </p>
  

  
  <p>
    There are limitations to the programs that can be run in the playground:
  </p>
  

  <ul>
  
    <li>In the playground the time begins at 2009-11-10 23:00:00 UTC (determining the significance of this date is an exercise for the reader). This makes it easier to cache programs by giving them deterministic output.</li>
  
  </ul>

  <ul>
  
    <li>There are also limits on execution time and on CPU and memory usage, and the program cannot access external network hosts.</li>
  
  </ul>

  
  <p>
    The playground uses the latest stable release of Go.
  </p>
  

  
  <p>
    Read &#34;<a href="https://go.dev/blog/playground" target="_blank" rel="noopener noreferrer">Inside the Go Playground</a>&#34; to learn more.
  </p>
  

	
		
	

`,p={book:n,chapter:e,chapterTitle:t,slug:"p4",title:o,headings:r,html:a,examples:l,original:s};export{n as book,e as chapter,t as chapterTitle,p as default,l as examples,r as headings,a as html,s as original,i as slug,o as title};
