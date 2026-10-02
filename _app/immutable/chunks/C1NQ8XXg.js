const n="go-tour",e="methods",r="التوابع والواجهات",i="p20",o="تمرين: الأخطاء",t=[{depth:2,id:"lesson-title",text:"تمرين: الأخطاء"}],c=`
  <h2 id="lesson-title">تمرين: الأخطاء</h2>
  
  
  <p>
    انسخ دالتك <code>Sqrt</code> من <a href="/arabic-cs-library/book/go-tour/flowcontrol/p8/">التمرين السابق</a> وعدّلها لتُرجع قيمة من النوع <code>error</code>.
  </p>
  

  
  <p>
    <code>Sqrt</code> ينبغي أن تُرجع قيمة خطأ غير معدومة عند إعطائها عددًا سالبًا، لأنها لا تدعم الأعداد المركّبة.
  </p>
  

  
  <p>
    أنشئ نوعًا جديدًا
  </p>
  

  
  <pre>type ErrNegativeSqrt float64</pre>
  

  
  <p>
    واجعله ينفّذ <code>error</code> بإعطائه
  </p>
  

  
  <pre>func (e ErrNegativeSqrt) Error() string</pre>
  

  
  <p>
    تابعًا بحيث يُرجع <code>ErrNegativeSqrt(-2).Error()</code> القيمة <code>&#34;cannot Sqrt negative number: -2&#34;</code>.
  </p>
  

  
  <p>
    <b>ملاحظة:</b> سيؤدي استدعاء <code>fmt.Sprint(e)</code> داخل التابع <code>Error</code> إلى دخول البرنامج في حلقة لا نهائية. يمكنك تجنّب ذلك بتحويل <code>e</code> أولًا: <code>fmt.Sprint(float64(e))</code>. لماذا؟
  </p>
  

  
  <p>
    غيّر دالتك <code>Sqrt</code> لتُرجع قيمة من النوع <code>ErrNegativeSqrt</code> عند إعطائها عددًا سالبًا.
  </p>
  

	
		
	

`,a=[{Name:"exercise-errors.go",Content:`package main

import (
	"fmt"
)

func Sqrt(x float64) (float64, error) {
	return 0, nil
}

func main() {
	fmt.Println(Sqrt(2))
	fmt.Println(Sqrt(-2))
}
`}],d=`
  <h2>Exercise: Errors</h2>
  
  
  <p>
    Copy your <code>Sqrt</code> function from the <a href="/arabic-cs-library/book/go-tour/flowcontrol/p8/">earlier exercise</a> and modify it to return an <code>error</code> value.
  </p>
  

  
  <p>
    <code>Sqrt</code> should return a non-nil error value when given a negative number, as it doesn&#39;t support complex numbers.
  </p>
  

  
  <p>
    Create a new type
  </p>
  

  
  <pre>type ErrNegativeSqrt float64</pre>
  

  
  <p>
    and make it an <code>error</code> by giving it a
  </p>
  

  
  <pre>func (e ErrNegativeSqrt) Error() string</pre>
  

  
  <p>
    method such that <code>ErrNegativeSqrt(-2).Error()</code> returns <code>&#34;cannot Sqrt negative number: -2&#34;</code>.
  </p>
  

  
  <p>
    <b>Note:</b> A call to <code>fmt.Sprint(e)</code> inside the <code>Error</code> method will send the program into an infinite loop. You can avoid this by converting <code>e</code> first: <code>fmt.Sprint(float64(e))</code>. Why?
  </p>
  

  
  <p>
    Change your <code>Sqrt</code> function to return an <code>ErrNegativeSqrt</code> value when given a negative number.
  </p>
  

	
		
	

`,p={book:n,chapter:e,chapterTitle:r,slug:"p20",title:o,headings:t,html:c,examples:a,original:d};export{n as book,e as chapter,r as chapterTitle,p as default,a as examples,t as headings,c as html,d as original,i as slug,o as title};
