import { buildTreeDecomposition, getTreeBags } from './eliminationOrdering';
import { GeneticAlgorithm } from './genetic/geneticAlgorithm';
import { Graph, Vertex } from './graph';
import {
  MinDegreeAndFillInOrdering,
  MinDegreeOrdering,
  MinFillInOrdering,
  PermutationOrdering,
} from './Ordering';

export type Bag = Set<Vertex>;

export function getTreeWidth(bags: Bag[]) {
  return bags.reduce((max, bag) => Math.max(max, bag.size), 0) - 1;
}

export function greedyDegreeMethod(graph: Graph) {
  return buildTreeDecomposition(graph, new MinDegreeOrdering());
}

export function greedyFillInMethod(graph: Graph) {
  return buildTreeDecomposition(graph, new MinFillInOrdering());
}

export function greedyDegreeFillInMethod(graph: Graph) {
  return buildTreeDecomposition(graph, new MinDegreeAndFillInOrdering());
}

export function geneticMethod(graph: Graph, repeats = 100) {
  const { order: order1 } = getTreeBags(graph, new MinDegreeOrdering());
  const { order: order2 } = getTreeBags(graph, new MinFillInOrdering());
  const { order: order3 } = getTreeBags(
    graph,
    new MinDegreeAndFillInOrdering(),
  );

  const geneticAlgorithm = new GeneticAlgorithm(graph, [
    order1,
    order2,
    order3,
  ]);
  let bestPermutation: number[] = graph.getVertices();

  for (let i = 0; i < repeats; i++) {
    const result = geneticAlgorithm.executeRound();
    bestPermutation = result.best;
  }

  return buildTreeDecomposition(
    graph,
    new PermutationOrdering(bestPermutation),
  );
}
