import { Edge } from '../graph';

export class Counter {
  map = new Map<number, number>();

  get(x: number) {
    return this.map.get(x) || 0;
  }

  set(x: number, count: number) {
    this.map.set(x, count);
  }

  increment(x: number) {
    let count = this.get(x);
    this.set(x, count + 1);
  }

  decrement(x: number) {
    let count = this.get(x);
    this.set(x, count - 1);
  }

  keys(): number[] {
    return [...this.map].map(([key, _]) => key);
  }
}

export type AdjacencyMatrix = number[][];
export type AdjacencyList = Record<number, Record<number, number>>;
export type EdgeIndex = Record<number, Record<number, Edge>>;
export type Neighbours = Record<number, number[]>;

export function buildAdjacencyList(edges: Edge[]): AdjacencyList {
  return edges.reduce(addToAdjacencyList, {});
}

export function addToAdjacencyList(
  adjacencyList: AdjacencyList,
  { v, u, weight }: Edge,
): AdjacencyList {
  if (!adjacencyList[v]) {
    adjacencyList[v] = {};
  }
  adjacencyList[v][u] = weight;

  if (!adjacencyList[u]) {
    adjacencyList[u] = {};
  }
  adjacencyList[u][v] = weight;
  return adjacencyList;
}

export function indexEdgesByVertex(edges: Edge[]) {
  return edges.reduce(addToIndex, {});
}

function addToIndex(edgeIndex: EdgeIndex, edge: Edge): EdgeIndex {
  const { v, u } = edge;
  if (!edgeIndex[v]) {
    edgeIndex[v] = {};
  }
  edgeIndex[v][u] = edge;

  if (!edgeIndex[u]) {
    edgeIndex[u] = {};
  }
  edgeIndex[u][v] = edge;
  return edgeIndex;
}

export function createNeighboursIndex(edges: Edge[]) {
  return edges.reduce(addToNeighbours, {});
}

function addToNeighbours(neighbours: Neighbours, edge: Edge) {
  const { v, u } = edge;
  if (!neighbours[v]) {
    neighbours[v] = [];
  }
  if (!neighbours[u]) {
    neighbours[u] = [];
  }

  neighbours[v].push(u);
  neighbours[u].push(v);
  return neighbours;
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
