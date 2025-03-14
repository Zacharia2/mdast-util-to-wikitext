import { md2tid } from '../dist/index.mjs';

describe('code (flow)', () => {
  test('should support empty code', () => {
    expect(md2tid('```\n```\n')).toEqual('```\n```\n');
  });

  test('should support code w/ a value (indent)', () => {
    expect(md2tid('```\na```')).toEqual('```\na```');
  });

  test('should support code w/ a value (fences)', () => {
    expect(md2tid('```\na\n```\n')).toEqual('```\na\n```\n');
  });

  test('should support code w/ a lang', () => {
    expect(md2tid('```a\n```\n')).toEqual('```a\n```\n');
  });

  test('should support (ignore) code w/ only a meta', () => {
    expect(md2tid('```\n```\n')).toEqual('```\n```\n');
  });

  test('should support code w/ lang and meta', () => {
    expect(md2tid('```a b\n```\n')).toEqual('```a b\n```\n');
  });

  test('should escape a backslash in `lang`', () => {
    expect(md2tid('```a\\\\-b\n```\n')).toEqual('```a\\\\-b\n```\n');
  });

  test('should not encode a space in `meta`', () => {
    expect(md2tid('```x a b\n```\n')).toEqual('```x a b\n```\n');
  });

  test('should escape a backslash in `meta`', () => {
    expect(md2tid('```x a\\\\-b\n```\n')).toEqual('```x a\\\\-b\n```\n');
  });

  test('should support fenced code w/ tildes when `fence: "~"`', () => {
    expect(md2tid('~~~\n~~~\n')).toEqual('~~~\n~~~\n');
  });

  test('should not encode a grave accent when using tildes for fences', () => {
    expect(md2tid('~~~a`b\n~~~\n')).toEqual('~~~a`b\n~~~\n');
  });

  test('should use more grave accents for fences if there are streaks of grave accents in the value (fences)', () => {
    expect(md2tid('````\n```\nasd\n```\n````\n')).toEqual('````\n```\nasd\n```\n````\n');
  });

  test('should use more tildes for fences if there are streaks of tildes in the value (fences)', () => {
    expect(md2tid('~~~~\n~~~\nasd\n~~~\n~~~~\n')).toEqual('~~~~\n~~~\nasd\n~~~\n~~~~\n');
  });

  test('should use a fence if there is an info', () => {
    expect(md2tid('```a\nb\n```\n')).toEqual('```a\nb\n```\n');
  });

  test('should use a fence if there is only whitespace', () => {
    expect(md2tid('```\n \n```\n')).toEqual('```\n \n```\n');
  });

  test('should use a fence if there first line is blank (void)', () => {
    expect(md2tid('```\n\na\n```\n')).toEqual('```\n\na\n```\n');
  });

  test('should use a fence if there first line is blank (filled)', () => {
    expect(md2tid('```\n \na\n```\n')).toEqual('```\n \na\n```\n');
  });

  test('should use a fence if there last line is blank (void)', () => {
    expect(md2tid('```\na\n\n```\n')).toEqual('```\na\n\n```\n');
  });

  test('should use a fence if there last line is blank (filled)', () => {
    expect(md2tid('```\na\n \n```\n')).toEqual('```\na\n \n```\n');
  });
});

describe('code (text)', () => {
  test('should support an empty code text', () => {
    expect(md2tid('``\n')).toEqual('``\n');
  });

  test('should support a code text', () => {
    expect(md2tid('`a`\n')).toEqual('`a`\n');
  });

  test('should support a space', () => {
    expect(md2tid('` `\n')).toEqual('` `\n');
  });

  test('should support an eol', () => {
    expect(md2tid('`\n`\n')).toEqual('`\n`\n');
  });

  test('should support several spaces', () => {
    expect(md2tid('`  `\n')).toEqual('`  `\n');
  });

  test('should use a fence of two grave accents if the value contains one', () => {
    expect(md2tid('``a`b``\n')).toEqual('``a`b``\n');
  });

  test('should use a fence of one grave accent if the value contains two', () => {
    expect(md2tid('`a``b`\n')).toEqual('`a``b`\n');
  });

  test('should use a fence of three grave accents if the value contains two and one', () => {
    expect(md2tid('```a``b`c```\n')).toEqual('```a``b`c```\n');
  });

  test('should pad w/ a space if the value starts w/ a grave accent', () => {
    expect(md2tid('`` `a ``\n')).toEqual('`` `a ``\n');
  });

  test('should pad w/ a space if the value ends w/ a grave accent', () => {
    expect(md2tid('`` a` ``\n')).toEqual('`` a` ``\n');
  });

  test('should pad w/ a space if the value starts and ends w/ a space', () => {
    expect(md2tid('`  a  `\n')).toEqual('`  a  `\n');
  });

  test('should not pad w/ spaces if the value ends w/ a non-space', () => {
    expect(md2tid('` a`\n')).toEqual('` a`\n');
  });

  test('should not pad w/ spaces if the value starts w/ a non-space', () => {
    expect(md2tid('`a `\n')).toEqual('`a `\n');
  });

  test('should prevent breaking out of code (#)', () => {
    expect(md2tid('`a #`\n')).toEqual('`a #`\n');
  });

  test('should prevent breaking out of code (!)', () => {
    expect(md2tid('`a !`\n')).toEqual('`a !`\n');
  });

  test('should prevent breaking out of code (\\d\\.)', () => {
    expect(md2tid('`a 1. `\n')).toEqual('`a 1. `\n');
  });

  test('should prevent breaking out of code (cr)', () => {
    expect(md2tid('`a -`\n')).toEqual('`a -`\n');
  });

  test('should prevent breaking out of code (crlf)', () => {
    expect(md2tid('`a -`\n')).toEqual('`a -`\n');
  });
});
