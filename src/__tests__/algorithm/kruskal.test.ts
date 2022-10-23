// import { Graph } from '../../algorithm/graph';

import { Edge, Graph } from '../../algorithm/graph';
import { kruskalMST } from '../../algorithm/kruskal';

describe('Finding MST using Kruskal', () => {
  //     7        2
  //     ^       ^
  //      \     /
  //       \   /
  //        \ /
  // 6 <-----1------> 3
  //        / \
  //       /   \
  //      /     \
  //     v       v
  //    5        4

  test('Returns all edges of a graph that is already a MST', () => {
    const edges = [
      new Edge(1, 2, 0),
      new Edge(1, 3, 0),
      new Edge(1, 4, 0),
      new Edge(1, 5, 0),
      new Edge(1, 6, 0),
      new Edge(1, 7, 0),
    ];
    const graph = new Graph(edges);

    const result = kruskalMST(graph);

    expect(result).toEqual(edges);
  });

  //    7        2
  //     ^ ----> ^
  //    ^ \     / \
  //   /   \   /   \
  //  /     \ /     v
  // 6 <-----1------> 3
  //  ^     / \     /
  //   \   /   \   /
  //    \ /     \ v
  //     v <---- v
  //    5        4
  // Outer edges all are weight 2
  // Inner edges all are weight 1

  test('Kruskal Returns the inner edges of the above graph', () => {
    const innerEdges = [
      new Edge(1, 2, 1),
      new Edge(1, 3, 1),
      new Edge(1, 4, 1),
      new Edge(1, 5, 1),
      new Edge(1, 6, 1),
      new Edge(1, 7, 1),
    ];

    const outerEdges = [
      new Edge(2, 3, 2),
      new Edge(3, 4, 2),
      new Edge(4, 5, 2),
      new Edge(5, 6, 2),
      new Edge(6, 7, 2),
      new Edge(7, 2, 2),
    ];

    const graph = new Graph([...innerEdges, ...outerEdges]);

    const result = kruskalMST(graph);

    expect(result).toEqual(innerEdges);
  });

  //    7        2
  //     ^       ^
  //    ^ \     / \
  //   /   \   /   \
  //  /     \ /     v
  // 6 <-----1------> 3
  //  ^     / \     /
  //   \   /   \   /
  //    \ /     \ v
  //     v <---- v
  //    5        4
  // Outer edges and edge(1, 2) all are weight 1 and
  // all other edges all are weight 2

  test('Kruskal Returns the outer edges of the above graph', () => {
    const other = [
      new Edge(1, 3, 2),
      new Edge(1, 4, 2),
      new Edge(1, 5, 2),
      new Edge(1, 6, 2),
      new Edge(1, 7, 2),
    ];

    const mst = [
      new Edge(1, 2, 1),
      new Edge(2, 3, 1),
      new Edge(3, 4, 1),
      new Edge(4, 5, 1),
      new Edge(5, 6, 1),
      new Edge(6, 7, 1),
    ];

    const graph = new Graph([...mst, ...other]);

    const result = kruskalMST(graph);

    expect(result).toEqual(mst);
  });
});
