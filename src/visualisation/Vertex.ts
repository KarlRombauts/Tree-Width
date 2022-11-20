// Adapted from: https://editor.p5js.org/Trolley33/sketches/aD1ehiyhv
import { Vector } from 'p5';
import { Interactable } from './mouseUtils';
import { centeredText } from './textUtils';
import { defaultState, State } from './Types';

export class Vertex implements Interactable {
  position: Vector;
  id: number;
  radius = 25;
  state: State;

  constructor(id: number, position?: Vector) {
    this.id = id;
    this.state = defaultState();
    if (!position) {
      this.position = this.randomPosition();
    } else {
      this.position = position;
    }
  }

  randomPosition() {
    const x = random(this.radius, width / 2 - this.radius);
    const y = random(this.radius, height - this.radius);
    return createVector(x, y);
  }

  isInside(point: Vector) {
    const distance = Vector.dist(this.position, point);
    return distance <= this.radius;
  }
}

function renderVertexText(
  vertex: Vertex,
  { strokeColor = 'black' }: VertexOptions = {},
) {
  noStroke();
  fill(strokeColor);
  textSize(20);
  centeredText(vertex.id.toString(), vertex.position);
}

type VertexOptions = {
  weight?: number;
  strokeColor?: string;
  fillColor?: string;
};

function renderVertexCircle(
  vertex: Vertex,
  {
    weight = 2,
    strokeColor = 'black',
    fillColor = 'white',
  }: VertexOptions = {},
) {
  const { radius, position } = vertex;
  const { x, y } = position;

  stroke(strokeColor);
  strokeWeight(weight);
  fill(fillColor);

  ellipse(x, y, radius * 2);
}

export function renderVertex(vertex: Vertex, vertexOptions: VertexOptions) {
  renderVertexCircle(vertex, vertexOptions);
  renderVertexText(vertex, vertexOptions);
}

export function renderActiveVertex(vertex: Vertex) {
  return renderVertex(vertex, { strokeColor: 'black' });
}

export function renderHoveredVertex(vertex: Vertex) {
  return renderVertex(vertex, {
    weight: 3,
  });
}

export function renderSelectedVertex(vertex: Vertex) {
  return renderVertex(vertex, {
    strokeColor: '#0048ff',
    fillColor: '#d4e9ff',
    weight: 3,
  });
}

export function renderInactiveVertex(vertex: Vertex) {
  return renderVertex(vertex, { strokeColor: 'lightgrey' });
}
