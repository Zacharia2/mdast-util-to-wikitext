import { checkBullet } from '../util/check-bullet.js';
import { checkListItemIndent } from '../util/check-list-item-indent.js';
import { ListItem, Parents } from 'mdast';
import { Info, Map, State } from '../types';

export function listItem(node: ListItem, parent: Parents | undefined, state: State, info: Info): string {
  const listItemIndent = checkListItemIndent(state);
  let bullet = state.bulletCurrent || checkBullet(state);

  // 为有序列表添加标记值
  if (parent && parent.type === 'list' && parent.ordered) {
    bullet =
      (typeof parent.start === 'number' && parent.start > -1 ? parent.start : 1) +
      (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) +
      bullet;
  }

  let size = bullet.length + 1;

  if (listItemIndent === 'tab' || (listItemIndent === 'mixed' && ((parent && parent.type === 'list' && parent.spread) || node.spread))) {
    size = Math.ceil(size / 4) * 4;
  }

  const tracker = state.createTracker(info);
  tracker.move(bullet + ' '.repeat(size - bullet.length));
  tracker.shift(size);
  const exit = state.enter('listItem');
  const map: Map = function map(line, index, blank) {
    if (index) {
      return (blank ? '' : ' '.repeat(size)) + line;
    }

    return (blank ? bullet : bullet + ' '.repeat(size - bullet.length)) + line;
  };
  const value = state.indentLines(state.containerFlow(node, tracker.current()), map);
  exit();

  return value;
}
