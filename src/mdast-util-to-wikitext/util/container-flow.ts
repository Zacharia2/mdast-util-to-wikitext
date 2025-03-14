import type { Context, Nodes, Parent } from '../types';

export function containerFlow(parent: Parent, context: Context): string {
  const children = parent.children || [];
  const results: string[] = [];

  for (const [index, child] of children.entries()) {
    context.handle && results.push(context.handle(child, parent, context, { before: '\n', after: '\n' }));
    if (index < children.length - 1) {
      let curr = children[index];
      let next = children[index + 1];
      results.push(between(curr, next, parent, context));
    }
  }
  return results.join('');
}

function between(left: Nodes, right: Nodes, parent: Parent, context: Context): string {
  // "Happy! ".repeat(3) Expected output: "Happy! Happy! Happy! "
  for (const join of context.join) {
    const result = join(left, right, parent, context);
    if (result === true || result === 1) break;
    if (typeof result === 'number') {
      return '\n'.repeat(1 + result);
    }
  }
  return '\n\n';
}
