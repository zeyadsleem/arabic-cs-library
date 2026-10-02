const n="go-tour",e="methods",t="التوابع والواجهات",c="p21",r="القرّاء",o=[{depth:2,id:"lesson-title",text:"القرّاء"}],a=`
  <h2 id="lesson-title">القرّاء</h2>
  
  
  <p>
    تحدّد حزمة <code>io</code> واجهة <code>io.Reader</code>،


    التي تمثّل طرف القراءة لتدفّق من البيانات.
  </p>
  

  
  <p>
    تحتوي مكتبة غو القياسية على <a href="https://cs.opensource.google/search?q=Read%5C(%5Cw%2B%5Cs%5C%5B%5C%5Dbyte%5C)&ss=go%2Fgo" target="_blank" rel="noopener noreferrer">تنفيذات كثيرة</a> لهذه الواجهة، منها الملفات، واتصالات الشبكة، وأدوات الضغط، وأدوات التشفير، وغيرها.
  </p>
  

  
  <p>
    لواجهة <code>io.Reader</code> تابع <code>Read</code>:
  </p>
  

  
  <pre>func (T) Read(b []byte) (n int, err error)</pre>
  

  
  <p>
    <code>Read</code> يملأ شريحة البايتات المعطاة بالبيانات ويُرجع عدد البايتات


    التي مُلئت وقيمة خطأ. ويُرجع خطأ <code>io.EOF</code> عندما يصل التدفّق


    إلى نهايته.
  </p>
  

  
  <p>
    تنشئ شيفرة المثال قارئًا من النوع


    <a href="https://go.dev/pkg/strings/#Reader" target="_blank" rel="noopener noreferrer"><code>strings.Reader</code></a>


    وتستهلك خرجه بمقدار 8 بايتات في كل مرة.
  </p>
  

	
		
	

`,s=[{Name:"reader.go",Content:`package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\\n", n, err, b)
		fmt.Printf("b[:n] = %q\\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}
`}],d=`
  <h2>Readers</h2>
  
  
  <p>
    The <code>io</code> package specifies the <code>io.Reader</code> interface,


    which represents the read end of a stream of data.
  </p>
  

  
  <p>
    The Go standard library contains <a href="https://cs.opensource.google/search?q=Read%5C(%5Cw%2B%5Cs%5C%5B%5C%5Dbyte%5C)&ss=go%2Fgo" target="_blank" rel="noopener noreferrer">many implementations</a> of this interface, including files, network connections, compressors, ciphers, and others.
  </p>
  

  
  <p>
    The <code>io.Reader</code> interface has a <code>Read</code> method:
  </p>
  

  
  <pre>func (T) Read(b []byte) (n int, err error)</pre>
  

  
  <p>
    <code>Read</code> populates the given byte slice with data and returns the number of bytes


    populated and an error value. It returns an <code>io.EOF</code> error when the stream


    ends.
  </p>
  

  
  <p>
    The example code creates a


    <a href="https://go.dev/pkg/strings/#Reader" target="_blank" rel="noopener noreferrer"><code>strings.Reader</code></a>


    and consumes its output 8 bytes at a time.
  </p>
  

	
		
	

`,p={book:n,chapter:e,chapterTitle:t,slug:"p21",title:r,headings:o,html:a,examples:s,original:d};export{n as book,e as chapter,t as chapterTitle,p as default,s as examples,o as headings,a as html,d as original,c as slug,r as title};
