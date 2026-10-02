const n="go-tour",o="flowcontrol",t="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",r="p3",e="for هي «while» في Go",s=[{depth:2,id:"lesson-title",text:"for هي «while» في Go"}],i=`
  <h2 id="lesson-title">for هي «while» في Go</h2>
  
  
  <p>
    عندئذ يمكنك حذف الفواصل المنقوطة: تُكتب <code>while</code> في لغة C بصيغة <code>for</code> في Go.
  </p>
  

	
		
	

`,l=[{Name:"for-is-gos-while.go",Content:`package main

import "fmt"

func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}
`}],c=`
  <h2>For is Go&#39;s &#34;while&#34;</h2>
  
  
  <p>
    At that point you can drop the semicolons: C&#39;s <code>while</code> is spelled <code>for</code> in Go.
  </p>
  

	
		
	

`,h={book:n,chapter:o,chapterTitle:t,slug:"p3",title:e,headings:s,html:i,examples:l,original:c};export{n as book,o as chapter,t as chapterTitle,h as default,l as examples,s as headings,i as html,c as original,r as slug,e as title};
