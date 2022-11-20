import { Edge, Vertex } from '../graph';
import { indexEdgesByVertex } from './edgeIndexing';

export function pathToEdges(edges: Edge[], path: Vertex[]) {
  const edgeIndex = indexEdgesByVertex(edges);
  const output = [];

  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    output.push(edgeIndex[u][v]);
  }

  return output;
}
