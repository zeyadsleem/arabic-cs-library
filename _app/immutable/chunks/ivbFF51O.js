const n="go-tour",e="methods",t="التوابع والواجهات",s="p22",o="تمرين: القرّاء",a=[{depth:2,id:"lesson-title",text:"تمرين: القرّاء"}],r=`
  <h2 id="lesson-title">تمرين: القرّاء</h2>
  
  
  <p>
    نفّذ نوعًا <code>Reader</code> يُنتج تدفّقًا لا نهائيًا من محرف أسكي


    <code>&#39;A&#39;</code>.
  </p>
  

	
		
	

`,d=[{Name:"exercise-reader.go",Content:`package main

import "golang.org/x/tour/reader"

type MyReader struct{}

// TODO: Add a Read([]byte) (int, error) method to MyReader.

func main() {
	reader.Validate(MyReader{})
}
`}],c=`
  <h2>Exercise: Readers</h2>
  
  
  <p>
    Implement a <code>Reader</code> type that emits an infinite stream of the ASCII character


    <code>&#39;A&#39;</code>.
  </p>
  

	
		
	

`,i={book:n,chapter:e,chapterTitle:t,slug:"p22",title:o,headings:a,html:r,examples:d,original:c};export{n as book,e as chapter,t as chapterTitle,i as default,d as examples,a as headings,r as html,c as original,s as slug,o as title};
