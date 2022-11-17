import { range, without } from 'ramda';
import { randomRange, Range } from '../helper/randomness';

export function orderCrossover<T>(listA: T[], listB: T[], _range?: Range): T[] {
  if (!_range) {
    _range = randomRange(listA.length);
  }
  const { i: start, j: end } = _range;
  const keepFromA = listA.slice(start, end);
  const keepFromB = without(keepFromA, listB);

  const indicesA = keepFromA.map((item) => listA.indexOf(item));
  const indicesB = without(indicesA, range(0, listA.length));

  const output: T[] = [];

  for (let i = 0; i < indicesA.length; i++) {
    output[indicesA[i]] = keepFromA[i];
  }

  for (let i = 0; i < indicesB.length; i++) {
    output[indicesB[i]] = keepFromB[i];
  }

  return output;
}
