import type { Conflict } from '../types';

/**
 * @param stack Context['stack']
 * @param pattern an conflict object, but we actually use its conflict['conflict'] and try find it in the stack.
 * @returns
 */
export function patternInScope(stack: string[], pattern: Conflict): boolean {
  // 一个 conflict 对象，但我们实际上使用它的 conflict['conflict'] 并尝试在堆栈中找到它。
  // stack和conflict list有什么关系呢？为啥要在栈中找到他呢？
  return listInScope(stack, pattern.conflict, true) && !listInScope(stack, pattern.notConflict, false);
}

function listInScope(stack: string[], list: Conflict['conflict'], none: boolean): boolean {
  // 查看栈中是否有list
  if (!list) return none;
  if (typeof list === 'string') list = [list];

  let index = -1;

  while (++index < list.length) {
    if (stack.includes(list[index])) return true;
  }

  return false;
}
