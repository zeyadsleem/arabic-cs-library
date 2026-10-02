const t="go-tour",n="concurrency",e="التزامن",c="p10",r="تمرين: زاحف الويب",o=[{depth:2,id:"lesson-title",text:"تمرين: زاحف الويب"}],s=`
  <h2 id="lesson-title">تمرين: زاحف الويب</h2>
  
  
  <p>
    ستستخدم في هذا التمرين ميزات التزامن في Go لجعل زاحف ويب يعمل بالتوازي.
  </p>
  

  
  <p>
    عدّل الدالة <code>Crawl</code> لجلب عناوين URL بالتوازي دون جلب عنوان URL نفسه مرتين.
  </p>
  

  
  <p>
    <i>تلميح</i>: يمكنك الاحتفاظ بمخزن مؤقت لعناوين URL التي جرى جلبها في خريطة، لكن الخرائط وحدها ليست


    آمنة للاستخدام المتزامن!
  </p>
  

	
		
	

`,a=[{Name:"exercise-web-crawler.go",Content:`package main

import (
	"fmt"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func Crawl(url string, depth int, fetcher Fetcher) {
	// TODO: Fetch URLs in parallel.
	// TODO: Don't fetch the same URL twice.
	// This implementation doesn't do either:
	if depth <= 0 {
		return
	}
	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\\n", url, body)
	for _, u := range urls {
		Crawl(u, depth-1, fetcher)
	}
	return
}

func main() {
	Crawl("https://golang.org/", 4, fetcher)
}

// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
`}],g=`
  <h2>Exercise: Web Crawler</h2>
  
  
  <p>
    In this exercise you&#39;ll use Go&#39;s concurrency features to parallelize a web crawler.
  </p>
  

  
  <p>
    Modify the <code>Crawl</code> function to fetch URLs in parallel without fetching the same URL twice.
  </p>
  

  
  <p>
    <i>Hint</i>: you can keep a cache of the URLs that have been fetched on a map, but maps alone are not


    safe for concurrent use!
  </p>
  

	
		
	

`,l={book:t,chapter:n,chapterTitle:e,slug:"p10",title:r,headings:o,html:s,examples:a,original:g};export{t as book,n as chapter,e as chapterTitle,l as default,a as examples,o as headings,s as html,g as original,c as slug,r as title};
