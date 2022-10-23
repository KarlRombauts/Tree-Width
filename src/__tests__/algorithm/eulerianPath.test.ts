import { findEulerianPath } from '../../algorithm/findEulerianPath';
import { Edge } from '../../algorithm/graph';

describe('Eulerian Path', () => {
  // 0 ------- 1
  //  \      /
  //   \ 2 /
  test('Simple 3 cycle', () => {
    const edges = [new Edge(0, 1, 10), new Edge(1, 2, 10), new Edge(2, 0, 10)];
    const output = findEulerianPath(edges);
    const expected = [0, 2, 1, 0];
    expect(output).toEqual(expected);
  });

  //  @0 ------- 1@
  //   \      /       (@ represents a loop)
  //    \  /
  //     2@
  test('Simple 3 cycle with self loops', () => {
    const edges = [
      new Edge(0, 1, 10),
      new Edge(1, 2, 10),
      new Edge(2, 0, 10),
      new Edge(0, 0, 10),
      new Edge(1, 1, 10),
      new Edge(2, 2, 10),
    ];

    const output = findEulerianPath(edges);
    const expected = [0, 0, 2, 2, 1, 1, 0];
    expect(output).toEqual(expected);
  });

  // 0 ------ 1 ------ 2
  //  \     /  \     /
  //   \  /     \  /
  //    4        3
  test('Two joined 3 cycles', () => {
    const edges = [
      new Edge(0, 1, 10),
      new Edge(1, 2, 10),
      new Edge(2, 3, 10),
      new Edge(3, 1, 10),
      new Edge(1, 4, 10),
      new Edge(4, 0, 10),
    ];
    const output = findEulerianPath(edges);
    const expected = [0, 4, 1, 3, 2, 1, 0];
    expect(output).toEqual(expected);
  });
  //  /---------------\
  // 0 ------ 1 ------ 2
  // ()      ()       ()
  // 3       4        5
  test('Double Edges', () => {
    const edges = [
      new Edge(0, 3, 10),
      new Edge(3, 0, 10),
      new Edge(0, 1, 10),
      new Edge(1, 4, 10),
      new Edge(4, 1, 10),
      new Edge(1, 2, 10),
      new Edge(2, 5, 10),
      new Edge(5, 2, 10),
      new Edge(2, 0, 10),
    ];
    const output = findEulerianPath(edges);
    const expected = [0, 3, 0, 1, 4, 1, 2, 5, 2, 0].reverse();
    expect(output).toEqual(expected);
  });
});
