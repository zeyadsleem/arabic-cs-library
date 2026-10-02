const e="go-tour",n="methods",o="التوابع والواجهات",p="p23",r="تمرين: قارئ روت 13",t=[{depth:2,id:"lesson-title",text:"تمرين: قارئ روت 13"}],a=`
  <h2 id="lesson-title">تمرين: قارئ روت 13</h2>
  
  
  <p>
    من الأنماط الشائعة <a href="https://go.dev/pkg/io/#Reader" target="_blank" rel="noopener noreferrer">قارئ الإدخال والإخراج</a> الذي يغلّف <code>io.Reader</code> آخر، ويعدّل التدفّق بطريقة ما.
  </p>
  

  
  <p>
    على سبيل المثال، تستقبل دالة <a href="https://go.dev/pkg/compress/gzip/#NewReader" target="_blank" rel="noopener noreferrer">إنشاء قارئ جي زيب</a> قارئًا <code>io.Reader</code> (تدفّقًا من البيانات المضغوطة) وتُرجع <code>*gzip.Reader</code> ينفّذ أيضًا <code>io.Reader</code> (تدفّقًا من البيانات بعد فكّ ضغطها).
  </p>
  

  
  <p>
    نفّذ <code>rot13Reader</code> ينفّذ <code>io.Reader</code> ويقرأ من <code>io.Reader</code>، مع تعديل التدفّق بتطبيق شيفرة الاستبدال <a href="https://en.wikipedia.org/wiki/ROT13" target="_blank" rel="noopener noreferrer">روت 13</a> على جميع المحارف الأبجدية.
  </p>
  

  
  <p>
    النوع <code>rot13Reader</code> متاح لك.


    اجعله ينفّذ <code>io.Reader</code> بتنفيذ تابعه <code>Read</code>.
  </p>
  

	
		
	

`,d=[{Name:"exercise-rot-reader.go",Content:`package main

import (
	"io"
	"os"
	"strings"
)

type rot13Reader struct {
	r io.Reader
}

func main() {
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)
}
`}],i=`
  <h2>Exercise: rot13Reader</h2>
  
  
  <p>
    A common pattern is an <a href="https://go.dev/pkg/io/#Reader" target="_blank" rel="noopener noreferrer">io.Reader</a> that wraps another <code>io.Reader</code>, modifying the stream in some way.
  </p>
  

  
  <p>
    For example, the <a href="https://go.dev/pkg/compress/gzip/#NewReader" target="_blank" rel="noopener noreferrer">gzip.NewReader</a> function takes an <code>io.Reader</code> (a stream of compressed data) and returns a <code>*gzip.Reader</code> that also implements <code>io.Reader</code> (a stream of the decompressed data).
  </p>
  

  
  <p>
    Implement a <code>rot13Reader</code> that implements <code>io.Reader</code> and reads from an <code>io.Reader</code>, modifying the stream by applying the <a href="https://en.wikipedia.org/wiki/ROT13" target="_blank" rel="noopener noreferrer">rot13</a> substitution cipher to all alphabetical characters.
  </p>
  

  
  <p>
    The <code>rot13Reader</code> type is provided for you.


    Make it an <code>io.Reader</code> by implementing its <code>Read</code> method.
  </p>
  

	
		
	

`,c={book:e,chapter:n,chapterTitle:o,slug:"p23",title:r,headings:t,html:a,examples:d,original:i};export{e as book,n as chapter,o as chapterTitle,c as default,d as examples,t as headings,a as html,i as original,p as slug,r as title};
