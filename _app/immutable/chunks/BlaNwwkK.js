const n="go-tour",t="methods",e="التوابع والواجهات",i="p18",o="تمرين: أنواع التمثيل النصي",d=[{depth:2,id:"lesson-title",text:"تمرين: أنواع التمثيل النصي"}],s=`
  <h2 id="lesson-title">تمرين: أنواع التمثيل النصي</h2>
  
  
  <p>
    اجعل النوع <code>IPAddr</code> ينفّذ <code>fmt.Stringer</code> لطباعة العنوان على هيئة


    أربعة أعداد تفصل بينها نقاط.
  </p>
  

  
  <p>
    على سبيل المثال، ينبغي أن تُطبَع <code>IPAddr{1, 2, 3, 4}</code> على هيئة <code>&#34;1.2.3.4&#34;</code>.
  </p>
  

	
		
	

`,c=[{Name:"exercise-stringer.go",Content:`package main

import "fmt"

type IPAddr [4]byte

// TODO: Add a "String() string" method to IPAddr.

func main() {
	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\\n", name, ip)
	}
}
`}],r=`
  <h2>Exercise: Stringers</h2>
  
  
  <p>
    Make the <code>IPAddr</code> type implement <code>fmt.Stringer</code> to print the address as


    a dotted quad.
  </p>
  

  
  <p>
    For instance, <code>IPAddr{1, 2, 3, 4}</code> should print as <code>&#34;1.2.3.4&#34;</code>.
  </p>
  

	
		
	

`,a={book:n,chapter:t,chapterTitle:e,slug:"p18",title:o,headings:d,html:s,examples:c,original:r};export{n as book,t as chapter,e as chapterTitle,a as default,c as examples,d as headings,s as html,r as original,i as slug,o as title};
