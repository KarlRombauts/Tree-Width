import { Vertex } from '../graph';
import { mod } from './edgeIndexing';

export function getDuplicates<T>(array: T[]): T[] {
  const seen = new Set<T>();
  const duplicates = array.filter((n) => {
    const prevSize = seen.size;
    seen.add(n);
    // If the size of the seen set does not increase,
    // then we have already seen the element
    return seen.size === prevSize;
  });
  return duplicates;
}

export function remove<T>(array: T[], value: T) {
  var index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

function containsShortcutAtIndex(
  path: Vertex[],
  shortcut: Vertex[],
  index: number,
) {
  const [prev, current, next] = shortcut;

  const prevIndex = mod(index - 1, path.length);
  const currentIndex = index;
  const nextIndex = mod(index + 1, path.length);

  return (
    prev === path[prevIndex] &&
    current === path[currentIndex] &&
    next === path[nextIndex]
  );
}

function getIndexesToRemove(path: Vertex[], shortcuts: Vertex[][]) {
  const indexes = new Set<number>();
  for (let shortcut of shortcuts) {
    for (let i = 0; i < path.length; i++) {
      if (containsShortcutAtIndex(path, shortcut, i)) {
        indexes.add(i);
        break;
      }
    }
  }
  return indexes;
}

export function applyShortcuts(path: Vertex[], shortcuts: Vertex[][]) {
  const indexes = getIndexesToRemove(path, shortcuts);
  const sortedIndexes = [...indexes].sort((a, b) => b - a);
  const outputPath = [...path];
  sortedIndexes.forEach((i) => {
    outputPath.splice(i, 1);
  });
  return outputPath;
}
