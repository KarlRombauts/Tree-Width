import { insert, remove } from 'ramda';
import { swapElements } from '../helper/arrayUtils';
import { randomRange, Range } from '../helper/randomness';

export function exchangeMutation<T>(list: T[], indices?: Range): T[] {
  if (list.length <= 2) {
    return list;
  }
  if (!indices) {
    indices = randomRange(list.length - 1);
  }
  const { i, j } = indices;

  return swapElements([...list], i, j);
}

export function insertionMutation<T>(list: T[], indices?: Range): T[] {
  if (list.length <= 2) {
    return list;
  }
  if (!indices) {
    indices = randomRange(list.length);
  }
  const { i, j } = indices;

  const element = list[i];
  const listWithout = remove(i, 1, [...list]);
  return insert(j, element, listWithout);
}
