import { Vector } from 'p5';
import { isNil, without } from 'ramda';
import { AdjacencyList } from './helper/edgeIndexing';

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
  adjacencyList: AdjacencyList;

  constructor(edges: Edge[] = [], vertices: Vertex[] = []) {
    this.adjacencyList = {};
    this.addEdges(edges);
    this.addVertices(vertices);
  }

  copy(): Graph {
    return new Graph(this.getEdges(), this.getVertices());
  }

  getVertices() {
    return Object.keys(this.adjacencyList).map((key) => parseInt(key));
  }

  getDegree(vertex: Vertex) {
    return this.getNeighbours(vertex).length;
  }

  getMaxDegreeVertex() {
    const vertices = this.getVertices();
    let currentMax = vertices[0];

    for (let vertex of vertices) {
      if (this.getDegree(vertex) > this.getDegree(currentMax)) {
        currentMax = vertex;
      }
    }
    return currentMax;
  }

  getMinDegreeVertex() {
    const vertices = this.getVertices();
    let currentMin = vertices[0];

    for (let vertex of vertices) {
      if (this.getDegree(vertex) < this.getDegree(currentMin)) {
        currentMin = vertex;
      }
    }
    return currentMin;
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

  getEdge(v: Vertex, u: Vertex) {
    if (!this.areAdjacent(v, u)) {
      return undefined;
    }
    const weight = this.adjacencyList[v]?.[u];
    return new Edge(v, u, weight);
  }

  hasVertex(vertex: Vertex) {
    return !isNil(this.adjacencyList[vertex]);
  }

  addEdge(edge: Edge) {
    const { v, u, weight } = edge;
    if (!this.adjacencyList[v]) {
      this.adjacencyList[v] = {};
    }
    this.adjacencyList[v][u] = weight;

    if (!this.adjacencyList[u]) {
      this.adjacencyList[u] = {};
    }
    this.adjacencyList[u][v] = weight;
  }

  addEdges(edges: Edge[]) {
    edges.forEach(this.addEdge.bind(this));
  }

  addVertex(vertex: Vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  removeVertex(vertex: number) {
    const neighbours = this.getNeighbours(vertex);
    for (let neighbour of neighbours) {
      delete this.adjacencyList[neighbour][vertex];
    }
    delete this.adjacencyList[vertex];
  }

  getNeighbours(vertex: Vertex): Vertex[] {
    if (!this.adjacencyList[vertex]) {
      return [];
    }
    return Object.keys(this.adjacencyList[vertex]).map((key) => parseInt(key));
  }

  addVertices(vertices: Vertex[]) {
    vertices.forEach(this.addVertex.bind(this));
  }

  removeEdge(edge: Edge) {
    this.edges = without([edge], this.edges);
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
    return (this.adjacencyList[u][v] = weight);
  }

  areAdjacent(u: Vertex, v: Vertex) {
    return (
      !isNil(this.adjacencyList[u]?.[v]) || !isNil(this.adjacencyList[v]?.[u])
    );
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
