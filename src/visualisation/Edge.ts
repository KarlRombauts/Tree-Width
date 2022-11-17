import { Vector } from 'p5';
import { Interactable } from './mouseUtils';
import { defaultState, State } from './Types';
import { Vertex } from './Vertex';

const HOVER_TOLERANCE = 0.5;

export class Edge implements Interactable {
  v: Vertex;
  u: Vertex;
  state: State;

  constructor(v: Vertex, u: Vertex) {
    this.v = v;
    this.u = u;
    this.state = defaultState();
  }

  isInside(point: Vector) {
    if (this.v.isInside(point) || this.u.isInside(point)) {
      return false;
    }

    const length = Vector.dist(this.v.position, this.u.position);
    const distV = Vector.dist(this.v.position, point);
    const distU = Vector.dist(this.u.position, point);

    return Math.abs(distV + distU - length) < HOVER_TOLERANCE;
  }

  getMidpoint() {
    return Vector.add(this.u.position, this.v.position).mult(0.5);
  }

  getWeight() {
    return Math.round(Vector.dist(this.v.position, this.u.position) / 20);
  }

  equal(other: Edge) {
    return (
      (other.v.id === this.v.id && other.u.id === this.u.id) ||
      (other.v.id === this.u.id && other.u.id === this.v.id)
    );
  }
}

export type EdgeOptions = {
  weight?: number;
  strokeColor?: string;
};

export function renderEdge(
  edge: Edge,
  { strokeColor = 'black', weight = 2 }: EdgeOptions = {},
) {
  const { v, u } = edge;
  stroke(strokeColor);
  strokeWeight(weight);

  line(v.position.x, v.position.y, u.position.x, u.position.y);
}

export function renderBlueEdge(edge: Edge) {
  renderEdge(edge, { strokeColor: '#0048ff' });
}

export function renderHoverEdge(edge: Edge) {
  renderEdge(edge, { weight: 3 });
}
