import { Edge } from '../../algorithm/graph';
import { buildAdjacencyList } from '../../algorithm/utils';

describe('Adjacency List', () => {
  test('Single edge to adjacency list', () => {
    const edges = [new Edge(0, 1, 10)];
    const adjacencyList = buildAdjacencyList(edges);
    const expected = {
      [0]: { [1]: 10 },
      [1]: { [0]: 10 },
    };
    expect(adjacencyList).toEqual(expected);
  });

  test('three edges to adjacency list', () => {
    const edges = [new Edge(0, 1, 10), new Edge(2, 0, 5), new Edge(1, 2, 7)];
    const adjacencyList = buildAdjacencyList(edges);
    const expected = {
      [0]: {
        [1]: 10,
        [2]: 5,
      },
      [1]: {
        [0]: 10,
        [2]: 7,
      },
      [2]: {
        [1]: 7,
        [0]: 5,
      },
    };
    expect(adjacencyList).toEqual(expected);
  });
});
