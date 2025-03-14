import type { Context, Parent, SafeOptions } from '../types';

export function containerPhrasing(parent: Parent, context: Context, safeOptions: SafeOptions): string {
  const children = parent.children || [];
  const results: string[] = [];
  let { after, before } = safeOptions;

  // peek是用来返回标记的。
  for (const child of children) {
    // 在某些情况下，HTML（文本）可能会在换行符之后直接出现在短语中。
    // 当我们进行序列化时，大多数情况下这会被认为是HTML（流）。 因为我们无法通过转义等方式来避免这种情况，
    // 所以我们采取了一种比较合理的方法：将换行符替换为空格。
    // 详见：https://github.com/syntax-tree/mdast-util-to-markdown/issues/15
    if (results.length > 0 && (before === '\r' || before === '\n') && child.type === 'html') {
      results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, ' ');
      before = ' ';
    }
    // @ts-expect-error: hush, it’s actually a `zwitch`.
    results.push(context.handle(child, parent, context, { before, after }));
  }

  return results.join('');
}
