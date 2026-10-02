const n="go-tour",e="concurrency",t="التزامن",u="p9",o="التنافي المتبادل (sync.Mutex)",c=[{depth:2,id:"lesson-title",text:"التنافي المتبادل (sync.Mutex)"}],a=`
  <h2 id="lesson-title">التنافي المتبادل (sync.Mutex)</h2>
  
  
  <p>
    رأينا كيف تُعدّ القنوات وسيلة رائعة للاتصال بين مسارات التنفيذ الخفيفة.
  </p>
  

  
  <p>
    لكن ماذا لو لم نحتج إلى الاتصال؟ ماذا لو أردنا فقط التأكد من أن


    مسار تنفيذ خفيفًا واحدًا فقط يمكنه الوصول إلى متغير في كل مرة لتجنب التعارضات؟
  </p>
  

  
  <p>
    يُسمّى هذا المفهوم <i>التنافي المتبادل</i>، والاسم المتعارف عليه لبنية البيانات التي توفره هو <i>قفل التنافي المتبادل</i>.
  </p>
  

  
  <p>
    توفر مكتبة Go القياسية التنافي المتبادل باستخدام


    <a href="https://go.dev/pkg/sync/#Mutex" target="_blank" rel="noopener noreferrer"><code>sync.Mutex</code></a> وطريقتيه:
  </p>
  

  <ul>
  
    <li><code>Lock</code></li>
  
    <li><code>Unlock</code></li>
  
  </ul>

  
  <p>
    يمكننا تحديد كتلة من الشيفرة لتُنفّذ في ظل التنافي المتبادل بإحاطتها


    باستدعاءَي <code>Lock</code> و<code>Unlock</code> كما هو موضح في الطريقة <code>Inc</code>.
  </p>
  

  
  <p>
    يمكننا أيضًا استخدام <code>defer</code> لضمان تحرير قفل التنافي المتبادل كما في الطريقة <code>Value</code>.
  </p>
  

	
		
	

`,i=[{Name:"mutex-counter.go",Content:`package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mu.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mu.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
`}],s=`
  <h2>sync.Mutex</h2>
  
  
  <p>
    We&#39;ve seen how channels are great for communication among goroutines.
  </p>
  

  
  <p>
    But what if we don&#39;t need communication? What if we just want to make sure only


    one goroutine can access a variable at a time to avoid conflicts?
  </p>
  

  
  <p>
    This concept is called <i>mutual exclusion</i>, and the conventional name for the data structure that provides it is <i>mutex</i>.
  </p>
  

  
  <p>
    Go&#39;s standard library provides mutual exclusion with


    <a href="https://go.dev/pkg/sync/#Mutex" target="_blank" rel="noopener noreferrer"><code>sync.Mutex</code></a> and its two methods:
  </p>
  

  <ul>
  
    <li><code>Lock</code></li>
  
    <li><code>Unlock</code></li>
  
  </ul>

  
  <p>
    We can define a block of code to be executed in mutual exclusion by surrounding it


    with a call to <code>Lock</code> and <code>Unlock</code> as shown on the <code>Inc</code> method.
  </p>
  

  
  <p>
    We can also use <code>defer</code> to ensure the mutex will be unlocked as in the <code>Value</code> method.
  </p>
  

	
		
	

`,r={book:n,chapter:e,chapterTitle:t,slug:"p9",title:o,headings:c,html:a,examples:i,original:s};export{n as book,e as chapter,t as chapterTitle,r as default,i as examples,c as headings,a as html,s as original,u as slug,o as title};
