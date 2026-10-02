const n="go-tour",t="flowcontrol",o="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",r="p4",e="إلى الأبد",s=[{depth:2,id:"lesson-title",text:"إلى الأبد"}],i=`
  <h2 id="lesson-title">إلى الأبد</h2>
  
  
  <p>
    إذا حذفت شرط الحلقة، فإنها تتكرر إلى الأبد، وبذلك يُعبَّر عن الحلقة اللانهائية بصيغة موجزة.
  </p>
  

	
		
	

`,l=[{Name:"forever.go",Content:`package main

func main() {
	for {
	}
}
`}],c=`
  <h2>Forever</h2>
  
  
  <p>
    If you omit the loop condition it loops forever, so an infinite loop is compactly expressed.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:o,slug:"p4",title:e,headings:s,html:i,examples:l,original:c};export{n as book,t as chapter,o as chapterTitle,p as default,l as examples,s as headings,i as html,c as original,r as slug,e as title};
