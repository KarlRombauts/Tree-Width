import { Edge } from './graph';
import { Counter } from './helper/counter';

export function countDegrees(counter: Counter, edge: Edge): Counter {
  counter.increment(edge.v);
  counter.increment(edge.u);
  return counter;
}

export function findOddVertices(edges: Edge[]) {
  const degreeCounts = edges.reduce(countDegrees, new Counter());
  const vertices = degreeCounts.keys();
  return vertices.filter((vertex) => degreeCounts.get(vertex) % 2 === 1);
}
