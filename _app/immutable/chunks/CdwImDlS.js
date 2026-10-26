const o="kinney",n="storybook",t="بناء أنظمة التصميم في Storybook",e="icon-gallery",c="معرض الأيقونات",s=[],l=`<p>هناك الكثير من الأيقونات في العالم، لكنك عمومًا تريد استخدام أكبر عدد تحتاج إليه من الأيقونات وأقل عدد يمكنك تدبّره في تطبيقك أو نظام تصميمك. وكتلة <code>IconGallery</code> في Storybook تسهّل عليك عرض الأيقونات التي تنوي استخدامها في تطبيقك.</p>
<p>وما يلزم لصنع معرض أيقونات في Storybook ليس بالكثير.</p>
<pre><code class="language-mdx">import { Meta, Title, IconGallery, IconItem } from '@storybook/blocks';
import { icons, Icon } from './components/icon';

&lt;Meta title=&quot;Icons&quot; /&gt;

&lt;Title&gt;Icons&lt;/Title&gt;

These are the icons being used in our design system. They are available as React components.

&lt;IconGallery&gt;
  {icons.map((icon) =&gt; (
    &lt;IconItem key={icon} name={icon}&gt;
      &lt;Icon type={icon} /&gt;
    &lt;/IconItem&gt;
  ))}
&lt;/IconGallery&gt;
</code></pre>
<p><img src="/arabic-cs-library/images/kinney/14b7bc5b4830d90d.webp" alt="معرض أيقونات في Storybook"></p>
<blockquote>
<p><strong>تنفيذ مكوّن <code>Icon</code></strong></p>
<p>يمكنك الاطلاع على تنفيذي لمكوّن <code>Icon</code> <a href="https://stevekinney.com/courses/storybook/creating-an-icon-component">هنا</a>.</p>
</blockquote>
`,r={book:o,chapter:n,chapterTitle:t,slug:e,title:c,headings:s,html:l};export{o as book,n as chapter,t as chapterTitle,r as default,s as headings,l as html,e as slug,c as title};
