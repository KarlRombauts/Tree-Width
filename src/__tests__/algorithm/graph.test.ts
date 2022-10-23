import { Edge, Graph } from '../../algorithm/graph';

describe('Graphs', () => {
  const cases: Edge[][] = [
    [],
    [new Edge(0, 1, 10)],
    [new Edge(0, 1, 10), new Edge(1, 2, 15)],
    [new Edge(0, 1, 10), new Edge(1, 2, 15), new Edge(1, 3, 3)],
  ];

  test.each(cases)(
    'Inserts all vertices into graph from list of edges',
    (...edges: Edge[]) => {
      const graph = new Graph(edges);
      edges.forEach((edge) => {
        expect(graph.vertices.has(edge.v)).toBeTruthy();
        expect(graph.vertices.has(edge.u)).toBeTruthy();
      });
    },
  );

  test.each(cases)(
    'Inserts all edges into graph from list of edges',
    (...edges: Edge[]) => {
      const graph = new Graph(edges);
      edges.forEach((edge) => {
        expect(graph.edges).toContain(edge);
      });
    },
  );

  test('Adds unique edges correctly', () => {
    const edges = [
      new Edge(0, 1, 10),
      new Edge(2, 3, 10),
      new Edge(4, 5, 10),
      new Edge(1, 0, 10),
    ];
    const graph = new Graph();
    graph.addEdges(edges);

    expect(graph.edges.length).toBe(edges.length);
    edges.forEach((edge) => {
      expect(graph.edges).toContain(edge);
    });
  });

  test('Can support duplicate edges', () => {
    const edges = [
      new Edge(0, 1, 10),
      new Edge(0, 1, 10),
      new Edge(0, 1, 10),
      new Edge(0, 1, 10),
    ];
    const graph = new Graph();
    graph.addEdges(edges);

    expect(graph.edges.length).toBe(edges.length);
    edges.forEach((edge) => {
      expect(graph.edges).toContain(edge);
    });
  });
});
