import { compareEdges, Edge } from '../../algorithm/graph';

describe('Edge Comparison', () => {
  const costlyEdge = new Edge(1, 2, 100);
  const cheapEdge = new Edge(1, 2, 5);
  test('Edge 1 has greater weight than edge 2', () => {
    expect(compareEdges(costlyEdge, cheapEdge)).toBeGreaterThan(0);
  });
  test('Edge 1 has lesser weight than edge 2', () => {
    expect(compareEdges(cheapEdge, costlyEdge)).toBeLessThan(0);
  });
  test('Edge 1 has same weight than edge 2', () => {
    expect(compareEdges(cheapEdge, cheapEdge)).toBe(0);
  });
});

describe('Edge sorting', () => {
  const e1 = new Edge(0, 0, 1),
    e2 = new Edge(0, 0, 2),
    e2_dup = new Edge(1, 1, 2),
    e3 = new Edge(0, 0, 3),
    e4 = new Edge(0, 0, 4),
    e4_dup = new Edge(1, 1, 4),
    e5 = new Edge(0, 0, 5);

  test('Correctly sorts list of unique edges', () => {
    const input = [e4, e2, e3, e5, e1];
    const expected = [e1, e2, e3, e4, e5];
    expect(input.sort(compareEdges)).toEqual(expected);
  });

  test('Correctly sorts list of non-unique edges', () => {
    const input = [e4, e2, e3, e5, e1, e2, e5, e1];
    const expected = [e1, e1, e2, e2, e3, e4, e5, e5];
    expect(input.sort(compareEdges)).toEqual(expected);
  });

  test('Correctly performs stable sort of edges with duplicate weights', () => {
    const input = [e4, e2_dup, e2, e3, e5, e4_dup, e1];
    const expected = [e1, e2_dup, e2, e3, e4, e4_dup, e5];
    expect(input.sort(compareEdges)).toEqual(expected);
  });
});
