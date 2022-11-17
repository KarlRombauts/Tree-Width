import { getTreeBags } from '../eliminationOrdering';
import { PermutationOrdering } from '../Ordering';
import memo from 'nano-memoize';
import { Graph } from '../graph';
import { treeWidth } from '../treeDecomposition';

export type FitnessFunction = (permutation: number[]) => number;

export function fitness(graph: Graph): FitnessFunction {
  return memo((permutation: number[]) => {
    const { bags } = getTreeBags(graph, new PermutationOrdering(permutation));
    return -treeWidth(bags);
  });
}
