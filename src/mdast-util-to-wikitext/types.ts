import type { Nodes } from 'mdast';

export type UnistParent = import('unist').Parent;
export type { Nodes };
export type Parent = Extract<Nodes, UnistParent>;
export type SafeOptions = {
  before: string;
  after: string;
};
export type Enter = (type: string) => Exit;
export type Exit = () => void;
export type Context = {
  /**
   *   Stack of labels.
   */
  stack: string[];
  /**
   *   Positions of children in their parents.
   */
  indexStack: number[];
  /**
   * Add a type label to the context['stack'], and return a function that removes it from the stack.
   */
  enter: Enter;
  options: Options;
  conflict: Conflict[];
  join: Join[];
  handle?: Handle;
  handlers: Handlers;
  /**
   *   The marker used by the current list.
   */
  bullet: string;
  /**
   *   The marker used by the previous list.
   */
  bulletLastUsed?: string;
};
export type Handle = (node: any, parent: Parent | null | undefined, context: Context, safeOptions: SafeOptions) => string;
export type Handlers = Record<string, Handle>;
export type Join = (left: Nodes, right: Nodes, parent: Parent, context: Context) => boolean | null | void | number;
export type Conflict = {
  character: string;
  conflict?: string | string[] | undefined;
  notConflict?: string | string[] | undefined;
  after?: string | undefined;
  before?: string | undefined;
  atBreak?: boolean | undefined;
  /**
   * The conflict pattern compiled as a regex
   */
  _compiled?: RegExp | undefined;
};
export type Options = {
  bullet?: '-' | '*' | '+' | undefined;
  bulletOther?: '-' | '*' | '+' | undefined;
  bulletOrdered?: '.' | ')' | '#' | '1.' | undefined;
  bulletOrderedOther?: '.' | ')' | '#' | '1.' | undefined;
  closeAtx?: boolean | undefined;
  italic?: '//' | '_' | undefined;
  fence?: '~' | '`' | undefined;
  fences?: boolean | undefined;
  incrementListMarker?: boolean | undefined;
  listItemIndent?: 'tab' | 'one' | 'mixed' | undefined;
  resourceLink?: boolean | undefined;
  separateLineMarker?: '-' | '*' | '_' | undefined;
  separateLineRepetition?: number | undefined;
  separateLineSpaces?: boolean | undefined;
  strong?: "''" | '_' | undefined;
  tightDefinitions?: boolean | undefined;
  extensions?: Options[] | undefined;
  handlers?: Handlers | undefined;
  join?: Join[] | undefined;
  conflict?: Conflict[] | undefined;
};
