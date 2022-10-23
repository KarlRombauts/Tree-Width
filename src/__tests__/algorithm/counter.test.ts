import { Counter } from '../../algorithm/utils';

describe('Counter', () => {
  let counter: Counter;

  beforeEach(() => {
    counter = new Counter();
  });

  test.each([
    [1, 3],
    [3, -5],
    [4, 0],
  ])("Sets element %p's count to %p", (x: number, count: number) => {
    counter.set(x, count);
    expect(counter.get(x)).toBe(count);
  });

  test.each([
    [1, 0, 1],
    [2, -10, -9],
    [3, -1, 0],
    [4, 1, 2],
    [4, 10, 11],
  ])(
    'correctly increments element %p, from value %p to value %p',
    (x: number, count: number, expected: number) => {
      counter.set(x, count);
      counter.increment(x);
      expect(counter.get(x)).toBe(expected);
    },
  );

  test('correctly increments non-existent element', () => {
    counter.increment(10);
    expect(counter.get(10)).toBe(1);
  });

  test.each([
    [1, 0, -1],
    [2, -10, -11],
    [3, -1, -2],
    [4, 1, 0],
    [4, 10, 9],
  ])(
    'correctly decrements element %p, from value %p to value %p',
    (x: number, count: number, expected: number) => {
      counter.set(x, count);
      counter.decrement(x);
      expect(counter.get(x)).toBe(expected);
    },
  );

  test('correctly decrements non-existent element', () => {
    counter.decrement(10);
    expect(counter.get(10)).toBe(-1);
  });

  test('count of non-existent element is 0', () => {
    expect(counter.get(1)).toBe(0);
  });
});
