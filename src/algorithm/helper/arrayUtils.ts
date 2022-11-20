import { Vertex } from '../graph';
import { mod } from './edgeIndexing';
import { random } from './randomness';

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

export function getMinBy<T>(weightFn: (element: T) => number, array: T[]) {
  let minElement = array[0];
  let minValue = weightFn(minElement);

  for (let element of array.slice(1)) {
    const currentValue = weightFn(element);
    if (currentValue < minValue) {
      minElement = element;
      minValue = currentValue;
    }
  }
  return minElement;
}

export function getMaxBy<T>(weightFn: (element: T) => number, array: T[]) {
  let maxElement = array[0];
  let maxValue = weightFn(maxElement);

  for (let element of array.slice(1)) {
    const currentValue = weightFn(element);
    if (currentValue > maxValue) {
      maxElement = element;
      maxValue = currentValue;
    }
  }
  return maxElement;
}

export function swapElements<T>(array: T[], i: number, j: number) {
  [array[i], array[j]] = [array[j], array[i]];
  return array;
}

export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let randomIndex;

  const arrayCopy = [...array];
  while (currentIndex > 0) {
    randomIndex = random(0, currentIndex--);
    swapElements(arrayCopy, currentIndex, randomIndex);
  }

  return arrayCopy;
}

export function pickByIndices<T>(indices: number[], items: T[]): T[] {
  const picked = [];
  for (let i of indices) {
    picked.push(items[i]);
  }
  return picked;
}

export function getNonEmptyIndices<T>(array: T[]): number[] {
  return array.reduce<number[]>((indices, item, index) => {
    if (item !== undefined) {
      indices.push(index);
    }
    return indices;
  }, []);
}
