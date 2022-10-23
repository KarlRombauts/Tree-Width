import { getDuplicates } from '../../../algorithm/helper/arrayUtils';

describe('Duplicates', () => {
  test.each([
    [[1, 1], [1]],
    [[1, 2, 3, 4, 2], [2]],
    [
      [1, 3, 3, 4, 4],
      [3, 4],
    ],
  ])('duplicates(%i) outputs %i', (array: number[], expected: number[]) => {
    expect(getDuplicates(array)).toEqual(expected);
  });
});
