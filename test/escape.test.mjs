import { md2tid } from '../dist/index.mjs';

describe('escape', () => {
  test('should escape what would otherwise be a block quote in a paragraph', () => {
    //   \> a
    //   \> b
    //   c >
    expect(md2tid('\\> a\n\\> b\nc >\n')).toEqual('\\> a\n\\> b\nc >\n');
  });

  test('should escape what would otherwise be a block quote in a list item', () => {
    //   * \> a
    //   * \> b
    expect(md2tid('* \\> a\n* \\> b\n')).toEqual('* \\> a\n* \\> b\n');
  });

  test('should escape what would otherwise be a break', () => {
    //   a\
    //   b
    expect(md2tid('a\\\\\nb\n')).toEqual('a\\\\\nb\n');
  });

  test('should escape what would otherwise be a character escape', () => {
    //   a\\+b
    expect(md2tid('a\\\\+b\n')).toEqual('a\\\\+b\n');
  });

  test('should escape what would otherwise be a character escape of an autolink', () => {
    //   a\\[ext[https://a.b]]
    expect(md2tid('a\\\\[ext[https://a.b]]\n')).toEqual('a\\\\[ext[https://a.b]]\n');
  });

  test('should not escape single []', () => {
    //   互联网始于[…] 年
    expect(md2tid('互联网始于[…] 年\n')).toEqual('互联网始于[…] 年\n');
  });

  test('should not escape strong', () => {
    //   > **问题**：互联网始于**[…]** **年**
    expect(md2tid('> **问题**：互联网始于**[…]** **年**')).toEqual(`> ''问题''：互联网始于''[…]'' ''年''`);
  });

  test('should escape what would otherwise be code (flow)', () => {
    //   \`\`\`js
    //   \`\`\`
    expect(md2tid('\\`\\`\\`js\n\\`\\`\\`\n')).toEqual('\\`\\`\\`js\n\\`\\`\\`\n');
  });

  test('should escape what would otherwise be a definition', () => {
    //   \[a]: b
    expect(md2tid('\\[a]: b\n')).toEqual('\\[a]: b\n');
  });

  test('should escape what would otherwise be emphasis (slash)', () => {
    //   \//a//
    expect(md2tid('\\//a//\n')).toEqual('\\//a//\n');
  });

  test('should escape what would otherwise be bold (underscore)', () => {
    //   \''a''
    expect(md2tid(`\\''a''\n`)).toEqual(`\\''a''\n`);
  });

  test('should escape what would otherwise be a heading (atx)', () => {
    //   \! a
    expect(md2tid('\\! a\n')).toEqual('\\! a\n');
  });
  test('should not escape what would otherwise not be a heading (atx)', () => {
    //   \# a
    expect(md2tid('\\# a\n')).toEqual('\\# a\n');
  });

  test('should escape what would otherwise be a heading (setext, equals)', () => {
    //   a
    //   \=
    expect(md2tid('a\n\\=\n')).toEqual('a\n\\=\n');
  });

  test('should escape what would otherwise be a heading (setext, dash)', () => {
    //   a
    //   \-
    expect(md2tid('a\n\\-\n')).toEqual('a\n\\-\n');
  });

  test('should escape what would otherwise be html', () => {
    //   \<a
    //    b>
    expect(md2tid('\\<a\nb>\n')).toEqual('\\<a\nb>\n');
  });

  test('should escape what would otherwise be code (text)', () => {
    //   a \`b\`
    //   \`c\` d
    expect(md2tid('a \\`b\\`\n\\`c\\` d\n')).toEqual('a \\`b\\`\n\\`c\\` d\n');
  });

  test('should escape what would otherwise turn a link into an image', () => {
    //   \![[a|b]]
    expect(md2tid('\\![[a|b]]\n')).toEqual('\\![[a|b]]\n');
  });

  test('should escape what would otherwise turn a link reference into an image reference', () => {
    //   \![a][b]
    expect(md2tid('\\![a][b]\n')).toEqual('\\![a][b]\n');
  });

  test('should escape what would otherwise be an image (reference)', () => {
    //   \!\[a]\[b]
    expect(md2tid('\\!\\[a]\\[b]\n')).toEqual('\\!\\[a]\\[b]\n');
  });

  test('should escape what would otherwise be an image (resource)', () => {
    //   \[img\[a.jpg]]
    expect(md2tid('\\[img\\[a.jpg]]\n')).toEqual('\\[img\\[a.jpg]]\n');
  });

  test('should not escape what would otherwise not be an image (resource), but escape because it might be heading', () => {
    // \!\[](a.jpg)
    expect(md2tid('\\!\\[](a.jpg)\n')).toEqual('\\!\\[](a.jpg)\n');
  });

  test('should escape what would otherwise be a link (reference)', () => {
    //   \[a]\[b]
    expect(md2tid('\\[a]\\[b]\n')).toEqual('\\[a]\\[b]\n');
  });

  test('should escape what would otherwise be a link (resource)', () => {
    //   \[\[a.jpg]]
    expect(md2tid('\\[\\[a.jpg]]\n')).toEqual('\\[\\[a.jpg]]\n');
  });

  test('should not escape what would otherwise not be a link (resource)', () => {
    //   \[](a.jpg)
    expect(md2tid('\\[](a.jpg)\n')).toEqual('\\[](a.jpg)\n');
  });

  test('should escape what would otherwise be a list item (plus)', () => {
    //   \+ a
    //   \+ b
    expect(md2tid('\\+ a\n\\+ b\n')).toEqual('\\+ a\n\\+ b\n');
  });

  test('should escape what would otherwise be a list item (dash)', () => {
    //   \- a
    //   \- b
    expect(md2tid('\\- a\n\\- b\n')).toEqual('\\* a\n\\* b\n');
  });

  test('should escape what would otherwise be a list item (dot)', () => {
    //   1\. a
    //   2\. b
    expect(md2tid('1\\. a\n2\\. b\n')).toEqual('1\\. a\n2\\. b\n');
  });

  test('should escape what would otherwise be a list item (paren)', () => {
    //   1\) a
    //   2\) b
    expect(md2tid('1\\) a\n2\\) b\n')).toEqual('1\\) a\n2\\) b\n');
  });

  test('should not escape what can’t be a list (dot)', () => {
    //   1.2.3. asd
    expect(md2tid('1.2.3. asd\n')).toEqual('1.2.3. asd\n');
  });

  test.skip('should support options in extensions', () => {
    //   [a]: <>
    //   [b]: <>
    expect(md2tid('[a]: <>\n[b]: <>\n')).toEqual('[a]: <>\n[b]: <>\n');
  });

  test('should support empty `join`, `handlers`, `extensions` in an extension (coverage)', () => {
    expect(md2tid(`_a_\n`)).toEqual(`_a_\n`);
  });

  test('should make `join` from options highest priority', () => {
    //   - foo
    //   - 1. bar
    expect(md2tid('- foo\n- 1. bar\n')).toEqual('# foo\n# * bar\n');
  });

  test('should prefer main options over extension options', () => {
    //   **a**
    expect(md2tid(`**a**\n`)).toEqual(`''a''\n`);
  });

  test('should handle literal backslashes properly when before constructs (1)', () => {
    //   \\//a//
    expect(md2tid('\\\\//a//\n')).toEqual('\\\\//a//\n');
  });

  test('should handle literal backslashes properly when before constructs (2)', () => {
    //   \\\\//a//
    expect(md2tid('\\\\\\\\//a//\n')).toEqual('\\\\\\\\//a//\n');
  });
});
