import {
  exchangeMutation,
  insertionMutation,
} from '../../../algorithm/genetic/mutation';
import { Range } from '../../../algorithm/helper/randomness';
describe('Mutation', () => {
  test.each([
    [[0, 1, 2, 3, 4, 5], { i: 1, j: 4 }, [0, 2, 3, 4, 1, 5]],
    [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      { i: 8, j: 2 },
      [0, 1, 8, 2, 3, 4, 5, 6, 7, 9, 10],
    ],
  ])(
    'insertion mutation preserves all elements',
    (array: number[], range: Range, expected: number[]) => {
      const mutated = insertionMutation(array, range);
      expect(mutated).not.toEqual(array);
      expect(mutated).toEqual(expected);
      expect(mutated[range.j]).toBe(array[range.i]);
    },
  );
  test.each([
    [[0, 1, 2, 3, 4, 5], { i: 1, j: 4 }, [0, 4, 2, 3, 1, 5]],
    [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      { i: 8, j: 2 },
      [0, 1, 8, 3, 4, 5, 6, 7, 2, 9, 10],
    ],
  ])(
    'Exchange mutation preserves all elements',
    (array: number[], range: Range, expected: number[]) => {
      const mutated = exchangeMutation(array, range);
      expect(mutated).not.toEqual(array);
      expect(mutated).toEqual(expected);
      expect(mutated[range.j]).toBe(array[range.i]);
      expect(mutated[range.i]).toBe(array[range.j]);
    },
  );
});
