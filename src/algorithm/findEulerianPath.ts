import { last } from 'ramda';
import { Edge, Vertex } from './graph';
import { remove } from './helper/arrayUtils';
import { createNeighboursIndex } from './utils';

export function findEulerianPath(edges: Edge[]) {
  const neighbours = createNeighboursIndex(edges);
  const currentPath: Vertex[] = [];
  const eulerPath: Vertex[] = [];

  currentPath.push(edges[0].v);
  while (currentPath.length > 0) {
    const u = last(currentPath)!;
    if (neighbours[u].length === 0) {
      // No more neighbours to explore so we unwind
      // and push vertex to the Eulerian path
      eulerPath.push(u);
      currentPath.pop();
    } else {
      const v = neighbours[u][0];
      currentPath.push(v);
      remove(neighbours[u], v);
      remove(neighbours[v], u);
    }
  }

  return eulerPath;
}
