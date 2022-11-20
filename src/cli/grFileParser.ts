import { abort } from 'process';
import { Edge, Graph } from '../algorithm/graph';

export function parseGraphFile(contents: string) {
  const lines = filterComments(splitLines(contents));
  const details = getGraphDetails(lines);

  const edges = getEdges(lines);
  const graph = new Graph(edges);

  const actualNumVertices = graph.getNumVertices();
  const actualNumEdges = edges.length;

  if (
    details?.numEdges !== actualNumEdges ||
    details.numVertices !== actualNumVertices
  ) {
    process.stderr.write(
      'Problem descriptor does not match parsed vertices and edges. File is likely corrupt\n',
    );
    process.exit(1);
  }

  return graph;
}

function splitLines(contents: string) {
  return contents.split(/\r?\n/);
}

function filterComments(lines: string[]) {
  return lines.filter((line) => !(isBlank(line) || isComment(line)));
}

function isBlank(line: string) {
  return line.trim() === '';
}

function isComment(line: string) {
  return line.trim().startsWith('c');
}

function getGraphDetails(lines: string[]) {
  for (let line of lines) {
    if (isDetailsLine(line)) {
      return parseDetailsLine(line);
    }
  }
  throw new Error('Problem description missing');
}

function getEdges(lines: string[]) {
  const edges = [];
  for (let line of lines) {
    if (isEdgeLine(line)) {
      const edge = parseEdgeLine(line);
      edges.push(edge);
    }
  }
  return edges;
}

function isDetailsLine(line: string) {
  return /^p\s+tw\s+\d+\s+\d+$/.test(line.trim());
}

function isEdgeLine(line: string) {
  return /^\d+\s+\d+$/.test(line.trim());
}

function parseDetailsLine(line: string) {
  const tokens = splitTokens(line.trim());
  const numVertices = parseInt(tokens[2]);
  const numEdges = parseInt(tokens[3]);
  return { numVertices, numEdges };
}

function parseEdgeLine(line: string) {
  const tokens = splitTokens(line.trim());
  const v = parseInt(tokens[0]);
  const u = parseInt(tokens[1]);
  return new Edge(v, u);
}

function splitTokens(line: string) {
  return line.split(/\s+/);
}
