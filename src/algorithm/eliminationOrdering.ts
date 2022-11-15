import { range } from 'ramda';
import { Edge, Graph } from './graph';
import { Bag } from './treeDecomposition';

export function getTreeBags(G: Graph, eliminationOrdering: number[]): Bag[] {
  const H = G.copy();

  const bags: Bag[] = [];
  for (let vertex of eliminationOrdering) {
    const neighbours = H.getNeighbours(vertex);
    H.formClique(neighbours);
    H.removeVertex(vertex);

    const bag = new Set([...neighbours, vertex]);
    bags.push(bag);
  }

  return bags;
}

export function buildTreeDecomposition(
  G: Graph,
  eliminationOrdering: number[],
) {
  const bags = getTreeBags(G, eliminationOrdering);
  const tree = new Graph();
  tree.addVertices(range(0, bags.length));

  const V = eliminationOrdering;
  for (let i = 0; i < bags.length; i++) {
    const bag = bags[i];
    for (let j = i + 1; j < bags.length; j++) {
      if (bag.has(V[j])) {
        tree.addEdge(new Edge(i, j));
        break;
      }
    }
  }
  return { tree, bags };
}
