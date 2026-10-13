---
title: "مساعد `html`"
book: hono
chapter: helpers
slug: html
order: 61
source: https://hono.dev/docs/helpers/html
lang: ar
---

تتيح لك الأداة المساعدة html كتابة HTML داخل قالب نصي JavaScript (template literal) باستخدام وسم باسم `html`. باستخدام `raw()`، سيتم عرض المحتوى كما هو. عليك تهريب (escape) هذه السلاسل النصية بنفسك.

## Import

```ts
import { Hono } from 'hono'
import { html, raw } from 'hono/html'
```

## `html`

```ts
const app = new Hono()

app.get('/:username', (c) => {
  const { username } = c.req.param()
  return c.html(
    html`<!doctype html>
      <h1>Hello! ${username}!</h1>`
  )
})
```

### إدراج المقتطفات في JSX

أدرِج السكربت المضمّن (inline script) في JSX:

```tsx
app.get('/', (c) => {
  return c.html(
    <html>
      <head>
        <title>Test Site</title>
        {html`
          <script>
            // No need to use dangerouslySetInnerHTML.
            // If you write it here, it will not be escaped.
          </script>
        `}
      </head>
      <body>Hello!</body>
    </html>
  )
})
```

### العمل كمكوّن وظيفي

منذ `html` يعيد HtmlEscapedString، ويمكنه العمل كمكوّن كامل الوظائف دون استخدام JSX.

#### استخدم `html` لتسريع العملية بدلًا من `memo`

```typescript
const Footer = () => html`
  <footer>
    <address>My Address...</address>
  </footer>
`
```

### يستقبل الخصائص ويضمّن القيم

```typescript
interface SiteData {
  title: string
  description: string
  image: string
  children?: any
}
const Layout = (props: SiteData) => html`
<html>
<head>
  <meta charset="UTF-8">
  <title>${props.title}</title>
  <meta name="description" content="${props.description}">
  <head prefix="og: http://ogp.me/ns#">
  <meta property="og:type" content="article">
  <!-- More elements slow down JSX, but not template literals. -->
  <meta property="og:title" content="${props.title}">
  <meta property="og:image" content="${props.image}">
</head>
<body>
  ${props.children}
</body>
</html>
`

const Content = (props: { siteData: SiteData; name: string }) => (
  <Layout {...props.siteData}>
    <h1>Hello {props.name}</h1>
  </Layout>
)

app.get('/', (c) => {
  const props = {
    name: 'World',
    siteData: {
      title: 'Hello <> World',
      description: 'This is a description',
      image: 'https://example.com/image.png',
    },
  }
  return c.html(<Content {...props} />)
})
```

## `raw()`

```ts
app.get('/', (c) => {
  const name = 'John &quot;Johnny&quot; Smith'
  return c.html(html`<p>I'm ${raw(name)}.</p>`)
})
```

## نصائح

بفضل هذه المكتبات، يفسر Visual Studio Code و vim أيضًا القوالب الحرفية (template literals) كـ HTML، مما يسمح بتطبيق تلوين بناء الجملة (syntax highlighting) والتنسيق.

- <https://marketplace.visualstudio.com/items?itemName=bierner.lit-html>
- <https://github.com/MaxMEllon/vim-jsx-pretty>
