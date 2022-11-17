import { Graph } from './graph';
import { getMinBy } from './helper/arrayUtils';

export abstract class Ordering {
  graph!: Graph;

  init(graph: Graph) {
    this.graph = graph;
  }

  abstract next(): number;

  abstract hasNext(): boolean;

  *[Symbol.iterator]() {
    while (this.hasNext()) {
      yield this.next();
    }
  }
}

export class PermutationOrdering extends Ordering {
  permutation: number[];
  currentIndex: number;

  constructor(permutation: number[]) {
    super();
    this.permutation = permutation;
    this.currentIndex = 0;
  }

  next(): number {
    return this.permutation[this.currentIndex++];
  }
  hasNext(): boolean {
    return this.currentIndex < this.permutation.length;
  }
}

export class MinDegreeOrdering extends Ordering {
  next(): number {
    return this.graph.getMinDegreeVertex();
  }
  hasNext(): boolean {
    return this.graph.getNumVertices() > 0;
  }
}

export class MinFillInOrdering extends Ordering {
  next(): number {
    return getMinBy(
      (vertex) => this.graph.getFillIn(vertex),
      this.graph.getVertices(),
    );
  }
  hasNext(): boolean {
    return this.graph.getNumVertices() > 0;
  }
}

export class MinDegreeAndFillInOrdering extends Ordering {
  next(): number {
    return getMinBy(
      (vertex) => this.graph.getDegree(vertex) + this.graph.getFillIn(vertex),
      this.graph.getVertices(),
    );
  }
  hasNext(): boolean {
    return this.graph.getNumVertices() > 0;
  }
}
