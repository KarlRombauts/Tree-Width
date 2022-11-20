import { range } from 'ramda';
import { Edge, Graph } from './graph';
import { Ordering } from './Ordering';
import { Bag } from './treeDecomposition';

export function getTreeBags(G: Graph, eliminationOrdering: Ordering) {
  const H = G.copy();
  const bags: Bag[] = [];
  eliminationOrdering.init(H);

  const order = [];
  for (let vertex of eliminationOrdering) {
    const neighbours = H.getNeighbours(vertex);
    H.formClique(neighbours);
    H.removeVertex(vertex);
    const bag = new Set([...neighbours, vertex]);
    bags.push(bag);
    order.push(vertex);
  }
  return { bags, order };
}

export const buildTreeDecomposition = (
  G: Graph,
  eliminationOrdering: Ordering,
) => {
  const { bags, order } = getTreeBags(G, eliminationOrdering);
  const tree = new Graph();
  tree.addVertices(range(0, bags.length));

  const V = order;
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
};
