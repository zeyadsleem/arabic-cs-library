---
title: "Truncation and Wrapping"
lang: en
source: "https://stevekinney.com/courses/tailwind/truncation-and-wrapping"
---

Text behavior within containers is fundamental for well-structured interfaces. Tailwind provides utilities for controlling text wrapping and truncation.

## Controlling Text Wrapping

Tailwind offers utilities for controlling how text flows and breaks across lines.

### Word Breaks (`word-break`)

The `word-break` property controls how words break to prevent overflow.

- **`break-normal`**: Default behavior, breaks only at normal word break points
- **`break-all`**: Breaks anywhere necessary, even within words
- **`break-keep`**: Prevents breaks in Chinese, Japanese, or Korean (CJK) text. For non-CJK text, behaves like `break-normal`

Apply conditionally with breakpoints:

*Word Breaks (word-break) — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/f0ea3e97a6104d70c722a9f5f585b595afec3d23560fd55b7347999dae3ca39a.html)*

```html
<p class="break-all md:break-normal">Thisisasuperlongwordthatwillbreakanywherenecessary.</p>
```

### Overflow Wrapping (`overflow-wrap`)

The `overflow-wrap` property specifies whether browsers should break lines within words to prevent overflow.

- **`wrap-normal`**: Default behavior, breaks only at natural wrapping points like spaces and hyphens
- **`wrap-break-word`**: Allows line breaks between letters if needed to prevent overflow
- **`wrap-anywhere`**: Similar to `wrap-break-word` but factors mid-word breaks when calculating intrinsic size. Useful for flex containers where you’d otherwise need `min-width: 0`

*Overflow Wrapping (overflow-wrap) — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/a3204cf71a475c3d8d7420c79c4537be109f9e1b812dd6cb8dc1379ab3c5a79f.html)*

```html
<div class="flex w-32">
  <p class="wrap-anywhere">Anotherlongwordtobreakanywhere.</p>
</div>
```

### Whitespace Control (`white-space`)

The `white-space` property controls how whitespace and line breaks are handled.

- **`whitespace-normal`**: Text wraps normally, newlines and spaces are collapsed
- **`whitespace-nowrap`**: Prevents wrapping, text overflows if necessary. Newlines and spaces are collapsed
- **`whitespace-pre`**: Preserves newlines and spaces exactly as written. Text doesn’t wrap
- **`whitespace-pre-line`**: Preserves newlines but collapses spaces. Text wraps normally
- **`whitespace-pre-wrap`**: Preserves newlines and spaces. Text wraps normally
- **`whitespace-break-spaces`**: Preserves newlines and spaces, including at line ends

*Whitespace Control (white-space) — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/302e64e93b8654d6025ae250a1742ce91dd3d95f6acbde245ebb4ca572c7bf38.html)*

```html
<p class="overflow-hidden text-ellipsis whitespace-nowrap">
  This text will not wrap and will be truncated with an ellipsis if it overflows.
</p>
<p class="whitespace-pre-wrap">This text preserves newlines and spaces, and wraps normally.</p>
```

### Controlling Breaks in Columns and Pages

Control where content breaks in multi-column layouts or print styles.

#### Break After (`break-after`)

Controls column or page breaks *after* an element.

Available utilities: `break-after-auto`, `break-after-avoid`, `break-after-all`, `break-after-avoid-page`, `break-after-page`, `break-after-left`, `break-after-right`, `break-after-column`.

*Break After (break-after) — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/669d60e630354757117cff943623573462276c48cef8348005734437d92d9a1b.html)*

```html
<div class="columns-2">
  <p>Content before break...</p>
  <div class="break-after-column"></div>
  <p>Content after break...</p>
</div>
```

#### Break Before (`break-before`)

Controls column or page breaks *before* an element.

Available utilities: `break-before-auto`, `break-before-avoid`, `break-before-all`, `break-before-avoid-page`, `break-before-page`, `break-before-left`, `break-before-right`, `break-before-column`.

*Break Before (break-before) — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/db7e8a9a2272b851ffb2f0243066c99c334e41588182091adc704180fb20494f.html)*

```html
<div class="columns-2">
  <p>Content before break...</p>
  <p class="break-before-column">Content after break...</p>
</div>
```

#### Break Inside (`break-inside`)

Controls column or page breaks *within* an element.

Available utilities: `break-inside-auto`, `break-inside-avoid`, `break-inside-avoid-page`, `break-inside-avoid-column`.

*Break Inside (break-inside) — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/15150c0bd072df4f599a172681e8f5bde3b46f7a99efc97a1165f13607a6593e.html)*

```html
<div class="columns-2">
  <div class="break-inside-avoid">
    <p>This block of text should ideally not be broken across columns or pages.</p>
  </div>
</div>
```

### Hyphenation (`hyphens`)

The `hyphens` property controls whether words should be hyphenated when text wraps.

- **`hyphens-none`**: Prevents hyphenation, even with line break suggestions (`­`)
- **`hyphens-manual`**: Only hyphenates at specified break points (`­`). Browser default
- **`hyphens-auto`**: Allows browser to automatically choose hyphenation points based on language. Manual suggestions are preferred

