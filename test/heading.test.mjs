import { md2tid } from '../dist/index.mjs';

describe('title', () => {
  test('render 1 level title3 ast', () => {
    expect(md2tid('### a b\n')).toEqual('!!! a b\n');
  });

  test('should serialize a heading w/o rank as a heading of rank 1', () => {
    expect(md2tid('#\n')).toEqual('!\n');
  });

  test('should serialize a heading w/ rank 7 as 6', () => {
    expect(md2tid('######\n')).toEqual('!!!!!!\n');
  });

  test('should serialize a heading w/ content', () => {
    expect(md2tid('# a\n')).toEqual('! a\n');
  });

  test('should serialize a heading w/ rank 3', () => {
    expect(md2tid('### a\n')).toEqual('!!! a\n');
  });

  test('should serialize an empty heading w/ rank 2 as atx', () => {
    expect(md2tid('##\n')).toEqual('!!\n');
  });

  test('should serialize a heading with a closing sequence when `closeAtx` (empty)', () => {
    expect(md2tid('# #\n')).toEqual('! !\n');
  });

  test('should serialize a with a closing sequence when `closeAtx` (content)', () => {
    expect(md2tid('### a ###\n')).toEqual('!!! a !!!\n');
  });

  test('should not escape a `#` at the start of phrasing in a heading', () => {
    expect(md2tid('## # a\n')).toEqual('!! # a\n');
  });

  test('should not escape a `1)` at the start of phrasing in a heading', () => {
    expect(md2tid('## 1) a\n')).toEqual('!! 1) a\n');
  });

  test('should not escape a `+` at the start of phrasing in a heading', () => {
    expect(md2tid('## + a\n')).toEqual('!! + a\n');
  });

  test('should not escape a `-` at the start of phrasing in a heading', () => {
    expect(md2tid('## - a\n')).toEqual('!! - a\n');
  });

  test('should not escape a `=` at the start of phrasing in a heading', () => {
    expect(md2tid('## = a\n')).toEqual('!! = a\n');
  });

  test('should not escape a `>` at the start of phrasing in a heading', () => {
    expect(md2tid('## > a\n')).toEqual('!! > a\n');
  });

  test('should escape a `#` at the end of a heading (1)', () => {
    expect(md2tid('# a #\n')).toEqual('! a #\n');
  });

  test('should escape a `#` at the end of a heading (2)', () => {
    expect(md2tid('# a ##\n')).toEqual('! a ##\n');
  });

  test('should not escape a `#` in a heading (2)', () => {
    expect(md2tid('# a # b\n')).toEqual('! a # b\n');
  });

  test('should not need to encode spaces around a line ending in an atx heading (because the line ending is encoded)', () => {
    expect(md2tid('### a 4 b\n')).toEqual('!!! a 4 b\n');
  });

  test('# to !', () => {
    expect(md2tid('# title 1\n')).toEqual('! title 1\n');
  });

  test('3 level #s to !s', () => {
    const md = `
# AAA

## BBB

### CCC

DDD
`;

    const tid = `! AAA

!! BBB

!!! CCC

DDD
`;
    expect(md2tid(md)).toEqual(tid);
  });
});
