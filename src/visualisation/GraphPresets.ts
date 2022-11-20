import { Vector } from 'p5';
import { Edge } from './Edge';
import { Vertex } from './Vertex';

export enum Preset {
  Default = 'Select preset',
  Utility = 'Utility Graph',
  Grid = '4 x 4 Grid',
  Tree = 'Tree',
  TwoTree = '2 Tree',
  Star = 'Star',
  Ring = 'Ring',
  Complete = 'Complete Graph',
  Petersen = 'Petersen Graph',
}

export function createGraphSelector(onChange: (value: Preset) => void) {
  const select: any = createSelect();
  select.position(10, 10);
  select.option(Preset.Default);
  select.disable(Preset.Default);
  select.selected(Preset.Default);

  select.option(Preset.Utility);
  select.option(Preset.Grid);
  //   select.option(Preset.Tree);
  //   select.option(Preset.TwoTree);
  select.option(Preset.Star);
  select.option(Preset.Ring);
  select.option(Preset.Petersen);

  select.changed(() => {
    const value: Preset = select.value();
    onChange(value);
  });
}

export type VisualGraph = {
  vertices: Vertex[];
  edges: Edge[];
};

export function presetGraphBuilder(preset: Preset): VisualGraph {
  switch (preset) {
    case Preset.Utility:
      return createUtilityGraph();
    case Preset.Grid:
      return createGridGraph();
    case Preset.Star:
      return createStarGraph();
    case Preset.Petersen:
      return createPetersenGraph();
    case Preset.Ring:
      return createRingGraph();
    default:
      return createDefaultGraph();
  }
}

export function getCenter() {
  return createVector(width / 4, height / 2);
}

function createDefaultGraph(): VisualGraph {
  const V = [new Vertex(0), new Vertex(1)];
  const E = [new Edge(V[0], V[1])];
  return { vertices: V, edges: E };
}

function createUtilityGraph(): VisualGraph {
  const center = getCenter();
  center.x *= 0.8;
  center.y *= 0.8;

  const spacing = 100;
  const V = [
    new Vertex(1, center.copy().add(-spacing, -spacing)),
    new Vertex(2, center.copy().add(0, -spacing)),
    new Vertex(3, center.copy().add(spacing, -spacing)),

    new Vertex(4, center.copy().add(-spacing, spacing)),
    new Vertex(5, center.copy().add(0, spacing)),
    new Vertex(6, center.copy().add(spacing, spacing)),
  ];

  const E = [
    new Edge(V[0], V[3]),
    new Edge(V[0], V[4]),
    new Edge(V[0], V[5]),

    new Edge(V[1], V[3]),
    new Edge(V[1], V[4]),
    new Edge(V[1], V[5]),

    new Edge(V[2], V[3]),
    new Edge(V[2], V[4]),
    new Edge(V[2], V[5]),
  ];

  return { vertices: V, edges: E };
}

function createGridGraph(): VisualGraph {
  const center = getCenter();
  center.x *= 0.5;
  center.y *= 0.5;

  const spacing = 100;
  const V = [];
  const E = [];

  const gridSize = 4;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const index = i * gridSize + j;
      const id = index + 1;
      const position = center.copy().add(spacing * i, spacing * j);
      V.push(new Vertex(id, position));

      if (i > 0) {
        const vUpIndex = (i - 1) * gridSize + j;
        E.push(new Edge(V[index], V[vUpIndex]));
      }
      if (j > 0) {
        const vLeftIndex = i * gridSize + (j - 1);
        E.push(new Edge(V[index], V[vLeftIndex]));
      }
    }
  }

  return { vertices: V, edges: E };
}

function createPetersenGraph(): VisualGraph {
  const center = getCenter().add(0, 0);
  const E = [];
  const vInner = [];
  const vOuter = [];

  const outerRadius = 200;
  const innerRadius = 100;
  const n = 5;

  for (let i = 0; i < n; i++) {
    const angle = Math.PI / 2 - (2 * Math.PI * i) / n;
    const unitVector = createVector(Math.cos(angle), -Math.sin(angle));
    const outerPos = center.copy().add(Vector.mult(unitVector, outerRadius));
    const innerPos = center.copy().add(Vector.mult(unitVector, innerRadius));

    vOuter.push(new Vertex(i, outerPos));
    vInner.push(new Vertex(n + i, innerPos));
    E.push(new Edge(vInner[i], vOuter[i]));
  }

  for (let i = 0; i < n; i++) {
    E.push(new Edge(vOuter[i], vOuter[(i + 1) % n]));
    E.push(new Edge(vInner[i], vInner[(i + 2) % n]));
  }

  return { vertices: [...vOuter, ...vInner], edges: E };
}

function createStarGraph(): VisualGraph {
  const center = getCenter().add(0, 0);
  const E = [];
  const V = [];

  const radius = 200;
  const n = 5;

  V.push(new Vertex(1, center));

  for (let i = 0; i < n; i++) {
    const angle = Math.PI / 2 - (2 * Math.PI * i) / n;
    const unitVector = createVector(Math.cos(angle), -Math.sin(angle));
    const position = center.copy().add(Vector.mult(unitVector, radius));

    V.push(new Vertex(i + 2, position));
    E.push(new Edge(V[0], V[i + 1]));
  }

  return { vertices: V, edges: E };
}

function createRingGraph(): VisualGraph {
  const center = getCenter().add(0, 0);
  const V = [];
  const E = [];

  const radius = 200;
  const n = 10;

  for (let i = 0; i < n; i++) {
    const angle = Math.PI / 2 - (2 * Math.PI * i) / n;
    const unitVector = createVector(Math.cos(angle), -Math.sin(angle));
    const position = center.copy().add(Vector.mult(unitVector, radius));

    V.push(new Vertex(i + 1, position));
  }

  for (let i = 0; i < n; i++) {
    E.push(new Edge(V[i], V[(i + 1) % n]));
  }

  return { vertices: V, edges: E };
}
