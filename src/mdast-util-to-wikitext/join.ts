import type { Context, Join, Nodes, Parent } from './types';

import { formatCodeAsIndented } from './util/format-code-as-indented';

export const join: Join[] = [joinDefaults];

function joinDefaults(left: Nodes, right: Nodes, parent: Parent, context: Context): boolean | null | void | number {
  // 缩进代码后跟列表或另一个缩进代码。Indented code after list or another indented code.
  if (
    right.type === 'code' &&
    formatCodeAsIndented(right, context) &&
    (left.type === 'list' || (left.type === right.type && formatCodeAsIndented(left, context)))
  ) {
    return false;
  }

  // 两个列表使用相同的标记。Two lists with the same marker.
  if (
    left.type === 'list' &&
    left.type === right.type &&
    Boolean(left.ordered) === Boolean(right.ordered) &&
    !(left.ordered ? context.options.bulletOrderedOther : context.options.bulletOther)
  ) {
    return false;
  }

  // Join children of a list or an item.
  // In which case, `parent` has a `spread` field.
  // 连接列表或项目的子项。在这种情况下，`parent` 有一个 `spread` 字段。
  if ('spread' in parent && typeof parent.spread === 'boolean') {
    if (
      left.type === 'paragraph' &&
      // 两个段落。Two paragraphs.
      (left.type === right.type || right.type === 'definition')
    ) {
      return;
    }
    return parent.spread ? 1 : 0;
  }
}
