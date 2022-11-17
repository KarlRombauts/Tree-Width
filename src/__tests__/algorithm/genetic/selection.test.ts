import { range } from 'ramda';
import { tournament } from '../../../algorithm/genetic/selection';

describe('Selection', () => {
  test('tournament selection', () => {
    const best = tournament(
      [['a'], ['b'], ['c'], ['d'], ['e']],
      [1, 2, 3, 4, 5],
      5,
    );
    expect(best).toEqual(['e']);
  });

  test('tournament selection never selects worst items', () => {
    for (let _ of range(0, 1000)) {
      const best = tournament(
        [['a'], ['b'], ['c'], ['d'], ['e']],
        [1, 2, 3, 4, 5],
        3,
      );
      expect(best).not.toEqual(['a']);
      expect(best).not.toEqual(['b']);
    }
  });
});
