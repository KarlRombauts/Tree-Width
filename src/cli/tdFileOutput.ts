import { Edge, Graph } from '../algorithm/graph';
import { Bag, getTreeWidth } from '../algorithm/treeDecomposition';

export function treeDecompositionToString(
  problemGraph: Graph,
  treeDecomposition: { tree: Graph; bags: Bag[] },
) {
  const solutionLine = getSolutionLine(problemGraph, treeDecomposition);
  const bagLines = getBagLines(treeDecomposition.bags);
  const edgeLines = getEdgeLines(treeDecomposition.tree);

  const lines = [solutionLine, ...bagLines, ...edgeLines];
  return lines.join('\n');
}

function getSolutionLine(
  problemGraph: Graph,
  { bags }: { tree: Graph; bags: Bag[] },
) {
  const numVertices = problemGraph.getNumVertices();
  const numBags = bags.length;
  const treewidth = getTreeWidth(bags);
  return `s td ${numBags} ${treewidth + 1} ${numVertices}`;
}

function getBagLines(bags: Bag[]) {
  return bags.map(bagToString);
}

function getEdgeLines(tree: Graph) {
  return tree.getUndirectedEdges().map(edgeToString);
}

function bagToString(bag: Bag, index: number) {
  return `b ${index + 1} ${[...bag].join(' ')}`;
}

function edgeToString(edge: Edge) {
  return `${edge.v + 1} ${edge.u + 1}`;
}
