import { range } from 'ramda';
import { orderBasedCrossover } from '../../../algorithm/genetic/orderBasedCrossover';
import { orderCrossover } from '../../../algorithm/genetic/orderCrossover';
import { shuffle } from '../../../algorithm/helper/arrayUtils';
describe('Order Crossover', () => {
  test.each([
    [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], { i: 0, j: 3 }, [1, 2, 3, 5, 4]],
    [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], { i: 3, j: 5 }, [3, 2, 1, 4, 5]],
    [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [8, 7, 6, 5, 4, 3, 2, 1],
      { i: 3, j: 6 },
      [8, 7, 3, 4, 5, 6, 2, 1],
    ],
  ])('slice produces correct output', (listA, listB, range, expected) => {
    expect(orderCrossover(listA, listB, range)).toEqual(expected);
  });

  test.each([
    [
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
    ],
    [
      [1, 2, 3, 4, 5, 6],
      [6, 5, 4, 3, 2, 1],
    ],
    [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [8, 7, 6, 5, 4, 3, 2, 1],
    ],
  ])('slice preserves all items', (listA, listB) => {
    expect(orderCrossover(listA, listB).sort()).toEqual(listA.sort());
    expect(orderCrossover(listA, listB).sort()).toEqual(listB.sort());
  });
});

describe('Order based crossover', () => {
  test.each([
    [
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
      [2, 3],
      [5, 3, 4, 2, 1],
    ],
    [
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
      [3, 2],
      [5, 3, 4, 2, 1],
    ],
    [
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
      [0, 1, 2, 3, 4],
      [1, 2, 3, 4, 5],
    ],
    [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [], [5, 4, 3, 2, 1]],
  ])('slice produces correct output', (listA, listB, indices, expected) => {
    expect(orderBasedCrossover(listA, listB, indices)).toEqual(expected);
  });

  test.each([
    [
      range(0, 10),
      range(0, 100),
      range(50, 60),
      range(0, 1000),
      range(0, 1_000_000),
    ],
  ])(
    'orderBasedCrossover with two identical parents produces same child',
    (listA) => {
      for (let _ of range(0, 1000)) {
        const shuffled = shuffle(listA);
        expect(orderBasedCrossover([...shuffled], [...shuffled])).toEqual(
          shuffled,
        );
      }
    },
  );

  test.each([[range(0, 10), range(0, 100), range(50, 60)]])(
    'orderCrossover with two identical parents produces same child',
    (listA) => {
      for (let _ of range(0, 1000)) {
        expect(orderCrossover(listA, listA)).toEqual(listA);
      }
    },
  );
});
