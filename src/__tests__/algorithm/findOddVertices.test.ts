import { findOddVertices } from '../../algorithm/findOddVertices';
import { Edge } from '../../algorithm/graph';

describe('Odd degree vertices', () => {
  test('Single edge graph return both vertices', () => {
    const edges = [new Edge(0, 1, 0)];
    const vertices = findOddVertices(edges);
    expect(vertices.length).toBe(2);

    expect(vertices).toContain(0);
    expect(vertices).toContain(1);
  });

  test('Single vertex with loop edge return no vertices', () => {
    const edges = [new Edge(1, 1, 0)];
    const vertices = findOddVertices(edges);
    expect(vertices.length).toBe(0);
  });

  // 0 -- 1 -- 2 -- 3
  test('Stick qraph returns only end vertices', () => {
    const edges = [new Edge(0, 1, 0), new Edge(1, 2, 0), new Edge(2, 3, 0)];

    const vertices = findOddVertices(edges);
    expect(vertices.length).toBe(2);
    expect(vertices).toContain(0);
    expect(vertices).toContain(3);
  });

  //     1
  //     |
  // 2 - 0 - 3
  test('3 pointed star graph returns all verts', () => {
    const edges = [new Edge(0, 1, 0), new Edge(0, 2, 0), new Edge(0, 3, 0)];

    const vertices = findOddVertices(edges);
    expect(vertices.length).toBe(4);
    expect(vertices).toContain(0);
    expect(vertices).toContain(1);
    expect(vertices).toContain(2);
    expect(vertices).toContain(3);
  });

  //     1
  //   / | \
  // 2 - 0 - 3
  test('The above graph returns only vert 1 and 0', () => {
    const edges = [
      new Edge(0, 1, 0),
      new Edge(0, 2, 0),
      new Edge(0, 3, 0),
      new Edge(1, 2, 0),
      new Edge(1, 3, 0),
    ];

    const vertices = findOddVertices(edges);
    expect(vertices.length).toBe(2);
    expect(vertices).toContain(0);
    expect(vertices).toContain(1);
  });
});
