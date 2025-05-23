import { LinkReference, Parents } from 'mdast';
import { Info, State } from '../types';

linkReference.peek = linkReferencePeek;

// LinkReference: 链接引用变量的节点，结合 Definition 使用
// [alt][label]
// [label]: url "title"
// [ext[alt|url]]
export function linkReference(node: LinkReference, _: Parents | undefined, state: State, info: Info): string {
  const type = node.referenceType;
  const exit = state.enter('linkReference');
  let subexit = state.enter('label');
  const tracker = state.createTracker(info);
  let value = tracker.move('[ext[');
  const alt = state.containerPhrasing(node, {
    before: value,
    after: '|',
    ...tracker.current(),
  });

  // 如果alt为空，则直接使用url
  if (alt !== '') {
    value += tracker.move(alt + '|');
  }

  subexit();
  // Hide the fact that we’re in phrasing, because escapes don’t work.
  const stack = state.stack;
  state.stack = [];
  subexit = state.enter('reference');
  // Note: for proper tracking, we should reset the output positions when we end
  // up making a `shortcut` reference, because then there is no brace output.
  // Practically, in that case, there is no content, so it doesn’t matter that
  // we’ve tracked one too many characters.
  const reference = state.safe(state.memo.get('definition')?.get(state.associationId(node)) || state.associationId(node), {
    before: value,
    after: ']]',
    ...tracker.current(),
  });
  subexit();
  state.stack = stack;
  exit();

  if (type === 'full' || !alt || alt !== reference) {
    value += tracker.move(reference + ']]');
  } else if (type === 'shortcut' && alt !== '') {
    // Remove the unwanted `|`.
    value = value.slice(0, -1);
    value += tracker.move(']]');
  } else {
    value += tracker.move(']]');
  }

  return value;
}

function linkReferencePeek(): string {
  return '[ext[';
}
