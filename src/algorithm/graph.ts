import { without } from 'ramda';

export type Vertex = number;

export class Edge {
  v: Vertex;
  u: Vertex;
  weight: number;

  constructor(v: Vertex, u: Vertex, weight: number) {
    this.v = v;
    this.u = u;
    this.weight = weight;
  }

  compareTo(other: Edge) {
    return compareEdges(this, other);
  }
}

export function compareEdges(edge1: Edge, edge2: Edge) {
  return edge1.weight - edge2.weight;
}
export class Graph {
  vertices = new Set<Vertex>();
  edges: Edge[] = [];

  constructor(edges: Edge[] = [], vertices: Vertex[] = []) {
    this.addEdges(edges);
    this.addVertices(vertices);
  }

  addEdge(edge: Edge) {
    this.addVertex(edge.v);
    this.addVertex(edge.u);
    this.edges.push(edge);
  }

  addEdges(edges: Edge[]) {
    edges.forEach(this.addEdge.bind(this));
  }

  addVertex(vertex: Vertex) {
    this.vertices.add(vertex);
  }

  addVertices(vertices: Vertex[]) {
    vertices.forEach(this.addVertex.bind(this));
  }

  removeEdge(edge: Edge) {
    this.edges = without([edge], this.edges);
  }

  getInducedSubgraph(vertices: Vertex[]) {
    const vertexSet = new Set(vertices);
    const subsetEdges = this.edges.filter((edge) => {
      return vertexSet.has(edge.v) && vertexSet.has(edge.u);
    });

    return new Graph(subsetEdges);
  }
}