*Hyphenation (hyphens) — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/3c00da1c0dbd0fae4ef1b76cdefc0c670b8e50afce7e288ae646e0aac39a7955.html)*

```html
<p class="hyphens-auto">This word-processing example demonstrates automatic hyphenation.</p>
```

### General Text Wrapping (`text-wrap`)

The `text-wrap` property offers modern control over text wrapping.

- **`text-wrap`**: Allows text to wrap normally at logical points
- **`text-nowrap`**: Prevents text from wrapping
- **`text-balance`**: Distributes text evenly across lines. Browsers often limit this to ~6 lines for performance, making it ideal for headings
- **`text-pretty`**: Attempts to prevent orphans (single words on the last line)

*General Text Wrapping (text-wrap) — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/9441d042565f963a9e83c4a6986b5e3894bc858ff0ab7cecfb48d221fbe1f6ef.html)*

```html
<h1 class="text-balance">A title that looks good across multiple lines.</h1>
<p class="text-pretty">
  A longer paragraph that avoids having a single word orphaned on the last line.
</p>
```

## Managing Text Truncation

Constrain text to specific spaces and indicate when content is cut off.

### Single-line Truncation (`text-overflow`)

Prevent text from wrapping and indicate overflow.

- **`truncate`**: Composite utility that sets `overflow: hidden`, `text-overflow: ellipsis`, and `white-space: nowrap`. Prevents wrapping and truncates with ellipsis (…) Single-line Truncation (text-overflow) — Example 9[Open example](https://stevekinney.com/generated/playgrounds/767919740663dbe3f3edbca75d825b2a4eb016d083f100d4779d3783c6b88e38.html) <code><span class="line"><span style="color:#7FDBCA"><</span><span style="color:#CAECE6">p</span><span style="color:#C5E478;font-style:italic"> class</span><span style="color:#7FDBCA">=</span><span style="color:#D9F5DD">"</span><span style="color:#ECC48D">w-32 truncate</span><span style="color:#D9F5DD">"</span><span style="color:#7FDBCA">></span><span style="color:#D6DEEB">This text is too long and will be truncated.</span><span style="color:#7FDBCA"></</span><span style="color:#CAECE6">p</span><span style="color:#7FDBCA">></span></span></code>
- **`text-ellipsis`**: Sets `text-overflow: ellipsis`. Use with `overflow: hidden` and `white-space: nowrap` to add ellipsis (…) to overflowing text
- **`text-clip`**: Sets `text-overflow: clip`. Truncates text at content area limit without indicator. Browser default

### Multi-line Clamping (`line-clamp`)

Truncate multi-line text after a specific number of lines.

- **`line-clamp-<number>`**: Limits text to specified lines (`line-clamp-2`, `line-clamp-3`). Sets `overflow: hidden`, `display: -webkit-box`, `-webkit-box-orient: vertical`, and `-webkit-line-clamp: <number>` Multi-line Clamping (line-clamp) — Example 10[Open example](https://stevekinney.com/generated/playgrounds/77f4aa7c0638da3e1518d77f04480fc5b4ac3abfe4e59f669615a595df93fd02.html) <code><span class="line"><span style="color:#7FDBCA"><</span><span style="color:#CAECE6">div</span><span style="color:#C5E478;font-style:italic"> class</span><span style="color:#7FDBCA">=</span><span style="color:#D9F5DD">"</span><span style="color:#ECC48D">w-48</span><span style="color:#D9F5DD">"</span><span style="color:#7FDBCA">></span></span>
<span class="line"><span style="color:#7FDBCA"> <</span><span style="color:#CAECE6">p</span><span style="color:#C5E478;font-style:italic"> class</span><span style="color:#7FDBCA">=</span><span style="color:#D9F5DD">"</span><span style="color:#ECC48D">line-clamp-3</span><span style="color:#D9F5DD">"</span><span style="color:#7FDBCA">></span></span>
<span class="line"><span style="color:#D6DEEB"> This is a longer block of text that will be limited to a maximum of three lines before being</span></span>
<span class="line"><span style="color:#D6DEEB"> truncated with an ellipsis.</span></span>
<span class="line"><span style="color:#7FDBCA"> </</span><span style="color:#CAECE6">p</span><span style="color:#7FDBCA">></span></span>
<span class="line"><span style="color:#7FDBCA"></</span><span style="color:#CAECE6">div</span><span style="color:#7FDBCA">></span></span></code>
- **`line-clamp-none`**: Removes previously applied line clamp
- **Custom Values**: Use `line-clamp-[<value>]` for custom line counts

Apply responsively:

*Multi-line Clamping (line-clamp) — Example 11 — [Open example](https://stevekinney.com/generated/playgrounds/dc2e8ca349cb24d97c90cdaddc6ffcaec6f159d9eebb173140f44271868d7d77.html)*

```html
<p class="line-clamp-2 md:line-clamp-4">
  This text will show 2 lines on small screens and 4 on medium screens and up.
</p>
<p class="line-clamp-[5] lg:line-clamp-[8]">This text uses arbitrary line counts.</p>
```

Tailwind’s text wrapping and truncation utilities provide comprehensive control over text flow directly in HTML, making it easy to manage complex layouts and handle overflow scenarios consistently.
