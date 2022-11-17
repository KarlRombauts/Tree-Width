import { range } from 'ramda';
import {
  getDuplicates,
  pickByIndices,
  shuffle,
} from '../../../algorithm/helper/arrayUtils';

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

  test.each([range(0, 10), range(10, 100), range(1, 2)])(
    'Shuffle does not delete any elements',
    (...array: number[]) => {
      expect(shuffle(array).sort()).toEqual(array);
    },
  );

  test('Shuffle does not preserve order', () => {
    const array = range(0, 10_000); // sufficiently large array that it is highly unlikely to remain ordered
    expect(shuffle(array)).not.toEqual(array);
  });

  test.each([
    [
      [0, 1, 2, 3, 4, 5],
      [5, 2, 3],
    ],
    [
      ['a', 'b', 'c', 'd', 'e'],
      [0, 1, 2, 4],
    ],
  ])(
    'pick by indices picks items from list',
    (array: any[], indices: number[]) => {
      const pickedItems = pickByIndices(indices, array);

      for (let item of pickedItems) {
        expect(array).toContain(item);
      }
    },
  );
  test.each([
    [
      [0, 1, 2, 3, 4, 5],
      [5, 2, 3],
    ],
    [
      ['a', 'b', 'c', 'd', 'e'],
      [0, 1, 2, 4],
    ],
  ])(
    'pick by indices picks correct items',
    (array: any[], indices: number[]) => {
      const pickedItems = pickByIndices(indices, array);

      for (let i = 0; i < indices.length; i++) {
        const expected = array[indices[i]];
        const actual = pickedItems[i];
        expect(actual).toBe(expected);
      }

      expect(pickedItems.length).toBe(indices.length);
    },
  );
});
