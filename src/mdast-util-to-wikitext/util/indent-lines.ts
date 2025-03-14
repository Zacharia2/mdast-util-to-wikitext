export type Map = (value: string, blank: boolean) => string;

// TODO 就是这个的问题！！！
// 是因为一个listitem下有不同类型的children。导致的问题。
// "item 2    list/listItem/paragraph\n#* item 2.1     list/listItem/list/listItem/paragraph\n** asdfasdf    list/listItem/list/listItem/paragraph"
// 应该规范这个函数的行为。非这函数不做的事情不做。对于判断是否已经处理结点的事情交给调用者
// \n换行是一个分隔符，这里面的列表都需要进行map。
export function indentLines(value: string, map: Map): string {
  const result: string[] = [];
  const eol = /\r?\n|\r/g; // 换行符
  let match: RegExpExecArray | null;
  let start = 0;

  // 通过换行符分割字符串为数组然后用map处理。match.index第一次出现eol的位置。match[0]是分隔符，start是eol+分隔符的长度，没有之后直接one处理结尾
  while ((match = eol.exec(value))) {
    one(value.slice(start, match.index));
    result.push(match[0]);
    start = match.index + match[0].length;
  }
  one(value.slice(start));

  return result.join('');

  function one(value: string): void {
    result.push(map(value, value === ''));
  }
}
