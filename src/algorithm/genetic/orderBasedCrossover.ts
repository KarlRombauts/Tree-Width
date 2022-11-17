import { range, without } from 'ramda';
import { pickByIndices } from '../helper/arrayUtils';
import { random, randomIndices } from '../helper/randomness';

export function orderBasedCrossover<T>(
  listA: T[],
  listB: T[],
  indices?: number[],
): T[] {
  if (!indices) {
    indices = randomIndices(listA.length, random(0, listA.length));
  }
  indices.sort();

  const keepFromA = pickByIndices(indices, listA);
  const keepFromB = without(keepFromA, listB);

  const indicesB = keepFromB.map((item) => listB.indexOf(item));
  const indicesA = without(indicesB, range(0, listA.length));

  const output = [];

  for (let i = 0; i < indicesA.length; i++) {
    output[indicesA[i]] = keepFromA[i];
  }

  for (let i = 0; i < indicesB.length; i++) {
    output[indicesB[i]] = keepFromB[i];
  }

  return output;
}
