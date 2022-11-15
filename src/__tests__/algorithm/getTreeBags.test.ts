import { getTreeBags } from '../../algorithm/eliminationOrdering';
import { Edge, Graph } from '../../algorithm/graph';

describe('Get tree bags', () => {
  test('Complete graph returns a bag containing all vertices', () => {
    const vertices = [1, 2, 3, 4, 5, 6];
    const G = new Graph();
    G.addVertices(vertices);
    G.formClique(vertices);

    const bags = getTreeBags(G, vertices);
    for (let i = 0; i < bags.length; i++) {
      const bag = [...bags[i]];
      expect(bag.sort()).toEqual(vertices.slice(i).sort());
    }
  });

  /**
   *     1 -- 2
   *      \  / \
   *       3 -- 4
   */
  test('K_{2,1}', () => {
    const edges = [
      new Edge(1, 2),
      new Edge(1, 3),
      new Edge(2, 3),
      new Edge(2, 4),
      new Edge(3, 4),
    ];

    const G = new Graph(edges);
    const eliminationOrdering = [1, 2, 3, 4];
    const expectedBags = [
      new Set([1, 2, 3]),
      new Set([2, 3, 4]),
      new Set([3, 4]),
      new Set([4]),
    ];

    const bags = getTreeBags(G, eliminationOrdering);
    expect(bags).toEqual(expectedBags);
  });

  /**
   *     1 -- 2 -- 3 -- 4
   *      \  / \  / \  / \
   *       5 -- 6 -- 7 -- 8
   */
  test('Trianglulated latice', () => {
    const edges = [
      new Edge(1, 2),
      new Edge(1, 5),
      new Edge(2, 5),
      new Edge(2, 6),
      new Edge(2, 3),
      new Edge(3, 6),
      new Edge(3, 7),
      new Edge(3, 4),
      new Edge(4, 7),
      new Edge(4, 8),
      new Edge(5, 6),
      new Edge(6, 7),
      new Edge(7, 8),
    ];

    const G = new Graph(edges);
    const eliminationOrdering = [1, 5, 2, 6, 3, 7, 4, 8];
    const expectedBags = [
      new Set([1, 2, 5]),
      new Set([5, 2, 6]),
      new Set([2, 6, 3]),
      new Set([6, 3, 7]),
      new Set([3, 7, 4]),
      new Set([7, 4, 8]),
      new Set([4, 8]),
      new Set([8]),
    ];

    const bags = getTreeBags(G, eliminationOrdering);
    expect(bags).toEqual(expectedBags);
  });

  /**
   *     1 -- 2 -- 3 -- 4
   *     |    |    |    |
   *     5 -- 6 -- 7 -- 8
   */
  test('2 x 4 latice', () => {
    const edges = [
      new Edge(1, 2),
      new Edge(1, 5),
      new Edge(2, 6),
      new Edge(2, 3),
      new Edge(3, 7),
      new Edge(3, 4),
      new Edge(4, 8),
      new Edge(5, 6),
      new Edge(6, 7),
      new Edge(7, 8),
    ];

    const G = new Graph(edges);
    const eliminationOrdering = [1, 5, 2, 6, 3, 7, 4, 8];
    const expectedBags = [
      new Set([1, 2, 5]),
      new Set([5, 2, 6]),
      new Set([2, 6, 3]),
      new Set([6, 3, 7]),
      new Set([3, 7, 4]),
      new Set([7, 4, 8]),
      new Set([4, 8]),
      new Set([8]),
    ];

    const bags = getTreeBags(G, eliminationOrdering);
    expect(bags).toEqual(expectedBags);
  });

  /**
   *     1 --- 2 --- 3
   *     |     |     |
   *     4 --- 5 --- 6
   *     |     |     |
   *     7 --- 8 --- 9
   */

  test('3 x 3 latice', () => {
    const edges = [
      new Edge(1, 2),
      new Edge(1, 4),
      new Edge(2, 5),
      new Edge(2, 3),
      new Edge(3, 6),
      new Edge(4, 5),
      new Edge(4, 7),
      new Edge(5, 6),
      new Edge(5, 8),
      new Edge(6, 9),
      new Edge(7, 8),
      new Edge(8, 9),
    ];

    const G = new Graph(edges);
    const eliminationOrdering = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const expectedBags = [
      new Set([1, 2, 4]),
      new Set([2, 4, 5, 3]),
      new Set([3, 4, 5, 6]),
      new Set([4, 5, 6, 7]),
      new Set([5, 7, 8, 6]),
      new Set([6, 7, 8, 9]),
      new Set([7, 8, 9]),
      new Set([8, 9]),
      new Set([9]),
    ];

    const bags = getTreeBags(G, eliminationOrdering);
    expect(bags).toEqual(expectedBags);
  });
});
