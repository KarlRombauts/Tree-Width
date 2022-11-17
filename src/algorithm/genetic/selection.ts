import { zip } from 'ramda';
import { getMaxBy, pickByIndices } from '../helper/arrayUtils';
import { randomIndices } from '../helper/randomness';

export function selection<T>(
  population: T[][],
  scores: number[],
  tournamentSize = 3,
) {
  return population.map(() => tournament(population, scores, tournamentSize));
}

export function tournament<T>(
  population: T[][],
  scores: number[],
  tournamentSize = 3,
) {
  const indices = randomIndices(population.length, tournamentSize);
  const pairs = zip(population, scores);
  const pickedPairs = pickByIndices(indices, pairs);
  const [best, _] = getMaxBy((pair) => pair[1], pickedPairs);
  return best;
}
