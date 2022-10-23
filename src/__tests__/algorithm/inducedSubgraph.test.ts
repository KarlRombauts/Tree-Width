import { Edge, Graph } from '../../algorithm/graph';

describe('Induced subgraph', () => {
  // 0 -- 1 -- 2 -- 3
  // verts = [1, 2]
  // returns graph with:
  // verts = [1, 2]
  // edges = [(1, 2)]
  test('A stick graph selecting the middle two vertices should return only', () => {
    const edges = [new Edge(0, 1, 0), new Edge(1, 2, 0), new Edge(2, 3, 0)];
    const graph = new Graph(edges);
    const subgraph = graph.getInducedSubgraph([1, 2]);

    expect(subgraph.vertices.size).toBe(2);
    expect(subgraph.vertices).toContain(1);
    expect(subgraph.vertices).toContain(2);

    expect(subgraph.edges.length).toBe(1);
    expect(subgraph.edges).toContain(edges[1]);
  });
});
