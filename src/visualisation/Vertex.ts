// Adapted from: https://editor.p5js.org/Trolley33/sketches/aD1ehiyhv
import { Vector } from 'p5';
import { Interactable } from './mouseUtils';
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

function renderVertexText(vertex: Vertex, color = 'black') {
  const pos = vertex.position;
  noStroke();
  fill(color);
  textSize(20);
  text(
    vertex.id.toString(),
    pos.x - textWidth(vertex.id.toString()) / 2,
    pos.y + (textAscent() + textDescent()) / 4,
  );
}

function renderVertexCircle(vertex: Vertex, color: string = 'black') {
  const { radius, position, state } = vertex;
  const { x, y } = position;

  stroke(color);
  strokeWeight(2);
  fill(255);

  if (state.hover) {
    strokeWeight(3);
  }
  if (state.selected) {
    fill(100, 255, 255);
  }

  ellipse(x, y, radius * 2);
}

export function renderVertex(vertex: Vertex, color = 'black') {
  renderVertexCircle(vertex, color);
  renderVertexText(vertex, color);
}

export function renderActiveVertex(vertex: Vertex) {
  return renderVertex(vertex, 'black');
}

export function renderInactiveVertex(vertex: Vertex) {
  return renderVertex(vertex, 'lightgrey');
}
