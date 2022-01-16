import type { InlineCode } from 'mdast';
import type { Context, Parent, SafeOptions } from '../types';

import { patternCompile } from '../util/pattern-compile';

inlineCode.peek = inlineCodePeek;

export function inlineCode(node: InlineCode, parent: Parent | null | undefined, context: Context, safeOptions: SafeOptions) {
  let value = node.value || '';
  let sequence = '`';
  let index = -1;

  // If there is a single grave accent on its own in the code, use a fence of
  // two.
  // If there are two in a row, use one.
  while (new RegExp('(^|[^`])' + sequence + '([^`]|$)').test(value)) {
    sequence += '`';
  }

  // If this is not just spaces or eols (tabs don’t count), and either the
  // first or last character are a space, eol, or tick, then pad with spaces.
  if (/[^ \r\n]/.test(value) && ((/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value)) || /^`|`$/.test(value))) {
    value = ' ' + value + ' ';
  }

  // We have a potential problem: certain characters after eols could result in
  // blocks being seen.
  // For example, if someone injected the string `'\n# b'`, then that would
  // result in an ATX heading.
  // We can’t escape characters in `inlineCode`, but because eols are
  // transformed to spaces when going from markdown to HTML anyway, we can swap
  // them out.
  while (++index < context.conflict.length) {
    const pattern = context.conflict[index];
    const expression = patternCompile(pattern);
    let match: RegExpExecArray | null;

    // Only look for `atBreak`s.
    // Btw: note that `atBreak` patterns will always start the regex at LF or
    // CR.
    if (!pattern.atBreak) continue;

    while ((match = expression.exec(value))) {
      let position = match.index;

      // Support CRLF (patterns only look for one of the characters).
      if (value.charCodeAt(position) === 10 /* `\n` */ && value.charCodeAt(position - 1) === 13 /* `\r` */) {
        position--;
      }

      value = value.slice(0, position) + ' ' + value.slice(match.index + 1);
    }
  }

  return sequence + value + sequence;
}

function inlineCodePeek() {
  return '`';
}
