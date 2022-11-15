import { Edge, Graph, Vertex } from '../../algorithm/graph';

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
        expect(graph.hasVertex(edge.v)).toBeTruthy();
        expect(graph.hasVertex(edge.u)).toBeTruthy();
      });
    },
  );

  test.each(cases)(
    'Inserts all edges into graph from list of edges',
    (...edges: Edge[]) => {
      const graph = new Graph(edges);
      edges.forEach((edge) => {
        expect(graph.hasEdge(edge)).toBeTruthy();
      });
    },
  );

  test.each(cases)('Corrects reports adjacent edges', (...edges: Edge[]) => {
    const graph = new Graph(edges);
    edges.forEach((edge) => {
      expect(graph.areAdjacent(edge.v, edge.u)).toBeTruthy();
    });
  });

  test.each([
    [2, 3],
    [1, 2, 3, 4, 5],
    [1, 4, 5, 6, 9],
    [5, 2, 1, 4, 9, 8],
    [1],
  ])('Correctly forms clique using %o', (...vertices: Vertex[]) => {
    const G = new Graph();
    G.addVertices(vertices);
    G.formClique(vertices);
    for (let i = 0; i < vertices.length; i++) {
      for (let j = 0; j < vertices.length; j++) {
        if (i !== j) {
          expect(G.areAdjacent(vertices[i], vertices[j])).toBeTruthy();
        } else {
          expect(G.areAdjacent(vertices[i], vertices[j])).toBeFalsy();
        }
      }
    }
  });

  test.each([
    [1, [2, 3]],
    [6, [1, 2, 3, 4, 5]],
    [7, [1, 4, 5, 6, 9]],
    [3, [5, 2, 1, 4, 9, 8]],
    [2, [1]],
  ])('For vertex %d neighbours %a', (vertex: Vertex, neighbours: Vertex[]) => {
    const graph = new Graph();
    graph.addVertex(vertex);
    graph.addVertices(neighbours);
    graph.formClique([vertex, ...neighbours]);

    expect(graph.getNeighbours(vertex).sort()).toEqual(neighbours.sort());
  });

  test.each([
    [1, [2, 3]],
    [6, [1, 2, 3, 4, 5]],
    [7, [1, 4, 5, 6, 9]],
    [3, [5, 2, 1, 4, 9, 8]],
    [2, [1]],
  ])(
    'Deleted vertex %d will not be in any of its neighbours %a',
    (vertex: Vertex, neighbours: Vertex[]) => {
      const graph = new Graph();
      graph.addVertex(vertex);
      graph.addVertices(neighbours);
      graph.formClique([vertex, ...neighbours]);

      graph.removeVertex(vertex);

      for (let neighbour of neighbours) {
        expect(graph.areAdjacent(neighbour, vertex)).toBeFalsy();
      }

      expect(graph.hasVertex(vertex)).toBeFalsy();
    },
  );

  test.each([
    [1, [2, 3]],
    [6, [1, 2, 3, 4, 5]],
    [7, [1, 4, 5, 6, 9]],
    [3, [5, 2, 1, 4, 9, 8]],
    [2, [1]],
  ])(
    'Deleting $d leaves clique of %o intact',
    (vertex: Vertex, neighbours: Vertex[]) => {
      const G = new Graph();
      G.addVertex(vertex);
      G.addVertices(neighbours);
      G.formClique([vertex, ...neighbours]);
      G.removeVertex(vertex);

      for (let i = 0; i < neighbours.length; i++) {
        for (let j = 0; j < neighbours.length; j++) {
          if (i !== j) {
            expect(G.areAdjacent(neighbours[i], neighbours[j])).toBeTruthy();
          } else {
            expect(G.areAdjacent(neighbours[i], neighbours[j])).toBeFalsy();
          }
        }
      }
    },
  );
});
