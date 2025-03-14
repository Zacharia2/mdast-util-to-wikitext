import { zwitch } from 'zwitch';
import { configure } from './util/configure';
import { handle } from './handle';
import { join } from './join';
import { conflict } from './util/conflicts';
import type { Context, Handle, Nodes, Options } from './types';

export * from './types';

export function toTid(tree: Nodes, options: Options = {}): string {
  const context: Context = {
    enter,
    stack: [],
    conflict: [],
    join: [],
    handlers: {},
    options: {},
    indexStack: [],
    bullet: '',
  };

  configure(context, { conflict, join, handlers: handle });
  configure(context, options);
  if (context.options.tightDefinitions) configure(context, { join: [joinDefinition] });

  // @ts-expect-error: unknown type from zwitch
  context.handle = zwitch<Handle>('type', { invalid, unknown, handlers: context.handlers });
  let result = context.handle(tree, null, context, { before: '\n', after: '\n' });

  if (result && result.charCodeAt(result.length - 1) !== 10 && result.charCodeAt(result.length - 1) !== 13) {
    result += '\n';
  }
  return result;

  // 栈闭包
  function enter(typeName: string) {
    context.stack.push(typeName);
    return function exit() {
      context.stack.pop();
    };
  }
}

function invalid(value: Nodes): void {
  throw new Error('Cannot handle value `' + value + '`, expected node');
}

function unknown(node: Nodes): void {
  throw new Error('Cannot handle unknown node `' + node.type + '`');
}

function joinDefinition(left: Nodes, right: Nodes) {
  // No blank line between adjacent definitions.
  if (left.type === 'definition' && left.type === right.type) {
    return 0;
  }
}
