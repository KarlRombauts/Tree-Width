import { range } from 'ramda';
import { Edge, Graph } from '../../algorithm/graph';
import {
  MinDegreeOrdering,
  PermutationOrdering,
} from '../../algorithm/Ordering';

describe('Orderings', () => {
  test.each([
    [1, 2, 3, 4, 5, 6],
    range(3, 10),
    range(1, 50),
    range(10, 40),
    range(0, 100),
  ])('Permutation ordering', (...permutation: number[]) => {
    const ordering = new PermutationOrdering(permutation);
    let i = 0;
    for (let item of ordering) {
      expect(item).toBe(permutation[i]);
      i++;
    }
    expect(i).toBe(permutation.length);
  });

  test.each([[new Edge(0, 1), new Edge(0, 2), new Edge(0, 3), new Edge(1, 2)]])(
    'Min degree ordering',
    (...edges: Edge[]) => {
      const graph = new Graph(edges);
      const numVertices = graph.getNumVertices();
      const ordering = new MinDegreeOrdering();
      ordering.init(graph);

      let i = 0;
      for (let vertex of ordering) {
        expect(vertex).toBeGreaterThanOrEqual(graph.getMaxDegreeVertex());
        graph.removeVertex(vertex);
        i++;
      }

      expect(i).toBe(numVertices);
    },
  );
});
