import blossom from 'edmonds-blossom';
import { compose } from 'ramda';
import { Edge } from './graph';
import { indexEdgesByVertex } from './utils';

function invertWeight({ v: start, u: end, weight }: Edge): Edge {
  return new Edge(start, end, 1 / (weight + 1));
}

function edgeToArray({ v: start, u: end, weight }: Edge) {
  return [start, end, weight];
}

export function minimumWeightPerfectMatching(edges: Edge[]) {
  const invertedEdges = edges.map(compose(edgeToArray, invertWeight));
  const matching = blossom(invertedEdges);
  const edgeIndex = indexEdgesByVertex(edges);
  const result: Edge[] = [];

  for (let i = 0; i < matching.length; i++) {
    if (matching[i] === -1) continue;

    const v = i;
    const u = matching[i];
    const edge = edgeIndex[v][u];
    result.push(edge);

    // Remove matching entries so that we avoid duplicate
    // edges as all graphs are undirected
    matching[v] = -1;
    matching[u] = -1;
  }

  return result;
}
