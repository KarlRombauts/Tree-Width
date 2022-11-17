import memo from 'nano-memoize';
import { Vector } from 'p5';

export const getTextHeight = memo((fontSize: number) => {
  const prevSize = textSize();
  textSize(fontSize);
  const height = textAscent() + textDescent();
  textSize(prevSize);
  return height;
});

export const getTextWidth = memo((fontSize: number, text: string) => {
  const prevSize = textSize();
  textSize(fontSize);
  const width = textWidth(text);
  textSize(prevSize);
  return width;
});

export function centeredText(string: string, pos: Vector) {
  text(
    string,
    pos.x - getTextWidth(textSize(), string) / 2,
    pos.y + getTextHeight(textSize()) / 4,
  );
}
