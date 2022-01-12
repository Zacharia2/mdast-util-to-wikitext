/**
 * @typedef {import('../types').Context} Context
 * @typedef {import('../types').Options} Options
 */

/**
 * @param {Context} context
 * @returns {Exclude<Options['fence'], undefined>}
 */
export function checkFence(context) {
  const marker = context.options.fence || '`';

  if (marker !== '`' && marker !== '~') {
    throw new Error('Cannot serialize code with `' + marker + '` for `options.fence`, expected `` ` `` or `~`');
  }

  return marker;
}
