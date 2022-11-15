import { Vector } from 'p5';
import { Graph } from '../algorithm/graph';
import { remove } from '../algorithm/helper/arrayUtils';
import { Bag } from '../algorithm/treeDecomposition';
import { renderTreeEdge, TreeEdge } from './TreeEdge';
import { Vertex } from './Vertex';

const PADDING = { x: 20, y: 30 };
const MARGIN = { x: 16, y: 8 };
const TEXT_SIZE = 20;

export class TreeNode {
  id: number;
  label: string;
  parent: TreeNode | null;
  children: TreeNode[];
  width: number | null;

  constructor(id: number, parent: TreeNode | null, label?: string) {
    (this.id = id), (this.parent = parent);
    this.label = label || this.id.toString();
    this.children = [];
    this.width = null;
  }

  getWidth(): number {
    if (this.width === null) {
      this.width = this.calculateWidth();
    }
    return this.width;
  }

  getDepth(): number {
    if (!this.parent) {
      return 0;
    }
    return this.parent.getDepth() + 1;
  }

  calculateWidth(): number {
    textSize(TEXT_SIZE);
    const ownWidth = textWidth(this.label) + MARGIN.x * 2;
    const childrenWidth = calculateWidthOfNodes(this.children);

    return Math.max(ownWidth, childrenWidth);
    // return (
    //   this.children.reduce((total, child) => total + child.getWidth(), 0) +
    //   PADDING * (this.children.length - 1)
    // );
  }

  getTreeHeight(): number {
    if (!this.children) {
      return 0;
    }
    const childDepths = this.children.map((child) => child.getTreeHeight());
    return Math.max(...childDepths) + 1;
  }

  getPosition(): Vector {
    if (!this.parent) {
      return createVector(900, 100);
    }

    const siblings = this.parent.children;
    const siblingWidth = calculateWidthOfNodes(siblings);
    const siblingIndex = siblings.indexOf(this);
    const predecessorSiblings = siblings.slice(0, siblingIndex);

    let predecessorSiblingWidth = calculateWidthOfNodes(predecessorSiblings);
    if (predecessorSiblings.length > 0) {
      predecessorSiblingWidth += PADDING.x;
    }
    const parentPosition = this.parent.getPosition();

    textSize(TEXT_SIZE);
    const x =
      parentPosition.x +
      predecessorSiblingWidth +
      this.getWidth() / 2 -
      siblingWidth / 2;
    const y =
      parentPosition.y +
      PADDING.y +
      MARGIN.y * 2 +
      (textAscent() + textDescent());

    return createVector(x, y);
  }
}

function calculateWidthOfNodes(treeNodes: TreeNode[]) {
  let width = treeNodes.reduce((total, child) => total + child.getWidth(), 0);

  if (treeNodes.length > 0) {
    width += PADDING.x * (treeNodes.length - 1);
  }
  return width;
}

function renderTreeNodeText(node: TreeNode, color = 'black') {
  const pos = node.getPosition();
  noStroke();
  fill(color);
  textSize(20);
  text(
    node.label,
    pos.x - textWidth(node.label) / 2,
    pos.y + (textAscent() + textDescent()) / 4,
  );
}

function renderTreeNodeRect(node: TreeNode, color: string = 'black') {
  const position = node.getPosition();
  const { x, y } = position;

  stroke(color);
  strokeWeight(2);
  fill(255);

  rectMode(CENTER);
  rect(
    x,
    y,
    textWidth(node.label) + MARGIN.x * 2,
    textAscent() + textDescent() + MARGIN.y * 2,
    20,
  );
}

export function renderTreeNode(node: TreeNode, color = 'black') {
  node.children.forEach((child) => {
    const edge = new TreeEdge(node, child);
    renderTreeEdge(edge);
  });
  renderTreeNodeRect(node, color);
  renderTreeNodeText(node, color);
  node.children.forEach((child) => {
    renderTreeNode(child);
  });
}

export function renderTree(
  tree: Graph,
  bags: Bag[],
  root: number | null = null,
) {
  const rootTreeNode = buildTree(tree, bags, root);
  renderTreeNode(rootTreeNode);
}

function getLabel(bag: Bag) {
  return [...bag].join(', ');
}

function buildTree(
  tree: Graph,
  bags: Bag[],
  root: number | null = null,
  prevRoot: number | null = null,
) {
  let node = root;

  if (node === null) {
    node = tree.getMaxDegreeVertex();
  }

  const bag = bags[node];
  const visualNode = new TreeNode(node, null, getLabel(bag));

  const neighbours = tree.getNeighbours(node);
  if (prevRoot !== null) {
    remove(neighbours, prevRoot);
  }

  const children = neighbours.map((neighbour) => {
    return buildTree(tree, bags, neighbour, node);
  });

  visualNode.children = children;
  children.forEach((child) => (child.parent = visualNode));

  return visualNode;
}
