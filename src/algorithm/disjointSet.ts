export class DisjointSet {
  parents: number[];
  rank: number[];

  constructor(elements: number[] | Set<number>) {
    this.parents = [];
    this.rank = [];
    elements.forEach(this.add.bind(this));
  }

  add(x: number) {
    this.parents[x] = x;
    this.rank[x] = 0;
  }

  union(a: number, b: number) {
    let x = this.find(a);
    let y = this.find(b);
    if (x === y) {
      return; // a and b are already in the same set
    }

    if (this.rank[x] < this.rank[y]) {
      [x, y] = [y, x]; // swap x and y to ensure x has a rank at least as large as y
    }
    this.parents[y] = x;

    if (this.rank[x] === this.rank[y]) {
      this.rank[x] += 1;
    }
  }

  getGrandParent(x: number) {
    return this.parents[this.parents[x]];
  }

  find(x: number): number {
    while (this.parents[x] !== x) {
      // Path halving when we search for root by setting
      // the x's parent to x's grandparent
      this.parents[x] = this.getGrandParent(x);
      x = this.parents[x];
    }
    return x;
  }

  isSameSet(a: number, b: number) {
    return this.find(a) === this.find(b);
  }
}
