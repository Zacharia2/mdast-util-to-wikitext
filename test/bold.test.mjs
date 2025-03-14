import { md2tid, toString } from '../dist/index.mjs';

describe('bold', () => {
  test('should support an empty bold', () => {
    expect(toString({ type: 'strong' })).toEqual(`''''\n`);
  });

  test('should support a strong w/ children', () => {
    const tidResult = toString({ type: 'strong', children: [{ type: 'text', value: 'a' }] });
    expect(tidResult).toEqual(`''a''\n`);
  });

  test('should transform strong to bold', () => {
    expect(md2tid('**asdf**')).toEqual(`''asdf''\n`);
  });
});
