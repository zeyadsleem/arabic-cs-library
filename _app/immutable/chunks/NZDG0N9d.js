const n="go-tour",e="concurrency",o="التزامن",r="p4",t="التكرار والإغلاق",c=[{depth:2,id:"lesson-title",text:"التكرار والإغلاق"}],a=`
  <h2 id="lesson-title">التكرار والإغلاق</h2>
  
  
  <p>
    يمكن للمرسِل إغلاق قناة باستخدام <code>close</code> للإشارة إلى أنه لن تُرسل قيم أخرى. ويمكن للمستقبِلين التحقق مما إذا كانت القناة قد أُغلقت بإسناد معامل ثانٍ إلى تعبير الاستقبال: بعد
  </p>
  

  
  <pre>v, ok := &lt;-ch</pre>
  

  
  <p>
    <code>ok</code> تكون قيمته <code>false</code> إذا لم تعد هناك قيم لاستقبالها وكانت القناة مغلقة.
  </p>
  

  
  <p>
    تستقبل الحلقة <code>for i := range c</code> القيم من القناة مرارًا حتى تُغلق.
  </p>
  

  
  <p>
    <b>ملاحظة:</b> ينبغي أن يغلق القناة المرسِل وحده، لا المستقبِل أبدًا. سيؤدي الإرسال إلى قناة مغلقة إلى حالة هلع.
  </p>
  

  
  <p>
    <b>ملاحظة أخرى:</b> القنوات ليست كالملفات؛ لا تحتاج عادةً إلى إغلاقها. لا يكون الإغلاق ضروريًا إلا حين يجب إبلاغ المستقبِل بأنه لن تصل قيم أخرى، مثل إنهاء حلقة <code>range</code>.
  </p>
  

	
		
	

`,s=[{Name:"range-and-close.go",Content:`package main

import (
	"fmt"
)

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}
`}],l=`
  <h2>Range and Close</h2>
  
  
  <p>
    A sender can <code>close</code> a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression: after
  </p>
  

  
  <pre>v, ok := &lt;-ch</pre>
  

  
  <p>
    <code>ok</code> is <code>false</code> if there are no more values to receive and the channel is closed.
  </p>
  

  
  <p>
    The loop <code>for i := range c</code> receives values from the channel repeatedly until it is closed.
  </p>
  

  
  <p>
    <b>Note:</b> Only the sender should close a channel, never the receiver. Sending on a closed channel will cause a panic.
  </p>
  

  
  <p>
    <b>Another note:</b> Channels aren&#39;t like files; you don&#39;t usually need to close them. Closing is only necessary when the receiver must be told there are no more values coming, such as to terminate a <code>range</code> loop.
  </p>
  

	
		
	

`,i={book:n,chapter:e,chapterTitle:o,slug:"p4",title:t,headings:c,html:a,examples:s,original:l};export{n as book,e as chapter,o as chapterTitle,i as default,s as examples,c as headings,a as html,l as original,r as slug,t as title};
