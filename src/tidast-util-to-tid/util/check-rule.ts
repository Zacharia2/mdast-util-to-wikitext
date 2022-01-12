/**
 * @typedef {import('../types').Context} Context
 * @typedef {import('../types').Options} Options
 */

/**
 * @param {Context} context
 * @returns {Exclude<Options['rule'], undefined>}
 */
export function checkRule(context) {
  const marker = context.options.rule || '*';

  if (marker !== '*' && marker !== '-' && marker !== '_') {
    throw new Error('Cannot serialize rules with `' + marker + '` for `options.rule`, expected `*`, `-`, or `_`');
  }

  return marker;
}
