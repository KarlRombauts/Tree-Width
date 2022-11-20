import { Vector } from 'p5';
import { Graph } from '../algorithm/graph';
import { remove } from '../algorithm/helper/arrayUtils';
import { Bag } from '../algorithm/treeDecomposition';
import { renderBlueTreeEdge, renderTreeEdge, TreeEdge } from './TreeEdge';
import { getTextHeight, getTextWidth } from './textUtils';

const PADDING = { x: 20, y: 30 };
const MARGIN = { x: 16, y: 8 };
const TEXT_SIZE = 20;

export class TreeNode {
  id: number;
  label: string;
  bag: Bag;
  parent: TreeNode | null;
  children: TreeNode[];
  width: number | null;

  constructor(id: number, parent: TreeNode | null, bag: Bag) {
    (this.id = id), (this.parent = parent);
    this.bag = bag;
    this.label = getLabel(bag);
    this.children = [];
    this.width = null;
  }

  containsVertex(vertex: number) {
    return this.bag.has(vertex);
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
    const ownWidth = getTextWidth(TEXT_SIZE, this.label) + MARGIN.x * 2;
    const childrenWidth = calculateWidthOfNodes(this.children);
    return Math.max(ownWidth, childrenWidth);
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
      return createVector(width * (2 / 3), 100);
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
      parentPosition.y + PADDING.y + MARGIN.y * 2 + getTextHeight(TEXT_SIZE);

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
  textSize(TEXT_SIZE);
  text(
    node.label,
    pos.x - getTextWidth(TEXT_SIZE, node.label) / 2,
    pos.y + getTextHeight(TEXT_SIZE) / 4,
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
    getTextWidth(TEXT_SIZE, node.label) + MARGIN.x * 2,
    getTextHeight(TEXT_SIZE) + MARGIN.y * 2,
    20,
  );
}

function treeEdgeHighlighted(edge: TreeEdge, hoveredVertexId?: number) {
  if (!hoveredVertexId) {
    return false;
  }
  const { child, parent } = edge;
  return (
    child.containsVertex(hoveredVertexId) &&
    parent.containsVertex(hoveredVertexId)
  );
}

export function renderTreeNode(node: TreeNode, hoveredVertexId?: number) {
  node.children.forEach((child) => {
    const edge = new TreeEdge(node, child);
    if (treeEdgeHighlighted(edge, hoveredVertexId)) {
      renderBlueTreeEdge(edge);
    } else {
      renderTreeEdge(edge);
    }
  });
  if (hoveredVertexId !== undefined && node.containsVertex(hoveredVertexId)) {
    renderTreeNodeRect(node, 'blue');
    renderTreeNodeText(node, 'blue');
  } else {
    renderTreeNodeRect(node, 'black');
    renderTreeNodeText(node, 'black');
  }

  node.children.forEach((child) => {
    renderTreeNode(child, hoveredVertexId);
  });
}

export function renderTree(tree: Graph, bags: Bag[], hoveredVertexId?: number) {
  const rootTreeNode = buildTree(tree, bags, null);
  renderTreeNode(rootTreeNode, hoveredVertexId);
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
  const visualNode = new TreeNode(node, null, bag);

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
