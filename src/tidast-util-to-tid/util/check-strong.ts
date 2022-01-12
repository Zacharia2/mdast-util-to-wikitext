/**
 * @typedef {import('../types').Context} Context
 * @typedef {import('../types').Options} Options
 */

/**
 * @param {Context} context
 * @returns {Exclude<Options['strong'], undefined>}
 */
export function checkStrong(context) {
  const marker = context.options.strong || '*';

  if (marker !== '*' && marker !== '_') {
    throw new Error('Cannot serialize strong with `' + marker + '` for `options.strong`, expected `*`, or `_`');
  }

  return marker;
}
