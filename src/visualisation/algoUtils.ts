import { Edge, Graph, Vertex } from '../algorithm/graph';
import { Edge as VisEdge } from './Edge';
import { Vertex as VisVertex } from './Vertex';

export function convertToGraph(visEdges: VisEdge[]) {
  const edges = visEdges.flatMap((edge) => {
    const { v, u } = edge;
    return [new Edge(v.id, u.id, edge.getWeight())];
  });
  return new Graph(edges);
}

export function getSubsetOfVisEdges(visEdges: VisEdge[], edges: Edge[]) {
  return visEdges.filter((visEdge) =>
    edges.some((edge) => visEdge.v.id === edge.v && visEdge.u.id === edge.u),
  );
}

export function getSubsetOfVisVertices(
  visVertices: VisVertex[],
  vertices: Vertex[] | Set<Vertex>,
) {
  const vertexArray = [...vertices];
  return visVertices.filter((visVertex) =>
    vertexArray.some((vertex) => visVertex.id === vertex),
  );
}
