---
title: Optimize Next.js apps for the Core Web Vitals
lang: en
source: https://www.patterns.dev/react/nextjs-vitals/
---

Optimizing user-experiences for the [Core Web Vitals](https://web.dev/vitals) involves improving page speed, interactivity, and visual stability. With Next.js, there are several components built in collaboration with the [Chrome team](https://web.dev/aurora) that can help improve the Core Web Vitals metrics.

- `next/image`: The next/image component is an optimized image component that can automatically optimize images for better [Largest Contentful Paint](https://web.dev/lcp) (LCP) and [Cumulative Layout Shift](https://web.dev/cls) (CLS) by resizing, compressing, and lazy-loading them. It can also be used to display responsive images that adapt to different screen sizes.
- `next/script`: The next/script component can be used to asynchronously load third-party scripts to improve page speed and interactivity. It can also be used to defer the loading of non-critical scripts, such as analytics scripts, to prevent them from slowing down the initial page load. These techniques can improve metrics like [First Input Delay](https://web.dev/fid) (FID) and [Interaction To Next Paint](https://web.dev/inp) (INP).
- `next/font`: The next/font component can be used to optimize web font loading by asynchronously loading fonts and prioritizing the most important font styles for the initial page load. This can help improve page speed and visual stability by preventing layout shifts (CLS) caused by font loading.

Let’s go over what each component does in more detail.

## Next.js Image Component

The Next.js Image component, [next/image](https://nextjs.org/docs/basic-features/image-optimization), is an extension of the HTML `&#x3C;img>` element: it provides performance optimizations to help you achieve good [Core Web Vitals](https://web.dev/vitals). These scores are important indicators of how well users experience your site, and can influence Google’s search rankings.

Official Next.js documentation:

- [Building an effective Image component](https://developer.chrome.com/blog/image-component/)
- [`next/image` feature overview](https://nextjs.org/docs/basic-features/image-optimization)
- [`next/image` API reference documentation](https://nextjs.org/docs/api-reference/next/image)
- [`next/image` SEO documentation](https://nextjs.org/learn/seo/improve/images)

### Built-in Optimizations

Some of the optimizations built into the Image component include:

- **Improved Performance**: Always serve correctly sized image for each device, using modern image formats
- **Visual Stability**: Prevent [Cumulative Layout Shift](https://web.dev/cls) automatically Faster Page Loads: Images are only loaded when they enter the viewport, with optional blur-up placeholders
- **Asset Flexibility**: On-demand image resizing, even for images stored on remote servers Using the Image Component

To add an image to your application, import the `next/image` component:

```
import Image from "next/image";
```

Now, you can define the src for your image (either local or remote).

**Local Images** To use a local image, import your .jpg, .png, or .webp files:

```
import profilePic from "../public/me.png";
```

The import must be static so it can be analyzed at build time.

Next.js will automatically determine the width and height of your image based on the imported file. These values are used to prevent Cumulative Layout Shift while your image is loading.

```
import Image from "next/image";
import profilePic from "../public/me.png";

function Home() {
  return (
    &#x3C;>
      &#x3C;h1>My Homepage&#x3C;/h1>
      &#x3C;Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      &#x3C;p>Welcome to my homepage!&#x3C;/p>
    &#x3C;/>
  );
}
```

#### Remote Images

To use a remote image, the src property should be a URL string, which can be relative or absolute. Because Next.js does not have access to remote files during the build process, you’ll need to provide the width, height and optional blurDataURL props manually:

```
import Image from "next/image";

export default function Home() {
  return (
    &#x3C;>
      &#x3C;h1>My Homepage&#x3C;/h1>
      &#x3C;Image
        src="/me.png"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      &#x3C;p>Welcome to my homepage!&#x3C;/p>
    &#x3C;/>
  );
}
```

**Domains**

Sometimes you may want to optimize a remote image, but still use the built-in Next.js Image Optimization API. To do this, leave the loader at its default setting and enter an absolute URL for the Image src prop.

To protect your application from malicious users, you must define a list of remote hostnames you intend to use with the next/image component.

**Loaders** Note that in the example earlier, a partial URL (“/me.png”) is provided for a remote image. This is possible because of the loader architecture.

A loader is a function that generates the URLs for your image. It modifies the provided src, and generates multiple URLs to request the image at different sizes. These multiple URLs

**Remote Images with Automatic Sizing**

If you are using a remote image, you need to provide the width and height properties for the Image component. However, if you are unsure of the dimensions of the remote image, you can use a combination of the layout property and the aspectRatio property to let Next.js automatically calculate the width and height.

For example, if you want to display a remote image with a 16:9 aspect ratio and you want the Image component to fill its container, you can use the following code:

```
import Image from "next/image";

function Home() {
  return (
    &#x3C;>
      &#x3C;h1>My Homepage&#x3C;/h1>
      &#x3C;div style={{ width: "100%", height: "50vh" }}>
        &#x3C;Image
          src="https://example.com/my-image.jpg"
          alt="My Image"
          layout="fill"
          objectFit="cover"
          aspectRatio={16 / 9}
        />
      &#x3C;/div>
      &#x3C;p>Welcome to my homepage!&#x3C;/p>
    &#x3C;/>
  );
}
```

In this example, the layout property is set to fill, which tells Next.js to fill the dimensions of the parent container. The objectFit property is set to cover, which scales the image to cover the entire container while preserving its aspect ratio. The aspectRatio property is set to 16 / 9, which is the aspect ratio of the image.

**Custom Loaders**

By default, Next.js uses the built-in Image Optimization API to optimize and serve images. However, if you want to serve your images from a different source, such as a CDN or image server, you can define a custom loader function.

A loader function is a function that generates URLs for your images. It takes a src argument, which is the source URL of the image, and returns an object with the following properties:

- `src`: The URL of the original image.
- `width`: The width of the image.
- `height`: The height of the image.
- `blurDataURL`: A base64-encoded string that represents a blurred version of the image. This is used as a placeholder while the image is loading.

Here’s an example of a custom loader function that generates URLs for images stored on AWS S3:

```
import Image from "next/image";

function myLoader({ src, width, quality }) {
  return `https://example.com/images/${src}?w=${width}&#x26;q=${quality || 75}`;
}

function Home() {
  return (
    &#x3C;>
      &#x3C;h1>My Homepage&#x3C;/h1>
      &#x3C;Image
        loader={myLoader}
        src="my-image.jpg"
        alt="My Image"
        width={500}
        height={500}
      />
      &#x3C;p>Welcome to my homepage!&#x3C;/p>
    &#x3C;/>
  );
}
```

In this example, the loader property is set to myLoader, which is a custom loader function that generates URLs for images stored on AWS S3. The src property is set to my-image.jpg, which is the name of the image file. The width and height properties are set to 500, which is the size of the image.

### Conclusion

In conclusion, the Next.js Image component is a powerful tool for optimizing images in your Next.js application. It includes a variety of built-in performance optimizations to help you achieve good Core Web Vitals, such as improved performance, visual stability, faster page loads, and asset flexibility.

You can use the Image component to add local or remote images to your application, and Next.js will automatically determine the width and height of the image to prevent Cumulative Layout Shift while the image is loading. You can also use custom loaders.

## Next.js Script Component

Official documentation:

- [Optimizing Script loading in Next.js](https://developer.chrome.com/blog/script-component/)
- [`next/script` feature documentation](https://nextjs.org/docs/basic-features/script)
- [`next/script` API reference docs](https://nextjs.org/docs/api-reference/next/script)

Third-party scripts are a common way for developers to save time and leverage existing solutions to implement common features. However, creators of these scripts often overlook the performance impact of their code on the website using them, resulting in a sub-optimal user experience. These scripts also present a challenge to developers, who may not know how to optimize their performance.

Scripts represent a significant amount of third-party bytes downloaded by websites across different categories of third-party requests. By default, browsers prioritize scripts based on where they are in the document, which can delay the discovery or execution of scripts critical to user experience. Third-party libraries required for layout should be loaded early to render the page, while non-critical third-parties should be deferred so that they do not block other processing on the main thread. Lighthouse has two audits to flag render-blocking or main thread-blocking scripts. It’s important to consider the resource loading sequence of your page so that critical resources are not delayed and non-critical resources do not block critical resources.

To address these issues, Next.js has developed a Script component that encapsulates sequencing features to provide developers with better controls for third-party script loading. The component implements methods for efficiently loading and sequencing third-party scripts and provides a template for developers to define their loading strategy. Once the suitable strategy is specified, it will load optimally without blocking other critical resources.

Before discussing the Next.js Script component, let’s look at the available guidance to reduce the impact of render-blocking scripts.

**Ways to efficiently load and sequence third-party scripts**

The available guidance provides the following methods for efficiently loading and sequencing third-party scripts:

Use the async or defer attribute with `&#x3C;script>` tags that tell the browser to load non-critical third-party scripts without blocking the document parser. Scripts not required for initial page load or the first user interaction may be considered non-critical.

```
&#x3C;script src="https://example.com/script1.js" defer>&#x3C;/script>
&#x3C;script src="https://example.com/script2.js" async>&#x3C;/script>
Establish early connections to required origins using preconnect and
dns-prefetch. This allows critical scripts to start downloading earlier.

&#x3C;head>
  &#x3C;link rel="preconnect" href="http://PreconnThis.com" />
  &#x3C;link rel="dns-prefetch" href="http://PrefetchThis.com" />
&#x3C;/head>
```

Lazy-load third-party resources and embeds after the main page content has finished loading or when the user scrolls down to the part of the page where they are included.

**The Next.js Script Component**

The Next.js Script component builds on the HTML `&#x3C;script>` tag and provides an option to set the loading priority for third-party scripts using the strategy attribute. Once the suitable strategy is specified, it will load optimally without blocking other critical resources.

```
// Example for beforeInteractive:

&#x3C;script
  src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserverEntry%2CIntersectionObserver"
  strategy="beforeInteractive"
/>

// Example for afterInteractive (default):
&#x3C;script src="https://example.com/samplescript.js" />

// Example for lazyonload:
&#x3C;script src="https://connect.facebook.net/en_US/sdk.js" strategy="lazyOnload" />
```

The strategy attribute can take three values:

- `beforeInteractive`: This option may be used for critical scripts that should execute before the page becomes interactive. Next.js ensures that such scripts are injected into the initial HTML on the server and executed before other self-bundled JavaScript. Consent management, bot detection scripts, or helper libraries required to render critical content are good candidates for this strategy.
- `afterInteractive`: This is the default strategy applied and is equivalent to loading a script with the defer attribute.
- `lazyOnloadExternal`: This option may be used to load low-priority scripts that are hosted on external servers when the browser is idle. This strategy is particularly useful when scripts are not critical to rendering a page and can be loaded after the initial page load. An example of this is ads scripts, which can be loaded after the initial page load when the user is idle.

The Script component also provides a mechanism for inlining third-party scripts using the inline attribute. Inlining scripts can help reduce the number of requests made by a website, which can be particularly useful for small scripts. However, it is not recommended to inline large scripts as they can increase the size of the HTML document, making it slower to download.

```
// Example for inlining a script:

&#x3C;script inline src="https://example.com/inlinescript.js" />
```

In addition to the above, the Script component provides other features such as script caching, script deduplication, and script fallbacks. Caching scripts can help improve page load times, particularly when users revisit a website. Deduplicating scripts can help reduce the number of requests made to a server, thereby reducing the load on the server. Finally, script fallbacks can be used to load a different script if the primary script fails to load.

## The Next.js Font Component

Optimizing font fallbacks is crucial for web performance and accessibility. When a user visits a website, they should be able to see the content as quickly as possible, even if the custom font that the website uses hasn’t loaded yet. In this article, we will explore the Next.js Font Component and how it can help optimize font fallbacks.

- [Next.js Font Optimization features](https://nextjs.org/docs/basic-features/font-optimization)
- [Framework tools Font fallbacks](https://developer.chrome.com/blog/framework-tools-font-fallback/)
- [`next/font` API reference documentation](https://nextjs.org/docs/api-reference/next/font)

Next.js provides a built-in way to enable fallback font optimization. This feature is enabled by default when you load fonts using the `@next/font` component. The `@next/font` component was introduced in Next.js version 13 and provides an API to import Google Fonts or custom fonts into your pages. It also includes built-in automatic self-hosting of font files.

When used, the fallback font metrics are automatically calculated and injected into the CSS file. This ensures that when a custom font is not available, the fallback font will match the custom font in terms of size and line-height. This prevents any layout shifts that can occur when the fallback font is loaded.

**Using the Next.js Font Component**

Let’s say you are using the Roboto font. Typically, you would define it in CSS as follows:

```
@font-face {
  font-family: "Roboto";
  font-display: swap;
  src: url("/fonts/Roboto.woff2") format("woff2"), url("/fonts/Roboto.woff")
      format("woff");
  font-weight: 700;
}

body {
  font-family: Roboto;
}
```

To migrate to the Next.js Font Component, move the Roboto font declaration into your JavaScript by importing the ‘Roboto’ function from ‘next/font’. The function’s return value will be a class name you can leverage in your component template. Remember to add display: swap to the configuration object to enable the feature.

```
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap", // Using display swap automatically enables the feature
});
```

In your component, use the generated class name:

```
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    &#x3C;html lang="en" className={roboto.className}>
      &#x3C;body>{children}&#x3C;/body>
    &#x3C;/html>
  );
}
```

Note that the Next.js Font Component is designed to support only ‘Arial’ and ‘Times New Roman’ as the fallback fonts. This choice was made mainly because of the universal support for Arial and Times New Roman fonts across platforms.

**The adjustFontFallback config option**

The Next.js Font Component has an adjustFontFallback config option that can be used to enable or disable automatic font fallbacks. For @next/font/google, this is a boolean value that sets whether an automatic fallback font should be used to reduce Cumulative Layout Shift. The default is true. Next.js automatically sets your fallback font to either Arial or Times New Roman depending on the font type (serif vs sans-serif respectively).

For @next/font/local, this is a string or boolean false value that sets whether an automatic fallback font should be used to reduce Cumulative Layout Shift. The possible values are Arial, Times New Roman, or false. The default is Arial. If you want to use a serif font, consider setting this value to Times New Roman.

**Optimizing Google Fonts**

If using the Next.js Font Component isn’t an option, another approach to use this feature with Google Fonts is via the optimizeFonts flag. Next.js has the optimizeFonts feature already enabled by default. This feature inlines the Google Font CSS in the HTML response. Further, you can enable the font fallbacks adjustment feature by setting the experimental.adjustFontFallbacksWithSizeAdjust flag in your next

With the @next/font component, you can also import custom fonts into your pages. To use a custom font, first, you need to upload your font files to your public directory. Then, you can use the @font-face CSS rule to define your font family and sources.

Here’s an example of how to use a custom font with the @next/font component:

```
// In your component
import { MyCustomFont } from "@next/font/local";

const myCustomFont = MyCustomFont({
  weight: "normal",
  src: 'url("/fonts/MyCustomFont.woff2") format("woff2")',
});

export default function MyComponent() {
  return (
    &#x3C;div className={myCustomFont.className}>
      &#x3C;h1>Hello World&#x3C;/h1>
    &#x3C;/div>
  );
}
```

```
// In your CSS
@font-face {
  font-family: "MyCustomFont";
  font-weight: normal;
  src: url("/fonts/MyCustomFont.woff2") format("woff2");
}
```

With the @next/font component, you can also optimize your font loading by loading only the fonts that are needed on the page. To do this, you can use the Font Observer API to detect when a font is needed on the page and load it dynamically.

Here’s an example of how to use the Font Observer API with the @next/font component:

```
// In your component
import { useFontObserver } from "@next/font";

export default function MyComponent() {
  const [isFontReady, fontClassName] = useFontObserver("Inter", {
    weight: "400",
    subsets: ["latin"],
  });

  return (
    &#x3C;div className={fontClassName}>
      {isFontReady ? (
        &#x3C;h1>Hello World&#x3C;/h1>
      ) : (
        &#x3C;h1 style={{ fontFamily: "sans-serif" }}>Hello World&#x3C;/h1>
      )}
    &#x3C;/div>
  );
}
```

In this example, the useFontObserver hook is used to detect when the ‘Inter’ font with a weight of 400 and a Latin subset is needed on the page. The hook returns a boolean value that indicates whether the font is ready to use and a font class name that can be applied to your component.

If the font is not yet ready, the component displays a fallback font using the fontFamily CSS property. Once the font is ready, the component displays the text using the ‘Inter’ font.

In conclusion, the @next/font component provides an easy way to optimize font fallbacks in your Next.js application. By using this component, you can improve the performance and user experience of your web application by loading only the necessary fonts and reducing the Cumulative Layout Shift caused by font loading.

## Wrapping up

`next/image`, `next/script` and `next/font` can have a significant impact on improving the Core Web Vitals. If you’re building a Next.js app and want to ensure it has a great user-experience, consider leveraging them.
