import { TreeNode } from './tree';

export class TreeEdge {
  parent: TreeNode;
  child: TreeNode;

  constructor(parent: TreeNode, child: TreeNode) {
    this.parent = parent;
    this.child = child;
  }
}

function renderLine(edge: TreeEdge, color = 'black') {
  const { parent, child } = edge;

  const parentPos = parent.getPosition();
  const childPos = child.getPosition();

  stroke(0);
  strokeWeight(2);

  stroke(color);
  fill(color);

  line(parentPos.x, parentPos.y, childPos.x, childPos.y);
}

export function renderTreeEdge(edge: TreeEdge) {
  renderLine(edge, 'gray');
}

export function renderBlueTreeEdge(edge: TreeEdge) {
  renderLine(edge, 'blue');
}
