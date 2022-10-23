import { Edge } from '../../../algorithm/graph';
import { pathToEdges } from '../../../algorithm/helper/path';

describe('Path utils', () => {
  const edges = [
    new Edge(0, 1, 1),
    new Edge(1, 2, 1),
    new Edge(1, 3, 1),
    new Edge(2, 3, 1),
  ];
  test('Converts 2 vertex path to single edge', () => {
    const path = [0, 1];
    const pathEdges = pathToEdges(edges, path);
    expect(pathEdges).toEqual([edges[0]]);
  });

  test('Converts 2 vertex reversed path to single edge', () => {
    const path = [1, 0];
    const pathEdges = pathToEdges(edges, path);
    expect(pathEdges).toEqual([edges[0]]);
  });
});
