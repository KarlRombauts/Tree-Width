import { DisjointSet } from './disjointSet';
import { compareEdges, Graph } from './graph';

export function kruskalMST(graph: Graph) {
  const mst = [];
  const edges = graph.edges.sort(compareEdges);
  const disjointSet = new DisjointSet(graph.vertices);

  let index = 0;
  while (mst.length < graph.vertices.size - 1) {
    const edge = edges[index];
    if (!disjointSet.isSameSet(edge.v, edge.u)) {
      disjointSet.union(edge.v, edge.u);
      mst.push(edge);
    }
    index++;
  }
  return mst;
}
