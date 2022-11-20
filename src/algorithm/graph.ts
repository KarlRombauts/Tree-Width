import { isNil } from 'ramda';
import { getMaxBy, getMinBy, getNonEmptyIndices } from './helper/arrayUtils';
import { AdjacencyMatrix } from './helper/edgeIndexing';

export type Vertex = number;

export class Edge {
  v: Vertex;
  u: Vertex;
  weight: number;

  constructor(v: Vertex, u: Vertex, weight: number = 1) {
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
  degrees: number[];
  numVertices: number;
  adjacencyMatrix: AdjacencyMatrix;
  neighboursCache: number[][];

  constructor(edges: Edge[] = [], vertices: Vertex[] = []) {
    this.adjacencyMatrix = [];
    this.neighboursCache = [];
    this.degrees = [];
    this.numVertices = 0;
    this.addEdges(edges);
    this.addVertices(vertices);
  }

  copy(): Graph {
    const graph = new Graph();
    graph.adjacencyMatrix = this.adjacencyMatrix.map((array) => array.slice(0));
    graph.degrees = this.degrees.slice(0);
    graph.numVertices = this.numVertices;
    // graph.adjacencyMatrix = structuredClone(this.adjacencyMatrix);
    return graph;
    // return new Graph(this.getEdges(), this.getVertices());
  }

  getVertices() {
    return getNonEmptyIndices(this.adjacencyMatrix);
  }

  getNumVertices(): number {
    return this.numVertices;
  }

  getDegree(vertex: Vertex) {
    return this.degrees[vertex];
  }

  getFillIn(vertex: Vertex) {
    const neighbours = this.getNeighbours(vertex);
    let fillIn = 0;

    for (let i = 0; i < neighbours.length; i++) {
      for (let j = i + 1; j < neighbours.length; j++) {
        if (!this.areAdjacent(neighbours[i], neighbours[j])) {
          fillIn++;
        }
      }
    }

    return fillIn;
  }

  getMaxDegreeVertex() {
    return getMaxBy(this.getDegree.bind(this), this.getVertices());
  }

  getMinDegreeVertex() {
    return getMinBy(this.getDegree.bind(this), this.getVertices());
  }

  getEdges() {
    const vertices = this.getVertices();
    const edges = [];
    for (let v of vertices) {
      const neighbours = this.getNeighbours(v);
      for (let u of neighbours) {
        const edge = this.getEdge(v, u);
        if (edge) {
          edges.push(edge);
        }
      }
    }
    return edges;
  }

  getUndirectedEdges() {
    const vertices = this.getVertices();
    const seenVertices = new Set();
    const edges = [];
    for (let v of vertices) {
      const neighbours = this.getNeighbours(v);
      for (let u of neighbours) {
        if (seenVertices.has(u)) {
          continue;
        }
        const edge = this.getEdge(v, u);
        if (edge) {
          edges.push(edge);
        }
      }
      seenVertices.add(v);
    }
    return edges;
  }

  getEdge(v: Vertex, u: Vertex) {
    if (!this.areAdjacent(v, u)) {
      return undefined;
    }
    const weight = this.adjacencyMatrix[v]?.[u];
    return new Edge(v, u, weight);
  }

  hasVertex(vertex: Vertex) {
    return !isNil(this.adjacencyMatrix[vertex]);
  }

  addEdge(edge: Edge) {
    const { v, u, weight } = edge;
    this.addVertex(v);
    this.addVertex(u);

    this.adjacencyMatrix[v][u] = weight;
    this.adjacencyMatrix[u][v] = weight;

    this.degrees[u] += 1;
    this.degrees[v] += 1;
    delete this.neighboursCache[u];
    delete this.neighboursCache[v];
  }

  addEdges(edges: Edge[]) {
    edges.forEach(this.addEdge.bind(this));
  }

  addVertex(vertex: Vertex) {
    if (!this.adjacencyMatrix[vertex]) {
      this.adjacencyMatrix[vertex] = [];
      this.degrees[vertex] = 0;
      this.numVertices++;
    }
  }

  removeVertex(v: number) {
    for (let u of this.getNeighbours(v)) {
      delete this.adjacencyMatrix[u][v];
      this.removeEdge(u, v);
    }
    delete this.adjacencyMatrix[v];
    delete this.degrees[v];
    this.numVertices--;
  }

  getNeighbours(vertex: Vertex): Vertex[] {
    if (!this.adjacencyMatrix[vertex]) {
      return [];
    }

    if (this.neighboursCache[vertex]) {
      return this.neighboursCache[vertex];
    }

    const neighbours = getNonEmptyIndices(this.adjacencyMatrix[vertex]);
    this.neighboursCache[vertex] = neighbours;
    return neighbours;
  }

  addVertices(vertices: Vertex[]) {
    vertices.forEach(this.addVertex.bind(this));
  }

  removeEdge(u: Vertex, v: Vertex) {
    this.degrees[u] -= 1;
    this.degrees[v] -= 1;
    delete this.adjacencyMatrix[u][v];
    delete this.adjacencyMatrix[v][u];
    delete this.neighboursCache[u];
    delete this.neighboursCache[v];
  }

  getInducedSubgraph(vertices: Vertex[]): Graph {
    const vertexSet = new Set(vertices);
    const subsetEdges = this.edges.filter((edge) => {
      return vertexSet.has(edge.v) && vertexSet.has(edge.u);
    });

    return new Graph(subsetEdges);
  }

  hasEdge(edge: Edge) {
    const { u, v, weight } = edge;
    return (this.adjacencyMatrix[u][v] = weight);
  }

  areAdjacent(u: Vertex, v: Vertex) {
    return !!this.adjacencyMatrix[u][v];
  }

  formClique(vertices: Vertex[]) {
    for (let i = 0; i < vertices.length; i++) {
      if (!this.hasVertex(vertices[i])) {
        throw new Error(`Graph does not contain vertex "${vertices[i]}"`);
      }
    }

    for (let i = 0; i < vertices.length; i++) {
      const v = vertices[i];
      for (let j = i + 1; j < vertices.length; j++) {
        const u = vertices[j];
        if (!this.areAdjacent(u, v)) {
          this.addEdge(new Edge(v, u, 1));
        }
      }
    }
  }
}
