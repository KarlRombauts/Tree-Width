import { Edge } from '../../algorithm/graph';
import { createNeighboursIndex } from '../../algorithm/utils';

describe('Neighbours', () => {
  test('graph with single edge adds neighbour for both vertices', () => {
    const edges = [new Edge(1, 2, 10)];
    const actual = createNeighboursIndex(edges);
    const expected = {
      [1]: [2],
      [2]: [1],
    };
    expect(actual).toEqual(expected);
  });
  test('graph with duplicate edge adds neighbour twice for both vertices', () => {
    const edges = [new Edge(1, 2, 10), new Edge(1, 2, 10)];
    const actual = createNeighboursIndex(edges);
    const expected = {
      [1]: [2, 2],
      [2]: [1, 1],
    };
    expect(actual).toEqual(expected);
  });

  test('graph with multiple edges adds neighbours for all vertices', () => {
    const edges = [
      new Edge(1, 2, 10),
      new Edge(1, 3, 10),
      new Edge(2, 3, 10),
      new Edge(4, 3, 10),
    ];
    const actual = createNeighboursIndex(edges);
    const expected = {
      [1]: [2, 3],
      [2]: [1, 3],
      [3]: [1, 2, 4],
      [4]: [3],
    };
    expect(actual).toEqual(expected);
  });
});
