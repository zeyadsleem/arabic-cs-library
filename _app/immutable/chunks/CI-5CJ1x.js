const n="go-tour",e="methods",t="التوابع والواجهات",s="p15",o="تأكيدات النوع",c=[{depth:2,id:"lesson-title",text:"تأكيدات النوع"}],d=`
  <h2 id="lesson-title">تأكيدات النوع</h2>
  
  
  <p>
    يتيح <i>تأكيد النوع</i> الوصول إلى القيمة الفعلية الكامنة في قيمة الواجهة.
  </p>
  

  
  <pre>t := i.(T)</pre>
  

  
  <p>
    تؤكّد هذه التعليمة أن قيمة الواجهة <code>i</code> تحتوي على النوع الفعلي <code>T</code>


    وتسند القيمة الكامنة من النوع <code>T</code> إلى المتغيّر <code>t</code>.
  </p>
  

  
  <p>
    إذا لم تكن <code>i</code> تحتوي على قيمة من النوع <code>T</code>، فستؤدي التعليمة إلى حالة ذعر.
  </p>
  

  
  <p>
    من أجل <i>اختبار</i> ما إذا كانت قيمة واجهة تحتوي على نوع محدّد،


    يمكن لتأكيد النوع إرجاع قيمتين: القيمة الكامنة


    وقيمة منطقية تبيّن ما إذا كان التأكيد قد نجح.
  </p>
  

  
  <pre>t, ok := i.(T)</pre>
  

  
  <p>
    إذا كانت <code>i</code> تحتوي على قيمة من النوع <code>T</code>، فستكون <code>t</code> القيمة الكامنة وستكون <code>ok</code> صائبة.
  </p>
  

  
  <p>
    وإلا، فستكون <code>ok</code> خاطئة وستكون <code>t</code> القيمة الصفرية للنوع <code>T</code>،


    ولن تحدث حالة ذعر.
  </p>
  

  
  <p>
    لاحظ التشابه بين هذه الصيغة وصيغة القراءة من خريطة.
  </p>
  

	
		
	

`,i=[{Name:"type-assertions.go",Content:`package main

import "fmt"

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s)

	s, ok := i.(string)
	fmt.Println(s, ok)

	f, ok := i.(float64)
	fmt.Println(f, ok)

	f = i.(float64) // panic
	fmt.Println(f)
}
`}],a=`
  <h2>Type assertions</h2>
  
  
  <p>
    A <i>type assertion</i> provides access to an interface value&#39;s underlying concrete value.
  </p>
  

  
  <pre>t := i.(T)</pre>
  

  
  <p>
    This statement asserts that the interface value <code>i</code> holds the concrete type <code>T</code>


    and assigns the underlying <code>T</code> value to the variable <code>t</code>.
  </p>
  

  
  <p>
    If <code>i</code> does not hold a <code>T</code>, the statement will trigger a panic.
  </p>
  

  
  <p>
    To <i>test</i> whether an interface value holds a specific type,


    a type assertion can return two values: the underlying value


    and a boolean value that reports whether the assertion succeeded.
  </p>
  

  
  <pre>t, ok := i.(T)</pre>
  

  
  <p>
    If <code>i</code> holds a <code>T</code>, then <code>t</code> will be the underlying value and <code>ok</code> will be true.
  </p>
  

  
  <p>
    If not, <code>ok</code> will be false and <code>t</code> will be the zero value of type <code>T</code>,


    and no panic occurs.
  </p>
  

  
  <p>
    Note the similarity between this syntax and that of reading from a map.
  </p>
  

	
		
	

`,p={book:n,chapter:e,chapterTitle:t,slug:"p15",title:o,headings:c,html:d,examples:i,original:a};export{n as book,e as chapter,t as chapterTitle,p as default,i as examples,c as headings,d as html,a as original,s as slug,o as title};
