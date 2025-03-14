import { md2tid } from '../dist/index.mjs';

describe('html', () => {
  test('should support a void html', () => {
    expect(md2tid('')).toEqual('');
  });
  test('should support an empty html', () => {
    expect(md2tid('')).toEqual('');
  });
  test('should support html', () => {
    expect(md2tid('a\nb\n')).toEqual('a\nb\n');
  });

  test('should prevent html (text) from becoming html (flow) (1)', () => {
    expect(md2tid('a <div>\n')).toEqual('a <div>\n');
  });

  test('should prevent html (text) from becoming html (flow) (2)', () => {
    expect(md2tid('a <div>\n')).toEqual('a <div>\n');
  });

  test('should prevent html (text) from becoming html (flow) (3)', () => {
    expect(md2tid('a <div>\n')).toEqual('a <div>\n');
  });

  test('should serialize html (text)', () => {
    expect(md2tid('<x>a\n')).toEqual('<x>a\n');
  });
});
