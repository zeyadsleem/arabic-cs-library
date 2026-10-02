const n="go-tour",e="flowcontrol",o="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",t="index",i="حلقة for",a=[{depth:2,id:"lesson-title",text:"حلقة for"}],c=`
  <h2 id="lesson-title">حلقة for</h2>
  
  
  <p>
    لا تتضمن Go سوى بنية واحدة للحلقات، وهي حلقة <code>for</code>.
  </p>
  

  
  <p>
    تتكون حلقة <code>for</code> الأساسية من ثلاثة مكونات تفصل بينها فواصل منقوطة:
  </p>
  

  <ul>
  
    <li>تعليمة التهيئة: تُنفَّذ قبل التكرار الأول</li>
  
    <li>تعبير الشرط: يُقيَّم قبل كل تكرار</li>
  
    <li>التعليمة اللاحقة: تُنفَّذ في نهاية كل تكرار</li>
  
  </ul>

  
  <p>
    غالبًا ما تكون تعليمة التهيئة تصريحًا عن متغير، ولا تكون


    المتغيرات المُصرَّح عنها هناك مرئية إلا ضمن نطاق تعليمة <code>for</code>


    وحدها.
  </p>
  

  
  <p>
    تتوقف الحلقة عن التكرار بمجرد أن تصبح قيمة الشرط المنطقي <code>false</code>.
  </p>
  

  
  <p>
    <b>ملاحظة:</b> على خلاف لغات أخرى مثل C أو Java أو JavaScript، لا توجد أقواس مستديرة


    تحيط بالمكونات الثلاثة لتعليمة <code>for</code>، أما الأقواس المعقوفة <code>{ }</code> فهي


    مطلوبة دائمًا.
  </p>
  

	
		
	

`,l=[{Name:"for.go",Content:`package main

import "fmt"

func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
`}],r=`
  <h2>For</h2>
  
  
  <p>
    Go has only one looping construct, the <code>for</code> loop.
  </p>
  

  
  <p>
    The basic <code>for</code> loop has three components separated by semicolons:
  </p>
  

  <ul>
  
    <li>the init statement: executed before the first iteration</li>
  
    <li>the condition expression: evaluated before every iteration</li>
  
    <li>the post statement: executed at the end of every iteration</li>
  
  </ul>

  
  <p>
    The init statement will often be a variable declaration, and the


    variables declared there are visible only in the scope of the <code>for</code>


    statement.
  </p>
  

  
  <p>
    The loop will stop iterating once the boolean condition evaluates to <code>false</code>.
  </p>
  

  
  <p>
    <b>Note:</b> Unlike other languages like C, Java, or JavaScript there are no parentheses


    surrounding the three components of the <code>for</code> statement and the braces <code>{ }</code> are


    always required.
  </p>
  

	
		
	

`,s={book:n,chapter:e,chapterTitle:o,slug:t,title:i,headings:a,html:c,examples:l,original:r};export{n as book,e as chapter,o as chapterTitle,s as default,l as examples,a as headings,c as html,r as original,t as slug,i as title};
