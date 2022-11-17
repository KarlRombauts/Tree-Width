import { range, uniq } from 'ramda';
import {
  randomRange,
  //   getRandomIndices,
  random,
  randomIndices,
} from '../../../algorithm/helper/randomness';

describe('Randomness utils', () => {
  test.each([
    [0, 10],
    [30, 40],
    [0, 1000],
    [0, 1],
  ])('Random produces a random number in a range [%d, %d)', (min, max) => {
    const randomNum = random(min, max);
    for (let _ of range(0, 1000)) {
      expect(randomNum).toBeGreaterThanOrEqual(min);
      expect(randomNum).toBeLessThan(max);
    }
  });
  describe('Random Range', () => {
    test.each([2, 3, 4, 10, 20, 100, 1000, 10_000, 1_000_000])(
      'start and end ranges that are not the same for length: %d',
      (length: number) => {
        const { i: start, j: end } = randomRange(length);
        expect(start !== end).toBeTruthy();
      },
    );
    test.each([2, 3, 4, 10, 20, 100, 1000, 10_000, 1_000_000])(
      'start and end are correctly ordered: %d',
      (length: number) => {
        const { i: start, j: end } = randomRange(length);
        expect(start).toBeLessThan(end);
      },
    );
  });

  test.each([
    [3, 2],
    [4, 3],
    [10, 4],
    [20, 10],
    [100, 20],
    [1000, 40],
    [10_000, 100],
    [1_000_000, 300],
  ])(
    'randomIndices() that are not the same for length: %d',
    (length: number, amount: number) => {
      const indices = randomIndices(length, amount);
      expect(indices.length).toBe(uniq(indices).length);
      expect(indices.length).toBe(amount);
    },
  );
});
