import { Vector } from 'p5';
import { State } from './Types';
import { Vertex } from './Vertex';

export interface Interactable {
  state: State;
  isInside: (point: Vector) => boolean;
}

export function getMousePos() {
  return createVector(mouseX, mouseY);
}

export function setHoverState(item: Interactable) {
  item.state.hover = item.isInside(getMousePos());
}

export function getDragOffset(item: Vertex): Vector {
  const { x, y } = item.position;
  const dx = mouseX - x;
  const dy = mouseY - y;
  return createVector(dx, dy);
}
