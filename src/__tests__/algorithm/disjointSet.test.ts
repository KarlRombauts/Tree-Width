import { range } from 'ramda';
import { DisjointSet } from '../../algorithm/disjointSet';

describe('Disjoint Set', () => {
  let disjointSet: DisjointSet;
  beforeEach(() => {
    disjointSet = new DisjointSet(range(0, 20));
  });
  test.each([
    [5, 5],
    [10, 10],
    [20, 20],
    [50, 50],
  ])('given %p elements, initialised as %p separate groups', (n: number) => {
    const disjointSet = new DisjointSet(range(0, n));
    for (let i = 1; i < n; i++) {
      disjointSet.find(i) === i;
    }
  });

  test.each([
    [1, 2],
    [2, 1],
    [2, 5],
    [1, 1],
    [2, 2],
  ])('Union of %p and %p results in same set membership', (n: number) => {
    const disjointSet = new DisjointSet(range(0, n));
    for (let i = 1; i < n; i++) {
      disjointSet.find(i) === i;
    }
  });

  test.each([
    [1, 2],
    [2, 1],
    [2, 5],
    [3, 7],
  ])(
    'Before unioning, elements %p and %p are not in the same set',
    (a: number, b: number) => {
      expect(disjointSet.isSameSet(a, b)).toBeFalsy();
    },
  );

  test.each([
    [1, 2],
    [2, 1],
    [2, 5],
    [1, 1],
    [2, 2],
  ])(
    'Union of %p and %p results in same set membership',
    (a: number, b: number) => {
      disjointSet.union(a, b);
      expect(disjointSet.isSameSet(a, b)).toBeTruthy();
    },
  );

  test.each([
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [5, 2, 1, 4, 3],
  ])(
    'Union of %p, %p, %p, %p, and %p results in same set membership',
    (...elements: number[]) => {
      for (let i = 0; i < elements.length - 1; i++) {
        disjointSet.union(elements[i], elements[i + 1]);
      }
      for (let i = 0; i < elements.length; i++) {
        disjointSet.isSameSet(elements[i], elements[i + 1]);
      }
    },
  );
});
