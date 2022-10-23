import { Edge } from '../../algorithm/graph';
import { minimumWeightPerfectMatching } from '../../algorithm/minimumMatching';

describe('Minimum Weight Perfect Matching', () => {
  // 0 ----- 1
  test('Single edge graph returns edge', () => {
    const edges = [new Edge(0, 1, 10)];
    const expected = [edges[0]];
    expect(minimumWeightPerfectMatching(edges)).toEqual(expected);
  });

  test('Single edge graph reversed edge', () => {
    const edges = [new Edge(1, 0, 10)];
    const expected = [edges[0]];
    expect(minimumWeightPerfectMatching(edges)).toEqual(expected);
  });

  // 0 ----- 1 ------ 2 ------ 3
  test('Odd length stick graph', () => {
    const edges = [new Edge(0, 1, 1), new Edge(1, 2, 1), new Edge(2, 3, 1)];
    const expected = [edges[0], edges[2]];
    expect(minimumWeightPerfectMatching(edges)).toEqual(expected);
  });

  // w:  0       1        0        1
  // 0 ----- 1 ------ 2 ------ 3 ------ 4
  test('Even length stick graph', () => {
    const edges = [
      new Edge(0, 1, 0),
      new Edge(1, 2, 1),
      new Edge(2, 3, 0),
      new Edge(3, 4, 1),
    ];
    const expected = [edges[0], edges[2]];
    expect(minimumWeightPerfectMatching(edges)).toEqual(expected);
  });

  // w:  0       1        1       0
  // 0 ----- 1 ------ 2 ------ 3 ------ 4
  test('Even length stick graph', () => {
    const edges = [
      new Edge(0, 1, 0),
      new Edge(1, 2, 1),
      new Edge(2, 3, 1),
      new Edge(3, 4, 0),
    ];
    const expected = [edges[0], edges[3]];
    expect(minimumWeightPerfectMatching(edges)).toEqual(expected);
  });

  test('Square graph', () => {
    const edges = [
      new Edge(0, 1, 0),
      new Edge(1, 2, 1),
      new Edge(2, 3, 0),
      new Edge(3, 0, 1),
    ];
    const expected = [edges[0], edges[2]];
    expect(minimumWeightPerfectMatching(edges)).toEqual(expected);
  });
});
