const decode = (text) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#215;/g, '×')
    .replace(/&#8230;/g, '…')
    .replace(/&copy;/g, '©');

const inline = (html) => {
  let out = html;
  out = out.replace(/<br\s*\/?>/g, ' ');
  out = out.replace(
    /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (_, href, text) => `[${text.trim()}](${href})`
  );
  out = out.replace(
    /<code[^>]*>([\s\S]*?)<\/code>/g,
    (_, code) => `\`${decode(code.replace(/<[^>]+>/g, ''))}\``
  );
  out = out.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, '**$1**');
  out = out.replace(/<b[^>]*>([\s\S]*?)<\/b>/g, '**$1**');
  out = out.replace(/<em[^>]*>([\s\S]*?)<\/em>/g, '*$1*');
  out = out.replace(/<i[^>]*>([\s\S]*?)<\/i>/g, '*$1*');
  out = out.replace(/<[^>]+>/g, '');
  return decode(out).replace(/\s+/g, ' ').trim();
};

const listItems = (html, ordered = false) => {
  const items = [];
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  let match;
  let index = 0;
  while ((match = regex.exec(html)) !== null) {
    index += 1;
    const marker = ordered ? `${index}.` : '-';
    items.push(`${marker} ${inline(match[1])}`);
  }
  return items.join('\n');
};

const toTable = (html) => {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/\1>/g)].map((cell) =>
      inline(cell[2])
    )
  );
  if (rows.length < 2) return '';
  const width = Math.max(...rows.map((cells) => cells.length));
  const pad = (cells) => [
    ...cells,
    ...Array.from({ length: width - cells.length }, () => ''),
  ];
  return [
    `| ${pad(rows[0]).join(' | ')} |`,
    `| ${Array.from({ length: width }, () => '---').join(' | ')} |`,
    ...rows.slice(1).map((cells) => `| ${pad(cells).join(' | ')} |`),
  ].join('\n');
};

const detectLanguage = (code) => {
  const value = code.trim();
  if (!value) return '';
  if (/^<(\?xml|!DOCTYPE|html|svg)/i.test(value)) return 'html';
  if (/^(\$\s|#!|\s*sudo |\s*npm |\s*curl |\s*git |\s*cd |\s*echo |\s*npx )/m.test(value))
    return 'bash';
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\b/im.test(value)) return 'sql';
  if (/\b(import |from |def |print\()/.test(value)) return 'python';
  if (/\b(function |const |let |var |=>|console\.)/.test(value)) return 'javascript';
  if (/\b(fail|require|def |val |match )/.test(value) && /=>/.test(value)) return 'ocaml';
  if (/^\s*[{[]/.test(value) && /[}\]]/.test(value)) return 'json';
  return '';
};

const convert = (html, images) => {
  const codeBlocks = [];
  let rest = html.replace(
    /<pre([^>]*)>([\s\S]*?)<\/pre>/g,
    (_, attrs, inner) => {
      const language =
        attrs.match(/data-language="([^"]+)"/)?.[1] ||
        attrs.match(/language-([\w-]+)/)?.[1] ||
        '';
      const text = decode(
        inner
          .replace(/<\/span>\s*(?=<span class="line"|<!--|\n)/g, '')
          .replace(/<div class="ec-line"[^>]*>/g, '\n')
          .replace(/<span class="line"[^>]*>/g, '\n')
          .replace(/<[^>]+>/g, '')
          .replace(/^\n+/, '')
          .replace(/\s+$/, '')
          .replace(/\n{3,}/g, '\n\n')
      );
      codeBlocks.push({ language, text });
      return ` CODE${codeBlocks.length - 1}END `;
    }
  );

  rest = rest.replace(/ IMAGE(\d+)END /g, (match, index) => {
    const image = images[Number(index)];
    return image ? ` ![${image.alt || ''}](${image.local}) ` : '';
  });

  // unwrap container elements so their text is not dropped
  const flat = rest
    .replace(/<(\/?)(div|section|main|article|span|figure|figcaption|details|summary|label|button|form|input|svg|path)([^>]*)>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<button[\s\S]*?<\/button>/g, '');

  const chunks = [];
  const segments = flat.split(/( CODE\d+END )/);
  const pattern =
    /<(h[1-6]|p|ul|ol|blockquote|table|pre)[^>]*>([\s\S]*?)<\/\1>|<hr\s*\/?>/g;

  for (const [index, segment] of segments.entries()) {
    if (index % 2 === 1) {
      const block = codeBlocks[Number(segment.match(/CODE(\d+)END/)[1])];
      if (block) {
        chunks.push(
          '```' + (block.language || detectLanguage(block.text)) + '\n' + block.text + '\n```'
        );
      }
      continue;
    }

    let cursor = 0;
    let match;
    const local = new RegExp(pattern.source, 'g');
    while ((match = local.exec(segment)) !== null) {
      const text = inline(segment.slice(cursor, match.index));
      if (text) chunks.push(text);
      cursor = match.index + match[0].length;
      const tag = match[1];
      const inner = match[2] || '';
      if (tag === 'hr') chunks.push('---');
      else if (tag === 'pre') {
        const value = decode(inner.replace(/<[^>]+>/g, '').trim());
        if (value) chunks.push('```\n' + value + '\n```');
      } else if (/^h[1-6]$/.test(tag)) {
        const level = Number(tag[1]);
        const id = inner.match(/id="([^"]+)"/)?.[1];
        chunks.push(
          `${'#'.repeat(Math.min(level, 4))} ${inline(inner)}${id ? ` {#${id}}` : ''}`
        );
      } else if (tag === 'p') {
        const value = inline(inner);
        if (value) chunks.push(value);
      } else if (tag === 'ul' || tag === 'ol') {
        const value = listItems(inner, tag === 'ol');
        if (value) chunks.push(value);
      } else if (tag === 'blockquote') {
        const value = inner
          .split(/\n{2,}/)
          .map((line) => `> ${inline(line)}`)
          .join('\n> ');
        if (value) chunks.push(value);
      } else if (tag === 'table') {
        const value = toTable(inner);
        if (value) chunks.push(value);
      }
    }
    const tail = inline(segment.slice(cursor));
    if (tail) chunks.push(tail);
  }

  return chunks.join('\n\n');
};


const extractMain = (html, selector) => {
  const patterns = selector
    ? [
        new RegExp(`<div[^>]*role="${selector}"[^>]*>`, 'i'),
        new RegExp(`<${selector}[^>]*>`, 'i'),
      ]
    : [];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return html.slice(html.indexOf(match[0]) + match[0].length);
    }
  }
  return html;
};

export {
  decode,
  inline,
  listItems,
  toTable,
  detectLanguage,
  convert,
  extractMain,
};
