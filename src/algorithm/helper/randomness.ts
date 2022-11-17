import { range } from 'ramda';
import { shuffle } from './arrayUtils';

export type Range = {
  i: number;
  j: number;
};

export function random(min: number, max: number) {
  if (min >= max) {
    throw new Error('Min value must be strictly smaller than max value');
  }
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomRange(length: number): Range {
  let i = random(0, length + 1);
  let j = i;

  // range cannot be same value
  let count = 0;
  while (i === j) {
    j = random(0, length);
    count++;
    if (count > 100) {
      console.log('stuck', i, j, length);
    }
  }

  // ensure correct order
  if (j < i) {
    [i, j] = [j, i];
  }

  return { i, j };
}

export function randomIndices(arrayLength: number, amount: number) {
  return shuffle(range(0, arrayLength)).slice(0, amount);
}
