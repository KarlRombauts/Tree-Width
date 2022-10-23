export class Counter {
  map = new Map<number, number>();

  get(x: number) {
    return this.map.get(x) || 0;
  }

  set(x: number, count: number) {
    this.map.set(x, count);
  }

  increment(x: number) {
    let count = this.get(x);
    this.set(x, count + 1);
  }

  decrement(x: number) {
    let count = this.get(x);
    this.set(x, count - 1);
  }

  keys(): number[] {
    return [...this.map].map(([key, _]) => key);
  }
}
