export type State = {
  hover: boolean;
  selected: boolean;
};

export function defaultState(): State {
  return {
    hover: false,
    selected: false,
  };
}
