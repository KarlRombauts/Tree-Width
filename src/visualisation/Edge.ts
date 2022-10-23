import { Vector } from 'p5';
import { Interactable } from './mouseUtils';
import { defaultState, State } from './Types';
import { Vertex } from './Vertex';

const HOVER_TOLERANCE = 0.5;
const TEXT_OFFSET = 14;

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

function renderLine(edge: Edge, color = 'black') {
  const { state, v, u } = edge;
  stroke(0);
  strokeWeight(2);

  if (state.hover) {
    stroke(200, 0, 0);
    strokeWeight(3);
  }

  stroke(color);
  fill(color);

  if (state.selected) {
    fill(100, 255, 255);
  }

  line(v.position.x, v.position.y, u.position.x, u.position.y);
}

export function renderWeight(edge: Edge, color = 'black') {
  const mid = edge.getMidpoint();
  const { v, u } = edge;
  const offset = perp(Vector.sub(v.position, u.position)).setMag(TEXT_OFFSET);
  const textPos = Vector.add(mid, offset);
  const label = edge.getWeight().toString();

  noStroke();
  fill(color);
  textSize(20);
  text(
    label,
    textPos.x - textWidth(label) / 2,
    textPos.y + (textAscent() + textDescent()) / 4,
  );
}

export function renderEdge(edge: Edge) {
  // renderWeight(edge);
  renderLine(edge, 'gray');
}

export function renderBlueEdge(edge: Edge) {
  renderLine(edge, 'blue');
}

function perp(vector: Vector) {
  return createVector(-vector.y, vector.x);
}
