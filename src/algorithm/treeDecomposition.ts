import { range } from 'ramda';
import { Edge, Graph, Vertex } from './graph';

export type Bag = Set<Vertex>;

class TreeDecomposition {
  bags: Bag[] = [];
  tree: Graph;

  constructor(bags: Bag[]) {
    this.tree = new Graph();
    this.tree.addVertices(range(0, bags.length));
    this.buildEdges();
  }

  buildEdges() {
    for (let i = 0; i < this.bags.length; i++) {
      const graphVertex = this.bags[i].values().next().value;

      for (let j = i + i; j < this.bags.length; i++) {
        if (this.bags[i].has(graphVertex)) {
          this.tree.addEdge(new Edge(i, j));
          break;
        }
      }
    }
  }
}

export function treeWidth(bags: Bag[]) {
  return bags.reduce((max, bag) => Math.max(max, bag.size), 0) - 1;
}
